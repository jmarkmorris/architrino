import {
  existsSync,
  mkdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

function fail(message) {
  throw new Error(message);
}

export function acquireExclusiveCampaignOutputLease(outputPath, {
  argv = process.argv.slice(2),
  schema = "prescribed-path-analysis/campaign-output-lease.v1",
} = {}) {
  mkdirSync(path.dirname(outputPath), { recursive: true });
  if (existsSync(outputPath)) fail(`${outputPath} already exists.`);
  const leasePath = `${outputPath}.RUNNING.lock`;
  writeFileSync(leasePath, `${JSON.stringify({
    schema,
    outputPath,
    pid: process.pid,
    host: process.env.HOSTNAME ?? null,
    startedAt: new Date().toISOString(),
    argv,
    recovery:
      "inspect the recorded process identity and output before removing a stale lease; never delete an unknown live lease",
  }, null, 2)}\n`, { flag: "wx" });
  return leasePath;
}

export function publishExclusiveCampaignOutput(
  outputPath,
  bytes,
  leasePath,
) {
  if (leasePath !== `${outputPath}.RUNNING.lock`) {
    fail("output lease does not belong to the declared output path.");
  }
  writeFileSync(outputPath, bytes, { flag: "wx" });
  unlinkSync(leasePath);
  return outputPath;
}
