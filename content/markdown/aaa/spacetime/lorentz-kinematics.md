# Lorentzian Conspiracy and Emergent Lorentz Kinematics

This chapter is the focused program statement for deriving operational Lorentz behavior from delayed substrate dynamics. The substrate has absolute time, a Euclidean void, and finite wake speed. Physical Observers nevertheless recover Lorentz-like clocks, rulers, and signal timing in tested regimes. The purpose of this chapter is to make that required compensation law explicit, distinguish the closure target from any already-proved result, and organize the derivation path from microdynamics to measurable clock-and-ruler behavior.

The opening abstract states the target; the later sections move through the governing delayed dynamics, the anisotropy mechanism, and the conditions under which assembly-built observers could recover standard Lorentz kinematics.

The reader should keep four moving pieces distinct. The substrate has a preferred rest frame. A moving assembly can deform and retune. Physical Observers synchronize clocks and rulers using assemblies and signals. Precision experiments see only the exported observer record. Lorentz recovery succeeds only if the same retained branch hides the first piece from the fourth by controlling the middle two.

For the theory-bridge version that maps special-relativistic terms directly to the deformable Noether braid story, see [the special-relativity bridge](../philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the reader-facing synthesis of the branch-quantized Lorentz milestone, see [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). For the interactive geometry surface, open [Coincident-Midpoint Three-Axis Circular Lorentz Geometry App](../../../../ideal-braid.html).

## Coordinate Layers

This chapter uses two coordinate layers, and they must not be collapsed. Native substrate equations use the absolute frame: $T$ is absolute time, $\mathbf X=(X^1,X^2,X^3)$ is position in the Euclidean void, and worldlines are written as $\mathbf X_i(T)$ with native velocity $\mathbf V_i=d\mathbf X_i/dT$. Causal roots, wake intersections, branch histories, and assembly trajectories are first stated in this layer.

The Lorentz or GR-comparison layer uses the effective observer chart. Its coordinates are $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$, with metric rows such as $g_{\mu\nu}^{\mathrm{eff}}$. These coordinates are not a second substrate and not hidden names for $T$ and $\mathbf X$. They are the chart reconstructed by Physical Observers from physical clocks, rulers, signal timing, Noether sea state, and retained records. Proper time $\tau$ is a derived clock readout in this observer layer, so $d\tau/dt_{\mathrm{eff}}$ is an observer-coordinate clock-rate comparison, not a derivative with respect to absolute time.

The bridge between layers is therefore a constitutive closure map:
$$
(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record}).
$$

[View →](../../../../equation-mapping.html#coordinate-layer-key)

Unless a local derivation supplies the needed row, $\chi_{\mathrm{eff}}$ remains an obligation. A Lorentz formula counts in this chapter only when the same retained branch record supplies the map from absolute substrate quantities to effective observer records and keeps preferred-frame leakage inside the declared bounds. Bare symbols such as $t$, $\mathbf x$, $dt$, and $dx^i$ are therefore avoided as working notation because they hide which side of the map is being used.

## Abstract

This document develops a first-principles program for deriving effective Lorentz kinematics inside $\mathbb{A}\mathbb{A}\mathbb{A}$ from delayed architrino dynamics in a Euclidean void with absolute time. The central claim is not postulated covariance, but dynamical compensation: moving assemblies deform and retune their internal frequencies so that assembly-built observers recover Lorentz-consistent clock and ruler behavior. The objective is an exact or asymptotically controlled derivation of
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\star(v)}\qquad
P(v)=\gamma_\star(v)\,P_0\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-aac1c17361b6212c)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

with bounded preferred-frame leakage in measurable observables.

This is an exact-substrate-asymmetry to bounded-emergent-symmetry theorem target. Absolute time, the Euclidean void, and finite $c_f$ are not observer-level Lorentz symmetry. The substrate symmetry group is $E(3)\times\mathbb{R}_T$, not a boost-invariant Lorentz or Poincare group, so Lorentz invariance cannot be counted as a substrate-exact invariant. It is admissible only if the source-to-effective map suppresses every observer-accessible preferred-frame current below the declared $\epsilon_{\mathrm{LV}}$ bounds while preserving the clock, ruler, and photon-channel successes of special relativity.

Stated plainly, the chapter asks how an asymmetric substrate can export a symmetric measurement world. The answer cannot be "because coordinates say so"; it has to come from assembly deformation, clock retuning, synchronization, and a shared Noether sea dressing map.

Here $\epsilon_{\mathrm{LV}}$ is a residual budget, not one binary tolerance. It contains distinct rows for Michelson-Morley two-way optical isotropy, Kennedy-Thorndike boost dependence, Ives-Stilwell clock-dilation behavior, slow-clock-transport synchronization and closed transported-clock loops, Hughes-Drever and clock-comparison matter-sector isotropy, sidereal modulation, closed-loop Sagnac response, photon-sector dispersion/birefringence/time-of-flight leakage, weak-field preferred-frame terms, and gravitational-wave-versus-photon speed matching. Each row must declare its expansion order in the appropriate group-speed parameter, such as $\beta_\oplus\equiv v_\oplus/c_{\text{eff}}$ for terrestrial null tests, its validity regime, and its experimental tolerance before Lorentz recovery can be counted as bounded.

The common-mode requirement is therefore multi-sector. Matter-sector clocks, photon-channel propagation, and the effective gravitational channel cannot be tuned independently. A branch that nulls Michelson-Morley-type two-way optical anisotropy but leaves orientation-dependent clock energy levels, sidereal leakage, photon birefringence, or a separated effective gravitational-wave speed is not a Lorentz recovery branch.

This makes Lorentz recovery the prototype invariant-provenance problem. The invariant interval is not accepted as primitive substrate geometry; it is the observer-level invariant to be exported by one retained branch record. The derivation must say which substrate quantities are exact, which observer quantities are emergent, and which residual currents remain as preferred-frame leakage diagnostics.

Speed convention: primitive delayed-root equations are solved with $c_f$. The declared speed $c_\star$ enters only after the channel has been named: set $c_\star=c_f$ for a primitive wake branch chart, $c_\star=c_{\text{eff}}(\mathbf X,T)$ for Noether sea dressed clocks and rulers, and $c_\star=c_\gamma(\mathbf X,T)$ for photon synchronization. The low-gradient Lorentz limit may identify the measured channel speed with $c_0=c_{\text{eff}}(\infty)$ only after the dressing map is declared.

Notation guardrail: $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the Noether sea delay factor, not the Lorentz clock-rate factor. The velocity-sector target is $d\tau/dt_{\mathrm{eff}}\to\sqrt{1-\beta_{\text{eff}}^2}$ only after the clock projection $f_{\tau}$ is extracted from the same Noether sea and assembly record and projected into an effective observer chart. A derivation that writes $\chi_{\text{sea}}\to\sqrt{1-\beta_{\text{eff}}^2}$ has changed notation; the corpus-level target is the map from $(n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state})$ into $f_{\tau}$ with $R_{\tau v}\to0$.

A stronger prediction is also available. The Lorentz formulas should not be imported as an independent observer-level rule and then copied onto assemblies. They should be recovered from the same causal-root progression that gives stable assemblies their discrete branch ledgers. In that sense the Lorentz factor is a closure target for the quantum-facing branch structure of the dynamics: the root ledger must generate the contraction, clock-retuning, and residual-leakage coefficients rather than merely coexist with them.

## Problem Statement

### Kinematic closure target

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate ontology is:

1. Euclidean 3-space represented by a chosen absolute-frame coordinate scaffold.
2. Global absolute time $T$.
3. Finite propagation speed $c_f$ for potential transfer through the Noether sea.

To match modern precision constraints, operational observers made from bound assemblies must infer effective Lorentz kinematics even though the substrate itself is not Minkowskian at the fundamental level. We call this required dynamical compensation the Lorentzian conspiracy.

Michelson-Morley-type null experiments make this a quantitative acceptance condition, not a philosophical preference. The framework may keep a Euclidean-void rest frame only if the two-way signal residual later written as $\Delta_{\text{tw}}(\beta_\star,\theta)$ is generated by the same branch record that retunes material arms and clocks, and remains $O(\epsilon_{\text{LV}})$ across the tested orientations. A cancellation achieved by separately fitting photon speed, clock rate, and ruler length would be a fit, not Lorentz closure.

The closure target is two-way operational isotropy, not one-way substrate isotropy. A primitive photon-channel speed may remain anisotropic relative to the absolute frame, because one-way speed is inseparable from clock synchronization for embedded observers. The required theorem is that the assembly-clock synchronization map absorbs the residual one-way anisotropy while the measurable round-trip diagnostic $\Delta_{\text{tw}}$ and the boost-dependent and clock-isotropy rows remain below their declared leakage bounds.

This makes synchronization reabsorption a dynamical export, not a convention chosen after the fact. Let $\mathcal{S}_{\mathrm{asm}}$ denote the synchronization convention physically realized by assembly clocks, rulers, and signal channels. A successful Lorentz export must drive $\mathcal{S}_{\mathrm{asm}}$ to operational Einstein synchrony inside the tested regime while any Reichenbach-style one-way freedom remains inaccessible to embedded observers. If an apparatus can extract the absolute-frame anisotropy by comparing assembly clocks, signal timing, or calibration loops, the preferred-frame leakage wall has failed even if a two-way Michelson-Morley row is small.

The clock channel has to be written as its own substrate-to-observer map:
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=
f_{\tau}\!\left(
\beta_{\text{eff}},\,
n(\mathbf X,T),\,
\chi_{\text{sea}}(\mathbf X,T),\,
\Phi_{\text{eff}}(\mathbf X,T),\,
\text{assembly state}
\right),
\qquad
\beta_{\text{eff}}\equiv\frac{v}{c_{\text{eff}}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-f2a675356f930be7)
The velocity-sector residual is
$$
R_{\tau v}(\beta_{\text{eff}})
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\nabla n=0,\ \nabla\Phi_{\text{eff}}=0}
-\sqrt{1-\beta_{\text{eff}}^2},
$$

[View →](../../../../equation-mapping.html#corpus-equation-84b3b29607ef3fa9)
and must be bounded by time-dilation tests such as Ives-Stilwell and storage-ring clock comparisons. The weak-field potential-sector residual is
$$
R_{\tau\Phi}
\equiv
\left.\frac{d\tau}{dt_{\mathrm{eff}}}\right|_{\beta_{\text{eff}}=0}
-\left(1+\frac{\Phi_{\text{eff}}}{c_{\text{eff}}^2}+O\!\left(\frac{\Phi_{\text{eff}}^2}{c_{\text{eff}}^4}\right)\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-fd577de44234840b)
with the $\Phi_{\text{eff}}$ sign convention declared, and must recover gravitational-redshift and PPN clock/curvature constraints. Equivalence-principle recovery requires $R_{\tau v}$ and $R_{\tau\Phi}$ to come from the same Noether sea response and assembly-clock map.

The absolute velocity used by the substrate solver cannot remain an observer-accessible quantity. In the accepted export, any dependence on absolute $v$ must be absorbed into nonseparable combinations of assembly-clock synchronization, ruler response, and signal-channel calibration, so Physical Observers recover Lorentz-invariant records rather than a direct preferred-frame speed meter.

### Mathematical objective

Given a translating bound assembly, first for one binary and then for the prescribed coincident-midpoint orthogonal-axis braid chart, derive:

Here `coincident-midpoint orthogonal-axis braid` means one complete orthogonal-axis three-binary braid with persistent binary indices $a\in\{1,2,3\}$, independently assignable positive radii $R_a$ and frequencies $f_a$, mutually orthogonal binary axes at $\lambda_A=0$, and axes converging toward the group-translation direction as $\lambda_A\to1$. Axial half-separations, transverse orbit radii, phases, and circulation remain explicit binary coordinates. The label supplies no Lorentz law, retained branch, hierarchy, particle assignment, or stability result; those are the theorem targets below, falsified if same-record evolution fails the coordinate or observer-residual gates.

1. The velocity-dependent equilibrium shape tensor $Q(v)$ and its anisotropy.
2. The velocity-dependent internal period $P(v)$.
3. Conditions under which $(Q(v),P(v))$ produce effective Lorentz ruler and clock laws.
4. Residual non-Lorentz terms and their scaling.

## Governing Microdynamics

### Causal path-history interaction form

For architrino labels $i,j\in\{1,\dots,N\}$ with positions $\mathbf X_i(T)$, write the reduced branch equation in acceleration-first form:
$$
\frac{d^2\mathbf X_i}{dT^2}
=
\sum_{j\neq i}
\mathbf A_{i\leftarrow j}\!\left(
\mathbf X_i(T),
\mathbf X_j(T-\Delta_{ij}(T)),
\mathbf V_j(T-\Delta_{ij}(T))
\right)
+
\mathbf A^{\mathrm{self}}_i(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-8267bcb50764beae)
with causal delay
$$
\Delta_{ij}(T)=\frac{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta_{ij}(T))\|}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6f92c08eca343433)
The self-hit acceleration contribution $\mathbf A^{\mathrm{self}}_i$ captures history-dependent wake re-intersections and is the non-Markovian origin of branch-sensitive corrections.

No architrino-specific inertial weights enter this substrate equation. When quadratic energy or momentum bookkeeping is needed below, the single universal conversion constant $\mu_{\mathrm{arch}}$ may be used; it does not alter the acceleration law or assign primitive mass to an architrino.

### Co-moving decomposition

