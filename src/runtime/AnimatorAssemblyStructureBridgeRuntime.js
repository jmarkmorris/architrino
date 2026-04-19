import {
  STRUCTURE_ARCHITRINO_ROLES,
  STRUCTURE_CHARGE_TYPES,
  STRUCTURE_KINDS,
  STRUCTURE_SLOT_ORDER,
} from "../domain/structure/StructureSchema.js";
import { walkStructure } from "../domain/structure/StructureTraversal.js";
import { validateStructureTree } from "../domain/structure/StructureValidation.js";

function sanitizeId(rawValue = "", fallback = "node") {
  const normalized = String(rawValue ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return normalized || fallback;
}

function normalizeMembers(rawMembers) {
  if (!Array.isArray(rawMembers)) {
    return [];
  }
  return rawMembers
    .map((member, index) => {
      if (member && typeof member === "object" && !Array.isArray(member)) {
        return {
          ...member,
          id: sanitizeId(member.id ?? member.name, `member_${index + 1}`),
        };
      }
      return {
        id: sanitizeId(member, `member_${index + 1}`),
      };
    })
    .filter((member) => member.id);
}

function normalizeSubassemblies(rawSubassemblies) {
  if (!Array.isArray(rawSubassemblies)) {
    return [];
  }
  return rawSubassemblies
    .map((entry, index) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return null;
      }
      return {
        ...entry,
        id: sanitizeId(entry.id ?? entry.name, `subassembly_${index + 1}`),
        members: normalizeMembers(entry.members),
      };
    })
    .filter(Boolean);
}

function inferArchitrinoCharge(member = {}) {
  const state = String(member?.state ?? "").trim().toLowerCase();
  const memberId = String(member?.id ?? "").trim().toLowerCase();
  if (state === STRUCTURE_CHARGE_TYPES.POSITRINO || memberId.startsWith("positrino")) {
    return STRUCTURE_CHARGE_TYPES.POSITRINO;
  }
  return STRUCTURE_CHARGE_TYPES.ELECTRINO;
}

function createBinaryNode(idBase, slotName) {
  return {
    id: `${idBase}/binary`,
    kind: STRUCTURE_KINDS.BINARY,
    species: "binary",
    label: `${slotName} binary`,
    traits: { slot: slotName },
    children: [
      {
        id: `${idBase}/binary/electrino`,
        kind: STRUCTURE_KINDS.ARCHITRINO,
        species: "architrino",
        label: "electrino",
        traits: {
          charge: STRUCTURE_CHARGE_TYPES.ELECTRINO,
          role: STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER,
        },
        children: [],
      },
      {
        id: `${idBase}/binary/positrino`,
        kind: STRUCTURE_KINDS.ARCHITRINO,
        species: "architrino",
        label: "positrino",
        traits: {
          charge: STRUCTURE_CHARGE_TYPES.POSITRINO,
          role: STRUCTURE_ARCHITRINO_ROLES.BINARY_MEMBER,
        },
        children: [],
      },
    ],
  };
}

function createPersonalityArchitrino(idBase, chargeType, slotIndex) {
  return {
    id: `${idBase}/personality_${slotIndex + 1}`,
    kind: STRUCTURE_KINDS.ARCHITRINO,
    species: "architrino",
    label: `${chargeType} personality charge`,
    traits: {
      charge: chargeType,
      role: STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE,
    },
    children: [],
  };
}

function createMemberNode(member = {}, ownerId = "") {
  const chargeType = inferArchitrinoCharge(member);
  const isChargeLike =
    member?.slotKind === "personality" ||
    String(member?.id ?? "").startsWith("electrino") ||
    String(member?.id ?? "").startsWith("positrino");
  if (isChargeLike) {
    return {
      id: `${ownerId}/${member.id}`,
      kind: STRUCTURE_KINDS.ARCHITRINO,
      species: "architrino",
      label: member.id,
      traits: {
        charge: chargeType,
        role: member?.slotKind === "personality"
          ? STRUCTURE_ARCHITRINO_ROLES.PERSONALITY_CHARGE
          : "member",
      },
      children: [],
    };
  }
  return {
    id: `${ownerId}/${member.id}`,
    kind: STRUCTURE_KINDS.PARTICLE,
    species: "animator_member",
    label: member.id,
    traits: {
      memberId: member.id,
    },
    children: [],
  };
}

