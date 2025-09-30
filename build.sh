#!/bin/bash
set -e

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "📦 Installing Node dependencies..."
npm install --legacy-peer-deps

echo "🏗️ Building React frontend..."
npm run build

echo "✅ Build complete!"
echo "📁 Checking dist folder..."
ls -la dist/ || echo "⚠️ dist folder not found"
