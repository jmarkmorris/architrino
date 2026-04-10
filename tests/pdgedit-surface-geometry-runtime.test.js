import test from "node:test";
import assert from "node:assert/strict";

import { buildPdgeditSplinePath } from "../src/apps/pdgedit/PdgeditSurfaceGeometryRuntime.js";

test("spline paths leave and arrive with horizontal endpoint tangents", () => {
  const spline = buildPdgeditSplinePath({
    leftObject: {
      kind: "assembly",
      x: 2,
      y: 0,
    },
    rightObject: {
      kind: "operator",
      x: 7,
      y: 2,
    },
  });

  assert.equal(spline.routingColumn, 6);
  assert.equal(
    spline.path,
    "M 400.00 120.00 C 424.00 120.00, 456.00 280.00, 480.00 280.00"
  );
});

test("spline slot offsets separate paths laterally while preserving horizontal tangents", () => {
  const spline = buildPdgeditSplinePath({
    leftObject: {
      kind: "assembly",
      x: 2,
      y: 0,
    },
    rightObject: {
      kind: "operator",
      x: 7,
      y: 2,
    },
    slotOffsetPx: 6,
  });

  assert.equal(spline.routingSlotX, 446);
  assert.equal(
    spline.path,
    "M 400.00 120.00 C 430.00 120.00, 462.00 280.00, 480.00 280.00"
  );
});
