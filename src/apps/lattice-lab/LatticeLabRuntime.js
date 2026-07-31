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

const ELECTRINO_COLOR = 0x0000ff;
const POSITRINO_COLOR = 0xff0000;
const GEOMETRY_LINE_COLOR = 0xc6b6ff;
const DEFAULT_VIEW_HALF_HEIGHT = 4.4;
const MIN_VIEW_HALF_HEIGHT = 1.35;
const MAX_VIEW_HALF_HEIGHT = 8.5;
const CAMERA_DISTANCE = 12;
const MARKER_RADIUS_PX = 8;
const POINTER_CLICK_TRAVEL_PX = 7;
const DEFAULT_ROTATION = Object.freeze([-0.44, 0.66, 0]);

export const LATTICE_LAB_UI_FEATURES = Object.freeze({
  primerCollapse: false,
});

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

function formatVector(vector) {
  if (!vector) {
    return "not shown";
  }
  return `⟨${vector.map((value) => value === 0 ? "0" : value > 0 ? `+${value}` : String(value)).join(", ")}⟩`;
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

function formatGridLabel(grid) {
  return grid ? `(${grid.join(", ")})` : "unavailable";
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

function formatNormalizedAcceleration(accelerationRow) {
  if (!accelerationRow) {
    return "unavailable";
  }
  const squared = accelerationRow.separationSquared;
  const squareRoot = Math.sqrt(squared);
  const denominator = Number.isInteger(squareRoot)
    ? String(squared * squareRoot)
    : `${squared}√${squared}`;
  return `a₀·⟨${accelerationRow.accelerationNumerator.map((numerator) => {
    if (numerator === 0) {
      return "0";
    }
    const sign = numerator > 0 ? "+" : "−";
    const magnitude = Math.abs(numerator);
    if (denominator === "1") {
      return `${sign}${magnitude}`;
    }
    return `${sign}${magnitude === 1 ? "1" : magnitude}/(${denominator})`;
  }).join(", ")}⟩`;
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

function createDottedDisplayEnvelope(radius) {
  const points = [];
  const latitudeCount = 19;
  const longitudeCount = 42;
  for (let latitudeIndex = 0; latitudeIndex < latitudeCount; latitudeIndex += 1) {
    const theta = (latitudeIndex / (latitudeCount - 1)) * Math.PI;
    const y = Math.cos(theta) * radius;
    const ringRadius = Math.sin(theta) * radius;
    for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex += 1) {
      const phi = (longitudeIndex / longitudeCount) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(phi) * ringRadius,
        y,
        Math.sin(phi) * ringRadius,
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

export function selectShortestTransformedRelationships(
  relationships,
  { compressionAxis = "x", compressionFactor = 1 } = {},
) {
  const axisIndex = ["x", "y", "z"].indexOf(compressionAxis);
  if (
    axisIndex < 0 ||
    !Number.isFinite(compressionFactor) ||
    compressionFactor <= 0 ||
    compressionFactor > 1
  ) {
    throw new Error("Invalid transformed-relationship selector.");
  }
  const rows = relationships.map((relationship) => {
    const transform = (position) => position.map(
      (value, index) => index === axisIndex
        ? value * compressionFactor
        : value,
    );
    const start = transform(relationship.fromPosition);
    const end = transform(relationship.toPosition);
    return Object.freeze({
      relationship,
      transformedDistance: Math.hypot(...end.map(
        (value, index) => value - start[index],
      )),
    });
  });
  const nearestDistance = Math.min(...rows.map(
    (row) => row.transformedDistance,
  ));
  return Object.freeze({
    nearestDistance,
    selected: Object.freeze(rows.filter((row) =>
      Math.abs(row.transformedDistance - nearestDistance) < 1e-7
    )),
    excluded: Object.freeze(rows.filter((row) =>
      Math.abs(row.transformedDistance - nearestDistance) >= 1e-7
    )),
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
    compressionFactor: queryRequiredElement(documentLike, "#lattice-lab-compression-factor"),
    compressionValue: queryRequiredElement(documentLike, "#lattice-lab-compression-value"),
    compressionStatus: queryRequiredElement(documentLike, "#lattice-lab-compression-status"),
    configurationState: queryRequiredElement(documentLike, "#lattice-lab-configuration-state"),
    population: queryRequiredElement(documentLike, "#lattice-lab-population"),
    whatSeeing: queryRequiredElement(documentLike, "#lattice-lab-what-seeing"),
    ledgerResult: queryRequiredElement(documentLike, "#lattice-lab-ledger-result"),
    ledgerState: queryRequiredElement(documentLike, "#lattice-lab-ledger-state"),
    ledgerMagnitude: queryRequiredElement(documentLike, "#lattice-lab-ledger-magnitude"),
    ledgerVector: queryRequiredElement(documentLike, "#lattice-lab-ledger-vector"),
    ledgerResultScope: queryRequiredElement(documentLike, "#lattice-lab-ledger-result-scope"),
    ledgerShells: queryRequiredElement(documentLike, "#lattice-lab-ledger-shells"),
    ledgerResidual: queryRequiredElement(documentLike, "#lattice-lab-ledger-residual"),
    ledgerTitle: queryRequiredElement(documentLike, "#lattice-lab-ledger-title"),
    inspectorStack: queryRequiredElement(documentLike, ".lattice-lab-inspector-stack"),
    miniatureKind: queryRequiredElement(documentLike, "#lattice-lab-miniature-kind"),
    miniatureState: queryRequiredElement(documentLike, "#lattice-lab-miniature-state"),
    repeatHighlight: queryRequiredElement(documentLike, "#lattice-lab-repeat-highlight"),
    repeatHighlightState: queryRequiredElement(documentLike, "#lattice-lab-repeat-highlight-state"),
    repeatVectorA: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-a"),
    repeatVectorB: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-b"),
    repeatVectorC: queryRequiredElement(documentLike, "#lattice-lab-repeat-vector-c"),
    primer: queryRequiredElement(documentLike, "#lattice-lab-primer"),
    primerToggle: queryRequiredElement(documentLike, "#lattice-lab-primer-toggle"),
    primerTitle: queryRequiredElement(documentLike, "#lattice-lab-primer-title"),
    primerBody: queryRequiredElement(documentLike, "#lattice-lab-primer-body"),
    tripod: queryRequiredElement(documentLike, "#lattice-lab-tripod"),
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
  let compressionFactor = 1;
  let repeatCellHighlighted = false;
  let dragging = false;
  let dragSource = null;
  let pointerId = null;
  let pointerLastX = 0;
  let pointerLastY = 0;
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
  const guideGroup = new THREE.Group();
  rootGroup.add(guideGroup, lineGroup, repeatHighlightGroup, siteGroup);
  scene.add(rootGroup);

  const miniatureRoot = new THREE.Group();
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
  const highlightedNeighborMaterial = new THREE.MeshBasicMaterial({
    color: GEOMETRY_LINE_COLOR,
    transparent: true,
    opacity: 0.64,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const continuationRedMaterial = redMaterial.clone();
  continuationRedMaterial.transparent = true;
  continuationRedMaterial.opacity = 0.3;
  continuationRedMaterial.depthWrite = false;
  continuationRedMaterial.wireframe = true;
  const continuationBlueMaterial = blueMaterial.clone();
  continuationBlueMaterial.transparent = true;
  continuationBlueMaterial.opacity = 0.3;
  continuationBlueMaterial.depthWrite = false;
  continuationBlueMaterial.wireframe = true;

  const siteMeshes = new Map();
  let edgeLines = [];
  populateCaseSelector();
  rebuildCaseScene();
  rootGroup.rotation.set(...DEFAULT_ROTATION);

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
    const axisIndex = ["x", "y", "z"].indexOf(compressionAxis);
    return position.map((value, index) =>
      index === axisIndex ? value * compressionFactor : value
    );
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

  function rebuildRepeatCellHighlight() {
    const ownedSites = findCentralRepeatOwnedSites();
    if (ownedSites.length !== caseRecord.repeatCell.sites.length) {
      throw new Error(
        `${caseRecord.title} has no visible central repeat-cell representative.`,
      );
    }
    const offset = ownedSites[0].position.map(
      (value, index) => value - caseRecord.repeatCell.sites[0].position[index],
    );
    const repeatNetwork = createRepeatCellNearestNeighborNetwork(caseRecord);

    const displayedPositionKeys = new Set(caseRecord.sites.map((site) =>
      site.position.map((value) => Number(value.toFixed(9))).join(",")
    ));
    const transformedSelection = selectShortestTransformedRelationships(
      repeatNetwork.relationships,
      { compressionAxis, compressionFactor },
    );
    const relationshipRows = transformedSelection.selected.map(
      ({ relationship, transformedDistance }) => {
        const startPosition = relationship.fromPosition.map(
          (value, index) => value + offset[index],
        );
        const endPosition = relationship.toPosition.map(
          (value, index) => value + offset[index],
        );
        return {
          relationship,
          startPosition,
          endPosition,
          transformedDistance,
        };
      },
    );
    const nearestDisplayedDistance = transformedSelection.nearestDistance;
    const highlightedRelationships = relationshipRows;
    highlightedRelationships.forEach((row) => {
      const { relationship, startPosition, endPosition } = row;
      const startKey = startPosition
        .map((value) => Number(value.toFixed(9))).join(",");
      const endKey = endPosition
        .map((value) => Number(value.toFixed(9))).join(",");
      if (
        !displayedPositionKeys.has(startKey) ||
        !displayedPositionKeys.has(endKey)
      ) {
        throw new Error(
          `${caseRecord.title} central highlight is missing a displayed ` +
          "periodic-image endpoint.",
        );
      }
      const highlight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 1, 10),
        highlightedNeighborMaterial,
      );
      highlight.visible = repeatCellHighlighted;
      highlight.userData.kind = "repeat-cell-highlight-neighbor";
      highlight.userData.startPosition = Object.freeze(startPosition);
      highlight.userData.endPosition = Object.freeze(endPosition);
      highlight.userData.relationship = relationship;
      highlight.userData.disposeGeometry = true;
      highlight.renderOrder = 3;
      repeatHighlightGroup.add(highlight);
    });
    repeatHighlightGroup.userData.ownedSiteIds = Object.freeze(
      ownedSites.map((site) => site.id),
    );
    repeatHighlightGroup.userData.incidenceCount =
      repeatHighlightGroup.children.filter(
        (object) =>
          object.userData.kind === "repeat-cell-highlight-neighbor",
      ).length;
    const highlightedEdgeKeys = new Set(highlightedRelationships.map((row) =>
      [row.startPosition, row.endPosition]
        .map((position) =>
          position.map((value) => Number(value.toFixed(9))).join(",")
        )
        .sort()
        .join("|")
    ));
    repeatHighlightGroup.userData.uniqueLinkCount =
      highlightedEdgeKeys.size;
    dom.canvas.dataset.repeatHighlightIncidenceCount =
      String(repeatHighlightGroup.userData.incidenceCount);
    dom.canvas.dataset.repeatHighlightLinkCount =
      String(repeatHighlightGroup.userData.uniqueLinkCount);
    dom.canvas.dataset.repeatHighlightExcludedIncidenceCount =
      String(transformedSelection.excluded.length);
    dom.repeatHighlightState.textContent = compressionFactor < 1
      ? `Compressed distance scope: ${highlightedRelationships.length} ` +
        `current nearest incidences at ${Number(nearestDisplayedDistance.toFixed(3))}d; ` +
        `${transformedSelection.excluded.length} longer ` +
        "deformed reference incidences are not highlighted."
      : `${highlightedRelationships.length} nearest-neighbor incidences at d · ` +
        `${highlightedEdgeKeys.size} unique links.`;
    lineGroup.visible = !repeatCellHighlighted;
  }

  function rebuildMiniatureNetwork() {
    const network = createRepeatCellNearestNeighborNetwork(caseRecord);
    const rawPositions = [];
    const miniatureSiteRows = [
      ...caseRecord.repeatCell.sites.map((site) => ({
        ...site,
        continuation: false,
      })),
      ...network.continuationSites.map((site) => ({
        ...site,
        continuation: true,
      })),
    ];
    miniatureSiteRows.forEach((site) => {
      const position = transformDisplayPosition(site.position);
      rawPositions.push(position);
      const material = site.continuation
        ? site.polarity === LATTICE_LAB_POLARITY.POSITRINO
          ? continuationRedMaterial
          : continuationBlueMaterial
        : site.polarity === LATTICE_LAB_POLARITY.POSITRINO
          ? redMaterial
          : blueMaterial;
      const miniatureMesh = new THREE.Mesh(sphereGeometry, material);
      miniatureMesh.position.fromArray(position);
      miniatureMesh.scale.setScalar(site.continuation ? 0.075 : 0.13);
      miniatureMesh.userData.kind = site.continuation
        ? "repeat-cell-periodic-continuation"
        : "repeat-cell-site";
      miniatureRoot.add(miniatureMesh);
    });

    network.edges.forEach((edge) => {
      const start = transformDisplayPosition(edge.start);
      const end = transformDisplayPosition(edge.end);
      rawPositions.push(start, end);
      const distance = Math.hypot(...end.map(
        (value, index) => value - start[index],
      ));
      if (distance <= 0.26) {
        return;
      }
      const segment = createClippedNeighborSegment(start, end, 0.13);
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...segment.start),
        new THREE.Vector3(...segment.end),
      ]);
      const line = new THREE.Line(geometry, miniatureNeighborLineMaterial);
      line.userData.kind = edge.periodicContinuation
        ? "repeat-cell-periodic-neighbor"
        : "repeat-cell-neighbor";
      line.userData.disposeGeometry = true;
      miniatureRoot.add(line);
    });

    const bounds = rawPositions.reduce(
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
    const center = bounds.minimum.map(
      (value, index) => (value + bounds.maximum[index]) / 2,
    );
    miniatureRoot.children.forEach((object) => {
      object.position.sub(new THREE.Vector3(...center));
      if (object.isLine) {
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
        object.position.set(0, 0, 0);
      }
    });
    const repeatRadius = Math.max(
      0.1,
      ...rawPositions.map((position) => Math.hypot(...position.map(
        (value, index) => value - center[index],
      ))),
    );
    miniatureRoot.scale.setScalar(1.95 / repeatRadius);
    miniatureRoot.userData.relationshipCount = network.relationshipCount;
    miniatureRoot.userData.expectedRelationshipCount =
      network.expectedRelationshipCount;
    dom.miniatureCanvas.dataset.relationshipCount =
      String(network.relationshipCount);
    dom.miniatureCanvas.dataset.periodicContinuationCount =
      String(network.continuationSites.length);
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

    rebuildMiniatureNetwork();

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
    rebuildRepeatCellHighlight();
    guideGroup.add(createDottedDisplayEnvelope(caseRecord.displayRadius));
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
    compressionFactor = 1;
    cameraViewHalfHeight = DEFAULT_VIEW_HALF_HEIGHT;
    rootGroup.position.set(0, 0, 0);
    rootGroup.rotation.set(...DEFAULT_ROTATION);
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
          object.visible = repeatCellHighlighted;
        }
      });
      lineGroup.visible = !repeatCellHighlighted;
      updateFixedMarkerSizes();
      render();
    });
    listen(dom.compressionFactor, "input", applyCompressionControls);
    listen(dom.compressionFactor, "change", applyCompressionControls);
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

  function updateCompressionPresentation(message = "") {
    const available = compressionAvailable();
    dom.compressionCard.dataset.available = String(available);
    dom.compressionFactor.disabled = !available;
    dom.compressionFactor.value = String(compressionFactor);
    dom.compressionValue.value = `λ = ${compressionFactor.toFixed(2)}`;
    dom.compressionValue.textContent = dom.compressionValue.value;
    const reference = isReferenceLatticeConfiguration(
      caseRecord,
      polarityBySiteId,
    );
    const certificatePassed =
      caseRecord.id === LATTICE_LAB_CASE_ID && reference && [
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
    dom.compressionCard.dataset.certificatePassed =
      String(certificatePassed);
    if (message) {
      dom.compressionStatus.textContent = message;
    } else if (certificatePassed) {
      dom.compressionStatus.textContent =
        `Fixed X-axis map at λ = ${Number(compressionFactor.toFixed(6))}. ` +
        "The periodically tiled stationary checkerboard passes the exact " +
        "receiver-centered inversion-pair check for both polarity receiver " +
        "classes: net acceleration contribution is zero at every site.";
    } else if (caseRecord.id === LATTICE_LAB_CASE_ID) {
      dom.compressionStatus.textContent =
        `Fixed X-axis map at λ = ${Number(compressionFactor.toFixed(6))}. ` +
        "The reference tiled-pattern certificate is unavailable in this " +
        "modified polarity state; no all-site zero result is shown.";
    } else {
      dom.compressionStatus.textContent =
        `Fixed X-axis map at λ = ${Number(compressionFactor.toFixed(6))}. ` +
        "Static transformed geometry only. No independent per-case periodic " +
        "cancellation check is attached, so no zero result is shown.";
    }
  }

  function applyCompressionControls() {
    if (!compressionAvailable()) {
      updateCompressionPresentation();
      return false;
    }
    const nextFactor = Number(dom.compressionFactor.value);
    if (
      !Number.isFinite(nextFactor) ||
      !(nextFactor > 0) ||
      nextFactor > 1
    ) {
      updateCompressionPresentation(
        "Enter a compression factor greater than 0 and no greater than 1.",
      );
      return false;
    }
    compressionFactor = nextFactor;
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
    compressionFactor = 1;
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
        ? `; static ${compressionAxis.toUpperCase()} coordinates scaled by λ = ${compressionFactor}`
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
        ? `; the inversion-pair certificate remains exact for this static λ = ${compressionFactor} transform`
        : compressed
          ? `; static X-axis display transform at λ = ${compressionFactor}; no per-case periodic cancellation certificate is supplied`
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
    dom.configurationState.textContent = "reference configuration";
    dom.configurationState.dataset.state = "reference";
    dom.population.textContent =
      "Each curated geometry has equal numbers of electrinos and positrinos.";
    dom.miniatureKind.textContent = "Polarity Repeat Cell";
    dom.miniatureState.textContent =
      "Copy this colored tile by translation to continue the pattern.";
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
    const configurationState = isReferenceLatticeConfiguration(
      caseRecord,
      polarityBySiteId,
    ) ? "reference configuration" : "modified configuration";
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
          ? ` under this static ${compressionAxis.toUpperCase()}-axis λ = ${compressionFactor} map`
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
        `${nextLocalShell.distance} in the uncompressed reference geometry. ` +
        (compressionFactor < 1
          ? `The display applies a static X-axis λ = ${compressionFactor} transform. `
          : "") +
        `This is a static geometry/reference case, ` +
        `not an acceleration, all-lattice cancellation, stability, or evolution result.`;
    }
    dom.ledgerTitle.textContent = "Selected-Site Ledger";
    dom.ledgerState.textContent = ledger.certificateApplies
      ? "✓ Zero in certified scope"
      : "○ Not established";
    dom.ledgerState.dataset.certified = String(ledger.certificateApplies);
    dom.ledgerResult.dataset.outcome = ledger.certificateApplies
      ? "zero"
      : "unavailable";
    dom.ledgerMagnitude.textContent = ledger.certificateApplies
      ? "Relative magnitude: 0"
      : "Relative magnitude: not established";
    dom.ledgerVector.textContent = ledger.certificateApplies
      ? "Vector: ⟨0, 0, 0⟩ a₀"
      : "Vector: not established";
    dom.ledgerResultScope.textContent = ledger.certificateApplies
      ? "In this ideal repeating pattern, matching pulls cancel at every site at release."
      : "Acceleration is not established for this static geometry case.";
    dom.ledgerShells.textContent = "";
    ledger.shells.forEach((shell) => {
      const shellSection = documentLike.createElement("section");
      shellSection.className = "lattice-lab-ledger-shell";

      const shellHeading = documentLike.createElement("header");
      const shellTitle = documentLike.createElement("div");
      const shellName = documentLike.createElement("strong");
      shellName.textContent = shell.label;
      const shellMeta = documentLike.createElement("small");
      shellMeta.textContent =
        `${summarizeShellPolarities(shell)} · distance ${shell.distance}`;
      shellTitle.append(shellName, shellMeta);

      const shellStatus = documentLike.createElement("span");
      shellStatus.className = "lattice-lab-shell-status";
      shellStatus.dataset.cancelled = String(Boolean(
        shell.normalizedAccelerationResidual &&
        shell.cancellingAccelerationPairs === shell.pairs.length,
      ));
      shellStatus.textContent = shell.normalizedAccelerationResidual
        ? `${shell.visibleCount} neighbors → ` +
          (
            shell.normalizedAccelerationResidual.every((value) => value === 0)
              ? "zero shell residual"
              : `residual ${formatVector(shell.normalizedAccelerationResidual)} a₀`
          )
        : `${shell.visibleCount} neighbors → acceleration not established`;
      shellHeading.append(shellTitle, shellStatus);
      shellSection.append(shellHeading);

      const shellDetails = documentLike.createElement("details");
      shellDetails.className = "lattice-lab-shell-details";
      const shellDetailsSummary = documentLike.createElement("summary");
      const shellDetailsBody = documentLike.createElement("div");
      if (shell.rows.every((row) => row.accelerationRow)) {
        shellDetailsSummary.textContent = "Show calculation";
        shell.pairs.forEach((pair) => {
          const pairRow = documentLike.createElement("div");
          pairRow.className = "lattice-lab-ledger-pair";
          pairRow.dataset.cancelled = String(pair.accelerationCancelsExactly);

          const pairHeading = documentLike.createElement("div");
          const pairName = documentLike.createElement("strong");
          pairName.textContent = pair.label;
          const pairPolarity = documentLike.createElement("span");
          pairPolarity.className = "lattice-lab-polarity-pair";
          if (pair.equalPolarity) {
            pairPolarity.dataset.polarity = pair.positions[0].polarity;
          }
          pairPolarity.textContent = pair.positions.map(
            (position) => formatPolarityLabel(position.polarity),
          ).join(" + ");
          pairHeading.append(pairName, pairPolarity);

          const pairPositions = documentLike.createElement("small");
          pairPositions.textContent = pair.positions.map(
            (position) => position.neighborLabel,
          ).join(" ↔ ");

          const pairContribution = documentLike.createElement("code");
          pairContribution.textContent =
            pair.availability === "resolved-antipodal-pair"
              ? `${formatNormalizedAcceleration(pair.positions[0].accelerationRow)} + ${formatNormalizedAcceleration(pair.positions[1].accelerationRow)} = a₀·${formatVector(pair.normalizedAccelerationResidual)}`
              : "Displayed contribution unavailable: continuation not shown";
          pairRow.append(pairHeading, pairPositions, pairContribution);
          shellDetailsBody.append(pairRow);
        });
      } else {
        shellDetailsSummary.textContent = "Show calculation";
        const rowList = documentLike.createElement("div");
        rowList.className = "lattice-lab-geometry-rows";
        shell.rows.forEach((row) => {
          const rowElement = documentLike.createElement("div");
          const polarity = documentLike.createElement("span");
          polarity.className = "lattice-lab-polarity-pair";
          polarity.dataset.polarity = row.polarity ?? "";
          polarity.textContent = formatPolarityLabel(row.polarity);
          const direction = documentLike.createElement("code");
          direction.textContent = row.unitDirection
            ? formatVector(row.unitDirection.map((value) =>
              Math.abs(value) < 1e-10 ? 0 : Number(value.toFixed(3))
            ))
            : "direction unavailable";
          rowElement.append(polarity, direction);
          rowList.append(rowElement);
        });
        shellDetailsBody.append(rowList);
      }
      shellDetails.append(shellDetailsSummary, shellDetailsBody);
      shellSection.append(shellDetails);
      dom.ledgerShells.append(shellSection);
    });
    dom.ledgerResidual.textContent = "";

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
    rootGroup.rotation.y += deltaX * 0.007;
    rootGroup.rotation.x = clamp(
      rootGroup.rotation.x + deltaY * 0.005,
      -1.25,
      1.1,
    );
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
    markerWorldRadius = Math.min(
      0.32,
      MARKER_RADIUS_PX * (2 * cameraViewHalfHeight / viewportHeight),
    );
    siteMeshes.forEach((mesh) => mesh.scale.setScalar(markerWorldRadius));
    edgeLines.forEach((line) => {
      const edge = line.userData.edge;
      const startSite = getLatticeSite(caseRecord, edge.fromSiteId);
      const endSite = getLatticeSite(caseRecord, edge.toSiteId);
      const start = transformDisplayPosition(startSite.position);
      const end = transformDisplayPosition(endSite.position);
      const distance = Math.hypot(...end.map(
        (value, index) => value - start[index],
      ));
      if (distance <= 2 * markerWorldRadius) {
        line.visible = false;
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
    });
    repeatHighlightGroup.children
      .filter((object) =>
        object.userData.kind === "repeat-cell-highlight-neighbor"
      )
      .forEach((highlight) => {
        const segment = createClippedNeighborSegment(
          transformDisplayPosition(highlight.userData.startPosition),
          transformDisplayPosition(highlight.userData.endPosition),
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
      });
  }

  function updateTripod() {
    const origin = { x: 31, y: 31 };
    const axes = [
      ["x", new THREE.Vector3(1, 0, 0)],
      ["y", new THREE.Vector3(0, 1, 0)],
      ["z", new THREE.Vector3(0, 0, 1)],
    ];
    axes.forEach(([axis, vector]) => {
      vector.applyQuaternion(rootGroup.quaternion);
      const endpoint = {
        x: origin.x + vector.x * 21,
        y: origin.y - vector.y * 21,
      };
      const line = dom.tripod.querySelector(`[data-axis-line="${axis}"]`);
      const label = dom.tripod.querySelector(`[data-axis-label="${axis}"]`);
      line?.setAttribute("x2", endpoint.x.toFixed(2));
      line?.setAttribute("y2", endpoint.y.toFixed(2));
      label?.setAttribute("x", (endpoint.x + 3).toFixed(2));
      label?.setAttribute("y", (endpoint.y + 3).toFixed(2));
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
    highlightedNeighborMaterial.dispose();
    continuationRedMaterial.dispose();
    continuationBlueMaterial.dispose();
    renderer.dispose();
    miniatureRenderer.dispose();
  }
}
