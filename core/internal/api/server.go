package api

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/alainpaluku/gohome/core/internal/messaging"
	"github.com/alainpaluku/gohome/core/internal/models"
	"github.com/alainpaluku/gohome/core/internal/store"
)

type Server struct {
	app       *fiber.App
	port      string
	nats      *messaging.NATSClient
	store     *store.DeviceStore
	staticDir string
}

func NewServer(port string, nats *messaging.NATSClient, staticDir string) *Server {
	app := fiber.New(fiber.Config{
		AppName: "GoHome",
	})

	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,PATCH",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization",
	}))

	s := &Server{
		app:       app,
		port:      port,
		nats:      nats,
		store:     store.NewDeviceStore(),
		staticDir: staticDir,
	}

	s.seedData()
	s.setupRoutes()
	return s
}

func (s *Server) seedData() {
	defaultDevices := []*models.Device{
		{ID: "1", Name: "Smart Lamp", Type: models.DeviceLamp, Room: "living_room", IsOn: true},
		{ID: "2", Name: "Thermostat", Type: models.DeviceThermostat, Room: "living_room", IsOn: true, Value: 22},
		{ID: "3", Name: "Smart TV", Type: models.DeviceTV, Room: "living_room", IsOn: false},
		{ID: "4", Name: "Camera", Type: models.DeviceCamera, Room: "bedroom", IsOn: true},
		{ID: "5", Name: "Bedroom Lamp", Type: models.DeviceLamp, Room: "bedroom", IsOn: false},
		{ID: "6", Name: "Kitchen Light", Type: models.DeviceLamp, Room: "kitchen", IsOn: true},
	}

	for _, d := range defaultDevices {
		s.store.SaveDevice(d)
	}

	defaultRooms := []*models.Room{
		{ID: "living_room", Name: "Living Room", Devices: []string{"1", "2", "3"}},
		{ID: "bedroom", Name: "Bedroom", Devices: []string{"4", "5"}},
		{ID: "kitchen", Name: "Kitchen", Devices: []string{"6"}},
		{ID: "bathroom", Name: "Bathroom", Devices: []string{}},
		{ID: "backyard", Name: "Backyard", Devices: []string{}},
		{ID: "terrace", Name: "Terrace", Devices: []string{}},
	}

	for _, r := range defaultRooms {
		s.store.SaveRoom(r)
	}

	log.Println("Seed data loaded")
}

func (s *Server) setupRoutes() {
	// API routes
	api := s.app.Group("/api/v1")

	api.Get("/devices", s.getDevices)
	api.Get("/devices/:id", s.getDevice)
	api.Post("/devices", s.createDevice)
	api.Put("/devices/:id", s.updateDevice)
	api.Delete("/devices/:id", s.deleteDevice)
	api.Post("/devices/:id/command", s.sendCommand)

	api.Get("/rooms", s.getRooms)
	api.Get("/rooms/:id/devices", s.getRoomDevices)

	// Health check
	s.app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	// Serve static files (UI) if directory exists
	if _, err := os.Stat(s.staticDir); err == nil {
		s.app.Static("/", s.staticDir, fiber.Static{
			Index:    "index.html",
			Compress: true,
		})

		// SPA fallback - serve index.html for all non-API routes
		s.app.Get("/*", func(c *fiber.Ctx) error {
			return c.SendFile(s.staticDir + "/index.html")
		})

		log.Printf("Serving static files from: %s", s.staticDir)
	}
}

func (s *Server) Start() {
	if err := s.app.Listen(s.port); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}

func (s *Server) Shutdown() {
	s.app.Shutdown()
}
