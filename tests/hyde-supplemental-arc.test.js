import test from "node:test";
import assert from "node:assert/strict";
import {
  buildHydeSupplementalArcGeometry,
  buildHydeSupplementalArcPlacement,
  createHydeSupplementalArc,
} from "../src/runtime/HydeSupplementalArc.js";

test("the supplemental band has concentric circular edges and closes at both ends", () => {
  const geometry = buildHydeSupplementalArcGeometry();
  const values = geometry.bandPath.match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.match(geometry.bandPath, /^M.+ A415,415 0 0 1 .+ L.+ A325,325 0 0 0 .+ Z$/);
  assert.equal(values[2] - values[11], 100 * 0.9);
  // Independent polar-distance check of all four emitted endpoints.
  for (const [index, radius] of [[0, 415], [7, 415], [9, 325], [16, 325]]) {
    assert.ok(Math.abs(Math.hypot(values[index], values[index + 1] - 370) - radius) < 0.001);
  }
  assert.match(geometry.namePath, /A391,391/);
});

test("the symbol and its focus outline fit wholly inside the curved band", () => {
  const { symbol } = buildHydeSupplementalArcGeometry();
  // Sample an independently specified circle, including half the focus stroke.
  for (let angle = 0; angle < 2 * Math.PI; angle += Math.PI / 180) {
    const x = symbol.x + (symbol.radius + 3) * Math.cos(angle);
    const y = symbol.y + (symbol.radius + 3) * Math.sin(angle);
    const radius = Math.hypot(x, y - 370);
    assert.ok(radius > 325 && radius < 415);
    assert.ok(Math.abs(Math.atan2(x, 370 - y)) < 24 * Math.PI / 180);
  }
});

test("placement stays near the outer lane and clamps away from artwork edges", () => {
  assert.deepEqual(buildHydeSupplementalArcPlacement({ x: 2141, y: 915 }, 2592, 1944), {
    center: { x: 2241, y: 775 }, rotation: 45,
  });
  assert.deepEqual(buildHydeSupplementalArcPlacement({ x: 2592, y: 1944 }, 2592, 1944).center,
    { x: 2392, y: 1774 });
  assert.deepEqual(buildHydeSupplementalArcPlacement({ x: 0, y: 0 }, 2592, 1944).center,
    { x: 200, y: 170 });
  assert.equal(buildHydeSupplementalArcPlacement(null, 2592, 1944), null);
});

test("the complete name follows an SVG arc without HTML wrapping or truncation", () => {
  const nodes = [];
  const document = {
    createElementNS(namespace, tag) {
      const node = {
        namespace, tag, attributes: {}, children: [],
        setAttribute(key, value) { this.attributes[key] = value; },
        appendChild(child) { this.children.push(child); },
      };
      nodes.push(node);
      return node;
    },
  };
  const element = { number: 119, name: "Ununennium", symbol: "Uue" };
  const group = createHydeSupplementalArc(document, element, {
    center: { x: 2241, y: 775 }, rotation: 45,
  });
  assert.equal(group.tag, "g");
  assert.equal(group.attributes.role, "button");
  assert.equal(group.attributes.tabindex, "0");
  assert.equal(group.attributes.transform, "translate(2241 775) rotate(45)");
  assert.equal(group.attributes["aria-label"], "Ununennium (Uue)");
  assert.ok(nodes.every(node => node.namespace === "http://www.w3.org/2000/svg"));
  const name = nodes.find(node => node.tag === "textPath");
  assert.equal(name.textContent, "Ununennium");
  const id = name.attributes.href.slice(1);
  assert.ok(nodes.some(node => node.tag === "path" && node.attributes.id === id));
  assert.ok(nodes.some(node => node.tag === "text" && node.textContent === "119"));
  assert.ok(nodes.some(node => node.tag === "text" && node.textContent === "Uue"));
});
