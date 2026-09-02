import * as THREE from "../../../vendor/three/three.module.js";
import { normalizeAnimatorSceneDocument } from "../../runtime/Animator2SceneDocumentRuntime.js";
import { summarizeAnimatorMotionSources } from "../animator/AnimatorMotionSourceRuntime.js";
import { createNormalizedAssemblyViewRecordCarriers } from "./AssemblyViewRecordCarriers.mjs";
import { createEomHistoryDataset } from "./EomHistoryDataset.mjs";
import { sha256CanonicalJson } from "./EomRecordedPlaybackHandoff.mjs";

export const ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA =
  "animator-prescribed-scene-handoff.v1";
export const ANIMATOR_PRESCRIBED_SCENE_EMITTER_ID =
  "animator-prescribed-scene-emitter.v1";
export const ANIMATOR_PRESCRIBED_MOTION_AUTHORITY = "authored-prescribed";
export const ANIMATOR_PRESCRIBED_CLAIM_GRADE = "chart-hypothesis";
export const ANIMATOR_PRESCRIBED_EVIDENCE_STATUS = "display-only";

const SHA256 = /^[a-f0-9]{64}$/;
const DEFAULT_SAMPLE_INTERVAL = 0.1;
const MAX_SEGMENT_COUNT = 600;

export function validateAnimatorPrescribedSceneDocument(rawDocument = {}) {
  const document = JSON.parse(JSON.stringify(normalizeAnimatorSceneDocument(rawDocument)));
  if (document.schemaVersion !== "0.1.0") {
    throw new TypeError(
      `Animator prescribed-scene publication requires scene schemaVersion 0.1.0; received ${String(document.schemaVersion ?? "none")}.`,
    );
  }
  const sourceSummary = summarizeAnimatorMotionSources(document);
  if (sourceSummary.hasSolverMotion || sourceSummary.sourceKind === "mixed") {
    throw new TypeError(
      "Animator prescribed-scene publication rejects solver-derived or mixed motion; EOM-evolved evidence must remain a separate authority.",
    );
  }
  if (!Array.isArray(document.assemblies) || document.assemblies.length === 0) {
    throw new TypeError("Animator prescribed-scene publication requires at least one assembly.");
  }
  const start = finiteNumber(document.scene?.time?.start, "scene.time.start");
  const end = finiteNumber(document.scene?.time?.end, "scene.time.end");
  if (!(end > start)) {
    throw new RangeError("Animator prescribed-scene publication requires scene.time.end > scene.time.start.");
  }
  const pathById = new Map((document.paths ?? []).map((path) => [path.id, path]));
  const assemblyIds = new Set(document.assemblies.map((assembly) => assembly.id));
  document.assemblies.forEach((assembly, assemblyIndex) => {
    if (assembly.parentId && !assemblyIds.has(assembly.parentId)) {
      throw new TypeError(`Animator assembly ${assembly.id} names missing parent ${assembly.parentId}.`);
    }
    const motions = Array.isArray(assembly.motion) ? assembly.motion : [];
    motions.forEach((motion) => {
      if (motion?.type !== "path.transport") {
        throw new TypeError(
          `Animator assembly ${assembly.id} has unsupported authored motion ${String(motion?.type ?? "none")}.`,
        );
      }
      const path = pathById.get(motion.pathId);
      if (!path) {
        throw new TypeError(`Animator assembly ${assembly.id} names missing path ${String(motion.pathId)}.`);
      }
      validateAuthoredPath(path);
    });
    if (!Array.isArray(assembly.members) || assembly.members.length === 0) {
      throw new TypeError(`Animator assembly ${assembly.id || assemblyIndex + 1} has no replayable members.`);
    }
    assembly.members.forEach((member, memberIndex) => {
      readMemberPolarity(member, memberIndex, assembly.id);
    });
    (assembly.core?.binaries ?? []).forEach((binary, binaryIndex) => {
      if (binary?.motion?.type !== "orbit.circular") {
        throw new TypeError(
          `Animator assembly ${assembly.id} binary ${binaryIndex + 1} requires orbit.circular authored motion.`,
        );
      }
      positiveNumber(binary.motion.radius, `${assembly.id} binary ${binaryIndex + 1} radius`);
      finiteNumber(binary.motion.frequencyHz, `${assembly.id} binary ${binaryIndex + 1} frequencyHz`);
      validateTriplet(binary.motion.planeNormal ?? [0, 1, 0], `${assembly.id} binary ${binaryIndex + 1} planeNormal`);
    });
  });
  return document;
}

