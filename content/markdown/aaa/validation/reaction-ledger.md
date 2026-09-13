# Reaction Ledger: Architrino Provenance

This ledger records how reaction channels account for constituent architrinos, Noether braids, axial layers, energy, momentum, charge, polarity, and path-history provenance. It retains Standard Model reaction notation while stating what an $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must conserve before a reaction map can be treated as more than a provisional diagram.

An [architrino](../foundations/architrino.md) is a persistent point transceiver with fixed polarity and a continuous path history in absolute time $T$. An assembly is an organized set of those histories; a [Noether braid](../noether-braid/noether-braid.md) is a neutral braided scaffold, and an axial layer is the candidate material attached at its polar sites. The [Noether sea](../spacetime/noether-sea.md) is the proposed ambient assembly population. A causal wake is the transmitter-tagged family of expanding causal surfaces that carries delayed interaction. Provenance records which constituent follows which history, rather than merely matching particle labels or totals.

Fixed primitive identities and polarities imply inventory conservation for a fully accounted event. They do not supply physical energy, momentum, angular momentum, spin, or an observer charge map. Those require the independent assembly and response constructions in [Energy](../dynamics/energy.md) and [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md); the balances below are recovery requirements on such constructions. Numerical substrate instantiations use $c_f=1$.

For radiative channels, use this ledger together with [Radiation](../reactions/radiation.md#radiation-event-record-schema). For cosmology-facing radiation and thermalization channels, use it together with [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md).

## Scope and Status

Reaction provenance is a closure target. A channel may use standard observer notation such as $d \to u + W^-$ or $\gamma+\gamma\to e^+ + e^-$, but the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is not closed until the underlying constituent ledger is explicit.

The conservative status is:

- Architrino count and polarity conservation are required constraints.
- Noether sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Radiative, photon-capture, and sub-threshold shedding entries must attach the shared radiation event-record schema: source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Within the charged-fermion scaffold hypothesis, a generation change must route the scaffold-count difference $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$: each adjacent heavier-generation step releases one neutral two-architrino support binary, and each adjacent lighter-generation step recruits one. Here $g\in\{1,2,3\}$ is the generation index and $\Delta g$ is final minus initial; the count follows from the proposed $N_{\mathrm{scaffold}}(g)=8-2g$, not from primitive ontology alone. The source or destination Noether sea row must be explicit; see [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md#generation-step-scaffold-ledger).
- Any reaction-level spin, helicity, polarization, or vector-channel angular-momentum entry is a downstream consumer of the angular-momentum and spin workstream. It should record what must close, not function as a local proof of that closure.

Charge-changing reaction notation is assembly-level shorthand. A weak or high-energy event may change an outgoing assembly's observer-level net charge, but the primitive polarity inventory does not mutate. The ledger must derive the before/after charge from conserved $\epsilon_+/\epsilon_-$ counts, the effective calibration target $|e|=6\epsilon$ where applicable, shielding-state changes, Noether sea participation, and outgoing assembly routing. A reaction map that changes a particle label without this constituent and exposure accounting remains an observer-level placeholder.

## Provenance Protocol

Each reaction record should state:

1. **Observer channel:** the standard reaction label, including historical labels such as `beta decay` only when immediately translated into native reaction language.
2. **Active assemblies:** which incoming assemblies actually reconfigure, and which are spectators.
3. **Noether sea participation:** whether local Noether braids, neutral binaries, axial layers, or medium excitations are consumed, split, reconfigured, or returned.
4. **Constituent inventory:** total $\epsilon_+$ and $\epsilon_-$ counts before and after, separated into braid and axial-layer contributions where the distinction matters.
5. **Polarity and charge accounting:** how observer-level charge bookkeeping emerges from the conserved $\epsilon_+/\epsilon_-$ routing, axial-layer exposure, shielding state, Noether sea participation, and outgoing assembly routing.
6. **Energy-momentum and angular-momentum accounting:** where kinetic energy, internal binding energy, photon assemblies, recoil, medium excitation, spin/vector ledger terms, and wake-carried angular momentum enter and exit.
7. **Path-history provenance:** which emitted causal wakes, source identities, and delayed interactions are needed to make the reaction deterministic in absolute time.
8. **Weak-corridor record, when applicable:** for $W^\pm$ or $Z^0$ channels, record the axial-inventory payload $\Delta A_W$, any neutral Noether braid scaffold recruited into the corridor, the generation-step count $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$ when applicable, shielded internal energy exposed as corridor stiffness or apparent weak-boson mass, corridor recoil, outgoing-product identity routing, and Noether sea return row.
9. **Radiation event record, when applicable:** for emitted, absorbed, shifted, captured, or failed photon channels, attach the shared event fields from [Radiation](../reactions/radiation.md#radiation-event-record-schema), including $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, and causal-wake ledger.
10. **Hybrid Standard Model matching, when applicable:** identify the source for the observer-level prediction: perturbative electroweak chart, matched weak effective theory, lattice-QCD or nuclear matrix element, infrared-safe QCD observable, QED, kinetic model, or detector functional. Include the scheme, operator or observable definition, matching normalization, CKM/PMNS factor when applicable, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record when one is used.
11. **Closure status:** baseline, provisional map, derivation target, failed map, or inherited gate.

## Record Template

| Field | Required content |
| --- | --- |
| Observer channel | Standard reaction notation and native reaction label |
| Active assembly change | Braid and axial-layer changes for the transformed assembly |
| Noether sea input/output | Neutral braids, axial material, or medium excitations recruited or returned |
| Conserved inventory | $\epsilon_+/\epsilon_-$ totals and charge/polarity balance |
| Energy-momentum and angular-momentum ledger | Internal energy, recoil, emitted assemblies, spin/vector ledger terms, wake-carried angular momentum, and medium excitation |
| Weak-corridor record, when applicable | $\Delta A_W$, neutral Noether braid scaffold sourcing, $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$ for generation changes, shielded-energy exposure, corridor payload, recoil, product identity routing, and Noether sea return row |
| Radiation event record, when applicable | Source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, photon Gate B event residual when $E_\gamma\ne0$, and closure status |
| Provenance data | Transmitter identity, emission time, causal-root branch, and local Noether sea state |
| Hybrid Standard Model matching, when applicable | Observer-level prediction source, scheme, operator or observable, matching normalization, CKM/PMNS factor when applicable, matrix-element or factorization source, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record |
| Closure status | What is established, what is assumed, and what remains to derive |

## High-Energy Collision Records

Collider-scale reactions are the stress case for this ledger because incoming beam work, exposed energy, shielded internal energy, Noether sea updates, and detector-facing products can all change during one event. The record must not treat collision energy as a single undifferentiated input. For every incoming assembly whose internal branch is opened or whose shielding state changes, refine the routed output record as

$$
Y_{\mathsf e}^{\mathrm{coll}}
=
\left(
Y_{\mathsf e},
E_{\mathrm{work}}^{\mathrm{in}},
\{(\mathcal{S}_A^{-},\zeta_A^{-}E_{\text{internal},A}^{-})\}_{A},
\{(\mathcal{S}_B^{+},\zeta_B^{+}E_{\text{internal},B}^{+})\}_{B}
\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-b52163966c6d084d)

where the first set ranges over the resolved incoming assemblies and the second set ranges over resolved outgoing or remnant assemblies. This is not a new conservation law. It is a collision-specific refinement of the same event record: shielding loss, shielding gain, dissociation, association, recoil, photon output, medium excitation, Noether sea update, detector-facing products, and any re-shielded remnant must all be named inside the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ balance. If the calculation exposes internal energy from an incoming assembly without routing it to one of those named terms, the reaction remains a provisional map rather than a closed provenance record.

Here $\mathsf e$ labels the event, $Y_{\mathsf e}$ its output record, $E_{\mathrm{work}}^{\mathrm{in}}$ the declared external work, and $\mathcal S_A^-$ and $\mathcal S_B^+$ the incoming and outgoing assembly states. The fraction $\zeta$ denotes probe-facing exposure of a physical internal-energy account, as in [Particle Masses](../assemblies/particle-masses.md); it is not raw far-field cancellation. Source depletion, exposed energy, recoil, and remnant terms must partition the account without counting the same energy twice. Beam kinetic energy already included in the incoming account is not added again as external work.

### Hadronization Spin-Correlation Records

High-energy collision records that claim to recover nonperturbative strong-sector behavior must preserve spin and provenance through hadronization, the observer-level formation of composite hadrons from quark and gluon degrees of freedom. The [STAR hyperon-pair measurement](https://pmc.ncbi.nlm.nih.gov/articles/PMC12872435/) supplies a dated detector comparison. Its strange quark-pair origin is an interpretation; the measured quantity is a decay-angular correlation after reconstruction, background, and acceptance corrections. Feed-down means production through decay of a heavier particle and must be included in the response model. None of these observer-level mechanisms is a substrate premise.

A native record for such a channel should therefore add a spin-correlation readout to the collision event:

$$
\mathsf e_{\Lambda\bar{\Lambda}}
=
\left(
X_{\mathrm{coll}},
I_{\mathrm{had}},
Y_{\Lambda\bar{\Lambda}},
\Theta_{\mathrm{decay}},
P_{\Lambda\bar{\Lambda}}(\Delta R)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5748c27fad026cad)

where $X_{\mathrm{coll}}$ includes the incoming beam and local Noether sea state, $I_{\mathrm{had}}$ is the selected hadronization route, $Y_{\Lambda\bar{\Lambda}}$ names the outgoing hyperon pair and any feed-down or remnant rows, and $\Theta_{\mathrm{decay}}$ records the weak-decay analyser geometry. The comparison residual is not just whether two hyperons are produced. It is whether the same event record recovers

$$
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{short})>0,
\qquad
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{long})\approx0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-0739d971321d33e1)

without changing the source, hadronization, or detector-response record between the two bins. If the short-range signal is matched only by assigning an independent spin label after hadronization, the strong-sector map has fit a detector statistic while failing provenance closure.

Here $P$ is the dimensionless relative-polarization coefficient in STAR's corrected decay-angle distribution, not a probability or a single-event spin label. The separation $\Delta R=\sqrt{(\Delta y)^2+(\Delta\phi)^2}$ uses rapidity difference along the beam and azimuthal-angle difference around it. STAR's short/long comparison uses separate cuts in those two coordinates, not a single radial cutoff: short range has $|\Delta y|<0.5$ and $|\Delta\phi|<\pi/3$; long range has $0.5<|\Delta y|<2.0$ and/or $\pi/3<|\Delta\phi|<\pi$. The displayed signs summarize the measured trend; the long-range result is compatible with zero within uncertainty, not an exact zero. Quantitative recovery must use the same selection, decay-analyser convention, uncertainty model, and bin-dependent acceptance under one response law. Independently specified kinematic variation across bins is legitimate.

## Residual-Routing Event-Ledger Contract

Residual-routing material enters this ledger only as a theorem-target contract. It does not by itself prove that any weak, radiative, pair-production, nuclear, or cosmology-facing reaction channel has closed. The common target is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-60630e8821df770c)

