# Nuclear Binding

This chapter gives the first effective-level nuclear-binding picture for the nuclear branch. The reader should keep one distinction in view from the start: nuclear binding is not the same thing as opening the internal structure of a proton or neutron. Ordinary nuclear energy comes from rearranging a multi-nucleon assembly ledger, not from exposing the deeply shielded branch energy of the surviving nucleons.

The purpose is to say what the binding ingredients are, what level of coarse-graining is being used, and what kinds of nuclear questions the shared language is meant to support before any precision model exists.

## Purpose

This chapter states the first effective-level nuclear-binding picture for $\mathbb{A}\mathbb{A}\mathbb{A}$. The aim is not yet a precision nuclear model. The aim is to define the binding ingredients clearly enough that deuteron-scale, alpha-scale, fission, fusion, and saturation questions can be posed in one shared language.

## Binding-Energy Intuition

The traditional nuclear-binding curve compares how much energy is missing from a nucleus relative to the same protons and neutrons separated as free nucleons. A large binding energy means the bound nucleus has lower total mass-energy. This sign convention is the common source of confusion: the iron-group region is a peak if the vertical axis is binding energy per nucleon, but it is a trough if the vertical axis is total mass-energy per nucleon.

The core intuition is this: nature releases exposed nuclear energy when a reaction moves the nucleon inventory toward a cheaper assembly ledger. Light nuclei can release energy by joining into better-packed states. Very heavy nuclei can release energy by splitting into less overburdened daughter states. Both paths move toward the same total-energy basin.

The plain-language picture is that a nucleus is not only a list of protons and neutrons. It is a packed nuclear assembly whose nucleons share short-range residual-strong corridors and polarize the surrounding Noether sea. Good packing lowers the total energy because the shared corridor and sea-polarization state is cheaper than the same nucleons held in less favorable arrangements. Bad packing raises the total energy because Coulomb repulsion, short-range exclusion, deformation, and shell mismatch leave energy in a stressed nuclear configuration.

Fusion releases energy on the light side of the curve because very light nuclei are under-bound. Bringing them together can create more favorable proton-neutron corridor sharing and a cheaper shared Noether sea polarization record, while Coulomb and exclusion costs are still manageable. The final nucleus has lower total energy than the separated reactants, so the difference must leave through reaction products, recoil, radiation, neutrinos when weak channels participate, or heating of the surrounding medium.

Fission releases energy on the heavy side of the curve for the opposite geometrical reason. A very heavy nucleus has many protons whose electrical repulsion reaches across the whole assembly, while residual strong attraction is short-ranged and saturates after each nucleon has used only a limited number of favorable packing relationships. Splitting the nucleus can replace one overburdened assembly with two better-packed daughter assemblies. Even though the word `fission` sounds like simply breaking a bond, the final daughters can carry greater total binding than the parent.

The shared insight is therefore not that joining always releases energy or that splitting always releases energy. The shared insight is that both processes can move the nucleon inventory toward the iron-group trough in total mass-energy. Fusion moves light nuclei upward in binding energy from the left. Fission moves heavy nuclei upward in binding energy from the right. On the total-energy plot, both move downhill toward the same basin.

From the $\mathbb{A}\mathbb{A}\mathbb{A}$ perspective, the released energy was held in the initial nuclear assembly ledger: in less favorable residual-strong corridor use, Coulomb stress, short-range exclusion and deformation cost, shell mismatch, and the Noether sea polarization state around the nucleus. It should not be read as a fuel stored inside a single proton or neutron. Ordinary fission and fusion rearrange nucleons; they do not split a proton, neutron, electron, or photon into its deeper architrino constituents.

For that reason, ordinary fission and fusion should not be treated as direct releases of the deeply shielded internal energy of Standard Model particle assemblies. The shielded internal energy and far-field leakage pattern of each surviving proton or neutron mostly carry through the reaction. What changes is the higher-level nuclear binding ledger and the surrounding Noether sea response of the nuclear assembly. A reaction that actually opened, destroyed, or changed the internal branch of a nucleon would be a different claim and would require its own particle-level provenance and shielding ledger.

