import {
  C1_CUBIC_HERMITE_INTERPOLATION,
  sampleTimedPath,
  usesC1TimedPathInterpolation,
} from "./CausalDelayFeedbackTimedPath.js";
import {
  DEFAULT_CANVAS_DISTANCE_SCALE,
  NORMALIZED_FIELD_SPEED,
  createDisplayAuthority,
  createCausalDelayResidual,
  evaluateCausalRoots,
} from "./CausalDelayFeedbackCausalHistory.js";
import {
  PATH_TIME_END_X,
  PATH_TIME_START_X,
  SPACE_AXIS_TOP_Y,
  TIME_AXIS_END_X,
  TIME_AXIS_BASELINE_Y,
  TIME_AXIS_ORIGIN_X,
} from "./CausalDelayFeedbackDisplayContract.js";

const STORY_WAKE_SAMPLE_PROGRESS = 0.025;
const STORY_TRAVERSAL_BASE_SECONDS = 22.5;
const STORY_SYNTHESIS_BASE_SECONDS = 8;
const STORY_MOTION_COMPARISON_BASE_SECONDS = 6;
export const STORY_TWO_THREE_HANDOFF_TIME_AXIS_FRACTION = 0.5;
export const STORY_THREE_END_TIME_AXIS_FRACTION = 0.8;
export const INVERSE_SQUARE_START_PROGRESS = 0.5;
function getPathProgressAtTimeAxisFraction(axisFraction) {
  const axisX =
    TIME_AXIS_ORIGIN_X +
    (TIME_AXIS_END_X - TIME_AXIS_ORIGIN_X) * axisFraction;
  return Number(
    ((axisX - PATH_TIME_START_X) / (PATH_TIME_END_X - PATH_TIME_START_X))
      .toFixed(12),
  );
}
export const STORY_TWO_THREE_HANDOFF_PATH_PROGRESS =
  getPathProgressAtTimeAxisFraction(
    STORY_TWO_THREE_HANDOFF_TIME_AXIS_FRACTION,
  );
export const STORY_THREE_END_PATH_PROGRESS =
  getPathProgressAtTimeAxisFraction(STORY_THREE_END_TIME_AXIS_FRACTION);
const STORY_MOTION_COMPARISON_TIME = 0.6;
const STORY_MOTION_COMPARISON_DISTANCE_SCALE = 1 / 220;
const STORY_MOTION_COMPARISON_CENTER_Y =
  (SPACE_AXIS_TOP_Y + TIME_AXIS_BASELINE_Y) * 0.5;
const STORY_MOTION_EMISSION_TIMES = Object.freeze([0, 0.12, 0.24, 0.36, 0.48]);
const STORY_ARC_START_CACHE = new WeakMap();
export const STORY_SYNTHESIS_DISPLAY_MAPPING =
  "normalized_each_body_emission_to_later_reception";

// This is the single Story presentation-rate control. It changes how quickly
// replay time advances on screen, without changing normalized c_f or any
// evaluator geometry. Keeping bodies, wakes, arcs, and event markers on this
// clock preserves their causal registration.
export const STORY_WAKE_DISPLAY_RATE_SCALE = 0.8;
export const STORY_MOTION_SPEED_FRACTIONS = Object.freeze([0.3, 0.6, 0.9]);

function getScaledStoryDuration(baseSeconds) {
  return baseSeconds / STORY_WAKE_DISPLAY_RATE_SCALE;
}

export const STORY_SHARED_PATH_PLAYBACK_SECONDS =
  getScaledStoryDuration(STORY_TRAVERSAL_BASE_SECONDS);

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function getPointDistance(left, right) {
  return Math.hypot(
    Number(right?.x) - Number(left?.x),
    Number(right?.y) - Number(left?.y),
    Number(right?.z ?? 0) - Number(left?.z ?? 0),
  );
}

export function createStoryTimeAxisPath(path) {
  if (!Array.isArray(path)) {
    return [];
  }
  const span = PATH_TIME_END_X - PATH_TIME_START_X;
  const mapped = path.map((point) => ({
    ...point,
    t: span > 0
      ? (Number(point?.x) - PATH_TIME_START_X) / span
      : Number(point?.t),
  })).sort((left, right) => left.t - right.t);
  if (usesC1TimedPathInterpolation(path)) {
    mapped.interpolationMode = C1_CUBIC_HERMITE_INTERPOLATION;
  }
  return mapped;
}

