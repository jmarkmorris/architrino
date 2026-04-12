import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../", import.meta.url));

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

function validateAgainstSchema(value, schema, pathLabel = "$", errors = []) {
  if (!schema || typeof schema !== "object") {
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(schema, "const") && value !== schema.const) {
    errors.push(`${pathLabel}: expected constant ${JSON.stringify(schema.const)}`);
    return errors;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(`${pathLabel}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }

  if (schema.type) {
    const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${pathLabel}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof schema.minLength === "number" && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${pathLabel}: expected string length >= ${schema.minLength}`);
  }

  if (typeof schema.minimum === "number" && typeof value === "number" && value < schema.minimum) {
    errors.push(`${pathLabel}: expected number >= ${schema.minimum}`);
  }

  if (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object"))) {
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${pathLabel}: missing required property ${key}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${pathLabel}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      validateAgainstSchema(value[key], childSchema, `${pathLabel}.${key}`, errors);
    }
  }

  if (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${pathLabel}[${index}]`, errors);
      });
    }
  }

  return errors;
}

function runPdgfeed(args, { expectFailure = false } = {}) {
  const result = spawnSync("python3", ["pdgfeed.py", ...args], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  if (expectFailure) {
    assert.notEqual(result.status, 0, `expected failure for ${args.join(" ")}`);
    return result;
  }
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result;
}

test("generated PDG request fixtures validate against the full v1 schema", () => {
  const schema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const requestPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".pdgsolve-request.v1.json"))
    .sort();

  assert.deepEqual(requestPaths, [
    "muon_decay.pdgsolve-request.v1.json",
    "muon_decay_with_electron_positron_pair.pdgsolve-request.v1.json",
  ]);

  requestPaths.forEach((entry) => {
    const request = JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"));
    assert.deepEqual(validateAgainstSchema(request, schema), [], `${entry} schema mismatch`);
    assert.equal(request.source.kind, "pdgfeed");
    assert.equal(request.source.sourceDocumentId, `pdg-proposal:${request.requestId}`);
  });
});

test("generated PDG proposal fixtures cover the documented five-case split", () => {
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const proposalPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".proposal.v1.json"))
    .sort();

  assert.deepEqual(proposalPaths, [
    "charged_pion_to_muon_neutrino.proposal.v1.json",
    "muon_decay.proposal.v1.json",
    "muon_decay_with_electron_positron_pair.proposal.v1.json",
    "muon_to_electron_photon.proposal.v1.json",
    "radiative_muon_decay.proposal.v1.json",
  ]);

  const proposals = Object.fromEntries(
    proposalPaths.map((entry) => [entry, JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"))])
  );

  assert.equal(proposals["muon_decay.proposal.v1.json"].exportable, true);
  assert.equal(proposals["muon_decay_with_electron_positron_pair.proposal.v1.json"].exportable, true);
  assert.equal(proposals["radiative_muon_decay.proposal.v1.json"].exportable, false);
  assert.equal(proposals["muon_to_electron_photon.proposal.v1.json"].exportable, false);
  assert.equal(proposals["charged_pion_to_muon_neutrino.proposal.v1.json"].exportable, false);
});

test("root CLI list, proposal, and request outputs match the committed fixtures", () => {
  const listResult = runPdgfeed(["list", "--source", "pdg-test-reactions"]);
  assert.deepEqual(listResult.stdout.trim().split("\n"), [
    "muon_decay\tMuon decay",
    "radiative_muon_decay\tRadiative muon decay",
    "muon_decay_with_electron_positron_pair\tMuon decay with electron-positron pair",
    "muon_to_electron_photon\tMuon to electron photon",
    "charged_pion_to_muon_neutrino\tCharged pion to muon neutrino",
  ]);

  const expectedProposal = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.proposal.v1.json");
  const proposalResult = runPdgfeed(["proposal", "muon_decay", "--source", "pdg-test-reactions"]);
  assert.deepEqual(JSON.parse(proposalResult.stdout), expectedProposal);

  const expectedRequest = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.pdgsolve-request.v1.json");
  const requestResult = runPdgfeed(["request", "muon_decay", "--source", "pdg-test-reactions"]);
  assert.deepEqual(JSON.parse(requestResult.stdout), expectedRequest);
});

test("proposal-only request command fails cleanly", () => {
  const result = runPdgfeed(["request", "radiative_muon_decay", "--source", "pdg-test-reactions"], {
    expectFailure: true,
  });

  assert.equal(result.stderr.trim(), "PDG test reaction 'radiative_muon_decay' does not currently emit pdgsolve-request/v1.");
});

test("supported-csv emits only the exportable AAA summaries", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdgfeed-test-"));
  const csvPath = path.join(outputDir, "supported.csv");

  const result = runPdgfeed(["supported-csv", csvPath, "--source", "pdg-test-reactions"]);

  assert.equal(result.stdout.trim(), csvPath);
  const lines = fs.readFileSync(csvPath, "utf8").trim().split(/\r?\n/);
  assert.deepEqual(lines, [
    "reactant_names_aaa,product_names_aaa,reactant_electrinos,product_electrinos,electrino_delta,reactant_positrinos,product_positrinos,positrino_delta",
    "e2,e.av.v2,8,20,-12,2,14,-12",
    "e2,e.av.v2.ae.e,8,32,-24,2,26,-24",
  ]);
});

test("direct script entrypoint matches the root delegator for request output", () => {
  const rootStdout = execFileSync("python3", ["pdgfeed.py", "request", "muon_decay", "--source", "pdg-test-reactions"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  const directStdout = execFileSync(
    "python3",
    ["scripts/pdg/pdgfeed.py", "request", "muon_decay", "--source", "pdg-test-reactions"],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }
  );

  assert.deepEqual(JSON.parse(directStdout), JSON.parse(rootStdout));
});
