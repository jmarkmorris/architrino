import * as THREE from "../../../vendor/three/three.module.js";
import { createAnimatorDefaultCoreSpec } from "../animator/AnimatorDraftScaffoldRuntime.js";
import { createAnimatorStructureGeometryRuntime } from "../animator/AnimatorStructureGeometryRuntime.js";

const BINARY_META = [
  { id: "inner", label: "Inner", color: "#7dd3fc" },
  { id: "middle", label: "Middle", color: "#fbbf24" },
  { id: "outer", label: "Outer", color: "#f472b6" },
];

const STANDARD_POSITRINO_COLOR = "#ff0000";
const STANDARD_ELECTRINO_COLOR = "#0000ff";
const NEUTRAL_PATH_COLOR = "#800080";

const CHARGE_META = {
  positrino: { q: 1, color: STANDARD_POSITRINO_COLOR },
  electrino: { q: -1, color: STANDARD_ELECTRINO_COLOR },
};
const CHARGE_TYPES = ["positrino", "electrino"];

const ORBIT_PATH_SEGMENTS = 192;
const SURFACE_LATITUDE_COUNT = 25;
const SURFACE_LONGITUDE_COUNT = 48;
const AXIS_REFERENCE_CIRCLE_SEGMENTS = 48;
const TWO_PI = Math.PI * 2;
const QUARTER_TURN = Math.PI / 2;

const ORBIT_PATH_TINT_PROFILES = {
  inner: { forwardSpan: Math.PI / 4, backwardSpan: Math.PI / 4, falloff: 2.1 },
  middle: { forwardSpan: 0, backwardSpan: QUARTER_TURN, falloff: 1.15 },
  outer: { forwardSpan: QUARTER_TURN, backwardSpan: Math.PI / 6, falloff: 1.05 },
};
const ORBIT_PATH_EMPHASIS_SEGMENTS = 22;
const ORBIT_PATH_EMPHASIS_LAYERS = [
  { coverage: 1, opacity: 0.22, radiusOffsetFactor: 0 },
  { coverage: 0.62, opacity: 0.28, radiusOffsetFactor: -0.012 },
  { coverage: 0.62, opacity: 0.28, radiusOffsetFactor: 0.012 },
  { coverage: 0.32, opacity: 0.34, radiusOffsetFactor: 0 },
];

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatFixed(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return value.toFixed(digits);
}

function formatScientific(value) {
  if (!Number.isFinite(value) || value === 0) {
    return "0.00";
  }
  const absValue = Math.abs(value);
  if (absValue >= 1000 || absValue < 0.01) {
    return value.toExponential(2);
  }
  return value.toFixed(3);
}

function normalizeViewId(value) {
  const normalized = String(value ?? "all").trim().toLowerCase();
  return ["all", "inner", "middle", "outer"].includes(normalized) ? normalized : "all";
}

function wrapSignedAngle(value) {
  return ((((value + Math.PI) % TWO_PI) + TWO_PI) % TWO_PI) - Math.PI;
}

function getMotionAngle(motion, chargeType, timeSeconds) {
  const frequency = Number(motion?.frequencyHz ?? 0.25);
  const phase = Number(motion?.phase ?? 0);
  const direction = motion?.direction === "cw" ? -1 : 1;
  const phaseOffset = chargeType === "electrino" ? Math.PI : 0;
  return phase + phaseOffset + direction * timeSeconds * TWO_PI * frequency;
}

export function getOrbitPathTintProfile(binaryId) {
  return ORBIT_PATH_TINT_PROFILES[binaryId] ?? ORBIT_PATH_TINT_PROFILES.middle;
}

