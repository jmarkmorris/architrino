import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {execFileSync, spawnSync} from 'node:child_process';
import {loadControlledFixture, FIXTURE_MANIFEST, FIXTURE_SELECTION, KNOWN_PAYLOAD, PRIOR_PAYLOAD} from '../scripts/equation-mapping/controlled-fixture-records.mjs';
import {copyControlledFixtureTree} from './support/option-b-controlled-fixture-tree.mjs';
import {decode, validate, sha256} from '../scripts/equation-mapping/current-source-manifest.mjs';
import {compareSourceManifests} from '../scripts/equation-mapping/current-source-impact.mjs';
const root=fs.realpathSync(new URL('../',import.meta.url));
const proofPath='reference/priorities/development-process-review/evidence/option-b-controlled-fixture-transfer.json';
function fixture(t){
 const directory=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'controlled-fixture-')));t.after(()=>fs.rmSync(directory,{recursive:true,force:true}));
 copyControlledFixtureTree(root,directory);
 const selection=decode(fs.readFileSync(path.join(directory,FIXTURE_SELECTION)));
 const run=(overrides={})=>loadControlledFixture({root:directory,selection,consumer:'tests/source-replay.test.js',...overrides});
 return{directory,selection,run};
}

test('original known answer historical tuple and import-only consumers remain exact',()=>{
 const proof=decode(fs.readFileSync(proofPath));
 for(const p of [KNOWN_PAYLOAD,PRIOR_PAYLOAD])assert.deepEqual(fs.readFileSync(p),execFileSync('git',['show',proof.originCommit+':'+p]));
 const inverse=(source,rows)=>rows.toReversed().reduce((value,row)=>{assert.equal(value.split(row.after).length,2,row.path);return value.replace(row.after,row.before);},source);
 assert.equal(inverse('new\nassertion;',[{before:'old',after:'new'}]),'old\nassertion;');
 for(const p of proof.importOnlyConsumers){
  const before=execFileSync('git',['show',proof.originCommit+':'+p]);
  assert.equal(sha256(before),proof.originalBindings.find(row=>row.path===p).sha256);
  assert.equal(inverse(fs.readFileSync(p,'utf8'),proof.replacements.filter(row=>row.path===p)),before.toString(),p);
 }
 // Published expectation is read independently from preserved data, never
 // manufactured from the implementation being checked.
 const known=decode(fs.readFileSync(KNOWN_PAYLOAD));assert.equal(sha256('abc'),known.sha256.abc);
});

test('known admitted payload precedes wrong missing stale symlink and replacement rejection',t=>{
 const f=fixture(t),expected=fs.readFileSync(KNOWN_PAYLOAD);assert.deepEqual(f.run(),expected);
 for(const selection of [undefined,{}, {...f.selection,extra:true}, {...f.selection,transitionSha256:'0'.repeat(64)}])assert.throws(()=>f.run({selection}));
 assert.throws(()=>f.run({consumer:'tests/not-listed.js'}),/Selected fixture consumer/);
 assert.throws(()=>f.run({payload:PRIOR_PAYLOAD}),/Selected fixture consumer/);
 for(const p of [KNOWN_PAYLOAD,PRIOR_PAYLOAD,'tests/option_b_fixture_records.py','tests/source-replay.test.js']){
  const file=path.join(f.directory,p),bytes=fs.readFileSync(file);fs.appendFileSync(file,' ');assert.throws(()=>f.run(),/Stale binding/);fs.writeFileSync(file,bytes);
  fs.renameSync(file,file+'.real');assert.throws(()=>f.run());fs.symlinkSync(file+'.real',file);assert.throws(()=>f.run(),/symlink/);fs.rmSync(file);fs.renameSync(file+'.real',file);
 }
 assert.throws(()=>f.run({beforeFinalCheck:()=>{const p=path.join(f.directory,KNOWN_PAYLOAD);fs.copyFileSync(p,p+'.new');fs.renameSync(p+'.new',p);}}),/Original identity replaced/);
 assert.deepEqual(f.run(),expected);
});

