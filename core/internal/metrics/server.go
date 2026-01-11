package metrics

import (
	"log"
	"net/http"

	"github.com/VictoriaMetrics/metrics"
)

var (
	DevicesTotal     = metrics.NewCounter("gohome_devices_total")
	CommandsTotal    = metrics.NewCounter("gohome_commands_total")
	ActiveDevices    = metrics.NewGauge("gohome_active_devices", nil)
	RequestDuration  = metrics.NewHistogram("gohome_request_duration_seconds")
)

type Server struct {
	port string
}

func NewServer(port string) *Server {
	return &Server{port: port}
}

func (s *Server) Start() {
	http.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {
		metrics.WritePrometheus(w, true)
	})

	log.Printf("Metrics server listening on %s", s.port)
	if err := http.ListenAndServe(s.port, nil); err != nil {
		log.Fatalf("Metrics server error: %v", err)
	}
}

func RecordCommand() {
	CommandsTotal.Inc()
}

func RecordDeviceAdded() {
	DevicesTotal.Inc()
}

func SetActiveDevices(count int) {
	ActiveDevices.Set(float64(count))
}
