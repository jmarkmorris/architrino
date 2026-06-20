#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../../src/solver/app/SolverAppBridge.mjs";

const FIELD_SPEED = 1;
const FIELD_SPEED_TOLERANCE = 0.015;
const ROOT_TOLERANCE = 1e-13;
const SELF_HIT_TOLERANCE = 1e-12;
const CLOSURE_PERIOD = 2 * Math.PI;
const FIXED_RECEIVER_POSITION = { x: 2.5, y: 0, z: 0 };
const DEFAULT_OUTPUT_PATH =
  ".tmp/angular-momentum-spin/tri-binary-offset-family-solver-report.json";

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printUsage(0);
}

const rootDir = process.cwd();
const outputPath = path.resolve(rootDir, args.output ?? DEFAULT_OUTPUT_PATH);
const wasmDir = path.resolve(rootDir, args.wasmDir ?? ".tmp/solver-build/wasm");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.mjs");
const wasmBinaryPath = path.join(wasmDir, "architrino_solver_wasm_smoke.wasm");

assertFileExists(wasmLoaderPath);
assertFileExists(wasmBinaryPath);

const fMin = parsePositiveInteger(args.fMin ?? "2", "f-min");
const fMax = parsePositiveInteger(args.fMax ?? "8", "f-max");
if (fMax < fMin) {
  throw new Error("--f-max must be greater than or equal to --f-min.");
}

const policies = resolvePolicies(args.policy ?? "all");
const fValues = [];
for (let f = fMin; f <= fMax; f += 1) {
  fValues.push(f);
}

const { default: createWasmModule } = await import(pathToFileURL(wasmLoaderPath).href);
const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});

  const initResponse = await client.init({
  appId: "ideal-swarm",
  apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
  requestedCapabilities: ["sharedGeometry", "causalRoots", "delayedHits", "phaseDiagnostics"],
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 64 * 1024 * 1024,
  },
  threadingPolicy: {
    mode: "single-thread",
    deterministic: true,
  },
});

if (initResponse.status?.code !== "ok") {
  throw new Error(`Solver bridge init failed: ${initResponse.status?.message ?? "unknown error"}`);
}

