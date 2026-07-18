export const BORG_INTERACTIVE_DEFAULTS_V1 = Object.freeze({
  coupling: 0.0005,
  coreScale: 0.2,
  farFieldEnclosureFraction: 0,
  electrinoCount: 32,
  positrinoCount: 32,
  randomVelocityMaxComponentMagnitude: 0.001,
  randomVelocityMinSpeed: 0,
});

export function createBorgInteractiveDefaults(manifest) {
  requireManifest(manifest);
  return Object.freeze({
    coupling: BORG_INTERACTIVE_DEFAULTS_V1.coupling,
    initialConditionConfig: Object.freeze({
      electrinoCount: BORG_INTERACTIVE_DEFAULTS_V1.electrinoCount,
      positrinoCount: BORG_INTERACTIVE_DEFAULTS_V1.positrinoCount,
      randomVelocityMaxComponentMagnitude:
        BORG_INTERACTIVE_DEFAULTS_V1.randomVelocityMaxComponentMagnitude,
      randomVelocityMinSpeed:
        BORG_INTERACTIVE_DEFAULTS_V1.randomVelocityMinSpeed,
    }),
  });
}

export function createBorgPlacementPolicy(manifest, totalCount) {
  requireManifest(manifest);
  const population = Number(totalCount);
  if (!Number.isSafeInteger(population) || population < 1) {
    throw new TypeError("Borg placement policy requires a positive whole population.");
  }
  const declaredPopulation = Number(manifest.population.architrinoCount);
  const productionMinimumSeparation = Number(
    manifest.initialConditions.minimumPairSeparation,
  );
  const populationScale = Math.min(
    1,
    Math.cbrt(declaredPopulation / population),
  );
  return Object.freeze({
    seedingRadius: borgEnvelopeRadius(manifest),
    minimumPairSeparation: productionMinimumSeparation * populationScale,
  });
}

export function borgEnvelopeRadius(manifest) {
  requireManifest(manifest);
  return Number(manifest.simulationEnvelope.outerRadius);
}

function requireManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw new TypeError("Borg interactive defaults require a manifest.");
  }
}
