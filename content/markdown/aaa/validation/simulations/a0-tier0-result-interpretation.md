# $A_0$ Tier 0 Result-Schema Interpretation

This note explains how to read the first reduced $A_0$ branch-search artifact. It is a companion to the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](run-protocols.md), and the convergence standards in [Convergence Tests](convergence-tests.md).

Tier 0 asks one deliberately small question: is this reduced branch chart organized enough to deserve a more expensive continuation run? It is not asking whether the branch is physically real, stable under the full delayed dynamics, or ready to support a mass-map claim.

That boundary is the point of the document. A candidate row can be useful without being promoted. The artifact must make that difference machine-readable so a diagnostic success does not turn into an accidental theory claim.

The Tier 0 schema is not an attractor proof. It specifies a certificate-facing filter that would decide whether a reduced carrier chart is disciplined enough to seed Tier 1 $\eta > 0$ continuation. Any future output must be read together with the mass thesis in [Particle Masses](../../assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../dynamics/energy.md), the dynamics baseline in [A1 Dynamics](../../noether-braid/braid-a1-dynamics.md#a1-dynamics), and the closure bookkeeping in [Parameter Ledger](../parameter-ledger.md).

**Implementation status:** not implemented. The specified path `scripts/mass-map/a0-tier0-branch-search.mjs` does not currently exist in the repository. The tables below define the required output contract; they do not report an executed artifact or measured branch result.

## Output Status

The planned runtime must emit rows with six separate layers of interpretation:

| Output layer | Meaning | Promotion role |
| --- | --- | --- |
| `z_lambda` | Quotient-coordinate row $z_\Lambda$ after removing global rotations, the common closed-cycle phase gauge, and allowed branch-preserving chart relabelings | Decides whether the row can be read as a reduced moduli coordinate rather than a raw carrier representative |
| `root_ledger` | Active and raw causal-root counts by source relation, with excluded instantaneous self-root counts separated from active roots | Decides whether the carrier chart has a finite active partner, self, and inter-layer ledger |
| `residuals` and `residual_values` | The complete $\mathcal{R}_{A_0}$ row surface, plus a numeric mirror where Tier 0 omissions remain null | Prevents a numerical value, a diagnostic placeholder, and a later-tier obligation from being confused |
| `Delta_k` | $\Delta_{\mathbf{k}}$ handoff object with null value and `not_computed_in_tier0` status until Tier 1 builds the return map | Keeps Floquet stability from being silently omitted or treated as a Tier 0 result |
| `certificate_gates` | Pass/fail/not-computed status for the Tier 0 promotion checks | Decides whether the row may seed Tier 1 continuation |
| `failure_code` | One machine-readable row code, or `candidate` when the row survives Tier 0 | Gives scripts and readers the same rejection reason |

A record with `failure_code: "candidate"` may seed Tier 1. Any other `failure_code` rejects Tier 0 continuation until the named gate is resolved. This is the sole row-level status vocabulary; `certificate_gates.tier0_continuation` is its gate-level mirror. Neither outcome accepts an attractor, computes $\zeta(A_0)$, validates $E_{\text{internal}}(A_0)$, or derives $\mathcal{M}_{\text{sea}}^{ab}$.

The same boundary applies when a compact finite-coordinate chart or coarse branch split fails. Such a failure means the proposed reduced coordinate did not earn a continuation run; it does not by itself falsify the broader $A_0$ branch program. A branch-chart checker can authorize only a new Tier 1 rerun path after the coordinate source, equality map, fit degrees of freedom, held-out residuals, phase-origin handling when relevant, and benchmark exclusions are declared before fitting. It does not create accepted history, and it does not convert Tier 0 readiness into an attractor claim.

## Quotient-Coordinate Row

The specified `z_lambda` object is the row-level representation of $z_\Lambda$. It records the reduced coordinate after quotienting away global rotations, the common $S^1_{\mathbf{k}}$ phase gauge, and allowed discrete relabelings $\Gamma_\Lambda$ that preserve polarity assignment, layer roles, speed ordering, and causal-root branch class.

For this protocol only, the source-record layer aliases map to persistent indices by
$$
I\leftrightarrow1,\qquad M\leftrightarrow2,\qquad O\leftrightarrow3.
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-cf884bbe20f012b6)
The machine-readable fields use persistent indices. The aliases describe the declared radial role on this one chart and do not relabel the taxonomy.

