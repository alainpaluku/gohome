package store

import (
	"sync"
	"time"

	"github.com/alainpaluku/gohome/core/internal/models"
)

type DeviceStore struct {
	mu      sync.RWMutex
	devices map[string]*models.Device
	rooms   map[string]*models.Room
}

func NewDeviceStore() *DeviceStore {
	return &DeviceStore{
		devices: make(map[string]*models.Device),
		rooms:   make(map[string]*models.Room),
	}
}

func (s *DeviceStore) GetDevice(id string) (*models.Device, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	d, ok := s.devices[id]
	return d, ok
}

func (s *DeviceStore) GetAllDevices() []*models.Device {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := make([]*models.Device, 0, len(s.devices))
	for _, d := range s.devices {
		result = append(result, d)
	}
	return result
}

func (s *DeviceStore) GetDevicesByRoom(roomID string) []*models.Device {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var result []*models.Device
	for _, d := range s.devices {
		if d.Room == roomID {
			result = append(result, d)
		}
	}
	return result
}

func (s *DeviceStore) SaveDevice(d *models.Device) {
	s.mu.Lock()
	defer s.mu.Unlock()
	d.UpdatedAt = time.Now()
	s.devices[d.ID] = d
}

func (s *DeviceStore) DeleteDevice(id string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	delete(s.devices, id)
}

func (s *DeviceStore) UpdateDeviceState(id string, isOn bool, value float64) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if d, ok := s.devices[id]; ok {
		d.IsOn = isOn
		d.Value = value
		d.UpdatedAt = time.Now()
		return true
	}
	return false
}

func (s *DeviceStore) GetRooms() []*models.Room {
	s.mu.RLock()
	defer s.mu.RUnlock()
	result := make([]*models.Room, 0, len(s.rooms))
	for _, r := range s.rooms {
		result = append(result, r)
	}
	return result
}

func (s *DeviceStore) SaveRoom(r *models.Room) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.rooms[r.ID] = r
}
