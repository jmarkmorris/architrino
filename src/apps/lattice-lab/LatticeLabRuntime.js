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
  LATTICE_LAB_DEFAULT_SITE_ID,
  LATTICE_LAB_DISPLAY_RADIUS,
  LATTICE_LAB_POLARITY,
  countLatticePolarities,
  createClippedNeighborSegment,
  createReferencePolarityState,
  createSelectedSiteLedger,
  createSimpleCubicCheckerboardCase,
  createSimpleCubicPolarityRepeatCellSites,
  getLatticeSite,
  isReferenceLatticeConfiguration,
  swapOppositeLatticePolarities,
} from "./LatticeLabCase.js";

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

export const LATTICE_LAB_NAMED_VIEWS = Object.freeze({
  reset: Object.freeze({
    rotation: DEFAULT_ROTATION,
    viewHalfHeight: DEFAULT_VIEW_HALF_HEIGHT,
    focusSelected: false,
  }),
  cell: Object.freeze({
    rotation: Object.freeze([-0.52, 0.72, 0]),
    viewHalfHeight: 3.8,
    focusSelected: false,
  }),
  plane: Object.freeze({
    rotation: Object.freeze([-Math.PI / 2, 0, 0]),
    viewHalfHeight: 3.5,
    focusSelected: false,
  }),
  shell: Object.freeze({
    rotation: DEFAULT_ROTATION,
    viewHalfHeight: 2.45,
    focusSelected: true,
  }),
  selected: Object.freeze({
    rotation: DEFAULT_ROTATION,
    viewHalfHeight: 1.65,
    focusSelected: true,
  }),
  front: Object.freeze({
    rotation: Object.freeze([0, 0, 0]),
    viewHalfHeight: DEFAULT_VIEW_HALF_HEIGHT,
    focusSelected: false,
  }),
  side: Object.freeze({
    rotation: Object.freeze([0, Math.PI / 2, 0]),
    viewHalfHeight: DEFAULT_VIEW_HALF_HEIGHT,
    focusSelected: false,
  }),
  top: Object.freeze({
    rotation: Object.freeze([-Math.PI / 2, 0, 0]),
    viewHalfHeight: DEFAULT_VIEW_HALF_HEIGHT,
    focusSelected: false,
  }),
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

function formatSiteLabel(site) {
  return site ? `(${site.grid.join(", ")})` : "unavailable";
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
  const counts = shell.pairs.flatMap((pair) => pair.positions).reduce(
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

function createRepeatCellFrame(size = 2) {
  const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size, size));
  const material = new THREE.LineBasicMaterial({
    color: 0xb7a9de,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const frame = new THREE.LineSegments(geometry, material);
  frame.userData.kind = "display-repeat-cell-frame";
  return frame;
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

function createNearestNeighborEdges(caseRecord) {
  const siteByGrid = new Map(
    caseRecord.sites.map((site) => [site.grid.join(","), site]),
  );
  const edges = [];
  caseRecord.sites.forEach((site) => {
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ].forEach((offset) => {
      const neighbor = siteByGrid.get(site.grid.map(
        (value, index) => value + offset[index],
      ).join(","));
      if (neighbor) {
        edges.push(Object.freeze({
          fromSiteId: site.id,
          toSiteId: neighbor.id,
        }));
      }
    });
  });
  return Object.freeze(edges);
}

export function mountLatticeLab(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const caseRecord = options.caseRecord ?? createSimpleCubicCheckerboardCase();
  const dom = {
    app: queryRequiredElement(documentLike, "#lattice-lab-app"),
    rail: queryRequiredElement(documentLike, "#lattice-lab-left-rail"),
    collapseButton: queryRequiredElement(documentLike, "#lattice-lab-panel-collapse"),
    canvas: queryRequiredElement(documentLike, "#lattice-lab-canvas"),
    miniatureCanvas: queryRequiredElement(documentLike, "#lattice-lab-miniature-canvas"),
    configurationState: queryRequiredElement(documentLike, "#lattice-lab-configuration-state"),
    population: queryRequiredElement(documentLike, "#lattice-lab-population"),
    selectedSite: queryRequiredElement(documentLike, "#lattice-lab-selected-site"),
    whatSeeing: queryRequiredElement(documentLike, "#lattice-lab-what-seeing"),
    swapButton: queryRequiredElement(documentLike, "#lattice-lab-swap-button"),
    swapStatus: queryRequiredElement(documentLike, "#lattice-lab-swap-status"),
    resetCaseButton: queryRequiredElement(documentLike, "#lattice-lab-reset-case"),
    ledgerReceiver: queryRequiredElement(documentLike, "#lattice-lab-ledger-receiver"),
    ledgerState: queryRequiredElement(documentLike, "#lattice-lab-ledger-state"),
    ledgerCoverage: queryRequiredElement(documentLike, "#lattice-lab-ledger-coverage"),
    ledgerShells: queryRequiredElement(documentLike, "#lattice-lab-ledger-shells"),
    ledgerResidual: queryRequiredElement(documentLike, "#lattice-lab-ledger-residual"),
    ledgerUnavailable: queryRequiredElement(documentLike, "#lattice-lab-ledger-unavailable"),
    miniatureState: queryRequiredElement(documentLike, "#lattice-lab-miniature-state"),
    tripod: queryRequiredElement(documentLike, "#lattice-lab-tripod"),
    tocButton: queryRequiredElement(documentLike, "#textbook-toc-button"),
    backButton: queryRequiredElement(documentLike, "#nav-up"),
    forwardButton: queryRequiredElement(documentLike, "#nav-forward"),
    homeButton: queryRequiredElement(documentLike, "#home-button"),
  };

  let polarityBySiteId = createReferencePolarityState(caseRecord);
  let selectedSiteId = LATTICE_LAB_DEFAULT_SITE_ID;
  let swapArmed = false;
  let swapFirstSiteId = null;
  let cameraViewHalfHeight = DEFAULT_VIEW_HALF_HEIGHT;
  let cameraAspect = 1;
  let focusSelected = false;
  let markerWorldRadius = 0.1;
  let dragging = false;
  let pointerId = null;
  let pointerLastX = 0;
  let pointerLastY = 0;
  let pointerTravel = 0;
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
  const guideGroup = new THREE.Group();
  rootGroup.add(guideGroup, lineGroup, siteGroup);
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

  const siteMeshes = new Map();
  caseRecord.sites.forEach((site) => {
    const mesh = new THREE.Mesh(
      sphereGeometry,
      site.polarity === LATTICE_LAB_POLARITY.POSITRINO ? redMaterial : blueMaterial,
    );
    mesh.position.fromArray(site.position);
    mesh.userData.siteId = site.id;
    mesh.userData.kind = "architrino-site";
    siteGroup.add(mesh);
    siteMeshes.set(site.id, mesh);

  });

  createSimpleCubicPolarityRepeatCellSites().forEach((site) => {
    const miniatureMesh = new THREE.Mesh(
      sphereGeometry,
      site.polarity === LATTICE_LAB_POLARITY.POSITRINO ? redMaterial : blueMaterial,
    );
    miniatureMesh.position.fromArray(site.position);
    miniatureMesh.scale.setScalar(0.12);
    miniatureRoot.add(miniatureMesh);
  });

  const neighborEdges = createNearestNeighborEdges(caseRecord);
  const edgeLines = neighborEdges.map((edge) => {
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

  guideGroup.add(createDottedDisplayEnvelope(LATTICE_LAB_DISPLAY_RADIUS));
  miniatureRoot.add(createRepeatCellFrame(2));
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
  updateConfigurationPresentation();
  updateSelectedPresentation();
  updatePolarityMaterials();
  resize();

  return {
    caseRecord,
    resetView: () => applyNamedView("reset"),
    resetCase,
    selectSite,
    dispose,
    getState() {
      return Object.freeze({
        selectedSiteId,
        polarityBySiteId,
        swapArmed,
        swapFirstSiteId,
        cameraViewHalfHeight,
        focusSelected,
        rotation: Object.freeze([
          rootGroup.rotation.x,
          rootGroup.rotation.y,
          rootGroup.rotation.z,
        ]),
        referenceConfiguration: isReferenceLatticeConfiguration(
          caseRecord,
          polarityBySiteId,
        ),
      });
    },
  };

  function listen(target, type, handler, eventOptions) {
    target.addEventListener(type, handler, eventOptions);
    listeners.push(() => target.removeEventListener?.(type, handler, eventOptions));
  }

  function bindEvents() {
    listen(dom.collapseButton, "click", () => {
      dom.app.dataset.panelCollapsed =
        dom.app.dataset.panelCollapsed === "true" ? "false" : "true";
      updateCollapsePresentation();
      windowLike.requestAnimationFrame?.(resize);
    });
    listen(dom.swapButton, "click", () => {
      swapArmed = !swapArmed;
      swapFirstSiteId = null;
      updateSwapPresentation(
        swapArmed
          ? "Choose site A, then choose an opposite-polarity site B."
          : "Two-site swap canceled.",
      );
    });
    listen(dom.resetCaseButton, "click", resetCase);
    dom.app.querySelectorAll("[data-lattice-view]").forEach((button) => {
      listen(button, "click", () => applyNamedView(button.dataset.latticeView));
    });
    listen(dom.canvas, "pointerdown", handlePointerDown);
    listen(dom.canvas, "pointermove", handlePointerMove);
    listen(dom.canvas, "pointerup", handlePointerUp);
    listen(dom.canvas, "pointercancel", handlePointerCancel);
    listen(dom.canvas, "wheel", handleWheel, { passive: false });
    listen(windowLike, "resize", resize);
    listen(windowLike, "keydown", (event) => {
      if (event.key === "Escape" && swapArmed) {
        swapArmed = false;
        swapFirstSiteId = null;
        updateSwapPresentation("Two-site swap canceled.");
      }
    });
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

  function resetCase() {
    polarityBySiteId = createReferencePolarityState(caseRecord);
    selectedSiteId = LATTICE_LAB_DEFAULT_SITE_ID;
    swapArmed = false;
    swapFirstSiteId = null;
    updatePolarityMaterials();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    updateSwapPresentation("Reference polarity pattern restored.");
    render();
  }

  function selectSite(siteId) {
    if (!getLatticeSite(caseRecord, siteId)) {
      return false;
    }
    selectedSiteId = siteId;
    if (swapArmed) {
      handleSwapSiteSelection(siteId);
    } else {
      updateSelectedPresentation();
    }
    render();
    return true;
  }

  function handleSwapSiteSelection(siteId) {
    if (!swapFirstSiteId) {
      swapFirstSiteId = siteId;
      updateSelectedPresentation();
      updateSwapPresentation(
        `Site A ${formatSiteLabel(getLatticeSite(caseRecord, siteId))} selected. Choose an opposite-polarity site B.`,
      );
      return;
    }
    try {
      polarityBySiteId = swapOppositeLatticePolarities(
        caseRecord,
        polarityBySiteId,
        swapFirstSiteId,
        siteId,
      );
    } catch (error) {
      updateSwapPresentation(error.message);
      return;
    }
    const firstLabel = formatSiteLabel(getLatticeSite(caseRecord, swapFirstSiteId));
    const secondLabel = formatSiteLabel(getLatticeSite(caseRecord, siteId));
    swapArmed = false;
    swapFirstSiteId = null;
    updatePolarityMaterials();
    updateConfigurationPresentation();
    updateSelectedPresentation();
    const counts = countLatticePolarities(polarityBySiteId);
    updateSwapPresentation(
      `Sites ${firstLabel} and ${secondLabel} exchanged polarity; ${counts.positrino} red / ${counts.electrino} blue remains exact.`,
    );
  }

  function updateSwapPresentation(message) {
    dom.swapButton.classList.toggle("is-active", swapArmed);
    dom.swapButton.setAttribute("aria-pressed", String(swapArmed));
    dom.swapButton.textContent = swapArmed ? "Cancel A–B swap" : "Start A–B swap";
    dom.swapStatus.textContent = message;
  }

  function updatePolarityMaterials() {
    siteMeshes.forEach((mesh, siteId) => {
      const positrino = polarityBySiteId[siteId] === LATTICE_LAB_POLARITY.POSITRINO;
      mesh.material = siteId === selectedSiteId
        ? (positrino ? selectedRedMaterial : selectedBlueMaterial)
        : (positrino ? redMaterial : blueMaterial);
    });
  }

  function updateConfigurationPresentation() {
    const reference = isReferenceLatticeConfiguration(caseRecord, polarityBySiteId);
    const counts = countLatticePolarities(polarityBySiteId);
    dom.configurationState.textContent = reference
      ? "reference configuration"
      : "modified configuration";
    dom.configurationState.dataset.state = reference ? "reference" : "modified";
    dom.population.textContent =
      `${counts.positrino} red positrinos / ${counts.electrino} blue electrinos`;
    dom.miniatureState.textContent = reference
      ? "reference 2 × 2 × 2 polarity repeat"
      : "reference repeat shown; local swap is not periodic";
  }

  function updateSelectedPresentation() {
    const selected = getLatticeSite(caseRecord, selectedSiteId);
    const ledger = createSelectedSiteLedger(
      caseRecord,
      polarityBySiteId,
      selectedSiteId,
    );
    const configurationState = isReferenceLatticeConfiguration(
      caseRecord,
      polarityBySiteId,
    ) ? "reference configuration" : "modified configuration";
    const nearestShell = ledger.shells.find((shell) => shell.id === "nearest");
    const nextLocalShell = ledger.shells.find((shell) => shell.id === "next-local");
    const receiverPolarity = formatPolarityLabel(ledger.receiverPolarity);
    dom.selectedSite.textContent =
      `${formatSiteLabel(selected)} · ${receiverPolarity}`;
    dom.whatSeeing.textContent = ledger.certificateApplies
      ? `The selected ${receiverPolarity} site ${formatSiteLabel(selected)} has ${summarizeShellPolarities(nearestShell)} at d and ${summarizeShellPolarities(nextLocalShell)} at √2d. These 18 acceleration rows form ${ledger.cancellingAccelerationPairs} cancelling antipodal pairs. The same inversion-pair rule generates the full stationary ideal-repeat ledger, giving exact zero initial acceleration at every site under the declared receiver-centered exhaustion. This is not a stability or later-evolution result.`
      : `The selected ${receiverPolarity} site ${formatSiteLabel(selected)} is part of a modified polarity configuration. ${ledger.cancellingAccelerationPairs} of ${ledger.expectedAntipodalPairs} displayed local acceleration pairs cancel; the canned infinite-repeat certificate does not apply to this edit.`;
    dom.ledgerReceiver.textContent =
      `${receiverPolarity[0].toUpperCase()}${receiverPolarity.slice(1)} site ${formatSiteLabel(selected)}`;
    dom.ledgerState.textContent = ledger.certificateApplies
      ? "derived static release"
      : configurationState;
    dom.ledgerState.dataset.certified = String(ledger.certificateApplies);
    dom.ledgerCoverage.textContent = ledger.certificateApplies
      ? `${ledger.coverage}; full stationary repeat certified by inversion-pair exhaustion.`
      : `${ledger.coverage}; ${ledger.cancellingAccelerationPairs} of ${ledger.expectedAntipodalPairs} local pairs cancel.`;
    dom.ledgerUnavailable.dataset.certified = String(ledger.certificateApplies);
    dom.ledgerUnavailable.textContent = ledger.certificateApplies
      ? "Derived static release: with c_f = 1 and a₀ = κ ε²/d², every partner row has W_acc = 1 and an exact inversion partner; the declared exhaustion gives A = 0 at every site. Stability and later evolution remain untested."
      : "Modified configuration: the reference infinite-repeat certificate is unavailable. The rows below are a finite local acceleration diagnostic only; omitted continuation is not treated as zero.";
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
        `${shell.visibleCount} at ${shell.distance} · ${summarizeShellPolarities(shell)}`;
      shellTitle.append(shellName, shellMeta);

      const shellStatus = documentLike.createElement("span");
      shellStatus.className = "lattice-lab-shell-status";
      shellStatus.dataset.cancelled = String(
        shell.cancellingAccelerationPairs === shell.pairs.length,
      );
      shellStatus.textContent =
        `Σ A/a₀ ${shell.normalizedAccelerationResidual ? formatVector(shell.normalizedAccelerationResidual) : "unavailable"}`;
      shellHeading.append(shellTitle, shellStatus);
      shellSection.append(shellHeading);

      shell.pairs.forEach((pair) => {
        const pairRow = documentLike.createElement("div");
        pairRow.className = "lattice-lab-ledger-pair";
        pairRow.dataset.cancelled = String(
          pair.accelerationCancelsExactly,
        );

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
          (position) => position.neighborId
            ? formatSiteLabel(getLatticeSite(caseRecord, position.neighborId))
            : position.neighborGrid
              ? `${formatGridLabel(position.neighborGrid)} · outside display crop`
              : "not shown",
        ).join(" ↔ ");

        const pairContribution = documentLike.createElement("code");
        pairContribution.textContent = pair.availability === "resolved-antipodal-pair"
          ? `${formatNormalizedAcceleration(pair.positions[0].accelerationRow)} + ${formatNormalizedAcceleration(pair.positions[1].accelerationRow)} = a₀·${formatVector(pair.normalizedAccelerationResidual)}`
          : "Displayed contribution unavailable: continuation not shown";
        pairRow.append(pairHeading, pairPositions, pairContribution);
        shellSection.append(pairRow);
      });
      dom.ledgerShells.append(shellSection);
    });
    dom.ledgerResidual.textContent = ledger.certificateApplies
      ? `${ledger.rows.length} displayed acceleration rows → ${ledger.expectedAntipodalPairs} local pair sums of zero. The generative inversion ledger extends pairwise cancellation through every admitted exhaustion stage: A = 0 at every site at release.`
      : ledger.normalizedAccelerationResidual
        ? `Displayed local residual: a₀·${formatVector(ledger.normalizedAccelerationResidual)}. This finite result does not include an infinite continuation.`
        : "Displayed local acceleration residual unavailable at this crop edge.";

    updatePolarityMaterials();
    updateFixedMarkerSizes();
  }

  function applyNamedView(viewId) {
    const view = LATTICE_LAB_NAMED_VIEWS[viewId];
    if (!view) {
      return;
    }
    rootGroup.rotation.set(...view.rotation);
    cameraViewHalfHeight = view.viewHalfHeight;
    focusSelected = view.focusSelected;
    updateProjection();
    updateFocusedPosition();
    updateFixedMarkerSizes();
    render();
  }

  function updateFocusedPosition() {
    if (!focusSelected) {
      rootGroup.position.set(0, 0, 0);
      return;
    }
    const selected = getLatticeSite(caseRecord, selectedSiteId);
    if (!selected) {
      rootGroup.position.set(0, 0, 0);
      return;
    }
    const transformed = new THREE.Vector3()
      .fromArray(selected.position)
      .applyQuaternion(rootGroup.quaternion);
    rootGroup.position.copy(transformed.multiplyScalar(-1));
  }

  function handlePointerDown(event) {
    dragging = true;
    pointerId = event.pointerId;
    pointerLastX = event.clientX;
    pointerLastY = event.clientY;
    pointerTravel = 0;
    dom.canvas.setPointerCapture?.(event.pointerId);
    dom.canvas.focus();
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
    if (event.pointerId !== pointerId) {
      return;
    }
    dom.canvas.releasePointerCapture?.(event.pointerId);
    dragging = false;
    pointerId = null;
    if (pointerTravel <= POINTER_CLICK_TRAVEL_PX) {
      selectSiteFromPointer(event);
    }
  }

  function handlePointerCancel(event) {
    if (event.pointerId === pointerId) {
      dragging = false;
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
      const segment = createClippedNeighborSegment(
        startSite.position,
        endSite.position,
        markerWorldRadius,
      );
      const position = line.geometry.getAttribute("position");
      position.setXYZ(0, ...segment.start);
      position.setXYZ(1, ...segment.end);
      position.needsUpdate = true;
      line.geometry.computeBoundingSphere();
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

    const miniRect = dom.miniatureCanvas.getBoundingClientRect();
    const miniWidth = Math.max(1, Math.floor(miniRect.width));
    const miniHeight = Math.max(1, Math.floor(miniRect.height));
    miniatureRenderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
    miniatureRenderer.setSize(miniWidth, miniHeight, false);
    const miniHalfHeight = 1.55;
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
    miniatureRoot.children
      .filter((object) => object.userData.kind === "display-repeat-cell-frame")
      .forEach((object) => {
        object.geometry?.dispose?.();
        object.material?.dispose?.();
      });
    sphereGeometry.dispose();
    redMaterial.dispose();
    blueMaterial.dispose();
    selectedRedMaterial.dispose();
    selectedBlueMaterial.dispose();
    neighborLineMaterial.dispose();
    renderer.dispose();
    miniatureRenderer.dispose();
  }
}