| `z_lambda` entry | Row semantics |
| --- | --- |
| `schema` | version marker for the quotient-coordinate row |
| `radius_ratios` | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| `period_ratios` | $P_I/P_M$ and $P_M/P_O$, where $P_I,P_M,P_O$ are the cycle periods for the declared layer aliases, so time-scale separation is checked alongside radius separation |
| `delta_2` | source-record binary-2 speed offset $(s_2-c_f)/c_f$; `delta_M` may appear only as a documented input alias and must normalize to `delta_2` before validation |
| `ellipticity` and `ellipticity_status` | layer ellipticity data and whether Tier 0 used a shared scalar chart |
| `plane_gram` | $G_{\ell m}$ values for the quotient-reduced binary-plane normals |
| `orientation_class` | $\chi_N$, the triple product, and a nondegenerate or degenerate status |
| `handedness` | $H_1,H_2,H_3$ persistent-index handedness labels, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| `phase_offset_quotient` | $\Phi_{\text{rel}}$ status after removing the common $S^1_{\mathbf{k}}$ phase origin; the planned Tier 0 schema uses a gauge-fixed zero-offset representative and marks the quotient basis `not_computed_in_tier0` |
| `branch_class` and `branch_class_status` | $[\Lambda]$ data from winding integers, inter-layer closure, active and raw root classes, and excluded roots; Tier 0 marks the representative as not yet a canonical discrete quotient |
| `removed_gauges` | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| `quotient_degenerate` | Boolean failure surface for `quotient-degenerate` |

The quotient row is not a new dynamical assumption. It is the coordinate audit that prevents a raw carrier chart, a gauge choice, and a branch class from being mistaken for three independent pieces of physics.

## Near-Zero Self-Root Policy

The Tier 0 scanner distinguishes raw self-root sightings from active self-hit branches. A raw self root whose delay lies at the configured near-zero threshold is recorded but excluded from the active ledger as `excluded_instantaneous_self_kick`.

This policy follows the canonical convention $H(0)=0$: an instantaneous self-kick is not an active causal hit. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted.

The specified fold-layer diagnostic may preserve locked self-root keys as a transition candidate, but it does not by itself accept self-hit closure. A fold-layer entry promotes only after a corrected one-period branch-equation attempt passes the declared residual surface; until then, $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence remain downstream obligations.

## Residual Semantics

The specified `residuals` object is the complete branch-record residual surface
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-ae45d430bea6eace)
Each entry carries value, tolerance, status, role, and note fields. The companion `residual_values` object mirrors only the values; omitted Tier 0 components remain null rather than disappearing.

The Tier 0 residual surface deliberately includes entries that are not computed at Tier 0:

| Residual | Emitter key | Tier 0 interpretation |
| --- | --- | --- |
| $\mathcal{R}_{\text{state}}$ | `state` | Carrier-chart return mismatch over one declared period |
| $\mathcal{R}_{\text{root}}$ | `root` | Active root defect on candidate causal-root branches |
| $\mathcal{R}_{\text{phase}}$ | `phase` | Integer layer-winding mismatch |
| $\mathcal{R}_{E}$ | `energy` | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | `drift` | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | `speed` | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering |
| $\mathcal{R}_{\text{avg}}$ | `avg` | Diagnostic size of terms claimed to average out |
| $\mathcal{R}_{\text{lock}}$ | `lock` | Diagnostic fraction or defect of selected locking terms |
| $\mathcal{R}_{\text{leak}}$ | `leak` | Far-field leakage placeholder, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | `Floquet` | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without pretending that Tier 0 has done Tier 1 or Tier 2 work.

