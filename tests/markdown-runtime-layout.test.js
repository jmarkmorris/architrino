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

function createFakeButton() {
  let clickHandler = null;
  return {
    addEventListener(type, handler) {
      if (type === "click") {
        clickHandler = handler;
      }
    },
    click() {
      return clickHandler?.();
    },
  };
}

function createFakeDocument() {
  const clickedLinks = [];
  return {
    clickedLinks,
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
      return "# Photon App\n\n[Malus' law](../cross-theory-mapping/malus-law.md)";
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
    markdownPath: "reference/priorities/photon-app/photon-app.md",
    markdownColumns: 1,
  });

  const link = {
    getAttribute(name) {
      return name === "href" ? "../cross-theory-mapping/malus-law.md" : null;
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
    "reference/priorities/cross-theory-mapping/malus-law.md",
  ]);
});

test("PDF toolbar button opens markdown before invoking browser print", async (t) => {
  const originalWindow = globalThis.window;
  const printCalls = [];
  const shownLevels = [];
  const markdownPdfButton = createFakeButton();
  const currentLevel = {
    name: "Textbook Markdown to PDF",
    markdownPath: "content/markdown/aaa/archie/textbook-pdf-snapshots.md",
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
