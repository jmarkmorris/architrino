import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
function classify(binding,read){try{const bytes=read(binding.path);return {status:bytes.length===binding.bytes&&sha(bytes)===binding.sha256?'matches':'different',actualSha256:sha(bytes),actualBytes:bytes.length};}catch(e){return {status:'unavailable',error:e.code??String(e)};}}
const known={path:'known',bytes:3,sha256:'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'};
assert.equal(classify(known,()=>Buffer.from('abc')).status,'matches');
assert.equal(classify(known,()=>Buffer.from('abd')).status,'different');
assert.equal(classify(known,()=>{throw Object.assign(Error(),{code:'ENOENT'});}).status,'unavailable');
console.log('Known cases passed before target: match, differing bytes, missing file.');
const p='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json',raw=readFileSync(p);
assert.equal(sha(raw),'8fe8f0f9651fd8de15467a69f0534f08bbe19e0e3fdb64a86c6422be857eb77f');
const bindings=JSON.parse(raw).sourceBindings;assert.equal(bindings.length,198);
const rows=bindings.map(b=>({...b,...classify(b,readFileSync)}));
const counts=Object.fromEntries(['matches','different','unavailable'].map(s=>[s,rows.filter(r=>r.status===s).length]));
const report={knownCases:'passed before target',instrument:'read exact original absolute paths and compare byte length and SHA-256; observation only, not a race-safe launch admission',receipt:p,receiptSha256:sha(raw),counts,rows};
writeFileSync(new URL('original-binding-inventory.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({counts,nonmatching:rows.filter(r=>r.status!=='matches').map(r=>({path:r.path,status:r.status,error:r.error}))},null,2));
