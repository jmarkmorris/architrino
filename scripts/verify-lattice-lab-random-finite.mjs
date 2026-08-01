import {
  createLatticeLabCaseGallery,
  createReferencePolarityState,
  createSelectedSiteLedger,
} from "../src/apps/lattice-lab/LatticeLabCase.js";

const CASE_ID = "simple-cubic-random-finite-fifty-fifty-v1";
const ALGORITHM = "splitmix32-score-rank-fifty-fifty-v1";
const DISPLAY_RADIUS = 2.75;

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

function independentFingerprint(sites, assignment) {
  let hash = 0x811c9dc5;
  [...sites].sort((left, right) => left.id.localeCompare(right.id))
    .forEach((site) => {
      hash ^= assignment.get(site.id) === "positrino" ? 0x50 : 0x45;
      hash = Math.imul(hash, 0x01000193) >>> 0;
    });
  return hash.toString(16).padStart(8, "0");
}

function independentSiteIds() {
  const ids = [];
  for (let ix = 0; ix < 8; ix += 1) {
    for (let iy = 0; iy < 8; iy += 1) {
      for (let iz = 0; iz < 8; iz += 1) {
        const position = [ix - 3.5, iy - 3.5, iz - 3.5];
        if (Math.hypot(...position) <= DISPLAY_RADIUS) {
          ids.push(`site-${ix}-${iy}-${iz}`);
        }
      }
    }
  }
  return ids.sort();
}

function independentReceiver(sites, assignment) {
  return [...sites]
    .filter((site) => assignment.get(site.id) === "electrino")
    .sort((left, right) =>
      Math.hypot(...left.position) - Math.hypot(...right.position) ||
      left.id.localeCompare(right.id)
    )[0];
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
assert(caseRecord.displayRadius === DISPLAY_RADIUS, "Random crop radius is not 2.75d.");
assert(
  JSON.stringify(caseRecord.sites.map(({ id }) => id).sort()) ===
    JSON.stringify(independentSiteIds()),
  "Random 2.75d site membership differs from the independent grid enumeration.",
);
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
assert(counts.positrino === 44 && counts.electrino === 44, "Population is not 44/44.");
const fingerprint = independentFingerprint(caseRecord.sites, independent);
assert(
  fingerprint === caseRecord.randomization.assignmentFingerprint,
  "Assignment fingerprint mismatch.",
);

const state = createReferencePolarityState(caseRecord);
const ledger = createSelectedSiteLedger(
  caseRecord,
  state,
  caseRecord.defaultSiteId,
);
const receiver = caseRecord.sites.find(
  (site) => site.id === caseRecord.defaultSiteId,
);
assert(
  receiver.id === independentReceiver(caseRecord.sites, independent).id,
  "Default calculation target is not the independently selected receiver.",
);
const expectedResidual = independentResidual(caseRecord, receiver, independent);
assert(ledger.rows.length === caseRecord.sites.length - 1, "Finite row count mismatch.");
expectedResidual.forEach((value, axis) => {
  assert(
    Math.abs(value - ledger.normalizedAccelerationResidual[axis]) < 1e-12,
    `Finite residual mismatch on axis ${axis}.`,
  );
});

let nextSeed = caseRecord.randomization.seed;
let nextAssignment;
let nextFingerprint = fingerprint;
do {
  nextSeed = (nextSeed + 1) >>> 0;
  nextAssignment = independentAssignment(caseRecord.sites, nextSeed);
  nextFingerprint = independentFingerprint(caseRecord.sites, nextAssignment);
} while (nextFingerprint === fingerprint);
const nextReceiver = independentReceiver(caseRecord.sites, nextAssignment);
const nextResidual = independentResidual(
  caseRecord,
  nextReceiver,
  nextAssignment,
);
const preservedTargetResidual = independentResidual(
  caseRecord,
  receiver,
  nextAssignment,
);

process.stdout.write(`${JSON.stringify({
  ok: true,
  caseId: caseRecord.id,
  algorithm: ALGORITHM,
  displayRadius: caseRecord.displayRadius,
  siteCount: caseRecord.sites.length,
  seed: caseRecord.randomization.seed,
  fingerprint,
  counts,
  targetSiteId: receiver.id,
  includedRows: ledger.rows.length,
  residual: ledger.normalizedAccelerationResidual,
  recalculate: {
    seed: nextSeed,
    fingerprint: nextFingerprint,
    defaultTargetSiteId: nextReceiver.id,
    defaultTargetResidual: nextResidual,
    preservedTargetSiteId: receiver.id,
    preservedTargetResidual,
  },
})}\n`);
