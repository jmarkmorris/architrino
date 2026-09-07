/** Thin package-specific composition for f6c-bounded-operation.mjs.
 * No actual-data default and no scientific calculation. The independently
 * frozen inventory, package implementation and decoder are mandatory pins.
 * This same source supplies pure preflight/admit/final hooks and registered
 * producer/independent-reader stages. Child spawning is imported ONLY inside
 * registered producer execution, never while loading/executing a pure hook.
 *
 * Stage args: --registered producer|independent-reader. The coordinator appends
 * --operation-deadline-ns ORIGINAL_NS, --operation-prior-stdout the authenticated
 * preceding stdout binding or null, and --operation-plan-binding the captured
 * plan binding. The plan never needs to contain its own hash.
 * A separately supervised caller creates the canonical plan and supplies the
 * exact Python runtime inventory; runtimeInventoryCommand returns a read-only
 * metadata command, not permission to create an accepted-data package.
 */
import {createHash} from 'node:crypto';
import {constants,openSync,closeSync,readFileSync,fstatSync,lstatSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

export const SELF='scripts/eom/run-f6c-evidence-packaging.mjs';
export const CONTROL='tests/f6c-evidence-packaging.test.js';
export const PINS=Object.freeze({
  inventory:['tests/fixtures/f6c-lossless-packaging-expectations.v1.json','901687bd92fdc686dc26b8634d8f58ecd46bd9f81208ca68563ad4cff983b09b'],
  contract:['reference/priorities/braid-program/evidence/2026-08-28-f6c-lossless-packaging-expectations.md','75177ad5b16b34fd1f387689ec7ef2db77ed7196c5995c5621a54799539460cf'],
  packageModule:['scripts/eom/f6c_evidence_package.py','9d888682514f23652b39bfaa53fdfb3ceab66e6ba88cf34222c156d226764ad6'],
  packageControls:['tests/test_f6c_evidence_package.py','f2c52fd510cad3da99f65ab2497dde754f8842d18004c3e1ae98d1bbdcb6d3d8'],
  independentDecoder:['.local-data/braid-analysis/f6c-whole-history-20260828/packaging-review/independent-package-review.mjs','328120d4f0c0716d78d38362cfb2f1c27b5a33382c6a3870fb10ca501f9d0273'],
});
export const GENERIC_PINS=Object.freeze({
  inventoryParser:['scripts/eom/f6c_parent_evidence_inventory.py','d69db22ad20881a94a950102e70d438792493fa52efde666575bc53100bd784b'],
  inventoryParserControls:['tests/test_f6c_parent_evidence_inventory.py','369091d5a0996fb547a70ba8e9aa8b3fe5570cf046863872bfaeb491bd0cf551'],
  inventoryContract:['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/generic-inventory-v2-closed-schema-expectations.md','856c05077241bf9c28d75c21fcb50beac0afd23546c4bbbad9be7abd5d0f6710'],
  genericIndependentReader:['.local-data/braid-analysis/f6c-whole-history-20260828/packaging-review/independent-generic-package-review.mjs','693da598db446dbe6045d07ab4bbd13175c54fc2cd5da3b4b110e2bd94ea763f'],
});
const check=(ok,message)=>{if(!ok)throw Error(message);};
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const url=raw=>'data:text/javascript;base64,'+Buffer.from(raw).toString('base64');
const id=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
const same=(a,b)=>canonical(a)===canonical(b);
function tiny(b){
  check(b&&typeof b.path==='string'&&path.isAbsolute(b.path)&&realpathSync(b.path)===b.path&&/^[a-f0-9]{64}$/u.test(b.sha256)&&Number.isSafeInteger(b.bytes)&&b.bytes>0&&b.bytes<=1048576,'bounded source binding');
  const fd=openSync(b.path,constants.O_RDONLY|constants.O_NOFOLLOW);try{const before=fstatSync(fd,{bigint:true});check(before.isFile()&&before.size===BigInt(b.bytes),'source size');const raw=readFileSync(fd);check(sha(raw)===b.sha256&&id(before)===id(fstatSync(fd,{bigint:true}))&&id(before)===id(lstatSync(b.path,{bigint:true})),'source replacement/hash');return raw;}finally{closeSync(fd);}
}
async function coordinator(plan){
  const b=plan.sources.find(b=>b.path===path.join(plan.root,'scripts/eom/f6c-bounded-operation.mjs'));check(b,'explicit coordinator source');return import(url(tiny(b)));
}
export function declaredSources(plan,C){return C.sourceUnion([...plan.sources,plan.hookModule,plan.hookControls,...plan.stages.flatMap(s=>[s.entry,...s.sources,...s.runtimeBindings])]);}
export function validateConfiguration(plan,C){
  const c=plan.configuration;
  const generic=c?.inventoryVersion===2,fields=['inventory','contract','packageModule','packageControls','independentDecoder','pythonCommand','python','pythonVenvConfig','pythonRuntimeBindings','outputPath'];
  if(generic)fields.push('inventoryVersion','inventoryParser','inventoryParserControls','inventoryContract','admittedClosures','expectedAuthority','expectedMembers','genericIndependentReader');
  check(c&&Object.keys(c).sort().join('|')===fields.sort().join('|'),'closed packaging configuration');
  for(const [key,[p,h]] of Object.entries(PINS)){C.binding(c[key]);if(generic&&key==='inventory')continue;check(c[key].path===path.join(plan.root,p)&&c[key].sha256===h,'frozen '+key+' differs');}
  if(generic){
    for(const[key,[p,h]]of Object.entries(GENERIC_PINS)){C.binding(c[key]);check(h!==null&&c[key].path===path.join(plan.root,p)&&c[key].sha256===h,'reviewed generic '+key+' differs');}
    check(Array.isArray(c.expectedMembers)&&c.expectedMembers.length>0&&c.expectedMembers.length<=4096,'independently fixed member table');
    check(Array.isArray(c.admittedClosures)&&c.admittedClosures.length>0&&c.admittedClosures.length<=159&&Array.isArray(c.expectedAuthority)&&c.expectedAuthority.length>0&&c.expectedAuthority.length<=159,'independent closure and authority inputs');
    c.expectedAuthority.forEach(C.binding);const seen=new Set();for(const x of c.admittedClosures){check(x&&Object.keys(x).sort().join('|')==='binding|expectedInstrument','closed admitted snapshot');C.binding(x.binding);C.binding(x.expectedInstrument);check(c.expectedAuthority.some(b=>same(b,x.expectedInstrument))&&!seen.has(x.binding.path),'explicit unique admitted authority');seen.add(x.binding.path);}
  }
  C.binding(c.python);C.binding(c.pythonVenvConfig);check(c.pythonCommand===path.resolve(plan.root,process.env.AAA_VENV??'../.venv','bin/python'),'shared-venv Python command required');
  check(c.pythonVenvConfig.path===path.resolve(path.dirname(c.pythonCommand),'../pyvenv.cfg'),'explicit shared-venv configuration');
  check(Array.isArray(c.pythonRuntimeBindings)&&c.pythonRuntimeBindings.length>0,'explicit Python runtime inventory');
  const runtime=C.sourceUnion(c.pythonRuntimeBindings);check(runtime.some(b=>same(b,c.python))&&runtime.some(b=>same(b,c.pythonVenvConfig)),'Python executable/config absent from runtime capture');
  check(typeof c.outputPath==='string'&&path.isAbsolute(c.outputPath)&&path.resolve(c.outputPath)===c.outputPath&&plan.outputDirectories.length===1&&path.dirname(c.outputPath)===plan.outputDirectories[0],'single scoped package output');
  check(plan.stages.length===2&&plan.stages[0].id==='producer'&&plan.stages[1].id==='independent-reader','serial writer then independent decoder');
  const required=C.sourceUnion([...Object.keys(PINS).map(k=>c[k]),c.python,...runtime,...(generic?[...Object.keys(GENERIC_PINS).map(k=>c[k]),...c.expectedAuthority,...c.admittedClosures.flatMap(x=>[x.binding,x.expectedInstrument])]:[])]);
  const declared=declaredSources(plan,C);
  for(const b of required)check(declared.some(d=>same(d,b)),'missing bound packaging dependency '+b.path);
  check(plan.hookModule.path===path.join(plan.root,SELF)&&plan.hookControls.path===path.join(plan.root,CONTROL)&&plan.stages.every(s=>same(s.entry,plan.hookModule)),'one captured package driver/control generation');
  check(plan.publicationAliases.length===1&&same(plan.publicationAliases[0],{publicPath:c.outputPath,privateDirectory:path.dirname(c.outputPath),privatePrefix:path.basename(c.outputPath)+'.partial.'}),'exact retained package publication alias');
  return c;
}

async function genericReader(c){return import(url(tiny(c.genericIndependentReader)));}
function document(b,C,live){const r=C.readBound(b.path,b.sha256,true,16777216,live);check(r.bytes===b.bytes,'exact metadata bytes');return JSON.parse(r.data.toString('utf8'));}
export function sourceBaseline(global,members,C){
  const physical=C.sourceUnion(members.map(e=>({path:e.physicalPath,sha256:e.original.sha256,bytes:e.original.bytes})));
  check(physical.length===members.length,'one unique physical source per expected object');
  for(const b of physical)check(global.filter(x=>same(x,b)).length===1,'subtracted member must occur once in complete source union');
  return {sourceFilesAlready:global.length-physical.length,sourceBytesAlready:global.reduce((n,b)=>n+b.bytes,0)-physical.reduce((n,b)=>n+b.bytes,0)};
}
async function contents(c,root,C,live){
  if(c.inventoryVersion===2){
    const reader=await genericReader(c);reader.validateExpectedMembers(c.expectedMembers);
    const census=reader.expectedCensus(c.expectedMembers),inventory=document(c.inventory,C,live);
    check(inventory.schema==='braid-program/accepted-parent-evidence-inventory.v2'&&same(inventory.objects,c.expectedMembers),'inventory equals independently admitted objects');
    for(const[k,v]of Object.entries(census))check(inventory.totals[k]===v,'independent exact '+k+' census');
    check(same(inventory.independentAcceptances,[...c.admittedClosures.map(x=>x.binding)].sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:a.sha256<b.sha256?-1:a.sha256>b.sha256?1:a.bytes-b.bytes)),'exact externally admitted snapshot selection');
    const physical=b=>{const member=c.expectedMembers.find(e=>same(e.original,b));return member?{path:member.physicalPath,sha256:b.sha256,bytes:b.bytes}:b;};
    const references=[inventory.currentAcceptanceOwner.binding,...Object.values(inventory.family).map(physical),physical(inventory.numericalSettings.declaration)];
    for(const x of c.admittedClosures){const snapshot=document(x.binding,C,live);check(same(snapshot.instrument,x.expectedInstrument),'externally admitted snapshot instrument');references.push(...[snapshot.operation,snapshot.invocation,snapshot.closure.evidence,...(snapshot.closure.finalCaller?[snapshot.closure.finalCaller]:[]),...snapshot.parents.map(p=>p.comparisonInstrument)].map(physical));}
    return {members:c.expectedMembers,census,references,owner:inventory.currentAcceptanceOwner,expectationSha256:reader.expectationSha256(c.expectedMembers)};
  }
  const inventory=JSON.parse(tiny(c.inventory)),members=inventory.parents.flatMap(p=>[...p.entries,p.archivedOwner].map(e=>({memberName:e.memberName,role:e.role,parentIndex:e.role==='acceptanceOwner'?null:p.parentIndex,original:e.logicalBinding,physicalPath:path.join(root,e.physicalPath),identity:e.identity})));
  check(members.length===28&&inventory.observedEligibleBytes===8083912,'frozen accepted inventory');
  return {members,census:{objects:28,payloadBytes:8083912},references:[],owner:null,expectationSha256:null};
}

