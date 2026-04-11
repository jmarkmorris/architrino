import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  buildPdgeditPreviewFromPdgsolveAcceptance,
  buildPdgsolveAcceptanceRecord,
} from "../src/apps/pdgsolve/PdgsolveAcceptanceRuntime.js";
import {
  getDefaultPdgsolveBootstrapEntries,
  loadPdgsolveBootstrapSeed,
} from "../src/apps/pdgsolve/PdgsolveBootstrapRuntime.js";
import { solvePdgsolveRequest } from "../src/apps/pdgsolve/PdgsolveSolveRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("default pdgsolve bootstrap entries include corpus test cases and pdgfeed-emitted requests", () => {
  const entries = getDefaultPdgsolveBootstrapEntries();

  assert.deepEqual(
    entries.map((entry) => entry.id),
    [
      "test_case:free_neutron_beta_exact",
      "test_case:free_neutron_beta_support_disallowed",
      "test_case:primitive_imbalance_neutron_to_proton",
      "test_case:pass_thru_neutron",
      "pdgfeed:test_case:free_neutron_beta_decay",
      "pdgfeed:live:free_neutron_beta_decay",
    ]
  );
});

test("bootstrap seed can append pdgfeed manifest requests and reopen an acceptance record", async () => {
  const acceptanceTestCase = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const requestTestCase = readJson("content/contracts/examples/pdgsolve-request/pass_thru_neutron.v1.json");
  const manifestTestCase = {
    schema: "pdg-live-manifest/v1",
    edition: "2025",
    exportableCount: 1,
    unsupportedDiscoveryCount: 0,
    topUnsupportedParticles: [],
    entries: [
      {
        batchId: 7,
        title: "Manifest free neutron",
        channelDescription: "n -> p e nu",
        pdgsolveRequest: requestTestCase,
      },
    ],
  };

  const fetchImpl = async (url) => {
    if (url === "https://example.test/manifest.json") {
      return { ok: true, json: async () => manifestTestCase };
    }
    if (url === "https://example.test/acceptance.json") {
      return { ok: true, json: async () => acceptanceTestCase };
    }
    throw new Error(`unexpected url ${url}`);
  };

  const seed = await loadPdgsolveBootstrapSeed({
    fetchImpl,
    pdgfeedManifestUrl: "https://example.test/manifest.json",
    acceptanceUrl: "https://example.test/acceptance.json",
    requestId: "pass_thru_neutron",
  });

  assert.equal(seed.requestEntries.some((entry) => entry.id === "pdgfeed-manifest:7"), true);
  assert.equal(seed.selectedRequestEntry.request.requestId, "pass_thru_neutron");
  assert.deepEqual(seed.reopenedAcceptance, acceptanceTestCase);
});

test("explicit Noether support requests solve through the admitted fermion decomposition laws", () => {
  const request = {
    schema: "pdgsolve-request/v1",
    requestId: "beta_explicit_support_with_decomposition_law",
    source: {
      kind: "developer",
      title: "Explicit beta support",
      sourceDocumentId: "developer:beta_explicit_support_with_decomposition_law",
    },
    reactants: [
      {
        id: "reactant_neutron.row.1",
        assemblyId: "pro_down_quark",
        title: "Pro Down Quark",
      },
      {
        id: "reactant_neutron.row.2",
        assemblyId: "pro_up_quark",
        title: "Pro Up Quark",
      },
      {
        id: "reactant_neutron.row.3",
        assemblyId: "pro_down_quark",
        title: "Pro Down Quark",
      },
      {
        id: "reactant_support_pro_noether_core_1",
        assemblyId: "pro_noether_core",
        title: "Pro Noether Core",
      },
      {
        id: "reactant_support_anti_noether_core_1",
        assemblyId: "anti_noether_core",
        title: "Anti Noether Core",
      },
      {
        id: "reactant_support_pro_noether_core_2",
        assemblyId: "pro_noether_core",
        title: "Pro Noether Core",
      },
      {
        id: "reactant_support_anti_noether_core_2",
        assemblyId: "anti_noether_core",
        title: "Anti Noether Core",
      },
    ],
    products: [
      {
        id: "product_proton.row.1",
        assemblyId: "pro_up_quark",
        title: "Pro Up Quark",
      },
      {
        id: "product_proton.row.2",
        assemblyId: "pro_down_quark",
        title: "Pro Down Quark",
      },
      {
        id: "product_proton.row.3",
        assemblyId: "pro_up_quark",
        title: "Pro Up Quark",
      },
      {
        id: "product_electron",
        assemblyId: "electron",
        title: "Electron",
      },
      {
        id: "product_electron_antineutrino",
        assemblyId: "electron_antineutrino",
        title: "Electron Antineutrino",
      },
    ],
    policy: {
      betaSupportMode: "explicit-only",
      exactClosureRequired: true,
      allowedBoundaryAugmentations: ["none"],
    },
  };

  const result = solvePdgsolveRequest(request);

  assert.equal(result.searchStatus, "exact_available");
  assert.equal(result.bestFamilyId, "family.beta.fermion_decomposition.v1");
  assert.deepEqual(result.diagnostics, []);
  assert.equal(result.optionFamilies[0].publicationReady, true);
  assert.equal(result.review.blockingDiagnostics.length, 0);
  assert.deepEqual(
    result.optionFamilies[0].lane4Operators
      .filter((operator) => operator.type === "associate")
      .map((operator) => operator.lawId),
    [
      "row.fermion_decomposition.unbound_architrino_residue_e4_p8_to_pro_up_quark.v1",
      "row.fermion_decomposition.unbound_architrino_residue_e9_p3_to_electron.v1",
      "row.fermion_decomposition.unbound_architrino_residue_e6_p6_to_electron_antineutrino.v1",
    ]
  );
});

