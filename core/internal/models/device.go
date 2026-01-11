package models

import "time"

type DeviceType string

const (
	DeviceLamp       DeviceType = "lamp"
	DeviceThermostat DeviceType = "thermostat"
	DeviceCamera     DeviceType = "camera"
	DeviceTV         DeviceType = "tv"
	DeviceSensor     DeviceType = "sensor"
)

type Device struct {
	ID        string            `json:"id"`
	Name      string            `json:"name"`
	Type      DeviceType        `json:"type"`
	Room      string            `json:"room"`
	IsOn      bool              `json:"is_on"`
	Value     float64           `json:"value,omitempty"`
	Metadata  map[string]string `json:"metadata,omitempty"`
	UpdatedAt time.Time         `json:"updated_at"`
}

type DeviceCommand struct {
	DeviceID string `json:"device_id"`
	Action   string `json:"action"`
	Value    any    `json:"value,omitempty"`
}

type DeviceState struct {
	DeviceID  string    `json:"device_id"`
	IsOn      bool      `json:"is_on"`
	Value     float64   `json:"value,omitempty"`
	Timestamp time.Time `json:"timestamp"`
}

type Room struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	Devices []string `json:"devices"`
}
