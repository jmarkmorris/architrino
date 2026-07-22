import {
  ALL_RETAINED_SIMPLE_ROOTS_POLICY,
  PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
  sha256Canonical,
  validatePrescribedRecordAnalysisProtocol,
} from "./AnalyticalBraidEvaluator.mjs";

export const B1_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/b1-complete-cycle-probe-protocol.v1";

const TWO_PI = 2 * Math.PI;

function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  return value;
}

function string(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function number(value, label) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) throw new TypeError(`${label} must be finite.`);
  return normalized;
}

function positive(value, label) {
  const normalized = number(value, label);
  if (!(normalized > 0)) throw new RangeError(`${label} must be positive.`);
  return normalized;
}

function positiveInteger(value, label) {
  const normalized = number(value, label);
  if (!Number.isSafeInteger(normalized) || normalized < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return normalized;
}

function numericArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError(`${label} must be a nonempty array.`);
  }
  return value.map((entry, index) => number(entry, `${label}[${index}]`));
}

function strictlyIncreasing(values, label) {
  for (let index = 1; index < values.length; index += 1) {
    if (!(values[index] > values[index - 1])) {
      throw new RangeError(`${label} must be strictly increasing.`);
    }
  }
}

function bothProbePolarities(value, label) {
  const polarities = numericArray(value, label);
  if (polarities.length !== 2 || polarities[0] !== 1 || polarities[1] !== -1) {
    throw new TypeError(`${label} must be [1, -1].`);
  }
  return polarities;
}

export function createPeriodicCycleTimes({ start, period, sampleCount }) {
  const normalizedStart = number(start, "cycle start");
  const normalizedPeriod = positive(period, "cycle period");
  const normalizedCount = positiveInteger(sampleCount, "cycle sample count");
  return Array.from(
    { length: normalizedCount },
    (_, index) => normalizedStart + normalizedPeriod * index / normalizedCount,
  );
}

function legendreValueAndDerivative(order, value) {
  let previous = 1;
  let current = value;
  if (order === 0) return { value: previous, derivative: 0 };
  if (order === 1) return { value: current, derivative: 1 };
  for (let degree = 2; degree <= order; degree += 1) {
    const next = ((2 * degree - 1) * value * current - (degree - 1) * previous) / degree;
    previous = current;
    current = next;
  }
  return {
    value: current,
    derivative: order * (value * current - previous) / (value * value - 1),
  };
}

export function createGaussLegendreNodesAndWeights(order) {
  const normalizedOrder = positiveInteger(order, "Gauss-Legendre order");
  if (normalizedOrder < 2) throw new RangeError("Gauss-Legendre order must be at least 2.");
  const nodes = Array(normalizedOrder);
  const weights = Array(normalizedOrder);
  const half = Math.ceil(normalizedOrder / 2);
  for (let index = 0; index < half; index += 1) {
    let root = Math.cos(Math.PI * (index + 0.75) / (normalizedOrder + 0.5));
    for (let iteration = 0; iteration < 64; iteration += 1) {
      const row = legendreValueAndDerivative(normalizedOrder, root);
      const next = root - row.value / row.derivative;
      if (Math.abs(next - root) <= 4 * Number.EPSILON) {
        root = next;
        break;
      }
      root = next;
    }
    const row = legendreValueAndDerivative(normalizedOrder, root);
    const weight = 2 / ((1 - root * root) * row.derivative * row.derivative);
    nodes[index] = -root;
    nodes[normalizedOrder - 1 - index] = root;
    weights[index] = weight;
    weights[normalizedOrder - 1 - index] = weight;
  }
  return { nodes, weights };
}

export function createSphericalProductQuadrature({ polarOrder, azimuthCount }) {
  const normalizedAzimuthCount = positiveInteger(azimuthCount, "azimuth count");
  const { nodes, weights } = createGaussLegendreNodesAndWeights(polarOrder);
  const azimuthWeight = TWO_PI / normalizedAzimuthCount;
  return nodes.flatMap((cosTheta, polarIndex) => {
    const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
    return Array.from({ length: normalizedAzimuthCount }, (_, azimuthIndex) => {
      const phi = TWO_PI * azimuthIndex / normalizedAzimuthCount;
      return {
        id: `mu-${polarIndex}-phi-${azimuthIndex}`,
        polarIndex,
        azimuthIndex,
        cosTheta,
        phi,
        unitVector: {
          x: sinTheta * Math.cos(phi),
          y: sinTheta * Math.sin(phi),
          z: cosTheta,
        },
        solidAngleWeight: weights[polarIndex] * azimuthWeight,
      };
    });
  });
}

