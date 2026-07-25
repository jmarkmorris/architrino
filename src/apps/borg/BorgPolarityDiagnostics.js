export const BORG_POSITRINO_STATE_FLAG = 1;
export const BORG_ELECTRINO_STATE_FLAG = 2;

export function createBorgEscapeLedger() {
  const firstEscapeByPath = new Map();

  return Object.freeze({
    reset() {
      firstEscapeByPath.clear();
    },
    appendFrameRows(frameRows, { center, radius }) {
      for (const row of frameRows ?? []) {
        const polarity = borgPolarityForStateFlags(row?.stateFlags);
        const pathKey = Number(row?.pathKey);
        const frameIndex = Number(row?.frameIndex);
        const time = Number(row?.time);
        if (
          polarity == null || !Number.isFinite(pathKey) ||
          !Number.isFinite(frameIndex) || !Number.isFinite(time) ||
          firstEscapeByPath.has(pathKey) ||
          !positionIsOutsideSphere(row.position, center, radius)
        ) {
          continue;
        }
        firstEscapeByPath.set(pathKey, Object.freeze({
          pathKey,
          polarity,
          frameIndex,
          time,
        }));
      }
    },
    countsThrough(time) {
      const through = Number(time);
      const counts = { electrino: 0, positrino: 0 };
      firstEscapeByPath.forEach((escape) => {
        if (escape.time <= through) {
          counts[escape.polarity] += 1;
        }
      });
      return Object.freeze(counts);
    },
  });
}

export function replaceBorgEscapeLedgerRows(
  ledger,
  frameRows,
  sphere,
) {
  if (typeof ledger?.reset !== "function" ||
      typeof ledger?.appendFrameRows !== "function") {
    throw new TypeError("Borg escape-ledger replacement requires an escape ledger.");
  }
  ledger.reset();
  ledger.appendFrameRows(frameRows, sphere);
  return ledger;
}

export function calculateBorgPolarityDiagnostics({
  frames,
  center,
  radius,
  coreScale,
  escapeLedger = null,
  frameIndex = null,
  time = null,
}) {
  requireSphere(center, radius);
  const closePairThreshold = Number(coreScale);
  if (!(closePairThreshold > 0)) {
    throw new TypeError("Borg pair diagnostics require a positive core scale.");
  }
  const paths = (frames ?? []).flatMap((frame) => {
    const polarity = borgPolarityForStateFlags(frame?.stateFlags);
    if (polarity == null || !finitePosition(frame?.position)) {
      return [];
    }
    return [{
      pathKey: Number(frame.pathKey),
      polarity,
      position: frame.position,
    }];
  });

  const outsideNow = { electrino: 0, positrino: 0 };
  paths.forEach((path) => {
    if (positionIsOutsideSphere(path.position, center, radius)) {
      outsideNow[path.polarity] += 1;
    }
  });

  const groups = {
    electrino: createPairAccumulator(),
    positrino: createPairAccumulator(),
    opposite: createPairAccumulator(),
    same: createPairAccumulator(),
  };
  for (let left = 0; left < paths.length; left += 1) {
    for (let right = left + 1; right < paths.length; right += 1) {
      const first = paths[left];
      const second = paths[right];
      const separation = positionDistance(first.position, second.position);
      if (first.polarity === second.polarity) {
        appendPair(groups[first.polarity], separation, closePairThreshold);
        appendPair(groups.same, separation, closePairThreshold);
      } else {
        appendPair(groups.opposite, separation, closePairThreshold);
      }
    }
  }

  const electrino = finalizePairs(groups.electrino);
  const positrino = finalizePairs(groups.positrino);
  const same = finalizePairs(groups.same);
  const opposite = finalizePairs(groups.opposite);
  const cumulativeEscapes = escapeLedger?.countsThrough?.(Number(time)) ??
    Object.freeze({ ...outsideNow });
  return Object.freeze({
    schema: "borg-polarity-diagnostics.v2",
    authority: "display-diagnostic-from-raw-eom-keyframe-rows",
    frameIndex: Number(frameIndex),
    time: Number(time),
    sphereRadius: Number(radius),
    coreScale: closePairThreshold,
    closePairThreshold,
    pathCount: paths.length,
    outsideNow: Object.freeze(outsideNow),
    escapedThroughTime: cumulativeEscapes,
    pairs: Object.freeze({ electrino, positrino, same, opposite }),
    sameToOppositeCloseRatio: opposite.closeFraction > 0
      ? same.closeFraction / opposite.closeFraction
      : null,
    sameMinusOppositeCloseFraction:
      same.closeFraction - opposite.closeFraction,
  });
}

export function borgPolarityForStateFlags(stateFlags) {
  if (Number(stateFlags) === BORG_POSITRINO_STATE_FLAG) return "positrino";
  if (Number(stateFlags) === BORG_ELECTRINO_STATE_FLAG) return "electrino";
  return null;
}

function createPairAccumulator() {
  return { pairCount: 0, closePairCount: 0, separationTotal: 0 };
}

function appendPair(accumulator, separation, correlationRadius) {
  accumulator.pairCount += 1;
  accumulator.separationTotal += separation;
  if (separation <= correlationRadius) {
    accumulator.closePairCount += 1;
  }
}

function finalizePairs(accumulator) {
  return Object.freeze({
    pairCount: accumulator.pairCount,
    closePairCount: accumulator.closePairCount,
    closeFraction: accumulator.pairCount > 0
      ? accumulator.closePairCount / accumulator.pairCount
      : 0,
    meanSeparation: accumulator.pairCount > 0
      ? accumulator.separationTotal / accumulator.pairCount
      : null,
  });
}

function positionIsOutsideSphere(position, center, radius) {
  if (!finitePosition(position)) return false;
  requireSphere(center, radius);
  return positionDistance(position, center) > Number(radius);
}

function positionDistance(left, right) {
  return Math.hypot(
    Number(left.x) - Number(right.x),
    Number(left.y) - Number(right.y),
    Number(left.z) - Number(right.z),
  );
}

function finitePosition(position) {
  return [position?.x, position?.y, position?.z].every(Number.isFinite);
}

function requireSphere(center, radius) {
  if (!finitePosition(center) || !(Number(radius) > 0)) {
    throw new TypeError(
      "Borg polarity diagnostics require a finite sphere center and positive radius.",
    );
  }
}
