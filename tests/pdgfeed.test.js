import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "array") {
    return Array.isArray(value);
  }
  if (expectedType === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expectedType === "integer") {
    return Number.isInteger(value);
  }
  if (expectedType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  return typeof value === expectedType;
}

function validateAgainstSchema(value, schema, path = "$", errors = []) {
  if (!schema || typeof schema !== "object") {
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(schema, "const") && value !== schema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(schema.const)}`);
    return errors;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(`${path}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }

  if (schema.type) {
    const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof schema.minLength === "number" && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${path}: expected string length >= ${schema.minLength}`);
  }

  if (typeof schema.minimum === "number" && typeof value === "number" && value < schema.minimum) {
    errors.push(`${path}: expected number >= ${schema.minimum}`);
  }

  if (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object"))) {
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${path}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      validateAgainstSchema(value[key], childSchema, `${path}.${key}`, errors);
    }
  }

  if (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

test("generated PDG pdgsolve-request test cases validate against pdgsolve-request/v1", () => {
  const schema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const requestPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".pdgsolve-request.v1.json"))
    .filter((entry) => !entry.includes(".live-pdg."))
    .sort();

  assert.deepEqual(requestPaths, ["free_neutron_beta_decay.pdgsolve-request.v1.json"]);

  requestPaths.forEach((entry) => {
    const request = JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"));
    assert.deepEqual(validateAgainstSchema(request, schema), [], `${entry} schema mismatch`);
    assert.equal(request.source?.kind, "pdgfeed", `${entry} source kind drifted`);
    assert.equal(request.source?.sourceDocumentId, `pdg-proposal:${request.requestId}`, `${entry} sourceDocumentId drifted`);
    assert.deepEqual(request.policy, {
      betaSupportMode: "allow-implied-noether-core-support",
      exactClosureRequired: true,
      allowedBoundaryAugmentations: ["none", "2h", "4h"],
    });
  });
});

test("generated live PDG pdgsolve-request artifacts validate against pdgsolve-request/v1", () => {
  const schema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const requestPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".live-pdg.pdgsolve-request.v1.json"))
    .sort();

  assert.deepEqual(requestPaths, ["free_neutron_beta_decay.live-pdg.pdgsolve-request.v1.json"]);

  requestPaths.forEach((entry) => {
    const request = JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"));
    assert.deepEqual(validateAgainstSchema(request, schema), [], `${entry} schema mismatch`);
    assert.equal(request.source?.kind, "pdgfeed", `${entry} source kind drifted`);
    assert.equal(request.source?.sourceDocumentId, `pdg-proposal:${request.requestId}`, `${entry} sourceDocumentId drifted`);
    assert.deepEqual(request.policy, {
      betaSupportMode: "allow-implied-noether-core-support",
      exactClosureRequired: true,
      allowedBoundaryAugmentations: ["none", "2h", "4h"],
    });
  });
});

test("live neutron pdgsolve requests preserve the same occurrence surface as test-case exports", () => {
  const testCaseNeutron = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.pdgsolve-request.v1.json");
  const liveNeutron = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.pdgsolve-request.v1.json");

  function summarizeOccurrences(request) {
    return {
      reactants: request.reactants.map((occurrence) => ({
        assemblyId: occurrence.assemblyId,
        title: occurrence.title,
      })),
      products: request.products.map((occurrence) => ({
        assemblyId: occurrence.assemblyId,
        title: occurrence.title,
      })),
    };
  }

  assert.deepEqual(summarizeOccurrences(liveNeutron), summarizeOccurrences(testCaseNeutron));
});

test("live PDG proposals preserve live provenance while normalizing PDG aliases into the locked v1 particle vocabulary", () => {
  const neutronProposal = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.proposal.v1.json");
  const muonProposal = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.live-pdg.proposal.v1.json");
  const radiativeNeutronProposal = readJson(
    "content/contracts/examples/pdg/v1/generated/radiative_free_neutron_beta_decay.live-pdg.proposal.v1.json"
  );
  const radiativeMuonProposal = readJson(
    "content/contracts/examples/pdg/v1/generated/radiative_muon_decay.live-pdg.proposal.v1.json"
  );
  const pairMuonProposal = readJson(
    "content/contracts/examples/pdg/v1/generated/muon_decay_with_electron_positron_pair.live-pdg.proposal.v1.json"
  );
  const muonPhotonProposal = readJson(
    "content/contracts/examples/pdg/v1/generated/muon_to_electron_photon.live-pdg.proposal.v1.json"
  );
  const pionProposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.proposal.v1.json");

  assert.equal(neutronProposal.source.sourceMode, "pdg.connect");
  assert.equal(muonProposal.source.sourceMode, "pdg.connect");
  assert.equal(radiativeNeutronProposal.source.sourceMode, "pdg.connect");
  assert.equal(radiativeMuonProposal.source.sourceMode, "pdg.connect");
  assert.equal(pairMuonProposal.source.sourceMode, "pdg.connect");
  assert.equal(muonPhotonProposal.source.sourceMode, "pdg.connect");
  assert.equal(pionProposal.source.sourceMode, "pdg.connect");
  assert.equal(neutronProposal.source.pdgIdentifier, "S017.1/2025");
  assert.equal(muonProposal.source.pdgIdentifier, "S004.1/2025");
  assert.equal(radiativeNeutronProposal.source.pdgIdentifier, "S017.4/2025");
  assert.equal(radiativeMuonProposal.source.pdgIdentifier, "S004.2/2025");
  assert.equal(pairMuonProposal.source.pdgIdentifier, "S004.7/2025");
  assert.equal(muonPhotonProposal.source.pdgIdentifier, "S004.4/2025");
  assert.equal(pionProposal.source.pdgIdentifier, "S008.1/2025");
  assert.deepEqual(neutronProposal.source.contract, {
    upstreamSchema: "pdg-proposal/v1",
    downstreamSchema: "pdgsolve-request/v1",
    handoffMode: "upstream-only",
    reactionAcceptanceRequired: true,
    reactionAcceptanceBoundary: "reaction-review",
    acceptedReactionHandoff: "reaction-owned",
    pdgviewHandoff: "accepted-reaction-only",
  });
  assert.equal(neutronProposal.products[2].pdgId, "nubar_e");
  assert.equal(neutronProposal.products[2].pdgName, "anti-nu_e");
  assert.equal(muonProposal.products[1].pdgId, "nubar_e");
  assert.equal(muonProposal.products[1].pdgName, "anti-nu_e");
  assert.equal(radiativeNeutronProposal.products[3].pdgId, "gamma");
  assert.equal(radiativeMuonProposal.products[3].pdgId, "gamma");
  assert.equal(pairMuonProposal.products[3].pdgId, "e+");
  assert.equal(pairMuonProposal.products[4].pdgId, "e-");
  assert.equal(muonPhotonProposal.products[1].pdgId, "gamma");
  assert.equal(pionProposal.reactants[0].templateId, "pi_plus");
  assert.equal(pionProposal.products[0].templateId, "electron");
  assert.equal(pionProposal.products[1].templateId, "neutrino");
});

test("charged pion test case stays proposal-only until pdgsolve-request/v1 gains matching assemblies", () => {
  const proposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.proposal.v1.json");

  assert.equal(proposal.exportable, false);
  assert.deepEqual(proposal.source.contract, {
    upstreamSchema: "pdg-proposal/v1",
    downstreamSchema: "pdgsolve-request/v1",
    handoffMode: "upstream-only",
    reactionAcceptanceRequired: true,
    reactionAcceptanceBoundary: "reaction-review",
    acceptedReactionHandoff: "reaction-owned",
    pdgviewHandoff: "accepted-reaction-only",
  });
  assert.deepEqual(proposal.notes, [
    "unsupported reactant test case used to keep a real PDG decay channel in the first local corpus",
    "unsupported:reactant:pi+:no-pdgsolve-request-v1-mapping",
    "unsupported:product:mu+:no-pdgsolve-request-v1-mapping",
    "unsupported:product:nu_mu:no-pdgsolve-request-v1-mapping",
  ]);
  assert.equal(
    fs.existsSync(new URL("../content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.pdgsolve-request.v1.json", import.meta.url)),
    false
  );
});

test("charged pion live PDG channel stays proposal-only until pdgsolve-request/v1 gains matching assemblies", () => {
  const proposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.proposal.v1.json");

  assert.equal(proposal.exportable, false);
  assert.deepEqual(proposal.source.contract, {
    upstreamSchema: "pdg-proposal/v1",
    downstreamSchema: "pdgsolve-request/v1",
    handoffMode: "upstream-only",
    reactionAcceptanceRequired: true,
    reactionAcceptanceBoundary: "reaction-review",
    acceptedReactionHandoff: "reaction-owned",
    pdgviewHandoff: "accepted-reaction-only",
  });
  assert.equal(proposal.source.sourceMode, "pdg.connect");
  assert.equal(proposal.source.pdgIdentifier, "S008.1/2025");
  assert.deepEqual(proposal.notes, [
    "unsupported:reactant:pi+:no-pdgsolve-request-v1-mapping",
    "unsupported:product:mu+:no-pdgsolve-request-v1-mapping",
    "unsupported:product:nu_mu:no-pdgsolve-request-v1-mapping",
  ]);
  assert.equal(
    fs.existsSync(
      new URL("../content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.pdgsolve-request.v1.json", import.meta.url)
    ),
    false
  );
});

test("pdgfeed can print test-case pdgsolve-request json to stdout for piping", () => {
  const schema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const testCaseRequest = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.pdgsolve-request.v1.json");
  const stdout = execFileSync("python3", ["pdgfeed.py", "print-test-case-pdgsolve-request", "free_neutron_beta_decay"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });
  const request = JSON.parse(stdout);

  assert.deepEqual(validateAgainstSchema(request, schema), []);
  assert.deepEqual(request, testCaseRequest);
});

test("pdgfeed implementation lives under scripts/pdg while the root shim preserves callers", () => {
  const rootShim = fs.readFileSync(new URL("../pdgfeed.py", import.meta.url), "utf8");
  const implementation = fs.readFileSync(new URL("../scripts/pdg/pdgfeed.py", import.meta.url), "utf8");

  assert.match(rootShim, /scripts" \/ "pdg" \/ "pdgfeed\.py"/);
  assert.match(rootShim, /importlib\.util/);
  assert.doesNotMatch(rootShim, /PDG_V1_PARTICLE_MAPPINGS/);
  assert.match(implementation, /PDG_V1_PARTICLE_MAPPINGS/);
});

test("scripts/pdg pdgfeed implementation can print test-case pdgsolve-request json directly", () => {
  const testCaseRequest = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.pdgsolve-request.v1.json");
  const stdout = execFileSync("python3", ["scripts/pdg/pdgfeed.py", "print-test-case-pdgsolve-request", "free_neutron_beta_decay"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });
  const request = JSON.parse(stdout);

  assert.deepEqual(request, testCaseRequest);
});

test("pdgfeed can print test-case proposal json to stdout", () => {
  const testCaseProposal = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.proposal.v1.json");
  const stdout = execFileSync("python3", ["pdgfeed.py", "print-test-case-proposal", "free_neutron_beta_decay"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });
  const proposal = JSON.parse(stdout);

  assert.deepEqual(proposal, testCaseProposal);
});
