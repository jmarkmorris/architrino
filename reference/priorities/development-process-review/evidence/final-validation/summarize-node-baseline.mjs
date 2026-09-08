// Node v26 spec-reporter extraction; known cases precede every target read.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
function failures(text){
 const tail=text.split('\n✖ failing tests:\n')[1]??'';
 return [...tail.matchAll(/^test at (.+):(\d+):(\d+)\n([\s\S]*?)(?=^test at |\n\[test-sweep\]|$(?![\s\S]))/gm)].map(m=>({path:m[1],line:Number(m[2]),column:Number(m[3]),test:m[4].split('\n')[0].slice(0,350),error:m[4].split('\n').find(line=>/^  \S/.test(line))?.trim().slice(0,500)??'See original log',status:'failed',disposition:'not-yet-reconciled'}));
}
const known='ignored progress\n✖ failing tests:\n\ntest at tests/one.test.js:12:3\n✖ first\n  Error: known rejection\n\ntest at tests/one.test.js:20:1\n✖ second\n  AssertionError: known mismatch\n[test-sweep] exit 1\n';
assert.deepEqual(failures(known).map(r=>[r.path,r.line,r.error]),[['tests/one.test.js',12,'Error: known rejection'],['tests/one.test.js',20,'AssertionError: known mismatch']]);
assert.deepEqual(failures('all passed\n'),[]);
const sha=raw=>createHash('sha256').update(raw).digest('hex');
assert.equal(sha(Buffer.from('abc')),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known failure-block, repeated-file, absent-failure and SHA controls passed before target inspection.');
const runId='8b6ae0db-0cf1-49f8-9225-7842916252a5';
const path=`.local-data/owned-compute/logs/${runId}.stdout.log`,raw=readFileSync(path),text=raw.toString();
const summary={};for(const key of ['tests','pass','fail','cancelled','skipped','todo','duration_ms']){const m=text.match(new RegExp('^ℹ '+key+' ([0-9.]+)$','m'));assert.ok(m,key+' absent');summary[key]=Number(m[1]);}
const rows=failures(text);assert.equal(rows.length,summary.fail,'failure blocks do not reconcile with native summary');
const uniqueFiles=[...new Set(rows.map(r=>r.path))].sort();
const lease=JSON.parse(readFileSync(`.local-data/owned-compute/leases/${runId}.json`));
const record={runId,sourceCommit:'6a637f574c6455db8567f08a2d4e93b1cf9f189a',sourceBoundary:'Clean working tree observed before launch; no source edits during the run. This record is a baseline, not certification of later changes.',command:'node scripts/run-test-sweep.mjs',selectedFiles:316,summary,failedFiles:uniqueFiles,failures:rows,log:{path,sha256:sha(raw),bytes:raw.length,lines:text.split('\n').length-1},terminal:{status:lease.status,exitCode:lease.exitCode,processGroupClosed:lease.processGroupClosed,elapsedWallSeconds:lease.elapsedWallSeconds},scope:'Normal Node selection only. No Python, slow selection, standalone-check or GitHub all-pass claim.'};
writeFileSync(new URL('node-normal-baseline.json',import.meta.url),JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({summary,failedFiles:uniqueFiles.length,failureBlocks:rows.length}));
