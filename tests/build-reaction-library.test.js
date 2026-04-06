import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  DEFAULT_REACTION_LIBRARY_ACCEPTED_AT,
  GENERATED_REACTION_LIBRARY_ENTRIES_DIR,
  GENERATED_REACTION_LIBRARY_MANIFEST_PATH,
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

function createRequestSummary({
  requestPath,
  entryId,
  title,
  solveExact = false,
  rankingScore = 0,
  rankingRank = 1,
  unresolvedTargetCount = 0,
  errorCount = 0,
  diagnosticCodes = [],
} = {}) {
  return {
    requestPath,
    entryId,
    title,
    solveExact,
    rankingScore,
    rankingRank,
    unresolvedTargetCount,
    errorCount,
    diagnosticCodes,
    request: {
      requestId: entryId,
      origin: {
        sourceKind: "pdg-ingest",
        sourceDocumentId: `pdg-proposal:${entryId}`,
        title,
      },
    },
  };
}

function createBuildDocumentStub(seenAcceptedAt = []) {
  return (_requestFilePath, options = {}) => {
    seenAcceptedAt.push({
      entryId: options.entryId,
      acceptedAt: options.acceptedAt,
    });
    return {
      document: {
        schema: "reaction-flow/v1",
        reactionId: options.entryId,
        title: options.title,
        review: options.acceptedAt
          ? {
              status: "accepted",
              acceptedAt: options.acceptedAt,
            }
          : {
              status: "draft",
            },
        participants: [],
        operators: [],
        mappings: [],
        stages: [],
        provenance: {
          sourceDocumentIds: [`pdg-proposal:${options.entryId}`],
          participantIds: [],
          mappingIds: [],
        },
        hints: {
          initialFramingTargets: [],
          semanticTags: [],
          suggestedSceneId: `${options.entryId}_scene`,
        },
      },
    };
  };
}

test("syncBuiltInReactionLibrary check mode reports drift for generated manifest and entry output", () => {
  const rootDir = createTempRoot();
  const entryPath = path.join(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR, "muon_decay.reaction-flow.v1.json");
  writeJson(entryPath, {
    schema: "reaction-flow/v1",
    title: "Old muon decay",
    review: { status: "accepted", acceptedAt: DEFAULT_REACTION_LIBRARY_ACCEPTED_AT },
  });

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    requestSummaries: [
      createRequestSummary({
        requestPath: "requests/muon_decay.solver-request.v1.json",
        entryId: "muon_decay",
        title: "Muon decay",
        solveExact: true,
        rankingScore: 100,
      }),
    ],
    buildDocument: createBuildDocumentStub(),
  });

  assert.deepEqual(result.generationErrors, []);
  assert.deepEqual(result.changedPaths, []);
  assert.deepEqual(result.driftPaths, [
    GENERATED_REACTION_LIBRARY_ENTRIES_DIR + "/muon_decay.reaction-flow.v1.json",
    GENERATED_REACTION_LIBRARY_MANIFEST_PATH,
  ]);
});

test("syncBuiltInReactionLibrary write mode emits all exact entries plus the top five non-exact entries", () => {
  const rootDir = createTempRoot();
  writeJson(path.join(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR, "stale.reaction-flow.v1.json"), {
    schema: "reaction-flow/v1",
    title: "Stale",
    review: { status: "draft" },
  });

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "write",
    requestSummaries: [
      createRequestSummary({
        requestPath: "requests/muon_decay.solver-request.v1.json",
        entryId: "muon_decay",
        title: "Muon decay",
        solveExact: true,
        rankingScore: 100,
      }),
      createRequestSummary({
        requestPath: "requests/free_neutron_beta_decay.solver-request.v1.json",
        entryId: "free_neutron_beta_decay",
        title: "Free neutron beta decay",
        solveExact: true,
        rankingScore: 95,
      }),
      createRequestSummary({
        requestPath: "requests/alpha.solver-request.v1.json",
        entryId: "alpha",
        title: "Alpha",
        rankingScore: 80,
        rankingRank: 1,
      }),
      createRequestSummary({
        requestPath: "requests/bravo.solver-request.v1.json",
        entryId: "bravo",
        title: "Bravo",
        rankingScore: 70,
        rankingRank: 2,
      }),
      createRequestSummary({
        requestPath: "requests/charlie.solver-request.v1.json",
        entryId: "charlie",
        title: "Charlie",
        rankingScore: 60,
        rankingRank: 3,
      }),
      createRequestSummary({
        requestPath: "requests/delta.solver-request.v1.json",
        entryId: "delta",
        title: "Delta",
        rankingScore: 50,
        rankingRank: 4,
      }),
      createRequestSummary({
        requestPath: "requests/echo.solver-request.v1.json",
        entryId: "echo",
        title: "Echo",
        rankingScore: 40,
        rankingRank: 5,
      }),
      createRequestSummary({
        requestPath: "requests/foxtrot.solver-request.v1.json",
        entryId: "foxtrot",
        title: "Foxtrot",
        rankingScore: 30,
        rankingRank: 6,
      }),
    ],
    buildDocument: createBuildDocumentStub(),
  });

  const manifest = readJson(path.join(rootDir, GENERATED_REACTION_LIBRARY_MANIFEST_PATH));
  assert.equal(result.generationErrors.length, 0);
  assert.equal(result.entryCount, 7);
  assert.equal(result.exactEntryCount, 2);
  assert.equal(result.nonExactEntryCount, 5);
  assert.equal(result.defaultEntryId, "muon_decay");
  assert.equal(manifest.defaultEntryId, "muon_decay");
  assert.deepEqual(
    manifest.entries.map((entry) => entry.id),
    [
      "muon_decay",
      "free_neutron_beta_decay",
      "alpha",
      "bravo",
      "charlie",
      "delta",
      "echo",
    ]
  );
  assert.equal(manifest.entries[0]?.isDefault, true);
  assert.equal(manifest.entries[2]?.displayTitle, "Alpha [non-exact]");
  assert.equal(
    fs.existsSync(path.join(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR, "foxtrot.reaction-flow.v1.json")),
    false
  );
  assert.equal(
    fs.existsSync(path.join(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR, "stale.reaction-flow.v1.json")),
    false
  );
});

