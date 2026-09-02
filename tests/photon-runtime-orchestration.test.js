import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { createDefaultPhotonState } from "../src/apps/photon/PhotonStateRuntime.js";
import { createPhotonRuntime } from "../src/apps/photon/PhotonRuntime.js";
import { serializePhotonSearchResults } from "../src/apps/photon/PhotonSearchRuntime.js";

const PHOTON_HTML_SOURCE = readFileSync(new URL("../photon.html", import.meta.url), "utf8");
const PHOTON_RUNTIME_SOURCE = readFileSync(
  new URL("../src/apps/photon/PhotonRuntime.js", import.meta.url),
  "utf8"
);

test("Photon keeps its inspector left of the canvas while preserving compact stacking", () => {
  assert.match(
    PHOTON_HTML_SOURCE,
    /#photon-app\s*\{[^}]*grid-template-columns:\s*400px minmax\(0, 1fr\);[^}]*grid-template-areas:\s*"inspector main";/s
  );
  assert.match(PHOTON_HTML_SOURCE, /\.photon-main\s*\{[^}]*grid-area:\s*main;/s);
  assert.match(PHOTON_HTML_SOURCE, /\.photon-inspector\s*\{[^}]*grid-area:\s*inspector;/s);
  assert.match(
    PHOTON_HTML_SOURCE,
    /#photon-markdown-panel\s*\{[^}]*left:\s*414px;[^}]*width:\s*min\(760px, calc\(100vw - 436px\)\);/s
  );
  assert.match(
    PHOTON_HTML_SOURCE,
    /@media \(max-width:\s*980px\)[\s\S]*?#photon-app\s*\{[^}]*grid-template-columns:\s*1fr;[^}]*grid-template-areas:\s*"main"\s*"inspector";/s
  );
});

test("Photon mounts the canonical standalone navigation runtime", () => {
  assert.match(
    PHOTON_HTML_SOURCE,
    /href="\.\/src\/runtime\/top-dynamic-control-bar\.css"/
  );
  assert.match(PHOTON_HTML_SOURCE, /<div id="scene-hud-tools" class="photon-navigation"><\/div>/);
  assert.doesNotMatch(PHOTON_HTML_SOURCE, /src\/apps\/navigator\/standalone-app-navigation\.css/);
  assert.doesNotMatch(
    PHOTON_HTML_SOURCE,
    /id="(?:textbook-toc-button|nav-up|nav-forward|home-button|scene-search-toggle)"/,
  );
  assert.doesNotMatch(PHOTON_HTML_SOURCE, /id="photon-home-button"/);
  assert.match(PHOTON_RUNTIME_SOURCE, /createStandaloneAppNavigationRuntime/);
  assert.doesNotMatch(PHOTON_RUNTIME_SOURCE, /createStandaloneAppSceneSearchRuntime/);
  assert.doesNotMatch(PHOTON_RUNTIME_SOURCE, /navigateStandaloneAppHome/);
});

class FakeEventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener, options) {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
    options?.signal?.addEventListener(
      "abort",
      () => this.removeEventListener(type, listener),
      { once: true }
    );
  }

  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  dispatch(type, event = {}) {
    const payload = {
      type,
      target: event.target ?? this,
      preventDefault() {
        this.defaultPrevented = true;
      },
      ...event,
    };
    for (const listener of this.listeners.get(type) ?? []) {
      listener(payload);
    }
    return payload;
  }

  listenerCount(type) {
    return this.listeners.get(type)?.size ?? 0;
  }
}

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(...names) {
    names.forEach((name) => this.values.add(name));
  }

  remove(...names) {
    names.forEach((name) => this.values.delete(name));
  }

  contains(name) {
    return this.values.has(name);
  }

  toggle(name, force) {
    const enabled = force === undefined ? !this.values.has(name) : Boolean(force);
    if (enabled) {
      this.values.add(name);
    } else {
      this.values.delete(name);
    }
    return enabled;
  }
}

function createFakeCanvasContext() {
  const context = new Proxy(
    {
      measureText(text) {
        return { width: String(text ?? "").length * 7 };
      },
      createLinearGradient() {
        return { addColorStop() {} };
      },
    },
    {
      get(target, key) {
        if (!(key in target)) {
          target[key] = () => {};
        }
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      },
    }
  );
  return context;
}

class FakeElement extends FakeEventTarget {
  constructor(tagName, ownerDocument) {
    super();
    this.tagName = String(tagName).toUpperCase();
    this.ownerDocument = ownerDocument;
    this.children = [];
    this.parentElement = null;
    this.dataset = {};
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.style = {
      setProperty() {},
      removeProperty() {},
    };
    this._textContent = "";
    this._value = "";
    this.width = 0;
    this.height = 0;
    this.hidden = false;
    this.disabled = false;
    this.checked = false;
    this.inert = false;
    this.files = [];
    this.context = this.tagName === "CANVAS" ? createFakeCanvasContext() : null;
  }

  set className(value) {
    this.classList = new FakeClassList();
    String(value ?? "").split(/\s+/).filter(Boolean).forEach((name) => this.classList.add(name));
  }

