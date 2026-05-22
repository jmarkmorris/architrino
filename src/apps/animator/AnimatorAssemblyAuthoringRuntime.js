import { sanitizeAnimatorEntityId } from "./AnimatorDraftScaffoldRuntime.js";
import {
  getAnimatorMemberId,
  getAnimatorSubassemblyId,
  isAnimatorPersonalityMember,
  normalizeAnimatorMemberList,
  normalizeAnimatorMemberPosition,
  normalizeAnimatorSubassemblyList,
  pruneAnimatorSubassemblyList,
  roundAnimatorTriplet,
} from "./AnimatorAssemblyListRuntime.js";

export function createAnimatorAssemblyAuthoringRuntime(options = {}) {
  const getAnimatorAssemblyDraftById =
    typeof options.getAnimatorAssemblyDraftById === "function"
      ? options.getAnimatorAssemblyDraftById
      : () => null;
  const updateAnimatorAssemblyDraftByIdState =
    typeof options.updateAnimatorAssemblyDraftByIdState === "function"
      ? options.updateAnimatorAssemblyDraftByIdState
      : () => null;
  const setAnimatorStatus =
    typeof options.setAnimatorStatus === "function" ? options.setAnimatorStatus : () => {};
  const getAnimatorPersonalityMembers =
    typeof options.getAnimatorPersonalityMembers === "function"
      ? options.getAnimatorPersonalityMembers
      : () => [];
  const getAnimatorProxyMemberOffset =
    typeof options.getAnimatorProxyMemberOffset === "function"
      ? options.getAnimatorProxyMemberOffset
      : () => ({ x: 0, y: 0, z: 0 });
  const splitAnimatorAssemblyGroupRuntime =
    typeof options.splitAnimatorAssemblyGroupRuntime === "function"
      ? options.splitAnimatorAssemblyGroupRuntime
      : () => null;

  function getNextAnimatorAssemblyMemberId(assembly, kind = "member") {
    const normalizedKind = sanitizeAnimatorEntityId(kind, "member");
    const existingIds = new Set(
      normalizeAnimatorMemberList(assembly?.members).map((member, index) =>
        getAnimatorMemberId(member, index)
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

  function getNextAnimatorPersonalitySlotIndex(assembly) {
    const members = normalizeAnimatorMemberList(assembly?.members);
    const usedSlots = new Set(
      members
        .filter((member) => isAnimatorPersonalityMember(member))
        .map((member, index) => Math.max(0, Number(member?.slotIndex ?? index) || 0))
    );
    let slotIndex = 0;
    while (usedSlots.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function getAnimatorPersonalitySlotCapacity(assembly) {
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

  function getAnimatorAvailablePersonalitySlotCount(assembly) {
    const capacity = getAnimatorPersonalitySlotCapacity(assembly);
    const usedCount = getAnimatorPersonalityMembers(assembly).length;
    return Math.max(0, capacity - usedCount);
  }

  function addAnimatorAssemblyMemberByKind(assembly, kind = "member") {
    if (!assembly?.id) {
      return false;
    }
    const nextMembers = normalizeAnimatorMemberList(assembly.members);
    const normalizedKind = sanitizeAnimatorEntityId(kind, "member");
    const isChargeKind = normalizedKind === "electrino" || normalizedKind === "positrino";
    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (isChargeKind && hasCore) {
      if (getAnimatorAvailablePersonalitySlotCount(assembly) <= 0) {
        setAnimatorStatus(
          `Personality layer is full for this Noether swarm. Capacity is ${getAnimatorPersonalitySlotCapacity(assembly)} charge slot${
            getAnimatorPersonalitySlotCapacity(assembly) === 1 ? "" : "s"
          }.`
        );
        return false;
      }
      const slotIndex = getNextAnimatorPersonalitySlotIndex(assembly);
      nextMembers.push({
        id: `personality_${slotIndex + 1}`,
        slotKind: "personality",
        slotIndex,
        state: normalizedKind,
      });
    } else {
      nextMembers.push({ id: getNextAnimatorAssemblyMemberId(assembly, normalizedKind) });
    }
    updateAnimatorAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: nextMembers,
    }));
    return true;
  }

  function getNextAnimatorSubassemblyId(assembly) {
    const existingIds = new Set(
      normalizeAnimatorSubassemblyList(assembly?.subassemblies).map((entry, index) =>
        getAnimatorSubassemblyId(entry, index)
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

  function getAnimatorAssemblySubassemblyIndex(assembly, subassemblyId) {
    const subassemblies = normalizeAnimatorSubassemblyList(assembly?.subassemblies);
    return subassemblies.findIndex(
      (entry, index) => getAnimatorSubassemblyId(entry, index) === subassemblyId
    );
  }

  function getAnimatorMemberSubassemblyId(assembly, memberId) {
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!normalizedMemberId) {
      return "";
    }
    const subassemblies = normalizeAnimatorSubassemblyList(assembly?.subassemblies);
    const match = subassemblies.find(
      (entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId)
    );
    return match ? getAnimatorSubassemblyId(match) : "";
  }

  function ensureAnimatorAssemblyMemberRecord(assembly, memberId) {
    if (!assembly?.id) {
      return null;
    }
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!normalizedMemberId) {
      return null;
    }
    const members = normalizeAnimatorMemberList(assembly.members);
    const memberIndex = members.findIndex(
      (entry, index) => getAnimatorMemberId(entry, index) === normalizedMemberId
    );
    if (memberIndex === -1) {
      return null;
    }
    const member = members[memberIndex];
    members[memberIndex] =
      member && typeof member === "object" && !Array.isArray(member)
        ? { ...member, id: normalizedMemberId }
        : { id: normalizedMemberId };
    const updatedAssembly = updateAnimatorAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members,
    }));
    return normalizeAnimatorMemberList(updatedAssembly?.members)[memberIndex] ?? null;
  }

  function resolveAnimatorAssemblyMemberLocalOffset(assembly, memberId) {
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!normalizedMemberId) {
      return [0, 0, 0];
    }
    const members = normalizeAnimatorMemberList(assembly?.members);
    const subassemblies = normalizeAnimatorSubassemblyList(assembly?.subassemblies);
    const memberMap = new Map(
      members.map((entry, index) => [getAnimatorMemberId(entry, index), entry])
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
        (ownerSubassembly.members ?? []).includes(getAnimatorMemberId(entry, index))
      );
      const childIndex = childMembers.findIndex(
        (entry, index) => getAnimatorMemberId(entry, index) === normalizedMemberId
      );
      const childRadius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
      const childPosition = normalizeAnimatorMemberPosition(ownerSubassembly.position) ?? [0, 0, 0];
      const fallbackOffset = getAnimatorProxyMemberOffset(childIndex, childMembers.length, childRadius);
      const localOffset = memberEntry.position
        ? memberEntry.position
        : [fallbackOffset.x, fallbackOffset.y, fallbackOffset.z];
      return roundAnimatorTriplet([
        Number(childPosition[0] ?? 0) + Number(localOffset[0] ?? 0),
        Number(childPosition[1] ?? 0) + Number(localOffset[1] ?? 0),
        Number(childPosition[2] ?? 0) + Number(localOffset[2] ?? 0),
      ]);
    }
    const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
    const rootMembers = members.filter(
      (entry, index) => !childMemberIds.has(getAnimatorMemberId(entry, index))
    );
    const rootIndex = rootMembers.findIndex(
      (entry, index) => getAnimatorMemberId(entry, index) === normalizedMemberId
    );
    const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
    if (memberEntry.position) {
      return roundAnimatorTriplet(memberEntry.position);
    }
    const fallbackOffset = getAnimatorProxyMemberOffset(rootIndex, rootMembers.length, baseRadius);
    return roundAnimatorTriplet([fallbackOffset.x, fallbackOffset.y, fallbackOffset.z]);
  }

  function setAnimatorAssemblyMemberPosition(assembly, memberId, position, subassemblyId = "") {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!normalizedMemberId) {
      return false;
    }
    if (!ensureAnimatorAssemblyMemberRecord(liveAssembly, normalizedMemberId)) {
      return false;
    }
    const nextPosition = roundAnimatorTriplet(position);
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeAnimatorMemberList(currentAssembly?.members).map((entry, index) => {
        const entryId = getAnimatorMemberId(entry, index);
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
      const subassemblies = normalizeAnimatorSubassemblyList(liveAssembly?.subassemblies);
      const subassemblyIndex = subassemblies.findIndex(
        (entry, index) => getAnimatorSubassemblyId(entry, index) === subassemblyId
      );
      if (subassemblyIndex === -1) {
        return false;
      }
      updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
        ...currentAssembly,
        subassemblies,
      }));
    }
    return true;
  }

  function setAnimatorSubassemblyPosition(assembly, subassemblyId, position) {
    const normalizedSubassemblyId = sanitizeAnimatorEntityId(subassemblyId, "");
    if (!assembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const subassemblies = normalizeAnimatorSubassemblyList(assembly?.subassemblies);
    const subassemblyIndex = subassemblies.findIndex(
      (entry, index) => getAnimatorSubassemblyId(entry, index) === normalizedSubassemblyId
    );
    if (subassemblyIndex === -1) {
      return false;
    }
    subassemblies[subassemblyIndex].position = roundAnimatorTriplet(position);
    updateAnimatorAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies,
    }));
    return true;
  }

  function moveAnimatorMemberToRoot(assembly, memberId) {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    const localOffset = resolveAnimatorAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizeAnimatorSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneAnimatorSubassemblyList(subassemblies),
    }));
    return setAnimatorAssemblyMemberPosition(liveAssembly, normalizedMemberId, localOffset);
  }

  function moveAnimatorMemberToSubassembly(assembly, memberId, targetSubassemblyId) {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    const normalizedTargetId = sanitizeAnimatorEntityId(targetSubassemblyId, "");
    if (!liveAssembly?.id || !normalizedMemberId || !normalizedTargetId) {
      return false;
    }
    const localOffset = resolveAnimatorAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizeAnimatorSubassemblyList(liveAssembly?.subassemblies).map((entry, index) => ({
      ...entry,
      id: getAnimatorSubassemblyId(entry, index),
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    const subassemblyIndex = subassemblies.findIndex((entry) => entry.id === normalizedTargetId);
    if (subassemblyIndex === -1) {
      return false;
    }
    const childPosition =
      normalizeAnimatorMemberPosition(subassemblies[subassemblyIndex].position) ?? [0, 0, 0];
    subassemblies[subassemblyIndex].members = [
      ...new Set([...(subassemblies[subassemblyIndex].members ?? []), normalizedMemberId]),
    ];
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneAnimatorSubassemblyList(subassemblies),
    }));
    return setAnimatorAssemblyMemberPosition(liveAssembly, normalizedMemberId, [
      Number(localOffset[0] ?? 0) - Number(childPosition[0] ?? 0),
      Number(localOffset[1] ?? 0) - Number(childPosition[1] ?? 0),
      Number(localOffset[2] ?? 0) - Number(childPosition[2] ?? 0),
    ]);
  }

  function createAnimatorSubassemblyFromMembers(assembly, memberIds = []) {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberIds = [
      ...new Set(
        (Array.isArray(memberIds) ? memberIds : [])
          .map((memberId) => sanitizeAnimatorEntityId(memberId, ""))
          .filter(Boolean)
      ),
    ];
    if (!liveAssembly?.id || !normalizedMemberIds.length) {
      return null;
    }
    const memberOffsets = normalizedMemberIds.map((memberId) =>
      resolveAnimatorAssemblyMemberLocalOffset(liveAssembly, memberId)
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
    const nextId = getNextAnimatorSubassemblyId(liveAssembly);
    const subassemblies = normalizeAnimatorSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((memberId) => !normalizedMemberIds.includes(memberId)),
    }));
    subassemblies.push({
      id: nextId,
      position: roundAnimatorTriplet(centroid),
      members: normalizedMemberIds,
    });
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: pruneAnimatorSubassemblyList(subassemblies),
    }));
    normalizedMemberIds.forEach((memberId, index) => {
      const offset = memberOffsets[index] ?? [0, 0, 0];
      setAnimatorAssemblyMemberPosition(
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

  function splitAnimatorAssemblyGroup(assembly, subassemblyId) {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedSubassemblyId = sanitizeAnimatorEntityId(subassemblyId, "");
    if (!liveAssembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const nextAssembly = splitAnimatorAssemblyGroupRuntime(liveAssembly, normalizedSubassemblyId);
    if (!nextAssembly) {
      return false;
    }
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeAnimatorMemberList(nextAssembly.members),
      subassemblies: pruneAnimatorSubassemblyList(nextAssembly.subassemblies),
    }));
    return true;
  }

  function removeAnimatorAssemblyMember(assembly, memberId) {
    const liveAssembly = assembly?.id ? getAnimatorAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizeAnimatorEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    updateAnimatorAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizeAnimatorMemberList(currentAssembly?.members).filter(
        (entry, index) => getAnimatorMemberId(entry, index) !== normalizedMemberId
      ),
      subassemblies: pruneAnimatorSubassemblyList(
        normalizeAnimatorSubassemblyList(currentAssembly?.subassemblies).map((entry) => ({
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
    addAnimatorAssemblyMemberByKind,
    createAnimatorSubassemblyFromMembers,
    ensureAnimatorAssemblyMemberRecord,
    getAnimatorAssemblySubassemblyIndex,
    getAnimatorAvailablePersonalitySlotCount,
    getAnimatorMemberSubassemblyId,
    getAnimatorPersonalitySlotCapacity,
    getNextAnimatorAssemblyMemberId,
    getNextAnimatorPersonalitySlotIndex,
    getNextAnimatorSubassemblyId,
    moveAnimatorMemberToRoot,
    moveAnimatorMemberToSubassembly,
    removeAnimatorAssemblyMember,
    resolveAnimatorAssemblyMemberLocalOffset,
    setAnimatorAssemblyMemberPosition,
    setAnimatorSubassemblyPosition,
    splitAnimatorAssemblyGroup,
  };
}
