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

	// Initialize NATS messaging (optional - continue if not available)
	var natsClient *messaging.NATSClient
	var err error
	natsClient, err = messaging.NewNATSClient(cfg.NatsURL)
	if err != nil {
		log.Printf("Warning: NATS not available: %v (running without messaging)", err)
	} else {
		defer natsClient.Close()
	}

	// Initialize gRPC server for device communication
	grpcSrv := grpcserver.NewServer(cfg.GRPCPort, natsClient)
	go grpcSrv.Start()

	// Initialize REST API + Static files (Fiber)
	apiServer := api.NewServer(cfg.APIPort, natsClient, cfg.StaticDir)
	go apiServer.Start()

	log.Printf("GoHome started - http://localhost%s", cfg.APIPort)
	log.Printf("API: %s | gRPC: %s | Metrics: %s", cfg.APIPort, cfg.GRPCPort, cfg.MetricsPort)

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down...")
	apiServer.Shutdown()
	grpcSrv.Stop()
}