This is the main accounting point. The same final energy can be reported as a mass defect in observer language, but the physical story still has to say where the released ledger difference goes: fragment kinetic energy, photons, recoil, medium excitation, local Noether sea update, or heat.

The speed symbol in these energy rows belongs to a declared observer-level branch. Primitive delayed-root calculations use $c_f=1$; $c_{\mathrm{eff}}(\mathbf X,T)$ is the Noether sea dressed assembly-channel speed, $c_\gamma(\mathbf X,T)$ is the photon-channel speed, and $c_0$ is the recovered weak-homogeneous observer normalization. This chapter keeps $c_{\mathrm{eff}}$ symbolic until the branch and environment are declared, following the [speed convention in Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

The same accounting applies to fission. The mass defect is exposed nuclear-assembly energy because the daughter arrangement has a cheaper corridor, Coulomb, shell, deformation, and Noether sea polarization ledger than the parent arrangement. At a prompt event boundary, before prompt product motion thermalizes and before delayed daughter decays add later reaction ledgers, a schematic fission ledger is

$$
\Delta E_{\mathrm{fis}}^{\mathrm{prompt}}
=
\left(
M_{\mathrm{parent}}
-\sum_d M_d
-\sum_b M_b
\right)c_{\text{eff}}^2
=
K_{\mathrm{frag}}
+K_n^{\mathrm{prompt}}
+E_\gamma^{\mathrm{prompt}}
+\Delta E_{\mathrm{med}}^{\mathrm{prompt}}
+K_{\mathrm{env-recoil}}^{\mathrm{prompt}}
+\Delta E_{\mathrm{sea}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-99fa22483822e626)

where the daughter masses $M_d$, emitted product masses $M_b$, fragment kinetic energy, prompt-neutron kinetic energy, prompt photon output, medium internal excitation already transferred by the event cutoff, bulk recoil of the surrounding target, lattice, containment, or apparatus, and the local Noether sea update all belong to the exposed nuclear ledger. The fragment and neutron kinetic rows already contain the daughter-product motion; $K_{\mathrm{env-recoil}}^{\mathrm{prompt}}$ is only the momentum transferred outside those products and is zero for an isolated event with no external receiver. Later thermalization is a downstream reclassification of the prompt kinetic and medium-excitation channels, not another sibling energy release. Daughter beta-family reactions and antineutrino output belong to later ledgers or to an explicitly extended observation window. This time boundary prevents prompt kinetic energy from being counted again as asymptotic heat. The accounting is different from claiming that ordinary fission releases the shielded internal branch energy of the surviving nucleons.

### Fusion Reaction Ledger Benchmark

The deuterium-tritium reaction is a compact benchmark for this distinction:

$$
{}^2\mathrm H+{}^3\mathrm H
\to
{}^4\mathrm{He}+n+\Delta E.
$$

[View →](../../../../equation-mapping.html#corpus-equation-6e4ca4aff83606ce)

In this interpretation, $\Delta E$ is the difference between two nuclear assembly ledgers, not a literal conversion of nucleon substance into energy. The event should be recorded as

$$
\Delta E_{\mathrm{DT}}^{\mathrm{prompt}}
=
\left(M_D+M_T-M_{\alpha}-M_n\right)c_{\text{eff}}^2
=
K_{\alpha}
+K_n
+E_{\gamma}^{\mathrm{prompt}}
+\Delta E_{\mathrm{med}}^{\mathrm{prompt}}
+K_{\mathrm{env-recoil}}^{\mathrm{prompt}}
+\Delta E_{\mathrm{sea}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-2c80d685ce6455fc)

after the branch convention for $c_{\text{eff}}$ and the environment is declared. The right side names where the exposed binding-energy difference leaves the prompt event: kinetic energy of the helium and neutron products, possible prompt photon output, medium excitation transferred by the event cutoff, bulk recoil transferred to the surrounding target, lattice, containment, or apparatus, and the local Noether sea update. The environment-recoil row is zero for an isolated event and must not duplicate motion already counted in $K_{\alpha}$ or $K_n$. These entries must not be silently collapsed into one release value before the prompt ledger closes. Later thermalization is a downstream reclassification of those transferred channels, not another sibling energy release; delayed daughter reactions belong to later ledgers. The surviving nucleons still carry their own internal branch histories. A stronger claim that fusion exposes quark-level or architrino-level shielded energy would require a separate particle-level reaction ledger.

## Core Claim

Nuclear binding is the residual strong interaction between color-singlet nucleons. It arises when neighboring proton and neutron assemblies couple through the surrounding Noether sea and through meson-like exchange channels, lowering the total energy relative to separated nucleons.

The word `residual` matters. The nuclear calculation starts from a declared interface in which quark records have been coarse-grained into proton and neutron source envelopes. It does not thereby claim that the native quark-to-nucleon closure has been derived.

So the nuclear problem is already coarse-grained one level above quarks:

- quark records are coarse-grained into declared nucleon source envelopes,
- nucleons couple through residual hadronic channels,
- nuclei are multi-nucleon bound assemblies.

## Effective Binding Decomposition

At first pass, write the nuclear energy of a nucleus with proton number $Z$ and neutron number $N$ as
$$
E_{\text{nuc}}
=
\sum_{a=1}^{A} M_a c_{\text{eff}}^2
+E_{\text{res-strong}}
+E_{\text{Coul}}
+E_{\text{excl}}
+E_{\text{shell}}
+E_{\text{sea-pol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3cd4f815f3736a71)
with $A=Z+N$.

Here:

- $M_a$ are the accepted isolated-nucleon mass readouts, the $m_{\mathrm{tr}}$ values of [Particle Masses](../assemblies/particle-masses.md), so that $B$ below reduces to the standard mass-defect definition,
- $E_{\text{res-strong}} < 0$ is the attractive residual strong contribution,
- $E_{\text{Coul}} > 0$ is proton-proton electrical repulsion,
- $E_{\text{excl}} > 0$ is short-range core exclusion or over-compression cost,
- $E_{\text{shell}}$ is the nuclear-structure term associated with filling and pairing patterns; its sign is left open because shell and pairing corrections can raise or lower the ledger relative to a smooth baseline,
- $E_{\text{sea-pol}} < 0$ is the energy gain from local Noether sea polarization and meson-like corridor formation.

The residual-strong term must carry channel composition rather than one composition-blind attraction:

$$
E_{\text{res-strong}}
=
E_{\text{res-strong}}^{pn}
+
E_{\text{res-strong}}^{pp}
+
E_{\text{res-strong}}^{nn}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f2519938cb692cd4)

with each contribution computed from the realized corridor inventory and spin-statistics sector. This corridor-composition response is only one part of the asymmetry recovery: the exclusion and shell ledgers must also supply the occupancy cost of maintaining unequal proton-side and neutron-side filling. After coarse-graining, the combined corridor-composition and occupancy/statistics response must recover a positive asymmetry cost proportional to $(N-Z)^2/A$ in the applicable smooth-nucleus limit. That observer-level dependence is a joint recovery target for the nuclear functional, not a premise inserted into the substrate dynamics or assigned wholly to the residual-strong corridor term.

Then the binding energy is
$$
B
=
\sum_{a=1}^{A} M_a c_{\text{eff}}^2
-E_{\text{nuc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-20c092bedaa315ca)

Binding requires the negative medium-plus-residual-strong terms to outweigh the positive Coulomb and exclusion costs.

The first quantitative comparison surface is the semi-empirical mass formula. Its volume, surface, Coulomb, asymmetry, and pairing coefficients should be recovered from the residual-strong saturation, boundary-corridor loss, electric repulsion, combined channel-composition and occupancy/exclusion cost, and shell/pairing entries above. Those coefficients are downstream summaries; fitting them independently would not derive the nuclear ledger.

## Physical Ingredients

### Residual strong attraction

The dominant attractive channel is expected to come from meson-like exchange and shared polarization corridors between neighboring nucleons. In the residual-exchange picture, pions are the lightest and therefore longest-range residual exchange packets.

So, at coarse level,
$$
V_{\text{res-strong}}(r)
<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-6c62adeb884f6273)
for separations in the nuclear window, with the attraction strongest where meson-like exchange is cheap but direct core overlap is still avoided.

### Short-range exclusion

Nucleons are not point masses. Each is a structured Noether braid assembly with an exclusion volume and a strong internal stress network. If two nucleons are pushed too close together, the cost rises steeply, idealized here as a divergence:
$$
V_{\text{excl}}(r)\to +\infty
\quad\text{as}\quad
r\to r_{\text{core}}^{+}
$$

[View →](../../../../equation-mapping.html#corpus-equation-61ddda21fda3cb40)

This is the geometric origin of the short-range nuclear hard core. The literal infinity is schematic shorthand: the assembly-level over-compression cost is steep but finite, ending in a branch transition near the self-hit threshold rather than an infinite wall.

### Coulomb repulsion

For proton-proton channels, add the ordinary repulsive term
$$
V_{\text{Coul}}(r)\approx +\frac{e^2}{4\pi\epsilon_{\text{eff}}\,r}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9a4ce224fa6d1c9f)
at effective level. Here $\epsilon_{\text{eff}}$ is an in-medium dressing of the observer-level $\epsilon_0$ response described in [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md), not the polarity unit $\epsilon=|e|/6$. Nuclear binding must therefore come from the residual strong and sea-polarization channels, not from any cancellation trick in the electric sector.

### Sea polarization

Neighboring nucleons polarize the local Noether sea. This lowers the total energy when the surrounding Noether sea can support a shared hadronic corridor more cheaply than two isolated hadronic envelopes. That is the current $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement for saying that the ambient Noether sea participates in nuclear binding.

## Shape of the Effective Potential

The minimal expected two-nucleon effective potential is therefore:

- repulsive at very short range,
- attractive in an intermediate nuclear window,
- and negligible at sufficiently large separation.

In symbols, a first schematic form is
$$
V_{NN}^{(c)}(r)
=
V_{\text{excl}}(r)
+V_{\text{Coul}}(r)
+V_{\pi/\text{corr}}(r)
+V_{\text{sea-pol}}(r)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8eaaf6a3deb8ae12)
where $c \in \{pp, pn, nn\}$ labels the two-nucleon channel and $V_{\text{Coul}}$ is present only in the $pp$ channel, with
$$
V_{\pi/\text{corr}}(r)+V_{\text{sea-pol}}(r)<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d5ff97bc4d848a7b)
through the binding window.

