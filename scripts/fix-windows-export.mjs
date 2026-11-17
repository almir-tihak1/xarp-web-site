// Runs automatically after `npm run build` (the "postbuild" script).
//
// Next.js 16 bug on Windows: the router's prefetch files should be written as flat files such as
// `out/blog/__next.blog.__PAGE__.txt`, but on Windows the path separator turns them into folders
// (`out/blog/__next.blog/__PAGE__.txt`), so prefetching those pages returns 404.
// This script flattens them back. On Linux/macOS there is nothing to fix and it does nothing.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");
let fixed = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const parts = path.relative(full, file).split(path.sep);
        fs.renameSync(file, path.join(dir, [entry.name, ...parts].join(".")));
        fixed++;
      }
      fs.rmSync(full, { recursive: true });
    } else {
      walk(full);
    }
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir);
  if (fixed) console.log(`fix-windows-export: flattened ${fixed} prefetch file(s) in ${outDir}`);
}
