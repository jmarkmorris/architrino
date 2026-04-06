import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  buildReactionSnapshotFromReactionFlowDocument,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryManifest,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";

async function readJson(url) {
  return JSON.parse(await fs.readFile(url, "utf8"));
}

const FIXTURE_LIBRARY_MANIFEST = Object.freeze({
  schema: "reaction-library-manifest/v1",
  defaultEntryId: "associate_photon",
  entries: Object.freeze([
    Object.freeze({
      id: "associate_photon",
      requestId: "associate_photon",
      title: "Associate photon",
      displayTitle: "Associate photon",
      requestPath: "../../../content/contracts/examples/solver-request/associate_photon.v1.json",
      isDefault: true,
    }),
    Object.freeze({
      id: "carry_through_neutron",
      requestId: "carry_through_neutron",
      title: "Carry through neutron",
      displayTitle: "Carry through neutron",
      requestPath: "../../../content/contracts/examples/solver-request/carry_through_neutron.v1.json",
    }),
  ]),
});

function createFixtureFetch() {
  return async function fetchFixture(url) {
    if (String(url).endsWith("content/contracts/examples/reaction-library/manifest.v1.json")) {
      return {
        ok: true,
        async json() {
          return FIXTURE_LIBRARY_MANIFEST;
        },
      };
    }
    const document = await readJson(url);
    return {
      ok: true,
      async json() {
        return document;
      },
    };
  };
}

test("reaction library manifest loads request entries and preserves the default id", async () => {
  const manifest = await loadReactionBuiltInLibraryManifest({
    fetchImpl: createFixtureFetch(),
  });

  assert.equal(manifest.defaultEntryId, "associate_photon");
  assert.deepEqual(
    manifest.entries.map((entry) => ({
      id: entry.id,
      requestPath: entry.requestPath,
    })),
    [
      {
        id: "associate_photon",
        requestPath: "../../../content/contracts/examples/solver-request/associate_photon.v1.json",
      },
      {
        id: "carry_through_neutron",
        requestPath: "../../../content/contracts/examples/solver-request/carry_through_neutron.v1.json",
      },
    ]
  );
});

test("reaction library entry loads a solver request, solves it, and returns a renderable snapshot", async () => {
  const solveCalls = [];
  const payload = await loadReactionBuiltInLibraryEntry("associate_photon", {
    fetchImpl: createFixtureFetch(),
    solveReactionRequest: async (request) => {
      solveCalls.push(request.requestId);
      return {
        request,
        result: await readJson(
          new URL("../content/contracts/examples/solver-result/associate_photon_result.v1.json", import.meta.url)
        ),
      };
    },
  });

  assert.deepEqual(solveCalls, ["associate_photon"]);
  assert.equal(payload.entry.id, "associate_photon");
  assert.equal(payload.request.requestId, "associate_photon");
  assert.equal(payload.snapshot.participants.some((participant) => participant.id === "associate:1"), true);
  assert.equal(payload.snapshot.participants.some((participant) => participant.id === "product_photon"), true);
  assert.equal(payload.exportOverrides.reviewInput?.requestId, "associate_photon");
});

test("reaction library default entry solves through the default manifest selection", async () => {
  const payload = await loadDefaultReactionBuiltInLibraryEntry({
    fetchImpl: createFixtureFetch(),
    solveReactionRequest: async (request) => ({
      request,
      result: await readJson(
        new URL("../content/contracts/examples/solver-result/associate_photon_result.v1.json", import.meta.url)
      ),
    }),
  });

  assert.equal(payload.entry.id, "associate_photon");
});

test("reaction flow documents can still be imported into reaction snapshots for migration paths", async () => {
  const document = await readJson(
    new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
  );
  const snapshot = buildReactionSnapshotFromReactionFlowDocument(document);

  assert.equal(Array.isArray(snapshot.participants), true);
  assert.equal(Array.isArray(snapshot.mappings), true);
  assert.equal(snapshot.participants.length > 0, true);
});