This is enough structure to explain why nuclei are finite-sized bound objects rather than collapsed lumps or diffuse neutral gases.

## Deuteron as the First Binding Test

The deuteron is the minimal nuclear benchmark because it is the smallest bound nucleus:
$$
d = p+n
$$

[View →](../../../../equation-mapping.html#corpus-equation-7f0fde4634d7f114)

In this language, the deuteron should exist if the proton-neutron channel admits
$$
E_{pn}^{\text{bound}}
<
M_p c_{\text{eff}}^2 + M_n c_{\text{eff}}^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3cbfe56ae476763)

The qualitative reasons this channel is favored are:

- no proton-proton Coulomb penalty on the neutron side,
- efficient pion-like charge-exchange corridor between proton and neutron,
- and a two-nucleon geometry that can share medium polarization without severe core-overlap cost.

This list is not enough without the spin-channel constraint. The $pn$ benchmark must recover a bound triplet channel while the identical-proton $pp$ channel is spin-statistics-restricted to the singlet sector in the s-wave ($L=0$) channel; that singlet channel must remain unbound even before the Coulomb term is added. This dependency is inherited from the spin-statistics program in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md) and the same-record spinor-label pullback in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#same-record-spinor-label-pullback), not solved locally by the nuclear potential shorthand.

Binding alone is not enough. The same $pn$ corridor functional must recover the deuteron's nonzero electric quadrupole moment and therefore an anisotropic, noncentral response in the observer-level nuclear channel. A purely central potential that binds the deuteron but cannot produce that quadrupole response is a false positive.

