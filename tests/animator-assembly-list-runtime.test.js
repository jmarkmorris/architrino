import test from "node:test";
import assert from "node:assert/strict";

import {
  formatAnimatorMemberList,
  formatAnimatorSubassemblyList,
  getAnimatorMemberId,
  getAnimatorMemberState,
  getAnimatorSubassemblyId,
  isAnimatorPersonalityMember,
  normalizeAnimatorMemberList,
  normalizeAnimatorMemberPosition,
  normalizeAnimatorSubassemblyList,
  pruneAnimatorSubassemblyList,
  roundAnimatorTriplet,
} from "../src/apps/animator/AnimatorAssemblyListRuntime.js";

test("animator assembly list runtime normalizes member positions and records", () => {
  assert.deepEqual(normalizeAnimatorMemberPosition([1, 2, 3]), [1, 2, 3]);
  assert.equal(normalizeAnimatorMemberPosition(["a", 2, 3]), null);

  const members = normalizeAnimatorMemberList([
    "Alpha @ 1, 2, 3",
    { id: "Beta", state: "Positrino", slotKind: "personality", slotIndex: 2 },
  ]);

  assert.equal(getAnimatorMemberId(members[0], 0), "alpha");
  assert.deepEqual(members[0].position, [1, 2, 3]);
  assert.equal(getAnimatorMemberId(members[1], 1), "beta");
  assert.equal(getAnimatorMemberState(members[1]), "positrino");
  assert.equal(isAnimatorPersonalityMember(members[1]), true);
});

test("animator assembly list runtime formats member and subassembly lists", () => {
  assert.equal(
    formatAnimatorMemberList([{ id: "alpha", position: [1, 2, 3] }, { id: "beta" }]),
    "alpha @ 1, 2, 3\nbeta"
  );

  assert.equal(
    formatAnimatorSubassemblyList([
      { id: "subassembly_a", position: [0, 1, 2], members: ["alpha", "beta"] },
    ]),
    "subassembly_a @ 0, 1, 2: alpha, beta"
  );
});

test("animator assembly list runtime normalizes and prunes subassemblies", () => {
  const subassemblies = normalizeAnimatorSubassemblyList([
    "Subassembly A @ 0, 1, 2: Alpha, Beta, Alpha",
    { id: "Subassembly B", position: [2, 3, 4], members: [] },
  ]);

  assert.equal(getAnimatorSubassemblyId(subassemblies[0], 0), "subassembly_a");
  assert.deepEqual(subassemblies[0].members, ["alpha", "beta"]);
  assert.deepEqual(pruneAnimatorSubassemblyList(subassemblies), [subassemblies[0]]);
  assert.deepEqual(roundAnimatorTriplet([1.2349, 2.3459, 3.4569]), [1.235, 2.346, 3.457]);
});
