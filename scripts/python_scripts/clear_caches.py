#!/usr/bin/env python3

import os
import subprocess
import argparse
import shutil
import sys
from pathlib import Path


def clear_pnpm_cache():
    """Clear the pnpm cache"""
    try:
        print("Clearing pnpm cache...")
        result = subprocess.run(["pnpm", "store", "prune"], 
                               capture_output=True, 
                               text=True,
                               check=True)
        print(f"Success: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error clearing pnpm cache: {e.stderr}")
        return False
    except FileNotFoundError:
        print("pnpm not found. Please make sure it's installed and in your PATH.")
        return False


def clear_npm_cache():
    """Clear the npm cache"""
    try:
        print("Clearing npm cache...")
        result = subprocess.run(["npm", "cache", "clean", "--force"], 
                               capture_output=True, 
                               text=True,
                               check=True)
        print(f"Success: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error clearing npm cache: {e.stderr}")
        return False
    except FileNotFoundError:
        print("npm not found. Please make sure it's installed and in your PATH.")
        return False


def clear_pyenv_cache():
    """Clear the pyenv build cache"""
    try:
        # Get pyenv root directory
        pyenv_root = os.environ.get("PYENV_ROOT")
        if not pyenv_root:
            home = Path.home()
            pyenv_root = os.path.join(home, ".pyenv")
        
        cache_dir = os.path.join(pyenv_root, "cache")
        
        if os.path.exists(cache_dir):
            print(f"Clearing pyenv cache at {cache_dir}...")
            deleted_files = []
            for item in os.listdir(cache_dir):
                item_path = os.path.join(cache_dir, item)
                try:
                    if os.path.isfile(item_path):
                        os.unlink(item_path)
                    elif os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                    deleted_files.append(item)
                except Exception as e:
                    print(f"Failed to delete {item_path}: {e}")
            
            if deleted_files:
                print(f"Deleted {len(deleted_files)} item(s) from pyenv cache.")
            else:
                print("No items found in pyenv cache.")
            return True
        else:
            print(f"pyenv cache directory not found at {cache_dir}")
            return False
    except Exception as e:
        print(f"Error clearing pyenv cache: {e}")
        return False


def clear_docker_resources(all_volumes=False):
    """Clear docker resources (images, containers, networks, caches)"""
    try:
        print("Cleaning Docker resources...")
        cmd = ["docker", "system", "prune", "-f"]
        
        if all_volumes:
            cmd.append("--volumes")
            print("WARNING: Including volumes in Docker cleanup")
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error cleaning Docker resources: {e.stderr}")
        return False
    except FileNotFoundError:
        print("Docker not found. Please make sure it's installed and in your PATH.")
        return False


def clear_go_cache():
    """Clear Go module cache"""
    try:
        print("Clearing Go module cache...")
        result = subprocess.run(["go", "clean", "-modcache"], 
                               capture_output=True, 
                               text=True,
                               check=True)
        print("Successfully cleared Go module cache.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error clearing Go cache: {e.stderr}")
        return False
    except FileNotFoundError:
        print("Go not found. Please make sure it's installed and in your PATH.")
        return False


def clear_maven_cache():
    """Clear Maven local repository cache"""
    try:
        maven_repo = os.environ.get("MAVEN_REPOSITORY")
        if not maven_repo:
            home = Path.home()
            maven_repo = os.path.join(home, ".m2", "repository")
        
        if os.path.exists(maven_repo):
            print(f"Clearing Maven repository cache at {maven_repo}...")
            
            # Ask for confirmation since this is destructive
            if os.environ.get("SKIP_CONFIRMATION") != "1":
                confirm = input(f"This will delete all cached Maven dependencies at {maven_repo}. Continue? (y/N): ")
                if confirm.lower() not in ['y', 'yes']:
                    print("Maven cache cleanup aborted.")
                    return False
            
            # Count deleted items
            deleted_count = 0
            for root, dirs, files in os.walk(maven_repo, topdown=True):
                # Skip .git and other special directories if they exist
                dirs[:] = [d for d in dirs if d not in ['.git']]
                
                for file in files:
                    file_path = os.path.join(root, file)
                    try:
                        os.unlink(file_path)
                        deleted_count += 1
                    except Exception as e:
                        print(f"Failed to delete {file_path}: {e}")
            
            print(f"Deleted {deleted_count} files from Maven cache.")
            return True
        else:
            print(f"Maven repository not found at {maven_repo}")
            return False
    except Exception as e:
        print(f"Error clearing Maven cache: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Clear package manager caches")
    parser.add_argument("--pnpm", action="store_true", help="Clear pnpm cache")
    parser.add_argument("--npm", action="store_true", help="Clear npm cache")
    parser.add_argument("--pyenv", action="store_true", help="Clear pyenv cache")
    parser.add_argument("--docker", action="store_true", help="Clear Docker resources (images, containers, networks, build cache)")
    parser.add_argument("--go", action="store_true", help="Clear Go module cache")
    parser.add_argument("--maven", action="store_true", help="Clear Maven repository cache")
    parser.add_argument("--all", action="store_true", help="Clear all caches (except Docker volumes)")
    parser.add_argument("--force", action="store_true", help="Skip confirmation prompts")
    
    args = parser.parse_args()
    
    # Set environment variable to skip confirmations if --force is used
    if args.force:
        os.environ["SKIP_CONFIRMATION"] = "1"
    
    # If no arguments provided, show help
    if not any([args.pnpm, args.npm, args.pyenv, args.docker, 
                args.go, args.maven, args.all, args.force]):
        print("No options specified. Showing help:\n")
        parser.print_help()
        sys.exit(1)
    
    results = []
    
    if args.all or args.pnpm:
        results.append(("pnpm", clear_pnpm_cache()))
    
    if args.all or args.npm:
        results.append(("npm", clear_npm_cache()))
    
    if args.all or args.pyenv:
        results.append(("pyenv", clear_pyenv_cache()))
    
    if args.all or args.docker:
        results.append(("docker", clear_docker_resources(False)))
    
    if args.all or args.go:
        results.append(("go modules", clear_go_cache()))
    
    if args.all or args.maven:
        results.append(("maven", clear_maven_cache()))
    
    # Summary
    print("\n" + "="*50)
    print("Cache Cleaning Summary:")
    print("="*50)
    all_success = True
    for cache, success in results:
        status = "✓ Success" if success else "✗ Failed"
        print(f"{cache}: {status}")
        if not success:
            all_success = False
    
    return 0 if all_success else 1


if __name__ == "__main__":
    sys.exit(main())