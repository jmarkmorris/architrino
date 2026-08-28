import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createTextbookChapterIndex } from "../scripts/build-equation-mapping-corpus.mjs";
import { createSeedEquationMapDocuments, MASTER_EQUATION_MAP_DOCUMENT_ID } from "../src/apps/equation-mapping/EquationMappingData.js";
import { createEquationMappingDocuments } from "../src/apps/equation-mapping/EquationMappingRegistry.js";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";
import { groupEquationMapDocumentsByChapter, renderEquationSidebar, revealEquationInSidebar } from "../src/apps/equation-mapping/EquationMappingSidebar.js";

const equation = (id, chapter, order, heading, line, promoted = false) => ({
  id, title: `Equation ${id}`, promoted, subject: "Dynamics", formulaTeX: "x = y",
  source: { sourcePath: `${chapter}.md`, sourceTitle: chapter, sourceOrder: order, sourceHeading: heading, startLine: line },
});
const entries = [
  equation("later", "Alpha", 2, "Later section", 80),
  equation("supplement", "Supplement", null, "Details", 1),
  equation("second", "Zeta", 0, "Same heading", 20),
  equation("first", "Zeta", 0, "Same heading", 10, true),
  equation("early", "Alpha", 2, "Early section", 10),
];
const newState = () => ({ navigationView: "key", searchQuery: "", expandedSubjectIds: new Set(), expandedChapterIds: new Set(), expandedSectionIds: new Set() });

test("chapter order follows the textbook, sections follow source order, and supplementary equations remain accessible", () => {
  const chapters = groupEquationMapDocumentsByChapter(entries);
  assert.deepEqual(chapters.map(chapter => chapter.title), ["Zeta", "Alpha", "Supplement"]);
  assert.deepEqual(chapters[1].sections.map(section => section.title), ["Early section", "Later section"]);
  assert.deepEqual(chapters[0].sections[0].entries.map(entry => entry.id), ["first", "second"]);
  assert.equal(entries[0].id, "later", "grouping must not mutate registry order");
});

test("textbook index traverses nested chapters once, excluding section references", () => {
  const index = createTextbookChapterIndex({ children: [
    { title: "Part", children: [
      { markdownPath: "z.md", title: "Zeta", sections: [{ markdownPath: "ignore.md", title: "Section" }] },
      { markdownPath: "a.md", title: "Alpha" },
    ] },
    { markdownPath: "z.md", title: "Repeated chapter" },
  ] });
  assert.deepEqual([...index], [["z.md", { sourceTitle: "Zeta", sourceOrder: 0 }], ["a.md", { sourceTitle: "Alpha", sourceOrder: 1 }]]);
});

test("corpus chapter grouping retains every occurrence exactly once", () => {
  const payload = JSON.parse(readFileSync(new URL("../content/generated/equation-mapping/corpus-equations.json", import.meta.url)));
  const documents = createEquationMappingDocuments(payload.records);
  const grouped = groupEquationMapDocumentsByChapter(documents).flatMap(chapter => chapter.sections.flatMap(section => section.entries));
  assert.equal(grouped.length, documents.length);
  assert.equal(new Set(grouped.map(entry => entry.id)).size, documents.length);
});

test("a plain launch defaults to Key equations, while a source launch reveals its selected chapter", () => {
  const documents = createSeedEquationMapDocuments();
  const master = documents.find(entry => entry.id === MASTER_EQUATION_MAP_DOCUMENT_ID);
  master.source = entries[3].source;
  const plain = new EquationMappingRuntime({ documents, document: {}, window: {} });
  assert.equal(plain.navigationView, "key");
  const href = "https://example.test/equation-mapping.html?returnTo=" + encodeURIComponent("https://example.test/index.html#scene=source") + "#causal-wake-master-equation";
  const launched = new EquationMappingRuntime({ documents, indexCollapsed: true, document: {}, window: { location: { href, hash: "#causal-wake-master-equation" } } });
  assert.equal(launched.navigationView, "all");
  assert.equal(launched.indexCollapsed, false);
  assert.deepEqual([...launched.expandedChapterIds], ["Zeta.md"]);
  assert.equal(launched.expandedSectionIds.size, 1);
});

