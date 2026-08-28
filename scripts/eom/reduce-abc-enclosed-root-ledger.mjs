import {createHash} from "node:crypto";
import {existsSync,readFileSync,realpathSync,writeFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {Worker} from "node:worker_threads";

const REDUCER="src/prescribed-path-analysis/ABCEnclosedRootLedgerReducer.mjs";
const SELF="scripts/eom/reduce-abc-enclosed-root-ledger.mjs";
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

export async function runCapturedABCLedger(snapshot,progress) {
  const cliBytes=Buffer.from(snapshot.cliBytes),reducerBytes=Buffer.from(snapshot.reducerBytes);
  if(import.meta.url!==`data:text/javascript;base64,${cliBytes.toString("base64")}`||sha(cliBytes)!==snapshot.cliSha256||sha(reducerBytes)!==snapshot.reducerSha256)throw new Error("ledger execution snapshot mismatch");
  const module=await import(`data:text/javascript;base64,${reducerBytes.toString("base64")}`);
  return snapshot.scope?module.reduceABCSummarySnapshot(snapshot,progress):module.reduceABCPhaseSnapshot(snapshot,progress);
}

async function main() {
  const args=argumentsFor(process.argv.slice(2));if(existsSync(args.output))throw new Error("output already exists; use a fresh path");
  const self=fileURLToPath(import.meta.url);if(realpathSync(path.join(args.repoRoot,SELF))!==realpathSync(self))throw new Error("repository root differs from CLI owner");
  const cliBytes=readFileSync(self),reducerBytes=readFileSync(path.join(args.repoRoot,REDUCER));
  const snapshot={repoRoot:args.repoRoot,scope:args.scope,phaseReceipts:args.phaseReceipts,rowsFile:args.rowsFile,
    options:args.scope?undefined:Object.fromEntries(["repoRoot","historyManifest","conformance","conformanceSha256","buildReceipt","buildReceiptSha256"].map(field=>[field,args[field]])),
    cliBytes,reducerBytes,cliSha256:sha(cliBytes),reducerSha256:sha(reducerBytes)};
  const began=performance.now();let progress={stage:"started"};console.log(JSON.stringify({...progress,heartbeatSeconds:15,limitSeconds:1800}));
  const worker=new Worker(`const{parentPort,workerData}=require("node:worker_threads");(async()=>{const b=Buffer.from(workerData.cliBytes);const cli=await import("data:text/javascript;base64,"+b.toString("base64"));const result=await cli.runCapturedABCLedger(workerData,event=>parentPort.postMessage({event}));parentPort.postMessage({result});})().catch(error=>{parentPort.postMessage({failure:String(error.message)});process.exitCode=1;});`,{eval:true,workerData:snapshot});
  let heartbeat,deadline,result;
  try {result=await new Promise(resolve=>{let settled=false;const finish=value=>{if(!settled){settled=true;resolve(value);}};
    const reject=message=>finish({schema:"braid-program/abc-ledger-rejection.v1",accepted:false,h3EvidenceEligible:false,failure:message});
    heartbeat=setInterval(()=>console.log(JSON.stringify({...progress,elapsedWallSeconds:(performance.now()-began)/1000})),15000);
    deadline=setTimeout(()=>{reject("1800-second ledger deadline reached");void worker.terminate();},1800000);
    worker.on("message",message=>{if(message.event)progress=message.event;else if(message.result)finish(message.result);else if(message.failure)reject(message.failure);});
    worker.on("error",error=>reject(error.message));worker.on("exit",code=>{if(!settled)reject(`ledger worker exited without receipt (${code})`);});
  });await worker.terminate();
    if(performance.now()-began>=1800000)result={schema:"braid-program/abc-ledger-rejection.v1",accepted:false,h3EvidenceEligible:false,failure:"1800-second end-to-end ledger deadline reached"};
    result.elapsedWallSeconds=(performance.now()-began)/1000;
    writeFileSync(args.output,JSON.stringify(result)+"\n",{flag:"wx"});
    console.log(JSON.stringify({accepted:result.accepted,h3EvidenceEligible:false,scope:result.scope??"phase",rowCount:result.rowCount??0,output:args.output}));
    if(!result.accepted)process.exitCode=1;
  }finally{clearInterval(heartbeat);clearTimeout(deadline);await worker.terminate();}
}
if(import.meta.url.startsWith("file:")&&process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url)))main().catch(error=>{console.error(error.message);process.exitCode=1;});
