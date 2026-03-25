import test from "node:test";
import assert from "node:assert/strict";

import {
  buildComposerAssemblyStructure,
  formatComposerAssemblyStructureStatus,
  formatComposerAssemblyStructureSummary,
  summarizeComposerAssemblyStructure,
} from "../src/runtime/ComposerAssemblyStructureBridgeRuntime.js";

test("composer assembly bridge builds a canonical structure summary for a core assembly", () => {
  const assembly = {
    id: "assembly_1",
    name: "Assembly 1",
    core: {
      binaries: [{ id: "b1" }, { id: "b2" }, { id: "b3" }],
    },
    members: [
      { id: "personality_1", slotKind: "personality", slotIndex: 0, state: "electrino" },
      { id: "personality_2", slotKind: "personality", slotIndex: 1, state: "positrino" },
      { id: "personality_3", slotKind: "personality", slotIndex: 2, state: "electrino" },
      { id: "personality_4", slotKind: "personality", slotIndex: 3, state: "positrino" },
      { id: "personality_5", slotKind: "personality", slotIndex: 4, state: "electrino" },
      { id: "personality_6", slotKind: "personality", slotIndex: 5, state: "positrino" },
    ],
    subassemblies: [],
  };

  const structure = buildComposerAssemblyStructure(assembly);
  const summary = summarizeComposerAssemblyStructure(structure.root, structure.validation);

  assert.equal(structure.validation.valid, true);
  assert.equal(summary.kindCounts.noether_core, 1);
  assert.equal(summary.slotCount, 3);
  assert.equal(summary.binarySlotCount, 3);
});

test("composer assembly bridge formats a compact canonical summary string", () => {
  assert.equal(
    formatComposerAssemblyStructureSummary({
      nodeCount: 7,
      slotCount: 3,
      binarySlotCount: 2,
    }),
    "7 nodes • 3 slots • 2 occupied binary slots"
  );
});

test("composer assembly bridge formats a human-readable core status string", () => {
  assert.equal(
    formatComposerAssemblyStructureStatus({
      slotCount: 3,
      binarySlotCount: 3,
      valid: true,
    }, {
      core: { binaries: [{}, {}, {}] },
    }),
    "Noether core • full"
  );
  assert.equal(
    formatComposerAssemblyStructureStatus({
      slotCount: 3,
      binarySlotCount: 2,
      valid: true,
    }, {
      core: { binaries: [{}, {}, {}] },
    }),
    "Noether core • 2/3 binaries"
  );
});

test("composer assembly bridge formats non-core and warning statuses readably", () => {
  assert.equal(
    formatComposerAssemblyStructureStatus({
      valid: true,
    }, {
      subassemblies: [{ id: "sub_1" }],
    }),
    "Composite • 1 group"
  );
  assert.equal(
    formatComposerAssemblyStructureStatus({
      valid: false,
    }, {
      members: [{ id: "member_1" }, { id: "member_2" }],
    }),
    "Assembly • 2 members • warning"
  );
});

test("composer assembly bridge includes shallow subassemblies and root members", () => {
  const assembly = {
    id: "assembly_2",
    name: "Assembly 2",
    members: [{ id: "electrino_1" }, { id: "member_2" }],
    subassemblies: [
      {
        id: "subassembly_1",
        position: [1, 2, 3],
        members: [{ id: "positrino_1" }],
      },
    ],
  };

  const structure = buildComposerAssemblyStructure(assembly);
  const summary = summarizeComposerAssemblyStructure(structure.root, structure.validation);

  assert.equal(summary.kindCounts.composite, 2);
  assert.equal(summary.kindCounts.architrino >= 1, true);
  assert.equal(summary.nodeCount >= 4, true);
});
