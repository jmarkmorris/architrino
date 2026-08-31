import * as THREE from "../../../vendor/three/three.module.js";
import { BORG_ELECTRINO_COLOR, BORG_POSITRINO_COLOR } from "./BorgOrbitTrails.mjs";

const INITIAL_POINT_CAPACITY = 512;
const TRAIL_OPACITY = 1;

/**
 * Path-history trails for the Borg app.
 *
 * Two rules drive this module:
 *
 * 1. A trail is a record of where an architrino has already been. Only points
 *    at or before the displayed frame index are drawn, so the trail always
 *    ends at the architrino and never runs ahead of it. Frame rows are
 *    computed ahead of playback, so an unfiltered trail draws the future.
 * 2. Trails are appended to, never rebuilt. Each trail owns a growable vertex
 *    buffer; a new chunk writes only its own points, and advancing a frame
 *    moves a draw range rather than allocating geometry.
 *
 * Adjacent EOM or recorded rows are joined by their own line segment, with interior
 * points duplicated so that k points yield 2*(k-1) vertices. Nothing is
 * interpolated, smoothed, or fitted between rows: what is drawn is what the
 * solver reported.
 */
class BorgPathTrail {
  constructor({ color, opacity, renderOrder, capacity = INITIAL_POINT_CAPACITY }) {
    this.capacity = Math.max(2, capacity);
    this.pointCount = 0;
    this.drawnPointCount = -1;
    this.drawnFirstPoint = -1;
    this.dirty = false;
    this.points = new Float32Array(this.capacity * 3);
    this.frameIndices = new Int32Array(this.capacity);
    this.times = new Float64Array(this.capacity);
    this.geometry = new THREE.BufferGeometry();
    this.setSegmentPositions(new Float32Array((this.capacity - 1) * 6));
    this.geometry.setDrawRange(0, 0);
    this.material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthTest: false,
      depthWrite: false,
    });
    this.object = new THREE.LineSegments(this.geometry, this.material);
    // The trail grows past its initial bounds every chunk; a stale bounding
    // sphere would cull it out of view.
    this.object.frustumCulled = false;
    this.object.renderOrder = renderOrder;
    this.object.visible = false;
  }

  setSegmentPositions(segmentPositions) {
    this.segmentPositions = segmentPositions;
    this.attribute = new THREE.BufferAttribute(this.segmentPositions, 3);
    this.attribute.setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute("position", this.attribute);
  }

  grow() {
    const nextCapacity = this.capacity * 2;
    const nextPoints = new Float32Array(nextCapacity * 3);
    nextPoints.set(this.points);
    const nextFrameIndices = new Int32Array(nextCapacity);
    nextFrameIndices.set(this.frameIndices);
    const nextTimes = new Float64Array(nextCapacity);
    nextTimes.set(this.times);
    const nextSegmentPositions = new Float32Array((nextCapacity - 1) * 6);
    nextSegmentPositions.set(this.segmentPositions);
    this.capacity = nextCapacity;
    this.points = nextPoints;
    this.frameIndices = nextFrameIndices;
    this.times = nextTimes;
    this.setSegmentPositions(nextSegmentPositions);
    this.drawnPointCount = -1;
    this.dirty = true;
  }

  appendPoint(x, y, z, frameIndex, time) {
    // Rows arrive in frame order. A row at or behind the last appended point
    // is a duplicate from an overlapping chunk, not new history.
    if (this.pointCount > 0 && frameIndex <= this.frameIndices[this.pointCount - 1]) {
      return;
    }
    if (this.pointCount === this.capacity) {
      this.grow();
    }
    const pointIndex = this.pointCount;
    const pointOffset = pointIndex * 3;
    this.points[pointOffset] = x;
    this.points[pointOffset + 1] = y;
    this.points[pointOffset + 2] = z;
    this.frameIndices[pointIndex] = frameIndex;
    this.times[pointIndex] = time;
    if (pointIndex > 0) {
      const previousOffset = (pointIndex - 1) * 3;
      const segmentOffset = (pointIndex - 1) * 6;
      this.segmentPositions[segmentOffset] = this.points[previousOffset];
      this.segmentPositions[segmentOffset + 1] = this.points[previousOffset + 1];
      this.segmentPositions[segmentOffset + 2] = this.points[previousOffset + 2];
      this.segmentPositions[segmentOffset + 3] = x;
      this.segmentPositions[segmentOffset + 4] = y;
      this.segmentPositions[segmentOffset + 5] = z;
      this.dirty = true;
    }
    this.pointCount = pointIndex + 1;
  }

  /**
   * Hand the batch to the GPU, once.
   *
   * This uploads the whole buffer rather than the appended sub-range. Partial
   * uploads via addUpdateRange are only drained when the object is actually
   * rendered. When the operator hides this layer, pending ranges would
   * accumulate for the life of the run and then flush as thousands of tiny
   * writes the moment it was switched on. A full upload of a few tens of
   * kilobytes once per chunk is not worth that.
   */
  flush() {
    if (!this.dirty) {
      return;
    }
    this.dirty = false;
    this.attribute.needsUpdate = true;
  }

  clear() {
    this.pointCount = 0;
    this.drawnPointCount = -1;
    this.drawnFirstPoint = -1;
    this.geometry.setDrawRange(0, 0);
  }

  /** Number of points at or before frameIndex, by binary search. */
  countPointsThrough(frameIndex) {
    let low = 0;
    let high = this.pointCount;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (this.frameIndices[middle] <= frameIndex) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    return low;
  }

  firstPointAtOrAfter(time, high) {
    let low = 0;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (this.times[middle] < time) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    return low;
  }

  setVisibleWindow(frameIndex, throughTime, duration) {
    const visiblePointCount = Number.isFinite(frameIndex)
      ? this.countPointsThrough(frameIndex)
      : this.pointCount;
    const firstPoint = Number.isFinite(throughTime) && Number.isFinite(duration)
      ? this.firstPointAtOrAfter(throughTime - duration, visiblePointCount)
      : 0;
    if (
      visiblePointCount === this.drawnPointCount &&
      firstPoint === this.drawnFirstPoint
    ) {
      return;
    }
    this.drawnPointCount = visiblePointCount;
    this.drawnFirstPoint = firstPoint;
    this.geometry.setDrawRange(
      firstPoint * 2,
      Math.max(0, visiblePointCount - firstPoint - 1) * 2,
    );
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

export function createBorgPathTrails({
  group,
  renderOrder,
  getStyle,
  toWorld,
}) {
  const retainedTrails = new Map();
  const compactedTrails = new Map();
  let visible = false;
  let throughFrameIndex = Number.POSITIVE_INFINITY;
  let throughTime = Number.POSITIVE_INFINITY;
  let visibleDuration = Number.POSITIVE_INFINITY;
  let compactedSource = null;
  const scratch = { x: 0, y: 0, z: 0 };

  return {
    reset,
    appendFrameRows,
    setCompactedPathHistory,
    resetPath,
    setThroughFrameIndex,
    setVisibleWindow,
    setVisibleDuration,
    setVisible,
    dispose,
    get retainedTrailCount() {
      return retainedTrails.size;
    },
  };

  function trailColor(pathKey) {
    const numericPathKey = Number(pathKey);
    const style = getStyle(Number.isFinite(numericPathKey) ? numericPathKey : pathKey);
    if (![BORG_POSITRINO_COLOR, BORG_ELECTRINO_COLOR].includes(style.color)) throw new TypeError("Borg path has no valid polarity color.");
    return style.color;
  }

  function ensureTrail(trails, pathKey, { opacity, order }) {
    const existing = trails.get(pathKey);
    if (existing) {
      return existing;
    }
    const trail = new BorgPathTrail({
      color: trailColor(pathKey),
      opacity,
      renderOrder: order,
    });
    trail.object.visible = visible;
    group.add(trail.object);
    trails.set(pathKey, trail);
    return trail;
  }

  function appendFrameRows(frameRows) {
    if (!Array.isArray(frameRows) || frameRows.length === 0) {
      return;
    }
    // Rows for one frame index arrive interleaved across path keys, already in
    // frame order, so a single pass suffices; no per-path filter or sort.
    frameRows.forEach((row) => {
      if (!row?.position || !Number.isFinite(Number(row.frameIndex))) {
        return;
      }
      const trail = ensureTrail(retainedTrails, String(row.pathKey), {
        opacity: TRAIL_OPACITY,
        order: renderOrder,
      });
      toWorld(row.position, scratch);
      trail.appendPoint(
        scratch.x,
        scratch.y,
        scratch.z,
        Number(row.frameIndex),
        Number(row.time),
      );
    });
    retainedTrails.forEach((trail) => trail.flush());
    applyThroughFrameIndex();
  }

  function reset({ frameRows = [], compactedPathHistory = {} } = {}) {
    retainedTrails.forEach((trail) => trail.clear());
    compactedSource = null;
    setCompactedPathHistory(compactedPathHistory);
    appendFrameRows(frameRows);
  }

  function resetPath(pathKey) {
    const exactKey = String(pathKey);
    retainedTrails.get(exactKey)?.clear();
    compactedTrails.get(exactKey)?.clear();
  }

  function setCompactedPathHistory(compactedPathHistory) {
    // Compaction runs once every few hundred frame sets; identity is stable
    // between passes, so rebuilding only on change keeps this off the hot path.
    if (compactedPathHistory === compactedSource) {
      return;
    }
    compactedSource = compactedPathHistory;
    compactedTrails.forEach((trail) => trail.clear());
    Object.entries(compactedPathHistory ?? {}).forEach(([pathKey, points]) => {
      if (!Array.isArray(points) || points.length < 2) {
        return;
      }
      const trail = ensureTrail(compactedTrails, String(pathKey), {
        opacity: TRAIL_OPACITY,
        order: renderOrder - 1,
      });
      points.forEach((point) => {
        if (!point?.position) {
          return;
        }
        toWorld(point.position, scratch);
        trail.appendPoint(
          scratch.x,
          scratch.y,
          scratch.z,
          Number(point.frameIndex),
          Number(point.time),
        );
      });
    });
    compactedTrails.forEach((trail) => trail.flush());
    applyThroughFrameIndex();
  }

  function setThroughFrameIndex(frameIndex) {
    throughFrameIndex = frameIndex;
    throughTime = Number.POSITIVE_INFINITY;
    visibleDuration = Number.POSITIVE_INFINITY;
    applyThroughFrameIndex();
  }

  function setVisibleWindow({
    throughFrameIndex: nextFrameIndex,
    throughTime: nextTime,
    duration,
  }) {
    throughFrameIndex = Number(nextFrameIndex);
    throughTime = Number(nextTime);
    visibleDuration = Number(duration);
    applyThroughFrameIndex();
  }

  function setVisibleDuration(duration) {
    visibleDuration = Number(duration);
    applyThroughFrameIndex();
  }

  function applyThroughFrameIndex() {
    retainedTrails.forEach((trail) => trail.setVisibleWindow(
      throughFrameIndex,
      throughTime,
      visibleDuration,
    ));
    compactedTrails.forEach((trail) => trail.setVisibleWindow(
      throughFrameIndex,
      throughTime,
      visibleDuration,
    ));
  }

  function setVisible(nextVisible) {
    visible = Boolean(nextVisible);
    retainedTrails.forEach((trail) => {
      trail.object.visible = visible;
    });
    compactedTrails.forEach((trail) => {
      trail.object.visible = visible;
    });
  }

  function dispose() {
    retainedTrails.forEach((trail) => {
      group.remove(trail.object);
      trail.dispose();
    });
    compactedTrails.forEach((trail) => {
      group.remove(trail.object);
      trail.dispose();
    });
    retainedTrails.clear();
    compactedTrails.clear();
    compactedSource = null;
  }
}