function buildNoetherCoreNode(assemblyId, assembly, members) {
  const binaries = Array.isArray(assembly?.core?.binaries) ? assembly.core.binaries.filter(Boolean) : [];
  const personalityMembers = members
    .filter((member) => member?.slotKind === "personality" || Number.isFinite(Number(member?.slotIndex)))
    .sort((left, right) => Number(left?.slotIndex ?? 0) - Number(right?.slotIndex ?? 0));
  return {
    id: `${assemblyId}/core`,
    kind: STRUCTURE_KINDS.NOETHER_CORE,
    species: "noether_core",
    label: `${String(assembly?.name ?? assemblyId).trim() || assemblyId} core`,
    traits: { polarity: "pro" },
    children: STRUCTURE_SLOT_ORDER.map((slotName, slotIndex) => {
      const pair = [
        personalityMembers[slotIndex * 2] ?? { state: STRUCTURE_CHARGE_TYPES.ELECTRINO },
        personalityMembers[slotIndex * 2 + 1] ?? { state: STRUCTURE_CHARGE_TYPES.POSITRINO },
      ];
      const hasBinary = !!binaries[slotIndex];
      const hasPersonality = pair.some(Boolean);
      return {
        id: `${assemblyId}/core/${slotName}_slot`,
        kind: STRUCTURE_KINDS.SLOT,
        species: "slot",
        label: `${slotName} slot`,
        traits: { slot: slotName },
        children: hasBinary || hasPersonality
          ? [
              {
                id: `${assemblyId}/core/${slotName}_slot/pdb`,
                kind: STRUCTURE_KINDS.PERSONALITY_DRESSED_BINARY,
                species: "personality_dressed_binary",
                label: `${slotName} personality-dressed binary`,
                traits: { slot: slotName, variant: "animator_bridge" },
                children: [
                  ...(hasBinary
                    ? [createBinaryNode(`${assemblyId}/core/${slotName}_slot/pdb`, slotName)]
                    : []),
                  createPersonalityArchitrino(
                    `${assemblyId}/core/${slotName}_slot/pdb`,
                    inferArchitrinoCharge(pair[0]),
                    0
                  ),
                  createPersonalityArchitrino(
                    `${assemblyId}/core/${slotName}_slot/pdb`,
                    inferArchitrinoCharge(pair[1]),
                    1
                  ),
                ],
              },
            ]
          : [],
      };
    }),
  };
}

function buildSubassemblyNode(assemblyId, entry) {
  return {
    id: `${assemblyId}/${entry.id}`,
    kind: STRUCTURE_KINDS.COMPOSITE,
    species: "animator_subassembly",
    label: entry.id,
    transform: {
      position: Array.isArray(entry?.position) ? entry.position : [0, 0, 0],
    },
    children: entry.members.map((member) => createMemberNode(member, `${assemblyId}/${entry.id}`)),
  };
}

export function buildAnimatorAssemblyStructure(assembly = null) {
  if (!assembly?.id) {
    return { root: null, validation: { valid: false, errors: [] } };
  }
  const assemblyId = sanitizeId(assembly.id, "assembly");
  const members = normalizeMembers(assembly.members);
  const subassemblies = normalizeSubassemblies(assembly.subassemblies);
  const subassemblyMemberIds = new Set(subassemblies.flatMap((entry) => entry.members.map((member) => member.id)));
  const rootMembers = members.filter(
    (member) => !subassemblyMemberIds.has(member.id) && member?.slotKind !== "personality"
  );
  const root = {
    id: assemblyId,
    kind: STRUCTURE_KINDS.COMPOSITE,
    species: "animator_assembly",
    label: String(assembly?.name ?? assemblyId).trim() || assemblyId,
    traits: {
      sourceAssemblyId: assembly.id,
    },
    children: [
      ...(assembly?.core ? [buildNoetherCoreNode(assemblyId, assembly, members)] : []),
      ...subassemblies.map((entry) => buildSubassemblyNode(assemblyId, entry)),
      ...rootMembers.map((member) => createMemberNode(member, assemblyId)),
    ],
  };
  return {
    root,
    validation: validateStructureTree(root),
  };
}

