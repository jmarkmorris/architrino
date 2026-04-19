import test from "node:test";
import assert from "node:assert/strict";

import {
  createPdgviewGenIFermionPersonalityMembers,
  createPdgviewPersonalityMembers,
  describePdgviewTransferProvenance,
  formatPdgviewTransferEndpointLabel,
  formatPdgviewTransferList,
  getPdgviewBuiltInPersonalityStates,
  getPdgviewGraphicDefaultOffset,
  sanitizePdgviewGraphicTarget,
} from "../src/apps/animator/PdgviewAuthoringHelpersRuntime.js";

test("pdgview authoring helpers format transfer provenance", () => {
  const transfer = {
    source: { assemblyId: "assembly_a", memberId: "alpha" },
    target: { assemblyId: "assembly_b", memberId: "beta" },
    t: 12,
  };

  assert.equal(formatPdgviewTransferEndpointLabel(transfer.source), "assembly_a.alpha");
  assert.equal(formatPdgviewTransferList([transfer]), "assembly_a.alpha -> assembly_b.beta @ 12");
  assert.equal(
    describePdgviewTransferProvenance(transfer, "ref_1"),
    "ref_1: assembly_a.alpha -> assembly_b.beta"
  );
});

test("pdgview authoring helpers sanitize graphic targets and offsets", () => {
  assert.deepEqual(
    sanitizePdgviewGraphicTarget({ type: "path_point", assemblyId: " Assembly A ", pointIndex: 3 }),
    { type: "path_point", assemblyId: "assembly_a", pointIndex: 3 }
  );
  assert.deepEqual(
    sanitizePdgviewGraphicTarget(null, "assembly_a"),
    { type: "assembly", assemblyId: "assembly_a" }
  );
  assert.deepEqual(getPdgviewGraphicDefaultOffset(0.5), [0.725, 0.54, 0]);
});

test("pdgview authoring helpers build personality members and built-in states", () => {
  const members = createPdgviewPersonalityMembers(["electrino", "bad", "positrino"]);
  const genI = createPdgviewGenIFermionPersonalityMembers();

  assert.equal(members.length, 6);
  assert.equal(members[0].state, "electrino");
  assert.equal(members[1].state, "unset");
  assert.equal(members[2].state, "positrino");
  assert.equal(genI.length, 6);
  assert.equal(getPdgviewBuiltInPersonalityStates("electron")[0], "electrino");
  assert.deepEqual(getPdgviewBuiltInPersonalityStates("up_quark").slice(0, 2), [
    "positrino",
    "electrino",
  ]);
});
