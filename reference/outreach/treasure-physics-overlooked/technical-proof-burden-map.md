# Technical Proof-Burden Map: The Treasure Physics Overlooked

This packet maps the main technical burdens behind [The Treasure Physics Overlooked](../../../content/markdown/aaa/philosophy-history/treasure-physics-overlooked.md). It is written for technical readers who need the proof obligations without the historical essay.

## Status Key

**Written closure** means the essay states a bridge equation or ledger with source variables, target variables, fallback regime, and failure condition.

**Declared burden** means the essay names the correct acceptance condition but still owes the derivation, simulation, or proof from $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics.

## 1. Lorentz Recovery

**Status:** declared burden.

**Source variables:** absolute time, Euclidean void, architrino motion, causal wakes at $c_f$, photon channel speed $c_\gamma$, effective observer speed $c_{\text{eff}}$, weak homogeneous calibration speed $c_0$, Noether sea density/response, assembly state, and the clock map row $\chi_{\text{sea}}$.

**Target variables:** embedded proper time, ruler response, two-way signal synchronization, apparent Lorentz symmetry, weak-field metric behavior, and bounded preferred-frame leakage.

**Central owed map:**

$$
\frac{d\tau}{dt}
=f_\tau(\beta,n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state}),
\qquad
\beta=\frac{v}{c_{\text{eff}}}.
$$

The hard requirement is that $v$ is substrate velocity while the observer can recover only non-separable operational combinations after synchronization. Absolute-frame structure may exist in the substrate, but it cannot leak into embedded measurement records above modern bounds.

**Acceptance conditions:**

- recover special-relativistic time dilation in the velocity sector;
- recover gravitational redshift and weak-field metric behavior in the potential sector;
- derive moving-assembly deformation, clock/ruler retuning, and signal synchronization from one Noether sea response;
- decompose leakage by channel and order: Michelson-Morley, Kennedy-Thorndike, Ives-Stilwell, Hughes-Drever and clock-comparison rows, sidereal modulation, photon dispersion/birefringence/time-of-flight, weak-field preferred-frame rows, and gravitational-wave/photon speed matching;
- satisfy $|c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma|/c_\gamma\lesssim10^{-15}$ in the GW170817/GRB 170817A regime after source-lag conventions are declared.

**First useful artifact:** a finite preferred-frame leakage table computed from one trial Noether sea response, preferably expressed as correlated RMS or low-order SME-like coefficients rather than independent fitted knobs.

**Failure mode:** a response that hides two-way optical anisotropy while leaving matter-sector clock anisotropy, photon dispersion, weak-field preferred-frame leakage, or gravitational/photon speed mismatch has not recovered Lorentz behavior.

## 2. Born And Bell Recovery

**Status:** declared burden.

**Source variables:** deterministic whole-state record, retained histories, apparatus partitions, basin measure, local setting labels, record-formation maps, absolute-time order, and causal-wake reach at $c_f$.

**Target variables:** Born weights, CHSH value $2\sqrt{2}$, no-signaling marginals, ordering-invariant joint law, and hidden preferred-frame residual below experimental access.

**Born burden:** the basin measure must recover quadratic Born weights for a nontrivial preparation family. It cannot merely rename hidden ignorance. The quotient from unresolved deterministic histories to apparatus outcomes must be explicit enough that changing the preparation changes the basin volumes in the right way.

**Bell burden:** the same record-and-measure machinery must recover:

- the joint correlation value $2\sqrt{2}$;
- marginal invariance under local-setting relabeling at each wing;
- ordering invariance when the absolute-time order of spacelike observer records is swapped;
- suppression of any preferred-frame timing or setting residual below the experimental coincidence and Lorentz-test bounds.

If $c_f>c_\gamma$, there is a photon-spacelike but wake-timelike wedge. In that wedge, a causal wake could in principle reach the second record-formation region even though the event pair is operationally spacelike by the photon channel. The architecture must either require $c_f$-causal separation of record-closure regions or prove that wake reach into the opposite closure region is suppressed below timing and correlation tolerances.

**First useful artifact:** a two-wing toy apparatus with explicit basin partitions and record-formation maps $R_A$ and $R_B$, showing $\mu(R_A\circ R_B)=\mu(R_B\circ R_A)$ on the relevant spacelike record algebra while also recovering the target joint law.

**Failure mode:** a theory that gets CHSH by global hidden state but lets one-wing marginals, absolute order, or timing statistics leak setting or frame information has reframed Bell rather than recovered it.

