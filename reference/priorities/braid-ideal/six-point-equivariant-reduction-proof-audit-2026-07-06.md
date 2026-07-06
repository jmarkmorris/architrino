# Six-Point Equivariant Reduction Proof Audit

Status: priority-only proof audit, 2026-07-06.
Source: operator-supplied proofing response to the retained-branch strategy prompt.
Claim level: proof target and diagnostic-routing correction only. This packet does not claim a retained branch, accepted evidence, score movement, or corpus promotion.
Corpus disposition: defer with blocker. Promote only after the proof is reviewed and any accepted retained-history application carries same-record receiver-normal branch-strength evidence, action/wake/event/support rows, and stability evidence.

## Live Scaffold

The current owner script is [six-point-symmetry-invariant-lemma-row.mjs](../../../scripts/braid-ideal/six-point-symmetry-invariant-lemma-row.mjs). Its row is deterministic and fail-closed at:

- object: `same_record_force_law_equivariance_proof_for_six_point_symmetry_invariant_lemma`;
- field: `six_point_symmetry_invariant_lemma_row.force_law_equivariance_proof_ref`.

The row already names four proof obligations:

1. coordinate-permutation equivariance of the retained force law;
2. charge-conjugate inversion oddness of the retained force law;
3. complete retained root set with no asymmetric root pruning;
4. same-record binding for retained-history rows.

The proofing audit changes the local priority interpretation: `angular_momentum_held_release_sweep` is the best search-moving diagnostic, but not the best proof-moving object by itself. The proof-moving object is the equivariant reduction lemma; the sweep should be its executable witness.

## Route Correction

The angular-momentum sweep must not become another unbounded parameter-grid program. A toy return row remains non-authorizing under the same discipline that keeps frozen-octahedral diagnostics non-authorizing. The sweep should be capped at the declared five surface-speed fractions times two prehistory modes, and each row should report a fixed-point-drift residual in addition to reduced-radius behavior.

The frozen-octahedral mean-power value $m_*\approx1.15740669293$ cannot be consumed as a hypothesis for a held-release no-return theorem. It was certified on a different rigid fixed-speed chart. It can motivate the theorem target, but cross-chart ledger consumption would violate the same-record proof boundary.

## Primary Proof Target

Lemma target: six-point equivariant reduction, zero-angular-momentum and axis-neutral rotating forms.

Assume six architrino worldlines under the partner-wake master-equation kernel. The acceleration of receiver $i$ at absolute time $T$ is a sum over sources $j\ne i$ and retained causal roots $t_r$ satisfying

$$
\|\mathbf x_i(T)-\mathbf x_j(t_r)\|=c_f(T-t_r),
$$

with magnitude depending only on invariant scalars such as separation, delay, source speed, branch weight, and softening, multiplied by the polarity product $\sigma_i\sigma_j$ along the line of action.

Required assumptions:

- **A1. Kernel equivariance.** The force row is invariant under simultaneous orthogonal transformation of receiver and source path segments, and polarity enters only through $\sigma_i\sigma_j$.
- **A2. Complete symmetric root set.** Retained-root selection includes every root passing the declared policy and commutes with the symmetry action; there is no asymmetric root pruning.
- **A3. Well-posedness window.** On $[0,T^*)$, every root is transversal with Jacobian above the declared floor, all speeds stay below $c_f$, and the root map is locally Lipschitz.
- **A4. Symmetric history.** The hold-window path history is invariant under the relevant finite group: $S_3\ltimes\langle\iota\rangle$ for the zero-angular-momentum seed, or $C_3\ltimes\langle\iota\rangle$ for axis-neutral rigid rotation about $\hat{\mathbf n}$.

Target conclusion:

The unique solution stays on the fixed-point set $\mathrm{Fix}(G)$ for all $t<T^*$. For $S_3\ltimes\langle\iota\rangle$,

$$
P_x=(a,b,b),
\qquad
P_y=(b,a,b),
\qquad
P_z=(b,b,a),
\qquad
E_i=-P_i,
$$

