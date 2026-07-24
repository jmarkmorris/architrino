# Gravitational Waves

This chapter provides a conditional closure chain from the emergent-metric weak-field map to testable gravitational-wave observables. It is one branch of the observational closure stack summarized in [General Relativity](./general-relativity.md) and constrained by [Constraint Ledger](../validation/constraint-ledger.md).

Interface chapters:
- Effective metric map: [Emergent Metric](./emergent-metric.md)
- PPN closure and refractive weak field: [PPN Parameters](./ppn-parameters.md)
- Phenomenology summary: [General Relativity](./general-relativity.md)

## Weak-Field Setup

Assume an effective metric
$$
g_{\mu\nu}^{\text{eff}}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad
|h_{\mu\nu}|\ll1
$$
with background Noether sea state homogeneous and isotropic at leading order.

Define trace-reversed perturbation
$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h,\qquad
h=\eta^{\alpha\beta}h_{\alpha\beta}
$$
Here $h_{\mu\nu}$, $\bar h_{\mu\nu}$, and the trace $h$ are observer-sector perturbation variables of $g_{\mu\nu}^{\text{eff}}$. They are distinct from the native Euclidean spatial metric $h_{ij}=\delta_{ij}$ on $\Sigma_T$, which does not appear below.

Impose Lorenz gauge
$$
\partial^\mu \bar h_{\mu\nu}=0
$$

Assume constitutive closure supplies effective $(G_{\text{eff}},c_{\text{GW}}^{\mathrm{eff}})$ in this regime. The speed row is the gravitational-wave component of the structural-integrity common-limit closure in [Lorentz Kinematics](./lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure): the weak-field tensor channel must share the same Noether sea state record that supports photon timing, PPN, redshift, Shapiro delay, and lensing. In the multi-messenger branch, the explicit common-mode residual is
$$
R_{\mathrm{GW}\gamma}
\equiv
\frac{c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma}{c_\gamma},
\qquad
|R_{\mathrm{GW}\gamma}|\lesssim10^{-15}
$$
at the GW170817/GRB 170817A scale, after source-emission lag and propagation-path conventions are declared. A model that gives the effective gravitational channel and the photon channel independently tunable limiting speeds has failed this row before any black-hole or cosmological interpretation can use the gravitational-wave record.

The same row is also a $\chi_{\text{sea}}$ identity condition. The Noether sea delay factor that dresses photon-channel timing to $c_\gamma$ cannot split into a photon-only value and a tensor-only value; it must dress the effective gravitational channel to $c_{\mathrm{GW}}^{\mathrm{eff}}$ within the declared multimessenger tolerance. Otherwise the branch has preserved the language of one medium while using two transport laws.

Coherent photon/gravity conversion comparisons belong at this same shared-record level. They are useful only if the photon channel and the effective gravitational channel read from one Noether sea state, one speed/delay convention, and one event ledger. A proposed conversion amplitude, phase lock, or common propagation speed cannot be used as evidence for a new carrier unless it also preserves the GW170817-style timing row, photon nondispersion, image coherence, and the tensor-mode detector record.

## Linear Wave Equation

**Conditional Lemma 1 (linearized propagation equation).**
Under weak-field, slow-background variation, and linear constitutive response, the transverse-traceless sector obeys
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}
=
\frac{16\pi G_{\text{eff}}}{(c_{\text{GW}}^{\mathrm{eff}})^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\equiv
-\frac{1}{(c_{\text{GW}}^{\mathrm{eff}})^2}\partial_{t_{\mathrm{eff}}}^2
+\gamma_{\mathrm{eff}}^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}
$$

*Derivation sketch:* If the effective field equations induced by the metric constitutive map exist in this regime, linearize them around the homogeneous background, then project onto the TT sector.

**Corollary 1 (source-free effective waves).**
For $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}=0
$$
so plane waves satisfy
$$
\omega^2=(c_{\text{GW}}^{\mathrm{eff}})^2k^2
$$
to leading order (higher-order dispersive corrections are constitutive and model-dependent).