Here $\mathcal{R}$ is the replayable residual computed from the local assembly state, path-history ledger, Noether braid density, Noether sea delay factor, and any named sector variables. The set $\{B_i\}$ is the finite list of admissible output channels, such as retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. The event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the balance object that must close after all selected outputs are named.

The local state is denoted $\Gamma$, its required retained histories $\mathcal H$, the density $\rho_{\text{NS}}$, and the effective delay factor $\chi_{\text{sea}}$. The residual and admissible channels must be derived on a declared history domain; naming them neither constructs a unique evolution nor proves that the chosen reduced state contains all information needed for replay.

For a reaction attempt, the input state should be recorded as:

$$
X
=
\left(
\Gamma,
\mathcal{H},
\rho_{\text{NS}}(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T),
Z_S
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f2c3abd2dad6a7db)

where $Z_S$ denotes sector-local variables such as nuclear configuration, weak-corridor data, apparatus state, or horizon-interface boundary data when those variables control the route. A routed reaction event is a triple

$$
\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e})
$$

[View →](../../../../equation-mapping.html#corpus-equation-80a897b3666bd7af)

where $I_{\mathsf e}$ is the selected finite channel set and $Y_{\mathsf e}$ lists outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records. A single reaction vertex may select more than one output channel when photon output, recoil, medium update, and reaction products are simultaneous terms in one closed event.

The shared ledger object is:

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf{p}},
\Delta_{\mathbf{J}},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e)
$$

