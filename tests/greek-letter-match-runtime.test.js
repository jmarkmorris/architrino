import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  FEEDBACK_INTERVALS,
  GREEK_LETTERS,
  SPHERE_COLOR_PROGRESSION,
  advanceGreekMatch,
  answerGreekMatch,
  createGreekMatchSession,
  createRoundOrder,
  getCurrentLetterIndex,
  getGreekMatchArrowCoordinates,
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
  assert.deepEqual(GREEK_LETTERS[0], { name: "alpha", upper: "Α", lower: "α" });
  assert.deepEqual(GREEK_LETTERS.at(-1), { name: "omega", upper: "Ω", lower: "ω" });
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

test("feedback choices use buttons only and avoid dropdown, slider, and sound controls", () => {
  assert.deepEqual(FEEDBACK_INTERVALS, { standard: 2000, study: 3000, extended: 4000 });
  const html = readRepoFile("greek-letter-match.html");
  const runtime = readRepoFile("src/apps/greek-letter-match/GreekLetterMatchRuntime.js");
  assert.doesNotMatch(html, /<select|<audio|type=["']range/iu);
  assert.doesNotMatch(runtime, /createElement\([^\n]*["']select["']|createElement\([^\n]*["']audio["']|type\s*=\s*["']range["']/u);
  assert.match(runtime, /input\.type = "radio"/u);
  assert.match(runtime, /"Next round"/u);
  assert.match(runtime, /"Teach me"/u);
  assert.match(runtime, /greek-match-teach-name/u);
  assert.match(runtime, /greek-match-teach-symbols/u);
  assert.match(runtime, /getBBox/u);
  assert.match(runtime, /greek-match-optical-glyph/u);
  assert.match(runtime, /greek-match-answer-arrow/u);
  assert.match(runtime, /greek-match-answer-arrow-glow/u);
  assert.match(runtime, /greek-match-progress-track/u);
  assert.match(runtime, /greek-match-choice-label/u);
  assert.match(
    readRepoFile("src/apps/greek-letter-match/greek-letter-match.css"),
    /greek-match-choice\[data-representation="symbol"\] \.greek-match-choice-label/u
  );
});
