import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  findPdgeditCatalystPassThruChains,
  sortPdgeditCatalystPassThruChainsToTop,
} from "../src/apps/pdgedit/PdgeditDocumentLayoutRuntime.js";
import { loadPdgeditDocument } from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function createAssembly({ id, type, role, x, y }) {
  return {
    id,
    type,
    x,
    y,
    title: id,
    role,
    tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
  };
}

function createOperator({ id, type, x, y }) {
  return {
    id,
    type,
    x,
    y,
    title: id,
    positrinoCount: 1,
    electrinoCount: 1,
  };
}

test("catalyst pass-thru detection keeps only strict same-type straight chains", () => {
  const document = {
    schema: "pdgedit/v1",
    assemblies: [
      createAssembly({ id: "reactant_alpha", type: "alpha", role: "reactant", x: 2, y: 3 }),
      createAssembly({ id: "intermediate_alpha", type: "alpha", role: "intermediate", x: 9, y: 2 }),
      createAssembly({ id: "product_alpha", type: "alpha", role: "product", x: 16, y: 5 }),
      createAssembly({ id: "reactant_beta", type: "beta", role: "reactant", x: 2, y: 4 }),
      createAssembly({ id: "intermediate_beta", type: "beta", role: "intermediate", x: 9, y: 4 }),
      createAssembly({ id: "product_beta_wrong", type: "gamma", role: "product", x: 16, y: 4 }),
      createAssembly({ id: "reactant_branch", type: "branch", role: "reactant", x: 2, y: 6 }),
      createAssembly({ id: "intermediate_branch", type: "branch", role: "intermediate", x: 9, y: 6 }),
      createAssembly({ id: "product_branch", type: "branch", role: "product", x: 16, y: 6 }),
      createAssembly({ id: "reactant_extra_branch", type: "branch", role: "reactant", x: 2, y: 7 }),
    ],
    operators: [
      createOperator({ id: "left_alpha", type: "pass-thru", x: 7, y: 3 }),
      createOperator({ id: "right_alpha", type: "pass-thru", x: 14, y: 5 }),
      createOperator({ id: "left_beta", type: "pass-thru", x: 7, y: 4 }),
      createOperator({ id: "right_beta", type: "pass-thru", x: 14, y: 4 }),
      createOperator({ id: "left_branch", type: "pass-thru", x: 7, y: 6 }),
      createOperator({ id: "right_branch", type: "pass-thru", x: 14, y: 6 }),
    ],
    links: [
      { id: "alpha_1", endpointA: "reactant_alpha", endpointB: "left_alpha" },
      { id: "alpha_2", endpointA: "left_alpha", endpointB: "intermediate_alpha" },
      { id: "alpha_3", endpointA: "intermediate_alpha", endpointB: "right_alpha" },
      { id: "alpha_4", endpointA: "right_alpha", endpointB: "product_alpha" },
      { id: "beta_1", endpointA: "reactant_beta", endpointB: "left_beta" },
      { id: "beta_2", endpointA: "left_beta", endpointB: "intermediate_beta" },
      { id: "beta_3", endpointA: "intermediate_beta", endpointB: "right_beta" },
      { id: "beta_4", endpointA: "right_beta", endpointB: "product_beta_wrong" },
      { id: "branch_1", endpointA: "reactant_branch", endpointB: "left_branch" },
      { id: "branch_2", endpointA: "left_branch", endpointB: "intermediate_branch" },
      { id: "branch_3", endpointA: "intermediate_branch", endpointB: "right_branch" },
      { id: "branch_4", endpointA: "right_branch", endpointB: "product_branch" },
      { id: "branch_5", endpointA: "left_branch", endpointB: "reactant_extra_branch" },
    ],
    compositeLabels: [],
  };

  assert.deepEqual(findPdgeditCatalystPassThruChains(document), [
    {
      type: "alpha",
      reactantAssemblyId: "reactant_alpha",
      reactantOperatorId: "left_alpha",
      intermediateAssemblyId: "intermediate_alpha",
      productOperatorId: "right_alpha",
      productAssemblyId: "product_alpha",
    },
  ]);
});

