import {createHash} from "node:crypto";
import {existsSync,readFileSync,realpathSync,writeFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {Worker} from "node:worker_threads";

const REDUCER="src/prescribed-path-analysis/SubfieldCircularRootLedgerReducer.mjs";
const SELF="scripts/eom/reduce-subfield-circular-root-ledger.mjs";
const sha=bytes=>createHash("sha256").update(bytes).digest("hex");
function argumentsFor(argv) {
  const values={repoRoot:process.cwd(),phaseReceipts:[]},seen=new Set();
  const fields={"--repo-root":"repoRoot","--history-manifest":"historyManifest","--conformance":"conformance","--conformance-sha256":"conformanceSha256","--rows":"rowsFile","--build-receipt":"buildReceipt","--build-receipt-sha256":"buildReceiptSha256","--out":"output","--scope":"scope"};
  for(let at=0;at<argv.length;at++) {
    const flag=argv[at],value=argv[++at];if(value===undefined||value.startsWith("--"))throw new Error(`incomplete argument ${flag}`);
    if(flag==="--phase-receipt") {const hashFlag=argv[++at],hash=argv[++at];if(hashFlag!=="--phase-receipt-sha256"||!hash||!/^[0-9a-f]{64}$/u.test(hash))throw new Error("each phase receipt needs its SHA-256 immediately after its path");values.phaseReceipts.push({path:path.resolve(value),sha256:hash});continue;}
    if(!fields[flag]||seen.has(flag))throw new Error(`unknown or duplicate argument ${flag}`);seen.add(flag);values[fields[flag]]=value;
  }
  if(!values.output)throw new Error("--out NEW is required");values.repoRoot=path.resolve(values.repoRoot);values.output=path.resolve(values.output);
  if(values.scope) {if(!values.phaseReceipts.length||["historyManifest","conformance","rowsFile","buildReceipt","conformanceSha256","buildReceiptSha256"].some(field=>values[field]))throw new Error("summary mode requires only --scope and authenticated --phase-receipt entries");}
  else {if(values.phaseReceipts.length)throw new Error("phase receipts require --scope");for(const field of ["historyManifest","conformance","rowsFile","buildReceipt","conformanceSha256","buildReceiptSha256"])if(!values[field])throw new Error(`phase mode needs ${field}`);
    for(const field of ["historyManifest","conformance","rowsFile","buildReceipt"])values[field]=path.resolve(values[field]);
    for(const field of ["conformanceSha256","buildReceiptSha256"])if(!/^[0-9a-f]{64}$/u.test(values[field]))throw new Error(`${field} is not a SHA-256`);}
  return values;
}

export async function runCapturedSubfieldCircularLedger(snapshot,progress) {
  const cliBytes=Buffer.from(snapshot.cliBytes),reducerBytes=Buffer.from(snapshot.reducerBytes);
  if(import.meta.url!==`data:text/javascript;base64,${cliBytes.toString("base64")}`||sha(cliBytes)!==snapshot.cliSha256||sha(reducerBytes)!==snapshot.reducerSha256)throw new Error("ledger execution snapshot mismatch");
  const module=await import(`data:text/javascript;base64,${reducerBytes.toString("base64")}`);
  module.initializeProductionIdentities(snapshot.production.identities,snapshot.production.protectedSources,snapshot.production.currentSources);
  return snapshot.scope?module.reduceSubfieldCircularSummarySnapshot(snapshot,progress):module.reduceSubfieldCircularPhaseSnapshot(snapshot,progress);
}

async function main() {
  const args=argumentsFor(process.argv.slice(2));if(existsSync(args.output))throw new Error("output already exists; use a fresh path");
  const self=fileURLToPath(import.meta.url);if(realpathSync(path.join(args.repoRoot,SELF))!==realpathSync(self))throw new Error("repository root differs from CLI owner");
  const admission=await captureProductionAdmission(args.repoRoot,SELF);
  const cliBytes=Buffer.from(admission.sourcePair(SELF).current),reducerBytes=Buffer.from(admission.sourcePair(REDUCER).current);
  const reducer=await import('data:text/javascript;base64,'+reducerBytes.toString('base64'));
  const owner={productionSourcePair:(target,digest)=>{const pair=admission.sourcePair(target);if(sha(Buffer.from(pair.original))!==digest)throw Error('Exact default original proof required');return pair;},productionIdentities:target=>admission.identities(target),productionOriginalSourceBinding:(target,digest)=>admission.originalSourceBinding(target,digest)};
  let buildReceipt=args.buildReceipt,buildReceiptSha256=args.buildReceiptSha256;
  if(args.scope){const first=args.phaseReceipts[0],raw=readFileSync(first.path);if(sha(raw)!==first.sha256)throw Error('First phase receipt identity differs');const phase=JSON.parse(raw);buildReceipt=phase.buildReceipt.path;buildReceiptSha256=phase.buildReceipt.sha256;}
  const production=reducer.captureSubfieldCircularReducerProduction(owner,args.repoRoot,buildReceipt,buildReceiptSha256);
  admission.check();
  const snapshot={repoRoot:args.repoRoot,scope:args.scope,phaseReceipts:args.phaseReceipts,rowsFile:args.rowsFile,
    options:args.scope?undefined:Object.fromEntries(["repoRoot","historyManifest","conformance","conformanceSha256","buildReceipt","buildReceiptSha256"].map(field=>[field,args[field]])),
    production,cliBytes,reducerBytes,cliSha256:sha(cliBytes),reducerSha256:sha(reducerBytes)};
  const began=performance.now();let progress={stage:"started"};console.log(JSON.stringify({...progress,heartbeatSeconds:15,limitSeconds:1800}));
  const worker=new Worker(`const{parentPort,workerData}=require("node:worker_threads");(async()=>{const b=Buffer.from(workerData.cliBytes);const cli=await import("data:text/javascript;base64,"+b.toString("base64"));const result=await cli.runCapturedSubfieldCircularLedger(workerData,event=>parentPort.postMessage({event}));parentPort.postMessage({result});})().catch(error=>{parentPort.postMessage({failure:String(error.message)});process.exitCode=1;});`,{eval:true,execArgv:[],workerData:snapshot});
  let heartbeat,deadline,result;
  try {result=await new Promise(resolve=>{let settled=false;const finish=value=>{if(!settled){settled=true;resolve(value);}};
    const reject=message=>finish({schema:"braid-program/subfieldCircular-ledger-rejection.v1",accepted:false,h3EvidenceEligible:false,failure:message});
    heartbeat=setInterval(()=>console.log(JSON.stringify({...progress,elapsedWallSeconds:(performance.now()-began)/1000})),15000);
    deadline=setTimeout(()=>{reject("1800-second ledger deadline reached");void worker.terminate();},1800000);
    worker.on("message",message=>{if(message.event)progress=message.event;else if(message.result)finish(message.result);else if(message.failure)reject(message.failure);});
    worker.on("error",error=>reject(error.message));worker.on("exit",code=>{if(!settled)reject(`ledger worker exited without receipt (${code})`);});
  });await worker.terminate();
    if(performance.now()-began>=1800000)result={schema:"braid-program/subfieldCircular-ledger-rejection.v1",accepted:false,h3EvidenceEligible:false,failure:"1800-second end-to-end ledger deadline reached"};
    result.elapsedWallSeconds=(performance.now()-began)/1000;
    admission.check();
    writeFileSync(args.output,JSON.stringify(result)+"\n",{flag:"wx"});
    admission.check();
    console.log(JSON.stringify({accepted:result.accepted,h3EvidenceEligible:false,scope:result.scope??"phase",rowCount:result.rowCount??0,output:args.output}));
    if(!result.accepted)process.exitCode=1;
  }finally{clearInterval(heartbeat);clearTimeout(deadline);await worker.terminate();}
}
if(import.meta.url.startsWith("file:")&&process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url)))main().catch(error=>{console.error(error.message);process.exitCode=1;});

