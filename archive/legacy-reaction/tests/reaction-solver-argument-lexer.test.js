import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { tokenizeReactionSolverArgument } from "../src/apps/reaction/ReactionSolverArgumentLexerRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("reaction solver compact-argument lexer accepts the committed positive token fixtures", () => {
  const fixtures = readJson("content/contracts/examples/solver-compact-lexer/v1/index.json");
  assert.equal(fixtures.schema, "solver-compact-lexer-fixtures/v1");

  fixtures.positive.forEach((entry) => {
    const result = tokenizeReactionSolverArgument(entry.input);
    assert.equal(result.ok, true, `${entry.id} should tokenize successfully`);
    assert.equal(result.error, null, `${entry.id} should not produce an error`);
    assert.deepEqual(result.tokens, entry.expectedTokens, `${entry.id} token summary drifted`);
  });
});

test("reaction solver compact-argument lexer rejects the committed ambiguity fixtures", () => {
  const fixtures = readJson("content/contracts/examples/solver-compact-lexer/v1/index.json");

  fixtures.negative.forEach((entry) => {
    const result = tokenizeReactionSolverArgument(entry.input);
    assert.equal(result.ok, false, `${entry.id} should fail tokenization`);
    assert.deepEqual(
      {
        code: result.error?.code ?? "",
        index: result.error?.index ?? -1,
      },
      entry.expectedError,
      `${entry.id} error location drifted`
    );
  });
});
