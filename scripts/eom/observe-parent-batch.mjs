/** Observe the canonical coordinator from outside its lifetime.
 * Dispatch goes through the existing owned-compute owner. This file introduces
 * no detached spawn, fallback coordinator, historical execution, or math oracle.
 */
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,mkdirSync,realpathSync,lstatSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {capture,clean,verifyClosure,verifyCurrentSelection,parseProcessTable,LOCK} from './verify-f6c-bounded-operation-closure.mjs';

const exec=promisify(execFile),SELF='scripts/eom/observe-parent-batch.mjs';
const CHECKER='scripts/eom/verify-f6c-bounded-operation-closure.mjs';
const SUPERVISOR='scripts/dev/owned-compute-supervisor.mjs';
const SOURCE_MAP='reference/priorities/development-process-review/contracts/option-b-f6c-bounded-operation-sources.jsonld';
const check=(ok,message)=>{if(!ok)throw Error(message);};
const sha=raw=>createHash('sha256').update(raw).digest('hex');
function identify(p,expected,limit=1073741824){
 const stat=lstatSync(p);check(stat.isFile()&&!stat.isSymbolicLink()&&stat.size<=limit,'bounded regular observer input');
 const b={path:p,sha256:expected??sha(readFileSync(p)),bytes:stat.size};return capture(b,{collect:limit<=16777216,limit});
}
function absent(p){try{lstatSync(p);return false;}catch(e){if(e.code==='ENOENT')return true;throw e;}}
function parse(argv){
 const result={control:false};
 for(let i=0;i<argv.length;i++){
  const k=argv[i];if(k==='--control'){check(!result.control,'duplicate control flag');result.control=true;continue;}
  check(['--plan','--plan-sha256','--self-sha256','--checker-sha256','--coordinator-sha256','--source-map-sha256','--out-directory','--owner-task'].includes(k)&&!Object.hasOwn(result,k),'unique known observer flag');
  check(typeof argv[i+1]==='string'&&!argv[i+1].startsWith('--'),'observer flag value');result[k]=argv[++i];
 }
 for(const k of ['--plan','--plan-sha256','--self-sha256','--checker-sha256','--coordinator-sha256','--source-map-sha256','--out-directory','--owner-task'])check(result[k],'required observer flag');
 for(const k of ['--plan-sha256','--self-sha256','--checker-sha256','--coordinator-sha256','--source-map-sha256'])check(/^[a-f0-9]{64}$/u.test(result[k]),'externally selected observer digest');
 return result;
}

