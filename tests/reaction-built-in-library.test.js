import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID,
  REACTION_BUILTIN_LIBRARY_ENTRIES,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryEntry,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";
import { parseReactionNodeKey } from "../src/apps/reaction/ReactionNodeKeyRuntime.js";

async function readJson(url) {
  return JSON.parse(await fs.readFile(url, "utf8"));
}

function createFixtureFetch() {
  return async function fetchFixture(url) {
    const document = await readJson(url);
    return {
      ok: true,
      async json() {
        return document;
      },
    };
  };
}

function collectParticipantNodeIds(participant = {}) {
  const nodeIds = new Set();
  const queue = [...(Array.isArray(participant?.hierarchy) ? participant.hierarchy : [])];
  while (queue.length) {
    const node = queue.shift();
    if (!node || typeof node !== "object") {
      continue;
    }
    if (node.id) {
      nodeIds.add(node.id);
    }
    queue.push(...(Array.isArray(node.children) ? node.children : []));
  }
  return nodeIds;
}

test("reaction built-in library seeds muon decay as the default entry", async () => {
  const fixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
  );
  const loaded = await loadDefaultReactionBuiltInLibraryEntry({
    fetchImpl: createFixtureFetch(),
  });

  assert.equal(DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID, "muon_decay");
  assert.equal(REACTION_BUILTIN_LIBRARY_ENTRIES[0]?.id, "muon_decay");
  assert.equal(loaded.entry.id, "muon_decay");
  assert.equal(loaded.entry.title, "Muon decay");
  assert.equal(loaded.document.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.title, fixture.title);
  assert.deepEqual(loaded.exportOverrides.sourceDocumentIds, fixture.provenance.sourceDocumentIds);
  assert.deepEqual(loaded.exportOverrides.semanticTags, fixture.hints.semanticTags);
  assert.equal(loaded.exportOverrides.suggestedSceneId, fixture.hints.suggestedSceneId);
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_anti_electron_neutrino_2" && participant.templateId === "neutrino"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_pro_muon_neutrino_3" && participant.templateId === "neutrino"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "reactant_pro_muon_1"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_pro_electron_1" && participant.label === "Pro Electron"
    ),
    true
  );
  assert.equal(loaded.snapshot.participants.length >= 3, true);
  assert.equal(loaded.snapshot.mappings.length >= 2, true);
});

test("reaction built-in library now includes the first accepted PDG-backed solved entries", async () => {
  const muonFixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/muon_decay.v1.json", import.meta.url)
  );
  const pionFixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/charged_pion_to_muon_neutrino.v1.json", import.meta.url)
  );
  const fetchImpl = createFixtureFetch();

  assert.deepEqual(
    REACTION_BUILTIN_LIBRARY_ENTRIES.map((entry) => entry.id),
    ["muon_decay", "free_neutron_beta", "charged_pion_to_muon_neutrino"]
  );

  const loadedMuon = await loadReactionBuiltInLibraryEntry("muon_decay", { fetchImpl });
  const loadedNeutron = await loadReactionBuiltInLibraryEntry("free_neutron_beta", { fetchImpl });
  const loadedPion = await loadReactionBuiltInLibraryEntry("charged_pion_to_muon_neutrino", { fetchImpl });

  assert.equal(loadedMuon.entry.title, "Muon decay");
  assert.equal(loadedMuon.document.reactionId, muonFixture.reactionId);
  assert.equal(loadedMuon.document.review.status, "accepted");
  assert.deepEqual(loadedMuon.exportOverrides.sourceDocumentIds, muonFixture.provenance.sourceDocumentIds);
  assert.equal(loadedMuon.snapshot.participants.some((participant) => participant.id === "reactant_pro_muon_1"), true);

  assert.equal(loadedPion.entry.title, "Charged pion to muon neutrino");
  assert.equal(loadedPion.document.reactionId, pionFixture.reactionId);
  assert.equal(loadedPion.document.review.status, "accepted");
  assert.deepEqual(loadedPion.exportOverrides.sourceDocumentIds, pionFixture.provenance.sourceDocumentIds);
  assert.equal(
    loadedPion.snapshot.participants.some((participant) => participant.id === "reactant_positive_pion_1"),
    true
  );

  const participantNodeIdsById = new Map(
    loadedNeutron.snapshot.participants.map((participant) => [participant.id, collectParticipantNodeIds(participant)])
  );
  for (const mapping of loadedNeutron.snapshot.mappings) {
    const sourceKey = parseReactionNodeKey(mapping.sourceKey);
    const targetKey = parseReactionNodeKey(mapping.targetKey);
    assert.equal(participantNodeIdsById.get(sourceKey.participantId)?.has(sourceKey.nodeId) ?? false, true);
    assert.equal(participantNodeIdsById.get(targetKey.participantId)?.has(targetKey.nodeId) ?? false, true);
  }
});