so the zero-angular-momentum channel reduces to a two-function state-dependent delay system in $(a,b)$. For $C_3\ltimes\langle\iota\rangle$,

$$
P_y=\sigma P_x,
\qquad
P_z=\sigma^2 P_x,
\qquad
E_i=-P_i,
$$

where $\sigma$ is the cyclic coordinate permutation. This gives a closed three-function reduced system in $P_x$ and covers the axis-neutral surface-speed rows.

Immediate corollaries:

- the dynamic center remains zero;
- antipodal pairs remain exact while the hypotheses hold;
- the reduced-radius diagnostic is exact on the invariant channel rather than an empirical six-site average;
- fixed-point drift in a numerical run is a runner or root-selection defect, not a new physical signal.

## Failure Modes

1. Root bifurcation or transversality loss ends the lemma at $T^*$.
2. Any runner or solver term violating A1 or A2 voids the lemma for that run.
3. Numerical drift off $\mathrm{Fix}(G)$ should be treated as a runner audit failure.
4. The lemma does not prove stability transverse to the invariant manifold.
5. The lemma does not claim retention, accepted branch closure, or observer export.

## Ranked Proofing Actions

1. `six_point_symmetry_invariant_lemma` - Draft the equivariant reduction proof packet for zero-angular-momentum and axis-neutral rotating forms, discharging the first three proof obligations while preserving same-record binding as the application-time blocker.
2. `angular_momentum_held_release_sweep` - Implement the capped sweep as the lemma's witness, reporting fixed-point-drift residuals and reduced-radius sign sequence for the declared rows only.
3. `delayed_escape_certificate_lemma` - State a conditional no-return certificate for a single state-plus-history row: outward $\dot R$ at $T_0$, monotone $R$ over one memory depth behind $T_0$, sub-field-speed, Jacobian floor, and an inverse-square bound on delayed inward force imply no later return turn.
4. `sh0sea_dipole_wake_sum` - Compute the leading delayed dipole-lattice wake sum over the 12 FCC neighbor braids with declared held histories and no fitted amplitude.
5. `native_retained_history_promotion` - Run the native central-solver retained-history path only after the sweep identifies a named row and only with the operator acceptance decision kept in the same closure packet.

## Freeze List

- Further fold-aware `theta3minus` jet-coefficient refinement of the frozen fixed-speed octahedral chart.
- Acceptance-certificate acquisition sweeps over repo, GitHub, temp, or app surfaces.
- New schema, verifier, or provenance-package construction in `braid-ideal` or `SH-0-sea` before a physics row exists.
- Frequency-family ranking before the one-band return mechanism exists.
- Metadata-only run-handle expansion in [Shell-Braid Run Matrix](sh-run-matrix.md).
- Cross-chart consumption of frozen-ledger quantities into held-release theorem hypotheses.

## Follow-Up Prompt

```text
Closure goal:
Draft the six-point equivariant reduction proof packet that discharges the force-law equivariance proof obligations for the current fail-closed lemma row, while preserving same-record retained-history binding as an application-time blocker.

Task:
- Read `scripts/braid-ideal/six-point-symmetry-invariant-lemma-row.mjs`, its test, this proof audit, and the angular-momentum held-release sweep spec.
- Write the proof packet under `reference/priorities/braid-ideal/`.
- State the zero-angular-momentum $S_3\ltimes\langle\iota\rangle$ form and the axis-neutral rotating $C_3\ltimes\langle\iota\rangle$ form.
- Prove kernel equivariance, charge-conjugate inversion oddness, and symmetric-root-set closure under explicit assumptions.
- Leave same-record binding, retained root ledger, acceptance certificate, retained branch status, and score movement fail-closed.

Constraints:
- Do not claim a retained branch.
- Do not import frozen-octahedral mean-power values as held-release hypotheses.
- Do not add new gate/checker/schema infrastructure unless the proof cannot be stated without it.
- Preserve canonical terminology: causal roots, causal wakes, field speed $c_f$, receiver-normal branch strength.

Expected output:
- Priority-only proof packet.
- Any small owner-script/test update needed to point at the proof packet without authorizing acceptance.
- Validation result.
```
