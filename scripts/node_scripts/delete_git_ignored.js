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
const skipDirs = skipArg
  ? skipArg.replace('--skip=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

const noDeleteArg = args.find(arg => arg.startsWith('--no-delete='));
const noDeleteDirs = noDeleteArg
  ? noDeleteArg.replace('--no-delete=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

function normalizePath(dir) {
  if (path.isAbsolute(dir)) {
    return dir;
  }
  return path.resolve(ROOT_DIR, dir);
}

// Normalize paths to be absolute
const normalizedSkipDirs = skipDirs.map(normalizePath);
const normalizedNoDeleteDirs = noDeleteDirs.map(normalizePath);

// Print configuration information
console.log(`Root directory: ${ROOT_DIR}`);
console.log(`Mode: ${mode === 'delete' ? 'Delete ignored files' : 'Print ignored files only'}`);

if (normalizedSkipDirs.length > 0) {
  console.log('\nDirectories to skip from processing:');
  normalizedSkipDirs.forEach(dir => {
    console.log(`  - ${path.relative(ROOT_DIR, dir) || '.'} (${dir})`);
  });
}

if (normalizedNoDeleteDirs.length > 0) {
  console.log('\nDirectories to skip from deletion:');
  normalizedNoDeleteDirs.forEach(dir => {
    console.log(`  - ${path.relative(ROOT_DIR, dir) || '.'} (${dir})`);
  });
}

console.log('\nStarting traversal...\n');

function shouldIgnoreDir(dir) {
  return normalizedSkipDirs.some(skipped =>
    dir === skipped || dir.startsWith(skipped + path.sep)
  );
}

function shouldNotDeleteDir(dir) {
  return normalizedNoDeleteDirs.some(noDelete =>
    dir === noDelete || dir.startsWith(noDelete + path.sep)
  );
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
                             
  --skip=<dir1,dir2,...>     Comma-separated list of directories to skip during traversal.
                             Paths can be absolute or relative to the root directory.
                             
  --no-delete=<dir1,dir2,...> Comma-separated list of directories that should not be deleted
                             even if they match gitignore patterns. Paths can be absolute
                             or relative to the root directory.

Examples:
  node delete_git_ignored.js ./my-project
  node delete_git_ignored.js C:\\Users\\me\\project --delete
  node delete_git_ignored.js ./project --skip=node_modules,dist
  node delete_git_ignored.js ./project --delete --no-delete=.git,important-folder
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
  if (shouldIgnoreDir(dir)) {
    const relPath = path.relative(ROOT_DIR, dir);
    console.log(`[SKIPPED] Directory excluded from processing: ${relPath}`);
    return;
  }

  const ig = await getGitignorePatterns(dir);
  const dirEntries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (shouldIgnoreDir(fullPath)) {
      console.log(`[SKIPPED] Directory excluded from processing: ${relPath}`);
      continue;
    }

    const isIgnored = ig && ig.ignores(entry.name);

    if (isIgnored) {
      if (shouldNotDeleteDir(fullPath)) {
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
