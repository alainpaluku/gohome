#!/bin/bash
# GoHome Installation Script for Raspberry Pi

set -e

echo "=== GoHome Installation for Raspberry Pi ==="

# Check if running on ARM
ARCH=$(uname -m)
if [[ "$ARCH" != "aarch64" && "$ARCH" != "armv7l" ]]; then
    echo "Warning: This script is designed for Raspberry Pi (ARM)"
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "Docker installed. Please log out and back in, then run this script again."
    exit 0
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo apt-get update
    sudo apt-get install -y docker-compose
fi

# Create directories
echo "Creating directories..."
mkdir -p ~/gohome/data

# Copy docker-compose file
echo "Setting up services..."
cd ~/gohome

# Start services
echo "Starting GoHome services..."
docker-compose up -d

echo ""
echo "=== Installation Complete ==="
echo "API:     http://$(hostname -I | awk '{print $1}'):3000"
echo "Metrics: http://$(hostname -I | awk '{print $1}'):8428/metrics"
echo ""
echo "To view logs: docker-compose logs -f"
