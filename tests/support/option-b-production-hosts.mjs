import {captureSet} from '../../scripts/equation-mapping/current-source-transition.mjs';
// Test hosts execute selected captured production bytes and preserve original values.
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {beginProductionAdmission} from '../../scripts/equation-mapping/production-source-records.mjs';

const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const admissions=new Map();
export async function loadProductionTestModule(hostUrl,target){
  const consumer=path.relative(ROOT,fileURLToPath(import.meta.url)).split(path.sep).join('/');
  let admission=admissions.get(consumer);
  if(!admission){admission=beginProductionAdmission({root:ROOT,consumer});admissions.set(consumer,admission);}
  admission.check();
  const pair=admission.sourcePair(target);
  const module=await import('data:text/javascript;base64,'+Buffer.from(pair.current).toString('base64'));
  assert.equal(typeof module.initializeProductionIdentities,'function','Deferred production initializer required');
  module.initializeProductionIdentities(pair.identities);
  admission.check();
  return module;
}

export function productionTestAdmission(){
  const consumer=path.relative(ROOT,fileURLToPath(import.meta.url)).split(path.sep).join('/');
  let admission=admissions.get(consumer);
  if(!admission){admission=beginProductionAdmission({root:ROOT,consumer});admissions.set(consumer,admission);}
  admission.check();return admission;
}
export function productionTestIdentities(target){return productionTestAdmission().identities(target);}


export function originalProductionTestSource(target,expectedOriginalSha){
  const consumer=path.relative(ROOT,fileURLToPath(import.meta.url)).split(path.sep).join('/');
  let admission=admissions.get(consumer);
  if(!admission){admission=beginProductionAdmission({root:ROOT,consumer});admissions.set(consumer,admission);}
  admission.check();
  const binding=admission.originalSourceBindingIfPresent(target,expectedOriginalSha);
  if(binding===null)return null;
  const pair=admission.sourcePair(target,expectedOriginalSha);admission.check();
  return Buffer.from(pair.original);
}


const historicalTestData=captureSet(ROOT);
export function originalProductionTestData(target){
  const consumer=path.relative(ROOT,fileURLToPath(import.meta.url)).split(path.sep).join('/');
  let admission=admissions.get(consumer);
  if(!admission){admission=beginProductionAdmission({root:ROOT,consumer});admissions.set(consumer,admission);}
  admission.check();historicalTestData.check();
  const indexPath='reference/priorities/development-process-review/evidence/option-b-production-original-sources.json';
  const selected=admission.capturedSources().filter(b=>b.path===path.join(ROOT,indexPath));
  assert.equal(selected.length,1,'One authenticated original index required');
  const index=JSON.parse(historicalTestData.capture(indexPath,selected[0].sha256));
  assert.equal(index.schema,'option-b-production-original-sources/v1');
  assert.equal(index.role,'historical-source-generations-not-current-acceptance');
  const entry=Object.hasOwn(index.sources,target)?index.sources[target]:undefined;
  if(entry===undefined){historicalTestData.check();admission.check();return null;}
  // Test-only original evidence, never executed or admitted as runtime source.
  const original=historicalTestData.capture(entry.path,entry.sha256);
  historicalTestData.check();admission.check();return Buffer.from(original);
}
