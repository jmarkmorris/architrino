import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPdgeditLinkRenderModels,
  compactPdgeditReactionParticipants,
  compactPdgeditReactionTitle,
  ensurePdgeditPickerChildElement,
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
      "+ [Pro Noether Core+Anti Noether Core+Pro Noether Core+Anti Noether Core]AAA"
    ),
    "+ 2x[Pro Noether Core+Anti Noether Core]AAA"
  );
});

test("reaction participant compaction collapses repeated sequences for summary rendering", () => {
  assert.deepEqual(
    compactPdgeditReactionParticipants([
      { text: "Anti Noether Core" },
      { text: "Pro Noether Core" },
      { text: "Anti Noether Core" },
      { text: "Pro Noether Core" },
    ]),
    {
      repeatCount: 2,
      participants: ["Anti Noether Core", "Pro Noether Core"],
    }
  );
});

test("reaction title leaves non-repeated AAA groups unchanged", () => {
  assert.equal(
    compactPdgeditReactionTitle("+ [Pro Noether Core+Anti Noether Core+Pro Up Quark]AAA"),
    "+ [Pro Noether Core+Anti Noether Core+Pro Up Quark]AAA"
  );
});

test("reaction title compacts each repeated AAA group independently", () => {
  assert.equal(
    compactPdgeditReactionTitle(
      "[Pro Noether Core + Anti Noether Core + Pro Noether Core + Anti Noether Core]AAA -> " +
        "[Pro Electron+Pro Electron]AAA"
    ),
    "2x[Pro Noether Core+Anti Noether Core]AAA -> 2x[Pro Electron]AAA"
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
