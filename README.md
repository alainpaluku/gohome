# GoHome - Système Domotique

Système domotique complet avec interface React et backend Go, conçu pour Raspberry Pi.

## Architecture

```
gohome/
├── ui/           # Frontend React + Vite + TailwindCSS
├── core/         # Backend Go (Fiber, gRPC, NATS, VictoriaMetrics)
└── scripts/      # Scripts d'installation
```

## Technologies

### Frontend (ui/)
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router
- i18n (multilingue)

### Backend (core/)
- **GoFiber** - API REST
- **gRPC** - Communication appareils IoT
- **NATS** - Messagerie événementielle
- **VictoriaMetrics** - Métriques

## Installation Raspberry Pi

```bash
# Cloner le projet
git clone https://github.com/alainpaluku/gohome.git
cd gohome

# Lancer l'installation
chmod +x scripts/install-rpi.sh
./scripts/install-rpi.sh
```

## Développement

### Frontend
```bash
cd ui
npm install
npm run dev
```

### Backend
```bash
cd core
make install-deps
make run
```

## Ports

| Service | Port |
|---------|------|
| UI | 5173 (dev) |
| API REST | 3000 |
| gRPC | 50051 |
| Metrics | 8428 |
| NATS | 4222 |

## License

MIT
