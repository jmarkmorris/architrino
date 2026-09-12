// Portable current-source admission checks. These do not execute Python,
// inspect private scientific data, or attest host binaries and runtime closure.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sha=raw=>createHash('sha256').update(raw).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const recovered=JSON.parse(readFileSync(path.join(root,'reference/priorities/development-process-review/evidence/next-caller-inputs/source-identities.json')));
// All three root-cover profiles moved to option-b-root-cover-admission.test.mjs.
for(const profile of ['run-prescribed-response-pilot','run-f6c-acceleration-pilot']) {
  test(`${profile}: current repository bindings reject changed bytes`,async()=>{
    const entry=await import(pathToFileURL(path.join(root,`scripts/eom/${profile}.mjs`)));
    let checked=0;
    for(const [logical,expected] of Object.entries(entry.PINS)) {
      if(path.isAbsolute(logical)||logical.startsWith('.local-data/'))continue;
      const role=entry.ORIGINALS?.find(([,p])=>p===logical)?.[0]??(profile==='run-f6c-acceleration-pilot'&&logical===entry.DECLARATION?'predeclaration':undefined);
      const archived=['approvedSource','scientificFixture','predeclaration'].includes(role)
        ? recovered.find(row=>row.path===logical&&row.expected===expected):null;
      if(['approvedSource','scientificFixture','predeclaration'].includes(role))assert.ok(archived,'explicit preserved data selection');
      const physical=path.join(root,archived?.archive??logical),raw=readFileSync(physical);
      assert.equal(sha(raw),expected,logical);
      const binding={path:physical,sha256:expected,bytes:raw.length};
      entry.checkBindings([binding]);
      assert.throws(()=>entry.checkBindings([{...binding,sha256:'0'.repeat(64)}]));
      checked++;
    }
    assert.ok(checked>0,'empty admission coverage is not a pass');
  });
}
