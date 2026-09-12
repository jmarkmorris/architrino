#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { inspectCurrentSources } from './current-source-transition.mjs';
export { inspectCurrentSources } from './current-source-transition.mjs';

export const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)));
export const PROFILES = Object.freeze({
  "prescribed-response": {
    "manifest": "reference/priorities/development-process-review/contracts/option-b-prescribed-response-sources.jsonld",
    "entry": "scripts/eom/run-prescribed-response-pilot.mjs",
    "launcher": "scripts/eom/launch-prescribed-response-pilot.mjs",
    "scope": "prescribed-response-pilot-current-source"
  },
  "f6c-acceleration": {
    "manifest": "reference/priorities/development-process-review/contracts/option-b-f6c-acceleration-sources.jsonld",
    "entry": "scripts/eom/run-f6c-acceleration-pilot.mjs",
    "launcher": "scripts/eom/launch-f6c-acceleration-pilot.mjs",
    "scope": "f6c-acceleration-pilot-current-source"
  },
  "root-cover": {
    "manifest": "reference/priorities/development-process-review/contracts/option-b-root-cover-sources.jsonld",
    "entry": "scripts/eom/run-f6c-root-cover-pilot.mjs",
    "launcher": "scripts/eom/launch-f6c-root-cover-pilot.mjs",
    "scope": "f6c-root-cover-pilot-current-source"
  },
  "cached-root-cover": {
    "manifest": "reference/priorities/development-process-review/contracts/option-b-cached-root-cover-sources.jsonld",
    "entry": "scripts/eom/run-f6c-cached-root-cover-pilot.mjs",
    "launcher": "scripts/eom/launch-f6c-cached-root-cover-pilot.mjs",
    "scope": "f6c-cached-root-cover-pilot-current-source"
  },
  "cached-root-cover-full": {
    "manifest": "reference/priorities/development-process-review/contracts/option-b-cached-root-cover-full-sources.jsonld",
    "entry": "scripts/eom/run-f6c-cached-root-cover-full.mjs",
    "launcher": "scripts/eom/launch-f6c-cached-root-cover-full.mjs",
    "scope": "f6c-cached-root-cover-full-current-source"
  }
});

// The one-time A transfer is retained in the externally bound historical proof.
// Routine acceptance neither retrieves Git history nor imports its extractor.
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const flags = { '--accepted-baseline': 'acceptedBaseline', '--accepted-baseline-sha256': 'acceptedBaselineSha256', '--transition': 'transition', '--transition-sha256': 'transitionSha256' };
    const options = {};
    for (let i = 2; i < process.argv.length; i += 2) {
      const key = flags[process.argv[i]];
      assert.ok(key && !Object.hasOwn(options, key) && process.argv[i + 1], 'Exact external B selections required; no refresh or approval options');
      options[key] = process.argv[i + 1];
    }
    assert.equal(Object.keys(options).length, 4, 'External accepted baseline and reviewed transition paths/digests required');
    console.log(JSON.stringify(inspectCurrentSources({ root: ROOT, requiredProfiles: Object.keys(PROFILES), ...options }), null, 2));
  }
  catch (error) { console.error('[option-b-current-source] ' + error.message); process.exitCode = 1; }
}
