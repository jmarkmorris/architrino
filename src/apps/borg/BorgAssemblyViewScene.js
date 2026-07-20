import * as THREE from "../../../vendor/three/three.module.js";

const ANSATZ_COLOR = 0xf1c76d;
const SWEPT_ENVELOPE_COLOR = 0x7bd6c2;

export function createBorgAssemblyViewScene({
  group,
  toWorld,
  render,
}) {
  if (!group || typeof group.add !== "function") {
    throw new TypeError("Borg assembly-view scene requires a Three.js group.");
  }
  const ansatzGroup = new THREE.Group();
  const sweptEnvelopeGroup = new THREE.Group();
  group.add(ansatzGroup, sweptEnvelopeGroup);
  let entry = null;
  let cameraMode = "free";
  let referenceRotation = null;

  function setRecord(nextEntry) {
    entry = nextEntry;
    clearGroup(ansatzGroup);
    clearGroup(sweptEnvelopeGroup);
    buildAnsatz(nextEntry?.dataset?.ansatz ?? []);
    referenceRotation = resolveSourceRotation(nextEntry);
    setCameraMode("free");
  }

  function setDisplayMode(mode) {
    ansatzGroup.visible = mode === "chart-pose";
    sweptEnvelopeGroup.visible = mode === "swept-envelope";
    if (mode === "swept-envelope" && sweptEnvelopeGroup.children.length === 0) {
      buildSweptEnvelope();
    }
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
    clearGroup(ansatzGroup);
    clearGroup(sweptEnvelopeGroup);
    group.remove(ansatzGroup, sweptEnvelopeGroup);
  }

  return Object.freeze({
    setRecord,
    setDisplayMode,
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

function clearGroup(group) {
  group.children.slice().forEach((object) => {
    group.remove(object);
    object.geometry?.dispose?.();
    object.material?.dispose?.();
  });
}
