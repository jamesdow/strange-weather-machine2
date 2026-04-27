#!/bin/bash
# Cultural Territory Mapper - Local startup script
# Run this if the hosted version goes down

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "🗺️  Cultural Territory Mapper — Landfall"
echo "======================================="
echo ""

# Build if needed
if [ ! -d "dist" ] || [ "$(find src -newer dist/index.html 2>/dev/null | head -1)" ]; then
  echo "📦 Building..."
  npm run build
fi

# Kill any existing instances
pkill -f "vite preview" 2>/dev/null || true
sleep 1

# Start preview server
echo "🚀 Starting server on http://localhost:4173"
npx vite preview &
SERVER_PID=$!
sleep 2

echo ""
echo "✅ Running at: http://localhost:4173"
echo ""
echo "To expose publicly via Cloudflare (requires cloudflared):"
echo "  cloudflared tunnel --url http://localhost:4173 --no-autoupdate"
echo ""
echo "Press Ctrl+C to stop"
wait $SERVER_PID
