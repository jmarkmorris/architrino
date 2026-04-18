import test from "node:test";
import assert from "node:assert/strict";

import { auditPdgArchitecture } from "../scripts/check-pdg-architecture.mjs";

test("PDG docs and standalone wiring stay aligned with the non-UI pdgsolve architecture", () => {
  assert.deepEqual(auditPdgArchitecture(), []);
});
