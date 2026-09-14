// Compose existing operational capture with the protected production record reader.
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {registerHooks,isBuiltin} from 'node:module';

const READERS = Object.freeze([
  'scripts/equation-mapping/production-source-records.mjs',
  'scripts/equation-mapping/current-source-transition.mjs',
  'scripts/equation-mapping/current-source-manifest.mjs'
]);

// Physical admission overhead participates in the existing F6c 512-file/1-GiB
// union. Original identities are supplied by their owning capture engines.
export function accountProductionSources(bindings, captured) {
  assert.ok(Array.isArray(bindings)&&Array.isArray(captured)&&bindings.length+captured.length<=4096,'Bounded physical source declarations');
  const sources=new Map(),identities={},inodes=new Map();
  for(const row of [...bindings,...captured]){
    assert.ok(typeof row.path==='string'&&path.isAbsolute(row.path)&&path.resolve(row.path)===row.path,'Canonical physical source path');
    assert.match(row.sha256??'',/^[a-f0-9]{64}$/u,'Physical source digest');
    assert.ok(Number.isSafeInteger(row.bytes)&&row.bytes>0&&row.bytes<=1024**3,'Bounded physical source bytes');
    const binding={path:row.path,sha256:row.sha256,bytes:row.bytes},prior=sources.get(row.path);
    if(prior)assert.deepEqual(binding,prior,'Conflicting physical source generation');
    sources.set(row.path,binding);
    if(row.identity!==undefined){
      assert.match(row.identity,/^(?:0|[1-9][0-9]*)(?::(?:0|[1-9][0-9]*)){4}$/u,'Original physical identity');
      assert.equal(row.identity.split(':')[2],String(row.bytes),'Original physical identity size');
      if(identities[row.path]!==undefined)assert.equal(identities[row.path],row.identity,'Original physical identity cannot change');
      identities[row.path]=row.identity;
      const inode=row.identity.split(':').slice(0,2).join(':');
      assert.ok(!inodes.has(inode)||inodes.get(inode)===row.path,'Physical source hardlink alias');inodes.set(inode,row.path);
    }
  }
  const values=[...sources.values()];
  assert.ok(values.length<=512&&values.reduce((sum,row)=>sum+row.bytes,0)<=1024**3,'Physical source count/bytes');
  return Object.freeze({sources:Object.freeze(values.map(Object.freeze)),identities:Object.freeze(identities)});
}

export async function admitF6cProduction({root,consumer,bindings,readBound,check}) {
  assert.equal(typeof readBound,'function');assert.equal(typeof check,'function');
  check();
  const captured=new Map();
  for(const relative of READERS){
    const filename=path.join(root,relative),selected=bindings.filter(b=>path.resolve(b.path)===filename);
    assert.equal(selected.length,1,'One operationally selected production reader required: '+relative);
    const record=readBound(filename,selected[0].sha256,true);
    assert.equal(record.bytes,selected[0].bytes,'Selected production reader size differs');
    captured.set(relative,record);
  }
  check();
  const query='?f6c-production='+captured.get(READERS[0]).sha256;
  const hooks=registerHooks({
    resolve(specifier,context,next){
      if(isBuiltin(specifier))return next(specifier,context);
      if(context.parentURL?.endsWith(query)){
        assert.ok(specifier.startsWith('.')||specifier.startsWith('file:'),'Unselected production package import');
        const url=new URL(specifier,context.parentURL);url.search='';
        assert.ok(captured.has(path.relative(root,fileURLToPath(url))),'Production dependency outside captured reader closure');
        return {url:url.href+query,shortCircuit:true};
      }
      return next(specifier,context);
    },
    load(url,context,next){
      if(!url.endsWith(query))return next(url,context);
      const record=captured.get(path.relative(root,fileURLToPath(url)));
      assert.ok(record,'Uncaptured production reader');
      return {format:'module',source:record.data,shortCircuit:true};
    }
  });
  let production;
  try{
    const reader=await import(pathToFileURL(path.join(root,READERS[0])).href+query);
    check();
    production=reader.beginProductionAdmission({root,consumer});
    production.check();check();
    accountProductionSources(bindings,production.capturedSources());
  }finally{hooks.deregister();}
  const accounted = () => accountProductionSources(bindings,production.capturedSources());
  const checked = () => {production.check();check();accounted();};
  return Object.freeze({
    capturedSources(){checked();return production.capturedSources();},
    sourceAccounting(){checked();return accounted();},
    identities(target=consumer){check();const values=production.identities(target);check();return values;},
    originalSourceBinding(target,expectedOriginalSha){check();const binding=production.originalSourceBinding(target,expectedOriginalSha);check();return binding;},
    sourcePair(target,expectedOriginalSha){check();const pair=production.sourcePair(target,expectedOriginalSha);check();return pair;},
    historicalRecord(name){check();const record=production.historicalRecord(name);check();return record;},
    pythonEnvelope(target){
      check();production.check();
      const bridgePath='scripts/eom/production_source_records.py';
      const rows=bindings.filter(b=>path.resolve(b.path)===path.join(root,bridgePath));
      assert.equal(rows.length,1,'One selected Python production bridge required');
      const bridge=readBound(rows[0].path,rows[0].sha256,true);
      assert.equal(bridge.bytes,rows[0].bytes,'Selected Python production bridge size differs');
      const values=production.identities(target);
      production.check();check();
      return JSON.stringify({root,target,identities:values,bridgePath,bridgeSha256:bridge.sha256,bridgeSource:bridge.data.toString('base64')});
    },
    check(){checked();}
  });
}

export const PRODUCTION_ROLES = Object.freeze({
  "scripts/equation-mapping/production-source-records.mjs": "scientific-contract",
  "scripts/eom/production_source_records.py": "scientific-contract",
  "scripts/equation-mapping/current-source-transition.mjs": "scientific-contract",
  "scripts/equation-mapping/fixtures/production-source-identities.json": "scientific-control",
  "reference/priorities/development-process-review/evidence/option-b-production-original-sources.json": "scientific-control",
  "reference/priorities/development-process-review/contracts/option-b-production-sources.jsonld": "scientific-contract",
  "reference/priorities/development-process-review/contracts/option-b-production-accepted-b.json": "scientific-contract",
  "reference/priorities/development-process-review/contracts/option-b-production-transition.json": "scientific-contract",
  "reference/priorities/development-process-review/contracts/option-b-production-selection.json": "scientific-contract",
  "reference/priorities/development-process-review/evidence/option-b-production-transfer.json": "scientific-control",
  "scripts/eom/project-production-native-identities.mjs": "scientific-contract",
  "scripts/equation-mapping/fixtures/known-hash-answers.json": "scientific-control",
  "scripts/eom/f6c-production-admission.mjs": "scientific-contract",
  "reference/priorities/development-process-review/evidence/option-b-production-historical-records.json": "scientific-control",
  "reference/priorities/development-process-review/evidence/option-b-f6c-original-full-record.json": "scientific-control"
});
