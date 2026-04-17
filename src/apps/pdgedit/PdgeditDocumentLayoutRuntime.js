import {
  getPdgeditAssemblyStageXForRole,
  getPdgeditOperatorStageXForSide,
} from "./PdgeditSurfaceGeometryRuntime.js";

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isInteger(number) ? number : fallback;
}

function compareByYThenXThenId(left = {}, right = {}) {
  return (
    normalizeInteger(left.y) - normalizeInteger(right.y) ||
    normalizeInteger(left.x) - normalizeInteger(right.x) ||
    normalizeText(left.id).localeCompare(normalizeText(right.id))
  );
}

function cloneAssembly(assembly = {}) {
  const sampleCounts =
    assembly?.sampleCounts && typeof assembly.sampleCounts === "object"
      ? {
          topCount: normalizeText(assembly.sampleCounts.topCount),
          bottomCount: normalizeText(assembly.sampleCounts.bottomCount),
        }
      : null;
  return {
    ...assembly,
    tiles: Array.isArray(assembly?.tiles) ? [...assembly.tiles] : [],
    ...(sampleCounts?.topCount && sampleCounts?.bottomCount ? { sampleCounts } : {}),
  };
}

function cloneOperator(operator = {}) {
  return { ...operator };
}

function cloneLink(link = {}) {
  return { ...link };
}

function cloneCompositeLabel(label = {}) {
  return { ...label };
}

function buildObjectsById(document = {}) {
  return new Map(
    [
      ...(Array.isArray(document?.assemblies) ? document.assemblies : []),
      ...(Array.isArray(document?.operators) ? document.operators : []),
    ]
      .filter((record) => normalizeText(record?.id))
      .map((record) => [record.id, record])
  );
}

function buildNeighborIdsByObjectId(document = {}) {
  const neighborsById = new Map();

  function addNeighbor(leftId, rightId) {
    if (!neighborsById.has(leftId)) {
      neighborsById.set(leftId, new Set());
    }
    neighborsById.get(leftId).add(rightId);
  }

  (Array.isArray(document?.links) ? document.links : []).forEach((link) => {
    const endpointA = normalizeText(link?.endpointA);
    const endpointB = normalizeText(link?.endpointB);
    if (!endpointA || !endpointB || endpointA === endpointB) {
      return;
    }
    addNeighbor(endpointA, endpointB);
    addNeighbor(endpointB, endpointA);
  });

  return neighborsById;
}

function getNeighborObjects(objectsById, neighborsById, objectId) {
  return [...(neighborsById.get(normalizeText(objectId)) ?? [])]
    .map((neighborId) => objectsById.get(neighborId) ?? null)
    .filter(Boolean)
    .sort(compareByYThenXThenId);
}

function isAssemblyForRoleAndType(assembly = {}, role = "", type = "") {
  const normalizedRole = normalizeText(role);
  return (
    normalizeText(assembly?.role) === normalizedRole &&
    normalizeInteger(assembly?.x) === getPdgeditAssemblyStageXForRole(normalizedRole) &&
    normalizeText(assembly?.type) === normalizeText(type)
  );
}

function isPassThruOperatorForSide(operator = {}, side = "") {
  const normalizedSide = normalizeText(side);
  return (
    normalizeText(operator?.type) === "pass-thru" &&
    normalizeInteger(operator?.x) === getPdgeditOperatorStageXForSide(normalizedSide)
  );
}

