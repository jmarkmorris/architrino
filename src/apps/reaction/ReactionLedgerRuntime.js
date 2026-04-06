export function createEmptyReactionLedger() {
  return {
    electrino: 0,
    positrino: 0,
  };
}

export function normalizeReactionLedger(ledger = null) {
  return {
    electrino: Math.max(0, Number(ledger?.electrino ?? 0)),
    positrino: Math.max(0, Number(ledger?.positrino ?? 0)),
  };
}

export function addReactionLedgers(leftLedger = null, rightLedger = null) {
  const left = normalizeReactionLedger(leftLedger);
  const right = normalizeReactionLedger(rightLedger);
  return {
    electrino: left.electrino + right.electrino,
    positrino: left.positrino + right.positrino,
  };
}

export function subtractReactionLedgers(leftLedger = null, rightLedger = null) {
  const left = normalizeReactionLedger(leftLedger);
  const right = normalizeReactionLedger(rightLedger);
  return {
    electrino: Math.max(0, left.electrino - right.electrino),
    positrino: Math.max(0, left.positrino - right.positrino),
  };
}

export function reactionLedgerFitsWithin(limitLedger = null, candidateLedger = null) {
  const limit = normalizeReactionLedger(limitLedger);
  const candidate = normalizeReactionLedger(candidateLedger);
  return (
    candidate.electrino <= limit.electrino &&
    candidate.positrino <= limit.positrino
  );
}

export function reactionLedgersMatch(leftLedger = null, rightLedger = null) {
  const left = normalizeReactionLedger(leftLedger);
  const right = normalizeReactionLedger(rightLedger);
  return (
    left.electrino === right.electrino &&
    left.positrino === right.positrino
  );
}

export function hasReactionLedger(ledger = null) {
  const normalized = normalizeReactionLedger(ledger);
  return normalized.electrino > 0 || normalized.positrino > 0;
}

export function formatReactionLedger(ledger = null) {
  const normalized = normalizeReactionLedger(ledger);
  const parts = [];
  if (normalized.electrino) {
    parts.push(`${normalized.electrino} electrino`);
  }
  if (normalized.positrino) {
    parts.push(`${normalized.positrino} positrino`);
  }
  return parts.join(" + ") || "empty ledger";
}

export function getReactionLedgerSignature(ledger = null) {
  const normalized = normalizeReactionLedger(ledger);
  return `${normalized.electrino}:${normalized.positrino}`;
}
