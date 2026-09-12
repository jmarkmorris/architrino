# Gravitational Waves

Gravitational-wave observations measure time-dependent strain: changes in the relative distances or signal travel times inferred by calibrated detectors. In $\mathbb{A}\mathbb{A}\mathbb{A}$ their proposed physical carrier is a collective disturbance of the [Noether sea](noether-sea.md), the population of coupled neutral assemblies inside the fixed Euclidean void. This chapter states the conditional recovery targets connecting that disturbance to an effective metric and detector records. It derives no Noether sea tensor-wave dynamics or detection from the substrate law. The wider observational targets are summarized in [General Relativity](./general-relativity.md) and [Constraint Ledger](../validation/constraint-ledger.md).

The substrate starting point is delayed interaction among [architrinos](../foundations/architrino.md), point transceivers whose polarity and path histories determine their emitted wakes. A wake is an expanding causal record centered on a transmitter's past emission site. At reception time $T_r$, its emission time $T_t<T_r$ obeys $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$. The [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form) sums every admitted root to determine receiver acceleration. On simple roots its transmitter-side weight is $c_f/|D_t|$, with $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t$; $\hat{\mathbf r}_t$ points from emission to reception. Receiver motion changes root playback and later history, not this arriving multiplier. Singular roots require the Master Equation's separate continuation treatment.

An arriving wake changes a receiver's subsequent path and therefore its later emissions; it does not redirect an already emitted wake or turn the void into a medium. Collective source, sea, and detector response must be obtained from those constituent histories. The observer chart $(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)=\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record})$ is the conditional map defined in [Emergent Metric](emergent-metric.md), with $\mathcal N_{\mathrm{sea}}$ retaining the relevant medium state and history. It cannot be replaced by identifying effective coordinates with absolute time and Euclidean position. In particular, neither an effective propagation speed nor the measured light speed $c_0$ is automatically the primitive wake speed $c_f$.

Three interface chapters supply the metric map, weak-field parameter bounds, and broader phenomenology used here:

- Effective metric map: [Emergent Metric](./emergent-metric.md)
- PPN closure and refractive weak field: [PPN Parameters](./ppn-parameters.md)
- Phenomenology summary: [General Relativity](./general-relativity.md)

## Weak-Field Setup

At the observer level, write the effective metric as a flat comparison metric plus a small perturbation:
$$
g_{\mu\nu}^{\text{eff}}=\eta_{\mu\nu}+h_{\mu\nu},
\qquad
|h_{\mu\nu}|\ll1
$$

[View →](../../../../equation-mapping.html#corpus-equation-b9ed8fe3f6ed8143)

Here $\eta_{\mu\nu}=\operatorname{diag}(-1,1,1,1)$ is the flat Minkowski comparison metric in coordinates $x_{\mathrm{eff}}^0=c_0t_{\mathrm{eff}}$ and Cartesian $x_{\mathrm{eff}}^i$; $\mu,\nu\in\{0,1,2,3\}$ and $i,j\in\{1,2,3\}$. The dimensionless $h_{\mu\nu}$ is the small observer-level departure reconstructed from the Noether sea. Neither is a metric of the Euclidean substrate. The comparison assumes a homogeneous, isotropic background sea with no effective drift in this local chart. Raising indices and $\partial^\mu=\eta^{\mu\nu}\partial/\partial x_{\mathrm{eff}}^\nu$ use this comparison metric.

Define trace-reversed perturbation
$$
\bar h_{\mu\nu}=h_{\mu\nu}-\frac12\eta_{\mu\nu}h,\qquad
h=\eta^{\alpha\beta}h_{\alpha\beta}
$$

[View →](../../../../equation-mapping.html#corpus-equation-60e4e1d7e2fb4dd3)

Here $h_{\mu\nu}$, $\bar h_{\mu\nu}$, and the trace $h$ are observer-sector perturbation variables of $g_{\mu\nu}^{\text{eff}}$. They are distinct from the native Euclidean spatial metric $h_{ij}=\delta_{ij}$ on $\Sigma_T$, which does not appear below.

Conditional on recovery of the linearized metric gauge symmetry, choose the Lorenz gauge, the coordinate condition that removes redundant descriptions of the same observer geometry,
$$
\partial^\mu \bar h_{\mu\nu}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ff85e1e1470a4a3)

Assume constitutive closure supplies effective $(G_{\text{eff}},c_{\text{GW}}^{\mathrm{eff}})$ in this regime. The speed row is the gravitational-wave component of the structural-integrity common-limit closure in [Lorentz Kinematics](./lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure): the weak-field tensor channel must share the same Noether sea state record that supports photon timing, PPN, redshift, Shapiro delay, and lensing. In the multi-messenger branch, the explicit common-mode residual is
$$
R_{\mathrm{GW}\gamma}
\equiv
\frac{c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma}{c_\gamma},
\qquad
|R_{\mathrm{GW}\gamma}|\lesssim10^{-15}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a47965dc1f32587c)

