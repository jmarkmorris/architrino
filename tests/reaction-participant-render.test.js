import test from "node:test";
import assert from "node:assert/strict";

import {
  getReactionSideSlotHeaderProfile,
  getReactionParticipantCardSectionOrder,
  getRenderedSlotCodesForSide,
} from "../src/runtime/ComposerReactionParticipantRenderRuntime.js";

test("render slot codes mirror on product side only", () => {
  assert.deepEqual(getRenderedSlotCodesForSide("reactant"), ["I", "M", "O"]);
  assert.deepEqual(getRenderedSlotCodesForSide("product"), ["O", "M", "I"]);
});

test("participant card section order keeps product participants hierarchy-first", () => {
  assert.deepEqual(
    getReactionParticipantCardSectionOrder({
      side: "product",
      isReactantComposite: false,
      isProductComposite: true,
    }),
    ["hierarchy", "visual"]
  );
  assert.deepEqual(
    getReactionParticipantCardSectionOrder({
      side: "reactant",
      isReactantComposite: true,
      isProductComposite: false,
    }),
    ["visual", "hierarchy"]
  );
  assert.deepEqual(
    getReactionParticipantCardSectionOrder({
      side: "reactant",
      isReactantComposite: false,
      isProductComposite: false,
    }),
    ["visual", "hierarchy"]
  );
});

test("side slot header profile derives offset from participant structure", () => {
  const compositeParticipants = [{
    side: "reactant",
    hierarchy: [{ renderMode: "assembly-cluster-grid" }],
  }];
  const simpleParticipants = [{
    side: "reactant",
    hierarchy: [{ renderMode: "binary-selector-grid" }],
  }];
  assert.deepEqual(getReactionSideSlotHeaderProfile([], "reactant").slotCodes, ["I", "M", "O"]);
  assert.equal(
    getReactionSideSlotHeaderProfile(compositeParticipants, "reactant").offset,
    "calc((var(--binary-choice-size) * 2) + (var(--solver-anchor-size) * 2) + var(--solver-tile-gap) + (var(--solver-attachment-gap) * 3))"
  );
  assert.equal(
    getReactionSideSlotHeaderProfile(simpleParticipants, "reactant").offset,
    "calc(var(--binary-choice-size) + var(--solver-tile-gap))"
  );
});
