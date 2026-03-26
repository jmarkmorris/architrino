import test from "node:test";
import assert from "node:assert/strict";

import { splitComposerAssemblyGroup } from "../src/runtime/ComposerAssemblyStructureMutationRuntime.js";

test("composer structure split group moves grouped members back to root space", () => {
  const assembly = {
    id: "assembly_1",
    members: [
      { id: "member_1", position: [0.2, 0.3, 0] },
      { id: "member_2", position: [-0.4, 0.1, 0] },
      { id: "member_3", position: [2, 2, 0] },
    ],
    subassemblies: [
      {
        id: "subassembly_1",
        position: [1, 2, 0],
        members: ["member_1", "member_2"],
      },
    ],
  };

  const nextAssembly = splitComposerAssemblyGroup(assembly, "subassembly_1");

  assert.ok(nextAssembly);
  assert.deepEqual(nextAssembly.subassemblies, []);
  assert.deepEqual(
    nextAssembly.members.map((member) => [member.id, member.position]),
    [
      ["member_1", [1.2, 2.3, 0]],
      ["member_2", [0.6, 2.1, 0]],
      ["member_3", [2, 2, 0]],
    ]
  );
});

test("composer structure split group preserves fallback spacing for unpositioned members", () => {
  const assembly = {
    id: "assembly_2",
    members: [{ id: "member_1" }, { id: "member_2" }],
    subassemblies: [
      {
        id: "subassembly_1",
        position: [1, 0, 0],
        members: ["member_1", "member_2"],
      },
    ],
  };

  const nextAssembly = splitComposerAssemblyGroup(assembly, "subassembly_1");

  assert.ok(nextAssembly);
  assert.deepEqual(nextAssembly.subassemblies, []);
  assert.notDeepEqual(nextAssembly.members[0].position, [1, 0, 0]);
  assert.notDeepEqual(nextAssembly.members[1].position, [1, 0, 0]);
  assert.notDeepEqual(nextAssembly.members[0].position, nextAssembly.members[1].position);
});
