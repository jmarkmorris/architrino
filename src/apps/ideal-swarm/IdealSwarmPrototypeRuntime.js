import * as THREE from "../../../vendor/three/three.module.js";
import { createMarkdownRuntime } from "../../runtime/MarkdownRuntime.js";
import { extractMarkdownSection } from "../../services/MarkdownPolicyService.js";
import { createAnimatorDefaultCoreSpec } from "../animator/AnimatorDraftScaffoldRuntime.js";
import { createAnimatorStructureGeometryRuntime } from "../animator/AnimatorStructureGeometryRuntime.js";
import {
  getFieldSpeedRegimeLabel,
  getOrbitPathBranchGain,
  getOrbitPathTintProfile as resolveOrbitPathTintProfile,
} from "./IdealSwarmPathPotentialProfile.js";

const BINARY_META = [
  {
    id: "inner",
    label: "Inner",
    color: "#7dd3fc",
    shellColor: "#8fb6d8",
  },
  {
    id: "middle",
    label: "Middle",
    color: "#fbbf24",
    shellColor: "#c4cbd4",
  },
  {
    id: "outer",
    label: "Outer",
    color: "#f472b6",
    shellColor: "#c9b7d8",
  },
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
const LORENTZ_BETA_MAX = 1;
const LORENTZ_CHART_GAMMA_CAP = 6;
const FIELD_SPEED_REFERENCE_BINARY_INDEX = 1;
const SHELL_SURFACE_BASE_OPACITY = 0.007;
const SHELL_SURFACE_RIM_OPACITY = 0.16;
const SHELL_SURFACE_RIM_POWER = 3.2;
const ORBIT_PATH_LOG_WIDTH_FLOOR = 0.78;
const ORBIT_PATH_TRAIL_SEGMENTS = 30;
const ORBIT_PATH_TRAIL_MAX_ARCS = CHARGE_TYPES.length;
const ASSEMBLY_MOMENTUM_AXIS_COMPONENT = 1 / Math.sqrt(3);
const ASSEMBLY_MOMENTUM_AXIS = new THREE.Vector3(
  ASSEMBLY_MOMENTUM_AXIS_COMPONENT,
  ASSEMBLY_MOMENTUM_AXIS_COMPONENT,
  ASSEMBLY_MOMENTUM_AXIS_COMPONENT
);
const IDEAL_SWARM_DOCS = {
  notes: {
    name: "Ideal Swarm Guide",
    markdownPath: "content/markdown/aaa/archie/ideal-swarm-notes.md",
    markdownColumns: 1,
  },
  returnCycle: {
    name: "Return-Cycle Lorentz Quantization",
    markdownPath:
      "content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md",
    markdownColumns: 1,
  },
  lorentzKinematics: {
    name: "Lorentz Kinematics",
    markdownPath: "content/markdown/aaa/spacetime/lorentz-kinematics.md",
    markdownColumns: 1,
  },
};
const ORBIT_PATH_TRAIL_LAYERS = [
  {
    role: "headlamp-glow",
    travelSign: 1,
    coverage: 1.12,
    opacity: 0.38,
    widthFactor: 0.12,
    minWidth: 0.08,
    maxWidth: 0.16,
    tailWidthFactor: 0.04,
    alphaFalloff: 1.45,
    widthFalloff: 1.25,
    edgeAlpha: 0.05,
  },
  {
    role: "headlamp-core",
    travelSign: 1,
    coverage: 0.66,
    opacity: 0.86,
    widthFactor: 0.046,
    minWidth: 0.034,
    maxWidth: 0.064,
    tailWidthFactor: 0.02,
    alphaFalloff: 2.35,
    widthFalloff: 1.8,
    edgeAlpha: 0.18,
  },
  {
    role: "wake-glow",
    travelSign: -1,
    pathRole: "wake",
    coverage: 0.72,
    opacity: 0.32,
    widthFactor: 0.072,
    minWidth: 0.04,
    maxWidth: 0.13,
    tailWidthFactor: 0.5,
    alphaFalloff: 0.9,
    widthFalloff: 0.45,
    edgeAlpha: 0.06,
  },
  {
    role: "wake-core",
    travelSign: -1,
    pathRole: "wake",
    coverage: 0.9,
    opacity: 0.46,
    widthFactor: 0.046,
    minWidth: 0.028,
    maxWidth: 0.07,
    tailWidthFactor: 0.32,
    alphaFalloff: 1.2,
    widthFalloff: 0.65,
    edgeAlpha: 0.14,
  },
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

function formatSignedFixed(value, digits = 4) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  const threshold = 1 / 10 ** digits;
  const normalized = Math.abs(value) < threshold ? 0 : value;
  return normalized.toFixed(digits);
}

function formatLimitFixed(value, digits = 2) {
  if (value === Infinity) {
    return "infinite";
  }
  if (value === -Infinity) {
    return "-infinite";
  }
  if (!Number.isFinite(value)) {
    return "undefined";
  }
  return formatFixed(value, digits);
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

export function computeLorentzState(beta, radius) {
  const rawBeta = Number(beta);
  const normalizedBeta = clampNumber(Number.isFinite(rawBeta) ? rawBeta : 0, 0, LORENTZ_BETA_MAX);
  const isLightSpeedLimit = normalizedBeta >= 1;
  const referenceRadius = Math.max(0.0001, Number(radius) || 1);
  const gamma = isLightSpeedLimit
    ? Infinity
    : 1 / Math.sqrt(1 - normalizedBeta * normalizedBeta);
  const xi = isLightSpeedLimit ? 0 : 1 / gamma;
  const restMass = 1;
  const restEnergy = restMass;
  const movementEnergy = isLightSpeedLimit ? Infinity : gamma - restEnergy;
  const movementMassEquivalent = movementEnergy;
  const totalEnergy = gamma * restEnergy;
  const totalMassEquivalent = totalEnergy;
  const rPerp = referenceRadius;
  const rParallel = rPerp * xi;
  const tPlus = isLightSpeedLimit ? Infinity : rParallel / (1 - normalizedBeta);
  const tMinus = isLightSpeedLimit ? 0 : rParallel / (1 + normalizedBeta);
  const tParallel = isLightSpeedLimit ? Infinity : tPlus + tMinus;
  const tPerp = isLightSpeedLimit ? Infinity : 2 * rPerp * gamma;
  return {
    beta: normalizedBeta,
    gamma,
    xi,
    rPerp,
    rParallel,
    timeRatio: gamma,
    lengthRatio: xi,
    restEnergyShareFactor: xi,
    restMass,
    restEnergy,
    movementEnergy,
    movementMassEquivalent,
    totalEnergy,
    totalMassEquivalent,
    tPlus,
    tMinus,
    tParallel,
    tPerp,
    closureResidual: isLightSpeedLimit ? 0 : tParallel - tPerp,
    isLightSpeedLimit,
  };
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

function computePathSpeed(radius, frequencyHz) {
  return radius * TWO_PI * frequencyHz;
}

function resolveFieldSpeedReference(binaries) {
  return binaries[FIELD_SPEED_REFERENCE_BINARY_INDEX] ?? binaries[0] ?? null;
}

function updateBinaryFieldSpeedRatios(binaries) {
  const referenceBinary = resolveFieldSpeedReference(binaries);
  const fieldSpeed = Math.max(0.0001, Number(referenceBinary?.speed) || 1);
  binaries.forEach((binary) => {
    binary.fieldSpeed = fieldSpeed;
    binary.fieldSpeedRatio = binary.speed / fieldSpeed;
    binary.fieldSpeedRegime = getFieldSpeedRegimeLabel(binary.fieldSpeedRatio);
  });
  return fieldSpeed;
}

export function getOrbitPathTintProfile(binaryOrId) {
  return resolveOrbitPathTintProfile(binaryOrId);
}

function cloneOrbitBasis(basis) {
  return {
    normal: basis.normal.clone(),
    u: basis.u.clone(),
    v: basis.v.clone(),
  };
}

export function computeLorentzAlignedOrbitBasis(Three, restBasis, lorentzState) {
  const xi = clampNumber(Number(lorentzState?.xi ?? 1) || 0, 0, 1);
  const targetNormal = restBasis.normal
    .clone()
    .multiplyScalar(xi)
    .add(ASSEMBLY_MOMENTUM_AXIS.clone().multiplyScalar(1 - xi));
  if (targetNormal.lengthSq() <= 0.000001) {
    targetNormal.copy(restBasis.normal);
  }
  targetNormal.normalize();
  const rotation = new Three.Quaternion().setFromUnitVectors(restBasis.normal, targetNormal);
  return {
    normal: targetNormal,
    u: restBasis.u.clone().applyQuaternion(rotation).normalize(),
    v: restBasis.v.clone().applyQuaternion(rotation).normalize(),
  };
}

export function computeAssemblyMomentumContractionMatrix(Three, lorentzState) {
  const xi = clampNumber(Number(lorentzState?.xi ?? 1) || 0, 0, 1);
  const k = xi - 1;
  const { x, y, z } = ASSEMBLY_MOMENTUM_AXIS;
  return new Three.Matrix4().set(
    1 + k * x * x,
    k * x * y,
    k * x * z,
    0,
    k * y * x,
    1 + k * y * y,
    k * y * z,
    0,
    k * z * x,
    k * z * y,
    1 + k * z * z,
    0,
    0,
    0,
    0,
    1
  );
}

function setBinaryOrbitBasis(binary, basis) {
  binary.basis.normal.copy(basis.normal);
  binary.basis.u.copy(basis.u);
  binary.basis.v.copy(basis.v);
}

function getOrbitPathLogWidthScale(radius, referenceRadius) {
  const normalizedRadius = clampNumber(radius / Math.max(0.0001, referenceRadius), 0, 1);
  const compressedRadius = Math.log1p(normalizedRadius * 3) / Math.log1p(3);
  return ORBIT_PATH_LOG_WIDTH_FLOOR + (1 - ORBIT_PATH_LOG_WIDTH_FLOOR) * compressedRadius;
}

export function createIdealSwarmModel(options = {}) {
  const Three = options.THREE ?? THREE;
  const coreSpec = options.coreSpec ?? createAnimatorDefaultCoreSpec("ideal_swarm");
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
    const speed = computePathSpeed(radius, frequencyHz);
    return {
      ...meta,
      binaryIndex: index,
      motion,
      basis,
      restBasis: cloneOrbitBasis(basis),
      radius,
      frequencyHz,
      speed,
      fieldSpeed: 1,
      fieldSpeedRatio: 1,
      fieldSpeedRegime: "field speed",
    };
  });
  const fieldSpeed = updateBinaryFieldSpeedRatios(binaries);
  const orbitPathReferenceRadius = Math.max(0.0001, ...binaries.map((binary) => binary.radius));
  binaries.forEach((binary) => {
    binary.orbitRadiusFraction = binary.radius / orbitPathReferenceRadius;
    binary.orbitPathReferenceRadius = orbitPathReferenceRadius;
    binary.orbitPathWidthScale = getOrbitPathLogWidthScale(
      binary.radius,
      orbitPathReferenceRadius
    );
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
        get fieldSpeedRatio() {
          return binary.fieldSpeedRatio;
        },
        get fieldSpeedRegime() {
          return binary.fieldSpeedRegime;
        },
        positionAt(timeSeconds) {
          const angle = getMotionAngle(binary.motion, chargeType, timeSeconds);
          return binary.basis.u
            .clone()
            .multiplyScalar(Math.cos(angle) * binary.radius)
            .add(binary.basis.v.clone().multiplyScalar(Math.sin(angle) * binary.radius));
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
    fieldSpeed,
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

export function computePotentialSum(samplePoint, model, observationTime, options = {}) {
  const contributions = model.architrinos.map((architrino) =>
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
    opacity: 0.62,
    vertexColors: true,
    depthWrite: false,
  });
  const line = new Three.LineSegments(geometry, material);
  line.renderOrder = 8;
  line.userData.binary = binary;
  line.userData.positions = positions;
  line.userData.angles = angles;
  line.userData.colors = colors;
  return line;
}

function updateOrbitPathLineGeometry(line) {
  const binary = line.userData.binary;
  const positions = line.userData.positions;
  const angles = line.userData.angles;
  if (!binary || !positions || !angles) {
    return;
  }
  for (let vertexIndex = 0; vertexIndex < angles.length; vertexIndex += 1) {
    writeOrbitPathPosition(positions, vertexIndex, binary, angles[vertexIndex], binary.radius);
  }
  line.geometry.attributes.position.needsUpdate = true;
  line.geometry.computeBoundingSphere();
}

function writeOrbitPathPosition(positions, vertexIndex, binary, angle, radius) {
  const cos = Math.cos(angle) * radius;
  const sin = Math.sin(angle) * radius;
  positions[vertexIndex * 3] = binary.basis.u.x * cos + binary.basis.v.x * sin;
  positions[vertexIndex * 3 + 1] = binary.basis.u.y * cos + binary.basis.v.y * sin;
  positions[vertexIndex * 3 + 2] = binary.basis.u.z * cos + binary.basis.v.z * sin;
}

function setOrbitPathPoint(target, binary, angle, radius) {
  const cos = Math.cos(angle) * radius;
  const sin = Math.sin(angle) * radius;
  return target.set(
    binary.basis.u.x * cos + binary.basis.v.x * sin,
    binary.basis.u.y * cos + binary.basis.v.y * sin,
    binary.basis.u.z * cos + binary.basis.v.z * sin
  );
}

function setOrbitPathTangent(target, binary, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return target
    .set(
      binary.basis.u.x * -sin + binary.basis.v.x * cos,
      binary.basis.u.y * -sin + binary.basis.v.y * cos,
      binary.basis.u.z * -sin + binary.basis.v.z * cos
    )
    .normalize();
}

function colorForChargeType(Three, chargeType, weight = 1) {
  const neutral = new Three.Color(NEUTRAL_PATH_COLOR);
  const chargeColor =
    chargeType === "electrino"
      ? new Three.Color(STANDARD_ELECTRINO_COLOR)
      : new Three.Color(STANDARD_POSITRINO_COLOR);
  return neutral.lerp(chargeColor, clampNumber(weight, 0, 1));
}

function colorForOrbitPathAngle(Three, binary, angle, timeSeconds) {
  const direction = binary.motion?.direction === "cw" ? -1 : 1;
  const profile = resolveOrbitPathTintProfile(binary);
  const neutral = new Three.Color(NEUTRAL_PATH_COLOR);
  const influences = CHARGE_TYPES.map((chargeType) => {
    const chargeAngle = getMotionAngle(binary.motion, chargeType, timeSeconds);
    const signedTravelDistance = wrapSignedAngle(angle - chargeAngle) * direction;
    const distance = Math.abs(signedTravelDistance);
    const span = signedTravelDistance > 0 ? profile.forwardSpan : profile.backwardSpan;
    const rawWeight = distance >= span ? 0 : 1 - distance / Math.max(0.0001, span);
    const branchGain = signedTravelDistance > 0 ? profile.forwardGain : profile.backwardGain;
    return {
      chargeType,
      weight: clampNumber(Math.pow(rawWeight, profile.falloff) * branchGain, 0, 1),
    };
  });
  const strongest = influences.reduce(
    (selected, influence) => (influence.weight > selected.weight ? influence : selected),
    { chargeType: "positrino", weight: 0 }
  );
  if (strongest.weight <= 0) {
    return neutral;
  }
  return colorForChargeType(Three, strongest.chargeType, strongest.weight);
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

function createOrbitPathTrailMaterial(Three, opacity) {
  return new Three.ShaderMaterial({
    uniforms: {
      opacity: { value: opacity },
    },
    vertexShader: `
      attribute vec3 color;
      attribute float trailAlpha;
      varying vec3 vColor;
      varying float vTrailAlpha;

      void main() {
        vColor = color;
        vTrailAlpha = trailAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float opacity;
      varying vec3 vColor;
      varying float vTrailAlpha;

      void main() {
        gl_FragColor = vec4(vColor, opacity * vTrailAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: Three.DoubleSide,
  });
}

function createOrbitPathTrailRibbon(Three, binary, layer) {
  const vertexCount = ORBIT_PATH_TRAIL_MAX_ARCS * (ORBIT_PATH_TRAIL_SEGMENTS + 1) * 3;
  const indexCount = ORBIT_PATH_TRAIL_MAX_ARCS * ORBIT_PATH_TRAIL_SEGMENTS * 12;
  const positions = new Float32Array(vertexCount * 3);
  const colors = new Float32Array(vertexCount * 3);
  const alphas = new Float32Array(vertexCount);
  const indices = new Uint16Array(indexCount);
  const geometry = new Three.BufferGeometry();
  geometry.setAttribute("position", new Three.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Three.BufferAttribute(colors, 3));
  geometry.setAttribute("trailAlpha", new Three.BufferAttribute(alphas, 1));
  geometry.setIndex(new Three.BufferAttribute(indices, 1));
  geometry.setDrawRange(0, 0);
  const mesh = new Three.Mesh(geometry, createOrbitPathTrailMaterial(Three, layer.opacity));
  mesh.frustumCulled = false;
  mesh.renderOrder = 9;
  mesh.userData.binary = binary;
  mesh.userData.layer = layer;
  mesh.userData.positions = positions;
  mesh.userData.colors = colors;
  mesh.userData.alphas = alphas;
  mesh.userData.indices = indices;
  mesh.userData.scratch = {
    center: new Three.Vector3(),
    tangentLocal: new Three.Vector3(),
    tangentWorld: new Three.Vector3(),
    sideWorld: new Three.Vector3(),
    sideLocal: new Three.Vector3(),
    worldPoint: new Three.Vector3(),
    cameraWorld: new Three.Vector3(),
    cameraDirection: new Three.Vector3(),
    localFromWorld: new Three.Matrix4(),
  };
  return mesh;
}

function createOrbitPathVisual(Three, binary) {
  const group = new Three.Group();
  const baseLine = createOrbitPathLine(Three, binary);
  const trailRibbons = ORBIT_PATH_TRAIL_LAYERS.map((layer) =>
    createOrbitPathTrailRibbon(Three, binary, layer)
  );
  group.add(baseLine);
  trailRibbons.forEach((mesh) => group.add(mesh));
  group.userData.pathLine = baseLine;
  group.userData.trailRibbons = trailRibbons;
  return group;
}

function updateOrbitPathTrailRibbon(Three, mesh, timeSeconds, camera) {
  const binary = mesh.userData.binary;
  const layer = mesh.userData.layer;
  const positions = mesh.userData.positions;
  const colors = mesh.userData.colors;
  const alphas = mesh.userData.alphas;
  const indices = mesh.userData.indices;
  const scratch = mesh.userData.scratch;
  const profile = resolveOrbitPathTintProfile(binary);
  const direction = binary.motion?.direction === "cw" ? -1 : 1;
  const branchGain = getOrbitPathBranchGain(profile, layer.travelSign);
  const branchAlphaGain = clampNumber(branchGain, 0.2, 1.55);
  let pathWidthScale = 1;
  if (layer.travelSign > 0) {
    pathWidthScale = Number(profile.forwardWidthScale ?? 1);
  } else if (layer.pathRole === "wake") {
    pathWidthScale = Number(profile.wakeWidthScale ?? 1);
  }
  const branchWidthGain = (0.88 + branchAlphaGain * 0.12) * pathWidthScale;
  const referenceRadius = Number(binary.orbitPathReferenceRadius ?? binary.radius);
  const referenceWidth = clampNumber(
    referenceRadius * layer.widthFactor,
    layer.minWidth,
    layer.maxWidth
  );
  const headWidth = clampNumber(
    referenceWidth * Number(binary.orbitPathWidthScale ?? 1),
    layer.minWidth,
    layer.maxWidth
  );
  const tailWidth = headWidth * layer.tailWidthFactor;
  let vertexIndex = 0;
  let indexOffset = 0;

  camera.updateWorldMatrix(true, false);
  mesh.updateWorldMatrix(true, false);
  camera.getWorldPosition(scratch.cameraWorld);
  scratch.localFromWorld.copy(mesh.matrixWorld).invert();

  function writeTrailVertex(center, sideLocal, widthOffset, alpha, color) {
    positions[vertexIndex * 3] = center.x + sideLocal.x * widthOffset;
    positions[vertexIndex * 3 + 1] = center.y + sideLocal.y * widthOffset;
    positions[vertexIndex * 3 + 2] = center.z + sideLocal.z * widthOffset;
    colors[vertexIndex * 3] = color.r;
    colors[vertexIndex * 3 + 1] = color.g;
    colors[vertexIndex * 3 + 2] = color.b;
    alphas[vertexIndex] = alpha;
    vertexIndex += 1;
  }

  function writeTrailSample(angle, trailProgress) {
    const tailProgress = clampNumber(trailProgress, 0, 1);
    const headProgress = 1 - tailProgress;
    const alpha = clampNumber(
      Math.pow(headProgress, layer.alphaFalloff) * branchAlphaGain,
      0,
      1
    );
    const width =
      (tailWidth + (headWidth - tailWidth) * Math.pow(headProgress, layer.widthFalloff)) *
      branchWidthGain;
    const color = colorForOrbitPathAngle(Three, binary, angle, timeSeconds);

    setOrbitPathPoint(scratch.center, binary, angle, binary.radius);
    setOrbitPathTangent(scratch.tangentLocal, binary, angle);
    scratch.worldPoint.copy(scratch.center).applyMatrix4(mesh.matrixWorld);
    scratch.tangentWorld.copy(scratch.tangentLocal).transformDirection(mesh.matrixWorld);
    scratch.cameraDirection.copy(scratch.cameraWorld).sub(scratch.worldPoint).normalize();
    scratch.sideWorld.crossVectors(scratch.tangentWorld, scratch.cameraDirection);
    if (scratch.sideWorld.lengthSq() < 0.0001) {
      scratch.sideWorld.copy(binary.basis.normal).transformDirection(mesh.matrixWorld);
    }
    scratch.sideLocal
      .copy(scratch.sideWorld.normalize())
      .transformDirection(scratch.localFromWorld)
      .normalize();

    writeTrailVertex(
      scratch.center,
      scratch.sideLocal,
      width * -0.5,
      alpha * layer.edgeAlpha,
      color
    );
    writeTrailVertex(scratch.center, scratch.sideLocal, 0, alpha, color);
    writeTrailVertex(
      scratch.center,
      scratch.sideLocal,
      width * 0.5,
      alpha * layer.edgeAlpha,
      color
    );
  }

  function writeArc(chargeAngle, travelSign, span) {
    if (span <= 0) {
      return;
    }
    const coveredSpan = span * layer.coverage;
    const arcVertexStart = vertexIndex;

    for (let sampleIndex = 0; sampleIndex <= ORBIT_PATH_TRAIL_SEGMENTS; sampleIndex += 1) {
      const trailProgress = sampleIndex / ORBIT_PATH_TRAIL_SEGMENTS;
      const travelDistance = travelSign * trailProgress * coveredSpan;
      writeTrailSample(chargeAngle + travelDistance * direction, trailProgress);
    }

    for (let segmentIndex = 0; segmentIndex < ORBIT_PATH_TRAIL_SEGMENTS; segmentIndex += 1) {
      const vertexA = arcVertexStart + segmentIndex * 3;
      const vertexB = vertexA + 1;
      const vertexC = vertexA + 2;
      const vertexD = vertexA + 3;
      const vertexE = vertexA + 4;
      const vertexF = vertexA + 5;
      indices[indexOffset] = vertexA;
      indices[indexOffset + 1] = vertexD;
      indices[indexOffset + 2] = vertexB;
      indices[indexOffset + 3] = vertexB;
      indices[indexOffset + 4] = vertexD;
      indices[indexOffset + 5] = vertexE;
      indices[indexOffset + 6] = vertexB;
      indices[indexOffset + 7] = vertexE;
      indices[indexOffset + 8] = vertexC;
      indices[indexOffset + 9] = vertexC;
      indices[indexOffset + 10] = vertexE;
      indices[indexOffset + 11] = vertexF;
      indexOffset += 12;
    }
  }

  CHARGE_TYPES.forEach((chargeType) => {
    const chargeAngle = getMotionAngle(binary.motion, chargeType, timeSeconds);
    const span = layer.travelSign > 0 ? profile.forwardSpan : profile.backwardSpan;
    writeArc(chargeAngle, layer.travelSign, span);
  });

  mesh.geometry.setDrawRange(0, indexOffset);
  mesh.geometry.attributes.position.needsUpdate = true;
  mesh.geometry.attributes.color.needsUpdate = true;
  mesh.geometry.attributes.trailAlpha.needsUpdate = true;
  mesh.geometry.index.needsUpdate = true;
}

function updateOrbitPathVisual(Three, pathVisual, timeSeconds, camera) {
  updateOrbitPathLineGeometry(pathVisual.userData.pathLine);
  updateOrbitPathColors(Three, pathVisual.userData.pathLine, timeSeconds);
  pathVisual.userData.trailRibbons.forEach((mesh) => {
    updateOrbitPathTrailRibbon(Three, mesh, timeSeconds, camera);
  });
}

function createShellSurfaceMaterial(Three, color) {
  return new Three.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: Three.DoubleSide,
    uniforms: {
      shellColor: { value: new Three.Color(color) },
      baseOpacity: { value: SHELL_SURFACE_BASE_OPACITY },
      rimOpacity: { value: SHELL_SURFACE_RIM_OPACITY },
      rimPower: { value: SHELL_SURFACE_RIM_POWER },
    },
    vertexShader: `
      varying vec3 vNormalView;
      varying vec3 vViewDirection;

      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vNormalView = normalize(normalMatrix * normal);
        vViewDirection = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 shellColor;
      uniform float baseOpacity;
      uniform float rimOpacity;
      uniform float rimPower;
      varying vec3 vNormalView;
      varying vec3 vViewDirection;

      void main() {
        float facing = abs(dot(normalize(vNormalView), normalize(vViewDirection)));
        float rim = pow(1.0 - facing, rimPower);
        float alpha = baseOpacity + rimOpacity * rim;
        gl_FragColor = vec4(shellColor, alpha);
      }
    `,
  });
}

function createShellSurface(Three, radius, color) {
  const geometry = new Three.SphereGeometry(1, 48, 24);
  const mesh = new Three.Mesh(geometry, createShellSurfaceMaterial(Three, color));
  mesh.renderOrder = 1;
  mesh.scale.setScalar(radius);
  return mesh;
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

function makeArchitrinoMaterial(Three, color) {
  const material = new Three.MeshBasicMaterial({ color });
  material.depthTest = false;
  material.depthWrite = false;
  return material;
}

function queryRequiredElement(documentLike, selector) {
  const element = documentLike.querySelector(selector);
  if (!element) {
    throw new Error(`Missing ideal-swarm prototype element: ${selector}`);
  }
  return element;
}

function appendIdealSwarmCacheBust(path, token) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${token}`;
}

function createIdealSwarmMarkdownRenderer(windowLike) {
  const markdownItFactory = windowLike?.markdownit;
  if (typeof markdownItFactory !== "function") {
    return null;
  }
  const markdownRenderer = markdownItFactory({ html: false, linkify: true, breaks: false });
  markdownRenderer.disable("escape");
  return markdownRenderer;
}

function createIdealSwarmMarkdownRuntime({
  documentLike,
  windowLike,
  markdownPanel,
  markdownTitle,
  markdownBody,
  markdownLayoutToggle,
}) {
  const markdownCache = new Map();
  const markdownSectionCache = new Map();
  const cacheBustToken = Date.now().toString();
  let markdownRuntime = null;

  const openMarkdownTarget = async (target) => {
    if (!markdownRuntime || typeof target !== "string") {
      return;
    }
    await markdownRuntime.showMarkdownPanel({
      id: target,
      name: "Guide",
      markdownColumns: 2,
    });
  };

  markdownRuntime = createMarkdownRuntime({
    markdownPanel,
    markdownTitle,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: createIdealSwarmMarkdownRenderer(windowLike),
    markdownCache,
    markdownSectionCache,
    extractMarkdownSection,
    appendCacheBust: (path) => appendIdealSwarmCacheBust(path, cacheBustToken),
    navigateToTarget: openMarkdownTarget,
  });

  markdownPanel.inert = true;
  return markdownRuntime;
}

export function mountIdealSwarmPrototype(options = {}) {
  const documentLike = options.documentLike ?? globalThis.document;
  const windowLike = options.windowLike ?? globalThis.window;
  const Three = options.THREE ?? THREE;
  const canvas = queryRequiredElement(documentLike, "#ideal-swarm-canvas");
  const model = createIdealSwarmModel({ THREE: Three });
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

  const coreFrame = new Three.Group();
  scene.add(coreFrame);

  const sphereContents = new Three.Group();
  sphereContents.matrixAutoUpdate = false;
  coreFrame.add(sphereContents);

  const shellGroup = new Three.Group();
  model.binaries.forEach((binary) => {
    const shellSurface = createShellSurface(
      Three,
      binary.radius,
      binary.shellColor ?? binary.color
    );
    shellSurface.userData.binary = binary;
    shellSurface.userData.binaryId = binary.id;
    shellGroup.add(shellSurface);
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
      makeArchitrinoMaterial(Three, architrino.color)
    );
    mesh.renderOrder = 12;
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
    pathToggle: queryRequiredElement(documentLike, "#ideal-swarm-path-toggle"),
    surfaceToggle: queryRequiredElement(documentLike, "#ideal-swarm-surface-toggle"),
    axesToggle: queryRequiredElement(documentLike, "#ideal-swarm-axes-toggle"),
    freezeToggle: queryRequiredElement(documentLike, "#ideal-swarm-freeze-toggle"),
    resetButton: queryRequiredElement(documentLike, "#ideal-swarm-reset-button"),
    focusButton: queryRequiredElement(documentLike, "#ideal-swarm-focus-button"),
    returnCycleDocButton: queryRequiredElement(
      documentLike,
      "#ideal-swarm-return-cycle-doc-button"
    ),
    notesDocButton: queryRequiredElement(documentLike, "#ideal-swarm-notes-doc-button"),
    lorentzDocButton: queryRequiredElement(documentLike, "#ideal-swarm-lorentz-doc-button"),
    radiusInput: queryRequiredElement(documentLike, "#ideal-swarm-radius-input"),
    radiusOutput: queryRequiredElement(documentLike, "#ideal-swarm-radius-output"),
    betaInput: queryRequiredElement(documentLike, "#ideal-swarm-beta-input"),
    betaOutput: queryRequiredElement(documentLike, "#ideal-swarm-beta-output"),
    speedInput: queryRequiredElement(documentLike, "#ideal-swarm-speed-input"),
    speedOutput: queryRequiredElement(documentLike, "#ideal-swarm-speed-output"),
    timeLabel: queryRequiredElement(documentLike, "#ideal-swarm-time-label"),
    lengthLabel: queryRequiredElement(documentLike, "#ideal-swarm-length-label"),
    restMassLabel: queryRequiredElement(documentLike, "#ideal-swarm-rest-mass-label"),
    restEnergyLabel: queryRequiredElement(documentLike, "#ideal-swarm-rest-energy-label"),
    movementEnergyLabel: queryRequiredElement(
      documentLike,
      "#ideal-swarm-movement-energy-label"
    ),
    movementMassLabel: queryRequiredElement(documentLike, "#ideal-swarm-movement-mass-label"),
    totalEnergyLabel: queryRequiredElement(documentLike, "#ideal-swarm-total-energy-label"),
    totalMassLabel: queryRequiredElement(documentLike, "#ideal-swarm-total-mass-label"),
    gammaEquation: queryRequiredElement(documentLike, "#ideal-swarm-gamma-equation"),
    xiEquation: queryRequiredElement(documentLike, "#ideal-swarm-xi-equation"),
    rParallelEquation: queryRequiredElement(documentLike, "#ideal-swarm-rparallel-equation"),
    tParallelEquation: queryRequiredElement(documentLike, "#ideal-swarm-tparallel-equation"),
    tPerpEquation: queryRequiredElement(documentLike, "#ideal-swarm-tperp-equation"),
    closureEquation: queryRequiredElement(documentLike, "#ideal-swarm-closure-equation"),
    stripCanvas: queryRequiredElement(documentLike, "#ideal-swarm-potential-strip"),
    tableBody: queryRequiredElement(documentLike, "#ideal-swarm-table-body"),
    markdownPanel: queryRequiredElement(documentLike, "#markdown-panel"),
    markdownTitle: queryRequiredElement(documentLike, "#markdown-title"),
    markdownBody: queryRequiredElement(documentLike, "#markdown-body"),
    markdownClose: queryRequiredElement(documentLike, "#markdown-close"),
    markdownLayoutToggle: queryRequiredElement(documentLike, "#markdown-layout-toggle"),
    markdownPdfButton: queryRequiredElement(documentLike, "#markdown-pdf-button"),
  };
  const stripContext = dom.stripCanvas.getContext("2d");
  const markdownRuntime = createIdealSwarmMarkdownRuntime({
    documentLike,
    windowLike,
    markdownPanel: dom.markdownPanel,
    markdownTitle: dom.markdownTitle,
    markdownBody: dom.markdownBody,
    markdownLayoutToggle: dom.markdownLayoutToggle,
  });

  const state = {
    pathsVisible: true,
    surfaceVisible: true,
    axesVisible: true,
    frozen: false,
    radius: Number(dom.radiusInput.value) || 1.62,
    beta: Number.isFinite(Number(dom.betaInput.value)) ? Number(dom.betaInput.value) : 0,
    speed: Number(dom.speedInput.value) || 1,
    modelTime: 0,
    lastFrameTime: performance.now(),
    dragging: false,
    lastPointer: { x: 0, y: 0 },
    surfaceRange: { min: 0, max: 0, maxAbs: 1 },
    samplePotential: 0,
  };

  function getCurrentLorentzState() {
    return computeLorentzState(state.beta, state.radius);
  }

  function updateBinaryLorentzBases(lorentzState) {
    model.binaries.forEach((binary) => {
      setBinaryOrbitBasis(
        binary,
        computeLorentzAlignedOrbitBasis(Three, binary.restBasis, lorentzState)
      );
    });
  }

  function updateBinaryOrbitRadii(referenceRadius) {
    const nextReferenceRadius = Math.max(0.0001, Number(referenceRadius) || 1);
    model.binaries.forEach((binary) => {
      const radiusFraction = Number(binary.orbitRadiusFraction ?? 1) || 1;
      const nextRadius = nextReferenceRadius * radiusFraction;
      binary.radius = nextRadius;
      if (binary.motion) {
        binary.motion.radius = nextRadius;
      }
      binary.speed = computePathSpeed(nextRadius, binary.frequencyHz);
    });
    model.fieldSpeed = updateBinaryFieldSpeedRatios(model.binaries);
    const orbitPathReferenceRadius = Math.max(
      0.0001,
      ...model.binaries.map((binary) => binary.radius)
    );
    model.binaries.forEach((binary) => {
      binary.orbitPathReferenceRadius = orbitPathReferenceRadius;
      binary.orbitPathWidthScale = getOrbitPathLogWidthScale(
        binary.radius,
        orbitPathReferenceRadius
      );
    });
  }

  function updateShellSurfaces() {
    shellGroup.children.forEach((shellSurface) => {
      const binary = shellSurface.userData.binary;
      if (!binary) {
        return;
      }
      shellSurface.scale.setScalar(binary.radius);
    });
  }

  function setReferenceRadius(referenceRadius) {
    state.radius = Math.max(0.0001, Number(referenceRadius) || state.radius);
    updateBinaryOrbitRadii(state.radius);
    updateShellSurfaces();
  }

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

  function updatePauseButton() {
    const label = dom.freezeToggle.querySelector(".ideal-swarm-control-label");
    const icon = dom.freezeToggle.querySelector(".ideal-swarm-control-icon");
    const nextLabel = state.frozen ? "Resume" : "Pause";
    if (label) {
      label.textContent = nextLabel;
    } else {
      dom.freezeToggle.textContent = nextLabel;
    }
    if (icon) {
      icon.classList.toggle("is-play", state.frozen);
      icon.classList.toggle("is-pause", !state.frozen);
    }
    dom.freezeToggle.setAttribute(
      "aria-label",
      state.frozen ? "Resume animation" : "Pause animation"
    );
  }

  function syncControls() {
    const lorentzState = getCurrentLorentzState();
    setButtonActive(dom.pathToggle, state.pathsVisible);
    setButtonActive(dom.surfaceToggle, state.surfaceVisible);
    setButtonActive(dom.axesToggle, state.axesVisible);
    setButtonActive(dom.freezeToggle, state.frozen);
    updatePauseButton();
    dom.radiusOutput.value = formatFixed(state.radius, 2);
    dom.betaOutput.value = formatFixed(lorentzState.beta, 3);
    dom.speedOutput.value = formatFixed(state.speed, 2);
    dom.timeLabel.textContent = formatLimitFixed(lorentzState.timeRatio, 3);
    dom.lengthLabel.textContent = formatFixed(lorentzState.lengthRatio, 3);
    dom.restMassLabel.textContent = formatLimitFixed(lorentzState.restMass, 3);
    dom.restEnergyLabel.textContent = formatLimitFixed(lorentzState.restEnergy, 3);
    dom.movementEnergyLabel.textContent = formatLimitFixed(lorentzState.movementEnergy, 3);
    dom.movementMassLabel.textContent = formatLimitFixed(
      lorentzState.movementMassEquivalent,
      3
    );
    dom.totalEnergyLabel.textContent = formatLimitFixed(lorentzState.totalEnergy, 3);
    dom.totalMassLabel.textContent = formatLimitFixed(lorentzState.totalMassEquivalent, 3);
    dom.gammaEquation.textContent = formatLimitFixed(lorentzState.gamma, 3);
    dom.xiEquation.textContent = formatFixed(lorentzState.xi, 3);
    dom.rParallelEquation.textContent = formatFixed(lorentzState.rParallel, 3);
    dom.tParallelEquation.textContent = formatLimitFixed(lorentzState.tParallel, 3);
    dom.tPerpEquation.textContent = formatLimitFixed(lorentzState.tPerp, 3);
    dom.closureEquation.textContent = formatSignedFixed(lorentzState.closureResidual, 5);
  }

  function updateArchitrinoMeshes() {
    architrinoMeshes.forEach((mesh) => {
      const architrino = mesh.userData.architrino;
      mesh.position.copy(architrino.positionAt(state.modelTime));
      mesh.scale.setScalar(1.18);
      mesh.material.color.set(architrino.color);
      mesh.material.opacity = 1;
    });
  }

  function updateOrbitPaths() {
    pathGroup.children.forEach((pathVisual) => {
      updateOrbitPathVisual(Three, pathVisual, state.modelTime, camera);
    });
  }

  function updateSurface() {
    const potentials = surfaceSamples.map((sample, sampleIndex) => {
      const position = sample.unit.clone().multiplyScalar(state.radius);
      surfacePositions[sampleIndex * 3] = position.x;
      surfacePositions[sampleIndex * 3 + 1] = position.y;
      surfacePositions[sampleIndex * 3 + 2] = position.z;
      return computePotentialSum(position, model, state.modelTime, {
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
      state.modelTime,
      { fieldSpeed: 6, softening: 0.1 }
    ).potential;
  }

  function updateAxisReference() {
    updateAxisReferenceGroup(Three, axisReferenceGroup, state.radius);
  }

  function updateLorentzGeometry() {
    const lorentzState = getCurrentLorentzState();
    updateBinaryLorentzBases(lorentzState);
    sphereContents.matrix.copy(computeAssemblyMomentumContractionMatrix(Three, lorentzState));
    sphereContents.matrixWorldNeedsUpdate = true;
    sphereContents.updateMatrixWorld(true);
  }

  function drawLorentzChart() {
    if (!stripContext) {
      return;
    }
    const width = dom.stripCanvas.width;
    const height = dom.stripCanvas.height;
    stripContext.clearRect(0, 0, width, height);
    stripContext.fillStyle = "rgba(2, 6, 23, 0.88)";
    stripContext.fillRect(0, 0, width, height);
    const left = 34;
    const right = width - 14;
    const top = 14;
    const bottom = height - 24;
    const plotWidth = Math.max(1, right - left);
    const plotHeight = Math.max(1, bottom - top);
    function chartX(beta) {
      return left + (clampNumber(beta, 0, LORENTZ_BETA_MAX) / LORENTZ_BETA_MAX) * plotWidth;
    }

    function chartY(normalized) {
      return top + (1 - clampNumber(normalized, 0, 1)) * plotHeight;
    }

    function normalizeGammaForChart(lorentzState) {
      return clampNumber(
        (lorentzState.gamma - 1) / Math.max(1, LORENTZ_CHART_GAMMA_CAP - 1),
        0,
        1
      );
    }

    stripContext.strokeStyle = "rgba(148, 163, 184, 0.24)";
    stripContext.lineWidth = 1;
    for (let gridIndex = 0; gridIndex <= 4; gridIndex += 1) {
      const y = top + (plotHeight * gridIndex) / 4;
      stripContext.beginPath();
      stripContext.moveTo(left, y);
      stripContext.lineTo(right, y);
      stripContext.stroke();
    }
    stripContext.strokeStyle = "rgba(238, 243, 255, 0.46)";
    stripContext.beginPath();
    stripContext.moveTo(left, top);
    stripContext.lineTo(left, bottom);
    stripContext.lineTo(right, bottom);
    stripContext.stroke();

    function drawCurve(color, resolveNormalized) {
      stripContext.strokeStyle = color;
      stripContext.lineWidth = 2.4;
      stripContext.beginPath();
      const steps = 160;
      for (let index = 0; index <= steps; index += 1) {
        const beta = (index / steps) * LORENTZ_BETA_MAX;
        const x = chartX(beta);
        const y = chartY(resolveNormalized(computeLorentzState(beta, state.radius)));
        if (index === 0) {
          stripContext.moveTo(x, y);
        } else {
          stripContext.lineTo(x, y);
        }
      }
      stripContext.stroke();
    }

    drawCurve("#fbbf24", normalizeGammaForChart);
    drawCurve("#2dd4bf", (lorentzState) => lorentzState.xi);

    const current = getCurrentLorentzState();
    const markerX = chartX(current.beta);
    stripContext.strokeStyle = "rgba(244, 114, 182, 0.92)";
    stripContext.lineWidth = 1.5;
    stripContext.beginPath();
    stripContext.moveTo(markerX, top);
    stripContext.lineTo(markerX, bottom);
    stripContext.stroke();
    stripContext.fillStyle = "rgba(244, 114, 182, 0.95)";
    stripContext.beginPath();
    stripContext.arc(markerX, chartY(current.xi), 3.8, 0, TWO_PI);
    stripContext.fill();
    stripContext.fillStyle = "rgba(251, 191, 36, 0.95)";
    stripContext.beginPath();
    stripContext.arc(markerX, chartY(normalizeGammaForChart(current)), 3.8, 0, TWO_PI);
    stripContext.fill();

    stripContext.fillStyle = "rgba(203, 213, 225, 0.82)";
    stripContext.font = "20px Helvetica Neue, Arial, sans-serif";
    stripContext.fillText("0", left - 6, height - 6);
    stripContext.fillText("1.000", right - 48, height - 6);
    stripContext.fillText("1", 8, chartY(1) + 6);
    stripContext.fillText("0", 8, bottom + 4);
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
        label: "Path speed",
        values: model.binaries.map((binary) => formatFixed(binary.speed, 2)),
      },
      {
        label: "Path speed / c_f",
        values: model.binaries.map((binary) => formatFixed(binary.fieldSpeedRatio, 2)),
      },
      {
        label: "Wake regime",
        values: model.binaries.map((binary) => binary.fieldSpeedRegime),
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
    coreFrame.rotation.set(-0.18, 0.36, 0.04);
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
    updateLorentzGeometry();
    updateOrbitPaths();
    updateArchitrinoMeshes();
    updateSurface();
    updateAxisReference();
    drawLorentzChart();
    renderTable();
    syncControls();
    renderer.render(scene, camera);
    windowLike.requestAnimationFrame(renderFrame);
  }

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
    setReferenceRadius(dom.radiusInput.value);
    syncControls();
  });
  dom.betaInput.addEventListener("input", () => {
    state.beta = clampNumber(Number(dom.betaInput.value) || 0, 0, LORENTZ_BETA_MAX);
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
  dom.returnCycleDocButton.addEventListener("click", () => {
    markdownRuntime.showMarkdownPanel(IDEAL_SWARM_DOCS.returnCycle);
  });
  dom.notesDocButton.addEventListener("click", () => {
    markdownRuntime.showMarkdownPanel(IDEAL_SWARM_DOCS.notes);
  });
  dom.lorentzDocButton.addEventListener("click", () => {
    markdownRuntime.showMarkdownPanel(IDEAL_SWARM_DOCS.lorentzKinematics);
  });
  dom.markdownClose.addEventListener("click", () => {
    markdownRuntime.hideMarkdownPanel();
    canvas.focus();
  });
  dom.markdownLayoutToggle.addEventListener("click", () => {
    markdownRuntime.toggleMarkdownLayout();
  });
  dom.markdownPdfButton.addEventListener("click", () => {
    markdownRuntime.printMarkdownPanel();
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
    coreFrame.rotation.y += dx * 0.008;
    coreFrame.rotation.x += dy * 0.008;
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
      coreFrame.rotation.y -= rotationStep;
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      coreFrame.rotation.y += rotationStep;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      coreFrame.rotation.x -= rotationStep;
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      coreFrame.rotation.x += rotationStep;
    } else if (event.key.toLowerCase() === "q") {
      event.preventDefault();
      coreFrame.rotation.z += rotationStep;
    } else if (event.key.toLowerCase() === "e") {
      event.preventDefault();
      coreFrame.rotation.z -= rotationStep;
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
  setReferenceRadius(state.radius);
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
    coreFrame,
    sphereContents,
    markdownRuntime,
    destroy() {
      resizeObserver.disconnect();
      renderer.dispose();
      markdownRuntime.hideMarkdownPanel();
    },
  };
}