export async function main(argv=process.argv.slice(2)){
 const options=parse(argv),root=realpathSync(process.cwd()),out=options['--out-directory'];
 check(path.isAbsolute(out)&&path.resolve(out)===out&&out.startsWith(path.join(root,'.local-data/braid-analysis')+path.sep),'fresh ignored observer directory');
 const self=identify(path.join(root,SELF),options['--self-sha256'],1048576),checker=identify(path.join(root,CHECKER),options['--checker-sha256'],1048576);
 const node=identify(realpathSync(process.execPath)),ps=identify('/bin/ps');
 const coordinator=identify(path.join(root,'scripts/eom/f6c-bounded-operation.mjs'),options['--coordinator-sha256'],1048576);
 const sourceManifest=identify(path.join(root,SOURCE_MAP),options['--source-map-sha256'],1048576);
 const launch=identify(options['--plan'],options['--plan-sha256'],1048576),plan=JSON.parse(launch.data);
 check(plan.root===root,'observer/plan root');
 const supervisorBinding=plan.sources.find(b=>b.path===path.join(root,SUPERVISOR));
 check(supervisorBinding,'explicitly selected owned-compute source');
 const supervisor=identify(supervisorBinding.path,supervisorBinding.sha256,1048576);
 check(supervisor.bytes===supervisorBinding.bytes,'selected owned-compute source size');
 if(!options.control)check(plan.hookModule?.path===path.join(root,'scripts/eom/run-f6c-parent-emission-refinement-pilot.mjs')&&plan.configuration?.schema==='braid-program/f6c-parent-emission-refinement-batch.v2'&&plan.configuration.completionContract==='braid-program/f6c-bounded-operation-external-closure.v2','current parent batch completion contract');
 const initial=[self,checker,node,supervisor,ps,coordinator,sourceManifest,launch];
 const physical=[...plan.sources,plan.hookModule,plan.hookControls,...plan.stages.flatMap(s=>[s.entry,...s.sources,...s.runtimeBindings])];
 const sourceMap=new Map();
 for(const b of physical){const old=sourceMap.get(b.path);check(!old||old.sha256===b.sha256&&old.bytes===b.bytes,'conflicting invocation source');if(!old)sourceMap.set(b.path,capture(b));}
 check(absent(path.join(root,LOCK)),'occupied operation lock before dispatch');mkdirSync(out,{mode:0o700});
 const save=(name,value)=>writeFileSync(path.join(out,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
 const invocation={schema:'braid-program/observed-bounded-invocation.v2',root,coordinator:clean(coordinator),node:clean(node),plan:clean(launch),control:options.control,sourceMap:clean(sourceManifest)};
 for(const selected of verifyCurrentSelection(invocation))initial.push(identify(selected.path,selected.sha256));
 save('invocation.json',invocation);
 const maximum=options.control?120000:1800000,began=performance.now();let lease;
 const args=[coordinator.path,options.control?'--control-plan':'--plan',launch.path,'--plan-sha256',launch.sha256,'--self-sha256',coordinator.sha256,'--source-map-sha256',sourceManifest.sha256];
 try{
  const {runOwned}=await import(pathToFileURL(supervisor.path));
  lease=await runOwned(['--owner-task',options['--owner-task'],'--deadline-seconds',String(maximum/1000),'--heartbeat-seconds','5','--',node.path,...args]);
  delete lease.control;save('owned-exit.json',lease);
  check(lease.status==='completed'&&lease.exitCode===0&&lease.exitSignal===null&&lease.processGroupClosed===true,'coordinator did not close successfully');
  const stdoutFile=identify(lease.stdoutPath,undefined,1048576),stderrFile=identify(lease.stderrPath,undefined,16777216);
  check(stdoutFile.bytes===lease.stdoutBytes&&stderrFile.bytes===lease.stderrBytes,'complete external log byte counts');
  check(stdoutFile.data.at(-1)===10&&stdoutFile.data.toString().split('\n').length===2,'one complete conditional message');
  const wire=JSON.parse(stdoutFile.data),operationFile=capture(wire.operation,{collect:true,limit:67108864}),operation=JSON.parse(operationFile.data);
  const table=await exec('/bin/ps',['-axo','pid=,ppid=,pgid=,lstart=,stat=,comm='],{timeout:2000,maxBuffer:8388608,env:{...process.env,LC_ALL:'C'}});
  const observation={processes:parseProcessTable(table.stdout),lock:{path:path.join(root,LOCK),absent:absent(path.join(root,LOCK))}};
  // The process snapshot is retained locally; only the relevant absence verdict
  // and observed owned IDs enter the portable operational receipt.
  writeFileSync(path.join(out,'process-snapshot.txt'),table.stdout,{flag:'wx',mode:0o600});
  const receipt=verifyClosure({invocation,lease,elapsedMilliseconds:performance.now()-began,wire,operation,plan,observation},{expectedInvocation:invocation});
  for(const b of [...initial,...sourceMap.values(),stdoutFile,stderrFile,operationFile])capture(b,{expectedIdentity:b.identity});
  check(absent(path.join(root,LOCK)),'lock reappeared during final observer capture');
  check(performance.now()-began<maximum,'external final capture exceeded original deadline');
  const evidence={...receipt,elapsedMilliseconds:performance.now()-began,observer:clean(self),checker:clean(checker),supervisor:clean(supervisor),processObserver:clean(ps),
   conditionalStdout:clean(stdoutFile),externalStderr:clean(stderrFile),lease:clean(identify(path.join(out,'owned-exit.json'),undefined,1048576)),
   processSnapshot:clean(identify(path.join(out,'process-snapshot.txt'),undefined,8388608)),
   trustBoundary:'trusted host and externally selected observer/checker generations; operational closure only'};
  save('closure.json',evidence);console.log(JSON.stringify({accepted:true,receipt:clean(identify(path.join(out,'closure.json'),undefined,16777216)),mathematicalAcceptance:false}));return evidence;
 }catch(error){save('failure.json',{accepted:false,error:String(error.message),runId:lease?.runId??null,elapsedMilliseconds:performance.now()-began,retainedOutputs:true});throw error;}
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.stack);process.exitCode=1;});
