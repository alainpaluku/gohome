package api

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/alainpaluku/gohome/core/internal/messaging"
	"github.com/alainpaluku/gohome/core/internal/store"
)

type Server struct {
	app   *fiber.App
	port  string
	nats  *messaging.NATSClient
	store *store.DeviceStore
}

func NewServer(port string, nats *messaging.NATSClient) *Server {
	app := fiber.New(fiber.Config{
		AppName: "GoHome API",
	})

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,PATCH",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))

	s := &Server{
		app:   app,
		port:  port,
		nats:  nats,
		store: store.NewDeviceStore(),
	}

	s.setupRoutes()
	return s
}

func (s *Server) setupRoutes() {
	api := s.app.Group("/api/v1")

	// Devices
	api.Get("/devices", s.getDevices)
	api.Get("/devices/:id", s.getDevice)
	api.Post("/devices", s.createDevice)
	api.Put("/devices/:id", s.updateDevice)
	api.Delete("/devices/:id", s.deleteDevice)
	api.Post("/devices/:id/command", s.sendCommand)

	// Rooms
	api.Get("/rooms", s.getRooms)
	api.Get("/rooms/:id/devices", s.getRoomDevices)

	// Health
	s.app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})
}

func (s *Server) Start() {
	if err := s.app.Listen(s.port); err != nil {
		log.Fatalf("API server error: %v", err)
	}
}

func (s *Server) Shutdown() {
	s.app.Shutdown()
}
