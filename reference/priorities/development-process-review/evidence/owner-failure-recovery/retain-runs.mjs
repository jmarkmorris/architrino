import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
const base = "reference/priorities/development-process-review/evidence/owner-failure-recovery";
const sha = (bytes) => createHash("sha256").update(bytes).digest("hex");
assert.equal(sha(Buffer.from("abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
const fields = (r) => ({ runId: r.runId, status: r.status, command: r.command, args: r.args, startedAtUtc: r.startedAtUtc, finishedAtUtc: r.finishedAtUtc, elapsedWallSeconds: r.elapsedWallSeconds, exitCode: r.exitCode, processGroupClosed: r.processGroupClosed });
assert.equal("control" in fields({ runId: "known", control: { token: "excluded" } }), false);
console.log("Known SHA and allowlist controls passed before reading terminal records.");
const standalone = JSON.parse(readFileSync(`${base}/standalone-results.json`));
const ids = ["217f2cf8-4126-4bb6-811f-f829bad416d5", "0a4403cd-2283-4119-b152-199dd7eceb75", "0239a2f9-b3ec-459c-af66-528d936aeb8f", "d2da367a-00a0-4dc9-9790-ca552c21182a", "34f5e730-7328-4a12-924b-8b58d44f46f5", "7a210014-9d8b-4587-a550-a28e0bb54402", "b5814234-545d-45cf-9922-b62c2e573f82", "74f235aa-7e24-45e9-8398-00da06491b70", "40ccf153-052f-489d-81cf-fc6664353e25", "38dd3ae8-aaa9-4475-8d98-6e82ef987d37", "f4a69e63-a765-4274-959f-948885a599f1", ...standalone.results.map(r => r.runId)];
const records = ids.map((id) => {
  const r = JSON.parse(readFileSync(`.local-data/owned-compute/leases/${id}.json`));
  assert.equal(r.runId, id);
  const logs = {};
  for (const stream of ["stdout", "stderr"]) {
    const bytes = readFileSync(r[`${stream}Path`]);
    logs[stream] = { sha256: sha(bytes), sizeBytes: bytes.length, localPath: r[`${stream}Path`] };
  }
  return { ...fields(r), logs };
});
standalone.results.forEach((r, i) => {
  copyFileSync(r.stdoutPath, `${base}/standalone-${i + 1}.stdout.log`);
  copyFileSync(r.stderrPath, `${base}/standalone-${i + 1}.stderr.log`);
});
writeFileSync(`${base}/runs.json`, JSON.stringify({ controls: "known SHA and token-excluding field allowlist passed first", records }, null, 2) + "\n");