Finite-range comparison models may introduce gravitational-wave dispersion, but here that is only a deviation diagnostic. Define the group speed
$$
v_{\mathrm{g,GW}}\equiv\frac{\partial\omega}{\partial k}
$$
In validated frequency bands the constitutive map must satisfy
$$
\left|\frac{v_{\mathrm{g,GW}}-c_0}{c_0}\right|<\epsilon_{\mathrm{GW}},
\qquad
\left|\frac{\omega}{c_0^2}\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}}\leq\epsilon_{\mathrm{disp}}
$$
so $\epsilon_{\mathrm{disp}}$ is a dimensionless band tolerance. The integrated phase drift across the source distance must remain below the detector residual bound. A finite-range cosmological response is not acceptable if it leaks into already-tested gravitational-wave timing as measurable dispersion.

The same finite-range comparison must also supply a low-frequency forecast rather than leaving drift unconstrained below current ground-based event bands. For a declared pulsar-timing or space-interferometer band $\mathcal{B}_{\mathrm{low}}$, define the accumulated phase drift
$$
\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)
=
\int_{\Gamma}
\left[
k_{\theta}(f,x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
-
k_{\mathrm{GR}}(f,x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
\right]\,d\ell
$$
where $\Gamma$ is the observer-level propagation path used by the comparison. A useful low-frequency residual is
$$
\mathcal{R}_{\mathrm{GW,low}}(\theta)
=
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|\Delta\phi_{\mathrm{GW,low}}^{\theta}(f)\right|
}{\epsilon_{\phi}(f)}
+
\sup_{f\in\mathcal{B}_{\mathrm{low}}}
\frac{
\left|v_{\mathrm{g,GW}}^{\theta}(f)-c_0\right|
}{c_0\,\epsilon_{v}(f)}
$$
This is a forecast and comparison gate. It does not license a massive-graviton ontology; it only says that any cosmological-scale weakening channel must remain compatible with the low-frequency strain and timing residuals that would test long-wavelength dispersion.

## Medium-Transport Perturbation

For cosmology-facing transport work, gravitational waves should also be treated as bounded perturbations of the same Noether sea state used by redshift and dark-energy modules. In the provisional Noether braid equilibrium packet,

$$
\partial_T f_N
+\nabla_{\mathbf X}\cdot(\mathbf u_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

the term $S_{\mathrm{GW}}$ records the disturbance of the local Noether braid cadence distribution by the gravitational-wave channel. It is not an additional default polarization mode and not a license for frequency-dependent gravitational-wave propagation in validated bands. It is a possible low-amplitude contribution to the Noether sea state later sampled by photons, clocks, and growth observables.

The redshift-facing projection should therefore be bounded as a perturbation of the path-rate functional:

$$
\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}
=
\mathcal{A}_{X,\mathrm{GW}}\!\left[
S_{\mathrm{GW}},f_N,J_\nu;x_{\mathrm{eff}}^i,t_{\mathrm{eff}},\hat{\mathbf{k}}
\right]
$$

with the associated beam variance, chromaticity residual, and packet time-dilation residual below the same tolerances used for the redshift budget. If $S_{\mathrm{GW}}$ produces measurable photon dispersion, image blur, or gravitational-wave timing drift beyond the detector gates above, the perturbative transport branch fails.

## Polarization Content

In the project spin taxonomy, this is the effective **spin-2 / tensor** channel: the wave is not a scalar breathing mode or a single-axis vector mode, but a transverse-traceless deformation carrying quadrupolar shape data.

**Conditional Lemma 2 (two-mode TT closure in isotropic limit).**
If the low-energy constitutive response is parity-even and isotropic, residual gauge constraints leave exactly two propagating tensor modes:
$$
h_+(t_{\mathrm{eff}},x_{\mathrm{eff}}^i),\qquad h_\times(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
$$

*Derivation sketch:* Standard counting in Lorenz gauge plus TT projection gives 10 components $\to$ gauge/constraint reduction $\to$ two physical helicity-2 modes, provided the effective-metric gauge structure is recovered by the constitutive map.

Any scalar, vector, or longitudinal gravitational-wave response is therefore an effective deviation to be bounded, not a new default channel:
$$
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}<\epsilon_{\mathrm{pol}}
$$
The numerator collects non-TT detector power after known instrumental and astrophysical residuals are removed.

## Detector-Side Inference Gate

The detector does not observe the effective tensor mode as a bare ontological object. It records a processed strain channel whose interpretation depends on calibration, background rejection, waveform matching, and coincidence checks across instruments. For a candidate gravitational-wave record $\theta_{\mathrm{GW}}$, keep the residual vector explicit:

$$
\mathbf{R}_{\mathrm{GW}}(\theta_{\mathrm{GW}})
=
\left(
\frac{v_{\mathrm{g,GW}}-c_0}{c_0},\;
\left.\frac{\omega}{c_0^2}\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}},\;
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}},\;
\mathrm{FAR},\;
R_{\mathrm{cal}}
\right)
$$

