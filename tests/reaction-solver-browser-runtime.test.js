import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { createBrowserReactionSolveSnapshot, resolveReactionSolveEndpoint } from "../src/apps/reaction/ReactionSolverBrowserRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { buildReactionStructureDescriptorTree } from "../src/apps/reaction/ReactionStructureDescriptorRuntime.js";
import { createReactionBinarySelectionRuntime } from "../src/apps/reaction/ReactionBinarySelectionRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

const supportsParticipantPolarity = (templateId) =>
  new Set(["noether_core", "electron", "neutrino", "down_quark", "up_quark", "fermion_gen1"]).has(
    String(templateId ?? "").trim().toLowerCase()
  );
const normalizeParticipantPolarity = (polarity) =>
  String(polarity ?? "").trim().toLowerCase() === "anti" ? "anti" : "pro";
const { getInitialParticipantBinarySelections } = createReactionBinarySelectionRuntime({
  supportsParticipantPolarity,
  normalizeParticipantPolarity,
});

function createParticipant({ id, side, templateId, polarity = "pro", label = templateId }) {
  const structure = buildReactionParticipantStructure(templateId, {
    id: `${id}_structure`,
    label,
    polarity,
  });
  const participant = {
    id,
    side,
    templateId,
    polarity,
    baseLabel: label,
    label,
    structure: structure.root,
    hierarchy: buildReactionStructureDescriptorTree(structure.root),
    binarySelections: {},
  };
  participant.binarySelections = getInitialParticipantBinarySelections(participant);
  return participant;
}

test("browser reaction solver runtime resolves the local solve endpoint from the origin root", () => {
  assert.equal(
    resolveReactionSolveEndpoint({ location: { href: "http://127.0.0.1:5173/reaction.html" } }),
    "http://127.0.0.1:5173/api/reaction/solve"
  );
  assert.equal(
    resolveReactionSolveEndpoint({ location: { href: "http://localhost:5173/reaction.html" } }),
    "http://127.0.0.1:5173/api/reaction/solve"
  );
  assert.equal(
    resolveReactionSolveEndpoint({ location: { href: "http://127.0.0.1:5173/architrino/reaction.html" } }),
    "http://127.0.0.1:5173/api/reaction/solve"
  );
});

test("browser reaction solver runtime posts a request document and returns a contract response", async () => {
  const fixtureResult = readJson("content/contracts/examples/solver-result/associate_photon_result.v1.json");
  const seenRequests = [];
  const solveSnapshot = createBrowserReactionSolveSnapshot({
    windowLike: { location: { href: "http://127.0.0.1:5173/reaction.html" } },
    fetchImpl: async (url, options = {}) => {
      seenRequests.push({
        url,
        method: options.method,
        headers: options.headers,
        body: JSON.parse(options.body),
      });
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify(fixtureResult),
      };
    },
  });

  const solution = await solveSnapshot({
    participants: [
      createParticipant({
        id: "reactant_pro_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "pro",
        label: "Pro Noether core",
      }),
      createParticipant({
        id: "reactant_anti_core",
        side: "reactant",
        templateId: "noether_core",
        polarity: "anti",
        label: "Anti Noether core",
      }),
      createParticipant({
        id: "product_photon",
        side: "product",
        templateId: "photon",
        label: "Photon",
      }),
    ],
    mappings: [],
  });

  assert.equal(seenRequests.length, 1);
  assert.equal(seenRequests[0].url, "http://127.0.0.1:5173/api/reaction/solve");
  assert.equal(seenRequests[0].method, "POST");
  assert.equal(seenRequests[0].body.schema, "solver-request/v1");
  assert.equal(solution.result.summary.exact, true);
  assert.equal(solution.execution?.mode, "external");
  assert.equal(solution.execution?.target, "browser-http");
  assert.equal(solution.execution?.endpoint, "http://127.0.0.1:5173/api/reaction/solve");
  assert.equal(solution.planDescription, "1 associated product");
});

test("browser reaction solver runtime times out stalled solve requests", async () => {
  const solveSnapshot = createBrowserReactionSolveSnapshot({
    windowLike: { location: { href: "http://127.0.0.1:5173/reaction.html" } },
    timeoutMs: 5,
    fetchImpl: async (_url, options = {}) =>
      new Promise((_resolve, reject) => {
        options.signal?.addEventListener(
          "abort",
          () => {
            const error = new Error("Aborted");
            error.name = "AbortError";
            reject(error);
          },
          { once: true }
        );
      }),
  });

  await assert.rejects(
    () => solveSnapshot({ participants: [], mappings: [] }),
    /Reaction solve timed out/
  );
});

test("browser reaction solver runtime explains when a static server rejects POST solve requests", async () => {
  const solveSnapshot = createBrowserReactionSolveSnapshot({
    windowLike: { location: { href: "http://127.0.0.1:5173/reaction.html" } },
    fetchImpl: async () => ({
      ok: false,
      status: 501,
      text: async () =>
        "<!DOCTYPE HTML><html><head><title>Error response</title></head><body><p>Message: Unsupported method ('POST').</p></body></html>",
    }),
  });

  await assert.rejects(
    () => solveSnapshot({ participants: [], mappings: [] }),
    /Reaction solve bridge is unavailable at `\/api\/reaction\/solve`\./
  );
});