If the eventual effective potential cannot bind the deuteron while staying compatible with proton-proton and neutron-neutron nonbinding, or if it misses the deuteron quadrupole response, the nuclear branch is in immediate trouble.

## Saturation

Nuclear matter does not bind by letting every nucleon interact equally with every other nucleon at the same strength. Binding saturates.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the natural geometric reason is:

- each nucleon has only a limited number of favorable corridor and packing relationships,
- the residual strong channel is short-ranged,
- and overcompression rapidly activates the exclusion cost.

So the binding energy per nucleon should not grow without bound with $A$. At coarse level, saturation follows from the competition
$$
\text{short-range attraction}
\quad\text{vs}\quad
\text{finite corridor capacity + exclusion cost}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dddca010ec49aab7)

## Why Alpha-Like Structures Should Be Special

A four-nucleon cluster with two protons and two neutrons is expected to be especially favorable in the assembly picture because it combines:

- charge balance,
- multiple proton-neutron attractive channels,
- compact packing,
- and comparatively low net external multipole stress.

That makes the alpha-like cluster a natural closed local minimum of the effective nuclear energy landscape. This is the nuclear-level analogue of how balanced pro/anti or color-singlet combinations are favored at lower levels of the assembly ladder.

## Alpha-Emission Barrier Benchmark

