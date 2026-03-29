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
    "79px"
  );
  assert.equal(
    getReactionSideSlotHeaderProfile(simpleParticipants, "reactant").offset,
    "79px"
  );
});

test("composite assembly rows use the standard tile gap between the title tile and binary track", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-row-body\s*\{[\s\S]*?gap:\s*var\(--solver-tile-gap\);/
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
    /\.composer-reaction-solver-composite-visual-rail\s*\{[\s\S]*?position:\s*absolute;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?position:\s*absolute;/
  );
});

test("template picker grid uses the shared canvas tile gap", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-menu\[data-menu-mode="template-grid-picker"\]\s*\{[\s\S]*?gap:\s*var\(--solver-tile-gap,\s*7px\);/
  );
});

test("composite span stem uses the shared snapped node center", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-stem\s*\{[\s\S]*?left:\s*var\(--solver-composite-node-center,\s*3px\);/
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
