import { sanitizeAnimatorEntityId } from "./AnimatorDraftScaffoldRuntime.js";

export function normalizeAnimatorMemberPosition(rawPosition) {
  if (!Array.isArray(rawPosition) || rawPosition.length < 3) {
    return null;
  }
  const x = Number(rawPosition[0]);
  const y = Number(rawPosition[1]);
  const z = Number(rawPosition[2]);
  if (![x, y, z].every(Number.isFinite)) {
    return null;
  }
  return [x, y, z];
}

export function parseAnimatorMemberEntry(rawMember, index = 0) {
  if (rawMember && typeof rawMember === "object" && !Array.isArray(rawMember)) {
    const id = sanitizeAnimatorEntityId(rawMember.id || rawMember.name, `member_${index + 1}`);
    const position = normalizeAnimatorMemberPosition(rawMember.position);
    const nextMember = {
      id,
    };
    if (position) {
      nextMember.position = position;
    }
    if (rawMember.state != null) {
      nextMember.state = String(rawMember.state).trim().toLowerCase();
    }
    if (rawMember.slotKind != null) {
      nextMember.slotKind = String(rawMember.slotKind).trim().toLowerCase();
    }
    if (rawMember.slotIndex != null && Number.isFinite(Number(rawMember.slotIndex))) {
      nextMember.slotIndex = Math.max(0, Math.round(Number(rawMember.slotIndex)));
    }
    return nextMember;
  }
  const source = String(rawMember ?? "").trim();
  if (!source) {
    return null;
  }
  const match = source.match(/^(.+?)(?:\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+))?$/);
  if (!match) {
    return null;
  }
  const id = sanitizeAnimatorEntityId(match[1], `member_${index + 1}`);
  if (!id) {
    return null;
  }
  if (match[2] == null) {
    return { id };
  }
  const position = [Number(match[2]), Number(match[3]), Number(match[4])];
  if (!position.every(Number.isFinite)) {
    return { id };
  }
  return { id, position };
}

export function normalizeAnimatorMemberList(rawMembers) {
  if (Array.isArray(rawMembers)) {
    return rawMembers
      .map((member, index) => parseAnimatorMemberEntry(member, index))
      .filter(Boolean);
  }
  if (typeof rawMembers === "string") {
    return rawMembers
      .split(/\n/)
      .map((member, index) => parseAnimatorMemberEntry(member, index))
      .filter(Boolean);
  }
  return [];
}

export function getAnimatorMemberId(member, index = 0) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return sanitizeAnimatorEntityId(member.id, `member_${index + 1}`);
  }
  return sanitizeAnimatorEntityId(member, `member_${index + 1}`);
}

export function getAnimatorMemberPosition(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return normalizeAnimatorMemberPosition(member.position);
  }
  return null;
}

export function getAnimatorMemberState(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    const state = String(member.state ?? "").trim().toLowerCase();
    if (state === "electrino" || state === "positrino" || state === "unset") {
      return state;
    }
  }
  return "";
}

export function isAnimatorPersonalityMember(member) {
  return (
    !!member &&
    typeof member === "object" &&
    !Array.isArray(member) &&
    String(member.slotKind ?? "").trim().toLowerCase() === "personality"
  );
}

export function formatAnimatorMemberList(members = []) {
  return members
    .map((member, index) => {
      const id = getAnimatorMemberId(member, index);
      const position = getAnimatorMemberPosition(member);
      return position ? `${id} @ ${position[0]}, ${position[1]}, ${position[2]}` : id;
    })
    .join("\n");
}

export function parseAnimatorSubassemblyEntry(rawEntry, index = 0) {
  if (rawEntry && typeof rawEntry === "object" && !Array.isArray(rawEntry)) {
    const id = sanitizeAnimatorEntityId(rawEntry.id || rawEntry.name, `subassembly_${index + 1}`);
    const position = normalizeAnimatorMemberPosition(rawEntry.position) ?? [0, 0, 0];
    const members = Array.isArray(rawEntry.members)
      ? rawEntry.members.map((memberId, memberIndex) => getAnimatorMemberId(memberId, memberIndex)).filter(Boolean)
      : [];
    return { id, position, members };
  }
  const source = String(rawEntry ?? "").trim();
  if (!source) {
    return null;
  }
  const match = source.match(
    /^(.+?)\s*@\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*:\s*(.+)$/
  );
  if (!match) {
    return null;
  }
  const id = sanitizeAnimatorEntityId(match[1], `subassembly_${index + 1}`);
  const position = [Number(match[2]), Number(match[3]), Number(match[4])];
  const members = match[5]
    .split(",")
    .map((memberId, memberIndex) => getAnimatorMemberId(memberId.trim(), memberIndex))
    .filter(Boolean);
  if (!position.every(Number.isFinite) || !members.length) {
    return null;
  }
  return { id, position, members: [...new Set(members)] };
}

export function normalizeAnimatorSubassemblyList(rawSubassemblies) {
  if (Array.isArray(rawSubassemblies)) {
    return rawSubassemblies
      .map((entry, index) => parseAnimatorSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  if (typeof rawSubassemblies === "string") {
    return rawSubassemblies
      .split(/\n/)
      .map((entry, index) => parseAnimatorSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  return [];
}

export function formatAnimatorSubassemblyList(subassemblies = []) {
  return subassemblies
    .map((entry, index) => {
      const parsed = parseAnimatorSubassemblyEntry(entry, index);
      if (!parsed) {
        return null;
      }
      return `${parsed.id} @ ${parsed.position[0]}, ${parsed.position[1]}, ${parsed.position[2]}: ${parsed.members.join(", ")}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function roundAnimatorTriplet(values = []) {
  return [
    Number(Number(values[0] ?? 0).toFixed(3)),
    Number(Number(values[1] ?? 0).toFixed(3)),
    Number(Number(values[2] ?? 0).toFixed(3)),
  ];
}

export function getAnimatorSubassemblyId(entry, index = 0) {
  return sanitizeAnimatorEntityId(entry?.id ?? entry?.name, `subassembly_${index + 1}`);
}

export function pruneAnimatorSubassemblyList(subassemblies = []) {
  return normalizeAnimatorSubassemblyList(subassemblies).filter(
    (entry) => Array.isArray(entry?.members) && entry.members.length
  );
}
