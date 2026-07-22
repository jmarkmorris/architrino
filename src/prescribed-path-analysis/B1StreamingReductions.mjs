import {
  canonicalJson,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  buildB1SurfaceEventAnalysisProtocol,
  createPeriodicCycleTimes,
  createSphericalProductQuadrature,
  validateB1CompleteCycleProbeProtocol,
} from "./B1CompleteCycleProbeProtocol.mjs";

export const B1_STREAMING_REDUCTION_RESULT_SCHEMA =
  "prescribed-path-analysis/b1-streaming-reduction-result.v1";

const REQUIRED_EXCLUDED_CLAIMS = Object.freeze([
  "stability",
  "energy",
  "retention",
  "physical-realization",
]);

const CHANNELS = Object.freeze([
  "signedWake",
  "unsignedWake",
  "radialProbeAccelerationPositive",
  "radialProbeAccelerationNegative",
  "probeAccelerationNormSquaredPositive",
  "probeAccelerationNormSquaredNegative",
]);

function finite(value, label) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized)) throw new TypeError(`${label} must be finite.`);
  return normalized;
}

function positive(value, label) {
  const normalized = finite(value, label);
  if (!(normalized > 0)) throw new RangeError(`${label} must be positive.`);
  return normalized;
}

function nonnegative(value, label) {
  const normalized = finite(value, label);
  if (normalized < 0) throw new RangeError(`${label} must be nonnegative.`);
  return normalized;
}

function vectorNormSquared(value) {
  return value.x * value.x + value.y * value.y + value.z * value.z;
}

