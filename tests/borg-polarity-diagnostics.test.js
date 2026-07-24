import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateBorgPolarityDiagnostics,
  createBorgEscapeLedger,
  replaceBorgEscapeLedgerRows,
} from "../src/apps/borg/BorgPolarityDiagnostics.js";

const center = Object.freeze({ x: 0, y: 0, z: 0 });

function frame(pathKey, stateFlags, x, frameIndex = 0, time = frameIndex) {
  return Object.freeze({
    pathKey,
    stateFlags,
    frameIndex,
    time,
    position: Object.freeze({ x, y: 0, z: 0 }),
  });
}

test("Borg escape ledger reports each raw EOM path once and respects timeline rewinds", () => {
  const ledger = createBorgEscapeLedger();
  ledger.appendFrameRows([
    frame(1, 1, 0.5, 0, 0),
    frame(2, 2, 0.5, 0, 0),
    frame(1, 1, 1.1, 2, 2),
    frame(2, 2, -1.2, 3, 3),
    frame(1, 1, 1.4, 4, 4),
  ], { center, radius: 1 });

  assert.deepEqual(ledger.countsThrough(1), { electrino: 0, positrino: 0 });
  assert.deepEqual(ledger.countsThrough(2), { electrino: 0, positrino: 1 });
  assert.deepEqual(ledger.countsThrough(3), { electrino: 1, positrino: 1 });
  assert.deepEqual(ledger.countsThrough(100), { electrino: 1, positrino: 1 });
});

test("Borg workspace replacement clears cumulative polarity escape history", () => {
  const ledger = createBorgEscapeLedger();
  ledger.appendFrameRows([
    frame(1, 1, 1.1, 2, 2),
  ], { center, radius: 1 });

  replaceBorgEscapeLedgerRows(
    ledger,
    [frame(2, 2, -1.2, 3, 3)],
    { center, radius: 1 },
  );

  assert.deepEqual(ledger.countsThrough(100), {
    electrino: 1,
    positrino: 0,
  });
});

test("Borg pair correlation normalizes same and opposite close-pair counts", () => {
  const diagnostics = calculateBorgPolarityDiagnostics({
    frames: [
      frame(1, 1, 0),
      frame(2, 1, 0.1),
      frame(3, 2, 0.15),
      frame(4, 2, 1),
    ],
    center,
    radius: 2,
    coreScale: 0.2,
    frameIndex: 0,
    time: 0,
  });

  assert.equal(diagnostics.pairs.positrino.closeFraction, 1);
  assert.equal(diagnostics.pairs.electrino.closeFraction, 0);
  assert.equal(diagnostics.pairs.same.closeFraction, 0.5);
  assert.equal(diagnostics.pairs.opposite.closeFraction, 0.5);
  assert.equal(diagnostics.sameToOppositeCloseRatio, 1);
  assert.equal(diagnostics.sameMinusOppositeCloseFraction, 0);
  assert.equal(diagnostics.coreScale, 0.2);
  assert.equal(diagnostics.closePairThreshold, 0.2);
});

test("Borg current escape counts use raw positions, not replacement coordinates", () => {
  const diagnostics = calculateBorgPolarityDiagnostics({
    frames: [frame(1, 1, 1.01), frame(2, 2, -0.99)],
    center,
    radius: 1,
    coreScale: 0.2,
    frameIndex: 7,
    time: 0.7,
  });

  assert.deepEqual(diagnostics.outsideNow, { electrino: 0, positrino: 1 });
  assert.equal(diagnostics.authority, "display-diagnostic-from-raw-eom-keyframe-rows");
});
