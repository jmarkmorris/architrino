import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorAssemblyAuthoringRuntime } from "../src/apps/animator/AnimatorAssemblyAuthoringRuntime.js";

function makeRuntimeContext() {
  const assemblyStore = new Map();
  const statusMessages = [];

  const setAssembly = (assembly) => {
    assemblyStore.set(assembly.id, structuredClone(assembly));
    return assemblyStore.get(assembly.id);
  };

  const runtime = createAnimatorAssemblyAuthoringRuntime({
    getAnimatorAssemblyDraftById(assemblyId) {
      return assemblyStore.get(assemblyId) ?? null;
    },
    updateAnimatorAssemblyDraftByIdState(assemblyId, updater) {
      const current = assemblyStore.get(assemblyId) ?? null;
      const next = updater(current);
      assemblyStore.set(assemblyId, next);
      return next;
    },
    setAnimatorStatus(message) {
      statusMessages.push(message);
    },
    getAnimatorPersonalityMembers(assembly) {
      return (Array.isArray(assembly?.members) ? assembly.members : []).filter(
        (member) => member?.slotKind === "personality"
      );
    },
    getAnimatorProxyMemberOffset(memberIndex, memberCount, baseRadius) {
      return { x: baseRadius + memberIndex, y: memberCount, z: 0 };
    },
    splitAnimatorAssemblyGroupRuntime(assembly, subassemblyId) {
      return {
        ...assembly,
        members: assembly.members,
        subassemblies: (assembly.subassemblies ?? []).filter((entry) => entry.id !== subassemblyId),
      };
    },
  });

  return { runtime, setAssembly, assemblyStore, statusMessages };
}

test("animator assembly authoring runtime adds members and enforces personality capacity", () => {
  const { runtime, setAssembly, assemblyStore, statusMessages } = makeRuntimeContext();
  setAssembly({
    id: "assembly_1",
    core: { shells: [{}], binaries: [{}] },
    members: [
      { id: "personality_1", slotKind: "personality", slotIndex: 0, state: "electrino" },
      { id: "personality_2", slotKind: "personality", slotIndex: 1, state: "positrino" },
    ],
    subassemblies: [],
  });

  assert.equal(runtime.addAnimatorAssemblyMemberByKind(assemblyStore.get("assembly_1"), "member"), true);
  assert.equal(
    runtime.addAnimatorAssemblyMemberByKind(assemblyStore.get("assembly_1"), "electrino"),
    false
  );
  assert.match(statusMessages[0] ?? "", /Personality layer is full/);
});

test("animator assembly authoring runtime can group, move, and remove members", () => {
  const { runtime, setAssembly, assemblyStore } = makeRuntimeContext();
  setAssembly({
    id: "assembly_1",
    members: [
      { id: "alpha", position: [1, 0, 0] },
      { id: "beta", position: [3, 0, 0] },
    ],
    subassemblies: [],
  });

  const subassemblyId = runtime.createAnimatorSubassemblyFromMembers(
    assemblyStore.get("assembly_1"),
    ["alpha", "beta"]
  );
  assert.equal(subassemblyId, "subassembly_1");
  assert.equal(
    runtime.getAnimatorMemberSubassemblyId(assemblyStore.get("assembly_1"), "alpha"),
    "subassembly_1"
  );
  assert.equal(runtime.moveAnimatorMemberToRoot(assemblyStore.get("assembly_1"), "alpha"), true);
  assert.equal(runtime.getAnimatorMemberSubassemblyId(assemblyStore.get("assembly_1"), "alpha"), "");
  assert.equal(runtime.removeAnimatorAssemblyMember(assemblyStore.get("assembly_1"), "beta"), true);
  assert.equal(
    assemblyStore.get("assembly_1").members.some((member) => member.id === "beta"),
    false
  );
});
