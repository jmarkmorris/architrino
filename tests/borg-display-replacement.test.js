import assert from "node:assert/strict";
import test from "node:test";

import {
  applyBorgDisplayReplacementTransform,
  borgNdcPositionIsOutsideScreen,
  createBorgDisplayReplacementTransform,
  createRandomBorgDisplayPosition,
} from "../src/apps/borg/BorgDisplayReplacement.js";

test("Borg display replacement starts inside the sphere and preserves later displacement", () => {
  const values = [0.5, 0.5, 0.5];
  let index = 0;
  const displayPosition = createRandomBorgDisplayPosition({
    center: { x: 0.5, y: 0.5, z: 0.5 },
    radius: 0.5,
    random: () => values[index++ % values.length],
  });
  const transform = createBorgDisplayReplacementTransform({
    solverPosition: { x: 10, y: -3, z: 2 },
    displayPosition,
    generation: 4,
    startTime: 2.5,
  });

  assert.deepEqual(displayPosition, { x: 0.5, y: 0.5, z: 0.5 });
  const advanced = applyBorgDisplayReplacementTransform(
    { x: 10.1, y: -3.2, z: 2.3 },
    transform,
  );
  assert.ok(Math.abs(advanced.x - 0.6) < 1e-12);
  assert.ok(Math.abs(advanced.y - 0.3) < 1e-12);
  assert.ok(Math.abs(advanced.z - 0.8) < 1e-12);
  assert.equal(transform.generation, 4);
  assert.equal(transform.startTime, 2.5);
  const earlier = { x: 9.8, y: -2.9, z: 1.7 };
  assert.equal(
    applyBorgDisplayReplacementTransform(earlier, transform, 2.49),
    earlier,
  );
  assert.notEqual(
    applyBorgDisplayReplacementTransform(earlier, transform, 2.5),
    earlier,
  );
});

test("Borg screen test rejects every side and depth plane", () => {
  assert.equal(borgNdcPositionIsOutsideScreen({ x: 0, y: 0, z: 0 }), false);
  for (const position of [
    { x: -1.01, y: 0, z: 0 },
    { x: 1.01, y: 0, z: 0 },
    { x: 0, y: -1.01, z: 0 },
    { x: 0, y: 1.01, z: 0 },
    { x: 0, y: 0, z: -1.01 },
    { x: 0, y: 0, z: 1.01 },
  ]) {
    assert.equal(borgNdcPositionIsOutsideScreen(position), true);
  }
});
