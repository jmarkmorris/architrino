import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { createStandaloneAppNavigationRuntime } from "../src/apps/navigator/StandaloneAppNavigationRuntime.js";

class FakeEventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, handler) {
    const handlers = this.listeners.get(type) ?? new Set();
    handlers.add(handler);
    this.listeners.set(type, handlers);
  }

  removeEventListener(type, handler) {
    this.listeners.get(type)?.delete(handler);
  }

  dispatch(type, event = {}) {
    for (const handler of this.listeners.get(type) ?? []) {
      handler({ type, target: this, ...event });
    }
  }

  listenerCount(type) {
    return this.listeners.get(type)?.size ?? 0;
  }
}

class FakeElement extends FakeEventTarget {
  constructor(tagName, ownerDocument) {
    super();
    this.tagName = String(tagName).toUpperCase();
    this.ownerDocument = ownerDocument;
    this.parentElement = null;
    this.children = [];
    this.attributes = new Map();
    this._classes = new Set();
    this._className = "";
    this.id = "";
    this.type = "";
    this.title = "";
    this.textContent = "";
    this.innerHTML = "";
    this.value = "";
    this.placeholder = "";
    this.autocomplete = "";
    this.disabled = false;
    this.inert = false;
    this.classList = {
      add: (...tokens) => {
        tokens.forEach((token) => this._classes.add(token));
        this.#syncClassName();
      },
      remove: (...tokens) => {
        tokens.forEach((token) => this._classes.delete(token));
        this.#syncClassName();
      },
      contains: (token) => this._classes.has(token),
      toggle: (token, force) => {
        const enabled = force === undefined ? !this._classes.has(token) : Boolean(force);
        if (enabled) {
          this._classes.add(token);
        } else {
          this._classes.delete(token);
        }
        this.#syncClassName();
        return enabled;
      },
    };
  }