## 3. Redshift And Cosmology

**Status:** written closure for the energy ledger; declared burden for the full transport generator.

**Source variables:** photon-channel bundle, Noether sea transport state, path history, source/release rows, boundary flux, local energy density $\rho_E$, energy-flux density $\mathbf{S}_E$, and the same $\chi_{\text{sea}}$ response that participates in clock and signal export.

**Written ledger target:**

$$
E_{\mathrm{tot}}(t)
=
E_{\mathrm{arch}}(t)
+E_{\mathrm{wake}}(t)
+E_{\mathrm{sea}}(t),
\qquad
\frac{dE_{\mathrm{tot}}}{dt}=0.
$$

If global energy is not finite or convergently summable, the safe fallback is local continuity:

$$
\partial_t\rho_E+\nabla\cdot\mathbf{S}_E=0.
$$

For a transparent photon-channel bundle redshifted by $1+z$, the closure row is:

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}\frac{z}{1+z},
\qquad
\Delta E_{\gamma}+\Delta E_{\mathrm{sea,path}}=0.
$$

**Transport burden:** the transport generator must commute with global frequency rescaling, preserve transported-bundle occupation shape, carry no undeclared transverse momentum transfer, preserve image sharpness and phase coherence, avoid long-baseline dispersion in $c_\gamma(\omega)$, and keep the sink from re-radiating into the transparent channel.

**One-response burden:** the same Noether sea constitutive response must carry redshift-distance behavior, observed $(1+z)$ time dilation, Tolman surface brightness, CMB blackbody quality, acoustic structure, lensing, and growth. If local distance-ladder behavior and CMB/growth behavior require separate tunings, the architecture inherits rather than resolves the split.

**Long-time burden:** $\Delta E_{\mathrm{sea,path}}$ cannot become one-way secular heating. The sink must be balanced by source/release, black-hole recycling, equilibration, or boundary-flux bookkeeping over cosmic history.

**First useful artifact:** a transparent-path transport model with a frequency-rescaling generator, an explicit energy sink, an image-sharpness/no-dispersion check, and one shared response parameter family tested against redshift-distance and CMB-preservation constraints.

**Failure mode:** any redshift mechanism that needs stochastic scattering, absorption/re-emission along the transparent path, thermalizing kicks, unbookkept energy loss, frequency-dependent group velocity, or multiple unrelated constitutive responses fails the cosmology wall.

## 4. Compact-Object Bridge

**Status:** declared burden.

**Source variables:** dense Noether braid retuning, causal-wake retention, self-hit branch behavior, Noether sea compliance, source/release rows, horizon-interface access, exterior detector coupling, and recycling/boundary-flux bookkeeping.

**Target variables:** stellar-remnant mass-radius behavior, collapse thresholds, exterior strong-field redshift and lensing, gravitational-wave strain records, horizon thermodynamics, entropy accounting, and black-hole recycling.

**Bridge burden:** the same underlying dense-matter and Noether sea response must explain why compact objects export the observer-level signatures that GR models successfully while also closing the source/release and energy-ledger obligations that the fixed-void cosmology creates.

**Acceptance conditions:**

- recover the effective exterior strong-field chart where it is empirically successful;
- keep self-hit dynamics well posed under stronger-field branch conditions;
- make gravitational-wave records detector-visible without violating the GW/photon speed row;
- connect black-hole thermodynamics to physical source/release bookkeeping rather than treating entropy as a standalone analogy;
- supply a return channel for the redshift energy sink so the Noether sea does not secularly heat.

**First useful artifact:** a compact-object bridge card with source variables, target variables, validity regime, and failure condition for one specific observable family, such as gravitational-wave speed/strain export or black-hole recycling energy balance.

**Failure mode:** if compact-object chapters remain compatible stories without a bridge from dense Noether braid and Noether sea dynamics to exterior observables, they do not discharge the compact-object burden.

## Summary Table

| Sector | Current state | Smallest next closure artifact |
| --- | --- | --- |
| Lorentz | Declared burden | Computed clock/synchronization map plus preferred-frame leakage table from one response. |
| Born/Bell | Declared burden | Explicit basin-measure toy model recovering Born weights, CHSH, no-signaling, and ordering invariance together. |
| Redshift/cosmology | Written energy ledger; transport still owed | Transport generator that preserves frequency scaling, image sharpness, no dispersion, CMB shape, and one-response cosmology behavior. |
| Compact objects | Declared burden | Source-to-effective bridge for one compact-object observable family, tied to recycling or GW export. |