test("acceptance runtime locks a publishable family and derives the pdgedit preview document", () => {
  const request = readJson("content/contracts/examples/pdgsolve-request/pass_thru_neutron.v1.json");
  const result = solvePdgsolveRequest(request);
  const acceptance = buildPdgsolveAcceptanceRecord({
    request,
    result,
    familyId: result.bestFamilyId,
  });
  const pdgeditPreview = buildPdgeditPreviewFromPdgsolveAcceptance(acceptance);

  assert.equal(acceptance.schema, "pdgsolve-acceptance/v1");
  assert.equal(acceptance.resultDigest, "pdgsolve_problem_pass_thru_neutron::family.pass_thru.rows.v1::v1");
  assert.equal(acceptance.lockedSolveGraph.schema, "pdgsolve-publication-graph/v1");
  assert.equal(pdgeditPreview.schema, "pdgedit/v1");
  assert.equal(pdgeditPreview.assemblies.length, 9);
  assert.equal(pdgeditPreview.operators.length, 6);
  assert.equal(pdgeditPreview.links.length, 12);
});

test("unmapped requests stay review-only with a blocking unsupported-family diagnostic", () => {
  const result = solvePdgsolveRequest({
    schema: "pdgsolve-request/v1",
    requestId: "gamma_only_request",
    source: {
      kind: "developer",
      title: "Gamma only request",
      sourceDocumentId: "developer:gamma_only_request",
    },
    reactants: [
      {
        id: "reactant_gamma",
        assemblyId: "gamma",
        title: "Gamma",
      },
    ],
    products: [
      {
        id: "product_gamma",
        assemblyId: "gamma",
        title: "Gamma",
      },
    ],
    policy: {
      betaSupportMode: "allow-implied-noether-core-support",
      exactClosureRequired: true,
      allowedBoundaryAugmentations: ["none"],
    },
  });

  assert.equal(result.searchStatus, "unsupported");
  assert.equal(result.bestFamilyId, "family.unmapped_request.v1");
  assert.equal(result.optionFamilies[0].publicationReady, false);
  assert.equal(result.review.blockingDiagnostics[0].id, "pdgsolve.search.unmapped_request");
});

test("fermion-decomposition residue rows are rejected when requested directly in boundary lanes", () => {
  const result = solvePdgsolveRequest({
    schema: "pdgsolve-request/v1",
    requestId: "invalid_boundary_residue_row",
    source: {
      kind: "developer",
      title: "Invalid boundary residue row",
      sourceDocumentId: "developer:invalid_boundary_residue_row",
    },
    reactants: [
      {
        id: "reactant_residue",
        assemblyId: "unbound_architrino_residue_e4_p8",
        title: "Unbound Architrino Residue 4E/8P",
      },
    ],
    products: [
      {
        id: "product_residue",
        assemblyId: "unbound_architrino_residue_e4_p8",
        title: "Unbound Architrino Residue 4E/8P",
      },
    ],
    policy: {
      betaSupportMode: "allow-implied-noether-core-support",
      exactClosureRequired: true,
      allowedBoundaryAugmentations: ["none"],
    },
  });

  assert.equal(result.searchStatus, "unsupported");
  assert.equal(result.bestFamilyId, "family.request.invalid_lane_role.v1");
  assert.equal(result.diagnostics[0].id, "pdgsolve.request.invalid_lane_role");
  assert.equal(result.diagnostics[0].payload.assemblyId, "unbound_architrino_residue_e4_p8");
  assert.deepEqual(result.diagnostics[0].payload.allowedLanes, [3]);
});