For an assembly center trajectory $\mathbf X_c(T)$ with mean group velocity $\mathbf V$, write
$$
\mathbf X_i(T)=\mathbf X_c(T)+\mathbf r_i(T),
\qquad
\mathbf X_c(T)=\frac{1}{N}\sum_i\mathbf X_i(T),
\qquad
\sum_i\mathbf r_i(T)=\mathbf 0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-70eef402c06f6f38)
The closure task is to solve for bounded relative motion $\mathbf r_i(T)$ under translation $\|\mathbf V\|<c_f$ and extract period and geometry renormalization.

### Dimensionless group-motion delay form and variational closure

Fix a rest-attractor length scale $a_0$ and period $P_0$, and define
$$
\beta_f\equiv \frac{v}{c_f}\qquad s\equiv \frac{T}{P_0}\qquad
\boldsymbol{\rho}_i(s)\equiv \frac{\mathbf r_i(T)}{a_0}\qquad
\chi_{\mathrm{dd}}\equiv \frac{c_f P_0}{a_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2579b067475dc087)
Then delay closure in co-moving coordinates is
$$
\hat{\tau}_{ij}(s)=\frac{1}{\chi_{\mathrm{dd}}}\left\|
\boldsymbol{\rho}_i(s)-\boldsymbol{\rho}_j\!\left(s-\hat{\tau}_{ij}(s)\right)
+\chi_{\mathrm{dd}}\beta_f\,\hat{\mathbf{e}}_{\parallel}\hat{\tau}_{ij}(s)
\right\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-0806349b1035aea0)
with $\hat{\tau}_{ij}\equiv \tau_{ij}/P_0$. The $\mathrm{dd}$ subscript marks this as a local delay scale for group motion (the existing subscript retains its spelling), not the Noether sea delay factor $\chi_{\text{sea}}$ or the effective coordinate map $\chi_{\mathrm{eff}}$.

Let $\boldsymbol{\rho}^\star(s;\beta_f)$ be a $P_s(\beta_f)$-periodic translating attractor, where $P_s(\beta_f)=P(c_f\beta_f)/P_0$ is the period in the rescaled time $s$. Linearization gives a delay-Floquet system
$$
\delta\dot{\mathbf{y}}(s)=A_0(s;\beta_f)\,\delta\mathbf{y}(s)+\sum_{n=1}^{N_d}A_n(s;\beta_f)\,\delta\mathbf{y}\!\left(s-\hat{\tau}_n^\star\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec19d9e83c85f1da)
where $\mathbf{y}$ stacks positions and velocities in relative coordinates. Kinematic closure requires:

1. Existence of $\boldsymbol{\rho}^\star(s;\beta_f)$ for $\beta_f\in[0,\beta_{\max})$.
2. Spectral stability of the monodromy operator (all nontrivial Floquet multipliers inside the unit disk).
3. Smooth coefficient maps for axis and period renormalization extracted from $\boldsymbol{\rho}^\star$.

### Translating binary benchmark

The first hard Lorentz-closure calculation is the moving version of the declared reference rest two-body branch (certificate packet pending; see the closure-packet contract in [Binary Dynamics](../dynamics/binary-dynamics.md)). Let $\sigma\in\{+1,-1\}$ label the two opposite-polarity architrinos and choose a constant group-velocity direction $\hat{\mathbf e}$. A translating binary branch has the substrate ansatz
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T)),
\qquad
\theta(T+P_u)=\theta(T)+2\pi
$$

[View →](../../../../equation-mapping.html#corpus-equation-88b8e30dbaeadcfd)

Here $P_u$ is the cycle period of the translating binary at group speed $u$.

with $\boldsymbol{\rho}_u$ periodic on the retained branch chart. This is not a Lorentz boost of coordinates. It is a direct absolute-time branch ansatz inserted into the delayed root equation.

For a root emitted by constituent $\sigma'$ and received by constituent $\sigma$, the delay $\tau>0$ must solve
$$
G_{\sigma\sigma'}(\tau;\theta,u)
\equiv
\left\|
u\tau\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta)
-
\sigma'\,\boldsymbol{\rho}_u(\theta-\Omega_u\tau)
\right\|
-c_f\tau
=0,
\qquad
\Omega_u\equiv\frac{2\pi}{P_u}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba53d034fed07019)
The branch Jacobian is
$$
J_{\sigma\sigma'}(\tau;\theta,u)
=
1-
\frac{
\left(
u\hat{\mathbf e}
+
\sigma'\Omega_u\boldsymbol{\rho}'_u(\theta-\Omega_u\tau)
\right)
\cdot\hat{\mathbf r}_{\sigma\sigma'}
}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-be45a344e6a3ff0c)
where $\hat{\mathbf r}_{\sigma\sigma'}$ is the unit vector from the transmitter emission point to the receiver-now point. This is structurally the same transmitter-side factor that appears in Lienard-Wiechert delay geometry. The analogy is useful only at the level of causal-root flux: the canonical Master EOM has the radial inverse-square line of action and transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, but not the full electrodynamic velocity-field and acceleration-field terms. The Lorentz answer therefore cannot be imported from classical electrodynamics; it must be computed on this branch.

The leading/trailing asymmetry in this translating ledger is already visible in the uniform-translation part of the same Jacobian. For a uniformly moving transmitter with speed ratio $\beta_f=u/c_f$ and $\theta$ the angle between the motion direction and the transmitter-to-receiver line of action, the simple-root wake-density factor is
$$
\mathcal{D}_{\mathrm{wake}}(\theta;\beta_f)
=
\frac{1}{1-\beta_f\cos\theta}
$$

[View →](../../../../equation-mapping.html#corpus-equation-44dd1bd2712aa4e7)
before the internal orbital velocity, branch multiplicity, and finite-window energy rows are added. Thus the translating binary calculation is not asking whether anisotropy exists; it is asking whether the full deformed branch ledger converts this microscopic wake-density anisotropy into Lorentzian contraction, clock dilation, and bounded residual leakage.

The primitive Lorentz test for this binary is the residual triple
$$
\mathcal{R}_{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}(u),
R_{\xi}^{\mathrm{bin}}(u),
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\right),
\qquad
\gamma_f(u)\equiv
\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3c3f10587d514abd)
with
$$
R_T^{\mathrm{bin}}(u)
\equiv
\frac{P_u}{P_0}
-
\gamma_f(u),
\qquad
R_{\xi}^{\mathrm{bin}}(u)
\equiv
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
-
\frac{1}{\gamma_f(u)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b676f2f4292ae541)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_u$ is the cycle period of the translating binary at group speed $u$.

Here $L_{\parallel}$ and $L_{\perp}$ are extracted from the same periodic solution by projecting the relative orbit along and transverse to $\hat{\mathbf e}$. The shape residual measures the remaining branch-chart difference from the Lorentz-deformed rest solution,
$$
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\equiv
\inf_{\varphi}
\frac{
\left\|
\boldsymbol{\rho}_u(\theta)
-
\boldsymbol{\rho}_{L}(\theta+\varphi;u)
\right\|_{\mathrm{cyc}}
}{R_0},
\qquad
\boldsymbol{\rho}_{L}(\theta;u)
=
R_0\left(
\gamma_f^{-1}\cos\theta\,\hat{\mathbf e}
+
\sin\theta\,\hat{\mathbf e}_{\perp}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bdecd0dfbe03be40)
in the planar orientation where the group-velocity direction lies in the binary plane. A clean primitive result has $\mathcal{R}_{\mathrm{bin}}=0$ or a controlled residual traceable to named branch-ledger features. A nonzero residual is not a rhetorical failure; it is the first foundation-level pressure on the Lorentz-closure program, because the binary is the first available internal clock and ruler.

> Claim grade: **test definition**. No value of this residual triple has been produced by evolving the delayed law at any group speed. A prescribed or algebraically deformed history does not supply that missing branch evidence.

### Exact substrate symmetries and delay currents

At action level, use a causal path-history functional
$$
S=\int dT\left[
\sum_i \frac{1}{2}\mu_{\mathrm{arch}}\left\|\frac{d\mathbf X_i}{dT}\right\|^2
-\frac{1}{2}\sum_{i\ne j}\int_{\Sigma_{ij}} d^2\sigma\,
\mathcal{L}_{\text{int}}\!\left(\mathbf X_i(T),\mathbf X_j(T-\Delta)\right)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-514b69d292c2821c)
The exact substrate symmetry group is
$$
G_{\text{fund}}=E(3)\times \mathbb{R}_T
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca196158ccbbbc87)
and the associated delayed-Noether proof target is that conserved totals close only after wake and medium channels are included:
$$
\mathbf{P}_{\text{tot}}
=
\sum_i \mu_{\mathrm{arch}}\frac{d\mathbf X_i}{dT}+\mathbf{P}_{\text{wake}}
\qquad
E_{\text{tot}}
=
\sum_i \frac{1}{2}\mu_{\mathrm{arch}}\left\|\frac{d\mathbf X_i}{dT}\right\|^2+E_{\text{wake}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b99ad388dda786b3)
These are universal-weight bookkeeping proxies for the delayed-Noether closure target, not primitive momentum or mass assignments. Only after the architrino-plus-wake-plus-medium ledger closes does an isolated translating assembly admit a co-moving reduction to a bounded periodic or quasi-periodic branch $\boldsymbol{\rho}^\star(s;\beta_f)$ with fixed mean group velocity extracted from the same record.

## Emergent Kinematics from Delay Anisotropy

### Directional delay asymmetry

For a primitive benchmark binary moving at constant group velocity with instantaneous separation vector $\mathbf r=r\,\hat{\mathbf n}$ and constant group velocity $\mathbf V=v\,\hat{\mathbf e}_{\parallel}$, causal-delay closure satisfies
$$
\Delta=\frac{\|\mathbf r+\mathbf V\Delta\|}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4dcb61d581ce4ea)
This subsection is deliberately a $c_f$ branch-chart calculation. For operational clock, ruler, or photon tests, repeat the same budget with the declared $c_\star$ after Noether sea dressing. With $\mu\equiv \hat{\mathbf{n}}\cdot\hat{\mathbf{e}}_{\parallel}$ and $\beta_f=v/c_f$, the two directional roots are
$$
\tau_{\pm}(r,\mu;\beta_f)
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}\pm \beta_f\mu}{1-\beta_f^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4df24a5f5ea6755c)
Special orientations recover standard forms:
$$
\mu=1:\quad
\tau_{+}=\frac{r}{c_f-v}\qquad
\tau_{-}=\frac{r}{c_f+v}
$$

[View →](../../../../equation-mapping.html#corpus-equation-eaad26459c830d80)
$$
\mu=0:\quad
\tau_{+}=\tau_{-}=\frac{r}{\sqrt{c_f^2-v^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b83b297c43f997e7)
The symmetric delay channel and associated causal-rate proxy are
$$
\bar{\tau}(\mu;\beta_f)\equiv \frac{\tau_{+}+\tau_{-}}{2}
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta_f^2(1-\mu^2)}}{1-\beta_f^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7495836f8d467977)
$$
\nu(\mu;\beta_f)\equiv \frac{1}{\bar{\tau}(\mu;\beta_f)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3704ed64dd4e3553)
Since $\bar{\tau}$ depends on $\mu$, interaction response is anisotropic and induces
$$
K_{\parallel}(v)\neq K_{\perp}(v)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cec1d608758a704)

### Weak-velocity expansion to $O(\beta_f^4)$

Direct expansion of the symmetric lag gives
$$
\bar{\tau}(\mu;\beta_f)=\frac{r}{c_f}\left[
1+\frac{1+\mu^2}{2}\beta_f^2
+\frac{3+6\mu^2-\mu^4}{8}\beta_f^4
+O(\beta_f^6)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-dda82af5f9568f4e)
and thus
$$
\nu(\mu;\beta_f)=\frac{c_f}{r}\left[
1-\frac{1+\mu^2}{2}\beta_f^2
+\frac{-1-2\mu^2+3\mu^4}{8}\beta_f^4
+O(\beta_f^6)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-b35af7974f981f07)
Two anchor limits are:
$$
\mu=1:\ \bar{\tau}=\frac{r}{c_f}\gamma_f^2,\ \nu=\frac{c_f}{r}(1-\beta_f^2)
\qquad
\mu=0:\ \bar{\tau}=\frac{r}{c_f}\gamma_f,\ \nu=\frac{c_f}{r}\frac{1}{\gamma_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ff4f1250f1d24fc6)

### Closed-return derivation of the Lorentz axis ratio

The one-way roots above expose the preferred branch chart. They are not yet an observer-facing Lorentz law, because a physical clock or ruler is not made from a single one-way leg. A stable material branch is admitted only when the relevant causal wake returns to a compatible phase. The primitive Lorentz-geometry object is therefore a closed return cycle.

Use the declared channel speed $c_\star$ for the closure problem under consideration, with
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0c4f8895089b14c8)
In a homogeneous Noether sea cell, take $R_{\parallel}$ to be the semiaxis along group velocity and $R_{\perp}$ to be a transverse semiaxis. A longitudinal return cycle has unequal forward and rear legs,
$$
t_{+}=\frac{R_{\parallel}}{c_\star-v}
\qquad
t_{-}=\frac{R_{\parallel}}{c_\star+v}
$$

[View →](../../../../equation-mapping.html#corpus-equation-88b04f5b4821857b)
so its closed return time is
$$
P_{\parallel}
=t_{+}+t_{-}
=
\frac{R_{\parallel}}{c_\star-v}
+
\frac{R_{\parallel}}{c_\star+v}
=
\frac{2R_{\parallel}c_\star}{c_\star^2-v^2}
=
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-87ecd8149507bb23)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity. $P_{\perp}$ is the closed signal-cycle period perpendicular to the assembly group velocity.

