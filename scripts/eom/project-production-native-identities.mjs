// Deterministic native constant projection from selected original records.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {beginProductionAdmission} from '../equation-mapping/production-source-records.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const CIRCULAR_PATHS=["src/prescribed-path-analysis/CircularHistoryConformance.mjs","scripts/eom/derive-subfield-circular-root-reference.mjs",".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-root-reference-20260827-v1.json","scripts/eom/derive-subfield-circular-history-budget.mjs",".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-history-budget-20260827-v1.json","reference/priorities/braid-program/evidence/2026-08-27-subfield-circular-h3-pilot-predeclaration.md","scripts/eom/verify-subfield-circular-history.mjs"];
export function renderProductionNativeIdentities(f5,circular,circularPaths=CIRCULAR_PATHS,circularCurrentVerifier=circular[6]) {
  assert.match(circularCurrentVerifier,/^[a-f0-9]{64}$/u);
  assert.equal(circularPaths.length,7);
  for(const value of circularPaths)assert.ok(typeof value==='string'&&!path.isAbsolute(value)&&value.split('/').every(p=>p&&p!=='.'&&p!=='..')&&!value.includes('\\'),'Exact relative circular input path required');
  assert.equal(f5.length,7); assert.equal(circular.length,7);
  for(const value of [...f5,...circular]) assert.match(value,/^[a-f0-9]{64}$/u);
  return '#pragma once\n#include <array>\nnamespace option_b_production {\n'+
    [['f5',f5],['circular',circular]].map(([name,values])=>'inline constexpr std::array<const char*, '+values.length+'> '+name+'_identities{{\n'+values.map(value=>'  '+JSON.stringify(value)+',').join('\n')+'\n}};\n').join('')+'inline constexpr std::array<const char*, 7> circular_original_paths{{\n'+circularPaths.map(value=>'  '+JSON.stringify(value)+',').join('\n')+'\n}};\ninline constexpr const char* circular_current_verifier_identity = '+JSON.stringify(circularCurrentVerifier)+';\n}\n';
}
export function projectProductionNativeIdentities({root=ROOT,selection,output}) {
  assert.ok(path.isAbsolute(output),'Absolute generated header path required');
  const admitted=['src/eom/native/eom_f5_enclosed_root_cli.cpp','src/eom/native/eom_subfield_circular_root_cli.cpp'].map(consumer=>beginProductionAdmission({root,selection,consumer}));
  const values=admitted.map(x=>x.identities());
  const known=JSON.parse(fs.readFileSync(path.join(root,'scripts/equation-mapping/fixtures/known-hash-answers.json'),'utf8'));
  assert.equal(known.schema,'known-hash-answers/v1');
  assert.equal(known.role,'independent-known-answer-control');
  assert.equal(values[0][6],known.sha256.abc,'Native abc answer differs from independent protected known answer');
  const circularPaths=CIRCULAR_PATHS.map((relative,index)=>{
    const original=admitted[1].originalSourceBindingIfPresent(relative,values[1][index]);
    if(!original)return relative;
    assert.equal(original.sha256,values[1][index]);
    return path.relative(root,original.path).split(path.sep).join('/');
  });
  const verifier=admitted[1].sourcePair(CIRCULAR_PATHS[6]);
  assert.equal(createHash('sha256').update(Buffer.from(verifier.original)).digest('hex'),values[1][6],'Exact current verifier applicability required');
  const text=renderProductionNativeIdentities(...values,circularPaths,createHash('sha256').update(Buffer.from(verifier.current)).digest('hex'));
  admitted.forEach(x=>x.check());
  fs.mkdirSync(path.dirname(output),{recursive:true});
  if(fs.existsSync(output)) assert.equal(fs.readFileSync(output,'utf8'),text,'Existing native projection differs; use a fresh build directory');
  else fs.writeFileSync(output,text,{flag:'wx'});
  assert.equal(fs.realpathSync(output),output,'Canonical generated header required');
  const identity=()=>{const stat=fs.lstatSync(output,{bigint:true});assert.ok(stat.isFile());return [stat.dev,stat.ino,stat.size,stat.mtimeNs,stat.ctimeNs].join(':');};
  const originalIdentity=identity();
  const check=()=>{assert.equal(fs.realpathSync(output),output);assert.equal(identity(),originalIdentity,'Generated native header replaced');assert.equal(fs.readFileSync(output,'utf8'),text);admitted.forEach(x=>x.check());};
  check();
  return {path:output,bytes:Buffer.byteLength(text),accepted:false,executionAuthorized:false,check};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  assert.equal(process.argv.length,4);assert.equal(process.argv[2],'--out');
  process.stdout.write(JSON.stringify(projectProductionNativeIdentities({output:path.resolve(process.argv[3])}))+'\n');
}
