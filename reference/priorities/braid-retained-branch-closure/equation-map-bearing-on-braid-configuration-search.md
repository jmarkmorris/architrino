# Equation-Map Bearing On Braid Configuration Search

Status. Priority-only integration note under retained-branch configuration search, consuming `tri_binary_partition_rule`, [finite-branch-candidate-set-packet.md](../braid-angular-momentum-spin/finite-branch-candidate-set-packet.md), [branch-selection-law-packet.md](../braid-angular-momentum-spin/branch-selection-law-packet.md), and [equal-frequency-energy-radius-candidate.md](../braid-angular-momentum-spin/equal-frequency-energy-radius-candidate.md). This file captures how the equation-mapping work should discipline the search of stable Noether braid configuration space. It is solver-facing priority material, not reader-facing corpus prose.

Claim level. Solver-architecture and derivation-closure target. The equation-map rows should not be treated as a collection of later analogies. If they mature to score 4 or 5, they become direct residual channels for retained braid candidates.

Promotion decision. Defer with blocker. Promote only after one retained Noether braid candidate emits the equation-bearing residual vector from the same branch state, including root identity, geometry/energy, phase operator, event ledger, stability, and at least one precision or observation row. Until then, this packet is the priority routing map for how those equation rows should shape the configuration search.

## Active Priority Home

The retained braid configuration-space search lives in this priority folder:

`reference/priorities/braid-retained-branch-closure/`

The angular-momentum and branch-selection packets remain required dependency carriers:

- [branch-selection-law-packet.md](../braid-angular-momentum-spin/branch-selection-law-packet.md) for the candidate selection residual law.
- [finite-branch-candidate-set-packet.md](../braid-angular-momentum-spin/finite-branch-candidate-set-packet.md) for finite retained candidate generation.
- [minimal-candidate-set-instance.md](../braid-angular-momentum-spin/minimal-candidate-set-instance.md) for the currently populated minimal instance.
- [equal-frequency-energy-radius-candidate.md](../braid-angular-momentum-spin/equal-frequency-energy-radius-candidate.md) for the high-priority $(I,M,O)=(f,f,f)$ common-clock family.

The related equation-map material lives in [../equation-mapping/equation.md](../equation-mapping/equation.md) and its packet files, but the stable braid search itself belongs here because it selects retained Noether braid branch states.

## Core Assessment

The equation mapping has direct bearing on the stable-braid search. The main conclusion is:

$$
\text{do not rank frequency triples alone.}
$$

A frequency triple is only the entry label for a candidate family. The solver must evaluate whether a single retained Noether braid branch supplies the root ledger, phase operator, energy/radius placement, event ledger, wake/recoil routing, total angular-momentum ledger, stability, and observation-facing residuals.

This is especially important for the equal-frequency family:

$$
(I,M,O)=(f,f,f).
$$

If the neutrino/common-clock equation-map item is correct, the target is not three freely observed absolute clocks. The target is a common base clock plus a residual phase operator,

$$
H_X
=
\omega_{\mathrm{clk}} C_X \mathbf 1
+
\delta H_X,
$$

where the observed oscillation or flavor readout is controlled by residual phase gaps in $\delta H_X$ rather than by three unrelated binary frequencies. This strongly supports keeping $(f,f,f)$ as a first-rank search axis, but it also means the solver must emit residual phase data, not merely report matching frequency labels.

## Candidate Frequency Families

All displayed frequency families in this workstream should use the canonical role order $I:M:O$. Any inherited reversed-role display should be treated as a compatibility artifact to remove from solver-facing outputs. The selected branch may still begin with generic binary labels $1,2,3$, but once a role map is declared, the emitted frequency row should be $I:M:O$.

The current search candidates are:

| Candidate family | Frequency row | Why it remains active |
| --- | --- | --- |
| Middle-hinge offset | $(I,M,O)=(f+2,f,f-1)$ | Current canonical offset candidate; keeps the middle binary on the $c_f$ edge while testing doubled inner burden through an index offset. |
| Neighbor hinge offset | $(I,M,O)=(f+1,f,f-1)$ | Nearby reduced comparison family; useful for deciding whether the $+2$ inner burden is essential or an artifact of the present reduced row. |
| Equal-frequency common clock | $(I,M,O)=(f,f,f)$ | Tests common clock plus phase offsets, energy/radius placement, and residual phase operators; high priority for neutrino-like cancellation and one-unit angular-momentum routing. |
| Dyadic hierarchy | $(I,M,O)=(4f,2f,f)$ | Tests octave-like self-hit / resonance hierarchy and gives a clean ratio row for branch-generator breadth. |
| General integer hierarchy | $(I,M,O)=(nf,mf,f)$ | Keeps the solver general over positive integer families, with $n,m$ constrained by retained root, phase, energy, and stability rows rather than by a hand-ranked ratio. |

The unordered binary generator should still be able to emit generic triples before role assignment. The role-assigned report, branch-selection comparison, and user-facing priority packet should use $I:M:O$.

## Equation-Bearing Residual Vector

For each retained candidate $\mathfrak a$ generated from a Noether braid branch state $B_{3B}(q,v)$, extend the branch-selection residual with an equation-bearing search vector:

$$
\mathcal R_{\mathrm{cfg}}(\mathfrak a)
=
\left(
R_{\mathrm{root}},
R_{\mathrm{geo/E}},
R_{\mathrm{phase}},
R_{\mathrm{event}},
R_{\mathrm{spin/exposure}},
R_{\mathrm{precision}},
R_{\mathrm{obs}}
\right).
$$

This vector is not a new gate family. It is a routing map for existing and emerging equation-map residuals into the branch-selection law. A candidate should be blocked, not accepted, when a required row is absent from the same retained branch record.

