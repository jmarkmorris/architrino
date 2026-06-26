# EQ-22B Recombination And Acoustic Transfer

## Workstream Metadata

- Kind: `priority-packet`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Source audit: [Equation Closure Pass 2026-06-25 B](equation-closure-pass-2026-06-25-b.md)
- Parent packet: [EQ-21 Through EQ-23 And EQ-32 Shared Observation Residual Packet](eq-21-23-32-shared-observation-residual-packet.md)
- Assigned ID: `EQ-22B`
- Related corpus material: [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md)
- Claim level: observer-level recombination, visibility, sound-horizon, damping, and acoustic-transfer benchmark; native carrier dictionary; fail-closed residual target
- Promotion status: priority-only
- Current score: `2`

## Purpose

`EQ-22B` splits recombination and acoustic transfer out of the broad `EQ-22` CMB transfer row. The row asks whether one shared thermal/provenance/readout carrier can recover:

- Saha equilibrium as a detailed-balance benchmark;
- Peebles-style non-equilibrium recombination as a rate-competition benchmark;
- Thomson scattering rate, optical depth, and visibility;
- sound horizon and baryon loading;
- Silk diffusion damping;
- and a tight-coupled photon-baryon acoustic oscillator row.

The row is not a new origin story and not a claim that recombination or acoustic transfer has been derived in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is a bounded equation-mapping packet for the first reusable recombination/acoustic variable dictionary, residual, and first blocker.

## Standard Benchmark

The equilibrium recombination comparison is the Saha row

$$
\frac{x_e^2}{1-x_e}
=
\frac{1}{n_H}
\left(
\frac{m_ek_BT}{2\pi\hbar^2}
\right)^{3/2}
\exp\left(-\frac{\chi_H}{k_BT}\right).
$$

A Peebles-style rate row can be written schematically as

$$
\dot x_e
=
-C_{\mathrm{rec}}\alpha_Bn_Hx_e^2
+C_{\mathrm{rec}}\beta_B(1-x_e).
$$

The Thomson scattering rate and first decoupling gate are

$$
\Gamma_T
=
n_e\sigma_Tc_\gamma,
\qquad
\Gamma_T\approx H_{\mathrm{eff}},
$$

with optical depth and visibility row

$$
\tau_T
=
\int n_e\sigma_Tc_\gamma\,dt,
\qquad
g
=
\Gamma_Te^{-\tau_T}.
$$

The tight-coupled acoustic comparison uses

$$
c_s
=
\frac{c_\gamma}{\sqrt{3(1+R_b)}},
\qquad
r_s
=
\int\frac{c_s}{a_{\mathrm{eff}}}\,dt,
$$

with a Silk-damping comparison

$$
k_D^{-2}
\sim
\int
\frac{c_\gamma^2}{6a_{\mathrm{eff}}^2\Gamma_T}
\frac{R_b^2+\frac{16}{15}(1+R_b)}{(1+R_b)^2}
\,dt,
$$

and a compact acoustic oscillator row

$$
\ddot\Theta_{\gamma b}
+c_s^2k^2\Theta_{\gamma b}
=
S_{\gamma b}.
$$

These formulae are grounded because they are detailed-balance, rate-competition, scattering-rate, radiative-transfer, diffusion, and oscillator constraints. In this packet they remain observer-level benchmark constraints that a native shared carrier must reproduce or fail.

## Native Carrier Dictionary

Define the first `EQ-22B` carrier as

$$
\Theta_{\mathrm{rec/ac}}
=
\left(
x_e^\theta,
n_e^\theta,
\Gamma_T^\theta,
\tau_T^\theta,
g^\theta,
r_s^\theta,
k_D^\theta,
R_b^\theta,
\theta_{\gamma b}^\theta,
\Theta_{\mathrm{therm/prov}},
\Theta_{\mathrm{read}},
\mathcal L_{E\mathbf p\mathbf J}
\right).
$$

The carrier requires:

| Variable or row | Role in `EQ-22B` | Required native attachment |
| --- | --- | --- |
| $x_e^\theta$ and $n_e^\theta$ | Ionization fraction and electron density. | Shared source/thermal/provenance row, not a private CMB fit parameter. |
| $\Gamma_T^\theta$ | Thomson scattering rate. | Photon channel, electron population, and local effective clock. |
| $\tau_T^\theta$ and $g^\theta$ | Optical depth and visibility. | Same scattering-rate row and path/readout record. |
| $r_s^\theta$ and $R_b^\theta$ | Sound horizon and baryon loading. | Shared photon/baryon loading record used by BBN and CMB transfer. |
| $k_D^\theta$ | Diffusion damping scale. | Same scattering, baryon loading, and finite-window thermal record. |
| $\theta_{\gamma b}^\theta$ | Acoustic oscillator state. | Shared Noether sea path and photon-baryon transfer readout. |
| $\Theta_{\mathrm{therm/prov}}$ and $\Theta_{\mathrm{read}}$ | Thermal/provenance and observer readout records. | Same records used by `EQ-21`, `EQ-22`, `EQ-23`, and `EQ-32`. |
| $\mathcal L_{E\mathbf p\mathbf J}$ | Event ledger. | Energy, momentum, angular momentum, photon, neutrino, and medium updates across the finite window. |

## Recombination/Acoustic Residual

The first residual decomposes the comparison:

$$
\mathcal R_{\mathrm{rec/ac}}^\theta
=
\mathcal R_{x_e}^\theta
+\lambda_P\mathcal R_{\mathrm{Peebles}}^\theta
+\lambda_\tau\mathcal R_{\tau_T}^\theta
+\lambda_g\mathcal R_{\mathrm{vis}}^\theta
+\lambda_s\mathcal R_{r_s}^\theta
+\lambda_D\mathcal R_{\mathrm{Silk}}^\theta
+\lambda_{\mathrm{ac}}\mathcal R_{\mathrm{acoustic}}^\theta
+\lambda_{\mathrm{shared}}\mathcal S_{\mathrm{retune}}.
$$

| Residual term | Meaning |
| --- | --- |
| $\mathcal R_{x_e}^\theta$ | Checks Saha equilibrium for the declared temperature, density, and ionization fraction. |
| $\mathcal R_{\mathrm{Peebles}}^\theta$ | Checks the non-equilibrium rate row against declared recombination and ionization coefficients. |
| $\mathcal R_{\tau_T}^\theta$ | Checks Thomson rate, optical depth, and the decoupling gate $\Gamma_T^\theta\approx H_{\mathrm{eff}}^\theta$. |
| $\mathcal R_{\mathrm{vis}}^\theta$ | Checks the visibility row from the same optical-depth record. |
| $\mathcal R_{r_s}^\theta$ | Checks sound horizon from the same $R_b^\theta$, $c_\gamma^\theta$, and readout clock. |
| $\mathcal R_{\mathrm{Silk}}^\theta$ | Checks damping from the same scattering and baryon-loading row. |
| $\mathcal R_{\mathrm{acoustic}}^\theta$ | Checks a tight-coupled acoustic oscillator row. |
| $\mathcal S_{\mathrm{retune}}$ | Penalizes separate records for recombination, visibility, sound horizon, damping, acoustic phase, BBN handoff, and readout clock. |

`EQ-22B` is distinct from `EQ-22A`: `EQ-22A` owns photon occupancy and Planck-law mode counting, while `EQ-22B` owns recombination/visibility/acoustic transfer. Both remain downstream of the shared observation record.

## Score Decision

Current `6/23 b` score: `2`.

The score is conservative:

- the standard formula families and corpus anchors are clear;
- the native carriers are plausible and named;
- the packet supplies a variable dictionary, residual decomposition, and score-neutral solver-style attempt checker;
- but no accepted recombination/acoustic carrier, shared thermal/provenance record, photon channel, neutrino channel, Noether sea state, or event ledger has been populated.

No existing row score changes follow from this packet.

## First Blocker

First blocker: `missing_accepted_recombination_acoustic_carrier`.

The minimum evidence object is a source-backed $\Theta_{\mathrm{rec/ac}}$ carrier with:

- declared $x_e^\theta$, $n_e^\theta$, $\Gamma_T^\theta$, $\tau_T^\theta$, $g^\theta$, $r_s^\theta$, $k_D^\theta$, $R_b^\theta$, and $\theta_{\gamma b}^\theta$ rows;
- one $\Theta_{\mathrm{therm/prov}}$ and $\Theta_{\mathrm{read}}$ shared with the broader observation packet;
- photon-channel, neutrino-channel, BBN handoff, and finite-window thermal rows on the same record;
- negative controls for fitted ionization fraction, decoupling without Thomson rate, visibility without optical depth, private baryon loading, omitted Silk damping, and split thermal/readout records.

## Executable Attempt

The first concrete artifact for this lane is the score-neutral attempt fixture at [eq22b-recombination-acoustic-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-attempt.v1.json), evaluated by [eq22b-recombination-acoustic-residual.mjs](../../../scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --summary --pretty
```

The expected attempt run returns `schemaOk: true`, `status: blocked_missing_accepted_recombination_acoustic_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_recombination_acoustic_carrier`. The normalized sample's Saha, Peebles, Thomson/visibility, sound-horizon, Silk-damping, acoustic-transfer, source-provenance, hidden-retune, and negative-control diagnostics should pass. They do not count as accepted retained evidence because the recombination/acoustic carrier and every row binding remain `status: attempt`.

The runner also reports a compact `sourceAudit` for the required rows. The default attempt keeps every row source path resolving, but this is only provenance hygiene: row status remains `attempt`. Priority packets, authored AAA prose, generated files, attempt fixtures, mocks, probes, and negative controls are not accepted retained evidence sources. Accepted-looking rows with those source paths fail before score movement with `accepted_without_evidence_source`.

## Source-Attempt Fixture

The score-neutral source-attempt fixture is [eq22b-recombination-acoustic-source-attempt.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-source-attempt.v1.json --summary --pretty --require-populated
```

This fixture makes the carrier contract executable without claiming retained evidence. It fixes one `commonCarrierId`, source-window id, thermal/provenance id, readout-clock id, photon-packet id, neutrino-handoff id, BBN-handoff id, event-ledger id, and no-hidden-retune witness id across the recombination/acoustic row map. Every row remains `attempt`, so the expected result remains `status: blocked_missing_accepted_recombination_acoustic_carrier`, `scoreDecision: no_score_increase`, and `nextBlocker: missing_accepted_recombination_acoustic_carrier`. The `--require-populated` form must exit nonzero until a durable source-backed $\Theta_{\mathrm{rec/ac}}$ carrier exists.

The fail-closed generic/source control is [eq22b-recombination-acoustic-generic-source-negative-control.v1.json](../../../scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json):

```bash
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json --summary --pretty
node scripts/equation-mapping/eq22b-recombination-acoustic-residual.mjs --input scripts/equation-mapping/eq22b-recombination-acoustic-generic-source-negative-control.v1.json --summary --pretty --require-populated
```

This fixture marks the carrier and rows accepted-looking while sourcing them to priority packets, authored corpus prose, and the fixture itself. The expected result is `status: blocked_source_evidence`, `scoreDecision: no_score_increase`, `nextBlocker: accepted_without_evidence_source`, and `sourceEvidenceFailureCount: 17`; the `--require-populated` form must exit nonzero.

## Promotion Disposition

Classification: `priority-only`.

Promote now: no.

Potential later targets:

- [CMB](../../../content/markdown/aaa/cosmology/CMB.md), after the carrier is accepted enough to state the recombination/acoustic residual reader-facing.
- [BBN Constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), only after the same photon, baryon, neutrino, and thermal rows preserve BBN handoff.
- [Structure Formation](../../../content/markdown/aaa/cosmology/structure-formation.md), only after acoustic transfer and growth readouts share the same observation carrier.

## Next Evidence Object

The next score-moving artifact is not another normalized fixture. It is a source-backed $\Theta_{\mathrm{rec/ac}}$ carrier whose row bindings are accepted and whose thermal/provenance/readout record keeps recombination, visibility, sound horizon, damping, acoustic transfer, BBN handoff, and observation readout on one record.
