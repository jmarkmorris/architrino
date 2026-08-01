import {
  createLatticeLabCaseGallery,
  createReferencePolarityState,
  createSelectedSiteLedger,
} from "../src/apps/lattice-lab/LatticeLabCase.js";

const CASE_ID = "simple-cubic-random-finite-fifty-fifty-v1";
const ALGORITHM = "splitmix32-score-rank-fifty-fifty-v1";

function score(seed, ordinal) {
  let word = (
    (seed ^ Math.imul(ordinal + 1, 0x9e3779b9)) + 0x9e3779b9
  ) >>> 0;
  word = Math.imul(word ^ (word >>> 16), 0x21f0aaad) >>> 0;
  word = Math.imul(word ^ (word >>> 15), 0x735a2d97) >>> 0;
  return (word ^ (word >>> 15)) >>> 0;
}

function independentAssignment(sites, seed) {
  const ordered = [...sites].sort((left, right) =>
    left.id < right.id ? -1 : left.id > right.id ? 1 : 0
  );
  const ranked = ordered.map((site, ordinal) => ({
    site,
    ordinal,
    score: score(seed, ordinal),
  })).sort((left, right) =>
    left.score - right.score || left.ordinal - right.ordinal
  );
  const positrinoIds = new Set(
    ranked.slice(0, ordered.length / 2).map(({ site }) => site.id),
  );
  return new Map(ordered.map((site) => [
    site.id,
    positrinoIds.has(site.id) ? "positrino" : "electrino",
  ]));
}

function independentResidual(caseRecord, receiver, polarityBySiteId) {
  return caseRecord.sites
    .filter((site) => site.id !== receiver.id)
    .reduce((sum, site) => {
      const offset = site.grid.map(
        (value, axis) => value - receiver.grid[axis],
      );
      const radius = Math.hypot(...offset);
      const sign = polarityBySiteId.get(site.id) ===
          polarityBySiteId.get(receiver.id)
        ? 1
        : -1;
      return sum.map(
        (value, axis) => value - sign * offset[axis] / (radius ** 3),
      );
    }, [0, 0, 0]);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const caseRecord = createLatticeLabCaseGallery().find(
  (record) => record.id === CASE_ID,
);
assert(caseRecord, "Random finite gallery case is missing.");
assert(caseRecord.randomization.algorithm === ALGORITHM, "Algorithm mismatch.");
const independent = independentAssignment(
  caseRecord.sites,
  caseRecord.randomization.seed,
);
const counts = { positrino: 0, electrino: 0 };
caseRecord.sites.forEach((site) => {
  assert(
    independent.get(site.id) === site.polarity,
    `Seeded polarity mismatch at ${site.id}.`,
  );
  counts[site.polarity] += 1;
});
assert(counts.positrino === 68 && counts.electrino === 68, "Population is not 68/68.");

const state = createReferencePolarityState(caseRecord);
const ledger = createSelectedSiteLedger(
  caseRecord,
  state,
  caseRecord.defaultSiteId,
);
const receiver = caseRecord.sites.find(
  (site) => site.id === caseRecord.defaultSiteId,
);
const expectedResidual = independentResidual(caseRecord, receiver, independent);
assert(ledger.rows.length === caseRecord.sites.length - 1, "Finite row count mismatch.");
expectedResidual.forEach((value, axis) => {
  assert(
    Math.abs(value - ledger.normalizedAccelerationResidual[axis]) < 1e-12,
    `Finite residual mismatch on axis ${axis}.`,
  );
});

process.stdout.write(`${JSON.stringify({
  ok: true,
  caseId: caseRecord.id,
  algorithm: ALGORITHM,
  seed: caseRecord.randomization.seed,
  fingerprint: caseRecord.randomization.assignmentFingerprint,
  counts,
  includedRows: ledger.rows.length,
  residual: ledger.normalizedAccelerationResidual,
})}\n`);