export function createIdealCoreModel(options = {}) {
  const Three = options.THREE ?? THREE;
  const coreSpec = options.coreSpec ?? createAnimatorDefaultCoreSpec("ideal_core");
  const geometryRuntime =
    options.geometryRuntime ?? createAnimatorStructureGeometryRuntime({ THREE: Three });
  const binaries = coreSpec.binaries.map((binary, index) => {
    const meta = BINARY_META[index] ?? {
      id: `binary_${index + 1}`,
      label: `Binary ${index + 1}`,
      color: "#cbd5e1",
    };
    const motion = binary.motion ?? {};
    const basis = geometryRuntime.getAnimatorOrbitBasis(motion);
    const radius = Number(motion.radius ?? 1) || 1;
    const frequencyHz = Number(motion.frequencyHz ?? 0.2) || 0.2;
    return {
      ...meta,
      binaryIndex: index,
      motion,
      basis,
      radius,
      frequencyHz,
      speed: radius * TWO_PI * frequencyHz,
    };
  });

  const architrinos = binaries.flatMap((binary) =>
    ["positrino", "electrino"].map((chargeType) => {
      const chargeMeta = CHARGE_META[chargeType];
      return {
        id: `${binary.id}_${chargeType}`,
        binaryId: binary.id,
        binaryLabel: binary.label,
        chargeType,
        q: chargeMeta.q,
        color: chargeMeta.color,
        motion: binary.motion,
        positionAt(timeSeconds) {
          return geometryRuntime.getAnimatorOrbitOffsetAtTime(
            binary.motion,
            chargeType,
            timeSeconds
          );
        },
        velocityAt(timeSeconds) {
          const angle = getMotionAngle(binary.motion, chargeType, timeSeconds);
          const direction = binary.motion?.direction === "cw" ? -1 : 1;
          const omega = direction * TWO_PI * binary.frequencyHz;
          return binary.basis.u
            .clone()
            .multiplyScalar(-Math.sin(angle) * binary.radius * omega)
            .add(
              binary.basis.v
                .clone()
                .multiplyScalar(Math.cos(angle) * binary.radius * omega)
            );
        },
      };
    })
  );

  return {
    coreSpec,
    binaries,
    architrinos,
  };
}

export function solveFlightTime(samplePoint, architrino, observationTime, options = {}) {
  const fieldSpeed = Math.max(0.001, Number(options.fieldSpeed ?? 6) || 6);
  const iterations = Math.max(1, Math.round(Number(options.iterations ?? 4) || 4));
  let tau = samplePoint.distanceTo(architrino.positionAt(observationTime)) / fieldSpeed;
  for (let index = 0; index < iterations; index += 1) {
    const emittedPosition = architrino.positionAt(observationTime - tau);
    tau = samplePoint.distanceTo(emittedPosition) / fieldSpeed;
  }
  return tau;
}

export function computePotentialContribution(samplePoint, architrino, observationTime, options = {}) {
  const fieldSpeed = Math.max(0.001, Number(options.fieldSpeed ?? 6) || 6);
  const normalization = Number(options.normalization ?? 1) || 1;
  const softening = Math.max(0.0001, Number(options.softening ?? 0.08) || 0.08);
  const tau = Number.isFinite(options.flightTime)
    ? Number(options.flightTime)
    : solveFlightTime(samplePoint, architrino, observationTime, options);
  const emissionTime = observationTime - tau;
  const emittedPosition = architrino.positionAt(emissionTime);
  const displacement = samplePoint.clone().sub(emittedPosition);
  const distance = Math.max(0.0001, displacement.length());
  let denominator = Math.sqrt(distance * distance + softening * softening);
  if (options.useCausalDenominator) {
    const direction = displacement.clone().multiplyScalar(1 / distance);
    const velocity = architrino.velocityAt(emissionTime);
    const kappa = 1 - direction.dot(velocity) / fieldSpeed;
    denominator *= Math.max(0.08, Math.abs(kappa));
  }
  return {
    potential: (normalization * architrino.q) / denominator,
    tau,
    distance,
    emissionTime,
  };
}

export function getSelectedArchitrinos(model, viewId) {
  const selectedView = normalizeViewId(viewId);
  if (selectedView === "all") {
    return model.architrinos;
  }
  return model.architrinos.filter((architrino) => architrino.binaryId === selectedView);
}

export function computePotentialSum(samplePoint, model, viewId, observationTime, options = {}) {
  const selectedArchitrinos = getSelectedArchitrinos(model, viewId);
  const contributions = selectedArchitrinos.map((architrino) =>
    computePotentialContribution(samplePoint, architrino, observationTime, options)
  );
  return {
    potential: contributions.reduce((sum, contribution) => sum + contribution.potential, 0),
    contributions,
  };
}

