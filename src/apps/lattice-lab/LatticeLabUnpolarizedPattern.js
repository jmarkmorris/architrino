const EPSILON = 1e-7;

function freezeVector(vector) {
  return Object.freeze(vector.map(Number));
}

function addVectors(...vectors) {
  return vectors.reduce(
    (sum, vector) => sum.map((value, index) => value + vector[index]),
    [0, 0, 0],
  );
}

function scaleVector(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function fractionalToCartesian(fractional, vectors) {
  return addVectors(
    scaleVector(vectors[0], fractional[0]),
    scaleVector(vectors[1], fractional[1]),
    scaleVector(vectors[2], fractional[2]),
  );
}

function positionKey(position) {
  return position.map((value) => Number(value.toFixed(9))).join(",");
}

function undirectedPositionPairKey(start, end) {
  return [positionKey(start), positionKey(end)].sort().join("|");
}

function countRelationshipFrameOverlaps(relationshipSegments, frameSegments) {
  const frameKeys = new Set(frameSegments.map(({ start, end }) =>
    undirectedPositionPairKey(start, end)
  ));
  return relationshipSegments.filter(({ start, end }) =>
    frameKeys.has(undirectedPositionPairKey(start, end))
  ).length;
}

function createParallelepipedFrame(vectors) {
  const center = scaleVector(addVectors(...vectors), 0.5);
  const corners = new Map();
  for (let i = 0; i <= 1; i += 1) {
    for (let j = 0; j <= 1; j += 1) {
      for (let k = 0; k <= 1; k += 1) {
        const fractional = [i, j, k];
        corners.set(
          `${i}${j}${k}`,
          freezeVector(fractionalToCartesian(fractional, vectors).map(
            (value, axis) => value - center[axis],
          )),
        );
      }
    }
  }
  const segments = [];
  corners.forEach((start, key) => {
    [...key].forEach((bit, axis) => {
      if (bit !== "0") {
        return;
      }
      const endKey = [...key].map(
        (value, index) => index === axis ? "1" : value,
      ).join("");
      segments.push(Object.freeze({
        id: `${key}-${endKey}`,
        start,
        end: corners.get(endKey),
      }));
    });
  });
  return Object.freeze(segments);
}

function createRepresentedNearestNeighborSegments(
  sites,
  nearestNeighborDistance,
  expectedRelationshipCount,
) {
  if (nearestNeighborDistance == null) {
    return Object.freeze([]);
  }
  const segments = [];
  sites.forEach((fromSite, fromIndex) => {
    sites.slice(fromIndex + 1).forEach((toSite) => {
      const canonicalDistance = Math.hypot(...toSite.position.map(
        (value, axis) => value - fromSite.position[axis],
      ));
      if (Math.abs(canonicalDistance - nearestNeighborDistance) >= EPSILON) {
        return;
      }
      segments.push(Object.freeze({
        id: `nearest-${fromSite.id}-${toSite.id}`,
        fromSiteId: fromSite.id,
        toSiteId: toSite.id,
        start: fromSite.position,
        end: toSite.position,
        canonicalDistance,
      }));
    });
  });
  if (
    Number.isInteger(expectedRelationshipCount) &&
    segments.length !== expectedRelationshipCount
  ) {
    throw new Error(
      `Expected ${expectedRelationshipCount} represented nearest-neighbor ` +
        `segments, found ${segments.length}.`,
    );
  }
  return Object.freeze(segments);
}

export function createParallelepipedUnpolarizedPattern({
  label,
  vectors,
  basis,
  nearestNeighborDistance = null,
  expectedRelationshipCount = null,
}) {
  const frozenVectors = Object.freeze(vectors.map(freezeVector));
  const center = scaleVector(addVectors(...frozenVectors), 0.5);
  const siteByPosition = new Map();
  basis.forEach((basisSite) => {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        for (let k = -1; k <= 1; k += 1) {
          const fractional = basisSite.fractional.map(
            (value, axis) => value + [i, j, k][axis],
          );
          if (fractional.some((value) =>
            value < -EPSILON || value > 1 + EPSILON
          )) {
            continue;
          }
          const position = fractionalToCartesian(
            fractional,
            frozenVectors,
          ).map((value, axis) => value - center[axis]);
          siteByPosition.set(positionKey(position), freezeVector(position));
        }
      }
    }
  });
  const sites = [...siteByPosition.values()]
    .sort((left, right) => positionKey(left).localeCompare(positionKey(right)))
    .map((position, index) => Object.freeze({
      id: `conventional-site-${index}`,
      position,
    }));
  const relationshipSegments = createRepresentedNearestNeighborSegments(
    sites,
    nearestNeighborDistance,
    expectedRelationshipCount,
  );
  const frameSegments = createParallelepipedFrame(frozenVectors);
  return Object.freeze({
    kind: "conventional-parallelepiped",
    label,
    geometrySource: "canonical-conventional-vectors-and-basis",
    sites: Object.freeze(sites),
    frameSegments,
    relationshipSegments,
    relationshipFrameOverlapCount: countRelationshipFrameOverlaps(
      relationshipSegments,
      frameSegments,
    ),
    relationshipCoverage: relationshipSegments.length > 0
      ? "represented-endpoints-only"
      : "none",
  });
}