A transverse return cycle uses part of the causal budget to keep pace with the translated receiver. The remaining transverse closure speed is
$$
c_{\perp}=c_\star\sqrt{1-\frac{v^2}{c_\star^2}}
=\frac{c_\star}{\gamma_\star}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ffdd557fa94bc35c)
and therefore
$$
P_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../equation-mapping.html#corpus-equation-c1c97cc4e5aba585)

The closure condition for a Lorentz-admissible branch is that the same material return cycle closes with one period in the longitudinal and transverse channels:
$$
P_{\parallel}=P_{\perp}+O(\epsilon_{\mathrm{LV}}P_0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-748354681b616814)
In the zero-leakage homogeneous limit this gives
$$
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../equation-mapping.html#corpus-equation-ab2434374dbcdb34)
hence
$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
=
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../equation-mapping.html#oblate-spheroidal-envelope)

This is the direct map from Lorentz kinematics to Noether braid geometry. The oblate spheroidal envelope for an admitted branch $q$ can be written
$$
\frac{x_{\perp,1}^2+x_{\perp,2}^2}{R_{\perp,q}^2}
+
\frac{x_{\parallel}^2}{R_{\parallel,q}^2}
=1
\qquad
R_{\parallel,q}
=
\frac{R_{\perp,q}}{\gamma_\star}
+O(\epsilon_{\mathrm{LV}}R_{\perp,q})
$$

[View →](../../../../equation-mapping.html#corpus-equation-816659ca98874dc8)
Equivalently, the realized ruler factor is the inverse shape ratio:
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)}
=
\gamma_\star(v)+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-35a64cf47656eb9e)

The same closure has a useful selection form. Let a rest-frame separation at angle $\theta_0$ to the group-velocity direction deform by an unknown axial factor $g(\beta_\star)$:
$$
R_{\parallel}=R_0\cos\theta_0\,g(\beta_\star),
\qquad
R_{\perp}=R_0\sin\theta_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-889dff0b299cfed7)
For a closed return through a channel with speed $c_\star$, the orientation-sensitive bracket in the round-trip delay is proportional to
$$
B(\theta_0)
=
c_\star^2R_0^2\left[g^2\cos^2\theta_0+(1-\beta_\star^2)\sin^2\theta_0\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-e76f78aa5560ad6f)
An orientation-independent material clock requires this equality for every $\theta_0$ simultaneously, so the coefficients of $\cos^2\theta_0$ and $\sin^2\theta_0$ must agree, hence
$$
g(\beta_\star)=\sqrt{1-\beta_\star^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b21eaad6b65d02b3)
in the zero-leakage homogeneous limit. This selects the Lorentz contraction law as the unique axial deformation that removes matter-sector orientation leakage for this closed-return benchmark. It is still not a stability theorem: the delayed acceleration law must also show that the contracted branch is an attracting solution of the boosted delay dynamics.

An actual two-hit return must additionally name its root itinerary:

$$
G_{-+}(\tau_{+-};\theta_1,u)=0,
\qquad
G_{+-}(\tau_{-+};\theta_1+\Omega_u\tau_{+-},u)=0,
$$

[View →](../../../../equation-mapping.html#corpus-equation-3516bf94e69f37bf)

with a declared integer phase return, both transmitter-side weights, and the same evolved branch shape in both equations. The scalar reduction above is exact only for fixed, non-orbiting, co-moving endpoints. On an orbiting binary, residual phase dependence after optimizing the period falsifies it as an exact reduction of that itinerary.

Plainly: the simple round trip works exactly only when its endpoints do not orbit. A binary must close two actual delayed hits on the same evolved orbit.

> Claim grade: **derived conditional** on a single-speed closed return, orientation independence, and the named two-root itinerary. This is a kinematic selection rule, not evidence that a translating branch exists or is stable.

The same equations give a direct geometry dictionary for the oblate spheroidal envelope. In the no-extra-scale channel, take $R_{\perp}=R_0$ and $R_{\parallel}=R_0/\gamma_\star$. Then
$$
\xi
\equiv
\frac{R_{\parallel}}{R_{\perp}}
=
\frac{1}{\gamma_\star}
=
\sqrt{1-\beta_\star^2}
\qquad
\gamma_\star
=
\frac{R_{\perp}}{R_{\parallel}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bf60c8c1e2f0785)
and therefore
$$
\beta_\star
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7e45feef2e19a6b8)
Thus the velocity fraction is encoded as the eccentricity of the oblate spheroidal envelope, while $\gamma_\star$ is encoded as its transverse-to-longitudinal aspect ratio. This is only a statement about the shape channel: a separate scale channel $\lambda$ may change the absolute size without changing the dimensionless ratios $\xi$, $\gamma_\star$, and $\beta_\star$.

The clock law belongs to the return-cycle period, not to the absolute size of the oblate spheroidal envelope. If a rest branch has period $P_0$, the observer-sector target is
$$
P_q(v)=\gamma_\star(v)P_0+O(\epsilon_{\mathrm{LV}}P_0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3682ea362f0b4313)
For the simple return-cycle benchmark above, substituting $R_{\parallel}=R_{\perp}/\gamma_\star$ gives
$$
P_{\parallel}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

[View →](../../../../equation-mapping.html#corpus-equation-19b4f35a8d794477)

Here $P_{\parallel}$ is the closed signal-cycle period parallel to the assembly group velocity.

so the period dilation is the same $\gamma_\star$ that appears as the inverse axis ratio. This remains true even when the oblate spheroidal envelope becomes very thin. As $\beta_\star\to1$, the forward leg is
$$
t_+
=
\frac{R_{\parallel}}{c_\star-v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1+\beta_\star}{1-\beta_\star}}
\longrightarrow
\infty
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf0ccdd529897257)
while the rear leg satisfies
$$
t_-
=
\frac{R_{\parallel}}{c_\star+v}
=
\frac{R_{\perp}}{c_\star}
\sqrt{\frac{1-\beta_\star}{1+\beta_\star}}
\longrightarrow
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ad28f8b5045b9ee3)
The divergent clock factor is therefore not caused by a large object. It is caused by the vanishing forward catch-up margin $c_\star-v$ in the closed return cycle. The contraction of $R_{\parallel}$ and the divergence of $P_q(v)$ are two coupled readouts of the same closure condition.

In this precise theorem-target sense, Lorentz response is branch-indexed in the framework. The smooth function $\gamma_\star(v)$ remains the observer-level envelope, but a physical material branch can realize that envelope only through a discrete admissible closure class $q$. The quantized object is not the algebraic curve by itself; it is the branch-indexed realization
$$
q
\longmapsto
\left(
\xi_q(v),
\gamma_{\mathrm{rul}}^{(q)}(v),
\gamma_{\mathrm{clk}}^{(q)}(v),
\mathcal{L}_{\mathrm{root}}^{(q)}(v)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-831c329f2525d41b)
with admissibility requiring the same causal-root ledger to close the oblate spheroidal envelope geometry, clock period, and preferred-frame leakage bounds. Thus a continuous Lorentz formula would be recovered as the common envelope of discrete Noether braid return-cycle classes only after those branch-admissibility conditions close.

Confirmation status: the ruler law has no confirmation from evolved dynamics at any group speed. The prescribed translating-family prediction — that the moving branch's shape ratio $\xi(u)/\xi(0)$ should approach $1/\gamma_f(u)$ — remains a closure target of the delayed acceleration law, not a measured result. The actual branch may deform internally, and confirmation requires evolving it directly under the master equation and measuring the relative-periodic envelope it settles to. Whether the contracted branch is an attracting solution of the moving delay dynamics is the same open question stated above; it is not answered here.

To keep this closure target testable, the branch should report a single Lorentz residual record rather than separate narrative successes. For a declared channel speed $c_\star$ and branch $q$, write
$$
\mathcal{R}_{\mathrm{Lor},q}(\beta_\star)
=
\left(
R_T^{(q)},
R_\xi^{(q)},
R_u^{(q)},
R_{E\mathbf{p}}^{(q)},
R_\gamma^{(q)},
\epsilon_{\mathrm{LV}}^{(q)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-419ff163f9a3ae07)
where
$$
R_T^{(q)}(v)
\equiv
\frac{P_q(v)}{P_0}-\gamma_\star(v)
\qquad
R_\xi^{(q)}(v)
\equiv
\xi_q(v)-\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-516c2a69c0112ad1)
For a one-dimensional velocity-composition test in the same declared channel,
$$
R_u^{(q)}
\equiv
u_{\mathrm{eff}}
-
\frac{u'+v}{1+u'v/c_\star^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b55295dcded466a8)
For the effective mass-shell and photon-channel tests, use
$$
R_{E\mathbf{p}}^{(q)}
\equiv
E_q^2-\left(\|\mathbf{p}_q\|^2c_\star^2+m_q^2c_\star^4\right)
\qquad
R_\gamma^{(q)}
\equiv
E_\gamma-c_\gamma\|\mathbf{p}_\gamma\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-78dd89148e47fc91)
Here $m_q$ is the observer-sector inertial response assigned to the admitted branch, and $R_\gamma^{(q)}$ is evaluated only after the photon channel has been declared. The same causal-root ledger, medium dressing map, and branch state must feed all components. A branch that fits clock slowing with one ledger, ruler contraction with another, and photon propagation with an independent channel has not closed Lorentz behavior; it has only matched isolated formulas.

This derivation is stronger than assigning an oblate spheroidal envelope after the fact. The one-way longitudinal legs remain asymmetric; the Lorentz geometry appears only when the closed return cycle is allowed to choose the semiaxes that make longitudinal and transverse closure periods agree. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the envelope is the visible projection of a branch that has solved its return-cycle ledger.

### Effective shape law

Fix a group-speed band $0\le\beta_f\le\beta_{\max}<1$, with $\beta_f=v/c_f$, and choose one admitted translating branch $q$. The primitive root ledger on that band is still solved at $c_f$; $\beta_\star=v/c_\star$ is introduced only for the declared primitive or dressed observer channel being tested.

Define the cycle-averaged shape tensor on the translating attractor:
$$
Q_{ab}^{(q)}(v)\equiv
\frac{1}{N_q}
\left\langle
\sum_{i=1}^{N_q}r_{i,a}r_{i,b}
\right\rangle_{\text{cyc},q}
$$

[View →](../../../../equation-mapping.html#corpus-equation-466785028c222e42)
This equal-weight geometric convention is fixed before closure. It prevents the extracted shape residual from changing when an observer-level inertial-response convention is later assigned to the admitted assembly branch. Let $q_{\parallel}(v),q_{\perp,1}(v),q_{\perp,2}(v)$ be principal-frame eigenvalues of $Q^{(q)}(v)$, with principal axis chosen along group velocity for $q_{\parallel}$. Define extracted semiaxes
$$
a_{\parallel,q}(v)\equiv \sqrt{q_{\parallel}(v)}\qquad
a_{\perp,q}(v)\equiv \sqrt{\frac{q_{\perp,1}(v)+q_{\perp,2}(v)}{2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-a21567ec8416b496)
The moving-assembly contraction residual is
$$
R_\xi^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-60c23b42eb86f007)
and the theorem target is the leakage bound
$$
\left|R_\xi^{(q)}(v)\right|
\le
C_{\parallel}\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-af81afe763de35bc)
uniformly on the declared group-speed band. This is a moving-assembly extraction condition. Weak-field PPN tests can later falsify the dressed medium response, but they are not inputs to this semiaxis extraction.

### Quadratic closure and coefficient constraints