export const PYTHON=String.raw`import __future__,contextlib,dataclasses,hashlib,importlib.util,json,math,os,pathlib,re,stat,sys,time,types
entry_started=time.monotonic()
def require(ok,msg):
 if not ok: raise ValueError(msg)
def ident(s): return (s.st_dev,s.st_ino,s.st_size,s.st_mtime_ns,s.st_ctime_ns)
def capture(b):
 p=b['path']; require(os.path.realpath(p)==p,'runtime/source symlink'); fd=os.open(p,os.O_RDONLY|os.O_NOFOLLOW)
 try:
  before=os.fstat(fd); require(stat.S_ISREG(before.st_mode)and 0<before.st_size<=1073741824,'bounded runtime/source'); h=hashlib.sha256(); parts=[]; n=0
  while True:
   raw=os.read(fd,65536)
   if not raw: break
   n+=len(raw); require(n<=before.st_size,'source grew'); h.update(raw)
   if b.get('collect'): parts.append(raw)
  require(n==b['bytes'] and h.hexdigest()==b['sha256'] and ident(before)==ident(os.fstat(fd))==ident(os.stat(p,follow_symlinks=False)),'runtime/source binding differs')
  return b''.join(parts),ident(before)
 finally: os.close(fd)
mode=sys.argv[1]; config=json.loads(sys.argv[2]); metadata_identities=[]
if mode=='write'and 'planBinding'in config:
 transport=config; require(set(transport)=={'planBinding','budgets'},'compact registered transport')
 require(set(transport['budgets'])=={'scientificBytesAlready','logBytesAlready','sourceFilesAlready','sourceBytesAlready'},'closed spent-budget counters')
 require(transport['planBinding']['bytes']<=1048576,'bound operation plan')
 plan_raw,plan_identity=capture(dict(transport['planBinding'],collect=True));plan=json.loads(plan_raw)
 metadata_identities.append((transport['planBinding'],plan_identity))
 config=dict(plan['configuration'],root=plan['root'],**transport['budgets'])
source=config['packageModule']; raw,source_identity=capture(dict(source,collect=True))
module=types.ModuleType('_captured_f6c_evidence_package'); module.__file__=source['path']; sys.modules[module.__name__]=module; exec(compile(raw,source['path'],'exec'),module.__dict__)
inventory_module=None
if 'inventoryParser'in config:
 parser_source=config['inventoryParser'];parser_raw,parser_identity=capture(dict(parser_source,collect=True))
 inventory_module=types.ModuleType('_captured_f6c_parent_evidence_inventory');inventory_module.__file__=parser_source['path'];sys.modules[inventory_module.__name__]=inventory_module;exec(compile(parser_raw,parser_source['path'],'exec'),inventory_module.__dict__)
 metadata_identities.append((parser_source,parser_identity))
venv_config=os.path.realpath(os.path.join(sys.prefix,'pyvenv.cfg')); require(os.path.isfile(venv_config),'shared venv configuration required')
def runtime_paths():
 paths={os.path.realpath(sys.executable),os.path.realpath(getattr(sys,'_base_executable',sys.executable)),venv_config}
 for m in list(sys.modules.values()):
  if m is module or m is inventory_module: continue
  for attr in ('__file__','__cached__'):
   p=getattr(m,attr,None)
   if p and os.path.isfile(p): paths.add(os.path.realpath(p))
 return sorted(paths)
def observed_binding(p):
 raw=pathlib.Path(p).read_bytes(); return dict(path=p,sha256=hashlib.sha256(raw).hexdigest(),bytes=len(raw))
if mode=='inventory':
 print(json.dumps(dict(pythonCommand=sys.executable,python=observed_binding(os.path.realpath(sys.executable)),pythonVenvConfig=observed_binding(venv_config),runtimeBindings=[observed_binding(p) for p in runtime_paths()],numericalCalls=0),separators=(',',':'))); sys.exit(0)
require(mode=='write','writer mode'); expected=config['pythonRuntimeBindings']; require(runtime_paths()==sorted(b['path'] for b in expected),'complete Python runtime inventory differs')
require(sys.executable==config['pythonCommand'] and os.path.realpath(sys.executable)==config['python']['path'] and venv_config==config['pythonVenvConfig']['path'],'same shared-venv command/configuration')
runtime_identities={b['path']:capture(b)[1] for b in expected}; deadline=entry_started+float(sys.argv[3]); require(0<float(sys.argv[3])<=1800,'remaining duration')
def live(event): require(time.monotonic()<deadline,'supplementary Python deadline')
inventory_raw,inventory_identity=capture(dict(config['inventory'],collect=True))
if config.get('inventoryVersion')==2:
 require(inventory_module is not None,'captured generic parser required')
 admitted=[]
 for item in config['admittedClosures']:
  require(item['binding']['bytes']<=16777216,'bounded snapshot');data,initial=capture(dict(item['binding'],collect=True));metadata_identities.append((item['binding'],initial))
  admitted.append(dict(binding=item['binding'],raw=data,expectedInstrument=item['expectedInstrument']))
 members=inventory_module.parse_inventory(inventory_raw,config['inventory'],module,admitted_closures=tuple(admitted),expected_authority=tuple(config['expectedAuthority']))
 want=tuple(module.ExpectedMember(e['memberName'],e['role'],e['parentIndex'],module.Binding(**e['original']),e['physicalPath'],module.SourceIdentity(*(int(e['identity'][k])for k in ('device','inode','bytes','mtimeNs','ctimeNs'))))for e in config['expectedMembers'])
 require(members==want,'parser differs from independently fixed expected members')
else:
 require(inventory_module is None,'no generic fallback');members=module.inventory_members(inventory_raw,expected_sha256=config['inventory']['sha256'],root=config['root'])
live({})
publication=module.write_package(members,config['outputPath'],deadline=deadline,live=live,scientific_bytes_already=config['scientificBytesAlready'],log_bytes_already=config['logBytesAlready'],source_files_already=config['sourceFilesAlready'],source_bytes_already=config['sourceBytesAlready'])
require(runtime_paths()==sorted(b['path'] for b in expected),'runtime module set changed')
for b in expected: require(capture(b)[1]==runtime_identities[b['path']],'runtime replaced')
for b,initial in metadata_identities: require(capture(b)[1]==initial,'original plan/parser/snapshot replaced')
require(capture(source)[1]==source_identity and capture(config['inventory'])[1]==inventory_identity,'source/inventory replacement'); live({})
wire=dataclasses.asdict(publication); wire['identity']={k:str(v) for k,v in wire['identity'].items()}
print(json.dumps(dict(completed=True,publication=wire,runtimeBindings=expected,numericalCalls=0),separators=(',',':')))
`;