export function createHcpUnpolarizedPattern({
  label,
  vectors,
  nearestNeighborDistance = null,
  expectedRelationshipCount = null,
}) {
  const [a1, a2, cVector] = vectors.map(freezeVector);
  const cHalf = scaleVector(cVector, 0.5);
  const basalVertices = [
    a1,
    a2,
    addVectors(a2, scaleVector(a1, -1)),
    scaleVector(a1, -1),
    scaleVector(a2, -1),
    addVectors(a1, scaleVector(a2, -1)),
  ];
  const bottomVertices = basalVertices.map((position) =>
    freezeVector(addVectors(position, scaleVector(cHalf, -1)))
  );
  const topVertices = basalVertices.map((position) =>
    freezeVector(addVectors(position, cHalf))
  );
  const basalCenterBottom = freezeVector(scaleVector(cHalf, -1));
  const basalCenterTop = freezeVector(cHalf);
  const bOffset = fractionalToCartesian(
    [1 / 3, 1 / 3, 0],
    [a1, a2, cVector],
  );
  const bSites = [
    bOffset,
    addVectors(bOffset, scaleVector(a1, -1)),
    addVectors(bOffset, scaleVector(a2, -1)),
  ].map(freezeVector);
  const sites = [
    ...bottomVertices,
    ...topVertices,
    basalCenterBottom,
    basalCenterTop,
    ...bSites,
  ].map((position, index) => Object.freeze({
    id: `conventional-site-${index}`,
    position,
  }));
  const frameSegments = [];
  for (let index = 0; index < 6; index += 1) {
    const next = (index + 1) % 6;
    frameSegments.push(
      Object.freeze({
        id: `bottom-${index}-${next}`,
        start: bottomVertices[index],
        end: bottomVertices[next],
      }),
      Object.freeze({
        id: `top-${index}-${next}`,
        start: topVertices[index],
        end: topVertices[next],
      }),
      Object.freeze({
        id: `vertical-${index}`,
        start: bottomVertices[index],
        end: topVertices[index],
      }),
    );
  }
  const frozenSites = Object.freeze(sites);
  const relationshipSegments = createRepresentedNearestNeighborSegments(
    frozenSites,
    nearestNeighborDistance,
    expectedRelationshipCount,
  );
  const frozenFrameSegments = Object.freeze(frameSegments);
  return Object.freeze({
    kind: "conventional-hexagonal-prism",
    label,
    geometrySource: "canonical-hcp-vectors-and-basis",
    sites: frozenSites,
    frameSegments: frozenFrameSegments,
    relationshipSegments,
    relationshipFrameOverlapCount: countRelationshipFrameOverlaps(
      relationshipSegments,
      frozenFrameSegments,
    ),
    relationshipCoverage: relationshipSegments.length > 0
      ? "represented-endpoints-only"
      : "none",
  });
}
