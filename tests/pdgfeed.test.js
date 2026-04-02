import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

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

test("generated PDG solver-request fixtures validate against solver-request/v1", () => {
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const requestPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".solver-request.v1.json"))
    .filter((entry) => !entry.includes(".live-pdg."))
    .sort();

  assert.deepEqual(requestPaths, [
    "free_neutron_beta_decay.solver-request.v1.json",
    "muon_decay.solver-request.v1.json",
  ]);

  requestPaths.forEach((entry) => {
    const request = JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"));
    assert.deepEqual(validateAgainstSchema(request, schema), [], `${entry} schema mismatch`);
    assert.equal(request.origin?.sourceKind, "pdg-ingest", `${entry} sourceKind drifted`);
    assert.deepEqual(request.manualOperators, [], `${entry} manualOperators drifted`);
    assert.deepEqual(request.manualMappings, [], `${entry} manualMappings drifted`);
  });
});

test("generated live PDG solver-request artifacts validate against solver-request/v1", () => {
  const schema = readJson("src/contracts/solver-request/v1/schema.json");
  const generatedDir = new URL("../content/contracts/examples/pdg/v1/generated/", import.meta.url);
  const requestPaths = fs
    .readdirSync(generatedDir)
    .filter((entry) => entry.endsWith(".live-pdg.solver-request.v1.json"))
    .sort();

  assert.deepEqual(requestPaths, [
    "free_neutron_beta_decay.live-pdg.solver-request.v1.json",
    "muon_decay.live-pdg.solver-request.v1.json",
  ]);

  requestPaths.forEach((entry) => {
    const request = JSON.parse(fs.readFileSync(new URL(entry, generatedDir), "utf8"));
    assert.deepEqual(validateAgainstSchema(request, schema), [], `${entry} schema mismatch`);
    assert.equal(request.origin?.sourceKind, "pdg-ingest", `${entry} sourceKind drifted`);
    assert.deepEqual(request.manualOperators, [], `${entry} manualOperators drifted`);
    assert.deepEqual(request.manualMappings, [], `${entry} manualMappings drifted`);
  });
});

test("live PDG artifacts preserve the same normalized participant template surface as fixture exports", () => {
  const fixtureNeutron = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json");
  const liveNeutron = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.solver-request.v1.json");
  const fixtureMuon = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json");
  const liveMuon = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.live-pdg.solver-request.v1.json");

  function summarizeParticipants(request) {
    return request.participants.map((participant) => ({
      side: participant.side,
      templateId: participant.templateId,
      label: participant.label,
      polarity: participant.polarity,
    }));
  }

  assert.deepEqual(summarizeParticipants(liveNeutron), summarizeParticipants(fixtureNeutron));
  assert.deepEqual(summarizeParticipants(liveMuon), summarizeParticipants(fixtureMuon));
});

test("live PDG proposals preserve live provenance while normalizing PDG aliases into the locked v1 particle vocabulary", () => {
  const neutronProposal = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.live-pdg.proposal.v1.json");
  const muonProposal = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.live-pdg.proposal.v1.json");
  const pionProposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.proposal.v1.json");

  assert.equal(neutronProposal.source.sourceMode, "pdg.connect");
  assert.equal(muonProposal.source.sourceMode, "pdg.connect");
  assert.equal(pionProposal.source.sourceMode, "pdg.connect");
  assert.equal(neutronProposal.source.pdgIdentifier, "S017.1/2025");
  assert.equal(muonProposal.source.pdgIdentifier, "S004.1/2025");
  assert.equal(pionProposal.source.pdgIdentifier, "S008.1/2025");
  assert.equal(neutronProposal.products[2].pdgId, "nubar_e");
  assert.equal(neutronProposal.products[2].pdgName, "anti-nu_e");
  assert.equal(muonProposal.products[1].pdgId, "nubar_e");
  assert.equal(muonProposal.products[1].pdgName, "anti-nu_e");
});

test("unsupported PDG fixture remains proposal-only with no solver-request artifact", () => {
  const proposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.proposal.v1.json");

  assert.equal(proposal.exportable, false);
  assert.ok(
    proposal.notes.includes("unsupported:reactant:pi+:no-v1-solver-template"),
    "charged pion proposal should record the explicit unsupported v1 mapping reason"
  );
  assert.equal(
    fs.existsSync(
      new URL("../content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.solver-request.v1.json", import.meta.url)
    ),
    false
  );
});

test("unsupported live PDG channel remains proposal-only with no solver-request artifact", () => {
  const proposal = readJson("content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.proposal.v1.json");

  assert.equal(proposal.exportable, false);
  assert.equal(proposal.source.sourceMode, "pdg.connect");
  assert.equal(proposal.source.pdgIdentifier, "S008.1/2025");
  assert.ok(
    proposal.notes.includes("unsupported:reactant:pi+:no-v1-solver-template"),
    "charged pion live proposal should record the explicit unsupported v1 mapping reason"
  );
  assert.equal(
    fs.existsSync(
      new URL(
        "../content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.live-pdg.solver-request.v1.json",
        import.meta.url
      )
    ),
    false
  );
});
