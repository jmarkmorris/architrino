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
  createRepeatCellNearestNeighborNetwork,
  createReferencePolarityState,
  createSelectedSiteLedger,
  getLatticeSite,
  isReferenceLatticeConfiguration,
} from "./LatticeLabCase.js";
import {
  createStationarySimpleCubicExhaustionLedger,
} from "./SimpleCubicStationaryLedger.js";
import {
  createLatticeLabLedgerViewModel,
  renderLatticeLabLedgerViewModel,
} from "./LatticeLabLedgerPresentation.js";

const ELECTRINO_COLOR = 0x0000ff;
const POSITRINO_COLOR = 0xff0000;
const ENDPOINT_AGGREGATE_COLOR = 0x9f7cff;
const GEOMETRY_LINE_COLOR = 0xc6b6ff;
const REPEAT_CELL_HIGHLIGHT_COLOR = 0xb79cff;
const REPEAT_CELL_HIGHLIGHT_RADIUS = 0.0176;
const DEFAULT_VIEW_HALF_HEIGHT = 4.4;
const MIN_VIEW_HALF_HEIGHT = 1.35;
const MAX_VIEW_HALF_HEIGHT = 8.5;
const CAMERA_DISTANCE = 12;
const MARKER_RADIUS_PX = 8;
const POINTER_CLICK_TRAVEL_PX = 7;
const DEFAULT_BASE_ROTATION = Object.freeze([-0.44, 0.66, 0]);
const DEFAULT_Z_UP_SCREEN_ROLL = 1.0688619267721347;
const TRIPOD_ORIGIN = Object.freeze({ x: 72, y: 66 });
const TRIPOD_AXIS_RADIUS = 42;
const TRIPOD_LABEL_GAP = 10;
const MAX_COMPRESSION_SCALE = 0.01;

export const LATTICE_LAB_UI_FEATURES = Object.freeze({
  primerCollapse: false,
});

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

