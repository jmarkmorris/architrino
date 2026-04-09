const SEPARATOR_PATTERN = /[\s.,_]/;

function normalizeText(value = "") {
  return String(value ?? "");
}

function isSeparatorCharacter(value = "") {
  return SEPARATOR_PATTERN.test(value);
}

function matchFreeArchitrinoLedger(source = "", startIndex = 0) {
  const match = /^(\d+):(\d+)@/.exec(source.slice(startIndex));
  if (!match) {
    return null;
  }
  const electrinoCount = Number(match[1]);
  const positrinoCount = Number(match[2]);
  if (
    !Number.isInteger(electrinoCount) ||
    !Number.isInteger(positrinoCount) ||
    (electrinoCount === 0 && positrinoCount === 0)
  ) {
    return null;
  }
  return {
    kind: "free-architrino-ledger",
    lexeme: match[0],
    electrinoCount,
    positrinoCount,
  };
}

function matchWeakBoson(source = "", startIndex = 0) {
  const remaining = source.slice(startIndex);
  if (remaining.startsWith("W+")) {
    return {
      kind: "weak-boson",
      lexeme: "W+",
      symbol: "W+",
    };
  }
  if (remaining.startsWith("W-")) {
    return {
      kind: "weak-boson",
      lexeme: "W-",
      symbol: "W-",
    };
  }
  if (remaining.startsWith("Z")) {
    return {
      kind: "weak-boson",
      lexeme: "Z",
      symbol: "Z",
    };
  }
  return null;
}

function matchWholeCoreAggregate(source = "", startIndex = 0) {
  const remaining = source.slice(startIndex);
  if (remaining.startsWith("2h")) {
    return {
      kind: "whole-core-aggregate",
      lexeme: "2h",
      count: 2,
    };
  }
  if (remaining.startsWith("4h")) {
    return {
      kind: "whole-core-aggregate",
      lexeme: "4h",
      count: 4,
    };
  }
  return null;
}

function matchCoreForm(source = "", startIndex = 0) {
  const match = /^(a)?(h3|h2|h)/.exec(source.slice(startIndex));
  if (!match) {
    return null;
  }
  return {
    kind: "core-form",
    lexeme: match[0],
    anti: match[1] === "a",
    form: match[2],
  };
}

function matchNucleon(source = "", startIndex = 0) {
  const match = /^(a)?([PN])/.exec(source.slice(startIndex));
  if (!match) {
    return null;
  }
  return {
    kind: "nucleon",
    lexeme: match[0],
    anti: match[1] === "a",
    symbol: match[2],
  };
}

function matchFermion(source = "", startIndex = 0) {
  const match = /^(a)?([eudv])([123])?/.exec(source.slice(startIndex));
  if (!match) {
    return null;
  }
  const generation = match[3] ? Number(match[3]) : 1;
  return {
    kind: "fermion",
    lexeme: match[0],
    anti: match[1] === "a",
    family: match[2],
    generation,
  };
}

const TOKEN_MATCHERS = Object.freeze([
  matchFreeArchitrinoLedger,
  matchWeakBoson,
  matchWholeCoreAggregate,
  matchCoreForm,
  matchNucleon,
  matchFermion,
]);

function pickLongestTokenMatch(source = "", startIndex = 0) {
  let bestMatch = null;
  TOKEN_MATCHERS.forEach((matchToken) => {
    const candidate = matchToken(source, startIndex);
    if (!candidate?.lexeme) {
      return;
    }
    if (!bestMatch || candidate.lexeme.length > bestMatch.lexeme.length) {
      bestMatch = candidate;
    }
  });
  return bestMatch;
}

function buildLexerError(code, source = "", index = 0) {
  return {
    code,
    index,
    fragment: source.slice(index, Math.min(source.length, index + 12)),
  };
}

export function tokenizeReactionSolverArgument(source = "") {
  const raw = normalizeText(source);
  const tokens = [];
  let index = 0;
  while (index < raw.length) {
    if (isSeparatorCharacter(raw[index])) {
      index += 1;
      continue;
    }
    const match = pickLongestTokenMatch(raw, index);
    if (!match) {
      return {
        ok: false,
        source: raw,
        tokens: [],
        error: buildLexerError("invalid-token", raw, index),
      };
    }
    tokens.push(match);
    index += match.lexeme.length;
  }
  if (!tokens.length) {
    return {
      ok: false,
      source: raw,
      tokens: [],
      error: buildLexerError("empty-input", raw, 0),
    };
  }
  return {
    ok: true,
    source: raw,
    tokens,
    error: null,
  };
}
