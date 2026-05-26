import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget as buildH39Reducer,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";

import {
  H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA,
  buildH39SharedDomainPrimitiveDiagnostic,
  validateH39SharedDomainPrimitiveDiagnostic,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs";

const CLOSING_PRIMITIVE_BOUNDS = {
  centerResidualBound: 0.1,
  centerJacobianLowerBound: 5,
  jacobianLipschitzBound: 0.1,
  rhoX: 3,
  rX: 2,
  mGBound: 1e12,
  rootTangentNumeratorBound: 9.4,
};

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-h39-shared-domain-primitive-diagnostic.mjs"
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("h39 shared-domain primitive diagnostic validates minimal missing-bound report", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic();

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(packet.schema, H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA);
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.reducer_check.valid, true);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "open-missing-primitive-bounds"
  );
  assert.deepEqual(
    packet.shared_domain_diagnostic_summary.missing_explicit_primitive_bounds,
    ["E_R", "nu_J", "L_J", "rho_X", "r_X", "M_G", "M_R"]
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(packet.claim_boundary.retained_branch, false);
  assert.equal(packet.result.retained_branch, false);
});

test("h39 shared-domain primitive diagnostic replays supplied bounds without provenance overclaim", () => {
  const packet =
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS);
  const reducer = buildH39Reducer(CLOSING_PRIMITIVE_BOUNDS);
  const reducerSummary =
    reducer.root_tangent_cauchy_majorant_tail_budget_summary;
  const summary = packet.shared_domain_diagnostic_summary;

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(summary.root_graph_lift_status, "rouche-certified");
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim,
    reducerSummary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
  );
  assert.equal(
    summary.rouche_form_admissible_M_R_ceiling,
    reducerSummary.rouche_form_admissible_M_R_ceiling
  );
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_below_one,
    true
  );
  assert.equal(
    summary.diagnostic_decision,
    "open-shared-domain-not-certified"
  );
  assert.equal(
    packet.claim_boundary.verifies_primitive_bounds_provenance,
    false
  );
});

test("h39 shared-domain primitive diagnostic allows external directed-rounded provenance wording", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic({
    ...CLOSING_PRIMITIVE_BOUNDS,
    primitiveBoundsSource: "external-shared-domain-backend-report",
    primitiveBoundsStatus:
      "directed-rounded-external-unverified-by-this-artifact",
  });

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(
    packet.shared_domain_diagnostic_summary.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    packet.claim_boundary.certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
});

test("h39 shared-domain primitive diagnostic reports failing supplied primitive bounds", () => {
  const packet = buildH39SharedDomainPrimitiveDiagnostic({
    ...CLOSING_PRIMITIVE_BOUNDS,
    mGBound: 1e19,
    primitiveBoundsStatus:
      "directed-rounded-external-unverified-by-this-artifact",
  });
  const summary = packet.shared_domain_diagnostic_summary;

  assert.deepEqual(validateH39SharedDomainPrimitiveDiagnostic(packet), []);
  assert.equal(summary.diagnostic_decision, "fails-provided-primitive-bounds");
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_below_one,
    false
  );
  assert.equal(packet.result.retained_branch, false);
});

test("h39 shared-domain primitive diagnostic validator rejects overclaims", () => {
  const packet = clone(
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS)
  );
  packet.claim_boundary.certifies_directed_rounded_shared_domain = true;
  packet.claim_boundary.certifies_directed_rounded_h39_polydisc_M_G_bound =
    true;
  packet.claim_boundary.retained_branch = true;
  packet.result.retained_branch = true;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.includes(
      "claim boundary must not certify directed-rounded shared-domain, h39 polydisc bounds, continuous tail, scaled remainder, I1, or retention closure"
    )
  );
  assert.ok(errors.includes("diagnostic result must remain not_retained"));
});

test("h39 shared-domain primitive diagnostic validator rejects speed-band fields", () => {
  const packet = clone(buildH39SharedDomainPrimitiveDiagnostic());
  packet.diagnostic_scope.speed_band = "forbidden";
  packet.primitive_bounds.speed_min = 0.5;
  packet.primitive_bounds.speed_max = 1.5;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.some((error) =>
      error.includes(
        "h39 shared-domain diagnostic must not contain speed-band fields"
      )
    )
  );
});

test("h39 shared-domain primitive diagnostic validator rejects reducer drift", () => {
  const packet = clone(
    buildH39SharedDomainPrimitiveDiagnostic(CLOSING_PRIMITIVE_BOUNDS)
  );
  packet.shared_domain_diagnostic_summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim =
    0.5;

  const errors = validateH39SharedDomainPrimitiveDiagnostic(packet);

  assert.ok(
    errors.includes(
      "h39 shared-domain diagnostic summary field candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim must match the reducer replay"
    )
  );
});

test("h39 shared-domain primitive diagnostic CLI writes, validates, and emits schema JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-h39-shared-domain-diagnostic-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [
    scriptPath(),
    "--center-residual-bound",
    "0.1",
    "--center-jacobian-lower-bound",
    "5",
    "--jacobian-lipschitz-bound",
    "0.1",
    "--rho-x",
    "3",
    "--r-x",
    "2",
    "--m-g-bound",
    "1e12",
    "--root-tangent-numerator-bound",
    "9.4",
    "--primitive-bounds-status",
    "directed-rounded-external-unverified-by-this-artifact",
    "--out",
    outPath,
  ]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );
  const schemaOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--schema"], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  assert.equal(
    validateOutput.diagnostic_decision,
    "passes-provided-primitive-bounds"
  );
  assert.equal(validateOutput.retained_branch, false);
  assert.equal(
    schemaOutput.artifact_schema,
    H39_SHARED_DOMAIN_PRIMITIVE_DIAGNOSTIC_SCHEMA
  );
});
