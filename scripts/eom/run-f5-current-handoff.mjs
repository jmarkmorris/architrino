// Current F5 data handoff: owned producer and independent-reference processes.
import { mkdirSync, existsSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as f5Fs from "node:fs";
import * as f5Crypto from "node:crypto";
// Bootstrap uses Node builtins only; no repository module runs before selection.
export async function bootstrapF5(root, sourceMapSha256, originalIdentities = {}) {
  if (!/^[a-f0-9]{64}$/u.test(sourceMapSha256 ?? "")) throw Error("externally selected F5 source-map digest required");
  const capture = (filename, expected) => {
    if (f5Fs.realpathSync(filename) !== filename) throw Error("canonical F5 bootstrap source required");
    const fd = f5Fs.openSync(filename, f5Fs.constants.O_RDONLY | f5Fs.constants.O_NOFOLLOW | f5Fs.constants.O_NONBLOCK);
    try {
      const before = f5Fs.fstatSync(fd, {bigint:true});
      const identity = s => [s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(":");
      if (!before.isFile() || before.size <= 0n || before.size > 1024n**2n) throw Error("bounded F5 bootstrap source");
      const data = f5Fs.readFileSync(fd), sha256 = f5Crypto.createHash("sha256").update(data).digest("hex");
      if (sha256 !== expected || identity(before) !== identity(f5Fs.fstatSync(fd,{bigint:true})) || identity(before) !== identity(f5Fs.lstatSync(filename,{bigint:true}))) throw Error("F5 bootstrap source digest/original identity changed");
      if (Object.hasOwn(originalIdentities,filename) && originalIdentities[filename] !== identity(before)) throw Error("F5 original bootstrap identity changed");
      return {data,identity:identity(before),path:filename};
    } finally {f5Fs.closeSync(fd);}
  };
  const mapPath = path.join(root,"reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld");
  const map = capture(mapPath,sourceMapSha256), admissionPath = "scripts/eom/f5-current-source-admission.mjs";
  const rows = JSON.parse(map.data)["@graph"]?.filter(r=>r.role==="admission"&&r.binding?.path===admissionPath);
  if (rows?.length !== 1 || !/^[a-f0-9]{64}$/u.test(rows[0].binding.sha256)) throw Error("exact F5 admission module selection required");
  const helper = capture(path.join(root,admissionPath),rows[0].binding.sha256);
  const module = await import("data:text/javascript;base64,"+helper.data.toString("base64"));
  return module.admitF5Sources(root,sourceMapSha256,{...originalIdentities,[map.path]:map.identity,[helper.path]:helper.identity});
}

function readBound(filename,expected,collect=false) {
 const fd=f5Fs.openSync(filename,f5Fs.constants.O_RDONLY|f5Fs.constants.O_NOFOLLOW|f5Fs.constants.O_NONBLOCK);
 try {
  const before=f5Fs.fstatSync(fd,{bigint:true}),id=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(":");
  if(!before.isFile()||before.size>256n*1024n**2n)throw Error("bounded handoff metadata required");
  const data=f5Fs.readFileSync(fd),sha256=f5Crypto.createHash("sha256").update(data).digest("hex");
  if((expected!==undefined&&sha256!==expected)||id(before)!==id(f5Fs.fstatSync(fd,{bigint:true}))||id(before)!==id(f5Fs.lstatSync(filename,{bigint:true})))throw Error("handoff binding changed or differs");
  return {path:filename,sha256,bytes:data.length,...(collect?{data}:{})};
 }finally{f5Fs.closeSync(fd);}
}
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BRIDGE = path.join(ROOT, 'scripts/eom/execute-f5-prehistory-handoff.py');
const check = (ok, why) => { if (!ok) throw new Error(why); };
export function recheckBindings(bindings) {
  for (const binding of Object.values(bindings)) {
    const observed = readBound(binding.path, binding.sha256);
    check(observed.bytes === binding.bytes, 'stage input size differs');
  }
}
export function admitStage(lease, expectedStage, expectedPlan, expectedOutput, expectedBridge, expectedMap) {
  check(lease.status === 'completed' && lease.exitCode === 0 && lease.exitSignal === null && lease.processGroupClosed === true,
    'fresh successful owned process closure required');
  const stdout = readBound(lease.stdoutPath, undefined, true);
  const completion = JSON.parse(stdout.data.toString('utf8'));
  check(completion.completed === true && completion.accepted === false && completion.stage === expectedStage && completion.h3EvidenceEligible === false,
    'stage completion differs');
  check(completion.receipt.path === path.join(expectedOutput, 'stage.json'), 'stage output differs');
  const receipt = readBound(completion.receipt.path, completion.receipt.sha256, true);
  check(receipt.bytes === completion.receipt.bytes, 'stage size differs');
  const packet = JSON.parse(receipt.data);
  check(packet.schema === 'braid-program/f5-current-handoff-stage.v1' && packet.stage === expectedStage && packet.completed === true &&
    packet.accepted === false && packet.h3EvidenceEligible === false && packet.evolutionAuthorized === false &&
    packet.requiresFreshExternalCompletion === true && ['path','sha256','bytes'].every(k=>packet.plan[k]===expectedPlan[k]), 'stage contract differs');
  check(expectedBridge && ['path','sha256','bytes'].every(k=>packet.bindings.bridge[k]===expectedBridge[k]), 'requested bridge differs');
  if (expectedMap) check(packet.bindings.sourceMap && ["path","sha256","bytes"].every(k=>packet.bindings.sourceMap[k]===expectedMap[k]), "stage source-map selection differs");
  recheckBindings(packet.bindings);
  recheckBindings({handoff:packet.handoff});
  if (expectedStage === 'produce') check(packet.inspectorClosed === true, 'inspector closure required');
  else check(packet.dataChecksPassed === true && packet.numerical?.dataChecksPassed === true &&
    packet.numerical.accepted === false && packet.numerical.failures?.length === 0, 'independent numerical data check failed');
  return { packet, receipt: { path: receipt.path, sha256: receipt.sha256, bytes: receipt.bytes },
    process: { runId: lease.runId, exitCode: lease.exitCode, processGroupClosed: lease.processGroupClosed,
      elapsedWallSeconds: lease.elapsedWallSeconds, stdout: { path: stdout.path, sha256: stdout.sha256, bytes: stdout.bytes } } };
}
export async function run(argv) {
  check(!process.env.NODE_OPTIONS && !Object.keys(process.env).some(k=>k.startsWith('DYLD_') || ['LD_PRELOAD','LD_LIBRARY_PATH'].includes(k)), 'injected runtime environment');
  // The two local imports above import only Node builtins. Node embeds those;
  // the supervisor's sidecar reopens its own file and invokes /bin/ps.
  const operationalBindings = Object.fromEntries([
    fileURLToPath(import.meta.url), path.join(ROOT,'scripts/dev/owned-compute-supervisor.mjs'),
    path.join(ROOT,'scripts/eom/launch-f5-prehistory-handoff-build.mjs'),
    realpathSync(process.execPath), '/bin/ps'
  ].map(p=>[p,readBound(p)]));
  const args = {};
  for (let i=0; i<argv.length; i+=2) {
    check(['--plan','--plan-sha256','--bridge-sha256','--out','--owner-task','--source-map-sha256','--node-sha256','--node-bytes'].includes(argv[i]) && argv[i+1] && !args[argv[i]], 'named unique argument pairs required');
    args[argv[i]]=argv[i+1];
  }
  check(Object.keys(args).length === 8, 'plan, plan-sha256, bridge-sha256, out and owner-task required');
  const operational=await bootstrapF5(ROOT,args['--source-map-sha256']);
  const node=realpathSync(process.execPath),nodeIdentity=f5Fs.lstatSync(node,{bigint:true});
  const nodeBinding=readBound(node,args['--node-sha256']);
  check(/^[a-f0-9]{64}$/u.test(args['--node-sha256'])&&String(nodeBinding.bytes)===args['--node-bytes'],'externally selected Node digest/size required');
  const sourceIdentities={...operational.identities,[node]:[nodeIdentity.dev,nodeIdentity.ino,nodeIdentity.size,nodeIdentity.mtimeNs,nodeIdentity.ctimeNs].join(':')};
  const recheckNode=()=>{const s=f5Fs.lstatSync(node,{bigint:true});check([s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':')===sourceIdentities[node],'original Node identity changed');readBound(node,nodeBinding.sha256);};
  recheckNode();
  const {runOwned}=await operational.importModule('scripts/dev/owned-compute-supervisor.mjs');
  const {writeNew}=await operational.importModule('scripts/eom/launch-f5-prehistory-handoff-build.mjs');
  check(args['--bridge-sha256']===operational.pins['scripts/eom/execute-f5-prehistory-handoff.py'],'bridge/map selection differs');
  const plan = readBound(args['--plan'], args['--plan-sha256']);
  const bridge = readBound(BRIDGE, args['--bridge-sha256']);
  const output = path.resolve(args['--out']);
  check(path.dirname(output) === path.join(ROOT,'.local-data/braid-analysis') && path.basename(output).startsWith('f5-current-handoff-') &&
    !existsSync(output) && !existsSync(output+'-produce') && !existsSync(output+'-verify'), 'fresh scoped output directories required');
  mkdirSync(output, { mode: 0o700 });
  const python = path.resolve(process.env.AAA_VENV || path.join(ROOT,'../.venv'), 'bin/python');
  const stages=[];
  for (const stage of ['produce','verify']) {
    const stageOutput=output+'-'+stage;
    const stageArgs=['-I','-B',BRIDGE,'--stage',stage,'--plan',plan.path,'--plan-sha256',plan.sha256,
      '--bridge-sha256',bridge.sha256,'--out-dir',stageOutput,'--source-map-sha256',args['--source-map-sha256'],'--node',node,'--node-sha256',nodeBinding.sha256,'--node-bytes',String(nodeBinding.bytes),'--source-identities',JSON.stringify(sourceIdentities)];
    if(stage==='verify') stageArgs.push('--handoff',stages[0].packet.handoff.path,'--handoff-sha256',stages[0].packet.handoff.sha256);
    operational.recheck();recheckNode();
    const lease=await runOwned(['--owner-task',args['--owner-task'],'--deadline-seconds','600','--',python,...stageArgs]);
    operational.recheck();recheckNode();
    const admitted=admitStage(lease,stage,plan,stageOutput,bridge,operational.sourceMap); stages.push(admitted);
  }
  check(JSON.stringify(stages[0].packet.handoff)===JSON.stringify(stages[1].packet.handoff),'producer/reference handoff differs');
  readBound(plan.path,plan.sha256);readBound(bridge.path,bridge.sha256);
  for(const stage of stages) {
    recheckBindings(stage.packet.bindings);
    recheckBindings({receipt:stage.receipt,handoff:stage.packet.handoff});
  }
  recheckBindings(operationalBindings);
  readBound(stages[0].packet.handoff.path,stages[0].packet.handoff.sha256);
  operational.recheck();recheckNode();
  const result={nodeRuntime:nodeBinding,sourceMap:operational.sourceMap,operationalSources:operational.sources,schema:'braid-program/f5-current-handoff-admission.v1',accepted:true,
    authority:'current declared build/input/runtime profile and exact data-only history conformance',
    h3EvidenceEligible:false,evolutionAuthorized:false,plan,bridge,operationalBindings,
    operationalBoundary:'Node executable embeds builtin modules; local imported JS graph and ps bound before/after; macOS system runtime remains platform trusted; path reopen checks do not provide atomic execution identity',
    handoff:stages[0].packet.handoff,
    numericalReference:stages[1].packet.bindings.reference,projectionBoundary:stages[1].packet.projectionBoundary,
    stages:stages.map(({receipt,process})=>({receipt,process}))};
  const receipt=writeNew(path.join(output,'admission.json'),result);
  operational.recheck();recheckNode();
  return {completed:true,accepted:true,receipt,h3EvidenceEligible:false,evolutionAuthorized:false};
}
if(import.meta.url.startsWith('file:') && !new URL(import.meta.url).search && process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  run(process.argv.slice(2)).then(x=>console.log(JSON.stringify(x))).catch(e=>{console.error(e.message);process.exitCode=1;});
