import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  createPdgeditAssembly,
  createPdgeditLink,
  createPdgeditOperator,
  deletePdgeditObject,
  getPdgeditCreateSlot,
  getPdgeditEmptyDocument,
  movePdgeditObjectToRow,
} from "../src/apps/pdgedit/PdgeditDocumentEditRuntime.js";
import { preparePdgeditDocumentForDisplay } from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { normalizePdgeditTemplateCatalog } from "../src/apps/pdgedit/PdgeditTemplateCatalogRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function getTemplates() {
  return normalizePdgeditTemplateCatalog(
    readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json")
  );
}

test("assembly creation writes explicit payloads and preserves dense lanes", () => {
  const templates = getTemplates();
  const downQuark = templates.assemblyTemplateByType.get("pro-down-quark-assembly");
  const upQuark = templates.assemblyTemplateByType.get("pro-up-quark-assembly");
  const firstCreate = createPdgeditAssembly(getPdgeditEmptyDocument(), downQuark, "reactant", 0);
  const secondCreate = createPdgeditAssembly(firstCreate.document, upQuark, "reactant", 5);

  assert.equal(firstCreate.ok, true);
  assert.equal(secondCreate.ok, true);
  assert.deepEqual(
    secondCreate.document.assemblies.map((assembly) => ({
      type: assembly.type,
      x: assembly.x,
      y: assembly.y,
      role: assembly.role,
      tiles: assembly.tiles,
    })),
    [
      {
        type: "pro-down-quark-assembly",
        x: 2,
        y: 0,
        role: "reactant",
        tiles: downQuark.tiles,
      },
      {
        type: "pro-up-quark-assembly",
        x: 2,
        y: 1,
        role: "reactant",
        tiles: upQuark.tiles,
      },
    ]
  );
});

test("assembly movement reorders within one lane without leaving gaps", () => {
  const templates = getTemplates();
  const downQuark = templates.assemblyTemplateByType.get("pro-down-quark-assembly");
  const upQuark = templates.assemblyTemplateByType.get("pro-up-quark-assembly");
  const electron = templates.assemblyTemplateByType.get("pro-electron-assembly");

  const first = createPdgeditAssembly(getPdgeditEmptyDocument(), downQuark, "reactant", 0);
  const second = createPdgeditAssembly(first.document, upQuark, "reactant", 1);
  const third = createPdgeditAssembly(second.document, electron, "reactant", 2);
  const moved = movePdgeditObjectToRow(third.document, third.createdId, 0);

  assert.equal(moved.ok, true);
  assert.deepEqual(
    moved.document.assemblies
      .filter((assembly) => assembly.role === "reactant")
      .sort((left, right) => left.y - right.y)
      .map((assembly) => [assembly.type, assembly.y]),
    [
      ["pro-electron-assembly", 0],
      ["pro-down-quark-assembly", 1],
      ["pro-up-quark-assembly", 2],
    ]
  );
});

test("operator dragging reorders within each fixed operator column without crossing lanes", () => {
  const first = createPdgeditOperator(getPdgeditEmptyDocument(), {
    type: "associate",
    x: 7,
    y: 0,
    positrinoCount: 3,
    electrinoCount: 3,
  });
  const second = createPdgeditOperator(first.document, {
    type: "pass-thru",
    x: 7,
    y: 1,
    positrinoCount: 1,
    electrinoCount: 1,
  });
  const third = createPdgeditOperator(second.document, {
    type: "associate",
    x: 14,
    y: 0,
    positrinoCount: 3,
    electrinoCount: 3,
  });
  const fourth = createPdgeditOperator(third.document, {
    type: "pass-thru",
    x: 14,
    y: 1,
    positrinoCount: 1,
    electrinoCount: 1,
  });
  const movedLeftLane = movePdgeditObjectToRow(fourth.document, first.createdId, 1);
  const movedRightLane = movePdgeditObjectToRow(movedLeftLane.document, third.createdId, 1);

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.equal(third.ok, true);
  assert.equal(fourth.ok, true);
  assert.equal(movedLeftLane.ok, true);
  assert.equal(movedRightLane.ok, true);
  assert.deepEqual(
    movedRightLane.document.operators
      .filter((operator) => operator.x === 7)
      .sort((left, right) => left.y - right.y)
      .map((operator) => [operator.type, operator.x, operator.y]),
    [
      ["pass-thru", 7, 0],
      ["associate", 7, 1],
    ]
  );
  assert.deepEqual(
    movedRightLane.document.operators
      .filter((operator) => operator.x === 14)
      .sort((left, right) => left.y - right.y)
      .map((operator) => [operator.type, operator.x, operator.y]),
    [
      ["pass-thru", 14, 0],
      ["associate", 14, 1],
    ]
  );
});

