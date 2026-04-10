import {
  createEmptyPdgeditDocument,
  normalizePdgeditDocument,
} from "./PdgeditDocumentRuntime.js";
import {
  getPdgeditAssemblyBandXForRole,
  getPdgeditObjectRect,
  getPdgeditRoleForAssemblyX,
  getPdgeditRoutingColumnForObjectPair,
} from "./PdgeditSurfaceGeometryRuntime.js";

const ASSEMBLY_COLUMN_RANGES = Object.freeze([
  { role: "reactant", columnStart: 2, columnEnd: 5 },
  { role: "intermediate", columnStart: 9, columnEnd: 12 },
  { role: "product", columnStart: 16, columnEnd: 19 },
]);

const OPERATOR_COLUMNS = new Set([7, 14]);
const RESERVED_COLUMNS = new Set([1, 20]);
const ROUTING_COLUMNS = new Set([6, 8, 13, 15]);
const OPERATOR_TITLE_BY_TYPE = Object.freeze({
  associate: "Associate",
  dissociate: "Dissociate",
  "pass-thru": "Pass Thru",
});

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function slugifyIdentifier(value, fallback = "item") {
  const slug = normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "_")
    .replace(/^_+|_+$/gu, "");
  return slug || fallback;
}

function cloneDocument(document = {}) {
  return {
    schema: "pdgedit/v1",
    assemblies: normalizePdgeditDocument(document).assemblies.map((assembly) => ({
      ...assembly,
      tiles: [...assembly.tiles],
    })),
    operators: normalizePdgeditDocument(document).operators.map((operator) => ({ ...operator })),
    links: normalizePdgeditDocument(document).links.map((link) => ({ ...link })),
    compositeLabels: normalizePdgeditDocument(document).compositeLabels.map((label) => ({ ...label })),
  };
}

function getBandForColumn(column = 0) {
  const normalizedColumn = normalizeInteger(column, -1);
  return ASSEMBLY_COLUMN_RANGES.find(
    (band) => normalizedColumn >= band.columnStart && normalizedColumn <= band.columnEnd
  ) ?? null;
}

function compareByYThenXThenId(left = {}, right = {}) {
  return (
    normalizeInteger(left.y) - normalizeInteger(right.y) ||
    normalizeInteger(left.x) - normalizeInteger(right.x) ||
    normalizeText(left.id).localeCompare(normalizeText(right.id))
  );
}

function getNextNumericSuffix(values, prefix) {
  const normalizedPrefix = `${prefix}_`;
  let maxValue = 0;
  values.forEach((value) => {
    const match = new RegExp(`^${normalizedPrefix}(\\d+)$`, "u").exec(value);
    if (!match) {
      return;
    }
    maxValue = Math.max(maxValue, Number(match[1]));
  });
  return maxValue + 1;
}

function buildAssemblyId(document, type) {
  const slug = slugifyIdentifier(type, "assembly");
  const prefix = `unit_${slug}`;
  const nextValue = getNextNumericSuffix(
    normalizePdgeditDocument(document).assemblies.map((assembly) => assembly.id),
    prefix
  );
  return `${prefix}_${nextValue}`;
}

function buildOperatorId(document, type) {
  const slug = slugifyIdentifier(type, "operator");
  const prefix = `unit_${slug}`;
  const nextValue = getNextNumericSuffix(
    normalizePdgeditDocument(document).operators.map((operator) => operator.id),
    prefix
  );
  return `${prefix}_${nextValue}`;
}

function buildCanonicalLinkId(leftId, rightId) {
  return `edge_${slugifyIdentifier(leftId)}__${slugifyIdentifier(rightId)}`;
}

function getObjectKind(record = {}) {
  return Object.prototype.hasOwnProperty.call(record, "positrinoCount") ? "operator" : "assembly";
}

function getObjects(document = {}) {
  const normalized = normalizePdgeditDocument(document);
  return [
    ...normalized.assemblies.map((assembly) => ({ ...assembly, kind: "assembly", widthTiles: 4 })),
    ...normalized.operators.map((operator) => ({ ...operator, kind: "operator", widthTiles: 1 })),
  ];
}

