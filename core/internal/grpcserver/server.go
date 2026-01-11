package grpcserver

import (
	"context"
	"log"
	"net"
	"time"

	"google.golang.org/grpc"

	"github.com/alainpaluku/gohome/core/internal/messaging"
	"github.com/alainpaluku/gohome/core/internal/models"
	"github.com/alainpaluku/gohome/core/internal/store"
	pb "github.com/alainpaluku/gohome/core/proto"
)

type Server struct {
	pb.UnimplementedDeviceServiceServer
	grpcServer *grpc.Server
	port       string
	nats       *messaging.NATSClient
	store      *store.DeviceStore
}

func NewServer(port string, nats *messaging.NATSClient) *Server {
	return &Server{
		grpcServer: grpc.NewServer(),
		port:       port,
		nats:       nats,
		store:      store.NewDeviceStore(),
	}
}

func (s *Server) Start() {
	lis, err := net.Listen("tcp", s.port)
	if err != nil {
		log.Fatalf("gRPC failed to listen: %v", err)
	}

	pb.RegisterDeviceServiceServer(s.grpcServer, s)

	log.Printf("gRPC server listening on %s", s.port)
	if err := s.grpcServer.Serve(lis); err != nil {
		log.Fatalf("gRPC server error: %v", err)
	}
}

func (s *Server) Stop() {
	s.grpcServer.GracefulStop()
}

func (s *Server) GetDevice(ctx context.Context, req *pb.DeviceRequest) (*pb.DeviceResponse, error) {
	device, ok := s.store.GetDevice(req.DeviceId)
	if !ok {
		return nil, grpc.Errorf(5, "device not found")
	}
	return deviceToProto(device), nil
}

func (s *Server) SetState(ctx context.Context, req *pb.SetStateRequest) (*pb.DeviceResponse, error) {
	if !s.store.UpdateDeviceState(req.DeviceId, req.IsOn, req.Value) {
		return nil, grpc.Errorf(5, "device not found")
	}

	// Publish state change via NATS
	s.nats.Publish(messaging.SubjectDeviceState, models.DeviceState{
		DeviceID:  req.DeviceId,
		IsOn:      req.IsOn,
		Value:     req.Value,
		Timestamp: time.Now(),
	})

	device, _ := s.store.GetDevice(req.DeviceId)
	return deviceToProto(device), nil
}

func (s *Server) RegisterDevice(ctx context.Context, req *pb.RegisterRequest) (*pb.DeviceResponse, error) {
	device := &models.Device{
		ID:   req.DeviceId,
		Name: req.Name,
		Type: models.DeviceType(req.Type),
		Room: req.Room,
	}
	s.store.SaveDevice(device)

	s.nats.Publish(messaging.SubjectDeviceEvent, map[string]any{
		"type":   "device_registered",
		"device": device,
	})

	return deviceToProto(device), nil
}

func (s *Server) StreamState(req *pb.DeviceRequest, stream pb.DeviceService_StreamStateServer) error {
	// Subscribe to state changes for this device
	sub, err := s.nats.Subscribe(messaging.SubjectDeviceState, func(data []byte) {
		// Send state updates to the stream
		device, ok := s.store.GetDevice(req.DeviceId)
		if ok {
			stream.Send(&pb.DeviceState{
				DeviceId:  device.ID,
				IsOn:      device.IsOn,
				Value:     device.Value,
				Timestamp: device.UpdatedAt.Unix(),
			})
		}
	})
	if err != nil {
		return err
	}
	defer sub.Unsubscribe()

	<-stream.Context().Done()
	return nil
}

func deviceToProto(d *models.Device) *pb.DeviceResponse {
	return &pb.DeviceResponse{
		DeviceId:  d.ID,
		Name:      d.Name,
		Type:      string(d.Type),
		Room:      d.Room,
		IsOn:      d.IsOn,
		Value:     d.Value,
		UpdatedAt: d.UpdatedAt.Unix(),
	}
}
