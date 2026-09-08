const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),cp=require('node:child_process');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),present=(text,name)=>text.includes(name);
assert.equal(hash('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.equal(present('T known_symbol','known_symbol'),true);assert.equal(present('T known_symbol','missing_symbol'),false);
console.log('Known SHA-256 and positive/negative symbol controls passed before target.');
const base=process.argv[2]||'.local-data/braid-analysis/subfield-circular-root-pilot-20260827-v1/current-build-20260908-execution-review',out='reference/priorities/development-process-review/evidence/circular-current-execution/';
const bound=p=>{const b=fs.readFileSync(p);return{path:p,sha256:hash(b),bytes:b.length};};
const receipt=JSON.parse(fs.readFileSync(base+'/preparation.json'));
assert.equal(receipt.status,'build-recorded-pending-independent-review');assert.equal(receipt.rootCalls,0);assert.equal(receipt.historiesPrepared,false);assert.equal(receipt.rootExecutionAuthorized,false);assert.equal(receipt.h3EvidenceEligible,false);
const checks=[];for(const category of['sources','references','tools','headerDependencies','externalLibraries']){
 assert.deepEqual(receipt[category+'Before'],receipt[category+'After']);
 for(const b of receipt[category+'After']){const actual=bound(b.realPath||b.path);assert.equal(actual.sha256,b.sha256);assert.equal(actual.bytes,b.bytes);checks.push({category,path:b.path,sha256:b.sha256,bytes:b.bytes});}
}
for(const b of[...Object.values(receipt.built),...receipt.discoveryToolsBefore,...receipt.stages.map(s=>s.log)]){const actual=bound(b.realPath||b.path);assert.equal(actual.sha256,b.sha256);assert.equal(actual.bytes,b.bytes);}
for(const b of receipt.runtimeDependencies.filter(r=>r.status==='file-hashed')){assert.equal(bound(b.realPath||b.path).sha256,b.sha256);}
assert.ok(receipt.stages.every(s=>s.code===0&&s.signal===null&&s.processGroupClosed===true&&s.descendantsAfterClose===false&&!s.timedOut&&!s.interrupted));
const exe=receipt.built.executable.path,syms=cp.execFileSync('nm',['-C',exe],{encoding:'utf8'});
assert.equal(present(syms,'certify_exact_pair'),true);
const excluded=['evolve_native_coupled_histories','certify_native_atomic_coupled_step','certify_native_acceleration_snapshot'];for(const name of excluded)assert.equal(present(syms,name),false);
const result={schema:'development-process-review/circular-concrete-build-review.v1',knownControlsPassed:true,reviewedAtUtc:new Date().toISOString(),preparation:bound(base+'/preparation.json'),executable:bound(exe),
 bindingChecks:checks,successfulClosedStages:receipt.stages.length,sourceCount:receipt.sourcesAfter.length,referenceCount:receipt.referencesAfter.length,
 symbolInspection:{instrument:'nm -C',present:['certify_exact_pair'],absent:excluded,scope:'Named symbol presence/absence, not a general call-graph proof'},
 platformBoundary:receipt.runtimeDependencies.filter(r=>r.status!=='file-hashed'),
 authority:{concreteBuildReviewed:true,buildExecutionAccepted:true,rootExecutionAuthorized:false,scientificPilotAccepted:false,h3EvidenceEligible:false},
 falsifier:'Different recorded/current dependency bytes, failed build-stage closure, or an unexpected named coupled execution symbol overturns this scoped review.'};
fs.writeFileSync(out+(process.argv[3]||'build-review.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({sourceCount:result.sourceCount,referenceCount:result.referenceCount,closedStages:result.successfulClosedStages,preparation:result.preparation,executable:result.executable}));