function getObjectById(document = {}, objectId = "") {
  return getObjects(document).find((record) => record.id === normalizeText(objectId)) ?? null;
}

function getObjectsExcludingIds(document = {}, excludedIds = []) {
  const excluded = new Set(excludedIds.map((value) => normalizeText(value)).filter(Boolean));
  return getObjects(document).filter((record) => !excluded.has(record.id));
}

function hasOverlapWithObjects(candidate = {}, objects = []) {
  const candidateRect = getPdgeditObjectRect(candidate);
  return objects.some((record) => {
    const recordRect = getPdgeditObjectRect(record);
    const horizontalOverlap = candidateRect.left < recordRect.right && candidateRect.right > recordRect.left;
    const verticalOverlap = candidateRect.top < recordRect.bottom && candidateRect.bottom > recordRect.top;
    return horizontalOverlap && verticalOverlap;
  });
}

function compactLaneRecords(records = []) {
  return [...records].sort(compareByYThenXThenId).map((record, index) => ({
    ...record,
    y: index,
  }));
}

function replaceAssembliesForRole(document, role, nextRoleAssemblies) {
  const cloned = cloneDocument(document);
  cloned.assemblies = [
    ...cloned.assemblies.filter((assembly) => assembly.role !== role),
    ...nextRoleAssemblies,
  ].sort(compareByYThenXThenId);
  return cloned;
}

function getCompactAssembliesForRole(document, role, excludedId = "") {
  return normalizePdgeditDocument(document).assemblies
    .filter((assembly) => assembly.role === role && assembly.id !== excludedId)
    .sort(compareByYThenXThenId);
}

function normalizeAssemblyInsertionRow(document, role, requestedRow) {
  const compactLane = getCompactAssembliesForRole(document, role);
  return Math.max(0, Math.min(normalizeInteger(requestedRow), compactLane.length));
}

function canonicalizeLinkEndpoints(document, endpointA = "", endpointB = "") {
  const firstObject = getObjectById(document, endpointA);
  const secondObject = getObjectById(document, endpointB);
  if (!firstObject || !secondObject || firstObject.id === secondObject.id) {
    return null;
  }
  if (firstObject.x < secondObject.x) {
    return { leftObject: firstObject, rightObject: secondObject };
  }
  if (secondObject.x < firstObject.x) {
    return { leftObject: secondObject, rightObject: firstObject };
  }
  return null;
}

export function getPdgeditCreateSlot(column = 0, row = -1, document = {}) {
  const normalizedRow = normalizeInteger(row, -1);
  const normalizedColumn = normalizeInteger(column, -1);
  if (normalizedRow < 0) {
    return null;
  }
  if (RESERVED_COLUMNS.has(normalizedColumn) || ROUTING_COLUMNS.has(normalizedColumn)) {
    return null;
  }
  const band = getBandForColumn(normalizedColumn);
  if (band) {
    const candidate = {
      id: "__slot__",
      kind: "assembly",
      x: getPdgeditAssemblyBandXForRole(band.role),
      y: normalizedRow,
    };
    if (hasOverlapWithObjects(candidate, getObjects(document))) {
      return null;
    }
    return {
      kind: "assembly",
      role: band.role,
      x: getPdgeditAssemblyBandXForRole(band.role),
      y: normalizedRow,
      column: normalizedColumn,
    };
  }
  if (OPERATOR_COLUMNS.has(normalizedColumn)) {
    const candidate = {
      id: "__slot__",
      kind: "operator",
      x: normalizedColumn,
      y: normalizedRow,
    };
    if (hasOverlapWithObjects(candidate, getObjects(document))) {
      return null;
    }
    return {
      kind: "operator",
      x: normalizedColumn,
      y: normalizedRow,
      column: normalizedColumn,
    };
  }
  return null;
}

