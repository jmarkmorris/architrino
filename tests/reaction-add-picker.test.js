import test from "node:test";
import assert from "node:assert/strict";

import { getComposerReactionAddPickerCells } from "../src/runtime/ComposerReactionAddPickerRuntime.js";
import { buildReactionParticipantStructure } from "../src/runtime/ComposerReactionStructureBridgeRuntime.js";
import { resolveStructureDisplayLabel } from "../src/domain/structure/StructureDisplayLabel.js";

test("full noether-core picker cell is labeled Pro Noether Core", () => {
  const triBinaryCell = getComposerReactionAddPickerCells().find((cell) => cell.id === "tri_binary");

  assert.ok(triBinaryCell);
  assert.equal(triBinaryCell.templateId, "noether_core");
  assert.equal(triBinaryCell.label, "Pro Noether Core");
});

test("reaction add picker no longer exposes gluon", () => {
  const pickerCells = getComposerReactionAddPickerCells();

  assert.equal(
    pickerCells.some((cell) => String(cell.templateId ?? "").trim().toLowerCase() === "gluon"),
    false
  );
});

test("reaction add picker uses full quark labels", () => {
  const pickerCells = getComposerReactionAddPickerCells();
  const downCell = pickerCells.find((cell) => cell.id === "down");
  const upCell = pickerCells.find((cell) => cell.id === "up");

  assert.ok(downCell);
  assert.ok(upCell);
  assert.equal(downCell.label, "Down Quark");
  assert.equal(upCell.label, "Up Quark");
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

  assert.equal(resolveStructureDisplayLabel(downQuark), "Down Quark");
  assert.equal(resolveStructureDisplayLabel(upQuark), "Up Quark");
});
