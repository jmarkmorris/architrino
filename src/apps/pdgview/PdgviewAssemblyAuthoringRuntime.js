import { sanitizePdgviewEntityId } from "./PdgviewDraftScaffoldRuntime.js";
import {
  getPdgviewMemberId,
  getPdgviewSubassemblyId,
  isPdgviewPersonalityMember,
  normalizePdgviewMemberList,
  normalizePdgviewMemberPosition,
  normalizePdgviewSubassemblyList,
  prunePdgviewSubassemblyList,
  roundPdgviewTriplet,
} from "./PdgviewAssemblyListRuntime.js";

export function createPdgviewAssemblyAuthoringRuntime(options = {}) {
  const getPdgviewAssemblyDraftById =
    typeof options.getPdgviewAssemblyDraftById === "function"
      ? options.getPdgviewAssemblyDraftById
      : () => null;
  const updatePdgviewAssemblyDraftByIdState =
    typeof options.updatePdgviewAssemblyDraftByIdState === "function"
      ? options.updatePdgviewAssemblyDraftByIdState
      : () => null;
  const setPdgviewStatus =
    typeof options.setPdgviewStatus === "function" ? options.setPdgviewStatus : () => {};
  const getPdgviewPersonalityMembers =
    typeof options.getPdgviewPersonalityMembers === "function"
      ? options.getPdgviewPersonalityMembers
      : () => [];
  const getPdgviewProxyMemberOffset =
    typeof options.getPdgviewProxyMemberOffset === "function"
      ? options.getPdgviewProxyMemberOffset
      : () => ({ x: 0, y: 0, z: 0 });
  const splitPdgviewAssemblyGroupRuntime =
    typeof options.splitPdgviewAssemblyGroupRuntime === "function"
      ? options.splitPdgviewAssemblyGroupRuntime
      : () => null;

  function getNextPdgviewAssemblyMemberId(assembly, kind = "member") {
    const normalizedKind = sanitizePdgviewEntityId(kind, "member");
    const existingIds = new Set(
      normalizePdgviewMemberList(assembly?.members).map((member, index) =>
        getPdgviewMemberId(member, index)
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

  function getNextPdgviewPersonalitySlotIndex(assembly) {
    const members = normalizePdgviewMemberList(assembly?.members);
    const usedSlots = new Set(
      members
        .filter((member) => isPdgviewPersonalityMember(member))
        .map((member, index) => Math.max(0, Number(member?.slotIndex ?? index) || 0))
    );
    let slotIndex = 0;
    while (usedSlots.has(slotIndex)) {
      slotIndex += 1;
    }
    return slotIndex;
  }

  function getPdgviewPersonalitySlotCapacity(assembly) {
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

  function getPdgviewAvailablePersonalitySlotCount(assembly) {
    const capacity = getPdgviewPersonalitySlotCapacity(assembly);
    const usedCount = getPdgviewPersonalityMembers(assembly).length;
    return Math.max(0, capacity - usedCount);
  }

  function addPdgviewAssemblyMemberByKind(assembly, kind = "member") {
    if (!assembly?.id) {
      return false;
    }
    const nextMembers = normalizePdgviewMemberList(assembly.members);
    const normalizedKind = sanitizePdgviewEntityId(kind, "member");
    const isChargeKind = normalizedKind === "electrino" || normalizedKind === "positrino";
    const hasCore = Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    if (isChargeKind && hasCore) {
      if (getPdgviewAvailablePersonalitySlotCount(assembly) <= 0) {
        setPdgviewStatus(
          `Personality layer is full for this core. Capacity is ${getPdgviewPersonalitySlotCapacity(assembly)} charge slot${
            getPdgviewPersonalitySlotCapacity(assembly) === 1 ? "" : "s"
          }.`
        );
        return false;
      }
      const slotIndex = getNextPdgviewPersonalitySlotIndex(assembly);
      nextMembers.push({
        id: `personality_${slotIndex + 1}`,
        slotKind: "personality",
        slotIndex,
        state: normalizedKind,
      });
    } else {
      nextMembers.push({ id: getNextPdgviewAssemblyMemberId(assembly, normalizedKind) });
    }
    updatePdgviewAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: nextMembers,
    }));
    return true;
  }

  function getNextPdgviewSubassemblyId(assembly) {
    const existingIds = new Set(
      normalizePdgviewSubassemblyList(assembly?.subassemblies).map((entry, index) =>
        getPdgviewSubassemblyId(entry, index)
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

  function getPdgviewAssemblySubassemblyIndex(assembly, subassemblyId) {
    const subassemblies = normalizePdgviewSubassemblyList(assembly?.subassemblies);
    return subassemblies.findIndex(
      (entry, index) => getPdgviewSubassemblyId(entry, index) === subassemblyId
    );
  }

  function getPdgviewMemberSubassemblyId(assembly, memberId) {
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!normalizedMemberId) {
      return "";
    }
    const subassemblies = normalizePdgviewSubassemblyList(assembly?.subassemblies);
    const match = subassemblies.find(
      (entry) => Array.isArray(entry?.members) && entry.members.includes(normalizedMemberId)
    );
    return match ? getPdgviewSubassemblyId(match) : "";
  }

  function ensurePdgviewAssemblyMemberRecord(assembly, memberId) {
    if (!assembly?.id) {
      return null;
    }
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!normalizedMemberId) {
      return null;
    }
    const members = normalizePdgviewMemberList(assembly.members);
    const memberIndex = members.findIndex(
      (entry, index) => getPdgviewMemberId(entry, index) === normalizedMemberId
    );
    if (memberIndex === -1) {
      return null;
    }
    const member = members[memberIndex];
    members[memberIndex] =
      member && typeof member === "object" && !Array.isArray(member)
        ? { ...member, id: normalizedMemberId }
        : { id: normalizedMemberId };
    const updatedAssembly = updatePdgviewAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members,
    }));
    return normalizePdgviewMemberList(updatedAssembly?.members)[memberIndex] ?? null;
  }

  function resolvePdgviewAssemblyMemberLocalOffset(assembly, memberId) {
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!normalizedMemberId) {
      return [0, 0, 0];
    }
    const members = normalizePdgviewMemberList(assembly?.members);
    const subassemblies = normalizePdgviewSubassemblyList(assembly?.subassemblies);
    const memberMap = new Map(
      members.map((entry, index) => [getPdgviewMemberId(entry, index), entry])
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
        (ownerSubassembly.members ?? []).includes(getPdgviewMemberId(entry, index))
      );
      const childIndex = childMembers.findIndex(
        (entry, index) => getPdgviewMemberId(entry, index) === normalizedMemberId
      );
      const childRadius = 0.11 + Math.min(childMembers.length, 6) * 0.016;
      const childPosition = normalizePdgviewMemberPosition(ownerSubassembly.position) ?? [0, 0, 0];
      const fallbackOffset = getPdgviewProxyMemberOffset(childIndex, childMembers.length, childRadius);
      const localOffset = memberEntry.position
        ? memberEntry.position
        : [fallbackOffset.x, fallbackOffset.y, fallbackOffset.z];
      return roundPdgviewTriplet([
        Number(childPosition[0] ?? 0) + Number(localOffset[0] ?? 0),
        Number(childPosition[1] ?? 0) + Number(localOffset[1] ?? 0),
        Number(childPosition[2] ?? 0) + Number(localOffset[2] ?? 0),
      ]);
    }
    const childMemberIds = new Set(subassemblies.flatMap((entry) => entry?.members ?? []));
    const rootMembers = members.filter(
      (entry, index) => !childMemberIds.has(getPdgviewMemberId(entry, index))
    );
    const rootIndex = rootMembers.findIndex(
      (entry, index) => getPdgviewMemberId(entry, index) === normalizedMemberId
    );
    const baseRadius = 0.17 + Math.min(members.length, 8) * 0.018;
    if (memberEntry.position) {
      return roundPdgviewTriplet(memberEntry.position);
    }
    const fallbackOffset = getPdgviewProxyMemberOffset(rootIndex, rootMembers.length, baseRadius);
    return roundPdgviewTriplet([fallbackOffset.x, fallbackOffset.y, fallbackOffset.z]);
  }

  function setPdgviewAssemblyMemberPosition(assembly, memberId, position, subassemblyId = "") {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!normalizedMemberId) {
      return false;
    }
    if (!ensurePdgviewAssemblyMemberRecord(liveAssembly, normalizedMemberId)) {
      return false;
    }
    const nextPosition = roundPdgviewTriplet(position);
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizePdgviewMemberList(currentAssembly?.members).map((entry, index) => {
        const entryId = getPdgviewMemberId(entry, index);
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
      const subassemblies = normalizePdgviewSubassemblyList(liveAssembly?.subassemblies);
      const subassemblyIndex = subassemblies.findIndex(
        (entry, index) => getPdgviewSubassemblyId(entry, index) === subassemblyId
      );
      if (subassemblyIndex === -1) {
        return false;
      }
      updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
        ...currentAssembly,
        subassemblies,
      }));
    }
    return true;
  }

  function setPdgviewSubassemblyPosition(assembly, subassemblyId, position) {
    const normalizedSubassemblyId = sanitizePdgviewEntityId(subassemblyId, "");
    if (!assembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const subassemblies = normalizePdgviewSubassemblyList(assembly?.subassemblies);
    const subassemblyIndex = subassemblies.findIndex(
      (entry, index) => getPdgviewSubassemblyId(entry, index) === normalizedSubassemblyId
    );
    if (subassemblyIndex === -1) {
      return false;
    }
    subassemblies[subassemblyIndex].position = roundPdgviewTriplet(position);
    updatePdgviewAssemblyDraftByIdState(assembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies,
    }));
    return true;
  }

  function movePdgviewMemberToRoot(assembly, memberId) {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    const localOffset = resolvePdgviewAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizePdgviewSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: prunePdgviewSubassemblyList(subassemblies),
    }));
    return setPdgviewAssemblyMemberPosition(liveAssembly, normalizedMemberId, localOffset);
  }

  function movePdgviewMemberToSubassembly(assembly, memberId, targetSubassemblyId) {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    const normalizedTargetId = sanitizePdgviewEntityId(targetSubassemblyId, "");
    if (!liveAssembly?.id || !normalizedMemberId || !normalizedTargetId) {
      return false;
    }
    const localOffset = resolvePdgviewAssemblyMemberLocalOffset(liveAssembly, normalizedMemberId);
    const subassemblies = normalizePdgviewSubassemblyList(liveAssembly?.subassemblies).map((entry, index) => ({
      ...entry,
      id: getPdgviewSubassemblyId(entry, index),
      members: (entry.members ?? []).filter((entryMemberId) => entryMemberId !== normalizedMemberId),
    }));
    const subassemblyIndex = subassemblies.findIndex((entry) => entry.id === normalizedTargetId);
    if (subassemblyIndex === -1) {
      return false;
    }
    const childPosition =
      normalizePdgviewMemberPosition(subassemblies[subassemblyIndex].position) ?? [0, 0, 0];
    subassemblies[subassemblyIndex].members = [
      ...new Set([...(subassemblies[subassemblyIndex].members ?? []), normalizedMemberId]),
    ];
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: prunePdgviewSubassemblyList(subassemblies),
    }));
    return setPdgviewAssemblyMemberPosition(liveAssembly, normalizedMemberId, [
      Number(localOffset[0] ?? 0) - Number(childPosition[0] ?? 0),
      Number(localOffset[1] ?? 0) - Number(childPosition[1] ?? 0),
      Number(localOffset[2] ?? 0) - Number(childPosition[2] ?? 0),
    ]);
  }

  function createPdgviewSubassemblyFromMembers(assembly, memberIds = []) {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberIds = [
      ...new Set(
        (Array.isArray(memberIds) ? memberIds : [])
          .map((memberId) => sanitizePdgviewEntityId(memberId, ""))
          .filter(Boolean)
      ),
    ];
    if (!liveAssembly?.id || !normalizedMemberIds.length) {
      return null;
    }
    const memberOffsets = normalizedMemberIds.map((memberId) =>
      resolvePdgviewAssemblyMemberLocalOffset(liveAssembly, memberId)
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
    const nextId = getNextPdgviewSubassemblyId(liveAssembly);
    const subassemblies = normalizePdgviewSubassemblyList(liveAssembly?.subassemblies).map((entry) => ({
      ...entry,
      members: (entry.members ?? []).filter((memberId) => !normalizedMemberIds.includes(memberId)),
    }));
    subassemblies.push({
      id: nextId,
      position: roundPdgviewTriplet(centroid),
      members: normalizedMemberIds,
    });
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      subassemblies: prunePdgviewSubassemblyList(subassemblies),
    }));
    normalizedMemberIds.forEach((memberId, index) => {
      const offset = memberOffsets[index] ?? [0, 0, 0];
      setPdgviewAssemblyMemberPosition(
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

  function splitPdgviewAssemblyGroup(assembly, subassemblyId) {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedSubassemblyId = sanitizePdgviewEntityId(subassemblyId, "");
    if (!liveAssembly?.id || !normalizedSubassemblyId) {
      return false;
    }
    const nextAssembly = splitPdgviewAssemblyGroupRuntime(liveAssembly, normalizedSubassemblyId);
    if (!nextAssembly) {
      return false;
    }
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizePdgviewMemberList(nextAssembly.members),
      subassemblies: prunePdgviewSubassemblyList(nextAssembly.subassemblies),
    }));
    return true;
  }

  function removePdgviewAssemblyMember(assembly, memberId) {
    const liveAssembly = assembly?.id ? getPdgviewAssemblyDraftById(assembly.id) ?? assembly : assembly;
    const normalizedMemberId = sanitizePdgviewEntityId(memberId, "");
    if (!liveAssembly?.id || !normalizedMemberId) {
      return false;
    }
    updatePdgviewAssemblyDraftByIdState(liveAssembly.id, (currentAssembly) => ({
      ...currentAssembly,
      members: normalizePdgviewMemberList(currentAssembly?.members).filter(
        (entry, index) => getPdgviewMemberId(entry, index) !== normalizedMemberId
      ),
      subassemblies: prunePdgviewSubassemblyList(
        normalizePdgviewSubassemblyList(currentAssembly?.subassemblies).map((entry) => ({
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
    addPdgviewAssemblyMemberByKind,
    createPdgviewSubassemblyFromMembers,
    ensurePdgviewAssemblyMemberRecord,
    getPdgviewAssemblySubassemblyIndex,
    getPdgviewAvailablePersonalitySlotCount,
    getPdgviewMemberSubassemblyId,
    getPdgviewPersonalitySlotCapacity,
    getNextPdgviewAssemblyMemberId,
    getNextPdgviewPersonalitySlotIndex,
    getNextPdgviewSubassemblyId,
    movePdgviewMemberToRoot,
    movePdgviewMemberToSubassembly,
    removePdgviewAssemblyMember,
    resolvePdgviewAssemblyMemberLocalOffset,
    setPdgviewAssemblyMemberPosition,
    setPdgviewSubassemblyPosition,
    splitPdgviewAssemblyGroup,
  };
}
