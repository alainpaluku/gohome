package config

import "os"

type Config struct {
	APIPort     string
	GRPCPort    string
	MetricsPort string
	NatsURL     string
}

func Load() *Config {
	return &Config{
		APIPort:     getEnv("API_PORT", ":3000"),
		GRPCPort:    getEnv("GRPC_PORT", ":50051"),
		MetricsPort: getEnv("METRICS_PORT", ":8428"),
		NatsURL:     getEnv("NATS_URL", "nats://localhost:4222"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
