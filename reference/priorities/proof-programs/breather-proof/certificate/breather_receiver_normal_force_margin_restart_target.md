# Breather Receiver-Normal Force-Margin Restart Target

Status. Priority-only restart artifact for the breather proof program. This is a
theorem target and fixture target, not proof evidence, not row consumption, and
not branch-chart authorization.

Artifact id. `breather-receiver-normal-force-margin-restart/v0`.

Claim level. `certificate-target`. The target specializes the receiver-normal
branch-strength and first-derivative certificate to the breather recapture,
self-drive, action, and Schauder-envelope force-margin rows. It does not promote
any breather packet unless the same packet emits the same-record rows below.

Value assessment. This is not a new general gate. It is the breather-specific
consumer of the existing receiver-normal branch-strength certificate. It
protects the live breather proof route where force margins decide recapture,
self-drive, and invariant-envelope trapping. Improving only the native
preledger or branch chart would not close this point, because a later margin
row could still consume source-normal or aggregate force data after branch
identity is erased.

## Retained Branch-Family Object

For a breather packet identity
$$
\mathfrak I_B
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right),
$$
let $\mathfrak R_B^{\mathrm{ret}}$ be the retained force/action branch list
accepted by the same branch chart and same event ledger. Each retained row
$\rho\in\mathfrak R_B^{\mathrm{ret}}$ must bind one retained causal-root record
$$
R_\rho
=
\left(
\mathfrak I_B,
\mathrm{root}_\rho,
i_\rho,
j_\rho,
t_\rho,
s_\rho(t_\rho),
\mathcal{U}_\rho,
\eta,
\epsilon_c,
\mathrm{hash}_\rho
\right)
$$
to the receiver-normal fields
$$
D_{s,\rho},
\qquad
D_{t,\rho},
\qquad
W_{\rho}^{\mathrm{rec}}
=
\left|D_{t,\rho}/D_{s,\rho}\right|.
$$
The source-normal field $D_s$ remains the simple-root transversality floor. It
is not a force-strength substitute. The old shell-braid $1/\lvert J\rvert$
force weight is not admissible in this target.

For each variation coordinate $v$ consumed by a recapture, self-drive, action,
power, wake-history, or Schauder-envelope row, the same retained record must
also emit
$$
D_vD_{s,\rho},
\qquad
D_vD_{t,\rho},
\qquad
D_vW_{\rho}^{\mathrm{rec}}.
$$
On a fixed $D_s,D_t$ sign stratum with
$\zeta_{s,\rho}=\operatorname{sign}D_{s,\rho}$ and
$\zeta_{t,\rho}=\operatorname{sign}D_{t,\rho}$, the derivative is not an
independent fit. It must reconstruct
$$
D_vW_{\rho}^{\mathrm{rec}}
=
\frac{\zeta_{t,\rho}\zeta_{s,\rho}}{D_{s,\rho}^2}
\left(
D_{s,\rho}D_vD_{t,\rho}
-
D_{t,\rho}D_vD_{s,\rho}
\right).
$$

## Closure Equation

