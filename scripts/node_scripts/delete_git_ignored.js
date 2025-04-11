import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import ignore from 'ignore';

// CLI arg parsing
const args = process.argv.slice(2);
const mode = args.includes('--delete') ? 'delete' : 'print';

const skipArg = args.find(arg => arg.startsWith('--skip='));
const skipDirs = skipArg
  ? skipArg.replace('--skip=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

const noDeleteArg = args.find(arg => arg.startsWith('--no-delete='));
const noDeleteDirs = noDeleteArg
  ? noDeleteArg.replace('--no-delete=', '').split(',').map(d => d.trim()).filter(Boolean)
  : [];

const ROOT_DIR = process.cwd();

function shouldIgnoreDir(dir) {
  const relative = path.relative(ROOT_DIR, dir);
  return skipDirs.some(skipped =>
    relative === skipped || relative.startsWith(skipped + path.sep)
  );
}

function shouldNotDeleteDir(dir) {
  // const relative = path.relative(ROOT_DIR, dir);
  return noDeleteDirs.some(noDelete =>
    dir === noDelete || dir.startsWith(noDelete + path.sep)
  );
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
    return;
  }

  const ig = await getGitignorePatterns(dir);
  const dirEntries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath);

    if (shouldIgnoreDir(fullPath)) continue;

    const isIgnored = ig && ig.ignores(entry.name);


    if (isIgnored && !shouldNotDeleteDir(entry.name)) {
      if (mode === 'print') {
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
