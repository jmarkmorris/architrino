function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function compareByYThenXThenId(left = {}, right = {}) {
  return (
    normalizeInteger(left?.y) - normalizeInteger(right?.y) ||
    normalizeInteger(left?.x) - normalizeInteger(right?.x) ||
    normalizeText(left?.id).localeCompare(normalizeText(right?.id))
  );
}

function getBlockLength(block = {}) {
  return (Array.isArray(block?.objectIds) ? block.objectIds : []).filter(Boolean).length;
}

const PDGEDIT_COMPOSITE_LABEL_DEFINITIONS = Object.freeze([
  { type: "photon-composite", tileKey: "photon", text: "Photon" },
  { type: "noether-pair-composite", tileKey: "noether-pair", text: "Noether Pair" },
  { type: "noether-quad-composite", tileKey: "noether-quad", text: "Noether Quad" },
  { type: "pro-proton-composite", tileKey: "pro-proton", text: "Proton" },
  { type: "anti-proton-composite", tileKey: "anti-proton", text: "Anti Proton" },
  { type: "pro-neutron-composite", tileKey: "pro-neutron", text: "Neutron" },
  { type: "anti-neutron-composite", tileKey: "anti-neutron", text: "Anti Neutron" },
  { type: "positive-pion-composite", tileKey: "positive-pion", text: "Positive Pion" },
  { type: "negative-pion-composite", tileKey: "negative-pion", text: "Negative Pion" },
  { type: "neutral-pion-u-composite", tileKey: "neutral-pion-u", text: "Neutral Pion" },
  { type: "neutral-pion-d-composite", tileKey: "neutral-pion-d", text: "Neutral Pion" },
  { type: "positive-kaon-composite", tileKey: "positive-kaon", text: "Positive Kaon" },
  { type: "negative-kaon-composite", tileKey: "negative-kaon", text: "Negative Kaon" },
  { type: "neutral-kaon-d-composite", tileKey: "neutral-kaon-d", text: "Neutral Kaon" },
  { type: "neutral-kaon-s-composite", tileKey: "neutral-kaon-s", text: "Neutral Kaon" },
  { type: "positive-b-meson-composite", tileKey: "positive-b-meson", text: "Positive B Meson" },
  { type: "negative-b-meson-composite", tileKey: "negative-b-meson", text: "Negative B Meson" },
  { type: "neutral-b-meson-d-composite", tileKey: "neutral-b-meson-d", text: "Neutral B Meson" },
  { type: "neutral-b-meson-b-composite", tileKey: "neutral-b-meson-b", text: "Neutral B Meson" },
]);

const PDGEDIT_COMPOSITE_LABEL_DEFINITION_BY_TYPE = new Map(
  PDGEDIT_COMPOSITE_LABEL_DEFINITIONS.map((definition) => [definition.type, definition])
);

const PDGEDIT_COMPOSITE_SIDE_BY_ROLE = Object.freeze({
  reactant: "left",
  product: "right",
});

const PDGEDIT_COMPOSITE_ROLE_BY_SIDE = Object.freeze({
  left: "reactant",
  right: "product",
});

function compareCompositeLabels(left = {}, right = {}) {
  return (
    normalizeText(left?.side).localeCompare(normalizeText(right?.side)) ||
    normalizeInteger(left?.rowStart) - normalizeInteger(right?.rowStart) ||
    normalizeInteger(left?.rowEnd) - normalizeInteger(right?.rowEnd) ||
    normalizeText(left?.id).localeCompare(normalizeText(right?.id))
  );
}

function normalizeCompositeLabel(label = {}) {
  const type = normalizeText(label?.type);
  return {
    id: normalizeText(label?.id),
    type,
    side: normalizeText(label?.side),
    text: resolvePdgeditCompositeLabelText(type, label?.text),
    rowStart: normalizeInteger(label?.rowStart),
    rowEnd: normalizeInteger(label?.rowEnd),
  };
}

function buildCompositeBlockId(label = {}, objectIds = []) {
  const labelId = normalizeText(label?.id);
  if (labelId) {
    return `composite:${labelId}`;
  }
  return `composite:${objectIds.join("|")}`;
}

function buildSingletonBlockId(objectId = "") {
  return `assembly:${normalizeText(objectId)}`;
}

function createSingletonBlock(assembly = {}, role = "", side = "") {
  const objectId = normalizeText(assembly?.id);
  return {
    id: buildSingletonBlockId(objectId),
    role: normalizeText(role),
    side: normalizeText(side),
    objectIds: objectId ? [objectId] : [],
    label: null,
  };
}

export function getPdgeditCompositeRoleForSide(side = "") {
  return PDGEDIT_COMPOSITE_ROLE_BY_SIDE[normalizeText(side)] ?? "";
}

export function getPdgeditCompositeSideForRole(role = "") {
  return PDGEDIT_COMPOSITE_SIDE_BY_ROLE[normalizeText(role)] ?? "";
}

export function resolvePdgeditCompositeLabelDefinition(type = "") {
  return PDGEDIT_COMPOSITE_LABEL_DEFINITION_BY_TYPE.get(normalizeText(type)) ?? null;
}

export function resolvePdgeditCompositeLabelTileKey(type = "") {
  return resolvePdgeditCompositeLabelDefinition(type)?.tileKey ?? "";
}

