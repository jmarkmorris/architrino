// Single-stage operational entry. Mathematics stays in the frozen Python files.
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync,
  openSync, readSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ENTRY = "scripts/eom/run-f6c-root-cover-pilot.mjs";
export const LAUNCHER = "scripts/eom/launch-f6c-root-cover-pilot.mjs";
export const OUTER = "scripts/eom/launch-abc-enclosed-root-pilot.mjs";
export const CONSUMER = "scripts/eom/prepare-f6c-continuous-reception-root-cover.py";
export const COMPARISON = "scripts/eom/verify-f6c-continuous-reception-root-cover.py";
export const RESOURCE_PLAN = "reference/priorities/braid-program/evidence/2026-08-27-f6c-root-cover-pilot-resource-plan.md";
export const LANE = ".local-data/braid-analysis/f6c-continuous-reception-root-cover-20260827";
export const LIMIT_MS = 1800000, LOG_LIMIT = 16*1024**2, FILE_LIMIT = 64*1024**2;
export const PINS = Object.freeze({
  [OUTER]: "5aa154b1579909cc63f01d81023e2e1412c2a0bb277663d9e1cd118999795baa",
  [CONSUMER]: "4ce6436c09c445030192aeb5b894239b7fa04cee578e6067f1088151695a5e9e",
  [COMPARISON]: "2d25103e0fb6ab584485b7954465afe0fa5de556b3a7e111c56d20156b7011fd",
  [RESOURCE_PLAN]: "36b72681c116cedf1803cc89ead8b48a7d9604bae7f9bffd7b0f95b33c3bb9b4",
  "tests/test_f6c_continuous_reception_root_cover_preparation.py": "68a940c40b2e3b463555b95858031f96796e2ac94963a86b3a9ae6fd74dc3742",
  "tests/test_f6c_continuous_reception_root_cover.py": "5f501e0b8cf60030d214fc9637e1292faa93a615c396e787ef77fc7b261991c5",
  "scripts/eom/oracle/continuous_reception_roots.py": "f38657eedb585f6066bf233cef05508ef4d4336146dbf1e44501dfa9b669e04c",
  "scripts/eom/oracle/certified_history.py": "ca916b4bc979629a5e25c1490da07fd78a26b4e75cfba5677f35fbab658a29e7",
  "scripts/eom/oracle/decimal_interval.py": "fffc17270e149e6213315c1c82b518caa739657eb649822fd1955b8a2820e38a",
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md": "765e6663cdd60323f84b9e1af52ba1399345322eb747727f2a0898b4dd0fd079",
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-enclosure-contract.md": "f20e4bdaaff8b6f0012fdc6135b15d568a817832fb55d5c42f80d8421a117f68",
  "reference/priorities/braid-program/evidence/2026-08-27-f6c-accepted-frame-history-reconstruction.md": "6abbbbacc1671052bdd881790094dbd71ebb03d54904ac1f937edae1f3c9f936",
  "tests/test_eom_continuous_reception_roots.py": "473cba3b039027879eeea6987515261faaadcf0833f3e4d2864fc610f5b7a144",
  "scripts/eom/verify-f6c-accepted-frame-reconstruction.py": "80a96ebd0b306148b3eb96cb12e797c5cf80942e52ea457a8c6a72d58e8618a0",
  "scripts/eom/verify-f6c-retained-history-guards.py": "efaed33a6d6e55be5788ffb7e4e6f596fbc0381466a8308154dbd550743896b9",
  ".local-data/braid-analysis/f6c-history-export-20260827.jUhLLg/retained-history.json": "f479bb88a6425e9e98e00288f2524f33d5a3c0f4c2a14139dbaae4f468c46db1",
  ".local-data/braid-analysis/f6c-accepted-frame-reconstruction-20260827.5o7jK3/reconstruction.json": "7c30aae03d43f7720b79288a19a9c9f9a7c0ab6b7b16ac9a948828ca80b92b43",
  ".local-data/braid-analysis/f6c-retained-history-guards-20260827.hdrqLF/guards.json": "86d7fa14ac64ee20930094ff1a59880fe4e1ef5c81758f5d8baf2c6777ee4880",
  "/usr/bin/memory_pressure": "a1668e28505400a9e09ab9b2bd2558f04d038152dfdb05826576a0a0aa27fe56",
});
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
  check(plan.schema==="braid-program/f6c-root-cover-pilot-launch.v1"&&plan.scope==="pilot-cell-0","one-cell scope required");
  bindings([plan.resourcePlan],"resource plan");
  check(plan.resourcePlan.path===RESOURCE_PLAN&&plan.resourcePlan.sha256===PINS[RESOURCE_PLAN],"resource plan differs");
  const c=plan.comparisonContract;
  closed(c,["declarationSha256","verifierSha256","scope","subjectSourceBindings","runtimeBindings"],"comparison contract");
  check(c.scope==="pilot-cell-0"&&c.verifierSha256===PINS[COMPARISON]&&
    c.declarationSha256===PINS["reference/priorities/braid-program/evidence/2026-08-27-f6c-continuous-reception-root-cover-predeclaration.md"],"comparison contract differs");
  for(const [name,rows] of Object.entries({sources:c.subjectSourceBindings,runtime:c.runtimeBindings,operational:plan.operationalBindings,controls:plan.controlBindings}))bindings(rows,name);
  const expected=[CONSUMER,"scripts/eom/oracle/continuous_reception_roots.py","scripts/eom/oracle/certified_history.py","scripts/eom/oracle/decimal_interval.py"];
  check(equal(c.subjectSourceBindings.map(b=>b.path).sort(),expected.sort()),"captured mathematical source closure differs");
  for(const b of [...c.subjectSourceBindings,...plan.controlBindings])check(PINS[b.path]===b.sha256,"frozen source/control differs");
  check(equal(plan.controlBindings.map(b=>b.path).sort(),["tests/test_f6c_continuous_reception_root_cover_preparation.py","tests/test_f6c_continuous_reception_root_cover.py"].sort()),"control closure differs");
  for(const key of ["python","pythonRealPath","git","node"])check(path.isAbsolute(plan[key]),"absolute runtime path required");
  check(realpathSync(plan.python)===plan.pythonRealPath&&realpathSync(plan.node)===realpathSync(process.execPath)&&
    realpathSync(plan.git)===plan.git,"resolved interpreter/node/git identity differs");
  check(c.runtimeBindings.some(b=>b.path===plan.pythonRealPath)&&c.runtimeBindings.some(b=>b.path===plan.git),"Python/Git runtime closure missing");
  check(equal(plan.operationalBindings.map(b=>b.path).sort(),[ENTRY,LAUNCHER,OUTER,"/bin/ps","/usr/bin/memory_pressure",plan.node].sort()),"operational closure differs");
  for(const b of plan.operationalBindings) {
    const expectedHash=b.path===ENTRY?entrySha:b.path===LAUNCHER?launcherSha:PINS[b.path];
    if(expectedHash)check(expectedHash===b.sha256,"operational source differs");
  }
  check(hex(launcherSha)&&hex(entrySha),"reviewed composition hashes required");
  // The invocation path preserves the shared environment, beyond real binary identity.
  const config=path.join(path.dirname(path.dirname(plan.python)),"pyvenv.cfg");
  check(c.runtimeBindings.some(b=>path.resolve(root,b.path)===config),"shared-venv configuration binding missing");
  return plan;
}
export function planBindings(plan,root) {
  const all=[...Object.entries(PINS).map(([p,h])=>({path:path.resolve(root,p),sha256:h})),plan.resourcePlan,
    ...plan.comparisonContract.subjectSourceBindings,...plan.comparisonContract.runtimeBindings,...plan.operationalBindings,...plan.controlBindings];
  const map=new Map();
  for(const b of all){const key=path.resolve(root,b.path),old=map.get(key);check(!old||old.sha256===b.sha256,"conflicting source binding");map.set(key,{...old,...b,path:key});}
  return [...map.values()];
}
export function checkBindings(records) {
  return records.map(b=>{const actual=readBound(b.path,b.sha256,false,b.path.endsWith(".json")?FILE_LIMIT:1024**3);
    check(b.bytes===undefined||actual.bytes===b.bytes,"binding byte count differs");return clean(actual);});
}
// The Python bootstrap is itself captured as part of this operational entry.
// It executes only hash-checked regular source bytes, never a cached .pyc.
export const PYTHON_BOOTSTRAP = String.raw`import os,sys,stat,hashlib,resource as _f6c_resource,json as _f6c_json
filename,expected=sys.argv[1:3];sys.argv=[filename,*sys.argv[3:]]
fd=os.open(filename,os.O_RDONLY|os.O_NONBLOCK|getattr(os,'O_NOFOLLOW',0))
try:
 before=os.fstat(fd);assert stat.S_ISREG(before.st_mode) and 0<before.st_size<=67108864
 chunks=[];size=0
 while size<before.st_size:
  part=os.read(fd,min(65536,before.st_size-size));assert part;chunks.append(part);size+=len(part)
 raw=b''.join(chunks);after=os.fstat(fd);current=os.stat(filename,follow_symlinks=False)
 ident=lambda x:(x.st_dev,x.st_ino,x.st_size,x.st_mtime_ns,x.st_ctime_ns)
 assert ident(before)==ident(after)==ident(current) and hashlib.sha256(raw).hexdigest()==expected
finally:os.close(fd)
globals()['__file__']=filename
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
  const args=["-I","-B","-c",PYTHON_BOOTSTRAP,path.join(root,source),PINS[source],
    "--plan",planBinding.path,"--plan-sha256",planBinding.sha256,
    stage==="consumer"?"--consumer-sha256":"--verifier-sha256",PINS[source]];
  if(stage==="consumer")args.push("--scope","pilot-cell-0","--out-dir",path.join(output,"subject"),"--git-binary",plan.git);
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
    check(completion.accepted===false&&completion.scope==="pilot-cell-0"&&completion.conditionalLibraryRows===64&&completion.pieceRecords===112&&
      Number.isSafeInteger(completion.recordedGeometryPieceVisits)&&completion.recordedGeometryPieceVisits>0&&
      completion.comparisonRequired===true&&completion.externalInclusiveDeadlineAndProcessClosureRequired===true&&completion.eomExecuted===false,"consumer scope/authority differs");
    records=completion.outputs;
    check(Array.isArray(records)&&equal(records.map(b=>b.path),["rows.ndjson","pieces.ndjson","cover-manifest.json"].map(n=>path.join(output,"subject",n))),"exact three subject outputs required");
    for(const b of records){bindings([b],"subject output");check(b.bytes<=FILE_LIMIT,"subject output too large");}
    checkBindings(records);
    const manifest=JSON.parse(readBound(records[2].path,records[2].sha256,true).data);
    check(manifest.accepted===false&&manifest.scope==="pilot-cell-0"&&manifest.status==="conditional_complete"&&manifest.rowCount===64&&
      manifest.cellCount===1&&manifest.ordinaryNonselfRows===56&&manifest.selfExclusionRows===8&&manifest.pieceRecordCount===112&&
      equal(manifest.launchPlan,planBinding)&&equal(manifest.rows,records[0])&&equal(manifest.pieces,records[1])&&
      equal(manifest.subjectSourceBindings,plan.comparisonContract.subjectSourceBindings)&&equal(manifest.runtimeBindings,plan.comparisonContract.runtimeBindings),"subject manifest mechanical handoff differs");
  } else {
    check(completion.accepted===true&&completion.output?.path===path.join(output,"comparison.json"),"comparison completion differs");
    records=[completion.output];bindings(records,"comparison output");check(records[0].bytes<=FILE_LIMIT,"comparison output too large");
    checkBindings(records);
    const report=JSON.parse(readBound(records[0].path,records[0].sha256,true).data),a=report.analysis;
    check(report.schema==="braid-program/f6c-continuous-reception-root-cover-conformance.v1"&&report.accepted===true&&report.scope==="pilot-cell-0"&&
      equal(report.manifest,job.manifest)&&equal(report.launchPlan,planBinding)&&report.verifier?.sha256===PINS[COMPARISON]&&
      equal(report.rows,job.consumer.outputs[0])&&equal(report.pieces,job.consumer.outputs[1]),"comparison source/output handoff differs");
    check(a?.accepted===false&&a.conditionalEnclosuresConformant===true&&a.cellCount===1&&a.pairCellCertificates===64&&
      a.ordinaryNonselfRows===56&&a.selfExclusionRows===8&&a.distinctNonselfFaceChecks===112&&a.pieceRecordCount===112&&
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
    check(job.record.accepted===true&&job.record.processesClosed===true&&job.record.stages.length===2,"completed pilot admission required");
    checkBindings(job.sources);checkBindings(job.evidence);live();
    const result=writeNew(path.join(job.output,"pilot-admission.json"),job.record,1024**2);live();return result;
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
  const root=process.cwd(),planBinding=readBound(values["--plan"],values["--plan-sha256"],true,1024**2),plan=JSON.parse(planBinding.data);
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
