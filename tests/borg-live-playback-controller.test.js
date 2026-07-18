import assert from "node:assert/strict";
import test from "node:test";

import {
  BORG_MAX_REALTIME_PLAYBACK_RATE,
  formatBorgRealtimeRate,
  getBorgAdaptivePlaybackRate,
  getBorgPlaybackLeadWindow,
  getBorgPlaybackMsPerFrameSet,
  getBorgPlaybackRefillDecision,
  updateBorgMeasuredProductionRate,
} from "../src/apps/borg/BorgLivePlaybackController.js";

test("Borg adaptive playback never exceeds real time and follows slow production", () => {
  assert.equal(getBorgAdaptivePlaybackRate({ requestedRate: 1.5 }), 1);
  assert.equal(BORG_MAX_REALTIME_PLAYBACK_RATE, 1);

  const measuredProductionRate = updateBorgMeasuredProductionRate({
    chunkDuration: 0.3,
    chunkWallTimeMs: 1500,
  });
  assert.ok(Math.abs(measuredProductionRate - 0.2) < 1e-12);
  assert.ok(Math.abs(getBorgAdaptivePlaybackRate({
    requestedRate: 1,
    measuredProductionRate,
  }) - 0.16) < 1e-12);
  assert.ok(Math.abs(getBorgPlaybackMsPerFrameSet({
    playbackRate: 0.2,
    sampleInterval: 0.01,
  }) - 50) < 1e-12);
  assert.equal(formatBorgRealtimeRate(0.2), "0.20");
  assert.equal(formatBorgRealtimeRate(2), "2.00");
});

test("Borg playback lead uses a bounded one-to-two-second hysteresis window", () => {
  assert.deepEqual(getBorgPlaybackLeadWindow({
    playbackRate: 0.6,
    sampleInterval: 0.01,
    chunkDuration: 0.3,
  }), {
    lowFrameSetCount: 60,
    highFrameSetCount: 120,
  });
  assert.deepEqual(getBorgPlaybackLeadWindow({
    playbackRate: 0.2,
    sampleInterval: 0.01,
    chunkDuration: 0.3,
  }), {
    lowFrameSetCount: 30,
    highFrameSetCount: 60,
  });

  assert.deepEqual(getBorgPlaybackRefillDecision({
    remainingFrameSetCount: 20,
    wasRefilling: false,
    lowFrameSetCount: 30,
    highFrameSetCount: 60,
  }), { refilling: true, shouldRequestChunk: true });
  assert.deepEqual(getBorgPlaybackRefillDecision({
    remainingFrameSetCount: 45,
    wasRefilling: true,
    lowFrameSetCount: 30,
    highFrameSetCount: 60,
  }), { refilling: true, shouldRequestChunk: true });
  assert.deepEqual(getBorgPlaybackRefillDecision({
    remainingFrameSetCount: 60,
    wasRefilling: true,
    lowFrameSetCount: 30,
    highFrameSetCount: 60,
  }), { refilling: false, shouldRequestChunk: false });
});

test("Borg production-rate recovery is slower than production-rate reduction", () => {
  const slowed = updateBorgMeasuredProductionRate({
    previousRate: 1,
    chunkDuration: 0.3,
    chunkWallTimeMs: 1500,
  });
  const recovered = updateBorgMeasuredProductionRate({
    previousRate: 0.2,
    chunkDuration: 0.3,
    chunkWallTimeMs: 300,
  });
  assert.ok(slowed < 0.5);
  assert.ok(recovered < 0.4);
});