function vectorNorm(value) {
  return Math.sqrt(vectorNormSquared(value));
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function relativeDifference(left, right, floor) {
  return Math.abs(left - right) / Math.max(Math.abs(left), Math.abs(right), floor);
}

function packetHashWithoutResultHash(packet) {
  const copy = { ...packet };
  delete copy.resultHash;
  return sha256Canonical(copy);
}

function factorialRatio(left, right) {
  if (left === right) return 1;
  let result = 1;
  if (left < right) {
    for (let value = left + 1; value <= right; value += 1) result /= value;
  } else {
    for (let value = right + 1; value <= left; value += 1) result *= value;
  }
  return result;
}

function associatedLegendre(degree, order, x) {
  let pmm = 1;
  if (order > 0) {
    const root = Math.sqrt(Math.max(0, 1 - x * x));
    let factor = 1;
    for (let index = 1; index <= order; index += 1) {
      pmm *= -factor * root;
      factor += 2;
    }
  }
  if (degree === order) return pmm;
  let previous = pmm;
  let current = x * (2 * order + 1) * pmm;
  if (degree === order + 1) return current;
  for (let ell = order + 2; ell <= degree; ell += 1) {
    const next = ((2 * ell - 1) * x * current - (ell + order - 1) * previous) /
      (ell - order);
    previous = current;
    current = next;
  }
  return current;
}

export function evaluateRealSphericalHarmonic(degree, order, cosTheta, phi) {
  if (!Number.isSafeInteger(degree) || degree < 0 ||
      !Number.isSafeInteger(order) || Math.abs(order) > degree) {
    throw new RangeError("real spherical-harmonic indices require degree >= 0 and |order| <= degree.");
  }
  const absoluteOrder = Math.abs(order);
  const normalization = Math.sqrt(
    (2 * degree + 1) / (4 * Math.PI) *
      factorialRatio(degree - absoluteOrder, degree + absoluteOrder),
  );
  const legendre = associatedLegendre(degree, absoluteOrder, finite(cosTheta, "cosTheta"));
  if (order === 0) return normalization * legendre;
  const phase = absoluteOrder * finite(phi, "phi");
  return Math.SQRT2 * normalization * legendre *
    (order > 0 ? Math.cos(phase) : Math.sin(phase));
}

function harmonicDescriptors(maximumDegree) {
  const rows = [];
  for (let degree = 0; degree <= maximumDegree; degree += 1) {
    for (let order = -degree; order <= degree; order += 1) {
      rows.push({ degree, order, id: `l${degree}-m${order}` });
    }
  }
  return rows;
}

function complexDft(values, maximumHarmonic) {
  const count = values.length;
  const retained = [];
  let fullBandPower = 0;
  let retainedBandPower = 0;
  for (let harmonic = 0; harmonic < count; harmonic += 1) {
    let real = 0;
    let imaginary = 0;
    for (let index = 0; index < count; index += 1) {
      const phase = -2 * Math.PI * harmonic * index / count;
      real += values[index] * Math.cos(phase) / count;
      imaginary += values[index] * Math.sin(phase) / count;
    }
    const power = real * real + imaginary * imaginary;
    fullBandPower += power;
    if (harmonic <= maximumHarmonic) {
      const oneSidedPower = harmonic === 0 ||
          (count % 2 === 0 && harmonic === count / 2)
        ? power
        : 2 * power;
      retainedBandPower += oneSidedPower;
      retained.push({
        harmonic,
        real,
        imaginary,
        magnitude: Math.sqrt(power),
        phase: Math.atan2(imaginary, real),
        oneSidedPower,
      });
    }
  }
  const timeDomainPower = values.reduce((sum, value) => sum + value * value, 0) / count;
  return {
    retained,
    retainedBandPower,
    fullBandPower,
    timeDomainPower,
    parsevalResidual: fullBandPower - timeDomainPower,
  };
}

function sampleChannels(sample, direction) {
  const positiveAcceleration = sample.probeAccelerations["1"];
  const negativeAcceleration = sample.probeAccelerations["-1"];
  return {
    signedWake: sample.signedWake,
    unsignedWake: sample.unsignedWake,
    radialProbeAccelerationPositive: dot(positiveAcceleration, direction.unitVector),
    radialProbeAccelerationNegative: dot(negativeAcceleration, direction.unitVector),
    probeAccelerationNormSquaredPositive: vectorNormSquared(positiveAcceleration),
    probeAccelerationNormSquaredNegative: vectorNormSquared(negativeAcceleration),
  };
}

function createSurfaceAccumulator(protocol, radius, resolution) {
  const grid = protocol.completeCycle[resolution];
  const directions = createSphericalProductQuadrature(grid);
  const times = createPeriodicCycleTimes({
    start: protocol.completeCycle.start,
    period: protocol.completeCycle.period,
    sampleCount: grid.timeSamples,
  });
  const harmonics = harmonicDescriptors(protocol.angularReduction.maximumDegree);
  const harmonicValues = directions.map((direction) => harmonics.map(({ degree, order }) =>
    evaluateRealSphericalHarmonic(degree, order, direction.cosTheta, direction.phi)));
  const coefficients = Object.fromEntries(CHANNELS.map((channel) => [
    channel,
    harmonics.map(() => Array(times.length).fill(null)),
  ]));
  const exposureSums = {
    "1": { external: 0, raw: 0, peak: null },
    "-1": { external: 0, raw: 0, peak: null },
  };
  const wakeSquaredSums = { signedWake: 0, unsignedWake: 0 };
  const ingestedTimes = new Set();
  const batchDescriptors = [];

  function ingestTimeSamples(timeIndex, samples, descriptor = null) {
    if (!Number.isSafeInteger(timeIndex) || timeIndex < 0 || timeIndex >= times.length) {
      throw new RangeError(`time index ${timeIndex} is outside the ${resolution} grid.`);
    }
    if (ingestedTimes.has(timeIndex)) throw new Error(`time index ${timeIndex} was ingested twice.`);
    if (!Array.isArray(samples) || samples.length !== directions.length) {
      throw new Error(
        `${resolution} radius ${radius} time ${timeIndex} requires ${directions.length} surface samples.`,
      );
    }
    const coefficientSums = Object.fromEntries(CHANNELS.map((channel) => [
      channel,
      Array(harmonics.length).fill(0),
    ]));
    for (let directionIndex = 0; directionIndex < directions.length; directionIndex += 1) {
      const direction = directions[directionIndex];
      const sample = samples[directionIndex];
      const weight = direction.solidAngleWeight;
      const channels = sampleChannels(sample, direction);
      for (const polarity of ["1", "-1"]) {
        const acceleration = sample.probeAccelerations[polarity];
        const netSquared = vectorNormSquared(acceleration);
        const rawMagnitudeSum = positive(
          sample.rawAccelerationMagnitudeSums[polarity],
          `sample raw acceleration-magnitude sum for polarity ${polarity}`,
        );
        exposureSums[polarity].external += weight * netSquared;
        exposureSums[polarity].raw += weight * rawMagnitudeSum * rawMagnitudeSum;
        const accelerationNorm = Math.sqrt(netSquared);
        const peak = exposureSums[polarity].peak;
        if (!peak || accelerationNorm > peak.accelerationNorm) {
          exposureSums[polarity].peak = {
            accelerationNorm,
            eventId: sample.eventId,
            timeIndex,
            directionId: direction.id,
          };
        }
      }
      wakeSquaredSums.signedWake += weight * sample.signedWake * sample.signedWake;
      wakeSquaredSums.unsignedWake += weight * sample.unsignedWake * sample.unsignedWake;
      for (const channel of CHANNELS) {
        for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
          coefficientSums[channel][harmonicIndex] +=
            weight * channels[channel] * harmonicValues[directionIndex][harmonicIndex];
        }
      }
    }
    for (const channel of CHANNELS) {
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        coefficients[channel][harmonicIndex][timeIndex] = coefficientSums[channel][harmonicIndex];
      }
    }
    ingestedTimes.add(timeIndex);
    if (descriptor) batchDescriptors.push(descriptor);
  }

  function finalize() {
    if (ingestedTimes.size !== times.length) {
      throw new Error(
        `${resolution} radius ${radius} is incomplete: received ${ingestedTimes.size}/${times.length} times.`,
      );
    }
    const timeCount = times.length;
    const surfaceFactor = radius * radius / timeCount;
    const exposureFloor = protocol.externalExposureReduction.exposureFloor;
    const exposures = ["1", "-1"].map((polarity) => {
      const lExt = surfaceFactor * exposureSums[polarity].external;
      const lRaw = surfaceFactor * exposureSums[polarity].raw;
      return {
        probePolarity: Number(polarity),
        L_ext: lExt,
        L_raw: lRaw,
        eta_ext: lExt / (lRaw + exposureFloor),
        peakSurfaceAcceleration: exposureSums[polarity].peak,
      };
    });
    const wakeSurfaceNorms = {
      signedWake: Math.sqrt(surfaceFactor * wakeSquaredSums.signedWake),
      unsignedWake: Math.sqrt(surfaceFactor * wakeSquaredSums.unsignedWake),
    };
    const angularPowerRows = [];
    const anisotropyRows = [];
    const spectralCoefficientRows = [];
    const spectralBandRows = [];
    for (const channel of CHANNELS) {
      const degreePowers = [];
      for (let degree = 0; degree <= protocol.angularReduction.maximumDegree; degree += 1) {
        const indices = harmonics.map((row, index) => ({ row, index }))
          .filter(({ row }) => row.degree === degree)
          .map(({ index }) => index);
        const power = indices.reduce((degreeSum, harmonicIndex) =>
          degreeSum + coefficients[channel][harmonicIndex].reduce(
            (timeSum, value) => timeSum + value * value / timeCount,
            0,
          ), 0);
        degreePowers.push(power);
        angularPowerRows.push({ channel, degree, power });
      }
      const monopolePower = degreePowers[0];
      const nonMonopolePower = degreePowers.slice(1).reduce((sum, value) => sum + value, 0);
      const totalPower = monopolePower + nonMonopolePower;
      const anisotropy = {
        channel,
        monopolePower,
        nonMonopolePower,
        retainedPower: totalPower,
        nonMonopolePowerFraction: nonMonopolePower /
          (totalPower + protocol.angularReduction.anisotropy.floor),
      };
      if (channel === "radialProbeAccelerationPositive" ||
          channel === "radialProbeAccelerationNegative") {
        const polarity = channel.endsWith("Positive") ? 1 : -1;
        const rawExposure = exposures.find((row) => row.probePolarity === polarity).L_raw;
        anisotropy.rawNormalizedNonMonopoleAmplitude = Math.sqrt(
          nonMonopolePower /
            (rawExposure / (radius * radius) + protocol.angularReduction.anisotropy.floor),
        );
      }
      anisotropyRows.push(anisotropy);

      const channelBandByDegree = Array(
        protocol.angularReduction.maximumDegree + 1,
      ).fill(0);
      let channelRetainedBandPower = 0;
      let channelFullBandPower = 0;
      let channelTimeDomainPower = 0;
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        const angular = harmonics[harmonicIndex];
        const spectral = complexDft(
          coefficients[channel][harmonicIndex],
          protocol.spectralReduction.maximumHarmonic,
        );
        channelRetainedBandPower += spectral.retainedBandPower;
        channelBandByDegree[angular.degree] += spectral.retainedBandPower;
        channelFullBandPower += spectral.fullBandPower;
        channelTimeDomainPower += spectral.timeDomainPower;
        for (const coefficient of spectral.retained) {
          spectralCoefficientRows.push({
            channel,
            degree: angular.degree,
            order: angular.order,
            ...coefficient,
          });
        }
      }
      spectralBandRows.push({
        channel,
        degree: null,
        retainedBandPower: channelRetainedBandPower,
        fullBandPower: channelFullBandPower,
        timeDomainPower: channelTimeDomainPower,
        parsevalResidual: channelFullBandPower - channelTimeDomainPower,
      });
      channelBandByDegree.forEach((retainedBandPower, degree) => {
        spectralBandRows.push({ channel, degree, retainedBandPower });
      });
    }
    return {
      radius,
      resolution,
      timeSampleCount: timeCount,
      directionCount: directions.length,
      eventCount: timeCount * directions.length,
      batchDescriptors,
      exposures,
      polarityParityDiagnostic: {
        L_extDifference: exposures[0].L_ext - exposures[1].L_ext,
        L_rawDifference: exposures[0].L_raw - exposures[1].L_raw,
      },
      wakeSurfaceNorms,
      angularPowerRows,
      anisotropyRows,
      spectralCoefficientRows,
      spectralBandRows,
    };
  }

  return { directions, times, ingestTimeSamples, finalize };
}

