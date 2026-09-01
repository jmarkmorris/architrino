import { createHash } from "node:crypto";

import {
  canonicalJson,
  createPrescribedRecordAnalysisSession,
  evaluatePrescribedRecordAnalysis,
  PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA,
  sha256Canonical,
} from "./AnalyticalBraidEvaluator.mjs";
import {
  COINCIDENT_AXIS_THREE_BINARY_ACCEPTED_SCIENTIFIC_IDENTITIES,
  EXACT_CONFIGURATION_COHORT_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA,
  buildCoincidentAxisThreeBinarySurfaceEventAnalysisProtocol,
  createPeriodicCycleTimes,
  createSphericalProductQuadrature,
  validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol,
} from "./CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs";

export const COINCIDENT_AXIS_THREE_BINARY_STREAMING_REDUCTION_RESULT_SCHEMA =
  "prescribed-path-analysis/coincident-axis-three-binary-streaming-reduction-result.v1";
export const COMPLETE_CYCLE_STREAMING_REDUCTION_RESULT_SCHEMA =
  "prescribed-path-analysis/complete-cycle-streaming-reduction-result.v1";

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
  sourceSignedPolaritySum = null,
  transmitterRootIdentities = [],
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
  const transmitterRootFluxSeries = new Map();
  for (const identity of transmitterRootIdentities) {
    if (typeof identity?.transmitterId !== "string" || !identity.transmitterId ||
        !Number.isSafeInteger(identity.rootOrdinal) || identity.rootOrdinal < 0) {
      throw new TypeError("transmitter-root identity declarations must bind transmitter and ordinal.");
    }
    const transmitterRootId = `${identity.transmitterId}:root-${identity.rootOrdinal}`;
    if (transmitterRootFluxSeries.has(transmitterRootId)) {
      throw new Error(`transmitter-root identity ${transmitterRootId} was declared twice.`);
    }
    transmitterRootFluxSeries.set(transmitterRootId, {
      transmitterRootId,
      transmitterId: identity.transmitterId,
      rootOrdinal: identity.rootOrdinal,
      coefficientSeries: harmonics.map(() => Array(times.length).fill(0)),
    });
  }
  const normalizedSourceAbsolutePolaritySum = sourceAbsolutePolaritySum === null
    ? null
    : positive(sourceAbsolutePolaritySum, "source absolute-polarity sum");
  const normalizedSourceSignedPolaritySum = sourceSignedPolaritySum === null
    ? null
    : finite(sourceSignedPolaritySum, "source signed-polarity sum");
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
    const transmitterRootCoefficientSums = new Map();
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
          `${sample.eventId} violates the transmitter-tagged wake-flux triangle bound.`,
        );
      }
      const transmitterRootContributions = sample.normalWakeFluxDensity?.transmitterRootContributions;
      if (!Array.isArray(transmitterRootContributions)) {
        throw new Error(`${sample.eventId} lacks transmitter-root-tagged normal wake-flux contributions.`);
      }
      const sampleTransmitterRootIds = new Set();
      let taggedSignedNormalFluxDensity = 0;
      let taggedRawNormalFluxDensity = 0;
      for (const contribution of transmitterRootContributions) {
        const transmitterRootId = typeof contribution?.transmitterRootId === "string"
          ? contribution.transmitterRootId
          : "";
        const transmitterId = typeof contribution?.transmitterId === "string"
          ? contribution.transmitterId
          : "";
        const rootOrdinal = contribution?.rootOrdinal;
        if (!transmitterRootId || !transmitterId ||
            !Number.isSafeInteger(rootOrdinal) || rootOrdinal < 0) {
          throw new Error(`${sample.eventId} has an invalid transmitter-root wake-flux tag.`);
        }
        if (transmitterRootId !== `${transmitterId}:root-${rootOrdinal}`) {
          throw new Error(`${sample.eventId} has a noncanonical transmitter-root wake-flux tag.`);
        }
        if (sampleTransmitterRootIds.has(transmitterRootId)) {
          throw new Error(`${sample.eventId} repeats transmitter-root tag ${transmitterRootId}.`);
        }
        sampleTransmitterRootIds.add(transmitterRootId);
        const signed = finite(
          contribution.signed,
          `${sample.eventId}.${transmitterRootId}.signedNormalWakeFluxDensity`,
        );
        taggedSignedNormalFluxDensity += signed;
        taggedRawNormalFluxDensity += Math.abs(signed);
        const existing = transmitterRootFluxSeries.get(transmitterRootId);
        if (existing && (existing.transmitterId !== transmitterId ||
            existing.rootOrdinal !== rootOrdinal)) {
          throw new Error(`transmitter-root tag ${transmitterRootId} changed identity.`);
        }
        if (!existing) {
          transmitterRootFluxSeries.set(transmitterRootId, {
            transmitterRootId,
            transmitterId,
            rootOrdinal,
            coefficientSeries: harmonics.map(() => Array(times.length).fill(0)),
          });
        }
        const coefficientRow = transmitterRootCoefficientSums.get(transmitterRootId) ??
          Array(harmonics.length).fill(0);
        for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
          coefficientRow[harmonicIndex] +=
            weight * signed * harmonicValues[directionIndex][harmonicIndex];
        }
        transmitterRootCoefficientSums.set(transmitterRootId, coefficientRow);
      }
      const taggedTolerance = 1e-12 * Math.max(1, rawNormalFluxDensity);
      if (Math.abs(taggedSignedNormalFluxDensity - signedNormalFluxDensity) > taggedTolerance ||
          Math.abs(taggedRawNormalFluxDensity - rawNormalFluxDensity) > taggedTolerance) {
        throw new Error(`${sample.eventId} transmitter-root wake-flux rows do not reconstruct the sample.`);
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
    for (const transmitterRoot of transmitterRootFluxSeries.values()) {
      const sums = transmitterRootCoefficientSums.get(transmitterRoot.transmitterRootId) ??
        Array(harmonics.length).fill(0);
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        transmitterRoot.coefficientSeries[harmonicIndex][timeIndex] =
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
    const expectedSignedCycleIntegral = normalizedSourceSignedPolaritySum === null
      ? null
      : protocol.completeCycle.period * normalizedSourceSignedPolaritySum;
    const signedEmissionReference = expectedSignedCycleIntegral === null
      ? null
      : {
          expectedCycleIntegral: expectedSignedCycleIntegral,
          absoluteResidual: signedCycleIntegral - expectedSignedCycleIntegral,
          relativeOrAbsoluteResidual: Math.abs(
            signedCycleIntegral - expectedSignedCycleIntegral,
          ) / Math.max(
            1,
            Math.abs(expectedSignedCycleIntegral),
            expectedRawCycleIntegral ?? 0,
          ),
          threshold:
            protocol.failClosedGates.causalWakeFlux.signedEmissionReferenceRelativeOrAbsolute ??
            protocol.failClosedGates.causalWakeFlux.rawEmissionReferenceRelative,
        };
    if (signedEmissionReference) {
      signedEmissionReference.passed =
        signedEmissionReference.relativeOrAbsoluteResidual <=
          signedEmissionReference.threshold;
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
      signedEmissionReference,
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
    if (transmitterRootFluxSeries.size === 0) {
      throw new Error(`${resolution} radius ${radius} lacks transmitter-root wake-flux series.`);
    }
    const frequencyConfig = protocol.causalWakeFluxReduction.frequencyResolved;
    const coefficientFloor = frequencyConfig.coefficientFloor;
    const transmitterTaggedWakeFluxSpectralRows = [];
    const aggregateCoefficientRows = new Map();
    const transmitterTaggedBandTotals = {
      retainedBandPower: 0,
      fullBandPower: 0,
      timeDomainPower: 0,
      parsevalResidual: 0,
      outOfBandPower: 0,
    };
    const orderedTransmitterRoots = [...transmitterRootFluxSeries.values()].sort((left, right) =>
      left.transmitterRootId.localeCompare(right.transmitterRootId));
    for (const transmitterRoot of orderedTransmitterRoots) {
      for (let harmonicIndex = 0; harmonicIndex < harmonics.length; harmonicIndex += 1) {
        const angular = harmonics[harmonicIndex];
        const spectral = complexDft(
          transmitterRoot.coefficientSeries[harmonicIndex],
          protocol.spectralReduction.maximumHarmonic,
        );
        transmitterTaggedBandTotals.retainedBandPower += spectral.retainedBandPower;
        transmitterTaggedBandTotals.fullBandPower += spectral.fullBandPower;
        transmitterTaggedBandTotals.timeDomainPower += spectral.timeDomainPower;
        transmitterTaggedBandTotals.parsevalResidual += spectral.parsevalResidual;
        transmitterTaggedBandTotals.outOfBandPower += spectral.outOfBandPower;
        for (const coefficient of spectral.retained) {
          const row = {
            transmitterRootId: transmitterRoot.transmitterRootId,
            transmitterId: transmitterRoot.transmitterId,
            rootOrdinal: transmitterRoot.rootOrdinal,
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
          transmitterTaggedWakeFluxSpectralRows.push(row);
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
            transmitterRootCount: 0,
          };
          aggregate.netReal += coefficient.real;
          aggregate.netImaginary += coefficient.imaginary;
          aggregate.rawMagnitude += coefficient.magnitude;
          aggregate.transmitterRootCount += 1;
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
          effectiveCoefficientFloor,
          admissibleAngularModeCount: row.admissibleAngularModeCount,
          status: rawModeNorm > effectiveCoefficientFloor
            ? "admissible"
            : "below-coefficient-floor",
        };
      });
    const transmitterTaggedWakeFluxBandCoverage = {
      transmitterRootCount: orderedTransmitterRoots.length,
      maximumDegree: protocol.angularReduction.maximumDegree,
      maximumHarmonic: protocol.spectralReduction.maximumHarmonic,
      absoluteCoefficientFloor: coefficientFloor,
      relativeCoefficientFloor: frequencyConfig.relativeComparisonFloor,
      maximumRawCoefficientMagnitude,
      effectiveCoefficientFloor,
      ...transmitterTaggedBandTotals,
      parsevalRelativeResidual: Math.abs(transmitterTaggedBandTotals.parsevalResidual) /
        Math.max(transmitterTaggedBandTotals.timeDomainPower, coefficientFloor),
      outOfBandRmsFraction: Math.sqrt(
        transmitterTaggedBandTotals.outOfBandPower /
          Math.max(transmitterTaggedBandTotals.timeDomainPower, coefficientFloor),
      ),
      threshold:
        protocol.failClosedGates.causalWakeFlux.frequencyResolvedOutOfBandRmsFraction,
      claimBoundary: frequencyConfig.claimBoundary,
    };
    transmitterTaggedWakeFluxBandCoverage.passed =
      transmitterTaggedWakeFluxBandCoverage.outOfBandRmsFraction <=
        transmitterTaggedWakeFluxBandCoverage.threshold;
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
      transmitterTaggedWakeFluxSpectralRows,
      wakeFluxSpectralCancellationRows,
      wakeFluxHarmonicCancellationRows,
      transmitterTaggedWakeFluxBandCoverage,
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
  const transmitterRootContributions = [];
  for (const root of event.roots) {
    const normalProjection = dot(root.direction, surfaceNormal);
    const signedContribution = fieldSpeed * root.signedWakeContribution * normalProjection;
    signedNormalFluxDensity += signedContribution;
    rawNormalFluxDensity += Math.abs(signedContribution);
    transmitterRootContributions.push({
      transmitterRootId: `${root.transmitterId}:root-${root.rootOrdinal}`,
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
      transmitterRootContributions,
    },
    probeAccelerations,
    rawAccelerationMagnitudeSums,
  };
}

function independentlyCheckEventPacket(
  packet,
  expectedProtocol,
  completeProtocol,
  expectedSourceCount = completeProtocol.applicability.sourceCount,
) {
  const compact = packet.schema === PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA;
  if (compact) {
    if (packet.protocolId !== expectedProtocol.protocolId) {
      throw new Error("compact surface event batch protocol identity mismatch.");
    }
  } else {
    if (packet.protocolHash !== sha256Canonical(expectedProtocol) ||
        canonicalJson(packet.protocol) !== canonicalJson(expectedProtocol)) {
      throw new Error("surface event packet protocol hash or body mismatch.");
    }
    if (packet.resultHash !== packetHashWithoutResultHash(packet)) {
      throw new Error(
        `surface event packet ${packet.resultHash ?? "without-hash"} failed its result hash.`,
      );
    }
  }
  const events = packet.rawLedgers?.causalRoots;
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error("surface event packet lacks its raw causal-root ledger.");
  }
  if (compact) {
    const expectedEvents = expectedProtocol.probes.flatMap((probe) =>
      probe.observationTimes.map((observationTime) => ({
        eventId: `${probe.id}@${observationTime}`,
        probeId: probe.id,
        observationTime,
      })));
    if (events.length !== expectedEvents.length ||
        expectedEvents.some((expected, index) =>
          events[index]?.eventId !== expected.eventId ||
          events[index]?.probeId !== expected.probeId ||
          events[index]?.observationTime !== expected.observationTime)) {
      throw new Error("compact surface event batch differs from its requested event inventory.");
    }
  }
  const convergenceByEvent = new Map(
    (packet.rawLedgers.numericalConvergence ?? []).map((row) => [row.eventId, row]),
  );
  const transversalityFloor = completeProtocol.eventEvaluator.tolerances.rootTransversalityFloor;
  const convergenceTolerance = completeProtocol.eventEvaluator.tolerances.convergenceAbsolute;
  const sourceCount = expectedSourceCount;
  for (const event of events) {
    const rootsByTransmitter = new Map();
    for (const root of event.roots) {
      const rows = rootsByTransmitter.get(root.transmitterId) ?? [];
      rows.push(root);
      rootsByTransmitter.set(root.transmitterId, rows);
    }
    const noRootIds = event.noRootTransmitters.map(
      (row) => row.transmitterId,
    );
    const representedTransmitters = new Set([
      ...event.roots.map((root) => root.transmitterId),
      ...noRootIds,
    ]);
    if (!event.rootCompletenessCertification?.complete ||
        event.rootCompletenessCertification.policy !==
          expectedProtocol.rootPolicy.id ||
        new Set(noRootIds).size !== noRootIds.length ||
        noRootIds.some((id) => rootsByTransmitter.has(id)) ||
        [...rootsByTransmitter.values()].some((rows) =>
          rows.map((root) => root.rootOrdinal)
            .sort((left, right) => left - right)
            .some((ordinal, index) => ordinal !== index)) ||
        representedTransmitters.size !== sourceCount) {
      throw new Error(`event ${event.eventId} failed independent root-completeness inspection.`);
    }
    if (expectedProtocol.rootPolicy.id ===
        "all-retained-roots/event-specific-isolation-certified.v2") {
      const certificates =
        event.rootCompletenessCertification.transmitterCertificates;
      const certificateIds = Array.isArray(certificates)
        ? certificates.map((row) => row.transmitterId)
        : [];
      if (!Array.isArray(certificates) ||
          certificates.length !== sourceCount ||
          new Set(certificateIds).size !== sourceCount ||
          certificates.some((certificate) =>
            certificate.complete !== true ||
            certificate.rootCount !==
              (rootsByTransmitter.get(certificate.transmitterId)?.length ?? 0))) {
        throw new Error(
          `event ${event.eventId} failed independent causal-root-domain inspection.`,
        );
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
  if (compact) {
    if (packet.reducedMeasures?.validity?.minimumSeparationPassed !== true) {
      throw new Error("compact surface event batch failed the minimum-separation gate.");
    }
  } else {
    for (const ledgerName of ["minimumSeparation", "refinedMinimumSeparation"]) {
      const ledger = packet.rawLedgers[ledgerName];
      if (!Array.isArray(ledger) || ledger.length === 0 ||
          ledger.some((row) => !(row.minimumSeparation >= separationFloor))) {
        throw new Error(`surface event packet failed the ${ledgerName} gate.`);
      }
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

export function validateCompleteCycleSourceApplicability(sourceRecord, protocol) {
  const isCoincidentAxisThreeBinary = protocol.schema ===
    "prescribed-path-analysis/coincident-axis-three-binary-complete-cycle-probe-protocol.v1";
  const coincidentAxisAndTwoComponentCircular =
    protocol.applicability?.campaignClass ===
      "coincident-axis-and-two-component-circular-prescribed-path.v3";
  const exactConfigurationCohort = protocol.schema ===
    EXACT_CONFIGURATION_COHORT_COMPLETE_CYCLE_PROBE_PROTOCOL_SCHEMA;
  if (isCoincidentAxisThreeBinary &&
      !COINCIDENT_AXIS_THREE_BINARY_ACCEPTED_SCIENTIFIC_IDENTITIES.some(
        (identity) => identity.assemblyId === sourceRecord?.assemblyId &&
          identity.modelRevisionSha256 === sourceRecord?.modelRevisionSha256,
      )) {
    throw new Error(
      "coincident-axis three-binary complete-cycle reduction requires one of the protocol's four exact scientific identities.",
    );
  }
  if (exactConfigurationCohort) {
    const base = protocol.applicability.acceptedSourceConfigurations.find(
      (row) => row.sourceSlug === sourceRecord?.sourceSlug,
    );
    const reference = sourceRecord?.referenceConfigurationIdentity;
    const current = sourceRecord?.parameterVector?.identity;
    let scientificModel = null;
    try {
      scientificModel = JSON.parse(sourceRecord?.scientificIdentityPreimage);
    } catch {
      scientificModel = null;
    }
    const derivedRevision = typeof sourceRecord?.scientificIdentityPreimage === "string"
      ? createHash("sha256")
        .update(sourceRecord.scientificIdentityPreimage)
        .digest("hex")
      : null;
    if (!base || reference?.assemblyId !== base.assemblyId ||
        reference?.modelRevisionSha256 !== base.modelRevisionSha256) {
      throw new Error(
        "complete-cycle reduction source has an unlisted exact configuration preimage.",
      );
    }
    if (scientificModel?.schema !== "assembly-scientific-identity.v1" ||
        derivedRevision !== sourceRecord.modelRevisionSha256 ||
        sourceRecord.assemblyId !== `asm-${derivedRevision?.slice(0, 32)}` ||
        current?.assemblyId !== sourceRecord.assemblyId ||
        current?.modelRevisionSha256 !== sourceRecord.modelRevisionSha256) {
      throw new Error(
        "complete-cycle reduction source exact identity does not match its scientific preimage.",
      );
    }
  } else if (!isCoincidentAxisThreeBinary && !coincidentAxisAndTwoComponentCircular) {
    throw new Error("complete-cycle reduction source lacks a current applicability contract.");
  }
  const permittedSourceCounts = isCoincidentAxisThreeBinary
    ? [protocol.applicability.sourceCount]
    : protocol.applicability.sourceCounts;
  if (!Array.isArray(sourceRecord.sources) ||
      !permittedSourceCounts.includes(sourceRecord.sources.length)) {
    throw new Error("exact source count does not match the complete-cycle protocol.");
  }
  const period = protocol.completeCycle.period;
  const envelope = protocol.applicability.maximumSourceEnvelopeRadius;
  const boundedCommonTranslation =
    protocol.applicability.centerVelocityPolicy ===
      "common-bounded-translation.v1";
  const firstCenterVelocity = sourceRecord.sources[0]?.trajectory?.centerVelocity;
  if (boundedCommonTranslation &&
      (!(firstCenterVelocity &&
        ["x", "y", "z"].every((key) =>
          Number.isFinite(firstCenterVelocity[key]))) ||
        vectorNorm(firstCenterVelocity) >
          protocol.applicability.maximumCenterSpeed + 1e-12)) {
    throw new Error(
      "source common translation exceeds the declared center-speed bound.",
    );
  }
  const requiredCenterVelocity = boundedCommonTranslation
    ? firstCenterVelocity
    : coincidentAxisAndTwoComponentCircular
    ? {
        x: protocol.applicability.requiredCenterVelocity[0],
        y: protocol.applicability.requiredCenterVelocity[1],
        z: protocol.applicability.requiredCenterVelocity[2],
      }
    : { x: 0, y: 0, z: 0 };
  const centerSum = { x: 0, y: 0, z: 0 };
  for (const source of sourceRecord.sources) {
    const trajectory = source.trajectory;
    if (trajectory?.kind !== "moving-circular.v1") {
      throw new Error(`source ${source.id} is not an exact moving-circular path.`);
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
    if (vectorNorm({
      x: centerVelocity.x - requiredCenterVelocity.x,
      y: centerVelocity.y - requiredCenterVelocity.y,
      z: centerVelocity.z - requiredCenterVelocity.z,
    }) > 1e-12 ||
        Math.abs(finite(trajectory.angularAcceleration, `${source.id}.angularAcceleration`)) > 1e-12 ||
        Math.abs(radiusUNorm - radiusVNorm) > 1e-12 * geometryScale ||
        Math.abs(dot(radiusU, radiusV)) > orthogonalityTolerance ||
        (isCoincidentAxisThreeBinary && Math.abs(dot(center, radiusU)) > orthogonalityTolerance) ||
        (isCoincidentAxisThreeBinary && Math.abs(dot(center, radiusV)) > orthogonalityTolerance)) {
      throw new Error(
        `source ${source.id} violates the declared common-translation orthogonal-circle applicability gate.`,
      );
    }
    const cycleStartCenter = {
      x: center.x + centerVelocity.x * protocol.completeCycle.start,
      y: center.y + centerVelocity.y * protocol.completeCycle.start,
      z: center.z + centerVelocity.z * protocol.completeCycle.start,
    };
    const cycleEndTime = protocol.completeCycle.start + protocol.completeCycle.period;
    const cycleEndCenter = {
      x: center.x + centerVelocity.x * cycleEndTime,
      y: center.y + centerVelocity.y * cycleEndTime,
      z: center.z + centerVelocity.z * cycleEndTime,
    };
    const maximumRadius = boundedCommonTranslation || coincidentAxisAndTwoComponentCircular
      ? Math.max(vectorNorm(cycleStartCenter), vectorNorm(cycleEndCenter)) +
        Math.max(radiusUNorm, radiusVNorm)
      : isCoincidentAxisThreeBinary
      ? Math.hypot(centerNorm, Math.max(radiusUNorm, radiusVNorm))
      : centerNorm + Math.max(radiusUNorm, radiusVNorm);
    if (maximumRadius > envelope + 1e-12) {
      throw new Error(`source ${source.id} exceeds the declared source envelope.`);
    }
    const completedTurns = finite(
      trajectory.angularVelocity,
      `${source.id}.angularVelocity`,
    ) * period / (2 * Math.PI);
    if (Math.abs(completedTurns - Math.round(completedTurns)) > 1e-12) {
      throw new Error(`source ${source.id} does not close over the declared return period.`);
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
  if (isCoincidentAxisThreeBinary && vectorNorm(meanCenter) > 1e-12) {
    throw new Error("coincident-axis three-binary source center at epoch differs from the protocol center.");
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
    surface.wakeFluxHarmonicCancellationRows
      .filter((row) => row.status === "admissible")
      .forEach((row) => {
      add(
        `wake-flux-frequency/raw-mode-n${row.harmonic}`,
        surface.radius,
        row.rawModeNorm,
      );
      if (row.netModeNorm > row.effectiveCoefficientFloor) {
        add(
          `wake-flux-frequency/net-mode-n${row.harmonic}`,
          surface.radius,
          row.netModeNorm,
          row.rawModeNorm,
        );
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
  const signedEmissionReferenceEntries = [];
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
      const signedReference = surface.wakeFlux.signedEmissionReference;
      signedEmissionReferenceEntries.push({
        radius: surface.radius,
        resolution: surface.resolution,
        expected: signedReference?.expectedCycleIntegral ?? null,
        measured: surface.wakeFlux.signedCycleIntegral,
        relativeOrAbsoluteResidual:
          signedReference?.relativeOrAbsoluteResidual ?? Number.POSITIVE_INFINITY,
        passed: signedReference?.passed === true,
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
    const refinedSourceRows = new Map(refined.transmitterTaggedWakeFluxSpectralRows.map((row) => [
      `${row.transmitterRootId}:l${row.degree}:m${row.order}:n${row.harmonic}`,
      row,
    ]));
    for (const primaryRow of primary.transmitterTaggedWakeFluxSpectralRows) {
      const key = `${primaryRow.transmitterRootId}:l${primaryRow.degree}:m${primaryRow.order}:n${primaryRow.harmonic}`;
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
        kind: "transmitter-root-coefficient",
        radius: primary.radius,
        transmitterRootId: primaryRow.transmitterRootId,
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
        outOfBandRmsFraction: surface.transmitterTaggedWakeFluxBandCoverage.outOfBandRmsFraction,
        parsevalRelativeResidual:
          surface.transmitterTaggedWakeFluxBandCoverage.parsevalRelativeResidual,
        passed: surface.transmitterTaggedWakeFluxBandCoverage.passed,
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
    signedEmissionReference: {
      threshold:
        protocol.failClosedGates.causalWakeFlux.signedEmissionReferenceRelativeOrAbsolute ??
        protocol.failClosedGates.causalWakeFlux.rawEmissionReferenceRelative,
      maximumChange: Math.max(
        ...signedEmissionReferenceEntries.map((row) => row.relativeOrAbsoluteResidual),
        0,
      ),
      entries: signedEmissionReferenceEntries,
      identityMatch: signedEmissionReferenceEntries.every((row) => row.passed),
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

export function reduceCoincidentAxisThreeBinarySurfaceSampleGrid({
  completeCycleProtocol: rawProtocol,
  radius,
  resolution = "primary",
  sourceAbsolutePolaritySum = null,
  sampleAt,
}) {
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(rawProtocol);
  if (!protocol.enclosingSurfaces.radii.includes(radius)) {
    throw new RangeError(`radius ${radius} is not declared by the coincident-axis three-binary protocol.`);
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

export function computeCoincidentAxisThreeBinaryRadialScalingRows(surfaceRows, floor = 1e-30, relativeFloor = 0) {
  return radialMeasureRows(
    surfaceRows,
    positive(floor, "radial scaling floor"),
    nonnegative(relativeFloor, "radial scaling relative floor"),
  );
}

export function finalizeCoincidentAxisThreeBinaryStreamingReductionPacket(packetWithoutHash) {
  return { ...packetWithoutHash, resultHash: sha256Canonical(packetWithoutHash) };
}

export function evaluateCoincidentAxisThreeBinaryStreamingSurfaceReductions({
  sourceRecord,
  completeCycleProtocol: rawProtocol,
  evaluate = evaluatePrescribedRecordAnalysis,
  onSurfacePacket = null,
  onProgress = null,
  evidenceMode = "full",
  analysisSession = null,
} = {}) {
  const protocol = validateCoincidentAxisThreeBinaryCompleteCycleProbeProtocol(rawProtocol);
  if (typeof evaluate !== "function") throw new TypeError("evaluate must be a function.");
  if (onSurfacePacket !== null && typeof onSurfacePacket !== "function") {
    throw new TypeError("onSurfacePacket must be a function when supplied.");
  }
  if (onProgress !== null && typeof onProgress !== "function") {
    throw new TypeError("onProgress must be a function when supplied.");
  }
  if (evidenceMode !== "full" && evidenceMode !== "compact") {
    throw new TypeError("evidenceMode must be full or compact.");
  }
  const session = analysisSession ??
    (evaluate === evaluatePrescribedRecordAnalysis
      ? createPrescribedRecordAnalysisSession(sourceRecord)
      : null);
  validateCompleteCycleSourceApplicability(sourceRecord, protocol);
  const sourceAbsolutePolaritySum = sourceRecord.sources.reduce(
    (sum, sourceRow) => sum + Math.abs(finite(sourceRow.charge, `${sourceRow.id}.charge`)),
    0,
  );
  const sourceSignedPolaritySum = sourceRecord.sources.reduce(
    (sum, sourceRow) => sum + finite(sourceRow.charge, `${sourceRow.id}.charge`),
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
      const fullProtocol = buildCoincidentAxisThreeBinarySurfaceEventAnalysisProtocol(protocol, { radius, resolution });
      const accumulator = createSurfaceAccumulator(protocol, radius, resolution, {
        sourceAbsolutePolaritySum,
        sourceSignedPolaritySum,
        transmitterRootIdentities: sourceRecord.sources.map((sourceRow) => ({
          transmitterId: sourceRow.id,
          rootOrdinal: 0,
        })),
      });
      for (let timeIndex = 0; timeIndex < resolutionGrid.timeSamples; timeIndex += 1) {
        const progressStride = Math.max(1, Math.ceil(resolutionGrid.timeSamples / 8));
        if (timeIndex % progressStride === 0) {
          onProgress?.({
            stage: "surface-time-batch",
            radius,
            resolution,
            completedTimeSamples: timeIndex,
            totalTimeSamples: resolutionGrid.timeSamples,
          });
        }
        const eventProtocol = batchProtocol(fullProtocol, timeIndex);
        const eventPacket = evaluate({
          sourceRecord,
          protocol: eventProtocol,
          session,
          resultMode:
            evidenceMode === "compact" ? "compact-event-batch" : "full",
        });
        const events = independentlyCheckEventPacket(
          eventPacket,
          eventProtocol,
          protocol,
          sourceRecord.sources.length,
        );
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
          eventProtocolHash: eventPacket.protocolHash ?? null,
          eventResultHash: eventPacket.resultHash ?? null,
          rawCausalRootLedgerHash:
            evidenceMode === "compact" ? null : sha256Canonical(events),
          rawCausalRootEventCount: events.length,
          rawCausalRootCount: events.reduce((sum, event) => sum + event.rootCount, 0),
          numericalConvergenceLedgerHash:
            evidenceMode === "compact"
              ? null
              : sha256Canonical(eventPacket.rawLedgers.numericalConvergence),
          ...(evidenceMode === "compact" ? { evidenceMode } : {}),
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
      onProgress?.({
        stage: "surface-radius-complete",
        radius,
        resolution,
        completedTimeSamples: resolutionGrid.timeSamples,
        totalTimeSamples: resolutionGrid.timeSamples,
      });
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
    schema: protocol.schema ===
      "prescribed-path-analysis/coincident-axis-three-binary-complete-cycle-probe-protocol.v1"
      ? COINCIDENT_AXIS_THREE_BINARY_STREAMING_REDUCTION_RESULT_SCHEMA
      : COMPLETE_CYCLE_STREAMING_REDUCTION_RESULT_SCHEMA,
    reducer: {
      id: protocol.schema ===
        "prescribed-path-analysis/coincident-axis-three-binary-complete-cycle-probe-protocol.v1"
        ? "coincident-axis-three-binary-complete-cycle-streaming-surface-reducer"
        : "complete-cycle-streaming-surface-reducer",
      version: "v1",
      streamingOrder: "resolution-then-radius-then-time.v1",
      eventEvaluator: "evaluatePrescribedRecordAnalysis",
      ...(evidenceMode === "compact" ? { evidenceMode } : {}),
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    claimGrade: "derived",
    claimScope:
      "conditional complete-cycle reductions of the exact prescribed source record",
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
      "Reject the reduced rows if any independently recomputed causal-root-domain, root-completeness, separation, transversality, event-convergence, quadrature-convergence, symmetry, closed-form, hash, or deterministic-repeat check fails.",
  };
  return finalizeCoincidentAxisThreeBinaryStreamingReductionPacket(packetWithoutHash);
}