try {
  const cases = [];
  for (const policy of policies) {
    for (const f of fValues) {
      for (const family of createFamilies(f)) {
        cases.push(await runFamilyCase({ client, policy, f, family }));
      }
    }
  }
  const comparisons = createComparisons(cases);
  const retainedLineagePhaseProbe = createSelectedRetainedLineagePhaseProbe(cases, comparisons);

  const report = {
    schema: "aaa-tri-binary-offset-family-solver-report.v1",
    generatedAt: new Date().toISOString(),
    solverBacked: true,
    claimLevel: "priority-only evidence; not retained-branch certification",
    sourcePriorityFile:
      "reference/priorities/angular-momentum-spin/swarm-partition-and-spinor.md",
    solver: {
      apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
      wasmLoaderPath: path.relative(rootDir, wasmLoaderPath),
      wasmBinaryPath: path.relative(rootDir, wasmBinaryPath),
      initStatus: initResponse.status,
    },
    offsetFamilies: createFamilyDefinitions(),
    policies: createPolicyDefinitions(),
    fValues,
    tolerances: {
      fieldSpeedTolerance: FIELD_SPEED_TOLERANCE,
      rootTolerance: ROOT_TOLERANCE,
      selfHitTolerance: SELF_HIT_TOLERANCE,
    },
    cases,
    retainedBranchChartProjection: createReportBranchChartProjection(cases, retainedLineagePhaseProbe),
    retainedLineagePhaseProbe,
    comparisons,
    closure: createClosureSummary(cases, retainedLineagePhaseProbe),
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  printSummary(report, outputPath);
} finally {
  await client.dispose();
}

function createFamilies(f) {
  return [
    {
      id: "middle-hinge-offset",
      label: "(O,M,I)=(f-1,f,f+2)",
      priorityCandidate: true,
      indices: {
        outer: f - 1,
        middle: f,
        inner: f + 2,
      },
    },
    {
      id: "symmetric-control",
      label: "(O,M,I)=(f-1,f,f+1)",
      priorityCandidate: false,
      indices: {
        outer: f - 1,
        middle: f,
        inner: f + 1,
      },
    },
  ];
}

function createFamilyDefinitions() {
  return [
    {
      id: "middle-hinge-offset",
      relation: "(O,M,I)=(f-1,f,f+2)",
      role: "priority candidate",
      rationale:
        "Tests whether the inner layer's doubled self-hit burden echoes the populated 1:1:2 action partition around the middle field-speed hinge.",
    },
    {
      id: "symmetric-control",
      relation: "(O,M,I)=(f-1,f,f+1)",
      role: "control",
      rationale:
        "Tests whether a symmetric one-step inner offset passes the same solver rows with equal or better evidence.",
    },
  ];
}

function createPolicyDefinitions() {
  return [
    {
      id: "phase-lock",
      description:
        "Treats offsets as integer phase-lock labels. Angular frequencies are proportional to indices; radii are retuned so outer, middle, and inner speeds remain sub-field, field-speed, and super-field respectively.",
      theoremStatus: "closest to the priority note; still a reduced solver probe",
    },
    {
      id: "index-ratio",
      description:
        "Stress test that maps speed ratios to n_layer/n_middle. This directly probes the hinge intuition, but is not a theorem premise because indices are not raw speeds in the priority note.",
      theoremStatus: "diagnostic stress test only",
    },
  ];
}

async function runFamilyCase({ client, policy, f, family }) {
  const layers = createLayerSpecs({ policy, family });
  const selfHitRows = await runSelfHitRows(client, layers);
  const layerRows = [];
  for (const layer of layers) {
    const response = await client.solveCircularSourceRootsHitsLedgerF64(
      createCircularSourceRequest({ policy, f, family, layer })
    );
    const phaseDiagnostics = await computeLayerPhaseDiagnostics({
      client,
      policy,
      f,
      family,
      layer,
      roots: response.roots ?? [],
      rootLedgerDetails: response.rootLedgerDetails ?? [],
    });
    layerRows.push(projectLayerSolverRow({ layer, rootLedgerResponse: response, phaseDiagnostics }));
  }

  const rowsByLayer = new Map(layerRows.map((row) => [row.layer, row]));
  for (const selfHitRow of selfHitRows) {
    const layerRow = rowsByLayer.get(selfHitRow.layer);
    if (layerRow) {
      layerRow.selfHit = selfHitRow;
    }
  }

  const rowVerdicts = evaluateRows(layerRows);
  const branchChartProjection = createBranchChartProjection({
    policy,
    f,
    family,
    layers: layerRows,
    rowVerdicts,
  });
  return {
    caseId: `${policy}:${family.id}:f${f}`,
    policy,
    familyId: family.id,
    familyLabel: family.label,
    priorityCandidate: family.priorityCandidate,
    f,
    indices: family.indices,
    layers: layerRows,
    rowVerdicts,
    branchChartProjection,
    evidenceVerdict: createEvidenceVerdict(rowVerdicts),
  };
}

function createLayerSpecs({ policy, family }) {
  const indices = family.indices;
  const baseOmega = 1;
  const fixedSpeedRatios = {
    outer: 0.75,
    middle: 1,
    inner: 1.25,
  };
  return [
    createLayerSpec({
      role: "outer",
      index: indices.outer,
      angularVelocity: indices.outer * baseOmega,
      speedRatio:
        policy === "index-ratio" ? indices.outer / indices.middle : fixedSpeedRatios.outer,
      phaseAtEpoch: 0,
    }),
    createLayerSpec({
      role: "middle",
      index: indices.middle,
      angularVelocity: indices.middle * baseOmega,
      speedRatio:
        policy === "index-ratio" ? indices.middle / indices.middle : fixedSpeedRatios.middle,
      phaseAtEpoch: Math.PI / 8,
    }),
    createLayerSpec({
      role: "inner",
      index: indices.inner,
      angularVelocity: indices.inner * baseOmega,
      speedRatio:
        policy === "index-ratio" ? indices.inner / indices.middle : fixedSpeedRatios.inner,
      phaseAtEpoch: Math.PI / 5,
    }),
  ];
}

function createLayerSpec({ role, index, angularVelocity, speedRatio, phaseAtEpoch }) {
  const omega = Math.max(Math.abs(angularVelocity), Number.EPSILON);
  const radius = (speedRatio * FIELD_SPEED) / omega;
  const phaseAdvance = angularVelocity * CLOSURE_PERIOD;
  const cycleCount = phaseAdvance / (2 * Math.PI);
  const integerCycleResidual = phaseAdvance - 2 * Math.PI * Math.round(cycleCount);
  return {
    layer: role,
    index,
    angularVelocity,
    phaseAtEpoch,
    radius,
    speedRatio,
    speed: radius * omega,
    phaseAdvance,
    cycleCount,
    integerCycleResidual,
  };
}

async function computeLayerPhaseDiagnostics({
  client,
  policy,
  f,
  family,
  layer,
  roots,
  rootLedgerDetails,
}) {
  if (roots.length === 0) {
    return {
      status: { code: "no_roots", severity: "info", message: "no roots available for phase diagnostics" },
      rows: [],
      summary: null,
      sourceClock: createPhaseClockForLayer(layer),
      receiverClock: createReceiverPhaseClock(),
    };
  }
  const phaseResponse = await client.computePhaseAtHitF64({
    roots,
    sourceClock: createPhaseClockForLayer(layer),
    receiverClock: createReceiverPhaseClock(),
    metadata: roots.map((root, index) =>
      createPhaseMetadata({
        layer,
        root,
        detail: findRootLedgerDetailForRoot(rootLedgerDetails, root, index),
        policy,
        family,
        f,
      })
    ),
  });
  const phaseSummaryResponse = await client.summarizePhaseAtHitsF64({
    rows: phaseResponse.rows,
  });
  return {
    status: phaseResponse.status,
    rows: phaseResponse.rows,
    summary: phaseSummaryResponse.summary,
    sourceClock: createPhaseClockForLayer(layer),
    receiverClock: createReceiverPhaseClock(),
  };
}

function createPhaseClockForLayer(layer) {
  return {
    period: (2 * Math.PI) / Math.max(Math.abs(layer.angularVelocity), Number.EPSILON),
    epoch: 0,
    phaseOffset: layer.phaseAtEpoch / (2 * Math.PI),
  };
}

function createReceiverPhaseClock() {
  return {
    period: CLOSURE_PERIOD,
    epoch: 0,
    phaseOffset: 0,
  };
}

function createPhaseMetadata({ layer, detail, family }) {
  return {
    rootKind: detail?.rootKind ?? 1,
    sourceLayerCode: layerCode(layer.layer),
    receiverLayerCode: 99,
    sourceRoleCode: 1,
    receiverRoleCode: 2,
    sourceChargeSign: family.priorityCandidate ? 1 : -1,
    receiverChargeSign: 0,
    stateFlags: detail?.stateFlags ?? 0,
  };
}

function layerCode(layer) {
  if (layer === "outer") {
    return 1;
  }
  if (layer === "middle") {
    return 2;
  }
  if (layer === "inner") {
    return 3;
  }
  return 0;
}

function findRootLedgerDetailForRoot(details, root, fallbackIndex) {
  const exact = details.find(
    (detail) =>
      detail.entryKind === 1 &&
      Math.abs(detail.emissionTime - root.emissionTime) <= 1e-10 &&
      Math.abs(detail.hitTime - root.hitTime) <= 1e-10
  );
  if (exact) {
    return exact;
  }
  return details.filter((detail) => detail.entryKind === 1)[fallbackIndex] ?? null;
}

async function runSelfHitRows(client, layers) {
  const response = await client.computeSharedGeometryF64({
    circularSelfHitSpans: layers.map((layer) => ({
      fieldSpeedRatio: layer.speedRatio,
      fieldSpeedTolerance: FIELD_SPEED_TOLERANCE,
      tolerance: SELF_HIT_TOLERANCE,
      maxIterations: 96,
      scanSubdivisions: 256,
      maxAngle: Math.PI * 1.96,
    })),
  });
  if (response.status?.code !== "ok") {
    throw new Error(`Shared geometry self-hit solve failed: ${response.status?.message}`);
  }
  return response.circularSelfHitSpans.map((row, index) => ({
    layer: layers[index].layer,
    solverRow: row,
    rootFound: row.rootFound,
    regime: row.regime,
    resultKind: row.resultKind,
    span: row.span,
    residual: row.residual,
    iterations: row.iterations,
  }));
}

function createCircularSourceRequest({ policy, f, family, layer }) {
  return {
    source: {
      startTime: -CLOSURE_PERIOD,
      endTime: CLOSURE_PERIOD,
      center: { x: 0, y: 0, z: 0 },
      radiusU: { x: layer.radius, y: 0, z: 0 },
      radiusV: { x: 0, y: layer.radius, z: 0 },
      angularVelocity: layer.angularVelocity,
      phaseAtEpoch: layer.phaseAtEpoch,
      epochTime: 0,
      errorBound: 1e-15,
    },
    receiver: {
      startTime: 0,
      endTime: CLOSURE_PERIOD,
      positionAtStart: FIXED_RECEIVER_POSITION,
      velocity: { x: 0, y: 0, z: 0 },
      errorBound: 1e-15,
    },
    hitTime: CLOSURE_PERIOD,
    signalSpeed: FIELD_SPEED,
    rootTolerance: ROOT_TOLERANCE,
    maxIterations: 128,
    scanSubdivisions: 256,
    maxRoots: 8,
    streamId: `tri-binary-${policy}-${family.id}-f${f}-${layer.layer}`,
  };
}

function projectLayerSolverRow({ layer, rootLedgerResponse, phaseDiagnostics }) {
  const roots = rootLedgerResponse.roots ?? [];
  const details = rootLedgerResponse.rootLedgerDetails ?? [];
  const activeDetails = details.filter((row) => row.entryKind === 1);
  const jacobians = roots
    .map((root) => root.jacobian)
    .filter((value) => Number.isFinite(value));
  const residuals = roots
    .map((root) => Math.abs(root.residual))
    .filter((value) => Number.isFinite(value));
  return {
    layer: layer.layer,
    index: layer.index,
    angularVelocity: layer.angularVelocity,
    phaseAtEpoch: layer.phaseAtEpoch,
    radius: layer.radius,
    speedRatio: layer.speedRatio,
    speed: layer.speed,
    phaseAdvance: layer.phaseAdvance,
    cycleCount: layer.cycleCount,
    integerCycleResidual: layer.integerCycleResidual,
    rootLedger: {
      schema: rootLedgerResponse.schema,
      status: rootLedgerResponse.status,
      rootCount: roots.length,
      delayedHitCount: rootLedgerResponse.hits?.length ?? 0,
      rootLedgerDetailCount: details.length,
      activeRootDetailCount: activeDetails.length,
      minAbsJacobian: jacobians.length > 0 ? Math.min(...jacobians.map(Math.abs)) : null,
      maxAbsResidual: residuals.length > 0 ? Math.max(...residuals) : null,
      roots: roots.map((root) => ({
        rootId: root.rootId,
        statusCode: root.statusCode,
        emissionTime: root.emissionTime,
        hitTime: root.hitTime,
        delay: root.delay,
        distance: root.distance,
        residual: root.residual,
        jacobian: root.jacobian,
        branchWeight: root.branchWeight,
        sourcePoint: root.sourcePoint,
        receiverPoint: root.receiverPoint,
      })),
      activeDetails: activeDetails.map((row) => ({
        ledgerKey: row.ledgerKey,
        sourceKey: row.sourceKey,
        receiverKey: row.receiverKey,
        rootKey: row.rootKey,
        rootId: row.rootId,
        entryKind: row.entryKind,
        rootKind: row.rootKind,
        statusCode: row.statusCode,
        jacobianSignStratum: row.jacobianSignStratum,
        sequenceIndex: row.sequenceIndex,
        iterationCount: row.iterationCount,
        intervalStart: row.intervalStart,
        intervalEnd: row.intervalEnd,
        emissionTime: row.emissionTime,
        hitTime: row.hitTime,
        delay: row.delay,
        residual: row.residual,
        residualScale: row.residualScale,
        absoluteResidual: row.absoluteResidual,
        normalizedResidual: row.normalizedResidual,
        rootTolerance: row.rootTolerance,
        jacobian: row.jacobian,
        branchWeight: row.branchWeight,
        bracketStart: row.bracketStart,
        bracketEnd: row.bracketEnd,
        sourcePoint: row.sourcePoint,
        receiverPoint: row.receiverPoint,
        stateFlags: row.stateFlags,
      })),
    },
    phaseDiagnostics: projectPhaseDiagnostics(phaseDiagnostics),
  };
}

function projectPhaseDiagnostics(phaseDiagnostics) {
  return {
    status: phaseDiagnostics.status,
    sourceClock: phaseDiagnostics.sourceClock,
    receiverClock: phaseDiagnostics.receiverClock,
    rowCount: phaseDiagnostics.rows.length,
    rows: phaseDiagnostics.rows.map((row) => ({
      rootId: row.rootId,
      statusCode: row.statusCode,
      sourceCycleIndex: row.sourceCycleIndex,
      receiverCycleIndex: row.receiverCycleIndex,
      emissionTime: row.emissionTime,
      hitTime: row.hitTime,
      sourcePhase: row.sourcePhase,
      receiverPhase: row.receiverPhase,
      phaseDelta: row.phaseDelta,
      phaseSpread: row.phaseSpread,
      rootKind: row.rootKind,
      sourceLayerCode: row.sourceLayerCode,
      receiverLayerCode: row.receiverLayerCode,
      sourceRoleCode: row.sourceRoleCode,
      receiverRoleCode: row.receiverRoleCode,
      sourceChargeSign: row.sourceChargeSign,
      receiverChargeSign: row.receiverChargeSign,
      stateFlags: row.stateFlags,
    })),
    summary: phaseDiagnostics.summary,
  };
}

function evaluateRows(layerRows) {
  const byLayer = new Map(layerRows.map((row) => [row.layer, row]));
  const outer = byLayer.get("outer");
  const middle = byLayer.get("middle");
  const inner = byLayer.get("inner");
  return {
    outerSpeed: {
      pass: outer.speedRatio < 1 - FIELD_SPEED_TOLERANCE,
      value: outer.speedRatio,
      required: `s_O < ${1 - FIELD_SPEED_TOLERANCE}`,
    },
    middleHinge: {
      pass: Math.abs(middle.speedRatio - 1) <= FIELD_SPEED_TOLERANCE,
      value: middle.speedRatio,
      required: `|s_M-c_f| <= ${FIELD_SPEED_TOLERANCE}`,
    },
    innerSpeed: {
      pass: inner.speedRatio > 1 + FIELD_SPEED_TOLERANCE,
      value: inner.speedRatio,
      required: `s_I > ${1 + FIELD_SPEED_TOLERANCE}`,
    },
    innerSelfHit: {
      pass:
        inner.selfHit?.rootFound === true &&
        inner.selfHit?.regime === "super_field" &&
        Math.abs(inner.selfHit?.residual ?? Infinity) <= 1e-10,
      value: {
        rootFound: inner.selfHit?.rootFound ?? false,
        regime: inner.selfHit?.regime ?? "missing",
        span: inner.selfHit?.span ?? null,
        residual: inner.selfHit?.residual ?? null,
      },
      required: "inner circular self-hit root found in super_field regime",
    },
    cyclePhaseClosure: {
      pass: layerRows.every((row) => Math.abs(row.integerCycleResidual) <= 1e-12),
      value: Object.fromEntries(
        layerRows.map((row) => [
          row.layer,
          {
            index: row.index,
            cycleCount: row.cycleCount,
            integerCycleResidual: row.integerCycleResidual,
          },
        ])
      ),
      required: "each layer closes an integer number of cycles over the sampled closure period",
    },
    phaseDiagnosticsPopulation: {
      pass: layerRows.every(
        (row) =>
          row.phaseDiagnostics.status?.code === "ok" &&
          row.phaseDiagnostics.rowCount === row.rootLedger.rootCount
      ),
      value: Object.fromEntries(
        layerRows.map((row) => [
          row.layer,
          {
            phaseRows: row.phaseDiagnostics.rowCount,
            rootRows: row.rootLedger.rootCount,
            meanPhaseSpread: row.phaseDiagnostics.summary?.meanPhaseSpread ?? null,
            maxPhaseSpread: row.phaseDiagnostics.summary?.maxPhaseSpread ?? null,
          },
        ])
      ),
      required: "every sampled root row has a solver phase-at-hit diagnostic row",
    },
    rootLedgerPopulation: {
      pass: layerRows.every((row) => row.rootLedger.rootCount > 0 && row.rootLedger.activeRootDetailCount > 0),
      value: Object.fromEntries(
        layerRows.map((row) => [
          row.layer,
          {
            roots: row.rootLedger.rootCount,
            activeDetails: row.rootLedger.activeRootDetailCount,
            minAbsJacobian: row.rootLedger.minAbsJacobian,
          },
        ])
      ),
      required: "every layer has at least one active solver root and detailed ledger row",
    },
    jacobianFloor: {
      pass: layerRows.every((row) => (row.rootLedger.minAbsJacobian ?? 0) > 1e-9),
      value: Object.fromEntries(layerRows.map((row) => [row.layer, row.rootLedger.minAbsJacobian])),
      required: "min |J| > 1e-9 for every sampled layer root row",
    },
  };
}

function createBranchChartProjection({ policy, f, family, layers, rowVerdicts }) {
  const caseId = `${policy}:${family.id}:f${f}`;
  const byLayer = new Map(layers.map((row) => [row.layer, row]));
  const innerOffsetFromMiddle = family.indices.inner - family.indices.middle;
  const rootChartProxyPass =
    rowVerdicts.rootLedgerPopulation.pass === true && rowVerdicts.jacobianFloor.pass === true;
  const allReducedRowsPass = Object.values(rowVerdicts).every((row) => row.pass === true);
  const activeRowLineageProbe = createActiveRowLineageProbe({ caseId, layers });
  const phaseAtHitProbe = createPhaseAtHitProbe({ caseId, layers });
  const torqueWakeDiagnosticProbe = createTorqueWakeDiagnosticProbe({
    activeRowLineageProbe,
  });

  return {
    schema: "aaa-tri-binary-retained-branch-chart-projection.v1",
    claimLevel: "reduced solver projection; retained branch-chart certificate remains blocked",
    retainedBranchClaim: false,
    promotionReady: false,
    policy,
    f,
    familyId: family.id,
    familyLabel: family.label,
    branchSelectionResidualStatus: "blocked_not_evaluable",
    auditPartition: {
      eval: [],
      blocked: [caseId],
      excluded: [],
    },
    reducedRowsPass: allReducedRowsPass,
    populatedRows: [
      createProjectionRow({
        id: "root_chart_reduced",
        mapsTo: ["root_chart"],
        status: rootChartProxyPass ? "reduced_proxy_pass" : "reduced_proxy_fail",
        evidence:
          "Every sampled layer has a central-solver circular source root, active root-ledger detail, and positive sampled Jacobian floor.",
        value: {
          rootLedgerPopulation: rowVerdicts.rootLedgerPopulation.value,
          jacobianFloor: rowVerdicts.jacobianFloor.value,
        },
        retainedLimitation:
          "Does not supply B^- and B^+ inactive-root gaps, root-transport residuals, or a common retained active-row set over W.",
      }),
      createProjectionRow({
        id: "active_row_lineage_probe",
        mapsTo: ["row_set_identity", "root_chart"],
        status: activeRowLineageProbe.activeRowCount > 0 ? "sampled_lineage_populated" : "missing",
        evidence:
          "Names deterministic sampled active-row IDs, source lineage, receiver lineage, root timing, root residuals, and root-ledger detail keys.",
        value: activeRowLineageProbe.summary,
        retainedLimitation:
          "The same rows are not yet proven to be the force, torque, normalized tail-wake, and partition row set.",
      }),
      createProjectionRow({
        id: "torque_wake_same_row_diagnostic",
        mapsTo: ["torque_consistency", "tail_wake_pullback", "row_set_identity"],
        status:
          torqueWakeDiagnosticProbe.rowSetStatus === "same_row_ids_attached"
            ? "same_row_ids_attached_residual_blocked"
            : "missing",
        evidence:
          "Attaches normalized force-like, instantaneous torque, and wake-diagnostic rows to the same sampled active row IDs.",
        value: torqueWakeDiagnosticProbe.summary,
        retainedLimitation:
          "Does not evaluate the time-integrated torque residual or the normalized delayed-interior characteristic-tail wake charge.",
      }),
      createProjectionRow({
        id: "outer_speed",
        mapsTo: ["outer_speed"],
        status: rowVerdicts.outerSpeed.pass ? "reduced_pass" : "reduced_fail",
        evidence: "Outer layer speed ratio sampled by the solver-side layer model.",
        value: rowVerdicts.outerSpeed.value,
        retainedLimitation: "Speed row only; no retained branch-continuation chart is supplied.",
      }),
      createProjectionRow({
        id: "middle_hinge",
        mapsTo: ["middle_hinge"],
        status: rowVerdicts.middleHinge.pass ? "reduced_pass" : "reduced_fail",
        evidence: "Middle layer speed ratio is held on the field-speed hinge within tolerance.",
        value: rowVerdicts.middleHinge.value,
        retainedLimitation:
          "Does not supply second-order hinge retune or phase branch continuation across W.",
      }),
      createProjectionRow({
        id: "inner_self_hit",
        mapsTo: ["inner_self_hit"],
        status: rowVerdicts.innerSelfHit.pass ? "reduced_pass" : "reduced_fail",
        evidence: "Central shared-geometry self-hit span reports a super-field inner self-hit root.",
        value: {
          speedRatio: byLayer.get("inner")?.speedRatio ?? null,
          selfHit: byLayer.get("inner")?.selfHit ?? null,
        },
        retainedLimitation:
          "Does not prove the retained simple-root separator chart or post-transaction self-delay continuity.",
      }),
      createProjectionRow({
        id: "cycle_phase_closure_proxy",
        mapsTo: ["phase_lock"],
        status: rowVerdicts.cyclePhaseClosure.pass ? "cycle_proxy_pass" : "cycle_proxy_fail",
        evidence:
          "Each layer advances an integer number of cycles over the sampled closure period under the integer-index ansatz.",
        value: rowVerdicts.cyclePhaseClosure.value,
        retainedLimitation:
          "Cycle closure is not the retained phase-lock residual; it omits root-continuation branches, geometric phase terms, and wake-return delay.",
      }),
      createProjectionRow({
        id: "phase_at_hit_rows",
        mapsTo: ["phase_lock"],
        status: rowVerdicts.phaseDiagnosticsPopulation.pass ? "phase_rows_populated" : "phase_rows_missing",
        evidence:
          "Solver phase-at-hit diagnostics are computed for each sampled root using source and receiver phase clocks.",
        value: phaseAtHitProbe.summary,
        retainedLimitation:
          "The receiver is still the fixed probe clock, so this does not prove binary-to-binary retained phase lock.",
      }),
      createProjectionRow({
        id: "self_root_parity_index_proxy",
        mapsTo: ["self_root_parity"],
        status: innerOffsetFromMiddle === 2 ? "index_proxy_matches_target" : "index_proxy_mismatch",
        evidence:
          "Compares the family offset n_I-n_M against the minimal certificate target of two inner self-hit substeps.",
        value: {
          innerOffsetFromMiddle,
          requiredInnerSelfHitSubsteps: 2,
        },
        retainedLimitation:
          "Index offset is not the raw separator equation. A retained chart must still prove Delta N_self=+2 and Delta D=0.",
      }),
      createProjectionRow({
        id: "energy_frequency_target",
        mapsTo: ["energy_frequency"],
        status: "target_computed_not_evaluated",
        evidence:
          "Computes the clean minimal-branch target omega_*=(omega_O+omega_M+2 omega_I)/4 from the sampled layer angular velocities.",
        value: computeEnergyFrequencyTarget(byLayer),
        retainedLimitation:
          "No transaction frequency, root-energy route, wake-energy route, recoil route, or transport route is supplied.",
      }),
    ],
    blockedRows: [
      createBlockedProjectionRow({
        id: "row_set_identity",
        mapsTo: ["row_set_identity", "r_rows"],
        missing:
          "A proof that force, torque, normalized tail-wake, and partition residuals use the same retained active rows.",
      }),
      createBlockedProjectionRow({
        id: "phase_lock",
        mapsTo: ["phase_lock", "r_phi"],
        missing:
          "Integer phase branches, geometric phase terms, and root-continuation margins for every retained active row.",
      }),
      createBlockedProjectionRow({
        id: "torque_consistency",
        mapsTo: ["torque_consistency", "r_pull"],
        missing: "Time-integrated retained row torques on W for inner, middle, and outer layers.",
      }),
      createBlockedProjectionRow({
        id: "tail_wake_pullback",
        mapsTo: ["tail_wake_increment", "r_pull", "r_route"],
        missing:
          "Normalized delayed-interior characteristic-tail angular-momentum charge pulled back to the retained rows.",
      }),
      createBlockedProjectionRow({
        id: "vector_partition_retained",
        mapsTo: ["vector_partition", "r_part"],
        missing:
          "A retained vector ledger tying layer angular-momentum increments, wake angular momentum, and coupling recoil to one event record.",
      }),
      createBlockedProjectionRow({
        id: "energy_routing",
        mapsTo: ["energy_frequency", "r_part", "r_route"],
        missing:
          "A declared route for root energy, wake energy, recoil, or transport when the clean energy-frequency row does not close.",
      }),
      createBlockedProjectionRow({
        id: "section_stability",
        mapsTo: ["section_stability", "r_stab"],
        missing:
          "Return residual, inactive-root gap, and positive section-stability margin for the post-branch chart.",
      }),
      createBlockedProjectionRow({
        id: "non_minimal_retained_competitors",
        mapsTo: ["deterministic_selection_rule"],
        missing:
          "A finite retained competitor set with the same residual-vector entries, including wake or recoil alternatives.",
      }),
    ],
    residualVectorProjection: {
      r_rows:
        torqueWakeDiagnosticProbe.rowSetStatus === "same_row_ids_attached"
          ? "blocked_with_same_row_diagnostic_payload"
          : "blocked",
      r_root: rootChartProxyPass ? "partial_proxy_pass" : "partial_proxy_fail",
      r_phi:
        rowVerdicts.phaseDiagnosticsPopulation.pass && rowVerdicts.cyclePhaseClosure.pass
          ? "blocked_with_phase_rows_and_cycle_proxy"
          : "blocked",
      r_stab: "blocked",
      r_pull: "blocked",
      r_part: "blocked",
      r_route: "blocked",
    },
    activeRowLineageProbe,
    phaseAtHitProbe,
    torqueWakeDiagnosticProbe,
  };
}

function createActiveRowLineageProbe({ caseId, layers }) {
  const activeRows = [];
  for (const layer of layers) {
    for (const [rootIndex, root] of layer.rootLedger.roots.entries()) {
      const detail = findProjectedActiveDetailForRoot(layer.rootLedger.activeDetails, root, rootIndex);
      activeRows.push({
        rowId: `${caseId}:${layer.layer}:root-${root.rootId}`,
        layer: layer.layer,
        sourceLineage: {
          kind: "circular-source-layer",
          layer: layer.layer,
          index: layer.index,
          angularVelocity: layer.angularVelocity,
          radius: layer.radius,
          phaseAtEpoch: layer.phaseAtEpoch,
          sourceClock: layer.phaseDiagnostics.sourceClock,
        },
        receiverLineage: {
          kind: "fixed-receiver-probe",
          retainedBinary: false,
          receiverClock: layer.phaseDiagnostics.receiverClock,
        },
        root: {
          rootId: root.rootId,
          emissionTime: root.emissionTime,
          hitTime: root.hitTime,
          delay: root.delay,
          distance: root.distance,
          residual: root.residual,
          jacobian: root.jacobian,
          branchWeight: root.branchWeight,
        },
        rootLedgerDetail: detail
          ? {
              ledgerKey: detail.ledgerKey,
              sourceKey: detail.sourceKey,
              receiverKey: detail.receiverKey,
              rootKey: detail.rootKey,
              rootKind: detail.rootKind,
              entryKind: detail.entryKind,
              sequenceIndex: detail.sequenceIndex,
              bracketStart: detail.bracketStart,
              bracketEnd: detail.bracketEnd,
              normalizedResidual: detail.normalizedResidual,
              jacobianSignStratum: detail.jacobianSignStratum,
            }
          : null,
      });
    }
  }
  const rowIds = activeRows.map((row) => row.rowId);
  return {
    status: activeRows.length > 0 ? "sampled_active_row_lineage_populated" : "no_active_rows",
    claimLevel: "lineage payload for sampled solver roots; not common retained row-set proof",
    activeRowCount: activeRows.length,
    summary: {
      activeRowCount: activeRows.length,
      rowIds,
      rowSetIdentity: {
        forceRows: rowIds,
        partitionRows: rowIds,
        torqueRows: [],
        wakeRows: [],
        status: "blocked_until_torque_and_wake_use_same_rows",
      },
    },
    activeRows,
  };
}

function createPhaseAtHitProbe({ caseId, layers }) {
  const phaseRows = [];
  for (const layer of layers) {
    for (const row of layer.phaseDiagnostics.rows) {
      phaseRows.push({
        rowId: `${caseId}:${layer.layer}:phase-root-${row.rootId}`,
        layer: layer.layer,
        rootId: row.rootId,
        statusCode: row.statusCode,
        sourceCycleIndex: row.sourceCycleIndex,
        receiverCycleIndex: row.receiverCycleIndex,
        emissionTime: row.emissionTime,
        hitTime: row.hitTime,
        sourcePhase: row.sourcePhase,
        receiverPhase: row.receiverPhase,
        phaseDelta: row.phaseDelta,
        phaseSpread: row.phaseSpread,
        rootKind: row.rootKind,
        sourceLayerCode: row.sourceLayerCode,
        receiverLayerCode: row.receiverLayerCode,
        sourceRoleCode: row.sourceRoleCode,
        receiverRoleCode: row.receiverRoleCode,
        sourceChargeSign: row.sourceChargeSign,
        receiverChargeSign: row.receiverChargeSign,
        stateFlags: row.stateFlags,
      });
    }
  }
  const maxPhaseSpread = maxFinite(phaseRows.map((row) => row.phaseSpread));
  return {
    status: phaseRows.length > 0 ? "phase_at_hit_rows_populated" : "no_phase_rows",
    claimLevel: "phase-at-hit payload for sampled roots; not retained phase-lock proof",
    phaseRowCount: phaseRows.length,
    summary: {
      phaseRowCount: phaseRows.length,
      maxPhaseSpread,
      layerSummaries: Object.fromEntries(
        layers.map((layer) => [
          layer.layer,
          {
            phaseRows: layer.phaseDiagnostics.rowCount,
            summary: layer.phaseDiagnostics.summary,
          },
        ])
      ),
    },
    phaseRows,
  };
}

function createTorqueWakeDiagnosticProbe({ activeRowLineageProbe }) {
  const rowIds = activeRowLineageProbe.summary.rowIds;
  const torqueRows = activeRowLineageProbe.activeRows.map((row) =>
    createTorqueDiagnosticRow(row)
  );
  const wakeRows = torqueRows.map((row) => createWakeDiagnosticRow(row));
  const torqueTimeIntegralBlocker = createTorqueTimeIntegralBlocker();
  const wakeActionKernelBlocker = createWakeActionKernelBlocker();
  return {
    status:
      torqueRows.length > 0
        ? "same_row_force_torque_wake_diagnostics_populated"
        : "no_rows_for_torque_wake_diagnostics",
    claimLevel:
      "same-row diagnostic payload with exact retained-integral blockers; not time-integrated torque consistency or normalized action-kernel wake pullback",
    rowSetStatus:
      rowIds.length > 0 &&
      sameOrderedStrings(rowIds, torqueRows.map((row) => row.rowId)) &&
      sameOrderedStrings(rowIds, wakeRows.map((row) => row.rowId))
        ? "same_row_ids_attached"
        : "row_id_mismatch",
    summary: {
      forceRows: rowIds,
      partitionRows: rowIds,
      torqueRows: torqueRows.map((row) => row.rowId),
      wakeRows: wakeRows.map((row) => row.rowId),
      maxInstantaneousTorqueNorm: maxFinite(torqueRows.map((row) => row.receiverTorqueNorm)),
      diagnosticWakeRowCount: wakeRows.length,
      torqueConsistencyStatus:
        "blocked_until_retained_time_window_torque_integral_is_available",
      torqueTimeIntegralBlocker,
      wakePullbackStatus:
        "blocked_until_normalized_action_kernel_boundary_charge_is_available",
      wakeActionKernelBlocker,
    },
    torqueRows,
    wakeRows,
  };
}

function createTorqueTimeIntegralBlocker() {
  return {
    status: "blocked_missing_retained_time_window_torque_integral",
    missing:
      "A retained active-row stream over W with root-continuation labels, torque quadrature weights, and the mechanical endpoint increment for each layer.",
    currentBridgePayload:
      "The circular-source probe exposes sampled active roots at one hit time; it does not identify a continued retained active-row set over the full window W.",
    requiredFields: [
      "windowStart",
      "windowEnd",
      "sameRetainedActiveRowIds",
      "rootContinuationLabels",
      "torqueQuadratureWeights",
      "mechanicalEndpointIncrement",
    ],
  };
}

function createWakeActionKernelBlocker() {
  return {
    status: "blocked_missing_normalized_action_kernel_boundary_charge",
    missing:
      "The normalized delayed-interior characteristic-tail boundary charge on the chart-restricted crossing domain for the same retained active rows.",
    currentBridgePayload:
      "The diagnostic wake row only attaches the negative instantaneous torque sample; it does not evaluate the Master-Equation action-kernel boundary integral.",
    requiredFields: [
      "eta",
      "epsilonC",
      "endpointConvention",
      "sameRetainedActiveRowIds",
      "chartRestrictedCrossingDomainRows",
      "kernelGradientIntegral",
    ],
  };
}

function createTorqueDiagnosticRow(row) {
  const sourcePoint =
    row.root.sourcePoint ??
    row.rootLedgerDetail?.sourcePoint ??
    computeCircularSourcePoint(row.sourceLineage, row.root.emissionTime);
  const receiverPoint =
    row.root.receiverPoint ??
    row.rootLedgerDetail?.receiverPoint ??
    computeFixedReceiverPoint(row.root.hitTime);
  const displacement = sourcePoint && receiverPoint ? subtractVectors(receiverPoint, sourcePoint) : null;
  const distance = displacement ? vectorNorm(displacement) : row.root.distance;
  const unitDirection = displacement && distance > 0 ? scaleVector(displacement, 1 / distance) : null;
  const forceScale =
    unitDirection && distance > 0 && Math.abs(row.root.jacobian) > 0
      ? 1 / (distance * distance * Math.abs(row.root.jacobian))
      : null;
  const normalizedForce = unitDirection && forceScale != null ? scaleVector(unitDirection, forceScale) : null;
  const receiverTorque =
    receiverPoint && normalizedForce ? crossVectors(receiverPoint, normalizedForce) : null;
  const sourceReactionTorque =
    sourcePoint && normalizedForce ? crossVectors(sourcePoint, scaleVector(normalizedForce, -1)) : null;
  return {
    rowId: row.rowId,
    layer: row.layer,
    status: normalizedForce ? "instantaneous_torque_diagnostic_populated" : "missing_geometry",
    coefficientConvention:
      "mu_arch*kappa*|q_source*q_receiver|*sigma is set to +1 for this diagnostic row only",
    sourcePoint,
    receiverPoint,
    displacement,
    distance,
    jacobian: row.root.jacobian,
    normalizedForce,
    receiverTorque,
    receiverTorqueNorm: receiverTorque ? vectorNorm(receiverTorque) : null,
    sourceReactionTorque,
    sourceReactionTorqueNorm: sourceReactionTorque ? vectorNorm(sourceReactionTorque) : null,
    residualStatus:
      "not_evaluated_without_retained_time_window_torque_integral",
  };
}

function computeCircularSourcePoint(sourceLineage, time) {
  if (!sourceLineage || !Number.isFinite(time)) {
    return null;
  }
  const phase = sourceLineage.angularVelocity * time + sourceLineage.phaseAtEpoch;
  return {
    x: sourceLineage.radius * Math.cos(phase),
    y: sourceLineage.radius * Math.sin(phase),
    z: 0,
  };
}

function computeFixedReceiverPoint() {
  return { ...FIXED_RECEIVER_POSITION };
}

function createWakeDiagnosticRow(torqueRow) {
  const diagnosticWakeTorqueSample = torqueRow.receiverTorque
    ? scaleVector(torqueRow.receiverTorque, -1)
    : null;
  return {
    rowId: torqueRow.rowId,
    layer: torqueRow.layer,
    status: diagnosticWakeTorqueSample ? "wake_torque_sample_attached" : "missing_torque_sample",
    diagnosticWakeTorqueSample,
    diagnosticWakeTorqueSampleNorm: diagnosticWakeTorqueSample
      ? vectorNorm(diagnosticWakeTorqueSample)
      : null,
    normalizedActionKernelWakeCharge: null,
    residualStatus:
      "not_evaluated_without_normalized_action_kernel_boundary_charge",
  };
}

function sameOrderedStrings(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function findProjectedActiveDetailForRoot(details, root, fallbackIndex) {
  const exact = details.find(
    (detail) =>
      Math.abs(detail.emissionTime - root.emissionTime) <= 1e-10 &&
      Math.abs(detail.hitTime - root.hitTime) <= 1e-10
  );
  if (exact) {
    return exact;
  }
  return details[fallbackIndex] ?? null;
}

function computeEnergyFrequencyTarget(byLayer) {
  const outer = byLayer.get("outer");
  const middle = byLayer.get("middle");
  const inner = byLayer.get("inner");
  if (!outer || !middle || !inner) {
    return null;
  }
  return {
    omegaStar:
      (outer.angularVelocity + middle.angularVelocity + 2 * inner.angularVelocity) / 4,
    angularVelocities: {
      outer: outer.angularVelocity,
      middle: middle.angularVelocity,
      inner: inner.angularVelocity,
    },
    actionWeights: {
      outer: 1,
      middle: 1,
      inner: 2,
    },
  };
}

function createProjectionRow({
  id,
  mapsTo,
  status,
  evidence,
  value,
  retainedLimitation,
}) {
  return {
    id,
    mapsTo,
    status,
    evidence,
    value,
    retainedLimitation,
    certificatePass: false,
  };
}

function createBlockedProjectionRow({ id, mapsTo, missing }) {
  return {
    id,
    mapsTo,
    status: "blocked",
    missing,
    certificatePass: false,
  };
}

function createSelectedRetainedLineagePhaseProbe(cases, comparisons) {
  const rankedComparisons = comparisons
    .filter(
      (comparison) =>
        comparison.policy === "index-ratio" &&
        comparison.reducedProbePreference === "both_pass_candidate_has_larger_inner_self_hit_span"
    )
    .sort((left, right) => right.innerSelfHitSpanDelta - left.innerSelfHitSpanDelta);
  const selectedComparison =
    rankedComparisons[0] ??
    comparisons.find((comparison) => comparison.candidateRowsPass && comparison.policy === "phase-lock") ??
    null;
  if (!selectedComparison) {
    return {
      status: "no_selected_case",
      retainedBranchClaim: false,
      reason: "No passing candidate comparison was available for retained lineage and phase probing.",
    };
  }
  const selectedCase = cases.find(
    (item) =>
      item.policy === selectedComparison.policy &&
      item.f === selectedComparison.f &&
      item.familyId === "middle-hinge-offset"
  );
  if (!selectedCase) {
    return {
      status: "selected_case_missing",
      retainedBranchClaim: false,
      comparisonId: selectedComparison.comparisonId,
    };
  }
  const lineage = selectedCase.branchChartProjection.activeRowLineageProbe;
  const phase = selectedCase.branchChartProjection.phaseAtHitProbe;
  const torqueWake = selectedCase.branchChartProjection.torqueWakeDiagnosticProbe;
  return {
    schema: "aaa-tri-binary-selected-retained-lineage-phase-probe.v1",
    status: "partial_payload_retained_certificate_blocked",
    claimLevel:
      "sampled active-row lineage and phase-at-hit payload; not a retained branch-chart certificate",
    retainedBranchClaim: false,
    promotionReady: false,
    selectedCaseId: selectedCase.caseId,
    selectedComparisonId: selectedComparison.comparisonId,
    selectionReason:
      "Largest positive inner self-hit span delta for the priority candidate among passing index-ratio stress comparisons.",
    selectedComparison: {
      policy: selectedComparison.policy,
      f: selectedComparison.f,
      innerSelfHitSpanDelta: selectedComparison.innerSelfHitSpanDelta,
      reducedProbePreference: selectedComparison.reducedProbePreference,
    },
    auditPartition: {
      eval: [],
      blocked: [selectedCase.caseId],
      excluded: [],
    },
    rowSetIdentity: {
      status:
        torqueWake.rowSetStatus === "same_row_ids_attached"
          ? "blocked_with_same_row_force_partition_torque_wake_diagnostics"
          : "blocked_with_sampled_active_row_lineage",
      populatedRows: lineage.summary.rowIds,
      forceRows: lineage.summary.rowSetIdentity.forceRows,
      partitionRows: lineage.summary.rowSetIdentity.partitionRows,
      torqueRows: torqueWake.summary.torqueRows,
      wakeRows: torqueWake.summary.wakeRows,
      missing:
        "The row IDs now match at the diagnostic payload level, but row_set_identity cannot pass until the time-integrated torque residual and normalized action-kernel wake charge are evaluated on those same rows.",
    },
    torqueWake: {
      status: "blocked_with_same_row_diagnostic_payload",
      maxInstantaneousTorqueNorm: torqueWake.summary.maxInstantaneousTorqueNorm,
      torqueConsistencyStatus: torqueWake.summary.torqueConsistencyStatus,
      torqueTimeIntegralBlocker: torqueWake.summary.torqueTimeIntegralBlocker,
      wakePullbackStatus: torqueWake.summary.wakePullbackStatus,
      wakeActionKernelBlocker: torqueWake.summary.wakeActionKernelBlocker,
    },
    phaseLock: {
      status: "blocked_with_phase_at_hit_rows",
      phaseRowCount: phase.phaseRowCount,
      maxPhaseSpread: phase.summary.maxPhaseSpread,
      missing:
        "Binary-to-binary retained receiver phase, geometric phase, wake-return delay, and root-continuation margin are not supplied by the fixed-receiver probe.",
    },
    activeRows: lineage.activeRows,
    phaseRows: phase.phaseRows,
    torqueRows: torqueWake.torqueRows,
    wakeRows: torqueWake.wakeRows,
    stillBlockedRows: [
      "row_set_identity",
      "phase_lock",
      "torque_consistency",
      "tail_wake_pullback",
      "vector_partition_retained",
      "energy_routing",
      "section_stability",
      "non_minimal_retained_competitors",
    ],
  };
}

function createReportBranchChartProjection(cases, retainedLineagePhaseProbe) {
  const populatedRowCounts = {};
  const blockedRowCounts = {};
  let reducedPassCases = 0;
  let selfRootParityProxyMatches = 0;
  let activeLineageProbeCases = 0;
  let phaseAtHitProbeCases = 0;
  for (const item of cases) {
    if (item.branchChartProjection?.reducedRowsPass) {
      reducedPassCases += 1;
    }
    if (item.branchChartProjection?.activeRowLineageProbe?.activeRowCount > 0) {
      activeLineageProbeCases += 1;
    }
    if (item.branchChartProjection?.phaseAtHitProbe?.phaseRowCount > 0) {
      phaseAtHitProbeCases += 1;
    }
    for (const row of item.branchChartProjection?.populatedRows ?? []) {
      populatedRowCounts[row.id] = (populatedRowCounts[row.id] ?? 0) + 1;
      if (row.id === "self_root_parity_index_proxy" && row.status === "index_proxy_matches_target") {
        selfRootParityProxyMatches += 1;
      }
    }
    for (const row of item.branchChartProjection?.blockedRows ?? []) {
      blockedRowCounts[row.id] = (blockedRowCounts[row.id] ?? 0) + 1;
    }
  }
  return {
    status: "blocked_not_evaluable",
    retainedBranchClaim: false,
    caseCount: cases.length,
    reducedPassCases,
    selfRootParityProxyMatches,
    activeLineageProbeCases,
    phaseAtHitProbeCases,
    selectedRetainedLineagePhaseProbeStatus: retainedLineagePhaseProbe?.status ?? "missing",
    selectedRetainedLineagePhaseProbeCaseId: retainedLineagePhaseProbe?.selectedCaseId ?? null,
    auditPartition: {
      evalCount: 0,
      blockedCount: cases.length,
      excludedCount: 0,
    },
    populatedRowCounts,
    blockedRowCounts,
    nextCertificateObject:
      "Retained Noether swarm branch chart with common active-row lineage, phase continuation, torque, wake pullback, vector partition, energy routing, and section-stability rows.",
  };
}

function createClosureSummary(cases, retainedLineagePhaseProbe) {
  const projection = createReportBranchChartProjection(cases, retainedLineagePhaseProbe);
  return {
    status: "not_closed",
    retainedBranchClaim: false,
    reason:
      "The runner now emits solver-backed reduced rows, sampled active-row lineage, phase-at-hit rows, and a branch-chart projection, but promotion still requires a retained branch chart with common active-row lineage across force, torque, wake, and partition rows plus binary-to-binary retained phase, vector-ledger, energy-routing, and stability rows.",
    reducedPassCases: projection.reducedPassCases,
    activeLineageProbeCases: projection.activeLineageProbeCases,
    phaseAtHitProbeCases: projection.phaseAtHitProbeCases,
    blockedCaseCount: projection.auditPartition.blockedCount,
  };
}

function createEvidenceVerdict(rowVerdicts) {
  const hardRowsPass = Object.values(rowVerdicts).every((row) => row.pass);
  return {
    status: hardRowsPass ? "solver_rows_pass_reduced_probe" : "solver_rows_fail_reduced_probe",
    retainedBranchClaim: false,
    promotionReady: false,
    reason: hardRowsPass
      ? "Reduced solver rows pass, but retained branch-chart phase, vector-ledger, energy, wake, torque, and stability rows remain open."
      : "At least one reduced solver row failed; inspect rowVerdicts before spending proof effort.",
  };
}

function createComparisons(cases) {
  const grouped = new Map();
  for (const item of cases) {
    const key = `${item.policy}:f${item.f}`;
    const bucket = grouped.get(key) ?? {};
    bucket[item.familyId] = item;
    grouped.set(key, bucket);
  }

  const comparisons = [];
  for (const [key, bucket] of grouped.entries()) {
    const candidate = bucket["middle-hinge-offset"];
    const control = bucket["symmetric-control"];
    if (!candidate || !control) {
      continue;
    }
    const candidateInner = candidate.layers.find((row) => row.layer === "inner");
    const controlInner = control.layers.find((row) => row.layer === "inner");
    const candidateSpan = candidateInner?.selfHit?.span ?? 0;
    const controlSpan = controlInner?.selfHit?.span ?? 0;
    comparisons.push({
      comparisonId: key,
      policy: candidate.policy,
      f: candidate.f,
      candidateFamily: candidate.familyLabel,
      controlFamily: control.familyLabel,
      candidateRowsPass: candidate.evidenceVerdict.status === "solver_rows_pass_reduced_probe",
      controlRowsPass: control.evidenceVerdict.status === "solver_rows_pass_reduced_probe",
      innerSelfHitSpanDelta: candidateSpan - controlSpan,
      candidateInnerSelfHitSpan: candidateSpan,
      controlInnerSelfHitSpan: controlSpan,
      reducedProbePreference: classifyReducedPreference(candidate, control, candidateSpan - controlSpan),
      retainedBranchClaim: false,
    });
  }
  return comparisons;
}

function classifyReducedPreference(candidate, control, spanDelta) {
  const candidatePass = candidate.evidenceVerdict.status === "solver_rows_pass_reduced_probe";
  const controlPass = control.evidenceVerdict.status === "solver_rows_pass_reduced_probe";
  if (candidatePass && !controlPass) {
    return "candidate_only_reduced_rows_pass";
  }
  if (!candidatePass && controlPass) {
    return "control_only_reduced_rows_pass";
  }
  if (!candidatePass && !controlPass) {
    return "neither_reduced_probe_passes";
  }
  if (spanDelta > 1e-9) {
    return "both_pass_candidate_has_larger_inner_self_hit_span";
  }
  if (spanDelta < -1e-9) {
    return "both_pass_control_has_larger_inner_self_hit_span";
  }
  return "both_pass_no_inner_self_hit_span_separation";
}

function printSummary(report, absoluteOutputPath) {
  const relOutputPath = path.relative(rootDir, absoluteOutputPath);
  console.log(`tri-binary offset family solver report: ${relOutputPath}`);
  console.log(`solver-backed cases: ${report.cases.length}`);
  for (const comparison of report.comparisons) {
    console.log(
      [
        comparison.comparisonId,
        comparison.reducedProbePreference,
        `spanDelta=${formatNumber(comparison.innerSelfHitSpanDelta)}`,
      ].join(" ")
    );
  }
  console.log("retained branch claim: false");
}

function parseArgs(rawArgs) {
  const parsed = {};
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    const equalIndex = arg.indexOf("=");
    if (equalIndex !== -1) {
      parsed[toCamelCase(arg.slice(2, equalIndex))] = arg.slice(equalIndex + 1);
      continue;
    }
    const key = toCamelCase(arg.slice(2));
    const next = rawArgs[index + 1];
    if (next == null || next.startsWith("--")) {
      parsed[key] = "true";
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function toCamelCase(value) {
  return value.replaceAll(/-([a-z])/gu, (_, char) => char.toUpperCase());
}

function resolvePolicies(value) {
  if (value === "all") {
    return ["phase-lock", "index-ratio"];
  }
  if (value === "phase-lock" || value === "index-ratio") {
    return [value];
  }
  throw new Error("--policy must be one of: all, phase-lock, index-ratio.");
}

function parsePositiveInteger(value, label) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`--${label} must be a positive integer.`);
  }
  return parsed;
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required solver WASM artifact is missing: ${filePath}`);
  }
}

function formatNumber(value) {
  return Number.isFinite(value) ? value.toPrecision(8) : String(value);
}

function subtractVectors(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function scaleVector(vector, scale) {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale,
  };
}

function crossVectors(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function vectorNorm(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function maxFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/angular-momentum/tri-binary-offset-family-runner.mjs [options]");
  console.log("");
  console.log("Options:");
  console.log("  --f-min <n>       First f index to test. Default: 2");
  console.log("  --f-max <n>       Last f index to test. Default: 8");
  console.log("  --policy <name>   all | phase-lock | index-ratio. Default: all");
  console.log(`  --output <path>   JSON report path. Default: ${DEFAULT_OUTPUT_PATH}`);
  console.log("  --wasm-dir <path> Solver WASM build directory. Default: .tmp/solver-build/wasm");
  process.exit(exitCode);
}