On the attracting manifold, use principal-frame quadratic closure
$$
U_{\text{eff}}=\frac{1}{2}K_{\parallel}(v)\,r_{\parallel}^2+\frac{1}{2}K_{\perp}(v)\left(r_{\perp,1}^2+r_{\perp,2}^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-673701ca98f1da53)
Notation guardrail: in this chapter, $U_{\text{eff}}$ denotes the cycle-averaged mechanical potential on the translating attractor; it is distinct from the positive weak-field PPN variables $U$ and $U_{\Phi}$ used in [spacetime/ppn-parameters.md](./ppn-parameters.md). Do not identify a fixed-energy shell with a fixed-action shell. Parameterize the amplitude response by
$$
a_i\propto K_i^{-p},
\qquad
\frac{a_{\parallel}}{a_{\perp}}
=
\left(\frac{K_{\perp}}{K_{\parallel}}\right)^p.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c6c17bc8d4b11404)
The fixed-energy harmonic scaling is $p=1/2$, while conservative adiabatic-action scaling is $p=1/4$. A strictly attracting delayed branch need not preserve either shell: its effective exponent must be extracted from the settled branch $\boldsymbol\rho^\star(s;\beta_f)$, and the constant-$p$ form below is only a local response ansatz. Write
$$
\frac{K_{\parallel}}{K_0}=1+k_2\beta_f^2+k_4\beta_f^4+O(\beta_f^6)+\Delta_{\parallel}^{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f17ac6b0fe20758f)
$$
\frac{K_{\perp}}{K_0}=1+\ell_2\beta_f^2+\ell_4\beta_f^4+O(\beta_f^6)+\Delta_{\perp}^{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dfd2ede4448b98db)
with $|\Delta_i^{\text{LV}}|\le C_i\epsilon_{\text{LV}}$. Then
$$
\frac{a_{\parallel}}{a_{\perp}}
=1+p(\ell_2-k_2)\beta_f^2
+\left[
p(\ell_4-k_4)
+\frac{p(p+1)}{2}k_2^2
-p^2k_2\ell_2
+\frac{p(p-1)}{2}\ell_2^2
\right]\beta_f^4
+O(\beta_f^6)+O(\epsilon_{\text{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-1a20ffa02db0a73a)
Matching to
$$
\frac{1}{\gamma_f}=1-\frac{1}{2}\beta_f^2-\frac{1}{8}\beta_f^4+O(\beta_f^6)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f6f05a05e6a2f1aa)
imposes
$$
p(\ell_2-k_2)=-\frac12
$$

[View →](../../../../equation-mapping.html#corpus-equation-5e38657e0afc4f6a)
$$
p(\ell_4-k_4)
+\frac{p(p+1)}{2}k_2^2
-p^2k_2\ell_2
+\frac{p(p-1)}{2}\ell_2^2
=-\frac18.
$$

[View →](../../../../equation-mapping.html#corpus-equation-55a0846f085aa562)

### Stiffness tensor from causal-wake surface integrals

To anchor coefficient matching in the microdynamics, define the pairwise causal-wake potential on a translating attractor $\boldsymbol{\rho}^\star(s;\beta_f)$:
$$
\mathcal{U}_{ij}(T;\beta_f)\equiv
\int_{\Sigma_{ij}^{\text{wake}}(T)}
\frac{\kappa\,\epsilon^2}{\|\mathbf X_i(T)-\mathbf X_j(T-\Delta)\|^2}\,
W_{ij}(T,\sigma;\eta)\,d^2\sigma
$$

[View →](../../../../equation-mapping.html#corpus-equation-dee13ca97e3ce65d)
where $W_{ij}$ is the regularized causal kernel weight and $\eta>0$ is the regularization scale. Set
$$
U_{\text{eff}}(T;\beta_f)\equiv \sum_{i<j}\mathcal{U}_{ij}(T;\beta_f)
\qquad
K_{ab}(\beta_f)\equiv
\left\langle
\frac{\partial^2 U_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3bd12cd176fea27a)
with cycle average $\langle\cdot\rangle_{\text{cyc}}$ taken on $\boldsymbol{\rho}^\star$. Project to principal channels:
$$
K_{\parallel}=\hat{e}_{\parallel}^a K_{ab}\hat{e}_{\parallel}^b\qquad
K_{\perp}=\frac{1}{2}(\delta^{ab}-\hat{e}_{\parallel}^a\hat{e}_{\parallel}^b)K_{ab}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0770d5d24a6e825f)

Dimensionless factorization exposes Category A coupling:
$$
K_i(\beta_f)=\frac{\kappa\,\epsilon^2}{a_0^3}\,\mathcal{I}_i(\beta_f,\chi_{\mathrm{dd}},\eta,\dots)
\qquad i\in\{\parallel,\perp\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cef4651d08f51d83)
Hence
$$
k_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e6a089e61e1915e)
$$
k_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7991607ed4caa38d)
Therefore the Lorentz-matching constraints in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) and [Clock-Channel Expansion and Minimal Closure Solution](#clock-channel-expansion-and-minimal-closure-solution) become explicit derivative identities on $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ evaluated on the delay-Floquet attractor.

### Period renormalization

Let $P_q(v)$ be the fundamental oscillation period of the assembly attractor in absolute time, extracted from the declared clock phase on the same branch ledger as the semiaxes. The clock retuning residual is
$$
R_T^{(q)}(v)
\equiv
\frac{P_q(v)}{P_0}
-
\gamma_\star(v)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c110ae1590a35ef0)

Here $P_0$ is the reference cycle period of the same declared clock branch.

Operational proper-time behavior requires the theorem-target bound
$$
\left|R_T^{(q)}(v)\right|
\le
C_T\epsilon_{\text{LV}}\beta_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-e5e72191c0bcda8a)
Exact closure is the limit $\epsilon_{\text{LV}}\to 0$.

### Clock-channel expansion and minimal closure solution

Use a symmetric clock-frequency aggregator
$$
\omega_{\text{clk}}(v)\equiv \omega_0\left(\frac{K_{\parallel}K_{\perp}^2}{K_0^3}\right)^{1/6}
\qquad
\frac{P(v)}{P_0}=\frac{\omega_0}{\omega_{\text{clk}}(v)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea524532bba3b857)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

Then
$$
\frac{P(v)}{P_0}
=1-\frac{k_2+2\ell_2}{6}\beta_f^2
+\left[
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
\right]\beta_f^4
+O(\beta_f^6)+O(\epsilon_{\text{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-fb64bb9ddebdb70b)
Matching to
$$
\gamma_f=1+\frac{1}{2}\beta_f^2+\frac{3}{8}\beta_f^4+O(\beta_f^6)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b743c1b1e2001415)
gives the clock constraints
$$
k_2+2\ell_2=-3
$$

[View →](../../../../equation-mapping.html#corpus-equation-8061010725b1ca6f)
$$
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
=\frac{3}{8}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d67a5c727abb787b)
Combining with shape closure yields the exponent-conditional matched coefficient set
$$
k_2=\frac{1/3-p}{p},
\qquad
\ell_2=-\frac{p+1/6}{p},
$$

[View →](../../../../equation-mapping.html#corpus-equation-3bb9ab5617a87217)
and, at $O(\beta_f^4)$,
$$
k_4=\frac{1-3p}{18p^2},
\qquad
\ell_4=\frac{6p+1}{72p^2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9db7a8fd077708a7)
For fixed energy ($p=1/2$) this reduces to
$$
\left(-\frac13,-\frac43,-\frac19,\frac29\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b4173e6e0095291)
while conservative fixed action ($p=1/4$) gives
$$
\left(\frac13,-\frac53,\frac29,\frac59\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-efeb83dc4dfaab9a)
Neither vector is a primitive prediction until the moving delayed branch supplies its amplitude law. The $1/6$-power geometric-mean clock aggregator is a second independent ansatz and remains to be derived.

### binary-3 transduction hypothesis (working)

Assume binary 3 is the dominant transducer for energy exchange with passerby assemblies (non-locally coupled encounters). Under this source-record hypothesis, the leading kinematic response is boundary-driven at binary 3, then propagated through binaries 2 and 1. The indices are persistent identities, not a radius or energy ordering.

For locally coupled assemblies (strong axial coupling), interaction pathways are distinct and should be modeled as a separate regime, not merged with passerby-transfer fits.

### State update map for single-quantum uptake

For an assembly state
$$
\mathcal{S}=\{v_{\text{tr}}, f_1,f_2,f_3,\mathbf{A},\mathcal{E}_{\text{excl}},\tau_{\text{op}}\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfe7775800004cdd)
let one absorbed quantum $\Delta E_q$ induce
$$
\mathcal{S}\mapsto \mathcal{S}'=\mathcal{S}+\Delta\mathcal{S}(\Delta E_q)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a4f667ac5b4dd84a)
with the following structured components:

1. Translational architrino speed increase: $\Delta v_{\text{tr}}>0$.
2. Discrete frequency retuning of binaries $1,2,3$: $\Delta f_k=n_k\,\delta f_k$, with $n_k\in\mathbb{Z}$ and $k\in\{1,2,3\}$.
3. Coincident-midpoint orthogonal-axis braid axis realignment: $\Delta\mathbf{A}\neq 0$ (precession/tilt of principal axes).
4. Exclusion-zone geometry shift: $\Delta\mathcal{E}_{\text{excl}}\neq 0$ (shape and orientation update).
5. Operational time response shift: $\Delta\tau_{\text{op}}\neq 0$.

### Open mapping: observer-level time dilation in $\mathbb{A}\mathbb{A}\mathbb{A}$

The observer-level clock-dilation channel is not yet fully mapped in substrate variables. The working interpretation in this document is:
$$
\tau_{\text{op}}=\tau_{\text{op}}(f_1,f_2,f_3,\mathbf{A},\mathcal{E}_{\text{excl}},v_{\text{tr}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8c1c0e485237d9a)
where $\tau_{\text{op}}$ is an emergent clock functional of assembly internal frequencies, axis geometry, exclusion-zone shape, and translation state.

The immediate task is to identify which subset dominates $\partial \tau_{\text{op}}/\partial E$ in the passerby-transfer regime, with the default prior that binary-3-mediated updates are first-order.

### Evolving scenario: exclusion-volume driven effective spacetime

Working assumption:

1. In the working source record, binary 3 defines the effective exclusion-volume boundary; see [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md). This is a provisional branch role, not a taxonomy identity.
2. Each coincident-midpoint orthogonal-axis braid binary ($1,2,3$) has its own circulation axis.
3. Total angular and translational momentum are conserved at assembly level (up to modeled exchange channels with environment).

Proposed mechanism chain under applied force (acceleration of a Noether braid-based assembly):

1. External forcing increases translational state.
2. Axis coupling drives partial alignment of the three persistently indexed circulation axes.
3. Alignment is accompanied by binary radius contraction across layers (with layer-dependent sensitivity).
4. The exclusion volume changes shape and orientation because the working source record assigns its boundary to precessing binary 3.
5. Neighboring assemblies then see changed path-history geometry and interaction timing.
6. At coarse scale, this appears as a modified effective kinematic/geometric background, i.e. an emergent spacetime response.

This can be treated as a coupled state map:
$$
(\mathbf V,\mathbf{A}_1,\mathbf{A}_2,\mathbf{A}_3,R_1,R_2,R_3,\mathcal{E}_{\text{excl}})
\xrightarrow{\;\Delta \mathbf{p}\;}
(\mathbf V',\mathbf{A}_1',\mathbf{A}_2',\mathbf{A}_3',R_1',R_2',R_3',\mathcal{E}_{\text{excl}}')
$$

[View →](../../../../equation-mapping.html#corpus-equation-0992fbc5230dc210)

Initial directional hypothesis for acceleration response:
$$
\|\mathbf{A}_1-\mathbf{A}_3\|,\ \|\mathbf{A}_2-\mathbf{A}_3\| \downarrow\qquad
R_1,R_2,R_3 \downarrow
$$

[View →](../../../../equation-mapping.html#corpus-equation-92514183ac10c982)
with the strongest transduction provisionally assigned to binary 3.

Interpretive thesis:

Einstein-like spacetime behavior may be recovered as the continuum limit of moving, deforming exclusion volumes of Noether braids under translation and local volume variation, rather than from fundamental geometric curvature at substrate level.

Consistency checks required for this scenario:

1. Contraction and alignment must satisfy conservation laws and admissible torque channels.
2. The induced clock/ruler renormalization must reproduce Lorentz-like scaling to required accuracy.
3. Residual anisotropy harmonics must remain below empirical bounds after observer construction.
4. Local axial-coupling encounters must be modeled separately from passerby-transfer events.

Status: scenario is a structured hypothesis, not yet a proved derivation. Its proof burden is to recover the theorem targets and simulation residuals below from the same branch ledger.

### Two-channel deformation: shape plus scale

Relevant to Lorentzian closure, the Noether braid deformation is not only axis-ratio change. A working two-channel model is:

1. Shape channel (oblateness): longitudinal compression relative to transverse radius.
2. Scale channel (radius rescaling): transverse radius changes with energy state.

Use the declared observer-channel speed for this closure step:
$$
R_\parallel=\frac{R_\perp}{\gamma_\star}\qquad \gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}\qquad \beta_\star=\frac{v_{\text{tr}}}{c_\star}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d33863a3a3a1d9ff)
with $c_\star=c_{\text{eff}}$ for Noether sea dressed clock/ruler closure and $c_\star=c_f$ only for a primitive branch-chart calculation. For the scale channel, use
$$
R_\perp=R_\perp(E_{\mathrm{int}})\qquad \frac{dR_\perp}{dE_{\mathrm{int}}}<0
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b8b1a55f4b9edf9)
as a working prior in internally excited regimes, with group velocity held fixed. Pure translation must separately satisfy
$$
\left.\frac{\partial R_\perp}{\partial\beta_\star}\right|_{E_{\mathrm{int}}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-568391e2d485dfed)
in the no-extra-scale return-cycle benchmark; otherwise $P_q(v)=\gamma_\star P_0$ does not follow from the displayed geometry. A certified energized-branch record exhibiting $dR_\perp/dE_{\mathrm{int}}\ge 0$ is the observable that would flip the internal-excitation sign choice.

The corresponding exclusion volume model is
$$
V(\beta_\star,E_{\mathrm{int}})=\frac{4\pi}{3}R_\perp(E_{\mathrm{int}})^2R_\parallel(E_{\mathrm{int}},\beta_\star)
=\frac{4\pi}{3}R_\perp(E_{\mathrm{int}})^3\sqrt{1-\beta_\star^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-55adb308e870e260)

This gives a direct state-space channel from energy and translation into local Noether sea geometry:
$$
(\beta_\star,E_{\mathrm{int}})\longmapsto (R_\parallel,R_\perp,V)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2ba4e7da2e5eeea7)

### Local deformation fields and effective geometry handoff

For coarse-grained modeling, define local fields
$$
\xi(x)=\frac{R_\parallel}{R_\perp}\qquad
\lambda(x)=\frac{R_\perp(x)}{R_{\perp,0}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-51297c29c7211c1f)
with $\xi\in(0,1]$ as shape and $\lambda$ as scale. The Lorentz-closure target is $\xi(x)\to1/\gamma_\star(x)$ in the homogeneous group velocity regime.

Terminology guardrail: $\xi$ is the Noether braid envelope shape ratio, inherited from [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md#canonical-geometry-variables). It is not defined as the clock-rate factor. In the homogeneous Lorentz-closure regime the proof target is
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt_{\mathrm{eff}}}\to\xi\to\frac{1}{\gamma_\star}
$$

[View →](../../../../equation-mapping.html#corpus-equation-76b2b483ba0db01b)
so clock slowing is a derived readout of the geometry-to-clock map.

Together with local assembly density $n(x)$ (with $\rho_{\text{NS}}(x)=\rho_{\text{NS},0}n(x)$) and preferred-frame flow/orientation $\hat{u}(x)$, these define a minimal handoff tuple
$$
(\xi,\lambda,n,\hat{u})_x
$$

[View →](../../../../equation-mapping.html#corpus-equation-f7c400e9e3e03c88)
for constructing effective kinematic and metric responses. The kinematic closure requirement is that observer-built rods/clocks from this Noether sea recover Lorentz-consistent operational laws to bounded leakage.

### Algebraic effective metric map from the handoff tuple

To make Stage D constructive, introduce an observer-sector pseudo-Riemannian template
$$
\eta^{\mu\nu}=\mathrm{diag}(-1,1,1,1)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8d8da2f8667de32)
used only as an operational constitutive object (not as substrate ontology). Let $\hat{u}^\mu$ be the unit medium-flow 4-field with
$$
\eta_{\mu\nu}\hat{u}^\mu\hat{u}^\nu=-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-b1ed06c8ec8686e4)
Define the disformal covariant metric
$$
g_{\mu\nu}^{\text{eff}}(x)=
\Omega^2(n,\lambda)\left[
\eta_{\mu\nu}
+\left(1-\xi^2(x)\right)\hat{u}_{\mu}\hat{u}_{\nu}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba3a80076a0c6ab5)
Its inverse form is
$$
g_{\text{eff}}^{\mu\nu}(x)=
\Omega^{-2}(n,\lambda)\left[
\eta^{\mu\nu}
+\left(1-\xi^{-2}(x)\right)\hat{u}^{\mu}\hat{u}^{\nu}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-00db40c650d5210f)
Hence microscopic shape closure, when it yields $\xi\to1/\gamma_\star$, is injected directly into $g_{\mu\nu}^{\text{eff}}$.

In the local Noether sea rest frame ($\hat{u}^\mu=(1,0,0,0)$), with observer-sector coordinate $x_{\mathrm{eff}}^0=c_0 t_{\mathrm{eff}}$:
$$
ds_{\text{eff}}^2=g_{\mu\nu}^{\text{eff}}dx_{\mathrm{eff}}^\mu dx_{\mathrm{eff}}^\nu
=-\Omega^{2}\xi^{2}(dx_{\mathrm{eff}}^0)^2+\gamma_{ij}^{\mathrm{eff}}dx_{\mathrm{eff}}^i dx_{\mathrm{eff}}^j
$$

[View →](../../../../equation-mapping.html#corpus-equation-ff226f3054cc996d)
Therefore the stationary ideal clock-rate factor extracted from the metric subclass is $\Omega\xi$, while the spatial ruler scale is governed by $\Omega$. This preserves the geometry-first interpretation: $\xi$ remains the oblate-envelope shape ratio, and the clock rate agrees with $\xi$ only after the geometry-to-clock closure is proved.

## Observer Construction and Operational Invariance

### Assembly clocks and rods

Physical observers are built from the same bound-state class that obeys the above deformation and period laws. Therefore, measurement devices inherit velocity-dependent retuning.

### Two-way signal speed criterion

For ruler and clock systems made of translated assemblies, two-way signal experiments must satisfy
$$
c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-e4dbe9cd86f63436)
uniformly in orientation $\theta$. This is the operational statement that maps substrate anisotropy into effective Lorentz symmetry at observer scale.

For clock-and-ruler synchronization, $c_{\text{iso}}$ is the dressed local assembly signal speed. For photon synchronization, it is the local photon-channel speed $c_\gamma$; photon Gate A must show when the photon branch shares the same homogeneous-cell limit as $c_{\text{eff}}$.

### Conditional synchronization-reabsorption lemma

The synchronization claim has a compact conditional form. In a weak homogeneous cell, suppose the same moving-assembly response supplies the photon-channel clock and ruler laws
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\gamma},
\qquad
\frac{d\tau}{dt_{\mathrm{eff}}}=\frac{1}{\gamma_\gamma},
\qquad
\gamma_\gamma=\frac{1}{\sqrt{1-v^2/c_\gamma^2}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-6382765b4ee26876)
with $v$ measured relative to the Euclidean-void rest frame. These equations are not assumed as completed dynamics; they are the response form the branch must derive from one Noether sea and assembly record.

