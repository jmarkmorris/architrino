import assert from "node:assert/strict";
import test from "node:test";

import {
  getBorgVelocityRayLength,
} from "../src/apps/borg/BorgAppRuntime.js";

test("Borg velocity rays keep every finite nonzero Display-grade speed visible", () => {
  assert.equal(getBorgVelocityRayLength(0), 0);
  assert.equal(getBorgVelocityRayLength(Number.NaN), 0);
  assert.ok(getBorgVelocityRayLength(1e-12) >= 0.22);
});

test("Borg velocity-ray length remains logarithmic and monotone", () => {
  const verySlow = getBorgVelocityRayLength(1e-12);
  const slow = getBorgVelocityRayLength(1e-4);
  const fieldScale = getBorgVelocityRayLength(1);

  assert.ok(verySlow < slow);
  assert.ok(slow < fieldScale);
  assert.ok(fieldScale < 1);
});
