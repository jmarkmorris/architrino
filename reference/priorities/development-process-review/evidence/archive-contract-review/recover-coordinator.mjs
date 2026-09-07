import assert from'node:assert/strict';import{execFileSync}from'node:child_process';import{readFileSync,writeFileSync}from'node:fs';import{createHash}from'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const git=(args,options={})=>execFileSync('git',args,{maxBuffer:256*1024*1024,...options});
function parseBatch(buffer){const records=[];let offset=0;while(offset<buffer.length){const end=buffer.indexOf(10,offset);assert.ok(end>=offset);const header=buffer.subarray(offset,end).toString();const match=/^([0-9a-f]{40}) blob (\d+)$/.exec(header);assert.ok(match,header);const size=Number(match[2]);const bytes=buffer.subarray(end+1,end+1+size);assert.equal(bytes.length,size);assert.equal(buffer[end+1+size],10);records.push({oid:match[1],size,bytes,sha256:sha(bytes)});offset=end+2+size;}return records;}
const knownPath='scripts/eom/prepare-f6c-refined-acceleration.py',knownOid=git(['rev-parse','HEAD:'+knownPath]).toString().trim();
const known=parseBatch(git(['cat-file','--batch'],{input:knownOid+'\n'}));assert.equal(known.length,1);assert.equal(known[0].sha256,sha(readFileSync(knownPath)));console.log('Known-case batch extraction matches the actual current preparation file before target enumeration.');
const targets=new Set(['5428e4b89736730cdae1671f39b3fd5b0067be781fbfb8cda774347a9890b885']);
const inventory=git(['cat-file','--batch-all-objects','--batch-check=%(objectname) %(objecttype) %(objectsize)']).toString().trim().split('\n').map(line=>{const [oid,type,size]=line.split(' ');return{oid,type,size:Number(size)};});
const selected=inventory.filter(r=>r.type==='blob'&&(r.size>=1000&&r.size<=200000));
console.log(JSON.stringify({objects:inventory.length,selectedBlobs:selected.length,selectedBytes:selected.reduce((s,r)=>s+r.size,0)}));
const matches=[];
for(let offset=0;offset<selected.length;offset+=100){const records=parseBatch(git(['cat-file','--batch'],{input:selected.slice(offset,offset+100).map(r=>r.oid).join('\n')+'\n'}));for(const r of records)if(targets.has(r.sha256)){writeFileSync('/private/tmp/dpr-recovered-'+r.sha256,r.bytes);matches.push({oid:r.oid,sha256:r.sha256,bytes:r.size});}}
const report={knownCase:'passed before target enumeration',scope:'all local Git objects including unreachable objects; only blobs of 1000 through 200000 bytes hashed',objects:inventory.length,selectedBlobs:selected.length,matches};writeFileSync('reference/priorities/development-process-review/evidence/archive-contract-review/coordinator-git-search.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