function createOrbitPathLine(Three, binary) {
  const vertexCount = ORBIT_PATH_SEGMENTS * 2;
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const angles = new Float32Array(vertexCount);
  const geometry = new Three.BufferGeometry();

  function writeVertex(vertexIndex, angle) {
    writeOrbitPathPosition(positions, vertexIndex, binary, angle, binary.radius);
    angles[vertexIndex] = angle;
  }

  for (let index = 0; index < ORBIT_PATH_SEGMENTS; index += 1) {
    const startAngle = (index / ORBIT_PATH_SEGMENTS) * TWO_PI;
    const endAngle = ((index + 1) / ORBIT_PATH_SEGMENTS) * TWO_PI;
    writeVertex(index * 2, startAngle);
    writeVertex(index * 2 + 1, endAngle);
  }

  geometry.setAttribute("position", new Three.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Three.BufferAttribute(colors, 3));
  const material = new Three.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.78,
    vertexColors: true,
    depthWrite: false,
  });
  const line = new Three.LineSegments(geometry, material);
  line.userData.binary = binary;
  line.userData.angles = angles;
  line.userData.colors = colors;
  return line;
}

function writeOrbitPathPosition(positions, vertexIndex, binary, angle, radius) {
  const cos = Math.cos(angle) * radius;
  const sin = Math.sin(angle) * radius;
  positions[vertexIndex * 3] = binary.basis.u.x * cos + binary.basis.v.x * sin;
  positions[vertexIndex * 3 + 1] = binary.basis.u.y * cos + binary.basis.v.y * sin;
  positions[vertexIndex * 3 + 2] = binary.basis.u.z * cos + binary.basis.v.z * sin;
}

function colorForOrbitPathAngle(Three, binary, angle, timeSeconds) {
  const direction = binary.motion?.direction === "cw" ? -1 : 1;
  const profile = getOrbitPathTintProfile(binary.id);
  const neutral = new Three.Color(NEUTRAL_PATH_COLOR);
  const influences = CHARGE_TYPES.map((chargeType) => {
    const chargeAngle = getMotionAngle(binary.motion, chargeType, timeSeconds);
    const signedTravelDistance = wrapSignedAngle(angle - chargeAngle) * direction;
    const distance = Math.abs(signedTravelDistance);
    const span = signedTravelDistance > 0 ? profile.forwardSpan : profile.backwardSpan;
    const rawWeight = distance >= span ? 0 : 1 - distance / Math.max(0.0001, span);
    return {
      chargeType,
      weight: Math.pow(rawWeight, profile.falloff),
    };
  });
  const strongest = influences.reduce(
    (selected, influence) => (influence.weight > selected.weight ? influence : selected),
    { chargeType: "positrino", weight: 0 }
  );
  if (strongest.weight <= 0) {
    return neutral;
  }
  const chargeColor =
    strongest.chargeType === "electrino"
      ? new Three.Color(STANDARD_ELECTRINO_COLOR)
      : new Three.Color(STANDARD_POSITRINO_COLOR);
  return neutral.lerp(chargeColor, strongest.weight);
}

function updateOrbitPathColors(Three, pathLine, timeSeconds) {
  const binary = pathLine.userData.binary;
  const angles = pathLine.userData.angles;
  const colors = pathLine.userData.colors;
  angles.forEach((angle, index) => {
    const color = colorForOrbitPathAngle(Three, binary, angle, timeSeconds);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  });
  pathLine.geometry.attributes.color.needsUpdate = true;
}

function createOrbitPathEmphasisLine(Three, binary, layer) {
  const maxArcCount = 4;
  const vertexCount = maxArcCount * ORBIT_PATH_EMPHASIS_SEGMENTS * 2;
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const geometry = new Three.BufferGeometry();
  geometry.setAttribute("position", new Three.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Three.BufferAttribute(colors, 3));
  geometry.setDrawRange(0, 0);
  const material = new Three.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: layer.opacity,
    vertexColors: true,
    depthWrite: false,
  });
  const line = new Three.LineSegments(geometry, material);
  line.frustumCulled = false;
  line.userData.binary = binary;
  line.userData.layer = layer;
  line.userData.positions = positions;
  line.userData.colors = colors;
  return line;
}

function createOrbitPathVisual(Three, binary) {
  const group = new Three.Group();
  const baseLine = createOrbitPathLine(Three, binary);
  const emphasisLines = ORBIT_PATH_EMPHASIS_LAYERS.map((layer) =>
    createOrbitPathEmphasisLine(Three, binary, layer)
  );
  group.add(baseLine);
  emphasisLines.forEach((line) => group.add(line));
  group.userData.pathLine = baseLine;
  group.userData.emphasisLines = emphasisLines;
  return group;
}

