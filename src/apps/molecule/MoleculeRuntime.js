import * as THREE from "../../../vendor/three/three.module.js";
import { createSceneGraphManifestService } from "../../services/SceneGraphManifestService.js";
import {
  MOLECULE_PRESETS,
  getElementRenderStyle,
} from "./MoleculePresetData.js";
import {
  calculateAtomLedger,
  calculateMoleculeLedger,
  formatLedgerNumber,
} from "./MoleculeLedgerRuntime.js";

const APPLICATIONS_SCENE_PATH = "content/scenes/archie/applications.json";
const DEFAULT_PRESET_ID = "water";
const BOND_RADIUS = 0.055;
const CAMERA_FOV_DEG = 42;
const MIN_CAMERA_DISTANCE = 3.4;
const MAX_CAMERA_DISTANCE = 32;
const POINTER_CLICK_DISTANCE_PX = 7;
const FIT_EDGE_PADDING_RATIO = 0.86;
const FIT_LEDGER_CLEARANCE_PX = 32;
const FIT_MIN_HEIGHT_RATIO = 0.48;

function queryMoleculeElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing molecule app element: ${selector}`);
  }
  return element;
}

function normalizeElementSymbol(value) {
  const raw = String(value ?? "").trim();
  if (!raw) {
    return "";
  }
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function setText(element, value) {
  if (element) {
    element.textContent = String(value ?? "");
  }
}

function normalizePreset(rawPreset) {
  const atoms = Array.isArray(rawPreset?.atoms)
    ? rawPreset.atoms
        .map((atom, index) => {
          const element = normalizeElementSymbol(atom?.element);
          const x = Number(atom?.x);
          const y = Number(atom?.y);
          const z = Number(atom?.z);
          if (!element || !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) {
            return null;
          }
          return {
            id: `${rawPreset.id || "molecule"}-atom-${index}`,
            index,
            element,
            position: new THREE.Vector3(x, y, z),
          };
        })
        .filter(Boolean)
    : [];

  const bonds = Array.isArray(rawPreset?.bonds)
    ? rawPreset.bonds
        .map((bond) => {
          const a = Number(bond?.[0]);
          const b = Number(bond?.[1]);
          if (
            !Number.isInteger(a) ||
            !Number.isInteger(b) ||
            a === b ||
            a < 0 ||
            b < 0 ||
            a >= atoms.length ||
            b >= atoms.length
          ) {
            return null;
          }
          return [a, b];
        })
        .filter(Boolean)
    : [];

  return {
    id: String(rawPreset?.id || "molecule").trim(),
    name: String(rawPreset?.name || "Molecule").trim(),
    formula: String(rawPreset?.formula || "").trim(),
    format: String(rawPreset?.format || "app-coordinates").trim(),
    source: String(rawPreset?.source || "curated").trim(),
    atoms,
    bonds,
  };
}

function centerAtoms(atoms) {
  const center = new THREE.Vector3();
  atoms.forEach((atom) => center.add(atom.position));
  if (atoms.length) {
    center.multiplyScalar(1 / atoms.length);
  }
  return atoms.map((atom) => ({
    ...atom,
    position: atom.position.clone().sub(center),
  }));
}

function getMoleculeRadius(atoms) {
  return atoms.reduce((max, atom) => {
    const style = getElementRenderStyle(atom.element);
    return Math.max(max, atom.position.length() + style.radius);
  }, 1);
}

function createBondMesh(Three, start, end, material) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const geometry = new Three.CylinderGeometry(BOND_RADIUS, BOND_RADIUS, length, 18);
  const mesh = new Three.Mesh(geometry, material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new Three.Vector3(0, 1, 0), direction.normalize());
  mesh.userData.kind = "bond";
  return mesh;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry && typeof child.geometry.dispose === "function") {
      child.geometry.dispose();
    }
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material && typeof material.dispose === "function") {
          material.dispose();
        }
      });
    }
  });
}

function buildHashUrl({ windowLike, scenePath, parentPath, focus }) {
  const url = new URL("./index.html", windowLike.location.href);
  const params = new URLSearchParams();
  params.set("scene", scenePath);
  if (parentPath && focus) {
    params.set("parent", parentPath);
    params.set("focus", focus);
  }
  url.hash = params.toString();
  return url.href;
}

export function createMoleculeRuntime(options = {}) {
  const documentLike = options.documentLike ?? document;
  const windowLike = options.windowLike ?? window;
  const fetchImpl = options.fetchImpl ?? ((...args) => windowLike.fetch(...args));
  const presets = (options.presets ?? MOLECULE_PRESETS).map(normalizePreset);
  const presetsByName = [...presets].sort((left, right) =>
    left.name.localeCompare(right.name, undefined, { sensitivity: "base" })
  );
  const presetById = new Map(presets.map((preset) => [preset.id, preset]));
  const sceneGraphManifestService =
    options.sceneGraphManifestService ??
    createSceneGraphManifestService({
      fetchImpl,
    });

  const dom = {
    app: queryMoleculeElement(documentLike, "#molecule-app"),
    stage: queryMoleculeElement(documentLike, ".molecule-stage"),
    canvas: queryMoleculeElement(documentLike, "#molecule-canvas"),
    atomLabel: queryMoleculeElement(documentLike, "#molecule-atom-label"),
    readout: queryMoleculeElement(documentLike, ".molecule-readout"),
    title: queryMoleculeElement(documentLike, "#molecule-title"),
    subtitle: queryMoleculeElement(documentLike, "#molecule-subtitle"),
    formula: queryMoleculeElement(documentLike, "#molecule-formula"),
    atomCount: queryMoleculeElement(documentLike, "#molecule-atom-count"),
    bondCount: queryMoleculeElement(documentLike, "#molecule-bond-count"),
    protonCount: queryMoleculeElement(documentLike, "#molecule-proton-count"),
    neutronCount: queryMoleculeElement(documentLike, "#molecule-neutron-count"),
    electronCount: queryMoleculeElement(documentLike, "#molecule-electron-count"),
    electrinoCount: queryMoleculeElement(documentLike, "#molecule-electrino-count"),
    positrinoCount: queryMoleculeElement(documentLike, "#molecule-positrino-count"),
    architrinoCount: queryMoleculeElement(documentLike, "#molecule-architrino-count"),
    presetList: queryMoleculeElement(documentLike, "#molecule-preset-list"),
    homeButton: queryMoleculeElement(documentLike, "#molecule-home-button"),
  };

  const renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV_DEG, 1, 0.01, 100);
  const moleculeGroup = new THREE.Group();
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const hoverWorldPosition = new THREE.Vector3();
  const atomMeshes = [];
  const presetButtons = new Map();

  const state = {
    activePreset: null,
    cameraDistance: 6,
    dragging: false,
    pointerId: null,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerLastX: 0,
    pointerLastY: 0,
    pointerTravel: 0,
    dragMode: "rotate",
    hoverAtom: null,
    hoverMesh: null,
  };

  scene.add(moleculeGroup);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc6d2c2, 1.5));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
  keyLight.position.set(5, 6, 8);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xdff5ed, 0.9);
  fillLight.position.set(-5, 2, 4);
  scene.add(fillLight);

  const bondMaterial = new THREE.MeshStandardMaterial({
    color: 0xc9d1c9,
    metalness: 0.08,
    roughness: 0.45,
  });

  function render() {
    renderer.render(scene, camera);
  }

  function resize() {
    const rect = dom.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setPixelRatio(Math.min(windowLike.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
    updateAtomLabelPosition();
  }

  function setCameraDistance(distance) {
    state.cameraDistance = Math.min(MAX_CAMERA_DISTANCE, Math.max(MIN_CAMERA_DISTANCE, distance));
    camera.position.set(0, 0, state.cameraDistance);
    camera.lookAt(0, 0, 0);
    render();
    updateAtomLabelPosition();
  }

  function getViewportWorldSize() {
    const height = 2 * state.cameraDistance * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV_DEG) / 2);
    return {
      width: height * camera.aspect,
      height,
    };
  }

  function getPointerWorldDelta(deltaX, deltaY) {
    const rect = dom.canvas.getBoundingClientRect();
    const viewportWorldSize = getViewportWorldSize();
    return {
      x: (deltaX / Math.max(1, rect.width)) * viewportWorldSize.width,
      y: -(deltaY / Math.max(1, rect.height)) * viewportWorldSize.height,
    };
  }

  function getMoleculeFitFrame() {
    const canvasRect = dom.canvas.getBoundingClientRect();
    const readoutRect = dom.readout.getBoundingClientRect();
    const canvasHeight = Math.max(1, canvasRect.height);
    const readoutTop =
      Number.isFinite(readoutRect.top) && readoutRect.height > 0
        ? readoutRect.top
        : canvasRect.bottom;
    const fitBottom = Math.max(
      canvasRect.top + canvasHeight * FIT_MIN_HEIGHT_RATIO,
      Math.min(canvasRect.bottom, readoutTop - FIT_LEDGER_CLEARANCE_PX)
    );
    const fitHeight = Math.max(1, fitBottom - canvasRect.top);
    const fitCenterY = fitHeight * 0.5;

    return {
      centerNdcY: 1 - (2 * fitCenterY) / canvasHeight,
      horizontalNdcHalf: FIT_EDGE_PADDING_RATIO,
      verticalNdcHalf: Math.min(
        FIT_EDGE_PADDING_RATIO,
        (fitHeight / canvasHeight) * FIT_EDGE_PADDING_RATIO
      ),
    };
  }

  function getFitCameraDistance(radius, fitFrame) {
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV_DEG) / 2);
    const verticalDistance = radius / Math.max(0.1, fitFrame.verticalNdcHalf * tanHalfFov);
    const horizontalDistance =
      radius / Math.max(0.1, fitFrame.horizontalNdcHalf * tanHalfFov * camera.aspect);
    return Math.min(
      MAX_CAMERA_DISTANCE,
      Math.max(MIN_CAMERA_DISTANCE, Math.max(verticalDistance, horizontalDistance) * 1.04)
    );
  }

  function getDefaultMoleculeYOffset(fitFrame) {
    const tanHalfFov = Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV_DEG) / 2);
    return fitFrame.centerNdcY * state.cameraDistance * tanHalfFov;
  }

  function resetView() {
    moleculeGroup.rotation.set(-0.28, 0.46, 0);
    moleculeGroup.position.set(0, 0, 0);
    const radius = getMoleculeRadius(state.activePreset?.atoms ?? []);
    const fitFrame = getMoleculeFitFrame();
    setCameraDistance(getFitCameraDistance(radius, fitFrame));
    moleculeGroup.position.y = getDefaultMoleculeYOffset(fitFrame);
    render();
    updateAtomLabelPosition();
  }

  function clearMolecule() {
    while (moleculeGroup.children.length) {
      const child = moleculeGroup.children.pop();
      disposeObject(child);
    }
    atomMeshes.length = 0;
    state.hoverAtom = null;
    state.hoverMesh = null;
    hideAtomLabel();
  }

  function updateLedgerCounts(ledger) {
    setText(dom.protonCount, formatLedgerNumber(ledger.protons));
    setText(dom.neutronCount, formatLedgerNumber(ledger.neutrons));
    setText(dom.electronCount, formatLedgerNumber(ledger.electrons));
    setText(dom.electrinoCount, formatLedgerNumber(ledger.electrinos));
    setText(dom.positrinoCount, formatLedgerNumber(ledger.positrinos));
    setText(dom.architrinoCount, formatLedgerNumber(ledger.architrinos));
  }

  function updateReadout(preset) {
    const ledger = calculateMoleculeLedger(preset);
    dom.readout.classList.remove("is-atom-hover");
    setText(dom.title, preset.name);
    setText(dom.subtitle, preset.formula || "Preset molecule catalog");
    setText(dom.formula, preset.formula || "-");
    setText(dom.atomCount, `${preset.atoms.length}`);
    setText(dom.bondCount, `${preset.bonds.length}`);
    updateLedgerCounts(ledger);
    presetButtons.forEach((button, id) => {
      button.classList.toggle("is-active", id === preset.id);
      button.setAttribute("aria-pressed", id === preset.id ? "true" : "false");
    });
  }

  function updateAtomReadout(atom) {
    const ledger = calculateAtomLedger(atom);
    dom.readout.classList.add("is-atom-hover");
    setText(dom.formula, formatAtomLabel(atom) || "-");
    setText(dom.atomCount, atom?.element || "-");
    setText(dom.bondCount, Number.isInteger(atom?.index) ? `#${atom.index + 1}` : "-");
    updateLedgerCounts(ledger);
  }

  function drawPreset(rawPreset) {
    const preset = {
      ...rawPreset,
      atoms: centerAtoms(rawPreset.atoms),
    };
    state.activePreset = preset;
    clearMolecule();

    preset.bonds.forEach(([startIndex, endIndex]) => {
      const startAtom = preset.atoms[startIndex];
      const endAtom = preset.atoms[endIndex];
      if (!startAtom || !endAtom) {
        return;
      }
      moleculeGroup.add(createBondMesh(THREE, startAtom.position, endAtom.position, bondMaterial));
    });

    preset.atoms.forEach((atom) => {
      const style = getElementRenderStyle(atom.element);
      const geometry = new THREE.SphereGeometry(style.radius, 32, 20);
      const material = new THREE.MeshStandardMaterial({
        color: style.color,
        emissive: style.edgeColor,
        emissiveIntensity: 0.05,
        metalness: 0.04,
        roughness: 0.32,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(atom.position);
      mesh.userData.kind = "atom";
      mesh.userData.atom = {
        id: atom.id,
        index: atom.index,
        element: atom.element,
        elementName: style.name,
        moleculeId: preset.id,
        moleculeName: preset.name,
      };
      atomMeshes.push(mesh);
      moleculeGroup.add(mesh);
    });

    updateReadout(preset);
    resetView();
  }

  function selectPreset(presetId) {
    const preset = presetById.get(String(presetId || "")) ?? presets[0];
    if (!preset) {
      return;
    }
    drawPreset(preset);
  }

  function renderPresetButtons() {
    dom.presetList.textContent = "";
    presetButtons.clear();
    presetsByName.forEach((preset) => {
      const button = documentLike.createElement("button");
      button.type = "button";
      button.className = "molecule-preset-button";
      button.dataset.presetId = preset.id;
      button.setAttribute("aria-pressed", "false");

      const label = documentLike.createElement("strong");
      label.textContent = preset.name;
      const meta = documentLike.createElement("span");
      meta.textContent = `${preset.formula || "formula"} · ${preset.atoms.length} atoms`;
      button.append(label, meta);
      button.addEventListener("click", () => selectPreset(preset.id));
      presetButtons.set(preset.id, button);
      dom.presetList.append(button);
    });
  }

  function setPointerNdc(event) {
    const rect = dom.canvas.getBoundingClientRect();
    pointerNdc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function pickAtomMesh(event) {
    if (!atomMeshes.length) {
      return null;
    }
    setPointerNdc(event);
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(atomMeshes, false);
    return hits[0]?.object ?? null;
  }

  function pickAtom(event) {
    return pickAtomMesh(event)?.userData?.atom ?? null;
  }

  function formatAtomLabel(atom) {
    if (!atom?.element) {
      return "";
    }
    const elementName = String(atom.elementName || atom.element).trim();
    const symbol = String(atom.element).trim();
    return elementName && elementName !== symbol ? `${elementName} ${symbol}` : symbol;
  }

  function hideAtomLabel() {
    dom.atomLabel.hidden = true;
    dom.atomLabel.setAttribute("aria-hidden", "true");
    dom.atomLabel.textContent = "";
  }

  function updateAtomLabelPosition() {
    if (!state.hoverMesh || !state.hoverAtom || dom.atomLabel.hidden) {
      return;
    }
    moleculeGroup.updateMatrixWorld(true);
    state.hoverMesh.getWorldPosition(hoverWorldPosition);
    const projected = hoverWorldPosition.clone().project(camera);
    if (projected.z < -1 || projected.z > 1) {
      dom.atomLabel.hidden = true;
      return;
    }

    const stageRect = dom.stage.getBoundingClientRect();
    const canvasRect = dom.canvas.getBoundingClientRect();
    const x =
      canvasRect.left -
      stageRect.left +
      (projected.x * 0.5 + 0.5) * canvasRect.width;
    const y =
      canvasRect.top -
      stageRect.top +
      (-projected.y * 0.5 + 0.5) * canvasRect.height;
    const clampedX = Math.min(Math.max(x, 52), Math.max(52, stageRect.width - 52));
    const clampedY = Math.min(Math.max(y, 34), Math.max(34, stageRect.height - 150));
    dom.atomLabel.style.left = `${Math.round(clampedX)}px`;
    dom.atomLabel.style.top = `${Math.round(clampedY)}px`;
  }

  function showAtomLabel(mesh) {
    const label = formatAtomLabel(mesh?.userData?.atom);
    if (!label) {
      hideAtomLabel();
      return;
    }
    dom.atomLabel.textContent = label;
    dom.atomLabel.hidden = false;
    dom.atomLabel.setAttribute("aria-hidden", "false");
    updateAtomLabelPosition();
  }

  function applyAtomHover(mesh, isHovered) {
    if (!mesh) {
      return;
    }
    mesh.scale.setScalar(isHovered ? 1.16 : 1);
    if (mesh.material) {
      mesh.material.emissiveIntensity = isHovered ? 0.36 : 0.05;
    }
    render();
    updateAtomLabelPosition();
  }

  function setHoveredAtomMesh(mesh) {
    if (state.hoverMesh === mesh) {
      return;
    }
    applyAtomHover(state.hoverMesh, false);
    state.hoverMesh = mesh;
    state.hoverAtom = mesh?.userData?.atom ?? null;
    applyAtomHover(state.hoverMesh, true);
    dom.canvas.style.cursor = state.hoverAtom ? "pointer" : "grab";
    if (state.hoverAtom) {
      updateAtomReadout(state.hoverAtom);
      showAtomLabel(state.hoverMesh);
      return;
    }
    hideAtomLabel();
    if (state.activePreset) {
      updateReadout(state.activePreset);
    }
  }

  async function resolveElementScenePath(symbol) {
    const normalizedSymbol = String(symbol || "").trim().toLowerCase();
    if (!normalizedSymbol) {
      return null;
    }
    try {
      const manifestPath =
        typeof sceneGraphManifestService?.resolvePeriodicElementScenePath === "function"
          ? await sceneGraphManifestService.resolvePeriodicElementScenePath(normalizedSymbol)
          : null;
      if (manifestPath) {
        return manifestPath;
      }
    } catch (error) {
      console.warn("[MoleculeRuntime] Failed to resolve element route", error);
    }
    return `content/scenes/elements/${normalizedSymbol}.json`;
  }

  async function navigateToAtom(atom) {
    if (!atom?.element) {
      return;
    }
    const scenePath = await resolveElementScenePath(atom.element);
    if (!scenePath) {
      return;
    }
    const href = buildHashUrl({
      windowLike,
      scenePath,
      parentPath: APPLICATIONS_SCENE_PATH,
      focus: "molecule",
    });
    windowLike.location.assign(href);
  }

  function updateHover(event) {
    if (state.dragging) {
      return;
    }
    setHoveredAtomMesh(pickAtomMesh(event));
  }

  function handlePointerDown(event) {
    const dragStartMesh = pickAtomMesh(event);
    setHoveredAtomMesh(null);
    state.dragging = true;
    state.dragMode = dragStartMesh ? "pan" : "rotate";
    state.pointerId = event.pointerId;
    state.pointerStartX = event.clientX;
    state.pointerStartY = event.clientY;
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerTravel = 0;
    dom.canvas.style.cursor = state.dragMode === "pan" ? "move" : "grabbing";
    dom.canvas.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!state.dragging || state.pointerId !== event.pointerId) {
      updateHover(event);
      return;
    }
    const dx = event.clientX - state.pointerLastX;
    const dy = event.clientY - state.pointerLastY;
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerTravel += Math.hypot(dx, dy);
    if (state.dragMode === "pan") {
      const delta = getPointerWorldDelta(dx, dy);
      moleculeGroup.position.x += delta.x;
      moleculeGroup.position.y += delta.y;
    } else {
      moleculeGroup.rotation.y += dx * 0.008;
      moleculeGroup.rotation.x += dy * 0.008;
    }
    render();
    updateAtomLabelPosition();
  }

  function handlePointerUp(event) {
    if (!state.dragging || state.pointerId !== event.pointerId) {
      return;
    }
    dom.canvas.releasePointerCapture?.(event.pointerId);
    const clickDistance = Math.hypot(
      event.clientX - state.pointerStartX,
      event.clientY - state.pointerStartY
    );
    state.dragging = false;
    state.pointerId = null;
    state.dragMode = "rotate";
    dom.canvas.style.cursor = "grab";
    if (Math.max(clickDistance, state.pointerTravel) <= POINTER_CLICK_DISTANCE_PX) {
      const atom = pickAtom(event);
      if (atom) {
        navigateToAtom(atom);
      }
    } else {
      updateHover(event);
    }
  }

  function handleWheel(event) {
    event.preventDefault();
    const direction = Math.sign(event.deltaY);
    setCameraDistance(state.cameraDistance + direction * 0.45);
  }

  function handlePointerLeave() {
    if (!state.dragging) {
      setHoveredAtomMesh(null);
    }
  }

  function navigateHome() {
    const href = buildHashUrl({
      windowLike,
      scenePath: APPLICATIONS_SCENE_PATH,
    });
    windowLike.location.assign(href);
  }

  function init() {
    if (!presets.length) {
      throw new Error("Molecule app requires at least one preset.");
    }
    renderPresetButtons();
    dom.canvas.style.cursor = "grab";
    dom.canvas.addEventListener("pointerdown", handlePointerDown);
    dom.canvas.addEventListener("pointermove", handlePointerMove);
    dom.canvas.addEventListener("pointerup", handlePointerUp);
    dom.canvas.addEventListener("pointercancel", handlePointerUp);
    dom.canvas.addEventListener("pointerleave", handlePointerLeave);
    dom.canvas.addEventListener("wheel", handleWheel, { passive: false });
    dom.homeButton.addEventListener("click", navigateHome);
    windowLike.addEventListener("resize", resize);
    resize();
    selectPreset(presetById.has(DEFAULT_PRESET_ID) ? DEFAULT_PRESET_ID : presets[0].id);
  }

  function destroy() {
    windowLike.removeEventListener("resize", resize);
    dom.canvas.removeEventListener("pointerdown", handlePointerDown);
    dom.canvas.removeEventListener("pointermove", handlePointerMove);
    dom.canvas.removeEventListener("pointerup", handlePointerUp);
    dom.canvas.removeEventListener("pointercancel", handlePointerUp);
    dom.canvas.removeEventListener("pointerleave", handlePointerLeave);
    dom.canvas.removeEventListener("wheel", handleWheel);
    clearMolecule();
    renderer.dispose();
  }

  return {
    init,
    destroy,
    selectPreset,
    resetView,
    getState: () => ({
      activePresetId: state.activePreset?.id ?? null,
      cameraDistance: state.cameraDistance,
      presetCount: presets.length,
    }),
  };
}
