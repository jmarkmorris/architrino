# Zeeman Effect

## Standard-Theory Concept

The Zeeman effect is the magnetic-environment splitting of atomic spectral lines. In the weak-field comparison regime, an observer-level level shift is

$$
\Delta E_Z
=
g_J\mu_B m_J B,
$$

and a transition between upper and lower levels has the frequency shift

$$
\Delta\omega_Z
=
\frac{\mu_B B}{\hbar}
\left(g_u m_u-g_l m_l\right).
$$

Here $B$ is an observer-level effective magnetic readout, not an architrino-level input. The normal orbital limit supplies the additional coefficient target

$$
\Omega_B^{\mathrm{orb}}
\longrightarrow
\frac{|q|B}{2m_{\mathrm{resp}}}.
$$

Plainly: the benchmark asks whether one declared magnetic environment shifts and polarizes an atomic line by the correct amount. It does not insert a primitive magnetic field into the substrate dynamics.

## Benchmark Cases

The staged comparison begins with the normal Zeeman pattern:

| Viewing direction | Observer-level line pattern | Recovery burden |
| --- | --- | --- |
| Transverse to the effective magnetic axis | One central component and two symmetric side components | Recover side spacing and the linear-polarization basis from one magnetic-state map and photon-channel event record. |
| Longitudinal along the effective magnetic axis | Two symmetrically shifted components | Recover the circular-polarization pair, handedness, and equal spacing from the same record. |

The anomalous Zeeman cases are the next pressure test. Quartets, sextets, and higher multiplets must inherit the atomic envelope, ordered-frame spinor, angular-momentum, photon, and analyzer-response records. They may not be recovered by assigning an independent fitted $g_J$ to each observed line.

Plainly: recovering a normal triplet is the classical-limit test. Recovering the anomalous multiplets without line-by-line tuning is the stronger test of the internal angular-momentum and spin-response account.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals And Ownership

