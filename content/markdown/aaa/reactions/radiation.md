# Radiation

Radiation is the $\mathbb{A}\mathbb{A}\mathbb{A}$ program for how assemblies shed or reroute excess action and energy. A radiative event is not defined merely by acceleration or by the presence of excess energy. It is a branch-routing problem: a driven assembly or local Noether sea state relaxes into one or more allowed channels such as photon output, medium excitation, recoil, residual internal energy, heat, or reaction products.

An [architrino](../foundations/architrino.md) is a point transceiver with fixed polarity; an assembly is a configuration of those constituents and their coupled path histories. A [Noether braid](../noether-braid/noether-braid.md) is a neutral braided assembly scaffold, and the [Noether sea](../spacetime/noether-sea.md) is the ambient population of neutral assemblies. A branch specifies candidate motion with its retained history; a return map compares that history before and after a declared cycle. A closure residual measures failure to meet a specified return or balance condition. Defining such a residual does not exhibit a stable branch or derive an energy functional. The mechanisms below remain conditional on those constructions.

The important reader split is carrier versus source mechanism. A gamma ray, X-ray, radio photon, and visible photon use the same photon-channel ontology when the carrier is a photon; their differences are frequency, source history, and path ledger. Alpha, beta, neutron, and non-photon radiation labels instead name outgoing assemblies or reaction products and must use reaction provenance. Photon output is described through planar-mode nucleation, while non-radiative channels remain explicit when the available energy does not lock into a stable photon assembly.

The detailed channel pages remain [Bremsstrahlung](bremsstrahlung.md), [Synchrotron](synchrotron.md), and [Atomic Transition Radiation](atomic-transition-radiation.md). Photon assembly ontology belongs in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), while channel vocabulary follows [Mode Taxonomy](mode-taxonomy.md). Event-level conservation uses [Reaction Ledger](../validation/reaction-ledger.md), and cosmology-facing radiation provenance is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

This page is a foundation-up overview. It states the shared mechanism and the closure targets that individual channel pages must specialize. It does not by itself prove blackbody radiation, photon spin, atomic spectra, or QED cross sections.

## Radiation Versus The Always-On Wake

Every architrino emits its wake at all times. The causal wake-surface record that carries the potential is broadcast continuously by every source — moving or still, bound or free — and mediating acceleration through that record is the ordinary business of the substrate. This constant emission is *not* radiation. Radiation is the narrower event defined above: a *routed closure residual*, in which a driven, non-adiabatically disturbed assembly sheds part of that residual into an outgoing carrier — a planar-mode photon assembly, or a reaction-product assembly such as an alpha, beta electron, neutron, or neutrino (see [Radioactivity Naming](#radioactivity-naming)). If no residual is routed, nothing is radiated, even though the wake never stops.

The always-on wake is therefore the emission of the potential, and it should keep the name **wake**. The word `transmission` is reserved in this chapter for the material row where a photon passes through a medium (reflection, transmission, absorption); it must not be reused for the substrate wake, or the two meanings collide.

A steady bound assembly makes the distinction sharp. A stable Noether braid emits its wake on every cycle, yet a certified non-radiative return map must carry no routed residual: over a cycle the far-zone transport of energy, momentum, and angular momentum must net to zero. That zero-flux statement is a closure target, not a consequence of the inverse-square per-hit acceleration alone. The canonical fixed-hit multiplier reads transmitter position and velocity but no separate transmitter acceleration or higher derivative. Acceleration can still be represented across a sequence of changing roots and velocities, while any irreversible radiative share must appear in a derived wake-energy current or as nucleated photon assemblies with source-depletion, recoil, medium, wake, and remnant rows. The substrate statement is therefore not that acceleration creates a primitive $1/r$ acceleration term; it is that a driven event may leave a closure residual that the channel ledger routes into outgoing transport. Recovering the Larmor/Liénard and synchrotron far-zone laws from those event records remains a derivation target. The Master Equation is acceleration-blind only at one fixed hit. That fact does not prove that accelerated histories cannot radiate, and the $1/r^2$ acceleration falloff does not by itself determine the energy reaching a distant boundary.

## Radiation as the Cost of an Unprepared Path

The unprepared-path account is a candidate mechanism and derivation target for the accelerated sector. It sharpens the routed-residual reading above without adding a new primitive.

The primary statement is the event-ledger rule above. The unprepared-path picture is a sea-dependent candidate for how a residual can arise: at constant sub-field-speed group velocity, forward causal influence and the local Noether sea response can settle into a phase-matched channel, whereas acceleration, an abrupt material boundary, or transport faster than a medium's phase speed can make arrival geometry differ from the prepared response. The resulting mismatch is a candidate contribution to $\mathcal R_{\Theta}$, not a replacement for its Master Equation derivation. In a sea-free idealization this preparation picture has no medium response to invoke; the prediction must then come entirely from the causal-root density, return map, and photon event ledger. This separation makes Cherenkov and transition radiation decisive recovery tests rather than exceptions hidden by the word “acceleration.”

One quantitative scaffold can test that candidate. Let $d>0$ be the initial separation from a forward signal to a comparison point moving in the same direction at constant group speed $v<c_f$, both measured in the Euclidean-void frame. A signal advancing at $c_f$ closes that separation at $c_f-v$. The resulting catch-up duration, measured in absolute time, is $t_{\mathrm{prep}}$ below. It is not yet a medium relaxation time. For approximately constant transverse acceleration $\mathbf a_\perp$ during that duration, the leading displacement estimate is

$$
t_{\mathrm{prep}}=\frac{d}{c_f-v},
\qquad
\delta_\perp\simeq\frac{1}{2}\|\mathbf a_\perp\|t_{\mathrm{prep}}^2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-79e0f11197f23c62)

With $\beta_f=v/c_f$ and $\gamma_f=(1-\beta_f^2)^{-1/2}$, the exact identity $1/(1-\beta_f)=(1+\beta_f)\gamma_f^2$ gives $1/(1-\beta_f)\simeq2\gamma_f^2$ as $\beta_f\to1^-$:

$$
\delta_\perp
\simeq
\frac{2\|\mathbf a_\perp\|\gamma_f^4d^2}{c_f^2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-0be17fe0322e3638)

This is a kinematic candidate, not a power law. The displacement expansion requires small accumulated turning and small relative acceleration variation over $t_{\mathrm{prep}}$; at fixed nonzero acceleration and fixed $d$, that domain need not survive $v\to c_f$. In the standard observer-level comparison, transverse radiation has the target $P_{\perp}\propto\gamma^4\|\mathbf a_\perp\|^2$; at fixed effective magnetic field $B$ and fixed pitch angle in the ultrarelativistic regime, the trajectory response gives $P_{\mathrm{syn}}\propto U_B\gamma^2$, where $U_B$ is magnetic energy density. Here the comparison acceleration is measured in observer time, and its Lorentz factor $\gamma$ is not identified with $\gamma_f$ without a clock and channel-speed map. Within an overlapping validity domain, a quadratic fixed-$d$ displacement rule would supply a $\gamma_f^8$ factor. Recovering the observer power law therefore requires a derived transfer rule, a state-dependent $d$, or another explicitly justified factor.

At assembly level, a resolved transfer must name its counterparty: photon output or capture, medium excitation, recoil, or a causal-wake ledger update. Calling that transfer an action quantum additionally requires the channel's action-normalization and quantization derivation. This statement does not apply to each primitive causal-root hit, because a candidate bound assembly undergoes continuous substrate acceleration without a photon being assigned to every hit. An elastic deflection also need not emit a photon; recoil, medium, and wake entries can carry its balance. This is an accounting requirement for resolved assembly events.

## Forms At A Glance

In ordinary physics language, radiation can mean electromagnetic light, emitted particles, thermal emission, scattering-shifted photons, or gravitational waves. In $\mathbb{A}\mathbb{A}\mathbb{A}$ those are not one ontology. The first split is between the carrier that leaves or perturbs the event and the source mechanism that produced the outgoing record.

| Form | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading | Boundary discipline |
| --- | --- | --- |
| Photon-channel radiation | Electromagnetic bands such as radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma-ray radiation are photon-channel records with different frequency, energy, source, and path-history ledgers. | The carrier is still modeled as the coaxial contra-rotating polarity-conjugate planar pair (a proposed assembly, referent-pending); the band name is not a separate substrate ontology. |
| Source-specific photon mechanisms | Atomic transition radiation, bremsstrahlung, synchrotron emission, thermal free-free emission, and medium relaxation are different trigger geometries for routing a closure residual into photon output. | Each mechanism must keep its source depletion, recoil, medium, remnant, polarization handoff, and benchmark recovery rows explicit. |
| Medium-speed and boundary radiation | Cherenkov radiation tests uniform motion with $v>c_{\mathrm{phase}}$ in a material response channel; transition radiation tests constant-velocity passage across an abrupt response boundary. | These are observer-level recovery targets for the sea-dependent preparation map. They do not establish a substrate mechanism until the same material event record derives the angle, spectrum, boundary dependence, and energy-momentum ledger. |
| Thermal or blackbody radiation | A photon bath reaches an ensemble-level detailed-balance limit after repeated emission, capture, scattering, pair-channel exchange, and non-radiative medium exchange. | Blackbody language is stronger than photon emission; it requires ensemble temperature, thermalization depth, and Planck-occupation recovery. |
| Frequency-exchange radiation | Compton-like and Sunyaev-Zeldovich-style processes shift an existing photon packet through a transport exchange row. | A frequency shift is not an unexplained loss or gain; target, medium, recoil, remnant, and thermalization rows must close the ledger. |
| Material routing | Reflection, transmission, absorption, scattering, skin-depth loss, and heating are surface or medium decisions for an incoming photon ledger. | Absorption is not annihilation and reflection is not a hard bounce; energy, momentum, transverse angular momentum, remnant, and heat rows remain in the event record. |
| Reaction-product or particle radiation | Observer-level particle-radiation labels refer to outgoing assemblies or reaction products, sometimes together with photon output. | Non-photon products are not planar-mode photons; they use the reaction provenance ledger and identity-routing rows. |
| Gravitational-wave radiation | Gravitational waves are effective tensor disturbances of the Noether sea and the emergent metric channel, not photon-channel radiation. | This page can name the boundary, but the closure program belongs in [Gravitational Waves](../spacetime/gravitational-waves.md). |

This overview focuses on photon-channel and radiation-coupled reaction routing. Particle-output and gravitational-wave uses of the word `radiation` should remain discoverable here without being folded into the photon planar-mode ontology.

### Radioactivity Naming

Radioactivity labels mix carrier names with source mechanisms. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the useful split is:

| Standard label | Carrier or product | Native ledger reading |
| --- | --- | --- |
| Alpha radiation | outgoing helium nucleus | reaction-product routing of a bound nuclear assembly, with recoil and nuclear-remnant rows |
| Beta radiation | outgoing electron or positron plus neutrino-sector product in a beta reaction | weak-corridor reaction provenance, axial-inventory payload, neutrino routing, and recoil |
| Neutron radiation | outgoing neutron assembly | nuclear product routing, not photon-channel radiation |
| Gamma radiation | photon-channel packet from nuclear de-excitation or related high-energy nuclear transition | photon output modeled as a planar mode (proposed carrier) whose source mechanism is nuclear |
| X-ray radiation | photon-channel packet usually sourced by electron-envelope transition, braking, or inner-shell rearrangement | photon output modeled as a planar mode (proposed carrier) whose source mechanism is atomic or charged-particle transport |

Thus gamma rays and X-rays differ mainly by source mechanism and frequency band, not by photon ontology. Alpha, beta, and neutron radiation are outgoing assemblies or reaction products and must use the reaction ledger rather than the photon-only planar-mode record.

## Foundation-Up Mechanism

The foundation-up radiation question is whether rapid transport changes can leave a Noether braid internally mismatched relative to its nearest stable closure class. A moving Noether braid has a velocity-deformed causal envelope, while a gravitational gradient skews its delay loops and phase closure. If a reaction suddenly decelerates the assembly, if curved transport changes too quickly, or if the assembly crosses a sharp Noether sea gradient, the external transport state can change faster than the three indexed binary ledgers can adiabatically retune.

The resulting residual is first a closure mismatch, not yet a photon. For persistent binary index $a\in\{1,2,3\}$,

$$
\delta\Theta_a
=
\Theta_a(T;\mathbf{V}_{\text{before}},G_{\text{grad}})
-
\Theta_a(T;\mathbf{V}_{\text{after}},G_{\text{grad}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-0f5343bbfbab6607)

Here $\Theta_a$ denotes binary $a$'s phase-closure ledger evaluated at absolute time $T$ over a separately declared comparison window, distinct from the coarse Noether sea response record $\Theta_E^{(\ell)}$ used in the material sections below. The before and after records must use one phase convention, one comparison window, and continuously matched phase lifts, including any winding counts. Subtracting unrelated representatives modulo $2\pi$ would create a false residual. The argument $\mathbf V$ denotes the transport state being retuned, and $G_{\text{grad}}$ denotes the local gradient data that modifies the delay loops. The displayed comparison holds that gradient data fixed; a gradient-crossing event must also supply its before and after gradient records. The index is persistent, $a\in\{1,2,3\}$, and does not encode radius order or a fixed dynamical role.

A compact residual magnitude can be treated as a derivation target:

$$
\mathcal{R}_{\Theta}
=
\left(\sum_{a\in\{1,2,3\}} w_a\,\delta\Theta_a^2\right)^{1/2},
\qquad
w_a>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-b11866cd30210706)

For fixed positive weights $w_a$, this is a norm of the three declared real phase differences. The physical weights must be derived from the layer hierarchy, active causal-root branches, and local Noether sea coupling. The norm does not define the nearest closure class: that requires an admissible reference family and a distance or minimization rule on the retained histories. Distinct histories can have the same phase differences while differing in velocities, causal roots, or stability. Thus zero phase residual alone certifies neither a return nor a physical branch.

## Closure Residuals

A closure residual becomes radiatively relevant only when it cannot be absorbed by ordinary adiabatic retuning. The useful comparison is between the retuning time of the core and the driving time of the disturbance:

$$
\epsilon_{\text{ad}}
\equiv
\frac{\tau_{\text{retune}}}{\tau_{\text{drive}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fe68e3eec7132cc4)

The durations $\tau_{\text{retune}}$ and $\tau_{\text{drive}}$ must be measured using the same declared clock. Small $\epsilon_{\text{ad}}$ supports an adiabatic approximation only on an established stable branch with a finite relaxation margin and controlled drive amplitude. It does not establish that branch, exclude a separatrix crossing, or imply heating. Large $\epsilon_{\text{ad}}$ indicates that retuning need not keep pace; it does not by itself select a radiative outcome. Radiation requires a derived transfer into an allowed outgoing channel.

Astrophysical jets add a useful macroscopic stress test for this same split. A supersonic working surface can create a large closure residual. Comparing the shocked material's cooling and propagation times tests one part of the observer-level energy budget, without selecting its outgoing channels. A compact comparison diagnostic is

$$
\mathcal{R}_{\mathrm{cool}}
\equiv
\frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
\qquad
t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e946ba3b255c89bc)

with an observer-level thermal-plasma estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-03f4023e6a7897a8)

