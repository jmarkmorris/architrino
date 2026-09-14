// Data-only v6 preparer: Python runtime inventory only, never a scientific target.
// Current specs explicitly list runtime files and scientific evidence inputs.
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {closeSync,constants,existsSync,fstatSync,lstatSync,openSync,readSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const STREAMED='scripts/eom/run-f6c-streamed-leaf-diagnostic.mjs';
const requireValue=(ok,message)=>{if(!ok)throw Error(message);};
const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/u.test(x);
const sha=raw=>createHash('sha256').update(raw).digest('hex');
const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
function capture(filename,expected){
 requireValue(hash(expected),'explicit coordinatorSha256 required');
 requireValue(realpathSync(filename)===filename,'canonical streamed source required');
 const fd=openSync(filename,constants.O_RDONLY|constants.O_NONBLOCK|constants.O_NOFOLLOW);
 try{
  const before=fstatSync(fd,{bigint:true});requireValue(before.isFile()&&before.size>0n&&before.size<=1024n**2n,'bounded streamed source required');
  const data=Buffer.alloc(Number(before.size));let at=0;
  while(at<data.length){const n=readSync(fd,data,at,data.length-at,at);requireValue(n>0,'truncated streamed source');at+=n;}
  requireValue(identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename&&sha(data)===expected,'streamed source changed/hash mismatch');
  return {path:filename,sha256:expected,bytes:data.length,data,identity:identity(before)};
 }finally{closeSync(fd);}
}

// This result authenticates metadata only; it is not a valid invocation or a
// historical-evidence choice. coordinatorSha256 selects the streamed module,
// while the external source map selects the common operational coordinator.
async function loadPreparationSources({root,coordinatorSha256}){
 requireValue(hash(coordinatorSha256),'explicit coordinator digest required');
 const captured=capture(path.join(root,STREAMED),coordinatorSha256);
 const C=await import('data:text/javascript;base64,'+captured.data.toString('base64'));
 const bindings={coordinator:C.clean(captured)},identities={[captured.path]:captured.identity};
 for(const [role,p]of Object.entries(C.OPERATIONS)){const source=C.readBound(path.join(root,p));bindings[role]=C.clean(source);identities[source.path]=source.identity;}
 return {C,bindings,identities};
}
export async function prepare(options){
 return prepareCaptured(options,await loadPreparationSources(options));
}
function prepareCaptured({root,coordinatorSha256,python,descriptors,readinessSha256,output,maxAdvances,evidencePackage=null,acceptedParentEvidence=[],continuation=null},{C,bindings,identities}){
 requireValue(hash(readinessSha256),'explicit readiness digest required');
 requireValue(typeof python==='string'&&path.isAbsolute(python)&&path.resolve(python)===python,'explicit absolute Python invocation required');
 const bind=(p,h)=>C.clean(C.readBound(p,h));
 bindings.controls=bind(path.join(root,C.CONTROL));
 // Read current modules directly and preserve explicit scientific artifact inputs.
 for(const [role,p]of Object.entries(C.INPUT_PATHS)){
  if(role==='readiness'){bindings[role]=bind(path.join(root,p),readinessSha256);continue;}
  bindings[role]=bind(path.join(root,p));
 }
 requireValue(Array.isArray(descriptors),'explicit descriptor array');
 const parentRefinements=structuredClone(descriptors);
 for(const d of parentRefinements)requireValue(d.closure.owner.sha256===readinessSha256,'descriptor must bind current owner explicitly');
 const packageSelection=evidencePackage===null?null:{package:structuredClone(evidencePackage),...Object.fromEntries(Object.entries(C.PACKAGE_PATHS).map(([role,p])=>[role,bind(path.join(root,p))]))};
 const spec={schema:'braid-program/f6c-streamed-leaf-invocation.v6',scope:C.SCOPE,root,output,python,git:'/usr/bin/git',bindings,runtimeBindings:[],parentRefinements,evidencePackage:packageSelection,acceptedParentEvidence:structuredClone(acceptedParentEvidence),continuation:structuredClone(continuation),maxAdvances,limits:C.LIMITS};
 requireValue(!existsSync(output)&&!existsSync(output+'-outer'),'output already exists');
 const inventory=spawnSync(python,['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:10000,maxBuffer:1024**2});
 requireValue(inventory.status===0,'Python runtime discovery failed: '+inventory.stderr);
 const discovered=JSON.parse(inventory.stdout);
 requireValue(Array.isArray(discovered)&&discovered.length>0&&discovered.length<=256&&discovered.every(p=>typeof p==='string'&&path.isAbsolute(p)),'bounded Python runtime inventory');
 const runtimePaths=[...discovered,path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'),'/usr/bin/git',realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'];
 spec.runtimeBindings=[...new Set(runtimePaths)].sort().map(p=>bind(p));
 spec.continuation=C.prepareContinuation(spec);
 const sources=C.validateSpec(spec,coordinatorSha256);
 C.checkBindings(sources,()=>{},identities);
 requireValue(!existsSync(output)&&!existsSync(output+'-outer'),'output already exists');
 return spec;
}

export function parseArgs(argv){
 const args={};
 for(let i=0;i<argv.length;i+=2){
  requireValue(argv[i]?.startsWith('--')&&argv[i+1]&&!Object.hasOwn(args,argv[i]),'unique named arguments');
  args[argv[i]]=argv[i+1];
 }
 const names=['--root','--python','--descriptors','--descriptors-sha256','--readiness-sha256','--output','--max-advances','--out','--coordinator-sha256'];
 for(const name of ['package','continuation','accepted-parent-evidence'])if(Object.hasOwn(args,'--'+name)||Object.hasOwn(args,'--'+name+'-sha256'))names.push('--'+name,'--'+name+'-sha256');
 requireValue(Object.keys(args).sort().join('|')===names.sort().join('|'),'required arguments: '+names.join(' '));
 for(const name of names.filter(n=>n.endsWith('-sha256')))requireValue(hash(args[name]),'explicit digest required: '+name);
 requireValue(/^[1-9][0-9]*$/u.test(args['--max-advances']),'positive integer max advances');
 return args;
}
async function main(argv){
 const args=parseArgs(argv);
 const selection={root:args['--root'],coordinatorSha256:args['--coordinator-sha256']};
 const captured=await loadPreparationSources(selection),{C,identities}=captured;
 const readJSON=name=>JSON.parse(C.readBound(args['--'+name],args['--'+name+'-sha256'],true,1024**2).data);
 const descriptors=readJSON('descriptors');
 const evidencePackage=args['--package']?C.clean(C.readBound(args['--package'],args['--package-sha256'],false,C.FILE)):null;
 const spec=prepareCaptured({...selection,python:args['--python'],descriptors,readinessSha256:args['--readiness-sha256'],output:args['--output'],maxAdvances:Number(args['--max-advances']),evidencePackage,continuation:args['--continuation']?readJSON('continuation'):null,acceptedParentEvidence:args['--accepted-parent-evidence']?readJSON('accepted-parent-evidence'):[]},captured);
 // Reuse the first admission: reacquisition would accept equal-byte replacement.
 const sources=C.validateSpec(spec,selection.coordinatorSha256);
 C.checkBindings(sources,()=>{},identities);
 const receipt=C.writeNew(args['--out'],spec);
 C.checkBindings(sources,()=>{},identities);
 console.log(JSON.stringify({spec:receipt,selfSha256:spec.bindings.coordinator.sha256,sourceCount:Object.keys(spec.bindings).length,runtimeCount:spec.runtimeBindings.length,maxAdvances:spec.maxAdvances,numericalCalls:0,independentlyAdmitted:false}));
}
if(import.meta.url.startsWith('file:')&&process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))
 main(process.argv.slice(2)).catch(error=>{console.error(JSON.stringify({completed:false,accepted:false,code:error.code??'F6C_STREAMED_PREPARATION_REJECTED',failure:error.message,numericalCalls:0}));process.exitCode=1;});