## Floquet Handoff

The `Delta_k` object is the Tier 0 handoff for $\Delta_{\mathbf{k}}$. Tier 0 does not construct the monodromy operator, so a conforming packet must use a null value, status `not_computed_in_tier0`, and role `tier1_required`. The reserved failure code is `nonpositive-floquet-gap`, which applies only after Tier 1 computes $\Delta_{\mathbf{k}}\le0$.

The same handoff appears in `certificate_gates.floquet_gap` with status `not_computed_in_tier0`. This is a positive omission rule: Tier 0 must show that Floquet stability remains open, not leave the field absent.

## Certificate Gates and Failure Codes

The Tier 0 `certificate_gates` object names the promotion checks directly:

| Gate | Meaning |
| --- | --- |
| `quotient_coordinates` | $z_\Lambda$ must be nondegenerate after global rotations are removed |
| `scale_separation` | radius and period ratios must remain inside the declared separated-scale regime |
| `speed_ordering` | $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ must hold within tolerance |
| `phase_closure` | layer winding closure over $P_{\mathbf{k}}$ must hold |
| `carrier_residuals` | state return and center drift residuals must remain bounded |
| `root_residual` | active causal-root defects must remain within tolerance |
| `active_root_ledger` | partner, self, and inter-layer active root classes must all be present |
| `active_separator_roots` | active near-separator roots must have an explicit continuation rule or remain below allowance |
| `near_zero_self_roots` | near-zero self roots remain excluded under $H(0)=0$ and may not count as active self hits |
| `residual_vector_semantics` | every residual component must carry value, tolerance, status, role, and note fields |
| `floquet_gap` | $\Delta_{\mathbf{k}}$ is not computed at Tier 0 and must be computed in Tier 1 |
| `tier0_continuation` | only rows whose row-level code is `candidate` may seed Tier 1 |

The row-level `failure_code` enum preserves the existing Tier 0 codes and reserves the new quotient and Floquet codes:

| Code | Meaning |
| --- | --- |
| `candidate` | the row survives Tier 0 and may seed Tier 1 only |
| `quotient-degenerate` | the quotient-coordinate row is degenerate after gauge removal |
| `scale-separation-collapse` | radius or period ratios collapse the declared separated-scale regime |
| `speed-order-collapse` | sign-aware speed ordering fails |
| `phase-closure-open` | integer layer-winding closure fails |
| `carrier-residual-open` | carrier return or drift residuals fail |
| `root-residual-open` | active causal-root residuals fail |
| `averaging-residual-open` | terms claimed to average out exceed their declared tolerance |
| `locking-residual-open` | selected locking terms exceed their declared tolerance |
| `separator-singularity-unresolved` | active near-separator roots lack an accepted handling rule |
| `near-zero-self-root-excluded` | excluded instantaneous self roots block Tier 0 promotion |
| `root-ledger-instability` | the active root ledger is empty or lacks partner, self, or inter-layer classes |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ |

## Promotion Boundary

Tier 0 can only answer a finite branch-search question: does this reduced carrier chart have an active root ledger, controlled chart residuals, and no unresolved near-zero self-root obstruction?

It cannot answer the attractor question, because that requires Tier 1 direct delayed dynamics and a positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$. It cannot answer the mass-map question, because that requires Tier 2 energy and shielding extraction. It cannot answer the inertial-response question, because that requires Tier 3 acceleration and gradient probes for $\mathcal{M}_{\text{sea}}^{ab}$.

The safe reading is therefore:

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{eligible for Tier 1 continuation}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2ce658272c030da8)

not

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{accepted } A_0 \text{ attractor}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-04837b449761ec48)

This boundary is the main protection against premature mass-map promotion.
