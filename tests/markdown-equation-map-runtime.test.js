import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createEquationMappingLaunchHref, resolveEquationMappingReturnHref } from "../src/runtime/EquationMappingNavigation.js";
import { createMarkdownEquationMapRuntime, EQUATION_MAP_TRIAL } from "../src/runtime/MarkdownEquationMapRuntime.js";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";

const sourcePath = "content/markdown/aaa/philosophy-history/one-nature-many-theories.md";
const semanticId = "corpus-equation-9a8a84e6187eb564";
const currentHref = "https://example.test/site/index.html#scene=original-section&parent=original-parent&focus=original-node";

test("Map preserves the exact source route, adds an equation landing, and stays inside a deployment prefix", () => {
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

test("Map constructs a section reader route when the original URL has no scene", () => {
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

test("Equation Mapping renders a real return link only for valid launch context", () => {
  for (const launched of [true, false]) {
    const href = launched ? createEquationMappingLaunchHref({ currentHref, semanticId, sourcePath }) : "https://example.test/site/equation-mapping.html";
    const controls = EquationMappingRuntime.prototype.renderControls.call({
      document: { createElement: element },
      window: { location: { href } },
      activeDocument: { promoted: false },
      renderIconButton: () => element("button"),
    });
    const links = controls.children.filter(child => child.tagName === "A");
    assert.equal(links.length, launched ? 1 : 0);
    if (launched) {
      assert.equal(links[0].textContent, "← Return to page");
      assert.equal(links[0].href, resolveEquationMappingReturnHref(href));
    }
  }
});

function element(tagName, className = "") {
  const node = {
    tagName: tagName.toUpperCase(), className, children: [], dataset: {}, textContent: "", attrs: {}, handlers: {},
    get childElementCount() { return this.children.length; },
    classList: { contains(name) { return node.className.split(" ").includes(name); } },
    setAttribute(name, value) { this.attrs[name] = value; },
    getAttribute(name) { return this.attrs[name] ?? null; },
    addEventListener(name, handler) { (this.handlers[name] ??= []).push(handler); },
    fire(name, event = {}) { for (const handler of this.handlers[name] ?? []) handler(event); },
    append(...children) { for (const child of children) { child.remove(); this.children.push(child); child.parentElement = this; } },
    remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this); this.parentElement = null; },
    replaceWith(replacement) { const parent = this.parentElement; const index = parent.children.indexOf(this); parent.children[index] = replacement; replacement.parentElement = parent; this.parentElement = null; },
    get previousElementSibling() { const siblings = this.parentElement?.children ?? []; return siblings[siblings.indexOf(this) - 1]; },
  };
  return node;
}

function fixture() {
  const root = element("article");
  const equation = element("div", "markdown-math-block");
  const paragraph = element("p");
  const link = element("a");
  link.textContent = paragraph.textContent = "Explore this equation in Equation Mapping";
  link.setAttribute("href", `../../../../equation-mapping.html#${semanticId}`);
  paragraph.append(link);
  root.append(equation, paragraph);
  root.querySelectorAll = () => [link];
  const windowLike = { location: { href: currentHref } };
  const runtime = createMarkdownEquationMapRuntime({ markdownBody: root, documentLike: { createElement: element }, getWindow: () => windowLike });
  return { root, equation, paragraph, link, runtime, windowLike };
}

test("the trial wraps only the selected equation, preserves its node, and provides an accessible tooltip", () => {
  const f = fixture();
  f.runtime.decorate(sourcePath);
  assert.equal(f.root.children.length, 1);
  const row = f.root.children[0];
  assert.equal(row.className, "markdown-equation-map-row");
  assert.equal(row.children[0], f.equation);
  const action = row.children[1];
  assert.equal(action.children[0], f.link);
  assert.equal(f.link.textContent, "Map →");
  assert.equal(f.link.getAttribute("aria-label"), "Open in Equation Mapping");
  assert.equal(action.children[1].textContent, "Open in Equation Mapping");
  assert.equal(action.children[1].getAttribute("role"), "tooltip");
  assert.equal(action.children[1].id, f.link.getAttribute("aria-describedby"));
  f.link.fire("keydown", { key: "Escape" });
  assert.equal(action.dataset.tooltipDismissed, "true");
  f.link.fire("focus");
  assert.equal(action.dataset.tooltipDismissed, undefined);
  f.windowLike.location.href = "https://example.test/site/index.html#scene=settled-section";
  f.link.fire("pointerdown");
  assert.equal(new URL(new URL(f.link.href).searchParams.get("returnTo")).hash, "#scene=settled-section");
});

test("unselected documents, neighboring equations, and links embedded in prose remain unchanged", () => {
  for (const change of [f => f.link.setAttribute("href", "../../../../equation-mapping.html#another-equation"), f => { f.paragraph.textContent += " additional prose"; }, f => { f.equation.className = "not-math"; }]) {
    const f = fixture(); change(f); f.runtime.decorate(sourcePath);
    assert.deepEqual(f.root.children, [f.equation, f.paragraph]);
  }
  const f = fixture(); f.runtime.decorate("content/markdown/aaa/another.md");
  assert.deepEqual(f.root.children, [f.equation, f.paragraph]);
});

test("return restoration waits for math, scrolls once, focuses Map, and cancels on a different page", () => {
  for (const navigateAway of [false, true]) {
    const f = fixture();
    f.runtime.decorate(sourcePath);
    const row = f.root.children[0];
    row.isConnected = true;
    let rendered = false;
    let scrolled = 0;
    let focused = 0;
    let callback;
    row.querySelector = selector => selector === ".is-rendered" ? (rendered ? f.equation : null) : f.link;
    row.scrollIntoView = options => { assert.equal(options.block, "center"); scrolled++; };
    f.link.focus = options => { assert.equal(options.preventScroll, true); focused++; };
    f.windowLike.location.search = `?equation=${semanticId}`;
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

test("the single-equation trial points at the unchanged canonical Delta equation and CSS supports keyboard focus", () => {
  assert.deepEqual(EQUATION_MAP_TRIAL, { sourcePath, semanticId });
  const source = readFileSync(new URL(`../${sourcePath}`, import.meta.url), "utf8");
  const prefix = source.slice(0, source.indexOf(`[Explore this equation in Equation Mapping](../../../../equation-mapping.html#${semanticId})`));
  assert.match(prefix, /\$\$\s*\\Delta_[\s\S]*?\\epsilon_\{ij\}\s*\$\$\s*$/u);
  const css = readFileSync(new URL("../style.css", import.meta.url), "utf8");
  assert.match(css, /\.markdown-equation-map-link:focus-visible \+ \.markdown-equation-map-tooltip\s*\{\s*visibility: visible;/u);
});