function extractSample(event, polarityValues) {
  if (!event.rootCompletenessCertification?.complete) {
    throw new Error(`event ${event.eventId} lacks a complete causal-root certificate.`);
  }
  const probeAccelerations = {};
  const rawAccelerationMagnitudeSums = {};
  for (const polarity of polarityValues) {
    const response = event.measures?.probeResponses?.find(
      (row) => row.probePolarity === polarity,
    );
    if (!response) throw new Error(`event ${event.eventId} lacks polarity ${polarity}.`);
    const key = String(polarity);
    probeAccelerations[key] = response.acceleration;
    rawAccelerationMagnitudeSums[key] = event.roots.reduce((sum, root) => {
      const contribution = root.probeAccelerationContributions.find(
        (row) => row.probePolarity === polarity,
      );
      if (!contribution) {
        throw new Error(`root ${root.rootId} lacks polarity ${polarity}.`);
      }
      return sum + vectorNorm(contribution.acceleration);
    }, 0);
  }
  return {
    eventId: event.eventId,
    signedWake: finite(event.measures.signedWake, `${event.eventId}.signedWake`),
    unsignedWake: finite(event.measures.unsignedWake, `${event.eventId}.unsignedWake`),
    probeAccelerations,
    rawAccelerationMagnitudeSums,
  };
}