function matchCatalystPassThruChain({ reactantAssembly, objectsById, neighborsById }) {
  const catalystType = normalizeText(reactantAssembly?.type);
  if (!isAssemblyForRoleAndType(reactantAssembly, "reactant", catalystType)) {
    return null;
  }

  const reactantNeighbors = getNeighborObjects(objectsById, neighborsById, reactantAssembly.id);
  if (reactantNeighbors.length !== 1) {
    return null;
  }

  const reactantOperator = reactantNeighbors[0];
  if (!isPassThruOperatorForSide(reactantOperator, "reactant")) {
    return null;
  }

  const reactantOperatorNeighbors = getNeighborObjects(objectsById, neighborsById, reactantOperator.id);
  if (
    reactantOperatorNeighbors.length !== 2 ||
    !reactantOperatorNeighbors.some((neighbor) => neighbor.id === reactantAssembly.id)
  ) {
    return null;
  }

  const intermediateAssembly = reactantOperatorNeighbors.find((neighbor) => neighbor.id !== reactantAssembly.id);
  if (!isAssemblyForRoleAndType(intermediateAssembly, "intermediate", catalystType)) {
    return null;
  }

  const intermediateNeighbors = getNeighborObjects(objectsById, neighborsById, intermediateAssembly.id);
  if (
    intermediateNeighbors.length !== 2 ||
    !intermediateNeighbors.some((neighbor) => neighbor.id === reactantOperator.id)
  ) {
    return null;
  }

  const productOperator = intermediateNeighbors.find((neighbor) => neighbor.id !== reactantOperator.id);
  if (!isPassThruOperatorForSide(productOperator, "product")) {
    return null;
  }

  const productOperatorNeighbors = getNeighborObjects(objectsById, neighborsById, productOperator.id);
  if (
    productOperatorNeighbors.length !== 2 ||
    !productOperatorNeighbors.some((neighbor) => neighbor.id === intermediateAssembly.id)
  ) {
    return null;
  }

  const productAssembly = productOperatorNeighbors.find((neighbor) => neighbor.id !== intermediateAssembly.id);
  if (!isAssemblyForRoleAndType(productAssembly, "product", catalystType)) {
    return null;
  }

  const productNeighbors = getNeighborObjects(objectsById, neighborsById, productAssembly.id);
  if (productNeighbors.length !== 1 || productNeighbors[0].id !== productOperator.id) {
    return null;
  }

  const uniqueIds = new Set([
    reactantAssembly.id,
    reactantOperator.id,
    intermediateAssembly.id,
    productOperator.id,
    productAssembly.id,
  ]);
  if (uniqueIds.size !== 5) {
    return null;
  }

  return {
    type: catalystType,
    reactantAssemblyId: reactantAssembly.id,
    reactantOperatorId: reactantOperator.id,
    intermediateAssemblyId: intermediateAssembly.id,
    productOperatorId: productOperator.id,
    productAssemblyId: productAssembly.id,
  };
}

function orderLaneRecords(records = [], prioritizedIds = []) {
  const stableRecords = [...records].sort(compareByYThenXThenId);
  const recordById = new Map(stableRecords.map((record) => [record.id, record]));
  const prioritizedIdSet = new Set(prioritizedIds);
  const prioritizedRecords = prioritizedIds.map((id) => recordById.get(id)).filter(Boolean);
  const remainingRecords = stableRecords.filter((record) => !prioritizedIdSet.has(record.id));
  const orderedRecords = [...prioritizedRecords, ...remainingRecords].map((record, index) => ({
    ...record,
    y: index,
  }));
  const rowById = new Map(orderedRecords.map((record) => [record.id, record.y]));
  return {
    orderedRecords,
    rowById,
  };
}

function buildOldRowToNewRow(records = [], rowById = new Map()) {
  return new Map(
    records.map((record) => [normalizeInteger(record.y), rowById.get(record.id) ?? normalizeInteger(record.y)])
  );
}

function remapCompositeLabelRows(label = {}, oldRowToNewRow = new Map()) {
  const rowStart = normalizeInteger(label?.rowStart);
  const rowEnd = normalizeInteger(label?.rowEnd);
  const mappedRows = [];
  for (let row = rowStart; row <= rowEnd; row += 1) {
    if (oldRowToNewRow.has(row)) {
      mappedRows.push(oldRowToNewRow.get(row));
    }
  }
  if (!mappedRows.length) {
    return cloneCompositeLabel(label);
  }
  return {
    ...cloneCompositeLabel(label),
    rowStart: Math.min(...mappedRows),
    rowEnd: Math.max(...mappedRows),
  };
}

export function findPdgeditCatalystPassThruChains(document = {}) {
  const objectsById = buildObjectsById(document);
  const neighborsById = buildNeighborIdsByObjectId(document);
  const claimedObjectIds = new Set();

  return (Array.isArray(document?.assemblies) ? document.assemblies : [])
    .filter((assembly) => normalizeText(assembly?.role) === "reactant")
    .sort(compareByYThenXThenId)
    .flatMap((reactantAssembly) => {
      if (claimedObjectIds.has(reactantAssembly.id)) {
        return [];
      }
      const chain = matchCatalystPassThruChain({
        reactantAssembly,
        objectsById,
        neighborsById,
      });
      if (!chain) {
        return [];
      }
      const chainObjectIds = [
        chain.reactantAssemblyId,
        chain.reactantOperatorId,
        chain.intermediateAssemblyId,
        chain.productOperatorId,
        chain.productAssemblyId,
      ];
      if (chainObjectIds.some((id) => claimedObjectIds.has(id))) {
        return [];
      }
      chainObjectIds.forEach((id) => claimedObjectIds.add(id));
      return [chain];
    });
}

