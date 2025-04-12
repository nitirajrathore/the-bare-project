#!/bin/bash

echo "🔍 Checking disk usage before cleanup..."
df -h /

echo "🧹 Cleaning APT cache and old packages..."
sudo apt clean
sudo apt autoremove -y

echo "🧼 Cleaning user cache directories..."
rm -rf ~/.cache/*

echo "🧾 Disk usage after cleanup:"
df -h /

echo "✅ WSL cleanup complete. You can now shut it down from Windows and optimize the VHD."
