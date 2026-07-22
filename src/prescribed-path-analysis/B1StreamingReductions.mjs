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
  const outOfBandPower = Math.max(0, fullBandPower - retainedBandPower);
  return {
    retained,
    retainedBandPower,
    fullBandPower,
    timeDomainPower,
    parsevalResidual: fullBandPower - timeDomainPower,
    outOfBandPower,
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

function createSurfaceAccumulator(protocol, radius, resolution, {
  sourceAbsolutePolaritySum = null,
  sourceRootIdentities = [],
} = {}) {
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
  const wakeFluxSums = { signed: 0, raw: 0, residual: 0 };
  const sourceRootFluxSeries = new Map();
  for (const identity of sourceRootIdentities) {
    if (typeof identity?.transmitterId !== "string" || !identity.transmitterId ||
        !Number.isSafeInteger(identity.rootOrdinal) || identity.rootOrdinal < 0) {
      throw new TypeError("source-root identity declarations must bind transmitter and ordinal.");
    }
    const sourceRootId = `${identity.transmitterId}:root-${identity.rootOrdinal}`;
    if (sourceRootFluxSeries.has(sourceRootId)) {
      throw new Error(`source-root identity ${sourceRootId} was declared twice.`);
    }
    sourceRootFluxSeries.set(sourceRootId, {
      sourceRootId,
      transmitterId: identity.transmitterId,
      rootOrdinal: identity.rootOrdinal,
      coefficientSeries: harmonics.map(() => Array(times.length).fill(0)),
    });
  }
  const normalizedSourceAbsolutePolaritySum = sourceAbsolutePolaritySum === null
    ? null
    : positive(sourceAbsolutePolaritySum, "source absolute-polarity sum");
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
    const sourceRootCoefficientSums = new Map();
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
      const signedNormalFluxDensity = finite(
        sample.normalWakeFluxDensity?.signed,
        `${sample.eventId}.normalWakeFluxDensity.signed`,
      );
      const rawNormalFluxDensity = nonnegative(
        sample.normalWakeFluxDensity?.raw,
        `${sample.eventId}.normalWakeFluxDensity.raw`,
      );
      if (Math.abs(signedNormalFluxDensity) > rawNormalFluxDensity + 1e-12) {
        throw new Error(
          `${sample.eventId} violates the source-tagged wake-flux triangle bound.`,
        );
      }
      const sourceRootContributions = sample.normalWakeFluxDensity?.sourceRootContributions;
      if (!Array.isArray(sourceRootContributions)) {
        throw new Error(`${sample.eventId} lacks source-root-tagged normal wake-flux contributions.`);
      }
      const sampleSourceRootIds = new Set();
      let taggedSignedNormalFluxDensity = 0;
      let taggedRawNormalFluxDensity = 0;
      for (const contribution of sourceRootContributions) {
        const sourceRootId = typeof contribution?.sourceRootId === "string"
          ? contribution.sourceRootId
          : "";
        const transmitterId = typeof contribution?.transmitterId === "string"
          ? contribution.transmitterId
          : "";
        const rootOrdinal = contribution?.rootOrdinal;
        if (!sourceRootId || !transmitterId ||
            !Number.isSafeInteger(rootOrdinal) || rootOrdinal < 0) {
          throw new Error(`${sample.eventId} has an invalid source-root wake-flux tag.`);
        }
        if (sourceRootId !== `${transmitterId}:root-${rootOrdinal}`) {
          throw new Error(`${sample.eventId} has a noncanonical source-root wake-flux tag.`);
        }
        if (sampleSourceRootIds.has(sourceRootId)) {
          throw new Error(`${sample.eventId} repeats source-root tag ${sourceRootId}.`);
        }
        sampleSourceRootIds.add(sourceRootId);
        const signed = finite(
          contribution.signed,
          `${sample.eventId}.${sourceRootId}.signedNormalWakeFluxDensity`,
        );
        taggedSignedNormalFluxDensity += signed;
        taggedRawNormalFluxDensity += Math.abs(signed);
        const existing = sourceRootFluxSeries.get(sourceRootId);
        if (existing && (existing.transmitterId !== transmitterId ||
            existing.rootOrdinal !== rootOrdinal)) {
          throw new Error(`source-root tag ${sourceRootId} changed identity.`);
        }
        if (!existing) {
          sourceRootFluxSeries.set(sourceRootId, {
            sourceRootId,
            transmitterId,
            rootOrdinal,
            coefficientSeries: harmonics.map(() => Array(times.length).fill(0)),
          });
        }
        const coefficientRow = sourceRootCoefficientSums.get(sourceRootId) ??
          Array(harmonics.length).fill(0);
        for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
          coefficientRow[harmonicIndex] +=
            weight * signed * harmonicValues[directionIndex][harmonicIndex];
        }
        sourceRootCoefficientSums.set(sourceRootId, coefficientRow);
      }
      const taggedTolerance = 1e-12 * Math.max(1, rawNormalFluxDensity);
      if (Math.abs(taggedSignedNormalFluxDensity - signedNormalFluxDensity) > taggedTolerance ||
          Math.abs(taggedRawNormalFluxDensity - rawNormalFluxDensity) > taggedTolerance) {
        throw new Error(`${sample.eventId} source-root wake-flux rows do not reconstruct the sample.`);
      }
      wakeFluxSums.signed += weight * signedNormalFluxDensity;
      wakeFluxSums.raw += weight * rawNormalFluxDensity;
      wakeFluxSums.residual += weight * Math.abs(signedNormalFluxDensity);
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
    for (const sourceRoot of sourceRootFluxSeries.values()) {
      const sums = sourceRootCoefficientSums.get(sourceRoot.sourceRootId) ??
        Array(harmonics.length).fill(0);
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        sourceRoot.coefficientSeries[harmonicIndex][timeIndex] =
          radius * radius * sums[harmonicIndex];
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
    const cycleSurfaceFactor = radius * radius * protocol.completeCycle.period / timeCount;
    const signedCycleIntegral = cycleSurfaceFactor * wakeFluxSums.signed;
    const rawCycleIntegral = cycleSurfaceFactor * wakeFluxSums.raw;
    const residualCycleIntegral = cycleSurfaceFactor * wakeFluxSums.residual;
    const fluxFloor = protocol.causalWakeFluxReduction.fluxFloor;
    if (!(rawCycleIntegral > fluxFloor)) {
      throw new Error(
        `${resolution} radius ${radius} has no admissible raw cycle-integrated wake flux.`,
      );
    }
    const etaWakeFlux = residualCycleIntegral / rawCycleIntegral;
    if (etaWakeFlux < -1e-12 || etaWakeFlux > 1 + 1e-12) {
      throw new Error(`${resolution} radius ${radius} wake-flux ratio left [0,1].`);
    }
    const expectedRawCycleIntegral = normalizedSourceAbsolutePolaritySum === null
      ? null
      : protocol.completeCycle.period * normalizedSourceAbsolutePolaritySum;
    const rawEmissionReference = expectedRawCycleIntegral === null
      ? null
      : {
          expectedCycleIntegral: expectedRawCycleIntegral,
          absoluteResidual: rawCycleIntegral - expectedRawCycleIntegral,
          relativeResidual: Math.abs(rawCycleIntegral - expectedRawCycleIntegral) /
            Math.max(Math.abs(expectedRawCycleIntegral), fluxFloor),
          threshold:
            protocol.failClosedGates.causalWakeFlux.rawEmissionReferenceRelative,
        };
    if (rawEmissionReference) {
      rawEmissionReference.passed =
        rawEmissionReference.relativeResidual <= rawEmissionReference.threshold;
    }
    const wakeFlux = {
      integrationWindow: {
        start: protocol.completeCycle.start,
        period: protocol.completeCycle.period,
        endpointConvention: protocol.completeCycle.endpointConvention,
      },
      signedCycleIntegral,
      rawCycleIntegral,
      residualCycleIntegral,
      etaWakeFlux,
      rawEmissionReference,
      claimBoundary:
        "cycle-integrated causal-wake measure; not energy, potential, work, or leakage",
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
    if (sourceRootFluxSeries.size === 0) {
      throw new Error(`${resolution} radius ${radius} lacks source-root wake-flux series.`);
    }
    const frequencyConfig = protocol.causalWakeFluxReduction.frequencyResolved;
    const coefficientFloor = frequencyConfig.coefficientFloor;
    const sourceTaggedWakeFluxSpectralRows = [];
    const aggregateCoefficientRows = new Map();
    const sourceTaggedBandTotals = {
      retainedBandPower: 0,
      fullBandPower: 0,
      timeDomainPower: 0,
      parsevalResidual: 0,
      outOfBandPower: 0,
    };
    const orderedSourceRoots = [...sourceRootFluxSeries.values()].sort((left, right) =>
      left.sourceRootId.localeCompare(right.sourceRootId));
    for (const sourceRoot of orderedSourceRoots) {
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        const angular = harmonics[harmonicIndex];
        const spectral = complexDft(
          sourceRoot.coefficientSeries[harmonicIndex],
          protocol.spectralReduction.maximumHarmonic,
        );
        sourceTaggedBandTotals.retainedBandPower += spectral.retainedBandPower;
        sourceTaggedBandTotals.fullBandPower += spectral.fullBandPower;
        sourceTaggedBandTotals.timeDomainPower += spectral.timeDomainPower;
        sourceTaggedBandTotals.parsevalResidual += spectral.parsevalResidual;
        sourceTaggedBandTotals.outOfBandPower += spectral.outOfBandPower;
        for (const coefficient of spectral.retained) {
          const row = {
            sourceRootId: sourceRoot.sourceRootId,
            transmitterId: sourceRoot.transmitterId,
            rootOrdinal: sourceRoot.rootOrdinal,
            degree: angular.degree,
            order: angular.order,
            harmonic: coefficient.harmonic,
            frequencyCyclesPerAbsoluteTime:
              coefficient.harmonic / protocol.completeCycle.period,
            angularFrequency:
              2 * Math.PI * coefficient.harmonic / protocol.completeCycle.period,
            real: coefficient.real,
            imaginary: coefficient.imaginary,
            magnitude: coefficient.magnitude,
            phase: coefficient.phase,
            oneSidedPower: coefficient.oneSidedPower,
          };
          sourceTaggedWakeFluxSpectralRows.push(row);
          const key = `${angular.id}:n${coefficient.harmonic}`;
          const aggregate = aggregateCoefficientRows.get(key) ?? {
            degree: angular.degree,
            order: angular.order,
            harmonic: coefficient.harmonic,
            frequencyCyclesPerAbsoluteTime: row.frequencyCyclesPerAbsoluteTime,
            angularFrequency: row.angularFrequency,
            netReal: 0,
            netImaginary: 0,
            rawMagnitude: 0,
            sourceRootCount: 0,
          };
          aggregate.netReal += coefficient.real;
          aggregate.netImaginary += coefficient.imaginary;
          aggregate.rawMagnitude += coefficient.magnitude;
          aggregate.sourceRootCount += 1;
          aggregateCoefficientRows.set(key, aggregate);
        }
      }
    }
    const sortedAggregateCoefficientRows = [...aggregateCoefficientRows.values()]
      .sort((left, right) => left.harmonic - right.harmonic ||
        left.degree - right.degree || left.order - right.order);
    const maximumRawCoefficientMagnitude = Math.max(
      ...sortedAggregateCoefficientRows.map((row) => row.rawMagnitude),
      coefficientFloor,
    );
    const effectiveCoefficientFloor = Math.max(
      coefficientFloor,
      maximumRawCoefficientMagnitude * frequencyConfig.relativeComparisonFloor,
    );
    const wakeFluxSpectralCancellationRows = sortedAggregateCoefficientRows.map((row) => {
        const netMagnitude = Math.hypot(row.netReal, row.netImaginary);
        const admissible = row.rawMagnitude > effectiveCoefficientFloor;
        const etaWakeFlux = admissible ? netMagnitude / row.rawMagnitude : null;
        if (netMagnitude > row.rawMagnitude + 1e-12 * Math.max(1, row.rawMagnitude) ||
            (etaWakeFlux !== null && (etaWakeFlux < -1e-12 || etaWakeFlux > 1 + 1e-12))) {
          throw new Error(
            `${resolution} radius ${radius} frequency-resolved wake-flux ratio left [0,1].`,
          );
        }
        return {
          ...row,
          netMagnitude,
          etaWakeFlux,
          status: admissible ? "admissible" : "below-coefficient-floor",
        };
      });
    const harmonicCancellation = new Map();
    for (const row of wakeFluxSpectralCancellationRows) {
      const aggregate = harmonicCancellation.get(row.harmonic) ?? {
        harmonic: row.harmonic,
        frequencyCyclesPerAbsoluteTime: row.frequencyCyclesPerAbsoluteTime,
        angularFrequency: row.angularFrequency,
        netModeNormSquared: 0,
        rawModeNormSquared: 0,
        admissibleAngularModeCount: 0,
      };
      aggregate.netModeNormSquared += row.netMagnitude * row.netMagnitude;
      aggregate.rawModeNormSquared += row.rawMagnitude * row.rawMagnitude;
      if (row.status === "admissible") aggregate.admissibleAngularModeCount += 1;
      harmonicCancellation.set(row.harmonic, aggregate);
    }
    const wakeFluxHarmonicCancellationRows = [...harmonicCancellation.values()]
      .sort((left, right) => left.harmonic - right.harmonic)
      .map((row) => {
        const netModeNorm = Math.sqrt(row.netModeNormSquared);
        const rawModeNorm = Math.sqrt(row.rawModeNormSquared);
        return {
          harmonic: row.harmonic,
          frequencyCyclesPerAbsoluteTime: row.frequencyCyclesPerAbsoluteTime,
          angularFrequency: row.angularFrequency,
          netModeNorm,
          rawModeNorm,
          etaWakeFlux: rawModeNorm > effectiveCoefficientFloor ? netModeNorm / rawModeNorm : null,
          admissibleAngularModeCount: row.admissibleAngularModeCount,
          status: rawModeNorm > effectiveCoefficientFloor
            ? "admissible"
            : "below-coefficient-floor",
        };
      });
    const sourceTaggedWakeFluxBandCoverage = {
      sourceRootCount: orderedSourceRoots.length,
      maximumDegree: protocol.angularReduction.maximumDegree,
      maximumHarmonic: protocol.spectralReduction.maximumHarmonic,
      absoluteCoefficientFloor: coefficientFloor,
      relativeCoefficientFloor: frequencyConfig.relativeComparisonFloor,
      maximumRawCoefficientMagnitude,
      effectiveCoefficientFloor,
      ...sourceTaggedBandTotals,
      parsevalRelativeResidual: Math.abs(sourceTaggedBandTotals.parsevalResidual) /
        Math.max(sourceTaggedBandTotals.timeDomainPower, coefficientFloor),
      outOfBandRmsFraction: Math.sqrt(
        sourceTaggedBandTotals.outOfBandPower /
          Math.max(sourceTaggedBandTotals.timeDomainPower, coefficientFloor),
      ),
      threshold:
        protocol.failClosedGates.causalWakeFlux.frequencyResolvedOutOfBandRmsFraction,
      claimBoundary: frequencyConfig.claimBoundary,
    };
    sourceTaggedWakeFluxBandCoverage.passed =
      sourceTaggedWakeFluxBandCoverage.outOfBandRmsFraction <=
        sourceTaggedWakeFluxBandCoverage.threshold;
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
      wakeFlux,
      angularPowerRows,
      anisotropyRows,
      spectralCoefficientRows,
      spectralBandRows,
      sourceTaggedWakeFluxSpectralRows,
      wakeFluxSpectralCancellationRows,
      wakeFluxHarmonicCancellationRows,
      sourceTaggedWakeFluxBandCoverage,
    };
  }

  return { directions, times, ingestTimeSamples, finalize };
}

