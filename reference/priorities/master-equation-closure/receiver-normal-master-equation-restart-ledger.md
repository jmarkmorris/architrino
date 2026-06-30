# Receiver-Normal Master Equation Restart Ledger

Status. Mandatory receiver-normal restart ledger. The canonical Master EOM uses the
receiver-normal branch factor
$$
D_{s,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf v_j(s),
\qquad
D_{t,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf v_i(t),
\qquad
W_{ij}^{\mathrm{rec}}=\left|D_{t,ij}/D_{s,ij}\right|.
$$
Any active proof, solver row, action row, force row, or certificate must carry
this same-record receiver-normal branch strength before it can move closure.
Rows that do not expose $D_s$, $D_t$, and $W^{\mathrm{rec}}$ on the retained
branch record are not force/action evidence.

Clean-slate proof-process rule. If a proof path consumed any force, action,
finite-certificate, no-go, margin, or pass/fail row lacking same-record $D_t$,
restart that proof path from its first receiver-normal branch table. Do not
promote a prior margin, constant, no-go, fixed-point claim, or pass/fail verdict
by patching in $D_t$ later. The only admissible carryover is explicitly non-force
geometry: root existence, retained branch labels, inactive gaps, finite-memory
depth, and source-normal transversality. Even those rows must be re-bound to the
same receiver-normal EOM record before a restarted proof consumes them.

## Receiver-Normal Promotion Rule

The source-normal denominator $D_s$ is root-transversality data. It is not by
itself branch strength. Stationary, fixed-source, or fixed-receiver reductions
are acceptable only when they are derived directly from the receiver-normal law
inside the declared retained row; they do not promote inherited branch-strength rows or
inherited proof verdicts.

Rows that survive conditionally:

- causal-root existence,
- retained branch labels,
- inactive-gap covers,
- finite-memory depth,
- source-normal transversality floors,
- root-transport rows that use only the source-normal implicit-function
  denominator.

Rows that must restart:

- force-balance rows,
- radial and tangential drive rows,
- action, power, energy, and Noether wake-history rows,
- breather recapture and self-drive margin rows,
- A1 outward constants,
- generated pass/fail certificates that lack receiver-normal branch-strength
  rows,
- app or solver rows that reconstruct branch strength without $D_t$,
- any proof process whose conclusion depended on one of those rows.

## Canonical Equation

The force-level branch contribution is
$$
\mathbf a_i(t)
=
\sum_{j,\ell}
\frac{\kappa\,\sigma_{ij}|q_iq_j|}{\mu_{\mathrm{arch}}}
\frac{W_{ij,\ell}^{\mathrm{rec}}(t)}{r_{ij,\ell}(t)^2}
\hat{\mathbf r}_{ij,\ell}(t).
$$
The source-normal denominator remains the root-transversality diagnostic. The
receiver-normal factor is the branch-strength diagnostic. Those two fields must
not be collapsed.

## Global Impact Ledger

| Surface | Receiver-normal disposition | Required restart |
| --- | --- | --- |
| `content/markdown/aaa/dynamics/master-equation.md` | Canonical equation uses receiver-normal branch strength. Action and circular rows that lack same-record $D_t$ are restart targets only. | Redrive action functional and circular branch asymptotics with $W^{\mathrm{rec}}$. |
| `reference/priorities/master-equation-closure/receiver-normal-wake-action-factor.md` | Accepted correction packet. | Use as the local law for every restarted force/action row. |
| A1 spiral packets | Root topology, inactive gaps, finite memory, and source-normal Jacobian floors remain conditional topology inputs. Force/action verdict rows are invalid as closure evidence. | Start a new same-box $D_s$, $D_t$, $W^{\mathrm{rec}}$ branch table before any branch-sum or pass/fail action certificate is attempted. |
| Breather proof program | Existing branch topology and history-space architecture remain useful only as conditional inputs. Recapture, self-drive, force-margin, and certificate rows must be regenerated with receiver-normal strength. | Restart the breather margin proof with receiver-normal branch strengths and regenerate any consumed finite certificates. |
| Action / Noether wake-history | Scalar action scaffolds are restart targets unless their variation produces the receiver-normal branch law. | Rebuild the constrained-branch action target and Noether balance rows using $W^{\mathrm{rec}}$ on the same retained branch chart. |
| Solver and app bridge | Central root rows carry source-normal denominators and receiver-normal factors. Branch weight and delayed-hit strength must equal the unsigned receiver-normal factor. | Keep tests that force moving-receiver asymmetry; reject local helpers that omit $D_t$. |
| Photon / Animator / Ideal Braid app-local formulas | App-local physical contribution reconstruction remains suspect until each path consumes solver-owned receiver-normal rows. | Move contribution rows behind solver output before using app-local summaries as physics evidence. |
| Equation-mapping and geometry-bridge packets | Any row that lacks receiver-normal branch strength is score-neutral for proof movement. Provider/root identity lessons remain useful only if independent of branch-strength consumption. | Redrive only after the canonical Master EOM, A1, and breather force rows expose $D_t/D_s$ on the same retained record. |

## Reinitiation Decisions

Reinitiate the breather path, but only after the branch-strength rows are
restated as receiver-normal inequalities. The return-map and Schauder-domain
architecture remains the right proof shape; the numerical and analytic margins
must be redriven.

Reinitiate A1 outward constants only after each retained label has same-box
$D_t$ bounds. Existing constants do not certify action or force closure.

Reinitiate action and Noether wake-history closure from the constrained branch
scaffold with $W^{\mathrm{rec}}$. Do not replay branch-strength rows that omit
$D_t$ as live proof steps.

Pause equation-mapping score movement until the receiver-normal Master EOM rows exist.
Equation-mapping can still audit which rows lack receiver-normal branch
strength, but numeric pass/fail without $D_t$ is not proof evidence.

Default decision. When a proof surface is ambiguous, restart it rather than
inherit it. A restarted proof may cite the earlier topology diagnostics only as
input obligations to be rebound, not as a completed force/action step.

## Smallest Next Mathematical Artifact

The next closure-relevant artifact is a same-record receiver-normal branch table:
for each retained branch row, report the source-normal denominator interval,
receiver-normal numerator interval, receiver-normal factor interval, branch
status, and a fail-closed negative control on the same box. That table is the
minimum object needed before any purged proof path can be rationally restarted.

First-derivative extension. The first derivative-consuming restart object is
now the priority-only
`receiver-normal-retained-branch-family-first-derivative/v0` artifact: on the
same retained branch-family record it must bind $D_s$, $D_t$, fixed sign
labels, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, reconstructed
$D_vW^{\mathrm{rec}}$, geometry derivatives, the force-kernel derivative, and
the exact retained branch-family checksum consumed downstream.

H39/theta3minus audit status. The nearest H39 provider target names five
shared source cells, 15 terminal rows, and 30 `P_-` / `P_+` branch rows, but
the branch-provider audit reports zero accepted provider-object branch
intervals, zero available provider-object branch antisymmetric equations, zero
explicit provider-object branch rows, and no same-record receiver-normal
derivative fields. Its receiver-normal derivative status is therefore
`h39-receiver-normal-first-derivative-evidence-not-populated`. The proof/evidence
obligation is first to emit
`source_map_provider_object_branch_split_map_available_terminal_row_count` for
all 15 terminal rows, then materialize the same-domain $A_P=P_- - P_+$
provider-object branch row or explicit `P_-` / `P_+` rows with both interval
payloads and the $P_b$ map, branch projection or alpha map,
`pushforward_operator_ref`, and `normalization_identity_ref` before aggregate
$P$ erases branch identity. Only after that can the accepted provider object be
bound to the retained causal-root force/action record with the receiver-normal
derivative bundle above.
Primitive-vector replays, hybrid prefix-Cauchy diagnostics, coefficient-series
source-map residual provider candidates, source-map residual envelopes,
provider-fit diagnostics, and signed-radius targets remain negative controls for
this restart ledger until they pass through the H39 retained-record preimage row.