In the absolute frame, the one-way photon legs along a longitudinal arm are unequal:
$$
t_{\to}=\frac{L_{\parallel}}{c_\gamma-v},
\qquad
t_{\leftarrow}=\frac{L_{\parallel}}{c_\gamma+v}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea8b6c9e55476905)
The one-way anisotropy is therefore real at the substrate level. The round-trip absolute time is
$$
t_{\mathrm{rt}}
=
t_{\to}+t_{\leftarrow}
=
\frac{2L_{\parallel}c_\gamma}{c_\gamma^2-v^2}
=
\frac{2L_0\gamma_\gamma}{c_\gamma}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-186350704ca944d0)
The moving assembly clock records
$$
\tau_{\mathrm{rt}}
=
\frac{t_{\mathrm{rt}}}{\gamma_\gamma}
=
\frac{2L_0}{c_\gamma}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-03da0b43cc65cbb9)
Thus the measurable two-way photon-channel speed is $c_\gamma$ even though the two one-way legs were asymmetric in absolute time. Einstein synchronization assigns the remote-clock reading by splitting this round trip; a Reichenbach-style one-way freedom remains, but embedded observers cannot extract the absolute anisotropy unless the clock, ruler, or signal-channel response leaves a residual in the preferred-frame leakage budget.

Slow clock transport supplies an independent synchronization route. A clock carried adiabatically between two endpoints must agree with the Einstein-synchronized endpoint clock in the zero-transport-speed limit, with any surviving $O(\beta_\star)$ discrepancy retained as a clock-law leakage row. Agreement is not guaranteed by two-way optical isotropy alone because the transported clock samples the moving-assembly cadence throughout its path.

The conditional lemma applies to a contractible out-and-back path in one synchronization patch. It does not set a rotating closed loop to zero. For a loop with area vector $\mathbf A_{\mathrm{loop}}$ and angular velocity $\boldsymbol\Omega_{\mathrm{rot}}$, the observer-level Sagnac comparison has the nonzero leading target
$$
\Delta t_{\mathrm{Sag}}
=
\frac{4\boldsymbol\Omega_{\mathrm{rot}}\cdot\mathbf A_{\mathrm{loop}}}{c_\gamma^2}
+
\mathcal R_{\mathrm{Sag}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-1135d58bf9c5038b)
The same clock, ruler, and photon record must recover this loop residual while keeping the contractible two-way anisotropy row small. Treating synchronization reabsorption as a global cancellation around rotating loops would therefore fail the observer map.

This lemma proves only a conditional reabsorption statement: if one branch supplies the square-root ruler law and the square-root clock law, then the two-way optical row self-nulls. It does not prove that the Noether sea response yields those laws. Any deviation in $L_{\parallel}$, $d\tau/dt_{\mathrm{eff}}$, or $c_\gamma$ becomes one of the leakage residuals below.

The same caution applies to speed identification. Let $c_{\mathrm{clk}}$ denote the limiting speed that appears in the moving-assembly clock law and let $c_\gamma$ denote the photon-channel speed used for synchronization. The conditional reabsorption above requires $\gamma_{\mathrm{clk}}=\gamma_\gamma$ in the tested homogeneous branch. If a primitive calculation supplies $\gamma_f(v)$ using $c_f$ while the photon row uses $\gamma_\gamma(v)$ with a different speed, the mismatch appears as an $O(\beta_\star^2)$ two-way residual rather than as Lorentz closure. The accepted target is therefore common-mode dressing: the observer-facing clock, ruler, photon, and effective gravitational channels must share the same homogeneous limiting speed after the Noether sea response is declared. It is not legitimate to collapse $c_f$, $c_\gamma$, $c_{\text{eff}}$, and $c_{\mathrm{GW}}^{\mathrm{eff}}$ by notation before that derivation is supplied.

### Weak-homogeneous speed-factorization lemma

The observer-channel coincidence and the relation to primitive wake speed are two distinct closure statements. Let $W_0$ be a weak homogeneous calibration cell and define
$$
\chi_{\mathrm{sea},0}
\equiv
\chi_{\mathrm{sea}}(W_0)
=
\frac{c_f}{c_{\mathrm{eff}}(W_0)},
\qquad
\chi_{\gamma,0}
\equiv
\chi_\gamma(W_0)
=
\frac{c_0}{c_\gamma(W_0)}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4a72dce3ed82f7a)
When $W_0$ realizes the asymptotic observer calibration, $c_{\mathrm{eff}}(W_0)=c_0$ by the definition $c_0\equiv c_{\mathrm{eff}}(\infty)$. The speed factorization is then
$$
c_{\mathrm{eff}}(W_0)
=
c_0
=
\frac{c_f}{\chi_{\mathrm{sea},0}},
\qquad
c_\gamma(W_0)
=
\frac{c_0}{\chi_{\gamma,0}}
=
\frac{c_f}{\chi_{\mathrm{sea},0}\chi_{\gamma,0}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-70436f175ac6ea79)

Plainly: calibrating clocks and rulers fixes how the dressed observer speed compares with $c_f$; photon Gate A separately decides whether the photon channel shares that calibrated speed. Equality of the observer channels does not by itself remove the Noether sea dressing between their common value and the primitive wake speed.

It follows immediately that
$$
c_\gamma(W_0)
=
c_{\mathrm{eff}}(W_0)
=
c_0
\quad\Longleftrightarrow\quad
c_{\mathrm{eff}}(W_0)=c_0
\ \text{and}\
\chi_{\gamma,0}=1.
$$

[View →](../../../../equation-mapping.html#corpus-equation-fe8a1658646aa56e)
Plainly: the selected cell must actually realize the asymptotic clock-and-ruler calibration, and the photon channel must have no residual offset from that calibration.

The first condition says that the selected cell is the asymptotic weak homogeneous calibration state. The second is the photon common-mode condition. For a finite leakage budget, define
$$
r_0
\equiv
\frac{c_{\mathrm{eff}}(W_0)}{c_0}-1,
\qquad
r_{\gamma\mathrm{e}}
\equiv
\frac{c_\gamma(W_0)}{c_{\mathrm{eff}}(W_0)}-1.
$$

[View →](../../../../equation-mapping.html#corpus-equation-62c33f24bdbf0876)
Then the exact composition identity is
$$
\frac{c_\gamma(W_0)}{c_0}-1
=
r_0+r_{\gamma\mathrm{e}}+r_0r_{\gamma\mathrm{e}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-0f2dd36984b0bc7b)
Theorem G requires both residuals to come from the same retained Noether sea and branch record and to remain inside the declared channel bounds. A numerical cancellation in their sum does not establish structural closure if the two residuals were fitted independently.

Plainly: exact three-speed coincidence requires both calibration closure and photon-to-clock/ruler closure. Approximate coincidence is controlled by two named residuals whose product is retained rather than hidden inside one fitted error bar.

The remaining relation to primitive wake speed is
$$
\frac{c_0}{c_f}
=
\frac{1}{\chi_{\mathrm{sea},0}},
\qquad
\delta_0
\equiv
1-\frac{c_0}{c_f}
=
1-\frac{1}{\chi_{\mathrm{sea},0}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-79ac9cbee34e4549)
In normalized wake-speed units with $c_f=1$, the same row is
$$
c_0
=
\chi_{\mathrm{sea},0}^{-1},
\qquad
c_\gamma(W_0)
=
\left(\chi_{\mathrm{sea},0}\chi_{\gamma,0}\right)^{-1}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-383befaabdb6aa2e)
Plainly: once $c_f$ is set to one, the two delay factors themselves determine the dressed clock/ruler calibration and the photon-channel speed.

Therefore all four speeds coincide only under the additional undressed fixed-point condition $\chi_{\mathrm{sea},0}=1$. A persistent weak-homogeneous dressing with $\chi_{\mathrm{sea},0}>1$ instead gives $c_f>c_0$ while preserving $c_\gamma=c_{\mathrm{eff}}=c_0$ at the observer level. The case $\chi_{\mathrm{sea},0}<1$ would make the record-bearing observer channel outrun the primitive causal-wake support and is inadmissible under the present causal-front definition unless a separate support theorem shows that no record is available before the $c_f$ front.

On the proportional-collapse candidate in photon Gate A, common-mode closure gives
$$
d(\omega,\delta_0)
\sim
\Lambda_\gamma\frac{c_f-c_0}{\omega}
=
\Lambda_\gamma\frac{c_f\delta_0}{\omega}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c9417a9bbabf8935)
Plainly: on this candidate, the planar-pair separation is proportional to the gap between primitive wake speed and the common observer speed.

Thus the exact undressed limit $\chi_{\mathrm{sea},0}\to1$ forces $d\to0$ on that candidate at fixed finite $\omega$, whereas a finite-separation branch requires either $\chi_{\mathrm{sea},0}>1$ or a separately derived phase-locking cancellation. This is a conditional consequence of the current Gate A scaffold, not evidence that the photon branch exists or that $c_f>c_0$ has been measured.

