// Data-only preparer for the reviewed streamed caller. Never starts numerics.
import {spawnSync} from 'node:child_process';
import {existsSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as C from './run-f6c-streamed-leaf-diagnostic.mjs';

const requireValue=(ok,message)=>{if(!ok)throw Error(message);};
export function prepare({root,python,descriptors,readinessSha256,output,maxAdvances,evidencePackage=null,acceptedParentEvidence=[],continuation=null}) {
  root=realpathSync(root);
  python=path.resolve(python);
  const bind=p=>C.clean(C.readBound(p));
  const bindings={coordinator:bind(path.join(root,C.SELF)),controls:bind(path.join(root,C.CONTROL))};
  for(const [role,[p,h]] of Object.entries(C.PINS)) {
    const b=bind(path.join(root,p));
    requireValue(b.sha256===(role==='readiness'?readinessSha256:h),'changed reviewed '+role);
    bindings[role]=b;
  }
  requireValue(Array.isArray(descriptors),'explicit descriptor array');
  const parentRefinements=structuredClone(descriptors);
  for(const d of parentRefinements) {
    requireValue(d.closure.owner.sha256===readinessSha256,'descriptor must bind current owner explicitly');
  }
  const inventory=spawnSync(python,['-I','-B','-c',C.PYTHON_RUNTIME_INVENTORY],{encoding:'utf8',timeout:10000,maxBuffer:1024**2});
  requireValue(inventory.status===0,'Python runtime discovery failed: '+inventory.stderr);
  const runtimePaths=[...JSON.parse(inventory.stdout),path.join(path.dirname(path.dirname(python)),'pyvenv.cfg'),'/usr/bin/git',realpathSync(process.execPath),'/bin/ps','/usr/bin/memory_pressure'];
  const runtimeBindings=[...new Set(runtimePaths)].sort().map(bind);
  const packageSelection=evidencePackage===null?null:{package:structuredClone(evidencePackage),...Object.fromEntries(Object.entries(C.PACKAGE_PINS).map(([role,[p,h]])=>{const b=bind(path.join(root,p));requireValue(b.sha256===h,'fixed package '+role);return[role,b];}))};
  const spec={schema:'braid-program/f6c-streamed-leaf-invocation.v4',scope:C.SCOPE,root,output,python,git:'/usr/bin/git',bindings,runtimeBindings,parentRefinements,evidencePackage:packageSelection,acceptedParentEvidence:structuredClone(acceptedParentEvidence),continuation:structuredClone(continuation),maxAdvances,limits:C.LIMITS};
  spec.continuation=C.prepareContinuation(spec);
  const sources=C.validateSpec(spec,bindings.coordinator.sha256);
  C.checkBindings(sources);
  requireValue(!existsSync(output)&&!existsSync(output+'-outer'),'output already exists');
  return spec;
}

function main(argv) {
  const args={};
  for(let i=0;i<argv.length;i+=2) {
    requireValue(argv[i]?.startsWith('--')&&argv[i+1]&&!Object.hasOwn(args,argv[i]),'unique named arguments');
    args[argv[i]]=argv[i+1];
  }
  const names=['--root','--python','--descriptors','--descriptors-sha256','--readiness-sha256','--output','--max-advances','--out'];
  if(Object.hasOwn(args,'--package')||Object.hasOwn(args,'--package-sha256'))names.push('--package','--package-sha256');
  if(Object.hasOwn(args,'--continuation')||Object.hasOwn(args,'--continuation-sha256'))names.push('--continuation','--continuation-sha256');
  if(Object.hasOwn(args,'--accepted-parent-evidence')||Object.hasOwn(args,'--accepted-parent-evidence-sha256'))names.push('--accepted-parent-evidence','--accepted-parent-evidence-sha256');
  requireValue(Object.keys(args).sort().join('|')===names.sort().join('|'),'required arguments: '+names.join(' '));
  const descriptor=C.readBound(args['--descriptors'],args['--descriptors-sha256'],true,1024**2);
  const descriptors=JSON.parse(descriptor.data.toString());
  requireValue(/^[1-9][0-9]*$/u.test(args['--max-advances']),'positive integer max advances');
  const evidencePackage=args['--package']?C.clean(C.readBound(args['--package'],args['--package-sha256'],false,C.FILE)):null;
  const continuation=args['--continuation']?JSON.parse(C.readBound(args['--continuation'],args['--continuation-sha256'],true,1024**2).data.toString()):null;
  const acceptedParentEvidence=args['--accepted-parent-evidence']?JSON.parse(C.readBound(args['--accepted-parent-evidence'],args['--accepted-parent-evidence-sha256'],true,1024**2).data.toString()):[];
  const spec=prepare({root:args['--root'],python:args['--python'],descriptors,readinessSha256:args['--readiness-sha256'],output:args['--output'],maxAdvances:Number(args['--max-advances']),evidencePackage,acceptedParentEvidence,continuation});
  // Publication is write-once. The exact specification still needs independent admission.
  const receipt=C.writeNew(args['--out'],spec);
  console.log(JSON.stringify({spec:receipt,selfSha256:spec.bindings.coordinator.sha256,sourceCount:Object.keys(spec.bindings).length,runtimeCount:spec.runtimeBindings.length,maxAdvances:spec.maxAdvances,numericalCalls:0,independentlyAdmitted:false}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2));