Here $v_j$ and $\ell_j$ are the effective jet speed and propagation scale, $T_s$ is the post-shock temperature, and $\Lambda(T_s)$ is a cooling function normalized so that $n_e n_H\Lambda$ is radiated energy per volume per observer time. The numerator divided by $\gamma_{\mathrm{gas}}-1$ is the thermal energy density in a one-temperature ideal-gas comparison with total particle density approximated by $n_e+n_H$; $n_e$ is electron density, $n_H$ is hydrogen-nucleus density, $k_B$ is Boltzmann's constant, and $\gamma_{\mathrm{gas}}>1$ is the heat-capacity ratio. The estimate assumes optically thin losses and a specified composition and ionization state. Small $\mathcal{R}_{\mathrm{cool}}$ diagnoses rapid loss through the cooling processes included in $\Lambda$; large $\mathcal{R}_{\mathrm{cool}}$ diagnoses slow loss through those processes. Neither ratio determines particle acceleration, magnetic response, a non-thermal spectrum, or energy partition by itself. Those require the relevant channel rates and transport, including optical depth and competing cooling processes. These are observer-level diagnostics, not substrate premises.

The residual ledger should track at least four quantities:

| Ledger entry | Required meaning |
| --- | --- |
| $\delta\Theta_a$ | phase-closure mismatch of each persistent binary index in the candidate source record; no taxonomy member is implied |
| $\Delta E_{\text{int}}$ | excess internal energy above the nearest stable rung |
| $\Delta \mathbf{p}_{\text{asm}}$ | change in assembly momentum during the drive |
| $\Delta \mathcal{J}_{\text{wake}}$ | angular-momentum and causal-wake ledger imbalance to be closed |

This is the point where the radiation page connects to the Master Equation: the residual must be computed from delayed causal-wake hits and branch Jacobians, rather than appended as a phenomenological "radiation reaction" term. The theorem target is a residual functional

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(\Gamma(T),\mathcal{C}_{o'j}(T),J_{o'j},\rho_{\text{NS}}(\mathbf X,T),\chi_{\text{sea}}(\mathbf X,T)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c37c9be06f023431)

Here $\Gamma(T)$ must include the retained assembly history needed by delayed evolution, not only instantaneous positions and velocities. The notation $\mathcal C_{o'j}$ identifies the active emission times from transmitter $j$ reaching receiver $o'$, and $J_{o'j}$ identifies the declared causal Jacobian data. The Noether sea density $\rho_{\text{NS}}$ and delay factor $\chi_{\text{sea}}$ summarize medium inputs whose response map also remains to be derived. The [Master Equation](../dynamics/master-equation.md) fixes the acceleration from admitted hits; it does not supply this residual functional by naming its arguments.

The classical point-charge comparison sharpens this requirement. A singular charged source makes the near-field energy formally divergent, so the observed inertial mass cannot be identified with electromagnetic field energy alone without adding a compensating internal term. In $\mathbb{A}\mathbb{A}\mathbb{A}$ language, that pathology is a warning against treating radiation damping as a separate acceleration law attached after the motion has been chosen. The event record must instead expose the finite balance

$$
\mathcal{D}_{\mathrm{rad}}
\equiv
\Delta P^\mu_{\mathrm{asm}}
+
\Delta P^\mu_{\gamma}
+
\Delta P^\mu_{\mathrm{near}}
+
\Delta P^\mu_{\mathrm{wake}}
+
\Delta P^\mu_{\mathrm{mass/rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a7fcee81ae6640f3)

This is an effective energy-momentum comparison, with $P^\mu=(E/c_0,\mathbf p)$ in a declared observer chart and fixed speed calibration $c_0$; it is not a substrate four-vector law. Each $\Delta P^\mu$ is a signed final-minus-initial change in a disjoint account. The near-field term records reversible storage, the wake term records history-dependent exchange, and the mass/remnant term records internal or remnant contributions excluded from the assembly term. Medium and external-driver transfers must be included explicitly in those assigned accounts or added to the balance. Finite separate accounts and a zero total are targets, not consequences of this definition. In particular, a vanishing conservation residual is not a damping term: damping must be extracted from a nonzero outgoing irreversible transfer, with reversible storage and recoil accounted for separately.

Classical decompositions that compare outgoing and incoming field pieces can be used only as effective recovery tools. In the corpus notation their role is to test whether the same causal-wake history keeps every row of $\mathcal{D}_{\mathrm{rad}}$ finite when the comparison tube around the source is shrunk. They do not license acausal substrate dynamics: any nonlocal-looking term must be re-expressed as branch accounting over the event window, with delayed path-history provenance and a named residual row for every unmatched energy-momentum component.

## Excitation Basins

For a derived return map, a basin is a set of retained histories sharing a specified relaxation outcome, and a separatrix is its boundary. A phase mismatch alone does not identify either. The following proposed classification assumes that an admissible stable reference rung, its basin, and a common energy functional have been supplied. For a post-drive state above that reference in the same energy convention, the excess energy is the gap

$$
E_{\text{exc}}
=
E_C(\Gamma_{\text{post shock}})
-
E_C(\Gamma_{\text{nearest stable rung}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-73e2a1b9f3769f52)

Here $E_C$ is the proposed closure-class energy functional evaluated on a retained history, and the subscript `post shock` labels the post-drive state. Positivity of this difference and dynamical access to the reference rung are separate requirements. The simplest proposed basin classification is:

| Basin | Condition | Radiation meaning |
| --- | --- | --- |
| Retuning basin | $\mathcal{R}_{\Theta} < \mathcal{R}_{\text{retune}}$ | no resolved event; the core returns to the same rung |
| Excited basin | $\mathcal{R}_{\text{retune}} \le \mathcal{R}_{\Theta} < \mathcal{R}_{\gamma}$ | excess energy exists, but stable photon output is not guaranteed |
| Planar-mode basin | $\mathcal{R}_{\Theta}\ge\mathcal{R}_{\gamma}$ with sufficient channel geometry | photon-channel nucleation is allowed |
| Dissociation or reaction basin | closure residual destabilizes assembly identity | energy routes into products, recoil, and medium excitation |

The thresholds in this table are names for proof targets, not asserted universal constants. A completed derivation must compute the relevant separatrices from the local return map of the driven assembly. The same external energy transfer can therefore be radiative in one geometry and non-radiative in another if the basin boundary is different.

## Planar-Mode Nucleation

Photon output is modeled as the lock-in of a coaxial contra-rotating polarity-conjugate planar pair. In the language of [Mode Taxonomy](mode-taxonomy.md), the photon branch is a planar-mode nucleation event: shed energy, wake stress, and Noether sea state jointly cross the stability boundary for a propagating photon assembly.

A minimal nucleation gate can be written as a two-condition target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{NS}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}
$$

[View →](../../../../equation-mapping.html#corpus-equation-982ba49e54ca79ee)

Here $\mathcal{S}_{\gamma}$ is the local photon-channel drive, $\mathcal{S}_{\gamma,*}$ is the planar-mode stability boundary, $J_{\text{loc}}$ is the local causal-root/Jacobian data — including the same-record transmitter-side acceleration weight — as declared in [Mode Taxonomy](mode-taxonomy.md), and $E_{\gamma,\min}$ is the minimum stable planar-mode cost if such a floor survives the derivation. This form is only a scaffold. The burden is to derive $\mathcal{S}_{\gamma}$ from wake-strain geometry, causal-root branch data, and Noether sea coupling, then recover the validated limits used by bremsstrahlung, synchrotron emission, atomic transitions, Compton-like scattering, pair channels, and thermal radiation.

Once the planar mode nucleates, the event record must carry the photon Gate A and Gate B data without treating those gates as locally proven. Gate A supplies kinematics and optics: $E_\gamma$, $\mathbf{p}_{\gamma}$, direction, phase frequency, and local photon-channel speed $c_\gamma$. Gate B supplies transverse angular-momentum, polarization, helicity, and capture/rejection ledgers. This radiation overview uses those records as requirements; their proofs remain in the photon and angular-momentum programs.

## Non-Radiative Shedding

Radiation is one possible relaxation channel for $E_{\text{exc}}$, not the only one. If the planar-mode gate is not crossed, the residual must still go somewhere. A minimal shedding ledger is

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{rem}}
+
\Delta E_{\text{rxn}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca32fb61bc15bc55)

This is a post-drive emission budget: no further external work or incoming photon energy is supplied during the declared relaxation window. Its accounts must be disjoint. The medium term includes any assigned wake exchange, recoil excludes kinetic energy already in another term, the remnant term denotes retained excess excitation, and the reaction term denotes product energy relative to the same reference. A non-reaction photon event has $\Delta E_{\text{rxn}}=0$, but it can still transfer energy to medium, recoil, and remnant accounts; that condition alone is not a purely radiative limit. A photon-free event has $E_\gamma=0$. Capture, continued driving, and reactions with a different reference require the full signed incoming/outgoing budget, not this emission-only reduction.

In weak-coupling comparison limits, the same ledger must also recover the standard rate and scattering normalizations. Fermi's golden rule is the rate target for a near-continuum of final states, over a window long enough to resolve the relevant energy scale but short enough that transition probability remains perturbatively small:
$$
\Gamma_{\mathbb{A}\mathbb{A}\mathbb{A}\to f}
\rightarrow
\frac{2\pi}{\hbar}
\left|\mathcal{M}_{\mathrm{eff}}\right|^2
\rho_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-1f60966cc39e9463)

Here $\mathcal M_{\mathrm{eff}}$ is the perturbing matrix element with energy units, $\rho_f$ is final-state density per unit energy at the allowed energy, and $\hbar=h/(2\pi)$ is the reduced Planck action scale. The arrow is a recovery limit, not an identity for every finite event window. A scattering cross section is transition rate divided by incident flux, or event probability divided by time-integrated incident fluence with consistent state normalization. The final-state phase-space integral must be performed once, either inside the rate or in its differential form. These are observer-level summaries whose derivation from the retained history remains open.

Momentum and angular momentum must close at the same vertex:

$$
\Delta \mathbf{p}_{\text{asm}}
+
\mathbf{p}_{\gamma}
+
\Delta \mathbf{p}_{\text{med}}
+
\Delta \mathbf{p}_{\text{recoil}}
+
\Delta \mathbf{p}_{\text{rxn}}
=
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-bbb8335828dd3cfd)

The corresponding polarity, architrino-inventory, identity-routing, and path-history ledgers must also close. Non-radiative shedding is therefore not a discard bin. It is the required accounting for medium heating, turbulence, phonon/plasmon-like excitations, unresolved causal-wake stress, recoil, and residual internal excitation when no stable photon assembly leaves the event.

## Path Frequency Exchange

A photon-channel packet can also change frequency during transport without being replaced by a newly emitted photon. In standard comparison language, Compton and Sunyaev-Zeldovich processes are the important calibration family: a photon scatters from an intervening electron population and leaves with a shifted frequency. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a transport exchange row. It belongs between photon propagation and reaction bookkeeping, not under ordinary transmitter emission alone.

For a packet entering a local segment with frequency $\nu^-$ and leaving with frequency $\nu^+$, the event record must close

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{target}}
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f9443e4a405cfbd4)

