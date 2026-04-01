import { sanitizeComposerEntityId } from "./ComposerDraftScaffoldRuntime.js";
import {
  getComposerMemberId,
  getComposerSubassemblyId,
  isComposerPersonalityMember,
  normalizeComposerMemberList,
  normalizeComposerMemberPosition,
  normalizeComposerSubassemblyList,
  pruneComposerSubassemblyList,
  roundComposerTriplet,
} from "./ComposerAssemblyListRuntime.js";

export function createComposerAssemblyAuthoringRuntime(options = {}) {
  const getComposerAssemblyDraftById =
    typeof options.getComposerAssemblyDraftById === "function"
      ? options.getComposerAssemblyDraftById
      : () => null;
  const updateComposerAssemblyDraftByIdState =
    typeof options.updateComposerAssemblyDraftByIdState === "function"
      ? options.updateComposerAssemblyDraftByIdState
      : () => null;
  const setComposerStatus =
    typeof options.setComposerStatus === "function" ? options.setComposerStatus : () => {};
  const getComposerPersonalityMembers =
    typeof options.getComposerPersonalityMembers === "function"
      ? options.getComposerPersonalityMembers
      : () => [];
  const getComposerProxyMemberOffset =
    typeof options.getComposerProxyMemberOffset === "function"
      ? options.getComposerProxyMemberOffset
      : () => ({ x: 0, y: 0, z: 0 });
  const splitComposerAssemblyGroupRuntime =
    typeof options.splitComposerAssemblyGroupRuntime === "function"
      ? options.splitComposerAssemblyGroupRuntime
      : () => null;

  function getNextComposerAssemblyMemberId(assembly, kind = "member") {
    const normalizedKind = sanitizeComposerEntityId(kind, "member");
    const existingIds = new Set(
      normalizeComposerMemberList(assembly?.members).map((member, index) =>
        getComposerMemberId(member, index)
      )
    );
    let suffix = 1;
    let candidate = `${normalizedKind}_${suffix}`;
    while (existingIds.has(candidate)) {
      suffix += 1;
      candidate = `${normalizedKind}_${suffix}`;
    }
    return candidate;
  }

  function getNextComposerPersonalitySlotIndex(assembly) {
    const members = normalizeComposerMemberList(assembly?.members);
    const usedSlots = new Set(
      members
        .filter((member) => isComposerPersonalityMember(member))
        .map((member, index) => Math.max(0, Number(member?.slotIndex ?? index) || 0))
    );
    let slotIndex = 0;
    while (usedSlots.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function getComposerPersonalitySlotCapacity(assembly) {
    const binaryCount = Array.isArray(assembly?.core?.binaries)
      ? assembly.core.binaries.filter(Boolean).length
      : 0;
    if (binaryCount <= 1) {
      return 2;
    }
    if (binaryCount === 2) {
      return 4;
    }
    return 6;
  }

  function getComposerAvailablePersonalitySlotCount(assembly) {
    const capacity = getComposerPersonalitySlotCapacity(assembly);
    const usedCount = getComposerPersonalityMembers(assembly).length;
    return Math.max(0, capacity - usedCount);
  }

  function addComposerAssemblyMemberByKind(assembly, kind = "member") {
    if (!assembly?.id) {
      return false;
    }
    const nextMembers = normalizeComposerMemberList(assembly.members);
    const normalizedKind = sanitizeComposerEntityId(kind, "member");
    const isChargeKind = normalizedKind === "electrino" || normalizedKind === "positrino";
    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (isChargeKind && hasCore) {
      if (getComposerAvailablePersonalitySlotCount(assembly) <= 0) {
        setComposerStatus(
          `Personality layer is full for this core. Capacity is ${getComposerPersonalitySlotCapacity(assembly)} charge slot${
            getComposerPersonalitySlotCapacity(assembly) === 1 ? "" : "s"
          }.`
        );
        return false;
      }
      const slotIndex = getNextComposerPersonalitySlotIndex(assembly);
      nextMembers.push({
        id: `personality_${slotIndex + 1}`,
        slotKind: "personality",
        slotIndex,
        state: normalizedKind,
      });
    } else {
      nextMembers.push({ id: getNextComposerAssemblyMemberId(assembly, normalizedKind) });
    }
    updateComposerAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: nextMembers,
    }));
    return true;
  }

  function getNextComposerSubassemblyId(assembly) {
    const existingIds = new Set(
      normalizeComposerSubassemblyList(assembly?.subassemblies).map((entry, index) =>
        getComposerSubassemblyId(entry, index)
      )
    );
    let suffix = 1;
    let candidate = `subassembly_${suffix}`;
    while (existingIds.has(candidate)) {
      suffix += 1;
      candidate = `subassembly_${suffix}`;
    }
    return candidate;
  }

  function getComposerAssemblySubassemblyIndex(assembly, subassemblyId) {
    const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
    return subassemblies.findIndex(
      (entry, index) => getComposerSubassemblyId(entry, index) === subassemblyId
    );
  }

  function getComposerMemberSubassemblyId(assembly, memberId) {
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!normalizedMemberId) {
      return "";
    }
    const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
    const match = subassemblies.find(
      (entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId)
    );
    return match ? getComposerSubassemblyId(match) : "";
  }

  function ensureComposerAssemblyMemberRecord(assembly, memberId) {
    if (!assembly?.id) {
      return null;
    }
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!normalizedMemberId) {
      return null;
    }
    const members = normalizeComposerMemberList(assembly.members);
    const memberIndex = members.findIndex(
      (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
    );
    if (memberIndex === -1) {
      return null;
    }
    const member = members[memberIndex];
    members[memberIndex] =
      member && typeof member === "object" && !Array.isArray(member)
        ? { ...member, id: normalizedMemberId }
        : { id: normalizedMemberId };
    const updatedAssembly = updateComposerAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members,
    }));
    return normalizeComposerMemberList(updatedAssembly?.members)[memberIndex] ?? null;
  }

  function resolveComposerAssemblyMemberLocalOffset(assembly, memberId) {
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!normalizedMemberId) {
      return [0, 0, 0];
    }
    const members = normalizeComposerMemberList(assembly?.members);
    const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
    const memberMap = new Map(
      members.map((entry, index) => [getComposerMemberId(entry, index), entry])
    );
    const memberEntry = memberMap.get(normalizedMemberId);
    if (!memberEntry) {
      return [0, 0, 0];
    }
    const ownerSubassembly = subassemblies.find(
      (entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId)
    );
    if (ownerSubassembly) {
      const childMembers = members.filter((entry, index) =>
        (ownerSubassembly.members ?? []).includes(getComposerMemberId(entry, index))
      );
      const childIndex = childMembers.findIndex(
        (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
      );
      const childRadius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
      const childPosition = normalizeComposerMemberPosition(ownerSubassembly.position) ?? [0, 0, 0];
      const fallbackOffset = getComposerProxyMemberOffset(childIndex, childMembers.length, childRadius);
      const localOffset = memberEntry.position
        ? memberEntry.position
        : [fallbackOffset.x, fallbackOffset.y, fallbackOffset.z];
      return roundComposerTriplet([
        Number(childPosition[0] ?? 0) + Number(localOffset[0] ?? 0),
        Number(childPosition[1] ?? 0) + Number(localOffset[1] ?? 0),
        Number(childPosition[2] ?? 0) + Number(localOffset[2] ?? 0),
      ]);
    }
    const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
    const rootMembers = members.filter(
      (entry, index) => !childMemberIds.has(getComposerMemberId(entry, index))
    );
    const rootIndex = rootMembers.findIndex(
      (entry, index) => getComposerMemberId(entry, index) === normalizedMemberId
    );
    const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
    if (memberEntry.position) {
      return roundComposerTriplet(memberEntry.position);
    }
    const fallbackOffset = getComposerProxyMemberOffset(rootIndex, rootMembers.length, baseRadius);
    return roundComposerTriplet([fallbackOffset.x, fallbackOffset.y, fallbackOffset.z]);
  }

  function setComposerAssemblyMemberPosition(assembly, memberId, position, subassemblyId = "") {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!normalizedMemberId) {
      return false;
    }
    if (!ensureComposerAssemblyMemberRecord(liveAssembly, normalizedMemberId)) {
      return false;
    }
    const nextPosition = roundComposerTriplet(position);
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeComposerMemberList(currentAssembly?.members).map((entry, index) => {
        const entryId = getComposerMemberId(entry, index);
        if (entryId !== normalizedMemberId) {
          return entry;
        }
        const nextEntry =
          entry && typeof entry === "object" && !Array.isArray(entry)
            ? { ...entry, id: normalizedMemberId }
            : { id: normalizedMemberId };
        nextEntry.position = nextPosition;
        return nextEntry;
      }),
    }));
    if (subassemblyId) {
      const subassemblies = normalizeComposerSubassemblyList(liveAssembly?.subassemblies);
      const subassemblyIndex = subassemblies.findIndex(
        (entry, index) => getComposerSubassemblyId(entry, index) === subassemblyId
      );
      if (subassemblyIndex === -1) {
        return false;
      }
      updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
        ...currentAssembly,
        subassemblies,
      }));
    }
    return true;
  }

  function setComposerSubassemblyPosition(assembly, subassemblyId, position) {
    const normalizedSubassemblyId = sanitizeComposerEntityId(subassemblyId, "");
    if (!assembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const subassemblies = normalizeComposerSubassemblyList(assembly?.subassemblies);
    const subassemblyIndex = subassemblies.findIndex(
      (entry, index) => getComposerSubassemblyId(entry, index) === normalizedSubassemblyId
    );
    if (subassemblyIndex === -1) {
      return false;
    }
    subassemblies[subassemblyIndex].position = roundComposerTriplet(position);
    updateComposerAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies,
    }));
    return true;
  }

  function moveComposerMemberToRoot(assembly, memberId) {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    const localOffset = resolveComposerAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizeComposerSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneComposerSubassemblyList(subassemblies),
    }));
    return setComposerAssemblyMemberPosition(liveAssembly, normalizedMemberId, localOffset);
  }

  function moveComposerMemberToSubassembly(assembly, memberId, targetSubassemblyId) {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    const normalizedTargetId = sanitizeComposerEntityId(targetSubassemblyId, "");
    if (!liveAssembly?.id || !normalizedMemberId || !normalizedTargetId) {
      return false;
    }
    const localOffset = resolveComposerAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizeComposerSubassemblyList(liveAssembly?.subassemblies).map((entry, index) => ({
      ...entry,
      id: getComposerSubassemblyId(entry, index),
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    const subassemblyIndex = subassemblies.findIndex((entry) => entry.id === normalizedTargetId);
    if (subassemblyIndex === -1) {
      return false;
    }
    const childPosition =
      normalizeComposerMemberPosition(subassemblies[subassemblyIndex].position) ?? [0, 0, 0];
    subassemblies[subassemblyIndex].members = [
      ...new Set([...(subassemblies[subassemblyIndex].members ?? []), normalizedMemberId]),
    ];
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneComposerSubassemblyList(subassemblies),
    }));
    return setComposerAssemblyMemberPosition(liveAssembly, normalizedMemberId, [
      Number(localOffset[0] ?? 0) - Number(childPosition[0] ?? 0),
      Number(localOffset[1] ?? 0) - Number(childPosition[1] ?? 0),
      Number(localOffset[2] ?? 0) - Number(childPosition[2] ?? 0),
    ]);
  }

  function createComposerSubassemblyFromMembers(assembly, memberIds = []) {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberIds = [
      ...new Set(
        (Array.isArray(memberIds) ? memberIds : [])
          .map((memberId) => sanitizeComposerEntityId(memberId, ""))
          .filter(Boolean)
      ),
    ];
    if (!liveAssembly?.id || !normalizedMemberIds.length) {
      return null;
    }
    const memberOffsets = normalizedMemberIds.map((memberId) =>
      resolveComposerAssemblyMemberLocalOffset(liveAssembly, memberId)
    );
    const centroid = memberOffsets
      .reduce(
        (accumulator, offset) => [
          accumulator[0] + Number(offset[0] ?? 0),
          accumulator[1] + Number(offset[1] ?? 0),
          accumulator[2] + Number(offset[2] ?? 0),
        ],
        [0, 0, 0]
      )
      .map((value) => value / normalizedMemberIds.length);
    const nextId = getNextComposerSubassemblyId(liveAssembly);
    const subassemblies = normalizeComposerSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((memberId) => !normalizedMemberIds.includes(memberId)),
    }));
    subassemblies.push({
      id: nextId,
      position: roundComposerTriplet(centroid),
      members: normalizedMemberIds,
    });
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneComposerSubassemblyList(subassemblies),
    }));
    normalizedMemberIds.forEach((memberId, index) => {
      const offset = memberOffsets[index] ?? [0, 0, 0];
      setComposerAssemblyMemberPosition(
        liveAssembly,
        memberId,
        [
          Number(offset[0] ?? 0) - Number(centroid[0] ?? 0),
          Number(offset[1] ?? 0) - Number(centroid[1] ?? 0),
          Number(offset[2] ?? 0) - Number(centroid[2] ?? 0),
        ],
        nextId
      );
    });
    return nextId;
  }

  function splitComposerAssemblyGroup(assembly, subassemblyId) {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedSubassemblyId = sanitizeComposerEntityId(subassemblyId, "");
    if (!liveAssembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const nextAssembly = splitComposerAssemblyGroupRuntime(liveAssembly, normalizedSubassemblyId);
    if (!nextAssembly) {
      return false;
    }
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeComposerMemberList(nextAssembly.members),
      subassemblies: pruneComposerSubassemblyList(nextAssembly.subassemblies),
    }));
    return true;
  }

  function removeComposerAssemblyMember(assembly, memberId) {
    const liveAssembly = assembly?.id ? getComposerAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeComposerEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    updateComposerAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeComposerMemberList(currentAssembly?.members).filter(
        (entry, index) => getComposerMemberId(entry, index) !== normalizedMemberId
      ),
      subassemblies: pruneComposerSubassemblyList(
        normalizeComposerSubassemblyList(currentAssembly?.subassemblies).map((entry) => ({
          ...entry,
          members: (entry.members ?? []).filter(
            (entryMemberId) => entryMemberId !== normalizedMemberId
          ),
        }))
      ),
    }));
    return true;
  }

  return {
    addComposerAssemblyMemberByKind,
    createComposerSubassemblyFromMembers,
    ensureComposerAssemblyMemberRecord,
    getComposerAssemblySubassemblyIndex,
    getComposerAvailablePersonalitySlotCount,
    getComposerMemberSubassemblyId,
    getComposerPersonalitySlotCapacity,
    getNextComposerAssemblyMemberId,
    getNextComposerPersonalitySlotIndex,
    getNextComposerSubassemblyId,
    moveComposerMemberToRoot,
    moveComposerMemberToSubassembly,
    removeComposerAssemblyMember,
    resolveComposerAssemblyMemberLocalOffset,
    setComposerAssemblyMemberPosition,
    setComposerSubassemblyPosition,
    splitComposerAssemblyGroup,
  };
}
