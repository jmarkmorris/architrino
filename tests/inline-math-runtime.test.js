import test from "node:test";
import assert from "node:assert/strict";

import {
  parseInlineMathSegments,
  renderDeclaredInlineMath,
  renderInlineMathText,
} from "../src/runtime/InlineMathRuntime.js";

function createElement(documentLike) {
  return {
    ownerDocument: documentLike,
    dataset: {},
    className: "",
    children: [],
    textContent: "",
    replaceChildren(...children) {
      this.children = children;
    },
  };
}

function createFixture() {
  const renderCalls = [];
  const windowLike = {
    katex: {
      render(tex, element, options) {
        renderCalls.push({ tex, element, options });
        element.textContent = `rendered:${tex}`;
      },
    },
  };
  const documentLike = {
    defaultView: windowLike,
    createElement() {
      return createElement(documentLike);
    },
    createTextNode(value) {
      return { nodeType: 3, textContent: value };
    },
  };
  return { documentLike, renderCalls, windowLike };
}

test("parseInlineMathSegments separates prose from dollar-delimited TeX", () => {
  assert.deepEqual(
    parseInlineMathSegments("At $T_r$, use $g(T_r;T_t)=0$."),
    [
      { type: "text", value: "At " },
      { type: "math", value: "T_r" },
      { type: "text", value: ", use " },
      { type: "math", value: "g(T_r;T_t)=0" },
      { type: "text", value: "." },
    ],
  );
});

test("renderInlineMathText delegates every marked expression to KaTeX", () => {
  const { documentLike, renderCalls, windowLike } = createFixture();
  const target = createElement(documentLike);

  renderInlineMathText(target, "Area $4\\pi R^2$ and scale $\\epsilon_c$", {
    documentLike,
    windowLike,
  });

  assert.deepEqual(renderCalls.map(({ tex }) => tex), ["4\\pi R^2", "\\epsilon_c"]);
  assert.equal(target.children.length, 4);
  assert.equal(target.children[1].dataset.mathRendered, "true");
  assert.equal(target.children[1].dataset.mathTex, "4\\pi R^2");
  assert.equal(renderCalls[0].options.displayMode, false);
  assert.equal(renderCalls[0].options.throwOnError, false);
});

test("renderDeclaredInlineMath renders static data-inline-math elements", () => {
  const { documentLike, renderCalls, windowLike } = createFixture();
  const declared = createElement(documentLike);
  declared.dataset.inlineMath = "\\kappa";
  const root = {
    querySelectorAll(selector) {
      assert.equal(selector, "[data-inline-math]");
      return [declared];
    },
  };

  assert.equal(
    renderDeclaredInlineMath(root, { documentLike, windowLike }),
    1,
  );
  assert.deepEqual(renderCalls.map(({ tex }) => tex), ["\\kappa"]);
  assert.equal(declared.dataset.mathRendered, "true");
});