export async function createAnimatorPrescribedSceneHandoff(rawDocument, options = {}) {
  const document = validateAnimatorPrescribedSceneDocument(rawDocument);
  const sourceSceneSha256 = await sha256CanonicalJson(document, options.cryptoLike);
  const record = createPrescribedSceneRecord(document, sourceSceneSha256, options);
  // Parse with Borg's canonical record adapter before sealing. This proves that
  // the exact payload about to be handed off is consumable by record-only replay.
  createEomHistoryDataset(record);
  const recordSha256 = await sha256CanonicalJson(record, options.cryptoLike);
  deepFreezeJson(record);
  return Object.freeze({
    schema: ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA,
    recordSha256,
    identity: Object.freeze({
      sourceSceneId: document.scene.id,
      sourceSceneSchemaVersion: document.schemaVersion,
      sourceSceneSha256,
      assemblyId: record.assemblyId,
      modelRevisionSha256: record.modelRevisionSha256,
      motionAuthority: ANIMATOR_PRESCRIBED_MOTION_AUTHORITY,
      claimGrade: ANIMATOR_PRESCRIBED_CLAIM_GRADE,
      evidenceStatus: ANIMATOR_PRESCRIBED_EVIDENCE_STATUS,
    }),
    record,
  });
}

export async function validateAnimatorPrescribedSceneHandoff(handoff, options = {}) {
  if (!handoff || typeof handoff !== "object" || Array.isArray(handoff)) {
    throw new TypeError("Borg requires an Animator prescribed-scene handoff object.");
  }
  if (handoff.schema !== ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA) {
    throw new TypeError(
      `Borg requires handoff schema ${ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA}; received ${String(handoff.schema ?? "none")}.`,
    );
  }
  if (!SHA256.test(handoff.recordSha256 ?? "")) {
    throw new TypeError("Animator prescribed-scene handoff requires a lowercase SHA-256 record pin.");
  }
  const record = handoff.record;
  const dataset = createEomHistoryDataset(record);
  const prescribed = record?.provenance?.prescribedGeometry;
  if (
    record?.schema !== "assembly-view-record.v0" ||
    dataset.provenance.engineId !== "prescribed-geometry" ||
    dataset.provenance.claimGrade !== ANIMATOR_PRESCRIBED_CLAIM_GRADE ||
    dataset.provenance.evidenceStatus !== ANIMATOR_PRESCRIBED_EVIDENCE_STATUS ||
    prescribed?.sourceApplication !== "animator" ||
    prescribed?.motionAuthority !== ANIMATOR_PRESCRIBED_MOTION_AUTHORITY ||
    prescribed?.physicsInvoked !== false ||
    prescribed?.recordOnlyReplay !== true ||
    prescribed?.sourceSceneSha256 !== record.modelRevisionSha256 ||
    record.provenance?.engineVersion !== ANIMATOR_PRESCRIBED_SCENE_EMITTER_ID ||
    record.provenance?.generatingSpec !== "animator-prescribed-scene-record/v1" ||
    !record.worldlines.every((worldline) =>
      worldline?.sourceProvenance?.sourceApplication === "animator" &&
      worldline.sourceProvenance.sourceSceneSha256 === prescribed.sourceSceneSha256 &&
      worldline.sourceProvenance.motionAuthority === ANIMATOR_PRESCRIBED_MOTION_AUTHORITY
    )
  ) {
    throw new TypeError(
      "Borg rejects Animator handoffs unless they are authored, display-only, prescribed-geometry records with physicsInvoked=false and recordOnlyReplay=true.",
    );
  }
  const actualRecordSha256 = await sha256CanonicalJson(record, options.cryptoLike);
  if (actualRecordSha256 !== handoff.recordSha256) {
    throw new Error("Animator prescribed-scene handoff is stale or altered; its record SHA-256 does not match.");
  }
  const identity = handoff.identity;
  if (
    !identity ||
    identity.sourceSceneId !== prescribed.sourceSceneId ||
    identity.sourceSceneSchemaVersion !== prescribed.sourceSceneSchemaVersion ||
    identity.sourceSceneSha256 !== prescribed.sourceSceneSha256 ||
    identity.assemblyId !== record.assemblyId ||
    identity.modelRevisionSha256 !== record.modelRevisionSha256 ||
    identity.motionAuthority !== ANIMATOR_PRESCRIBED_MOTION_AUTHORITY ||
    identity.claimGrade !== ANIMATOR_PRESCRIBED_CLAIM_GRADE ||
    identity.evidenceStatus !== ANIMATOR_PRESCRIBED_EVIDENCE_STATUS
  ) {
    throw new Error("Animator prescribed-scene handoff identity does not match its sealed record.");
  }
  deepFreezeJson(record);
  return Object.freeze({
    schema: ANIMATOR_PRESCRIBED_SCENE_HANDOFF_SCHEMA,
    recordSha256: handoff.recordSha256,
    identity: Object.freeze({ ...identity }),
    record,
  });
}

