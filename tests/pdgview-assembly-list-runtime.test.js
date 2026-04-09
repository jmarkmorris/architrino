import test from "node:test";
import assert from "node:assert/strict";

import {
  formatPdgviewMemberList,
  formatPdgviewSubassemblyList,
  getPdgviewMemberId,
  getPdgviewMemberState,
  getPdgviewSubassemblyId,
  isPdgviewPersonalityMember,
  normalizePdgviewMemberList,
  normalizePdgviewMemberPosition,
  normalizePdgviewSubassemblyList,
  prunePdgviewSubassemblyList,
  roundPdgviewTriplet,
} from "../src/apps/pdgview/PdgviewAssemblyListRuntime.js";

test("pdgview assembly list runtime normalizes member positions and records", () => {
  assert.deepEqual(normalizePdgviewMemberPosition([1, 2, 3]), [1, 2, 3]);
  assert.equal(normalizePdgviewMemberPosition(["a", 2, 3]), null);

  const members = normalizePdgviewMemberList([
    "Alpha @ 1, 2, 3",
    { id: "Beta", state: "Positrino", slotKind: "personality", slotIndex: 2 },
  ]);

  assert.equal(getPdgviewMemberId(members[0], 0), "alpha");
  assert.deepEqual(members[0].position, [1, 2, 3]);
  assert.equal(getPdgviewMemberId(members[1], 1), "beta");
  assert.equal(getPdgviewMemberState(members[1]), "positrino");
  assert.equal(isPdgviewPersonalityMember(members[1]), true);
});

test("pdgview assembly list runtime formats member and subassembly lists", () => {
  assert.equal(
    formatPdgviewMemberList([{ id: "alpha", position: [1, 2, 3] }, { id: "beta" }]),
    "alpha @ 1, 2, 3\nbeta"
  );

  assert.equal(
    formatPdgviewSubassemblyList([
      { id: "subassembly_a", position: [0, 1, 2], members: ["alpha", "beta"] },
    ]),
    "subassembly_a @ 0, 1, 2: alpha, beta"
  );
});

test("pdgview assembly list runtime normalizes and prunes subassemblies", () => {
  const subassemblies = normalizePdgviewSubassemblyList([
    "Subassembly A @ 0, 1, 2: Alpha, Beta, Alpha",
    { id: "Subassembly B", position: [2, 3, 4], members: [] },
  ]);

  assert.equal(getPdgviewSubassemblyId(subassemblies[0], 0), "subassembly_a");
  assert.deepEqual(subassemblies[0].members, ["alpha", "beta"]);
  assert.deepEqual(prunePdgviewSubassemblyList(subassemblies), [subassemblies[0]]);
  assert.deepEqual(roundPdgviewTriplet([1.2349, 2.3459, 3.4569]), [1.235, 2.346, 3.457]);
});
