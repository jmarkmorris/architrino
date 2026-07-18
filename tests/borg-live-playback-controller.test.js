import assert from "node:assert/strict";
import test from "node:test";

import {
  BORG_MAX_REALTIME_PLAYBACK_RATE,
  BORG_PLAYBACK_PREFILL_MAX_WALL_MS,
  formatBorgRealtimeRate,
  getBorgAdaptivePlaybackRate,
  getBorgInFlightProtectedPlaybackRate,
  getBorgPlaybackLeadWindow,
  getBorgPlaybackMsPerFrameSet,
  getBorgPlaybackPrefillTargetFrameSetCount,
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

test("Borg prefill uses thirty seconds without crossing the retention-safe limit", () => {
  assert.equal(BORG_PLAYBACK_PREFILL_MAX_WALL_MS, 30000);
  assert.equal(getBorgPlaybackPrefillTargetFrameSetCount({
    playbackRate: 0.6,
    sampleInterval: 0.01,
    maximumRetainedFrameSetCount: 720,
  }), 576);
  assert.equal(getBorgPlaybackPrefillTargetFrameSetCount({
    playbackRate: 0.2,
    sampleInterval: 0.01,
    maximumRetainedFrameSetCount: 100,
  }), 80);
});

test("Borg protects the final buffered interval while a slow chunk is running", () => {
  assert.equal(getBorgInFlightProtectedPlaybackRate({
    adaptiveRate: 0.6,
    remainingFrameSetCount: 30,
    sampleInterval: 0.01,
  }), 0.6);

  const slowed = getBorgInFlightProtectedPlaybackRate({
    adaptiveRate: 0.6,
    remainingFrameSetCount: 30,
    sampleInterval: 0.01,
    chunkInFlight: true,
    chunkElapsedMs: 10000,
    previousChunkWallTimeMs: 4443,
  });
  assert.ok(Math.abs(slowed - (0.3 / 11)) < 1e-12);

  const finalFraction = getBorgInFlightProtectedPlaybackRate({
    adaptiveRate: 0.6,
    remainingFrameSetCount: 0.1,
    sampleInterval: 0.01,
    chunkInFlight: true,
    chunkElapsedMs: 40000,
    previousChunkWallTimeMs: 4443,
  });
  assert.ok(Math.abs(finalFraction - (0.001 / 41)) < 1e-12);
});

test("Borg in-flight protection does not exhaust its buffer during a two-minute stall", () => {
  const sampleInterval = 0.01;
  const tickMs = 1000 / 60;
  let remainingFrameSetCount = 30;
  for (let elapsedMs = 0; elapsedMs < 120000; elapsedMs += tickMs) {
    const rate = getBorgInFlightProtectedPlaybackRate({
      adaptiveRate: 0.6,
      remainingFrameSetCount,
      sampleInterval,
      chunkInFlight: true,
      chunkElapsedMs: elapsedMs,
      previousChunkWallTimeMs: 4443,
    });
    remainingFrameSetCount -= rate * (tickMs / 1000) / sampleInterval;
    assert.ok(remainingFrameSetCount > 0);
  }
});
