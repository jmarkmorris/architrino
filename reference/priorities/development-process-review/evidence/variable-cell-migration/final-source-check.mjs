import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {PINS} from '../../../../../scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const base=new URL('./',import.meta.url),read=file=>JSON.parse(readFileSync(new URL(file,base)));
const result=read('retained-adapter-construction.json');
for(const b of [result.adapter,result.controls])assert.equal(sha(readFileSync(b.path)),b.sha256);
const current=[];
for(const role of ['adapter','adapterControls','diagnosticControls','streamControls']){
 const [path,expected]=PINS[role];const raw=readFileSync(path);assert.equal(sha(raw),expected);current.push({role,path,sha256:expected,bytes:raw.length});
}
const archives=read('historical-evidence-selection.v1.json').routes;
for(const r of archives){const raw=readFileSync(r.physical.path);assert.equal(sha(raw),r.original.sha256);assert.equal(raw.length,r.original.bytes);assert.equal(r.original.sha256,r.physical.sha256);}
const oldArchives=JSON.parse(readFileSync(new URL('../source-recovery/historical-source-archive.json',base))).sources;
for(const row of oldArchives){const file=new URL('../source-recovery/'+row.file,base);assert.equal(sha(readFileSync(file)),row.sha256);}
const frozen=[['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure.py','3eefbb8767a0337024066f8949770fbf47f39edc308aaf598372cf95b3dba223'],['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/independent_parent_batch_closure_controls.py','f45ccfb0ff9609fe267f25c1ba2521ec58134f9caf7d128b09e0adfde9e6a979'],['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/fresh-parent-batch-closure-validator-expectations.md','7132bcf6db99bef0b2255418f656e3fb5900eb23fac9d1400d294d5ba8fd2eed']];
for(const [p,h]of frozen)assert.equal(sha(readFileSync(p)),h);
const git=args=>execFileSync('git',args,{encoding:'utf8',maxBuffer:4*1024*1024});
assert.equal(git(['diff','--name-only','HEAD','--','scripts/eom/oracle','scripts/eom/f6c_reception_geometry_restriction.py','scripts/eom/verify-f6c-continuous-reception-acceleration.py','scripts/eom/verify-f6c-refined-acceleration.py']).trim(),'');
const oldRunner=git(['show','7937a8733:scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs']);assert(oldRunner.includes('7a1f5571827225d1529f73a3f0b905be75e81e2f7d11c2670b697e0599d65e71'));
const diagnostic={path:PINS.diagnostics[0],expected:PINS.diagnostics[1],actual:sha(readFileSync(PINS.diagnostics[0]))};assert.notEqual(diagnostic.actual,diagnostic.expected);
const report={knownCase:'SHA-256 abc before target',finalResultMatchesCurrentSources:true,current,archiveRoutesVerified:archives.length,existingArchiveFilesPreserved:oldArchives.length,archivedBytes:archives.reduce((n,r)=>n+r.physical.bytes,0),oldClosureSourcesPreserved:frozen.map(([path,sha256])=>({path,sha256})),mathematicalReferenceChanges:[],unresolvedDiagnostic:diagnostic};
writeFileSync(new URL('final-source-check.json',base),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