export function sortPdgeditCatalystPassThruChainsToTop(document = {}) {
  const assemblies = (Array.isArray(document?.assemblies) ? document.assemblies : []).map(cloneAssembly);
  const operators = (Array.isArray(document?.operators) ? document.operators : []).map(cloneOperator);
  const links = (Array.isArray(document?.links) ? document.links : []).map(cloneLink);
  const compositeLabels = (Array.isArray(document?.compositeLabels) ? document.compositeLabels : []).map(
    cloneCompositeLabel
  );
  const nextDocument = {
    schema: normalizeText(document?.schema),
    assemblies,
    operators,
    links,
    compositeLabels,
  };

  const catalystChains = findPdgeditCatalystPassThruChains(nextDocument);
  if (!catalystChains.length) {
    return nextDocument;
  }

  const catalystAssemblyIdsByRole = {
    reactant: catalystChains.map((chain) => chain.reactantAssemblyId),
    intermediate: catalystChains.map((chain) => chain.intermediateAssemblyId),
    product: catalystChains.map((chain) => chain.productAssemblyId),
  };
  const catalystOperatorIdsBySide = {
    reactant: catalystChains.map((chain) => chain.reactantOperatorId),
    product: catalystChains.map((chain) => chain.productOperatorId),
  };

  const reactantAssemblies = assemblies.filter((assembly) => normalizeText(assembly.role) === "reactant");
  const intermediateAssemblies = assemblies.filter((assembly) => normalizeText(assembly.role) === "intermediate");
  const productAssemblies = assemblies.filter((assembly) => normalizeText(assembly.role) === "product");
  const reactantOperators = operators.filter(
    (operator) => normalizeInteger(operator.x) === getPdgeditOperatorStageXForSide("reactant")
  );
  const productOperators = operators.filter(
    (operator) => normalizeInteger(operator.x) === getPdgeditOperatorStageXForSide("product")
  );

  const reactantAssemblyOrder = orderLaneRecords(reactantAssemblies, catalystAssemblyIdsByRole.reactant);
  const intermediateAssemblyOrder = orderLaneRecords(intermediateAssemblies, catalystAssemblyIdsByRole.intermediate);
  const productAssemblyOrder = orderLaneRecords(productAssemblies, catalystAssemblyIdsByRole.product);
  const reactantOperatorOrder = orderLaneRecords(reactantOperators, catalystOperatorIdsBySide.reactant);
  const productOperatorOrder = orderLaneRecords(productOperators, catalystOperatorIdsBySide.product);

  const assemblyUpdatesById = new Map(
    [
      ...reactantAssemblyOrder.orderedRecords,
      ...intermediateAssemblyOrder.orderedRecords,
      ...productAssemblyOrder.orderedRecords,
    ].map((record) => [record.id, record])
  );
  const operatorUpdatesById = new Map(
    [...reactantOperatorOrder.orderedRecords, ...productOperatorOrder.orderedRecords].map((record) => [record.id, record])
  );

  const reactantOldRowToNewRow = buildOldRowToNewRow(reactantAssemblies, reactantAssemblyOrder.rowById);
  const productOldRowToNewRow = buildOldRowToNewRow(productAssemblies, productAssemblyOrder.rowById);

  return {
    schema: nextDocument.schema,
    assemblies: assemblies
      .map((assembly) => assemblyUpdatesById.get(assembly.id) ?? assembly)
      .sort(compareByYThenXThenId),
    operators: operators
      .map((operator) => operatorUpdatesById.get(operator.id) ?? operator)
      .sort(compareByYThenXThenId),
    links,
    compositeLabels: compositeLabels.map((label) => {
      const side = normalizeText(label.side);
      if (side === "left") {
        return remapCompositeLabelRows(label, reactantOldRowToNewRow);
      }
      if (side === "right") {
        return remapCompositeLabelRows(label, productOldRowToNewRow);
      }
      return label;
    }),
  };
}