  get className() {
    return [...this.classList.values].join(" ");
  }

  set textContent(value) {
    this._textContent = String(value ?? "");
    if (this._textContent === "") {
      this.children = [];
    }
  }

  get textContent() {
    return this._textContent;
  }

  set value(value) {
    this._value = String(value ?? "");
  }

  get value() {
    return this._value;
  }

  get options() {
    return this.children;
  }

  get selectedIndex() {
    const index = this.children.findIndex((child) => child.value === this.value);
    return index >= 0 ? index : 0;
  }

  append(...children) {
    children.flat().forEach((child) => {
      if (child === null || child === undefined) {
        return;
      }
      child.parentElement = this;
      this.children.push(child);
    });
  }

  appendChild(child) {
    this.append(child);
    return child;
  }

  replaceChildren(...children) {
    this.children.forEach((child) => {
      child.parentElement = null;
    });
    this.children = [];
    this.append(...children);
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  contains(target) {
    return target === this || this.children.some((child) => child.contains?.(target));
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  getBoundingClientRect() {
    return {
      width: this.tagName === "CANVAS" ? 480 : 200,
      height: this.tagName === "CANVAS" ? 260 : 32,
      top: 0,
      left: 0,
    };
  }

  getContext() {
    return this.context;
  }

  click() {
    this.dispatch("click");
  }

  blur() {}

  focus() {}

  remove() {
    if (!this.parentElement) {
      return;
    }
    this.parentElement.children = this.parentElement.children.filter((child) => child !== this);
    this.parentElement = null;
  }
}

class FakeDocument extends FakeEventTarget {
  constructor() {
    super();
    this.title = "Photon test";
    this.defaultView = null;
    this.body = new FakeElement("body", this);
    this.elements = new Map();
    [
      ["#photon-stage-canvas", "canvas"],
      ["#photon-electric-field-canvas", "canvas"],
      ["#photon-polarization-canvas", "canvas"],
      ["#photon-controls", "div"],
      ["#photon-diagnostics", "div"],
      ["#photon-formulas", "div"],
      ["#scene-hud-tools", "div"],
      ["#textbook-toc-button", "button"],
      ["#nav-up", "button"],
      ["#nav-forward", "button"],
      ["#home-button", "button"],
      ["#scene-search", "div"],
      ["#scene-search-toggle", "button"],
      ["#scene-search-panel", "div"],
      ["#scene-search-input", "input"],
      ["#scene-search-results", "div"],
      ["#photon-guide-doc-button", "button"],
      ["#photon-closure-doc-button", "button"],
      ["#photon-polarization-gate-doc-button", "button"],
      ["#photon-project-doc-button", "button"],
      ["#photon-markdown-panel", "aside"],
      ["#photon-markdown-title", "h2"],
      ["#photon-markdown-content", "div"],
      ["#photon-markdown-body", "div"],
      ["#photon-markdown-close", "button"],
      ["#photon-markdown-layout-toggle", "button"],
      ["#photon-markdown-pdf-button", "button"],
    ].forEach(([selector, tag]) => {
      this.elements.set(selector, new FakeElement(tag, this));
    });
    this.timeOutput = new FakeElement("output", this);
    this.cycleOutput = new FakeElement("output", this);
  }

  createElement(tagName) {
    return new FakeElement(tagName, this);
  }

  createTextNode(text) {
    const node = new FakeElement("#text", this);
    node.textContent = text;
    return node;
  }

  querySelector(selector) {
    return this.elements.get(selector) ?? null;
  }

  querySelectorAll(selector) {
    if (selector === ".photon-time-output") {
      return [this.timeOutput];
    }
    if (selector === ".photon-cycle-output") {
      return [this.cycleOutput];
    }
    return [];
  }
}

class FakeWindow extends FakeEventTarget {
  constructor(documentLike) {
    super();
    this.document = documentLike;
    this.locationAssignments = [];
    this.location = {
      href: "http://127.0.0.1/photon.html",
      assign: (href) => {
        this.locationAssignments.push(href);
        this.location.href = href;
      },
    };
    this.historyBackCalls = 0;
    this.historyForwardCalls = 0;
    this.history = {
      back: () => {
        this.historyBackCalls += 1;
      },
      forward: () => {
        this.historyForwardCalls += 1;
      },
    };
    this.devicePixelRatio = 1;
    this.innerHeight = 900;
    this.performance = { now: () => 10_000 };
    this.nextAnimationFrameId = 1;
    this.animationFrames = new Map();
    this.setTimeout = setTimeout;
    this.clearTimeout = clearTimeout;
    this.fetch = async () => ({
      ok: true,
      async json() {
        return { searchEntries: [] };
      },
    });
  }

  requestAnimationFrame(callback) {
    const id = this.nextAnimationFrameId;
    this.nextAnimationFrameId += 1;
    this.animationFrames.set(id, callback);
    return id;
  }

  cancelAnimationFrame(id) {
    this.animationFrames.delete(id);
  }
}

function createEmptyAbsoluteHistoryResponse(request) {
  return {
    transmitterRootResponses: request.transmitterRootRequests.map(
      (transmitterRootRequest, requestIndex) => ({
        requestIndex,
        transmitterRef: transmitterRootRequest.transmitterRef,
        roots: [],
        status: { code: "no_roots", severity: "warning" },
      })
    ),
    observerField: {
      schema: "prescribed-path-analysis/moving-circular-observer-field.v2",
      contributions: [],
      averageDelay: 0,
      delaySolveGapMax: 0,
      maxTransmitterSpeedRatio: 0,
      jacobianAbsMin: 0,
      unstableContributionCount: 0,
      nearestTransmitterDistance: 0,
    },
  };
}

function createDeferred() {
  let resolve;
  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

test("photon runtime is re-init safe and merges imports made during an in-flight search", async () => {
  const documentLike = new FakeDocument();
  const windowLike = new FakeWindow(documentLike);
  documentLike.defaultView = windowLike;
  const deferredSearch = createDeferred();
  let searchCalls = 0;
  const runtime = createPhotonRuntime({
    documentLike,
    windowLike,
    prescribedPathAnalysisOptions: {
      solveMovingCircularAbsoluteHistoryRun: async (request) =>
        createEmptyAbsoluteHistoryResponse(request),
    },
    configurationSearchFactory: async () => {
      searchCalls += 1;
      return deferredSearch.promise;
    },
  });

  runtime.init();
  runtime.init();
  assert.equal(windowLike.animationFrames.size, 1);
  assert.equal(documentLike.listenerCount("keydown"), 1);

  const firstSearch = runtime.runConfigurationSearch();
  const secondSearch = runtime.runConfigurationSearch();
  assert.equal(firstSearch, secondSearch);
  assert.equal(searchCalls, 0);

  const importedState = createDefaultPhotonState();
  const importedJson = serializePhotonSearchResults([
    {
      id: "exported-id",
      name: "Imported while searching",
      selected: false,
      state: importedState,
    },
  ]);
  await runtime.importSearchResults(importedJson);

  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(searchCalls, 1);
  deferredSearch.resolve([
    {
      id: "factory-id",
      name: "Search completion",
      selected: true,
      state: createDefaultPhotonState(),
    },
  ]);
  await firstSearch;

  const results = runtime.getSearchResults();
  assert.equal(results.length, 2);
  assert.equal(new Set(results.map((result) => result.id)).size, 2);
  assert.equal(
    results.find((result) => result.name === "Imported while searching").selected,
    false
  );

  const beforeSpace = runtime.getState().time.paused;
  documentLike.querySelector("#photon-markdown-panel").classList.add("is-open");
  documentLike.dispatch("keydown", { code: "Space" });
  assert.equal(runtime.getState().time.paused, beforeSpace);
  documentLike.querySelector("#photon-markdown-panel").classList.remove("is-open");
  documentLike.dispatch("keydown", { code: "Space" });
  assert.equal(runtime.getState().time.paused, !beforeSpace);

  runtime.destroy();
  assert.equal(windowLike.animationFrames.size, 0);
  assert.equal(documentLike.listenerCount("keydown"), 0);
  assert.equal(documentLike.listenerCount("click"), 0);
  assert.equal(documentLike.querySelector("#home-button").listenerCount("click"), 0);

  runtime.init();
  assert.equal(windowLike.animationFrames.size, 1);
  runtime.destroy();
});

test("photon runtime backs off after a solver failure instead of retrying every draw", async () => {
  const documentLike = new FakeDocument();
  const windowLike = new FakeWindow(documentLike);
  documentLike.defaultView = windowLike;
  let solveCalls = 0;
  const runtime = createPhotonRuntime({
    documentLike,
    windowLike,
    prescribedPathAnalysisOptions: {
      async solveMovingCircularAbsoluteHistoryRun() {
        solveCalls += 1;
        throw new Error("synthetic solver outage");
      },
    },
  });

  runtime.init();
  await new Promise((resolve) => setTimeout(resolve, 20));
  const callsAfterFailure = solveCalls;
  assert.ok(callsAfterFailure > 0);

  for (let index = 0; index < 8; index += 1) {
    runtime.draw();
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(solveCalls, callsAfterFailure);

  runtime.destroy();
});

test("photon runtime keeps readout DOM stable while the solver snapshot is unchanged", async () => {
  const documentLike = new FakeDocument();
  const windowLike = new FakeWindow(documentLike);
  documentLike.defaultView = windowLike;
  const runtime = createPhotonRuntime({
    documentLike,
    windowLike,
    prescribedPathAnalysisOptions: {
      solveMovingCircularAbsoluteHistoryRun: async (request) =>
        createEmptyAbsoluteHistoryResponse(request),
    },
  });

  runtime.init();
  await new Promise((resolve) => setTimeout(resolve, 30));
  const diagnostics = documentLike.querySelector("#photon-diagnostics");
  assert.ok(diagnostics.children.length > 2);
  const firstRow = diagnostics.children[0];

  runtime.draw();
  runtime.draw();
  assert.equal(diagnostics.children[0], firstRow);

  runtime.destroy();
});
