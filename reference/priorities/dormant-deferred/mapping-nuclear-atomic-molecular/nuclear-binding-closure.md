# Nuclear Binding Closure

This detailed priority file supports [Nuclear Atomic Molecular Closure](./priorities.md) and remains downstream of [Standard Model Closure](../../mapping-standard-model/priorities.md). It captures the downstream opportunity in [Nuclear Binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md).

## Core Opportunity

Nuclear binding is not the next hard gate for the whole theory, but it is the first place where the hadronic program must show it can coarse-grain successfully above quarks and nucleons. The starting effective decomposition is

$$
E_{\text{nuc}}
=
\sum_{a=1}^{A}M_a c_{\text{eff}}^2
+
E_{\text{res-strong}}
+
E_{\text{Coul}}
+
E_{\text{excl}}
+
E_{\text{shell}}
+
E_{\text{sea-pol}}.
$$

The priority opportunity is to turn this into a minimal nuclear benchmark ladder instead of leaving it as descriptive structure.

When residual strong channels, beta stability, or nuclear reaction routes become event claims, this packet consumes the shared residual-routing event-ledger theorem. It owns the hadronic and nuclear residual definitions; the shared packet owns the common channel-routing and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger contract.

## Benchmark Ladder

| Benchmark | Required closure |
| --- | --- |
| Deuteron / diproton split | Bind the $p+n$ triplet channel while keeping the singlet channel unbound before Coulomb; the $p+p$ channel must then remain unbound after identical-proton spin-statistics restrictions and Coulomb are applied. |
| Saturation | Show why binding energy per nucleon does not grow without bound as $A$ increases. |
| Alpha-like cluster | Explain why $2p+2n$ is an especially favorable local minimum. |
| Beta stability | Combine nuclear energy, proton-neutron mass difference, electron/neutrino channel, and medium contribution into one stability condition. |

## Effective Potential Target

The first usable object is a two-nucleon effective potential:

$$
V_{NN}(r)
=
V_{\text{excl}}(r)
+
V_{\text{Coul}}(r)
+
V_{\pi/\text{corr}}(r)
+
V_{\text{sea-pol}}(r).
$$

The proof burden is to derive or constrain the signs, range, channel dependence, and saturation behavior of these terms from hadronic assembly geometry, meson-like corridor formation, spin-statistics restrictions, and local Noether sea polarization. It is not enough to borrow the nuclear-force shape and relabel it. In the deuteron/diproton split, the potential must be channel-indexed before Coulomb is allowed to do explanatory work: the $p+n$ triplet channel may bind, while the singlet channel must remain unbound before adding the $p+p$ Coulomb penalty.

### First Confinement-Energetics Consumer

The first native consumer of the confinement packet is not a new nuclear gate. It is the row that tells this potential which part of the color-corridor energy functional it is allowed to use. Let $\Gamma_{N_1}$ and $\Gamma_{N_2}(r)$ be the closed color-corridor graphs of two accepted color-singlet nucleon source envelopes at separation $r$. The confinement packet supplies

$$
\Delta E_{\mathrm{corr}}^{NN}(r)
=
\min_{\Theta_{12}\in\Pi_{\mathrm{singlet}}}
\mathcal{E}_{\mathrm{conf}}
\left[
\Gamma_{N_1}\cup\Gamma_{N_2}(r),
\Theta_{12}
\right]
-
\sum_{i=1}^{2}
\min_{\Theta_i\in\Pi_{\mathrm{singlet}}}
\mathcal{E}_{\mathrm{conf}}
\left[
\Gamma_{N_i},
\Theta_i
\right].
$$

This row may feed only the residual strong and Noether sea polarization part of the two-nucleon potential:

$$
V_{\pi/\text{corr}}(r)
+
V_{\text{sea-pol}}(r)
\leftarrow
\Delta E_{\mathrm{corr}}^{NN}(r).
$$

The open-corridor string tension $\sigma_{\mathrm{eff}}$ and this finite two-singlet residual must come from the same color-corridor functional: the same axis-exceptionality charges, transverse Noether sea response, and ambient $\rho_{\text{NS}},\chi_{\text{sea}}$ state. The accepted behavior is finite range:

$$
\Delta E_{\mathrm{corr}}^{NN}(r)\to0
\quad
\text{as}
\quad
r\to\infty,
$$

with no open-color far field between color-singlet nucleons. The first useful calculation is therefore not a fitted Yukawa curve; it is the comparison between two isolated closed nucleon corridors and a paired closed-corridor minimization. The row is rejected if it needs an independent residual-force parameter, leaves unscreened color leakage, or binds $p+p$ as easily as $p+n$ after spin-channel, $V_{\text{Coul}}$, orientation, and branch-interface rows are included.

[NN Corridor Overlap First Evaluation](./nn-corridor-overlap-first-evaluation.md) records the first reduced numerical row for that comparison. It gives a candidate $p+n$ attractive window and keeps the corresponding $p+p$ row positive after orientation suppression, branch-interface mismatch, and Coulomb are included. Its channel weights now come from a first $\mathcal B_{ij}^{\mathrm{int}}$ extraction; the ranges and scales remain source leads until the same confinement functional produces them directly.

## Branch-Interface Exchange Residual

Source-mining intake 2026-06-28. Legacy "bonded vortices" language is not current terminology, but it preserves one useful nuclear target: residual-strong binding should report a coupled interface row rather than only a scalar potential. In current terms, the candidate branch-interface exchange record is

$$
\mathcal B_{ij}^{\mathrm{int}}
=
\left(
\chi_i,\chi_j,
\sigma_{\mathrm{orient}},
\Delta\phi_{ij},
\Delta\omega_{ij},
\lambda_{\mathrm{exp}},
\Delta E_{\mathrm{out}},
\mathcal L_{E\mathbf p\mathbf J}^{ij}
\right),
$$

where $\chi_i,\chi_j$ are the participating nucleon branch labels, $\sigma_{\mathrm{orient}}$ records relative orientation, $\Delta\phi_{ij}$ and $\Delta\omega_{ij}$ record phase and cadence mismatch, $\lambda_{\mathrm{exp}}$ records exposure leakage through the shared corridor, $\Delta E_{\mathrm{out}}$ records output radiation or heat-channel terms when present, and $\mathcal L_{E\mathbf p\mathbf J}^{ij}$ closes the local ledger.

This row is not a new gate. It is the concrete residual to test whether one hadronic interface account can carry corridor sharing, saturation, photon or radiation output, and Noether sea update without smuggling in an independent residual-force rule.

## Reaction-Provenance Worked Example

Pu-238 radioisotope power is a useful downstream worked example once the alpha-channel and heat-channel rows are ready. The target is not a new gate; it is a concrete provenance exercise:

$$
\Theta_{\mathrm{Pu238\to RTG}}
=
\left(
\mathcal{A}_{\mathrm{Pu238}},
\mathcal{A}_{\alpha},
\mathcal{A}_{\mathrm{U234}},
\mathcal{R}_{\mathrm{recoil}},
\mathcal{H}_{\mathrm{heat}},
\mathcal{S}_{\gamma},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{H}_{\mathrm{path}}
\right).
$$

The row asks the nuclear packet to trace the parent assembly, alpha output, daughter assembly, recoil, thermalization channel, any photon rows, conserved ledger, and path-history provenance through one familiar engineering-facing reaction chain. It should be attempted only after the hadronic and alpha-like cluster rows can supply a credible branch record.

## Promotion Targets

| Target $\mathbb{A}\mathbb{A}\mathbb{A}$ file | Promotion condition |
| --- | --- |
| [nuclear-binding](../../../../content/markdown/aaa/nuclear-atomic/nuclear-binding.md) | The benchmark ladder and first effective potential target are promoted into explicit acceptance gates. |
| [nucleon-structure](../../../../content/markdown/aaa/nuclear-atomic/nucleon-structure.md) | Nucleon spin, color-singlet structure, and residual strong corridors are connected to the nuclear potential terms. |
| [mesons](../../../../content/markdown/aaa/assemblies/mesons/mesons.md) | Meson-like exchange is stated as a corridor/provenance mechanism, not a primitive residual force. |

## Priority Boundary

Keep this packet downstream of quark mass, confinement, baryon stability, and weak-sector provenance. It becomes active when the hadronic sector is stable enough to support nuclear benchmarks.
