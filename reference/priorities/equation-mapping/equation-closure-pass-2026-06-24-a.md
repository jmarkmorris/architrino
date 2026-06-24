# Equation Closure Pass 2026-06-24 A

## Workstream Metadata

- Kind: `closure-pass`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Score ladder: [Equation Score-5 Closure Ladder](equation-score-5-closure-ladder.md)
- Assigned IDs: `EQ-12A`, `EQ-22A`, `EQ-26A`
- Status: `score-neutral Planck/action/blackbody/fine-structure-running pass`
- Scope: priority-only; no reader-facing corpus promotion and no existing score changes
- Claim level: derivation/closure targets with executable attempt residual

## Summary

This pass adds three suffix rows instead of appending new terminal equation numbers:

| ID | Target | Conservative score |
| --- | --- | --- |
| `EQ-12A` | Planck action quantum, de Broglie relations, and braid action scale | `2` |
| `EQ-22A` | Planck blackbody law, mode counting, and photon occupancy | `2` |
| `EQ-26A` | Fine-structure constant, electromagnetic coupling, and energy running | `2` |

The suffix placement avoids renumbering the existing closure ecosystem. `EQ-12A` owns the action quantum itself, while `EQ-12` keeps photon transport. `EQ-22A` owns the Planck-law occupancy and mode-count core, while `EQ-22` keeps the CMB transfer and acoustic observation record. `EQ-26A` owns the dimensionless coupling and running, while `EQ-26` keeps the atomic envelope, Rydberg, and line-set residual.

## Executable Residual

The new checker is [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs), with attempt fixture [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json).

It evaluates one combined score-neutral residual family:

$$
\mathcal R_{\mathrm{Planck}\alpha}
=
\mathcal R_h
+\mathcal R_{\mathrm{bb}}
+\mathcal R_\alpha
+\mathcal R_{\mathrm{prov}}
+\mathcal S_{\mathrm{retune}}.
$$

The Planck-action component is now framed through a retained braid action one-form rather than as three independent appearances of $h$. Let

$$
\Omega_h
=
\mathrm d p\wedge \mathrm d q
+
\int_{-\tau_{\max}}^{0}
\mathrm d p_{\mathrm{hist}}(\sigma)
\wedge
\mathrm d q(\sigma)\,
w(\sigma)\,\mathrm d\sigma,
\qquad
\mathrm d\vartheta=\Omega_h,
$$

and define

$$
h_\vartheta=\oint_{\gamma_0}\vartheta,
\qquad
\hbar_\vartheta=\frac{h_\vartheta}{2\pi}.
$$

The executable attempt still checks the normalized readouts $E=h_\vartheta\nu$, $E=\hbar_\vartheta\omega$, $h_\vartheta=2\pi\hbar_\vartheta$, and angular-momentum unit consistency, but the score-moving target is the Period Quantization Lemma: the energy, momentum, and angular-momentum projections of $\vartheta$ must extract one action period, with wake-storage and radiated/self-hit flux changes closing over a retained period.

The blackbody component checks

$$
\bar n_\nu
=
\frac{1}{\exp((h_\vartheta\nu-\mu_\gamma)/(k_BT))-1},
\qquad
u_\nu
=
\frac{8\pi h_\vartheta\nu^3}{c_\gamma^3}
\bar n_\nu,
$$

together with zero photon chemical potential and a minimum thermalization-depth residual. The preferred proof route is maximum entropy on the mode measure, with the transverse factor in $8\pi\nu^2/c_\gamma^3$ supplied by the Gate B mode-count row and $\mu_\gamma=0$ supplied by absence of a conserved photon-number symmetry.

The fine-structure/running component checks

$$
\alpha
=
\frac{q_{\mathrm{obs}}^2}
{4\pi\epsilon_0\hbar c_\gamma},
\qquad
\alpha(\mu)
=
\frac{1}
{\alpha(\mu_0)^{-1}-b\ln(\mu/\mu_0)}
$$

for the declared effective charged-threshold coefficient $b$.

The shared carrier is a fiber product over the minimal common action/photon interface:

$$
\Theta_\star
=
\left(
\vartheta,
P_\gamma,
c_\gamma,
\theta_{\mathrm{sea}}
\right),
\qquad
\Theta_{h\alpha}
=
\Theta_h
\times_{\Theta_\star}
\Theta_{\mathrm{bb}}
\times_{\Theta_\star}
\Theta_\alpha.
$$

This keeps running $\alpha(\mu)$ confined to $\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}})$ and $I_\mu$. A fit that requires $\partial h_\vartheta/\partial\ln\mu\ne0$ fails the packet rather than retuning the action unit.

## Required Rows

The checker requires:

- `theta_gamma_packet`;
- `theta_star_common_action_photon_carrier`;
- `planck_braid_carrier`;
- `braid_action_one_form_row`;
- `history_space_symplectic_row`;
- `period_uniqueness_row`;
- `photon_action_quantum_row`;
- `phase_cycle_angular_momentum_row`;
- `photon_packet_row`;
- `thermal_mode_counting_row`;
- `planck_occupancy_row`;
- `temperature_clock_conversion_row`;
- `alpha_coupling_row`;
- `charge_exposure_row`;
- `local_photon_speed_row`;
- `vacuum_polarization_wake_dressing_row`;
- `energy_scale_running_row`;
- `fiber_product_cocycle_witness`;
- `source_provenance`;
- `no_hidden_retune_witness`.

All rows in the attempt fixture are marked `attempt`. The accepted-row policy therefore rejects them for score movement, even though the normalized diagnostics pass.

## Attempt Result

Running

```sh
node scripts/equation-mapping/planck-alpha-braid-residual.mjs --summary --pretty
```

reports:

```text
status: blocked_missing_rows
scoreDecision: no_score_increase
nextBlocker: missing_accepted_theta_gamma_packet
planckQuantumPass: true
periodUniquenessPass: true
blackbodyPass: true
alphaRunningPass: true
negativeControlPassCount: 8
negativeControlCount: 8
```

The first blocker is intentionally inherited from the photon packet row. Once an accepted photon packet exists, the next score-moving work is the retained cycle-action row for `EQ-12A`, accepted thermalization/mode-count rows for `EQ-22A`, and accepted electromagnetic exposure/coupling/running rows for `EQ-26A`.

## Negative Controls

The attempt fixture requires these failures to be detected:

- detuned Planck energy/frequency relation;
- $\mu$-dependent extracted action periods;
- wrong blackbody mode-count dimension;
- per-bin temperature fitting;
- nonzero photon chemical potential or insufficient thermalization;
- longitudinal-mode leakage;
- scale-independent $\alpha$ across energy scales;
- hidden retune.

## Score Disposition

No existing score changes follow from this pass.

New rows enter the score table at `2`:

| ID | Current score | Reason |
| --- | --- | --- |
| `EQ-12A` | `2` | The action-unit target is explicit and executable as an attempt residual, but no retained closed-cycle action row derives $h$ or $\hbar$. |
| `EQ-22A` | `2` | The Planck-law residual is explicit, but mode counting and thermalization remain finite-window derivation targets. |
| `EQ-26A` | `2` | The coupling/running residual is explicit, but charge exposure, gauge covariance, threshold inventory, and scale-dependent response rows are not accepted. |

## Review Response Integration

The Emmy Noether-style response has been preserved as [emmy-noether-planck-alpha-response-2026-06-24.md](../../entourage/review-packets/emmy-noether-planck-alpha-response-2026-06-24.md). Its central correction is now integrated here: $h$ is the period of one retained action one-form $\vartheta$, not an independently inserted constant in $E=h\nu$, $\mathbf p=\hbar\mathbf k$, and $\oint p\,dq=nh$. The response also sharpens the blackbody proof route to maximum entropy plus mode counting, and turns running $\alpha(\mu)$ into a falsifier for any scale-dependent action period.

Supersession note: [Equation Closure Pass 2026-06-24 B](equation-closure-pass-2026-06-24-b.md) refines this pass by replacing the raw history-space period target with a retained-orbit reduction, replacing the shared action/photon fiber product with a sea-state fibration, and requiring $h_\vartheta$ to be geometry-derived before blackbody or fine-structure rows consume it.

## Next Reducer

The next useful reducer is not a broader constants catalog. It is the first accepted retained action one-form and period-uniqueness packet:

$$
\Theta_h
\longrightarrow
\left(
\vartheta,
\Omega_h,
E-h_\vartheta\nu,
E-\hbar_\vartheta\omega,
\mathbf p-\hbar_\vartheta\mathbf k,
\oint_\gamma\vartheta-nh_\vartheta,
J-n\hbar_\vartheta,
\mathcal H_{\mathrm{hist}},
\mathcal S_{\mathrm{retune}}
\right).
$$

If that packet can be populated with durable source-backed rows, it becomes the common action-unit carrier for photon transfer, blackbody occupancy, atomic spectra, Compton/recoil, resonance lifetime, and fine-structure coupling work. The first external falsifier is to extract $h_\vartheta$ from $\alpha(0)$, one atomic fine-structure anchor, and one running point; disagreement under refinement kills the combined Planck/action/coupling route.

## Entourage Review Packet

The self-contained Emmy Noether review packet for this pass lives at [emmy-noether-planck-alpha-2026-06-24.md](../../entourage/review-packets/emmy-noether-planck-alpha-2026-06-24.md). The integrated response lives at [emmy-noether-planck-alpha-response-2026-06-24.md](../../entourage/review-packets/emmy-noether-planck-alpha-response-2026-06-24.md).