> Claim grade: derived. The factorization, coincidence criterion, and residual-composition identity follow algebraically from the declared speed definitions. Falsifier: a same-record retained branch that satisfies the declared definitions while violating any of those identities.
>
> Claim grade: inferred. The present record-bearing causal-front definition requires $\chi_{\mathrm{sea},0}\ge1$. Falsifier: an accepted channel with $c_0>c_f$ that still produces no record before the primitive $c_f$ support.
>
> Claim grade: guessed. The proportional-collapse Gate A branch is a candidate physical realization. Falsifier: failure to retain that photon branch, or a finite-separation Gate A branch at $c_\gamma=c_f$ produced by a different phase-locking cancellation.

The same criterion has a long-baseline photon consequence. If the photon branch uses a frequency-dependent delay factor, then a distant transient comparison accumulates
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf X,T)
-
\chi_\gamma(\omega_b,\mathbf X,T)
}{c_0}\,d\ell
$$

[View →](../../../../equation-mapping.html#corpus-equation-19da2840491b6500)
Operational Lorentz closure therefore requires this residual to vanish, or remain below the declared timing bound, in the same weak homogeneous branch that supplies $c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})$. It is not enough to recover local two-way isotropy while leaving cosmological photon timing to a separately tuned channel record.

### Round-trip anisotropy cancellation through $O(\beta_\star^4)$

Let arm lengths in the preferred frame be written using the declared two-way signal channel speed, with $\beta_\star=v/c_\star$:
$$
\frac{L_{\parallel}}{L_0}=1+\alpha_2\beta_\star^2+\alpha_4\beta_\star^4+O(\beta_\star^6)\qquad
\frac{L_{\perp}}{L_0}=1+b_2\beta_\star^2+b_4\beta_\star^4+O(\beta_\star^6)
$$

[View →](../../../../equation-mapping.html#corpus-equation-107c747c6c80bf56)
Round-trip absolute times are
$$
t_{\parallel}
=\frac{2L_{\parallel}c_\star}{c_\star^2-v^2}
=\frac{2L_0}{c_\star}\left[
1+(1+\alpha_2)\beta_\star^2+(1+\alpha_2+\alpha_4)\beta_\star^4+O(\beta_\star^6)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-50ceade98262129e)
$$
t_{\perp}
=\frac{2L_{\perp}}{\sqrt{c_\star^2-v^2}}
=\frac{2L_0}{c_\star}\left[
1+\left(b_2+\frac{1}{2}\right)\beta_\star^2
+\left(b_4+\frac{b_2}{2}+\frac{3}{8}\right)\beta_\star^4
+O(\beta_\star^6)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-2098478090567c03)
Define the normalized anisotropy mismatch
$$
\Delta_{\text{tw}}(\beta_\star)\equiv \frac{t_{\parallel}-t_{\perp}}{2L_0/c_\star}
=A_2\beta_\star^2+A_4\beta_\star^4+O(\beta_\star^6)
$$

[View →](../../../../equation-mapping.html#corpus-equation-58004c37fa4cb837)
with
$$
A_2=\alpha_2-b_2+\frac{1}{2}
\qquad
A_4=\alpha_4-b_4+\alpha_2-\frac{b_2}{2}+\frac{5}{8}
$$

[View →](../../../../equation-mapping.html#corpus-equation-321429e9811b665c)
Operational isotropy through $O(\beta_\star^4)$ requires
$$
A_2=0\qquad A_4=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-d2e63b3d906b942d)
In the transverse-gauge choice $b_2=b_4=0$, this yields
$$
\alpha_2=-\frac{1}{2}\qquad \alpha_4=-\frac{1}{8}
$$

[View →](../../../../equation-mapping.html#corpus-equation-90b83b9ff89b0f16)
which is precisely $L_{\parallel}=L_0/\gamma_\star+O(\beta_\star^6)$.

## Derivation Program

### Stage A: binary analytic benchmark

Start with a single causal path-history binary under constant group velocity $\mathbf V$. Derive:

1. Existence and stability of periodic or quasi-periodic attractors.
2. Closed-form or asymptotic estimates for $(a_{\parallel}/a_{\perp})(\beta_f)$.
3. First nonzero leakage coefficients in the $\beta_f$ expansion.

### Stage B: Coincident-Midpoint Orthogonal-Axis Braid Full Closure

Promote to a coincident-midpoint orthogonal-axis braid with coupled circulation scales. Establish:

1. Persistence of aligned attractor family under group velocity.
2. Factorization or controlled coupling of 1/2/3 period shifts.
3. Emergent universal $\gamma_f$-law independent of axial-structure details, within a defined class.

### Stage C: continuum handoff

Derive coarse-grained kinematic constitutive relations used by effective metric models:
$$
\mathcal{K}_{\text{micro}} \Longrightarrow \mathcal{K}_{\text{eff}}(v,n,\nabla n,\dots)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d602ac96c7d6c786)
so local assembly kinematics and macroscopic refractive geometry are mathematically linked.

### Stage D: effective-medium and weak-field closure sequence

To connect the two-channel deformation model to observables, use the following sequence:

1. Single-braid constitutive closure: derive or fit-test $R_\perp(E)$ and induced $\xi(E,\beta_\star)$ from causal path-history coincident-midpoint orthogonal-axis braid dynamics.
2. Effective-medium propagation law: construct $n_{\text{eff}}(\xi,\lambda,n)$ for signal transport through deformed Noether braid populations.
3. Effective metric extraction: build $g_{\mu\nu}^{\text{eff}}$ from medium variables and preferred-frame structure.
4. Weak-field consistency checks: verify Newtonian limit and required post-Newtonian behavior in the operational observer sector.
5. Strong-field/cosmology consistency checks: test horizon-adjacent and expansion-regime implications of the same constitutive channels.

### Effective connection and geodesic emergence

Given $g_{\mu\nu}^{\text{eff}}$ from [Algebraic Effective Metric Map from the Handoff Tuple](#algebraic-effective-metric-map-from-the-handoff-tuple), define
$$
\Gamma^\lambda_{\mu\nu}
=\frac{1}{2}g^{\lambda\rho}_{\text{eff}}
\left(
\partial_\mu g_{\rho\nu}^{\text{eff}}
+\partial_\nu g_{\rho\mu}^{\text{eff}}
-\partial_\rho g_{\mu\nu}^{\text{eff}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-176f8477239e1960)
Geodesic flow in the observer sector is
$$
\frac{d^2x_{\mathrm{eff}}^\lambda}{d\tau^2}
+\Gamma^\lambda_{\mu\nu}
\frac{dx_{\mathrm{eff}}^\mu}{d\tau}\frac{dx_{\mathrm{eff}}^\nu}{d\tau}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-2a5eb27c1cda7d69)

For small group speed, slowly varying Noether sea flow, and quasi-static fields in a local Noether sea rest frame, define
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)\equiv c_0^2\ln\!\big(\Omega(n,\lambda)\,\xi\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8f685ec931d91e8f)
The $c_0^2$ prefactor marks this as an observer-sector potential calibration: $c_0$ is the declared observer-sector speed, and the $c_f\to c_0$ normalization is an obligation of the dressing map, not an input identity. Any residual $c_f$-vs-$c_0$ mismatch in this branch is bounded by the same $\epsilon_{\mathrm{LV}}$ budget that the structural-integrity closure target must drive below the experimental rows above; it is not assumed small here. Then the nonrelativistic geodesic limit becomes
$$
\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}
=-\xi^{2}(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(\frac{\|\mathbf V\|^2}{c_0^2},\epsilon_{\text{LV}}\right)
=-(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}
+O\!\left(
\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|,
\frac{\|\mathbf V\|^2}{c_0^2},
\epsilon_{\text{LV}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1fce4564cb78218b)
with explicit source channels
$$
\nabla \Phi_{\text{eff}}
=c_0^2\left[
\partial_{\ln n}\ln\Omega\ \nabla\ln n
+\partial_{\ln \lambda}\ln\Omega\ \nabla\ln \lambda
+\nabla\ln\xi
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-19d6ac4b6158ef3d)
Thus gradients of $n$ and $\lambda$ (and kinematic $\xi$ gradients) enter the affine structure as the apparent-gravity source terms.

The eikonal/least-time handoff is then:
$$
\delta\!\int_{\Gamma} n_{\text{eff}}(x)\,ds=0
\quad\Longleftrightarrow\quad
\nabla_{\dot{x}}\dot{x}=0\ \text{under}\ g_{\mu\nu}^{\text{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ab3e1db82de78f3d)
in the weak-field refractive regime.

### Coefficient-extraction and closure estimators

For each simulated group speed, keep the channel label explicit. Primitive branch calculations use $\beta_f=v/c_f$; dressed observer-channel fits use $\beta_\star=v/c_\star$ after the dressing map is declared. Extract from long-window attractor statistics:
$$
\hat{\alpha}_j\equiv \frac{a_{\parallel,q}(\beta_j)}{a_{\perp,q}(\beta_j)}\qquad
\hat{\tau}_j\equiv \frac{P_q(\beta_j)}{P_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d4bd80ddc6657454)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

Fit even-power truncations
$$
\hat{\alpha}(\beta_f)=1+\hat{\alpha}_2\beta_f^2+\hat{\alpha}_4\beta_f^4\qquad
\hat{\tau}(\beta_f)=1+\hat{\tau}_2\beta_f^2+\hat{\tau}_4\beta_f^4
$$

[View →](../../../../equation-mapping.html#corpus-equation-0ba893bbd9a95890)
Lorentz closure at this order requires
$$
\hat{\alpha}_2=-\frac{1}{2}\quad \hat{\alpha}_4=-\frac{1}{8}\qquad
\hat{\tau}_2=\frac{1}{2}\quad \hat{\tau}_4=\frac{3}{8}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cfb953664cd2a982)
Define closure residuals on a primitive calibration band $0\le\beta_f\le\beta_{\max}$, or on the dressed band after replacing $\beta_f$ by $\beta_\star$ and $\gamma_f$ by $\gamma_\star$:
$$
R_\xi^{(q)}(\beta_f)
\equiv
\hat{\alpha}(\beta_f)-\frac{1}{\gamma_f(\beta_f)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dca39a147c86d181)
$$
R_T^{(q)}(\beta_f)
\equiv
\hat{\tau}(\beta_f)-\gamma_f(\beta_f)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b18bbe6a441f08f5)
The reported leakage scores are
$$
\mathcal{E}_{\text{shape}}
\equiv
\sup_{0\le \beta_f\le \beta_{\max}}
\left|R_\xi^{(q)}(\beta_f)\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-c3d7a23411bc3cfa)
$$
\mathcal{E}_{\text{clock}}
\equiv
\sup_{0\le \beta_f\le \beta_{\max}}
\left|R_T^{(q)}(\beta_f)\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-8437d4d4eb32cbd1)
For two-way anisotropy, fit
$$
\Delta_{\text{tw}}(\beta_f,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_f)\cos(2m\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-419b78e91547d646)
and enforce
$$
\sup_{0\le \beta_f\le \beta_{\max}}|\mathcal{A}_{2m}(\beta_f)|\le C_m\epsilon_{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-32aa03e3cd8055b7)

### Analytic derivation of kinematic closure coefficients

On the circular benchmark branch, take the rest-frame attractor $\boldsymbol{\rho}^\star(s;0)$ as a stable planar orbit of radius $r_0$ and frequency $\omega_0$. Phase symmetry $\phi\mapsto\phi+\text{const}$ supplies a neutral phase direction, but it does not by itself supply a conserved transverse action on a strictly attracting delayed orbit. For a near-integrable conservative oscillator one may define
$$
J=\oint \mathbf{p}_{\text{eff}}\cdot d\mathbf{r}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b8a4f8d548123c6)
and obtain $J_i\propto \sqrt{K_i}\,A_i^2$, so fixed action would imply
$$
A_i(\beta_f)=A_i(0)\left(\frac{K_i(0)}{K_i(\beta_f)}\right)^{1/4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d33414b67bf38206)
This is the $p=1/4$ comparison route, not an attractor theorem. Fixed energy instead gives $p=1/2$. For the admitted delay-Floquet branch, the valid route is to measure the settled amplitudes directly from $\boldsymbol\rho^\star(s;\beta_f)$ and extract
$$
p_i^{\mathrm{att}}(\beta_f)
\equiv
-\frac{d\ln A_i}{d\ln K_i}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-d42ae667eeb261a6)
The constant-$p$ coefficient family in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) is usable only on a band where $p_\parallel^{\mathrm{att}}$ and $p_\perp^{\mathrm{att}}$ agree within the declared leakage tolerance.

The simplest scalar kernel is useful mainly because it fails in a controlled way. For translation $\mathbf V=v\hat{\mathbf e}_{\parallel}$ with primitive $\beta_f=v/c_f$, suppose one tries the causal-delay potential form
$$
\mathcal{U}_{\text{eff}}(\mathbf{r};\beta_f)
=
\frac{\kappa\,\epsilon^2}{r_{\text{cd}}\!\left(1-\boldsymbol{\beta}_f\cdot \hat{\mathbf{n}}_{\text{cd}}\right)}
\qquad
\boldsymbol{\beta}_f\equiv \frac{\mathbf V}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-efdb8c02fcae0f28)
Define stiffness by cycle-averaged Hessian evaluation on $\boldsymbol{\rho}^\star(s;\beta_f)$:
$$
K_{ab}(\beta_f)
=
\left\langle
\frac{\partial^2 \mathcal{U}_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fde0c6663ec33d84)
Naively expanding the causal-delay closure
$$
\Delta=\frac{\|\mathbf r+\mathbf V\Delta\|}{c_f}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4dcb61d581ce4ea-2)
and projecting longitudinal/transverse channels would suggest integrals of the form
$$
\mathcal{I}_{\parallel}(\beta_f)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\cos^2\theta}{(1-\beta_f\cos\theta)^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-75b39e00fab954aa)
$$
\mathcal{I}_{\perp}(\beta_f)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\sin^2\theta}{(1-\beta_f\cos\theta)^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f5bacf33b9a0f428)
This naive block is not a derivation of a Lorentz-matching vector. With the displayed normalization it gives positive normalized stiffness growth in both channels, whereas every positive-$p$ member of the matched family requires $\ell_2<0$. Any sign reversal would require an additional channel normalization that is not present in the scalar kernel. The block is therefore a failure diagnostic: the target vector must come from the completed action kernel on the same causal-root ledger, with branch phase closure and the measured attractor-amplitude response included before the stiffness derivatives are taken.