function extractSample(event, polarityValues, surfaceNormal, fieldSpeed) {
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
  let signedNormalFluxDensity = 0;
  let rawNormalFluxDensity = 0;
  const sourceRootContributions = [];
  for (const root of event.roots) {
    const normalProjection = dot(root.direction, surfaceNormal);
    const signedContribution = fieldSpeed * root.signedWakeContribution * normalProjection;
    signedNormalFluxDensity += signedContribution;
    rawNormalFluxDensity += Math.abs(signedContribution);
    sourceRootContributions.push({
      sourceRootId: `${root.transmitterId}:root-${root.rootOrdinal}`,
      transmitterId: root.transmitterId,
      rootOrdinal: root.rootOrdinal,
      eventRootId: root.rootId,
      signed: signedContribution,
    });
  }
  return {
    eventId: event.eventId,
    signedWake: finite(event.measures.signedWake, `${event.eventId}.signedWake`),
    unsignedWake: finite(event.measures.unsignedWake, `${event.eventId}.unsignedWake`),
    normalWakeFluxDensity: {
      signed: signedNormalFluxDensity,
      raw: rawNormalFluxDensity,
      sourceRootContributions,
    },
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
    add(
      "wake-flux/raw-cycle-integral",
      surface.radius,
      surface.wakeFlux.rawCycleIntegral,
    );
    add(
      "wake-flux/residual-cycle-integral",
      surface.radius,
      surface.wakeFlux.residualCycleIntegral,
    );
    add(
      "wake-flux/cancellation-ratio",
      surface.radius,
      surface.wakeFlux.etaWakeFlux,
      1,
    );
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
    surface.wakeFluxHarmonicCancellationRows.forEach((row) => {
      add(
        `wake-flux-frequency/raw-mode-n${row.harmonic}`,
        surface.radius,
        row.rawModeNorm,
      );
      add(
        `wake-flux-frequency/net-mode-n${row.harmonic}`,
        surface.radius,
        row.netModeNorm,
        row.rawModeNorm,
      );
      if (row.etaWakeFlux !== null) {
        add(
          `wake-flux-frequency/cancellation-ratio-n${row.harmonic}`,
          surface.radius,
          row.etaWakeFlux,
          1,
        );
      }
    });
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
  const wakeFluxEntries = [];
  const rawEmissionReferenceEntries = [];
  const frequencyResolvedWakeFluxEntries = [];
  const frequencyResolvedBandEntries = [];
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
    for (const measure of [
      "signedCycleIntegral",
      "rawCycleIntegral",
      "residualCycleIntegral",
      "etaWakeFlux",
    ]) {
      const primaryValue = primary.wakeFlux[measure];
      const refinedValue = refined.wakeFlux[measure];
      const referenceScale = measure === "etaWakeFlux"
        ? 1
        : primary.wakeFlux.rawEmissionReference?.expectedCycleIntegral ?? 1;
      wakeFluxEntries.push({
        radius: primary.radius,
        measure,
        primary: primaryValue,
        refined: refinedValue,
        relativeOrAbsoluteChange: Math.abs(primaryValue - refinedValue) /
          Math.max(Math.abs(primaryValue), Math.abs(refinedValue), referenceScale, floor),
      });
    }
    for (const surface of [primary, refined]) {
      const reference = surface.wakeFlux.rawEmissionReference;
      rawEmissionReferenceEntries.push({
        radius: surface.radius,
        resolution: surface.resolution,
        expected: reference?.expectedCycleIntegral ?? null,
        measured: surface.wakeFlux.rawCycleIntegral,
        relativeResidual: reference?.relativeResidual ?? Number.POSITIVE_INFINITY,
        passed: reference?.passed === true,
      });
    }
    const frequencyConfig = protocol.causalWakeFluxReduction.frequencyResolved;
    const maximumRawCoefficient = Math.max(
      ...primary.wakeFluxSpectralCancellationRows.map((row) => row.rawMagnitude),
      ...refined.wakeFluxSpectralCancellationRows.map((row) => row.rawMagnitude),
      frequencyConfig.coefficientFloor,
    );
    const coefficientComparisonFloor = Math.max(
      frequencyConfig.coefficientFloor,
      maximumRawCoefficient * frequencyConfig.relativeComparisonFloor,
    );
    const refinedSourceRows = new Map(refined.sourceTaggedWakeFluxSpectralRows.map((row) => [
      `${row.sourceRootId}:l${row.degree}:m${row.order}:n${row.harmonic}`,
      row,
    ]));
    for (const primaryRow of primary.sourceTaggedWakeFluxSpectralRows) {
      const key = `${primaryRow.sourceRootId}:l${primaryRow.degree}:m${primaryRow.order}:n${primaryRow.harmonic}`;
      const refinedRow = refinedSourceRows.get(key);
      const comparisonScale = Math.max(
        primaryRow.magnitude,
        refinedRow?.magnitude ?? 0,
        coefficientComparisonFloor,
      );
      if (comparisonScale <= coefficientComparisonFloor &&
          primaryRow.magnitude < coefficientComparisonFloor &&
          (refinedRow?.magnitude ?? 0) < coefficientComparisonFloor) continue;
      frequencyResolvedWakeFluxEntries.push({
        kind: "source-root-coefficient",
        radius: primary.radius,
        sourceRootId: primaryRow.sourceRootId,
        degree: primaryRow.degree,
        order: primaryRow.order,
        harmonic: primaryRow.harmonic,
        primary: { real: primaryRow.real, imaginary: primaryRow.imaginary },
        refined: refinedRow
          ? { real: refinedRow.real, imaginary: refinedRow.imaginary }
          : null,
        relativeOrAbsoluteChange: refinedRow
          ? Math.hypot(
            primaryRow.real - refinedRow.real,
            primaryRow.imaginary - refinedRow.imaginary,
          ) / comparisonScale
          : Number.POSITIVE_INFINITY,
        identityMatch: Boolean(refinedRow),
      });
    }
    const refinedCancellationRows = new Map(refined.wakeFluxSpectralCancellationRows.map((row) => [
      `l${row.degree}:m${row.order}:n${row.harmonic}`,
      row,
    ]));
    for (const primaryRow of primary.wakeFluxSpectralCancellationRows) {
      const key = `l${primaryRow.degree}:m${primaryRow.order}:n${primaryRow.harmonic}`;
      const refinedRow = refinedCancellationRows.get(key);
      const comparisonScale = Math.max(
        primaryRow.rawMagnitude,
        refinedRow?.rawMagnitude ?? 0,
        coefficientComparisonFloor,
      );
      if (comparisonScale <= coefficientComparisonFloor &&
          primaryRow.rawMagnitude < coefficientComparisonFloor &&
          (refinedRow?.rawMagnitude ?? 0) < coefficientComparisonFloor) continue;
      const netChange = refinedRow
        ? Math.hypot(
          primaryRow.netReal - refinedRow.netReal,
          primaryRow.netImaginary - refinedRow.netImaginary,
        ) / comparisonScale
        : Number.POSITIVE_INFINITY;
      const rawChange = refinedRow
        ? Math.abs(primaryRow.rawMagnitude - refinedRow.rawMagnitude) / comparisonScale
        : Number.POSITIVE_INFINITY;
      const ratioChange = refinedRow && primaryRow.etaWakeFlux !== null &&
          refinedRow.etaWakeFlux !== null
        ? Math.abs(primaryRow.etaWakeFlux - refinedRow.etaWakeFlux)
        : 0;
      frequencyResolvedWakeFluxEntries.push({
        kind: "cancellation-coefficient",
        radius: primary.radius,
        degree: primaryRow.degree,
        order: primaryRow.order,
        harmonic: primaryRow.harmonic,
        primary: {
          netReal: primaryRow.netReal,
          netImaginary: primaryRow.netImaginary,
          rawMagnitude: primaryRow.rawMagnitude,
          etaWakeFlux: primaryRow.etaWakeFlux,
        },
        refined: refinedRow
          ? {
            netReal: refinedRow.netReal,
            netImaginary: refinedRow.netImaginary,
            rawMagnitude: refinedRow.rawMagnitude,
            etaWakeFlux: refinedRow.etaWakeFlux,
          }
          : null,
        relativeOrAbsoluteChange: Math.max(netChange, rawChange, ratioChange),
        identityMatch: Boolean(refinedRow),
      });
    }
    for (const surface of [primary, refined]) {
      frequencyResolvedBandEntries.push({
        radius: surface.radius,
        resolution: surface.resolution,
        outOfBandRmsFraction: surface.sourceTaggedWakeFluxBandCoverage.outOfBandRmsFraction,
        parsevalRelativeResidual:
          surface.sourceTaggedWakeFluxBandCoverage.parsevalRelativeResidual,
        passed: surface.sourceTaggedWakeFluxBandCoverage.passed,
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
    causalWakeFlux: {
      threshold: thresholds.causalWakeFluxRelativeOrAbsolute,
      maximumChange: Math.max(
        ...wakeFluxEntries.map((row) => row.relativeOrAbsoluteChange),
        0,
      ),
      entries: wakeFluxEntries,
    },
    rawEmissionReference: {
      threshold: protocol.failClosedGates.causalWakeFlux.rawEmissionReferenceRelative,
      maximumChange: Math.max(
        ...rawEmissionReferenceEntries.map((row) => row.relativeResidual),
        0,
      ),
      entries: rawEmissionReferenceEntries,
      identityMatch: rawEmissionReferenceEntries.every((row) => row.passed),
    },
    frequencyResolvedWakeFlux: {
      threshold: thresholds.frequencyResolvedWakeFluxRelativeOrAbsolute,
      maximumChange: Math.max(
        ...frequencyResolvedWakeFluxEntries.map((row) => row.relativeOrAbsoluteChange),
        0,
      ),
      entries: frequencyResolvedWakeFluxEntries,
      identityMatch: frequencyResolvedWakeFluxEntries.every((row) => row.identityMatch),
    },
    frequencyResolvedWakeFluxBandCoverage: {
      threshold:
        protocol.failClosedGates.causalWakeFlux.frequencyResolvedOutOfBandRmsFraction,
      maximumChange: Math.max(
        ...frequencyResolvedBandEntries.map((row) => row.outOfBandRmsFraction),
        0,
      ),
      entries: frequencyResolvedBandEntries,
      identityMatch: frequencyResolvedBandEntries.every((row) => row.passed),
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
  sourceAbsolutePolaritySum = null,
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
  const accumulator = createSurfaceAccumulator(protocol, radius, resolution, {
    sourceAbsolutePolaritySum,
  });
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
  const sourceAbsolutePolaritySum = sourceRecord.sources.reduce(
    (sum, sourceRow) => sum + Math.abs(finite(sourceRow.charge, `${sourceRow.id}.charge`)),
    0,
  );
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
      const accumulator = createSurfaceAccumulator(protocol, radius, resolution, {
        sourceAbsolutePolaritySum,
        sourceRootIdentities: sourceRecord.sources.map((sourceRow) => ({
          transmitterId: sourceRow.id,
          rootOrdinal: 0,
        })),
      });
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
        const samples = fullProtocol.probes.map((probe, directionIndex) => {
          const event = eventByProbe.get(probe.id);
          if (!event || event.observationTime !== accumulator.times[timeIndex]) {
            throw new Error(`surface batch is missing ${probe.id} at time index ${timeIndex}.`);
          }
          return extractSample(
            event,
            protocol.enclosingSurfaces.probePolarities,
            accumulator.directions[directionIndex].unitVector,
            protocol.eventEvaluator.fieldSpeed,
          );
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
