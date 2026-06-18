import * as THREE from "../../../vendor/three/three.module.js";
import { createSceneGraphManifestService } from "../../services/SceneGraphManifestService.js";
import {
  MOLECULE_PRESETS,
  getElementRenderStyle,
} from "./MoleculePresetData.js";
import {
  SUPPORTED_MOLECULE_LEDGER_ELEMENTS,
  calculateAtomLedger,
  calculateMoleculeLedger,
  formatLedgerNumber,
} from "./MoleculeLedgerRuntime.js";

const APPLICATIONS_SCENE_PATH = "content/scenes/archie/applications.json";
const DEFAULT_PRESET_ID = "water";
const BOND_RADIUS = 0.055;
const MULTI_BOND_RADIUS = 0.036;
const MULTI_BOND_OFFSET = 0.082;
const CAMERA_FOV_DEG = 42;
const MIN_CAMERA_DISTANCE = 3.4;
const MAX_CAMERA_DISTANCE = 32;
const POINTER_CLICK_DISTANCE_PX = 7;
const FIT_EDGE_PADDING_RATIO = 0.86;
const FIT_LEDGER_CLEARANCE_PX = 32;
const FIT_MIN_HEIGHT_RATIO = 0.48;
const MAX_SESSION_ATOMS = 180;
const SESSION_MOLECULE_ID_PREFIX = "session-molecule";
const SESSION_MOLECULE_SOURCE = "session formula composition";
const FORMULA_SEPARATOR_PATTERN = /[.\u00b7\u2022]/gu;
const FORMULA_LETTER_PATTERN = /^[A-Za-z]$/u;
const FORMULA_DIGIT_PATTERN = /^\d$/u;
const SUPPORTED_FORMULA_ELEMENTS = new Set(SUPPORTED_MOLECULE_LEDGER_ELEMENTS);
const PUBCHEM_BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound";
const PUBCHEM_LOOKUP_CID_LIMIT = 12;
const PUBCHEM_FETCH_TIMEOUT_MS = 6500;
const PUBCHEM_PROPERTY_FIELDS = "Title,IUPACName,MolecularFormula";

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