  #syncClassName() {
    this._className = [...this._classes].join(" ");
  }

  set className(value) {
    this._className = String(value ?? "");
    this._classes = new Set(this._className.split(/\s+/u).filter(Boolean));
  }

  get className() {
    return this._className;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  replaceChildren(...children) {
    this.children.forEach((child) => {
      child.parentElement = null;
    });
    this.children = [];
    children.forEach((child) => this.appendChild(child));
  }

  contains(target) {
    return target === this || this.children.some((child) => child.contains(target));
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

  focus() {
    this.ownerDocument.activeElement = this;
  }
}

class FakeDocument extends FakeEventTarget {
  constructor() {
    super();
    this.activeElement = null;
  }

  createElement(tagName) {
    return new FakeElement(tagName, this);
  }
}

class FakeWindow extends FakeEventTarget {
  constructor() {
    super();
    this.assignments = [];
    this.location = {
      href: "http://127.0.0.1:5173/lattice-lab.html",
      assign: (href) => this.assignments.push(href),
    };
    this.backCalls = 0;
    this.forwardCalls = 0;
    this.history = {
      back: () => {
        this.backCalls += 1;
      },
      forward: () => {
        this.forwardCalls += 1;
      },
    };
    const stored = new Map();
    this.sessionStorage = {
      getItem: (key) => stored.get(key) ?? null,
      setItem: (key, value) => stored.set(key, String(value)),
      removeItem: (key) => stored.delete(key),
    };
  }
}

function createFixture(options = {}) {
  const documentLike = new FakeDocument();
  const windowLike = new FakeWindow();
  const host = documentLike.createElement("div");
  let searchDeps = null;
  const searchEvents = [];
  const sceneSearchFactory = (deps) => {
    searchDeps = deps;
    return {
      init() {
        searchEvents.push("init");
        return this;
      },
      destroy() {
        searchEvents.push("destroy");
      },
      sceneSearchRuntime: {
        setSearchOpen(isOpen) {
          searchEvents.push(isOpen ? "set-open" : "set-closed");
          deps.onOpenChange(isOpen);
        },
      },
      sceneSearchCoordinator: {
        async ensureSceneIndex() {
          searchEvents.push("ensure-index");
        },
        async openSearchPanel() {
          searchEvents.push("open");
          deps.onOpenChange(true);
        },
        closeSearchPanel() {
          searchEvents.push("close");
          deps.onOpenChange(false);
        },
      },
    };
  };
  const runtime = createStandaloneAppNavigationRuntime({
    host,
    document: documentLike,
    window: windowLike,
    sceneSearchFactory,
    ...options,
  });
  return { documentLike, windowLike, host, runtime, searchEvents, getSearchDeps: () => searchDeps };
}

test("standalone adapter builds the canonical full bar and owns global actions", async () => {
  const openChanges = [];
  const { documentLike, host, runtime, windowLike, searchEvents, getSearchDeps } = createFixture({
    search: {
      onOpenChange(isOpen) {
        openChanges.push(isOpen);
      },
    },
  });
  runtime.init();

  assert.equal(host.classList.contains("top-dynamic-control-bar"), true);
  assert.equal(host.classList.contains("is-standalone"), true);
  assert.deepEqual(host.children.map((child) => child.id), [
    "textbook-toc-button",
    "scene-nav-history",
    "home-button",
    "scene-search",
  ]);
  assert.equal(getSearchDeps().topDynamicControlBarRuntime, runtime.topDynamicControlBarRuntime);
  assert.equal(getSearchDeps().topBarOwnsPopover, true);

  runtime.getElement("toc").dispatch("click");
  runtime.getElement("back").dispatch("click");
  runtime.getElement("forward").dispatch("click");
  runtime.getElement("home").dispatch("click");
  runtime.getElement("search").dispatch("click");
  await Promise.resolve();
  await Promise.resolve();

  assert.match(windowLike.assignments[0], /textbook_toc\.json/u);
  assert.match(windowLike.assignments[1], /applications\.json/u);
  assert.equal(windowLike.backCalls, 1);
  assert.equal(windowLike.forwardCalls, 1);
  assert.deepEqual(searchEvents, ["init", "ensure-index", "set-open"]);
  assert.deepEqual(openChanges, [true]);
  assert.equal(runtime.getElement("search").getAttribute("aria-expanded"), "true");
  assert.equal(runtime.topDynamicControlBarRuntime.getPopoverInput("search"), documentLike.activeElement);

  runtime.getElement("search").dispatch("click");
  await Promise.resolve();
  assert.deepEqual(searchEvents, ["init", "ensure-index", "set-open", "close"]);
  assert.deepEqual(openChanges, [true, false]);

  runtime.destroy();
  assert.deepEqual(searchEvents, ["init", "ensure-index", "set-open", "close", "destroy"]);
  assert.equal(host.children.length, 0);
  assert.equal(host.classList.contains("is-standalone"), false);
});

test("standalone adapter omits unavailable capabilities and accepts canonical extensions", () => {
  const { host, runtime, getSearchDeps } = createFixture({
    toc: false,
    back: false,
    forward: false,
    search: false,
    extensionActions: [
      {
        kind: "settings",
        id: "settings-button",
        label: "Open settings",
        onActivate() {},
      },
    ],
  });
  runtime.init();

  assert.deepEqual(host.children.map((child) => child.id), ["home-button", "settings-button"]);
  assert.equal(getSearchDeps(), null);
  runtime.destroy();
});

test("migrated standalone apps atomically replace static bars with canonical hosts", () => {
  for (const [htmlPath, runtimePath, hostClass] of [
    ["lattice-lab.html", "src/apps/lattice-lab/LatticeLabRuntime.js", "lattice-lab-navigation"],
    ["topo.html", "src/apps/topo/TopoInteractionContractRuntime.js", "topo-navigation"],
    ["photon.html", "src/apps/photon/PhotonRuntime.js", "photon-navigation"],
    ["causal-delay-feedback.html", "src/apps/causal-delay-feedback/CausalDelayFeedbackRuntime.js", "causal-navigation"],
    ["greek-letter-match.html", "src/apps/greek-letter-match/GreekLetterMatchRuntime.js", "greek-match-navigation"],
    ["equation-mapping.html", "src/apps/equation-mapping/EquationMappingRuntime.js", "equation-mapping-navigation"],
    ["pdgedit.html", "src/apps/pdgedit/PdgeditAppRuntime.js", "pdgedit-navigation"],
    ["molecule.html", "src/apps/molecule/MoleculeRuntime.js", "molecule-navigation"],
    ["ideal-braid.html", "src/apps/ideal-braid/IdealBraidRuntime.js", "ideal-braid-navigation"],
    ["borg.html", "src/apps/borg/BorgAppRuntime.js", "borg-webapp-navigation"],
    ["borg-library.html", "src/apps/borg/library/main.js", "borg-library-navigation"],
  ]) {
    const html = readFileSync(new URL(`../${htmlPath}`, import.meta.url), "utf8");
    const runtimeSource = readFileSync(new URL(`../${runtimePath}`, import.meta.url), "utf8");
    assert.match(html, new RegExp(`<div id="scene-hud-tools" class="${hostClass}"><\\/div>`));
    assert.match(html, /src\/runtime\/top-dynamic-control-bar\.css/u);
    assert.doesNotMatch(html, /src\/apps\/navigator\/standalone-app-navigation\.css/u);
    assert.doesNotMatch(
      html,
      /id="(?:textbook-toc-button|nav-up|nav-forward|home-button|scene-search-toggle)"/u,
    );
    assert.match(runtimeSource, /createStandaloneAppNavigationRuntime/u);
    assert.doesNotMatch(runtimeSource, /createStandaloneAppSceneSearchRuntime/u);
  }
});

test("Braid Search creates one empty host and delegates the global bar to the canonical adapter", () => {
  const html = readFileSync(new URL("../braid-search.html", import.meta.url), "utf8");
  const runtimeSource = readFileSync(
    new URL("../src/apps/braid-search/BraidSearchRuntime.js", import.meta.url),
    "utf8",
  );

  assert.match(html, /src\/runtime\/top-dynamic-control-bar\.css/u);
  assert.doesNotMatch(html, /standalone-app-navigation\.css/u);
  assert.match(runtimeSource, /navigationHost\.id = "scene-hud-tools"/u);
  assert.match(runtimeSource, /createStandaloneAppNavigationRuntime/u);
  assert.doesNotMatch(runtimeSource, /createStandaloneAppSceneSearchRuntime/u);
  assert.doesNotMatch(runtimeSource, /function createStandaloneNavigation/u);
});
