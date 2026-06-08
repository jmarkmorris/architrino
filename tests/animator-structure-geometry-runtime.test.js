import test from "node:test";
import assert from "node:assert/strict";

import { createAnimatorStructureGeometryRuntime } from "../src/apps/animator/AnimatorStructureGeometryRuntime.js";

function createFakeThree() {
  class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    clone() {
      return new Vector3(this.x, this.y, this.z);
    }
  }

  class CatmullRomCurve3 {
    constructor(points, closed, curveType, tension) {
      this.points = points;
      this.closed = closed;
      this.curveType = curveType;
      this.tension = tension;
    }

    getPoint(t) {
      return new Vector3(10 + t, 20 + this.points.length, this.tension);
    }
  }

  return {
    Vector3,
    CatmullRomCurve3,
    MathUtils: {
      lerp(from, to, alpha) {
        return from + (to - from) * alpha;
      },
    },
  };
}

test("animator authored polyline path samples through the curve path", () => {
  const runtime = createAnimatorStructureGeometryRuntime({
    THREE: createFakeThree(),
    clampFn(value, min, max) {
      return Math.min(max, Math.max(min, value));
    },
  });

  const curved = runtime.sampleAnimatorPointAt(
    [
      [0, 0, 0],
      [1, 2, 0],
      [2, 0, 0],
    ],
    0.5,
    { interpolate: "polyline" }
  );
  assert.deepEqual(
    { x: curved.x, y: curved.y, z: curved.z },
    { x: 10.5, y: 23, z: 0.5 }
  );

  const linear = runtime.sampleAnimatorPointAt(
    [
      [0, 0, 0],
      [1, 2, 0],
      [2, 0, 0],
    ],
    0.5,
    { interpolate: "linear" }
  );
  assert.deepEqual(
    { x: linear.x, y: linear.y, z: linear.z },
    { x: 1, y: 2, z: 0 }
  );
});
