import {
  BORG_CERTIFIED_RUN_GRADE,
  BORG_DISPLAY_RUN_GRADE,
} from "./BorgRunGradeControl.js";

export const BORG_DISPLAY_DEFAULTS_V1 = Object.freeze({
  runGrade: BORG_DISPLAY_RUN_GRADE,
  coupling: 0.0005,
  electrinoCount: 32,
  positrinoCount: 32,
  randomVelocityMaxComponentMagnitude: 0.001,
  randomVelocityMinSpeed: 0,
  simulationEnvelopeRadiusScale: 0.7,
  velocityReversalRadiusScale: 1.25,
});

export function createBorgRunGradeDefaults(manifest, runGrade) {
  requireManifest(manifest);
  if (runGrade === BORG_DISPLAY_RUN_GRADE) {
    return Object.freeze({
      coupling: BORG_DISPLAY_DEFAULTS_V1.coupling,
      initialConditionConfig: Object.freeze({
        electrinoCount: BORG_DISPLAY_DEFAULTS_V1.electrinoCount,
        positrinoCount: BORG_DISPLAY_DEFAULTS_V1.positrinoCount,
        randomVelocityMaxComponentMagnitude:
          BORG_DISPLAY_DEFAULTS_V1.randomVelocityMaxComponentMagnitude,
        randomVelocityMinSpeed: BORG_DISPLAY_DEFAULTS_V1.randomVelocityMinSpeed,
      }),
    });
  }
  if (runGrade === BORG_CERTIFIED_RUN_GRADE) {
    return Object.freeze({
      coupling: Number(manifest.modelControls.coupling),
      initialConditionConfig: Object.freeze({
        electrinoCount: Number(manifest.initialConditions.electrinoCount),
        positrinoCount: Number(manifest.initialConditions.positrinoCount),
        randomVelocityMaxComponentMagnitude: Number(
          manifest.initialConditions.randomVelocityMaxComponentMagnitude,
        ),
        randomVelocityMinSpeed: Number(
          manifest.initialConditions.randomVelocityMinSpeed,
        ),
      }),
    });
  }
  throw new TypeError("Borg run grade must be display or certified.");
}

export function createBorgRunGradePlacementPolicy(
  manifest,
  runGrade,
  totalCount,
) {
  requireManifest(manifest);
  const population = Number(totalCount);
  if (!Number.isSafeInteger(population) || population < 1) {
    throw new TypeError("Borg placement policy requires a positive whole population.");
  }
  const productionRadius = Number(manifest.simulationEnvelope.outerRadius);
  const productionMinimumSeparation = Number(
    manifest.initialConditions.minimumPairSeparation,
  );
  if (runGrade === BORG_CERTIFIED_RUN_GRADE) {
    const declaredPopulation = Number(manifest.population.architrinoCount);
    return Object.freeze({
      seedingRadius:
        productionRadius * Math.max(1, Math.cbrt(population / declaredPopulation)),
      minimumPairSeparation: productionMinimumSeparation,
      velocityReversalRadius: null,
    });
  }
  if (runGrade !== BORG_DISPLAY_RUN_GRADE) {
    throw new TypeError("Borg run grade must be display or certified.");
  }

  const declaredPopulation = Number(manifest.population.architrinoCount);
  const radiusScale = BORG_DISPLAY_DEFAULTS_V1.simulationEnvelopeRadiusScale;
  // The production separation cannot fit 64 paths inside the smaller display
  // sphere. Scale it by the same packing ratio used by the production seeder,
  // then scale the whole display geometry to 70 percent.
  const populationScale = Math.min(
    1,
    Math.cbrt(declaredPopulation / population),
  );
  const seedingRadius = productionRadius * radiusScale;
  return Object.freeze({
    seedingRadius,
    minimumPairSeparation:
      productionMinimumSeparation * radiusScale * populationScale,
    velocityReversalRadius:
      seedingRadius * BORG_DISPLAY_DEFAULTS_V1.velocityReversalRadiusScale,
  });
}

export function borgRunGradeEnvelopeRadius(manifest, runGrade) {
  requireManifest(manifest);
  if (runGrade === BORG_DISPLAY_RUN_GRADE) {
    return Number(manifest.simulationEnvelope.outerRadius) *
      BORG_DISPLAY_DEFAULTS_V1.simulationEnvelopeRadiusScale;
  }
  if (runGrade === BORG_CERTIFIED_RUN_GRADE) {
    return Number(manifest.simulationEnvelope.outerRadius);
  }
  throw new TypeError("Borg run grade must be display or certified.");
}

function requireManifest(manifest) {
  if (!manifest || typeof manifest !== "object") {
    throw new TypeError("Borg run-grade defaults require a manifest.");
  }
}
