import test from "node:test";
import assert from "node:assert/strict";

import { createReactionAnchorRenderRuntime } from "../src/apps/reaction/ReactionAnchorRenderRuntime.js";
import { createReactionBinaryGlyphRuntime } from "../src/apps/reaction/ReactionBinaryGlyphRuntime.js";
import { createReactionParticipantRenderRuntime } from "../src/apps/reaction/ReactionParticipantRenderRuntime.js";

test("reaction render runtimes expose the expected reaction-side render interfaces", () => {
  const anchorRenderRuntime = createReactionAnchorRenderRuntime();
  const binaryGlyphRuntime = createReactionBinaryGlyphRuntime();
  const participantRenderRuntime = createReactionParticipantRenderRuntime({
    buildNodeKey: (participantId, nodeId) => `${participantId}::${nodeId}`,
    createAnchorButton: () => ({ nodeType: "anchor" }),
    createBinaryGlyph: () => ({ nodeType: "glyph" }),
    createInlineAnchorSlot: () => ({ nodeType: "slot" }),
  });

  assert.equal(typeof anchorRenderRuntime.createAnchorButton, "function");
  assert.equal(typeof anchorRenderRuntime.createInlineAnchorSlot, "function");
  assert.equal(typeof binaryGlyphRuntime.createBinaryGlyph, "function");
  assert.equal(typeof participantRenderRuntime.renderParticipantCard, "function");
  assert.equal(typeof participantRenderRuntime.createOperatorParticipantCard, "function");
});