The $\Delta E$ terms are final-minus-initial changes in disjoint accounts, and $\epsilon_E>0$ is a declared energy-error allowance. Both frequencies must use the same local observer clock and energy calibration; identifying their energy difference with $h(\nu^+-\nu^-)$ requires the Gate A map. A frequency boost then requires a corresponding loss from the target or medium. A frequency depletion requires a named gain elsewhere. Target internal energy, target recoil, and retained excitation must not be counted twice. The outgoing packet must also retain the Gate A kinematic and Gate B polarization handoffs, or the process requires a capture, re-emission, pair-production, or other reaction record.

This distinction is cosmologically important. A redshift or blueshift accumulated along a path is not an unexplained energy loss or gain if the path-frequency exchange ledger closes. It is also not automatically evidence of geometric expansion. The corresponding cosmology pages must consume this radiation record before promoting redshift-distance, CMB temperature, or SZ/kSZ data products into expansion, dark-energy, or growth claims.

The strong-field version of the same rule occurs near a black-hole horizon interface. A photon-channel packet, or a photon-channel-adjacent mode, may be processed close to the orthogonal-axis three-binary symmetry-breaking point, where planar lock and high local energy exchange are part of the strong-field record. Interior segments can blueshift the packet; exterior or transport segments can redshift it; either case remains a frequency-exchange row only while the packet keeps its photon Gate A and Gate B handoffs. If the handoffs fail, the event must be reclassified as capture, re-emission, pair production, medium excitation, or another release-channel reaction.

Curved photon transport adds a transverse version of the same discipline. In ordinary weak lensing, the outgoing path direction changes coherently through the Noether sea response while the photon remains one Gate A/B packet. Let $\hat{\mathbf{k}}(\ell)$ be the path tangent and
$$
\kappa_\gamma(\ell)
=
\left\|
\frac{d\hat{\mathbf{k}}}{d\ell}
\right\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-efaeee5116926cc9)

the Euclidean path-curvature proxy along the transported packet; during coherent transport the path tangent $\hat{\mathbf{k}}(\ell)$ coincides at each point with the Gate A propagation axis $\hat{\mathbf k}$ of the packet. The coherent-lensing branch requires
$$
E_{\gamma}^{+}
=
E_{\gamma}^{-}
+\Delta E_{\mathrm{path}},
\qquad
\mathbf p_{\gamma}^{+}
=
\mathbf p_{\gamma}^{-}
-\Delta\mathbf p_{\mathrm{sea}}
-\Delta\mathbf p_{\mathrm{recoil}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-3767dd0c9810d99c)

Here $\ell$ is Euclidean path arclength, $\Delta E_{\mathrm{path}}$ is energy transferred into the photon, and the sea and recoil momentum terms are final-minus-initial gains of the counterparties, hence their minus signs. All quantities require a common frame and a declared native-to-observer map. The relation assumes no free-photon identity change. A high-gradient or strong-field candidate may instead be tested with the following dimensionless diagnostic:
$$
\mathcal R_{\perp}^{\gamma}
=
\frac{
\left\|
\Delta\mathbf p_{\gamma,\perp}
\right\|
}{
\|\mathbf p_\gamma\|+\varepsilon_p
}
+
\lambda_\kappa
\int_{\Gamma_\gamma}
\kappa_\gamma(\ell)\,d\ell
+
\mathcal R_{\mathrm{GateA/B}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-47a8993ebc3f74b2)

Here $\Delta\mathbf p_{\gamma,\perp}$ is the transverse momentum change relative to the declared incoming axis, $\varepsilon_p>0$ is a momentum floor, $\lambda_\kappa\ge0$ is a dimensionless diagnostic weight, $\Gamma_\gamma$ is the transport path, and $\mathcal R_{\mathrm{GateA/B}}\ge0$ measures the specified handoff defect. Ordinary coherent bending already gives nonzero curvature and transverse momentum change. This expression therefore measures bending as well as possible defects; positivity is not evidence of extra radiation or loss of photon identity. Any emission threshold must be derived relative to an accepted coherent-transport family, with its energy source and medium or recoil uptake specified.

**Effective electromagnetic energy-momentum gate.** Standard electromagnetic energy and momentum bookkeeping supplies a useful recovery ledger for radiation, but only at the observer/channel level. The fields $\mathbf{E}_{\mathrm{eff}}$ and $\mathbf{B}_{\mathrm{eff}}$ in this subsection are effective comparison variables reconstructed from the channel map. They are not substrate objects added to the Euclidean void or to the Noether sea.

For a declared vacuum Maxwell comparison in a local inertial observer chart, define

$$
u_{\mathrm{EM}}
=
\frac{\epsilon_0}{2}\|\mathbf{E}_{\mathrm{eff}}\|^2
+
\frac{1}{2\mu_0}\|\mathbf{B}_{\mathrm{eff}}\|^2,
\qquad
\mathbf{S}_{\mathrm{EM}}
=
\frac{1}{\mu_0}\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f903c7efe3a0e88f)

and

$$
\mathbf{g}_{\mathrm{EM}}
=
\frac{1}{c^2}\mathbf{S}_{\mathrm{EM}}
=
\epsilon_0\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b63dd026736b930)

The corresponding Maxwell-stress comparison tensor is

$$
\sigma_{\mathrm{EM}}^{ij}
=
\epsilon_0
\left(
\frac{1}{2}\delta^{ij}\|\mathbf{E}_{\mathrm{eff}}\|^2
-
E_{\mathrm{eff}}^iE_{\mathrm{eff}}^j
\right)
+
\frac{1}{\mu_0}
\left(
\frac{1}{2}\delta^{ij}\|\mathbf{B}_{\mathrm{eff}}\|^2
-
B_{\mathrm{eff}}^iB_{\mathrm{eff}}^j
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-181c8e23e97f48f5)

Note the sign convention: $\sigma_{\mathrm{EM}}^{ij}$ is the momentum flux out of $V$, the negative of the textbook Maxwell stress tensor $T_{\mathrm{Maxwell}}^{ij}$, which is why it enters the momentum residual below with a plus sign.

For a control volume $V$ with outward unit normal $\hat{\mathbf{n}}$, the effective energy residual is

$$
\Delta_E^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V u_{\mathrm{EM}}\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA
+
\int_V\mathbf{J}_{\mathrm{eff}}\cdot\mathbf{E}_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-984703fdc12f15a2)

The effective Lorentz-force density is

$$
f_{\mathrm{L}}^i
=
\rho_{\mathrm{eff}}E_{\mathrm{eff}}^i
+
\left(\mathbf{J}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}\right)^i
$$

