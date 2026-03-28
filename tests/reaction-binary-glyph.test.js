import test from "node:test";
import assert from "node:assert/strict";

import {
  createComposerReactionBinaryGlyphRuntime,
  getBinaryGlyphPoleCharges,
} from "../src/runtime/ComposerReactionBinaryGlyphRuntime.js";

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

test("rotated bare binary glyph can hide the orbit ellipse and move poles into a polar orientation", () => {
  function createMockSvgElement(name) {
    return {
      name,
      attributes: new Map(),
      children: [],
      classNames: [],
      classList: {
        add: function (...names) {
          this.owner.classNames.push(...names);
        },
        owner: null,
      },
      setAttribute(key, value) {
        this.attributes.set(key, String(value));
      },
      appendChild(child) {
        this.children.push(child);
      },
    };
  }

  const runtime = createComposerReactionBinaryGlyphRuntime({
    createSvgElement: (name) => {
      const element = createMockSvgElement(name);
      element.classList.owner = element;
      return element;
    },
    structureChargeTypes: STRUCTURE_CHARGE_TYPES,
  });

  const glyph = runtime.createBinaryGlyph(null, {
    showPersonality: false,
    showOrbitEllipse: false,
    binaryRotationDegrees: 90,
  });

  const orbit = glyph.children.find((child) => child.name === "ellipse");
  const poles = glyph.children.filter((child) => child.name === "circle");

  assert.equal(orbit, undefined);
  assert.equal(poles.length, 2);
  assert.equal(poles[0].attributes.get("cx"), "60");
  assert.equal(poles[0].attributes.get("cy"), "22");
  assert.equal(poles[1].attributes.get("cx"), "60");
  assert.equal(poles[1].attributes.get("cy"), "98");
});
