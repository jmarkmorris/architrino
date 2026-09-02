import assert from "node:assert/strict";
import test from "node:test";
import {
  SHARED_ACTION_ORDER,
  createTopDynamicControlBar,
} from "../src/runtime/TopDynamicControlBarRuntime.js";

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
    this.hidden = false;
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
        const next = force === undefined ? !this._classes.has(token) : Boolean(force);
        if (next) {
          this._classes.add(token);
        } else {
          this._classes.delete(token);
        }
        this.#syncClassName();
        return next;
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
    if (child.parentElement) {
      child.parentElement.children = child.parentElement.children.filter((entry) => entry !== child);
    }
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
    if (target === this) {
      return true;
    }
    return this.children.some((child) => child.contains(target));
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

class FakeWindow extends FakeEventTarget {}

function action(kind, overrides = {}) {
  return {
    kind,
    id: `${kind}-button`,
    label: `${kind} action`,
    onActivate() {},
    ...overrides,
  };
}

function createFixture(actions) {
  const documentLike = new FakeDocument();
  const windowLike = new FakeWindow();
  const host = documentLike.createElement("div");
  const runtime = createTopDynamicControlBar({
    host,
    label: "Scene controls",
    actions,
    document: documentLike,
    window: windowLike,
  });
  return { documentLike, windowLike, host, runtime };
}

test("shared runtime creates the accepted order, grouping, icons, and labels", () => {
  const { host, runtime } = createFixture([
    action("toc", { id: "textbook-toc-button", label: "Open textbook table of contents" }),
    action("back", { id: "nav-up", label: "Go back" }),
    action("forward", { id: "nav-forward", label: "Go forward" }),
    action("home", { id: "home-button", label: "Go to home" }),
    action("search", {
      id: "scene-search-toggle",
      label: "Search scenes",
      popover: {
        containerId: "scene-search",
        id: "scene-search-panel",
        input: { id: "scene-search-input", placeholder: "Search scenes" },
        resultsId: "scene-search-results",
      },
    }),
  ]);

  assert.equal(host.getAttribute("role"), "toolbar");
  assert.equal(host.getAttribute("aria-label"), "Scene controls");
  assert.deepEqual(host.children.map((element) => element.id), [
    "textbook-toc-button",
    "scene-nav-history",
    "home-button",
    "scene-search",
  ]);
  assert.deepEqual(host.children[1].children.map((element) => element.id), ["nav-up", "nav-forward"]);
  assert.equal(runtime.getElement("toc").textContent, "TOC");
  assert.match(runtime.getElement("home").children[0].innerHTML, /M3 11\.5L12 4/u);
  assert.equal(runtime.getElement("search").getAttribute("aria-controls"), "scene-search-panel");
  assert.equal(runtime.getPopoverInput("search").placeholder, "Search scenes");
});

test("shared runtime rejects duplicate, unknown, unlabeled, unwired, and misordered actions", () => {
  const documentLike = new FakeDocument();
  const host = documentLike.createElement("div");
  const create = (actions) => createTopDynamicControlBar({ host, actions, document: documentLike });

  assert.throws(() => create([action("home"), action("home", { id: "other-home" })]), /Duplicate.*kind/u);
  assert.throws(() => create([action("play")]), /Unknown.*play/u);
  assert.throws(() => create([action("home", { label: "" })]), /accessible label/u);
  assert.throws(() => create([action("home", { onActivate: null })]), /onActivate/u);
  assert.throws(() => create([action("edit", { iconKind: "unknown" })]), /Unknown.*icon/u);
  assert.throws(() => create([action("home"), action("back")]), /accepted.*order/u);
  assert.equal(SHARED_ACTION_ORDER.includes("play"), false);
});

test("app-mode extensions may use a centrally owned icon without changing action semantics", () => {
  const { runtime } = createFixture([
    action("edit", {
      id: "borg-diagnostics-toggle",
      label: "Show diagnostics",
      iconKind: "diagnostics",
    }),
  ]);

  assert.match(runtime.getElement("edit").children[0].innerHTML, /borg-panel-icon-pane/u);
  assert.equal(runtime.getElement("edit").classList.contains("is-edit"), true);
});