function actualBoundary(t,includePython){
 const f=fixture(t),env={...process.env};delete env.NODE_TEST_CONTEXT;
 const python=path.resolve(root,process.env.AAA_VENV??'../.venv','bin/python');
 const script=`import importlib.util,sys\nfrom pathlib import Path\nr=Path.cwd()\ns=importlib.util.spec_from_file_location('reader',r/'tests/option_b_fixture_records.py')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\na=m.known_sha256(r,'tests/test_f6c_acceleration_execution.py')\nb=m.acceleration_prior(r,'tests/test_f6c_acceleration_execution.py')\nassert isinstance(a,str) and isinstance(b,tuple) and len(b)==3\nprint('ADMITTED_CONTROL')\n`;
 const commands=includePython?[[python,['-c',script]]]:[[process.execPath,['--input-type=module','-e',`import {knownHashAnswers} from './scripts/equation-mapping/controlled-fixture-records.mjs'; knownHashAnswers('tests/source-replay.test.js'); console.log('ADMITTED_CONTROL');`]]];
 fs.symlinkSync(path.join(root,'node_modules'),path.join(f.directory,'node_modules'));
 if(!includePython) commands.push([process.execPath,['--test','--test-reporter=tap','--test-name-pattern=known abc','tests/current-source-manifest.test.mjs']]);
 if(includePython) for(const filename of ['test_f5_current_handoff.py','test_f6c_acceleration_execution.py','test_f6c_retained_history_export.py']) {
  // On the positive case stop at the first scientific import; admission has
  // already executed. Complete subject regressions run separately.
  const actual=`import importlib.util,sys\nfrom pathlib import Path\nr=Path.cwd()\noriginal=importlib.util.spec_from_file_location\ndef boundary(name,location,*args,**kwargs):\n if Path(location).is_relative_to(r/'scripts/eom'):\n  print('ADMITTED_CONTROL');sys.exit(0)\n return original(name,location,*args,**kwargs)\nimportlib.util.spec_from_file_location=boundary\ns=original('actual_consumer',r/'tests/${filename}')\nm=importlib.util.module_from_spec(s);s.loader.exec_module(m)\nraise AssertionError('Expected subject boundary not reached')\n`;
  commands.push([python,['-c',actual]]);
 }
 for(const [command,args] of commands){
  const run=()=>spawnSync(command,args,{cwd:f.directory,env,encoding:'utf8',timeout:30000});
  let result=run();assert.equal(result.status,0,result.stdout+result.stderr);assert.match(result.stdout,/ADMITTED_CONTROL|ok 1 - known abc/);
  for(const p of [KNOWN_PAYLOAD,PRIOR_PAYLOAD,FIXTURE_SELECTION]){
   const file=path.join(f.directory,p),bytes=fs.readFileSync(file);fs.writeFileSync(file,'{}');result=run();assert.notEqual(result.status,0);assert.doesNotMatch(result.stdout,/ADMITTED_CONTROL|ok 1 - known abc/);fs.writeFileSync(file,bytes);
   fs.renameSync(file,file+'.absent');result=run();assert.notEqual(result.status,0);assert.doesNotMatch(result.stdout,/ADMITTED_CONTROL|ok 1 - known abc/);fs.renameSync(file+'.absent',file);
  }
  assert.equal(run().status,0);
 }
}

test('actual Node fixture consumer rejects altered records and selection before controls',t=>actualBoundary(t,false));
test('shared-venv Python fixture consumers reject before scientific subject loading',t=>actualBoundary(t,true));

test('selected successor cannot remove dependency change protected role or refresh expectation',t=>{
 const f=fixture(t);assert.ok(f.run().length);
 const mapPath=path.join(f.directory,FIXTURE_MANIFEST),transitionPath=path.join(f.directory,f.selection.transition);
 const mapBytes=fs.readFileSync(mapPath),transitionBytes=fs.readFileSync(transitionPath);
 for(const change of [m=>m['@graph'].splice(m['@graph'].findIndex(r=>r.kind==='dependsOn'),1),m=>{m['@graph'].find(r=>r.binding?.path===KNOWN_PAYLOAD).role='current-source';},m=>{m['@graph'].find(r=>r.binding?.path===PRIOR_PAYLOAD).binding.sha256='0'.repeat(64);},m=>{const id=m['@graph'].find(r=>r.binding?.path==='tests/test_f6c_acceleration_execution.py')['@id'];m['@graph']=m['@graph'].filter(r=>r['@id']!==id&&r.from!==id&&r.to!==id);}]){
  const map=decode(mapBytes);change(map);fs.writeFileSync(mapPath,JSON.stringify(map));const transition=decode(transitionBytes);transition.profiles[0].sha256=sha256(fs.readFileSync(mapPath));fs.writeFileSync(transitionPath,JSON.stringify(transition));
  assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:sha256(fs.readFileSync(transitionPath))}}));fs.writeFileSync(mapPath,mapBytes);fs.writeFileSync(transitionPath,transitionBytes);
 }
});

