import fs from "node:fs";
import path from "node:path";
import {
  f6cAssemblyCurrentDecomposition,
  f6cCurrentCoefficient,
} from "./f6c-current-transport.mjs";

// Report-grade coordinate extractor for an F6c run emitted by the accepted
// EOM attractor harness. It measures geometry; it does not adjudicate
// retention, stability, or particle identity.

const outDirectory = process.argv[2];
const releaseCapacityOnly = process.argv.includes("--release-capacity-only");
if (!outDirectory) {
  throw new TypeError("usage: node f6c-eom-coordinate-analysis.mjs OUT_DIR");
}

const axes = [
  [1, 1, 1],
  [1, -1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
].map((value) => value.map((entry) => entry / Math.sqrt(3)));
const circulationSigns = [-1, -1, 1, 1];
const phases = [0, Math.PI, 4 * Math.PI / 3, Math.PI / 3];
const TWO_PI = 2 * Math.PI;

function vector(value) {
  return Array.isArray(value) ? value : [value.x, value.y, value.z];
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function multiply(value, scalar) {
  return value.map((entry) => entry * scalar);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(value) {
  return Math.hypot(...value);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function unit(value) {
  return multiply(value, 1 / norm(value));
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function rms(values) {
  return Math.sqrt(mean(values.map((value) => value ** 2)));
}

function spread(values) {
  return Math.max(...values) - Math.min(...values);
}

function wrap(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

function circularMean(values) {
  return Math.atan2(
    mean(values.map(Math.sin)),
    mean(values.map(Math.cos)),
  );
}

const localFrames = axes.map((axis) => {
  const localU = unit(cross([0, 0, 1], axis));
  return { u: localU, v: cross(axis, localU) };
});

const manifest = JSON.parse(fs.readFileSync(
  path.join(outDirectory, "run-manifest.json"),
  "utf8",
));
if (manifest.seedFamily !== "f6c-balanced-tetrahedral-v1") {
  throw new TypeError("run manifest is not the F6c seed family");
}
const idsByPathKey = manifest.seeds.map((seed) => seed.pathId);
const frameRows = fs.readFileSync(path.join(outDirectory, "frames.jsonl"), "utf8")
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const frames = new Map();
for (const row of frameRows) {
  const rows = frames.get(row.frameIndex) ?? [];
  rows.push({ ...row, id: idsByPathKey[row.pathKey - 1] });
  frames.set(row.frameIndex, rows);
}

function stateCoordinates(frameRowsAtTime) {
  const sectorResults = {};
  let positionResidualSquared = 0;
  let velocityResidualSquared = 0;
  let positionNormSquared = 0;
  let velocityNormSquared = 0;
  for (const polarity of [1, -1]) {
    const rows = frameRowsAtTime
      .filter((row) => row.id.endsWith(polarity > 0 ? "+" : "-"))
      .sort((left, right) => Number.parseInt(left.id, 10) - Number.parseInt(right.id, 10));
    const members = rows.map((row) => {
      const module = Number.parseInt(row.id, 10);
      const axis = axes[module];
      const { u, v } = localFrames[module];
      const position = vector(row.position);
      const velocity = vector(row.velocity);
      const h = polarity * dot(position, axis);
      const radialVector = subtract(position, multiply(axis, polarity * h));
      const rho = norm(radialVector);
      const radialUnit = multiply(radialVector, 1 / rho);
      const tangentUnit = cross(axis, radialUnit);
      const psi = Math.atan2(dot(radialUnit, v), dot(radialUnit, u));
      const theta = wrap(
        (psi - phases[module]) / (polarity * circulationSigns[module]),
      );
      return {
        module,
        position,
        velocity,
        h,
        rho,
        theta,
        hDot: polarity * dot(velocity, axis),
        rhoDot: dot(velocity, radialUnit),
        thetaDot:
          dot(velocity, multiply(tangentUnit, polarity * circulationSigns[module]))
          / rho,
      };
    });
    const h = mean(members.map((member) => member.h));
    const rho = mean(members.map((member) => member.rho));
    const theta = circularMean(members.map((member) => member.theta));
    const hDot = mean(members.map((member) => member.hDot));
    const rhoDot = mean(members.map((member) => member.rhoDot));
    const thetaDot = mean(members.map((member) => member.thetaDot));
    const coordinateSpeedComponentsSquared = {
      axial: hDot ** 2,
      radial: rhoDot ** 2,
      tangential: (rho * thetaDot) ** 2,
    };
    const coordinateSpeedSquared = Object.values(
      coordinateSpeedComponentsSquared,
    ).reduce((sum, value) => sum + value, 0);
    const measuredMemberSpeeds = members.map((member) => norm(member.velocity));
    const sectorName = polarity > 0 ? "positive" : "negative";
    const currentCoefficientVector = f6cCurrentCoefficient(sectorName, {
      h,
      rho,
      theta,
    });
    const currentRateVector = [hDot, rhoDot, rho * thetaDot];
    const currentFactor = polarity > 0 ? -4 / 3 : 4 / 3;
    const currentContributionBySpeedComponent = Object.fromEntries(
      ["axial", "radial", "tangential"].map((component, index) => [
        component,
        currentFactor
          * currentCoefficientVector[index]
          * currentRateVector[index],
      ]),
    );
    const predictedSectorCurrentX = currentFactor
      * dot(currentCoefficientVector, currentRateVector);
    const currentCoefficientNorm = norm(currentCoefficientVector);
    const currentCapacityAtUnitSpeed = (4 / 3) * currentCoefficientNorm;
    const measuredSectorCurrentMoment = members.reduce(
      (sum, member) => add(
        sum,
        multiply(cross(member.position, member.velocity), polarity),
      ),
      [0, 0, 0],
    );
    for (const member of members) {
      const axis = axes[member.module];
      const { u, v } = localFrames[member.module];
      const psi = polarity * circulationSigns[member.module] * theta
        + phases[member.module];
      const radialUnit = add(multiply(u, Math.cos(psi)), multiply(v, Math.sin(psi)));
      const tangentUnit = add(multiply(u, -Math.sin(psi)), multiply(v, Math.cos(psi)));
      const predictedPosition = add(
        multiply(axis, polarity * h),
        multiply(radialUnit, rho),
      );
      const predictedVelocity = add(
        add(
          multiply(axis, polarity * hDot),
          multiply(radialUnit, rhoDot),
        ),
        multiply(
          tangentUnit,
          rho * polarity * circulationSigns[member.module] * thetaDot,
        ),
      );
      positionResidualSquared += norm(subtract(member.position, predictedPosition)) ** 2;
      velocityResidualSquared += norm(subtract(member.velocity, predictedVelocity)) ** 2;
      positionNormSquared += norm(member.position) ** 2;
      velocityNormSquared += norm(member.velocity) ** 2;
    }
    sectorResults[polarity > 0 ? "positive" : "negative"] = {
      h,
      rho,
      theta,
      hDot,
      rhoDot,
      thetaDot,
      coordinateSpeedBudget: {
        componentsSquared: coordinateSpeedComponentsSquared,
        totalSquared: coordinateSpeedSquared,
        memberSpeed: Math.sqrt(coordinateSpeedSquared),
        componentFractions: Object.fromEntries(Object.entries(
          coordinateSpeedComponentsSquared,
        ).map(([component, value]) => [
          component,
          coordinateSpeedSquared === 0 ? 0 : value / coordinateSpeedSquared,
        ])),
        measuredMemberSpeedRange: [
          Math.min(...measuredMemberSpeeds),
          Math.max(...measuredMemberSpeeds),
        ],
        maximumFormulaResidual: Math.max(...measuredMemberSpeeds.map(
          (value) => Math.abs(value - Math.sqrt(coordinateSpeedSquared)),
        )),
      },
      currentCapacity: {
        coefficientVectorInSpeedFrame: currentCoefficientVector,
        contributionBySpeedComponent: currentContributionBySpeedComponent,
        coefficientNorm: currentCoefficientNorm,
        unitSpeedCapacity: currentCapacityAtUnitSpeed,
        predictedAxialCurrentMoment: predictedSectorCurrentX,
        measuredCurrentMoment: measuredSectorCurrentMoment,
        formulaResidual: norm(subtract(
          measuredSectorCurrentMoment,
          [predictedSectorCurrentX, 0, 0],
        )),
        alignmentFractionAtCurrentSpeed:
          currentCapacityAtUnitSpeed * Math.sqrt(coordinateSpeedSquared) === 0
            ? 0
            : Math.abs(predictedSectorCurrentX)
              / (currentCapacityAtUnitSpeed * Math.sqrt(coordinateSpeedSquared)),
      },
      memberSpread: {
        h: spread(members.map((member) => member.h)),
        rho: spread(members.map((member) => member.rho)),
        theta: spread(members.map((member) => wrap(member.theta - theta))),
        hDot: spread(members.map((member) => member.hDot)),
        rhoDot: spread(members.map((member) => member.rhoDot)),
        thetaDot: spread(members.map((member) => member.thetaDot)),
      },
    };
  }

  const positions = frameRowsAtTime.map((row) => vector(row.position));
  const velocities = frameRowsAtTime.map((row) => vector(row.velocity));
  const pairRows = [];
  for (let left = 0; left < frameRowsAtTime.length; left += 1) {
    for (let right = left + 1; right < frameRowsAtTime.length; right += 1) {
      const leftRow = frameRowsAtTime[left];
      const rightRow = frameRowsAtTime[right];
      const separation = subtract(
        vector(leftRow.position),
        vector(rightRow.position),
      );
      const relativeVelocity = subtract(
        vector(leftRow.velocity),
        vector(rightRow.velocity),
      );
      const distance = norm(separation);
      pairRows.push({
        ids: [leftRow.id, rightRow.id],
        polarityClass:
          leftRow.id.at(-1) === rightRow.id.at(-1)
            ? "same-polarity"
            : "opposite-polarity",
        distance,
        distanceRate: dot(separation, relativeVelocity) / distance,
      });
    }
  }
  pairRows.sort((left, right) => left.distance - right.distance);
  const minimumPair = {
    ...pairRows[0],
    symmetryEquivalentPairs: pairRows
      .filter((row) => Math.abs(row.distance - pairRows[0].distance)
        <= Math.max(1e-12, 1e-10 * pairRows[0].distance))
      .map((row) => row.ids),
  };
  const negative = sectorResults.negative;
  const expectedTwoEdgeSquared = (4 / 9) * (
    (Math.sqrt(3) * negative.h
      - Math.sqrt(6) * negative.rho * Math.sin(negative.theta)) ** 2
    + (Math.sqrt(3) * negative.h
      - Math.sqrt(6) * negative.rho
        * Math.cos(negative.theta + Math.PI / 6)) ** 2
  );
  const expectedFourEdgeSquared = (8 / 3) * negative.h ** 2
    + (4 * Math.sqrt(2) / 3) * negative.h * negative.rho
      * Math.sin(negative.theta + Math.PI / 3)
    + (2 / 3) * negative.rho ** 2
      * Math.sin(2 * negative.theta + Math.PI / 6)
    + (8 / 3) * negative.rho ** 2;
  const negativePairRows = pairRows.filter((row) =>
    row.ids[0].endsWith("-") && row.ids[1].endsWith("-"));
  const twoEdgeKeys = new Set(["0-,1-", "2-,3-"]);
  const measuredTwoEdge = negativePairRows.filter((row) =>
    twoEdgeKeys.has([...row.ids].sort().join(",")));
  const measuredFourEdge = negativePairRows.filter((row) =>
    !twoEdgeKeys.has([...row.ids].sort().join(",")));
  const negativeEdgeOrbits = {
    twoEdge: {
      expectedDistance: Math.sqrt(Math.max(0, expectedTwoEdgeSquared)),
      measuredRange: [
        Math.min(...measuredTwoEdge.map((row) => row.distance)),
        Math.max(...measuredTwoEdge.map((row) => row.distance)),
      ],
    },
    fourEdge: {
      expectedDistance: Math.sqrt(Math.max(0, expectedFourEdgeSquared)),
      measuredRange: [
        Math.min(...measuredFourEdge.map((row) => row.distance)),
        Math.max(...measuredFourEdge.map((row) => row.distance)),
      ],
    },
  };
  for (const orbit of Object.values(negativeEdgeOrbits)) {
    orbit.maximumFormulaResidual = Math.max(
      ...orbit.measuredRange.map((value) =>
        Math.abs(value - orbit.expectedDistance)),
    );
  }
  const positive = sectorResults.positive;
  const expectedCrossEdgeSquared = positive.h ** 2
    - (2 / 3) * positive.h * negative.h
    + negative.h ** 2
    + (4 * Math.sqrt(2) / 3) * positive.h * negative.rho
      * Math.sin(negative.theta + Math.PI / 3)
    - (4 * Math.sqrt(2) / 3) * negative.h * positive.rho
      * Math.cos(positive.theta + Math.PI / 6)
    + positive.rho ** 2
    + negative.rho ** 2
    - (4 / 3) * positive.rho * negative.rho
      * Math.sin(positive.theta) * Math.sin(negative.theta)
    + (2 * Math.sqrt(3) / 3) * positive.rho * negative.rho
      * Math.sin(positive.theta - negative.theta);
  const crossEdgeKeys = new Set([
    "0+,1-", "0-,1+", "2+,3-", "2-,3+",
  ]);
  const measuredCrossEdge = pairRows.filter((row) =>
    crossEdgeKeys.has([...row.ids].sort().join(",")));
  const oppositePolarityEdgeOrbit = {
    expectedDistance: Math.sqrt(Math.max(0, expectedCrossEdgeSquared)),
    measuredRange: [
      Math.min(...measuredCrossEdge.map((row) => row.distance)),
      Math.max(...measuredCrossEdge.map((row) => row.distance)),
    ],
  };
  oppositePolarityEdgeOrbit.maximumFormulaResidual = Math.max(
    ...oppositePolarityEdgeOrbit.measuredRange.map((value) =>
      Math.abs(value - oppositePolarityEdgeOrbit.expectedDistance)),
  );
  const centroid = multiply(
    positions.reduce(add, [0, 0, 0]),
    1 / positions.length,
  );
  const dipole = frameRowsAtTime.reduce(
    (sum, row) => add(sum, multiply(
      vector(row.position),
      row.id.endsWith("+") ? 1 : -1,
    )),
    [0, 0, 0],
  );
  const currentMoment = frameRowsAtTime.reduce(
    (sum, row) => add(sum, multiply(
      cross(subtract(vector(row.position), centroid), vector(row.velocity)),
      row.id.endsWith("+") ? 1 : -1,
    )),
    [0, 0, 0],
  );
  const assemblyCurrentDecomposition = f6cAssemblyCurrentDecomposition(
    sectorResults,
  );
  return {
    time: frameRowsAtTime[0].time,
    sectors: sectorResults,
    normalizedManifoldResidual: {
      position: Math.sqrt(positionResidualSquared / positionNormSquared),
      velocity: Math.sqrt(velocityResidualSquared / velocityNormSquared),
    },
    centroid,
    centroidNorm: norm(centroid),
    dipole,
    dipoleNorm: norm(dipole),
    currentMoment,
    assemblyCurrentDecomposition,
    currentAxisOffXFraction:
      Math.hypot(currentMoment[1], currentMoment[2]) / norm(currentMoment),
    maximumFrameErrorBound: Math.max(
      ...frameRowsAtTime.map((row) => row.errorBound),
    ),
    maximumMemberSpeed: Math.max(...velocities.map(norm)),
    minimumPair,
    negativeEdgeOrbits,
    oppositePolarityEdgeOrbit,
  };
}

const coordinateFrames = [...frames]
  .sort(([left], [right]) => left - right)
  .map(([, rows]) => stateCoordinates(rows));
for (const sector of ["positive", "negative"]) {
  let previous = null;
  for (const frame of coordinateFrames) {
    let lifted = frame.sectors[sector].theta;
    if (previous !== null) {
      while (lifted - previous > Math.PI) lifted -= TWO_PI;
      while (lifted - previous < -Math.PI) lifted += TWO_PI;
    }
    frame.sectors[sector].theta = lifted;
    previous = lifted;
  }
}
for (const frame of coordinateFrames) {
  const positive = frame.sectors.positive;
  const negative = frame.sectors.negative;
  frame.conjugationCoordinates = Object.fromEntries(
    ["h", "rho", "theta", "hDot", "rhoDot", "thetaDot"].map(
      (coordinate) => [coordinate, {
        even: (positive[coordinate] + negative[coordinate]) / 2,
        odd: (positive[coordinate] - negative[coordinate]) / 2,
      }],
    ),
  );
}

function wrappedPhaseDifference(value) {
  let result = value;
  while (result <= -Math.PI) result += TWO_PI;
  while (result > Math.PI) result -= TWO_PI;
  return result;
}

function returnActionResidual(frame, action) {
  const initial = coordinateFrames[0];
  const componentResiduals = {};
  for (const sector of ["positive", "negative"]) {
    const slope = action[sector].slope;
    const phaseOffset = action[sector].phaseOffset;
    const state = frame.sectors[sector];
    const initialState = initial.sectors[sector];
    componentResiduals[sector] = {
      h: state.h - initialState.h,
      rho: state.rho - initialState.rho,
      theta: wrappedPhaseDifference(
        state.theta - (slope * initialState.theta + phaseOffset),
      ),
      hDot: state.hDot - initialState.hDot,
      rhoDot: state.rhoDot - initialState.rhoDot,
      thetaDot: state.thetaDot - slope * initialState.thetaDot,
    };
  }
  const residuals = Object.values(componentResiduals)
    .flatMap((sector) => Object.values(sector));
  return {
    componentResiduals,
    rms: Math.sqrt(
      residuals.reduce((sum, value) => sum + value ** 2, 0)
        / residuals.length,
    ),
    maximum: Math.max(...residuals.map(Math.abs)),
    nearestPhaseWinding: {
      positive: Math.round(
        (
          frame.sectors.positive.theta
          - action.positive.slope
            * coordinateFrames[0].sectors.positive.theta
          - action.positive.phaseOffset
        ) / TWO_PI,
      ),
      negative: Math.round(
        (
          frame.sectors.negative.theta
          - action.negative.slope
            * coordinateFrames[0].sectors.negative.theta
          - action.negative.phaseOffset
        ) / TWO_PI,
      ),
    },
  };
}

const properReturnActions = {
  direct: {
    positive: { slope: 1, phaseOffset: 0 },
    negative: { slope: 1, phaseOffset: 0 },
  },
  reflected: {
    positive: { slope: -1, phaseOffset: -Math.PI / 3 },
    negative: { slope: -1, phaseOffset: Math.PI / 3 },
  },
};
for (const frame of coordinateFrames) {
  frame.properRotationReturnResidual = Object.fromEntries(
    Object.entries(properReturnActions).map(([name, action]) => [
      name,
      returnActionResidual(frame, action),
    ]),
  );
}

const stateCoordinateNames = [
  "h", "rho", "theta", "hDot", "rhoDot", "thetaDot",
];

function interpolateSectorState(left, right, fraction) {
  return Object.fromEntries(["positive", "negative"].map((sector) => [
    sector,
    Object.fromEntries(stateCoordinateNames.map((coordinate) => [
      coordinate,
      left.sectors[sector][coordinate] + fraction * (
        right.sectors[sector][coordinate]
          - left.sectors[sector][coordinate]
      ),
    ])),
  ]));
}

function allSignChanges(sector, derivative) {
  let previous = null;
  const changes = [];
  for (const frame of coordinateFrames) {
    const value = frame.sectors[sector][derivative];
    if (Math.abs(value) < 1e-12) continue;
    if (previous && Math.sign(value) !== Math.sign(previous.value)) {
      const fraction = -previous.value / (value - previous.value);
      const state = interpolateSectorState(previous.frame, frame, fraction);
      state[sector][derivative] = 0;
      changes.push({
        bracket: [previous.time, frame.time],
        linearlyInterpolatedTime:
          previous.time + fraction * (frame.time - previous.time),
        before: previous.value,
        after: value,
        direction: previous.value > 0
          ? "positive-to-negative" : "negative-to-positive",
        interpolationFraction: fraction,
        state,
      });
    }
    previous = { time: frame.time, value, frame };
  }
  return changes;
}

function firstSignChange(sector, derivative) {
  return allSignChanges(sector, derivative)[0] ?? null;
}

function initialLevelReturnCrossings(sectionSector, coordinate) {
  const target = coordinateFrames[0].sectors[sectionSector][coordinate];
  const crossings = [];
  let previous = coordinateFrames[0];
  let armed = false;
  let maximumAbsoluteSectionExcursionSinceRelease = 0;
  for (const frame of coordinateFrames.slice(1)) {
    const previousDelta = previous.sectors[sectionSector][coordinate] - target;
    const delta = frame.sectors[sectionSector][coordinate] - target;
    maximumAbsoluteSectionExcursionSinceRelease = Math.max(
      maximumAbsoluteSectionExcursionSinceRelease,
      Math.abs(delta),
    );
    if (!armed) {
      if (Math.abs(delta) > 1e-10) armed = true;
      previous = frame;
      continue;
    }
    if (previousDelta * delta <= 0 && Math.sign(previousDelta) !== Math.sign(delta)) {
      const fraction = -previousDelta / (delta - previousDelta);
      const interpolatedState = interpolateSectorState(
        previous,
        frame,
        fraction,
      );
      crossings.push({
        bracket: [previous.time, frame.time],
        linearlyInterpolatedTime:
          previous.time + fraction * (frame.time - previous.time),
        flightTime:
          previous.time + fraction * (frame.time - previous.time)
            - coordinateFrames[0].time,
        direction: delta < previousDelta ? "decreasing" : "increasing",
        maximumAbsoluteSectionExcursionSinceRelease,
        state: interpolatedState,
        finalMinusInitial: Object.fromEntries(
          ["positive", "negative"].map((sector) => [sector, Object.fromEntries(
            stateCoordinateNames.map((entry) => [entry,
              interpolatedState[sector][entry]
                - coordinateFrames[0].sectors[sector][entry],
            ]),
          )]),
        ),
      });
      const crossing = crossings.at(-1);
      const remainingResiduals = ["positive", "negative"].flatMap((sector) =>
        stateCoordinateNames.filter((entry) =>
          sector !== sectionSector || entry !== coordinate)
          .map((entry) => crossing.finalMinusInitial[sector][entry]),
      );
      crossing.remainingCoordinateRateResidualRms = Math.sqrt(
        remainingResiduals.reduce((sum, value) => sum + value ** 2, 0)
          / remainingResiduals.length,
      );
      crossing.remainingCoordinateRateResidualMaximum = Math.max(
        ...remainingResiduals.map(Math.abs),
      );
      crossing.liftedPhaseAdvance = {
        positive: crossing.finalMinusInitial.positive.theta,
        negative: crossing.finalMinusInitial.negative.theta,
      };
      crossing.properRotationReturnResidual = Object.fromEntries(
        Object.entries(properReturnActions).map(([name, action]) => [
          name,
          returnActionResidual({ sectors: interpolatedState }, action),
        ]),
      );
    }
    previous = frame;
  }
  return crossings;
}

function extreme(sector, coordinate, comparison) {
  return coordinateFrames.reduce((selected, frame) => {
    if (!selected || comparison(
      frame.sectors[sector][coordinate],
      selected.value,
    )) {
      return { time: frame.time, value: frame.sectors[sector][coordinate] };
    }
    return selected;
  }, null);
}

const censusPath = path.join(outDirectory, "census.jsonl");
const censusRows = fs.existsSync(censusPath)
  ? fs.readFileSync(censusPath, "utf8").trim().split("\n").filter(Boolean)
      .map((line) => JSON.parse(line))
  : [];
const rootPressureValues = censusRows
  .map((row) => row.engine.maximumRootTimePressureRatio)
  .filter(Number.isFinite);
const transmitterFactorMagnitudeValues = censusRows
  .map((row) => row.engine.minimumTransmitterFactorMagnitude)
  .filter(Number.isFinite);
const directReturnByWinding = new Map();
let minimumReflectedReturn = null;
for (const frame of coordinateFrames.slice(1)) {
  const direct = frame.properRotationReturnResidual.direct;
  const windingKey =
    String(direct.nearestPhaseWinding.positive) + ","
    + String(direct.nearestPhaseWinding.negative);
  const prior = directReturnByWinding.get(windingKey);
  if (!prior || direct.rms < prior.rms) {
    directReturnByWinding.set(windingKey, {
      time: frame.time,
      winding: direct.nearestPhaseWinding,
      rms: direct.rms,
      maximum: direct.maximum,
      componentResiduals: direct.componentResiduals,
    });
  }
  const reflected = frame.properRotationReturnResidual.reflected;
  if (!minimumReflectedReturn || reflected.rms < minimumReflectedReturn.rms) {
    minimumReflectedReturn = {
      time: frame.time,
      winding: reflected.nearestPhaseWinding,
      rms: reflected.rms,
      maximum: reflected.maximum,
      componentResiduals: reflected.componentResiduals,
    };
  }
}
const trajectorySummary = {
  acceptedTimeRange: [
    coordinateFrames[0]?.time ?? null,
    coordinateFrames.at(-1)?.time ?? null,
  ],
  turns: Object.fromEntries(["positive", "negative"].map((sector) => [
    sector,
    {
      axial: firstSignChange(sector, "hDot"),
      radial: firstSignChange(sector, "rhoDot"),
      phase: firstSignChange(sector, "thetaDot"),
    },
  ])),
  turnSequences: Object.fromEntries(["positive", "negative"].map((sector) => [
    sector,
    {
      axial: allSignChanges(sector, "hDot"),
      radial: allSignChanges(sector, "rhoDot"),
      phase: allSignChanges(sector, "thetaDot"),
    },
  ])),
  initialLevelReturnCrossings: Object.fromEntries(
    ["positive", "negative"].map((sector) => [sector, {
      axial: initialLevelReturnCrossings(sector, "h"),
      radial: initialLevelReturnCrossings(sector, "rho"),
    }]),
  ),
  properRotationReturnDiagnostics: {
    directByNearestWinding: [...directReturnByWinding.values()].sort(
      (left, right) =>
        left.winding.positive - right.winding.positive
        || left.winding.negative - right.winding.negative,
    ),
    minimumReflected: minimumReflectedReturn,
    identityBoundary:
      "direct preserves ordered sector phase; reflected uses a proper "
      + "rotation plus same-polarity module permutation, reverses cadence, "
      + "and flips the axial current direction; two reflected actions restore it",
  },
  extrema: Object.fromEntries(["positive", "negative"].map((sector) => [
    sector,
    {
      hMinimum: extreme(sector, "h", (value, selected) => value < selected),
      hMaximum: extreme(sector, "h", (value, selected) => value > selected),
      rhoMinimum: extreme(sector, "rho", (value, selected) => value < selected),
      rhoMaximum: extreme(sector, "rho", (value, selected) => value > selected),
      thetaDotMinimum: extreme(
        sector,
        "thetaDot",
        (value, selected) => value < selected,
      ),
      thetaDotMaximum: extreme(
        sector,
        "thetaDot",
        (value, selected) => value > selected,
      ),
    },
  ])),
  maximumNormalizedManifoldResidual: {
    position: Math.max(...coordinateFrames.map(
      (frame) => frame.normalizedManifoldResidual.position,
    )),
    velocity: Math.max(...coordinateFrames.map(
      (frame) => frame.normalizedManifoldResidual.velocity,
    )),
  },
  maximumCentroidNorm: Math.max(...coordinateFrames.map(
    (frame) => frame.centroidNorm,
  )),
  maximumDipoleNorm: Math.max(...coordinateFrames.map(
    (frame) => frame.dipoleNorm,
  )),
  maximumCurrentAxisOffXFraction: Math.max(...coordinateFrames.map(
    (frame) => frame.currentAxisOffXFraction,
  )),
  minimumCurrentMomentAbsoluteX: coordinateFrames.reduce(
    (selected, frame) => !selected
      || Math.abs(frame.currentMoment[0]) < Math.abs(selected.value)
      ? { time: frame.time, value: frame.currentMoment[0] }
      : selected,
    null,
  ),
  maximumMemberSpeed: Math.max(...coordinateFrames.map(
    (frame) => frame.maximumMemberSpeed,
  )),
  maximumSectorCoordinateSpeed: coordinateFrames.flatMap((frame) =>
    ["positive", "negative"].map((sector) => ({
      time: frame.time,
      sector,
      ...frame.sectors[sector].coordinateSpeedBudget,
    }))).reduce((selected, row) =>
    row.memberSpeed > selected.memberSpeed ? row : selected),
  maximumCoordinateSpeedFormulaResidual: Math.max(
    ...coordinateFrames.flatMap((frame) =>
      ["positive", "negative"].map((sector) =>
        frame.sectors[sector].coordinateSpeedBudget.maximumFormulaResidual)),
  ),
  maximumSectorCurrentCapacityFormulaResidual: Math.max(
    ...coordinateFrames.flatMap((frame) =>
      ["positive", "negative"].map((sector) =>
        frame.sectors[sector].currentCapacity.formulaResidual)),
  ),
  assemblyCurrentDecomposition: {
    minimumEfficiency: coordinateFrames.reduce((selected, frame) => {
      const value = frame.assemblyCurrentDecomposition.currentEfficiency;
      return !selected || value < selected.value
        ? { time: frame.time, value }
        : selected;
    }, null),
    maximumEfficiency: coordinateFrames.reduce((selected, frame) => {
      const value = frame.assemblyCurrentDecomposition.currentEfficiency;
      return !selected || value > selected.value
        ? { time: frame.time, value }
        : selected;
    }, null),
    maximumOrthogonalityResidual: Math.max(...coordinateFrames.map(
      (frame) => Math.abs(
        frame.assemblyCurrentDecomposition.orthogonalityResidual,
      ),
    )),
    maximumPythagoreanResidual: Math.max(...coordinateFrames.map(
      (frame) => Math.abs(
        frame.assemblyCurrentDecomposition.pythagoreanResidual,
      ),
    )),
  },
  minimumPairDistanceInAcceptedChunks: censusRows.length > 0
    ? censusRows.reduce((selected, row) =>
      row.minPairDistanceInChunk < selected.value
        ? { time: Number(row.time), value: row.minPairDistanceInChunk }
        : selected,
    { time: Number(censusRows[0].time), value: censusRows[0].minPairDistanceInChunk })
    : null,
  minimumResolvedFramePair: coordinateFrames.reduce(
    (selected, frame) => !selected
      || frame.minimumPair.distance < selected.distance
      ? { time: frame.time, ...frame.minimumPair }
      : selected,
    null,
  ),
  maximumNegativeEdgeFormulaResidual: Math.max(
    ...coordinateFrames.flatMap((frame) => [
      frame.negativeEdgeOrbits.twoEdge.maximumFormulaResidual,
      frame.negativeEdgeOrbits.fourEdge.maximumFormulaResidual,
    ]),
  ),
  maximumOppositePolarityEdgeFormulaResidual: Math.max(
    ...coordinateFrames.map((frame) =>
      frame.oppositePolarityEdgeOrbit.maximumFormulaResidual),
  ),
  maximumMpfrPairsInChunk: censusRows.length > 0
    ? Math.max(...censusRows.map((row) => row.engine.mpfrPairs))
    : null,
  causalRootGuardByChunk: censusRows.map((row) => ({
    time: Number(row.time),
    maximumRootTimePressureRatio:
      row.engine.maximumRootTimePressureRatio ?? null,
    minimumTransmitterFactorMagnitude:
      row.engine.minimumTransmitterFactorMagnitude ?? null,
    minimumSamePolarityRootGap:
      row.engine.minimumSamePolarityRootGap ?? null,
    minimumOppositePolarityRootGap:
      row.engine.minimumOppositePolarityRootGap ?? null,
    maximumRootMultiplicity:
      row.engine.maximumRootMultiplicity ?? null,
    mpfrPairs: row.engine.mpfrPairs,
  })),
  maximumRootTimePressureRatio: rootPressureValues.length > 0
    ? Math.max(...rootPressureValues)
    : null,
  minimumTransmitterFactorMagnitude:
    transmitterFactorMagnitudeValues.length > 0
      ? Math.min(...transmitterFactorMagnitudeValues)
      : null,
  finalConjugationCoordinates:
    coordinateFrames.at(-1)?.conjugationCoordinates ?? null,
  finalMinusInitialCoordinates: Object.fromEntries(
    ["positive", "negative"].map((sector) => [sector, Object.fromEntries(
      ["h", "rho", "theta", "hDot", "rhoDot", "thetaDot"].map(
        (coordinate) => [
          coordinate,
          coordinateFrames.at(-1).sectors[sector][coordinate]
            - coordinateFrames[0].sectors[sector][coordinate],
        ],
      ),
    )]),
  ),
};

let releaseAcceleration = null;
const accelerationPath = path.join(outDirectory, "release-acceleration.json");
if (fs.existsSync(accelerationPath)) {
  const packet = JSON.parse(fs.readFileSync(accelerationPath, "utf8"));
  const frameZero = [...frames.values()][0];
  const frameZeroCoordinates = stateCoordinates(frameZero);
  const projections = { positive: [], negative: [] };
  for (const row of packet.receiverAccelerations) {
    const state = frameZero.find((entry) => entry.id === row.pathId);
    const module = Number.parseInt(row.pathId, 10);
    const polarity = row.pathId.endsWith("+") ? 1 : -1;
    const position = vector(state.position);
    const axis = axes[module];
    const h = polarity * dot(position, axis);
    const radialUnit = unit(subtract(position, multiply(axis, polarity * h)));
    const tangentUnit = cross(axis, radialUnit);
    const midpoint = row.acceleration.map(
      (interval) => (interval.lower + interval.upper) / 2,
    );
    const halfWidth = row.acceleration.map(
      (interval) => (interval.upper - interval.lower) / 2,
    );
    projections[polarity > 0 ? "positive" : "negative"].push({
      module,
      H: dot(midpoint, multiply(axis, polarity)),
      R: dot(midpoint, radialUnit),
      Q: dot(
        midpoint,
        multiply(tangentUnit, polarity * circulationSigns[module]),
      ),
      maximumComponentHalfWidth: Math.max(...halfWidth),
    });
  }
  releaseAcceleration = {
    schema: packet.schema,
    status: packet.status,
    rootCertificateRows: packet.rootCertificates.length,
    unresolvedRootCertificateRows: packet.rootCertificates.filter(
      (row) => row.status !== "certified_complete",
    ).length,
    sectors: Object.fromEntries(Object.entries(projections).map(
      ([sector, rows]) => {
        const coordinate = frameZeroCoordinates.sectors[sector];
        const HMean = mean(rows.map((row) => row.H));
        const RMean = mean(rows.map((row) => row.R));
        const QMean = mean(rows.map((row) => row.Q));
        return [sector, {
          projectedAcceleration: {
            HMean,
            HSpread: spread(rows.map((row) => row.H)),
            RMean,
            RSpread: spread(rows.map((row) => row.R)),
            QMean,
            QSpread: spread(rows.map((row) => row.Q)),
          },
          coordinateSecondDerivatives: {
            hDDot: HMean,
            rhoDDot: RMean + coordinate.rho * coordinate.thetaDot ** 2,
            thetaDDot: (
              QMean - 2 * coordinate.rhoDot * coordinate.thetaDot
            ) / coordinate.rho,
          },
          maximumComponentHalfWidth: Math.max(
            ...rows.map((row) => row.maximumComponentHalfWidth),
          ),
        }];
      },
    )),
  };
}

const report = {
  claimGrade: "measured-eom-solver-diagnostic-not-independent-oracle",
  excludedClaims: ["binding", "retention", "stability", "particle-identity"],
  run: {
    runId: manifest.runId,
    modelFingerprint: manifest.modelFingerprint,
    releaseRootClearance: manifest.releaseRootClearance,
    acceptedEndTime: manifest.acceptedEndTime,
    acceptedSteps: manifest.acceptedSteps,
    rejectedSteps: manifest.rejectedSteps,
    framesEmitted: manifest.framesEmitted,
  },
  releaseAcceleration,
  trajectorySummary,
  coordinateFrames,
};
console.log(JSON.stringify(releaseCapacityOnly ? {
  claimGrade: report.claimGrade,
  excludedClaims: report.excludedClaims,
  run: report.run,
  releaseAcceleration: report.releaseAcceleration,
  releaseFrame: coordinateFrames[0],
} : report, null, 2));
