import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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
    "19px"
  );
  assert.equal(
    getReactionSideSlotHeaderProfile(simpleParticipants, "reactant").offset,
    "19px"
  );
});

test("side slot headers align from the track-side edge, not the outer participant edge", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-side-slot-header\.is-reactant\s*\{[\s\S]*?justify-self:\s*end;[\s\S]*?margin-right:\s*var\(--solver-slot-header-offset,\s*0px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-side-slot-header\.is-product\s*\{[\s\S]*?justify-self:\s*start;[\s\S]*?margin-left:\s*var\(--solver-slot-header-offset,\s*0px\);/
  );
});

test("composite assembly rows use the standard tile gap between the title tile and binary track", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-row-body\s*\{[\s\S]*?gap:\s*var\(--solver-tile-gap\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-inline-track-body,\s*[\s\S]*?\.composer-reaction-solver-composite-row-track-body\s*\{[\s\S]*?gap:\s*var\(--solver-attachment-gap\);/
  );
});

test("operator tiles expose an open-ledger shell state", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-operator\.is-ledger-open\s+\.composer-reaction-solver-particle\s*\{/
  );
});

test("binary choice tiles use a shared border-box sizing model", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-binary-choice\s*\{[\s\S]*?box-sizing:\s*border-box;/
  );
});

test("solver particle tiles are locked to a single shared size", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-particle\s*\{[\s\S]*?width:\s*var\(--binary-choice-size,\s*72px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-particle\s*\{[\s\S]*?max-width:\s*var\(--binary-choice-size,\s*72px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-particle\s*\{[\s\S]*?min-height:\s*var\(--binary-choice-size,\s*72px\);/
  );
});

test("composite participants collapse the outer gap into a single connector lane", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-composite-participant\s*\{[\s\S]*?gap:\s*var\(--solver-composite-participant-gap,\s*0px\);/
  );
});

test("composite participant connector rails are removed from the row flow", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-visual-rail\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?z-index:\s*2;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?z-index:\s*2;/
  );
  assert.doesNotMatch(
    styleSheet,
    /\.composer-reaction-solver-composite-visual-rail::after\s*\{/
  );
});

test("composite collector uses the shared centered connector inset", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-visual-rail\.is-reactant\s+\.composer-reaction-solver-composite-collector\s*\{[\s\S]*?left:\s*calc\(100%\s*\+\s*var\(--solver-composite-node-inset\)\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-higgs-cluster-grid\.is-reactant\s*>\s*\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?right:\s*calc\(100%\s*\+\s*var\(--solver-composite-node-inset\)\);/
  );
});

test("composite collector and span rail use the same connector dot type", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /composer-reaction-solver-composite-collector composer-reaction-solver-composite-connector-dot/
  );
  assert.match(
    runtimeSource,
    /composer-reaction-solver-composite-span-node composer-reaction-solver-composite-connector-dot/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-connector-dot,\s*\.composer-reaction-solver-composite-span-node\s*\{/
  );
});

test("template picker grid uses the shared canvas tile gap", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-menu\[data-menu-mode="template-grid-picker"\]\s*\{[\s\S]*?gap:\s*var\(--solver-tile-gap,\s*7px\);/
  );
});

test("composite span stem uses the shared centered connector lane geometry", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-stem\s*\{[\s\S]*?left:\s*calc\(var\(--solver-composite-node-inset,\s*0\.5px\)\s*\+\s*var\(--solver-composite-node-center,\s*3px\)\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?width:\s*var\(--solver-composite-connector-lane\);/
  );
});

test("composite connector path uses a direct line segment", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /path\.setAttribute\("d",\s*`M \$\{startX\} \$\{startY\} L \$\{endX\} \$\{endY\}`\);/
  );
});

test("composite and standalone track rows share the same inline track-body helper", () => {
  const runtimeSource = readFileSync(
    new URL("../src/runtime/ComposerReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /createInlineTrackBody\(participant,\s*node,\s*nodeKey,\s*tiles,\s*\{[\s\S]*?composer-reaction-solver-noether-core-grid-body/
  );
  assert.match(
    runtimeSource,
    /createInlineTrackBody\(participant,\s*rowNode,\s*rowNodeKey,\s*track,\s*\{[\s\S]*?composer-reaction-solver-composite-row-track-body/
  );
});
