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
  const hingeEventRowSetIdentity = createHingeEventRowSetIdentity({
    hingePoint,
    allPairsWitnessed,
    commonRootKeyList,
    pairWitnesses,
    retainedRowSetIdentity,
  });
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
  timeWindowTorqueProbe,
  cleanEnergyFrequencyTarget = null,
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
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
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
  timeWindowTorqueProbe,
  cleanEnergyFrequencyTarget,
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
      omegaStarWeightedBoundaryCharge,
      omegaStar,
      targetChargeNorm,
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
    rootEnergyDiagnosticRowCount: rootEnergyDiagnosticRows.length,
    rootEnergyDiagnosticSum,
    maxRootEnergyDiagnosticIncrement: maxFinite(rootEnergyIncrements),
    actionBoundaryDerivativeTarget,
    actionBoundaryWakeEnergyLawCandidate,
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

function createActionBoundaryWakeEnergyLawCandidate({
  actionBoundaryDerivativeTarget,
  compensatedRoutePayloadCertificate,
  cleanEnergyFrequencyTarget,
  omegaStarWeightedBoundaryCharge,
  omegaStar,
  targetChargeNorm,
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
  const omegaTxLawSearchTarget = createOmegaTxLawSearchTarget({
    cleanEnergyFrequencyTarget,
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
      ? omegaTxLawSearchAccepted && actionScaleLawSearchAccepted
        ? "action_boundary_wake_energy_law_candidate_has_simple_action_scale_candidate_pending_orientation_and_omega_tx_acceptance"
        : !omegaTxLawSearchAccepted && !actionScaleLawSearchAccepted
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
    signedActionScaleForOmegaStarTarget,
    positiveActionScaleForOmegaStarMagnitude,
    requiredEnergyOrientation,
    actionScaleLawSearchStatus: actionScaleLawSearchTarget.status,
    actionScaleLawSearchTarget,
    omegaTxLawSearchStatus: omegaTxLawSearchTarget.status,
    omegaTxLawSearchTarget,
    unitActionResidualAgainstOmegaStar,
    magnitudeResidualAgainstOmegaStar,
    missingAcceptedFields: [
      "accepted_sigma_hbar_action_scale",
      "accepted_energy_orientation",
      "accepted_omega_tx_or_energy_target",
      "accepted_wake_energy_increment_law",
    ],
    retainedLimitation:
      "This candidate measures the action scale that would make the evaluated action-boundary derivative agree with the omega_* boundary-charge comparison. It does not accept omega_* as omega_tx, choose the energy orientation, or derive sigma*hbar.",
  };
}

function createOmegaTxLawSearchTarget({
  cleanEnergyFrequencyTarget,
  compensatedRoutePayloadCertificate,
}) {
  const targetOmegaTx = cleanEnergyFrequencyTarget?.omegaStar ?? null;
  const candidateRows = createOmegaTxLawCandidateRows({
    cleanEnergyFrequencyTarget,
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

  return {
    schema: "aaa-tri-binary-omega-tx-law-search-target.v1",
    status: !Number.isFinite(targetOmegaTx)
      ? "omega_tx_law_search_blocked_until_clean_frequency_target"
      : finiteRows.length === 0
      ? "omega_tx_law_search_no_finite_candidates"
      : acceptedRows.length > 0
      ? "omega_tx_law_search_simple_candidate_accepted"
      : exactIneligibleRows.length > 0
      ? "omega_tx_law_search_clean_target_identity_only_no_route_local_candidate_accepted"
      : "omega_tx_law_search_no_simple_route_local_candidate_accepted",
    claimLevel:
      "simple route-local transaction-frequency law search for the evaluated wake-energy comparison; not accepted omega_tx",
    targetOmegaTx,
    cleanEnergyFrequencyTargetStatus:
      cleanEnergyFrequencyTarget?.status ?? null,
    acceptedOmegaTxLawPass: acceptedRows.length > 0,
    candidateCount: candidateRows.length,
    finiteCandidateCount: finiteRows.length,
    acceptedCandidateCount: acceptedRows.length,
    exactIneligibleCount: exactIneligibleRows.length,
    bestRejectedCandidate,
    exactIneligibleRows,
    acceptedRows,
    rows: candidateRows,
    retainedLimitation:
      "This search treats the clean weighted omega_* expression as the comparison target, not independent omega_tx evidence. Acceptance requires a separate route-local frequency law on the retained rows.",
  };
}

function createOmegaTxLawCandidateRows({
  cleanEnergyFrequencyTarget,
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

function evaluateGaussianHistoryIntegral({ hPlus, upper, u, eta, power }) {
  if (
    !Number.isFinite(hPlus) ||
    !Number.isFinite(upper) ||
    !Number.isFinite(u) ||
    !Number.isFinite(eta) ||
    !Number.isFinite(power) ||
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
  const steps = 512;
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
  const retainedChartFeasibility = createMiddleFieldSpeedRetainedChartFeasibility({
    candidateCapturePass,
    geometryTransportPass,
    middleContinuityMatches,
    hingeEventRowSetIdentity,
    retainedRowSetIdentity,
    retainedTimeDomainCoverage,
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
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
    timeWindowTorqueProbe,
    cleanEnergyFrequencyTarget,
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
      const angularSpan = Math.abs(layer.angularVelocity * step);
      const errorBound =
        Math.abs(layer.radius) * Math.max(0, 1 - Math.cos(Math.min(angularSpan, Math.PI) / 2)) +
        1e-12;
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
      "The runner now emits solver-backed reduced rows, sampled active-row lineage, phase-at-hit rows, a branch-chart projection, a selected fixed-receiver time-window torque diagnostic, binary-to-binary path-history roots/hits, replayed binary-to-binary root-ledger-detail rows, solver root-key transition classification, inactive-gap margins, retained hit-time coverage, common hinge-point candidates, point-event witnesses, candidate point-event admissibility rows, candidate branch-transport incidence rows, a candidate branch-transport pair-map, a middle field-speed hinge-capture diagnostic, a fail-closed retained-chart feasibility diagnostic, a complete route-payload diagnostic, a route-authorized wake-charge/domain target, an action-kernel normalization-convention candidate, accepted chart-restricted crossing-domain rows, a least-norm route-gradient candidate, a finite endpoint-clear kernel-gradient candidate evaluation, a Master-Equation characteristic-tail pair-radial pullback target, a side-split radial-constrained boundary-charge solve, a delta_eta(g) quadrature target, a single-coefficient sign-pattern candidate, a layer-polarity assignment candidate, a source/receiver polarity row-binding candidate, an accepted normalized action-kernel wake charge, an accepted retained crossing-domain pullback, a populated wake-energy increment target, a finite-Gaussian endpoint-clearance gauge repair, a normalized action-boundary derivative history integral, and partial retained chains, but promotion still requires an accepted retained point-event rule or a positive-width common retained time domain plus common active-row identity across force, torque, wake, partition, phase, stability, accepted layer-polarity assignment, accepted source/receiver polarity metadata, a sigma*hbar action scale, an accepted action-boundary wake-energy increment law, vector-ledger, and energy-routing rows.",
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
