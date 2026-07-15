import assert from "node:assert/strict";
import { test } from "node:test";

import { createBorgPathTrails } from "../src/apps/borg/BorgPathTrails.js";

/**
 * A trail is a record of where an architrino has already been.
 *
 * Frame rows are computed ahead of playback, so every retained row exists in
 * memory long before the architrino reaches it. The bug these tests pin is a
 * trail drawn from every row in memory: it ran ahead of the architrino and
 * showed the future.
 */

function createGroupStub() {
  const children = [];
  return {
    children,
    add: (object) => children.push(object),
    remove: (object) => {
      const index = children.indexOf(object);
      if (index >= 0) {
        children.splice(index, 1);
      }
    },
  };
}

function createTrails(group = createGroupStub()) {
  return createBorgPathTrails({
    group,
    renderOrder: 2,
    getStyle: () => ({ color: 0x336699 }),
    // Identity mapping keeps the assertions about time, not about camera space.
    toWorld: (position, target) => {
      target.x = position.x;
      target.y = position.y;
      target.z = position.z;
      return target;
    },
  });
}

/** Rows for one straight path, one row per frame index. */
function straightPathRows(frameCount, pathKey = 1001) {
  return Array.from({ length: frameCount }, (unused, frameIndex) => ({
    pathKey,
    frameIndex,
    time: frameIndex * 0.2,
    position: { x: frameIndex, y: 0, z: 0 },
  }));
}

/** Points actually submitted for drawing, as (k points -> 2*(k-1) vertices). */
function drawnPointCount(trail) {
  const { count } = trail.geometry.drawRange;
  return count === 0 ? 0 : count / 2 + 1;
}

function onlyTrail(group) {
  assert.equal(group.children.length, 1);
  return group.children[0];
}

test("path trail draws no future: rows ahead of the displayed frame are withheld", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  // All 100 rows are in memory, exactly as they are when the solver has run
  // ahead of playback.
  trails.appendFrameRows(straightPathRows(100));

  trails.setThroughFrameIndex(0);
  assert.equal(drawnPointCount(onlyTrail(group)), 0, "no segment exists before the first step");

  trails.setThroughFrameIndex(10);
  assert.equal(drawnPointCount(onlyTrail(group)), 11, "trail covers frames 0..10 and stops");

  trails.setThroughFrameIndex(99);
  assert.equal(drawnPointCount(onlyTrail(group)), 100, "at the last frame the whole path is history");
});

test("path trail ends at the architrino, not past it", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(50));
  trails.setThroughFrameIndex(20);

  const trail = onlyTrail(group);
  const drawnVertexCount = trail.geometry.drawRange.count;
  const positions = trail.geometry.getAttribute("position").array;
  // x equals frameIndex for this path, so the last drawn vertex names the
  // frame the trail reaches.
  const lastDrawnX = positions[(drawnVertexCount - 1) * 3];
  assert.equal(lastDrawnX, 20, "trail head sits on the displayed frame");

  // The future is still buffered behind the draw range, not discarded.
  assert.equal(positions[(drawnVertexCount + 1) * 3] > 20, true);
});

test("path trail rewinds when playback scrubs backwards", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(40));

  trails.setThroughFrameIndex(30);
  assert.equal(drawnPointCount(onlyTrail(group)), 31);
  trails.setThroughFrameIndex(5);
  assert.equal(drawnPointCount(onlyTrail(group)), 6, "scrubbing back shortens the trail");
});

test("appending a chunk does not redraw history already buffered", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(20));
  trails.setThroughFrameIndex(19);
  const firstTrail = onlyTrail(group);
  const geometryBefore = firstTrail.geometry;

  // A later chunk arrives. The trail must extend, not be rebuilt: rebuilding
  // was the per-chunk cost that scaled with the whole run.
  trails.appendFrameRows(
    straightPathRows(40).filter((row) => row.frameIndex >= 20),
  );
  assert.equal(group.children.length, 1, "no second trail object was created");
  assert.equal(onlyTrail(group).geometry, geometryBefore, "geometry was reused, not rebuilt");

  trails.setThroughFrameIndex(39);
  assert.equal(drawnPointCount(onlyTrail(group)), 40);
});

test("path trail grows past its initial buffer without losing or reordering history", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  // Well past the 512-point initial capacity, forcing at least one growth.
  const rows = straightPathRows(1500);
  rows.forEach((row) => trails.appendFrameRows([row]));
  trails.setThroughFrameIndex(1499);

  const trail = onlyTrail(group);
  assert.equal(drawnPointCount(trail), 1500);
  const positions = trail.geometry.getAttribute("position").array;
  const drawnVertexCount = trail.geometry.drawRange.count;
  for (let vertex = 0; vertex < drawnVertexCount; vertex += 1) {
    assert.equal(Number.isFinite(positions[vertex * 3]), true, `vertex ${vertex} survived growth`);
  }
  assert.equal(positions[(drawnVertexCount - 1) * 3], 1499, "last point is the last frame");
});

test("duplicate and out-of-order rows from overlapping chunks are not appended twice", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(10));
  // Chunk boundaries can re-send rows the trail already holds.
  trails.appendFrameRows(straightPathRows(10));
  trails.setThroughFrameIndex(9);
  assert.equal(drawnPointCount(onlyTrail(group)), 10, "replayed rows did not extend the trail");
});