export const STORY_RELATIONSHIP_DESCRIPTIONS = Object.freeze([
  Object.freeze({
    label: "Relationship One",
    description: "Electrino transmitter → Positrino receiver",
  }),
  Object.freeze({
    label: "Relationship Two",
    description: "Positrino transmitter → Electrino receiver",
  }),
]);

export const STORY_STEPS = Object.freeze([
  {
    id: "meet",
    title: "Meet the Electrino and Positrino Transceivers",
    body: "Each architrino transmits continuously at a constant rate. The solid dot on each body marks its current emission point. Earlier transmission points remain visible as wake history. Each full circle is a two-dimensional view of an expanding spherical wake. Wakes emitted earlier have had longer to expand, so they have a larger radius.",
  },
  {
    id: "emission",
    title: "Wakes Received Now Were Transmitted in the Past",
    body: "Wakes arriving at a receiver now were transmitted earlier in the transmitter’s path history. The fading red and blue arcs show where the transmissions arriving now were emitted. The white dot marks where that wake was transmitted. By the time the wake is received, both architrinos have moved on from their earlier positions.",
  },
  {
    id: "meaning",
    title: "Two Reciprocal Causal Relationships",
    body: "Each full circle is a two-dimensional view of an expanding spherical wake. The matching fading red or blue arc highlights the portion that meets the other architrino. The circle and the arc share the same earlier transmission point and the same reception point.",
  },
  {
    id: "motion",
    title: "Motion Changes Wake Shape",
    body: "For a moving architrino, the wake is compressed in front and expanded behind. These evaluator-backed display fixtures use the same transmission times with C_f=1; only transmitter speed changes. Higher speed tightens the fronts ahead and spreads them farther behind.",
  },
  {
    id: "forward-buildup",
    title: "Wake Buildup at Field Speed",
    body: "At field speed, each architrino moves with the advancing edge of the wakes it continually emits. As successive wakes expand, their forward edges stay together at the moving front. The wake builds up there.",
  },
]);

export const STORY_PREVIEW_STEPS = Object.freeze([
  Object.freeze({
    id: "inverse-square-spreading",
    title: "Inverse-Square Spreading",
  }),
  Object.freeze({
    id: "acceleration",
    title: "Acceleration",
  }),
  Object.freeze({
    id: "superposition",
    title: "Wakes Combine by Superposition",
  }),
  Object.freeze({
    id: "reciprocal-causal-chain",
    title: "Continuous Delayed Feedback / Reciprocal Causal Chain",
  }),
]);

function createConstantSpeedPath({
  currentPosition,
  speedFraction,
  startTime = 0,
  endTime = STORY_MOTION_COMPARISON_TIME,
}) {
  const velocity = speedFraction * NORMALIZED_FIELD_SPEED /
    STORY_MOTION_COMPARISON_DISTANCE_SCALE;
  return [
    {
      t: startTime,
      x: currentPosition.x - velocity * (endTime - startTime),
      y: currentPosition.y,
      z: 0,
    },
    {
      t: endTime,
      x: currentPosition.x,
      y: currentPosition.y,
      z: 0,
    },
  ];
}

