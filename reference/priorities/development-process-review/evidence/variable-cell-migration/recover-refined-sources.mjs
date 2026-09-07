import assert from'node:assert/strict';import{execFileSync}from'node:child_process';import{readFileSync,writeFileSync}from'node:fs';import{createHash}from'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const git=(args,options={})=>execFileSync('git',args,{maxBuffer:256*1024*1024,...options});
function parseBatch(buffer){const records=[];let offset=0;while(offset<buffer.length){const end=buffer.indexOf(10,offset);assert.ok(end>=offset);const header=buffer.subarray(offset,end).toString();const match=/^([0-9a-f]{40}) blob (\d+)$/.exec(header);assert.ok(match,header);const size=Number(match[2]);const bytes=buffer.subarray(end+1,end+1+size);assert.equal(bytes.length,size);assert.equal(buffer[end+1+size],10);records.push({oid:match[1],size,bytes,sha256:sha(bytes)});offset=end+2+size;}return records;}
const knownPath='scripts/eom/prepare-f6c-refined-acceleration.py',knownOid=git(['rev-parse','HEAD:'+knownPath]).toString().trim();
const known=parseBatch(git(['cat-file','--batch'],{input:knownOid+'\n'}));assert.equal(known.length,1);assert.equal(known[0].sha256,sha(readFileSync(knownPath)));console.log('Known-case batch extraction matches the actual current preparation file before target enumeration.');
const base='reference/priorities/development-process-review/evidence/variable-cell-migration/';
const root=process.cwd();
const receipt='.local-data/braid-analysis/f6c-emission-refinement-20260827/pilot-cell-0-v2-outer/pilot-admission.json';
const raw=readFileSync(receipt);assert.equal(sha(raw),'51f0b3774bfb489bbab4fddd7f7612c6d4132f2654a36aa4091e5445eca9b51c');
const refined=JSON.parse(raw).sourceBindings;assert.equal(refined.length,202);
const pilotRaw=readFileSync('.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/pilot-cell-0-cached-v1/pilot-admission.json');assert.equal(sha(pilotRaw),'1a814c90279eed456546b2c4959a8504657213ffc2d25c063060831814e930ee');
const members=[...new Map([...refined,...JSON.parse(pilotRaw).sourceBindings].map(b=>[JSON.stringify(b),b])).values()];
const prior=JSON.parse(readFileSync(base+'refined-source-archives.json')).matches;
const oldArchives=JSON.parse(readFileSync('reference/priorities/development-process-review/evidence/source-recovery/historical-source-archive.json')).sources;
const wanted=members.filter(b=>b.path.startsWith(root+'/')&&!oldArchives.some(x=>x.original===b.path&&x.sha256===b.sha256)&&sha(readFileSync(b.path))!==b.sha256);
const targets=new Set(wanted.map(b=>b.sha256));
console.log(JSON.stringify({wanted}));
const inventory=git(['cat-file','--batch-all-objects','--batch-check=%(objectname) %(objecttype) %(objectsize)']).toString().trim().split('\n').map(line=>{const [oid,type,size]=line.split(' ');return{oid,type,size:Number(size)};});
const selected=inventory.filter(r=>r.type==='blob'&&(r.size>=1000&&r.size<=200000));
console.log(JSON.stringify({objects:inventory.length,selectedBlobs:selected.length,selectedBytes:selected.reduce((s,r)=>s+r.size,0)}));
const matches=[];
for(let offset=0;offset<selected.length;offset+=100){const records=parseBatch(git(['cat-file','--batch'],{input:selected.slice(offset,offset+100).map(r=>r.oid).join('\n')+'\n'}));for(const r of records)if(targets.has(r.sha256)){const original=wanted.find(b=>b.sha256===r.sha256);const saved=prior.find(x=>x.original.sha256===r.sha256);const file=saved?saved.physical.path:base+original.path.split('/').at(-1)+'.'+r.sha256.slice(0,12)+'.source';writeFileSync(file,r.bytes);matches.push({original,physical:{path:file.startsWith('/')?file:root+'/'+file,sha256:r.sha256,bytes:r.size},gitBlob:r.oid});}}
const report={knownCase:'passed before target enumeration',scope:'all local Git objects including unreachable objects; only blobs of 1000 through 200000 bytes hashed',objects:inventory.length,selectedBlobs:selected.length,matches};assert.equal(new Set(matches.map(x=>x.original.sha256)).size,targets.size,'all exact original sources recovered');writeFileSync(base+'refined-source-archives.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