test("each path key gets its own trail", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows([...straightPathRows(5, 1001), ...straightPathRows(5, 1002)]);
  assert.equal(group.children.length, 2);
  assert.equal(trails.retainedTrailCount, 2);
});

test("hidden trails stay hidden as new history arrives", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.setVisible(false);
  trails.appendFrameRows(straightPathRows(5));
  assert.equal(onlyTrail(group).visible, false, "a trail created while hidden is not shown");

  trails.setVisible(true);
  assert.equal(onlyTrail(group).visible, true);
  trails.appendFrameRows(straightPathRows(10).filter((row) => row.frameIndex >= 5));
  assert.equal(onlyTrail(group).visible, true);
});

test("compacted history is time-bounded too, and sits behind the retained trail", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.setCompactedPathHistory({
    1001: [
      { frameIndex: 0, time: 0, position: { x: 0, y: 0, z: 0 } },
      { frameIndex: 8, time: 1.6, position: { x: 8, y: 0, z: 0 } },
      { frameIndex: 16, time: 3.2, position: { x: 16, y: 0, z: 0 } },
    ],
  });
  const compactedTrail = onlyTrail(group);
  assert.equal(compactedTrail.renderOrder, 1, "faded older history renders under the recent trail");

  trails.setThroughFrameIndex(8);
  assert.equal(drawnPointCount(compactedTrail), 2, "older history obeys the same time bound");
  trails.setThroughFrameIndex(100);
  assert.equal(drawnPointCount(compactedTrail), 3);
});

test("reset clears history and reapplies the current time bound", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(30));
  trails.setThroughFrameIndex(29);
  assert.equal(drawnPointCount(onlyTrail(group)), 30);

  // A new distribution replaces history outright; stale points must not
  // survive into the new run's trail.
  trails.reset({ frameRows: straightPathRows(4), compactedPathHistory: {} });
  assert.equal(drawnPointCount(onlyTrail(group)), 4);
});

/**
 * Replay three r161 WebGLAttributes.updateBuffer against a zeroed buffer.
 *
 * The trail writes into a persistent array and marks it for upload; nothing in
 * the unit tests renders, so an upload that names the wrong region is invisible
 * until it reaches a GPU as a mangled trail. This reproduces what the renderer
 * would actually send.
 */
function simulateGpuUpload(attribute) {
  const gpu = new Float32Array(attribute.array.length);
  if (attribute.updateRanges.length === 0) {
    // updateRange.count === -1 && updateRanges.length === 0 -> full bufferSubData
    gpu.set(attribute.array, 0);
    return gpu;
  }
  for (const range of attribute.updateRanges) {
    gpu.set(attribute.array.subarray(range.start, range.start + range.count), range.start);
  }
  return gpu;
}

test("what the GPU receives reproduces the trail geometry exactly", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows(straightPathRows(6));
  trails.setThroughFrameIndex(5);

  const trail = onlyTrail(group);
  const attribute = trail.geometry.getAttribute("position");
  // needsUpdate is write-only in three; version is what it bumps, and what the
  // renderer reads to decide whether to re-upload.
  assert.ok(attribute.version > 0, "the batch was marked for upload");

  const gpu = simulateGpuUpload(attribute);
  const drawnFloats = trail.geometry.drawRange.count * 3;
  assert.deepEqual(
    Array.from(gpu.subarray(0, drawnFloats)),
    Array.from(attribute.array.subarray(0, drawnFloats)),
    "uploaded buffer must match the geometry the trail built",
  );
});

test("a hidden trail does not accumulate pending uploads for the life of the run", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  // The path layer is off by default, and three only drains pending update
  // ranges when an object is actually rendered.
  trails.setVisible(false);
  for (let chunk = 0; chunk < 200; chunk += 1) {
    trails.appendFrameRows(
      straightPathRows(16).map((row) => ({ ...row, frameIndex: chunk * 16 + row.frameIndex })),
    );
  }
  const attribute = onlyTrail(group).geometry.getAttribute("position");
  assert.equal(
    attribute.updateRanges.length,
    0,
    "pending update ranges must not grow without bound while the layer is hidden",
  );
});

test("dispose releases every trail object and its GPU resources", () => {
  const group = createGroupStub();
  const trails = createTrails(group);
  trails.appendFrameRows([...straightPathRows(5, 1001), ...straightPathRows(5, 1002)]);
  const disposed = group.children.map((child) => {
    let geometryDisposed = false;
    let materialDisposed = false;
    const originalGeometryDispose = child.geometry.dispose.bind(child.geometry);
    const originalMaterialDispose = child.material.dispose.bind(child.material);
    child.geometry.dispose = () => {
      geometryDisposed = true;
      originalGeometryDispose();
    };
    child.material.dispose = () => {
      materialDisposed = true;
      originalMaterialDispose();
    };
    return () => geometryDisposed && materialDisposed;
  });

  trails.dispose();
  assert.equal(group.children.length, 0);
  assert.equal(trails.retainedTrailCount, 0);
  assert.equal(disposed.every((wasDisposed) => wasDisposed()), true);
});
