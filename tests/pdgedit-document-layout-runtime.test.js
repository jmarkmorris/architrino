import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  findPdgeditCatalystPassThruChains,
  sortPdgeditCatalystPassThruChainsToTop,
} from "../src/apps/pdgedit/PdgeditDocumentLayoutRuntime.js";
import { normalizePdgeditTemplateCatalog } from "../src/apps/pdgedit/PdgeditTemplateCatalogRuntime.js";
import { loadPdgeditDocument } from "../src/apps/pdgedit/PdgeditDocumentRuntime.js";
import { buildPdgeditDocumentFromPublicationGraph } from "../src/runtime/PdgeditPublicationGraphRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function createAssemblyPresentationResolver() {
  const templateCatalog = normalizePdgeditTemplateCatalog(
    readJson("content/contracts/examples/pdgedit/four_tile_family_coverage.v1.json")
  );
  const typeByRecipeId = new Map([
    ["pro_up_quark_I", "pro-up-quark-assembly"],
    ["pro_down_quark_I", "pro-down-quark-assembly"],
    ["pro_electron_I", "pro-electron-assembly"],
    ["unbound_architrinos_residue", "unbound-architrinos-assembly"],
  ]);

  return (recipeId) => {
    const type = typeByRecipeId.get(recipeId);
    const template = type ? templateCatalog.assemblyTemplateByType.get(type) : null;
    if (!template) {
      return null;
    }
    return {
      type: template.type,
      title: template.title,
      tiles: template.tiles,
    };
  };
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

test("lane ordering reduces crossings for non-catalyst rows while keeping catalyst rows pinned", () => {
  const document = {
    schema: "pdgedit/v1",
    assemblies: [
      createAssembly({ id: "reactant_gamma", type: "gamma", role: "reactant", x: 2, y: 0 }),
      createAssembly({ id: "reactant_delta", type: "delta", role: "reactant", x: 2, y: 1 }),
      createAssembly({ id: "reactant_alpha", type: "alpha", role: "reactant", x: 2, y: 5 }),
      createAssembly({ id: "intermediate_delta", type: "delta", role: "intermediate", x: 9, y: 0 }),
      createAssembly({ id: "intermediate_gamma", type: "gamma", role: "intermediate", x: 9, y: 1 }),
      createAssembly({ id: "intermediate_alpha", type: "alpha", role: "intermediate", x: 9, y: 5 }),
      createAssembly({ id: "product_alpha", type: "alpha", role: "product", x: 16, y: 5 }),
    ],
    operators: [
      createOperator({ id: "left_gamma", type: "associate", x: 7, y: 0 }),
      createOperator({ id: "left_delta", type: "associate", x: 7, y: 1 }),
      createOperator({ id: "left_alpha", type: "pass-thru", x: 7, y: 5 }),
      createOperator({ id: "right_alpha", type: "pass-thru", x: 14, y: 5 }),
    ],
    links: [
      { id: "gamma_1", endpointA: "reactant_gamma", endpointB: "left_gamma" },
      { id: "gamma_2", endpointA: "left_gamma", endpointB: "intermediate_gamma" },
      { id: "delta_1", endpointA: "reactant_delta", endpointB: "left_delta" },
      { id: "delta_2", endpointA: "left_delta", endpointB: "intermediate_delta" },
      { id: "alpha_1", endpointA: "reactant_alpha", endpointB: "left_alpha" },
      { id: "alpha_2", endpointA: "left_alpha", endpointB: "intermediate_alpha" },
      { id: "alpha_3", endpointA: "intermediate_alpha", endpointB: "right_alpha" },
      { id: "alpha_4", endpointA: "right_alpha", endpointB: "product_alpha" },
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
      ["reactant_gamma", 1],
      ["reactant_delta", 2],
    ]
  );
  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "intermediate")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["intermediate_alpha", 0],
      ["intermediate_gamma", 1],
      ["intermediate_delta", 2],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 7)
      .map((operator) => [operator.id, operator.y]),
    [
      ["left_alpha", 0],
      ["left_gamma", 1],
      ["left_delta", 2],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 14)
      .map((operator) => [operator.id, operator.y]),
    [["right_alpha", 0]]
  );
});

