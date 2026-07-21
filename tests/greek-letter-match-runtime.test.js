import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import {
  FEEDBACK_INTERVALS,
  GREEK_LETTERS,
  GreekLetterMatchRuntime,
  SPHERE_COLOR_PROGRESSION,
  advanceGreekMatch,
  answerGreekMatch,
  createGreekMatchSession,
  createRoundOrder,
  getCurrentLetterIndex,
  getGreekGlyphOpticalYOffset,
  getGreekMatchArrowCoordinates,
  getGreekPronunciationUrl,
  getOpticallyCenteredGlyphPosition,
  getRoundPercent,
  getSphereColor,
  startNextGreekMatchRound,
} from "../src/apps/greek-letter-match/GreekLetterMatchRuntime.js";

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("Greek letters use the standard 24-letter order from alpha through omega", () => {
  assert.equal(GREEK_LETTERS.length, 24);
  assert.deepEqual(
    GREEK_LETTERS.map((letter) => letter.name),
    [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "epsilon",
      "zeta",
      "eta",
      "theta",
      "iota",
      "kappa",
      "lambda",
      "mu",
      "nu",
      "xi",
      "omicron",
      "pi",
      "rho",
      "sigma",
      "tau",
      "upsilon",
      "phi",
      "chi",
      "psi",
      "omega",
    ]
  );
  assert.deepEqual(GREEK_LETTERS[0], {
    name: "alpha",
    upper: "Α",
    lower: "α",
    audioFile: "alpha.m4a",
  });
  assert.deepEqual(GREEK_LETTERS.at(-1), {
    name: "omega",
    upper: "Ω",
    lower: "ω",
    audioFile: "omega.m4a",
  });
});

test("every Greek letter has one locally deployed pronunciation recording", () => {
  assert.equal(new Set(GREEK_LETTERS.map((letter) => letter.audioFile)).size, 24);
  for (const letter of GREEK_LETTERS) {
    assert.match(letter.audioFile, /^[a-z]+\.m4a$/u);
    assert.equal(
      existsSync(
        new URL(
          `../src/apps/greek-letter-match/audio/${letter.audioFile}`,
          import.meta.url
        )
      ),
      true,
      `${letter.name} pronunciation is missing`
    );
  }
  assert.equal(
    getGreekPronunciationUrl(
      GREEK_LETTERS[0],
      "https://architrino.com/src/apps/greek-letter-match/GreekLetterMatchRuntime.js"
    ),
    "https://architrino.com/src/apps/greek-letter-match/audio/alpha.m4a"
  );

  const provenance = readRepoFile(
    "src/apps/greek-letter-match/audio/SOURCE.md"
  );
  assert.match(provenance, /Wikimedia Commons replacements/u);
  assert.match(provenance, /GreekLetterLearner recordings/u);
  assert.match(provenance, /CC BY-SA 3\.0/u);
  assert.match(provenance, /CC BY-SA 4\.0/u);
  assert.match(provenance, /CC0 1\.0/u);
  assert.match(provenance, /Public domain/u);
  for (const sourceFilename of [
    "En-us-pie.ogg",
    "En-us-psi.ogg",
    "En-us-beta.ogg",
    "En-us-iota.ogg",
    "En-us-alpha.ogg",
    "En-us-omicron.ogg",
    "En-us-rho.ogg",
    "En-us-theta.ogg",
    "En-us-xi.ogg",
    "En-us-chi.ogg",
    "En-us-zeta.ogg",
    "En-us-eta.ogg",
    "En-us-omega.ogg",
    "En-us-gamma.ogg",
    "En-us-kappa.ogg",
    "En-us-lambda.ogg",
    "En-us-upsilon.ogg",
  ]) {
    assert.match(provenance, new RegExp(sourceFilename.replace(".", "\\."), "u"));
  }
});

test("pronunciation playback reuses one audio player and restarts it", () => {
  const audio = {
    currentTime: 7,
    pauseCalls: 0,
    playCalls: 0,
    pause() {
      this.pauseCalls += 1;
    },
    play() {
      this.playCalls += 1;
      return Promise.resolve();
    },
  };
  const runtime = Object.create(GreekLetterMatchRuntime.prototype);
  runtime.audioFactory = () => audio;
  runtime.pronunciationAudio = null;
  runtime.pronunciationRequestId = 0;
  runtime.pronunciationFeedback = { textContent: "", dataset: {} };

  assert.equal(runtime.playPronunciation(0), true);
  assert.equal(runtime.playPronunciation(1), true);
  assert.equal(audio.pauseCalls, 2);
  assert.equal(audio.playCalls, 2);
  assert.equal(audio.currentTime, 0);
  assert.match(audio.src, /\/audio\/beta\.m4a$/u);
  assert.equal(runtime.pronunciationFeedback.textContent, "Playing beta.");
  assert.equal(runtime.pronunciationFeedback.dataset.state, "playing");
});

