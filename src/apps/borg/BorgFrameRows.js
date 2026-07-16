// Source-agnostic frame-row grouping shared by every Borg display source
// (fixture replay, live EOM shadow chunks, recorded EOM dataset replay).
// This is display bookkeeping only: it groups and merges recorded rows and
// computes no physics.

export function createBorgFrameSetsFromRows(frames = []) {
  const frameSet = new Map();
  frames.forEach((frame) => {
    const frameIndex = Number(frame.frameIndex) || 0;
    const rows = frameSet.get(frameIndex) ?? [];
    rows.push(frame);
    frameSet.set(frameIndex, rows);
  });
  return [...frameSet.entries()]
    .sort(([left], [right]) => left - right)
    .map(([frameIndex, rows]) =>
      Object.freeze({
        frameIndex,
        time: rows[0]?.time ?? frameIndex,
        frames: Object.freeze(rows.slice().sort((left, right) => left.pathKey - right.pathKey)),
      }),
    );
}

export function mergeBorgFrameRows(existingFrames = [], incomingFrames = []) {
  const byKey = new Map();
  existingFrames.forEach((frame) => {
    byKey.set(frameRowKey(frame), frame);
  });
  incomingFrames.forEach((frame) => {
    byKey.set(frameRowKey(frame), frame);
  });
  return [...byKey.values()].sort((left, right) => {
    const frameDelta = left.frameIndex - right.frameIndex;
    return frameDelta !== 0 ? frameDelta : left.pathKey - right.pathKey;
  });
}

function frameRowKey(frame = {}) {
  return `${frame.frameIndex}:${frame.pathKey}`;
}
