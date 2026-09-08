import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('explicit Claude route and legacy Codex default select matching child helpers without shared fallback', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'github-route-'));
  try {
    mkdirSync(path.join(root, 'scripts/github-auth'), { recursive: true });
    mkdirSync(path.join(root, '.local-data/github-auth'), { recursive: true });
    mkdirSync(path.join(root, 'bin'));
    copyFileSync(new URL('../scripts/github-auth/run.mjs', import.meta.url), path.join(root, 'scripts/github-auth/run.mjs'));
    // Synthetic credential fixture; no real helper or Keychain is used.
    writeFileSync(path.join(root, '.local-data/github-auth/keychain-token'), '#!/bin/sh\n[ "$2" = "$EXPECTED_CONTEXT" ] || exit 9\nprintf "password=synthetic-test-value\\n"\n', { mode: 0o755 });
    const client = `#!${process.execPath}\nconst e=process.env; if(e.GH_TOKEN!=='synthetic-test-value'||e.GH_REPO!=='jmarkmorris/architrino'||!e.GIT_CONFIG_VALUE_1.endsWith('credential '+e.EXPECTED_CONTEXT)||e.GIT_CONFIG_VALUE_0!==''||e.GIT_CONFIG_VALUE_2!=='true'||e.GITHUB_TOKEN||e.GH_DEBUG)process.exit(9);console.log('fixture-route-ok');\n`;
    for (const name of ['git', 'gh']) writeFileSync(path.join(root, 'bin', name), client, { mode: 0o755 });
    const invoke = (args, context='codex-architrino') => spawnSync(process.execPath, [path.join(root, 'scripts/github-auth/run.mjs'), ...args], {encoding:'utf8', env:{...process.env, PATH:path.join(root,'bin'), EXPECTED_CONTEXT:context, GITHUB_TOKEN:'unwanted-fixture', GH_DEBUG:'api'}});
    for (const client of ['git','gh']) {
      assert.equal(invoke([client,'status']).stdout.trim(),'fixture-route-ok');
      assert.equal(invoke(['--context','claude-architrino',client,'status'],'claude-architrino').stdout.trim(),'fixture-route-ok');
    }
    for (const args of [['--context','unknown','gh','api'],['--context','claude-mylists','git','status'],['--context','claude-architrino','gh','auth','status'],['git','credential','fill']]) assert.notEqual(invoke(args).status,0);
    assert.notEqual(invoke(['gh','api'],'claude-architrino').status,0, 'helper mismatch must not fall back');
  } finally { rmSync(root,{recursive:true,force:true}); }
});
