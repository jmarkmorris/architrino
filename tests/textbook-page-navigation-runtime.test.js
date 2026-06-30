import test from "node:test";
import assert from "node:assert/strict";

import { createTextbookPageNavigationRuntime } from "../src/runtime/TextbookPageNavigationRuntime.js";

function createClassList() {
  const classes = new Set();
  return {
    classes,
    toggle(name, force) {
      if (force === undefined ? !classes.has(name) : force) {
        classes.add(name);
      } else {
        classes.delete(name);
      }
    },
    contains(name) {
      return classes.has(name);
    },
  };
}

function createFakeButton() {
  let clickHandler = null;
  const attributes = new Map();
  return {
    classList: createClassList(),
    disabled: false,
    title: "",
    addEventListener(type, handler) {
      if (type === "click") {
        clickHandler = handler;
      }
    },
    click() {
      return clickHandler?.({
        preventDefault() {},
      });
    },
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
  };
}

function createFakeContainer() {
  const attributes = new Map();
  return {
    classList: createClassList(),
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
  };
}

test("textbook page navigation runtime exposes previous and next controls", async () => {
  const previousButton = createFakeButton();
  const nextButton = createFakeButton();
  const container = createFakeContainer();
  const bodyClassList = createClassList();
  const navigation = {
    current: { title: "Current" },
    previous: { title: "Previous", targetPath: "content/scenes/previous.json" },
    next: { title: "Next", targetPath: "content/scenes/next.json" },
    index: 1,
    total: 3,
  };

  const runtime = createTextbookPageNavigationRuntime({
    container,
    previousButton,
    nextButton,
    document: { body: { classList: bodyClassList } },
    navigationService: {
      async resolvePageNavigation() {
        return navigation;
      },
    },
    isTransitionActive: () => false,
  });

  await runtime.syncCurrentLevel({
    markdownPath: "content/markdown/aaa/current.md",
  });

  assert.equal(container.classList.contains("is-visible"), true);
  assert.equal(bodyClassList.contains("has-textbook-page-nav"), true);
  assert.equal(previousButton.disabled, false);
  assert.equal(nextButton.disabled, false);
  assert.equal(previousButton.getAttribute("aria-label"), "Previous textbook page: Previous");
  assert.equal(nextButton.getAttribute("aria-label"), "Next textbook page: Next");
});

test("textbook page navigation runtime navigates through stored page targets", async () => {
  const previousButton = createFakeButton();
  const nextButton = createFakeButton();
  const visited = [];
  const navigation = {
    current: { title: "Current" },
    previous: { title: "Previous", targetPath: "content/scenes/previous.json" },
    next: { title: "Next", targetPath: "content/scenes/next.json" },
    index: 1,
    total: 3,
  };

  const runtime = createTextbookPageNavigationRuntime({
    previousButton,
    nextButton,
    navigationService: {
      async resolvePageNavigation() {
        return navigation;
      },
    },
    isTransitionActive: () => false,
    async navigateToPage(entry, options) {
      visited.push({ entry, direction: options.direction });
    },
  });

  runtime.wireListeners();
  await runtime.syncCurrentLevel({
    markdownPath: "content/markdown/aaa/current.md",
  });
  await nextButton.click();

  assert.deepEqual(visited, [{ entry: navigation.next, direction: "next" }]);
});

test("textbook page navigation runtime hides on non-textbook pages", async () => {
  const previousButton = createFakeButton();
  const nextButton = createFakeButton();
  const container = createFakeContainer();
  const bodyClassList = createClassList();
  const runtime = createTextbookPageNavigationRuntime({
    container,
    previousButton,
    nextButton,
    document: { body: { classList: bodyClassList } },
    navigationService: {
      async resolvePageNavigation() {
        return null;
      },
    },
  });

  await runtime.syncCurrentLevel({
    id: "content/scenes/foundations/foundations.json",
  });

  assert.equal(container.classList.contains("is-visible"), false);
  assert.equal(bodyClassList.contains("has-textbook-page-nav"), false);
  assert.equal(previousButton.disabled, true);
  assert.equal(nextButton.disabled, true);
});