[View →](../../../../equation-mapping.html#corpus-equation-11e1de72f52ff6f1)

Ledger closure means:

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2a8a3adca4192257)

componentwise across the tuple. Nonzero physical recoil, medium heating, remnant excitation, outgoing product energy, or photon output is allowed only as a named term inside $Y_{\mathsf e}$; it is not allowed as an implicit loss.

Each $\Delta$ is a discrepancy between independently specified input and output accounts, not the physical amount of that channel. The first three are energy, momentum, and angular-momentum balance defects; polarity and architrino defects compare primitive inventories. Path, medium, and remnant defects require declared record-comparison maps with a specified zero. Unlike counts, a path history is not a conserved scalar. Uncomputed or missing entries are unknown, never zero. A finite numerical record uses predeclared component tolerances, uncertainty bounds, and refinement tests; exact equality is the analytical target. Defining a missing output as the residual would make the check tautological.

A reaction record should also state how the surviving assemblies restabilize after work is done. The compact restabilization record is
$$
\Theta_{\mathrm{restab}}
=
\left(
B_{\mathrm{pre}},
W_{\mathrm{in}},
\Delta\mathcal A,
B_{\mathrm{post}},
\tau_{\mathrm{return}},
\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{post}}
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-841b7edb919624f1)

Here $B_{\mathrm{pre}}$ and $B_{\mathrm{post}}$ are the retained branch records before and after the interaction, $W_{\mathrm{in}}$ is the applied work or incoming excitation, $\Delta\mathcal A$ is the branch-action change, $\tau_{\mathrm{return}}$ is the return or relaxation time when a stable branch is recovered, and $\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{post}}$ is the post-event balance. This prevents a reaction map from closing only by label replacement while leaving the outgoing assemblies dynamically unsettled.

