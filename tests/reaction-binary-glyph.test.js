import test from "node:test";
import assert from "node:assert/strict";

import { getBinaryGlyphPoleCharges } from "../src/runtime/ComposerReactionBinaryGlyphRuntime.js";

const STRUCTURE_CHARGE_TYPES = {
  ELECTRINO: "electrino",
  POSITRINO: "positrino",
};

test("pro binary glyph polarity places electrino on the left and positrino on the right", () => {
  assert.deepEqual(getBinaryGlyphPoleCharges(STRUCTURE_CHARGE_TYPES, "pro"), {
    leftCharge: "electrino",
    rightCharge: "positrino",
  });
});

test("anti binary glyph polarity swaps the left and right charges", () => {
  assert.deepEqual(getBinaryGlyphPoleCharges(STRUCTURE_CHARGE_TYPES, "anti"), {
    leftCharge: "positrino",
    rightCharge: "electrino",
  });
});
