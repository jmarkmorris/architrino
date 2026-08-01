#!/usr/bin/env node

const EPSILON = 1e-7;

function add(...vectors) {
  return vectors.reduce(
    (sum, vector) => sum.map((value, axis) => value + vector[axis]),
    [0, 0, 0],
  );
}

function scale(vector, factor) {
  return vector.map((value) => value * factor);
}

function positionKey(position) {
  return position.map((value) => Number(value.toFixed(9))).join(",");
}

function uniquePositions(positions) {
  return [...new Map(positions.map((position) => [
    positionKey(position),
    position,
  ])).values()];
}

function cubeCorners(side) {
  const half = side / 2;
  return [-half, half].flatMap((x) =>
    [-half, half].flatMap((y) =>
      [-half, half].map((z) => [x, y, z])
    )
  );
}

function conventionalBasisSites(side, basis) {
  const positions = [];
  basis.forEach((fractional) => {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        for (let k = -1; k <= 1; k += 1) {
          const translated = fractional.map(
            (value, axis) => value + [i, j, k][axis],
          );
          if (translated.some((value) => value < -EPSILON || value > 1 + EPSILON)) {
            continue;
          }
          positions.push(translated.map((value) => side * (value - 0.5)));
        }
      }
    }
  });
  return uniquePositions(positions);
}

function hcpSites() {
  const a1 = [1, 0, 0];
  const a2 = [0.5, Math.sqrt(3) / 2, 0];
  const cHalf = [0, 0, Math.sqrt(8 / 3) / 2];
  const ring = [
    a1,
    a2,
    add(a2, scale(a1, -1)),
    scale(a1, -1),
    scale(a2, -1),
    add(a1, scale(a2, -1)),
  ];
  const b = scale(add(a1, a2), 1 / 3);
  return [
    ...ring.map((position) => add(position, scale(cHalf, -1))),
    ...ring.map((position) => add(position, cHalf)),
    scale(cHalf, -1),
    cHalf,
    b,
    add(b, scale(a1, -1)),
    add(b, scale(a2, -1)),
  ];
}

function audit(name, sites, expectedCount, expectedDegrees) {
  const degree = sites.map(() => 0);
  const segments = [];
  for (let left = 0; left < sites.length; left += 1) {
    for (let right = left + 1; right < sites.length; right += 1) {
      const distance = Math.hypot(...sites[left].map(
        (value, axis) => value - sites[right][axis],
      ));
      if (Math.abs(distance - 1) >= EPSILON) {
        continue;
      }
      segments.push({ left, right, distance });
      degree[left] += 1;
      degree[right] += 1;
    }
  }
  const histogram = Object.fromEntries(
    degree.reduce((entries, value) => {
      entries.set(value, (entries.get(value) ?? 0) + 1);
      return entries;
    }, new Map()),
  );
  if (
    segments.length !== expectedCount ||
    JSON.stringify(histogram) !== JSON.stringify(expectedDegrees) ||
    segments.some(({ distance }) => Math.abs(distance - 1) >= EPSILON)
  ) {
    throw new Error(`${name} independent nearest-neighbor audit failed.`);
  }
  return {
    sites: sites.length,
    segments: segments.length,
    degreeHistogram: histogram,
    distanceRange: [
      Math.min(...segments.map(({ distance }) => distance)),
      Math.max(...segments.map(({ distance }) => distance)),
    ],
  };
}

const fccBasis = [
  [0, 0, 0],
  [0, 0.5, 0.5],
  [0.5, 0, 0.5],
  [0.5, 0.5, 0],
];
const diamondBasis = [
  ...fccBasis,
  ...fccBasis.map((position) => position.map((value) => value + 0.25)),
];

const result = {
  schema: "lattice-lab-unpolarized-neighbor-network-verification/v1",
  theorem:
    "For a finite represented conventional-cell site set, enumerating every unordered pair exactly once and retaining exactly distance-d pairs exhausts the honest in-cell nearest-neighbor graph.",
  cases: {
    bcc: audit(
      "BCC",
      [...cubeCorners(2 / Math.sqrt(3)), [0, 0, 0]],
      8,
      { 1: 8, 8: 1 },
    ),
    fcc: audit(
      "FCC",
      conventionalBasisSites(Math.SQRT2, fccBasis),
      36,
      { 3: 8, 8: 6 },
    ),
    hcp: audit(
      "HCP",
      hcpSites(),
      45,
      { 4: 12, 8: 3, 9: 2 },
    ),
    diamond: audit(
      "Diamond",
      conventionalBasisSites(4 / Math.sqrt(3), diamondBasis),
      16,
      { 0: 4, 1: 4, 2: 6, 4: 4 },
    ),
    randomSimpleCubic: audit(
      "Random underlying simple cubic",
      cubeCorners(1),
      12,
      { 3: 8 },
    ),
  },
};

console.log(JSON.stringify({ ok: true, ...result }, null, 2));
