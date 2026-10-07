#!/usr/bin/env node
// Sequential batch runner for the multi-curve collocation search: each argument is one
// quoted argument string for weber-binding-sphere-mc-search.mjs. Output is inherited (heartbeats pass through).
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const search = path.join(path.dirname(fileURLToPath(import.meta.url)), 'weber-binding-sphere-mc-search.mjs');
for (const a of process.argv.slice(2)) { const r = spawnSync(process.execPath, [search, ...a.split(/\s+/).filter(Boolean)], { stdio: 'inherit' }); console.log(`BATCH ${new Date().toISOString()} args="${a}" exit=${r.status}`); }