async function captureProductionAdmission(root,consumer) {
  const fs=await import('node:fs'),p=await import('node:path'),u=await import('node:url'),m=await import('node:module'),crypto=await import('node:crypto');
  const digest=b=>crypto.createHash('sha256').update(b).digest('hex'),retained=new Map();
  const identity=s=>[s.dev,s.ino,s.size,s.mtimeNs,s.ctimeNs].map(String);
  const capture=(relative,expected)=>{
    if(typeof relative!=='string'||p.isAbsolute(relative)||relative.split(/[\\/]/u).some(x=>!x||x==='.'||x==='..'))throw Error('Canonical bootstrap relative path required');
    const file=p.join(root,relative);if(fs.realpathSync(file)!==file)throw Error('Canonical bootstrap file required');
    const fd=fs.openSync(file,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW|fs.constants.O_NONBLOCK);
    try{const before=fs.fstatSync(fd,{bigint:true});if(!before.isFile()||before.size>1048576n)throw Error('Bounded regular bootstrap file required');const bytes=fs.readFileSync(fd),key=identity(before);if(BigInt(bytes.length)!==before.size||JSON.stringify(identity(fs.fstatSync(fd,{bigint:true})))!==JSON.stringify(key)||JSON.stringify(identity(fs.lstatSync(file,{bigint:true})))!==JSON.stringify(key))throw Error('Bootstrap changed during capture');if(expected&&digest(bytes)!==expected)throw Error('Authenticated bootstrap bytes differ');const old=retained.get(relative);if(old&&(old.sha256!==digest(bytes)||JSON.stringify(old.identity)!==JSON.stringify(key)))throw Error('Retained bootstrap source replaced');retained.set(relative,{identity:key,sha256:digest(bytes)});return bytes;}finally{fs.closeSync(fd);}
  };
  const selection=JSON.parse(capture('reference/priorities/development-process-review/contracts/option-b-production-selection.json'));
  if(Object.keys(selection).sort().join(' ')!=='acceptedBaseline acceptedBaselineSha256 transition transitionSha256'||! /^[a-f0-9]{64}$/u.test(selection.acceptedBaselineSha256))throw Error('External production selection required');
  const accepted=JSON.parse(capture(selection.acceptedBaseline,selection.acceptedBaselineSha256));
  const profiles=accepted.profiles.filter(row=>row.name==='production-source-records');if(profiles.length!==1)throw Error('Unique accepted production bootstrap profile required');
  const moduleTag='?productionCapture='+crypto.randomUUID();
  const graph=JSON.parse(profiles[0].manifestRaw)['@graph'];const sources=new Map();
  for(const[relative,role]of [['scripts/equation-mapping/production-source-records.mjs','admission'],['scripts/equation-mapping/current-source-manifest.mjs','manifest-reader'],['scripts/equation-mapping/current-source-transition.mjs','manifest-reader']]){const rows=graph.filter(row=>row['@type']==='Source'&&row.binding?.path===relative);if(rows.length!==1||rows[0].role!==role||JSON.stringify(rows[0].binding.selector)!=='{"kind":"whole"}'||rows[0].binding.contract!=='fixed-byte-selection/v1'||! /^[a-f0-9]{64}$/u.test(rows[0].binding.sha256))throw Error('Exact protected bootstrap row required');sources.set(u.pathToFileURL(p.join(root,relative)).href+moduleTag,capture(relative,rows[0].binding.sha256).toString('utf8'));}
  const hooks=m.registerHooks({resolve(specifier,context,next){if(m.isBuiltin(specifier))return next(specifier,context);const resolved=new URL(specifier,context.parentURL);resolved.search=moduleTag;const url=resolved.href;if(!sources.has(url))throw Error('Uncaptured production bootstrap import');return{url,shortCircuit:true};},load(url,context,next){if(m.isBuiltin(url))return next(url,context);if(!sources.has(url))throw Error('Uncaptured production bootstrap source');return{format:'module',source:sources.get(url),shortCircuit:true};}});
  let admission;try{const module=await import(u.pathToFileURL(p.join(root,'scripts/equation-mapping/production-source-records.mjs')).href+moduleTag);admission=module.beginProductionAdmission({root,consumer});}finally{hooks.deregister();}
  const check=()=>{for(const[relative,row]of retained)capture(relative,row.sha256);admission.check();};check();
  return Object.freeze({...admission,check});
}
