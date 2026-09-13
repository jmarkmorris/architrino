import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const git = args => execFileSync('git',args,{maxBuffer:8*1024*1024});
const show = (r,p) => git(['show',r+':'+p]);
const unique = (text,re) => {const m=[...text.matchAll(re)];assert.equal(m.length,1,'exactly one expected match');return m[0][1];};
const tuple = text => unique(text, /['"]fullEntry['"]\s*:\s*\(\s*['"]scripts\/eom\/run-f6c-cached-root-cover-full\.mjs['"]\s*,\s*['"]([0-9a-f]+)['"]/g);
const substitutions = (text,oldValue,newValue) => {assert.equal(text.split(oldValue).length-1,1);return text.replace(oldValue,newValue);};
const frozenPairs = text => [...text.matchAll(/frozen\("([^"]+)","([0-9a-f]{64})"\)/g)].map(m=>({path:m[1],expected:m[2]}));
if(process.argv[2]==='controls'){
 assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
 const fixture="'fullEntry':('scripts/eom/run-f6c-cached-root-cover-full.mjs','abc')";
 assert.equal(tuple(fixture),'abc');assert.throws(()=>tuple('none'));assert.throws(()=>tuple(fixture+fixture));
 assert.equal(substitutions('before A after','A','B'),'before B after');assert.throws(()=>substitutions('A A','A','B'));
 assert.notEqual(sha('abc\n'),sha('abc\r\n'));assert.notEqual(sha('abc'),sha('\ufeffabc'));
 assert.deepEqual(frozenPairs('frozen("x","'+ 'a'.repeat(64)+'")'),[{path:'x',expected:'a'.repeat(64)}]);assert.deepEqual(frozenPairs('frozen("x","abbreviated…")'),[]);
 console.log('PASS before target: abc known SHA-256; unique fullEntry extraction; absent/duplicate rejection; exact substitution and duplicate refusal; byte-sensitive LF/CRLF and BOM controls; frozen-pair positive and abbreviated negative.');
}else if(process.argv[2]==='history'){
 const doc='reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md';
 const test='tests/test_eom_continuous_reception_roots.py';
 const docHistory=['0fb575921','897fe1aa7','51ee4b84f^','51ee4b84f','a7609931e','295a24ce2'].map(rev=>{
 const bytes=show(rev,doc), testBytes=show(rev,test); const expected=unique(testBytes.toString(), /"reference\/priorities\/braid-program\/evidence\/2026-08-27-f6c-continuous-reception-enclosure-contract\.md":\s*"([0-9a-f]+)"/g);
 return {rev,commit:git(['show','-s','--format=%H %aI %cI',rev]).toString().trim(),expected,actual:sha(bytes),bytes:bytes.length,matches:sha(bytes)===expected,testSha256:sha(testBytes)};
 });
 const preparation='scripts/eom/prepare-f6c-refined-acceleration.py',runner='scripts/eom/run-f6c-refined-acceleration-pilot.mjs';
 const parent=show('baa3e7323^',preparation).toString(), child=show('baa3e7323',preparation);
 const oldHelper='a327d1ed9d3d6a4017f41ecc4d67eafc5d03abfe4ac60a0844c2624ced8be1f9',newHelper='9eb1afb84a175b143020610c153f9fef6dabb50efce9f956991feca3fbc0d5c2';
 const intermediate=substitutions(parent,oldHelper,newHelper);
 const expected=unique(show('baa3e7323',runner).toString(),/\[CONSUMER\]:'([0-9a-f]+)'/g);
 const intermediateCase={parentSha256:sha(parent),intermediateSha256:sha(intermediate),committedSha256:sha(child),expected,intermediateMatches:sha(intermediate)===expected,committedMatches:sha(child)===expected,parentExpected:unique(show('baa3e7323^',runner).toString(),/\[CONSUMER\]:'([0-9a-f]+)'/g)};
 const receiptPath='.local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827/full-cached-v1/full-admission.json';
 const raw=fs.readFileSync(receiptPath); const receipt=JSON.parse(raw);const entryPath='scripts/eom/run-f6c-cached-root-cover-full.mjs';
 const receiptEntry=receipt.sourceBindings.find(row=>row.path.endsWith('/'+entryPath));assert(receiptEntry);
 const historical=['0fb575921','897fe1aa7','00710092e','baa3e7323','730940e16^','295a24ce2','590ddc942','582efe4bf','959247191','36d34a262'].map(rev=>({rev,commit:git(['show','-s','--format=%H %aI %cI',rev]).toString().trim(),expected:tuple(show(rev,'scripts/eom/prepare-f6c-parent-emission-refinement.py').toString()),currentEntrySha256:sha(show(rev,entryPath))}));
 const testComposition=['0fb575921','897fe1aa7','d52665793^','d52665793'].flatMap(rev=>['tests/f6c-cached-root-cover-pilot-launcher.test.js','tests/f6c-cached-root-cover-full.test.js'].flatMap(consumer=>frozenPairs(show(rev,consumer).toString()).filter(x=>x.path.startsWith('tests/')).map(row=>({...row,rev,consumer,actual:sha(show(rev,row.path)),matches:row.expected===sha(show(rev,row.path))}))));
 const earlierPreparation=['d52665793^','d52665793'].map(rev=>({rev,actual:sha(show(rev,preparation)),expected:unique(show(rev,runner).toString(),/\[CONSUMER\]:'([0-9a-f]+)'/g)}));
 const initialDocuments=[
  {path:'reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-full-resource-plan.md',expected:'46a827d13a5e8f7a068e73e642f74d679ebf18e0b2e8f42ab53aab4de26598ef',blob:'2166adcfc0b4'},
  {path:'reference/priorities/braid-program/evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md',expected:'c67de8cce1370eed779b560c269d5ca0a7505bdb175d39cff1276b75a7e69853',blob:'b3b8889e946f'}
 ].map(row=>{const committed=show('0fb575921',row.path),blob=git(['rev-parse',row.blob]).toString().trim(),recovered=git(['cat-file','blob',blob]);return {...row,blob,committedBytes:committed.length,committedSha256:sha(committed),matchesCommitted:sha(committed)===row.expected,recoveredBytes:recovered.length,recoveredSha256:sha(recovered),matchesRecovered:sha(recovered)===row.expected,originalOccurrences:git(['grep','-n','-F',row.expected,'0fb575921','--','scripts/eom']).toString().trim().split('\n')};});
 console.log(JSON.stringify({measuredAt:new Date().toISOString(),scope:'Read-only Git byte comparisons; no historical code executed.',initialDocuments,docHistory,intermediateCase,earlierPreparation,testComposition,receipt:{path:receiptPath,sha256:sha(raw),bytes:raw.length,entry:receiptEntry,recoveredBlobSha256:sha(git(['cat-file','blob','53db9db24faeebb297f166a89c463cd77540f827']))},historical},null,2));
}else throw new Error('Run controls and retain successful output before history.');
