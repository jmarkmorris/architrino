// Explicit current execution selection; metadata and byte capture only.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,realpathSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import path from 'node:path';
import * as R from '../../../../../scripts/eom/run-prescribed-response-pilot.mjs';
const root=process.cwd(),out=path.dirname(new URL(import.meta.url).pathname);
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(sha('abc'),'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
console.log('Known SHA case passed before target capture.');
const bind=p=>{const data=readFileSync(p);return {path:p,sha256:sha(data),bytes:data.length};};
const python=path.resolve(process.env.AAA_VENV??'../.venv','bin/python'),pythonRealPath=realpathSync(python),node=realpathSync(process.execPath);
const archives=JSON.parse(readFileSync(path.join(out,'../next-caller-inputs/source-identities.json')));
const originalBindings=R.ORIGINALS.map(([role,p,digest])=>{
  const originalPath=p?path.join(root,p):pythonRealPath;
  const archive=['approvedSource','scientificFixture','predeclaration'].includes(role)?archives.find(row=>row.path===p&&row.expected===digest):null;
  if(['approvedSource','scientificFixture','predeclaration'].includes(role))assert.ok(archive,'explicit original input selection missing');
  const physical=bind(archive?path.join(root,archive.archive):originalPath);
  if(digest)assert.equal(physical.sha256,digest,role);
  return {role,...physical,originalPath};
});
const inventory=JSON.parse(execFileSync(python,['-I','-B','-c',R.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:5000,maxBuffer:1024**2}));
assert.equal(inventory.scientificDataLoaded,false);assert.equal(inventory.scientificModulesExecuted,false);
const plan={schema:'braid-program/prescribed-response-pilot-launch.v2',scope:'f5-release',originalBindings,
  operationalBindings:[R.ENTRY,R.ENTRY_TESTS,R.LAUNCH_TESTS,R.PROCESS_TESTS,R.LAUNCHER,R.OUTER,R.PUBLISHER,'tests/test_prescribed_acceleration_response_publication.py'].map(p=>bind(path.join(root,p))).concat([node,'/bin/ps','/usr/bin/memory_pressure'].map(bind)),
  runtimeBindings:[...new Set([...inventory.files,path.resolve(python,'../../pyvenv.cfg')])].sort().map(bind),
  python,pythonRealPath,node,limits:R.LIMITS,platformTrust:'host OS and macOS shared-cache libraries; explicitly listed file-backed runtime dependencies only'};
const launcherSha=bind(path.join(root,R.LAUNCHER)).sha256,entrySha=bind(path.join(root,R.ENTRY)).sha256;
R.validatePlan(plan,root,launcherSha,entrySha);
const sources=R.checkBindings(R.planBindings(plan,root));
for(const mutate of [p=>p.schema='braid-program/prescribed-response-pilot-launch.v1',p=>p.originalBindings[6].sha256='0'.repeat(64),p=>p.originalBindings[11].path=path.join(root,'reference','consumer.source'),p=>p.originalBindings[6].originalPath='/wrong/original']){
  const bad=structuredClone(plan);mutate(bad);assert.throws(()=>R.validatePlan(bad,root,launcherSha,entrySha));
}
const destination=path.join(out,'prescribed-response-pilot-launch.v2.json');writeFileSync(destination,JSON.stringify(plan,null,2)+'\n');
const captureProgram=String.raw`import contextlib,importlib.util,json,pathlib,sys
root=pathlib.Path(sys.argv[1]);plan=json.loads(pathlib.Path(sys.argv[2]).read_bytes())
spec=importlib.util.spec_from_file_location('current_response_capture',root/'scripts/eom/reduce-prescribed-acceleration-response.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
module.validate_output_bindings(plan['originalBindings'])
with contextlib.ExitStack() as stack:
 captures=[]
 for row in plan['originalBindings']:
  item=stack.enter_context(module.Capture(row['path'],row['sha256']));assert item.binding(row['role'],row['originalPath'])==row;captures.append(item)
 for item in captures:item.recheck()
print(json.dumps(dict(physicalCaptures=len(captures),scientificCalls=0)))
`;
const captured=JSON.parse(execFileSync(python,['-I','-B','-c',captureProgram,root,destination],{encoding:'utf8',timeout:10000,maxBuffer:1024**2}));
assert.equal(captured.physicalCaptures,19);assert.equal(captured.scientificCalls,0);
writeFileSync(path.join(out,'current-plan-validation.json'),JSON.stringify({plan:bind(destination),sources,captured,rejectionControls:4,scientificCalls:0},null,2)+'\n');
console.log(JSON.stringify({bindings:sources.length,...captured,rejectionControls:4}));
