# Fold-Crossing Sustained-Alignment Window Packet

Status: window-measurement / decision packet, 2026-07-07. Follows the [Fold-Crossing Chart Spec](fold-crossing-chart-spec.md) Section 7 disposition `non_coincident_cross_hit_hinge_restores_a2_finite_impulse_contingent_on_sustained_velocity_alignment`: the non-coincident cross-hit fold restores the Section 2 finite $A_2$ chart impulse only if the alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ is *sustained* at finite separation over a click window. Section 2 assumed the window depth $\mu_0$ by hand; this packet derives it from real nested middle-binary orbital kinematics and decides the absorber inequality.

Proof ID: `SH-0-sea` (self-hit fold-chart sub-target of `self_hit_held_release_solver_row`, Group A item 3).

Claim level: diagnostic derivation. Not accepted evidence; no retained branch; no force/action, Noether-sea, stability, or click-mechanism closure. Every output fails closed at the central seed-path certificate and the central retained-history row. Zero free amplitude.

Executable artifact: [fold-crossing-sustained-alignment-window-diagnostic.mjs](../../../../scripts/braid-ideal/fold-crossing-sustained-alignment-window-diagnostic.mjs), tests [braid-ideal-fold-crossing-sustained-alignment-window-diagnostic.test.js](../../../../tests/braid-ideal-fold-crossing-sustained-alignment-window-diagnostic.test.js) (5 passing).

Accepted-evidence blocker preserved (unchanged): object `held_release_seed_path_rows_acceptance_certificate.v0`; field `held_release_seed_path_rows.acceptance_certificate_ref`; downstream producer boundary `central_solver_retained_history_row`.

## The Question

The cross-hit fold is the locus $D_s=c_f-\mathbf V_s\cdot\hat{\mathbf r}=0$ — the source's Mach-cone caustic. Section 7 showed it sits at finite chord $r_c=O(\rho)$ (generic $A_2$) at the *instant* of alignment. The Section 2 impulse $\chi(\kappa/r_c^2)\sqrt{2\mu_0/a}$ integrates over the unfolding window $\mu_0$, which Section 7 left as an assumed input. The controlled click books a real $h_{\mathrm{act}}$ only if the fold is *visited for a finite reception window* at finite chord. This packet measures that window.

## Model

A middle-binary source orbits radius $\rho_M$ at super-field rim fraction $\beta_M>1$ (velocity magnitude $\beta_M c_f$); an outer receiver orbits radius $\rho_R$ at $\beta_R$, in the [Nested Shell Braid](../../../../content/markdown/aaa/noether-braid/explored-braid-geometries.md) middle/outer coplanar geometry. For each reception time $T$ over one source period the diagnostic solves the causal roots of the receiver against the source path, tracks the near-fold root (minimum $|D_s|$), and records the reception interval over which a fold-born root persists at finite chord. From that window it derives the depth $\mu_0$, the recurrence $N_{\mathrm{click}}$ per period, the booked Section 2 impulse, the receiver-normal sign $D_T$, and the absorbed fraction of the certified per-rotation pump $2\pi c_1\kappa/(c_f^2\rho_M)$.

## Result

The cross-hit fold is reached at finite chord in every declared configuration ($\min|D_s|$ down to $0.003$, chord $\approx1.2$–$2.5=O(\rho)$), confirming Section 7. But the alignment is **transient, not sustained**: the fold is visited for only a small fraction of the source period.

| $\beta_M$ | $\beta_R$ | $\min|D_s|$ | $N_{\mathrm{click}}$/period | window fraction | booked/period | pump/period | absorbed |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `1.05` | `0.5` | `0.016` | `1` | `1.0%` | `0.016` | `18.1` | `0.1%` |
| `1.10` | `0.3` | `0.043` | `1` | `1.0%` | `0.047` | `18.1` | `0.3%` |
| `1.10` | `0.9` | `0.003` | `1` | `1.6%` | `0.050` | `18.1` | `0.3%` |
| `1.20` | `0.5` | `0.043` | `1` | `3.1%` | `0.075` | `18.1` | `0.4%` |

The kinematic cross-hit clicks absorb well under $1\%$ of the pump — the same order as the other closed absorbers (aligned sea $\le10\%$, breathing $\le27\%$, dynamic induced polarization $\le10\%$).

**Extending to a held hinge.** If the middle binary is held on its co-linear hinge branch ($v_M=c_f$ sustained over a dwell arc), the window depth $\mu_0$ grows with the dwell fraction while the curvature $a$ is held fixed, so the Section 2 impulse scales as $\sqrt{\mu_0}\sim\sqrt{\text{dwell}}$. Extending the widest kinematic window ($3.1\%$) to full dwell under this conservative fixed-curvature scaling raises the absorbed fraction only to $\approx2.3\%$ — still short of the pump. The true held limit drives the fold **non-transversal** ($a\to0$: a sustained $D_s\equiv0$ is a degenerate fold line, not a point), where the Section 2 transversal formula ($d\mu/dT=D_T\neq0$, $a\neq0$) no longer applies and the transacted action is set by the dwell dynamics rather than the chart.

## Decision

`cross_hit_alignment_transient_not_sustained_insufficient_reduces_to_declared_hinge_branch`. Sustained cross-hit alignment is **not kinematically generic**: nested circular orbits give only a transient fold visit ($\le3\%$ of the period) that books $<0.5\%$ of the pump, and even a conservative full-dwell hold stays below $\approx2.3\%$. A chart-clean, pump-beating hinge click therefore requires the **declared middle-binary hinge branch** that holds $v_M=c_f$ co-linearly over a dwell arc — and in that held limit the fold is non-transversal, so the transacted action is a retained-history / formation-history question, not a kinematic one.

This is exactly the dynamic-alignment / formation-history burden already isolated for induced sea orientational polarization (the aligned neighbor order that guaranteed retention needs is likewise not energetically self-selected and must be maintained dynamically or by formation history). **The two remaining open burdens are one problem**: whether the braid's formation/recycling history maintains a field-speed co-linear middle-binary hinge (equivalently, an aligned sea orientation) long enough to transact. Discharging that one branch/formation question discharges both the hinge-click and the induced-polarization routes; leaving it open leaves both conditional.

Fail-closed throughout: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`, no accepted seed-path certificate, no new schema or validator; the promotion path stays blocked at `central_solver_retained_history_row`.

## Follow-Up

The one remaining question is now sharp and singular: does the nested-shell braid's formation/recycling dynamics sustain the field-speed co-linear middle-binary hinge (equivalently, aligned sea orientational order) over a click window? That is a retained-history dynamic-braid computation on the central-solver path — the same object that also gates induced sea orientational polarization — not another fixed-geometry or kinematic toy. Both surviving retention routes reduce to it.

Next closure goal: on the retained-history dynamic-braid row (once the seed-path certificate unblocks it), measure whether the formation/ring-down dynamics hold the middle-binary field-speed co-linear hinge (or the aligned sea orientation) over a click window, deciding the shared dynamic-alignment / formation-history burden that gates both surviving retention routes.
