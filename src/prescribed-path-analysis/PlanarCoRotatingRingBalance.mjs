const TWO_PI = 2 * Math.PI;
const DEFAULT_ROOT_TOLERANCE = 2e-13;
const DEFAULT_FOLD_TOLERANCE = 2e-10;

function requireFinite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function requirePositive(value, label) {
  const number = requireFinite(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function wrapPhase(value) {
  return ((value % TWO_PI) + TWO_PI) % TWO_PI;
}

function angularDistance(left, right) {
  const difference = Math.abs(wrapPhase(left) - wrapPhase(right));
  return Math.min(difference, TWO_PI - difference);
}

function bisection(fn, left, right, tolerance) {
  let fLeft = fn(left);
  let fRight = fn(right);
  if (Math.abs(fLeft) <= tolerance) return left;
  if (Math.abs(fRight) <= tolerance) return right;
  if (Math.sign(fLeft) === Math.sign(fRight)) {
    throw new Error(`root is not bracketed on [${left}, ${right}]`);
  }
  for (let iteration = 0; iteration < 180; iteration += 1) {
    const middle = (left + right) / 2;
    const fMiddle = fn(middle);
    if (Math.abs(fMiddle) <= tolerance || right - left <= tolerance * Math.max(1, Math.abs(middle))) {
      return middle;
    }
    if (Math.sign(fMiddle) === Math.sign(fLeft)) {
      left = middle;
      fLeft = fMiddle;
    } else {
      right = middle;
      fRight = fMiddle;
    }
  }
  return (left + right) / 2;
}

function uniqueSorted(values, tolerance = 5e-12) {
  return [...values].sort((a, b) => a - b).filter((value, index, rows) =>
    index === 0 || Math.abs(value - rows[index - 1]) > tolerance * Math.max(1, Math.abs(value)));
}

function normalizeConfiguration({ phases, polarities, beta }) {
  const speed = requirePositive(beta, "beta");
  if (!Array.isArray(phases) || phases.length < 2) {
    throw new TypeError("phases must contain at least two entries.");
  }
  if (!Array.isArray(polarities) || polarities.length !== phases.length) {
    throw new TypeError("polarities must match phases.");
  }
  const normalizedPhases = phases.map((value, index) => requireFinite(value, `phases[${index}]`));
  const normalizedPolarities = polarities.map((value, index) => {
    if (value !== -1 && value !== 1) throw new TypeError(`polarities[${index}] must be -1 or +1.`);
    return value;
  });
  for (let left = 0; left < normalizedPhases.length; left += 1) {
    for (let right = left + 1; right < normalizedPhases.length; right += 1) {
      if (angularDistance(normalizedPhases[left], normalizedPhases[right]) <= 1e-12) {
        throw new RangeError(`equal-time coordinate collision between labels ${left} and ${right}.`);
      }
    }
  }
  return { phases: normalizedPhases, polarities: normalizedPolarities, beta: speed };
}

function rootResidual(beta, phaseDifference, delayAngle) {
  return 2 * beta * Math.abs(Math.sin((phaseDifference + delayAngle) / 2)) - delayAngle;
}

function rootLobes(beta, phaseDifference) {
  const end = 2 * beta;
  const firstIndex = Math.floor(phaseDifference / TWO_PI) - 1;
  const lastIndex = Math.ceil((phaseDifference + end) / TWO_PI) + 1;
  const boundaries = [0, end];
  for (let index = firstIndex; index <= lastIndex; index += 1) {
    const boundary = TWO_PI * index - phaseDifference;
    if (boundary > 0 && boundary < end) boundaries.push(boundary);
  }
  const sorted = uniqueSorted(boundaries);
  return sorted.slice(0, -1).map((left, index) => {
    const right = sorted[index + 1];
    const midpoint = (left + right) / 2;
    const lobeIndex = Math.floor((phaseDifference + midpoint) / TWO_PI);
    let peak = null;
    if (beta > 1) {
      const candidate = TWO_PI * lobeIndex + 2 * Math.acos(1 / beta) - phaseDifference;
      if (candidate > left && candidate < right) peak = candidate;
    }
    return { lobeIndex, left, right, peak };
  });
}

/**
 * Enumerate the complete finite causal-root set for one ordered pair on a
 * rigid common circle. The delay-angle domain is finite because every chord is
 * at most two radii: 0 < omega*(T_r-T_t) <= 2*beta.
 */
export function enumerateCircularPairRoots({
  beta,
  receiverPhase,
  transmitterPhase,
  sameTransmitter = false,
  circulationSense = 1,
  rootTolerance = DEFAULT_ROOT_TOLERANCE,
  foldTolerance = DEFAULT_FOLD_TOLERANCE,
} = {}) {
  const speed = requirePositive(beta, "beta");
  const receiver = requireFinite(receiverPhase, "receiverPhase");
  const transmitter = requireFinite(transmitterPhase, "transmitterPhase");
  if (circulationSense !== -1 && circulationSense !== 1) {
    throw new TypeError("circulationSense must be -1 or +1.");
  }
  const physicalPhaseDifference = receiver - transmitter;
  const phaseDifference = circulationSense * physicalPhaseDifference;
  const tolerance = requirePositive(rootTolerance, "rootTolerance");
  const foldFloor = requirePositive(foldTolerance, "foldTolerance");
  const fn = (delayAngle) => rootResidual(speed, phaseDifference, delayAngle);
  const roots = [];
  const foldEvents = [];
  const inactiveRootGaps = [];

  for (const lobe of rootLobes(speed, phaseDifference)) {
    const splitPoints = lobe.peak == null
      ? [lobe.left, lobe.right]
      : [lobe.left, lobe.peak, lobe.right];
    if (lobe.peak != null) {
      const peakResidual = fn(lobe.peak);
      if (Math.abs(peakResidual) <= foldFloor) {
        foldEvents.push({
          lobeIndex: lobe.lobeIndex,
          delayAngle: lobe.peak,
          residual: peakResidual,
          status: "unresolved-fold-neighborhood",
        });
      }
    }
    for (let segmentIndex = 0; segmentIndex < splitPoints.length - 1; segmentIndex += 1) {
      const left = splitPoints[segmentIndex];
      const right = splitPoints[segmentIndex + 1];
      const fLeft = fn(left);
      const fRight = fn(right);
      const candidates = [];
      if (Math.abs(fLeft) <= tolerance) candidates.push(left);
      if (Math.abs(fRight) <= tolerance) candidates.push(right);
      if (Math.sign(fLeft) !== Math.sign(fRight)) {
        candidates.push(bisection(fn, left, right, tolerance));
      }
      const retained = candidates.filter((delayAngle) =>
        delayAngle > 10 * tolerance && delayAngle <= 2 * speed + 10 * tolerance);
      const isExcludedCoincidentSelfBoundary = sameTransmitter && left === 0 && Math.abs(fLeft) <= tolerance;
      if (retained.length === 0 && !isExcludedCoincidentSelfBoundary) {
        inactiveRootGaps.push({
          lobeIndex: lobe.lobeIndex,
          branch: segmentIndex === 0 ? "rising" : "falling",
          delayAngleInterval: [left, right],
          endpointResiduals: [fLeft, fRight],
          residualGap: Math.min(Math.abs(fLeft), Math.abs(fRight)),
        });
      }
      for (const delayAngle of retained) {
        roots.push({
          lobeIndex: lobe.lobeIndex,
          branch: lobe.peak != null && delayAngle > lobe.peak ? "falling" : "rising",
          delayAngle,
          rootEquationResidual: fn(delayAngle),
        });
      }
    }
  }

  const deduped = [];
  for (const row of roots.sort((left, right) => left.delayAngle - right.delayAngle)) {
    if (deduped.some((prior) => Math.abs(prior.delayAngle - row.delayAngle) <= 20 * tolerance)) continue;
    deduped.push(row);
  }
  return {
    beta: speed,
    phaseDifference: physicalPhaseDifference,
    effectivePhaseDifference: phaseDifference,
    circulationSense,
    sameTransmitter,
    coincidentSelfRootExcluded: sameTransmitter,
    roots: deduped,
    rootCount: deduped.length,
    foldEvents,
    inactiveRootGaps,
    completeDomain: [0, 2 * speed],
    completenessBasis: "concave-absolute-sine-lobe-partition.v1",
  };
}

function rootContribution({ beta, receiverPhase, transmitterPhase, polarityProduct, circulationSense, root }) {
  const emissionPhase = transmitterPhase - circulationSense * root.delayAngle;
  const receiverPosition = [Math.cos(receiverPhase), Math.sin(receiverPhase), 0];
  const transmitterPosition = [Math.cos(emissionPhase), Math.sin(emissionPhase), 0];
  const displacement = receiverPosition.map((value, index) => value - transmitterPosition[index]);
  const separation = Math.hypot(...displacement);
  const direction = displacement.map((value) => value / separation);
  const transmitterVelocity = [
    -circulationSense * beta * Math.sin(emissionPhase),
    circulationSense * beta * Math.cos(emissionPhase),
    0,
  ];
  const receiverVelocity = [
    -circulationSense * beta * Math.sin(receiverPhase),
    circulationSense * beta * Math.cos(receiverPhase),
    0,
  ];
  const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
  const transmitterFactor = 1 - dot(direction, transmitterVelocity);
  const receiverFactor = 1 - dot(direction, receiverVelocity);
  const accelerationWeight = 1 / Math.abs(transmitterFactor);
  const accelerationScale = polarityProduct * accelerationWeight / (separation * separation);
  const acceleration = direction.map((value) => accelerationScale * value);
  return {
    ...root,
    multiplicity: 1,
    emissionLag: root.delayAngle / beta,
    separation,
    transmitterFactor,
    receiverFactor,
    accelerationWeight,
    rootPlayback: receiverFactor / transmitterFactor,
    jacobianFloor: Math.abs(transmitterFactor),
    emissionPhase: wrapPhase(emissionPhase),
    direction,
    acceleration,
    directChordResidual: separation - root.delayAngle / beta,
  };
}

export function evaluatePlanarCoRotatingRing(rawConfiguration = {}) {
  const { phases, polarities, beta } = normalizeConfiguration(rawConfiguration);
  const circulationSense = rawConfiguration.circulationSense ?? 1;
  if (circulationSense !== -1 && circulationSense !== 1) {
    throw new TypeError("circulationSense must be -1 or +1.");
  }
  const rootTolerance = rawConfiguration.rootTolerance ?? DEFAULT_ROOT_TOLERANCE;
  const foldTolerance = rawConfiguration.foldTolerance ?? DEFAULT_FOLD_TOLERANCE;
  const receivers = [];
  const allFoldEvents = [];
  const allInactiveRootGaps = [];
  let maximumRootEquationResidual = 0;
  let maximumDirectChordResidual = 0;
  let minimumJacobianFloor = Number.POSITIVE_INFINITY;

  for (let receiverIndex = 0; receiverIndex < phases.length; receiverIndex += 1) {
    const receiverPhase = phases[receiverIndex];
    const radialBasis = [Math.cos(receiverPhase), Math.sin(receiverPhase), 0];
    const tangentialBasis = [
      -circulationSense * Math.sin(receiverPhase),
      circulationSense * Math.cos(receiverPhase),
      0,
    ];
    const acceleration = [0, 0, 0];
    const directedPairs = [];
    for (let transmitterIndex = 0; transmitterIndex < phases.length; transmitterIndex += 1) {
      const ledger = enumerateCircularPairRoots({
        beta,
        receiverPhase,
        transmitterPhase: phases[transmitterIndex],
        sameTransmitter: receiverIndex === transmitterIndex,
        circulationSense,
        rootTolerance,
        foldTolerance,
      });
      const roots = ledger.roots.map((root, rootOrdinal) => {
        const contribution = rootContribution({
          beta,
          receiverPhase,
          transmitterPhase: phases[transmitterIndex],
          polarityProduct: polarities[receiverIndex] * polarities[transmitterIndex],
          circulationSense,
          root,
        });
        contribution.rootId = `${receiverIndex}<-${transmitterIndex}:lobe-${root.lobeIndex}:${root.branch}:${rootOrdinal}`;
        contribution.receiverIndex = receiverIndex;
        contribution.transmitterIndex = transmitterIndex;
        contribution.polarityProduct = polarities[receiverIndex] * polarities[transmitterIndex];
        for (let axis = 0; axis < 3; axis += 1) acceleration[axis] += contribution.acceleration[axis];
        maximumRootEquationResidual = Math.max(maximumRootEquationResidual, Math.abs(contribution.rootEquationResidual));
        maximumDirectChordResidual = Math.max(maximumDirectChordResidual, Math.abs(contribution.directChordResidual));
        minimumJacobianFloor = Math.min(minimumJacobianFloor, contribution.jacobianFloor);
        return contribution;
      });
      ledger.foldEvents.forEach((event) => allFoldEvents.push({ receiverIndex, transmitterIndex, ...event }));
      ledger.inactiveRootGaps.forEach((gap) => allInactiveRootGaps.push({ receiverIndex, transmitterIndex, ...gap }));
      directedPairs.push({
        receiverIndex,
        transmitterIndex,
        phaseDifference: ledger.phaseDifference,
        coincidentSelfRootExcluded: ledger.coincidentSelfRootExcluded,
        rootCount: roots.length,
        roots,
        foldEvents: ledger.foldEvents,
        inactiveRootGaps: ledger.inactiveRootGaps,
        completenessBasis: ledger.completenessBasis,
      });
    }
    const project = (basis) => acceleration.reduce((sum, value, index) => sum + value * basis[index], 0);
    receivers.push({
      receiverIndex,
      phase: receiverPhase,
      polarity: polarities[receiverIndex],
      radialCoefficient: project(radialBasis),
      tangentialCoefficient: project(tangentialBasis),
      axialCoefficient: acceleration[2],
      acceleration,
      directedPairs,
    });
  }

  const meanRadial = receivers.reduce((sum, row) => sum + row.radialCoefficient, 0) / receivers.length;
  const compatibleScale = meanRadial < 0 ? -meanRadial / (beta * beta) : null;
  const residualRows = receivers.map((row) => {
    const radial = compatibleScale == null ? row.radialCoefficient : row.radialCoefficient + beta * beta * compatibleScale;
    const tangential = row.tangentialCoefficient;
    const axial = row.axialCoefficient;
    return {
      receiverIndex: row.receiverIndex,
      radial,
      tangential,
      axial,
      fullVector: Math.hypot(radial, tangential, axial),
    };
  });
  const maximum = (field) => Math.max(...residualRows.map((row) => Math.abs(row[field])));
  const signature = receivers.map((receiver) => receiver.directedPairs.map((pair) => pair.rootCount).join(",")).join(";");
  const unresolved = allFoldEvents.length > 0 || !Number.isFinite(minimumJacobianFloor);
  return {
    schema: "prescribed-path-analysis/planar-co-rotating-ring-evaluation.v1",
    model: "uncapped-master-equation/emission-site/all-causal-roots.v1",
    units: { c_f: 1, radius: 1, acceleration: "kappa*epsilon^2/R^2" },
    beta,
    circulationSense,
    phases,
    polarities,
    rootTopologySignature: signature,
    rootCount: receivers.reduce((sum, row) => sum + row.directedPairs.reduce((pairSum, pair) => pairSum + pair.rootCount, 0), 0),
    rootCompleteness: {
      complete: !unresolved,
      coincidentSelfRootsExcluded: phases.length,
      nontrivialSameTransmitterRootsIncluded: true,
      foldEvents: allFoldEvents,
      inactiveRootGaps: allInactiveRootGaps,
      minimumJacobianFloor: Number.isFinite(minimumJacobianFloor) ? minimumJacobianFloor : null,
      maximumRootEquationResidual,
      maximumDirectChordResidual,
      basis: "finite chord domain plus concave absolute-sine lobe partition",
    },
    receivers,
    compatibleScale,
    residuals: {
      receiverRows: residualRows,
      maximumRadial: maximum("radial"),
      maximumTangential: maximum("tangential"),
      maximumAxial: maximum("axial"),
      maximumFullVector: maximum("fullVector"),
    },
    verdict: unresolved ? "unresolved" : "evaluated",
  };
}

export function regularRingPhases(n) {
  if (!Number.isSafeInteger(n) || n < 1) throw new TypeError("n must be a positive integer.");
  return Array.from({ length: 2 * n }, (_, index) => index * Math.PI / n);
}

function polarityWord(polarities) {
  return polarities.map((value) => value > 0 ? "+" : "-").join("");
}

function rotateWord(word, offset) {
  return word.slice(offset) + word.slice(0, offset);
}

function conjugateWord(word) {
  return [...word].map((value) => value === "+" ? "-" : "+").join("");
}

function reflectWord(word) {
  return word[0] + [...word.slice(1)].reverse().join("");
}

export function canonicalPolarityOrbit(polarities, { includeReflection = true } = {}) {
  const word = polarityWord(polarities);
  const seeds = includeReflection ? [word, reflectWord(word)] : [word];
  const orbit = new Set();
  for (const seed of seeds) {
    for (const conjugated of [seed, conjugateWord(seed)]) {
      for (let offset = 0; offset < word.length; offset += 1) orbit.add(rotateWord(conjugated, offset));
    }
  }
  return { canonicalWord: [...orbit].sort()[0], orbit: [...orbit].sort() };
}

export function enumerateBalancedPolarityClasses(n, { includeReflection = true } = {}) {
  if (!Number.isSafeInteger(n) || n < 1 || n > 15) throw new TypeError("n must be an integer in [1,15].");
  const memberCount = 2 * n;
  const classes = new Map();
  for (let mask = 0; mask < 2 ** memberCount; mask += 1) {
    const polarities = Array.from({ length: memberCount }, (_, index) => (mask & (1 << index)) ? 1 : -1);
    if (polarities.filter((value) => value > 0).length !== n) continue;
    const orbit = canonicalPolarityOrbit(polarities, { includeReflection });
    if (!classes.has(orbit.canonicalWord)) {
      const canonicalPolarities = [...orbit.canonicalWord].map((value) => value === "+" ? 1 : -1);
      const alternating = canonicalPolarities.every((value, index) => value === canonicalPolarities[0] * (index % 2 === 0 ? 1 : -1));
      const allAntipodesNeutral = canonicalPolarities.every((value, index) =>
        index >= n || canonicalPolarities[index + n] === -value);
      classes.set(orbit.canonicalWord, {
        classId: `n${n}-${orbit.canonicalWord.replaceAll("+", "p").replaceAll("-", "m")}`,
        canonicalWord: orbit.canonicalWord,
        polarities: canonicalPolarities,
        orbitSize: orbit.orbit.length,
        alternating,
        allAntipodesNeutral,
        subclass: alternating ? "alternating" : allAntipodesNeutral ? "antipodal-neutral" : "remaining-balanced",
      });
    }
  }
  return [...classes.values()].sort((left, right) => left.canonicalWord.localeCompare(right.canonicalWord));
}

export function classifyPlanarRingTaxonomy({ n, phases, polarities, tolerance = 1e-10 } = {}) {
  if (!Number.isSafeInteger(n) || n < 1 || phases?.length !== 2 * n || polarities?.length !== 2 * n) {
    throw new TypeError("taxonomy classification requires n and exactly 2n phases and polarities.");
  }
  const antipodalPartners = phases.map((phase, index) => {
    let match = -1;
    for (let other = 0; other < phases.length; other += 1) {
      if (other === index) continue;
      if (Math.abs(angularDistance(phase, phases[other]) - Math.PI) <= tolerance) {
        if (match !== -1) return -2;
        match = other;
      }
    }
    return match;
  });
  const allAntipodesExist = antipodalPartners.every((index) => index >= 0);
  const allAntipodesNeutral = allAntipodesExist && antipodalPartners.every((partner, index) => polarities[partner] === -polarities[index]);
  if (n === 3 && allAntipodesNeutral) {
    return {
      classification: "B1.3 equal-radius planar locus",
      memberId: "B1.3",
      coordinateMappingEstablished: true,
      scope: "equal-radius antipodal-neutral common-center common-axis common-frequency common-circulation locus",
      antipodalPartners,
      allAntipodesNeutral,
    };
  }
  return {
    classification: n === 6 && allAntipodesNeutral
      ? "twelve-member shared-circle assembly; not C5/C6 because d_C=0"
      : `${n}:${n} shared-circle assembly outside B1.3 inventory`,
    memberId: null,
    coordinateMappingEstablished: false,
    scope: "planar equal-radius common-circle prescribed assembly",
    antipodalPartners,
    allAntipodesNeutral,
  };
}

export function verifyRotationCovariance({ phases, polarities, beta, rotation = 0.371 } = {}) {
  const base = evaluatePlanarCoRotatingRing({ phases, polarities, beta });
  const rotated = evaluatePlanarCoRotatingRing({
    phases: phases.map((phase) => phase + rotation),
    polarities,
    beta,
  });
  const maximumProjectionDifference = Math.max(...base.receivers.flatMap((receiver, index) => [
    Math.abs(receiver.radialCoefficient - rotated.receivers[index].radialCoefficient),
    Math.abs(receiver.tangentialCoefficient - rotated.receivers[index].tangentialCoefficient),
    Math.abs(receiver.axialCoefficient - rotated.receivers[index].axialCoefficient),
  ]));
  return {
    rotation,
    rootTopologyMatch: base.rootTopologySignature === rotated.rootTopologySignature,
    maximumProjectionDifference,
    passed: base.rootTopologySignature === rotated.rootTopologySignature && maximumProjectionDifference <= 2e-10,
  };
}

export function verifyReflectionCovariance({ phases, polarities, beta } = {}) {
  const base = evaluatePlanarCoRotatingRing({ phases, polarities, beta });
  const reflected = evaluatePlanarCoRotatingRing({
    phases: phases.map((phase) => -phase),
    polarities,
    beta,
    circulationSense: -1,
  });
  const maximumEvenDifference = Math.max(...base.receivers.flatMap((receiver, index) => [
    Math.abs(receiver.radialCoefficient - reflected.receivers[index].radialCoefficient),
    Math.abs(receiver.axialCoefficient - reflected.receivers[index].axialCoefficient),
  ]));
  const maximumOddDifference = Math.max(...base.receivers.map((receiver, index) =>
    Math.abs(receiver.tangentialCoefficient - reflected.receivers[index].tangentialCoefficient)));
  return {
    transformation: "reflection-plus-circulation-reversal",
    rootTopologyMatch: base.rootTopologySignature === reflected.rootTopologySignature,
    maximumEvenDifference,
    maximumOddDifference,
    passed: base.rootTopologySignature === reflected.rootTopologySignature &&
      maximumEvenDifference <= 2e-10 && maximumOddDifference <= 2e-10,
  };
}