export function createPdgeditAssembly(document = {}, template = {}, role = "", requestedRow = 0) {
  const normalizedRole = normalizeText(role);
  const laneX = getPdgeditAssemblyBandXForRole(normalizedRole);
  if (!laneX || !Array.isArray(template?.tiles) || template.tiles.length !== 4) {
    return { ok: false, document: normalizePdgeditDocument(document) };
  }
  const normalizedDocument = normalizePdgeditDocument(document);
  const insertionRow = normalizeAssemblyInsertionRow(normalizedDocument, normalizedRole, requestedRow);
  const compactLane = getCompactAssembliesForRole(normalizedDocument, normalizedRole);
  const nextLane = [
    ...compactLane.slice(0, insertionRow),
    {
      id: buildAssemblyId(normalizedDocument, template.type),
      type: normalizeText(template.type),
      x: laneX,
      y: insertionRow,
      title: normalizeText(template.title) || normalizeText(template.displayTitle) || normalizeText(template.type),
      role: normalizedRole,
      tiles: template.tiles.map((tileKey) => normalizeText(tileKey)),
    },
    ...compactLane.slice(insertionRow),
  ].map((assembly, index) => ({
    ...assembly,
    y: index,
  }));
  const nextDocument = replaceAssembliesForRole(normalizedDocument, normalizedRole, nextLane);
  const createdAssembly = nextLane[insertionRow];
  return {
    ok: true,
    document: nextDocument,
    createdId: createdAssembly.id,
  };
}

export function createPdgeditOperator(
  document = {},
  {
    type = "",
    x = 0,
    y = 0,
    positrinoCount = 0,
    electrinoCount = 0,
  } = {}
) {
  const normalizedType = normalizeText(type);
  const normalizedX = normalizeInteger(x, -1);
  const normalizedY = normalizeInteger(y, -1);
  const normalizedPositrinoCount = normalizeInteger(positrinoCount, -1);
  const normalizedElectrinoCount = normalizeInteger(electrinoCount, -1);
  if (
    !OPERATOR_COLUMNS.has(normalizedX) ||
    normalizedY < 0 ||
    normalizedPositrinoCount < 0 ||
    normalizedElectrinoCount < 0 ||
    !Object.prototype.hasOwnProperty.call(OPERATOR_TITLE_BY_TYPE, normalizedType)
  ) {
    return { ok: false, document: normalizePdgeditDocument(document) };
  }
  const normalizedDocument = normalizePdgeditDocument(document);
  const candidate = {
    id: "__slot__",
    kind: "operator",
    x: normalizedX,
    y: normalizedY,
  };
  if (hasOverlapWithObjects(candidate, getObjects(normalizedDocument))) {
    return { ok: false, document: normalizedDocument };
  }
  const operator = {
    id: buildOperatorId(normalizedDocument, normalizedType),
    type: normalizedType,
    x: normalizedX,
    y: normalizedY,
    title: OPERATOR_TITLE_BY_TYPE[normalizedType],
    positrinoCount: normalizedPositrinoCount,
    electrinoCount: normalizedElectrinoCount,
  };
  return {
    ok: true,
    document: {
      ...cloneDocument(normalizedDocument),
      operators: [...normalizedDocument.operators, operator].sort(compareByYThenXThenId),
    },
    createdId: operator.id,
  };
}

export function movePdgeditObjectToRow(document = {}, objectId = "", requestedRow = 0) {
  const normalizedDocument = normalizePdgeditDocument(document);
  const object = getObjectById(normalizedDocument, objectId);
  if (!object) {
    return { ok: false, document: normalizedDocument };
  }
  const normalizedRow = normalizeInteger(requestedRow, -1);
  if (normalizedRow < 0) {
    return { ok: false, document: normalizedDocument };
  }
  if (object.kind === "assembly") {
    const compactLane = getCompactAssembliesForRole(normalizedDocument, object.role, object.id);
    const insertionRow = Math.max(0, Math.min(normalizedRow, compactLane.length));
    const nextLane = [
      ...compactLane.slice(0, insertionRow),
      object,
      ...compactLane.slice(insertionRow),
    ].map((assembly, index) => ({
      ...assembly,
      y: index,
    }));
    return {
      ok: true,
      document: replaceAssembliesForRole(normalizedDocument, object.role, nextLane),
    };
  }
  const candidate = {
    ...object,
    y: normalizedRow,
  };
  if (hasOverlapWithObjects(candidate, getObjectsExcludingIds(normalizedDocument, [object.id]))) {
    return { ok: false, document: normalizedDocument };
  }
  return {
    ok: true,
    document: {
      ...cloneDocument(normalizedDocument),
      operators: normalizedDocument.operators
        .map((operator) => (operator.id === object.id ? { ...operator, y: normalizedRow } : operator))
        .sort(compareByYThenXThenId),
    },
  };
}