function updateOrbitPathEmphasisLine(Three, line, timeSeconds) {
  const binary = line.userData.binary;
  const layer = line.userData.layer;
  const positions = line.userData.positions;
  const colors = line.userData.colors;
  const profile = getOrbitPathTintProfile(binary.id);
  const direction = binary.motion?.direction === "cw" ? -1 : 1;
  const radius = binary.radius * (1 + layer.radiusOffsetFactor);
  let vertexIndex = 0;

  function writeArc(chargeAngle, travelSign, span) {
    if (span <= 0) {
      return;
    }
    const coveredSpan = span * layer.coverage;
    function writeVertexAtTravelDistance(travelDistance) {
      const angle = chargeAngle + travelDistance * direction;
      const color = colorForOrbitPathAngle(Three, binary, angle, timeSeconds);
      writeOrbitPathPosition(positions, vertexIndex, binary, angle, radius);
      colors[vertexIndex * 3] = color.r;
      colors[vertexIndex * 3 + 1] = color.g;
      colors[vertexIndex * 3 + 2] = color.b;
      vertexIndex += 1;
    }

    for (let segmentIndex = 0; segmentIndex < ORBIT_PATH_EMPHASIS_SEGMENTS; segmentIndex += 1) {
      const startDistance =
        travelSign * (segmentIndex / ORBIT_PATH_EMPHASIS_SEGMENTS) * coveredSpan;
      const endDistance =
        travelSign * ((segmentIndex + 1) / ORBIT_PATH_EMPHASIS_SEGMENTS) * coveredSpan;
      writeVertexAtTravelDistance(startDistance);
      writeVertexAtTravelDistance(endDistance);
    }
  }

  CHARGE_TYPES.forEach((chargeType) => {
    const chargeAngle = getMotionAngle(binary.motion, chargeType, timeSeconds);
    writeArc(chargeAngle, 1, profile.forwardSpan);
    writeArc(chargeAngle, -1, profile.backwardSpan);
  });

  line.geometry.setDrawRange(0, vertexIndex);
  line.geometry.attributes.position.needsUpdate = true;
  line.geometry.attributes.color.needsUpdate = true;
}

function updateOrbitPathVisual(Three, pathVisual, timeSeconds) {
  updateOrbitPathColors(Three, pathVisual.userData.pathLine, timeSeconds);
  pathVisual.userData.emphasisLines.forEach((line) => {
    updateOrbitPathEmphasisLine(Three, line, timeSeconds);
  });
}

function createShellLine(Three, radius, color, opacity) {
  const geometry = new Three.SphereGeometry(radius, 36, 18);
  const material = new Three.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  return new Three.Mesh(geometry, material);
}

