import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  getReactionSideSlotHeaderProfile,
  getReactionParticipantCardSectionOrder,
  getRenderedSlotCodesForSide,
} from "../src/apps/reaction/ReactionParticipantRenderRuntime.js";
import { getReactionParticleTileLabelLines } from "../src/apps/reaction/ReactionParticleTileRuntime.js";

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
  const centerParticipants = [{
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
  assert.equal(
    getReactionSideSlotHeaderProfile(centerParticipants, "center").offset,
    "39.5px"
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

test("pion canvas cards use the same three-line text format as picker tiles", () => {
  assert.deepEqual(
    getReactionParticleTileLabelLines("Negative Pion", { templateId: "pi_minus" }),
    ["Negative", "Pion", "d !u"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Positive Pion", { templateId: "pi_plus" }),
    ["Positive", "Pion", "u !d"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Neutral Pion (u anti-u)", { templateId: "upi0" }),
    ["Neutral", "Pion", "u !u"]
  );
});

test("kaon canvas cards use the same three-line text format as picker tiles", () => {
  assert.deepEqual(
    getReactionParticleTileLabelLines("Negative Kaon", { templateId: "k_minus" }),
    ["Negative", "Kaon", "s !u"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Neutral Kaon (d anti-s)", { templateId: "k0" }),
    ["Neutral", "Kaon", "d !s"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Neutral Kaon (s anti-d)", { templateId: "anti_k0" }),
    ["Neutral", "Kaon", "s !d"]
  );
});

test("b meson canvas cards use the same three-line text format as picker tiles", () => {
  assert.deepEqual(
    getReactionParticleTileLabelLines("Negative B Meson", { templateId: "b_minus" }),
    ["Negative", "B Meson", "b !u"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Neutral B Meson (d anti-b)", { templateId: "b0" }),
    ["Neutral", "B Meson", "d !b"]
  );
  assert.deepEqual(
    getReactionParticleTileLabelLines("Neutral B Meson (b anti-d)", { templateId: "anti_b0" }),
    ["Neutral", "B Meson", "b !d"]
  );
});

test("shared particle tile label helper preserves picker-only baryon preview text", () => {
  assert.deepEqual(
    getReactionParticleTileLabelLines("Pro Proton", { templateId: "proton" }, {
      includeCompositePreviewLines: true,
    }),
    ["Pro", "Proton", "u d u"]
  );
});

test("picker and canvas use the shared particle tile helper module", () => {
  const solverUiRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  const participantRenderRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(solverUiRuntimeSource, /createReactionParticleTileElement/);
  assert.match(solverUiRuntimeSource, /getReactionParticleTileLabelLines/);
  assert.match(participantRenderRuntimeSource, /createReactionParticleTileElement/);
});

test("composite quark row cards preserve explicit row labels instead of falling back to generic quark defaults", () => {
  const participantRenderRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    participantRenderRuntimeSource,
    /const explicitRowLabel = String\(rowNode\?\.label \?\? ""\)\.trim\(\);\s*const baseLabel = explicitRowLabel \|\| getDefaultParticipantBaseLabel\(templateId, rowNode\?\.label\);/
  );
});

test("center assembly column group uses the shared surface grid column and centered participant alignment", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-column\.is-center-assemblies\s*\{[\s\S]*?grid-column:\s*var\(--solver-center-assemblies-grid-column,\s*7 \/ span 4\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-column\s*\{[\s\S]*?grid-template-rows:\s*auto;[\s\S]*?grid-auto-rows:\s*var\(--binary-choice-size,\s*72px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-column\.is-center-assemblies\s*>\s*\.composer-reaction-solver-participant\s*\{[\s\S]*?justify-self:\s*center;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-side-slot-header\.is-center\s*\{[\s\S]*?justify-self:\s*center;[\s\S]*?margin-left:\s*var\(--solver-slot-header-offset,\s*0px\);/
  );
});

test("center assembly column group reserves the same slot-header row as the side columns", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /if \(centerAssemblyParticipants\.length\) \{\s*centerAssembliesColumn\.appendChild\(\s*createSideSlotHeader\(centerAssemblyParticipants,\s*"center"\)\s*\);\s*\}/
  );
  assert.match(
    runtimeSource,
    /card\.style\.gridRow = `\$\{getParticipantSurfaceRowIndex\(participant\) \+ 2\} \/ span \$\{getParticipantSurfaceRowSpan\(participant\)\}`;/
  );
});

test("center bosons expose a left-side input attachment frame", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const solverRuntimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /function createCenterAssemblyInputFrame\(/
  );
  assert.match(
    runtimeSource,
    /anchorRole:\s*"operator-input"/
  );
  assert.match(
    runtimeSource,
    /"is-center-assembly-input"/
  );
  assert.match(
    runtimeSource,
    /isCenterAssemblyParticipant\(participant\)\s*\?\s*createCenterAssemblyInputFrame\(\s*[\s\S]*?content,\s*\}\)\s*:\s*content/
  );
  assert.match(solverRuntimeSource, /isCenterAssemblyParticipant,/);
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-center-assembly-frame\s*>\s*\.composer-reaction-solver-anchor\.is-center-assembly-input\s*\{[\s\S]*?left:\s*calc\(var\(--solver-anchor-size,\s*16px\)\s*\*\s*-1\);[\s\S]*?top:\s*50%;/
  );
});

test("disabled noether-core tiles keep their static tile styling instead of dark disabled chrome", () => {
  const cssSource = readFileSync(
    new URL("../style.css", import.meta.url),
    "utf8"
  );
  assert.match(
    cssSource,
    /\.composer-reaction-solver-anchor\.composer-reaction-solver-noether-core-grid-tile:disabled\s*\{[\s\S]*?opacity:\s*1;[\s\S]*?background:\s*rgba\(12,\s*16,\s*30,\s*0\.9\);[\s\S]*?box-shadow:\s*[\s\S]*?0 0 0 1px rgba\(255,\s*255,\s*255,\s*0\.02\);/
  );
  assert.match(
    cssSource,
    /\.composer-reaction-solver-anchor\.composer-reaction-solver-noether-core-grid-tile\.is-mapped:disabled\s*\{[\s\S]*?background:\s*color-mix\(in srgb,\s*rgba\(24,\s*92,\s*64,\s*0\.32\)\s*18%,\s*rgba\(12,\s*16,\s*30,\s*0\.94\)\);/
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
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-higgs-cluster-grid-rows\s*\{[\s\S]*?gap:\s*var\(--solver-stack-gap,\s*10px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?gap:\s*var\(--solver-stack-gap,\s*10px\);/
  );
});

test("side anchors use the shared attachment offset so connectors abut tile edges", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-tree-row\.is-reactant\s*>\s*\.composer-reaction-solver-anchor\s*\{[\s\S]*?left:\s*calc\(var\(--solver-anchor-attachment-offset,\s*3px\)\s*\*\s*-1\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-tree-row\.is-product\s*>\s*\.composer-reaction-solver-anchor\s*\{[\s\S]*?left:\s*var\(--solver-anchor-attachment-offset,\s*3px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-inline-anchor-slot\.is-reactant\s*>\s*\.composer-reaction-solver-anchor\s*\{[\s\S]*?left:\s*calc\(var\(--solver-anchor-attachment-offset,\s*3px\)\s*\*\s*-1\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-inline-anchor-slot\.is-product\s*>\s*\.composer-reaction-solver-anchor\s*\{[\s\S]*?left:\s*var\(--solver-anchor-attachment-offset,\s*3px\);/
  );
});

test("Z boson uses the standard tri-binary grid renderer instead of a custom center-column fallback", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const descriptorSource = readFileSync(
    new URL("../src/apps/reaction/ReactionStructureDescriptorRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(descriptorSource, /templateId:\s*"z_boson"/);
  assert.match(descriptorSource, /label:\s*String\(structureRoot\?\.label \?\? "Z Boson"\)/);
  assert.doesNotMatch(runtimeSource, /createChargeAssemblyGridContent/);
});

test("free architrinos reuse the grid layout but render personality-only tiles with no binary orbit or axis", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const descriptorSource = readFileSync(
    new URL("../src/apps/reaction/ReactionStructureDescriptorRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(descriptorSource, /templateId:\s*"free_architrinos"/);
  assert.match(runtimeSource, /function createFreeArchitrinosGridTrack\(/);
  assert.match(
    runtimeSource,
    /String\(node\?\.templateId \?\? participant\?\.templateId \?\? ""\)\.trim\(\)\.toLowerCase\(\) === "free_architrinos"/
  );
  assert.match(
    runtimeSource,
    /createBinaryGlyph\(selectedChoice,\s*\{[\s\S]*?showBinary:\s*false,/s
  );
});

test("free architrinos root exposes multiple reactant output anchors and uses the compact centered label style", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /participant\?\.side === "reactant"[\s\S]*?participant\?\.templateId === "free_architrinos"[\s\S]*?\[0,\s*1,\s*2\]\.forEach\(\(anchorInstanceIndex\) =>/
  );
  assert.match(
    runtimeSource,
    /anchorRole:\s*"reactant",[\s\S]*?anchorInstanceIndex/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-particle\.is-free-architrinos\s+\.composer-reaction-solver-particle-label\s*\{[\s\S]*?font-size:\s*10px;[\s\S]*?text-align:\s*center;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-tree-row\.is-reactant\s*>\s*\.composer-reaction-solver-anchor-set\s*\{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*4px;/
  );
});

test("operator tiles expose an open-ledger state", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-operator\.is-ledger-open\s+\.composer-reaction-solver-particle\s*\{/
  );
});

test("operator tiles use explicit lane and row center positioning from the shared surface geometry", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /card\.style\.left = getOperatorCardLeft\(participant\.operatorLaneIndex\);/
  );
  assert.match(
    runtimeSource,
    /card\.style\.top = getOperatorCardTop\(participant\.operatorSlotIndex\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-operator\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?transform:\s*translate\(-50%,\s*-50%\);/
  );
});

test("reactant and product participants also render on explicit surface grid rows", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /reactantParticipants\.forEach\(\(participant\) => \{\s*const card = renderParticipantCard\(participant\);\s*card\.style\.gridRow = `\$\{getParticipantSurfaceRowIndex\(participant\) \+ 2\} \/ span \$\{getParticipantSurfaceRowSpan\(participant\)\}`;/
  );
  assert.match(
    runtimeSource,
    /productParticipants\.forEach\(\(participant\) => \{\s*const card = renderParticipantCard\(participant\);\s*card\.style\.gridRow = `\$\{getParticipantSurfaceRowIndex\(participant\) \+ 2\} \/ span \$\{getParticipantSurfaceRowSpan\(participant\)\}`;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-column\s*\{[\s\S]*?grid-template-rows:\s*auto;[\s\S]*?grid-auto-rows:\s*var\(--binary-choice-size,\s*72px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant:not\(\.is-operator\)\s*\{[\s\S]*?align-self:\s*start;/
  );
});

test("surface add controls remain pinned to the top overlay above the operator grid", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-surface-add-controls\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?inset:\s*0 0 auto 0;/
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

test("composite participants collapse the outer gap into a single connector span", () => {
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

test("composite title rail side anchoring survives the nested participant-content wrapper", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /content\.className = "composer-reaction-solver-participant-content";/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-composite-participant\s+\.composer-reaction-solver-composite-visual-rail\.is-reactant\s*\{[\s\S]*?right:\s*calc\(100%\s*\+\s*var\(--solver-tile-gap,\s*7px\)\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-composite-participant\s+\.composer-reaction-solver-composite-visual-rail\.is-product\s*\{[\s\S]*?left:\s*calc\(100%\s*\+\s*var\(--solver-tile-gap,\s*7px\)\);/
  );
});

test("dissociated composites keep the title tile and render it with a dotted border", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /if \(participant\?\.isDissociatedComposite \|\| participant\?\.isAutoDissociatedComposite\) \{\s*card\.classList\.add\("is-dissociated-composite"\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-participant\.is-composite-participant\.is-dissociated-composite[\s\S]*?\.composer-reaction-solver-composite-visual-rail[\s\S]*?\.composer-reaction-solver-particle\s*\{[\s\S]*?border-style:\s*dotted;/
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
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
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

test("composite span stem uses the shared centered connector span geometry", () => {
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-stem\s*\{[\s\S]*?left:\s*calc\(var\(--solver-composite-node-inset,\s*0\.5px\)\s*\+\s*var\(--solver-composite-node-center,\s*3px\)\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-composite-span-rail\s*\{[\s\S]*?width:\s*var\(--solver-composite-connector-span\);/
  );
});

test("composite connector path uses a direct line segment", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionSolverUiRuntime.js", import.meta.url),
    "utf8"
  );
  assert.match(
    runtimeSource,
    /path\.setAttribute\("d",\s*`M \$\{startX\} \$\{startY\} L \$\{endX\} \$\{endY\}`\);/
  );
});

test("composite and standalone track rows share the same inline track-body helper", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
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

test("branch operators use single centered input and output attachments", () => {
  const runtimeSource = readFileSync(
    new URL("../src/apps/reaction/ReactionParticipantRenderRuntime.js", import.meta.url),
    "utf8"
  );
  const styleSheet = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(
    runtimeSource,
    /participant\.templateId === "associate" \|\| participant\.templateId === "dissociate"/
  );
  assert.match(
    runtimeSource,
    /composer-reaction-solver-branch-anchor-frame/
  );
  assert.match(
    runtimeSource,
    /"is-branch-left-attachment"/
  );
  assert.match(
    runtimeSource,
    /"is-branch-right-attachment"/
  );
  assert.match(
    runtimeSource,
    /"is-dissociate-input"/
  );
  assert.match(
    runtimeSource,
    /"is-dissociate-output"/
  );
  assert.doesNotMatch(
    runtimeSource,
    /"is-dissociate-output",[\s\S]*?"is-top"|\"is-dissociate-output\",[\s\S]*?\"is-bottom"/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-branch-anchor-frame\s*>\s*\.composer-reaction-solver-anchor\.is-branch-left-attachment,\s*[\s\S]*?left:\s*var\(--solver-anchor-center-offset,\s*8px\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-branch-anchor-frame\s*>\s*\.composer-reaction-solver-anchor\.is-branch-right-attachment,\s*[\s\S]*?left:\s*calc\(100%\s*-\s*var\(--solver-anchor-center-offset,\s*8px\)\);/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-branch-anchor-frame\s*>\s*\.composer-reaction-solver-anchor\.is-associate-input,\s*[\s\S]*?top:\s*50%;/
  );
  assert.match(
    styleSheet,
    /\.composer-reaction-solver-branch-anchor-frame\.is-dissociate\s*>\s*\.composer-reaction-solver-anchor\.is-dissociate-output,\s*[\s\S]*?top:\s*50%;/
  );
});
