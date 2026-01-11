package messaging

import (
	"encoding/json"
	"log"

	"github.com/nats-io/nats.go"
)

const (
	SubjectDeviceCommand = "device.command"
	SubjectDeviceState   = "device.state"
	SubjectDeviceEvent   = "device.event"
)

type NATSClient struct {
	conn *nats.Conn
}

func NewNATSClient(url string) (*NATSClient, error) {
	nc, err := nats.Connect(url,
		nats.ReconnectWait(nats.DefaultReconnectWait),
		nats.MaxReconnects(-1),
		nats.DisconnectErrHandler(func(_ *nats.Conn, err error) {
			log.Printf("NATS disconnected: %v", err)
		}),
		nats.ReconnectHandler(func(_ *nats.Conn) {
			log.Println("NATS reconnected")
		}),
	)
	if err != nil {
		return nil, err
	}
	return &NATSClient{conn: nc}, nil
}

func (c *NATSClient) Publish(subject string, data any) error {
	payload, err := json.Marshal(data)
	if err != nil {
		return err
	}
	return c.conn.Publish(subject, payload)
}

func (c *NATSClient) Subscribe(subject string, handler func([]byte)) (*nats.Subscription, error) {
	return c.conn.Subscribe(subject, func(msg *nats.Msg) {
		handler(msg.Data)
	})
}

func (c *NATSClient) Request(subject string, data any) ([]byte, error) {
	payload, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}
	msg, err := c.conn.Request(subject, payload, nats.DefaultTimeout)
	if err != nil {
		return nil, err
	}
	return msg.Data, nil
}

func (c *NATSClient) Close() {
	c.conn.Close()
}
