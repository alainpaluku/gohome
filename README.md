<div align="center">

# 🏠 GoHome

### Smart Home System for Raspberry Pi

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Fiber](https://img.shields.io/badge/Fiber-v2-00ACD7?style=for-the-badge)](https://gofiber.io)
[![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi-Ready-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white)](https://www.raspberrypi.org)

<br>

[Features](#-features) • [Quick Start](#-quick-start) • [API](#-api) • [Development](#-development)

<br>

<img src="https://raw.githubusercontent.com/alainpaluku/gohome/main/.github/preview.png" alt="GoHome Preview" width="800">

</div>

<br>

## ⚡ Features

<table>
<tr>
<td width="50%">

### 🎛️ Device Control
Control all your smart devices from one place - lights, thermostats, cameras, TVs and more.

### 🏡 Room Organization  
Organize devices by rooms for easy management and quick access.

### 📊 Energy Monitoring
Track power consumption with real-time statistics and historical data.

</td>
<td width="50%">

### 🌙 Dark Mode
Beautiful dark and light themes that adapt to your preference.

### 🌍 Multi-language
Full support for English and French interfaces.

### 📱 Responsive Design
Works seamlessly on mobile, tablet and desktop.

</td>
</tr>
</table>

<br>

## 🚀 Quick Start

### One-line install (Raspberry Pi)

```bash
curl -fsSL https://raw.githubusercontent.com/alainpaluku/gohome/main/scripts/install-rpi.sh | bash
```

### With Podman

```bash
git clone https://github.com/alainpaluku/gohome.git
cd gohome
podman-compose up -d
```

Then open **http://localhost:3000**

<br>

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---|
| 🖥️ **Frontend** | React 18 · TypeScript · Vite · TailwindCSS · shadcn/ui |
| ⚙️ **Backend** | Go · GoFiber · gRPC · Protocol Buffers |
| 📨 **Messaging** | NATS |
| 📈 **Monitoring** | VictoriaMetrics |
| 📦 **Container** | Podman |

</div>

<br>

## 📁 Project Structure

```
gohome/
├── 📂 ui/                   # React Frontend
│   ├── src/components/      # UI Components
│   ├── src/pages/           # App Pages
│   └── src/lib/             # API Client
│
├── 📂 core/                 # Go Backend
│   ├── cmd/server/          # Entry Point
│   └── internal/
│       ├── api/             # REST API (Fiber)
│       ├── grpcserver/      # IoT Communication
│       ├── messaging/       # NATS Events
│       └── metrics/         # Monitoring
│
├── 📄 Containerfile         # Podman Build
└── 📄 podman-compose.yml    # Orchestration
```

<br>

## 📡 API

<details>
<summary><b>Devices</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/v1/devices` | List all devices |
| `GET` | `/api/v1/devices/:id` | Get device details |
| `POST` | `/api/v1/devices` | Create device |
| `PUT` | `/api/v1/devices/:id` | Update device |
| `DELETE` | `/api/v1/devices/:id` | Delete device |
| `POST` | `/api/v1/devices/:id/command` | Send command |

</details>

<details>
<summary><b>Rooms</b></summary>

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/v1/rooms` | List all rooms |
| `GET` | `/api/v1/rooms/:id/devices` | Get room devices |

</details>

<details>
<summary><b>Examples</b></summary>

```bash
# List devices
curl http://localhost:3000/api/v1/devices

# Toggle a light
curl -X POST http://localhost:3000/api/v1/devices/1/command \
  -H "Content-Type: application/json" \
  -d '{"action": "toggle"}'
```

</details>

<br>

## 💻 Development

```bash
# Backend
cd core && go run ./cmd/server

# Frontend (separate terminal)
cd ui && npm install && npm run dev
```

### Build for ARM

```bash
cd core && make build-arm
```

<br>

## 🔌 Ports

| Service | Port |
|:---|:---:|
| Web + API | `3000` |
| gRPC | `50051` |
| Metrics | `8428` |
| NATS | `4222` |

<br>

## 📦 Podman Commands

```bash
podman-compose up -d          # Start
podman-compose logs -f        # Logs
podman-compose restart        # Restart
podman-compose down           # Stop
podman-compose up -d --build  # Rebuild
```

<br>

<div align="center">

## 📄 License

MIT © [Alain Paluku](https://github.com/alainpaluku)

---

**[⬆ Back to top](#-gohome)**

</div>
