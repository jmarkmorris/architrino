import assert from "node:assert/strict";
import test from "node:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createMarkdownRuntime } from "../src/runtime/MarkdownRuntime.js";
import { createScenePanelUiRuntime } from "../src/runtime/ScenePanelUiRuntime.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const ignoredHtmlScanDirectories = new Set([".git", "node_modules"]);
const requiredKatexAssetNames = [
  "katex.min.css",
  "katex.min.js",
];
const requiredMermaidAssetNames = [
  "src/runtime/markdown-mermaid.css",
  "vendor/mermaid/mermaid.min.js",
];

function collectHtmlFiles(directory = repoRoot) {
  const htmlFiles = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredHtmlScanDirectories.has(entry.name)) {
        htmlFiles.push(...collectHtmlFiles(join(directory, entry.name)));
      }
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(join(directory, entry.name));
    }
  }
  return htmlFiles;
}

function usesMarkdownDocumentSurface(html) {
  return (
    html.includes("vendor/markdown-it/markdown-it.min.js") ||
    /\bid=["'](?:photon-)?markdown-body["']/.test(html) ||
    /\bid=["'](?:photon-)?markdown-content["']/.test(html)
  );
}

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
    scrollLeft: 0,
    scrollTop: 0,
    textContent: "",
    style: {
      props: styleProps,
      setProperty(key, value) {
        styleProps.set(key, value);
      },
    },
    addEventListener() {},
    contains(target) {
      return target === this;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    removeAttribute(key) {
      attributes.delete(key);
    },
    getAttribute(key) {
      return attributes.get(key) ?? null;
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
    focus() {
      this.focused = true;
    },
  };
}

function createFakeButton() {
  let clickHandler = null;
  const attributes = new Map();
  const button = {
    attributes,
    classList: createClassList(),
    disabled: false,
    addEventListener(type, handler) {
      if (type === "click") {
        clickHandler = handler;
      }
    },
    contains(target) {
      return target === button;
    },
    getAttribute(key) {
      return attributes.get(key) ?? null;
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
    click() {
      return clickHandler?.();
    },
  };
  return button;
}

function createFakeEventTarget() {
  const handlers = new Map();
  return {
    addEventListener(type, handler) {
      handlers.set(type, handler);
    },
    dispatch(type, event) {
      return handlers.get(type)?.(event);
    },
  };
}

function createFakeDocument() {
  const clickedLinks = [];
  return {
    clickedLinks,
    title: "architrino",
    body: {
      children: [],
      appendChild(child) {
        this.children.push(child);
      },
    },
    createElement(tagName) {
      const attributes = new Map();
      return {
        tagName,
        attributes,
        href: "",
        download: "",
        rel: "",
        setAttribute(key, value) {
          attributes.set(key, String(value));
        },
        click() {
          clickedLinks.push({
            href: this.href,
            download: this.download,
            attributes: new Map(attributes),
          });
        },
        remove() {
          this.removed = true;
        },
      };
    },
  };
}

test("plain markdown document navigation resets the panel scroll position", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;

  globalThis.fetch = async (path) => ({
    ok: true,
    async text() {
      return String(path).includes("second.md")
        ? "# Second\n\nTop of second document."
        : "# First\n\nTop of first document.";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownContent = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownContent,
    markdownBody: createFakeElement(),
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
  });

  await runtime.showMarkdownPanel({
    name: "First",
    markdownPath: "content/markdown/first.md",
    markdownColumns: 1,
  });

  markdownContent.scrollTop = 640;
  markdownContent.scrollLeft = 24;

  await runtime.showMarkdownPanel({
    name: "Second",
    markdownPath: "content/markdown/second.md",
    markdownColumns: 1,
  });

  assert.equal(markdownContent.scrollTop, 0);
  assert.equal(markdownContent.scrollLeft, 0);
});

test("markdown panels expose a focused article surface for browser read aloud", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "# Test\n\nReadable body.";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownPanel = createFakeElement();
  const markdownTitle = createFakeElement();
  const markdownContent = createFakeElement();
  const markdownBody = createFakeElement();
  const documentLike = createFakeDocument();
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownTitle,
    markdownContent,
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
    documentLike,
  });

  await runtime.showMarkdownPanel({
    name: "Readable Test",
    markdownPath: "content/markdown/test.md",
    markdownColumns: 1,
  });

  assert.equal(markdownPanel.attributes.get("aria-hidden"), "false");
  assert.equal(markdownPanel.attributes.get("aria-label"), "Readable Test");
  assert.equal(markdownTitle.textContent, "Readable Test");
  assert.equal(markdownContent.attributes.get("aria-label"), "Readable Test");
  assert.equal(markdownContent.attributes.get("tabindex"), "-1");
  assert.equal(markdownContent.focused, true);
  assert.equal(documentLike.title, "Readable Test - architrino");
  assert.match(markdownBody.innerHTML, /Readable body/);

  runtime.hideMarkdownPanel();

  assert.equal(markdownPanel.attributes.get("aria-hidden"), "true");
  assert.equal(markdownPanel.attributes.has("aria-label"), false);
  assert.equal(markdownContent.attributes.has("aria-label"), false);
  assert.equal(markdownBody.innerHTML, "");
  assert.equal(documentLike.title, "architrino");
});