export function createStoryMotionWakeComparisonFixture(
  state,
  displayTime = STORY_MOTION_COMPARISON_TIME,
) {
  const time = Math.max(0, Math.min(STORY_MOTION_COMPARISON_TIME, Number(displayTime) || 0));
  const selectedSpeedFraction = STORY_MOTION_SPEED_FRACTIONS.includes(
    Number(state?.storyMotionSpeedFraction),
  )
    ? Number(state.storyMotionSpeedFraction)
    : STORY_MOTION_SPEED_FRACTIONS[1];
  const currentPositions = [
    { x: 470, y: STORY_MOTION_COMPARISON_CENTER_Y, z: 0 },
    { x: 960, y: STORY_MOTION_COMPARISON_CENTER_Y, z: 0 },
    { x: 1450, y: STORY_MOTION_COMPARISON_CENTER_Y, z: 0 },
  ];
  const comparisons = STORY_MOTION_SPEED_FRACTIONS.map((speedFraction, index) => {
    const currentPosition = currentPositions[index];
    const sourcePath = createConstantSpeedPath({
      currentPosition,
      speedFraction,
      endTime: time,
    });
    const currentSource = sampleTimedPath(sourcePath, time);
    const fronts = STORY_MOTION_EMISSION_TIMES
      .filter((emissionTime) => emissionTime <= time + Number.EPSILON)
      .map((emissionTime) => {
        const center = sampleTimedPath(sourcePath, emissionTime);
        const age = Math.max(0, time - emissionTime);
        const radius = NORMALIZED_FIELD_SPEED * age /
          STORY_MOTION_COMPARISON_DISTANCE_SCALE;
        const frontPoint = {
          t: time,
          x: center.x + radius,
          y: center.y,
          z: 0,
        };
        const rearPoint = {
          t: time,
          x: center.x - radius,
          y: center.y,
          z: 0,
        };
        const frontResidual = createCausalDelayResidual({
          sourcePath,
          receiverPath: [frontPoint],
          receiverTime: time,
          signalSpeed: NORMALIZED_FIELD_SPEED,
          distanceScale: STORY_MOTION_COMPARISON_DISTANCE_SCALE,
        })(emissionTime);
        const rearResidual = createCausalDelayResidual({
          sourcePath,
          receiverPath: [rearPoint],
          receiverTime: time,
          signalSpeed: NORMALIZED_FIELD_SPEED,
          distanceScale: STORY_MOTION_COMPARISON_DISTANCE_SCALE,
        })(emissionTime);
        return {
          id: `motion-${speedFraction.toFixed(1)}-${emissionTime.toFixed(2)}`,
          emissionTime,
          center,
          age,
          radius,
          frontPoint,
          rearPoint,
          frontResidual,
          rearResidual,
        };
      });
    const oldestFront = fronts[0] ?? null;
    return {
      speedFraction,
      selected: speedFraction === selectedSpeedFraction,
      sourcePath,
      currentSource,
      fronts,
      frontReach: oldestFront ? oldestFront.frontPoint.x - currentSource.x : 0,
      rearReach: oldestFront ? currentSource.x - oldestFront.rearPoint.x : 0,
    };
  });
  const residuals = comparisons.flatMap((comparison) =>
    comparison.fronts.flatMap((front) => [front.frontResidual, front.rearResidual]));
  return {
    fixtureKind: "declared_constant_speed_transmitter_history",
    evidenceBoundary: "Evaluator-backed aligned constant-speed snapshot fixture; not an EOM-solved trajectory.",
    displayAuthority: createDisplayAuthority(
      "declared_constant_speed_teaching_fixture",
      {
        label: "Declared constant-speed teaching fixture",
        eomSolvedTrajectory: false,
      },
    ),
    signalSpeed: NORMALIZED_FIELD_SPEED,
    distanceScale: STORY_MOTION_COMPARISON_DISTANCE_SCALE,
    displayTime: time,
    selectedSpeedFraction,
    emissionTimes: STORY_MOTION_EMISSION_TIMES,
    comparisons,
    maximumResidual: residuals.length > 0
      ? Math.max(...residuals.map((residual) => Math.abs(residual)))
      : 0,
  };
}

function getSharedPathPlaybackWindow(state, preferredEndTime) {
  const coverages = Object.values(state.paths ?? {}).map((path) => {
    const times = (path ?? [])
      .map((point) => Number(point?.t))
      .filter(Number.isFinite);
    return times.length > 0
      ? { start: Math.min(...times), end: Math.max(...times) }
      : null;
  }).filter(Boolean);
  const startTime = coverages.length > 0
    ? Math.max(...coverages.map((coverage) => coverage.start))
    : 0;
  const coverageEndTime = coverages.length > 0
    ? Math.min(...coverages.map((coverage) => coverage.end))
    : startTime;
  return {
    playbackStartTime: startTime,
    playbackEndTime: Math.max(
      startTime,
      Math.min(Number(preferredEndTime) || coverageEndTime, coverageEndTime),
    ),
  };
}