The valid theorem target keeps the [Stiffness Tensor from Causal-Wake Surface Integrals](#stiffness-tensor-from-causal-wake-surface-integrals) extraction rules,
$$
k_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_2=
\frac{\partial_{\beta_f}^2\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1628aeba6a8bb5ef)
$$
k_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\parallel}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_4=
\frac{\partial_{\beta_f}^4\mathcal{I}_{\perp}\big|_{\beta_f=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2152503adc67f7d7)
but now requires the branch-action integrals $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ to be computed from the completed delayed action and the admitted moving branch chart. Conditional on a common constant amplitude exponent $p>0$, the Lorentz-matching closure condition is
$$
(k_2,\ell_2,k_4,\ell_4)
=
\left(
\frac{1/3-p}{p},
-\frac{p+1/6}{p},
\frac{1-3p}{18p^2},
\frac{6p+1}{72p^2}
\right).
$$

[View →](../../../../equation-mapping.html#corpus-equation-74c7784c2fea13a5)
The target vector is not a fit parameter, but neither may $p$ be selected to rescue a failed kernel. A valid derivation must show that the completed action kernel, the causal-root ledger, branch phase closure, and evolved attractor response together yield both $p$ and the derivative identities above on the same branch.

### Causal-root ledger progression as a Lorentz prediction

The coefficient calculation above suggests a sharper interpretation of the Lorentz closure problem. In standard observer physics, the Lorentz formulas are usually treated as kinematic consequences of invariant signal speed and the relativity principle. In this chapter they are instead treated as emergent observer-level consequences of a delayed assembly dynamics. The additional $\mathbb{A}\mathbb{A}\mathbb{A}$ prediction is that the Lorentz coefficients are not merely smooth deformation coefficients. They should be generated by the same branch-chart structure that later appears, after coarse-graining, as discrete quantum behavior.

The ordinary version is this: a clock or ruler does not obey Lorentz behavior because a formula has been assigned to it. It is a physical assembly with delayed causal roots, stable branch records, and Noether sea coupling. If Lorentz behavior is real in this architecture, the measured smooth law must be the exported average of those retained branch records, not a coordinate rule pasted onto the substrate afterward.

Stated more strongly, the novel claim is a branch-quantized Lorentz response. This does not mean that the algebraic function
$$
\gamma_\star(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9c3d3e888adb198e)
is replaced everywhere by a step function. It means that a physical clock or ruler can realize Lorentz behavior only through stable branch charts whose causal-root ledgers are integer objects. For a stable branch class $q$, define the realized clock and ruler Lorentz factors by
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta_\star)\equiv \frac{P_q(\beta_\star)}{P_0}
\qquad
\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)\equiv \frac{R_{\perp,q}(\beta_\star)}{R_{\parallel,q}(\beta_\star)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4d9b4fc71f0a7889)

Here $P_0$ is the reference cycle period of the same declared clock branch. $P_q$ is the cycle period of clock branch $q$.

The branch-quantization claim is that the admissible material responses at fixed background conditions form the ledger-indexed set
$$
\Gamma_{\mathrm{adm}}(\beta_\star)
=
\left\{
\big(\gamma_{\mathrm{clk}}^{(q)}(\beta_\star),\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)\big)
:
q\in\mathcal{Q}_{\mathrm{stable}}(\beta_\star)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b153c702537b9b60)
where $\mathcal{Q}_{\mathrm{stable}}(\beta_\star)$ is the set of stable causal-root ledger classes. The observer-level Lorentz factor is recovered only when the active branch family, hierarchy averaging, and Noether sea dressing collapse this set to a universal effective value:
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta_\star)
=
\gamma_{\mathrm{rul}}^{(q)}(\beta_\star)
=
\gamma_\star(\beta_\star)+O(\epsilon_{\mathrm{LV}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-5f4164f133883d97)
for all admitted clock/ruler assemblies in the tested homogeneous regime. Thus $\gamma_\star$ remains the continuous effective envelope measured by Physical Observers, while the substrate implementation is quantized by admissible causal-root ledgers. If this is correct, residual deviations from exact Lorentz closure should carry branch-spectrum signatures rather than arbitrary smooth phenomenological drift.

In this chapter, the native formulation of this idea is the progression of the causal-root ledger. This progression is the ordered change, under a control parameter such as the group-speed ratio $\beta_f$, of the active causal-root ledger
$$
\mathcal{L}_{\mathrm{root}}(\beta_f)
=
\left\{
(a,b,m,T,T_{t,m},J_{ab}^{(m)},\sigma_{ab}^{(m)})
:
m\in\mathcal{R}^{\mathrm{act}}_{ab}(\beta_f)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-589241dc03358be4)
Here $a$ is the receiver, $b$ is the source, $m$ labels an active delayed branch, $T_{t,m}$ is the emission time, $J_{ab}^{(m)}$ is the causal Jacobian, and $\sigma_{ab}^{(m)}$ records the interaction sign or channel orientation used by the local branch chart. The ledger is quantum-facing because stable assembly states depend on integer branch counts, separator events, and admissible self-hit / partner-hit histories. It is Lorentz-facing because the same roots determine the cycle-averaged stiffness tensor and clock period.

At a generic transverse transmitter-side fold, the two newborn roots have acceleration magnitude proportional to $|T-T_\ast|^{-1/2}$. This divergence is locally integrable: the impulse across a shrinking window tends to zero, velocity remains continuous, and position remains $C^1$. Any finite observable change comes from the newborn branch persisting after the fold, not from the singular instant. This statement does not cover tangential crossings, repeated fold accumulation, simultaneous collision singularities, nonunique ledger continuation, or a numerical method that samples the singular point directly.

> Claim grade: **derived local integrability** for a generic transverse positive-separation fold; no global continuation or branch claim follows.

The local prediction can be stated as a closure condition. There must exist one admissible branch-chart class $\mathfrak{B}_{\mathrm{mov}}(\beta_f)$ on a group-speed band $0\le\beta_f\le\beta_{\max}$ such that
$$
K_{ab}(\beta_f)
=
\left\langle
\sum_{(a,b,m)\in\mathcal{L}_{\mathrm{root}}(\beta_f)}
\partial_a\partial_b
\mathcal{U}_{ab}^{(m)}(T;\beta_f,\eta)
\right\rangle_{\mathrm{cyc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d30eb932c239d1af)
and the extracted coefficient vector
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
\equiv
(k_2,\ell_2,k_4,\ell_4)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b15aa622468d48d6)
satisfies the ansatz-conditional target
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
=
\mathbf c_{\mathrm L}^{(p)}
+O(\epsilon_{\mathrm{br}}+\epsilon_{\mathrm{hier}}+\epsilon_{\mathrm{reg}}+\epsilon_p)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7cfe430a7722a05d)
where
$$
\mathbf c_{\mathrm L}^{(p)}
\equiv
\left(
\frac{1/3-p}{p},
-\frac{p+1/6}{p},
\frac{1-3p}{18p^2},
\frac{6p+1}{72p^2}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-66683edaf2a83368)
and the same evolved branch must supply the common exponent $p$. The error terms have distinct jobs. $\epsilon_{\mathrm{br}}$ measures branch-chart incompleteness or missed active roots, $\epsilon_{\mathrm{hier}}$ measures coincident-midpoint orthogonal-axis braid hierarchy leakage away from the binary benchmark, $\epsilon_{\mathrm{reg}}$ measures finite-$\eta$ regularization error, and $\epsilon_p$ measures uncertainty or longitudinal/transverse mismatch in the extracted attractor-amplitude exponent. This condition is stronger than fitting $L_{\parallel}=L_0/\gamma_f$ and $P(v)=\gamma_f P_0$. It says the fitted coefficients must be traceable to active causal roots with no independent Lorentz postulate and no per-observable retuning.

This gives a possible prediction of the framework. If Lorentz behavior is rooted in causal-root progression, then the first nonzero deviations from exact Lorentz closure should not be arbitrary smooth functions of speed. They should inherit the structure of branch charts: smooth even-power group velocity terms inside a fixed chart, plus localized or resonant leakage near separator events, small-divisor interlayer resonances, or changes in admissible root multiplicity. In a nonresonant chart the leakage should obey
$$
\left\|
\mathbf{c}_{\mathrm{L}}(\beta_f)
-
\mathbf c_{\mathrm L}^{(p)}
\right\|_W
\le
C_{\mathrm{br}}\epsilon_{\mathrm{br}}
+C_{\mathrm{hier}}\epsilon_{\mathrm{hier}}
+C_{\mathrm{reg}}\epsilon_{\mathrm{reg}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ea04e9763216d8d6)
while near a chart-changing event the two-way anisotropy diagnostic should decompose into the ordinary Lorentz-canceling part plus a branch-sourced residual:
$$
\Delta_{\mathrm{tw}}(\beta_f,\theta)
=
\Delta_{\mathrm{tw}}^{\mathrm{smooth}}(\beta_f,\theta)
+
\sum_{r\in\mathcal{R}_{\mathrm{res}}}
B_r\,\mathcal{W}_r(\beta_f)\cos(2m_r\theta+\varphi_r)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0e7a568db46bd2fd)
Here each residual label $r$ must correspond to a named branch-chart feature: a separator approach, a small-divisor relation between layer frequencies, a finite-memory cutoff, a Jacobian-floor loss, or a root-ledger transition. A residual with no branch-chart source is not a successful prediction; it is either ordinary fitting error or an incomplete closure model.

The technology-facing status is therefore conditional. The immediate test is not necessarily a laboratory Lorentz-violation search. The first test is mathematical and computational: solve a controlled translating branch chart, extract $\mathcal{L}_{\mathrm{root}}(\beta_f)$, compute $K_{\parallel}$, $K_{\perp}$, $P(v)$, and $\Delta_{\mathrm{tw}}$, and verify that the same ledger produces the Lorentz coefficients and any residual sidebands. Only after a nonzero residual survives branch completion, hierarchy averaging, and $\eta\to0$ control does the question become an experimental one. If the predicted residual amplitude lies below existing clock, resonator, matter-interferometer, or photon-channel sensitivity, the theory remains constrained but not yet technology-testable. If a branch-sourced residual survives at an accessible scale, its signature should be more specific than a generic Lorentz-violation coefficient: it should carry the speed, orientation, material-channel, or medium-density dependence of the responsible branch-chart feature.

This also prevents overclaiming. This chapter does not prove that quantum mechanics causes special relativity. It states a narrower closure target: in $\mathbb{A}\mathbb{A}\mathbb{A}$, the discrete causal-root progression that supports quantum-facing assembly behavior must also generate the Lorentz formulas in the homogeneous weak-field observer limit. If the branch ledger produces quantum-like discreteness but fails to produce the Lorentz coefficient vector, then the proposed common mechanism fails. If it produces the Lorentz vector only by tuning a separate clock law, ruler law, or photon speed for each observable, the Lorentz bridge also fails.

### Coincident-Midpoint Orthogonal-Axis Braid Adiabatic Decoupling Bound

Conditional lemma target: this bound assumes the Theorem A translating attractor exists and the nonresonance condition holds; the averaging computation below is an open obligation, not a completed proof.

Let
$$
\mathbf{c}^{(2)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{binary}}
\qquad
\mathbf{c}^{(3)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\mathrm{cm}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9259e10c5c1f9b38)
and define
$$
\mathcal{D}_{23}\equiv
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_W
\qquad
\|x\|_W^2\equiv x^\top W x,\ W\succ 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-3d4a190126c83c89)
For the source record's indexed rows $(1,2,3)$, decompose the binary-3 channel stiffness in the coupled coincident-midpoint orthogonal-axis braid system into its isolated binary contribution plus cross-binary corrections:
$$
K_{ab}^{(3),\mathrm{cm}}
=
K_{ab}^{(3),\mathrm{bin}}
+
\left\langle \frac{\partial^2\mathcal{U}_{3\leftrightarrow 2}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
+
\left\langle \frac{\partial^2\mathcal{U}_{3\leftrightarrow 1}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9bed17aa1348f5e3)
Under hierarchical separation
$$
\omega_1\gg \omega_2\gg \omega_3\qquad
r_1\ll r_2\ll r_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-17e4d6cb2a6bd9dd)
apply Hamiltonian averaging (Lie-Deprit transform) to eliminate fast phases. The monopole part renormalizes $\mathcal{I}_0$ only; the dipole contribution vanishes in the binary-1 center-of-mass frame; the leading anisotropic correction is quadrupolar and scales as $(r_2/r_3)^2$. This hierarchy is a declared source-record ordering, not a meaning of the persistent indices. Therefore
$$
\mathcal{D}_{23}
\le
C_Q\left(\frac{r_2}{r_3}\right)^2
+O\!\left(\left(\frac{r_1}{r_3}\right)^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-30aeca24081a0d32)
A sufficient closure condition is
$$
\left(\frac{r_2}{r_3}\right)^2\le C_{23}\epsilon_{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3c75e045779d86b3)
which yields
$$
\mathcal{D}_{23}\le C_{23}\epsilon_{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6e401508c72734b3)

