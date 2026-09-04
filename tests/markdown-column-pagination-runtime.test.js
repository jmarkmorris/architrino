import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdownColumnPaginationRuntime } from "../src/runtime/MarkdownColumnPaginationRuntime.js";

function createClassList(element) {
  return {
    add(...tokens) {
      const classes = new Set(String(element.className || "").split(/\s+/u).filter(Boolean));
      tokens.forEach((token) => classes.add(token));
      element.className = [...classes].join(" ");
    },
    contains(token) {
      return String(element.className || "").split(/\s+/u).includes(token);
    },
    remove(...tokens) {
      const removed = new Set(tokens);
      element.className = String(element.className || "")
        .split(/\s+/u)
        .filter((token) => token && !removed.has(token))
        .join(" ");
    },
  };
}

function createStyle() {
  const properties = new Map();
  return {
    height: "",
    properties,
    removeProperty(name) {
      properties.delete(name);
    },
    setProperty(name, value) {
      properties.set(name, value);
    },
  };
}

function createFakeNode({ height = 0, text = "", wide = false } = {}) {
  const node = {
    childNodes: [],
    className: "",
    intrinsicHeight: height,
    nodeType: 1,
    parentElement: null,
    style: createStyle(),
    textContent: text,
    wide,
    appendChild(child) {
      child.parentElement?.removeChild(child);
      this.childNodes.push(child);
      child.parentElement = this;
      return child;
    },
    matches() {
      return this.wide;
    },
    removeChild(child) {
      const index = this.childNodes.indexOf(child);
      if (index >= 0) {
        this.childNodes.splice(index, 1);
        child.parentElement = null;
      }
      return child;
    },
    replaceChildren(...children) {
      this.childNodes.forEach((child) => {
        child.parentElement = null;
      });
      this.childNodes = [];
      children.forEach((child) => this.appendChild(child));
    },
  };
  node.classList = createClassList(node);
  Object.defineProperty(node, "scrollHeight", {
    get() {
      const fixedHeight = Number.parseFloat(node.style.height) || 0;
      const contentHeight = node.childNodes.reduce(
        (sum, child) => sum + (child.intrinsicHeight || child.scrollHeight || 0),
        node.intrinsicHeight
      );
      return Math.max(fixedHeight, contentHeight);
    },
  });
  return node;
}

function createRuntime(nodes) {
  const markdownBody = createFakeNode();
  markdownBody.replaceChildren(...nodes);
  const markdownContent = {
    clientHeight: 600,
  };
  const documentLike = {
    createElement() {
      return createFakeNode();
    },
  };
  const windowLike = {
    getComputedStyle() {
      return { paddingBottom: "0px", paddingTop: "0px" };
    },
    matchMedia() {
      return { matches: false };
    },
  };
  return {
    markdownBody,
    runtime: createMarkdownColumnPaginationRuntime({
      documentLike,
      markdownBody,
      markdownContent,
      windowLike,
    }),
  };
}

test("two-column markdown fills a spread before continuing below", () => {
  const nodes = ["A", "B", "C", "D", "E"].map((text) =>
    createFakeNode({ height: 300, text })
  );
  const { markdownBody, runtime } = createRuntime(nodes);

  assert.equal(runtime.apply(2), true);

  const pages = markdownBody.childNodes.filter((node) =>
    node.classList.contains("markdown-column-page")
  );
  assert.equal(pages.length, 2);
  assert.deepEqual(pages[0].childNodes[0].childNodes, nodes.slice(0, 2));
  assert.deepEqual(pages[0].childNodes[1].childNodes, nodes.slice(2, 4));
  assert.deepEqual(pages[1].childNodes[0].childNodes, nodes.slice(4));
  assert.deepEqual(pages[1].childNodes[1].childNodes, []);

  assert.equal(runtime.apply(1), false);
  assert.deepEqual(markdownBody.childNodes, nodes);
  assert.equal(markdownBody.classList.contains("markdown-column-pages"), false);
});

test("full-width markdown blocks stay between vertical spreads", () => {
  const first = createFakeNode({ height: 300, text: "First" });
  const table = createFakeNode({ height: 240, text: "Table", wide: true });
  const second = createFakeNode({ height: 300, text: "Second" });
  const nodes = [first, table, second];
  const { markdownBody, runtime } = createRuntime(nodes);

  runtime.apply(2);

  assert.equal(markdownBody.childNodes.length, 3);
  assert.equal(markdownBody.childNodes[0].classList.contains("markdown-column-page"), true);
  assert.equal(markdownBody.childNodes[1].classList.contains("markdown-column-wide-block"), true);
  assert.equal(markdownBody.childNodes[1].childNodes[0], table);
  assert.equal(markdownBody.childNodes[2].classList.contains("markdown-column-page"), true);

  runtime.clear();
  assert.deepEqual(markdownBody.childNodes, nodes);
});

test("equation-map rows retain the full-width display-equation layout", () => {
  const first = createFakeNode({ height: 300, text: "First" });
  const equationRow = createFakeNode({ height: 240, text: "Equation" });
  equationRow.className = "markdown-equation-map-row";
  equationRow.matches = selector => selector.includes(".markdown-equation-map-row");
  const second = createFakeNode({ height: 300, text: "Second" });
  const { markdownBody, runtime } = createRuntime([first, equationRow, second]);

  runtime.apply(2);

  assert.equal(markdownBody.childNodes[1].classList.contains("markdown-column-wide-block"), true);
  assert.equal(markdownBody.childNodes[1].childNodes[0], equationRow);
});

test("short passages between equations do not reserve a viewport of blank space", () => {
  const introduction = createFakeNode({ height: 100, text: "Manifold and Metric" });
  const equation = createFakeNode({ height: 40, text: "R cubed", wide: true });
  const explanation = createFakeNode({ height: 80, text: "A location is a point" });
  const { markdownBody, runtime } = createRuntime([introduction, equation, explanation]);

  for (const count of [2, 3, 2]) {
    runtime.apply(count);
    const [before, wide, after] = markdownBody.childNodes;
    assert.equal(before.scrollHeight, 100);
    assert.equal(after.scrollHeight, 80);
    assert.equal(wide.childNodes[0], equation);
    for (const page of [before, after]) {
      assert.equal(page.style.properties.get("--markdown-column-page-height"), "0px");
      assert.ok(page.childNodes.every(column => column.style.height === "auto"));
    }
  }
  runtime.clear();
  assert.deepEqual(markdownBody.childNodes, [introduction, equation, explanation]);
});
