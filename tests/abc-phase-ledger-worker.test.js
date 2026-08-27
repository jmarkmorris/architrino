import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import {openABCPhaseLedgerWorker} from "../src/prescribed-path-analysis/ABCPhaseLedgerWorker.mjs";

const mock = String.raw`
export const abcSha256=()=>"test-only";
export async function prepareABCPhaseLedgerContext(options) {
 if(options.hangPrepare) while(true){}
 let count=0;
 return {manifest:{candidateId:"test-only",members:[]},rung:2,phase:0,manifestId:"test-only",
   manifestBytes:Buffer.from("test"),options,checkedRows:()=>count,recheck(){if(options.failRecheck)throw Error("drift");},
   checkRowBytes(bytes){if(options.hangRow)while(true){}; if(bytes.toString()!=="valid")throw Error("bad row");count++;
     return {rowConformant:true,accepted:false,h3EvidenceEligible:false};}};
}`;
function open(options={},limitMs=2000,signal) {
 const reducerBytes=Buffer.from(mock),reducerSha256=createHash("sha256").update(reducerBytes).digest("hex");
 return openABCPhaseLedgerWorker({reducerBytes,reducerSha256,options,limitMs,signal});
}
test("isolated scheduling checker requires each exact row and final census",async()=>{
 const w=await open();try{assert.equal(await w.checkRowBytes(Buffer.from("valid")),true);await w.recheck(1);}finally{await w.close();}
});
test("invalid row rejects and worker closes",async()=>{
 const w=await open();try{await assert.rejects(w.checkRowBytes(Buffer.from("invalid")),/bad row/);}finally{await w.close();}
});
test("synchronous preparation cannot defeat parent deadline",async()=>{
 const start=performance.now();await assert.rejects(open({hangPrepare:true},150),/deadline/);assert.ok(performance.now()-start<1500);
});
test("operator interruption terminates a checker still preparing",async()=>{
 const controller=new AbortController(),start=performance.now();
 const pending=open({hangPrepare:true},2000,controller.signal);
 const timer=setTimeout(()=>controller.abort(new Error("operator stop during preparation")),100);
 try{await assert.rejects(pending,/operator stop during preparation/);assert.ok(performance.now()-start<1500);}
 finally{clearTimeout(timer);}
});
test("an already interrupted launch never leaves a worker waiting",async()=>{
 const controller=new AbortController();controller.abort(new Error("already stopped"));
 await assert.rejects(open({hangPrepare:true},2000,controller.signal),/already stopped/);
});
test("synchronous row checker remains interruptible",async()=>{
 const w=await open({hangRow:true});const controller=new AbortController();
 try{const pending=w.checkRowBytes(Buffer.from("valid"),{signal:controller.signal});setTimeout(()=>controller.abort(new Error("operator stop")),100);await assert.rejects(pending,/operator stop/);}finally{await w.close();}
});
test("final source recheck failure remains a rejection",async()=>{
 const w=await open({failRecheck:true});try{await assert.rejects(w.recheck(0),/drift/);}finally{await w.close();}
});
test("captured byte mismatch is refused before worker launch",async()=>{
 await assert.rejects(openABCPhaseLedgerWorker({reducerBytes:Buffer.from(mock),reducerSha256:"0".repeat(64),options:{}}),/captured/);
});
test("module-mode parent flags do not change the captured worker loader",()=>{
 const url=new URL("../src/prescribed-path-analysis/ABCPhaseLedgerWorker.mjs",import.meta.url).href;
 const source=`import {openABCPhaseLedgerWorker} from ${JSON.stringify(url)};
 import {createHash} from 'node:crypto';
 const reducerBytes=Buffer.from(${JSON.stringify(mock)});
 const reducerSha256=createHash('sha256').update(reducerBytes).digest('hex');
 const w=await openABCPhaseLedgerWorker({reducerBytes,reducerSha256,options:{}});
 try{await w.checkRowBytes(Buffer.from('valid'));await w.recheck(1);}finally{await w.close();}`;
 execFileSync(process.execPath,["--input-type=module","-e",source],{timeout:3000});
});