export function deletePdgeditObject(document = {}, objectId = "") {
  const normalizedDocument = normalizePdgeditDocument(document);
  const object = getObjectById(normalizedDocument, objectId);
  if (!object) {
    return { ok: false, document: normalizedDocument };
  }
  const nextDocument = cloneDocument(normalizedDocument);
  nextDocument.links = nextDocument.links.filter(
    (link) => link.endpointA !== object.id && link.endpointB !== object.id
  );
  if (object.kind === "assembly") {
    const compactedLane = compactLaneRecords(
      nextDocument.assemblies.filter((assembly) => assembly.role === object.role && assembly.id !== object.id)
    );
    nextDocument.assemblies = [
      ...nextDocument.assemblies.filter((assembly) => assembly.role !== object.role && assembly.id !== object.id),
      ...compactedLane,
    ].sort(compareByYThenXThenId);
  } else {
    nextDocument.operators = nextDocument.operators
      .filter((operator) => operator.id !== object.id)
      .sort(compareByYThenXThenId);
  }
  return {
    ok: true,
    document: nextDocument,
  };
}

export function createPdgeditLink(document = {}, endpointA = "", endpointB = "") {
  const normalizedDocument = normalizePdgeditDocument(document);
  const canonical = canonicalizeLinkEndpoints(normalizedDocument, endpointA, endpointB);
  if (!canonical) {
    return { ok: false, document: normalizedDocument };
  }
  const { leftObject, rightObject } = canonical;
  if (!getPdgeditRoutingColumnForObjectPair(leftObject, rightObject)) {
    return { ok: false, document: normalizedDocument };
  }
  const duplicate = normalizedDocument.links.some(
    (link) =>
      (link.endpointA === leftObject.id && link.endpointB === rightObject.id) ||
      (link.endpointA === rightObject.id && link.endpointB === leftObject.id)
  );
  if (duplicate) {
    return { ok: false, document: normalizedDocument };
  }
  const nextLink = {
    id: buildCanonicalLinkId(leftObject.id, rightObject.id),
    endpointA: leftObject.id,
    endpointB: rightObject.id,
  };
  return {
    ok: true,
    document: {
      ...cloneDocument(normalizedDocument),
      links: [...normalizedDocument.links, nextLink].sort((left, right) => left.id.localeCompare(right.id)),
    },
    createdId: nextLink.id,
  };
}

export function deletePdgeditLink(document = {}, linkId = "") {
  const normalizedDocument = normalizePdgeditDocument(document);
  const normalizedLinkId = normalizeText(linkId);
  if (!normalizedLinkId || !normalizedDocument.links.some((link) => link.id === normalizedLinkId)) {
    return { ok: false, document: normalizedDocument };
  }
  return {
    ok: true,
    document: {
      ...cloneDocument(normalizedDocument),
      links: normalizedDocument.links.filter((link) => link.id !== normalizedLinkId),
    },
  };
}

export function getPdgeditDocumentObjects(document = {}) {
  return getObjects(document);
}

export function getPdgeditDocumentMaxRow(document = {}) {
  const normalizedDocument = normalizePdgeditDocument(document);
  const objectRows = getObjects(normalizedDocument).map((record) => normalizeInteger(record.y));
  const compositeRows = normalizedDocument.compositeLabels.flatMap((label) => [
    normalizeInteger(label.rowStart),
    normalizeInteger(label.rowEnd),
  ]);
  const maxRow = Math.max(-1, ...objectRows, ...compositeRows);
  return maxRow;
}

export function getPdgeditEmptyDocument() {
  return createEmptyPdgeditDocument();
}

export function getPdgeditObjectById(document = {}, objectId = "") {
  return getObjectById(document, objectId);
}

export function getPdgeditCanonicalLinkEndpoints(document = {}, endpointA = "", endpointB = "") {
  return canonicalizeLinkEndpoints(document, endpointA, endpointB);
}

export function getPdgeditAssemblyRoleForX(x = 0) {
  return getPdgeditRoleForAssemblyX(x);
}