An action change requires an independently justified action functional; a scalar path statistic alone does not supply it. The return time must identify its clock convention and return criterion, and remain unresolved if the trajectory never returns. Dissociation or escape can be valid outgoing channels without a recovered bound branch.

The stronger event-balance target bundles energy, momentum, and angular momentum instead of checking photon polarization separately from the source ledger. All terms must use one event window, coordinate frame, unit map, and angular-momentum origin. Source internal depletion excludes separately recorded recoil; medium, wake, handoff, and remnant accounts are disjoint signed net gains, with boundary influx negative. A remnant already included in the final source account is not added again. For $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, define source depletion by

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
=
\mathcal Q_{\mathrm{src}}^{-}
-
\mathcal Q_{\mathrm{src}}^{+}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d575eaa3ea0af7b8)

A resolved radiative event closes only if

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
=
\mathcal Q_{\gamma}^{\mathrm{sub}}
+
\mathcal Q_{\mathrm{recoil}}^{0}
+
\mathcal Q_{\mathrm{med}}^{0}
+
\mathcal Q_{\mathrm{wake}}^{0}
+
\mathcal Q_{\mathrm{handoff}}^{0}
+
\mathcal Q_{\mathrm{rem}}^{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d2026d1ba263da1)

with normalized residual

$$
\Delta_{\mathrm{evt}}^\gamma
=
\sum_{\mathcal Q\in\{E,\mathbf p,\mathbf J\}}
\frac{
\left\|
\Delta\mathcal Q_{\mathrm{src}}^{0}
-
\mathcal Q_{\gamma}^{\mathrm{sub}}
-
\mathcal Q_{\mathrm{recoil}}^{0}
-
\mathcal Q_{\mathrm{med}}^{0}
-
\mathcal Q_{\mathrm{wake}}^{0}
-
\mathcal Q_{\mathrm{handoff}}^{0}
-
\mathcal Q_{\mathrm{rem}}^{0}
\right\|
}{
\varepsilon_{\mathcal Q}
+
\left\|
\Delta\mathcal Q_{\mathrm{src}}^{0}
\right\|
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2506d93e03bb04f0)

For the normalized residual, $\varepsilon_{\mathcal Q}>0$ is a fixed reference scale with the same units as $\mathcal Q$; the norm is absolute value for energy and the declared Euclidean norm for vectors. This makes each summand dimensionless and nonnegative, including zero-depletion cases. The scales and acceptance tolerances must be fixed independently of the result. A small value tests the declared accounts, not the existence or correctness of their physical extraction.

The Gate B angular-momentum row is the $\mathcal Q=\mathbf J$ projection of this same identity. Gate B denotes the photon spin, polarization, and capture-response requirements inherited from the photon program. Let the event window be labeled by superscript $0$, and let $\mathbf J_{\mathrm{src}}^-$ and $\mathbf J_{\mathrm{src}}^+$ be the source angular-momentum ledger before and after the event. Define

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+
$$

[View →](../../../../equation-mapping.html#corpus-equation-27e50e7199e1a89f)

The photon event row is

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\gamma}^{\mathrm{sub}}
+
\mathbf J_{\mathrm{recoil}}^{0}
+
\mathbf J_{\mathrm{med}}^{0}
+
\mathbf J_{\mathrm{wake}}^{0}
+
\mathbf J_{\mathrm{handoff}}^{0}
+
\mathbf J_{\mathrm{rem}}^{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-729845df1c51d616)

Define the corresponding balance defect by

$$
\mathbf B_{\gamma}^{0}
=
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9c4e96401d520bed)

For a Gate B-admissible photon helicity eigenstate, the following is an observer-level recovery target. Here $\hat{\mathbf k}$ is a unit propagation direction, and $\mathbf J_{\gamma}^{\mathrm{sub}}$ is the candidate substrate-derived angular account whose intrinsic longitudinal projection must be matched to photon spin. The two-valued outcome is not implied by conservation. A polarization superposition or ensemble need not have mean helicity $\pm1$. In this normalization, $\hbar>0$ is the action benchmark to be recovered by the shared action-alignment map, not an established output or an event-local fit.

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-30eced4a51e02da5)

The event balance bounds the projection error by the Euclidean Cauchy–Schwarz inequality $|\hat{\mathbf k}\cdot\mathbf B|\le\|\mathbf B\|$:

$$
\left|
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
-
\frac{
\hat{\mathbf k}\cdot
\left(
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right)
}{\hbar}
\right|
\le
\frac{\|\mathbf B_{\gamma}^{0}\|}{\hbar}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7dfed49d1a382e14)

The normalized event-balance residual is

$$
\Delta_{\mathrm{bal}}^\gamma
=
\frac{
\left\|
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right\|
}{
1+\left\|\Delta\mathbf J_{\mathrm{src}}^{0}\right\|
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-16c9cd66b736dd8e)

This last ratio uses dimensionless angular-momentum coordinates: divide every angular quantity by the same fixed positive reference action before evaluating it. In dimensional coordinates it is equivalently $\|\mathbf B_{\gamma}^{0}\|/(J_*+\|\Delta\mathbf J_{\mathrm{src}}^0\|)$ with reference action $J_*>0$; the numeral one cannot be added to a dimensional action. Missing source, recoil, medium, wake, handoff, or remnant rows keep the photon record provisional even when the outgoing photon substrate ledger is algebraically clean.

### Provenance-Preserving Polarity Inventory

Count conservation is not enough for reaction closure. Since the ontic architrino set $\mathcal{A}$ is fixed, every serious reaction record must route identity-labeled architrinos through the event after expanding the input and output state to include any explicitly recruited or returned Noether sea content.

Let $R_{\mathsf e}^{\mathrm{in}}\subset\mathcal{A}$ and $R_{\mathsf e}^{\mathrm{out}}\subset\mathcal{A}$ denote the participating architrino identities before and after the event. A closed event must supply a bijection
$$
\Pi_{\mathsf e}:R_{\mathsf e}^{\mathrm{in}}\to R_{\mathsf e}^{\mathrm{out}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8909242d8a237edc)

For global ontic identity labels, expand both sides to include every participating reservoir and boundary-crossing constituent. The resulting sets must be equal, and $\Pi_{\mathsf e}(a)=a$: the same architrino continues along its own worldline while its assembly membership may change. If endpoint records use local labels, supply their maps to the global labels and require the composed route to preserve the global identity. A same-polarity permutation without worldline provenance does not meet this condition. In particular, for every routed identity $a$,
$$
q_{\Pi_{\mathsf e}(a)}=q_a,\qquad
q_a=\sigma_a\epsilon,\qquad
\sigma_a\in\{-1,+1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4fd41e2c372412c)