function validateResolution(raw, label) {
  const resolution = object(raw, label);
  return {
    timeSamples: positiveInteger(resolution.timeSamples, `${label}.timeSamples`),
    polarOrder: positiveInteger(resolution.polarOrder, `${label}.polarOrder`),
    azimuthCount: positiveInteger(resolution.azimuthCount, `${label}.azimuthCount`),
  };
}

export function validateB1CompleteCycleProbeProtocol(rawProtocol) {
  const raw = object(rawProtocol, "complete-cycle probe protocol");
  if (raw.schema !== B1_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA) {
    throw new TypeError(`protocol requires schema ${B1_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA}.`);
  }
  const protocolId = string(raw.protocolId, "protocol.protocolId");
  const applicability = object(raw.applicability, "protocol.applicability");
  if (applicability.familyId !== "B" || applicability.memberId !== "B1") {
    throw new TypeError("protocol applicability must be Family B member B1.");
  }
  const sourceEnvelopeRadius = positive(
    applicability.maximumSourceEnvelopeRadius,
    "protocol.applicability.maximumSourceEnvelopeRadius",
  );
  const sourceCount = positiveInteger(applicability.sourceCount, "protocol.applicability.sourceCount");
  if (sourceCount !== 6) throw new RangeError("B1 protocol sourceCount must be 6.");

  const eventEvaluator = object(raw.eventEvaluator, "protocol.eventEvaluator");
  if (eventEvaluator.rootPolicy?.id !== ALL_RETAINED_SIMPLE_ROOTS_POLICY) {
    throw new TypeError(`eventEvaluator.rootPolicy.id must be ${ALL_RETAINED_SIMPLE_ROOTS_POLICY}.`);
  }
  const historyStart = number(eventEvaluator.history?.start, "eventEvaluator.history.start");
  const historyEnd = number(eventEvaluator.history?.end, "eventEvaluator.history.end");
  if (!(historyEnd > historyStart)) throw new RangeError("eventEvaluator history interval is empty.");
  const fieldSpeed = positive(eventEvaluator.fieldSpeed, "eventEvaluator.fieldSpeed");

  const cycle = object(raw.completeCycle, "protocol.completeCycle");
  const cycleStart = number(cycle.start, "protocol.completeCycle.start");
  const cyclePeriod = positive(cycle.period, "protocol.completeCycle.period");
  if (positive(
    applicability.requiredPrescribedReturnPeriod,
    "protocol.applicability.requiredPrescribedReturnPeriod",
  ) !== cyclePeriod) {
    throw new RangeError("complete-cycle period must equal the required B1 prescribed return period.");
  }
  if (cycle.samplingRule !== "uniform-left-closed-periodic-grid.v1") {
    throw new TypeError("completeCycle.samplingRule must be uniform-left-closed-periodic-grid.v1.");
  }
  const primary = validateResolution(cycle.primary, "protocol.completeCycle.primary");
  const refined = validateResolution(cycle.refined, "protocol.completeCycle.refined");
  if (!(refined.timeSamples > primary.timeSamples &&
      refined.polarOrder > primary.polarOrder &&
      refined.azimuthCount > primary.azimuthCount)) {
    throw new RangeError("refined time and angular resolution must exceed primary resolution.");
  }

  const internalProbes = object(raw.internalProbes, "protocol.internalProbes");
  const axes = internalProbes.fixedCartesianGrid?.axisCoordinates;
  const axisCoordinates = numericArray(axes, "internalProbes.fixedCartesianGrid.axisCoordinates");
  strictlyIncreasing(axisCoordinates, "internal grid axis coordinates");
  if (axisCoordinates[0] > -sourceEnvelopeRadius || axisCoordinates.at(-1) < sourceEnvelopeRadius) {
    throw new RangeError("internal Cartesian grid must span the source-envelope bounding box.");
  }
  bothProbePolarities(
    internalProbes.fixedCartesianGrid.probePolarities,
    "internalProbes.fixedCartesianGrid.probePolarities",
  );
  const endpointReceivers = object(
    internalProbes.sourceEndpointReceivers,
    "internalProbes.sourceEndpointReceivers",
  );
  if (endpointReceivers.kind !== "prescribed-source-endpoint-probe.v1" ||
      endpointReceivers.selfHitPolicy !== "exclude-same-source-id.v1") {
    throw new TypeError("endpoint receivers must exclude the same source id.");
  }

  const surfaces = object(raw.enclosingSurfaces, "protocol.enclosingSurfaces");
  const radii = numericArray(surfaces.radii, "enclosingSurfaces.radii");
  strictlyIncreasing(radii, "enclosing surface radii");
  if (radii[0] <= sourceEnvelopeRadius) {
    throw new RangeError("every enclosing surface radius must exceed the source envelope radius.");
  }
  if (surfaces.angularRule !== "gauss-legendre-cos-theta/uniform-azimuth-product.v1") {
    throw new TypeError("unsupported enclosing-surface angular rule.");
  }
  const surfacePolarities = bothProbePolarities(
    surfaces.probePolarities,
    "enclosingSurfaces.probePolarities",
  );
  const latestRetardedReach = cycleStart -
    (radii.at(-1) + sourceEnvelopeRadius) / fieldSpeed;
  if (latestRetardedReach < historyStart) {
    throw new RangeError("history does not cover the conservative outer-surface retarded reach.");
  }
  if (cycleStart + cyclePeriod > historyEnd) {
    throw new RangeError("complete cycle must lie inside the exact source history interval.");
  }

  const angular = object(raw.angularReduction, "protocol.angularReduction");
  const exposure = object(raw.externalExposureReduction, "protocol.externalExposureReduction");
  if (exposure.etaExt !== "L_ext/(L_raw+exposureFloor).v1") {
    throw new TypeError("externalExposureReduction.etaExt must bind the declared exposure ratio.");
  }
  const wakeFlux = object(
    raw.causalWakeFluxReduction,
    "protocol.causalWakeFluxReduction",
  );
  if (wakeFlux.integrationWindow !== "one-complete-return-cycle.v1" ||
      wakeFlux.normalProjection !==
        "fieldSpeed-times-root-signed-wake-times-root-direction-dot-outward-normal.v1" ||
      wakeFlux.rawAggregation !==
        "sum-absolute-transmitter-root-normal-contributions-before-superposition.v1" ||
      wakeFlux.residualAggregation !==
        "absolute-signed-superposition-after-transmitter-root-summation.v1" ||
      wakeFlux.etaWakeFlux !== "residualCycleIntegral/rawCycleIntegral.v1" ||
      wakeFlux.rawEmissionReference !==
        "cycle-period-times-sum-absolute-source-polarity.v1") {
    throw new TypeError("causalWakeFluxReduction must bind the declared full-cycle formulas.");
  }
  const wakeFluxFloor = positive(
    wakeFlux.fluxFloor,
    "causalWakeFluxReduction.fluxFloor",
  );
  const frequencyResolvedWakeFlux = object(
    wakeFlux.frequencyResolved,
    "causalWakeFluxReduction.frequencyResolved",
  );
  if (frequencyResolvedWakeFlux.angularBasis !==
        "same-real-orthonormal-spherical-harmonic-basis-as-angularReduction.v1" ||
      frequencyResolvedWakeFlux.temporalBasis !== "complete-cycle-complex-dft.v1" ||
      frequencyResolvedWakeFlux.transmitterRootTag !==
        "transmitter-id-plus-root-ordinal.v1" ||
      frequencyResolvedWakeFlux.rawCoefficientAggregation !==
        "sum-transmitter-root-complex-magnitudes-before-superposition.v1" ||
      frequencyResolvedWakeFlux.netCoefficientAggregation !==
        "magnitude-of-transmitter-root-complex-sum.v1" ||
      frequencyResolvedWakeFlux.etaWakeFluxCoefficient !==
        "netMagnitude/rawMagnitude.v1") {
    throw new TypeError(
      "causalWakeFluxReduction.frequencyResolved must bind the declared coefficient formulas.",
    );
  }
  const wakeFluxCoefficientFloor = positive(
    frequencyResolvedWakeFlux.coefficientFloor,
    "causalWakeFluxReduction.frequencyResolved.coefficientFloor",
  );
  if (wakeFluxCoefficientFloor !== wakeFluxFloor) {
    throw new RangeError("frequency-resolved coefficient floor must equal the wake-flux floor.");
  }
  positive(
    frequencyResolvedWakeFlux.relativeComparisonFloor,
    "causalWakeFluxReduction.frequencyResolved.relativeComparisonFloor",
  );
  if (angular.realForm !==
      "m-negative=sqrt(2)Im(Y_l_abs(m));m-zero=Y_l_0;m-positive=sqrt(2)Re(Y_l_m).v1") {
    throw new TypeError("angularReduction.realForm must bind the real harmonic convention.");
  }
  const maximumDegree = positiveInteger(angular.maximumDegree, "angularReduction.maximumDegree");
  if (maximumDegree >= primary.polarOrder || 2 * maximumDegree >= primary.azimuthCount) {
    throw new RangeError("primary angular grid does not resolve the declared maximum degree.");
  }
  const spectral = object(raw.spectralReduction, "protocol.spectralReduction");
  const maximumHarmonic = positiveInteger(
    spectral.maximumHarmonic,
    "spectralReduction.maximumHarmonic",
  );
  if (2 * maximumHarmonic >= primary.timeSamples) {
    throw new RangeError("primary time grid violates the retained spectral Nyquist margin.");
  }
  const sensitivity = object(raw.localSourceSensitivity, "protocol.localSourceSensitivity");
  const radialScaling = object(raw.radialScalingReduction, "protocol.radialScalingReduction");
  positive(
    radialScaling.positiveMeasureRelativeFloor,
    "radialScalingReduction.positiveMeasureRelativeFloor",
  );
  const gates = object(raw.failClosedGates, "protocol.failClosedGates");
  positive(
    gates.quadratureConvergence?.exposureRelative,
    "failClosedGates.quadratureConvergence.exposureRelative",
  );
  positive(
    gates.quadratureConvergence?.anisotropyAbsolute,
    "failClosedGates.quadratureConvergence.anisotropyAbsolute",
  );
  positive(
    gates.quadratureConvergence?.retainedSpectralPowerRelative,
    "failClosedGates.quadratureConvergence.retainedSpectralPowerRelative",
  );
  positive(
    gates.quadratureConvergence?.radialExponentAbsolute,
    "failClosedGates.quadratureConvergence.radialExponentAbsolute",
  );
  positive(
    gates.quadratureConvergence?.causalWakeFluxRelativeOrAbsolute,
    "failClosedGates.quadratureConvergence.causalWakeFluxRelativeOrAbsolute",
  );
  positive(
    gates.quadratureConvergence?.frequencyResolvedWakeFluxRelativeOrAbsolute,
    "failClosedGates.quadratureConvergence.frequencyResolvedWakeFluxRelativeOrAbsolute",
  );
  positive(
    gates.causalWakeFlux?.rawEmissionReferenceRelative,
    "failClosedGates.causalWakeFlux.rawEmissionReferenceRelative",
  );
  const outOfBandRmsThreshold = positive(
    gates.causalWakeFlux?.frequencyResolvedOutOfBandRmsFraction,
    "failClosedGates.causalWakeFlux.frequencyResolvedOutOfBandRmsFraction",
  );
  if (outOfBandRmsThreshold > 1) {
    throw new RangeError("frequency-resolved out-of-band RMS threshold cannot exceed one.");
  }
  positive(
    gates.quadratureConvergence?.sourceSensitivityRelativeOrAbsolute,
    "failClosedGates.quadratureConvergence.sourceSensitivityRelativeOrAbsolute",
  );
  const coordinates = sensitivity.coordinates;
  if (!Array.isArray(coordinates) || coordinates.join(",") !== "alpha_1,alpha_2,alpha_3") {
    throw new TypeError("local sensitivity coordinates must be alpha_1, alpha_2, alpha_3.");
  }
  const step = positive(sensitivity.primaryStep, "localSourceSensitivity.primaryStep");
  const refinedStep = positive(sensitivity.refinedStep, "localSourceSensitivity.refinedStep");
  if (Math.abs(refinedStep * 2 - step) > 1e-15) {
    throw new RangeError("refined sensitivity step must be one half the primary step.");
  }

  validatePrescribedRecordAnalysisProtocol({
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId: `${protocolId}-event-settings-validation`,
    fieldSpeed: eventEvaluator.fieldSpeed,
    coupling: eventEvaluator.coupling,
    history: eventEvaluator.history,
    returnWindow: { start: cycleStart, period: cyclePeriod },
    rootPolicy: eventEvaluator.rootPolicy,
    tolerances: eventEvaluator.tolerances,
    geometry: eventEvaluator.geometry,
    convergence: eventEvaluator.convergence,
    probes: [{
      id: "protocol-validation-probe",
      kind: "stationary-coordinate-probe.v1",
      position: { x: radii[0], y: 0, z: 0 },
      observationTimes: [cycleStart],
      polarities: surfacePolarities,
    }],
  });

  return structuredClone(raw);
}