test("deleting an assembly removes attached links and compacts the remaining lane", () => {
  const templates = getTemplates();
  const downQuark = templates.assemblyTemplateByType.get("pro-down-quark-assembly");
  const upQuark = templates.assemblyTemplateByType.get("pro-up-quark-assembly");

  const firstAssembly = createPdgeditAssembly(getPdgeditEmptyDocument(), downQuark, "reactant", 0);
  const secondAssembly = createPdgeditAssembly(firstAssembly.document, upQuark, "reactant", 1);
  const operator = createPdgeditOperator(secondAssembly.document, {
    type: "associate",
    x: 7,
    y: 0,
    positrinoCount: 3,
    electrinoCount: 3,
  });
  const linked = createPdgeditLink(operator.document, firstAssembly.createdId, operator.createdId);
  const deleted = deletePdgeditObject(linked.document, firstAssembly.createdId);

  assert.equal(linked.ok, true);
  assert.equal(deleted.ok, true);
  assert.deepEqual(
    deleted.document.assemblies
      .filter((assembly) => assembly.role === "reactant")
      .map((assembly) => [assembly.type, assembly.y]),
    [["pro-up-quark-assembly", 0]]
  );
  assert.deepEqual(deleted.document.links, []);
});

test("link creation canonicalizes left-to-right endpoints and rejects duplicates or invalid spans", () => {
  const templates = getTemplates();
  const downQuark = templates.assemblyTemplateByType.get("pro-down-quark-assembly");
  const upQuark = templates.assemblyTemplateByType.get("pro-up-quark-assembly");

  const reactant = createPdgeditAssembly(getPdgeditEmptyDocument(), downQuark, "reactant", 0);
  const operator = createPdgeditOperator(reactant.document, {
    type: "associate",
    x: 7,
    y: 0,
    positrinoCount: 3,
    electrinoCount: 3,
  });
  const intermediate = createPdgeditAssembly(operator.document, upQuark, "intermediate", 0);
  const canonical = createPdgeditLink(intermediate.document, operator.createdId, reactant.createdId);
  const duplicate = createPdgeditLink(canonical.document, reactant.createdId, operator.createdId);
  const invalid = createPdgeditLink(canonical.document, reactant.createdId, intermediate.createdId);

  assert.equal(canonical.ok, true);
  assert.deepEqual(canonical.document.links[0], {
    id: `edge_${reactant.createdId.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase()}__${operator.createdId.replace(/[^a-zA-Z0-9]+/g, "_").toLowerCase()}`,
    endpointA: reactant.createdId,
    endpointB: operator.createdId,
  });
  assert.equal(duplicate.ok, false);
  assert.equal(invalid.ok, false);
});

test("create slots admit only legal unoccupied object stages on authored rows", () => {
  const operator = createPdgeditOperator(getPdgeditEmptyDocument(), {
    type: "associate",
    x: 7,
    y: 0,
    positrinoCount: 3,
    electrinoCount: 3,
  });

  assert.equal(getPdgeditCreateSlot(1, 0, operator.document), null);
  assert.equal(getPdgeditCreateSlot(6, 0, operator.document), null);
  assert.equal(getPdgeditCreateSlot(7, 0, operator.document), null);
  assert.deepEqual(getPdgeditCreateSlot(3, 0, operator.document), {
    kind: "assembly",
    role: "reactant",
    x: 2,
    y: 0,
    column: 3,
  });
  assert.deepEqual(getPdgeditCreateSlot(14, 2, operator.document), {
    kind: "operator",
    x: 14,
    y: 2,
    column: 14,
  });
});

test("assembly movement still works after load-time catalyst top-sorting", () => {
  const prepared = preparePdgeditDocumentForDisplay({
    schema: "pdgedit/v1",
    assemblies: [
      {
        id: "reactant_noncat",
        type: "delta",
        x: 2,
        y: 0,
        title: "reactant_noncat",
        role: "reactant",
        tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
      },
      {
        id: "reactant_catalyst",
        type: "alpha",
        x: 2,
        y: 3,
        title: "reactant_catalyst",
        role: "reactant",
        tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
      },
      {
        id: "intermediate_catalyst",
        type: "alpha",
        x: 9,
        y: 2,
        title: "intermediate_catalyst",
        role: "intermediate",
        tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
      },
      {
        id: "product_catalyst",
        type: "alpha",
        x: 16,
        y: 4,
        title: "product_catalyst",
        role: "product",
        tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
      },
    ],
    operators: [
      {
        id: "left_catalyst",
        type: "pass-thru",
        x: 7,
        y: 3,
        title: "Pass Thru",
        positrinoCount: 1,
        electrinoCount: 1,
      },
      {
        id: "right_catalyst",
        type: "pass-thru",
        x: 14,
        y: 4,
        title: "Pass Thru",
        positrinoCount: 1,
        electrinoCount: 1,
      },
    ],
    links: [
      { id: "edge_1", endpointA: "reactant_catalyst", endpointB: "left_catalyst" },
      { id: "edge_2", endpointA: "left_catalyst", endpointB: "intermediate_catalyst" },
      { id: "edge_3", endpointA: "intermediate_catalyst", endpointB: "right_catalyst" },
      { id: "edge_4", endpointA: "right_catalyst", endpointB: "product_catalyst" },
    ],
    compositeLabels: [],
  });
  const moved = movePdgeditObjectToRow(prepared, "reactant_noncat", 0);

  assert.equal(moved.ok, true);
  assert.deepEqual(
    moved.document.assemblies
      .filter((assembly) => assembly.role === "reactant")
      .sort((left, right) => left.y - right.y)
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["reactant_noncat", 0],
      ["reactant_catalyst", 1],
    ]
  );
});