As a necessary consequence, the polarity inventory vector, with each count restricted to the appropriate finite participating input or output set,
$$
\mathbf{N}_{\mathsf e}
=
\left(
\#\{a:q_a=-\epsilon\},
\#\{a:q_a=+\epsilon\}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbe4751658e9ad74)

must agree before and after the event once all named reservoir terms are included. Equal counts alone are insufficient: replacing one positive identity with a different positive identity preserves the vector while losing provenance. Causal wakes are history records, not additional architrinos; assigning them energy or angular momentum still requires the physical account above. Photon assemblies and corridor payloads do not create new elements of $\mathcal A$. If a pair-production, weak, charged-pair relock, bremsstrahlung, synchrotron, or scattering record lacks $\Pi_{\mathsf e}$ or an equivalent identity-routing statement, the record remains provisional even when its net observer-level charge balances.

The contract for each serious channel is:

| Contract field | Required content |
| --- | --- |
| Residual | Define $\mathcal{R}$ from the local state, causal-wake ledger, density field, Noether sea delay factor, and sector variables. |
| Threshold or separatrix | State the critical surface, basin boundary, channel boundary, or return-map condition that selects an admissible route. |
| Candidate channels | List the allowed routes, including radiative, recoil, medium, reaction, remnant, or record-forming terms when applicable. |
| Event ledger | Close $E$, $\mathbf{p}$, $\mathbf{J}$, charge/provenance, recoil, medium update, remnant state, architrino inventory, and identity routing where applicable. |
| Benchmark recovery | Name the observer-level reaction, cross-section, threshold, rate, or conservation benchmark recovered by the route. |
| Closure status | Mark the record as baseline, provisional map, derivation target, failed map, or inherited gate. |

### Promotion Criterion

A reaction record may be promoted beyond a provisional map only when all of the following conditions have been met in the same sector case:

1. **Replayable residual:** $\mathcal{R}(X)$ is computed from $\Gamma$, $\mathcal{H}$, $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, and explicitly named sector variables, with no hidden sector-specific residual term.
2. **Boundary selection:** each selected channel has a stated boundary test $g_i(X,\mathcal{R})\ge0$, and every excluded channel required by the sector either fails its boundary test or is ruled out by a compatibility condition.
3. **Admissible output:** $Y_{\mathsf e}$ names all outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records required by the selected channel set.
4. **Ledger closure:** $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after adding the sector-required charge, polarity, architrino-inventory, identity-routing, path-history, Noether sea, and remnant rows.
5. **Benchmark compatibility:** the promoted event recovers the sector benchmark without breaking any required weak, quantum, gravity, hadronic, radiation, cosmology, conservation-law, or direct-observation acceptance gate.

This is a promotion criterion, not a completed theorem. Worked sector cases remain open until at least one channel supplies a named residual, a named threshold or separatrix, a channel decision, a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a benchmark recovery, and a failure diagnostic in one record. The free-neutron beta reaction, the $t\to b+W^+$ channel, radiation-coupled pair channels, and nuclear reaction examples therefore remain provisional where their sector records still lack closed residual routing, outgoing braid provenance, angular-momentum balance, rate recovery, or quantitative benchmark closure.

### Failure Modes

| Failure mode | What blocks promotion |
| --- | --- |
| Residual replay failure | Two records with the same $(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},Z_S)$ produce different $\mathcal{R}$ values or different selected channel sets without an additional recorded state variable. |
| Boundary failure | A resolved event occurs while every required $g_i(X,\mathcal{R})<0$, or two mutually exclusive selected channels demand incompatible output assignments. |
| Ledger residual failure | After all sector-required rows are included, $\Delta_E\ne0$, $\Delta_{\mathbf{p}}\ne\mathbf{0}$, or $\Delta_{\mathbf{J}}\ne\mathbf{0}$. |
| Inventory or provenance failure | $\Delta_{\mathrm{pol}}\ne0$, $\Delta_{\mathrm{arch}}\ne0$, or $\Delta_{\mathrm{path}}\ne0$ after the claimed Noether sea, corridor, transmitter-identity, emission-time, causal-root, and branch-Jacobian records are included. |
| Identity-routing failure | No worldline-supported $\Pi_{\mathsf e}$, or equivalent route preserving global identities, maps participating input architrinos to participating output architrinos after named Noether sea reservoir and boundary terms are included. Equal polarity counts or an arbitrary same-polarity bijection do not suffice. |
| Medium or remnant failure | $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term. |
| Retuning failure | The same benchmark family can be recovered only by changing the residual law, channel-boundary law, or fitted medium inputs after seeing each result. Independently specified or dynamically predicted Noether sea state variation under one fixed law is legitimate. |
| Cross-sector failure | The local route succeeds only by violating another required sector acceptance gate. |

## Weak-Corridor Provenance Gate

Weak reactions require an explicit corridor-provenance stance. Two proposed bookkeeping alternatives are:

1. **Transaction-payload corridor:** $W^\pm$ carries the charged triad payload and phase relation, while final-state pro/anti Noether braid material is supplied by the local Noether sea or by explicitly identified incoming assemblies.
2. **Provenance-carrying corridor:** $W^\pm$ carries not only the charged transaction payload but also enough pro/anti Noether braid provenance to seed some final-state lepton or antilepton braid content.

The ledger should not choose between these silently. For each serious weak record, add a row or note that states which stance is being used, which Noether braid material enters and exits, and what would falsify the accounting. This gate is coupled to the weak-coupling-triad exposure problem: the same geometry that permits left-handed charged-current docking must also determine which corridor payload can be transferred and where the outgoing lepton braids come from.

Minimum weak-channel records should therefore include:

- the active weak-coupling-triad transition,
- the corridor provenance stance,
- all Noether sea or incoming-assembly braid material used for charged lepton and neutrino outputs,
- the CKM/PMNS overlap weight when a flavor or generation branch is selected,
- and the energy, angular momentum, polarity, and path-history terms needed for deterministic replay.

## Weak Reaction Case: $t \to b + W^+$ Channel

Observer-level notation:

$$
t \to b + W^+,\qquad W^+ \to e^+ + \nu_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-469dba1ff1902953)

Native status: provisional weak-reaction provenance map.

In the candidate assembly catalog, the active quark change is modeled as an axial-layer reconfiguration from the top axial pattern to the bottom axial pattern:

$$
(5\epsilon_+ + 1\epsilon_-)_{\text{axial}} \to (2\epsilon_+ + 4\epsilon_-)_{\text{axial}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d69b17996828fffc)

Equivalently, the active quark sector requires a $+3\epsilon_-,-3\epsilon_+$ axial-inventory change. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

This is exchange of fixed-polarity constituents, never conversion of an individual polarity. The quark's signed inventory changes by $-6\epsilon$, balanced by the opposite corridor/reservoir change under the declared charge map. Both quarks are generation III, so this proposed transition has $\Delta g=0$ and no scaffold-count change; that arithmetic does not source the positron and neutrino material.

