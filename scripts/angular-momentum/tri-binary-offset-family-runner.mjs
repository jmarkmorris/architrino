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
  const receiverDistance = 2.5;
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
      positionAtStart: { x: receiverDistance, y: 0, z: 0 },
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

function projectLayerSolverRow({ layer, rootLedgerResponse }) {
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
      })),
      activeDetails: activeDetails.map((row) => ({
        rootId: row.rootId,
        entryKind: row.entryKind,
        jacobianSignStratum: row.jacobianSignStratum,
        iterationCount: row.iterationCount,
        intervalStart: row.intervalStart,
        intervalEnd: row.intervalEnd,
        residual: row.residual,
        normalizedResidual: row.normalizedResidual,
        rootTolerance: row.rootTolerance,
      })),
    },
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
  const byLayer = new Map(layers.map((row) => [row.layer, row]));
  const innerOffsetFromMiddle = family.indices.inner - family.indices.middle;
  const rootChartProxyPass =
    rowVerdicts.rootLedgerPopulation.pass === true && rowVerdicts.jacobianFloor.pass === true;
  const allReducedRowsPass = Object.values(rowVerdicts).every((row) => row.pass === true);

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
      blocked: [`${policy}:${family.id}:f${f}`],
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
      r_rows: "blocked",
      r_root: rootChartProxyPass ? "partial_proxy_pass" : "partial_proxy_fail",
      r_phi: rowVerdicts.cyclePhaseClosure.pass ? "blocked_with_cycle_proxy_pass" : "blocked",
      r_stab: "blocked",
      r_pull: "blocked",
      r_part: "blocked",
      r_route: "blocked",
    },
  };
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

function createReportBranchChartProjection(cases) {
  const populatedRowCounts = {};
  const blockedRowCounts = {};
  let reducedPassCases = 0;
  let selfRootParityProxyMatches = 0;
  for (const item of cases) {
    if (item.branchChartProjection?.reducedRowsPass) {
      reducedPassCases += 1;
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

function createClosureSummary(cases) {
  const projection = createReportBranchChartProjection(cases);
  return {
    status: "not_closed",
    retainedBranchClaim: false,
    reason:
      "The runner now emits solver-backed reduced rows and a branch-chart projection, but promotion still requires a retained branch chart with common active-row lineage, phase, vector-ledger, energy-routing, torque, wake, and stability rows.",
    reducedPassCases: projection.reducedPassCases,
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