### Spectral-decoupling vulnerability criterion

The [coincident-midpoint orthogonal-axis braid adiabatic decoupling bound](#coincident-midpoint-orthogonal-axis-braid-adiabatic-decoupling-bound) assumes Diophantine nonresonance:
$$
|m\omega_3-n\omega_2|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\quad
\forall\,m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$

[View →](../../../../equation-mapping.html#corpus-equation-2ba2631d1d764d51)
If this condition is violated so that
$$
|m\omega_3-n\omega_2|\lesssim \delta\omega_{\text{nl}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-da4cd1c48113cab9)
for small integers $(m,n)$ and nonlinear coupling width $\delta\omega_{\text{nl}}$, then small divisors invalidate the homological equations of the Lie transform. The resulting secular resonance destroys adiabatic decoupling, can break KAM tori, and drives $O(1)$ interlayer energy exchange. In that regime, coefficient drift can exceed the quadrupole estimate and local preferred-frame leakage can rise above $O(\epsilon_{\text{LV}})$ even when geometric hierarchy is large.

## Theorem Targets

### Theorem A0 (forward partner-root speed-limit lemma)

The primitive material speed-limit row has a kinematic upper-bound lemma before any detailed Noether braid deformation is solved. In a translating branch with constant group velocity $u\hat{\mathbf e}$, a retained partner row whose receiver lies ahead of its source by positive co-moving separation $d_{\parallel}\ge d_{\min}>0$ must satisfy
$$
c_f\Delta
=
\left\|
u\Delta\,\hat{\mathbf e}
+
\boldsymbol{\rho}_i(T)-\boldsymbol{\rho}_j(T-\Delta)
\right\|
\ge
u\Delta+d_{\min}
$$

[View →](../../../../equation-mapping.html#corpus-equation-33cbe02891c943aa)
and therefore
$$
\left(c_f-u\right)\Delta\ge d_{\min}
$$

[View →](../../../../equation-mapping.html#corpus-equation-48014b079bd07587)
No such forward partner root exists for $u\ge c_f$; for $u<c_f$ its required delay is at least $d_{\min}/(c_f-u)$. Thus a bound translating assembly whose structural closure requires leading-side partner rows cannot preserve its causal-root ledger at or above primitive field speed. This proves the upper-bound side
$$
c_{\mathrm{mat}}^{\mathrm{lim}}\le c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-76656ebe144c1e28)
for that class of material branches. The remaining Lorentz program is the constructive side: proving that stable branch families exist for $u<c_f$, that their deformation and periods approach the common envelope, and that Noether sea dressing maps the primitive bound to the observer-channel speeds without an independent fit.

### Theorem LK1 (translating binary Lorentz residual)

The first constructive test of Theorem G is the translating maximum-curvature binary benchmark defined in [Translating Binary Benchmark](#translating-binary-benchmark). Start from the declared reference rest binary (certificate packet pending; see the closure-packet contract in [Binary Dynamics](../dynamics/binary-dynamics.md)) with radius $R_0$, period $P_0$, active root ledger $b_0$, positive Jacobian floors, and bounded transmitter-side acceleration weights. For each $0<u<c_f$, solve the absolute-time delayed root equations for
$$
\mathbf X_{\sigma}(T)
=
u T\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(T))
$$

[View →](../../../../equation-mapping.html#corpus-equation-3aedcf8c510a9ac9)
on a retained deformed ledger $b_u$. The target is not merely existence. The branch must return the residual triple
$$
\mathcal{R}_{\mathrm{bin}}(u)
=
\left(
R_T^{\mathrm{bin}}(u),
R_{\xi}^{\mathrm{bin}}(u),
R_{\mathrm{shape}}^{\mathrm{bin}}(u)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8d48e7a7fa338629)
with either
$$
\mathcal{R}_{\mathrm{bin}}(u)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-e1a119b666989832)
on the primitive branch, or a controlled residual whose source is a named causal-root feature: a branch transition, small Jacobian floor, finite-memory cutoff, shape-mode excitation, or Noether sea dressing row.

This calculation decides whether the first available internal clock and ruler obey primitive FitzGerald contraction and clock dilation:
$$
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
=
\frac{1}{\gamma_f(u)},
\qquad
\frac{P_u}{P_0}
=
\gamma_f(u),
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbf617e413a705ad)

Here $P_u$ is the cycle period of the translating binary at group speed $u$.

If these equalities hold on the same branch ledger, the Lorentzian compensation has been derived for the two-body clock rather than asserted. If they fail, the residual is the earliest foundation-level falsification pressure: it marks exactly where the primitive kernel departs from Lorentzian matter behavior before Noether braid averaging or Noether sea dressing is allowed to repair anything.

### Theorem A (attractor existence at constant group velocity)

Target (unproved). For admissible coupling and regularization parameters, there exists a bounded translating attractor family for binary and coincident-midpoint orthogonal-axis braid systems for $\|\mathbf V\|<c_f$.

### Theorem B (anisotropic deformation law)

Target (unproved). Let $\beta_\star=v/c_\star$ and $\gamma_\star=(1-\beta_\star^2)^{-1/2}$ for the declared observer channel.

On the attracting manifold, principal-axis deformation obeys
$$
\frac{a_{\parallel}}{a_{\perp}}
=1-\frac{1}{2}\beta_\star^2-\frac{1}{8}\beta_\star^4+R_1(\beta_\star)
\qquad
|R_1(\beta_\star)|\le C_1\epsilon_{\text{LV}}\,\beta_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-3ae71bba080763f6)
equivalently
$$
\frac{a_{\parallel}}{a_{\perp}}=\frac{1}{\gamma_\star}+R_1(\beta_\star)
$$

[View →](../../../../equation-mapping.html#corpus-equation-433717c211e9e89a)

### Theorem C (clock renormalization law)

Target (unproved). Fundamental period satisfies
$$
\frac{P(v)}{P_0}
=1+\frac{1}{2}\beta_\star^2+\frac{3}{8}\beta_\star^4+R_2(\beta_\star)
\qquad
|R_2(\beta_\star)|\le C_2\epsilon_{\text{LV}}\,\beta_\star^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b9c0d5d143d9027)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

equivalently
$$
\frac{P(v)}{P_0}=\gamma_\star+R_2(\beta_\star)
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3450fe89526f848)

### Theorem D (operational Lorentz closure)

Target (unproved). For composite observers formed from this assembly class, two-way kinematic observables satisfy
$$
\Delta_{\text{tw}}(\beta_\star,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_\star)\cos(2m\theta)
\qquad
|\mathcal{A}_{2m}(\beta_\star)|\le C_m\epsilon_{\text{LV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2b8f974b3a0eaaf6)
uniformly on $0\le\beta_\star\le\beta_{\max}$.

### Theorem E (coefficient identifiability from attractor statistics)

For the constant-$p$ response family with $p\ne0$, write the measured expansions as
$$
\frac{a_\parallel}{a_\perp}
=1+\alpha_2\beta_f^2+\alpha_4\beta_f^4+O(\beta_f^6),
\qquad
\frac{P}{P_0}
=1+\tau_2\beta_f^2+\tau_4\beta_f^4+O(\beta_f^6).
$$

[View →](../../../../equation-mapping.html#corpus-equation-367847d668776ced)

Here $P$ is the cycle period of the declared clock branch, evaluated at the group-speed argument shown. $P_0$ is the reference cycle period of the same declared clock branch.

The coefficient map
$$
(k_2,\ell_2,k_4,\ell_4)\mapsto (\alpha_2,\alpha_4,\tau_2,\tau_4)
$$

[View →](../../../../equation-mapping.html#corpus-equation-88db047b3f8ad4bd)
has block-triangular Jacobian with
$$
\det
\frac{\partial(\alpha_2,\alpha_4,\tau_2,\tau_4)}
{\partial(k_2,\ell_2,k_4,\ell_4)}
=-\frac{p^2}{4}\ne0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-99407662aca6606e)
The inverse-function theorem therefore gives local identifiability of the four stiffness coefficients from shape and period data, up to the leakage scale $O(\epsilon_{\text{LV}})$, once $p$ has been independently extracted from the same attractor family. This is a proved algebraic property of the ansatz, not proof that a physical moving branch exists or that its amplitude response has constant $p$.

### Theorem F (cross-regime universality of closure coefficients)

If binary and coincident-midpoint orthogonal-axis braid attracting branches exist, are smooth in $\beta_f$, share the same coarse-grained causal kernel class, and satisfy nonresonant hierarchy
$$
\omega_1\gg \omega_2\gg \omega_3\qquad
|m\omega_3-n\omega_2|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\ \ \forall\ m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$

[View →](../../../../equation-mapping.html#corpus-equation-e7ac812a1ca531cb)
then their extracted closure vectors satisfy
$$
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_{W}
\le
C_Q\left(\frac{r_2}{r_3}\right)^2
+O\!\left(\left(\frac{r_1}{r_3}\right)^2\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2b1d71a4806dde72)
In particular, if $(r_2/r_3)^2\le C_{23}\epsilon_{\text{LV}}$, operational Lorentz closure is universal across these two micro-regimes up to preferred-frame leakage.

### Theorem G (structural-integrity common-limit closure)

This theorem is the parent Lorentz-closure target for Theorems B-D, the photon synchronization row, and the weak-field gravitational-wave speed row. Theorem A0 supplies the primitive kinematic obstruction: a material branch that needs forward partner-hit closure cannot have a sustained translating ledger with $c_{\mathrm{mat}}^{\mathrm{lim}}>c_f$. Theorem LK1 supplies the first constructive clock/ruler decision surface by asking whether the translating two-body branch returns $R_T^{\mathrm{bin}}=0$ and $R_{\xi}^{\mathrm{bin}}=0$ before Noether braid averaging or Noether sea dressing is invoked. In the weak homogeneous observer branch, a retained material assembly branch closes only if the matter-assembly limiting speed, the Noether sea dressed clock/ruler speed, the photon-channel speed, and the empirical calibration speed obey
$$
c_{\mathrm{mat}}^{\mathrm{lim}}
=
c_{\text{eff}}
=
c_\gamma
=
c_0
+O(\epsilon_{\text{LV}}c_0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3e0abb9122cce02b)
on the same causal-root ledger. The same branch record must then supply the longitudinal deformation $a_\parallel/a_\perp=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, clock cadence $d\tau/dt_{\mathrm{eff}}=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, two-way signal residual $\Delta_{\text{tw}}=O(\epsilon_{\text{LV}})$, and the gravitational-wave speed residual $|c_{\mathrm{GW}}/c_\gamma-1|\le\epsilon_{\mathrm{GW}}$ in the weak-field TT channel. Closure fails if the photon speed, gravitational-wave speed, material limiting speed, or deformation coefficients require independently fitted dressing records.

## Observable Interface

Key outputs to pass into validation and simulation layers:

1. Predicted anisotropy harmonics for resonator-style tests.
2. Velocity-dependent clock shift coefficients beyond leading $\gamma_\star$ term.
3. Orientation-dependent residuals in two-way propagation observables.
4. Parameter surfaces where leakage remains below target bounds.
5. Branch-sourced residual labels linking any nonzero $\Delta_{\text{tw}}$ sideband, clock residual, or shape residual to a specific causal-root ledger feature rather than to a free phenomenological coefficient.

## Failure Conditions

The Lorentzian conspiracy program fails if any of the following occur:

1. No stable translating attractor exists over physically relevant group-speed range.
2. Required contraction or period scaling appears only by fine tuning.
3. Residual anisotropy terms exceed accepted bounds after full observer construction.
4. Different assembly decorations produce incompatible kinematic laws that prevent universal operational closure.
5. The weak-field connection built from $g_{\mu\nu}^{\text{eff}}$ fails to reproduce a Newtonian Poisson limit for $\Phi_{\text{eff}}$ in the operational observer sector.
6. Diophantine nonresonance fails (small-divisor regime), causing secular interbinary resonance and invalidating the adiabatic mismatch bound used in [coincident-midpoint orthogonal-axis braid adiabatic decoupling bound](#coincident-midpoint-orthogonal-axis-braid-adiabatic-decoupling-bound).
7. The extracted Lorentz coefficients cannot be traced to the causal-root ledger on a completed branch chart, or the same ledger cannot generate clock, ruler, and two-way signal closure without separate per-observable tuning.

## Position in the $\mathbb{A}\mathbb{A}\mathbb{A}$ Program

This priority is the first gate because it constrains all downstream bridges:

1. Without kinematic closure, emergent metric claims are underdetermined.
2. Without universal assembly clock behavior, phenomenological mapping to GR tests is unstable.
3. With kinematic closure established, metric constitutive derivations and PPN matching become sharply posed problems.

## Canonical Dependencies

Primary theory anchors:

1. [dynamics/master-equation.md](../dynamics/master-equation.md)
2. [dynamics/causal-action-functional.md](../dynamics/causal-action-functional.md)
3. [dynamics/binary-dynamics.md](../dynamics/binary-dynamics.md)
4. [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation)
5. `spacetime/*`
6. [validation/constraint-ledger.md](../validation/constraint-ledger.md)
7. [validation/no-go-theorems.md](../validation/no-go-theorems.md)