function hasBothReciprocalArcEvents(state, receiverTime) {
  const identities = [
    { transmitterId: state.sourceId, receiverId: state.receiverId },
    { transmitterId: state.receiverId, receiverId: state.sourceId },
  ];
  return identities.every(({ transmitterId, receiverId }) => {
    const transmitterPath = createStoryTimeAxisPath(
      state.paths?.[transmitterId],
    );
    const receiverPath = createStoryTimeAxisPath(state.paths?.[receiverId]);
    const receiver = sampleTimedPath(receiverPath, receiverTime);
    if (!receiver) {
      return false;
    }
    const root = evaluateCausalRoots({
      sourceId: transmitterId,
      receiverId,
      sourcePath: transmitterPath,
      receiverPath: [
        { ...receiver, t: receiverPath?.[0]?.t ?? 0 },
        { ...receiver, t: receiverTime },
      ],
      receiverTime,
      signalSpeed: NORMALIZED_FIELD_SPEED,
      distanceScale: Number(
        state.roots?.[0]?.distanceScale ??
        state.reciprocalRoots?.[0]?.distanceScale ??
        1 / 3000,
      ),
      scanSteps: 96,
    }).acceptedRoots.at(-1);
    return Boolean(
      root &&
      root.emission &&
      root.reception &&
      root.emissionTime < receiverTime,
    );
  });
}

export function getEarliestCommonStoryArcTime(state, playbackWindow) {
  const start = Number(playbackWindow?.playbackStartTime);
  const end = Number(playbackWindow?.playbackEndTime);
  if (!Number.isFinite(start) || !Number.isFinite(end) || !(end > start)) {
    return start;
  }
  const pathSignature = Object.entries(state?.paths ?? {})
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([kind, path]) => {
      const totals = (path ?? []).reduce((sum, point, index) => ({
        x: sum.x + (index + 1) * (Number(point?.x) || 0),
        y: sum.y + (index + 1) * (Number(point?.y) || 0),
        t: sum.t + (index + 1) * (Number(point?.t) || 0),
      }), { x: 0, y: 0, t: 0 });
      return `${kind}:${path?.length ?? 0}:${totals.x}:${totals.y}:${totals.t}`;
    })
    .join("|");
  const cacheKey = `${start}:${end}:${pathSignature}`;
  const cached = state && typeof state === "object"
    ? STORY_ARC_START_CACHE.get(state)
    : null;
  if (cached?.key === cacheKey) {
    return cached.value;
  }
  const remember = (value) => {
    if (state && typeof state === "object") {
      STORY_ARC_START_CACHE.set(state, { key: cacheKey, value });
    }
    return value;
  };
  const steps = 256;
  let previous = start;
  for (let index = 1; index <= steps; index += 1) {
    const candidate = start + ((end - start) * index) / steps;
    if (!hasBothReciprocalArcEvents(state, candidate)) {
      previous = candidate;
      continue;
    }
    let low = previous;
    let high = candidate;
    for (let refine = 0; refine < 24; refine += 1) {
      const middle = (low + high) * 0.5;
      if (hasBothReciprocalArcEvents(state, middle)) {
        high = middle;
      } else {
        low = middle;
      }
    }
    return remember(high);
  }
  return remember(start);
}

