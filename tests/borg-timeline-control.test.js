import test from "node:test";
import assert from "node:assert/strict";

import {
  getBorgPlaybackReanchor,
  getBorgTimelineRangePresentation,
} from "../src/apps/borg/BorgAppRuntime.js";

test("Borg Forever playback pins the live-follow indicator when the buffer extends", () => {
  const beforeExtension = getBorgTimelineRangePresentation({
    frameIndexes: [0, 100],
    activeFrameIndex: 98,
    isForever: true,
    isPlaying: true,
  });
  const afterExtension = getBorgTimelineRangePresentation({
    frameIndexes: [0, 200],
    activeFrameIndex: 98,
    isForever: true,
    isPlaying: true,
  });

  assert.deepEqual(beforeExtension, afterExtension);
  assert.equal(afterExtension.mode, "live-follow");
  assert.equal(afterExtension.value, 50);
  assert.equal(afterExtension.disabled, true);
});

test("Borg Forever playback restores the absolute buffered-frame scrubber when paused", () => {
  const paused = getBorgTimelineRangePresentation({
    frameIndexes: [0, 200],
    activeFrameIndex: 98,
    isForever: true,
    isPlaying: false,
  });

  assert.equal(paused.mode, "live-buffer");
  assert.equal(paused.min, 0);
  assert.equal(paused.max, 200);
  assert.equal(paused.value, 98);
  assert.equal(paused.disabled, false);
});

test("Borg playback re-anchors by absolute keyframe after retention rebuilds frame sets", () => {
  const firstRetainedWindow = Array.from(
    { length: 720 },
    (_, index) => ({ frameIndex: 181 + index }),
  );
  const nextRetainedWindow = Array.from(
    { length: 720 },
    (_, index) => ({ frameIndex: 281 + index }),
  );

  const firstAnchor = getBorgPlaybackReanchor(firstRetainedWindow, 860);
  const nextAnchor = getBorgPlaybackReanchor(nextRetainedWindow, 860);

  assert.equal(firstAnchor.fromSetIndex, 679);
  assert.equal(nextAnchor.fromSetIndex, 579);
  assert.equal(firstAnchor.fromFrameIndex, 860);
  assert.equal(nextAnchor.fromFrameIndex, 860);
  assert.equal(firstAnchor.toFrameIndex, 861);
  assert.equal(nextAnchor.toFrameIndex, 861);
});