Alpha emission (SM label: `alpha decay`) turns the alpha-like-cluster claim into a quantitative recovery target. A heavy nucleus can contain an alpha-like sub-assembly in a bound interior while the effective Coulomb barrier outside the touching radius is higher than the kinetic energy of the outgoing alpha assembly. Standard quantum mechanics treats the event as barrier penetration: the interior alpha-like cluster repeatedly samples the barrier, the escape probability is dominated by the action accumulated through the forbidden region, and the measured half-life follows from an attempt rate times that escape probability.

At effective level, the benchmark has the form

$$
\lambda_{\alpha}\simeq\nu_{\mathrm{hit}}P_{\mathrm{esc}},
\qquad
t_{1/2}=\frac{\ln 2}{\lambda_{\alpha}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7d8a7b9cb9c4adc7)

Here $\nu_{\mathrm{hit}}$ is the effective barrier-sampling frequency of the bound alpha-like cluster, $P_{\mathrm{esc}}$ is the finite-window escape probability, and $\lambda_{\alpha}$ is the observer-level emission constant. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this probability cannot be inserted as formal wavefunction leakage alone. It must be recovered as a basin measure over deterministic nuclear assembly histories that cross the retained separatrix tube, while the energy ledger still routes the outgoing alpha assembly, daughter remnant, recoil, photon output if present, medium exchange, and Noether sea update.

Polonium-212 is a compact numerical check: the standard comparison channel is ${}^{212}\mathrm{Po}\to{}^{208}\mathrm{Pb}+\alpha$, with outgoing alpha energy near $8.78\,\mathrm{MeV}$ and observed half-life near $0.3\,\mu\mathrm{s}$. A single rectangular-barrier approximation can miss the half-life by many orders of magnitude, while resolving the Coulomb barrier into multiple segments already moves the estimate close to the observed value. The lesson for the nuclear branch is that barrier shape, turning points, and attempt rate are not disposable fitting details; they are the effective observables that a native nuclear assembly model must recover.

The family-level target is the Geiger-Nuttall relation across declared alpha-emitting isotope chains: the same barrier and attempt-rate map must recover the systematic dependence of $\log t_{1/2}$ on inverse square-root release energy without per-isotope barrier retuning. The Polonium-212 point is one check on that curve, not the curve by itself.

## Radioisotope Metastability

At effective grade, a radioactive material is a material whose isotope inventory contains metastable nuclear assembly branches. A parent isotope can remain in a locally retained basin while one or more lower-energy daughter-and-product routes have nonzero escape rates. The radioactivity belongs first to that nuclear branch structure, not to bulk temperature or ordinary molecular vibration.

