.PHONY: build run proto clean install-deps

# Build for current platform
build:
	go build -o bin/gohome-core ./cmd/server

# Build for Raspberry Pi (ARM)
build-arm:
	GOOS=linux GOARCH=arm64 go build -o bin/gohome-core-arm64 ./cmd/server
	GOOS=linux GOARCH=arm GOARM=7 go build -o bin/gohome-core-armv7 ./cmd/server

# Run the server
run:
	go run ./cmd/server

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
	rm -rf bin/

# Run tests
test:
	go test -v ./...