[View →](../../../../equation-mapping.html#corpus-equation-f7297c236c971227)

and the momentum residual is

$$
\Delta_{p,i}^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V g_{\mathrm{EM}}^i\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\sigma_{\mathrm{EM}}^{ij}\hat n_j\,dA
+
\int_V f_{\mathrm{L}}^i\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e662bc8aaa5b64e0)

The angular-momentum residual is the corresponding moment of the momentum ledger:

$$
\Delta_{J^i}^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V \epsilon^i{}_{jk}x_{\mathrm{eff}}^j g_{\mathrm{EM}}^k\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\epsilon^i{}_{jk}x_{\mathrm{eff}}^j(\sigma_{\mathrm{EM}}\hat{\mathbf{n}})^k\,dA
+
\int_V\epsilon^i{}_{jk}x_{\mathrm{eff}}^j f_{\mathrm{L}}^k\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a5f6beeca298812f)

The tensor $\sigma_{\mathrm{EM}}^{ij}$ is symmetric, so this effective comparison ledger carries the standard angular-momentum closure condition. A radiation, scattering, or material-capture event may use this gate only as a benchmark: the $\mathbb{A}\mathbb{A}\mathbb{A}$ event record must still name the source assembly, causal-root history, medium rows, recoil, and identity routing that generate the effective quantities.

Here $u_{\mathrm{EM}}$ is field energy density, $\mathbf S_{\mathrm{EM}}$ is energy flux, and $\mathbf g_{\mathrm{EM}}$ is momentum density. The constants $\epsilon_0$ and $\mu_0$ obey $c^{-2}=\epsilon_0\mu_0$ in this standard comparison; its $c$ is the observer vacuum calibration, not an identified substrate or material speed. The current $\mathbf J_{\mathrm{eff}}$ and charge density $\rho_{\mathrm{eff}}$ include the sources required by that comparison. The volume $V$ is fixed in the observer chart, the angular-momentum origin is fixed, and $\epsilon^i{}_{jk}$ is the antisymmetric spatial symbol. Moving boundaries require transport terms. Macroscopic dispersive material fields require their material storage and stress accounts; the vacuum formulas alone do not supply them.

For an outgoing photon packet crossing a large source-centered sphere with radial propagation in the far-field vacuum comparison zone, the flux version of the Gate A handoff is

$$
\Delta_{\gamma,\mathrm{flux}}
=
\left(
E_\gamma
-
\int_{t_{\mathrm{eff},i}}^{t_{\mathrm{eff},f}}\int_{\partial V}
\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA\,dt_{\mathrm{eff}},
\quad
\mathbf{p}_\gamma
-
\frac{1}{c}
\int_{t_{\mathrm{eff},i}}^{t_{\mathrm{eff},f}}\int_{\partial V}
(\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}})\hat{\mathbf{n}}\,dA\,dt_{\mathrm{eff}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-503ce3cc8156900b)

The time interval must cover the packet crossing, and background, incoming radiation, other outgoing carriers, and changes of stored near-field energy must be separated. Only radial propagation justifies replacing the momentum-flux tensor by the normal-directed energy flux in this formula; a general boundary uses $\sigma_{\mathrm{EM}}^{ij}\hat n_j$. A vanishing $\Delta_{\gamma,\mathrm{flux}}$ closes this photon-only comparison. If other transfers are present, they must be computed and the enlarged balance rechecked. Naming an unresolved wake or material account does not close the check.

## Radiation Event-Record Schema

Every resolved radiation, sub-threshold shedding, photon-capture, or radiation-coupled reaction record should use the same event schema. A photon-free event has no incoming or outgoing photon energy and no photon polarization handoff. A capture event instead has $E_{\gamma,\mathrm{in}}>0$ even when $E_{\gamma,\mathrm{out}}=0$; its incoming polarization and angular-momentum transfer remain required. The emission shorthand $E_\gamma$ must therefore be expanded into incoming and outgoing entries whenever the event includes capture or scattering.

| Required field | Required content | Closure role |
| --- | --- | --- |
| Source assembly | Identity and pre/post state of the driven assembly, photon assembly, or resolved local Noether sea excitation whose residual is being routed | Prevents treating radiation as free energy detached from an assembly or medium source |
| Source depletion row | $\Delta\mathcal Q_{\mathrm{src}}^{0}=\mathcal Q_{\mathrm{src}}^{-}-\mathcal Q_{\mathrm{src}}^{+}$ for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, with the source branch and event window named | Keeps photon output tied to what the driven source lost rather than to an isolated outgoing quantum |
| Trigger geometry | Deceleration, curved transport, gradient crossing, photon overlap, capture geometry, or medium-relaxation geometry, including local $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, and $\chi_{\text{sea}}(\mathbf X,T)$ when they affect the channel | Identifies why this event entered a retuning, excitation, planar-mode, or reaction basin |
| $\delta\Theta_a$ | Phase-closure mismatch for each active persistent binary index $a\in\{1,2,3\}$, or an explicit reason the channel uses a reduced assembly ledger | Keeps the event tied to the closure-residual mechanism rather than to acceleration language alone |
| $E_{\text{exc}}$ | Excess internal or medium excitation energy above the nearest stable rung before routing | Supplies the left side of the shedding ledger |
| $E_\gamma$ | Photon energy for each emitted, absorbed, shifted, or captured photon assembly; record incoming and outgoing energies separately, both zero only for photon-free events | Carries the Gate A energy-frequency and momentum handoff without proving it locally |
| Recoil | $\Delta E_{\text{recoil}}$, $\Delta \mathbf{p}_{\text{recoil}}$, and the assembly or medium component receiving recoil | Closes local momentum and energy at the event vertex |
| Medium excitation | $\Delta E_{\text{med}}$, $\Delta \mathbf{p}_{\text{med}}$, excitation type, and returned or retained Noether sea content | Prevents unresolved medium heating or turbulence from becoming an implicit loss term |
| Polarization handoff | Gate B acceptance data for every incoming or outgoing photon: transverse basis, analyzer or transport basis if present, helicity state or outcome record, accepted/rejected capture channel, and angular-momentum ledger | Records inherited photon Gate B requirements; total capture still requires the incoming handoff |
| Photon Gate B event residual | $\mathcal R_{\gamma B}^{\mathrm{event}}$ or the channel-local equivalent naming source, recoil, medium, wake, handoff, remnant, helicity, and balance entries whenever a photon participates | Prevents a clean transverse ledger from being promoted before the event ledger closes |
| Causal-wake ledger | Source identities, emission times, active causal-root branches, branch Jacobians, path-history provenance, and $\Delta \mathcal{J}_{\text{wake}}$ | Makes deterministic replay and angular-momentum balance depend on delayed wake history |
| Identity routing | Bijection or equivalent route for participating architrino identities after named Noether sea reservoir terms are included | Prevents photon output, causal wakes, or unresolved medium terms from being treated as sources of new substrate identities |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate, with any unresolved Gate A, Gate B, Gate C, reaction, or cosmology handoff named explicitly | Prevents a local channel record from being promoted to completed doctrine before its inherited gates close |

For photon-capture records, $E_\gamma$ names the incoming, outgoing, shifted, or captured photon ledger; it is not an identity source for different outgoing assemblies unless the channel is explicitly a reaction or pair-production record. In those cases, the same schema must add the recruited target or Noether sea inventory to the identity-routing field.

The schema requires the following source-depletion balance. It follows algebraically only after conservation of a complete, disjoint event ledger has been established; defining its entries does not prove conservation:

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
\mathcal Q_{\mathrm{rem}}^{0},
\qquad
\mathcal Q\in\{E,\mathbf p,\mathbf J\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7572f20bbbfa4ac3)

The superscript $0$ labels event-window transfers in one declared frame; `sub` labels the photon-side assembly/wake account, with outgoing minus incoming transfer when photons enter the event. The other right-hand terms are disjoint final-minus-initial gains, whereas source depletion is initial minus final and can be negative for capture. The $\mathcal Q=\mathbf J$ component is the full angular-momentum balance about one common origin. Gate B separately concerns transverse polarization response and intrinsic spin; a transverse polarization vector does not imply that spin angular momentum is perpendicular to propagation. Orbital angular momentum and changes of origin must be accounted for before extracting a photon helicity.

The event-window helicity projection is the $\hat{\mathbf k}$ component of that same balance. Define

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

[View →](../../../../equation-mapping.html#corpus-equation-0f23e3d04627e3a5)

For a resolved helicity eigenchannel whose intrinsic photon angular-momentum account has already passed Gate B, the target is

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
=
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
}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-05b96accb5630ef4)

The two projected expressions agree when $\mathbf B_{\gamma}^{0}=\mathbf0$. Their difference has magnitude at most $\|\mathbf B_{\gamma}^{0}\|/\hbar$, because $\hat{\mathbf k}$ is a unit vector. Neither balance nor absence of transverse angular-momentum leakage forces the projection to be $+1$ or $-1$: that spectrum is a separate Gate B requirement. A general polarization state is not assigned a definite helicity by this identity; its expectation and outcome weights require the corresponding Gate B state and analyzer record.

The common energy closure for the schema is

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{rem}}
+
\Delta E_{\text{rxn}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca32fb61bc15bc55-2)

Channel pages may add specialized variables, but they should not remove these fields. The polarization handoff remains inherited from photon Gate B; radiation records carry the fields needed by that gate, while the photon-spin and polarization proof remains outside the local radiation event record.

The repeated energy equation is the same post-drive emission reduction specified in [Non-Radiative Shedding](#non-radiative-shedding). For capture or scattering, subtract incoming photon energy from outgoing photon energy in the signed balance and include any external supply; the emission reduction is not the general schema's universal energy equation.

### Gate C Benchmark Vector

For photon-producing routes, Gate C is the radiation-sector acceptance predicate:

$$
\operatorname{GateC}_{\gamma}(\mathsf e)
=
\operatorname{Ledger}_{\gamma}(\mathsf e)
\wedge
\operatorname{Trans}_{\gamma}(\mathsf e)
\wedge
\operatorname{Bench}_{\gamma}(\mathsf e)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1baa56cbe8ea2339)

Here $\operatorname{Ledger}_{\gamma}$ requires the event ledger to close after photon output, recoil, remnant, medium update, wake handoff, and provenance rows are included. The transversality row is inherited from photon Gate B:

$$
\operatorname{Trans}_{\gamma}(\mathsf e)
\Longleftrightarrow
\left\|
P_{\parallel,\hat{\mathbf{k}}}
\Pi_{\gamma}\mathcal{L}_A(\mathsf e)
\right\|_{\gamma}
\le
\epsilon_{\gamma,\parallel}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a42eb2252cc2697c)

so any longitudinal response must cancel, remain unexposed below tolerance, or route to a material, remnant, medium-bound, or massive-vector channel rather than a free photon.

For a declared benchmark family $b$, the Gate C output should be a normalized residual vector rather than a narrative pass:

$$
\mathbf{R}_{\gamma,b}(\mathsf e)
=
\left(
\frac{\Delta_E}{E_b+\varepsilon_E},
\frac{\|\Delta_{\mathbf{p}}\|}{p_b+\varepsilon_p},
\frac{\|\Delta_{\mathbf{J}}\|}{J_b+\varepsilon_J},
\frac{\left\|P_{\parallel,\hat{\mathbf{k}}}\Pi_{\gamma}\mathcal{L}_A(\mathsf e)\right\|_{\gamma}}{\epsilon_{\gamma,\parallel}},
R_{\mathrm{bench},b},
R_{\mathrm{replay},b}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f79567629bf1e99)

The denominators must be positive, predeclared error allowances: $E_b$ and $\varepsilon_E$ carry energy units, $p_b$ and $\varepsilon_p$ momentum units, and $J_b$ and $\varepsilon_J$ angular-momentum units. Setting the allowances equal to full signal scales would permit order-one conservation defects and does not establish precision recovery. The floors cannot be enlarged after seeing a residual. The operator $\Pi_\gamma$ extracts the photon response from the event ledger $\mathcal L_A$, $P_{\parallel,\hat{\mathbf k}}$ projects along the propagation axis, and $\|\cdot\|_\gamma$ and $\epsilon_{\gamma,\parallel}>0$ specify its response norm and tolerance. The event is $\mathsf e$, and $\operatorname{Bench}_\gamma$ requires the declared independent benchmark comparisons. The dimensionless $R_{\mathrm{bench},b}$ tests the family-specific observable; $R_{\mathrm{replay},b}$ tests reuse of the same residual definition, channel boundary, and Noether sea variables across the event panel without retuning. Replay alone supplies consistency, not independent correctness. The acceptance target is

$$
\left\|\mathbf{R}_{\gamma,b}(\mathsf e)\right\|_{\infty}
\le
1
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc46a40eed5f69a4)

after photon Gate A supplies the admissible massless branch and photon Gate B supplies the transverse ledger. A radiation family is therefore not closed by matching one scalar benchmark if energy, momentum, angular momentum, transversality, provenance, or replayability still fails.

## Scattering and Reaction-Ledger Grammar

Scattering, relativistic collision, pair-channel, and radiation-coupled reaction records should refine the same event schema rather than introduce a separate bookkeeping language. A compact event-ledger grammar is

$$
\mathcal{E}_{\mathrm{scat/rxn}}
=
\left(
\mathfrak{L}_{\mathrm{in}},
W_{\mathrm{int}},
\mathfrak{T}_{\mathrm{cons}},
\mathfrak{L}_{\mathrm{out}},
\mathfrak{R}_{\mathrm{res}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-008b07a26ad17060)

The five entries are theorem-target data, not a completed QFT scattering derivation:

| Grammar entry | Required content | Validation role |
| --- | --- | --- |
| $\mathfrak{L}_{\mathrm{in}}$ | incoming assembly, photon, medium, and Noether sea ledgers: identities, $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, architrino inventory, causal-root branches, and path-history provenance | fixes what enters the event before any channel assignment is made |
| $W_{\mathrm{int}}$ | finite absolute-time interaction window $[T_i,T_f]$ with the resolved local geometry, branch Jacobians, transient assembly or resonance record, and recruited or returned Noether sea content; observer comparisons additionally declare its clock map | prevents replacing the local collision or channel window by an instantaneous black box |
| $\mathfrak{T}_{\mathrm{cons}}$ | conserved transfers through the window: energy, momentum, angular momentum, polarity, identity routing, recoil, medium excitation, and wake ledger exchange | states which balances must close together at the same event, including hidden recoil and medium rows |
| $\mathfrak{L}_{\mathrm{out}}$ | outgoing stable or metastable ledgers: photons, shifted photons, scattered assemblies, reaction products, residual bound states, heat channel, recoil carrier, and remaining Noether sea record | records products without treating observer-level particle-creation language as creation from nothing |
| $\mathfrak{R}_{\mathrm{res}}$ | residual checks for conservation, identity routing, threshold recovery, cross-section or rate benchmark, unresolved remnant energy, and explicit failure modes | marks the event as baseline, derivation target, failed map, or validated limit |

The minimal residual check can be written as

$$
\mathfrak{R}_{\mathrm{res}}
=
\left(
\Delta E_{\mathrm{tot}},
\Delta\mathbf{p}_{\mathrm{tot}},
\Delta\mathbf{J}_{\mathrm{tot}},
\Delta\mathcal{N}_{\mathrm{id}},
\Delta_{\mathrm{bench}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7250d9451a9eb8e3)

Every conservation component must vanish within its declared error allowance after all computed transfers are included. A named but unevaluated residual records an open obligation; a benchmark mismatch remains a failed comparison until resolved. Here $\Delta\mathcal{N}_{\mathrm{id}}$ is the identity-routing residual after explicit Noether sea reservoir terms are included, and $\Delta_{\mathrm{bench}}$ is the observer-level benchmark residual for the declared regime. This grammar must recover the standard incoming/outgoing accounting and thresholds in its relativistic comparison limit. It does not by itself derive amplitudes, cross sections, or production rates.

## Photon-Material Surface Routing

A material surface interaction is the near-field Gate C version of the same event schema. It should not be pictured as a small projectile striking a hard wall. At atomic resolution the incoming photon is modeled as a coaxial contra-rotating polarity-conjugate planar pair (a proposed carrier, referent-pending) with Gate A and Gate B ledgers, while the material supplies an electron-envelope branch, a nuclear source envelope, a bonding or lattice branch, and a local Noether sea response record. The local event state can be written as

$$
X_{\mathrm{surf}}
=
\left(
\gamma_{\mathrm{in}},
\mathcal B_e,
\mathcal A_{\mathrm{nuc}}^{Z,N},
\mathcal B_{\mathrm{lat}},
\Theta_E^{(\ell)},
\mathcal H_{\gamma\to\Omega}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-04359a740f4c3947)

where $\gamma_{\mathrm{in}}$ carries $E_{\gamma,\mathrm{in}}$, $\mathbf{p}_{\gamma,\mathrm{in}}$, direction, phase frequency, local $c_\gamma$, and transverse ledger data; $\mathcal B_e$ is the realized electron-envelope branch; $\mathcal A_{\mathrm{nuc}}^{Z,N}$ is the nuclear assembly ledger; $\mathcal B_{\mathrm{lat}}$ is the realized material bonding or lattice branch; $\Theta_E^{(\ell)}$ is the coarse Noether sea response record in the surface cell; and $\mathcal H_{\gamma\to\Omega}$ is the causal-wake and path-history ledger for the incoming packet and local material window.

The route decision selects a finite channel set

$$
I_{\mathrm{surf}}
\subset
\{
B_{\mathrm{refl}},
B_{\mathrm{trans}},
B_{\mathrm{cap}},
B_{\mathrm{scat}},
B_{\mathrm{heat}},
B_{\mathrm{recoil}},
B_{\mathrm{rem}}
\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6be2dcca60eb646f)

The selected route must close the scalar ledger

$$
E_{\gamma,\mathrm{in}}
=
E_{\gamma,\mathrm{out}}
+
\Delta E_{e\text{-env}}
+
\Delta E_{\mathrm{lat}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3964eee95d15b27d)

with corresponding momentum and angular-momentum rows

$$
\mathbf{p}_{\gamma,\mathrm{in}}
=
\mathbf{p}_{\gamma,\mathrm{out}}
+
\Delta \mathbf{p}_{e\text{-env}}
+
\Delta \mathbf{p}_{\mathrm{lat}}
+
\Delta \mathbf{p}_{\mathrm{sea}}
+
\Delta \mathbf{p}_{\mathrm{recoil}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ae869e9778345e5)

$$
\mathcal J_{\gamma,\mathrm{in}}^{\perp}
=
\mathcal J_{\gamma,\mathrm{out}}^{\perp}
+
\Delta \mathcal J_{e\text{-env}}
+
\Delta \mathcal J_{\mathrm{lat}}
+
\Delta \mathcal J_{\mathrm{sea}}
+
\Delta \mathcal J_{\mathrm{wake}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6266434e70904a89)

Here $E_{\gamma,\mathrm{out}}$ sums reflected, transmitted, and scattered free-photon energies. Zero outgoing energy does not erase the incoming polarization transfer. The displayed balances use disjoint accounts: any remnant or recoil angular momentum is included in the specified electron, lattice, sea, or wake term, and any remnant momentum is included in its named material carrier. Wake energy is assigned within the sea or remnant account. If those assignments do not cover an event, the missing terms must be added before conservation is claimed. The material branch variables above are required candidate inputs, not branches established here. For ordinary optical or infrared surface events, the nuclear inventory remains fixed: $\Delta Z=0$ and $\Delta A=0$, with $Z$ the proton count and $A$ the nucleon count, unless a separate nuclear-reaction gate is supplied.

| Route | Material meaning | Required closure target |
| --- | --- | --- |
| $B_{\mathrm{refl}}$ | coherent re-release of an outgoing planar-pair branch, typically supported by a collective surface-electron response in a metal-like branch | recover phase, angle, polarization, and skin-depth behavior without treating reflection as a hard bounce |
| $B_{\mathrm{trans}}$ | outgoing photon crosses the material boundary into the transmitted channel | recover transmitted flux, direction, phase, and polarization with the same material balance |
| $B_{\mathrm{cap}}$ | capture of the incoming planar-pair ledger into electron-envelope excitation or a higher material basin | close energy, momentum, transverse angular momentum, and remnant rows when $E_{\gamma,\mathrm{out}}=0$ |
| $B_{\mathrm{scat}}$ | outgoing photon branch survives with changed direction, phase, frequency, or polarization record | close shifted photon provenance together with recoil and material update |
| $B_{\mathrm{heat}}$ | captured action thermalizes through electron, lattice, and Noether sea updates | derive the route from material return dynamics rather than inserting untracked heat |
| $B_{\mathrm{recoil}}$ | lattice, nuclear source envelope, or medium component receives momentum balance | keep recoil even when its energy is small |
| $B_{\mathrm{rem}}$ | retained bound excitation or dephased surface state remains after the event window | record the remnant state instead of hiding it in attenuation |

A Vantablack-like absorber is then not a special photon ontology. It is a material branch with high geometric and electronic capture depth: many surface cells route the incoming planar-pair ledger into $B_{\mathrm{cap}}$, $B_{\mathrm{heat}}$, $B_{\mathrm{recoil}}$, and $B_{\mathrm{rem}}$ before a coherent $B_{\mathrm{refl}}$ escape channel can survive. A metal surface is the opposite limiting case: the conduction-electron branch supports a coherent surface-current response, so a large part of the incoming ledger reappears as $E_{\gamma,\mathrm{out}}$ with an organized phase relation, while absorption loss remains in the electron-envelope, lattice, Noether sea, and recoil rows.

High-finesse mirror cavities sharpen the same point because they look nearly lossless while still testing the surface ledger on every bounce. For bounce $b$, define
$$
\mathcal R_{\mathrm{mir}}(b)
=
\frac{
\left|
E_{\gamma,b}^{\mathrm{in}}
-E_{\gamma,b}^{\mathrm{out}}
-\Delta E_{e\text{-env},b}
-\Delta E_{\mathrm{lat},b}
-\Delta E_{\mathrm{sea},b}
-\Delta E_{\mathrm{recoil},b}
-\Delta E_{\mathrm{rem},b}
\right|
}{
E_{\gamma,b}^{\mathrm{in}}+\varepsilon_E
}
+\mathcal R_{\mathbf p\mathbf J,b}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-36c52d182bec59e9)

The weighted balance diagnostic over $N$ bounces is
$$
\mathcal R_{\mathrm{cav}}
=
\sum_{b=1}^{N}
w_b\,\mathcal R_{\mathrm{mir}}(b),
\qquad
w_b\ge0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b48b7fce650d8573)