function createPrescribedSceneRecord(document, sourceSceneSha256, options) {
  const start = Number(document.scene.time.start);
  const end = Number(document.scene.time.end);
  const requestedInterval = positiveNumber(
    options.sampleInterval ?? DEFAULT_SAMPLE_INTERVAL,
    "Animator prescribed-scene sampleInterval",
  );
  const segmentCount = Math.max(
    1,
    Math.min(MAX_SEGMENT_COUNT, Math.ceil((end - start) / requestedInterval)),
  );
  const sampleInterval = (end - start) / segmentCount;
  const times = Array.from({ length: segmentCount + 1 }, (_entry, index) =>
    index === segmentCount ? end : start + index * sampleInterval,
  );
  const pathById = new Map(document.paths.map((path) => [path.id, path]));
  const assemblyById = new Map(document.assemblies.map((assembly) => [assembly.id, assembly]));
  const worldlines = [];
  const constituentInventory = [];
  const allPositions = [];

  document.assemblies.forEach((assembly, assemblyIndex) => {
    const anchors = createMemberAnchors(assembly);
    assembly.members.forEach((member, memberIndex) => {
      const memberId = String(member?.id ?? `member_${memberIndex + 1}`);
      const polarity = readMemberPolarity(member, memberIndex, assembly.id);
      const positions = times.map((time) => {
        const center = resolveAssemblyCenterAtTime({
          assembly,
          assemblyIndex,
          document,
          pathById,
          assemblyById,
          time,
          stack: new Set(),
        });
        const anchor = anchors.get(memberId) ?? { kind: "fixed", offset: [0, 0, 0] };
        const position = addTriplets(center, memberOffsetAtTime(anchor, time));
        allPositions.push(position);
        return position;
      });
      const worldlineId = `${assembly.id}:${memberId}`;
      worldlines.push({
        id: worldlineId,
        pathKey: worldlineId,
        polarity,
        stateFlags: polarity > 0 ? 1 : 0,
        coverageStart: start,
        coverageEnd: end,
        interpolation: "piecewise-linear-authored-samples/v1",
        sourceProvenance: {
          sourceApplication: "animator",
          sourceSceneId: document.scene.id,
          sourceSceneSha256,
          sourceAssemblyId: assembly.id,
          sourceMemberId: memberId,
          motionAuthority: ANIMATOR_PRESCRIBED_MOTION_AUTHORITY,
        },
        segments: positions.slice(0, -1).map((position, index) =>
          createLinearSegment(times[index], times[index + 1], position, positions[index + 1]),
        ),
      });
      constituentInventory.push({
        id: memberId,
        worldlineId,
        polarity,
        role: assembly.sceneRole ?? assembly.role ?? "assembly-member",
        sourceAssemblyId: assembly.id,
      });
    });
  });

  const bounds = computeBounds(allPositions);
  const publishedAt = typeof options.publishedAt === "string" && options.publishedAt.trim()
    ? options.publishedAt.trim()
    : new Date().toISOString();
  const sourceId = `animator:${document.scene.id}:${sourceSceneSha256.slice(0, 16)}`;
  const carriers = createNormalizedAssemblyViewRecordCarriers({ fieldSpeed: 1 });
  return {
    schema: "assembly-view-record.v0",
    sourceId,
    title: `${document.scene.name} — Animator prescribed scene`,
    assemblyId: `asm-${sourceSceneSha256.slice(0, 32)}`,
    modelRevisionSha256: sourceSceneSha256,
    provenance: {
      engineId: "prescribed-geometry",
      engineVersion: ANIMATOR_PRESCRIBED_SCENE_EMITTER_ID,
      runId: sourceId,
      claimGrade: ANIMATOR_PRESCRIBED_CLAIM_GRADE,
      evidenceStatus: ANIMATOR_PRESCRIBED_EVIDENCE_STATUS,
      generatingSpec: "animator-prescribed-scene-record/v1",
      date: publishedAt,
      prescribedGeometry: {
        emitterId: ANIMATOR_PRESCRIBED_SCENE_EMITTER_ID,
        sourceSchema: "animator-scene-document/0.1.0",
        interpolation: "piecewise-linear-authored-samples/v1",
        errorMethod: "sealed-record coefficients are exact; source-scene sampling is display-only",
        physicsInvoked: false,
        recordOnlyReplay: true,
        sourceApplication: "animator",
        sourceSceneId: document.scene.id,
        sourceSceneSchemaVersion: document.schemaVersion,
        sourceSceneSha256,
        motionAuthority: ANIMATOR_PRESCRIBED_MOTION_AUTHORITY,
        authorityNotice:
          "Animator-authored prescribed motion. This record is not EOM-evolved evidence and Borg replay creates no evidence.",
        responseCenter: bounds.center,
        sphericalEnvelopeRadius: bounds.radius,
        displayTrailDuration: Math.max(sampleInterval, end - start),
        coordinates: {
          identity: { displayLabel: document.scene.name },
          constituentInventory,
        },
      },
    },
    window: {
      start,
      end,
      sampleInterval,
      delayHorizon: 0,
    },
    recordFrame: carriers.frame,
    vectorOverlays: carriers.vectorOverlays,
    worldlines,
    binaries: [],
    structuralEdges: [],
    ansatz: [],
    events: [],
  };
}

