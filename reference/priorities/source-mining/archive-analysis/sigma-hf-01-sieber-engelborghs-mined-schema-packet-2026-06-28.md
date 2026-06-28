# Sigma_hf_01 Sieber Engelborghs Mined Schema Packet

Date mined: June 28, 2026

Claim level: priority-only mined-source schema packet. This packet extracts a
candidate hypotheses / inference / conclusion structure from the Sieber
state-dependent-delay periodic-orbit source lead and the
Engelborghs-Luzyanina-in 't Hout-Roose collocation source lead for the
`Sigma_hf_01` external proof-grade derivation schema target. It does not
establish accepted external provenance, does not receive an external schema
object for validation, does not consume rows, does not update the live ledger,
and authorizes no branch chart.

## Target

The live target is the first `Sigma_hf_01` separator-slot external schema
candidate under:

- [external proof-grade derivation schema acceptance contract](../../proof-programs/breather-proof/certificate/external_proof_grade_derivation_schema_acceptance_contract.md)
- [Sigma_hf_01 external schema pilot packet](../../proof-programs/breather-proof/certificate/sigma_hf_01_external_schema_pilot_packet.md)
- [Sigma_hf_01 external schema source-lead audit](sigma-hf-01-external-schema-source-lead-audit-2026-06-28.md)

The current local intake remains 5 / 8 required fields present. These three
proof-grade fields remain absent on any accepted non-local object:

- `rule_kernel_obligation_binding`
- `rule_kernel_derivation_payload_target_binding`
- `proof_grade_derivation_schema_statement`

This packet drafts source-mined candidates for those three fields only. A
candidate structure is not an accepted external proof-grade schema object.

## Sources Inspected

