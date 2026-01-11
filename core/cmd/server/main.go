package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/alainpaluku/gohome/core/internal/api"
	"github.com/alainpaluku/gohome/core/internal/config"
	"github.com/alainpaluku/gohome/core/internal/grpcserver"
	"github.com/alainpaluku/gohome/core/internal/messaging"
	"github.com/alainpaluku/gohome/core/internal/metrics"
)

func main() {
	cfg := config.Load()

	// Initialize metrics
	metricsServer := metrics.NewServer(cfg.MetricsPort)
	go metricsServer.Start()

	// Initialize NATS messaging
	natsClient, err := messaging.NewNATSClient(cfg.NatsURL)
	if err != nil {
		log.Fatalf("Failed to connect to NATS: %v", err)
	}
	defer natsClient.Close()

	// Initialize gRPC server for device communication
	grpcSrv := grpcserver.NewServer(cfg.GRPCPort, natsClient)
	go grpcSrv.Start()

	// Initialize REST API (Fiber)
	apiServer := api.NewServer(cfg.APIPort, natsClient)
	go apiServer.Start()

	log.Printf("GoHome Core started - API: %s, gRPC: %s, Metrics: %s",
		cfg.APIPort, cfg.GRPCPort, cfg.MetricsPort)

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down...")
	apiServer.Shutdown()
	grpcSrv.Stop()
}
