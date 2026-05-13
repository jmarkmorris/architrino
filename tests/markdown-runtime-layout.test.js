import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdownRuntime } from "../src/runtime/MarkdownRuntime.js";

function createClassList() {
  const classes = new Set();
  return {
    add(...tokens) {
      tokens.forEach((token) => classes.add(token));
    },
    remove(...tokens) {
      tokens.forEach((token) => classes.delete(token));
    },
    toggle(token, force) {
      const shouldAdd = typeof force === "boolean" ? force : !classes.has(token);
      if (shouldAdd) {
        classes.add(token);
      } else {
        classes.delete(token);
      }
      return shouldAdd;
    },
    contains(token) {
      return classes.has(token);
    },
  };
}

function createFakeElement() {
  const attributes = new Map();
  const styleProps = new Map();
  return {
    attributes,
    classList: createClassList(),
    dataset: {},
    disabled: false,
    inert: false,
    innerHTML: "",
    textContent: "",
    style: {
      props: styleProps,
      setProperty(key, value) {
        styleProps.set(key, value);
      },
    },
    addEventListener() {},
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
  };
}

test("one-column markdown documents can toggle to a two-column layout", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "# Test\n\nBody";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownPanel = createFakeElement();
  const markdownBody = createFakeElement();
  const markdownLayoutToggle = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  await runtime.showMarkdownPanel({
    name: "Test",
    markdownPath: "content/markdown/test.md",
    markdownColumns: 1,
  });

  assert.equal(markdownPanel.classList.contains("multi-columns"), false);
  assert.equal(markdownPanel.style.props.get("--markdown-column-count"), "1");
  assert.equal(markdownLayoutToggle.attributes.get("aria-label"), "Switch to 2-column layout");

  runtime.toggleMarkdownLayout();

  assert.equal(markdownPanel.classList.contains("multi-columns"), true);
  assert.equal(markdownPanel.style.props.get("--markdown-column-count"), "2");
  assert.equal(markdownLayoutToggle.attributes.get("aria-label"), "Switch to single column");
});

test("open markdown panels can invoke the browser PDF save flow", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  let printCount = 0;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "# Test\n\nBody";
    },
  });
  globalThis.window = {
    print() {
      printCount += 1;
    },
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownPanel = createFakeElement();
  const markdownBody = createFakeElement();
  const markdownLayoutToggle = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  assert.equal(runtime.printMarkdownPanel(), false);

  await runtime.showMarkdownPanel({
    name: "Test",
    markdownPath: "content/markdown/test.md",
    markdownColumns: 1,
  });

  assert.equal(runtime.printMarkdownPanel(), true);
  assert.equal(printCount, 1);
});