export function runtimeInventoryCommand(pythonCommand,packageModule,inventoryParser=null){return {command:pythonCommand,args:['-I','-B','-c',PYTHON,'inventory',JSON.stringify({packageModule,...(inventoryParser===null?{}:{inventoryParser})})]};}
export function parseCompletion(raw){
  check(Buffer.isBuffer(raw)&&raw.length>0&&raw.length<=1048576,'bounded stage completion');const lines=raw.toString('utf8').split('\n');check(lines.length===2&&lines[1]==='','one complete stage record');const value=JSON.parse(lines[0]);check(value.completed===true&&value.numericalCalls===0,'metadata-only stage completion');return value;
}
function completionFor(stage,C){return parseCompletion(C.readBound(stage.process.stdoutLog.path,stage.process.stdoutLog.sha256,true,1048576).data);}
function nodeRuntime(stage,C){const b=stage.runtimeBindings.find(b=>b.path===realpathSync(process.execPath));check(b,'bound Node runtime');const actual=C.clean(C.readBound(b.path,b.sha256));check(same(actual,b),'Node runtime size');return b;}
const ordered=rows=>[...rows].sort((a,b)=>a.path.localeCompare(b.path));
function declaredRuntimes(plan,c,C){
  for(const stage of plan.stages){const node=nodeRuntime(stage,C),expected=C.sourceUnion(stage.id==='producer'?[node,...c.pythonRuntimeBindings]:[node]);check(same(ordered(expected),ordered(C.sourceUnion(stage.runtimeBindings))),'complete declared stage runtime set');}
}
export function publicationIdentity(p,outputPath){
  check(p&&p.identity&&Object.keys(p.identity).sort().join('|')===['device','inode','bytes','mtime_ns','ctime_ns'].sort().join('|'),'writer identity fields');
  check(Object.values(p.identity).every(v=>typeof v==='string'&&/^(?:0|[1-9][0-9]{0,38})$/u.test(v)),'exact string-valued writer identity');
  check(typeof p.private_path==='string'&&path.dirname(p.private_path)===path.dirname(outputPath)&&p.private_path.startsWith(outputPath+'.partial.')&&/^[a-f0-9]{32}$/u.test(p.private_path.slice((outputPath+'.partial.').length)),'original private publication path');
  check(p.identity.bytes===String(p.binding.bytes),'writer identity byte count');return ['device','inode','bytes','mtime_ns','ctime_ns'].map(k=>p.identity[k]).join(':');
}