test("syncBuiltInReactionLibrary preserves acceptedAt for exact generated entries", () => {
  const rootDir = createTempRoot();
  const existingAcceptedAt = "2026-04-04T23:11:00.000Z";
  writeJson(path.join(rootDir, GENERATED_REACTION_LIBRARY_ENTRIES_DIR, "muon_decay.reaction-flow.v1.json"), {
    schema: "reaction-flow/v1",
    title: "Muon decay",
    review: { status: "accepted", acceptedAt: existingAcceptedAt },
  });
  const seenAcceptedAt = [];

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    requestSummaries: [
      createRequestSummary({
        requestPath: "requests/muon_decay.solver-request.v1.json",
        entryId: "muon_decay",
        title: "Muon decay",
        solveExact: true,
        rankingScore: 100,
      }),
    ],
    buildDocument: createBuildDocumentStub(seenAcceptedAt),
  });

  assert.deepEqual(result.generationErrors, []);
  assert.deepEqual(seenAcceptedAt, [
    {
      entryId: "muon_decay",
      acceptedAt: existingAcceptedAt,
    },
  ]);
});

test("syncBuiltInReactionLibrary falls back to the best non-exact entry when no exact entries exist", () => {
  const rootDir = createTempRoot();

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "write",
    requestSummaries: [
      createRequestSummary({
        requestPath: "requests/bravo.solver-request.v1.json",
        entryId: "bravo",
        title: "Bravo",
        rankingScore: 70,
        rankingRank: 2,
      }),
      createRequestSummary({
        requestPath: "requests/alpha.solver-request.v1.json",
        entryId: "alpha",
        title: "Alpha",
        rankingScore: 80,
        rankingRank: 1,
      }),
    ],
    buildDocument: createBuildDocumentStub(),
  });

  const manifest = readJson(path.join(rootDir, GENERATED_REACTION_LIBRARY_MANIFEST_PATH));
  assert.equal(result.defaultEntryId, "alpha");
  assert.equal(manifest.defaultEntryId, "alpha");
  assert.equal(manifest.entries[0]?.id, "alpha");
  assert.equal(manifest.entries[0]?.displayTitle, "Alpha [non-exact]");
});

test("syncBuiltInReactionLibrary still reports hard generation errors", () => {
  const rootDir = createTempRoot();

  const result = syncBuiltInReactionLibrary({
    rootDir,
    mode: "check",
    requestSummaries: [
      createRequestSummary({
        requestPath: "requests/muon_decay.solver-request.v1.json",
        entryId: "muon_decay",
        title: "Muon decay",
        solveExact: true,
        rankingScore: 100,
      }),
    ],
    buildDocument: () => {
      throw new Error("unexpected solver bridge failure");
    },
  });

  assert.equal(result.generationErrors.length, 1);
  assert.equal(
    result.generationErrors[0]?.outputPath,
    GENERATED_REACTION_LIBRARY_ENTRIES_DIR + "/muon_decay.reaction-flow.v1.json"
  );
  assert.match(result.generationErrors[0]?.message ?? "", /unexpected solver bridge failure/);
});
