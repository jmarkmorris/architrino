// Single-stage operational entry. Mathematics stays in the frozen Python files.
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync,
  openSync, readSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ENTRY = "scripts/eom/run-f6c-cached-root-cover-full.mjs";
export const LAUNCHER = "scripts/eom/launch-f6c-cached-root-cover-full.mjs";
export const OUTER = "scripts/eom/launch-subfield-circular-root-pilot.mjs";
export const CONSUMER = "scripts/eom/prepare-f6c-cached-continuous-reception-root-cover.py";
export const COMPARISON = "scripts/eom/verify-f6c-cached-continuous-reception-root-cover.py";
export const RESOURCE_PLAN = "reference/priorities/braid-program/evidence/2026-08-27-f6c-cached-root-cover-full-resource-plan.md";
export const LANE = ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827";
export const LIMIT_MS = 1800000, LOG_LIMIT = 16*1024**2, FILE_LIMIT = 64*1024**2;
export const check = (condition, message) => { if (!condition) throw new Error(message); };
export const sha = bytes => createHash("sha256").update(bytes).digest("hex");
export const clean = ({ data, ...binding }) => binding;
const id = s => [s.dev,s.ino,s.size,s.mtimeMs,s.ctimeMs].join(":");
const canonical = v => JSON.stringify(v && typeof v === "object" && !Array.isArray(v)
  ? Object.fromEntries(Object.keys(v).sort().map(k => [k, JSON.parse(canonical(v[k]))]))
  : Array.isArray(v) ? v.map(x => JSON.parse(canonical(x))) : v);
