import * as THREE from "../../../vendor/three/three.module.js";
import {
  BORG_PRESCRIBED_DISPLAY_FRAME_CO_TRANSLATING,
  BORG_PRESCRIBED_DISPLAY_FRAME_FIXED,
  applyBorgPrescribedDisplayFrame,
  assertBorgPrescribedDisplayFrame,
  resolveBorgPrescribedTranslation,
} from "./BorgPrescribedTranslation.js";

const ANSATZ_COLOR = 0xc6b6ff;
const AXIS_COLORS = Object.freeze([0x8fdcf2, 0xf0a6d2, 0xb8a8ff]);
const COINCIDENT_AXIS_COLOR = 0xd6dde3;
const AXIS_COINCIDENCE_TOLERANCE = 1e-9;
const SWEPT_ENVELOPE_COLOR = 0x7bd6c2;
const PRESCRIBED_PATH_COLORS = Object.freeze([
  0x82c7ff,
  0xff9b92,
  0xb7e89b,
  0xffd37a,
  0xc6b6ff,
  0x83e2d1,
]);
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
  const ansatzGroup = new THREE.Group();
  ansatzGroup.userData.kind = "source-carried-ansatz-curves";
  const sweptEnvelopeGroup = new THREE.Group();
  sweptEnvelopeGroup.userData.kind = "display-only-swept-envelope";
  const prescribedPathGroup = new THREE.Group();
  prescribedPathGroup.userData.kind = "prescribed-path-history-strands";
  const prescribedTubeGroup = new THREE.Group();
  prescribedTubeGroup.userData.kind = "display-only-path-history-tubes";
  group.add(
    axisGroup,
    ansatzGroup,
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
    clearGroup(axisGroup);
    clearGroup(ansatzGroup);
    clearGroup(sweptEnvelopeGroup);
    clearGroup(prescribedPathGroup);
    clearGroup(prescribedTubeGroup);
    translation = resolveBorgPrescribedTranslation(nextEntry);
    translationFrame = BORG_PRESCRIBED_DISPLAY_FRAME_FIXED;
    currentTime = Number(nextEntry?.dataset?.window?.start ?? 0);
    historyDepth = Number.POSITIVE_INFINITY;
    selectedWorldlineId = null;
    buildBinaryAxes(nextEntry?.dataset?.binaries ?? []);
    buildAnsatz(nextEntry?.dataset?.ansatz ?? []);
    buildPrescribedPathStrands();
    referenceRotation = resolveSourceRotation(nextEntry);
    ansatzGroup.visible = pathVisible && displayMode === "chart-pose";
    sweptEnvelopeGroup.visible = displayMode === "swept-envelope";
    prescribedPathGroup.visible = pathVisible;
    prescribedTubeGroup.visible = pathVisible && tubeVisible;
    setCameraMode("free");
  }

  function setDisplayMode(mode) {
    displayMode = mode;
    ansatzGroup.visible = pathVisible && mode === "chart-pose";
    sweptEnvelopeGroup.visible = mode === "swept-envelope";
    if (mode === "swept-envelope" && sweptEnvelopeGroup.children.length === 0) {
      buildSweptEnvelope();
    }
    render?.();
  }

  function setPathVisible(visible) {
    pathVisible = Boolean(visible);
    ansatzGroup.visible = pathVisible && displayMode === "chart-pose";
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
    prescribedPathGroup.children.forEach((line) => {
      const positions = line.userData.positionArrays?.[translationFrame];
      if (positions) {
        line.geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        );
      }
    });
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
    const binaryIndexByWorldline = binaryMembership(dataset.binaries);
    dataset.worldlines.forEach((worldline, worldlineIndex) => {
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
      const binaryIndex = binaryIndexByWorldline.get(worldline.id) ?? worldlineIndex;
      const material = new THREE.LineBasicMaterial({
        color: PRESCRIBED_PATH_COLORS[
          binaryIndex % PRESCRIBED_PATH_COLORS.length
        ],
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      line.userData = {
        kind: "prescribed-path-history-strand",
        worldlineId: worldline.id,
        pathKey: worldline.pathKey,
        binaryIndex,
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
      prescribedPathGroup.add(line);
    });
    updatePrescribedPathWindows();
  }

  function updatePrescribedPathWindows() {
    if (!Number.isFinite(currentTime)) return;
    prescribedPathGroup.children.forEach((line) => {
      const times = line.userData.times ?? [];
      const firstTime = currentTime - historyDepth;
      let start = 0;
      while (start < times.length && times[start] < firstTime) start += 1;
      let end = start;
      while (end < times.length && times[end] <= currentTime + 1e-12) end += 1;
      line.geometry.setDrawRange(start, Math.max(0, end - start));
    });
  }

  function rebuildSelectedTube() {
    clearGroup(prescribedTubeGroup);
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
    const strand = prescribedPathGroup.children.find(
      (line) => line.userData.worldlineId === worldline.id,
    );
    const material = new THREE.MeshBasicMaterial({
      color: strand?.material?.color ?? 0xc6b6ff,
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

  function buildAnsatz(ansatzRows) {
    ansatzRows.forEach((row, rowIndex) => {
      const points = readPolylinePoints(row);
      if (points.length < 2) {
        return;
      }
      const positions = [];
      const from = new THREE.Vector3();
      const to = new THREE.Vector3();
      for (let index = 0; index + 1 < points.length; index += 1) {
        toWorld(points[index], from);
        toWorld(points[index + 1], to);
        positions.push(from.x, from.y, from.z, to.x, to.y, to.z);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: row?.color ?? ANSATZ_COLOR,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
      });
      const line = new THREE.LineSegments(geometry, material);
      line.userData = {
        sourceIndex: rowIndex,
        sourceLabel: row?.label ?? `ansatz-${rowIndex + 1}`,
      };
      ansatzGroup.add(line);
    });
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
    clearGroup(axisGroup);
    clearGroup(ansatzGroup);
    clearGroup(sweptEnvelopeGroup);
    clearGroup(prescribedPathGroup);
    clearGroup(prescribedTubeGroup);
    group.remove(
      axisGroup,
      ansatzGroup,
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

function binaryMembership(binaryRows) {
  const map = new Map();
  binaryRows.forEach((binary, index) => {
    const members = binary?.members ?? binary?.worldlineIds;
    if (!Array.isArray(members)) return;
    members.forEach((worldlineId) => map.set(String(worldlineId), index));
  });
  return map;
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

function readPolylinePoints(row) {
  const points = row?.points ?? row?.samples ?? row?.polyline;
  if (!Array.isArray(points)) {
    return [];
  }
  return points.map((point) => point?.position ?? point).filter((point) =>
    Number.isFinite(Number(point?.x)) &&
    Number.isFinite(Number(point?.y)) &&
    Number.isFinite(Number(point?.z)),
  );
}

function finiteVector(vector) {
  return ["x", "y", "z"].every((axis) => Number.isFinite(Number(vector?.[axis])));
}

function clearGroup(group) {
  group.children.slice().forEach((object) => {
    group.remove(object);
    object.geometry?.dispose?.();
    object.material?.dispose?.();
  });
}
