import test from "node:test";
import assert from "node:assert/strict";

import {
  formatComposerMemberList,
  formatComposerSubassemblyList,
  getComposerMemberId,
  getComposerMemberState,
  getComposerSubassemblyId,
  isComposerPersonalityMember,
  normalizeComposerMemberList,
  normalizeComposerMemberPosition,
  normalizeComposerSubassemblyList,
  pruneComposerSubassemblyList,
  roundComposerTriplet,
} from "../src/apps/composer/ComposerAssemblyListRuntime.js";

test("composer assembly list runtime normalizes member positions and records", () => {
  assert.deepEqual(normalizeComposerMemberPosition([1, 2, 3]), [1, 2, 3]);
  assert.equal(normalizeComposerMemberPosition(["a", 2, 3]), null);

  const members = normalizeComposerMemberList([
    "Alpha @ 1, 2, 3",
    { id: "Beta", state: "Positrino", slotKind: "personality", slotIndex: 2 },
  ]);

  assert.equal(getComposerMemberId(members[0], 0), "alpha");
  assert.deepEqual(members[0].position, [1, 2, 3]);
  assert.equal(getComposerMemberId(members[1], 1), "beta");
  assert.equal(getComposerMemberState(members[1]), "positrino");
  assert.equal(isComposerPersonalityMember(members[1]), true);
});

test("composer assembly list runtime formats member and subassembly lists", () => {
  assert.equal(
    formatComposerMemberList([{ id: "alpha", position: [1, 2, 3] }, { id: "beta" }]),
    "alpha @ 1, 2, 3\nbeta"
  );

  assert.equal(
    formatComposerSubassemblyList([
      { id: "subassembly_a", position: [0, 1, 2], members: ["alpha", "beta"] },
    ]),
    "subassembly_a @ 0, 1, 2: alpha, beta"
  );
});

test("composer assembly list runtime normalizes and prunes subassemblies", () => {
  const subassemblies = normalizeComposerSubassemblyList([
    "Subassembly A @ 0, 1, 2: Alpha, Beta, Alpha",
    { id: "Subassembly B", position: [2, 3, 4], members: [] },
  ]);

  assert.equal(getComposerSubassemblyId(subassemblies[0], 0), "subassembly_a");
  assert.deepEqual(subassemblies[0].members, ["alpha", "beta"]);
  assert.deepEqual(pruneComposerSubassemblyList(subassemblies), [subassemblies[0]]);
  assert.deepEqual(roundComposerTriplet([1.2349, 2.3459, 3.4569]), [1.235, 2.346, 3.457]);
});