test("state updates own disabled, hidden, pressed, label, and popover presentation", () => {
  const { runtime } = createFixture([
    action("home"),
    action("search", {
      popover: {
        id: "search-panel",
        input: { id: "search-input" },
      },
    }),
    action("edit", { pressed: false }),
  ]);

  runtime.update({
    home: { disabled: true, hidden: true, label: "Home unavailable" },
    search: { expanded: true },
    edit: { pressed: true, title: "Editing" },
  });

  assert.equal(runtime.getElement("home").disabled, true);
  assert.equal(runtime.getElement("home").classList.contains("is-hidden"), true);
  assert.equal(runtime.getElement("home").getAttribute("aria-label"), "Home unavailable");
  assert.equal(runtime.getElement("search").getAttribute("aria-expanded"), "true");
  assert.equal(runtime.getPopoverElement("search").getAttribute("aria-hidden"), "false");
  assert.equal(runtime.getElement("edit").getAttribute("aria-pressed"), "true");
  assert.equal(runtime.getElement("edit").title, "Editing");
});

test("only one popover opens, Escape restores focus, and outside interaction closes", async () => {
  const activations = [];
  const { documentLike, windowLike, host, runtime } = createFixture([
    action("search", {
      onActivate(state) {
        activations.push(["search", state.expanded, state.reason]);
      },
      popover: { id: "search-panel", input: { id: "search-input" } },
    }),
    action("settings", {
      onActivate(state) {
        activations.push(["settings", state.expanded, state.reason]);
      },
      popover: { id: "settings-panel", input: { id: "settings-input" } },
    }),
  ]);

  runtime.getElement("search").dispatch("click");
  assert.equal(documentLike.activeElement, runtime.getPopoverInput("search"));
  runtime.getElement("settings").dispatch("click");
  assert.equal(runtime.getElement("search").getAttribute("aria-expanded"), "false");
  assert.equal(runtime.getElement("settings").getAttribute("aria-expanded"), "true");
  assert.equal(documentLike.activeElement, runtime.getPopoverInput("settings"));

  windowLike.dispatch("keydown", { key: "Escape", target: windowLike });
  assert.equal(runtime.getElement("settings").getAttribute("aria-expanded"), "false");
  assert.equal(documentLike.activeElement, runtime.getElement("settings"));

  runtime.getElement("search").dispatch("click");
  documentLike.dispatch("pointerdown", { target: documentLike.createElement("main") });
  assert.equal(runtime.getElement("search").getAttribute("aria-expanded"), "false");
  assert.equal(host.contains(documentLike.activeElement), true);
  await Promise.resolve();
  assert.deepEqual(activations, [
    ["search", true, "toggle"],
    ["search", false, "replaced"],
    ["settings", true, "toggle"],
    ["settings", false, "escape"],
    ["search", true, "toggle"],
    ["search", false, "outside-pointer"],
  ]);
});

test("missing capabilities are omitted and edit follows settings as an app-mode action", () => {
  const { host, runtime } = createFixture([
    action("home"),
    action("settings"),
    action("edit", { pressed: false }),
  ]);

  assert.deepEqual(host.children.map((element) => element.id), [
    "home-button",
    "settings-button",
    "edit-button",
  ]);
  assert.equal(runtime.getElement("search"), null);
  assert.equal(runtime.getElement("edit").getAttribute("aria-pressed"), "false");
});

test("destroy removes every listener and clears the canonical host", () => {
  const { documentLike, windowLike, host, runtime } = createFixture([
    action("home"),
    action("search", { popover: { id: "search-panel" } }),
  ]);
  const home = runtime.getElement("home");

  assert.equal(home.listenerCount("click"), 1);
  assert.equal(documentLike.listenerCount("pointerdown"), 1);
  assert.equal(documentLike.listenerCount("focusin"), 1);
  assert.equal(windowLike.listenerCount("keydown"), 1);

  runtime.destroy();
  assert.equal(home.listenerCount("click"), 0);
  assert.equal(documentLike.listenerCount("pointerdown"), 0);
  assert.equal(documentLike.listenerCount("focusin"), 0);
  assert.equal(windowLike.listenerCount("keydown"), 0);
  assert.equal(host.children.length, 0);
  assert.equal(host.getAttribute("role"), null);
});