export function summarizeB1CompleteCycleProbeProtocol(rawProtocol) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  const primary = protocol.completeCycle.primary;
  const refined = protocol.completeCycle.refined;
  const radiusCount = protocol.enclosingSurfaces.radii.length;
  const gridSide = protocol.internalProbes.fixedCartesianGrid.axisCoordinates.length;
  const surfaceDirectionCount = primary.polarOrder * primary.azimuthCount;
  const refinedSurfaceDirectionCount = refined.polarOrder * refined.azimuthCount;
  return {
    schema: protocol.schema,
    protocolId: protocol.protocolId,
    protocolHash: sha256Canonical(protocol),
    primary: {
      timeSamples: primary.timeSamples,
      internalFixedProbeCount: gridSide ** 3,
      endpointReceiverCount: protocol.applicability.sourceCount,
      surfaceRadiusCount: radiusCount,
      surfaceDirectionCount,
      surfaceEventCount: radiusCount * surfaceDirectionCount * primary.timeSamples,
    },
    refined: {
      timeSamples: refined.timeSamples,
      surfaceDirectionCount: refinedSurfaceDirectionCount,
      surfaceEventCount: radiusCount * refinedSurfaceDirectionCount * refined.timeSamples,
    },
    conservativeRetardedHistoryMargin: protocol.completeCycle.start -
      (protocol.enclosingSurfaces.radii.at(-1) +
        protocol.applicability.maximumSourceEnvelopeRadius) /
      protocol.eventEvaluator.fieldSpeed - protocol.eventEvaluator.history.start,
    implementedByCurrentEvaluator: {
      stationarySurfaceEvents: true,
      fixedInternalCoordinateEvents: true,
      movingEndpointReceiverEvents: false,
      surfaceAngularSpectralRadialReductions: true,
      fullCycleCausalWakeFluxReduction: true,
      frequencyResolvedCausalWakeFluxReduction: true,
      localSourceSensitivityReduction: false,
    },
  };
}

