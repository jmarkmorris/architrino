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
const TIME_WINDOW_TORQUE_SAMPLE_COUNT = 65;
const TIME_WINDOW_TORQUE_RESIDUAL_TOLERANCE = 1e-8;
const POINT_EVENT_TORQUE_RESIDUAL_TOLERANCE = 1e-12;
const POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE = 1e-12;
const BINARY_TO_BINARY_PATH_SEGMENT_COUNT = 32;
const ENDPOINT_LINEAR_SEGMENT_CONVERGENCE_COUNTS = [16, 32, 64, 128, 256];
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
  requestedCapabilities: [
    "sharedGeometry",
    "causalRoots",
    "delayedHits",
    "phaseDiagnostics",
    "pathHistory",
  ],
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
  const selectedRetainedLineagePhaseProbe = createSelectedRetainedLineagePhaseProbe(cases, comparisons);
  const retainedLineagePhaseProbe = await attachSelectedTimeWindowTorqueProbe({
    client,
    cases,
    retainedLineagePhaseProbe: selectedRetainedLineagePhaseProbe,
  });

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

function createCircularSourceRequest({ policy, f, family, layer, hitTime = CLOSURE_PERIOD }) {
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
    hitTime,
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
      "The branch-chart projection exposes sampled active roots at one hit time; the selected-case time-window probe adds a fixed-receiver rank-zero diagnostic, but it does not identify a retained binary-to-binary active-row set over W.",
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

function createWakeActionKernelBlocker({
  normalizedActionKernelWakeChargeCandidate = null,
  retainedActionKernelPullbackDomainTarget = null,
  normalizedActionKernelWakeCharge = null,
  retainedActionKernelPullbackDomain = null,
  actionKernelNormalizationConventionCandidate = null,
  chartRestrictedCrossingDomainRows = null,
  kernelGradientIntegralCandidate = null,
  finiteEndpointClearKernelGradientIntegralEvaluation = null,
  masterEquationCharacteristicTailPullbackCandidate = null,
  wakeEnergyIncrementTarget = null,
} = {}) {
  const chargeCandidatePopulated =
    normalizedActionKernelWakeChargeCandidate?.candidatePopulated === true;
  const chargeAccepted =
    normalizedActionKernelWakeCharge?.acceptedActionKernelChargePass === true;
  const pullbackTargetPopulated =
    retainedActionKernelPullbackDomainTarget?.targetPopulated === true;
  const retainedCrossingDomainPullbackAccepted =
    retainedActionKernelPullbackDomain?.acceptedRetainedCrossingDomainPullbackPass ===
    true;
  const normalizationConventionPopulated =
    actionKernelNormalizationConventionCandidate?.candidatePopulated === true;
  const crossingDomainAccepted =
    chartRestrictedCrossingDomainRows?.acceptedCrossingDomainPass === true;
  const kernelGradientCandidatePopulated =
    kernelGradientIntegralCandidate?.candidatePopulated === true;
  const kernelGradientCandidateEvaluated =
    finiteEndpointClearKernelGradientIntegralEvaluation?.candidateEvaluationPass ===
    true;
  const characteristicTailTargetPopulated =
    masterEquationCharacteristicTailPullbackCandidate?.targetPopulated === true;
  const characteristicTailAlignmentPass =
    masterEquationCharacteristicTailPullbackCandidate?.pairRadialAlignmentPass ===
    true;
  const characteristicTailRadialConstrainedSolvePass =
    masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolvePass ===
    true;
  const characteristicTailCoefficientQuadraturePass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.candidatePass === true;
  const characteristicTailSingleCoefficientSignPatternPass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.candidatePass === true;
  const characteristicTailLayerPolarityAssignmentPass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
      ?.candidatePass === true;
  const characteristicTailSourceReceiverPolarityRowBindingPass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.candidatePass === true;
  const characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeDerivedMetadataPass === true;
  const characteristicTailRouteLocalPolarityAcceptancePass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeLocalPolarityAcceptanceTarget?.acceptedSourceReceiverPolarityMetadataPass ===
    true;
  const characteristicTailRouteLocalCoefficientAcceptancePass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget?.acceptedCoefficientQuadraturePass ===
    true;
  const characteristicTailRouteLocalRowAmplitudeRequirementPass =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget?.rowAmplitudeRequirementPass === true;
  const wakeEnergyTargetPopulated =
    wakeEnergyIncrementTarget?.targetPopulated === true;
  const sameRetainedActiveRowIds =
    retainedActionKernelPullbackDomainTarget?.sameRetainedActiveRowIds ?? [];
  const requiredFields = [
    "eta",
    "epsilonC",
    "endpointConvention",
    "sameRetainedActiveRowIds",
    "chartRestrictedCrossingDomainRows",
    "kernelGradientIntegral",
    "masterEquationCharacteristicTailPullback",
    "retainedCrossingDomainPullback",
    "delta_eta_of_g_quadrature",
    "kappa_sigma_charge_coefficient",
    "layer_polarity_sign_assignment",
    "source_receiver_polarity_sign_rows",
    "wakeEnergyIncrement",
  ];
  const fieldRows = [
    {
      field: "eta",
      state: crossingDomainAccepted
        ? "accepted"
        : normalizationConventionPopulated
        ? "candidate_populated_not_accepted"
        : "missing",
      requiredFor: "regularized action-kernel normalization",
      acceptanceScope: crossingDomainAccepted
        ? "accepted for the route-local chart-restricted crossing-domain rows only"
        : null,
      targetValue:
        actionKernelNormalizationConventionCandidate?.etaCandidate ?? null,
    },
    {
      field: "epsilonC",
      state: crossingDomainAccepted
        ? "accepted"
        : normalizationConventionPopulated
        ? "candidate_populated_not_accepted"
        : "missing",
      requiredFor: "characteristic-tail cutoff / crossing regularization",
      acceptanceScope: crossingDomainAccepted
        ? "accepted for the route-local chart-restricted crossing-domain rows only"
        : null,
      targetValue:
        actionKernelNormalizationConventionCandidate?.epsilonCCandidate ?? null,
    },
    {
      field: "endpointConvention",
      state: crossingDomainAccepted
        ? "accepted"
        : normalizationConventionPopulated
        ? "candidate_populated_not_accepted"
        : "missing",
      requiredFor: "boundary sign and endpoint ownership convention",
      acceptanceScope: crossingDomainAccepted
        ? "accepted for the route-local chart-restricted crossing-domain rows only"
        : null,
      targetValue:
        actionKernelNormalizationConventionCandidate?.endpointConvention ?? null,
    },
    {
      field: "sameRetainedActiveRowIds",
      state:
        crossingDomainAccepted
          ? "accepted"
          : sameRetainedActiveRowIds.length > 0
          ? "target_populated_not_accepted"
          : "missing",
      requiredFor:
        "same retained active rows used by route, wake, and kernel pullback",
      acceptanceScope: crossingDomainAccepted
        ? "accepted for this route-authorized crossing-domain certificate, not a global retained time-domain claim"
        : null,
      targetValue: sameRetainedActiveRowIds,
    },
    {
      field: "chartRestrictedCrossingDomainRows",
      state: crossingDomainAccepted
        ? "accepted"
        : pullbackTargetPopulated
        ? "target_populated_not_evaluated"
        : "missing",
      requiredFor:
        "retained crossing-domain rows over the route-authorized chart",
      targetValue:
        chartRestrictedCrossingDomainRows?.rows ??
        retainedActionKernelPullbackDomainTarget?.routeRows ??
        [],
      acceptedRowCount:
        chartRestrictedCrossingDomainRows?.acceptedRowCount ?? null,
      routeRowCount: chartRestrictedCrossingDomainRows?.routeRowCount ?? null,
    },
    {
      field: "kernelGradientIntegral",
      state: chargeAccepted
        ? "accepted"
        : kernelGradientCandidateEvaluated
        ? "candidate_evaluated_not_accepted"
        : kernelGradientCandidatePopulated
        ? "candidate_populated_not_kernel_evaluated"
        : "missing",
      requiredFor:
        "evaluated normalized Master-Equation action-kernel boundary integral",
      targetValue:
        finiteEndpointClearKernelGradientIntegralEvaluation?.rows ??
        kernelGradientIntegralCandidate?.routeKernelGradientRows ?? [],
      targetResidualNorm:
        finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
        kernelGradientIntegralCandidate?.targetResidualNorm ?? null,
      acceptedEvaluationLimitation: chargeAccepted
        ? "accepted through the route-local Master-Equation characteristic-tail coefficient rows, not as a global retained branch integral"
        : kernelGradientCandidateEvaluated
        ? "finite endpoint-clear constant-density route-gradient evaluation only; accepted characteristic-tail boundary charge not yet derived"
        : null,
    },
    {
      field: "masterEquationCharacteristicTailPullback",
      state: chargeAccepted
        ? "accepted"
        : characteristicTailSourceReceiverPolarityRowBindingPass
        ? "candidate_source_receiver_polarity_row_binding_populated_not_accepted"
        : characteristicTailLayerPolarityAssignmentPass
        ? "candidate_layer_polarity_assignment_populated_not_accepted"
        : characteristicTailSingleCoefficientSignPatternPass
        ? "candidate_single_coefficient_sign_pattern_populated_not_accepted"
        : characteristicTailCoefficientQuadraturePass
        ? "candidate_coefficient_quadrature_populated_not_accepted"
        : characteristicTailRadialConstrainedSolvePass
        ? "candidate_radial_constrained_charge_matched_not_accepted"
        : characteristicTailAlignmentPass
        ? "candidate_aligned_not_accepted"
        : characteristicTailTargetPopulated
          ? "candidate_populated_pair_radial_alignment_blocked"
          : kernelGradientCandidateEvaluated
            ? "target_populated_pair_radial_rows_missing"
            : "missing",
      requiredFor:
        "pullback of the Master-Equation receiver/source gradient identity onto the same route rows",
      targetValue:
        masterEquationCharacteristicTailPullbackCandidate?.rows ?? [],
      targetResidualNorm:
        masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolve
          ?.targetResidualNorm ??
        masterEquationCharacteristicTailPullbackCandidate?.maxPairRadialResidualNorm ??
        null,
      missingAcceptedFields:
        masterEquationCharacteristicTailPullbackCandidate?.missingAcceptedFields ??
        null,
    },
    {
      field: "retainedCrossingDomainPullback",
      state: retainedCrossingDomainPullbackAccepted
        ? "accepted"
        : chargeAccepted && crossingDomainAccepted && pullbackTargetPopulated
        ? "route_authorized_target_populated_not_accepted"
        : crossingDomainAccepted && pullbackTargetPopulated
        ? "blocked_until_normalized_boundary_charge_acceptance"
        : pullbackTargetPopulated
        ? "target_populated_crossing_domain_unaccepted"
        : "missing",
      requiredFor:
        "accepted retained crossing-domain pullback for the same route-authorized event",
      targetValue: retainedActionKernelPullbackDomain ?? null,
      acceptanceScope: retainedCrossingDomainPullbackAccepted
        ? "accepted for this route-authorized retained event only; not a positive-width global retained branch domain"
        : null,
    },
    {
      field: "delta_eta_of_g_quadrature",
      state: characteristicTailRouteLocalCoefficientAcceptancePass
        ? "accepted"
        : characteristicTailCoefficientQuadraturePass
        ? "candidate_populated_not_accepted"
        : characteristicTailRadialConstrainedSolvePass
          ? "missing"
          : "blocked_until_pair_radial_constrained_solve",
      requiredFor:
        "Master-Equation characteristic-tail amplitude on each side row",
      targetValue:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.rows ?? [],
      maxAbsCausalGap:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.maxAbsCausalGap ?? null,
      maxAbsSignedDeltaEtaCandidate:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.maxAbsSignedDeltaEtaCandidate ?? null,
      acceptanceScope: characteristicTailRouteLocalCoefficientAcceptancePass
        ? "accepted for the route-local characteristic-tail coefficient rows only"
        : null,
    },
    {
      field: "kappa_sigma_charge_coefficient",
      state: characteristicTailRouteLocalCoefficientAcceptancePass
        ? "accepted"
        : characteristicTailRouteLocalRowAmplitudeRequirementPass
        ? "row_amplitude_requirement_populated_law_missing"
        : characteristicTailCoefficientQuadraturePass
        ? "candidate_required_coefficients_populated_not_accepted"
        : characteristicTailRadialConstrainedSolvePass
          ? "missing"
          : "blocked_until_pair_radial_constrained_solve",
      requiredFor:
        "accepted coupling/sign multiplier for the normalized action-kernel boundary charge",
      targetValue:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.rows ?? [],
      maxAbsRequiredCouplingCoefficient:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.commonCouplingCoefficient ??
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.maxAbsRequiredCouplingCoefficient ??
        null,
      mixedRequiredCoefficientSigns:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.mixedRequiredCoefficientSigns ?? null,
      routeLocalCoefficientAcceptanceStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.routeLocalCoefficientAcceptanceTarget?.status ?? null,
      acceptanceScope: characteristicTailRouteLocalCoefficientAcceptancePass
        ? "accepted common kappa with route-local sigma signs only"
        : null,
    },
    {
      field: "source_receiver_polarity_sign_rows",
      state: characteristicTailRouteLocalPolarityAcceptancePass
        ? "accepted"
        : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
        ? "route_derived_metadata_populated_not_accepted"
        : characteristicTailSourceReceiverPolarityRowBindingPass
        ? "candidate_row_binding_populated_acceptance_metadata_missing"
        : characteristicTailLayerPolarityAssignmentPass
        ? "missing_for_candidate_layer_polarity_assignment"
        : characteristicTailSingleCoefficientSignPatternPass
        ? "missing_for_candidate_sign_pattern"
        : characteristicTailCoefficientQuadraturePass
          ? "missing"
          : "blocked_until_coefficient_quadrature",
      requiredFor:
        "accepted sigma_ij signs that supply the candidate characteristic-tail sign pattern",
      targetValue:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.rows ??
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.rows ??
        [],
      requiredSignPattern:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.signPattern ?? null,
      metadataStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.metadataStatus ?? null,
      routeDerivedMetadataStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.routeDerivedMetadataTarget?.status ?? null,
      acceptanceScope: characteristicTailRouteLocalPolarityAcceptancePass
        ? "accepted for the route-local characteristic-tail rows only; not a global retained branch polarity claim"
        : null,
    },
    {
      field: "layer_polarity_sign_assignment",
      state: characteristicTailRouteLocalPolarityAcceptancePass
        ? "accepted"
        : characteristicTailLayerPolarityAssignmentPass
        ? "candidate_populated_not_accepted"
        : characteristicTailSingleCoefficientSignPatternPass
          ? "missing"
          : "blocked_until_single_coefficient_sign_pattern",
      requiredFor:
        "layer-level polarity assignment that satisfies the candidate sigma signs",
      targetValue:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget ??
        null,
      acceptanceScope: characteristicTailRouteLocalPolarityAcceptancePass
        ? "middle-positive canonical representative accepted for the route-local wake rows"
        : null,
    },
    {
      field: "wakeChargeCandidate",
      state: chargeAccepted
        ? "accepted"
        : kernelGradientCandidateEvaluated
        ? "candidate_matched_not_accepted"
        : chargeCandidatePopulated
        ? "target_populated_not_evaluated"
        : "missing",
      requiredFor:
        "target vector for the normalized action-kernel boundary integral",
      targetValue:
        normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null,
      targetResidualNorm:
        normalizedActionKernelWakeCharge?.targetResidualNorm ??
        finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
        normalizedActionKernelWakeChargeCandidate?.candidateResidualNorm ?? null,
    },
    {
      field: "wakeEnergyIncrement",
      state: wakeEnergyTargetPopulated ? "target_populated_law_missing" : "missing",
      requiredFor: "retained wake-energy routing on the same event",
      targetValue: wakeEnergyIncrementTarget,
    },
  ];
  const missingAcceptedFields = fieldRows
    .filter((row) => row.state !== "accepted")
    .map((row) => row.field);
  return {
    status:
      chargeAccepted && retainedCrossingDomainPullbackAccepted
        ? "blocked_characteristic_tail_boundary_charge_pullback_accepted_wake_energy_missing"
        : chargeAccepted
        ? "blocked_characteristic_tail_normalized_boundary_charge_accepted_retained_pullback_and_wake_energy_missing"
        : characteristicTailRouteLocalCoefficientAcceptancePass
        ? "blocked_characteristic_tail_route_local_coefficients_accepted_boundary_charge_pullback_and_wake_energy_missing"
        : characteristicTailRouteLocalRowAmplitudeRequirementPass
        ? "blocked_characteristic_tail_route_local_row_amplitude_requirement_populated_boundary_charge_pullback_and_wake_energy_missing"
        : characteristicTailRouteLocalPolarityAcceptancePass
        ? "blocked_characteristic_tail_route_local_polarity_metadata_accepted_boundary_charge_pullback_and_wake_energy_missing"
        : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
        ? "blocked_characteristic_tail_source_receiver_polarity_route_derived_metadata_acceptance_and_wake_energy_missing"
        : characteristicTailSourceReceiverPolarityRowBindingPass
        ? "blocked_characteristic_tail_source_receiver_polarity_row_binding_candidate_acceptance_and_wake_energy_missing"
        : characteristicTailLayerPolarityAssignmentPass
        ? "blocked_characteristic_tail_layer_polarity_assignment_candidate_source_receiver_rows_and_wake_energy_missing"
        : characteristicTailSingleCoefficientSignPatternPass
        ? "blocked_characteristic_tail_single_coefficient_sign_pattern_candidate_polarity_and_wake_energy_missing"
        : characteristicTailCoefficientQuadraturePass
        ? "blocked_characteristic_tail_coefficient_quadrature_candidate_acceptance_and_wake_energy_missing"
        : characteristicTailRadialConstrainedSolvePass
        ? "blocked_characteristic_tail_radial_constrained_candidate_coefficients_and_wake_energy_missing"
        : characteristicTailTargetPopulated && !characteristicTailAlignmentPass
        ? "blocked_characteristic_tail_pair_radial_alignment_residual"
        : characteristicTailAlignmentPass
        ? "blocked_characteristic_tail_pair_radial_target_coefficients_and_wake_energy_missing"
        : chargeCandidatePopulated &&
          pullbackTargetPopulated &&
          normalizationConventionPopulated &&
          crossingDomainAccepted &&
          kernelGradientCandidateEvaluated
          ? "blocked_finite_endpoint_clear_kernel_gradient_candidate_master_law_pullback_missing"
          : chargeCandidatePopulated &&
            pullbackTargetPopulated &&
            normalizationConventionPopulated &&
            crossingDomainAccepted &&
            kernelGradientCandidatePopulated
            ? "blocked_chart_restricted_crossing_domain_accepted_kernel_integral_unevaluated"
            : chargeCandidatePopulated &&
              pullbackTargetPopulated &&
              normalizationConventionPopulated &&
              crossingDomainAccepted
              ? "blocked_chart_restricted_crossing_domain_accepted_kernel_gradient_candidate_missing"
              : chargeCandidatePopulated &&
                pullbackTargetPopulated &&
                normalizationConventionPopulated &&
                kernelGradientCandidatePopulated
                ? "blocked_action_kernel_convention_and_gradient_candidates_populated_crossing_domain_unaccepted"
                : chargeCandidatePopulated &&
                  pullbackTargetPopulated &&
                  normalizationConventionPopulated
                  ? "blocked_action_kernel_convention_candidate_populated_crossing_domain_missing"
                  : chargeCandidatePopulated &&
                    pullbackTargetPopulated &&
                    kernelGradientCandidatePopulated
                    ? "blocked_action_kernel_charge_domain_and_gradient_candidate_populated_normalization_missing"
                    : chargeCandidatePopulated && pullbackTargetPopulated
                      ? "blocked_action_kernel_charge_and_domain_targets_populated_kernel_integral_missing"
                      : "blocked_missing_normalized_action_kernel_boundary_charge",
    missing: chargeAccepted && retainedCrossingDomainPullbackAccepted
      ? "The wake-energy increment on the same route-authorized retained event."
      : chargeAccepted
        ? "The accepted retained crossing-domain pullback and wake-energy increment on the same route-authorized retained event."
        : "The normalized delayed-interior characteristic-tail boundary charge on the chart-restricted crossing domain for the same retained active rows.",
    currentBridgePayload:
      chargeCandidatePopulated && pullbackTargetPopulated
        ? chargeAccepted && retainedCrossingDomainPullbackAccepted
          ? "The route-authorized wake row now accepts the normalized action-kernel boundary charge and retained crossing-domain pullback for the route-local characteristic-tail rows, but it still lacks wake energy."
          : chargeAccepted
          ? "The route-authorized wake row now accepts the normalized action-kernel boundary charge for the route-local characteristic-tail rows, but it still lacks accepted retained crossing-domain pullback and wake energy."
          : characteristicTailRouteLocalCoefficientAcceptancePass
          ? "The route-authorized wake row now accepts route-local polarity metadata, delta_eta(g) quadrature, and the common kappa-sigma coefficient, but it still lacks accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailRouteLocalRowAmplitudeRequirementPass
          ? "The route-authorized wake row now accepts route-local polarity metadata and populates required per-row amplitude factors, while rejecting simple route-class, side, and endpoint-ownership amplitude laws. It still lacks an accepted amplitude law, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailRouteLocalPolarityAcceptancePass
          ? "The route-authorized wake row now accepts the route-derived source/receiver polarity metadata for the route-local characteristic-tail rows, but it still lacks accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
          ? "The route-authorized wake row now derives source/receiver polarity metadata from the branch-transport endpoint ownership and canonical layer-polarity assignment, but it still lacks accepted metadata status, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailSourceReceiverPolarityRowBindingPass
          ? "The route-authorized wake row now binds the candidate layer-polarity assignment to explicit source/receiver polarity rows, but it still lacks accepted polarity metadata, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailLayerPolarityAssignmentPass
          ? "The route-authorized wake row now finds a feasible layer-polarity assignment for the single-coefficient sign pattern, but it still lacks accepted source/receiver polarity rows, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailSingleCoefficientSignPatternPass
          ? "The route-authorized wake row now finds a single positive coupling coefficient and side sign pattern that reconstruct the boundary charge, but it still lacks accepted source/receiver polarity signs, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailCoefficientQuadraturePass
          ? "The route-authorized wake row now evaluates delta_eta(g) quadrature and the required coupling/sign coefficient candidates for the side-split pair-radial characteristic-tail solve, but it still lacks accepted coefficients, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailRadialConstrainedSolvePass
          ? "The route-authorized wake row now replaces the free route-gradient target with a side-split pair-radial characteristic-tail solve that reconstructs the boundary charge, but it still lacks delta_eta(g) quadrature, coupling/sign coefficients, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : characteristicTailTargetPopulated && !characteristicTailAlignmentPass
          ? "The route-authorized wake row now evaluates the finite endpoint-clear route-gradient candidate and projects it onto available pair-radial source/receiver rows, but the finite gradient is not aligned with the Master-Equation characteristic-tail radial identity on the same route sides."
          : characteristicTailAlignmentPass
          ? "The route-authorized wake row now has a pair-radial characteristic-tail target aligned with the finite gradient, but it still lacks delta_eta(g) quadrature, coupling/sign coefficients, accepted action-kernel charge, retained crossing-domain pullback, and wake energy."
          : crossingDomainAccepted && kernelGradientCandidateEvaluated
          ? "The route-authorized wake row now evaluates a finite endpoint-clear route-gradient candidate over accepted crossing-domain rows and matches the target charge, but it still lacks the Master-Equation characteristic-tail pullback on those route rows, accepted action-kernel charge, and wake energy."
          : crossingDomainAccepted && kernelGradientCandidatePopulated
          ? "The route-authorized wake row now accepts finite chart-restricted crossing-domain rows and exposes the least-norm route-gradient candidate, but it still does not evaluate the normalized kernel integral or assign wake energy."
          : normalizationConventionPopulated && kernelGradientCandidatePopulated
          ? "The route-authorized wake row now exposes the target charge, target crossing domain, normalization convention candidate, and least-norm route-gradient candidate, but it still does not accept the retained crossing-domain rows, evaluate the normalized kernel integral, or assign wake energy."
          : normalizationConventionPopulated
          ? "The route-authorized wake row now exposes the target charge, target crossing domain, and normalization convention candidate, but it still does not accept crossing-domain rows, evaluate the kernel-gradient integral, or assign wake energy."
          : kernelGradientCandidatePopulated
          ? "The route-authorized wake row now exposes the target charge, target crossing domain, and least-norm route-gradient candidate, but it still does not evaluate eta, epsilonC, endpoint convention, the normalized kernel integral, or wake energy."
          : "The route-authorized wake row now exposes the target charge and target crossing domain, but it still does not evaluate eta, epsilonC, endpoint convention, chart-restricted crossing rows, the kernel-gradient integral, or wake energy."
        : "The diagnostic wake row only attaches the negative instantaneous torque sample; it does not evaluate the Master-Equation action-kernel boundary integral.",
    requiredFields,
    fieldRows,
    missingAcceptedFields,
    nextEvaluationTarget: {
      status: characteristicTailSingleCoefficientSignPatternPass
        ? chargeAccepted && retainedCrossingDomainPullbackAccepted
          ? wakeEnergyTargetPopulated
            ? "wake_energy_increment_law_next"
            : "wake_energy_increment_next"
          : chargeAccepted
          ? "retained_crossing_domain_pullback_and_wake_energy_next"
          : characteristicTailRouteLocalCoefficientAcceptancePass
          ? "accepted_boundary_charge_pullback_and_wake_energy_next"
          : characteristicTailRouteLocalRowAmplitudeRequirementPass
          ? "accepted_row_amplitude_law_boundary_charge_pullback_and_wake_energy_next"
          : characteristicTailRouteLocalPolarityAcceptancePass
          ? "accepted_boundary_charge_pullback_and_wake_energy_next"
          : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
          ? "accepted_route_derived_polarity_rows_boundary_charge_pullback_and_wake_energy_next"
          : characteristicTailSourceReceiverPolarityRowBindingPass
          ? "accepted_polarity_rows_boundary_charge_pullback_and_wake_energy_next"
          : characteristicTailLayerPolarityAssignmentPass
          ? "source_receiver_polarity_rows_boundary_charge_pullback_and_wake_energy_next"
          : "polarity_sign_rows_boundary_charge_pullback_and_wake_energy_next"
        : characteristicTailCoefficientQuadraturePass
        ? "accepted_boundary_charge_pullback_and_wake_energy_next"
        : characteristicTailRadialConstrainedSolvePass
        ? "delta_eta_coefficients_and_wake_energy_next"
        : characteristicTailTargetPopulated && !characteristicTailAlignmentPass
        ? "pair_radial_characteristic_tail_alignment_residual_next"
        : characteristicTailAlignmentPass
        ? "delta_eta_coefficients_and_wake_energy_next"
        : crossingDomainAccepted && kernelGradientCandidateEvaluated
        ? "master_equation_characteristic_tail_pullback_next"
        : crossingDomainAccepted && kernelGradientCandidatePopulated
        ? "normalized_kernel_gradient_integral_next"
        : normalizationConventionPopulated && kernelGradientCandidatePopulated
        ? "chart_restricted_crossing_domain_rows_first"
        : normalizationConventionPopulated
        ? "chart_restricted_crossing_domain_rows_first"
        : kernelGradientCandidatePopulated
        ? "normalization_and_endpoint_convention_first"
        : "kernel_gradient_integral_first",
      calculation:
        characteristicTailSingleCoefficientSignPatternPass
          ? chargeAccepted && retainedCrossingDomainPullbackAccepted
            ? wakeEnergyTargetPopulated
              ? "Derive the action-boundary wake-energy increment law on the accepted route-authorized crossing-domain rows, or prove an equivalent work-integral or retained near-field route for the same event."
              : "Assign the wake-energy increment on the same route-authorized event using the accepted normalized boundary charge and retained crossing-domain pullback."
            : chargeAccepted
            ? "Assign the accepted retained crossing-domain pullback and wake-energy increment on the same route-authorized event using the accepted normalized boundary charge."
            : characteristicTailRouteLocalCoefficientAcceptancePass
            ? "Assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event using the accepted route-local coefficient rows."
            : characteristicTailRouteLocalRowAmplitudeRequirementPass
            ? "Derive or reject the accepted route-local row-amplitude law beyond simple route-class, side, and endpoint-ownership scalars, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
            : characteristicTailRouteLocalPolarityAcceptancePass
            ? "Assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event using the route-local accepted polarity metadata."
            : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
            ? "Promote or reject the route-derived source/receiver polarity metadata against accepted layer-polarity status, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
            : characteristicTailSourceReceiverPolarityRowBindingPass
            ? "Promote or reject the candidate source/receiver polarity row binding against accepted source and receiver polarity metadata, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
            : characteristicTailLayerPolarityAssignmentPass
            ? "Bind accepted source/receiver polarity rows to the candidate layer-polarity assignment, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
            : "Evaluate accepted source/receiver polarity signs for the candidate single-coefficient sign pattern, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
          : characteristicTailCoefficientQuadraturePass
          ? "Promote or reject the candidate coupling/sign coefficients against accepted polarity/sign rows, then assign the accepted normalized boundary charge, retained crossing-domain pullback, and wake-energy increment on the same route-authorized event."
          : characteristicTailRadialConstrainedSolvePass
          ? "Evaluate delta_eta(g) quadrature and coupling/sign coefficients for the side-split pair-radial characteristic-tail rows, then assign the accepted normalized boundary charge and wake-energy increment on the same route-authorized event."
          : characteristicTailTargetPopulated && !characteristicTailAlignmentPass
          ? "Resolve whether the finite endpoint-clear route-gradient target should be changed, split by incoming/outgoing side weights, or rejected because it is not radial with respect to the Master-Equation source/receiver pair geometry on the same route rows."
          : characteristicTailAlignmentPass
          ? "Evaluate delta_eta(g) quadrature and coupling/sign coefficients for the aligned pair-radial rows, then assign the accepted normalized boundary charge and wake-energy increment on the same route-authorized event."
          : crossingDomainAccepted && kernelGradientCandidateEvaluated
          ? "Pull back the Master-Equation characteristic-tail law to the accepted route rows by declaring pair radial geometry, delta_eta(g) quadrature, coupling/sign coefficients, and wake-energy bookkeeping on the same route-authorized event."
          : crossingDomainAccepted && kernelGradientCandidatePopulated
          ? "Evaluate the normalized delayed-interior characteristic-tail kernel-gradient integral on the accepted chart-restricted crossing-domain rows using the accepted eta, epsilonC, and endpoint convention, then compare the resulting boundary charge against the populated least-norm target."
          : normalizationConventionPopulated && kernelGradientCandidatePopulated
          ? "Certify chart-restricted crossing-domain rows for the same retained active row IDs, then evaluate the normalized delayed-interior characteristic-tail kernel-gradient integral using the declared eta, epsilonC, and endpoint convention. The least-norm route-gradient row is only a target check."
          : normalizationConventionPopulated
          ? "Certify chart-restricted crossing-domain rows for the same retained active row IDs using the declared eta, epsilonC, and endpoint convention, then evaluate the kernel-gradient integral on those rows."
          : kernelGradientCandidatePopulated
          ? "Choose eta, epsilonC, and endpoint convention, then replace the least-norm route-gradient candidate with the normalized delayed-interior characteristic-tail kernel-gradient integral on the same route-authorized crossing-domain rows."
          : "Evaluate the normalized delayed-interior characteristic-tail kernel-gradient integral on the route-authorized crossing-domain rows, using the same retained active row IDs and endpoint convention, then compare the resulting boundary charge with the populated wake-charge candidate.",
      etaCandidate:
        actionKernelNormalizationConventionCandidate?.etaCandidate ?? null,
      epsilonCCandidate:
        actionKernelNormalizationConventionCandidate?.epsilonCCandidate ?? null,
      endpointConvention:
        actionKernelNormalizationConventionCandidate?.endpointConvention ?? null,
      targetCharge:
        normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null,
      targetChargeNorm:
        normalizedActionKernelWakeChargeCandidate?.candidateChargeNorm ?? null,
      crossingDomainStatus: chartRestrictedCrossingDomainRows?.status ?? null,
      crossingDomainRowCount:
        chartRestrictedCrossingDomainRows?.routeRowCount ?? null,
      crossingDomainAcceptedRowCount:
        chartRestrictedCrossingDomainRows?.acceptedRowCount ?? null,
      finiteEndpointClearEvaluationStatus:
        finiteEndpointClearKernelGradientIntegralEvaluation?.status ?? null,
      finiteEndpointClearEvaluationResidualNorm:
        finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
        null,
      characteristicTailPullbackStatus:
        masterEquationCharacteristicTailPullbackCandidate?.status ?? null,
      characteristicTailPullbackMaxPairRadialResidualNorm:
        masterEquationCharacteristicTailPullbackCandidate?.maxPairRadialResidualNorm ??
        null,
      characteristicTailRadialConstrainedSolveStatus:
        masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolve
          ?.status ?? null,
      characteristicTailRadialConstrainedSolveResidualNorm:
        masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolve
          ?.targetResidualNorm ?? null,
      characteristicTailCoefficientQuadratureStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.status ?? null,
      characteristicTailCoefficientQuadratureMaxAbsCausalGap:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.maxAbsCausalGap ?? null,
      characteristicTailCoefficientQuadratureMaxAbsRequiredCouplingCoefficient:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.maxAbsRequiredCouplingCoefficient ?? null,
      characteristicTailCoefficientQuadratureMixedRequiredCoefficientSigns:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.mixedRequiredCoefficientSigns ?? null,
      characteristicTailRouteLocalCoefficientAcceptanceStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.routeLocalCoefficientAcceptanceTarget?.status ?? null,
      characteristicTailSingleCoefficientSignPatternStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.status ?? null,
      characteristicTailSingleCoefficientSignPatternResidualNorm:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.targetResidualNorm ?? null,
      characteristicTailSingleCoefficient:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.commonCouplingCoefficient ?? null,
      characteristicTailSingleCoefficientSignPattern:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.signPattern ?? null,
      characteristicTailLayerPolaritySignFeasibilityStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
          ?.status ?? null,
      characteristicTailLayerPolarityCanonicalAssignment:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
          ?.canonicalAssignment ?? null,
      characteristicTailLayerPolarityAssignmentCount:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
          ?.assignmentCount ?? null,
      characteristicTailSourceReceiverPolarityRowBindingStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.status ?? null,
      characteristicTailSourceReceiverPolarityRowBindingCandidateRowCount:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.candidateRowCount ?? null,
      characteristicTailSourceReceiverPolarityRowBindingAcceptedRowCount:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.acceptedRowCount ?? null,
      characteristicTailSourceReceiverPolarityRowBindingMetadataStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.metadataStatus ?? null,
      characteristicTailSourceReceiverPolarityRouteDerivedMetadataStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.routeDerivedMetadataTarget?.status ?? null,
      characteristicTailSourceReceiverPolarityRouteDerivedMetadataRowCount:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.routeDerivedMetadataTarget?.rowCount ?? null,
      characteristicTailSourceReceiverPolarityRouteLocalAcceptanceStatus:
        masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
          ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
          ?.routeLocalPolarityAcceptanceTarget?.status ?? null,
      characteristicTailPullbackMissingAcceptedFields:
        masterEquationCharacteristicTailPullbackCandidate?.missingAcceptedFields ??
        null,
      wakeEnergyIncrementTargetStatus:
        wakeEnergyIncrementTarget?.status ?? null,
      wakeEnergyIncrementCandidateRoutes:
        wakeEnergyIncrementTarget?.candidateRoutes ?? null,
      targetResidualNorm:
        finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
        kernelGradientIntegralCandidate?.targetResidualNorm ??
        normalizedActionKernelWakeChargeCandidate?.candidateResidualNorm ??
        null,
    },
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

function createMinimalBranchTransactionFrequencyCertificate({
  selectedCase,
  cleanEnergyFrequencyTarget,
  candidateCapturePass,
  topologyRunsThroughMiddle,
  hingeChartContinuityPass,
  geometryTransportPass,
}) {
  const angularVelocities = cleanEnergyFrequencyTarget?.angularVelocities ?? {};
  const actionWeights = cleanEnergyFrequencyTarget?.actionWeights ?? {};
  const weightedOmegaNumerator =
    Number.isFinite(angularVelocities.outer) &&
    Number.isFinite(angularVelocities.middle) &&
    Number.isFinite(angularVelocities.inner) &&
    Number.isFinite(actionWeights.outer) &&
    Number.isFinite(actionWeights.middle) &&
    Number.isFinite(actionWeights.inner)
      ? actionWeights.outer * angularVelocities.outer +
        actionWeights.middle * angularVelocities.middle +
        actionWeights.inner * angularVelocities.inner
      : null;
  const actionWeightSum =
    Number.isFinite(actionWeights.outer) &&
    Number.isFinite(actionWeights.middle) &&
    Number.isFinite(actionWeights.inner)
      ? actionWeights.outer + actionWeights.middle + actionWeights.inner
      : null;
  const candidateOmegaTx =
    Number.isFinite(weightedOmegaNumerator) &&
    Number.isFinite(actionWeightSum) &&
    Math.abs(actionWeightSum) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? weightedOmegaNumerator / actionWeightSum
      : null;
  const targetOmegaTx = cleanEnergyFrequencyTarget?.omegaStar ?? null;
  const residual =
    Number.isFinite(candidateOmegaTx) && Number.isFinite(targetOmegaTx)
      ? candidateOmegaTx - targetOmegaTx
      : null;
  const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
  const frequencyIdentityPass =
    Number.isFinite(residualAbs) &&
    residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const middleHingeRow = findBranchChartProjectionRow(selectedCase, "middle_hinge");
  const innerSelfHitRow = findBranchChartProjectionRow(selectedCase, "inner_self_hit");
  const phaseClosureRow = findBranchChartProjectionRow(
    selectedCase,
    "cycle_phase_closure_proxy"
  );
  const selfRootParityRow = findBranchChartProjectionRow(
    selectedCase,
    "self_root_parity_index_proxy"
  );
  const indexOffset =
    Number.isFinite(selectedCase?.indices?.inner) &&
    Number.isFinite(selectedCase?.indices?.middle)
      ? selectedCase.indices.inner - selectedCase.indices.middle
      : null;
  const minimalSubstepPatternPass =
    selectedCase?.familyId === "middle-hinge-offset" &&
    indexOffset === 2 &&
    selfRootParityRow?.status === "index_proxy_matches_target";
  const reducedCertificatePass =
    frequencyIdentityPass &&
    selectedCase?.priorityCandidate === true &&
    minimalSubstepPatternPass &&
    middleHingeRow?.status === "reduced_pass" &&
    innerSelfHitRow?.status === "reduced_pass" &&
    phaseClosureRow?.status === "cycle_proxy_pass" &&
    candidateCapturePass === true &&
    topologyRunsThroughMiddle === true &&
    hingeChartContinuityPass === true;
  const acceptedRetainedEventDomainPass = false;
  const acceptedTransactionFrequencyPass =
    reducedCertificatePass &&
    geometryTransportPass === true &&
    selectedCase?.branchChartProjection?.retainedBranchClaim === true &&
    acceptedRetainedEventDomainPass === true;
  const acceptanceBlockers = [
    reducedCertificatePass ? null : "minimal_four_substep_reduced_certificate",
    geometryTransportPass === true
      ? null
      : "geometrically_continuous_branch_transport_pair_map",
    selectedCase?.branchChartProjection?.retainedBranchClaim === true
      ? null
      : "accepted_retained_branch_claim",
    acceptedRetainedEventDomainPass
      ? null
      : "accepted_retained_point_event_rule_or_positive_width_common_retained_time_domain",
    "same_event_energy_carrier_population",
  ].filter(Boolean);

  return {
    schema:
      "aaa-tri-binary-minimal-branch-transaction-frequency-certificate-target.v1",
    status: !Number.isFinite(candidateOmegaTx)
      ? "minimal_branch_transaction_frequency_certificate_missing_frequency"
      : !frequencyIdentityPass
        ? "minimal_branch_transaction_frequency_certificate_identity_mismatch"
        : acceptedTransactionFrequencyPass
          ? "minimal_branch_transaction_frequency_certificate_accepted"
          : reducedCertificatePass
            ? "minimal_branch_transaction_frequency_reduced_certificate_formal_acceptance_blocked"
            : "minimal_branch_transaction_frequency_reduced_certificate_incomplete",
    claimLevel:
      "minimal four-substep branch frequency certificate target; not accepted omega_tx until retained-event acceptance and same-event carrier population are supplied",
    retainedBranchClaim: false,
    acceptedTransactionFrequencyPass,
    acceptedRetainedEventDomainPass,
    reducedCertificatePass,
    frequencyIdentityPass,
    candidateOmegaTx,
    targetOmegaTx,
    residual,
    residualAbs,
    formula:
      "omega_tx^(4)=(omega_O+omega_M+2 omega_I)/(1+1+2)",
    actionWeights,
    actionWeightSum,
    weightedOmegaNumerator,
    selectedCaseId: selectedCase?.caseId ?? null,
    familyId: selectedCase?.familyId ?? null,
    familyLabel: selectedCase?.familyLabel ?? null,
    indices: selectedCase?.indices ?? null,
    indexOffset,
    minimalSubstepPatternPass,
    middleHingeStatus: middleHingeRow?.status ?? null,
    innerSelfHitStatus: innerSelfHitRow?.status ?? null,
    phaseClosureStatus: phaseClosureRow?.status ?? null,
    selfRootParityStatus: selfRootParityRow?.status ?? null,
    candidateCapturePass,
    topologyRunsThroughMiddle,
    hingeChartContinuityPass,
    geometryTransportPass,
    acceptanceBlockers,
    retainedLimitation:
      "The four-substep weighted frequency is exact for the selected reduced $(f-1,f,f+2)$ middle-hinge branch, but it is only an omega_tx source after the same route has an accepted retained point-event or positive-width retained domain, geometrically continuous branch transport, and same-event energy carrier population.",
  };
}

function findBranchChartProjectionRow(selectedCase, id) {
  return (
    selectedCase?.branchChartProjection?.populatedRows?.find(
      (row) => row.id === id
    ) ?? null
  );
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

async function attachSelectedTimeWindowTorqueProbe({
  client,
  cases,
  retainedLineagePhaseProbe,
}) {
  if (!retainedLineagePhaseProbe?.selectedCaseId) {
    return retainedLineagePhaseProbe;
  }
  const selectedCase = cases.find((item) => item.caseId === retainedLineagePhaseProbe.selectedCaseId);
  if (!selectedCase) {
    return {
      ...retainedLineagePhaseProbe,
      timeWindowTorqueProbe: {
        status: "selected_case_missing",
        retainedBranchClaim: false,
      },
    };
  }
  const timeWindowTorqueProbe = await createSelectedTimeWindowTorqueProbe({
    client,
    selectedCase,
    retainedLineagePhaseProbe,
  });
  const binaryToBinaryPathHistoryProbe = await createSelectedBinaryToBinaryPathHistoryProbe({
    client,
    selectedCase,
    timeWindowTorqueProbe,
  });
  const sourceReceiverPolarityPhaseMetadataCrossCheck =
    createSourceReceiverPolarityPhaseMetadataCrossCheck({
      rowBindingTarget:
        selectPreferredSourceReceiverPolarityRowBindingTarget(
          binaryToBinaryPathHistoryProbe
        ),
      phaseRows: retainedLineagePhaseProbe.phaseRows ?? [],
    });
  return {
    ...retainedLineagePhaseProbe,
    torqueWake: {
      ...retainedLineagePhaseProbe.torqueWake,
      status: "blocked_with_same_row_diagnostic_time_window_torque_and_binary_path_history_probe",
      torqueConsistencyStatus: timeWindowTorqueProbe.torqueConsistencyStatus,
      timeWindowTorqueProbe: timeWindowTorqueProbe.summary,
      binaryToBinaryPathHistoryProbe: binaryToBinaryPathHistoryProbe.summary,
      sourceReceiverPolarityPhaseMetadataCrossCheck:
        sourceReceiverPolarityPhaseMetadataCrossCheck.summary,
    },
    sourceReceiverPolarityPhaseMetadataCrossCheck,
    timeWindowTorqueProbe,
    binaryToBinaryPathHistoryProbe,
  };
}

function selectPreferredSourceReceiverPolarityRowBindingTarget(
  binaryToBinaryPathHistoryProbe
) {
  return (
    binaryToBinaryPathHistoryProbe?.ledgerDetailReplay?.transitionClassification
      ?.retainedHingePointProbe?.preferredBranchTransportHingeCandidate
      ?.middleFieldSpeedHingeCapture?.retainedChartFeasibility
      ?.wakePayloadDiagnostic?.masterEquationCharacteristicTailPullbackCandidate
      ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.sourceReceiverPolarityRowBindingTarget ?? null
  );
}

function createSourceReceiverPolarityPhaseMetadataCrossCheck({
  rowBindingTarget,
  phaseRows,
}) {
  const phaseRowByLayer = new Map(
    (phaseRows ?? [])
      .filter((row) => row?.layer)
      .map((row) => [row.layer, row])
  );
  const rows = (rowBindingTarget?.rows ?? []).map((row) =>
    createSourceReceiverPolarityPhaseMetadataCrossCheckRow({
      row,
      phaseRowByLayer,
    })
  );
  const sourceMatchedCount = rows.filter((row) => row.sourceMetadataPass).length;
  const sourceMismatchedCount = rows.filter(
    (row) => row.sourceMetadataStatus === "mismatched"
  ).length;
  const sourceMissingCount = rows.filter(
    (row) => row.sourceMetadataStatus === "missing"
  ).length;
  const receiverMatchedCount = rows.filter(
    (row) => row.receiverMetadataPass
  ).length;
  const receiverMismatchedCount = rows.filter(
    (row) => row.receiverMetadataStatus === "mismatched"
  ).length;
  const receiverMissingCount = rows.filter(
    (row) => row.receiverMetadataStatus === "missing"
  ).length;
  const crossCheckPopulated =
    rowBindingTarget?.candidatePass === true &&
    rows.length > 0 &&
    phaseRowByLayer.size > 0;
  const metadataAcceptablePass =
    crossCheckPopulated &&
    sourceMatchedCount === rows.length &&
    receiverMatchedCount === rows.length;
  const status = !rowBindingTarget
    ? "source_receiver_polarity_phase_metadata_cross_check_binding_target_missing"
    : !crossCheckPopulated
      ? "source_receiver_polarity_phase_metadata_cross_check_missing_inputs"
      : metadataAcceptablePass
        ? "source_receiver_polarity_phase_metadata_matches_bound_rows_not_accepted"
        : sourceMismatchedCount > 0 && receiverMissingCount > 0
          ? "source_receiver_polarity_phase_metadata_source_mismatch_and_receiver_missing"
          : receiverMissingCount > 0
            ? "source_receiver_polarity_phase_metadata_receiver_missing"
            : sourceMismatchedCount > 0 || receiverMismatchedCount > 0
              ? "source_receiver_polarity_phase_metadata_mismatch"
              : "source_receiver_polarity_phase_metadata_unaccepted";

  return {
    schema:
      "aaa-tri-binary-source-receiver-polarity-phase-metadata-cross-check.v1",
    status,
    claimLevel:
      "phase-at-hit metadata cross-check against the bound source/receiver polarity rows; not accepted binary-to-binary polarity metadata",
    crossCheckPopulated,
    acceptedSourceReceiverPolarityRowsPass: false,
    rowBindingStatus: rowBindingTarget?.status ?? null,
    phaseRowCount: phaseRows?.length ?? 0,
    boundRowCount: rows.length,
    sourceMatchedCount,
    sourceMismatchedCount,
    sourceMissingCount,
    receiverMatchedCount,
    receiverMismatchedCount,
    receiverMissingCount,
    summary: {
      status,
      boundRowCount: rows.length,
      sourceMatchedCount,
      sourceMismatchedCount,
      receiverMatchedCount,
      receiverMissingCount,
    },
    rows,
    retainedLimitation:
      "This cross-check uses sampled phase-at-hit metadata only. In the current report, source signs are uniform and only match the middle-layer rows, while receiver signs are not supplied. It cannot accept source/receiver polarity rows.",
  };
}

function createSourceReceiverPolarityPhaseMetadataCrossCheckRow({
  row,
  phaseRowByLayer,
}) {
  const sourcePhaseRow = phaseRowByLayer.get(row.sourceLayer) ?? null;
  const receiverPhaseRow = phaseRowByLayer.get(row.receiverLayer) ?? null;
  const sourcePhaseMetadataSign = normalizePolarityMetadataSign(
    sourcePhaseRow?.sourceChargeSign
  );
  const receiverPhaseMetadataSign = normalizePolarityMetadataSign(
    receiverPhaseRow?.receiverChargeSign
  );
  const sourceMetadataPass =
    Number.isFinite(sourcePhaseMetadataSign) &&
    sourcePhaseMetadataSign === row.sourceLayerSign;
  const receiverMetadataPass =
    Number.isFinite(receiverPhaseMetadataSign) &&
    receiverPhaseMetadataSign === row.receiverLayerSign;
  return {
    rowId: row.rowId,
    pairKey: row.pairKey,
    sourceLayer: row.sourceLayer,
    receiverLayer: row.receiverLayer,
    sourceLayerSign: row.sourceLayerSign,
    receiverLayerSign: row.receiverLayerSign,
    sourcePhaseRowId: sourcePhaseRow?.rowId ?? null,
    receiverPhaseRowId: receiverPhaseRow?.rowId ?? null,
    sourcePhaseMetadataSign,
    receiverPhaseMetadataSign,
    sourceMetadataStatus:
      sourcePhaseMetadataSign == null
        ? "missing"
        : sourceMetadataPass
          ? "matched"
          : "mismatched",
    receiverMetadataStatus:
      receiverPhaseMetadataSign == null
        ? "missing"
        : receiverMetadataPass
          ? "matched"
          : "mismatched",
    sourceMetadataPass,
    receiverMetadataPass,
  };
}

async function createSelectedTimeWindowTorqueProbe({
  client,
  selectedCase,
  retainedLineagePhaseProbe,
}) {
  const sampleGrid = createTimeWindowQuadratureGrid({
    start: 0,
    end: CLOSURE_PERIOD,
    sampleCount: TIME_WINDOW_TORQUE_SAMPLE_COUNT,
  });
  const activeRowsByLayer = new Map(
    (retainedLineagePhaseProbe.activeRows ?? []).map((row) => [row.layer, row])
  );
  const family = {
    id: selectedCase.familyId,
    priorityCandidate: selectedCase.priorityCandidate,
    indices: selectedCase.indices,
  };
  const layerStreams = [];
  for (const layer of selectedCase.layers) {
    const endpointRow = activeRowsByLayer.get(layer.layer);
    layerStreams.push(
      await createLayerTimeWindowTorqueStream({
        client,
        selectedCase,
        family,
        layer,
        endpointRow,
        sampleGrid,
      })
    );
  }
  const maxTorqueResidualNorm = maxFinite(layerStreams.map((row) => row.torqueResidualNorm));
  const diagnosticWakeTorqueReconstruction =
    createDiagnosticWakeTorqueReconstruction(layerStreams);
  const allSamplesComplete = layerStreams.every((row) => row.sampleStatus === "complete");
  const allRankZeroRowsSampled = layerStreams.every((row) =>
    row.rootContinuationStatus.startsWith("rank_zero_continuation_sampled")
  );
  const hasCompetitorRoots = layerStreams.some(
    (row) => row.rootContinuationStatus ===
      "rank_zero_continuation_sampled_with_competitor_roots_not_retained"
  );
  const residualStatus =
    maxTorqueResidualNorm != null &&
    maxTorqueResidualNorm <= TIME_WINDOW_TORQUE_RESIDUAL_TOLERANCE
      ? "near_zero_fixed_receiver_diagnostic"
      : "nonzero_fixed_receiver_diagnostic";
  const status =
    allSamplesComplete && allRankZeroRowsSampled
      ? [
          `fixed_receiver_time_window_torque_${residualStatus}`,
          hasCompetitorRoots ? "with_competitor_roots" : null,
        ]
          .filter(Boolean)
          .join("_")
      : "fixed_receiver_time_window_torque_incomplete";
  const rootContinuationStatus = hasCompetitorRoots
    ? "rank_zero_continuation_sampled_with_competitor_roots_not_retained"
    : "rank_zero_continuation_sampled_not_retained";
  return {
    schema: "aaa-tri-binary-selected-time-window-torque-probe.v1",
    status,
    claimLevel:
      "fixed-receiver time-window torque diagnostic; not retained branch-chart torque consistency",
    retainedBranchClaim: false,
    selectedCaseId: selectedCase.caseId,
    rowIds: layerStreams.map((row) => row.rowId).filter(Boolean),
    timeWindow: {
      start: 0,
      end: CLOSURE_PERIOD,
      sampleCount: sampleGrid.length,
      quadrature: "trapezoidal",
    },
    sameRowSetStatus:
      sameOrderedStrings(
        retainedLineagePhaseProbe.rowSetIdentity?.torqueRows ?? [],
        layerStreams.map((row) => row.rowId).filter(Boolean)
      )
        ? "same_endpoint_row_ids"
        : "row_id_mismatch",
    maxTorqueResidualNorm,
    residualTolerance: TIME_WINDOW_TORQUE_RESIDUAL_TOLERANCE,
    diagnosticWakeTorqueReconstruction,
    torqueConsistencyStatus:
      status === "fixed_receiver_time_window_torque_near_zero_fixed_receiver_diagnostic"
        ? "blocked_with_fixed_receiver_time_window_integral_near_zero_not_retained"
        : "blocked_with_fixed_receiver_time_window_integral_not_retained",
    summary: {
      status,
      maxTorqueResidualNorm,
      residualTolerance: TIME_WINDOW_TORQUE_RESIDUAL_TOLERANCE,
      rootContinuationStatus: allRankZeroRowsSampled
        ? rootContinuationStatus
        : "incomplete_or_relabelled_root_continuation",
      branchMultiplicityStatus: hasCompetitorRoots
        ? "inner rank-zero samples coexist with additional active roots over part of W"
        : "rank-zero samples are single-root in each sampled layer",
      diagnosticWakeTorqueReconstruction,
      requiredRetainedUpgrade:
        "Replace the fixed-receiver rank-zero continuation proxy with a retained binary-to-binary active-row stream over W before marking torque_consistency as passing.",
      layerResiduals: Object.fromEntries(
        layerStreams.map((row) => [
          row.layer,
          {
            rowId: row.rowId,
            torqueIntegral: row.torqueIntegral,
            mechanicalEndpointIncrement: row.mechanicalEndpointIncrement,
            torqueResidual: row.torqueResidual,
            torqueResidualNorm: row.torqueResidualNorm,
            rootContinuationStatus: row.rootContinuationStatus,
            rootCountValues: row.rootCountValues,
          },
        ])
      ),
    },
    layerStreams,
  };
}

function createDiagnosticWakeTorqueReconstruction(layerStreams) {
  const layerTorqueIntegralSum = layerStreams.reduce(
    (total, row) => (row.torqueIntegral ? addVectors(total, row.torqueIntegral) : total),
    zeroVector()
  );
  const diagnosticWakeTorqueIntegralWithoutBoundary = scaleVector(layerTorqueIntegralSum, -1);
  return {
    status:
      "work_integral_wake_torque_reconstruction_populated_without_action_kernel_pullback",
    claimLevel:
      "diagnostic reconstruction of the older wake torque work integral; not the normalized delayed-interior characteristic-tail boundary charge",
    formula:
      "Delta L_wake,torque^B[W] = - integral_W sum_l T_l^B(s) ds + Delta L_wake,partial^B",
    layerTorqueIntegralSum,
    diagnosticWakeTorqueIntegralWithoutBoundary,
    diagnosticWakeTorqueIntegralWithoutBoundaryNorm: vectorNorm(
      diagnosticWakeTorqueIntegralWithoutBoundary
    ),
    wakeBoundaryIncrement: null,
    retainedLimitation:
      "The normalized action-kernel boundary charge and diagnostic-to-action residual are still not evaluated.",
  };
}

async function createSelectedBinaryToBinaryPathHistoryProbe({
  client,
  selectedCase,
  timeWindowTorqueProbe,
}) {
  const { pathRows, layerPathKeys, maxPathErrorBound } =
    createBinaryToBinaryPathHistoryRows(selectedCase.layers);
  const streamId = `${selectedCase.caseId}:binary-to-binary-path-history`;
  const stream = await client.createPathHistoryStreamF64({
    runId: `${selectedCase.caseId}:binary-to-binary-probe-run`,
    datasetId: `${selectedCase.caseId}:binary-to-binary-probe-dataset`,
    streamId,
    pathRows,
    rowsPerChunk: pathRows.length,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: Math.max(4096, pathRows.length * 128),
    },
    metadata: {
      precisionPath: "scaled_f64_strict",
      units: "aaa-reduced-unit",
      coordinateFrame: "tri-binary-local-frame",
      scaleNormalization: "field-speed-normalized",
      interpolationRule: "linearized-circular-path-segments",
      provenance: {
        selectedCaseId: selectedCase.caseId,
        source: "tri-binary-offset-family-runner",
      },
      diagnostics: [
        {
          code: "priority_only",
          severity: "info",
          message:
            "linearized path-history binary-to-binary probe; not retained circular branch chart",
        },
      ],
    },
  });
  const pathKeys = Object.values(layerPathKeys);
  const candidates = await client.queryEmissionShellCandidatesF64({
    streamId,
    sourcePathKeys: pathKeys,
    receiverPathKeys: pathKeys,
    signalSpeed: FIELD_SPEED,
    tolerance: Math.max(maxPathErrorBound * 2, ROOT_TOLERANCE),
    maxCandidates: 4096,
    allowSamePath: true,
    workerCount: 0,
    timeRange: { start: 0, end: CLOSURE_PERIOD },
  });
  const refinement = await client.refineEmissionShellCandidateRootsF64({
    streamId,
    candidates: candidates.candidates,
    signalSpeed: FIELD_SPEED,
    tolerance: Math.max(maxPathErrorBound * 2, ROOT_TOLERANCE),
    rootTolerance: ROOT_TOLERANCE,
    maxCandidates: candidates.candidates.length,
    maxRootsPerCandidate: 8,
    maxHitsPerCandidate: 8,
    workerCount: 0,
  });
  const ledgerDetailReplay = await createBinaryToBinaryLedgerDetailReplay({
    client,
    selectedCase,
    layerPathKeys,
    pathRows,
    candidates: candidates.candidates,
    tolerance: Math.max(maxPathErrorBound * 2, ROOT_TOLERANCE),
    timeWindowTorqueProbe,
  });
  const pairSummaries = summarizeBinaryPathHistoryPairs({
    selectedCase,
    layerPathKeys,
    candidates,
    refinement,
    ledgerDetailReplay,
  });
  const pairSummaryValues = Object.values(pairSummaries);
  const rootedPairCount = pairSummaryValues.filter((row) => row.rootCount > 0).length;
  const transitionClassification = ledgerDetailReplay.transitionClassification;
  const retainedRowSetIdentity = transitionClassification.retainedRowSetIdentity;
  const status =
    ledgerDetailReplay.activeRootDetailCount > 0 &&
    transitionClassification.retainedTransitionCount > 0 &&
    !candidates.truncated &&
    !refinement.truncated
      ? retainedRowSetIdentity.status === "common_active_row_set_candidate_populated"
        ? "binary_to_binary_path_history_transition_classifier_populated_common_row_set_candidate"
        : "binary_to_binary_path_history_transition_classifier_populated_row_set_identity_blocked"
      : ledgerDetailReplay.activeRootDetailCount > 0 && !candidates.truncated && !refinement.truncated
        ? "binary_to_binary_path_history_ledger_details_populated_no_retained_transition_identity"
      : refinement.rootCount > 0 && !candidates.truncated && !refinement.truncated
        ? "binary_to_binary_path_history_roots_populated_missing_root_ledger_detail"
      : candidates.truncated || refinement.truncated
        ? "binary_to_binary_path_history_probe_truncated"
        : "binary_to_binary_path_history_roots_missing";
  return {
    schema: "aaa-tri-binary-selected-binary-to-binary-path-history-probe.v1",
    status,
    claimLevel:
      "linearized path-history binary-to-binary root/hit probe; not retained circular branch-chart certificate",
    retainedBranchClaim: false,
    selectedCaseId: selectedCase.caseId,
    stream: {
      streamId,
      rowCount: stream.summary.rowCount,
      chunkCount: stream.summary.chunkCount,
      pathCount: stream.summary.pathCount,
      maxPathErrorBound,
      segmentCountPerLayer: BINARY_TO_BINARY_PATH_SEGMENT_COUNT,
    },
    candidates: {
      pairCount: candidates.pairCount,
      candidateCount: candidates.candidateCount,
      rejectedPairCount: candidates.rejectedPairCount,
      sampledHitCandidateCount: candidates.candidates.filter(
        (row) => row.narrowPhaseEstimate?.classification === "sampled_hit"
      ).length,
      truncated: candidates.truncated,
      executionPath: candidates.scanSummary.executionPath,
    },
    refinement: {
      attemptedCandidateCount: refinement.attemptedCandidateCount,
      skippedCandidateCount: refinement.skippedCandidateCount,
      rootCount: refinement.rootCount,
      hitCount: refinement.hitCount,
      truncated: refinement.truncated,
      rootedPairCount,
    },
    ledgerDetailReplay,
    pairSummaries,
    summary: {
      status,
      rootedPairCount,
      pairCount: candidates.pairCount,
      candidateCount: candidates.candidateCount,
      refinedRootCount: refinement.rootCount,
      refinedHitCount: refinement.hitCount,
      ledgerDetailCandidateCount: ledgerDetailReplay.candidateDetailCount,
      ledgerDetailRowCount: ledgerDetailReplay.detailRowCount,
      activeRootDetailCount: ledgerDetailReplay.activeRootDetailCount,
      inactiveGapRowCount: ledgerDetailReplay.inactiveGapRowCount,
      inactiveGapMarginStatus: ledgerDetailReplay.inactiveGapMargins.status,
      transitionClassifierStatus: transitionClassification.status,
      comparedSnapshotEdgeCount: transitionClassification.comparedSnapshotEdgeCount,
      classifiedTransitionCount: transitionClassification.transitionCount,
      retainedTransitionCount: transitionClassification.retainedTransitionCount,
      foldedTransitionCount: transitionClassification.transitionKindCounts.folded,
      commonActiveRowSetPairCount: transitionClassification.commonActiveRowSetPairCount,
      retainedRowSetIdentityStatus: retainedRowSetIdentity.status,
      retainedTimeDomainCoverageStatus:
        transitionClassification.retainedTimeDomainCoverage.status,
      retainedTimeDomainMaxCommonWidth:
        transitionClassification.retainedTimeDomainCoverage.maxCommonWidth,
      commonRetainedHingePointCount:
        transitionClassification.retainedTimeDomainCoverage.commonHingePointCount,
      retainedHingePointProbeStatus:
        transitionClassification.retainedHingePointProbe.status,
      allPairWitnessHingeCount:
        transitionClassification.retainedHingePointProbe.allPairWitnessHingeCount,
      sharedRootHingeCount:
        transitionClassification.retainedHingePointProbe.sharedRootHingeCount,
      diagnosticHingeCount:
        transitionClassification.retainedHingePointProbe.diagnosticHingeCount,
      candidatePointEventHingeCount:
        transitionClassification.retainedHingePointProbe.candidatePointEventHingeCount,
      branchTransportIncidenceHingeCount:
        transitionClassification.retainedHingePointProbe.branchTransportIncidenceHingeCount,
      branchTransportPairMapTopologyHingeCount:
        transitionClassification.retainedHingePointProbe.branchTransportPairMapTopologyHingeCount,
      branchTransportPairMapHingeCount:
        transitionClassification.retainedHingePointProbe.branchTransportPairMapHingeCount,
      middleFieldSpeedHingeCaptureCandidateCount:
        transitionClassification.retainedHingePointProbe.middleFieldSpeedHingeCaptureCandidateCount,
      middleRetainedChartZeroSlackNoGoCount:
        transitionClassification.retainedHingePointProbe.middleRetainedChartZeroSlackNoGoCount,
      maxPointDiagnosticTorqueNorm:
        transitionClassification.retainedHingePointProbe.maxPointDiagnosticTorqueNorm,
      maxOffDiagonalPointDiagnosticTorqueNorm:
        transitionClassification.retainedHingePointProbe.maxOffDiagonalPointDiagnosticTorqueNorm,
      maxPointEventOneSidedPairCount:
        transitionClassification.retainedHingePointProbe.maxPointEventOneSidedPairCount,
      maxBranchTransportPairMapMatchedPairCount:
        transitionClassification.retainedHingePointProbe.maxBranchTransportPairMapMatchedPairCount,
      maxBranchTransportPairMapGeometryContinuityResidual:
        transitionClassification.retainedHingePointProbe
          .maxBranchTransportPairMapGeometryContinuityResidual,
      preferredBranchTransportHingeTime:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.time ?? null,
      preferredBranchTransportHingePiMultiple:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.piMultiple ?? null,
      preferredBranchTransportHingeOneSidedPairImbalance:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.oneSidedPairImbalance ?? null,
      preferredBranchTransportPairMapStatus:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.branchTransportPairMapStatus ?? null,
      preferredBranchTransportPairMapHingeChartPass:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.branchTransportPairMapHingeChartPass ?? null,
      preferredBranchTransportPairMapMatchedPairCount:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.matchedPairMapCount ?? null,
      preferredBranchTransportPairMapGeometryMatchedPairCount:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.geometryContinuityMatchedPairCount ?? null,
      preferredBranchTransportPairMapMaxGeometryResidual:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.maxGeometryContinuityResidual ?? null,
      preferredBranchTransportPairMapMaxClockTimeJump:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.maxClockContinuityTimeJump ?? null,
      preferredBranchTransportPairMapMaxWrappedPhaseJump:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.maxClockContinuityWrappedPhaseJump ?? null,
      preferredBranchTransportPairMapHingeChartMatchedPairCount:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.hingeChartContinuityMatchedPairCount ?? null,
      preferredBranchTransportPairMapMaxHingeChartResidual:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.maxHingeChartContinuityResidual ?? null,
      preferredBranchTransportPairMapMaxCausalEndpointToHingeChartResidual:
        transitionClassification.retainedHingePointProbe.preferredBranchTransportHingeCandidate
          ?.maxCausalEndpointToHingeChartResidual ?? null,
      preferredMiddleFieldSpeedHingeCaptureStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.status ?? null,
      preferredMiddleFieldSpeedHingeCaptureCandidatePass:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.candidateCapturePass ?? null,
      preferredMiddleFieldSpeedHingeCaptureMaxDelayedEndpointGeometryResidual:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.maxDelayedEndpointGeometryResidual ?? null,
      preferredMiddleFieldSpeedHingeCaptureMaxHingeChartResidual:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.maxHingeChartContinuityResidual ?? null,
      preferredMiddleFieldSpeedHingeCaptureMaxCausalEndpointToHingeChartResidual:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.maxCausalEndpointToHingeChartResidual ?? null,
      preferredMiddleRetainedChartFeasibilityStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.status ?? null,
      preferredMiddleRetainedChartZeroSlackPass:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.zeroSlackRetainedChartPass ?? null,
      preferredMiddleRetainedChartZeroSlackNoGo:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.zeroSlackRetainedChartNoGo ?? null,
      preferredMiddleRetainedChartCompensationRequiredRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensationRequiredRowCount ?? null,
      preferredMiddleRetainedChartMaxRequiredEndpointCompensationNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.maxRequiredEndpointCompensationNorm ?? null,
      preferredMiddleRetainedChartMaxRequiredPhaseCompensation:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.maxRequiredPhaseCompensation ?? null,
      preferredMiddleCompensatedPayloadInventoryStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.status ?? null,
      preferredMiddleCompensatedPayloadPartialCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.partialPayloadCount ?? null,
      preferredMiddleCompensatedPayloadMissingCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.missingPayloadCount ?? null,
      preferredMiddleCompensatedPayloadCandidateCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.candidatePayloadCount ?? null,
      preferredMiddleCompensatedPayloadBlockingPayloads:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.blockingPayloads ?? null,
      preferredMiddleWakePayloadDiagnosticStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic?.status ?? null,
      preferredMiddleWakePayloadRequiredBoundaryChargeNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.requiredActionKernelBoundaryChargeNorm ?? null,
      preferredMiddleWakePayloadTargetResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic?.targetResidualNorm ?? null,
      preferredMiddleWakePayloadChargeCandidateNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.normalizedActionKernelWakeChargeCandidate?.candidateChargeNorm ?? null,
      preferredMiddleWakePayloadPullbackDomainTargetStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.retainedActionKernelPullbackDomainTarget?.status ?? null,
      preferredMiddleWakePayloadNormalizationConventionStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.actionKernelNormalizationConventionCandidate?.status ?? null,
      preferredMiddleWakePayloadEtaCandidate:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.actionKernelNormalizationConventionCandidate?.etaCandidate?.value ??
        null,
      preferredMiddleWakePayloadEpsilonCCandidate:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.actionKernelNormalizationConventionCandidate?.epsilonCCandidate
          ?.value ?? null,
      preferredMiddleWakePayloadEndpointConvention:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.actionKernelNormalizationConventionCandidate?.endpointConvention
          ?.id ?? null,
      preferredMiddleWakePayloadCrossingDomainStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.chartRestrictedCrossingDomainRows?.status ?? null,
      preferredMiddleWakePayloadCrossingDomainAcceptedRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.chartRestrictedCrossingDomainRows?.acceptedRowCount ?? null,
      preferredMiddleWakePayloadCrossingDomainRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.chartRestrictedCrossingDomainRows?.routeRowCount ?? null,
      preferredMiddleWakePayloadCrossingDomainMinEtaRouteMargin:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.chartRestrictedCrossingDomainRows?.minEtaRouteMargin ?? null,
      preferredMiddleWakePayloadCrossingDomainMinLeverArmRegularizationMargin:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.chartRestrictedCrossingDomainRows
          ?.minLeverArmRegularizationMargin ?? null,
      preferredMiddleWakePayloadKernelGradientCandidateStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.kernelGradientIntegralCandidate?.status ?? null,
      preferredMiddleWakePayloadKernelGradientCandidateResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.kernelGradientIntegralCandidate?.targetResidualNorm ?? null,
      preferredMiddleWakePayloadFiniteEndpointClearKernelGradientStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.finiteEndpointClearKernelGradientIntegralEvaluation?.status ?? null,
      preferredMiddleWakePayloadFiniteEndpointClearKernelGradientResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.finiteEndpointClearKernelGradientIntegralEvaluation
          ?.targetResidualNorm ?? null,
      preferredMiddleWakePayloadCharacteristicTailPullbackStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailMaxPairRadialResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.maxPairRadialResidualNorm ?? null,
      preferredMiddleWakePayloadCharacteristicTailRadialConstrainedSolveStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.radialConstrainedSolve?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailRadialConstrainedSolveResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.radialConstrainedSolve?.targetResidualNorm ?? null,
      preferredMiddleWakePayloadCharacteristicTailCoefficientQuadratureStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailCoefficientQuadratureMaxAbsCausalGap:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.maxAbsCausalGap ?? null,
      preferredMiddleWakePayloadCharacteristicTailCoefficientQuadratureMaxAbsRequiredCouplingCoefficient:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.maxAbsRequiredCouplingCoefficient ??
        null,
      preferredMiddleWakePayloadCharacteristicTailCoefficientQuadratureMixedRequiredCoefficientSigns:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.mixedRequiredCoefficientSigns ?? null,
      preferredMiddleWakePayloadCharacteristicTailSingleCoefficientSignPatternStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailSingleCoefficientSignPatternResidualNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.targetResidualNorm ?? null,
      preferredMiddleWakePayloadCharacteristicTailSingleCoefficient:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.commonCouplingCoefficient ?? null,
      preferredMiddleWakePayloadCharacteristicTailSingleCoefficientSignPattern:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.signPattern ?? null,
      preferredMiddleWakePayloadCharacteristicTailLayerPolaritySignFeasibilityStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.layerPolaritySignFeasibilityTarget?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailLayerPolarityCanonicalAssignment:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.layerPolaritySignFeasibilityTarget?.canonicalAssignment ?? null,
      preferredMiddleWakePayloadCharacteristicTailLayerPolarityAssignmentCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.layerPolaritySignFeasibilityTarget?.assignmentCount ?? null,
      preferredMiddleWakePayloadCharacteristicTailSourceReceiverPolarityRowBindingStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.sourceReceiverPolarityRowBindingTarget?.status ?? null,
      preferredMiddleWakePayloadCharacteristicTailSourceReceiverPolarityRowBindingCandidateRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.sourceReceiverPolarityRowBindingTarget?.candidateRowCount ?? null,
      preferredMiddleWakePayloadCharacteristicTailSourceReceiverPolarityRowBindingAcceptedRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.sourceReceiverPolarityRowBindingTarget?.acceptedRowCount ?? null,
      preferredMiddleWakePayloadCharacteristicTailSourceReceiverPolarityRowBindingMetadataStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
          ?.sourceReceiverPolarityRowBindingTarget?.metadataStatus ?? null,
      preferredMiddleWakePayloadCharacteristicTailMissingAcceptedFields:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.wakePayloadDiagnostic
          ?.masterEquationCharacteristicTailPullbackCandidate
          ?.missingAcceptedFields ?? null,
      preferredMiddleHingeEventRowSetIdentityStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.hingeEventRowSetIdentity
          ?.status ?? null,
      preferredMiddleHingeEventRootIntervalStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.hingeEventRowSetIdentity
          ?.rootPayloadIntervalEnclosure?.status ?? null,
      preferredMiddleHingeEventRootIntervalMaxCommonWidth:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory?.hingeEventRowSetIdentity
          ?.rootPayloadIntervalEnclosure?.maxCommonWidth ?? null,
      preferredMiddleHingeRootBranchRouteStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.hingeRootBranchTransportRouteFeasibility?.status ?? null,
      preferredMiddleHingeRootBranchRouteCandidatePass:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.hingeRootBranchTransportRouteFeasibility
          ?.candidateRoutePass ?? null,
      preferredMiddleHingeRootBranchRouteZeroSlackPass:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.hingeRootBranchTransportRouteFeasibility
          ?.zeroSlackRoutePass ?? null,
      preferredMiddleHingeRootBranchRouteCompensationRequiredMatchCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.hingeRootBranchTransportRouteFeasibility
          ?.compensationRequiredMatchCount ?? null,
      preferredMiddleCompensatedRoutePayloadStatus:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate?.status ?? null,
      preferredMiddleCompensatedRoutePayloadMissingFields:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.missingPayloadFields ?? null,
      preferredMiddleCompensatedRoutePayloadPopulatedFields:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.populatedPayloadFields ?? null,
      preferredMiddleCompensatedRoutePayloadBoundedSlackRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.boundedSlackRowCount ?? null,
      preferredMiddleCompensatedRoutePayloadTransportAngularMomentumRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.transportAngularMomentumRowCount ?? null,
      preferredMiddleCompensatedRoutePayloadRootEnergyRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.rootEnergyRowCount ?? null,
      preferredMiddleCompensatedRoutePayloadRecoilChannelRowCount:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.recoilChannelRowCount ?? null,
      preferredMiddleCompensatedRoutePayloadMaxGeometricSlack:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxBoundedGeometricSlack ??
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxUnassignedGeometricSlack ??
        null,
      preferredMiddleCompensatedRoutePayloadMaxClockRetune:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxBoundedClockRetune ?? null,
      preferredMiddleCompensatedRoutePayloadMaxPhaseSlack:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxBoundedPhaseSlack ??
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxUnassignedPhaseSlack ??
        null,
      preferredMiddleCompensatedRoutePayloadMaxTransportAngularMomentumNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxTransportAngularMomentumNorm ?? null,
      preferredMiddleCompensatedRoutePayloadMaxTransportAngularMomentumNormUpperBound:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxTransportAngularMomentumNormUpperBound ?? null,
      preferredMiddleCompensatedRoutePayloadMaxRootEnergyIncrement:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxRootEnergyIncrement ?? null,
      preferredMiddleCompensatedRoutePayloadMaxRecoilAngularMomentumNorm:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxRecoilAngularMomentumNorm ?? null,
      preferredMiddleCompensatedRoutePayloadMaxRecoilEnergyScale:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedRoutePayloadCertificate
          ?.maxRecoilEnergyScale ?? null,
      preferredMiddleCompensatedPayloadNextSmallestClosureTarget:
        transitionClassification.retainedHingePointProbe.preferredMiddleFieldSpeedHingeCapture
          ?.retainedChartFeasibility?.compensatedPayloadInventory
          ?.nextSmallestClosureTarget ?? null,
      maxPairRetainedChainEdgeCount: transitionClassification.maxPairRetainedChainEdgeCount,
      missingRetainedField:
        "The runner now classifies replayed binary-to-binary root-ledger-detail rows into solver root-key transitions, inactive-gap margins, retained hit-time coverage, common hinge-point candidates, point-event witnesses, candidate point-event admissibility rows, candidate branch-transport incidence rows, and a candidate branch-transport pair-map, but it does not yet certify an accepted retained point-event rule, one positive-width common retained time domain, or one common active row set across all layer-pair channels for force, torque, wake, partition, phase, and stability.",
      requiredRetainedUpgrade:
        "Supply the branch-transport rule or retained chart row that either upgrades the hinge-point contacts into an accepted retained point event or turns the partial retained transition chains into a positive-width common retained time domain and one common active row set over W, then evaluate torque, wake, phase, partition, and stability on that same retained active-row set.",
    },
  };
}

async function createBinaryToBinaryLedgerDetailReplay({
  client,
  selectedCase,
  layerPathKeys,
  pathRows,
  candidates,
  tolerance,
  timeWindowTorqueProbe,
}) {
  const layerByPathKey = new Map(
    Object.entries(layerPathKeys).map(([layer, pathKey]) => [pathKey, layer])
  );
  const pathRowByKeySegment = new Map(
    pathRows.map((row) => [`${row.pathKey}:${row.segmentIndex}`, row])
  );
  const pairSummaries = createEmptyBinaryPairSummaries(selectedCase);
  let candidateDetailCount = 0;
  let detailRowCount = 0;
  let activeRootDetailCount = 0;
  let inactiveGapRowCount = 0;
  let transitionRowCount = 0;
  let failureRowCount = 0;
  let maxActiveNormalizedResidual = null;
  let maxActiveAbsoluteResidual = null;
  const inactiveGapMarginStats = createIntervalWidthStats();
  const snapshots = [];
  for (const candidate of candidates) {
    const estimate = candidate.narrowPhaseEstimate;
    if (
      estimate?.classification !== "sampled_hit" ||
      !Number.isFinite(estimate.hitTime)
    ) {
      continue;
    }
    const source = pathRowByKeySegment.get(`${candidate.sourcePathKey}:${candidate.sourceSegmentIndex}`);
    const receiver = pathRowByKeySegment.get(
      `${candidate.receiverPathKey}:${candidate.receiverSegmentIndex}`
    );
    if (!source || !receiver) {
      continue;
    }
    const response = await client.buildRootLedgerDetailF64({
      source: pathHistoryRowToCausalSegment(source),
      receiver: pathHistoryRowToCausalSegment(receiver),
      hitTime: estimate.hitTime,
      signalSpeed: FIELD_SPEED,
      rootTolerance: ROOT_TOLERANCE,
      maxIterations: 128,
      scanSubdivisions: 128,
      maxRoots: 8,
      maxHits: 8,
      maxRows: 24,
    });
    candidateDetailCount += 1;
    detailRowCount += response.rows.length;
    const sourceLayer = layerByPathKey.get(candidate.sourcePathKey) ?? "unknown";
    const receiverLayer = layerByPathKey.get(candidate.receiverPathKey) ?? "unknown";
    const pairKey = `${sourceLayer}->${receiverLayer}`;
    const pair = pairSummaries[pairKey];
    const activeRows = response.rows.filter((row) => row.entryKind === 1);
    const inactiveGapRows = response.rows.filter((row) => row.entryKind === 2);
    snapshots.push({
      pairKey,
      sourceLayer,
      receiverLayer,
      sourcePathKey: candidate.sourcePathKey,
      receiverPathKey: candidate.receiverPathKey,
      sourceSegmentIndex: candidate.sourceSegmentIndex,
      receiverSegmentIndex: candidate.receiverSegmentIndex,
      hitTime: estimate.hitTime,
      rowCount: response.rows.length,
      activeRootDetailCount: activeRows.length,
      inactiveGapRowCount: inactiveGapRows.length,
      activeRootKeys: activeRows.map((row) => row.rootKey).sort((left, right) => left - right),
      rows: response.rows,
    });
    if (pair) {
      pair.candidateDetailCount += 1;
      pair.detailRowCount += response.rows.length;
    }
    for (const row of response.rows) {
      if (row.entryKind === 1) {
        activeRootDetailCount += 1;
        if (pair) {
          pair.activeRootDetailCount += 1;
        }
        if (Number.isFinite(row.normalizedResidual)) {
          maxActiveNormalizedResidual =
            maxActiveNormalizedResidual == null
              ? Math.abs(row.normalizedResidual)
              : Math.max(maxActiveNormalizedResidual, Math.abs(row.normalizedResidual));
        }
        if (Number.isFinite(row.absoluteResidual)) {
          maxActiveAbsoluteResidual =
            maxActiveAbsoluteResidual == null
              ? Math.abs(row.absoluteResidual)
              : Math.max(maxActiveAbsoluteResidual, Math.abs(row.absoluteResidual));
        }
      } else if (row.entryKind === 2) {
        inactiveGapRowCount += 1;
        appendIntervalWidthStats(inactiveGapMarginStats, row);
        if (pair) {
          pair.inactiveGapRowCount += 1;
          appendIntervalWidthStats(pair.inactiveGapMarginStats, row);
        }
      } else if (row.entryKind === 4) {
        transitionRowCount += 1;
        if (pair) {
          pair.transitionRowCount += 1;
        }
      } else if (row.entryKind === 5) {
        failureRowCount += 1;
        if (pair) {
          pair.failureRowCount += 1;
        }
      }
    }
  }
  const transitionClassification = await classifyBinaryToBinaryRetainedTransitions({
    client,
    selectedCase,
    snapshots,
    timeWindowTorqueProbe,
  });
  return {
    status:
      activeRootDetailCount > 0
        ? transitionClassification.retainedTransitionCount > 0
          ? "root_ledger_detail_replay_transition_classifier_populated_row_set_identity_blocked"
          : "root_ledger_detail_replay_transition_classifier_populated_no_retained_identity"
        : "root_ledger_detail_replay_missing_active_rows",
    claimLevel:
      "sampled linear path-history root-ledger-detail replay; not retained transition chart",
    candidateDetailCount,
    detailRowCount,
    activeRootDetailCount,
    inactiveGapRowCount,
    transitionRowCount,
    failureRowCount,
    maxActiveNormalizedResidual,
    maxActiveAbsoluteResidual,
    tolerance,
    inactiveGapMargins: finalizeIntervalWidthStats(inactiveGapMarginStats),
    pairSummaries: finalizeBinaryPairSummaries(pairSummaries),
    transitionClassification,
    retainedLimitation:
      transitionClassification.retainedRowSetIdentity.status === "common_active_row_set_missing"
        ? "Solver transition classification is populated, but no common active row-set identity over W is certified for the replayed binary-to-binary detail rows."
        : "Rows are replayed candidate details, not a retained branch chart with a certified common residual-row identity across W.",
  };
}

async function classifyBinaryToBinaryRetainedTransitions({
  client,
  selectedCase,
  snapshots,
  timeWindowTorqueProbe,
}) {
  const pairSummaries = createEmptyBinaryPairTransitionSummaries(selectedCase);
  const snapshotsByPair = new Map();
  for (const snapshot of snapshots) {
    const bucket = snapshotsByPair.get(snapshot.pairKey) ?? [];
    bucket.push(snapshot);
    snapshotsByPair.set(snapshot.pairKey, bucket);
  }

  const transitionKindCounts = {
    retained: 0,
    appeared: 0,
    disappeared: 0,
    folded: 0,
    assimilated_from_tail: 0,
    ledger_rerun_required: 0,
  };
  let comparedSnapshotEdgeCount = 0;
  let transitionCount = 0;
  let retainedTransitionCount = 0;
  let edgesWithRetainedTransition = 0;
  let commonActiveRowSetPairCount = 0;
  let maxPairRetainedChainEdgeCount = 0;
  const sampleTransitions = [];
  const retainedCoverageByPair = {};
  const retainedEdgesByPair = {};

  for (const [pairKey, pairSnapshots] of snapshotsByPair) {
    const pair = pairSummaries[pairKey];
    const ordered = pairSnapshots
      .slice()
      .sort(compareBinaryToBinarySnapshotsForTransition);
    if (pair) {
      pair.snapshotCount = ordered.length;
      pair.activeSnapshotCount = ordered.filter((snapshot) => snapshot.activeRootDetailCount > 0).length;
    }
    let commonRootKeys = ordered[0]?.activeRootKeys ? new Set(ordered[0].activeRootKeys) : new Set();
    let pairEdgesWithRetainedTransition = 0;
    let currentRetainedChain = null;
    let longestRetainedChain = createEmptyRetainedChainSummary();
    const retainedHitTimeIntervals = [];
    const retainedTransitionEdges = [];

    for (let index = 1; index < ordered.length; index += 1) {
      const prior = ordered[index - 1];
      const next = ordered[index];
      const transitionResponse = await client.classifyRootLedgerTransitionsF64({
        priorRows: prior.rows,
        nextRows: next.rows,
      });
      comparedSnapshotEdgeCount += 1;
      transitionCount += transitionResponse.transitions.length;
      const retainedNextRootKeys = [];
      const retainedTransitions = [];
      for (const transition of transitionResponse.transitions) {
        if (transitionKindCounts[transition.kind] != null) {
          transitionKindCounts[transition.kind] += 1;
        }
        if (transition.kind === "retained") {
          retainedTransitionCount += 1;
          retainedNextRootKeys.push(transition.nextRootKey);
          retainedTransitions.push(transition);
        }
      }
      if (retainedNextRootKeys.length > 0) {
        edgesWithRetainedTransition += 1;
        pairEdgesWithRetainedTransition += 1;
        retainedHitTimeIntervals.push(createHitTimeInterval(prior.hitTime, next.hitTime));
        retainedTransitionEdges.push(
          createRetainedTransitionEdge({ pairKey, prior, next, retainedNextRootKeys, retainedTransitions })
        );
        currentRetainedChain = extendRetainedChain({
          currentRetainedChain,
          prior,
          next,
          retainedNextRootKeys,
        });
        if (currentRetainedChain.edgeCount > longestRetainedChain.edgeCount) {
          longestRetainedChain = projectRetainedChainSummary(currentRetainedChain);
        }
      } else {
        currentRetainedChain = null;
      }
      commonRootKeys = intersectRootKeySets(commonRootKeys, new Set(retainedNextRootKeys));
      if (pair) {
        pair.transitionEdgeCount += 1;
        pair.transitionCount += transitionResponse.transitions.length;
        pair.retainedTransitionCount += retainedNextRootKeys.length;
        pair.edgesWithRetainedTransition = pairEdgesWithRetainedTransition;
      }
      if (sampleTransitions.length < 16) {
        sampleTransitions.push(projectTransitionEdgeSample({ pairKey, prior, next, transitionResponse }));
      }
    }

    if (pair) {
      pair.commonActiveRootKeyCount = commonRootKeys.size;
      pair.commonActiveRootKeys = [...commonRootKeys].sort((left, right) => left - right).slice(0, 12);
      pair.longestRetainedChain = longestRetainedChain;
      pair.retainedHitTimeCoverage = summarizeHitTimeIntervals(retainedHitTimeIntervals);
      retainedCoverageByPair[pairKey] = pair.retainedHitTimeCoverage;
      retainedEdgesByPair[pairKey] = retainedTransitionEdges;
      maxPairRetainedChainEdgeCount = Math.max(
        maxPairRetainedChainEdgeCount,
        longestRetainedChain.edgeCount
      );
      pair.retainedEdgeCoverage =
        pair.transitionEdgeCount > 0
          ? pair.edgesWithRetainedTransition / pair.transitionEdgeCount
          : 0;
      pair.status =
        pair.transitionEdgeCount > 0 && pair.commonActiveRootKeyCount > 0
          ? "common_active_root_identity_candidate"
          : pair.transitionEdgeCount > 0 && pair.retainedTransitionCount > 0
            ? "retained_transitions_without_common_active_row_set"
            : pair.transitionEdgeCount > 0
              ? "classified_no_retained_identity"
              : "insufficient_snapshots";
      if (pair.status === "common_active_root_identity_candidate") {
        commonActiveRowSetPairCount += 1;
      }
    }
  }

  const retainedRowSetIdentity =
    commonActiveRowSetPairCount === Object.keys(pairSummaries).length && commonActiveRowSetPairCount > 0
      ? {
          status: "common_active_row_set_candidate_populated",
          pairCount: Object.keys(pairSummaries).length,
          pairCountWithCommonActiveRootKeys: commonActiveRowSetPairCount,
          limitation:
            "This is still a chronological replay identity candidate; force, torque, wake, phase, partition, stability, vector-ledger, and energy-routing rows must be evaluated on the same rows before certification.",
        }
      : {
          status: "common_active_row_set_missing",
          pairCount: Object.keys(pairSummaries).length,
          pairCountWithCommonActiveRootKeys: commonActiveRowSetPairCount,
          missing:
            "No solver-certified common active root-key set spans the chronological replay edges for every layer-pair channel.",
        };
  const retainedTimeDomainCoverage = createRetainedTimeDomainCoverage(retainedCoverageByPair);
  const retainedHingePointProbe = createRetainedHingePointProbe({
    selectedCase,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
    retainedEdgesByPair,
    pairSummaries,
    timeWindowTorqueProbe,
  });

  return {
    status:
      comparedSnapshotEdgeCount > 0
        ? retainedTransitionCount > 0
          ? "root_ledger_transition_classifier_populated_row_set_identity_blocked"
          : "root_ledger_transition_classifier_populated_no_retained_identity"
        : "root_ledger_transition_classifier_missing_edges",
    claimLevel:
      "solver root-ledger transition classification over chronological replay snapshots; not retained branch-chart certification",
    snapshotCount: snapshots.length,
    comparedSnapshotEdgeCount,
    transitionCount,
    retainedTransitionCount,
    edgesWithRetainedTransition,
    maxPairRetainedChainEdgeCount,
    transitionKindCounts,
    commonActiveRowSetPairCount,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
    retainedHingePointProbe,
    pairSummaries,
    sampleTransitions,
    retainedLimitation:
      "The classifier uses solver root-key identity over adjacent chronological replay snapshots. If retained identity is absent, the missing object is the branch-transport rule that identifies the same active row across moving source and receiver path segments.",
  };
}

function createEmptyBinaryPairTransitionSummaries(selectedCase) {
  const summaries = {};
  for (const sourceLayer of selectedCase.layers.map((row) => row.layer)) {
    for (const receiverLayer of selectedCase.layers.map((row) => row.layer)) {
      summaries[`${sourceLayer}->${receiverLayer}`] = {
        sourceLayer,
        receiverLayer,
        snapshotCount: 0,
        activeSnapshotCount: 0,
        transitionEdgeCount: 0,
        transitionCount: 0,
        retainedTransitionCount: 0,
        edgesWithRetainedTransition: 0,
        retainedEdgeCoverage: 0,
        commonActiveRootKeyCount: 0,
        commonActiveRootKeys: [],
        longestRetainedChain: createEmptyRetainedChainSummary(),
        retainedHitTimeCoverage: summarizeHitTimeIntervals([]),
        status: "insufficient_snapshots",
      };
    }
  }
  return summaries;
}

function createHitTimeInterval(left, right) {
  const start = Math.min(left, right);
  const end = Math.max(left, right);
  return { start, end };
}

function summarizeHitTimeIntervals(intervals) {
  const mergedIntervals = mergeHitTimeIntervals(intervals);
  const widths = mergedIntervals.map((interval) => interval.end - interval.start);
  const totalWidth = widths.reduce((sum, width) => sum + width, 0);
  const maxWidth = widths.length > 0 ? Math.max(...widths) : 0;
  return {
    status: mergedIntervals.length > 0 ? "retained_hit_time_coverage_populated" : "no_retained_hit_time_coverage",
    intervalCount: mergedIntervals.length,
    totalWidth,
    maxWidth,
    intervals: mergedIntervals.slice(0, 16),
  };
}

function mergeHitTimeIntervals(intervals) {
  const ordered = intervals
    .filter((interval) => Number.isFinite(interval.start) && Number.isFinite(interval.end))
    .sort((left, right) => left.start - right.start || left.end - right.end);
  const merged = [];
  for (const interval of ordered) {
    const last = merged[merged.length - 1];
    if (!last || interval.start > last.end + ROOT_TOLERANCE) {
      merged.push({ ...interval });
      continue;
    }
    last.end = Math.max(last.end, interval.end);
  }
  return merged;
}

function createRetainedTimeDomainCoverage(retainedCoverageByPair) {
  const pairEntries = Object.entries(retainedCoverageByPair);
  let commonIntervals = null;
  for (const [, coverage] of pairEntries) {
    commonIntervals =
      commonIntervals == null
        ? coverage.intervals
        : intersectHitTimeIntervalSets(commonIntervals, coverage.intervals);
  }
  const commonCoverage = summarizeHitTimeIntervals(commonIntervals ?? []);
  const commonHingePoints = commonCoverage.intervals
    .filter((interval) => Math.abs(interval.end - interval.start) <= ROOT_TOLERANCE)
    .map((interval) => projectHingePointCandidate(interval.start));
  const pairCountWithCoverage = pairEntries.filter(
    ([, coverage]) => coverage.intervalCount > 0
  ).length;
  return {
    status:
      commonCoverage.maxWidth > 0
        ? "common_retained_hit_time_window_candidate"
        : commonHingePoints.length > 0
          ? "common_retained_hinge_points_only"
          : "common_retained_hit_time_window_missing",
    pairCount: pairEntries.length,
    pairCountWithCoverage,
    commonIntervalCount: commonCoverage.intervalCount,
    commonTotalWidth: commonCoverage.totalWidth,
    maxCommonWidth: commonCoverage.maxWidth,
    commonIntervals: commonCoverage.intervals,
    commonHingePointCount: commonHingePoints.length,
    commonHingePoints,
    retainedLimitation:
      "A common retained hit-time window or hinge point is only a domain candidate. It does not identify one active row set or evaluate torque, wake, phase, partition, stability, vector-ledger, or energy-routing rows.",
  };
}

function projectHingePointCandidate(time) {
  return {
    time,
    phaseFractionOfCycle: time / CLOSURE_PERIOD,
    piMultiple: time / Math.PI,
  };
}

function createRetainedTransitionEdge({
  pairKey,
  prior,
  next,
  retainedNextRootKeys,
  retainedTransitions,
}) {
  return {
    pairKey,
    start: Math.min(prior.hitTime, next.hitTime),
    end: Math.max(prior.hitTime, next.hitTime),
    prior: {
      hitTime: prior.hitTime,
      sourceSegmentIndex: prior.sourceSegmentIndex,
      receiverSegmentIndex: prior.receiverSegmentIndex,
      activeRootKeys: prior.activeRootKeys,
    },
    next: {
      hitTime: next.hitTime,
      sourceSegmentIndex: next.sourceSegmentIndex,
      receiverSegmentIndex: next.receiverSegmentIndex,
      activeRootKeys: next.activeRootKeys,
    },
    retainedRootKeys: [...new Set(retainedNextRootKeys)].sort((left, right) => left - right),
    retainedTransitions: retainedTransitions.map((transition) => ({
      transitionKey: transition.transitionKey,
      priorRootKey: transition.priorRootKey,
      nextRootKey: transition.nextRootKey,
      sourceKey: transition.sourceKey,
      receiverKey: transition.receiverKey,
      priorJacobianSignStratum: transition.priorJacobianSignStratum,
      nextJacobianSignStratum: transition.nextJacobianSignStratum,
      priorEndpoint: projectRootLedgerDetailForHinge(
        findActiveRootLedgerRowByKey(prior.rows, transition.priorRootKey)
      ),
      nextEndpoint: projectRootLedgerDetailForHinge(
        findActiveRootLedgerRowByKey(next.rows, transition.nextRootKey)
      ),
    })),
  };
}

function createRetainedHingePointProbe({
  selectedCase,
  retainedRowSetIdentity,
  retainedTimeDomainCoverage,
  retainedEdgesByPair,
  pairSummaries,
  timeWindowTorqueProbe,
}) {
  const pairKeys = Object.keys(pairSummaries).sort();
  const hingePoints = retainedTimeDomainCoverage.commonHingePoints ?? [];
  const hinges = hingePoints.map((hingePoint) =>
    createRetainedHingePointWitness({
      selectedCase,
      hingePoint,
      retainedRowSetIdentity,
      retainedTimeDomainCoverage,
      retainedEdgesByPair,
      pairKeys,
      timeWindowTorqueProbe,
    })
  );
  const allPairWitnessHingeCount = hinges.filter((hinge) => hinge.allPairsWitnessed).length;
  const sharedRootHingeCount = hinges.filter((hinge) => hinge.commonRootKeyCount > 0).length;
  const diagnosticHingeCount = hinges.filter(
    (hinge) =>
      hinge.pointDiagnostics.status ===
      "hinge_point_identity_and_off_diagonal_force_diagnostics_populated"
  ).length;
  const candidatePointEventHingeCount = hinges.filter(
    (hinge) => hinge.candidatePointEventAdmissibility.pass
  ).length;
  const branchTransportIncidenceHingeCount = hinges.filter(
    (hinge) => hinge.branchTransportIncidence.pass
  ).length;
  const branchTransportPairMapTopologyHingeCount = hinges.filter(
    (hinge) => hinge.branchTransportIncidence.candidatePairMap.topologyPass
  ).length;
  const branchTransportPairMapHingeCount = hinges.filter(
    (hinge) => hinge.branchTransportIncidence.candidatePairMap.pass
  ).length;
  const middleFieldSpeedHingeCaptureCandidateCount = hinges.filter(
    (hinge) => hinge.middleFieldSpeedHingeCapture.candidateCapturePass
  ).length;
  const middleRetainedChartZeroSlackNoGoCount = hinges.filter(
    (hinge) =>
      hinge.middleFieldSpeedHingeCapture.retainedChartFeasibility
        ?.zeroSlackRetainedChartNoGo
  ).length;
  const preferredBranchTransportHingeCandidate =
    selectPreferredBranchTransportHingeCandidate(hinges);
  const preferredMiddleFieldSpeedHingeCapture =
    selectPreferredMiddleFieldSpeedHingeCapture(hinges);
  return {
    status:
      hingePoints.length === 0
        ? "no_common_retained_hinge_points"
        : branchTransportPairMapHingeCount > 0
          ? "retained_hinge_branch_transport_pair_map_geometry_candidate_populated_formal_acceptance_blocked"
          : middleRetainedChartZeroSlackNoGoCount > 0
            ? "retained_hinge_middle_field_speed_hinge_capture_candidate_zero_slack_retained_chart_blocked"
          : middleFieldSpeedHingeCaptureCandidateCount > 0
            ? "retained_hinge_middle_field_speed_hinge_capture_candidate_causal_endpoint_geometry_blocked"
          : branchTransportPairMapTopologyHingeCount > 0
            ? "retained_hinge_branch_transport_pair_map_topology_populated_geometry_blocked"
            : candidatePointEventHingeCount === hingePoints.length &&
                branchTransportIncidenceHingeCount === hingePoints.length
              ? "retained_hinge_branch_transport_incidence_populated_formal_acceptance_blocked"
              : candidatePointEventHingeCount === hingePoints.length
                ? "retained_hinge_candidate_rule_populated_formal_acceptance_blocked"
                : allPairWitnessHingeCount === hingePoints.length &&
                    sharedRootHingeCount === hingePoints.length
                  ? "retained_hinge_point_witnesses_populated_point_event_rule_blocked"
                  : allPairWitnessHingeCount > 0
                    ? "retained_hinge_point_witnesses_populated_root_identity_blocked"
                    : "retained_hinge_point_witnesses_incomplete",
    claimLevel:
      "point-event witness and candidate branch-transport incidence table for common retained hinge contacts; not an accepted retained point-event rule",
    hingePointCount: hingePoints.length,
    pairCount: pairKeys.length,
    allPairWitnessHingeCount,
    sharedRootHingeCount,
    diagnosticHingeCount,
    candidatePointEventHingeCount,
    branchTransportIncidenceHingeCount,
    branchTransportPairMapTopologyHingeCount,
    branchTransportPairMapHingeCount,
    middleFieldSpeedHingeCaptureCandidateCount,
    middleRetainedChartZeroSlackNoGoCount,
    maxPointDiagnosticTorqueNorm: maxFinite(
      hinges.map((hinge) => hinge.pointDiagnostics.netDiagnosticTorqueNorm)
    ),
    maxOffDiagonalPointDiagnosticTorqueNorm: maxFinite(
      hinges.map((hinge) => hinge.pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm)
    ),
    maxPointEventOneSidedPairCount: maxFinite(
      hinges.map((hinge) => hinge.branchTransportIncidence.oneSidedPairCount)
    ),
    maxBranchTransportPairMapMatchedPairCount: maxFinite(
      hinges.map((hinge) => hinge.branchTransportIncidence.candidatePairMap.matchedPairCount)
    ),
    maxBranchTransportPairMapGeometryContinuityResidual: maxFinite(
      hinges.map(
        (hinge) => hinge.branchTransportIncidence.candidatePairMap.maxGeometryContinuityResidual
      )
    ),
    preferredBranchTransportHingeCandidate,
    preferredMiddleFieldSpeedHingeCapture,
    acceptedRetainedPointEventClaim: false,
    hinges,
    retainedLimitation:
      "A hinge point with all-pair retained transition witnesses and balanced layer incidence still needs an accepted point-event rule or branch-transport map before torque, wake, phase, partition, stability, vector-ledger, and energy-routing rows can be certified on that point event.",
  };
}

function selectPreferredBranchTransportHingeCandidate(hinges) {
  const candidates = hinges
    .filter(
      (hinge) =>
        hinge.candidatePointEventAdmissibility.pass &&
        hinge.branchTransportIncidence.pass
    )
    .slice()
    .sort(compareBranchTransportHingeCandidates);
  return projectPreferredBranchTransportHingeCandidate(candidates[0] ?? null);
}

function compareBranchTransportHingeCandidates(left, right) {
  return (
    candidatePairMapSortRank(left) - candidatePairMapSortRank(right) ||
    left.branchTransportIncidence.oneSidedPairImbalance -
      right.branchTransportIncidence.oneSidedPairImbalance ||
    left.branchTransportIncidence.oneSidedPairCount -
      right.branchTransportIncidence.oneSidedPairCount ||
    left.pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm -
      right.pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm ||
    left.time - right.time
  );
}

function candidatePairMapSortRank(hinge) {
  const pairMap = hinge.branchTransportIncidence.candidatePairMap;
  return pairMap.pass ? 0 : pairMap.topologyPass ? 1 : 2;
}

function selectPreferredMiddleFieldSpeedHingeCapture(hinges) {
  const candidates = hinges
    .filter((hinge) => hinge.middleFieldSpeedHingeCapture?.candidateCapturePass)
    .slice()
    .sort(compareMiddleFieldSpeedHingeCaptureCandidates);
  return candidates[0]?.middleFieldSpeedHingeCapture ?? null;
}

function compareMiddleFieldSpeedHingeCaptureCandidates(left, right) {
  const leftCapture = left.middleFieldSpeedHingeCapture;
  const rightCapture = right.middleFieldSpeedHingeCapture;
  return (
    Number(rightCapture.geometryTransportPass) - Number(leftCapture.geometryTransportPass) ||
    (leftCapture.maxDelayedEndpointGeometryResidual ?? Infinity) -
      (rightCapture.maxDelayedEndpointGeometryResidual ?? Infinity) ||
    (leftCapture.maxCausalEndpointToHingeChartResidual ?? Infinity) -
      (rightCapture.maxCausalEndpointToHingeChartResidual ?? Infinity) ||
    left.branchTransportIncidence.oneSidedPairImbalance -
      right.branchTransportIncidence.oneSidedPairImbalance ||
    left.time - right.time
  );
}

function projectPreferredBranchTransportHingeCandidate(hinge) {
  if (!hinge) {
    return null;
  }
  return {
    time: hinge.time,
    piMultiple: hinge.piMultiple,
    status: "preferred_candidate_only_not_retained_branch_claim",
    hingeStatus: hinge.status,
    candidatePointEventStatus: hinge.candidatePointEventAdmissibility.status,
    branchTransportIncidenceStatus: hinge.branchTransportIncidence.status,
    branchTransportPairMapStatus:
      hinge.branchTransportIncidence.candidatePairMap.status,
    branchTransportPairMapTopologyPass:
      hinge.branchTransportIncidence.candidatePairMap.topologyPass,
    branchTransportPairMapGeometryPass:
      hinge.branchTransportIncidence.candidatePairMap.pass,
    branchTransportPairMapHingeChartPass:
      hinge.branchTransportIncidence.candidatePairMap.hingeChartContinuityPass,
    commonRootKeys: hinge.commonRootKeys,
    oneSidedPairCount: hinge.branchTransportIncidence.oneSidedPairCount,
    incomingOnlyPairCount: hinge.branchTransportIncidence.incomingOnlyPairCount,
    outgoingOnlyPairCount: hinge.branchTransportIncidence.outgoingOnlyPairCount,
    oneSidedPairImbalance: hinge.branchTransportIncidence.oneSidedPairImbalance,
    matchedPairMapCount:
      hinge.branchTransportIncidence.candidatePairMap.matchedPairCount,
    geometryContinuityMatchedPairCount:
      hinge.branchTransportIncidence.candidatePairMap.geometryContinuityMatchedPairCount,
    maxGeometryContinuityResidual:
      hinge.branchTransportIncidence.candidatePairMap.maxGeometryContinuityResidual,
    clockContinuityMatchedPairCount:
      hinge.branchTransportIncidence.candidatePairMap.clockContinuityMatchedPairCount,
    maxClockContinuityTimeJump:
      hinge.branchTransportIncidence.candidatePairMap.maxClockContinuityTimeJump,
    maxClockContinuityWrappedPhaseJump:
      hinge.branchTransportIncidence.candidatePairMap.maxClockContinuityWrappedPhaseJump,
    hingeChartContinuityMatchedPairCount:
      hinge.branchTransportIncidence.candidatePairMap.hingeChartContinuityMatchedPairCount,
    maxHingeChartContinuityResidual:
      hinge.branchTransportIncidence.candidatePairMap.maxHingeChartContinuityResidual,
    maxCausalEndpointToHingeChartResidual:
      hinge.branchTransportIncidence.candidatePairMap.maxCausalEndpointToHingeChartResidual,
    candidatePairMapMatches:
      hinge.branchTransportIncidence.candidatePairMap.matches,
    middleFieldSpeedHingeCapture: hinge.middleFieldSpeedHingeCapture,
    offDiagonalNetDiagnosticTorqueNorm:
      hinge.pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm,
    retainedBranchClaim: false,
  };
}

function createRetainedHingePointWitness({
  selectedCase,
  hingePoint,
  retainedRowSetIdentity,
  retainedTimeDomainCoverage,
  retainedEdgesByPair,
  pairKeys,
  timeWindowTorqueProbe,
}) {
  const pairWitnesses = {};
  let commonRootKeys = null;
  let boundaryOnlyPairCount = 0;
  let interiorPairCount = 0;
  let missingPairCount = 0;

  for (const pairKey of pairKeys) {
    const matchingEdges = (retainedEdgesByPair[pairKey] ?? []).filter((edge) =>
      hitTimeIntervalContains(edge, hingePoint.time)
    );
    const retainedRootKeys = unionRootKeys(matchingEdges.flatMap((edge) => edge.retainedRootKeys));
    const incidences = matchingEdges.map((edge) => classifyHingeIncidence(edge, hingePoint.time));
    const pointDiagnostics = createHingePairPointDiagnostics({
      pairKey,
      time: hingePoint.time,
      matchingEdges,
    });
    const boundaryOrientationCounts = createBoundaryOrientationCounts(matchingEdges, hingePoint.time);
    const hasBoundary = incidences.includes("boundary");
    const hasInterior = incidences.includes("interior");
    if (matchingEdges.length === 0) {
      missingPairCount += 1;
    } else if (hasInterior) {
      interiorPairCount += 1;
    } else if (hasBoundary) {
      boundaryOnlyPairCount += 1;
    }
    commonRootKeys =
      commonRootKeys == null
        ? new Set(retainedRootKeys)
        : intersectRootKeySets(commonRootKeys, new Set(retainedRootKeys));
    pairWitnesses[pairKey] = {
      status:
        matchingEdges.length > 0
          ? retainedRootKeys.length > 0
            ? "retained_transition_incident_at_hinge"
            : "retained_transition_without_root_key_at_hinge"
          : "missing_retained_transition_at_hinge",
      witnessEdgeCount: matchingEdges.length,
      retainedRootKeys,
      incidence:
        hasInterior && hasBoundary
          ? "mixed_boundary_interior"
          : hasInterior
            ? "interior"
            : hasBoundary
              ? "boundary"
              : "missing",
      pointDiagnostics,
      boundaryOrientationCounts,
      edges: matchingEdges
        .slice(0, 4)
        .map((edge) => projectRetainedHingeWitnessEdge(edge, hingePoint.time)),
    };
  }

  const commonRootKeyList = [...(commonRootKeys ?? new Set())].sort((left, right) => left - right);
  const allPairsWitnessed = missingPairCount === 0;
  const pointDiagnostics = summarizeHingePointDiagnostics(pairWitnesses);
  const candidatePointEventAdmissibility = createCandidatePointEventAdmissibility({
    allPairsWitnessed,
    missingPairCount,
    boundaryOnlyPairCount,
    interiorPairCount,
    commonRootKeyList,
    pairWitnesses,
    pointDiagnostics,
  });
  const branchTransportIncidence = createPointEventBranchTransportIncidence({
    selectedCase,
    candidatePointEventAdmissibility,
    pairWitnesses,
  });
  const hingeEventRowSetIdentity = createHingeEventRowSetIdentity({
    hingePoint,
    allPairsWitnessed,
    commonRootKeyList,
    pairWitnesses,
    retainedRowSetIdentity,
    pointDiagnostics,
    candidatePointEventAdmissibility,
    branchTransportIncidence,
  });
  const middleFieldSpeedHingeCapture = createMiddleFieldSpeedHingeCapture({
    selectedCase,
    hingePoint,
    branchTransportIncidence,
    hingeEventRowSetIdentity,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
    timeWindowTorqueProbe,
  });
  return {
    ...hingePoint,
    status:
      branchTransportIncidence.candidatePairMap.pass
        ? "hinge_point_branch_transport_pair_map_geometry_candidate_formal_acceptance_blocked"
        : branchTransportIncidence.candidatePairMap.topologyPass
          ? "hinge_point_branch_transport_pair_map_topology_candidate_geometry_blocked"
          : candidatePointEventAdmissibility.pass && branchTransportIncidence.pass
            ? "hinge_point_branch_transport_incidence_candidate_formal_acceptance_blocked"
            : allPairsWitnessed && commonRootKeyList.length > 0
              ? "hinge_point_common_root_key_candidate_point_event_rule_blocked"
              : allPairsWitnessed
                ? "hinge_point_all_pairs_witnessed_root_identity_missing"
                : "hinge_point_missing_pair_witnesses",
    allPairsWitnessed,
    missingPairCount,
    boundaryOnlyPairCount,
    interiorPairCount,
    commonRootKeyCount: commonRootKeyList.length,
    commonRootKeys: commonRootKeyList.slice(0, 12),
    hingeEventRowSetIdentity,
    pointDiagnostics,
    candidatePointEventAdmissibility,
    branchTransportIncidence,
    middleFieldSpeedHingeCapture,
    pairWitnesses,
  };
}

function createHingeEventRowSetIdentity({
  hingePoint,
  allPairsWitnessed,
  commonRootKeyList,
  pairWitnesses,
  retainedRowSetIdentity,
  pointDiagnostics = null,
  candidatePointEventAdmissibility = null,
  branchTransportIncidence = null,
}) {
  const commonRootKeySet = new Set(commonRootKeyList);
  const pairRows = Object.entries(pairWitnesses).map(([pairKey, witness]) => {
    const commonRootKeys = witness.retainedRootKeys.filter((rootKey) =>
      commonRootKeySet.has(rootKey)
    );
    const rootIntervals = mergeHitTimeIntervals(
      witness.edges
        .filter((edge) => edge.retainedRootKeys.some((rootKey) => commonRootKeySet.has(rootKey)))
        .map((edge) => ({ start: edge.start, end: edge.end }))
    );
    return {
      pairKey,
      status:
        commonRootKeys.length > 0
          ? "hinge_pair_common_root_key_witness_populated"
          : witness.witnessEdgeCount > 0
            ? "hinge_pair_retained_witness_without_common_root_key"
            : "hinge_pair_retained_witness_missing",
      witnessEdgeCount: witness.witnessEdgeCount,
      incidence: witness.incidence,
      commonRootKeys,
      rootIntervalCount: rootIntervals.length,
      maxRootIntervalWidth: maxFinite(rootIntervals.map((interval) => interval.end - interval.start)),
      rootIntervals: rootIntervals.slice(0, 8),
    };
  });
  const pairCountWithCommonRootKey = pairRows.filter(
    (row) => row.commonRootKeys.length > 0
  ).length;
  const rootPayloadIntervalEnclosure = createHingeRootPayloadIntervalEnclosure({
    pairRows,
    hingeTime: hingePoint.time,
  });
  const populated =
    allPairsWitnessed &&
    pairRows.length > 0 &&
    pairCountWithCommonRootKey === pairRows.length &&
    commonRootKeyList.length > 0;
  return {
    schema: "aaa-tri-binary-hinge-event-row-set-identity.v1",
    status: populated
      ? "hinge_event_common_root_key_candidate_populated"
      : allPairsWitnessed
        ? "hinge_event_common_root_key_candidate_missing"
        : "hinge_event_pair_witnesses_incomplete",
    claimLevel:
      "event-local common root-key identity at a hinge point; not a positive-width retained row-set certificate",
    retainedBranchClaim: false,
    hingeTime: hingePoint.time,
    hingePiMultiple: hingePoint.piMultiple,
    pairCount: pairRows.length,
    pairCountWithCommonRootKey,
    commonRootKeyCount: commonRootKeyList.length,
    commonRootKeys: commonRootKeyList.slice(0, 12),
    allPairsWitnessed,
    globalRetainedRowSetIdentityStatus: retainedRowSetIdentity?.status ?? null,
    pointEventDiagnosticsStatus: pointDiagnostics?.status ?? null,
    diagonalIdentityPairCount: pointDiagnostics?.diagonalIdentityPairCount ?? null,
    offDiagonalForcePairCount: pointDiagnostics?.offDiagonalForcePairCount ?? null,
    offDiagonalNetDiagnosticTorqueNorm:
      pointDiagnostics?.offDiagonalNetDiagnosticTorqueNorm ?? null,
    candidatePointEventAdmissibilityStatus:
      candidatePointEventAdmissibility?.status ?? null,
    candidatePointEventAdmissibilityPass:
      candidatePointEventAdmissibility?.pass === true,
    pointEventTorqueTolerance:
      candidatePointEventAdmissibility?.torqueTolerance ?? null,
    branchTransportIncidenceStatus: branchTransportIncidence?.status ?? null,
    branchTransportIncidencePass: branchTransportIncidence?.pass === true,
    branchTransportPairMapStatus:
      branchTransportIncidence?.candidatePairMap?.status ?? null,
    branchTransportPairMapTopologyPass:
      branchTransportIncidence?.candidatePairMap?.topologyPass === true,
    branchTransportPairMapGeometryPass:
      branchTransportIncidence?.candidatePairMap?.pass === true,
    branchTransportPairMapHingeChartPass:
      branchTransportIncidence?.candidatePairMap?.hingeChartContinuityPass === true,
    pointEventOneSidedPairCount:
      branchTransportIncidence?.oneSidedPairCount ?? null,
    pointEventIncomingOnlyPairCount:
      branchTransportIncidence?.incomingOnlyPairCount ?? null,
    pointEventOutgoingOnlyPairCount:
      branchTransportIncidence?.outgoingOnlyPairCount ?? null,
    pointEventPairMapMatchedPairCount:
      branchTransportIncidence?.candidatePairMap?.matchedPairCount ?? null,
    rootPayloadIntervalEnclosure,
    rows: pairRows,
    retainedLimitation:
      "This identity attaches all hinge-pair witnesses to a common root key at one point event. It does not supply a positive-width common retained time domain, section stability, or retained force/torque/wake/phase/partition rows over W.",
  };
}

function createHingeRootPayloadIntervalEnclosure({ pairRows, hingeTime }) {
  let commonIntervals = null;
  for (const row of pairRows) {
    commonIntervals =
      commonIntervals == null
        ? row.rootIntervals
        : intersectHitTimeIntervalSets(commonIntervals, row.rootIntervals);
  }
  const commonCoverage = summarizeHitTimeIntervals(commonIntervals ?? []);
  const sideCoverage = createHingeRootOneSidedIntervalCoverage({ pairRows, hingeTime });
  const pairCountWithRootInterval = pairRows.filter((row) => row.rootIntervalCount > 0).length;
  const positiveWidthCommonRootInterval = commonCoverage.maxWidth > ROOT_TOLERANCE;
  const pointOnlyCommonRootInterval =
    commonCoverage.intervalCount > 0 && !positiveWidthCommonRootInterval;
  const oneSidedPositiveWidthCommonInterval =
    sideCoverage.left.maxCommonWidth > ROOT_TOLERANCE ||
    sideCoverage.right.maxCommonWidth > ROOT_TOLERANCE;
  return {
    schema: "aaa-tri-binary-hinge-root-payload-interval-enclosure.v1",
    status: positiveWidthCommonRootInterval
      ? "hinge_common_root_positive_width_interval_candidate_populated"
      : pointOnlyCommonRootInterval && !oneSidedPositiveWidthCommonInterval
        ? "hinge_common_root_interval_point_only_no_common_side"
      : pointOnlyCommonRootInterval
        ? "hinge_common_root_interval_point_only"
        : "hinge_common_root_interval_missing",
    claimLevel:
      "common-root interval enclosure for a hinge event; not retained branch-chart certification",
    positiveWidthCommonRootInterval,
    pointOnlyCommonRootInterval,
    pairCount: pairRows.length,
    pairCountWithRootInterval,
    commonIntervalCount: commonCoverage.intervalCount,
    commonTotalWidth: commonCoverage.totalWidth,
    maxCommonWidth: commonCoverage.maxWidth,
    commonIntervals: commonCoverage.intervals,
    oneSidedPositiveWidthCommonInterval,
    sideCoverage,
    retainedLimitation:
      "A point-only common-root interval does not supply the positive-width retained interval needed for section stability or retained force, torque, wake, phase, partition, route, and energy rows over W.",
  };
}

function createHingeRootOneSidedIntervalCoverage({ pairRows, hingeTime }) {
  const leftRows = pairRows.map((row) => ({
    ...row,
    sideIntervals: row.rootIntervals
      .map((interval) => ({
        start: interval.start,
        end: Math.min(interval.end, hingeTime),
      }))
      .filter((interval) => interval.end - interval.start > ROOT_TOLERANCE),
  }));
  const rightRows = pairRows.map((row) => ({
    ...row,
    sideIntervals: row.rootIntervals
      .map((interval) => ({
        start: Math.max(interval.start, hingeTime),
        end: interval.end,
      }))
      .filter((interval) => interval.end - interval.start > ROOT_TOLERANCE),
  }));
  return {
    left: createCommonSideIntervalCoverage(leftRows),
    right: createCommonSideIntervalCoverage(rightRows),
  };
}

function createCommonSideIntervalCoverage(sideRows) {
  let commonIntervals = null;
  for (const row of sideRows) {
    commonIntervals =
      commonIntervals == null
        ? row.sideIntervals
        : intersectHitTimeIntervalSets(commonIntervals, row.sideIntervals);
  }
  const commonCoverage = summarizeHitTimeIntervals(commonIntervals ?? []);
  return {
    pairCount: sideRows.length,
    pairCountWithSideInterval: sideRows.filter((row) => row.sideIntervals.length > 0).length,
    commonIntervalCount: commonCoverage.intervalCount,
    commonTotalWidth: commonCoverage.totalWidth,
    maxCommonWidth: commonCoverage.maxWidth,
    commonIntervals: commonCoverage.intervals,
  };
}

function createHingeRootBranchTransportRouteFeasibility({
  middleContinuityMatches,
  hingeEventRowSetIdentity,
}) {
  const rowsByPairKey = new Map(
    (hingeEventRowSetIdentity?.rows ?? []).map((row) => [row.pairKey, row])
  );
  const routeRows = (middleContinuityMatches ?? []).map((match) =>
    createHingeRootBranchTransportRouteRow({
      match,
      rowsByPairKey,
      hingeTime: hingeEventRowSetIdentity?.hingeTime ?? null,
    })
  );
  const evaluatedRouteCount = routeRows.length;
  const candidateRouteCount = routeRows.filter((row) => row.candidateRoutePass).length;
  const zeroSlackRouteCount = routeRows.filter((row) => row.zeroSlackRoutePass).length;
  const compensationRequiredRows = routeRows.filter(
    (row) => row.candidateRoutePass && row.compensationRequired
  );
  const blockingRows = routeRows.filter((row) => !row.candidateRoutePass);
  const candidateRoutePass =
    evaluatedRouteCount > 0 && candidateRouteCount === evaluatedRouteCount;
  const zeroSlackRoutePass =
    candidateRoutePass && zeroSlackRouteCount === evaluatedRouteCount;
  const maxRequiredEndpointCompensationNorm = maxFinite(
    compensationRequiredRows.map((row) => row.requiredEndpointCompensationNorm)
  );
  const maxRequiredPhaseCompensation = maxFinite(
    compensationRequiredRows.map((row) => row.requiredPhaseCompensation)
  );

  return {
    schema: "aaa-tri-binary-hinge-root-branch-transport-route-feasibility.v1",
    status:
      evaluatedRouteCount === 0
        ? "hinge_root_branch_transport_route_missing_pair_map_matches"
        : zeroSlackRoutePass
          ? "hinge_root_branch_transport_route_zero_slack_candidate_formal_acceptance_blocked"
          : candidateRoutePass
            ? "hinge_root_branch_transport_route_candidate_compensation_required"
            : "hinge_root_branch_transport_route_blocked",
    claimLevel:
      "candidate left-to-right root route through the branch-transport pair map; not retained branch certification",
    retainedBranchClaim: false,
    candidateRoutePass,
    zeroSlackRoutePass,
    evaluatedRouteCount,
    candidateRouteCount,
    zeroSlackRouteCount,
    compensationRequiredMatchCount: compensationRequiredRows.length,
    blockingMatchCount: blockingRows.length,
    maxRequiredEndpointCompensationNorm,
    maxRequiredPhaseCompensation,
    rows: routeRows,
    retainedLimitation:
      "A branch-transport route candidate can stitch one-sided root intervals through the hinge. It does not by itself supply wake, recoil, partition, phase, torque, stability, or retained residual rows on the same event.",
  };
}

function createCompensatedRoutePayloadCertificate({
  hingeRootBranchTransportRouteFeasibility,
}) {
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const rows = routeRows.map((row) => createCompensatedRoutePayloadRow(row));
  const requiredPayloadFields = [
    "transport_angular_momentum_increment",
    "root_energy_increment",
    "recoil_channel_data",
    "bounded_undeclared_route_slack",
  ];
  const missingPayloadFields = unionStrings(
    rows.flatMap((row) => row.missingPayloadFields)
  );
  const compensationRequiredRows = rows.filter((row) => row.compensationRequired);
  const complete =
    rows.length > 0 &&
    rows.every((row) => row.payloadPass) &&
    missingPayloadFields.length === 0;
  const candidateRoutePass =
    hingeRootBranchTransportRouteFeasibility?.candidateRoutePass === true;
  const boundedSlackRows = rows.filter(
    (row) => row.boundedUndeclaredRouteSlack?.boundedSlackPass === true
  );
  const transportAngularMomentumRows = rows.filter(
    (row) => row.transportAngularMomentumIncrement?.transportAngularMomentumPass === true
  );
  const rootEnergyRows = rows.filter(
    (row) => row.rootEnergyIncrement?.rootEnergyIncrementPass === true
  );
  const recoilChannelRows = rows.filter(
    (row) => row.recoilChannelData?.recoilChannelPass === true
  );
  const maxUnassignedGeometricSlack = maxFinite(
    rows
      .filter((row) => row.boundedUndeclaredRouteSlack?.boundedSlackPass !== true)
      .map((row) => row.boundedUndeclaredRouteSlack?.geometricUpperBound)
  );
  const maxUnassignedPhaseSlack = maxFinite(
    rows
      .filter((row) => row.boundedUndeclaredRouteSlack?.boundedSlackPass !== true)
      .map((row) => row.boundedUndeclaredRouteSlack?.phaseUpperBound)
  );
  const maxBoundedGeometricSlack = maxFinite(
    boundedSlackRows.map((row) => row.boundedUndeclaredRouteSlack?.geometricUpperBound)
  );
  const maxBoundedClockRetune = maxFinite(
    boundedSlackRows.map((row) => row.boundedUndeclaredRouteSlack?.clockRetuneUpperBound)
  );
  const maxBoundedPhaseSlack = maxFinite(
    boundedSlackRows.map((row) => row.boundedUndeclaredRouteSlack?.phaseUpperBound)
  );
  const maxTransportAngularMomentumNorm = maxFinite(
    transportAngularMomentumRows.map(
      (row) => row.transportAngularMomentumIncrement?.unitEndpointPairAngularMomentumNorm
    )
  );
  const maxTransportAngularMomentumNormUpperBound = maxFinite(
    transportAngularMomentumRows.map(
      (row) => row.transportAngularMomentumIncrement?.unitAngularMomentumNormUpperBound
    )
  );
  const maxRootEnergyIncrement = maxFinite(
    rootEnergyRows.map((row) => row.rootEnergyIncrement?.unitActionRootEnergyIncrement)
  );
  const maxRecoilAngularMomentumNorm = maxFinite(
    recoilChannelRows.map((row) => row.recoilChannelData?.unitRecoilAngularMomentumNorm)
  );
  const maxRecoilEnergyScale = maxFinite(
    recoilChannelRows.map((row) => row.recoilChannelData?.unitRootEnergyIncrement)
  );

  return {
    schema: "aaa-tri-binary-compensated-route-payload-certificate.v1",
    status: !candidateRoutePass
      ? "compensated_route_payload_route_candidate_missing"
      : complete
        ? "compensated_route_payload_complete_formal_acceptance_blocked"
        : missingPayloadFields.includes("transport_angular_momentum_increment")
          ? "compensated_route_payload_blocked_missing_transport_recoil_rows"
          : missingPayloadFields.includes("root_energy_increment")
            ? "compensated_route_payload_blocked_missing_energy_recoil_rows"
            : missingPayloadFields.includes("recoil_channel_data")
              ? "compensated_route_payload_blocked_missing_recoil_rows"
          : "compensated_route_payload_zero_slack_route_fields_missing",
    claimLevel:
      "route-payload certificate check for the hinge branch route; not retained branch certification",
    retainedBranchClaim: false,
    complete,
    candidateRoutePass,
    zeroSlackRoutePass:
      hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true,
    requiredPayloadFields,
    missingPayloadFields,
    populatedPayloadFields: requiredPayloadFields.filter(
      (field) => !missingPayloadFields.includes(field)
    ),
    routeRowCount: rows.length,
    compensationRequiredRowCount: compensationRequiredRows.length,
    boundedSlackRowCount: boundedSlackRows.length,
    transportAngularMomentumRowCount: transportAngularMomentumRows.length,
    rootEnergyRowCount: rootEnergyRows.length,
    recoilChannelRowCount: recoilChannelRows.length,
    maxUnassignedGeometricSlack,
    maxUnassignedPhaseSlack,
    maxBoundedGeometricSlack,
    maxBoundedClockRetune,
    maxBoundedPhaseSlack,
    maxTransportAngularMomentumNorm,
    maxTransportAngularMomentumNormUpperBound,
    maxRootEnergyIncrement,
    maxRecoilAngularMomentumNorm,
    maxRecoilEnergyScale,
    rows,
    retainedLimitation:
      "The branch route is a root/topology carrier with coefficient-free transport, root-energy, recoil, and bounded-slack diagnostics. It is not a physical route law, wake law, partition row, or section-stability certificate.",
  };
}

function createCompensatedRoutePayloadRow(routeRow) {
  const compensationRequired = routeRow.compensationRequired === true;
  const routeView = rowRouteView(routeRow);
  const transportAngularMomentumIncrement =
    createTransportAngularMomentumIncrementDiagnostic(routeView);
  const requiredTransportAngularMomentumIncrement = transportAngularMomentumIncrement;
  const rootEnergyIncrement = createRootEnergyIncrementDiagnostic(routeView);
  const recoilChannelData = createRecoilChannelDataDiagnostic({
    routeRow: routeView,
    transportAngularMomentumIncrement,
    rootEnergyIncrement,
  });
  const boundedUndeclaredRouteSlack = createBoundedUndeclaredRouteSlack(routeView);
  const missingPayloadFields = [
    transportAngularMomentumIncrement.transportAngularMomentumPass !== true
      ? "transport_angular_momentum_increment"
      : null,
    rootEnergyIncrement.rootEnergyIncrementPass !== true
      ? "root_energy_increment"
      : null,
    recoilChannelData.recoilChannelPass !== true
      ? "recoil_channel_data"
      : null,
    boundedUndeclaredRouteSlack.boundedSlackPass !== true
      ? "bounded_undeclared_route_slack"
      : null,
  ].filter(Boolean);
  const payloadPass =
    routeRow.candidateRoutePass === true &&
    missingPayloadFields.length === 0;

  return {
    incomingPairKey: routeRow.incomingPairKey,
    outgoingPairKey: routeRow.outgoingPairKey,
    continuityRole: routeRow.continuityRole,
    continuityLayer: routeRow.continuityLayer,
    hingeTime: routeRow.hingeTime ?? null,
    status: !routeRow.candidateRoutePass
      ? "route_payload_route_candidate_missing"
      : payloadPass
        ? "route_payload_row_complete_formal_acceptance_blocked"
        : compensationRequired
          ? "route_payload_row_compensation_fields_missing"
          : "route_payload_row_zero_slack_fields_missing",
    candidateRoutePass: routeRow.candidateRoutePass,
    zeroSlackRoutePass: routeRow.zeroSlackRoutePass,
    compensationRequired,
    incomingLeftCoverage: routeRow.incomingLeftCoverage ?? null,
    outgoingRightCoverage: routeRow.outgoingRightCoverage ?? null,
    routeRootKey: routeRow.routeRootKey ?? null,
    minOneSidedRouteWidth: routeRow.minOneSidedRouteWidth ?? null,
    endpointPairResidual: routeRow.endpointPairResidual ?? null,
    endpointToChartResidual: routeRow.endpointToChartResidual ?? null,
    endpointPairResidualVector: routeRow.endpointPairResidualVector ?? null,
    requiredEndpointCompensationNorm:
      routeRow.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: routeRow.requiredClockRetune ?? null,
    requiredPhaseCompensation: routeRow.requiredPhaseCompensation ?? null,
    continuityPointKind: routeRow.continuityPointKind ?? null,
    incomingPairEndpointGeometry: routeRow.incomingPairEndpointGeometry ?? null,
    outgoingPairEndpointGeometry: routeRow.outgoingPairEndpointGeometry ?? null,
    transportAngularMomentumIncrement,
    requiredTransportAngularMomentumIncrement,
    rootEnergyIncrement,
    recoilChannelData,
    boundedUndeclaredRouteSlack,
    undeclaredRouteSlack: boundedUndeclaredRouteSlack,
    missingPayloadFields,
    payloadPass,
  };
}

function createRouteAuthorizedWakePayloadDiagnostic({
  compensatedRoutePayloadCertificate,
  hingeRootBranchTransportRouteFeasibility = null,
  hingeEventRowSetIdentity = null,
  retainedTimeDomainCoverage = null,
  timeWindowTorqueProbe,
  cleanEnergyFrequencyTarget = null,
  minimalBranchTransactionFrequencyCertificate = null,
  layerByName = new Map(),
}) {
  const reconstruction =
    timeWindowTorqueProbe?.diagnosticWakeTorqueReconstruction ?? null;
  if (compensatedRoutePayloadCertificate?.complete !== true) {
    return {
      schema: "aaa-tri-binary-route-authorized-wake-payload-diagnostic.v1",
      status: "wake_payload_route_payload_incomplete",
      claimLevel:
        "wake-payload target diagnostic; not normalized action-kernel wake pullback",
      wakePayloadPass: false,
      partialWakePayload: false,
    };
  }
  if (!isFiniteVector(reconstruction?.diagnosticWakeTorqueIntegralWithoutBoundary)) {
    return {
      schema: "aaa-tri-binary-route-authorized-wake-payload-diagnostic.v1",
      status: "wake_payload_time_window_reconstruction_missing",
      claimLevel:
        "wake-payload target diagnostic; not normalized action-kernel wake pullback",
      wakePayloadPass: false,
      partialWakePayload: false,
    };
  }

  const wakeAngularMomentumWithoutBoundary =
    reconstruction.diagnosticWakeTorqueIntegralWithoutBoundary;
  const requiredActionKernelBoundaryCharge = scaleVector(
    wakeAngularMomentumWithoutBoundary,
    -1
  );
  const targetResidualVector = addVectors(
    wakeAngularMomentumWithoutBoundary,
    requiredActionKernelBoundaryCharge
  );
  const normalizedActionKernelWakeChargeCandidate =
    createNormalizedActionKernelWakeChargeCandidate({
      wakeAngularMomentumWithoutBoundary,
      requiredActionKernelBoundaryCharge,
    });
  const retainedActionKernelPullbackDomainTarget =
    createRetainedActionKernelPullbackDomainTarget({
      compensatedRoutePayloadCertificate,
      timeWindowTorqueProbe,
    });
  const actionKernelNormalizationConventionCandidate =
    createActionKernelNormalizationConventionCandidate({
      retainedActionKernelPullbackDomainTarget,
    });
  const chartRestrictedCrossingDomainRows =
    createChartRestrictedCrossingDomainRows({
      retainedActionKernelPullbackDomainTarget,
      actionKernelNormalizationConventionCandidate,
    });
  const kernelGradientIntegralCandidate =
    createKernelGradientIntegralCandidate({
      normalizedActionKernelWakeChargeCandidate,
      retainedActionKernelPullbackDomainTarget,
    });
  const finiteEndpointClearKernelGradientIntegralEvaluation =
    createFiniteEndpointClearKernelGradientIntegralEvaluation({
      normalizedActionKernelWakeChargeCandidate,
      chartRestrictedCrossingDomainRows,
      kernelGradientIntegralCandidate,
    });
  const masterEquationCharacteristicTailPullbackCandidate =
    createMasterEquationCharacteristicTailPullbackCandidate({
      normalizedActionKernelWakeChargeCandidate,
      actionKernelNormalizationConventionCandidate,
      chartRestrictedCrossingDomainRows,
      finiteEndpointClearKernelGradientIntegralEvaluation,
    });
  const normalizedActionKernelWakeCharge =
    createAcceptedNormalizedActionKernelWakeCharge({
      normalizedActionKernelWakeChargeCandidate,
      chartRestrictedCrossingDomainRows,
      finiteEndpointClearKernelGradientIntegralEvaluation,
      masterEquationCharacteristicTailPullbackCandidate,
    });
  const retainedActionKernelPullbackDomain =
    createAcceptedRetainedCrossingDomainPullback({
      retainedActionKernelPullbackDomainTarget,
      chartRestrictedCrossingDomainRows,
      normalizedActionKernelWakeCharge,
    });
  const wakeEnergyIncrementTarget = createWakeEnergyIncrementTarget({
    normalizedActionKernelWakeCharge,
    retainedActionKernelPullbackDomain,
    compensatedRoutePayloadCertificate,
    hingeRootBranchTransportRouteFeasibility,
    hingeEventRowSetIdentity,
    retainedTimeDomainCoverage,
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    actionKernelNormalizationConventionCandidate,
    masterEquationCharacteristicTailPullbackCandidate,
    layerByName,
  });
  const characteristicTailCoefficientQuadraturePass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.candidatePass === true;
  const characteristicTailSingleCoefficientSignPatternPass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.candidatePass === true;
  const characteristicTailLayerPolarityAssignmentPass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
      ?.candidatePass === true;
  const characteristicTailSourceReceiverPolarityRowBindingPass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.candidatePass === true;
  const characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeDerivedMetadataPass === true;
  const characteristicTailRouteLocalPolarityAcceptancePass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeLocalPolarityAcceptanceTarget?.acceptedSourceReceiverPolarityMetadataPass ===
    true;
  const characteristicTailRouteLocalCoefficientAcceptancePass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget?.acceptedCoefficientQuadraturePass ===
    true;
  const characteristicTailRouteLocalRowAmplitudeRequirementPass =
    masterEquationCharacteristicTailPullbackCandidate.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget?.rowAmplitudeRequirementPass === true;
  const wakeActionKernelBlocker = createWakeActionKernelBlocker({
    normalizedActionKernelWakeChargeCandidate,
    retainedActionKernelPullbackDomainTarget,
    normalizedActionKernelWakeCharge,
    retainedActionKernelPullbackDomain,
    actionKernelNormalizationConventionCandidate,
    chartRestrictedCrossingDomainRows,
    kernelGradientIntegralCandidate,
    finiteEndpointClearKernelGradientIntegralEvaluation,
    masterEquationCharacteristicTailPullbackCandidate,
    wakeEnergyIncrementTarget,
  });

  return {
    schema: "aaa-tri-binary-route-authorized-wake-payload-diagnostic.v1",
    status:
      normalizedActionKernelWakeCharge.acceptedActionKernelChargePass &&
      retainedActionKernelPullbackDomain.acceptedRetainedCrossingDomainPullbackPass
        ? wakeEnergyIncrementTarget.targetPopulated
          ? "wake_payload_boundary_charge_pullback_accepted_wake_energy_law_missing"
          : "wake_payload_boundary_charge_pullback_accepted_wake_energy_missing"
        : normalizedActionKernelWakeCharge.acceptedActionKernelChargePass
        ? "wake_payload_boundary_charge_accepted_retained_pullback_wake_energy_missing"
        : characteristicTailRouteLocalCoefficientAcceptancePass
        ? "wake_payload_characteristic_tail_route_local_coefficients_accepted_boundary_charge_pullback_wake_energy_missing"
        : characteristicTailRouteLocalRowAmplitudeRequirementPass
        ? "wake_payload_characteristic_tail_route_local_row_amplitude_requirement_populated_boundary_charge_pullback_wake_energy_missing"
        : characteristicTailRouteLocalPolarityAcceptancePass
        ? "wake_payload_characteristic_tail_route_local_polarity_metadata_accepted_boundary_charge_pullback_wake_energy_missing"
        : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
        ? "wake_payload_characteristic_tail_source_receiver_polarity_route_derived_metadata_populated_acceptance_and_wake_energy_missing"
        : characteristicTailSourceReceiverPolarityRowBindingPass
        ? "wake_payload_characteristic_tail_source_receiver_polarity_row_binding_candidate_populated_acceptance_and_wake_energy_missing"
      : characteristicTailLayerPolarityAssignmentPass
        ? "wake_payload_characteristic_tail_layer_polarity_assignment_candidate_populated_source_receiver_rows_and_wake_energy_missing"
      : characteristicTailSingleCoefficientSignPatternPass
        ? "wake_payload_characteristic_tail_single_coefficient_sign_pattern_candidate_populated_polarity_and_wake_energy_missing"
        : characteristicTailCoefficientQuadraturePass
        ? "wake_payload_characteristic_tail_coefficient_quadrature_candidate_populated_acceptance_and_wake_energy_missing"
        : masterEquationCharacteristicTailPullbackCandidate.targetPopulated &&
          masterEquationCharacteristicTailPullbackCandidate.radialConstrainedSolvePass
        ? "wake_payload_characteristic_tail_radial_constrained_candidate_populated_coefficients_and_wake_energy_missing"
        : masterEquationCharacteristicTailPullbackCandidate.targetPopulated &&
      !masterEquationCharacteristicTailPullbackCandidate.pairRadialAlignmentPass
        ? "wake_payload_characteristic_tail_pair_radial_alignment_blocked"
        : masterEquationCharacteristicTailPullbackCandidate.pairRadialAlignmentPass
        ? "wake_payload_characteristic_tail_pair_radial_target_populated_coefficients_and_wake_energy_missing"
        : finiteEndpointClearKernelGradientIntegralEvaluation.candidateEvaluationPass
        ? "wake_payload_finite_endpoint_clear_kernel_gradient_candidate_evaluated_master_law_pullback_missing"
        : chartRestrictedCrossingDomainRows.acceptedCrossingDomainPass &&
      kernelGradientIntegralCandidate.candidatePopulated
      ? "wake_payload_crossing_domain_accepted_kernel_integral_missing"
      : actionKernelNormalizationConventionCandidate.candidatePopulated &&
        kernelGradientIntegralCandidate.candidatePopulated
      ? "wake_payload_charge_domain_convention_and_gradient_candidates_populated_action_kernel_missing"
      : actionKernelNormalizationConventionCandidate.candidatePopulated
      ? "wake_payload_charge_domain_convention_candidate_populated_crossing_domain_missing"
      : retainedActionKernelPullbackDomainTarget.targetPopulated
      ? "wake_payload_charge_candidate_and_pullback_target_populated_action_kernel_missing"
      : "wake_payload_boundary_charge_target_populated_action_kernel_missing",
    claimLevel:
      "wake-payload target diagnostic; not normalized action-kernel wake pullback",
    wakePayloadPass: false,
    partialWakePayload: true,
    routePayloadStatus: compensatedRoutePayloadCertificate.status,
    timeWindowTorqueProbeStatus: timeWindowTorqueProbe?.status ?? null,
    diagnosticWakeReconstructionStatus: reconstruction.status,
    formula: reconstruction.formula,
    wakeAngularMomentumWithoutBoundary,
    wakeAngularMomentumWithoutBoundaryNorm:
      reconstruction.diagnosticWakeTorqueIntegralWithoutBoundaryNorm,
    requiredActionKernelBoundaryCharge,
    requiredActionKernelBoundaryChargeNorm: vectorNorm(
      requiredActionKernelBoundaryCharge
    ),
    targetResidualVector,
    targetResidualNorm: vectorNorm(targetResidualVector),
    normalizedActionKernelWakeChargeCandidate,
    retainedActionKernelPullbackDomainTarget,
    actionKernelNormalizationConventionCandidate,
    chartRestrictedCrossingDomainRows,
    kernelGradientIntegralCandidate,
    finiteEndpointClearKernelGradientIntegralEvaluation,
    masterEquationCharacteristicTailPullbackCandidate,
    normalizedActionKernelWakeCharge,
    retainedActionKernelPullbackDomain,
    minimalBranchTransactionFrequencyCertificate,
    wakeEnergyIncrementTarget,
    wakeEnergyIncrement: null,
    partialProgressFields: [
      "normalized_action_kernel_wake_charge_candidate",
      "retained_action_kernel_pullback_domain_target",
      "action_kernel_normalization_convention_candidate",
      "chart_restricted_crossing_domain_rows",
      "least_norm_kernel_gradient_integral_candidate",
      "finite_endpoint_clear_kernel_gradient_integral_candidate",
      "master_equation_characteristic_tail_pullback_candidate",
      characteristicTailCoefficientQuadraturePass
        ? "characteristic_tail_coefficient_quadrature_candidate"
        : null,
      characteristicTailSingleCoefficientSignPatternPass
        ? "characteristic_tail_single_coefficient_sign_pattern_candidate"
        : null,
      characteristicTailLayerPolarityAssignmentPass
        ? "characteristic_tail_layer_polarity_assignment_candidate"
        : null,
      characteristicTailSourceReceiverPolarityRowBindingPass
        ? "characteristic_tail_source_receiver_polarity_row_binding_candidate"
        : null,
      characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
        ? "characteristic_tail_source_receiver_polarity_route_derived_metadata_candidate"
        : null,
      characteristicTailRouteLocalPolarityAcceptancePass
        ? "characteristic_tail_route_local_polarity_metadata_accepted"
        : null,
      characteristicTailRouteLocalCoefficientAcceptancePass
        ? "characteristic_tail_route_local_coefficients_accepted"
        : null,
      normalizedActionKernelWakeCharge.acceptedActionKernelChargePass
        ? "normalized_action_kernel_wake_charge_accepted"
        : null,
      retainedActionKernelPullbackDomain.acceptedRetainedCrossingDomainPullbackPass
        ? "retained_crossing_domain_pullback_accepted"
        : null,
    ].filter(Boolean),
    missingFields: [
      normalizedActionKernelWakeCharge.acceptedActionKernelChargePass
        ? null
        : "normalized_action_kernel_wake_charge",
      characteristicTailSingleCoefficientSignPatternPass
        ? characteristicTailRouteLocalPolarityAcceptancePass
          ? null
          : characteristicTailRouteDerivedSourceReceiverPolarityMetadataPass
          ? "accepted_source_receiver_polarity_metadata"
          : characteristicTailSourceReceiverPolarityRowBindingPass
          ? "accepted_source_receiver_polarity_metadata"
          : "accepted_source_receiver_polarity_sign_rows"
        : characteristicTailCoefficientQuadraturePass
        ? "accepted_delta_eta_characteristic_tail_coefficients"
        : masterEquationCharacteristicTailPullbackCandidate.radialConstrainedSolvePass
        ? "delta_eta_characteristic_tail_coefficients"
        : masterEquationCharacteristicTailPullbackCandidate.pairRadialAlignmentPass
        ? "delta_eta_characteristic_tail_coefficients"
        : "pair_radial_characteristic_tail_alignment",
      retainedActionKernelPullbackDomain.acceptedRetainedCrossingDomainPullbackPass
        ? null
        : "retained_action_kernel_pullback_domain",
      "wake_energy_increment",
    ].filter(Boolean),
    requiredFields: wakeActionKernelBlocker.requiredFields,
    actionKernelBlocker: wakeActionKernelBlocker,
    retainedLimitation:
      "This row computes the boundary charge target and route-authorized characteristic-tail candidates required by the wake balance. It does not accept the layer-polarity assignment, accept route-derived source/receiver polarity metadata, certify the retained crossing-domain pullback, or assign wake energy on the same retained rows.",
  };
}

function createNormalizedActionKernelWakeChargeCandidate({
  wakeAngularMomentumWithoutBoundary,
  requiredActionKernelBoundaryCharge,
}) {
  const candidateResidualVector = addVectors(
    wakeAngularMomentumWithoutBoundary,
    requiredActionKernelBoundaryCharge
  );
  return {
    status:
      "unit_action_kernel_wake_charge_candidate_populated_not_kernel_evaluated",
    claimLevel:
      "unit-coefficient wake-charge candidate; not a normalized Master-Equation action-kernel integral",
    candidatePopulated: true,
    acceptedActionKernelChargePass: false,
    coefficientConvention:
      "The candidate sets the unit action-kernel wake charge equal to the boundary charge required to cancel the diagnostic wake torque residual. It is a target for the normalized action-kernel calculation, not an evaluated kernel pullback.",
    candidateCharge: requiredActionKernelBoundaryCharge,
    candidateChargeNorm: vectorNorm(requiredActionKernelBoundaryCharge),
    candidateResidualVector,
    candidateResidualNorm: vectorNorm(candidateResidualVector),
    retainedLimitation:
      "The normalized action-kernel charge remains missing until the kernel-gradient integral is evaluated on accepted chart-restricted crossing-domain rows for the same retained event.",
  };
}

function createAcceptedNormalizedActionKernelWakeCharge({
  normalizedActionKernelWakeChargeCandidate,
  chartRestrictedCrossingDomainRows,
  finiteEndpointClearKernelGradientIntegralEvaluation,
  masterEquationCharacteristicTailPullbackCandidate,
}) {
  const targetCharge =
    normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null;
  const candidateResidualNorm =
    normalizedActionKernelWakeChargeCandidate?.candidateResidualNorm ?? null;
  const candidateResidualPass =
    Number.isFinite(candidateResidualNorm) &&
    candidateResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const crossingDomainAccepted =
    chartRestrictedCrossingDomainRows?.acceptedCrossingDomainPass === true;
  const finiteEndpointClearEvaluationPass =
    finiteEndpointClearKernelGradientIntegralEvaluation?.candidateEvaluationPass ===
    true;
  const characteristicTailCoefficientAccepted =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.acceptedCoefficientQuadraturePass === true;
  const characteristicTailTargetResidualNorm =
    masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolve
      ?.targetResidualNorm ?? null;
  const characteristicTailTargetResidualPass =
    Number.isFinite(characteristicTailTargetResidualNorm) &&
    characteristicTailTargetResidualNorm <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const targetResidualNorm = maxFinite([
    candidateResidualNorm,
    finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
      null,
    characteristicTailTargetResidualNorm,
  ]);
  const acceptedActionKernelChargePass =
    isFiniteVector(targetCharge) &&
    candidateResidualPass &&
    crossingDomainAccepted &&
    finiteEndpointClearEvaluationPass &&
    characteristicTailCoefficientAccepted &&
    characteristicTailTargetResidualPass;

  return {
    schema:
      "aaa-tri-binary-normalized-action-kernel-wake-charge.v1",
    status: acceptedActionKernelChargePass
      ? "normalized_action_kernel_wake_charge_accepted_route_local"
      : "normalized_action_kernel_wake_charge_acceptance_blocked",
    claimLevel:
      "route-local normalized action-kernel wake charge for the route-authorized crossing-domain rows; not retained branch closure",
    acceptedActionKernelChargePass,
    targetCharge,
    targetChargeNorm: isFiniteVector(targetCharge)
      ? vectorNorm(targetCharge)
      : null,
    candidateResidualNorm,
    finiteEndpointClearEvaluationResidualNorm:
      finiteEndpointClearKernelGradientIntegralEvaluation?.targetResidualNorm ??
      null,
    characteristicTailTargetResidualNorm,
    targetResidualNorm,
    crossingDomainAccepted,
    finiteEndpointClearEvaluationPass,
    characteristicTailCoefficientAccepted,
    characteristicTailCoefficientStatus:
      masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
        ?.status ?? null,
    routeLocalCoefficientAcceptanceStatus:
      masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
        ?.routeLocalCoefficientAcceptanceTarget?.status ?? null,
    acceptanceScope:
      "accepted for the route-local characteristic-tail wake rows on the route-authorized retained event only",
    retainedLimitation:
      "This accepts the normalized boundary charge for the current route-local wake calculation. It does not assign wake energy, section stability, retained torque consistency, or a global retained branch.",
  };
}

function createAcceptedRetainedCrossingDomainPullback({
  retainedActionKernelPullbackDomainTarget,
  chartRestrictedCrossingDomainRows,
  normalizedActionKernelWakeCharge,
}) {
  const routeRows = retainedActionKernelPullbackDomainTarget?.routeRows ?? [];
  const acceptedRetainedCrossingDomainPullbackPass =
    retainedActionKernelPullbackDomainTarget?.targetPopulated === true &&
    chartRestrictedCrossingDomainRows?.acceptedCrossingDomainPass === true &&
    normalizedActionKernelWakeCharge?.acceptedActionKernelChargePass === true &&
    routeRows.length > 0;

  return {
    schema:
      "aaa-tri-binary-route-authorized-retained-crossing-domain-pullback.v1",
    status: acceptedRetainedCrossingDomainPullbackPass
      ? "route_authorized_retained_crossing_domain_pullback_accepted"
      : "route_authorized_retained_crossing_domain_pullback_acceptance_blocked",
    claimLevel:
      "accepted route-authorized retained crossing-domain pullback for the wake action-kernel charge; not a positive-width retained branch domain",
    acceptedRetainedCrossingDomainPullbackPass,
    routeRowCount: routeRows.length,
    routeRootKeys:
      retainedActionKernelPullbackDomainTarget?.routeRootKeys ?? [],
    sameRetainedActiveRowIds:
      retainedActionKernelPullbackDomainTarget?.sameRetainedActiveRowIds ?? [],
    sameRowSetStatus:
      retainedActionKernelPullbackDomainTarget?.sameRowSetStatus ?? null,
    crossingDomainStatus: chartRestrictedCrossingDomainRows?.status ?? null,
    crossingDomainAcceptedRowCount:
      chartRestrictedCrossingDomainRows?.acceptedRowCount ?? null,
    targetCharge: normalizedActionKernelWakeCharge?.targetCharge ?? null,
    targetResidualNorm:
      normalizedActionKernelWakeCharge?.targetResidualNorm ?? null,
    routeRows,
    acceptanceScope:
      "accepted for the route-authorized hinge event and its chart-restricted crossing-domain rows only",
    retainedLimitation:
      "This pullback acceptance does not create a positive-width common retained time domain and does not close wake energy, partition, section stability, retained phase, or retained torque.",
  };
}

function createWakeEnergyIncrementTarget({
  normalizedActionKernelWakeCharge,
  retainedActionKernelPullbackDomain,
  compensatedRoutePayloadCertificate,
  hingeRootBranchTransportRouteFeasibility = null,
  hingeEventRowSetIdentity = null,
  retainedTimeDomainCoverage = null,
  timeWindowTorqueProbe,
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  actionKernelNormalizationConventionCandidate,
  masterEquationCharacteristicTailPullbackCandidate,
  layerByName,
}) {
  const chargeAccepted =
    normalizedActionKernelWakeCharge?.acceptedActionKernelChargePass === true;
  const pullbackAccepted =
    retainedActionKernelPullbackDomain?.acceptedRetainedCrossingDomainPullbackPass ===
    true;
  const routeRows = retainedActionKernelPullbackDomain?.routeRows ?? [];
  const routePayloadRows = compensatedRoutePayloadCertificate?.rows ?? [];
  const rootEnergyDiagnosticRows = routePayloadRows
    .map((row) => row.rootEnergyIncrement)
    .filter((row) => row?.rootEnergyIncrementPass === true);
  const rootEnergyIncrements = rootEnergyDiagnosticRows
    .map((row) => row.unitActionRootEnergyIncrement)
    .filter((value) => Number.isFinite(value));
  const rootEnergyDiagnosticSum =
    rootEnergyIncrements.length > 0
      ? rootEnergyIncrements.reduce((sum, value) => sum + value, 0)
      : null;
  const targetChargeNorm = normalizedActionKernelWakeCharge?.targetChargeNorm ?? null;
  const omegaStar = cleanEnergyFrequencyTarget?.omegaStar ?? null;
  const omegaStarWeightedBoundaryCharge =
    Number.isFinite(omegaStar) && Number.isFinite(targetChargeNorm)
      ? omegaStar * targetChargeNorm
      : null;
  const targetPopulated =
    chargeAccepted &&
    pullbackAccepted &&
    routeRows.length > 0 &&
    Number.isFinite(targetChargeNorm);
  const actionBoundaryDerivativeTarget =
    createActionBoundaryWakeEnergyDerivativeTarget({
      targetPopulated,
      normalizedActionKernelWakeCharge,
      retainedActionKernelPullbackDomain,
      actionKernelNormalizationConventionCandidate,
      masterEquationCharacteristicTailPullbackCandidate,
      layerByName,
    });
  const actionBoundaryDerivativeEvaluated =
    actionBoundaryDerivativeTarget.normalizedHistoryIntegralPass === true;
  const actionBoundaryWakeEnergyLawCandidate =
    createActionBoundaryWakeEnergyLawCandidate({
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      cleanEnergyFrequencyTarget,
      minimalBranchTransactionFrequencyCertificate,
      masterEquationCharacteristicTailPullbackCandidate,
      omegaStarWeightedBoundaryCharge,
      omegaStar,
      targetChargeNorm,
      layerByName,
    });
  const sameEventEnergyRoutingTarget = createSameEventEnergyRoutingTarget({
    targetPopulated,
    normalizedActionKernelWakeCharge,
    retainedActionKernelPullbackDomain,
    compensatedRoutePayloadCertificate,
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    actionBoundaryDerivativeTarget,
    actionBoundaryWakeEnergyLawCandidate,
    omegaStarWeightedBoundaryCharge,
    rootEnergyDiagnosticSum,
    targetChargeNorm,
  });
  const omegaSameEventDependencyDiagnostic =
    createOmegaSameEventDependencyDiagnostic({
      minimalBranchTransactionFrequencyCertificate,
      actionBoundaryWakeEnergyLawCandidate,
      sameEventEnergyRoutingTarget,
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      retainedTimeDomainCoverage,
      layerByName,
    });

  return {
    schema: "aaa-tri-binary-route-authorized-wake-energy-increment-target.v1",
    status: !targetPopulated
      ? "wake_energy_increment_target_blocked_until_boundary_charge_pullback"
      : actionBoundaryDerivativeEvaluated
      ? "wake_energy_increment_target_action_boundary_derivative_evaluated_action_scale_missing"
      : "wake_energy_increment_target_populated_action_boundary_law_missing",
    claimLevel:
      "wake-energy increment target for the accepted route-authorized crossing-domain rows; not retained energy routing",
    targetPopulated,
    wakeEnergyIncrementPass: false,
    acceptedWakeEnergyIncrementPass: false,
    routeRootKeys: retainedActionKernelPullbackDomain?.routeRootKeys ?? [],
    routeRowCount: routeRows.length,
    sameRetainedActiveRowIds:
      retainedActionKernelPullbackDomain?.sameRetainedActiveRowIds ?? [],
    normalizedBoundaryChargeStatus:
      normalizedActionKernelWakeCharge?.status ?? null,
    normalizedBoundaryChargeNorm: targetChargeNorm,
    normalizedBoundaryChargeResidualNorm:
      normalizedActionKernelWakeCharge?.targetResidualNorm ?? null,
    retainedCrossingDomainPullbackStatus:
      retainedActionKernelPullbackDomain?.status ?? null,
    timeWindowTorqueProbeStatus: timeWindowTorqueProbe?.status ?? null,
    cleanEnergyFrequencyTargetStatus:
      cleanEnergyFrequencyTarget?.status ?? null,
    cleanEnergyFrequencyOmegaStar: omegaStar,
    minimalBranchTransactionFrequencyCertificateStatus:
      minimalBranchTransactionFrequencyCertificate?.status ?? null,
    minimalBranchTransactionFrequencyCandidateOmegaTx:
      minimalBranchTransactionFrequencyCertificate?.candidateOmegaTx ?? null,
    minimalBranchTransactionFrequencyReducedCertificatePass:
      minimalBranchTransactionFrequencyCertificate?.reducedCertificatePass ?? null,
    minimalBranchTransactionFrequencyAcceptedPass:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass ?? null,
    sameEventEnergyRoutingStatus: sameEventEnergyRoutingTarget.status,
    acceptedSameEventEnergyRoutingPass:
      sameEventEnergyRoutingTarget.acceptedSameEventEnergyRoutingPass,
    rootEnergyDiagnosticRowCount: rootEnergyDiagnosticRows.length,
    rootEnergyDiagnosticSum,
    maxRootEnergyDiagnosticIncrement: maxFinite(rootEnergyIncrements),
    actionBoundaryDerivativeTarget,
    actionBoundaryWakeEnergyLawCandidate,
    sameEventEnergyRoutingTarget,
    omegaSameEventDependencyDiagnostic,
    candidateRoutes: [
      {
        id: "action_boundary_derivative_kernel",
        status: actionBoundaryDerivativeTarget.status,
        route:
          "Evaluate the partial_t1 action-kernel energy derivative on the accepted route-authorized crossing-domain rows.",
        requiredInputs: [
          "accepted_normalized_action_kernel_wake_charge",
          "accepted_retained_crossing_domain_pullback",
          "time_translation_action_kernel",
          "finite_gaussian_endpoint_clearance_gauge_repair",
          "normalized_K_eff_history_integral",
          "sigma_hbar_action_scale",
        ],
        target: actionBoundaryDerivativeTarget,
      },
      {
        id: "action_boundary_derivative_unit_action_scale_candidate",
        status: actionBoundaryWakeEnergyLawCandidate.status,
        candidateWakeEnergyIncrement:
          actionBoundaryWakeEnergyLawCandidate.unitActionWakeEnergyIncrement,
        formula:
          "Delta E_wake^candidate = sigma*hbar_scale * (1/2 sum kappa_sigma_row partial_t1 K_eff,row)",
        target: actionBoundaryWakeEnergyLawCandidate,
      },
      {
        id: "action_boundary_action_scale_law_search",
        status:
          actionBoundaryWakeEnergyLawCandidate.actionScaleLawSearchTarget
            ?.status ?? "blocked_missing_action_boundary_wake_energy_candidate",
        requiredPositiveActionScale:
          actionBoundaryWakeEnergyLawCandidate
            .positiveActionScaleForOmegaStarMagnitude,
        bestRejectedCandidate:
          actionBoundaryWakeEnergyLawCandidate.actionScaleLawSearchTarget
            ?.bestRejectedCandidate ?? null,
        target:
          actionBoundaryWakeEnergyLawCandidate.actionScaleLawSearchTarget ?? null,
      },
      {
        id: "action_boundary_action_scale_derivation_target",
        status:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.status ?? "blocked_missing_action_boundary_wake_energy_candidate",
        requiredPositiveActionScale:
          actionBoundaryWakeEnergyLawCandidate
            .positiveActionScaleForOmegaStarMagnitude,
        acceptedActionScaleDerivationPass:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.acceptedActionScaleDerivationPass ?? false,
        acceptedRows:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.acceptedRows ?? [],
        bestRejectedCandidate:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.bestRejectedCandidate ?? null,
        target:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget ??
          null,
      },
      {
        id: "action_boundary_action_scale_independent_source_exclusion_summary",
        status:
          actionBoundaryWakeEnergyLawCandidate
            .actionScaleIndependentSourceExclusionSummaryStatus ??
          "blocked_missing_action_boundary_action_scale_derivation_target",
        requiredPositiveActionScale:
          actionBoundaryWakeEnergyLawCandidate
            .positiveActionScaleForOmegaStarMagnitude,
        currentSearchExhaustedPass:
          actionBoundaryWakeEnergyLawCandidate
            .currentActionScaleSearchExhaustedPass ?? false,
        nextClosureRoute:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.independentSourceExclusionSummary?.nextClosureRoute ?? null,
        target:
          actionBoundaryWakeEnergyLawCandidate.actionScaleDerivationTarget
            ?.independentSourceExclusionSummary ?? null,
      },
      {
        id: "energy_orientation_law_search",
        status:
          actionBoundaryWakeEnergyLawCandidate.energyOrientationLawTarget
            ?.status ?? "blocked_missing_action_boundary_wake_energy_candidate",
        requiredEnergyOrientation:
          actionBoundaryWakeEnergyLawCandidate.requiredEnergyOrientation,
        acceptedCandidate:
          actionBoundaryWakeEnergyLawCandidate.energyOrientationLawTarget
            ?.acceptedRows?.[0] ?? null,
        exactIneligibleRows:
          actionBoundaryWakeEnergyLawCandidate.energyOrientationLawTarget
            ?.exactIneligibleRows ?? [],
        target:
          actionBoundaryWakeEnergyLawCandidate.energyOrientationLawTarget ?? null,
      },
      {
        id: "omega_star_weighted_boundary_charge",
        status:
          omegaStarWeightedBoundaryCharge != null
            ? actionBoundaryWakeEnergyLawCandidate.omegaTxLawSearchTarget
                ?.acceptedOmegaTxLawPass === true
              ? "candidate_evaluated_blocked_missing_action_scale"
              : "candidate_evaluated_blocked_missing_transaction_frequency_and_action_scale"
            : "blocked_missing_clean_energy_frequency_or_boundary_charge",
        candidateWakeEnergyIncrement: omegaStarWeightedBoundaryCharge,
        formula:
          "Delta E_wake^candidate = omega_* |Delta J_wake| under unit action scale",
        omegaStar,
        boundaryChargeNorm: targetChargeNorm,
        limitation:
          "omega_* is the clean minimal-branch target, not an accepted transaction frequency omega_tx. The candidate also lacks a declared sigma*hbar action scale and does not consume the evaluated partial_t1 action-kernel derivative on the crossing-domain rows.",
      },
      {
        id: "omega_tx_law_search",
        status:
          actionBoundaryWakeEnergyLawCandidate.omegaTxLawSearchTarget?.status ??
          "blocked_missing_clean_energy_frequency_target",
        targetOmegaTx: omegaStar,
        bestRejectedCandidate:
          actionBoundaryWakeEnergyLawCandidate.omegaTxLawSearchTarget
            ?.bestRejectedCandidate ?? null,
        exactIneligibleRows:
          actionBoundaryWakeEnergyLawCandidate.omegaTxLawSearchTarget
            ?.exactIneligibleRows ?? [],
        target:
          actionBoundaryWakeEnergyLawCandidate.omegaTxLawSearchTarget ?? null,
      },
      {
        id: "minimal_branch_transaction_frequency_certificate",
        status:
          minimalBranchTransactionFrequencyCertificate?.status ??
          "blocked_missing_minimal_branch_frequency_certificate",
        candidateOmegaTx:
          minimalBranchTransactionFrequencyCertificate?.candidateOmegaTx ?? null,
        targetOmegaTx:
          minimalBranchTransactionFrequencyCertificate?.targetOmegaTx ?? null,
        residual:
          minimalBranchTransactionFrequencyCertificate?.residual ?? null,
        acceptedTransactionFrequencyPass:
          minimalBranchTransactionFrequencyCertificate
            ?.acceptedTransactionFrequencyPass ?? false,
        acceptanceBlockers:
          minimalBranchTransactionFrequencyCertificate?.acceptanceBlockers ?? [],
        target: minimalBranchTransactionFrequencyCertificate ?? null,
      },
      {
        id: "same_event_energy_routing_target",
        status: sameEventEnergyRoutingTarget.status,
        acceptedSameEventEnergyRoutingPass:
          sameEventEnergyRoutingTarget.acceptedSameEventEnergyRoutingPass,
        exactFormalCandidateRows:
          sameEventEnergyRoutingTarget.exactFormalCandidateRows,
        acceptanceBlockers: sameEventEnergyRoutingTarget.acceptanceBlockers,
        target: sameEventEnergyRoutingTarget,
      },
      {
        id: "zero_wake_energy",
        status:
          Number.isFinite(targetChargeNorm) &&
          targetChargeNorm > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
            ? "rejected_nonzero_boundary_charge"
            : "blocked_no_equivalence_to_energy_functional",
        candidateWakeEnergyIncrement: 0,
      },
      {
        id: "reuse_root_energy_diagnostic",
        status: "rejected_root_energy_diagnostic_not_retained_wake_energy_route",
        candidateWakeEnergyIncrement: rootEnergyDiagnosticSum,
        limitation:
          "Root-energy rows are unit-action phase diagnostics and explicitly do not assign wake energy or retained energy routing.",
      },
      {
        id: "charge_norm_as_energy",
        status:
          "rejected_no_transaction_frequency_or_accepted_action_boundary_energy_law",
        candidateWakeEnergyIncrement: targetChargeNorm,
        limitation:
          "The angular-momentum boundary-charge norm is not an energy increment without a declared transaction frequency or an accepted action-boundary derivative law with action scale.",
      },
    ],
    requiredConstruction:
      "Choose one accepted wake-energy route: action-boundary derivative kernel, equivalent work-integral reconstruction, or explicitly retained near-field/boundary-flux route, all on the same accepted crossing-domain rows.",
    retainedLimitation:
      "This target sharpens the wake-energy blocker only. It does not close retained energy routing, partition, section stability, retained phase, or retained torque.",
  };
}

function createSameEventEnergyRoutingTarget({
  targetPopulated,
  normalizedActionKernelWakeCharge,
  retainedActionKernelPullbackDomain,
  compensatedRoutePayloadCertificate,
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  actionBoundaryDerivativeTarget,
  actionBoundaryWakeEnergyLawCandidate,
  omegaStarWeightedBoundaryCharge,
  rootEnergyDiagnosticSum,
  targetChargeNorm,
}) {
  const routeRows = retainedActionKernelPullbackDomain?.routeRows ?? [];
  const routeRootKeys = retainedActionKernelPullbackDomain?.routeRootKeys ?? [];
  const sameRetainedActiveRowIds =
    retainedActionKernelPullbackDomain?.sameRetainedActiveRowIds ?? [];
  const sameEventRowsPass =
    targetPopulated &&
    routeRows.length > 0 &&
    routeRootKeys.length > 0 &&
    sameRetainedActiveRowIds.length > 0;
  const acceptedOmegaTxSource =
    actionBoundaryWakeEnergyLawCandidate?.omegaTxLawSearchTarget
      ?.acceptedOmegaTxLawPass === true;
  const acceptedActionScale =
    actionBoundaryWakeEnergyLawCandidate?.acceptedActionScalePass === true ||
    actionBoundaryWakeEnergyLawCandidate?.actionScaleDerivationTarget
      ?.acceptedActionScaleDerivationPass === true ||
    actionBoundaryWakeEnergyLawCandidate?.actionScaleLawSearchTarget
      ?.acceptedActionScaleLawPass === true;
  const acceptedEnergyOrientation =
    actionBoundaryWakeEnergyLawCandidate?.acceptedEnergyOrientationPass === true;
  const acceptedWakeEnergyIncrementLaw =
    actionBoundaryWakeEnergyLawCandidate?.acceptedWakeEnergyIncrementPass === true;
  const acceptanceBlockers = [
    targetPopulated ? null : "accepted_boundary_charge_pullback",
    sameEventRowsPass ? null : "same_retained_route_rows",
    acceptedOmegaTxSource ? null : "accepted_omega_tx_source",
    acceptedActionScale ? null : "derived_sigma_hbar_action_scale",
    acceptedEnergyOrientation ? null : "accepted_energy_orientation",
    acceptedWakeEnergyIncrementLaw ? null : "accepted_wake_energy_increment_law",
  ].filter(Boolean);
  const candidateRows = createSameEventEnergyRoutingCandidateRows({
    targetPopulated,
    sameEventRowsPass,
    acceptedOmegaTxSource,
    acceptedActionScale,
    acceptedEnergyOrientation,
    acceptedWakeEnergyIncrementLaw,
    minimalBranchTransactionFrequencyCertificate,
    actionBoundaryDerivativeTarget,
    actionBoundaryWakeEnergyLawCandidate,
    omegaStarWeightedBoundaryCharge,
    rootEnergyDiagnosticSum,
    targetChargeNorm,
  }).map((row) => {
    const residual =
      Number.isFinite(row.candidateWakeEnergyIncrement) &&
      Number.isFinite(omegaStarWeightedBoundaryCharge)
        ? row.candidateWakeEnergyIncrement - omegaStarWeightedBoundaryCharge
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    const exactBoundaryChargeEnergyPass =
      Number.isFinite(residualAbs) &&
      residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
    return {
      ...row,
      targetWakeEnergyIncrement: omegaStarWeightedBoundaryCharge,
      residual,
      residualAbs,
      exactBoundaryChargeEnergyPass,
      acceptedSameEventEnergyRoutePass:
        row.acceptanceEligible === true && exactBoundaryChargeEnergyPass,
    };
  });
  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateWakeEnergyIncrement)
  );
  const acceptedRows = finiteRows.filter(
    (row) => row.acceptedSameEventEnergyRoutePass
  );
  const exactFormalCandidateRows = finiteRows.filter(
    (row) =>
      row.exactBoundaryChargeEnergyPass &&
      row.acceptedSameEventEnergyRoutePass !== true
  );
  const rejectedRows = finiteRows.filter(
    (row) => row.exactBoundaryChargeEnergyPass !== true
  );
  const bestRejectedCandidate =
    rejectedRows.length > 0
      ? rejectedRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;

  return {
    schema: "aaa-tri-binary-same-event-energy-routing-target.v1",
    status: !targetPopulated
      ? "same_event_energy_routing_target_blocked_until_boundary_charge_pullback"
      : acceptedRows.length > 0
        ? "same_event_energy_routing_target_accepted"
        : exactFormalCandidateRows.some(
            (row) =>
              row.id === "minimal_branch_frequency_boundary_charge_candidate"
          )
          ? "same_event_energy_routing_target_minimal_branch_boundary_candidate_formal_acceptance_blocked"
          : exactFormalCandidateRows.length > 0
            ? "same_event_energy_routing_target_exact_candidate_formal_acceptance_blocked"
            : finiteRows.length > 0
              ? "same_event_energy_routing_target_candidates_populated_no_exact_accepted_route"
              : "same_event_energy_routing_target_no_finite_candidates",
    claimLevel:
      "same-event wake-energy routing target for the route-authorized retained rows; not accepted retained energy routing",
    targetPopulated,
    sameEventRowsPass,
    acceptedSameEventEnergyRoutingPass: acceptedRows.length > 0,
    normalizedBoundaryChargeStatus:
      normalizedActionKernelWakeCharge?.status ?? null,
    retainedCrossingDomainPullbackStatus:
      retainedActionKernelPullbackDomain?.status ?? null,
    compensatedRoutePayloadStatus:
      compensatedRoutePayloadCertificate?.status ?? null,
    compensatedRoutePayloadComplete:
      compensatedRoutePayloadCertificate?.complete === true,
    compensatedRoutePayloadPopulatedFields:
      compensatedRoutePayloadCertificate?.populatedPayloadFields ?? [],
    compensatedRoutePayloadMissingFields:
      compensatedRoutePayloadCertificate?.missingPayloadFields ?? [],
    compensatedRoutePayloadRowCount:
      compensatedRoutePayloadCertificate?.routeRowCount ?? null,
    routeRootKeys,
    sameRetainedActiveRowIds,
    routeRowCount: routeRows.length,
    cleanEnergyFrequencyOmegaStar: cleanEnergyFrequencyTarget?.omegaStar ?? null,
    targetWakeEnergyIncrement: omegaStarWeightedBoundaryCharge,
    targetChargeNorm,
    minimalBranchTransactionFrequencyCertificateStatus:
      minimalBranchTransactionFrequencyCertificate?.status ?? null,
    minimalBranchTransactionFrequencyAcceptedPass:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass ?? null,
    actionBoundaryWakeEnergyLawStatus:
      actionBoundaryWakeEnergyLawCandidate?.status ?? null,
    actionBoundaryDerivativeStatus: actionBoundaryDerivativeTarget?.status ?? null,
    acceptedOmegaTxSource,
    acceptedActionScale,
    acceptedEnergyOrientation,
    acceptedWakeEnergyIncrementLaw,
    acceptanceBlockers,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    exactFormalCandidateCount: exactFormalCandidateRows.length,
    acceptedCandidateCount: acceptedRows.length,
    bestRejectedCandidate,
    exactFormalCandidateRows,
    acceptedRows,
    rows: candidateRows,
    retainedLimitation:
      "This target separates same-event carrier population from acceptance. Exact boundary-charge energy candidates remain formal only until omega_tx, sigma*hbar action scale, and the wake-energy law are accepted on the same retained rows.",
  };
}

function createOmegaSameEventDependencyDiagnostic({
  minimalBranchTransactionFrequencyCertificate,
  actionBoundaryWakeEnergyLawCandidate,
  sameEventEnergyRoutingTarget,
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity = null,
  retainedTimeDomainCoverage = null,
  layerByName = new Map(),
}) {
  const omegaAcceptanceBlockers =
    minimalBranchTransactionFrequencyCertificate?.acceptanceBlockers ?? [];
  const exactSameEventCarrierRows =
    sameEventEnergyRoutingTarget?.exactFormalCandidateRows ?? [];
  const minimalBranchBoundaryCarrierRow =
    exactSameEventCarrierRows.find(
      (row) => row.id === "minimal_branch_frequency_boundary_charge_candidate"
    ) ?? null;
  const actionBoundaryDerivativeCarrierRow =
    exactSameEventCarrierRows.find(
      (row) => row.id === "action_boundary_derivative_scaled_candidate"
    ) ?? null;
  const sameEventCarrierPopulationPass =
    sameEventEnergyRoutingTarget?.sameEventRowsPass === true &&
    exactSameEventCarrierRows.length > 0;
  const omegaBlockersAfterCarrierPopulation = omegaAcceptanceBlockers
    .map((blocker) =>
      blocker === "same_event_energy_carrier_population" &&
      sameEventCarrierPopulationPass
        ? null
        : blocker
    )
    .filter(Boolean);
  const acceptedOmegaTxSource =
    actionBoundaryWakeEnergyLawCandidate?.omegaTxLawSearchTarget
      ?.acceptedOmegaTxLawPass === true;
  const acceptedActionScale =
    actionBoundaryWakeEnergyLawCandidate?.acceptedActionScalePass === true;
  const acceptedEnergyOrientation =
    actionBoundaryWakeEnergyLawCandidate?.acceptedEnergyOrientationPass === true;
  const acceptedWakeEnergyIncrementLaw =
    actionBoundaryWakeEnergyLawCandidate?.acceptedWakeEnergyIncrementPass === true;
  const acceptedSameEventEnergyRouting =
    sameEventEnergyRoutingTarget?.acceptedSameEventEnergyRoutingPass === true;
  const sameEventRouteBlockers =
    sameEventEnergyRoutingTarget?.acceptanceBlockers ?? [];
  const legacyAcceptedRouteCircularBlockerPresent =
    omegaAcceptanceBlockers.includes("accepted_same_event_energy_route");
  const carrierPopulationOnlyBlockerPresent = omegaAcceptanceBlockers.includes(
    "same_event_energy_carrier_population"
  );
  const retainedEventGeometryBlockerDiagnostic =
    createOmegaRetainedEventGeometryBlockerDiagnostic({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      retainedTimeDomainCoverage,
      omegaBlockersAfterCarrierPopulation,
      minimalBranchTransactionFrequencyCertificate,
      actionBoundaryWakeEnergyLawCandidate,
      sameEventEnergyRoutingTarget,
      layerByName,
    });

  return {
    schema: "aaa-tri-binary-omega-same-event-dependency-diagnostic.v1",
    status: !minimalBranchTransactionFrequencyCertificate
      ? "omega_same_event_dependency_diagnostic_missing_frequency_certificate"
      : minimalBranchTransactionFrequencyCertificate.reducedCertificatePass !==
          true
        ? "omega_same_event_dependency_reduced_certificate_incomplete"
        : !sameEventEnergyRoutingTarget
          ? "omega_same_event_dependency_blocked_until_same_event_target"
          : !sameEventCarrierPopulationPass
            ? "omega_same_event_dependency_blocked_until_same_event_carrier_population"
            : omegaBlockersAfterCarrierPopulation.length > 0
              ? "omega_same_event_dependency_carrier_populated_retained_event_blockers_remain"
              : acceptedOmegaTxSource &&
                  acceptedActionScale &&
                  acceptedWakeEnergyIncrementLaw
                ? "omega_same_event_dependency_closed"
                : "omega_same_event_dependency_carrier_populated_action_scale_or_wake_law_blocked",
    claimLevel:
      "dependency diagnostic separating same-event carrier population from accepted same-event energy routing; not an accepted omega_tx or wake-energy law",
    reducedCertificatePass:
      minimalBranchTransactionFrequencyCertificate?.reducedCertificatePass ??
      null,
    frequencyIdentityPass:
      minimalBranchTransactionFrequencyCertificate?.frequencyIdentityPass ??
      null,
    candidateOmegaTx:
      minimalBranchTransactionFrequencyCertificate?.candidateOmegaTx ?? null,
    minimalBranchBoundaryCarrierExactPass:
      minimalBranchBoundaryCarrierRow?.exactBoundaryChargeEnergyPass ?? false,
    actionBoundaryDerivativeCarrierExactPass:
      actionBoundaryDerivativeCarrierRow?.exactBoundaryChargeEnergyPass ?? false,
    sameEventRowsPass: sameEventEnergyRoutingTarget?.sameEventRowsPass ?? null,
    exactSameEventCarrierCount: exactSameEventCarrierRows.length,
    sameEventCarrierPopulationPass,
    acceptedOmegaTxSource,
    acceptedActionScale,
    acceptedEnergyOrientation,
    acceptedWakeEnergyIncrementLaw,
    acceptedSameEventEnergyRouting,
    omegaAcceptanceBlockers,
    omegaBlockersAfterCarrierPopulation,
    sameEventRouteBlockers,
    retainedEventGeometryBlockerStatus:
      retainedEventGeometryBlockerDiagnostic.status,
    retainedEventGeometryBlockerDiagnostic,
    legacyAcceptedRouteCircularBlockerPresent,
    carrierPopulationOnlyBlockerPresent,
    minimalBranchBoundaryCarrierRow,
    actionBoundaryDerivativeCarrierRow,
    retainedLimitation:
      "The exact same-event carrier rows can discharge only the carrier-population dependency for omega_tx. They do not accept the transaction frequency, sigma*hbar action scale, or wake-energy increment law; retained-event geometry and domain blockers remain separate.",
  };
}

function createOmegaRetainedEventGeometryBlockerDiagnostic({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity = null,
  retainedTimeDomainCoverage = null,
  omegaBlockersAfterCarrierPopulation,
  minimalBranchTransactionFrequencyCertificate = null,
  actionBoundaryWakeEnergyLawCandidate = null,
  sameEventEnergyRoutingTarget = null,
  layerByName = new Map(),
}) {
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const zeroSlackRows = routeRows.filter((row) => row.zeroSlackRoutePass === true);
  const compensationRows = routeRows.filter(
    (row) => row.compensationRequired === true
  );
  const blockingRows = routeRows.filter((row) => row.candidateRoutePass !== true);
  const sameSourceEmissionClockTransportDiagnostic =
    createSameSourceEmissionClockTransportDiagnostic({
      routeRows,
      layerByName,
    });
  const retainedEventBlockers = omegaBlockersAfterCarrierPopulation.filter((blocker) =>
    [
      "geometrically_continuous_branch_transport_pair_map",
      "accepted_retained_branch_claim",
      "accepted_retained_point_event_rule_or_positive_width_common_retained_time_domain",
    ].includes(blocker)
  );
  const routeAuthorizedEndpointProviderGlobalDomainObstructionTarget =
    createRouteAuthorizedEndpointProviderGlobalDomainObstructionTarget({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      retainedTimeDomainCoverage,
      sameSourceEmissionClockTransportDiagnostic,
      retainedEventBlockers,
      minimalBranchTransactionFrequencyCertificate,
      actionBoundaryWakeEnergyLawCandidate,
      sameEventEnergyRoutingTarget,
    });
  const rowSummaries = routeRows.map((row) => ({
    incomingPairKey: row.incomingPairKey ?? null,
    outgoingPairKey: row.outgoingPairKey ?? null,
    continuityRole: row.continuityRole ?? null,
    status: row.status ?? null,
    candidateRoutePass: row.candidateRoutePass === true,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    routeRootKey: row.routeRootKey ?? null,
    minOneSidedRouteWidth: finiteOrNull(row.minOneSidedRouteWidth),
    endpointPairResidual: finiteOrNull(row.endpointPairResidual),
    endpointToChartResidual: finiteOrNull(row.endpointToChartResidual),
    requiredEndpointCompensationNorm: finiteOrNull(
      row.requiredEndpointCompensationNorm
    ),
      requiredClockRetune: finiteOrNull(row.requiredClockRetune),
      requiredPhaseCompensation: finiteOrNull(row.requiredPhaseCompensation),
  }));

  return {
    schema: "aaa-tri-binary-omega-retained-event-geometry-blocker.v1",
    status: !hingeRootBranchTransportRouteFeasibility
      ? "omega_retained_event_geometry_blocker_missing_route_feasibility"
      : retainedEventBlockers.length === 0
        ? "omega_retained_event_geometry_blocker_cleared"
        : hingeRootBranchTransportRouteFeasibility.zeroSlackRoutePass === true
          ? "omega_retained_event_geometry_zero_slack_route_candidate_retained_domain_blocked"
          : hingeRootBranchTransportRouteFeasibility.candidateRoutePass === true
            ? "omega_retained_event_geometry_same_source_compensation_required"
            : "omega_retained_event_geometry_route_candidate_blocked",
    claimLevel:
      "row-level diagnostic for retained-event geometry/domain blockers after same-event carrier population; not retained branch acceptance",
    routeFeasibilityStatus:
      hingeRootBranchTransportRouteFeasibility?.status ?? null,
    retainedEventBlockers,
    evaluatedRouteCount:
      hingeRootBranchTransportRouteFeasibility?.evaluatedRouteCount ?? null,
    candidateRouteCount:
      hingeRootBranchTransportRouteFeasibility?.candidateRouteCount ?? null,
    zeroSlackRouteCount:
      hingeRootBranchTransportRouteFeasibility?.zeroSlackRouteCount ?? null,
    compensationRequiredMatchCount:
      hingeRootBranchTransportRouteFeasibility?.compensationRequiredMatchCount ??
      null,
    blockingMatchCount:
      hingeRootBranchTransportRouteFeasibility?.blockingMatchCount ?? null,
    maxRequiredEndpointCompensationNorm:
      hingeRootBranchTransportRouteFeasibility?.maxRequiredEndpointCompensationNorm ??
      null,
    maxRequiredPhaseCompensation:
      hingeRootBranchTransportRouteFeasibility?.maxRequiredPhaseCompensation ??
      null,
    sameSourceEmissionClockTransportStatus:
      sameSourceEmissionClockTransportDiagnostic.status,
    sameSourceEmissionClockTransportDiagnostic,
    routeAuthorizedEndpointProviderGlobalDomainObstructionStatus:
      routeAuthorizedEndpointProviderGlobalDomainObstructionTarget.status,
    routeAuthorizedEndpointProviderGlobalDomainObstructionTarget,
    zeroSlackRows,
    compensationRows,
    blockingRows,
    rowSummaries,
    retainedLimitation:
      "This diagnostic maps the remaining omega_tx retained-event blockers to route rows. It does not accept the retained branch, create a positive-width common retained time domain, or assign compensation as physical transport.",
  };
}

function createRouteAuthorizedEndpointProviderGlobalDomainObstructionTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  retainedTimeDomainCoverage,
  sameSourceEmissionClockTransportDiagnostic,
  retainedEventBlockers,
  minimalBranchTransactionFrequencyCertificate = null,
  actionBoundaryWakeEnergyLawCandidate = null,
  sameEventEnergyRoutingTarget = null,
}) {
  const acceptedEndpointProviderRows =
    sameSourceEmissionClockTransportDiagnostic?.rows?.filter(
      (row) =>
        row.retainedEndpointProviderAcceptanceTarget
          ?.acceptedRetainedEndpointProviderPass === true
    ) ?? [];
  const firstAcceptedEndpointProviderRow =
    acceptedEndpointProviderRows[0] ?? null;
  const firstAcceptedEndpointProviderTarget =
    firstAcceptedEndpointProviderRow?.retainedEndpointProviderAcceptanceTarget ??
    null;
  const routeAuthorizedPointEventDomainTarget =
    firstAcceptedEndpointProviderTarget?.routeAuthorizedPointEventDomainTarget ??
    null;
  const rootPayloadIntervalEnclosure =
    hingeEventRowSetIdentity?.rootPayloadIntervalEnclosure ?? null;
  const positiveWidthCommonRetainedTimeDomainPass =
    (retainedTimeDomainCoverage?.maxCommonWidth ?? 0) > ROOT_TOLERANCE ||
    rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval === true ||
    rootPayloadIntervalEnclosure?.oneSidedPositiveWidthCommonInterval === true;
  const eventRootKeyCandidatePass =
    hingeEventRowSetIdentity?.status ===
    "hinge_event_common_root_key_candidate_populated";
  const branchRouteCandidatePass =
    hingeRootBranchTransportRouteFeasibility?.candidateRoutePass === true;
  const zeroSlackBranchRoutePass =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const localEndpointProviderAcceptedPass =
    acceptedEndpointProviderRows.length > 0 &&
    routeAuthorizedPointEventDomainTarget
      ?.acceptedRouteAuthorizedPointEventDomainPass === true;
  const positiveWidthRetainedDomainLiftTarget =
    createPositiveWidthRetainedDomainLiftTarget({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      retainedTimeDomainCoverage,
      routeAuthorizedPointEventDomainTarget,
      rootPayloadIntervalEnclosure,
      localEndpointProviderAcceptedPass,
    });
  const endpointProviderAssistedBranchTransportGeometryTarget =
    createEndpointProviderAssistedBranchTransportGeometryTarget({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      acceptedEndpointProviderRows,
      localEndpointProviderAcceptedPass,
    });
  const fullPointEventRuleLiftTarget = createFullPointEventRuleLiftTarget({
    hingeRootBranchTransportRouteFeasibility,
    hingeEventRowSetIdentity,
    retainedTimeDomainCoverage,
    routeAuthorizedPointEventDomainTarget,
    rootPayloadIntervalEnclosure,
    positiveWidthRetainedDomainLiftTarget,
    endpointProviderAssistedBranchTransportGeometryTarget,
    minimalBranchTransactionFrequencyCertificate,
    actionBoundaryWakeEnergyLawCandidate,
    sameEventEnergyRoutingTarget,
    localEndpointProviderAcceptedPass,
  });
  const endpointProviderGlobalRetainedTransportLiftTarget =
    createEndpointProviderGlobalRetainedTransportLiftTarget({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      routeAuthorizedPointEventDomainTarget,
      positiveWidthRetainedDomainLiftTarget,
      endpointProviderAssistedBranchTransportGeometryTarget,
      fullPointEventRuleLiftTarget,
      localEndpointProviderAcceptedPass,
      positiveWidthCommonRetainedTimeDomainPass,
    });
  const globalRetainedBranchClaimPass = false;
  const fullPointEventRulePass =
    fullPointEventRuleLiftTarget.fullPointEventRuleLiftPass === true &&
    globalRetainedBranchClaimPass;
  const obstructionReasons = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    eventRootKeyCandidatePass ? null : "hinge_event_common_root_key_missing",
    fullPointEventRuleLiftTarget.fullPointEventRuleLiftPass
      ? null
      : "accepted_full_point_event_rule_missing",
    positiveWidthCommonRetainedTimeDomainPass
      ? null
      : "positive_width_common_retained_time_domain_missing",
    zeroSlackBranchRoutePass
      ? null
      : "geometrically_continuous_zero_slack_branch_transport_missing",
    globalRetainedBranchClaimPass ? null : "global_retained_branch_claim_missing",
    "wake_partition_torque_phase_route_stability_or_energy_payloads_not_globally_certified",
  ].filter(Boolean);
  const routeRows =
    hingeRootBranchTransportRouteFeasibility?.rows?.map((row) => ({
      incomingPairKey: row.incomingPairKey ?? null,
      outgoingPairKey: row.outgoingPairKey ?? null,
      continuityRole: row.continuityRole ?? null,
      candidateRoutePass: row.candidateRoutePass === true,
      zeroSlackRoutePass: row.zeroSlackRoutePass === true,
      compensationRequired: row.compensationRequired === true,
      routeRootKey: row.routeRootKey ?? null,
      minOneSidedRouteWidth: finiteOrNull(row.minOneSidedRouteWidth),
      endpointPairResidual: finiteOrNull(row.endpointPairResidual),
      endpointToChartResidual: finiteOrNull(row.endpointToChartResidual),
      requiredEndpointCompensationNorm: finiteOrNull(
        row.requiredEndpointCompensationNorm
      ),
      requiredClockRetune: finiteOrNull(row.requiredClockRetune),
      requiredPhaseCompensation: finiteOrNull(row.requiredPhaseCompensation),
    })) ?? [];

  return {
    schema:
      "aaa-tri-binary-route-authorized-endpoint-provider-global-domain-obstruction.v1",
    status: !localEndpointProviderAcceptedPass
      ? "route_authorized_endpoint_provider_global_domain_obstruction_not_applicable"
      : fullPointEventRulePass
        ? "route_authorized_endpoint_provider_global_domain_lift_candidate_formal_acceptance_blocked"
        : !positiveWidthCommonRetainedTimeDomainPass &&
              !zeroSlackBranchRoutePass
          ? "route_authorized_endpoint_provider_global_domain_blocked_point_only_common_root_and_compensation"
          : !positiveWidthCommonRetainedTimeDomainPass
            ? "route_authorized_endpoint_provider_global_domain_blocked_point_only_common_root"
            : !zeroSlackBranchRoutePass
              ? "route_authorized_endpoint_provider_global_domain_blocked_branch_transport_compensation"
              : "route_authorized_endpoint_provider_global_domain_blocked_retained_branch_claim",
    claimLevel:
      "fail-closed diagnostic comparing the accepted local endpoint-provider point-event domain with the global retained branch and full point-event domain requirements",
    localEndpointProviderAcceptedPass,
    globalRetainedBranchClaimPass,
    fullPointEventRulePass,
    retainedBranchClaim: false,
    acceptedEndpointProviderRowCount: acceptedEndpointProviderRows.length,
    endpointProviderAggregateStatus:
      sameSourceEmissionClockTransportDiagnostic
        ?.retainedEndpointProviderAcceptanceStatus ?? null,
    endpointProviderTargetStatus:
      firstAcceptedEndpointProviderTarget?.status ?? null,
    routeAuthorizedPointEventDomainStatus:
      routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainScope:
      routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
    endpointProviderAssistedBranchTransportGeometryStatus:
      endpointProviderAssistedBranchTransportGeometryTarget.status,
    endpointProviderAssistedBranchTransportGeometryTarget,
    endpointProviderGlobalRetainedTransportLiftStatus:
      endpointProviderGlobalRetainedTransportLiftTarget.status,
    endpointProviderGlobalRetainedTransportLiftTarget,
    fullPointEventRuleLiftStatus: fullPointEventRuleLiftTarget.status,
    fullPointEventRuleLiftTarget,
    positiveWidthRetainedDomainLiftStatus:
      positiveWidthRetainedDomainLiftTarget.status,
    positiveWidthRetainedDomainLiftTarget,
    routeRootKey:
      routeAuthorizedPointEventDomainTarget?.routeRootKey ??
      firstAcceptedEndpointProviderTarget?.routeRootKey ??
      null,
    eventRootKeyCandidatePass,
    eventRowSetIdentityStatus: hingeEventRowSetIdentity?.status ?? null,
    globalRetainedRowSetIdentityStatus:
      hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ?? null,
    eventPairCount: hingeEventRowSetIdentity?.pairCount ?? null,
    eventPairCountWithCommonRootKey:
      hingeEventRowSetIdentity?.pairCountWithCommonRootKey ?? null,
    eventCommonRootKeyCount:
      hingeEventRowSetIdentity?.commonRootKeyCount ?? null,
    rootPayloadIntervalStatus:
      rootPayloadIntervalEnclosure?.status ?? null,
    positiveWidthCommonRetainedTimeDomainPass,
    positiveWidthCommonRootInterval:
      rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval ?? null,
    oneSidedPositiveWidthCommonInterval:
      rootPayloadIntervalEnclosure?.oneSidedPositiveWidthCommonInterval ??
      null,
    maxCommonRootIntervalWidth:
      rootPayloadIntervalEnclosure?.maxCommonWidth ?? null,
    leftCommonSideIntervalMaxWidth:
      rootPayloadIntervalEnclosure?.sideCoverage?.left?.maxCommonWidth ?? null,
    rightCommonSideIntervalMaxWidth:
      rootPayloadIntervalEnclosure?.sideCoverage?.right?.maxCommonWidth ??
      null,
    retainedTimeDomainCoverageStatus:
      retainedTimeDomainCoverage?.status ?? null,
    retainedTimeDomainMaxCommonWidth:
      retainedTimeDomainCoverage?.maxCommonWidth ?? null,
    branchRouteFeasibilityStatus:
      hingeRootBranchTransportRouteFeasibility?.status ?? null,
    branchRouteCandidatePass,
    zeroSlackBranchRoutePass,
    evaluatedRouteCount:
      hingeRootBranchTransportRouteFeasibility?.evaluatedRouteCount ?? null,
    zeroSlackRouteCount:
      hingeRootBranchTransportRouteFeasibility?.zeroSlackRouteCount ?? null,
    compensationRequiredMatchCount:
      hingeRootBranchTransportRouteFeasibility
        ?.compensationRequiredMatchCount ?? null,
    retainedEventBlockers,
    obstructionReasons,
    routeRows,
    retainedLimitation:
      "The accepted local endpoint-provider point-event domain uses one same-source middle route and positive one-sided route intervals. It cannot be promoted to a global retained branch, full point-event rule, or positive-width common retained time domain while the all-pair common root interval is point-only, no common one-sided all-pair interval exists, one middle route still requires compensation, and wake, partition, torque, phase, route, stability, omega_tx, action-scale, and wake-energy rows are not globally certified.",
  };
}

function createEndpointProviderGlobalRetainedTransportLiftTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  routeAuthorizedPointEventDomainTarget,
  positiveWidthRetainedDomainLiftTarget,
  endpointProviderAssistedBranchTransportGeometryTarget,
  fullPointEventRuleLiftTarget,
  localEndpointProviderAcceptedPass,
  positiveWidthCommonRetainedTimeDomainPass,
}) {
  const routeRows = endpointProviderAssistedBranchTransportGeometryTarget?.rows ?? [];
  const providerAssistedRows = routeRows.filter(
    (row) => row.providerAssistedGeometryPass === true
  );
  const sampledZeroSlackRows = routeRows.filter(
    (row) => row.sampledZeroSlackRoutePass === true
  );
  const substitutedRows = routeRows.filter(
    (row) =>
      row.providerAssistedGeometryPass === true &&
      row.sampledZeroSlackRoutePass !== true
  );
  const providerAssistedOrZeroSlackRows = routeRows.filter(
    (row) => row.providerAssistedOrZeroSlackGeometryPass === true
  );
  const routeSubstitutionCoveragePass =
    routeRows.length > 0 &&
    providerAssistedOrZeroSlackRows.length === routeRows.length;
  const sampledZeroSlackBranchRoutePass =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const globalRetainedRowSetIdentityPass =
    hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ===
    "common_active_row_set_candidate_populated";
  const fullPointEventRuleLiftPass =
    fullPointEventRuleLiftTarget?.fullPointEventRuleLiftPass === true;
  const positiveWidthRetainedDomainLiftPass =
    positiveWidthRetainedDomainLiftTarget?.liftPass === true;
  const retainedPayloadRowsPass =
    fullPointEventRuleLiftTarget?.retainedPayloadRowsPass === true;
  const acceptedRetainedEnergyRoutingPass =
    fullPointEventRuleLiftTarget?.acceptedRetainedEnergyRoutingPass === true;
  const acceptedFullPointEventRulePass =
    fullPointEventRuleLiftTarget?.acceptedFullPointEventRulePass === true;
  const routeAuthorizedPointEventOnly =
    [
      "same_source_endpoint_provider_route_only",
      "route_authorized_endpoint_provider_point_event_only",
    ].includes(routeAuthorizedPointEventDomainTarget?.domainScope);
  const candidateGlobalTransportLiftPass =
    localEndpointProviderAcceptedPass === true &&
    routeSubstitutionCoveragePass &&
    providerAssistedRows.length > 0;
  const physicalRetainedProviderTransportLawTarget =
    createPhysicalRetainedProviderTransportLawTarget({
      routeRows,
      substitutedRows,
      sampledZeroSlackRows,
      localEndpointProviderAcceptedPass,
      routeSubstitutionCoveragePass,
      routeAuthorizedPointEventDomainTarget,
      globalRetainedRowSetIdentityPass,
      fullPointEventRuleLiftPass,
      positiveWidthRetainedDomainLiftPass,
      retainedPayloadRowsPass,
      acceptedRetainedEnergyRoutingPass,
      acceptedFullPointEventRulePass,
    });
  const acceptedPhysicalRetainedProviderTransportLawPass =
    physicalRetainedProviderTransportLawTarget
      .acceptedPhysicalRetainedProviderTransportLawPass === true;
  const acceptedGlobalRetainedTransportLiftPass =
    candidateGlobalTransportLiftPass &&
    (substitutedRows.length === 0 ||
      acceptedPhysicalRetainedProviderTransportLawPass) &&
    (sampledZeroSlackBranchRoutePass ||
      acceptedPhysicalRetainedProviderTransportLawPass) &&
    globalRetainedRowSetIdentityPass &&
    (fullPointEventRuleLiftPass || positiveWidthRetainedDomainLiftPass) &&
    retainedPayloadRowsPass &&
    acceptedRetainedEnergyRoutingPass &&
    acceptedFullPointEventRulePass;
  const rows = routeRows.map((row) => {
    const providerSubstitution =
      row.providerAssistedGeometryPass === true &&
      row.sampledZeroSlackRoutePass !== true;
    const sampledZeroSlack = row.sampledZeroSlackRoutePass === true;
    return {
      incomingPairKey: row.incomingPairKey ?? null,
      outgoingPairKey: row.outgoingPairKey ?? null,
      continuityRole: row.continuityRole ?? null,
      continuityLayer: row.continuityLayer ?? null,
      routeRootKey: row.routeRootKey ?? null,
      status: sampledZeroSlack
        ? "sampled_zero_slack_route_transport_geometry_populated_global_domain_required"
        : providerSubstitution
          ? "endpoint_provider_substitution_geometry_populated_global_transport_lift_blocked"
          : "global_retained_transport_lift_route_geometry_missing",
      sampledZeroSlackRoutePass: sampledZeroSlack,
      providerSubstitution,
      providerAssistedGeometryPass: row.providerAssistedGeometryPass === true,
      providerAssistedResidualNorm: finiteOrNull(row.providerAssistedResidualNorm),
      sampledEndpointPairResidual: finiteOrNull(row.sampledEndpointPairResidual),
      sampledRequiredEndpointCompensationNorm: finiteOrNull(
        row.sampledRequiredEndpointCompensationNorm
      ),
      endpointProviderAcceptanceStatus:
        row.endpointProviderAcceptanceStatus ?? null,
      routeAuthorizedPointEventDomainStatus:
        row.routeAuthorizedPointEventDomainStatus ?? null,
      routeAuthorizedPointEventDomainPass:
        row.routeAuthorizedPointEventDomainPass === true,
      exactCircularReplacementTransportPass:
        row.exactCircularReplacementTransportPass === true,
      reducedProviderLawPass: row.reducedProviderLawPass === true,
      globalTransportRowPass:
        (sampledZeroSlack ||
          (providerSubstitution &&
            acceptedPhysicalRetainedProviderTransportLawPass)) &&
        globalRetainedRowSetIdentityPass &&
        (fullPointEventRuleLiftPass || positiveWidthRetainedDomainLiftPass),
      retainedLimitation: sampledZeroSlack
        ? "The sampled route has zero-slack geometry, but global retained transport still needs global row-set identity, a full point-event rule or positive-width retained domain, and retained payload rows."
        : acceptedPhysicalRetainedProviderTransportLawPass
          ? "The exact endpoint-provider substitution is accepted as a physical retained provider-transport row on the global retained row set."
        : "The exact endpoint-provider substitution is local route-authorized point-event geometry. It is not a global retained transport row until a physical retained transport law promotes it on the common row set.",
    };
  });
  const acceptanceBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    routeSubstitutionCoveragePass
      ? null
      : "route_substitution_coverage_missing",
    substitutedRows.length > 0 &&
    !acceptedPhysicalRetainedProviderTransportLawPass
      ? "endpoint_provider_substitution_not_sampled_zero_slack_transport"
      : null,
    substitutedRows.length > 0 &&
    !acceptedPhysicalRetainedProviderTransportLawPass
      ? "accepted_physical_retained_provider_transport_law_missing"
      : null,
    routeAuthorizedPointEventOnly &&
    !acceptedPhysicalRetainedProviderTransportLawPass
      ? "endpoint_provider_domain_route_authorized_point_event_only"
      : null,
    sampledZeroSlackBranchRoutePass ||
    acceptedPhysicalRetainedProviderTransportLawPass
      ? null
      : "sampled_zero_slack_branch_route_missing",
    globalRetainedRowSetIdentityPass ? null : "global_retained_row_set_identity_missing",
    positiveWidthCommonRetainedTimeDomainPass || fullPointEventRuleLiftPass
      ? null
      : "full_point_event_rule_or_positive_width_common_retained_domain_missing",
    retainedPayloadRowsPass
      ? null
      : "retained_force_torque_wake_phase_partition_stability_payloads_missing",
    acceptedRetainedEnergyRoutingPass ? null : "accepted_retained_energy_routing_missing",
    acceptedFullPointEventRulePass ? null : "accepted_full_point_event_rule_missing",
  ].filter(Boolean);

  return {
    schema:
      "aaa-tri-binary-endpoint-provider-global-retained-transport-lift-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "endpoint_provider_global_retained_transport_lift_not_applicable_local_provider_missing"
      : acceptedGlobalRetainedTransportLiftPass
        ? "endpoint_provider_global_retained_transport_lift_accepted"
        : candidateGlobalTransportLiftPass
          ? "endpoint_provider_global_retained_transport_lift_candidate_populated_acceptance_blocked"
          : "endpoint_provider_global_retained_transport_lift_candidate_incomplete",
    claimLevel:
      "fail-closed target for deciding whether route-authorized endpoint-provider geometry can lift to global retained branch transport; not a retained branch claim",
    localEndpointProviderAcceptedPass,
    candidateGlobalTransportLiftPass,
    acceptedGlobalRetainedTransportLiftPass,
    acceptedPhysicalRetainedProviderTransportLawPass,
    retainedBranchClaim: false,
    routeRowCount: routeRows.length,
    providerAssistedRouteCount: providerAssistedRows.length,
    providerSubstitutionRouteCount: substitutedRows.length,
    sampledZeroSlackRouteCount: sampledZeroSlackRows.length,
    providerAssistedOrZeroSlackRouteCount: providerAssistedOrZeroSlackRows.length,
    routeSubstitutionCoveragePass,
    sampledZeroSlackBranchRoutePass,
    globalRetainedRowSetIdentityPass,
    fullPointEventRuleLiftPass,
    positiveWidthRetainedDomainLiftPass,
    positiveWidthCommonRetainedTimeDomainPass,
    retainedPayloadRowsPass,
    acceptedRetainedEnergyRoutingPass,
    acceptedFullPointEventRulePass,
    routeAuthorizedPointEventOnly,
    routeAuthorizedPointEventDomainStatus:
      routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainScope:
      routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
    physicalRetainedProviderTransportLawStatus:
      physicalRetainedProviderTransportLawTarget.status,
    physicalRetainedProviderTransportLawTarget,
    maxProviderAssistedResidualNorm:
      endpointProviderAssistedBranchTransportGeometryTarget
        ?.maxProviderAssistedResidualNorm ?? null,
    maxSampledRequiredEndpointCompensationNorm:
      endpointProviderAssistedBranchTransportGeometryTarget
        ?.maxSampledRequiredEndpointCompensationNorm ?? null,
    acceptanceBlockers,
    rows,
    retainedLimitation:
      "Route-authorized endpoint-provider geometry can cover a compensated same-source route locally, but the current evidence does not lift it to global retained branch transport. A lift still needs sampled zero-slack transport or an accepted physical provider-transport law on a global retained row set, plus a full point-event rule or positive-width retained domain, retained payload rows, and retained energy routing.",
  };
}

function createPhysicalRetainedProviderTransportLawTarget({
  routeRows,
  substitutedRows,
  sampledZeroSlackRows,
  localEndpointProviderAcceptedPass,
  routeSubstitutionCoveragePass,
  routeAuthorizedPointEventDomainTarget,
  globalRetainedRowSetIdentityPass,
  fullPointEventRuleLiftPass,
  positiveWidthRetainedDomainLiftPass,
  retainedPayloadRowsPass,
  acceptedRetainedEnergyRoutingPass,
  acceptedFullPointEventRulePass,
}) {
  const routeAuthorizedPointEventOnly =
    [
      "same_source_endpoint_provider_route_only",
      "route_authorized_endpoint_provider_point_event_only",
    ].includes(routeAuthorizedPointEventDomainTarget?.domainScope);
  const candidateProviderRows = substitutedRows.filter((row) => {
    const residualNorm = finiteOrNull(row.providerAssistedResidualNorm);
    return (
      row.providerAssistedGeometryPass === true &&
      row.exactCircularReplacementTransportPass === true &&
      row.reducedProviderLawPass === true &&
      Number.isFinite(residualNorm) &&
      residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
    );
  });
  const candidateProviderTransportLawPass =
    localEndpointProviderAcceptedPass === true &&
    substitutedRows.length > 0 &&
    candidateProviderRows.length === substitutedRows.length;
  const globalLawDeclarationPass =
    globalRetainedRowSetIdentityPass &&
    (fullPointEventRuleLiftPass || positiveWidthRetainedDomainLiftPass) &&
    retainedPayloadRowsPass &&
    acceptedRetainedEnergyRoutingPass &&
    acceptedFullPointEventRulePass;
  const acceptedPhysicalRetainedProviderTransportLawPass =
    candidateProviderTransportLawPass && globalLawDeclarationPass;
  const candidateTransportRows = routeRows.map((row) => {
    const providerSubstitution =
      row.providerAssistedGeometryPass === true &&
      row.sampledZeroSlackRoutePass !== true;
    const sampledZeroSlack = row.sampledZeroSlackRoutePass === true;
    const providerResidualNorm = finiteOrNull(row.providerAssistedResidualNorm);
    const candidateProviderTransportRowPass =
      providerSubstitution &&
      row.exactCircularReplacementTransportPass === true &&
      row.reducedProviderLawPass === true &&
      Number.isFinite(providerResidualNorm) &&
      providerResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

    return {
      incomingPairKey: row.incomingPairKey ?? null,
      outgoingPairKey: row.outgoingPairKey ?? null,
      continuityRole: row.continuityRole ?? null,
      continuityLayer: row.continuityLayer ?? null,
      routeRootKey: row.routeRootKey ?? null,
      status: sampledZeroSlack
        ? "sampled_zero_slack_transport_row_not_provider_law"
        : candidateProviderTransportRowPass
          ? acceptedPhysicalRetainedProviderTransportLawPass
            ? "physical_provider_transport_law_row_accepted"
            : "physical_provider_transport_law_candidate_geometry_populated_global_acceptance_blocked"
          : providerSubstitution
            ? "physical_provider_transport_law_candidate_geometry_incomplete"
            : "physical_provider_transport_law_not_applicable_to_route_row",
      providerSubstitution,
      sampledZeroSlackRoutePass: sampledZeroSlack,
      candidateProviderTransportRowPass,
      providerAssistedGeometryPass: row.providerAssistedGeometryPass === true,
      exactCircularReplacementTransportPass:
        row.exactCircularReplacementTransportPass === true,
      reducedProviderLawPass: row.reducedProviderLawPass === true,
      providerResidualNorm,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      endpointProviderAcceptanceStatus:
        row.endpointProviderAcceptanceStatus ?? null,
      routeAuthorizedPointEventDomainStatus:
        row.routeAuthorizedPointEventDomainStatus ?? null,
      routeAuthorizedPointEventDomainPass:
        row.routeAuthorizedPointEventDomainPass === true,
      retainedLimitation: sampledZeroSlack
        ? "This row is already sampled zero-slack geometry; it is context for the mixed route set, not evidence for the provider-transport law."
        : "This row supplies exact reduced endpoint-provider substitution geometry, but physical retained transport also requires declaration on the global retained row set with full-event/domain, payload, and energy-routing support.",
    };
  });
  const acceptanceBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    routeSubstitutionCoveragePass
      ? null
      : "route_substitution_coverage_missing",
    candidateProviderTransportLawPass
      ? null
      : "provider_transport_law_candidate_geometry_missing",
    routeAuthorizedPointEventOnly
      ? "provider_transport_law_still_route_authorized_point_event_only"
      : null,
    globalRetainedRowSetIdentityPass
      ? null
      : "provider_transport_law_not_declared_on_global_row_set",
    globalRetainedRowSetIdentityPass
      ? null
      : "global_retained_row_set_identity_missing",
    fullPointEventRuleLiftPass || positiveWidthRetainedDomainLiftPass
      ? null
      : "full_point_event_rule_or_positive_width_common_retained_domain_missing",
    retainedPayloadRowsPass
      ? null
      : "retained_force_torque_wake_phase_partition_stability_payloads_missing",
    acceptedRetainedEnergyRoutingPass
      ? null
      : "accepted_retained_energy_routing_missing",
    acceptedFullPointEventRulePass ? null : "accepted_full_point_event_rule_missing",
  ].filter(Boolean);

  return {
    schema:
      "aaa-tri-binary-physical-retained-provider-transport-law-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "physical_retained_provider_transport_law_not_applicable_local_provider_missing"
      : acceptedPhysicalRetainedProviderTransportLawPass
        ? "physical_retained_provider_transport_law_accepted"
        : candidateProviderTransportLawPass
          ? "physical_retained_provider_transport_law_candidate_geometry_populated_global_acceptance_blocked"
          : "physical_retained_provider_transport_law_candidate_incomplete",
    claimLevel:
      "fail-closed diagnostic for deciding whether exact endpoint-provider substitution geometry has become a physical retained transport law; not a retained branch claim",
    localEndpointProviderAcceptedPass,
    routeSubstitutionCoveragePass,
    candidateProviderTransportLawPass,
    acceptedPhysicalRetainedProviderTransportLawPass,
    retainedBranchClaim: false,
    providerSubstitutionRouteCount: substitutedRows.length,
    candidateProviderTransportRouteCount: candidateProviderRows.length,
    sampledZeroSlackRouteCount: sampledZeroSlackRows.length,
    routeAuthorizedPointEventDomainStatus:
      routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainScope:
      routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
    routeAuthorizedPointEventOnly,
    globalLawDeclarationPass,
    globalRetainedRowSetIdentityPass,
    fullPointEventRuleLiftPass,
    positiveWidthRetainedDomainLiftPass,
    retainedPayloadRowsPass,
    acceptedRetainedEnergyRoutingPass,
    acceptedFullPointEventRulePass,
    maxProviderTransportResidualNorm: maxFinite(
      candidateProviderRows.map((row) => row.providerAssistedResidualNorm)
    ),
    acceptanceBlockers,
    rows: candidateTransportRows,
    retainedLimitation:
      "The reduced circular endpoint provider is exact on the route-authorized point-event row, so the candidate physical law is populated geometrically. It is not accepted as retained provider transport until it is declared on the global retained row set and carries full-event or positive-width retained-domain support, retained payload rows, and retained energy routing.",
  };
}

function createEndpointProviderAssistedBranchTransportGeometryTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  acceptedEndpointProviderRows,
  localEndpointProviderAcceptedPass,
}) {
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const rows = routeRows.map((routeRow) =>
    createEndpointProviderAssistedBranchTransportGeometryRow({
      routeRow,
      acceptedEndpointProviderRows,
    })
  );
  const providerAssistedRows = rows.filter(
    (row) => row.providerAssistedGeometryPass === true
  );
  const providerAssistedOrZeroSlackRows = rows.filter(
    (row) => row.providerAssistedOrZeroSlackGeometryPass === true
  );
  const sampledZeroSlackRows = rows.filter(
    (row) => row.sampledZeroSlackRoutePass === true
  );
  const sampledCompensationRows = rows.filter(
    (row) => row.sampledCompensationRequired === true
  );
  const providerAssistedBranchTransportGeometryPass =
    rows.length > 0 && providerAssistedOrZeroSlackRows.length === rows.length;
  const sampledZeroSlackBranchRoutePass =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const globalRetainedRowSetIdentityPass =
    hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ===
    "common_active_row_set_candidate_populated";
  const blockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    providerAssistedBranchTransportGeometryPass
      ? null
      : "endpoint_provider_assisted_route_geometry_missing",
    sampledZeroSlackBranchRoutePass
      ? null
      : "sampled_zero_slack_branch_route_missing",
    providerAssistedRows.length > 0
      ? "endpoint_provider_assisted_geometry_is_route_authorized_point_event_only"
      : null,
    globalRetainedRowSetIdentityPass ? null : "global_retained_row_set_identity_missing",
    "full_point_event_rule_or_positive_width_common_retained_domain_missing",
    "retained_force_torque_wake_phase_partition_stability_payloads_missing",
  ].filter(Boolean);

  return {
    schema:
      "aaa-tri-binary-endpoint-provider-assisted-branch-transport-geometry-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "endpoint_provider_assisted_branch_transport_geometry_not_applicable_local_provider_missing"
      : providerAssistedBranchTransportGeometryPass &&
          !sampledZeroSlackBranchRoutePass
        ? "endpoint_provider_assisted_branch_transport_geometry_populated_sampled_route_compensation_remains"
        : providerAssistedBranchTransportGeometryPass
          ? "endpoint_provider_assisted_branch_transport_geometry_populated_formal_acceptance_blocked"
          : "endpoint_provider_assisted_branch_transport_geometry_blocked",
    claimLevel:
      "fail-closed diagnostic asking whether the accepted route-authorized endpoint provider supplies local branch-transport geometry; not zero-slack retained branch transport",
    localEndpointProviderAcceptedPass,
    providerAssistedBranchTransportGeometryPass,
    sampledZeroSlackBranchRoutePass,
    retainedBranchClaim: false,
    routeRowCount: rows.length,
    providerAssistedRouteCount: providerAssistedRows.length,
    sampledZeroSlackRouteCount: sampledZeroSlackRows.length,
    sampledCompensationRequiredRouteCount: sampledCompensationRows.length,
    providerAssistedOrZeroSlackRouteCount:
      providerAssistedOrZeroSlackRows.length,
    maxSampledRequiredEndpointCompensationNorm: maxFinite(
      rows.map((row) => row.sampledRequiredEndpointCompensationNorm)
    ),
    maxProviderAssistedResidualNorm: maxFinite(
      rows.map((row) => row.providerAssistedResidualNorm)
    ),
    maxReplacementAdvectionResidualNorm: maxFinite(
      rows.map((row) => row.replacementAdvectionResidualNorm)
    ),
    maxProviderAdvectionResidualNorm: maxFinite(
      rows.map((row) => row.providerAdvectionResidualNorm)
    ),
    globalRetainedRowSetIdentityPass,
    globalRetainedRowSetIdentityStatus:
      hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ?? null,
    blockers,
    rows,
    retainedLimitation:
      "Endpoint-provider assistance can replace the sampled same-source endpoint geometry by exact circular provider geometry on the route-authorized point-event domain. This does not change sampled zero-slack route status and does not certify global retained branch transport without a full point-event rule, positive-width common retained domain, and retained payload rows.",
  };
}

function createEndpointProviderAssistedBranchTransportGeometryRow({
  routeRow,
  acceptedEndpointProviderRows,
}) {
  const providerRow = findAcceptedEndpointProviderRowForRoute({
    routeRow,
    acceptedEndpointProviderRows,
  });
  const providerTarget =
    providerRow?.retainedEndpointProviderAcceptanceTarget ?? null;
  const replacementTarget =
    providerRow?.exactCircularEndpointReplacementTarget ?? null;
  const provider =
    replacementTarget?.reducedCircularEndpointProviderLawCandidate ?? null;
  const sameSourceCompensatedRoute =
    routeRow?.continuityRole === "same_source" &&
    routeRow?.compensationRequired === true;
  const sampledZeroSlackRoutePass = routeRow?.zeroSlackRoutePass === true;
  const providerAssistedResidualNorm = maxFinite([
    replacementTarget?.replacementAdvectionResidualNorm,
    replacementTarget?.replacementEndpointPairResidualVsChartChord != null
      ? Math.abs(replacementTarget.replacementEndpointPairResidualVsChartChord)
      : null,
    provider?.maxProviderPointResidualNorm,
    provider?.providerAdvectionResidualNorm,
  ]);
  const providerAssistedGeometryPass =
    sameSourceCompensatedRoute &&
    providerTarget?.acceptedRetainedEndpointProviderPass === true &&
    providerTarget?.sameRetainedRowSetProviderPass === true &&
    replacementTarget?.exactCircularReplacementTransportPass === true &&
    provider?.reducedProviderLawPass === true &&
    Number.isFinite(providerAssistedResidualNorm) &&
    providerAssistedResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const providerAssistedOrZeroSlackGeometryPass =
    sampledZeroSlackRoutePass || providerAssistedGeometryPass;

  return {
    incomingPairKey: routeRow?.incomingPairKey ?? null,
    outgoingPairKey: routeRow?.outgoingPairKey ?? null,
    continuityRole: routeRow?.continuityRole ?? null,
    continuityLayer: routeRow?.continuityLayer ?? null,
    routeRootKey: routeRow?.routeRootKey ?? null,
    status: sampledZeroSlackRoutePass
      ? "sampled_zero_slack_route_geometry_already_populated"
      : providerAssistedGeometryPass
        ? "endpoint_provider_assisted_route_geometry_populated_domain_blocked"
        : sameSourceCompensatedRoute
          ? "endpoint_provider_assisted_route_geometry_provider_missing_or_not_accepted"
          : "endpoint_provider_assisted_route_geometry_not_applicable",
    sampledCandidateRoutePass: routeRow?.candidateRoutePass === true,
    sampledZeroSlackRoutePass,
    sampledCompensationRequired: routeRow?.compensationRequired === true,
    sampledGeometryPass: routeRow?.geometryPass === true,
    sampledClockContinuityPass: routeRow?.clockContinuityPass === true,
    sampledHingeChartContinuityPass: routeRow?.hingeChartContinuityPass === true,
    sampledEndpointPairResidual: finiteOrNull(routeRow?.endpointPairResidual),
    sampledEndpointToChartResidual: finiteOrNull(routeRow?.endpointToChartResidual),
    sampledRequiredEndpointCompensationNorm: finiteOrNull(
      routeRow?.requiredEndpointCompensationNorm
    ),
    sampledRequiredClockRetune: finiteOrNull(routeRow?.requiredClockRetune),
    sampledRequiredPhaseCompensation: finiteOrNull(
      routeRow?.requiredPhaseCompensation
    ),
    endpointProviderRowStatus: providerRow?.status ?? null,
    endpointProviderAcceptanceStatus: providerTarget?.status ?? null,
    endpointProviderAcceptedPass:
      providerTarget?.acceptedRetainedEndpointProviderPass === true,
    sameRetainedRowSetProviderPass:
      providerTarget?.sameRetainedRowSetProviderPass === true,
    routeAuthorizedPointEventDomainStatus:
      providerTarget?.routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainPass:
      providerTarget?.routeAuthorizedPointEventDomainTarget
        ?.acceptedRouteAuthorizedPointEventDomainPass === true,
    exactCircularReplacementTransportPass:
      replacementTarget?.exactCircularReplacementTransportPass === true,
    reducedProviderLawPass: provider?.reducedProviderLawPass === true,
    providerAssistedGeometryPass,
    providerAssistedOrZeroSlackGeometryPass,
    providerAssistedResidualNorm,
    replacementAdvectionResidualNorm: finiteOrNull(
      replacementTarget?.replacementAdvectionResidualNorm
    ),
    replacementEndpointPairResidualVsChartChord: finiteOrNull(
      replacementTarget?.replacementEndpointPairResidualVsChartChord
    ),
    providerAdvectionResidualNorm: finiteOrNull(
      provider?.providerAdvectionResidualNorm
    ),
    maxProviderPointResidualNorm: finiteOrNull(
      provider?.maxProviderPointResidualNorm
    ),
    incomingProviderPoint: provider?.incomingProviderPoint ?? null,
    outgoingProviderPoint: provider?.outgoingProviderPoint ?? null,
    retainedLimitation: sampledZeroSlackRoutePass
      ? "This route is already zero-slack under sampled endpoint geometry."
      : "The exact circular endpoint provider supplies local route-authorized point-event geometry only. It does not by itself create sampled zero-slack branch transport or global retained branch acceptance.",
  };
}

function findAcceptedEndpointProviderRowForRoute({
  routeRow,
  acceptedEndpointProviderRows,
}) {
  return (
    (acceptedEndpointProviderRows ?? []).find((row) => {
      const target = row.retainedEndpointProviderAcceptanceTarget ?? null;
      return (
        target?.acceptedRetainedEndpointProviderPass === true &&
        target.incomingPairKey === routeRow?.incomingPairKey &&
        target.outgoingPairKey === routeRow?.outgoingPairKey &&
        target.continuityRole === routeRow?.continuityRole &&
        target.continuityLayer === routeRow?.continuityLayer &&
        target.routeRootKey === routeRow?.routeRootKey
      );
    }) ?? null
  );
}

function createFullPointEventRuleLiftTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  retainedTimeDomainCoverage,
  routeAuthorizedPointEventDomainTarget,
  rootPayloadIntervalEnclosure,
  positiveWidthRetainedDomainLiftTarget,
  endpointProviderAssistedBranchTransportGeometryTarget,
  minimalBranchTransactionFrequencyCertificate = null,
  actionBoundaryWakeEnergyLawCandidate = null,
  sameEventEnergyRoutingTarget = null,
  localEndpointProviderAcceptedPass,
}) {
  const pairRows = hingeEventRowSetIdentity?.rows ?? [];
  const pairSideRows = positiveWidthRetainedDomainLiftTarget?.pairSideRows ?? [];
  const diagonalPairKeys = pairRows
    .filter((row) => isDiagonalLayerPairKey(row.pairKey))
    .map((row) => row.pairKey);
  const pointOnlyDiagonalPairKeys = pairSideRows
    .filter(
      (row) =>
        isDiagonalLayerPairKey(row.pairKey) &&
        row.leftSidePositiveWidthPass !== true &&
        row.rightSidePositiveWidthPass !== true
    )
    .map((row) => row.pairKey);
  const offDiagonalPairKeys = pairRows
    .filter((row) => !isDiagonalLayerPairKey(row.pairKey))
    .map((row) => row.pairKey);
  const eventRootKeyCandidatePass =
    hingeEventRowSetIdentity?.status ===
    "hinge_event_common_root_key_candidate_populated";
  const candidatePointEventAdmissibilityPass =
    hingeEventRowSetIdentity?.candidatePointEventAdmissibilityPass === true;
  const offDiagonalTorqueTolerancePass =
    Number.isFinite(hingeEventRowSetIdentity?.offDiagonalNetDiagnosticTorqueNorm) &&
    Number.isFinite(hingeEventRowSetIdentity?.pointEventTorqueTolerance) &&
    hingeEventRowSetIdentity.offDiagonalNetDiagnosticTorqueNorm <=
      hingeEventRowSetIdentity.pointEventTorqueTolerance;
  const branchTransportIncidencePass =
    hingeEventRowSetIdentity?.branchTransportIncidencePass === true;
  const branchTransportPairMapTopologyPass =
    hingeEventRowSetIdentity?.branchTransportPairMapTopologyPass === true;
  const branchTransportPairMapGeometryPass =
    hingeEventRowSetIdentity?.branchTransportPairMapGeometryPass === true;
  const endpointProviderAssistedBranchTransportGeometryPass =
    endpointProviderAssistedBranchTransportGeometryTarget
      ?.providerAssistedBranchTransportGeometryPass === true;
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const routeRootKey =
    routeAuthorizedPointEventDomainTarget?.routeRootKey ??
    routeRows.find((row) => row.routeRootKey != null)?.routeRootKey ??
    null;
  const sameRouteRootKeyPass =
    routeRootKey != null &&
    (hingeEventRowSetIdentity?.commonRootKeys ?? []).includes(routeRootKey);
  const zeroSlackBranchRoutePass =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const routeCompensationRequired =
    (hingeRootBranchTransportRouteFeasibility?.compensationRequiredMatchCount ?? 0) >
    0;
  const globalRetainedRowSetIdentityPass =
    hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ===
    "common_active_row_set_candidate_populated";
  const allPairPointEventInputPass =
    eventRootKeyCandidatePass &&
    candidatePointEventAdmissibilityPass &&
    branchTransportIncidencePass &&
    offDiagonalTorqueTolerancePass &&
    sameRouteRootKeyPass;
  const branchTransportGeometryPass =
    branchTransportPairMapGeometryPass && zeroSlackBranchRoutePass && !routeCompensationRequired;
  const positiveWidthCommonRetainedTimeDomainPass =
    (retainedTimeDomainCoverage?.maxCommonWidth ?? 0) > ROOT_TOLERANCE ||
    rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval === true ||
    rootPayloadIntervalEnclosure?.oneSidedPositiveWidthCommonInterval === true;
  const fullPointEventPayloadCoverageTarget =
    createFullPointEventPayloadCoverageTarget({
      hingeRootBranchTransportRouteFeasibility,
      hingeEventRowSetIdentity,
      endpointProviderAssistedBranchTransportGeometryTarget,
      routeAuthorizedPointEventDomainTarget,
      minimalBranchTransactionFrequencyCertificate,
      actionBoundaryWakeEnergyLawCandidate,
      sameEventEnergyRoutingTarget,
      pointOnlyDiagonalPairKeys,
      localEndpointProviderAcceptedPass,
      allPairPointEventInputPass,
    });
  const retainedPayloadRowsPass =
    fullPointEventPayloadCoverageTarget.acceptedRetainedPayloadRowsPass === true;
  const acceptedRetainedEnergyRoutingPass =
    fullPointEventPayloadCoverageTarget.acceptedRetainedEnergyRoutingPass === true;
  const fullPointEventDiagonalIdentityRuleTarget =
    createFullPointEventDiagonalIdentityRuleTarget({
      pairRows,
      pairSideRows,
      pointOnlyDiagonalPairKeys,
      localEndpointProviderAcceptedPass,
      allPairPointEventInputPass,
      candidatePointEventAdmissibilityPass,
      offDiagonalTorqueTolerancePass,
      branchTransportIncidencePass,
      branchTransportPairMapTopologyPass,
      branchTransportPairMapGeometryPass,
      endpointProviderAssistedBranchTransportGeometryPass,
      zeroSlackBranchRoutePass,
      routeCompensationRequired,
      globalRetainedRowSetIdentityPass,
      retainedPayloadRowsPass,
      acceptedRetainedEnergyRoutingPass,
    });
  const acceptedFullPointEventDiagonalIdentityRulePass =
    fullPointEventDiagonalIdentityRuleTarget
      .acceptedFullPointEventDiagonalIdentityRulePass === true;
  const acceptedFullPointEventRulePass = false;
  const fullPointEventRuleLiftPass =
    localEndpointProviderAcceptedPass === true &&
    allPairPointEventInputPass &&
    branchTransportGeometryPass &&
    globalRetainedRowSetIdentityPass &&
    retainedPayloadRowsPass &&
    acceptedRetainedEnergyRoutingPass &&
    acceptedFullPointEventDiagonalIdentityRulePass &&
    acceptedFullPointEventRulePass;
  const fullPointEventRuleCandidatePass =
    localEndpointProviderAcceptedPass === true &&
    allPairPointEventInputPass &&
    branchTransportPairMapTopologyPass;
  const fullPointEventRuleBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    eventRootKeyCandidatePass ? null : "hinge_event_common_root_key_missing",
    sameRouteRootKeyPass ? null : "route_root_key_not_on_hinge_event",
    candidatePointEventAdmissibilityPass ? null : "candidate_point_event_rule_missing",
    offDiagonalTorqueTolerancePass ? null : "off_diagonal_point_torque_not_cancelled",
    branchTransportIncidencePass ? null : "branch_transport_incidence_missing",
    branchTransportPairMapTopologyPass ? null : "branch_transport_pair_map_topology_missing",
    branchTransportPairMapGeometryPass
      ? null
      : endpointProviderAssistedBranchTransportGeometryPass
        ? "endpoint_provider_assisted_geometry_not_global_retained_transport"
        : "geometrically_continuous_branch_transport_pair_map_missing",
    zeroSlackBranchRoutePass ? null : "zero_slack_branch_route_missing",
    routeCompensationRequired ? "same_source_route_compensation_required" : null,
    globalRetainedRowSetIdentityPass ? null : "global_retained_row_set_identity_missing",
    positiveWidthCommonRetainedTimeDomainPass
      ? null
      : "positive_width_common_retained_time_domain_missing",
    pointOnlyDiagonalPairKeys.length > 0 &&
    !acceptedFullPointEventDiagonalIdentityRulePass
      ? "point_only_diagonal_identity_rows_need_explicit_full_point_event_rule"
      : null,
    retainedPayloadRowsPass
      ? null
      : fullPointEventPayloadCoverageTarget.partialCoveragePass
        ? "retained_payload_rows_partial_acceptance_missing"
        : "retained_force_torque_wake_phase_partition_stability_payloads_missing",
    acceptedRetainedEnergyRoutingPass ? null : "accepted_retained_energy_routing_missing",
    acceptedFullPointEventRulePass ? null : "accepted_full_point_event_rule_missing",
  ].filter(Boolean);
  const routeRowSummaries = routeRows.map((row) => ({
    incomingPairKey: row.incomingPairKey ?? null,
    outgoingPairKey: row.outgoingPairKey ?? null,
    continuityRole: row.continuityRole ?? null,
    candidateRoutePass: row.candidateRoutePass === true,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    routeRootKey: row.routeRootKey ?? null,
    minOneSidedRouteWidth: finiteOrNull(row.minOneSidedRouteWidth),
    endpointPairResidual: finiteOrNull(row.endpointPairResidual),
    endpointToChartResidual: finiteOrNull(row.endpointToChartResidual),
    requiredEndpointCompensationNorm: finiteOrNull(
      row.requiredEndpointCompensationNorm
    ),
    requiredClockRetune: finiteOrNull(row.requiredClockRetune),
    requiredPhaseCompensation: finiteOrNull(row.requiredPhaseCompensation),
  }));

  return {
    schema: "aaa-tri-binary-full-point-event-rule-lift-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "full_point_event_rule_lift_not_applicable_local_endpoint_provider_missing"
      : fullPointEventRuleLiftPass
        ? "full_point_event_rule_lift_candidate_formal_acceptance_blocked"
        : fullPointEventRuleCandidatePass &&
            pointOnlyDiagonalPairKeys.length > 0 &&
            routeCompensationRequired
          ? "full_point_event_rule_lift_blocked_point_only_identity_and_route_compensation"
          : fullPointEventRuleCandidatePass && pointOnlyDiagonalPairKeys.length > 0
            ? "full_point_event_rule_lift_blocked_point_only_identity"
            : fullPointEventRuleCandidatePass
              ? "full_point_event_rule_lift_blocked_payloads_or_branch_transport"
              : "full_point_event_rule_lift_blocked_candidate_event_incomplete",
    claimLevel:
      "fail-closed target for upgrading a hinge-point candidate into an accepted full point-event rule; not a retained branch claim",
    localEndpointProviderAcceptedPass,
    fullPointEventRuleCandidatePass,
    fullPointEventRuleLiftPass,
    acceptedFullPointEventRulePass,
    retainedBranchClaim: false,
    routeAuthorizedPointEventDomainStatus:
      routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainScope:
      routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
    routeRootKey,
    sameRouteRootKeyPass,
    eventRootKeyCandidatePass,
    eventCommonRootKeyCount:
      hingeEventRowSetIdentity?.commonRootKeyCount ?? null,
    eventCommonRootKeys: hingeEventRowSetIdentity?.commonRootKeys ?? [],
    pointEventDiagnosticsStatus:
      hingeEventRowSetIdentity?.pointEventDiagnosticsStatus ?? null,
    candidatePointEventAdmissibilityStatus:
      hingeEventRowSetIdentity?.candidatePointEventAdmissibilityStatus ?? null,
    candidatePointEventAdmissibilityPass,
    branchTransportIncidenceStatus:
      hingeEventRowSetIdentity?.branchTransportIncidenceStatus ?? null,
    branchTransportIncidencePass,
    branchTransportPairMapStatus:
      hingeEventRowSetIdentity?.branchTransportPairMapStatus ?? null,
    branchTransportPairMapTopologyPass,
    branchTransportPairMapGeometryPass,
    endpointProviderAssistedBranchTransportGeometryPass,
    endpointProviderAssistedBranchTransportGeometryStatus:
      endpointProviderAssistedBranchTransportGeometryTarget?.status ?? null,
    branchTransportPairMapHingeChartPass:
      hingeEventRowSetIdentity?.branchTransportPairMapHingeChartPass === true,
    pointEventOneSidedPairCount:
      hingeEventRowSetIdentity?.pointEventOneSidedPairCount ?? null,
    pointEventIncomingOnlyPairCount:
      hingeEventRowSetIdentity?.pointEventIncomingOnlyPairCount ?? null,
    pointEventOutgoingOnlyPairCount:
      hingeEventRowSetIdentity?.pointEventOutgoingOnlyPairCount ?? null,
    pointEventPairMapMatchedPairCount:
      hingeEventRowSetIdentity?.pointEventPairMapMatchedPairCount ?? null,
    pairCount: pairRows.length,
    diagonalPairCount: diagonalPairKeys.length,
    offDiagonalPairCount: offDiagonalPairKeys.length,
    diagonalIdentityPairCount:
      hingeEventRowSetIdentity?.diagonalIdentityPairCount ?? null,
    offDiagonalForcePairCount:
      hingeEventRowSetIdentity?.offDiagonalForcePairCount ?? null,
    pointOnlyDiagonalPairKeys,
    offDiagonalNetDiagnosticTorqueNorm:
      hingeEventRowSetIdentity?.offDiagonalNetDiagnosticTorqueNorm ?? null,
    pointEventTorqueTolerance:
      hingeEventRowSetIdentity?.pointEventTorqueTolerance ?? null,
    offDiagonalTorqueTolerancePass,
    positiveWidthCommonRetainedTimeDomainPass,
    positiveWidthRetainedDomainLiftStatus:
      positiveWidthRetainedDomainLiftTarget?.status ?? null,
    globalRetainedRowSetIdentityPass,
    globalRetainedRowSetIdentityStatus:
      hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ?? null,
    zeroSlackBranchRoutePass,
    branchTransportGeometryPass,
    routeCompensationRequired,
    compensationRequiredMatchCount:
      hingeRootBranchTransportRouteFeasibility
        ?.compensationRequiredMatchCount ?? null,
    retainedPayloadRowsPass,
    acceptedRetainedEnergyRoutingPass,
    fullPointEventDiagonalIdentityRuleStatus:
      fullPointEventDiagonalIdentityRuleTarget.status,
    fullPointEventDiagonalIdentityRuleTarget,
    fullPointEventPayloadCoverageStatus:
      fullPointEventPayloadCoverageTarget.status,
    fullPointEventPayloadCoverageTarget,
    fullPointEventRuleBlockers,
    routeRows: routeRowSummaries,
    retainedLimitation:
      "The hinge has point-event evidence, diagonal identity witnesses, and off-diagonal point-torque cancellation, but an accepted full point-event rule still needs geometrically continuous branch transport and retained force, torque, wake, phase, partition, stability, vector-ledger, and energy-routing rows on the same event. The point-only diagonal rows are useful hinge evidence, not positive-width retained-domain evidence.",
  };
}

function createFullPointEventDiagonalIdentityRuleTarget({
  pairRows,
  pairSideRows,
  pointOnlyDiagonalPairKeys,
  localEndpointProviderAcceptedPass,
  allPairPointEventInputPass,
  candidatePointEventAdmissibilityPass,
  offDiagonalTorqueTolerancePass,
  branchTransportIncidencePass,
  branchTransportPairMapTopologyPass,
  branchTransportPairMapGeometryPass,
  endpointProviderAssistedBranchTransportGeometryPass,
  zeroSlackBranchRoutePass,
  routeCompensationRequired,
  globalRetainedRowSetIdentityPass,
  retainedPayloadRowsPass,
  acceptedRetainedEnergyRoutingPass,
}) {
  const diagonalRows = pairRows.filter((row) => isDiagonalLayerPairKey(row.pairKey));
  const diagonalSideRows = diagonalRows.map((row) => {
    const sideRow =
      pairSideRows.find((candidate) => candidate.pairKey === row.pairKey) ??
      null;
    const pointOnly =
      sideRow != null &&
      sideRow.leftSidePositiveWidthPass !== true &&
      sideRow.rightSidePositiveWidthPass !== true;
    return {
      pairKey: row.pairKey,
      status: row.status ?? null,
      identityWitnessPass:
        row.status === "hinge_pair_common_root_key_witness_populated" &&
        row.commonRootKeys.length > 0,
      pointOnly,
      commonRootKeys: row.commonRootKeys ?? [],
      witnessEdgeCount: row.witnessEdgeCount ?? null,
      rootIntervalCount: row.rootIntervalCount ?? null,
      maxRootIntervalWidth: finiteOrNull(row.maxRootIntervalWidth),
      leftSidePositiveWidthPass:
        sideRow?.leftSidePositiveWidthPass === true,
      leftSideMaxWidth: finiteOrNull(sideRow?.leftSideMaxWidth),
      rightSidePositiveWidthPass:
        sideRow?.rightSidePositiveWidthPass === true,
      rightSideMaxWidth: finiteOrNull(sideRow?.rightSideMaxWidth),
    };
  });
  const identityWitnessRows = diagonalSideRows.filter(
    (row) => row.identityWitnessPass === true
  );
  const pointOnlyRows = diagonalSideRows.filter((row) => row.pointOnly === true);
  const positiveWidthRows = diagonalSideRows.filter(
    (row) =>
      row.leftSidePositiveWidthPass === true ||
      row.rightSidePositiveWidthPass === true
  );
  const missingIdentityRows = diagonalSideRows.filter(
    (row) => row.identityWitnessPass !== true
  );
  const allDiagonalIdentityWitnessesPass =
    diagonalSideRows.length > 0 &&
    identityWitnessRows.length === diagonalSideRows.length;
  const pointOnlyDiagonalRowsPass =
    pointOnlyRows.length === pointOnlyDiagonalPairKeys.length &&
    pointOnlyDiagonalPairKeys.every((pairKey) =>
      pointOnlyRows.some((row) => row.pairKey === pairKey)
    );
  const candidateRulePass =
    localEndpointProviderAcceptedPass === true &&
    allPairPointEventInputPass === true &&
    candidatePointEventAdmissibilityPass === true &&
    offDiagonalTorqueTolerancePass === true &&
    branchTransportIncidencePass === true &&
    branchTransportPairMapTopologyPass === true &&
    allDiagonalIdentityWitnessesPass &&
    pointOnlyDiagonalRowsPass;
  const acceptanceBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    allPairPointEventInputPass ? null : "all_pair_point_event_input_missing",
    candidatePointEventAdmissibilityPass
      ? null
      : "candidate_point_event_rule_missing",
    offDiagonalTorqueTolerancePass ? null : "off_diagonal_point_torque_not_cancelled",
    branchTransportIncidencePass ? null : "branch_transport_incidence_missing",
    branchTransportPairMapTopologyPass
      ? null
      : "branch_transport_pair_map_topology_missing",
    allDiagonalIdentityWitnessesPass
      ? null
      : "diagonal_identity_witnesses_missing",
    pointOnlyDiagonalRowsPass ? null : "point_only_diagonal_identity_rows_missing",
    branchTransportPairMapGeometryPass
      ? null
      : endpointProviderAssistedBranchTransportGeometryPass
        ? "endpoint_provider_assisted_geometry_not_global_retained_transport"
        : "geometrically_continuous_branch_transport_pair_map_missing",
    zeroSlackBranchRoutePass ? null : "zero_slack_branch_route_missing",
    routeCompensationRequired ? "same_source_route_compensation_required" : null,
    globalRetainedRowSetIdentityPass ? null : "global_retained_row_set_identity_missing",
    retainedPayloadRowsPass
      ? null
      : "retained_force_torque_wake_phase_partition_stability_payloads_missing",
    acceptedRetainedEnergyRoutingPass ? null : "accepted_retained_energy_routing_missing",
    "accepted_full_point_event_rule_missing",
  ].filter(Boolean);
  const acceptedFullPointEventDiagonalIdentityRulePass = false;

  return {
    schema:
      "aaa-tri-binary-full-point-event-diagonal-identity-rule-target.v1",
    status:
      diagonalSideRows.length === 0
        ? "full_point_event_diagonal_identity_rule_not_applicable_no_diagonal_rows"
        : candidateRulePass && acceptanceBlockers.length > 0
          ? "full_point_event_diagonal_identity_rule_candidate_populated_acceptance_blocked"
          : candidateRulePass
            ? "full_point_event_diagonal_identity_rule_candidate_populated_formal_acceptance_blocked"
            : "full_point_event_diagonal_identity_rule_candidate_incomplete",
    claimLevel:
      "fail-closed target for treating point-only diagonal identity rows as an explicit full point-event rule component; not retained branch acceptance",
    localEndpointProviderAcceptedPass,
    allPairPointEventInputPass,
    candidatePointEventAdmissibilityPass,
    offDiagonalTorqueTolerancePass,
    branchTransportIncidencePass,
    branchTransportPairMapTopologyPass,
    branchTransportPairMapGeometryPass,
    endpointProviderAssistedBranchTransportGeometryPass,
    zeroSlackBranchRoutePass,
    routeCompensationRequired,
    globalRetainedRowSetIdentityPass,
    retainedPayloadRowsPass,
    acceptedRetainedEnergyRoutingPass,
    candidateRulePass,
    acceptedFullPointEventDiagonalIdentityRulePass,
    retainedBranchClaim: false,
    diagonalPairCount: diagonalSideRows.length,
    diagonalIdentityWitnessCount: identityWitnessRows.length,
    pointOnlyDiagonalPairCount: pointOnlyRows.length,
    positiveWidthDiagonalPairCount: positiveWidthRows.length,
    pointOnlyDiagonalPairKeys,
    positiveWidthDiagonalPairKeys: positiveWidthRows.map((row) => row.pairKey),
    missingDiagonalIdentityPairKeys: missingIdentityRows.map(
      (row) => row.pairKey
    ),
    allDiagonalIdentityWitnessesPass,
    pointOnlyDiagonalRowsPass,
    dischargedCandidateEvidence: [
      allDiagonalIdentityWitnessesPass
        ? "diagonal_identity_witnesses_populated"
        : null,
      offDiagonalTorqueTolerancePass
        ? "off_diagonal_point_torque_cancellation_populated"
        : null,
      branchTransportPairMapTopologyPass
        ? "branch_transport_pair_map_topology_populated"
        : null,
      endpointProviderAssistedBranchTransportGeometryPass
        ? "route_authorized_endpoint_provider_geometry_populated"
        : null,
    ].filter(Boolean),
    acceptanceBlockers,
    rows: diagonalSideRows,
    retainedLimitation:
      "Point-only diagonal identity rows can be treated as candidate point-event identity evidence at the common hinge root key. They do not supply positive-width retained time domain, global retained row-set identity, zero-slack branch transport, retained payload rows, or retained energy routing.",
  };
}

function createFullPointEventPayloadCoverageTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  endpointProviderAssistedBranchTransportGeometryTarget,
  routeAuthorizedPointEventDomainTarget,
  minimalBranchTransactionFrequencyCertificate,
  actionBoundaryWakeEnergyLawCandidate,
  sameEventEnergyRoutingTarget,
  pointOnlyDiagonalPairKeys,
  localEndpointProviderAcceptedPass,
  allPairPointEventInputPass,
}) {
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const routeCandidatePass =
    hingeRootBranchTransportRouteFeasibility?.candidateRoutePass === true;
  const routeCompensationRequired =
    (hingeRootBranchTransportRouteFeasibility?.compensationRequiredMatchCount ?? 0) >
    0;
  const pointEventTorqueCandidatePass =
    hingeEventRowSetIdentity?.candidatePointEventAdmissibilityPass === true &&
    Number.isFinite(hingeEventRowSetIdentity?.offDiagonalNetDiagnosticTorqueNorm) &&
    Number.isFinite(hingeEventRowSetIdentity?.pointEventTorqueTolerance) &&
    hingeEventRowSetIdentity.offDiagonalNetDiagnosticTorqueNorm <=
      hingeEventRowSetIdentity.pointEventTorqueTolerance;
  const providerAssistedBranchGeometryPass =
    endpointProviderAssistedBranchTransportGeometryTarget
      ?.providerAssistedBranchTransportGeometryPass === true;
  const compensatedRoutePayloadComplete =
    sameEventEnergyRoutingTarget?.compensatedRoutePayloadComplete === true;
  const wakeBoundaryChargePullbackPopulated =
    sameEventEnergyRoutingTarget?.targetPopulated === true;
  const exactFormalSameEventCarrierRows =
    sameEventEnergyRoutingTarget?.exactFormalCandidateRows ?? [];
  const sameEventCarrierPopulationPass =
    sameEventEnergyRoutingTarget?.sameEventRowsPass === true &&
    exactFormalSameEventCarrierRows.length > 0;
  const acceptedRetainedEnergyRoutingPass =
    sameEventEnergyRoutingTarget?.acceptedSameEventEnergyRoutingPass === true;
  const acceptedOmegaTxSource =
    sameEventEnergyRoutingTarget?.acceptedOmegaTxSource === true;
  const acceptedActionScale =
    sameEventEnergyRoutingTarget?.acceptedActionScale === true;
  const acceptedEnergyOrientation =
    sameEventEnergyRoutingTarget?.acceptedEnergyOrientation === true;
  const acceptedWakeEnergyIncrementLaw =
    sameEventEnergyRoutingTarget?.acceptedWakeEnergyIncrementLaw === true;
  const partialCoveragePass =
    localEndpointProviderAcceptedPass === true &&
    allPairPointEventInputPass === true &&
    providerAssistedBranchGeometryPass &&
    compensatedRoutePayloadComplete &&
    wakeBoundaryChargePullbackPopulated &&
    sameEventCarrierPopulationPass;
  const payloadRows = [
    {
      payload: "point_event_force_torque",
      state: pointEventTorqueCandidatePass ? "candidate" : "missing",
      accepted: false,
      status: pointEventTorqueCandidatePass
        ? "point_event_force_torque_candidate_populated_retained_torque_missing"
        : "point_event_force_torque_candidate_missing",
      evidence: {
        candidatePointEventAdmissibilityStatus:
          hingeEventRowSetIdentity?.candidatePointEventAdmissibilityStatus ?? null,
        offDiagonalNetDiagnosticTorqueNorm:
          hingeEventRowSetIdentity?.offDiagonalNetDiagnosticTorqueNorm ?? null,
        pointEventTorqueTolerance:
          hingeEventRowSetIdentity?.pointEventTorqueTolerance ?? null,
      },
    },
    {
      payload: "endpoint_provider_branch_geometry",
      state: providerAssistedBranchGeometryPass ? "local_accepted" : "missing",
      accepted: false,
      status: providerAssistedBranchGeometryPass
        ? "endpoint_provider_assisted_geometry_local_route_authorized"
        : "endpoint_provider_assisted_geometry_missing",
      evidence: {
        endpointProviderAssistedBranchTransportGeometryStatus:
          endpointProviderAssistedBranchTransportGeometryTarget?.status ?? null,
        routeAuthorizedPointEventDomainStatus:
          routeAuthorizedPointEventDomainTarget?.status ?? null,
        routeAuthorizedPointEventDomainScope:
          routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
      },
    },
    {
      payload: "route_payload",
      state: compensatedRoutePayloadComplete ? "candidate" : "missing",
      accepted: false,
      status: compensatedRoutePayloadComplete
        ? "compensated_route_payload_complete_candidate"
        : "compensated_route_payload_missing",
      evidence: {
        compensatedRoutePayloadStatus:
          sameEventEnergyRoutingTarget?.compensatedRoutePayloadStatus ?? null,
        compensatedRoutePayloadPopulatedFields:
          sameEventEnergyRoutingTarget?.compensatedRoutePayloadPopulatedFields ??
          [],
        compensatedRoutePayloadMissingFields:
          sameEventEnergyRoutingTarget?.compensatedRoutePayloadMissingFields ??
          [],
        compensatedRoutePayloadRowCount:
          sameEventEnergyRoutingTarget?.compensatedRoutePayloadRowCount ?? null,
      },
    },
    {
      payload: "wake_boundary_charge_pullback",
      state: wakeBoundaryChargePullbackPopulated ? "local_accepted" : "missing",
      accepted: false,
      status: wakeBoundaryChargePullbackPopulated
        ? "wake_boundary_charge_pullback_route_authorized_accepted"
        : "wake_boundary_charge_pullback_missing",
      evidence: {
        normalizedBoundaryChargeStatus:
          sameEventEnergyRoutingTarget?.normalizedBoundaryChargeStatus ?? null,
        retainedCrossingDomainPullbackStatus:
          sameEventEnergyRoutingTarget?.retainedCrossingDomainPullbackStatus ?? null,
        targetChargeNorm:
          sameEventEnergyRoutingTarget?.targetChargeNorm ?? null,
      },
    },
    {
      payload: "same_event_energy_carriers",
      state: sameEventCarrierPopulationPass ? "formal" : "missing",
      accepted: false,
      status: sameEventCarrierPopulationPass
        ? "same_event_energy_carriers_exact_formal_candidate_populated"
        : "same_event_energy_carriers_missing",
      evidence: {
        sameEventEnergyRoutingStatus:
          sameEventEnergyRoutingTarget?.status ?? null,
        sameEventRowsPass:
          sameEventEnergyRoutingTarget?.sameEventRowsPass ?? null,
        exactFormalCandidateCount:
          sameEventEnergyRoutingTarget?.exactFormalCandidateCount ?? null,
        exactFormalCandidateRows: exactFormalSameEventCarrierRows.map((row) => ({
          id: row.id,
          status: row.status,
          candidateWakeEnergyIncrement:
            finiteOrNull(row.candidateWakeEnergyIncrement),
          targetWakeEnergyIncrement:
            finiteOrNull(row.targetWakeEnergyIncrement),
          residualAbs: finiteOrNull(row.residualAbs),
        })),
      },
    },
    {
      payload: "retained_energy_routing",
      state: acceptedRetainedEnergyRoutingPass ? "accepted" : "formal",
      accepted: acceptedRetainedEnergyRoutingPass,
      status: acceptedRetainedEnergyRoutingPass
        ? "retained_energy_routing_accepted"
        : "retained_energy_routing_formal_carriers_acceptance_blocked",
      evidence: {
        sameEventEnergyRoutingStatus:
          sameEventEnergyRoutingTarget?.status ?? null,
        acceptedOmegaTxSource,
        acceptedActionScale,
        acceptedEnergyOrientation,
        acceptedWakeEnergyIncrementLaw,
        acceptanceBlockers:
          sameEventEnergyRoutingTarget?.acceptanceBlockers ?? [],
      },
    },
    {
      payload: "phase_payload",
      state: routeCompensationRequired ? "missing" : "not_required",
      accepted: !routeCompensationRequired,
      status: routeCompensationRequired
        ? "retained_phase_payload_missing_for_compensated_route"
        : "not_required_zero_slack_route",
      evidence: {
        maxRequiredPhaseCompensation:
          hingeRootBranchTransportRouteFeasibility?.maxRequiredPhaseCompensation ??
          null,
      },
    },
    {
      payload: "partition_payload",
      state: routeCompensationRequired ? "missing" : "not_required",
      accepted: !routeCompensationRequired,
      status: routeCompensationRequired
        ? "retained_vector_partition_payload_missing"
        : "not_required_zero_slack_route",
      evidence: {
        routeCompensationRequired,
      },
    },
    {
      payload: "stability_payload",
      state: routeCompensationRequired ? "blocked" : "not_required",
      accepted: !routeCompensationRequired,
      status: routeCompensationRequired
        ? "retained_section_stability_payload_missing"
        : "not_required_zero_slack_route",
      evidence: {
        routeCandidatePass,
        routeRowCount: routeRows.length,
      },
    },
    {
      payload: "full_point_event_rule",
      state: "missing",
      accepted: false,
      status: "accepted_full_point_event_rule_missing",
      evidence: {
        pointOnlyDiagonalPairKeys,
      },
    },
  ];
  const acceptedRows = payloadRows.filter((row) => row.accepted === true);
  const candidateRows = payloadRows.filter((row) => row.state === "candidate");
  const localAcceptedRows = payloadRows.filter(
    (row) => row.state === "local_accepted"
  );
  const formalRows = payloadRows.filter((row) => row.state === "formal");
  const missingRows = payloadRows.filter((row) => row.state === "missing");
  const blockedRows = payloadRows.filter((row) => row.state === "blocked");
  const acceptedRetainedPayloadRowsPass =
    payloadRows.length > 0 &&
    payloadRows.every((row) => row.accepted === true || row.state === "not_required");
  const coverageBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    allPairPointEventInputPass ? null : "all_pair_point_event_input_missing",
    providerAssistedBranchGeometryPass
      ? null
      : "endpoint_provider_assisted_branch_geometry_missing",
    compensatedRoutePayloadComplete ? null : "compensated_route_payload_missing",
    wakeBoundaryChargePullbackPopulated
      ? null
      : "wake_boundary_charge_pullback_missing",
    sameEventCarrierPopulationPass ? null : "same_event_energy_carriers_missing",
    acceptedOmegaTxSource ? null : "accepted_omega_tx_source_missing",
    acceptedActionScale ? null : "derived_sigma_hbar_action_scale_missing",
    acceptedWakeEnergyIncrementLaw ? null : "accepted_wake_energy_increment_law_missing",
    acceptedRetainedEnergyRoutingPass ? null : "accepted_retained_energy_routing_missing",
    pointOnlyDiagonalPairKeys.length > 0
      ? "point_only_diagonal_identity_rows_need_explicit_full_point_event_rule"
      : null,
    routeCompensationRequired ? "retained_phase_payload_missing" : null,
    routeCompensationRequired ? "retained_partition_payload_missing" : null,
    routeCompensationRequired ? "retained_stability_payload_missing" : null,
    pointEventTorqueCandidatePass ? "retained_torque_payload_missing" : null,
    "accepted_full_point_event_rule_missing",
  ].filter(Boolean);

  return {
    schema: "aaa-tri-binary-full-point-event-payload-coverage-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "full_point_event_payload_coverage_not_applicable_local_provider_missing"
      : partialCoveragePass
        ? "full_point_event_payload_coverage_partial_route_wake_energy_carriers_populated_acceptance_blocked"
        : compensatedRoutePayloadComplete || wakeBoundaryChargePullbackPopulated
          ? "full_point_event_payload_coverage_partial_route_or_wake_populated"
          : "full_point_event_payload_coverage_blocked",
    claimLevel:
      "fail-closed coverage diagnostic for the payload rows needed by a full point-event rule; not accepted retained payload closure",
    localEndpointProviderAcceptedPass,
    allPairPointEventInputPass,
    partialCoveragePass,
    acceptedRetainedPayloadRowsPass,
    acceptedRetainedEnergyRoutingPass,
    acceptedFullPointEventRulePass: false,
    retainedBranchClaim: false,
    routeCandidatePass,
    routeCompensationRequired,
    pointEventTorqueCandidatePass,
    providerAssistedBranchGeometryPass,
    compensatedRoutePayloadComplete,
    wakeBoundaryChargePullbackPopulated,
    sameEventCarrierPopulationPass,
    minimalBranchTransactionFrequencyStatus:
      minimalBranchTransactionFrequencyCertificate?.status ?? null,
    minimalBranchTransactionFrequencyAcceptedPass:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass ?? null,
    actionBoundaryWakeEnergyLawStatus:
      actionBoundaryWakeEnergyLawCandidate?.status ?? null,
    acceptedOmegaTxSource,
    acceptedActionScale,
    acceptedEnergyOrientation,
    acceptedWakeEnergyIncrementLaw,
    payloadRowCount: payloadRows.length,
    acceptedPayloadRowCount: acceptedRows.length,
    candidatePayloadRowCount: candidateRows.length,
    localAcceptedPayloadRowCount: localAcceptedRows.length,
    formalPayloadRowCount: formalRows.length,
    missingPayloadRowCount: missingRows.length,
    blockedPayloadRowCount: blockedRows.length,
    coverageBlockers,
    payloadRows,
    retainedLimitation:
      "Route payload, route-authorized wake pullback, and exact same-event carriers can be populated while the full point-event rule remains unaccepted. Retained promotion still needs accepted omega_tx, sigma*hbar action scale, wake-energy law, retained phase, torque, partition, stability, and an explicit full point-event rule for the point-only diagonal identity rows.",
  };
}

function createPositiveWidthRetainedDomainLiftTarget({
  hingeRootBranchTransportRouteFeasibility,
  hingeEventRowSetIdentity,
  retainedTimeDomainCoverage,
  routeAuthorizedPointEventDomainTarget,
  rootPayloadIntervalEnclosure,
  localEndpointProviderAcceptedPass,
}) {
  const pairRows = hingeEventRowSetIdentity?.rows ?? [];
  const hingeTime = hingeEventRowSetIdentity?.hingeTime ?? null;
  const pairSideRows = pairRows.map((row) =>
    createPairRootSideLiftRow({ row, hingeTime })
  );
  const pointOnlyPairRows = pairSideRows.filter(
    (row) => row.leftSidePositiveWidthPass !== true && row.rightSidePositiveWidthPass !== true
  );
  const leftMissingPairKeys = pairSideRows
    .filter((row) => row.leftSidePositiveWidthPass !== true)
    .map((row) => row.pairKey);
  const rightMissingPairKeys = pairSideRows
    .filter((row) => row.rightSidePositiveWidthPass !== true)
    .map((row) => row.pairKey);
  const allPairPositiveWidthCommonRetainedTimeDomainPass =
    (retainedTimeDomainCoverage?.maxCommonWidth ?? 0) > ROOT_TOLERANCE ||
    rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval === true ||
    rootPayloadIntervalEnclosure?.oneSidedPositiveWidthCommonInterval === true;
  const routeRows = hingeRootBranchTransportRouteFeasibility?.rows ?? [];
  const routeRowsWithPositiveWidth = routeRows.filter(
    (row) =>
      row.candidateRoutePass === true &&
      (row.minOneSidedRouteWidth ?? 0) > ROOT_TOLERANCE
  );
  const routeRestrictedPositiveWidthPass =
    routeRows.length > 0 && routeRowsWithPositiveWidth.length === routeRows.length;
  const zeroSlackBranchRoutePass =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const routeCompensationRequired =
    (hingeRootBranchTransportRouteFeasibility?.compensationRequiredMatchCount ?? 0) >
    0;
  const globalRetainedRowSetIdentityPass =
    hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ===
    "common_active_row_set_candidate_populated";
  const liftPass =
    localEndpointProviderAcceptedPass === true &&
    allPairPositiveWidthCommonRetainedTimeDomainPass &&
    routeRestrictedPositiveWidthPass &&
    zeroSlackBranchRoutePass &&
    globalRetainedRowSetIdentityPass;
  const domainLiftBlockers = [
    localEndpointProviderAcceptedPass
      ? null
      : "local_route_authorized_endpoint_provider_point_event_missing",
    globalRetainedRowSetIdentityPass ? null : "global_retained_row_set_identity_missing",
    allPairPositiveWidthCommonRetainedTimeDomainPass
      ? null
      : "all_pair_positive_width_common_retained_time_domain_missing",
    pointOnlyPairRows.length > 0 ? "point_only_pair_rows_block_all_pair_side_domain" : null,
    leftMissingPairKeys.length > 0 ? "left_side_all_pair_interval_missing" : null,
    rightMissingPairKeys.length > 0 ? "right_side_all_pair_interval_missing" : null,
    routeRestrictedPositiveWidthPass ? null : "route_restricted_positive_width_missing",
    zeroSlackBranchRoutePass ? null : "zero_slack_branch_route_missing",
    routeCompensationRequired ? "same_source_route_compensation_required" : null,
  ].filter(Boolean);
  const routeRowSummaries = routeRows.map((row) => ({
    incomingPairKey: row.incomingPairKey ?? null,
    outgoingPairKey: row.outgoingPairKey ?? null,
    continuityRole: row.continuityRole ?? null,
    candidateRoutePass: row.candidateRoutePass === true,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    routeRootKey: row.routeRootKey ?? null,
    minOneSidedRouteWidth: finiteOrNull(row.minOneSidedRouteWidth),
    incomingLeftMaxWidth: finiteOrNull(row.incomingLeftCoverage?.maxWidth),
    outgoingRightMaxWidth: finiteOrNull(row.outgoingRightCoverage?.maxWidth),
    requiredEndpointCompensationNorm: finiteOrNull(
      row.requiredEndpointCompensationNorm
    ),
    requiredClockRetune: finiteOrNull(row.requiredClockRetune),
    requiredPhaseCompensation: finiteOrNull(row.requiredPhaseCompensation),
  }));

  return {
    schema:
      "aaa-tri-binary-positive-width-retained-domain-lift-target.v1",
    status: !localEndpointProviderAcceptedPass
      ? "positive_width_retained_domain_lift_not_applicable_local_endpoint_provider_missing"
      : liftPass
        ? "positive_width_retained_domain_lift_candidate_formal_acceptance_blocked"
        : !allPairPositiveWidthCommonRetainedTimeDomainPass &&
            routeRestrictedPositiveWidthPass &&
            routeCompensationRequired
          ? "positive_width_retained_domain_lift_blocked_all_pair_point_only_and_route_compensation"
          : !allPairPositiveWidthCommonRetainedTimeDomainPass
            ? "positive_width_retained_domain_lift_blocked_all_pair_point_only"
            : routeCompensationRequired
              ? "positive_width_retained_domain_lift_blocked_route_compensation"
              : "positive_width_retained_domain_lift_blocked_global_row_set_identity",
    claimLevel:
      "fail-closed lift target distinguishing route-restricted one-sided width from the all-pair positive-width retained domain needed for global retained branch promotion",
    localEndpointProviderAcceptedPass,
    liftPass,
    retainedBranchClaim: false,
    routeAuthorizedPointEventDomainStatus:
      routeAuthorizedPointEventDomainTarget?.status ?? null,
    routeAuthorizedPointEventDomainScope:
      routeAuthorizedPointEventDomainTarget?.domainScope ?? null,
    routeRootKey:
      routeAuthorizedPointEventDomainTarget?.routeRootKey ??
      routeRows.find((row) => row.routeRootKey != null)?.routeRootKey ??
      null,
    globalRetainedRowSetIdentityPass,
    globalRetainedRowSetIdentityStatus:
      hingeEventRowSetIdentity?.globalRetainedRowSetIdentityStatus ?? null,
    allPairPositiveWidthCommonRetainedTimeDomainPass,
    retainedTimeDomainCoverageStatus:
      retainedTimeDomainCoverage?.status ?? null,
    retainedTimeDomainCommonIntervalCount:
      retainedTimeDomainCoverage?.commonIntervalCount ?? null,
    retainedTimeDomainMaxCommonWidth:
      retainedTimeDomainCoverage?.maxCommonWidth ?? null,
    retainedTimeDomainCommonHingePointCount:
      retainedTimeDomainCoverage?.commonHingePointCount ?? null,
    rootPayloadIntervalStatus:
      rootPayloadIntervalEnclosure?.status ?? null,
    positiveWidthCommonRootInterval:
      rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval ?? null,
    oneSidedPositiveWidthCommonInterval:
      rootPayloadIntervalEnclosure?.oneSidedPositiveWidthCommonInterval ??
      null,
    maxCommonRootIntervalWidth:
      rootPayloadIntervalEnclosure?.maxCommonWidth ?? null,
    leftAllPairSideCommonWidth:
      rootPayloadIntervalEnclosure?.sideCoverage?.left?.maxCommonWidth ?? null,
    rightAllPairSideCommonWidth:
      rootPayloadIntervalEnclosure?.sideCoverage?.right?.maxCommonWidth ??
      null,
    pairCount: pairSideRows.length,
    leftSidePositivePairCount: pairSideRows.filter(
      (row) => row.leftSidePositiveWidthPass === true
    ).length,
    rightSidePositivePairCount: pairSideRows.filter(
      (row) => row.rightSidePositiveWidthPass === true
    ).length,
    pointOnlyPairKeys: pointOnlyPairRows.map((row) => row.pairKey),
    leftMissingPairKeys,
    rightMissingPairKeys,
    routeRestrictedPositiveWidthPass,
    routeRestrictedPositiveWidthRowCount: routeRowsWithPositiveWidth.length,
    evaluatedRouteCount:
      hingeRootBranchTransportRouteFeasibility?.evaluatedRouteCount ?? null,
    zeroSlackBranchRoutePass,
    routeCompensationRequired,
    compensationRequiredMatchCount:
      hingeRootBranchTransportRouteFeasibility
        ?.compensationRequiredMatchCount ?? null,
    minRouteOneSidedWidth: minFinite(
      routeRows
        .map((row) => row.minOneSidedRouteWidth)
        .filter(Number.isFinite)
    ),
    maxRequiredEndpointCompensationNorm:
      hingeRootBranchTransportRouteFeasibility
        ?.maxRequiredEndpointCompensationNorm ?? null,
    maxRequiredPhaseCompensation:
      hingeRootBranchTransportRouteFeasibility?.maxRequiredPhaseCompensation ??
      null,
    domainLiftBlockers,
    pairSideRows,
    routeRows: routeRowSummaries,
    retainedLimitation:
      "The branch route has route-restricted positive one-sided width, but global retained-domain lift still needs an all-pair positive-width common retained interval or an accepted full point-event rule. Point-only identity rows and side-mismatched pair rows block the all-pair side interval, while the same-source route still requires compensation.",
  };
}

function createPairRootSideLiftRow({ row, hingeTime }) {
  const leftIntervals = createRootSideIntervals({
    rootIntervals: row.rootIntervals ?? [],
    hingeTime,
    side: "left",
  });
  const rightIntervals = createRootSideIntervals({
    rootIntervals: row.rootIntervals ?? [],
    hingeTime,
    side: "right",
  });
  const leftCoverage = summarizeHitTimeIntervals(leftIntervals);
  const rightCoverage = summarizeHitTimeIntervals(rightIntervals);
  return {
    pairKey: row.pairKey ?? null,
    incidence: row.incidence ?? null,
    rootIntervalCount: row.rootIntervalCount ?? 0,
    maxRootIntervalWidth: finiteOrNull(row.maxRootIntervalWidth),
    leftSidePositiveWidthPass: leftCoverage.maxWidth > ROOT_TOLERANCE,
    leftSideIntervalCount: leftCoverage.intervalCount,
    leftSideMaxWidth: leftCoverage.maxWidth,
    rightSidePositiveWidthPass: rightCoverage.maxWidth > ROOT_TOLERANCE,
    rightSideIntervalCount: rightCoverage.intervalCount,
    rightSideMaxWidth: rightCoverage.maxWidth,
  };
}

function createRootSideIntervals({ rootIntervals, hingeTime, side }) {
  if (!Number.isFinite(hingeTime)) {
    return [];
  }
  return rootIntervals
    .map((interval) => {
      if (side === "left") {
        return {
          start: interval.start,
          end: Math.min(interval.end, hingeTime),
        };
      }
      return {
        start: Math.max(interval.start, hingeTime),
        end: interval.end,
      };
    })
    .filter(
      (interval) =>
        Number.isFinite(interval.start) &&
        Number.isFinite(interval.end) &&
        interval.end - interval.start > ROOT_TOLERANCE
    );
}

function createSameSourceEmissionClockTransportDiagnostic({
  routeRows,
  layerByName = new Map(),
}) {
  const rows = (routeRows ?? [])
    .filter(
      (row) =>
        row.continuityRole === "same_source" &&
        row.compensationRequired === true
    )
    .map((row) =>
      createSameSourceEmissionClockTransportRow({ routeRow: row, layerByName })
    );
  const exactChartTransportRows = rows.filter(
    (row) => row.chartEmissionClockTransportPass === true
  );
  const endpointTransportRows = rows.filter(
    (row) => row.endpointEmissionClockTransportPass === true
  );
  const endpointResidualBlockedRows = rows.filter(
    (row) =>
      row.chartEmissionClockTransportPass === true &&
      row.endpointEmissionClockTransportPass !== true
  );
  const pathHistorySegmentErrorBoundedRows = rows.filter(
    (row) =>
      row.pathHistorySegmentErrorBoundDiagnostic
        ?.endpointResidualsSegmentBoundedPass === true
  );
  const endpointResidualBlockedSegmentBoundedRows = endpointResidualBlockedRows.filter(
    (row) =>
      row.pathHistorySegmentErrorBoundDiagnostic
        ?.endpointResidualsSegmentBoundedPass === true
  );
  const endpointLinearSegmentReplayRows = rows.filter(
    (row) =>
      row.endpointLinearSegmentReplayDiagnostic
        ?.linearReplayExplainsEndpointResidualsPass === true
  );
  const endpointLinearSegmentConvergenceRows = rows.filter(
    (row) =>
      row.endpointLinearSegmentReplayDiagnostic?.convergenceDiagnostic
        ?.zeroLimitConvergenceCertificatePass === true
  );
  const exactCircularEndpointReplacementRows = rows.filter(
    (row) =>
      row.exactCircularEndpointReplacementTarget
        ?.exactCircularReplacementTransportPass === true
  );
  const reducedCircularEndpointProviderRows = rows.filter(
    (row) =>
      row.exactCircularEndpointReplacementTarget
        ?.reducedCircularEndpointProviderLawCandidate
        ?.reducedProviderLawPass === true
  );
  const retainedEndpointProviderSameRowSetRows = rows.filter(
    (row) =>
      row.retainedEndpointProviderAcceptanceTarget
        ?.sameRetainedRowSetProviderPass === true
  );
  const retainedEndpointProviderAcceptedRows = rows.filter(
    (row) =>
      row.retainedEndpointProviderAcceptanceTarget
        ?.acceptedRetainedEndpointProviderPass === true
  );
  const maxEndpointAdvectionResidual = maxFinite(
    rows.map((row) => row.endpointAdvectionResidualNorm)
  );
  const maxEndpointToEmissionChartResidual = maxFinite(
    rows.map((row) => row.maxEndpointToEmissionChartResidual)
  );
  const maxEndpointPairResidualVsChartChord = maxFinite(
    rows.map((row) => row.endpointPairResidualVsChartChordAbs)
  );
  const maxPathHistorySegmentErrorBound = maxFinite(
    rows.map(
      (row) =>
        row.pathHistorySegmentErrorBoundDiagnostic?.segmentErrorBound ?? null
    )
  );
  const maxDoublePathHistorySegmentErrorBound = maxFinite(
    rows.map(
      (row) =>
        row.pathHistorySegmentErrorBoundDiagnostic?.doubleSegmentErrorBound ??
        null
    )
  );
  const maxEndpointLinearReplayResidual = maxFinite(
    rows.map(
      (row) =>
        row.endpointLinearSegmentReplayDiagnostic
          ?.maxEndpointLinearReplayResidual ?? null
    )
  );
  const maxLinearToExactCircularResidual = maxFinite(
    rows.map(
      (row) =>
        row.endpointLinearSegmentReplayDiagnostic
          ?.maxLinearToExactCircularResidual ?? null
    )
  );
  const maxExactCircularEndpointCorrectionNorm = maxFinite(
    rows.map(
      (row) =>
        row.exactCircularEndpointReplacementTarget
          ?.maxEndpointCorrectionNorm ?? null
    )
  );
  const maxExactCircularReplacementTransportResidual = maxFinite(
    rows.map(
      (row) =>
        row.exactCircularEndpointReplacementTarget
          ?.replacementAdvectionResidualNorm ?? null
    )
  );
  const maxReducedCircularEndpointProviderPointResidual = maxFinite(
    rows.map(
      (row) =>
        row.exactCircularEndpointReplacementTarget
          ?.reducedCircularEndpointProviderLawCandidate
          ?.maxProviderPointResidualNorm ?? null
    )
  );
  const maxReducedCircularEndpointProviderAdvectionResidual = maxFinite(
    rows.map(
      (row) =>
        row.exactCircularEndpointReplacementTarget
          ?.reducedCircularEndpointProviderLawCandidate
          ?.providerAdvectionResidualNorm ?? null
    )
  );
  const pathHistorySegmentErrorBoundStatus =
    rows.length === 0
      ? "same_source_path_history_segment_error_bound_not_required"
      : pathHistorySegmentErrorBoundedRows.length === rows.length
        ? "same_source_path_history_segment_error_bound_contains_endpoint_residuals"
        : pathHistorySegmentErrorBoundedRows.length > 0
          ? "same_source_path_history_segment_error_bound_partial"
          : "same_source_path_history_segment_error_bound_exceeded_or_inputs_missing";
  const endpointLinearSegmentReplayStatus =
    rows.length === 0
      ? "same_source_endpoint_linear_segment_replay_not_required"
      : endpointLinearSegmentReplayRows.length === rows.length
        ? "same_source_endpoint_linear_segment_replay_identifies_linearization_error"
        : endpointLinearSegmentReplayRows.length > 0
          ? "same_source_endpoint_linear_segment_replay_partial"
          : "same_source_endpoint_linear_segment_replay_unexplained_or_inputs_missing";
  const endpointLinearSegmentConvergenceStatus =
    rows.length === 0
      ? "same_source_endpoint_linear_segment_convergence_not_required"
      : endpointLinearSegmentConvergenceRows.length === rows.length
        ? "same_source_endpoint_linear_segment_convergence_certificate_populated"
        : endpointLinearSegmentConvergenceRows.length > 0
          ? "same_source_endpoint_linear_segment_convergence_partial"
          : "same_source_endpoint_linear_segment_convergence_not_established";
  const exactCircularEndpointReplacementStatus =
    rows.length === 0
      ? "same_source_exact_circular_endpoint_replacement_not_required"
      : exactCircularEndpointReplacementRows.length === rows.length
        ? "same_source_exact_circular_endpoint_replacement_target_populated"
        : exactCircularEndpointReplacementRows.length > 0
          ? "same_source_exact_circular_endpoint_replacement_partial"
          : "same_source_exact_circular_endpoint_replacement_not_populated";
  const reducedCircularEndpointProviderLawStatus =
    rows.length === 0
      ? "same_source_reduced_circular_endpoint_provider_law_not_required"
      : reducedCircularEndpointProviderRows.length === rows.length
        ? "same_source_reduced_circular_endpoint_provider_law_candidate_populated"
        : reducedCircularEndpointProviderRows.length > 0
          ? "same_source_reduced_circular_endpoint_provider_law_partial"
          : "same_source_reduced_circular_endpoint_provider_law_not_populated";
  const retainedEndpointProviderAcceptanceStatus =
    rows.length === 0
      ? "same_source_retained_endpoint_provider_acceptance_not_required"
      : retainedEndpointProviderAcceptedRows.length === rows.length
        ? "same_source_retained_endpoint_provider_accepted"
        : retainedEndpointProviderSameRowSetRows.length === rows.length
          ? "same_source_retained_endpoint_provider_same_row_set_populated_domain_blocked"
          : retainedEndpointProviderSameRowSetRows.length > 0
            ? "same_source_retained_endpoint_provider_same_row_set_partial"
            : "same_source_retained_endpoint_provider_same_row_set_not_populated";

  return {
    schema:
      "aaa-tri-binary-same-source-emission-clock-transport-diagnostic.v1",
    status:
      rows.length === 0
        ? "same_source_emission_clock_transport_not_required"
        : endpointTransportRows.length === rows.length
          ? "same_source_emission_clock_transport_endpoint_candidate_formal_acceptance_blocked"
          : exactChartTransportRows.length === rows.length
            ? "same_source_emission_clock_transport_chart_exact_endpoint_residual_blocked"
            : exactChartTransportRows.length > 0
              ? "same_source_emission_clock_transport_partial_chart_exact_endpoint_residual_blocked"
              : "same_source_emission_clock_transport_chart_residual_blocked",
    claimLevel:
      "diagnostic separating exact same-source middle-chart emission-clock transport from sampled endpoint/path-history residuals; not retained branch acceptance",
    evaluatedRowCount: rows.length,
    exactChartTransportRowCount: exactChartTransportRows.length,
    endpointTransportRowCount: endpointTransportRows.length,
    endpointResidualBlockedRowCount: endpointResidualBlockedRows.length,
    pathHistorySegmentErrorBoundStatus,
    pathHistorySegmentErrorBoundedRowCount:
      pathHistorySegmentErrorBoundedRows.length,
    endpointResidualBlockedSegmentBoundedRowCount:
      endpointResidualBlockedSegmentBoundedRows.length,
    endpointLinearSegmentReplayStatus,
    endpointLinearSegmentReplayRowCount:
      endpointLinearSegmentReplayRows.length,
    endpointLinearSegmentConvergenceStatus,
    endpointLinearSegmentConvergenceRowCount:
      endpointLinearSegmentConvergenceRows.length,
    exactCircularEndpointReplacementStatus,
    exactCircularEndpointReplacementRowCount:
      exactCircularEndpointReplacementRows.length,
    reducedCircularEndpointProviderLawStatus,
    reducedCircularEndpointProviderLawRowCount:
      reducedCircularEndpointProviderRows.length,
    retainedEndpointProviderAcceptanceStatus,
    retainedEndpointProviderSameRowSetRowCount:
      retainedEndpointProviderSameRowSetRows.length,
    retainedEndpointProviderAcceptedRowCount:
      retainedEndpointProviderAcceptedRows.length,
    maxEndpointAdvectionResidual,
    maxEndpointToEmissionChartResidual,
    maxEndpointPairResidualVsChartChord,
    maxPathHistorySegmentErrorBound,
    maxDoublePathHistorySegmentErrorBound,
    maxEndpointLinearReplayResidual,
    maxLinearToExactCircularResidual,
    maxExactCircularEndpointCorrectionNorm,
    maxExactCircularReplacementTransportResidual,
    maxReducedCircularEndpointProviderPointResidual,
    maxReducedCircularEndpointProviderAdvectionResidual,
    rows,
    retainedLimitation:
      "Exact emission-clock chart transport can explain the middle source clock/phase jump at the chart level, and the current endpoint residuals can be identified as finite linear path-segment interpolation error and compared against the finite path-history segment error bound. The exact circular endpoint replacement target identifies the endpoint correction that would make same-source endpoint transport exact. The reduced endpoint provider is now checked against the same route/root-key row set, but retained acceptance still requires an accepted retained point-event rule or positive-width common retained time domain plus wake, partition, torque, phase, route, and stability payload closure.",
  };
}

function createSameSourceEmissionClockTransportRow({ routeRow, layerByName }) {
  const layer = layerByName.get(routeRow.continuityLayer) ?? null;
  const incomingGeometry = routeRow.incomingPairEndpointGeometry ?? null;
  const outgoingGeometry = routeRow.outgoingPairEndpointGeometry ?? null;
  const incomingClockTime = incomingGeometry?.emissionTime ?? null;
  const outgoingClockTime = outgoingGeometry?.emissionTime ?? null;
  const incomingEndpointPoint = routeRow.incomingPoint ?? null;
  const outgoingEndpointPoint = routeRow.outgoingPoint ?? null;
  const clockTimeJump =
    Number.isFinite(incomingClockTime) && Number.isFinite(outgoingClockTime)
      ? incomingClockTime - outgoingClockTime
      : null;
  const phaseJump =
    layer && Number.isFinite(clockTimeJump)
      ? layer.angularVelocity * clockTimeJump
      : null;
  const wrappedPhaseJump = Number.isFinite(phaseJump)
    ? wrapAngleToPi(phaseJump)
    : null;
  const requiredPhaseResidual =
    Number.isFinite(routeRow.requiredPhaseCompensation) &&
    Number.isFinite(wrappedPhaseJump)
      ? Math.abs(routeRow.requiredPhaseCompensation) - Math.abs(wrappedPhaseJump)
      : null;
  const incomingChartPoint =
    layer && Number.isFinite(incomingClockTime)
      ? computeCircularLayerPoint(layer, incomingClockTime)
      : null;
  const outgoingChartPoint =
    layer && Number.isFinite(outgoingClockTime)
      ? computeCircularLayerPoint(layer, outgoingClockTime)
      : null;
  const predictedOutgoingChartPoint =
    incomingChartPoint && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingChartPoint, -phaseJump)
      : null;
  const chartAdvectionResidualVector =
    predictedOutgoingChartPoint && outgoingChartPoint
      ? subtractVectors(predictedOutgoingChartPoint, outgoingChartPoint)
      : null;
  const chartAdvectionResidualNorm = chartAdvectionResidualVector
    ? vectorNorm(chartAdvectionResidualVector)
    : null;
  const chartChord =
    incomingChartPoint && outgoingChartPoint
      ? vectorNorm(subtractVectors(incomingChartPoint, outgoingChartPoint))
      : null;
  const circularChordFromClock =
    layer && Number.isFinite(wrappedPhaseJump)
      ? Math.abs(2 * layer.radius * Math.sin(wrappedPhaseJump / 2))
      : null;
  const chartChordResidual =
    Number.isFinite(chartChord) && Number.isFinite(circularChordFromClock)
      ? chartChord - circularChordFromClock
      : null;
  const predictedOutgoingEndpointPoint =
    isFiniteVector(incomingEndpointPoint) && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingEndpointPoint, -phaseJump)
      : null;
  const endpointAdvectionResidualVector =
    predictedOutgoingEndpointPoint && isFiniteVector(outgoingEndpointPoint)
      ? subtractVectors(predictedOutgoingEndpointPoint, outgoingEndpointPoint)
      : null;
  const endpointAdvectionResidualNorm = endpointAdvectionResidualVector
    ? vectorNorm(endpointAdvectionResidualVector)
    : null;
  const incomingEndpointToEmissionChartResidual =
    isFiniteVector(incomingEndpointPoint) && incomingChartPoint
      ? vectorNorm(subtractVectors(incomingEndpointPoint, incomingChartPoint))
      : null;
  const outgoingEndpointToEmissionChartResidual =
    isFiniteVector(outgoingEndpointPoint) && outgoingChartPoint
      ? vectorNorm(subtractVectors(outgoingEndpointPoint, outgoingChartPoint))
      : null;
  const maxEndpointToEmissionChartResidual = maxFinite([
    incomingEndpointToEmissionChartResidual,
    outgoingEndpointToEmissionChartResidual,
  ]);
  const endpointPairResidualVsChartChord =
    Number.isFinite(routeRow.endpointPairResidual) && Number.isFinite(chartChord)
      ? routeRow.endpointPairResidual - chartChord
      : null;
  const endpointPairResidualVsChartChordAbs = Number.isFinite(
    endpointPairResidualVsChartChord
  )
    ? Math.abs(endpointPairResidualVsChartChord)
    : null;
  const chartEmissionClockTransportPass =
    Number.isFinite(clockTimeJump) &&
    Number.isFinite(phaseJump) &&
    Number.isFinite(chartAdvectionResidualNorm) &&
    chartAdvectionResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(chartChordResidual) &&
    Math.abs(chartChordResidual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(requiredPhaseResidual) &&
    Math.abs(requiredPhaseResidual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const endpointEmissionClockTransportPass =
    chartEmissionClockTransportPass &&
    Number.isFinite(endpointAdvectionResidualNorm) &&
    endpointAdvectionResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(maxEndpointToEmissionChartResidual) &&
    maxEndpointToEmissionChartResidual <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const endpointLinearSegmentReplayDiagnostic =
    createSameSourceEndpointLinearSegmentReplayDiagnostic({
      layer,
      incomingClockTime,
      outgoingClockTime,
      incomingEndpointPoint,
      outgoingEndpointPoint,
      incomingChartPoint,
      outgoingChartPoint,
    });
  const pathHistorySegmentErrorBoundDiagnostic =
    createSameSourcePathHistorySegmentErrorBoundDiagnostic({
      layer,
      endpointAdvectionResidualNorm,
      maxEndpointToEmissionChartResidual,
      endpointPairResidualVsChartChordAbs,
    });
  const exactCircularEndpointReplacementTarget =
    createSameSourceExactCircularEndpointReplacementTarget({
      layer,
      incomingClockTime,
      outgoingClockTime,
      phaseJump,
      incomingEndpointPoint,
      outgoingEndpointPoint,
      incomingChartPoint,
      outgoingChartPoint,
      chartChord,
      endpointPairResidual: routeRow.endpointPairResidual,
      endpointAdvectionResidualNorm,
    });
  const retainedEndpointProviderAcceptanceTarget =
    createSameSourceRetainedEndpointProviderAcceptanceTarget({
      routeRow,
      exactCircularEndpointReplacementTarget,
    });

  return {
    incomingPairKey: routeRow.incomingPairKey,
    outgoingPairKey: routeRow.outgoingPairKey,
    continuityRole: routeRow.continuityRole,
    continuityLayer: routeRow.continuityLayer,
    routeRootKey: routeRow.routeRootKey ?? null,
    status: !layer
      ? "same_source_emission_clock_transport_layer_missing"
      : !Number.isFinite(clockTimeJump)
        ? "same_source_emission_clock_transport_clock_missing"
        : endpointEmissionClockTransportPass
          ? "same_source_emission_clock_transport_endpoint_candidate_formal_acceptance_blocked"
          : chartEmissionClockTransportPass
            ? "same_source_emission_clock_transport_chart_exact_endpoint_residual_blocked"
            : "same_source_emission_clock_transport_chart_residual_blocked",
    chartEmissionClockTransportPass,
    endpointEmissionClockTransportPass,
    angularVelocity: layer?.angularVelocity ?? null,
    radius: layer?.radius ?? null,
    incomingClockTime,
    outgoingClockTime,
    clockTimeJump,
    phaseJump,
    wrappedPhaseJump,
    requiredClockRetune: finiteOrNull(routeRow.requiredClockRetune),
    requiredPhaseCompensation: finiteOrNull(routeRow.requiredPhaseCompensation),
    requiredPhaseResidual,
    incomingChartPoint,
    outgoingChartPoint,
    predictedOutgoingChartPoint,
    chartAdvectionResidualVector,
    chartAdvectionResidualNorm,
    chartChord,
    circularChordFromClock,
    chartChordResidual,
    incomingEndpointPoint,
    outgoingEndpointPoint,
    predictedOutgoingEndpointPoint,
    endpointAdvectionResidualVector,
    endpointAdvectionResidualNorm,
    incomingEndpointToEmissionChartResidual,
    outgoingEndpointToEmissionChartResidual,
    maxEndpointToEmissionChartResidual,
    endpointPairResidual: finiteOrNull(routeRow.endpointPairResidual),
    endpointPairResidualVsChartChord,
    endpointPairResidualVsChartChordAbs,
    endpointLinearSegmentReplayDiagnostic,
    pathHistorySegmentErrorBoundDiagnostic,
    exactCircularEndpointReplacementTarget,
    retainedEndpointProviderAcceptanceTarget,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
  };
}

function createSameSourceExactCircularEndpointReplacementTarget({
  layer,
  incomingClockTime,
  outgoingClockTime,
  phaseJump,
  incomingEndpointPoint,
  outgoingEndpointPoint,
  incomingChartPoint,
  outgoingChartPoint,
  chartChord,
  endpointPairResidual,
  endpointAdvectionResidualNorm,
}) {
  const incomingEndpointCorrectionVector =
    isFiniteVector(incomingEndpointPoint) && isFiniteVector(incomingChartPoint)
      ? subtractVectors(incomingChartPoint, incomingEndpointPoint)
      : null;
  const outgoingEndpointCorrectionVector =
    isFiniteVector(outgoingEndpointPoint) && isFiniteVector(outgoingChartPoint)
      ? subtractVectors(outgoingChartPoint, outgoingEndpointPoint)
      : null;
  const incomingEndpointCorrectionNorm = incomingEndpointCorrectionVector
    ? vectorNorm(incomingEndpointCorrectionVector)
    : null;
  const outgoingEndpointCorrectionNorm = outgoingEndpointCorrectionVector
    ? vectorNorm(outgoingEndpointCorrectionVector)
    : null;
  const maxEndpointCorrectionNorm = maxFinite([
    incomingEndpointCorrectionNorm,
    outgoingEndpointCorrectionNorm,
  ]);
  const predictedOutgoingReplacementPoint =
    isFiniteVector(incomingChartPoint) && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingChartPoint, -phaseJump)
      : null;
  const replacementAdvectionResidualVector =
    predictedOutgoingReplacementPoint && isFiniteVector(outgoingChartPoint)
      ? subtractVectors(predictedOutgoingReplacementPoint, outgoingChartPoint)
      : null;
  const replacementAdvectionResidualNorm = replacementAdvectionResidualVector
    ? vectorNorm(replacementAdvectionResidualVector)
    : null;
  const transportedIncomingCorrectionVector =
    incomingEndpointCorrectionVector && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingEndpointCorrectionVector, -phaseJump)
      : null;
  const endpointCorrectionTransportBalanceVector =
    transportedIncomingCorrectionVector && outgoingEndpointCorrectionVector
      ? subtractVectors(
          transportedIncomingCorrectionVector,
          outgoingEndpointCorrectionVector
        )
      : null;
  const endpointCorrectionTransportBalanceNorm =
    endpointCorrectionTransportBalanceVector
      ? vectorNorm(endpointCorrectionTransportBalanceVector)
      : null;
  const endpointCorrectionBalancesSampledAdvectionPass =
    Number.isFinite(endpointCorrectionTransportBalanceNorm) &&
    Number.isFinite(endpointAdvectionResidualNorm) &&
    Math.abs(
      endpointCorrectionTransportBalanceNorm - endpointAdvectionResidualNorm
    ) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const replacementEndpointPairDistance =
    isFiniteVector(incomingChartPoint) && isFiniteVector(outgoingChartPoint)
      ? vectorNorm(subtractVectors(incomingChartPoint, outgoingChartPoint))
      : null;
  const replacementEndpointPairResidualVsChartChord =
    Number.isFinite(replacementEndpointPairDistance) &&
    Number.isFinite(chartChord)
      ? replacementEndpointPairDistance - chartChord
      : null;
  const sampledEndpointPairToReplacementDistanceDelta =
    Number.isFinite(endpointPairResidual) &&
    Number.isFinite(replacementEndpointPairDistance)
      ? endpointPairResidual - replacementEndpointPairDistance
      : null;
  const inputsPopulated =
    layer != null &&
    Number.isFinite(incomingClockTime) &&
    Number.isFinite(outgoingClockTime) &&
    Number.isFinite(phaseJump) &&
    isFiniteVector(incomingEndpointPoint) &&
    isFiniteVector(outgoingEndpointPoint) &&
    isFiniteVector(incomingChartPoint) &&
    isFiniteVector(outgoingChartPoint);
  const exactCircularReplacementTransportPass =
    inputsPopulated &&
    Number.isFinite(replacementAdvectionResidualNorm) &&
    replacementAdvectionResidualNorm <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(replacementEndpointPairResidualVsChartChord) &&
    Math.abs(replacementEndpointPairResidualVsChartChord) <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const reducedCircularEndpointProviderLawCandidate =
    createSameSourceReducedCircularEndpointProviderLawCandidate({
      layer,
      incomingClockTime,
      outgoingClockTime,
      phaseJump,
      incomingReplacementPoint: incomingChartPoint,
      outgoingReplacementPoint: outgoingChartPoint,
      exactCircularReplacementTransportPass,
    });

  return {
    schema:
      "aaa-tri-binary-same-source-exact-circular-endpoint-replacement-target.v1",
    status: !inputsPopulated
      ? "same_source_exact_circular_endpoint_replacement_inputs_missing"
      : exactCircularReplacementTransportPass
        ? "same_source_exact_circular_endpoint_replacement_target_populated_formal_acceptance_blocked"
        : "same_source_exact_circular_endpoint_replacement_residual_blocked",
    claimLevel:
      "candidate exact circular endpoint replacement target for the same-source middle route; not physical path-history transport or retained branch acceptance",
    acceptedExactEndpointReplayPass: false,
    exactCircularReplacementTransportPass,
    endpointProviderRequirement:
      "curved exact-circular source path-history endpoint provider or retained-domain transport law on the same route",
    blockingPayloads: [
      "physical_endpoint_replacement_law",
      "retained_domain_transport_law",
      "positive_width_common_retained_time_domain_or_accepted_point_event",
      "wake_partition_torque_phase_route_stability_payloads",
    ],
    incomingClockTime,
    outgoingClockTime,
    phaseJump,
    incomingEndpointPoint,
    outgoingEndpointPoint,
    incomingReplacementPoint: incomingChartPoint,
    outgoingReplacementPoint: outgoingChartPoint,
    predictedOutgoingReplacementPoint,
    incomingEndpointCorrectionVector,
    outgoingEndpointCorrectionVector,
    incomingEndpointCorrectionNorm,
    outgoingEndpointCorrectionNorm,
    maxEndpointCorrectionNorm,
    transportedIncomingCorrectionVector,
    endpointCorrectionTransportBalanceVector,
    endpointCorrectionTransportBalanceNorm,
    endpointCorrectionBalancesSampledAdvectionPass,
    sampledEndpointAdvectionResidualNorm: endpointAdvectionResidualNorm,
    replacementAdvectionResidualVector,
    replacementAdvectionResidualNorm,
    replacementEndpointPairDistance,
    chartChord,
    replacementEndpointPairResidualVsChartChord,
    sampledEndpointPairDistance: finiteOrNull(endpointPairResidual),
    sampledEndpointPairToReplacementDistanceDelta,
    reducedCircularEndpointProviderLawCandidate,
    retainedLimitation:
      "Replacing the sampled finite linear endpoint with the exact circular chart endpoint makes same-source endpoint transport exact at the diagnostic level. Acceptance still requires a physical endpoint provider or retained-domain transport law that carries this replacement on the same retained rows.",
  };
}

function createSameSourceReducedCircularEndpointProviderLawCandidate({
  layer,
  incomingClockTime,
  outgoingClockTime,
  phaseJump,
  incomingReplacementPoint,
  outgoingReplacementPoint,
  exactCircularReplacementTransportPass,
}) {
  const incomingProviderPoint =
    layer && Number.isFinite(incomingClockTime)
      ? computeCircularLayerPoint(layer, incomingClockTime)
      : null;
  const outgoingProviderPoint =
    layer && Number.isFinite(outgoingClockTime)
      ? computeCircularLayerPoint(layer, outgoingClockTime)
      : null;
  const incomingProviderVelocity =
    layer && Number.isFinite(incomingClockTime)
      ? computeCircularLayerVelocity(layer, incomingClockTime)
      : null;
  const outgoingProviderVelocity =
    layer && Number.isFinite(outgoingClockTime)
      ? computeCircularLayerVelocity(layer, outgoingClockTime)
      : null;
  const incomingProviderResidualVector =
    isFiniteVector(incomingProviderPoint) &&
    isFiniteVector(incomingReplacementPoint)
      ? subtractVectors(incomingProviderPoint, incomingReplacementPoint)
      : null;
  const outgoingProviderResidualVector =
    isFiniteVector(outgoingProviderPoint) &&
    isFiniteVector(outgoingReplacementPoint)
      ? subtractVectors(outgoingProviderPoint, outgoingReplacementPoint)
      : null;
  const incomingProviderResidualNorm = incomingProviderResidualVector
    ? vectorNorm(incomingProviderResidualVector)
    : null;
  const outgoingProviderResidualNorm = outgoingProviderResidualVector
    ? vectorNorm(outgoingProviderResidualVector)
    : null;
  const maxProviderPointResidualNorm = maxFinite([
    incomingProviderResidualNorm,
    outgoingProviderResidualNorm,
  ]);
  const predictedOutgoingProviderPoint =
    isFiniteVector(incomingProviderPoint) && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingProviderPoint, -phaseJump)
      : null;
  const providerAdvectionResidualVector =
    predictedOutgoingProviderPoint && isFiniteVector(outgoingProviderPoint)
      ? subtractVectors(predictedOutgoingProviderPoint, outgoingProviderPoint)
      : null;
  const providerAdvectionResidualNorm = providerAdvectionResidualVector
    ? vectorNorm(providerAdvectionResidualVector)
    : null;
  const inputsPopulated =
    layer != null &&
    Number.isFinite(incomingClockTime) &&
    Number.isFinite(outgoingClockTime) &&
    Number.isFinite(phaseJump) &&
    isFiniteVector(incomingReplacementPoint) &&
    isFiniteVector(outgoingReplacementPoint);
  const reducedProviderLawPass =
    inputsPopulated &&
    exactCircularReplacementTransportPass === true &&
    Number.isFinite(maxProviderPointResidualNorm) &&
    maxProviderPointResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(providerAdvectionResidualNorm) &&
    providerAdvectionResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    schema:
      "aaa-tri-binary-same-source-reduced-circular-endpoint-provider-law-candidate.v1",
    status: !inputsPopulated
      ? "same_source_reduced_circular_endpoint_provider_law_inputs_missing"
      : reducedProviderLawPass
        ? "same_source_reduced_circular_endpoint_provider_law_candidate_populated_formal_acceptance_blocked"
        : "same_source_reduced_circular_endpoint_provider_law_residual_blocked",
    claimLevel:
      "reduced exact circular endpoint-provider law candidate for the same-source middle route; not retained path-history provider acceptance",
    providerKind: "exact_circular_layer_clock",
    providerFormula:
      "p_l(t)=(R_l cos(omega_l t + phi_l), R_l sin(omega_l t + phi_l), 0)",
    providerVelocityFormula: "dp_l/dt=omega_l zhat x p_l(t)",
    providerDomain:
      "same-source middle route incoming and outgoing emission clocks",
    reducedProviderLawPass,
    acceptedRetainedEndpointProviderPass: false,
    exactCircularReplacementTransportPass,
    layer: layer?.layer ?? null,
    radius: finiteOrNull(layer?.radius),
    angularVelocity: finiteOrNull(layer?.angularVelocity),
    phaseAtEpoch: finiteOrNull(layer?.phaseAtEpoch),
    incomingClockTime,
    outgoingClockTime,
    phaseJump,
    incomingProviderPoint,
    outgoingProviderPoint,
    incomingProviderVelocity,
    outgoingProviderVelocity,
    incomingProviderResidualVector,
    outgoingProviderResidualVector,
    incomingProviderResidualNorm,
    outgoingProviderResidualNorm,
    maxProviderPointResidualNorm,
    predictedOutgoingProviderPoint,
    providerAdvectionResidualVector,
    providerAdvectionResidualNorm,
    retainedAcceptanceBlockers: [
      "path_history_stream_must_carry_curved_endpoint_provider",
      "same_retained_row_set_transport_law",
      "positive_width_common_retained_time_domain_or_accepted_point_event",
      "wake_partition_torque_phase_route_stability_payloads",
    ],
    retainedLimitation:
      "The reduced circular layer law supplies exact replacement endpoints for the sampled same-source route. It is not accepted as retained transport until the path-history stream or retained-domain law carries the same provider on the same retained rows.",
  };
}

function createSameSourceRetainedEndpointProviderAcceptanceTarget({
  routeRow,
  exactCircularEndpointReplacementTarget,
}) {
  const provider =
    exactCircularEndpointReplacementTarget
      ?.reducedCircularEndpointProviderLawCandidate ?? null;
  const routeRootKey = routeRow?.routeRootKey ?? null;
  const incomingRootKey =
    routeRow?.incomingPairEndpointGeometry?.rootKey ?? null;
  const outgoingRootKey =
    routeRow?.outgoingPairEndpointGeometry?.rootKey ?? null;
  const routeRootKeyToken =
    routeRootKey == null ? null : String(routeRootKey);
  const incomingRootKeyToken =
    incomingRootKey == null ? null : String(incomingRootKey);
  const outgoingRootKeyToken =
    outgoingRootKey == null ? null : String(outgoingRootKey);
  const routeRootKeyPass =
    routeRootKeyToken != null &&
    incomingRootKeyToken != null &&
    outgoingRootKeyToken != null &&
    routeRootKeyToken === incomingRootKeyToken &&
    routeRootKeyToken === outgoingRootKeyToken;
  const routeRowSetInputsPopulated =
    routeRow != null &&
    routeRow.incomingPairKey != null &&
    routeRow.outgoingPairKey != null &&
    routeRootKeyPass &&
    routeRow.continuityRole === "same_source" &&
    routeRow.continuityLayer === provider?.layer;
  const sameRetainedRowSetProviderPass =
    routeRowSetInputsPopulated &&
    routeRow.candidateRoutePass === true &&
    exactCircularEndpointReplacementTarget
      ?.exactCircularReplacementTransportPass === true &&
    provider?.reducedProviderLawPass === true;
  const routeAuthorizedPointEventDomainTarget =
    createSameSourceRouteAuthorizedEndpointProviderPointEventDomainTarget({
      routeRow,
      sameRetainedRowSetProviderPass,
    });
  const acceptedRetainedPointEventOrPositiveWidthDomainPass =
    routeAuthorizedPointEventDomainTarget
      .acceptedRouteAuthorizedPointEventDomainPass === true;
  const acceptedRetainedEndpointProviderPass =
    sameRetainedRowSetProviderPass &&
    acceptedRetainedPointEventOrPositiveWidthDomainPass;
  const retainedAcceptanceBlockers = acceptedRetainedEndpointProviderPass
    ? []
    : sameRetainedRowSetProviderPass
    ? [
        "accepted_retained_point_event_rule_or_positive_width_common_retained_time_domain",
      ]
    : [
        "same_route_root_key_identity",
        "same_source_middle_continuity_route",
        "exact_circular_endpoint_provider_law",
      ];

  return {
    schema:
      "aaa-tri-binary-same-source-retained-endpoint-provider-acceptance-target.v1",
    status: !provider
      ? "same_source_retained_endpoint_provider_candidate_missing"
      : acceptedRetainedEndpointProviderPass
        ? "same_source_retained_endpoint_provider_route_authorized_point_event_accepted"
        : sameRetainedRowSetProviderPass
          ? "same_source_retained_endpoint_provider_same_row_set_populated_domain_blocked"
          : "same_source_retained_endpoint_provider_same_row_set_blocked",
    claimLevel:
      "route-authorized retained endpoint-provider acceptance target for the same-source middle route; not global retained branch acceptance",
    acceptedRetainedEndpointProviderPass,
    sameRetainedRowSetProviderPass,
    acceptedRetainedPointEventOrPositiveWidthDomainPass,
    acceptedPointEventRuleScope:
      acceptedRetainedEndpointProviderPass
        ? "route_authorized_endpoint_provider_point_event_only"
        : null,
    routeRowSetInputsPopulated,
    routeRootKeyPass,
    routeRootKey,
    incomingRootKey,
    outgoingRootKey,
    incomingPairKey: routeRow?.incomingPairKey ?? null,
    outgoingPairKey: routeRow?.outgoingPairKey ?? null,
    continuityRole: routeRow?.continuityRole ?? null,
    continuityLayer: routeRow?.continuityLayer ?? null,
    providerLayer: provider?.layer ?? null,
    candidateRoutePass: routeRow?.candidateRoutePass === true,
    zeroSlackRoutePass: routeRow?.zeroSlackRoutePass === true,
    compensationRequired: routeRow?.compensationRequired === true,
    minOneSidedRouteWidth: finiteOrNull(routeRow?.minOneSidedRouteWidth),
    providerKind: provider?.providerKind ?? null,
    reducedProviderLawPass: provider?.reducedProviderLawPass === true,
    exactCircularReplacementTransportPass:
      exactCircularEndpointReplacementTarget
        ?.exactCircularReplacementTransportPass === true,
    maxProviderPointResidualNorm: finiteOrNull(
      provider?.maxProviderPointResidualNorm
    ),
    providerAdvectionResidualNorm: finiteOrNull(
      provider?.providerAdvectionResidualNorm
    ),
    replacementAdvectionResidualNorm: finiteOrNull(
      exactCircularEndpointReplacementTarget
        ?.replacementAdvectionResidualNorm
    ),
    routeAuthorizedPointEventDomainTarget,
    incomingProviderPoint: provider?.incomingProviderPoint ?? null,
    outgoingProviderPoint: provider?.outgoingProviderPoint ?? null,
    incomingReplacementPoint:
      exactCircularEndpointReplacementTarget?.incomingReplacementPoint ?? null,
    outgoingReplacementPoint:
      exactCircularEndpointReplacementTarget?.outgoingReplacementPoint ?? null,
    retainedAcceptanceBlockers,
    remainingBranchClosureBlockers: [
      "global_retained_branch_claim",
      "geometrically_continuous_branch_transport_or_full_point_event_rule",
      "wake_partition_torque_phase_route_stability_payloads",
      "accepted_omega_tx_action_scale_and_wake_energy_law",
    ],
    retainedLimitation:
      "The exact circular endpoint provider is accepted only for the route-authorized point-event domain when acceptedRetainedEndpointProviderPass is true. This local acceptance does not create a global retained branch claim, a positive-width common retained time domain, or wake, partition, torque, phase, route, stability, omega_tx, action-scale, and wake-energy closure.",
  };
}

function createSameSourceRouteAuthorizedEndpointProviderPointEventDomainTarget({
  routeRow,
  sameRetainedRowSetProviderPass,
}) {
  const incomingLeftCoverage = routeRow?.incomingLeftCoverage ?? null;
  const outgoingRightCoverage = routeRow?.outgoingRightCoverage ?? null;
  const incomingLeftWidth = finiteOrNull(incomingLeftCoverage?.maxWidth);
  const outgoingRightWidth = finiteOrNull(outgoingRightCoverage?.maxWidth);
  const minOneSidedRouteWidth = finiteOrNull(routeRow?.minOneSidedRouteWidth);
  const oneSidedRouteWidthPass =
    Number.isFinite(minOneSidedRouteWidth) &&
    minOneSidedRouteWidth > ROOT_TOLERANCE &&
    Number.isFinite(incomingLeftWidth) &&
    incomingLeftWidth > ROOT_TOLERANCE &&
    Number.isFinite(outgoingRightWidth) &&
    outgoingRightWidth > ROOT_TOLERANCE;
  const routeRootKeyPass = routeRow?.routeRootKey != null;
  const routeCarrierPass =
    routeRow?.candidateRoutePass === true &&
    routeRow?.continuityRole === "same_source" &&
    routeRow?.continuityLayer === "middle" &&
    routeRootKeyPass;
  const acceptedRouteAuthorizedPointEventDomainPass =
    sameRetainedRowSetProviderPass === true &&
    routeCarrierPass &&
    oneSidedRouteWidthPass;

  return {
    schema:
      "aaa-tri-binary-same-source-route-authorized-endpoint-provider-point-event-domain.v1",
    status: acceptedRouteAuthorizedPointEventDomainPass
      ? "route_authorized_endpoint_provider_point_event_domain_accepted"
      : routeCarrierPass && sameRetainedRowSetProviderPass
        ? "route_authorized_endpoint_provider_point_event_domain_width_blocked"
        : "route_authorized_endpoint_provider_point_event_domain_route_blocked",
    claimLevel:
      "route-authorized point-event domain for exact same-source endpoint-provider transport; not positive-width common retained branch domain",
    acceptedRouteAuthorizedPointEventDomainPass,
    retainedBranchClaim: false,
    domainScope: "same_source_endpoint_provider_route_only",
    routeRootKey: routeRow?.routeRootKey ?? null,
    incomingPairKey: routeRow?.incomingPairKey ?? null,
    outgoingPairKey: routeRow?.outgoingPairKey ?? null,
    continuityRole: routeRow?.continuityRole ?? null,
    continuityLayer: routeRow?.continuityLayer ?? null,
    hingeTime: finiteOrNull(routeRow?.hingeTime),
    routeCarrierPass,
    sameRetainedRowSetProviderPass:
      sameRetainedRowSetProviderPass === true,
    oneSidedRouteWidthPass,
    minOneSidedRouteWidth,
    incomingLeftWidth,
    outgoingRightWidth,
    incomingLeftCoverage,
    outgoingRightCoverage,
    positiveWidthCommonRetainedTimeDomainPass: false,
    retainedLimitation:
      "The route-authorized point-event domain accepts only the exact same-source endpoint provider at the hinge root key, using positive one-sided route intervals on the incoming-left and outgoing-right sides. It is not a positive-width common retained time domain and does not certify the full point-event rule for force, torque, wake, phase, partition, stability, vector-ledger, or energy-routing rows.",
  };
}

function createSameSourceEndpointLinearSegmentReplayDiagnostic({
  layer,
  incomingClockTime,
  outgoingClockTime,
  incomingEndpointPoint,
  outgoingEndpointPoint,
  incomingChartPoint,
  outgoingChartPoint,
}) {
  const incomingReplay = createEndpointLinearSegmentReplayRow({
    id: "incoming_source_endpoint",
    layer,
    clockTime: incomingClockTime,
    endpointPoint: incomingEndpointPoint,
    exactCircularPoint: incomingChartPoint,
  });
  const outgoingReplay = createEndpointLinearSegmentReplayRow({
    id: "outgoing_source_endpoint",
    layer,
    clockTime: outgoingClockTime,
    endpointPoint: outgoingEndpointPoint,
    exactCircularPoint: outgoingChartPoint,
  });
  const replayRows = [incomingReplay, outgoingReplay];
  const finiteRows = replayRows.filter((row) => row.inputsPopulated === true);
  const maxEndpointLinearReplayResidual = maxFinite(
    replayRows.map((row) => row.endpointLinearReplayResidualNorm)
  );
  const maxLinearToExactCircularResidual = maxFinite(
    replayRows.map((row) => row.linearToExactCircularResidualNorm)
  );
  const maxEndpointToExactCircularResidual = maxFinite(
    replayRows.map((row) => row.endpointToExactCircularResidualNorm)
  );
  const maxEndpointExactMinusLinearResidual = maxFinite(
    replayRows.map((row) => row.endpointExactMinusLinearResidualAbs)
  );
  const segmentBound = computeCircularLayerPathSegmentErrorBound(layer);
  const segmentErrorBound = segmentBound?.errorBound ?? null;
  const linearReplayExplainsEndpointResidualsPass =
    finiteRows.length === replayRows.length &&
    Number.isFinite(maxEndpointLinearReplayResidual) &&
    maxEndpointLinearReplayResidual <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(maxEndpointExactMinusLinearResidual) &&
    maxEndpointExactMinusLinearResidual <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const segmentBoundContainsLinearizationErrorPass =
    Number.isFinite(maxLinearToExactCircularResidual) &&
    Number.isFinite(segmentErrorBound) &&
    maxLinearToExactCircularResidual <= segmentErrorBound;
  const exactCircularEndpointReplayPass =
    Number.isFinite(maxEndpointToExactCircularResidual) &&
    maxEndpointToExactCircularResidual <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const convergenceDiagnostic =
    createSameSourceEndpointLinearSegmentConvergenceDiagnostic({
      layer,
      incomingClockTime,
      outgoingClockTime,
      incomingChartPoint,
      outgoingChartPoint,
      currentMaxLinearToExactCircularResidual:
        maxLinearToExactCircularResidual,
    });

  return {
    schema:
      "aaa-tri-binary-same-source-endpoint-linear-segment-replay-diagnostic.v1",
    status:
      finiteRows.length !== replayRows.length
        ? "same_source_endpoint_linear_segment_replay_inputs_missing"
        : exactCircularEndpointReplayPass
          ? "same_source_endpoint_exact_circular_replay_passes_formal_acceptance_blocked"
          : linearReplayExplainsEndpointResidualsPass &&
              segmentBoundContainsLinearizationErrorPass
            ? "same_source_endpoint_linear_segment_replay_identifies_linearization_error"
            : "same_source_endpoint_linear_segment_replay_unexplained_residual",
    claimLevel:
      "diagnostic replay of sampled same-source endpoints as finite linear path-segment interpolation points; not exact endpoint transport or retained branch acceptance",
    segmentCountPerLayer: BINARY_TO_BINARY_PATH_SEGMENT_COUNT,
    pathSegmentStep: segmentBound?.step ?? null,
    segmentErrorBound,
    maxEndpointLinearReplayResidual,
    maxLinearToExactCircularResidual,
    maxEndpointToExactCircularResidual,
    maxEndpointExactMinusLinearResidual,
    linearReplayExplainsEndpointResidualsPass,
    segmentBoundContainsLinearizationErrorPass,
    exactCircularEndpointReplayPass,
    convergenceDiagnostic,
    rows: replayRows,
    retainedLimitation:
      "The sampled endpoints replay as finite linear path-segment interpolation points, so their residual against exact circular replay is identified as interpolation error. The nested convergence diagnostic measures the finite-segment decay at the same emission clocks; it still does not accept exact endpoint transport, a retained-domain replacement, or retained branch acceptance.",
  };
}

function createSameSourceEndpointLinearSegmentConvergenceDiagnostic({
  layer,
  incomingClockTime,
  outgoingClockTime,
  incomingChartPoint,
  outgoingChartPoint,
  currentMaxLinearToExactCircularResidual,
}) {
  const endpoints = [
    {
      id: "incoming_source_endpoint",
      clockTime: incomingClockTime,
      exactCircularPoint: incomingChartPoint,
    },
    {
      id: "outgoing_source_endpoint",
      clockTime: outgoingClockTime,
      exactCircularPoint: outgoingChartPoint,
    },
  ];
  const rows = ENDPOINT_LINEAR_SEGMENT_CONVERGENCE_COUNTS.map(
    (segmentCount) =>
      createEndpointLinearSegmentConvergenceRow({
        segmentCount,
        layer,
        endpoints,
      })
  );
  const finiteRows = rows.filter((row) => row.inputsPopulated === true);
  const ratioRows = [];
  for (let index = 1; index < rows.length; index += 1) {
    const previous = rows[index - 1];
    const current = rows[index];
    const residualRatio =
      Number.isFinite(previous.maxLinearToExactCircularResidual) &&
      previous.maxLinearToExactCircularResidual > 0 &&
      Number.isFinite(current.maxLinearToExactCircularResidual)
        ? current.maxLinearToExactCircularResidual /
          previous.maxLinearToExactCircularResidual
        : null;
    const observedOrderEstimate =
      Number.isFinite(residualRatio) &&
      residualRatio > 0 &&
      current.segmentCount > previous.segmentCount
        ? Math.log(1 / residualRatio) /
          Math.log(current.segmentCount / previous.segmentCount)
        : null;
    ratioRows.push({
      previousSegmentCount: previous.segmentCount,
      segmentCount: current.segmentCount,
      previousMaxLinearToExactCircularResidual:
        previous.maxLinearToExactCircularResidual,
      maxLinearToExactCircularResidual:
        current.maxLinearToExactCircularResidual,
      residualRatio,
      observedOrderEstimate,
    });
  }
  const finiteOrderEstimates = ratioRows
    .map((row) => row.observedOrderEstimate)
    .filter((value) => Number.isFinite(value));
  const meanObservedOrderEstimate =
    finiteOrderEstimates.length > 0
      ? finiteOrderEstimates.reduce((sum, value) => sum + value, 0) /
        finiteOrderEstimates.length
      : null;
  const minObservedOrderEstimate = minFinite(finiteOrderEstimates);
  const monotoneResidualDecreasePass =
    finiteRows.length === rows.length &&
    ratioRows.every(
      (row) =>
        Number.isFinite(row.residualRatio) &&
        row.residualRatio < 1
    );
  const allRowsWithinSegmentErrorBoundPass =
    finiteRows.length === rows.length &&
    rows.every((row) => row.segmentBoundContainsResidualPass === true);
  const segmentErrorBoundsDecreasePass =
    finiteRows.length === rows.length &&
    rows
      .slice(1)
      .every(
        (row, index) =>
          Number.isFinite(row.segmentErrorBound) &&
          Number.isFinite(rows[index].segmentErrorBound) &&
          row.segmentErrorBound < rows[index].segmentErrorBound
      );
  const observedSecondOrderDecayPass =
    Number.isFinite(minObservedOrderEstimate) &&
    minObservedOrderEstimate >= 1.8;
  const currentSegmentRow =
    rows.find(
      (row) => row.segmentCount === BINARY_TO_BINARY_PATH_SEGMENT_COUNT
    ) ?? null;
  const currentSegmentCountResidualDelta =
    currentSegmentRow &&
    Number.isFinite(currentSegmentRow.maxLinearToExactCircularResidual) &&
    Number.isFinite(currentMaxLinearToExactCircularResidual)
      ? currentSegmentRow.maxLinearToExactCircularResidual -
        currentMaxLinearToExactCircularResidual
      : null;
  const currentSegmentCountResidualMatchesReplayPass =
    Number.isFinite(currentSegmentCountResidualDelta) &&
    Math.abs(currentSegmentCountResidualDelta) <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const zeroLimitConvergenceCertificatePass =
    finiteRows.length === rows.length &&
    monotoneResidualDecreasePass &&
    allRowsWithinSegmentErrorBoundPass &&
    segmentErrorBoundsDecreasePass &&
    currentSegmentCountResidualMatchesReplayPass;

  return {
    schema:
      "aaa-tri-binary-same-source-endpoint-linear-segment-convergence-diagnostic.v1",
    status:
      finiteRows.length !== rows.length
        ? "same_source_endpoint_linear_segment_convergence_inputs_missing"
        : zeroLimitConvergenceCertificatePass
          ? "same_source_endpoint_linear_segment_convergence_certificate_populated"
          : monotoneResidualDecreasePass
            ? "same_source_endpoint_linear_segment_convergence_partial"
            : "same_source_endpoint_linear_segment_convergence_not_established",
    claimLevel:
      "analytic convergence diagnostic for finite linear path-history interpolation at fixed same-source emission clocks; not retained-domain acceptance",
    segmentCounts: ENDPOINT_LINEAR_SEGMENT_CONVERGENCE_COUNTS,
    currentSegmentCount: BINARY_TO_BINARY_PATH_SEGMENT_COUNT,
    currentSegmentCountResidual:
      currentSegmentRow?.maxLinearToExactCircularResidual ?? null,
    currentMaxLinearToExactCircularResidual,
    currentSegmentCountResidualDelta,
    currentSegmentCountResidualMatchesReplayPass,
    monotoneResidualDecreasePass,
    allRowsWithinSegmentErrorBoundPass,
    segmentErrorBoundsDecreasePass,
    observedSecondOrderDecayPass,
    minObservedOrderEstimate,
    meanObservedOrderEstimate,
    analyticSegmentErrorBoundLimit: 0,
    zeroLimitConvergenceCertificatePass,
    ratioRows,
    rows,
    retainedLimitation:
      "The residual decay only certifies the zero-segment-width limit of the linear interpolation diagnostic at the sampled emission clocks. It does not supply an accepted retained point event, a positive-width common retained time domain, or a physical compensation law.",
  };
}

function createEndpointLinearSegmentConvergenceRow({
  segmentCount,
  layer,
  endpoints,
}) {
  const segmentBound = computeCircularLayerPathSegmentErrorBound(
    layer,
    segmentCount
  );
  const samples = endpoints.map((endpoint) => {
    const exactCircularPoint = isFiniteVector(endpoint.exactCircularPoint)
      ? endpoint.exactCircularPoint
      : layer && Number.isFinite(endpoint.clockTime)
        ? computeCircularLayerPoint(layer, endpoint.clockTime)
        : null;
    const linearReplay = computeCircularLayerPathSegmentReplayPoint(
      layer,
      endpoint.clockTime,
      segmentCount
    );
    const residualVector =
      isFiniteVector(linearReplay?.point) && isFiniteVector(exactCircularPoint)
        ? subtractVectors(linearReplay.point, exactCircularPoint)
        : null;
    const linearToExactCircularResidualNorm = residualVector
      ? vectorNorm(residualVector)
      : null;
    return {
      id: endpoint.id,
      clockTime: endpoint.clockTime,
      segmentIndex: linearReplay?.segmentIndex ?? null,
      interpolationFraction: linearReplay?.interpolationFraction ?? null,
      linearReplayPoint: linearReplay?.point ?? null,
      exactCircularPoint,
      linearToExactCircularResidualVector: residualVector,
      linearToExactCircularResidualNorm,
      inputsPopulated:
        linearReplay != null &&
        Number.isFinite(endpoint.clockTime) &&
        isFiniteVector(exactCircularPoint),
    };
  });
  const maxLinearToExactCircularResidual = maxFinite(
    samples.map((sample) => sample.linearToExactCircularResidualNorm)
  );
  const segmentBoundContainsResidualPass =
    Number.isFinite(maxLinearToExactCircularResidual) &&
    Number.isFinite(segmentBound?.errorBound) &&
    maxLinearToExactCircularResidual <= segmentBound.errorBound;

  return {
    segmentCount,
    pathSegmentStep: segmentBound?.step ?? null,
    angularSpan: segmentBound?.angularSpan ?? null,
    segmentErrorBound: segmentBound?.errorBound ?? null,
    maxLinearToExactCircularResidual,
    segmentBoundContainsResidualPass,
    inputsPopulated: samples.every((sample) => sample.inputsPopulated === true),
    samples,
  };
}

function createEndpointLinearSegmentReplayRow({
  id,
  layer,
  clockTime,
  endpointPoint,
  exactCircularPoint,
}) {
  const linearReplay = computeCircularLayerPathSegmentReplayPoint(layer, clockTime);
  const endpointLinearReplayResidualVector =
    isFiniteVector(endpointPoint) && isFiniteVector(linearReplay?.point)
      ? subtractVectors(endpointPoint, linearReplay.point)
      : null;
  const endpointLinearReplayResidualNorm =
    endpointLinearReplayResidualVector != null
      ? vectorNorm(endpointLinearReplayResidualVector)
      : null;
  const linearToExactCircularResidualVector =
    isFiniteVector(linearReplay?.point) && isFiniteVector(exactCircularPoint)
      ? subtractVectors(linearReplay.point, exactCircularPoint)
      : null;
  const linearToExactCircularResidualNorm =
    linearToExactCircularResidualVector != null
      ? vectorNorm(linearToExactCircularResidualVector)
      : null;
  const endpointToExactCircularResidualVector =
    isFiniteVector(endpointPoint) && isFiniteVector(exactCircularPoint)
      ? subtractVectors(endpointPoint, exactCircularPoint)
      : null;
  const endpointToExactCircularResidualNorm =
    endpointToExactCircularResidualVector != null
      ? vectorNorm(endpointToExactCircularResidualVector)
      : null;
  const endpointExactMinusLinearResidual =
    Number.isFinite(endpointToExactCircularResidualNorm) &&
    Number.isFinite(linearToExactCircularResidualNorm)
      ? endpointToExactCircularResidualNorm - linearToExactCircularResidualNorm
      : null;

  return {
    id,
    status:
      Number.isFinite(endpointLinearReplayResidualNorm) &&
      endpointLinearReplayResidualNorm <=
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? "endpoint_replays_as_linear_path_segment_point"
        : "endpoint_linear_path_segment_replay_residual",
    inputsPopulated:
      linearReplay != null &&
      Number.isFinite(clockTime) &&
      isFiniteVector(endpointPoint) &&
      isFiniteVector(exactCircularPoint),
    clockTime,
    segmentIndex: linearReplay?.segmentIndex ?? null,
    segmentStartTime: linearReplay?.segmentStartTime ?? null,
    segmentEndTime: linearReplay?.segmentEndTime ?? null,
    interpolationFraction: linearReplay?.interpolationFraction ?? null,
    segmentStartPoint: linearReplay?.segmentStartPoint ?? null,
    segmentEndPoint: linearReplay?.segmentEndPoint ?? null,
    linearReplayPoint: linearReplay?.point ?? null,
    exactCircularPoint,
    endpointPoint,
    endpointLinearReplayResidualVector,
    endpointLinearReplayResidualNorm,
    linearToExactCircularResidualVector,
    linearToExactCircularResidualNorm,
    endpointToExactCircularResidualVector,
    endpointToExactCircularResidualNorm,
    endpointExactMinusLinearResidual,
    endpointExactMinusLinearResidualAbs: Number.isFinite(
      endpointExactMinusLinearResidual
    )
      ? Math.abs(endpointExactMinusLinearResidual)
      : null,
  };
}

function createSameSourcePathHistorySegmentErrorBoundDiagnostic({
  layer,
  endpointAdvectionResidualNorm,
  maxEndpointToEmissionChartResidual,
  endpointPairResidualVsChartChordAbs,
}) {
  const segmentBound = computeCircularLayerPathSegmentErrorBound(layer);
  const segmentErrorBound = segmentBound?.errorBound ?? null;
  const doubleSegmentErrorBound = Number.isFinite(segmentErrorBound)
    ? 2 * segmentErrorBound
    : null;
  const endpointToEmissionChartWithinSegmentBound =
    Number.isFinite(maxEndpointToEmissionChartResidual) &&
    Number.isFinite(segmentErrorBound) &&
    maxEndpointToEmissionChartResidual <= segmentErrorBound;
  const endpointAdvectionWithinDoubleSegmentBound =
    Number.isFinite(endpointAdvectionResidualNorm) &&
    Number.isFinite(doubleSegmentErrorBound) &&
    endpointAdvectionResidualNorm <= doubleSegmentErrorBound;
  const endpointPairChartChordGapWithinDoubleSegmentBound =
    Number.isFinite(endpointPairResidualVsChartChordAbs) &&
    Number.isFinite(doubleSegmentErrorBound) &&
    endpointPairResidualVsChartChordAbs <= doubleSegmentErrorBound;
  const endpointResidualsSegmentBoundedPass =
    endpointToEmissionChartWithinSegmentBound &&
    endpointAdvectionWithinDoubleSegmentBound &&
    endpointPairChartChordGapWithinDoubleSegmentBound;
  const inputsPopulated =
    Number.isFinite(segmentErrorBound) &&
    Number.isFinite(doubleSegmentErrorBound) &&
    Number.isFinite(endpointAdvectionResidualNorm) &&
    Number.isFinite(maxEndpointToEmissionChartResidual) &&
    Number.isFinite(endpointPairResidualVsChartChordAbs);

  return {
    schema:
      "aaa-tri-binary-same-source-path-history-segment-error-bound-diagnostic.v1",
    status: !inputsPopulated
      ? "same_source_path_history_segment_error_bound_inputs_missing"
      : endpointResidualsSegmentBoundedPass
        ? "same_source_path_history_segment_error_bound_contains_endpoint_residuals"
        : "same_source_path_history_segment_error_bound_endpoint_residual_exceeds_bound",
    claimLevel:
      "diagnostic comparison against the finite circular path-history segment error bound; not exact endpoint transport or retained branch acceptance",
    segmentCountPerLayer: BINARY_TO_BINARY_PATH_SEGMENT_COUNT,
    pathSegmentStep: segmentBound?.step ?? null,
    angularSpan: segmentBound?.angularSpan ?? null,
    segmentErrorBound,
    doubleSegmentErrorBound,
    endpointAdvectionResidualNorm,
    maxEndpointToEmissionChartResidual,
    endpointPairResidualVsChartChordAbs,
    endpointToEmissionChartWithinSegmentBound,
    endpointAdvectionWithinDoubleSegmentBound,
    endpointPairChartChordGapWithinDoubleSegmentBound,
    endpointResidualsSegmentBoundedPass,
    retainedLimitation:
      "The sampled endpoint residuals fit within the 32-segment circular path-history approximation envelope. This bounds the current residuals but does not replace an exact endpoint replay or retained-domain transport law.",
  };
}

function createSameEventEnergyRoutingCandidateRows({
  targetPopulated,
  sameEventRowsPass,
  acceptedOmegaTxSource,
  acceptedActionScale,
  acceptedEnergyOrientation,
  acceptedWakeEnergyIncrementLaw,
  minimalBranchTransactionFrequencyCertificate,
  actionBoundaryDerivativeTarget,
  actionBoundaryWakeEnergyLawCandidate,
  omegaStarWeightedBoundaryCharge,
  rootEnergyDiagnosticSum,
  targetChargeNorm,
}) {
  const rows = [];
  const addCandidate = ({
    id,
    source,
    formula,
    candidateWakeEnergyIncrement,
    sameEventCarrier = true,
    acceptanceBlockers = [],
    rejectionReason = null,
  }) => {
    const finiteCandidateWakeEnergyIncrement = finiteOrNull(
      candidateWakeEnergyIncrement
    );
    const acceptanceEligible =
      sameEventCarrier === true &&
      acceptanceBlockers.length === 0 &&
      finiteCandidateWakeEnergyIncrement != null;
    rows.push({
      id,
      status:
        finiteCandidateWakeEnergyIncrement != null
          ? acceptanceEligible
            ? "same_event_energy_route_candidate_evaluated"
            : "same_event_energy_route_candidate_evaluated_not_acceptance_source"
          : "same_event_energy_route_candidate_not_finite",
      source,
      formula,
      sameEventCarrier,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      candidateWakeEnergyIncrement: finiteCandidateWakeEnergyIncrement,
    });
  };
  const sharedAcceptanceBlockers = [
    targetPopulated ? null : "accepted_boundary_charge_pullback",
    sameEventRowsPass ? null : "same_retained_route_rows",
    acceptedOmegaTxSource ? null : "accepted_omega_tx_source",
    acceptedActionScale ? null : "derived_sigma_hbar_action_scale",
    acceptedEnergyOrientation ? null : "accepted_energy_orientation",
    acceptedWakeEnergyIncrementLaw ? null : "accepted_wake_energy_increment_law",
  ].filter(Boolean);
  const minimalBranchFrequency =
    minimalBranchTransactionFrequencyCertificate?.candidateOmegaTx ?? null;
  const minimalBranchEnergy =
    Number.isFinite(minimalBranchFrequency) && Number.isFinite(targetChargeNorm)
      ? minimalBranchFrequency * targetChargeNorm
      : null;
  addCandidate({
    id: "minimal_branch_frequency_boundary_charge_candidate",
    source: "minimal four-substep branch frequency certificate on the route-authorized wake charge",
    formula: "Delta E_wake = omega_tx^(4) |Delta J_wake|",
    candidateWakeEnergyIncrement: minimalBranchEnergy,
    acceptanceBlockers: sharedAcceptanceBlockers,
    rejectionReason:
      sharedAcceptanceBlockers.length === 0
        ? null
        : "The reduced four-substep energy candidate is exact only as a formal carrier until the same event has accepted omega_tx, sigma*hbar action scale, and wake-energy law rows.",
  });
  const signedActionScale =
    actionBoundaryWakeEnergyLawCandidate?.signedActionScaleForOmegaStarTarget ??
    null;
  const unitActionWakeEnergyIncrement =
    actionBoundaryWakeEnergyLawCandidate?.unitActionWakeEnergyIncrement ?? null;
  addCandidate({
    id: "action_boundary_derivative_scaled_candidate",
    source: "evaluated action-boundary derivative with the required action scale",
    formula:
      "Delta E_wake = sigma*hbar_scale_required * (1/2 sum kappa_sigma_row partial_t1 K_eff,row)",
    candidateWakeEnergyIncrement:
      Number.isFinite(signedActionScale) &&
      Number.isFinite(unitActionWakeEnergyIncrement)
        ? signedActionScale * unitActionWakeEnergyIncrement
        : null,
    acceptanceBlockers: sharedAcceptanceBlockers,
    rejectionReason:
      sharedAcceptanceBlockers.length === 0
        ? null
        : "The required action scale is measured by the derivative comparison but is not yet a derived sigma*hbar law.",
  });
  addCandidate({
    id: "unit_action_boundary_derivative",
    source: "evaluated action-boundary derivative before action-scale assignment",
    formula: "1/2 sum kappa_sigma_row partial_t1 K_eff,row",
    candidateWakeEnergyIncrement: unitActionWakeEnergyIncrement,
    sameEventCarrier: true,
    acceptanceBlockers: [
      "derived_sigma_hbar_action_scale",
      "accepted_wake_energy_increment_law",
    ],
    rejectionReason:
      "The unit-action derivative is evaluated on the same route rows, but it is not an energy route without sigma*hbar action scale.",
  });
  addCandidate({
    id: "root_energy_diagnostic_sum",
    source: "compensated route-payload certificate",
    formula: "sum unit-action root-energy diagnostic rows",
    candidateWakeEnergyIncrement: rootEnergyDiagnosticSum,
    sameEventCarrier: false,
    acceptanceBlockers: ["retained_wake_energy_route_law"],
    rejectionReason:
      "Root-energy rows are route diagnostics; they do not assign retained wake energy.",
  });
  addCandidate({
    id: "boundary_charge_norm_only",
    source: "normalized action-kernel wake charge",
    formula: "|Delta J_wake|",
    candidateWakeEnergyIncrement: targetChargeNorm,
    sameEventCarrier: false,
    acceptanceBlockers: ["transaction_frequency_or_action_boundary_law"],
    rejectionReason:
      "Boundary-charge norm is angular momentum, not energy, until a transaction frequency or action-boundary energy law is accepted.",
  });
  addCandidate({
    id: "zero_wake_energy",
    source: "null route control",
    formula: "Delta E_wake = 0",
    candidateWakeEnergyIncrement: 0,
    sameEventCarrier: false,
    acceptanceBlockers: ["nonzero_boundary_charge"],
    rejectionReason:
      Number.isFinite(omegaStarWeightedBoundaryCharge) &&
      Math.abs(omegaStarWeightedBoundaryCharge) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? "The route-authorized boundary charge has a nonzero omega-weighted energy target."
        : "Zero energy is a null control, not a retained wake-energy route.",
  });

  return rows;
}

function createActionBoundaryWakeEnergyLawCandidate({
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  masterEquationCharacteristicTailPullbackCandidate,
  omegaStarWeightedBoundaryCharge,
  omegaStar,
  targetChargeNorm,
  layerByName = new Map(),
}) {
  const derivativeEvaluated =
    actionBoundaryDerivativeTarget?.normalizedHistoryIntegralPass === true;
  const unitActionWakeEnergyIncrement =
    actionBoundaryDerivativeTarget?.halfWeightedNormalizedPartialT1KernelTermSum ??
    null;
  const unitActionWakeEnergyMagnitude = Number.isFinite(
    unitActionWakeEnergyIncrement
  )
    ? Math.abs(unitActionWakeEnergyIncrement)
    : null;
  const signedActionScaleForOmegaStarTarget =
    Number.isFinite(omegaStarWeightedBoundaryCharge) &&
    Number.isFinite(unitActionWakeEnergyIncrement) &&
    Math.abs(unitActionWakeEnergyIncrement) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? omegaStarWeightedBoundaryCharge / unitActionWakeEnergyIncrement
      : null;
  const positiveActionScaleForOmegaStarMagnitude =
    Number.isFinite(omegaStarWeightedBoundaryCharge) &&
    Number.isFinite(unitActionWakeEnergyMagnitude) &&
    unitActionWakeEnergyMagnitude > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(omegaStarWeightedBoundaryCharge) / unitActionWakeEnergyMagnitude
      : null;
  const requiredEnergyOrientation =
    Number.isFinite(signedActionScaleForOmegaStarTarget)
      ? Math.sign(signedActionScaleForOmegaStarTarget)
      : null;
  const unitActionResidualAgainstOmegaStar =
    Number.isFinite(unitActionWakeEnergyIncrement) &&
    Number.isFinite(omegaStarWeightedBoundaryCharge)
      ? unitActionWakeEnergyIncrement - omegaStarWeightedBoundaryCharge
      : null;
  const magnitudeResidualAgainstOmegaStar =
    Number.isFinite(unitActionWakeEnergyMagnitude) &&
    Number.isFinite(omegaStarWeightedBoundaryCharge)
      ? unitActionWakeEnergyMagnitude - Math.abs(omegaStarWeightedBoundaryCharge)
      : null;
  const candidatePopulated =
    derivativeEvaluated &&
    Number.isFinite(unitActionWakeEnergyIncrement);
  const actionScaleLawSearchTarget =
    createActionBoundaryActionScaleLawSearchTarget({
      requiredPositiveActionScale: positiveActionScaleForOmegaStarMagnitude,
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      omegaStar,
      targetChargeNorm,
    });
  const actionScaleLawSearchAccepted =
    actionScaleLawSearchTarget.acceptedActionScaleLawPass === true;
  const energyOrientationLawTarget = createEnergyOrientationLawTarget({
    requiredEnergyOrientation,
    actionBoundaryDerivativeTarget,
    omegaStarWeightedBoundaryCharge,
    masterEquationCharacteristicTailPullbackCandidate,
  });
  const energyOrientationAccepted =
    energyOrientationLawTarget.acceptedEnergyOrientationPass === true;
  const actionScaleDerivationTarget =
    createActionBoundaryActionScaleDerivationTarget({
      requiredPositiveActionScale: positiveActionScaleForOmegaStarMagnitude,
      signedActionScaleForOmegaStarTarget,
      unitActionWakeEnergyIncrement,
      omegaStarWeightedBoundaryCharge,
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      actionScaleLawSearchTarget,
      energyOrientationLawTarget,
      masterEquationCharacteristicTailPullbackCandidate,
      targetChargeNorm,
      layerByName,
    });
  const actionScaleDerivationAccepted =
    actionScaleDerivationTarget.acceptedActionScaleDerivationPass === true;
  const acceptedActionScale =
    actionScaleLawSearchAccepted || actionScaleDerivationAccepted;
  const omegaTxLawSearchTarget = createOmegaTxLawSearchTarget({
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    compensatedRoutePayloadCertificate,
  });
  const omegaTxLawSearchAccepted =
    omegaTxLawSearchTarget.acceptedOmegaTxLawPass === true;

  return {
    schema:
      "aaa-tri-binary-action-boundary-wake-energy-law-candidate.v1",
    status: !derivativeEvaluated
      ? "action_boundary_wake_energy_law_candidate_blocked_until_derivative_evaluated"
      : Number.isFinite(omegaStarWeightedBoundaryCharge)
      ? omegaTxLawSearchAccepted &&
        acceptedActionScale &&
        energyOrientationAccepted
        ? "action_boundary_wake_energy_law_candidate_scale_orientation_and_omega_tx_candidates_accepted_wake_energy_law_missing"
        : omegaTxLawSearchAccepted && acceptedActionScale
        ? "action_boundary_wake_energy_law_candidate_has_action_scale_and_omega_tx_candidates_pending_orientation"
        : !omegaTxLawSearchAccepted && !acceptedActionScale
        ? "action_boundary_wake_energy_law_candidate_omega_tx_and_scale_law_search_no_simple_candidate_accepted"
        : !omegaTxLawSearchAccepted
        ? "action_boundary_wake_energy_law_candidate_omega_tx_law_search_no_simple_candidate_accepted"
        : "action_boundary_wake_energy_law_candidate_scale_law_search_no_simple_candidate_accepted"
      : "action_boundary_wake_energy_law_candidate_derivative_evaluated_frequency_target_missing",
    claimLevel:
      "route-local wake-energy law candidate from the evaluated partial_t1 K_eff rows; not accepted action scale or retained energy routing",
    candidatePopulated,
    acceptedWakeEnergyIncrementPass: false,
    unitActionWakeEnergyIncrement,
    unitActionWakeEnergyMagnitude,
    omegaStarWeightedBoundaryCharge,
    omegaStar,
    targetChargeNorm,
    minimalBranchTransactionFrequencyCertificate,
    signedActionScaleForOmegaStarTarget,
    positiveActionScaleForOmegaStarMagnitude,
    requiredEnergyOrientation,
    acceptedEnergyOrientationPass: energyOrientationAccepted,
    energyOrientationLawStatus: energyOrientationLawTarget.status,
    energyOrientationLawTarget,
    acceptedActionScalePass: acceptedActionScale,
    acceptedSimpleActionScaleLawPass: actionScaleLawSearchAccepted,
    acceptedActionScaleDerivationPass: actionScaleDerivationAccepted,
    actionScaleLawSearchStatus: actionScaleLawSearchTarget.status,
    actionScaleLawSearchTarget,
    actionScaleDerivationStatus: actionScaleDerivationTarget.status,
    actionScaleIndependentSourceExclusionSummaryStatus:
      actionScaleDerivationTarget.independentSourceExclusionSummaryStatus,
    currentActionScaleSearchExhaustedPass:
      actionScaleDerivationTarget.currentActionScaleSearchExhaustedPass,
    actionScaleDerivationTarget,
    omegaTxLawSearchStatus: omegaTxLawSearchTarget.status,
    omegaTxLawSearchTarget,
    unitActionResidualAgainstOmegaStar,
    magnitudeResidualAgainstOmegaStar,
    missingAcceptedFields: [
      acceptedActionScale ? null : "accepted_sigma_hbar_action_scale",
      energyOrientationAccepted ? null : "accepted_energy_orientation",
      "accepted_omega_tx_or_energy_target",
      "accepted_wake_energy_increment_law",
    ].filter(Boolean),
    retainedLimitation:
      "This candidate measures the action scale that would make the evaluated action-boundary derivative agree with the omega_* boundary-charge comparison. It does not accept omega_* as omega_tx, derive sigma*hbar, or assign retained wake energy.",
  };
}

function createEnergyOrientationLawTarget({
  requiredEnergyOrientation,
  actionBoundaryDerivativeTarget,
  omegaStarWeightedBoundaryCharge,
  masterEquationCharacteristicTailPullbackCandidate,
}) {
  const candidateRows = createEnergyOrientationLawCandidateRows({
    actionBoundaryDerivativeTarget,
    omegaStarWeightedBoundaryCharge,
    masterEquationCharacteristicTailPullbackCandidate,
  }).map((row) => {
    const residual =
      Number.isFinite(row.candidateEnergyOrientation) &&
      Number.isFinite(requiredEnergyOrientation)
        ? row.candidateEnergyOrientation - requiredEnergyOrientation
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    return {
      ...row,
      requiredEnergyOrientation,
      residual,
      residualAbs,
      exactEnergyOrientationPass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      acceptedEnergyOrientationPass:
        row.acceptanceEligible === true &&
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  });
  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateEnergyOrientation)
  );
  const acceptedRows = finiteRows.filter(
    (row) => row.acceptedEnergyOrientationPass
  );
  const exactIneligibleRows = finiteRows.filter(
    (row) => row.exactEnergyOrientationPass && row.acceptanceEligible !== true
  );
  const rejectedEligibleRows = finiteRows.filter(
    (row) => row.acceptanceEligible === true && !row.exactEnergyOrientationPass
  );
  const bestRejectedCandidate =
    rejectedEligibleRows.length > 0
      ? rejectedEligibleRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;

  return {
    schema:
      "aaa-tri-binary-action-boundary-energy-orientation-law-target.v1",
    status: !Number.isFinite(requiredEnergyOrientation)
      ? "energy_orientation_law_search_blocked_until_required_orientation"
      : finiteRows.length === 0
      ? "energy_orientation_law_search_no_finite_candidates"
      : acceptedRows.length > 0
      ? "energy_orientation_law_search_route_local_candidate_accepted"
      : exactIneligibleRows.length > 0
      ? "energy_orientation_law_search_exact_ineligible_only"
      : "energy_orientation_law_search_no_route_local_candidate_accepted",
    claimLevel:
      "route-local energy-orientation sign search for the evaluated wake-energy comparison; not action-scale, omega_tx, or retained energy routing",
    requiredEnergyOrientation,
    acceptedEnergyOrientationPass: acceptedRows.length > 0,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactIneligibleCount: exactIneligibleRows.length,
    bestRejectedCandidate,
    acceptedRows,
    exactIneligibleRows,
    rows: candidateRows,
    retainedLimitation:
      "This target can accept only a route-local orientation sign supplied by accepted characteristic-tail polarity/coefficient rows. Derivative or target signs are diagnostic comparisons, not independent orientation laws.",
  };
}

function createEnergyOrientationLawCandidateRows({
  actionBoundaryDerivativeTarget,
  omegaStarWeightedBoundaryCharge,
  masterEquationCharacteristicTailPullbackCandidate,
}) {
  const rows = [];
  const seenIds = new Set();
  const addCandidate = ({
    id,
    source,
    formula,
    candidateEnergyOrientation,
    acceptanceEligible = true,
    rejectionReason = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateEnergyOrientation = normalizeOrientationSign(
      candidateEnergyOrientation
    );
    rows.push({
      id,
      status:
        finiteCandidateEnergyOrientation != null
          ? acceptanceEligible
            ? "energy_orientation_law_candidate_evaluated"
            : "energy_orientation_law_candidate_evaluated_not_acceptance_source"
          : "energy_orientation_law_candidate_not_finite",
      source,
      formula,
      acceptanceEligible,
      rejectionReason,
      candidateEnergyOrientation: finiteCandidateEnergyOrientation,
    });
  };
  const coefficientTarget =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget ?? null;
  const singleCoefficientSolve =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.singleCoefficientSignPatternSolve ?? null;
  const signPattern = singleCoefficientSolve?.signPattern ?? [];
  const commonSigmaSign =
    signPattern.length > 0 &&
    signPattern.every((sign) => Number.isFinite(sign) && sign === signPattern[0])
      ? signPattern[0]
      : null;
  const routeLocalCoefficientAccepted =
    coefficientTarget?.acceptedCoefficientQuadraturePass === true;

  addCandidate({
    id: "route_local_common_sigma_sign",
    source: "route-local characteristic-tail coefficient rows",
    formula:
      "common sigma sign from the accepted route-local characteristic-tail coefficient rows",
    candidateEnergyOrientation: commonSigmaSign,
    acceptanceEligible:
      routeLocalCoefficientAccepted && Number.isFinite(commonSigmaSign),
    rejectionReason: routeLocalCoefficientAccepted
      ? null
      : "The common sigma sign is not an acceptance source until the route-local coefficient target is accepted.",
  });
  addCandidate({
    id: "negative_action_time_derivative_convention",
    source: "action-boundary derivative comparison",
    formula: "Delta E = - sigma*hbar_scale partial_t K_eff",
    candidateEnergyOrientation: -1,
    acceptanceEligible: false,
    rejectionReason:
      "The sign matches the action-time comparison convention, but acceptance in this target requires a route-local sign source.",
  });
  addCandidate({
    id: "unit_action_derivative_sign",
    source: "evaluated action-boundary derivative",
    formula: "sign(1/2 sum kappa_sigma_row partial_t1 K_eff,row)",
    candidateEnergyOrientation: Math.sign(
      actionBoundaryDerivativeTarget?.halfWeightedNormalizedPartialT1KernelTermSum
    ),
    acceptanceEligible: false,
    rejectionReason:
      "This is the evaluated derivative sign, not an independent energy-orientation law.",
  });
  addCandidate({
    id: "positive_energy_target_sign",
    source: "omega_* weighted boundary-charge comparison",
    formula: "sign(omega_* |Delta J_wake|)",
    candidateEnergyOrientation: Math.sign(omegaStarWeightedBoundaryCharge),
    acceptanceEligible: false,
    rejectionReason:
      "This is the comparison target sign, not independent route-local orientation evidence.",
  });

  return rows;
}

function normalizeOrientationSign(value) {
  return Number.isFinite(value) && Math.abs(value) === 1 ? value : null;
}

function createOmegaTxLawSearchTarget({
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  compensatedRoutePayloadCertificate,
}) {
  const targetOmegaTx = cleanEnergyFrequencyTarget?.omegaStar ?? null;
  const candidateRows = createOmegaTxLawCandidateRows({
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    compensatedRoutePayloadCertificate,
  }).map((row) => {
    const residual =
      Number.isFinite(row.candidateOmegaTx) && Number.isFinite(targetOmegaTx)
        ? row.candidateOmegaTx - targetOmegaTx
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    return {
      ...row,
      targetOmegaTx,
      residual,
      residualAbs,
      exactOmegaTxPass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      acceptedOmegaTxLawPass:
        row.acceptanceEligible === true &&
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  });
  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateOmegaTx)
  );
  const acceptedRows = finiteRows.filter((row) => row.acceptedOmegaTxLawPass);
  const exactIneligibleRows = finiteRows.filter(
    (row) => row.exactOmegaTxPass && row.acceptanceEligible !== true
  );
  const rejectedEligibleRows = finiteRows.filter(
    (row) => row.acceptanceEligible === true && !row.exactOmegaTxPass
  );
  const bestRejectedCandidate =
    rejectedEligibleRows.length > 0
      ? rejectedEligibleRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;
  const exactMinimalBranchCertificateRows = exactIneligibleRows.filter(
    (row) => row.id === "minimal_branch_four_substep_frequency_certificate"
  );

  return {
    schema: "aaa-tri-binary-omega-tx-law-search-target.v1",
    status: !Number.isFinite(targetOmegaTx)
      ? "omega_tx_law_search_blocked_until_clean_frequency_target"
      : finiteRows.length === 0
      ? "omega_tx_law_search_no_finite_candidates"
      : acceptedRows.length > 0
      ? "omega_tx_law_search_simple_candidate_accepted"
      : exactMinimalBranchCertificateRows.length > 0
      ? "omega_tx_law_search_minimal_branch_frequency_certificate_formal_acceptance_blocked"
      : exactIneligibleRows.length > 0
      ? "omega_tx_law_search_clean_target_identity_only_no_route_local_candidate_accepted"
      : "omega_tx_law_search_no_simple_route_local_candidate_accepted",
    claimLevel:
      "simple route-local transaction-frequency law search for the evaluated wake-energy comparison; not accepted omega_tx",
    targetOmegaTx,
    cleanEnergyFrequencyTargetStatus:
      cleanEnergyFrequencyTarget?.status ?? null,
    minimalBranchTransactionFrequencyCertificateStatus:
      minimalBranchTransactionFrequencyCertificate?.status ?? null,
    minimalBranchTransactionFrequencyReducedCertificatePass:
      minimalBranchTransactionFrequencyCertificate?.reducedCertificatePass ?? null,
    minimalBranchTransactionFrequencyAcceptedPass:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass ?? null,
    minimalBranchTransactionFrequencyAcceptanceBlockers:
      minimalBranchTransactionFrequencyCertificate?.acceptanceBlockers ?? [],
    acceptedOmegaTxLawPass: acceptedRows.length > 0,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactIneligibleCount: exactIneligibleRows.length,
    bestRejectedCandidate,
    exactIneligibleRows,
    exactMinimalBranchCertificateRows,
    acceptedRows,
    rows: candidateRows,
    retainedLimitation:
      "This search treats the clean weighted omega_* expression as the comparison target. The minimal four-substep frequency certificate is exact for the reduced branch, but omega_tx acceptance still requires retained-event acceptance and same-event carrier population on the same route.",
  };
}

function createOmegaTxLawCandidateRows({
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  compensatedRoutePayloadCertificate,
}) {
  const rows = [];
  const seenIds = new Set();
  const angularVelocities = cleanEnergyFrequencyTarget?.angularVelocities ?? {};
  const addCandidate = ({
    id,
    source,
    formula,
    candidateOmegaTx,
    acceptanceEligible = true,
    rejectionReason = null,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateOmegaTx = finiteOrNull(candidateOmegaTx);
    rows.push({
      id,
      status:
        finiteCandidateOmegaTx != null
          ? acceptanceEligible
            ? "omega_tx_law_candidate_evaluated"
            : "omega_tx_law_candidate_evaluated_not_acceptance_source"
          : "omega_tx_law_candidate_not_finite",
      source,
      formula,
      acceptanceEligible,
      rejectionReason,
      candidateOmegaTx: finiteCandidateOmegaTx,
      evidence,
    });
  };
  const addMeanCandidate = ({ id, source, formula, values }) => {
    const finiteValues = values.filter((value) => Number.isFinite(value));
    addCandidate({
      id,
      source,
      formula,
      candidateOmegaTx:
        finiteValues.length > 0
          ? finiteValues.reduce((sum, value) => sum + value, 0) /
            finiteValues.length
          : null,
    });
  };
  const getLayerOmega = (layerName) =>
    Number.isFinite(angularVelocities?.[layerName])
      ? angularVelocities[layerName]
      : null;
  const omegaOuter = getLayerOmega("outer");
  const omegaMiddle = getLayerOmega("middle");
  const omegaInner = getLayerOmega("inner");

  addCandidate({
    id: "clean_weighted_omega_star_identity",
    source: "clean energy-frequency target",
    formula: "(omega_O + omega_M + 2 omega_I) / 4",
    candidateOmegaTx: cleanEnergyFrequencyTarget?.omegaStar ?? null,
    acceptanceEligible: false,
    rejectionReason:
      "This is the omega_* comparison target itself, not independent route-local transaction-frequency evidence.",
  });
  addCandidate({
    id: "minimal_branch_four_substep_frequency_certificate",
    source: "minimal four-substep branch frequency certificate target",
    formula: "omega_tx^(4)=(omega_O+omega_M+2 omega_I)/(1+1+2)",
    candidateOmegaTx:
      minimalBranchTransactionFrequencyCertificate?.candidateOmegaTx ?? null,
    acceptanceEligible:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass === true,
    rejectionReason:
      minimalBranchTransactionFrequencyCertificate
        ?.acceptedTransactionFrequencyPass === true
        ? null
        : "The reduced four-substep certificate is exact but not an acceptance source until retained-event acceptance and same-event carrier population are supplied.",
    evidence: minimalBranchTransactionFrequencyCertificate
      ? {
          status: minimalBranchTransactionFrequencyCertificate.status,
          reducedCertificatePass:
            minimalBranchTransactionFrequencyCertificate.reducedCertificatePass,
          frequencyIdentityPass:
            minimalBranchTransactionFrequencyCertificate.frequencyIdentityPass,
          acceptanceBlockers:
            minimalBranchTransactionFrequencyCertificate.acceptanceBlockers,
        }
      : null,
  });
  addCandidate({
    id: "outer_layer_angular_velocity",
    source: "selected layer angular velocities",
    formula: "omega_O",
    candidateOmegaTx: omegaOuter,
  });
  addCandidate({
    id: "middle_layer_angular_velocity",
    source: "selected layer angular velocities",
    formula: "omega_M",
    candidateOmegaTx: omegaMiddle,
  });
  addCandidate({
    id: "inner_layer_angular_velocity",
    source: "selected layer angular velocities",
    formula: "omega_I",
    candidateOmegaTx: omegaInner,
  });
  addMeanCandidate({
    id: "layer_angular_velocity_mean",
    source: "selected layer angular velocities",
    formula: "mean(omega_O, omega_M, omega_I)",
    values: [omegaOuter, omegaMiddle, omegaInner],
  });
  addMeanCandidate({
    id: "outer_inner_angular_velocity_mean",
    source: "selected layer angular velocities",
    formula: "mean(omega_O, omega_I)",
    values: [omegaOuter, omegaInner],
  });

  for (const row of compensatedRoutePayloadCertificate?.rows ?? []) {
    const rowId = row.continuityRole ?? `row_${rows.length}`;
    const incoming = getPairAngularVelocities({
      pairKey: row.incomingPairKey,
      angularVelocities,
    });
    const outgoing = getPairAngularVelocities({
      pairKey: row.outgoingPairKey,
      angularVelocities,
    });
    addCandidate({
      id: `${rowId}_continuity_angular_velocity`,
      source: "compensated route-payload certificate",
      formula: `${rowId} continuity angular velocity`,
      candidateOmegaTx: row.rootEnergyIncrement?.continuityAngularVelocity ?? null,
    });
    addMeanCandidate({
      id: `${rowId}_source_angular_velocity_mean`,
      source: "compensated route-payload certificate",
      formula: `${rowId} mean(incoming source, outgoing source)`,
      values: [incoming.sourceOmega, outgoing.sourceOmega],
    });
    addMeanCandidate({
      id: `${rowId}_receiver_angular_velocity_mean`,
      source: "compensated route-payload certificate",
      formula: `${rowId} mean(incoming receiver, outgoing receiver)`,
      values: [incoming.receiverOmega, outgoing.receiverOmega],
    });
    addMeanCandidate({
      id: `${rowId}_endpoint_angular_velocity_mean`,
      source: "compensated route-payload certificate",
      formula:
        `${rowId} mean(incoming source, incoming receiver, outgoing source, outgoing receiver)`,
      values: [
        incoming.sourceOmega,
        incoming.receiverOmega,
        outgoing.sourceOmega,
        outgoing.receiverOmega,
      ],
    });
  }

  return rows;
}

function getPairAngularVelocities({ pairKey, angularVelocities }) {
  const [sourceLayer, receiverLayer] =
    typeof pairKey === "string" ? pairKey.split("->") : [null, null];
  const sourceOmega =
    sourceLayer != null && Number.isFinite(angularVelocities?.[sourceLayer])
      ? angularVelocities[sourceLayer]
      : null;
  const receiverOmega =
    receiverLayer != null && Number.isFinite(angularVelocities?.[receiverLayer])
      ? angularVelocities[receiverLayer]
      : null;
  return {
    sourceLayer,
    receiverLayer,
    sourceOmega,
    receiverOmega,
  };
}

function createActionBoundaryActionScaleLawSearchTarget({
  requiredPositiveActionScale,
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  omegaStar,
  targetChargeNorm,
}) {
  const candidateRows = createActionBoundaryActionScaleLawCandidateRows({
    actionBoundaryDerivativeTarget,
    compensatedRoutePayloadCertificate,
    omegaStar,
    targetChargeNorm,
  }).map((row) => {
    const residual =
      Number.isFinite(row.candidateActionScale) &&
      Number.isFinite(requiredPositiveActionScale)
        ? row.candidateActionScale - requiredPositiveActionScale
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    return {
      ...row,
      requiredPositiveActionScale,
      residual,
      residualAbs,
      exactActionScalePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  });
  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateActionScale)
  );
  const acceptedRows = finiteRows.filter((row) => row.exactActionScalePass);
  const rejectedRows = finiteRows.filter((row) => !row.exactActionScalePass);
  const bestRejectedCandidate =
    rejectedRows.length > 0
      ? rejectedRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;

  return {
    schema: "aaa-tri-binary-action-boundary-action-scale-law-search-target.v1",
    status: !Number.isFinite(requiredPositiveActionScale)
      ? "action_boundary_action_scale_law_search_blocked_until_required_scale"
      : finiteRows.length === 0
      ? "action_boundary_action_scale_law_search_no_finite_candidates"
      : acceptedRows.length > 0
      ? "action_boundary_action_scale_law_search_simple_candidate_accepted"
      : "action_boundary_action_scale_law_search_no_simple_candidate_accepted",
    claimLevel:
      "simple existing-scalar action-scale law search for the evaluated wake-energy candidate; not fitted sigma*hbar",
    requiredPositiveActionScale,
    acceptedActionScaleLawPass: acceptedRows.length > 0,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    bestRejectedCandidate,
    acceptedRows,
    rows: candidateRows,
    retainedLimitation:
      "This search tests only existing route, normalization, wake-charge, and unit-payload scalars with no fitted coefficients. Rejecting them leaves sigma*hbar action-scale derivation open rather than accepting an empirical scale.",
  };
}

function createActionBoundaryActionScaleDerivationTarget({
  requiredPositiveActionScale,
  signedActionScaleForOmegaStarTarget,
  unitActionWakeEnergyIncrement,
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  actionScaleLawSearchTarget,
  energyOrientationLawTarget,
  masterEquationCharacteristicTailPullbackCandidate,
  targetChargeNorm,
  layerByName = new Map(),
}) {
  const routeLocalCoefficientAcceptanceTarget =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.routeLocalCoefficientAcceptanceTarget ?? null;
  const rowAmplitudeRequirementTarget =
    routeLocalCoefficientAcceptanceTarget?.rowAmplitudeRequirementTarget ?? null;
  const rowAmplitudeLawSearchTarget =
    rowAmplitudeRequirementTarget?.rowAmplitudeLawSearchTarget ?? null;
  const leastNormBoundaryChargeAmplitudeLaw =
    rowAmplitudeLawSearchTarget?.leastNormBoundaryChargeAmplitudeLaw ?? null;
  const rowAmplitudeLawAccepted =
    rowAmplitudeRequirementTarget?.acceptedRowAmplitudeLawPass === true &&
    leastNormBoundaryChargeAmplitudeLaw?.acceptedRowAmplitudeLawPass === true;
  const routeLocalCoefficientAccepted =
    routeLocalCoefficientAcceptanceTarget?.acceptedCoefficientQuadraturePass ===
    true;
  const simpleScalarSearchAccepted =
    actionScaleLawSearchTarget?.acceptedActionScaleLawPass === true;
  const orientationAccepted =
    energyOrientationLawTarget?.acceptedEnergyOrientationPass === true;
  const candidateRows = createActionBoundaryActionScaleDerivationCandidateRows({
    requiredPositiveActionScale,
    signedActionScaleForOmegaStarTarget,
    unitActionWakeEnergyIncrement,
    omegaStarWeightedBoundaryCharge,
    actionBoundaryDerivativeTarget,
    actionScaleLawSearchTarget,
    rowAmplitudeLawAccepted,
    routeLocalCoefficientAccepted,
    routeLocalCoefficientAcceptanceTarget,
    rowAmplitudeRequirementTarget,
    leastNormBoundaryChargeAmplitudeLaw,
    targetChargeNorm,
  }).map((row) => {
    const residual =
      Number.isFinite(row.candidateActionScale) &&
      Number.isFinite(requiredPositiveActionScale)
        ? row.candidateActionScale - requiredPositiveActionScale
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    const exactActionScaleDerivationPass =
      Number.isFinite(residualAbs) &&
      residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
    return {
      ...row,
      requiredPositiveActionScale,
      residual,
      residualAbs,
      exactActionScaleDerivationPass,
      acceptedActionScaleDerivationPass:
        row.acceptanceEligible === true && exactActionScaleDerivationPass,
    };
  });
  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateActionScale)
  );
  const acceptedRows = finiteRows.filter(
    (row) => row.acceptedActionScaleDerivationPass
  );
  const exactDiagnosticRows = finiteRows.filter(
    (row) =>
      row.exactActionScaleDerivationPass &&
      row.acceptedActionScaleDerivationPass !== true
  );
  const rejectedRows = finiteRows.filter(
    (row) => row.exactActionScaleDerivationPass !== true
  );
  const rejectedEligibleRows = rejectedRows.filter(
    (row) => row.acceptanceEligible === true
  );
  const bestRejectedCandidate =
    rejectedEligibleRows.length > 0
      ? rejectedEligibleRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;
  const bestRejectedDiagnosticOrIneligibleCandidate =
    rejectedRows.length > 0
      ? rejectedRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;
  const measuredScaleDiagnosticPass = exactDiagnosticRows.some(
    (row) => row.id === "required_scale_measured_by_boundary_charge"
  );
  const residualCorrectionDiagnostic =
    createActionBoundaryActionScaleResidualCorrectionDiagnostic({
      requiredPositiveActionScale,
      omegaStarWeightedBoundaryCharge,
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      targetChargeNorm,
      leastNormBoundaryChargeAmplitudeLaw,
      routeLocalCoefficientAcceptanceTarget,
      bestRejectedCandidate,
      layerByName,
    });
  const independentSourceExclusionSummary =
    createActionBoundaryActionScaleIndependentSourceExclusionSummary({
      requiredPositiveActionScale,
      actionScaleLawSearchTarget,
      acceptedActionScaleDerivationPass: acceptedRows.length > 0,
      measuredScaleDiagnosticPass,
      rowAmplitudeLawAccepted,
      routeLocalCoefficientAccepted,
      residualCorrectionDiagnostic,
    });

  return {
    schema:
      "aaa-tri-binary-action-boundary-action-scale-derivation-target.v1",
    status: !Number.isFinite(requiredPositiveActionScale)
      ? "action_boundary_action_scale_derivation_target_blocked_until_required_scale"
      : acceptedRows.length > 0
        ? "action_boundary_action_scale_derivation_target_route_local_candidate_accepted"
        : !measuredScaleDiagnosticPass
          ? "action_boundary_action_scale_derivation_target_required_scale_not_measured"
          : rowAmplitudeLawAccepted
            ? "action_boundary_action_scale_derivation_target_measured_scale_populated_route_local_candidates_rejected"
            : "action_boundary_action_scale_derivation_target_measured_scale_populated_row_amplitude_law_missing",
    claimLevel:
      "fail-closed sigma*hbar action-scale derivation target; the comparison-measured scale is diagnostic, not an accepted law",
    requiredPositiveActionScale,
    signedActionScaleForOmegaStarTarget,
    unitActionWakeEnergyIncrement,
    omegaStarWeightedBoundaryCharge,
    targetChargeNorm,
    acceptedActionScaleDerivationPass: acceptedRows.length > 0,
    measuredScaleDiagnosticPass,
    rowAmplitudeLawAccepted,
    routeLocalCoefficientAccepted,
    simpleScalarSearchAccepted,
    orientationAccepted,
    actionScaleLawSearchStatus: actionScaleLawSearchTarget?.status ?? null,
    energyOrientationLawStatus: energyOrientationLawTarget?.status ?? null,
    routeLocalCoefficientAcceptanceStatus:
      routeLocalCoefficientAcceptanceTarget?.status ?? null,
    rowAmplitudeRequirementStatus: rowAmplitudeRequirementTarget?.status ?? null,
    rowAmplitudeLawSearchStatus: rowAmplitudeLawSearchTarget?.status ?? null,
    leastNormBoundaryChargeAmplitudeLawStatus:
      leastNormBoundaryChargeAmplitudeLaw?.status ?? null,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactDiagnosticCount: exactDiagnosticRows.length,
    residualCorrectionDiagnosticStatus:
      residualCorrectionDiagnostic?.status ?? null,
    independentSourceExclusionSummaryStatus:
      independentSourceExclusionSummary.status,
    currentActionScaleSearchExhaustedPass:
      independentSourceExclusionSummary.currentSearchExhaustedPass,
    bestRejectedCandidate,
    bestRejectedDiagnosticOrIneligibleCandidate,
    residualCorrectionDiagnostic,
    independentSourceExclusionSummary,
    exactDiagnosticRows,
    acceptedRows,
    rows: candidateRows,
    retainedLimitation:
      "This target keeps the action scale on the same route-local characteristic-tail and action-boundary rows. The required scale is measured by the boundary-charge comparison, but it remains blocked until a non-tautological route-local law supplies sigma*hbar without fitting the target.",
  };
}

function createActionBoundaryActionScaleIndependentSourceExclusionSummary({
  requiredPositiveActionScale,
  actionScaleLawSearchTarget,
  acceptedActionScaleDerivationPass,
  measuredScaleDiagnosticPass,
  rowAmplitudeLawAccepted,
  routeLocalCoefficientAccepted,
  residualCorrectionDiagnostic,
}) {
  const familyRows = [
    {
      id: "simple_existing_scalar_search",
      source: "existing route, normalization, wake-charge, and unit-payload scalars",
      status: actionScaleLawSearchTarget?.status ?? null,
      finiteCandidateCount: actionScaleLawSearchTarget?.finiteCandidateCount ?? null,
      acceptedCandidateCount:
        actionScaleLawSearchTarget?.acceptedCandidateCount ?? null,
      acceptedPass: actionScaleLawSearchTarget?.acceptedActionScaleLawPass === true,
      exclusionPass:
        actionScaleLawSearchTarget?.status ===
        "action_boundary_action_scale_law_search_no_simple_candidate_accepted",
    },
    {
      id: "route_local_derivation_candidates",
      source:
        "accepted route-local row-amplitude and characteristic-tail coefficient rows",
      status:
        acceptedActionScaleDerivationPass === true
          ? "action_boundary_action_scale_derivation_target_route_local_candidate_accepted"
          : measuredScaleDiagnosticPass === true &&
              rowAmplitudeLawAccepted === true &&
              routeLocalCoefficientAccepted === true
            ? "action_boundary_action_scale_derivation_target_measured_scale_populated_route_local_candidates_rejected"
            : "action_boundary_action_scale_derivation_target_incomplete",
      acceptedPass: acceptedActionScaleDerivationPass === true,
      exclusionPass:
        acceptedActionScaleDerivationPass !== true &&
        measuredScaleDiagnosticPass === true &&
        rowAmplitudeLawAccepted === true &&
        routeLocalCoefficientAccepted === true,
    },
    {
      id: "residual_quadrature_and_endpoint_corrections",
      source: "quadrature refinement and finite endpoint-leakage correction rows",
      status: residualCorrectionDiagnostic?.status ?? null,
      acceptedCandidateCount:
        residualCorrectionDiagnostic?.acceptedEndpointCorrectionCount ?? null,
      acceptedPass:
        residualCorrectionDiagnostic?.acceptedEndpointCorrectionCount > 0 ||
        residualCorrectionDiagnostic?.quadratureClearsResidual === true,
      exclusionPass:
        residualCorrectionDiagnostic?.status ===
        "action_scale_residual_correction_diagnostic_quadrature_stable_endpoint_candidates_rejected",
    },
    {
      id: "boundary_charge_increment_candidates",
      source: "boundary-charge increment candidates mapped from the residual gap",
      status:
        residualCorrectionDiagnostic?.boundaryChargeIncrementCandidateStatus ??
        null,
      acceptedCandidateCount:
        residualCorrectionDiagnostic?.acceptedBoundaryChargeIncrementCandidateCount ??
        null,
      exactDiagnosticCount:
        residualCorrectionDiagnostic?.exactDiagnosticBoundaryChargeIncrementCount ??
        null,
      acceptedPass:
        residualCorrectionDiagnostic?.acceptedBoundaryChargeIncrementCandidateCount >
        0,
      exclusionPass:
        residualCorrectionDiagnostic?.boundaryChargeIncrementCandidateStatus ===
          "boundary_charge_increment_candidates_rejected" ||
        residualCorrectionDiagnostic?.boundaryChargeIncrementCandidateStatus ===
          "boundary_charge_increment_candidates_rejected_target_derived_comparison_only",
    },
    {
      id: "alternate_normalization_shift",
      source: "alternate action-kernel normalization shifts",
      status:
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnosticStatus ??
        null,
      acceptedCandidateCount:
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnostic
          ?.acceptedCandidateCount ?? null,
      exactDiagnosticCount:
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnostic
          ?.exactDiagnosticCount ?? null,
      acceptedPass:
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnostic
          ?.acceptedCandidateCount > 0,
      exclusionPass:
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnosticStatus ===
          "alternate_normalization_shift_candidates_rejected" ||
        residualCorrectionDiagnostic?.alternateNormalizationShiftDiagnosticStatus ===
          "alternate_normalization_shift_candidates_rejected_target_derived_comparison_only",
    },
    {
      id: "retained_work_action_scale",
      source: "retained-work and route-payload action-scale candidates",
      status:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnosticStatus ??
        null,
      finiteCandidateCount:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnostic
          ?.finiteCandidateCount ?? null,
      acceptedCandidateCount:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnostic
          ?.acceptedCandidateCount ?? null,
      exactDiagnosticCount:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnostic
          ?.exactDiagnosticCount ?? null,
      acceptedPass:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnostic
          ?.acceptedCandidateCount > 0,
      exclusionPass:
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnosticStatus ===
          "retained_work_action_scale_candidates_rejected" ||
        residualCorrectionDiagnostic?.retainedWorkActionScaleDiagnosticStatus ===
          "retained_work_action_scale_candidates_rejected_target_derived_comparison_only",
    },
    {
      id: "coefficient_provenance",
      source: "coefficient-provenance rows for the residual boundary-charge gap",
      status:
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnosticStatus ?? null,
      acceptedCandidateCount:
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnostic
          ?.acceptedCandidateCount ?? null,
      exactDiagnosticCount:
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnostic
          ?.exactDiagnosticCount ?? null,
      acceptedPass:
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnostic
          ?.acceptedCandidateCount > 0,
      exclusionPass:
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnosticStatus ===
          "coefficient_provenance_candidates_rejected" ||
        residualCorrectionDiagnostic?.coefficientProvenanceDiagnosticStatus ===
          "coefficient_provenance_candidates_rejected_target_derived_comparison_only",
    },
    {
      id: "exact_endpoint_provider",
      source: "exact circular endpoint-provider correction rows",
      status:
        residualCorrectionDiagnostic?.exactEndpointProviderActionScaleDiagnosticStatus ??
        null,
      finiteCandidateCount:
        residualCorrectionDiagnostic?.exactEndpointProviderActionScaleDiagnostic
          ?.finiteCandidateCount ?? null,
      exactDiagnosticCount:
        residualCorrectionDiagnostic?.exactEndpointProviderActionScaleDiagnostic
          ?.exactDiagnosticCount ?? null,
      acceptedPass: false,
      exclusionPass:
        residualCorrectionDiagnostic?.exactEndpointProviderActionScaleDiagnosticStatus ===
        "exact_endpoint_provider_action_scale_candidates_rejected",
    },
  ].map((row) => ({
    ...row,
    outcome:
      row.acceptedPass === true
        ? "accepted"
        : row.exclusionPass === true
          ? "excluded"
          : row.exactDiagnosticCount > 0
            ? "formal_target_derived_only"
            : "incomplete_or_untested",
  }));
  const acceptedRows = familyRows.filter((row) => row.acceptedPass === true);
  const excludedRows = familyRows.filter((row) => row.exclusionPass === true);
  const formalOnlyRows = familyRows.filter(
    (row) =>
      row.acceptedPass !== true &&
      row.exclusionPass !== true &&
      row.exactDiagnosticCount > 0
  );
  const untestedRows = familyRows.filter(
    (row) =>
      row.acceptedPass !== true &&
      row.exclusionPass !== true &&
      !(row.exactDiagnosticCount > 0)
  );
  const currentSearchExhaustedPass =
    Number.isFinite(requiredPositiveActionScale) &&
    acceptedRows.length === 0 &&
    untestedRows.length === 0;

  return {
    schema:
      "aaa-tri-binary-action-scale-independent-source-exclusion-summary.v1",
    status: !Number.isFinite(requiredPositiveActionScale)
      ? "action_scale_independent_source_exclusion_blocked_until_required_scale"
      : acceptedRows.length > 0
        ? "action_scale_independent_source_candidate_accepted"
        : currentSearchExhaustedPass
          ? "action_scale_independent_source_current_search_exhausted_full_event_rule_or_new_law_required"
          : "action_scale_independent_source_current_search_incomplete",
    claimLevel:
      "negative certificate over the current independent sigma*hbar action-scale search families; not a proof that no action-scale law exists",
    requiredPositiveActionScale,
    acceptedIndependentActionScaleSourcePass: acceptedRows.length > 0,
    currentSearchExhaustedPass,
    rejectedFamilyCount: excludedRows.length,
    formalOnlyFamilyCount: formalOnlyRows.length,
    incompleteOrUntestedFamilyCount: untestedRows.length,
    nextClosureRoute:
      "full_point_event_diagonal_identity_or_new_independent_action_scale_law",
    retainedBranchClaim: false,
    acceptedRows,
    excludedRows,
    formalOnlyRows,
    untestedRows,
    rows: familyRows,
    retainedLimitation:
      "This summary exhausts only the solver's current finite candidate families. It does not reject a new independent sigma*hbar law, and it does not accept retained branch transport, full point-event identity, or retained energy routing.",
  };
}

function createActionBoundaryActionScaleDerivationCandidateRows({
  requiredPositiveActionScale,
  signedActionScaleForOmegaStarTarget,
  unitActionWakeEnergyIncrement,
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  actionScaleLawSearchTarget,
  rowAmplitudeLawAccepted,
  routeLocalCoefficientAccepted,
  routeLocalCoefficientAcceptanceTarget,
  rowAmplitudeRequirementTarget,
  leastNormBoundaryChargeAmplitudeLaw,
  targetChargeNorm,
}) {
  const rows = [];
  const seenIds = new Set();
  const routeLocalAcceptanceBlockers = [
    routeLocalCoefficientAccepted
      ? null
      : "accepted_route_local_coefficient_quadrature",
    rowAmplitudeLawAccepted ? null : "accepted_route_local_row_amplitude_law",
  ].filter(Boolean);
  const routeLocalAcceptanceEligible =
    routeLocalAcceptanceBlockers.length === 0;
  const addCandidate = ({
    id,
    source,
    formula,
    candidateActionScale,
    acceptanceEligible = routeLocalAcceptanceEligible,
    acceptanceBlockers = routeLocalAcceptanceBlockers,
    rejectionReason = null,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateActionScale = finiteOrNull(candidateActionScale);
    rows.push({
      id,
      status:
        finiteCandidateActionScale != null
          ? acceptanceEligible
            ? "action_scale_derivation_candidate_evaluated"
            : "action_scale_derivation_candidate_evaluated_not_acceptance_source"
          : "action_scale_derivation_candidate_not_finite",
      source,
      formula,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      evidence,
      candidateActionScale: finiteCandidateActionScale,
    });
  };
  const addAggregateCandidates = ({
    idPrefix,
    source,
    formulaPrefix,
    values,
    evidence,
  }) => {
    const finiteValues = values.filter(Number.isFinite);
    if (finiteValues.length === 0) {
      addCandidate({
        id: `${idPrefix}_missing`,
        source,
        formula: `${formulaPrefix} finite scalar missing`,
        candidateActionScale: null,
        evidence,
      });
      return;
    }
    const absValues = finiteValues.map((value) => Math.abs(value));
    const signedMean =
      finiteValues.reduce((sum, value) => sum + value, 0) / finiteValues.length;
    const absMean =
      absValues.reduce((sum, value) => sum + value, 0) / absValues.length;
    addCandidate({
      id: `${idPrefix}_min_abs`,
      source,
      formula: `min(abs(${formulaPrefix}))`,
      candidateActionScale: minFinite(absValues),
      evidence,
    });
    addCandidate({
      id: `${idPrefix}_mean_abs`,
      source,
      formula: `mean(abs(${formulaPrefix}))`,
      candidateActionScale: absMean,
      evidence,
    });
    addCandidate({
      id: `${idPrefix}_max_abs`,
      source,
      formula: `max(abs(${formulaPrefix}))`,
      candidateActionScale: maxFinite(absValues),
      evidence,
    });
    addCandidate({
      id: `${idPrefix}_signed_mean_abs`,
      source,
      formula: `abs(mean(${formulaPrefix}))`,
      candidateActionScale: Math.abs(signedMean),
      evidence,
    });
  };

  addCandidate({
    id: "required_scale_measured_by_boundary_charge",
    source: "action-boundary derivative comparison",
    formula:
      "|omega_* Delta J_wake| / |1/2 sum kappa_sigma_row partial_t1 K_eff,row|",
    candidateActionScale: requiredPositiveActionScale,
    acceptanceEligible: false,
    acceptanceBlockers: ["independent_sigma_hbar_action_scale_law"],
    rejectionReason:
      "This row measures the required comparison scale and cannot accept the sigma*hbar law it is trying to derive.",
    evidence: {
      signedActionScaleForOmegaStarTarget,
      unitActionWakeEnergyIncrement,
      omegaStarWeightedBoundaryCharge,
    },
  });
  addCandidate({
    id: "simple_scalar_search_best_rejected",
    source: "simple existing-scalar action-scale law search",
    formula: actionScaleLawSearchTarget?.bestRejectedCandidate?.formula ?? null,
    candidateActionScale:
      actionScaleLawSearchTarget?.bestRejectedCandidate?.candidateActionScale ??
      null,
    acceptanceEligible: false,
    acceptanceBlockers: ["simple_scalar_search_rejected"],
    rejectionReason:
      "This is the closest rejected simple-scalar candidate, retained as a comparison row rather than an acceptance source.",
    evidence: actionScaleLawSearchTarget?.bestRejectedCandidate ?? null,
  });

  const leastNormRows = leastNormBoundaryChargeAmplitudeLaw?.rows ?? [];
  const amplitudeEvidence = {
    rowAmplitudeRequirementStatus: rowAmplitudeRequirementTarget?.status ?? null,
    leastNormBoundaryChargeAmplitudeLawStatus:
      leastNormBoundaryChargeAmplitudeLaw?.status ?? null,
    targetResidualNorm:
      leastNormBoundaryChargeAmplitudeLaw?.targetResidualNorm ?? null,
    rowCount: leastNormBoundaryChargeAmplitudeLaw?.rowCount ?? null,
    activeBasisRowCount:
      leastNormBoundaryChargeAmplitudeLaw?.activeBasisRowCount ?? null,
  };
  addAggregateCandidates({
    idPrefix: "least_norm_row_amplitude",
    source: "accepted route-local least-norm boundary-charge row-amplitude law",
    formulaPrefix: "required row amplitude",
    values: leastNormRows.map((row) => row.requiredRowAmplitude),
    evidence: amplitudeEvidence,
  });
  addAggregateCandidates({
    idPrefix: "least_norm_boundary_charge_coefficient",
    source: "accepted route-local least-norm boundary-charge split",
    formulaPrefix: "least-norm boundary-charge coefficient",
    values: leastNormRows.map((row) => row.leastNormBoundaryChargeCoefficient),
    evidence: amplitudeEvidence,
  });

  const hPlusValues = (actionBoundaryDerivativeTarget?.rows ?? [])
    .map((row) => row.hPlusRouteWidth)
    .filter(Number.isFinite);
  const minHPlusRouteWidth =
    hPlusValues.length > 0 ? minFinite(hPlusValues) : null;
  const eta = actionBoundaryDerivativeTarget?.eta ?? null;
  const actionKernelMarginRatio =
    Number.isFinite(minHPlusRouteWidth) &&
    Number.isFinite(eta) &&
    Math.abs(eta) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minHPlusRouteWidth / eta
      : null;
  const coefficientValues = leastNormRows
    .map((row) => row.leastNormBoundaryChargeCoefficient)
    .filter(Number.isFinite);
  const minAbsCoefficient =
    coefficientValues.length > 0
      ? minFinite(coefficientValues.map((value) => Math.abs(value)))
      : null;
  addCandidate({
    id: "least_norm_boundary_charge_coefficient_min_abs_over_action_kernel_margin",
    source:
      "accepted route-local least-norm boundary-charge split and action-kernel normalization margin",
    formula:
      "min(abs(least-norm boundary-charge coefficient)) / (min(h_+ route width) / eta)",
    candidateActionScale:
      Number.isFinite(minAbsCoefficient) &&
      Number.isFinite(actionKernelMarginRatio) &&
      Math.abs(actionKernelMarginRatio) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? minAbsCoefficient / actionKernelMarginRatio
        : null,
    evidence: {
      ...amplitudeEvidence,
      minAbsCoefficient,
      eta,
      minHPlusRouteWidth,
      actionKernelMarginRatio,
    },
  });

  const commonCouplingCoefficient =
    routeLocalCoefficientAcceptanceTarget?.commonCouplingCoefficient ??
    leastNormRows.find((row) => Number.isFinite(row.commonCouplingCoefficient))
      ?.commonCouplingCoefficient ??
    null;
  addCandidate({
    id: "route_local_common_coupling_coefficient",
    source: "accepted route-local characteristic-tail coefficient rows",
    formula: "common kappa-sigma coupling coefficient",
    candidateActionScale: commonCouplingCoefficient,
    evidence: {
      routeLocalCoefficientAcceptanceStatus:
        routeLocalCoefficientAcceptanceTarget?.status ?? null,
    },
  });
  addCandidate({
    id: "route_local_common_coupling_coefficient_half",
    source: "accepted route-local characteristic-tail coefficient rows",
    formula: "common kappa-sigma coupling coefficient / 2",
    candidateActionScale: Number.isFinite(commonCouplingCoefficient)
      ? commonCouplingCoefficient / 2
      : null,
    evidence: {
      routeLocalCoefficientAcceptanceStatus:
        routeLocalCoefficientAcceptanceTarget?.status ?? null,
    },
  });
  addCandidate({
    id: "route_local_common_coupling_times_target_charge_norm",
    source: "route-local coefficient rows and normalized wake charge",
    formula: "common kappa-sigma coupling coefficient * |Delta J_wake|",
    candidateActionScale:
      Number.isFinite(commonCouplingCoefficient) &&
      Number.isFinite(targetChargeNorm)
        ? commonCouplingCoefficient * targetChargeNorm
        : null,
    evidence: {
      routeLocalCoefficientAcceptanceStatus:
        routeLocalCoefficientAcceptanceTarget?.status ?? null,
      targetChargeNorm,
    },
  });

  return rows;
}

function createActionBoundaryActionScaleResidualCorrectionDiagnostic({
  requiredPositiveActionScale,
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  targetChargeNorm,
  leastNormBoundaryChargeAmplitudeLaw,
  routeLocalCoefficientAcceptanceTarget,
  bestRejectedCandidate,
  layerByName = new Map(),
}) {
  const bestResidualAbs = bestRejectedCandidate?.residualAbs ?? null;
  const actionKernelMarginRatio =
    bestRejectedCandidate?.evidence?.actionKernelMarginRatio ?? null;
  const minAbsCoefficient =
    bestRejectedCandidate?.evidence?.minAbsCoefficient ?? null;
  const coefficientGap =
    Number.isFinite(requiredPositiveActionScale) &&
    Number.isFinite(actionKernelMarginRatio) &&
    Number.isFinite(minAbsCoefficient)
      ? requiredPositiveActionScale * actionKernelMarginRatio - minAbsCoefficient
      : null;
  const convergenceRows = createActionBoundaryQuadratureConvergenceRows({
    omegaStarWeightedBoundaryCharge,
    actionBoundaryDerivativeTarget,
    candidateActionScale: bestRejectedCandidate?.candidateActionScale ?? null,
  });
  const finalConvergenceRow = convergenceRows.at(-1) ?? null;
  const quadratureShiftFromCurrent =
    Number.isFinite(finalConvergenceRow?.requiredPositiveActionScale) &&
    Number.isFinite(requiredPositiveActionScale)
      ? finalConvergenceRow.requiredPositiveActionScale - requiredPositiveActionScale
      : null;
  const endpointCorrectionRows = createActionBoundaryEndpointCorrectionRows({
    actionBoundaryDerivativeTarget,
    targetCorrectionAbs: bestResidualAbs,
    actionKernelMarginRatio,
  });
  const boundaryChargeGapDiagnostic =
    createActionBoundaryScaleBoundaryChargeGapDiagnostic({
      requiredPositiveActionScale,
      actionKernelMarginRatio,
      minAbsCoefficient,
      leastNormBoundaryChargeAmplitudeLaw,
    });
  const coefficientProvenanceDiagnostic =
    createActionBoundaryCoefficientProvenanceDiagnostic({
      boundaryChargeGapDiagnostic,
      leastNormBoundaryChargeAmplitudeLaw,
      routeLocalCoefficientAcceptanceTarget,
      eta: actionBoundaryDerivativeTarget?.eta ?? null,
    });
  const boundaryChargeIncrementCandidateRows =
    createActionBoundaryChargeIncrementCandidateRows({
      boundaryChargeGapDiagnostic,
      actionBoundaryDerivativeTarget,
      actionKernelMarginRatio,
      quadratureShiftFromCurrent,
      endpointCorrectionRows,
      bestResidualAbs,
    });
  const alternateNormalizationShiftDiagnostic =
    createActionBoundaryAlternateNormalizationShiftDiagnostic({
      requiredPositiveActionScale,
      bestRejectedCandidate,
      actionBoundaryDerivativeTarget,
      quadratureShiftFromCurrent,
      endpointCorrectionRows,
    });
  const retainedWorkActionScaleDiagnostic =
    createActionBoundaryRetainedWorkActionScaleDiagnostic({
      requiredPositiveActionScale,
      omegaStarWeightedBoundaryCharge,
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      targetChargeNorm,
    });
  const exactEndpointProviderActionScaleDiagnostic =
    createExactEndpointProviderActionScaleDiagnostic({
      requiredPositiveActionScale,
      omegaStarWeightedBoundaryCharge,
      actionBoundaryDerivativeTarget,
      compensatedRoutePayloadCertificate,
      targetChargeNorm,
      layerByName,
    });
  const acceptedBoundaryChargeIncrementRows =
    boundaryChargeIncrementCandidateRows.filter(
      (row) =>
        row.acceptanceEligible === true &&
        row.boundaryChargeIncrementCandidatePass === true
    );
  const exactDiagnosticBoundaryChargeIncrementRows =
    boundaryChargeIncrementCandidateRows.filter(
      (row) =>
        row.acceptanceEligible !== true &&
        row.boundaryChargeIncrementCandidatePass === true
    );
  const acceptedEndpointCorrectionRows = endpointCorrectionRows.filter(
    (row) => row.correctionCandidatePass
  );
  const quadratureClearsResidual =
    Number.isFinite(finalConvergenceRow?.residualAbs) &&
    finalConvergenceRow.residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const quadratureStableResidual =
    Number.isFinite(quadratureShiftFromCurrent) &&
    Math.abs(quadratureShiftFromCurrent) <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(finalConvergenceRow?.residualAbs) &&
    finalConvergenceRow.residualAbs > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    schema:
      "aaa-tri-binary-action-boundary-action-scale-residual-correction-diagnostic.v1",
    status:
      !Number.isFinite(bestResidualAbs)
        ? "action_scale_residual_correction_diagnostic_blocked_until_best_residual"
        : quadratureClearsResidual
          ? "action_scale_residual_correction_diagnostic_quadrature_clears_residual"
          : acceptedEndpointCorrectionRows.length > 0
            ? "action_scale_residual_correction_diagnostic_endpoint_candidate_matches_residual"
            : quadratureStableResidual
              ? "action_scale_residual_correction_diagnostic_quadrature_stable_endpoint_candidates_rejected"
              : "action_scale_residual_correction_diagnostic_no_correction_accepted",
    claimLevel:
      "diagnostic residual audit for the best route-local action-scale miss; not an accepted sigma*hbar law",
    bestRejectedCandidateId: bestRejectedCandidate?.id ?? null,
    requiredPositiveActionScale,
    bestCandidateActionScale: bestRejectedCandidate?.candidateActionScale ?? null,
    bestResidual: bestRejectedCandidate?.residual ?? null,
    bestResidualAbs,
    actionKernelMarginRatio,
    minAbsCoefficient,
    coefficientGap,
    coefficientGapOverMargin:
      Number.isFinite(coefficientGap) &&
      Number.isFinite(actionKernelMarginRatio) &&
      Math.abs(actionKernelMarginRatio) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? coefficientGap / actionKernelMarginRatio
        : null,
    quadratureClearsResidual,
    quadratureStableResidual,
    quadratureShiftFromCurrent,
    boundaryChargeGapDiagnosticStatus:
      boundaryChargeGapDiagnostic?.status ?? null,
    boundaryChargeGapDiagnostic,
    coefficientProvenanceDiagnosticStatus:
      coefficientProvenanceDiagnostic?.status ?? null,
    coefficientProvenanceDiagnostic,
    boundaryChargeIncrementCandidateStatus:
      !Number.isFinite(boundaryChargeGapDiagnostic?.targetChargeGap)
        ? "boundary_charge_increment_candidates_blocked_until_gap"
        : acceptedBoundaryChargeIncrementRows.length > 0
          ? "boundary_charge_increment_candidate_matches_gap"
          : exactDiagnosticBoundaryChargeIncrementRows.length > 0
            ? "boundary_charge_increment_candidates_rejected_target_derived_comparison_only"
            : "boundary_charge_increment_candidates_rejected",
    boundaryChargeIncrementCandidateCount:
      boundaryChargeIncrementCandidateRows.length,
    acceptedBoundaryChargeIncrementCandidateCount:
      acceptedBoundaryChargeIncrementRows.length,
    exactDiagnosticBoundaryChargeIncrementCount:
      exactDiagnosticBoundaryChargeIncrementRows.length,
    acceptedBoundaryChargeIncrementRows,
    exactDiagnosticBoundaryChargeIncrementRows,
    boundaryChargeIncrementCandidateRows,
    alternateNormalizationShiftDiagnosticStatus:
      alternateNormalizationShiftDiagnostic?.status ?? null,
    alternateNormalizationShiftDiagnostic,
    retainedWorkActionScaleDiagnosticStatus:
      retainedWorkActionScaleDiagnostic?.status ?? null,
    retainedWorkActionScaleDiagnostic,
    exactEndpointProviderActionScaleDiagnosticStatus:
      exactEndpointProviderActionScaleDiagnostic?.status ?? null,
    exactEndpointProviderActionScaleDiagnostic,
    convergenceRows,
    endpointCorrectionCandidateCount: endpointCorrectionRows.length,
    acceptedEndpointCorrectionCount: acceptedEndpointCorrectionRows.length,
    acceptedEndpointCorrectionRows,
    endpointCorrectionRows,
    retainedLimitation:
      "The residual is audited against higher-resolution normalized-history quadrature and finite endpoint-leakage scales. Passing this diagnostic would only identify a correction source; accepting sigma*hbar still requires an independent route-local action-scale law.",
  };
}

function createActionBoundaryAlternateNormalizationShiftDiagnostic({
  requiredPositiveActionScale,
  bestRejectedCandidate,
  actionBoundaryDerivativeTarget,
  quadratureShiftFromCurrent,
  endpointCorrectionRows,
}) {
  const minAbsCoefficient =
    bestRejectedCandidate?.evidence?.minAbsCoefficient ?? null;
  const currentMarginRatio =
    bestRejectedCandidate?.evidence?.actionKernelMarginRatio ?? null;
  const eta = bestRejectedCandidate?.evidence?.eta ?? null;
  const minHPlusRouteWidth =
    bestRejectedCandidate?.evidence?.minHPlusRouteWidth ?? null;
  const requiredMarginRatio =
    Number.isFinite(minAbsCoefficient) &&
    Number.isFinite(requiredPositiveActionScale) &&
    Math.abs(requiredPositiveActionScale) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minAbsCoefficient / requiredPositiveActionScale
      : null;
  const requiredEtaForFixedRouteWidth =
    Number.isFinite(minHPlusRouteWidth) &&
    Number.isFinite(requiredMarginRatio) &&
    Math.abs(requiredMarginRatio) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minHPlusRouteWidth / requiredMarginRatio
      : null;
  const requiredHPlusForFixedEta =
    Number.isFinite(eta) && Number.isFinite(requiredMarginRatio)
      ? eta * requiredMarginRatio
      : null;
  const targetEtaShiftAbs =
    Number.isFinite(requiredEtaForFixedRouteWidth) && Number.isFinite(eta)
      ? Math.abs(requiredEtaForFixedRouteWidth - eta)
      : null;
  const targetHPlusShiftAbs =
    Number.isFinite(requiredHPlusForFixedEta) &&
    Number.isFinite(minHPlusRouteWidth)
      ? Math.abs(requiredHPlusForFixedEta - minHPlusRouteWidth)
      : null;
  const actionScalePerEta =
    Number.isFinite(minAbsCoefficient) &&
    Number.isFinite(minHPlusRouteWidth) &&
    Math.abs(minHPlusRouteWidth) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minAbsCoefficient / minHPlusRouteWidth
      : null;
  const actionScaleCorrectionToEtaShift = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(actionScalePerEta) &&
    Math.abs(actionScalePerEta) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / Math.abs(actionScalePerEta)
      : null;
  const rows = [];
  const seenIds = new Set();
  const addRow = ({
    id,
    source,
    shiftKind,
    formula,
    candidateShiftAbs,
    targetShiftAbs,
    acceptanceEligible = true,
    acceptanceBlockers = [],
    rejectionReason = null,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateShiftAbs = finiteOrNull(candidateShiftAbs);
    const residual =
      finiteCandidateShiftAbs != null && Number.isFinite(targetShiftAbs)
        ? finiteCandidateShiftAbs - targetShiftAbs
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    rows.push({
      id,
      status:
        finiteCandidateShiftAbs != null
          ? acceptanceEligible
            ? "alternate_normalization_shift_candidate_evaluated"
            : "alternate_normalization_shift_candidate_evaluated_not_acceptance_source"
          : "alternate_normalization_shift_candidate_not_finite",
      source,
      shiftKind,
      formula,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      evidence,
      targetShiftAbs,
      candidateShiftAbs: finiteCandidateShiftAbs,
      residual,
      residualAbs,
      alternateNormalizationShiftCandidatePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    });
  };

  addRow({
    id: "required_eta_shift_for_fixed_route_width",
    source: "required action-scale comparison",
    shiftKind: "eta",
    formula:
      "abs(min(h_+ route width) / required margin ratio - eta)",
    candidateShiftAbs: targetEtaShiftAbs,
    targetShiftAbs: targetEtaShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_normalization_shift"],
    rejectionReason:
      "This row computes the eta shift required by the measured action-scale comparison and cannot supply an independent normalization law.",
    evidence: {
      eta,
      minHPlusRouteWidth,
      currentMarginRatio,
      requiredMarginRatio,
      requiredEtaForFixedRouteWidth,
    },
  });
  addRow({
    id: "required_h_plus_shift_for_fixed_eta",
    source: "required action-scale comparison",
    shiftKind: "h_plus_route_width",
    formula:
      "abs(eta * required margin ratio - min(h_+ route width))",
    candidateShiftAbs: targetHPlusShiftAbs,
    targetShiftAbs: targetHPlusShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_normalization_shift"],
    rejectionReason:
      "This row computes the route-width shift required by the measured action-scale comparison and cannot supply an independent normalization law.",
    evidence: {
      eta,
      minHPlusRouteWidth,
      currentMarginRatio,
      requiredMarginRatio,
      requiredHPlusForFixedEta,
    },
  });
  addRow({
    id: "quadrature_shift_as_eta_shift",
    source: "higher-resolution normalized-history quadrature",
    shiftKind: "eta",
    formula:
      "abs(8192-step required-scale shift) / abs(min(abs(coefficient)) / min(h_+ route width))",
    candidateShiftAbs:
      actionScaleCorrectionToEtaShift(quadratureShiftFromCurrent),
    targetShiftAbs: targetEtaShiftAbs,
    evidence: {
      quadratureShiftFromCurrent,
      actionScalePerEta,
    },
  });

  for (const row of endpointCorrectionRows) {
    addRow({
      id: `endpoint_${row.id}_as_eta_shift`,
      source: "finite endpoint-leakage correction scale",
      shiftKind: "eta",
      formula: `${row.formula} converted by abs(min(abs(coefficient)) / min(h_+ route width))`,
      candidateShiftAbs:
        actionScaleCorrectionToEtaShift(row.candidateCorrectionAbs),
      targetShiftAbs: targetEtaShiftAbs,
      evidence: {
        endpointCorrectionRowId: row.id,
        candidateCorrectionAbs: row.candidateCorrectionAbs,
        actionScalePerEta,
      },
    });
  }

  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  const compensationSplit = createActionBoundaryEndpointLeakageSplit(
    derivativeRows
  );
  const addEndpointLeakageWidthRow = ({ id, formula, value }) => {
    addRow({
      id,
      source: "finite endpoint-leakage rows",
      shiftKind: "h_plus_route_width",
      formula,
      candidateShiftAbs: value,
      targetShiftAbs: targetHPlusShiftAbs,
      evidence: {
        routeRowCount: derivativeRows.length,
        minHPlusRouteWidth: compensationSplit.minHPlusRouteWidth,
      },
    });
  };
  addEndpointLeakageWidthRow({
    id: "max_route_width_endpoint_leakage_as_h_plus_shift",
    formula: "max(abs(route-width endpoint leakage))",
    value: maxFinite(compensationSplit.allEndpointLeakages),
  });
  addEndpointLeakageWidthRow({
    id: "max_compensated_endpoint_leakage_as_h_plus_shift",
    formula: "max(abs(compensated-row endpoint leakage))",
    value: maxFinite(compensationSplit.compensatedEndpointLeakages),
  });
  addEndpointLeakageWidthRow({
    id: "max_zero_slack_endpoint_leakage_as_h_plus_shift",
    formula: "max(abs(zero-slack endpoint leakage))",
    value: maxFinite(compensationSplit.zeroSlackEndpointLeakages),
  });
  addEndpointLeakageWidthRow({
    id: "sum_zero_slack_endpoint_leakage_as_h_plus_shift",
    formula: "sum(abs(zero-slack endpoint leakage))",
    value:
      compensationSplit.zeroSlackEndpointLeakages.length > 0
        ? compensationSplit.zeroSlackEndpointLeakages.reduce(
            (sum, value) => sum + value,
            0
          )
        : null,
  });

  const acceptedRows = rows.filter(
    (row) =>
      row.acceptanceEligible === true &&
      row.alternateNormalizationShiftCandidatePass === true
  );
  const exactDiagnosticRows = rows.filter(
    (row) =>
      row.acceptanceEligible !== true &&
      row.alternateNormalizationShiftCandidatePass === true
  );

  return {
    schema:
      "aaa-tri-binary-action-boundary-alternate-normalization-shift-diagnostic.v1",
    status:
      !Number.isFinite(targetEtaShiftAbs) ||
      !Number.isFinite(targetHPlusShiftAbs)
        ? "alternate_normalization_shift_diagnostic_inputs_missing"
        : acceptedRows.length > 0
          ? "alternate_normalization_shift_candidate_matches"
          : exactDiagnosticRows.length > 0
            ? "alternate_normalization_shift_candidates_rejected_target_derived_comparison_only"
            : "alternate_normalization_shift_candidates_rejected",
    claimLevel:
      "fail-closed diagnostic for the alternate normalization shift required by the best action-scale miss; not an accepted normalization law",
    currentMarginRatio,
    requiredMarginRatio,
    marginRatioGap:
      Number.isFinite(requiredMarginRatio) && Number.isFinite(currentMarginRatio)
        ? requiredMarginRatio - currentMarginRatio
        : null,
    eta,
    requiredEtaForFixedRouteWidth,
    targetEtaShiftAbs,
    minHPlusRouteWidth,
    requiredHPlusForFixedEta,
    targetHPlusShiftAbs,
    actionScalePerEta,
    candidateCount: rows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactDiagnosticCount: exactDiagnosticRows.length,
    acceptedRows,
    exactDiagnosticRows,
    rows,
    retainedLimitation:
      "The current declared margin ratio remains eta = min(h_+ route width) / 4. This diagnostic only states the alternate eta or h_+ shift required to make the best coefficient/margin law exact and tests whether current quadrature or endpoint-width rows supply it independently.",
  };
}

function createActionBoundaryRetainedWorkActionScaleDiagnostic({
  requiredPositiveActionScale,
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  targetChargeNorm,
}) {
  const unitActionWakeEnergyIncrement =
    actionBoundaryDerivativeTarget?.halfWeightedNormalizedPartialT1KernelTermSum ??
    null;
  const unitActionWakeEnergyMagnitude = Number.isFinite(
    unitActionWakeEnergyIncrement
  )
    ? Math.abs(unitActionWakeEnergyIncrement)
    : null;
  const omegaStar =
    Number.isFinite(omegaStarWeightedBoundaryCharge) &&
    Number.isFinite(targetChargeNorm) &&
    Math.abs(targetChargeNorm) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? omegaStarWeightedBoundaryCharge / targetChargeNorm
      : null;
  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  const eta = actionBoundaryDerivativeTarget?.eta ?? null;
  const minHPlusRouteWidth = minFinite(
    derivativeRows.map((row) => row.hPlusRouteWidth)
  );
  const actionKernelMarginRatio =
    Number.isFinite(minHPlusRouteWidth) &&
    Number.isFinite(eta) &&
    Math.abs(eta) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minHPlusRouteWidth / eta
      : null;
  const routeRows = compensatedRoutePayloadCertificate?.rows ?? [];
  const routeWorkAcceptanceEligible =
    compensatedRoutePayloadCertificate?.retainedBranchClaim === true &&
    compensatedRoutePayloadCertificate?.complete === true;
  const rows = [];
  const seenIds = new Set();
  const scaleByUnitDerivative = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(unitActionWakeEnergyMagnitude) &&
    unitActionWakeEnergyMagnitude > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / unitActionWakeEnergyMagnitude
      : null;
  const omegaWeightedScaleByUnitDerivative = (value) =>
    Number.isFinite(value) && Number.isFinite(omegaStar)
      ? scaleByUnitDerivative(omegaStar * value)
      : null;
  const scaleByMargin = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(actionKernelMarginRatio) &&
    Math.abs(actionKernelMarginRatio) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / Math.abs(actionKernelMarginRatio)
      : null;
  const addRow = ({
    id,
    source,
    formula,
    candidateActionScale,
    sameEventCarrier = false,
    acceptanceEligible = routeWorkAcceptanceEligible,
    acceptanceBlockers = routeWorkAcceptanceEligible
      ? []
      : ["accepted_retained_work_route_law"],
    rejectionReason = routeWorkAcceptanceEligible
      ? null
      : "The route-payload rows are formal diagnostics until the same retained event has an accepted retained-work route law.",
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateActionScale = finiteOrNull(candidateActionScale);
    const residual =
      finiteCandidateActionScale != null &&
      Number.isFinite(requiredPositiveActionScale)
        ? finiteCandidateActionScale - requiredPositiveActionScale
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    rows.push({
      id,
      status:
        finiteCandidateActionScale != null
          ? acceptanceEligible
            ? "retained_work_action_scale_candidate_evaluated"
            : "retained_work_action_scale_candidate_evaluated_not_acceptance_source"
          : "retained_work_action_scale_candidate_not_finite",
      source,
      formula,
      sameEventCarrier,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      evidence,
      candidateActionScale: finiteCandidateActionScale,
      requiredPositiveActionScale,
      residual,
      residualAbs,
      retainedWorkActionScaleCandidatePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    });
  };

  addRow({
    id: "omega_star_boundary_charge_over_unit_action_derivative",
    source: "omega_* boundary-charge comparison",
    formula:
      "abs(omega_* Delta J_wake) / abs(1/2 sum kappa_sigma_row partial_t1 K_eff,row)",
    candidateActionScale: scaleByUnitDerivative(omegaStarWeightedBoundaryCharge),
    sameEventCarrier: true,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_action_scale_comparison"],
    rejectionReason:
      "This row restates the measured action-scale comparison and cannot supply an independent retained-work law.",
    evidence: {
      omegaStarWeightedBoundaryCharge,
      unitActionWakeEnergyMagnitude,
    },
  });

  const routeScalarRows = [];
  for (const row of routeRows) {
    const role = row.continuityRole ?? `route_${routeScalarRows.length}`;
    const transportNorm =
      row.transportAngularMomentumIncrement?.unitEndpointPairAngularMomentumNorm ??
      null;
    const recoilNorm =
      row.recoilChannelData?.unitRecoilAngularMomentumNorm ?? null;
    const rootEnergy =
      row.rootEnergyIncrement?.unitActionRootEnergyIncrement ?? null;
    const endpointPairResidual = row.endpointPairResidual ?? null;
    const endpointToChartResidual = row.endpointToChartResidual ?? null;
    const clockRetune =
      row.rootEnergyIncrement?.clockRetuneMagnitude ??
      row.boundedUndeclaredRouteSlack?.clockRetuneUpperBound ??
      null;
    const phaseCompensation =
      row.rootEnergyIncrement?.phaseMagnitude ??
      row.boundedUndeclaredRouteSlack?.phaseUpperBound ??
      null;
    const routeWidth = row.minOneSidedRouteWidth ?? null;
    const routeEvidence = {
      incomingPairKey: row.incomingPairKey,
      outgoingPairKey: row.outgoingPairKey,
      continuityRole: row.continuityRole,
      compensationRequired: row.compensationRequired,
      routeRootKey: row.routeRootKey,
      zeroSlackRoutePass: row.zeroSlackRoutePass,
    };

    addRow({
      id: `${role}_endpoint_pair_residual_half`,
      source: "compensated route-payload endpoint geometry",
      formula: "endpoint-pair residual / 2",
      candidateActionScale: Number.isFinite(endpointPairResidual)
        ? Math.abs(endpointPairResidual) / 2
        : null,
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        endpointPairResidual,
      },
    });
    addRow({
      id: `${role}_omega_weighted_route_width_over_unit_action_derivative`,
      source: "compensated route-payload one-sided root interval",
      formula: "omega_* min one-sided route width / abs(unit action derivative)",
      candidateActionScale: omegaWeightedScaleByUnitDerivative(routeWidth),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        routeWidth,
        omegaStar,
      },
    });
    addRow({
      id: `${role}_omega_weighted_transport_norm_over_unit_action_derivative`,
      source: "compensated route-payload transport angular momentum",
      formula:
        "omega_* unit transport angular-momentum norm / abs(unit action derivative)",
      candidateActionScale: omegaWeightedScaleByUnitDerivative(transportNorm),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        transportNorm,
        omegaStar,
      },
    });
    addRow({
      id: `${role}_omega_weighted_recoil_norm_over_unit_action_derivative`,
      source: "compensated route-payload recoil channel",
      formula:
        "omega_* unit recoil angular-momentum norm / abs(unit action derivative)",
      candidateActionScale: omegaWeightedScaleByUnitDerivative(recoilNorm),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        recoilNorm,
        omegaStar,
      },
    });
    addRow({
      id: `${role}_root_energy_over_unit_action_derivative`,
      source: "compensated route-payload root-energy increment",
      formula: "unit-action root-energy increment / abs(unit action derivative)",
      candidateActionScale: scaleByUnitDerivative(rootEnergy),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        rootEnergy,
      },
    });
    addRow({
      id: `${role}_root_energy_over_action_kernel_margin`,
      source: "compensated route-payload root-energy increment",
      formula: "unit-action root-energy increment / (min(h_+ route width) / eta)",
      candidateActionScale: scaleByMargin(rootEnergy),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        rootEnergy,
        actionKernelMarginRatio,
      },
    });
    addRow({
      id: `${role}_clock_retune_half`,
      source: "compensated route-payload clock retune",
      formula: "clock retune / 2",
      candidateActionScale: Number.isFinite(clockRetune)
        ? Math.abs(clockRetune) / 2
        : null,
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        clockRetune,
      },
    });
    addRow({
      id: `${role}_phase_compensation_over_action_kernel_margin`,
      source: "compensated route-payload phase compensation",
      formula: "phase compensation / (min(h_+ route width) / eta)",
      candidateActionScale: scaleByMargin(phaseCompensation),
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        phaseCompensation,
        actionKernelMarginRatio,
      },
    });
    addRow({
      id: `${role}_endpoint_phase_work_over_unit_action_derivative`,
      source: "compensated route-payload endpoint and phase diagnostics",
      formula:
        "abs(endpoint-to-chart residual * phase compensation) / abs(unit action derivative)",
      candidateActionScale:
        Number.isFinite(endpointToChartResidual) &&
        Number.isFinite(phaseCompensation)
          ? scaleByUnitDerivative(endpointToChartResidual * phaseCompensation)
          : null,
      sameEventCarrier: true,
      evidence: {
        ...routeEvidence,
        endpointToChartResidual,
        phaseCompensation,
      },
    });
    routeScalarRows.push({
      role,
      transportNorm,
      recoilNorm,
      rootEnergy,
      endpointPairResidual,
      endpointToChartResidual,
      phaseCompensation,
      routeWidth,
    });
  }

  const finiteRouteScalars = (selector) =>
    routeScalarRows.map(selector).filter(Number.isFinite);
  const rootEnergySum = finiteRouteScalars((row) => row.rootEnergy).reduce(
    (sum, value) => sum + value,
    0
  );
  const rootEnergyCount = finiteRouteScalars((row) => row.rootEnergy).length;
  addRow({
    id: "root_energy_sum_over_unit_action_derivative",
    source: "compensated route-payload root-energy increments",
    formula: "sum(unit-action root-energy increments) / abs(unit action derivative)",
    candidateActionScale:
      rootEnergyCount > 0 ? scaleByUnitDerivative(rootEnergySum) : null,
    sameEventCarrier: true,
    evidence: {
      rootEnergyCount,
      rootEnergySum,
    },
  });
  addRow({
    id: "max_endpoint_pair_residual_half",
    source: "compensated route-payload endpoint geometry",
    formula: "max(abs(endpoint-pair residual)) / 2",
    candidateActionScale:
      finiteRouteScalars((row) => row.endpointPairResidual).length > 0
        ? maxFinite(
            finiteRouteScalars((row) => Math.abs(row.endpointPairResidual))
          ) / 2
        : null,
    sameEventCarrier: true,
  });
  addRow({
    id: "max_omega_weighted_transport_norm_over_unit_action_derivative",
    source: "compensated route-payload transport angular momentum",
    formula:
      "omega_* max(unit transport angular-momentum norm) / abs(unit action derivative)",
    candidateActionScale: omegaWeightedScaleByUnitDerivative(
      maxFinite(finiteRouteScalars((row) => row.transportNorm))
    ),
    sameEventCarrier: true,
  });
  addRow({
    id: "max_endpoint_phase_work_over_unit_action_derivative",
    source: "compensated route-payload endpoint and phase diagnostics",
    formula:
      "max(abs(endpoint-to-chart residual * phase compensation)) / abs(unit action derivative)",
    candidateActionScale: scaleByUnitDerivative(
      maxFinite(
        routeScalarRows
          .map((row) =>
            Number.isFinite(row.endpointToChartResidual) &&
            Number.isFinite(row.phaseCompensation)
              ? Math.abs(row.endpointToChartResidual * row.phaseCompensation)
              : null
          )
          .filter(Number.isFinite)
      )
    ),
    sameEventCarrier: true,
  });

  const finiteRows = rows.filter((row) =>
    Number.isFinite(row.candidateActionScale)
  );
  const acceptedRows = finiteRows.filter(
    (row) =>
      row.acceptanceEligible === true &&
      row.retainedWorkActionScaleCandidatePass === true
  );
  const exactDiagnosticRows = finiteRows.filter(
    (row) =>
      row.acceptanceEligible !== true &&
      row.retainedWorkActionScaleCandidatePass === true
  );
  const exactTargetDerivedRows = exactDiagnosticRows.filter((row) =>
    row.acceptanceBlockers.includes("target_derived_action_scale_comparison")
  );
  const exactFormalIndependentRows = exactDiagnosticRows.filter(
    (row) =>
      !row.acceptanceBlockers.includes("target_derived_action_scale_comparison")
  );
  const independentRows = finiteRows.filter(
    (row) => !row.acceptanceBlockers.includes("target_derived_action_scale_comparison")
  );
  const bestIndependentCandidate =
    independentRows.length > 0
      ? independentRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;

  return {
    schema:
      "aaa-tri-binary-action-boundary-retained-work-action-scale-diagnostic.v1",
    status:
      !Number.isFinite(requiredPositiveActionScale) ||
      !Number.isFinite(unitActionWakeEnergyMagnitude)
        ? "retained_work_action_scale_diagnostic_inputs_missing"
        : finiteRows.length === 0
          ? "retained_work_action_scale_diagnostic_no_finite_candidates"
          : acceptedRows.length > 0
            ? "retained_work_action_scale_candidate_accepted"
            : exactFormalIndependentRows.length > 0
              ? "retained_work_action_scale_candidates_rejected_formal_only"
              : exactTargetDerivedRows.length > 0
                ? "retained_work_action_scale_candidates_rejected_target_derived_comparison_only"
              : "retained_work_action_scale_candidates_rejected",
    claimLevel:
      "fail-closed diagnostic for retained-work and near-field route-payload action-scale candidates; not an accepted wake-energy route",
    requiredPositiveActionScale,
    unitActionWakeEnergyIncrement,
    unitActionWakeEnergyMagnitude,
    omegaStar,
    omegaStarWeightedBoundaryCharge,
    targetChargeNorm,
    actionKernelMarginRatio,
    routeWorkAcceptanceEligible,
    routeRowCount: routeRows.length,
    candidateCount: rows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactDiagnosticCount: exactDiagnosticRows.length,
    exactTargetDerivedCount: exactTargetDerivedRows.length,
    exactFormalIndependentCount: exactFormalIndependentRows.length,
    bestIndependentCandidate,
    acceptedRows,
    exactDiagnosticRows,
    rows,
    retainedLimitation:
      "The tested rows use only existing compensated route-payload, root-energy, transport, recoil, endpoint, and slack diagnostics. These rows can narrow the retained-work route, but they do not become acceptance sources until the route has an accepted retained-work law on the same event.",
  };
}

function createExactEndpointProviderActionScaleDiagnostic({
  requiredPositiveActionScale,
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  targetChargeNorm,
  layerByName = new Map(),
}) {
  const unitActionWakeEnergyIncrement =
    actionBoundaryDerivativeTarget?.halfWeightedNormalizedPartialT1KernelTermSum ??
    null;
  const unitActionWakeEnergyMagnitude = Number.isFinite(
    unitActionWakeEnergyIncrement
  )
    ? Math.abs(unitActionWakeEnergyIncrement)
    : null;
  const omegaStar =
    Number.isFinite(omegaStarWeightedBoundaryCharge) &&
    Number.isFinite(targetChargeNorm) &&
    Math.abs(targetChargeNorm) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? omegaStarWeightedBoundaryCharge / targetChargeNorm
      : null;
  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  const eta = actionBoundaryDerivativeTarget?.eta ?? null;
  const minHPlusRouteWidth = minFinite(
    derivativeRows.map((row) => row.hPlusRouteWidth)
  );
  const actionKernelMarginRatio =
    Number.isFinite(minHPlusRouteWidth) &&
    Number.isFinite(eta) &&
    Math.abs(eta) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? minHPlusRouteWidth / eta
      : null;
  const scaleByUnitDerivative = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(unitActionWakeEnergyMagnitude) &&
    unitActionWakeEnergyMagnitude > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / unitActionWakeEnergyMagnitude
      : null;
  const scaleByMargin = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(actionKernelMarginRatio) &&
    Math.abs(actionKernelMarginRatio) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / Math.abs(actionKernelMarginRatio)
      : null;
  const omegaWeightedScaleByUnitDerivative = (value) =>
    Number.isFinite(value) && Number.isFinite(omegaStar)
      ? scaleByUnitDerivative(omegaStar * value)
      : null;
  const providerEligibleRouteRows = (compensatedRoutePayloadCertificate?.rows ?? [])
    .filter(
      (row) =>
        row.continuityRole === "same_source" &&
        row.compensationRequired === true
    );
  const endpointRows = providerEligibleRouteRows.map((row) =>
    createExactEndpointProviderActionScaleEndpointRow({ row, layerByName })
  );
  const candidateRows = [];
  const seenIds = new Set();
  const addCandidate = ({
    id,
    source,
    formula,
    candidateActionScale,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateActionScale = finiteOrNull(candidateActionScale);
    const residual =
      finiteCandidateActionScale != null &&
      Number.isFinite(requiredPositiveActionScale)
        ? finiteCandidateActionScale - requiredPositiveActionScale
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    candidateRows.push({
      id,
      status:
        finiteCandidateActionScale != null
          ? "exact_endpoint_provider_action_scale_candidate_evaluated_not_acceptance_source"
          : "exact_endpoint_provider_action_scale_candidate_not_finite",
      source,
      formula,
      acceptanceEligible: false,
      acceptanceBlockers: ["exact_endpoint_provider_not_retained_action_scale_law"],
      rejectionReason:
        "Exact circular endpoint corrections are local endpoint-provider evidence, not an independent sigma*hbar action-scale law.",
      evidence,
      candidateActionScale: finiteCandidateActionScale,
      requiredPositiveActionScale,
      residual,
      residualAbs,
      exactEndpointProviderActionScaleCandidatePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    });
  };

  for (const row of endpointRows) {
    const routeId =
      row.continuityRole ??
      `${row.incomingPairKey ?? "incoming"}_${row.outgoingPairKey ?? "outgoing"}`;
    addCandidate({
      id: `${routeId}_max_exact_endpoint_correction_norm`,
      source: "exact circular endpoint-provider correction",
      formula: "max(incoming endpoint correction norm, outgoing endpoint correction norm)",
      candidateActionScale: row.maxEndpointCorrectionNorm,
      evidence: row,
    });
    addCandidate({
      id: `${routeId}_exact_endpoint_correction_difference_abs`,
      source: "exact circular endpoint-provider correction",
      formula: "abs(outgoing endpoint correction norm - incoming endpoint correction norm)",
      candidateActionScale: row.endpointCorrectionDifferenceAbs,
      evidence: row,
    });
    addCandidate({
      id: `${routeId}_exact_endpoint_correction_sum`,
      source: "exact circular endpoint-provider correction",
      formula: "incoming endpoint correction norm + outgoing endpoint correction norm",
      candidateActionScale: row.endpointCorrectionNormSum,
      evidence: row,
    });
    addCandidate({
      id: `${routeId}_max_exact_endpoint_correction_over_action_kernel_margin`,
      source: "exact circular endpoint-provider correction and action-kernel margin",
      formula:
        "max endpoint correction norm / (min(h_+ route width) / eta)",
      candidateActionScale: scaleByMargin(row.maxEndpointCorrectionNorm),
      evidence: {
        ...row,
        actionKernelMarginRatio,
      },
    });
    addCandidate({
      id: `${routeId}_omega_weighted_endpoint_correction_over_unit_derivative`,
      source: "exact circular endpoint-provider correction and action-boundary derivative",
      formula:
        "omega_* max endpoint correction norm / abs(unit action derivative)",
      candidateActionScale: omegaWeightedScaleByUnitDerivative(
        row.maxEndpointCorrectionNorm
      ),
      evidence: {
        ...row,
        omegaStar,
        unitActionWakeEnergyMagnitude,
      },
    });
  }

  const finiteEndpointCorrections = endpointRows
    .flatMap((row) => [
      row.incomingEndpointCorrectionNorm,
      row.outgoingEndpointCorrectionNorm,
    ])
    .filter(Number.isFinite);
  const maxEndpointCorrection =
    finiteEndpointCorrections.length > 0
      ? maxFinite(finiteEndpointCorrections)
      : null;
  const minEndpointCorrection =
    finiteEndpointCorrections.length > 0
      ? minFinite(finiteEndpointCorrections)
      : null;
  const endpointCorrectionRange =
    Number.isFinite(maxEndpointCorrection) && Number.isFinite(minEndpointCorrection)
      ? maxEndpointCorrection - minEndpointCorrection
      : null;
  addCandidate({
    id: "all_routes_max_exact_endpoint_correction_norm",
    source: "exact circular endpoint-provider corrections",
    formula: "max(all exact circular endpoint correction norms)",
    candidateActionScale: maxEndpointCorrection,
    evidence: {
      endpointRowCount: endpointRows.length,
      maxEndpointCorrection,
    },
  });
  addCandidate({
    id: "all_routes_endpoint_correction_range",
    source: "exact circular endpoint-provider corrections",
    formula: "max(endpoint correction norm) - min(endpoint correction norm)",
    candidateActionScale: endpointCorrectionRange,
    evidence: {
      endpointRowCount: endpointRows.length,
      maxEndpointCorrection,
      minEndpointCorrection,
    },
  });

  const finiteRows = candidateRows.filter((row) =>
    Number.isFinite(row.candidateActionScale)
  );
  const exactDiagnosticRows = finiteRows.filter(
    (row) => row.exactEndpointProviderActionScaleCandidatePass
  );
  const rejectedRows = finiteRows.filter(
    (row) => row.exactEndpointProviderActionScaleCandidatePass !== true
  );
  const bestRejectedCandidate =
    rejectedRows.length > 0
      ? rejectedRows.reduce((best, row) =>
          row.residualAbs < best.residualAbs ? row : best
        )
      : null;

  return {
    schema:
      "aaa-tri-binary-exact-endpoint-provider-action-scale-diagnostic.v1",
    status:
      endpointRows.length === 0
        ? "exact_endpoint_provider_action_scale_diagnostic_route_rows_missing"
        : finiteRows.length === 0
          ? "exact_endpoint_provider_action_scale_diagnostic_no_finite_candidates"
          : exactDiagnosticRows.length > 0
            ? "exact_endpoint_provider_action_scale_candidates_formal_match"
            : "exact_endpoint_provider_action_scale_candidates_rejected",
    claimLevel:
      "fail-closed diagnostic comparing exact circular endpoint-provider corrections against the sigma*hbar action-scale gap; not an accepted action-scale law",
    requiredPositiveActionScale,
    omegaStar,
    omegaStarWeightedBoundaryCharge,
    targetChargeNorm,
    unitActionWakeEnergyMagnitude,
    actionKernelMarginRatio,
    providerEligibleRouteRowCount: providerEligibleRouteRows.length,
    endpointRowCount: endpointRows.length,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    exactDiagnosticCount: exactDiagnosticRows.length,
    bestRejectedCandidate,
    exactDiagnosticRows,
    endpointRows,
    rows: candidateRows,
    retainedLimitation:
      "This diagnostic tests whether exact circular endpoint-provider corrections can explain the remaining action-scale gap. The rows are formal comparisons only because the provider remains route-authorized point-event evidence rather than an accepted retained sigma*hbar action-scale law.",
  };
}

function createExactEndpointProviderActionScaleEndpointRow({ row, layerByName }) {
  const layer = layerByName?.get?.(row.continuityLayer) ?? null;
  const incomingEndpointGeometry = row.incomingPairEndpointGeometry ?? null;
  const outgoingEndpointGeometry = row.outgoingPairEndpointGeometry ?? null;
  const incomingEndpointPoint = selectContinuityEndpointPoint({
    endpointGeometry: incomingEndpointGeometry,
    continuityRole: row.continuityRole,
  });
  const outgoingEndpointPoint = selectContinuityEndpointPoint({
    endpointGeometry: outgoingEndpointGeometry,
    continuityRole: row.continuityRole,
  });
  const incomingExactPoint =
    layer && Number.isFinite(incomingEndpointGeometry?.emissionTime)
      ? computeCircularLayerPoint(layer, incomingEndpointGeometry.emissionTime)
      : null;
  const outgoingExactPoint =
    layer && Number.isFinite(outgoingEndpointGeometry?.emissionTime)
      ? computeCircularLayerPoint(layer, outgoingEndpointGeometry.emissionTime)
      : null;
  const incomingEndpointCorrectionVector =
    isFiniteVector(incomingEndpointPoint) && isFiniteVector(incomingExactPoint)
      ? subtractVectors(incomingExactPoint, incomingEndpointPoint)
      : null;
  const outgoingEndpointCorrectionVector =
    isFiniteVector(outgoingEndpointPoint) && isFiniteVector(outgoingExactPoint)
      ? subtractVectors(outgoingExactPoint, outgoingEndpointPoint)
      : null;
  const incomingEndpointCorrectionNorm = incomingEndpointCorrectionVector
    ? vectorNorm(incomingEndpointCorrectionVector)
    : null;
  const outgoingEndpointCorrectionNorm = outgoingEndpointCorrectionVector
    ? vectorNorm(outgoingEndpointCorrectionVector)
    : null;
  const maxEndpointCorrectionNorm = maxFinite([
    incomingEndpointCorrectionNorm,
    outgoingEndpointCorrectionNorm,
  ]);
  const endpointCorrectionNormSum =
    Number.isFinite(incomingEndpointCorrectionNorm) &&
    Number.isFinite(outgoingEndpointCorrectionNorm)
      ? incomingEndpointCorrectionNorm + outgoingEndpointCorrectionNorm
      : null;
  const endpointCorrectionDifferenceAbs =
    Number.isFinite(incomingEndpointCorrectionNorm) &&
    Number.isFinite(outgoingEndpointCorrectionNorm)
      ? Math.abs(outgoingEndpointCorrectionNorm - incomingEndpointCorrectionNorm)
      : null;
  const clockTimeJump =
    Number.isFinite(incomingEndpointGeometry?.emissionTime) &&
    Number.isFinite(outgoingEndpointGeometry?.emissionTime)
      ? incomingEndpointGeometry.emissionTime - outgoingEndpointGeometry.emissionTime
      : null;
  const phaseJump =
    layer && Number.isFinite(clockTimeJump)
      ? layer.angularVelocity * clockTimeJump
      : null;
  const predictedOutgoingExactPoint =
    isFiniteVector(incomingExactPoint) && Number.isFinite(phaseJump)
      ? rotateVectorZ(incomingExactPoint, -phaseJump)
      : null;
  const replacementAdvectionResidualVector =
    isFiniteVector(predictedOutgoingExactPoint) && isFiniteVector(outgoingExactPoint)
      ? subtractVectors(predictedOutgoingExactPoint, outgoingExactPoint)
      : null;
  const replacementAdvectionResidualNorm = replacementAdvectionResidualVector
    ? vectorNorm(replacementAdvectionResidualVector)
    : null;
  const exactEndpointProviderGeometryPass =
    Number.isFinite(replacementAdvectionResidualNorm) &&
    replacementAdvectionResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    incomingPairKey: row.incomingPairKey ?? null,
    outgoingPairKey: row.outgoingPairKey ?? null,
    continuityRole: row.continuityRole ?? null,
    continuityLayer: row.continuityLayer ?? null,
    status: !layer
      ? "exact_endpoint_provider_action_scale_row_layer_missing"
      : exactEndpointProviderGeometryPass
        ? "exact_endpoint_provider_action_scale_row_geometry_populated"
        : "exact_endpoint_provider_action_scale_row_geometry_residual_blocked",
    routeRootKey: row.routeRootKey ?? null,
    compensationRequired: row.compensationRequired === true,
    incomingEmissionTime: finiteOrNull(incomingEndpointGeometry?.emissionTime),
    outgoingEmissionTime: finiteOrNull(outgoingEndpointGeometry?.emissionTime),
    clockTimeJump,
    phaseJump,
    incomingEndpointCorrectionNorm,
    outgoingEndpointCorrectionNorm,
    maxEndpointCorrectionNorm,
    endpointCorrectionNormSum,
    endpointCorrectionDifferenceAbs,
    replacementAdvectionResidualNorm,
    exactEndpointProviderGeometryPass,
  };
}

function selectContinuityEndpointPoint({ endpointGeometry, continuityRole }) {
  if (continuityRole === "same_source") {
    return endpointGeometry?.sourcePoint ?? null;
  }
  if (continuityRole === "same_receiver") {
    return endpointGeometry?.receiverPoint ?? null;
  }
  return endpointGeometry?.sourcePoint ?? endpointGeometry?.receiverPoint ?? null;
}

function createActionBoundaryChargeIncrementCandidateRows({
  boundaryChargeGapDiagnostic,
  actionBoundaryDerivativeTarget,
  actionKernelMarginRatio,
  quadratureShiftFromCurrent,
  endpointCorrectionRows,
  bestResidualAbs,
}) {
  const targetBoundaryChargeIncrement =
    boundaryChargeGapDiagnostic?.targetChargeGap ?? null;
  const activeBasisNormalZZ =
    boundaryChargeGapDiagnostic?.activeBasisNormalZZ ?? null;
  const inferredColumnZ = boundaryChargeGapDiagnostic?.inferredColumnZ ?? null;
  const boundaryChargePerActionScale =
    Number.isFinite(actionKernelMarginRatio) &&
    Number.isFinite(activeBasisNormalZZ) &&
    Number.isFinite(inferredColumnZ) &&
    Math.abs(inferredColumnZ) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (actionKernelMarginRatio * activeBasisNormalZZ) /
        Math.abs(inferredColumnZ)
      : null;
  const rows = [];
  const seenIds = new Set();
  const mapActionScaleCorrectionToBoundaryCharge = (value) =>
    Number.isFinite(value) && Number.isFinite(boundaryChargePerActionScale)
      ? Math.abs(value) * boundaryChargePerActionScale
      : null;
  const addCandidate = ({
    id,
    source,
    formula,
    candidateBoundaryChargeIncrement,
    acceptanceEligible = true,
    acceptanceBlockers = [],
    rejectionReason = null,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateBoundaryChargeIncrement = finiteOrNull(
      candidateBoundaryChargeIncrement
    );
    const residual =
      finiteCandidateBoundaryChargeIncrement != null &&
      Number.isFinite(targetBoundaryChargeIncrement)
        ? finiteCandidateBoundaryChargeIncrement - targetBoundaryChargeIncrement
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    rows.push({
      id,
      status:
        finiteCandidateBoundaryChargeIncrement != null
          ? acceptanceEligible
            ? "boundary_charge_increment_candidate_evaluated"
            : "boundary_charge_increment_candidate_evaluated_not_acceptance_source"
          : "boundary_charge_increment_candidate_not_finite",
      source,
      formula,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      evidence,
      targetBoundaryChargeIncrement,
      candidateBoundaryChargeIncrement:
        finiteCandidateBoundaryChargeIncrement,
      residual,
      residualAbs,
      boundaryChargeIncrementCandidatePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    });
  };

  addCandidate({
    id: "best_action_scale_residual_mapped_to_boundary_charge_gap",
    source: "current best action-scale miss",
    formula:
      "abs(best action-scale residual) * (min(h_+ route width) / eta) * N_zz / abs(column_z)",
    candidateBoundaryChargeIncrement:
      mapActionScaleCorrectionToBoundaryCharge(bestResidualAbs),
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_from_best_action_scale_miss"],
    rejectionReason:
      "This row restates the measured action-scale miss in boundary-charge units and cannot supply an independent charge increment.",
    evidence: {
      bestResidualAbs,
      actionKernelMarginRatio,
      activeBasisNormalZZ,
      inferredColumnZ,
      boundaryChargePerActionScale,
    },
  });
  addCandidate({
    id: "quadrature_shift_mapped_to_boundary_charge",
    source: "higher-resolution normalized-history quadrature",
    formula:
      "abs(8192-step required-scale shift) * (min(h_+ route width) / eta) * N_zz / abs(column_z)",
    candidateBoundaryChargeIncrement:
      mapActionScaleCorrectionToBoundaryCharge(quadratureShiftFromCurrent),
    evidence: {
      quadratureShiftFromCurrent,
      actionKernelMarginRatio,
      activeBasisNormalZZ,
      inferredColumnZ,
      boundaryChargePerActionScale,
    },
  });

  for (const row of endpointCorrectionRows) {
    addCandidate({
      id: `endpoint_${row.id}_mapped_to_boundary_charge`,
      source: "finite endpoint-leakage correction scale",
      formula: `${row.formula} mapped through N_zz / abs(column_z)`,
      candidateBoundaryChargeIncrement:
        mapActionScaleCorrectionToBoundaryCharge(row.candidateCorrectionAbs),
      evidence: {
        endpointCorrectionRowId: row.id,
        candidateCorrectionAbs: row.candidateCorrectionAbs,
        actionKernelMarginRatio,
        activeBasisNormalZZ,
        inferredColumnZ,
        boundaryChargePerActionScale,
      },
    });
  }

  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  const compensationSplit = createActionBoundaryEndpointLeakageSplit(
    derivativeRows
  );
  const addEndpointLeakageCandidate = ({ id, formula, value }) => {
    addCandidate({
      id,
      source: "finite endpoint-leakage rows",
      formula,
      candidateBoundaryChargeIncrement: value,
      evidence: {
        routeRowCount: derivativeRows.length,
        minHPlusRouteWidth: compensationSplit.minHPlusRouteWidth,
      },
    });
  };
  addEndpointLeakageCandidate({
    id: "max_route_width_endpoint_leakage_as_charge_increment",
    formula: "max(abs(route-width endpoint leakage))",
    value: maxFinite(compensationSplit.allEndpointLeakages),
  });
  addEndpointLeakageCandidate({
    id: "max_compensated_endpoint_leakage_as_charge_increment",
    formula: "max(abs(compensated-row endpoint leakage))",
    value: maxFinite(compensationSplit.compensatedEndpointLeakages),
  });
  addEndpointLeakageCandidate({
    id: "max_zero_slack_endpoint_leakage_as_charge_increment",
    formula: "max(abs(zero-slack endpoint leakage))",
    value: maxFinite(compensationSplit.zeroSlackEndpointLeakages),
  });
  addEndpointLeakageCandidate({
    id: "sum_zero_slack_endpoint_leakage_as_charge_increment",
    formula: "sum(abs(zero-slack endpoint leakage))",
    value:
      compensationSplit.zeroSlackEndpointLeakages.length > 0
        ? compensationSplit.zeroSlackEndpointLeakages.reduce(
            (sum, value) => sum + value,
            0
          )
        : null,
  });

  return rows;
}

function createActionBoundaryScaleBoundaryChargeGapDiagnostic({
  requiredPositiveActionScale,
  actionKernelMarginRatio,
  minAbsCoefficient,
  leastNormBoundaryChargeAmplitudeLaw,
}) {
  const leastNormRows = leastNormBoundaryChargeAmplitudeLaw?.rows ?? [];
  const targetChargeZ = leastNormBoundaryChargeAmplitudeLaw?.targetCharge?.z ?? null;
  const activeBasisNormalZZ =
    leastNormBoundaryChargeAmplitudeLaw?.normalMatrix?.[2]?.[2] ?? null;
  const minCoefficientRow = leastNormRows
    .filter((row) =>
      Number.isFinite(row.leastNormBoundaryChargeCoefficient)
    )
    .reduce(
      (best, row) =>
        best == null ||
        Math.abs(row.leastNormBoundaryChargeCoefficient) <
          Math.abs(best.leastNormBoundaryChargeCoefficient)
          ? row
          : best,
      null
    );
  const inferredColumnZ =
    Number.isFinite(minCoefficientRow?.leastNormBoundaryChargeCoefficient) &&
    Number.isFinite(activeBasisNormalZZ) &&
    Number.isFinite(targetChargeZ) &&
    Math.abs(targetChargeZ) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (minCoefficientRow.leastNormBoundaryChargeCoefficient *
          activeBasisNormalZZ) /
        targetChargeZ
      : null;
  const requiredCoefficientMagnitude =
    Number.isFinite(requiredPositiveActionScale) &&
    Number.isFinite(actionKernelMarginRatio)
      ? requiredPositiveActionScale * actionKernelMarginRatio
      : null;
  const requiredTargetChargeNormForBestRow =
    Number.isFinite(requiredCoefficientMagnitude) &&
    Number.isFinite(activeBasisNormalZZ) &&
    Number.isFinite(inferredColumnZ) &&
    Math.abs(inferredColumnZ) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (requiredCoefficientMagnitude * activeBasisNormalZZ) /
        Math.abs(inferredColumnZ)
      : null;
  const targetChargeGap =
    Number.isFinite(requiredTargetChargeNormForBestRow) &&
    Number.isFinite(targetChargeZ)
      ? requiredTargetChargeNormForBestRow - Math.abs(targetChargeZ)
      : null;

  return {
    schema:
      "aaa-tri-binary-action-scale-boundary-charge-gap-diagnostic.v1",
    status:
      Number.isFinite(targetChargeGap)
        ? "action_scale_residual_maps_to_boundary_charge_gap"
        : "action_scale_boundary_charge_gap_diagnostic_inputs_missing",
    claimLevel:
      "diagnostic map from the best action-scale miss into the least-norm boundary-charge target; not an accepted charge correction",
    targetChargeZ,
    targetChargeNorm: Number.isFinite(targetChargeZ)
      ? Math.abs(targetChargeZ)
      : null,
    activeBasisNormalZZ,
    minCoefficientRow:
      minCoefficientRow == null
        ? null
        : {
            rowId: minCoefficientRow.rowId,
            pairKey: minCoefficientRow.pairKey,
            side: minCoefficientRow.side,
            leastNormBoundaryChargeCoefficient:
              minCoefficientRow.leastNormBoundaryChargeCoefficient,
            pairDistance: minCoefficientRow.pairDistance,
            predictedSignedDeltaEtaCandidate:
              minCoefficientRow.predictedSignedDeltaEtaCandidate,
            requiredCouplingCoefficient:
              minCoefficientRow.predictedRequiredCouplingCoefficient,
            requiredRowAmplitude: minCoefficientRow.requiredRowAmplitude,
          },
    inferredColumnZ,
    minAbsCoefficient,
    requiredCoefficientMagnitude,
    coefficientGap:
      Number.isFinite(requiredCoefficientMagnitude) &&
      Number.isFinite(minAbsCoefficient)
        ? requiredCoefficientMagnitude - minAbsCoefficient
        : null,
    requiredTargetChargeNormForBestRow,
    targetChargeGap,
    targetChargeRelativeGap:
      Number.isFinite(targetChargeGap) &&
      Number.isFinite(targetChargeZ) &&
      Math.abs(targetChargeZ) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? targetChargeGap / Math.abs(targetChargeZ)
        : null,
    retainedLimitation:
      "This diagnostic states the boundary-charge increment that would make the current best coefficient/margin law exact. It does not authorize changing the accepted wake charge without an independent retained-work, near-field, or normalization derivation.",
  };
}

function createActionBoundaryCoefficientProvenanceDiagnostic({
  boundaryChargeGapDiagnostic,
  leastNormBoundaryChargeAmplitudeLaw,
  routeLocalCoefficientAcceptanceTarget,
  eta,
}) {
  const minCoefficientRow =
    boundaryChargeGapDiagnostic?.minCoefficientRow ?? null;
  const leastNormRows = leastNormBoundaryChargeAmplitudeLaw?.rows ?? [];
  const routeLocalRows = routeLocalCoefficientAcceptanceTarget?.rows ?? [];
  const matchingLeastNormRow =
    leastNormRows.find((row) => row.rowId === minCoefficientRow?.rowId) ??
    leastNormRows.find(
      (row) =>
        row.pairKey === minCoefficientRow?.pairKey &&
        row.side === minCoefficientRow?.side
    ) ??
    null;
  const matchingRouteLocalRow =
    routeLocalRows.find((row) => row.rowId === minCoefficientRow?.rowId) ??
    routeLocalRows.find(
      (row) =>
        row.pairKey === minCoefficientRow?.pairKey &&
        row.side === minCoefficientRow?.side
    ) ??
    null;
  const currentCoefficientAbs = Math.abs(
    boundaryChargeGapDiagnostic?.minAbsCoefficient ?? NaN
  );
  const requiredCoefficientMagnitude =
    boundaryChargeGapDiagnostic?.requiredCoefficientMagnitude ?? null;
  const targetCoefficientGap =
    boundaryChargeGapDiagnostic?.coefficientGap ?? null;
  const targetCoefficientGapAbs = Number.isFinite(targetCoefficientGap)
    ? Math.abs(targetCoefficientGap)
    : null;
  const pairDistance =
    matchingLeastNormRow?.pairDistance ?? minCoefficientRow?.pairDistance ?? null;
  const pairDistanceSquared = Number.isFinite(pairDistance)
    ? pairDistance * pairDistance
    : null;
  const deltaEtaGaussianAtGap =
    matchingLeastNormRow?.deltaEtaGaussianAtGap ??
    matchingRouteLocalRow?.deltaEtaGaussianAtGap ??
    null;
  const causalGap = matchingRouteLocalRow?.causalGap ?? null;
  const commonCouplingCoefficient =
    matchingLeastNormRow?.commonCouplingCoefficient ??
    matchingRouteLocalRow?.commonCouplingCoefficient ??
    null;
  const requiredSigmaSign =
    matchingLeastNormRow?.requiredSigmaSign ??
    matchingRouteLocalRow?.requiredSigmaSign ??
    null;
  const requiredRowAmplitude =
    matchingLeastNormRow?.requiredRowAmplitude ??
    matchingRouteLocalRow?.requiredRowAmplitude ??
    null;
  const requiredSignedDeltaEtaGap =
    Number.isFinite(targetCoefficientGapAbs) &&
    Number.isFinite(pairDistanceSquared)
      ? targetCoefficientGapAbs * pairDistanceSquared
      : null;
  const requiredRowAmplitudeShiftAbs =
    Number.isFinite(requiredSignedDeltaEtaGap) &&
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(deltaEtaGaussianAtGap) &&
    Math.abs(commonCouplingCoefficient * deltaEtaGaussianAtGap) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? requiredSignedDeltaEtaGap /
        Math.abs(commonCouplingCoefficient * deltaEtaGaussianAtGap)
      : null;
  const requiredCommonCouplingShiftAbs =
    Number.isFinite(requiredSignedDeltaEtaGap) &&
    Number.isFinite(requiredRowAmplitude) &&
    Number.isFinite(deltaEtaGaussianAtGap) &&
    Math.abs(requiredRowAmplitude * deltaEtaGaussianAtGap) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? requiredSignedDeltaEtaGap /
        Math.abs(requiredRowAmplitude * deltaEtaGaussianAtGap)
      : null;
  const targetChargeNorm = boundaryChargeGapDiagnostic?.targetChargeNorm ?? null;
  const activeBasisNormalZZ =
    boundaryChargeGapDiagnostic?.activeBasisNormalZZ ?? null;
  const inferredColumnZAbs = Math.abs(
    boundaryChargeGapDiagnostic?.inferredColumnZ ?? NaN
  );
  const requiredInferredColumnZAbs =
    Number.isFinite(requiredCoefficientMagnitude) &&
    Number.isFinite(activeBasisNormalZZ) &&
    Number.isFinite(targetChargeNorm) &&
    Math.abs(targetChargeNorm) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (requiredCoefficientMagnitude * activeBasisNormalZZ) / targetChargeNorm
      : null;
  const inferredColumnZShiftAbs =
    Number.isFinite(requiredInferredColumnZAbs) &&
    Number.isFinite(inferredColumnZAbs)
      ? Math.abs(requiredInferredColumnZAbs - inferredColumnZAbs)
      : null;
  const requiredNormalMatrixZZ =
    Number.isFinite(targetChargeNorm) &&
    Number.isFinite(inferredColumnZAbs) &&
    Number.isFinite(requiredCoefficientMagnitude) &&
    Math.abs(requiredCoefficientMagnitude) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (targetChargeNorm * inferredColumnZAbs) / requiredCoefficientMagnitude
      : null;
  const normalMatrixZZShiftAbs =
    Number.isFinite(requiredNormalMatrixZZ) &&
    Number.isFinite(activeBasisNormalZZ)
      ? Math.abs(requiredNormalMatrixZZ - activeBasisNormalZZ)
      : null;
  const targetChargeGapAbs = Math.abs(
    boundaryChargeGapDiagnostic?.targetChargeGap ?? NaN
  );
  const mapRowAmplitudeResidualToCoefficient = (row) => {
    if (
      !Number.isFinite(row?.rowAmplitudeResidual) ||
      !Number.isFinite(row?.commonCouplingCoefficient) ||
      !Number.isFinite(row?.deltaEtaGaussianAtGap) ||
      !Number.isFinite(row?.pairDistance) ||
      Math.abs(row.pairDistance) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
    ) {
      return null;
    }
    return Math.abs(
      (row.rowAmplitudeResidual *
        row.commonCouplingCoefficient *
        row.deltaEtaGaussianAtGap) /
        (row.pairDistance * row.pairDistance)
    );
  };
  const mapDeltaEtaShiftToCoefficient = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(pairDistanceSquared) &&
    Math.abs(pairDistanceSquared) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? Math.abs(value) / pairDistanceSquared
      : null;
  const deltaEtaAtZero =
    Number.isFinite(deltaEtaGaussianAtGap) && Number.isFinite(eta)
      ? evaluateGaussianDeltaEta({ gap: 0, eta })
    : null;
  const finiteCausalGapDeltaEtaShift =
    Number.isFinite(deltaEtaGaussianAtGap) && Number.isFinite(deltaEtaAtZero)
      ? Math.abs(deltaEtaGaussianAtGap - deltaEtaAtZero)
      : null;
  const rows = [];
  const seenIds = new Set();
  const addRow = ({
    id,
    source,
    shiftKind,
    formula,
    candidateShiftAbs,
    targetShiftAbs,
    acceptanceEligible = true,
    acceptanceBlockers = [],
    rejectionReason = null,
    evidence = null,
  }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateShiftAbs = finiteOrNull(candidateShiftAbs);
    const residual =
      finiteCandidateShiftAbs != null && Number.isFinite(targetShiftAbs)
        ? finiteCandidateShiftAbs - targetShiftAbs
        : null;
    const residualAbs = Number.isFinite(residual) ? Math.abs(residual) : null;
    rows.push({
      id,
      status:
        finiteCandidateShiftAbs != null
          ? acceptanceEligible
            ? "coefficient_provenance_candidate_evaluated"
            : "coefficient_provenance_candidate_evaluated_not_acceptance_source"
          : "coefficient_provenance_candidate_not_finite",
      source,
      shiftKind,
      formula,
      acceptanceEligible,
      acceptanceBlockers,
      rejectionReason,
      evidence,
      targetShiftAbs,
      candidateShiftAbs: finiteCandidateShiftAbs,
      residual,
      residualAbs,
      coefficientProvenanceCandidatePass:
        Number.isFinite(residualAbs) &&
        residualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    });
  };

  addRow({
    id: "required_coefficient_gap",
    source: "best coefficient/margin action-scale miss",
    shiftKind: "least_norm_boundary_charge_coefficient",
    formula: "required coefficient magnitude - current min(abs(coefficient))",
    candidateShiftAbs: targetCoefficientGapAbs,
    targetShiftAbs: targetCoefficientGapAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_coefficient_gap"],
    rejectionReason:
      "This row states the coefficient gap required by the measured action-scale miss and cannot supply independent provenance.",
    evidence: {
      currentCoefficientAbs,
      requiredCoefficientMagnitude,
      targetCoefficientGap,
    },
  });
  addRow({
    id: "required_signed_delta_eta_shift",
    source: "best coefficient/margin action-scale miss",
    shiftKind: "signed_delta_eta",
    formula: "abs(required coefficient gap) * pair distance^2",
    candidateShiftAbs: requiredSignedDeltaEtaGap,
    targetShiftAbs: requiredSignedDeltaEtaGap,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_delta_eta_shift"],
    rejectionReason:
      "This row maps the target-derived coefficient gap into signed-delta-eta units for the same least-norm row.",
    evidence: {
      pairDistance,
      pairDistanceSquared,
      targetCoefficientGapAbs,
    },
  });
  addRow({
    id: "required_row_amplitude_shift",
    source: "best coefficient/margin action-scale miss",
    shiftKind: "row_amplitude",
    formula:
      "abs(required signed-delta-eta shift) / abs(common coupling * delta_eta(g))",
    candidateShiftAbs: requiredRowAmplitudeShiftAbs,
    targetShiftAbs: requiredRowAmplitudeShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_row_amplitude_shift"],
    rejectionReason:
      "This row maps the target-derived coefficient gap into row-amplitude units for comparison with accepted residuals.",
    evidence: {
      commonCouplingCoefficient,
      requiredSigmaSign,
      deltaEtaGaussianAtGap,
      requiredSignedDeltaEtaGap,
    },
  });
  addRow({
    id: "required_common_coupling_shift",
    source: "best coefficient/margin action-scale miss",
    shiftKind: "common_coupling_coefficient",
    formula:
      "abs(required signed-delta-eta shift) / abs(required row amplitude * delta_eta(g))",
    candidateShiftAbs: requiredCommonCouplingShiftAbs,
    targetShiftAbs: requiredCommonCouplingShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_common_coupling_shift"],
    rejectionReason:
      "This row maps the target-derived coefficient gap into common-coupling units for comparison with accepted residuals.",
    evidence: {
      requiredRowAmplitude,
      deltaEtaGaussianAtGap,
      requiredSignedDeltaEtaGap,
    },
  });
  addRow({
    id: "required_target_charge_shift",
    source: "least-norm coefficient relation",
    shiftKind: "target_charge_norm",
    formula:
      "required target charge norm for the best row - current target charge norm",
    candidateShiftAbs: targetChargeGapAbs,
    targetShiftAbs: targetChargeGapAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_target_charge_shift"],
    rejectionReason:
      "This row restates the boundary-charge gap already implied by the action-scale miss.",
    evidence: boundaryChargeGapDiagnostic,
  });
  addRow({
    id: "required_inferred_column_shift",
    source: "least-norm coefficient relation",
    shiftKind: "inferred_column_z",
    formula:
      "abs(required coefficient * N_zz / target charge norm - inferred column_z)",
    candidateShiftAbs: inferredColumnZShiftAbs,
    targetShiftAbs: inferredColumnZShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_column_shift"],
    rejectionReason:
      "This row states the inferred-column shift that would make the current target charge exact.",
    evidence: {
      activeBasisNormalZZ,
      targetChargeNorm,
      inferredColumnZAbs,
      requiredInferredColumnZAbs,
    },
  });
  addRow({
    id: "required_normal_matrix_zz_shift",
    source: "least-norm coefficient relation",
    shiftKind: "normal_matrix_zz",
    formula:
      "abs(target charge norm * inferred column_z / required coefficient - N_zz)",
    candidateShiftAbs: normalMatrixZZShiftAbs,
    targetShiftAbs: normalMatrixZZShiftAbs,
    acceptanceEligible: false,
    acceptanceBlockers: ["target_derived_required_normal_matrix_shift"],
    rejectionReason:
      "This row states the normal-matrix shift that would make the current target charge exact.",
    evidence: {
      activeBasisNormalZZ,
      targetChargeNorm,
      inferredColumnZAbs,
      requiredNormalMatrixZZ,
    },
  });

  addRow({
    id: "least_norm_target_residual_mapped_to_coefficient",
    source: "accepted least-norm boundary-charge solve",
    shiftKind: "least_norm_boundary_charge_coefficient",
    formula:
      "target residual norm * abs(inferred column_z) / N_zz",
    candidateShiftAbs:
      Number.isFinite(leastNormBoundaryChargeAmplitudeLaw?.targetResidualNorm) &&
      Number.isFinite(inferredColumnZAbs) &&
      Number.isFinite(activeBasisNormalZZ) &&
      Math.abs(activeBasisNormalZZ) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? (leastNormBoundaryChargeAmplitudeLaw.targetResidualNorm *
            inferredColumnZAbs) /
          activeBasisNormalZZ
        : null,
    targetShiftAbs: targetCoefficientGapAbs,
    evidence: {
      targetResidualNorm:
        leastNormBoundaryChargeAmplitudeLaw?.targetResidualNorm ?? null,
      inferredColumnZAbs,
      activeBasisNormalZZ,
    },
  });
  addRow({
    id: "min_row_amplitude_residual_mapped_to_coefficient",
    source: "accepted row-amplitude law residual for the best least-norm row",
    shiftKind: "least_norm_boundary_charge_coefficient",
    formula:
      "abs(row amplitude residual * common coupling * delta_eta(g) / pair distance^2)",
    candidateShiftAbs: mapRowAmplitudeResidualToCoefficient(
      matchingRouteLocalRow ?? matchingLeastNormRow
    ),
    targetShiftAbs: targetCoefficientGapAbs,
    evidence: {
      rowAmplitudeResidual:
        matchingRouteLocalRow?.rowAmplitudeResidual ??
        matchingLeastNormRow?.residual ??
        null,
      commonCouplingCoefficient,
      deltaEtaGaussianAtGap,
      pairDistance,
    },
  });
  const rowAmplitudeCoefficientResiduals = routeLocalRows
    .map(mapRowAmplitudeResidualToCoefficient)
    .filter(Number.isFinite);
  addRow({
    id: "max_row_amplitude_residual_mapped_to_coefficient",
    source: "accepted row-amplitude law residuals",
    shiftKind: "least_norm_boundary_charge_coefficient",
    formula:
      "max(abs(row amplitude residual * common coupling * delta_eta(g) / pair distance^2))",
    candidateShiftAbs:
      rowAmplitudeCoefficientResiduals.length > 0
        ? maxFinite(rowAmplitudeCoefficientResiduals)
        : null,
    targetShiftAbs: targetCoefficientGapAbs,
    evidence: {
      rowAmplitudeResidualCount: rowAmplitudeCoefficientResiduals.length,
      maxRowAmplitudeResidualMappedToCoefficient:
        rowAmplitudeCoefficientResiduals.length > 0
          ? maxFinite(rowAmplitudeCoefficientResiduals)
          : null,
    },
  });
  addRow({
    id: "finite_causal_gap_delta_eta_shift_mapped_to_coefficient",
    source: "finite causal-gap Gaussian evaluation",
    shiftKind: "least_norm_boundary_charge_coefficient",
    formula:
      "abs(delta_eta(g)-delta_eta(0)) * abs(required row amplitude * common coupling) / pair distance^2",
    candidateShiftAbs:
      Number.isFinite(finiteCausalGapDeltaEtaShift) &&
      Number.isFinite(requiredRowAmplitude) &&
      Number.isFinite(commonCouplingCoefficient)
        ? mapDeltaEtaShiftToCoefficient(
            finiteCausalGapDeltaEtaShift *
              Math.abs(requiredRowAmplitude * commonCouplingCoefficient)
          )
        : null,
    targetShiftAbs: targetCoefficientGapAbs,
    evidence: {
      causalGap,
      deltaEtaGaussianAtGap,
      deltaEtaAtZero,
      finiteCausalGapDeltaEtaShift,
      requiredRowAmplitude,
      commonCouplingCoefficient,
      pairDistance,
    },
  });

  const acceptedRows = rows.filter(
    (row) =>
      row.acceptanceEligible === true &&
      row.coefficientProvenanceCandidatePass === true
  );
  const exactDiagnosticRows = rows.filter(
    (row) =>
      row.acceptanceEligible !== true &&
      row.coefficientProvenanceCandidatePass === true
  );
  const independentRows = rows.filter((row) => row.acceptanceEligible === true);
  const bestIndependentCandidate =
    independentRows.length > 0
      ? independentRows.reduce((best, row) =>
          (row.residualAbs ?? Infinity) < (best.residualAbs ?? Infinity)
            ? row
            : best
        )
      : null;

  return {
    schema:
      "aaa-tri-binary-action-scale-coefficient-provenance-diagnostic.v1",
    status:
      !Number.isFinite(targetCoefficientGapAbs)
        ? "coefficient_provenance_diagnostic_inputs_missing"
        : acceptedRows.length > 0
          ? "coefficient_provenance_candidate_matches_gap"
          : exactDiagnosticRows.length > 0
            ? "coefficient_provenance_candidates_rejected_target_derived_comparison_only"
            : "coefficient_provenance_candidates_rejected",
    claimLevel:
      "fail-closed provenance diagnostic for the least-norm coefficient gap behind the best action-scale miss; not an accepted coefficient correction",
    minCoefficientRow,
    currentCoefficientAbs,
    requiredCoefficientMagnitude,
    targetCoefficientGap,
    targetCoefficientGapAbs,
    requiredSignedDeltaEtaGap,
    requiredRowAmplitudeShiftAbs,
    requiredCommonCouplingShiftAbs,
    targetChargeGapAbs,
    inferredColumnZAbs,
    requiredInferredColumnZAbs,
    inferredColumnZShiftAbs,
    activeBasisNormalZZ,
    requiredNormalMatrixZZ,
    normalMatrixZZShiftAbs,
    candidateCount: rows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactDiagnosticCount: exactDiagnosticRows.length,
    bestIndependentCandidate,
    acceptedRows,
    exactDiagnosticRows,
    rows,
    retainedLimitation:
      "The diagnostic decomposes the coefficient/margin action-scale miss into equivalent shifts of the least-norm coefficient, signed delta_eta, row amplitude, common coupling, target charge, inferred column, and normal matrix. Exact required-shift rows are target-derived comparisons only; acceptance requires an independent row residual or finite-gap effect that supplies the same shift.",
  };
}

function createActionBoundaryQuadratureConvergenceRows({
  omegaStarWeightedBoundaryCharge,
  actionBoundaryDerivativeTarget,
  candidateActionScale,
}) {
  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  return [512, 2048, 8192].map((steps) => {
    const weightedTerms = derivativeRows
      .map((row) => {
        const historyIntegralM3 = evaluateGaussianHistoryIntegral({
          hPlus: row.normalizedEndpointHPlus,
          upper: row.causalGap,
          u: row.u,
          eta: row.eta,
          power: 3,
          steps,
        });
        const normalizedPartialT1KernelTerm =
          Number.isFinite(row.localBoundaryDerivativeTerm) &&
          Number.isFinite(historyIntegralM3)
            ? row.localBoundaryDerivativeTerm - 2 * historyIntegralM3
            : null;
        return Number.isFinite(normalizedPartialT1KernelTerm) &&
          Number.isFinite(row.requiredCouplingCoefficient)
          ? row.requiredCouplingCoefficient * normalizedPartialT1KernelTerm
          : null;
      })
      .filter(Number.isFinite);
    const weightedNormalizedPartialT1KernelTermSum =
      weightedTerms.length === derivativeRows.length && derivativeRows.length > 0
        ? weightedTerms.reduce((sum, value) => sum + value, 0)
        : null;
    const halfWeightedNormalizedPartialT1KernelTermSum = Number.isFinite(
      weightedNormalizedPartialT1KernelTermSum
    )
      ? 0.5 * weightedNormalizedPartialT1KernelTermSum
      : null;
    const requiredPositiveActionScale =
      Number.isFinite(omegaStarWeightedBoundaryCharge) &&
      Number.isFinite(halfWeightedNormalizedPartialT1KernelTermSum) &&
      Math.abs(halfWeightedNormalizedPartialT1KernelTermSum) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? Math.abs(omegaStarWeightedBoundaryCharge) /
          Math.abs(halfWeightedNormalizedPartialT1KernelTermSum)
        : null;
    const residual =
      Number.isFinite(requiredPositiveActionScale) &&
      Number.isFinite(candidateActionScale)
        ? requiredPositiveActionScale - candidateActionScale
        : null;

    return {
      steps,
      weightedNormalizedPartialT1KernelTermSum,
      halfWeightedNormalizedPartialT1KernelTermSum,
      requiredPositiveActionScale,
      residual,
      residualAbs: Number.isFinite(residual) ? Math.abs(residual) : null,
    };
  });
}

function createActionBoundaryEndpointCorrectionRows({
  actionBoundaryDerivativeTarget,
  targetCorrectionAbs,
  actionKernelMarginRatio,
}) {
  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  const {
    allEndpointLeakages,
    compensatedEndpointLeakages,
    zeroSlackEndpointLeakages,
  } = createActionBoundaryEndpointLeakageSplit(derivativeRows);
  const addRow = ({ id, formula, value }) => {
    const correctionResidual =
      Number.isFinite(value) && Number.isFinite(targetCorrectionAbs)
        ? Math.abs(value) - targetCorrectionAbs
        : null;
    return {
      id,
      formula,
      candidateCorrectionAbs: finiteOrNull(value),
      targetCorrectionAbs,
      correctionResidual,
      correctionResidualAbs: Number.isFinite(correctionResidual)
        ? Math.abs(correctionResidual)
        : null,
      correctionCandidatePass:
        Number.isFinite(correctionResidual) &&
        Math.abs(correctionResidual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  };
  const scaleByMargin = (value) =>
    Number.isFinite(value) &&
    Number.isFinite(actionKernelMarginRatio) &&
    Math.abs(actionKernelMarginRatio) >
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? value / actionKernelMarginRatio
      : null;

  return [
    addRow({
      id: "max_route_width_endpoint_leakage_over_margin",
      formula:
        "max(abs(route-width endpoint leakage)) / (min(h_+ route width) / eta)",
      value: scaleByMargin(maxFinite(allEndpointLeakages)),
    }),
    addRow({
      id: "max_compensated_endpoint_leakage_over_margin",
      formula:
        "max(abs(compensated-row endpoint leakage)) / (min(h_+ route width) / eta)",
      value: scaleByMargin(maxFinite(compensatedEndpointLeakages)),
    }),
    addRow({
      id: "max_zero_slack_endpoint_leakage_over_margin",
      formula:
        "max(abs(zero-slack endpoint leakage)) / (min(h_+ route width) / eta)",
      value: scaleByMargin(maxFinite(zeroSlackEndpointLeakages)),
    }),
    addRow({
      id: "sum_zero_slack_endpoint_leakage_over_margin",
      formula:
        "sum(abs(zero-slack endpoint leakage)) / (min(h_+ route width) / eta)",
      value: scaleByMargin(
        zeroSlackEndpointLeakages.length > 0
          ? zeroSlackEndpointLeakages.reduce((sum, value) => sum + value, 0)
          : null
      ),
    }),
  ];
}

function createActionBoundaryEndpointLeakageSplit(derivativeRows) {
  const hPlusRouteWidthValues = derivativeRows
    .map((row) => row.hPlusRouteWidth)
    .filter(Number.isFinite);
  const minHPlusRouteWidth =
    hPlusRouteWidthValues.length > 0 ? minFinite(hPlusRouteWidthValues) : null;
  const compensationRows = derivativeRows.filter(
    (row) =>
      Number.isFinite(row.hPlusRouteWidth) &&
      Number.isFinite(minHPlusRouteWidth) &&
      Math.abs(row.hPlusRouteWidth - minHPlusRouteWidth) <=
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  );
  const zeroSlackRows = derivativeRows.filter(
    (row) =>
      Number.isFinite(row.hPlusRouteWidth) &&
      Number.isFinite(minHPlusRouteWidth) &&
      Math.abs(row.hPlusRouteWidth - minHPlusRouteWidth) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  );
  return {
    minHPlusRouteWidth,
    compensationRows,
    zeroSlackRows,
    allEndpointLeakages: derivativeRows
      .map((row) => row.endpointLeakageAbsAtRouteWidth)
      .filter(Number.isFinite),
    compensatedEndpointLeakages: compensationRows
      .map((row) => row.endpointLeakageAbsAtRouteWidth)
      .filter(Number.isFinite),
    zeroSlackEndpointLeakages: zeroSlackRows
      .map((row) => row.endpointLeakageAbsAtRouteWidth)
      .filter(Number.isFinite),
  };
}

function createActionBoundaryActionScaleLawCandidateRows({
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  omegaStar,
  targetChargeNorm,
}) {
  const rows = [];
  const seenIds = new Set();
  const addCandidate = ({ id, source, formula, candidateActionScale }) => {
    if (seenIds.has(id)) {
      return;
    }
    seenIds.add(id);
    const finiteCandidateActionScale = finiteOrNull(candidateActionScale);
    rows.push({
      id,
      status:
        finiteCandidateActionScale != null
          ? "action_scale_law_candidate_evaluated"
          : "action_scale_law_candidate_not_finite",
      source,
      formula,
      candidateActionScale: finiteCandidateActionScale,
    });
  };
  const addAggregateCandidates = ({ idPrefix, source, values }) => {
    const finiteValues = values.filter((value) => Number.isFinite(value));
    if (finiteValues.length === 0) {
      addCandidate({
        id: `${idPrefix}_missing`,
        source,
        formula: `${idPrefix} finite scalar missing`,
        candidateActionScale: null,
      });
      return;
    }
    const mean =
      finiteValues.reduce((sum, value) => sum + value, 0) / finiteValues.length;
    addCandidate({
      id: `${idPrefix}_min`,
      source,
      formula: `min(${idPrefix})`,
      candidateActionScale: minFinite(finiteValues),
    });
    addCandidate({
      id: `${idPrefix}_mean`,
      source,
      formula: `mean(${idPrefix})`,
      candidateActionScale: mean,
    });
    addCandidate({
      id: `${idPrefix}_max`,
      source,
      formula: `max(${idPrefix})`,
      candidateActionScale: maxFinite(finiteValues),
    });
  };

  const eta = actionBoundaryDerivativeTarget?.eta ?? null;
  addCandidate({
    id: "target_charge_norm",
    source: "normalized action-kernel wake charge",
    formula: "|Delta J_wake|",
    candidateActionScale: targetChargeNorm,
  });
  addCandidate({
    id: "eta",
    source: "action-kernel normalization convention",
    formula: "eta",
    candidateActionScale: eta,
  });
  addCandidate({
    id: "two_eta",
    source: "action-kernel normalization convention",
    formula: "2 eta",
    candidateActionScale: Number.isFinite(eta) ? 2 * eta : null,
  });
  addCandidate({
    id: "four_eta",
    source: "action-kernel normalization convention",
    formula: "4 eta",
    candidateActionScale: Number.isFinite(eta) ? 4 * eta : null,
  });
  addCandidate({
    id: "eta_omega_star",
    source: "clean energy-frequency target",
    formula: "eta omega_*",
    candidateActionScale:
      Number.isFinite(eta) && Number.isFinite(omegaStar) ? eta * omegaStar : null,
  });
  addCandidate({
    id: "target_charge_norm_over_omega_star",
    source: "wake charge and clean energy-frequency target",
    formula: "|Delta J_wake| / omega_*",
    candidateActionScale:
      Number.isFinite(targetChargeNorm) &&
      Number.isFinite(omegaStar) &&
      Math.abs(omegaStar) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? targetChargeNorm / omegaStar
        : null,
  });
  addCandidate({
    id: "inverse_omega_star",
    source: "clean energy-frequency target",
    formula: "1 / omega_*",
    candidateActionScale:
      Number.isFinite(omegaStar) &&
      Math.abs(omegaStar) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? 1 / omegaStar
        : null,
  });

  const derivativeRows = actionBoundaryDerivativeTarget?.rows ?? [];
  addAggregateCandidates({
    idPrefix: "normalized_endpoint_h_plus",
    source: "action-boundary derivative rows",
    values: derivativeRows.map((row) => row.normalizedEndpointHPlus),
  });
  addAggregateCandidates({
    idPrefix: "route_width_h_plus",
    source: "action-boundary derivative rows",
    values: derivativeRows.map((row) => row.hPlusRouteWidth),
  });
  addAggregateCandidates({
    idPrefix: "causal_gap_abs",
    source: "action-boundary derivative rows",
    values: derivativeRows.map((row) =>
      Number.isFinite(row.causalGap) ? Math.abs(row.causalGap) : null
    ),
  });
  addAggregateCandidates({
    idPrefix: "endpoint_leakage_abs_at_route_width",
    source: "finite-Gaussian endpoint-clearance rows",
    values: derivativeRows.map((row) => row.endpointLeakageAbsAtRouteWidth),
  });

  const payloadRows = compensatedRoutePayloadCertificate?.rows ?? [];
  addAggregateCandidates({
    idPrefix: "transport_angular_momentum_norm",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) =>
        row.transportAngularMomentumIncrement
          ?.unitEndpointPairAngularMomentumNorm
    ),
  });
  addAggregateCandidates({
    idPrefix: "transport_angular_momentum_upper_bound",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) =>
        row.transportAngularMomentumIncrement
          ?.unitAngularMomentumNormUpperBound
    ),
  });
  addAggregateCandidates({
    idPrefix: "root_energy_increment",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) => row.rootEnergyIncrement?.unitActionRootEnergyIncrement
    ),
  });
  addAggregateCandidates({
    idPrefix: "recoil_angular_momentum_norm",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) => row.recoilChannelData?.unitRecoilAngularMomentumNorm
    ),
  });
  addAggregateCandidates({
    idPrefix: "bounded_geometric_slack",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) => row.boundedUndeclaredRouteSlack?.geometricUpperBound
    ),
  });
  addAggregateCandidates({
    idPrefix: "bounded_phase_slack",
    source: "compensated route-payload certificate",
    values: payloadRows.map(
      (row) => row.boundedUndeclaredRouteSlack?.phaseUpperBound
    ),
  });

  return rows;
}

function createActionBoundaryWakeEnergyDerivativeTarget({
  targetPopulated,
  normalizedActionKernelWakeCharge,
  retainedActionKernelPullbackDomain,
  actionKernelNormalizationConventionCandidate,
  masterEquationCharacteristicTailPullbackCandidate,
  layerByName,
}) {
  const eta =
    actionKernelNormalizationConventionCandidate?.etaCandidate?.value ?? null;
  const radialRows =
    masterEquationCharacteristicTailPullbackCandidate?.radialConstrainedSolve
      ?.rows ?? [];
  const coefficientRows =
    masterEquationCharacteristicTailPullbackCandidate?.coefficientQuadratureTarget
      ?.rows ?? [];
  const rows = radialRows.map((row, index) =>
    createActionBoundaryWakeEnergyDerivativeRow({
      row,
      coefficientRow: coefficientRows[index] ?? null,
      eta,
      layerByName,
    })
  );
  const derivativeRows = rows.filter((row) => row.derivativeInputPass);
  const endpointClearanceRows = rows.filter(
    (row) => row.endpointClearanceRepairPass
  );
  const historyIntegralRows = rows.filter(
    (row) => row.normalizedHistoryIntegralPass
  );
  const endpointLeakageValues = rows
    .map((row) => row.endpointLeakageAbsAtInterval)
    .filter(Number.isFinite);
  const routeEndpointLeakageValues = rows
    .map((row) => row.endpointLeakageAbsAtRouteWidth)
    .filter(Number.isFinite);
  const endpointClearanceResidualValues = rows
    .map((row) => row.endpointClearanceResidualAbs)
    .filter(Number.isFinite);
  const weightedLocalBoundaryDerivativeTerms = rows
    .map((row) => row.weightedLocalBoundaryDerivativeTerm)
    .filter(Number.isFinite);
  const weightedNormalizedPartialT1KernelTerms = rows
    .map((row) => row.weightedNormalizedPartialT1KernelTerm)
    .filter(Number.isFinite);
  const maxEndpointLeakageAbsAtInterval = maxFinite(endpointLeakageValues);
  const maxEndpointLeakageAbsAtRouteWidth = maxFinite(routeEndpointLeakageValues);
  const maxEndpointClearanceResidualAbs = maxFinite(
    endpointClearanceResidualValues
  );
  const weightedLocalBoundaryDerivativeTermSum =
    weightedLocalBoundaryDerivativeTerms.length === rows.length && rows.length > 0
      ? weightedLocalBoundaryDerivativeTerms.reduce((sum, value) => sum + value, 0)
      : null;
  const halfWeightedLocalBoundaryDerivativeTermSum =
    Number.isFinite(weightedLocalBoundaryDerivativeTermSum)
      ? 0.5 * weightedLocalBoundaryDerivativeTermSum
      : null;
  const weightedNormalizedPartialT1KernelTermSum =
    weightedNormalizedPartialT1KernelTerms.length === rows.length &&
    rows.length > 0
      ? weightedNormalizedPartialT1KernelTerms.reduce(
          (sum, value) => sum + value,
          0
        )
      : null;
  const halfWeightedNormalizedPartialT1KernelTermSum = Number.isFinite(
    weightedNormalizedPartialT1KernelTermSum
  )
    ? 0.5 * weightedNormalizedPartialT1KernelTermSum
    : null;
  const endpointLeakageBlocks =
    Number.isFinite(maxEndpointLeakageAbsAtInterval) &&
    maxEndpointLeakageAbsAtInterval > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const routeWidthEndpointLeakageBlocks =
    Number.isFinite(maxEndpointLeakageAbsAtRouteWidth) &&
    maxEndpointLeakageAbsAtRouteWidth > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const derivativeInputsPass =
    targetPopulated === true &&
    rows.length > 0 &&
    derivativeRows.length === rows.length;
  const endpointClearanceRepairPass =
    derivativeInputsPass &&
    endpointClearanceRows.length === rows.length &&
    Number.isFinite(maxEndpointClearanceResidualAbs) &&
    maxEndpointClearanceResidualAbs <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const normalizedHistoryIntegralPass =
    endpointClearanceRepairPass &&
    historyIntegralRows.length === rows.length &&
    Number.isFinite(halfWeightedNormalizedPartialT1KernelTermSum);

  return {
    schema: "aaa-tri-binary-action-boundary-wake-energy-derivative-target.v1",
    status:
      targetPopulated !== true
        ? "action_boundary_derivative_kernel_blocked_until_boundary_charge_pullback"
        : rows.length === 0
        ? "action_boundary_derivative_kernel_rows_missing"
        : !derivativeInputsPass
        ? "action_boundary_derivative_kernel_inputs_missing"
        : !endpointClearanceRepairPass
        ? "action_boundary_derivative_kernel_blocked_endpoint_clearance_repair_missing"
        : !normalizedHistoryIntegralPass
        ? "action_boundary_derivative_kernel_blocked_history_integral_missing"
        : "action_boundary_derivative_kernel_history_integral_evaluated_action_scale_missing",
    claimLevel:
      "partial_t1 normalized action-kernel derivative target for the accepted route rows; not accepted wake energy",
    targetPopulated: targetPopulated === true,
    derivativeInputsPass,
    endpointClearanceRepairPass,
    normalizedHistoryIntegralPass,
    acceptedWakeEnergyIncrementPass: false,
    normalizedBoundaryChargeStatus:
      normalizedActionKernelWakeCharge?.status ?? null,
    retainedCrossingDomainPullbackStatus:
      retainedActionKernelPullbackDomain?.status ?? null,
    eta,
    rowCount: rows.length,
    derivativeRowCount: derivativeRows.length,
    formula:
      "partial_t1 K_eff,h+(r,g) = delta_eta(g)/(c_f (u-g)^2) partial_t1 g - (2/c_f) integral_{-h+}^{g} delta_eta(s)/(u-s)^3 ds, with u=t1-t0",
    weightedLocalBoundaryDerivativeTermSum,
    halfWeightedLocalBoundaryDerivativeTermSum,
    weightedNormalizedPartialT1KernelTermSum,
    halfWeightedNormalizedPartialT1KernelTermSum,
    maxEndpointLeakageAbsAtInterval,
    maxEndpointLeakageAbsAtRouteWidth,
    maxEndpointClearanceResidualAbs,
    endpointLeakageBlocks,
    routeWidthEndpointLeakageBlocks,
    missingAcceptedFields: [
      endpointClearanceRepairPass ? null : "endpoint_clearance_residual_zero",
      normalizedHistoryIntegralPass
        ? null
        : "normalized_K_eff_history_integral_m3",
      "sigma_hbar_action_scale",
      "accepted_wake_energy_increment_law",
    ].filter(Boolean),
    rows,
    retainedLimitation:
      "The endpoint-clear gauge repair and normalized K_eff history integral are route-local action-kernel derivative rows only. A declared sigma*hbar action scale and accepted wake-energy law are still required before this can assign retained wake energy.",
  };
}

function createActionBoundaryWakeEnergyDerivativeRow({
  row,
  coefficientRow,
  eta,
  layerByName,
}) {
  const pairKey = row.pairKey ?? coefficientRow?.pairKey ?? null;
  const [, receiverLayerName] =
    typeof pairKey === "string" ? pairKey.split("->") : [null, null];
  const receiverLayer = layerByName?.get?.(receiverLayerName) ?? null;
  const hitTime = coefficientRow?.hitTime ?? row.pairEndpointGeometry?.hitTime ?? null;
  const emissionTime =
    coefficientRow?.emissionTime ?? row.pairEndpointGeometry?.emissionTime ?? null;
  const pairDistance =
    coefficientRow?.pairDistance ?? row.pairEndpointGeometry?.pairDistance ?? null;
  const causalGap = coefficientRow?.causalGap ?? null;
  const u =
    Number.isFinite(hitTime) && Number.isFinite(emissionTime)
      ? hitTime - emissionTime
      : null;
  const receiverVelocity =
    receiverLayer && Number.isFinite(hitTime)
      ? computeCircularLayerVelocity(receiverLayer, hitTime)
      : null;
  const receiverRadialUnit = row.pairEndpointGeometry?.receiverRadialUnit ?? null;
  const receiverRadialVelocity =
    isFiniteVector(receiverVelocity) && isFiniteVector(receiverRadialUnit)
      ? dotVectors(receiverVelocity, receiverRadialUnit)
      : null;
  const partialT1G =
    Number.isFinite(receiverRadialVelocity) && FIELD_SPEED > 0
      ? 1 - receiverRadialVelocity / FIELD_SPEED
      : null;
  const deltaEtaAtGap = coefficientRow?.deltaEtaGaussianAtGap ?? null;
  const localBoundaryDenominator =
    Number.isFinite(u) && Number.isFinite(causalGap)
      ? FIELD_SPEED * (u - causalGap) * (u - causalGap)
      : null;
  const localBoundaryDerivativeTerm =
    Number.isFinite(deltaEtaAtGap) &&
    Number.isFinite(partialT1G) &&
    Number.isFinite(localBoundaryDenominator) &&
    Math.abs(localBoundaryDenominator) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? (deltaEtaAtGap / localBoundaryDenominator) * partialT1G
      : null;
  const weightedLocalBoundaryDerivativeTerm =
    Number.isFinite(localBoundaryDerivativeTerm) &&
    Number.isFinite(coefficientRow?.requiredCouplingCoefficient)
      ? coefficientRow.requiredCouplingCoefficient * localBoundaryDerivativeTerm
      : null;
  const hPlusInterval = row.intervalWidth ?? null;
  const hPlusRouteWidth = row.minOneSidedRouteWidth ?? null;
  const normalizedEndpointHPlus = Number.isFinite(hPlusRouteWidth)
    ? hPlusRouteWidth
    : hPlusInterval;
  const endpointLeakageAtInterval = evaluateEndpointLeakage({
    hPlus: hPlusInterval,
    u,
    eta,
  });
  const endpointLeakageAtRouteWidth = evaluateEndpointLeakage({
    hPlus: hPlusRouteWidth,
    u,
    eta,
  });
  const endpointClearanceGaugeRepair =
    createFiniteGaussianEndpointClearanceGaugeRepair({
      endpointLeakage: endpointLeakageAtRouteWidth,
      hPlus: hPlusRouteWidth,
      u,
      eta,
    });
  const historyIntegralM2 = evaluateGaussianHistoryIntegral({
    hPlus: normalizedEndpointHPlus,
    upper: causalGap,
    u,
    eta,
    power: 2,
  });
  const historyIntegralM3 = evaluateGaussianHistoryIntegral({
    hPlus: normalizedEndpointHPlus,
    upper: causalGap,
    u,
    eta,
    power: 3,
  });
  const normalizedPartialT1KernelTerm =
    Number.isFinite(localBoundaryDerivativeTerm) &&
    Number.isFinite(historyIntegralM3)
      ? localBoundaryDerivativeTerm - 2 * historyIntegralM3
      : null;
  const weightedNormalizedPartialT1KernelTerm =
    Number.isFinite(normalizedPartialT1KernelTerm) &&
    Number.isFinite(coefficientRow?.requiredCouplingCoefficient)
      ? coefficientRow.requiredCouplingCoefficient *
        normalizedPartialT1KernelTerm
      : null;
  const derivativeInputPass =
    Number.isFinite(localBoundaryDerivativeTerm) &&
    Number.isFinite(weightedLocalBoundaryDerivativeTerm) &&
    Number.isFinite(endpointLeakageAtRouteWidth);
  const endpointClearanceRepairPass =
    endpointClearanceGaugeRepair?.endpointClearanceRepairPass === true;
  const normalizedHistoryIntegralPass =
    Number.isFinite(historyIntegralM2) &&
    Number.isFinite(historyIntegralM3) &&
    Number.isFinite(normalizedPartialT1KernelTerm) &&
    Number.isFinite(weightedNormalizedPartialT1KernelTerm);

  return {
    rowId: coefficientRow?.rowId ?? row.rowId ?? null,
    status:
      derivativeInputPass &&
      endpointClearanceRepairPass &&
      normalizedHistoryIntegralPass
        ? "action_boundary_derivative_row_history_integral_evaluated_action_scale_missing"
        : derivativeInputPass && endpointClearanceRepairPass
        ? "action_boundary_derivative_row_endpoint_clearance_repaired_history_integral_missing"
        : derivativeInputPass
        ? "action_boundary_derivative_row_local_boundary_term_populated_endpoint_clearance_missing"
      : "action_boundary_derivative_row_inputs_missing",
    derivativeInputPass,
    endpointClearanceRepairPass,
    normalizedHistoryIntegralPass,
    pairKey,
    side: row.side ?? coefficientRow?.side ?? null,
    endpointOwnership: row.endpointOwnership ?? coefficientRow?.endpointOwnership ?? null,
    receiverLayer: receiverLayerName ?? null,
    hitTime,
    emissionTime,
    u,
    pairDistance,
    causalGap,
    eta,
    hPlusInterval,
    hPlusRouteWidth,
    normalizedEndpointHPlus,
    receiverVelocity,
    receiverRadialUnit,
    receiverRadialVelocity,
    partialT1G,
    deltaEtaAtGap,
    localBoundaryDerivativeTerm,
    requiredCouplingCoefficient: coefficientRow?.requiredCouplingCoefficient ?? null,
    weightedLocalBoundaryDerivativeTerm,
    endpointLeakageAtInterval,
    endpointLeakageAbsAtInterval: Number.isFinite(endpointLeakageAtInterval)
      ? Math.abs(endpointLeakageAtInterval)
      : null,
    endpointLeakageAtRouteWidth,
    endpointLeakageAbsAtRouteWidth: Number.isFinite(endpointLeakageAtRouteWidth)
      ? Math.abs(endpointLeakageAtRouteWidth)
      : null,
    endpointClearanceGaugeRepair,
    endpointClearanceResidual:
      endpointClearanceGaugeRepair?.endpointClearanceResidual ?? null,
    endpointClearanceResidualAbs: Number.isFinite(
      endpointClearanceGaugeRepair?.endpointClearanceResidual
    )
      ? Math.abs(endpointClearanceGaugeRepair.endpointClearanceResidual)
      : null,
    historyIntegralM2,
    historyIntegralM3,
    normalizedPartialT1KernelTerm,
    weightedNormalizedPartialT1KernelTerm,
    retainedLimitation:
      "This row evaluates the route-width finite-Gaussian endpoint gauge repair and the normalized partial_t1 K_eff history integral. It still lacks a declared action scale and accepted wake-energy law.",
  };
}

function evaluateEndpointLeakage({ hPlus, u, eta }) {
  const deltaAtEndpoint = evaluateGaussianDeltaEta({ gap: -hPlus, eta });
  if (
    !Number.isFinite(deltaAtEndpoint) ||
    !Number.isFinite(u) ||
    !Number.isFinite(hPlus) ||
    FIELD_SPEED <= 0 ||
    Math.abs(u + hPlus) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  ) {
    return null;
  }
  return deltaAtEndpoint / (FIELD_SPEED * (u + hPlus));
}

function createFiniteGaussianEndpointClearanceGaugeRepair({
  endpointLeakage,
  hPlus,
  u,
  eta,
}) {
  const characteristicGaugeValue = Number.isFinite(endpointLeakage)
    ? -endpointLeakage
    : null;
  const endpointClearanceResidual =
    Number.isFinite(endpointLeakage) && Number.isFinite(characteristicGaugeValue)
      ? endpointLeakage + characteristicGaugeValue
      : null;
  const characteristicGaugeDerivative = evaluateEndpointGaugeDerivative({
    hPlus,
    u,
    eta,
  });
  const endpointClearanceRepairPass =
    Number.isFinite(endpointClearanceResidual) &&
    Math.abs(endpointClearanceResidual) <=
      POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    schema:
      "aaa-tri-binary-finite-gaussian-endpoint-clearance-gauge-repair.v1",
    status: endpointClearanceRepairPass
      ? "finite_gaussian_endpoint_clearance_gauge_repair_zero_residual"
      : "finite_gaussian_endpoint_clearance_gauge_repair_inputs_missing",
    endpointClearanceRepairPass,
    endpointLeakage,
    characteristicGaugeValue,
    endpointClearanceResidual,
    characteristicGaugeDerivative,
    hPlus,
    u,
    eta,
    convention:
      "For the finite-Gaussian characteristic-tail endpoint, set H_+^(eta)(u)=-B_+^(eta)(u,h_+) before treating K_eff as a normalized action object.",
  };
}

function evaluateEndpointGaugeDerivative({ hPlus, u, eta }) {
  const deltaAtEndpoint = evaluateGaussianDeltaEta({ gap: -hPlus, eta });
  if (
    !Number.isFinite(deltaAtEndpoint) ||
    !Number.isFinite(u) ||
    !Number.isFinite(hPlus) ||
    FIELD_SPEED <= 0 ||
    Math.abs(u + hPlus) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  ) {
    return null;
  }
  return deltaAtEndpoint / (FIELD_SPEED * (u + hPlus) * (u + hPlus));
}

function evaluateGaussianHistoryIntegral({
  hPlus,
  upper,
  u,
  eta,
  power,
  steps = 512,
}) {
  if (
    !Number.isFinite(hPlus) ||
    !Number.isFinite(upper) ||
    !Number.isFinite(u) ||
    !Number.isFinite(eta) ||
    !Number.isFinite(power) ||
    !Number.isFinite(steps) ||
    hPlus <= 0 ||
    eta <= 0 ||
    FIELD_SPEED <= 0
  ) {
    return null;
  }
  const lower = -hPlus;
  if (upper < lower) {
    return null;
  }
  return integrateSimpson({
    lower,
    upper,
    steps,
    integrand: (s) => {
      const denominator = FIELD_SPEED * Math.pow(u - s, power);
      if (
        !Number.isFinite(denominator) ||
        Math.abs(denominator) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ) {
        return null;
      }
      const delta = evaluateGaussianDeltaEta({ gap: s, eta });
      return Number.isFinite(delta) ? delta / denominator : null;
    },
  });
}

function integrateSimpson({ lower, upper, steps, integrand }) {
  if (
    !Number.isFinite(lower) ||
    !Number.isFinite(upper) ||
    !Number.isFinite(steps) ||
    steps <= 0
  ) {
    return null;
  }
  if (upper === lower) {
    const value = integrand(lower);
    return Number.isFinite(value) ? 0 : null;
  }
  const panelCount = Math.max(2, Math.ceil(steps / 2) * 2);
  const width = (upper - lower) / panelCount;
  let sum = 0;
  for (let index = 0; index <= panelCount; index += 1) {
    const s = lower + index * width;
    const value = integrand(s);
    if (!Number.isFinite(value)) {
      return null;
    }
    const weight = index === 0 || index === panelCount ? 1 : index % 2 === 0 ? 2 : 4;
    sum += weight * value;
  }
  return (width / 3) * sum;
}

function createRetainedActionKernelPullbackDomainTarget({
  compensatedRoutePayloadCertificate,
  timeWindowTorqueProbe,
}) {
  const routeRows = (compensatedRoutePayloadCertificate?.rows ?? []).filter(
    (row) => row.payloadPass === true
  );
  const routeRootKeys = [
    ...new Set(
      routeRows
        .map((row) => row.routeRootKey)
        .filter((rootKey) => rootKey != null)
    ),
  ].sort((left, right) => left - right);
  const sameRetainedActiveRowIds = timeWindowTorqueProbe?.rowIds ?? [];
  const targetPopulated =
    routeRows.length > 0 &&
    routeRootKeys.length > 0 &&
    sameRetainedActiveRowIds.length > 0 &&
    timeWindowTorqueProbe?.timeWindow != null;

  return {
    status: targetPopulated
      ? "route_authorized_pullback_domain_target_populated_not_kernel_evaluated"
      : "route_authorized_pullback_domain_target_missing",
    claimLevel:
      "route-authorized target domain for the wake action-kernel pullback; not retained pullback-domain certification",
    targetPopulated,
    retainedPullbackDomainPass: false,
    timeWindow: timeWindowTorqueProbe?.timeWindow ?? null,
    sameRetainedActiveRowIds,
    sameRowSetStatus: timeWindowTorqueProbe?.sameRowSetStatus ?? null,
    routePayloadStatus: compensatedRoutePayloadCertificate?.status ?? null,
    routeRowCount: routeRows.length,
    routeRootKeyCount: routeRootKeys.length,
    routeRootKeys,
    routeRows: routeRows.map((row) => ({
      incomingPairKey: row.incomingPairKey ?? null,
      outgoingPairKey: row.outgoingPairKey ?? null,
      continuityRole: row.continuityRole ?? null,
      continuityLayer: row.continuityLayer ?? null,
      continuityPointKind: row.continuityPointKind ?? null,
      hingeTime: row.hingeTime ?? null,
      routeRootKey: row.routeRootKey ?? null,
      zeroSlackRoutePass: row.zeroSlackRoutePass === true,
      compensationRequired: row.compensationRequired === true,
      minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
      endpointPairResidual: row.endpointPairResidual ?? null,
      endpointToChartResidual: row.endpointToChartResidual ?? null,
      requiredEndpointCompensationNorm:
        row.requiredEndpointCompensationNorm ?? null,
      requiredClockRetune: row.requiredClockRetune ?? null,
      requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
      incomingLeftCoverage: row.incomingLeftCoverage ?? null,
      outgoingRightCoverage: row.outgoingRightCoverage ?? null,
      incomingPairEndpointGeometry: row.incomingPairEndpointGeometry ?? null,
      outgoingPairEndpointGeometry: row.outgoingPairEndpointGeometry ?? null,
      leverArm: row.transportAngularMomentumIncrement?.leverArm ?? null,
      routeTransportAngularMomentum:
        row.transportAngularMomentumIncrement?.unitEndpointPairAngularMomentum ??
        null,
    })),
    missingAcceptedFields: [
      "chart_restricted_crossing_domain_rows",
      "kernel_gradient_integral",
      "action_kernel_boundary_integral",
    ],
    retainedLimitation:
      "The route rows and time window identify the smallest solver-owned target for the wake pullback. A retained domain still requires accepted chart-restricted crossing rows and a kernel-gradient integral, not just the route carrier and fixed-receiver quadrature window.",
  };
}

function createChartRestrictedCrossingDomainRows({
  retainedActionKernelPullbackDomainTarget,
  actionKernelNormalizationConventionCandidate,
}) {
  const routeRows = retainedActionKernelPullbackDomainTarget?.routeRows ?? [];
  const etaValue =
    actionKernelNormalizationConventionCandidate?.etaCandidate?.value ?? null;
  const epsilonCValue =
    actionKernelNormalizationConventionCandidate?.epsilonCCandidate?.value ??
    null;
  const endpointConvention =
    actionKernelNormalizationConventionCandidate?.endpointConvention ?? null;
  const rows = routeRows.map((row, index) =>
    createChartRestrictedCrossingDomainRow({
      row,
      index,
      etaValue,
      epsilonCValue,
      endpointConvention,
      sameRetainedActiveRowIds:
        retainedActionKernelPullbackDomainTarget?.sameRetainedActiveRowIds ??
        [],
    })
  );
  const acceptedRows = rows.filter((row) => row.acceptedCrossingDomainRow);
  const rejectedRows = rows.filter((row) => !row.acceptedCrossingDomainRow);
  const acceptedCrossingDomainPass =
    retainedActionKernelPullbackDomainTarget?.targetPopulated === true &&
    actionKernelNormalizationConventionCandidate?.candidatePopulated === true &&
    rows.length > 0 &&
    acceptedRows.length === rows.length;

  return {
    schema: "aaa-tri-binary-chart-restricted-crossing-domain-rows.v1",
    status: acceptedCrossingDomainPass
      ? "chart_restricted_crossing_domain_rows_accepted_kernel_pending"
      : rows.length > 0
      ? "chart_restricted_crossing_domain_rows_rejected"
      : "chart_restricted_crossing_domain_rows_missing",
    claimLevel:
      "route-local chart-restricted crossing-domain certificate; not evaluated action-kernel pullback",
    acceptedCrossingDomainPass,
    retainedPullbackDomainPass: false,
    routeRowCount: rows.length,
    acceptedRowCount: acceptedRows.length,
    rejectedRowCount: rejectedRows.length,
    eta: etaValue,
    epsilonC: epsilonCValue,
    endpointConventionId: endpointConvention?.id ?? null,
    minEtaRouteMargin: minFinite(
      rows.map((row) => row.minEtaRouteMargin).filter(Number.isFinite)
    ),
    minLeverArmRegularizationMargin: minFinite(
      rows
        .map((row) => row.leverArmRegularizationMargin)
        .filter(Number.isFinite)
    ),
    maxEndpointIntervalResidual: maxFinite(
      rows
        .map((row) => row.maxEndpointIntervalResidual)
        .filter(Number.isFinite)
    ),
    rows,
    retainedLimitation:
      "These rows accept only the finite route-local crossing domain needed before kernel evaluation. They do not evaluate delta_eta(g), the normalized action-kernel charge, retained pullback, wake energy, or retained branch closure.",
  };
}

function createChartRestrictedCrossingDomainRow({
  row,
  index,
  etaValue,
  epsilonCValue,
  endpointConvention,
  sameRetainedActiveRowIds,
}) {
  const incomingWidth = finiteOrNull(row.incomingLeftCoverage?.maxWidth);
  const outgoingWidth = finiteOrNull(row.outgoingRightCoverage?.maxWidth);
  const minOneSidedRouteWidth = finiteOrNull(row.minOneSidedRouteWidth);
  const routeWidth = minFinite(
    [incomingWidth, outgoingWidth, minOneSidedRouteWidth].filter(
      Number.isFinite
    )
  );
  const leverArmNorm = isFiniteVector(row.leverArm)
    ? vectorNorm(row.leverArm)
    : null;
  const incomingChartInterval = selectEndpointClearChartInterval({
    coverage: row.incomingLeftCoverage,
    hingeTime: row.hingeTime,
    side: "left",
    etaValue,
  });
  const outgoingChartInterval = selectEndpointClearChartInterval({
    coverage: row.outgoingRightCoverage,
    hingeTime: row.hingeTime,
    side: "right",
    etaValue,
  });
  const etaRouteMargin =
    Number.isFinite(routeWidth) && Number.isFinite(etaValue)
      ? routeWidth - etaValue
      : null;
  const leverArmRegularizationMargin =
    Number.isFinite(leverArmNorm) && Number.isFinite(epsilonCValue)
      ? leverArmNorm - epsilonCValue
      : null;
  const routeRootKeyPass = row.routeRootKey != null;
  const sameRowSetPass = sameRetainedActiveRowIds.length > 0;
  const etaClearancePass =
    Number.isFinite(etaValue) &&
    etaValue > 0 &&
    Number.isFinite(etaRouteMargin) &&
    etaRouteMargin > ROOT_TOLERANCE;
  const leverArmRegularizationPass =
    Number.isFinite(epsilonCValue) &&
    epsilonCValue > 0 &&
    Number.isFinite(leverArmRegularizationMargin) &&
    leverArmRegularizationMargin > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const endpointConventionPass =
    endpointConvention?.id ===
    "endpoint_clear_receiver_gradient_spatial_charge";
  const chartIntervalPass =
    incomingChartInterval?.intervalPass === true &&
    outgoingChartInterval?.intervalPass === true;
  const acceptedCrossingDomainRow =
    routeRootKeyPass &&
    sameRowSetPass &&
    etaClearancePass &&
    leverArmRegularizationPass &&
    endpointConventionPass &&
    chartIntervalPass;
  const maxEndpointIntervalResidual = maxFinite(
    [
      incomingChartInterval?.endpointResidual,
      outgoingChartInterval?.endpointResidual,
    ].filter(Number.isFinite)
  );

  return {
    rowId: `chart-restricted-crossing-domain:${index}`,
    status: acceptedCrossingDomainRow
      ? "chart_restricted_crossing_domain_row_accepted_kernel_pending"
      : "chart_restricted_crossing_domain_row_rejected",
    acceptedCrossingDomainRow,
    incomingPairKey: row.incomingPairKey ?? null,
    outgoingPairKey: row.outgoingPairKey ?? null,
    continuityRole: row.continuityRole ?? null,
    continuityLayer: row.continuityLayer ?? null,
    continuityPointKind: row.continuityPointKind ?? null,
    hingeTime: row.hingeTime ?? null,
    routeRootKey: row.routeRootKey ?? null,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    endpointPairResidual: row.endpointPairResidual ?? null,
    endpointToChartResidual: row.endpointToChartResidual ?? null,
    requiredEndpointCompensationNorm:
      row.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: row.requiredClockRetune ?? null,
    requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
    sameRetainedActiveRowIds,
    routeRootKeyPass,
    sameRowSetPass,
    etaClearancePass,
    leverArmRegularizationPass,
    endpointConventionPass,
    chartIntervalPass,
    minOneSidedRouteWidth,
    incomingOneSidedWidth: incomingWidth,
    outgoingOneSidedWidth: outgoingWidth,
    eta: etaValue,
    minEtaRouteMargin: etaRouteMargin,
    leverArm: row.leverArm ?? null,
    leverArmNorm,
    epsilonC: epsilonCValue,
    leverArmRegularizationMargin,
    incomingPairEndpointGeometry: row.incomingPairEndpointGeometry ?? null,
    outgoingPairEndpointGeometry: row.outgoingPairEndpointGeometry ?? null,
    endpointConventionId: endpointConvention?.id ?? null,
    incomingChartInterval,
    outgoingChartInterval,
    maxEndpointIntervalResidual,
    retainedLimitation:
      "This row certifies finite route-local chart support and regularization clearance only. It is not the normalized action-kernel integral or retained wake-energy row.",
  };
}

function selectEndpointClearChartInterval({
  coverage,
  hingeTime,
  side,
  etaValue,
}) {
  if (
    !coverage ||
    !Number.isFinite(hingeTime) ||
    !Number.isFinite(etaValue) ||
    etaValue <= 0
  ) {
    return {
      status: "endpoint_clear_chart_interval_missing_inputs",
      side,
      intervalPass: false,
    };
  }
  const candidateIntervals = coverage.intervals ?? [];
  const sourceInterval = candidateIntervals.find((interval) =>
    side === "left"
      ? interval.start <= hingeTime - etaValue + ROOT_TOLERANCE &&
        interval.end + ROOT_TOLERANCE >= hingeTime
      : interval.start - ROOT_TOLERANCE <= hingeTime &&
        interval.end >= hingeTime + etaValue - ROOT_TOLERANCE
  );
  if (!sourceInterval) {
    return {
      status: "endpoint_clear_chart_interval_not_covered",
      side,
      intervalPass: false,
      eta: etaValue,
      hingeTime,
      coverageStatus: coverage.status ?? null,
      maxWidth: coverage.maxWidth ?? null,
    };
  }
  const interval =
    side === "left"
      ? { start: hingeTime - etaValue, end: hingeTime }
      : { start: hingeTime, end: hingeTime + etaValue };
  const endpointResidual =
    side === "left"
      ? Math.abs(sourceInterval.end - hingeTime)
      : Math.abs(sourceInterval.start - hingeTime);
  return {
    status: "endpoint_clear_chart_interval_populated",
    side,
    intervalPass: endpointResidual <= ROOT_TOLERANCE,
    eta: etaValue,
    hingeTime,
    interval,
    intervalWidth: interval.end - interval.start,
    sourceInterval,
    endpointResidual,
    openAtHingeEndpoint: true,
    retainedLimitation:
      "The interval is the finite h_plus chart restriction adjacent to the hinge. The exact endpoint is handled by the declared normalization convention before kernel evaluation.",
  };
}

function createActionKernelNormalizationConventionCandidate({
  retainedActionKernelPullbackDomainTarget,
}) {
  const routeRows = retainedActionKernelPullbackDomainTarget?.routeRows ?? [];
  const finiteRouteWidths = routeRows
    .map((row) => row.minOneSidedRouteWidth)
    .filter((value) => Number.isFinite(value) && value > 0);
  const finiteLeverArmNorms = routeRows
    .map((row) => (isFiniteVector(row.leverArm) ? vectorNorm(row.leverArm) : null))
    .filter((value) => Number.isFinite(value) && value > 0);
  const minOneSidedRouteWidth = minFinite(finiteRouteWidths);
  const minRouteLeverArmNorm = minFinite(finiteLeverArmNorms);
  const etaValue =
    minOneSidedRouteWidth == null ? null : minOneSidedRouteWidth / 4;
  const epsilonCValue =
    minRouteLeverArmNorm == null ? null : minRouteLeverArmNorm / 4;
  const candidatePopulated =
    retainedActionKernelPullbackDomainTarget?.targetPopulated === true &&
    Number.isFinite(etaValue) &&
    etaValue > 0 &&
    Number.isFinite(epsilonCValue) &&
    epsilonCValue > 0;

  return {
    schema:
      "aaa-tri-binary-action-kernel-normalization-convention-candidate.v1",
    status: candidatePopulated
      ? "action_kernel_normalization_convention_candidate_populated_not_accepted"
      : "action_kernel_normalization_convention_candidate_missing_route_clearance",
    claimLevel:
      "finite-regularization and endpoint-convention target; not an evaluated action-kernel pullback",
    candidatePopulated,
    acceptedNormalizationConventionPass: false,
    etaCandidate: Number.isFinite(etaValue)
      ? {
          symbol: "eta",
          value: etaValue,
          selectionRule:
            "one quarter of the minimum positive one-sided route width",
          minOneSidedRouteWidth,
          marginRatioToRouteWidth: minOneSidedRouteWidth / etaValue,
        }
      : null,
    epsilonCCandidate: Number.isFinite(epsilonCValue)
      ? {
          symbol: "epsilonC",
          value: epsilonCValue,
          selectionRule:
            "one quarter of the minimum positive route lever-arm norm",
          minRouteLeverArmNorm,
          marginRatioToRouteLeverArmNorm:
            minRouteLeverArmNorm / epsilonCValue,
        }
      : null,
    endpointConvention: {
      id: "endpoint_clear_receiver_gradient_spatial_charge",
      endpointClearance:
        "Use endpoint-clear finite-h_plus normalization before assigning a Noether wake-history charge.",
      angularMomentumCharge:
        "J_wake = -1/2 sum integral x_i cross grad_x_i K_eff dt0 dt1 on chart-restricted crossing rows.",
      receiverGradientIdentity:
        "grad_x_i K_eff = -delta_eta(g) r_hat / r^2; source-end gradient has the opposite sign.",
      endpointOwnership:
        "The receiver endpoint owns the spatial charge row; source-end changes are accounted as the opposite endpoint gradient.",
    },
    routeRowCount: routeRows.length,
    finiteRouteWidthCount: finiteRouteWidths.length,
    finiteLeverArmNormCount: finiteLeverArmNorms.length,
    retainedLimitation:
      "This row chooses finite candidate scales and a sign convention for the next kernel evaluation. It does not certify chart-restricted crossing-domain rows, evaluate delta_eta(g), or accept the normalized action-kernel wake charge.",
  };
}

function createKernelGradientIntegralCandidate({
  normalizedActionKernelWakeChargeCandidate,
  retainedActionKernelPullbackDomainTarget,
}) {
  const targetCharge =
    normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null;
  const routeRows = (retainedActionKernelPullbackDomainTarget?.routeRows ?? [])
    .filter((row) => isFiniteVector(row.leverArm));
  if (!isFiniteVector(targetCharge)) {
    return {
      status: "kernel_gradient_integral_target_charge_missing",
      claimLevel:
        "least-norm route-gradient candidate for the wake boundary charge; not an evaluated action-kernel integral",
      candidatePopulated: false,
      acceptedKernelGradientIntegralPass: false,
    };
  }
  if (routeRows.length === 0) {
    return {
      status: "kernel_gradient_integral_route_lever_arms_missing",
      claimLevel:
        "least-norm route-gradient candidate for the wake boundary charge; not an evaluated action-kernel integral",
      candidatePopulated: false,
      acceptedKernelGradientIntegralPass: false,
      targetCharge,
    };
  }

  const normalMatrix = createAngularMomentNormalMatrix(routeRows);
  const inverseNormalMatrix = invert3x3(normalMatrix);
  if (!inverseNormalMatrix) {
    return {
      status: "kernel_gradient_integral_route_normal_matrix_rank_deficient",
      claimLevel:
        "least-norm route-gradient candidate for the wake boundary charge; not an evaluated action-kernel integral",
      candidatePopulated: false,
      acceptedKernelGradientIntegralPass: false,
      targetCharge,
      routeRowCount: routeRows.length,
      normalMatrix,
    };
  }

  const multiplier = multiplyMatrixVector(inverseNormalMatrix, targetCharge);
  const routeKernelGradientRows = routeRows.map((row) => {
    const unitKernelGradientIntegral = scaleVector(
      crossVectors(row.leverArm, multiplier),
      -1
    );
    const angularContribution = crossVectors(
      row.leverArm,
      unitKernelGradientIntegral
    );
    return {
      incomingPairKey: row.incomingPairKey ?? null,
      outgoingPairKey: row.outgoingPairKey ?? null,
      continuityRole: row.continuityRole ?? null,
      continuityLayer: row.continuityLayer ?? null,
      routeRootKey: row.routeRootKey ?? null,
      minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
      leverArm: row.leverArm,
      unitKernelGradientIntegral,
      unitKernelGradientIntegralNorm: vectorNorm(unitKernelGradientIntegral),
      angularContribution,
      angularContributionNorm: vectorNorm(angularContribution),
    };
  });
  const reconstructedCharge = routeKernelGradientRows.reduce(
    (total, row) => addVectors(total, row.angularContribution),
    zeroVector()
  );
  const targetResidualVector = subtractVectors(reconstructedCharge, targetCharge);
  const targetResidualNorm = vectorNorm(targetResidualVector);
  const candidatePopulated =
    Number.isFinite(targetResidualNorm) &&
    targetResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    status: candidatePopulated
      ? "unit_least_norm_kernel_gradient_integral_candidate_populated_not_kernel_evaluated"
      : "unit_least_norm_kernel_gradient_integral_candidate_residual_exceeds_tolerance",
    claimLevel:
      "least-norm route-gradient candidate for the wake boundary charge; not an evaluated action-kernel integral",
    candidatePopulated,
    acceptedKernelGradientIntegralPass: false,
    coefficientConvention:
      "The candidate solves the least-norm route-gradient inverse sum_a r_a x G_a = Delta J_wake,target using route lever arms only. It does not evaluate eta, epsilonC, endpoint convention, delta_eta(g), or the Master-Equation characteristic-tail kernel.",
    targetCharge,
    reconstructedCharge,
    targetResidualVector,
    targetResidualNorm,
    routeRowCount: routeRows.length,
    normalMatrix,
    inverseNormalMatrix,
    multiplier,
    routeKernelGradientRows,
    retainedLimitation:
      "This row supplies an executable inverse target for the kernel-gradient integral. It remains a candidate until the normalized delayed-interior characteristic-tail kernel is evaluated on chart-restricted crossing-domain rows with declared eta, epsilonC, and endpoint convention.",
  };
}

function createFiniteEndpointClearKernelGradientIntegralEvaluation({
  normalizedActionKernelWakeChargeCandidate,
  chartRestrictedCrossingDomainRows,
  kernelGradientIntegralCandidate,
}) {
  const targetCharge =
    normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null;
  const crossingRows = chartRestrictedCrossingDomainRows?.rows ?? [];
  const gradientRows = kernelGradientIntegralCandidate?.routeKernelGradientRows ?? [];
  const rows = crossingRows.map((crossingRow, index) =>
    createFiniteEndpointClearKernelGradientIntegralRow({
      crossingRow,
      gradientRow: gradientRows[index] ?? null,
      index,
    })
  );
  const evaluatedRows = rows.filter((row) => row.finiteEndpointClearRowPass);
  const reconstructedCharge = rows.reduce(
    (total, row) =>
      isFiniteVector(row.angularContribution)
        ? addVectors(total, row.angularContribution)
        : total,
    zeroVector()
  );
  const targetResidualVector = isFiniteVector(targetCharge)
    ? subtractVectors(reconstructedCharge, targetCharge)
    : null;
  const targetResidualNorm = isFiniteVector(targetResidualVector)
    ? vectorNorm(targetResidualVector)
    : null;
  const maxRowIntegralResidualNorm = maxFinite(
    rows.map((row) => row.integralResidualNorm).filter(Number.isFinite)
  );
  const candidateEvaluationPass =
    chartRestrictedCrossingDomainRows?.acceptedCrossingDomainPass === true &&
    kernelGradientIntegralCandidate?.candidatePopulated === true &&
    isFiniteVector(targetCharge) &&
    rows.length > 0 &&
    evaluatedRows.length === rows.length &&
    Number.isFinite(targetResidualNorm) &&
    targetResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(maxRowIntegralResidualNorm) &&
    maxRowIntegralResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    schema:
      "aaa-tri-binary-finite-endpoint-clear-kernel-gradient-integral-evaluation.v1",
    status: candidateEvaluationPass
      ? "finite_endpoint_clear_kernel_gradient_candidate_matches_target_master_law_pullback_missing"
      : rows.length > 0
      ? "finite_endpoint_clear_kernel_gradient_candidate_rejected"
      : "finite_endpoint_clear_kernel_gradient_candidate_missing_rows",
    claimLevel:
      "finite endpoint-clear constant-density route-gradient evaluation; not a pulled-back Master-Equation characteristic-tail action-kernel law",
    candidateEvaluationPass,
    acceptedKernelGradientIntegralPass: false,
    masterEquationLawStatus:
      "available_in_master_equation_not_pulled_back_to_these_route_rows",
    masterEquationLawReference: {
      path: "content/markdown/aaa/dynamics/master-equation.md",
      anchor: "exact-nonlocal-lagrangian",
      receiverGradientIdentity:
        "grad_x_i K_eff = -delta_eta(g_ij) r_hat_ij / r_ij^2",
      angularMomentumWakeIncrement:
        "J_wake = -1/2 sum integral x_i(t1) cross grad_x_i K_eff dt0 dt1 over X_ij^B(t*)",
    },
    requiredPullbackFields: [
      "pair_radial_unit_rows",
      "delta_eta_of_g_quadrature",
      "kappa_sigma_charge_coefficient",
      "source_receiver_endpoint_ownership",
      "wake_energy_increment",
    ],
    routeRowCount: rows.length,
    evaluatedRowCount: evaluatedRows.length,
    targetCharge,
    reconstructedCharge,
    targetResidualVector,
    targetResidualNorm,
    maxRowIntegralResidualNorm,
    rows,
    retainedLimitation:
      "This evaluates a finite endpoint-clear route-gradient candidate over accepted crossing-domain intervals. It does not pull back the Master-Equation characteristic-tail law to pair radial rows, accept the normalized action-kernel charge, assign retained wake energy, or close the retained branch.",
  };
}

function createFiniteEndpointClearKernelGradientIntegralRow({
  crossingRow,
  gradientRow,
  index,
}) {
  const intervalWidth =
    finiteOrNull(crossingRow.incomingChartInterval?.intervalWidth) ?? 0;
  const outgoingIntervalWidth =
    finiteOrNull(crossingRow.outgoingChartInterval?.intervalWidth) ?? 0;
  const crossingMeasure = intervalWidth + outgoingIntervalWidth;
  const targetKernelGradientIntegral =
    gradientRow?.unitKernelGradientIntegral ?? null;
  const gradientDensity =
    isFiniteVector(targetKernelGradientIntegral) &&
    Number.isFinite(crossingMeasure) &&
    crossingMeasure > ROOT_TOLERANCE
      ? scaleVector(targetKernelGradientIntegral, 1 / crossingMeasure)
      : null;
  const evaluatedKernelGradientIntegral =
    isFiniteVector(gradientDensity)
      ? scaleVector(gradientDensity, crossingMeasure)
      : null;
  const integralResidualVector =
    isFiniteVector(evaluatedKernelGradientIntegral) &&
    isFiniteVector(targetKernelGradientIntegral)
      ? subtractVectors(evaluatedKernelGradientIntegral, targetKernelGradientIntegral)
      : null;
  const integralResidualNorm = isFiniteVector(integralResidualVector)
    ? vectorNorm(integralResidualVector)
    : null;
  const angularContribution =
    isFiniteVector(crossingRow.leverArm) &&
    isFiniteVector(evaluatedKernelGradientIntegral)
      ? crossVectors(crossingRow.leverArm, evaluatedKernelGradientIntegral)
      : null;
  const finiteEndpointClearRowPass =
    crossingRow.acceptedCrossingDomainRow === true &&
    isFiniteVector(targetKernelGradientIntegral) &&
    isFiniteVector(evaluatedKernelGradientIntegral) &&
    Number.isFinite(integralResidualNorm) &&
    integralResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    isFiniteVector(angularContribution);

  return {
    rowId: `finite-endpoint-clear-kernel-gradient:${index}`,
    status: finiteEndpointClearRowPass
      ? "finite_endpoint_clear_kernel_gradient_row_matches_target_master_law_pullback_missing"
      : "finite_endpoint_clear_kernel_gradient_row_rejected",
    finiteEndpointClearRowPass,
    incomingPairKey: crossingRow.incomingPairKey ?? gradientRow?.incomingPairKey ?? null,
    outgoingPairKey: crossingRow.outgoingPairKey ?? gradientRow?.outgoingPairKey ?? null,
    continuityRole: crossingRow.continuityRole ?? gradientRow?.continuityRole ?? null,
    continuityLayer:
      crossingRow.continuityLayer ?? gradientRow?.continuityLayer ?? null,
    continuityPointKind: crossingRow.continuityPointKind ?? null,
    hingeTime: crossingRow.hingeTime ?? null,
    routeRootKey: crossingRow.routeRootKey ?? gradientRow?.routeRootKey ?? null,
    eta: crossingRow.eta ?? null,
    epsilonC: crossingRow.epsilonC ?? null,
    crossingMeasure,
    incomingIntervalWidth: intervalWidth,
    outgoingIntervalWidth,
    targetKernelGradientIntegral,
    gradientDensity,
    evaluatedKernelGradientIntegral,
    integralResidualVector,
    integralResidualNorm,
    leverArm: crossingRow.leverArm ?? gradientRow?.leverArm ?? null,
    incomingPairEndpointGeometry:
      crossingRow.incomingPairEndpointGeometry ?? null,
    outgoingPairEndpointGeometry:
      crossingRow.outgoingPairEndpointGeometry ?? null,
    angularContribution,
    angularContributionNorm: isFiniteVector(angularContribution)
      ? vectorNorm(angularContribution)
      : null,
    retainedLimitation:
      "This row evaluates only the finite constant-density route-gradient candidate on endpoint-clear chart intervals. The Master-Equation pair-radial characteristic-tail pullback remains missing.",
  };
}

function createMasterEquationCharacteristicTailPullbackCandidate({
  normalizedActionKernelWakeChargeCandidate,
  actionKernelNormalizationConventionCandidate,
  chartRestrictedCrossingDomainRows,
  finiteEndpointClearKernelGradientIntegralEvaluation,
}) {
  const crossingRows = chartRestrictedCrossingDomainRows?.rows ?? [];
  const finiteRows =
    finiteEndpointClearKernelGradientIntegralEvaluation?.rows ?? [];
  const endpointConvention =
    actionKernelNormalizationConventionCandidate?.endpointConvention ?? null;
  const rows = crossingRows.map((crossingRow, index) =>
    createMasterEquationCharacteristicTailPullbackRow({
      crossingRow,
      finiteRow: finiteRows[index] ?? null,
      endpointConvention,
      index,
    })
  );
  const finiteEvaluationPass =
    finiteEndpointClearKernelGradientIntegralEvaluation?.candidateEvaluationPass ===
    true;
  const targetRows = rows.filter((row) => row.targetPopulated);
  const alignedRows = rows.filter((row) => row.pairRadialAlignmentPass);
  const sideRadialRows = rows.flatMap((row) =>
    row.sideRows.filter((sideRow) => sideRow.targetPopulated)
  );
  const radialConstrainedSolve =
    createPairRadialCharacteristicTailConstrainedSolve({
      rows,
      targetCharge:
        normalizedActionKernelWakeChargeCandidate?.candidateCharge ?? null,
    });
  const coefficientQuadratureTarget =
    createCharacteristicTailCoefficientQuadratureTarget({
      radialConstrainedSolve,
      actionKernelNormalizationConventionCandidate,
    });
  const maxPairRadialResidualNorm = maxFinite(
    sideRadialRows
      .map((sideRow) => sideRow.pairRadialResidualNorm)
      .filter(Number.isFinite)
  );
  const maxSideIntegralResidualNorm = maxFinite(
    sideRadialRows
      .map((sideRow) => sideRow.sideIntegralResidualNorm)
      .filter(Number.isFinite)
  );
  const minSignedCharacteristicTailCoefficient = minFinite(
    sideRadialRows
      .map((sideRow) => sideRow.signedDeltaEtaOverR2Target)
      .filter(Number.isFinite)
  );
  const maxAbsDeltaEtaCandidate = maxFinite(
    sideRadialRows
      .map((sideRow) =>
        Number.isFinite(sideRow.signedDeltaEtaCandidate)
          ? Math.abs(sideRow.signedDeltaEtaCandidate)
          : null
      )
      .filter(Number.isFinite)
  );
  const targetPopulated =
    finiteEvaluationPass &&
    rows.length > 0 &&
    targetRows.length === rows.length;
  const pairRadialAlignmentPass =
    targetPopulated &&
    alignedRows.length === rows.length &&
    Number.isFinite(maxPairRadialResidualNorm) &&
    maxPairRadialResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(maxSideIntegralResidualNorm) &&
    maxSideIntegralResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const radialConstrainedSolvePass =
    radialConstrainedSolve?.candidatePass === true;
  const coefficientQuadraturePass =
    coefficientQuadratureTarget?.candidatePass === true;
  const singleCoefficientSignPatternPass =
    coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.candidatePass === true;
  const layerPolaritySignFeasibilityPass =
    coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.layerPolaritySignFeasibilityTarget?.candidatePass === true;
  const sourceReceiverPolarityRowBindingPass =
    coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.sourceReceiverPolarityRowBindingTarget?.candidatePass === true;
  const routeDerivedSourceReceiverPolarityMetadataPass =
    coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.sourceReceiverPolarityRowBindingTarget?.routeDerivedMetadataPass ===
    true;
  const routeLocalPolarityAcceptancePass =
    coefficientQuadratureTarget?.singleCoefficientSignPatternSolve
      ?.sourceReceiverPolarityRowBindingTarget?.routeLocalPolarityAcceptanceTarget
      ?.acceptedSourceReceiverPolarityMetadataPass === true;
  const routeLocalCoefficientAcceptancePass =
    coefficientQuadratureTarget?.routeLocalCoefficientAcceptanceTarget
      ?.acceptedCoefficientQuadraturePass === true;
  const routeLocalRowAmplitudeRequirementPass =
    coefficientQuadratureTarget?.routeLocalCoefficientAcceptanceTarget
      ?.rowAmplitudeRequirementPass === true;
  const requiredPullbackFields = [
    "pair_radial_unit_rows",
    "source_receiver_endpoint_ownership",
    "pair_radial_constrained_boundary_charge_solve",
    "delta_eta_of_g_quadrature",
    "kappa_sigma_charge_coefficient",
    "layer_polarity_sign_assignment",
    "source_receiver_polarity_sign_rows",
    "wake_energy_increment",
  ];
  const missingAcceptedFields = [
    radialConstrainedSolvePass || pairRadialAlignmentPass
      ? null
      : "pair_radial_gradient_alignment",
    radialConstrainedSolvePass
      ? null
      : "pair_radial_constrained_boundary_charge_solve",
    routeLocalCoefficientAcceptancePass
      ? null
      : coefficientQuadraturePass
      ? "accepted_delta_eta_of_g_quadrature"
      : "delta_eta_of_g_quadrature",
    routeLocalCoefficientAcceptancePass
      ? null
      : coefficientQuadraturePass
      ? "accepted_kappa_sigma_charge_coefficient"
      : "kappa_sigma_charge_coefficient",
    routeLocalPolarityAcceptancePass
      ? null
      : singleCoefficientSignPatternPass
      ? "accepted_layer_polarity_sign_assignment"
      : null,
    routeLocalPolarityAcceptancePass
      ? null
      : routeDerivedSourceReceiverPolarityMetadataPass
      ? "accepted_source_receiver_polarity_metadata"
      : layerPolaritySignFeasibilityPass
      ? "accepted_source_receiver_polarity_sign_rows"
      : null,
    "accepted_normalized_action_kernel_charge",
    "retained_crossing_domain_pullback",
    "wake_energy_increment",
  ].filter(Boolean);

  return {
    schema:
      "aaa-tri-binary-master-equation-characteristic-tail-pullback-candidate.v1",
    status: !finiteEvaluationPass
      ? "master_equation_characteristic_tail_pullback_finite_gradient_missing"
      : !targetPopulated
        ? "master_equation_characteristic_tail_pullback_pair_radial_rows_missing"
        : routeLocalCoefficientAcceptancePass
          ? "master_equation_characteristic_tail_route_local_coefficients_accepted_boundary_charge_blocked"
        : routeLocalRowAmplitudeRequirementPass
          ? "master_equation_characteristic_tail_route_local_row_amplitude_requirement_populated_boundary_charge_blocked"
        : routeLocalPolarityAcceptancePass
          ? "master_equation_characteristic_tail_route_local_polarity_metadata_accepted_boundary_charge_blocked"
        : routeDerivedSourceReceiverPolarityMetadataPass
          ? "master_equation_characteristic_tail_source_receiver_polarity_route_derived_metadata_candidate_populated_acceptance_blocked"
        : sourceReceiverPolarityRowBindingPass
          ? "master_equation_characteristic_tail_source_receiver_polarity_row_binding_candidate_populated_acceptance_blocked"
        : layerPolaritySignFeasibilityPass
          ? "master_equation_characteristic_tail_layer_polarity_assignment_candidate_populated_source_receiver_rows_blocked"
        : singleCoefficientSignPatternPass
          ? "master_equation_characteristic_tail_single_coefficient_sign_pattern_candidate_populated_polarity_blocked"
        : coefficientQuadraturePass
          ? "master_equation_characteristic_tail_coefficient_quadrature_candidate_populated_acceptance_blocked"
        : radialConstrainedSolvePass
          ? "master_equation_characteristic_tail_radial_constrained_candidate_matches_target_coefficients_unaccepted"
          : pairRadialAlignmentPass
          ? "master_equation_characteristic_tail_pair_radial_target_populated_coefficients_unaccepted"
          : "master_equation_characteristic_tail_pair_radial_alignment_blocked",
    claimLevel:
      "route-row candidate for the Master-Equation characteristic-tail pullback; not an accepted normalized action-kernel wake law",
    targetPopulated,
    pairRadialAlignmentPass,
    radialConstrainedSolvePass,
    routeLocalRowAmplitudeRequirementPass,
    acceptedCharacteristicTailPullbackPass: false,
    endpointConventionId: endpointConvention?.id ?? null,
    masterEquationLawReference: {
      path: "content/markdown/aaa/dynamics/master-equation.md",
      anchor: "exact-nonlocal-lagrangian",
      receiverGradientIdentity:
        "grad_x_i K_eff = -delta_eta(g_ij) r_hat_ij / r_ij^2",
      sourceGradientIdentity:
        "source-end gradient is the opposite endpoint gradient under the endpoint-clear convention",
    },
    finiteEndpointClearEvaluationStatus:
      finiteEndpointClearKernelGradientIntegralEvaluation?.status ?? null,
    routeRowCount: rows.length,
    targetRowCount: targetRows.length,
    alignedRowCount: alignedRows.length,
    sideRadialRowCount: sideRadialRows.length,
    maxPairRadialResidualNorm,
    maxSideIntegralResidualNorm,
    minSignedCharacteristicTailCoefficient,
    maxAbsDeltaEtaCandidate,
    radialConstrainedSolve,
    coefficientQuadratureTarget,
    requiredPullbackFields,
    missingAcceptedFields,
    rows,
    retainedLimitation:
      "This diagnostic compares the finite route-gradient target with the pair-radial receiver/source identity from the Master Equation. It does not accept source/receiver polarity signs, accept the normalized boundary charge, certify the retained crossing-domain pullback, assign wake energy, or close the retained branch.",
  };
}

function createMasterEquationCharacteristicTailPullbackRow({
  crossingRow,
  finiteRow,
  endpointConvention,
  index,
}) {
  const endpointGradientSign =
    crossingRow.continuityPointKind === "sourcePoint"
      ? 1
      : crossingRow.continuityPointKind === "receiverPoint"
        ? -1
        : null;
  const sideRows = [
    createMasterEquationCharacteristicTailPullbackSideRow({
      side: "incoming",
      pairKey: crossingRow.incomingPairKey,
      intervalWidth: finiteOrNull(finiteRow?.incomingIntervalWidth),
      pairEndpointGeometry: crossingRow.incomingPairEndpointGeometry,
      leverArm: crossingRow.leverArm ?? finiteRow?.leverArm ?? null,
      gradientDensity: finiteRow?.gradientDensity ?? null,
      endpointGradientSign,
    }),
    createMasterEquationCharacteristicTailPullbackSideRow({
      side: "outgoing",
      pairKey: crossingRow.outgoingPairKey,
      intervalWidth: finiteOrNull(finiteRow?.outgoingIntervalWidth),
      pairEndpointGeometry: crossingRow.outgoingPairEndpointGeometry,
      leverArm: crossingRow.leverArm ?? finiteRow?.leverArm ?? null,
      gradientDensity: finiteRow?.gradientDensity ?? null,
      endpointGradientSign,
    }),
  ];
  const targetPopulated =
    finiteRow?.finiteEndpointClearRowPass === true &&
    endpointConvention?.id ===
      "endpoint_clear_receiver_gradient_spatial_charge" &&
    endpointGradientSign != null &&
    sideRows.every((sideRow) => sideRow.targetPopulated);
  const maxPairRadialResidualNorm = maxFinite(
    sideRows
      .map((sideRow) => sideRow.pairRadialResidualNorm)
      .filter(Number.isFinite)
  );
  const maxSideIntegralResidualNorm = maxFinite(
    sideRows
      .map((sideRow) => sideRow.sideIntegralResidualNorm)
      .filter(Number.isFinite)
  );
  const pairRadialAlignmentPass =
    targetPopulated &&
    Number.isFinite(maxPairRadialResidualNorm) &&
    maxPairRadialResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(maxSideIntegralResidualNorm) &&
    maxSideIntegralResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    rowId: `master-equation-characteristic-tail-pullback:${index}`,
    status: !targetPopulated
      ? "characteristic_tail_pullback_row_missing_pair_radial_target"
      : pairRadialAlignmentPass
        ? "characteristic_tail_pullback_row_pair_radial_target_populated_coefficients_unaccepted"
        : "characteristic_tail_pullback_row_pair_radial_alignment_blocked",
    finiteEndpointClearRowPass: finiteRow?.finiteEndpointClearRowPass === true,
    targetPopulated,
    pairRadialAlignmentPass,
    incomingPairKey: crossingRow.incomingPairKey ?? null,
    outgoingPairKey: crossingRow.outgoingPairKey ?? null,
    continuityRole: crossingRow.continuityRole ?? null,
    continuityLayer: crossingRow.continuityLayer ?? null,
    continuityPointKind: crossingRow.continuityPointKind ?? null,
    routeRootKey: crossingRow.routeRootKey ?? null,
    zeroSlackRoutePass: crossingRow.zeroSlackRoutePass === true,
    compensationRequired: crossingRow.compensationRequired === true,
    minOneSidedRouteWidth: crossingRow.minOneSidedRouteWidth ?? null,
    endpointPairResidual: crossingRow.endpointPairResidual ?? null,
    endpointToChartResidual: crossingRow.endpointToChartResidual ?? null,
    requiredEndpointCompensationNorm:
      crossingRow.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: crossingRow.requiredClockRetune ?? null,
    requiredPhaseCompensation: crossingRow.requiredPhaseCompensation ?? null,
    endpointConventionId: endpointConvention?.id ?? null,
    endpointGradientSign,
    gradientDensity: finiteRow?.gradientDensity ?? null,
    leverArm: crossingRow.leverArm ?? finiteRow?.leverArm ?? null,
    crossingMeasure: finiteRow?.crossingMeasure ?? null,
    maxPairRadialResidualNorm,
    maxSideIntegralResidualNorm,
    sideRows,
    retainedLimitation:
      "This row only tests whether the finite route-gradient density can be represented by the pair-radial characteristic-tail identity on the incoming and outgoing sides of the hinge.",
  };
}

function createMasterEquationCharacteristicTailPullbackSideRow({
  side,
  pairKey,
  intervalWidth,
  pairEndpointGeometry,
  leverArm,
  gradientDensity,
  endpointGradientSign,
}) {
  const receiverRadialUnit = pairEndpointGeometry?.receiverRadialUnit ?? null;
  const endpointGradientUnit =
    isFiniteVector(receiverRadialUnit) && Number.isFinite(endpointGradientSign)
      ? scaleVector(receiverRadialUnit, endpointGradientSign)
      : null;
  const signedDeltaEtaOverR2Target =
    isFiniteVector(gradientDensity) && isFiniteVector(endpointGradientUnit)
      ? dotVectors(gradientDensity, endpointGradientUnit)
      : null;
  const reconstructedGradientDensity =
    Number.isFinite(signedDeltaEtaOverR2Target) &&
    isFiniteVector(endpointGradientUnit)
      ? scaleVector(endpointGradientUnit, signedDeltaEtaOverR2Target)
      : null;
  const pairRadialResidualVector =
    isFiniteVector(gradientDensity) && isFiniteVector(reconstructedGradientDensity)
      ? subtractVectors(gradientDensity, reconstructedGradientDensity)
      : null;
  const pairRadialResidualNorm = isFiniteVector(pairRadialResidualVector)
    ? vectorNorm(pairRadialResidualVector)
    : null;
  const sideGradientIntegral =
    isFiniteVector(gradientDensity) &&
    Number.isFinite(intervalWidth) &&
    intervalWidth > 0
      ? scaleVector(gradientDensity, intervalWidth)
      : null;
  const characteristicTailIntegralCandidate =
    isFiniteVector(reconstructedGradientDensity) &&
    Number.isFinite(intervalWidth) &&
    intervalWidth > 0
      ? scaleVector(reconstructedGradientDensity, intervalWidth)
      : null;
  const unitCharacteristicTailGradientIntegral =
    isFiniteVector(endpointGradientUnit) &&
    Number.isFinite(intervalWidth) &&
    intervalWidth > 0
      ? scaleVector(endpointGradientUnit, intervalWidth)
      : null;
  const unitAngularContribution =
    isFiniteVector(leverArm) &&
    isFiniteVector(unitCharacteristicTailGradientIntegral)
      ? crossVectors(leverArm, unitCharacteristicTailGradientIntegral)
      : null;
  const sideIntegralResidualVector =
    isFiniteVector(sideGradientIntegral) &&
    isFiniteVector(characteristicTailIntegralCandidate)
      ? subtractVectors(sideGradientIntegral, characteristicTailIntegralCandidate)
      : null;
  const sideIntegralResidualNorm = isFiniteVector(sideIntegralResidualVector)
    ? vectorNorm(sideIntegralResidualVector)
    : null;
  const signedDeltaEtaCandidate =
    Number.isFinite(signedDeltaEtaOverR2Target) &&
    Number.isFinite(pairEndpointGeometry?.pairDistance)
      ? signedDeltaEtaOverR2Target *
        pairEndpointGeometry.pairDistance *
        pairEndpointGeometry.pairDistance
      : null;
  const targetPopulated =
    Number.isFinite(intervalWidth) &&
    intervalWidth > 0 &&
    isFiniteVector(gradientDensity) &&
    isFiniteVector(endpointGradientUnit) &&
    isFiniteVector(unitAngularContribution) &&
    Number.isFinite(signedDeltaEtaOverR2Target) &&
    isFiniteVector(sideGradientIntegral) &&
    isFiniteVector(characteristicTailIntegralCandidate);
  const pairRadialAlignmentPass =
    targetPopulated &&
    Number.isFinite(pairRadialResidualNorm) &&
    pairRadialResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    Number.isFinite(sideIntegralResidualNorm) &&
    sideIntegralResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    side,
    pairKey: pairKey ?? null,
    status: !isFiniteVector(gradientDensity)
      ? "characteristic_tail_side_gradient_density_missing"
      : !isFiniteVector(receiverRadialUnit)
        ? "characteristic_tail_side_pair_radial_unit_missing"
        : !Number.isFinite(endpointGradientSign)
          ? "characteristic_tail_side_endpoint_ownership_missing"
          : pairRadialAlignmentPass
            ? "characteristic_tail_side_pair_radial_aligned_coefficients_unaccepted"
            : "characteristic_tail_side_pair_radial_residual_blocks_pullback",
    targetPopulated,
    pairRadialAlignmentPass,
    intervalWidth,
    endpointOwnership:
      endpointGradientSign === 1
        ? "source_gradient_opposite_receiver"
        : endpointGradientSign === -1
          ? "receiver_gradient"
          : null,
    endpointGradientSign,
    leverArm,
    pairEndpointGeometry,
    receiverRadialUnit,
    endpointGradientUnit,
    signedDeltaEtaOverR2Target,
    signedDeltaEtaCandidate,
    reconstructedGradientDensity,
    unitCharacteristicTailGradientIntegral,
    unitAngularContribution,
    unitAngularContributionNorm: isFiniteVector(unitAngularContribution)
      ? vectorNorm(unitAngularContribution)
      : null,
    pairRadialResidualVector,
    pairRadialResidualNorm,
    sideGradientIntegral,
    characteristicTailIntegralCandidate,
    sideIntegralResidualVector,
    sideIntegralResidualNorm,
    retainedLimitation:
      "The scalar target is the signed coefficient that would make the finite gradient density radial on this side. It is not an evaluated delta_eta(g) quadrature or accepted coupling coefficient.",
  };
}

function createPairRadialCharacteristicTailConstrainedSolve({
  rows,
  targetCharge,
}) {
  const sideBasisRows = rows.flatMap((row) =>
    row.sideRows.map((sideRow) => ({
      rowId: row.rowId,
      side: sideRow.side,
      pairKey: sideRow.pairKey,
      endpointOwnership: sideRow.endpointOwnership,
      continuityRole: row.continuityRole ?? null,
      continuityLayer: row.continuityLayer ?? null,
      routeRootKey: row.routeRootKey ?? null,
      zeroSlackRoutePass: row.zeroSlackRoutePass === true,
      compensationRequired: row.compensationRequired === true,
      minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
      endpointPairResidual: row.endpointPairResidual ?? null,
      endpointToChartResidual: row.endpointToChartResidual ?? null,
      requiredEndpointCompensationNorm:
        row.requiredEndpointCompensationNorm ?? null,
      requiredClockRetune: row.requiredClockRetune ?? null,
      requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
      intervalWidth: sideRow.intervalWidth,
      pairEndpointGeometry: sideRow.pairEndpointGeometry ?? null,
      pairDistance: sideRow.pairEndpointGeometry?.pairDistance ?? null,
      endpointGradientUnit: sideRow.endpointGradientUnit ?? null,
      unitAngularContribution: sideRow.unitAngularContribution ?? null,
      basisPass: isFiniteVector(sideRow.unitAngularContribution),
    }))
  );
  const activeBasisRows = sideBasisRows.filter((row) => row.basisPass);
  const solve = solveLeastNormVectorCombination({
    columns: activeBasisRows.map((row) => row.unitAngularContribution),
    target: targetCharge,
  });
  const solvedRows = sideBasisRows.map((row) => {
    const activeIndex = activeBasisRows.indexOf(row);
    const coefficient =
      activeIndex >= 0 ? solve.coefficients?.[activeIndex] ?? null : null;
    const constrainedGradientDensity =
      Number.isFinite(coefficient) && isFiniteVector(row.endpointGradientUnit)
        ? scaleVector(row.endpointGradientUnit, coefficient)
        : null;
    const constrainedGradientIntegral =
      isFiniteVector(constrainedGradientDensity) &&
      Number.isFinite(row.intervalWidth)
        ? scaleVector(constrainedGradientDensity, row.intervalWidth)
        : null;
    const constrainedAngularContribution =
      Number.isFinite(coefficient) && isFiniteVector(row.unitAngularContribution)
        ? scaleVector(row.unitAngularContribution, coefficient)
        : null;
    const signedDeltaEtaCandidate =
      Number.isFinite(coefficient) && Number.isFinite(row.pairDistance)
        ? coefficient * row.pairDistance * row.pairDistance
        : null;

    return {
      ...row,
      coefficient,
      signedDeltaEtaOverR2Candidate: coefficient,
      signedDeltaEtaCandidate,
      constrainedGradientDensity,
      constrainedGradientIntegral,
      constrainedAngularContribution,
      constrainedAngularContributionNorm: isFiniteVector(
        constrainedAngularContribution
      )
        ? vectorNorm(constrainedAngularContribution)
        : null,
      retainedLimitation:
        "The coefficient is the least-norm side-split scalar needed for the pair-radial boundary-charge solve. It is not yet an evaluated delta_eta(g) quadrature or accepted coupling coefficient.",
    };
  });
  const maxAbsCoefficient = maxFinite(
    solvedRows
      .map((row) =>
        Number.isFinite(row.coefficient) ? Math.abs(row.coefficient) : null
      )
      .filter(Number.isFinite)
  );
  const maxAbsDeltaEtaCandidate = maxFinite(
    solvedRows
      .map((row) =>
        Number.isFinite(row.signedDeltaEtaCandidate)
          ? Math.abs(row.signedDeltaEtaCandidate)
          : null
      )
      .filter(Number.isFinite)
  );
  const candidatePass =
    solve.pass === true &&
    solvedRows.length > 0 &&
    solvedRows.every((row) => row.basisPass && Number.isFinite(row.coefficient));

  return {
    schema:
      "aaa-tri-binary-pair-radial-characteristic-tail-constrained-solve.v1",
    status: candidatePass
      ? "pair_radial_characteristic_tail_constrained_solve_matches_target_coefficients_unaccepted"
      : activeBasisRows.length > 0
        ? "pair_radial_characteristic_tail_constrained_solve_residual_or_rank_blocked"
        : "pair_radial_characteristic_tail_constrained_solve_basis_missing",
    claimLevel:
      "least-norm side-split pair-radial scalar solve for the wake boundary charge; not an accepted delta_eta(g) quadrature or wake-energy law",
    candidatePass,
    acceptedCharacteristicTailPullbackPass: false,
    solverMethod: solve.method,
    targetCharge,
    reconstructedCharge: solve.reconstructed,
    targetResidualVector: solve.residualVector,
    targetResidualNorm: solve.residualNorm,
    normalMatrix: solve.normalMatrix,
    activeBasisRowCount: activeBasisRows.length,
    sideBasisRowCount: sideBasisRows.length,
    maxAbsCoefficient,
    maxAbsDeltaEtaCandidate,
    rows: solvedRows,
    missingAcceptedFields: [
      "delta_eta_of_g_quadrature",
      "kappa_sigma_charge_coefficient",
      "accepted_normalized_action_kernel_charge",
      "retained_crossing_domain_pullback",
      "wake_energy_increment",
    ],
    retainedLimitation:
      "This solve replaces the free route-gradient target with pair-radial side coefficients. It matches the boundary charge only as a candidate and still lacks the Master-Equation delta_eta(g) quadrature, accepted normalization coefficient, retained pullback, and wake-energy increment.",
  };
}

function createCharacteristicTailCoefficientQuadratureTarget({
  radialConstrainedSolve,
  actionKernelNormalizationConventionCandidate,
}) {
  const etaValue =
    actionKernelNormalizationConventionCandidate?.etaCandidate?.value ?? null;
  const solvePass = radialConstrainedSolve?.candidatePass === true;
  const rows = (radialConstrainedSolve?.rows ?? []).map((row) =>
    createCharacteristicTailCoefficientQuadratureRow({ row, etaValue })
  );
  const targetRows = rows.filter((row) => row.targetPopulated);
  const candidatePass =
    solvePass && rows.length > 0 && targetRows.length === rows.length;
  const requiredCouplingCoefficients = rows
    .map((row) => row.requiredCouplingCoefficient)
    .filter(Number.isFinite);
  const positiveRequiredCoefficientCount = requiredCouplingCoefficients.filter(
    (value) => value > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  ).length;
  const negativeRequiredCoefficientCount = requiredCouplingCoefficients.filter(
    (value) => value < -POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
  ).length;
  const mixedRequiredCoefficientSigns =
    positiveRequiredCoefficientCount > 0 && negativeRequiredCoefficientCount > 0;
  const singleCoefficientSignPatternSolve =
    createCharacteristicTailSingleCoefficientSignPatternSolve({
      radialConstrainedSolve,
      coefficientQuadratureRows: rows,
    });
  const routeLocalCoefficientAcceptanceTarget =
    createRouteLocalCoefficientAcceptanceTarget({
      coefficientQuadratureRows: rows,
      singleCoefficientSignPatternSolve,
    });
  const singleCoefficientSignPatternPass =
    singleCoefficientSignPatternSolve?.candidatePass === true;
  const layerPolaritySignFeasibilityPass =
    singleCoefficientSignPatternSolve?.layerPolaritySignFeasibilityTarget
      ?.candidatePass === true;
  const sourceReceiverPolarityRowBindingPass =
    singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.candidatePass === true;
  const routeLocalCoefficientAcceptancePass =
    routeLocalCoefficientAcceptanceTarget?.acceptedCoefficientQuadraturePass ===
    true;
  const routeLocalPolarityAcceptancePass =
    singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeLocalPolarityAcceptanceTarget
      ?.acceptedSourceReceiverPolarityMetadataPass === true;
  const routeLocalRowAmplitudeRequirementPass =
    routeLocalCoefficientAcceptanceTarget?.rowAmplitudeRequirementPass === true;

  return {
    schema:
      "aaa-tri-binary-characteristic-tail-coefficient-quadrature-target.v1",
    status: !solvePass
        ? "characteristic_tail_coefficient_quadrature_radial_constrained_solve_missing"
      : !Number.isFinite(etaValue) || etaValue <= 0
        ? "characteristic_tail_coefficient_quadrature_eta_missing"
        : routeLocalCoefficientAcceptancePass
          ? "characteristic_tail_route_local_delta_eta_kappa_sigma_coefficients_accepted"
        : routeLocalRowAmplitudeRequirementPass
          ? "characteristic_tail_route_local_row_amplitude_requirement_populated_coefficient_law_missing"
        : routeLocalPolarityAcceptancePass
          ? "characteristic_tail_route_local_polarity_metadata_accepted_coefficient_acceptance_missing"
        : sourceReceiverPolarityRowBindingPass
          ? "characteristic_tail_source_receiver_polarity_row_binding_candidate_populated_acceptance_missing"
        : layerPolaritySignFeasibilityPass
          ? "characteristic_tail_layer_polarity_assignment_candidate_populated_source_receiver_rows_missing"
        : singleCoefficientSignPatternPass
          ? "characteristic_tail_single_coefficient_sign_pattern_candidate_populated_polarity_rows_missing"
        : candidatePass
          ? "characteristic_tail_coefficient_quadrature_candidate_populated_coupling_unaccepted"
          : "characteristic_tail_coefficient_quadrature_rows_missing",
    claimLevel:
      "candidate delta_eta(g) quadrature and required coupling/sign coefficients for the side-split characteristic-tail solve; not an accepted normalized action-kernel wake law",
    candidatePass,
    acceptedCoefficientQuadraturePass: routeLocalCoefficientAcceptancePass,
    acceptedDeltaEtaOfGQuadraturePass:
      routeLocalCoefficientAcceptanceTarget?.acceptedDeltaEtaOfGQuadraturePass ===
      true,
    acceptedKappaSigmaChargeCoefficientPass:
      routeLocalCoefficientAcceptanceTarget?.acceptedKappaSigmaChargeCoefficientPass ===
      true,
    rowAmplitudeRequirementPass: routeLocalRowAmplitudeRequirementPass,
    eta: etaValue,
    fieldSpeed: FIELD_SPEED,
    rowCount: rows.length,
    targetRowCount: targetRows.length,
    maxAbsCausalGap: maxFinite(
      rows.map((row) =>
        Number.isFinite(row.causalGap) ? Math.abs(row.causalGap) : null
      )
    ),
    maxAbsSignedDeltaEtaCandidate: maxFinite(
      rows.map((row) =>
        Number.isFinite(row.signedDeltaEtaCandidate)
          ? Math.abs(row.signedDeltaEtaCandidate)
          : null
      )
    ),
    minDeltaEtaGaussianAtGap: minFinite(
      rows.map((row) => row.deltaEtaGaussianAtGap).filter(Number.isFinite)
    ),
    maxDeltaEtaGaussianAtGap: maxFinite(
      rows.map((row) => row.deltaEtaGaussianAtGap).filter(Number.isFinite)
    ),
    minRequiredCouplingCoefficient: minFinite(requiredCouplingCoefficients),
    maxRequiredCouplingCoefficient: maxFinite(requiredCouplingCoefficients),
    maxAbsRequiredCouplingCoefficient: maxFinite(
      requiredCouplingCoefficients.map((value) => Math.abs(value))
    ),
    positiveRequiredCoefficientCount,
    negativeRequiredCoefficientCount,
    mixedRequiredCoefficientSigns,
    singleCoefficientSignPatternSolve,
    routeLocalCoefficientAcceptanceTarget,
    rows,
    missingAcceptedFields: [
      routeLocalCoefficientAcceptancePass
        ? null
        : "accepted_delta_eta_of_g_quadrature",
      routeLocalCoefficientAcceptancePass
        ? null
        : "accepted_kappa_sigma_charge_coefficient",
      routeLocalCoefficientAcceptancePass
        ? null
        : routeLocalPolarityAcceptancePass
          ? null
          : "accepted_source_receiver_polarity_sign_rows",
      "accepted_normalized_action_kernel_charge",
      "retained_crossing_domain_pullback",
      "wake_energy_increment",
    ].filter(Boolean),
    retainedLimitation:
      routeLocalCoefficientAcceptancePass
        ? "This target accepts the Gaussian delta_eta(g) rows and common kappa-sigma coefficient for the route-local wake rows only. It does not accept the normalized action-kernel charge, retained pullback, wake energy, or the full retained branch."
        : "This target evaluates the Gaussian delta_eta(g) convention and the coupling/sign coefficient required to reproduce each side coefficient. It does not prove that those coefficients are supplied by accepted polarity, charge, or wake-energy rows.",
  };
}

function createRouteLocalCoefficientAcceptanceTarget({
  coefficientQuadratureRows,
  singleCoefficientSignPatternSolve,
}) {
  const routeLocalPolarityAcceptanceTarget =
    singleCoefficientSignPatternSolve?.sourceReceiverPolarityRowBindingTarget
      ?.routeLocalPolarityAcceptanceTarget ?? null;
  const routeLocalPolarityAccepted =
    routeLocalPolarityAcceptanceTarget?.acceptedSourceReceiverPolarityMetadataPass ===
    true;
  const commonCouplingCoefficient =
    singleCoefficientSignPatternSolve?.commonCouplingCoefficient ?? null;
  const solveResidualNorm =
    singleCoefficientSignPatternSolve?.targetResidualNorm ?? null;
  const solveResidualPass =
    Number.isFinite(solveResidualNorm) &&
    solveResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  const rows = (singleCoefficientSignPatternSolve?.rows ?? []).map(
    (row, index) =>
      createRouteLocalCoefficientAcceptanceRow({
        solveRow: row,
        coefficientQuadratureRow: coefficientQuadratureRows?.[index] ?? null,
        commonCouplingCoefficient,
      })
  );
  const rowAmplitudeRequirementTarget =
    createRouteLocalRowAmplitudeRequirementTarget({
      rows,
      targetCharge: singleCoefficientSignPatternSolve?.targetCharge ?? null,
      routeLocalPolarityAccepted,
    });
  const acceptedRows = rows.filter((row) => row.acceptancePass);
  const directCommonCoefficientRowsPass =
    rows.length > 0 && acceptedRows.length === rows.length;
  const maxAbsCausalGap = maxFinite(
    rows.map((row) =>
      Number.isFinite(row.causalGap) ? Math.abs(row.causalGap) : null
    )
  );
  const maxAbsCouplingResidual = maxFinite(
    rows.map((row) =>
      Number.isFinite(row.couplingResidual)
        ? Math.abs(row.couplingResidual)
        : null
    )
  );
  const acceptedCoefficientQuadraturePass =
    routeLocalPolarityAccepted &&
    solveResidualPass &&
    Number.isFinite(commonCouplingCoefficient) &&
    commonCouplingCoefficient > 0 &&
    rows.length > 0 &&
    (directCommonCoefficientRowsPass ||
      rowAmplitudeRequirementTarget?.acceptedRowAmplitudeLawPass === true);
  const rowAmplitudeRequirementPass =
    rowAmplitudeRequirementTarget?.rowAmplitudeRequirementPass === true;
  const acceptedRowAmplitudeLawPass =
    rowAmplitudeRequirementTarget?.acceptedRowAmplitudeLawPass === true;
  const rowAmplitudeDeltaEtaIdentityOnly =
    rowAmplitudeRequirementTarget?.status ===
    "route_local_row_amplitude_requirement_populated_delta_eta_identity_only";

  return {
    schema:
      "aaa-tri-binary-route-local-coefficient-acceptance-target.v1",
    status: acceptedCoefficientQuadraturePass
      ? acceptedRowAmplitudeLawPass && !directCommonCoefficientRowsPass
        ? "route_local_delta_eta_kappa_sigma_row_amplitude_law_accepted"
        : "route_local_delta_eta_kappa_sigma_coefficients_accepted"
      : routeLocalPolarityAccepted && rowAmplitudeDeltaEtaIdentityOnly
        ? "route_local_row_amplitude_requirement_populated_delta_eta_identity_only"
      : routeLocalPolarityAccepted && rowAmplitudeRequirementPass
        ? "route_local_row_amplitude_requirement_populated_simple_laws_rejected"
      : routeLocalPolarityAccepted
        ? "route_local_delta_eta_kappa_sigma_coefficients_acceptance_blocked"
        : "route_local_delta_eta_kappa_sigma_coefficients_polarity_acceptance_missing",
    claimLevel:
      "route-local acceptance of delta_eta(g) quadrature and common kappa-sigma coefficient; not normalized action-kernel charge acceptance",
    acceptedCoefficientQuadraturePass,
    acceptedDeltaEtaOfGQuadraturePass: acceptedCoefficientQuadraturePass,
    acceptedKappaSigmaChargeCoefficientPass: acceptedCoefficientQuadraturePass,
    rowAmplitudeRequirementPass,
    acceptedRowAmplitudeLawPass,
    directCommonCoefficientRowsPass,
    acceptanceScope:
      "route-local characteristic-tail wake rows only; retainedBranchClaim remains false",
    commonCouplingCoefficient,
    solveResidualNorm,
    solveResidualPass,
    maxAbsCausalGap,
    maxAbsCouplingResidual,
    rowCount: rows.length,
    acceptedRowCount: acceptedRows.length,
    acceptedViaRowAmplitudeLawRowCount: acceptedRowAmplitudeLawPass
      ? rows.length
      : 0,
    routeLocalPolarityAccepted,
    routeLocalPolarityAcceptanceStatus:
      routeLocalPolarityAcceptanceTarget?.status ?? null,
    rowAmplitudeRequirementTarget,
    rows,
    retainedLimitation:
      "This target accepts the coefficient rows only after route-local polarity metadata has been accepted. It does not accept the boundary charge as a retained action-kernel pullback or assign wake energy.",
  };
}

function createRouteLocalCoefficientAcceptanceRow({
  solveRow,
  coefficientQuadratureRow,
  commonCouplingCoefficient,
}) {
  const rowAmplitudeDenominator =
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(solveRow?.requiredSigmaSign)
      ? commonCouplingCoefficient * solveRow.requiredSigmaSign
      : null;
  const acceptedCouplingCoefficient =
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(solveRow?.requiredSigmaSign)
      ? commonCouplingCoefficient * solveRow.requiredSigmaSign
      : null;
  const requiredCouplingCoefficient =
    coefficientQuadratureRow?.requiredCouplingCoefficient ?? null;
  const requiredRowAmplitude =
    Number.isFinite(requiredCouplingCoefficient) &&
    Number.isFinite(rowAmplitudeDenominator) &&
    Math.abs(rowAmplitudeDenominator) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? requiredCouplingCoefficient / rowAmplitudeDenominator
      : null;
  const rowAmplitudeReconstructedCouplingCoefficient =
    Number.isFinite(requiredRowAmplitude) &&
    Number.isFinite(rowAmplitudeDenominator)
      ? requiredRowAmplitude * rowAmplitudeDenominator
      : null;
  const rowAmplitudeResidual =
    Number.isFinite(requiredCouplingCoefficient) &&
    Number.isFinite(rowAmplitudeReconstructedCouplingCoefficient)
      ? requiredCouplingCoefficient - rowAmplitudeReconstructedCouplingCoefficient
      : null;
  const couplingResidual =
    Number.isFinite(requiredCouplingCoefficient) &&
    Number.isFinite(acceptedCouplingCoefficient)
      ? requiredCouplingCoefficient - acceptedCouplingCoefficient
      : null;
  const acceptancePass =
    coefficientQuadratureRow?.targetPopulated === true &&
    coefficientQuadratureRow?.onCharacteristicPass === true &&
    solveRow?.targetPopulated === true &&
    Number.isFinite(couplingResidual) &&
    Math.abs(couplingResidual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    rowId: coefficientQuadratureRow?.rowId ?? solveRow?.rowId ?? null,
    pairKey: solveRow?.pairKey ?? coefficientQuadratureRow?.pairKey ?? null,
    side: solveRow?.side ?? coefficientQuadratureRow?.side ?? null,
    endpointOwnership:
      solveRow?.endpointOwnership ?? coefficientQuadratureRow?.endpointOwnership ?? null,
    continuityRole:
      solveRow?.continuityRole ?? coefficientQuadratureRow?.continuityRole ?? null,
    continuityLayer:
      solveRow?.continuityLayer ?? coefficientQuadratureRow?.continuityLayer ?? null,
    routeRootKey:
      solveRow?.routeRootKey ?? coefficientQuadratureRow?.routeRootKey ?? null,
    zeroSlackRoutePass:
      solveRow?.zeroSlackRoutePass === true ||
      coefficientQuadratureRow?.zeroSlackRoutePass === true,
    compensationRequired:
      solveRow?.compensationRequired === true ||
      coefficientQuadratureRow?.compensationRequired === true,
    minOneSidedRouteWidth:
      solveRow?.minOneSidedRouteWidth ??
      coefficientQuadratureRow?.minOneSidedRouteWidth ??
      null,
    endpointPairResidual:
      solveRow?.endpointPairResidual ??
      coefficientQuadratureRow?.endpointPairResidual ??
      null,
    endpointToChartResidual:
      solveRow?.endpointToChartResidual ??
      coefficientQuadratureRow?.endpointToChartResidual ??
      null,
    requiredEndpointCompensationNorm:
      solveRow?.requiredEndpointCompensationNorm ??
      coefficientQuadratureRow?.requiredEndpointCompensationNorm ??
      null,
    requiredClockRetune:
      solveRow?.requiredClockRetune ??
      coefficientQuadratureRow?.requiredClockRetune ??
      null,
    requiredPhaseCompensation:
      solveRow?.requiredPhaseCompensation ??
      coefficientQuadratureRow?.requiredPhaseCompensation ??
      null,
    intervalWidth:
      solveRow?.intervalWidth ?? coefficientQuadratureRow?.intervalWidth ?? null,
    pairDistance:
      solveRow?.pairDistance ?? coefficientQuadratureRow?.pairDistance ?? null,
    unitAngularContribution: solveRow?.unitAngularContribution ?? null,
    unitAngularContributionNorm: isFiniteVector(solveRow?.unitAngularContribution)
      ? vectorNorm(solveRow.unitAngularContribution)
      : null,
    unitAngularContributionZ: solveRow?.unitAngularContribution?.z ?? null,
    lawBasisAngularContribution: solveRow?.lawBasisAngularContribution ?? null,
    lawBasisAngularContributionNorm: isFiniteVector(
      solveRow?.lawBasisAngularContribution
    )
      ? vectorNorm(solveRow.lawBasisAngularContribution)
      : null,
    reconstructedAngularContribution:
      solveRow?.reconstructedAngularContribution ?? null,
    reconstructedAngularContributionNorm:
      solveRow?.reconstructedAngularContributionNorm ?? null,
    status: acceptancePass
      ? "route_local_coefficient_row_accepted"
      : "route_local_coefficient_row_acceptance_blocked",
    targetPopulated:
      coefficientQuadratureRow?.targetPopulated === true &&
      solveRow?.targetPopulated === true,
    onCharacteristicPass:
      coefficientQuadratureRow?.onCharacteristicPass === true,
    causalGap: coefficientQuadratureRow?.causalGap ?? null,
    requiredSigmaSign: solveRow?.requiredSigmaSign ?? null,
    commonCouplingCoefficient,
    acceptedCouplingCoefficient,
    requiredCouplingCoefficient,
    couplingResidual,
    requiredRowAmplitude,
    rowAmplitudeReconstructedCouplingCoefficient,
    rowAmplitudeResidual,
    deltaEtaGaussianAtGap:
      coefficientQuadratureRow?.deltaEtaGaussianAtGap ?? null,
    signedDeltaEtaCandidate:
      coefficientQuadratureRow?.signedDeltaEtaCandidate ?? null,
    acceptancePass,
  };
}

function createRouteLocalRowAmplitudeRequirementTarget({
  rows,
  targetCharge,
  routeLocalPolarityAccepted,
}) {
  const amplitudeRows = rows.map(createRouteLocalRowAmplitudeRequirementRow);
  const populatedRows = amplitudeRows.filter((row) => row.requirementPopulated);
  const groupTests = [
    createRouteLocalAmplitudeGroupTest({
      groupKey: "continuityRole",
      label: "route continuity role",
      rows: amplitudeRows,
      keyFn: (row) => row.continuityRole ?? "unknown",
    }),
    createRouteLocalAmplitudeGroupTest({
      groupKey: "routeSlackClass",
      label: "route slack class",
      rows: amplitudeRows,
      keyFn: (row) =>
        row.zeroSlackRoutePass
          ? "zero_slack"
          : row.compensationRequired
            ? "compensation_required"
            : "unknown",
    }),
    createRouteLocalAmplitudeGroupTest({
      groupKey: "endpointOwnership",
      label: "endpoint ownership",
      rows: amplitudeRows,
      keyFn: (row) => row.endpointOwnership ?? "unknown",
    }),
    createRouteLocalAmplitudeGroupTest({
      groupKey: "side",
      label: "incoming/outgoing side",
      rows: amplitudeRows,
      keyFn: (row) => row.side ?? "unknown",
    }),
  ];
  const rowAmplitudeLawSearchTarget =
    createRouteLocalRowAmplitudeLawSearchTarget({
      rows: amplitudeRows,
      targetCharge,
      routeLocalPolarityAccepted,
    });
  const rowAmplitudeRequirementPass =
    amplitudeRows.length > 0 &&
    populatedRows.length === amplitudeRows.length &&
    amplitudeRows.every(
      (row) =>
        Number.isFinite(row.rowAmplitudeResidual) &&
        Math.abs(row.rowAmplitudeResidual) <=
          POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
    );
  const passingSimpleGroupLawCount = groupTests.filter(
    (test) => test.simpleGroupAmplitudeLawPass
  ).length;
  const simpleGroupLawRejected =
    rowAmplitudeRequirementPass && passingSimpleGroupLawCount === 0;
  const nonTautologicalGeometryLawCandidatePass =
    rowAmplitudeLawSearchTarget?.nonTautologicalGeometryLawCandidatePass ===
    true;
  const leastNormBoundaryChargeAmplitudeLawPass =
    rowAmplitudeLawSearchTarget?.leastNormBoundaryChargeAmplitudeLawPass ===
    true;
  const tautologicalDeltaEtaIdentityPass =
    rowAmplitudeLawSearchTarget?.tautologicalDeltaEtaIdentityPass === true;
  const acceptedRowAmplitudeLawPass =
    rowAmplitudeRequirementPass && leastNormBoundaryChargeAmplitudeLawPass;
  const maxAbsRequiredRowAmplitude = maxFinite(
    amplitudeRows.map((row) =>
      Number.isFinite(row.requiredRowAmplitude)
        ? Math.abs(row.requiredRowAmplitude)
        : null
    )
  );
  const minRequiredRowAmplitude = minFinite(
    amplitudeRows.map((row) => row.requiredRowAmplitude).filter(Number.isFinite)
  );
  const maxRequiredRowAmplitude = maxFinite(
    amplitudeRows.map((row) => row.requiredRowAmplitude).filter(Number.isFinite)
  );

  return {
    schema:
      "aaa-tri-binary-route-local-row-amplitude-requirement-target.v1",
    status: !rowAmplitudeRequirementPass
      ? "route_local_row_amplitude_requirement_missing"
      : acceptedRowAmplitudeLawPass
        ? "route_local_least_norm_boundary_charge_row_amplitude_law_accepted"
      : nonTautologicalGeometryLawCandidatePass
        ? "route_local_row_amplitude_geometry_law_candidate_populated_acceptance_missing"
      : tautologicalDeltaEtaIdentityPass
        ? "route_local_row_amplitude_requirement_populated_delta_eta_identity_only"
      : simpleGroupLawRejected
        ? "route_local_row_amplitude_requirement_populated_simple_group_laws_rejected"
        : "route_local_row_amplitude_requirement_populated_simple_group_law_candidate",
    claimLevel: acceptedRowAmplitudeLawPass
      ? "route-local row-amplitude law accepted for the characteristic-tail coefficient rows; not normalized action-kernel charge or wake-energy acceptance"
      : "route-local per-row amplitude requirements for the characteristic-tail coefficient rows; not an accepted amplitude law or normalized action-kernel charge",
    rowAmplitudeRequirementPass,
    acceptedRowAmplitudeLawPass,
    leastNormBoundaryChargeAmplitudeLawPass,
    nonTautologicalGeometryLawCandidatePass,
    tautologicalDeltaEtaIdentityPass,
    simpleGroupLawRejected,
    passingSimpleGroupLawCount,
    rowCount: amplitudeRows.length,
    populatedRowCount: populatedRows.length,
    minRequiredRowAmplitude,
    maxRequiredRowAmplitude,
    maxAbsRequiredRowAmplitude,
    groupTests,
    rowAmplitudeLawSearchTarget,
    rows: amplitudeRows,
    retainedLimitation:
      acceptedRowAmplitudeLawPass
        ? "This target accepts a route-local row-amplitude law conditioned on the least-norm boundary-charge split, route-local polarity metadata, and the current target charge. It does not accept the normalized boundary charge as a retained action-kernel pullback or assign wake energy."
        : "This target records the row amplitudes required after route-local polarity metadata has been accepted. It separates the algebraic delta_eta identity from non-tautological geometry-law candidates; it does not derive an accepted amplitude law, normalized boundary charge, retained pullback, or wake energy.",
  };
}

function createRouteLocalRowAmplitudeRequirementRow(row) {
  return {
    rowId: row.rowId ?? null,
    pairKey: row.pairKey ?? null,
    side: row.side ?? null,
    endpointOwnership: row.endpointOwnership ?? null,
    continuityRole: row.continuityRole ?? null,
    continuityLayer: row.continuityLayer ?? null,
    routeRootKey: row.routeRootKey ?? null,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
    endpointPairResidual: row.endpointPairResidual ?? null,
    endpointToChartResidual: row.endpointToChartResidual ?? null,
    requiredEndpointCompensationNorm:
      row.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: row.requiredClockRetune ?? null,
    requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
    intervalWidth: row.intervalWidth ?? null,
    pairDistance: row.pairDistance ?? null,
    pairDistanceSquared: Number.isFinite(row.pairDistance)
      ? row.pairDistance * row.pairDistance
      : null,
    unitAngularContribution: row.unitAngularContribution ?? null,
    unitAngularContributionNorm: row.unitAngularContributionNorm ?? null,
    unitAngularContributionZ: row.unitAngularContributionZ ?? null,
    lawBasisAngularContribution: row.lawBasisAngularContribution ?? null,
    lawBasisAngularContributionNorm: row.lawBasisAngularContributionNorm ?? null,
    reconstructedAngularContribution:
      row.reconstructedAngularContribution ?? null,
    reconstructedAngularContributionNorm:
      row.reconstructedAngularContributionNorm ?? null,
    requiredSigmaSign: row.requiredSigmaSign ?? null,
    commonCouplingCoefficient: row.commonCouplingCoefficient ?? null,
    requiredCouplingCoefficient: row.requiredCouplingCoefficient ?? null,
    deltaEtaGaussianAtGap: row.deltaEtaGaussianAtGap ?? null,
    signedDeltaEtaCandidate: row.signedDeltaEtaCandidate ?? null,
    requiredRowAmplitude: row.requiredRowAmplitude ?? null,
    rowAmplitudeReconstructedCouplingCoefficient:
      row.rowAmplitudeReconstructedCouplingCoefficient ?? null,
    rowAmplitudeResidual: row.rowAmplitudeResidual ?? null,
    requirementPopulated:
      Number.isFinite(row.requiredRowAmplitude) &&
      Number.isFinite(row.rowAmplitudeResidual),
  };
}

function createRouteLocalRowAmplitudeLawSearchTarget({
  rows,
  targetCharge,
  routeLocalPolarityAccepted,
}) {
  const algebraicDeltaEtaIdentity =
    createRouteLocalDeltaEtaIdentityAmplitudeTest(rows);
  const leastNormBoundaryChargeAmplitudeLaw =
    createRouteLocalLeastNormBoundaryChargeAmplitudeLaw({
      rows,
      targetCharge,
      routeLocalPolarityAccepted,
    });
  const featureKinds = [
    "constant",
    "pairDistance",
    "pairDistanceSquared",
    "inversePairDistance",
    "inversePairDistanceSquared",
    "routeWidth",
    "routeWidthOverPairDistance",
    "routeWidthOverPairDistanceSquared",
    "pairDistanceOverRouteWidth",
    "pairDistanceSquaredOverRouteWidth",
    "unitAngularContributionNorm",
    "sqrtUnitAngularContributionNorm",
  ];
  const signKinds = [
    "positive",
    "angularOrientation",
    "sideIncomingPositive",
    "sideOutgoingPositive",
    "sameSourcePositive",
    "sameReceiverPositive",
    "compensationPositive",
    "zeroSlackPositive",
    "sourceGradientPositive",
    "receiverGradientPositive",
  ];
  const geometryCandidates = [];
  for (const featureKind of featureKinds) {
    for (const signKind of signKinds) {
      geometryCandidates.push(
        createRouteLocalRowAmplitudeGeometryLawCandidate({
          rows,
          featureKind,
          signKind,
        })
      );
    }
  }
  const populatedGeometryCandidates = geometryCandidates
    .filter((candidate) => candidate.candidatePopulated)
    .sort(
      (left, right) =>
        (left.maxAbsResidual ?? Infinity) -
          (right.maxAbsResidual ?? Infinity) ||
        left.lawId.localeCompare(right.lawId)
    );
  const passingGeometryCandidates = populatedGeometryCandidates.filter(
    (candidate) => candidate.geometryLawCandidatePass
  );
  const nonTautologicalGeometryLawCandidatePass =
    passingGeometryCandidates.length > 0;
  const leastNormBoundaryChargeAmplitudeLawPass =
    leastNormBoundaryChargeAmplitudeLaw.acceptedRowAmplitudeLawPass === true;
  const tautologicalDeltaEtaIdentityPass =
    algebraicDeltaEtaIdentity.identityPass === true;

  return {
    schema:
      "aaa-tri-binary-route-local-row-amplitude-law-search-target.v1",
    status: leastNormBoundaryChargeAmplitudeLawPass
      ? "row_amplitude_law_search_least_norm_boundary_charge_law_accepted"
      : nonTautologicalGeometryLawCandidatePass
      ? "row_amplitude_law_search_geometry_candidate_populated_acceptance_missing"
      : tautologicalDeltaEtaIdentityPass
        ? "row_amplitude_law_search_delta_eta_identity_only"
        : populatedGeometryCandidates.length > 0
          ? "row_amplitude_law_search_geometry_candidates_rejected"
          : "row_amplitude_law_search_inputs_missing",
    claimLevel:
      leastNormBoundaryChargeAmplitudeLawPass
        ? "route-local row-amplitude law accepted from the least-norm boundary-charge split; normalized boundary-charge pullback and wake energy remain unaccepted"
        : "fail-closed row-amplitude law search; algebraic delta_eta reconstruction is not an accepted independent amplitude law",
    acceptedRowAmplitudeLawPass: leastNormBoundaryChargeAmplitudeLawPass,
    leastNormBoundaryChargeAmplitudeLawPass,
    nonTautologicalGeometryLawCandidatePass,
    tautologicalDeltaEtaIdentityPass,
    testedGeometryCandidateCount: geometryCandidates.length,
    populatedGeometryCandidateCount: populatedGeometryCandidates.length,
    passingGeometryCandidateCount: passingGeometryCandidates.length,
    leastNormBoundaryChargeAmplitudeLaw,
    algebraicDeltaEtaIdentity,
    bestGeometryCandidate: populatedGeometryCandidates[0] ?? null,
    bestRejectedGeometryCandidates: populatedGeometryCandidates
      .filter((candidate) => candidate.geometryLawCandidatePass !== true)
      .slice(0, 8),
    retainedLimitation:
      leastNormBoundaryChargeAmplitudeLawPass
        ? "The accepted law is route-local and conditional on the least-norm side-split boundary-charge target. It does not accept the normalized action-kernel charge as a retained pullback or close wake energy."
        : "The search fits simple single-scalar geometry laws against the required row amplitudes. A passing algebraic delta_eta identity only restates the constrained side coefficient through the Gaussian quadrature and common kappa; it is not an accepted boundary-charge law.",
  };
}

function createRouteLocalLeastNormBoundaryChargeAmplitudeLaw({
  rows,
  targetCharge,
  routeLocalPolarityAccepted,
}) {
  const activeRows = rows.filter((row) =>
    isFiniteVector(row.unitAngularContribution)
  );
  const solve = solveLeastNormVectorCombination({
    columns: activeRows.map((row) => row.unitAngularContribution),
    target: targetCharge,
  });
  const coefficientByRow = new Map(
    activeRows.map((row, index) => [row, solve.coefficients?.[index] ?? null])
  );
  const lawRows = rows.map((row) => {
    const leastNormBoundaryChargeCoefficient = coefficientByRow.get(row) ?? null;
    const predictedSignedDeltaEtaCandidate =
      Number.isFinite(leastNormBoundaryChargeCoefficient) &&
      Number.isFinite(row.pairDistance)
        ? leastNormBoundaryChargeCoefficient *
          row.pairDistance *
          row.pairDistance
        : null;
    const predictedRequiredCouplingCoefficient =
      Number.isFinite(predictedSignedDeltaEtaCandidate) &&
      Number.isFinite(row.deltaEtaGaussianAtGap) &&
      Math.abs(row.deltaEtaGaussianAtGap) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? predictedSignedDeltaEtaCandidate / row.deltaEtaGaussianAtGap
        : null;
    const rowAmplitudeDenominator =
      Number.isFinite(row.commonCouplingCoefficient) &&
      Number.isFinite(row.requiredSigmaSign)
        ? row.commonCouplingCoefficient * row.requiredSigmaSign
        : null;
    const predictedRowAmplitude =
      Number.isFinite(predictedRequiredCouplingCoefficient) &&
      Number.isFinite(rowAmplitudeDenominator) &&
      Math.abs(rowAmplitudeDenominator) >
        POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? predictedRequiredCouplingCoefficient / rowAmplitudeDenominator
        : null;
    const residual =
      Number.isFinite(row.requiredRowAmplitude) &&
      Number.isFinite(predictedRowAmplitude)
        ? row.requiredRowAmplitude - predictedRowAmplitude
        : null;
    return {
      rowId: row.rowId,
      pairKey: row.pairKey,
      side: row.side,
      continuityRole: row.continuityRole,
      endpointOwnership: row.endpointOwnership,
      leastNormBoundaryChargeCoefficient,
      pairDistance: row.pairDistance ?? null,
      predictedSignedDeltaEtaCandidate,
      deltaEtaGaussianAtGap: row.deltaEtaGaussianAtGap ?? null,
      predictedRequiredCouplingCoefficient,
      commonCouplingCoefficient: row.commonCouplingCoefficient ?? null,
      requiredSigmaSign: row.requiredSigmaSign ?? null,
      predictedRowAmplitude,
      requiredRowAmplitude: row.requiredRowAmplitude ?? null,
      residual,
      rowPass:
        Number.isFinite(residual) &&
        Math.abs(residual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  });
  const populatedRows = lawRows.filter((row) => Number.isFinite(row.residual));
  const maxAbsResidual = maxFinite(
    lawRows.map((row) =>
      Number.isFinite(row.residual) ? Math.abs(row.residual) : null
    )
  );
  const candidatePass =
    solve.pass === true &&
    routeLocalPolarityAccepted === true &&
    lawRows.length > 0 &&
    populatedRows.length === lawRows.length &&
    lawRows.every((row) => row.rowPass) &&
    Number.isFinite(solve.residualNorm) &&
    solve.residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    schema:
      "aaa-tri-binary-route-local-least-norm-boundary-charge-amplitude-law.v1",
    status: candidatePass
      ? "least_norm_boundary_charge_amplitude_law_reconstructs_rows"
      : solve.pass === true
        ? "least_norm_boundary_charge_amplitude_law_residual_or_polarity_blocked"
        : "least_norm_boundary_charge_amplitude_law_inputs_missing",
    claimLevel:
      "route-local conditional amplitude law derived from the least-norm side-split boundary-charge solve; not normalized wake-energy closure",
    acceptedRowAmplitudeLawPass: candidatePass,
    routeLocalPolarityAccepted: routeLocalPolarityAccepted === true,
    solveMethod: solve.method,
    targetCharge,
    reconstructedCharge: solve.reconstructed,
    targetResidualVector: solve.residualVector,
    targetResidualNorm: solve.residualNorm,
    normalMatrix: solve.normalMatrix,
    rowCount: lawRows.length,
    populatedRowCount: populatedRows.length,
    activeBasisRowCount: activeRows.length,
    maxAbsResidual,
    rows: lawRows,
    acceptanceScope:
      "accepted only for the route-local characteristic-tail amplitude rows and only conditional on the current target charge and polarity metadata",
    retainedLimitation:
      "This law supplies the missing non-tautological row amplitudes from the least-norm boundary-charge split. It still does not accept the normalized action-kernel charge, retained crossing-domain pullback, wake energy, or retained branch.",
  };
}

function createRouteLocalDeltaEtaIdentityAmplitudeTest(rows) {
  const rowTests = rows.map((row) => {
    const denominator =
      Number.isFinite(row.deltaEtaGaussianAtGap) &&
      Number.isFinite(row.commonCouplingCoefficient) &&
      Number.isFinite(row.requiredSigmaSign)
        ? row.deltaEtaGaussianAtGap *
          row.commonCouplingCoefficient *
          row.requiredSigmaSign
        : null;
    const predictedRowAmplitude =
      Number.isFinite(row.signedDeltaEtaCandidate) &&
      Number.isFinite(denominator) &&
      Math.abs(denominator) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? row.signedDeltaEtaCandidate / denominator
        : null;
    const residual =
      Number.isFinite(row.requiredRowAmplitude) &&
      Number.isFinite(predictedRowAmplitude)
        ? row.requiredRowAmplitude - predictedRowAmplitude
        : null;
    return {
      rowId: row.rowId,
      pairKey: row.pairKey,
      side: row.side,
      status:
        Number.isFinite(residual) &&
        Math.abs(residual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
          ? "delta_eta_identity_row_reconstructs_required_amplitude"
          : "delta_eta_identity_row_residual_or_inputs_missing",
      signedDeltaEtaCandidate: row.signedDeltaEtaCandidate ?? null,
      deltaEtaGaussianAtGap: row.deltaEtaGaussianAtGap ?? null,
      commonCouplingCoefficient: row.commonCouplingCoefficient ?? null,
      requiredSigmaSign: row.requiredSigmaSign ?? null,
      requiredRowAmplitude: row.requiredRowAmplitude ?? null,
      predictedRowAmplitude,
      residual,
      identityRowPass:
        Number.isFinite(residual) &&
        Math.abs(residual) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  });
  const populatedRows = rowTests.filter((row) =>
    Number.isFinite(row.residual)
  );
  const maxAbsResidual = maxFinite(
    rowTests.map((row) =>
      Number.isFinite(row.residual) ? Math.abs(row.residual) : null
    )
  );
  const identityPass =
    rowTests.length > 0 &&
    populatedRows.length === rowTests.length &&
    rowTests.every((row) => row.identityRowPass);

  return {
    status: identityPass
      ? "delta_eta_identity_reconstructs_required_row_amplitudes"
      : "delta_eta_identity_residual_or_inputs_missing",
    identityPass,
    acceptanceScope:
      "algebraic reconstruction only; not a non-tautological row-amplitude law",
    rowCount: rowTests.length,
    populatedRowCount: populatedRows.length,
    maxAbsResidual,
    rows: rowTests,
  };
}

function createRouteLocalRowAmplitudeGeometryLawCandidate({
  rows,
  featureKind,
  signKind,
}) {
  const candidateRows = rows.map((row) => {
    const featureValue = routeLocalRowAmplitudeFeatureValue(row, featureKind);
    const signValue = routeLocalRowAmplitudeSignValue(row, signKind);
    const predictor =
      Number.isFinite(featureValue) && Number.isFinite(signValue)
        ? featureValue * signValue
        : null;
    return {
      rowId: row.rowId,
      pairKey: row.pairKey,
      side: row.side,
      featureValue,
      signValue,
      predictor,
      requiredRowAmplitude: row.requiredRowAmplitude ?? null,
    };
  });
  const populatedRows = candidateRows.filter(
    (row) =>
      Number.isFinite(row.predictor) &&
      Number.isFinite(row.requiredRowAmplitude)
  );
  const normalDenominator = populatedRows.reduce(
    (sum, row) => sum + row.predictor * row.predictor,
    0
  );
  const scalar =
    normalDenominator > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? populatedRows.reduce(
          (sum, row) => sum + row.predictor * row.requiredRowAmplitude,
          0
        ) / normalDenominator
      : null;
  const projectedRows = candidateRows.map((row) => {
    const predictedRowAmplitude =
      Number.isFinite(row.predictor) && Number.isFinite(scalar)
        ? row.predictor * scalar
        : null;
    const residual =
      Number.isFinite(row.requiredRowAmplitude) &&
      Number.isFinite(predictedRowAmplitude)
        ? row.requiredRowAmplitude - predictedRowAmplitude
        : null;
    return {
      ...row,
      predictedRowAmplitude,
      residual,
    };
  });
  const maxAbsResidual = maxFinite(
    projectedRows.map((row) =>
      Number.isFinite(row.residual) ? Math.abs(row.residual) : null
    )
  );
  const candidatePopulated =
    projectedRows.length > 0 &&
    populatedRows.length === projectedRows.length &&
    Number.isFinite(scalar) &&
    Number.isFinite(maxAbsResidual);
  const geometryLawCandidatePass =
    candidatePopulated &&
    maxAbsResidual <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    lawId: `${featureKind}:${signKind}`,
    status: !candidatePopulated
      ? "geometry_amplitude_law_candidate_inputs_missing"
      : geometryLawCandidatePass
        ? "geometry_amplitude_law_candidate_reconstructs_rows"
        : "geometry_amplitude_law_candidate_rejected",
    featureKind,
    signKind,
    fitMode: "single_scalar_least_squares_no_intercept",
    candidatePopulated,
    geometryLawCandidatePass,
    scalar,
    rowCount: projectedRows.length,
    populatedRowCount: populatedRows.length,
    maxAbsResidual,
    rows: projectedRows,
  };
}

function routeLocalRowAmplitudeFeatureValue(row, featureKind) {
  const pairDistance = finiteOrNull(row.pairDistance);
  const routeWidth = finiteOrNull(row.minOneSidedRouteWidth);
  const unitAngularContributionNorm = finiteOrNull(
    row.unitAngularContributionNorm
  );
  switch (featureKind) {
    case "constant":
      return 1;
    case "pairDistance":
      return pairDistance;
    case "pairDistanceSquared":
      return pairDistance == null ? null : pairDistance * pairDistance;
    case "inversePairDistance":
      return pairDistance == null ||
        pairDistance <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? null
        : 1 / pairDistance;
    case "inversePairDistanceSquared":
      return pairDistance == null ||
        pairDistance <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? null
        : 1 / (pairDistance * pairDistance);
    case "routeWidth":
      return routeWidth;
    case "routeWidthOverPairDistance":
      return pairDistance == null ||
        pairDistance <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ||
        routeWidth == null
        ? null
        : routeWidth / pairDistance;
    case "routeWidthOverPairDistanceSquared":
      return pairDistance == null ||
        pairDistance <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ||
        routeWidth == null
        ? null
        : routeWidth / (pairDistance * pairDistance);
    case "pairDistanceOverRouteWidth":
      return routeWidth == null ||
        routeWidth <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ||
        pairDistance == null
        ? null
        : pairDistance / routeWidth;
    case "pairDistanceSquaredOverRouteWidth":
      return routeWidth == null ||
        routeWidth <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ||
        pairDistance == null
        ? null
        : (pairDistance * pairDistance) / routeWidth;
    case "unitAngularContributionNorm":
      return unitAngularContributionNorm;
    case "sqrtUnitAngularContributionNorm":
      return unitAngularContributionNorm == null ||
        unitAngularContributionNorm < 0
        ? null
        : Math.sqrt(unitAngularContributionNorm);
    default:
      return null;
  }
}

function routeLocalRowAmplitudeSignValue(row, signKind) {
  switch (signKind) {
    case "positive":
      return 1;
    case "angularOrientation":
      return Number.isFinite(row.unitAngularContributionZ) &&
        Math.abs(row.unitAngularContributionZ) >
          POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? -Math.sign(row.unitAngularContributionZ)
        : null;
    case "sideIncomingPositive":
      return row.side === "incoming" ? 1 : row.side === "outgoing" ? -1 : null;
    case "sideOutgoingPositive":
      return row.side === "outgoing" ? 1 : row.side === "incoming" ? -1 : null;
    case "sameSourcePositive":
      return row.continuityRole === "same_source"
        ? 1
        : row.continuityRole === "same_receiver"
          ? -1
          : null;
    case "sameReceiverPositive":
      return row.continuityRole === "same_receiver"
        ? 1
        : row.continuityRole === "same_source"
          ? -1
          : null;
    case "compensationPositive":
      return row.compensationRequired ? 1 : row.zeroSlackRoutePass ? -1 : null;
    case "zeroSlackPositive":
      return row.zeroSlackRoutePass ? 1 : row.compensationRequired ? -1 : null;
    case "sourceGradientPositive":
      return row.endpointOwnership === "source_gradient_opposite_receiver"
        ? 1
        : row.endpointOwnership === "receiver_gradient"
          ? -1
          : null;
    case "receiverGradientPositive":
      return row.endpointOwnership === "receiver_gradient"
        ? 1
        : row.endpointOwnership === "source_gradient_opposite_receiver"
          ? -1
          : null;
    default:
      return null;
  }
}

function createRouteLocalAmplitudeGroupTest({ groupKey, label, rows, keyFn }) {
  const groupsByKey = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, []);
    }
    groupsByKey.get(key).push(row);
  }
  const groups = [...groupsByKey.entries()].map(([key, groupRows]) => {
    const amplitudes = groupRows
      .map((row) => row.requiredRowAmplitude)
      .filter(Number.isFinite);
    const minAmplitude = minFinite(amplitudes);
    const maxAmplitude = maxFinite(amplitudes);
    const amplitudeSpan =
      Number.isFinite(minAmplitude) && Number.isFinite(maxAmplitude)
        ? maxAmplitude - minAmplitude
        : null;
    return {
      key,
      rowCount: groupRows.length,
      populatedRowCount: amplitudes.length,
      minAmplitude,
      maxAmplitude,
      amplitudeSpan,
      positiveAmplitudeCount: amplitudes.filter(
        (value) => value > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ).length,
      negativeAmplitudeCount: amplitudes.filter(
        (value) => value < -POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ).length,
      rowIds: groupRows.map((row) => row.rowId),
    };
  });
  const multiRowGroups = groups.filter((group) => group.rowCount > 1);
  const maxMultiRowAmplitudeSpan = maxFinite(
    multiRowGroups.map((group) => group.amplitudeSpan)
  );
  const simpleGroupAmplitudeLawPass =
    multiRowGroups.length > 0 &&
    multiRowGroups.every(
      (group) =>
        Number.isFinite(group.amplitudeSpan) &&
        group.amplitudeSpan <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
    );

  return {
    groupKey,
    label,
    status: simpleGroupAmplitudeLawPass
      ? "simple_group_amplitude_law_candidate_populated"
      : "simple_group_amplitude_law_rejected",
    simpleGroupAmplitudeLawPass,
    groupCount: groups.length,
    multiRowGroupCount: multiRowGroups.length,
    maxMultiRowAmplitudeSpan,
    groups,
  };
}

function createCharacteristicTailSingleCoefficientSignPatternSolve({
  radialConstrainedSolve,
  coefficientQuadratureRows,
}) {
  const targetCharge = radialConstrainedSolve?.targetCharge ?? null;
  const sideRows = radialConstrainedSolve?.rows ?? [];
  const basisRows = sideRows.map((row, index) =>
    createCharacteristicTailSingleCoefficientBasisRow({
      row,
      coefficientQuadratureRow: coefficientQuadratureRows[index] ?? null,
    })
  );
  const activeBasisRows = basisRows.filter((row) =>
    isFiniteVector(row.lawBasisAngularContribution)
  );
  if (!isFiniteVector(targetCharge) || activeBasisRows.length === 0) {
    return {
      schema:
        "aaa-tri-binary-characteristic-tail-single-coefficient-sign-pattern-solve.v1",
      status: "single_coefficient_sign_pattern_solve_missing_inputs",
      candidatePass: false,
      targetCharge,
      basisRowCount: basisRows.length,
      activeBasisRowCount: activeBasisRows.length,
      rows: basisRows,
    };
  }
  if (activeBasisRows.length > 12) {
    return {
      schema:
        "aaa-tri-binary-characteristic-tail-single-coefficient-sign-pattern-solve.v1",
      status: "single_coefficient_sign_pattern_solve_too_many_rows",
      candidatePass: false,
      targetCharge,
      basisRowCount: basisRows.length,
      activeBasisRowCount: activeBasisRows.length,
      rows: basisRows,
    };
  }

  let best = null;
  const patternCount = 1 << activeBasisRows.length;
  for (let mask = 0; mask < patternCount; mask += 1) {
    const signs = activeBasisRows.map((_, index) =>
      mask & (1 << index) ? 1 : -1
    );
    const signedBasisAngularContribution = activeBasisRows.reduce(
      (total, row, index) =>
        addVectors(
          total,
          scaleVector(row.lawBasisAngularContribution, signs[index])
        ),
      zeroVector()
    );
    const denominator = dotVectors(
      signedBasisAngularContribution,
      signedBasisAngularContribution
    );
    if (denominator <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ** 2) {
      continue;
    }
    const commonCouplingCoefficient =
      dotVectors(signedBasisAngularContribution, targetCharge) / denominator;
    if (
      !Number.isFinite(commonCouplingCoefficient) ||
      commonCouplingCoefficient <= 0
    ) {
      continue;
    }
    const reconstructedCharge = scaleVector(
      signedBasisAngularContribution,
      commonCouplingCoefficient
    );
    const targetResidualVector = subtractVectors(
      reconstructedCharge,
      targetCharge
    );
    const targetResidualNorm = vectorNorm(targetResidualVector);
    const candidate = {
      mask,
      signs,
      commonCouplingCoefficient,
      signedBasisAngularContribution,
      reconstructedCharge,
      targetResidualVector,
      targetResidualNorm,
    };
    if (
      !best ||
      candidate.targetResidualNorm < best.targetResidualNorm ||
      (candidate.targetResidualNorm === best.targetResidualNorm &&
        candidate.commonCouplingCoefficient < best.commonCouplingCoefficient)
    ) {
      best = candidate;
    }
  }

  const signByBasisRow = new Map(
    activeBasisRows.map((row, index) => [row, best?.signs[index] ?? null])
  );
  const commonCouplingCoefficient = best?.commonCouplingCoefficient ?? null;
  const rows = basisRows.map((row) =>
    createCharacteristicTailSingleCoefficientSolveRow({
      row,
      requiredSigmaSign: signByBasisRow.get(row) ?? null,
      commonCouplingCoefficient,
    })
  );
  const layerPolaritySignFeasibilityTarget =
    createLayerPolaritySignFeasibilityTarget(rows);
  const sourceReceiverPolarityRowBindingTarget =
    createSourceReceiverPolarityRowBindingTarget({
      rows,
      layerPolaritySignFeasibilityTarget,
    });
  const candidatePass =
    best != null &&
    best.targetResidualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
    rows.length > 0 &&
    rows.every(
      (row) =>
        row.targetPopulated &&
        Number.isFinite(row.requiredSigmaSign) &&
        Number.isFinite(row.commonCouplingCoefficient)
    );
  const layerPolaritySignFeasibilityPass =
    layerPolaritySignFeasibilityTarget?.candidatePass === true;
  const sourceReceiverPolarityRowBindingPass =
    sourceReceiverPolarityRowBindingTarget?.candidatePass === true;
  const routeDerivedSourceReceiverPolarityMetadataPass =
    sourceReceiverPolarityRowBindingTarget?.routeDerivedMetadataPass === true;
  const routeLocalPolarityAcceptancePass =
    sourceReceiverPolarityRowBindingTarget?.routeLocalPolarityAcceptanceTarget
      ?.acceptedSourceReceiverPolarityMetadataPass === true;

  return {
    schema:
      "aaa-tri-binary-characteristic-tail-single-coefficient-sign-pattern-solve.v1",
    status: candidatePass
      ? routeLocalPolarityAcceptancePass
        ? "single_coefficient_sign_pattern_candidate_route_local_polarity_metadata_accepted_boundary_charge_missing"
        : routeDerivedSourceReceiverPolarityMetadataPass
        ? "single_coefficient_sign_pattern_candidate_route_derived_source_receiver_polarity_metadata_populated_acceptance_missing"
        : sourceReceiverPolarityRowBindingPass
        ? "single_coefficient_sign_pattern_candidate_source_receiver_polarity_row_binding_populated_acceptance_missing"
        : layerPolaritySignFeasibilityPass
        ? "single_coefficient_sign_pattern_candidate_layer_polarity_assignment_populated_source_receiver_rows_missing"
        : "single_coefficient_sign_pattern_candidate_matches_target_polarity_rows_missing"
      : best
        ? "single_coefficient_sign_pattern_residual_exceeds_tolerance"
        : "single_coefficient_sign_pattern_no_positive_coefficient_pattern",
    claimLevel:
      "candidate single positive coupling coefficient with side sigma signs; not accepted until source/receiver polarity rows supply the same signs",
    candidatePass,
    acceptedSingleCoefficientSignPatternPass: false,
    targetCharge,
    reconstructedCharge: best?.reconstructedCharge ?? null,
    targetResidualVector: best?.targetResidualVector ?? null,
    targetResidualNorm: best?.targetResidualNorm ?? null,
    commonCouplingCoefficient,
    signPattern: best?.signs ?? null,
    patternCount,
    basisRowCount: basisRows.length,
    activeBasisRowCount: activeBasisRows.length,
    signedBasisAngularContribution:
      best?.signedBasisAngularContribution ?? null,
    layerPolaritySignFeasibilityTarget,
    sourceReceiverPolarityRowBindingTarget,
    rows,
    missingAcceptedFields: [
      routeLocalPolarityAcceptancePass
        ? null
        : "accepted_layer_polarity_sign_assignment",
      routeLocalPolarityAcceptancePass
        ? null
        : "accepted_source_receiver_polarity_sign_rows",
      "accepted_normalized_action_kernel_charge",
      "retained_crossing_domain_pullback",
      "wake_energy_increment",
    ].filter(Boolean),
    retainedLimitation:
      "This solve shows that the side rows can share one positive coupling magnitude and a feasible layer-polarity assignment if the listed sigma signs are supplied. It does not provide the accepted source/receiver polarity rows or wake-energy increment.",
  };
}

function createCharacteristicTailSingleCoefficientBasisRow({
  row,
  coefficientQuadratureRow,
}) {
  const pairDistance = row.pairDistance ?? coefficientQuadratureRow?.pairDistance ?? null;
  const deltaEtaGaussianAtGap =
    coefficientQuadratureRow?.deltaEtaGaussianAtGap ?? null;
  const deltaEtaOverR2 =
    Number.isFinite(deltaEtaGaussianAtGap) &&
    Number.isFinite(pairDistance) &&
    pairDistance > ROOT_TOLERANCE
      ? deltaEtaGaussianAtGap / (pairDistance * pairDistance)
      : null;
  const lawBasisAngularContribution =
    Number.isFinite(deltaEtaOverR2) && isFiniteVector(row.unitAngularContribution)
      ? scaleVector(row.unitAngularContribution, deltaEtaOverR2)
      : null;
  return {
    rowId: row.rowId,
    pairKey: row.pairKey,
    side: row.side,
    endpointOwnership: row.endpointOwnership,
    continuityRole: row.continuityRole ?? null,
    continuityLayer: row.continuityLayer ?? null,
    routeRootKey: row.routeRootKey ?? null,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
    endpointPairResidual: row.endpointPairResidual ?? null,
    endpointToChartResidual: row.endpointToChartResidual ?? null,
    requiredEndpointCompensationNorm:
      row.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: row.requiredClockRetune ?? null,
    requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
    intervalWidth: row.intervalWidth,
    pairDistance,
    deltaEtaGaussianAtGap,
    deltaEtaOverR2,
    unitAngularContribution: row.unitAngularContribution,
    lawBasisAngularContribution,
    targetPopulated: isFiniteVector(lawBasisAngularContribution),
  };
}

function createCharacteristicTailSingleCoefficientSolveRow({
  row,
  requiredSigmaSign,
  commonCouplingCoefficient,
}) {
  const signedDeltaEtaOverR2Candidate =
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(requiredSigmaSign) &&
    Number.isFinite(row.deltaEtaOverR2)
      ? commonCouplingCoefficient * requiredSigmaSign * row.deltaEtaOverR2
      : null;
  const signedDeltaEtaCandidate =
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(requiredSigmaSign) &&
    Number.isFinite(row.deltaEtaGaussianAtGap)
      ? commonCouplingCoefficient *
        requiredSigmaSign *
        row.deltaEtaGaussianAtGap
      : null;
  const reconstructedAngularContribution =
    Number.isFinite(commonCouplingCoefficient) &&
    Number.isFinite(requiredSigmaSign) &&
    isFiniteVector(row.lawBasisAngularContribution)
      ? scaleVector(
          row.lawBasisAngularContribution,
          commonCouplingCoefficient * requiredSigmaSign
        )
      : null;
  return {
    ...row,
    status:
      Number.isFinite(requiredSigmaSign) &&
      Number.isFinite(commonCouplingCoefficient) &&
      isFiniteVector(row.lawBasisAngularContribution)
        ? "single_coefficient_sign_pattern_row_populated_polarity_sign_unaccepted"
        : "single_coefficient_sign_pattern_row_missing",
    targetPopulated:
      Number.isFinite(requiredSigmaSign) &&
      Number.isFinite(commonCouplingCoefficient) &&
      isFiniteVector(row.lawBasisAngularContribution),
    requiredSigmaSign,
    commonCouplingCoefficient,
    signedDeltaEtaOverR2Candidate,
    signedDeltaEtaCandidate,
    reconstructedAngularContribution,
    reconstructedAngularContributionNorm: isFiniteVector(
      reconstructedAngularContribution
    )
      ? vectorNorm(reconstructedAngularContribution)
      : null,
  };
}

function createLayerPolaritySignFeasibilityTarget(rows) {
  const constraints = rows
    .map(createLayerPolaritySignConstraint)
    .filter((row) => row.targetPopulated);
  const layers = [
    ...new Set(
      constraints.flatMap((row) => [row.sourceLayer, row.receiverLayer])
    ),
  ].sort(compareLayerNames);

  if (constraints.length === 0 || layers.length === 0) {
    return {
      schema:
        "aaa-tri-binary-layer-polarity-sign-feasibility-target.v1",
      status: "layer_polarity_sign_feasibility_constraints_missing",
      candidatePass: false,
      acceptedLayerPolaritySignPass: false,
      layerCount: layers.length,
      constraintCount: constraints.length,
      layers,
      constraints,
    };
  }
  if (layers.length > 12) {
    return {
      schema:
        "aaa-tri-binary-layer-polarity-sign-feasibility-target.v1",
      status: "layer_polarity_sign_feasibility_too_many_layers",
      candidatePass: false,
      acceptedLayerPolaritySignPass: false,
      layerCount: layers.length,
      constraintCount: constraints.length,
      layers,
      constraints,
    };
  }

  const assignments = [];
  const assignmentCount = 1 << layers.length;
  for (let mask = 0; mask < assignmentCount; mask += 1) {
    const assignment = Object.fromEntries(
      layers.map((layer, index) => [
        layer,
        mask & (1 << index) ? 1 : -1,
      ])
    );
    if (
      constraints.every(
        (row) =>
          assignment[row.sourceLayer] * assignment[row.receiverLayer] ===
          row.requiredSigmaSign
      )
    ) {
      assignments.push(assignment);
    }
  }

  const canonicalAssignment =
    selectCanonicalLayerPolarityAssignment(assignments, layers);
  const rowsWithAssignment = constraints.map((row) =>
    projectLayerPolaritySignConstraint(row, canonicalAssignment)
  );
  const candidatePass =
    canonicalAssignment != null &&
    rowsWithAssignment.length === constraints.length &&
    rowsWithAssignment.every((row) => row.assignmentPass);

  return {
    schema:
      "aaa-tri-binary-layer-polarity-sign-feasibility-target.v1",
    status: candidatePass
      ? "layer_polarity_sign_assignment_candidate_populated_source_receiver_rows_missing"
      : "layer_polarity_sign_assignment_contradiction_rejects_sign_pattern",
    claimLevel:
      "candidate layer-level polarity assignment satisfying required sigma signs; not accepted source/receiver polarity rows",
    candidatePass,
    acceptedLayerPolaritySignPass: false,
    layerCount: layers.length,
    constraintCount: constraints.length,
    assignmentCount: assignments.length,
    globalInversionEquivalentAssignmentCount: assignments.length,
    canonicalAssignment,
    assignments,
    rows: rowsWithAssignment,
    missingAcceptedFields: [
      "accepted_layer_polarity_sign_assignment",
      "accepted_source_receiver_polarity_sign_rows",
    ],
    retainedLimitation:
      "This target reduces the row-wise sigma signs to layer-polarity constraints. It does not prove that the route rows carry accepted source and receiver polarities.",
  };
}

function createSourceReceiverPolarityRowBindingTarget({
  rows,
  layerPolaritySignFeasibilityTarget,
}) {
  const canonicalAssignment =
    layerPolaritySignFeasibilityTarget?.canonicalAssignment ?? null;
  const boundRows = rows.map((row) =>
    createSourceReceiverPolarityRowBinding({
      row,
      canonicalAssignment,
    })
  );
  const candidateRows = boundRows.filter((row) => row.targetPopulated);
  const acceptedRows = candidateRows.filter(
    (row) => row.acceptedSourceReceiverPolarityRowPass
  );
  const rowLocalSourceMetadataPresentCount = candidateRows.filter((row) =>
    Number.isFinite(row.sourceMetadataSign)
  ).length;
  const rowLocalReceiverMetadataPresentCount = candidateRows.filter((row) =>
    Number.isFinite(row.receiverMetadataSign)
  ).length;
  const routeDerivedMetadataTarget =
    createRouteDerivedSourceReceiverPolarityMetadataTarget({
      rows: candidateRows,
      canonicalAssignment,
    });
  const routeDerivedMetadataPass =
    routeDerivedMetadataTarget?.candidatePass === true;
  const routeLocalPolarityAcceptanceTarget =
    createRouteLocalPolarityAcceptanceTarget({
      routeDerivedMetadataTarget,
      layerPolaritySignFeasibilityTarget,
    });
  const routeLocalPolarityAcceptancePass =
    routeLocalPolarityAcceptanceTarget?.acceptedSourceReceiverPolarityMetadataPass ===
    true;
  const candidatePass =
    layerPolaritySignFeasibilityTarget?.candidatePass === true &&
    canonicalAssignment != null &&
    candidateRows.length > 0 &&
    candidateRows.length ===
      (layerPolaritySignFeasibilityTarget?.constraintCount ?? 0) &&
    candidateRows.every((row) => row.bindingPass);
  const acceptedSourceReceiverPolarityRowsPass =
    candidatePass &&
    acceptedRows.length > 0 &&
    acceptedRows.length === candidateRows.length;

  return {
    schema:
      "aaa-tri-binary-source-receiver-polarity-row-binding-target.v1",
    status: acceptedSourceReceiverPolarityRowsPass
      ? "source_receiver_polarity_rows_accepted"
      : routeLocalPolarityAcceptancePass
      ? "source_receiver_polarity_rows_route_local_metadata_accepted"
      : routeDerivedMetadataPass
      ? "source_receiver_polarity_row_binding_candidate_route_derived_metadata_populated_acceptance_pending"
      : candidatePass
      ? "source_receiver_polarity_row_binding_candidate_populated_acceptance_metadata_missing"
      : canonicalAssignment != null
        ? "source_receiver_polarity_row_binding_candidate_rejected"
        : "source_receiver_polarity_row_binding_layer_assignment_missing",
    claimLevel:
      "candidate row-level source/receiver polarity binding induced by the feasible layer-polarity assignment; not accepted route polarity metadata",
    candidatePass,
    acceptedSourceReceiverPolarityRowsPass,
    metadataStatus:
      acceptedSourceReceiverPolarityRowsPass
        ? "accepted_source_receiver_polarity_metadata_matches_candidate_assignment"
        : routeLocalPolarityAcceptancePass
          ? "accepted_route_local_source_receiver_polarity_metadata_matches_candidate_assignment"
        : routeDerivedMetadataPass
          ? "route_derived_source_receiver_polarity_metadata_matches_candidate_assignment"
        : rowLocalSourceMetadataPresentCount === 0 &&
            rowLocalReceiverMetadataPresentCount === 0
          ? "accepted_source_and_receiver_polarity_metadata_missing_from_characteristic_tail_rows"
          : rowLocalReceiverMetadataPresentCount === 0
            ? "accepted_receiver_polarity_metadata_missing_from_characteristic_tail_rows"
            : "accepted_source_receiver_polarity_metadata_incomplete_or_mismatched",
    layerAssignmentStatus:
      layerPolaritySignFeasibilityTarget?.status ?? null,
    candidateRowCount: candidateRows.length,
    acceptedRowCount: acceptedRows.length,
    missingAcceptedRowCount: candidateRows.length - acceptedRows.length,
    rowLocalSourceMetadataPresentCount,
    rowLocalReceiverMetadataPresentCount,
    routeDerivedMetadataPass,
    routeDerivedMetadataTarget,
    routeLocalPolarityAcceptanceTarget,
    canonicalAssignment,
    rows: boundRows,
    missingAcceptedFields: [
      "accepted_layer_polarity_sign_assignment",
      "accepted_source_receiver_polarity_sign_rows",
    ],
    retainedLimitation:
      routeLocalPolarityAcceptancePass
        ? "This target accepts the route-derived source and receiver polarity metadata for the route-local characteristic-tail rows only. It does not accept the normalized action-kernel charge, retained pullback, wake energy, or the full retained branch."
        : routeDerivedMetadataPass
        ? "This target binds each side row to source and receiver layer-polarity signs and derives route-local polarity metadata from endpoint ownership. It is still candidate-only until the layer-polarity assignment, action-kernel charge, retained pullback, and wake energy are accepted on the same event."
        : "This target binds each side row to source and receiver layer-polarity signs that reproduce the required sigma sign. The current characteristic-tail rows still do not carry accepted source or receiver polarity metadata, so the binding cannot accept source/receiver polarity rows.",
  };
}

function createRouteLocalPolarityAcceptanceTarget({
  routeDerivedMetadataTarget,
  layerPolaritySignFeasibilityTarget,
}) {
  const canonicalAssignment =
    layerPolaritySignFeasibilityTarget?.canonicalAssignment ?? null;
  const middlePositiveRepresentativePass =
    canonicalAssignment?.middle === 1;
  const rowCount = routeDerivedMetadataTarget?.rowCount ?? 0;
  const routeDerivedRowCount =
    routeDerivedMetadataTarget?.routeDerivedRowCount ?? 0;
  const routeTopologyPass =
    routeDerivedMetadataTarget?.candidatePass === true &&
    rowCount > 0 &&
    routeDerivedRowCount === rowCount &&
    routeDerivedMetadataTarget.sameSourceRowCount === 2 &&
    routeDerivedMetadataTarget.sameReceiverRowCount === 2;
  const acceptedLayerPolaritySignPass =
    layerPolaritySignFeasibilityTarget?.candidatePass === true &&
    middlePositiveRepresentativePass &&
    routeTopologyPass;
  const acceptedSourceReceiverPolarityMetadataPass =
    acceptedLayerPolaritySignPass &&
    routeDerivedMetadataTarget?.candidatePass === true;

  return {
    schema:
      "aaa-tri-binary-route-local-polarity-acceptance-target.v1",
    status: acceptedSourceReceiverPolarityMetadataPass
      ? "route_local_source_receiver_polarity_metadata_accepted"
      : routeDerivedMetadataTarget?.candidatePass === true
        ? "route_local_source_receiver_polarity_metadata_acceptance_blocked"
        : "route_local_source_receiver_polarity_metadata_acceptance_missing_inputs",
    claimLevel:
      "route-local acceptance of the middle-positive layer-polarity representative and its source/receiver metadata rows; not a full retained branch claim",
    acceptedLayerPolaritySignPass,
    acceptedSourceReceiverPolarityMetadataPass,
    acceptanceScope:
      "route-local characteristic-tail wake rows only; global inversion remains an equivalent convention and retainedBranchClaim remains false",
    middlePositiveRepresentativePass,
    routeTopologyPass,
    rowCount,
    routeDerivedRowCount,
    sameSourceRowCount: routeDerivedMetadataTarget?.sameSourceRowCount ?? 0,
    sameReceiverRowCount: routeDerivedMetadataTarget?.sameReceiverRowCount ?? 0,
    canonicalAssignment,
    rows: routeDerivedMetadataTarget?.rows ?? [],
    retainedLimitation:
      "This target consumes the route-derived polarity rows as accepted metadata for the route-local wake calculation. It does not accept the route geometry, normalized boundary charge, retained crossing-domain pullback, wake energy, or section stability.",
  };
}

function createRouteDerivedSourceReceiverPolarityMetadataTarget({
  rows,
  canonicalAssignment,
}) {
  const derivedRows = (rows ?? []).map((row) =>
    createRouteDerivedSourceReceiverPolarityMetadataRow({
      row,
      canonicalAssignment,
    })
  );
  const routeDerivedRows = derivedRows.filter(
    (row) => row.routeDerivedMetadataPass
  );
  const candidatePass =
    canonicalAssignment != null &&
    derivedRows.length > 0 &&
    routeDerivedRows.length === derivedRows.length;
  const sameSourceRowCount = derivedRows.filter(
    (row) => row.derivedContinuityRole === "same_source"
  ).length;
  const sameReceiverRowCount = derivedRows.filter(
    (row) => row.derivedContinuityRole === "same_receiver"
  ).length;

  return {
    schema:
      "aaa-tri-binary-route-derived-source-receiver-polarity-metadata-target.v1",
    status: candidatePass
      ? "route_derived_source_receiver_polarity_metadata_candidate_matches_binding"
      : canonicalAssignment != null
        ? "route_derived_source_receiver_polarity_metadata_candidate_rejected"
        : "route_derived_source_receiver_polarity_metadata_layer_assignment_missing",
    claimLevel:
      "route-derived source/receiver polarity metadata from branch-transport endpoint ownership and canonical layer-polarity assignment; not retained branch acceptance",
    candidatePass,
    acceptedSourceReceiverPolarityMetadataPass: false,
    rowCount: derivedRows.length,
    routeDerivedRowCount: routeDerivedRows.length,
    sameSourceRowCount,
    sameReceiverRowCount,
    canonicalAssignment,
    rows: derivedRows,
    retainedLimitation:
      "This target is independent of sampled phase-at-hit metadata. It derives source and receiver signs from the route-local endpoint ownership rows, but it inherits the candidate-only status of the compensated route and layer-polarity assignment.",
  };
}

function createRouteDerivedSourceReceiverPolarityMetadataRow({
  row,
  canonicalAssignment,
}) {
  const derivedContinuityRole =
    row.endpointOwnership === "source_gradient_opposite_receiver"
      ? "same_source"
      : row.endpointOwnership === "receiver_gradient"
        ? "same_receiver"
        : null;
  const derivedContinuityLayer =
    derivedContinuityRole === "same_source"
      ? row.sourceLayer
      : derivedContinuityRole === "same_receiver"
        ? row.receiverLayer
        : null;
  const oppositeLayer =
    derivedContinuityRole === "same_source"
      ? row.receiverLayer
      : derivedContinuityRole === "same_receiver"
        ? row.sourceLayer
        : null;
  const routeTopologyPass =
    derivedContinuityLayer === "middle" &&
    (oppositeLayer === "outer" || oppositeLayer === "inner") &&
    (row.side === "incoming" || row.side === "outgoing");
  const derivedSourceMetadataSign = canonicalAssignment?.[row.sourceLayer] ?? null;
  const derivedReceiverMetadataSign =
    canonicalAssignment?.[row.receiverLayer] ?? null;
  const derivedSigmaSign =
    Number.isFinite(derivedSourceMetadataSign) &&
    Number.isFinite(derivedReceiverMetadataSign)
      ? derivedSourceMetadataSign * derivedReceiverMetadataSign
      : null;
  const routeDerivedMetadataPass =
    row.bindingPass === true &&
    routeTopologyPass &&
    derivedSigmaSign === row.requiredSigmaSign &&
    derivedSourceMetadataSign === row.sourceLayerSign &&
    derivedReceiverMetadataSign === row.receiverLayerSign;

  return {
    rowId: row.rowId,
    pairKey: row.pairKey,
    side: row.side,
    endpointOwnership: row.endpointOwnership,
    status: routeDerivedMetadataPass
      ? "route_derived_source_receiver_polarity_metadata_row_matches_binding"
      : "route_derived_source_receiver_polarity_metadata_row_rejected",
    sourceLayer: row.sourceLayer,
    receiverLayer: row.receiverLayer,
    derivedContinuityRole,
    derivedContinuityLayer,
    oppositeLayer,
    routeTopologyPass,
    sourceLayerSign: row.sourceLayerSign,
    receiverLayerSign: row.receiverLayerSign,
    derivedSourceMetadataSign,
    derivedReceiverMetadataSign,
    requiredSigmaSign: row.requiredSigmaSign,
    derivedSigmaSign,
    routeDerivedMetadataPass,
  };
}

function createSourceReceiverPolarityRowBinding({
  row,
  canonicalAssignment,
}) {
  const [sourceLayer, receiverLayer] = String(row.pairKey ?? "").split("->");
  const requiredSigmaSign = row.requiredSigmaSign;
  const sourceLayerSign = canonicalAssignment?.[sourceLayer] ?? null;
  const receiverLayerSign = canonicalAssignment?.[receiverLayer] ?? null;
  const reconstructedSigmaSign =
    Number.isFinite(sourceLayerSign) && Number.isFinite(receiverLayerSign)
      ? sourceLayerSign * receiverLayerSign
      : null;
  const sourceMetadataSign = normalizePolarityMetadataSign(
    row.sourceChargeSign
  );
  const receiverMetadataSign = normalizePolarityMetadataSign(
    row.receiverChargeSign
  );
  const targetPopulated =
    Boolean(sourceLayer && receiverLayer) &&
    Number.isFinite(requiredSigmaSign) &&
    Math.abs(requiredSigmaSign) === 1 &&
    Number.isFinite(reconstructedSigmaSign);
  const bindingPass =
    targetPopulated && reconstructedSigmaSign === requiredSigmaSign;
  const acceptedSourceReceiverPolarityRowPass =
    bindingPass &&
    sourceMetadataSign === sourceLayerSign &&
    receiverMetadataSign === receiverLayerSign;

  return {
    rowId: row.rowId,
    pairKey: row.pairKey,
    side: row.side,
    endpointOwnership: row.endpointOwnership,
    status: acceptedSourceReceiverPolarityRowPass
      ? "source_receiver_polarity_row_accepted"
      : bindingPass
        ? "source_receiver_polarity_row_binding_candidate_metadata_missing"
        : "source_receiver_polarity_row_binding_rejected",
    sourceLayer: sourceLayer || null,
    receiverLayer: receiverLayer || null,
    sourceLayerSign,
    receiverLayerSign,
    requiredSigmaSign,
    reconstructedSigmaSign,
    sourceMetadataSign,
    receiverMetadataSign,
    targetPopulated,
    bindingPass,
    acceptedSourceReceiverPolarityRowPass,
    metadataPass:
      sourceMetadataSign === sourceLayerSign &&
      receiverMetadataSign === receiverLayerSign,
    metadataLimitation:
      sourceMetadataSign == null && receiverMetadataSign == null
        ? "accepted source and receiver polarity signs missing on this characteristic-tail row"
        : sourceMetadataSign == null
          ? "accepted source polarity sign missing on this characteristic-tail row"
          : receiverMetadataSign == null
            ? "accepted receiver polarity sign missing on this characteristic-tail row"
            : null,
  };
}

function normalizePolarityMetadataSign(value) {
  return Number.isFinite(value) && Math.abs(value) === 1 ? value : null;
}

function createLayerPolaritySignConstraint(row) {
  const [sourceLayer, receiverLayer] = String(row.pairKey ?? "").split("->");
  const requiredSigmaSign = row.requiredSigmaSign;
  const targetPopulated =
    sourceLayer &&
    receiverLayer &&
    Number.isFinite(requiredSigmaSign) &&
    Math.abs(requiredSigmaSign) === 1;
  return {
    rowId: row.rowId,
    pairKey: row.pairKey,
    side: row.side,
    endpointOwnership: row.endpointOwnership,
    sourceLayer: sourceLayer || null,
    receiverLayer: receiverLayer || null,
    requiredSigmaSign,
    targetPopulated,
  };
}

function projectLayerPolaritySignConstraint(row, assignment) {
  const sourceLayerSign = assignment?.[row.sourceLayer] ?? null;
  const receiverLayerSign = assignment?.[row.receiverLayer] ?? null;
  const reconstructedSigmaSign =
    Number.isFinite(sourceLayerSign) && Number.isFinite(receiverLayerSign)
      ? sourceLayerSign * receiverLayerSign
      : null;
  const assignmentPass =
    reconstructedSigmaSign === row.requiredSigmaSign;
  return {
    ...row,
    status: assignmentPass
      ? "layer_polarity_sign_constraint_satisfied_candidate_only"
      : "layer_polarity_sign_constraint_unsatisfied",
    sourceLayerSign,
    receiverLayerSign,
    reconstructedSigmaSign,
    assignmentPass,
  };
}

function selectCanonicalLayerPolarityAssignment(assignments, layers) {
  if (assignments.length === 0) {
    return null;
  }
  const preferredLayer = layers.includes("middle") ? "middle" : layers[0];
  return (
    assignments.find((assignment) => assignment[preferredLayer] === 1) ??
    assignments[0]
  );
}

function compareLayerNames(left, right) {
  const ranks = { outer: 0, middle: 1, inner: 2 };
  return (ranks[left] ?? 99) - (ranks[right] ?? 99) || left.localeCompare(right);
}

function createCharacteristicTailCoefficientQuadratureRow({ row, etaValue }) {
  const geometry = row.pairEndpointGeometry ?? null;
  const hitTime = geometry?.hitTime ?? null;
  const emissionTime = geometry?.emissionTime ?? null;
  const pairDistance = geometry?.pairDistance ?? row.pairDistance ?? null;
  const causalDelay =
    Number.isFinite(pairDistance) && FIELD_SPEED > 0
      ? pairDistance / FIELD_SPEED
      : null;
  const causalGap =
    Number.isFinite(hitTime) &&
    Number.isFinite(emissionTime) &&
    Number.isFinite(causalDelay)
      ? hitTime - emissionTime - causalDelay
      : null;
  const deltaEtaGaussianAtGap = evaluateGaussianDeltaEta({
    gap: causalGap,
    eta: etaValue,
  });
  const signedDeltaEtaCandidate = row.signedDeltaEtaCandidate ?? null;
  const requiredCouplingCoefficient =
    Number.isFinite(signedDeltaEtaCandidate) &&
    Number.isFinite(deltaEtaGaussianAtGap) &&
    Math.abs(deltaEtaGaussianAtGap) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
      ? signedDeltaEtaCandidate / deltaEtaGaussianAtGap
      : null;
  const reconstructedSignedDeltaEtaCandidate =
    Number.isFinite(requiredCouplingCoefficient) &&
    Number.isFinite(deltaEtaGaussianAtGap)
      ? requiredCouplingCoefficient * deltaEtaGaussianAtGap
      : null;
  const coefficientResidual =
    Number.isFinite(signedDeltaEtaCandidate) &&
    Number.isFinite(reconstructedSignedDeltaEtaCandidate)
      ? signedDeltaEtaCandidate - reconstructedSignedDeltaEtaCandidate
      : null;
  const targetPopulated =
    Number.isFinite(etaValue) &&
    etaValue > 0 &&
    Number.isFinite(causalGap) &&
    Number.isFinite(deltaEtaGaussianAtGap) &&
    Number.isFinite(signedDeltaEtaCandidate) &&
    Number.isFinite(requiredCouplingCoefficient);

  return {
    rowId: `${row.rowId}:${row.side}:coefficient-quadrature`,
    status: !Number.isFinite(etaValue) || etaValue <= 0
      ? "characteristic_tail_coefficient_quadrature_row_eta_missing"
      : !Number.isFinite(causalGap)
        ? "characteristic_tail_coefficient_quadrature_row_causal_gap_missing"
        : !Number.isFinite(signedDeltaEtaCandidate)
          ? "characteristic_tail_coefficient_quadrature_row_signed_delta_eta_missing"
          : targetPopulated
            ? "characteristic_tail_coefficient_quadrature_row_populated_coupling_unaccepted"
            : "characteristic_tail_coefficient_quadrature_row_missing",
    targetPopulated,
    pairKey: row.pairKey,
    side: row.side,
    endpointOwnership: row.endpointOwnership,
    continuityRole: row.continuityRole ?? null,
    continuityLayer: row.continuityLayer ?? null,
    routeRootKey: row.routeRootKey ?? null,
    zeroSlackRoutePass: row.zeroSlackRoutePass === true,
    compensationRequired: row.compensationRequired === true,
    minOneSidedRouteWidth: row.minOneSidedRouteWidth ?? null,
    endpointPairResidual: row.endpointPairResidual ?? null,
    endpointToChartResidual: row.endpointToChartResidual ?? null,
    requiredEndpointCompensationNorm:
      row.requiredEndpointCompensationNorm ?? null,
    requiredClockRetune: row.requiredClockRetune ?? null,
    requiredPhaseCompensation: row.requiredPhaseCompensation ?? null,
    intervalWidth: row.intervalWidth,
    pairDistance,
    hitTime,
    emissionTime,
    fieldSpeed: FIELD_SPEED,
    causalDelay,
    causalGap,
    causalGapAbs: Number.isFinite(causalGap) ? Math.abs(causalGap) : null,
    onCharacteristicPass:
      Number.isFinite(causalGap) &&
      Math.abs(causalGap) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    eta: etaValue,
    deltaEtaConvention:
      "delta_eta(g)=exp(-g^2/(2 eta^2))/(sqrt(2 pi) eta)",
    deltaEtaGaussianAtGap,
    signedDeltaEtaCandidate,
    requiredCouplingCoefficient,
    reconstructedSignedDeltaEtaCandidate,
    coefficientResidual,
    retainedLimitation:
      "The required coupling coefficient is the scalar that would multiply the Gaussian delta_eta(g) value to reproduce the side-split signed delta_eta candidate. It is not accepted without polarity/sign and wake-energy support.",
  };
}

function evaluateGaussianDeltaEta({ gap, eta }) {
  if (!Number.isFinite(gap) || !Number.isFinite(eta) || eta <= 0) {
    return null;
  }
  return Math.exp(-(gap * gap) / (2 * eta * eta)) /
    (Math.sqrt(2 * Math.PI) * eta);
}

function solveLeastNormVectorCombination({ columns, target }) {
  if (!isFiniteVector(target) || columns.length === 0) {
    return {
      status: "least_norm_vector_combination_missing_inputs",
      method: null,
      pass: false,
      coefficients: [],
      target,
      reconstructed: null,
      residualVector: null,
      residualNorm: null,
      normalMatrix: null,
    };
  }
  const normalMatrix = createColumnNormalMatrix(columns);
  const inverseNormalMatrix = invert3x3(normalMatrix);
  if (inverseNormalMatrix) {
    const multiplier = multiplyMatrixVector(inverseNormalMatrix, target);
    const coefficients = columns.map((column) => dotVectors(column, multiplier));
    return finalizeVectorCombinationSolve({
      method: "full_rank_normal_matrix",
      columns,
      coefficients,
      target,
      normalMatrix,
    });
  }
  const axisSolve = solveAxisAlignedLeastNormVectorCombination({
    columns,
    target,
    normalMatrix,
  });
  if (axisSolve) {
    return axisSolve;
  }
  return {
    status: "least_norm_vector_combination_rank_deficient",
    method: "rank_deficient",
    pass: false,
    coefficients: [],
    target,
    reconstructed: null,
    residualVector: null,
    residualNorm: null,
    normalMatrix,
  };
}

function createColumnNormalMatrix(columns) {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (const column of columns) {
    matrix[0][0] += column.x * column.x;
    matrix[0][1] += column.x * column.y;
    matrix[0][2] += column.x * column.z;
    matrix[1][0] += column.y * column.x;
    matrix[1][1] += column.y * column.y;
    matrix[1][2] += column.y * column.z;
    matrix[2][0] += column.z * column.x;
    matrix[2][1] += column.z * column.y;
    matrix[2][2] += column.z * column.z;
  }
  return matrix;
}

function solveAxisAlignedLeastNormVectorCombination({
  columns,
  target,
  normalMatrix,
}) {
  for (const axis of ["x", "y", "z"]) {
    const otherAxes = ["x", "y", "z"].filter((candidate) => candidate !== axis);
    const offAxisColumnMax = maxFinite(
      columns.flatMap((column) => otherAxes.map((otherAxis) => Math.abs(column[otherAxis])))
    );
    const offAxisTargetNorm = Math.hypot(
      ...otherAxes.map((otherAxis) => target[otherAxis])
    );
    const denominator = columns.reduce(
      (sum, column) => sum + column[axis] * column[axis],
      0
    );
    if (
      (offAxisColumnMax ?? 0) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
      offAxisTargetNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE &&
      denominator > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
    ) {
      const coefficients = columns.map(
        (column) => (column[axis] * target[axis]) / denominator
      );
      return finalizeVectorCombinationSolve({
        method: `axis_aligned_${axis}_least_norm`,
        columns,
        coefficients,
        target,
        normalMatrix,
      });
    }
  }
  return null;
}

function finalizeVectorCombinationSolve({
  method,
  columns,
  coefficients,
  target,
  normalMatrix,
}) {
  const reconstructed = columns.reduce(
    (total, column, index) =>
      addVectors(total, scaleVector(column, coefficients[index] ?? 0)),
    zeroVector()
  );
  const residualVector = subtractVectors(reconstructed, target);
  const residualNorm = vectorNorm(residualVector);
  return {
    status:
      residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE
        ? "least_norm_vector_combination_matches_target"
        : "least_norm_vector_combination_residual_exceeds_tolerance",
    method,
    pass: residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    coefficients,
    target,
    reconstructed,
    residualVector,
    residualNorm,
    normalMatrix,
  };
}

function createAngularMomentNormalMatrix(routeRows) {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (const row of routeRows) {
    const r = row.leverArm;
    const normSquared = r.x * r.x + r.y * r.y + r.z * r.z;
    matrix[0][0] += normSquared - r.x * r.x;
    matrix[0][1] += -r.x * r.y;
    matrix[0][2] += -r.x * r.z;
    matrix[1][0] += -r.y * r.x;
    matrix[1][1] += normSquared - r.y * r.y;
    matrix[1][2] += -r.y * r.z;
    matrix[2][0] += -r.z * r.x;
    matrix[2][1] += -r.z * r.y;
    matrix[2][2] += normSquared - r.z * r.z;
  }
  return matrix;
}

function invert3x3(matrix) {
  const [
    [a, b, c],
    [d, e, f],
    [g, h, i],
  ] = matrix;
  const cofactor00 = e * i - f * h;
  const cofactor01 = -(d * i - f * g);
  const cofactor02 = d * h - e * g;
  const cofactor10 = -(b * i - c * h);
  const cofactor11 = a * i - c * g;
  const cofactor12 = -(a * h - b * g);
  const cofactor20 = b * f - c * e;
  const cofactor21 = -(a * f - c * d);
  const cofactor22 = a * e - b * d;
  const determinant = a * cofactor00 + b * cofactor01 + c * cofactor02;
  if (!Number.isFinite(determinant) || Math.abs(determinant) <= 1e-18) {
    return null;
  }
  const scale = 1 / determinant;
  return [
    [cofactor00 * scale, cofactor10 * scale, cofactor20 * scale],
    [cofactor01 * scale, cofactor11 * scale, cofactor21 * scale],
    [cofactor02 * scale, cofactor12 * scale, cofactor22 * scale],
  ];
}

function multiplyMatrixVector(matrix, vector) {
  return {
    x: matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
    y: matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
    z: matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z,
  };
}

function rowRouteView(routeRow) {
  return {
    candidateRoutePass: routeRow.candidateRoutePass,
    zeroSlackRoutePass: routeRow.zeroSlackRoutePass,
    compensationRequired: routeRow.compensationRequired,
    routeRootKey: routeRow.routeRootKey ?? null,
    endpointPairResidual: routeRow.endpointPairResidual ?? null,
    endpointToChartResidual: routeRow.endpointToChartResidual ?? null,
    endpointPairResidualVector: routeRow.endpointPairResidualVector ?? null,
    incomingPoint: routeRow.incomingPoint ?? null,
    outgoingPoint: routeRow.outgoingPoint ?? null,
    incomingPairEndpointGeometry: routeRow.incomingPairEndpointGeometry ?? null,
    outgoingPairEndpointGeometry: routeRow.outgoingPairEndpointGeometry ?? null,
    continuityPointKind: routeRow.continuityPointKind ?? null,
    continuityRole: routeRow.continuityRole ?? null,
    continuityLayer: routeRow.continuityLayer ?? null,
    continuityAngularVelocity: routeRow.continuityAngularVelocity ?? null,
    requiredEndpointCompensationNorm: routeRow.requiredEndpointCompensationNorm ?? 0,
    requiredClockRetune: routeRow.requiredClockRetune ?? 0,
    requiredPhaseCompensation: routeRow.requiredPhaseCompensation ?? 0,
    minOneSidedRouteWidth: routeRow.minOneSidedRouteWidth ?? null,
  };
}

function createRootEnergyIncrementDiagnostic(routeRow) {
  if (routeRow.candidateRoutePass !== true) {
    return {
      status: "root_energy_increment_route_candidate_missing",
      claimLevel:
        "unit-action diagnostic for root-energy phase increment; not retained energy routing",
      rootEnergyIncrementPass: false,
      routeRootKey: routeRow.routeRootKey ?? null,
    };
  }

  const phaseMagnitude = finiteOrNull(routeRow.requiredPhaseCompensation) ?? 0;
  const clockRetuneMagnitude = finiteOrNull(routeRow.requiredClockRetune) ?? 0;
  const angularVelocityMagnitude = finiteOrNull(
    Math.abs(routeRow.continuityAngularVelocity)
  );
  const unitActionRootEnergyIncrement =
    angularVelocityMagnitude != null
      ? Math.abs(angularVelocityMagnitude * clockRetuneMagnitude)
      : phaseMagnitude;
  const rootEnergyIncrementPass =
    Number.isFinite(unitActionRootEnergyIncrement) && Number.isFinite(phaseMagnitude);

  return {
    status: rootEnergyIncrementPass
      ? routeRow.zeroSlackRoutePass
        ? "zero_unit_action_root_energy_increment_diagnostic_populated"
        : "bounded_unit_action_root_energy_increment_diagnostic_populated"
      : "root_energy_increment_diagnostic_missing",
    claimLevel:
      "unit-action diagnostic for root-energy phase increment; not retained energy routing",
    rootEnergyIncrementPass,
    coefficientConvention:
      "The diagnostic treats action weight as one and converts the middle-continuity clock retune into a local phase/energy increment, Delta E_root^unit = |omega_continuity Delta t_clock|. It does not assign wake energy, recoil energy, or a retained transaction frequency.",
    routeRootKey: routeRow.routeRootKey ?? null,
    continuityRole: routeRow.continuityRole ?? null,
    continuityLayer: routeRow.continuityLayer ?? null,
    continuityAngularVelocity: routeRow.continuityAngularVelocity ?? null,
    clockRetuneMagnitude,
    phaseMagnitude,
    unitActionRootEnergyIncrement,
    retainedLimitation:
      "This row closes the coefficient-free root-energy phase inventory for the route. It still lacks retained energy routing on the same event.",
  };
}

function createRecoilChannelDataDiagnostic({
  routeRow,
  transportAngularMomentumIncrement,
  rootEnergyIncrement,
}) {
  if (routeRow.candidateRoutePass !== true) {
    return {
      status: "recoil_channel_route_candidate_missing",
      claimLevel:
        "unit-balance diagnostic for route recoil channel data; not physical wake, material, or Noether sea recoil",
      recoilChannelPass: false,
      routeRootKey: routeRow.routeRootKey ?? null,
    };
  }
  if (transportAngularMomentumIncrement.transportAngularMomentumPass !== true) {
    return {
      status: "recoil_channel_transport_increment_missing",
      claimLevel:
        "unit-balance diagnostic for route recoil channel data; not physical wake, material, or Noether sea recoil",
      recoilChannelPass: false,
      routeRootKey: routeRow.routeRootKey ?? null,
    };
  }
  if (rootEnergyIncrement.rootEnergyIncrementPass !== true) {
    return {
      status: "recoil_channel_root_energy_increment_missing",
      claimLevel:
        "unit-balance diagnostic for route recoil channel data; not physical wake, material, or Noether sea recoil",
      recoilChannelPass: false,
      routeRootKey: routeRow.routeRootKey ?? null,
    };
  }

  const unitTransportAngularMomentum =
    transportAngularMomentumIncrement.unitEndpointPairAngularMomentum;
  const unitRecoilAngularMomentum = isFiniteVector(unitTransportAngularMomentum)
    ? scaleVector(unitTransportAngularMomentum, -1)
    : null;
  const unitRootEnergyIncrement =
    finiteOrNull(rootEnergyIncrement.unitActionRootEnergyIncrement) ?? null;
  const recoilChannelPass =
    isFiniteVector(unitRecoilAngularMomentum) && unitRootEnergyIncrement != null;

  return {
    status: recoilChannelPass
      ? routeRow.zeroSlackRoutePass
        ? "zero_unit_recoil_channel_diagnostic_populated"
        : "bounded_unit_recoil_channel_diagnostic_populated"
      : "recoil_channel_diagnostic_missing",
    claimLevel:
      "unit-balance diagnostic for route recoil channel data; not physical wake, material, or Noether sea recoil",
    recoilChannelPass,
    balanceConvention:
      "The recoil channel is the opposite unit angular-momentum balance vector for the route transport increment, Delta J_recoil^unit = -Delta J_transport^unit, carried with the unit root-energy scale for the same route root.",
    routeRootKey: routeRow.routeRootKey ?? null,
    continuityRole: routeRow.continuityRole ?? null,
    continuityLayer: routeRow.continuityLayer ?? null,
    unitTransportAngularMomentum,
    unitTransportAngularMomentumNorm:
      transportAngularMomentumIncrement.unitEndpointPairAngularMomentumNorm ?? null,
    unitRecoilAngularMomentum,
    unitRecoilAngularMomentumNorm: unitRecoilAngularMomentum
      ? vectorNorm(unitRecoilAngularMomentum)
      : null,
    unitRootEnergyIncrement,
    retainedLimitation:
      "This row records the minimal same-route recoil balance target only. It does not choose a physical source, material, wake, or Noether sea recoil carrier and does not close retained force, torque, wake, partition, or stability rows.",
  };
}

function createTransportAngularMomentumIncrementDiagnostic(routeRow) {
  if (routeRow.candidateRoutePass !== true) {
    return {
      status: "transport_angular_momentum_route_candidate_missing",
      claimLevel:
        "unit-coefficient diagnostic for branch-route transport angular momentum; not retained angular-momentum conservation",
      transportAngularMomentumPass: false,
      routeRootKey: routeRow.routeRootKey ?? null,
    };
  }

  const compensationVector = isFiniteVector(routeRow.endpointPairResidualVector)
    ? routeRow.endpointPairResidualVector
    : zeroVector();
  const leverArm =
    isFiniteVector(routeRow.incomingPoint) && isFiniteVector(routeRow.outgoingPoint)
      ? scaleVector(addVectors(routeRow.incomingPoint, routeRow.outgoingPoint), 0.5)
      : isFiniteVector(routeRow.incomingPoint)
        ? routeRow.incomingPoint
        : isFiniteVector(routeRow.outgoingPoint)
          ? routeRow.outgoingPoint
          : null;
  const unitEndpointPairAngularMomentum =
    leverArm && compensationVector ? crossVectors(leverArm, compensationVector) : null;
  const endpointPointNormUpperBound = maxFinite(
    [routeRow.incomingPoint, routeRow.outgoingPoint]
      .filter(isFiniteVector)
      .map((point) => vectorNorm(point))
  );
  const compensationNormUpperBound =
    finiteOrNull(routeRow.requiredEndpointCompensationNorm) ??
    finiteOrNull(routeRow.endpointPairResidual) ??
    0;
  const unitAngularMomentumNormUpperBound =
    endpointPointNormUpperBound != null && compensationNormUpperBound != null
      ? endpointPointNormUpperBound * compensationNormUpperBound
      : null;
  const transportAngularMomentumPass =
    unitEndpointPairAngularMomentum != null &&
    Number.isFinite(unitAngularMomentumNormUpperBound);

  return {
    status: transportAngularMomentumPass
      ? routeRow.zeroSlackRoutePass
        ? "zero_unit_transport_angular_momentum_diagnostic_populated"
        : "bounded_unit_transport_angular_momentum_diagnostic_populated"
      : "transport_angular_momentum_diagnostic_missing",
    claimLevel:
      "unit-coefficient diagnostic for branch-route transport angular momentum; not retained angular-momentum conservation",
    transportAngularMomentumPass,
    coefficientConvention:
      "The endpoint-pair compensation vector is treated as a unit transport impulse. The diagnostic increment is r_mid x delta_p_unit, with a norm upper bound from the larger endpoint or hinge-chart compensation norm.",
    routeRootKey: routeRow.routeRootKey ?? null,
    continuityRole: routeRow.continuityRole ?? null,
    continuityLayer: routeRow.continuityLayer ?? null,
    continuityPointKind: routeRow.continuityPointKind ?? null,
    endpointPairCompensationVector: compensationVector,
    endpointPairCompensationNorm: routeRow.endpointPairResidual ?? null,
    endpointCompensationNormUpperBound: compensationNormUpperBound,
    leverArm,
    endpointPointNormUpperBound,
    unitEndpointPairAngularMomentum,
    unitEndpointPairAngularMomentumNorm: unitEndpointPairAngularMomentum
      ? vectorNorm(unitEndpointPairAngularMomentum)
      : null,
    unitAngularMomentumNormUpperBound,
    retainedLimitation:
      "This row measures the angular-momentum size of the route compensation under a unit impulse convention. It still lacks retained force, torque, wake, partition, and stability evaluation on the same event.",
  };
}

function createBoundedUndeclaredRouteSlack(routeRow) {
  const geometricUpperBound = finiteOrNull(routeRow.requiredEndpointCompensationNorm) ?? 0;
  const clockRetuneUpperBound = finiteOrNull(routeRow.requiredClockRetune) ?? 0;
  const phaseUpperBound = finiteOrNull(routeRow.requiredPhaseCompensation) ?? 0;
  const boundedSlackPass =
    routeRow.candidateRoutePass === true &&
    Number.isFinite(geometricUpperBound) &&
    Number.isFinite(clockRetuneUpperBound) &&
    Number.isFinite(phaseUpperBound);

  return {
    status: !routeRow.candidateRoutePass
      ? "bounded_route_slack_route_candidate_missing"
      : boundedSlackPass
        ? routeRow.compensationRequired
          ? "bounded_positive_route_slack_diagnostic_populated"
          : "bounded_zero_route_slack_diagnostic_populated"
        : "bounded_route_slack_diagnostic_missing",
    claimLevel:
      "diagnostic bound on route slack induced by the branch-transport continuity residuals; not a physical recoil or energy route",
    boundedSlackPass,
    boundConvention:
      "The bound records the solver-measured endpoint, hinge-chart, clock, and wrapped-phase residuals for the candidate route. It closes the numerical slack inventory only; it does not assign a physical transport, root-energy, or recoil law.",
    routeRootKey: routeRow.routeRootKey ?? null,
    minOneSidedRouteWidth: routeRow.minOneSidedRouteWidth ?? null,
    geometricUpperBound,
    endpointPairResidual: routeRow.endpointPairResidual ?? null,
    endpointToChartResidual: routeRow.endpointToChartResidual ?? null,
    clockRetuneUpperBound,
    phaseUpperBound,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
  };
}

function createHingeRootBranchTransportRouteRow({ match, rowsByPairKey, hingeTime }) {
  const incomingRow = rowsByPairKey.get(match.incomingPairKey) ?? null;
  const outgoingRow = rowsByPairKey.get(match.outgoingPairKey) ?? null;
  const incomingLeftCoverage = createRootSideIntervalCoverage({
    row: incomingRow,
    hingeTime,
    side: "left",
  });
  const outgoingRightCoverage = createRootSideIntervalCoverage({
    row: outgoingRow,
    hingeTime,
    side: "right",
  });
  const sharedRootKeys = intersectSortedNumberLists(
    incomingRow?.commonRootKeys ?? [],
    outgoingRow?.commonRootKeys ?? []
  );
  const geometry = match.geometryContinuity ?? {};
  const incomingRootKey = geometry.incomingRootKey ?? null;
  const outgoingRootKey = geometry.outgoingRootKey ?? null;
  const routeRootKey =
    geometry.rootKeyMatched && sharedRootKeys.includes(incomingRootKey)
      ? incomingRootKey
      : null;
  const declaredMiddleContinuity =
    match.continuityLayer === "middle" &&
    ["same_source", "same_receiver"].includes(match.continuityRole);
  const oneSidedRootIntervalsPass =
    incomingLeftCoverage.maxWidth > ROOT_TOLERANCE &&
    outgoingRightCoverage.maxWidth > ROOT_TOLERANCE;
  const rootKeyRoutePass = routeRootKey != null;
  const hingeChartContinuityPass = geometry.hingeChartContinuity?.pass === true;
  const candidateRoutePass =
    incomingRow != null &&
    outgoingRow != null &&
    declaredMiddleContinuity &&
    oneSidedRootIntervalsPass &&
    rootKeyRoutePass &&
    hingeChartContinuityPass;
  const compensationRow = createMiddleRetainedChartCompensationRow(match);
  const zeroSlackRoutePass =
    candidateRoutePass &&
    geometry.pass === true &&
    geometry.clockContinuity?.pass === true &&
    !compensationRow.compensationRequired;
  const compensationRequired = candidateRoutePass && !zeroSlackRoutePass;

  return {
    incomingPairKey: match.incomingPairKey,
    outgoingPairKey: match.outgoingPairKey,
    continuityRole: match.continuityRole,
    continuityLayer: match.continuityLayer,
    hingeTime,
    status:
      !incomingRow || !outgoingRow
        ? "hinge_root_branch_route_pair_row_missing"
        : !declaredMiddleContinuity
          ? "hinge_root_branch_route_middle_continuity_missing"
          : !oneSidedRootIntervalsPass
            ? "hinge_root_branch_route_one_sided_root_interval_missing"
            : !rootKeyRoutePass
              ? "hinge_root_branch_route_common_root_key_missing"
              : !hingeChartContinuityPass
                ? "hinge_root_branch_route_hinge_chart_continuity_blocked"
                : zeroSlackRoutePass
                  ? "hinge_root_branch_route_zero_slack_candidate_formal_acceptance_blocked"
                  : "hinge_root_branch_route_candidate_compensation_required",
    candidateRoutePass,
    zeroSlackRoutePass,
    compensationRequired,
    routeRootKey,
    sharedRootKeys,
    incomingRootKey,
    outgoingRootKey,
    rootKeyMatched: geometry.rootKeyMatched === true,
    continuityPointKind: geometry.continuityPointKind ?? null,
    incomingPoint: geometry.incomingPoint ?? null,
    outgoingPoint: geometry.outgoingPoint ?? null,
    incomingPairEndpointGeometry: geometry.incomingPairEndpointGeometry ?? null,
    outgoingPairEndpointGeometry: geometry.outgoingPairEndpointGeometry ?? null,
    endpointPairResidualVector: geometry.residualVector ?? null,
    incomingLeftCoverage,
    outgoingRightCoverage,
    minOneSidedRouteWidth: Math.min(
      incomingLeftCoverage.maxWidth,
      outgoingRightCoverage.maxWidth
    ),
    geometryPass: geometry.pass === true,
    clockContinuityPass: geometry.clockContinuity?.pass === true,
    hingeChartContinuityPass,
    continuityAngularVelocity: geometry.clockContinuity?.angularVelocity ?? null,
    endpointPairResidual: compensationRow.endpointPairResidual,
    endpointToChartResidual: compensationRow.endpointToChartResidual,
    requiredEndpointCompensationNorm: compensationRequired
      ? compensationRow.requiredEndpointCompensationNorm
      : null,
    requiredClockRetune: compensationRequired ? compensationRow.requiredClockRetune : null,
    requiredPhaseCompensation: compensationRequired
      ? compensationRow.requiredPhaseCompensation
      : null,
  };
}

function createRootSideIntervalCoverage({ row, hingeTime, side }) {
  if (!row || !Number.isFinite(hingeTime)) {
    return {
      status: "root_side_interval_pair_row_missing",
      side,
      intervalCount: 0,
      totalWidth: 0,
      maxWidth: 0,
      intervals: [],
    };
  }
  const intervals = row.rootIntervals
    .map((interval) =>
      side === "left"
        ? {
            start: interval.start,
            end: Math.min(interval.end, hingeTime),
          }
        : {
            start: Math.max(interval.start, hingeTime),
            end: interval.end,
          }
    )
    .filter((interval) => interval.end - interval.start > ROOT_TOLERANCE);
  const coverage = summarizeHitTimeIntervals(intervals);
  return {
    status:
      coverage.maxWidth > ROOT_TOLERANCE
        ? "root_side_interval_positive_width_populated"
        : "root_side_interval_positive_width_missing",
    side,
    intervalCount: coverage.intervalCount,
    totalWidth: coverage.totalWidth,
    maxWidth: coverage.maxWidth,
    intervals: coverage.intervals,
  };
}

function intersectSortedNumberLists(left, right) {
  const rightSet = new Set(right);
  return left.filter((value) => rightSet.has(value)).sort((a, b) => a - b);
}

function createMiddleFieldSpeedHingeCapture({
  selectedCase,
  hingePoint,
  branchTransportIncidence,
  hingeEventRowSetIdentity,
  retainedRowSetIdentity,
  retainedTimeDomainCoverage,
  timeWindowTorqueProbe,
}) {
  const middleLayer = selectedCase.layers.find((layer) => layer.layer === "middle") ?? null;
  const layerByName = new Map(selectedCase.layers.map((layer) => [layer.layer, layer]));
  const cleanEnergyFrequencyTarget = {
    status: "clean_energy_frequency_target_computed_not_transaction_frequency",
    retainedBranchClaim: false,
    ...computeEnergyFrequencyTarget(layerByName),
    retainedLimitation:
      "omega_* is the clean minimal-branch frequency target. It is not an accepted transaction frequency omega_tx and does not close wake energy without a declared energy route.",
  };
  const pairMap = branchTransportIncidence.candidatePairMap;
  const matches = pairMap.matches ?? [];
  const middleContinuityMatches = matches.filter(
    (match) =>
      match.continuityLayer === "middle" &&
      ["same_source", "same_receiver"].includes(match.continuityRole)
  );
  const middleHingeChartRows = matches
    .map((match) => match.geometryContinuity?.hingeChartContinuity)
    .filter((row) => row?.continuityLayer === "middle");
  const middleClockRows = matches
    .map((match) => match.geometryContinuity?.clockContinuity)
    .filter((row) => row?.continuityLayer === "middle");
  const fieldSpeedResidual =
    middleLayer && Number.isFinite(middleLayer.speed)
      ? Math.abs(middleLayer.speed - FIELD_SPEED)
      : null;
  const middleOnFieldSpeedEdge =
    fieldSpeedResidual != null && fieldSpeedResidual <= FIELD_SPEED_TOLERANCE;
  const topologyRunsThroughMiddle =
    pairMap.topologyPass &&
    matches.length > 0 &&
    middleContinuityMatches.length === matches.length;
  const hingeChartContinuityPass =
    topologyRunsThroughMiddle &&
    pairMap.hingeChartContinuityPass &&
    middleHingeChartRows.length === matches.length;
  const geometryTransportPass = topologyRunsThroughMiddle && pairMap.pass;
  const candidateCapturePass =
    middleOnFieldSpeedEdge && topologyRunsThroughMiddle && hingeChartContinuityPass;
  const maxDelayedEndpointGeometryResidual = maxFinite(
    matches.map((match) => match.geometryContinuity?.residualNorm)
  );
  const maxMiddleClockTimeJump = maxFinite(
    middleClockRows.map((row) => Math.abs(row.clockTimeJump))
  );
  const maxMiddleWrappedPhaseJump = maxFinite(
    middleClockRows.map((row) => Math.abs(row.wrappedPhaseJump))
  );
  const maxHingeChartContinuityResidual = maxFinite(
    middleHingeChartRows.map((row) => row.residualNorm)
  );
  const maxCausalEndpointToHingeChartResidual = maxFinite(
    middleHingeChartRows.map((row) => row.maxCausalEndpointToHingeChartResidual)
  );
  const minimalBranchTransactionFrequencyCertificate =
    createMinimalBranchTransactionFrequencyCertificate({
      selectedCase,
      cleanEnergyFrequencyTarget,
      candidateCapturePass,
      topologyRunsThroughMiddle,
      hingeChartContinuityPass,
      geometryTransportPass,
    });
  const retainedChartFeasibility = createMiddleFieldSpeedRetainedChartFeasibility({
    candidateCapturePass,
    geometryTransportPass,
    middleContinuityMatches,
    hingeEventRowSetIdentity,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    layerByName,
  });

  return {
    schema: "aaa-tri-binary-middle-field-speed-hinge-capture.v1",
    status: !middleLayer
      ? "middle_field_speed_hinge_capture_middle_layer_missing"
      : !middleOnFieldSpeedEdge
        ? "middle_field_speed_hinge_capture_field_speed_edge_missing"
        : !pairMap.topologyPass
          ? "middle_field_speed_hinge_capture_pair_map_topology_missing"
          : !topologyRunsThroughMiddle
            ? "middle_field_speed_hinge_capture_non_middle_transport"
            : geometryTransportPass
              ? "middle_field_speed_hinge_capture_geometry_candidate_formal_acceptance_blocked"
              : hingeChartContinuityPass
                ? "middle_field_speed_hinge_capture_chart_continuous_causal_endpoint_geometry_blocked"
                : "middle_field_speed_hinge_capture_chart_continuity_blocked",
    claimLevel:
      "candidate diagnostic for the middle binary as the field-speed hinge; not retained branch certification",
    retainedBranchClaim: false,
    hingeTime: hingePoint.time,
    hingePiMultiple: hingePoint.piMultiple,
    middleLayer: middleLayer
      ? {
          index: middleLayer.index,
          angularVelocity: middleLayer.angularVelocity,
          radius: middleLayer.radius,
          speedRatio: middleLayer.speedRatio,
          speed: middleLayer.speed,
          fieldSpeedResidual,
          fieldSpeedTolerance: FIELD_SPEED_TOLERANCE,
        }
      : null,
    middleOnFieldSpeedEdge,
    topologyRunsThroughMiddle,
    hingeChartContinuityPass,
    geometryTransportPass,
    candidateCapturePass,
    pairMapStatus: pairMap.status,
    pairMapTopologyPass: pairMap.topologyPass,
    pairMapGeometryPass: pairMap.pass,
    matchedPairCount: matches.length,
    middleContinuityMatchCount: middleContinuityMatches.length,
    hingeChartContinuityMatchedPairCount:
      pairMap.hingeChartContinuityMatchedPairCount,
    maxHingeChartContinuityResidual,
    maxDelayedEndpointGeometryResidual,
    maxMiddleClockTimeJump,
    maxMiddleWrappedPhaseJump,
    maxCausalEndpointToHingeChartResidual,
    minimalBranchTransactionFrequencyCertificate,
    retainedChartFeasibility,
    middleContinuityMatches: middleContinuityMatches.map((match) => ({
      incomingPairKey: match.incomingPairKey,
      outgoingPairKey: match.outgoingPairKey,
      continuityRole: match.continuityRole,
      continuityLayer: match.continuityLayer,
      geometryResidual: match.geometryContinuity?.residualNorm ?? null,
      clockTimeJump: match.geometryContinuity?.clockContinuity?.clockTimeJump ?? null,
      wrappedPhaseJump:
        match.geometryContinuity?.clockContinuity?.wrappedPhaseJump ?? null,
      hingeChartResidual:
        match.geometryContinuity?.hingeChartContinuity?.residualNorm ?? null,
      causalEndpointToHingeChartResidual:
        match.geometryContinuity?.hingeChartContinuity
          ?.maxCausalEndpointToHingeChartResidual ?? null,
    })),
    retainedLimitation:
      "The middle layer can be chart-continuous at the field-speed hinge while delayed source or receiver endpoints remain discontinuous. Retained acceptance still requires an accepted point-event rule or geometrically continuous branch-transport map, followed by force, torque, wake, partition, phase, stability, vector-ledger, and energy-routing rows on the same retained event.",
  };
}

function createMiddleFieldSpeedRetainedChartFeasibility({
  candidateCapturePass,
  geometryTransportPass,
  middleContinuityMatches,
  hingeEventRowSetIdentity,
  retainedRowSetIdentity,
  retainedTimeDomainCoverage,
  timeWindowTorqueProbe,
  cleanEnergyFrequencyTarget,
  minimalBranchTransactionFrequencyCertificate,
  layerByName,
}) {
  const compensationRows = middleContinuityMatches.map((match) =>
    createMiddleRetainedChartCompensationRow(match)
  );
  const compensationRequiredRows = compensationRows.filter((row) => row.compensationRequired);
  const hingeRootBranchTransportRouteFeasibility =
    createHingeRootBranchTransportRouteFeasibility({
      middleContinuityMatches,
      hingeEventRowSetIdentity,
    });
  const compensatedRoutePayloadCertificate = createCompensatedRoutePayloadCertificate({
    hingeRootBranchTransportRouteFeasibility,
  });
  const wakePayloadDiagnostic = createRouteAuthorizedWakePayloadDiagnostic({
    compensatedRoutePayloadCertificate,
    hingeRootBranchTransportRouteFeasibility,
    hingeEventRowSetIdentity,
    retainedTimeDomainCoverage,
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
    minimalBranchTransactionFrequencyCertificate,
    layerByName,
  });
  const compensatedPayloadInventory = createCompensatedRetainedChartPayloadInventory({
    compensationRequiredRows,
    hingeEventRowSetIdentity,
    hingeRootBranchTransportRouteFeasibility,
    compensatedRoutePayloadCertificate,
    wakePayloadDiagnostic,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
  });
  const zeroSlackRetainedChartPass =
    candidateCapturePass &&
    geometryTransportPass &&
    compensationRequiredRows.length === 0 &&
    compensationRows.length > 0;
  const compensationPayloadPresent = compensatedPayloadInventory.complete;
  const compensatedRetainedChartPass =
    candidateCapturePass &&
    compensationRequiredRows.length > 0 &&
    compensationPayloadPresent;
  const zeroSlackRetainedChartNoGo =
    candidateCapturePass &&
    !zeroSlackRetainedChartPass &&
    compensationRequiredRows.length > 0 &&
    !compensationPayloadPresent;
  const requiredPayloads = unionStrings(
    compensationRequiredRows.flatMap((row) => row.requiredPayloads)
  );

  return {
    schema: "aaa-tri-binary-middle-field-speed-retained-chart-feasibility.v1",
    status: !candidateCapturePass
      ? "retained_chart_feasibility_capture_missing"
      : zeroSlackRetainedChartPass
        ? "retained_chart_feasibility_zero_slack_pass_formal_acceptance_blocked"
        : compensatedRetainedChartPass
          ? "retained_chart_feasibility_compensated_payload_present_formal_acceptance_blocked"
          : compensationRequiredRows.length > 0
            ? "retained_chart_feasibility_zero_slack_fails_compensation_payload_missing"
            : "retained_chart_feasibility_incomplete",
    claimLevel:
      "fail-closed retained chart feasibility diagnostic; not a retained branch claim",
    retainedBranchClaim: false,
    rule:
      "Zero-slack retained chart transport requires the middle field-speed hinge capture, delayed causal endpoint geometry, layer clock continuity, and hinge-chart continuity to pass on the same middle routes. If endpoint or clock compensation is needed, the row is blocked unless root, phase, wake, torque, partition, route, stability, and row-set identity payloads are explicitly populated for the same retained event.",
    zeroSlackRetainedChartPass,
    zeroSlackRetainedChartNoGo,
    compensatedRetainedChartPass,
    compensationPayloadPresent,
    compensationRequiredRowCount: compensationRequiredRows.length,
    maxRequiredEndpointCompensationNorm: maxFinite(
      compensationRows.map((row) => row.requiredEndpointCompensationNorm)
    ),
    maxRequiredEndpointPairResidual: maxFinite(
      compensationRows.map((row) => row.endpointPairResidual)
    ),
    maxRequiredClockRetune: maxFinite(
      compensationRows.map((row) => row.requiredClockRetune)
    ),
    maxRequiredPhaseCompensation: maxFinite(
      compensationRows.map((row) => row.requiredPhaseCompensation)
    ),
    requiredPayloads,
    candidatePayloads: compensatedPayloadInventory.candidatePayloads,
    partialPayloads: compensatedPayloadInventory.partialPayloads,
    missingPayloads: compensatedPayloadInventory.missingPayloads,
    blockingPayloads: compensatedPayloadInventory.blockingPayloads,
    hingeRootBranchTransportRouteFeasibility,
    compensatedRoutePayloadCertificate,
    wakePayloadDiagnostic,
    compensatedPayloadInventory,
    rows: compensationRows,
  };
}

function createCompensatedRetainedChartPayloadInventory({
  compensationRequiredRows,
  hingeEventRowSetIdentity,
  hingeRootBranchTransportRouteFeasibility,
  compensatedRoutePayloadCertificate,
  wakePayloadDiagnostic,
  retainedRowSetIdentity,
  retainedTimeDomainCoverage,
}) {
  const compensationRequired = compensationRequiredRows.length > 0;
  const requiredPayloads = compensationRequired
    ? unionStrings(compensationRequiredRows.flatMap((row) => row.requiredPayloads))
    : [];
  const globalRowSetCandidate =
    retainedRowSetIdentity?.status === "common_active_row_set_candidate_populated";
  const hingeEventRowSetCandidate =
    hingeEventRowSetIdentity?.status === "hinge_event_common_root_key_candidate_populated";
  const rootPayloadIntervalEnclosure =
    hingeEventRowSetIdentity?.rootPayloadIntervalEnclosure ?? null;
  const rootIntervalCandidate =
    rootPayloadIntervalEnclosure?.positiveWidthCommonRootInterval === true;
  const branchRouteCandidate =
    hingeRootBranchTransportRouteFeasibility?.candidateRoutePass === true;
  const zeroSlackBranchRouteCandidate =
    hingeRootBranchTransportRouteFeasibility?.zeroSlackRoutePass === true;
  const routePayloadComplete =
    compensatedRoutePayloadCertificate?.complete === true;
  const rowSetCandidate = globalRowSetCandidate || hingeEventRowSetCandidate;
  const positiveWidthDomain =
    (retainedTimeDomainCoverage?.maxCommonWidth ?? 0) > ROOT_TOLERANCE ||
    rootIntervalCandidate;
  const positiveWidthDomainOrBranchRoute = positiveWidthDomain || branchRouteCandidate;
  const hingeOnlyDomain =
    retainedTimeDomainCoverage?.status === "common_retained_hinge_points_only";
  const maxRequiredEndpointCompensationNorm = maxFinite(
    compensationRequiredRows.map((row) => row.requiredEndpointCompensationNorm)
  );
  const maxRequiredPhaseCompensation = maxFinite(
    compensationRequiredRows.map((row) => row.requiredPhaseCompensation)
  );
  const payloadRows = [
    {
      payload: "row_set_identity",
      state: !compensationRequired ? "not_required" : rowSetCandidate ? "candidate" : "blocked",
      status: !compensationRequired
        ? "not_required_zero_slack_route"
        : hingeEventRowSetCandidate && !globalRowSetCandidate
          ? "hinge_event_common_root_key_candidate_populated_global_row_set_missing"
          : globalRowSetCandidate
            ? "common_active_row_set_candidate_populated_not_yet_certified"
          : "blocked_common_active_row_set_missing",
      evidence: {
        retainedRowSetIdentityStatus: retainedRowSetIdentity?.status ?? null,
        hingeEventRowSetIdentityStatus: hingeEventRowSetIdentity?.status ?? null,
        pairCount: retainedRowSetIdentity?.pairCount ?? null,
        pairCountWithCommonActiveRootKeys:
          retainedRowSetIdentity?.pairCountWithCommonActiveRootKeys ?? null,
        hingePairCount: hingeEventRowSetIdentity?.pairCount ?? null,
        hingePairCountWithCommonRootKey:
          hingeEventRowSetIdentity?.pairCountWithCommonRootKey ?? null,
        hingeCommonRootKeyCount: hingeEventRowSetIdentity?.commonRootKeyCount ?? null,
        hingeCommonRootKeys: hingeEventRowSetIdentity?.commonRootKeys ?? [],
      },
    },
    {
      payload: "root_payload",
      state: compensationRequired ? "partial" : "not_required",
      status: compensationRequired
        ? rootIntervalCandidate
          ? "partial_hinge_common_root_positive_width_interval_candidate_not_certified"
          : branchRouteCandidate
            ? "partial_hinge_root_branch_transport_route_candidate_not_certified"
          : "partial_solver_root_rows_present_positive_width_retained_domain_missing"
        : "not_required_zero_slack_route",
      evidence: {
        compensationRequiredRowCount: compensationRequiredRows.length,
        retainedTimeDomainCoverageStatus: retainedTimeDomainCoverage?.status ?? null,
        retainedTimeDomainMaxCommonWidth:
          retainedTimeDomainCoverage?.maxCommonWidth ?? null,
        hingeRootPayloadIntervalStatus: rootPayloadIntervalEnclosure?.status ?? null,
        hingeRootPayloadIntervalMaxCommonWidth:
          rootPayloadIntervalEnclosure?.maxCommonWidth ?? null,
        hingeRootBranchRouteStatus:
          hingeRootBranchTransportRouteFeasibility?.status ?? null,
        hingeRootBranchRouteCandidatePass: branchRouteCandidate,
        hingeRootBranchRouteZeroSlackPass: zeroSlackBranchRouteCandidate,
      },
    },
    {
      payload: "phase_payload",
      state: compensationRequired ? "partial" : "not_required",
      status: compensationRequired
        ? "partial_phase_jump_measured_compensation_phase_row_missing"
        : "not_required_zero_slack_route",
      evidence: {
        maxRequiredPhaseCompensation,
        tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      },
    },
    {
      payload: "wake_payload",
      state: compensationRequired
        ? wakePayloadDiagnostic?.partialWakePayload
          ? "partial"
          : "missing"
        : "not_required",
      status: compensationRequired
        ? wakePayloadDiagnostic?.partialWakePayload
          ? wakePayloadDiagnostic.status ??
            "partial_wake_boundary_charge_target_populated_action_kernel_missing"
          : "missing_normalized_action_kernel_wake_pullback_payload"
        : "not_required_zero_slack_route",
      evidence: {
        retainedTimeDomainCoverageStatus: retainedTimeDomainCoverage?.status ?? null,
        wakePayloadDiagnosticStatus: wakePayloadDiagnostic?.status ?? null,
        wakePayloadDiagnostic,
      },
    },
    {
      payload: "torque_payload",
      state: compensationRequired ? "partial" : "not_required",
      status: compensationRequired
        ? "partial_point_diagnostic_torque_present_retained_torque_row_missing"
        : "not_required_zero_slack_route",
      evidence: {
        maxRequiredEndpointCompensationNorm,
      },
    },
    {
      payload: "partition_payload",
      state: compensationRequired ? "missing" : "not_required",
      status: compensationRequired
        ? "missing_retained_vector_partition_payload"
        : "not_required_zero_slack_route",
      evidence: {
        sameRetainedEventRequired: compensationRequired,
      },
    },
    {
      payload: "route_payload",
      state: compensationRequired
        ? routePayloadComplete
          ? "candidate"
          : branchRouteCandidate
            ? "partial"
            : "missing"
        : "not_required",
      status: compensationRequired
        ? routePayloadComplete
          ? "compensated_route_payload_candidate_not_certified"
          : branchRouteCandidate
          ? zeroSlackBranchRouteCandidate
            ? "partial_hinge_root_branch_route_zero_slack_candidate_not_certified"
            : "partial_hinge_root_branch_route_compensation_payload_missing"
          : "missing_root_wake_recoil_transport_route_payload"
        : "not_required_zero_slack_route",
      evidence: {
        compensationRequiredRowCount: compensationRequiredRows.length,
        hingeRootBranchRouteStatus:
          hingeRootBranchTransportRouteFeasibility?.status ?? null,
        hingeRootBranchRouteCandidatePass: branchRouteCandidate,
        hingeRootBranchRouteZeroSlackPass: zeroSlackBranchRouteCandidate,
        hingeRootBranchRouteCompensationRequiredMatchCount:
          hingeRootBranchTransportRouteFeasibility?.compensationRequiredMatchCount ?? null,
        compensatedRoutePayloadStatus:
          compensatedRoutePayloadCertificate?.status ?? null,
        compensatedRoutePayloadMissingFields:
          compensatedRoutePayloadCertificate?.missingPayloadFields ?? null,
        compensatedRoutePayloadPopulatedFields:
          compensatedRoutePayloadCertificate?.populatedPayloadFields ?? null,
        compensatedRoutePayloadBoundedSlackRowCount:
          compensatedRoutePayloadCertificate?.boundedSlackRowCount ?? null,
        compensatedRoutePayloadTransportAngularMomentumRowCount:
          compensatedRoutePayloadCertificate?.transportAngularMomentumRowCount ?? null,
        compensatedRoutePayloadRootEnergyRowCount:
          compensatedRoutePayloadCertificate?.rootEnergyRowCount ?? null,
        compensatedRoutePayloadRecoilChannelRowCount:
          compensatedRoutePayloadCertificate?.recoilChannelRowCount ?? null,
        compensatedRoutePayloadMaxUnassignedGeometricSlack:
          compensatedRoutePayloadCertificate?.maxUnassignedGeometricSlack ?? null,
        compensatedRoutePayloadMaxUnassignedPhaseSlack:
          compensatedRoutePayloadCertificate?.maxUnassignedPhaseSlack ?? null,
        compensatedRoutePayloadMaxBoundedGeometricSlack:
          compensatedRoutePayloadCertificate?.maxBoundedGeometricSlack ?? null,
        compensatedRoutePayloadMaxBoundedClockRetune:
          compensatedRoutePayloadCertificate?.maxBoundedClockRetune ?? null,
        compensatedRoutePayloadMaxBoundedPhaseSlack:
          compensatedRoutePayloadCertificate?.maxBoundedPhaseSlack ?? null,
        compensatedRoutePayloadMaxTransportAngularMomentumNorm:
          compensatedRoutePayloadCertificate?.maxTransportAngularMomentumNorm ?? null,
        compensatedRoutePayloadMaxTransportAngularMomentumNormUpperBound:
          compensatedRoutePayloadCertificate?.maxTransportAngularMomentumNormUpperBound ?? null,
        compensatedRoutePayloadMaxRootEnergyIncrement:
          compensatedRoutePayloadCertificate?.maxRootEnergyIncrement ?? null,
        compensatedRoutePayloadMaxRecoilAngularMomentumNorm:
          compensatedRoutePayloadCertificate?.maxRecoilAngularMomentumNorm ?? null,
        compensatedRoutePayloadMaxRecoilEnergyScale:
          compensatedRoutePayloadCertificate?.maxRecoilEnergyScale ?? null,
      },
    },
    {
      payload: "stability_payload",
      state: compensationRequired ? "blocked" : "not_required",
      status: compensationRequired
        ? positiveWidthDomainOrBranchRoute && rowSetCandidate
          ? "blocked_section_stability_payload_missing_on_candidate_row_set"
          : "blocked_common_retained_section_domain_missing"
        : "not_required_zero_slack_route",
      evidence: {
        rowSetCandidate,
        globalRowSetCandidate,
        hingeEventRowSetCandidate,
        positiveWidthDomain,
        branchRouteCandidate,
        positiveWidthDomainOrBranchRoute,
        hingeOnlyDomain,
      },
    },
  ].filter((row) => requiredPayloads.length === 0 || requiredPayloads.includes(row.payload));
  const blockingPayloads = payloadRows
    .filter((row) => ["blocked", "missing"].includes(row.state))
    .map((row) => row.payload);
  const missingPayloads = payloadRows
    .filter((row) => row.state === "missing")
    .map((row) => row.payload);
  const partialPayloads = payloadRows
    .filter((row) => row.state === "partial")
    .map((row) => row.payload);
  const candidatePayloads = payloadRows
    .filter((row) => row.state === "candidate")
    .map((row) => row.payload);
  const nextSmallestClosureTarget = selectNextCompensatedPayloadClosureTarget({
    payloadRows,
    rowSetCandidate,
    positiveWidthDomain,
    hingeRootBranchTransportRouteFeasibility,
    compensationRequired,
    rootPayloadIntervalEnclosure,
  });

  return {
    schema: "aaa-tri-binary-compensated-retained-chart-payload-inventory.v1",
    status: !compensationRequired
      ? "compensated_retained_chart_payload_inventory_not_required"
      : blockingPayloads.length > 0
        ? "compensated_retained_chart_payload_inventory_blocked"
        : partialPayloads.length > 0
          ? "compensated_retained_chart_payload_inventory_partial"
          : "compensated_retained_chart_payload_inventory_complete",
    claimLevel:
      "inventory of solver-facing payload obligations for compensated retained-chart promotion; not proof of payload presence",
    complete:
      compensationRequired &&
      blockingPayloads.length === 0 &&
      missingPayloads.length === 0 &&
      partialPayloads.length === 0 &&
      candidatePayloads.length === 0 &&
      payloadRows.length > 0,
    compensationRequired,
    requiredPayloadCount: requiredPayloads.length,
    candidatePayloadCount: candidatePayloads.length,
    partialPayloadCount: partialPayloads.length,
    missingPayloadCount: missingPayloads.length,
    blockingPayloadCount: blockingPayloads.length,
    candidatePayloads,
    partialPayloads,
    missingPayloads,
    blockingPayloads,
    nextSmallestClosureTarget,
    hingeEventRowSetIdentity,
    rootPayloadIntervalEnclosure,
    hingeRootBranchTransportRouteFeasibility,
    compensatedRoutePayloadCertificate,
    payloadRows,
  };
}

function selectNextCompensatedPayloadClosureTarget({
  payloadRows,
  rowSetCandidate,
  positiveWidthDomain,
  hingeRootBranchTransportRouteFeasibility,
  compensationRequired,
  rootPayloadIntervalEnclosure,
}) {
  if (!compensationRequired) {
    return null;
  }
  if (!rowSetCandidate) {
    return {
      payload: "row_set_identity",
      reason:
        "All compensated retained-chart payloads must be attached to one common active row set before phase, wake, torque, partition, route, and stability rows can be certified.",
    };
  }
  if (!positiveWidthDomain) {
    if (hingeRootBranchTransportRouteFeasibility?.candidateRoutePass) {
      const routePayloadRow = payloadRows.find((row) => row.payload === "route_payload");
      if (routePayloadRow?.state === "candidate") {
        const wakePayloadRow = payloadRows.find((row) => row.payload === "wake_payload");
        if (wakePayloadRow?.state === "partial") {
          return {
            payload: "wake_payload",
            reason:
              "The branch-transport route is payload-complete, and the wake charge, route-authorized pullback-domain, normalization-convention, accepted chart-restricted crossing-domain rows, route-gradient candidate, finite endpoint-clear kernel-gradient candidate evaluation, Master-Equation characteristic-tail pair-radial pullback target, side-split radial-constrained boundary-charge solve, delta_eta(g) quadrature target, single-coefficient sign-pattern candidate, layer-polarity assignment candidate, and source/receiver polarity row-binding candidate are populated, but accepted layer-polarity assignment, accepted source/receiver polarity metadata, accepted normalized action-kernel charge, retained crossing-domain pullback, and wake energy increment still block the same route-authorized retained event.",
          };
        }
        const firstBlockingPayload = payloadRows.find((row) =>
          ["blocked", "missing"].includes(row.state)
        );
        if (firstBlockingPayload) {
          return {
            payload: firstBlockingPayload.payload,
            reason: `The branch-transport route is payload-complete but the retained common domain is still hinge-only; populate ${firstBlockingPayload.payload} on the same route-authorized retained event before section stability can be evaluated.`,
          };
        }
      }
      const missingRouteFields =
        routePayloadRow?.evidence?.compensatedRoutePayloadMissingFields ?? [];
      const missingRouteFieldsText =
        missingRouteFields.length > 0 ? ` Missing route fields: ${missingRouteFields.join(", ")}.` : "";
      return {
        payload: "route_payload",
        reason:
          hingeRootBranchTransportRouteFeasibility.zeroSlackRoutePass
            ? "The common root-key evidence has no positive-width common interval, but the branch-transport pair map stitches one-sided root intervals through the hinge; certify the route payload on the same retained event before section stability can be evaluated."
            : `The common root-key evidence has no positive-width common interval, but the branch-transport pair map stitches one-sided root intervals through the hinge with endpoint or clock compensation still required; complete the route payload on the same retained event before section stability can be evaluated.${missingRouteFieldsText}`,
      };
    }
    return {
      payload: "root_payload",
      reason:
        rootPayloadIntervalEnclosure?.status ===
        "hinge_common_root_interval_point_only_no_common_side"
          ? "The common root-key evidence intersects only at the hinge point and has no common one-sided interval; a positive-width retained interval enclosure or branch-transport route is required before section stability can be evaluated."
          : rootPayloadIntervalEnclosure?.status === "hinge_common_root_interval_point_only"
            ? "The common root-key evidence intersects only at the hinge point; a positive-width retained interval enclosure is the smallest domain upgrade before section stability can be evaluated."
            : "The present evidence is hinge-only; a retained interval enclosure is the smallest domain upgrade before section stability can be evaluated.",
    };
  }
  const firstBlockingPayload = payloadRows.find((row) =>
    ["blocked", "missing"].includes(row.state)
  );
  if (firstBlockingPayload) {
    return {
      payload: firstBlockingPayload.payload,
      reason: `Populate ${firstBlockingPayload.payload} on the same retained event before compensated chart promotion.`,
    };
  }
  const firstPartialPayload = payloadRows.find((row) => row.state === "partial");
  return firstPartialPayload
    ? {
        payload: firstPartialPayload.payload,
        reason: `Upgrade ${firstPartialPayload.payload} from diagnostic evidence to retained payload evidence on the same event.`,
      }
    : null;
}

function createMiddleRetainedChartCompensationRow(match) {
  const geometry = match.geometryContinuity ?? {};
  const clock = geometry.clockContinuity ?? {};
  const chart = geometry.hingeChartContinuity ?? {};
  const endpointPairResidual = finiteOrNull(geometry.residualNorm);
  const endpointToChartResidual = finiteOrNull(
    chart.maxCausalEndpointToHingeChartResidual
  );
  const requiredEndpointCompensationNorm = maxFinite([
    endpointPairResidual,
    endpointToChartResidual,
  ]);
  const requiredClockRetune = finiteOrNull(Math.abs(clock.clockTimeJump));
  const requiredPhaseCompensation = finiteOrNull(Math.abs(clock.wrappedPhaseJump));
  const delayedEndpointGeometryPass = geometry.pass === true;
  const clockContinuityPass = clock.pass === true;
  const hingeChartContinuityPass = chart.pass === true;
  const compensationRequired =
    !delayedEndpointGeometryPass ||
    !clockContinuityPass ||
    (requiredEndpointCompensationNorm ?? 0) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE ||
    (requiredPhaseCompensation ?? 0) > POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  return {
    incomingPairKey: match.incomingPairKey,
    outgoingPairKey: match.outgoingPairKey,
    continuityRole: match.continuityRole,
    continuityLayer: match.continuityLayer,
    status: compensationRequired
      ? "retained_chart_compensation_required_missing_payload"
      : "retained_chart_zero_slack_route_pass",
    compensationRequired,
    delayedEndpointGeometryPass,
    clockContinuityPass,
    hingeChartContinuityPass,
    endpointPairResidual,
    endpointToChartResidual,
    requiredEndpointCompensationNorm,
    requiredClockRetune,
    requiredPhaseCompensation,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    requiredPayloads: compensationRequired
      ? [
          "row_set_identity",
          "root_payload",
          "phase_payload",
          "wake_payload",
          "torque_payload",
          "partition_payload",
          "route_payload",
          "stability_payload",
        ]
      : [],
  };
}

function finiteOrNull(value) {
  return Number.isFinite(value) ? value : null;
}

function unionStrings(values) {
  return [...new Set(values)].sort();
}

function findActiveRootLedgerRowByKey(rows, rootKey) {
  return rows.find((row) => row.entryKind === 1 && row.rootKey === rootKey) ?? null;
}

function projectRootLedgerDetailForHinge(row) {
  if (!row) {
    return null;
  }
  return {
    rootKey: row.rootKey,
    emissionTime: row.emissionTime,
    hitTime: row.hitTime,
    delay: row.delay,
    normalizedResidual: row.normalizedResidual,
    absoluteResidual: row.absoluteResidual,
    jacobian: row.jacobian,
    jacobianSignStratum: row.jacobianSignStratum,
    sourcePoint: row.sourcePoint,
    receiverPoint: row.receiverPoint,
  };
}

function createHingePairPointDiagnostics({ pairKey, time, matchingEdges }) {
  const pairRole = classifyLayerPairRole(pairKey);
  const endpointRows = [];
  for (const edge of matchingEdges) {
    for (const transition of edge.retainedTransitions) {
      for (const endpoint of [transition.priorEndpoint, transition.nextEndpoint]) {
        if (endpoint && Math.abs(endpoint.hitTime - time) <= ROOT_TOLERANCE) {
          endpointRows.push(endpoint);
        }
      }
    }
  }
  const uniqueEndpointRows = dedupeHingeEndpointRows(endpointRows);
  const forceRows = uniqueEndpointRows.map((row) =>
    createPointEventForceTorqueDiagnostic({ pairKey, row })
  );
  const populatedForceRows = forceRows.filter((row) => row.status === "point_force_torque_diagnostic_populated");
  const netDiagnosticTorque = populatedForceRows.reduce(
    (total, row) => addVectors(total, row.netPairTorque),
    zeroVector()
  );
  const missingForceGeometryCount = uniqueEndpointRows.length - populatedForceRows.length;
  return {
    status:
      pairRole === "diagonal_identity"
        ? uniqueEndpointRows.length > 0
          ? "diagonal_identity_point_witness_populated"
          : "diagonal_identity_point_witness_missing"
        : uniqueEndpointRows.length > 0
          ? populatedForceRows.length === uniqueEndpointRows.length
          ? "point_endpoint_force_torque_diagnostics_populated"
          : "point_endpoint_rows_populated_with_missing_force_geometry"
        : "point_endpoint_rows_missing",
    pairRole,
    claimLevel:
      "unit-coefficient point-event force/torque diagnostic; not retained torque consistency",
    endpointRowCount: uniqueEndpointRows.length,
    forceTorqueRowCount: populatedForceRows.length,
    missingForceGeometryCount,
    maxNormalizedResidual: maxFinite(uniqueEndpointRows.map((row) => row.normalizedResidual)),
    netDiagnosticTorque,
    netDiagnosticTorqueNorm: vectorNorm(netDiagnosticTorque),
    rows: forceRows.slice(0, 8),
  };
}

function classifyLayerPairRole(pairKey) {
  const [sourceLayer, receiverLayer] = pairKey.split("->");
  return sourceLayer === receiverLayer ? "diagonal_identity" : "off_diagonal_force_bearing";
}

function isDiagonalLayerPairKey(pairKey) {
  if (typeof pairKey !== "string" || !pairKey.includes("->")) {
    return false;
  }
  const [sourceLayer, receiverLayer] = pairKey.split("->");
  return sourceLayer === receiverLayer;
}

function dedupeHingeEndpointRows(rows) {
  const seen = new Set();
  const deduped = [];
  for (const row of rows) {
    const key = `${row.rootKey}:${row.emissionTime}:${row.hitTime}:${row.jacobian}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(row);
  }
  return deduped;
}

function createPointEventForceTorqueDiagnostic({ pairKey, row }) {
  const displacement =
    row.sourcePoint && row.receiverPoint ? subtractVectors(row.receiverPoint, row.sourcePoint) : null;
  const distance = displacement ? vectorNorm(displacement) : null;
  const unitDirection = displacement && distance > 0 ? scaleVector(displacement, 1 / distance) : null;
  const forceScale =
    unitDirection && distance > 0 && Math.abs(row.jacobian) > 0
      ? 1 / (distance * distance * Math.abs(row.jacobian))
      : null;
  const normalizedForce = unitDirection && forceScale != null ? scaleVector(unitDirection, forceScale) : null;
  const receiverTorque =
    row.receiverPoint && normalizedForce ? crossVectors(row.receiverPoint, normalizedForce) : null;
  const sourceReactionTorque =
    row.sourcePoint && normalizedForce ? crossVectors(row.sourcePoint, scaleVector(normalizedForce, -1)) : null;
  const netPairTorque =
    receiverTorque && sourceReactionTorque
      ? addVectors(receiverTorque, sourceReactionTorque)
      : zeroVector();
  return {
    pairKey,
    rootKey: row.rootKey,
    emissionTime: row.emissionTime,
    hitTime: row.hitTime,
    normalizedResidual: row.normalizedResidual,
    absoluteResidual: row.absoluteResidual,
    jacobian: row.jacobian,
    distance,
    status: normalizedForce ? "point_force_torque_diagnostic_populated" : "point_force_torque_geometry_missing",
    coefficientConvention:
      "unit force-like coefficient for hinge-point diagnostic only; not retained torque consistency",
    receiverTorque,
    sourceReactionTorque,
    netPairTorque,
    netPairTorqueNorm: vectorNorm(netPairTorque),
  };
}

function summarizeHingePointDiagnostics(pairWitnesses) {
  const diagnostics = Object.values(pairWitnesses).map((witness) => witness.pointDiagnostics);
  const diagonalDiagnostics = diagnostics.filter((row) => row.pairRole === "diagonal_identity");
  const offDiagonalDiagnostics = diagnostics.filter(
    (row) => row.pairRole === "off_diagonal_force_bearing"
  );
  const endpointRowCount = diagnostics.reduce((sum, row) => sum + row.endpointRowCount, 0);
  const forceTorqueRowCount = diagnostics.reduce((sum, row) => sum + row.forceTorqueRowCount, 0);
  const netDiagnosticTorque = diagnostics.reduce(
    (total, row) => addVectors(total, row.netDiagnosticTorque),
    zeroVector()
  );
  const offDiagonalNetDiagnosticTorque = offDiagonalDiagnostics.reduce(
    (total, row) => addVectors(total, row.netDiagnosticTorque),
    zeroVector()
  );
  const offDiagonalForcePairCount = offDiagonalDiagnostics.filter(
    (row) => row.status === "point_endpoint_force_torque_diagnostics_populated"
  ).length;
  const diagonalIdentityPairCount = diagonalDiagnostics.filter(
    (row) => row.status === "diagonal_identity_point_witness_populated"
  ).length;
  return {
    status:
      diagonalIdentityPairCount === diagonalDiagnostics.length &&
      offDiagonalForcePairCount === offDiagonalDiagnostics.length &&
      diagnostics.length > 0
        ? "hinge_point_identity_and_off_diagonal_force_diagnostics_populated"
        : endpointRowCount > 0
          ? "hinge_point_force_torque_diagnostics_partial"
          : "hinge_point_force_torque_diagnostics_missing",
    claimLevel:
      "aggregated unit-coefficient point-event diagnostic; not retained torque, wake, phase, partition, stability, vector-ledger, or energy-routing certification",
    endpointRowCount,
    forceTorqueRowCount,
    diagonalIdentityPairCount,
    offDiagonalForcePairCount,
    maxNormalizedResidual: maxFinite(diagnostics.map((row) => row.maxNormalizedResidual)),
    netDiagnosticTorque,
    netDiagnosticTorqueNorm: vectorNorm(netDiagnosticTorque),
    offDiagonalNetDiagnosticTorque,
    offDiagonalNetDiagnosticTorqueNorm: vectorNorm(offDiagonalNetDiagnosticTorque),
  };
}

function createCandidatePointEventAdmissibility({
  allPairsWitnessed,
  missingPairCount,
  boundaryOnlyPairCount,
  interiorPairCount,
  commonRootKeyList,
  pairWitnesses,
  pointDiagnostics,
}) {
  const pairCount = Object.keys(pairWitnesses).length;
  const offDiagonalPairCount = Object.values(pairWitnesses).filter(
    (witness) => witness.pointDiagnostics.pairRole === "off_diagonal_force_bearing"
  ).length;
  const diagonalPairCount = pairCount - offDiagonalPairCount;
  const pass =
    allPairsWitnessed &&
    missingPairCount === 0 &&
    boundaryOnlyPairCount === pairCount &&
    interiorPairCount === 0 &&
    commonRootKeyList.length > 0 &&
    pointDiagnostics.diagonalIdentityPairCount === diagonalPairCount &&
    pointDiagnostics.offDiagonalForcePairCount === offDiagonalPairCount &&
    pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm <= POINT_EVENT_TORQUE_RESIDUAL_TOLERANCE;
  return {
    status: pass
      ? "candidate_point_event_rule_conditions_populated_formal_acceptance_blocked"
      : "candidate_point_event_rule_conditions_incomplete",
    pass,
    retainedBranchClaim: false,
    rule:
      "Candidate only: all layer-pair channels meet the hinge point with boundary-only retained transition incidence, share at least one retained root key, populate diagonal identity witnesses, populate off-diagonal force-bearing endpoint diagnostics, and cancel off-diagonal unit point-torque within tolerance.",
    pairCount,
    diagonalPairCount,
    offDiagonalPairCount,
    torqueTolerance: POINT_EVENT_TORQUE_RESIDUAL_TOLERANCE,
    reasons: {
      allPairsWitnessed,
      missingPairCount,
      boundaryOnlyPairCount,
      interiorPairCount,
      commonRootKeyCount: commonRootKeyList.length,
      diagonalIdentityPairCount: pointDiagnostics.diagonalIdentityPairCount,
      offDiagonalForcePairCount: pointDiagnostics.offDiagonalForcePairCount,
      offDiagonalNetDiagnosticTorqueNorm: pointDiagnostics.offDiagonalNetDiagnosticTorqueNorm,
    },
  };
}

function createPointEventBranchTransportIncidence({
  selectedCase,
  candidatePointEventAdmissibility,
  pairWitnesses,
}) {
  const layerSpecsByLayer = new Map(
    selectedCase.layers.map((layer) => [layer.layer, layer])
  );
  const pairRows = Object.entries(pairWitnesses).map(([pairKey, witness]) => {
    const [sourceLayer, receiverLayer] = pairKey.split("->");
    const counts = witness.boundaryOrientationCounts ?? createEmptyBoundaryOrientationCounts();
    const hasLeftBoundary = counts.incomingBoundary > 0 || counts.pointDegenerateBoundary > 0;
    const hasRightBoundary = counts.outgoingBoundary > 0 || counts.pointDegenerateBoundary > 0;
    return {
      pairKey,
      sourceLayer,
      receiverLayer,
      status:
        counts.missing > 0
          ? "point_event_transport_pair_missing"
          : counts.interior > 0
            ? "point_event_transport_pair_interior_blocked"
            : hasLeftBoundary && hasRightBoundary
              ? counts.incomingBoundary > 0 && counts.outgoingBoundary > 0
                ? "two_sided_boundary_pair"
                : "point_degenerate_boundary_pair"
              : counts.incomingBoundary > 0
                ? "incoming_only_boundary_pair"
                : counts.outgoingBoundary > 0
                  ? "outgoing_only_boundary_pair"
                  : "point_event_transport_pair_unclassified",
      orientationCounts: counts,
      hasLeftBoundary,
      hasRightBoundary,
    };
  });
  const layers = [...new Set(pairRows.flatMap((row) => [row.sourceLayer, row.receiverLayer]))].sort();
  const sourceLayerRows = layers.map((layer) =>
    summarizeLayerTransportIncidence(
      layer,
      "source",
      pairRows.filter((row) => row.sourceLayer === layer)
    )
  );
  const receiverLayerRows = layers.map((layer) =>
    summarizeLayerTransportIncidence(
      layer,
      "receiver",
      pairRows.filter((row) => row.receiverLayer === layer)
    )
  );
  const missingPairCount = pairRows.filter((row) => row.orientationCounts.missing > 0).length;
  const interiorPairCount = pairRows.filter((row) => row.orientationCounts.interior > 0).length;
  const incomingOnlyPairCount = pairRows.filter(
    (row) => row.status === "incoming_only_boundary_pair"
  ).length;
  const outgoingOnlyPairCount = pairRows.filter(
    (row) => row.status === "outgoing_only_boundary_pair"
  ).length;
  const twoSidedPairCount = pairRows.filter(
    (row) => row.status === "two_sided_boundary_pair"
  ).length;
  const pointDegeneratePairCount = pairRows.filter(
    (row) => row.status === "point_degenerate_boundary_pair"
  ).length;
  const oneSidedPairCount = pairRows.filter(
    (row) => !(row.hasLeftBoundary && row.hasRightBoundary)
  ).length;
  const oneSidedPairImbalance = Math.abs(incomingOnlyPairCount - outgoingOnlyPairCount);
  const pairwiseTwoSidedOrPointCount = pairRows.length - oneSidedPairCount;
  const sourceLayerBalancedCount = sourceLayerRows.filter((row) => row.pass).length;
  const receiverLayerBalancedCount = receiverLayerRows.filter((row) => row.pass).length;
  const allLayerRolesBalanced =
    sourceLayerBalancedCount === sourceLayerRows.length &&
    receiverLayerBalancedCount === receiverLayerRows.length &&
    sourceLayerRows.length > 0 &&
    receiverLayerRows.length > 0;
  const pass =
    candidatePointEventAdmissibility.pass &&
    missingPairCount === 0 &&
    interiorPairCount === 0 &&
    allLayerRolesBalanced;
  const candidatePairMap = createCandidateBranchTransportPairMap({
    incidencePass: pass,
    pairRows,
    pairWitnesses,
    layerSpecsByLayer,
  });
  return {
    status: pass
      ? oneSidedPairCount === 0
        ? "pairwise_balanced_point_event_transport_candidate_formal_acceptance_blocked"
        : "layer_balanced_point_event_transport_candidate_pair_map_blocked"
      : "point_event_transport_incidence_incomplete",
    pass,
    retainedBranchClaim: false,
    rule:
      "Candidate only: the hinge has boundary-only retained point-event incidence, and each source-layer and receiver-layer role has both left and right boundary support after point-degenerate rows are counted as point support; a retained branch-transport map is still required before acceptance.",
    pairCount: pairRows.length,
    pairwiseTwoSidedOrPointCount,
    oneSidedPairCount,
    incomingOnlyPairCount,
    outgoingOnlyPairCount,
    twoSidedPairCount,
    pointDegeneratePairCount,
    oneSidedPairImbalance,
    missingPairCount,
    interiorPairCount,
    sourceLayerBalancedCount,
    receiverLayerBalancedCount,
    candidatePairMap,
    sourceLayerRows,
    receiverLayerRows,
    pairRows,
  };
}

function createCandidateBranchTransportPairMap({
  incidencePass,
  pairRows,
  pairWitnesses,
  layerSpecsByLayer,
}) {
  const incomingRows = pairRows
    .filter((row) => row.status === "incoming_only_boundary_pair")
    .sort(comparePairRowsByKey);
  const outgoingRows = pairRows
    .filter((row) => row.status === "outgoing_only_boundary_pair")
    .sort(comparePairRowsByKey);
  const matches = [];
  const usedOutgoingIndexes = new Set();

  for (const incoming of incomingRows) {
    const best = outgoingRows
      .map((outgoing, index) => ({
        outgoing,
        index,
        continuity: classifyBranchTransportPairMapContinuity(incoming, outgoing),
      }))
      .filter((candidate) => candidate.continuity && !usedOutgoingIndexes.has(candidate.index))
      .sort(comparePairMapCandidateMatches)[0];
    if (!best) {
      continue;
    }
    usedOutgoingIndexes.add(best.index);
    matches.push(
      projectBranchTransportPairMapMatch({
        incoming,
        outgoing: best.outgoing,
        continuity: best.continuity,
        pairWitnesses,
        layerSpecsByLayer,
      })
    );
  }

  const unmatchedIncoming = incomingRows
    .filter((incoming) => !matches.some((match) => match.incomingPairKey === incoming.pairKey))
    .map((row) => row.pairKey);
  const unmatchedOutgoing = outgoingRows
    .filter((outgoing) => !matches.some((match) => match.outgoingPairKey === outgoing.pairKey))
    .map((row) => row.pairKey);
  const continuityRoleCounts = {};
  for (const match of matches) {
    continuityRoleCounts[match.continuityRole] =
      (continuityRoleCounts[match.continuityRole] ?? 0) + 1;
  }
  const matchedByDeclaredContinuity = matches.every((match) =>
    ["same_source", "same_receiver"].includes(match.continuityRole)
  );
  const topologyPass =
    incidencePass &&
    incomingRows.length === outgoingRows.length &&
    incomingRows.length > 0 &&
    unmatchedIncoming.length === 0 &&
    unmatchedOutgoing.length === 0 &&
    matchedByDeclaredContinuity;
  const geometryContinuityRows = matches.map((match) => match.geometryContinuity);
  const geometryContinuityMatchedPairCount = geometryContinuityRows.filter(
    (row) => row.pass
  ).length;
  const geometryContinuityPass =
    topologyPass &&
    geometryContinuityRows.length === matches.length &&
    geometryContinuityMatchedPairCount === matches.length;
  const maxGeometryContinuityResidual = maxFinite(
    geometryContinuityRows.map((row) => row.residualNorm)
  );
  const clockContinuityRows = geometryContinuityRows
    .map((row) => row.clockContinuity)
    .filter(Boolean);
  const clockContinuityMatchedPairCount = clockContinuityRows.filter(
    (row) => row.pass
  ).length;
  const maxClockContinuityTimeJump = maxFinite(
    clockContinuityRows.map((row) => Math.abs(row.clockTimeJump))
  );
  const maxClockContinuityWrappedPhaseJump = maxFinite(
    clockContinuityRows.map((row) => Math.abs(row.wrappedPhaseJump))
  );
  const hingeChartContinuityRows = geometryContinuityRows
    .map((row) => row.hingeChartContinuity)
    .filter(Boolean);
  const hingeChartContinuityMatchedPairCount = hingeChartContinuityRows.filter(
    (row) => row.pass
  ).length;
  const hingeChartContinuityPass =
    topologyPass &&
    hingeChartContinuityRows.length === matches.length &&
    hingeChartContinuityMatchedPairCount === matches.length;
  const maxHingeChartContinuityResidual = maxFinite(
    hingeChartContinuityRows.map((row) => row.residualNorm)
  );
  const maxCausalEndpointToHingeChartResidual = maxFinite(
    hingeChartContinuityRows.map((row) => row.maxCausalEndpointToHingeChartResidual)
  );

  return {
    status: !incidencePass
      ? "branch_transport_pair_map_incidence_incomplete"
      : incomingRows.length !== outgoingRows.length
        ? "branch_transport_pair_map_one_sided_count_imbalance"
        : unmatchedIncoming.length > 0 || unmatchedOutgoing.length > 0
          ? "branch_transport_pair_map_unmatched_one_sided_channels"
          : !matchedByDeclaredContinuity
            ? "candidate_branch_transport_pair_map_cross_role_only_formal_acceptance_blocked"
            : geometryContinuityPass
              ? "candidate_branch_transport_pair_map_geometry_continuous_formal_acceptance_blocked"
              : hingeChartContinuityPass
                ? "candidate_branch_transport_pair_map_hinge_chart_continuous_causal_endpoint_geometry_blocked"
                : "candidate_branch_transport_pair_map_topology_populated_geometry_blocked",
    topologyPass,
    pass: geometryContinuityPass,
    hingeChartContinuityPass,
    retainedBranchClaim: false,
    rule:
      "Candidate only: match each incoming-only retained layer-pair channel at the hinge to one outgoing-only channel through a shared source-layer or receiver-layer continuity, then require the shared source or receiver endpoint to agree within geometry tolerance; a retained branch-transport map and retained residual rows are still required before acceptance.",
    incomingOnlyPairCount: incomingRows.length,
    outgoingOnlyPairCount: outgoingRows.length,
    matchedPairCount: matches.length,
    geometryTolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    geometryContinuityMatchedPairCount,
    maxGeometryContinuityResidual,
    clockContinuityMatchedPairCount,
    maxClockContinuityTimeJump,
    maxClockContinuityWrappedPhaseJump,
    hingeChartContinuityMatchedPairCount,
    maxHingeChartContinuityResidual,
    maxCausalEndpointToHingeChartResidual,
    continuityRoleCounts,
    unmatchedIncoming,
    unmatchedOutgoing,
    matches,
  };
}

function comparePairRowsByKey(left, right) {
  return left.pairKey.localeCompare(right.pairKey);
}

function comparePairMapCandidateMatches(left, right) {
  return (
    left.continuity.rank - right.continuity.rank ||
    left.outgoing.pairKey.localeCompare(right.outgoing.pairKey)
  );
}

function classifyBranchTransportPairMapContinuity(incoming, outgoing) {
  if (incoming.sourceLayer === outgoing.sourceLayer) {
    return {
      continuityRole: "same_source",
      continuityLayer: incoming.sourceLayer,
      rank: 0,
    };
  }
  if (incoming.receiverLayer === outgoing.receiverLayer) {
    return {
      continuityRole: "same_receiver",
      continuityLayer: incoming.receiverLayer,
      rank: 1,
    };
  }
  if (incoming.sourceLayer === outgoing.receiverLayer) {
    return {
      continuityRole: "source_to_receiver",
      continuityLayer: incoming.sourceLayer,
      rank: 2,
    };
  }
  if (incoming.receiverLayer === outgoing.sourceLayer) {
    return {
      continuityRole: "receiver_to_source",
      continuityLayer: incoming.receiverLayer,
      rank: 3,
    };
  }
  return null;
}

function projectBranchTransportPairMapMatch({
  incoming,
  outgoing,
  continuity,
  pairWitnesses,
  layerSpecsByLayer,
}) {
  const geometryContinuity = createBranchTransportPairMapGeometryContinuity({
    incoming,
    outgoing,
    continuity,
    pairWitnesses,
    layerSpecsByLayer,
  });
  return {
    incomingPairKey: incoming.pairKey,
    outgoingPairKey: outgoing.pairKey,
    continuityRole: continuity.continuityRole,
    continuityLayer: continuity.continuityLayer,
    incomingSourceLayer: incoming.sourceLayer,
    incomingReceiverLayer: incoming.receiverLayer,
    outgoingSourceLayer: outgoing.sourceLayer,
    outgoingReceiverLayer: outgoing.receiverLayer,
    sourceLayerRoute: `${incoming.sourceLayer}->${outgoing.sourceLayer}`,
    receiverLayerRoute: `${incoming.receiverLayer}->${outgoing.receiverLayer}`,
    geometryContinuity,
  };
}

function createBranchTransportPairMapGeometryContinuity({
  incoming,
  outgoing,
  continuity,
  pairWitnesses,
  layerSpecsByLayer,
}) {
  const continuityPointKind =
    continuity.continuityRole === "same_source"
      ? "sourcePoint"
      : continuity.continuityRole === "same_receiver"
        ? "receiverPoint"
        : null;
  const incomingRows = selectPairMapHingeEndpointRows({
    witness: pairWitnesses[incoming.pairKey],
    boundaryOrientation: "incomingBoundary",
  });
  const outgoingRows = selectPairMapHingeEndpointRows({
    witness: pairWitnesses[outgoing.pairKey],
    boundaryOrientation: "outgoingBoundary",
  });

  if (!continuityPointKind) {
    return {
      status: "geometry_continuity_cross_role_not_evaluated",
      pass: false,
      continuityPointKind: null,
      residualNorm: null,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      incomingEndpointCandidateCount: incomingRows.length,
      outgoingEndpointCandidateCount: outgoingRows.length,
    };
  }

  const comparisons = [];
  for (const incomingRow of incomingRows) {
    for (const outgoingRow of outgoingRows) {
      const incomingPoint = incomingRow.endpoint?.[continuityPointKind] ?? null;
      const outgoingPoint = outgoingRow.endpoint?.[continuityPointKind] ?? null;
      if (!isFiniteVector(incomingPoint) || !isFiniteVector(outgoingPoint)) {
        continue;
      }
      const residualVector = subtractVectors(incomingPoint, outgoingPoint);
      const residualNorm = vectorNorm(residualVector);
      comparisons.push({
        incomingEndpointKind: incomingRow.endpointKind,
        outgoingEndpointKind: outgoingRow.endpointKind,
        incomingRootKey: incomingRow.endpoint.rootKey,
        outgoingRootKey: outgoingRow.endpoint.rootKey,
        rootKeyMatched: incomingRow.endpoint.rootKey === outgoingRow.endpoint.rootKey,
        incomingHitTime: incomingRow.endpoint.hitTime,
        outgoingHitTime: outgoingRow.endpoint.hitTime,
        incomingEmissionTime: incomingRow.endpoint.emissionTime,
        outgoingEmissionTime: outgoingRow.endpoint.emissionTime,
        incomingPoint,
        outgoingPoint,
        incomingPairEndpointGeometry: createPairEndpointGeometry(
          incomingRow.endpoint
        ),
        outgoingPairEndpointGeometry: createPairEndpointGeometry(
          outgoingRow.endpoint
        ),
        residualVector,
        residualNorm,
        clockContinuity: createBranchTransportClockContinuity({
          incomingEndpoint: incomingRow.endpoint,
          outgoingEndpoint: outgoingRow.endpoint,
          continuity,
          layerSpecsByLayer,
        }),
        hingeChartContinuity: createBranchTransportHingeChartContinuity({
          incomingEndpoint: incomingRow.endpoint,
          outgoingEndpoint: outgoingRow.endpoint,
          continuity,
          layerSpecsByLayer,
        }),
      });
    }
  }
  const best = comparisons
    .slice()
    .sort(
      (left, right) =>
        Number(right.rootKeyMatched) - Number(left.rootKeyMatched) ||
        left.residualNorm - right.residualNorm
    )[0];

  if (!best) {
    return {
      status: "geometry_continuity_endpoint_rows_missing",
      pass: false,
      continuityPointKind,
      residualNorm: null,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      incomingEndpointCandidateCount: incomingRows.length,
      outgoingEndpointCandidateCount: outgoingRows.length,
    };
  }

  const pass = best.residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  return {
    status: pass
      ? "geometry_continuity_residual_within_tolerance"
      : "geometry_continuity_residual_exceeds_tolerance",
    pass,
    continuityPointKind,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    incomingEndpointCandidateCount: incomingRows.length,
    outgoingEndpointCandidateCount: outgoingRows.length,
    ...best,
  };
}

function createPairEndpointGeometry(endpoint) {
  if (!endpoint) {
    return null;
  }
  const sourcePoint = endpoint.sourcePoint ?? null;
  const receiverPoint = endpoint.receiverPoint ?? null;
  const pairDisplacementVector =
    isFiniteVector(sourcePoint) && isFiniteVector(receiverPoint)
      ? subtractVectors(receiverPoint, sourcePoint)
      : null;
  const pairDistance = isFiniteVector(pairDisplacementVector)
    ? vectorNorm(pairDisplacementVector)
    : null;
  const receiverRadialUnit =
    Number.isFinite(pairDistance) && pairDistance > ROOT_TOLERANCE
      ? scaleVector(pairDisplacementVector, 1 / pairDistance)
      : null;

  return {
    rootKey: endpoint.rootKey ?? null,
    hitTime: endpoint.hitTime ?? null,
    emissionTime: endpoint.emissionTime ?? null,
    sourceSegmentIndex: endpoint.sourceSegmentIndex ?? null,
    receiverSegmentIndex: endpoint.receiverSegmentIndex ?? null,
    sourcePoint,
    receiverPoint,
    pairDisplacementVector,
    pairDistance,
    receiverRadialUnit,
  };
}

function createBranchTransportClockContinuity({
  incomingEndpoint,
  outgoingEndpoint,
  continuity,
  layerSpecsByLayer,
}) {
  const layer = layerSpecsByLayer.get(continuity.continuityLayer);
  const clockTimeKind =
    continuity.continuityRole === "same_source"
      ? "emissionTime"
      : continuity.continuityRole === "same_receiver"
        ? "hitTime"
        : null;
  if (!layer || !clockTimeKind) {
    return {
      status: "clock_continuity_not_evaluated",
      pass: false,
      continuityLayer: continuity.continuityLayer,
      clockTimeKind,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  }
  const incomingClockTime = incomingEndpoint[clockTimeKind];
  const outgoingClockTime = outgoingEndpoint[clockTimeKind];
  if (!Number.isFinite(incomingClockTime) || !Number.isFinite(outgoingClockTime)) {
    return {
      status: "clock_continuity_time_missing",
      pass: false,
      continuityLayer: continuity.continuityLayer,
      clockTimeKind,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      incomingClockTime,
      outgoingClockTime,
    };
  }
  const clockTimeJump = incomingClockTime - outgoingClockTime;
  const phaseJump = layer.angularVelocity * clockTimeJump;
  const wrappedPhaseJump = wrapAngleToPi(phaseJump);
  const phaseCycleFraction = phaseJump / CLOSURE_PERIOD;
  const wrappedPhaseCycleFraction = wrappedPhaseJump / CLOSURE_PERIOD;
  const circularChordFromWrappedPhase =
    Math.abs(2 * layer.radius * Math.sin(wrappedPhaseJump / 2));
  const pass = Math.abs(clockTimeJump) <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;
  return {
    status: pass
      ? "clock_continuity_residual_within_tolerance"
      : "clock_continuity_residual_exceeds_tolerance",
    pass,
    continuityLayer: continuity.continuityLayer,
    clockTimeKind,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    angularVelocity: layer.angularVelocity,
    radius: layer.radius,
    incomingClockTime,
    outgoingClockTime,
    clockTimeJump,
    phaseJump,
    wrappedPhaseJump,
    phaseCycleFraction,
    wrappedPhaseCycleFraction,
    circularChordFromWrappedPhase,
  };
}

function createBranchTransportHingeChartContinuity({
  incomingEndpoint,
  outgoingEndpoint,
  continuity,
  layerSpecsByLayer,
}) {
  const layer = layerSpecsByLayer.get(continuity.continuityLayer);
  const causalEndpointPointKind =
    continuity.continuityRole === "same_source"
      ? "sourcePoint"
      : continuity.continuityRole === "same_receiver"
        ? "receiverPoint"
        : null;
  if (!layer || !causalEndpointPointKind) {
    return {
      status: "hinge_chart_continuity_not_evaluated",
      pass: false,
      coordinateKind: "hinge_time_layer_state",
      continuityLayer: continuity.continuityLayer,
      causalEndpointPointKind,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    };
  }
  if (!Number.isFinite(incomingEndpoint.hitTime) || !Number.isFinite(outgoingEndpoint.hitTime)) {
    return {
      status: "hinge_chart_continuity_hit_time_missing",
      pass: false,
      coordinateKind: "hinge_time_layer_state",
      continuityLayer: continuity.continuityLayer,
      causalEndpointPointKind,
      tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
      incomingHitTime: incomingEndpoint.hitTime,
      outgoingHitTime: outgoingEndpoint.hitTime,
    };
  }

  const incomingChartPoint = computeCircularLayerPoint(layer, incomingEndpoint.hitTime);
  const outgoingChartPoint = computeCircularLayerPoint(layer, outgoingEndpoint.hitTime);
  const residualVector = subtractVectors(incomingChartPoint, outgoingChartPoint);
  const residualNorm = vectorNorm(residualVector);
  const hitTimeJump = incomingEndpoint.hitTime - outgoingEndpoint.hitTime;
  const phaseJump = layer.angularVelocity * hitTimeJump;
  const wrappedPhaseJump = wrapAngleToPi(phaseJump);
  const incomingEndpointToChart = createEndpointToChartResidual({
    endpoint: incomingEndpoint,
    pointKind: causalEndpointPointKind,
    chartPoint: incomingChartPoint,
  });
  const outgoingEndpointToChart = createEndpointToChartResidual({
    endpoint: outgoingEndpoint,
    pointKind: causalEndpointPointKind,
    chartPoint: outgoingChartPoint,
  });
  const maxCausalEndpointToHingeChartResidual = maxFinite([
    incomingEndpointToChart.residualNorm,
    outgoingEndpointToChart.residualNorm,
  ]);
  const pass = residualNorm <= POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE;

  return {
    status: pass
      ? "hinge_chart_continuity_residual_within_tolerance"
      : "hinge_chart_continuity_residual_exceeds_tolerance",
    pass,
    coordinateKind: "hinge_time_layer_state",
    claimLevel:
      "candidate chart-coordinate diagnostic only; does not replace delayed causal endpoint continuity or retained residual rows",
    continuityLayer: continuity.continuityLayer,
    causalEndpointPointKind,
    tolerance: POINT_EVENT_TRANSPORT_GEOMETRY_TOLERANCE,
    angularVelocity: layer.angularVelocity,
    radius: layer.radius,
    incomingHitTime: incomingEndpoint.hitTime,
    outgoingHitTime: outgoingEndpoint.hitTime,
    hitTimeJump,
    phaseJump,
    wrappedPhaseJump,
    incomingChartPoint,
    outgoingChartPoint,
    residualVector,
    residualNorm,
    incomingEndpointToChart,
    outgoingEndpointToChart,
    maxCausalEndpointToHingeChartResidual,
  };
}

function createEndpointToChartResidual({ endpoint, pointKind, chartPoint }) {
  const point = endpoint?.[pointKind] ?? null;
  if (!isFiniteVector(point) || !isFiniteVector(chartPoint)) {
    return {
      status: "endpoint_to_hinge_chart_point_missing",
      pointKind,
      residualNorm: null,
    };
  }
  const residualVector = subtractVectors(point, chartPoint);
  return {
    status: "endpoint_to_hinge_chart_residual_populated",
    pointKind,
    point,
    chartPoint,
    residualVector,
    residualNorm: vectorNorm(residualVector),
  };
}

function wrapAngleToPi(angle) {
  if (!Number.isFinite(angle)) {
    return angle;
  }
  let wrapped = ((angle + Math.PI) % CLOSURE_PERIOD + CLOSURE_PERIOD) % CLOSURE_PERIOD - Math.PI;
  if (wrapped === -Math.PI) {
    wrapped = Math.PI;
  }
  return wrapped;
}

function selectPairMapHingeEndpointRows({ witness, boundaryOrientation }) {
  const rows = [];
  for (const edge of witness?.edges ?? []) {
    if (edge.boundaryOrientation !== boundaryOrientation) {
      continue;
    }
    const endpointKind =
      boundaryOrientation === "incomingBoundary" ? "nextEndpoint" : "priorEndpoint";
    for (const transition of edge.retainedTransitions ?? []) {
      const endpoint = transition[endpointKind] ?? null;
      if (endpoint) {
        rows.push({ endpointKind, endpoint });
      }
    }
  }
  return rows;
}

function summarizeLayerTransportIncidence(layer, role, pairRows) {
  const totals = createEmptyBoundaryOrientationCounts();
  for (const row of pairRows) {
    addBoundaryOrientationCounts(totals, row.orientationCounts);
  }
  const hasLeftBoundary = totals.incomingBoundary > 0 || totals.pointDegenerateBoundary > 0;
  const hasRightBoundary = totals.outgoingBoundary > 0 || totals.pointDegenerateBoundary > 0;
  const pass = pairRows.length > 0 && hasLeftBoundary && hasRightBoundary && totals.interior === 0;
  return {
    layer,
    role,
    status: pass
      ? "layer_role_two_sided_boundary_support_populated"
      : "layer_role_two_sided_boundary_support_missing",
    pass,
    pairCount: pairRows.length,
    hasLeftBoundary,
    hasRightBoundary,
    orientationCounts: totals,
  };
}

function createBoundaryOrientationCounts(edges, time) {
  const counts = createEmptyBoundaryOrientationCounts();
  if (edges.length === 0) {
    counts.missing += 1;
    return counts;
  }
  for (const edge of edges) {
    counts[classifyHingeBoundaryOrientation(edge, time)] += 1;
  }
  return counts;
}

function createEmptyBoundaryOrientationCounts() {
  return {
    incomingBoundary: 0,
    outgoingBoundary: 0,
    pointDegenerateBoundary: 0,
    interior: 0,
    missing: 0,
  };
}

function addBoundaryOrientationCounts(total, next) {
  total.incomingBoundary += next.incomingBoundary;
  total.outgoingBoundary += next.outgoingBoundary;
  total.pointDegenerateBoundary += next.pointDegenerateBoundary;
  total.interior += next.interior;
  total.missing += next.missing;
}

function classifyHingeBoundaryOrientation(edge, time) {
  const startsAtPoint = Math.abs(edge.start - time) <= ROOT_TOLERANCE;
  const endsAtPoint = Math.abs(edge.end - time) <= ROOT_TOLERANCE;
  if (startsAtPoint && endsAtPoint) {
    return "pointDegenerateBoundary";
  }
  if (endsAtPoint) {
    return "incomingBoundary";
  }
  if (startsAtPoint) {
    return "outgoingBoundary";
  }
  if (edge.start + ROOT_TOLERANCE < time && time < edge.end - ROOT_TOLERANCE) {
    return "interior";
  }
  return "missing";
}

function hitTimeIntervalContains(edge, time) {
  return edge.start - ROOT_TOLERANCE <= time && time <= edge.end + ROOT_TOLERANCE;
}

function classifyHingeIncidence(edge, time) {
  return Math.abs(edge.start - time) <= ROOT_TOLERANCE ||
    Math.abs(edge.end - time) <= ROOT_TOLERANCE
    ? "boundary"
    : "interior";
}

function unionRootKeys(values) {
  return [...new Set(values)].sort((left, right) => left - right);
}

function projectRetainedHingeWitnessEdge(edge, time) {
  return {
    start: edge.start,
    end: edge.end,
    boundaryOrientation: classifyHingeBoundaryOrientation(edge, time),
    prior: edge.prior,
    next: edge.next,
    retainedRootKeys: edge.retainedRootKeys,
    retainedTransitions: edge.retainedTransitions,
  };
}

function intersectHitTimeIntervalSets(leftIntervals, rightIntervals) {
  const intersections = [];
  for (const left of leftIntervals) {
    for (const right of rightIntervals) {
      const start = Math.max(left.start, right.start);
      const end = Math.min(left.end, right.end);
      if (end + ROOT_TOLERANCE >= start) {
        intersections.push({ start, end: Math.max(end, start) });
      }
    }
  }
  return mergeHitTimeIntervals(intersections);
}

function extendRetainedChain({
  currentRetainedChain,
  prior,
  next,
  retainedNextRootKeys,
}) {
  const retainedNextKeySet = new Set(retainedNextRootKeys);
  if (currentRetainedChain) {
    const commonRootKeys = intersectRootKeySets(currentRetainedChain.commonRootKeys, retainedNextKeySet);
    if (commonRootKeys.size > 0) {
      return {
        startHitTime: currentRetainedChain.startHitTime,
        endHitTime: next.hitTime,
        startSourceSegmentIndex: currentRetainedChain.startSourceSegmentIndex,
        startReceiverSegmentIndex: currentRetainedChain.startReceiverSegmentIndex,
        endSourceSegmentIndex: next.sourceSegmentIndex,
        endReceiverSegmentIndex: next.receiverSegmentIndex,
        edgeCount: currentRetainedChain.edgeCount + 1,
        snapshotCount: currentRetainedChain.snapshotCount + 1,
        commonRootKeys,
      };
    }
  }
  return {
    startHitTime: prior.hitTime,
    endHitTime: next.hitTime,
    startSourceSegmentIndex: prior.sourceSegmentIndex,
    startReceiverSegmentIndex: prior.receiverSegmentIndex,
    endSourceSegmentIndex: next.sourceSegmentIndex,
    endReceiverSegmentIndex: next.receiverSegmentIndex,
    edgeCount: 1,
    snapshotCount: 2,
    commonRootKeys: retainedNextKeySet,
  };
}

function createEmptyRetainedChainSummary() {
  return {
    edgeCount: 0,
    snapshotCount: 0,
    startHitTime: null,
    endHitTime: null,
    startSourceSegmentIndex: null,
    startReceiverSegmentIndex: null,
    endSourceSegmentIndex: null,
    endReceiverSegmentIndex: null,
    commonRootKeyCount: 0,
    commonRootKeys: [],
  };
}

function projectRetainedChainSummary(chain) {
  return {
    edgeCount: chain.edgeCount,
    snapshotCount: chain.snapshotCount,
    startHitTime: chain.startHitTime,
    endHitTime: chain.endHitTime,
    startSourceSegmentIndex: chain.startSourceSegmentIndex,
    startReceiverSegmentIndex: chain.startReceiverSegmentIndex,
    endSourceSegmentIndex: chain.endSourceSegmentIndex,
    endReceiverSegmentIndex: chain.endReceiverSegmentIndex,
    commonRootKeyCount: chain.commonRootKeys.size,
    commonRootKeys: [...chain.commonRootKeys].sort((left, right) => left - right).slice(0, 12),
  };
}

function compareBinaryToBinarySnapshotsForTransition(left, right) {
  return (
    left.hitTime - right.hitTime ||
    left.sourceSegmentIndex - right.sourceSegmentIndex ||
    left.receiverSegmentIndex - right.receiverSegmentIndex
  );
}

function intersectRootKeySets(left, right) {
  const intersection = new Set();
  for (const value of left) {
    if (right.has(value)) {
      intersection.add(value);
    }
  }
  return intersection;
}

function projectTransitionEdgeSample({ pairKey, prior, next, transitionResponse }) {
  const kindCounts = {};
  for (const transition of transitionResponse.transitions) {
    kindCounts[transition.kind] = (kindCounts[transition.kind] ?? 0) + 1;
  }
  return {
    pairKey,
    prior: {
      hitTime: prior.hitTime,
      sourceSegmentIndex: prior.sourceSegmentIndex,
      receiverSegmentIndex: prior.receiverSegmentIndex,
      activeRootKeys: prior.activeRootKeys,
    },
    next: {
      hitTime: next.hitTime,
      sourceSegmentIndex: next.sourceSegmentIndex,
      receiverSegmentIndex: next.receiverSegmentIndex,
      activeRootKeys: next.activeRootKeys,
    },
    transitionCount: transitionResponse.transitions.length,
    kindCounts,
    status: transitionResponse.status,
  };
}

function createEmptyBinaryPairSummaries(selectedCase) {
  const summaries = {};
  for (const sourceLayer of selectedCase.layers.map((row) => row.layer)) {
    for (const receiverLayer of selectedCase.layers.map((row) => row.layer)) {
      summaries[`${sourceLayer}->${receiverLayer}`] = {
        sourceLayer,
        receiverLayer,
        candidateDetailCount: 0,
        detailRowCount: 0,
        activeRootDetailCount: 0,
        inactiveGapRowCount: 0,
        inactiveGapMarginStats: createIntervalWidthStats(),
        transitionRowCount: 0,
        failureRowCount: 0,
      };
    }
  }
  return summaries;
}

function finalizeBinaryPairSummaries(pairSummaries) {
  const finalized = {};
  for (const [pairKey, summary] of Object.entries(pairSummaries)) {
    const { inactiveGapMarginStats, ...rest } = summary;
    finalized[pairKey] = {
      ...rest,
      inactiveGapMargins: finalizeIntervalWidthStats(inactiveGapMarginStats),
    };
  }
  return finalized;
}

function createIntervalWidthStats() {
  return {
    count: 0,
    nonfiniteCount: 0,
    minWidth: null,
    maxWidth: null,
    sumWidth: 0,
  };
}

function appendIntervalWidthStats(stats, row) {
  const width = row.intervalEnd - row.intervalStart;
  if (!Number.isFinite(width) || width < 0) {
    stats.nonfiniteCount += 1;
    return;
  }
  stats.count += 1;
  stats.sumWidth += width;
  stats.minWidth = stats.minWidth == null ? width : Math.min(stats.minWidth, width);
  stats.maxWidth = stats.maxWidth == null ? width : Math.max(stats.maxWidth, width);
}

function finalizeIntervalWidthStats(stats) {
  return {
    status:
      stats.count > 0
        ? stats.nonfiniteCount > 0
          ? "inactive_gap_margins_populated_with_nonfinite_rows"
          : "inactive_gap_margins_populated"
        : "no_inactive_gap_rows",
    count: stats.count,
    nonfiniteCount: stats.nonfiniteCount,
    minWidth: stats.minWidth,
    maxWidth: stats.maxWidth,
    meanWidth: stats.count > 0 ? stats.sumWidth / stats.count : null,
  };
}

function createBinaryToBinaryPathHistoryRows(layers) {
  const layerPathKeys = {
    outer: 3101,
    middle: 3102,
    inner: 3103,
  };
  const pathRows = [];
  let maxPathErrorBound = 0;
  for (const layer of layers) {
    const pathKey = layerPathKeys[layer.layer];
    const step = CLOSURE_PERIOD / BINARY_TO_BINARY_PATH_SEGMENT_COUNT;
    for (let index = 0; index < BINARY_TO_BINARY_PATH_SEGMENT_COUNT; index += 1) {
      const startTime = index * step;
      const endTime = (index + 1) * step;
      const start = computeCircularLayerPoint(layer, startTime);
      const end = computeCircularLayerPoint(layer, endTime);
      const velocity = scaleVector(subtractVectors(end, start), 1 / step);
      const { errorBound } = computeCircularLayerPathSegmentErrorBound(layer);
      maxPathErrorBound = Math.max(maxPathErrorBound, errorBound);
      pathRows.push({
        pathKey,
        segmentIndex: pathRows.length,
        startTime,
        endTime,
        start,
        velocity,
        errorBound,
        stateFlags: layerCode(layer.layer),
      });
    }
  }
  return { pathRows, layerPathKeys, maxPathErrorBound };
}

function summarizeBinaryPathHistoryPairs({
  selectedCase,
  layerPathKeys,
  candidates,
  refinement,
  ledgerDetailReplay,
}) {
  const layerByPathKey = new Map(
    Object.entries(layerPathKeys).map(([layer, pathKey]) => [pathKey, layer])
  );
  const summaries = {};
  for (const sourceLayer of selectedCase.layers.map((row) => row.layer)) {
    for (const receiverLayer of selectedCase.layers.map((row) => row.layer)) {
      summaries[`${sourceLayer}->${receiverLayer}`] = {
        sourceLayer,
        receiverLayer,
        candidateCount: 0,
        sampledHitCandidateCount: 0,
        attemptedCandidateCount: 0,
        rootCount: 0,
        hitCount: 0,
      };
    }
  }
  for (const candidate of candidates.candidates) {
    const sourceLayer = layerByPathKey.get(candidate.sourcePathKey) ?? "unknown";
    const receiverLayer = layerByPathKey.get(candidate.receiverPathKey) ?? "unknown";
    const key = `${sourceLayer}->${receiverLayer}`;
    const summary = summaries[key];
    if (!summary) {
      continue;
    }
    summary.candidateCount += 1;
    if (candidate.narrowPhaseEstimate?.classification === "sampled_hit") {
      summary.sampledHitCandidateCount += 1;
    }
  }
  for (const item of refinement.items) {
    const sourceLayer = layerByPathKey.get(item.sourcePathKey) ?? "unknown";
    const receiverLayer = layerByPathKey.get(item.receiverPathKey) ?? "unknown";
    const key = `${sourceLayer}->${receiverLayer}`;
    const summary = summaries[key];
    if (!summary) {
      continue;
    }
    if (item.status?.code !== "skipped") {
      summary.attemptedCandidateCount += 1;
    }
    summary.rootCount += item.rootCount ?? 0;
    summary.hitCount += item.hitCount ?? 0;
  }
  for (const [pairKey, replay] of Object.entries(ledgerDetailReplay.pairSummaries)) {
    if (!summaries[pairKey]) {
      continue;
    }
    summaries[pairKey].candidateDetailCount = replay.candidateDetailCount;
    summaries[pairKey].detailRowCount = replay.detailRowCount;
    summaries[pairKey].activeRootDetailCount = replay.activeRootDetailCount;
    summaries[pairKey].inactiveGapRowCount = replay.inactiveGapRowCount;
    summaries[pairKey].inactiveGapMargins = replay.inactiveGapMargins;
    summaries[pairKey].transitionRowCount = replay.transitionRowCount;
    summaries[pairKey].failureRowCount = replay.failureRowCount;
  }
  return summaries;
}

function pathHistoryRowToCausalSegment(row) {
  return {
    startTime: row.startTime,
    endTime: row.endTime,
    positionAtStart: row.start,
    velocity: row.velocity,
    errorBound: row.errorBound,
  };
}

async function createLayerTimeWindowTorqueStream({
  client,
  selectedCase,
  family,
  layer,
  endpointRow,
  sampleGrid,
}) {
  if (!endpointRow) {
    return {
      layer: layer.layer,
      rowId: null,
      sampleStatus: "missing_endpoint_row",
      rootContinuationStatus: "missing_endpoint_row",
      samples: [],
      torqueIntegral: null,
      mechanicalEndpointIncrement: null,
      torqueResidual: null,
      torqueResidualNorm: null,
    };
  }
  const endpointRootId = endpointRow.root?.rootId ?? 0;
  const samples = [];
  let torqueIntegral = zeroVector();
  for (const sample of sampleGrid) {
    const response = await client.solveCircularSourceRootsHitsLedgerF64(
      createCircularSourceRequest({
        policy: selectedCase.policy,
        f: selectedCase.f,
        family,
        layer,
        hitTime: sample.time,
      })
    );
    const root =
      (response.roots ?? []).find((row) => row.rootId === endpointRootId) ??
      (response.roots ?? [])[0] ??
      null;
    const detail = root
      ? findRootLedgerDetailForRoot(response.rootLedgerDetails ?? [], root, 0)
      : null;
    const torqueRow = root
      ? createTorqueDiagnosticRow({
          ...endpointRow,
          root,
          rootLedgerDetail: detail,
        })
      : null;
    if (torqueRow?.receiverTorque) {
      torqueIntegral = addVectors(
        torqueIntegral,
        scaleVector(torqueRow.receiverTorque, sample.weight)
      );
    }
    samples.push({
      sampleIndex: sample.index,
      hitTime: sample.time,
      quadratureWeight: sample.weight,
      rowId: endpointRow.rowId,
      rootContinuationLabel: `${endpointRow.rowId}:rank-${endpointRootId}`,
      rootId: root?.rootId ?? null,
      rootCount: response.roots?.length ?? 0,
      activeRootDetailCount:
        response.rootLedgerDetails?.filter((row) => row.entryKind === 1).length ?? 0,
      residual: root?.residual ?? null,
      jacobian: root?.jacobian ?? null,
      receiverTorque: torqueRow?.receiverTorque ?? null,
      receiverTorqueNorm: torqueRow?.receiverTorqueNorm ?? null,
      status: torqueRow?.status ?? "missing_root",
    });
  }
  const mechanicalEndpointIncrement = computeMechanicalEndpointIncrementForLayer({
    layer,
    start: 0,
    end: CLOSURE_PERIOD,
  });
  const torqueResidual = subtractVectors(mechanicalEndpointIncrement, torqueIntegral);
  const sampleStatus = samples.every(
    (sample) => sample.status === "instantaneous_torque_diagnostic_populated"
  )
    ? "complete"
    : "incomplete";
  const rootIds = new Set(samples.map((sample) => sample.rootId));
  const rootCounts = new Set(samples.map((sample) => sample.rootCount));
  const rootCountValues = [...rootCounts].sort((left, right) => left - right);
  const rootContinuationStatus =
    rootIds.size === 1 && rootIds.has(endpointRootId)
      ? rootCounts.size === 1 && rootCounts.has(1)
        ? "rank_zero_continuation_sampled_not_retained"
        : "rank_zero_continuation_sampled_with_competitor_roots_not_retained"
      : "rank_zero_continuation_incomplete_or_relabelled";
  return {
    layer: layer.layer,
    rowId: endpointRow.rowId,
    sampleStatus,
    rootContinuationStatus,
    coefficientConvention:
      "mu_arch is set to 1 for the mechanical endpoint diagnostic and mu_arch*kappa*|q_source*q_receiver|*sigma is set to +1 for each force-like torque sample",
    endpointRootId,
    rootContinuationLabel: `${endpointRow.rowId}:rank-${endpointRootId}`,
    torqueQuadratureWeights: sampleGrid.map((sample) => sample.weight),
    torqueIntegral,
    mechanicalEndpointIncrement,
    torqueResidual,
    torqueResidualNorm: vectorNorm(torqueResidual),
    rootCountValues,
    samples,
  };
}

function createTimeWindowQuadratureGrid({ start, end, sampleCount }) {
  if (!Number.isInteger(sampleCount) || sampleCount < 2) {
    throw new Error("time-window torque sample count must be an integer greater than one.");
  }
  const step = (end - start) / (sampleCount - 1);
  return Array.from({ length: sampleCount }, (_, index) => ({
    index,
    time: start + step * index,
    weight: index === 0 || index === sampleCount - 1 ? step / 2 : step,
  }));
}

function computeMechanicalEndpointIncrementForLayer({ layer, start, end }) {
  return subtractVectors(
    computeCircularLayerAngularMomentum(layer, end),
    computeCircularLayerAngularMomentum(layer, start)
  );
}

function computeCircularLayerAngularMomentum(layer, time) {
  const position = computeCircularLayerPoint(layer, time);
  const velocity = computeCircularLayerVelocity(layer, time);
  return crossVectors(position, velocity);
}

function computeCircularLayerVelocity(layer, time) {
  const phase = layer.angularVelocity * time + layer.phaseAtEpoch;
  return {
    x: -layer.radius * layer.angularVelocity * Math.sin(phase),
    y: layer.radius * layer.angularVelocity * Math.cos(phase),
    z: 0,
  };
}

function computeCircularLayerPoint(layer, time) {
  const phase = layer.angularVelocity * time + layer.phaseAtEpoch;
  return {
    x: layer.radius * Math.cos(phase),
    y: layer.radius * Math.sin(phase),
    z: 0,
  };
}

function computeCircularLayerPathSegmentErrorBound(
  layer,
  segmentCount = BINARY_TO_BINARY_PATH_SEGMENT_COUNT
) {
  const step = CLOSURE_PERIOD / segmentCount;
  const angularSpan =
    layer && Number.isFinite(layer.angularVelocity)
      ? Math.abs(layer.angularVelocity * step)
      : null;
  const errorBound =
    layer &&
    Number.isFinite(layer.radius) &&
    Number.isFinite(angularSpan)
      ? Math.abs(layer.radius) *
          Math.max(0, 1 - Math.cos(Math.min(angularSpan, Math.PI) / 2)) +
        1e-12
      : null;
  return {
    step,
    angularSpan,
    errorBound,
  };
}

function computeCircularLayerPathSegmentReplayPoint(
  layer,
  time,
  segmentCount = BINARY_TO_BINARY_PATH_SEGMENT_COUNT
) {
  if (!layer || !Number.isFinite(time) || !Number.isFinite(segmentCount)) {
    return null;
  }
  const step = CLOSURE_PERIOD / segmentCount;
  const normalizedTime =
    ((time % CLOSURE_PERIOD) + CLOSURE_PERIOD) % CLOSURE_PERIOD;
  const segmentIndex = Math.min(
    segmentCount - 1,
    Math.floor(normalizedTime / step)
  );
  const segmentStartTime = segmentIndex * step;
  const segmentEndTime = (segmentIndex + 1) * step;
  const interpolationFraction = (normalizedTime - segmentStartTime) / step;
  const segmentStartPoint = computeCircularLayerPoint(layer, segmentStartTime);
  const segmentEndPoint = computeCircularLayerPoint(layer, segmentEndTime);
  return {
    segmentIndex,
    segmentStartTime,
    segmentEndTime,
    interpolationFraction,
    segmentStartPoint,
    segmentEndPoint,
    point: addVectors(
      segmentStartPoint,
      scaleVector(
        subtractVectors(segmentEndPoint, segmentStartPoint),
        interpolationFraction
      )
    ),
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
      "The runner now emits solver-backed reduced rows, sampled active-row lineage, phase-at-hit rows, a branch-chart projection, a selected fixed-receiver time-window torque diagnostic, binary-to-binary path-history roots/hits, replayed binary-to-binary root-ledger-detail rows, solver root-key transition classification, inactive-gap margins, retained hit-time coverage, common hinge-point candidates, point-event witnesses, candidate point-event admissibility rows, candidate branch-transport incidence rows, a candidate branch-transport pair-map, a middle field-speed hinge-capture diagnostic, a fail-closed retained-chart feasibility diagnostic, a complete route-payload diagnostic, a route-authorized wake-charge/domain target, an action-kernel normalization-convention candidate, accepted chart-restricted crossing-domain rows, a least-norm route-gradient candidate, a finite endpoint-clear kernel-gradient candidate evaluation, a Master-Equation characteristic-tail pair-radial pullback target, a side-split radial-constrained boundary-charge solve, a delta_eta(g) quadrature target, a single-coefficient sign-pattern candidate, a layer-polarity assignment candidate, a source/receiver polarity row-binding candidate, an accepted normalized action-kernel wake charge, an accepted retained crossing-domain pullback, a populated wake-energy increment target, a finite-Gaussian endpoint-clearance gauge repair, a normalized action-boundary derivative history integral, an exact reduced four-substep transaction-frequency certificate, a physical retained provider-transport law diagnostic, and partial retained chains, but promotion still requires an accepted retained point-event rule or a positive-width common retained time domain plus common active-row identity across force, torque, wake, partition, phase, stability, accepted layer-polarity assignment, accepted source/receiver polarity metadata, a sigma*hbar action scale, an accepted omega_tx source or energy route, an accepted action-boundary wake-energy increment law, vector-ledger, and energy-routing rows.",
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

function addVectors(left, right) {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function crossVectors(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function rotateVectorZ(vector, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: vector.x * cos - vector.y * sin,
    y: vector.x * sin + vector.y * cos,
    z: vector.z,
  };
}

function dotVectors(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function zeroVector() {
  return { x: 0, y: 0, z: 0 };
}

function vectorNorm(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function isFiniteVector(vector) {
  return (
    vector &&
    Number.isFinite(vector.x) &&
    Number.isFinite(vector.y) &&
    Number.isFinite(vector.z)
  );
}

function maxFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.max(...finiteValues) : null;
}

function minFinite(values) {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  return finiteValues.length > 0 ? Math.min(...finiteValues) : null;
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