function independentlyCheckEventPacket(packet, expectedProtocol, completeProtocol) {
  if (packet.protocolHash !== sha256Canonical(expectedProtocol) ||
      canonicalJson(packet.protocol) !== canonicalJson(expectedProtocol)) {
    throw new Error("surface event packet protocol hash or body mismatch.");
  }
  if (packet.resultHash !== packetHashWithoutResultHash(packet)) {
    throw new Error(`surface event packet ${packet.resultHash ?? "without-hash"} failed its result hash.`);
  }
  const events = packet.rawLedgers?.causalRoots;
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error("surface event packet lacks its raw causal-root ledger.");
  }
  const convergenceByEvent = new Map(
    (packet.rawLedgers.numericalConvergence ?? []).map((row) => [row.eventId, row]),
  );
  const fieldSpeed = completeProtocol.eventEvaluator.fieldSpeed;
  const transversalityFloor = completeProtocol.eventEvaluator.tolerances.rootTransversalityFloor;
  const convergenceTolerance = completeProtocol.eventEvaluator.tolerances.convergenceAbsolute;
  const sourceCount = completeProtocol.applicability.sourceCount;
  for (const event of events) {
    if (!event.rootCompletenessCertification?.complete ||
        event.rootCount + event.noRootCount !== sourceCount) {
      throw new Error(`event ${event.eventId} failed independent root-completeness inspection.`);
    }
    for (const row of [...event.roots, ...event.noRootTransmitters]) {
      if (!(row.certifiedSpeedBound < fieldSpeed)) {
        throw new Error(`event ${event.eventId} failed the source-speed gate.`);
      }
    }
    for (const root of event.roots) {
      if (!(root.rootTransversalityMargin >= transversalityFloor)) {
        throw new Error(`event ${event.eventId} failed the root-transversality gate.`);
      }
    }
    const convergence = convergenceByEvent.get(event.eventId);
    const convergenceChanges = convergence && [
      convergence.maximumEmissionTimeChange,
      convergence.signedWakeChange,
      convergence.unsignedWakeChange,
      convergence.signedCancellationRatioChange,
      convergence.maximumProbeAccelerationComponentChange,
    ].map((value, index) => finite(value, `${event.eventId}.convergenceChange[${index}]`));
    if (!convergence?.rootIdentityMatch ||
        Math.max(...convergenceChanges) > convergenceTolerance) {
      throw new Error(`event ${event.eventId} failed the event-convergence gate.`);
    }
  }
  const separationFloor = completeProtocol.eventEvaluator.tolerances.minimumSeparationFloor;
  for (const ledgerName of ["minimumSeparation", "refinedMinimumSeparation"]) {
    const ledger = packet.rawLedgers[ledgerName];
    if (!Array.isArray(ledger) || ledger.length === 0 ||
        ledger.some((row) => !(row.minimumSeparation >= separationFloor))) {
      throw new Error(`surface event packet failed the ${ledgerName} gate.`);
    }
  }
  return events;
}

