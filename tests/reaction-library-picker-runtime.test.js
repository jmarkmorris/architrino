import test from "node:test";
import assert from "node:assert/strict";

import { createReactionLibraryPickerRuntime } from "../src/apps/reaction/ReactionLibraryPickerRuntime.js";

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = String(tagName ?? "").toUpperCase();
    this.textContent = "";
    this.hidden = false;
    this.disabled = false;
    this.dataset = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.children = [];
    this.parentNode = null;
    this.className = "";
    this._innerHTML = "";
    this.classList = {
      add: (...tokens) => {
        const current = new Set(String(this.className || "").split(/\s+/).filter(Boolean));
        tokens.forEach((token) => current.add(String(token)));
        this.className = [...current].join(" ");
      },
      remove: (...tokens) => {
        const current = new Set(String(this.className || "").split(/\s+/).filter(Boolean));
        tokens.forEach((token) => current.delete(String(token)));
        this.className = [...current].join(" ");
      },
    };
  }

  set innerHTML(value) {
    this._innerHTML = String(value ?? "");
    this.children = [];
  }

  get innerHTML() {
    return this._innerHTML;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  contains(target) {
    if (target === this) {
      return true;
    }
    return this.children.some((child) => child === target || child.contains?.(target));
  }

  dispatchEvent(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({
        ...event,
        currentTarget: this,
        target: event?.target ?? this,
      });
    }
  }
}

class FakeButtonElement extends FakeElement {
  constructor() {
    super("button");
    this.type = "button";
  }
}

class FakeDocument {
  constructor() {
    this.baseURI = "http://localhost:5173/reaction.html";
    this.visibilityState = "visible";
    this.listeners = new Map();
  }

  createElement(tagName) {
    if (tagName === "button") {
      return new FakeButtonElement();
    }
    return new FakeElement(tagName);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatchEvent(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener(event);
    }
  }
}

class FakeWindow {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatchEvent(type, event = {}) {
    for (const listener of this.listeners.get(type) ?? []) {
      listener(event);
    }
  }
}

function withFakeDom(testBody) {
  return () => {
    const previousHTMLElement = globalThis.HTMLElement;
    const previousHTMLButtonElement = globalThis.HTMLButtonElement;
    globalThis.HTMLElement = FakeElement;
    globalThis.HTMLButtonElement = FakeButtonElement;
    try {
      testBody();
    } finally {
      globalThis.HTMLElement = previousHTMLElement;
      globalThis.HTMLButtonElement = previousHTMLButtonElement;
    }
  };
}

test(
  "reaction library picker closes when the window blurs",
  withFakeDom(() => {
    const documentLike = new FakeDocument();
    const windowLike = new FakeWindow();
    const root = new FakeElement("div");
    const triggerButton = new FakeButtonElement();
    const menuElement = new FakeElement("div");
    root.appendChild(triggerButton);
    root.appendChild(menuElement);

    const runtime = createReactionLibraryPickerRuntime({
      root,
      triggerButton,
      menuElement,
      documentLike,
      windowLike,
    });

    runtime.setEntries([
      { id: "muon_decay", title: "Muon decay" },
      { id: "pion_decay", title: "Pion decay" },
    ]);
    triggerButton.dispatchEvent("click");
    assert.equal(menuElement.hidden, false);
    assert.equal(triggerButton.attributes.get("aria-expanded"), "true");

    windowLike.dispatchEvent("blur");

    assert.equal(menuElement.hidden, true);
    assert.equal(triggerButton.attributes.get("aria-expanded"), "false");
  })
);

test(
  "reaction library picker closes on document visibility change and tracks selected entries",
  withFakeDom(() => {
    const documentLike = new FakeDocument();
    const windowLike = new FakeWindow();
    const root = new FakeElement("div");
    const triggerButton = new FakeButtonElement();
    const menuElement = new FakeElement("div");
    root.appendChild(triggerButton);
    root.appendChild(menuElement);

    const runtime = createReactionLibraryPickerRuntime({
      root,
      triggerButton,
      menuElement,
      documentLike,
      windowLike,
    });

    runtime.setEntries(
      [
        { id: "muon_decay", title: "Muon decay" },
        { id: "pion_decay", title: "Pion decay" },
      ],
      { selectedId: "pion_decay" }
    );

    assert.equal(runtime.getSelectedId(), "pion_decay");
    assert.equal(triggerButton.textContent, "Pion decay");
    assert.equal(menuElement.children.length, 2);

    triggerButton.dispatchEvent("click");
    assert.equal(menuElement.hidden, false);

    documentLike.visibilityState = "hidden";
    documentLike.dispatchEvent("visibilitychange");

    assert.equal(menuElement.hidden, true);
    assert.equal(triggerButton.attributes.get("aria-expanded"), "false");
  })
);

test(
  "reaction library picker notifies selection changes immediately",
  withFakeDom(() => {
    const documentLike = new FakeDocument();
    const windowLike = new FakeWindow();
    const root = new FakeElement("div");
    const triggerButton = new FakeButtonElement();
    const menuElement = new FakeElement("div");
    const seenSelections = [];
    root.appendChild(triggerButton);
    root.appendChild(menuElement);

    createReactionLibraryPickerRuntime({
      root,
      triggerButton,
      menuElement,
      documentLike,
      windowLike,
      onSelect: (entryId) => {
        seenSelections.push(entryId);
      },
    }).setEntries([
      { id: "muon_decay", title: "Muon decay" },
      { id: "free_neutron_beta_decay", title: "Free neutron beta decay" },
    ]);

    triggerButton.dispatchEvent("click");
    menuElement.children[1]?.dispatchEvent("click");

    assert.deepEqual(seenSelections, ["free_neutron_beta_decay"]);
    assert.equal(triggerButton.textContent, "Free neutron beta decay");
    assert.equal(menuElement.hidden, true);
  })
);
