import * as THREE from "../../../vendor/three/three.module.js";
import { createPanelCollapseIconSvg } from "../../runtime/PanelCollapseIcons.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneAppHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";
import {
  createStandaloneAppSceneSearchRuntime,
  resolveStandaloneGlobalSceneHref,
  TEXTBOOK_TOC_SCENE_PATH,
} from "../navigator/StandaloneAppSceneSearchRuntime.js";
import {
  LATTICE_LAB_CASE_ID,
  LATTICE_LAB_POLARITY,
  createClippedNeighborSegment,
  createLatticeLabCaseGallery,
  createRandomFiniteFiftyFiftyCase,
  createRepeatCellNearestNeighborNetwork,
  createReferencePolarityState,
  createSelectedSiteLedger,
  getLatticeSite,
  isReferenceLatticeConfiguration,
} from "./LatticeLabCase.js";
import {
  LATTICE_LAB_RANDOM_FINITE_CASE_ID,
  nextLatticeLabRandomFiniteSeed,
} from "./LatticeLabRandomFinite.js";
import {
  createStationarySimpleCubicExhaustionLedger,
} from "./SimpleCubicStationaryLedger.js";
import {
  createLatticeLabLedgerViewModel,
  renderLatticeLabLedgerViewModel,
} from "./LatticeLabLedgerPresentation.js";
import {
  validatePeriodicSymmetryCertificate,
} from "./LatticeLabPeriodicStationary.js";

const ELECTRINO_COLOR = 0x0000ff;
const POSITRINO_COLOR = 0xff0000;
const ENDPOINT_AGGREGATE_COLOR = 0x9f7cff;
const GEOMETRY_LINE_COLOR = 0xc6b6ff;
const GEOMETRY_LINE_OPACITY = 0.64;
const GEOMETRY_LINE_WIDTH = 1;
const REPEAT_CELL_HIGHLIGHT_COLOR = 0xb79cff;
const REPEAT_CELL_HIGHLIGHT_RADIUS = 0.0176;
const DEFAULT_VIEW_HALF_HEIGHT = 4.4;
const BASELINE_DISPLAY_RADIUS = 3.25;
const MIN_VIEW_HALF_HEIGHT = 1.35;
const MAX_VIEW_HALF_HEIGHT = 8.5;
const CAMERA_DISTANCE = 12;
const MARKER_RADIUS_PX = 8;
const SELECTION_CIRCLE_OUTER_RADIUS_PX = 14;
const SELECTION_CIRCLE_INNER_RADIUS_PX = 10;
const SELECTION_CIRCLE_TEXTURE_SIZE_PX = 64;
const SELECTION_CIRCLE_TEXTURE_STROKE_PX = 5;
const POINTER_CLICK_TRAVEL_PX = 7;
const DEFAULT_BASE_ROTATION = Object.freeze([-0.44, 0.66, 0]);
const DEFAULT_Z_UP_SCREEN_ROLL = 1.0688619267721347;
const TRIPOD_ORIGIN = Object.freeze({ x: 72, y: 66 });
const TRIPOD_AXIS_RADIUS = 42;
const TRIPOD_LABEL_GAP = 10;
const MAX_COMPRESSION_SCALE = 0.01;

export function defaultViewHalfHeightForDisplayRadius(displayRadius) {
  if (!Number.isFinite(displayRadius) || displayRadius <= 0) {
    throw new RangeError("Display radius must be finite and positive.");
  }
  return DEFAULT_VIEW_HALF_HEIGHT * (
    displayRadius / BASELINE_DISPLAY_RADIUS
  );
}

export const LATTICE_LAB_SELECTION_CIRCLE_STROKE_PX =
  Math.round(
    SELECTION_CIRCLE_TEXTURE_STROKE_PX *
    (2 * SELECTION_CIRCLE_OUTER_RADIUS_PX / SELECTION_CIRCLE_TEXTURE_SIZE_PX),
  );

export function xAxisScaleFromDeformationBeta(beta) {
  if (!Number.isFinite(beta) || beta < 0 || beta > 1) {
    throw new RangeError("Deformation beta must satisfy 0 <= beta <= 1.");
  }
  return Number(
    (1 - beta * (1 - MAX_COMPRESSION_SCALE)).toFixed(12),
  );
}

export function createUniaxialDeformedPosition(
  position,
  { axis = "x", factor = 1 } = {},
) {
  const axisIndex = ["x", "y", "z"].indexOf(axis);
  if (
    !Array.isArray(position) || position.length !== 3 ||
    !position.every(Number.isFinite) || axisIndex < 0 ||
    !Number.isFinite(factor) || factor <= 0 || factor > 1
  ) {
    throw new TypeError(
      "Uniaxial deformation requires a finite 3D position, a semantic axis, " +
      "and a factor in (0, 1].",
    );
  }
  return Object.freeze(position.map(
    (value, index) => index === axisIndex ? value * factor : value,
  ));
}

export function createSelectedSiteCircleDescriptor({
  caseRecord,
  polarityBySiteId,
  selectedSiteId,
  deformationAxis = "x",
  deformationFactor = 1,
}) {
  const site = getLatticeSite(caseRecord, selectedSiteId);
  const polarity = polarityBySiteId?.[selectedSiteId];
  if (
    !site ||
    ![LATTICE_LAB_POLARITY.ELECTRINO, LATTICE_LAB_POLARITY.POSITRINO]
      .includes(polarity)
  ) {
    throw new Error("Selection circle requires the selected ledger receiver.");
  }
  const colorName = polarity === LATTICE_LAB_POLARITY.POSITRINO
    ? "red"
    : "blue";
  const polarityArticle = polarity === LATTICE_LAB_POLARITY.ELECTRINO ? "an" : "a";
  return Object.freeze({
    siteId: site.id,
    polarity,
    color: polarity === LATTICE_LAB_POLARITY.POSITRINO
      ? POSITRINO_COLOR
      : ELECTRINO_COLOR,
    colorName,
    position: createUniaxialDeformedPosition(site.position, {
      axis: deformationAxis,
      factor: deformationFactor,
    }),
    outerRadiusPx: SELECTION_CIRCLE_OUTER_RADIUS_PX,
    innerRadiusPx: SELECTION_CIRCLE_INNER_RADIUS_PX,
    accessibleLabel: caseRecord.id === LATTICE_LAB_RANDOM_FINITE_CASE_ID
      ? `Selected calculation target is ${polarityArticle} ${polarity}, marked by a ` +
        `${colorName} outer selection circle.`
      : `Selected ledger site is ${polarityArticle} ${polarity}, marked by a ` +
        `${colorName} outer selection circle.`,
  });
}

export function createEndpointVisualAggregation(sites, edges, tolerance) {
  if (
    !Array.isArray(sites) || !Array.isArray(edges) ||
    !Number.isFinite(tolerance) || tolerance <= 0 ||
    sites.some((site) =>
      typeof site?.id !== "string" || !Array.isArray(site.position) ||
      site.position.length !== 3 || !site.position.every(Number.isFinite)
    )
  ) {
    throw new TypeError("Endpoint aggregation requires finite positioned sites and a positive tolerance.");
  }
  const parent = new Map(sites.map(({ id }) => [id, id]));
  const find = (id) => {
    let root = id;
    while (parent.get(root) !== root) {
      root = parent.get(root);
    }
    let cursor = id;
    while (parent.get(cursor) !== root) {
      const next = parent.get(cursor);
      parent.set(cursor, root);
      cursor = next;
    }
    return root;
  };
  const unite = (left, right) => {
    const leftRoot = find(left);
    const rightRoot = find(right);
    if (leftRoot !== rightRoot) {
      parent.set(rightRoot, leftRoot);
    }
  };
  sites.forEach((left, leftIndex) => {
    sites.slice(leftIndex + 1).forEach((right) => {
      const distance = Math.hypot(...right.position.map(
        (value, index) => value - left.position[index],
      ));
      if (distance <= tolerance) {
        unite(left.id, right.id);
      }
    });
  });
  const sitesByRoot = new Map();
  sites.forEach((site) => {
    const root = find(site.id);
    sitesByRoot.set(root, [...(sitesByRoot.get(root) ?? []), site]);
  });
  const groups = [...sitesByRoot.values()].map((members, index) => {
    const memberIds = Object.freeze(members.map(({ id }) => id).sort());
    const position = Object.freeze([0, 1, 2].map((coordinate) =>
      members.reduce((sum, site) => sum + site.position[coordinate], 0) /
        members.length
    ));
    return Object.freeze({
      id: `endpoint-group-${index}-${memberIds.join("+")}`,
      memberIds,
      position,
      collapsed: members.length > 1,
    });
  });
  const groupBySiteId = new Map();
  groups.forEach((group) => group.memberIds.forEach(
    (siteId) => groupBySiteId.set(siteId, group),
  ));
  const internalEdgeIds = [];
  const externalEdges = [];
  const seenGroupPairs = new Set();
  const redundantExternalEdgeIds = [];
  edges.forEach((edge) => {
    const fromGroup = groupBySiteId.get(edge.fromSiteId);
    const toGroup = groupBySiteId.get(edge.toSiteId);
    if (!fromGroup || !toGroup) {
      externalEdges.push(Object.freeze({ ...edge, fromGroup, toGroup }));
      return;
    }
    if (fromGroup.id === toGroup.id) {
      internalEdgeIds.push(edge.id);
      return;
    }
    const groupPair = [fromGroup.id, toGroup.id].sort().join("|");
    if (seenGroupPairs.has(groupPair)) {
      redundantExternalEdgeIds.push(edge.id);
      return;
    }
    seenGroupPairs.add(groupPair);
    externalEdges.push(Object.freeze({ ...edge, fromGroup, toGroup }));
  });
  return Object.freeze({
    groups: Object.freeze(groups),
    collapsedGroups: Object.freeze(groups.filter(({ collapsed }) => collapsed)),
    groupBySiteId,
    internalEdgeIds: Object.freeze(internalEdgeIds),
    externalEdges: Object.freeze(externalEdges),
    redundantExternalEdgeIds: Object.freeze(redundantExternalEdgeIds),
  });
}

export function createEndpointHighlightGroupPairIds(
  endpointAggregation,
  highlightedEdges,
) {
  if (!endpointAggregation) {
    return Object.freeze([]);
  }
  const pairIds = new Set();
  highlightedEdges.forEach(({ fromSiteId, toSiteId }) => {
    const fromGroup = endpointAggregation.groupBySiteId.get(fromSiteId);
    const toGroup = endpointAggregation.groupBySiteId.get(toSiteId);
    if (!fromGroup || !toGroup || fromGroup.id === toGroup.id) {
      return;
    }
    pairIds.add([fromGroup.id, toGroup.id].sort().join("|"));
  });
  return Object.freeze([...pairIds].sort());
}

export function createDefaultOrientationQuaternion() {
  const base = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(...DEFAULT_BASE_ROTATION, "XYZ"),
  );
  const quaternion = new THREE.Quaternion()
    .setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      DEFAULT_Z_UP_SCREEN_ROLL,
    )
    .multiply(base)
    .normalize();
  return Object.freeze([
    quaternion.x,
    quaternion.y,
    quaternion.z,
    quaternion.w,
  ]);
}

export function projectTrackballPoint(clientX, clientY, rect) {
  const diameter = Math.max(1, Math.min(rect.width, rect.height));
  let x = (2 * (clientX - rect.left - rect.width / 2)) / diameter;
  let y = (-2 * (clientY - rect.top - rect.height / 2)) / diameter;
  const radiusSquared = x * x + y * y;
  let z = 0;
  if (radiusSquared <= 1) {
    z = Math.sqrt(1 - radiusSquared);
  } else {
    const inverseRadius = 1 / Math.sqrt(radiusSquared);
    x *= inverseRadius;
    y *= inverseRadius;
  }
  return Object.freeze([x, y, z]);
}

export function applyTrackballDragQuaternion(
  currentQuaternion,
  previousPoint,
  nextPoint,
) {
  const previous = new THREE.Vector3(...previousPoint).normalize();
  const next = new THREE.Vector3(...nextPoint).normalize();
  const drag = new THREE.Quaternion().setFromUnitVectors(previous, next);
  const current = new THREE.Quaternion(...currentQuaternion);
  drag.multiply(current).normalize();
  return Object.freeze([drag.x, drag.y, drag.z, drag.w]);
}

function queryRequiredElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing Lattice Lab element: ${selector}`);
  }
  return element;
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function formatPolarityLabel(polarity) {
  if (polarity === LATTICE_LAB_POLARITY.ELECTRINO) {
    return "electrino";
  }
  if (polarity === LATTICE_LAB_POLARITY.POSITRINO) {
    return "positrino";
  }
  return "unavailable";
}

function summarizeShellPolarities(shell) {
  const counts = shell.rows.reduce(
    (summary, position) => {
      if (position.polarity) {
        summary[position.polarity] += 1;
      }
      return summary;
    },
    { electrino: 0, positrino: 0 },
  );
  return [
    counts.positrino ? `${counts.positrino} positrino${counts.positrino === 1 ? "" : "s"}` : null,
    counts.electrino ? `${counts.electrino} electrino${counts.electrino === 1 ? "" : "s"}` : null,
  ].filter(Boolean).join(" / ");
}

export function createZPolarDisplayEnvelopePoint(radius, theta, phi) {
  if (
    !Number.isFinite(radius) || radius <= 0 ||
    !Number.isFinite(theta) || !Number.isFinite(phi)
  ) {
    throw new TypeError(
      "Display-envelope radius and angles must be finite, with radius positive.",
    );
  }
  const ringRadius = Math.sin(theta) * radius;
  return Object.freeze([
    Math.cos(phi) * ringRadius,
    Math.sin(phi) * ringRadius,
    Math.cos(theta) * radius,
  ]);
}

function createDottedDisplayEnvelope(radius) {
  const points = [];
  const latitudeCount = 19;
  const longitudeCount = 42;
  for (let latitudeIndex = 0; latitudeIndex < latitudeCount; latitudeIndex += 1) {
    const theta = (latitudeIndex / (latitudeCount - 1)) * Math.PI;
    for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex += 1) {
      const phi = (longitudeIndex / longitudeCount) * Math.PI * 2;
      points.push(new THREE.Vector3(
        ...createZPolarDisplayEnvelopePoint(radius, theta, phi),
      ));
    }
  }
  const material = new THREE.PointsMaterial({
    color: 0xd7caff,
    size: 2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const envelope = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(points),
    material,
  );
  envelope.userData.kind = "display-envelope-visual-only";
  envelope.userData.semanticPolarAxis = "z";
  return envelope;
}

function createSceneLights(scene) {
  scene.add(new THREE.HemisphereLight(0xf4edff, 0x211a31, 1.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x9f88ff, 0.65);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);
}

export function createNearestNeighborEdges(caseRecord) {
  const edges = [];
  caseRecord.sites.forEach((site, siteIndex) => {
    caseRecord.sites.slice(siteIndex + 1).forEach((neighbor) => {
      const distance = Math.hypot(...neighbor.position.map(
        (value, index) => value - site.position[index],
      ));
      if (
        Math.abs(distance - caseRecord.nearestNeighborDistanceValue) < 1e-7
      ) {
        edges.push(Object.freeze({
          fromSiteId: site.id,
          toSiteId: neighbor.id,
        }));
      }
    });
  });
  return Object.freeze(edges);
}

export function createRepeatCellDisplayGraph(
  caseRecord,
  { compressionAxis = "x", compressionFactor = 1 } = {},
) {
  const network = createRepeatCellNearestNeighborNetwork(caseRecord);
  const candidateEdges =
    caseRecord.repeatCell.contextPresentation === "continuation-markers"
      ? network.edges.filter(
        (edge) => !edge.startContinuation || !edge.endContinuation,
      )
      : network.edges;
  const axisIndex = ["x", "y", "z"].indexOf(compressionAxis);
  const edges = candidateEdges.map((edge) => Object.freeze({
    edge,
    transformedDistance: Math.hypot(...edge.end.map(
      (value, index) =>
        (value - edge.start[index]) *
        (index === axisIndex ? compressionFactor : 1),
    )),
  }));
  return Object.freeze({
    network,
    nearestDistance: Math.min(...edges.map(({ transformedDistance }) =>
      transformedDistance
    )),
    edges: Object.freeze(edges),
    excludedEdges: Object.freeze([]),
    edgeIdentities: Object.freeze(edges.map(
      ({ edge }) => edge.id,
    )),
  });
}

export function createRepeatCellBoundarySegments(repeatCell) {
  if (
    !repeatCell?.vectors ||
    repeatCell.vectors.length !== 3 ||
    repeatCell.vectors.some(
      (vector) => vector.length !== 3 || !vector.every(Number.isFinite),
    )
  ) {
    throw new TypeError("Repeat-cell boundary requires three finite vectors.");
  }
  const centerOffset = repeatCell.vectors.reduce(
    (sum, vector) => sum.map(
      (value, axis) => value - vector[axis] / 2,
    ),
    [0, 0, 0],
  );
  const corners = new Map();
  for (let i = 0; i <= 1; i += 1) {
    for (let j = 0; j <= 1; j += 1) {
      for (let k = 0; k <= 1; k += 1) {
        const position = repeatCell.vectors.reduce(
          (sum, vector, axis) => sum.map(
            (value, coordinate) =>
              value + vector[coordinate] * [i, j, k][axis],
          ),
          [...centerOffset],
        );
        corners.set(`${i}${j}${k}`, Object.freeze(position));
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

export function createRepeatCellContinuationMarkerDescriptors(displayGraph) {
  const siteById = new Map(
    displayGraph.network.displaySites.map((site) => [site.id, site]),
  );
  const markerByPosition = new Map();
  displayGraph.edges.forEach(({ edge }) => {
    [
      [edge.startContinuation, edge.fromSiteId],
      [edge.endContinuation, edge.toSiteId],
    ].forEach(([continuation, siteId]) => {
      if (!continuation) {
        return;
      }
      const site = siteById.get(siteId);
      if (!site?.continuation) {
        throw new Error(
          `Repeat-cell continuation endpoint ${siteId} has no canonical site.`,
        );
      }
      const positionKey = site.position
        .map((value) => Number(value.toFixed(9))).join(",");
      const existing = markerByPosition.get(positionKey);
      if (existing && existing.polarity !== site.polarity) {
        throw new Error(
          `Repeat-cell continuation endpoint ${positionKey} has conflicting polarities.`,
        );
      }
      markerByPosition.set(positionKey, Object.freeze({
        id: site.id,
        position: Object.freeze([...site.position]),
        polarity: site.polarity,
      }));
    });
  });
  return Object.freeze([...markerByPosition.values()]);
}

export function createTripodAxisLayout(axis, projectedVector) {
  if (!["x", "y", "z"].includes(axis)) {
    throw new TypeError("Tripod axis must be x, y, or z.");
  }
  if (
    !Array.isArray(projectedVector) ||
    projectedVector.length !== 2 ||
    !projectedVector.every(Number.isFinite)
  ) {
    throw new TypeError("Projected tripod vector must contain two finite values.");
  }
  const screenDirection = [projectedVector[0], -projectedVector[1]];
  const projectedLength = Math.hypot(...screenDirection);
  const fallbackDirection = {
    x: [1, 0],
    y: [0, -1],
    z: [-Math.SQRT1_2, Math.SQRT1_2],
  }[axis];
  const labelDirection = projectedLength > 1e-7
    ? screenDirection.map((value) => value / projectedLength)
    : fallbackDirection;
  const negativeEndpoint = {
    x: TRIPOD_ORIGIN.x - screenDirection[0] * TRIPOD_AXIS_RADIUS,
    y: TRIPOD_ORIGIN.y - screenDirection[1] * TRIPOD_AXIS_RADIUS,
  };
  const positiveEndpoint = {
    x: TRIPOD_ORIGIN.x + screenDirection[0] * TRIPOD_AXIS_RADIUS,
    y: TRIPOD_ORIGIN.y + screenDirection[1] * TRIPOD_AXIS_RADIUS,
  };
  return Object.freeze({
    negativeEndpoint: Object.freeze(negativeEndpoint),
    positiveEndpoint: Object.freeze(positiveEndpoint),
    labelPosition: Object.freeze({
      x: positiveEndpoint.x + labelDirection[0] * TRIPOD_LABEL_GAP,
      y: positiveEndpoint.y + labelDirection[1] * TRIPOD_LABEL_GAP,
    }),
    labelAnchor: Math.abs(labelDirection[0]) <= 0.35
      ? "middle"
      : labelDirection[0] > 0
        ? "start"
        : "end",
  });
}

export function mountLatticeLab(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  let caseRecords = [...(options.caseRecords ??
    (options.caseRecord
      ? Object.freeze([options.caseRecord])
      : createLatticeLabCaseGallery()))];
  let caseRecord = options.caseRecord ?? caseRecords[0];
  const dom = {
    app: queryRequiredElement(documentLike, "#lattice-lab-app"),
    rail: queryRequiredElement(documentLike, "#lattice-lab-left-rail"),
    collapseButton: queryRequiredElement(documentLike, "#lattice-lab-panel-collapse"),
    canvas: queryRequiredElement(documentLike, "#lattice-lab-canvas"),
    unpolarizedCard: queryRequiredElement(
      documentLike,
      "#lattice-lab-unpolarized-card",
    ),
    unpolarizedCanvas: queryRequiredElement(
      documentLike,
      "#lattice-lab-unpolarized-canvas",
    ),
    miniatureCard: queryRequiredElement(documentLike, "#lattice-lab-miniature-card"),
    miniatureCanvas: queryRequiredElement(documentLike, "#lattice-lab-miniature-canvas"),
    caseSelect: queryRequiredElement(documentLike, "#lattice-lab-case-select"),
    seeingTitle: queryRequiredElement(documentLike, "#lattice-lab-seeing-title"),
    caseTitle: queryRequiredElement(documentLike, "#lattice-lab-case-title"),
    caseGeometry: queryRequiredElement(documentLike, "#lattice-lab-case-geometry"),
    caseNearest: queryRequiredElement(documentLike, "#lattice-lab-case-nearest"),
    caseNext: queryRequiredElement(documentLike, "#lattice-lab-case-next"),
    caseLocalTotal: queryRequiredElement(
      documentLike,
      "#lattice-lab-case-local-total",
    ),
    caseDensity: queryRequiredElement(documentLike, "#lattice-lab-case-density"),
    compressionCard: queryRequiredElement(documentLike, "#lattice-lab-compression-card"),
    deformationBeta: queryRequiredElement(documentLike, "#lattice-lab-deformation-beta"),
    compressionValue: queryRequiredElement(documentLike, "#lattice-lab-compression-value"),
    compressionStatus: queryRequiredElement(documentLike, "#lattice-lab-compression-status"),
    whatSeeing: queryRequiredElement(documentLike, "#lattice-lab-what-seeing"),
    inspectorStack: queryRequiredElement(documentLike, ".lattice-lab-inspector-stack"),
    repeatHighlight: queryRequiredElement(documentLike, "#lattice-lab-repeat-highlight"),
    ledger: queryRequiredElement(documentLike, "#lattice-lab-ledger"),
    randomRecalculate: queryRequiredElement(
      documentLike,
      "#lattice-lab-random-recalculate",
    ),
    ledgerReceiver: queryRequiredElement(documentLike, "#lattice-lab-ledger-receiver"),
    ledgerResult: queryRequiredElement(documentLike, "#lattice-lab-ledger-result"),
    ledgerIcon: queryRequiredElement(documentLike, "#lattice-lab-ledger-icon"),
    ledgerOutcome: queryRequiredElement(documentLike, "#lattice-lab-ledger-outcome"),
    ledgerResidual: queryRequiredElement(documentLike, "#lattice-lab-ledger-residual"),
    ledgerStatement: queryRequiredElement(documentLike, "#lattice-lab-ledger-statement"),
    ledgerShells: queryRequiredElement(documentLike, "#lattice-lab-ledger-shells"),
    ledgerShellScope: queryRequiredElement(documentLike, "#lattice-lab-ledger-shell-scope"),
    ledgerCalculation: queryRequiredElement(documentLike, "#lattice-lab-ledger-calculation"),
    ledgerCalculationScope: queryRequiredElement(
      documentLike,
      "#lattice-lab-ledger-calculation-scope",
    ),
    ledgerCalculationRows: queryRequiredElement(documentLike, "#lattice-lab-ledger-calculation-rows"),
    tripod: queryRequiredElement(documentLike, "#lattice-lab-tripod"),
    polarityLegend: queryRequiredElement(
      documentLike,
      "#lattice-lab-polarity-legend",
    ),
    positrinoSwatch: queryRequiredElement(
      documentLike,
      "#lattice-lab-positrino-swatch",
    ),
    electrinoSwatch: queryRequiredElement(
      documentLike,
      "#lattice-lab-electrino-swatch",
    ),
    tocButton: queryRequiredElement(documentLike, "#textbook-toc-button"),
    backButton: queryRequiredElement(documentLike, "#nav-up"),
    forwardButton: queryRequiredElement(documentLike, "#nav-forward"),
    homeButton: queryRequiredElement(documentLike, "#home-button"),
  };

  let polarityBySiteId = createReferencePolarityState(caseRecord);
  let selectedSiteId = caseRecord.defaultSiteId;
  let siteSelectionExplicit = false;
  let cameraViewHalfHeight = defaultViewHalfHeightForDisplayRadius(
    caseRecord.displayRadius,
  );
  let cameraAspect = 1;
  let focusSelected = false;
  let markerWorldRadius = 0.1;
  const compressionAxis = "x";
  let deformationBeta = 0;
  let compressionFactor = 1;
  let repeatCellHighlighted = false;
  let dragging = false;
  let dragSource = null;
  let pointerId = null;
  let pointerLastX = 0;
  let pointerLastY = 0;
  let pointerLastTrackballPoint = Object.freeze([0, 0, 1]);
  let pointerTravel = 0;
  let layoutWorldOffsetX = 0;
  const listeners = [];

  const sceneSearchRuntime = createStandaloneAppSceneSearchRuntime({
    document: documentLike,
    window: windowLike,
  }).init();

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.05, 100);
  camera.position.set(0, 0, CAMERA_DISTANCE);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x0d0a17, 1);

  const unpolarizedScene = new THREE.Scene();
  const unpolarizedCamera = new THREE.OrthographicCamera(
    -3.25,
    3.25,
    2.45,
    -2.45,
    0.05,
    100,
  );
  unpolarizedCamera.position.set(0, 0, CAMERA_DISTANCE);
  unpolarizedCamera.lookAt(0, 0, 0);
  const unpolarizedRenderer = new THREE.WebGLRenderer({
    canvas: dom.unpolarizedCanvas,
    antialias: true,
    alpha: true,
  });
  unpolarizedRenderer.outputColorSpace = THREE.SRGBColorSpace;
  unpolarizedRenderer.setClearColor(0x000000, 0);

  const miniatureScene = new THREE.Scene();
  const miniatureCamera = new THREE.OrthographicCamera(-3.25, 3.25, 2.45, -2.45, 0.05, 100);
  miniatureCamera.position.set(0, 0, CAMERA_DISTANCE);
  miniatureCamera.lookAt(0, 0, 0);
  const miniatureRenderer = new THREE.WebGLRenderer({
    canvas: dom.miniatureCanvas,
    antialias: true,
    alpha: true,
  });
  miniatureRenderer.outputColorSpace = THREE.SRGBColorSpace;
  miniatureRenderer.setClearColor(0x000000, 0);

  createSceneLights(scene);
  createSceneLights(unpolarizedScene);
  createSceneLights(miniatureScene);

  const rootGroup = new THREE.Group();
  const siteGroup = new THREE.Group();
  const lineGroup = new THREE.Group();
  const repeatHighlightGroup = new THREE.Group();
  const selectionCircleGroup = new THREE.Group();
  const endpointAggregateGroup = new THREE.Group();
  const guideGroup = new THREE.Group();
  rootGroup.add(
    guideGroup,
    lineGroup,
    repeatHighlightGroup,
    siteGroup,
    selectionCircleGroup,
    endpointAggregateGroup,
  );
  scene.add(rootGroup);

  const unpolarizedRoot = new THREE.Group();
  unpolarizedScene.add(unpolarizedRoot);
  const miniatureRoot = new THREE.Group();
  const miniatureEndpointAggregateGroup = new THREE.Group();
  miniatureScene.add(miniatureRoot);

  const sphereGeometry = new THREE.SphereGeometry(1, 24, 16);
  const redMaterial = new THREE.MeshStandardMaterial({
    color: POSITRINO_COLOR,
    roughness: 0.38,
    metalness: 0.04,
  });
  const blueMaterial = new THREE.MeshStandardMaterial({
    color: ELECTRINO_COLOR,
    roughness: 0.38,
    metalness: 0.04,
  });
  const unpolarizedMaterial = new THREE.MeshStandardMaterial({
    color: ENDPOINT_AGGREGATE_COLOR,
    roughness: 0.38,
    metalness: 0.04,
  });
  const unpolarizedFrameMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: 0.48,
    linewidth: GEOMETRY_LINE_WIDTH,
    depthTest: true,
    depthWrite: false,
  });
  const selectionCircleCanvas = documentLike.createElement("canvas");
  selectionCircleCanvas.width = SELECTION_CIRCLE_TEXTURE_SIZE_PX;
  selectionCircleCanvas.height = SELECTION_CIRCLE_TEXTURE_SIZE_PX;
  const selectionCircleContext = selectionCircleCanvas.getContext("2d");
  if (!selectionCircleContext) {
    throw new Error("Selection circle requires a two-dimensional canvas context.");
  }
  selectionCircleContext.clearRect(
    0,
    0,
    SELECTION_CIRCLE_TEXTURE_SIZE_PX,
    SELECTION_CIRCLE_TEXTURE_SIZE_PX,
  );
  selectionCircleContext.beginPath();
  selectionCircleContext.arc(
    SELECTION_CIRCLE_TEXTURE_SIZE_PX / 2,
    SELECTION_CIRCLE_TEXTURE_SIZE_PX / 2,
    25,
    0,
    Math.PI * 2,
  );
  selectionCircleContext.strokeStyle = "rgba(255, 255, 255, 0.96)";
  selectionCircleContext.lineWidth = SELECTION_CIRCLE_TEXTURE_STROKE_PX;
  selectionCircleContext.stroke();
  const selectionCircleTexture = new THREE.CanvasTexture(selectionCircleCanvas);
  selectionCircleTexture.colorSpace = THREE.SRGBColorSpace;
  const createSelectionCircleMaterial = (color) => new THREE.SpriteMaterial({
    map: selectionCircleTexture,
    color,
    transparent: true,
    opacity: 0.96,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const redSelectionCircleMaterial =
    createSelectionCircleMaterial(POSITRINO_COLOR);
  const blueSelectionCircleMaterial =
    createSelectionCircleMaterial(ELECTRINO_COLOR);
  const endpointSelectionCircleMaterial =
    createSelectionCircleMaterial(ENDPOINT_AGGREGATE_COLOR);
  const selectedCalculationCircle =
    new THREE.Sprite(blueSelectionCircleMaterial);
  selectedCalculationCircle.visible = false;
  selectedCalculationCircle.renderOrder = 10;
  selectedCalculationCircle.userData.kind =
    "selected-calculation-target-circle";
  selectionCircleGroup.add(selectedCalculationCircle);
  const endpointAggregateMaterial = new THREE.MeshStandardMaterial({
    color: ENDPOINT_AGGREGATE_COLOR,
    emissive: ENDPOINT_AGGREGATE_COLOR,
    emissiveIntensity: 0.22,
    roughness: 0.34,
    metalness: 0.04,
  });
  const createLegendSwatchRenderer = (canvas, material) => {
    const swatchScene = new THREE.Scene();
    const swatchCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.05, 100);
    swatchCamera.position.set(0, 0, CAMERA_DISTANCE);
    swatchCamera.lookAt(0, 0, 0);
    createSceneLights(swatchScene);
    swatchScene.add(new THREE.Mesh(sphereGeometry, material));
    const swatchRenderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    swatchRenderer.outputColorSpace = THREE.SRGBColorSpace;
    swatchRenderer.setClearColor(0x000000, 0);
    canvas.dataset.renderSource =
      "main-canvas-shared-sphere-material-and-lights";
    canvas.dataset.highlightDirection = "above-right";
    return Object.freeze({
      renderer: swatchRenderer,
      scene: swatchScene,
      camera: swatchCamera,
    });
  };
  const legendSwatchRenderers = Object.freeze([
    createLegendSwatchRenderer(dom.positrinoSwatch, redMaterial),
    createLegendSwatchRenderer(dom.electrinoSwatch, blueMaterial),
  ]);
  function renderLegendSwatches() {
    legendSwatchRenderers.forEach(({ renderer, scene: swatchScene, camera: swatchCamera }) => {
      renderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
      renderer.setSize(16, 16, false);
      renderer.render(swatchScene, swatchCamera);
    });
  }
  const neighborLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: GEOMETRY_LINE_OPACITY,
    linewidth: GEOMETRY_LINE_WIDTH,
    depthTest: true,
    depthWrite: false,
  });
  const miniatureNeighborLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: GEOMETRY_LINE_OPACITY,
    linewidth: GEOMETRY_LINE_WIDTH,
    depthTest: true,
    depthWrite: false,
  });
  const miniatureOwnedCellBoundaryMaterial = new THREE.LineBasicMaterial({
    color: REPEAT_CELL_HIGHLIGHT_COLOR,
    transparent: true,
    opacity: 0.86,
    depthTest: false,
    depthWrite: false,
  });
  const miniatureOverlapLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: GEOMETRY_LINE_OPACITY,
    linewidth: GEOMETRY_LINE_WIDTH,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const highlightedNeighborMaterial = new THREE.MeshBasicMaterial({
    color: REPEAT_CELL_HIGHLIGHT_COLOR,
    transparent: true,
    opacity: 0.64,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });

  const siteMeshes = new Map();
  let edgeLines = [];
  populateCaseSelector();
  rebuildCaseScene();
  rootGroup.quaternion.set(...createDefaultOrientationQuaternion());

  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const resizeObserverType = windowLike.ResizeObserver ?? globalThis.ResizeObserver;
  const resizeObserver = resizeObserverType
    ? new resizeObserverType(resize)
    : null;

  bindEvents();
  resizeObserver?.observe?.(dom.canvas);
  resizeObserver?.observe?.(dom.unpolarizedCanvas);
  resizeObserver?.observe?.(dom.miniatureCanvas);
  updateCollapsePresentation();
  updateCaseRecordPresentation();
  updateCompressionPresentation();
  updateConfigurationPresentation();
  updateSelectedPresentation();
  updatePolarityMaterials();
  resize();

  return {
    get caseRecord() {
      return caseRecord;
    },
    resetCase,
    recalculateRandomConfiguration,
    selectSite,
    selectCase,
    dispose,
    getState() {
      return Object.freeze({
        selectedSiteId,
        polarityBySiteId,
        cameraViewHalfHeight,
        focusSelected,
        layoutWorldOffsetX,
        compressionAxis,
        deformationBeta,
        compressionFactor,
        rotation: Object.freeze([
          rootGroup.rotation.x,
          rootGroup.rotation.y,
          rootGroup.rotation.z,
        ]),
        caseId: caseRecord.id,
        referenceConfiguration: isReferenceLatticeConfiguration(
          caseRecord,
          polarityBySiteId,
        ),
      });
    },
  };

  function populateCaseSelector() {
    dom.caseSelect.textContent = "";
    caseRecords.forEach((record) => {
      const option = documentLike.createElement("option");
      option.value = record.id;
      option.textContent = record.title;
      dom.caseSelect.append(option);
    });
    dom.caseSelect.value = caseRecord.id;
  }

  function compressionAvailable() {
    return true;
  }

  function transformDisplayPosition(position) {
    if (!compressionAvailable()) {
      return [...position];
    }
    return createUniaxialDeformedPosition(position, {
      axis: compressionAxis,
      factor: compressionFactor,
    });
  }

  function removeCaseSceneObjects() {
    edgeLines.forEach((line) => line.geometry.dispose());
    edgeLines = [];
    guideGroup.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
    repeatHighlightGroup.traverse((object) => {
      if (object.userData.disposeGeometry) {
        object.geometry?.dispose?.();
      }
    });
    endpointAggregateGroup.clear();
    miniatureEndpointAggregateGroup.clear();
    unpolarizedRoot.traverse((object) => {
      if (object.userData.disposeGeometry) {
        object.geometry?.dispose?.();
      }
    });
    miniatureRoot.traverse((object) => {
      if (object.userData.disposeGeometry) {
        object.geometry?.dispose?.();
      }
    });
    siteGroup.clear();
    lineGroup.clear();
    repeatHighlightGroup.clear();
    guideGroup.clear();
    miniatureRoot.clear();
    unpolarizedRoot.clear();
    siteMeshes.clear();
  }

  function rebuildUnpolarizedLatticePattern() {
    const pattern = caseRecord.unpolarizedLatticePattern;
    dom.unpolarizedCard.hidden = !pattern;
    dom.unpolarizedCanvas.tabIndex = pattern ? 0 : -1;
    if (!pattern) {
      dom.unpolarizedCanvas.dataset.siteCount = "0";
      dom.unpolarizedCanvas.dataset.frameEdgeCount = "0";
      dom.unpolarizedCanvas.setAttribute(
        "aria-label",
        "Unpolarized repeat pattern is not available for this nonperiodic configuration.",
      );
      return;
    }
    const referencePositions = [
      ...pattern.sites.map((site) => site.position),
      ...pattern.frameSegments.flatMap((segment) => [
        segment.start,
        segment.end,
      ]),
    ];
    const bounds = referencePositions.reduce(
      (result, position) => ({
        minimum: result.minimum.map((value, axis) =>
          Math.min(value, position[axis])
        ),
        maximum: result.maximum.map((value, axis) =>
          Math.max(value, position[axis])
        ),
      }),
      {
        minimum: [Infinity, Infinity, Infinity],
        maximum: [-Infinity, -Infinity, -Infinity],
      },
    );
    const referenceCenter = bounds.minimum.map(
      (value, axis) => (value + bounds.maximum[axis]) / 2,
    );
    const displayCenter = transformDisplayPosition(referenceCenter);
    pattern.sites.forEach((site) => {
      const mesh = new THREE.Mesh(sphereGeometry, unpolarizedMaterial);
      mesh.position.fromArray(transformDisplayPosition(site.position).map(
        (value, axis) => value - displayCenter[axis],
      ));
      mesh.userData.kind = "unpolarized-conventional-site";
      mesh.userData.siteId = site.id;
      unpolarizedRoot.add(mesh);
    });
    pattern.frameSegments.forEach((segment) => {
      const start = transformDisplayPosition(segment.start).map(
        (value, axis) => value - displayCenter[axis],
      );
      const end = transformDisplayPosition(segment.end).map(
        (value, axis) => value - displayCenter[axis],
      );
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
      ]);
      const line = new THREE.Line(geometry, unpolarizedFrameMaterial);
      line.userData.kind = "unpolarized-conventional-cell-frame";
      line.userData.disposeGeometry = true;
      unpolarizedRoot.add(line);
    });
    const referenceRadius = Math.max(
      0.1,
      ...referencePositions.map((position) => Math.hypot(...position.map(
        (value, axis) => value - referenceCenter[axis],
      ))),
    );
    unpolarizedRoot.scale.setScalar(1.95 / referenceRadius);
    dom.unpolarizedCanvas.dataset.siteCount = String(pattern.sites.length);
    dom.unpolarizedCanvas.dataset.frameEdgeCount = String(
      pattern.frameSegments.length,
    );
    dom.unpolarizedCanvas.dataset.relationshipCount = "0";
    dom.unpolarizedCanvas.dataset.polarityMarkerCount = "0";
    dom.unpolarizedCanvas.dataset.selectionRingCount = "0";
    dom.unpolarizedCanvas.dataset.repeatOverlayCount = "0";
    dom.unpolarizedCanvas.dataset.geometrySource = pattern.geometrySource;
    dom.unpolarizedCanvas.dataset.markerMaterialReference =
      "main-canvas-mesh-standard-material-family";
    dom.unpolarizedCanvas.dataset.deformationAxis = compressionAxis;
    dom.unpolarizedCanvas.dataset.deformationFactor =
      compressionFactor.toFixed(6);
    dom.unpolarizedCanvas.setAttribute(
      "aria-label",
      `Rotatable unpolarized conventional lattice geometry for ${caseRecord.title}. ` +
        `${pattern.sites.length} uniform neutral purple Architrino markers ` +
        `and a ${pattern.frameSegments.length}-edge conventional-cell frame. ` +
        "No polarity, relationship lines, selection, or calculation claim is shown.",
    );
  }

  function findCentralRepeatOwnedSites() {
    const [firstRepeatSite, secondRepeatSite] = caseRecord.repeatCell.sites;
    const repeatDelta = secondRepeatSite.position.map(
      (value, index) => value - firstRepeatSite.position[index],
    );
    const candidates = [];
    caseRecord.sites
      .filter((site) => site.polarity === firstRepeatSite.polarity)
      .forEach((firstSite) => {
        caseRecord.sites
          .filter((site) => site.polarity === secondRepeatSite.polarity)
          .forEach((secondSite) => {
            if (!secondSite.position.every((value, index) =>
              Math.abs(
                value - firstSite.position[index] - repeatDelta[index],
              ) < 1e-7
            )) {
              return;
            }
            candidates.push({
              sites: [firstSite, secondSite],
              centerDistance: Math.hypot(...firstSite.position.map(
                (value, index) => (value + secondSite.position[index]) / 2,
              )),
            });
          });
      });
    const centralSites = candidates.sort(
      (left, right) => left.centerDistance - right.centerDistance,
    )[0]?.sites ?? [];
    const presentationOffset = caseRecord.mainRepeatRepresentativeOffset ??
      [0, 0, 0];
    if (presentationOffset.every((value) => value === 0)) {
      return centralSites;
    }
    return centralSites.map((site) => caseRecord.sites.find((candidate) =>
      candidate.position.every((value, index) =>
        Math.abs(
          value - site.position[index] - presentationOffset[index],
        ) < 1e-7
      )
    )).filter(Boolean);
  }

  function rebuildRepeatCellHighlight(displayGraph) {
    const ownedSites = findCentralRepeatOwnedSites();
    if (ownedSites.length !== caseRecord.repeatCell.sites.length) {
      throw new Error(
        `${caseRecord.title} has no visible central repeat-cell representative.`,
      );
    }
    const offset = ownedSites[0].position.map(
      (value, index) => value - caseRecord.repeatCell.sites[0].position[index],
    );

    const siteIdByPositionKey = new Map(caseRecord.sites.map((site) => [
      site.position.map((value) => Number(value.toFixed(9))).join(","),
      site.id,
    ]));
    const edgeRows = displayGraph.edges.map(
      ({ edge, transformedDistance }) => {
        const startPosition = edge.start.map(
          (value, index) => value + offset[index],
        );
        const endPosition = edge.end.map(
          (value, index) => value + offset[index],
        );
        const startKey = startPosition
          .map((value) => Number(value.toFixed(9))).join(",");
        const endKey = endPosition
          .map((value) => Number(value.toFixed(9))).join(",");
        const startSiteId = siteIdByPositionKey.get(startKey);
        const endSiteId = siteIdByPositionKey.get(endKey);
        return {
          edge,
          startPosition,
          endPosition,
          startSiteId,
          endSiteId,
          transformedDistance,
          mainEdgeIdentity: startSiteId && endSiteId
            ? [startSiteId, endSiteId].sort().join("|")
            : null,
        };
      },
    );
    const visibleEdgeRows = edgeRows.filter(
      ({ startSiteId, endSiteId, mainEdgeIdentity }) =>
        startSiteId && endSiteId && mainEdgeIdentity,
    );
    const croppedEdgeRows = edgeRows.filter(
      ({ startSiteId, endSiteId, mainEdgeIdentity }) =>
        !startSiteId || !endSiteId || !mainEdgeIdentity,
    );
    visibleEdgeRows.forEach((row) => {
      const {
        edge,
        startPosition,
        endPosition,
        startSiteId,
        endSiteId,
        mainEdgeIdentity,
      } = row;
      const highlight = new THREE.Mesh(
        new THREE.CylinderGeometry(
          REPEAT_CELL_HIGHLIGHT_RADIUS,
          REPEAT_CELL_HIGHLIGHT_RADIUS,
          1,
          10,
        ),
        highlightedNeighborMaterial,
      );
      highlight.visible = repeatCellHighlighted;
      highlight.userData.kind = "repeat-cell-highlight-neighbor";
      highlight.userData.startPosition = Object.freeze(startPosition);
      highlight.userData.endPosition = Object.freeze(endPosition);
      highlight.userData.edge = edge;
      highlight.userData.edgeIdentity = edge.id;
      highlight.userData.mainEdgeIdentity = mainEdgeIdentity;
      highlight.userData.mainFromSiteId = startSiteId;
      highlight.userData.mainToSiteId = endSiteId;
      highlight.userData.disposeGeometry = true;
      highlight.renderOrder = 3;
      repeatHighlightGroup.add(highlight);
    });
    repeatHighlightGroup.userData.ownedSiteIds = Object.freeze(
      ownedSites.map((site) => site.id),
    );
    repeatHighlightGroup.userData.edgeIdentities = Object.freeze(
      visibleEdgeRows.map(({ edge }) => edge.id),
    );
    repeatHighlightGroup.userData.canonicalEdgeIdentities =
      displayGraph.edgeIdentities;
    repeatHighlightGroup.userData.mainEdgeIdentities = Object.freeze(
      visibleEdgeRows.map(({ mainEdgeIdentity }) => mainEdgeIdentity),
    );
    dom.canvas.dataset.repeatHighlightEdgeCount =
      String(visibleEdgeRows.length);
    dom.canvas.dataset.repeatHighlightOwnedSiteIds =
      ownedSites.map(({ id }) => id).join(";");
    dom.canvas.dataset.repeatHighlightEdgeIdentities =
      visibleEdgeRows.map(({ edge }) => edge.id).join(";");
    dom.canvas.dataset.repeatHighlightCanonicalEdgeCount =
      String(displayGraph.edgeIdentities.length);
    dom.canvas.dataset.repeatHighlightCanonicalEdgeIdentities =
      displayGraph.edgeIdentities.join(";");
    dom.canvas.dataset.repeatHighlightMainEdgeCount =
      String(visibleEdgeRows.length);
    dom.canvas.dataset.repeatHighlightMainEdgeIdentities =
      visibleEdgeRows.map(({ mainEdgeIdentity }) => mainEdgeIdentity).join(";");
    dom.canvas.dataset.repeatHighlightExcludedEdgeCount =
      String(displayGraph.excludedEdges.length + croppedEdgeRows.length);
    dom.canvas.dataset.repeatHighlightCroppedEdgeCount =
      String(croppedEdgeRows.length);
    dom.canvas.dataset.repeatHighlightCroppedEdgeIdentities =
      croppedEdgeRows.map(({ edge }) => edge.id).join(";");
  }

  function rebuildMiniatureNetwork(displayGraph) {
    const { network } = displayGraph;
    const rawPositions = [];
    const referencePositions = [];
    const contextAsMarkers =
      caseRecord.repeatCell.contextPresentation === "continuation-markers";
    const showOwnedCellBoundary =
      caseRecord.repeatCell.contextPresentation ===
        "owned-cell-with-continuation";
    const continuationMarkers = contextAsMarkers
      ? createRepeatCellContinuationMarkerDescriptors(displayGraph)
      : Object.freeze([]);
    const visibleSites = network.displaySites.filter(
      (site) => !contextAsMarkers || !site.continuation,
    );
    visibleSites.forEach((site) => {
      const position = transformDisplayPosition(site.position);
      rawPositions.push(position);
      referencePositions.push(site.position);
      const material = site.polarity === LATTICE_LAB_POLARITY.POSITRINO
        ? redMaterial
        : blueMaterial;
      const miniatureMesh = new THREE.Mesh(sphereGeometry, material);
      miniatureMesh.position.fromArray(position);
      miniatureMesh.userData.kind = site.continuation
        ? "repeat-cell-periodic-continuation"
        : "repeat-cell-site";
      miniatureMesh.userData.siteId = site.id;
      miniatureMesh.userData.contextRole = site.continuation
        ? "periodic-relationship-context"
        : "owned-repeat-cell-site";
      miniatureMesh.renderOrder = site.continuation ? 1 : 2;
      miniatureRoot.add(miniatureMesh);
    });

    displayGraph.edges.forEach(({ edge }) => {
      const start = transformDisplayPosition(edge.start);
      const end = transformDisplayPosition(edge.end);
      rawPositions.push(start, end);
      referencePositions.push(edge.start, edge.end);
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
      ]);
      const line = new THREE.Line(
        geometry,
        miniatureNeighborLineMaterial,
      );
      line.userData.kind = edge.periodicContinuation
        ? "repeat-cell-periodic-neighbor"
        : "repeat-cell-neighbor";
      line.userData.startPosition = Object.freeze(start);
      line.userData.endPosition = Object.freeze(end);
      line.userData.startHasSphere = true;
      line.userData.endHasSphere = true;
      line.userData.edgeIdentity = edge.id;
      line.userData.fromSiteId = edge.fromSiteId;
      line.userData.toSiteId = edge.toSiteId;
      line.userData.disposeGeometry = true;
      miniatureRoot.add(line);
    });
    if (showOwnedCellBoundary) {
      const boundarySegments = createRepeatCellBoundarySegments(
        caseRecord.repeatCell,
      );
      const boundaryGeometry = new THREE.BufferGeometry().setFromPoints(
        boundarySegments.flatMap(({ start, end }) => [
          new THREE.Vector3(...transformDisplayPosition(start)),
          new THREE.Vector3(...transformDisplayPosition(end)),
        ]),
      );
      const boundary = new THREE.LineSegments(
        boundaryGeometry,
        miniatureOwnedCellBoundaryMaterial,
      );
      boundary.userData.kind = "repeat-cell-owned-boundary";
      boundary.userData.edgeIdentities = Object.freeze(
        boundarySegments.map(({ id }) => id),
      );
      boundary.userData.disposeGeometry = true;
      boundary.renderOrder = 3;
      miniatureRoot.add(boundary);
    }
    continuationMarkers.forEach((marker) => {
      const miniatureMesh = new THREE.Mesh(
        sphereGeometry,
        marker.polarity === LATTICE_LAB_POLARITY.POSITRINO
          ? redMaterial
          : blueMaterial,
      );
      miniatureMesh.position.fromArray(transformDisplayPosition(marker.position));
      miniatureMesh.userData.kind = "repeat-cell-periodic-continuation";
      miniatureMesh.userData.siteId = marker.id;
      miniatureMesh.userData.polarity = marker.polarity;
      miniatureMesh.userData.continuationEndpoint = true;
      miniatureRoot.add(miniatureMesh);
    });

    const referenceBounds = referencePositions.reduce(
      (result, position) => ({
        minimum: result.minimum.map(
          (value, index) => Math.min(value, position[index]),
        ),
        maximum: result.maximum.map(
          (value, index) => Math.max(value, position[index]),
        ),
      }),
      {
        minimum: [Infinity, Infinity, Infinity],
        maximum: [-Infinity, -Infinity, -Infinity],
      },
    );
    const referenceCenter = referenceBounds.minimum.map(
      (value, index) => (value + referenceBounds.maximum[index]) / 2,
    );
    const center = transformDisplayPosition(referenceCenter);
    miniatureRoot.children.forEach((object) => {
      if (object.isLine || object.isPoints) {
        const position = object.geometry.getAttribute("position");
        for (let index = 0; index < position.count; index += 1) {
          position.setXYZ(
            index,
            position.getX(index) - center[0],
            position.getY(index) - center[1],
            position.getZ(index) - center[2],
          );
        }
        position.needsUpdate = true;
        if (
          object.isLine &&
          Array.isArray(object.userData.startPosition) &&
          Array.isArray(object.userData.endPosition)
        ) {
          object.userData.startPosition = Object.freeze(
            object.userData.startPosition.map(
              (value, index) => value - center[index],
            ),
          );
          object.userData.endPosition = Object.freeze(
            object.userData.endPosition.map(
              (value, index) => value - center[index],
            ),
          );
        }
        object.position.set(0, 0, 0);
      } else {
        object.position.sub(new THREE.Vector3(...center));
      }
    });
    const referenceRepeatRadius = Math.max(
      0.1,
      ...referencePositions.map((position) => Math.hypot(...position.map(
        (value, index) => value - referenceCenter[index],
      ))),
    );
    miniatureRoot.scale.setScalar(1.95 / referenceRepeatRadius);
    miniatureRoot.add(miniatureEndpointAggregateGroup);
    miniatureRoot.userData.relationshipCount = network.relationshipCount;
    miniatureRoot.userData.expectedRelationshipCount =
      network.expectedRelationshipCount;
    miniatureRoot.userData.edgeIdentities = displayGraph.edgeIdentities;
    dom.miniatureCanvas.dataset.relationshipCount =
      String(network.relationshipCount);
    dom.miniatureCanvas.dataset.displayEdgeCount =
      String(displayGraph.edgeIdentities.length);
    dom.miniatureCanvas.dataset.displayEdgeIdentities =
      displayGraph.edgeIdentities.join(";");
    dom.miniatureCanvas.dataset.excludedEdgeCount =
      String(displayGraph.excludedEdges.length);
    dom.miniatureCanvas.dataset.periodicContinuationCount =
      String(network.continuationSites.length);
    dom.miniatureCanvas.dataset.visibleContextSiteCount =
      String(contextAsMarkers
        ? continuationMarkers.length
        : network.continuationSites.length);
    dom.miniatureCanvas.dataset.ownedSiteCount = String(
      caseRecord.repeatCell.sites.length,
    );
    dom.miniatureCanvas.dataset.contextMarkerCount = String(
      showOwnedCellBoundary ? network.continuationSites.length : 0,
    );
    dom.miniatureCanvas.dataset.ownedCellBoundaryEdgeCount = String(
      showOwnedCellBoundary ? 12 : 0,
    );
    dom.miniatureCanvas.dataset.contextHierarchy = "uniform-ordinary-style";
    dom.miniatureCanvas.dataset.ownedMarkerScale = "1";
    dom.miniatureCanvas.dataset.contextMarkerScale = "1";
    dom.miniatureCanvas.dataset.baseMarkerMaterialReference =
      "main-canvas-shared-polarity-materials";
    dom.miniatureCanvas.dataset.ordinaryEdgeColor = "#c6b6ff";
    dom.miniatureCanvas.dataset.ordinaryEdgeOpacity =
      String(GEOMETRY_LINE_OPACITY);
    dom.miniatureCanvas.dataset.ordinaryEdgeLinewidth =
      String(GEOMETRY_LINE_WIDTH);
    dom.canvas.dataset.ordinaryEdgeColor = "#c6b6ff";
    dom.canvas.dataset.ordinaryEdgeOpacity = String(GEOMETRY_LINE_OPACITY);
    dom.canvas.dataset.ordinaryEdgeLinewidth = String(GEOMETRY_LINE_WIDTH);
    dom.miniatureCanvas.dataset.continuationMarkerCount =
      String(continuationMarkers.length);
    dom.miniatureCanvas.dataset.continuationPositrinoMarkerCount = String(
      continuationMarkers.filter(
        ({ polarity }) => polarity === LATTICE_LAB_POLARITY.POSITRINO,
      ).length,
    );
    dom.miniatureCanvas.dataset.continuationElectrinoMarkerCount = String(
      continuationMarkers.filter(
        ({ polarity }) => polarity === LATTICE_LAB_POLARITY.ELECTRINO,
      ).length,
    );
    dom.miniatureCanvas.setAttribute(
      "aria-label",
      showOwnedCellBoundary
        ? `Interactive repeat-cell view for ${caseRecord.title}. ` +
          `${caseRecord.repeatCell.sites.length} polarity-colored Architrino ` +
          `markers are owned by the repeat cell inside its ${12}-edge ` +
          `boundary; ${network.continuationSites.length} equally styled ` +
          "polarity-colored Architrino markers continue the relationship " +
          "context."
        : continuationMarkers.length > 0
        ? `Interactive repeat-cell view for ${caseRecord.title}. ` +
          `${continuationMarkers.length} periodic relationship endpoints are ` +
          "shown as polarity-colored Architrino markers."
        : "Interactive repeat-cell view",
    );
    dom.miniatureCanvas.dataset.deformationAxis = compressionAxis;
    dom.miniatureCanvas.dataset.deformationFactor =
      compressionFactor.toFixed(6);
    dom.miniatureCanvas.dataset.referenceDisplayScale =
      miniatureRoot.scale.x.toFixed(9);
  }

  function rebuildCaseScene() {
    removeCaseSceneObjects();
    rebuildUnpolarizedLatticePattern();
    caseRecord.sites.forEach((site) => {
      const mesh = new THREE.Mesh(
        sphereGeometry,
        site.polarity === LATTICE_LAB_POLARITY.POSITRINO
          ? redMaterial
          : blueMaterial,
      );
      mesh.position.fromArray(transformDisplayPosition(site.position));
      mesh.userData.siteId = site.id;
      mesh.userData.kind = "architrino-site";
      siteGroup.add(mesh);
      siteMeshes.set(site.id, mesh);
    });

    const repeatCellDisplayGraph = caseRecord.repeatCell
      ? createRepeatCellDisplayGraph(caseRecord, {
        compressionAxis,
        compressionFactor,
      })
      : null;
    dom.miniatureCard.hidden = !repeatCellDisplayGraph;
    dom.miniatureCanvas.tabIndex = repeatCellDisplayGraph ? 0 : -1;
    if (repeatCellDisplayGraph) {
      rebuildMiniatureNetwork(repeatCellDisplayGraph);
    }

    edgeLines = createNearestNeighborEdges(caseRecord).map((edge) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      const line = new THREE.Line(geometry, neighborLineMaterial);
      line.frustumCulled = false;
      line.userData.edge = edge;
      lineGroup.add(line);
      return line;
    });
    dom.canvas.dataset.displaySiteCount = String(caseRecord.sites.length);
    dom.canvas.dataset.displayEdgeCount = String(edgeLines.length);
    dom.canvas.dataset.displayRadius = String(caseRecord.displayRadius);
    if (repeatCellDisplayGraph) {
      rebuildRepeatCellHighlight(repeatCellDisplayGraph);
    } else {
      repeatCellHighlighted = false;
      dom.repeatHighlight.checked = false;
      dom.canvas.dataset.repeatHighlightEdgeCount = "0";
      dom.canvas.dataset.repeatHighlightOwnedSiteIds = "";
      dom.canvas.dataset.repeatHighlightEdgeIdentities = "";
      dom.canvas.dataset.repeatHighlightCanonicalEdgeCount = "0";
      dom.canvas.dataset.repeatHighlightCanonicalEdgeIdentities = "";
      dom.canvas.dataset.repeatHighlightMainEdgeCount = "0";
      dom.canvas.dataset.repeatHighlightMainEdgeIdentities = "";
      dom.canvas.dataset.repeatHighlightExcludedEdgeCount = "0";
      dom.canvas.dataset.repeatHighlightCroppedEdgeCount = "0";
      dom.canvas.dataset.repeatHighlightCroppedEdgeIdentities = "";
    }
    guideGroup.add(createDottedDisplayEnvelope(caseRecord.displayRadius));
    dom.canvas.dataset.deformationAxis = compressionAxis;
    dom.canvas.dataset.deformationFactor = compressionFactor.toFixed(6);
    dom.canvas.dataset.displayEnvelopePolarAxis = "z";
    dom.canvas.dataset.displayEnvelopeOrientationSource =
      "shared-lattice-root-quaternion";
  }

  function selectCase(caseId) {
    const nextCase = caseRecords.find((record) => record.id === caseId);
    if (!nextCase || nextCase === caseRecord) {
      return Boolean(nextCase);
    }
    caseRecord = nextCase;
    polarityBySiteId = createReferencePolarityState(caseRecord);
    selectedSiteId = caseRecord.defaultSiteId;
    siteSelectionExplicit = false;
    focusSelected = false;
    deformationBeta = 0;
    compressionFactor = 1;
    cameraViewHalfHeight = defaultViewHalfHeightForDisplayRadius(
      caseRecord.displayRadius,
    );
    rootGroup.position.set(0, 0, 0);
    rootGroup.quaternion.set(...createDefaultOrientationQuaternion());
    dom.caseSelect.value = caseRecord.id;
    rebuildCaseScene();
    updateCaseRecordPresentation();
    updateCompressionPresentation();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    updateProjection();
    updateUsableCanvasCenter();
    updateFixedMarkerSizes();
    render();
    return true;
  }

  function recalculateRandomConfiguration() {
    if (
      caseRecord.id !== LATTICE_LAB_RANDOM_FINITE_CASE_ID ||
      !caseRecord.randomization
    ) {
      return false;
    }
    const nextSeed = nextLatticeLabRandomFiniteSeed(
      caseRecord.sites,
      caseRecord.randomization.seed,
    );
    const nextCase = createRandomFiniteFiftyFiftyCase(nextSeed);
    caseRecords = caseRecords.map((record) =>
      record.id === LATTICE_LAB_RANDOM_FINITE_CASE_ID ? nextCase : record
    );
    caseRecord = nextCase;
    polarityBySiteId = createReferencePolarityState(caseRecord);
    if (!getLatticeSite(caseRecord, selectedSiteId)) {
      selectedSiteId = caseRecord.defaultSiteId;
      siteSelectionExplicit = false;
    }
    rebuildCaseScene();
    updateCaseRecordPresentation();
    updateCompressionPresentation();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    updateUsableCanvasCenter();
    updateFixedMarkerSizes();
    render();
    return Object.freeze({
      seed: caseRecord.randomization.seed,
      assignmentFingerprint:
        caseRecord.randomization.assignmentFingerprint,
    });
  }

  function listen(target, type, handler, eventOptions) {
    target.addEventListener(type, handler, eventOptions);
    listeners.push(() => target.removeEventListener?.(type, handler, eventOptions));
  }

  function bindEvents() {
    listen(dom.caseSelect, "change", () => selectCase(dom.caseSelect.value));
    listen(dom.randomRecalculate, "click", recalculateRandomConfiguration);
    listen(dom.repeatHighlight, "change", () => {
      repeatCellHighlighted = dom.repeatHighlight.checked;
      repeatHighlightGroup.traverse((object) => {
        if (
          object.userData.kind === "repeat-cell-highlight-neighbor"
        ) {
          object.visible =
            repeatCellHighlighted && object.userData.segmentFits !== false;
        }
      });
      updateFixedMarkerSizes();
      render();
    });
    listen(dom.deformationBeta, "input", applyCompressionControls);
    listen(dom.deformationBeta, "change", applyCompressionControls);
    const blockOrientationKeyInteraction = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel"]
      .forEach((type) => listen(
        dom.tripod,
        type,
        blockOrientationKeyInteraction,
        type === "wheel" ? { passive: false } : undefined,
      ));
    ["touchstart", "touchmove", "touchend", "touchcancel"]
      .forEach((type) => listen(
        dom.tripod,
        type,
        blockOrientationKeyInteraction,
        { passive: false },
      ));
    listen(dom.collapseButton, "click", () => {
      dom.app.dataset.panelCollapsed =
        dom.app.dataset.panelCollapsed === "true" ? "false" : "true";
      updateCollapsePresentation();
      windowLike.requestAnimationFrame?.(resize);
    });
    listen(dom.canvas, "pointerdown", handlePointerDown);
    listen(dom.canvas, "pointermove", handlePointerMove);
    listen(dom.canvas, "pointerup", handlePointerUp);
    listen(dom.canvas, "pointercancel", handlePointerCancel);
    listen(dom.canvas, "wheel", handleWheel, { passive: false });
    listen(
      dom.unpolarizedCanvas,
      "pointerdown",
      handleUnpolarizedPointerDown,
    );
    listen(dom.unpolarizedCanvas, "pointermove", handlePointerMove);
    listen(
      dom.unpolarizedCanvas,
      "pointerup",
      handleUnpolarizedPointerUp,
    );
    listen(dom.unpolarizedCanvas, "pointercancel", handlePointerCancel);
    listen(dom.miniatureCanvas, "pointerdown", handleMiniaturePointerDown);
    listen(dom.miniatureCanvas, "pointermove", handlePointerMove);
    listen(dom.miniatureCanvas, "pointerup", handleMiniaturePointerUp);
    listen(dom.miniatureCanvas, "pointercancel", handlePointerCancel);
    listen(dom.miniatureCanvas, "wheel", handleWheel, { passive: false });
    listen(windowLike, "resize", resize);
    listen(dom.tocButton, "click", () => {
      windowLike.location?.assign?.(
        resolveStandaloneGlobalSceneHref(
          TEXTBOOK_TOC_SCENE_PATH,
          windowLike.location?.href,
        ),
      );
    });
    listen(dom.backButton, "click", () => windowLike.history?.back?.());
    listen(dom.forwardButton, "click", () => windowLike.history?.forward?.());
    listen(dom.homeButton, "click", () => {
      navigateStandaloneAppHome(
        windowLike.location,
        resolveStandaloneAppHomeHref(windowLike.location?.href),
        {
          windowLike,
          returnHref: windowLike.location?.href,
        },
      );
    });
  }

  function updateCollapsePresentation() {
    const collapsed = dom.app.dataset.panelCollapsed === "true";
    dom.collapseButton.innerHTML = createPanelCollapseIconSvg(collapsed);
    dom.collapseButton.setAttribute("aria-expanded", String(!collapsed));
    dom.collapseButton.setAttribute(
      "aria-label",
      collapsed ? "Expand Lattice Lab panel" : "Collapse Lattice Lab panel",
    );
    dom.collapseButton.title = dom.collapseButton.getAttribute("aria-label");
  }

  function activePeriodicCertificatePassed() {
    const reference = isReferenceLatticeConfiguration(
      caseRecord,
      polarityBySiteId,
    );
    if (!reference) {
      return false;
    }
    if (caseRecord.id !== LATTICE_LAB_CASE_ID) {
      return validatePeriodicSymmetryCertificate(caseRecord, {
        deformationAxis: compressionAxis,
        deformationFactor: compressionFactor,
      }).passed;
    }
    return [
      [0, 0, 0],
      [1, 0, 0],
    ].every((receiverGrid) =>
      ["cube", "sphere"].every((shape) =>
        createStationarySimpleCubicExhaustionLedger({
          receiverGrid,
          cutoff: 4,
          shape,
          compressionAxis,
          compressionFactor,
        }).exactZero
      )
    );
  }

  function updateCompressionPresentation(message = "") {
    const available = compressionAvailable();
    dom.compressionCard.dataset.available = String(available);
    dom.deformationBeta.disabled = !available;
    dom.deformationBeta.value = String(deformationBeta);
    dom.compressionValue.value = `β = ${deformationBeta.toFixed(2)}`;
    dom.compressionValue.textContent = dom.compressionValue.value;
    const endpointDescription = deformationBeta === 0
      ? "undeformed baseline"
      : deformationBeta === 1
        ? "maximum deformation"
        : `static X-axis scale ${compressionFactor.toFixed(3)}`;
    dom.deformationBeta.setAttribute(
      "aria-valuetext",
      `β = ${deformationBeta.toFixed(2)}, ${endpointDescription}`,
    );
    const certificatePassed = activePeriodicCertificatePassed();
    dom.compressionCard.dataset.certificatePassed =
      String(certificatePassed);
    if (message) {
      dom.compressionStatus.textContent = message;
    } else if (certificatePassed) {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum deformation. " +
        "Net acceleration is zero at every architrino.";
    } else if (caseRecord.id === LATTICE_LAB_CASE_ID) {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum deformation. " +
        "The reference tiled-pattern certificate is unavailable in this " +
        "modified polarity state; no all-site zero result is shown.";
    } else if (caseRecord.calculationScope === "finite-nonperiodic") {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum deformation. " +
        "The ledger recalculates every " +
        "included contribution for this displayed finite configuration only.";
    } else if (caseRecord.id === "hcp-abab-layers-v1") {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum deformation. " +
        "The undeformed HCP certificate uses " +
        "threefold rotational symmetry, which this X-axis deformation does " +
        "not preserve. A complete periodic acceleration result is therefore " +
        "not established at this setting.";
    } else {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum deformation. " +
        "Static transformed geometry only. No independent per-case periodic " +
        "cancellation check is attached, so no zero result is shown.";
    }
  }

  function applyCompressionControls() {
    if (!compressionAvailable()) {
      updateCompressionPresentation();
      return false;
    }
    const nextBeta = Number(dom.deformationBeta.value);
    if (
      !Number.isFinite(nextBeta) ||
      nextBeta < 0 ||
      nextBeta > 1
    ) {
      updateCompressionPresentation(
        "Enter β from 0 (undeformed) to 1 (maximum supported deformation).",
      );
      return false;
    }
    deformationBeta = nextBeta;
    compressionFactor = xAxisScaleFromDeformationBeta(deformationBeta);
    rebuildCaseScene();
    updateCompressionPresentation();
    updateCaseRecordPresentation();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    updateUsableCanvasCenter();
    updateFixedMarkerSizes();
    render();
    return true;
  }

  function resetCase() {
    polarityBySiteId = createReferencePolarityState(caseRecord);
    selectedSiteId = caseRecord.defaultSiteId;
    siteSelectionExplicit = false;
    deformationBeta = 0;
    compressionFactor = 1;
    cameraViewHalfHeight = defaultViewHalfHeightForDisplayRadius(
      caseRecord.displayRadius,
    );
    rootGroup.position.set(0, 0, 0);
    rootGroup.quaternion.set(...createDefaultOrientationQuaternion());
    rebuildCaseScene();
    updateCompressionPresentation();
    updateCaseRecordPresentation();
    updatePolarityMaterials();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    updateProjection();
    updateUsableCanvasCenter();
    updateFixedMarkerSizes();
    render();
  }

  function selectSite(siteId) {
    if (!getLatticeSite(caseRecord, siteId)) {
      return false;
    }
    selectedSiteId = siteId;
    siteSelectionExplicit = true;
    updateSelectedPresentation();
    render();
    return true;
  }

  function updatePolarityMaterials() {
    siteMeshes.forEach((mesh, siteId) => {
      const positrino = polarityBySiteId[siteId] === LATTICE_LAB_POLARITY.POSITRINO;
      mesh.material = positrino ? redMaterial : blueMaterial;
    });
    const selectionCircle = createSelectedSiteCircleDescriptor({
      caseRecord,
      polarityBySiteId,
      selectedSiteId,
      deformationAxis: compressionAxis,
      deformationFactor: compressionFactor,
    });
    selectedCalculationCircle.visible = Boolean(selectionCircle);
    if (!selectionCircle) {
      selectedCalculationCircle.userData.siteId = null;
      delete dom.canvas.dataset.selectionCirclePolarity;
      delete dom.canvas.dataset.selectionCircleColor;
      delete dom.canvas.dataset.selectionCircleOuterRadiusPx;
      delete dom.canvas.dataset.selectionCircleStrokePx;
      dom.canvas.dataset.selectionCircleVisible = "false";
      dom.canvas.setAttribute(
        "aria-label",
        `Rotatable three-dimensional ${caseRecord.title} lattice`,
      );
      return;
    }
    selectedCalculationCircle.position.fromArray(selectionCircle.position);
    selectedCalculationCircle.material =
      selectionCircle.polarity === LATTICE_LAB_POLARITY.POSITRINO
        ? redSelectionCircleMaterial
        : blueSelectionCircleMaterial;
    selectedCalculationCircle.userData.siteId = selectionCircle.siteId;
    selectedCalculationCircle.userData.polarity = selectionCircle.polarity;
    dom.canvas.dataset.selectionCircleVisible = "true";
    dom.canvas.dataset.selectionCirclePolarity = selectionCircle.polarity;
    dom.canvas.dataset.selectionCircleColor = selectionCircle.colorName;
    dom.canvas.dataset.selectionCircleOuterRadiusPx = String(
      selectionCircle.outerRadiusPx,
    );
    dom.canvas.dataset.selectionCircleStrokePx = String(
      LATTICE_LAB_SELECTION_CIRCLE_STROKE_PX,
    );
    dom.canvas.setAttribute(
      "aria-label",
      `Rotatable three-dimensional ${caseRecord.title} lattice. ` +
        selectionCircle.accessibleLabel,
    );
  }

  function updateCaseRecordPresentation() {
    const compressed = compressionFactor < 1;
    const ledger = createSelectedSiteLedger(
      caseRecord,
      polarityBySiteId,
      selectedSiteId,
    );
    const summarizeTransformedDistances = (shellId) => {
      const shell = ledger.shells.find((candidate) => candidate.id === shellId);
      const countsByDistance = new Map();
      shell.rows.forEach((row) => {
        const distance = Number(
          Math.hypot(...transformDisplayPosition(row.latticeOffset)).toFixed(3),
        );
        countsByDistance.set(
          distance,
          (countsByDistance.get(distance) ?? 0) + 1,
        );
      });
      return [...countsByDistance.entries()]
        .sort(([left], [right]) => left - right)
        .map(([distance, count]) => `${count} at ${distance}d`)
        .join("; ");
    };
    dom.seeingTitle.textContent = caseRecord.title;
    dom.caseTitle.textContent = caseRecord.title;
    dom.caseGeometry.textContent =
      `${caseRecord.geometryLabel}; ${caseRecord.polarityRule}`;
    dom.caseNearest.textContent = compressed
      ? summarizeTransformedDistances("nearest")
      : caseRecord.id === LATTICE_LAB_CASE_ID
        ? "6 neighbors at distance d"
        : `${caseRecord.nearestShell.count} at distance ${caseRecord.nearestShell.distance}`;
    dom.caseNext.textContent = compressed
      ? summarizeTransformedDistances("next-local")
      : caseRecord.id === LATTICE_LAB_CASE_ID
        ? "12 neighbors at distance √2d"
        : `${caseRecord.nextLocalShell.count} at distance ${caseRecord.nextLocalShell.distance}`;
    dom.caseLocalTotal.textContent = String(
      caseRecord.nearestShell.count + caseRecord.nextLocalShell.count,
    );
    dom.caseDensity.textContent = caseRecord.geometricSiteDensity;
    const randomization = caseRecord.randomization ?? null;
    dom.randomRecalculate.hidden = !randomization;
    if (randomization) {
      dom.canvas.dataset.randomSeed = String(randomization.seed);
      dom.canvas.dataset.randomAssignmentFingerprint =
        randomization.assignmentFingerprint;
    } else {
      delete dom.canvas.dataset.randomSeed;
      delete dom.canvas.dataset.randomAssignmentFingerprint;
    }
    dom.canvas.setAttribute(
      "aria-label",
      `Rotatable three-dimensional ${caseRecord.title} lattice`,
    );
  }

  function updateConfigurationPresentation() {
    updateCompressionPresentation();
  }

  function updateSelectedPresentation() {
    const ledger = createSelectedSiteLedger(
      caseRecord,
      polarityBySiteId,
      selectedSiteId,
      {
        compressionAxis,
        compressionFactor,
      },
    );
    const nearestShell = ledger.shells.find((shell) => shell.id === "nearest");
    const nextLocalShell = ledger.shells.find((shell) => shell.id === "next-local");
    const receiverPolarity = formatPolarityLabel(ledger.receiverPolarity);
    const learnerOverviewCopy = caseRecord.learnerOverview
      ? `${caseRecord.learnerOverview} `
      : "";
    if (
      ledger.certificateApplies && !siteSelectionExplicit &&
      caseRecord.id === LATTICE_LAB_CASE_ID
    ) {
      dom.whatSeeing.textContent =
        "Every architrino has six nearest neighbors of the opposite polarity. " +
        "The next local shell has twelve architrinos of the same polarity. " +
        "Net acceleration is zero at every architrino.";
    } else if (ledger.certificateApplies && !siteSelectionExplicit) {
      const certificateSummary = caseRecord.id === "bcc-two-sublattice-v1"
        ? ""
        : " These local shell sums are zero, and the separate " +
          "repeating-pattern symmetry certificate covers every architrino " +
          "at release.";
      dom.whatSeeing.textContent =
        `${caseRecord.title} shows ${caseRecord.polarityRule}. ` +
        learnerOverviewCopy +
        `The next local shell has ` +
        `${caseRecord.nextLocalShell.count} at ` +
        `${caseRecord.nextLocalShell.distance}.` +
        certificateSummary;
    } else if (ledger.certificateApplies) {
      dom.whatSeeing.textContent =
        learnerOverviewCopy +
        `The selected ${receiverPolarity} has ` +
        `${summarizeShellPolarities(nearestShell)} at ${nearestShell.distance} ` +
        `and ${summarizeShellPolarities(nextLocalShell)} at ` +
        `${nextLocalShell.distance}. Each shown local shell has zero net ` +
        `acceleration in this configuration. Those are illustrative partial sums; ` +
        `the separate repeating-pattern symmetry certificate gives exact zero ` +
        `net acceleration at every architrino` +
        (compressionFactor < 1
          ? ` under this static ${compressionAxis.toUpperCase()}-axis β = ${deformationBeta} deformation (scale ${compressionFactor})`
          : "") +
        `.`;
    } else if (caseRecord.calculationScope === "finite-nonperiodic") {
      dom.whatSeeing.textContent =
        "This is a random 50/50 equal-polarity population on simple-cubic " +
        "site geometry. The assignment has exactly equal numbers of " +
        "electrinos and positrinos, is finite and nonperiodic, and has no " +
        "repeat cell; equal counts do not establish acceleration " +
        `cancellation. The selected ${receiverPolarity} is the ledger target, ` +
        "and the ledger includes every other site in this configuration " +
        "once. The result is finite-case only and makes no motion, " +
        "stability, energy, or conservation claim.";
    } else if (
      caseRecord.accelerationCertificate && !ledger.referenceConfiguration
    ) {
      dom.whatSeeing.textContent =
        `The selected ${receiverPolarity} is in a ` +
        `modified polarity configuration. The local rows below are a finite ` +
        `diagnostic; the reference acceleration certificate does not apply.`;
    } else if (
      caseRecord.id === "hcp-abab-layers-v1" &&
      ledger.certificateValidation && !ledger.certificateValidation.passed
    ) {
      dom.whatSeeing.textContent =
        `${caseRecord.title} shows ${caseRecord.polarityRule}. ` +
        learnerOverviewCopy +
        "This X-axis deformation changes the pattern’s symmetry, so periodic " +
        "acceleration is not established at this setting.";
    } else {
      dom.whatSeeing.textContent =
        `${caseRecord.title} shows ${caseRecord.polarityRule}. ` +
        learnerOverviewCopy +
        `The selected ` +
        `${receiverPolarity} has ` +
        `${summarizeShellPolarities(nearestShell)} at ${nearestShell.distance} ` +
        `and ${summarizeShellPolarities(nextLocalShell)} at ` +
        `${nextLocalShell.distance} in the undeformed reference geometry. ` +
        (compressionFactor < 1
          ? `The display applies a static X-axis β = ${deformationBeta} deformation with scale ${compressionFactor}. `
          : "") +
        `This is a static geometry/reference case, ` +
        `not an acceleration, all-lattice cancellation, stability, or evolution result.`;
    }
    const ledgerViewModel = createLatticeLabLedgerViewModel({
      caseRecord,
      ledger,
      certificatePassed: activePeriodicCertificatePassed(),
      finiteNonperiodic: caseRecord.calculationScope === "finite-nonperiodic",
      siteSelectionExplicit,
    });
    renderLatticeLabLedgerViewModel({
      documentLike,
      dom: {
        root: dom.ledger,
        receiver: dom.ledgerReceiver,
        result: dom.ledgerResult,
        icon: dom.ledgerIcon,
        outcome: dom.ledgerOutcome,
        residual: dom.ledgerResidual,
        statement: dom.ledgerStatement,
        shells: dom.ledgerShells,
        shellScope: dom.ledgerShellScope,
        calculation: dom.ledgerCalculation,
        calculationScope: dom.ledgerCalculationScope,
        calculationRows: dom.ledgerCalculationRows,
      },
      viewModel: ledgerViewModel,
    });
    updatePolarityMaterials();
    updateFixedMarkerSizes();
  }

  function updateFocusedPosition() {
    if (!focusSelected) {
      rootGroup.position.set(layoutWorldOffsetX, 0, 0);
      return;
    }
    const selected = getLatticeSite(caseRecord, selectedSiteId);
    if (!selected) {
      rootGroup.position.set(layoutWorldOffsetX, 0, 0);
      return;
    }
    const transformed = new THREE.Vector3()
      .fromArray(transformDisplayPosition(selected.position))
      .applyQuaternion(rootGroup.quaternion);
    rootGroup.position.set(
      layoutWorldOffsetX - transformed.x,
      -transformed.y,
      -transformed.z,
    );
  }

  function updateUsableCanvasCenter() {
    const canvasRect = dom.canvas.getBoundingClientRect();
    const inspectorRect = dom.inspectorStack.getBoundingClientRect();
    const inspectorOverlapsCanvas =
      inspectorRect.left < canvasRect.right &&
      inspectorRect.right > canvasRect.left;
    const usableRight = inspectorOverlapsCanvas
      ? clamp(inspectorRect.left - canvasRect.left - 12, 0, canvasRect.width)
      : canvasRect.width;
    const hasUsableColumn = usableRight >= Math.min(260, canvasRect.width);
    const targetCenterX = hasUsableColumn
      ? usableRight / 2
      : canvasRect.width / 2;
    const pixelOffset = targetCenterX - canvasRect.width / 2;
    layoutWorldOffsetX =
      pixelOffset * (2 * cameraViewHalfHeight / Math.max(1, canvasRect.height));
    dom.app.dataset.usableCanvasCenterX = targetCenterX.toFixed(2);
    dom.app.dataset.latticeLayoutOffsetX = layoutWorldOffsetX.toFixed(4);
    const legendRight = inspectorOverlapsCanvas
      ? Math.max(16, canvasRect.right - inspectorRect.left + 12)
      : 16;
    dom.polarityLegend.style.right = `${legendRight.toFixed(2)}px`;
    dom.polarityLegend.dataset.markerDiameterPx = String(2 * MARKER_RADIUS_PX);
    updateFocusedPosition();
  }

  function handlePointerDown(event) {
    beginRotationDrag(event, dom.canvas, "main");
  }

  function handleMiniaturePointerDown(event) {
    beginRotationDrag(event, dom.miniatureCanvas, "miniature");
  }

  function handleUnpolarizedPointerDown(event) {
    beginRotationDrag(event, dom.unpolarizedCanvas, "unpolarized");
  }

  function beginRotationDrag(event, target, source) {
    dragging = true;
    dragSource = source;
    pointerId = event.pointerId;
    pointerLastX = event.clientX;
    pointerLastY = event.clientY;
    pointerLastTrackballPoint = projectTrackballPoint(
      event.clientX,
      event.clientY,
      target.getBoundingClientRect(),
    );
    pointerTravel = 0;
    target.setPointerCapture?.(event.pointerId);
    target.focus();
  }

  function handlePointerMove(event) {
    if (!dragging || event.pointerId !== pointerId) {
      return;
    }
    const deltaX = event.clientX - pointerLastX;
    const deltaY = event.clientY - pointerLastY;
    pointerLastX = event.clientX;
    pointerLastY = event.clientY;
    pointerTravel += Math.abs(deltaX) + Math.abs(deltaY);
    const target = dragSource === "miniature"
      ? dom.miniatureCanvas
      : dragSource === "unpolarized"
        ? dom.unpolarizedCanvas
        : dom.canvas;
    const nextTrackballPoint = projectTrackballPoint(
      event.clientX,
      event.clientY,
      target.getBoundingClientRect(),
    );
    const nextQuaternion = applyTrackballDragQuaternion(
      [
        rootGroup.quaternion.x,
        rootGroup.quaternion.y,
        rootGroup.quaternion.z,
        rootGroup.quaternion.w,
      ],
      pointerLastTrackballPoint,
      nextTrackballPoint,
    );
    rootGroup.quaternion.set(...nextQuaternion);
    pointerLastTrackballPoint = nextTrackballPoint;
    updateFocusedPosition();
    render();
  }

  function handlePointerUp(event) {
    if (event.pointerId !== pointerId || dragSource !== "main") {
      return;
    }
    dom.canvas.releasePointerCapture?.(event.pointerId);
    dragging = false;
    dragSource = null;
    pointerId = null;
    if (pointerTravel <= POINTER_CLICK_TRAVEL_PX) {
      selectSiteFromPointer(event);
    }
  }

  function handleMiniaturePointerUp(event) {
    if (event.pointerId !== pointerId || dragSource !== "miniature") {
      return;
    }
    dom.miniatureCanvas.releasePointerCapture?.(event.pointerId);
    dragging = false;
    dragSource = null;
    pointerId = null;
  }

  function handleUnpolarizedPointerUp(event) {
    if (event.pointerId !== pointerId || dragSource !== "unpolarized") {
      return;
    }
    dom.unpolarizedCanvas.releasePointerCapture?.(event.pointerId);
    dragging = false;
    dragSource = null;
    pointerId = null;
  }

  function handlePointerCancel(event) {
    if (event.pointerId === pointerId) {
      dragging = false;
      dragSource = null;
      pointerId = null;
    }
  }

  function handleWheel(event) {
    event.preventDefault();
    cameraViewHalfHeight = clamp(
      cameraViewHalfHeight * (event.deltaY > 0 ? 1.08 : 0.92),
      MIN_VIEW_HALF_HEIGHT,
      MAX_VIEW_HALF_HEIGHT,
    );
    updateProjection();
    updateUsableCanvasCenter();
    updateFixedMarkerSizes();
    render();
  }

  function selectSiteFromPointer(event) {
    const rect = dom.canvas.getBoundingClientRect();
    pointerNdc.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
    pointerNdc.y = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects([...siteMeshes.values()], false);
    if (hits[0]?.object?.userData?.siteId) {
      selectSite(hits[0].object.userData.siteId);
    }
  }

  function updateProjection() {
    const halfWidth = cameraViewHalfHeight * cameraAspect;
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = cameraViewHalfHeight;
    camera.bottom = -cameraViewHalfHeight;
    camera.updateProjectionMatrix();
  }

  function updateFixedMarkerSizes() {
    const viewportHeight = Math.max(1, dom.canvas.getBoundingClientRect().height);
    markerWorldRadius =
      MARKER_RADIUS_PX * (2 * cameraViewHalfHeight / viewportHeight);
    const selectionCircleWorldDiameter =
      2 * SELECTION_CIRCLE_OUTER_RADIUS_PX *
      (2 * cameraViewHalfHeight / viewportHeight);
    selectedCalculationCircle.scale.set(
      selectionCircleWorldDiameter,
      selectionCircleWorldDiameter,
      1,
    );
    const rendererSiteDiameterPx =
      2 * markerWorldRadius * viewportHeight / (2 * cameraViewHalfHeight);
    const displayEnvelopeDiameterPx =
      2 * caseRecord.displayRadius * viewportHeight /
      (2 * cameraViewHalfHeight);
    dom.canvas.dataset.rendererSiteDiameterPx =
      rendererSiteDiameterPx.toFixed(4);
    dom.canvas.dataset.displayEnvelopeDiameterPx =
      displayEnvelopeDiameterPx.toFixed(4);
    dom.polarityLegend.dataset.rendererSiteDiameterPx =
      rendererSiteDiameterPx.toFixed(4);
    const unpolarizedViewportHeight = Math.max(
      1,
      dom.unpolarizedCanvas.getBoundingClientRect().height,
    );
    const unpolarizedWorldRadius =
      MARKER_RADIUS_PX *
      (2 * unpolarizedCamera.top / unpolarizedViewportHeight);
    const unpolarizedLocalRadius =
      unpolarizedWorldRadius / Math.max(1e-7, unpolarizedRoot.scale.x);
    unpolarizedRoot.children
      .filter((object) =>
        object.userData.kind === "unpolarized-conventional-site"
      )
      .forEach((mesh) => mesh.scale.setScalar(unpolarizedLocalRadius));
    const unpolarizedRendererSiteDiameterPx =
      2 * unpolarizedLocalRadius * unpolarizedRoot.scale.x *
      unpolarizedViewportHeight / (2 * unpolarizedCamera.top);
    dom.unpolarizedCanvas.dataset.rendererSiteDiameterPx =
      unpolarizedRendererSiteDiameterPx.toFixed(4);
    dom.unpolarizedCanvas.dataset.mainMarkerDiameterPx =
      rendererSiteDiameterPx.toFixed(4);
    const miniatureViewportHeight = Math.max(
      1,
      dom.miniatureCanvas.getBoundingClientRect().height,
    );
    const miniatureWorldRadius =
      MARKER_RADIUS_PX *
      (2 * miniatureCamera.top / miniatureViewportHeight);
    const miniatureLocalRadius =
      miniatureWorldRadius / Math.max(1e-7, miniatureRoot.scale.x);
    const miniatureRendererSiteDiameterPx =
      2 * miniatureLocalRadius * miniatureRoot.scale.x *
      miniatureViewportHeight / (2 * miniatureCamera.top);
    dom.miniatureCanvas.dataset.rendererSiteDiameterPx =
      miniatureRendererSiteDiameterPx.toFixed(4);
    dom.miniatureCanvas.dataset.ownedMarkerDiameterPx =
      miniatureRendererSiteDiameterPx.toFixed(4);
    dom.miniatureCanvas.dataset.contextMarkerDiameterPx =
      miniatureRendererSiteDiameterPx.toFixed(4);
    const endpointActive = deformationBeta === 1;
    endpointAggregateGroup.clear();
    miniatureEndpointAggregateGroup.clear();

    let mainEndpointAggregation = null;
    let miniatureEndpointAggregation = null;
    if (endpointActive) {
      const mainEdges = edgeLines.map(({ userData: { edge } }) => ({
        id: [edge.fromSiteId, edge.toSiteId].sort().join("|"),
        fromSiteId: edge.fromSiteId,
        toSiteId: edge.toSiteId,
      }));
      mainEndpointAggregation = createEndpointVisualAggregation(
        caseRecord.sites.map((site) => ({
          id: site.id,
          position: transformDisplayPosition(site.position),
        })),
        mainEdges,
        2 * markerWorldRadius + 1e-9,
      );
      mainEndpointAggregation.groups.forEach((group) => {
        const aggregate = new THREE.Mesh(
          sphereGeometry,
          endpointAggregateMaterial,
        );
        aggregate.position.fromArray(group.position);
        aggregate.scale.setScalar(markerWorldRadius);
        aggregate.userData.kind = "endpoint-aggregate-site-group";
        aggregate.userData.memberSiteIds = group.memberIds;
        endpointAggregateGroup.add(aggregate);
      });

      const miniatureSiteMeshes = miniatureRoot.children.filter((object) =>
        object.userData.kind === "repeat-cell-site" ||
        object.userData.kind === "repeat-cell-periodic-continuation"
      );
      const miniatureEdges = miniatureRoot.children
        .filter((object) =>
          object.userData.kind === "repeat-cell-neighbor" ||
          object.userData.kind === "repeat-cell-periodic-neighbor"
        )
        .map((line) => ({
          id: line.userData.edgeIdentity,
          fromSiteId: line.userData.fromSiteId,
          toSiteId: line.userData.toSiteId,
        }));
      miniatureEndpointAggregation = createEndpointVisualAggregation(
        miniatureSiteMeshes.map((mesh) => ({
          id: mesh.userData.siteId,
          position: mesh.position.toArray(),
        })),
        miniatureEdges,
        2 * miniatureLocalRadius + 1e-9,
      );
      miniatureEndpointAggregation.groups.forEach((group) => {
        const aggregate = new THREE.Mesh(
          sphereGeometry,
          endpointAggregateMaterial,
        );
        aggregate.position.fromArray(group.position);
        aggregate.scale.setScalar(miniatureLocalRadius);
        aggregate.userData.kind = "repeat-cell-endpoint-aggregate-site-group";
        aggregate.userData.memberSiteIds = group.memberIds;
        miniatureEndpointAggregateGroup.add(aggregate);
      });
    }

    siteMeshes.forEach((mesh) => {
      mesh.scale.setScalar(markerWorldRadius);
      mesh.visible = !endpointActive;
    });
    if (endpointActive && mainEndpointAggregation) {
      const selectedGroup = mainEndpointAggregation.groupBySiteId.get(
        selectedSiteId,
      );
      if (selectedGroup) {
        selectedCalculationCircle.position.fromArray(selectedGroup.position);
        selectedCalculationCircle.material = endpointSelectionCircleMaterial;
        selectedCalculationCircle.userData.endpointAggregated = true;
        dom.canvas.dataset.selectionCircleColor = "purple";
        dom.canvas.dataset.selectionCircleEndpointAggregate = "true";
        dom.canvas.setAttribute(
          "aria-label",
          `Rotatable three-dimensional ${caseRecord.title} lattice. ` +
            "The selected source architrino belongs to the purple endpoint " +
            "aggregate marked by a purple outer selection circle.",
        );
      }
    } else {
      selectedCalculationCircle.userData.endpointAggregated = false;
      dom.canvas.dataset.selectionCircleEndpointAggregate = "false";
    }
    const mainEndpointExternalById = new Map(
      mainEndpointAggregation?.externalEdges.map((edge) => [edge.id, edge]) ?? [],
    );
    const selectedMainEdgeIdentities = new Set(
      repeatHighlightGroup.userData.mainEdgeIdentities ?? [],
    );
    const selectedEndpointGroupPairIds = new Set(
      createEndpointHighlightGroupPairIds(
        mainEndpointAggregation,
        repeatHighlightGroup.children
          .filter((object) =>
            object.userData.kind === "repeat-cell-highlight-neighbor"
          )
          .map(({ userData }) => ({
            fromSiteId: userData.mainFromSiteId,
            toSiteId: userData.mainToSiteId,
          })),
      ),
    );
    const clippedMainEdgeIdentities = [];
    const suppressedMainEdgeIdentities = [];
    const suppressedEndpointBundleEdgeIdentities = [];
    const preventedEndpointHighlightCollisionEdgeIdentities = [];
    const visibleOrdinaryEndpointGroupPairIds = new Set();
    const collapsedInternalMainEdgeIdentities = [];
    const redundantEndpointMainEdgeIdentities = [];
    edgeLines.forEach((line) => {
      const edge = line.userData.edge;
      const mainEdgeIdentity = [edge.fromSiteId, edge.toSiteId]
        .sort().join("|");
      const startSite = getLatticeSite(caseRecord, edge.fromSiteId);
      const endSite = getLatticeSite(caseRecord, edge.toSiteId);
      if (mainEndpointAggregation?.internalEdgeIds.includes(mainEdgeIdentity)) {
        line.visible = false;
        collapsedInternalMainEdgeIdentities.push(mainEdgeIdentity);
        return;
      }
      if (
        mainEndpointAggregation?.redundantExternalEdgeIds.includes(
          mainEdgeIdentity,
        )
      ) {
        line.visible = false;
        redundantEndpointMainEdgeIdentities.push(mainEdgeIdentity);
        return;
      }
      const endpointEdge = mainEndpointExternalById.get(mainEdgeIdentity);
      const endpointGroupPairId = endpointEdge?.fromGroup &&
          endpointEdge?.toGroup
        ? [endpointEdge.fromGroup.id, endpointEdge.toGroup.id]
          .sort().join("|")
        : null;
      const start = endpointEdge?.fromGroup?.position ??
        transformDisplayPosition(startSite.position);
      const end = endpointEdge?.toGroup?.position ??
        transformDisplayPosition(endSite.position);
      const distance = Math.hypot(...end.map(
        (value, index) => value - start[index],
      ));
      if (distance <= 2 * markerWorldRadius) {
        line.visible = false;
        return;
      }
      if (
        repeatCellHighlighted &&
        (
          selectedMainEdgeIdentities.has(mainEdgeIdentity) ||
          (
            endpointGroupPairId &&
            selectedEndpointGroupPairIds.has(endpointGroupPairId)
          )
        )
      ) {
        line.visible = false;
        suppressedMainEdgeIdentities.push(mainEdgeIdentity);
        if (endpointGroupPairId) {
          suppressedEndpointBundleEdgeIdentities.push(mainEdgeIdentity);
          if (!selectedMainEdgeIdentities.has(mainEdgeIdentity)) {
            preventedEndpointHighlightCollisionEdgeIdentities.push(
              mainEdgeIdentity,
            );
          }
        }
        return;
      }
      line.visible = true;
      const segment = createClippedNeighborSegment(
        start,
        end,
        markerWorldRadius,
      );
      const position = line.geometry.getAttribute("position");
      position.setXYZ(0, ...segment.start);
      position.setXYZ(1, ...segment.end);
      position.needsUpdate = true;
      line.geometry.computeBoundingSphere();
      if (endpointGroupPairId) {
        visibleOrdinaryEndpointGroupPairIds.add(endpointGroupPairId);
      }
      clippedMainEdgeIdentities.push(
        mainEdgeIdentity,
      );
    });
    dom.canvas.dataset.clippedNearestEdgeCount =
      String(clippedMainEdgeIdentities.length);
    dom.canvas.dataset.clippedNearestEdgeIdentities =
      clippedMainEdgeIdentities.join(";");
    dom.canvas.dataset.suppressedNearestEdgeCount =
      String(suppressedMainEdgeIdentities.length);
    dom.canvas.dataset.suppressedNearestEdgeIdentities =
      suppressedMainEdgeIdentities.join(";");
    dom.canvas.dataset.endpointHighlightedGroupPairCount =
      String(selectedEndpointGroupPairIds.size);
    dom.canvas.dataset.endpointSuppressedOrdinaryBundleCount =
      String(suppressedEndpointBundleEdgeIdentities.length);
    dom.canvas.dataset.endpointHighlightCollisionPreventedCount =
      String(preventedEndpointHighlightCollisionEdgeIdentities.length);
    dom.canvas.dataset.endpointHighlightCollisionPreventedEdgeIdentities =
      preventedEndpointHighlightCollisionEdgeIdentities.join(";");
    dom.canvas.dataset.endpointOrdinaryHighlightOverlapCount = String(
      repeatCellHighlighted
        ? [...visibleOrdinaryEndpointGroupPairIds].filter((pairId) =>
          selectedEndpointGroupPairIds.has(pairId)
        ).length
        : 0,
    );
    dom.canvas.dataset.endpointAggregateGroupCount = String(
      mainEndpointAggregation?.groups.length ?? 0,
    );
    dom.canvas.dataset.endpointCollapsedGroupCount = String(
      mainEndpointAggregation?.collapsedGroups.length ?? 0,
    );
    dom.canvas.dataset.endpointAggregateSiteCount = String(
      mainEndpointAggregation?.groups.reduce(
        (count, group) => count + group.memberIds.length,
        0,
      ) ?? 0,
    );
    dom.canvas.dataset.endpointVisibleSourceMarkerCount = String(
      endpointActive ? 0 : siteMeshes.size,
    );
    dom.canvas.dataset.endpointInternalEdgeCount =
      String(collapsedInternalMainEdgeIdentities.length);
    dom.canvas.dataset.endpointRedundantExternalEdgeCount =
      String(redundantEndpointMainEdgeIdentities.length);
    const miniatureRadiusBySiteId = new Map();
    miniatureRoot.children
      .filter((object) =>
        object.userData.kind === "repeat-cell-site" ||
        object.userData.kind === "repeat-cell-periodic-continuation"
      )
      .forEach((mesh) => {
        const radius = miniatureLocalRadius;
        mesh.scale.setScalar(radius);
        miniatureRadiusBySiteId.set(mesh.userData.siteId, radius);
        mesh.visible = !endpointActive;
      });
    const clippedMiniatureEdgeIdentities = [];
    const overlapMiniatureEdgeIdentities = [];
    const collapsedInternalMiniatureEdgeIdentities = [];
    const redundantEndpointMiniatureEdgeIdentities = [];
    const miniatureEndpointExternalById = new Map(
      miniatureEndpointAggregation?.externalEdges.map(
        (edge) => [edge.id, edge],
      ) ?? [],
    );
    miniatureRoot.children
      .filter((object) =>
        object.userData.kind === "repeat-cell-neighbor" ||
        object.userData.kind === "repeat-cell-periodic-neighbor"
      )
      .forEach((line) => {
        if (
          miniatureEndpointAggregation?.internalEdgeIds.includes(
            line.userData.edgeIdentity,
          )
        ) {
          line.visible = false;
          collapsedInternalMiniatureEdgeIdentities.push(
            line.userData.edgeIdentity,
          );
          return;
        }
        if (
          miniatureEndpointAggregation?.redundantExternalEdgeIds.includes(
            line.userData.edgeIdentity,
          )
        ) {
          line.visible = false;
          redundantEndpointMiniatureEdgeIdentities.push(
            line.userData.edgeIdentity,
          );
          return;
        }
        const endpointEdge = miniatureEndpointExternalById.get(
          line.userData.edgeIdentity,
        );
        const startPosition = endpointEdge?.fromGroup?.position ??
          line.userData.startPosition;
        const endPosition = endpointEdge?.toGroup?.position ??
          line.userData.endPosition;
        const startRadius = line.userData.startHasSphere
          ? endpointEdge
            ? miniatureLocalRadius
            : miniatureRadiusBySiteId.get(line.userData.fromSiteId) ??
              miniatureLocalRadius
          : 0;
        const endRadius = line.userData.endHasSphere
          ? endpointEdge
            ? miniatureLocalRadius
            : miniatureRadiusBySiteId.get(line.userData.toSiteId) ??
              miniatureLocalRadius
          : 0;
        const distance = Math.hypot(...endPosition.map(
          (value, index) => value - startPosition[index],
        ));
        if (distance <= startRadius + endRadius) {
          line.visible = true;
          line.material = miniatureOverlapLineMaterial;
          line.renderOrder = 4;
          const position = line.geometry.getAttribute("position");
          position.setXYZ(0, ...startPosition);
          position.setXYZ(1, ...endPosition);
          position.needsUpdate = true;
          line.geometry.computeBoundingSphere();
          clippedMiniatureEdgeIdentities.push(line.userData.edgeIdentity);
          overlapMiniatureEdgeIdentities.push(line.userData.edgeIdentity);
          return;
        }
        line.visible = true;
        const segment = createClippedNeighborSegment(
          startPosition,
          endPosition,
          startRadius,
          endRadius,
        );
        const position = line.geometry.getAttribute("position");
        position.setXYZ(0, ...segment.start);
        position.setXYZ(1, ...segment.end);
        position.needsUpdate = true;
        line.geometry.computeBoundingSphere();
        clippedMiniatureEdgeIdentities.push(line.userData.edgeIdentity);
      });
    dom.miniatureCanvas.dataset.clippedEdgeCount =
      String(clippedMiniatureEdgeIdentities.length);
    dom.miniatureCanvas.dataset.clippedEdgeIdentities =
      clippedMiniatureEdgeIdentities.join(";");
    dom.miniatureCanvas.dataset.overlapConnectorCount =
      String(overlapMiniatureEdgeIdentities.length);
    dom.miniatureCanvas.dataset.overlapConnectorIdentities =
      overlapMiniatureEdgeIdentities.join(";");
    dom.miniatureCanvas.dataset.endpointAggregateGroupCount = String(
      miniatureEndpointAggregation?.groups.length ?? 0,
    );
    dom.miniatureCanvas.dataset.endpointCollapsedGroupCount = String(
      miniatureEndpointAggregation?.collapsedGroups.length ?? 0,
    );
    dom.miniatureCanvas.dataset.endpointVisibleSourceMarkerCount = String(
      endpointActive ? 0 : miniatureRadiusBySiteId.size,
    );
    dom.miniatureCanvas.dataset.endpointDisplayTreatment = endpointActive
      ? "purple-aggregate-only"
      : "source-polarity-markers";
    if (endpointActive) {
      dom.miniatureCanvas.setAttribute(
        "aria-label",
        `Interactive repeat-cell view for ${caseRecord.title}. At maximum ` +
          "deformation, source sites are represented only by purple endpoint " +
          "aggregates; source identities and polarities remain unchanged.",
      );
    }
    dom.miniatureCanvas.dataset.endpointInternalEdgeCount =
      String(collapsedInternalMiniatureEdgeIdentities.length);
    dom.miniatureCanvas.dataset.endpointRedundantExternalEdgeCount =
      String(redundantEndpointMiniatureEdgeIdentities.length);
    dom.canvas.dataset.sphereRadiusPx = String(MARKER_RADIUS_PX);
    dom.miniatureCanvas.dataset.sphereRadiusPx = String(MARKER_RADIUS_PX);
    const clippedHighlightEdgeIdentities = [];
    const collapsedInternalHighlightEdgeIdentities = [];
    const redundantEndpointHighlightEdgeIdentities = [];
    const seenEndpointHighlightGroupPairs = new Set();
    repeatHighlightGroup.children
      .filter((object) =>
        object.userData.kind === "repeat-cell-highlight-neighbor"
      )
      .forEach((highlight) => {
        let transformedStart = transformDisplayPosition(
          highlight.userData.startPosition,
        );
        let transformedEnd = transformDisplayPosition(
          highlight.userData.endPosition,
        );
        if (mainEndpointAggregation) {
          const fromSiteId = highlight.userData.mainFromSiteId;
          const toSiteId = highlight.userData.mainToSiteId;
          const fromGroup = mainEndpointAggregation.groupBySiteId.get(
            fromSiteId,
          );
          const toGroup = mainEndpointAggregation.groupBySiteId.get(toSiteId);
          if (fromGroup?.id === toGroup?.id) {
            highlight.userData.segmentFits = false;
            highlight.visible = false;
            collapsedInternalHighlightEdgeIdentities.push(
              highlight.userData.edgeIdentity,
            );
            return;
          }
          if (fromGroup && toGroup) {
            const groupPair = [fromGroup.id, toGroup.id].sort().join("|");
            if (seenEndpointHighlightGroupPairs.has(groupPair)) {
              highlight.userData.segmentFits = false;
              highlight.visible = false;
              redundantEndpointHighlightEdgeIdentities.push(
                highlight.userData.edgeIdentity,
              );
              return;
            }
            seenEndpointHighlightGroupPairs.add(groupPair);
            transformedStart = fromGroup.position;
            transformedEnd = toGroup.position;
          }
        }
        const distance = Math.hypot(...transformedEnd.map(
          (value, index) => value - transformedStart[index],
        ));
        if (distance <= 2 * markerWorldRadius) {
          highlight.userData.segmentFits = false;
          highlight.visible = false;
          return;
        }
        highlight.userData.segmentFits = true;
        highlight.visible = repeatCellHighlighted;
        const segment = createClippedNeighborSegment(
          transformedStart,
          transformedEnd,
          markerWorldRadius,
        );
        const start = new THREE.Vector3(...segment.start);
        const end = new THREE.Vector3(...segment.end);
        const direction = end.clone().sub(start);
        const length = direction.length();
        highlight.position.copy(start).add(end).multiplyScalar(0.5);
        highlight.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize(),
        );
        highlight.scale.set(1, length, 1);
        clippedHighlightEdgeIdentities.push(
          highlight.userData.edgeIdentity,
        );
      });
    dom.canvas.dataset.clippedRepeatHighlightEdgeCount =
      String(clippedHighlightEdgeIdentities.length);
    dom.canvas.dataset.clippedRepeatHighlightEdgeIdentities =
      clippedHighlightEdgeIdentities.join(";");
    dom.canvas.dataset.endpointInternalHighlightEdgeCount =
      String(collapsedInternalHighlightEdgeIdentities.length);
    dom.canvas.dataset.endpointRedundantHighlightEdgeCount =
      String(redundantEndpointHighlightEdgeIdentities.length);
    dom.canvas.dataset.endpointRepeatHighlightVisible = "false";
    dom.canvas.dataset.endpointRepeatHighlightBundleCount = "0";
    dom.canvas.dataset.endpointRepeatHighlightCanonicalEdgeCount = "0";
    dom.canvas.dataset.endpointRepeatHighlightEdgeIdentities = "";
  }

  function updateTripod() {
    const axes = [
      ["x", new THREE.Vector3(1, 0, 0)],
      ["y", new THREE.Vector3(0, 1, 0)],
      ["z", new THREE.Vector3(0, 0, 1)],
    ];
    axes.forEach(([axis, vector]) => {
      vector.applyQuaternion(rootGroup.quaternion);
      const layout = createTripodAxisLayout(axis, [vector.x, vector.y]);
      const line = dom.tripod.querySelector(`[data-axis-line="${axis}"]`);
      const label = dom.tripod.querySelector(`[data-axis-label="${axis}"]`);
      line?.setAttribute("x1", layout.negativeEndpoint.x.toFixed(2));
      line?.setAttribute("y1", layout.negativeEndpoint.y.toFixed(2));
      line?.setAttribute("x2", layout.positiveEndpoint.x.toFixed(2));
      line?.setAttribute("y2", layout.positiveEndpoint.y.toFixed(2));
      label?.setAttribute("x", layout.labelPosition.x.toFixed(2));
      label?.setAttribute("y", layout.labelPosition.y.toFixed(2));
      label?.setAttribute("text-anchor", layout.labelAnchor);
    });
  }

  function resize() {
    const rect = dom.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    cameraAspect = width / height;
    updateProjection();
    updateUsableCanvasCenter();

    const unpolarizedRect = dom.unpolarizedCanvas.getBoundingClientRect();
    const unpolarizedWidth = Math.max(1, Math.floor(unpolarizedRect.width));
    const unpolarizedHeight = Math.max(1, Math.floor(unpolarizedRect.height));
    unpolarizedRenderer.setPixelRatio(
      Math.min(2, windowLike.devicePixelRatio || 1),
    );
    unpolarizedRenderer.setSize(
      unpolarizedWidth,
      unpolarizedHeight,
      false,
    );
    const unpolarizedHalfHeight = 2.45;
    const unpolarizedHalfWidth = unpolarizedHalfHeight *
      (unpolarizedWidth / unpolarizedHeight);
    unpolarizedCamera.left = -unpolarizedHalfWidth;
    unpolarizedCamera.right = unpolarizedHalfWidth;
    unpolarizedCamera.top = unpolarizedHalfHeight;
    unpolarizedCamera.bottom = -unpolarizedHalfHeight;
    unpolarizedCamera.updateProjectionMatrix();

    const miniRect = dom.miniatureCanvas.getBoundingClientRect();
    const miniWidth = Math.max(1, Math.floor(miniRect.width));
    const miniHeight = Math.max(1, Math.floor(miniRect.height));
    miniatureRenderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
    miniatureRenderer.setSize(miniWidth, miniHeight, false);
    const miniHalfHeight = 2.45;
    const miniHalfWidth = miniHalfHeight * (miniWidth / miniHeight);
    miniatureCamera.left = -miniHalfWidth;
    miniatureCamera.right = miniHalfWidth;
    miniatureCamera.top = miniHalfHeight;
    miniatureCamera.bottom = -miniHalfHeight;
    miniatureCamera.updateProjectionMatrix();
    renderLegendSwatches();
    updateFixedMarkerSizes();
    render();
  }

  function render() {
    unpolarizedRoot.quaternion.copy(rootGroup.quaternion);
    miniatureRoot.quaternion.copy(rootGroup.quaternion);
    dom.app.dataset.latticeRotation = [
      rootGroup.rotation.x,
      rootGroup.rotation.y,
      rootGroup.rotation.z,
    ].map((value) => value.toFixed(5)).join(",");
    dom.app.dataset.latticeViewHalfHeight =
      cameraViewHalfHeight.toFixed(5);
    updateTripod();
    renderer.render(scene, camera);
    unpolarizedRenderer.render(unpolarizedScene, unpolarizedCamera);
    miniatureRenderer.render(miniatureScene, miniatureCamera);
  }

  function dispose() {
    resizeObserver?.disconnect?.();
    listeners.splice(0).forEach((remove) => remove());
    sceneSearchRuntime.destroy();
    edgeLines.forEach((line) => line.geometry.dispose());
    guideGroup.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    });
    miniatureRoot.traverse((object) => {
      if (object.userData.disposeGeometry) {
        object.geometry?.dispose?.();
      }
    });
    sphereGeometry.dispose();
    redMaterial.dispose();
    blueMaterial.dispose();
    unpolarizedMaterial.dispose();
    unpolarizedFrameMaterial.dispose();
    redSelectionCircleMaterial.dispose();
    blueSelectionCircleMaterial.dispose();
    endpointSelectionCircleMaterial.dispose();
    selectionCircleTexture.dispose();
    neighborLineMaterial.dispose();
    miniatureNeighborLineMaterial.dispose();
    miniatureOwnedCellBoundaryMaterial.dispose();
    highlightedNeighborMaterial.dispose();
    renderer.dispose();
    unpolarizedRenderer.dispose();
    miniatureRenderer.dispose();
    legendSwatchRenderers.forEach(({ renderer }) => renderer.dispose());
  }
}