function batchProtocol(fullEventProtocol, timeIndex) {
  return {
    ...fullEventProtocol,
    protocolId: `${fullEventProtocol.protocolId}-time-${String(timeIndex).padStart(3, "0")}`,
    probes: fullEventProtocol.probes.map((probe) => ({
      ...probe,
      observationTimes: [probe.observationTimes[timeIndex]],
    })),
  };
}

function independentlyCheckB1SourceApplicability(sourceRecord, protocol) {
  if (sourceRecord?.taxonomy?.familyId !== "B" || sourceRecord.taxonomy?.memberId !== "B1") {
    throw new Error("complete-cycle reduction requires an exact Family B member B1 source record.");
  }
  if (!Array.isArray(sourceRecord.sources) ||
      sourceRecord.sources.length !== protocol.applicability.sourceCount) {
    throw new Error("exact B1 source count does not match the complete-cycle protocol.");
  }
  const period = protocol.completeCycle.period;
  const envelope = protocol.applicability.maximumSourceEnvelopeRadius;
  const centerSum = { x: 0, y: 0, z: 0 };
  for (const source of sourceRecord.sources) {
    const trajectory = source.trajectory;
    if (trajectory?.kind !== "moving-circular.v1") {
      throw new Error(`B1 source ${source.id} is not an exact moving-circular path.`);
    }
    const center = trajectory.centerAtEpoch;
    const radiusU = trajectory.radiusU;
    const radiusV = trajectory.radiusV;
    const centerVelocity = trajectory.centerVelocity;
    const centerNorm = vectorNorm(center);
    const radiusUNorm = vectorNorm(radiusU);
    const radiusVNorm = vectorNorm(radiusV);
    const geometryScale = Math.max(1, centerNorm, radiusUNorm, radiusVNorm);
    const orthogonalityTolerance = 1e-12 * geometryScale * geometryScale;
    if (vectorNorm(centerVelocity) > 1e-12 ||
        Math.abs(finite(trajectory.angularAcceleration, `${source.id}.angularAcceleration`)) > 1e-12 ||
        Math.abs(radiusUNorm - radiusVNorm) > 1e-12 * geometryScale ||
        Math.abs(dot(radiusU, radiusV)) > orthogonalityTolerance ||
        Math.abs(dot(center, radiusU)) > orthogonalityTolerance ||
        Math.abs(dot(center, radiusV)) > orthogonalityTolerance) {
      throw new Error(`B1 source ${source.id} violates the stationary orthogonal-circle applicability gate.`);
    }
    const maximumRadius = Math.hypot(centerNorm, radiusUNorm);
    if (maximumRadius > envelope + 1e-12) {
      throw new Error(`B1 source ${source.id} exceeds the declared source envelope.`);
    }
    const completedTurns = finite(
      trajectory.angularVelocity,
      `${source.id}.angularVelocity`,
    ) * period / (2 * Math.PI);
    if (Math.abs(completedTurns - Math.round(completedTurns)) > 1e-12) {
      throw new Error(`B1 source ${source.id} does not close over the declared return period.`);
    }
    centerSum.x += center.x;
    centerSum.y += center.y;
    centerSum.z += center.z;
  }
  const sourceCount = sourceRecord.sources.length;
  const meanCenter = {
    x: centerSum.x / sourceCount,
    y: centerSum.y / sourceCount,
    z: centerSum.z / sourceCount,
  };
  if (vectorNorm(meanCenter) > 1e-12) {
    throw new Error("B1 source center at epoch differs from the protocol center.");
  }
}

