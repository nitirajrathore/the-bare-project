#!/bin/bash

echo "🔍 Checking disk usage before cleanup..."
df -h /

echo ""
echo "🧹 Cleaning npm and pnpm cache..."
npm cache clean --force 2>/dev/null || echo "npm not found"
pnpm store prune 2>/dev/null || echo "pnpm not found"

echo ""
echo "🧹 Cleaning pip cache..."
pip cache purge 2>/dev/null || echo "pip not found"

echo ""
echo "🧹 Cleaning yarn cache (if installed)..."
yarn cache clean 2>/dev/null || echo "yarn not found"

echo ""
echo "🧼 Cleaning user cache directories..."
rm -rf ~/.cache/*
# rm -rf ~/.npm
# rm -rf ~/.pnpm-store
# rm -rf ~/.local/share/pnpm
# rm -rf ~/.config/pnpm
# rm -rf ~/.pyenv/cache

echo ""
echo "🧾 Disk usage after cleanup:"
df -h /

echo "✅ All dev caches cleaned. Consider shutting down WSL and optimizing VHDX."
