package config

import "os"

type Config struct {
	APIPort     string
	GRPCPort    string
	MetricsPort string
	NatsURL     string
	StaticDir   string
}

func Load() *Config {
	return &Config{
		APIPort:     getEnv("API_PORT", ":3000"),
		GRPCPort:    getEnv("GRPC_PORT", ":50051"),
		MetricsPort: getEnv("METRICS_PORT", ":8428"),
		NatsURL:     getEnv("NATS_URL", "nats://localhost:4222"),
		StaticDir:   getEnv("STATIC_DIR", "./static"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