function radialMeasureRows(surfaceRows, floor, relativeFloor = 0) {
  const byMeasure = new Map();
  function add(measureId, radius, value, referenceScale = value) {
    if (!(value > Math.max(floor, Math.abs(referenceScale) * relativeFloor))) return;
    const rows = byMeasure.get(measureId) ?? [];
    rows.push({ radius, value });
    byMeasure.set(measureId, rows);
  }
  for (const surface of surfaceRows) {
    surface.exposures.forEach((row) => {
      add(`L_ext/probe-polarity-${row.probePolarity}`, surface.radius, row.L_ext);
      add(`L_raw/probe-polarity-${row.probePolarity}`, surface.radius, row.L_raw);
    });
    add("signed-wake-surface-norm", surface.radius, surface.wakeSurfaceNorms.signedWake);
    add("unsigned-wake-surface-norm", surface.radius, surface.wakeSurfaceNorms.unsignedWake);
    const angularTotals = new Map(surface.anisotropyRows.map(
      (row) => [row.channel, row.retainedPower],
    ));
    surface.angularPowerRows.forEach((row) => add(
      `angular-power/${row.channel}/degree-${row.degree}`,
      surface.radius,
      row.power,
      angularTotals.get(row.channel),
    ));
    surface.spectralBandRows.filter((row) => row.degree === null).forEach((row) => add(
      `spectral-band-power/${row.channel}`,
      surface.radius,
      row.retainedBandPower,
    ));
  }
  return [...byMeasure.entries()].map(([measureId, values]) => {
    const sorted = [...values].sort((left, right) => left.radius - right.radius);
    if (sorted.length < 2) return { measureId, values: sorted, status: "insufficient-positive-radii" };
    const pairwise = sorted.slice(1).map((right, index) => {
      const left = sorted[index];
      return {
        radiusA: left.radius,
        radiusB: right.radius,
        exponent: -Math.log(right.value / left.value) / Math.log(right.radius / left.radius),
      };
    });
    const x = sorted.map((row) => Math.log(row.radius));
    const y = sorted.map((row) => Math.log(row.value));
    const meanX = x.reduce((sum, value) => sum + value, 0) / x.length;
    const meanY = y.reduce((sum, value) => sum + value, 0) / y.length;
    const denominator = x.reduce((sum, value) => sum + (value - meanX) ** 2, 0);
    const slope = x.reduce(
      (sum, value, index) => sum + (value - meanX) * (y[index] - meanY),
      0,
    ) / denominator;
    const intercept = meanY - slope * meanX;
    const residual = Math.sqrt(y.reduce(
      (sum, value, index) => sum + (value - (intercept + slope * x[index])) ** 2,
      0,
    ) / y.length);
    return {
      measureId,
      values: sorted,
      pairwise,
      global: { exponent: -slope, intercept, logSpaceRmsResidual: residual },
      status: "ok",
    };
  });
}

function compareReductions(primarySurfaces, refinedSurfaces, primaryRadial, refinedRadial, protocol) {
  const floor = protocol.externalExposureReduction.exposureFloor;
  const exposureEntries = [];
  const anisotropyEntries = [];
  const spectralEntries = [];
  for (const primary of primarySurfaces) {
    const refined = refinedSurfaces.find((row) => row.radius === primary.radius);
    for (const primaryExposure of primary.exposures) {
      const refinedExposure = refined.exposures.find(
        (row) => row.probePolarity === primaryExposure.probePolarity,
      );
      for (const measure of ["L_ext", "L_raw", "eta_ext"]) {
        exposureEntries.push({
          radius: primary.radius,
          probePolarity: primaryExposure.probePolarity,
          measure,
          primary: primaryExposure[measure],
          refined: refinedExposure[measure],
          relativeChange: relativeDifference(
            primaryExposure[measure],
            refinedExposure[measure],
            floor,
          ),
        });
      }
    }
    for (const primaryAnisotropy of primary.anisotropyRows) {
      const refinedAnisotropy = refined.anisotropyRows.find(
        (row) => row.channel === primaryAnisotropy.channel,
      );
      anisotropyEntries.push({
        radius: primary.radius,
        channel: primaryAnisotropy.channel,
        measure: "nonMonopolePowerFraction",
        absoluteChange: Math.abs(
          primaryAnisotropy.nonMonopolePowerFraction -
            refinedAnisotropy.nonMonopolePowerFraction,
        ),
      });
      if (primaryAnisotropy.rawNormalizedNonMonopoleAmplitude !== undefined) {
        anisotropyEntries.push({
          radius: primary.radius,
          channel: primaryAnisotropy.channel,
          measure: "rawNormalizedNonMonopoleAmplitude",
          absoluteChange: Math.abs(
            primaryAnisotropy.rawNormalizedNonMonopoleAmplitude -
              refinedAnisotropy.rawNormalizedNonMonopoleAmplitude,
          ),
        });
      }
    }
    for (const primarySpectral of primary.spectralBandRows.filter((row) => row.degree === null)) {
      const refinedSpectral = refined.spectralBandRows.find(
        (row) => row.degree === null && row.channel === primarySpectral.channel,
      );
      spectralEntries.push({
        radius: primary.radius,
        channel: primarySpectral.channel,
        primary: primarySpectral.retainedBandPower,
        refined: refinedSpectral.retainedBandPower,
        relativeChange: relativeDifference(
          primarySpectral.retainedBandPower,
          refinedSpectral.retainedBandPower,
          floor,
        ),
      });
    }
  }
  const refinedRadialById = new Map(refinedRadial.map((row) => [row.measureId, row]));
  const radialEntries = [];
  for (const primary of primaryRadial.filter((row) => row.status === "ok")) {
    const refined = refinedRadialById.get(primary.measureId);
    if (!refined || refined.status !== "ok" ||
        primary.pairwise.length !== refined.pairwise.length) {
      radialEntries.push({ measureId: primary.measureId, identityMatch: false });
      continue;
    }
    primary.pairwise.forEach((row, index) => radialEntries.push({
      measureId: primary.measureId,
      kind: "pairwise",
      radiusA: row.radiusA,
      radiusB: row.radiusB,
      primary: row.exponent,
      refined: refined.pairwise[index].exponent,
      absoluteChange: Math.abs(row.exponent - refined.pairwise[index].exponent),
      identityMatch: row.radiusA === refined.pairwise[index].radiusA &&
        row.radiusB === refined.pairwise[index].radiusB,
    }));
    radialEntries.push({
      measureId: primary.measureId,
      kind: "global",
      primary: primary.global.exponent,
      refined: refined.global.exponent,
      absoluteChange: Math.abs(primary.global.exponent - refined.global.exponent),
      identityMatch: true,
    });
  }
  const thresholds = protocol.failClosedGates.quadratureConvergence;
  const radialIdentityMatch = radialEntries.every((row) => row.identityMatch);
  const gates = {
    exposure: {
      threshold: thresholds.exposureRelative,
      maximumChange: Math.max(...exposureEntries.map((row) => row.relativeChange), 0),
      entries: exposureEntries,
    },
    anisotropy: {
      threshold: thresholds.anisotropyAbsolute,
      maximumChange: Math.max(...anisotropyEntries.map((row) => row.absoluteChange), 0),
      entries: anisotropyEntries,
    },
    retainedSpectralPower: {
      threshold: thresholds.retainedSpectralPowerRelative,
      maximumChange: Math.max(...spectralEntries.map((row) => row.relativeChange), 0),
      entries: spectralEntries,
    },
    radialExponent: {
      threshold: thresholds.radialExponentAbsolute,
      identityMatch: radialIdentityMatch,
      maximumChange: Math.max(
        ...radialEntries.map((row) => row.absoluteChange ?? 0),
        0,
      ),
      entries: radialEntries,
    },
  };
  for (const gate of Object.values(gates)) {
    gate.passed = gate.maximumChange <= gate.threshold && gate.identityMatch !== false;
  }
  return { gates, passed: Object.values(gates).every((gate) => gate.passed) };
}

