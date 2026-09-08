// Read-only Git recovery; recovered source is retained as data, never imported.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const git=args=>execFileSync('git',args,{maxBuffer:16*1024*1024});
const destination=new URL('./',import.meta.url);
function replaceOne(source,before,after){assert.equal(source.split(before).length,2);return source.replace(before,after);}
assert.equal(replaceOne('left OLD right','OLD','NEW'),'left NEW right');
assert.throws(()=>replaceOne('OLD OLD','OLD','NEW'));
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known cases passed before recovery: exact single replacement, duplicate refusal, SHA-256 abc.');
const preparation='scripts/eom/prepare-f6c-refined-acceleration.py';
const parent='baa3e732343db99d0b16dbb920fd9839ad09c942^';
const before=git(['show',parent+':'+preparation]).toString();
const originalHelper='a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9';
const revisedHelper='9eb1afb84a175b143020610c153f9fef6dabb50efce9f956991feca3fbc0d5c2';
const intermediate=Buffer.from(replaceOne(before,originalHelper,revisedHelper));
assert.equal(sha(intermediate),'738c716f95c419d49c14ffd533ba3bde4b6bfe666521f363db15c6212a52842c');
const full=git(['cat-file','blob','53db9db24faeebb297f166a89c463cd77540f827']);
assert.equal(sha(full),'1398a005510480d073d3882c7b9508b1cd2f91f0d7bb7ae5757b4893ed73352b');
assert.equal(full.length,27166);
const admissionPath='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json';
const admissionBytes=readFileSync(admissionPath);
assert.equal(sha(admissionBytes),'8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f');
const admission=JSON.parse(admissionBytes);
assert.ok(admission.sourceBindings.some(b=>b.path.endsWith('/scripts/eom/run-f6c-cached-root-cover-full.mjs')&&b.sha256===sha(full)&&b.bytes===full.length));
const sourceRecords=[
 {file:'original-full-entry.mjs.source',bytes:full,logicalPath:'scripts/eom/run-f6c-cached-root-cover-full.mjs',recovery:{gitBlob:'53db9db24faeebb297f166a89c463cd77540f827'},independentBinding:{receipt:admissionPath,receiptSha256:sha(admissionBytes)}},
 {file:'intermediate-preparation.py.source',bytes:intermediate,logicalPath:preparation,recovery:{parent,replace:{before:originalHelper,after:revisedHelper}},independentBinding:{commit:'baa3e732343db99d0b16dbb920fd9839ad09c942',path:'scripts/eom/run-f6c-refined-acceleration-pilot.mjs',role:'PINS[CONSUMER]'}}
];
const report=sourceRecords.map(({bytes,...r})=>{writeFileSync(new URL(r.file,destination),bytes);assert.deepEqual(readFileSync(new URL(r.file,destination)),bytes);return {...r,sha256:sha(bytes),bytes:bytes.length,lines:bytes.toString().split('\n').length-Number(bytes.at(-1)===10)};});
writeFileSync(new URL('recovery-receipt.json',destination),JSON.stringify({knownCases:'passed before recovery',claim:'Byte identity only. No recovered code executed; no scientific acceptance or historical replay.',sources:report},null,2)+'\n');
console.log(JSON.stringify(report,null,2));
