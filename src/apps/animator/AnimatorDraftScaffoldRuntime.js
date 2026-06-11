function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function sanitizeAnimatorId(raw) {
  if (!raw) {
    return "animator_scene";
  }
  const cleaned = String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return cleaned || "animator_scene";
}

export function sanitizeAnimatorEntityId(raw, fallback = "item_1") {
  if (!raw) {
    return fallback;
  }
  const cleaned = String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return cleaned || fallback;
}

export function createAnimatorDefaultPathPoints(anchor = [0, 0, 0]) {
  const [baseX = 0, baseY = 0, baseZ = 0] = Array.isArray(anchor) ? anchor : [0, 0, 0];
  return [
    [baseX, baseY, baseZ],
    [baseX + 2.35, baseY + 1.2, baseZ + 0.6],
    [baseX + 4.1, baseY + 0.55, baseZ - 0.7],
    [baseX + 5.6, baseY + 1.45, baseZ + 0.25],
  ];
}

export function createAnimatorDefaultCoreSpec(assemblyId, options = {}) {
  const binaryCount = clampNumber(Math.round(Number(options?.binaryCount ?? 3) || 3), 1, 3);
  const shellUnit = 0.45;
  const outerShellRadius = shellUnit * 4;
  const binaryRadiusFractions = [0.5, 0.7, 0.9];
  const planeNormals = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ];
  return {
    coreType: "noether",
    shells: [
      { id: `${assemblyId}_shell_1`, radius: shellUnit, role: "inner", color: "#a9d8ff", opacity: 0.12 },
      { id: `${assemblyId}_shell_2`, radius: shellUnit * 2, role: "middle", color: "#7fb9ff", opacity: 0.1 },
      { id: `${assemblyId}_shell_3`, radius: shellUnit * 3, role: "outer", color: "#5b99ea", opacity: 0.08 },
      { id: `${assemblyId}_shell_4`, radius: outerShellRadius, role: "decorator", color: "#365f9f", opacity: 0.05 },
    ],
    binaries: [
      { radius: outerShellRadius * binaryRadiusFractions[0], frequencyHz: 0.42, planeNormal: planeNormals[0] },
      { radius: outerShellRadius * binaryRadiusFractions[1], frequencyHz: 0.26, planeNormal: planeNormals[1] },
      { radius: outerShellRadius * binaryRadiusFractions[2], frequencyHz: 0.16, planeNormal: planeNormals[2] },
    ].slice(0, binaryCount).map((binary, index) => ({
      id: `${assemblyId}_binary_${index + 1}`,
      motion: {
        type: "orbit.circular",
        center: assemblyId,
        radius: binary.radius,
        frequencyHz: binary.frequencyHz,
        planeNormal: binary.planeNormal,
      },
    })),
    alignment: {
      regime: "3d",
      planeNormals: planeNormals.slice(0, binaryCount),
    },
  };
}

export function createDefaultAnimatorAssemblyDraft(index = 0) {
  const ordinal = index + 1;
  const assemblyId = `assembly_${ordinal}`;
  const defaultPosition = [0, 0, 0];
  return {
    id: assemblyId,
    name: ordinal === 1 ? "Primary Assembly" : `Assembly ${ordinal}`,
    sceneRole: "assembly",
    parentId: "",
    position: defaultPosition,
    subassemblies: [],
    members:
      ordinal === 1
        ? [
            "positrino_1",
            "electrino_1",
            "positrino_2",
            "electrino_2",
            "positrino_3",
            "electrino_3",
          ]
        : [],
    pathPoints: ordinal === 1 ? createAnimatorDefaultPathPoints(defaultPosition) : [],
    pathInterpolate: "spline",
    pathClosed: false,
    historyTraceEnabled: false,
    envelopeEnabled: false,
    core: ordinal === 1 ? createAnimatorDefaultCoreSpec(assemblyId) : undefined,
  };
}