function createAxisReferenceGroup(Three) {
  const group = new Three.Group();
  const axisPositions = new Float32Array(6 * 3);
  const axisGeometry = new Three.BufferGeometry();
  axisGeometry.setAttribute("position", new Three.BufferAttribute(axisPositions, 3));
  const material = new Three.LineBasicMaterial({
    color: "#f8fafc",
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  group.add(new Three.LineSegments(axisGeometry, material));

  const circles = Array.from({ length: 6 }, () => {
    const positions = new Float32Array(AXIS_REFERENCE_CIRCLE_SEGMENTS * 3);
    const geometry = new Three.BufferGeometry();
    geometry.setAttribute("position", new Three.BufferAttribute(positions, 3));
    const line = new Three.LineLoop(geometry, material);
    group.add(line);
    return { geometry, positions };
  });

  group.userData.axisPositions = axisPositions;
  group.userData.axisGeometry = axisGeometry;
  group.userData.circles = circles;
  return group;
}

function updateAxisReferenceGroup(Three, group, radius) {
  const axisPositions = group.userData.axisPositions;
  const axisGeometry = group.userData.axisGeometry;
  const circleRadius = Math.max(0.07, radius * 0.045);
  const axes = [
    {
      axis: new Three.Vector3(1, 0, 0),
      circleU: new Three.Vector3(0, 1, 0),
      circleV: new Three.Vector3(0, 0, 1),
    },
    {
      axis: new Three.Vector3(0, 1, 0),
      circleU: new Three.Vector3(1, 0, 0),
      circleV: new Three.Vector3(0, 0, 1),
    },
    {
      axis: new Three.Vector3(0, 0, 1),
      circleU: new Three.Vector3(1, 0, 0),
      circleV: new Three.Vector3(0, 1, 0),
    },
  ];
  let axisOffset = 0;
  let circleIndex = 0;

  function pushAxisPoint(point) {
    axisPositions[axisOffset] = point.x;
    axisPositions[axisOffset + 1] = point.y;
    axisPositions[axisOffset + 2] = point.z;
    axisOffset += 3;
  }

  function pushAxisSegment(start, end) {
    pushAxisPoint(start);
    pushAxisPoint(end);
  }

  axes.forEach(({ axis, circleU, circleV }) => {
    pushAxisSegment(axis.clone().multiplyScalar(-radius), axis.clone().multiplyScalar(radius));
    [-1, 1].forEach((direction) => {
      const center = axis.clone().multiplyScalar(direction * radius);
      const circle = group.userData.circles[circleIndex];
      circleIndex += 1;
      for (let index = 0; index < AXIS_REFERENCE_CIRCLE_SEGMENTS; index += 1) {
        const angle = (index / AXIS_REFERENCE_CIRCLE_SEGMENTS) * TWO_PI;
        const point = center
          .clone()
          .add(circleU.clone().multiplyScalar(Math.cos(angle) * circleRadius))
          .add(circleV.clone().multiplyScalar(Math.sin(angle) * circleRadius));
        circle.positions[index * 3] = point.x;
        circle.positions[index * 3 + 1] = point.y;
        circle.positions[index * 3 + 2] = point.z;
      }
      circle.geometry.attributes.position.needsUpdate = true;
      circle.geometry.computeBoundingSphere();
    });
  });

  axisGeometry.attributes.position.needsUpdate = true;
  axisGeometry.computeBoundingSphere();
}

function createSurfaceSamples(Three) {
  const samples = [];
  for (let latIndex = 0; latIndex < SURFACE_LATITUDE_COUNT; latIndex += 1) {
    const theta = (latIndex / (SURFACE_LATITUDE_COUNT - 1)) * Math.PI;
    const y = Math.cos(theta);
    const ring = Math.sin(theta);
    for (let lonIndex = 0; lonIndex < SURFACE_LONGITUDE_COUNT; lonIndex += 1) {
      const phi = (lonIndex / SURFACE_LONGITUDE_COUNT) * TWO_PI;
      samples.push({
        unit: new Three.Vector3(ring * Math.cos(phi), y, ring * Math.sin(phi)),
        phi,
      });
    }
  }
  return samples;
}

function colorForPotential(Three, value, maxAbs) {
  const positive = new Three.Color(STANDARD_POSITRINO_COLOR);
  const negative = new Three.Color(STANDARD_ELECTRINO_COLOR);
  const normalized = clampNumber(value / Math.max(0.0001, maxAbs), -1, 1);
  return new Three.Color().lerpColors(negative, positive, (normalized + 1) / 2);
}

function colorToCanvasFill(color) {
  return `rgb(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(
    color.b * 255
  )})`;
}

function makeMaterial(Three, color, options = {}) {
  const material = new Three.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: options.opacity ?? 1,
  });
  material.depthWrite = options.depthWrite ?? false;
  return material;
}

function queryRequiredElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing ideal-core prototype element: ${selector}`);
  }
  return element;
}

export function mountIdealCorePrototype(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const Three = options.THREE ?? THREE;
  const canvas = queryRequiredElement(documentLike, "#ideal-core-canvas");
  const model = createIdealCoreModel({ THREE: Three });
  const renderer = new Three.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(Math.min(2, windowLike.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);

  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 6.7);
  camera.lookAt(0, 0, 0);

  const sphereContents = new Three.Group();
  scene.add(sphereContents);

  const shellGroup = new Three.Group();
  model.coreSpec.shells.slice(0, 3).forEach((shell) => {
    shellGroup.add(createShellLine(Three, shell.radius, shell.color, Math.max(0.04, shell.opacity)));
  });
  sphereContents.add(shellGroup);

  const pathGroup = new Three.Group();
  model.binaries.forEach((binary) => {
    pathGroup.add(createOrbitPathVisual(Three, binary));
  });
  sphereContents.add(pathGroup);

  const architrinoGeometry = new Three.SphereGeometry(0.0375, 18, 14);
  const architrinoMeshes = model.architrinos.map((architrino) => {
    const mesh = new Three.Mesh(
      architrinoGeometry,
      makeMaterial(Three, architrino.color, { opacity: 0.96 })
    );
    mesh.userData.architrino = architrino;
    sphereContents.add(mesh);
    return mesh;
  });

  const surfaceSamples = createSurfaceSamples(Three);
  const surfacePositions = new Float32Array(surfaceSamples.length * 3);
  const surfaceColors = new Float32Array(surfaceSamples.length * 3);
  const surfaceGeometry = new Three.BufferGeometry();
  surfaceGeometry.setAttribute("position", new Three.BufferAttribute(surfacePositions, 3));
  surfaceGeometry.setAttribute("color", new Three.BufferAttribute(surfaceColors, 3));
  const surfaceMaterial = new Three.PointsMaterial({
    size: 0.022,
    transparent: true,
    opacity: 0.88,
    vertexColors: true,
    depthWrite: false,
  });
  const surfacePoints = new Three.Points(surfaceGeometry, surfaceMaterial);
  sphereContents.add(surfacePoints);

  const axisReferenceGroup = createAxisReferenceGroup(Three);
  sphereContents.add(axisReferenceGroup);

  const dom = {
    viewButtons: [...documentLike.querySelectorAll("[data-view]")],
    pathToggle: queryRequiredElement(documentLike, "#ideal-core-path-toggle"),
    surfaceToggle: queryRequiredElement(documentLike, "#ideal-core-surface-toggle"),
    axesToggle: queryRequiredElement(documentLike, "#ideal-core-axes-toggle"),
    freezeToggle: queryRequiredElement(documentLike, "#ideal-core-freeze-toggle"),
    resetButton: queryRequiredElement(documentLike, "#ideal-core-reset-button"),
    focusButton: queryRequiredElement(documentLike, "#ideal-core-focus-button"),
    radiusInput: queryRequiredElement(documentLike, "#ideal-core-radius-input"),
    radiusOutput: queryRequiredElement(documentLike, "#ideal-core-radius-output"),
    speedInput: queryRequiredElement(documentLike, "#ideal-core-speed-input"),
    speedOutput: queryRequiredElement(documentLike, "#ideal-core-speed-output"),
    viewLabel: queryRequiredElement(documentLike, "#ideal-core-view-label"),
    rangeLabel: queryRequiredElement(documentLike, "#ideal-core-range-label"),
    sampleLabel: queryRequiredElement(documentLike, "#ideal-core-sample-label"),
    stripCanvas: queryRequiredElement(documentLike, "#ideal-core-potential-strip"),
    tableBody: queryRequiredElement(documentLike, "#ideal-core-table-body"),
  };
  const stripContext = dom.stripCanvas.getContext("2d");

  const state = {
    view: "all",
    pathsVisible: true,
    surfaceVisible: true,
    axesVisible: true,
    frozen: false,
    radius: Number(dom.radiusInput.value) || 1.62,
    speed: Number(dom.speedInput.value) || 1,
    modelTime: 0,
    lastFrameTime: performance.now(),
    dragging: false,
    lastPointer: { x: 0, y: 0 },
    surfaceRange: { min: 0, max: 0, maxAbs: 1 },
    samplePotential: 0,
  };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function setButtonActive(button, active) {
    button.classList.toggle("is-active", !!active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  }

  function syncControls() {
    dom.viewButtons.forEach((button) => {
      setButtonActive(button, button.dataset.view === state.view);
    });
    setButtonActive(dom.pathToggle, state.pathsVisible);
    setButtonActive(dom.surfaceToggle, state.surfaceVisible);
    setButtonActive(dom.axesToggle, state.axesVisible);
    setButtonActive(dom.freezeToggle, state.frozen);
    dom.freezeToggle.textContent = state.frozen ? "Resume" : "Freeze";
    dom.radiusOutput.value = formatFixed(state.radius, 2);
    dom.speedOutput.value = formatFixed(state.speed, 2);
    dom.viewLabel.textContent =
      BINARY_META.find((binary) => binary.id === state.view)?.label ?? "Full";
    dom.rangeLabel.textContent = `${formatScientific(state.surfaceRange.min)} to ${formatScientific(
      state.surfaceRange.max
    )}`;
    dom.sampleLabel.textContent = formatScientific(state.samplePotential);
  }

  function updateArchitrinoMeshes() {
    architrinoMeshes.forEach((mesh) => {
      const architrino = mesh.userData.architrino;
      mesh.position.copy(architrino.positionAt(state.modelTime));
      const isSelected = state.view === "all" || architrino.binaryId === state.view;
      mesh.scale.setScalar(isSelected ? 1.18 : 0.74);
      mesh.material.opacity = isSelected ? 0.96 : 0.32;
    });
  }

  function updateOrbitPaths() {
    pathGroup.children.forEach((pathVisual) => {
      updateOrbitPathVisual(Three, pathVisual, state.modelTime);
    });
  }

  function updateSurface() {
    const potentials = surfaceSamples.map((sample, sampleIndex) => {
      const position = sample.unit.clone().multiplyScalar(state.radius);
      surfacePositions[sampleIndex * 3] = position.x;
      surfacePositions[sampleIndex * 3 + 1] = position.y;
      surfacePositions[sampleIndex * 3 + 2] = position.z;
      return computePotentialSum(position, model, state.view, state.modelTime, {
        fieldSpeed: 6,
        softening: 0.1,
      }).potential;
    });
    const maxAbs = Math.max(0.0001, ...potentials.map((value) => Math.abs(value)));
    const min = Math.min(...potentials);
    const max = Math.max(...potentials);
    potentials.forEach((potential, index) => {
      const color = colorForPotential(Three, potential, maxAbs);
      surfaceColors[index * 3] = color.r;
      surfaceColors[index * 3 + 1] = color.g;
      surfaceColors[index * 3 + 2] = color.b;
    });
    surfaceGeometry.attributes.position.needsUpdate = true;
    surfaceGeometry.attributes.color.needsUpdate = true;
    surfaceGeometry.computeBoundingSphere();
    state.surfaceRange = { min, max, maxAbs };
    state.samplePotential = computePotentialSum(
      new Three.Vector3(state.radius, 0, 0),
      model,
      state.view,
      state.modelTime,
      { fieldSpeed: 6, softening: 0.1 }
    ).potential;
  }

  function updateAxisReference() {
    updateAxisReferenceGroup(Three, axisReferenceGroup, state.radius);
  }

  function drawPotentialStrip() {
    if (!stripContext) {
      return;
    }
    const width = dom.stripCanvas.width;
    const height = dom.stripCanvas.height;
    stripContext.clearRect(0, 0, width, height);
    stripContext.fillStyle = "rgba(2, 6, 23, 0.78)";
    stripContext.fillRect(0, 0, width, height);
    const values = [];
    for (let x = 0; x < width; x += 1) {
      const phi = (x / Math.max(1, width - 1)) * TWO_PI;
      const sample = new Three.Vector3(
        Math.cos(phi) * state.radius,
        0,
        Math.sin(phi) * state.radius
      );
      values.push(
        computePotentialSum(sample, model, state.view, state.modelTime, {
          fieldSpeed: 6,
          softening: 0.1,
        }).potential
      );
    }
    const maxAbs = Math.max(0.0001, ...values.map((value) => Math.abs(value)));
    values.forEach((value, x) => {
      stripContext.fillStyle = colorToCanvasFill(colorForPotential(Three, value, maxAbs));
      stripContext.fillRect(x, 0, 1, height);
    });
    stripContext.strokeStyle = "rgba(238, 243, 255, 0.5)";
    stripContext.lineWidth = 1;
    stripContext.beginPath();
    stripContext.moveTo(0, height / 2);
    stripContext.lineTo(width, height / 2);
    stripContext.stroke();
  }

  function renderTable() {
    const rows = [
      {
        label: "Path radius",
        values: model.binaries.map((binary) => formatFixed(binary.radius, 2)),
      },
      {
        label: "Path frequency",
        values: model.binaries.map((binary) => `${formatFixed(binary.frequencyHz, 2)} Hz`),
      },
      {
        label: "Architrino velocity",
        values: model.binaries.map((binary) => formatFixed(binary.speed, 2)),
      },
      {
        label: "Phase",
        values: model.binaries.map((binary) => {
          const degrees = ((state.modelTime * binary.frequencyHz * 360) % 360 + 360) % 360;
          return `${formatFixed(degrees, 0)} deg`;
        }),
      },
    ];
    dom.tableBody.innerHTML = rows
      .map(
        (row) =>
          `<tr><td>${row.label}</td>${row.values.map((value) => `<td>${value}</td>`).join("")}</tr>`
      )
      .join("");
  }

  function updateVisibility() {
    pathGroup.visible = state.pathsVisible;
    surfacePoints.visible = state.surfaceVisible;
    axisReferenceGroup.visible = state.axesVisible;
  }

  function resetRotation() {
    sphereContents.rotation.set(-0.18, 0.36, 0.04);
  }

  function setFrozen(frozen) {
    state.frozen = !!frozen;
    syncControls();
  }

  function toggleFrozen() {
    setFrozen(!state.frozen);
  }

  function renderFrame(now) {
    const deltaSeconds = Math.min(0.05, Math.max(0, (now - state.lastFrameTime) / 1000));
    state.lastFrameTime = now;
    if (!state.frozen) {
      state.modelTime += deltaSeconds * state.speed;
    }
    updateVisibility();
    updateOrbitPaths();
    updateArchitrinoMeshes();
    updateSurface();
    updateAxisReference();
    drawPotentialStrip();
    renderTable();
    syncControls();
    renderer.render(scene, camera);
    windowLike.requestAnimationFrame(renderFrame);
  }

  dom.viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = normalizeViewId(button.dataset.view);
      syncControls();
      canvas.focus();
    });
  });
  dom.pathToggle.addEventListener("click", () => {
    state.pathsVisible = !state.pathsVisible;
    syncControls();
    canvas.focus();
  });
  dom.surfaceToggle.addEventListener("click", () => {
    state.surfaceVisible = !state.surfaceVisible;
    syncControls();
    canvas.focus();
  });
  dom.axesToggle.addEventListener("click", () => {
    state.axesVisible = !state.axesVisible;
    syncControls();
    canvas.focus();
  });
  dom.freezeToggle.addEventListener("click", () => {
    toggleFrozen();
    canvas.focus();
  });
  dom.radiusInput.addEventListener("input", () => {
    state.radius = Number(dom.radiusInput.value) || state.radius;
    syncControls();
  });
  dom.speedInput.addEventListener("input", () => {
    state.speed = Number(dom.speedInput.value) || state.speed;
    syncControls();
  });
  dom.resetButton.addEventListener("click", () => {
    resetRotation();
    canvas.focus();
  });
  dom.focusButton.addEventListener("click", () => {
    canvas.focus();
  });

  canvas.addEventListener("pointerdown", (event) => {
    state.dragging = true;
    state.lastPointer = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture?.(event.pointerId);
    canvas.focus();
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging) {
      return;
    }
    const dx = event.clientX - state.lastPointer.x;
    const dy = event.clientY - state.lastPointer.y;
    sphereContents.rotation.y += dx * 0.008;
    sphereContents.rotation.x += dy * 0.008;
    state.lastPointer = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointerup", (event) => {
    state.dragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
  });
  canvas.addEventListener("pointercancel", () => {
    state.dragging = false;
  });
  canvas.addEventListener("keydown", (event) => {
    const rotationStep = event.shiftKey ? 0.16 : 0.08;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      sphereContents.rotation.y -= rotationStep;
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      sphereContents.rotation.y += rotationStep;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      sphereContents.rotation.x -= rotationStep;
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      sphereContents.rotation.x += rotationStep;
    } else if (event.key.toLowerCase() === "q") {
      event.preventDefault();
      sphereContents.rotation.z += rotationStep;
    } else if (event.key.toLowerCase() === "e") {
      event.preventDefault();
      sphereContents.rotation.z -= rotationStep;
    } else if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetRotation();
    } else if (event.key === " ") {
      event.preventDefault();
      toggleFrozen();
    }
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resetRotation();
  resize();
  syncControls();
  canvas.focus();
  windowLike.requestAnimationFrame(renderFrame);

  return {
    model,
    state,
    scene,
    camera,
    renderer,
    sphereContents,
    destroy() {
      resizeObserver.disconnect();
      renderer.dispose();
    },
  };
}
