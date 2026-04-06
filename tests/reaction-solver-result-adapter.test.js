import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionSnapshotFromSolverResult } from "../src/apps/reaction/ReactionSolverResultAdapterRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("solver result adapter builds a strict Reaction snapshot from a solver-result fixture", () => {
  const resultFixture = readJson("content/contracts/examples/solver-result/associate_photon_result.v1.json");
  const snapshot = buildReactionSnapshotFromSolverResult(resultFixture);

  assert.equal(snapshot.participants.some((participant) => participant.id === "associate:1"), true);
  assert.equal(snapshot.participants.some((participant) => participant.id === "product_photon"), true);
  assert.equal(
    snapshot.participants.find((participant) => participant.id === "associate:1")?.side,
    "operator"
  );
  assert.deepEqual(
    snapshot.mappings.map((mapping) => [mapping.sourceRole, mapping.targetRole]),
    [
      ["reactant", "operator-input"],
      ["reactant", "operator-input"],
      ["operator-output", "product"],
      ["operator-output", "product"],
    ]
  );
});

test("solver result adapter rejects participants without explicit placement", () => {
  const resultFixture = readJson("content/contracts/examples/solver-result/associate_photon_result.v1.json");
  resultFixture.placement.participantPlacements = resultFixture.placement.participantPlacements.filter(
    (placement) => placement.participantId !== "product_photon"
  );

  assert.throws(
    () => buildReactionSnapshotFromSolverResult(resultFixture),
    /missing placement for participant product_photon/
  );
});

test("solver result adapter rejects mappings that reference anchors the Reaction snapshot cannot render", () => {
  const resultFixture = readJson("content/contracts/examples/solver-result/associate_photon_result.v1.json");
  resultFixture.mappings[0].from.anchorId = "missing_anchor";

  assert.throws(
    () => buildReactionSnapshotFromSolverResult(resultFixture),
    /does not exist on participant reactant_pro_core/
  );
});

test("solver result adapter accepts solver-emitted Noether assembly core ids", () => {
  const snapshot = buildReactionSnapshotFromSolverResult({
    schema: "solver-result/v1",
    participants: [
      {
        id: "reactant_noether_quad",
        origin: "authored-reactant",
        side: "reactant",
        templateId: "noether_quad",
        label: "Noether Quad",
        rootNodeId: "reactant_noether_quad/root",
        nodes: [
          {
            id: "reactant_noether_quad/root",
            templateId: "noether_quad",
            label: "Noether Quad",
            inventory: {
              electrinoCount: 12,
              positrinoCount: 12,
            },
          },
          {
            id: "reactant_noether_quad/root/core_pro_1",
            parentId: "reactant_noether_quad/root",
            templateId: "noether_core",
            label: "Pro Noether core",
            polarity: "pro",
            inventory: {
              electrinoCount: 3,
              positrinoCount: 3,
            },
          },
          {
            id: "reactant_noether_quad/root/core_anti_1",
            parentId: "reactant_noether_quad/root",
            templateId: "noether_core",
            label: "Anti Noether core",
            polarity: "anti",
            inventory: {
              electrinoCount: 3,
              positrinoCount: 3,
            },
          },
          {
            id: "reactant_noether_quad/root/core_pro_2",
            parentId: "reactant_noether_quad/root",
            templateId: "noether_core",
            label: "Pro Noether core",
            polarity: "pro",
            inventory: {
              electrinoCount: 3,
              positrinoCount: 3,
            },
          },
          {
            id: "reactant_noether_quad/root/core_anti_2",
            parentId: "reactant_noether_quad/root",
            templateId: "noether_core",
            label: "Anti Noether core",
            polarity: "anti",
            inventory: {
              electrinoCount: 3,
              positrinoCount: 3,
            },
          },
        ],
      },
      {
        id: "product_photon",
        origin: "authored-product",
        side: "product",
        templateId: "photon",
        label: "Photon",
        rootNodeId: "product_photon/root",
        nodes: [
          {
            id: "product_photon/root",
            templateId: "photon",
            label: "Photon",
            inventory: {
              electrinoCount: 6,
              positrinoCount: 6,
            },
          },
        ],
      },
    ],
    operators: [],
    mappings: [
      {
        id: "map_quad_core",
        from: {
          participantId: "reactant_noether_quad",
          anchorId: "reactant_noether_quad/root/core_anti_2",
          role: "reactant",
        },
        to: {
          participantId: "product_photon",
          anchorId: "product_photon/root",
          role: "product",
        },
      },
    ],
    placement: {
      participantPlacements: [
        {
          participantId: "reactant_noether_quad",
          placementClass: "reactant",
          row: 0,
        },
        {
          participantId: "product_photon",
          placementClass: "product",
          row: 0,
        },
      ],
      operatorPlacements: [],
    },
  });

  assert.equal(snapshot.mappings[0]?.sourceKey, "reactant_noether_quad::reactant_noether_quad/root/core_anti_2");
});
