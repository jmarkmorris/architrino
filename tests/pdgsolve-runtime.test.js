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

test("default pdgsolve bootstrap entries include corpus fixtures and pdgfeed-emitted requests", () => {
  const entries = getDefaultPdgsolveBootstrapEntries();

  assert.deepEqual(
    entries.map((entry) => entry.id),
    [
      "fixture:free_neutron_beta_exact",
      "fixture:free_neutron_beta_support_disallowed",
      "fixture:primitive_imbalance_neutron_to_proton",
      "fixture:pass_thru_neutron",
      "pdgfeed:fixture:free_neutron_beta_decay",
      "pdgfeed:live:free_neutron_beta_decay",
    ]
  );
});

test("bootstrap seed can append pdgfeed manifest requests and reopen an acceptance record", async () => {
  const acceptanceFixture = readJson("content/contracts/examples/pdgsolve-acceptance/free_neutron_beta_exact.v1.json");
  const requestFixture = readJson("content/contracts/examples/pdgsolve-request/pass_thru_neutron.v1.json");
  const manifestFixture = {
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
        pdgsolveRequest: requestFixture,
      },
    ],
  };

  const fetchImpl = async (url) => {
    if (url === "https://example.test/manifest.json") {
      return { ok: true, json: async () => manifestFixture };
    }
    if (url === "https://example.test/acceptance.json") {
      return { ok: true, json: async () => acceptanceFixture };
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
  assert.deepEqual(seed.reopenedAcceptance, acceptanceFixture);
});

test("live pdgfeed neutron requests solve through the exact beta family with a live problem id", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.pdgsolve-request.v1.json");
  const result = solvePdgsolveRequest(request);

  assert.equal(result.problemId, "pdgsolve_problem_free_neutron_beta_decay.live-pdg");
  assert.equal(result.searchStatus, "exact_available");
  assert.equal(result.bestFamilyId, "family.beta.exact.v1");
  assert.equal(result.diagnostics[0].payload.requestId, "free_neutron_beta_decay.live-pdg");
});

test("explicit Noether support requests land in the exact beta family without implied-support diagnostics", () => {
  const request = {
    schema: "pdgsolve-request/v1",
    requestId: "beta_exact_explicit_support",
    source: {
      kind: "developer",
      title: "Explicit beta support",
      sourceDocumentId: "developer:beta_exact_explicit_support",
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
  assert.equal(result.bestFamilyId, "family.beta.exact.v1");
  assert.deepEqual(result.diagnostics, []);
  assert.deepEqual(result.review.blockingDiagnostics, []);
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
  assert.equal(acceptance.resultDigest, "pdgsolve_problem_pass_thru_neutron::family.pass_thru.neutron.v1::v1");
  assert.equal(acceptance.lockedSolveGraph.schema, "pdgsolve-publication-graph/v1");
  assert.equal(pdgeditPreview.schema, "pdgedit/v1");
  assert.equal(pdgeditPreview.assemblies.length, 9);
  assert.equal(pdgeditPreview.operators.length, 2);
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
