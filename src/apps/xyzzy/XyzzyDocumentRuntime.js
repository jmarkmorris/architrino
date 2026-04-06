import {
  XYZZY_ASSEMBLY_HEIGHT,
  XYZZY_ASSEMBLY_ROLES,
  XYZZY_ASSEMBLY_WIDTH,
  XYZZY_COMPOSITE_LABEL_COLUMNS,
  XYZZY_OBJECT_BANDS,
  XYZZY_OPERATOR_COLUMNS,
  XYZZY_OPERATOR_HEIGHT,
  XYZZY_OPERATOR_WIDTH,
  XYZZY_RESERVED_COLUMNS,
  XYZZY_ROUTING_COLUMNS,
  XYZZY_SCHEMA,
  XYZZY_TILE_KINDS,
} from "./XyzzyConstants.js";
import { cloneXyzzyDefaultDocument } from "./XyzzyExampleDocumentRuntime.js";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isFiniteInteger(value) {
  return Number.isInteger(value) && Number.isFinite(value);
}

function normalizeString(value = "") {
  return String(value ?? "").trim();
}

function addDiagnostic(diagnostics, path, message) {
  diagnostics.push(`${path}: ${message}`);
}

function getAssemblyBandForRole(role = "") {
  const normalizedRole = normalizeString(role);
  return XYZZY_OBJECT_BANDS.find(
    (band) => band.objectKind === "assembly" && band.role === normalizedRole
  ) ?? null;
}

function getOperatorBandForColumn(column) {
  return XYZZY_OBJECT_BANDS.find(
    (band) => band.objectKind === "operator" && band.columnStart === column
  ) ?? null;
}

export function createDefaultXyzzyDocument() {
  return cloneXyzzyDefaultDocument();
}

