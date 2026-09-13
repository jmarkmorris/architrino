// Operational selection only. Scientific and historical applicability stays in
// each F5 owner. The map digest is supplied by the caller, never derived here.
import {createHash} from 'node:crypto';
import {closeSync,constants,fstatSync,lstatSync,openSync,readSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {registerHooks,isBuiltin} from 'node:module';
import {pathToFileURL,fileURLToPath} from 'node:url';
export const SOURCE_MAP='reference/priorities/development-process-review/contracts/option-b-f5-operational-sources.jsonld';
export const READER='scripts/equation-mapping/current-source-manifest.mjs';
export const SELF='scripts/eom/f5-current-source-admission.mjs';
export const SCOPE='f5-current-execution-build';
export const ROLES=Object.freeze({
 [SELF]:'admission',[READER]:'manifest-reader',
 'scripts/eom/launch-f5-prehistory-handoff-build.mjs':'launcher',
 'scripts/eom/prepare-f5-enclosed-root-build.mjs':'current-source',
 'scripts/eom/prepare-f5-prehistory-handoff-build.mjs':'current-source',
 'scripts/eom/prepare-f5-enclosed-root.mjs':'current-source',
 'scripts/eom/run-f5-enclosed-root.mjs':'current-source',
 'scripts/eom/run-current-f5-enclosed-root.mjs':'current-source',
 'scripts/eom/execute-f5-prehistory-handoff.py':'current-source',
 'scripts/eom/run-f5-current-handoff.mjs':'current-source',
 'scripts/eom/prepare-f5-original-input-tree.mjs':'current-source',
 'scripts/eom/prepare-subfield-circular-root.mjs':'current-source',
 'scripts/eom/launch-subfield-circular-root-pilot.mjs':'current-source',
 'scripts/dev/owned-compute-supervisor.mjs':'current-source',
 'tests/option-b-f5-admission.test.mjs':'current-source',
});
export const EVOLUTION_MAP='reference/priorities/development-process-review/contracts/option-b-f5-evolution-sources.jsonld';
export const BUDGET_IDENTITY_SOURCES=Object.freeze([
 'src/apps/borg/data/certified-budget-identities.v1.json',
 'src/apps/borg/BorgCertifiedBudgetIdentityContract.js',
 'content/generated/borg/certified-budget-identities.v1.js',
 'scripts/borg/build-certified-budget-identities.mjs',
]);
export const EVOLUTION_ROLES=Object.freeze({
  "scripts/eom/f5-current-source-admission.mjs": "admission",
  "scripts/equation-mapping/current-source-manifest.mjs": "manifest-reader",
  "scripts/eom/run-f5-complete-evaluator-batch.mjs": "launcher",
  "scripts/eom/run-f5-ordinary-evolution.mjs": "current-source",
  "scripts/eom/f5-batch-admission.mjs": "current-source",
  "scripts/eom/f5-registered-stage-gate.mjs": "current-source",
  "scripts/eom/launch-prescribed-response-pilot.mjs": "current-source",
  "scripts/eom/launch-subfield-circular-root-pilot.mjs": "current-source",
  "scripts/eom/prepare-ordinary-evolution-request.mjs": "scientific-contract",
  "scripts/eom/BorgNativeEomProcessClient.mjs": "scientific-contract",
  "src/apps/borg/BorgCertifiedBudgets.js": "scientific-contract",
  ...Object.fromEntries(BUDGET_IDENTITY_SOURCES.map(p=>[p,'scientific-contract'])),
  "src/apps/borg/BorgDisplayHostMemoryEnvelope.js": "scientific-contract",
  "src/apps/borg/BorgCausalHistoryRetention.js": "scientific-contract",
  "src/apps/borg/BorgEomWakeBoundaryProducts.js": "scientific-contract",
  "tests/option-b-f5-evolution-admission.test.mjs": "current-source"
});
const demand=(ok,why)=>{if(!ok)throw Error(why);};
export const hash=h=>typeof h==='string'&&/^[a-f0-9]{64}$/u.test(h);
export const clean=({data,identity,...b})=>b;
const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].join(':');
export function capture(filename,expected,collect=false){
 demand(path.isAbsolute(filename)&&path.resolve(filename)===filename&&realpathSync(filename)===filename,'canonical F5 source path required');
 demand(expected===undefined||hash(expected),'explicit F5 source digest required');
 const fd=openSync(filename,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
 try{
  const before=fstatSync(fd,{bigint:true});demand(before.isFile()&&before.size>0n&&before.size<=1024n**2n,'bounded F5 authored source');
  const digest=createHash('sha256'),parts=[],buffer=Buffer.alloc(65536);let at=0;
  while(at<Number(before.size)){const n=readSync(fd,buffer,0,Math.min(buffer.length,Number(before.size)-at),at);demand(n>0,'truncated F5 source');at+=n;digest.update(buffer.subarray(0,n));if(collect)parts.push(Buffer.from(buffer.subarray(0,n)));}
  const sha256=digest.digest('hex');
  demand((expected===undefined||sha256===expected)&&identity(before)===identity(fstatSync(fd,{bigint:true}))&&identity(before)===identity(lstatSync(filename,{bigint:true}))&&realpathSync(filename)===filename,'F5 source digest/original identity changed: '+filename);
  return {path:filename,sha256,bytes:at,identity:identity(before),...(collect?{data:Buffer.concat(parts)}:{})};
 }finally{closeSync(fd);}
}
export function selectedArgs(argv){
 demand(Array.isArray(argv)&&argv.length%2===0,'named F5 argument pairs required');
 const args=[];let sourceMapSha256;
 for(let i=0;i<argv.length;i+=2){
  if(argv[i]==='--source-map-sha256'){demand(sourceMapSha256===undefined&&hash(argv[i+1]),'one explicit F5 source-map digest required');sourceMapSha256=argv[i+1];}
  else args.push(argv[i],argv[i+1]);
 }
 demand(hash(sourceMapSha256),'externally selected F5 source-map digest required');
 return {args,sourceMapSha256};
}
export async function admitF5Sources(root,expectedMapDigest,originalIdentities={},profile='build'){
 demand(originalIdentities&&typeof originalIdentities==='object'&&!Array.isArray(originalIdentities),'original F5 identity object required');
 demand(profile==='build'||profile==='evolution','unknown F5 operational profile');
 const selectedMap=profile==='build'?SOURCE_MAP:EVOLUTION_MAP,selectedRoles=profile==='build'?ROLES:EVOLUTION_ROLES,scope=profile==='build'?SCOPE:'f5-ordinary-evolution-operation';
 demand(hash(expectedMapDigest),'externally selected F5 source-map digest required');
 demand(path.isAbsolute(root)&&realpathSync(root)===root,'canonical F5 root required');
 const captured=new Map();
 const read=(p,h,collect=false)=>{
  const b=capture(p,h,collect),old=captured.get(p);
  demand(!Object.hasOwn(originalIdentities,p)||originalIdentities[p]===b.identity,'F5 original source identity changed: '+p);
  demand(!old||(old.sha256===b.sha256&&old.identity===b.identity),'F5 original source identity changed: '+p);
  captured.set(p,old?.data&&!collect?old:b);return b;
 };
 const map=read(path.join(root,selectedMap),expectedMapDigest,true);
 // Lookup only; the captured reader below owns strict parsing and graph checks.
 const metadata=JSON.parse(map.data),readers=metadata['@graph']?.filter(r=>r.role==='manifest-reader'&&r.binding?.path===READER);
 demand(readers?.length===1&&hash(readers[0].binding.sha256),'exact F5 manifest reader selection required');
 const reader=read(path.join(root,READER),readers[0].binding.sha256,true);
 const M=await import('data:text/javascript;base64,'+reader.data.toString('base64'));
 const admitted=M.admit(map.data,{root,readBound:read,scope});
 const rows=admitted.document['@graph'].filter(r=>r['@type']==='Source');
 demand(rows.length===Object.keys(selectedRoles).length&&rows.every(r=>selectedRoles[r.binding.path]===r.role),'exact F5 operational source/role census required');
 const sources=Object.freeze([...captured.values()].map(clean));
 const recheck=()=>{for(const b of captured.values())read(b.path,b.sha256);};
 const source=p=>{const b=captured.get(path.join(root,p));demand(b,'F5 source outside admitted closure: '+p);return clean(b);};
 const bytes=p=>{const b=source(p);return read(b.path,b.sha256,true).data;};
 const importModule=async relative=>{
  const selected=source(relative),query='?f5-selected='+expectedMapDigest;
  recheck();
  const hook=registerHooks({
   resolve(specifier,context,next){
    if(isBuiltin(specifier))return next(specifier,context);
    if(context.parentURL?.endsWith(query)){
     demand(specifier.startsWith('.')||specifier.startsWith('file:'),'unselected F5 package import');
     const url=new URL(specifier,context.parentURL);url.search='';
     demand(captured.has(fileURLToPath(url)),'F5 import outside selected closure');
     return {url:url.href+query,shortCircuit:true};
    }
    return next(specifier,context);
   },
   load(url,context,next){
    if(url.endsWith(query)){
     const filename=fileURLToPath(url),record=captured.get(filename);
     demand(record,'F5 module outside captured closure');
     return {format:'module',source:bytes(path.relative(root,filename)),shortCircuit:true};
    }
    return next(url,context);
   }
  });
  try{const M=await import(pathToFileURL(selected.path).href+query);recheck();return M;}
  finally{hook.deregister();}
 };
 const requireBindings=bindings=>{
  demand(Array.isArray(bindings),'F5 declaration operational bindings required');recheck();
  for(const b of sources){const rows=bindings.filter(r=>typeof r.path==='string'&&path.resolve(root,r.path)===b.path);
   demand(rows.length===1&&rows[0].sha256===b.sha256&&rows[0].bytes===b.bytes,'F5 independently bound operational selection differs: '+b.path);}
 };
 const invocation=(relative,args)=>{
  demand(profile==='evolution'&&['scripts/eom/run-f5-ordinary-evolution.mjs','scripts/eom/f5-registered-stage-gate.mjs'].includes(relative),'unsupported F5 captured child');
  demand(Array.isArray(args)&&args.every(a=>typeof a==='string'),'F5 child argument vector');recheck();
  const payload={root,digest:expectedMapDigest,identities:Object.fromEntries([...captured.values()].map(b=>[b.path,b.identity])),helper:bytes(SELF).toString('base64'),entry:relative,args};
  const code="const d=JSON.parse(Buffer.from(process.argv[1],'base64'));const m=await import('data:text/javascript;base64,'+d.helper);const a=await m.admitF5Sources(d.root,d.digest,d.identities,'evolution');process.execArgv=[];process.argv=[process.execPath,d.root+'/'+d.entry,...d.args];const entry=await a.importModule(d.entry);a.recheck();await entry.main(d.args,null,a);a.recheck();";
  return ['--input-type=module','-e',code,Buffer.from(JSON.stringify(payload)).toString('base64')];
 };
 if(profile==='evolution'){
  // Authored expectation data and its exact projection are part of the selected
  // scientific contract, not an operational hash-refresh allowance. Import only
  // the captured inert renderer; never run its CLI or regenerate during admission.
  const generator=await importModule('scripts/borg/build-certified-budget-identities.mjs');
  demand(typeof generator.renderBorgCertifiedBudgetIdentities==='function','captured F5 budget renderer required');
  const authored=new TextDecoder('utf-8',{fatal:true}).decode(bytes('src/apps/borg/data/certified-budget-identities.v1.json'));
  const rendered=generator.renderBorgCertifiedBudgetIdentities(authored);
  demand(typeof rendered==='string'&&Buffer.from(rendered).equals(bytes('content/generated/borg/certified-budget-identities.v1.js')),'F5 budget identity projection differs from captured authored data');
 }
 recheck();
 return {requireBindings,invocation,root,sourceMap:clean(map),sources,source,bytes,recheck,importModule,identities:Object.fromEntries([...captured.values()].map(b=>[b.path,b.identity])),
  pins:Object.freeze(Object.fromEntries(rows.map(r=>[r.binding.path,r.binding.sha256])))};
}