Here $\mathcal R_{\mathbf p\mathbf J,b}$ is a nonnegative normalized momentum/angular-momentum balance defect, and $w_b$ are predeclared weights. A zero energy-balance defect permits complete absorption if the absorbed energy is correctly recorded; it does not measure optical loss. Moreover, a zero-weight bounce contributes no information to $\mathcal R_{\mathrm{cav}}$. Every included bounce therefore requires its own check. Apparent lossless reflection additionally requires outgoing optical survival and phase preservation within stated tolerances; for a passive single tracked channel its energy survival is the product of the per-bounce energy survival fractions, not the sum of conservation residuals.

The worked surface case is still a derivation target. It fails if reflection is modeled as a hard geometric bounce with no electron-envelope response, if absorption becomes annihilation or untracked heat, if the same material requires separate Noether sea variables for reflection and absorption, if a hidden longitudinal free-photon channel is used, or if ordinary optical events change nuclear inventory without a separate reaction provenance ledger.

**Causal material response and skin-depth ledger.** Photon-material routing needs a constitutive response target in addition to the event ledger. In the effective material description, a local response kernel $\mathcal X_\Omega$ maps the applied channel field to the coarse material polarization,

$$
\mathbf{P}_\Omega(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\int_{-\infty}^{+\infty}
\mathcal X_\Omega(t_{\mathrm{eff}}-t'_{\mathrm{eff}};x_{\mathrm{eff}}^i)\,
\mathbf{E}_{\Omega}(t'_{\mathrm{eff}},x_{\mathrm{eff}}^i)\,dt'_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0f13f0aff8c9a897)

with causality requiring

$$
\mathcal X_\Omega(\Delta t_{\mathrm{eff}};x_{\mathrm{eff}}^i)=0
\qquad
\text{for}\quad
\Delta t_{\mathrm{eff}}<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-42bb821f98b93e5f)

This convolution assumes linear, time-translation-invariant response local in the declared effective spatial chart; $\mathbf P_\Omega$ is material polarization and $\mathbf E_\Omega$ is the applied comparison field. The harmonic convention is $e^{-i\omega t_{\mathrm{eff}}}$, so the forward transform of the response kernel uses $e^{i\omega\Delta t_{\mathrm{eff}}}$. Causal support together with suitable stability and integrability gives analyticity for $\operatorname{Im}\omega>0$; causal support alone allows growing kernels whose poles lie in that half-plane. The unsubtracted Kramers-Kronig formulas below additionally require sufficient large-frequency decrease and well-defined boundary values. A nonzero instantaneous response must first be separated, and singular boundary terms need their distributional or subtracted form. On that declared domain, the response map must recover

$$
\Delta_{\mathrm{KK}}^{\operatorname{Re}}(\omega)
=
\operatorname{Re}\mathcal X_\Omega(\omega)
-
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Im}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a7b245913068f53b)

$$
\Delta_{\mathrm{KK}}^{\operatorname{Im}}(\omega)
=
\operatorname{Im}\mathcal X_\Omega(\omega)
+
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Re}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7a6d4752a389de6f)

Here $\mathcal P$ denotes the Cauchy principal value. Both residuals must vanish within declared integration and coarse-graining errors on the stated domain. This is a consistency test for a causal stable response with the assumed asymptotics; it does not establish passivity, a microscopic material realization, or a substrate response law.

For a homogeneous, isotropic, spatially local linear material comparison, use the effective response below. The permittivity $\epsilon_\Omega$ excludes the mobile-carrier contribution already assigned to conductivity $\sigma_\Omega$, and $\mu_\Omega$ is permeability. This division prevents counting the same carrier response twice:

$$
\epsilon_{\mathrm{eff}}(\omega)
=
\epsilon_{\Omega}(\omega)
+
\frac{i\sigma_{\Omega}(\omega)}{\omega},
\qquad
k^2(\omega)
=
\mu_{\Omega}(\omega)\epsilon_{\mathrm{eff}}(\omega)\omega^2,
\qquad
k(\omega)=k_1(\omega)+ik_2(\omega)
$$

[View →](../../../../equation-mapping.html#corpus-equation-04aa86114c3eda82)

For a mode proportional to $e^{ikz_{\mathrm{eff}}-i\omega t_{\mathrm{eff}}}$ with $\omega>0$, choose the passive branch $k_2>0$. Its field-amplitude skin depth and, when $k_1>0$, its $B$-relative-to-$E$ phase offset are

$$
\delta_{\mathrm{skin}}(\omega)=\frac{1}{k_2(\omega)},
\qquad
\phi_{EB}(\omega)=\tan^{-1}\!\left(\frac{k_2(\omega)}{k_1(\omega)}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbde9590ecc164bd)

The intensity attenuation length is $1/(2k_2)$, whereas $\delta_{\mathrm{skin}}$ measures amplitude attenuation. The phase uses the full argument of $k$ outside $k_1>0$; an $H$-relative-to-$E$ phase also includes complex permeability. The low-frequency good-conductor Drude limit requires $\omega\tau_{\mathrm D}\ll1$, $\sigma_{\mathrm{DC}}\gg\omega|\epsilon_\Omega|$, and approximately real positive $\mu_\Omega$. Here $\tau_{\mathrm D}$ is a material relaxation duration in observer time and $\sigma_{\mathrm{DC}}$ is direct-current conductivity:

$$
\sigma_\Omega(\omega)
=
\frac{\sigma_{\mathrm{DC}}}{1-i\omega\tau_{\mathrm D}},
\qquad
\delta_{\mathrm{skin}}(\omega)
\rightarrow
\left(\frac{2}{\mu_\Omega\omega\sigma_{\mathrm{DC}}}\right)^{1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d58a53912edab28d)

In the collisionless free-carrier comparison, take $\omega\tau_{\mathrm D}\gg1$, a vacuum background permittivity, and negligible magnetic response. With mobile-carrier density $n_{\mathrm{car}}$, effective carrier charge $q$, and effective carrier mass $m$,

$$
\omega_p^2
=
\frac{n_{\mathrm{car}}q^2}{m\epsilon_0},
\qquad
\epsilon_{\mathrm{eff}}(\omega)
\rightarrow
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4cf951f35ad17f55)

Neither $q$ nor $m$ is an architrino-level input here. In this lossless comparison, with $c^2=1/(\mu_0\epsilon_0)$, the transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
\qquad
(\omega>\omega_p)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d67c651eb40622de)

while $\omega < \omega_p$ routes to an evanescent reflection/skin-depth row rather than to an untracked disappearance of the photon ledger. If $\epsilon_{\mathrm{eff}}(\omega)=0$ supports a longitudinal plasma oscillation, that excitation belongs in the medium-excitation row; it is not a hidden longitudinal free-photon branch.

For a surface event normalized by incoming flux and polarization branch $b\in\{\perp,\parallel\}$, the material-response ledger is

$$
\mathsf L_{\mathrm{surf}}(\omega,\theta,b)
=
\left(
R_b,
T_b,
A_b,
Q_b^{\mathrm{rem}},
\delta_{\mathrm{skin}},
k_1,
k_2,
\phi_{EB},
\Delta_{\mathrm{KK}}^{\operatorname{Re}},
\Delta_{\mathrm{KK}}^{\operatorname{Im}},
\Delta_E^{\mathrm{EM}},
\Delta_{\mathbf{p}}^{\mathrm{EM}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7411087d400d5fe6)

with scalar routing condition

$$
R_b+T_b+A_b+Q_b^{\mathrm{rem}}=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc8c8d46d80be6bf)

All four terms are dimensionless fractions of incoming energy integrated over the same event window, or consistent steady-state flux fractions where no energy accumulates. Here $R_b$ includes reflected photon output, $T_b$ includes transmitted photon output, $A_b$ includes dissipative material uptake excluding the retained excitation in $Q_b^{\mathrm{rem}}$, and recoil is assigned within the material uptake. Diffuse photon output must be included in reflected/transmitted totals or given another explicit term. An independently driven or amplifying surface requires its supplied energy as an input. For a planar interface between transparent isotropic nonmagnetic media, the standard comparison is

$$
n_1\sin\theta_I=n_2\sin\theta_T,
\qquad
\tan\theta_B=\frac{n_2}{n_1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fed3080c4f36c7b8)

Here $n_1$ and $n_2$ are optical phase indices in this standard comparison, distinct from normalized Noether sea density $n(\mathbf X,T)$; $\theta_I$ and $\theta_T$ are incidence and transmission angles relative to the interface normal. The stated Brewster angle $\theta_B$ is the zero-reflection angle for polarization parallel to the incidence plane, under these material assumptions. The simple ratio need not hold for magnetic, anisotropic, or absorbing media. In conducting limits, the ledger must recover attenuation through $k_2$ and $\delta_{\mathrm{skin}}$ while keeping energy, momentum, and angular momentum assigned to the same event record.

## Ensemble Temperature

The term "hot" should be used with care. A single excited Noether braid is not hot in the full thermodynamic or blackbody sense. It is better described as internally excited, closure-mismatched, or metastable above a local stable rung. Temperature is an ensemble-level effective variable: many assemblies must exchange energy, emit, absorb, scatter, and thermalize so that a stable distribution can be assigned.

At the ensemble level, the relevant object is not one value of $E_{\text{exc}}$ but a distribution over assembly states and photon modes. A disciplined temperature definition should come from an entropy-energy relation for the ensemble,

$$
\frac{1}{k_B T_{\text{ens}}}
=
\left(\frac{\partial S_{\text{ens}}}{\partial E_{\text{ens}}}\right)_{\mathcal{N},\mathcal{V}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-24b769c1a722aa26)

Here $S_{\text{ens}}$ is dimensionless entropy, namely physical entropy divided by $k_B$, and $E_{\text{ens}}$ is ensemble energy. With physical entropy instead, the derivative would equal $1/T_{\text{ens}}$. This definition presupposes a differentiable equilibrium entropy in the declared ensemble; it does not prove thermalization. The symbols $\mathcal N$ and $\mathcal V$ denote inventory and effective volume held fixed in the coarse-graining. An equivalent kinetic definition also requires a distribution shown to thermalize under the interaction rules.

For radiation channels, local thermodynamic equilibrium is a claim about the local state whose maintenance can be tested against competing timescales. Reusing the diagnostic from bremsstrahlung,

