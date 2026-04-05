import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

import {
  DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID,
  REACTION_BUILTIN_LIBRARY_ENTRIES,
  loadDefaultReactionBuiltInLibraryEntry,
  loadReactionBuiltInLibraryEntry,
} from "../src/apps/reaction/ReactionBuiltInLibraryRuntime.js";

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

test("reaction built-in library seeds free neutron beta as the default entry", async () => {
  const fixture = await readJson(
    new URL("../content/contracts/examples/reaction-flow/free_neutron_beta.v1.json", import.meta.url)
  );
  const loaded = await loadDefaultReactionBuiltInLibraryEntry({
    fetchImpl: createFixtureFetch(),
  });

  assert.equal(DEFAULT_REACTION_BUILTIN_LIBRARY_ENTRY_ID, "free_neutron_beta");
  assert.equal(REACTION_BUILTIN_LIBRARY_ENTRIES[0]?.id, "free_neutron_beta");
  assert.equal(loaded.entry.id, "free_neutron_beta");
  assert.equal(loaded.entry.title, "Free neutron beta decay");
  assert.equal(loaded.document.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.reactionId, fixture.reactionId);
  assert.equal(loaded.exportOverrides.title, fixture.title);
  assert.deepEqual(loaded.exportOverrides.sourceDocumentIds, fixture.provenance.sourceDocumentIds);
  assert.deepEqual(loaded.exportOverrides.semanticTags, fixture.hints.semanticTags);
  assert.equal(loaded.exportOverrides.suggestedSceneId, fixture.hints.suggestedSceneId);
  assert.equal(
    loaded.snapshot.participants.find((participant) => participant.id === "reactant_neutron")?.label,
    "Pro Neutron"
  );
  assert.equal(
    loaded.snapshot.participants.find((participant) => participant.id === "product_proton")?.label,
    "Pro Proton"
  );
  assert.equal(
    loaded.snapshot.participants.find((participant) => participant.id === "product_electron")?.label,
    "Pro Electron"
  );
  assert.equal(
    loaded.snapshot.participants.find((participant) => participant.id === "product_antineutrino")?.label,
    "Anti Electron Neutrino"
  );
  assert.equal(loaded.snapshot.participants.length, 5);
  assert.equal(loaded.snapshot.mappings.length, 6);
  assert.deepEqual(
    loaded.snapshot.participants.find((participant) => participant.id === "op_transmute_1")
      ? {
          templateId: loaded.snapshot.participants.find((participant) => participant.id === "op_transmute_1")
            ?.templateId,
          label: loaded.snapshot.participants.find((participant) => participant.id === "op_transmute_1")
            ?.label,
          operatorLaneIndex: loaded.snapshot.participants.find(
            (participant) => participant.id === "op_transmute_1"
          )?.operatorLaneIndex,
        }
      : null,
    {
      templateId: "dissociate",
      label: "Dissociate",
      operatorLaneIndex: 0,
    }
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_antineutrino" && participant.templateId === "neutrino"
    ),
    true
  );
  assert.equal(
    loaded.snapshot.participants.some(
      (participant) => participant.id === "product_antineutrino" && participant.polarity === "anti"
    ),
    true
  );
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
    ["free_neutron_beta", "muon_decay", "charged_pion_to_muon_neutrino"]
  );

  const loadedMuon = await loadReactionBuiltInLibraryEntry("muon_decay", { fetchImpl });
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
});
