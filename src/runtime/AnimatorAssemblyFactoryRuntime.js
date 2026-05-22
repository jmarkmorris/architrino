export function createBuiltInAnimatorAssemblyDraftRuntime(templateId, position = [0, 0, 0], options = {}) {
  const {
    normalizeSceneRole,
    normalizeAssemblyDraft,
    getDraftCount,
    getNextAssemblyId,
    createDefaultPathPoints,
    createDefaultCoreSpec,
    createPersonalityMembers,
    getBuiltInPersonalityStates,
    createGenIFermionPersonalityMembers,
  } = options;

  const normalizedPosition = Array.isArray(position)
    ? [
        Number(position[0] ?? 0) || 0,
        Number(position[1] ?? 0) || 0,
        Number(position[2] ?? 0) || 0,
      ]
    : [0, 0, 0];
  const sceneRole = typeof normalizeSceneRole === "function"
    ? normalizeSceneRole(options.sceneRole)
    : "assembly";
  const buildDraft = (draft) =>
    typeof normalizeAssemblyDraft === "function"
      ? normalizeAssemblyDraft(draft, Number(getDraftCount?.() ?? 0) || 0)
      : draft;

  const assemblyFactories = {
    positrino: () => {
      const id = getNextAssemblyId("positrino");
      return buildDraft({
        id,
        name: "Positrino",
        role: "positrino",
        sceneRole,
        position: normalizedPosition,
        members: ["positrino_1"],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
      });
    },
    electrino: () => {
      const id = getNextAssemblyId("electrino");
      return buildDraft({
        id,
        name: "Electrino",
        role: "electrino",
        sceneRole,
        position: normalizedPosition,
        members: ["electrino_1"],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
      });
    },
    electron: () => {
      const id = getNextAssemblyId("electron");
      return buildDraft({
        id,
        name: "Pro Electron",
        role: "electron",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createPersonalityMembers(getBuiltInPersonalityStates("electron")),
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    noether_pair: () => {
      const id = getNextAssemblyId("noether_pair");
      return buildDraft({
        id,
        name: "Noether Pair",
        role: "noether_pair",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    noether_quad: () => {
      const id = getNextAssemblyId("noether_quad");
      return buildDraft({
        id,
        name: "Noether Quad",
        role: "noether_quad",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    fermion_gen1: () => {
      const id = getNextAssemblyId("fermion");
      return buildDraft({
        id,
        name: "Pro Gen I Fermion",
        role: "fermion_gen1",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createGenIFermionPersonalityMembers(),
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    down_quark: () => {
      const id = getNextAssemblyId("down_quark");
      return buildDraft({
        id,
        name: "Pro Down Quark",
        role: "down_quark",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
          ...createPersonalityMembers(getBuiltInPersonalityStates("down_quark")),
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    up_quark: () => {
      const id = getNextAssemblyId("up_quark");
      return buildDraft({
        id,
        name: "Pro Up Quark",
        role: "up_quark",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          ...createPersonalityMembers(getBuiltInPersonalityStates("up_quark")),
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
    noether_swarm: () => {
      const id = getNextAssemblyId("noether_swarm");
      return buildDraft({
        id,
        name: "Pro Noether swarm",
        role: "assembly",
        sceneRole,
        position: normalizedPosition,
        members: [
          "positrino_1",
          "electrino_1",
          "positrino_2",
          "electrino_2",
          "positrino_3",
          "electrino_3",
        ],
        subassemblies: [],
        pathPoints: createDefaultPathPoints(normalizedPosition),
        core: createDefaultCoreSpec(id),
      });
    },
  };

  return (assemblyFactories[templateId] ?? assemblyFactories.noether_swarm)();
}
