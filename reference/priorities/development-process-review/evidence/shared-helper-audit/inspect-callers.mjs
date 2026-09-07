// Metadata-only audit. Imports expose declarations; no launch/compute entry is called.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root=process.cwd();
const out='reference/priorities/development-process-review/evidence/shared-helper-audit';
const sha=b=>createHash('sha256').update(b).digest('hex');
const tokens=['35f00bb0b97a045447f3053ed2705bddceaa62d1ebdd522e9f6eb44943215826','f178c5d393ca741a0e82aa9865fa796d5901f1751be954183735db1f4a3f6a31','042684de5b23216a8af4a8187e02db3236206249d0f857215dc47a89b8c62d47'];
function occurrences(file,text){return text.split('\n').flatMap((line,i)=>tokens.filter(t=>line.includes(t)).map(token=>({file,line:i+1,token,text:line})));}
function inspect(file,expected){try{const bytes=readFileSync(file);return{path:file,expected,actual:sha(bytes),bytes:bytes.length,status:sha(bytes)===expected?'match':'differs'};}catch(e){return{path:file,expected,status:'unavailable',error:e.code};}}
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.deepEqual(occurrences('known',`nothing\n${tokens[0]}\n${tokens[1]} ${tokens[2]}`),[
 {file:'known',line:2,token:tokens[0],text:tokens[0]},
 {file:'known',line:3,token:tokens[1],text:tokens[1]+' '+tokens[2]},
 {file:'known',line:3,token:tokens[2],text:tokens[1]+' '+tokens[2]}]);
const known=path.join(out,'known-input.txt');writeFileSync(known,'abc');
assert.equal(inspect(known,sha('abc')).status,'match');assert.equal(inspect(known,'0'.repeat(64)).status,'differs');
assert.equal(inspect(path.join(out,'deliberately-absent-input'),'0'.repeat(64)).status,'unavailable');
writeFileSync(path.join(out,'known-case.json'),JSON.stringify({sha256ABC:true,occurrenceLinesAndMultipleTokens:true,matchingDifferentMissingFiles:true,performedBeforeTarget:true})+'\n');
console.log('Known cases passed before target inventory.');
const files=execFileSync('git',['ls-files','-z','--','scripts','tests'],{encoding:'utf8'}).split('\0').filter(Boolean);
const found=files.flatMap(f=>occurrences(f,readFileSync(f,'utf8')));
const declarations=[];
for(const name of ['run-prescribed-response-pilot','run-f6c-root-cover-pilot','run-f6c-cached-root-cover-pilot','run-f6c-cached-root-cover-full','run-f6c-acceleration-pilot','run-f6c-emission-refinement-pilot','run-f6c-refined-acceleration-pilot']){
 const file=`scripts/eom/${name}.mjs`,m=await import(pathToFileURL(path.join(root,file)));
 const knownBinding={path:path.resolve(known),sha256:sha('abc'),bytes:3};
 assert.equal(m.checkBindings([knownBinding])[0].sha256,knownBinding.sha256);
 assert.throws(()=>m.checkBindings([{...knownBinding,sha256:'0'.repeat(64)}]));
 console.log('Existing binding API known cases passed: '+file);
 const helperAdmission=Object.entries(m.PINS).filter(([,h])=>tokens.includes(h)).map(([f,h])=>{
  try{m.checkBindings([{path:path.resolve(f),sha256:h,bytes:statSync(f).size}]);return{path:f,status:'admitted'};}
  catch(e){return{path:f,status:'rejected',reason:e.message};}
 });
 declarations.push({file,sha256:sha(readFileSync(file)),existingBindingAPIKnownCasesPassed:true,helperAdmission,bindings:Object.entries(m.PINS).map(([f,h])=>inspect(f,h))});
}
const references=[];
for(const file of [...new Set(found.map(r=>r.file))]){
 let raw;try{raw=execFileSync('git',['grep','-n','-F','--',path.basename(file)],{encoding:'utf8',maxBuffer:16*1024**2});}catch(e){if(e.status!==1)throw e;raw='';}
 references.push({file,sha256:sha(readFileSync(file)),references:raw.split('\n').filter(Boolean)});
}
const helpers=['scripts/eom/launch-subfield-circular-root-pilot.mjs','scripts/eom/launch-prescribed-response-pilot.mjs','scripts/eom/launch-f6c-emission-refinement-pilot.mjs'].map(f=>({file:f,sha256:sha(readFileSync(f)),bytes:statSync(f).size}));
const historicalHelperIdentity=['21771de11164f95f129c42855a57dd699f4d0e4d','c86595d1316d3794d897489dffc0b2b287bd5e7e'].flatMap(ref=>helpers.slice(0,2).map(({file})=>({ref,file,sha256:sha(execFileSync('git',['show',ref+':'+file]))})));
const result={baseline:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),scope:'Exact three generation tokens in tracked scripts/ and tests/; basename references throughout tracked repository. Occurrences and mismatches are not defect counts.',knownCasesPassed:true,occurrences:found,helpers,historicalHelperIdentity,declarations,references,scientificCalls:0};
writeFileSync(path.join(out,'inventory.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({occurrences:found.length,files:new Set(found.map(r=>r.file)).size,declarations:declarations.map(r=>({file:r.file,bindings:r.bindings.length,differ:r.bindings.filter(b=>b.status==='differs').length,unavailable:r.bindings.filter(b=>b.status==='unavailable').length}))},null,2));