at the GW170817/GRB 170817A order-of-magnitude scale, after source-emission lag and propagation-path conventions are declared. The published comparison gives $-3\times10^{-15}\le R_{\mathrm{GW}\gamma}\le7\times10^{-16}$ under its distance and emission-lag assumptions; the symmetric scale above is not that interval. Here $c_\gamma$ is the photon-channel speed in the same calibrated propagation convention. A prediction outside the applicable interval fails this timing test. Independently fitting the two speeds can satisfy the interval but does not derive their common response.

The common-delay branch additionally seeks one Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\mathrm{eff}}$ for these channels after a shared spatial and temporal calibration. This is a constitutive recovery target, not a consequence of occupying one medium: one medium can support different response modes. A successful branch derives both channel responses from the same $\mathcal N_{\mathrm{sea}}$ and bounds their difference in the tested regime; the timing observation alone proves neither an exact delay-factor identity nor equality to $c_f$.

Coherent photon/gravity conversion comparisons belong at this same shared-record level. They are useful only if the photon channel and the effective gravitational channel read from one Noether sea state, one speed/delay convention, and one event ledger. A proposed conversion amplitude, phase lock, or common propagation speed cannot be used as evidence for a new carrier unless it also preserves the GW170817-style timing row, photon nondispersion, image coherence, and the tensor-mode detector record.

## Linear Wave Equation

**Closure Target 1 (linearized propagation equation).** Assume the homogeneous isotropic background is an equilibrium of the same constitutive dynamics, an open prerequisite. In a weak-field region with coefficients constant to leading order over the wavelength and period, the transverse-traceless (TT) sector must recover the following GR comparison equation. Transverse means that the spatial perturbation has no component along the propagation direction; traceless means that its spatial diagonal sum vanishes.
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}
=
-\frac{16\pi G_{\text{eff}}}{(c_{\text{GW}}^{\mathrm{eff}})^4}\,T_{\mu\nu}^{\text{TT}},
\qquad
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\equiv
-\frac{1}{(c_{\text{GW}}^{\mathrm{eff}})^2}\partial_{t_{\mathrm{eff}}}^2
+\delta^{ij}\partial_{x_{\mathrm{eff}}^i}\partial_{x_{\mathrm{eff}}^j}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f095d65d0b76523e)

Here $T_{\mu\nu}$ is the effective source stress-energy tensor, and TT denotes its spatial radiative projection, with time components set to zero in this representation. The minus sign follows from the stated signature and $\Box=-c_0^{-2}\partial_{t_{\mathrm{eff}}}^2+\nabla^2$: the linearized Einstein tensor is $-\Box\bar h_{\mu\nu}/2$. Exact GR normalization requires $c_{\mathrm{GW}}^{\mathrm{eff}}=c_0$ at this order; a residual speed difference is a constitutive deviation model. The spatial coefficient is the frozen background value $\delta^{ij}$, not a variable metric inserted into a flat partial-derivative operator. Background gradients, lapse, and drift require a consistent variable-coefficient expansion.

This is an observer-level recovery target. A native derivation must obtain the tensor kinetic normalization, signed source coupling, and constraints from one constitutive record. It must also select the causal solution from earlier source and boundary history; the wave equation alone permits both incoming and outgoing solutions. Linearizing an assumed effective field equation checks its consequences but derives none of these ingredients from Noether sea dynamics.

