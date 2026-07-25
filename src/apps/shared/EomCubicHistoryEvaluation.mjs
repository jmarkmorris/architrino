const AXES = Object.freeze(["x", "y", "z"]);

export function evaluateEomCubicHistoryAtTime(
  history,
  time,
  {
    historyId = history?.id ?? history?.pathId ?? "unknown",
    entityLabel = "history",
    timeRole = "output",
    coverageStart =
      history?.coverage?.start ?? history?.coverageStart,
    coverageEnd =
      history?.coverage?.end ?? history?.coverageEnd,
  } = {},
) {
  const evaluationTime = Number(time);
  const start = Number(coverageStart);
  const end = Number(coverageEnd);
  if (!Number.isFinite(evaluationTime) ||
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      evaluationTime < start ||
      evaluationTime > end + 1e-12) {
    throw coverageError({
      historyId,
      entityLabel,
      timeRole,
      evaluationTime,
      start,
      end,
    });
  }
  const segments = history?.segments;
  if (!Array.isArray(segments)) {
    throw new TypeError(`EOM ${entityLabel} ${historyId} requires retained segments.`);
  }
  const segment = segments.find((candidate, index) =>
    Number(candidate.startTime) <= evaluationTime &&
    (
      evaluationTime < Number(candidate.endTime) ||
      index + 1 === segments.length
    )
  );
  const segmentEnd = Number(segment?.endTime);
  if (!segment || evaluationTime > segmentEnd + 1e-12) {
    throw coverageError({
      historyId,
      entityLabel,
      timeRole,
      evaluationTime,
      start,
      end,
    });
  }

  const localTime = evaluationTime - Number(segment.startTime);
  const position = {};
  const velocity = {};
  AXES.forEach((axis, axisIndex) => {
    const coefficients = segment.coefficients?.[axisIndex]?.map(Number);
    if (coefficients?.length !== 4 || !coefficients.every(Number.isFinite)) {
      throw new TypeError(
        `EOM ${entityLabel} ${historyId} has invalid cubic coefficients for axis ${axis}.`,
      );
    }
    const [c0, c1, c2, c3] = coefficients;
    position[axis] = c0 + localTime * (c1 + localTime * (c2 + localTime * c3));
    velocity[axis] = c1 + localTime * (2 * c2 + localTime * 3 * c3);
  });
  return Object.freeze({
    position: Object.freeze(position),
    velocity: Object.freeze(velocity),
    errorBound: Math.max(
      ...errorValues(
        segment.positionErrors ?? segment.positionError,
        "position error",
        historyId,
      ),
      ...errorValues(
        segment.velocityErrors ?? segment.velocityError,
        "velocity error",
        historyId,
      ),
    ),
  });
}

function errorValues(value, label, historyId) {
  const values = Array.isArray(value) ? value : [value ?? 0];
  const numbers = values.map((token) => Math.abs(Number(token)));
  if (numbers.length === 0 || !numbers.every(Number.isFinite)) {
    throw new TypeError(`EOM history ${historyId} has an invalid ${label}.`);
  }
  return numbers;
}

function coverageError({
  historyId,
  entityLabel,
  timeRole,
  evaluationTime,
  start,
  end,
}) {
  return new RangeError(
    `EOM ${entityLabel} ${historyId} does not cover ${timeRole} time ${evaluationTime}; recorded coverage is [${start}, ${end}].`,
  );
}
