import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createEquationMappingLaunchHref, resolveEquationMappingReturnHref } from "../src/runtime/EquationMappingNavigation.js";
import { createMarkdownEquationMapRuntime, resolveEquationMappingSemanticId } from "../src/runtime/MarkdownEquationMapRuntime.js";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";

const sourcePath = "content/markdown/aaa/philosophy-history/one-nature-many-theories.md";
const semanticId = "corpus-equation-9a8a84e6187eb564";
const currentHref = "https://example.test/site/index.html#scene=original-section&parent=original-parent&focus=original-node";

test("View preserves the exact source route, adds an equation landing, and stays inside a deployment prefix", () => {
  const destination = new URL(createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath }));
  assert.equal(destination.pathname, "/site/equation-mapping.html");
  assert.equal(destination.hash, `#${semanticId}`);
  const origin = new URL(destination.searchParams.get("returnTo"));
  assert.equal(origin.hash, new URL(currentHref).hash);
  assert.equal(origin.searchParams.get("equation"), semanticId);
  assert.equal(resolveEquationMappingReturnHref(destination.href), origin.href);
  destination.hash = "another-equation";
  assert.equal(resolveEquationMappingReturnHref(destination.href), origin.href);
});

test("View constructs a section reader route when the original URL has no scene", () => {
  const destination = new URL(createEquationMappingLaunchHref({ currentHref: "https://example.test/site/", semanticId, sourcePath, sourceSection: "A Formal Audit of the Theory Network" }));
  const origin = new URL(destination.searchParams.get("returnTo"));
  assert.equal(new URLSearchParams(origin.hash.slice(1)).get("scene"), `runtime:markdown:reader:${sourcePath}::A%20Formal%20Audit%20of%20the%20Theory%20Network`);
});

test("return links reject external, executable, credentialed, unrelated and malformed destinations", () => {
  for (const returnTo of ["https://other.test/index.html#scene=a", "javascript:alert(1)", "https://user:secret@example.test/site/index.html#scene=a", "/other/index.html#scene=a", "/site/equation-mapping.html#scene=a", "/site/index.html", "http://["]) {
    const url = new URL("https://example.test/site/equation-mapping.html");
    url.searchParams.set("returnTo", returnTo);
    assert.equal(resolveEquationMappingReturnHref(url.href), null, returnTo);
  }
  assert.equal(resolveEquationMappingReturnHref("https://example.test/equation-mapping.html#direct-link"), null);
});

test("Equation Mapping renders the standard Back icon as a return link only for valid launch context", () => {
  for (const launched of [true, false]) {
    const href = launched ? createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath }) : "https://example.test/site/equation-mapping.html";
    const link = EquationMappingRuntime.prototype.renderReturnLink.call({
      document: { createElement: element },
      window: { location: { href } },
    });
    if (launched) {
      assert.equal(link.tagName, "A");
      assert.equal(link.textContent, "");
      assert.equal(link.getAttribute("aria-label"), "Return to page");
      assert.equal(link.title, "Return to page");
      assert.equal(link.href, resolveEquationMappingReturnHref(href));
      const controlBar = readFileSync(new URL("../src/runtime/TopDynamicControlBarRuntime.js", import.meta.url), "utf8");
      const backIcon = controlBar.match(/back:\s*'<polyline points="([^"]+)"/u);
      assert.ok(backIcon, "the shared control bar defines the Back chevron");
      assert.ok(link.innerHTML.includes(`points="${backIcon[1]}"`));
    } else {
      assert.equal(link, null);
    }
  }
});

test("return navigation belongs at the start of the subject header, not in the right-hand controls", () => {
  const context = {
    document: { createElement: element },
    window: { location: { href: createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath }) } },
    indexCollapsed: true,
    searchQuery: "",
    navigationView: "key",
    getVisibleDocumentList: () => [],
    renderReturnLink() { return EquationMappingRuntime.prototype.renderReturnLink.call(this); },
    renderIconButton: () => element("button"),
    activeDocument: { promoted: false },
  };
  const index = EquationMappingRuntime.prototype.renderSubjectIndex.call(context);
  assert.ok(index.children[0].children[0].className.includes("equation-mapping-return-link"));
  const controls = EquationMappingRuntime.prototype.renderControls.call(context);
  assert.equal(controls.children.some(child => child.tagName === "A"), false);
});

