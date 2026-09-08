// Current F5 data handoff: owned producer and independent-reference processes.
import { mkdirSync, existsSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runOwned } from '../dev/owned-compute-supervisor.mjs';
import { readBound, writeNew } from './launch-f5-prehistory-handoff-build.mjs';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BRIDGE = path.join(ROOT, 'scripts/eom/execute-f5-prehistory-handoff.py');
const check = (ok, why) => { if (!ok) throw new Error(why); };
export function recheckBindings(bindings) {
  for (const binding of Object.values(bindings)) {
    const observed = readBound(binding.path, binding.sha256);
    check(observed.bytes === binding.bytes, 'stage input size differs');
  }
}
export function admitStage(lease, expectedStage, expectedPlan, expectedOutput, expectedBridge) {
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
    check(['--plan','--plan-sha256','--bridge-sha256','--out','--owner-task'].includes(argv[i]) && argv[i+1] && !args[argv[i]], 'named unique argument pairs required');
    args[argv[i]]=argv[i+1];
  }
  check(Object.keys(args).length === 5, 'plan, plan-sha256, bridge-sha256, out and owner-task required');
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
      '--bridge-sha256',bridge.sha256,'--out-dir',stageOutput];
    if(stage==='verify') stageArgs.push('--handoff',stages[0].packet.handoff.path,'--handoff-sha256',stages[0].packet.handoff.sha256);
    const lease=await runOwned(['--owner-task',args['--owner-task'],'--deadline-seconds','600','--',python,...stageArgs]);
    const admitted=admitStage(lease,stage,plan,stageOutput,bridge); stages.push(admitted);
  }
  check(JSON.stringify(stages[0].packet.handoff)===JSON.stringify(stages[1].packet.handoff),'producer/reference handoff differs');
  readBound(plan.path,plan.sha256);readBound(bridge.path,bridge.sha256);
  for(const stage of stages) {
    recheckBindings(stage.packet.bindings);
    recheckBindings({receipt:stage.receipt,handoff:stage.packet.handoff});
  }
  recheckBindings(operationalBindings);
  readBound(stages[0].packet.handoff.path,stages[0].packet.handoff.sha256);
  const result={schema:'braid-program/f5-current-handoff-admission.v1',accepted:true,
    authority:'current declared build/input/runtime profile and exact data-only history conformance',
    h3EvidenceEligible:false,evolutionAuthorized:false,plan,bridge,operationalBindings,
    operationalBoundary:'Node executable embeds builtin modules; local imported JS graph and ps bound before/after; macOS system runtime remains platform trusted; path reopen checks do not provide atomic execution identity',
    handoff:stages[0].packet.handoff,
    numericalReference:stages[1].packet.bindings.reference,projectionBoundary:stages[1].packet.projectionBoundary,
    stages:stages.map(({receipt,process})=>({receipt,process}))};
  const receipt=writeNew(path.join(output,'admission.json'),result);
  return {completed:true,accepted:true,receipt,h3EvidenceEligible:false,evolutionAuthorized:false};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  run(process.argv.slice(2)).then(x=>console.log(JSON.stringify(x))).catch(e=>{console.error(e.message);process.exitCode=1;});
