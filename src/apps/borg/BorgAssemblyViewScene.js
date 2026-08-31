import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
  BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  applyBorgPrescribedDisplayFrame,
  assertBorgPrescribedDisplayFrame,
  resolveBorgPrescribedTranslation,
} from "./BorgPrescribedTranslation.js";
import { borgPolarityColor, describeBorgOrbitTrails, borgTrailSegments } from "./BorgOrbitTrails.mjs";
import { clearBorgSceneGroup } from "./BorgSceneDisposal.js";

const AXIS_COLORS = Object.freeze([0x8fdcf2, 0xf0a6d2, 0xb8a8ff]);
const COINCIDENT_AXIS_COLOR = 0xd6dde3;
const AXIS_COINCIDENCE_TOLERANCE = 1e-9;
const SWEPT_ENVELOPE_COLOR = 0x7bd6c2;
const DEFAULT_TUBE_RADIUS = 0.018;
const DEFAULT_TUBE_OPACITY = 0.2;

export function createBorgAssemblyViewScene({
  group,
  toWorld,
  render,
}) {
  if (!group || typeof group.add !== "function") {
    throw new TypeError("Borg assembly-view scene requires a Three.js group.");
  }
  const axisGroup = new THREE.Group();
  axisGroup.userData.kind = "source-carried-binary-axes";
  const sweptEnvelopeGroup = new THREE.Group();
  sweptEnvelopeGroup.userData.kind = "display-only-swept-envelope";
  const prescribedPathGroup = new THREE.Group();
  prescribedPathGroup.userData.kind = "prescribed-path-history-strands";
  const prescribedTubeGroup = new THREE.Group();
  prescribedTubeGroup.userData.kind = "display-only-path-history-tubes";
  group.add(
    axisGroup,
    sweptEnvelopeGroup,
    prescribedPathGroup,
    prescribedTubeGroup,
  );
  let entry = null;
  let cameraMode = "free";
  let referenceRotation = null;
  let displayMode = "animated";
  let pathVisible = true;
  let translation = null;
  let translationFrame = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED;
  let currentTime = 0;
  let historyDepth = Number.POSITIVE_INFINITY;
  let selectedWorldlineId = null;
  let tubeVisible = false;
  let tubeRadius = DEFAULT_TUBE_RADIUS;
  let tubeOpacity = DEFAULT_TUBE_OPACITY;

  function setRecord(nextEntry) {
    entry = nextEntry;
    clearBorgSceneGroup(axisGroup);
    clearBorgSceneGroup(sweptEnvelopeGroup);
    clearBorgSceneGroup(prescribedPathGroup);
    clearBorgSceneGroup(prescribedTubeGroup);
    translation = resolveBorgPrescribedTranslation(nextEntry);
    translationFrame = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED;
    currentTime = Number(nextEntry?.dataset?.window?.start ?? 0);
    historyDepth = Number.POSITIVE_INFINITY;
    selectedWorldlineId = null;
    tubeVisible = false;
    buildBinaryAxes(nextEntry?.dataset?.binaries ?? []);
    buildPrescribedPathStrands();
    referenceRotation = resolveSourceRotation(nextEntry);
    sweptEnvelopeGroup.visible = displayMode === "swept-envelope";
    prescribedPathGroup.visible = pathVisible;
    prescribedTubeGroup.visible = pathVisible && tubeVisible;
    setCameraMode("free");
  }

  function setDisplayMode(mode) {
    displayMode = mode;
    sweptEnvelopeGroup.visible = mode === "swept-envelope";
    if (mode === "swept-envelope" && sweptEnvelopeGroup.children.length === 0) {
      buildSweptEnvelope();
    }
    render?.();
  }

  function setPathVisible(visible) {
    pathVisible = Boolean(visible);
    prescribedPathGroup.visible = pathVisible;
    prescribedTubeGroup.visible = pathVisible && tubeVisible;
    render?.();
  }

  function setTranslationFrame(frame) {
    const nextFrame = assertBorgPrescribedDisplayFrame(frame);
    if (nextFrame === BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING &&
        !translation?.available) {
      throw new TypeError(
        translation?.message ??
        "Co-translating display requires a source-carried common translation.",
      );
    }
    translationFrame = nextFrame;
    updatePrescribedPathWindows();
    rebuildSelectedTube();
    render?.();
  }

  function setHistoryDepth(depth) {
    const number = Number(depth);
    if (!(number > 0) || !Number.isFinite(number)) {
      throw new TypeError("Borg prescribed path-history depth must be positive and finite.");
    }
    historyDepth = number;
    updatePrescribedPathWindows();
    rebuildSelectedTube();
    render?.();
  }

  function setSelectedWorldlineId(worldlineId) {
    selectedWorldlineId = worldlineId == null ? null : String(worldlineId);
    rebuildSelectedTube();
    render?.();
  }

  function setTubeOptions({
    visible = tubeVisible,
    radius = tubeRadius,
    opacity = tubeOpacity,
  } = {}) {
    const nextRadius = Number(radius);
    const nextOpacity = Number(opacity);
    if (!(nextRadius > 0) || !Number.isFinite(nextRadius)) {
      throw new TypeError("Borg display-tube radius must be positive and finite.");
    }
    if (!(nextOpacity > 0 && nextOpacity <= 1) || !Number.isFinite(nextOpacity)) {
      throw new TypeError("Borg display-tube opacity must lie in (0,1].");
    }
    tubeVisible = Boolean(visible);
    tubeRadius = nextRadius;
    tubeOpacity = nextOpacity;
    rebuildSelectedTube();
    prescribedTubeGroup.visible = pathVisible && tubeVisible;
    render?.();
  }

  function setCameraMode(mode) {
    if (mode === "co-rotating" && !referenceRotation) {
      throw new TypeError(
        "Co-rotating view is unavailable because the record carries no positive binary frequency and plane-orientation normal.",
      );
    }
    cameraMode = mode;
    if (mode === "free") {
      group.quaternion.identity();
    }
    render?.();
  }

  function updateTime(time) {
    currentTime = Number(time);
    updatePrescribedPathWindows();
    rebuildSelectedTube();
    if (cameraMode !== "co-rotating" || !referenceRotation || !entry) {
      render?.();
      return;
    }
    const elapsed = Number(time) - entry.dataset.window.start;
    group.quaternion.setFromAxisAngle(
      referenceRotation.axis,
      -2 * Math.PI * referenceRotation.frequency * elapsed,
    );
    render?.();
  }

  function buildPrescribedPathStrands() {
    if (entry?.dataset?.provenance?.engineId !== "prescribed-geometry") {
      return;
    }
    const dataset = entry.dataset;
    const frames = dataset.createFrameSamples({
      start: dataset.window.start,
      end: dataset.window.end,
      sampleInterval: dataset.window.sampleInterval,
    });
    const trailPolicies = describeBorgOrbitTrails(dataset);
    dataset.worldlines.forEach((worldline) => {
      const fixed = [];
      const coTranslating = [];
      const times = [];
      frames.forEach((frame) => {
        const state = frame.states.find((row) => row.worldlineId === worldline.id);
        if (!state) return;
        times.push(frame.time);
        const fixedPosition = toWorld(
          applyBorgPrescribedDisplayFrame(
            state.position,
            frame.time,
            translation,
            BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
          ),
          new THREE.Vector3(),
        );
        fixed.push(fixedPosition.x, fixedPosition.y, fixedPosition.z);
        if (translation.available) {
          const coPosition = toWorld(
            applyBorgPrescribedDisplayFrame(
              state.position,
              frame.time,
              translation,
              BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
            ),
            new THREE.Vector3(),
          );
          coTranslating.push(coPosition.x, coPosition.y, coPosition.z);
        }
      });
      if (times.length < 2) return;
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(fixed, 3),
      );
      geometry.computeBoundingSphere();
      const trailPolicy = trailPolicies.get(worldline.id);
      const material = new THREE.LineBasicMaterial({
        color: borgPolarityColor(worldline.polarity),
        vertexColors: true,
        transparent: true,
        opacity: 1,
        depthWrite: false,
      });
      const line = new THREE.LineSegments(geometry, material);
      line.frustumCulled = false;
      line.userData = {
        kind: "prescribed-path-history-strand",
        worldlineId: worldline.id,
        pathKey: worldline.pathKey,
        trailPolicy,
        times: Object.freeze(times),
        positionArrays: Object.freeze({
          [BORG_PRESCRIBED_DISPLAY_FRAME_FIXED]: new Float32Array(fixed),
          ...(translation.available ? {
            [BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING]:
              new Float32Array(coTranslating),
          } : {}),
        }),
        valueAuthority: "display-only-declared-interpolation",
      };
      line.userData.pointsByFrame = Object.fromEntries(Object.entries(line.userData.positionArrays).map(([frame, values]) =>
        [frame, Array.from({length:times.length}, (_,i) => Array.from(values.slice(i*3,i*3+3)))]));
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array((times.length-1)*6),3));
      geometry.setAttribute("color", new THREE.Float32BufferAttribute(new Float32Array((times.length-1)*8),4));
      geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);
      geometry.attributes.color.setUsage(THREE.DynamicDrawUsage);
      prescribedPathGroup.add(line);
    });
    updatePrescribedPathWindows();
  }

  function updatePrescribedPathWindows() {
    if (!Number.isFinite(currentTime)) return;
    prescribedPathGroup.children.forEach((line) => {
      const { times, pointsByFrame, trailPolicy } = line.userData;
      const points = pointsByFrame[translationFrame] ?? pointsByFrame[BORG_PRESCRIBED_DISPLAY_FRAME_FIXED];
      const segments = borgTrailSegments(points, times, currentTime, Math.min(historyDepth,trailPolicy.duration), trailPolicy.fade);
      const positions=line.geometry.attributes.position, colors=line.geometry.attributes.color;
      segments.forEach((segment,i) => {
        positions.array.set([...segment.a,...segment.b],i*6);
        colors.array.set([1,1,1,segment.startAlpha,1,1,1,segment.endAlpha],i*8);
      });
      positions.needsUpdate=true;
      colors.needsUpdate=true;
      line.geometry.setDrawRange(0,segments.length*2);
      line.userData.visibleSegments = segments.map(({start,end,startAlpha,endAlpha}) => ({start,end,startAlpha,endAlpha}));
    });
  }

  function rebuildSelectedTube() {
    clearBorgSceneGroup(prescribedTubeGroup);
    if (!tubeVisible || !selectedWorldlineId || !entry ||
        entry.dataset.provenance.engineId !== "prescribed-geometry" ||
        !Number.isFinite(currentTime) ||
        (translationFrame === BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING &&
          !translation?.available)) {
      return;
    }
    const dataset = entry.dataset;
    const worldline = dataset.worldlines.find(
      (row) => row.id === selectedWorldlineId ||
        String(row.pathKey) === selectedWorldlineId,
    );
    if (!worldline) return;
    const depth = Math.min(
      historyDepth,
      describeBorgOrbitTrails(dataset).get(worldline.id)?.duration ?? 0,
      currentTime - dataset.window.start,
    );
    if (!(depth > 0)) return;
    const sampleCount = Math.max(
      8,
      Math.min(160, Math.ceil(depth / dataset.window.sampleInterval) + 1),
    );
    const points = dataset.createTrailSamples({
      worldlineId: worldline.id,
      time: currentTime,
      depth,
      sampleCount,
    }).map((sample) => toWorld(
      applyBorgPrescribedDisplayFrame(
        sample.position,
        sample.time,
        translation,
        translationFrame,
      ),
      new THREE.Vector3(),
    ));
    if (points.length < 2 || points.every((point) => point.distanceTo(points[0]) < 1e-12)) {
      return;
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length - 1),
      sourceRadiusToWorld(tubeRadius),
      8,
      false,
    );
    const material = new THREE.MeshBasicMaterial({
      color: borgPolarityColor(worldline.polarity),
      transparent: true,
      opacity: tubeOpacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const tube = new THREE.Mesh(geometry, material);
    tube.userData = {
      kind: "display-only-path-history-tube",
      worldlineId: worldline.id,
      throughTime: currentTime,
      historyDepth: depth,
      sourceRadius: tubeRadius,
      valueAuthority: "display-only-envelope-around-recorded-path-samples",
    };
    prescribedTubeGroup.add(tube);
  }

  function sourceRadiusToWorld(radius) {
    const origin = toWorld({ x: 0, y: 0, z: 0 }, new THREE.Vector3());
    const endpoint = toWorld({ x: radius, y: 0, z: 0 }, new THREE.Vector3());
    return Math.max(1e-6, origin.distanceTo(endpoint));
  }

  function buildBinaryAxes(binaryRows) {
    const visibleAxes = groupCoincidentBinaryAxes(binaryRows);
    visibleAxes.forEach((axis, visibleIndex) => {
      const sourceStart = {
        x: axis.offset.x + axis.minimum * axis.unit.x,
        y: axis.offset.y + axis.minimum * axis.unit.y,
        z: axis.offset.z + axis.minimum * axis.unit.z,
      };
      const sourceEnd = {
        x: axis.offset.x + axis.maximum * axis.unit.x,
        y: axis.offset.y + axis.maximum * axis.unit.y,
        z: axis.offset.z + axis.maximum * axis.unit.z,
      };
      const start = toWorld(sourceStart, new THREE.Vector3());
      const end = toWorld(sourceEnd, new THREE.Vector3());
      const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const material = new THREE.LineBasicMaterial({
        color: axis.sourceBinaryIds.length > 1
          ? COINCIDENT_AXIS_COLOR
          : AXIS_COLORS[visibleIndex % AXIS_COLORS.length],
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      line.userData = {
        sourceIndex: axis.sourceIndices[0],
        sourceBinaryId: axis.sourceBinaryIds[0],
        sourceBinaryIds: Object.freeze([...axis.sourceBinaryIds]),
        coincidentSourceCount: axis.sourceBinaryIds.length,
        valueAuthority: "source-carried-axis-point-normal-and-display-length",
      };
      axisGroup.add(line);
    });
  }

  function buildSweptEnvelope() {
    if (!entry) {
      return;
    }
    const dataset = entry.dataset;
    const duration = dataset.window.end - dataset.window.start;
    const requestedCount = Math.ceil(duration / dataset.window.sampleInterval) + 1;
    const frameCount = Math.max(2, Math.min(240, requestedCount));
    const frames = dataset.createFrameSamples({ frameCount });
    const points = [];
    const world = new THREE.Vector3();
    frames.forEach((frame) => {
      frame.states.forEach((state) => {
        toWorld(state.position, world);
        points.push(world.clone());
      });
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.PointsMaterial({
      color: SWEPT_ENVELOPE_COLOR,
      size: 0.032,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    const cloud = new THREE.Points(geometry, material);
    cloud.userData = {
      valueAuthority: "display-only-declared-interpolation",
      sampleCount: frameCount,
    };
    sweptEnvelopeGroup.add(cloud);
  }

  function dispose() {
    clearBorgSceneGroup(axisGroup);
    clearBorgSceneGroup(sweptEnvelopeGroup);
    clearBorgSceneGroup(prescribedPathGroup);
    clearBorgSceneGroup(prescribedTubeGroup);
    group.remove(
      axisGroup,
      sweptEnvelopeGroup,
      prescribedPathGroup,
      prescribedTubeGroup,
    );
  }

  return Object.freeze({
    setRecord,
    setDisplayMode,
    setPathVisible,
    setCameraMode,
    setTranslationFrame,
    setHistoryDepth,
    setSelectedWorldlineId,
    setTubeOptions,
    updateTime,
    dispose,
    get cameraMode() {
      return cameraMode;
    },
    get hasCoRotatingCarrier() {
      return referenceRotation != null;
    },
    get prescribedTranslation() {
      return translation;
    },
    get translationFrame() {
      return translationFrame;
    },
  });
}

function groupCoincidentBinaryAxes(binaryRows) {
  const groups = [];
  binaryRows.forEach((binary, sourceIndex) => {
    const axis = normalizeBinaryAxis(binary, sourceIndex);
    if (!axis) {
      return;
    }
    const group = groups.find((candidate) => axesCoincide(candidate, axis));
    if (group) {
      group.minimum = Math.min(group.minimum, axis.minimum);
      group.maximum = Math.max(group.maximum, axis.maximum);
      group.sourceIndices.push(sourceIndex);
      group.sourceBinaryIds.push(axis.sourceBinaryId);
      return;
    }
    groups.push({
      ...axis,
      sourceIndices: [sourceIndex],
      sourceBinaryIds: [axis.sourceBinaryId],
    });
  });
  return groups;
}

function normalizeBinaryAxis(binary, sourceIndex) {
  const normal = binary?.planeOrientation?.normal ?? binary?.planeNormal;
  const point = binary?.axisPoint;
  const halfLength = Number(binary?.axisDisplayHalfLength);
  if (!finiteVector(normal) || !finiteVector(point) || !(halfLength > 0)) {
    return null;
  }
  const normalLength = Math.hypot(Number(normal.x), Number(normal.y), Number(normal.z));
  if (!(normalLength > 0)) {
    return null;
  }
  const unit = {
    x: Number(normal.x) / normalLength,
    y: Number(normal.y) / normalLength,
    z: Number(normal.z) / normalLength,
  };
  const firstNonzero = [unit.x, unit.y, unit.z].find(
    (component) => Math.abs(component) > AXIS_COINCIDENCE_TOLERANCE,
  );
  if (firstNonzero < 0) {
    unit.x *= -1;
    unit.y *= -1;
    unit.z *= -1;
  }
  const numericPoint = {
    x: Number(point.x),
    y: Number(point.y),
    z: Number(point.z),
  };
  const center = numericPoint.x * unit.x + numericPoint.y * unit.y + numericPoint.z * unit.z;
  return {
    unit,
    offset: {
      x: numericPoint.x - center * unit.x,
      y: numericPoint.y - center * unit.y,
      z: numericPoint.z - center * unit.z,
    },
    minimum: center - halfLength,
    maximum: center + halfLength,
    sourceBinaryId: String(binary?.id ?? binary?.binaryId ?? `binary-${sourceIndex + 1}`),
  };
}

function axesCoincide(left, right) {
  return vectorDistance(left.unit, right.unit) <= AXIS_COINCIDENCE_TOLERANCE &&
    vectorDistance(left.offset, right.offset) <= AXIS_COINCIDENCE_TOLERANCE;
}

function vectorDistance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

function resolveSourceRotation(entry) {
  for (const binary of entry?.dataset?.binaries ?? []) {
    const frequency = Number(binary?.frequency);
    const normal = binary?.planeOrientation?.normal ?? binary?.planeNormal;
    const x = Number(normal?.x);
    const y = Number(normal?.y);
    const z = Number(normal?.z);
    if (
      Number.isFinite(frequency) && frequency > 0 &&
      Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)
    ) {
      const axis = new THREE.Vector3(x, y, z);
      if (axis.lengthSq() > 0) {
        axis.normalize();
        return Object.freeze({ frequency, axis });
      }
    }
  }
  return null;
}

function finiteVector(vector) {
  return ["x", "y", "z"].every((axis) => Number.isFinite(Number(vector?.[axis])));
}
