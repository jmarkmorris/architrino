import assert from "node:assert/strict";
import test from "node:test";
import { createSceneHudTooltipRuntime } from "../src/runtime/SceneHudTooltipRuntime.js";

function createClassList(tokens = []) {
  const classes = new Set(tokens);
  return {
    contains(token) {
      return classes.has(token);
    },
  };
}

function createFakeButton(label, rect = { left: 10, top: 20, width: 32, height: 32 }) {
  const attributes = new Map([["aria-label", label]]);
  const button = {
    classList: createClassList(),
    disabled: false,
    hidden: false,
    getBoundingClientRect() {
      return {
        ...rect,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height,
      };
    },
    getAttribute(key) {
      return attributes.get(key) ?? null;
    },
    setAttribute(key, value) {
      attributes.set(key, String(value));
    },
    removeAttribute(key) {
      attributes.delete(key);
    },
    closest(selector) {
      return selector === "button[aria-label]" ? button : null;
    },
  };
  button.attributes = attributes;
  return button;
}

function createFakeDocument() {
  const listeners = new Map();
  const documentRef = {
    pointTarget: null,
    listeners,
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    elementFromPoint() {
      return this.pointTarget;
    },
  };
  return documentRef;
}

function createFakeWindow() {
  const timeouts = [];
  return {
    addEventListener() {},
    clearTimeout() {},
    flushTimeouts() {
      while (timeouts.length) {
        timeouts.shift()();
      }
    },
    setTimeout(callback) {
      timeouts.push(callback);
      return timeouts.length;
    },
  };
}

test("scene HUD tooltips use button aria labels for pointer hover", () => {
  const button = createFakeButton("Go forward");
  button.attributes.set("title", "More options");
  const documentRef = createFakeDocument();
  const windowRef = createFakeWindow();
  const showCalls = [];
  let hideCount = 0;

  const runtime = createSceneHudTooltipRuntime({
    documentRef,
    windowRef,
    sceneHudTools: {
      contains(target) {
        return target === button;
      },
      querySelectorAll(selector) {
        return selector === "button[aria-label]" ? [button] : [];
      },
    },
    showHoverTooltip(content, x, y, options) {
      showCalls.push({ content, x, y, options });
    },
    hideHoverTooltip() {
      hideCount += 1;
    },
  });

  runtime.wireListeners();
  assert.equal(button.attributes.get("title"), "");
  documentRef.pointTarget = button;
  documentRef.listeners.get("pointermove")({ clientX: 112, clientY: 40 });
  windowRef.flushTimeouts();

  assert.equal(showCalls.length, 1);
  assert.equal(showCalls[0].content, "Go forward");
  assert.equal(showCalls[0].x, 112);
  assert.equal(showCalls[0].y, 40);
  assert.equal(showCalls[0].options.variant, "hud");
  assert.equal(button.attributes.get("aria-describedby"), "hover-tooltip");

  documentRef.pointTarget = null;
  documentRef.listeners.get("pointermove")({ clientX: 20, clientY: 120 });

  assert.equal(hideCount, 1);
  assert.equal(button.attributes.has("aria-describedby"), false);
});

test("scene HUD tooltips show on keyboard focus", () => {
  const button = createFakeButton("Switch to 2-column layout", {
    left: 40,
    top: 16,
    width: 32,
    height: 32,
  });
  const documentRef = createFakeDocument();
  const windowRef = createFakeWindow();
  const showCalls = [];

  const runtime = createSceneHudTooltipRuntime({
    documentRef,
    windowRef,
    sceneHudTools: {
      contains(target) {
        return target === button;
      },
    },
    showHoverTooltip(content, x, y, options) {
      showCalls.push({ content, x, y, options });
    },
    hideHoverTooltip() {},
  });

  runtime.wireListeners();
  documentRef.listeners.get("focusin")({ target: button });
  windowRef.flushTimeouts();

  assert.equal(showCalls.length, 1);
  assert.equal(showCalls[0].content, "Switch to 2-column layout");
  assert.equal(showCalls[0].x, 56);
  assert.equal(showCalls[0].y, 48);
  assert.equal(showCalls[0].options.variant, "hud");
});
