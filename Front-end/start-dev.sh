#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Vite development server..."
node node_modules/vite/bin/vite.js --host 0.0.0.0 --port 5173