test("Master Equation is the first sidebar item without removing or duplicating its normal record", () => {
  const masterId = "eq-01b-causal-wake-master-equation";
  const documents = [
    { id: "eq-01-causal-wake-master-equation", title: "Causal Wake Per-Hit Law", subject: "Dynamics", promoted: true },
    { id: masterId, title: "Causal Wake Master Equation", subject: "Dynamics", promoted: true },
  ];
  let selected;
  const context = {
    document: { createElement: element, createTextNode(text) { const node = element("#text"); node.textContent = text; return node; } },
    window: {},
    searchQuery: "",
    navigationView: "key",
    expandedSubjectIds: new Set(["Dynamics"]),
    activeDocument: documents[1],
    getVisibleDocumentList: () => documents,
    renderReturnLink: () => null,
    renderIndexItem: EquationMappingRuntime.prototype.renderIndexItem,
    setActiveDocument: id => { selected = id; },
  };
  const index = EquationMappingRuntime.prototype.renderSubjectIndex.call(context);
  const groups = index.children[1];
  const pinned = groups.children[0];
  assert.equal(pinned.children[0].children[0].textContent, "Master Equation");
  assert.equal(pinned.getAttribute("aria-current"), "true");
  pinned.fire("click");
  assert.equal(selected, masterId);
  const normalItems = groups.children[4].children[0].children[1].children;
  assert.deepEqual(normalItems.map(item => item.children[0].children[0].textContent), ["Causal Wake Per-Hit Law", "Causal Wake Master Equation"]);
  assert.equal(documents.length, 2);
});

function element(tagName, className = "") {
  const node = {
    tagName: tagName.toUpperCase(), className, children: [], dataset: {}, textContent: "", attrs: {}, handlers: {},
    get childElementCount() { return this.children.length; },
    classList: {
      contains(name) { return node.className.split(" ").includes(name); },
      add(name) { this.toggle(name, true); },
      toggle(name, enabled) { const classes = new Set(node.className.split(" ").filter(Boolean)); if (enabled) classes.add(name); else classes.delete(name); node.className = [...classes].join(" "); },
    },
    setAttribute(name, value) { this.attrs[name] = value; },
    getAttribute(name) { return this.attrs[name] ?? null; },
    addEventListener(name, handler) { (this.handlers[name] ??= []).push(handler); },
    fire(name, event = {}) { for (const handler of this.handlers[name] ?? []) handler(event); },
    append(...children) { for (const child of children) { child.remove(); this.children.push(child); child.parentElement = this; } },
    replaceChildren(...children) { this.children.forEach(child => { child.parentElement = null; }); this.children = []; this.append(...children); },
    remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this); this.parentElement = null; },
    replaceWith(replacement) { const parent = this.parentElement; const index = parent.children.indexOf(this); parent.children[index] = replacement; replacement.parentElement = parent; this.parentElement = null; },
    get previousElementSibling() { const siblings = this.parentElement?.children ?? []; return siblings[siblings.indexOf(this) - 1]; },
  };
  return node;
}

function fixture(entries = [{ semanticId, prefix: "../../../../" }]) {
  const root = element("article");
  const equations = [];
  const paragraphs = [];
  const links = [];
  for (const entry of entries) {
    const equation = element("div", "markdown-math-block");
    const paragraph = element("p");
    const link = element("a");
    link.textContent = paragraph.textContent = "View →";
    link.setAttribute("href", `${entry.prefix}equation-mapping.html#${entry.semanticId}`);
    paragraph.append(link);
    root.append(equation, paragraph);
    equations.push(equation);
    paragraphs.push(paragraph);
    links.push(link);
  }
  root.querySelectorAll = () => links;
  const windowLike = { location: { href: currentHref } };
  const runtime = createMarkdownEquationMapRuntime({ markdownBody: root, documentLike: { createElement: element }, getWindow: () => windowLike });
  return {
    root, equations, paragraphs, links, runtime, windowLike,
    equation: equations[0], paragraph: paragraphs[0], link: links[0],
  };
}

