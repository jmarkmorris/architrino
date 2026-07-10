# Six-Point Symmetry Invariant Lemma Proof Packet

Status: priority-only proof packet, 2026-07-06; operator-reviewed and accepted as staged, 2026-07-07; native central-solver kernel equivariance audit completed 2026-07-07 (see the Native Central-Solver Kernel Equivariance Audit section below).
Claim level: derivation-closure proof for the invariance and reduction obligations only. This packet does not claim a retained branch, accepted evidence, force/action closure, stability, transverse-manifold stability, observer export, score movement, or corpus promotion.
Corpus disposition: operator review complete; theorem-target restatement is promotable in reader-facing form. The native central-solver kernel is audited equivariant under both lemma actions on all retained-history force-row paths, so the staged lemma may be applied to native records once the same-record binding chain exists. Any retained-history application still requires same-record receiver-normal branch-strength evidence, action/wake/event/support rows, and stability evidence.

Owner scaffold: [six-point-symmetry-invariant-lemma-row.mjs](../../../scripts/braid-ideal/six-point-symmetry-invariant-lemma-row.mjs), tests in [braid-ideal-six-point-symmetry-invariant-lemma-row.test.js](../../../tests/braid-ideal-six-point-symmetry-invariant-lemma-row.test.js).
Companion audit: [Six-Point Equivariant Reduction Proof Audit](six-point-equivariant-reduction-proof-audit-2026-07-06.md).
Executable witness spec: [Angular-Momentum Held-Release Sweep Spec](angular-momentum-held-release-sweep-spec.md).

Notation: architrino sites use the signed polarity-unit labels $\epsilon_{+,x},\epsilon_{+,y},\epsilon_{+,z}$ (positrinos) and $\epsilon_{-,x},\epsilon_{-,y},\epsilon_{-,z}$ (electrinos). The owner-script identifiers `P_x`, `E_x`, and similar strings are stable runtime implementation identifiers, not a second taxonomy.

Proof-ref value for the owner row:

`priority-proof-packet:reference/priorities/braid-ideal/six-point-symmetry-invariant-lemma-proof-packet.md`

## Setup and Definitions

Six architrino worldlines $\mathbf X_\ell:[-h,T^*)\to\mathbb{R}^3$ carry labels $\ell\in\{\epsilon_{+,x},\epsilon_{+,y},\epsilon_{+,z},\epsilon_{-,x},\epsilon_{-,y},\epsilon_{-,z}\}$ with polarities $\sigma_{\epsilon_{+,\bullet}}=+1$, $\sigma_{\epsilon_{-,\bullet}}=-1$. The face-opposite seed is $\epsilon_{+,x}=(R,0,0)$, $\epsilon_{+,y}=(0,R,0)$, $\epsilon_{+,z}=(0,0,R)$, $\epsilon_{-,i}=-\epsilon_{+,i}$. The finite memory depth is $h$ and the field speed is $c_f$.

The retained force law under proof is the partner-wake master-equation kernel as implemented in the held-release toy, with same-source rows optionally included. For receiver $\ell$ at absolute time $T$,