export function resolvePdgeditCompositeLabelText(type = "", fallbackText = "") {
  return resolvePdgeditCompositeLabelDefinition(type)?.text ?? normalizeText(fallbackText);
}

export function buildPdgeditCompositeBlocks(assemblies = [], compositeLabels = [], role = "") {
  const normalizedRole = normalizeText(role);
  const side = getPdgeditCompositeSideForRole(normalizedRole);
  const laneAssemblies = [...(Array.isArray(assemblies) ? assemblies : [])].sort(compareByYThenXThenId);
  if (!side) {
    return laneAssemblies.map((assembly) => createSingletonBlock(assembly, normalizedRole, side));
  }

  const assemblyByRow = new Map(
    laneAssemblies
      .filter((assembly) => normalizeText(assembly?.role) === normalizedRole && normalizeText(assembly?.id))
      .map((assembly) => [normalizeInteger(assembly?.y), assembly])
  );
  const blocksByStartRow = new Map();
  const claimedRows = new Set();
  const compositeLabelsForSide = (Array.isArray(compositeLabels) ? compositeLabels : [])
    .map(normalizeCompositeLabel)
    .filter((label) => label.side === side)
    .sort(compareCompositeLabels);

  compositeLabelsForSide.forEach((label) => {
    const memberAssemblies = [];
    for (let row = label.rowStart; row <= label.rowEnd; row += 1) {
      const assembly = assemblyByRow.get(row);
      if (!assembly || claimedRows.has(row)) {
        memberAssemblies.length = 0;
        break;
      }
      memberAssemblies.push(assembly);
    }
    if (!memberAssemblies.length) {
      return;
    }
    const objectIds = memberAssemblies.map((assembly) => normalizeText(assembly.id)).filter(Boolean);
    blocksByStartRow.set(label.rowStart, {
      id: buildCompositeBlockId(label, objectIds),
      role: normalizedRole,
      side,
      objectIds,
      label,
    });
    for (let row = label.rowStart; row <= label.rowEnd; row += 1) {
      claimedRows.add(row);
    }
  });

  const blocks = [];
  const emittedBlockIds = new Set();
  laneAssemblies.forEach((assembly) => {
    const row = normalizeInteger(assembly?.y);
    const compositeBlock = blocksByStartRow.get(row);
    if (compositeBlock && !emittedBlockIds.has(compositeBlock.id)) {
      blocks.push(compositeBlock);
      emittedBlockIds.add(compositeBlock.id);
      return;
    }
    if (claimedRows.has(row)) {
      return;
    }
    blocks.push(createSingletonBlock(assembly, normalizedRole, side));
  });
  return blocks;
}

export function buildPdgeditCompositeLabelsForRole(blocks = [], role = "") {
  const side = getPdgeditCompositeSideForRole(role);
  if (!side) {
    return [];
  }
  const labels = [];
  let rowCursor = 0;
  (Array.isArray(blocks) ? blocks : []).forEach((block) => {
    const blockLength = getBlockLength(block);
    if (blockLength <= 0) {
      return;
    }
    if (block?.label) {
      const label = normalizeCompositeLabel(block.label);
      labels.push({
        ...label,
        side,
        rowStart: rowCursor,
        rowEnd: rowCursor + blockLength - 1,
      });
    }
    rowCursor += blockLength;
  });
  return labels;
}

export function rebuildPdgeditCompositeLabelsForRole(compositeLabels = [], role = "", blocks = []) {
  const side = getPdgeditCompositeSideForRole(role);
  if (!side) {
    return (Array.isArray(compositeLabels) ? compositeLabels : []).map(normalizeCompositeLabel);
  }
  const preservedLabels = (Array.isArray(compositeLabels) ? compositeLabels : [])
    .map(normalizeCompositeLabel)
    .filter((label) => label.side !== side);
  return [...preservedLabels, ...buildPdgeditCompositeLabelsForRole(blocks, role)].sort(compareCompositeLabels);
}

export function getPdgeditCompositeBlockMembership(blocks = [], objectId = "") {
  const normalizedObjectId = normalizeText(objectId);
  for (let blockIndex = 0; blockIndex < blocks.length; blockIndex += 1) {
    const block = blocks[blockIndex];
    const memberIndex = (Array.isArray(block?.objectIds) ? block.objectIds : []).indexOf(normalizedObjectId);
    if (memberIndex >= 0) {
      return {
        block,
        blockIndex,
        memberIndex,
      };
    }
  }
  return null;
}

export function buildPdgeditRowByObjectIdFromBlocks(blocks = []) {
  const rowByObjectId = new Map();
  let rowCursor = 0;
  (Array.isArray(blocks) ? blocks : []).forEach((block) => {
    (Array.isArray(block?.objectIds) ? block.objectIds : []).forEach((objectId) => {
      const normalizedObjectId = normalizeText(objectId);
      if (!normalizedObjectId) {
        return;
      }
      rowByObjectId.set(normalizedObjectId, rowCursor);
      rowCursor += 1;
    });
  });
  return rowByObjectId;
}

export function findPdgeditCompositeBlockInsertionIndex(blocks = [], requestedRow = 0) {
  const targetRow = Math.max(0, normalizeInteger(requestedRow));
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  let rowCursor = 0;
  for (let index = 0; index <= blocks.length; index += 1) {
    const distance = Math.abs(rowCursor - targetRow);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
    if (index < blocks.length) {
      rowCursor += getBlockLength(blocks[index]);
    }
  }
  return bestIndex;
}
