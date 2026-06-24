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

The Planck-action component checks

$$
E=h\nu,
\qquad
E=\hbar\omega,
\qquad
h=2\pi\hbar,
$$

and leaves the closed-cycle action and angular-momentum rows as retained-geometry obligations.

The blackbody component checks

$$
\bar n_\nu
=
\frac{1}{\exp((h\nu-\mu_\gamma)/(k_BT))-1},
\qquad
u_\nu
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\bar n_\nu,
$$

together with zero photon chemical potential and a minimum thermalization-depth residual.

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

## Required Rows

The checker requires:

- `theta_gamma_packet`;
- `planck_braid_carrier`;
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
blackbodyPass: true
alphaRunningPass: true
negativeControlPassCount: 7
negativeControlCount: 7
```

The first blocker is intentionally inherited from the photon packet row. Once an accepted photon packet exists, the next score-moving work is the retained cycle-action row for `EQ-12A`, accepted thermalization/mode-count rows for `EQ-22A`, and accepted electromagnetic exposure/coupling/running rows for `EQ-26A`.

## Negative Controls

The attempt fixture requires these failures to be detected:

- detuned Planck energy/frequency relation;
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

## Next Reducer

The next useful reducer is not a broader constants catalog. It is the first accepted retained cycle-action packet:

$$
\Theta_h
\longrightarrow
\left(
E-h\nu,
E-\hbar\omega,
\mathbf p-\hbar\mathbf k,
I_{\mathrm{cyc}}-nh,
J-n\hbar,
\mathcal S_{\mathrm{retune}}
\right).
$$

If that packet can be populated with durable source-backed rows, it becomes the common action-unit carrier for photon transfer, blackbody occupancy, atomic spectra, Compton/recoil, resonance lifetime, and fine-structure coupling work.