export function createB1CapAngleSensitivityStencil({ value, domain, step }) {
  const normalizedValue = number(value, "cap angle");
  const normalizedDomain = numericArray(domain, "cap-angle domain");
  if (normalizedDomain.length !== 2 || !(normalizedDomain[1] > normalizedDomain[0])) {
    throw new RangeError("cap-angle domain must be [minimum, maximum].");
  }
  const normalizedStep = positive(step, "cap-angle sensitivity step");
  const [minimum, maximum] = normalizedDomain;
  if (normalizedValue < minimum || normalizedValue > maximum) {
    throw new RangeError("cap angle lies outside the declared domain.");
  }
  if (normalizedValue - normalizedStep >= minimum &&
      normalizedValue + normalizedStep <= maximum) {
    return {
      kind: "three-point-centered.v1",
      coordinates: [normalizedValue - normalizedStep, normalizedValue + normalizedStep],
      weights: [-1 / (2 * normalizedStep), 1 / (2 * normalizedStep)],
    };
  }
  if (normalizedValue + 2 * normalizedStep <= maximum) {
    return {
      kind: "three-point-second-order-forward.v1",
      coordinates: [normalizedValue, normalizedValue + normalizedStep, normalizedValue + 2 * normalizedStep],
      weights: [-3 / (2 * normalizedStep), 4 / (2 * normalizedStep), -1 / (2 * normalizedStep)],
    };
  }
  if (normalizedValue - 2 * normalizedStep >= minimum) {
    return {
      kind: "three-point-second-order-backward.v1",
      coordinates: [normalizedValue, normalizedValue - normalizedStep, normalizedValue - 2 * normalizedStep],
      weights: [3 / (2 * normalizedStep), -4 / (2 * normalizedStep), 1 / (2 * normalizedStep)],
    };
  }
  throw new RangeError("cap-angle domain is too narrow for the declared sensitivity step.");
}