export async function fileOperation(job){
  const C=await coordinator(job.plan),c=validateConfiguration(job.plan,C),live=()=>check(process.hrtime.bigint()<BigInt(job.deadlineNanoseconds),'original package operation deadline');
  live();
  const expected=await contents(c,job.plan.root,C,live);
  if(job.kind==='preflight'){
    check(realpathSync(c.pythonCommand)===c.python.path&&realpathSync(c.pythonVenvConfig.path)===c.pythonVenvConfig.path,'shared-venv command resolves to frozen runtime');declaredRuntimes(job.plan,c,C);
    tiny(c.contract);
    const sources=declaredSources(job.plan,C);
    for(const b of expected.references)check(sources.some(s=>same(s,b)),'all acceptance references must be globally bound');
    const inodes=new Set();
    for(const e of expected.members){const b={path:e.physicalPath,sha256:e.original.sha256,bytes:e.original.bytes};check(sources.some(s=>same(s,b)),'all original package inputs must be globally bound');
      const actual=C.readBound(b.path,b.sha256,false,67108864,live),identity=['device','inode','bytes','mtimeNs','ctimeNs'].map(k=>e.identity[k]).join(':'),inode=identity.split(':').slice(0,2).join(':');check(actual.bytes===b.bytes&&actual.identity===identity&&!inodes.has(inode),'original inventory identity differs or aliases');inodes.add(inode);}
    if(expected.owner){const b=expected.owner.binding,actual=C.readBound(b.path,b.sha256,false,67108864,live),identity=['device','inode','bytes','mtimeNs','ctimeNs'].map(k=>expected.owner.identity[k]).join(':');check(actual.bytes===b.bytes&&actual.identity===identity&&!inodes.has(identity.split(':').slice(0,2).join(':')),'direct current owner identity');}
    return {accepted:true,h3EvidenceEligible:false,numericalCalls:0};
  }
  if(job.kind==='admit'){
    const stage=job.plan.stages.find(s=>s.id===job.stageId);check(stage,'declared packaging stage');
    C.binding(job.stdoutLog);const complete=parseCompletion(C.readBound(job.stdoutLog.path,job.stdoutLog.sha256,true,1048576).data);check(complete.stage===stage.id,'stage attribution');
    check(job.processReceipt.gates.length===(stage.id==='producer'?1:0),'exact stage process gate census');
    if(stage.id==='producer'){
      const p=complete.publication;C.binding(p.binding);check(p.binding.path===c.outputPath&&p.status==='package-published-not-process-closure'&&p.input_files===expected.census.objects&&p.input_bytes===expected.census.payloadBytes&&(!expected.census.packageBytes||p.binding.bytes===expected.census.packageBytes),'writer publication only');
      const publicBinding=C.readBound(c.outputPath,p.binding.sha256,false,67108864,live),privateBinding=C.readBound(p.private_path,p.binding.sha256,false,67108864,live);
      const originalIdentity=publicationIdentity(p,c.outputPath);check(publicBinding.bytes===p.binding.bytes&&publicBinding.identity===originalIdentity&&privateBinding.identity===originalIdentity,'original writer private/public identity');
    }else{
      check(job.previousStages.length===1,'closed producer required');const producer=completionFor(job.previousStages[0],C);
      check(complete.review.accepted===true&&complete.review.members===expected.census.objects&&complete.review.verifiedBytes===expected.census.payloadBytes&&complete.review.writerImports===0&&complete.review.adapterImports===0&&complete.review.numericalCalls===0&&complete.review.packageSha256===producer.publication.binding.sha256&&complete.review.packageBytes===producer.publication.binding.bytes&&complete.review.packagePath===c.outputPath,'independent complete package review');
      if(c.inventoryVersion===2)check(complete.review.parserImports===0&&complete.review.expectationSha256===expected.expectationSha256,'independent external tuple attribution');
    }
    live();return {accepted:true,h3EvidenceEligible:false,runtimeBindings:complete.runtimeBindings,completion:complete,numericalCalls:0};
  }
  check(job.kind==='final'&&job.stages.length===2,'two closed package stages required');
  const producer=completionFor(job.stages[0],C),review=completionFor(job.stages[1],C);check(review.review.packageSha256===producer.publication.binding.sha256,'final independent package binding');
  const pub=C.readBound(c.outputPath,producer.publication.binding.sha256,false,67108864,live),priv=C.readBound(producer.publication.private_path,producer.publication.binding.sha256,false,67108864,live),originalIdentity=publicationIdentity(producer.publication,c.outputPath);check(pub.identity===originalIdentity&&priv.identity===originalIdentity,'final original publication identity');
  live();return {accepted:true,h3EvidenceEligible:false,numericalCalls:0};
}