function formatTranslationVector(label, vector) {
  const values = vector.map((value) => {
    if (Math.abs(value) < 1e-10) {
      return "0";
    }
    return String(Number(value.toFixed(3)));
  });
  return `${label} → ⟨${values.join(", ")}⟩d`;
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
  const caseRecords = options.caseRecords ??
    (options.caseRecord
      ? Object.freeze([options.caseRecord])
      : createLatticeLabCaseGallery());
  let caseRecord = options.caseRecord ?? caseRecords[0];
  const dom = {
    app: queryRequiredElement(documentLike, "#lattice-lab-app"),
    rail: queryRequiredElement(documentLike, "#lattice-lab-left-rail"),
    collapseButton: queryRequiredElement(documentLike, "#lattice-lab-panel-collapse"),
    canvas: queryRequiredElement(documentLike, "#lattice-lab-canvas"),
    miniatureCanvas: queryRequiredElement(documentLike, "#lattice-lab-miniature-canvas"),
    caseSelect: queryRequiredElement(documentLike, "#lattice-lab-case-select"),
    seeingTitle: queryRequiredElement(documentLike, "#lattice-lab-seeing-title"),
    caseTitle: queryRequiredElement(documentLike, "#lattice-lab-case-title"),
    caseGeometry: queryRequiredElement(documentLike, "#lattice-lab-case-geometry"),
    caseNearest: queryRequiredElement(documentLike, "#lattice-lab-case-nearest"),
    caseNext: queryRequiredElement(documentLike, "#lattice-lab-case-next"),
    caseLocalTotal: queryRequiredElement(documentLike, "#lattice-lab-case-local-total"),
    caseDensity: queryRequiredElement(documentLike, "#lattice-lab-case-density"),
    caseBoundary: queryRequiredElement(documentLike, "#lattice-lab-case-boundary"),
    caseScope: queryRequiredElement(documentLike, "#lattice-lab-case-scope"),
    compressionCard: queryRequiredElement(documentLike, "#lattice-lab-compression-card"),
    deformationBeta: queryRequiredElement(documentLike, "#lattice-lab-deformation-beta"),
    compressionValue: queryRequiredElement(documentLike, "#lattice-lab-compression-value"),
    compressionStatus: queryRequiredElement(documentLike, "#lattice-lab-compression-status"),
    whatSeeing: queryRequiredElement(documentLike, "#lattice-lab-what-seeing"),
    inspectorStack: queryRequiredElement(documentLike, ".lattice-lab-inspector-stack"),
    repeatHighlight: queryRequiredElement(documentLike, "#lattice-lab-repeat-highlight"),
    repeatHighlightState: queryRequiredElement(documentLike, "#lattice-lab-repeat-highlight-state"),
    repeatVectorA: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-a"),
    repeatVectorB: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-b"),
    repeatVectorC: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-c"),
    primer: queryRequiredElement(documentLike, "#lattice-lab-primer"),
    primerToggle: queryRequiredElement(documentLike, "#lattice-lab-primer-toggle"),
    primerTitle: queryRequiredElement(documentLike, "#lattice-lab-primer-title"),
    primerBody: queryRequiredElement(documentLike, "#lattice-lab-primer-body"),
    ledger: queryRequiredElement(documentLike, "#lattice-lab-ledger"),
    ledgerReceiver: queryRequiredElement(documentLike, "#lattice-lab-ledger-receiver"),
    ledgerResult: queryRequiredElement(documentLike, "#lattice-lab-ledger-result"),
    ledgerIcon: queryRequiredElement(documentLike, "#lattice-lab-ledger-icon"),
    ledgerOutcome: queryRequiredElement(documentLike, "#lattice-lab-ledger-outcome"),
    ledgerResidual: queryRequiredElement(documentLike, "#lattice-lab-ledger-residual"),
    ledgerStatement: queryRequiredElement(documentLike, "#lattice-lab-ledger-statement"),
    ledgerShells: queryRequiredElement(documentLike, "#lattice-lab-ledger-shells"),
    ledgerShellScope: queryRequiredElement(documentLike, "#lattice-lab-ledger-shell-scope"),
    ledgerCalculation: queryRequiredElement(documentLike, "#lattice-lab-ledger-calculation"),
    ledgerCalculationRows: queryRequiredElement(documentLike, "#lattice-lab-ledger-calculation-rows"),
    tripod: queryRequiredElement(documentLike, "#lattice-lab-tripod"),
    polarityLegend: queryRequiredElement(
      documentLike,
      "#lattice-lab-polarity-legend",
    ),
    tocButton: queryRequiredElement(documentLike, "#textbook-toc-button"),
    backButton: queryRequiredElement(documentLike, "#nav-up"),
    forwardButton: queryRequiredElement(documentLike, "#nav-forward"),
    homeButton: queryRequiredElement(documentLike, "#home-button"),
  };

  let polarityBySiteId = createReferencePolarityState(caseRecord);
  let selectedSiteId = caseRecord.defaultSiteId;
  let siteSelectionExplicit = false;
  let cameraViewHalfHeight = DEFAULT_VIEW_HALF_HEIGHT;
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
  createSceneLights(miniatureScene);

  const rootGroup = new THREE.Group();
  const siteGroup = new THREE.Group();
  const lineGroup = new THREE.Group();
  const repeatHighlightGroup = new THREE.Group();
  const endpointAggregateGroup = new THREE.Group();
  const guideGroup = new THREE.Group();
  rootGroup.add(
    guideGroup,
    lineGroup,
    repeatHighlightGroup,
    siteGroup,
    endpointAggregateGroup,
  );
  scene.add(rootGroup);

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
  const selectedRedMaterial = new THREE.MeshStandardMaterial({
    color: POSITRINO_COLOR,
    emissive: POSITRINO_COLOR,
    emissiveIntensity: 0.62,
    roughness: 0.3,
    metalness: 0.04,
  });
  const selectedBlueMaterial = new THREE.MeshStandardMaterial({
    color: ELECTRINO_COLOR,
    emissive: ELECTRINO_COLOR,
    emissiveIntensity: 0.62,
    roughness: 0.3,
    metalness: 0.04,
  });
  const endpointAggregateMaterial = new THREE.MeshStandardMaterial({
    color: ENDPOINT_AGGREGATE_COLOR,
    emissive: ENDPOINT_AGGREGATE_COLOR,
    emissiveIntensity: 0.22,
    roughness: 0.34,
    metalness: 0.04,
  });
  const neighborLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: 0.64,
    depthTest: true,
    depthWrite: false,
  });
  const miniatureNeighborLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: 0.58,
    depthTest: true,
    depthWrite: false,
  });
  const miniatureOverlapLineMaterial = new THREE.LineBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: 0.82,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const continuationMarkerMaterial = new THREE.PointsMaterial({
    color: GEOMETRY_LINE_COLOR,
    size: 4,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.72,
    depthTest: true,
    depthWrite: false,
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
  resizeObserver?.observe?.(dom.miniatureCanvas);
  updateCollapsePresentation();
  updatePrimerCollapsePresentation();
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
    siteMeshes.clear();
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
    return candidates.sort(
      (left, right) => left.centerDistance - right.centerDistance,
    )[0]?.sites ?? [];
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
          transformedDistance,
          mainEdgeIdentity: startSiteId && endSiteId
            ? [startSiteId, endSiteId].sort().join("|")
            : null,
        };
      },
    );
    edgeRows.forEach((row) => {
      const { edge, startPosition, endPosition, mainEdgeIdentity } = row;
      const startKey = startPosition
        .map((value) => Number(value.toFixed(9))).join(",");
      const endKey = endPosition
        .map((value) => Number(value.toFixed(9))).join(",");
      if (
        !siteIdByPositionKey.has(startKey) ||
        !siteIdByPositionKey.has(endKey) ||
        !mainEdgeIdentity
      ) {
        throw new Error(
          `${caseRecord.title} central highlight is missing a displayed ` +
          "periodic-image endpoint.",
        );
      }
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
      highlight.userData.disposeGeometry = true;
      highlight.renderOrder = 3;
      repeatHighlightGroup.add(highlight);
    });
    repeatHighlightGroup.userData.ownedSiteIds = Object.freeze(
      ownedSites.map((site) => site.id),
    );
    repeatHighlightGroup.userData.edgeIdentities =
      displayGraph.edgeIdentities;
    repeatHighlightGroup.userData.mainEdgeIdentities = Object.freeze(
      edgeRows.map(({ mainEdgeIdentity }) => mainEdgeIdentity),
    );
    dom.canvas.dataset.repeatHighlightEdgeCount =
      String(displayGraph.edgeIdentities.length);
    dom.canvas.dataset.repeatHighlightEdgeIdentities =
      displayGraph.edgeIdentities.join(";");
    dom.canvas.dataset.repeatHighlightMainEdgeCount =
      String(edgeRows.length);
    dom.canvas.dataset.repeatHighlightMainEdgeIdentities =
      edgeRows.map(({ mainEdgeIdentity }) => mainEdgeIdentity).join(";");
    dom.canvas.dataset.repeatHighlightExcludedEdgeCount =
      String(displayGraph.excludedEdges.length);
    dom.repeatHighlightState.textContent = compressionFactor < 1
      ? `${displayGraph.edges.length} canonical repeat relationships remain ` +
        "visible at their deformed lengths."
      : caseRecord.repeatCell.contextPresentation === "continuation-markers"
        ? `${displayGraph.edges.length} nearest-neighbor segments touch the ` +
          "two sites in this tile at d. Purple endpoints continue into " +
          "adjacent translated cells. Same-color square edges are the longer " +
          "next shell at 2d/√3, so they are not drawn."
        : `${displayGraph.edges.length} fixed-distance nearest-neighbor edges at d.`;
  }

  function rebuildMiniatureNetwork(displayGraph) {
    const { network } = displayGraph;
    const rawPositions = [];
    const referencePositions = [];
    const contextAsMarkers =
      caseRecord.repeatCell.contextPresentation === "continuation-markers";
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
      miniatureRoot.add(miniatureMesh);
    });

    const continuationMarkerPositions = new Map();
    displayGraph.edges.forEach(({ edge }) => {
      const start = transformDisplayPosition(edge.start);
      const end = transformDisplayPosition(edge.end);
      rawPositions.push(start, end);
      referencePositions.push(edge.start, edge.end);
      if (contextAsMarkers && edge.startContinuation) {
        continuationMarkerPositions.set(
          start.map((value) => Number(value.toFixed(9))).join(","),
          start,
        );
      }
      if (contextAsMarkers && edge.endContinuation) {
        continuationMarkerPositions.set(
          end.map((value) => Number(value.toFixed(9))).join(","),
          end,
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
      ]);
      const line = new THREE.Line(geometry, miniatureNeighborLineMaterial);
      line.userData.kind = edge.periodicContinuation
        ? "repeat-cell-periodic-neighbor"
        : "repeat-cell-neighbor";
      line.userData.startPosition = Object.freeze(start);
      line.userData.endPosition = Object.freeze(end);
      line.userData.startHasSphere =
        !contextAsMarkers || !edge.startContinuation;
      line.userData.endHasSphere =
        !contextAsMarkers || !edge.endContinuation;
      line.userData.edgeIdentity = edge.id;
      line.userData.fromSiteId = edge.fromSiteId;
      line.userData.toSiteId = edge.toSiteId;
      line.userData.disposeGeometry = true;
      miniatureRoot.add(line);
    });
    if (continuationMarkerPositions.size > 0) {
      const markerGeometry = new THREE.BufferGeometry().setFromPoints(
        [...continuationMarkerPositions.values()].map(
          (position) => new THREE.Vector3(...position),
        ),
      );
      const markers = new THREE.Points(
        markerGeometry,
        continuationMarkerMaterial,
      );
      markers.userData.kind = "repeat-cell-continuation-markers";
      markers.userData.disposeGeometry = true;
      miniatureRoot.add(markers);
    }

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
        if (object.isLine) {
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
      String(visibleSites.filter((site) => site.continuation).length);
    dom.miniatureCanvas.dataset.continuationMarkerCount =
      String(continuationMarkerPositions.size);
    dom.miniatureCanvas.dataset.deformationAxis = compressionAxis;
    dom.miniatureCanvas.dataset.deformationFactor =
      compressionFactor.toFixed(6);
    dom.miniatureCanvas.dataset.referenceDisplayScale =
      miniatureRoot.scale.x.toFixed(9);
  }

  function rebuildCaseScene() {
    removeCaseSceneObjects();
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

    const repeatCellDisplayGraph = createRepeatCellDisplayGraph(caseRecord, {
      compressionAxis,
      compressionFactor,
    });
    rebuildMiniatureNetwork(repeatCellDisplayGraph);

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
    rebuildRepeatCellHighlight(repeatCellDisplayGraph);
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
    cameraViewHalfHeight = DEFAULT_VIEW_HALF_HEIGHT;
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

  function listen(target, type, handler, eventOptions) {
    target.addEventListener(type, handler, eventOptions);
    listeners.push(() => target.removeEventListener?.(type, handler, eventOptions));
  }

  function bindEvents() {
    listen(dom.caseSelect, "change", () => selectCase(dom.caseSelect.value));
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
    if (LATTICE_LAB_UI_FEATURES.primerCollapse) {
      listen(dom.primerToggle, "click", () => {
        dom.primer.dataset.primerCollapsed =
          dom.primer.dataset.primerCollapsed === "true" ? "false" : "true";
        updatePrimerCollapsePresentation();
      });
    }
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

  function updatePrimerCollapsePresentation() {
    const enabled = LATTICE_LAB_UI_FEATURES.primerCollapse;
    const collapsed = enabled &&
      dom.primer.dataset.primerCollapsed === "true";
    dom.primer.dataset.collapseEnabled = String(enabled);
    dom.primer.dataset.primerCollapsed = String(collapsed);
    dom.primerToggle.hidden = !enabled;
    dom.primerToggle.setAttribute("aria-expanded", String(!collapsed));
    dom.primerToggle.setAttribute(
      "aria-label",
      collapsed ? "Expand Lattice Primer" : "Collapse Lattice Primer",
    );
  }

  function activePeriodicCertificatePassed() {
    const reference = isReferenceLatticeConfiguration(
      caseRecord,
      polarityBySiteId,
    );
    return caseRecord.id === LATTICE_LAB_CASE_ID && reference && [
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
        ? "maximum supported nondegenerate deformation"
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
        "β = 0 is the undeformed baseline; β = 1 is the maximum supported " +
        "nondegenerate deformation. " +
        "The periodically tiled stationary checkerboard passes the exact " +
        "receiver-centered inversion-pair check for both polarity receiver " +
        "classes: net acceleration contribution is zero at every site.";
    } else if (caseRecord.id === LATTICE_LAB_CASE_ID) {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum supported " +
        "nondegenerate deformation. " +
        "The reference tiled-pattern certificate is unavailable in this " +
        "modified polarity state; no all-site zero result is shown.";
    } else {
      dom.compressionStatus.textContent =
        `β = ${deformationBeta.toFixed(2)} sets the static X-axis scale to ` +
        `${Number(compressionFactor.toFixed(6))}. ` +
        "β = 0 is the undeformed baseline; β = 1 is the maximum supported " +
        "nondegenerate deformation. " +
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
    rootGroup.quaternion.set(...createDefaultOrientationQuaternion());
    rebuildCaseScene();
    updateCompressionPresentation();
    updateCaseRecordPresentation();
    updatePolarityMaterials();
    updateConfigurationPresentation();
    updateSelectedPresentation();
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
      mesh.material = siteId === selectedSiteId
        ? (positrino ? selectedRedMaterial : selectedBlueMaterial)
        : (positrino ? redMaterial : blueMaterial);
    });
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
      `${caseRecord.geometryLabel}; ${caseRecord.polarityRule}` +
      (compressed
        ? `; static ${compressionAxis.toUpperCase()} deformation at β = ${deformationBeta} (scale ${compressionFactor})`
        : "");
    dom.caseNearest.textContent = compressed
      ? summarizeTransformedDistances("nearest")
      : `${caseRecord.nearestShell.count} at distance ${caseRecord.nearestShell.distance}`;
    dom.caseNext.textContent = compressed
      ? summarizeTransformedDistances("next-local")
      : `${caseRecord.nextLocalShell.count} at distance ${caseRecord.nextLocalShell.distance}`;
    dom.caseLocalTotal.textContent =
      `${caseRecord.selectedLocalTotal} declared geometry neighbors`;
    dom.caseDensity.textContent = caseRecord.geometricSiteDensity;
    dom.caseBoundary.textContent = caseRecord.boundaryTreatment;
    dom.caseScope.textContent = caseRecord.calculationBoundaryTreatment +
      (compressed && caseRecord.id === LATTICE_LAB_CASE_ID
        ? `; the inversion-pair certificate remains exact for this static β = ${deformationBeta} deformation (X-axis scale ${compressionFactor})`
        : compressed
          ? `; static X-axis display deformation at β = ${deformationBeta} (scale ${compressionFactor}); no per-case periodic cancellation certificate is supplied`
        : "");
    dom.primerTitle.textContent = caseRecord.primerTitle;
    dom.primerBody.textContent = "";
    caseRecord.primerParagraphs.forEach((paragraph) => {
      const element = documentLike.createElement("p");
      element.textContent = paragraph;
      dom.primerBody.append(element);
    });
    dom.canvas.setAttribute(
      "aria-label",
      `Rotatable three-dimensional ${caseRecord.title} lattice`,
    );
  }

  function updateConfigurationPresentation() {
    [
      [dom.repeatVectorA, "a", transformDisplayPosition(caseRecord.repeatCell.vectors[0])],
      [dom.repeatVectorB, "b", transformDisplayPosition(caseRecord.repeatCell.vectors[1])],
      [dom.repeatVectorC, "c", transformDisplayPosition(caseRecord.repeatCell.vectors[2])],
    ].forEach(([element, label, vector]) => {
      element.textContent = formatTranslationVector(label, vector);
    });
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
    if (ledger.certificateApplies && !siteSelectionExplicit) {
      dom.whatSeeing.textContent =
        "Every site has six nearest neighbors of the opposite polarity. " +
        "The next local shell has twelve sites of the same polarity. " +
        "Each local shell has zero stationary acceleration sum; the separate " +
        "all-shell result applies to every site at release. Stability and " +
        "evolution are untested.";
    } else if (ledger.certificateApplies) {
      dom.whatSeeing.textContent =
        `The selected ${receiverPolarity} has ` +
        `${summarizeShellPolarities(nearestShell)} at ${nearestShell.distance} ` +
        `and ${summarizeShellPolarities(nextLocalShell)} at ` +
        `${nextLocalShell.distance}. Each displayed local shell has zero ` +
        `stationary acceleration sum. Those are illustrative partial sums; ` +
        `the separate all-shell inversion certificate gives exact zero initial ` +
        `acceleration at every site` +
        (compressionFactor < 1
          ? ` under this static ${compressionAxis.toUpperCase()}-axis β = ${deformationBeta} deformation (scale ${compressionFactor})`
          : "") +
        `. Stability and evolution are untested.`;
    } else if (caseRecord.accelerationCertificate) {
      dom.whatSeeing.textContent =
        `The selected ${receiverPolarity} is in a ` +
        `modified polarity configuration. The local rows below are a finite ` +
        `diagnostic; the reference acceleration certificate does not apply.`;
    } else {
      dom.whatSeeing.textContent =
        `${caseRecord.title} shows ${caseRecord.polarityRule}. The selected ` +
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
    const miniatureViewportHeight = Math.max(
      1,
      dom.miniatureCanvas.getBoundingClientRect().height,
    );
    const miniatureWorldRadius =
      MARKER_RADIUS_PX *
      (2 * miniatureCamera.top / miniatureViewportHeight);
    const miniatureLocalRadius =
      miniatureWorldRadius / Math.max(1e-7, miniatureRoot.scale.x);
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
      mainEndpointAggregation.collapsedGroups.forEach((group) => {
        const aggregate = new THREE.Mesh(
          sphereGeometry,
          endpointAggregateMaterial,
        );
        aggregate.position.fromArray(group.position);
        aggregate.scale.setScalar(markerWorldRadius);
        aggregate.userData.kind = "endpoint-collapsed-site-group";
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
      miniatureEndpointAggregation.collapsedGroups.forEach((group) => {
        const aggregate = new THREE.Mesh(
          sphereGeometry,
          endpointAggregateMaterial,
        );
        aggregate.position.fromArray(group.position);
        aggregate.scale.setScalar(miniatureLocalRadius);
        aggregate.userData.kind = "repeat-cell-endpoint-collapsed-site-group";
        aggregate.userData.memberSiteIds = group.memberIds;
        miniatureEndpointAggregateGroup.add(aggregate);
      });
    }

    siteMeshes.forEach((mesh, siteId) => {
      mesh.scale.setScalar(markerWorldRadius);
      mesh.visible = !mainEndpointAggregation?.groupBySiteId.get(siteId)?.collapsed;
    });
    const mainEndpointExternalById = new Map(
      mainEndpointAggregation?.externalEdges.map((edge) => [edge.id, edge]) ?? [],
    );
    const selectedMainEdgeIdentities = new Set(
      repeatHighlightGroup.userData.mainEdgeIdentities ?? [],
    );
    const clippedMainEdgeIdentities = [];
    const suppressedMainEdgeIdentities = [];
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
        selectedMainEdgeIdentities.has(mainEdgeIdentity)
      ) {
        line.visible = false;
        suppressedMainEdgeIdentities.push(mainEdgeIdentity);
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
    dom.canvas.dataset.endpointAggregateGroupCount = String(
      mainEndpointAggregation?.collapsedGroups.length ?? 0,
    );
    dom.canvas.dataset.endpointAggregateSiteCount = String(
      mainEndpointAggregation?.collapsedGroups.reduce(
        (count, group) => count + group.memberIds.length,
        0,
      ) ?? 0,
    );
    dom.canvas.dataset.endpointInternalEdgeCount =
      String(collapsedInternalMainEdgeIdentities.length);
    dom.canvas.dataset.endpointRedundantExternalEdgeCount =
      String(redundantEndpointMainEdgeIdentities.length);
    miniatureRoot.children
      .filter((object) =>
        object.userData.kind === "repeat-cell-site" ||
        object.userData.kind === "repeat-cell-periodic-continuation"
      )
      .forEach((mesh) => {
        mesh.scale.setScalar(miniatureLocalRadius);
        mesh.visible = !miniatureEndpointAggregation?.groupBySiteId
          .get(mesh.userData.siteId)?.collapsed;
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
          ? miniatureLocalRadius
          : 0;
        const endRadius = line.userData.endHasSphere
          ? miniatureLocalRadius
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
      miniatureEndpointAggregation?.collapsedGroups.length ?? 0,
    );
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
          const [fromSiteId, toSiteId] =
            highlight.userData.mainEdgeIdentity.split("|");
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
    updateFixedMarkerSizes();
    render();
  }

  function render() {
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
    selectedRedMaterial.dispose();
    selectedBlueMaterial.dispose();
    neighborLineMaterial.dispose();
    miniatureNeighborLineMaterial.dispose();
    continuationMarkerMaterial.dispose();
    highlightedNeighborMaterial.dispose();
    renderer.dispose();
    miniatureRenderer.dispose();
  }
}