function formatMoleculeDisplayName(value) {
  const normalized = String(value || "").trim().replace(/\s+/gu, " ");
  if (!normalized) {
    return "";
  }
  return normalized.replace(/[A-Za-z][A-Za-z']*/gu, (word) => {
    if (word.length <= 3 && word === word.toUpperCase()) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

function getBuildElementEntries(counts) {
  return Object.entries(counts).sort(([left], [right]) => {
    if (left === "H" && right !== "H") {
      return 1;
    }
    if (right === "H" && left !== "H") {
      return -1;
    }
    return left.localeCompare(right);
  });
}

function getFormulaKeyFromCounts(counts) {
  return Object.entries(counts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([symbol, count]) => `${symbol}:${count}`)
    .join("|");
}

function readFormulaCount(compact, index, symbol) {
  let endIndex = index;
  while (endIndex < compact.length && FORMULA_DIGIT_PATTERN.test(compact.charAt(endIndex))) {
    endIndex += 1;
  }
  const rawCount = compact.slice(index, endIndex);
  if (rawCount.length > 1 && rawCount.startsWith("0")) {
    return { ok: false, message: "Use the letter O for oxygen, not zero." };
  }
  const count = rawCount ? Number(rawCount) : 1;
  if (!Number.isInteger(count) || count < 1) {
    return { ok: false, message: `${symbol} needs a positive count.` };
  }
  return { ok: true, count, nextIndex: endIndex };
}

function getFormulaSymbolCandidates(compact, index, hasCanonicalCase) {
  const current = compact.charAt(index);
  if (!FORMULA_LETTER_PATTERN.test(current)) {
    return [];
  }

  if (hasCanonicalCase) {
    let endIndex = index + 1;
    while (
      endIndex < compact.length &&
      endIndex - index < 3 &&
      /[a-z]/u.test(compact.charAt(endIndex))
    ) {
      endIndex += 1;
    }
    const symbol = normalizeElementSymbol(compact.slice(index, endIndex));
    return SUPPORTED_FORMULA_ELEMENTS.has(symbol)
      ? [{ symbol, nextIndex: endIndex }]
      : [];
  }

  const candidates = [];
  for (let length = 1; length <= 3 && index + length <= compact.length; length += 1) {
    const fragment = compact.slice(index, index + length);
    if (!/^[a-z]+$/u.test(fragment)) {
      break;
    }
    const symbol = normalizeElementSymbol(fragment);
    if (SUPPORTED_FORMULA_ELEMENTS.has(symbol)) {
      candidates.push({ symbol, nextIndex: index + length });
    }
  }
  return candidates;
}

function parseFormulaTokens(compact) {
  const hasCanonicalCase = /[A-Z]/u.test(compact);
  const memo = new Map();

  function parseFrom(index) {
    if (index >= compact.length) {
      return { ok: true, tokens: [] };
    }
    if (memo.has(index)) {
      return memo.get(index);
    }

    const candidates = getFormulaSymbolCandidates(compact, index, hasCanonicalCase);
    if (!candidates.length) {
      const failure = { ok: false, message: "Use element symbols and counts only." };
      memo.set(index, failure);
      return failure;
    }

    let lastFailure = null;
    for (const candidate of candidates) {
      const countResult = readFormulaCount(compact, candidate.nextIndex, candidate.symbol);
      if (!countResult.ok) {
        memo.set(index, countResult);
        return countResult;
      }
      const tail = parseFrom(countResult.nextIndex);
      if (tail.ok) {
        const success = {
          ok: true,
          tokens: [{ symbol: candidate.symbol, count: countResult.count }, ...tail.tokens],
        };
        memo.set(index, success);
        return success;
      }
      lastFailure = tail;
    }

    const failure = lastFailure ?? { ok: false, message: "Use element symbols and counts only." };
    memo.set(index, failure);
    return failure;
  }

  return parseFrom(0);
}

function parseFormulaInput(value) {
  const raw = String(value ?? "").trim();
  const compact = raw.replace(/\s+/gu, "").replace(FORMULA_SEPARATOR_PATTERN, "");
  if (!compact) {
    return { ok: false, message: "Enter a formula." };
  }

  const parsedTokens = parseFormulaTokens(compact);
  if (!parsedTokens.ok) {
    return parsedTokens;
  }

  const counts = {};
  const symbolOrder = [];
  let totalAtoms = 0;
  parsedTokens.tokens.forEach(({ symbol, count }) => {
    if (!Object.prototype.hasOwnProperty.call(counts, symbol)) {
      symbolOrder.push(symbol);
    }
    counts[symbol] = (counts[symbol] ?? 0) + count;
    totalAtoms += count;
  });

  if (totalAtoms > MAX_SESSION_ATOMS) {
    return { ok: false, message: `Session molecules are limited to ${MAX_SESSION_ATOMS} atoms.` };
  }

  return {
    ok: true,
    counts,
    formula: symbolOrder
      .map((symbol) => `${symbol}${counts[symbol] > 1 ? counts[symbol] : ""}`)
      .join(""),
    formulaKey: getFormulaKeyFromCounts(counts),
    totalAtoms,
  };
}

function createSessionMoleculeAtoms(counts) {
  const totalAtoms = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const atoms = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const clusterRadius = Math.max(0.9, Math.cbrt(Math.max(1, totalAtoms)) * 0.78);

  getBuildElementEntries(counts).forEach(([element, count]) => {
    for (let elementIndex = 0; elementIndex < count; elementIndex += 1) {
      const atomIndex = atoms.length;
      const t = totalAtoms <= 1 ? 0.5 : (atomIndex + 0.5) / totalAtoms;
      const y = 1 - 2 * t;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = atomIndex * goldenAngle;
      const shellScale = Math.cbrt(t);
      atoms.push({
        element,
        x: Number((Math.cos(theta) * radiusAtY * clusterRadius * shellScale).toFixed(3)),
        y: Number((y * clusterRadius).toFixed(3)),
        z: Number((Math.sin(theta) * radiusAtY * clusterRadius * shellScale).toFixed(3)),
      });
    }
  });

  return atoms;
}

function getDistanceSquared(left, right) {
  const dx = left.x - right.x;
  const dy = left.y - right.y;
  const dz = left.z - right.z;
  return dx * dx + dy * dy + dz * dz;
}

function normalizeBondOrder(value) {
  const order = Number(value);
  return Number.isInteger(order) && order >= 1 && order <= 4 ? order : 1;
}

function createSessionMoleculeBonds(atoms) {
  const bonds = [];
  for (let index = 1; index < atoms.length; index += 1) {
    const atom = atoms[index];
    const preferredCandidates = atoms
      .slice(0, index)
      .map((candidate, candidateIndex) => ({ candidate, candidateIndex }))
      .filter(({ candidate }) => atom.element !== "H" || candidate.element !== "H");
    const candidates = preferredCandidates.length
      ? preferredCandidates
      : atoms.slice(0, index).map((candidate, candidateIndex) => ({ candidate, candidateIndex }));
    const nearest = candidates.reduce(
      (best, candidate) => {
        const distance = getDistanceSquared(atom, candidate.candidate);
        return distance < best.distance ? { ...candidate, distance } : best;
      },
      { candidateIndex: 0, distance: Infinity }
    );
    bonds.push([nearest.candidateIndex, index, 1]);
  }
  return bonds;
}

function parseSdfMolecule(sdfText) {
  const record = String(sdfText || "").replace(/\r/gu, "").split("$$$$")[0];
  const lines = record.split("\n");
  const countsLineIndex = lines.findIndex((line) => /\bV2000\b/u.test(line));
  if (countsLineIndex < 0) {
    return null;
  }

  const counts = lines[countsLineIndex].trim().split(/\s+/u);
  const atomCount = Number(counts[0]);
  const bondCount = Number(counts[1]);
  if (
    !Number.isInteger(atomCount) ||
    !Number.isInteger(bondCount) ||
    atomCount < 1 ||
    bondCount < 0 ||
    atomCount > MAX_SESSION_ATOMS
  ) {
    return null;
  }

  const atoms = [];
  for (let index = 0; index < atomCount; index += 1) {
    const parts = lines[countsLineIndex + 1 + index]?.trim().split(/\s+/u) ?? [];
    const x = Number(parts[0]);
    const y = Number(parts[1]);
    const z = Number(parts[2]);
    const element = normalizeElementSymbol(parts[3]);
    if (
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(z) ||
      !SUPPORTED_FORMULA_ELEMENTS.has(element)
    ) {
      return null;
    }
    atoms.push({ element, x, y, z });
  }

  const bonds = [];
  const bondStartIndex = countsLineIndex + 1 + atomCount;
  for (let index = 0; index < bondCount; index += 1) {
    const parts = lines[bondStartIndex + index]?.trim().split(/\s+/u) ?? [];
    const start = Number(parts[0]) - 1;
    const end = Number(parts[1]) - 1;
    const order = normalizeBondOrder(parts[2]);
    if (
      Number.isInteger(start) &&
      Number.isInteger(end) &&
      start >= 0 &&
      end >= 0 &&
      start < atomCount &&
      end < atomCount &&
      start !== end
    ) {
      bonds.push([start, end, order]);
    }
  }

  return { atoms, bonds };
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
          const order = normalizeBondOrder(bond?.[2]);
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
          return [a, b, order];
        })
        .filter(Boolean)
    : [];

  return {
    id: String(rawPreset?.id || "molecule").trim(),
    name: String(rawPreset?.name || "Molecule").trim(),
    formula: String(rawPreset?.formula || "").trim(),
    format: String(rawPreset?.format || "app-coordinates").trim(),
    source: String(rawPreset?.source || "curated").trim(),
    isSession: Boolean(rawPreset?.isSession),
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

function createBondCylinderMesh(Three, start, end, material, { radius = BOND_RADIUS, offset = null } = {}) {
  const startPoint = offset ? start.clone().add(offset) : start;
  const endPoint = offset ? end.clone().add(offset) : end;
  const direction = endPoint.clone().sub(startPoint);
  const length = direction.length();
  const geometry = new Three.CylinderGeometry(radius, radius, length, 18);
  const mesh = new Three.Mesh(geometry, material);
  mesh.position.copy(startPoint).add(endPoint).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new Three.Vector3(0, 1, 0), direction.normalize());
  mesh.userData.kind = "bond";
  return mesh;
}

function getBondOffsetVector(Three, start, end) {
  const direction = end.clone().sub(start).normalize();
  const reference =
    Math.abs(direction.y) < 0.82
      ? new Three.Vector3(0, 1, 0)
      : new Three.Vector3(1, 0, 0);
  return new Three.Vector3().crossVectors(direction, reference).normalize();
}

function createBondMesh(Three, start, end, order, material, aromaticMaterial) {
  const normalizedOrder = normalizeBondOrder(order);
  if (normalizedOrder === 1) {
    return createBondCylinderMesh(Three, start, end, material);
  }

  const group = new Three.Group();
  group.userData.kind = "bond";
  const perpendicular = getBondOffsetVector(Three, start, end);

  if (normalizedOrder === 2) {
    [-1, 1].forEach((offsetMultiplier) => {
      group.add(
        createBondCylinderMesh(Three, start, end, material, {
          radius: MULTI_BOND_RADIUS,
          offset: perpendicular.clone().multiplyScalar(MULTI_BOND_OFFSET * offsetMultiplier),
        })
      );
    });
    return group;
  }

  if (normalizedOrder === 3) {
    [-1, 0, 1].forEach((offsetMultiplier) => {
      group.add(
        createBondCylinderMesh(Three, start, end, material, {
          radius: MULTI_BOND_RADIUS,
          offset: perpendicular.clone().multiplyScalar(MULTI_BOND_OFFSET * offsetMultiplier),
        })
      );
    });
    return group;
  }

  group.add(createBondCylinderMesh(Three, start, end, material));
  group.add(
    createBondCylinderMesh(Three, start, end, aromaticMaterial, {
      radius: MULTI_BOND_RADIUS,
      offset: perpendicular.clone().multiplyScalar(MULTI_BOND_OFFSET),
    })
  );
  return group;
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
  const presetMatchesByFormulaKey = new Map();
  presets.forEach((preset) => {
    const parsedFormula = parseFormulaInput(preset.formula);
    if (!parsedFormula.ok) {
      return;
    }
    const matches = presetMatchesByFormulaKey.get(parsedFormula.formulaKey) ?? [];
    matches.push(preset);
    presetMatchesByFormulaKey.set(parsedFormula.formulaKey, matches);
  });
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
    atomLegend: queryMoleculeElement(documentLike, "#molecule-atom-legend"),
    formula: queryMoleculeElement(documentLike, "#molecule-formula"),
    atomCount: queryMoleculeElement(documentLike, "#molecule-atom-count"),
    bondCount: queryMoleculeElement(documentLike, "#molecule-bond-count"),
    protonCount: queryMoleculeElement(documentLike, "#molecule-proton-count"),
    neutronCount: queryMoleculeElement(documentLike, "#molecule-neutron-count"),
    electronCount: queryMoleculeElement(documentLike, "#molecule-electron-count"),
    electrinoCount: queryMoleculeElement(documentLike, "#molecule-electrino-count"),
    positrinoCount: queryMoleculeElement(documentLike, "#molecule-positrino-count"),
    architrinoCount: queryMoleculeElement(documentLike, "#molecule-architrino-count"),
    sessionForm: queryMoleculeElement(documentLike, "#molecule-session-form"),
    sessionNameInput: queryMoleculeElement(documentLike, "#molecule-session-name"),
    sessionFormulaInput: queryMoleculeElement(documentLike, "#molecule-session-formula"),
    sessionAddButton: queryMoleculeElement(documentLike, ".molecule-session-add"),
    sessionStatus: queryMoleculeElement(documentLike, "#molecule-session-status"),
    sessionList: queryMoleculeElement(documentLike, "#molecule-session-list"),
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
  const sessionMolecules = [];
  const sessionById = new Map();

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
    nextSessionMoleculeNumber: 1,
    sessionLookupRequestNumber: 0,
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
  const aromaticBondMaterial = new THREE.MeshStandardMaterial({
    color: 0xdde5dd,
    metalness: 0.06,
    opacity: 0.64,
    roughness: 0.5,
    transparent: true,
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

  function updateAtomLegend(preset) {
    const counts = new Map();
    const atoms = Array.isArray(preset?.atoms) ? preset.atoms : [];
    atoms.forEach((atom) => {
      const symbol = normalizeElementSymbol(atom?.element);
      if (!symbol) {
        return;
      }
      counts.set(symbol, (counts.get(symbol) ?? 0) + 1);
    });

    dom.atomLegend.textContent = "";
    [...counts.entries()]
      .sort(([leftSymbol, leftCount], [rightSymbol, rightCount]) => {
        if (leftCount !== rightCount) {
          return rightCount - leftCount;
        }
        return leftSymbol.localeCompare(rightSymbol);
      })
      .forEach(([symbol, count]) => {
        const style = getElementRenderStyle(symbol);
        const chip = documentLike.createElement("span");
        chip.className = "molecule-atom-legend-chip";
        chip.title = `${style.name || symbol} ${symbol}`;

        const swatch = documentLike.createElement("span");
        swatch.className = "molecule-atom-legend-swatch";
        swatch.style.backgroundColor = style.color;
        swatch.style.borderColor = style.edgeColor;

        const label = documentLike.createElement("span");
        label.textContent = count > 1 ? `${symbol} ${count}` : symbol;
        chip.append(swatch, label);
        dom.atomLegend.append(chip);
      });
  }

  function updateReadout(preset) {
    const ledger = calculateMoleculeLedger(preset);
    dom.readout.classList.remove("is-atom-hover");
    setText(dom.title, preset.name);
    setText(dom.subtitle, preset.isSession ? `Session molecule · ${preset.formula}` : preset.formula);
    updateAtomLegend(preset);
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

    preset.bonds.forEach(([startIndex, endIndex, order]) => {
      const startAtom = preset.atoms[startIndex];
      const endAtom = preset.atoms[endIndex];
      if (!startAtom || !endAtom) {
        return;
      }
      moleculeGroup.add(
        createBondMesh(
          THREE,
          startAtom.position,
          endAtom.position,
          order,
          bondMaterial,
          aromaticBondMaterial
        )
      );
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
    const requestedId = String(presetId || "");
    const preset = presetById.get(requestedId) ?? sessionById.get(requestedId) ?? presets[0];
    if (!preset) {
      return;
    }
    drawPreset(preset);
  }

  function setSessionStatus(message, { isError = false } = {}) {
    dom.sessionStatus.textContent = message;
    dom.sessionStatus.classList.toggle("is-error", isError);
  }

  function setSessionLookupPending(isPending) {
    dom.sessionAddButton.disabled = isPending;
    dom.sessionFormulaInput.disabled = isPending;
    dom.sessionNameInput.disabled = isPending;
  }

  function getCurrentUrl() {
    try {
      return new URL(windowLike.location.href);
    } catch {
      return null;
    }
  }

  function updateSharedMoleculeUrl({ formula, name = "" }) {
    const url = getCurrentUrl();
    if (!url || typeof windowLike.history?.replaceState !== "function") {
      return;
    }
    url.searchParams.set("formula", formula);
    const normalizedName = formatMoleculeDisplayName(name);
    if (normalizedName) {
      url.searchParams.set("name", normalizedName);
    } else {
      url.searchParams.delete("name");
    }
    windowLike.history.replaceState(windowLike.history.state, "", url.href);
  }

  function clearSharedMoleculeUrl() {
    const url = getCurrentUrl();
    if (!url || typeof windowLike.history?.replaceState !== "function") {
      return;
    }
    url.searchParams.delete("formula");
    url.searchParams.delete("name");
    windowLike.history.replaceState(windowLike.history.state, "", url.href);
  }

  function getSharedMoleculeRequest() {
    const url = getCurrentUrl();
    const formula = url?.searchParams?.get("formula")?.trim() ?? "";
    if (!formula) {
      return null;
    }
    return {
      formula,
      name: url.searchParams.get("name") ?? "",
    };
  }

  async function fetchPubChemResource(url, readResponse) {
    if (typeof fetchImpl !== "function") {
      throw new Error("Molecule lookup is unavailable.");
    }

    const AbortControllerCtor =
      windowLike.AbortController ?? globalThis.AbortController ?? null;
    const abortController =
      typeof AbortControllerCtor === "function" ? new AbortControllerCtor() : null;
    const setTimeoutFn =
      typeof windowLike.setTimeout === "function"
        ? windowLike.setTimeout.bind(windowLike)
        : globalThis.setTimeout;
    const clearTimeoutFn =
      typeof windowLike.clearTimeout === "function"
        ? windowLike.clearTimeout.bind(windowLike)
        : globalThis.clearTimeout;
    const timeoutId =
      abortController && typeof setTimeoutFn === "function"
        ? setTimeoutFn(() => abortController.abort(), PUBCHEM_FETCH_TIMEOUT_MS)
        : null;

    try {
      const response = await fetchImpl(url, abortController ? { signal: abortController.signal } : undefined);
      if (!response || (typeof response.ok === "boolean" && !response.ok)) {
        const status = response?.status ? ` (${response.status})` : "";
        throw new Error(`PubChem request failed${status}.`);
      }
      return readResponse(response);
    } finally {
      if (timeoutId && typeof clearTimeoutFn === "function") {
        clearTimeoutFn(timeoutId);
      }
    }
  }

  function fetchPubChemJson(url) {
    return fetchPubChemResource(url, (response) => response.json());
  }

  function fetchPubChemText(url) {
    return fetchPubChemResource(url, (response) => response.text());
  }

  function getPubChemCids(payload) {
    const rawCids = Array.isArray(payload?.IdentifierList?.CID)
      ? payload.IdentifierList.CID
      : [];
    const seen = new Set();
    return rawCids
      .map((cid) => Number(cid))
      .filter((cid) => {
        if (!Number.isInteger(cid) || cid <= 0 || seen.has(cid)) {
          return false;
        }
        seen.add(cid);
        return true;
      });
  }

  function getPubChemProperties(payload) {
    return Array.isArray(payload?.PropertyTable?.Properties)
      ? payload.PropertyTable.Properties
          .map((property) => ({
            cid: Number(property?.CID),
            name: formatMoleculeDisplayName(property?.Title || property?.IUPACName || ""),
            formula: String(property?.MolecularFormula || "").trim(),
          }))
          .filter((property) => Number.isInteger(property.cid) && property.cid > 0)
      : [];
  }

  function selectPubChemProperty(properties, cidCandidates, parsedFormula) {
    const propertiesByCid = new Map(properties.map((property) => [property.cid, property]));
    const orderedProperties = cidCandidates
      .map((cid) => propertiesByCid.get(cid))
      .filter(Boolean);
    return (
      orderedProperties.find((property) => {
        const parsedPropertyFormula = parseFormulaInput(property.formula);
        return parsedPropertyFormula.ok && parsedPropertyFormula.formulaKey === parsedFormula.formulaKey;
      }) ??
      orderedProperties[0] ??
      null
    );
  }

  async function fetchPubChemStructure(cid) {
    for (const record of [
      { query: "3d", label: "3D" },
      { query: "2d", label: "2D" },
    ]) {
      try {
        const sdfText = await fetchPubChemText(
          `${PUBCHEM_BASE_URL}/cid/${cid}/SDF?record_type=${record.query}`
        );
        const structure = parseSdfMolecule(sdfText);
        if (structure?.atoms?.length) {
          return {
            ...structure,
            recordType: record.label,
          };
        }
      } catch {
        // Some compounds have no 3D conformer; try the next available structure record.
      }
    }
    return null;
  }

  async function lookupPubChemMolecule(parsedFormula) {
    const encodedFormula = encodeURIComponent(parsedFormula.formula);
    const cidPayload = await fetchPubChemJson(
      `${PUBCHEM_BASE_URL}/fastformula/${encodedFormula}/cids/JSON`
    );
    const allCidCandidates = getPubChemCids(cidPayload);
    if (!allCidCandidates.length) {
      return null;
    }

    const cidCandidates = allCidCandidates.slice(0, PUBCHEM_LOOKUP_CID_LIMIT);
    const propertyPayload = await fetchPubChemJson(
      `${PUBCHEM_BASE_URL}/cid/${cidCandidates.join(",")}/property/${PUBCHEM_PROPERTY_FIELDS}/JSON`
    );
    const property = selectPubChemProperty(
      getPubChemProperties(propertyPayload),
      cidCandidates,
      parsedFormula
    );
    if (!property) {
      return null;
    }

    const structure = await fetchPubChemStructure(property.cid);
    return {
      cid: property.cid,
      name: property.name || `PubChem CID ${property.cid}`,
      formula: parsedFormula.formula,
      atoms: structure?.atoms ?? null,
      bonds: structure?.bonds ?? null,
      recordType: structure?.recordType ?? "",
      candidateCount: allCidCandidates.length,
      checkedCandidateCount: cidCandidates.length,
    };
  }

  function getNextSessionMoleculeId() {
    const id = `${SESSION_MOLECULE_ID_PREFIX}-${state.nextSessionMoleculeNumber}`;
    state.nextSessionMoleculeNumber += 1;
    return id;
  }

  function createPresetButton(preset) {
    const button = documentLike.createElement("button");
    button.type = "button";
    button.className = "molecule-preset-button";
    if (preset.isSession) {
      button.classList.add("molecule-session-button");
    }
    button.dataset.presetId = preset.id;
    button.setAttribute("aria-pressed", "false");

    const label = documentLike.createElement("strong");
    label.textContent = preset.name;
    const meta = documentLike.createElement("span");
    meta.textContent = `${preset.formula || "formula"} · ${preset.atoms.length} atoms`;
    button.append(label, meta);
    button.addEventListener("click", () => {
      selectPreset(preset.id);
      if (preset.isSession) {
        updateSharedMoleculeUrl({ formula: preset.formula });
      } else {
        clearSharedMoleculeUrl();
      }
      setSessionStatus("");
    });
    presetButtons.set(preset.id, button);
    return button;
  }

  function renderSessionButtons() {
    sessionMolecules.forEach((preset) => {
      presetButtons.delete(preset.id);
    });
    dom.sessionList.textContent = "";
    sessionMolecules.forEach((preset) => {
      dom.sessionList.append(createPresetButton(preset));
    });
    if (state.activePreset) {
      updateReadout(state.activePreset);
    }
  }

  function renderPresetButtons() {
    dom.presetList.textContent = "";
    presetsByName.forEach((preset) => {
      dom.presetList.append(createPresetButton(preset));
    });
  }

  function createSessionMolecule({ name, formula, counts, source = SESSION_MOLECULE_SOURCE }) {
    const atoms = createSessionMoleculeAtoms(counts);
    return normalizePreset({
      id: getNextSessionMoleculeId(),
      name: formatMoleculeDisplayName(name) || `Session ${formula}`,
      formula,
      format: "formula-composition",
      source,
      isSession: true,
      atoms,
      bonds: createSessionMoleculeBonds(atoms),
    });
  }

  function createPubChemSessionMolecule({ name, formula, atoms, bonds, cid, recordType }) {
    return normalizePreset({
      id: getNextSessionMoleculeId(),
      name: formatMoleculeDisplayName(name) || `PubChem CID ${cid}`,
      formula,
      format: `pubchem-${String(recordType || "sdf").toLowerCase()}-sdf`,
      source: `PubChem CID ${cid}; ${recordType || "SDF"} SDF`,
      isSession: true,
      atoms,
      bonds,
    });
  }

  function addSessionMolecule(sessionMolecule, { shareName = "" } = {}) {
    sessionMolecules.push(sessionMolecule);
    sessionById.set(sessionMolecule.id, sessionMolecule);
    renderSessionButtons();
    selectPreset(sessionMolecule.id);
    updateSharedMoleculeUrl({ formula: sessionMolecule.formula, name: shareName });
    dom.sessionFormulaInput.value = "";
    dom.sessionNameInput.value = "";
  }

  async function resolveSessionMoleculeRequest({
    formulaInput,
    nameInput = "",
    pendingMessage = "Looking up molecule...",
    presetMatchPrefix = "Matched preset",
  }) {
    const parsedFormula = parseFormulaInput(formulaInput);
    if (!parsedFormula.ok) {
      setSessionStatus(parsedFormula.message, { isError: true });
      return false;
    }
    const requestedName = formatMoleculeDisplayName(nameInput);

    const presetMatches = presetMatchesByFormulaKey.get(parsedFormula.formulaKey) ?? [];
    if (presetMatches.length) {
      const matchedPreset = [...presetMatches].sort((left, right) =>
        left.name.localeCompare(right.name, undefined, { sensitivity: "base" })
      )[0];
      selectPreset(matchedPreset.id);
      updateSharedMoleculeUrl({ formula: parsedFormula.formula, name: requestedName });
      setSessionStatus(
        presetMatches.length > 1
          ? `${presetMatchPrefix}: opened ${matchedPreset.name}.`
          : `${presetMatchPrefix}: ${matchedPreset.name}.`
      );
      dom.sessionFormulaInput.value = "";
      dom.sessionNameInput.value = "";
      return true;
    }

    const lookupRequestNumber = state.sessionLookupRequestNumber + 1;
    state.sessionLookupRequestNumber = lookupRequestNumber;
    setSessionLookupPending(true);
    setSessionStatus(pendingMessage);

    try {
      const pubChemMatch = await lookupPubChemMolecule(parsedFormula);
      if (lookupRequestNumber !== state.sessionLookupRequestNumber) {
        return false;
      }

      if (pubChemMatch?.atoms?.length) {
        const displayName = requestedName || pubChemMatch.name;
        const sessionMolecule = createPubChemSessionMolecule({
          name: displayName,
          formula: pubChemMatch.formula,
          atoms: pubChemMatch.atoms,
          bonds: pubChemMatch.bonds,
          cid: pubChemMatch.cid,
          recordType: pubChemMatch.recordType,
        });
        addSessionMolecule(sessionMolecule, { shareName: requestedName });
        setSessionStatus(`PubChem match: ${pubChemMatch.name} (CID ${pubChemMatch.cid}).`);
        return true;
      }

      const fallbackMolecule = createSessionMolecule({
        name: requestedName || pubChemMatch?.name || "",
        formula: parsedFormula.formula,
        counts: parsedFormula.counts,
        source: pubChemMatch?.cid
          ? `PubChem CID ${pubChemMatch.cid}; ${SESSION_MOLECULE_SOURCE}`
          : SESSION_MOLECULE_SOURCE,
      });
      addSessionMolecule(fallbackMolecule, { shareName: requestedName });
      setSessionStatus(
        pubChemMatch?.name
          ? `Found name: ${pubChemMatch.name}; rendered formula composition.`
          : `Added session molecule: ${fallbackMolecule.name}.`
      );
      return true;
    } catch (error) {
      if (lookupRequestNumber !== state.sessionLookupRequestNumber) {
        return false;
      }
      console.warn("[MoleculeRuntime] PubChem lookup failed", error);
      const fallbackMolecule = createSessionMolecule({
        name: requestedName,
        formula: parsedFormula.formula,
        counts: parsedFormula.counts,
      });
      addSessionMolecule(fallbackMolecule, { shareName: requestedName });
      setSessionStatus(`Lookup unavailable; added session molecule: ${fallbackMolecule.name}.`);
      return true;
    } finally {
      if (lookupRequestNumber === state.sessionLookupRequestNumber) {
        setSessionLookupPending(false);
      }
    }
  }

  async function handleSessionSubmit(event) {
    event.preventDefault();
    await resolveSessionMoleculeRequest({
      formulaInput: dom.sessionFormulaInput.value,
      nameInput: dom.sessionNameInput.value,
    });
  }

  async function loadSharedMoleculeFromUrl() {
    const sharedRequest = getSharedMoleculeRequest();
    if (!sharedRequest) {
      return;
    }
    await resolveSessionMoleculeRequest({
      formulaInput: sharedRequest.formula,
      nameInput: sharedRequest.name,
      pendingMessage: "Loading shared molecule...",
      presetMatchPrefix: "Shared molecule matched preset",
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
    presetButtons.clear();
    renderPresetButtons();
    dom.canvas.style.cursor = "grab";
    dom.canvas.addEventListener("pointerdown", handlePointerDown);
    dom.canvas.addEventListener("pointermove", handlePointerMove);
    dom.canvas.addEventListener("pointerup", handlePointerUp);
    dom.canvas.addEventListener("pointercancel", handlePointerUp);
    dom.canvas.addEventListener("pointerleave", handlePointerLeave);
    dom.canvas.addEventListener("wheel", handleWheel, { passive: false });
    dom.homeButton.addEventListener("click", navigateHome);
    dom.sessionForm.addEventListener("submit", handleSessionSubmit);
    windowLike.addEventListener("resize", resize);
    resize();
    selectPreset(presetById.has(DEFAULT_PRESET_ID) ? DEFAULT_PRESET_ID : presets[0].id);
    loadSharedMoleculeFromUrl().catch((error) => {
      console.warn("[MoleculeRuntime] Failed to load shared molecule", error);
    });
  }

  function destroy() {
    windowLike.removeEventListener("resize", resize);
    dom.canvas.removeEventListener("pointerdown", handlePointerDown);
    dom.canvas.removeEventListener("pointermove", handlePointerMove);
    dom.canvas.removeEventListener("pointerup", handlePointerUp);
    dom.canvas.removeEventListener("pointercancel", handlePointerUp);
    dom.canvas.removeEventListener("pointerleave", handlePointerLeave);
    dom.canvas.removeEventListener("wheel", handleWheel);
    dom.sessionForm.removeEventListener("submit", handleSessionSubmit);
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
      activeBondOrders: Array.isArray(state.activePreset?.bonds)
        ? state.activePreset.bonds.map((bond) => normalizeBondOrder(bond?.[2]))
        : [],
      cameraDistance: state.cameraDistance,
      presetCount: presets.length,
      sessionMoleculeCount: sessionMolecules.length,
    }),
  };
}
