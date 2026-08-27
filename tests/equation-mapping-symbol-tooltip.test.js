import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EquationMappingRuntime } from "../src/apps/equation-mapping/EquationMappingRuntime.js";
import { createSeedEquationMapDocuments } from "../src/apps/equation-mapping/EquationMappingData.js";

function element(tag = "div") {
  const attributes = new Map();
  const listeners = new Map();
  return {
    tagName: tag.toUpperCase(),
    children: [],
    dataset: {},
    style: {},
    classList: { toggle() {} },
    rect: { left: 100, top: 300, width: 300, height: 80 },
    setAttribute(name, value) { attributes.set(name, String(value)); },
    getAttribute(name) { return attributes.get(name) ?? null; },
    removeAttribute(name) { attributes.delete(name); },
    append(...nodes) { this.children.push(...nodes); },
    replaceChildren(...nodes) { this.children = nodes; },
    addEventListener(type, handler) { listeners.set(type, handler); },
    fire(type, event = {}) { listeners.get(type)?.(event); },
    contains(node) { return node === this || this.children.some((child) => child.contains(node)); },
    getBoundingClientRect() {
      return { ...this.rect, bottom: this.rect.top + this.rect.height, right: this.rect.left + this.rect.width };
    },
    set textContent(value) { this.children = []; this.text = value; },
    get textContent() { return (this.text ?? "") + this.children.map((child) => child.textContent).join(""); },
  };
}

function setup() {
  const mathCalls = [];
  const document = {
    documentElement: { clientWidth: 900, clientHeight: 700 },
    createElement: element,
    createTextNode(text) { const node = element("#text"); node.textContent = text; return node; },
  };
  const runtime = new EquationMappingRuntime({
    document,
    window: { katex: { render(tex, node, options) {
      mathCalls.push({ tex, options });
      node.textContent = `rendered(${tex})`;
    } } },
    documents: [{ ...createSeedEquationMapDocuments()[0], symbols: [
      { id: "coupling", tex: "g^2", definition: "$g$ is the coupling and $g^2$ its square." },
      { id: "mass", tex: "M_W^2", definition: "$M_W$ is the mediator mass." },
    ] }],
  });
  const strip = runtime.renderSymbolStrip();
  const tooltip = strip.children.find((child) => child.getAttribute("role") === "tooltip");
  const buttons = strip.children.filter((child) => child.tagName === "BUTTON");
  buttons.forEach((button, index) => { button.rect = { left: 200 + 50 * index, top: 300, width: 40, height: 30 }; });
  return { runtime, strip, tooltip, buttons, mathCalls, document };
}

test("symbol hover has one tooltip and uses the equation app's KaTeX path", () => {
  const { strip, tooltip, buttons, mathCalls } = setup();
  assert.equal(tooltip.hidden, true);
  assert.ok(buttons.every((button) => button.getAttribute("title") === null));
  assert.ok(buttons.every((button) => button.dataset.definition === undefined));
  mathCalls.length = 0;
  buttons[0].fire("pointerenter");
  assert.equal(tooltip.hidden, false);
  assert.equal(buttons[0].getAttribute("aria-describedby"), tooltip.id);
  assert.deepEqual(mathCalls.map((call) => call.tex), ["g", "g^2"]);
  assert.ok(mathCalls.every((call) => call.options.displayMode === false && call.options.throwOnError === false));
  assert.doesNotMatch(tooltip.textContent, /\$/u);
  buttons[1].fire("pointerenter");
  assert.equal(strip.children.filter((child) => child.getAttribute("role") === "tooltip").length, 1);
  assert.equal(buttons[0].getAttribute("aria-describedby"), null);
  assert.equal(buttons[1].getAttribute("aria-describedby"), tooltip.id);
  assert.equal(tooltip.textContent, "rendered(M_W) is the mediator mass.");
});

test("pointer and keyboard focus share one tooltip and Escape dismisses it", () => {
  const { runtime, tooltip, buttons } = setup();
  buttons[0].fire("focus");
  assert.equal(tooltip.hidden, false);
  buttons[1].fire("pointerenter");
  assert.equal(buttons[0].getAttribute("aria-describedby"), null);
  buttons[1].fire("pointerleave", { relatedTarget: null });
  assert.equal(buttons[0].getAttribute("aria-describedby"), tooltip.id);
  runtime.handleDocumentKeyDown({ key: "Escape" });
  assert.equal(tooltip.hidden, true);
  assert.equal(buttons[0].getAttribute("aria-describedby"), null);
  buttons[0].fire("blur");
  buttons[1].fire("focus");
  assert.equal(tooltip.hidden, false);
  buttons[1].fire("blur");
  assert.equal(tooltip.hidden, true);
});

test("tooltip stays open while traversing its content and closes on exit", () => {
  const { tooltip, buttons } = setup();
  buttons[0].fire("pointerenter");
  buttons[0].fire("pointerleave", { relatedTarget: tooltip.children[0] });
  assert.equal(tooltip.hidden, false);
  tooltip.fire("pointerleave", { relatedTarget: buttons[0] });
  assert.equal(tooltip.hidden, false);
  tooltip.fire("pointerleave", { relatedTarget: null });
  assert.equal(tooltip.hidden, true);
});

test("tooltip placement stays within the viewport at either edge", () => {
  const { strip, tooltip, buttons } = setup();
  buttons[0].rect.left = 0;
  buttons[0].fire("pointerenter");
  assert.equal(Number.parseFloat(tooltip.style.left) + strip.rect.left, 8);
  buttons[1].rect = { left: 850, top: 650, width: 40, height: 30 };
  buttons[1].fire("pointerenter");
  assert.equal(tooltip.dataset.placement, "above");
  assert.equal(Number.parseFloat(tooltip.style.left) + strip.rect.left + tooltip.rect.width, 892);
  assert.equal(Number.parseFloat(tooltip.style.top) + strip.rect.top, 562);
});

test("the old generated-text CSS tooltip is absent", () => {
  const html = readFileSync(new URL("../equation-mapping.html", import.meta.url), "utf8");
  assert.doesNotMatch(html, /content:\s*attr\(data-definition\)|symbol-chip(?::hover|:focus-visible)?::after/u);
  assert.match(html, /\.equation-mapping-symbol-tooltip\[hidden\]/u);
});