export const equal = (a,b) => canonical(a) === canonical(b);
const hex = value => typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
export function readBound(filename, expected, collect = false, limit = collect ? FILE_LIMIT : 1024**3) {
  filename = path.resolve(filename);
  const fd = openSync(filename, constants.O_RDONLY|constants.O_NONBLOCK|(constants.O_NOFOLLOW??0));
  try {
    const before=fstatSync(fd), chunks=[], digest=createHash("sha256"), buffer=Buffer.alloc(65536);
    check(before.isFile() && before.size >= 0 && before.size<=limit,"bounded regular input required");
    let count=0;
    while(count<before.size) {
      const n=readSync(fd,buffer,0,Math.min(buffer.length,before.size-count),count);
      check(n>0,"input truncated");count+=n;digest.update(buffer.subarray(0,n));
      if(collect)chunks.push(Buffer.from(buffer.subarray(0,n)));
    }
    const hash=digest.digest("hex");
    check(id(before)===id(fstatSync(fd)) && id(before)===id(lstatSync(filename)) &&
      (!expected || expected===hash),"input changed or hash differs: "+filename);
    return {path:filename,sha256:hash,bytes:count,...(collect?{data:Buffer.concat(chunks)}:{})};
  } finally {closeSync(fd);}
}
export function writeNew(filename,value,limit=FILE_LIMIT) {
  const data=Buffer.from(JSON.stringify(value)+"\n");check(data.length<=limit,"publication byte bound");
  const fd=openSync(filename,"wx");
  try{writeFileSync(fd,data);fsyncSync(fd);}finally{closeSync(fd);}
  const directory=openSync(path.dirname(filename),"r");try{fsyncSync(directory);}finally{closeSync(directory);}
  return clean(readBound(filename,sha(data),false,limit));
}
function closed(value,keys,label) {
  check(value && typeof value==="object" && !Array.isArray(value) && equal(Object.keys(value).sort(),[...keys].sort()),"closed "+label+" required");
}
function bindings(value,label) {
  check(Array.isArray(value)&&value.length>0&&value.length<=256,label+" census");
  for(const b of value){closed(b,["path","sha256","bytes"],label);check(typeof b.path==="string"&&b.path.length>0&&b.path.length<4096&&hex(b.sha256)&&Number.isSafeInteger(b.bytes)&&b.bytes>0&&b.bytes<=1024**3,label+" binding");}
  check(new Set(value.map(b=>b.path)).size===value.length,"duplicate "+label);
}
export function validatePlan(plan,root,launcherSha,entrySha) {
  closed(plan,["schema","scope","resourcePlan","comparisonContract","operationalBindings","controlBindings","python","pythonRealPath","git","node"],"machine plan");
  check(plan.schema==="braid-program/f6c-cached-root-cover-full-launch.v2"&&plan.scope==="full","current full 160-cell scope required");
  bindings([plan.resourcePlan],"resource plan");
  check(plan.resourcePlan.path===RESOURCE_PLAN,"resource plan differs");
  const c=plan.comparisonContract;
  closed(c,["declarationSha256","verifierSha256","scope","subjectSourceBindings","runtimeBindings"],"comparison contract");
  check(c.scope==="full","comparison contract differs");
  for(const [name,rows] of Object.entries({sources:c.subjectSourceBindings,runtime:c.runtimeBindings,operational:plan.operationalBindings,controls:plan.controlBindings}))bindings(rows,name);
  const expected=[CONSUMER,"scripts/eom/oracle/continuous_reception_roots_cached.py","scripts/eom/oracle/certified_history.py","scripts/eom/oracle/decimal_interval.py"];
  check(equal(c.subjectSourceBindings.map(b=>b.path).sort(),expected.sort()),"captured mathematical source closure differs");
  check(equal(plan.controlBindings.map(b=>b.path).sort(),["tests/test_f6c_cached_continuous_reception_root_cover_preparation.py","tests/test_f6c_cached_continuous_reception_root_cover.py"].sort()),"control closure differs");
  for(const key of ["python","pythonRealPath","git","node"])check(path.isAbsolute(plan[key]),"absolute runtime path required");
  check(realpathSync(plan.python)===plan.pythonRealPath&&realpathSync(plan.node)===realpathSync(process.execPath)&&
    realpathSync(plan.git)===plan.git,"resolved interpreter/node/git identity differs");
  check(c.runtimeBindings.some(b=>b.path===plan.pythonRealPath)&&c.runtimeBindings.some(b=>b.path===plan.git),"Python/Git runtime closure missing");
  check(equal(plan.operationalBindings.map(b=>b.path).sort(),[ENTRY,LAUNCHER,OUTER,"/bin/ps","/usr/bin/memory_pressure",plan.node].sort()),"operational closure differs");
  check(hex(launcherSha)&&hex(entrySha),"reviewed composition hashes required");
  // The invocation path preserves the shared environment, beyond real binary identity.
  const config=path.join(path.dirname(path.dirname(plan.python)),"pyvenv.cfg");
  check(c.runtimeBindings.some(b=>path.resolve(root,b.path)===config),"shared-venv configuration binding missing");
  return plan;
}
export function planBindings(plan,root) {
  const all=[plan.resourcePlan,
    ...plan.comparisonContract.subjectSourceBindings,...plan.comparisonContract.runtimeBindings,...plan.operationalBindings,...plan.controlBindings];
  const map=new Map();
  for(const b of all){const key=path.resolve(root,b.path),old=map.get(key);check(!old||old.sha256===b.sha256,"conflicting source binding");map.set(key,{...old,...b,path:key});}
  return [...map.values()];
}
function checkOperationalBindings(records) {
  return records.map(b=>{const actual=readBound(b.path,b.sha256,false,b.path.endsWith(".json")?FILE_LIMIT:1024**3);
    check(b.bytes===undefined||actual.bytes===b.bytes,"binding byte count differs");return clean(actual);});
}
// The Python bootstrap is itself captured as part of this operational entry.
// It executes only hash-checked regular source bytes, never a cached .pyc.
export const PYTHON_BOOTSTRAP = String.raw`import os,sys,stat,hashlib,resource as _f6c_resource,json as _f6c_json
filename=sys.argv[1];sys.argv=[filename,*sys.argv[2:]]
globals()['__file__']=filename
with open(filename,'rb') as _source: raw=_source.read()
exec(compile(raw,filename,'exec',dont_inherit=True),globals())
_f6c_self=_f6c_resource.getrusage(_f6c_resource.RUSAGE_SELF)
_f6c_children=_f6c_resource.getrusage(_f6c_resource.RUSAGE_CHILDREN)
print(_f6c_json.dumps({'kind':'f6c-python-process-resources','userSeconds':_f6c_self.ru_utime,'systemSeconds':_f6c_self.ru_stime,'waitedChildUserSeconds':_f6c_children.ru_utime,'waitedChildSystemSeconds':_f6c_children.ru_stime,'maximumIndividualResidentBytes':_f6c_self.ru_maxrss if sys.platform=='darwin' else _f6c_self.ru_maxrss*1024}),file=sys.stderr,flush=True)
`;
// Metadata only: ordinary runtime imports, no scientific input/module execution.
export const PYTHON_RUNTIME_INVENTORY = String.raw`import __future__,argparse,contextlib,decimal,fractions,hashlib,json,os,pathlib,re,resource,signal,stat,subprocess,sys,time,types,tempfile,collections.abc,dataclasses,typing
argparse.ArgumentParser().parse_args([])
paths={pathlib.Path(sys.executable).resolve()}
for module in tuple(sys.modules.values()):
 for key in ('__file__','__cached__'):
  value=getattr(module,key,None)
  if isinstance(value,str):
   p=pathlib.Path(value).resolve()
   if p.is_file():paths.add(p)
print(json.dumps({'schema':'braid-program/f6c-python-runtime-inventory.v1','scientificDataLoaded':False,'scientificModulesExecuted':False,'pythonInvocation':sys.executable,'pythonRealPath':str(pathlib.Path(sys.executable).resolve()),'files':[str(p) for p in sorted(paths)]}))
`;
export function remainingSeconds(deadline) {
  const ns=BigInt(deadline)-process.hrtime.bigint();check(ns>0n&&ns<=1800000000000n,"remaining inclusive stage deadline");
  return `${ns/1000000000n}.${String(ns%1000000000n).padStart(9,"0")}`;
}
export function stageSpec({stage,plan,planBinding,root,output,manifest,budget}) {
  check(stage==="consumer"||stage==="comparison","unknown stage");
  check(typeof budget==="string"&&/^(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(budget)&&Number(budget)>0&&Number(budget)<=1800,"bounded stage budget");
  const source=stage==="consumer"?CONSUMER:COMPARISON;
  const args=["-I","-B","-c",PYTHON_BOOTSTRAP,path.join(root,source),
    "--plan",planBinding.path,"--plan-sha256",planBinding.sha256,
    stage==="consumer"?"--consumer-sha256":"--verifier-sha256",readBound(path.join(root,source)).sha256];
  if(stage==="consumer")args.push("--scope","full","--out-dir",path.join(output,"subject"),"--git-binary",plan.git);
  else {check(manifest?.path===path.join(output,"subject/cover-manifest.json")&&hex(manifest.sha256),"authenticated preceding manifest required");
    args.push("--manifest",manifest.path,"--manifest-sha256",manifest.sha256,"--out",path.join(output,"comparison.json"));}
  args.push("--budget-seconds",budget);
  return {command:plan.python,args};
}
export async function runSingleStage(spec,{root=process.cwd(),out=process.stdout,err=process.stderr,spawnImpl=spawn,timeoutMs}={}) {
  check(timeoutMs===undefined||(Number.isInteger(timeoutMs)&&timeoutMs>0&&timeoutMs<=5000),"bounded metadata timeout");
  let bytes=0,failed,timer;
  const child=spawnImpl(spec.command,spec.args,{cwd:root,detached:true,stdio:["ignore","pipe","pipe"]});
  const forward=stream=>chunk=>{
    bytes+=chunk.length;
    if(bytes>LOG_LIMIT){failed??=new Error("combined stage log limit");child.kill("SIGTERM");return;}
    try{stream.write(chunk);}catch(e){failed??=e;child.kill("SIGTERM");}
  };
  child.stdout.on("data",forward(out));child.stderr.on("data",forward(err));
  if(timeoutMs!==undefined)timer=setTimeout(()=>{failed??=new Error("metadata inventory deadline");child.kill("SIGKILL");},timeoutMs);
  let result;
  try{result=await new Promise((resolve,reject)=>{child.once("error",reject);child.once("close",(code,signal)=>resolve({code,signal}));});}
  finally{clearTimeout(timer);}
  check(!failed&&result.code===0&&result.signal===null,failed?.message??"stage target did not close successfully");
  // Only the external registered supervisor establishes descendant closure.
  return {completed:true,accepted:false,logBytes:bytes};
}
function oneCompletion(binding) {
  const raw=readBound(binding.path,binding.sha256,true,LOG_LIMIT);check(raw.bytes===binding.bytes,"completion log bytes differ");
  const lines=raw.data.toString("utf8").trim().split("\n");check(lines.length===1,"one fresh completion required");return JSON.parse(lines[0]);
}
function checkGate(gates,spec) {
  check(gates.length===1,"exactly one registered Python target required");const g=gates[0];
  check(g.acknowledged===true&&g.target&&g.measurement?.code===0&&g.measurement.signal===null&&
    g.requestedCommand===spec.command&&equal(g.requestedArgs,spec.args),"registered stage controls/closure differ");
}
function processResourceEvents(stderrPath) {
  const raw=readBound(stderrPath,undefined,true,LOG_LIMIT);
  const events=raw.data.toString("utf8").split("\n").flatMap(line=>{try{return [JSON.parse(line)];}catch{return [];}});
  const one=kind=>{const matches=events.filter(e=>e?.kind===kind);check(matches.length===1,"one fresh resource event required: "+kind);return matches[0];};
  const python=one("f6c-python-process-resources"),entry=one("f6c-entry-process-resources");
  for(const key of ["userSeconds","systemSeconds","waitedChildUserSeconds","waitedChildSystemSeconds"])
    check(Number.isFinite(python[key])&&python[key]>=0,"Python CPU resource value missing");
  check(Number.isSafeInteger(python.maximumIndividualResidentBytes)&&python.maximumIndividualResidentBytes>0,"Python RSS resource value missing");
  check(entry.resourceUsage&&["userCPUTime","systemCPUTime","maxRSS"].every(k=>Number.isSafeInteger(entry.resourceUsage[k])&&entry.resourceUsage[k]>=0),"entry resource measurement missing");
  return {python,entry,stderr:clean(raw),scope:"Python lifetime self and waited-child CPU; entry lifetime self CPU; not aggregate RSS"};
}
export function admitStage(job) {
  const {plan,planBinding,root,output,stage,processReceipt}=job;
  check(processReceipt.accepted===false&&processReceipt.processesClosed===true&&processReceipt.exit.code===0&&processReceipt.exit.signal===null,"fresh registered process closure required");
  const gate=processReceipt.gates[0], args=gate?.requestedArgs;
  check(Array.isArray(args)&&args.at(-2)==="--budget-seconds","stage budget argument missing");
  checkGate(processReceipt.gates,stageSpec({...job,budget:args.at(-1)}));
  const stdout=job.stdout.sha256?job.stdout:clean(readBound(job.stdout.path,undefined,false,LOG_LIMIT));
  const completion=oneCompletion(stdout);
  const resources=processResourceEvents(path.join(output,stage+"-process/runner-stderr.log"));
  check(completion.completed===true&&completion.h3EvidenceEligible===false&&Number.isFinite(completion.elapsedSeconds)&&completion.elapsedSeconds>=0&&completion.elapsedSeconds<1800,"fresh stage completion differs");
  let records;
  if(stage==="consumer") {
    check(completion.accepted===false&&completion.scope==="full"&&completion.conditionalLibraryRows===10240&&completion.pieceRecords===17920&&
      Number.isSafeInteger(completion.recordedGeometryPieceVisits)&&completion.recordedGeometryPieceVisits>0&&
      completion.comparisonRequired===true&&completion.externalInclusiveDeadlineAndProcessClosureRequired===true&&completion.eomExecuted===false,"consumer scope/authority differs");
    records=completion.outputs;
    check(Array.isArray(records)&&equal(records.map(b=>b.path),["rows.ndjson","pieces.ndjson","cover-manifest.json"].map(n=>path.join(output,"subject",n))),"exact three subject outputs required");
    for(const b of records){bindings([b],"subject output");check(b.bytes<=FILE_LIMIT,"subject output too large");}
    checkBindings(records);
    const manifest=JSON.parse(readBound(records[2].path,records[2].sha256,true).data);
    check(manifest.accepted===false&&manifest.scope==="full"&&manifest.status==="conditional_complete"&&manifest.rowCount===10240&&
      manifest.cellCount===160&&manifest.ordinaryNonselfRows===8960&&manifest.selfExclusionRows===1280&&manifest.pieceRecordCount===17920&&
      equal(manifest.launchPlan,planBinding)&&equal(manifest.rows,records[0])&&equal(manifest.pieces,records[1])&&
      equal(manifest.subjectSourceBindings,plan.comparisonContract.subjectSourceBindings)&&equal(manifest.runtimeBindings,plan.comparisonContract.runtimeBindings),"subject manifest mechanical handoff differs");
  } else {
    check(completion.accepted===true&&completion.output?.path===path.join(output,"comparison.json"),"comparison completion differs");
    records=[completion.output];bindings(records,"comparison output");check(records[0].bytes<=FILE_LIMIT,"comparison output too large");
    checkBindings(records);
    const report=JSON.parse(readBound(records[0].path,records[0].sha256,true).data),a=report.analysis;
    check(report.schema==="braid-program/f6c-continuous-reception-root-cover-conformance.v1"&&report.accepted===true&&report.scope==="full"&&
      equal(report.manifest,job.manifest)&&equal(report.launchPlan,planBinding)&&
      equal(report.rows,job.consumer.outputs[0])&&equal(report.pieces,job.consumer.outputs[1]),"comparison source/output handoff differs");
    check(a?.accepted===false&&a.conditionalEnclosuresConformant===true&&a.cellCount===160&&a.pairCellCertificates===10240&&
      a.ordinaryNonselfRows===8960&&a.selfExclusionRows===1280&&a.distinctNonselfFaceChecks===17920&&a.pieceRecordCount===17920&&
      a.recordedGeometryPieceVisits===job.consumer.completion.recordedGeometryPieceVisits,"comparison census differs");
    const expectedClaims={reconstructedFamilyApplicabilityAuthenticated:true,conditionalRootCoverValidated:true,historicalTrajectoryIdentityEstablished:false,rootExecutionAuthorized:false,metricsAvailable:false,h3EvidenceEligible:false,scoreAuthorized:false,eomExecuted:false};
    check(equal(report.claims,expectedClaims)&&Object.values(report.libraryFlags??{}).length===5&&Object.values(report.libraryFlags).every(v=>v===false),"comparison claim boundary differs");
  }
  checkBindings(job.sources);return {accepted:true,h3EvidenceEligible:false,stage,completion,completionLog:stdout,resources,outputs:records,mathematicalAuthority:stage==="comparison"?"frozen independent comparison only":"none; conditional subject pending comparison"};
}
export function fileOperation(job) {
  const live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),"inclusive file-operation deadline");live();
  if(job.kind==="preflight") {
    const binding=readBound(job.planPath,job.planSha256,true,1024**2),plan=JSON.parse(binding.data);
    validatePlan(plan,job.root,job.launcherSha256,job.entrySha256);
    const sources=checkBindings([...planBindings(plan,job.root),clean(binding)]);live();
    return {plan,planBinding:clean(binding),sources};
  }
  if(job.kind==="admit") {const result=admitStage(job);live();return result;}
  if(job.kind==="finalize") {
    check(job.record.accepted===true&&job.record.processesClosed===true&&job.record.stages.length===2,"completed full admission required");
    checkBindings(job.sources);checkBindings(job.evidence);live();
    const result=writeNew(path.join(job.output,"full-admission.json"),job.record,1024**2);live();return result;
  }
  if(job.kind==="recheck") {const checked=checkBindings(job.sources);live();return checked;}
  throw new Error("unknown file operation");
}
async function main(argv) {
  if(argv[0]==="--runtime-inventory") {
    check(argv.length===2&&path.isAbsolute(argv[1]),"inventory needs shared Python invocation path");
    return runSingleStage({command:argv[1],args:["-I","-B","-c",PYTHON_RUNTIME_INVENTORY]},{timeoutMs:5000});
  }
  const values={};for(let i=0;i<argv.length;i+=2){check(argv[i+1]&&!values[argv[i]],"paired unique stage arguments required");values[argv[i]]=argv[i+1];}
  check(equal(Object.keys(values).sort(),["--plan","--plan-sha256","--entry-sha256","--launcher-sha256","--stage","--out","--deadline-ns","--manifest-sha256"].sort()),"closed stage arguments required");
  const root=process.cwd();
  const planBinding=readBound(values["--plan"],values["--plan-sha256"],true,1024**2),plan=JSON.parse(planBinding.data);
  validatePlan(plan,root,values["--launcher-sha256"],values["--entry-sha256"]);
  checkBindings([...planBindings(plan,root),clean(planBinding)]);
  const output=path.resolve(values["--out"]),stage=values["--stage"];
  check(output.startsWith(path.join(root,LANE)+path.sep)&&realpathSync(output)===output,"canonical exclusive attempt required");
  const manifest=stage==="comparison"?clean(readBound(path.join(output,"subject/cover-manifest.json"),values["--manifest-sha256"])):null;
  check(stage!=="consumer"||values["--manifest-sha256"]==="none","consumer cannot reuse prior manifest");
  await runSingleStage(stageSpec({root,output,stage,plan,planBinding:clean(planBinding),manifest,budget:remainingSeconds(values["--deadline-ns"])}));
  checkBindings([...planBindings(plan,root),clean(planBinding)]);remainingSeconds(values["--deadline-ns"]);
  console.error(JSON.stringify({kind:"f6c-entry-process-resources",resourceUsage:process.resourceUsage()}));
}
if(import.meta.url.startsWith("file:")&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
  main(process.argv.slice(2)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,failure:error.message}));process.exitCode=1;});

export function checkBindings(...args){return checkOperationalBindings(...args);}
