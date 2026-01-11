# GoHome Core - Backend Domotique

Backend Go pour le système domotique GoHome, conçu pour Raspberry Pi.

## Technologies

- **GoFiber** - API REST haute performance
- **gRPC** - Communication temps réel avec les appareils
- **NATS** - Messagerie événementielle
- **VictoriaMetrics** - Métriques et monitoring

## Structure

```
core/
├── cmd/server/       # Point d'entrée
├── internal/
│   ├── api/          # REST API (Fiber)
│   ├── config/       # Configuration
│   ├── grpcserver/   # Serveur gRPC
│   ├── messaging/    # Client NATS
│   ├── metrics/      # VictoriaMetrics
│   ├── models/       # Modèles de données
│   └── store/        # Stockage en mémoire
├── proto/            # Définitions Protocol Buffers
├── Dockerfile
├── docker-compose.yml
└── Makefile
```

## Installation

```bash
cd core
make install-deps
make proto
make build
```

## Build pour Raspberry Pi

```bash
make build-arm
```

## Lancement

### Avec Docker
```bash
docker-compose up -d
```

### Sans Docker
```bash
# Démarrer NATS
docker run -d -p 4222:4222 nats:latest

# Démarrer VictoriaMetrics
docker run -d -p 8428:8428 victoriametrics/victoria-metrics

# Lancer le serveur
make run
```

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/v1/devices | Liste des appareils |
| GET | /api/v1/devices/:id | Détail d'un appareil |
| POST | /api/v1/devices | Créer un appareil |
| PUT | /api/v1/devices/:id | Modifier un appareil |
| DELETE | /api/v1/devices/:id | Supprimer un appareil |
| POST | /api/v1/devices/:id/command | Envoyer une commande |
| GET | /api/v1/rooms | Liste des pièces |
| GET | /health | État du serveur |

## Ports

- `3000` - API REST
- `50051` - gRPC
- `8428` - Métriques (Prometheus format)