export function createStoryScene(state) {
  const view = createStoryView(state);
  const displayAuthority = createDisplayAuthority(
    "declared_story_teaching_fixture",
    {
      label: "Declared lesson teaching fixture",
      sourceReplayKind:
        state?.replay?.kind ??
        state?.dataset?.displayAuthority?.kind ??
        "unavailable_provider",
    },
  );
  const interactions = view.interactions.filter((interaction) => interaction.root);
  const playbackWindow = getSharedPathPlaybackWindow(
    state,
    Number.POSITIVE_INFINITY,
  );
  const emissionTimes = interactions.map((interaction) => interaction.root.emissionTime);
  const delays = interactions.map((interaction) =>
    Math.max(0, interaction.root.receiverTime - interaction.root.emissionTime));
  const earliestEmissionTime = emissionTimes.length > 0
    ? Math.min(...emissionTimes)
    : playbackWindow.playbackStartTime;
  const maximumDelay = delays.length > 0 ? Math.max(...delays) : 0;
  const fixedBodyTime =
    playbackWindow.playbackStartTime +
    (playbackWindow.playbackEndTime - playbackWindow.playbackStartTime) *
      STORY_TWO_THREE_HANDOFF_PATH_PROGRESS;
  const synthesisEndTime =
    playbackWindow.playbackStartTime +
    (playbackWindow.playbackEndTime - playbackWindow.playbackStartTime) *
      STORY_THREE_END_PATH_PROGRESS;
  const inverseSquareStartTime =
    playbackWindow.playbackStartTime +
    (playbackWindow.playbackEndTime - playbackWindow.playbackStartTime) *
      INVERSE_SQUARE_START_PROGRESS;
  const earliestCommonArcTime = view.id === "emission"
    ? getEarliestCommonStoryArcTime(state, playbackWindow)
    : playbackWindow.playbackStartTime;
  const fullPlaybackSpan = Math.max(
    Number.EPSILON,
    playbackWindow.playbackEndTime - playbackWindow.playbackStartTime,
  );
  const emissionPlaybackSpan = Math.max(
    Number.EPSILON,
    fixedBodyTime - earliestCommonArcTime,
  );
  const stage = {
    meet: {
      startTime: Math.max(0, earliestEmissionTime - maximumDelay * 0.52),
      endTime: Math.max(0, earliestEmissionTime - maximumDelay * 0.08),
      displayTime: playbackWindow.playbackStartTime,
      playbackDurationSeconds: STORY_SHARED_PATH_PLAYBACK_SECONDS,
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      wakeDisplayTimeScale: 1,
      showWake: false,
      showSampledWakeHistory: true,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    emission: {
      startTime: earliestCommonArcTime,
      endTime: fixedBodyTime,
      playbackStartTime: earliestCommonArcTime,
      playbackEndTime: fixedBodyTime,
      displayTime: earliestCommonArcTime,
      playbackDurationSeconds:
        getScaledStoryDuration(STORY_TRAVERSAL_BASE_SECONDS) *
        (emissionPlaybackSpan / fullPlaybackSpan),
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      wakeDisplayTimeScale: 1,
      autoPauseProgress: 1,
      pausePathProgress: STORY_TWO_THREE_HANDOFF_PATH_PROGRESS,
      showWake: false,
      showSampledWakeHistory: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    meaning: {
      startTime: fixedBodyTime,
      endTime: synthesisEndTime,
      playbackStartTime: fixedBodyTime,
      playbackEndTime: synthesisEndTime,
      displayTime: fixedBodyTime,
      playbackDurationSeconds: getScaledStoryDuration(STORY_SYNTHESIS_BASE_SECONDS),
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      showSynthesisMotion: true,
      showSynthesisWakeCircles: true,
      showWake: false,
      showSampledWakeHistory: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    motion: {
      startTime: 0,
      endTime: STORY_MOTION_COMPARISON_TIME,
      playbackStartTime: 0,
      playbackEndTime: STORY_MOTION_COMPARISON_TIME,
      displayTime: 0,
      playbackDurationSeconds: getScaledStoryDuration(
        STORY_MOTION_COMPARISON_BASE_SECONDS,
      ),
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      showMotionWakeComparison: true,
      showWake: false,
      showSampledWakeHistory: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    "forward-buildup": {
      startTime: playbackWindow.playbackStartTime,
      endTime: playbackWindow.playbackEndTime,
      playbackStartTime: playbackWindow.playbackStartTime,
      playbackEndTime: playbackWindow.playbackEndTime,
      displayTime: playbackWindow.playbackStartTime,
      playbackDurationSeconds: STORY_SHARED_PATH_PLAYBACK_SECONDS,
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      wakeDisplayTimeScale: 1,
      showForwardWakeBuildup: true,
      showWake: false,
      showSampledWakeHistory: true,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
    "inverse-square-spreading": {
      startTime: inverseSquareStartTime,
      endTime: playbackWindow.playbackEndTime,
      playbackStartTime: inverseSquareStartTime,
      playbackEndTime: playbackWindow.playbackEndTime,
      displayTime: inverseSquareStartTime,
      fixedBodyTime: inverseSquareStartTime,
      playbackDurationSeconds:
        STORY_SHARED_PATH_PLAYBACK_SECONDS *
        (1 - INVERSE_SQUARE_START_PROGRESS),
      wakeDisplayRateScale: STORY_WAKE_DISPLAY_RATE_SCALE,
      showInverseSquareSpreading: true,
      showWake: false,
      showSampledWakeHistory: false,
      showTransmissionGhost: false,
      showCausalLine: false,
      showReceptionMarker: false,
    },
  }[view.id];
  return {
    id: view.id,
    interactions,
    displayAuthority,
    ...playbackWindow,
    ...stage,
  };
}

export function createStorySynthesisPlayback(
  state,
  interactions,
  displayProgress,
) {
  const progress = clamp01(displayProgress);
  const availableInteractions = (interactions ?? []).filter(
    (interaction) =>
      interaction?.root?.emission &&
      interaction?.root?.reception,
  );
  const events = availableInteractions.map((interaction) => {
    const emissionTime = Number(interaction.root.emissionTime);
    const receiverTime = Number(interaction.root.receiverTime);
    const source = {
      ...interaction.root.emission,
      t: emissionTime,
    };
    const receiver = {
      ...interaction.root.reception,
      t: receiverTime,
    };
    return {
      id: `story-synthesis:${interaction.id}`,
      sourceKind: interaction.transmitterId,
      receiverKind: interaction.receiverId,
      source,
      receiver,
      emissionTime,
      hitTime: receiverTime,
      travelTime: receiverTime - emissionTime,
      distance: getPointDistance(source, receiver),
      rootResidual: Number(interaction.root.residual),
    };
  });
  const bodies = Object.fromEntries(
    ["positrino", "electrino"].map((kind) => {
      const outgoing = availableInteractions.find(
        (interaction) => interaction.transmitterId === kind,
      );
      const incoming = availableInteractions.find(
        (interaction) => interaction.receiverId === kind,
      );
      if (!outgoing?.root?.emission || !incoming?.root?.reception) {
        return [kind, null];
      }
      const startTime = Number(outgoing.root.emissionTime);
      const endTime = Number(incoming.root.receiverTime);
      const pathTime = startTime + (endTime - startTime) * progress;
      const start = {
        ...outgoing.root.emission,
        t: startTime,
      };
      const end = {
        ...incoming.root.reception,
        t: endTime,
      };
      const sampledPoint = sampleTimedPath(state.paths?.[kind], pathTime);
      const point = progress <= Number.EPSILON
        ? start
        : progress >= 1 - Number.EPSILON
          ? end
          : sampledPoint ?? {
              t: pathTime,
              x: start.x + (end.x - start.x) * progress,
              y: start.y + (end.y - start.y) * progress,
              z: (start.z ?? 0) + ((end.z ?? 0) - (start.z ?? 0)) * progress,
            };
      return [
        kind,
        {
          kind,
          start,
          end,
          startTime,
          endTime,
          pathTime,
          point,
        },
      ];
    }),
  );
  return {
    progress,
    displayMapping: STORY_SYNTHESIS_DISPLAY_MAPPING,
    evidenceBoundary:
      "Each body is synchronized by normalized teaching progress from its own evaluator-backed transmission event to its later evaluator-backed reception event; the two starting transmission times are not asserted to be simultaneous.",
    displayAuthority: createDisplayAuthority(
      "normalized_reciprocal_teaching_fixture",
      {
        label: "Normalized reciprocal teaching fixture",
        simultaneousStartClaim: false,
      },
    ),
    events,
    bodies,
  };
}

export function createStorySampledWakeFronts(state, scene, replayTime) {
  if (
    !["meet", "emission", "forward-buildup"].includes(scene?.id) ||
    scene?.showSampledWakeHistory !== true ||
    !Number.isFinite(scene.playbackStartTime) ||
    !Number.isFinite(scene.playbackEndTime)
  ) {
    return [];
  }
  const playbackSpan = scene.playbackEndTime - scene.playbackStartTime;
  if (!(playbackSpan > 0)) {
    return [];
  }
  const currentTime = Math.max(
    scene.playbackStartTime,
    Math.min(scene.playbackEndTime, Number(replayTime)),
  );
  const sampleProgressStep = STORY_WAKE_SAMPLE_PROGRESS;
  const fronts = [];
  const interactions = [...(scene.interactions ?? [])];
  if (scene.id === "meet") {
    const fallbackDistanceScale = Number(
      interactions[0]?.root?.distanceScale ??
        state.roots?.[0]?.distanceScale ??
        state.reciprocalRoots?.[0]?.distanceScale ??
        DEFAULT_CANVAS_DISTANCE_SCALE,
    );
    for (const transmitterId of ["positrino", "electrino"]) {
      if (interactions.some(
        (interaction) => interaction.transmitterId === transmitterId,
      )) {
        continue;
      }
      interactions.push({
        transmitterId,
        earlyWakeFallback: true,
        root: {
          emissionTime: scene.playbackStartTime,
          signalSpeed: NORMALIZED_FIELD_SPEED,
          distanceScale: fallbackDistanceScale,
        },
      });
    }
  }
  for (const interaction of interactions) {
    const path = ["meet", "forward-buildup"].includes(scene.id)
      ? state.paths?.[interaction.transmitterId]
      : createStoryTimeAxisPath(state.paths?.[interaction.transmitterId]);
    const signalSpeed = Number(interaction.root?.signalSpeed);
    const distanceScale = Number(interaction.root?.distanceScale);
    const canvasSignalSpeed = signalSpeed / distanceScale;
    if (!Array.isArray(path) || path.length === 0 || !(canvasSignalSpeed > 0)) {
      continue;
    }
    const rootEmissionTime = Number(interaction.root?.emissionTime);
    const sampleTimeStep = playbackSpan * sampleProgressStep;
    const firstSampleOffset = Math.ceil(
      (scene.playbackStartTime - rootEmissionTime) / sampleTimeStep - 1e-12,
    );
    const finalSampleOffset = Math.floor(
      (scene.playbackEndTime - rootEmissionTime) / sampleTimeStep + 1e-12,
    );
    for (
      let sampleOffset = firstSampleOffset;
      sampleOffset <= finalSampleOffset;
      sampleOffset += 1
    ) {
      const causalReception = sampleOffset === 0;
      const emissionTime = causalReception
        ? rootEmissionTime
        : rootEmissionTime + sampleOffset * sampleTimeStep;
      if (emissionTime > currentTime + Number.EPSILON) {
        continue;
      }
      const sampleProgress =
        (emissionTime - scene.playbackStartTime) / playbackSpan;
      const age = Math.max(0, currentTime - emissionTime);
      if (interaction.earlyWakeFallback && age <= Number.EPSILON) {
        continue;
      }
      const displayAge = age * scene.wakeDisplayTimeScale;
      const causalDelay =
        Number(interaction.root?.receiverTime) -
        Number(interaction.root?.emissionTime);
      fronts.push({
        id: `story-sampled-wake:${interaction.transmitterId}:${sampleOffset}`,
        transmitterId: interaction.transmitterId,
        sampleProgress,
        emissionTime,
        age,
        displayAge,
        wakeDisplayTime: emissionTime + displayAge,
        center: sampleTimedPath(path, emissionTime),
        radius: canvasSignalSpeed * displayAge,
        guideTarget: interaction.root?.reception ?? null,
        ageProgress: causalReception && causalDelay > 0
          ? Math.max(0, Math.min(1, age / causalDelay))
          : Math.min(1, age / playbackSpan),
        eventProgress: causalReception && causalDelay > 0
          ? age / causalDelay
          : null,
        causalReception,
      });
    }
  }
  return fronts;
}

export function createStoryView(state) {
  const stepIndex = Math.max(0, Math.min(STORY_STEPS.length - 1, Number(state.storyStep) || 0));
  const step = STORY_STEPS[stepIndex];
  const root = state.roots.find((candidate) => candidate.id === state.selectedRootId) ?? null;
  const reciprocalRoot = state.reciprocalRoots?.find(
    (candidate) => candidate.id === state.selectedReciprocalRootId,
  ) ?? null;
  const interactions = [
    {
      id: "positrino-to-electrino",
      transmitterId: state.sourceId,
      receiverId: state.receiverId,
      root,
    },
    {
      id: "electrino-to-positrino",
      transmitterId: state.receiverId,
      receiverId: state.sourceId,
      root: reciprocalRoot,
    },
  ];
  const availableCount = interactions.filter((interaction) => interaction.root).length;
  return {
    ...step,
    stepIndex,
    stepCount: STORY_STEPS.length,
    root,
    reciprocalRoot,
    interactions,
    relationshipDescriptions: STORY_RELATIONSHIP_DESCRIPTIONS,
    summary: availableCount === 2
      ? `Two causal relationships are shown at Tᵣ=${root.receiverTime.toFixed(3)}: positrino Tₜ=${root.emissionTime.toFixed(3)} and electrino Tₜ=${reciprocalRoot.emissionTime.toFixed(3)}.`
      : `Only ${availableCount} of 2 reciprocal causal relationships is available at this receiver event.`,
  };
}