Heat, lattice vibration, recoil, and medium excitation are usually outputs or environmental couplings of the nuclear reaction. They become causes only when a worked case shows that they materially change the nuclear route. Likewise, the action ledger enters through cycle bookkeeping, photon-frequency rows, and branch-transition accounting; radioactivity is not caused by a scalar stockpile of action units. The physical cause is an admissible route from the parent nuclear assembly ledger to a cheaper daughter-and-product ledger.

A route-level record can be organized as

$$
\Theta_{\mathrm{iso}}
=
\left(
\mathcal I_{\mathrm{iso}},
\mathcal B_{\mathrm{meta}},
\mathcal C_{\mathrm{route}},
\lambda_{\mathrm{route}},
\mathcal Y_{\mathrm{emit}},
\mathcal R_{\mathrm{recoil}},
\mathcal H_{\mathrm{heat}},
\mathcal L_{E\mathbf p\mathbf J},
\Delta\theta_{\mathrm{sea}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6f03f03d3b55fc80)

Here $\mathcal I_{\mathrm{iso}}$ is the isotope inventory, $\mathcal B_{\mathrm{meta}}$ is the retained metastable nuclear branch record, $\mathcal C_{\mathrm{route}}$ names the alpha, beta/lepton, neutron, gamma/photon, neutrino, or non-radiative route family, and $\lambda_{\mathrm{route}}$ is the observer-level rate or half-life extracted from the retained route. A quantitative recovery requires one parent/daughter/product event ledger that names emitted products, recoil, heat, photon rows when present, the Noether sea update, path-history provenance, and the shielded-energy boundary without hidden loss. Until such a record is supplied, the metastability account is an effective organizing statement and a derivation target, not a native half-life derivation.

## Beta Stability Interface

Nuclear binding is tied to weak stability because a nucleus can trade between proton and neutron count through weak channels. At coarse level, beta stability is the condition that the total nuclear energy cannot be lowered by the neutron-side channel
$$
n \to p + e^- + \bar\nu_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-53d27094f56b1c47)
or by the proton-side channels, positron emission $p \to n + e^+ + \nu_e$ and electron capture $p + e^- \to n + \nu_e$, inside the bound environment.

So a realistic nuclear theory here must eventually combine:

- the nuclear effective potential,
- the proton-neutron mass difference,
- the electron and neutrino emission channels,
- and the local Noether sea contribution to the total energy balance.

Mirror nuclei provide a focused electric-sector check on the same decomposition. Tritium and helium-3, followed by heavier mirror pairs, should be computed from exchanged proton/neutron inventories while holding the declared strong-sector approximation fixed; the residual splitting must then be routed through electric, nucleon-mass, and explicitly declared symmetry-breaking entries rather than absorbed into a retuned residual-strong coefficient.

## Minimal Falsification Gates

This chapter will count as successful only if a later quantitative version can reproduce at least the following:

1. a bound deuteron,
2. no bound diproton in ordinary conditions, with the singlet channel unbound before Coulomb correction, and no bound dineutron in the corresponding neutron-neutron channel,
3. saturation of binding per nucleon,
4. special alpha-like stability,
5. the qualitative valley of beta stability from the combined corridor-composition and occupancy/statistics response,
6. the deuteron quadrupole response,
7. mirror-nucleus splittings without strong-sector retuning.

If the effective nuclear potential cannot satisfy the sign structure and comparison burdens needed for those seven features, the coarse-grained hadronic picture is inadequate.

## Relation to Mesons

Mesons are not an optional add-on in this story. They are the main residual-strong exchange channel already identified elsewhere in the repo.

The division of labor is:

- [nucleon-structure.md](./nucleon-structure.md) defines the baryonic building blocks,
- [mesons.md](../assemblies/mesons/mesons.md) defines the transient exchange packets,
- this chapter defines the effective multi-nucleon binding problem.

## Related Chapters

- [nucleon-structure.md](./nucleon-structure.md)
- [../assemblies/mesons/mesons.md](../assemblies/mesons/mesons.md)
- [../assemblies/fermions/quarks.md](../assemblies/fermions/quarks.md)
- [../assemblies/particle-masses.md](../assemblies/particle-masses.md)
