import { buildComposerAssemblyStructure } from "./ComposerAssemblyStructureBridgeRuntime.js";

function sanitizeId(rawValue = "", fallback = "node") {
  const normalized = String(rawValue ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "");
  return normalized || fallback;
}

function normalizeTriplet(values = []) {
  return [
    Number(Number(values?.[0] ?? 0).toFixed(3)),
    Number(Number(values?.[1] ?? 0).toFixed(3)),
    Number(Number(values?.[2] ?? 0).toFixed(3)),
  ];
}

function normalizeMemberPosition(rawPosition) {
  if (!Array.isArray(rawPosition) || rawPosition.length < 2) {
    return null;
  }
  const nextPosition = [
    Number(rawPosition[0] ?? 0),
    Number(rawPosition[1] ?? 0),
    Number(rawPosition[2] ?? 0),
  ];
  return nextPosition.every(Number.isFinite) ? nextPosition : null;
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
          position: normalizeMemberPosition(member.position),
        };
      }
      return {
        id: sanitizeId(member, `member_${index + 1}`),
        position: null,
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
        position: normalizeTriplet(entry.position ?? [0, 0, 0]),
        members: (Array.isArray(entry.members) ? entry.members : [])
          .map((member, memberIndex) => sanitizeId(member?.id ?? member, `member_${memberIndex + 1}`))
          .filter(Boolean),
      };
    })
    .filter(Boolean);
}

function getProxyMemberOffset(memberIndex, memberCount, baseRadius) {
  const safeCount = Math.max(1, Number(memberCount) || 1);
  const ringCapacity = Math.min(8, safeCount);
  const ringIndex = Math.floor(memberIndex / ringCapacity);
  const slotIndex = memberIndex % ringCapacity;
  const slotsThisRing = Math.min(ringCapacity, Math.max(1, safeCount - ringIndex * ringCapacity));
  const angle = (slotIndex / slotsThisRing) * Math.PI * 2;
  const orbitRadius = baseRadius + 0.11 + ringIndex * 0.09;
  const zOffset = ringIndex === 0 ? 0 : (ringIndex % 2 === 0 ? 0.05 : -0.05);
  return [
    Math.cos(angle) * orbitRadius,
    Math.sin(angle) * orbitRadius,
    zOffset,
  ];
}

function getCanonicalSubassemblyMemberIds(root, assemblyId, subassemblyId) {
  const targetNodeId = `${assemblyId}/${subassemblyId}`;
  const children = Array.isArray(root?.children) ? root.children : [];
  const targetNode = children.find(
    (node) => node?.id === targetNodeId && node?.species === "composer_subassembly"
  );
  if (!targetNode) {
    return [];
  }
  return (Array.isArray(targetNode.children) ? targetNode.children : [])
    .map((child) => sanitizeId(child?.traits?.memberId ?? child?.label ?? child?.id, ""))
    .filter(Boolean);
}

export function splitComposerAssemblyGroup(assembly = null, subassemblyId = "") {
  if (!assembly?.id) {
    return null;
  }
  const normalizedAssemblyId = sanitizeId(assembly.id, "assembly");
  const normalizedSubassemblyId = sanitizeId(subassemblyId, "");
  if (!normalizedSubassemblyId) {
    return null;
  }

  const structure = buildComposerAssemblyStructure(assembly);
  const root = structure?.root ?? null;
  if (!root) {
    return null;
  }

  const members = normalizeMembers(assembly.members);
  const subassemblies = normalizeSubassemblies(assembly.subassemblies);
  const targetSubassembly = subassemblies.find((entry) => entry.id === normalizedSubassemblyId);
  if (!targetSubassembly) {
    return null;
  }

  const targetMemberIds = getCanonicalSubassemblyMemberIds(
    root,
    normalizedAssemblyId,
    normalizedSubassemblyId
  );
  if (!targetMemberIds.length) {
    return null;
  }

  const targetMemberSet = new Set(targetMemberIds);
  const orderedTargetMembers = members.filter((member) => targetMemberSet.has(member.id));
  const childRadius = 0.11 + Math.min(orderedTargetMembers.length, 6) * 0.016;
  const memberOffsetById = new Map(
    orderedTargetMembers.map((member, index) => [
      member.id,
      member.position ?? getProxyMemberOffset(index, orderedTargetMembers.length, childRadius),
    ])
  );

  const nextMembers = members.map((member) => {
    if (!targetMemberSet.has(member.id)) {
      return member;
    }
    const localOffset = memberOffsetById.get(member.id) ?? [0, 0, 0];
    return {
      ...member,
      position: normalizeTriplet([
        Number(targetSubassembly.position?.[0] ?? 0) + Number(localOffset[0] ?? 0),
        Number(targetSubassembly.position?.[1] ?? 0) + Number(localOffset[1] ?? 0),
        Number(targetSubassembly.position?.[2] ?? 0) + Number(localOffset[2] ?? 0),
      ]),
    };
  });

  return {
    ...assembly,
    members: nextMembers,
    subassemblies: subassemblies.filter((entry) => entry.id !== normalizedSubassemblyId),
  };
}
