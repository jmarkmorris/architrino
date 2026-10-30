import { sampleBinaryComparison } from "./CausalDelayFeedbackBinaryLessons.js";
import { BREATHING_DURATION, prescribedBreathingState, sampleBreathingGeometry } from "./CausalDelayFeedbackBreathingGeometry.js";

const INK = "#f6f7ff";
const MUTED = "#c3b6d4";
const VELOCITY = "#91efd2";
const ACCELERATION = "#ffd084";
const GUIDE = "rgba(224,207,255,0.25)";

function line(ctx, a, b, color, width = 2) {
  ctx.strokeStyle = color; ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
}
function arrow(ctx, origin, vector, color) {
  const length = Math.hypot(vector.x, vector.y);
  if (length < 1e-6) return;
  const head = Math.min(9, length * 0.45);
  const end = { x: origin.x + vector.x, y: origin.y + vector.y };
  line(ctx, origin, end, color, 2.5);
  const a = Math.atan2(vector.y, vector.x);
  ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - head * Math.cos(a - 0.45), end.y - head * Math.sin(a - 0.45));
  ctx.lineTo(end.x - head * Math.cos(a + 0.45), end.y - head * Math.sin(a + 0.45));
  ctx.closePath(); ctx.fill();
}
function text(ctx, value, x, y, color = INK, size = 14, align = "left") {
  ctx.fillStyle = color; ctx.font = `${size}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = align; ctx.fillText(value, x, y);
}
function circle(ctx, p, r, color, fill = false) {
  ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
  if (fill) { ctx.fillStyle = color; ctx.fill(); }
  else { ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke(); }
}

function drawOrbit(ctx, box, frame, lessonId) {
  const narrow = box.width < 480;
  const radius = Math.max(12, Math.min(box.width * 0.29, (box.height - 45) * 0.36));
  const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 + 8 };
  const position = (phase, sign = 1, widening = true) => {
    const r = radius * (widening ? sampleBinaryComparison(phase / (2 * Math.PI)).diagramRadius : 1);
    return { x: center.x + sign * r * Math.cos(phase), y: center.y - sign * r * Math.sin(phase) };
  };
  text(ctx, "Opposite-polarity pair · shared midpoint", center.x, box.y + 16, MUTED, narrow ? 12 : 14, "center");
  circle(ctx, center, radius, GUIDE);
  for (const sign of [1, -1]) {
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const p = position(frame.phase * i / 180, sign);
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = sign === 1 ? "#8bc8ff" : "#ff7b95"; ctx.stroke();
    const body = position(frame.phase, sign);
    line(ctx, center, body, GUIDE, 1);
    circle(ctx, body, narrow ? 5 : 7, sign === 1 ? "#8bc8ff" : "#ff7b95", true);
    if (sign === 1) {
      const n = { x: Math.cos(frame.phase), y: -Math.sin(frame.phase) };
      const t = { x: -Math.sin(frame.phase), y: -Math.cos(frame.phase) };
      const size = Math.min(70, radius * 0.8);
      const lean = 0.22;
      const pitch = lean * frame.outwardPitch;
      arrow(ctx, body, {
        x: size * (Math.sin(pitch) * n.x + Math.cos(pitch) * t.x),
        y: size * (Math.sin(pitch) * n.y + Math.cos(pitch) * t.y),
      }, VELOCITY);
      arrow(ctx, body, {
        x: size * (-Math.cos(lean) * n.x + Math.sin(lean) * t.x),
        y: size * (-Math.cos(lean) * n.y + Math.sin(lean) * t.y),
      }, ACCELERATION);
      if (lessonId === "binary-release") {
        const ghost = position(frame.phase - 2 * lean, -1, false);
        circle(ctx, ghost, 5, INK);
        ctx.setLineDash([4, 5]); line(ctx, ghost, body, GUIDE, 1); ctx.setLineDash([]);
        text(ctx, "Earlier emission", ghost.x, ghost.y + 19, MUTED, 11, "center");
      }
    }
  }
  circle(ctx, center, 2, MUTED, true);
  const legendY = box.y + box.height - 8;
  text(ctx, "→ Velocity", center.x - 9, legendY, VELOCITY, 13, "right");
  text(ctx, "→ Acceleration", center.x + 9, legendY, ACCELERATION, 13);
}

function drawSpeedGraph(ctx, box, frame) {
  const x0 = box.x + 12, y0 = box.y + 34;
  const width = box.width - 28, height = box.height - 62;
  const x = (turn) => x0 + width * turn;
  const y = (value) => y0 + height * (1 - value) / 8;
  text(ctx, "Speed change since release · relative units", x0, box.y + 15, INK, 13);
  line(ctx, { x: x0, y: y(0) }, { x: x(1), y: y(0) }, GUIDE, 1);
  for (const tick of [0, -2, -4, -6]) {
    text(ctx, String(tick), x0 - 3, y(tick) + 4, MUTED, 10, "right");
  }
  ctx.beginPath();
  for (let i = 0; i <= 240; i++) {
    const p = i / 240;
    const yy = y(sampleBinaryComparison(p).speedChange);
    if (!i) ctx.moveTo(x(p), yy); else ctx.lineTo(x(p), yy);
  }
  ctx.strokeStyle = "rgba(145,239,210,0.3)"; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i <= 180; i++) {
    const p = frame.turn * i / 180;
    const yy = y(sampleBinaryComparison(p).speedChange);
    if (!i) ctx.moveTo(x(p), yy); else ctx.lineTo(x(p), yy);
  }
  ctx.strokeStyle = VELOCITY; ctx.lineWidth = 3; ctx.stroke();
  circle(ctx, { x: x(frame.turn), y: y(frame.speedChange) }, 4, VELOCITY, true);
  line(ctx, { x: x(frame.turn), y: y0 }, { x: x(frame.turn), y: y0 + height }, GUIDE, 1);
  text(ctx, "Release", x0, y0 + height + 18, MUTED, 12);
  text(ctx, "½ turn", x(0.5), y0 + height + 18, MUTED, 12, "center");
  text(ctx, "1 turn", x(1), y0 + height + 18, MUTED, 12, "right");
}

function drawContributions(ctx, box, frame) {
  text(ctx, "Effect on speed right now", box.x, box.y + 15, INK, 14);
  const zero = box.x + box.width * 0.72;
  const unit = (box.width * 0.4) / 4;
  const rows = [["Forward", frame.forward, VELOCITY], ["Inward", frame.inward, ACCELERATION], ["Net rate", frame.netRate, INK]];
  rows.forEach(([label, value, color], i) => {
    const y = box.y + 42 + i * 30;
    text(ctx, label, box.x, y + 4, MUTED, 13);
    line(ctx, { x: zero, y: y - 9 }, { x: zero, y: y + 9 }, GUIDE, 1);
    ctx.fillStyle = color;
    ctx.fillRect(zero + Math.min(0, value * unit), y - 6, Math.max(1, Math.abs(value * unit)), 12);
    text(ctx, `${value >= 0 ? "+" : ""}${value.toFixed(2)}`, box.x + box.width, y + 4, color, 12, "right");
  });
}

// Uses the application's single canvas and transport; no animation loop or
// alternative physics/evaluator is owned by this renderer.
export function drawBinaryLesson(ctx, bounds, progress, scene) {
  if (scene.geometry === "breathing") return drawBreathingLesson(ctx, bounds, progress, scene.motionCase);
  const frame = sampleBinaryComparison(progress);
  const width = bounds.right - bounds.left, height = bounds.bottom - bounds.top;
  const stacked = width < 680;
  ctx.save();
  if (stacked) {
    const graphHeight = Math.max(105, Math.min(140, height * 0.35));
    drawOrbit(ctx, { x: bounds.left, y: bounds.top, width, height: height - graphHeight }, frame, scene.id);
    drawSpeedGraph(ctx, { x: bounds.left + 14, y: bounds.bottom - graphHeight, width: width - 22, height: graphHeight }, frame);
  } else {
    drawOrbit(ctx, { x: bounds.left, y: bounds.top, width: width * 0.57, height }, frame, scene.id);
    const side = { x: bounds.left + width * 0.6, width: width * 0.37 };
    drawContributions(ctx, { ...side, y: bounds.top + 5 }, frame);
    drawSpeedGraph(ctx, { ...side, y: bounds.top + 145, height: height - 150 }, frame);
  }
  ctx.restore();
  return frame;
}

function drawBreathingLesson(ctx, bounds, progress, motionCase) {
  const frame = sampleBreathingGeometry(progress, motionCase);
  const width = bounds.right - bounds.left, height = bounds.bottom - bounds.top;
  const narrow = width < 680;
  const diagramWidth = narrow ? width : width * 0.64;
  const diagramHeight = narrow ? height - 48 : height - 25;
  const states = Array.from({ length: 121 }, (_, i) => prescribedBreathingState(BREATHING_DURATION * i / 120, motionCase));
  const points = states.flatMap((state) => [state.positrino, state.electrino]);
  const minX = Math.min(...points.map((p) => p.x)) - 0.5;
  const maxX = Math.max(...points.map((p) => p.x)) + 0.5;
  const minY = Math.min(...points.map((p) => p.y)) - 0.5;
  const maxY = Math.max(...points.map((p) => p.y)) + 0.5;
  const scale = Math.max(1, Math.min((diagramWidth - 30) / (maxX - minX), (diagramHeight - 45) / (maxY - minY)));
  const origin = { x: bounds.left + diagramWidth / 2 - (maxX + minX) * scale / 2,
    y: bounds.top + diagramHeight / 2 + (maxY + minY) * scale / 2 + 10 };
  const map = (point) => ({ x: origin.x + scale * point.x, y: origin.y - scale * point.y });
  ctx.save();
  text(ctx, "Prescribed breathing pair · moving midpoint", bounds.left + diagramWidth / 2, bounds.top + 15, MUTED, narrow ? 12 : 14, "center");
  for (const [id, color] of [["positrino", "#ff7b95"], ["electrino", "#8bc8ff"], ["midpoint", MUTED]]) {
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const p = map(prescribedBreathingState(frame.time * i / 100, motionCase)[id]);
      if (!i) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = color; ctx.lineWidth = id === "midpoint" ? 1 : 2; ctx.stroke();
    circle(ctx, map(frame[id]), id === "midpoint" ? 3 : 6, color, true);
  }
  line(ctx, map(frame.positrino), map(frame.electrino), GUIDE, 1);
  const vector = (v, factor) => ({ x: factor * v.x, y: -factor * v.y });
  const velocityScale = Math.min(1300, diagramWidth * 2.8);
  arrow(ctx, map(frame.midpoint), vector(frame.sharedVelocity, velocityScale), VELOCITY);
  arrow(ctx, map(frame.electrino), vector({ x: -frame.radialVelocity.x, y: -frame.radialVelocity.y }, velocityScale), "#cfb2ff");
  arrow(ctx, map(frame.electrino), vector({ x: -frame.turningVelocity.x, y: -frame.turningVelocity.y }, velocityScale), "#8bc8ff");
  if (frame.available) {
    const ghost = map(frame.emission), receiver = map(frame.electrino);
    circle(ctx, ghost, 5, INK);
    ctx.setLineDash([4, 5]); line(ctx, ghost, receiver, GUIDE, 1); ctx.setLineDash([]);
    arrow(ctx, ghost, vector({ x: frame.emission.vx, y: frame.emission.vy }, velocityScale), INK);
    // Independent display scale for acceleration, declared in the lesson note.
    arrow(ctx, receiver, vector(frame.acceleration, 160), ACCELERATION);
    text(ctx, "Earlier emission", ghost.x, ghost.y + 20, MUTED, 11, "center");
  }
  const legendY = bounds.bottom - (narrow ? 26 : 5);
  text(ctx, "Shared motion", bounds.left + 8, legendY, VELOCITY, 12);
  text(ctx, "Breathing", bounds.left + 120, legendY, "#cfb2ff", 12);
  text(ctx, "Turning", bounds.left + 209, legendY, "#8bc8ff", 12);
  if (narrow) {
    text(ctx, "White: emission velocity · Gold: received acceleration", bounds.left + width / 2, bounds.bottom - 6, MUTED, 11, "center");
  } else {
    const x = bounds.left + width * 0.68, y = bounds.top + 50;
    const metrics = [
      ["Separation", frame.separation.toFixed(3)],
      ["Separation rate", frame.separationRate.toFixed(4)],
      ["Turning rate", frame.turnRate.toFixed(4)],
      ["Shared speed", Math.hypot(frame.sharedVelocity.x, frame.sharedVelocity.y).toFixed(4)],
      ["Wake delay", frame.available ? frame.delay.toFixed(3) : "unavailable"],
      ["Transmitter factor", frame.available ? frame.transmitterFactor.toFixed(4) : "unavailable"],
    ];
    metrics.forEach(([label, value], i) => {
      text(ctx, label, x, y + 30 * i, MUTED, 13);
      text(ctx, value, bounds.right - 12, y + 30 * i, INK, 13, "right");
    });
    text(ctx, "White: emission-time velocity", x, y + 205, INK, 12);
    text(ctx, "Gold: received acceleration", x, y + 225, ACCELERATION, 12);
  }
  ctx.restore();
  return frame;
}