test('standard graph impact follows both languages and removed edges',async()=>{
 const before=decode(fs.readFileSync(FIXTURE_MANIFEST)),graph=validate(before),proof=decode(fs.readFileSync(proofPath));
 const sources=[...graph.sources.values()],id=p=>sources.find(r=>r.binding.path===p)['@id'];
 for(const p of proof.consumers.filter(p=>p.endsWith('.py')))assert.ok(graph.edges.some(e=>e.kind==='dependsOn'&&e.from===id(p)&&e.to===id('tests/option_b_fixture_records.py')));
 for(const p of [KNOWN_PAYLOAD,PRIOR_PAYLOAD,'scripts/equation-mapping/controlled-fixture-records.mjs'])assert.ok(graph.edges.some(e=>e.kind==='dependsOn'&&e.from===id('tests/option_b_fixture_records.py')&&e.to===id(p)));
 assert.equal((await compareSourceManifests(before,before)).status,'unchanged');
 const after=structuredClone(before),payload=after['@graph'].find(r=>r.binding?.path===KNOWN_PAYLOAD);payload.binding.sha256='0'.repeat(64);payload.revisionId+='-changed';
 for(const edge of after['@graph'].filter(r=>r.to===payload['@id'])){edge.toRevision=payload.revisionId;edge.revisionId+='-changed';}
 after['@graph']=after['@graph'].filter(r=>!(r.kind==='dependsOn'&&r.to===payload['@id']));
 const result=await compareSourceManifests(before,after);assert.equal(result.status,'review-required');assert.ok(result.removed.length);
 for(const p of proof.consumers)assert.ok(result.affected.includes([...graph.sources.values()].find(r=>r.binding.path===p)['@id']),p);
});

test('graph-valid successors still require predecessor path-role grants and preserve protected payloads',async t=>{
 const {changesBetween}=await import('../scripts/equation-mapping/current-source-transition.mjs');
 const f=fixture(t);assert.ok(f.run().length);
 const mapPath=path.join(f.directory,FIXTURE_MANIFEST),transitionPath=path.join(f.directory,f.selection.transition);
 const original=fs.readFileSync(mapPath),review=fs.readFileSync(transitionPath);
 for(const [p,reason] of [[KNOWN_PAYLOAD,/Protected scientific\/reference\/reader selection/],['scripts/equation-mapping/check-moving-single-root-map.mjs',/Operational refresh not eligible/]]){
  const before=decode(original),after=structuredClone(before),source=after['@graph'].find(r=>r.binding?.path===p);
  source.revisionId+='-successor';source.binding.sha256='0'.repeat(64);after.revisionId+='-successor';
  for(const edge of after['@graph'].filter(r=>r.from===source['@id']||r.to===source['@id'])){
   if(edge.from===source['@id'])edge.fromRevision=source.revisionId;if(edge.to===source['@id'])edge.toRevision=source.revisionId;edge.revisionId+='-successor';
  }
  validate(after);const transition=decode(review);transition.profiles[0].changes=changesBetween(before,after);
  fs.writeFileSync(mapPath,JSON.stringify(after));transition.profiles[0].sha256=sha256(fs.readFileSync(mapPath));fs.writeFileSync(transitionPath,JSON.stringify(transition));
  assert.throws(()=>f.run({selection:{...f.selection,transitionSha256:sha256(fs.readFileSync(transitionPath))}}),reason);
  fs.writeFileSync(mapPath,original);fs.writeFileSync(transitionPath,review);
 }
});
