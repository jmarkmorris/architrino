import test from "node:test";
import assert from "node:assert/strict";

import {
  createComposerGenIFermionPersonalityMembers,
  createComposerPersonalityMembers,
  describeComposerTransferProvenance,
  formatComposerTransferEndpointLabel,
  formatComposerTransferList,
  getComposerBuiltInPersonalityStates,
  getComposerGraphicDefaultOffset,
  sanitizeComposerGraphicTarget,
} from "../src/apps/composer/ComposerAuthoringHelpersRuntime.js";

test("composer authoring helpers format transfer provenance", () => {
  const transfer = {
    source: { assemblyId: "assembly_a", memberId: "alpha" },
    target: { assemblyId: "assembly_b", memberId: "beta" },
    t: 12,
  };

  assert.equal(formatComposerTransferEndpointLabel(transfer.source), "assembly_a.alpha");
  assert.equal(formatComposerTransferList([transfer]), "assembly_a.alpha -> assembly_b.beta @ 12");
  assert.equal(
    describeComposerTransferProvenance(transfer, "ref_1"),
    "ref_1: assembly_a.alpha -> assembly_b.beta"
  );
});

test("composer authoring helpers sanitize graphic targets and offsets", () => {
  assert.deepEqual(
    sanitizeComposerGraphicTarget({ type: "path_point", assemblyId: " Assembly A ", pointIndex: 3 }),
    { type: "path_point", assemblyId: "assembly_a", pointIndex: 3 }
  );
  assert.deepEqual(
    sanitizeComposerGraphicTarget(null, "assembly_a"),
    { type: "assembly", assemblyId: "assembly_a" }
  );
  assert.deepEqual(getComposerGraphicDefaultOffset(0.5), [0.725, 0.54, 0]);
});

test("composer authoring helpers build personality members and built-in states", () => {
  const members = createComposerPersonalityMembers(["electrino", "bad", "positrino"]);
  const genI = createComposerGenIFermionPersonalityMembers();

  assert.equal(members.length, 6);
  assert.equal(members[0].state, "electrino");
  assert.equal(members[1].state, "unset");
  assert.equal(members[2].state, "positrino");
  assert.equal(genI.length, 6);
  assert.equal(getComposerBuiltInPersonalityStates("electron")[0], "electrino");
  assert.deepEqual(getComposerBuiltInPersonalityStates("up_quark").slice(0, 2), [
    "positrino",
    "electrino",
  ]);
});
