import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import ignore from 'ignore';

// CLI arg parsing
const args = process.argv.slice(2);

// Help flag check
if (args.includes('--help') || args.length === 0) {
  printUsage();
  process.exit(0);
}

// Get root directory (first non-flag argument)
const ROOT_DIR = args.find(arg => !arg.startsWith('--')) || '';
if (!ROOT_DIR) {
  console.error('Error: Root directory is required');
  printUsage();
  process.exit(1);
}

// Make sure root directory exists
try {
  const stats = await fs.stat(ROOT_DIR);
  if (!stats.isDirectory()) {
    console.error(`Error: "${ROOT_DIR}" is not a directory`);
    process.exit(1);
  }
} catch (err) {
  console.error(`Error: Directory "${ROOT_DIR}" does not exist`);
  process.exit(1);
}

const mode = args.includes('--delete') ? 'delete' : 'print';

const skipArg = args.find(arg => arg.startsWith('--skip='));
const skipPaths = skipArg
  ? skipArg.replace('--skip=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

const noDeleteArg = args.find(arg => arg.startsWith('--no-delete='));
const noDeletePaths = noDeleteArg
  ? noDeleteArg.replace('--no-delete=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

function normalizePath(targetPath) {
  if (path.isAbsolute(targetPath)) {
    return targetPath;
  }
  return path.resolve(ROOT_DIR, targetPath);
}

// Normalize paths to be absolute
const normalizedSkipPaths = skipPaths.map(normalizePath);
const normalizedNoDeletePaths = noDeletePaths.map(normalizePath);

// Print configuration information
console.log(`Root directory: ${ROOT_DIR}`);
console.log(`Mode: ${mode === 'delete' ? 'Delete ignored files' : 'Print ignored files only'}`);

if (normalizedSkipPaths.length > 0) {
  console.log('\nPaths to skip from processing:');
  normalizedSkipPaths.forEach(itemPath => {
    console.log(`  - ${path.relative(ROOT_DIR, itemPath) || '.'} (${itemPath})`);
  });
}

if (normalizedNoDeletePaths.length > 0) {
  console.log('\nPaths to skip from deletion:');
  normalizedNoDeletePaths.forEach(itemPath => {
    console.log(`  - ${path.relative(ROOT_DIR, itemPath) || '.'} (${itemPath})`);
  });
}

console.log('\nStarting traversal...\n');

function shouldSkipPath(targetPath) {
  // Check if the path or any of its parent directories should be skipped
  return normalizedSkipPaths.some(skipPath => {
    try {
      // Check if paths are identical
      if (targetPath === skipPath) return true;

      // Check if the target is inside a skipped directory 
      // by seeing if it starts with the skip path plus a separator
      if (targetPath.startsWith(skipPath + path.sep)) return true;

      // For file patterns that might not end with path separator
      const skipStat = fs.statSync(skipPath, { throwIfNoEntry: false });
      if (!skipStat) {
        // If the path doesn't exist, it might be a pattern
        // Check if the basename matches
        const skipBasename = path.basename(skipPath);
        const targetBasename = path.basename(targetPath);
        if (skipBasename === targetBasename) return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  });
}

function shouldNotDeletePath(targetPath) {
  const targetBasename = path.basename(targetPath);

  // Check if path is in .git directory or is a .git directory itself
  if (targetPath.includes(`${path.sep}.git${path.sep}`) || targetPath.endsWith(`${path.sep}.git`)) {
    return true;
  }

  // Check for exact filename matches in the --no-delete list
  // This handles patterns like ".env" that should protect any file named .env
  if (noDeletePaths.includes(targetBasename)) {
    return true;
  }

  // Check if the path or any of its parent directories should be protected from deletion
  return normalizedNoDeletePaths.some(noDeletePath => {
    try {
      // Check if paths are identical
      if (targetPath === noDeletePath) return true;

      // Check if the target is inside a protected directory
      if (targetPath.startsWith(noDeletePath + path.sep)) return true;

      // For file patterns (without the full path)
      const noDeleteBasename = path.basename(noDeletePath);

      // Check if basenames match exactly (for file pattern matching)
      if (targetBasename === noDeleteBasename) return true;

      // Handle extension-based patterns (e.g. ".env")
      if (noDeleteBasename.startsWith('.') && targetBasename === noDeleteBasename) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  });
}

function printUsage() {
  console.log(`
Usage: node delete_git_ignored.js <root_directory> [options]

Description:
  Traverses directories starting from the specified root directory and handles
  files/directories that match patterns in .gitignore files.

Parameters:
  root_directory             Required. The directory to start traversal from.

Options:
  --help                     Show this help message and exit.
  
  --delete                   Delete ignored files instead of just printing them.
                             Without this flag, files are only printed.
                             
  --skip=<path1,path2,...>   Comma-separated list of paths (files or directories) to skip 
                             during traversal. Paths can be absolute or relative to the root directory.
                             
  --no-delete=<path1,path2,...> Comma-separated list of paths (files or directories) that should not 
                             be deleted even if they match gitignore patterns. Paths can be absolute
                             or relative to the root directory. .git directories are automatically protected.

Examples:
  node delete_git_ignored.js ./my-project
  node delete_git_ignored.js C:\\Users\\me\\project --delete
  node delete_git_ignored.js ./project --skip=node_modules,dist,config.json
  node delete_git_ignored.js ./project --delete --no-delete=.git,important-folder,data.csv
`);
}

async function getGitignorePatterns(baseDir) {
  const gitignorePath = path.join(baseDir, '.gitignore');
  try {
    const content = await fs.readFile(gitignorePath, 'utf8');
    const ig = ignore();
    ig.add(content);
    return ig;
  } catch {
    return null;
  }
}

async function findIgnoredFiles(dir, ig) {
  const allFiles = await fg(['**/*', '**/.*'], {
    dot: true,
    cwd: dir,
    onlyFiles: false,
    followSymbolicLinks: false,
    absolute: true,
  });

  return allFiles.filter(f => ig.ignores(path.relative(dir, f)));
}

async function traverseAndClean(dir) {
  if (shouldSkipPath(dir)) {
    const relPath = path.relative(ROOT_DIR, dir);
    console.log(`[SKIPPED] Path excluded from processing: ${relPath || '.'}`);
    return;
  }

  const ig = await getGitignorePatterns(dir);
  const dirEntries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (shouldSkipPath(fullPath)) {
      console.log(`[SKIPPED] Path excluded from processing: ${relPath}`);
      continue;
    }

    const isIgnored = ig && ig.ignores(entry.name);

    if (isIgnored) {
      if (shouldNotDeletePath(fullPath)) {
        console.log(`[PROTECTED] ${relPath} (matches gitignore but protected from deletion)`);
      } else if (mode === 'print') {
        console.log(`[IGNORED] ${relPath}`);
      } else if (mode === 'delete') {
        try {
          const stat = await fs.lstat(fullPath);
          if (stat.isDirectory()) {
            await fs.rm(fullPath, { recursive: true, force: true });
          } else {
            await fs.unlink(fullPath);
          }
          console.log(`[DELETED] ${relPath}`);
        } catch (err) {
          console.error(`[ERROR] Could not delete ${relPath}: ${err.message}`);
        }
      }
      continue; // Skip traversal into ignored folders
    }

    // If it's a directory, go deeper
    if (entry.isDirectory()) {
      await traverseAndClean(fullPath);
    }
  }
}

await traverseAndClean(ROOT_DIR);