For every breather force-margin consumer $m$ in the recapture, self-drive, or
invariant-envelope stack, let $\mathfrak R_m^{\mathrm{ret}}\subseteq
\mathfrak R_B^{\mathrm{ret}}$ be the retained rows named by that consumer and
let $\ell_m$ be its declared projection or signed scalar functional. The
receiver-normal force kernel is
$$
\mathbf B_{\rho}^{\mathrm{rec}}
=
\frac{W_{\rho}^{\mathrm{rec}}}{r_\rho^2}
\hat{\mathbf r}_\rho,
$$
with first variation
$$
D_v\mathbf B_{\rho}^{\mathrm{rec}}
=
\frac{D_vW_{\rho}^{\mathrm{rec}}}{r_\rho^2}\hat{\mathbf r}_\rho
+
\frac{W_{\rho}^{\mathrm{rec}}}{r_\rho^2}D_v\hat{\mathbf r}_\rho
-
2\frac{W_{\rho}^{\mathrm{rec}}D_vr_\rho}{r_\rho^3}
\hat{\mathbf r}_\rho.
$$
The admissible breather margin row is therefore
$$
\gamma_m^{\mathrm{rec}}
=
\sigma_m
\left[
\ell_m
\left(
\sum_{\rho\in\mathfrak R_m^{\mathrm{ret}}}
\kappa\,\sigma_{i_\rho j_\rho}|q_{i_\rho}q_{j_\rho}|
\mathbf B_{\rho}^{\mathrm{rec}}
+
\mathbf F_{m}^{\mathrm{fold}}
+
\mathbf F_{m}^{\mathrm{med}}
\right)
-
\Gamma_m
\right],
$$
where $\sigma_m$ is the pass orientation, $\Gamma_m$ is the required recapture
or trapping demand, and the fold and medium-response terms are admissible only
when their rows use the same packet identity, event interval, regulator state,
and branch-family checksum. The derivative-consuming form is
$$
D_v\gamma_m^{\mathrm{rec}}
=
\sigma_m
\ell_m
\left(
\sum_{\rho\in\mathfrak R_m^{\mathrm{ret}}}
\kappa\,\sigma_{i_\rho j_\rho}|q_{i_\rho}q_{j_\rho}|
D_v\mathbf B_{\rho}^{\mathrm{rec}}
+
D_v\mathbf F_{m}^{\mathrm{fold}}
+
D_v\mathbf F_{m}^{\mathrm{med}}
-
D_v\Gamma_m
\right),
$$
again on the same retained branch list. A positive margin can be consumed only
after the lower interval for every required $\gamma_m^{\mathrm{rec}}$ is
strictly positive and every derivative row used by the consumer passes the
same-record reconstruction test.

## Executable Fixture Target

The first executable fixture should be a JSON object named by packet identity,
for example
`breather_receiver_normal_force_margin_fixture.<packet-id>.json`, with these
top-level fields:

| Field | Requirement |
| --- | --- |
| `artifact_id` | `breather-receiver-normal-force-margin-restart/v0`. |
| `packet_identity` | The same $\mathfrak I_B$ tuple used by candidate, mesh, preledger, branch-chart, event-ledger, and Schauder-envelope rows. |
| `branch_family_checksum` | Exact retained list $\mathfrak R_B^{\mathrm{ret}}$ plus aggregation convention. |
| `receiver_normal_rows` | One entry per retained row containing $R_\rho$, $D_s$, $D_t$, $W^{\mathrm{rec}}$, sign stratum, and floors. |
| `receiver_normal_derivative_rows` | $D_vD_s$, $D_vD_t$, reconstructed $D_vW^{\mathrm{rec}}$, geometry derivatives, and force-kernel derivatives for every variation used by the consumer. |
| `margin_consumers` | Recapture, self-drive, action, power, wake-history, or Schauder-envelope rows, each naming the exact retained rows it consumes. |
| `margin_intervals` | Outward intervals for $\gamma_m^{\mathrm{rec}}$ and, when consumed, $D_v\gamma_m^{\mathrm{rec}}$. |
| `negative_controls` | The fail-closed controls below, including old shell-braid force-residue and source-normal-only substitutions. |
| `source_hashes` | Stable hashes for the candidate, mesh, branch chart, event ledger, derivative bundle, and fixture evaluator. |

The fixture passes only when all required margin intervals are strictly positive
and all same-record and derivative-reconstruction checks pass. If the branch
chart is absent or unauthorized, the fixture may still be emitted as a target
or diagnostic input, but its verdict is blocked before margin arithmetic.

## Executable Validator

The narrow executable evaluator is
[`check-breather-receiver-normal-force-margin-fixture.mjs`](../../../../../scripts/proof-programs/check-breather-receiver-normal-force-margin-fixture.mjs).
It validates only the fixture target above. It does not certify a branch chart,
consume a row, or promote a breather packet.

The evaluator emits
`receiver_normal_breather_force_margin_missing` when no fixture object is
supplied. With `--fixture <fixture.json>`, it exits successfully only when the
fixture passes all priority-only checks. Use `--allow-fail-closed` when a
diagnostic run should return a JSON fail-closed report without failing the
shell command. Use `--schema` to emit the required fixture contract for packet
generators before they attempt a candidate fixture.
Use `--absence-boundary` to emit the machine-readable non-fixture source
boundary when the breather certificate directory lacks the producer objects
needed to construct a real fixture candidate.

The checked fixture shape is intentionally narrow:

| Check | Fail-closed status |
| --- | --- |
| Missing fixture, artifact id, packet identity, retained rows, consumers, or margin intervals | `receiver_normal_breather_force_margin_missing` |
| Unauthorized same-packet branch chart | `breather-force-margin-branch-chart-unauthorized` |
| Branch-family checksum drift between receiver rows, derivative rows, consumers, and margin intervals | `breather-force-margin-branch-family-checksum-mismatch` |
| Any declared substitution for $W^{\mathrm{rec}}$ | `breather-force-margin-source-normal-substitution` |
| Any declared legacy shell-braid residue consumption | `breather-force-margin-old-shell-braid-residue` |
| Consumer without retained record keys | `breather-force-margin-aggregate-only` |
| Missing $D_vD_s$, $D_vD_t$, $D_vW^{\mathrm{rec}}$, geometry derivative, or force-kernel derivative row | `breather-force-margin-derivative-row-missing` |
| Emitted $D_vW^{\mathrm{rec}}$ interval does not contain the same-record reconstruction | `breather-force-margin-derivative-reconstruction-failed` |
| Open $D_s,D_t$ sign stratum or zero-crossing $D_s$ interval | `breather-force-margin-sign-stratum-open` |
| Nonpositive lower interval for any required $\gamma_m^{\mathrm{rec}}$ | `breather-force-margin-nonpositive` |
| Missing authorized branch chart, fixture producer, retained receiver-normal rows, derivative bundle, or margin interval producer in the scanned breather certificate source root | `accepted_non_fixture_source_missing` |

Focused validator tests live at
[`breather-receiver-normal-force-margin-fixture.test.js`](../../../../../tests/breather-receiver-normal-force-margin-fixture.test.js).
They include a complete synthetic same-record fixture plus negative controls
for branch-chart absence, checksum drift, derivative-row absence, derivative
reconstruction failure, forbidden $W^{\mathrm{rec}}$ substitution,
aggregate-only consumers, nonpositive margins, and the breather source absence
boundary.

## Fail-Closed Ledger

| Status | Meaning |
| --- | --- |
| `receiver_normal_breather_force_margin_missing` | No breather force-margin fixture consumes same-record $D_s$, $D_t$, $W^{\mathrm{rec}}$, and required derivative rows. |
| `breather-force-margin-branch-chart-unauthorized` | The margin fixture attempts to evaluate before a same-packet branch chart is authorized. |
| `breather-force-margin-branch-family-checksum-mismatch` | The margin row consumes a retained branch list different from the receiver-normal derivative bundle. |
| `breather-force-margin-source-normal-substitution` | The row substitutes $D_s$, $J$, a source-normal inverse factor, or a source-normal denominator for $W^{\mathrm{rec}}$. |
| `breather-force-margin-old-shell-braid-residue` | The row consumes an old shell-braid force residue rather than recomputing receiver-normal force kernels on the same retained rows. |
| `breather-force-margin-aggregate-only` | The row consumes a terminal force, margin, or finite-difference aggregate after retained branch identity is erased. |
| `breather-force-margin-derivative-row-missing` | A derivative-consuming consumer lacks $D_vD_s$, $D_vD_t$, $D_vW^{\mathrm{rec}}$, geometry derivatives, or $D_v\mathbf B^{\mathrm{rec}}$ on the retained row. |
| `breather-force-margin-derivative-reconstruction-failed` | The emitted $D_vW^{\mathrm{rec}}$ interval does not contain the reconstructed value from same-record $D_s$, $D_t$, $D_vD_s$, and $D_vD_t$. |
| `breather-force-margin-sign-stratum-open` | The row does not fix $D_s,D_t$ signs or declare an accepted nonsmooth crossing convention. |
| `breather-force-margin-nonpositive` | At least one required lower margin interval is nonpositive after the same-record checks pass. |
| `accepted_non_fixture_source_missing` | The evaluator scanned the breather certificate source root and found no real fixture producer, no authorized branch chart, no same-record retained receiver-normal row source, no derivative-bundle source, or no margin interval producer. This is an accepted absence boundary only, not fixture evidence. |

## Exact Blocker

Status:
`receiver_normal_breather_force_margin_missing`.