function eventProtocolFields(protocol, protocolId, probes) {
  return {
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId,
    fieldSpeed: protocol.eventEvaluator.fieldSpeed,
    coupling: protocol.eventEvaluator.coupling,
    history: protocol.eventEvaluator.history,
    returnWindow: {
      start: protocol.completeCycle.start,
      period: protocol.completeCycle.period,
    },
    rootPolicy: protocol.eventEvaluator.rootPolicy,
    tolerances: protocol.eventEvaluator.tolerances,
    geometry: protocol.eventEvaluator.geometry,
    convergence: protocol.eventEvaluator.convergence,
    probes,
  };
}

export function buildB1FixedInternalEventAnalysisProtocol(rawProtocol, {
  resolution = "primary",
} = {}) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (resolution !== "primary" && resolution !== "refined") {
    throw new TypeError("resolution must be primary or refined.");
  }
  const grid = protocol.completeCycle[resolution];
  const times = createPeriodicCycleTimes({
    start: protocol.completeCycle.start,
    period: protocol.completeCycle.period,
    sampleCount: grid.timeSamples,
  });
  const coordinates = protocol.internalProbes.fixedCartesianGrid.axisCoordinates;
  const polarities = protocol.internalProbes.fixedCartesianGrid.probePolarities;
  const probes = coordinates.flatMap((x, xIndex) => coordinates.flatMap((y, yIndex) =>
    coordinates.map((z, zIndex) => ({
      id: `internal-grid-${xIndex}-${yIndex}-${zIndex}`,
      kind: "stationary-coordinate-probe.v1",
      position: { x, y, z },
      observationTimes: times,
      polarities,
    }))));
  return validatePrescribedRecordAnalysisProtocol(eventProtocolFields(
    protocol,
    `${protocol.protocolId}-internal-fixed-${resolution}`,
    probes,
  ));
}