The lepton products cannot be asserted as creation from nothing. Their braid and axial-layer material must be drawn from a local Noether sea reservoir or from explicitly identified incoming assemblies. The provisional ledger target is:

| Component | Ledger requirement | Status |
| --- | --- | --- |
| Top-to-bottom axial exchange | Route the $+3\epsilon_-,-3\epsilon_+$ change through a weak-channel coupling event | Provisional |
| Positron assembly | Identify the Noether braid and axial material used to form the charged lepton output | Provisional |
| Electron-neutrino assembly | Identify neutral braid and axial-layer routing, including chirality/orientation | Provisional |
| Energy-momentum | Account for quark mass difference, lepton energies, recoil, and medium excitation | Derivation target |
| Weak geometry | Derive the left-handed selection rule and allowed coupling operator | Derivation target |

This channel should not be presented as a completed architrino derivation until the inventory table balances polarity-unit counts, braid orientation, axial-layer routing, and energy-momentum in one consistent record.

## Free Neutron Beta Reaction

Observer-level notation:

$$
n \to p + e^- + \bar{\nu}_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-ccf161f1794267ba)

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-e1c1de79d984acfb)

Native interpretation: one down-like constituent assembly changes its axial occupancy while the outgoing proton, electron, and antineutrino accounts are assembled. The quark-level $W^-$ notation is an internal weak-interaction comparison, not an emitted on-shell W boson in free-neutron decay or proof of a propagating substrate corridor.

The proposed spectator assignment keeps one $u$ and one $d$ constituent identity through the reaction. Spectator identity does not require unchanged motion, binding, or wake history as the neutron becomes a proton. The active channel is the other down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(2\epsilon_+ + 4\epsilon_-)_{\text{axial}} \to (5\epsilon_+ + 1\epsilon_-)_{\text{axial}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b1e3302723ef84a)

So the active quark assembly has a three-unit decrease in negative-polarity axial occupancy and a matching three-unit increase in positive-polarity axial occupancy. The natural provenance hypothesis is that local neutral Noether sea material supplies the compensating polarity units while the released negative-polarity axial material participates in electron axial-layer formation.

### Exposure-operator record

The controlled beta channel has a first finite-state exposure operator in [Weak-Mixing CKM](../philosophy-history/theory-bridges/weak-mixing-ckm.md). The ledger record for this channel should use that operator as the geometry gate before any rate or provenance claim is made.

The operator is a conditional test model. Its left/right handedness labels and blocked channel are supplied assumptions until the same retained geometry derives the selection; they are not independent evidence for chirality. CKM and PMNS denote observer-level flavor-mixing matrices; $V_{ud}$ is the up/down CKM amplitude, requiring an independently defined pair of bases before a geometric overlap is predictive.

This gate inherits the unresolved spinor/helicity proof in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md). The blocked right-handed branch, antineutrino orientation, and weak-channel angular-momentum balance remain provisional until the weak-coupling-triad exposure geometry and the reaction-level angular-momentum ledger are derived from the same substrate proof.

| Gate field | Beta-reaction record |
| --- | --- |
| Active assembly | One generation-I down-like quark inside the neutron |
| Spectators | One $u$ and one $d$ assembly pass through by identity |
| Exposure domain | $\Sigma_{\mathrm{WCT}}^{(L)}$ on the leading, phase-matched weak-coupling triad |
| Gate condition | Left-handed charged-current docking with $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$ and active inventory $3\epsilon_-$ |
| Blocked condition | Right-handed $d$ channel has no charged-corridor docking in the finite-state model |
| Quark-side action | $A_{\Sigma}=3\epsilon_-\to3\epsilon_+$, with shielded inventory $A_{\mathrm{sh}}=(2\epsilon_+ + 1\epsilon_-)$ unchanged |
| Corridor payload | Proposed $W^-$ transaction $\Delta A_W=3(\epsilon_- - \epsilon_+)$, signed net change $-6\epsilon=-|e|$ under the declared charge normalization; a signed inventory difference is not a list of six physical payload constituents |
| CKM weight | $V_{ud}$, interpreted as the same-tier weak-basis to shielding-eigenstate overlap |
| Provenance stance | Transaction-payload corridor unless a later derivation proves provenance-carrying corridor content is required |

This record keeps the beta reaction from becoming two separate stories. The same exposed triad must explain the left-handed selection rule, supply the $V_{ud}$ overlap domain, and identify what the $W^-$ corridor transfers. The remaining open work is to identify the electron and antineutrino braid provenance and then attach the energy, angular momentum, recoil, and path-history terms.

The conservative ledger is:

| Component | Required provenance statement | Closure status |
| --- | --- | --- |
| Active $d \to u$ assembly | Route the $3\epsilon_-\to3\epsilon_+$ active axial-layer transition | Provisional map |
| Electron assembly | Combine the released $3\epsilon_-$ contribution with additional local Noether sea material and a suitable braid | Provisional map |
| Antineutrino assembly | Identify neutral braid orientation, axial-layer routing, and weak-channel phase relation | Open derivation target |
| Noether sea | Record every neutral braid, axial layer, or medium excitation consumed or returned | Required |
| Energy and angular momentum | Track mass difference, recoil, electron kinetic energy, antineutrino energy, and medium response | Required |

This map supports a strong but bounded claim: beta reaction charge bookkeeping can be interpreted as local separation and rerouting of neutral Noether sea material plus active quark axial reconfiguration. It does not yet establish a full weak-interaction derivation, because chirality selection, antineutrino routing, and quantitative rate closure still belong to the weak-sector closure program.

### Method-Resolved Lifetime Benchmark

The lifetime benchmark should not be reduced to a single scalar until the experimental comparison channel is declared. The [PDG 2024 neutron listing, mean-life section](https://pdg.lbl.gov/2024/listings/rpp2024-list-n.pdf) averages ultracold-neutron storage measurements at $\tau_n^{\mathrm{UCN}}=878.4\pm0.5\,\mathrm{s}$, while the in-beam trapped-proton result `YUE 13` reports $\tau_n^{\mathrm{beam}}=887.7\pm1.2_{\mathrm{stat}}\pm1.9_{\mathrm{syst}}\,\mathrm{s}$. That edition excludes the beam row from its main average and includes a scale factor of 1.8 in the quoted storage uncertainty. These are dated comparison rows, not a claim about the latest average. Storage counts surviving neutrons; the beam method counts decay protons relative to neutron flux. Their disagreement alone does not establish a hidden reaction channel.

A native closure attempt should therefore publish two readouts from the same free-neutron beta-reaction record:

$$
\mathcal{R}_{\tau_n}^{\mathrm{method}}
=
\left(
\frac{\tau_n^{\mathrm{UCN}}-\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{UCN}}},
\frac{\tau_n^{\mathrm{beam}}-\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{beam}}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a1d64e6af84992a8)

Here $\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the storage-style survival lifetime predicted by the branch record, while $\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the proton-counting readout in a beam geometry. The two entries must share the same weak-coupling-triad exposure, $V_{ud}$ overlap, lepton-provenance, recoil, and Noether sea rows. If the method residual remains nonzero after known detector, trap, wall-loss, and normalization systematics are represented at observer level, the residual stays an unresolved comparison pressure; it should not be promoted to hidden-channel ontology without explicit reaction provenance and null-result closure.

For this dated diagnostic, $\sigma_{\mathrm{UCN}}=0.5\,\mathrm{s}$ and $\sigma_{\mathrm{beam}}=\sqrt{1.2^2+1.9^2}\,\mathrm{s}$ only under independent statistical/systematic quadrature. Both denominators must be positive. Prediction uncertainty, common calibration covariance, and method-specific nuisance parameters must enter a quantitative likelihood; these two normalized discrepancies are not automatically independent significance scores. Nonzero noisy residuals are expected and are judged against a predeclared uncertainty model, not exact zero. The shared record means one common reaction law with independently specified experimental environments and response maps, not identical trap and beam states.

## Closure Targets

The reaction ledger needs at least four tables for each serious channel:

1. **Constituent inventory table:** braid and axial-layer $\epsilon_+/\epsilon_-$ counts for every input, output, Noether sea contribution, and returned medium product.
2. **Energy-momentum table:** internal energy changes, kinetic output, recoil, photon assemblies, neutrino channel, and medium excitation.
3. **Geometry table:** axial frame, braid orientation, chirality, polarity routing, and allowed coupling/docking geometry.
4. **Path-history table:** causal-root branches, source identities, emission times, and local Noether sea state variables needed for deterministic replay.

Radiative or photon-coupled channels also need the shared radiation event-record table. The polarization handoff in that table remains inherited from Gate B; this ledger records the required transverse and capture/rejection fields but does not derive photon spin locally.

## Validation Links

- Weak-sector geometry and chirality closure remain tied to [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md), [Weak Mixing Angle](../assemblies/fermions/weak-mixing-angle.md), and [Weak-Mixing CKM](../philosophy-history/theory-bridges/weak-mixing-ckm.md).
- Radiative and pair-production provenance should use [Synchrotron](../reactions/synchrotron.md), [Bremsstrahlung](../reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md).
- Parameter closure belongs in [Parameter Ledger](parameter-ledger.md).
