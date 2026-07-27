import { sampleTimedPath } from "./CausalDelayFeedbackTimedPath.js";

const BODY_START_FRACTIONS = Object.freeze({
  originalElectrino: 0,
  positrino: 0.25,
  secondElectrino: 0.5,
});
const SHARED_ADVANCE_SPAN = 0.5;
const STANDARD_WAKE_FRONT_SPAN_DEGREES = 14;

const DISPLAY_AUTHORITY = Object.freeze({
  kind: "declared_superposition_teaching_fixture",
  label: "Declared superposition teaching fixture",
  evidenceStatus: "display-only",
  teachingFixture: true,
  physicsAcceptance: false,
  physicalLawClaim: false,
  bindingClaim: false,
  stabilityClaim: false,
  solvedTrajectoryClaim: false,
});

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function copyPath(path) {
  return Array.isArray(path)
    ? path.map((point) => ({
        ...point,
        x: Number(point?.x),
        y: Number(point?.y),
        t: Number(point?.t),
      }))
    : [];
}

function createLowerElectrinoPath(positrinoPath, electrinoPath) {
  return copyPath(electrinoPath).map((point) => {
    const redPoint = sampleTimedPath(positrinoPath, point.t);
    if (!redPoint) {
      return point;
    }
    return {
      ...point,
      y: Number(redPoint.y) + Math.abs(Number(point.y) - Number(redPoint.y)),
    };
  });
}

function createMiddleElectrinoPath(positrinoPath, lowerElectrinoPath) {
  return lowerElectrinoPath.map((point) => {
    const redPoint = sampleTimedPath(positrinoPath, point.t);
    if (!redPoint) {
      return point;
    }
    return {
      ...point,
      y: Number(redPoint.y) + (Number(point.y) - Number(redPoint.y)) * 0.5,
    };
  });
}

export function createSuperpositionPaths(state) {
  const positrinoPath = copyPath(state?.paths?.positrino);
  const lowerElectrinoPath = createLowerElectrinoPath(
    positrinoPath,
    state?.paths?.electrino,
  );
  const middleElectrinoPath = createMiddleElectrinoPath(
    positrinoPath,
    lowerElectrinoPath,
  );
  return Object.freeze([
    Object.freeze({
      id: "positrino-path",
      kind: "positrino",
      role: "receiver",
      points: positrinoPath,
    }),
    Object.freeze({
      id: "original-electrino-path",
      kind: "electrino",
      role: "lower-source",
      points: lowerElectrinoPath,
    }),
    Object.freeze({
      id: "second-electrino-path",
      kind: "electrino",
      role: "middle-source",
      points: middleElectrinoPath,
    }),
  ]);
}

function sampleBody(path, id, kind, phase, startFraction) {
  const progress = clamp(phase);
  const pathTime = clamp(startFraction + SHARED_ADVANCE_SPAN * progress);
  const sampled = sampleTimedPath(path?.points, pathTime);
  if (
    !sampled ||
    !Number.isFinite(Number(sampled.x)) ||
    !Number.isFinite(Number(sampled.y))
  ) {
    return null;
  }
  return {
    id,
    kind,
    pathId: path.id,
    startFraction,
    pathTime,
    point: { x: Number(sampled.x), y: Number(sampled.y) },
    label: id === "positrino" ? "positrino" : "electrino",
  };
}

function createSelectedArc(id, source, receiver, phase, nearer) {
  const dx = receiver.point.x - source.point.x;
  const dy = receiver.point.y - source.point.y;
  const distance = Math.hypot(dx, dy);
  const angleDegrees = (Math.atan2(dy, dx) * 180) / Math.PI;
  return {
    id,
    direction: "electrino-to-positrino",
    sourceId: source.id,
    receiverId: receiver.id,
    emissionOrigin: source.point,
    receptionPoint: receiver.point,
    distance,
    nearer,
    wakeFront: {
      center: source.point,
      radius: distance,
      startDegrees:
        angleDegrees - STANDARD_WAKE_FRONT_SPAN_DEGREES * 0.5,
      endDegrees:
        angleDegrees + STANDARD_WAKE_FRONT_SPAN_DEGREES * 0.5,
      dotRadius: nearer ? 2.05 : 1.65,
      opacity: (nearer ? 0.88 : 0.62) * (1 - 0.22 * clamp(phase)),
      style: "standard-fading-dotted-wake-front",
    },
  };
}