where $\mathrm{FAR}$ is the false-alarm-rate estimate and $R_{\mathrm{cal}}$ is the retained calibration residual for the strain channel and timing model. Promotion from a candidate disturbance to an accepted gravitational-wave data product requires

$$
\max_i \frac{|R_{\mathrm{GW},i}|}{\epsilon_{\mathrm{GW},i}}\le 1
$$

with the tolerances fixed by the validation band. This gate protects the separation between the observable data product and the ontology: the data product is a calibrated, coincident, low-residual strain record, while the $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must still earn the claim that the record is the tensor-sector response of the effective metric induced by Noether sea constitutive dynamics.

Coincidence is part of the data product, not an afterthought. For a detector network with instruments $D_a$, calibrated strain streams $s_a(t_{\mathrm{eff}})$, response templates $h_a^\theta(t_{\mathrm{eff}})$, and allowed light-speed timing windows $\Delta t_{ab}^{\mathrm{geom}}$, define
$$
\mathcal{R}_{\mathrm{coin}}(\theta)
=
\sum_a
\left\|
s_a-\mathcal{P}_{D_a}h^\theta
\right\|_{C_a^{-1}}^2
+
\sum_{a<b}
\frac{
\left(
\Delta t_{ab}^{\mathrm{fit}}-\Delta t_{ab}^{\mathrm{geom}}
\right)^2
}{
\sigma_{ab}^2
}
$$
This residual is the modern version of the separated-detector check: a signal must be coherent across instruments after antenna response, timing, calibration, and background rejection are fixed. An isolated excess in one detector, or a coincidence that requires an implausible source energy after the same response projection, remains a candidate disturbance rather than an accepted gravitational-wave record.

