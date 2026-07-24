#!/usr/bin/env node

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const PI = Math.PI;
const DEFAULT_MAX_BETA = 20;
const DEFAULT_SAMPLES_PER_INTERVAL = 4000;
const ROOT_TOLERANCE = 2e-14;
const RESIDUAL_TOLERANCE = 2e-11;
const FOLD_OFFSET = 2e-8;

function bisect(fn, left, right, tolerance = ROOT_TOLERANCE) {
  let fLeft = fn(left);
  let fRight = fn(right);

  assert.ok(
    fLeft === 0 || fRight === 0 || Math.sign(fLeft) !== Math.sign(fRight),
    `unbracketed root on [${left}, ${right}]: ${fLeft}, ${fRight}`,
  );

  if (fLeft === 0) return left;
  if (fRight === 0) return right;

  for (let iteration = 0; iteration < 200; iteration += 1) {
    const middle = (left + right) / 2;
    const fMiddle = fn(middle);
    if (
      fMiddle === 0 ||
      right - left <= tolerance * Math.max(1, Math.abs(middle))
    ) {
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

  throw new Error(`bisection did not converge on [${left}, ${right}]`);
}

function uniqueSorted(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.filter(
    (value, index) =>
      index === 0 ||
      Math.abs(value - sorted[index - 1]) >
        5e-12 * Math.max(1, Math.abs(value)),
  );
}

export function selfRoots(beta) {
  assert.ok(beta > 1);
  const roots = [];
  const lobeCount = Math.floor(beta / PI) + 1;
  const peakOffset = Math.acos(1 / beta);

  for (let lobe = 0; lobe < lobeCount; lobe += 1) {
    const left = lobe * PI;
    const right = Math.min((lobe + 1) * PI, beta);
    if (right <= left) continue;

    const peak = left + peakOffset;
    if (peak >= right) continue;

    const fn = (x) => beta * Math.abs(Math.sin(x)) - x;
    const peakValue = fn(peak);
    if (peakValue < 0) continue;

    if (lobe > 0 && peakValue > 0) {
      roots.push(bisect(fn, left, peak));
    }
    if (peakValue > 0) {
      roots.push(bisect(fn, peak, right));
    } else {
      roots.push(peak);
    }
  }

  return uniqueSorted(roots.filter((root) => root > 1e-10));
}

export function partnerRoots(beta) {
  assert.ok(beta > 0);
  const roots = [];
  const principal = (x) => beta * Math.cos(x) - x;
  roots.push(bisect(principal, 0, PI / 2));

  if (beta <= 1) return roots;

  const lobeCount = Math.floor((beta + PI / 2) / PI);
  const peakOffset = Math.asin(1 / beta);
  const fn = (x) => beta * Math.abs(Math.cos(x)) - x;

  for (let lobe = 1; lobe <= lobeCount; lobe += 1) {
    const left = (lobe - 0.5) * PI;
    const right = Math.min((lobe + 0.5) * PI, beta);
    if (right <= left) continue;

    const peak = lobe * PI - peakOffset;
    if (peak <= left || peak >= right) continue;

    const peakValue = fn(peak);
    if (peakValue < 0) continue;

    if (peakValue > 0) {
      roots.push(bisect(fn, left, peak));
      roots.push(bisect(fn, peak, right));
    } else {
      roots.push(peak);
    }
  }

  return uniqueSorted(roots);
}

function norm2([x, y]) {
  return Math.hypot(x, y);
}

function evaluateSelfRoot(beta, x) {
  const positionAtReception = [1, 0];
  const positionAtEmission = [Math.cos(2 * x), -Math.sin(2 * x)];
  const velocityAtEmission = [
    beta * Math.sin(2 * x),
    beta * Math.cos(2 * x),
  ];
  const separation = [
    positionAtReception[0] - positionAtEmission[0],
    positionAtReception[1] - positionAtEmission[1],
  ];
  const distance = norm2(separation);
  const direction = separation.map((component) => component / distance);
  const transmitterProjection =
    velocityAtEmission[0] * direction[0] +
    velocityAtEmission[1] * direction[1];
  const jacobian = 1 - transmitterProjection;
  const scale = 1 / (distance * distance * Math.abs(jacobian));
  const acceleration = direction.map((component) => component * scale);
  const chordResidual = distance - (2 * x) / beta;

  return {
    x,
    phi: 2 * x,
    jacobian,
    radial: acceleration[0],
    tangential: acceleration[1],
    chordResidual,
  };
}

function evaluatePartnerRoot(beta, x) {
  const positionAtReception = [1, 0];
  const positionAtEmission = [-Math.cos(2 * x), Math.sin(2 * x)];
  const velocityAtEmission = [
    -beta * Math.sin(2 * x),
    -beta * Math.cos(2 * x),
  ];
  const separation = [
    positionAtReception[0] - positionAtEmission[0],
    positionAtReception[1] - positionAtEmission[1],
  ];
  const distance = norm2(separation);
  const direction = separation.map((component) => component / distance);
  const transmitterProjection =
    velocityAtEmission[0] * direction[0] +
    velocityAtEmission[1] * direction[1];
  const jacobian = 1 - transmitterProjection;
  const scale = -1 / (distance * distance * Math.abs(jacobian));
  const acceleration = direction.map((component) => component * scale);
  const chordResidual = distance - (2 * x) / beta;

  return {
    x,
    phi: 2 * x,
    jacobian,
    radial: acceleration[0],
    tangential: acceleration[1],
    chordResidual,
  };
}

function sum(values, key) {
  return values.reduce((total, value) => total + value[key], 0);
}

export function ledgerAt(beta) {
  const self = selfRoots(beta).map((root) => evaluateSelfRoot(beta, root));
  const partner = partnerRoots(beta).map((root) =>
    evaluatePartnerRoot(beta, root),
  );

  for (const root of [...self, ...partner]) {
    assert.ok(
      Math.abs(root.chordResidual) <= RESIDUAL_TOLERANCE,
      `direct chord residual ${root.chordResidual} exceeds tolerance`,
    );
  }

  const principalPartner = partner.slice(0, 1);
  return {
    beta,
    self,
    partner,
    selfOnly: {
      radial: sum(self, "radial"),
      tangential: sum(self, "tangential"),
    },
    principalPartnerPrincipalSelf: {
      radial: self[0].radial + principalPartner[0].radial,
      tangential: self[0].tangential + principalPartner[0].tangential,
    },
    principalPartnerAllSelf: {
      radial: sum(self, "radial") + sum(principalPartner, "radial"),
      tangential:
        sum(self, "tangential") + sum(principalPartner, "tangential"),
    },
    fullCircular: {
      radial: sum(self, "radial") + sum(partner, "radial"),
      tangential: sum(self, "tangential") + sum(partner, "tangential"),
    },
  };
}

function solveTanEqualsX(lobe) {
  assert.ok(Number.isInteger(lobe) && lobe >= 1);
  const epsilon = 1e-12;
  const left = lobe * PI + epsilon;
  const right = (lobe + 0.5) * PI - epsilon;
  return bisect((x) => Math.tan(x) - x, left, right);
}

function selfBirths(maxBeta) {
  const births = [{ lobe: 0, x: 0, beta: 1 }];
  for (let lobe = 1; ; lobe += 1) {
    const x = solveTanEqualsX(lobe);
    const beta = Math.sqrt(1 + x * x);
    if (beta >= maxBeta) break;
    births.push({ lobe, x, beta });
  }
  return births;
}

function partnerBirths(maxBeta) {
  const births = [];
  for (let lobe = 1; ; lobe += 1) {
    const threshold = bisect(
      (beta) =>
        Math.sqrt(beta * beta - 1) +
        Math.asin(1 / beta) -
        lobe * PI,
      Math.max(1 + 1e-12, lobe * PI - 1),
      lobe * PI + 1,
    );
    if (threshold >= maxBeta) break;
    births.push({ lobe, beta: threshold });
  }
  return births;
}

export function scanLedger({
  maxBeta,
  samplesPerInterval,
  ledgerName,
  component = "tangential",
}) {
  const boundaries = uniqueSorted([
    1,
    PI / 2,
    ...selfBirths(maxBeta).map((birth) => birth.beta),
    ...partnerBirths(maxBeta).map((birth) => birth.beta),
    maxBeta,
  ]).filter((value) => value >= 1 && value <= maxBeta);

  const zeros = [];
  let minimum = { beta: Number.NaN, value: Number.POSITIVE_INFINITY };

  for (let index = 0; index < boundaries.length - 1; index += 1) {
    const leftBoundary = boundaries[index];
    const rightBoundary = boundaries[index + 1];
    const span = rightBoundary - leftBoundary;
    if (span <= 0) continue;

    const left = leftBoundary + Math.min(FOLD_OFFSET, span / 100);
    const right = rightBoundary - Math.min(FOLD_OFFSET, span / 100);
    if (right <= left) continue;

    let previousBeta = left;
    let previousValue = ledgerAt(previousBeta)[ledgerName][component];
    if (previousValue < minimum.value) {
      minimum = { beta: previousBeta, value: previousValue };
    }

    for (let sample = 1; sample <= samplesPerInterval; sample += 1) {
      const beta = left + ((right - left) * sample) / samplesPerInterval;
      const value = ledgerAt(beta)[ledgerName][component];
      if (value < minimum.value) {
        minimum = { beta, value };
      }
      if (Math.sign(value) !== Math.sign(previousValue)) {
        const zero = bisect(
          (candidate) => ledgerAt(candidate)[ledgerName][component],
          previousBeta,
          beta,
          5e-13,
        );
        const ledger = ledgerAt(zero)[ledgerName];
        zeros.push({ beta: zero, ...ledger });
      }
      previousBeta = beta;
      previousValue = value;
    }
  }

  return {
    domain: [1, maxBeta],
    ledgerName,
    component,
    boundaries,
    minimum,
    zeros: uniqueSorted(zeros.map((zero) => zero.beta)).map((beta) => ({
      beta,
      ...ledgerAt(beta)[ledgerName],
    })),
  };
}

function parseArguments(argv) {
  const options = {
    maxBeta: DEFAULT_MAX_BETA,
    samplesPerInterval: DEFAULT_SAMPLES_PER_INTERVAL,
  };
  for (const argument of argv) {
    if (argument.startsWith("--max-beta=")) {
      options.maxBeta = Number(argument.slice("--max-beta=".length));
    } else if (argument.startsWith("--samples-per-interval=")) {
      options.samplesPerInterval = Number(
        argument.slice("--samples-per-interval=".length),
      );
    } else {
      throw new Error(`unknown argument: ${argument}`);
    }
  }
  assert.ok(Number.isFinite(options.maxBeta) && options.maxBeta > 1);
  assert.ok(
    Number.isInteger(options.samplesPerInterval) &&
      options.samplesPerInterval >= 10,
  );
  return options;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const options = parseArguments(process.argv.slice(2));
  const sampleBetas = [1.2, 1.4, PI / 2, 1.7, 2, 3, 6, 8, 10].map(
    (beta) => ledgerAt(beta),
  );
  const output = {
    units: {
      c_f: 1,
      radius: 1,
      acceleration: "kappa*abs(q^2)/R^2",
    },
    conventions: {
      radial: "positive outward",
      tangential: "positive along receiver velocity",
      selfRootEquation: "beta*abs(sin(x)) - x = 0",
      partnerRootEquation: "beta*abs(cos(x)) - x = 0",
    },
    thresholds: {
      principalSelfSignFlip: PI / 2,
      selfBirths: selfBirths(options.maxBeta),
      partnerBirths: partnerBirths(options.maxBeta),
    },
    samples: sampleBetas,
    scans: {
      selfTangential: scanLedger({
        ...options,
        ledgerName: "selfOnly",
      }),
      principalPartnerAllSelfTangential: scanLedger({
        ...options,
        ledgerName: "principalPartnerAllSelf",
      }),
      principalPartnerAllSelfRadial: scanLedger({
        ...options,
        ledgerName: "principalPartnerAllSelf",
        component: "radial",
      }),
      fullCircularTangential: scanLedger({
        ...options,
        ledgerName: "fullCircular",
      }),
      fullCircularRadial: scanLedger({
        ...options,
        ledgerName: "fullCircular",
        component: "radial",
      }),
    },
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}