| Source | Metadata and access | Use in this packet |
| --- | --- | --- |
| Jan Sieber, "Finding periodic orbits in state-dependent delay differential equations as roots of algebraic equations" | arXiv [`1010.2391v10`](https://arxiv.org/abs/1010.2391v10), DOI [`10.3934/dcds.2012.32.2607`](https://doi.org/10.3934/dcds.2012.32.2607), DCDS 32(8), 2607-2651, 2012. Local inspection artifact: `/tmp/sieber-1010.2391v10.txt`. | Source-lead for an exact local equivalence between periodic boundary-value problems for functional differential equations, including state-dependent delays under the stated smoothness assumptions, and finite-dimensional algebraic root systems. |
| K. Engelborghs, T. Luzyanina, K. J. in 't Hout, and D. Roose, "Collocation Methods for the Computation of Periodic Solutions of Delay Differential Equations" | DOI [`10.1137/S1064827599363381`](https://doi.org/10.1137/S1064827599363381), SIAM Journal on Scientific Computing 22(5), 1593-1609. Crossref metadata accessed June 28, 2026. The SIAM article page was not text-accessible in this environment. | Source-lead for the collocation-method family used to compute periodic solutions of delay differential equations. |
| J. Sieber, K. Engelborghs, T. Luzyanina, G. Samaey, and D. Roose, "DDE-BIFTOOL v. 3.1.1 Manual" | arXiv [`1406.7144v4`](https://arxiv.org/abs/1406.7144v4). Local inspection artifact: `/tmp/ddebiftool-1406.7144.txt`. The manual cites the Engelborghs et al. SIAM collocation paper as the periodic-solution collocation method reference. | Method-family context for piecewise-polynomial periodic-solution representation, collocation equations, Newton residual controls, adaptive mesh parameters, and Floquet-multiplier computation. |

No source text is imported as doctrine. The sources are used as technical
source leads for a later proof-grade derivation schema candidate.

## Source Claims

### Sieber

Source claim bucket: standard mathematical result / derivation route.

The Sieber paper proves a local equivalence theorem for periodic
boundary-value problems for functional differential equations. Under the
paper's regularity hypotheses, including the state-dependent-delay class
covered by the cited Hartung et al. review assumptions, a neighborhood of a
periodic boundary-value problem can be represented by a finite-dimensional
algebraic residual. Roots of that residual correspond exactly, through an
explicit reconstruction map, to local periodic solutions of the boundary-value
problem. The paper is explicit that this is an exact local equivalence result,
not merely a numerical discretization statement.

Source-mined schema ingredients:

- Hypotheses candidate: a periodic boundary-value problem
  $\dot{x}(t)=f(\Delta_t x)$ on the circle, a local reference profile with
  Lipschitz continuous derivative, and sufficient extendable smoothness /
  restricted smoothness of the functional $f$ to cover state-dependent delays.
- Inference candidate: choose finite leading-mode coordinates and construct a
  fixed-point reconstruction map plus finite algebraic residual; prove local
  fixed-point existence, smoothness, and root / solution equivalence.
- Conclusion candidate: local periodic orbits in the chosen neighborhood are
  represented by roots of a finite-dimensional algebraic system, and the root
  can be reconstructed as a periodic boundary-value solution.

### Engelborghs-Luzyanina-in 't Hout-Roose

Source claim bucket: numerical-method source lead / comparison framework.

Crossref identifies the SIAM paper as a collocation-method article for
computing periodic solutions of delay differential equations. The DDE-BIFTOOL
manual, which cites that paper as the periodic-solution collocation reference,
describes the compatible method-family structure: periodic solutions are
represented by a period, a time-scaled profile on a mesh, and continuous
piecewise polynomials; the determining system imposes delay-equation residuals
at collocation points, periodicity, and a phase condition; Newton correction,
collocation parameters, adaptive mesh controls, residual tolerances, and
Floquet-multiplier computations are then attached as numerical method data.

Source-mined schema ingredients:

- Hypotheses candidate: a delay differential equation with specified delays,
  a periodic profile represented on a mesh, a polynomial degree, collocation
  points, period, parameters, and phase condition.
- Inference candidate: impose the delay-equation residual at the collocation
  points, impose periodicity and phase fixing, solve the resulting nonlinear
  algebraic system by correction/continuation, and record residual and mesh
  controls.
- Conclusion candidate: a computed periodic-solution candidate and associated
  stability data can be represented as a finite coefficient / period object
  with explicit collocation residuals and method parameters.

This source family does not itself provide interval proof, exact root
containment, same-packet source-data binding, or an accepted
`Sigma_hf_01` proof-grade schema.

## Candidate `Sigma_hf_01` Schema Structure

### Candidate hypotheses

A future non-local proof-grade schema object would need to instantiate all of
the following on the same `Sigma_hf_01` separator record:

1. A periodic boundary-value formulation for the live same-packet separator
   aggregate family under packet `fresh-v10-higher-fold-12-root-rebuild-v0`,
   proof interval `proof-interval-v6`, lambda branch `lambda0305`, and fold
   interval `F01`.
2. A state-dependent-delay or functional-delay right-hand side whose
   regularity assumptions are stated at the same level needed by the Sieber
   equivalence theorem, or a declared reason the Engelborghs collocation
   source is only a numerical comparison method.
3. A finite coordinate object: either Sieber-style leading-mode root variables
   or Engelborghs-style piecewise-polynomial collocation coefficients plus
   period, mesh, collocation points, parameters, phase condition, and residual
   convention.
4. The exact `Sigma_hf_01` source-data record lock, not a generic
   periodic-orbit or collocation example.

### Candidate inference

A future schema statement would need to prove, not merely name, the following
inference chain:

1. Translate the `Sigma_hf_01` separator source-data record into the periodic
   boundary-value problem variables and source-history variables used by the
   external schema.
2. Apply the Sieber finite algebraic-root reduction or an explicitly
   proof-grade collocation analogue to produce a finite residual system.
3. Bind the residual system to the rule-kernel derivation payload target for
   the same `Sigma_hf_01` slot.
4. Discharge the derivation proof, soundness proof, and endpoint-application
   proof obligations without importing any local fail-closed diagnostic as
   evidence.
5. State the acceptance-side residual, interval, root, or correspondence
   condition that makes the payload checkable by a later validation artifact.

### Candidate conclusion

If every missing proof-grade field and provenance predicate were supplied, the
future object could conclude only this limited claim:

`Sigma_hf_01` has received one external proof-grade derivation schema input for
schema validation. That would still not consume rows, prove the breather
certificate, update the live ledger, or authorize a branch chart. It would only
authorize a follow-on artifact to test whether the received schema constructs
the rule-kernel derivation payload.

## Mapping To Missing Proof-Grade Fields

| Missing field | Source-mined candidate | Required binding still absent |
| --- | --- | --- |
| `rule_kernel_obligation_binding` | Use Sieber for the derivation/soundness backbone: local periodic BVP to finite algebraic root equivalence under explicit regularity hypotheses. Use Engelborghs et al. for the collocation residual/method form: mesh, piecewise-polynomial profile, collocation equations, periodicity, phase condition, Newton residual controls, and stability data. | No external object discharges the three project obligations for `Sigma_hf_01`: derivation proof, soundness proof, and endpoint-application proof. The collocation source is numerical-method context, not a proof-grade interval/root certificate for the live packet. |
| `rule_kernel_derivation_payload_target_binding` | Candidate payload target is a finite root/residual object: leading-mode coordinates with residual map and reconstruction map in the Sieber style, or collocation coefficients plus period, mesh, phase condition, and residual map in the Engelborghs style. | No source binds that payload target to packet `fresh-v10-higher-fold-12-root-rebuild-v0`, proof interval `proof-interval-v6`, lambda branch `lambda0305`, separator event `Sigma_hf_01`, and the declared rule-kernel payload target. |
| `proof_grade_derivation_schema_statement` | Candidate statement: under stated regularity, source-data, mesh/coordinate, and boundary-condition hypotheses, reduce the `Sigma_hf_01` periodic boundary-value problem to a finite algebraic residual; infer the payload target from a certified root / correspondence object; conclude schema-input readiness for validation only. | No non-local source states this exact hypotheses / inference / conclusion chain for `Sigma_hf_01`, and no same-record correspondence proof or accepted external schema object is present. |

## Eight-Field Contract Status

| Required field | Packet status |
| --- | --- |
| `compatible_schema_role_lock` | Future wrapper field only. The papers do not claim the project schema role. |
| `compatible_proof_object_role_lock` | Future wrapper field only. The papers do not claim to be `source_packet_acceptance_rule_derivation_proof_object` inputs. |
| `derivation_proof_target_lock` | Future wrapper field only. The papers do not target the live same-packet separator aggregate family. |
| `derivation_proof_source_data_record_lock` | Future wrapper field only. No inspected source binds to the exact `Sigma_hf_01` separator source-data record. |
| `rule_kernel_obligation_binding` | Candidate source structure drafted above; not discharged. |
| `rule_kernel_derivation_payload_target_binding` | Candidate finite residual / root payload shape drafted above; not bound to the live payload target. |
| `proof_grade_derivation_schema_statement` | Candidate hypotheses / inference / conclusion drafted above; not a received schema statement. |
| `non_reinterpretation_guard` | Boundary stated in this packet; a future candidate object must carry its own guard. |

## Non-Reinterpretation Boundary

This packet may be used only as source-mining priority material. It must not be
used to reclassify any of the following as accepted external proof-grade input:

- local proof-program JSON objects, reports, target packets, source-data
  partials, negative controls, decoys, absence classifiers, or source audits;
- this packet or the earlier source-lead audit;
- source-mining-history rows;
- bibliographic metadata alone;
- DDE-BIFTOOL numerical method data without an external proof-grade interval,
  root-containment, and same-record binding object.

The Sieber source is a real mathematical source lead for an exact local
finite-root equivalence theorem. The Engelborghs et al. source family is a real
collocation-method source lead for periodic delay-equation computations. Their
combination remains source-lead evidence only until a non-local object binds
the eight project fields for `Sigma_hf_01` under accepted provenance.

## Verdict

Accepted external provenance is not established. The packet materially sharpens
the three missing field candidates, but it does not satisfy the eight-field
contract. The first failure remains:

`external_schema_provenance_required_before_schema_validation_intake`

Smallest next evidence object: a non-local `Sigma_hf_01` external
proof-grade derivation schema object, with stable provenance and all eight
required fields on the same record, that instantiates the source-mined
hypotheses / inference / conclusion chain without reinterpreting local
proof-program artifacts.

