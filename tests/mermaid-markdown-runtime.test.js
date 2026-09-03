import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  createMermaidMarkdownRuntime,
  isMermaidSvgSafe,
  mermaidSecurityConfig,
} from "../src/runtime/MermaidMarkdownRuntime.js";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));

function createClassList() {
  const classes = new Set();
  return {
    add(...tokens) {
      tokens.forEach((token) => classes.add(token));
    },
    remove(...tokens) {
      tokens.forEach((token) => classes.delete(token));
    },
    contains(token) {
      return classes.has(token);
    },
  };
}

function createElement(tagName) {
  const attributes = new Map();
  return {
    tagName: tagName.toUpperCase(),
    attributes,
    children: [],
    classList: createClassList(),
    dataset: {},
    className: "",
    hidden: false,
    innerHTML: "",
    open: false,
    textContent: "",
    appendChild(child) {
      this.children.push(child);
      child.parentElement = this;
      return child;
    },
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    replaceWith(replacement) {
      this.replacement = replacement;
    },
  };
}

function createDiagramFixture(source) {
  const documentLike = {
    createElement,
  };
  const pre = createElement("pre");
  const code = createElement("code");
  code.textContent = source;
  code.parentElement = pre;
  const markdownBody = {
    querySelectorAll(selector) {
      assert.equal(selector, "pre > code.language-mermaid");
      return [code];
    },
  };
  return { documentLike, markdownBody, pre, code };
}

test("Mermaid configuration locks down executable diagram features", () => {
  assert.equal(mermaidSecurityConfig.securityLevel, "strict");
  assert.equal(mermaidSecurityConfig.startOnLoad, false);
  assert.equal(mermaidSecurityConfig.htmlLabels, false);
  assert.equal(mermaidSecurityConfig.flowchart.htmlLabels, false);
  assert.equal(mermaidSecurityConfig.suppressErrorRendering, true);
  assert.ok(mermaidSecurityConfig.secure.includes("securityLevel"));
  assert.ok(mermaidSecurityConfig.secure.includes("flowchart"));
});

test("Mermaid SVG safety boundary rejects executable and external content", () => {
  assert.equal(
    isMermaidSvgSafe('<svg><path marker-end="url(#arrow)" d="M0 0L1 1"/></svg>'),
    true
  );
  assert.equal(isMermaidSvgSafe('<svg onload="alert(1)"></svg>'), false);
  assert.equal(isMermaidSvgSafe('<svg><script>alert(1)</script></svg>'), false);
  assert.equal(isMermaidSvgSafe('<svg><image href="https://example.com/a.png"/></svg>'), false);
  assert.equal(isMermaidSvgSafe("<svg></svg><p>outside the diagram</p>"), false);
  assert.equal(isMermaidSvgSafe('<svg><style>@import url(https://example.com/x)</style></svg>'), false);
});

test("valid Mermaid diagrams render while retaining a source fallback", async () => {
  const fixture = createDiagramFixture("flowchart LR\n  A --> B");
  let initializedWith = null;
  const renderer = {
    initialize(config) {
      initializedWith = config;
    },
    async render() {
      return { svg: '<svg aria-label="example"><path d="M0 0L1 1"/></svg>' };
    },
  };
  const runtime = createMermaidMarkdownRuntime({
    markdownBody: fixture.markdownBody,
    mermaidRenderer: renderer,
    documentLike: fixture.documentLike,
  });

  assert.deepEqual(await runtime.renderDiagrams(), ["rendered"]);
  assert.equal(initializedWith, mermaidSecurityConfig);
  const figure = fixture.pre.replacement;
  assert.equal(figure.dataset.mermaidState, "rendered");
  assert.equal(figure.children[0].hidden, false);
  assert.match(figure.children[0].innerHTML, /^<svg/);
  assert.equal(figure.children[1].hidden, true);
  assert.equal(figure.children[2].open, false);
  assert.equal(figure.children[2].children[1], fixture.pre);
});

test("Mermaid failures show the unchanged source and an understandable error", async () => {
  const fixture = createDiagramFixture("not a diagram");
  const runtime = createMermaidMarkdownRuntime({
    markdownBody: fixture.markdownBody,
    mermaidRenderer: {
      initialize() {},
      async render() {
        throw new Error("parse failure");
      },
    },
    documentLike: fixture.documentLike,
    logger: { warn() {} },
  });

  assert.deepEqual(await runtime.renderDiagrams(), ["error"]);
  const figure = fixture.pre.replacement;
  assert.equal(figure.dataset.mermaidState, "error");
  assert.equal(figure.children[0].hidden, true);
  assert.equal(figure.children[1].textContent, "Diagram could not be rendered. Source is shown below.");
  assert.equal(figure.children[2].open, true);
  assert.equal(fixture.code.textContent, "not a diagram");
});

test("the shipped Mermaid dependency, browser asset, and license share one pinned version", () => {
  const packageJson = JSON.parse(readFileSync(`${repoRoot}/package.json`, "utf8"));
  const packageLock = JSON.parse(readFileSync(`${repoRoot}/package-lock.json`, "utf8"));
  const mermaidAsset = readFileSync(`${repoRoot}/vendor/mermaid/mermaid.min.js`, "utf8");
  const mermaidLicense = readFileSync(`${repoRoot}/vendor/mermaid/LICENSE.txt`, "utf8");
  const mermaidSource = readFileSync(`${repoRoot}/vendor/mermaid/SOURCE.md`, "utf8");
  const technologyAcknowledgement = readFileSync(
    `${repoRoot}/content/markdown/aaa/archie/about-the-webapp.md`,
    "utf8"
  );
  const licenseAttribution = readFileSync(
    `${repoRoot}/content/markdown/aaa/archie/licenses-attributions.md`,
    "utf8"
  );
  const runtimeSha256 = createHash("sha256").update(mermaidAsset).digest("hex");
  const licenseSha256 = createHash("sha256").update(mermaidLicense).digest("hex");

  assert.equal(packageJson.dependencies.mermaid, "11.17.2");
  assert.equal(packageLock.packages["node_modules/mermaid"].version, "11.17.2");
  assert.equal(
    packageLock.packages["node_modules/mermaid"].integrity,
    "sha512-V6K3C8EBdEsPFZXSKMJe6ppQOENxuHARr9GvHX4hh47lAbhMRD9qf4oEK7LoaRQxULMa80/qt5gHO73aCleBBg=="
  );
  assert.match(mermaidAsset, /11\.17\.2/u);
  assert.match(mermaidLicense, /Copyright \(c\) 2014 - 2022 Knut Sveidqvist/u);
  assert.match(
    mermaidSource,
    /sha512-V6K3C8EBdEsPFZXSKMJe6ppQOENxuHARr9GvHX4hh47lAbhMRD9qf4oEK7LoaRQxULMa80\/qt5gHO73aCleBBg==/u
  );
  assert.match(
    mermaidSource,
    /32f3c1c5cdb397f83f21665b9e741ca68eca908ca689f25ed27435edde72d073/u
  );
  assert.equal(runtimeSha256, "32f3c1c5cdb397f83f21665b9e741ca68eca908ca689f25ed27435edde72d073");
  assert.equal(licenseSha256, "ec9fb67dcb25eccc416ed56e1aab819222c805a2a4bfe4cb19e7556bf2ffde80");
  assert.match(technologyAcknowledgement, /Mermaid for rendering diagrams authored in fenced Mermaid blocks/u);
  assert.match(licenseAttribution, /Mermaid 11\.17\.2 diagram runtime: MIT License/u);
  assert.match(licenseAttribution, /vendor\/mermaid\/SOURCE\.md/u);
});
