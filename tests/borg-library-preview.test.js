import assert from "node:assert/strict";
import { test } from "node:test";
import { createSpherePreview } from "../src/apps/borg/library/BorgSpherePreview.js";

// Canvas-command observations test presentation only, not source physics.
function canvasFixture() {
  const events = new Map(), strokes = [], fills = [], gradients = [];
  let path = [];
  const context = {
    setTransform() {}, clearRect() { strokes.length = fills.length = gradients.length = 0; },
    save() {}, restore() {}, clip() {}, beginPath() { path = []; },
    arc(x, y, radius) { path.push({ x, y, radius }); },
    moveTo(x, y) { path.push({ x, y }); }, lineTo(x, y) { path.push({ x, y }); },
    fill() { fills.push({ path, color: this.fillStyle, alpha: this.globalAlpha }); },
    stroke() { strokes.push({ path, gradient: this.strokeStyle, alpha: this.globalAlpha }); },
    createLinearGradient() { const stops = []; gradients.push(stops); return { stops, addColorStop(offset, color) { stops.push({ offset, color }); } }; },
  };
  const canvas = { clientWidth: 200, width: 0, height: 0, dataset: {}, getContext: () => context,
    setPointerCapture() {}, releasePointerCapture() {},
    addEventListener(name, fn, { signal }) { events.set(name, fn); signal.addEventListener("abort", () => events.delete(name)); } };
  return { canvas, events, fills, strokes, gradients };
}

const preview = { bounds: { center: [0, 0, 0], radius: 1 }, recordSha256: "test-only", start: 0, end: 1, sampleCount: 5,
  paths: [
    { polarity: 1, trailDuration: .375, points: [[-1, 0, 0], [-.5, 0, 0], [0, 0, 0], [.5, 0, 0], [1, 0, 0]] },
    { polarity: -1, trailDuration: 0, points: [[0, -1, 0], [0, -.5, 0], [0, 0, 0], [0, .5, 0], [0, 1, 0]] },
  ] };

test("sphere renderer has independent rotation, fixed bounds, past-only trails, exact polarity colors and no zoom", (t) => {
  for (const [name, value] of [["IntersectionObserver", class { observe() {} disconnect() {} }], ["devicePixelRatio", 1]]) {
    const before = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { value, configurable: true });
    t.after(() => before ? Object.defineProperty(globalThis, name, before) : delete globalThis[name]);
  }
  const a = canvasFixture(), b = canvasFixture();
  let selections = 0;
  const first = createSpherePreview(a.canvas, preview, () => selections++);
  const second = createSpherePreview(b.canvas, preview);
  first.draw(.5);
  assert.equal(a.canvas.dataset.frame, "2");
  assert.equal(a.fills.length, 2);
  assert.deepEqual(a.fills.map((p) => p.color).sort(), ["#0000ff", "#ff0000"]);
  assert.ok(a.fills.every((p) => p.alpha === 1));
  assert.equal(a.strokes.length, 2, "a partial segment plus a full segment of retained past");
  const stops = a.gradients.flat();
  assert.ok(stops.some((s) => s.color === "rgba(255,0,0,0)"));
  assert.ok(stops.some((s) => s.color === "rgba(255,0,0,1)"));
  assert.ok(a.strokes.every((s) => s.path.every((p) => p.x <= 100)), "no future x>0 samples at t=.5");
  const initial = b.canvas.dataset.orientation;
  a.events.get("keydown")({ key: "ArrowRight", preventDefault() {} });
  assert.notEqual(a.canvas.dataset.orientation, initial);
  assert.equal(b.canvas.dataset.orientation, initial);
  for (let i = 0; i < 100; i++) {
    a.events.get("keydown")({ key: i % 2 ? "ArrowRight" : "ArrowUp", preventDefault() {} });
    first.draw(1);
    for (const e of [...a.fills, ...a.strokes]) for (const p of e.path) assert.ok(Math.hypot(p.x - 100, p.y - 100) <= 86 + 1e-10);
  }
  a.events.get("keydown")({ key: "Home", preventDefault() {} });
  assert.equal(a.canvas.dataset.orientation, initial);
  assert.equal(a.events.has("wheel"), false);
  a.events.get("keydown")({ key: "Enter", preventDefault() {} });
  assert.equal(selections, 1);
  first.draw(0);
  assert.equal(a.strokes.length, 0, "no future trail at the first retained frame");
  first.dispose(); second.dispose(); assert.equal(a.events.size, 0);
});