export async function registered(stageId,planBinding,deadlineNanoseconds,prior){
  const plan=JSON.parse(tiny(planBinding)),C=await coordinator(plan),c=validateConfiguration(plan,C),stage=plan.stages.find(s=>s.id===stageId);check(stage,'declared stage');
  const live=()=>check(process.hrtime.bigint()<BigInt(deadlineNanoseconds),'original registered deadline');live();const node=nodeRuntime(stage,C);
  const expected=await contents(c,plan.root,C,live);let result;
  if(stageId==='producer'){
    check(prior===null,'producer has no predecessor');
    const {spawn}=await import('node:child_process'),census=C.outputCensus(plan),all=declaredSources(plan,C);
    const global=C.sourceUnion([...all,planBinding,...Object.values(C.PINS).map(([p,h])=>C.clean(C.readBound(path.join(plan.root,p),h,false,1048576,live)))]);
    const budgets={scientificBytesAlready:census.scientificBytes,logBytesAlready:census.logBytes,...sourceBaseline(global,expected.members,C)};
    const config=c.inventoryVersion===2?{planBinding,budgets}:{...c,root:plan.root,...budgets};
    const duration=Number(BigInt(deadlineNanoseconds)-process.hrtime.bigint())/1e9;check(duration>0&&duration<=1800,'remaining original duration');
    const child=spawn(c.pythonCommand,['-I','-B','-c',PYTHON,'write',JSON.stringify(config),String(duration)],{cwd:plan.root,detached:true,stdio:['ignore','pipe','pipe']});
    const chunks=[];let bytes=0,overflow=false;
    child.stdout.on('data',raw=>{bytes+=raw.length;if(bytes>1048576){overflow=true;child.kill('SIGTERM');}else chunks.push(raw);});child.stderr.pipe(process.stderr);
    await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>code===0&&!signal&&!overflow?resolve():reject(Error('package writer did not close successfully')));});
    result=parseCompletion(Buffer.concat(chunks));result.runtimeBindings=C.sourceUnion([node,...result.runtimeBindings]);
  }else{
    check(stageId==='independent-reader'&&prior&&Object.keys(prior).sort().join('|')==='stageId|stdoutLog'&&prior.stageId==='producer','authenticated immediate producer required');C.binding(prior.stdoutLog);
    check(prior.stdoutLog.path===path.join(plan.operationDirectory,'stages/producer/runner-stdout.log'),'exact admitted producer stdout path');
    const producerRaw=C.readBound(prior.stdoutLog.path,prior.stdoutLog.sha256,true,1048576,live);check(producerRaw.bytes===prior.stdoutLog.bytes,'admitted producer stdout size');const producer=parseCompletion(producerRaw.data);
    const b=producer.publication.binding;
    const review=c.inventoryVersion===2?await(await genericReader(c)).verifyGenericPackage(b,c.expectedMembers,{byteDecoder:c.independentDecoder,live}):(await import(url(tiny(c.independentDecoder)))).verifyAcceptedPackage(c.outputPath,b.sha256,b.bytes);
    result={completed:true,review,runtimeBindings:[node],numericalCalls:0};
  }
  check(same(ordered(result.runtimeBindings),ordered(C.sourceUnion(stage.runtimeBindings))),'observed complete runtime set');result.runtimeBindings=stage.runtimeBindings;
  live();nodeRuntime(stage,C);result.stage=stageId;result.processResourceUsage=process.resourceUsage();console.log(JSON.stringify(result));
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const v=process.argv.slice(2);check(v.length===8&&v[0]==='--registered'&&v[2]==='--operation-deadline-ns'&&v[4]==='--operation-prior-stdout'&&v[6]==='--operation-plan-binding','registered packaging CLI only');
  await registered(v[1],JSON.parse(v[7]),v[3],JSON.parse(v[5]));
}