$$
\mathcal{R}_{\mathrm{LTE}}
\equiv
\frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-42013aabe5e135c7)

Here the coupling and cooling durations use the same observer clock. Small $\mathcal{R}_{\mathrm{LTE}}$ supports one scale separation for maintaining local thermodynamic equilibrium during cooling, not a sufficient condition: the coupling must thermalize the relevant degrees of freedom and outrun drive, transport, and escape as well. Large $\mathcal{R}_{\mathrm{LTE}}$ warns that cooling can outpace equilibration but does not alone prove a non-equilibrium state. A one-temperature emissivity requires the corresponding distribution and population conditions. Material equilibrium does not by itself put the photon bath in blackbody equilibrium.

## Blackbody Limit

Blackbody behavior is a stronger claim than radiation. It requires repeated emission, absorption, scattering, and mode exchange until the photon bath approaches detailed balance with the material or Noether sea ensemble. In the weak homogeneous validated limit, the closure target is the usual Planck occupation form,

$$
\bar n_\gamma(\nu)
=
\frac{1}{\exp(h\nu/(k_B T_{\mathrm{temp}}))-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8c0ea9bd422d056e)

with effective photon chemical potential driven to zero in the fully thermalized photon bath. This is an observer-level recovery target. The foundation-up task is to show how planar-mode nucleation, planar-mode capture, Compton-like redistribution, pair channels, and non-radiative medium exchange jointly produce the same limit.

At equilibrium, the temperature in the Planck occupation is the same ensemble temperature defined above: $T_{\mathrm{temp}}\equiv T_{\mathrm{ens}}$. The separate labels only distinguish the formula's conventional temperature notation from the ensemble definition.

The minimum detailed-balance condition is schematic but useful:

$$
\Gamma_{i\to j+\gamma}\,f_i\,(1+\bar n_\gamma)
=
\Gamma_{j+\gamma\to i}\,f_j\,\bar n_\gamma
$$

[View →](../../../../equation-mapping.html#corpus-equation-49ab805967d09a67)

Here $f_i$ and $f_j$ are ensemble occupation weights for material or assembly states, while $\Gamma$ denotes the effective transition coefficient before multiplication by the explicit photon occupation factors. The factors $g_i,g_j$ below count state degeneracies; coefficients and populations must use matching per-state or summed-state conventions. This equation states a balance to recover, not a proof of blackbody behavior. Its algebraic Planck solution requires nonzero connected transition rates and positive $h\nu/(k_BT_{\text{ens}})$; if both coefficients vanish, the equation is $0=0$ for every occupation.

The detailed-balance theorem target is more specific than the schematic equation. For a transition with $E_i-E_j=h\nu$, Gate C must derive an ensemble weight ratio

$$
\frac{f_i}{f_j}
=
\frac{g_i}{g_j}\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5399475bb00ebeb1)

from the thermalized assembly ensemble, together with a rate-degeneracy relation

$$
\Gamma_{i\to j+\gamma}\,g_i
=
\Gamma_{j+\gamma\to i}\,g_j
$$

[View →](../../../../equation-mapping.html#corpus-equation-b39b780bb35f9e95)

Those two conditions make the detailed-balance equation imply

$$
\frac{\bar n_\gamma}{1+\bar n_\gamma}
=
\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ddb17a2e31fb1116)

and therefore recover the Planck occupation. The point is not to postulate these relations at the substrate level; the point is to identify exactly what the assembly return map, planar-mode capture/release rates, and coarse-grained ensemble measure must prove before blackbody language becomes available.

For cosmology-facing claims, thermalization depth is a diagnostic rather than a new ontology term. A useful provisional target is

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_{\mathrm{eff},a},t_{\mathrm{eff},b})
=
\int_{t_{\mathrm{eff},a}}^{t_{\mathrm{eff},b}}
\left[
\tau_{\mathrm{cap}}^{-1}
+
\tau_{\mathrm{scat}}^{-1}
+
\tau_{\mathrm{pair}}^{-1}
+
\tau_{\mathrm{med}}^{-1}
\right](\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c23f3cbef64110c7)

The terms are effective interaction rates for capture/release, scattering, pair channels, and medium exchange, all in the same observer time. At fixed $\nu$ this is an interaction-depth diagnostic; a frequency-changing trajectory requires rates evaluated along its frequency history or a frequency redistribution operator. Many interactions do not necessarily erase a spectral distortion: elastic scattering can change direction without changing occupation, and photon-number-conserving exchange alone does not generally drive chemical potential to zero. Approach from a specified non-equilibrium distribution requires large integrated relaxation in every relevant distortion mode, including a number-changing channel where needed, plus detailed balance and controlled escape. An initially Planckian bath can remain Planckian without a large interaction depth, so the displayed sum is not a universal necessary condition either.

For cosmology-facing use, the blackbody limit also requires thermalization depth, damping, anisotropy, polarization, and redshift handoff to remain consistent with the same provenance record. The CMB claim is therefore not "many photons exist." The claim to prove is that source channels plus Noether sea transport can generate and preserve a near-blackbody photon bath within observational limits.

## Channel Routing

Channel routing is the event-level decision tree that sends the closure residual into allowed outputs. It should be recorded before a channel is used in a larger reaction or cosmology argument.

| Channel family | Trigger geometry | Primary output | Required closure target |
| --- | --- | --- | --- |
| Bremsstrahlung | charged-assembly acceleration or deflection near a target assembly, including direction changes at nearly constant speed | planar-mode photon, recoil, medium excitation | recover $d\sigma/dk$, screening, form-factor, and free-free emissivity limits |
| Synchrotron | curved charged-assembly transport in an anisotropic Noether sea state | repeated planar-mode photon output | recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, cooling breaks, and polarization limits |
| [Atomic transition](atomic-transition-radiation.md) | electron-assembly envelope moves between effective resonance basins | line photon plus recoil and residual atomic state | recover spectral line frequencies after local clock/rate conversion |
| Pair association and neutral relock radiation | photon overlap, charged pair association, or charged pair relock | photons, $e^+e^-$ assemblies, recoil, and recruited or returned Noether braid content | recover threshold, cross-section, and inventory plus identity-routing conservation in validated regimes |
| Thermal free-free | ensemble of screened charged encounters | continuum photon bath plus medium heating | recover thermal emissivity under the distribution and scale-separation assumptions in [Ensemble Temperature](#ensemble-temperature), with non-equilibrium corrections when those assumptions fail |
| Compton-like scattering | photon assembly captured and re-released by a charged assembly | shifted photon, recoil, and possible heat channel | recover energy-momentum transfer and standard scattering limits |
| Coherent elastic scattering | bound or free charged response re-routes an incoming photon without a resolved internal target excitation | photon with frequency preserved only to the declared recoil and Doppler accuracy, plus material or wake handoff | recover Rayleigh and Thomson limits, including the Rayleigh low-frequency scaling, from the same incoming/outgoing event record |
| Photoelectric effect | incoming photon-channel event reaches a material electron-envelope or surface basin above its release threshold | emitted electron assembly, recoil, remnant excitation, or heat | recover threshold frequency, intensity-count scaling, stopping-potential linearity, and maximum kinetic-energy relation $K_{\max}=h\nu-\Phi_{\mathrm{work}}$ from one surface event record |
| Free-bound recombination radiation | a free charged assembly associates into a bound atomic envelope basin | recombination photon, recoil, and residual atomic or medium energy | recover continuum-to-line capture spectra and detailed balance with the inverse bound-free channel from one event family |
| Cherenkov and transition radiation | uniform charged transport outruns a material phase channel, or crosses a sharp material-response boundary | directional photon output plus material recoil and polarization update | recover the Cherenkov threshold and angle and the transition-radiation boundary dependence without treating acceleration as a necessary observer-level trigger |
| Medium relaxation | Noether sea or material excitation relaxes without a resolved source-particle event | photon output if planar-mode gate opens; otherwise medium heat or turbulence | keep source, transport, and thermalization provenance explicit |
| Reaction-product or particle radiation | assembly reaction, dissociation, association, or high-energy collision with outgoing non-photon assemblies | outgoing assemblies, recoil, medium updates, and possible photon rows | use the reaction provenance ledger; do not relabel non-photon products as planar-mode photon radiation |

Every photon-producing or reaction-coupled row in this table has the same routing skeleton:

$$
\text{closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual internal energy, or reaction products}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1b9394889f3c87c2)

Gravitational-wave radiation sits outside this table. It is a tensor/effective-metric channel whose closure targets are speed, dispersion, polarization content, detector-side strain provenance, and source-side quadrupole recovery, handled in [Gravitational Waves](../spacetime/gravitational-waves.md). It should not be promoted as another photon-output branch.

The channel pages specialize the skeleton. This overview supplies the shared rule: no radiation claim is complete until the event record identifies the source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, closure status, and observer-level recovery limit.