function fixture(documents = entries) {
  let focus;
  let selected;
  function element(tag) {
    return {
      tagName: tag, children: [], attrs: {}, handlers: {}, dataset: {}, className: "", textContent: "",
      classList: { add() {} },
      setAttribute(name, value) { this.attrs[name] = value; },
      append(...children) { this.children.push(...children); },
      replaceChildren(...children) { this.children = children; },
      addEventListener(name, handler) { this.handlers[name] = handler; },
      click() { this.handlers.click(); },
      focus() { focus = this; },
    };
  }
  const state = newState();
  const renderText = (tag, text) => Object.assign(element(tag), { textContent: text });
  const body = renderEquationSidebar({
    document: { createElement: element }, documents, state, renderText,
    renderItem: (entry, label = entry.title) => renderText("button", label),
    onSelect: entry => { selected = entry; }, onChange() {},
  });
  const [views, input, status, list] = body.children;
  return { body, state, views, input, status, list, get selected() { return selected; }, get focus() { return focus; } };
}

test("Key equations lists only promoted maps and toggles leave the search field mounted", () => {
  const f = fixture();
  assert.equal(f.status.textContent, "1 key equations · by subject");
  assert.equal(f.list.children.length, 1);
  const [toggle, items] = f.list.children[0].children;
  assert.equal(items.children.length, 0);
  toggle.click();
  assert.deepEqual(items.children.map(item => item.textContent), ["Equation first"]);
  assert.equal(toggle.attrs["aria-expanded"], "true");
  toggle.click();
  assert.equal(items.children.length, 0);
  assert.equal(f.body.children[1], f.input);
});

test("All equations lazily opens chapter then section, without rendering thousands of rows up front", () => {
  const f = fixture();
  f.views.children[1].click();
  assert.equal(f.state.navigationView, "all");
  assert.equal(f.list.children.length, 3);
  const chapter = f.list.children[0];
  assert.equal(chapter.children[1].children.length, 0);
  chapter.children[0].click();
  const section = chapter.children[1].children[0];
  assert.equal(section.children[1].children.length, 0);
  section.children[0].click();
  assert.deepEqual(section.children[1].children.map(item => item.textContent), ["Equation first", "Equation second"]);
});

test("search covers unpromoted equations and chapter titles, keeps focus, and exposes all result pages", () => {
  const documents = Array.from({ length: 123 }, (_, i) => equation(String(i), "Searchable chapter", 0, "Local section", i));
  const f = fixture(documents);
  f.input.focus();
  f.input.value = "Searchable chapter";
  f.input.handlers.input();
  assert.equal(f.status.textContent, "123 results · all equations");
  assert.equal(f.list.children.length, 51);
  assert.equal(f.list.children[0].children[1].textContent, "Searchable chapter · Local section");
  assert.equal(f.focus, f.input);
  f.list.children.at(-1).click();
  assert.equal(f.list.children.length, 101);
  assert.equal(f.focus, f.list.children[50]);
  f.list.children.at(-1).click();
  assert.equal(f.list.children.length, 123);
  f.list.children.at(-1).click();
  assert.equal(f.selected.id, "122");
  f.input.value = "no-such-topic";
  f.input.handlers.input();
  assert.match(f.list.children[0].textContent, /No equations found/u);
  f.input.handlers.keydown({ key: "Escape", stopPropagation() {} });
  assert.equal(f.state.searchQuery, "");
  assert.equal(f.state.navigationView, "key");
});

test("revealing a corpus-only equation selects All equations and expands only the required branch", () => {
  const state = newState();
  revealEquationInSidebar(state, entries[0]);
  assert.equal(state.navigationView, "all");
  assert.deepEqual([...state.expandedChapterIds], ["Alpha.md"]);
  assert.equal(state.expandedSectionIds.size, 1);
});

test("sidebar keyboard arrows do not trigger the equation carousel", () => {
  const runtime = new EquationMappingRuntime({ document: {}, window: {} });
  runtime.navigateActiveDocumentByOffset = () => { throw new Error("Sidebar arrows reached the carousel"); };
  assert.equal(runtime.handleDocumentKeyDown({ key: "ArrowDown", target: { closest: () => ({}) } }), false);
});
