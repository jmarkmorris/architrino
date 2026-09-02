#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  alternatingPolarityClass,
  verifyReflectionCovariance,
  verifyRotationCovariance,
  regularRingPhases,
} from "../../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";
import { scanRegularPolarityClass } from "../../src/prescribed-path-analysis/PlanarCoRotatingRingSearch.mjs";

function parseArguments(argv) {
  const options = {
    minimumBeta: 0.05,
    maximumBeta: 20,
    betaStep: 0.025,
    output: null,
  };
  for (const argument of argv) {
    if (argument.startsWith("--min-beta=")) options.minimumBeta = Number(argument.slice("--min-beta=".length));
    else if (argument.startsWith("--max-beta=")) options.maximumBeta = Number(argument.slice("--max-beta=".length));
    else if (argument.startsWith("--beta-step=")) options.betaStep = Number(argument.slice("--beta-step=".length));
    else if (argument.startsWith("--out=")) options.output = argument.slice("--out=".length);
    else throw new Error(`unknown argument: ${argument}`);
  }
  if (!(options.minimumBeta > 0 && options.maximumBeta > options.minimumBeta && options.betaStep > 0)) {
    throw new RangeError("the beta interval and step must be positive and ordered");
  }
  return options;
}

export function runPlanarTwelveTwelveAlternatingCli(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  const n = 12;
  const phases = regularRingPhases(n);
  const polarityClass = alternatingPolarityClass(n, { includeReflection: true });
  const startedAt = Date.now();
  let heartbeatCount = 0;
  const progress = (row) => {
    heartbeatCount += 1;
    const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
    process.stderr.write(`[planar-12-12 heartbeat ${heartbeatCount}] stage=${row.stage} completed=${row.completed ?? "-"}/${row.total ?? "-"} elapsed_s=${elapsedSeconds}\n`);
  };
  const regularResult = scanRegularPolarityClass({
    n,
    polarityClass,
    minimumBeta: options.minimumBeta,
    maximumBeta: options.maximumBeta,
    betaStep: options.betaStep,
    progress,
  });
  const packet = {
    schema: "braid-program/planar-n-n-focused-extension.v1",
    campaignId: "planar-co-rotating-12-12-alternating-uncapped-master-equation-2026-08-29",
    compatibilityIdentifier: "aaa-corpus-advancement",
    model: {
      fieldSpeed: 1,
      masterEquation: "default uncapped emission-site acceleration law",
      universalSpeedCeilingApplied: false,
    },
    declaredScope: {
      n,
      memberCount: 2 * n,
      phaseConfiguration: "regular-24-gon",
      polarityClass: "alternating",
      beta: [options.minimumBeta, options.maximumBeta],
      betaStep: options.betaStep,
      coverage: "one exact symmetry class; not a census of all balanced 12:12 polarity classes and not a nonuniform-phase search",
    },
    symmetryChecks: {
      rotation: verifyRotationCovariance({ phases, polarities: polarityClass.polarities, beta: 3.070356625390253 }),
      reflectionAndCirculationReversal: verifyReflectionCovariance({ phases, polarities: polarityClass.polarities, beta: 3.070356625390253 }),
    },
    regularResult,
    configurationRelation: {
      verdict: "outside-planar common-center three-binary constraint",
      reason: "planar common-center three-binary constraint contains exactly six architrinos in three antipodal neutral binaries; this 12:12 record contains 24 architrinos and its alternating word has like-polarity antipodes.",
      twoComponentCircularDecision: "not a coaxial-separated two-planar-braid configuration; the record has one common center, no positive component-center separation, and no antipodal-neutral planar three-binary common-center component decomposition.",
    },
    independentReference: {
      test: "tests/planar-co-rotating-ring-balance.test.js",
      crossTransmitterInstrument: "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
      sameTransmitterInstrument: "scripts/equation-mapping/analyze-circular-self-hit-binary.mjs",
    },
    claimGrade: "derived configuration relation plus bounded numerical regular-alternating search; candidate promotion requires the declared independent test",
    excludedClaims: ["planar common-center three-binary constraint membership", "complete 12:12 polarity coverage", "nonuniform-phase coverage", "retention", "binding", "stability", "release survival", "physical identity", "score increase", "scientific acceptance"],
    falsifier: "A missing causal root, failed independent root or acceleration comparison, changed topology under refinement, receiver-incompatible scale, or residual above the declared tolerance overturns the balance verdict; a configuration-definition change would require a canonical inventory revision rather than this calculation.",
    execution: {
      commandOptions: options,
      elapsedSeconds: (Date.now() - startedAt) / 1000,
      heartbeatCount,
      completed: true,
    },
  };
  const serialized = `${JSON.stringify(packet, null, 2)}\n`;
  if (options.output) {
    const outputPath = path.resolve(options.output);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, serialized);
    process.stdout.write(`${JSON.stringify({ output: outputPath, verdict: regularResult.verdict, configurationRelation: packet.configurationRelation, execution: packet.execution }, null, 2)}\n`);
  } else {
    process.stdout.write(serialized);
  }
  return packet;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPlanarTwelveTwelveAlternatingCli();
}
