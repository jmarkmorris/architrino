import { sanitizeComposerEntityId } from "./ComposerDraftScaffoldRuntime.js";

export function normalizeComposerMemberPosition(rawPosition) {
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

export function parseComposerMemberEntry(rawMember, index = 0) {
  if (rawMember && typeof rawMember === "object" && !Array.isArray(rawMember)) {
    const id = sanitizeComposerEntityId(rawMember.id || rawMember.name, `member_${index + 1}`);
    const position = normalizeComposerMemberPosition(rawMember.position);
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
  const id = sanitizeComposerEntityId(match[1], `member_${index + 1}`);
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

export function normalizeComposerMemberList(rawMembers) {
  if (Array.isArray(rawMembers)) {
    return rawMembers
      .map((member, index) => parseComposerMemberEntry(member, index))
      .filter(Boolean);
  }
  if (typeof rawMembers === "string") {
    return rawMembers
      .split(/\n/)
      .map((member, index) => parseComposerMemberEntry(member, index))
      .filter(Boolean);
  }
  return [];
}

export function getComposerMemberId(member, index = 0) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return sanitizeComposerEntityId(member.id, `member_${index + 1}`);
  }
  return sanitizeComposerEntityId(member, `member_${index + 1}`);
}

export function getComposerMemberPosition(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    return normalizeComposerMemberPosition(member.position);
  }
  return null;
}

export function getComposerMemberState(member) {
  if (member && typeof member === "object" && !Array.isArray(member)) {
    const state = String(member.state ?? "").trim().toLowerCase();
    if (state === "electrino" || state === "positrino" || state === "unset") {
      return state;
    }
  }
  return "";
}

export function isComposerPersonalityMember(member) {
  return (
    !!member &&
    typeof member === "object" &&
    !Array.isArray(member) &&
    String(member.slotKind ?? "").trim().toLowerCase() === "personality"
  );
}

export function formatComposerMemberList(members = []) {
  return members
    .map((member, index) => {
      const id = getComposerMemberId(member, index);
      const position = getComposerMemberPosition(member);
      return position ? `${id} @ ${position[0]}, ${position[1]}, ${position[2]}` : id;
    })
    .join("\n");
}

export function parseComposerSubassemblyEntry(rawEntry, index = 0) {
  if (rawEntry && typeof rawEntry === "object" && !Array.isArray(rawEntry)) {
    const id = sanitizeComposerEntityId(rawEntry.id || rawEntry.name, `subassembly_${index + 1}`);
    const position = normalizeComposerMemberPosition(rawEntry.position) ?? [0, 0, 0];
    const members = Array.isArray(rawEntry.members)
      ? rawEntry.members.map((memberId, memberIndex) => getComposerMemberId(memberId, memberIndex)).filter(Boolean)
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
  const id = sanitizeComposerEntityId(match[1], `subassembly_${index + 1}`);
  const position = [Number(match[2]), Number(match[3]), Number(match[4])];
  const members = match[5]
    .split(",")
    .map((memberId, memberIndex) => getComposerMemberId(memberId.trim(), memberIndex))
    .filter(Boolean);
  if (!position.every(Number.isFinite) || !members.length) {
    return null;
  }
  return { id, position, members: [...new Set(members)] };
}

export function normalizeComposerSubassemblyList(rawSubassemblies) {
  if (Array.isArray(rawSubassemblies)) {
    return rawSubassemblies
      .map((entry, index) => parseComposerSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  if (typeof rawSubassemblies === "string") {
    return rawSubassemblies
      .split(/\n/)
      .map((entry, index) => parseComposerSubassemblyEntry(entry, index))
      .filter(Boolean);
  }
  return [];
}

export function formatComposerSubassemblyList(subassemblies = []) {
  return subassemblies
    .map((entry, index) => {
      const parsed = parseComposerSubassemblyEntry(entry, index);
      if (!parsed) {
        return null;
      }
      return `${parsed.id} @ ${parsed.position[0]}, ${parsed.position[1]}, ${parsed.position[2]}: ${parsed.members.join(", ")}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function roundComposerTriplet(values = []) {
  return [
    Number(Number(values[0] ?? 0).toFixed(3)),
    Number(Number(values[1] ?? 0).toFixed(3)),
    Number(Number(values[2] ?? 0).toFixed(3)),
  ];
}

export function getComposerSubassemblyId(entry, index = 0) {
  return sanitizeComposerEntityId(entry?.id ?? entry?.name, `subassembly_${index + 1}`);
}

export function pruneComposerSubassemblyList(subassemblies = []) {
  return normalizeComposerSubassemblyList(subassemblies).filter(
    (entry) => Array.isArray(entry?.members) && entry.members.length
  );
}
