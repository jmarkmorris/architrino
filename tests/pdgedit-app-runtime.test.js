import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPdgeditLinkRenderModels,
  compactPdgeditReactionParticipants,
  compactPdgeditReactionTitle,
  ensurePdgeditPickerChildElement,
  formatPdgeditBranchingProbability,
  getPdgeditDocumentPickerEntries,
  updateTextInputValuePreservingSelection,
} from "../src/apps/pdgedit/PdgeditAppRuntime.js";

function createAssembly({ id, x, y }) {
  return {
    id,
    kind: "assembly",
    x,
    y,
    title: id,
    role: "reactant",
    tiles: ["tile_a", "tile_b", "tile_c", "tile_d"],
  };
}

function createOperator({ id, x, y }) {
  return {
    id,
    kind: "operator",
    x,
    y,
    type: "associate",
    title: id,
    positrinoCount: 1,
    electrinoCount: 1,
  };
}

function createMockParentElement() {
  return {
    children: [],
    contains(child) {
      return this.children.includes(child);
    },
    append(child) {
      if (!this.children.includes(child)) {
        this.children.push(child);
      }
      child.parentElement = this;
    },
  };
}

test("reaction title compacts repeated AAA bracket groups", () => {
  assert.equal(
    compactPdgeditReactionTitle(
      "+ [Pro Noether swarm+Anti Noether swarm+Pro Noether swarm+Anti Noether swarm]AAA"
    ),
    "+ 2x[Pro Noether swarm+Anti Noether swarm]AAA"
  );
});

test("reaction participant compaction collapses repeated sequences for summary rendering", () => {
  assert.deepEqual(
    compactPdgeditReactionParticipants([
      { text: "Anti Noether swarm" },
      { text: "Pro Noether swarm" },
      { text: "Anti Noether swarm" },
      { text: "Pro Noether swarm" },
    ]),
    {
      repeatCount: 2,
      participants: ["Anti Noether swarm", "Pro Noether swarm"],
    }
  );
});

test("reaction title leaves non-repeated AAA groups unchanged", () => {
  assert.equal(
    compactPdgeditReactionTitle("+ [Pro Noether swarm+Anti Noether swarm+Pro Up Quark]AAA"),
    "+ [Pro Noether swarm+Anti Noether swarm+Pro Up Quark]AAA"
  );
});

test("reaction title compacts each repeated AAA group independently", () => {
  assert.equal(
    compactPdgeditReactionTitle(
      "[Pro Noether swarm + Anti Noether swarm + Pro Noether swarm + Anti Noether swarm]AAA -> " +
        "[Pro Electron+Pro Electron]AAA"
    ),
    "2x[Pro Noether swarm+Anti Noether swarm]AAA -> 2x[Pro Electron]AAA"
  );
});

test("link render models sort shared routing columns by geometry rather than link id", () => {
  const topAssembly = createAssembly({ id: "reactant_top", x: 2, y: 0 });
  const bottomAssembly = createAssembly({ id: "reactant_bottom", x: 2, y: 1 });
  const topOperator = createOperator({ id: "operator_top", x: 7, y: 0 });
  const bottomOperator = createOperator({ id: "operator_bottom", x: 7, y: 1 });
  const objectsById = new Map(
    [topAssembly, bottomAssembly, topOperator, bottomOperator].map((record) => [record.id, record])
  );

  const models = buildPdgeditLinkRenderModels(
    {
      links: [
        { id: "z_top", endpointA: "reactant_top", endpointB: "operator_top" },
        { id: "a_bottom", endpointA: "reactant_bottom", endpointB: "operator_bottom" },
      ],
    },
    (objectId) => objectsById.get(objectId) ?? null
  );

  assert.deepEqual(
    models.map((model) => [model.link.id, model.slotOffsetPx]),
    [
      ["z_top", -3],
      ["a_bottom", 3],
    ]
  );
});

test("picker formats decay branching probability with one decimal place", () => {
  assert.equal(formatPdgeditBranchingProbability(0.3), "30.0%");
  assert.equal(formatPdgeditBranchingProbability(0.999), "99.9%");
  assert.equal(formatPdgeditBranchingProbability(null), "");
});