export function buildB1SurfaceEventAnalysisProtocol(rawProtocol, {
  radius,
  resolution = "primary",
} = {}) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (!protocol.enclosingSurfaces.radii.includes(radius)) {
    throw new RangeError(`radius ${radius} is not declared by the complete-cycle protocol.`);
  }
  if (resolution !== "primary" && resolution !== "refined") {
    throw new TypeError("resolution must be primary or refined.");
  }
  const grid = protocol.completeCycle[resolution];
  const times = createPeriodicCycleTimes({
    start: protocol.completeCycle.start,
    period: protocol.completeCycle.period,
    sampleCount: grid.timeSamples,
  });
  const directions = createSphericalProductQuadrature(grid);
  const probes = directions.map((direction) => ({
      id: `surface-r${radius}-${direction.id}`,
      kind: "stationary-coordinate-probe.v1",
      position: {
        x: radius * direction.unitVector.x,
        y: radius * direction.unitVector.y,
        z: radius * direction.unitVector.z,
      },
      observationTimes: times,
      polarities: protocol.enclosingSurfaces.probePolarities,
    }));
  return validatePrescribedRecordAnalysisProtocol(eventProtocolFields(
    protocol,
    `${protocol.protocolId}-surface-r${radius}-${resolution}`,
    probes,
  ));
}