function createContribution(arc) {
  const dx = arc.emissionOrigin.x - arc.receptionPoint.x;
  const dy = arc.emissionOrigin.y - arc.receptionPoint.y;
  const length = Math.hypot(dx, dy) || 1;
  // The relative weight is authored teaching geometry, not a derived
  // magnitude or an inverse-square premise.
  const teachingWeight = arc.nearer ? 1.25 : 1;
  return {
    arcId: arc.id,
    direction: "attractive teaching contribution",
    teachingWeight,
    vector: {
      x: (dx / length) * teachingWeight,
      y: (dy / length) * teachingWeight,
    },
    arrow: {
      origin: arc.receptionPoint,
      target: arc.emissionOrigin,
      lengthFraction: arc.nearer ? 0.72 : 0.48,
      width: 3.2,
      color: "white",
    },
  };
}

export function createSuperpositionScene(state, { phase = 0 } = {}) {
  const progress = clamp(phase);
  const paths = createSuperpositionPaths(state);
  const positrinoPath = paths.find((path) => path.id === "positrino-path");
  const originalElectrinoPath = paths.find(
    (path) => path.id === "original-electrino-path",
  );
  const secondElectrinoPath = paths.find(
    (path) => path.id === "second-electrino-path",
  );
  const positrino = sampleBody(
    positrinoPath,
    "positrino",
    "positrino",
    progress,
    BODY_START_FRACTIONS.positrino,
  );
  const originalElectrino = sampleBody(
    originalElectrinoPath,
    "original-electrino",
    "electrino",
    progress,
    BODY_START_FRACTIONS.originalElectrino,
  );
  const secondElectrino = sampleBody(
    secondElectrinoPath,
    "second-electrino",
    "electrino",
    progress,
    BODY_START_FRACTIONS.secondElectrino,
  );
  const bodies = [originalElectrino, positrino, secondElectrino].filter(Boolean);
  if (!positrino || !originalElectrino || !secondElectrino) {
    return {
      id: "superposition",
      lessonNumber: 7,
      phase: progress,
      paths,
      bodies,
      selectedArcs: [],
      contributions: [],
      componentArrows: [],
      netVector: { x: 0, y: 0 },
      netAccelerationArrow: null,
      omittedReciprocalSet: true,
      displayAuthority: DISPLAY_AUTHORITY,
    };
  }

  const sources = [originalElectrino, secondElectrino];
  const distances = sources.map((source) =>
    Math.hypot(
      positrino.point.x - source.point.x,
      positrino.point.y - source.point.y,
    ));
  const nearerIndex = distances[0] <= distances[1] ? 0 : 1;
  const selectedArcs = sources.map((source, index) =>
    createSelectedArc(
      `${source.id}-to-positrino`,
      source,
      positrino,
      progress,
      nearerIndex === index,
    ));
  const contributions = selectedArcs.map(createContribution);
  const netVector = contributions.reduce(
    (sum, contribution) => ({
      x: sum.x + contribution.vector.x,
      y: sum.y + contribution.vector.y,
    }),
    { x: 0, y: 0 },
  );

  return {
    id: "superposition",
    lessonNumber: 7,
    phase: progress,
    paths,
    bodies,
    selectedArcs,
    contributions,
    componentArrows: contributions.map((contribution) => contribution.arrow),
    netVector,
    netAccelerationArrow: {
      origin: positrino.point,
      vector: netVector,
      color: "white",
      label: "net acceleration",
    },
    omittedReciprocalSet: true,
    displayAuthority: DISPLAY_AUTHORITY,
  };
}
