// Selected source admission precedes generation; selected projection bytes are
// checked afterwards. Browser modules retain their synchronous, fetch-free API.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {captureSet, inspectCurrentSources} from '../equation-mapping/current-source-transition.mjs';
import {decode, validate, sha256} from '../equation-mapping/current-source-manifest.mjs';

export const BORG_RUNTIME_PROFILE = 'borg-runtime-sources';
export const BORG_RUNTIME_MAP = 'reference/priorities/development-process-review/contracts/option-b-borg-runtime-sources.jsonld';
export const BORG_OUTPUT_MAP = 'reference/priorities/development-process-review/contracts/option-b-borg-runtime-outputs.jsonld';
export const BORG_RUNTIME_SELECTION = 'reference/priorities/development-process-review/contracts/option-b-borg-runtime-selection.json';
export const BORG_FAMILIES = Object.freeze({
  'borg-catalog': 'content/generated/borg/assembly-record-catalog.v2.js',
  'borg-budget-identities': 'content/generated/borg/certified-budget-identities.v1.js',
});
const fields=(value,names)=>{assert.ok(value&&typeof value==='object'&&!Array.isArray(value),'Selection object required');assert.deepEqual(Object.keys(value).sort(),names.split(' ').sort(),'Closed selection required');};

export function beginBorgRuntimeAdmission({root, selection, consumer}={}) {
  const selectedBytes=fs.readFileSync(path.join(root,BORG_RUNTIME_SELECTION));
  selection ??= decode(selectedBytes);
  fields(selection,'acceptedBaseline acceptedBaselineSha256 transition transitionSha256');
  const captured=captureSet(root);
  captured.capture(BORG_RUNTIME_SELECTION,sha256(selectedBytes));
  let sources,outputs;
  inspectCurrentSources({root,...selection,requiredProfiles:[BORG_RUNTIME_PROFILE],beforeFinalCheck:()=>{
    const accepted=decode(captured.capture(selection.acceptedBaseline,selection.acceptedBaselineSha256));
    captured.capture(accepted.historicalProof.path,accepted.historicalProof.sha256);
    const transition=decode(captured.capture(selection.transition,selection.transitionSha256));
    const profile=transition.profiles.find(row=>row.name===BORG_RUNTIME_PROFILE);
    assert.equal(profile.manifestPath,BORG_RUNTIME_MAP,'Exact Borg source map required');
    const document=decode(captured.capture(BORG_RUNTIME_MAP,profile.sha256));assert.equal(document.scope,BORG_RUNTIME_PROFILE);
    sources=[...validate(document).sources.values()];
    if(consumer){
      const selectedConsumer=sources.find(row=>row.binding.path===consumer);
      assert.ok(selectedConsumer, `Unselected Borg consumer: ${consumer}`);
      assert.ok(['current-source','launcher','scientific-control','scientific-contract'].includes(selectedConsumer.role),'Protected Borg consumer role required');
    }
    for(const row of sources)captured.capture(row.binding.path,row.binding.sha256);
    const outputMap=sources.find(row=>row.binding.path===BORG_OUTPUT_MAP);assert.equal(outputMap?.role,'scientific-contract','Protected projection map required');
    const projected=decode(captured.capture(BORG_OUTPUT_MAP,outputMap.binding.sha256));assert.equal(projected.scope,'borg-runtime-outputs');
    const graph=validate(projected);outputs=[...graph.sources.values()];
    // A second graph represents deferred generated outputs, not a second
    // authority: its bytes are protected by the selected source checkpoint.
    for(const row of outputs){
      if(Object.values(BORG_FAMILIES).includes(row.binding.path)){assert.equal(row.role,'scientific-control');continue;}
      const original=sources.find(source=>source.binding.path===row.binding.path);
      assert.deepEqual(row,original,'Projection graph changes a selected source');
    }
    for(const p of Object.values(BORG_FAMILIES))assert.ok(outputs.some(row=>row.binding.path===p),'Missing projection binding');
  }});
  const completed=new Set();
  function verifyFamily(id){
    assert.ok(Object.hasOwn(BORG_FAMILIES,id),'Known Borg family required');
    const row=outputs.find(row=>row.binding.path===BORG_FAMILIES[id]);captured.capture(row.binding.path,row.binding.sha256);
    captured.check();completed.add(id);
  }
  function verifyPublished(directory){
    captured.check();
    const published=captureSet(directory);
    // The declared browser consumers, contracts, data and ESM outputs are
    // copied byte-for-byte by Pages. No Node admission code runs in browsers.
    for(const row of outputs){
      if(row.binding.path.startsWith('src/') || [...completed].some(id=>BORG_FAMILIES[id]===row.binding.path))published.capture(row.binding.path,row.binding.sha256);
    }
    published.check();captured.check();
  }
  return Object.freeze({verifyFamily,check:()=>captured.check(),verifyPublished});
}

// Preparation and execution consume already selected projections. Generation is
// exclusively the runtime setup route; this route cannot refresh an expectation.
export function beginBorgConsumerAdmission({root,selection,consumer}={}) {
  assert.equal(typeof consumer,'string','Borg consumer path required');
  const admitted=beginBorgRuntimeAdmission({root,selection,consumer});
  for(const family of Object.keys(BORG_FAMILIES))admitted.verifyFamily(family);
  admitted.check();
  return admitted;
}

const retainedConsumers=new Map();
export function borgConsumerAdmission(consumerUrl) {
  const root=fs.realpathSync(fileURLToPath(new URL('../../',import.meta.url)));
  const consumer=path.relative(root,fileURLToPath(consumerUrl)).split(path.sep).join('/');
  let admitted=retainedConsumers.get(consumer);
  if(!admitted){admitted=beginBorgConsumerAdmission({root,consumer});retainedConsumers.set(consumer,admitted);}
  admitted.check();
  return admitted;
}
