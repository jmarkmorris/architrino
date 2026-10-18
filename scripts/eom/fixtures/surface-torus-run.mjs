// Explicit-use SURFACE-003 ring-torus scientific qualification; no recurring enrollment.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, writeFileSync, openSync, closeSync, renameSync, existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {resolve, join} from 'node:path';

const hash = value => createHash('sha256').update(value).digest('hex');
assert.equal(hash('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
function coverage(interval, time) { return Number(interval[0]) <= time && time <= Number(interval[1]); }
assert.equal(coverage(['0','1'],0.5),true);
assert.equal(coverage(['0','1'],2),false);
console.log('Known hash and interval inclusion/exclusion controls passed before target reads.');

const variant = process.argv[2] ?? 'base';
const choices = {base:['0.01','1e-5','1e-4','0.02'], step:['0.005','1e-5','1e-4','0.02'], tight:['0.005','1e-7','1e-5','0.01'], inner:['0.01','1e-5','1e-4','0.02'], innerStep:['0.005','1e-5','1e-4','0.02'], innerTight:['0.005','1e-7','1e-5','0.01'], invalid:['0.01','1e-5','1e-4','0.02']};
assert.ok(Object.hasOwn(choices,variant),'Use base, step, tight, inner, innerStep, innerTight or invalid.');
const [step,root,tolerance,preparationStep]=choices[variant];
const rootPath=resolve(process.argv[4]??'.local-data/eom/surface-torus-2026-10-14');
mkdirSync(rootPath,{recursive:true});
assert.equal(existsSync(join(rootPath,`${variant}.request.json`)),false,'Preserve original observations; pass a fresh local evidence directory as argument four.');
const phases=['0','1.0471975511965977461542144610931676','2.0943951023931954923084289221863353','3.1415926535897932384626433832795029','4.1887902047863909846168578443726705','5.2359877559829887307710723054658381'];
const inner=variant.startsWith('inner');
const request={schema:'eom_evolution_request/v2',runId:`surface-torus-${variant}`,model:{compositionId:'canonical-surface/v1',constraint:'surface',speedDomain:'unrestricted',boundaryPolicy:'none',fieldSpeed:'1',coupling:'0.000001',geometry:{kind:'ring-torus',radius:'0.05',majorRadius:'0.1'}},interval:{start:'0',end:'0.15'},paths:phases.map((phase,index)=>({pathId:`p${index}`,charge:index%2===0?'1':'-1',history:{kind:'uniform-circular',start:'-0.5',end:'0',maximumSegmentStep:preparationStep,radius:inner?'0.07':'0.13',height:'0.04',angularSpeed:'0.1',speed:inner?'0.007':'0.013',phase}})),numerics:{initialStep:step,maximumStep:step,minimumStep:String(Number(step)/8),rootTolerance:root,accelerationTolerance:tolerance,positionTolerance:tolerance,velocityTolerance:tolerance,correctionTolerance:tolerance,surfacePositionTolerance:tolerance,surfaceTangentVelocityTolerance:tolerance,maxStepAttempts:80,maxRejectedSteps:20},resources:{memoryBytes:2147483648}};
if(variant==='invalid')request.paths[1].history.height='0.041';
const retain=(name,value)=>{const text=JSON.stringify(value,null,2)+'\n';writeFileSync(join(rootPath,name),text);return{path:join(rootPath,name),bytes:Buffer.byteLength(text),sha256:hash(text)};};
retain(`${variant}.request.json`,request);
const binaryPath=resolve(process.argv[3]??'.tmp/surface-torus-qualification/build/eom_borg_shadow_cli');
mkdirSync(join(rootPath,'checkpoints'),{recursive:true});
// Scientific raw ledgers exceed the browser client's bounded response buffer.
// Stream the same production CLI to retained files; no dynamics run here.
async function execute(envelope,onProgress=()=>{}) {
  const finalPath=join(rootPath,`${variant}.${envelope.operation==='evolve'?'response':'inspection'}.json`);
  assert.equal(existsSync(finalPath),false,'Preserve existing retained result; choose a fresh evidence owner for reproduction.');
  const id=randomUUID(); const rawPath=join(rootPath,`${variant}.${envelope.operation}.${id}.wire.json`);
  const checkpoint=join(rootPath,'checkpoints',id+'.json');
  const fd=openSync(rawPath,'wx');
  try {
    await new Promise((resolveExit,reject)=>{
      const worker=spawn(binaryPath,['eom-v2','--checkpoint-file',checkpoint],{stdio:['pipe',fd,'pipe']});
      let ready=false,pending=false,lines='',grace,kill;
      const deadline=setTimeout(()=>{pending=true;if(ready)worker.kill('SIGUSR1');grace=setTimeout(()=>{worker.kill('SIGTERM');kill=setTimeout(()=>worker.kill('SIGKILL'),2000);},5000);},120000);
      worker.stderr.setEncoding('utf8');worker.stderr.on('data',part=>{lines+=part;let end;while((end=lines.indexOf('\n'))>=0){const line=lines.slice(0,end);lines=lines.slice(end+1);let event;try{event=JSON.parse(line);}catch{process.stderr.write(line+'\n');continue;}if(event.schema==='eom_ready/v2'){ready=true;if(pending)worker.kill('SIGUSR1');}if(event.schema==='eom_progress/v2')onProgress(event);}});
      worker.on('error',error=>{clearTimeout(deadline);clearTimeout(grace);clearTimeout(kill);reject(error);});
      worker.on('close',(code,signal)=>{clearTimeout(deadline);clearTimeout(grace);clearTimeout(kill);code===0?resolveExit():reject(Error(`EOM CLI terminated ${code}/${signal}; raw output ${rawPath}`));});
      worker.stdin.on('error',error=>process.stderr.write(error.message+'\n'));worker.stdin.end(JSON.stringify(envelope)+'\n');
    });
  }finally{closeSync(fd);}
  const payload=JSON.parse(readFileSync(rawPath,'utf8'));
  if(payload.checkpoint?.durable){const retained=JSON.parse(readFileSync(checkpoint,'utf8'));assert.equal(retained.digest,payload.checkpoint.digest);assert.equal(retained.acceptedTime,payload.checkpoint.acceptedTime);}
  renameSync(rawPath,finalPath);
  return payload;
}
let response;
{
  const inspection=await execute({operation:'inspect',request});
  const start=Date.now();
  response=await execute({operation:'evolve',request},event=>console.log(JSON.stringify({variant,acceptedSteps:event.acceptedStepCount,time:event.acceptedTime,wallSeconds:(Date.now()-start)/1000})));
  const captured=readFileSync(join(rootPath,`${variant}.response.json`));
  const payload={path:join(rootPath,`${variant}.response.json`),bytes:captured.length,sha256:hash(captured)};
  const diagnostics={variant,status:response.status,acceptedCoverage:response.acceptedCoverage??null,acceptedSteps:response.acceptedStepCount??0,rejectedSteps:response.rejectedStepCount,halt:response.halt,wallSeconds:(Date.now()-start)/1000,payload};
  retain(`${variant}.run-receipt.json`,diagnostics);
  console.log(JSON.stringify(diagnostics));
  if(variant!=='invalid')assert.equal(response.schema,'eom_evolution_response/v2',JSON.stringify(response));
  if(variant==='invalid'){
    assert.equal(response.schema,'eom_error/v2');assert.equal(response.code,'surface_preparation_not_certified');assert.equal(response.publishedExtensions,undefined);console.log('Off-surface circular preparation refused before evolution/publication.');
  }else{
  assert.equal(response.status,'completed',JSON.stringify(response.halt));
  assert.equal(response.modelDigest,inspection.modelDigest);
  assert.equal(Number(response.acceptedCoverage.end),0.15);
  assert.equal(response.checkpoint.durable,true);
  assert.equal(response.publishedExtensions.length,6);
  assert.equal(response.evidence.scientificAcceptance,false);
  const pairs=new Set();let selfPairs=0,partnerPairs=0;
  for(const snapshot of response.ledgers.pointRoots){
    assert.equal(snapshot.status,'certified_complete');assert.equal(snapshot.logicalOrderedPairs,36);
    assert.equal(snapshot.pairs.length,36);
    for(const pair of snapshot.pairs){
      assert.equal(pair.status,'certified_complete');assert.equal(pair.rootFreeComplement,true);assert.equal(pair.memoryBoundaryContact,false);
      if(pair.receiverPathId===pair.transmitterPathId){assert.equal(pair.roots.length,0);assert.equal(pair.coincidentEndpointExcluded,true);selfPairs++;}
      else{assert.equal(pair.roots.length,1);assert.ok(Number(pair.roots[0].transmitterFactor[0])>0);partnerPairs++;}
      pairs.add(pair.receiverPathId+'|'+pair.transmitterPathId);
    }
  }
  assert.equal(pairs.size,36);
  const computed=response.ledgers.partnerRoots.filter(root=>!root.analyticSourceAcceleration);
  assert.ok(computed.length>0,'No computed-source feedback exercised.');
  assert.ok(computed.some(root=>Number(root.emission[0])>0));
  const receivers=new Set(response.surfaceDiagnostics.map(x=>x.pathId));assert.equal(receivers.size,6);
  for(const solution of response.ledgers.surfaceSolutions){assert.equal(solution.certified,true);assert.ok(Number(solution.contractionBound)<1);assert.ok(Number(solution.solutionSpeedUpper)<1);assert.ok(solution.geometry.length>0);assert.ok(solution.geometry.every(g=>g.certified));}
  const accounting={selfPairs,partnerPairs,orderedPairs:pairs.size,computedSourceSlabs:computed.length,solutionCertificates:response.ledgers.surfaceSolutions.length,diagnosticRecords:response.surfaceDiagnostics.length};
  retain(`${variant}.accounting.json`,accounting);console.log(JSON.stringify({variant,accounting}));
  }
}