The validator exists, but no breather certificate or fixture file emits
`breather-receiver-normal-force-margin-restart/v0`, no same-packet branch chart
is authorized, and no recapture, self-drive, action, power, wake-history, or
Schauder-envelope margin row consumes same-record $D_s$, $D_t$,
$W^{\mathrm{rec}}$, and derivative rows on the retained branch family. Existing
root topology, null-coordinate preledger, strict-gap, source-cover, endpoint,
fold-layer, and higher-fold artifacts remain priority-only topology,
candidate-repair, or proof-burden evidence until this receiver-normal margin
fixture exists and passes the executable evaluator.

Machine-readable absence boundary. The evaluator command
`node scripts/proof-programs/check-breather-receiver-normal-force-margin-fixture.mjs --absence-boundary`
emits `accepted_non_fixture_source_missing` for the breather
certificate source root. The boundary names the missing producer object
`breather_receiver_normal_force_margin_fixture.<packet-id>.json`, the required
`branch_chart.json`, the retained-record fields `packet_identity`,
`retained_record_key`, `branch_family_checksum`, `D_s_interval`,
`D_t_interval`, `W_rec_interval`, `sign_stratum.zeta_s`, and
`sign_stratum.zeta_t`, and the derivative fields `D_vD_s_interval`,
`D_vD_t_interval`, `D_vW_rec_interval`, `geometry_derivatives`, and
`force_kernel_derivatives`.

Producer-route boundary. The same absence-boundary object now includes a
machine-readable producer route for
`fresh-v10-higher-fold-12-root-rebuild-v0`. The expected upstream files are:

| Producer role | Expected file |
| --- | --- |
| Same-packet branch chart | `branch_chart.json` |
| Same-record receiver-normal retained rows | `breather_receiver_normal_retained_rows.fresh-v10-higher-fold-12-root-rebuild-v0.json` |
| Same-record receiver-normal derivative bundle | `breather_receiver_normal_derivative_bundle.fresh-v10-higher-fold-12-root-rebuild-v0.json` |
| Breather receiver-normal margin intervals | `breather_receiver_normal_margin_intervals.fresh-v10-higher-fold-12-root-rebuild-v0.json` |
| Breather receiver-normal force-margin fixture | `breather_receiver_normal_force_margin_fixture.fresh-v10-higher-fold-12-root-rebuild-v0.json` |

The branch-chart route is blocked before those receiver-normal producer files
can be evidence. The local route classifiers report zero candidate replay
artifacts in the fold-coordinate history-realization contract, zero accepted
same-packet fold impulse or direct-quadrature source packets, zero accepted
fold-layer rows, zero row consumption, and `branch_chart_authorized=false`.
The first proof object on the source-packet route is a
`source_packet_acceptance_rule_derivation_proof` for the fixed-parameter
separator aggregate to same-packet fold impulse/direct-quadrature bound
acceptance rule. The first source-packet attempt still lacks a mollifier or
direct-quadrature route declaration, row-projection source-slice coverage
certificates, and dual-mollified row-integrand interval enclosures for the 112
higher-fold rows. Until that route produces an accepted higher-fold separator
layer certificate and an authorized branch chart for the same packet, the
receiver-normal retained-row, derivative-bundle, margin-interval, and fixture
filenames remain required producer targets rather than proof evidence.

Rule-kernel payload boundary. The absence-boundary object also imports the
lower rule-kernel source boundary under
`producer_route_boundary.source_packet_route_boundary.rule_kernel_payload_boundary`.
The expected proof-object producer is
`source_packet_acceptance_rule_derivation_proof_object.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json`;
the expected schema candidate is
`sigma_hf_01_external_schema_candidate.<external-source-id>.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.lambda0305.json`.
This is not locally implementable from existing breather data: the local pool
contains 0 compatible proof-grade derivation schema objects, 0 accepted
external provenance records, 0 schema-validation intake candidates, and 0
external schema inputs received. The exact blocked `Sigma_hf_01` proof-grade
fields are `rule_kernel_obligation_binding`,
`rule_kernel_derivation_payload_target_binding`, and
`proof_grade_derivation_schema_statement`. Until those three fields arrive with
accepted external provenance and pass schema-validation intake, the
rule-kernel derivation payload, source-packet acceptance rule derivation proof,
soundness proof, endpoint-application proof, accepted constants conformance,
compatible source-packet acceptance evidence, accepted same-packet fold
impulse/direct-quadrature source packet, higher-fold separator layer
certificate, `branch_chart.json`, receiver-normal retained rows, derivative
bundle, and margin interval source remain blocked.