test("markdown image sources resolve relative to the markdown document", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return [
        "# Support",
        "",
        "![Architrino logo and QR code](../../../assets/images/brand/architrino-logo-qr-landscape.png)",
      ].join("\n");
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const imageParent = createFakeElement();
  imageParent.tagName = "P";
  const image = createFakeElement();
  image.tagName = "IMG";
  image.parentElement = imageParent;
  image.setAttribute("src", "../../../assets/images/brand/architrino-logo-qr-landscape.png");

  const markdownBody = createFakeElement();
  markdownBody.querySelectorAll = (selector) => (selector === "img[src]" ? [image] : []);
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: {
      render() {
        return '<p><img src="../../../assets/images/brand/architrino-logo-qr-landscape.png" alt="Architrino logo and QR code"></p>';
      },
    },
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => `${path}?v=test`,
  });

  await runtime.showMarkdownPanel({
    name: "Support",
    markdownPath: "content/markdown/aaa/archie/support-architrino-research.md",
    markdownColumns: 1,
  });

  assert.equal(
    image.getAttribute("src"),
    "content/assets/images/brand/architrino-logo-qr-landscape.png?v=test"
  );
  assert.equal(image.getAttribute("loading"), "lazy");
  assert.equal(image.getAttribute("decoding"), "async");
  assert.equal(image.classList.contains("markdown-image"), true);
  assert.equal(imageParent.classList.contains("markdown-image-block"), true);
});

test("markdown document HTML entrypoints load local KaTeX assets", () => {
  const markdownEntrypoints = collectHtmlFiles()
    .map((file) => {
      const html = readFileSync(file, "utf8");
      return {
        file: relative(repoRoot, file),
        html,
      };
    })
    .filter(({ html }) => usesMarkdownDocumentSurface(html));

  const missingAssets = markdownEntrypoints.flatMap(({ file, html }) =>
    requiredKatexAssetNames
      .filter((assetName) => !html.includes(assetName))
      .map((assetName) => `${file}: missing ${assetName}`)
  );

  assert.deepEqual(missingAssets, []);
});

test("markdown document HTML entrypoints load local Mermaid assets", () => {
  const markdownEntrypoints = collectHtmlFiles()
    .map((file) => {
      const html = readFileSync(file, "utf8");
      return {
        file: relative(repoRoot, file),
        html,
      };
    })
    .filter(({ html }) => usesMarkdownDocumentSurface(html));

  const missingAssets = markdownEntrypoints.flatMap(({ file, html }) =>
    requiredMermaidAssetNames
      .filter((assetName) => !html.includes(assetName))
      .map((assetName) => `${file}: missing ${assetName}`)
  );

  assert.deepEqual(missingAssets, []);
});

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