| Search stage | Equation-map rows | Solver effect |
| --- | --- | --- |
| Root and conservation filters | `EQ-01`, `EQ-05` | Hard filters for same-root identity, active-root coverage, Jacobian floors, finite-window conservation, and common retained record identity. |
| Geometry and energy filters | `EQ-02`, `EQ-03`, `EQ-04` | Require the candidate to emit clock period, Lorentz/oblate geometry, two-way leakage, exposed mass, energy/radius, mass-shell, and retained retune rows from one branch state. |
| Phase/operator filters | `EQ-16A` and the neutrino/common-clock packet | Convert $(f,f,f)$ from a simple equal-label row into a common-clock plus residual phase-operator test. |
| Spin, current, and exposure filters | `EQ-15`, `EQ-27` | Later discriminators for spinor/current topology, magnetic moment, and $g-2$-like exposure rows after a candidate has survived root, geometry, energy, and phase checks. |
| Event, radiation, and recoil filters | `EQ-12`, `EQ-28`, `EQ-29` | Reject candidates that require unaccounted radiation, recoil, wake, or event-ledger losses on the same branch transaction. |
| Precision readout filters | `EQ-26`, `EQ-30`, `EQ-31` | Use branch shape, exposure, lifetime, metastability, and precision residuals to compare candidates that survive the native branch rows. |
| Broad observation validators | Atomic spectra, cross sections, CMB/BBN/RAR-style rows | Downstream validators only. They should not replace retained branch construction, but they can rank or reject mature candidates. |

## Architecture Requirement

The solver should remain a general retained-record evaluator:

$$
B_{3B}(q,v)
\longrightarrow
\mathcal A_N(B^-,\Gamma_{\mathrm{coupl}},W)
\longrightarrow
\operatorname{Sel}_B
\longrightarrow
\mathcal R_{\mathrm{cfg}}.
$$

The frequency family is an input coordinate, not the architecture. The branch state must carry the general Noether braid geometry:

$$
\text{spherical or near-spherical support}
\longrightarrow
\text{oblate spheroidal support}
\longrightarrow
\text{flattened or planar limit},
$$

with retained effective lever arms $\rho_a(v)$, phase offsets $\phi_a$, branch angular momenta $J_a$, branch energy, wake rows, principal-direction rows, and coupling rows. The flattened circular rows are projection views of this object, not the model itself.

The equal-frequency target makes this architecture sharper. At fixed $\omega_f$, different branch energies may produce different effective lever arms and speeds:

$$
\omega_a=\omega_f,
\qquad
s_a=\rho_a(J_a;\lambda_a)\omega_f,
\qquad
J_a\ne J_b
\text{ in general}.
$$

Thus the solver must output energy/radius placement and phase-operator rows before deciding whether $(f,f,f)$ passes. A self-root parity proxy alone is not an adequate rejection test for the common-clock family.

## Solver-Facing Merge Target

The executable three-binary runner now attaches an `equationBearing` payload to each candidate's branch-chart projection. The payload is fail-closed and remains `retainedBranchClaim: false`; it is a residual-routing hook, not a branch certificate. Minimal fields:

- `candidateFamily`: one of `offset_f_plus_2_f_f_minus_1`, `offset_f_plus_1_f_f_minus_1`, `equal_frequency_f_f_f`, `dyadic_4f_2f_f`, or `integer_nf_mf_f`.
- `rawBinaryFrequencyRow`: the generic $1:2:3$ row before role assignment.
- `roleFrequencyRowIMO`: the role-assigned $I:M:O$ row after branch role mapping.
- `rootSignature`: active roots, same-root keys, Jacobian floors, inactive-gap margins, and retained-domain width.
- `geometryEnergyResidual`: Lorentz/oblate geometry, exposed-mass, energy/radius, mass-shell, and retune rows.
- `commonClockPhaseResidual`: common-clock pass/fail, phase offsets, residual phase operator gaps, identity-shift-invariant normalized spectrum rows such as $\widehat{\boldsymbol\lambda}_{\nu}$, and any doublet/singlet or cancellation row.
- `eventLedgerResidual`: wake, recoil, radiation, source depletion, and same-event energy-routing rows.
- `stabilityResidual`: return, Floquet, basin-retention, resonance-width, and escape-corridor rows.
- `precisionReadoutResidual`: magnetic moment, $g-2$, lifetime, metastability, cross-section, or spectrum rows when present.
- `observationResidual`: shared effective-FRW, Noether sea, event-ledger, and observer-readout rows when an observation-facing projection is present.

The report should fail closed when a field is not populated from the same retained record. Frequency-ratio agreement should never be enough to promote a branch.

## Working Disposition

The equation-map work should raise the priority of the stable-braid configuration search, not distract from it. Its strongest effect is to change the scoring order:

1. Generate broad candidate families, including $(f+2,f,f-1)$, $(f+1,f,f-1)$, $(f,f,f)$, $(4f,2f,f)$, and $(nf,mf,f)$.
2. Apply root, same-record, and conservation filters first.
3. Apply geometry, energy/radius, and Lorentz/oblate deformation rows.
4. Apply phase-operator rows, especially for $(f,f,f)$.
5. Apply event, wake, radiation, recoil, and stability rows.
6. Use precision and broad observation rows as downstream validators.

The practical conclusion is that $(f,f,f)$ should sit beside the current offset candidate as a high-priority family. It should not be demoted because the current offset route is more populated, and it should not be promoted by intuition alone. It needs the same retained branch state, same retained row set, same event ledger, and same fail-closed residual discipline as every other stable braid candidate.
