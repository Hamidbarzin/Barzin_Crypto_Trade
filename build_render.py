#!/usr/bin/env python3
"""Build script for Render deployment"""
import subprocess
import sys
import os

def run_command(cmd, description):
    """Run a shell command and handle errors"""
    print(f"\n{'='*60}")
    print(f"📦 {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(cmd, shell=True, check=True, text=True, 
                              capture_output=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error: {e}")
        print(f"Output: {e.output}")
        print(f"Error: {e.stderr}")
        return False

def main():
    """Main build process"""
    print("🚀 Starting BarzinCrypto build process...")
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", 
                      "Installing Python dependencies"):
        sys.exit(1)
    
    # Check if Node.js is available
    node_check = subprocess.run("which node", shell=True, capture_output=True)
    if node_check.returncode != 0:
        print("⚠️  Node.js not found, skipping frontend build")
        print("Frontend will be served from pre-built dist/ folder")
        return
    
    # Install Node dependencies
    if not run_command("npm install", "Installing Node dependencies"):
        print("⚠️  npm install failed, trying with --legacy-peer-deps")
        if not run_command("npm install --legacy-peer-deps", 
                          "Installing Node dependencies (legacy mode)"):
            sys.exit(1)
    
    # Build frontend
    if not run_command("npm run build", "Building React frontend"):
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✅ Build completed successfully!")
    print("="*60)

if __name__ == "__main__":
    main()
