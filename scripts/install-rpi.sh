#!/bin/bash
# GoHome Installation for Raspberry Pi (Podman)

set -e

echo "=== GoHome Installation ==="

# Install Podman if not present
if ! command -v podman &> /dev/null; then
    echo "Installing Podman..."
    sudo apt-get update
    sudo apt-get install -y podman podman-compose
fi

# Clone or update repo
if [ -d "$HOME/gohome" ]; then
    cd ~/gohome
    git pull
else
    git clone https://github.com/alainpaluku/gohome.git ~/gohome
    cd ~/gohome
fi

# Build and start
echo "Building and starting GoHome..."
podman-compose up -d --build

IP=$(hostname -I | awk '{print $1}')

echo ""
echo "=== Installation Complete ==="
echo "GoHome: http://$IP:3000"
echo "Metrics: http://$IP:8428/metrics"
echo ""
echo "Commands:"
echo "  podman-compose logs -f    # View logs"
echo "  podman-compose restart    # Restart"
echo "  podman-compose down       # Stop"
