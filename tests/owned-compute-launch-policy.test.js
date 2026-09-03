import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkOwnedComputeLaunchPolicy } from "../scripts/check-owned-compute-launch-policy.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("accepted detached-launch inventory names every current specialized owner", () => {
  const result = checkOwnedComputeLaunchPolicy({ rootDir: ROOT });
  assert.equal(result.status, "passed");
  assert.equal(result.canonicalSupervisor, "scripts/dev/owned-compute-supervisor.mjs");
  assert.equal(result.launchers.some((row) => row.path === "scripts/eom/launch-subfield-circular-root-pilot.mjs"), true);
  const integrity = fs.readFileSync(path.join(ROOT, "scripts/check-content-integrity.mjs"), "utf8");
  assert.match(integrity, /Validate owned-compute launch policy/u);
  assert.match(integrity, /scripts\/check-owned-compute-launch-policy\.mjs/u);
});

test("an unregistered detached launch fails closed", () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "owned-compute-policy-"));
  try {
    fs.mkdirSync(path.join(fixture, "scripts"));
    fs.mkdirSync(path.join(fixture, "src"));
    fs.writeFileSync(path.join(fixture, "scripts/unowned.mjs"), "spawn(command, args, { detached: true });\n");
    assert.throws(
      () => checkOwnedComputeLaunchPolicy({
        rootDir: fixture,
        policy: {
          schema: "architrino.owned-compute-launch-policy.v1",
          status: "accepted",
          canonicalSupervisor: "scripts/dev/owned-compute-supervisor.mjs",
          allowedDetachedLaunchers: [],
        },
      }),
      /detached process launch inventory changed/u,
    );
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
