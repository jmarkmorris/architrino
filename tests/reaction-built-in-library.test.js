import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryManifest,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";

async function readJsonFromRepo(relativePath) {
  return JSON.parse(await fs.readFile(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("reaction built-in library manifest is request-only and defaults to free neutron beta decay", async () => {
  const manifest = await loadReactionBuiltInLibraryManifest({
    manifest: await readJsonFromRepo("content/contracts/examples/reaction-library/manifest.v1.json"),
  });

  assert.equal(manifest.defaultEntryId, "free_neutron_beta_decay");
  assert.equal(manifest.entries[0]?.id, "free_neutron_beta_decay");
  assert.equal(
    manifest.entries.every(
      (entry) => typeof entry.sourceRequestPath === "string" && entry.sourceRequestPath.startsWith("content/")
    ),
    true
  );
  assert.equal(manifest.entries.some((entry) => "documentPath" in entry), false);
});

test("reaction built-in library requires a solveRequest bridge", async () => {
  await assert.rejects(
    () =>
      loadDefaultReactionBuiltInLibraryEntry({
        manifest: {
          schema: "reaction-built-in-library-manifest/v1",
          defaultEntryId: "associate_photon",
          entries: [
            {
              id: "associate_photon",
              title: "Associate photon",
              sourceRequestPath: "content/contracts/examples/solver-request/associate_photon.v1.json",
              isDefault: true,
            },
          ],
        },
        fetchImpl: async () => ({
          ok: true,
          async json() {
            return readJsonFromRepo("content/contracts/examples/solver-request/associate_photon.v1.json");
          },
        }),
      }),
    /requires solveRequest\(\)/i
  );
});

test("reaction built-in library solves a selected entry from its source request path", async () => {
  const requestFixture = await readJsonFromRepo(
    "content/contracts/examples/solver-request/associate_photon.v1.json"
  );
  const resultFixture = await readJsonFromRepo(
    "content/contracts/examples/solver-result/associate_photon_result.v1.json"
  );
  const seenRequestIds = [];

  const loaded = await loadReactionBuiltInLibraryEntry("associate_photon", {
    manifest: {
      schema: "reaction-built-in-library-manifest/v1",
      defaultEntryId: "associate_photon",
      entries: [
        {
          id: "associate_photon",
          requestId: "associate_photon",
          title: "Associate photon",
          displayTitle: "Associate photon",
          description: "Solve-backed fixture.",
          sourceRequestPath: "content/contracts/examples/solver-request/associate_photon.v1.json",
          isDefault: true,
          solveExact: true,
        },
      ],
    },
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return requestFixture;
      },
    }),
    solveRequest: async (request) => {
      seenRequestIds.push(request?.requestId);
      return {
        request,
        result: resultFixture,
      };
    },
  });

  assert.deepEqual(seenRequestIds, ["associate_photon"]);
  assert.equal(loaded.entry.id, "associate_photon");
  assert.equal(loaded.request.requestId, "associate_photon");
  assert.equal(loaded.solution.result.summary.exact, true);
  assert.equal(loaded.snapshot.participants.length > 0, true);
  assert.equal(loaded.snapshot.mappings.length > 0, true);
  assert.deepEqual(loaded.exportOverrides.sourceDocumentIds, ["associate_photon_fixture"]);
});

test("reaction built-in library resolves request paths from the page origin", async () => {
  const previousDocument = globalThis.document;
  const requestFixture = await readJsonFromRepo(
    "content/contracts/examples/solver-request/associate_photon.v1.json"
  );
  const resultFixture = await readJsonFromRepo(
    "content/contracts/examples/solver-result/associate_photon_result.v1.json"
  );
  let fetchedUrl = "";
  globalThis.document = {
    baseURI: "http://localhost:5173/reaction.html",
  };

  try {
    const loaded = await loadDefaultReactionBuiltInLibraryEntry({
      manifest: {
        schema: "reaction-built-in-library-manifest/v1",
        defaultEntryId: "associate_photon",
        entries: [
          {
            id: "associate_photon",
            requestId: "associate_photon",
            title: "Associate photon",
            displayTitle: "Associate photon",
            description: "Browser path fixture.",
            sourceRequestPath: "content/contracts/examples/solver-request/associate_photon.v1.json",
            isDefault: true,
            solveExact: true,
          },
        ],
      },
      fetchImpl: async (url) => {
        fetchedUrl = String(url);
        return {
          ok: true,
          async json() {
            return requestFixture;
          },
        };
      },
      solveRequest: async (request) => ({
        request,
        result: resultFixture,
      }),
    });

    assert.equal(
      fetchedUrl,
      "http://localhost:5173/content/contracts/examples/solver-request/associate_photon.v1.json"
    );
    assert.equal(loaded.entry.id, "associate_photon");
    assert.equal(loaded.request.schema, "solver-request/v1");
  } finally {
    globalThis.document = previousDocument;
  }
});