export function cloneXyzzyDocument(value = {}) {
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

export function buildXyzzyLinkEndpointPairKey(endpointA = "", endpointB = "") {
  const normalizedEndpointA = normalizeString(endpointA);
  const normalizedEndpointB = normalizeString(endpointB);
  return [normalizedEndpointA, normalizedEndpointB].sort().join("::");
}

export function getXyzzyPlaceableObjects(document = {}) {
  const assemblies = Array.isArray(document?.assemblies) ? document.assemblies : [];
  const operators = Array.isArray(document?.operators) ? document.operators : [];
  return [
    ...assemblies.map((assembly) => ({ ...assembly, objectKind: "assembly" })),
    ...operators.map((operator) => ({ ...operator, objectKind: "operator" })),
  ];
}

export function getXyzzyObjectBand(object = {}) {
  if (object?.objectKind === "assembly") {
    return getAssemblyBandForRole(object?.role);
  }
  if (object?.objectKind === "operator") {
    return getOperatorBandForColumn(object?.x);
  }
  return null;
}

export function getXyzzyObjectRect(object = {}) {
  if (object?.objectKind === "assembly") {
    return {
      x: object.x,
      y: object.y,
      w: XYZZY_ASSEMBLY_WIDTH,
      h: XYZZY_ASSEMBLY_HEIGHT,
    };
  }
  if (object?.objectKind === "operator") {
    return {
      x: object.x,
      y: object.y,
      w: XYZZY_OPERATOR_WIDTH,
      h: XYZZY_OPERATOR_HEIGHT,
    };
  }
  return null;
}

export function getXyzzyOccupiedTileCells(object = {}) {
  const rect = getXyzzyObjectRect(object);
  if (!rect || !isFiniteInteger(rect.x) || !isFiniteInteger(rect.y)) {
    return [];
  }
  const cells = [];
  for (let rowOffset = 0; rowOffset < rect.h; rowOffset += 1) {
    for (let columnOffset = 0; columnOffset < rect.w; columnOffset += 1) {
      cells.push({
        x: rect.x + columnOffset,
        y: rect.y + rowOffset,
      });
    }
  }
  return cells;
}

export function getXyzzyRoutingColumnBetweenObjects(objectA = {}, objectB = {}) {
  const bandA = getXyzzyObjectBand(objectA);
  const bandB = getXyzzyObjectBand(objectB);
  if (!bandA || !bandB || bandA.id === bandB.id) {
    return null;
  }

  const leftBand = bandA.bandIndex < bandB.bandIndex ? bandA : bandB;
  const rightBand = bandA.bandIndex < bandB.bandIndex ? bandB : bandA;
  if (rightBand.bandIndex - leftBand.bandIndex !== 1) {
    return null;
  }
  return (
    XYZZY_ROUTING_COLUMNS.find(
      (entry) => entry.leftBandId === leftBand.id && entry.rightBandId === rightBand.id
    )?.routingColumn ?? null
  );
}

function validateAssemblyTile(tile = {}, tileIndex = 0, assembly = {}, diagnostics = [], path = "") {
  if (!isPlainObject(tile)) {
    addDiagnostic(diagnostics, path, "expected an object tile payload");
    return;
  }
  const tileKind = normalizeString(tile.kind);
  if (!tileKind || !XYZZY_TILE_KINDS.includes(tileKind)) {
    addDiagnostic(
      diagnostics,
      `${path}.kind`,
      `expected one of ${XYZZY_TILE_KINDS.map((kind) => JSON.stringify(kind)).join(", ")}`
    );
    return;
  }

  if (tileIndex === 0 && tileKind !== "title") {
    addDiagnostic(diagnostics, `${path}.kind`, "tile 1 must be the title tile");
  }

  const normalizedAssemblyType = normalizeString(assembly?.type).toLowerCase();
  if (normalizedAssemblyType === "free_architrinos") {
    const expectedKinds = ["title", "free-electrino", "free-positrino", "ledger"];
    if (tileKind !== expectedKinds[tileIndex]) {
      addDiagnostic(
        diagnostics,
        `${path}.kind`,
        `free_architrinos tile ${tileIndex + 1} must be ${JSON.stringify(expectedKinds[tileIndex])}`
      );
    }
  } else if (tileIndex > 0 && tileKind !== "binary") {
    addDiagnostic(diagnostics, `${path}.kind`, "tiles 2-4 must use the fixed binary tile slots");
  }

  if (
    Object.prototype.hasOwnProperty.call(tile, "circleCount") &&
    (!isFiniteInteger(tile.circleCount) || tile.circleCount < 0)
  ) {
    addDiagnostic(diagnostics, `${path}.circleCount`, "expected a non-negative integer");
  }
  if (
    Object.prototype.hasOwnProperty.call(tile, "positrinoCount") &&
    (!isFiniteInteger(tile.positrinoCount) || tile.positrinoCount < 0)
  ) {
    addDiagnostic(diagnostics, `${path}.positrinoCount`, "expected a non-negative integer");
  }
  if (
    Object.prototype.hasOwnProperty.call(tile, "electrinoCount") &&
    (!isFiniteInteger(tile.electrinoCount) || tile.electrinoCount < 0)
  ) {
    addDiagnostic(diagnostics, `${path}.electrinoCount`, "expected a non-negative integer");
  }
}

function validateAssembly(assembly = {}, index = 0, diagnostics = [], objectIds = new Map(), objectLookup = new Map()) {
  const path = `$.assemblies[${index}]`;
  if (!isPlainObject(assembly)) {
    addDiagnostic(diagnostics, path, "expected an object");
    return;
  }

  const assemblyId = normalizeString(assembly.id);
  let canRegisterObject = false;
  if (!assemblyId) {
    addDiagnostic(diagnostics, `${path}.id`, "expected a non-empty stable id");
  } else if (objectIds.has(assemblyId)) {
    addDiagnostic(diagnostics, `${path}.id`, `duplicate placeable object id ${JSON.stringify(assemblyId)}`);
  } else {
    objectIds.set(assemblyId, path);
    canRegisterObject = true;
  }

  if (!normalizeString(assembly.type)) {
    addDiagnostic(diagnostics, `${path}.type`, "expected a non-empty assembly type");
  }
  if (!normalizeString(assembly.title)) {
    addDiagnostic(diagnostics, `${path}.title`, "expected a non-empty assembly title");
  }
  if (!XYZZY_ASSEMBLY_ROLES.includes(normalizeString(assembly.role))) {
    addDiagnostic(
      diagnostics,
      `${path}.role`,
      `expected one of ${XYZZY_ASSEMBLY_ROLES.map((role) => JSON.stringify(role)).join(", ")}`
    );
  }
  if (!isFiniteInteger(assembly.x)) {
    addDiagnostic(diagnostics, `${path}.x`, "expected an integer origin column");
  }
  if (!isFiniteInteger(assembly.y)) {
    addDiagnostic(diagnostics, `${path}.y`, "expected an integer row");
  }

  if (!Array.isArray(assembly.tiles) || assembly.tiles.length !== XYZZY_ASSEMBLY_WIDTH) {
    addDiagnostic(diagnostics, `${path}.tiles`, "expected one explicit four-tile assembly payload");
  } else {
    assembly.tiles.forEach((tile, tileIndex) => {
      validateAssemblyTile(tile, tileIndex, assembly, diagnostics, `${path}.tiles[${tileIndex}]`);
    });
  }

  const assemblyBand = getAssemblyBandForRole(assembly.role);
  if (!assemblyBand) {
    return;
  }

  const object = { ...assembly, objectKind: "assembly" };
  if (canRegisterObject) {
    objectLookup.set(assemblyId, object);
  }
  const occupiedCells = getXyzzyOccupiedTileCells(object);
  occupiedCells.forEach((cell) => {
    if (cell.x < assemblyBand.columnStart || cell.x > assemblyBand.columnEnd) {
      addDiagnostic(
        diagnostics,
        path,
        `assembly role ${JSON.stringify(assembly.role)} must remain inside columns ${assemblyBand.columnStart}-${assemblyBand.columnEnd}`
      );
    }
  });
}

function validateOperator(operator = {}, index = 0, diagnostics = [], objectIds = new Map(), objectLookup = new Map()) {
  const path = `$.operators[${index}]`;
  if (!isPlainObject(operator)) {
    addDiagnostic(diagnostics, path, "expected an object");
    return;
  }

  const operatorId = normalizeString(operator.id);
  let canRegisterObject = false;
  if (!operatorId) {
    addDiagnostic(diagnostics, `${path}.id`, "expected a non-empty stable id");
  } else if (objectIds.has(operatorId)) {
    addDiagnostic(diagnostics, `${path}.id`, `duplicate placeable object id ${JSON.stringify(operatorId)}`);
  } else {
    objectIds.set(operatorId, path);
    canRegisterObject = true;
  }

  if (!normalizeString(operator.type)) {
    addDiagnostic(diagnostics, `${path}.type`, "expected a non-empty operator type");
  }
  if (!normalizeString(operator.title)) {
    addDiagnostic(diagnostics, `${path}.title`, "expected a non-empty operator title");
  }
  if (!isFiniteInteger(operator.x)) {
    addDiagnostic(diagnostics, `${path}.x`, "expected an integer operator column");
  } else if (!XYZZY_OPERATOR_COLUMNS.includes(operator.x)) {
    addDiagnostic(
      diagnostics,
      `${path}.x`,
      `operators may be placed only in columns ${XYZZY_OPERATOR_COLUMNS.join(" or ")}`
    );
  }
  if (!isFiniteInteger(operator.y)) {
    addDiagnostic(diagnostics, `${path}.y`, "expected an integer row");
  }
  if (!isFiniteInteger(operator.positrinoCount) || operator.positrinoCount < 0) {
    addDiagnostic(diagnostics, `${path}.positrinoCount`, "expected a non-negative integer");
  }
  if (!isFiniteInteger(operator.electrinoCount) || operator.electrinoCount < 0) {
    addDiagnostic(diagnostics, `${path}.electrinoCount`, "expected a non-negative integer");
  }

  if (canRegisterObject) {
    objectLookup.set(operatorId, { ...operator, objectKind: "operator" });
  }
}

function validateOccupiedTileCells(objectLookup = new Map(), diagnostics = []) {
  const occupiedCellPathByKey = new Map();
  objectLookup.forEach((object, objectId) => {
    getXyzzyOccupiedTileCells(object).forEach((cell) => {
      const cellKey = `${cell.x}:${cell.y}`;
      if (occupiedCellPathByKey.has(cellKey)) {
        addDiagnostic(
          diagnostics,
          "$",
          `occupied tile cell (${cell.x}, ${cell.y}) overlaps between ${JSON.stringify(
            occupiedCellPathByKey.get(cellKey)
          )} and ${JSON.stringify(objectId)}`
        );
      } else {
        occupiedCellPathByKey.set(cellKey, objectId);
      }
      if (XYZZY_RESERVED_COLUMNS.includes(cell.x)) {
        addDiagnostic(diagnostics, "$", `reserved columns ${XYZZY_RESERVED_COLUMNS.join(" and ")} are not placeable`);
      }
    });
  });
}

function validateLinks(links = [], diagnostics = [], linkIds = new Set(), objectLookup = new Map()) {
  const pairIdByKey = new Map();
  links.forEach((link, index) => {
    const path = `$.links[${index}]`;
    if (!isPlainObject(link)) {
      addDiagnostic(diagnostics, path, "expected an object");
      return;
    }

    const linkId = normalizeString(link.id);
    if (!linkId) {
      addDiagnostic(diagnostics, `${path}.id`, "expected a non-empty stable id");
    } else if (linkIds.has(linkId)) {
      addDiagnostic(diagnostics, `${path}.id`, `duplicate link id ${JSON.stringify(linkId)}`);
    } else {
      linkIds.add(linkId);
    }

    const endpointA = normalizeString(link.endpointA);
    const endpointB = normalizeString(link.endpointB);
    if (!endpointA) {
      addDiagnostic(diagnostics, `${path}.endpointA`, "expected a non-empty endpoint id");
    }
    if (!endpointB) {
      addDiagnostic(diagnostics, `${path}.endpointB`, "expected a non-empty endpoint id");
    }
    if (!endpointA || !endpointB) {
      return;
    }
    if (endpointA === endpointB) {
      addDiagnostic(diagnostics, path, "self-links are forbidden");
      return;
    }

    const objectA = objectLookup.get(endpointA);
    const objectB = objectLookup.get(endpointB);
    if (!objectA) {
      addDiagnostic(diagnostics, `${path}.endpointA`, `unknown object id ${JSON.stringify(endpointA)}`);
    }
    if (!objectB) {
      addDiagnostic(diagnostics, `${path}.endpointB`, `unknown object id ${JSON.stringify(endpointB)}`);
    }
    if (!objectA || !objectB) {
      return;
    }

    const pairKey = buildXyzzyLinkEndpointPairKey(endpointA, endpointB);
    if (pairIdByKey.has(pairKey)) {
      addDiagnostic(
        diagnostics,
        path,
        `duplicate undirected link between ${JSON.stringify(endpointA)} and ${JSON.stringify(endpointB)}`
      );
      return;
    }
    pairIdByKey.set(pairKey, linkId || path);

    const routingColumn = getXyzzyRoutingColumnBetweenObjects(objectA, objectB);
    if (!routingColumn) {
      addDiagnostic(
        diagnostics,
        path,
        "links are allowed only between neighboring object bands through routing columns 6, 8, 13, or 15"
      );
    }
  });
}

function validateCompositeLabels(compositeLabels = [], diagnostics = [], labelIds = new Set()) {
  compositeLabels.forEach((label, index) => {
    const path = `$.compositeLabels[${index}]`;
    if (!isPlainObject(label)) {
      addDiagnostic(diagnostics, path, "expected an object");
      return;
    }

    const labelId = normalizeString(label.id);
    if (!labelId) {
      addDiagnostic(diagnostics, `${path}.id`, "expected a non-empty stable id");
    } else if (labelIds.has(labelId)) {
      addDiagnostic(diagnostics, `${path}.id`, `duplicate composite label id ${JSON.stringify(labelId)}`);
    } else {
      labelIds.add(labelId);
    }

    if (!normalizeString(label.text)) {
      addDiagnostic(diagnostics, `${path}.text`, "expected a non-empty label");
    }
    if (!isFiniteInteger(label.column) || !XYZZY_COMPOSITE_LABEL_COLUMNS.includes(label.column)) {
      addDiagnostic(
        diagnostics,
        `${path}.column`,
        `composite labels must use reserved columns ${XYZZY_COMPOSITE_LABEL_COLUMNS.join(" or ")}`
      );
    }
    if (!isFiniteInteger(label.rowStart)) {
      addDiagnostic(diagnostics, `${path}.rowStart`, "expected an integer start row");
    }
    if (!isFiniteInteger(label.rowEnd)) {
      addDiagnostic(diagnostics, `${path}.rowEnd`, "expected an integer end row");
    }
    if (isFiniteInteger(label.rowStart) && isFiniteInteger(label.rowEnd) && label.rowEnd < label.rowStart) {
      addDiagnostic(diagnostics, path, "composite label span must end on or after its start row");
    }
  });
}

export function buildXyzzyDocumentValidation(document = {}) {
  const diagnostics = [];
  if (!isPlainObject(document)) {
    return {
      valid: false,
      diagnostics: ["$: expected an object document"],
      objectLookup: new Map(),
    };
  }

  if (document.schema !== XYZZY_SCHEMA) {
    addDiagnostic(diagnostics, "$.schema", `expected constant ${JSON.stringify(XYZZY_SCHEMA)}`);
  }

  const assemblies = Array.isArray(document.assemblies) ? document.assemblies : null;
  const operators = Array.isArray(document.operators) ? document.operators : null;
  const links = Array.isArray(document.links) ? document.links : null;
  const compositeLabels = Array.isArray(document.compositeLabels)
    ? document.compositeLabels
    : document.compositeLabels == null
      ? []
      : null;

  if (!assemblies) {
    addDiagnostic(diagnostics, "$.assemblies", "expected an array");
  }
  if (!operators) {
    addDiagnostic(diagnostics, "$.operators", "expected an array");
  }
  if (!links) {
    addDiagnostic(diagnostics, "$.links", "expected an array");
  }
  if (!compositeLabels && document.compositeLabels != null) {
    addDiagnostic(diagnostics, "$.compositeLabels", "expected an array when present");
  }

  const objectIds = new Map();
  const objectLookup = new Map();
  if (assemblies) {
    assemblies.forEach((assembly, index) => {
      validateAssembly(assembly, index, diagnostics, objectIds, objectLookup);
    });
  }
  if (operators) {
    operators.forEach((operator, index) => {
      validateOperator(operator, index, diagnostics, objectIds, objectLookup);
    });
  }
  validateOccupiedTileCells(objectLookup, diagnostics);

  if (links) {
    validateLinks(links, diagnostics, new Set(), objectLookup);
  }
  if (compositeLabels) {
    validateCompositeLabels(compositeLabels, diagnostics, new Set());
  }

  return {
    valid: diagnostics.length === 0,
    diagnostics,
    objectLookup,
  };
}
