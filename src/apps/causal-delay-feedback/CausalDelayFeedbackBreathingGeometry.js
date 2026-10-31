import { evaluateScalarRootSet } from "./CausalDelayFeedbackCausalHistory.js";

export const BREATHING_DURATION = 160;
const OMEGA = 2 * Math.PI / BREATHING_DURATION;

// Finite demonstration inputs, not solutions. Cartesian definitions avoid any
// inverse angular-momentum weight at small turning or direction reversal.
export function prescribedBreathingState(time, motionCase = "turning") {
  const phase = OMEGA * time;
  const separation = 2 + 0.45 * Math.sin(phase);
  const separationRate = 0.45 * OMEGA * Math.cos(phase);
  const angle = motionCase === "reversal" ? 0.45 * Math.sin(phase)
    : (motionCase === "near-radial" ? 0.015 : 0.55) * phase;
  const turnRate = motionCase === "reversal" ? 0.45 * OMEGA * Math.cos(phase)
    : (motionCase === "near-radial" ? 0.015 : 0.55) * OMEGA;
  const midpoint = { x: 0.02 * time, y: 0.008 * time + 0.1 * Math.sin(phase) };
  const sharedVelocity = { x: 0.02, y: 0.008 + 0.1 * OMEGA * Math.cos(phase) };
  const n = { x: Math.cos(angle), y: Math.sin(angle) };
  const tangent = { x: -n.y, y: n.x };
  const radialVelocity = { x: separationRate * n.x / 2, y: separationRate * n.y / 2 };
  const turningVelocity = { x: separation * turnRate * tangent.x / 2, y: separation * turnRate * tangent.y / 2 };
  const member = (sign) => ({
    x: midpoint.x + sign * separation * n.x / 2,
    y: midpoint.y + sign * separation * n.y / 2,
    vx: sharedVelocity.x + sign * (radialVelocity.x + turningVelocity.x),
    vy: sharedVelocity.y + sign * (radialVelocity.y + turningVelocity.y),
  });
  return { time, phase, separation, separationRate, angle, turnRate,
    midpoint, sharedVelocity, radialVelocity, turningVelocity,
    positrino: member(1), electrino: member(-1) };
}

export function sampleBreathingGeometry(progress, motionCase = "turning") {
  const turn = Math.max(0, Math.min(1, Number(progress)));
  if (!Number.isFinite(turn)) throw new TypeError("Breathing progress must be finite.");
  const time = BREATHING_DURATION * turn;
  const current = prescribedBreathingState(time, motionCase);
  const receiver = current.electrino;
  const rootSet = evaluateScalarRootSet({
    start: time - 5, end: time - 1e-8, scanSteps: 32,
    residualAt(emissionTime) {
      const source = prescribedBreathingState(emissionTime, motionCase).positrino;
      return Math.hypot(receiver.x - source.x, receiver.y - source.y) - (time - emissionTime);
    },
  });
  const root = rootSet.roots.length === 1 ? rootSet.roots[0] : null;
  if (!root || root.tangent) return { ...current, turn, available: false };
  const emission = prescribedBreathingState(root.time, motionCase).positrino;
  const dx = receiver.x - emission.x, dy = receiver.y - emission.y;
  const distance = Math.hypot(dx, dy);
  const direction = { x: dx / distance, y: dy / distance };
  const transmitterFactor = 1 - direction.x * emission.vx - direction.y * emission.vy;
  if (!(transmitterFactor > 1e-5)) return { ...current, turn, available: false };
  // Unit reduced coupling, c_f=1, opposite unit polarities. This evaluates the
  // received row on the prescribed geometry; it never evolves those paths.
  const strength = 1 / (distance * distance * Math.abs(transmitterFactor));
  return { ...current, turn, available: true, emission, emissionTime: root.time,
    delay: time - root.time, transmitterFactor, residual: root.residual,
    acceleration: { x: -strength * direction.x, y: -strength * direction.y } };
}