export function reduceB1SurfaceSampleGrid({
  completeCycleProtocol: rawProtocol,
  radius,
  resolution = "primary",
  sampleAt,
}) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (!protocol.enclosingSurfaces.radii.includes(radius)) {
    throw new RangeError(`radius ${radius} is not declared by the B1 protocol.`);
  }
  if (resolution !== "primary" && resolution !== "refined") {
    throw new TypeError("resolution must be primary or refined.");
  }
  if (typeof sampleAt !== "function") throw new TypeError("sampleAt must be a function.");
  const accumulator = createSurfaceAccumulator(protocol, radius, resolution);
  accumulator.times.forEach((time, timeIndex) => {
    const samples = accumulator.directions.map((direction, directionIndex) => sampleAt({
      radius,
      resolution,
      time,
      timeIndex,
      direction,
      directionIndex,
    }));
    accumulator.ingestTimeSamples(timeIndex, samples);
  });
  return accumulator.finalize();
}

export function computeB1RadialScalingRows(surfaceRows, floor = 1e-30, relativeFloor = 0) {
  return radialMeasureRows(
    surfaceRows,
    positive(floor, "radial scaling floor"),
    nonnegative(relativeFloor, "radial scaling relative floor"),
  );
}

export function finalizeB1StreamingReductionPacket(packetWithoutHash) {
  return { ...packetWithoutHash, resultHash: sha256Canonical(packetWithoutHash) };
}

