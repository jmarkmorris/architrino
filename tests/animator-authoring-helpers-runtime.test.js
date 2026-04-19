import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorGenIFermionPersonalityMembers,
  createAnimatorPersonalityMembers,
  describeAnimatorTransferProvenance,
  formatAnimatorTransferEndpointLabel,
  formatAnimatorTransferList,
  getAnimatorBuiltInPersonalityStates,
  getAnimatorGraphicDefaultOffset,
  sanitizeAnimatorGraphicTarget,
} from "../src/apps/animator/AnimatorAuthoringHelpersRuntime.js";

test("animator authoring helpers format transfer provenance", () => {
  const transfer = {
    source: { assemblyId: "assembly_a", memberId: "alpha" },
    target: { assemblyId: "assembly_b", memberId: "beta" },
    t: 12,
  };

  assert.equal(formatAnimatorTransferEndpointLabel(transfer.source), "assembly_a.alpha");
  assert.equal(formatAnimatorTransferList([transfer]), "assembly_a.alpha -> assembly_b.beta @ 12");
  assert.equal(
    describeAnimatorTransferProvenance(transfer, "ref_1"),
    "ref_1: assembly_a.alpha -> assembly_b.beta"
  );
});

test("animator authoring helpers sanitize graphic targets and offsets", () => {
  assert.deepEqual(
    sanitizeAnimatorGraphicTarget({ type: "path_point", assemblyId: " Assembly A ", pointIndex: 3 }),
    { type: "path_point", assemblyId: "assembly_a", pointIndex: 3 }
  );
  assert.deepEqual(
    sanitizeAnimatorGraphicTarget(null, "assembly_a"),
    { type: "assembly", assemblyId: "assembly_a" }
  );
  assert.deepEqual(getAnimatorGraphicDefaultOffset(0.5), [0.725, 0.54, 0]);
});

test("animator authoring helpers build personality members and built-in states", () => {
  const members = createAnimatorPersonalityMembers(["electrino", "bad", "positrino"]);
  const genI = createAnimatorGenIFermionPersonalityMembers();

  assert.equal(members.length, 6);
  assert.equal(members[0].state, "electrino");
  assert.equal(members[1].state, "unset");
  assert.equal(members[2].state, "positrino");
  assert.equal(genI.length, 6);
  assert.equal(getAnimatorBuiltInPersonalityStates("electron")[0], "electrino");
  assert.deepEqual(getAnimatorBuiltInPersonalityStates("up_quark").slice(0, 2), [
    "positrino",
    "electrino",
  ]);
});
