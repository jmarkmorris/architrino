# Constraint Ledger

Notes collected here document the falsification criteria, ordering priorities, and supporting mechanisms for the architrino framework. Keep this page focused on observable constraints so each model version can be checked against experimental scrutiny.

## Experimental Constraint Ledger and Falsification Criteria

This ledger crystallizes the measurable thresholds and theoretical guardrails that could falsify the architrino proposal. Each numbered entry combines the empirical bound, the proposed mechanism, and the explicit failure condition so that we can track how discrete experimental results shape or reject the model.

### Lorentz Invariance & Preferred Frame Effects (Tier 1)

The purpose of this section is to define the combination of experimental isotropy and observational invariance that must hold if a putative absolute frame is to remain hidden. We identify the observables, derive the emergent timing/ruler behavior implied by the Noether Sea, and explicitly state the tolerance beyond which the preferred frame would become perceivable.

* **Constraint** – isotropy from Michelson–Morley and resonator experiments constrains $|\Delta c/c| < 10^{-17}$ while atomic clock sidereal drift stays below $10^{-16}$, keeping Lorentz-invariance leakage under the $10^{-17}$ falsification threshold.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether Sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with proper time $\tau$ rather than absolute time $t$.
* **Failure Condition** – any detectable preferred-frame orientation above $10^{-17}$ or residual $\delta$ in $L_{moving} = L_{rest} (\gamma^{-1} + \delta)$ that exceeds $10^{-17}$ invalidates the theory.

### The Absolute-Frame Drift Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether Sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether Sea must dynamically enforce the Lorentz contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Sea, preferred frame effects become measurable and falsify the theory.

### Noether-Sea Drag

Here we catalogue how coupling between macroscopic bodies and the Noether Sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by gravitational-wave-based orbital decay measurements in general relativity.

* **Constraint** – interactions with the Noether Sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

### GW Speed

The propagation speed of the density waves in the Sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline.

* **Constraint** – gravitational waves, modeled as density ripples in the Sea, must travel within $|v_{GW}-c|/c < 10^{-15}$ of the local light speed to preserve consistency with LIGO/Virgo timing.

### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether-Sea delay factor $\chi_{\text{sea}}$, which allows us to compare the emergent delay with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR to within PPN bounds ($|\gamma - 1| < 10^{-5}$).
* **Architrino Interpretation** – signals traverse straight Euclidean lines; the perceived delay or curvature arises from the Noether-Sea delay factor $\chi_{\text{sea}}$ responding to spatial variations in $\rho_{\text{core}}$ and related medium state variables.
* **Validation Target** – map $g_{00} \approx 1 + 2\Phi/c^2$ onto the refractive slowing experienced by tri-binary signals moving through the absolute grid.

### Gravitational Time Dilation

We require that the proposed mechanical slowing induced by Noether-core density aligns quantitatively with geodetic and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets (38 μs/day), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface.
* **Mechanism** – mechanical slowing of tri-binary orbital frequencies couples to the local Noether-core density and Noether-Sea delay factor, generating the observed dilation without changing the constitutive map used for other weak-field observables.

### Closure Program Tracking Hooks

Use this ledger as the acceptance layer for the six integrated closure programs:

| Program | Primary chapters | Ledger gate |
| --- | --- | --- |
| CKM holonomy closure | [theory-bridges/weak-mixing-ckm.md](../theory-bridges/weak-mixing-ckm.md) | CKM hierarchy and CP-phase consistency with propagated uncertainty |
| PMNS neutral-core closure | [assemblies/fermions/neutrinos.md](../assemblies/fermions/neutrinos.md) | Oscillation pattern consistency across $L/E$ and medium regimes |
| Emergent metric / PPN closure | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md), [spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) | Lorentz leakage, PPN, redshift, Shapiro, GW-speed bounds |
| Non-relativistic Schrödinger + Born closure | [theory-bridges/pilot-wave-character.md](../theory-bridges/pilot-wave-character.md), [quantum/wavefunction-ontology.md](../quantum/wavefunction-ontology.md), [theory-bridges/superposition-mechanism.md](../theory-bridges/superposition-mechanism.md) | Effective fixed-particle-number wave equation + statistical outcome consistency |
| Photon Gate A/B/C closure | [assemblies/bosons/electroweak-bosons.md](../assemblies/bosons/electroweak-bosons.md), [theory-bridges/angular-momentum-and-spin.md](../theory-bridges/angular-momentum-and-spin.md), [validation/reaction-cosmology-provenance-ledger.md](reaction-cosmology-provenance-ledger.md), [spacetime/lorentz-kinematics.md](../spacetime/lorentz-kinematics.md) | Gate A massless nondispersive photon kinematics, Gate B polarization and squared-amplitude capture as a downstream spin/helicity ledger, and Gate C Maxwell/QED vertices, pair/radiation provenance, and $\alpha$ recovery |
| Topological spin/confinement closure | [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md), [assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md) | 4$\pi$ spin structure and open-vs-closed color-energy scaling |

Cross-program acceptance principle:
$$
\mathcal{C}_{\mathrm{CKM}}
\cap
\mathcal{C}_{\mathrm{PMNS}}
\cap
\mathcal{C}_{\mathrm{PPN/GR}}
\cap
\mathcal{C}_{\mathrm{QM}}
\cap
\mathcal{C}_{\mathrm{Photon}}
\cap
\mathcal{C}_{\mathrm{Topo}}
\neq \varnothing.
$$
If the intersection is empty after uncertainty propagation, the integrated model version is rejected.