Public GWOSC/LVK claims must also pass the packet protocol in [Simulation Run Protocols](../validation/simulations/run-protocols.md#public-gravitational-wave-benchmark-protocol) before they support strong-field or effective-metric claims. The public packet fixes event version, strain files, detector masks, parameter-estimation release, waveform family, calibration notes, analysis window, nuisance record, and artifact hashes before residual evaluation. This makes the detector-side gate replayable rather than a general statement that gravitational-wave observations are available.

**Closure Target 2A (graviton-comparison detectability residual).**
When a detector record is compared with a quantum-gravity language, keep the comparison at observer level. A calibrated classical strain event does not become a single-quantum detection merely because a graviton basis can be used for bookkeeping. For a narrowband comparison with angular frequency $\omega$ and strain amplitude $A_{\mathrm{GW}}$, retain the occupation lower bound
$$
N_{\mathrm{occ}}
\ge
\frac{
\rho_{\mathrm{GW}}
}{
\rho_1
},
\qquad
\rho_{\mathrm{GW}}
\sim
\frac{c_0^2}{32\pi G_{\mathrm{eff}}}\omega^2 A_{\mathrm{GW}}^2,
\qquad
\rho_1
\lesssim
\frac{\hbar\omega^4}{c_0^3}
$$
The accepted gravitational-wave record is therefore classical whenever $N_{\mathrm{occ}}\gg1$. A separate single-quantum claim would need a detector-side packet $\theta_{\mathrm{1g}}$ satisfying
$$
\mathcal{R}_{\mathrm{1g}}(\theta_{\mathrm{1g}})
=
\max\left(
\frac{|N_{\mathrm{occ}}-1|}{\epsilon_N},
\frac{\delta_{\mathrm{det}}}{\delta_{\mathrm{req}}},
\frac{2G_{\mathrm{eff}}M_{\mathrm{det}}}{c_0^2D_{\mathrm{det}}},
\frac{B_{\mathrm{th}}}{S_{\mathrm{1g}}^2}
\right)
\le
1
$$
with $\delta_{\mathrm{req}}\sim L_{\mathrm{P}}$ for a single-graviton interferometric distance readout, $\delta_{\mathrm{det}}$ the achieved distance uncertainty, $M_{\mathrm{det}}$ and $D_{\mathrm{det}}$ the detector mass and size, $S_{\mathrm{1g}}$ the predicted single-graviton count, $B_{\mathrm{th}}$ the relevant thermal or particle-background count, and $\epsilon_N$ the allowed occupation-window tolerance. The compactness term prevents a sensitivity claim from hiding a black-hole detector; the background term prevents a thermal-graviton claim from being promoted when statistical scatter in known backgrounds dominates the putative count. Failure of this residual does not refute gravitons as a comparison basis and does not add graviton ontology to $\mathbb{A}\mathbb{A}\mathbb{A}$; it only blocks the stronger detector claim that an observed strain or thermal count has directly resolved individual quanta.

The detector-side packet should also declare which single-quantum route is being claimed. A direct interferometric route must satisfy the Planck-scale distance row without violating the compactness bound. An absorption or scattering route must show that the interaction cross-section and exposure yield a count above neutrino, thermal, and apparatus-background channels. A photon/gravity conversion route must show that the magnetic-field and coherence conditions needed for conversion do not themselves destroy the shared photon-channel and tensor-channel record through pair production, vacuum polarization, or phase decoherence. These are not separate ontologies; they are route-specific projections of the same single-quantum residual.

A resonant-mass or phonon-style coincidence therefore needs one more separation before it becomes evidence for quantized gravity itself. A cooled bar may register a single vibrational excitation coincident with a calibrated gravitational-wave event, and an optical Weber-bar comparison may convert time-dependent gravitational-wave modulation into a photon phase or energy shift. Those are detector-side quantum transitions unless the packet also reports whether the incoming gravitational state is classical, coherent with huge occupation number, or deliberately prepared in a nonclassical state. A classical gravitational wave can still raise the transition probability of a quantized detector, just as a classical electromagnetic field can drive transitions in quantized matter. The stronger claim is not a detector click, but a detector click plus source-state evidence that rules out the corresponding classical driving account.

This is the Dyson lesson in current terminology. The durable comparison is not that individual gravitons are impossible by definition, but that any single-quantum claim must close the detector sensitivity, compactness, background, and occupation rows at the same time. A classical strain packet with huge occupation number remains a gravitational-wave recovery success without becoming a single-graviton observation.

When $\theta_{\mathrm{GW}}$ is also used to support a finite-range or dark-energy comparison, $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ must be carried beside this detector residual. Passing a high-frequency event-timing gate alone is not enough to promote a long-wavelength dispersion claim.

## Merger and Ringdown Horizon-Interface Gate

Stationary no-hair agreement is not enough to close the dynamical strong-field problem. If a black-hole model changes the horizon-interface boundary condition during formation, merger, or evaporation, the change must be tested against the detector-facing waveform packet and the same final compact-object labels used by exterior GR.

For a candidate horizon-interface record $\theta_H$, let $h_{\ell m}^{\theta_H}(t_{\mathrm{eff}})$ be the effective strain modes predicted after projection through the detector response, and let $D_{\mathrm{merge}}^{\mathrm{obs}}$ collect the observed inspiral, merger, ringdown, calibration, and covariance packet. This observed packet must be sourced from the same versioned GWOSC/LVK event row and artifact hashes used by $\mathcal{C}_{\mathrm{GW}}$ when ringdown is used as strong-field evidence. A compact residual is
$$
\mathcal{R}_{\mathrm{merge}}(\theta_H)
=
\left\|
D_{\mathrm{merge}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{det}}\{h_{\ell m}^{\theta_H}\}
\right\|_{C_{\mathrm{merge}}^{-1}}^2
+
d_{\mathrm{nohair}}\!\left(
(M_f,\mathbf{J}_f,Q_f)^{\theta_H},
(M_f,\mathbf{J}_f,Q_f)^{\mathrm{obs}}
\right)
+
d_{\mathrm{shared}}(\theta_H,\theta_{\mathrm{GW}},\theta_{\mathrm{BH}})
$$
Here $Q_f$ is the final exterior charge/no-hair label in the Kerr-Newman comparison, not a quadrupole-deviation tensor. The projection $\mathcal{P}_{\mathrm{det}}$ is the detector projection, and $d_{\mathrm{shared}}$ penalizes any fit that uses one state record for the strain channel, another for the horizon-interface label, and another for the black-hole entropy or release ledger. The gate is satisfied only if $\mathcal{R}_{\mathrm{merge}}(\theta_H)$ is below the declared tolerance while preserving the validated inspiral limit, the two tensor polarizations, and the final exterior no-hair coarse-graining. A predicted deviation is admissible only as a bounded residual or a falsifiable template, not as permission to loosen already-tested gravitational-wave recovery.

The GWTC-5.0 release and GW250114 sharpen the event-packet version of this gate. The catalog count, population reconstruction, standard-siren distance inference, high signal-to-noise ringdown, Kerr-mode and overtone tests, Hawking-area comparison, recoil extraction from higher modes, and any proposed near-horizon "direct wave" signature are not independent facts that can be fit from separate records. In $\mathbb{A}\mathbb{A}\mathbb{A}$ they define one strong-field recovery target: source quadrupole, calibrated detector strain, remnant mass and spin, ringdown labels, horizon-interface entropy bookkeeping, recoil or higher-mode rows, and any distance-redshift row must remain bound to one source-event ledger and one Noether sea/effective-metric record.

## Early-Universe Stochastic Background Gate

A stochastic gravitational-wave background is a data product before it is an ontology claim. If an early-universe or pre-BBN comparison branch predicts a background, retain the detector-facing spectrum and its cosmology linkage, not the branch interpretation that generated it. For a candidate branch $X$, define
$$
\mathcal{R}_{\mathrm{GW,early}}(\theta_X)
=
\sup_{f\in\mathcal{B}_{\mathrm{det}}}
\frac{\Omega_{\mathrm{GW}}^X(f)}
{\Omega_{\mathrm{GW}}^{\max}(f)}
+
d_{\mathrm{shared}}\!\left(\theta_{\mathrm{GW}},\theta_{\mathrm{BBN}},\theta_{\mathrm{CMB}},\theta_{\mathrm{growth}}\right)
$$
where $\mathcal{B}_{\mathrm{det}}$ is the validated detector band and $d_{\mathrm{shared}}$ penalizes any branch that requires a gravitational-wave source record inconsistent with the BBN, CMB, or structure-formation records. A positive stochastic signal would become observational pressure on the early medium history; a null result closes only the corresponding branch amplitude, not the whole cosmology program.

## Energy Flux

The source-side benchmark is also part of closure. In the GR weak-field comparison, isolated systems do not radiate monopole or dipole gravitational waves at leading order because total energy, momentum, and angular momentum conservation remove those channels. The first radiative source is quadrupolar. A compact observer-level target is
$$
P_{\mathrm{GW}}
=
\frac{G_{\text{eff}}}{5c_{\text{GW}}^5}
\left\langle
\dddot Q_{ij}\dddot Q^{ij}
\right\rangle
$$
with $Q_{ij}$ the trace-free mass quadrupole of the effective source record in the validated weak-field limit. A native Noether sea wave model must therefore explain why scalar monopole leakage, vector dipole leakage, and non-TT power remain below detector bounds rather than adding them as free source channels.

Binary-pulsar orbital decay is the generation-side benchmark for this row. The same source ledger must use the recovered $G_{\mathrm{eff}}$, $c_{\mathrm{GW}}$, and quadrupole moment to predict the observed secular period change after independently modeled kinematic and environmental corrections. Define
$$
\mathcal R_{\dot P_b}
\equiv
\frac{
\dot P_b^{\mathrm{obs}}
-\dot P_b^{\mathrm{quad}}(\theta_{\mathrm{src}})
}{
\sigma_{\dot P_b}
},
\qquad
\mathcal R_{\mathrm{dip}}
\equiv
\frac{P_{\mathrm{dip}}(\theta_{\mathrm{src}})}
{P_{\mathrm{quad}}(\theta_{\mathrm{src}})+\varepsilon}.
$$
The weak-field source branch must fit the orbital-decay row while keeping $\mathcal R_{\mathrm{dip}}$ below the binary-system bound. Composition-dependent Noether sea coupling that produces a leading dipole channel is therefore linked directly to the strong-equivalence-principle burden; it cannot be hidden in the detector-side tensor projection.

**Closure Target 3 (leading-order GW flux).**
In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{32\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle
$$
This is the quantity used for binary-orbit energy-loss consistency checks. Energy localization for gravitational waves is an observer-level effective description: the packet may use cycle-averaged fluxes and asymptotic energy loss, but it should not promote a gauge-dependent local gravitational energy density into substrate ontology.