test("lane ordering keeps unbound architrinos last while reordering free rows between pinned blocks", () => {
  const document = {
    schema: "pdgedit/v1",
    assemblies: [
      createAssembly({ id: "reactant_gamma", type: "gamma", role: "reactant", x: 2, y: 0 }),
      createAssembly({ id: "reactant_delta", type: "delta", role: "reactant", x: 2, y: 1 }),
      createAssembly({ id: "reactant_alpha", type: "alpha", role: "reactant", x: 2, y: 5 }),
      createAssembly({
        id: "intermediate_residue",
        type: "unbound-architrinos-assembly",
        role: "intermediate",
        x: 9,
        y: 0,
      }),
      createAssembly({ id: "intermediate_delta", type: "delta", role: "intermediate", x: 9, y: 1 }),
      createAssembly({ id: "intermediate_gamma", type: "gamma", role: "intermediate", x: 9, y: 2 }),
      createAssembly({ id: "intermediate_alpha", type: "alpha", role: "intermediate", x: 9, y: 5 }),
      createAssembly({ id: "product_residue", type: "unbound-architrinos-assembly", role: "product", x: 16, y: 0 }),
      createAssembly({ id: "product_delta", type: "delta", role: "product", x: 16, y: 1 }),
      createAssembly({ id: "product_gamma", type: "gamma", role: "product", x: 16, y: 2 }),
      createAssembly({ id: "product_alpha", type: "alpha", role: "product", x: 16, y: 5 }),
    ],
    operators: [
      createOperator({ id: "left_gamma", type: "associate", x: 7, y: 0 }),
      createOperator({ id: "left_delta", type: "associate", x: 7, y: 1 }),
      createOperator({ id: "left_alpha", type: "pass-thru", x: 7, y: 5 }),
      createOperator({ id: "right_delta", type: "associate", x: 14, y: 0 }),
      createOperator({ id: "right_gamma", type: "associate", x: 14, y: 1 }),
      createOperator({ id: "right_alpha", type: "pass-thru", x: 14, y: 5 }),
    ],
    links: [
      { id: "gamma_1", endpointA: "reactant_gamma", endpointB: "left_gamma" },
      { id: "gamma_2", endpointA: "left_gamma", endpointB: "intermediate_gamma" },
      { id: "gamma_3", endpointA: "intermediate_gamma", endpointB: "right_gamma" },
      { id: "gamma_4", endpointA: "right_gamma", endpointB: "product_gamma" },
      { id: "delta_1", endpointA: "reactant_delta", endpointB: "left_delta" },
      { id: "delta_2", endpointA: "left_delta", endpointB: "intermediate_delta" },
      { id: "delta_3", endpointA: "intermediate_delta", endpointB: "right_delta" },
      { id: "delta_4", endpointA: "right_delta", endpointB: "product_delta" },
      { id: "alpha_1", endpointA: "reactant_alpha", endpointB: "left_alpha" },
      { id: "alpha_2", endpointA: "left_alpha", endpointB: "intermediate_alpha" },
      { id: "alpha_3", endpointA: "intermediate_alpha", endpointB: "right_alpha" },
      { id: "alpha_4", endpointA: "right_alpha", endpointB: "product_alpha" },
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
      ["reactant_gamma", 1],
      ["reactant_delta", 2],
    ]
  );
  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "intermediate")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["intermediate_alpha", 0],
      ["intermediate_gamma", 1],
      ["intermediate_delta", 2],
      ["intermediate_residue", 3],
    ]
  );
  assert.deepEqual(
    sorted.assemblies
      .filter((assembly) => assembly.role === "product")
      .map((assembly) => [assembly.id, assembly.y]),
    [
      ["product_alpha", 0],
      ["product_gamma", 1],
      ["product_delta", 2],
      ["product_residue", 3],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 7)
      .map((operator) => [operator.id, operator.y]),
    [
      ["left_alpha", 0],
      ["left_gamma", 1],
      ["left_delta", 2],
    ]
  );
  assert.deepEqual(
    sorted.operators
      .filter((operator) => operator.x === 14)
      .map((operator) => [operator.id, operator.y]),
    [
      ["right_alpha", 0],
      ["right_gamma", 1],
      ["right_delta", 2],
    ]
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

test("publication graph rendering derives pdgedit coordinates from stages and preserves catalyst top-sorting", () => {
  const publicationGraph = {
    schema: "pdgsolve-publication-graph/v2",
    units: [
      {
        id: "reactant_noncat",
        kind: "assembly",
        stage: "reactantAssemblies",
        recipeId: "pro_down_quark_I",
        occurrenceKey: "reactant_noncat",
        title: "Non Catalyst Reactant",
        electrinoCount: 7,
        positrinoCount: 5,
      },
      {
        id: "reactant_catalyst",
        kind: "assembly",
        stage: "reactantAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "reactant_catalyst",
        title: "Catalyst Reactant",
        electrinoCount: 4,
        positrinoCount: 8,
      },
      {
        id: "left_noncat",
        kind: "operator",
        stage: "reactantSideOperators",
        recipeId: "associate",
        occurrenceKey: "left_noncat",
        title: "Associate",
        lawId: "law.synthetic.noncat",
      },
      {
        id: "left_catalyst",
        kind: "operator",
        stage: "reactantSideOperators",
        recipeId: "pass-thru",
        occurrenceKey: "left_catalyst",
        title: "Pass Thru",
        lawId: null,
      },
      {
        id: "intermediate_noncat",
        kind: "assembly",
        stage: "intermediateAssemblies",
        recipeId: "pro_electron_I",
        occurrenceKey: "intermediate_noncat",
        title: "Non Catalyst Intermediate",
        electrinoCount: 9,
        positrinoCount: 3,
      },
      {
        id: "intermediate_catalyst",
        kind: "assembly",
        stage: "intermediateAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "intermediate_catalyst",
        title: "Catalyst Intermediate",
        electrinoCount: 4,
        positrinoCount: 8,
      },
      {
        id: "right_noncat",
        kind: "operator",
        stage: "productSideOperators",
        recipeId: "associate",
        occurrenceKey: "right_noncat",
        title: "Associate",
        lawId: "law.synthetic.noncat",
      },
      {
        id: "right_catalyst",
        kind: "operator",
        stage: "productSideOperators",
        recipeId: "pass-thru",
        occurrenceKey: "right_catalyst",
        title: "Pass Thru",
        lawId: null,
      },
      {
        id: "product_noncat",
        kind: "assembly",
        stage: "productAssemblies",
        recipeId: "pro_electron_I",
        occurrenceKey: "product_noncat",
        title: "Non Catalyst Product",
        electrinoCount: 9,
        positrinoCount: 3,
      },
      {
        id: "product_catalyst",
        kind: "assembly",
        stage: "productAssemblies",
        recipeId: "pro_up_quark_I",
        occurrenceKey: "product_catalyst",
        title: "Catalyst Product",
        electrinoCount: 4,
        positrinoCount: 8,
      },
    ],
    edges: [
      { id: "cat_1", fromUnitId: "reactant_catalyst", fromPortId: "output", toUnitId: "left_catalyst", toPortId: "input_1" },
      { id: "cat_2", fromUnitId: "left_catalyst", fromPortId: "output_1", toUnitId: "intermediate_catalyst", toPortId: "input" },
      { id: "cat_3", fromUnitId: "intermediate_catalyst", fromPortId: "output", toUnitId: "right_catalyst", toPortId: "input_1" },
      { id: "cat_4", fromUnitId: "right_catalyst", fromPortId: "output_1", toUnitId: "product_catalyst", toPortId: "input" },
    ],
  };

  const document = buildPdgeditDocumentFromPublicationGraph(publicationGraph, {
    resolveAssemblyPresentation: createAssemblyPresentationResolver(),
  });

  assert.deepEqual(
    document.assemblies
      .filter((assembly) => assembly.role === "reactant")
      .map((assembly) => [assembly.id, assembly.x, assembly.y]),
    [
      ["reactant_catalyst", 2, 0],
      ["reactant_noncat", 2, 1],
    ]
  );
  assert.deepEqual(
    document.assemblies
      .filter((assembly) => assembly.role === "intermediate")
      .map((assembly) => [assembly.id, assembly.x, assembly.y]),
    [
      ["intermediate_catalyst", 9, 0],
      ["intermediate_noncat", 9, 1],
    ]
  );
  assert.deepEqual(
    document.assemblies
      .filter((assembly) => assembly.role === "product")
      .map((assembly) => [assembly.id, assembly.x, assembly.y]),
    [
      ["product_catalyst", 16, 0],
      ["product_noncat", 16, 1],
    ]
  );
  assert.deepEqual(
    document.operators
      .filter((operator) => operator.x === 7)
      .map((operator) => [operator.id, operator.y, operator.positrinoCount, operator.electrinoCount]),
    [
      ["left_catalyst", 0, 8, 4],
      ["left_noncat", 1, 0, 0],
    ]
  );
  assert.deepEqual(
    document.operators
      .filter((operator) => operator.x === 14)
      .map((operator) => [operator.id, operator.y, operator.positrinoCount, operator.electrinoCount]),
    [
      ["right_catalyst", 0, 8, 4],
      ["right_noncat", 1, 0, 0],
    ]
  );
});

test("publication graph rendering recovers residue counts from the feeding product-side operator", () => {
  const publicationGraph = {
    schema: "pdgsolve-publication-graph/v2",
    units: [
      {
        id: "intermediate_feed",
        kind: "assembly",
        stage: "intermediateAssemblies",
        recipeId: "pro_electron_I",
        occurrenceKey: "intermediate_feed",
        title: "Feed",
        electrinoCount: 5,
        positrinoCount: 5,
      },
      {
        id: "product_residue_operator",
        kind: "operator",
        stage: "productSideOperators",
        recipeId: "pass-thru",
        occurrenceKey: "product_residue_operator",
        title: "Pass Thru",
      },
      {
        id: "product_residue",
        kind: "assembly",
        stage: "productAssemblies",
        recipeId: "unbound_architrinos_residue",
        occurrenceKey: "product_residue",
        title: "Unbound Architrinos",
      },
    ],
    edges: [
      {
        id: "residue_in",
        fromUnitId: "intermediate_feed",
        fromPortId: "output",
        toUnitId: "product_residue_operator",
        toPortId: "input_1",
      },
      {
        id: "residue_out",
        fromUnitId: "product_residue_operator",
        fromPortId: "output_1",
        toUnitId: "product_residue",
        toPortId: "input",
      },
    ],
  };

  const document = buildPdgeditDocumentFromPublicationGraph(publicationGraph, {
    resolveAssemblyPresentation: createAssemblyPresentationResolver(),
  });

  assert.deepEqual(
    document.assemblies
      .filter((assembly) => assembly.id === "product_residue")
      .map((assembly) => assembly.sampleCounts),
    [{ topCount: "5", bottomCount: "5" }]
  );
  assert.deepEqual(
    document.operators
      .filter((operator) => operator.id === "product_residue_operator")
      .map((operator) => [operator.positrinoCount, operator.electrinoCount]),
    [[5, 5]]
  );
});