export function summarizeAnimatorAssemblyStructure(root = null, validation = null) {
  if (!root) {
    return {
      nodeCount: 0,
      maxDepth: 0,
      kindCounts: {},
      slotCount: 0,
      binarySlotCount: 0,
      valid: false,
      errorCount: 0,
    };
  }
  const kindCounts = {};
  let nodeCount = 0;
  let maxDepth = 0;
  let slotCount = 0;
  let binarySlotCount = 0;
  walkStructure(root, (node, context) => {
    nodeCount += 1;
    const depth = Array.isArray(context?.path) ? context.path.length : 0;
    maxDepth = Math.max(maxDepth, depth);
    kindCounts[node.kind] = Number(kindCounts[node.kind] ?? 0) + 1;
    if (node.kind === STRUCTURE_KINDS.SLOT) {
      slotCount += 1;
      const hasBinary = Array.isArray(node.children) && node.children.some((child) =>
        Array.isArray(child?.children) && child.children.some((grandchild) => grandchild?.kind === STRUCTURE_KINDS.BINARY)
      );
      if (hasBinary) {
        binarySlotCount += 1;
      }
    }
  });
  return {
    nodeCount,
    maxDepth,
    kindCounts,
    slotCount,
    binarySlotCount,
    valid: !!validation?.valid,
    errorCount: Array.isArray(validation?.errors) ? validation.errors.length : 0,
  };
}

export function formatAnimatorAssemblyStructureSummary(summary = {}) {
  const nodeCount = Math.max(0, Number(summary?.nodeCount ?? 0) || 0);
  const slotCount = Math.max(0, Number(summary?.slotCount ?? 0) || 0);
  const binarySlotCount = Math.max(0, Number(summary?.binarySlotCount ?? 0) || 0);
  return `${nodeCount} node${nodeCount === 1 ? "" : "s"} • ${slotCount} slot${
    slotCount === 1 ? "" : "s"
  } • ${binarySlotCount} occupied binary slot${binarySlotCount === 1 ? "" : "s"}`;
}

export function formatAnimatorAssemblyStructureStatus(summary = {}, assembly = null) {
  const slotCount = Math.max(0, Number(summary?.slotCount ?? 0) || 0);
  const binarySlotCount = Math.max(0, Number(summary?.binarySlotCount ?? 0) || 0);
  const subassemblyCount = Array.isArray(assembly?.subassemblies) ? assembly.subassemblies.length : 0;
  const memberCount = Array.isArray(assembly?.members) ? assembly.members.length : 0;

  let label = "Assembly structure";
  if (slotCount > 0 || summary?.kindCounts?.noether_core > 0 || assembly?.core) {
    if (slotCount > 0 && binarySlotCount === slotCount) {
      label = "Noether core • full";
    } else if (slotCount > 0) {
      label = `Noether core • ${binarySlotCount}/${slotCount} binaries`;
    } else {
      label = "Noether core";
    }
  } else if (subassemblyCount > 0) {
    label = `Composite • ${subassemblyCount} group${subassemblyCount === 1 ? "" : "s"}`;
  } else if (memberCount > 0) {
    label = `Assembly • ${memberCount} member${memberCount === 1 ? "" : "s"}`;
  }

  if (summary?.valid === false) {
    return `${label} • warning`;
  }
  return label;
}
