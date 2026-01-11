# GoHome - Single container with Go backend + React UI
# Build with: podman build -t gohome .

# Stage 1: Build UI
FROM node:20-alpine AS ui-builder
WORKDIR /ui
COPY ui/package*.json ./
RUN npm ci
COPY ui/ .
RUN npm run build

# Stage 2: Build Go backend
FROM golang:1.21-alpine AS go-builder
WORKDIR /app
COPY core/go.mod core/go.sum ./
RUN go mod download
COPY core/ .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o gohome ./cmd/server

# Stage 3: Final image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app

# Copy Go binary
COPY --from=go-builder /app/gohome .

# Copy UI static files
COPY --from=ui-builder /ui/dist ./static

# Environment
ENV API_PORT=:3000
ENV GRPC_PORT=:50051
ENV METRICS_PORT=:8428
ENV STATIC_DIR=./static

EXPOSE 3000 50051 8428

CMD ["./gohome"]
