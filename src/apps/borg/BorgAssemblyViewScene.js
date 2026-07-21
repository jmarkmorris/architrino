import * as THREE from "../../../vendor/three/three.module.js";

const ANSATZ_COLOR = 0xc6b6ff;
const AXIS_COLORS = Object.freeze([0x8fdcf2, 0xf0a6d2, 0xb8a8ff]);
const COINCIDENT_AXIS_COLOR = 0xd6dde3;
const AXIS_COINCIDENCE_TOLERANCE = 1e-9;
const SWEPT_ENVELOPE_COLOR = 0x7bd6c2;

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
  group.add(axisGroup, ansatzGroup, sweptEnvelopeGroup);
  let entry = null;
  let cameraMode = "free";
  let referenceRotation = null;
  let displayMode = "animated";
  let pathVisible = true;

  function setRecord(nextEntry) {
    entry = nextEntry;
    clearGroup(axisGroup);
    clearGroup(ansatzGroup);
    clearGroup(sweptEnvelopeGroup);
    buildBinaryAxes(nextEntry?.dataset?.binaries ?? []);
    buildAnsatz(nextEntry?.dataset?.ansatz ?? []);
    referenceRotation = resolveSourceRotation(nextEntry);
    ansatzGroup.visible = pathVisible && displayMode === "chart-pose";
    sweptEnvelopeGroup.visible = displayMode === "swept-envelope";
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
    if (cameraMode !== "co-rotating" || !referenceRotation || !entry) {
      return;
    }
    const elapsed = Number(time) - entry.dataset.window.start;
    group.quaternion.setFromAxisAngle(
      referenceRotation.axis,
      -2 * Math.PI * referenceRotation.frequency * elapsed,
    );
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
    group.remove(axisGroup, ansatzGroup, sweptEnvelopeGroup);
  }

  return Object.freeze({
    setRecord,
    setDisplayMode,
    setPathVisible,
    setCameraMode,
    updateTime,
    dispose,
    get cameraMode() {
      return cameraMode;
    },
    get hasCoRotatingCarrier() {
      return referenceRotation != null;
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