test("catalyst top-sorting lifts synchronized catalyst blocks while keeping other rows stable", () => {
  const document = {
    schema: "pdgedit/v1",
    assemblies: [
      createAssembly({ id: "reactant_noncat_1", type: "delta", role: "reactant", x: 2, y: 0 }),
      createAssembly({ id: "reactant_alpha", type: "alpha", role: "reactant", x: 2, y: 2 }),
      createAssembly({ id: "reactant_noncat_2", type: "epsilon", role: "reactant", x: 2, y: 4 }),
      createAssembly({ id: "reactant_beta", type: "beta", role: "reactant", x: 2, y: 6 }),
      createAssembly({ id: "intermediate_noncat_1", type: "zeta", role: "intermediate", x: 9, y: 1 }),
      createAssembly({ id: "intermediate_alpha", type: "alpha", role: "intermediate", x: 9, y: 3 }),
      createAssembly({ id: "intermediate_noncat_2", type: "eta", role: "intermediate", x: 9, y: 4 }),
      createAssembly({ id: "intermediate_beta", type: "beta", role: "intermediate", x: 9, y: 7 }),
      createAssembly({ id: "product_noncat_1", type: "theta", role: "product", x: 16, y: 0 }),
      createAssembly({ id: "product_alpha", type: "alpha", role: "product", x: 16, y: 5 }),
      createAssembly({ id: "product_noncat_2", type: "iota", role: "product", x: 16, y: 6 }),
      createAssembly({ id: "product_beta", type: "beta", role: "product", x: 16, y: 8 }),
    ],
    operators: [
      createOperator({ id: "left_noncat_1", type: "associate", x: 7, y: 0 }),
      createOperator({ id: "left_alpha", type: "pass-thru", x: 7, y: 2 }),
      createOperator({ id: "left_noncat_2", type: "dissociate", x: 7, y: 5 }),
      createOperator({ id: "left_beta", type: "pass-thru", x: 7, y: 6 }),
      createOperator({ id: "right_noncat_1", type: "associate", x: 14, y: 1 }),
      createOperator({ id: "right_alpha", type: "pass-thru", x: 14, y: 5 }),
      createOperator({ id: "right_noncat_2", type: "dissociate", x: 14, y: 7 }),
      createOperator({ id: "right_beta", type: "pass-thru", x: 14, y: 8 }),
    ],
    links: [
      { id: "alpha_1", endpointA: "reactant_alpha", endpointB: "left_alpha" },
      { id: "alpha_2", endpointA: "left_alpha", endpointB: "intermediate_alpha" },
      { id: "alpha_3", endpointA: "intermediate_alpha", endpointB: "right_alpha" },
      { id: "alpha_4", endpointA: "right_alpha", endpointB: "product_alpha" },
      { id: "beta_1", endpointA: "reactant_beta", endpointB: "left_beta" },
      { id: "beta_2", endpointA: "left_beta", endpointB: "intermediate_beta" },
      { id: "beta_3", endpointA: "intermediate_beta", endpointB: "right_beta" },
      { id: "beta_4", endpointA: "right_beta", endpointB: "product_beta" },
    ],
    compositeLabels: [],
  };

  const sorted = sortPdgeditCatalystPassThruChainsToTop(document);

  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "reactant")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["reactant_alpha", 0],
      ["reactant_beta", 1],
      ["reactant_noncat_1", 2],
      ["reactant_noncat_2", 3],
    ]
  );
  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "intermediate")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["intermediate_alpha", 0],
      ["intermediate_beta", 1],
      ["intermediate_noncat_1", 2],
      ["intermediate_noncat_2", 3],
    ]
  );
  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "product")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["product_alpha", 0],
      ["product_beta", 1],
      ["product_noncat_1", 2],
      ["product_noncat_2", 3],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 7)
      .map((operator) => [operator.id, operator.y]),
    [
      ["left_alpha", 0],
      ["left_beta", 1],
      ["left_noncat_1", 2],
      ["left_noncat_2", 3],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 14)
      .map((operator) => [operator.id, operator.y]),
    [
      ["right_alpha", 0],
      ["right_beta", 1],
      ["right_noncat_1", 2],
      ["right_noncat_2", 3],
    ]
  );
  assert.deepEqual(
    sorted.links.map((link) => link.id),
    ["alpha_1", "alpha_2", "alpha_3", "alpha_4", "beta_1", "beta_2", "beta_3", "beta_4"]
  );
});

test("document loading applies catalyst top-sorting before pdgedit renders the document", async () => {
  const loaded = await loadPdgeditDocument({
    specUrl: "https://architrino.local/content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json",
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => readJson("content/contracts/examples/pdgedit/pass_thru_up_quark.v1.json"),
    }),
  });

  assert.deepEqual(
    loaded.assemblies.map((assembly) => [assembly.id, assembly.y]),
    [
      ["reactant_up_quark", 0],
      ["intermediate_up_quark", 0],
      ["product_up_quark", 0],
    ]
  );
  assert.deepEqual(
    loaded.operators.map((operator) => [operator.id, operator.y]),
    [
      ["pass_thru_stage_1", 0],
      ["pass_thru_stage_2", 0],
    ]
  );
});
