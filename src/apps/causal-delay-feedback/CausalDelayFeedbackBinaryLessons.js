import { createDisplayAuthority } from "./CausalDelayFeedbackCausalHistory.js";

// The independently derived reference is the finite-orbital-time forced response
// in slow-binary-first-order-drift.md. No EOM integration is performed here.
export const BINARY_LESSONS = Object.freeze([
  {
    id: "binary-release", title: "The initial speed increase",
    body: "Start with an opposite-polarity pair moving around a common midpoint. Each member receives acceleration directed toward where its partner was earlier. At release, this direction leans slightly forward of the inward radius. The inward part bends the motion; the forward part increases speed.",
    start: 0, end: 1 / 6,
  },
  {
    id: "binary-tilts", title: "Two competing tilts",
    body: "As the pair widens, each member’s velocity tilts outward. The large inward acceleration now opposes part of that outward motion and reduces speed. The smaller forward contribution still adds speed. Only acceleration along the velocity changes speed; the balance depends on both directions.",
    start: 1 / 6, end: 1 / 2,
  },
  {
    id: "binary-cycle", title: "Speed changes through a turn",
    body: "The outward tilt grows and then shrinks during the turn. Speed initially rises, falls through the middle of the turn, and rises again near the end. The contribution readout shows the competing effects right now. The curve shows the speed change accumulated since release: below zero means slower than at release.",
    start: 0, end: 1,
  },
  {
    id: "binary-average", title: "Why the full turn loses speed",
    body: "Over one reference revolution, the forward contribution averages +1 relative unit, while the inward contribution averages −2. Their net effect averages −1. The pair therefore ends the turn slower than it began, even though it is speeding up again at the end. This comparison covers one slow, near-circular turn; it does not establish the pair’s indefinite future.",
    start: 0, end: 1,
  },
  {
    id: "binary-breathing", title: "Breathing with shared motion",
    body: "Separation change, turning, and shared motion are different parts of a pair’s velocity. Here the midpoint moves while the pair opens and closes. The received acceleration points toward the partner’s earlier position; its strength also depends on that partner’s velocity when the wake was emitted. These are prescribed paths chosen to show the geometry, not a repeating solution of the equation.",
    start: 0, end: 1, geometry: "breathing",
  },
  {
    id: "binary-reversal", title: "Small turning and reversal",
    body: "Compare a nearly radial pair with one whose turning reverses. Separation remains positive, so the geometry stays regular when turning passes through zero. Different averages emphasize different parts of the motion and can have different signs. Breathing and shared motion must therefore be kept together when interpreting a result. These prescribed examples do not establish an average speed gain or loss.",
    start: 0, end: 1, geometry: "breathing", motionCase: "reversal",
  },
]);

export const BINARY_COMPARISON_NOTE =
  "First-order slow-binary comparison · wake speed = 1. Widening and arrow angles are enlarged; the orbit is schematic. No EOM trajectory is being computed.";
export const BREATHING_COMPARISON_NOTE =
  "Prescribed geometry · unchanged Master Equation contribution · wake speed = 1. Velocity and acceleration arrows use separate display scales. These paths are not EOM output or evidence of a bound pair.";

export function sampleBinaryComparison(progress) {
  const p = Number(progress);
  if (!Number.isFinite(p)) throw new TypeError("Binary turn progress must be finite.");
  const turn = Math.max(0, Math.min(1, p));
  const phase = 2 * Math.PI * turn;
  const outwardPitch = 2 * (1 - Math.cos(phase));
  return {
    turn, phase, outwardPitch,
    forward: 1,
    inward: -outwardPitch,
    netRate: 2 * Math.cos(phase) - 1,
    speedChange: -phase + 2 * Math.sin(phase),
    // A schematic widening circle: the displacement shape is the first-order
    // radial response (phi - sin phi). This is not a numerical trajectory.
    diagramRadius: 1 + 0.025 * (phase - Math.sin(phase)),
  };
}

export function createBinaryLessonView(state) {
  const stepIndex = Math.max(0, Math.min(BINARY_LESSONS.length - 1, Math.floor(Number(state.storyStep) || 0)));
  return { ...BINARY_LESSONS[stepIndex], stepIndex, stepCount: BINARY_LESSONS.length };
}

export function createBinaryLessonScene(state) {
  const view = createBinaryLessonView(state);
  return {
    ...view,
    scenario: "binary-pair",
    motionCase: view.geometry === "breathing"
      ? (view.motionCase ? state.binaryMotionCase ?? view.motionCase : "turning") : undefined,
    playbackStartTime: view.start,
    playbackEndTime: view.end,
    displayTime: view.start,
    playbackDurationSeconds: (view.geometry === "breathing" ? 32 : 24) * (view.end - view.start),
    autoPauseProgress: 1,
    wakeDisplayRateScale: 1,
    displayAuthority: createDisplayAuthority(view.geometry === "breathing" ? "prescribed_breathing_geometry" : "analytical_slow_binary_comparison", {
      label: view.geometry === "breathing" ? "Prescribed breathing paths; evaluated received contribution" : "First-order analytical comparison; schematic geometry",
      claimGrade: view.geometry === "breathing" ? "prescribed-demonstration" : "derived-comparison",
      fieldSpeed: 1,
    }),
  };
}
