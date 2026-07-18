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

export function appendBorgFrameRows(existingFrames = [], incomingFrames = []) {
  if (incomingFrames.length === 0) {
    return [...existingFrames];
  }
  const firstIncomingFrameIndex = Math.min(
    ...incomingFrames.map((frame) => Number(frame.frameIndex) || 0),
  );
  const prefix = existingFrames.filter(
    (frame) => (Number(frame.frameIndex) || 0) < firstIncomingFrameIndex,
  );
  const overlap = existingFrames.filter(
    (frame) => (Number(frame.frameIndex) || 0) >= firstIncomingFrameIndex,
  );
  return [...prefix, ...mergeBorgFrameRows(overlap, incomingFrames)];
}

export function appendBorgFrameRowsInPlace(existingFrames = [], incomingFrames = []) {
  if (incomingFrames.length === 0) {
    return existingFrames;
  }
  const firstIncomingFrameIndex = Math.min(
    ...incomingFrames.map((frame) => Number(frame.frameIndex) || 0),
  );
  let overlapStart = existingFrames.length;
  while (
    overlapStart > 0 &&
    (Number(existingFrames[overlapStart - 1].frameIndex) || 0) >= firstIncomingFrameIndex
  ) {
    overlapStart -= 1;
  }
  const overlap = existingFrames.splice(overlapStart);
  existingFrames.push(...mergeBorgFrameRows(overlap, incomingFrames));
  return existingFrames;
}

export function appendBorgFrameSets(existingFrameSets = [], incomingFrames = []) {
  if (incomingFrames.length === 0) {
    return [...existingFrameSets];
  }
  const firstIncomingFrameIndex = Math.min(
    ...incomingFrames.map((frame) => Number(frame.frameIndex) || 0),
  );
  const prefix = existingFrameSets.filter(
    (frameSet) => Number(frameSet.frameIndex) < firstIncomingFrameIndex,
  );
  const overlapRows = existingFrameSets
    .filter((frameSet) => Number(frameSet.frameIndex) >= firstIncomingFrameIndex)
    .flatMap((frameSet) => frameSet.frames);
  const appendedRows = mergeBorgFrameRows(overlapRows, incomingFrames);
  return [...prefix, ...createBorgFrameSetsFromRows(appendedRows)];
}

export function appendBorgFrameSetsInPlace(existingFrameSets = [], incomingFrames = []) {
  if (incomingFrames.length === 0) {
    return existingFrameSets;
  }
  const firstIncomingFrameIndex = Math.min(
    ...incomingFrames.map((frame) => Number(frame.frameIndex) || 0),
  );
  let overlapStart = existingFrameSets.length;
  while (
    overlapStart > 0 &&
    Number(existingFrameSets[overlapStart - 1].frameIndex) >= firstIncomingFrameIndex
  ) {
    overlapStart -= 1;
  }
  const overlapRows = existingFrameSets
    .splice(overlapStart)
    .flatMap((frameSet) => frameSet.frames);
  existingFrameSets.push(
    ...createBorgFrameSetsFromRows(
      mergeBorgFrameRows(overlapRows, incomingFrames),
    ),
  );
  return existingFrameSets;
}

function frameRowKey(frame = {}) {
  return `${frame.frameIndex}:${frame.pathKey}`;
}