**Conditional Corollary 1 (source-free effective waves).** If Closure Target 1 holds on the constant-coefficient patch and $T_{\mu\nu}^{\text{TT}}=0$:
$$
\Box_{c_{\text{GW}}^{\mathrm{eff}}}\bar h_{\mu\nu}^{\text{TT}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-a11345c5d2a49b99)

so plane waves satisfy
$$
\omega^2=(c_{\text{GW}}^{\mathrm{eff}})^2k^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-1cec7192fcc802c0)

Here $\omega>0$ is angular frequency per unit $t_{\mathrm{eff}}$ and $k>0$ is the spatial wave-number magnitude in this local Cartesian chart. Substitution of a phase $kx_{\mathrm{eff}}^3-\omega t_{\mathrm{eff}}$ gives the displayed dispersion relation. Higher-order dispersive corrections are constitutive and model-dependent.

Finite-range comparison models may introduce gravitational-wave dispersion, but here that is only a deviation diagnostic. On a differentiable, weakly attenuated branch define the wave-packet group speed
$$
v_{\mathrm{g,GW}}\equiv\frac{\partial\omega}{\partial k}
$$

[View →](../../../../equation-mapping.html#corpus-equation-97498bc03ef91bbc)

In validated frequency bands the constitutive map must satisfy
$$
\left|\frac{v_{\mathrm{g,GW}}-c_0}{c_0}\right|<\epsilon_{\mathrm{GW}},
\qquad
\left|\frac{\omega}{c_0^2}\frac{\partial^2\omega}{\partial k^2}\right|_{\mathrm{band}}\leq\epsilon_{\mathrm{disp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a5ceef2cd831fb52)

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

[View →](../../../../equation-mapping.html#corpus-equation-b8be6f7e350de9ec)

Here $\theta$ labels the candidate constitutive model, $f$ labels the received ordinary frequency, $\Gamma$ is the common observer-level ray, and $d\ell$ is its calibrated spatial length element. The wave numbers include the local frequency evolution along that ray, including redshift; they are not evaluated at a constant local frequency on an evolving background. The integral is a geometric-optics phase comparison on a shared path. If ray geometry or arrival-time evolution differs at the retained order, compare the full propagated phases instead. A useful low-frequency residual is
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

[View →](../../../../equation-mapping.html#corpus-equation-552eef65801a0562)

The positive functions $\epsilon_\phi(f)$ and $\epsilon_v(f)$ are declared phase and fractional-speed tolerances on $\mathcal B_{\mathrm{low}}$. Requiring this sum to be at most one is a conservative joint budget, stricter than requiring each term separately to be at most one. In a forecast those tolerances describe projected sensitivity, not measured exclusion. This comparison does not license a massive-graviton ontology; any cosmological-scale weakening channel must remain compatible with the strain and timing observations in its tested domain.

## Medium-Transport Perturbation

For cosmological transport, a candidate gravitational disturbance perturbs the same Noether sea state sampled by photons and clocks. A provisional scalar population balance, expressed in absolute time $T$ and Euclidean position $\mathbf X$, is

$$
\partial_T f_N
+\nabla_{\mathbf X}\cdot(\mathbf u_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

[View →](../../../../equation-mapping.html#corpus-equation-1441995045972f54)

Here $f_N(\nu,\mathbf X,T)\ge0$ counts ambient braids per spatial volume per unit ordinary cadence $\nu>0$, so $\int_0^\infty f_N\,d\nu=\rho_{\mathrm{NS}}$. The velocity $\mathbf u_{\mathrm{sea}}$ transports that population spatially, $J_\nu$ is its current through cadence space, $S_{\mathrm{BH}}$ is a compact-object population contribution, $S_{\mathrm{GW}}$ is the signed disturbance contribution, and $R_{\mathrm{eq}}$ is a proposed relaxation term. All terms have units of $f_N$ per absolute time. Cadence redistribution alone preserves the integrated braid count: for zero endpoint current, its net source integral must vanish; any nonzero integral requires a declared population transfer. The same redistribution must not be counted in both $J_\nu$ and a source term.

This balance is a hypothesis, not an equilibrium proof or a tensor-wave equation. Scalar cadence density alone does not retain shear orientation or the two tensor amplitudes. The full $\mathcal N_{\mathrm{sea}}$ must retain those variables and their histories; deriving their coupled response remains open. No extra gravitational polarization follows from adding $S_{\mathrm{GW}}$ to this scalar projection.

For a declared photon or spectral channel $X$, let $\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}$ be the disturbance-induced change in its logarithmic frequency-shift rate per calibrated path length. Its proposed response functional is

$$
\delta\alpha_{\mathrm{prop},X}^{\mathrm{GW}}
=
\mathcal{A}_{X,\mathrm{GW}}\!\left[
S_{\mathrm{GW}},f_N,J_\nu;x_{\mathrm{eff}}^i,t_{\mathrm{eff}},\hat{\mathbf{k}}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-9742273c07570907)

The functional $\mathcal A_{X,\mathrm{GW}}$ is conditional on the retained tensor, orientation, and boundary histories and the chart map $\chi_{\mathrm{eff}}$; the displayed scalar inputs do not establish that they determine the response alone. The unit direction $\hat{\mathbf k}$ specifies the photon ray. Beam variance, chromaticity, and packet-duration residuals must meet the same declared redshift tolerances. Excess photon dispersion, image blur, or gravitational-wave timing drift rejects this particular perturbative transport branch.

## Polarization Content

The GR recovery target is the effective **spin-2 / tensor** channel: a transverse-traceless distortion whose two amplitudes mix through twice the angle when the transverse coordinate axes are rotated about the propagation axis. A scalar breathing response expands and contracts both transverse directions together; it is a distinct possible deviation, not part of the TT definition.

**Closure Target 2 (two-mode radiative response).** Recover the massless metric gauge symmetry, its dynamical constraints, and a nondegenerate propagating tensor sector on the equilibrium background, while excluding or bounding additional radiative degrees of freedom. Under these stronger premises, the source-free TT sector has two amplitudes:
$$
h_+(t_{\mathrm{eff}},x_{\mathrm{eff}}^i),\qquad h_\times(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
$$

[View →](../../../../equation-mapping.html#corpus-equation-48b9c603afb9b52a)

The geometric count is explicit for propagation along $x_{\mathrm{eff}}^3$: transversality leaves a symmetric $2\times2$ block, and zero trace gives $h_{11}^{\mathrm{TT}}=-h_{22}^{\mathrm{TT}}=h_+$ and $h_{12}^{\mathrm{TT}}=h_{21}^{\mathrm{TT}}=h_\times$. Those are two independent entries. This count does not prove that a Noether sea perturbation obeys those constraints or that other propagating sectors are absent. Parity-even isotropy alone permits an additional scalar wave; projecting it out of a displayed tensor does not remove its physical detector response.

Any scalar, vector, or longitudinal gravitational-wave response is therefore an effective deviation to be bounded, not a new default channel:
$$
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}<\epsilon_{\mathrm{pol}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-db5522b8794b4a6c)

The numerator collects inferred non-TT detector power under a declared noise and astrophysical model. Both powers use the same band, response, and normalization, and this ratio requires $\mathcal P_{\mathrm{TT}}>0$. A tensor-null channel needs an absolute extra-mode limit. Any inferred extra response above the applicable bound falsifies two-mode recovery in that band.

The tolerance $\epsilon_{\mathrm{pol}}$ must be attached to a declared detector analysis rather than inferred from the two-mode count. For example, the three-detector GW170814 pure-polarization comparison favored the pure-tensor hypothesis over pure-vector and pure-scalar alternatives by Bayes factors of order $2\times10^2$ and $10^3$, respectively. Those model-selection factors constrain the pure alternatives; they are not by themselves a bound on a small non-TT admixture. A mixed-mode power limit requires the corresponding tensor-plus-extra-mode likelihood and detector network response.

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

[View →](../../../../equation-mapping.html#corpus-equation-07a2aa1645b2e4cb)

Here $\mathrm{FAR}$ is the search's false-alarm-rate estimate and $R_{\mathrm{cal}}$ is its retained calibration residual. The vector combines detection-quality quantities with theory-comparison quantities; it is not a universal event-detection rule. For a specified recovery claim, declare the required indices $i$ and their positive tolerances $\epsilon_{\mathrm{GW},i}$ in matching units, then require

$$
\max_i \frac{|R_{\mathrm{GW},i}|}{\epsilon_{\mathrm{GW},i}}\le 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-c2bf29599c3b8790)

with the statistical coverage and validation band fixed before evaluation. An unmeasured speed or polarization component is unavailable evidence, not a zero residual; it leaves any claim requiring that component open. Event acceptance follows the declared detector search, calibration, and background analysis. Identifying that accepted event with a derived Noether sea response is a separate theoretical claim.

For a multi-detector event, let $D_a$ label each instrument and $s_a(t_{\mathrm{eff}})$ its calibrated strain. Let $h^\theta$ contain the predicted incoming polarizations before detector response, so $h_a^\theta=\mathcal P_{D_a}h^\theta$ is the response template. For a declared source direction, $\Delta t_{ab}^{\mathrm{geom}}$ is the predicted signed arrival-time difference, not a timing-window width; $\Delta t_{ab}^{\mathrm{fit}}$ is its fitted value and $\sigma_{ab}>0$ its uncertainty. Define the diagnostic
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

[View →](../../../../equation-mapping.html#corpus-equation-8111838f90ffa02e)

Here $\|r\|_{C_a^{-1}}^2=r^\mathsf{T}C_a^{-1}r$ weights sampled strain residuals by a positive-definite noise covariance on the retained data space. The timing term is generally correlated with the strain fit, so this sum is not automatically a chi-squared statistic or a likelihood. Its threshold needs calibration with the joint noise model, or a conditional construction that avoids counting timing information twice. A multi-detector claim requires coherent responses and allowed arrival delays. Single-observatory detections require their own search evidence; GW190425 is a published example, so missing coincidence alone cannot invalidate every accepted event.

Public GWOSC/LVK claims must also pass the packet protocol in [Simulation Run Protocols](../validation/simulations/run-protocols.md#public-gravitational-wave-benchmark-protocol) before they support strong-field or effective-metric claims. The public packet fixes event version, strain files, detector masks, parameter-estimation release, waveform family, calibration notes, analysis window, nuisance record, and artifact hashes before residual evaluation. This makes the detector-side gate replayable rather than a general statement that gravitational-wave observations are available.

**Closure Target 2A (graviton-comparison detectability residual).** A graviton is the energy quantum assigned to a gravitational mode in the standard quantum comparison. That description is not substrate ontology. For a narrowband strain with angular frequency $\omega$ and amplitude $A_{\mathrm{GW}}$, define a packet volume $V_{\mathrm{mode}}>0$ and compare its effective energy with one quantum $\hbar\omega$, where $\hbar$ is the reduced Planck constant:
$$
N_{\mathrm{occ}}
\simeq
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
=
\frac{\hbar\omega}{V_{\mathrm{mode}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6450dc70a1b9634e)

Here $\rho_{\mathrm{GW}}$ is cycle-averaged effective energy density, $\rho_1$ is one quantum's energy per declared volume, and $N_{\mathrm{occ}}$ is the corresponding occupation estimate. The density estimate assumes a specified polarization and amplitude convention; it does not measure the incoming quantum state. The often-used scaling $\rho_1\sim\hbar\omega^4/c_0^3$ requires $V_{\mathrm{mode}}\sim(c_0/\omega)^3$. A large occupation is consistent with a classical strain approximation but does not prove classicality: highly occupied number or squeezed states need not be classical.

For the restricted design that claims a prepared, approximately one-quantum packet and an interferometric distance readout, the following is a provisional sensitivity screen on a declared detector record $\theta_{\mathrm{1g}}$:
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

[View →](../../../../equation-mapping.html#corpus-equation-8333391f05bfbc94)

Here $\epsilon_N>0$ is the preparation's occupation tolerance, $\delta_{\mathrm{det}}$ is achieved distance uncertainty, and $\delta_{\mathrm{req}}>0$ is the displacement predicted by the specified mode and detector transfer function. The estimate $\delta_{\mathrm{req}}\sim L_{\mathrm P}$, with $L_{\mathrm P}=\sqrt{\hbar G_{\mathrm{eff}}/c_0^3}$, belongs to the wavelength-scale volume and comparable readout-length estimate; it is not a universal requirement for every detection route. The mass $M_{\mathrm{det}}$ and enclosing radius $D_{\mathrm{det}}$ are effective detector properties. A non-black-hole detector in the spherical compactness comparison additionally requires the compactness ratio to be strictly less than one.

The expected signal count $S_{\mathrm{1g}}>0$ and background count $B_{\mathrm{th}}\ge0$ refer to one declared exposure. The ratio $B_{\mathrm{th}}/S_{\mathrm{1g}}^2$ only compares signal size with Poisson background variance. Passing this order-of-magnitude screen is not detection confidence: $B_{\mathrm{th}}=S_{\mathrm{1g}}=1$ passes, yet for a Poisson background of mean one, the probability of at least two counts is $1-2/e$. A detection claim still needs a calibrated likelihood, false-positive threshold, efficiencies, and competing explanations. This count example uses normalized wake-speed units $c_f=1$; its probability calculation does not depend on a propagation speed.

Other detection routes require their own response calculation. An absorption or scattering experiment can resolve individual detector transitions even in a highly occupied incident mode; it does not inherit $|N_{\mathrm{occ}}-1|/\epsilon_N$ or the interferometric distance row. Its cross-section, exposure, efficiency, and backgrounds control its count likelihood. A photon/gravity conversion comparison must also bound pair production, vacuum polarization, and phase decoherence in its stated magnetic-field and coherence regime. These standard effective mechanisms are comparison assumptions, not premises of the architrino acceleration law.

A resonant-mass or phonon-style coincidence therefore needs one more separation before it becomes evidence for quantized gravity itself. A cooled bar may register a single vibrational excitation coincident with a calibrated gravitational-wave event, and an optical Weber-bar comparison may convert time-dependent gravitational-wave modulation into a photon phase or energy shift. Those are detector-side quantum transitions unless the packet also reports whether the incoming gravitational state is classical, coherent with huge occupation number, or deliberately prepared in a nonclassical state. A classical gravitational wave can still raise the transition probability of a quantized detector, just as a classical electromagnetic field can drive transitions in quantized matter. The stronger claim is not a detector click, but a detector click plus source-state evidence that rules out the corresponding classical driving account.

Dyson's interferometric sensitivity argument therefore supplies a restricted comparison, not a universal impossibility theorem. Evidence for field quantization requires statistics or another observable that rules out classical driving after the detector's quantum response is modeled. Agreement with a classical strain event remains an effective recovery target; a detector transition alone establishes neither incoming field quantization nor a Noether sea derivation.

When $\theta_{\mathrm{GW}}$ is also used to support a finite-range or dark-energy comparison, $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ must be carried beside this detector residual. Passing a high-frequency event-timing gate alone is not enough to promote a long-wavelength dispersion claim.

## Merger and Ringdown Horizon-Interface Gate

Stationary no-hair agreement is not enough to close the dynamical strong-field problem. If a black-hole model changes the horizon-interface boundary condition during formation, merger, or evaporation, the change must be tested against the detector-facing waveform packet and the same final compact-object labels used by exterior GR.

For a candidate horizon-interface record $\theta_H$, let $h_{\ell m}^{\theta_H}(t_{\mathrm{eff}})$ be predicted incoming strain modes before detector projection; $\ell,m$ label their angular harmonic components. Let $D_{\mathrm{merge}}^{\mathrm{obs}}$ contain the retained strain samples through inspiral, merger, and ringdown, with calibration and covariance supplied separately as conditions of the comparison. Use the same versioned public event record throughout. A compact diagnostic is
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

[View →](../../../../equation-mapping.html#corpus-equation-fd58b35783fa5107)

Here $M_f$, $\mathbf J_f$, and $Q_f$ are the final exterior mass, angular momentum, and charge labels of the Kerr-Newman comparison; $Q_f$ is not a quadrupole-deviation tensor. The projection $\mathcal P_{\mathrm{det}}$ applies detector response once, and $C_{\mathrm{merge}}$ weights strain residuals on the retained data space. The nonnegative dimensionless distances $d_{\mathrm{nohair}}$ and $d_{\mathrm{shared}}$ respectively compare supported final-object labels and consistency among the horizon, gravitational-wave, and black-hole records. Their scales and correlations must be declared; an unconstrained charge label cannot be treated as measured. Because remnant labels can be inferred from the same strain samples, the sum is a diagnostic budget, not automatically a likelihood. A calibrated excess rejects the specified model and comparison, not all possible horizon-interface dynamics.

The GWTC-5.0 release supplies event, population, and cosmological comparison products; GW250114 supplies a particularly precise ringdown comparison with Kerr-mode and horizon-area predictions. Within each event, waveform, remnant, recoil, and any distance inference must remain consistent with the same source and detector record. Population and cosmological results additionally combine many event records and require sample selection, redshift information, and shared population parameters; they cannot all be assigned to one source event. A proposed near-horizon "direct wave" interpretation remains a model-dependent hypothesis requiring separate discrimination from ordinary merger and ringdown structure.

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

[View →](../../../../equation-mapping.html#corpus-equation-2795400919ed5893)

Here $\Omega_{\mathrm{GW}}(f)$ is effective gravitational-wave energy density per logarithmic frequency divided by the declared cosmological reference energy density. The positive $\Omega_{\mathrm{GW}}^{\max}(f)$ is a bound with a specified spectral model and confidence level in the detector band $\mathcal B_{\mathrm{det}}$; it is not a universal pointwise limit on arbitrary spectra. The nonnegative dimensionless $d_{\mathrm{shared}}$ measures incompatibility with records for primordial light-element formation (BBN), the cosmic microwave background (CMB), and structure growth. A threshold of one is a conservative joint budget only after all its normalizations are declared. A significant stochastic signal constrains early history only after foreground separation. A null result excludes amplitudes above the applicable bound; it does not close the branch or determine its amplitude exactly.

## Energy Flux

The source-side benchmark is also part of recovery. In the isolated, slowly moving GR source comparison, conserved total mass-energy gives no time-varying leading mass monopole, the mass dipole's first derivative is conserved momentum, and the leading current dipole is conserved angular momentum. The first radiative source is therefore quadrupolar. For this leading-order benchmark, write $c_{\mathrm{GW}}\equiv c_{\mathrm{GW}}^{\mathrm{eff}}=c_0$ and let overdots denote derivatives with respect to the local source-frame $t_{\mathrm{eff}}$. The radiated power target is
$$
P_{\mathrm{GW}}
=
\frac{G_{\text{eff}}}{5c_{\text{GW}}^5}
\left\langle
\frac{d^3Q_{ij}}{dt_{\mathrm{eff}}^3}\frac{d^3Q^{ij}}{dt_{\mathrm{eff}}^3}
\right\rangle
$$

[View →](../../../../equation-mapping.html#corpus-equation-7152e6632c7b77e4)

Here $Q_{ij}=\int\rho_{\mathrm{src}}(x_{\mathrm{eff}}^ix_{\mathrm{eff}}^j-\delta_{ij}|\mathbf x_{\mathrm{eff}}|^2/3)\,d^3x_{\mathrm{eff}}$ is the trace-free mass quadrupole in source-centered Cartesian coordinates, $\rho_{\mathrm{src}}$ is effective source mass density, and angle brackets denote a cycle average. This formula assumes source size small compared with the radiation wavelength; cosmological redshift and detector projection are subsequent operations. A Noether sea derivation must supply the source mass map and radiation-energy current rather than assign mass to architrinos. The inverse-square per-hit acceleration law alone establishes neither a far-zone energy flux nor the absence of extra radiative channels.

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
{P_{\mathrm{quad}}(\theta_{\mathrm{src}})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b6f57e2ac8c61513)

Here $P_b$ is the measured binary orbital period, $\dot P_b^{\mathrm{obs}}$ is its derivative after the stated kinematic and environmental corrections, $\theta_{\mathrm{src}}$ is the source model, and $\sigma_{\dot P_b}>0$ includes measurement and correction uncertainty. The predicted dipole and quadrupole powers use one normalization, and their ratio is defined only for $P_{\mathrm{quad}}>0$; a zero-quadrupole case needs an absolute dipole-power bound. No adjustable denominator floor may hide dipole emission. The source model must derive the relation between emitted power and orbital-period change using its energy balance. Composition-dependent coupling that exceeds the binary-system bound fails that source model's strong-equivalence-principle recovery, even if a detector tensor projection suppresses its display.

**Closure Target 3 (leading-order GW flux).** In the same regime, the cycle-averaged flux is
$$
\mathcal{F}_{\text{GW}}
=
\frac{c_{\text{GW}}^3}{16\pi G_{\text{eff}}}
\left\langle \dot h_+^2+\dot h_\times^2\right\rangle
$$

[View →](../../../../equation-mapping.html#corpus-equation-60add69d28a26c9a)

This polarization-summed normalization follows from $\dot h_{ij}^{\mathrm{TT}}\dot h_{\mathrm{TT}}^{ij} =2(\dot h_+^2+\dot h_\times^2)$ in the Isaacson comparison flux. It is the quantity used for binary-orbit energy-loss consistency checks. Energy localization for gravitational waves is an observer-level effective description: the packet may use cycle-averaged fluxes and asymptotic energy loss, but it should not promote a gauge-dependent local gravitational energy density into substrate ontology.

The averaging region must span many wave periods while remaining small compared with background-variation scales. The source loss, propagated wave energy, and receiver response must be related by one derived balance, including boundary exchange and medium absorption where present. Agreement with this flux formula by assumption would test an effective model; it would not establish energy conservation or tensor propagation for the underlying delayed histories.

## Claim Boundary and Sources

The TT component count and plane-wave dispersion follow conditionally from the stated mathematical assumptions. The Noether sea tensor response, source coupling, energy balance, and observer-map sufficiency remain open recovery targets. An independently computed violation of the assumed equilibrium, an extra radiative response above its applicable limit, or inconsistent source and receiver predictions on the same calibrated record reopens the corresponding claim. The chapter supplies no evaluated residual for an Architrino-generated event.

The external sources below support effective comparisons and observations; none supplies an architrino-level premise.

- Sean M. Carroll, *Lecture Notes on General Relativity* (1997), [arXiv:gr-qc/9712019, section 6](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll6.html), supplies the linearized sign convention, gauge reduction, and gravitational-radiation comparison.
- B. P. Abbott et al., *Gravitational Waves and Gamma-rays from a Binary Neutron Star Merger: GW170817 and GRB 170817A* (2017), [arXiv:1710.05834, section 4.1](https://arxiv.org/abs/1710.05834), supplies the timing interval and its emission-lag assumptions.
- B. P. Abbott et al., *GW170814: A Three-Detector Observation of Gravitational Waves from a Binary Black Hole Coalescence* (2017), [Physical Review Letters 119, 141101](https://doi.org/10.1103/PhysRevLett.119.141101), supplies the pure-polarization model comparison.
- B. P. Abbott et al., *GW190425: Observation of a Compact Binary Coalescence with Total Mass approximately 3.4 Solar Masses* (2020), [arXiv:2001.01761](https://arxiv.org/abs/2001.01761), supplies the single-observatory detection example.
- Freeman Dyson, *Is a Graviton Detectable?* (2012), [Poincaré Prize lecture manuscript, section 3](https://albert.ias.edu/bitstreams/dd422d6a-70ed-4de1-97da-a9a995a0a1e6/download), supplies the restricted wavelength-scale sensitivity comparison. Daniel Carney, Valerie Domcke, and Nicholas L. Rodd, *Graviton detection and the quantization of gravity* (2024), [Physical Review D 109, 044009; arXiv:2308.12988](https://arxiv.org/html/2308.12988v1), distinguishes detector clicks from evidence of field quantization.
- The LIGO–Virgo–KAGRA [GWTC-5.0 data-release documentation](https://gwosc.org/GWTC-5.0/) (2026) identifies the event and ensemble products. The collaboration's *GW250114: testing Hawking's area law and the Kerr nature of black holes* (2025), [arXiv:2509.08054](https://arxiv.org/abs/2509.08054), supplies the stated ringdown comparison.