test("teaching selection plays the selected letter without changing the score", () => {
  const played = [];
  const runtime = Object.create(GreekLetterMatchRuntime.prototype);
  runtime.gameMode = "teach";
  runtime.teachingLetterIndex = null;
  runtime.session = createGreekMatchSession(() => 0);
  runtime.render = () => {};
  runtime.playPronunciation = (index) => played.push(index);

  runtime.chooseLetter(7);

  assert.equal(runtime.teachingLetterIndex, 7);
  assert.deepEqual(played, [7]);
  assert.equal(runtime.session.attempts, 0);
  assert.equal(runtime.session.correct, 0);
});

test("game answers stay silent while the manual pronunciation target remains available", () => {
  const played = [];
  const runtime = Object.create(GreekLetterMatchRuntime.prototype);
  runtime.gameMode = "game";
  runtime.session = createGreekMatchSession(() => 0);
  runtime.feedbackInterval = "standard";
  runtime.render = () => {};
  runtime.playPronunciation = (index) => played.push(index);
  runtime.setTimeout = () => 1;

  runtime.chooseLetter(0);

  assert.deepEqual(played, []);
  assert.equal(runtime.session.lastResult.selectedIndex, 0);
  assert.equal(
    runtime.getActivePronunciationIndex(),
    runtime.session.lastResult.targetIndex
  );
});

test("round order is shuffled without changing fixed ring positions", () => {
  const order = createRoundOrder(() => 0);
  assert.equal(order.length, 24);
  assert.deepEqual([...order].sort((a, b) => a - b), GREEK_LETTERS.map((_, index) => index));
  assert.equal(new Set(order).size, 24);
  assert.equal(getSphereColor(0), SPHERE_COLOR_PROGRESSION[0]);
  assert.equal(getSphereColor(16), SPHERE_COLOR_PROGRESSION[0]);
  assert.equal(getSphereColor(23), SPHERE_COLOR_PROGRESSION[7]);
});

test("a full round waits for Next round before recording its score", () => {
  let session = createGreekMatchSession(() => 0);
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const target = getCurrentLetterIndex(session);
    const selected = attempt < 18 ? target : (target + 1) % 24;
    session = answerGreekMatch(session, selected);
    assert.equal(session.locked, true);
    if (attempt < 23) {
      assert.equal(session.roundComplete, false);
      session = advanceGreekMatch(session, () => 0);
    }
  }

  assert.equal(session.roundComplete, true);
  assert.equal(getRoundPercent(session), 75);
  assert.deepEqual(session.completedRoundScores, []);

  session = advanceGreekMatch(session);
  assert.equal(session.roundNumber, 1);
  assert.equal(session.roundComplete, true);
  assert.equal(session.locked, false);
  assert.deepEqual(session.completedRoundScores, []);

  session = startNextGreekMatchRound(session, () => 0);
  assert.equal(session.roundNumber, 2);
  assert.equal(session.attempts, 0);
  assert.equal(session.correct, 0);
  assert.equal(session.locked, false);
  assert.deepEqual(session.completedRoundScores, [75]);
});

test("Next round records a partial score but does nothing at zero answers", () => {
  let session = createGreekMatchSession(() => 0);
  assert.strictEqual(startNextGreekMatchRound(session, () => 0), session);

  const firstTarget = getCurrentLetterIndex(session);
  session = advanceGreekMatch(answerGreekMatch(session, firstTarget));
  const secondTarget = getCurrentLetterIndex(session);
  session = advanceGreekMatch(answerGreekMatch(session, (secondTarget + 1) % 24));
  assert.equal(getRoundPercent(session), 50);

  session = startNextGreekMatchRound(session, () => 0);
  assert.equal(session.roundNumber, 2);
  assert.equal(session.attempts, 0);
  assert.deepEqual(session.completedRoundScores, [50]);
});

test("locked feedback accepts only one answer", () => {
  const session = createGreekMatchSession(() => 0);
  const target = getCurrentLetterIndex(session);
  const answered = answerGreekMatch(session, target);
  assert.strictEqual(answerGreekMatch(answered, (target + 1) % 24), answered);
  assert.equal(answered.attempts, 1);
  assert.equal(answered.correct, 1);
});

