import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  DEFAULT_REACTION_LIBRARY_ACCEPTED_AT,
  syncBuiltInReactionLibrary,
} from "../scripts/reaction-library-build-runtime.mjs";

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function createTempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "reaction-library-sync-test-"));
}

test("syncBuiltInReactionLibrary check mode reports stale built-in output", () => {
  const rootDir = createTempRoot();
  const requestPath = "requests/muon_decay.solver-request.v1.json";
  const outputPath = "content/contracts/examples/reaction-flow/muon_decay.v1.json";

  writeJson(path.join(rootDir, requestPath), { requestId: "muon_decay" });
  writeJson(path.join(rootDir, outputPath), {
    review: { acceptedAt: DEFAULT_REACTION_LIBRARY_ACCEPTED_AT },
    title: "Old muon decay",
  });

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    entries: [
      {
        entryId: "muon_decay",
        requestPath,
        outputPath,
        title: "Muon decay",
      },
    ],
    buildDocument: (_requestFilePath, options = {}) => ({
      document: {
        schema: "reaction-flow/v1",
        review: { acceptedAt: options.acceptedAt },
        title: options.title,
      },
    }),
  });

  assert.deepEqual(result.driftPaths, [outputPath]);
  assert.deepEqual(result.changedPaths, []);
  assert.deepEqual(result.generationErrors, []);
});

test("syncBuiltInReactionLibrary write mode refreshes generated built-in output", () => {
  const rootDir = createTempRoot();
  const requestPath = "requests/free_neutron_beta_decay.solver-request.v1.json";
  const outputPath = "content/contracts/examples/reaction-flow/free_neutron_beta.v1.json";

  writeJson(path.join(rootDir, requestPath), { requestId: "free_neutron_beta_decay" });

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "write",
    entries: [
      {
        entryId: "free_neutron_beta",
        requestPath,
        outputPath,
        title: "Free neutron beta decay",
      },
    ],
    buildDocument: (_requestFilePath, options = {}) => ({
      document: {
        schema: "reaction-flow/v1",
        review: { acceptedAt: options.acceptedAt },
        title: options.title,
      },
    }),
  });

  assert.deepEqual(result.changedPaths, [outputPath]);
  assert.deepEqual(result.driftPaths, []);
  assert.deepEqual(result.generationErrors, []);
  assert.deepEqual(readJson(path.join(rootDir, outputPath)), {
    schema: "reaction-flow/v1",
    review: { acceptedAt: DEFAULT_REACTION_LIBRARY_ACCEPTED_AT },
    title: "Free neutron beta decay",
  });
});

test("syncBuiltInReactionLibrary preserves acceptedAt from the checked-in output and skips non-exact accepted-library builds", () => {
  const rootDir = createTempRoot();
  const requestPath = "requests/charged_pion_to_muon_neutrino.solver-request.v1.json";
  const outputPath =
    "content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json";
  const existingAcceptedAt = "2026-04-04T23:11:00.000Z";
  const seenAcceptedAt = [];

  writeJson(path.join(rootDir, requestPath), { requestId: "charged_pion_to_muon_neutrino" });
  writeJson(path.join(rootDir, outputPath), {
    schema: "reaction-flow/v1",
    review: { acceptedAt: existingAcceptedAt },
    title: "Charged pion to muon neutrino",
  });

  const successResult = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    entries: [
      {
        entryId: "charged_pion_to_muon_neutrino",
        requestPath,
        outputPath,
        title: "Charged pion to muon neutrino",
      },
    ],
    buildDocument: (_requestFilePath, options = {}) => {
      seenAcceptedAt.push(options.acceptedAt);
      return {
        document: {
          schema: "reaction-flow/v1",
          review: { acceptedAt: options.acceptedAt },
          title: options.title,
        },
      };
    },
  });

  assert.deepEqual(seenAcceptedAt, [existingAcceptedAt]);
  assert.deepEqual(successResult.driftPaths, []);
  assert.deepEqual(successResult.generationErrors, []);
  assert.deepEqual(successResult.skippedEntries, []);

  const skippedResult = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    entries: [
      {
        entryId: "charged_pion_to_muon_neutrino",
        requestPath,
        outputPath,
        title: "Charged pion to muon neutrino",
      },
    ],
    buildDocument: () => {
      throw new Error("exact solver result required");
    },
  });

  assert.equal(skippedResult.generationErrors.length, 0);
  assert.equal(skippedResult.skippedEntries.length, 1);
  assert.equal(skippedResult.skippedEntries[0]?.outputPath, outputPath);
  assert.match(skippedResult.skippedEntries[0]?.message ?? "", /exact solver result required/);
});

test("syncBuiltInReactionLibrary still reports hard generation errors", () => {
  const rootDir = createTempRoot();
  const requestPath = "requests/muon_decay.solver-request.v1.json";
  const outputPath = "content/contracts/examples/reaction-flow/muon_decay.v1.json";

  writeJson(path.join(rootDir, requestPath), { requestId: "muon_decay" });

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    entries: [
      {
        entryId: "muon_decay",
        requestPath,
        outputPath,
        title: "Muon decay",
      },
    ],
    buildDocument: () => {
      throw new Error("unexpected solver bridge failure");
    },
  });

  assert.equal(result.skippedEntries.length, 0);
  assert.equal(result.generationErrors.length, 1);
  assert.equal(result.generationErrors[0]?.outputPath, outputPath);
  assert.match(result.generationErrors[0]?.message ?? "", /unexpected solver bridge failure/);
});