test("every canonical equation link becomes an accessible View action across source depths", () => {
  const entries = [
    { semanticId, prefix: "../../../../" },
    { semanticId: "corpus-equation-aabbccddeeff0011", prefix: "../../../../../" },
    { semanticId: "causal-wake-master-equation", prefix: "../../../../../../" },
  ];
  const f = fixture(entries);
  assert.equal(f.runtime.decorate(sourcePath), entries.length);
  assert.equal(f.root.children.length, entries.length);
  f.root.children.forEach((row, index) => {
    const action = row.children[1];
    const link = f.links[index];
    assert.equal(row.className, "markdown-equation-map-row");
    assert.equal(row.id, entries[index].semanticId);
    assert.equal(row.children[0], f.equations[index]);
    assert.equal(action.children[0], link);
    assert.equal(link.textContent, "View →");
    assert.equal(link.getAttribute("aria-label"), "View in Equation Mapping");
    assert.equal(action.children[1].textContent, "View in Equation Mapping");
    assert.equal(action.children[1].getAttribute("role"), "tooltip");
    assert.equal(action.children[1].id, link.getAttribute("aria-describedby"));
    assert.equal(new URL(link.href).hash, `#${entries[index].semanticId}`);
  });
  const action = f.root.children[0].children[1];
  f.link.fire("keydown", { key: "Escape" });
  assert.equal(action.dataset.tooltipDismissed, "true");
  f.link.fire("focus");
  assert.equal(action.dataset.tooltipDismissed, undefined);
  f.windowLike.location.href = "https://example.test/site/index.html#scene=settled-section";
  f.link.fire("pointerdown");
  assert.equal(new URL(new URL(f.link.href).searchParams.get("returnTo")).hash, "#scene=settled-section");
});

test("noncanonical routes, embedded links, labels, and non-equation neighbors remain unchanged", () => {
  for (const change of [
    f => f.link.setAttribute("href", "../../../../other.html#another-equation"),
    f => { f.paragraph.textContent = `Introductory prose ${f.paragraph.textContent}`; },
    f => { f.equation.className = "not-math"; },
    f => { f.link.textContent = f.paragraph.textContent = "Read the equation map"; },
  ]) {
    const f = fixture(); change(f); f.runtime.decorate(sourcePath);
    assert.deepEqual(f.root.children, [f.equation, f.paragraph]);
  }
});

test("a canonical link sharing a paragraph with following prose moves without deleting the prose", () => {
  const f = fixture();
  const inline = element("span");
  inline.textContent = "following explanation";
  f.paragraph.textContent += " following explanation";
  f.paragraph.append(inline);

  assert.equal(f.runtime.decorate(sourcePath), 1);
  assert.deepEqual(f.root.children, [f.root.children[0], f.paragraph]);
  assert.equal(f.root.children[0].className, "markdown-equation-map-row");
  assert.deepEqual(f.paragraph.children, [inline]);
});

test("return restoration waits for math, scrolls once, focuses View, and cancels on a different page", () => {
  const requestedSemanticId = "corpus-equation-aabbccddeeff0011";
  for (const navigateAway of [false, true]) {
    const f = fixture([
      { semanticId, prefix: "../../../../" },
      { semanticId: requestedSemanticId, prefix: "../../../../../" },
    ]);
    f.runtime.decorate(sourcePath);
    const row = f.root.children[1];
    const link = f.links[1];
    row.isConnected = true;
    let rendered = false;
    let scrolled = 0;
    let focused = 0;
    let callback;
    row.querySelector = selector => selector === ".is-rendered" ? (rendered ? f.equations[1] : null) : link;
    row.scrollIntoView = options => { assert.equal(options.block, "center"); scrolled++; };
    link.focus = options => { assert.equal(options.preventScroll, true); focused++; };
    f.windowLike.location.search = `?equation=${requestedSemanticId}`;
    f.windowLike.requestAnimationFrame = run => { callback = run; };
    f.runtime.restoreReturnPosition();
    assert.equal(callback, undefined);
    rendered = true;
    f.runtime.restoreReturnPosition();
    assert.equal(typeof callback, "function");
    if (navigateAway) f.runtime.decorate("another.md");
    callback();
    assert.equal(scrolled, navigateAway ? 0 : 1);
    assert.equal(focused, navigateAway ? 0 : 1);
    callback = undefined;
    f.runtime.restoreReturnPosition();
    assert.equal(callback, undefined);
  }
});

test("the global source-link parser is narrow and CSS supports keyboard focus", () => {
  for (const prefix of ["../../../../", "../../../../../", "../../../../../../"]) {
    assert.equal(resolveEquationMappingSemanticId(`${prefix}equation-mapping.html#${semanticId}`), semanticId);
  }
  for (const href of [null, "equation-mapping.html#id", "../../../../other.html#id", "../../../../equation-mapping.html", "../../../../equation-mapping.html#bad/id", "https://example.test/equation-mapping.html#id"]) {
    assert.equal(resolveEquationMappingSemanticId(href), null);
  }
  const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(css, /\.markdown-equation-map-link:focus-visible \+ \.markdown-equation-map-tooltip\s*\{\s*visibility: visible;/u);
});
