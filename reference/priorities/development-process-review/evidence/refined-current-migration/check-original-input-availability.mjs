/** Read-only bounded availability census; no archived code is executed. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { FIXED, REFINED, PRIOR_OPERATIONS } from '../../../../../scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
const root=process.cwd(), hash=raw=>createHash('sha256').update(raw).digest('hex');
const compare=(raw,b)=>hash(raw)===b.sha256&&(b.bytes===undefined||raw.length===b.bytes);
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
const known={sha256:hash('abc'),bytes:3};assert.equal(compare(Buffer.from('abc'),known),true);
assert.equal(compare(Buffer.from('abd'),known),false);assert.equal(compare(Buffer.from('abc'),{...known,bytes:4}),false);
console.log('Known SHA-256, exact-byte, substituted-byte, and size controls passed before target scan.');
const required=[...FIXED,...REFINED,...PRIOR_OPERATIONS].map(([role,p,h,bytes])=>({role,path:p,sha256:h,...(bytes?{bytes}:{})}));
for(const items of[FIXED,REFINED]){
 const [,,digest]=items.find(r=>r[0]==='admission'), p=items.find(r=>r[0]==='admission')[1], raw=readFileSync(p);
 assert.equal(hash(raw),digest,'original admission bytes');const a=JSON.parse(raw);
 required.push(...a.sourceBindings);
 for(const s of a.stages)for(const k of['stdoutLog','stderrLog'])required.push(s.process[k]);
}
const unique=[...new Map(required.map(b=>[path.resolve(b.path)+'#'+b.sha256,b])).values()];
const paths=execFileSync('rg',['--files','--hidden','.local-data','reference/priorities'],{encoding:'utf8',maxBuffer:32*1024**2}).trim().split('\n');
const candidates=paths.filter(p=>p.endsWith('.source')||['ps','git','memory_pressure'].includes(path.basename(p)));
const byHash=new Map();let scanned=0;
for(const p of candidates){try{const s=statSync(p);if(!s.isFile()||s.size<=0||s.size>64*1024**2)continue;const raw=readFileSync(p),h=hash(raw);scanned++;byHash.set(h,[...(byHash.get(h)||[]),{path:p,bytes:raw.length}]);}catch{}}
const rows=unique.map(b=>{
 let current;try{const raw=readFileSync(path.resolve(b.path));current={available:compare(raw,b),sha256:hash(raw),bytes:raw.length};}catch(e){current={available:false,error:e.code};}
 const archives=(byHash.get(b.sha256)||[]).filter(a=>b.bytes===undefined||a.bytes===b.bytes);
 return {...b,current,archives,available:current.available||archives.length>0};
});
const result={schema:'development-process-review/refined-original-input-availability.v1',
 checkedAtUtc:new Date().toISOString(),instrument:'check-original-input-availability.mjs',
 knownControlsPassed:true,scope:'FIXED, REFINED, PRIOR_OPERATIONS and both pinned admissions sourceBindings and stage stdout/stderr bindings; archive candidates are .source suffix or ps/git/memory_pressure basename under .local-data and reference/priorities, <=64 MiB',
 uniqueObligations:rows.length,archiveCandidatesHashed:scanned,currentUnavailable:rows.filter(r=>!r.current.available).length,
 recoveredFromArchive:rows.filter(r=>!r.current.available&&r.archives.length).length,unavailable:rows.filter(r=>!r.available).length,rows};
writeFileSync('reference/priorities/development-process-review/evidence/refined-current-migration/original-input-availability.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({unique:result.uniqueObligations,currentUnavailable:result.currentUnavailable,recovered:result.recoveredFromArchive,unavailable:rows.filter(r=>!r.available)},null,2));
const mismatches=(expected,recorded)=>expected.flatMap(([role,p,h])=>recorded[role]?.sha256!==h?[{role,expectedByCurrentWrapper:h,recorded:recorded[role]}]:[]);
assert.deepEqual(mismatches([['known','unused','a']],{known:{sha256:'a'}}),[]);
assert.deepEqual(mismatches([['known','unused','a']],{known:{sha256:'b'}}),[{role:'known',expectedByCurrentWrapper:'a',recorded:{sha256:'b'}}]);
console.log('Known equal and changed metadata controls passed before recorded ancestry comparison.');
const [,manifestPath,manifestSha]=REFINED.find(r=>r[0]==='manifest'),manifestRaw=readFileSync(manifestPath);
assert.equal(hash(manifestRaw),manifestSha);
const ancestry={knownControlsPassed:true,manifest:{path:manifestPath,sha256:manifestSha},
 differences:mismatches(FIXED,JSON.parse(manifestRaw).fixedBindings)};
writeFileSync('reference/priorities/development-process-review/evidence/refined-current-migration/recorded-ancestry-differences.json',JSON.stringify(ancestry,null,2)+'\n');