The routing skeleton is a theorem-target contract, not a completed event-routing theorem. Radiation-coupled reaction and pair channels remain open worked sector cases until they satisfy the event-ledger contract in [Reaction Ledger](../validation/reaction-ledger.md#residual-routing-event-ledger-contract): a replayable residual, a stated channel boundary, a selected output assignment, a closed $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, benchmark recovery, and explicit failure modes.

## Radiation Closure-Target Ledger

The routing skeleton above becomes useful only if each benchmark is carried as a classified closure item. In this ledger, `ontology` names what the theory treats as real at the substrate or assembly level; `derivation target` names a result that must be recovered from dynamics, symmetry, simulation, or constitutive closure; `effective summary` names an observer-level formula retained as a recovery target; and `speculation` names a possible extension that cannot be used to repair a failed benchmark.

| Target | Class | Concrete closure requirement | Validation check | Failure condition |
| --- | --- | --- | --- | --- |
| Radiative event ontology | ontology | A radiative event is a routed closure residual (this event structure is the ontology claim). Photon output is a planar-mode nucleation event whose photon branch is modeled as the coaxial contra-rotating polarity-conjugate planar pair, a proposed carrier (referent-pending) whose acceleration-balance closure remains open; medium excitation, recoil, residual internal energy, and reaction products remain explicit non-photon channels. | Every channel event record identifies the source assembly, trigger geometry, local Noether sea state, $\mathcal{R}_{\Theta}$, $E_{\text{exc}}$, photon or non-photon outputs, and conservation ledgers. | If radiation is treated as primitive acceleration-field output or as untracked energy loss, the ontology has been bypassed. |
| Scattering/reaction event grammar | derivation target | Express every scattering, relativistic collision, pair-channel, and radiation-coupled reaction as $\mathcal{E}_{\mathrm{scat/rxn}}=(\mathfrak{L}_{\mathrm{in}},W_{\mathrm{int}},\mathfrak{T}_{\mathrm{cons}},\mathfrak{L}_{\mathrm{out}},\mathfrak{R}_{\mathrm{res}})$, with incoming ledgers, a finite interaction window, conserved transfers, outgoing ledgers, and residual checks all present. | A completed channel must drive every conservation defect to its declared tolerance after computed transfers are included and pass the independent benchmark comparison. Named unevaluated terms remain open. | If products are listed without incoming provenance, if the interaction window is hidden, if observer-level creation language bypasses identity routing, or if standard scattering limits are asserted without residual checks, the event grammar has failed. |
| Larmor/Liénard recovery | derivation target | Coarse-grain repeated planar-mode nucleation from smooth weak-field charged-assembly acceleration so that the nonrelativistic power scales as $P\propto\|\mathbf{a}\|^2$ and the relativistic observer-level limit recovers the Larmor/Liénard class after clock and rate conversion. | Sweep smooth acceleration histories at fixed weak homogeneous Noether sea state and recover the standard power and angular limits before claiming channel-specific deviations. | If the low-speed limit is not quadratic in acceleration, or if the relativistic limit requires a separately fitted radiation threshold, the radiation map is not closed. |
| Medium-speed and boundary radiation | derivation target | Recover Cherenkov radiation for uniform transport with $v>c_{\mathrm{phase}}$ and transition radiation at an abrupt material-response boundary from the same sea-dependent event grammar. | Derive threshold, angle or boundary dependence, spectrum, recoil, and material energy-momentum transfer without inserting an acceleration-only trigger. | If the model forbids radiation at constant velocity in these validated material regimes, or reproduces them only by relabeling a fitted photon source as a closure residual, the preparation map fails. |
| Bremsstrahlung emissivity | derivation target | Integrate the charged-assembly acceleration or deflection event record over impact parameters, screening, target geometry, and ensemble distributions to recover free-free emissivity, including $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{-1/2}e^{-h\nu/(k_B T_{\mathrm{temp}})}g_{\mathrm{ff}}$ and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{1/2}$ in the nonrelativistic thermal comparison. | With the required distributions and scale separations established as in [Ensemble Temperature](#ensemble-temperature), recover $d\sigma/dk$, screening, form-factor, and emissivity limits from the same channel record used by [Bremsstrahlung](bremsstrahlung.md). The cooling ratio alone does not establish those assumptions. | If cross-section and emissivity closure require different Noether sea state variables or hidden per-plasma fits, the channel fails as a derivation. |
| Shock cooling branch selection | derivation target | For jet heads, knots, dense gas impacts, and other supersonic working surfaces, use $\mathcal{R}_{\mathrm{cool}}=t_{\mathrm{cool}}/t_{\mathrm{dyn}}$ to diagnose cooling through the included channels, then derive thermal, non-thermal, and stored-energy shares from the complete response and rate record. | Compare source records against thermal and non-thermal shock benchmarks with declared distributions, optical depths, acceleration processes, and competing cooling rates. | If the model assigns spectral type or energy partition from the cooling ratio alone, or fits each share separately, the radiation branch has not closed. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Map anisotropic Noether sea state to effective magnetic transport and recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling-break behavior from curved charged-assembly routing. | Sweep $\gamma$, $B$, and pitch geometry while holding the same $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ mapping; recover the standard scaling before using synchrotron cascades in source or cosmology arguments. | If the factor-of-$\gamma^2$ frequency scaling is absent, or if the $B$ map must be redefined between trajectory curvature and emission, the synchrotron branch fails. |
| Pair thresholds and pair-channel provenance | derivation target | Recover the standard pair thresholds while preserving architrino inventory: for photon-photon pair production, the Gate C target includes $s\ge 4m_e^2c^4$ and $E_1E_2(1-\cos\theta_{12})\ge 2(m_ec^2)^2$ in the validated limit. | The event record must identify incoming photon assemblies, outgoing $e^+e^-$ assemblies, recoil or medium terms, and the standard threshold/cross-section limit. It must also decide the provenance fork: direct rearrangement from the two photon ledgers, or recruited and returned neutral Noether braid content from the Noether sea. | If pair production is described as creation from nothing, violates inventory conservation, hides which fork supplies the outgoing inventories, or shifts the threshold without a controlled new-physics claim, the pair channel is not closed. |
| Compton-like scattering | derivation target | Treat photon capture and re-release by a charged assembly as a Gate C vertex and recover the observer-level Compton shift $\lambda'-\lambda=(h/(m_ec))(1-\cos\theta)$, the Thomson low-energy limit, and the Klein-Nishina high-energy correction. | The same vertex record must close incoming photon data, charged-assembly recoil, shifted outgoing photon data, heat or residual excitation, and energy-momentum transfer. | If scattering is modeled only as phenomenological frequency loss, or if recoil and shifted photon provenance cannot close together, the Compton-like branch fails. |
| Photoelectric effect | derivation target | Treat photoelectric emission as a Gate C material-capture event, not as proof that photon energy is free-standing ontology. The threshold target is $h\nu\ge\Phi_{\mathrm{work}}$, with $K_{\max}=h\nu-\Phi_{\mathrm{work}}$ and $eV_s=K_{\max}$ in the validated limit. | The same surface event record must close incoming photon data, electron-envelope release, work-function threshold, recoil, heat or remnant excitation, and outgoing electron energy. Above threshold, intensity changes the event count while frequency controls the per-event energy available. | If subthreshold intensity can accumulate into emission without a declared intermediate excitation ledger, if stopping-potential linearity is fitted separately from the photon energy-frequency row, or if recoil, heat, and remnant rows disappear, the photoelectric branch fails. |
| Effective EM Gate residual | derivation target | Any use of Maxwell-level variables must satisfy $\mathcal{G}_{\mathrm{EM}}=(\Delta_{\mathrm{cont}},\Delta_E^{\mathrm{EM}},\Delta_{\mathbf{p}}^{\mathrm{EM}},\Delta_{\mathbf{J}}^{\mathrm{EM}},\Delta_{\mathrm{gauge}})$ in the declared standard-limit regime. Any additional event transfers must be computed and the enlarged balance rechecked; naming a residual is not closure. The capacitor-gap comparison is the minimal loop-surface check: the same boundary loop must give the same magnetic circulation whether the chosen surface cuts conduction current or changing electric flux. | Evaluate the effective continuity, Poynting-flux, Maxwell-stress, angular-momentum, and gauge-invariance residuals on the same event record used for photon or material routing. | If the channel recovers a spectrum while hiding charge continuity, stress recoil, gauge dependence, loop-surface dependence, or energy-momentum mismatch in the effective field layer, the EM comparison gate has failed. |
| Causal response-function analyticity | derivation target | Causal stable material response must recover analyticity for $\operatorname{Im}\omega>0$ and the applicable Kramers-Kronig relations, with instantaneous terms, high-frequency asymptotics, and any real-axis singularities treated explicitly as in [Photon-Material Surface Routing](#photon-material-surface-routing). | Check paired absorption and dispersion from one response kernel with the declared convergence and stability assumptions. | Acausal response or unexplained independent tuning fails the comparison; an unsubtracted formula applied outside its domain is not evidence against an otherwise causal material. |
| Material absorption/reflection/skin-depth ledger | derivation target | Surface events must use one ledger $\mathsf L_{\mathrm{surf}}(\omega,\theta,b)$ for reflection, transmission, absorption, remnant excitation, skin depth, complex wavenumber, response analyticity, and EM energy-momentum residuals. | Recover Fresnel/Snell/Brewster behavior in transparent limits, $\delta_{\mathrm{skin}}\rightarrow(2/(\mu\omega\sigma_{\mathrm{DC}}))^{1/2}$ in low-frequency Drude conductors, and plasma cutoff behavior near $\omega_p$. | If reflection is a hard bounce, absorption is untracked heat, skin depth is detached from conductivity, or longitudinal plasma oscillation is treated as a free photon mode, the material route fails. |
| Blackbody recovery | derivation target | Show that repeated emission, absorption, Compton-like redistribution, pair channels, and non-radiative exchange reach detailed balance with Planck occupation $\bar n_\gamma(\nu)=1/(\exp(h\nu/(k_B T_{\mathrm{temp}}))-1)$ and effective photon chemical potential driven to zero. | Recover the Planck spectrum, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff using one provenance record and one Noether sea state map. | If blackbody recovery needs per-observable retuning, unbalanced photon loading, or a different transport map from the source channels, the thermal branch fails. |
| Free photon polarization boundary | derivation target | Radiation pages may record polarization basis, transverse angular-momentum ledger, and observer-level polarization recoveries as downstream requirements, but free photon polarization, helicity, Malus' law, and analyzer statistics are Gate B results. | Every radiation, scattering, pair, or cosmology use of photon polarization must point back to the Gate B handoff instead of deriving new free-photon polarization rules locally. | If a channel page invents its own free photon polarization derivation, adds a longitudinal free mode, or treats Gate B as already proven inside radiation, the closure boundary is violated. |
| Noether sea-dependent radiation deviations | speculation | Deviations tied to $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, threshold floors, or transmitter-history transport are candidate predictions only after the validated limits above are recovered. | A proposed deviation must state the benchmark-preserving limit, the residual term, and the measurable regime before being used in a source model. | If a deviation is used to rescue a failed standard recovery or is fitted independently per observable, it is not accepted as radiation closure. |

## Closure Targets

The first proof burden is to derive the separatrix condition and planar-mode threshold from the Master Equation and the Noether braid ledger. The second burden is to show that the same routing record recovers known radiation channels in validated limits. The third burden is to show that ensemble thermalization can reach the blackbody limit without changing ontology or re-fitting Noether sea state variables for each observable.

In compact form, the radiation program is:

$$
\text{rapid transport or gradient change}
\longrightarrow
\text{Noether braid closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{photon output, medium excitation, recoil, residual internal energy, or reaction products}
\longrightarrow
\text{observer-level spectrum or thermal bath}
$$

[View →](../../../../equation-mapping.html#corpus-equation-736f16fe291fca45)

This is a radiative closure program, not yet a completed derivation of blackbody radiation. It keeps strong source insights in play while preserving the distinction between ontology, derivation targets, effective summaries, and speculative extensions.

The final diagram specializes the rapid-drive case. Uniform-motion material radiation, initially excited sources, and photon capture use their own declared trigger and input records. Standard benchmark formulas in the tables carry their comparison domains: synchrotron scalings require the stated relativistic and pitch-angle limit; the two-photon threshold and Compton formula use a common inertial observer chart, with the Compton target initially at rest; the photoelectric maximum-energy and intensity-count relations refer to the single-photon regime. Outside that regime, multiphoton or intermediate-state processes require their own incoming energy and event accounting.

## Sources for Comparison Limits

The rate normalization and time-window restrictions in [Non-Radiative Shedding](#non-radiative-shedding) follow the standard comparison developed in B. Zwiebach, *Quantum Physics III*, MIT 8.06 (2018), [chapter 4, section 4.3, pp. 89–94](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/89ef6d5958ee59bae9a91345c3d8c8e4_MIT8_06S18ch4.pdf). D. Tong, *Electromagnetism* (2015), [chapter 7, sections 7.5.4 and 7.6](https://www.damtp.cam.ac.uk/user/tong/em/el6.pdf), supplies the causal-response and conductor comparisons. These sources constrain effective recovery; they do not derive Architrino branches or material response.