function validateAuthoredPath(path) {
  const points = path?.payload?.points;
  if (!Array.isArray(points) || points.length < 2) {
    throw new TypeError(`Animator path ${String(path?.id ?? "unknown")} requires at least two points.`);
  }
  points.forEach((point, index) => validateTriplet(point, `Animator path ${path.id} point ${index}`));
  if (!["linear", "spline"].includes(path.payload.interpolate)) {
    throw new TypeError(`Animator path ${path.id} has unsupported interpolation ${String(path.payload.interpolate)}.`);
  }
}

function resolveAssemblyCenterAtTime(context) {
  const { assembly, assemblyIndex, document, pathById, assemblyById, time, stack } = context;
  if (stack.has(assembly.id)) {
    throw new TypeError(`Animator assembly parent cycle reaches ${assembly.id}.`);
  }
  stack.add(assembly.id);
  const motions = Array.isArray(assembly.motion) ? assembly.motion : [];
  const transport = motions.find((motion) => motion?.type === "path.transport");
  let center = baseAssemblyPosition(assembly, assemblyIndex, document.assemblies.length, pathById);
  if (transport) {
    const path = pathById.get(transport.pathId);
    const totalMotionDuration = animatorIntegratedMotionTime(document, document.scene.time.end);
    const motionTime = animatorIntegratedMotionTime(document, time);
    const progress = totalMotionDuration > 0 ? clamp(motionTime / totalMotionDuration, 0, 1) : 0;
    const motionProgress = clamp(
      progress * (Number(transport.speed ?? 1) || 1) + Number(transport.phase ?? 0),
      0,
      1,
    );
    center = samplePath(path, motionProgress);
  }
  if (assembly.parentId) {
    const parent = assemblyById.get(assembly.parentId);
    const parentIndex = document.assemblies.findIndex((candidate) => candidate.id === assembly.parentId);
    center = addTriplets(
      center,
      resolveAssemblyCenterAtTime({ ...context, assembly: parent, assemblyIndex: parentIndex, stack }),
    );
  }
  stack.delete(assembly.id);
  return center;
}

