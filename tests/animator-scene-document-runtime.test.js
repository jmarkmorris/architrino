import test from "node:test";
import assert from "node:assert/strict";

import { normalizeAnimatorSceneDocument } from "../src/runtime/Animator2SceneDocumentRuntime.js";

test("animator scene document normalizes authored polyline paths to spline", () => {
  const documentData = normalizeAnimatorSceneDocument({
    scene: { id: "authored_curve_test", name: "Authored Curve Test" },
    assemblies: [
      {
        id: "authored_particle",
        label: "Authored Particle",
        motion: [{ type: "path.transport", pathId: "authored_path" }],
      },
    ],
    paths: [
      {
        id: "authored_path",
        metadata: { ownerAssemblyId: "authored_particle" },
        payload: {
          points: [
            [0, 0, 0],
            [1, 1, 0],
            [2, 0, 0],
          ],
          interpolate: "polyline",
        },
      },
    ],
  });

  assert.equal(documentData.paths[0].payload.interpolate, "spline");
});
