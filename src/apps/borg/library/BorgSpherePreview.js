import { Quaternion, Euler, Vector3 } from "../../../../vendor/three/three.module.js";
import { borgPolarityCss, borgTrailSegments } from "../BorgOrbitTrails.mjs";

// Fixed orthographic display of samples evaluated from sealed cubic histories.
// No camera zoom, generated orbit, future trail, or solver is present here.
export function createSpherePreview(canvas, preview, onSelect = () => {}) {
  const context = canvas.getContext("2d");
  const abort = new AbortController();
  const rotation = new Quaternion();
  const point = new Vector3();
  let visible = true;
  let pointer = null;
  let fraction = .5;
  const { center, radius } = preview.bounds;
  const times = Array.from({ length: preview.sampleCount }, (_, i) => preview.start + i * (preview.end-preview.start)/(preview.sampleCount-1));
  function publishRotation() { canvas.dataset.orientation = rotation.toArray().map((v) => v.toFixed(6)).join(","); }
  function reset() { rotation.setFromEuler(new Euler(.32, .5, .03)); publishRotation(); draw(fraction); }
  function turn(x, y) { rotation.premultiply(new Quaternion().setFromEuler(new Euler(y, x, 0))).normalize(); publishRotation(); draw(fraction); }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) draw(fraction); });
  observer.observe(canvas);
  const listen = (event, fn) => canvas.addEventListener(event, fn, { signal: abort.signal });
  listen("pointerdown", (event) => {
    if (pointer || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, distance: 0 };
    canvas.setPointerCapture(event.pointerId);
  });
  listen("pointermove", (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const x = event.clientX - pointer.x, y = event.clientY - pointer.y;
    pointer.distance += Math.abs(x) + Math.abs(y);
    pointer.x = event.clientX; pointer.y = event.clientY;
    turn(x * .012, y * .012);
  });
  listen("pointerup", (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const click = pointer.distance < 5; pointer = null;
    canvas.releasePointerCapture(event.pointerId);
    if (click) onSelect();
  });
  listen("pointercancel", () => { pointer = null; });
  listen("keydown", (event) => {
    const changes = { ArrowLeft: [-.15, 0], ArrowRight: [.15, 0], ArrowUp: [0, -.15], ArrowDown: [0, .15] };
    if (changes[event.key]) { event.preventDefault(); turn(...changes[event.key]); }
    if (event.key === "Home") { event.preventDefault(); reset(); }
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(); }
  });
  function draw(nextFraction) {
    fraction = Math.max(0, Math.min(1, nextFraction));
    if (!visible || !context) return;
    const width = canvas.clientWidth;
    if (!width) return;
    const scale = Math.min(devicePixelRatio || 1, 2);
    const resolution = Math.round(width * scale);
    if (canvas.width !== resolution || canvas.height !== resolution) { canvas.width = resolution; canvas.height = resolution; }
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, width);
    const frame = Math.round(fraction * (preview.sampleCount - 1));
    canvas.dataset.frame = String(frame);
    canvas.dataset.recordSha256 = preview.recordSha256;
    const project = (p) => {
      point.set(p[0] - center[0], p[1] - center[1], p[2] - center[2]).applyQuaternion(rotation);
      const k = width * .43 / (radius || 1);
      return [width / 2 + point.x * k, width / 2 - point.y * k, point.z];
    };
    const elements = [];
    for (const path of preview.paths) {
      const color = borgPolarityCss(path.polarity);
      for (const segment of borgTrailSegments(path.points, times, times[frame], path.trailDuration, path.trailFade)) {
        const a = project(segment.a), b = project(segment.b);
        elements.push({ a, b, z: (a[2] + b[2]) / 2, color,
          startAlpha: segment.startAlpha, endAlpha: segment.endAlpha });
      }
      const p = project(path.points[frame]);
      elements.push({ p, z: p[2], color, alpha: 1 });
    }
    elements.sort((a, b) => a.z - b.z);
    context.save(); context.beginPath(); context.arc(width / 2, width / 2, width / 2 - 2, 0, Math.PI * 2); context.clip();
    for (const e of elements) {
      context.globalAlpha = 1;
      if (e.p) {
        context.fillStyle = e.color; context.beginPath(); context.arc(e.p[0], e.p[1], width > 300 ? 4.5 : 3.2, 0, Math.PI * 2); context.fill();
      } else {
        const gradient = context.createLinearGradient(e.a[0], e.a[1], e.b[0], e.b[1]);
        const rgb = e.color === "#ff0000" ? "255,0,0" : "0,0,255";
        gradient.addColorStop(0, `rgba(${rgb},${e.startAlpha})`);
        gradient.addColorStop(1, `rgba(${rgb},${e.endAlpha})`);
        context.strokeStyle = gradient; context.lineWidth = width > 300 ? 2 : 1.6;
        context.beginPath(); context.moveTo(e.a[0], e.a[1]); context.lineTo(e.b[0], e.b[1]); context.stroke();
      }
    }
    context.restore();
  }
  reset();
  return { draw, reset, dispose() { abort.abort(); observer.disconnect(); } };
}
