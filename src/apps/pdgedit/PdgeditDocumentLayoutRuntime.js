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

function normalizeBalanceTotals(rawTotals) {
  if (!rawTotals || typeof rawTotals !== "object") {
    return null;
  }
  const epsilonMinusCount = normalizeInteger(rawTotals.epsilonMinusCount, -1);
  const epsilonPlusCount = normalizeInteger(rawTotals.epsilonPlusCount, -1);
  if (epsilonMinusCount < 0 || epsilonPlusCount < 0) {
    return null;
  }
  return {
    epsilonMinusCount,
    epsilonPlusCount,
  };
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

function cloneMetadata(metadata = null) {
  if (!metadata || typeof metadata !== "object") {
    return undefined;
  }
  const reactionSummary = metadata.reactionSummary;
  const clonedMetadata = {};
  if (reactionSummary && typeof reactionSummary === "object") {
    clonedMetadata.reactionSummary = {
      title: normalizeText(reactionSummary.title),
      ...(normalizeText(reactionSummary.pdgIdentifier)
        ? { pdgIdentifier: normalizeText(reactionSummary.pdgIdentifier) }
        : {}),
      pdgReactants: Array.isArray(reactionSummary.pdgReactants)
        ? reactionSummary.pdgReactants
            .map((participant) => ({ text: normalizeText(participant?.text) }))
            .filter((participant) => participant.text)
        : [],
      aaaReactants: Array.isArray(reactionSummary.aaaReactants)
        ? reactionSummary.aaaReactants
            .map((participant) => ({ text: normalizeText(participant?.text) }))
            .filter((participant) => participant.text)
        : [],
      pdgProducts: Array.isArray(reactionSummary.pdgProducts)
        ? reactionSummary.pdgProducts
            .map((participant) => ({ text: normalizeText(participant?.text) }))
            .filter((participant) => participant.text)
        : [],
      aaaProducts: Array.isArray(reactionSummary.aaaProducts)
        ? reactionSummary.aaaProducts
            .map((participant) => ({ text: normalizeText(participant?.text) }))
            .filter((participant) => participant.text)
        : [],
    };
  }
  const reactantTotals = normalizeBalanceTotals(metadata.balanceSummary?.reactantTotals);
  const productTotals = normalizeBalanceTotals(metadata.balanceSummary?.productTotals);
  if (reactantTotals && productTotals) {
    clonedMetadata.balanceSummary = {
      reactantTotals,
      productTotals,
      isBalanced:
        reactantTotals.epsilonMinusCount === productTotals.epsilonMinusCount &&
        reactantTotals.epsilonPlusCount === productTotals.epsilonPlusCount,
    };
  }
  return Object.keys(clonedMetadata).length ? clonedMetadata : undefined;
}

function createIndexById(ids = []) {
  return new Map(ids.map((id, index) => [id, index]));
}

function computeMedian(values = []) {
  if (!values.length) {
    return null;
  }
  const sortedValues = [...values].sort((left, right) => left - right);
  const middleIndex = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 1) {
    return sortedValues[middleIndex];
  }
  return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
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

function buildLaneState(records = [], { pinnedTopIds = [], pinnedBottomIds = [] } = {}) {
  const stableRecords = [...records].sort(compareByYThenXThenId);
  const recordById = new Map(stableRecords.map((record) => [record.id, record]));
  const stableIdSet = new Set(stableRecords.map((record) => record.id));
  const normalizedPinnedTopIds = pinnedTopIds.filter((id) => stableIdSet.has(id));
  const pinnedTopIdSet = new Set(normalizedPinnedTopIds);
  const normalizedPinnedBottomIds = pinnedBottomIds.filter(
    (id) => stableIdSet.has(id) && !pinnedTopIdSet.has(id)
  );
  const pinnedBottomIdSet = new Set(normalizedPinnedBottomIds);
  const orderIds = [
    ...normalizedPinnedTopIds,
    ...stableRecords
      .map((record) => record.id)
      .filter((id) => !pinnedTopIdSet.has(id) && !pinnedBottomIdSet.has(id)),
    ...normalizedPinnedBottomIds,
  ];
  return {
    recordById,
    stableIndexById: createIndexById(stableRecords.map((record) => record.id)),
    orderIds,
    orderIndexById: createIndexById(orderIds),
    pinnedTopCount: normalizedPinnedTopIds.length,
    pinnedBottomCount: normalizedPinnedBottomIds.length,
  };
}

function updateLaneOrder(laneState = {}, orderIds = []) {
  laneState.orderIds = [...orderIds];
  laneState.orderIndexById = createIndexById(laneState.orderIds);
}

function buildLaneIndexByObjectId(laneStates = []) {
  const laneIndexByObjectId = new Map();
  laneStates.forEach((laneState, laneIndex) => {
    laneState.recordById.forEach((_, objectId) => {
      laneIndexByObjectId.set(objectId, laneIndex);
    });
  });
  return laneIndexByObjectId;
}

function buildEdgesByLanePair(document = {}, laneIndexByObjectId = new Map()) {
  const edgesByLanePair = new Map();

  function appendEdge(leftLaneIndex, rightLaneIndex, leftId, rightId) {
    const key = `${leftLaneIndex}:${rightLaneIndex}`;
    if (!edgesByLanePair.has(key)) {
      edgesByLanePair.set(key, []);
    }
    edgesByLanePair.get(key).push({ leftId, rightId });
  }

  (Array.isArray(document?.links) ? document.links : []).forEach((link) => {
    const endpointA = normalizeText(link?.endpointA);
    const endpointB = normalizeText(link?.endpointB);
    const laneIndexA = laneIndexByObjectId.get(endpointA);
    const laneIndexB = laneIndexByObjectId.get(endpointB);
    if (
      !Number.isInteger(laneIndexA) ||
      !Number.isInteger(laneIndexB) ||
      Math.abs(laneIndexA - laneIndexB) !== 1
    ) {
      return;
    }
    if (laneIndexA < laneIndexB) {
      appendEdge(laneIndexA, laneIndexB, endpointA, endpointB);
      return;
    }
    appendEdge(laneIndexB, laneIndexA, endpointB, endpointA);
  });

  return edgesByLanePair;
}

function getNeighborPositionsForLane(
  objectId = "",
  targetLaneIndex = -1,
  neighborsById = new Map(),
  laneIndexByObjectId = new Map(),
  laneStates = []
) {
  const targetLane = laneStates[targetLaneIndex];
  if (!targetLane) {
    return [];
  }
  return [...(neighborsById.get(normalizeText(objectId)) ?? [])]
    .filter((neighborId) => laneIndexByObjectId.get(neighborId) === targetLaneIndex)
    .map((neighborId) => targetLane.orderIndexById.get(neighborId))
    .filter((position) => Number.isFinite(position))
    .sort((left, right) => left - right);
}

function getMovableBounds(laneState = {}) {
  const startIndex = normalizeInteger(laneState?.pinnedTopCount);
  const endIndex = laneState.orderIds.length - normalizeInteger(laneState?.pinnedBottomCount);
  return { startIndex, endIndex };
}

function reorderLaneByMedian(
  laneState = {},
  referenceLaneIndex = -1,
  neighborsById = new Map(),
  laneIndexByObjectId = new Map(),
  laneStates = []
) {
  if (!laneState) {
    return false;
  }
  const { startIndex, endIndex } = getMovableBounds(laneState);
  if (endIndex - startIndex <= 1) {
    return false;
  }
  const pinnedTopIds = laneState.orderIds.slice(0, startIndex);
  const movableIds = laneState.orderIds.slice(startIndex, endIndex);
  const pinnedBottomIds = laneState.orderIds.slice(endIndex);
  const nextMovableIds = [...movableIds].sort((leftId, rightId) => {
    const leftMedian = computeMedian(
      getNeighborPositionsForLane(leftId, referenceLaneIndex, neighborsById, laneIndexByObjectId, laneStates)
    );
    const rightMedian = computeMedian(
      getNeighborPositionsForLane(rightId, referenceLaneIndex, neighborsById, laneIndexByObjectId, laneStates)
    );
    const leftFallback =
      laneState.orderIndexById.get(leftId) ?? laneState.stableIndexById.get(leftId) ?? Number.MAX_SAFE_INTEGER;
    const rightFallback =
      laneState.orderIndexById.get(rightId) ?? laneState.stableIndexById.get(rightId) ?? Number.MAX_SAFE_INTEGER;
    const leftScore = leftMedian ?? leftFallback;
    const rightScore = rightMedian ?? rightFallback;
    return (
      leftScore - rightScore ||
      leftFallback - rightFallback ||
      normalizeText(leftId).localeCompare(normalizeText(rightId))
    );
  });
  const nextOrderIds = [...pinnedTopIds, ...nextMovableIds, ...pinnedBottomIds];
  const changed = nextOrderIds.some((id, index) => id !== laneState.orderIds[index]);
  if (changed) {
    updateLaneOrder(laneState, nextOrderIds);
  }
  return changed;
}

function countLanePairCrossings(leftLaneState = {}, rightLaneState = {}, edges = []) {
  if (!leftLaneState || !rightLaneState || edges.length <= 1) {
    return 0;
  }
  let crossings = 0;
  for (let leftEdgeIndex = 0; leftEdgeIndex < edges.length; leftEdgeIndex += 1) {
    const firstLeft = leftLaneState.orderIndexById.get(edges[leftEdgeIndex].leftId);
    const firstRight = rightLaneState.orderIndexById.get(edges[leftEdgeIndex].rightId);
    if (!Number.isFinite(firstLeft) || !Number.isFinite(firstRight)) {
      continue;
    }
    for (let rightEdgeIndex = leftEdgeIndex + 1; rightEdgeIndex < edges.length; rightEdgeIndex += 1) {
      const secondLeft = leftLaneState.orderIndexById.get(edges[rightEdgeIndex].leftId);
      const secondRight = rightLaneState.orderIndexById.get(edges[rightEdgeIndex].rightId);
      if (!Number.isFinite(secondLeft) || !Number.isFinite(secondRight)) {
        continue;
      }
      if ((firstLeft - secondLeft) * (firstRight - secondRight) < 0) {
        crossings += 1;
      }
    }
  }
  return crossings;
}

function countCrossingsTouchingLane(laneStates = [], laneIndex = -1, edgesByLanePair = new Map()) {
  let crossings = 0;
  if (laneIndex > 0) {
    crossings += countLanePairCrossings(
      laneStates[laneIndex - 1],
      laneStates[laneIndex],
      edgesByLanePair.get(`${laneIndex - 1}:${laneIndex}`) ?? []
    );
  }
  if (laneIndex < laneStates.length - 1) {
    crossings += countLanePairCrossings(
      laneStates[laneIndex],
      laneStates[laneIndex + 1],
      edgesByLanePair.get(`${laneIndex}:${laneIndex + 1}`) ?? []
    );
  }
  return crossings;
}

function applyAdjacentSwapPass(laneStates = [], laneIndex = -1, edgesByLanePair = new Map()) {
  const laneState = laneStates[laneIndex];
  if (!laneState) {
    return false;
  }
  const { startIndex, endIndex } = getMovableBounds(laneState);
  if (endIndex - startIndex <= 1) {
    return false;
  }
  let changedAny = false;
  let changedThisPass = true;
  while (changedThisPass) {
    changedThisPass = false;
    for (let position = startIndex; position < endIndex - 1; position += 1) {
      const beforeCrossings = countCrossingsTouchingLane(laneStates, laneIndex, edgesByLanePair);
      const swappedIds = [...laneState.orderIds];
      [swappedIds[position], swappedIds[position + 1]] = [swappedIds[position + 1], swappedIds[position]];
      updateLaneOrder(laneState, swappedIds);
      const afterCrossings = countCrossingsTouchingLane(laneStates, laneIndex, edgesByLanePair);
      if (afterCrossings < beforeCrossings) {
        changedAny = true;
        changedThisPass = true;
        continue;
      }
      [swappedIds[position], swappedIds[position + 1]] = [swappedIds[position + 1], swappedIds[position]];
      updateLaneOrder(laneState, swappedIds);
    }
  }
  return changedAny;
}

function reduceLaneCrossings(laneStates = [], document = {}) {
  const laneIndexByObjectId = buildLaneIndexByObjectId(laneStates);
  const neighborsById = buildNeighborIdsByObjectId(document);
  const edgesByLanePair = buildEdgesByLanePair(document, laneIndexByObjectId);
  const maximumSweepCount = 4;

  for (let sweepIndex = 0; sweepIndex < maximumSweepCount; sweepIndex += 1) {
    let changed = false;

    for (let laneIndex = 1; laneIndex < laneStates.length; laneIndex += 1) {
      changed =
        reorderLaneByMedian(laneStates[laneIndex], laneIndex - 1, neighborsById, laneIndexByObjectId, laneStates) ||
        changed;
    }

    for (let laneIndex = laneStates.length - 2; laneIndex >= 0; laneIndex -= 1) {
      changed =
        reorderLaneByMedian(laneStates[laneIndex], laneIndex + 1, neighborsById, laneIndexByObjectId, laneStates) ||
        changed;
    }

    for (let laneIndex = 0; laneIndex < laneStates.length; laneIndex += 1) {
      changed = applyAdjacentSwapPass(laneStates, laneIndex, edgesByLanePair) || changed;
    }

    if (!changed) {
      break;
    }
  }
}

function buildLaneRowById(laneState = {}) {
  return new Map(laneState.orderIds.map((recordId, rowIndex) => [recordId, rowIndex]));
}

function buildOrderedLaneRecords(laneState = {}) {
  return laneState.orderIds
    .map((recordId, rowIndex) => ({
      ...laneState.recordById.get(recordId),
      y: rowIndex,
    }))
    .filter(Boolean);
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

function isUnboundArchitrinosAssembly(assembly = {}) {
  return (
    normalizeText(assembly?.type) === "unbound-architrinos-assembly" ||
    normalizeText(assembly?.title) === "Unbound Architrinos"
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
  const metadata = cloneMetadata(document?.metadata);
  const nextDocument = {
    schema: normalizeText(document?.schema),
    ...(metadata ? { metadata } : {}),
    assemblies,
    operators,
    links,
    compositeLabels,
  };

  const catalystChains = findPdgeditCatalystPassThruChains(nextDocument);
  const catalystAssemblyIdsByRole = {
    reactant: catalystChains.map((chain) => chain.reactantAssemblyId),
    intermediate: catalystChains.map((chain) => chain.intermediateAssemblyId),
    product: catalystChains.map((chain) => chain.productAssemblyId),
  };
  const catalystOperatorIdsBySide = {
    reactant: catalystChains.map((chain) => chain.reactantOperatorId),
    product: catalystChains.map((chain) => chain.productOperatorId),
  };
  const trailingAssemblyIdsByRole = {
    intermediate: assemblies
      .filter((assembly) => normalizeText(assembly.role) === "intermediate")
      .filter(isUnboundArchitrinosAssembly)
      .sort(compareByYThenXThenId)
      .map((assembly) => assembly.id),
    product: assemblies
      .filter((assembly) => normalizeText(assembly.role) === "product")
      .filter(isUnboundArchitrinosAssembly)
      .sort(compareByYThenXThenId)
      .map((assembly) => assembly.id),
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

  const reactantAssemblyLane = buildLaneState(reactantAssemblies, {
    pinnedTopIds: catalystAssemblyIdsByRole.reactant,
  });
  const reactantOperatorLane = buildLaneState(reactantOperators, {
    pinnedTopIds: catalystOperatorIdsBySide.reactant,
  });
  const intermediateAssemblyLane = buildLaneState(intermediateAssemblies, {
    pinnedTopIds: catalystAssemblyIdsByRole.intermediate,
    pinnedBottomIds: trailingAssemblyIdsByRole.intermediate,
  });
  const productOperatorLane = buildLaneState(productOperators, {
    pinnedTopIds: catalystOperatorIdsBySide.product,
  });
  const productAssemblyLane = buildLaneState(productAssemblies, {
    pinnedTopIds: catalystAssemblyIdsByRole.product,
    pinnedBottomIds: trailingAssemblyIdsByRole.product,
  });

  reduceLaneCrossings(
    [
      reactantAssemblyLane,
      reactantOperatorLane,
      intermediateAssemblyLane,
      productOperatorLane,
      productAssemblyLane,
    ],
    nextDocument
  );

  const assemblyUpdatesById = new Map(
    [
      ...buildOrderedLaneRecords(reactantAssemblyLane),
      ...buildOrderedLaneRecords(intermediateAssemblyLane),
      ...buildOrderedLaneRecords(productAssemblyLane),
    ].map((record) => [record.id, record])
  );
  const operatorUpdatesById = new Map(
    [...buildOrderedLaneRecords(reactantOperatorLane), ...buildOrderedLaneRecords(productOperatorLane)].map(
      (record) => [record.id, record]
    )
  );

  const reactantOldRowToNewRow = buildOldRowToNewRow(reactantAssemblies, buildLaneRowById(reactantAssemblyLane));
  const productOldRowToNewRow = buildOldRowToNewRow(productAssemblies, buildLaneRowById(productAssemblyLane));

  const nextMetadata = cloneMetadata(nextDocument.metadata);
  return {
    schema: nextDocument.schema,
    ...(nextMetadata ? { metadata: nextMetadata } : {}),
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