test("markdown math placeholders retry when the renderer loads late", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const retryCallbacks = [];
  const renderCalls = [];

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "Inline $x$.";
    },
  });
  globalThis.window = {
    setTimeout(callback) {
      retryCallbacks.push(callback);
      return retryCallbacks.length;
    },
    clearTimeout() {},
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownBody = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: {
      render(markdown) {
        return `<p>${markdown}</p>`;
      },
    },
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

  assert.equal(retryCallbacks.length, 1);
  assert.match(markdownBody.innerHTML, /class="markdown-math-segment markdown-math-inline"/);
  assert.match(markdownBody.innerHTML, /data-math-tex="x"/);
  assert.doesNotMatch(markdownBody.innerHTML, /\$x\$/);

  globalThis.window.renderMathInElement = (element, options) => {
    renderCalls.push(options);
    element.innerHTML = element.innerHTML.replace(
      /<span class="markdown-math-segment markdown-math-inline"([^>]*)>x<\/span>/,
      '<span class="markdown-math-segment markdown-math-inline is-rendered"$1><span class="katex">x</span></span>'
    );
  };

  retryCallbacks.shift()();

  assert.equal(renderCalls.length, 1);
  assert.match(markdownBody.innerHTML, /class="katex"/);
});

test("markdown panels leave TeX delimiter examples inside inline code", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  let renderMathCallCount = 0;

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return [
        "Preserve TeX delimiters exactly:",
        "",
        "- `$...$`",
        "- `$$...$$`",
        "- `\\(...\\)`",
        "- `\\[...\\]`",
        "- Use `$...$` inline math for short symbols or ratios in prose.",
        "- Use `$$...$$` display math only for standalone equations.",
      ].join("\n");
    },
  });
  globalThis.window = {
    renderMathInElement() {
      renderMathCallCount += 1;
    },
  };

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownBody = createFakeElement();
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: {
      render(markdown) {
        return `<div>${markdown.replace(/`([^`]*)`/g, "<code>$1</code>")}</div>`;
      },
    },
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

  assert.match(markdownBody.innerHTML, /<code>\$\.\.\.\$<\/code>/);
  assert.match(markdownBody.innerHTML, /<code>\$\$\.\.\.\$\$<\/code>/);
  assert.match(markdownBody.innerHTML, /<code>\\\(\.\.\.\\\)<\/code>/);
  assert.match(markdownBody.innerHTML, /<code>\\\[\.\.\.\\\]<\/code>/);
  assert.match(
    markdownBody.innerHTML,
    /Use <code>\$\.\.\.\$<\/code> inline math for short symbols or ratios in prose\./
  );
  assert.match(
    markdownBody.innerHTML,
    /Use <code>\$\$\.\.\.\$\$<\/code> display math only for standalone equations\./
  );
  assert.doesNotMatch(markdownBody.innerHTML, /markdown-math-segment/);
  assert.equal(renderMathCallCount, 1);
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

test("download-only markdown sources trigger a file download without rendering", () => {
  const fakeDocument = createFakeDocument();
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownBody: createFakeElement(),
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => `${path}?v=test`,
    documentLike: fakeDocument,
  });

  assert.equal(
    runtime.downloadMarkdownSource({
      markdownPath: "content/generated/markdown/textbook/reading-copies/foundations.md",
    }),
    true
  );

  assert.equal(fakeDocument.clickedLinks.length, 1);
  assert.equal(
    fakeDocument.clickedLinks[0].href,
    "content/generated/markdown/textbook/reading-copies/foundations.md?v=test"
  );
  assert.equal(fakeDocument.clickedLinks[0].download, "foundations.md");
  assert.equal(fakeDocument.clickedLinks[0].attributes.get("download"), "foundations.md");
});

test("priority markdown links stay inside the markdown runtime", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  let clickHandler = null;
  const navigatedTargets = [];

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "# Photon App\n\n[Malus' law](../mapping-benchmarks/analysis/malus-law.md)";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownPanel = createFakeElement();
  const markdownBody = createFakeElement();
  markdownBody.addEventListener = (type, handler) => {
    if (type === "click") {
      clickHandler = handler;
    }
  };
  const runtime = createMarkdownRuntime({
    markdownPanel,
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
    navigateToTarget(target) {
      navigatedTargets.push(target);
    },
  });

  await runtime.showMarkdownPanel({
    name: "Photon App",
    markdownPath: "reference/priorities/app-photon/priorities.md",
    markdownColumns: 1,
  });

  const link = {
    getAttribute(name) {
      return name === "href" ? "../mapping-benchmarks/analysis/malus-law.md" : null;
    },
  };
  const event = {
    defaultPrevented: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    target: {
      closest(selector) {
        return selector === "a[href]" ? link : null;
      },
    },
  };

  assert.equal(typeof clickHandler, "function");
  await clickHandler(event);

  assert.equal(event.defaultPrevented, true);
  assert.deepEqual(navigatedTargets, [
    "reference/priorities/mapping-benchmarks/analysis/malus-law.md",
  ]);
});

test("markdown heading links open the owning definition section", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  let clickHandler = null;
  const navigatedTargets = [];

  globalThis.fetch = async () => ({
    ok: true,
    async text() {
      return "# Two-Dimensional Braid Assemblies";
    },
  });
  globalThis.window = {};

  t.after(() => {
    globalThis.fetch = originalFetch;
    globalThis.window = originalWindow;
  });

  const markdownBody = createFakeElement();
  markdownBody.addEventListener = (type, handler) => {
    if (type === "click") {
      clickHandler = handler;
    }
  };
  const runtime = createMarkdownRuntime({
    markdownPanel: createFakeElement(),
    markdownBody,
    markdownLayoutToggle: createFakeElement(),
    markdownRenderer: null,
    markdownCache: new Map(),
    markdownSectionCache: new Map(),
    extractMarkdownSection: () => null,
    appendCacheBust: (path) => path,
    navigateToTarget(target) {
      navigatedTargets.push(target);
    },
  });

  await runtime.showMarkdownPanel({
    name: "Two-Dimensional Braid Assemblies",
    markdownPath: "content/markdown/aaa/noether-braid/2d-braid-assemblies.md",
    markdownColumns: 1,
  });

  const link = {
    getAttribute(name) {
      return name === "href"
        ? "../foundations/architrino.md#the-condition-that-picks-out-a-causal-root"
        : null;
    },
  };
  const event = {
    defaultPrevented: false,
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    target: {
      closest(selector) {
        return selector === "a[href]" ? link : null;
      },
    },
  };

  assert.equal(typeof clickHandler, "function");
  await clickHandler(event);

  assert.equal(event.defaultPrevented, true);
  assert.deepEqual(navigatedTargets, [
    "runtime:markdown:reader:content/markdown/aaa/foundations/architrino.md::the-condition-that-picks-out-a-causal-root",
  ]);
});

test("PDF toolbar button opens markdown before invoking browser print", async (t) => {
  const originalWindow = globalThis.window;
  const printCalls = [];
  const shownLevels = [];
  const markdownPdfButton = createFakeButton();
  const currentLevel = {
    name: "Textbook Markdown to PDF",
    markdownPath: "content/markdown/aaa/archie/download-textbook-pdf.md",
  };

  globalThis.window = {
    setTimeout(callback) {
      callback();
      return 1;
    },
  };

  t.after(() => {
    globalThis.window = originalWindow;
  });

  const runtime = createScenePanelUiRuntime({
    markdownPdfButton,
    markdownRuntime: {
      printMarkdownPanel() {
        printCalls.push(shownLevels.length);
        return shownLevels.length > 0;
      },
      async showMarkdownPanel(level) {
        shownLevels.push(level);
      },
    },
    getCurrentLevel: () => currentLevel,
    isTransitionActive: () => false,
  });

  runtime.wireListeners();
  await markdownPdfButton.click();

  assert.deepEqual(shownLevels, [currentLevel]);
  assert.deepEqual(printCalls, [0, 1]);
});

test("whole document toolbar button clears runtime section identity", async () => {
  const shownLevels = [];
  const markdownDocButton = createFakeButton();
  const currentLevel = {
    id: "runtime:markdown:reader:content/markdown/aaa/example.md::Section%20One",
    name: "Section One",
    markdownPath: "content/markdown/aaa/example.md",
    markdownSection: "Section One",
    markdownColumns: 1,
  };

  const runtime = createScenePanelUiRuntime({
    markdownDocButton,
    markdownRuntime: {
      showMarkdownPanel(level) {
        shownLevels.push(level);
      },
    },
    getCurrentLevel: () => currentLevel,
    isTransitionActive: () => false,
  });

  runtime.wireListeners();
  await markdownDocButton.click();

  assert.equal(shownLevels.length, 1);
  assert.equal(shownLevels[0].id, "");
  assert.equal(shownLevels[0].markdownPath, "content/markdown/aaa/example.md");
  assert.equal(shownLevels[0].markdownSection, null);
});

test("whole document toolbar button toggles an open current document", async () => {
  let active = false;
  let hideCalls = 0;
  const shownLevels = [];
  const markdownDocButton = createFakeButton();
  const currentLevel = {
    name: "Hyde Periodic Table",
    markdownPath: "content/markdown/aaa/nuclear-atomic/hyde-periodic-table.md",
    markdownAutoOpen: false,
  };

  const runtime = createScenePanelUiRuntime({
    markdownDocButton,
    markdownRuntime: {
      isActiveLevelMarkdown(level) {
        return active && level.markdownPath === currentLevel.markdownPath;
      },
      hideMarkdownPanel() {
        active = false;
        hideCalls += 1;
      },
      showMarkdownPanel(level) {
        active = true;
        shownLevels.push(level);
      },
    },
    getCurrentLevel: () => currentLevel,
    isTransitionActive: () => false,
  });

  runtime.wireListeners();
  await markdownDocButton.click();
  await markdownDocButton.click();

  assert.deepEqual(shownLevels, [currentLevel]);
  assert.equal(hideCalls, 1);
});

test("outside pointer closes an open markdown panel", async () => {
  const documentLike = createFakeEventTarget();
  const markdownPanel = createFakeElement();
  const markdownDocButton = createFakeButton();
  let hideCalls = 0;
  let panelOpen = true;
  const runtime = createScenePanelUiRuntime({
    documentLike,
    markdownPanel,
    markdownDocButton,
    markdownRuntime: {
      isMarkdownPanelOpen() {
        return panelOpen;
      },
      hideMarkdownPanel() {
        panelOpen = false;
        hideCalls += 1;
      },
    },
    getCurrentLevel: () => ({}),
    isTransitionActive: () => false,
  });

  runtime.wireListeners();
  await documentLike.dispatch("pointerdown", { target: markdownPanel });
  await documentLike.dispatch("pointerdown", { target: markdownDocButton });
  await documentLike.dispatch("pointerdown", { target: { id: "outside" } });

  assert.equal(hideCalls, 1);
  assert.equal(panelOpen, false);
});

test("document-only markdown close returns through scene history", async () => {
  const markdownClose = createFakeButton();
  let hideCalls = 0;
  let returnCalls = 0;
  const currentLevel = {
    name: "Architrino",
    markdownPath: "content/markdown/aaa/foundations/architrino.md",
    markdownAutoOpen: true,
    nodes: [],
  };
  const runtime = createScenePanelUiRuntime({
    markdownClose,
    markdownRuntime: {
      hideMarkdownPanel() {
        hideCalls += 1;
      },
    },
    getCurrentLevel: () => currentLevel,
    isTransitionActive: () => false,
    async returnFromDocumentLevel() {
      returnCalls += 1;
      return true;
    },
  });

  runtime.updateMarkdownCloseAction();
  runtime.wireListeners();

  assert.equal(markdownClose.getAttribute("aria-label"), "Close document and return");
  assert.equal(markdownClose.title, "Close and return");
  await markdownClose.click();

  assert.equal(returnCalls, 1);
  assert.equal(hideCalls, 0);
});

test("PDF toolbar button downloads download-only markdown without opening print", async () => {
  const downloadCalls = [];
  const markdownPdfButton = createFakeButton();
  const currentLevel = {
    name: "Foundations",
    markdownPath: "content/generated/markdown/textbook/reading-copies/foundations.md",
    markdownDownloadOnly: true,
  };

  const runtime = createScenePanelUiRuntime({
    markdownPdfButton,
    markdownRuntime: {
      downloadMarkdownSource(level) {
        downloadCalls.push(level);
        return true;
      },
      printMarkdownPanel() {
        throw new Error("printMarkdownPanel should not run for download-only markdown");
      },
      async showMarkdownPanel() {
        throw new Error("showMarkdownPanel should not run for download-only markdown");
      },
    },
    getCurrentLevel: () => currentLevel,
    isTransitionActive: () => false,
  });

  runtime.wireListeners();
  await markdownPdfButton.click();

  assert.deepEqual(downloadCalls, [currentLevel]);
});
