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

function createFakeAnchor(href) {
  const attributes = new Map([["href", href]]);
  return {
    attributes,
    classList: createClassList(),
    dataset: {},
    getAttribute(key) {
      return attributes.get(key) ?? null;
    },
    removeAttribute(key) {
      attributes.delete(key);
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
  };
}

function createFakeMarkdownBody(anchors = []) {
  return {
    ...createFakeElement(),
    querySelectorAll(selector) {
      return selector === "a[href]" ? anchors : [];
    },
  };
}

function createFakePdfCodeBlock(pdfPath) {
  const inserted = [];
  const container = {
    dataset: {},
    insertAdjacentElement(position, element) {
      inserted.push({ position, element });
    },
  };
  return {
    codeBlock: {
      textContent: pdfPath,
      parentElement: container,
      closest(selector) {
        return selector === "pre" ? container : null;
      },
    },
    container,
    inserted,
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

test("pdf links resolve relative to the active markdown source and download directly", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "[philosophy-history.pdf](../../../generated/pdf/textbook/philosophy-history.pdf)";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const pdfLink = createFakeAnchor("../../../generated/pdf/textbook/philosophy-history.pdf");
  const markdownPanel = createFakeElement();
  const markdownBody = createFakeMarkdownBody([pdfLink]);
  const markdownLayoutToggle = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: {
      render() {
        return '<p><a href="../../../generated/pdf/textbook/philosophy-history.pdf">philosophy-history.pdf</a></p>';
      },
    },
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  await runtime.showMarkdownPanel({
    name: "Philosophy-History",
    markdownPath: "content/markdown/aaa/archie/textbook-pdf-snapshots.md",
    markdownColumns: 1,
  });

  assert.equal(
    pdfLink.attributes.get("href"),
    "content/generated/pdf/textbook/philosophy-history.pdf"
  );
  assert.equal(pdfLink.attributes.get("download"), "philosophy-history.pdf");
  assert.equal(pdfLink.classList.contains("markdown-download-link"), true);
});

test("textbook pdf path code blocks gain download links without authored markdown links", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "```text\ncontent/generated/pdf/textbook/philosophy-history.pdf\n```";
    },
  });
  globalThis.window = {};
  globalThis.document = {
    createElement(tagName) {
      assert.equal(tagName, "a");
      return {
        ...createFakeAnchor(""),
        textContent: "",
      };
    },
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });

  const { codeBlock, container, inserted } = createFakePdfCodeBlock(
    "content/generated/pdf/textbook/philosophy-history.pdf"
  );
  const markdownPanel = createFakeElement();
  const markdownBody = {
    ...createFakeElement(),
    querySelectorAll(selector) {
      if (selector === "a[href]") {
        return [];
      }
      if (selector === "pre > code") {
        return [codeBlock];
      }
      return [];
    },
  };
  const markdownLayoutToggle = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: {
      render() {
        return "<pre><code>content/generated/pdf/textbook/philosophy-history.pdf</code></pre>";
      },
    },
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  await runtime.showMarkdownPanel({
    name: "Philosophy-History",
    markdownPath: "content/markdown/aaa/archie/textbook-pdf-snapshots.md",
    markdownColumns: 1,
  });

  assert.equal(container.dataset.pdfDownloadDecorated, "true");
  assert.equal(inserted.length, 1);
  assert.equal(inserted[0].position, "afterend");
  assert.equal(
    inserted[0].element.attributes.get("href"),
    "content/generated/pdf/textbook/philosophy-history.pdf"
  );
  assert.equal(inserted[0].element.attributes.get("download"), "philosophy-history.pdf");
  assert.equal(inserted[0].element.textContent, "Download philosophy-history.pdf");
  assert.equal(inserted[0].element.classList.contains("markdown-download-link"), true);
});

test("missing textbook pdf files are marked unavailable", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;

  globalThis.fetch = async (url, options = {}) => {
    if (options.method === "HEAD") {
      assert.equal(url, "content/generated/pdf/textbook/philosophy-history.pdf");
      return { ok: false, status: 404 };
    }
    return {
      ok: true,
      async text() {
        return "```text\ncontent/generated/pdf/textbook/philosophy-history.pdf\n```";
      },
    };
  };
  globalThis.window = {};
  globalThis.document = {
    createElement(tagName) {
      assert.equal(tagName, "a");
      return {
        ...createFakeAnchor(""),
        textContent: "",
      };
    },
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });

  const { codeBlock, inserted } = createFakePdfCodeBlock(
    "content/generated/pdf/textbook/philosophy-history.pdf"
  );
  const markdownPanel = createFakeElement();
  const markdownBody = {
    ...createFakeElement(),
    querySelectorAll(selector) {
      if (selector === "a[href]") {
        return [];
      }
      if (selector === "pre > code") {
        return [codeBlock];
      }
      return [];
    },
  };
  const markdownLayoutToggle = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle,
    markdownRenderer: {
      render() {
        return "<pre><code>content/generated/pdf/textbook/philosophy-history.pdf</code></pre>";
      },
    },
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  await runtime.showMarkdownPanel({
    name: "Philosophy-History",
    markdownPath: "content/markdown/aaa/archie/textbook-pdf-snapshots.md",
    markdownColumns: 1,
  });
  await new Promise((resolve) => setImmediate(resolve));

  const downloadLink = inserted[0].element;
  assert.equal(downloadLink.attributes.has("href"), false);
  assert.equal(downloadLink.attributes.has("download"), false);
  assert.equal(downloadLink.attributes.get("aria-disabled"), "true");
  assert.equal(downloadLink.textContent, "philosophy-history.pdf not generated yet");
  assert.equal(downloadLink.classList.contains("is-unavailable"), true);
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
