/** Metadata-only preparation of an explicitly bound parent-refinement batch.
 * No provider, hook, process launch, source discovery, retry or acceptance.
 * The unchanged generic coordinator is the only scientific-operation entry.
 */
import {createHash} from 'node:crypto';
import {constants,openSync,closeSync,readSync,writeSync,fsyncSync,fstatSync,lstatSync,realpathSync,mkdirSync,readdirSync,existsSync,statfsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const SELF='scripts/eom/prepare-f6c-parent-refinement-batch.mjs';
export const CONTROLS='tests/f6c-parent-refinement-batch-preparation.test.js';
export const COORDINATOR=['scripts/eom/f6c-bounded-operation.mjs','5428e4b89736730cdae1671f39b3fd5b0067be781fbfb8cda774347a9890b885'];
export const EXPECTATIONS=['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/parent-batch-prepare-only-expectations.md','fcf3d69fa443e5aa9a042f7725a807a3543a37755008c2c6860521f901ac5ab2'];
export const CORRECTION=['.local-data/braid-analysis/f6c-whole-history-20260828/numerical-review/parent-batch-consumed-document-route-correction.md','4301c278c958ff99582cbe6b8cd73b94c987d4e34f48f6ee3672dd7b2a0fd5c5'];
export const LIMITS=Object.freeze({milliseconds:120000,rssBytes:2147483648,sourceFiles:512,sourceBytes:1073741824,outputBytes:67108864,outputPaths:512});
const check=(ok,message)=>{if(!ok)throw Error(message);};
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const url=raw=>'data:text/javascript;base64,'+Buffer.from(raw).toString('base64');
const ident=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
const inode=s=>[s.dev,s.ino].join(':');
const clean=({data,identity,...b})=>b;
const keys=(o,n)=>check(o&&Object.getPrototypeOf(o)===Object.prototype&&Object.keys(o).sort().join('|')===[...n].sort().join('|'),'closed preparation fields');
export const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
const absolute=p=>check(typeof p==='string'&&p.length>0&&p.length<=2048&&p.startsWith('/')&&!p.startsWith('//')&&!p.includes('\0')&&!p.includes('\\')&&path.resolve(p)===p,'canonical absolute path');
const digest=h=>check(typeof h==='string'&&/^[a-f0-9]{64}$/u.test(h),'explicit expected hash');
export function parseArguments(a){
 check(Array.isArray(a)&&a.length===8&&a[0]==='--configuration'&&a[2]==='--configuration-sha256'&&a[4]==='--self-sha256'&&a[6]==='--out-directory','usage: --configuration ABS --configuration-sha256 SHA --self-sha256 SHA --out-directory ABS');
 absolute(a[1]);digest(a[3]);digest(a[5]);absolute(a[7]);return{configurationPath:a[1],configurationSha256:a[3],selfSha256:a[5],outDirectory:a[7]};
}
// Small same-FD bootstrap; all later byte IO uses the frozen coordinator.
function bootstrap(filename,expected,live){
 absolute(filename);digest(expected);check(realpathSync(filename)===filename,'bootstrap alias');live();
 const fd=openSync(filename,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
 try{const s=fstatSync(fd,{bigint:true});check(s.isFile()&&s.size>0n&&s.size<=1048576n,'bootstrap bound');const raw=Buffer.alloc(Number(s.size));let at=0;
  while(at<raw.length){live();const n=readSync(fd,raw,at,Math.min(65536,raw.length-at),at);check(n>0,'bootstrap EOF');at+=n;}
  check(sha(raw)===expected&&ident(s)===ident(fstatSync(fd,{bigint:true}))&&ident(s)===ident(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename,'bootstrap source replacement');
  return{path:filename,sha256:expected,bytes:raw.length,identity:ident(s),data:raw};
 }finally{closeSync(fd);}
}
export function validateConfiguration(c,C,root){
 keys(c,['schema','root','template','coordinator','composition','compositionControls','preparationControls','expectations','sources','sourceIdentities','runtimeBindings','operationalBindings','acceptanceOwner','historicalDocumentRoutes','pythonCommand','git','operationDirectory','parents','closureReserveBytes']);
 check(c.schema==='braid-program/f6c-parent-refinement-batch-preparation.v1'&&c.root===root,'preparation root/schema');absolute(root);absolute(c.operationDirectory);absolute(c.pythonCommand);absolute(c.git);
 for(const k of ['template','coordinator','composition','compositionControls','preparationControls','expectations','acceptanceOwner'])C.binding(c[k]);
 check(c.coordinator.path===path.join(root,COORDINATOR[0])&&c.coordinator.sha256===COORDINATOR[1],'frozen coordinator');
 check(c.preparationControls.path===path.join(root,CONTROLS)&&c.expectations.path===path.join(root,EXPECTATIONS[0])&&c.expectations.sha256===EXPECTATIONS[1],'preparation control/expectation');
 check(Array.isArray(c.sources)&&Array.isArray(c.runtimeBindings)&&Array.isArray(c.operationalBindings),'explicit source/runtime arrays');
 const sources=C.sourceUnion(c.sources);check(sources.length===c.sources.length,'unique explicit source paths');
 check(c.sourceIdentities&&Object.getPrototypeOf(c.sourceIdentities)===Object.prototype&&Object.keys(c.sourceIdentities).sort().join('|')===sources.map(b=>b.path).sort().join('|'),'exact original identity keys');
 for(const value of Object.values(c.sourceIdentities))check(typeof value==='string'&&/^(?:0|[1-9][0-9]*)(?::(?:0|[1-9][0-9]*)){4}$/u.test(value),'original five-field identity');
 for(const k of ['template','coordinator','composition','compositionControls','preparationControls','expectations','acceptanceOwner'])check(sources.some(b=>canonical(b)===canonical(c[k])),'missing explicit '+k);
 check(sources.some(b=>b.path===path.join(root,CORRECTION[0])&&b.sha256===CORRECTION[1]),'independently frozen consumed-route correction');
 for(const b of [...c.runtimeBindings,...c.operationalBindings]){C.binding(b);check(sources.some(x=>canonical(x)===canonical(b)),'runtime not in explicit union');}
 check(Array.isArray(c.parents)&&c.parents.length>0&&c.parents.length<=8,'bounded selected parents');let previous=-1;
 for(const p of c.parents){keys(p,['parentIndex','output','producerMaximumBytes','comparisonMaximumBytes']);check(Number.isInteger(p.parentIndex)&&p.parentIndex>previous&&p.parentIndex<160,'strict original parent index');previous=p.parentIndex;absolute(p.output);}
 return sources;
}
export function derivePlans({configuration:c,template,admission,exported,self,configurationBinding,outDirectory,C,B}){
 validateConfiguration(c,C,c.root);absolute(outDirectory);
 const plans=B.makeParentPlans({template,indices:c.parents.map(p=>p.parentIndex),sourceBindings:c.sources,runtimeBindings:c.runtimeBindings,operationalBindings:c.operationalBindings,acceptanceOwner:c.acceptanceOwner,historicalDocumentRoutes:c.historicalDocumentRoutes});
 const inputs=plans.map(p=>B.validatePlan(p,{root:c.root,selfSha:c.composition.sha256,python:c.pythonCommand,git:c.git}));
 check(c.composition.path===path.join(c.root,B.SELF)&&c.compositionControls.path===path.join(c.root,B.CONTROL),'exact reviewed composition paths');
 check(admission.schema==='braid-program/f6c-cached-root-cover-full-admission.v1'&&admission.scope==='full'&&admission.accepted===true&&admission.processesClosed===true&&Array.isArray(admission.sourceBindings)&&admission.sourceBindings.length===198,'bound complete original ancestry');
 const historical=admission.sourceBindings.map(b=>B.binding(b,c.root));
 check(Array.isArray(admission.stages)&&admission.stages.length===2,'original two closed stages');
 const logs=admission.stages.flatMap((s,i)=>{check(s.stage===['consumer','comparison'][i]&&s.process?.accepted===true&&s.process?.processesClosed===true,'original stage closure');return[s.process.stdoutLog,s.process.stderrLog].map(b=>B.binding(b,c.root));});
 const needed=C.sourceUnion([...inputs.flatMap(p=>p.sources),...historical.map(b=>B.physicalSource(b,inputs[0].plan)),...logs]);
 for(const r of inputs[0].plan.historicalDocumentRoutes)check(historical.some(b=>canonical(b)===canonical(r.original)),'unused original document route');
 for(const b of needed)check(c.sources.some(x=>canonical(x)===canonical(b)),'undeclared historical/current source '+b.path);
 const metadata=c.parents.map(p=>B.originalParentMetadata(exported,p.parentIndex));
 const records=plans.map(p=>({path:path.join(outDirectory,'parent-'+p.parentIndex+'.plan.json'),value:p}));
 for(const r of records){r.raw=Buffer.from(canonical(r.value)+'\n');check(r.raw.length<=1048576,'per-parent consumer plan byte limit');r.binding={path:r.path,sha256:sha(r.raw),bytes:r.raw.length};}
 const sources=C.sourceUnion([...c.sources,self,configurationBinding,...records.map(r=>r.binding)]);
 const node=c.operationalBindings.find(b=>b.path===realpathSync(process.execPath));check(node,'bound executing Node');
 const batch=B.makeBatchPlan({root:c.root,operationDirectory:c.operationDirectory,parents:c.parents.map((p,i)=>({...p,plan:records[i].binding})),pythonCommand:c.pythonCommand,git:c.git,hookModule:c.composition,hookControls:c.compositionControls,sources,runtimeBindings:B.uniqueBindings([...c.runtimeBindings,node]),closureReserveBytes:c.closureReserveBytes});
 B.validateBatch(batch);C.validatePlan(batch,c.root);
 const batchRaw=Buffer.from(canonical(batch)+'\n');check(batchRaw.length<=1048576,'coordinator consumer plan byte limit');const batchBinding={path:path.join(outDirectory,'batch.plan.json'),sha256:sha(batchRaw),bytes:batchRaw.length};
 C.sourceUnion([...sources,batchBinding]); // Runtime also captures its plan.
 records.push({path:batchBinding.path,value:batch,raw:batchRaw,binding:batchBinding});
 check(records.length+1<=LIMITS.outputPaths&&records.reduce((n,r)=>n+r.raw.length,0)<LIMITS.outputBytes,'preparation output quota');
 return{records,batch,batchBinding,metadata,requiredSources:needed,sources,invocation:[node.path,c.coordinator.path,'--plan',batchBinding.path,'--plan-sha256',batchBinding.sha256,'--self-sha256',c.coordinator.sha256]};
}
export class Publication{
 constructor(directory,C,live){
  absolute(directory);check(realpathSync(path.dirname(directory))===path.dirname(directory),'parent directory alias');
  this.directory=directory;this.C=C;this.live=live;this.records=[];this.bytes=0;this.closed=false;
  mkdirSync(directory,{mode:0o700});this.dir=openSync(directory,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{this.originalDir=inode(fstatSync(this.dir,{bigint:true}));this.check();}catch(e){this.close();throw e;}
 }
 check(){
  const d=lstatSync(this.directory,{bigint:true});check(d.isDirectory()&&inode(d)===this.originalDir&&realpathSync(this.directory)===this.directory,'original publication directory');
  if(!this.closed)check(inode(fstatSync(this.dir,{bigint:true}))===this.originalDir,'directory descriptor replaced');
  const names=readdirSync(this.directory).sort();check(canonical(names)===canonical(this.records.map(r=>path.basename(r.binding.path)).sort()),'undeclared preparation output');
  for(const r of this.records){const s=lstatSync(r.binding.path,{bigint:true});check(s.isFile()&&s.nlink===1n&&inode(s)===r.inode&&realpathSync(r.binding.path)===r.binding.path,'original publication path');if(r.identity)check(ident(s)===r.identity,'published bytes changed');if(r.fd!==null)check(inode(fstatSync(r.fd,{bigint:true}))===r.inode,'original write descriptor');}
 }
 write(record){
  check(!this.closed&&path.dirname(record.binding.path)===this.directory&&record.raw.length===record.binding.bytes&&sha(record.raw)===record.binding.sha256,'declared exact publication');
  check(this.records.length<LIMITS.outputPaths&&this.bytes+record.raw.length<=LIMITS.outputBytes,'aggregate preparation output quota');this.live();this.check();
  const fd=openSync(record.binding.path,'wx',0o600);let s;try{s=fstatSync(fd,{bigint:true});}catch(e){closeSync(fd);throw e;}const r={binding:record.binding,inode:inode(s),fd,identity:null};this.records.push(r);
  let at=0;while(at<record.raw.length){this.live();this.check();const n=writeSync(fd,record.raw,at,Math.min(65536,record.raw.length-at));check(n>0,'publication stalled');at+=n;}
  fsyncSync(fd);r.identity=ident(fstatSync(fd,{bigint:true}));this.bytes+=at;fsyncSync(this.dir);this.live();this.check();return{...r.binding,identity:r.identity};
 }
 close(){let error;for(const r of this.records)if(r.fd!==null){try{closeSync(r.fd);}catch(e){error??=e;}r.fd=null;}if(!this.closed){try{closeSync(this.dir);}catch(e){error??=e;}this.closed=true;}if(error)throw error;}
 verify(){this.live();this.check();this.C.checkOutputs(this.records.map(r=>({...r.binding,identity:r.identity})),()=>{this.live();this.check();});this.live();this.check();}
}
export async function prepare({options,self,coordinator,began,deadline}){
 check(import.meta.url===url(self.data),'captured preparation generation');let maximumRSSBytes=0,publication;const root=realpathSync(process.cwd());
 const live=()=>{check(performance.now()<deadline,'original preparation deadline');const rss=process.memoryUsage().rss;maximumRSSBytes=Math.max(maximumRSSBytes,rss);check(rss<=LIMITS.rssBytes,'preparation RSS');};live();
 const C=await import(url(coordinator.data));
 const input=C.readBound(options.configurationPath,options.configurationSha256,true,1048576,live),c=JSON.parse(input.data.toString('utf8'));
 check(input.data.equals(Buffer.from(canonical(c)+'\n')),'canonical closed configuration bytes');validateConfiguration(c,C,root);
 const first=C.originalIdentities([self,coordinator,input]);for(const[p,id]of Object.entries(c.sourceIdentities)){check(!first[p]||first[p]===id,'original source generation conflict');first[p]=id;}
 const sources=C.sourceUnion([...c.sources,clean(self),clean(input)]);C.captureUnion(sources,first,live);
 const subject=C.readBound(c.composition.path,c.composition.sha256,true,1048576,live);check(subject.bytes===c.composition.bytes&&subject.identity===first[subject.path],'captured composition original identity');const B=await import(url(subject.data));
 const read=b=>{const f=C.readBound(b.path,b.sha256,true,67108864,live);check(f.bytes===b.bytes&&f.identity===first[f.path],'original metadata identity');return B.parseJSON(f.data);};
 const template=read(c.template),originals=Object.fromEntries(Object.entries(template.originalBindings).map(([k,b])=>[k,B.binding(b,root)]));
 const result=derivePlans({configuration:c,template,admission:read(originals.fullAdmission),exported:read(originals.export),self:clean(self),configurationBinding:clean(input),outDirectory:options.outDirectory,C,B});
 const dirs=[options.outDirectory,result.batch.operationDirectory,...result.batch.outputDirectories];check(new Set(dirs).size===dirs.length&&!dirs.some(a=>dirs.some(b=>a!==b&&a.startsWith(b+'/'))),'disjoint preparation/operation roots');
 for(const d of dirs){absolute(d);check(d.startsWith(path.join(root,'.local-data/braid-analysis')+'/')&&!existsSync(d),'fresh explicit output directory');}
 check(sources.every(b=>!dirs.some(d=>b.path===d||b.path.startsWith(d+'/'))),'source/output overlap');
 const receipt={schema:'braid-program/f6c-parent-refinement-batch-preparation-receipt.v1',prepared:true,scientificCalls:0,scientificAcceptance:false,configuration:clean(input),preparer:clean(self),sourceBindings:sources,sourceIdentities:first,parentMetadata:result.metadata,outputs:result.records.map(r=>r.binding),invocation:result.invocation,limits:LIMITS};
 const receiptRaw=Buffer.from(canonical(receipt)+'\n'),receiptRecord={raw:receiptRaw,binding:{path:path.join(options.outDirectory,'preparation-receipt.json'),sha256:sha(receiptRaw),bytes:receiptRaw.length}};
 check(result.records.reduce((n,r)=>n+r.raw.length,receiptRaw.length)<=LIMITS.outputBytes&&result.records.length+1<=LIMITS.outputPaths,'all plans plus receipt quota before publication');
 live();const disk=statfsSync(root,{bigint:true});check(disk.bavail*disk.bsize>=68719476736n,'preparation initial disk reserve');
 try{
  publication=new Publication(options.outDirectory,C,()=>{live();const d=statfsSync(root,{bigint:true});check(d.bavail*d.bsize>=17179869184n,'preparation disk floor');});
  for(const r of [...result.records,receiptRecord])publication.write(r);
  publication.verify();C.captureUnion(sources,first,live);publication.close();publication.verify();C.captureUnion(sources,first,live);publication.verify();
  live();publication.check();
  return{prepared:true,scientificCalls:0,scientificAcceptance:false,receipt:receiptRecord.binding,batchPlan:result.batchBinding,invocation:result.invocation,elapsedSeconds:(performance.now()-began)/1000,maximumSampledOwnRSSBytes:maximumRSSBytes,outputBytes:publication.bytes,outputPaths:publication.records.length,sourceFiles:sources.length,sourceBytes:sources.reduce((n,b)=>n+b.bytes,0),descriptorsClosed:true};
 }finally{publication?.close();}
}
export async function runPreparation(options){
 const began=performance.now(),deadline=began+LIMITS.milliseconds,live=()=>check(performance.now()<deadline&&process.memoryUsage().rss<=LIMITS.rssBytes,'preparation bootstrap deadline/RSS');
 const root=realpathSync(process.cwd()),self=bootstrap(path.join(root,SELF),options.selfSha256,live),coordinator=bootstrap(path.join(root,COORDINATOR[0]),COORDINATOR[1],live);
 const captured=await import(url(self.data));return captured.prepare({options,self,coordinator,began,deadline});
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 Promise.resolve().then(()=>runPreparation(parseArguments(process.argv.slice(2)))).then(result=>{process.stdout.write(canonical(result)+'\n');},e=>{process.stderr.write(canonical({prepared:false,scientificCalls:0,retainedOutputs:true,failure:String(e.message).slice(0,4096)})+'\n');process.exitCode=1;});
}
