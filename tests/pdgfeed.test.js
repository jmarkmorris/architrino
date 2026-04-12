import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO_ROOT = fileURLToPath(new URL("../", import.meta.url));
const SHARED_PYTHON = "/Users/markmorris/vibe/.venv/bin/python";

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
  const result = spawnSync(SHARED_PYTHON, ["pdgfeed.py", ...args], {
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

test("root CLI list writes known reactions first with k/u and exact IDs", () => {
  const listResult = runPdgfeed(["list", "--source", "pdg-reactions"]);
  assert.equal(listResult.stdout.trim(), ".tmp/pdgfeed.list.pdg_reactions.md");

  const lines = fs.readFileSync(path.join(REPO_ROOT, ".tmp", "pdgfeed.list.pdg_reactions.md"), "utf8").trim().split("\n");
  assert.deepEqual(lines.slice(0, 7), [
    "| K/U | MCID | PDG ID | Reaction ID | Title | Channel | Status |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    "| k | 13 | S004.1/2025 | mu_minus_s004_1 | mu- decay mode 1 | mu- -> e- nubar_e nu_mu | exportable |",
    "| k | 13 | S004.2/2025 | mu_minus_s004_2 | mu- decay mode 2 | mu- -> e- nubar_e nu_mu gamma | proposal-only |",
    "| k | 13 | S004.7/2025 | mu_minus_s004_7 | mu- decay mode 3 | mu- -> e- nubar_e nu_mu e+ e- | exportable |",
    "| k | 13 | S004.4/2025 | mu_minus_s004_4 | mu- decay mode 5 | mu- -> e- gamma | proposal-only |",
    "| k | 211 | S008.1/2025 | pi_plus_s008_1 | pi+ decay mode 1 | pi+ -> mu+ nu_mu | proposal-only |",
  ]);
});

test("proposal emits live known reaction metadata", () => {
  const proposalResult = runPdgfeed(["proposal", "mu_minus_s004_1", "--source", "pdg-reactions"]);
  const proposal = JSON.parse(proposalResult.stdout);

  assert.equal(proposal.schema, "pdg-proposal/v1");
  assert.equal(proposal.proposalId, "mu_minus_s004_1");
  assert.equal(proposal.source.mcid, 13);
  assert.equal(proposal.source.pdgIdentifier, "S004.1/2025");
  assert.equal(proposal.source.knownStatus, "k");
  assert.equal(proposal.exportable, true);
});

test("request emits a valid pdgsolve-request for a known exportable reaction", () => {
  const schema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const requestResult = runPdgfeed(["request", "mu_minus_s004_1", "--source", "pdg-reactions"]);
  const request = JSON.parse(requestResult.stdout);

  assert.deepEqual(validateAgainstSchema(request, schema), [], "request schema mismatch");
  assert.equal(request.requestId, "mu_minus_s004_1");
  assert.equal(request.source.kind, "pdgfeed");
});

test("proposal-only request command fails cleanly for a known unsupported reaction", () => {
  const result = runPdgfeed(["request", "mu_minus_s004_2", "--source", "pdg-reactions"], {
    expectFailure: true,
  });

  assert.equal(result.stderr.trim(), "PDG reaction 'mu_minus_s004_2' does not currently emit pdgsolve-request/v1.");
});

test("supported-csv writes known-first rows with exact IDs and markdown sidecar", () => {
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdgfeed-test-"));
  const csvPath = path.join(outputDir, "supported.csv");
  const result = runPdgfeed(["supported-csv", csvPath, "--source", "pdg-reactions"]);

  assert.deepEqual(result.stdout.trim().split("\n"), [csvPath, ".tmp/pdgfeed.supported.pdg_reactions.md"]);

  const lines = fs.readFileSync(csvPath, "utf8").trim().split(/\r?\n/);
  assert.deepEqual(lines.slice(0, 3), [
    "known_status,reaction_id,mcid,pdg_identifier,title,reactant_names_aaa,product_names_aaa,reactant_electrinos,product_electrinos,electrino_delta,reactant_positrinos,product_positrinos,positrino_delta",
    "k,mu_minus_s004_1,13,S004.1/2025,mu- decay mode 1,e2,e.av.v2,8,20,-12,2,14,-12",
    "k,mu_minus_s004_7,13,S004.7/2025,mu- decay mode 3,e2,e.av.v2.ae.e,8,32,-24,2,26,-24",
  ]);

  const markdownLines = fs.readFileSync(path.join(REPO_ROOT, ".tmp", "pdgfeed.supported.pdg_reactions.md"), "utf8").trim().split("\n");
  assert.deepEqual(markdownLines.slice(0, 4), [
    "| K/U | Reaction ID | MCID | PDG ID | Title | Reactant AAA | Product AAA | Reactant Electrinos | Product Electrinos | Electrino Delta | Reactant Positrinos | Product Positrinos | Positrino Delta |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    "| k | mu_minus_s004_1 | 13 | S004.1/2025 | mu- decay mode 1 | e2 | e.av.v2 | 8 | 20 | -12 | 2 | 14 | -12 |",
    "| k | mu_minus_s004_7 | 13 | S004.7/2025 | mu- decay mode 3 | e2 | e.av.v2.ae.e | 8 | 32 | -24 | 2 | 26 | -24 |",
  ]);
});

test("direct script entrypoint matches the root delegator for request output", () => {
  const rootStdout = execFileSync(SHARED_PYTHON, ["pdgfeed.py", "request", "mu_minus_s004_1", "--source", "pdg-reactions"], {
    cwd: REPO_ROOT,
    encoding: "utf8",
  });
  const directStdout = execFileSync(
    SHARED_PYTHON,
    ["scripts/pdg/pdgfeed.py", "request", "mu_minus_s004_1", "--source", "pdg-reactions"],
    {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }
  );

  assert.deepEqual(JSON.parse(directStdout), JSON.parse(rootStdout));
});