- [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md#magnetic-and-recoil-spectral-benchmarks) already states the normal coefficient, polarization, anomalous-multiplet, and laboratory/stellar source-reconstruction targets.
- [EQ-26 Observation-First Precision Packet](../../mapping-equations/analysis/eq-26-31-observation-first-precision-packet.md#eq-26-atomic-spectral-constants-finehyperfine-structure-and-lamb-shift-class) owns the exact atomic-spectrum residual row, including fine, hyperfine, Zeeman, and Stark consumers.
- [Equation Mapping Detail](../../mapping-equations/analysis/equation.md#eq-27-magnetic-moment-larmorcyclotron-precession-and-g-2) owns the exact `EQ-27` magnetic-moment and precession row.
- [Mapping Electromagnetism](../../mapping-electromagnetism/priorities.md) owns the cross-row recovery of effective electric and magnetic readouts from assembly geometry, causal history, and Noether sea response.
- This file owns the case-first laboratory and source-reconstruction benchmark decomposition. It has no equation-score authority and does not establish retained evidence.

## Shared Benchmark Record

A useful case record is

$$
\Theta_Z
=
\left(
\Theta_{\mathrm H,\mathrm{spec}},
\Theta_B^{\mathrm{eff}},
\mathcal L_{E\mathbf p\mathbf J},
\mathcal T_\gamma,
\mathcal D_{\mathrm{det}},
\hat{\mathbf n}_{\mathrm{view}}
\right),
$$

where $\Theta_{\mathrm H,\mathrm{spec}}$ is the retained atomic spectral carrier, $\Theta_B^{\mathrm{eff}}$ is the effective magnetic-state projection, $\mathcal L_{E\mathbf p\mathbf J}$ is the shared transition ledger, $\mathcal T_\gamma$ is the photon polarization record, $\mathcal D_{\mathrm{det}}$ is the analyzer and detector record, and $\hat{\mathbf n}_{\mathrm{view}}$ declares the viewing direction.

The benchmark residual should expose at least

$$
\mathcal R_Z(\Theta_Z)
=
\left(
\mathcal R_{\mathrm{sym}},
\mathcal R_{\mathrm{coeff}},
\mathcal R_{\mathrm{pol}},
\mathcal R_{\mathrm{anom}},
\mathcal R_{\mathrm{src}}
\right),
$$

for symmetric normal splitting, the Larmor coefficient, polarization selection, anomalous-multiplet structure, and shared laboratory/stellar source reconstruction. Every component must consume the same declared atomic, magnetic-state, photon, and analyzer records for the selected case.

Plainly: the line positions, polarization pattern, and inferred magnetic state must come from one record. A collection of separate fits does not close the benchmark.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue authority; [work-queue.md](../work-queue.md) retains that authority through `XTM-008`.

1. `normal_zeeman_pattern` — Recover the transverse triplet and longitudinal circular-polarization pair from one effective magnetic-state and photon/analyzer record. Status: `draft`.
2. `normal_zeeman_coefficient` — Recover $\Omega_B^{\mathrm{orb}}=|q|B/(2m_{\mathrm{resp}})$ and its factor-of-two relation to the corresponding cyclotron coefficient under one exposed mass response. Status: `draft`.
3. `anomalous_zeeman_multiplets` — Recover non-normal component counts and spacings from the ordered-frame spinor and angular-momentum ledgers without per-line $g_J$ fitting. Status: `draft`.
4. `zeeman_polarization_analyzer` — Bind linear/circular polarization selection to viewing direction and a finite analyzer-response record. Status: `draft`.
5. `laboratory_stellar_zeeman_handoff` — Require laboratory calibration and stellar or solar source reconstruction to consume the same effective magnetic-state map. Status: `draft`.

Plainly: these draft steps separate the easy normal-pattern check from the harder anomalous-multiplet and source-reconstruction obligations.

## Closure Objects

- Retained atomic spectral carrier with recovered transition labels.
- Effective magnetic-state projection derived from source assemblies and Noether sea response.
- Ordered-frame spinor and angular-momentum ledger for anomalous multiplets.
- Photon-channel transition and polarization event ledger.
- Analyzer, viewing-direction, and detector-response record.
- One no-hidden-retune witness across line positions, polarizations, and source reconstruction.

Plainly: advancement requires the atomic source, effective magnetic state, photon polarization, and analyzer to remain identifiable parts of one case record.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [Atomic Spectra](../../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md#magnetic-and-recoil-spectral-benchmarks) | Normal and anomalous line patterns consume one atomic, magnetic-state, photon, and analyzer record without per-line fitting. |
| This file | angular-momentum-spin | Anomalous multiplets remain downstream of an accepted ordered-frame spinor and angular-momentum response. |
| This file | [Mapping Electromagnetism](../../mapping-electromagnetism/priorities.md) | The effective magnetic readout is recovered from source geometry and Noether sea response rather than inserted as substrate ontology. |
| This file | [validation-gates](../../dormant-deferred/validation-gates/priorities.md) | Laboratory and stellar Zeeman reconstruction share coefficients, polarization conventions, and the magnetic-state map. |

## Failure Modes

- `zeeman.field_import` — $B$ or a magnetic acceleration rule is inserted at the architrino level instead of recovered as an observer-level effective readout.
- `zeeman.per_line_g_fit` — Separate fitted $g_J$ values replace a shared anomalous-multiplet response.
- `zeeman.carrier_split` — Line spacing, polarization, and source reconstruction use different atomic or magnetic-state records.
- `zeeman.polarization_missing` — Frequencies are fitted while the transverse and longitudinal polarization patterns are omitted.
- `zeeman.normal_only_overclaim` — Recovery of the normal triplet is presented as closure of anomalous multiplets or spin response.
- `zeeman.lab_stellar_retune` — Laboratory calibration and stellar or solar inference require different effective magnetic coefficients without a declared state variable.