function baseAssemblyPosition(assembly, index, count, pathById) {
  const position = assembly?.transform?.position;
  if (Array.isArray(position) && position.some((value) => Number(value) !== 0)) {
    return position.map(Number);
  }
  const transport = (assembly.motion ?? []).find((motion) => motion?.type === "path.transport");
  const first = pathById.get(transport?.pathId)?.payload?.points?.[0];
  if (first) return first.map(Number);
  if (count <= 1) return [0, 0, 0];
  const angle = (index / count) * Math.PI * 2;
  const radius = 1.6 + count * 0.08;
  return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}

function samplePath(path, progress) {
  const points = path.payload.points;
  if (path.payload.interpolate === "spline" && points.length > 2) {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      !!path.payload.closed,
      "catmullrom",
      0.5,
    );
    const point = curve.getPoint(clamp(progress, 0, 1));
    return [point.x, point.y, point.z];
  }
  const source = path.payload.closed ? [...points, points[0]] : points;
  const scaled = clamp(progress, 0, 1) * (source.length - 1);
  const index = Math.floor(scaled);
  const next = Math.min(source.length - 1, index + 1);
  const alpha = scaled - index;
  return source[index].map((value, axis) => value + (source[next][axis] - value) * alpha);
}

function createMemberAnchors(assembly) {
  const anchors = new Map();
  const members = assembly.members.map((member, index) => ({
    member,
    index,
    id: String(member?.id ?? `member_${index + 1}`),
    polarity: readMemberPolarity(member, index, assembly.id),
  }));
  const claimed = new Set();
  (assembly.core?.binaries ?? []).forEach((binary, binaryIndex) => {
    [-1, 1].forEach((polarity) => {
      const candidate = members.filter((entry) => entry.polarity === polarity)[binaryIndex];
      if (!candidate) return;
      claimed.add(candidate.id);
      anchors.set(candidate.id, {
        kind: "orbit",
        motion: binary.motion,
        polarity,
      });
    });
  });
  const generic = members.filter((entry) => !claimed.has(entry.id));
  const outerRadius = Math.max(
    1,
    ...(assembly.core?.shells ?? []).map((shell) => Number(shell?.radius) || 0),
  );
  generic.forEach((entry, genericIndex) => {
    const explicit = entry.member?.position;
    const angle = (genericIndex / Math.max(1, generic.length)) * Math.PI * 2;
    anchors.set(entry.id, {
      kind: "fixed",
      offset: explicit ?? [Math.cos(angle) * (outerRadius + 0.31), Math.sin(angle) * (outerRadius + 0.31), 0],
    });
  });
  return anchors;
}

