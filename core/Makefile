.PHONY: build run proto clean install-deps build-arm ui

# Build for current platform
build: ui
	go build -o bin/gohome ./cmd/server

# Build for Raspberry Pi (ARM)
build-arm: ui
	GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -o bin/gohome-arm64 ./cmd/server
	GOOS=linux GOARCH=arm GOARM=7 go build -ldflags="-s -w" -o bin/gohome-armv7 ./cmd/server

# Build UI and copy to static folder
ui:
	cd ../ui && npm ci && npm run build
	rm -rf ./static
	cp -r ../ui/dist ./static

# Run the server
run:
	go run ./cmd/server

# Run with UI (dev mode - UI served separately)
dev:
	STATIC_DIR="" go run ./cmd/server

# Generate protobuf code
proto:
	protoc --go_out=. --go-grpc_out=. proto/device.proto

# Install dependencies
install-deps:
	go mod tidy
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Clean build artifacts
clean:
	rm -rf bin/ static/

# Run tests
test:
	go test -v ./...

# Build container with Podman
container:
	cd .. && podman build -t gohome -f Containerfile .

# Run with Podman Compose
podman-up:
	cd .. && podman-compose up -d

podman-down:
	cd .. && podman-compose down