test("picker exact 0:0 filter keeps only exact entries with no unbound architrino residue", () => {
  const entries = [
    {
      id: "exact_zero",
      title: "Exact Zero",
      displayTitle: "Exact Zero",
      sourceKind: "exact",
      branchingProbability: 0.92,
      productUnboundArchitrinoCounts: { electrinoCount: 0, positrinoCount: 0 },
    },
    {
      id: "exact_residue",
      title: "Exact Residue",
      displayTitle: "Exact Residue",
      sourceKind: "exact",
      branchingProbability: 0.83,
      productUnboundArchitrinoCounts: { electrinoCount: 3, positrinoCount: 3 },
    },
    {
      id: "exact_zero_lower",
      title: "Exact Zero Lower",
      displayTitle: "Exact Zero Lower",
      sourceKind: "exact",
      branchingProbability: 0.41,
      productUnboundArchitrinoCounts: { electrinoCount: 0, positrinoCount: 0 },
    },
    {
      id: "review_zero",
      title: "Review Zero",
      displayTitle: "Review Zero",
      sourceKind: "unsolved",
      branchingProbability: 0.97,
      productUnboundArchitrinoCounts: { electrinoCount: 0, positrinoCount: 0 },
    },
  ];

  assert.deepEqual(
    getPdgeditDocumentPickerEntries(entries, { sourceFilter: "exact-zero-residue" }).map((entry) => entry.id),
    ["exact_zero", "exact_zero_lower"]
  );
});

test("picker probability filter keeps >=20% reactions and sorts them descending", () => {
  const entries = [
    {
      id: "review_high",
      title: "Review High",
      displayTitle: "Review High",
      sourceKind: "unsolved",
      branchingProbability: 0.91,
    },
    {
      id: "exact_mid",
      title: "Exact Mid",
      displayTitle: "Exact Mid",
      sourceKind: "exact",
      branchingProbability: 0.67,
    },
    {
      id: "example_low",
      title: "Example Low",
      displayTitle: "Example Low",
      sourceKind: "example",
      branchingProbability: 0.4,
    },
    {
      id: "exact_below_threshold",
      title: "Exact Below Threshold",
      displayTitle: "Exact Below Threshold",
      sourceKind: "exact",
      branchingProbability: 0.19,
    },
  ];

  assert.deepEqual(
    getPdgeditDocumentPickerEntries(entries, { sourceFilter: "probability" }).map((entry) => entry.id),
    ["review_high", "exact_mid", "example_low"]
  );
  assert.deepEqual(
    getPdgeditDocumentPickerEntries(entries, { sourceFilter: "probability", query: "mid" }).map((entry) => entry.id),
    ["exact_mid"]
  );
});

test("picker all filter removes live reactions below 20% and sorts remaining entries descending by probability", () => {
  const entries = [
    {
      id: "example_reference",
      title: "Example Reference",
      displayTitle: "Example Reference",
      sourceKind: "example",
    },
    {
      id: "exact_top",
      title: "Exact Top",
      displayTitle: "Exact Top",
      sourceKind: "exact",
      branchingProbability: 0.91,
    },
    {
      id: "unsolved_mid",
      title: "Unsolved Mid",
      displayTitle: "Unsolved Mid",
      sourceKind: "unsolved",
      branchingProbability: 0.27,
    },
    {
      id: "exact_below_floor",
      title: "Exact Below Floor",
      displayTitle: "Exact Below Floor",
      sourceKind: "exact",
      branchingProbability: 0.199,
    },
    {
      id: "exact_no_numeric",
      title: "Exact No Numeric",
      displayTitle: "Exact No Numeric",
      sourceKind: "exact",
    },
  ];

  assert.deepEqual(
    getPdgeditDocumentPickerEntries(entries).map((entry) => entry.id),
    ["exact_top", "unsolved_mid", "example_reference"]
  );
});

test("picker child mounting preserves existing mounted controls", () => {
  const panel = createMockParentElement();
  const searchInput = { id: "search" };
  const filterGroup = { id: "filter" };
  const optionList = { id: "options" };

  ensurePdgeditPickerChildElement(panel, searchInput);
  ensurePdgeditPickerChildElement(panel, filterGroup);
  ensurePdgeditPickerChildElement(panel, optionList);
  ensurePdgeditPickerChildElement(panel, searchInput);
  ensurePdgeditPickerChildElement(panel, filterGroup);

  assert.deepEqual(
    panel.children.map((child) => child.id),
    ["search", "filter", "options"]
  );
});

test("text input updates preserve caret selection for focused picker search fields", () => {
  const input = {
    value: "reaction",
    selectionStart: 3,
    selectionEnd: 3,
    setSelectionRange(start, end) {
      this.selectionStart = start;
      this.selectionEnd = end;
    },
  };
  const documentLike = {
    activeElement: input,
  };

  updateTextInputValuePreservingSelection(input, "react", { documentLike });

  assert.equal(input.value, "react");
  assert.equal(input.selectionStart, 3);
  assert.equal(input.selectionEnd, 3);
});