export function evaluateB1StreamingSurfaceReductions({
  sourceRecord,
  completeCycleProtocol: rawProtocol,
  evaluate = evaluatePrescribedRecordAnalysis,
  onSurfacePacket = null,
} = {}) {
  const protocol = validateB1CompleteCycleProbeProtocol(rawProtocol);
  if (typeof evaluate !== "function") throw new TypeError("evaluate must be a function.");
  if (onSurfacePacket !== null && typeof onSurfacePacket !== "function") {
    throw new TypeError("onSurfacePacket must be a function when supplied.");
  }
  independentlyCheckB1SourceApplicability(sourceRecord, protocol);
  const completeCycleProtocolHash = sha256Canonical(protocol);
  const quadratureRules = {};
  const surfaceReductions = { primary: [], refined: [] };
  const surfaceEvaluations = [];
  let source = null;

  for (const resolution of ["primary", "refined"]) {
    const resolutionGrid = protocol.completeCycle[resolution];
    const directions = createSphericalProductQuadrature(resolutionGrid);
    quadratureRules[resolution] = {
      rule: protocol.enclosingSurfaces.angularRule,
      polarOrder: resolutionGrid.polarOrder,
      azimuthCount: resolutionGrid.azimuthCount,
      directions,
      ruleHash: sha256Canonical(directions),
    };
    for (const radius of protocol.enclosingSurfaces.radii) {
      const fullProtocol = buildB1SurfaceEventAnalysisProtocol(protocol, { radius, resolution });
      const accumulator = createSurfaceAccumulator(protocol, radius, resolution);
      for (let timeIndex = 0; timeIndex < resolutionGrid.timeSamples; timeIndex += 1) {
        const eventProtocol = batchProtocol(fullProtocol, timeIndex);
        const eventPacket = evaluate({ sourceRecord, protocol: eventProtocol });
        const events = independentlyCheckEventPacket(eventPacket, eventProtocol, protocol);
        if (source === null) source = eventPacket.source;
        else if (source.sourceHash !== eventPacket.source.sourceHash) {
          throw new Error("surface batch source hash changed during streaming reduction.");
        }
        const descriptor = {
          radius,
          resolution,
          timeIndex,
          observationTime: accumulator.times[timeIndex],
          sourceHash: eventPacket.source.sourceHash,
          eventProtocolHash: eventPacket.protocolHash,
          eventResultHash: eventPacket.resultHash,
          rawCausalRootLedgerHash: sha256Canonical(events),
          rawCausalRootEventCount: events.length,
          rawCausalRootCount: events.reduce((sum, event) => sum + event.rootCount, 0),
          numericalConvergenceLedgerHash: sha256Canonical(
            eventPacket.rawLedgers.numericalConvergence,
          ),
        };
        if (onSurfacePacket) {
          descriptor.artifact = onSurfacePacket(eventPacket, { ...descriptor });
        }
        const eventByProbe = new Map(events.map((event) => [event.probeId, event]));
        const samples = fullProtocol.probes.map((probe) => {
          const event = eventByProbe.get(probe.id);
          if (!event || event.observationTime !== accumulator.times[timeIndex]) {
            throw new Error(`surface batch is missing ${probe.id} at time index ${timeIndex}.`);
          }
          return extractSample(event, protocol.enclosingSurfaces.probePolarities);
        });
        accumulator.ingestTimeSamples(timeIndex, samples, descriptor);
        surfaceEvaluations.push(descriptor);
      }
      surfaceReductions[resolution].push(accumulator.finalize());
    }
  }

  const radialScaling = {
    primary: radialMeasureRows(
      surfaceReductions.primary,
      protocol.externalExposureReduction.exposureFloor,
      protocol.radialScalingReduction.positiveMeasureRelativeFloor,
    ),
    refined: radialMeasureRows(
      surfaceReductions.refined,
      protocol.externalExposureReduction.exposureFloor,
      protocol.radialScalingReduction.positiveMeasureRelativeFloor,
    ),
  };
  const quadratureConvergence = compareReductions(
    surfaceReductions.primary,
    surfaceReductions.refined,
    radialScaling.primary,
    radialScaling.refined,
    protocol,
  );
  const packetWithoutHash = {
    schema: B1_STREAMING_REDUCTION_RESULT_SCHEMA,
    reducer: {
      id: "b1-complete-cycle-streaming-surface-reducer",
      version: "v1",
      streamingOrder: "resolution-then-radius-then-time.v1",
      eventEvaluator: "evaluatePrescribedRecordAnalysis",
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    claimGrade: "derived",
    claimScope:
      "conditional complete-cycle reductions of the exact prescribed B1 source record",
    excludedClaims: [...REQUIRED_EXCLUDED_CLAIMS],
    source,
    completeCycleProtocolHash,
    completeCycleProtocol: protocol,
    quadratureRules,
    surfaceEvaluations,
    diagnosticReductions: {
      surface: surfaceReductions,
      radialScaling,
    },
    convergenceComparisons: { quadrature: quadratureConvergence },
    reducedMeasures: quadratureConvergence.passed
      ? {
          surface: surfaceReductions.primary,
          radialScaling: radialScaling.primary,
        }
      : null,
    status: {
      code: quadratureConvergence.passed ? "ok" : "quadrature_convergence_failed",
      severity: quadratureConvergence.passed ? "ok" : "error",
      acceptedReducedMeasures: quadratureConvergence.passed,
    },
    falsifier:
      "Reject the reduced rows if any independently recomputed source-speed, root-completeness, separation, transversality, event-convergence, quadrature-convergence, symmetry, closed-form, hash, or deterministic-repeat check fails.",
  };
  return finalizeB1StreamingReductionPacket(packetWithoutHash);
}
