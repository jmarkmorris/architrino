export const LATTICE_LAB_RANDOM_FINITE_CASE_ID =
  "simple-cubic-random-finite-fifty-fifty-v1";
export const LATTICE_LAB_RANDOM_DEFAULT_SEED = 20260801;
export const LATTICE_LAB_RANDOM_ASSIGNMENT_ALGORITHM =
  "splitmix32-score-rank-fifty-fifty-v1";

const POSITRINO = "positrino";
const ELECTRINO = "electrino";

function assertSeed(seed) {
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff) {
    throw new RangeError("Random finite configuration seed must be a uint32.");
  }
}

function splitmix32(value) {
  let word = (value + 0x9e3779b9) >>> 0;
  word = Math.imul(word ^ (word >>> 16), 0x21f0aaad) >>> 0;
  word = Math.imul(word ^ (word >>> 15), 0x735a2d97) >>> 0;
  return (word ^ (word >>> 15)) >>> 0;
}

function assignmentFingerprint(orderedPolarities) {
  let hash = 0x811c9dc5;
  orderedPolarities.forEach((polarity) => {
    hash ^= polarity === POSITRINO ? 0x50 : 0x45;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  });
  return hash.toString(16).padStart(8, "0");
}

export function createLatticeLabRandomFiniteAssignment(sites, seed) {
  assertSeed(seed);
  if (!Array.isArray(sites) || sites.length === 0 || sites.length % 2 !== 0) {
    throw new RangeError(
      "Random finite configuration requires a nonempty even site population.",
    );
  }
  const orderedSites = [...sites].sort((left, right) =>
    left.id < right.id ? -1 : left.id > right.id ? 1 : 0
  );
  if (new Set(orderedSites.map((site) => site.id)).size !== orderedSites.length) {
    throw new Error("Random finite configuration site ids must be unique.");
  }
  const ranked = orderedSites.map((site, index) => Object.freeze({
    site,
    index,
    score: splitmix32(
      (seed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0,
    ),
  })).sort((left, right) => left.score - right.score || left.index - right.index);
  const positrinoIds = new Set(
    ranked.slice(0, orderedSites.length / 2).map(({ site }) => site.id),
  );
  const polarityBySiteId = Object.freeze(Object.fromEntries(
    orderedSites.map((site) => [
      site.id,
      positrinoIds.has(site.id) ? POSITRINO : ELECTRINO,
    ]),
  ));
  const orderedPolarities = orderedSites.map(
    (site) => polarityBySiteId[site.id],
  );
  return Object.freeze({
    schema: "lattice-lab-random-finite-assignment/v1",
    algorithm: LATTICE_LAB_RANDOM_ASSIGNMENT_ALGORITHM,
    seed,
    siteOrder: "ascending-utf16-site-id-v1",
    siteCount: orderedSites.length,
    positrinoCount: orderedSites.length / 2,
    electrinoCount: orderedSites.length / 2,
    assignmentFingerprint: assignmentFingerprint(orderedPolarities),
    polarityBySiteId,
  });
}

export function nextLatticeLabRandomFiniteSeed(sites, currentSeed) {
  const current = createLatticeLabRandomFiniteAssignment(sites, currentSeed);
  for (let offset = 1; offset <= 0xffffffff; offset += 1) {
    const seed = (currentSeed + offset) >>> 0;
    const candidate = createLatticeLabRandomFiniteAssignment(sites, seed);
    if (candidate.assignmentFingerprint !== current.assignmentFingerprint) {
      return seed;
    }
  }
  throw new Error("No distinct random finite assignment was found.");
}
