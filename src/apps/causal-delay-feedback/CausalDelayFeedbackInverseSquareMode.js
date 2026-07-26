import {
  createDisplayAuthority,
} from "./CausalDelayFeedbackCausalHistory.js";
import {
  sampleTimedPathByArcLength,
} from "./CausalDelayFeedbackTimedPath.js";

export const INVERSE_SQUARE_BODY_PROGRESS = 0.5;
export const INVERSE_SQUARE_EMISSION_RATE = 8;
export const INVERSE_SQUARE_EMISSION_INTERVAL =
  1 / INVERSE_SQUARE_EMISSION_RATE;
export const INVERSE_SQUARE_MAXIMUM_WAKE_RADIUS = 420;

const DISPLAY_AUTHORITY = Object.freeze(
  createDisplayAuthority(
    "declared_inverse_square_geometric_dilution_teaching_fixture",
    {
      label: "Declared inverse-square geometric-dilution teaching fixture",
      teachingFixture: true,
      fixedBodyProgress: INVERSE_SQUARE_BODY_PROGRESS,
      constantEmissionRate: true,
      fieldAmplitudeClaim: false,
      physicalLawClaim: false,
    },
  ),
);

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function getPathPointAtProgress(path, progress) {
  if (!Array.isArray(path) || path.length === 0) {
    return null;
  }
  const startTime = Number(path[0]?.t);
  const endTime = Number(path.at(-1)?.t);
  const pathTime =
    Number.isFinite(startTime) &&
    Number.isFinite(endTime) &&
    endTime > startTime
      ? startTime + (endTime - startTime) * clamp01(progress)
      : clamp01(progress);
  return sampleTimedPathByArcLength(path, pathTime);
}

export function createInverseSquareSpreadingFrame(
  state,
  scene,
  replayTime,
) {
  const playbackStartTime = Number(scene?.playbackStartTime ?? 0);
  const playbackEndTime = Number(scene?.playbackEndTime ?? 1);
  const playbackSpan = Math.max(
    Number.EPSILON,
    playbackEndTime - playbackStartTime,
  );
  const displayTime = Math.max(
    playbackStartTime,
    Math.min(playbackEndTime, Number(replayTime) || playbackStartTime),
  );
  const phase = clamp01(
    (displayTime - playbackStartTime) / playbackSpan,
  );
  const bodies = Object.fromEntries(
    ["positrino", "electrino"].map((kind) => [
      kind,
      {
        kind,
        pathProgress: INVERSE_SQUARE_BODY_PROGRESS,
        point: getPathPointAtProgress(
          state?.paths?.[kind],
          INVERSE_SQUARE_BODY_PROGRESS,
        ),
      },
    ]),
  );
  const wakes = [];
  const latestEmissionIndex = Math.floor(
    phase / INVERSE_SQUARE_EMISSION_INTERVAL + 1e-9,
  );
  for (
    let emissionIndex = 0;
    emissionIndex <= latestEmissionIndex;
    emissionIndex += 1
  ) {
    const emissionProgress =
      emissionIndex * INVERSE_SQUARE_EMISSION_INTERVAL;
    const ageProgress = phase - emissionProgress;
    if (!(ageProgress > 1e-9)) {
      continue;
    }
    const radius = ageProgress * INVERSE_SQUARE_MAXIMUM_WAKE_RADIUS;
    for (const body of Object.values(bodies)) {
      if (!body.point) {
        continue;
      }
      wakes.push({
        id: `inverse-square:${body.kind}:${emissionIndex}`,
        sourceKind: body.kind,
        center: body.point,
        bodyProgress: body.pathProgress,
        emissionIndex,
        emissionProgress,
        ageProgress,
        radius,
        emittedAmount: 1,
        sphericalArea: 4 * Math.PI * radius * radius,
        inverseRadiusSquared: 1 / (radius * radius),
      });
    }
  }
  return {
    id: "inverse-square-spreading",
    displayTime,
    phase,
    bodies,
    wakes,
    emissionRate: INVERSE_SQUARE_EMISSION_RATE,
    emissionInterval: INVERSE_SQUARE_EMISSION_INTERVAL,
    maximumWakeRadius: INVERSE_SQUARE_MAXIMUM_WAKE_RADIUS,
    displayAuthority: DISPLAY_AUTHORITY,
    fieldAmplitudeClaim: false,
    physicalLawClaim: false,
  };
}
