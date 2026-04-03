import test from "node:test";
import assert from "node:assert/strict";

import { getReactionAddPickerCells } from "../src/apps/reaction/ReactionAddPickerRuntime.js";
import { buildReactionParticipantStructure } from "../src/apps/reaction/ReactionStructureBridgeRuntime.js";
import { resolveStructureDisplayLabel } from "../src/domain/structure/StructureDisplayLabel.js";

test("full noether-core picker cell is labeled Pro Noether Core", () => {
  const triBinaryCell = getReactionAddPickerCells().find((cell) => cell.id === "tri_binary");

  assert.ok(triBinaryCell);
  assert.equal(triBinaryCell.templateId, "noether_core");
  assert.equal(triBinaryCell.label, "Pro Noether Core");
});

test("reaction add picker no longer exposes gluon", () => {
  const pickerCells = getReactionAddPickerCells();

  assert.equal(
    pickerCells.some((cell) => String(cell.templateId ?? "").trim().toLowerCase() === "gluon"),
    false
  );
});

test("reaction add picker uses full quark labels", () => {
  const pickerCells = getReactionAddPickerCells();
  const downCell = pickerCells.find((cell) => cell.id === "down");
  const upCell = pickerCells.find((cell) => cell.id === "up");

  assert.ok(downCell);
  assert.ok(upCell);
  assert.equal(downCell.label, "Pro Down Quark");
  assert.equal(upCell.label, "Pro Up Quark");
});

test("reaction add picker prefixes pro labels for reduced binary cores and baryons", () => {
  const pickerCells = getReactionAddPickerCells();
  const uniBinaryCell = pickerCells.find((cell) => cell.id === "uni_binary");
  const biBinaryCell = pickerCells.find((cell) => cell.id === "bi_binary");
  const protonCell = pickerCells.find((cell) => cell.id === "proton");
  const neutronCell = pickerCells.find((cell) => cell.id === "neutron");

  assert.ok(uniBinaryCell);
  assert.ok(biBinaryCell);
  assert.ok(protonCell);
  assert.ok(neutronCell);
  assert.equal(uniBinaryCell.label, "Pro Uni Binary");
  assert.equal(biBinaryCell.label, "Pro Bi Binary");
  assert.equal(protonCell.label, "Pro Proton");
  assert.equal(neutronCell.label, "Pro Neutron");
});

test("reaction add picker exposes kaons on the row directly below the pions", () => {
  const pickerCells = getReactionAddPickerCells();
  const kMinusCell = pickerCells.find((cell) => cell.id === "k_minus");
  const kPlusCell = pickerCells.find((cell) => cell.id === "k_plus");
  const antiK0Cell = pickerCells.find((cell) => cell.id === "sk0");
  const k0Cell = pickerCells.find((cell) => cell.id === "dk0");

  assert.ok(kMinusCell);
  assert.ok(kPlusCell);
  assert.ok(antiK0Cell);
  assert.ok(k0Cell);
  assert.deepEqual(
    [kMinusCell?.label, kPlusCell?.label, antiK0Cell?.label, k0Cell?.label],
    [
      "Negative Kaon",
      "Positive Kaon",
      "Neutral Kaon (s anti-d)",
      "Neutral Kaon (d anti-s)",
    ]
  );
});

test("reaction add picker exposes b mesons on the row directly below the kaons", () => {
  const pickerCells = getReactionAddPickerCells();
  const bMinusCell = pickerCells.find((cell) => cell.id === "b_minus");
  const bPlusCell = pickerCells.find((cell) => cell.id === "b_plus");
  const bB0Cell = pickerCells.find((cell) => cell.id === "bB0");
  const dB0Cell = pickerCells.find((cell) => cell.id === "dB0");

  assert.ok(bMinusCell);
  assert.ok(bPlusCell);
  assert.ok(bB0Cell);
  assert.ok(dB0Cell);
  assert.deepEqual(
    [bMinusCell?.label, bPlusCell?.label, bB0Cell?.label, dB0Cell?.label],
    [
      "Negative B Meson",
      "Positive B Meson",
      "Neutral B Meson (b anti-d)",
      "Neutral B Meson (d anti-b)",
    ]
  );
});

test("full pro and anti noether cores resolve as Noether-core labels instead of Tri Binary", () => {
  const proCore = buildReactionParticipantStructure("noether_core", {
    id: "pro_core",
    polarity: "pro",
  }).root;
  const antiCore = buildReactionParticipantStructure("noether_core", {
    id: "anti_core",
    polarity: "anti",
  }).root;

  assert.equal(resolveStructureDisplayLabel(proCore), "Pro Noether Core");
  assert.equal(resolveStructureDisplayLabel(antiCore), "Anti Noether Core");
});

test("structure display labels keep full quark names", () => {
  const downQuark = buildReactionParticipantStructure("down_quark", {
    id: "down_quark_pro",
    polarity: "pro",
  }).root;
  const upQuark = buildReactionParticipantStructure("up_quark", {
    id: "up_quark_pro",
    polarity: "pro",
  }).root;

  assert.equal(resolveStructureDisplayLabel(downQuark), "Pro Down Quark");
  assert.equal(resolveStructureDisplayLabel(upQuark), "Pro Up Quark");
});

test("structure display labels prefix pro for baryons and reduced binary cores", () => {
  const proton = buildReactionParticipantStructure("proton", {
    id: "proton_pro",
  }).root;
  const neutron = buildReactionParticipantStructure("neutron", {
    id: "neutron_pro",
  }).root;
  const uniBinaryCore = buildReactionParticipantStructure("noether_core", {
    id: "uni_binary_pro",
    polarity: "pro",
    occupiedSlots: ["inner"],
  }).root;

  assert.equal(resolveStructureDisplayLabel(proton), "Pro Proton");
  assert.equal(resolveStructureDisplayLabel(neutron), "Pro Neutron");
  assert.equal(resolveStructureDisplayLabel(uniBinaryCore), "Pro Uni Binary");
});
