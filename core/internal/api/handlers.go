package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"github.com/alainpaluku/gohome/core/internal/messaging"
	"github.com/alainpaluku/gohome/core/internal/models"
)

func (s *Server) getDevices(c *fiber.Ctx) error {
	devices := s.store.GetAllDevices()
	return c.JSON(devices)
}

func (s *Server) getDevice(c *fiber.Ctx) error {
	id := c.Params("id")
	device, ok := s.store.GetDevice(id)
	if !ok {
		return c.Status(404).JSON(fiber.Map{"error": "device not found"})
	}
	return c.JSON(device)
}

func (s *Server) createDevice(c *fiber.Ctx) error {
	var device models.Device
	if err := c.BodyParser(&device); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	if device.ID == "" {
		device.ID = uuid.New().String()
	}

	s.store.SaveDevice(&device)

	// Publish event
	s.nats.Publish(messaging.SubjectDeviceEvent, fiber.Map{
		"type":   "device_created",
		"device": device,
	})

	return c.Status(201).JSON(device)
}

func (s *Server) updateDevice(c *fiber.Ctx) error {
	id := c.Params("id")
	_, ok := s.store.GetDevice(id)
	if !ok {
		return c.Status(404).JSON(fiber.Map{"error": "device not found"})
	}

	var device models.Device
	if err := c.BodyParser(&device); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	device.ID = id
	s.store.SaveDevice(&device)

	return c.JSON(device)
}

func (s *Server) deleteDevice(c *fiber.Ctx) error {
	id := c.Params("id")
	s.store.DeleteDevice(id)
	return c.SendStatus(204)
}

func (s *Server) sendCommand(c *fiber.Ctx) error {
	id := c.Params("id")
	device, ok := s.store.GetDevice(id)
	if !ok {
		return c.Status(404).JSON(fiber.Map{"error": "device not found"})
	}

	var cmd models.DeviceCommand
	if err := c.BodyParser(&cmd); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid request"})
	}

	cmd.DeviceID = id

	// Publish command via NATS
	if err := s.nats.Publish(messaging.SubjectDeviceCommand, cmd); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to send command"})
	}

	// Update local state for toggle
	if cmd.Action == "toggle" {
		s.store.UpdateDeviceState(id, !device.IsOn, device.Value)
	}

	updatedDevice, _ := s.store.GetDevice(id)
	return c.JSON(updatedDevice)
}

func (s *Server) getRooms(c *fiber.Ctx) error {
	rooms := s.store.GetRooms()
	return c.JSON(rooms)
}

func (s *Server) getRoomDevices(c *fiber.Ctx) error {
	roomID := c.Params("id")
	devices := s.store.GetDevicesByRoom(roomID)
	return c.JSON(devices)
}