$$
\mathbf A_\ell[\mathbf X]\!(T)
=
\sum_{\ell'}\;
\sum_{t_r\in\mathcal R_{\ell\ell'}[\mathbf X]\!(T)}
\sigma_\ell\sigma_{\ell'}\,\kappa\,
\frac{W(t_r)}{\left(d^2+\varepsilon^2\right)^{3/2}}\;\mathbf d
$$

where $\mathbf d=\mathbf X_\ell(T)-\mathbf X_{\ell'}(t_r)$, $d=\|\mathbf d\|$, $\hat{\mathbf d}=\mathbf d/d$, the causal roots $t_r$ solve $d=c_f(T-t_r)$ within the retained history window, $\varepsilon$ is the softening, $\kappa$ the coupling, and the branch weight is

$$
W
=
\left|
\frac{c_f-\mathbf v_{\mathrm{rec}}\cdot\hat{\mathbf d}}
{\operatorname{floor}\!\left(c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d}\right)}
\right|
$$

with a sign-preserving Jacobian floor. Every scalar in the kernel is a function of separation, delay, source-normal speed, receiver-normal speed, floors, softening, and coupling.

Symmetry data. For $\rho\in S_3$ acting on the coordinate axes, let $M_\rho$ be the coordinate-permutation matrix, and let $\rho$ permute site labels within each polarity ($\epsilon_{+,\mathrm{axis}}\mapsto\epsilon_{+,\rho(\mathrm{axis})}$, likewise $\epsilon_-$). Let $\iota=(-\mathbb I,\ \epsilon_+\leftrightarrow\epsilon_-)$ be point inversion composed with polarity exchange. Both act on configurations by

$$
(g\cdot\mathbf X)_\ell(t)=M_g\,\mathbf X_{g^{-1}\ell}(t)
$$

Because $-\mathbb I$ commutes with every permutation matrix, the groups are direct products:

- zero-angular-momentum group $G_0=S_3\times\langle\iota\rangle$, order 12;
- axis-neutral rotating group $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$, order 6, where $C_3=\langle\varrho\rangle$ is the cyclic subgroup and $M_\varrho=\operatorname{Rot}(\hat{\mathbf n},2\pi/3)$ with $\hat{\mathbf n}=(1,1,1)/\sqrt3$.

A history is $G$-invariant when $g\cdot\mathbf X=\mathbf X$ on $[-h,0]$ for all $g\in G$.

## Hypotheses

- **(A1) Kernel equivariance.** The force magnitude depends only on the invariant scalars above times the polarity product $\sigma_\ell\sigma_{\ell'}$, directed along $\hat{\mathbf d}$. The implemented toy kernel satisfies this by inspection: the coefficient is $\kappa\,q_\ell q_{\ell'}\,W/(d^2+\varepsilon^2)^{3/2}$ times the displacement, $W$ and the Jacobian floor are functions of normal-speed scalars, and the optional acceleration cap rescales by the norm, which is invariant.
- **(A2) Symmetric retained-root policy.** The retained-root set $\mathcal R_{\ell\ell'}$ is determined by the root residual and declared invariant criteria only (history window, delay filter for same-source rows, dedupe), with no ordering-dependent or label-dependent pruning, so that $\mathcal R_{g\ell,g\ell'}[g\cdot\mathbf X]=\mathcal R_{\ell\ell'}[\mathbf X]$.
- **(A3) Well-posedness window.** On $[0,T^*)$: pairwise separations stay $\ge d_{\min}>0$ and all speeds stay $\le\beta c_f$ with $\beta<1$. Then each directed-pair root residual $\varphi(t)=\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(t)\|-c_f(T-t)$ satisfies $\varphi'(t)\ge c_f(1-\beta)>0$, so each directed pair has exactly one causal root in the window; delays are bounded below by $d_{\min}/c_f$; source-normal denominators satisfy $D_s\ge c_f(1-\beta)$, so the Jacobian floor is automatic; the root time is a Lipschitz functional of the history by the implicit function theorem; and the method of steps yields a unique forward solution.
- **(A4) Symmetric initial data.** The hold-window history is $G$-invariant for the relevant group: the static face-opposite seed is $G_0$-invariant; the axis-neutral rigid rotation $\mathbf X_\ell(t)=\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)$, $t\in[-h,0]$, is $G_{\mathrm{rot}}$-invariant because $\operatorname{Rot}(\hat{\mathbf n},\omega t)$ commutes with both $M_\varrho$ and $-\mathbb I$. Transpositions map $\omega\mapsto-\omega$ and are excluded; this is where ordered-braid chirality first enters the rotating channel.

## Lemma

Under (A1)-(A4), the unique solution satisfies $\mathbf X(t)\in\operatorname{Fix}(G)$ for all $t<T^*$.

Zero-angular-momentum form, $G=G_0$:

$$
\epsilon_{+,x}=(a,b,b),
\qquad
\epsilon_{+,y}=(b,a,b),
\qquad
\epsilon_{+,z}=(b,b,a),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

so the channel reduces to a closed two-function state-dependent delay system in $(a,b)$.

Axis-neutral rotating form, $G=G_{\mathrm{rot}}$:

$$
\epsilon_{+,y}=\varrho\,\epsilon_{+,x},
\qquad
\epsilon_{+,z}=\varrho^2\,\epsilon_{+,x},
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed three-function reduced system in $\epsilon_{+,x}$ alone, containing every axis-neutral surface-speed row of the sweep spec.

## Proof

**Step 1 (functional equivariance).** Fix $g\in G$. The root residual is invariant: $\|M_g\mathbf X_\ell(T)-M_g\mathbf X_{\ell'}(t)\|=\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(t)\|$, so the root residual of the pair $(g\ell,g\ell')$ under $g\cdot\mathbf X$ equals that of $(\ell,\ell')$ under $\mathbf X$, and by (A2) the retained root sets correspond. At each root, $\hat{\mathbf d}\mapsto M_g\hat{\mathbf d}$; every scalar in the kernel is built from norms and dot products of transformed vectors and is invariant; and the polarity product is preserved: permutations fix each $\sigma_\ell$, while $\iota$ flips both factors. Hence each root contribution transforms by $M_g$, and summing,

$$
\mathbf A_{g\ell}[g\cdot\mathbf X]\!(T)=M_g\,\mathbf A_\ell[\mathbf X]\!(T)
$$

The $\iota$ case is precisely the charge-conjugate inversion oddness obligation: $\mathbf A_{\iota\ell}[\iota\cdot\mathbf X]=-\mathbf A_\ell[\mathbf X]$.

**Step 2 (uniqueness transfer).** Let $\mathbf X$ be the unique solution with $G$-invariant history. By Step 1, $g\cdot\mathbf X$ is also a solution, and its history equals the given history by (A4). Uniqueness from (A3) forces $g\cdot\mathbf X=\mathbf X$ for every $g\in G$, i.e. $\mathbf X(t)\in\operatorname{Fix}(G)$ for all $t<T^*$. $\square$

**Step 3 (fixed-set computation).** For $G_0$: the transposition $(y\,z)$ with label swap forces $\epsilon_{+,x}=(a,b,b)$; the cyclic elements propagate the form to $\epsilon_{+,y},\epsilon_{+,z}$; $\iota$ forces $\epsilon_{-,i}=-\epsilon_{+,i}$. For $G_{\mathrm{rot}}$: only the cyclic and inversion constraints remain, leaving $\epsilon_{+,x}\in\mathbb{R}^3$ free with $\epsilon_{+,y}=\varrho\,\epsilon_{+,x}$, $\epsilon_{+,z}=\varrho^2\,\epsilon_{+,x}$, $\epsilon_{-,i}=-\epsilon_{+,i}$. $\square$

## Corollaries

1. **Center and antipodal exactness.** The dynamic center is identically zero and antipodal pairs are exact on both forms while the hypotheses hold.
2. **Common sphere and common speed in both forms.** $\|\epsilon_{+,y}\|=\|M_\varrho\,\epsilon_{+,x}\|=\|\epsilon_{+,x}\|$, so the common-sphere and common-speed observations hold on the rotating channel too; the reduced-radius diagnostic is exact on the invariant channel, not an empirical six-site average.
3. **Tangent template.** The stabilizer of $\epsilon_{+,x}$ in $G_0$ is the transposition $(y\,z)$, which forces $\ddot{\epsilon}_{+,x}=(A,B,B)$; this is exactly the tangent-acceleration template carried by the owner row.
4. **Angular-momentum direction.** On $\operatorname{Fix}(G_{\mathrm{rot}})$ the kinematic diagnostic $\mathbf J_{\mathrm{kin}}=\sum_i\mathbf x_i\times\mathbf v_i$ is fixed by $M_\varrho$ and by $\iota$, hence exactly parallel to $\hat{\mathbf n}$.
5. **Discrete flow.** The toy integrator is composed of equivariant maps and label-symmetric operations, so the discrete flow preserves $\operatorname{Fix}(G)$ in exact arithmetic. Observed residuals at the $10^{-16}$ scale are roundoff; any larger fixed-point drift is a runner or root-selection defect, not a physical signal.
6. **Both prehistory modes covered.** The static hold history is $G_0$-invariant, hence $G_{\mathrm{rot}}$-invariant, and the rigid-rotation release velocity is $G_{\mathrm{rot}}$-equivariant, so both `kick-at-release` and `moving-prehistory` initial data lie in the rotating invariant channel. `moving-prehistory` is velocity-matched at release (a $C^1$ junction with an acceleration jump, the same junction class as the existing static hold); `kick-at-release` carries a velocity jump but remains admissible history data. This resolves sweep-spec proofing questions 1 and 2: no separate rotating-frame lemma is required for invariance.

## Failure Modes

1. Loss of (A3) — a field-speed crossing or collision-margin loss — ends the conclusion at $T^*$. In super-field-speed windows roots multiply and (A2) carries real weight: the retained-root policy must remain invariant or the lemma is void for that run.
2. Any kernel or runner term violating (A1) or (A2) — an axis-fixed cap, asymmetric softening, ordering-dependent pruning — voids the lemma for that run. The lemma therefore doubles as an audit predicate on runners and on the native central solver.
3. The lemma proves invariance of the manifold, not stability transverse to it. The axial-paired control already shows a different decoration losing the channel; nothing here upgrades that.
4. No retention, force/action closure, return response, Noether sea response, branch chart, moving certificate, observer export, or score movement follows from this packet.

## Obligation Discharge Map

| Owner-row obligation | Status after this packet |
| --- | --- |
| `coordinate_permutation_equivariance_of_retained_force_law` | Discharged at priority level by Step 1 for the declared kernel class, verified against the implemented toy kernel and, per the 2026-07-07 native audit below, against the native central-solver kernel on all retained-history force-row paths (with the named exclusions listed there). |
| `charge_conjugate_inversion_oddness_of_retained_force_law` | Discharged by the $\iota$ case of Step 1; polarity-product preservation is the whole content. |
| `complete_retained_root_set_no_asymmetric_root_pruning` | Mathematically discharged: under (A3) the root per directed pair is unique, so the policy is trivially symmetric; in multi-root windows the toy's declared policy (all detected roots plus invariant delay filter) is invariant. Row-level `retained_root_ledger_ref` binding remains blocked; no accepted ledger exists. |
| `same_record_binding_for_retained_history_rows` | Blocked by design at `retained_record_id` / `provider_object_ref`; preserved as the application-time blocker under the acceptance chain. |

Populating `force_law_equivariance_proof_ref` with this packet's ref advances the owner-row evidence ladder from `force_law_equivariance_proof_missing` to `retained_root_ledger_missing` and no further; the producer still terminates fail-closed at `acceptance_certificate_ref`, all authorization flags remain false, and `scoreMovement` remains `no_score_increase`.

## Application Boundary

- This lemma authorizes exact reduced-coordinate diagnostics and fixed-point-drift audits for the held-release toy and the capped angular-momentum sweep. It does not authorize retained force/action evidence from those runs.
- The native-kernel equivariance audit is complete (2026-07-07, below): both lemma actions are preserved on all audited retained-history force-row paths. Application to any native central-solver retained-history record now requires only the same-record binding chain (retained record, source row, provider object, receiver-normal branch-strength rows) and must respect the audit's named exclusions: the axis-fixed `comparison_b` output, the Animator display rows, and the T3 periodic-box paths are never lemma-scope evidence, and any consumer forming a force row from native hit rows must take both signed polarity units $\epsilon_{+,\bullet}/\epsilon_{-,\bullet}$ from the same record so that polarity enters only through $\sigma_i\sigma_j$.
- The frozen-octahedral mean-power value is not consumed anywhere in this packet; cross-chart ledger consumption remains disallowed.

## Native Central-Solver Kernel Equivariance Audit (2026-07-07)

Audit scope: every native kernel code path that enters a retained-history force row, checked for exact equivariance under both lemma actions — $G_0=S_3\times\langle\iota\rangle$ (coordinate permutation with site relabeling; inversion plus polarity exchange) and $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$ (rotation $\operatorname{Rot}(\hat{\mathbf n},2\pi/3)$, realized exactly as the cyclic coordinate permutation, plus the same inversion element). Because $C_3\subset S_3$ acts by the identical coordinate-permutation matrices, every path equivariant under the $S_3$ generators and $\iota$ is automatically equivariant under both groups; the audit below therefore reports one geometric argument per path and both verdicts follow together.

### Audited Paths

1. **Causal-root search** — `src/solver/src/CausalRootSolver.cpp`. The root residuals for all three source-history forms (`evaluate_root_function`, `evaluate_circular_source_root_function`, `evaluate_moving_circular_source_root_function`, lines 76-183) are built solely from the displacement norm $\|\mathbf x_{\mathrm{rec}}(T)-\mathbf x_{\mathrm{src}}(t)\|$ and the invariant quantity $c_f(T-t)$; under simultaneous orthogonal transformation of receiver and source path segments the residual is unchanged, and time is untouched. The scan-and-bisect machinery (lines 554-601 and its two mirrors) subdivides the emission-time window and brackets sign changes of the invariant residual, so bracket placement, refinement, and `RootUnresolved` marking commute with both actions. Root dedupe (`is_duplicate_root`, lines 403-407) uses emission-time proximity only. All bracketed roots are retained; `rootId` follows emission-time scan order. Verdict: equivariant.
2. **Branch weighting (receiver-normal over source-normal)** — `compute_receiver_normal_fields` (CausalRootSolver.cpp lines 193-241) and `make_root` (lines 243-401). Source-normal and receiver-normal speeds are $\mathbf d\cdot\mathbf v/\|\mathbf d\|$; under coordinate permutation both vectors rotate together, and under $\iota$ both $\mathbf d$ and $\mathbf v$ flip sign, so every normal-speed scalar, the crossing factor, the signed factor, and `branchWeight` $=\left|\dfrac{c_f-\mathbf v_{\mathrm{rec}}\cdot\hat{\mathbf d}}{c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d}}\right|$ (lines 212-226, 259-261) are invariant. Verdict: equivariant.
3. **Delay evaluation** — `delay = hitTime − emissionTime` in `make_root` (line 253 and mirrors); the delayed-potential path (`compute_delayed_potential`, `src/solver/src/Geometry.cpp` lines 768-809) iterates the delay from sample-point/emission-point distances only, with isotropic scalar floors (field speed at 0.001, softening at 0.0001, distance at 0.0001). Verdict: equivariant.
4. **Same-source handling** — `root_kind_for` (`src/solver/src/RootLedger.cpp` lines 61-72) classifies self rows by source/receiver identity only; same-source requests run the identical residual machinery with no polarity or coordinate dependence. Verdict: equivariant. Scope note: the native kernel imposes no same-source delay filter; that filter is a toy-side declared policy, owned by obligation 3's ledger binding, not an asymmetry.
5. **Retained-root ledger rows** — `build_root_ledger_detail` (RootLedger.cpp lines 221-303): stable sort by (emission time, root id); gap and tail rows derived from invariant time intervals; site labels enter only through FNV row keys (lines 32-55), never through numeric physics. No pruning. Verdict: equivariant up to key relabeling.
6. **Retained-history pair force law (integration path)** — `src/solver/src/MotionSampler.cpp`. Delayed-source causal-root selection (`pair_constraint_delayed_source_state_at_hit_time`, lines 1334-1433; `pair_interaction_delayed_source_state_at_hit_time`, lines 1809-1896) selects by minimum $|$residual$|$ with a latest-emission-time tie-break inside the root tolerance (lines 1357-1368, 1831-1842) — a declared single-root policy stated entirely in invariant scalars, so it commutes with both actions and coincides with the complete root set on the lemma's unique-root window (A3). Polarity enters the force only through the sign of the charge product (`state.charge * other.charge <= 0.0 ? 1.0 : -1.0`, lines 530-531 and 597-598; also `master_equation_accelerations`, `src/solver/src/SolverCAbi.cpp` lines 3697-3698), which $\iota$ preserves by flipping both factors; for unit polarity charges this is exactly the $\sigma_i\sigma_j$ convention, and the `<=` zero tie-break is unreachable for $\pm1$ polarity units. Softening is the isotropic $d^2+\varepsilon^2$ (lines 528-529, 595-596; SolverCAbi.cpp lines 3694-3695). Verdict: equivariant.
7. **Delayed-hit row emission** — `solve_delayed_hits` (CausalRootSolver.cpp lines 903-942) and `to_delayed_hit_row_from_root` (SolverCAbi.cpp lines 782-819): strength is the unsigned branch weight, direction is the normalized displacement, and polarity is deliberately absent from the row; the bridge metadata schema carries both signed polarity units (`source_charge_sign`, `receiver_charge_sign`, `src/solver/include/architrino/solver/SolverCAbi.hpp` lines 418-424) so the $\sigma_i\sigma_j$ product is formed by the same-record consumer. Verdict: equivariant and polarity-neutral by design.

### Convention Mismatches (Documented, Not Equivariance Defects)

- **Floor convention.** The native kernel carries no sign-preserving Jacobian floor; small source-normal denominators produce `SmallJacobian` status at the root tolerance (CausalRootSolver.cpp lines 234-235, 262-263) and consumers floor $|$jacobian$|$ isotropically (SolverCAbi.cpp lines 631-632; observer-field distance floor at line 578). The delayed-potential path floors the causal denominator as $\max(0.08,|\kappa|)$ (Geometry.cpp line 796), a magnitude-only floor rather than the packet's sign-preserving floor — magnitude-equivalent for the audited actions because every floor argument is an invariant scalar.
- **Single-root selection versus all-root sum.** The MotionSampler pair path retains one causal root per directed pair (best-residual, latest-time); the packet kernel sums all retained roots. On the (A3) window the policies coincide; in multi-root windows the native policy is symmetric but incomplete, and the difference is owned by the retained-root-ledger blocker on obligation 3.
- **Branch weight absent from the integrated pair force.** The delayed source state is rebuilt with zero velocity (MotionSampler.cpp lines 1424-1431) and the pair law consumes positions only, so the receiver-normal branch weight lives on root/hit rows, not inside the integrated pair force. Symmetric in itself; a kernel-form difference from the packet's $W$-weighted sum.
- **Floating-point ordering caveat.** Source sums are accumulated in `pathKey` order (MotionSampler.cpp lines 1483-1487, 1908-1913, 1972-1976) and component norms in fixed $x,y,z$ order, so bitwise equality under relabeling or coordinate permutation is not guaranteed. Exact equivariance holds in exact arithmetic; roundoff-scale drift is the Corollary 5 runner-audit channel, not a physical signal.

### Named Non-Equivariant Surfaces (Excluded From Lemma Scope)

- **`comparison_b` axis-fixed cross product** — SolverCAbi.cpp lines 582-584 (`field_cross({1,0,0}, electric)`) and its bridge mirror `src/solver/app/SolverAppBridge.mjs` lines 9583-9585. This term is axis-fixed and pseudo-vectorial, hence not equivariant under either action. It is an explicitly named comparison output, not a force row; it must never be consumed as lemma-scope evidence.
- **Single-sided observer-field polarity factor** — the observer-field electric contribution multiplies one `charge_sign` (SolverCAbi.cpp lines 579-581; bridge default 0 at SolverAppBridge.mjs line 9561). This is the correct field-level potential-superposition convention; $\iota$-oddness of the force emerges only when the consumer multiplies the receiver polarity unit, so native-record applications must bind both signed polarity units from the same record.
- **Animator delayed-hit adapter** — `src/solver/app/AnimatorDelayedHitRows.mjs` line 301 hard-codes the source-normal speed to zero; visualization rows only, never force evidence.
- **T3 periodic-box stepping** — axis-aligned periodic wrap (`src/solver/src/T3BulkStep.cpp`); outside lemma scope, and `t3_row` is already a named negative control on the owner row.

### Audit Verdict

- $S_3\times\langle\iota\rangle$ (two-function channel): **equivariant** on all audited retained-history force-row paths in exact arithmetic; polarity enters only through $\sigma_i\sigma_j$ wherever the kernel forms a signed force, and is deferred to the same-record consumer wherever rows are polarity-neutral.
- $C_3\times\langle\iota\rangle$ (three-function channel, both sweep prehistory modes): **equivariant** on the same paths; the $C_3$ generator acts by the cyclic coordinate permutation contained in the $S_3$ argument.
- No non-equivariant force-row code path was found. The staged lemma is cleared for native-record application at the kernel-equivariance obligation, subject to the exclusions above. Same-record binding remains blocked by design at `retained_record_id`/`provider_object_ref` until retained-root-ledger evidence exists; no authorization flag changes, `scoreMovement` remains `no_score_increase`, and the lemma remains staged.

## Validation Commands

```bash
node --test tests/braid-ideal-six-point-symmetry-invariant-lemma-row.test.js
node scripts/braid-ideal/six-point-symmetry-invariant-lemma-row.mjs --force-law-equivariance-proof-ref=priority-proof-packet:reference/priorities/braid-ideal/six-point-symmetry-invariant-lemma-proof-packet.md --pretty
node scripts/check-receiver-normal-clean-slate.mjs
```

## Promotion Classification

- Corpus promotion: defer with blocker; candidate destinations after operator review are [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md#nested-shell-braid-dynamics) and [neutral-braid](../../../content/markdown/aaa/noether-braid/neutral-braid.md) as a theorem-target restatement without priority links.
- Priority status: obligations 1-2 discharged at priority level, obligation 3 discharged conditionally, obligation 4 blocked as intended.
- Next proofing consumers: the capped angular-momentum held-release sweep (executable witness with exact drift residual) and the delayed escape certificate lemma on the reduced three-function system.
