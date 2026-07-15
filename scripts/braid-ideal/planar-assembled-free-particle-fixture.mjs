// SUPERSEDED FOR PHOTON CLAIMS (2026-07-15 model audit): the (3,2,3)
// occupancy rows below define charged 8-architrino braids, not the canonical
// 6-architrino (3 of each polarity) braid; within-braid phases are fixed
// constants; ring z-offsets do not flatten with drift speed. Kept unchanged
// so the section 99 scoped negative and its anchor/controls remain
// reproducible. Canonical-photon search:
// reference/priorities/braid-ideal/canonical-photon-search-dispatch-packet.md

const TAU = 2 * Math.PI;

export const PLANAR_ASSEMBLED_FREE_PARTICLE_FIXTURE = Object.freeze({
  schema: "planar_assembled_free_particle_fixture.v0",
  fieldSpeed: 1,
  soft: 0.02,
  delayWindow: 6,
  scanSubdivisions: 96,
  retainedSegmentCount: 48,
  coarseCycleSamples: 1,
  derivativeCycleSamples: 1,
  coordinateStep: 0.0125,
  rateStep: 0.01,
  collisionFloor: 0.04,
  gates: Object.freeze({ bindResidual: 0.03, pump: 0.02, lockResidual: 0.02, leadingGrowth: 1e-6, charge: 1e-12 }),
  baseRings: Object.freeze([
    Object.freeze({ id: "I", radius: 0.9951171875, omega: 0.8, z: -0.34, phase: 1.345498903589793 }),
    Object.freeze({ id: "M", radius: 1.25, omega: 0.8, z: 0, phase: 0 }),
    Object.freeze({ id: "O", radius: 1.8740234375, omega: 0.8, z: 0.34, phase: 2.191779057179586 }),
  ]),
  pairFactors: Object.freeze({
    radiusScales: Object.freeze([[1, 1, 1], [0.9, 1.05, 1.1]]),
    omegaScales: Object.freeze([[1, 1, 1], [1.08, 0.94, 1.03]]),
    stackScales: Object.freeze([0.8, 1.15]),
    phases: Object.freeze([Math.PI, 7 * Math.PI / 6, 4 * Math.PI / 3, 3 * Math.PI / 2]),
    pocketWidths: Object.freeze([1.1, 1.45]),
    occupancies: Object.freeze([[2, 2, 2], [3, 2, 3]]),
    polarityPatterns: Object.freeze([[1, 1, 1], [1, -1, 1]]),
    orderings: Object.freeze(["pro_pocket_anti", "anti_pocket_pro"]),
    sea: Object.freeze([
      Object.freeze({ enabled: false, density: 0, cadence: 0.5, spacing: 2, orientationLag: 0 }),
      Object.freeze({ enabled: true, density: 0.12, cadence: 0.7, spacing: 2.2, orientationLag: Math.PI / 12 }),
    ]),
  }),
  photon: Object.freeze({
    drifts: Object.freeze([0, 0.9, 0.99, 0.999, 0.9999]),
    pairConfigurations: 12,
  }),
  electron: Object.freeze({
    drifts: Object.freeze([0, 0.25, 0.5, 0.75]),
    pairConfigurations: 4,
    payloadScaleFactors: Object.freeze([0.8, 1]),
    payloadModes: Object.freeze({
      column: Object.freeze(["static"]),
      ring: Object.freeze(["static", "co_rotating", "counter_rotating"]),
      octahedron: Object.freeze(["static", "co_rotating", "counter_rotating"]),
      two_triangles: Object.freeze(["static", "co_rotating", "counter_rotating"]),
    }),
  }),
  tiltSweep: Object.freeze([-0.05, -0.02, 0, 0.02, 0.05]),
  samplingLadder: Object.freeze([3, 6, 12, 24]),
  analyticAnchor: Object.freeze({ radius: 0.75, separation: 1.4, tolerance: 1e-9 }),
  controlsTolerance: 1e-9,
});