function memberOffsetAtTime(anchor, time) {
  if (anchor.kind !== "orbit") return anchor.offset.map(Number);
  const motion = anchor.motion;
  const normal = new THREE.Vector3(...(motion.planeNormal ?? [0, 1, 0]));
  if (normal.lengthSq() === 0) normal.set(0, 1, 0);
  normal.normalize();
  const reference = Math.abs(normal.y) < 0.9
    ? new THREE.Vector3(0, 1, 0)
    : new THREE.Vector3(1, 0, 0);
  const u = new THREE.Vector3().crossVectors(reference, normal).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();
  const direction = motion.direction === "cw" ? -1 : 1;
  const phaseOffset = anchor.polarity < 0 ? Math.PI : 0;
  const angle = Number(motion.phase ?? 0) + phaseOffset +
    direction * time * Math.PI * 2 * Number(motion.frequencyHz ?? 0.25);
  const radius = Number(motion.radius ?? 0.65);
  const offset = u.multiplyScalar(Math.cos(angle) * radius)
    .add(v.multiplyScalar(Math.sin(angle) * radius));
  return [offset.x, offset.y, offset.z];
}

function animatorIntegratedMotionTime(document, time) {
  const start = Number(document.scene.time.start);
  const end = clamp(Number(time), start, Number(document.scene.time.end));
  if (end <= start) return 0;
  const pauses = document.scene.pauses ?? [];
  const warps = document.scene.timeWarps ?? [];
  const boundaries = new Set([start, end]);
  pauses.forEach((pause) => {
    const pauseStart = clamp(Number(pause.start), start, end);
    boundaries.add(pauseStart);
    boundaries.add(clamp(pauseStart + Math.max(0, Number(pause.duration) || 0), start, end));
  });
  warps.forEach((warp) => {
    boundaries.add(clamp(Number(warp.start), start, end));
    boundaries.add(clamp(Number(warp.end), start, end));
  });
  const sorted = [...boundaries].sort((left, right) => left - right);
  let total = 0;
  for (let index = 0; index + 1 < sorted.length; index += 1) {
    const left = sorted[index];
    const right = sorted[index + 1];
    const midpoint = (left + right) / 2;
    const paused = pauses.some((pause) =>
      midpoint >= Number(pause.start) && midpoint < Number(pause.start) + Math.max(0, Number(pause.duration) || 0)
    );
    const warp = warps.find((entry) => midpoint >= Number(entry.start) && midpoint < Number(entry.end));
    total += (right - left) * (paused ? 0 : Number(warp?.rate ?? 1) || 1);
  }
  return total;
}

function createLinearSegment(startTime, endTime, start, end) {
  const duration = endTime - startTime;
  return {
    startTime,
    endTime,
    coefficients: start.map((value, axis) => [value, (end[axis] - value) / duration, 0, 0]),
    positionError: 0,
    velocityError: 0,
  };
}

function computeBounds(positions) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  positions.forEach((position) => position.forEach((value, axis) => {
    min[axis] = Math.min(min[axis], value);
    max[axis] = Math.max(max[axis], value);
  }));
  const centerArray = min.map((value, axis) => (value + max[axis]) / 2);
  const radius = Math.max(
    1e-9,
    ...positions.map((position) => Math.hypot(...position.map((value, axis) => value - centerArray[axis]))),
  );
  return {
    center: { x: centerArray[0], y: centerArray[1], z: centerArray[2] },
    radius,
  };
}

function readMemberPolarity(member, index, assemblyId) {
  const id = String(member?.id ?? `member_${index + 1}`);
  const state = String(member?.state ?? "").toLowerCase();
  if (state === "positrino" || /positrino|positive/.test(id.toLowerCase())) return 1;
  if (state === "electrino" || /electrino|negative/.test(id.toLowerCase())) return -1;
  throw new TypeError(
    `Animator member ${assemblyId}:${id} requires explicit electrino or positrino identity before Borg publication.`,
  );
}

function validateTriplet(value, label) {
  if (!Array.isArray(value) || value.length < 3) {
    throw new TypeError(`${label} requires three coordinates.`);
  }
  value.slice(0, 3).forEach((coordinate, axis) => finiteNumber(coordinate, `${label}[${axis}]`));
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function addTriplets(left, right) {
  return [left[0] + right[0], left[1] + right[1], left[2] + right[2]];
}

function deepFreezeJson(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreezeJson);
  return Object.freeze(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
