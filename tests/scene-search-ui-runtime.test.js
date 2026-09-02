import assert from "node:assert/strict";
import test from "node:test";
import { createSceneSearchUiRuntime } from "../src/runtime/SceneSearchUiRuntime.js";

function createTarget() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(type, handler) {
      const handlers = listeners.get(type) ?? [];
      handlers.push(handler);
      listeners.set(type, handlers);
    },
    dispatch(type, event = {}) {
      for (const handler of listeners.get(type) ?? []) {
        handler({ target: this, ...event });
      }
    },
  };
}

test("shared-bar search keeps input and shortcut wiring without a second popover owner", async () => {
  const sceneSearchToggle = createTarget();
  const sceneSearchInput = createTarget();
  const documentRef = createTarget();
  const windowRef = createTarget();
  const calls = [];
  let searchOpen = false;
  const runtime = createSceneSearchUiRuntime({
    sceneSearchToggle,
    sceneSearchInput,
    sceneSearchResults: { querySelector() { return null; } },
    sceneSearchRuntime: {
      isSearchOpen() {
        return searchOpen;
      },
      updateSearchResults(value) {
        calls.push(["input", value]);
      },
    },
    sceneSearchCoordinator: {
      async openSearchPanel() {
        searchOpen = true;
        calls.push(["open"]);
      },
      closeSearchPanel() {
        searchOpen = false;
        calls.push(["close"]);
      },
    },
    documentRef,
    windowRef,
    topBarOwnsPopover: true,
  });

  runtime.wireListeners();
  assert.equal(sceneSearchToggle.listeners.get("click"), undefined);
  assert.equal(documentRef.listeners.get("pointerdown"), undefined);
  assert.equal(documentRef.listeners.get("focusin"), undefined);

  sceneSearchInput.dispatch("input", { target: { value: "photon" } });
  windowRef.dispatch("keydown", {
    key: "k",
    metaKey: true,
    ctrlKey: false,
    preventDefault() {},
  });
  await Promise.resolve();
  assert.deepEqual(calls, [["input", "photon"], ["open"]]);
});