test("each feedback setting schedules exactly its advertised pause", () => {
  for (const [setting, expectedDelay] of Object.entries(FEEDBACK_INTERVALS)) {
    const scheduledDelays = [];
    const runtime = Object.create(GreekLetterMatchRuntime.prototype);
    runtime.gameMode = "game";
    runtime.session = createGreekMatchSession(() => 0);
    runtime.feedbackInterval = setting;
    runtime.render = () => {};
    runtime.setTimeout = (_callback, delay) => {
      scheduledDelays.push(delay);
      return 1;
    };

    runtime.chooseLetter(getCurrentLetterIndex(runtime.session));

    assert.deepEqual(scheduledDelays, [expectedDelay]);
  }
});

test("teaching mode reverses the existing answer arrow toward the center", () => {
  const answerArrow = getGreekMatchArrowCoordinates(0, false);
  const teachingArrow = getGreekMatchArrowCoordinates(0, true);
  assert.equal(teachingArrow.x1, answerArrow.x2);
  assert.equal(teachingArrow.y1, answerArrow.y2);
  assert.equal(teachingArrow.x2, answerArrow.x1);
  assert.equal(teachingArrow.y2, answerArrow.y1);
  assert.ok(answerArrow.y2 < answerArrow.y1);
  assert.ok(teachingArrow.y2 > teachingArrow.y1);
  assert.equal(teachingArrow.y2, 35);
  assert.equal(teachingArrow.y2 + 2.5, 37.5);
});

test("visible glyph bounds are centered independently inside their SVG cells", () => {
  assert.deepEqual(
    getOpticallyCenteredGlyphPosition({ x: 40, y: 20, width: 20, height: 50 }),
    { x: 50, y: 55 }
  );
  assert.deepEqual(
    getOpticallyCenteredGlyphPosition({ x: 50, y: 50, width: 0, height: 0 }),
    { x: 50, y: 50 }
  );
});

test("Georgia descender glyphs receive a proportional upward optical correction", () => {
  for (const glyph of ["γ", "φ", "χ", "ψ"]) {
    assert.equal(getGreekGlyphOpticalYOffset(glyph, 82), -15.58);
    assert.equal(getGreekGlyphOpticalYOffset(glyph, 62), -11.78);
  }
  assert.equal(getGreekGlyphOpticalYOffset("Γ", 82), 0);
  assert.equal(getGreekGlyphOpticalYOffset("α", 82), 0);
  assert.equal(getGreekGlyphOpticalYOffset("γ", 0), 0);
});

test("feedback choices use buttons only and avoid dropdown and slider controls", () => {
  assert.deepEqual(FEEDBACK_INTERVALS, { standard: 1000, study: 2000, extended: 3000 });
  const html = readRepoFile("greek-letter-match.html");
  const runtime = readRepoFile("src/apps/greek-letter-match/GreekLetterMatchRuntime.js");
  const css = readRepoFile("src/apps/greek-letter-match/greek-letter-match.css");
  assert.doesNotMatch(html, /<select|<audio|type=["']range/iu);
  assert.doesNotMatch(runtime, /createElement\([^\n]*["']select["']|createElement\([^\n]*["']audio["']|type\s*=\s*["']range["']/u);
  assert.match(runtime, /input\.type = "radio"/u);
  assert.match(runtime, /"Next round"/u);
  assert.match(runtime, /"Teach me"/u);
  assert.match(runtime, /greek-match-pronunciation/u);
  assert.match(runtime, /playPronunciation/u);
  assert.match(runtime, /credits & licenses/u);
  assert.match(runtime, /"Incorrect"/u);
  assert.doesNotMatch(runtime, /Try the highlighted answer/u);
  assert.match(runtime, /greek-match-teach-name/u);
  assert.match(runtime, /greek-match-teach-symbols/u);
  assert.match(runtime, /getBBox/u);
  assert.match(runtime, /greek-match-optical-glyph/u);
  assert.match(runtime, /greek-match-answer-arrow/u);
  assert.match(runtime, /greek-match-answer-arrow-glow/u);
  assert.match(runtime, /greek-match-progress-track/u);
  assert.match(runtime, /greek-match-choice-label/u);
  assert.match(
    css,
    /greek-match-choice\[data-representation="symbol"\] \.greek-match-choice-label/u
  );
  assert.match(
    css,
    /\.greek-match-choice \{[^}]*container-type: inline-size;/u
  );
  assert.match(
    css,
    /\.greek-match-choice\[data-representation="name"\] \{[^}]*letter-spacing: 0;/u
  );
  assert.match(
    css,
    /\.greek-match-choice\[data-representation="name"\] \.greek-match-choice-label \{[^}]*font-size: clamp\(8px, 35cqi, 30px\);/u
  );
  assert.match(
    css,
    /\.greek-match-choice-symbol text \{[^}]*font-family: Georgia, "Times New Roman", serif;/u
  );
  assert.match(
    css,
    /\.greek-match-center \{[^}]*width: 25%;[^}]*height: 25%;/u
  );
});
