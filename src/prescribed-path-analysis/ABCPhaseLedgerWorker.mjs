// Subject-side scheduling bridge. Scientific acceptance belongs to a fresh
// invocation of the independently authored, frozen phase-ledger CLI.
import { createHash } from "node:crypto";
import { Worker } from "node:worker_threads";

const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const LOADER = String.raw`
const {parentPort,workerData}=require("node:worker_threads");
const {createHash}=require("node:crypto");
(async()=>{
  const bytes=Buffer.from(workerData.reducerBytes);
  if(createHash("sha256").update(bytes).digest("hex")!==workerData.reducerSha256) throw Error("captured ledger hash differs");
  const ledger=await import("data:text/javascript;base64,"+bytes.toString("base64"));
  const context=await ledger.prepareABCPhaseLedgerContext(workerData.options,event=>parentPort.postMessage({event}));
  parentPort.postMessage({id:0,ready:true,identity:{candidateId:context.manifest.candidateId,
    rung:context.rung,phase:context.phase,manifestId:context.manifestId,
    historyManifestSha256:ledger.abcSha256(context.manifestBytes),conformanceSha256:context.options.conformanceSha256,
    members:context.manifest.members.map(({segments,...member})=>member)}});
  let next=1;
  parentPort.on("message",message=>{
    try {
      if(message.id!==next++) throw Error("ledger worker request sequence differs");
      if(message.type==="row") {
        const result=context.checkRowBytes(Buffer.from(message.bytes));
        if(result.rowConformant!==true||result.accepted!==false||result.h3EvidenceEligible!==false) throw Error("invalid scheduling result");
        parentPort.postMessage({id:message.id,rowConformant:true,checkedRows:context.checkedRows()});
      } else if(message.type==="recheck") {
        context.recheck();parentPort.postMessage({id:message.id,rechecked:true,checkedRows:context.checkedRows()});
      } else throw Error("unknown ledger worker request");
    } catch(error) {parentPort.postMessage({failure:String(error.message)});parentPort.close();}
  });
})().catch(error=>{parentPort.postMessage({failure:String(error.message)});parentPort.close();});
`;

export async function openABCPhaseLedgerWorker({ reducerBytes, reducerSha256, options,
  limitMs = 1800000, progress = () => {}, signal }) {
  if (!(reducerBytes instanceof Uint8Array) || sha(reducerBytes) !== reducerSha256 ||
      !Number.isSafeInteger(limitMs) || limitMs <= 0 || typeof progress !== "function") {
    throw new Error("captured ledger bytes and positive deadline required");
  }
  // The loader is deliberately CommonJS. Do not inherit --input-type=module,
  // preload modules, or other caller CLI hooks into this captured execution.
  const worker = new Worker(LOADER, { eval: true, execArgv: [],
    workerData: { reducerBytes, reducerSha256, options } });
  const began = performance.now();
  let next = 1, pending, stopped = false, terminalError, timer, closePromise, onAbort;
  const stop = (reason = new Error("ledger worker closed")) => {
    terminalError ??= reason; stopped = true; clearTimeout(timer);
    if (onAbort) signal?.removeEventListener("abort", onAbort);
    if (pending) { const reject = pending.reject; pending = null; reject(terminalError); }
    closePromise ??= worker.terminate();
    return closePromise;
  };
  const receive = message => {
    if (stopped) return;
    if (message.event) { try { progress(message.event); } catch (error) { void stop(error); } return; }
    if (message.failure) { void stop(new Error(message.failure)); return; }
    if (!pending || message.id !== pending.id) { void stop(new Error("unexpected ledger worker response")); return; }
    const resolve = pending.resolve; pending = null; resolve(message);
  };
  worker.on("message", receive);
  worker.on("error", error => { void stop(error); });
  worker.on("exit", code => { if (!stopped) void stop(new Error(`ledger worker exited unexpectedly (${code})`)); });
  timer = setTimeout(() => { void stop(new Error("ledger worker wall deadline exceeded")); }, limitMs);
  onAbort = () => { void stop(signal.reason ?? new Error("ledger worker interrupted")); };
  signal?.addEventListener("abort", onAbort, { once: true });
  if (signal?.aborted) onAbort();
  const waitFor = (id, send) => new Promise((resolve, reject) => {
    if (stopped || performance.now() - began >= limitMs) { reject(terminalError ?? new Error("ledger worker deadline reached")); return; }
    if (pending) { reject(new Error("concurrent ledger requests forbidden")); return; }
    pending = { id, resolve, reject };
    if (send) { try { worker.postMessage(send); } catch (error) { void stop(error); } }
  });
  let ready;
  try { ready = await waitFor(0); if (ready.ready !== true || !ready.identity) throw new Error("ledger worker not ready"); }
  catch (error) { await stop(error); throw error; }
  return {
    identity: structuredClone(ready.identity),
    async checkRowBytes(bytes, { signal } = {}) {
      if (signal?.aborted) throw signal.reason ?? new Error("row check aborted");
      const abort = () => { void stop(signal.reason ?? new Error("row check aborted")); };
      signal?.addEventListener("abort", abort, { once: true });
      try {
        const id = next++, result = await waitFor(id, { id, type: "row", bytes: Buffer.from(bytes) });
        if (result.rowConformant !== true || result.checkedRows !== id) throw new Error("row checker census mismatch");
        return true;
      } finally { signal?.removeEventListener("abort", abort); }
    },
    async recheck(expectedRows) {
      const id = next++, result = await waitFor(id, { id, type: "recheck" });
      if (result.rechecked !== true || result.checkedRows !== expectedRows) throw new Error("final scheduling census mismatch");
    },
    close: () => stop(),
  };
}
