<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/2769/2769339.png" width="120" alt="GoHome Logo">
</p>

<h1 align="center">🏠 GoHome</h1>

<p align="center">
  <strong>Système domotique open-source pour Raspberry Pi</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go" alt="Go">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Fiber-v2-00ACD7?style=flat" alt="Fiber">
  <img src="https://img.shields.io/badge/Platform-Raspberry%20Pi-C51A4A?style=flat&logo=raspberrypi" alt="Raspberry Pi">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/gRPC-Protocol-244c5a?style=flat&logo=grpc" alt="gRPC">
  <img src="https://img.shields.io/badge/NATS-Messaging-27AAE1?style=flat" alt="NATS">
  <img src="https://img.shields.io/badge/VictoriaMetrics-Monitoring-621773?style=flat" alt="VictoriaMetrics">
</p>

---

## ✨ Fonctionnalités

- 🎛️ **Contrôle des appareils** - Lampes, thermostats, caméras, TV...
- 🏡 **Organisation par pièces** - Salon, chambre, cuisine, etc.
- 📊 **Statistiques** - Consommation énergétique et historique
- 🌙 **Mode sombre** - Interface adaptative
- 🌍 **Multilingue** - Français, Anglais
- 📱 **Responsive** - Mobile, tablette, desktop
- ⚡ **Temps réel** - Communication gRPC + NATS

---

## 🚀 Démarrage rapide

### Avec Podman (recommandé)

```bash
git clone https://github.com/alainpaluku/gohome.git
cd gohome
podman-compose up -d
```

Ouvrir http://localhost:3000

### Installation Raspberry Pi

```bash
curl -fsSL https://raw.githubusercontent.com/alainpaluku/gohome/main/scripts/install-rpi.sh | bash
```

---

## 🏗️ Architecture

```
gohome/
├── ui/                  # Frontend React + Vite + TailwindCSS
│   └── src/
│       ├── components/  # Composants UI
│       ├── pages/       # Pages (Home, Settings, etc.)
│       └── lib/         # API client, utils
│
├── core/                # Backend Go
│   ├── cmd/server/      # Point d'entrée
│   └── internal/
│       ├── api/         # REST API (GoFiber)
│       ├── grpcserver/  # Communication IoT
│       ├── messaging/   # NATS pub/sub
│       └── metrics/     # VictoriaMetrics
│
├── Containerfile        # Build Podman
└── podman-compose.yml   # Orchestration
```

---

## 🛠️ Technologies

| Composant | Technologie |
|-----------|-------------|
| **Backend** | Go 1.21+ avec [GoFiber](https://gofiber.io) |
| **Frontend** | React 18 + TypeScript + Vite |
| **UI** | TailwindCSS + shadcn/ui |
| **IoT** | [gRPC](https://grpc.io) pour communication temps réel |
| **Messaging** | [NATS](https://nats.io) pour événements |
| **Metrics** | [VictoriaMetrics](https://victoriametrics.com) |
| **Container** | Podman |

---

## 💻 Développement

### Prérequis

- Go 1.21+
- Node.js 20+
- Podman (optionnel)

### Lancer en mode dev

```bash
# Terminal 1 - Backend
cd core
go mod tidy
go run ./cmd/server

# Terminal 2 - Frontend
cd ui
npm install
npm run dev
```

### Build pour Raspberry Pi

```bash
cd core
make build-arm
```

---

## 📡 API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/v1/devices` | Liste des appareils |
| `GET` | `/api/v1/devices/:id` | Détail d'un appareil |
| `POST` | `/api/v1/devices` | Créer un appareil |
| `PUT` | `/api/v1/devices/:id` | Modifier un appareil |
| `DELETE` | `/api/v1/devices/:id` | Supprimer un appareil |
| `POST` | `/api/v1/devices/:id/command` | Envoyer une commande |
| `GET` | `/api/v1/rooms` | Liste des pièces |
| `GET` | `/health` | État du serveur |

### Exemple

```bash
# Lister les appareils
curl http://localhost:3000/api/v1/devices

# Toggle une lampe
curl -X POST http://localhost:3000/api/v1/devices/1/command \
  -H "Content-Type: application/json" \
  -d '{"action": "toggle"}'
```

---

## 🔌 Ports

| Service | Port | Description |
|---------|------|-------------|
| Web + API | 3000 | Interface + REST API |
| gRPC | 50051 | Communication appareils |
| Metrics | 8428 | Prometheus metrics |
| NATS | 4222 | Message broker |

---

## 📦 Commandes Podman

```bash
# Démarrer
podman-compose up -d

# Voir les logs
podman-compose logs -f

# Redémarrer
podman-compose restart

# Arrêter
podman-compose down

# Rebuild
podman-compose up -d --build
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📄 License

MIT © [Alain Paluku](https://github.com/alainpaluku)

---

<p align="center">
  Made with ❤️ for smart homes
</p>
