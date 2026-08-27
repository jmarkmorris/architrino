// Interactive process mechanics only. Row callbacks are scheduling guards;
// a fresh independent final ledger is still required for any H3 conclusion.
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, constants, existsSync, fstatSync, fsyncSync, lstatSync,
  openSync, readSync, writeSync } from "node:fs";
import path from "node:path";

const EVENT_SCHEMA = "braid-program/abc-enclosed-root-adapter-event.v1";
const ROW_SCHEMA = "braid-program/abc-enclosed-root-row.v1";
const digest = () => createHash("sha256");
const sha = (bytes) => digest().update(bytes).digest("hex");
const decode = (bytes) => new TextDecoder("utf-8", { fatal: true }).decode(bytes);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function writeAll(fd, chunk) {
  let offset = 0;
  while (offset < chunk.length) {
    const count = writeSync(fd, chunk, offset, chunk.length - offset);
    if (!count) throw new Error("log write made no progress");
    offset += count;
  }
}

function inputContract(options) {
  const { command, args, cwd, identity, pairs, checkRowBytes } = options;
  if (typeof command !== "string" || !path.isAbsolute(command) || !Array.isArray(args) ||
      args.some((arg) => typeof arg !== "string") || typeof cwd !== "string" || !path.isAbsolute(cwd)) {
    throw new Error("absolute command/cwd and explicit argument array required");
  }
  if (!identity || typeof identity.candidateId !== "string" || !identity.candidateId ||
      ![2, 8, 32, 128].includes(identity.rung) || !Number.isSafeInteger(identity.phase) ||
      identity.phase < 0 || identity.phase >= identity.rung ||
      typeof identity.manifestId !== "string" || !identity.manifestId ||
      !/^[a-f0-9]{64}$/u.test(identity.historyManifestSha256) ||
      !/^[a-f0-9]{64}$/u.test(identity.conformanceSha256) ||
      !Array.isArray(identity.members) || !identity.members.length || identity.members.length > 12 ||
      identity.members.some((member) => typeof member.historyId !== "string" || !member.historyId ||
        typeof member.historyFingerprint !== "string" || !member.historyFingerprint) ||
      new Set(identity.members.map((member) => member.historyId)).size !== identity.members.length) {
    throw new Error("complete phase and member identity required");
  }
  if (!Array.isArray(pairs) || !pairs.length || pairs.length > identity.members.length ** 2 ||
      pairs.some((pair) => !Array.isArray(pair) || pair.length !== 2 ||
        pair.some((index) => !Number.isSafeInteger(index) || index < 0 || index >= identity.members.length)) ||
      new Set(pairs.map((pair) => pair.join("/"))).size !== pairs.length || typeof checkRowBytes !== "function") {
    throw new Error("unique in-range pair schedule and asynchronous row checker required");
  }
  const files = [options.rawRowsPath, options.stdoutLogPath, options.stderrLogPath];
  if (files.some((filename) => typeof filename !== "string" || !path.isAbsolute(filename)) ||
      new Set(files).size !== files.length) throw new Error("three distinct absolute output paths required");
  for (const filename of files) {
    try { lstatSync(filename); throw new Error(`output already exists: ${filename}`); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
}

/**
 * checkRowBytes must be a nonblocking async function resolving exactly true.
 * It receives an AbortSignal and must not block this JavaScript event loop.
 * A callback worker/subprocess remains the caller's cleanup responsibility.
 * No claim of preempting arbitrary synchronous caller code is made here.
 */
export async function runABCPhaseProcess(options) {
  inputContract(options);
  const { command, args, cwd, rawRowsPath, stdoutLogPath, stderrLogPath, checkRowBytes } = options;
  // Freeze caller-controlled scheduling data, including during async callbacks.
  const identity = structuredClone(options.identity), pairs = structuredClone(options.pairs);
  const limitMs = options.limitMs ?? 1_800_000, heartbeatMs = options.heartbeatMs ?? 15_000;
  const terminationGraceMs = options.terminationGraceMs ?? 5000;
  const maxRowBytes = options.maxRowBytes ?? 64 * 1024 * 1024;
  const maxRawBytes = options.maxRawBytes ?? 1024 * 1024 * 1024;
  const maxLogBytes = options.maxLogBytes ?? 64 * 1024 * 1024;
  if ([limitMs, heartbeatMs, terminationGraceMs, maxRowBytes, maxRawBytes, maxLogBytes]
    .some((value) => !Number.isSafeInteger(value) || value <= 0) || maxRowBytes > maxRawBytes) {
    throw new Error("positive bounded timing/output limits required");
  }
  const started = performance.now(), controller = new AbortController();
  const receipt = { schema: "braid-program/abc-phase-process.v1", status: "incomplete",
    authority: "operational-process-and-row-scheduling-only", h3EvidenceEligible: false, finalLedgerRequired: true,
    command, args: [...args], cwd, identity, expectedRows: pairs.length, pairSchedule: pairs,
    startedAt: new Date().toISOString(), limitMs, heartbeatMs, terminationGraceMs,
    maxRowBytes, maxRawBytes, maxLogBytes, dispatchedRows: 0, observedRows: 0, checkedRows: 0,
    heartbeatCount: 0, diagnosticLines: 0, rowTimings: [] };
  let stdoutFd, stderrFd, rawFd, rawIdentity, child, heartbeat, deadline, forceStop;
  let stdoutBytes = 0, stderrBytes = 0, stderrPending = Buffer.alloc(0), rawOffset = 0;
  const stdoutHash = digest(), stderrHash = digest();
  const consumedHash = digest();
  let state = "starting", membersConstructed = 0, prepared = false, stopped = false, eofSent = false;
  let active = null, failure = null, closed = false, exitStatus = null, termSent = false;
  let latestElapsed = -1, latestCounters = { completedRows: 0, passingRows: 0, failureCount: 0 };
  const waiters = new Set();
  let interrupt;
  const interrupted = new Promise((resolve) => { interrupt = resolve; });
  const pulse = () => { for (const waiter of waiters) waiter(); waiters.clear(); };
  const elapsed = () => (performance.now() - started) / 1000;

  const groupExists = () => {
    if (!child?.pid) return false;
    try { process.kill(-child.pid, 0); return true; }
    catch (error) { if (error.code === "ESRCH") return false; throw error; }
  };
  const signalGroup = (signal) => {
    if (!child?.pid) return;
    try { process.kill(-child.pid, signal); }
    catch (error) { if (error.code !== "ESRCH") receipt.signalError = error.message; }
  };
  const stopGroup = () => {
    if (termSent) return;
    termSent = true; receipt.terminationRequestedAtSeconds = elapsed();
    signalGroup("SIGTERM");
    forceStop = setTimeout(() => { receipt.sigkillRequestedAtSeconds = elapsed(); signalGroup("SIGKILL"); }, terminationGraceMs);
  };
  const fail = (message) => {
    if (!failure) {
      failure = message instanceof Error ? message : new Error(String(message));
      receipt.failure = failure.message; receipt.failureState = state;
      controller.abort(failure); interrupt(failure); pulse();
    }
    stopGroup();
  };
  const requireLive = () => {
    if (!failure && performance.now() - started >= limitMs) fail("phase wall deadline exceeded");
    if (failure) throw failure;
  };
  const until = async (predicate) => {
    while (!predicate()) { requireLive(); await new Promise((resolve) => waiters.add(resolve)); }
    requireLive();
  };
  const requestIdentity = (request, pair) => {
    const [receiver, transmitter] = pair;
    return request && request.rowId === `${identity.manifestId}/${receiver}/${transmitter}` &&
      request.receiverHistoryId === identity.members[receiver].historyId &&
      request.transmitterHistoryId === identity.members[transmitter].historyId &&
      request.receiverHistoryFingerprint === identity.members[receiver].historyFingerprint &&
      request.transmitterHistoryFingerprint === identity.members[transmitter].historyFingerprint;
  };
  const event = (value) => {
    if (failure) return;
    if (!value || value.schema !== EVENT_SCHEMA || value.h3EvidenceEligible !== false ||
        typeof value.event !== "string" || typeof value.failureCode !== "string" ||
        !Number.isFinite(value.elapsedWallSeconds) || value.elapsedWallSeconds < latestElapsed ||
        !Number.isSafeInteger(value.constructedMemberSegments) || value.constructedMemberSegments < 0 ||
        value.constructedMemberSegments > identity.members.length * 1000 ||
        ["completedRows", "passingRows", "failureCount"].some((field) => !Number.isSafeInteger(value[field]) || value[field] < 0) ||
        value.completedRows > receipt.dispatchedRows || value.passingRows > value.completedRows ||
        value.completedRows < latestCounters.completedRows || value.passingRows < latestCounters.passingRows ||
        value.failureCount < latestCounters.failureCount) throw new Error("invalid or regressing adapter event");
    latestElapsed = value.elapsedWallSeconds;
    latestCounters = { completedRows: value.completedRows, passingRows: value.passingRows, failureCount: value.failureCount };
    if (value.historyManifestSha256 !== "" && value.historyManifestSha256 !== identity.historyManifestSha256)
      throw new Error("event manifest identity mismatch");
    if (prepared && value.historyManifestSha256 !== identity.historyManifestSha256)
      throw new Error("prepared event lost manifest identity");
    if (value.event !== "heartbeat" && value.stage !== value.event) throw new Error("event stage mismatch");
    if (value.event === "failed" || value.failureCode || value.failureCount) {
      receipt.adapterFailureEvent = value; fail(`adapter failed: ${value.failureCode || "failure event"}`); return;
    }
    switch (value.event) {
      case "environment-controls-passed":
        if (state !== "starting" || membersConstructed || receipt.environmentControlsSeen) throw new Error("unexpected environment event");
        receipt.environmentControlsSeen = true; break;
      case "member-constructed": {
        const index = membersConstructed;
        if (state !== "starting" || !receipt.environmentControlsSeen || index >= identity.members.length ||
            value.detail?.memberIndex !== index || value.detail?.historyFingerprint !== identity.members[index].historyFingerprint ||
            value.detail?.strictlySubField !== true || !Number.isFinite(value.detail?.actualInflatedSpeedUpper) ||
            value.detail.actualInflatedSpeedUpper < 0 || value.detail.actualInflatedSpeedUpper >= 1 ||
            value.constructedMemberSegments !== (index + 1) * 1000) throw new Error("constructed member identity or speed mismatch");
        membersConstructed++; break;
      }
      case "prepared":
        if (state !== "starting" || prepared || membersConstructed !== identity.members.length ||
            value.detail?.manifestId !== identity.manifestId || value.detail?.conformanceSha256 !== identity.conformanceSha256 ||
            value.detail?.memberCount !== identity.members.length || value.completedRows || value.passingRows ||
            value.historyManifestSha256 !== identity.historyManifestSha256 ||
            value.constructedMemberSegments !== identity.members.length * 1000) throw new Error("prepared census or identity mismatch");
        prepared = true; state = "ready"; receipt.preparedAtSeconds = elapsed(); break;
      case "row-started":
        if (state !== "awaiting-start" || !active || !requestIdentity(value.detail, active.pair) ||
            value.completedRows !== receipt.checkedRows || value.passingRows !== receipt.checkedRows)
          throw new Error("unexpected or misidentified row-started event");
        active.request = value.detail; active.startedAtSeconds = elapsed(); state = "awaiting-complete"; break;
      case "row-complete":
        if (state !== "awaiting-complete" || !active || value.completedRows !== receipt.checkedRows + 1 ||
            value.passingRows !== receipt.checkedRows + 1) throw new Error("unexpected or incomplete row-complete event");
        active.completedAtSeconds = elapsed(); state = "validating"; break;
      case "stopped":
        if (state !== "closing" || !eofSent || receipt.checkedRows !== pairs.length || stopped ||
            value.completedRows !== pairs.length || value.passingRows !== pairs.length) throw new Error("premature or incomplete stopped event");
        stopped = true; receipt.stoppedAtSeconds = elapsed(); receipt.terminalEvent = value; break;
      case "heartbeat":
        if (stopped) throw new Error("adapter heartbeat after stopped event");
        break;
      default: throw new Error(`unknown adapter event: ${value.event}`);
    }
    pulse();
  };
  const stderrLine = (bytes, terminated = true) => {
    const text = decode(bytes).trim();
    if (!text) return;
    let value;
    try { value = JSON.parse(text); }
    catch {
      if (/^[{[]/u.test(text)) throw new Error("malformed JSON adapter event");
      receipt.diagnosticLines++; return;
    }
    if (!terminated) throw new Error("unterminated JSON adapter event");
    event(value);
  };
  const consumeStderr = (chunk) => {
    try {
      writeAll(stderrFd, chunk); stderrBytes += chunk.length; stderrHash.update(chunk);
      if (stderrBytes > maxLogBytes) throw new Error("stderr log exceeds resource limit");
      stderrPending = Buffer.concat([stderrPending, chunk]);
      for (;;) {
        const newline = stderrPending.indexOf(10);
        if (newline < 0) break;
        const line = stderrPending.subarray(0, newline); stderrPending = stderrPending.subarray(newline + 1);
        stderrLine(line);
      }
      if (stderrPending.length > 1024 * 1024) throw new Error("unterminated stderr line exceeds resource limit");
    } catch (error) { fail(error); }
  };
  const rawStat = () => {
    if (rawFd === undefined) {
      rawFd = openSync(rawRowsPath, constants.O_RDONLY | constants.O_NONBLOCK | constants.O_NOFOLLOW);
      const info = fstatSync(rawFd);
      if (!info.isFile()) throw new Error("raw output must be a regular file");
      rawIdentity = { dev: info.dev, ino: info.ino };
    }
    const descriptor = fstatSync(rawFd), current = lstatSync(rawRowsPath);
    if (!descriptor.isFile() || !current.isFile() || descriptor.dev !== rawIdentity.dev || descriptor.ino !== rawIdentity.ino ||
        current.dev !== rawIdentity.dev || current.ino !== rawIdentity.ino || descriptor.size < rawOffset)
      throw new Error("raw output replaced or truncated");
    if (descriptor.size > maxRawBytes) throw new Error("raw output exceeds resource limit");
    return descriptor;
  };
  const nextRawRow = () => {
    const info = rawStat(), length = info.size - rawOffset;
    if (!length || length > maxRowBytes) throw new Error("missing or oversized raw row after completion");
    const bytes = Buffer.allocUnsafe(length);
    let at = 0;
    while (at < length) {
      const count = readSync(rawFd, bytes, at, length - at, rawOffset + at);
      if (!count) throw new Error("raw row ended during read");
      at += count;
    }
    if (rawStat().size !== info.size || bytes.at(-1) !== 10 || bytes.indexOf(10) !== bytes.length - 1)
      throw new Error("partial or extra raw row after completion");
    const row = JSON.parse(decode(bytes)), [receiver, transmitter] = active.pair;
    if (!row || row.schema !== ROW_SCHEMA || row.h3EvidenceEligible !== false || row.candidateId !== identity.candidateId ||
        row.rung !== identity.rung || row.phase !== identity.phase || row.manifestId !== identity.manifestId ||
        row.historyManifestSha256 !== identity.historyManifestSha256 || row.conformanceSha256 !== identity.conformanceSha256 ||
        row.receiverIndex !== receiver || row.transmitterIndex !== transmitter || !requestIdentity(row.request, active.pair) ||
        !equal(row.request, active.request) || row.rowPassed !== true || row.adapterFailureCode !== "" ||
        !row.certificate || typeof row.certificate !== "object" || Array.isArray(row.certificate))
      throw new Error("raw row identity, request, or adapter status mismatch");
    for (const [side, index] of [["receiver", receiver], ["transmitter", transmitter]]) {
      for (const [field, suffix] of [["constituentId", "ConstituentId"], ["worldlineId", "WorldlineId"], ["polarity", "Polarity"]]) {
        if (Object.hasOwn(identity.members[index], field) && row[`${side}${suffix}`] !== identity.members[index][field])
          throw new Error("raw row member identity mismatch");
      }
    }
    rawOffset += length; consumedHash.update(bytes); receipt.observedRows++;
    active.rawBytes = length; active.rawSha256 = sha(bytes);
    return bytes;
  };
  const finalRawBinding = async () => {
    if (!existsSync(rawRowsPath)) return { path: rawRowsPath, present: false, sha256: null, bytes: null };
    const info = rawStat(), all = digest(), prefix = digest();
    let at = 0, lines = 0, lastByte = null;
    const buffer = Buffer.allocUnsafe(65536);
    while (at < info.size) {
      const count = readSync(rawFd, buffer, 0, Math.min(buffer.length, info.size - at), at);
      if (!count) throw new Error("raw output ended during final hash");
      const chunk = buffer.subarray(0, count); all.update(chunk);
      if (at < rawOffset) prefix.update(chunk.subarray(0, Math.min(count, rawOffset - at)));
      for (const byte of chunk) if (byte === 10) lines++;
      lastByte = chunk.at(-1); at += count;
      if (at % (4 * 1024 * 1024) === 0) await pause(0);
    }
    if (rawStat().size !== info.size) throw new Error("raw output changed during final hash");
    const result = { path: rawRowsPath, present: true, bytes: info.size, sha256: all.digest("hex"),
      completeLines: lines, terminated: info.size === 0 || lastByte === 10,
      checkedPrefixBytes: rawOffset, checkedPrefixUnchanged: prefix.digest("hex") === consumedHash.copy().digest("hex") };
    receipt.rawRows = result;
    if (!result.checkedPrefixUnchanged) throw new Error("previously checked raw bytes were rewritten");
    return result;
  };
  const signalHandler = (signal) => { receipt.interruptedBy = signal; fail(`phase interrupted by ${signal}`); };
  const onInt = () => signalHandler("SIGINT"), onTerm = () => signalHandler("SIGTERM");
  try {
    stdoutFd = openSync(stdoutLogPath, "wx"); stderrFd = openSync(stderrLogPath, "wx");
    child = spawn(command, args, { cwd, detached: true, stdio: ["pipe", "pipe", "pipe"] });
    receipt.pid = child.pid ?? null;
    child.stdout.on("data", (chunk) => {
      try { writeAll(stdoutFd, chunk); stdoutBytes += chunk.length; stdoutHash.update(chunk); if (stdoutBytes > maxLogBytes) throw new Error("stdout log exceeds resource limit"); }
      catch (error) { fail(error); }
    });
    child.stderr.on("data", consumeStderr);
    child.stdin.on("error", (error) => fail(error));
    child.on("error", (error) => fail(error));
    child.on("close", (code, signal) => {
      closed = true; exitStatus = { code, signal }; receipt.exit = exitStatus;
      try { if (stderrPending.length) stderrLine(stderrPending, false); }
      catch (error) { fail(error); }
      stderrPending = Buffer.alloc(0);
      if (!failure && (!stopped || !eofSent || code !== 0 || signal)) fail("driver closed without complete stopped protocol and clean exit");
      pulse();
    });
    process.on("SIGINT", onInt); process.on("SIGTERM", onTerm);
    heartbeat = setInterval(() => {
      receipt.heartbeatCount++;
      process.stderr.write(`${JSON.stringify({ schema: "braid-program/abc-phase-process-heartbeat.v1", pid: child.pid,
        state, elapsedWallSeconds: elapsed(), dispatchedRows: receipt.dispatchedRows, checkedRows: receipt.checkedRows,
        stdoutBytes, stderrBytes, failed: Boolean(failure), h3EvidenceEligible: false })}\n`);
    }, heartbeatMs);
    deadline = setTimeout(() => { receipt.timedOut = true; fail("phase wall deadline exceeded"); }, limitMs);
    await until(() => prepared);
    if (rawStat().size !== 0) throw new Error("raw output was nonempty before first command");
    for (const [pairIndex, pair] of pairs.entries()) {
      requireLive();
      if (rawStat().size !== rawOffset) throw new Error("unsolicited raw output before next dispatch");
      active = { pairIndex, pair, rowId: `${identity.manifestId}/${pair[0]}/${pair[1]}`, dispatchedAtSeconds: elapsed() };
      state = "awaiting-start"; receipt.dispatchedRows++;
      child.stdin.write(`${pair[0]} ${pair[1]}\n`);
      await until(() => state === "validating");
      const bytes = nextRawRow();
      active.validationStartedAtSeconds = elapsed();
      const checking = Promise.resolve().then(() => checkRowBytes(Buffer.from(bytes), {
        pairIndex, receiverIndex: pair[0], transmitterIndex: pair[1], rowId: active.rowId, signal: controller.signal,
      }));
      // The callback must yield; this races asynchronous stalls, not arbitrary
      // same-thread synchronous code. A caller-owned worker enables isolation.
      const checked = await Promise.race([checking, interrupted.then((error) => { throw error; })]);
      requireLive();
      if (checked !== true) throw new Error("independent row callback rejected or did not explicitly permit continuation");
      active.validationFinishedAtSeconds = elapsed(); receipt.checkedRows++;
      receipt.rowTimings.push({ ...active }); active = null; state = "ready";
    }
    if (rawStat().size !== rawOffset) throw new Error("extra raw output after expected row count");
    requireLive(); state = "closing"; eofSent = true; receipt.eofSentAtSeconds = elapsed(); child.stdin.end();
    await until(() => closed);
    if (groupExists()) { receipt.descendantsAfterClose = true; throw new Error("owned descendants survived clean driver close"); }
    receipt.rawRows = await finalRawBinding();
    requireLive();
    if (receipt.rawRows.bytes !== rawOffset || receipt.rawRows.completeLines !== pairs.length || !receipt.rawRows.terminated)
      throw new Error("final raw output census differs from checked rows");
    receipt.status = "process-completed-pending-final-ledger";
  } catch (error) { fail(error); }
  finally {
    // Never stop monitoring while the owned group may still be running.
    if (failure || groupExists()) stopGroup();
    const cleanupDeadline = performance.now() + terminationGraceMs + 2000;
    while ((!closed || groupExists()) && child?.pid && performance.now() < cleanupDeadline) await pause(25);
    receipt.processGroupClosed = !groupExists();
    if (!receipt.processGroupClosed || (child?.pid && !closed)) {
      fail("owned process group or inherited pipes did not close after termination");
      child?.stdin.destroy(); child?.stdout.destroy(); child?.stderr.destroy();
    }
    try { receipt.rawRows ??= await finalRawBinding(); }
    catch (error) { receipt.rawOutputError = error.message; fail(error); }
    for (const [fd, filename, field, bytes] of [[stdoutFd, stdoutLogPath, "stdoutLog", stdoutBytes], [stderrFd, stderrLogPath, "stderrLog", stderrBytes]]) {
      if (fd === undefined) continue;
      try {
        fsyncSync(fd);
        const readFd = openSync(filename, constants.O_RDONLY | constants.O_NONBLOCK | constants.O_NOFOLLOW);
        try {
          const info = fstatSync(readFd);
          const owned = fstatSync(fd);
          if (!info.isFile() || info.dev !== owned.dev || info.ino !== owned.ino ||
              info.size !== bytes || info.size > maxLogBytes) throw new Error("log identity or resource mismatch");
          const h = digest(), buffer = Buffer.allocUnsafe(65536);
          let at = 0;
          while (at < bytes) { const count = readSync(readFd, buffer, 0, Math.min(buffer.length, bytes - at), at); if (!count) throw new Error("log truncated"); h.update(buffer.subarray(0, count)); at += count; }
          const hash = h.digest("hex"), observed = (field === "stdoutLog" ? stdoutHash : stderrHash).copy().digest("hex");
          if (hash !== observed) throw new Error("captured log bytes were rewritten");
          receipt[field] = { path: filename, bytes, sha256: hash };
        } finally { closeSync(readFd); }
      } catch (error) { receipt.logError = error.message; fail(error); }
      finally { closeSync(fd); }
    }
    if (rawFd !== undefined) closeSync(rawFd);
    // Synchronous final evidence hashing can cross the deadline before the
    // timer gets another event-loop turn. Admit success only after that work.
    if (performance.now() - started >= limitMs) {
      receipt.timedOut = true;
      fail("phase wall deadline exceeded during final evidence hashing");
    }
    clearInterval(heartbeat); clearTimeout(deadline); clearTimeout(forceStop);
    process.off("SIGINT", onInt); process.off("SIGTERM", onTerm);
    receipt.finishedAt = new Date().toISOString(); receipt.elapsedWallSeconds = elapsed();
    receipt.terminalCensus = { expectedRows: pairs.length, dispatchedRows: receipt.dispatchedRows,
      observedRows: receipt.observedRows, checkedRows: receipt.checkedRows, adapter: latestCounters,
      rawCompleteLines: receipt.rawRows?.completeLines ?? null, prepared, eofSent, stopped, exit: exitStatus };
    if (active) receipt.interruptedRow = { ...active };
    if (failure) receipt.status = "failed";
  }
  if (failure) throw Object.assign(failure, { phaseReceipt: receipt });
  return receipt;
}
