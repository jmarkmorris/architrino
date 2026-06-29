# Lorentzian Conspiracy and Emergent Lorentz Kinematics

This chapter is the focused program statement for deriving operational Lorentz behavior from delayed substrate dynamics. Its purpose is to make the required compensation law explicit, distinguish the closure target from any already-proved result, and organize the derivation path from microdynamics to measurable clock-and-ruler behavior.

The opening abstract states the target; the later sections move through the governing delayed dynamics, the anisotropy mechanism, and the conditions under which assembly-built observers could recover standard Lorentz kinematics.

For the theory-bridge version that maps special-relativistic terms directly to the deformable Noether braid story, see [the special-relativity bridge](../philosophy-history/theory-bridges/special-relativity-noether-braid.md). For the reader-facing synthesis of the branch-quantized Lorentz milestone, see [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md). For the interactive geometry surface, open [Ideal Noether Braid: Lorentz Geometry App](../../../../ideal-braid.html).

## Abstract

This document develops a first-principles program for deriving effective Lorentz kinematics inside $\mathbb{A}\mathbb{A}\mathbb{A}$ from delayed architrino dynamics in a Euclidean void with absolute time. The central claim is not postulated covariance, but dynamical compensation: moving assemblies deform and retune their internal frequencies so that assembly-built observers recover Lorentz-consistent clock and ruler behavior. The objective is an exact or asymptotically controlled derivation of
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\star(v)}\qquad
T(v)=\gamma_\star(v)\,T_0\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$
with bounded preferred-frame leakage in measurable observables.

This is an exact-substrate-asymmetry to bounded-emergent-symmetry theorem target. Absolute time, the Euclidean void, and finite $c_f$ are not observer-level Lorentz symmetry. The substrate symmetry group is $E(3)\times\mathbb{R}_t$, not a boost-invariant Lorentz or Poincare group, so Lorentz invariance cannot be counted as a substrate-exact invariant. It is admissible only if the source-to-effective map suppresses every observer-accessible preferred-frame current below the declared $\epsilon_{\mathrm{LV}}$ bounds while preserving the clock, ruler, and photon-channel successes of special relativity.

Here $\epsilon_{\mathrm{LV}}$ is a residual budget, not one binary tolerance. It contains distinct rows for Michelson-Morley two-way optical isotropy, Kennedy-Thorndike boost dependence, Ives-Stilwell clock-dilation behavior, Hughes-Drever and clock-comparison matter-sector isotropy, sidereal modulation, photon-sector dispersion/birefringence/time-of-flight leakage, weak-field preferred-frame terms, and gravitational-wave-versus-photon speed matching. Each row must declare its expansion order in the appropriate drift parameter, such as $\beta_\oplus\equiv v_\oplus/c_{\text{eff}}$ for terrestrial null tests, its validity regime, and its experimental tolerance before Lorentz recovery can be counted as bounded.

The common-mode requirement is therefore multi-sector. Matter-sector clocks, photon-channel propagation, and the effective gravitational channel cannot be tuned independently. A branch that nulls Michelson-Morley-type two-way optical anisotropy but leaves orientation-dependent clock energy levels, sidereal leakage, photon birefringence, or a separated effective gravitational-wave speed is not a Lorentz recovery branch.

This makes Lorentz recovery the prototype invariant-provenance problem. The invariant interval is not accepted as primitive substrate geometry; it is the observer-level invariant to be exported by one retained branch record. The derivation must say which substrate quantities are exact, which observer quantities are emergent, and which residual currents remain as preferred-frame leakage diagnostics.

Speed convention: primitive delayed-root equations are solved with $c_f$. The declared speed $c_\star$ enters only after the channel has been named: set $c_\star=c_f$ for a primitive wake branch chart, $c_\star=c_{\text{eff}}(\mathbf{x})$ for Noether sea dressed clocks and rulers, and $c_\star=c_\gamma(\mathbf{x})$ for photon synchronization. The low-gradient Lorentz limit may identify the measured channel speed with $c_0=c_{\text{eff}}(\infty)$ only after the dressing map is declared.

Notation guardrail: $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the Noether sea delay factor, not the Lorentz clock-rate factor. The velocity-sector target is $d\tau/dt\to\sqrt{1-\beta^2}$ only after the clock projection $f_{\tau}$ is extracted from the same Noether sea and assembly record. A derivation that writes $\chi_{\text{sea}}\to\sqrt{1-\beta^2}$ has changed notation; the corpus-level target is the map from $(n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{assembly state})$ into $f_{\tau}$ with $R_{\tau v}\to0$.

A stronger prediction is also available. The Lorentz formulas should not be imported as an independent observer-level rule and then copied onto assemblies. They should be recovered from the same causal-root progression that gives stable assemblies their discrete branch ledgers. In that sense the Lorentz factor is a closure target for the quantum-facing branch structure of the dynamics: the root ledger must generate the contraction, clock-retuning, and residual-leakage coefficients rather than merely coexist with them.

## Problem Statement

### Kinematic closure target

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate ontology is:

1. Euclidean 3-space represented by a chosen absolute-frame coordinate scaffold.
2. Global absolute time $t$.
3. Finite propagation speed $c_f$ for potential transfer through the Noether sea.

To match modern precision constraints, operational observers made from bound assemblies must infer effective Lorentz kinematics even though the substrate itself is not Minkowskian at the fundamental level. We call this required dynamical compensation the Lorentzian conspiracy.

Michelson-Morley-type null experiments make this a quantitative acceptance condition, not a philosophical preference. The framework may keep a Euclidean-void rest frame only if the two-way signal residual later written as $\Delta_{\text{tw}}(\beta_\star,\theta)$ is generated by the same branch record that retunes material arms and clocks, and remains $O(\epsilon_{\text{LV}})$ across the tested orientations. A cancellation achieved by separately fitting photon speed, clock rate, and ruler length would be a fit, not Lorentz closure.

The closure target is two-way operational isotropy, not one-way substrate isotropy. A primitive photon-channel speed may remain anisotropic relative to the absolute frame, because one-way speed is inseparable from clock synchronization for embedded observers. The required theorem is that the assembly-clock synchronization map absorbs the residual one-way anisotropy while the measurable round-trip diagnostic $\Delta_{\text{tw}}$ and the boost-dependent and clock-isotropy rows remain below their declared leakage bounds.

This makes synchronization reabsorption a dynamical export, not a convention chosen after the fact. Let $\mathcal{S}_{\mathrm{asm}}$ denote the synchronization convention physically realized by assembly clocks, rulers, and signal channels. A successful Lorentz export must drive $\mathcal{S}_{\mathrm{asm}}$ to operational Einstein synchrony inside the tested regime while any Reichenbach-style one-way freedom remains inaccessible to embedded observers. If an apparatus can extract the absolute-frame anisotropy by comparing assembly clocks, signal timing, or calibration loops, the preferred-frame leakage wall has failed even if a two-way Michelson-Morley row is small.

The clock channel has to be written as its own substrate-to-observer map:
$$
\frac{d\tau}{dt}
=
f_{\tau}\!\left(
\beta,\,
n(\mathbf{x},t),\,
\chi_{\text{sea}}(\mathbf{x},t),\,
\Phi_{\text{eff}}(\mathbf{x},t),\,
\text{assembly state}
\right),
\qquad
\beta\equiv\frac{v}{c_{\text{eff}}}.
$$
The velocity-sector residual is
$$
R_{\tau v}(\beta)
\equiv
\left.\frac{d\tau}{dt}\right|_{\nabla n=0,\ \nabla\Phi_{\text{eff}}=0}
-\sqrt{1-\beta^2},
$$
and must be bounded by time-dilation tests such as Ives-Stilwell and storage-ring clock comparisons. The weak-field potential-sector residual is
$$
R_{\tau\Phi}
\equiv
\left.\frac{d\tau}{dt}\right|_{\beta=0}
-\left(1+\frac{\Phi_{\text{eff}}}{c_{\text{eff}}^2}+O\!\left(\frac{\Phi_{\text{eff}}^2}{c_{\text{eff}}^4}\right)\right),
$$
with the $\Phi_{\text{eff}}$ sign convention declared, and must recover gravitational-redshift and PPN clock/curvature constraints. Equivalence-principle recovery requires $R_{\tau v}$ and $R_{\tau\Phi}$ to come from the same Noether sea response and assembly-clock map.

The absolute velocity used by the substrate solver cannot remain an observer-accessible quantity. In the accepted export, any dependence on absolute $v$ must be absorbed into nonseparable combinations of assembly-clock synchronization, ruler response, and signal-channel calibration, so Physical Observers recover Lorentz-invariant records rather than a direct preferred-frame speed meter.

### Mathematical objective

Given a translating bound assembly (binary and then nested shell braid), derive:

1. The velocity-dependent equilibrium shape tensor $Q(v)$ and its anisotropy.
2. The velocity-dependent internal period $T(v)$.
3. Conditions under which $(Q(v),T(v))$ produce effective Lorentz ruler and clock laws.
4. Residual non-Lorentz terms and their scaling.

## Governing Microdynamics

### Causal path-history interaction form

For architrino labels $i,j\in\{1,\dots,N\}$, with positions $\mathbf{x}_i(t)$ and regularized inertial weights $m_i$,
$$
m_i\ddot{\mathbf{x}}_i(t)=\sum_{j\neq i}\mathbf{F}_{ij}\!\left(\mathbf{x}_i(t),\mathbf{x}_j(t-\tau_{ij}(t)),\dot{\mathbf{x}}_j(t-\tau_{ij}(t))\right)+\mathbf{F}^{\text{self}}_i(t)
$$
with causal delay
$$
\tau_{ij}(t)=\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t-\tau_{ij}(t))\|}{c_f}
$$
The self-hit term $\mathbf{F}^{\text{self}}_i$ captures history-dependent wake re-intersections and is the non-Markovian source of branch-sensitive corrections.

The weights $m_i$ in this reduced equation are not primitive architrino rest masses. They are regularized bookkeeping weights for an assembly-level branch chart, analogous to the universal conversion constant used in the master-equation energy diagnostic. A fundamental scan may set them equal before closure, while an effective assembly calculation may replace them with branch-extracted weights only after the relevant internal energy ledger has been specified.

### Co-moving decomposition

For an assembly center trajectory $\mathbf{X}(t)$ with mean velocity $\mathbf{v}$, write
$$
\mathbf{x}_i(t)=\mathbf{X}(t)+\mathbf{r}_i(t)\qquad \sum_i m_i\mathbf{r}_i(t)=\mathbf{0}
$$
The closure task is to solve for bounded relative motion $\mathbf{r}_i(t)$ under translation $\|\mathbf{v}\|<c_f$ and extract period and geometry renormalization.

### Dimensionless drift-delay form and variational closure

Fix a rest-attractor length scale $a_0$ and period $T_0$, and define
$$
\beta\equiv \frac{v}{c_f}\qquad s\equiv \frac{t}{T_0}\qquad
\boldsymbol{\rho}_i(s)\equiv \frac{\mathbf{r}_i(t)}{a_0}\qquad
\chi\equiv \frac{c_f T_0}{a_0}
$$
Then delay closure in co-moving coordinates is
$$
\hat{\tau}_{ij}(s)=\frac{1}{\chi}\left\|
\boldsymbol{\rho}_i(s)-\boldsymbol{\rho}_j\!\left(s-\hat{\tau}_{ij}(s)\right)
+\chi\beta\,\hat{\mathbf{e}}_{\parallel}\hat{\tau}_{ij}(s)
\right\|
$$
with $\hat{\tau}_{ij}\equiv \tau_{ij}/T_0$.

Let $\boldsymbol{\rho}^\star(s;\beta)$ be a $P(\beta)$-periodic translating attractor. Linearization gives a delay-Floquet system
$$
\delta\dot{\mathbf{y}}(s)=A_0(s;\beta)\,\delta\mathbf{y}(s)+\sum_{n=1}^{N_d}A_n(s;\beta)\,\delta\mathbf{y}\!\left(s-\hat{\tau}_n^\star\right)
$$
where $\mathbf{y}$ stacks positions and velocities in relative coordinates. Kinematic closure requires:

1. Existence of $\boldsymbol{\rho}^\star(s;\beta)$ for $\beta\in[0,\beta_{\max})$.
2. Spectral stability of the monodromy operator (all nontrivial Floquet multipliers inside the unit disk).
3. Smooth coefficient maps for axis and period renormalization extracted from $\boldsymbol{\rho}^\star$.

### Translating binary benchmark

The first hard Lorentz-closure calculation is the moving version of the certified rest two-body branch. Let $\sigma\in\{+1,-1\}$ label the two opposite-polarity architrinos and choose the drift direction $\hat{\mathbf e}$. A translating binary branch has the substrate ansatz
$$
\mathbf{x}_{\sigma}(t)
=
u t\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(t)),
\qquad
\theta(t+T_u)=\theta(t)+2\pi
$$
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
\Omega_u\equiv\frac{2\pi}{T_u}
$$
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
where $\hat{\mathbf r}_{\sigma\sigma'}$ is the unit vector from the source emission point to the receiver-now point. This is structurally the same source-normal denominator that appears in Lienard-Wiechert delay geometry. The analogy is useful only at the level of causal-root flux: the canonical Master EOM has the radial inverse-square line of action and receiver-normal branch strength $W^{\mathrm{rec}}=\lvert D_t/D_s\rvert$, but not the full electrodynamic velocity-field and acceleration-field terms. The Lorentz answer therefore cannot be imported from classical electrodynamics; it must be computed on this branch.

The leading/trailing asymmetry in this translating ledger is already visible in the pure drift part of the same Jacobian. For a uniformly moving source with drift ratio $\beta=u/c_f$ and $\theta$ the angle between the drift direction and the source-to-receiver line of action, the simple-root wake-density factor is
$$
\mathcal{D}_{\mathrm{wake}}(\theta;\beta)
=
\frac{1}{1-\beta\cos\theta}
$$
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
with
$$
R_T^{\mathrm{bin}}(u)
\equiv
\frac{T_u}{T_0}
-
\gamma_f(u),
\qquad
R_{\xi}^{\mathrm{bin}}(u)
\equiv
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
-
\frac{1}{\gamma_f(u)}
$$
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
in the planar orientation where the drift direction lies in the binary plane. A clean primitive result has $\mathcal{R}_{\mathrm{bin}}=0$ or a controlled residual traceable to named branch-ledger features. A nonzero residual is not a rhetorical failure; it is the first foundation-level pressure on the Lorentz-closure program, because the binary is the first available internal clock and ruler.

### Exact substrate symmetries and delay currents

At action level, use a causal path-history functional
$$
S=\int dt\left[
\sum_i \frac{1}{2}m_i\dot{\mathbf{x}}_i^2
-\frac{1}{2}\sum_{i\ne j}\int_{\Sigma_{ij}} d^2\sigma\,
\mathcal{L}_{\text{int}}\!\left(\mathbf{x}_i(t),\mathbf{x}_j(t-\tau)\right)
\right]
$$
The exact substrate symmetry group is
$$
G_{\text{fund}}=E(3)\times \mathbb{R}
$$
and the associated delayed-Noether proof target is that conserved totals close only after wake and medium channels are included:
$$
\mathbf{P}_{\text{tot}}
=
\sum_i m_i\dot{\mathbf{x}}_i+\mathbf{P}_{\text{wake}}
\qquad
E_{\text{tot}}
=
\sum_i \frac{1}{2}m_i\dot{\mathbf{x}}_i^2+E_{\text{wake}}
$$
Only after this particle-plus-wake-plus-medium ledger closes does an isolated translating assembly admit a co-moving reduction to a bounded periodic or quasi-periodic branch $\boldsymbol{\rho}^\star(s;\beta)$ with fixed mean drift $\mathbf{v}=\mathbf{P}_{\text{tot}}/M_{\text{tot}}$.

## Emergent Kinematics from Delay Anisotropy

### Directional delay asymmetry

For a primitive benchmark drifting binary with instantaneous separation vector $\mathbf{r}=r\,\hat{\mathbf{n}}$ and center drift $\mathbf{v}=v\,\hat{\mathbf{e}}_{\parallel}$, causal-delay closure satisfies
$$
\tau=\frac{\|\mathbf{r}+\mathbf{v}\tau\|}{c_f}
$$
This subsection is deliberately a $c_f$ branch-chart calculation. For operational clock, ruler, or photon tests, repeat the same budget with the declared $c_\star$ after Noether sea dressing. With $\mu\equiv \hat{\mathbf{n}}\cdot\hat{\mathbf{e}}_{\parallel}$ and $\beta=v/c_f$, the two directional roots are
$$
\tau_{\pm}(r,\mu;\beta)
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta^2(1-\mu^2)}\pm \beta\mu}{1-\beta^2}
$$
Special orientations recover standard forms:
$$
\mu=1:\quad
\tau_{+}=\frac{r}{c_f-v}\qquad
\tau_{-}=\frac{r}{c_f+v}
$$
$$
\mu=0:\quad
\tau_{+}=\tau_{-}=\frac{r}{\sqrt{c_f^2-v^2}}
$$
The symmetric delay channel and associated causal-rate proxy are
$$
\bar{\tau}(\mu;\beta)\equiv \frac{\tau_{+}+\tau_{-}}{2}
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta^2(1-\mu^2)}}{1-\beta^2}
$$
$$
\nu(\mu;\beta)\equiv \frac{1}{\bar{\tau}(\mu;\beta)}
$$
Since $\bar{\tau}$ depends on $\mu$, interaction response is anisotropic and induces
$$
K_{\parallel}(v)\neq K_{\perp}(v)
$$

### Weak-velocity expansion to $O(\beta^4)$

Direct expansion of the symmetric lag gives
$$
\bar{\tau}(\mu;\beta)=\frac{r}{c_f}\left[
1+\frac{1+\mu^2}{2}\beta^2
+\frac{3+6\mu^2-\mu^4}{8}\beta^4
+O(\beta^6)
\right]
$$
and thus
$$
\nu(\mu;\beta)=\frac{c_f}{r}\left[
1-\frac{1+\mu^2}{2}\beta^2
+\frac{-1-2\mu^2+3\mu^4}{8}\beta^4
+O(\beta^6)
\right]
$$
Two anchor limits are:
$$
\mu=1:\ \bar{\tau}=\frac{r}{c_f}\gamma^2,\ \nu=\frac{c_f}{r}(1-\beta^2)
\qquad
\mu=0:\ \bar{\tau}=\frac{r}{c_f}\gamma,\ \nu=\frac{c_f}{r}\frac{1}{\gamma}
$$

### Closed-return derivation of the Lorentz axis ratio

The one-way roots above expose the preferred branch chart. They are not yet an observer-facing Lorentz law, because a physical clock or ruler is not made from a single one-way leg. A stable material branch is admitted only when the relevant causal wake returns to a compatible phase. The primitive Lorentz-geometry object is therefore a closed return cycle.

Use the declared channel speed $c_\star$ for the closure problem under consideration, with
$$
\beta_\star\equiv\frac{v}{c_\star}
\qquad
\gamma_\star\equiv\frac{1}{\sqrt{1-\beta_\star^2}}
$$
In a homogeneous Noether sea cell, take $R_{\parallel}$ to be the semiaxis along drift and $R_{\perp}$ to be a transverse semiaxis. A longitudinal return cycle has unequal forward and rear legs,
$$
t_{+}=\frac{R_{\parallel}}{c_\star-v}
\qquad
t_{-}=\frac{R_{\parallel}}{c_\star+v}
$$
so its closed return time is
$$
T_{\parallel}
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
A transverse return cycle uses part of the causal budget to keep pace with the translated receiver. The remaining transverse closure speed is
$$
c_{\perp}=c_\star\sqrt{1-\frac{v^2}{c_\star^2}}
=\frac{c_\star}{\gamma_\star}
$$
and therefore
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\perp}}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$

The closure condition for a Lorentz-admissible branch is that the same material return cycle closes with one period in the longitudinal and transverse channels:
$$
T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_0)
$$
In the zero-leakage homogeneous limit this gives
$$
\frac{2R_{\parallel}}{c_\star}\gamma_\star^2
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$
hence
$$
\xi(v)
\equiv
\frac{R_{\parallel}(v)}{R_{\perp}(v)}
=
\frac{1}{\gamma_\star(v)}
$$
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

The same closure has a useful selection form. Let a rest-frame separation at angle $\theta_0$ to the drift direction deform by an unknown axial factor $g(\beta_\star)$:
$$
R_{\parallel}=R_0\cos\theta_0\,g(\beta_\star),
\qquad
R_{\perp}=R_0\sin\theta_0
$$
For a closed return through a channel with speed $c_\star$, the orientation-sensitive bracket in the round-trip delay is proportional to
$$
B(\theta_0)
=
c_\star^2R_0^2\left[g^2\cos^2\theta_0+(1-\beta_\star^2)\sin^2\theta_0\right]
$$
An orientation-independent material clock requires the coefficients of $\cos^2\theta_0$ and $\sin^2\theta_0$ to agree, hence
$$
g(\beta_\star)=\sqrt{1-\beta_\star^2}
$$
in the zero-leakage homogeneous limit. This selects the Lorentz contraction law as the unique axial deformation that removes matter-sector orientation leakage for this closed-return benchmark. It is still not a stability theorem: the delayed force law must also show that the contracted branch is an attracting solution of the boosted delay dynamics.

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
and therefore
$$
\beta_\star
=
\sqrt{1-\xi^2}
=
\sqrt{1-\frac{R_{\parallel}^2}{R_{\perp}^2}}
$$
Thus the velocity fraction is encoded as the eccentricity of the oblate spheroidal envelope, while $\gamma_\star$ is encoded as its transverse-to-longitudinal aspect ratio. This is only a statement about the shape channel: a separate scale channel $\lambda$ may change the absolute size without changing the dimensionless ratios $\xi$, $\gamma_\star$, and $\beta_\star$.

The clock law belongs to the return-cycle period, not to the absolute size of the oblate spheroidal envelope. If a rest branch has period $T_0$, the observer-sector target is
$$
T_q(v)=\gamma_\star(v)T_0+O(\epsilon_{\mathrm{LV}}T_0)
$$
For the simple return-cycle benchmark above, substituting $R_{\parallel}=R_{\perp}/\gamma_\star$ gives
$$
T_{\parallel}
=
\frac{2R_{\perp}}{c_\star}\gamma_\star
$$
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
The divergent clock factor is therefore not caused by a large object. It is caused by the vanishing forward catch-up margin $c_\star-v$ in the closed return cycle. The contraction of $R_{\parallel}$ and the divergence of $T_q(v)$ are two coupled readouts of the same closure condition.

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
with admissibility requiring the same causal-root ledger to close the oblate spheroidal envelope geometry, clock period, and preferred-frame leakage bounds. Thus a continuous Lorentz formula would be recovered as the common envelope of discrete Noether braid return-cycle classes only after those branch-admissibility conditions close.

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
where
$$
R_T^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}-\gamma_\star(v)
\qquad
R_\xi^{(q)}(v)
\equiv
\xi_q(v)-\frac{1}{\gamma_\star(v)}
$$
For a one-dimensional velocity-composition test in the same declared channel,
$$
R_u^{(q)}
\equiv
u_{\mathrm{eff}}
-
\frac{u'+v}{1+u'v/c_\star^2}
$$
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
Here $m_q$ is the observer-sector inertial response assigned to the admitted branch, and $R_\gamma^{(q)}$ is evaluated only after the photon channel has been declared. The same causal-root ledger, medium dressing map, and branch state must feed all components. A branch that fits clock slowing with one ledger, ruler contraction with another, and photon propagation with an independent channel has not closed Lorentz behavior; it has only matched isolated formulas.

This derivation is stronger than assigning an oblate spheroidal envelope after the fact. The one-way longitudinal legs remain asymmetric; the Lorentz geometry appears only when the closed return cycle is allowed to choose the semiaxes that make longitudinal and transverse closure periods agree. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the envelope is the visible projection of a branch that has solved its return-cycle ledger.

### Effective shape law

Fix a drift band $0\le\beta_f\le\beta_{\max}<1$, with $\beta_f=v/c_f$, and choose one admitted translating branch $q$. The primitive root ledger on that band is still solved at $c_f$; $\beta_\star=v/c_\star$ is introduced only for the declared primitive or dressed observer channel being tested.

Define the cycle-averaged shape tensor on the translating attractor:
$$
Q_{ab}^{(q)}(v)\equiv
\frac{1}{M_q}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\text{cyc},q}
\qquad
M_q\equiv \sum_i m_i
$$
Let $q_{\parallel}(v),q_{\perp,1}(v),q_{\perp,2}(v)$ be principal-frame eigenvalues of $Q^{(q)}(v)$, with principal axis chosen along drift for $q_{\parallel}$. Define extracted semiaxes
$$
a_{\parallel,q}(v)\equiv \sqrt{q_{\parallel}(v)}\qquad
a_{\perp,q}(v)\equiv \sqrt{\frac{q_{\perp,1}(v)+q_{\perp,2}(v)}{2}}
$$
The moving-assembly contraction residual is
$$
R_{\parallel}^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)}
$$
and the theorem target is the leakage bound
$$
\left|R_{\parallel}^{(q)}(v)\right|
\le
C_{\parallel}\epsilon_{\text{LV}}\beta_\star^2
$$
uniformly on the declared drift band. This is a moving-assembly extraction condition. Weak-field PPN tests can later falsify the dressed medium response, but they are not inputs to this semiaxis extraction.

### Quadratic closure and coefficient constraints

On the attracting manifold, use principal-frame quadratic closure
$$
U_{\text{eff}}=\frac{1}{2}K_{\parallel}(v)\,r_{\parallel}^2+\frac{1}{2}K_{\perp}(v)\left(r_{\perp,1}^2+r_{\perp,2}^2\right)
$$
Notation guardrail: in this chapter, $U_{\text{eff}}$ denotes the cycle-averaged mechanical potential on the translating attractor; it is distinct from the positive weak-field PPN variables $U$ and $U_{\Phi}$ used in [spacetime/ppn-parameters.md](./ppn-parameters.md).
For fixed action shell, semiaxes scale as $a_i\propto K_i^{-1/2}$, hence
$$
\frac{a_{\parallel}}{a_{\perp}}=\sqrt{\frac{K_{\perp}}{K_{\parallel}}}
$$
Write
$$
\frac{K_{\parallel}}{K_0}=1+k_2\beta^2+k_4\beta^4+O(\beta^6)+\Delta_{\parallel}^{\text{LV}}
$$
$$
\frac{K_{\perp}}{K_0}=1+\ell_2\beta^2+\ell_4\beta^4+O(\beta^6)+\Delta_{\perp}^{\text{LV}}
$$
with $|\Delta_i^{\text{LV}}|\le C_i\epsilon_{\text{LV}}$. Then
$$
\frac{a_{\parallel}}{a_{\perp}}
=1+\frac{\ell_2-k_2}{2}\beta^2
+\left[
\frac{\ell_4-k_4}{2}
+\frac{3k_2^2}{8}
-\frac{k_2\ell_2}{4}
-\frac{\ell_2^2}{8}
\right]\beta^4
+O(\beta^6)+O(\epsilon_{\text{LV}})
$$
Matching to
$$
\frac{1}{\gamma}=1-\frac{1}{2}\beta^2-\frac{1}{8}\beta^4+O(\beta^6)
$$
imposes
$$
\ell_2-k_2=-1
$$
$$
4(\ell_4-k_4)+3k_2^2-2k_2\ell_2-\ell_2^2=-1
$$

### Stiffness tensor from causal-wake surface integrals

To anchor coefficient matching in the microdynamics, define the pairwise causal-wake potential on a translating attractor $\boldsymbol{\rho}^\star(s;\beta)$:
$$
\mathcal{U}_{ij}(t;\beta)\equiv
\int_{\Sigma_{ij}^{\text{wake}}(t)}
\frac{\kappa\,\epsilon^2}{\|\mathbf{x}_i(t)-\mathbf{x}_j(t-\tau)\|^2}\,
W_{ij}(t,\sigma;\eta)\,d^2\sigma
$$
where $W_{ij}$ is the regularized causal kernel weight and $\eta>0$ is the regularization scale.
Set
$$
U_{\text{eff}}(t;\beta)\equiv \sum_{i<j}\mathcal{U}_{ij}(t;\beta)
\qquad
K_{ab}(\beta)\equiv
\left\langle
\frac{\partial^2 U_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$
with cycle average $\langle\cdot\rangle_{\text{cyc}}$ taken on $\boldsymbol{\rho}^\star$.
Project to principal channels:
$$
K_{\parallel}=\hat{e}_{\parallel}^a K_{ab}\hat{e}_{\parallel}^b\qquad
K_{\perp}=\frac{1}{2}(\delta^{ab}-\hat{e}_{\parallel}^a\hat{e}_{\parallel}^b)K_{ab}
$$

Dimensionless factorization exposes Category A coupling:
$$
K_i(\beta)=\frac{\kappa\,\epsilon^2}{a_0^3}\,\mathcal{I}_i(\beta,\chi,\eta,\dots)
\qquad i\in\{\parallel,\perp\}
$$
Hence
$$
k_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\parallel}\big|_{\beta=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\perp}\big|_{\beta=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$
$$
k_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\parallel}\big|_{\beta=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\qquad
\ell_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\perp}\big|_{\beta=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$
Therefore the Lorentz-matching constraints in [Quadratic Closure and Coefficient Constraints](#quadratic-closure-and-coefficient-constraints) and [Clock-Channel Expansion and Minimal Closure Solution](#clock-channel-expansion-and-minimal-closure-solution) become explicit derivative identities on $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ evaluated on the delay-Floquet attractor.

### Period renormalization

Let $T_q(v)$ be the fundamental oscillation period of the assembly attractor in absolute time, extracted from the declared clock phase on the same branch ledger as the semiaxes. The clock retuning residual is
$$
R_T^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}
-
\gamma_\star(v)
$$
Operational proper-time behavior requires the theorem-target bound
$$
\left|R_T^{(q)}(v)\right|
\le
C_T\epsilon_{\text{LV}}\beta_\star^2
$$
Exact closure is the limit $\epsilon_{\text{LV}}\to 0$.

### Clock-channel expansion and minimal closure solution

Use a symmetric clock-frequency aggregator
$$
\omega_{\text{clk}}(v)\equiv \omega_0\left(\frac{K_{\parallel}K_{\perp}^2}{K_0^3}\right)^{1/6}
\qquad
\frac{T(v)}{T_0}=\frac{\omega_0}{\omega_{\text{clk}}(v)}
$$
Then
$$
\frac{T(v)}{T_0}
=1-\frac{k_2+2\ell_2}{6}\beta^2
+\left[
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
\right]\beta^4
+O(\beta^6)+O(\epsilon_{\text{LV}})
$$
Matching to
$$
\gamma=1+\frac{1}{2}\beta^2+\frac{3}{8}\beta^4+O(\beta^6)
$$
gives the clock constraints
$$
k_2+2\ell_2=-3
$$
$$
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
=\frac{3}{8}
$$
Combining with shape closure yields a minimal matched coefficient set
$$
k_2=-\frac{1}{3}\qquad \ell_2=-\frac{4}{3}
$$
and, at $O(\beta^4)$,
$$
k_4=-\frac{1}{9}\qquad \ell_4=\frac{2}{9}
$$
before leakage terms are added.

### Outer-binary transduction hypothesis (working)

Assume the outer binary $L$ is the dominant transducer for energy exchange with passerby assemblies (non-locally coupled encounters). Under this hypothesis, the leading kinematic response is boundary-driven at $L$, then propagated inward through $M$ and $H$ couplings.

For locally coupled assemblies (strong axial coupling), interaction pathways are distinct and should be modeled as a separate regime, not merged with passerby-transfer fits.

### State update map for single-quantum uptake

For an assembly state
$$
\mathcal{S}=\{v_{\text{tr}}, f_H,f_M,f_L,\mathbf{A},\mathcal{E}_{\text{excl}},\tau_{\text{op}}\}
$$
let one absorbed quantum $\Delta E_q$ induce
$$
\mathcal{S}\mapsto \mathcal{S}'=\mathcal{S}+\Delta\mathcal{S}(\Delta E_q)
$$
with the following structured components:

1. Translational architrino speed increase: $\Delta v_{\text{tr}}>0$.
2. Discrete frequency retuning of $H,M,L$: $\Delta f_k=n_k\,\delta f_k$, with $n_k\in\mathbb{Z}$ and $k\in\{H,M,L\}$.
3. Nested shell braid axis realignment: $\Delta\mathbf{A}\neq 0$ (precession/tilt of principal axes).
4. Exclusion-zone geometry shift: $\Delta\mathcal{E}_{\text{excl}}\neq 0$ (shape and orientation update).
5. Operational time response shift: $\Delta\tau_{\text{op}}\neq 0$.

### Open mapping: perceived time dilation in $\mathbb{A}\mathbb{A}\mathbb{A}$

The human-observed "time dilation" channel is not yet fully mapped in substrate variables. The working interpretation in this document is:
$$
\tau_{\text{op}}=\tau_{\text{op}}(f_H,f_M,f_L,\mathbf{A},\mathcal{E}_{\text{excl}},v_{\text{tr}})
$$
where $\tau_{\text{op}}$ is an emergent clock functional of assembly internal frequencies, axis geometry, exclusion-zone shape, and translation state.

The immediate task is to identify which subset dominates $\partial \tau_{\text{op}}/\partial E$ in the passerby-transfer regime, with the default prior that outer-binary $L$ mediated updates are first-order.

### Evolving scenario: exclusion-volume driven effective spacetime

Working assumption:

1. The outer precessing binary of a Noether braid defines the effective exclusion volume boundary; see [Nested Shell Braid Geometry](../noether-braid/nested-shell-braid-geometry.md).
2. Each nested shell braid layer ($H,M,L$) has its own circulation axis.
3. Total angular and translational momentum are conserved at assembly level (up to modeled exchange channels with environment).

Proposed mechanism chain under applied force (acceleration of a Noether braid-based assembly):

1. External forcing increases translational state.
2. Axis coupling drives partial alignment of $H,M,L$ circulation axes.
3. Alignment is accompanied by binary radius contraction across layers (with layer-dependent sensitivity).
4. The exclusion volume changes shape and orientation because its boundary is set by the precessing outer binary $L$.
5. Neighboring assemblies then see changed path-history geometry and interaction timing.
6. At coarse scale, this appears as a modified effective kinematic/geometric background, i.e. an emergent spacetime response.

This can be treated as a coupled state map:
$$
(\mathbf{v},\mathbf{A}_H,\mathbf{A}_M,\mathbf{A}_L,R_H,R_M,R_L,\mathcal{E}_{\text{excl}})
\xrightarrow{\;\Delta \mathbf{p}\;}
(\mathbf{v}',\mathbf{A}_H',\mathbf{A}_M',\mathbf{A}_L',R_H',R_M',R_L',\mathcal{E}_{\text{excl}}')
$$

Initial directional hypothesis for acceleration response:
$$
\|\mathbf{A}_H-\mathbf{A}_L\|,\ \|\mathbf{A}_M-\mathbf{A}_L\| \downarrow\qquad
R_H,R_M,R_L \downarrow
$$
with the strongest transduction at $L$.

Interpretive thesis:

Einstein-like spacetime behavior may be recovered as the continuum limit of moving, deforming exclusion volumes of Noether braids under translation and local volume variation, rather than from fundamental geometric curvature at substrate level.

Consistency checks required for this scenario:

1. Contraction and alignment must satisfy conservation laws and admissible torque channels.
2. The induced clock/ruler renormalization must reproduce Lorentz-like scaling to required accuracy.
3. Residual anisotropy harmonics must remain below empirical bounds after observer construction.
4. Local axial-coupling encounters must be modeled separately from passerby-transfer events.

Status: scenario is a structured hypothesis, not yet a proved derivation. It is retained as an evolving design model for theorem and simulation development.

### Two-channel deformation: shape plus scale

Relevant to Lorentzian closure, the Noether braid deformation is not only axis-ratio change. A working two-channel model is:

1. Shape channel (oblateness): longitudinal compression relative to transverse radius.
2. Scale channel (radius rescaling): transverse radius changes with energy state.

Use the declared observer-channel speed for this closure step:
$$
R_\parallel=\frac{R_\perp}{\gamma_\star}\qquad \gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}\qquad \beta_\star=\frac{v_{\text{tr}}}{c_\star}
$$
with $c_\star=c_{\text{eff}}$ for Noether sea dressed clock/ruler closure and $c_\star=c_f$ only for a primitive branch-chart calculation. For the scale channel, use
$$
R_\perp=R_\perp(E)\qquad \frac{dR_\perp}{dE}<0
$$
as the default constitutive sign convention in energized regimes.

The corresponding exclusion volume model is
$$
V(\beta_\star,E)=\frac{4\pi}{3}R_\perp(E)^2R_\parallel(E,\beta_\star)
=\frac{4\pi}{3}R_\perp(E)^3\sqrt{1-\beta_\star^2}
$$

This gives a direct state-space channel from energy and translation into local Noether sea geometry:
$$
(\beta_\star,E)\longmapsto (R_\parallel,R_\perp,V)
$$

### Local deformation fields and effective geometry handoff

For coarse-grained modeling, define local fields
$$
\xi(x)=\frac{R_\parallel}{R_\perp}\qquad
\lambda(x)=\frac{R_\perp(x)}{R_{\perp,0}}
$$
with $\xi\in(0,1]$ as shape and $\lambda$ as scale. The Lorentz-closure target is $\xi(x)\to1/\gamma(x)$ in the homogeneous drift regime.

Terminology guardrail: $\xi$ is the Noether braid envelope shape ratio, inherited from [Nested Shell Braid Geometry](../noether-braid/nested-shell-braid-geometry.md#canonical-geometry-variables). It is not defined as the clock-rate factor. In the homogeneous Lorentz-closure regime the proof target is
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt}\to\xi\to\frac{1}{\gamma}
$$
so clock slowing is a derived readout of the geometry-to-clock map.

Together with local assembly density $n(x)$ (with $\rho_{\text{NS}}(x)=\rho_{\text{NS},0}n(x)$) and preferred-frame flow/orientation $\hat{u}(x)$, these define a minimal handoff tuple
$$
(\xi,\lambda,n,\hat{u})_x
$$
for constructing effective kinematic and metric responses. The kinematic closure requirement is that observer-built rods/clocks from this Noether sea recover Lorentz-consistent operational laws to bounded leakage.

### Algebraic effective metric map from the handoff tuple

To make Stage D constructive, introduce an observer-sector pseudo-Riemannian template
$$
\eta^{\mu\nu}=\mathrm{diag}(-1,1,1,1)
$$
used only as an operational constitutive object (not as substrate ontology). Let $\hat{u}^\mu$ be the unit medium-flow 4-field with
$$
\eta_{\mu\nu}\hat{u}^\mu\hat{u}^\nu=-1
$$
Define the disformal covariant metric
$$
g_{\mu\nu}^{\text{eff}}(x)=
\Omega^2(n,\lambda)\left[
\eta_{\mu\nu}
+\left(1-\xi^2(x)\right)\hat{u}_{\mu}\hat{u}_{\nu}
\right]
$$
Its inverse form is
$$
g_{\text{eff}}^{\mu\nu}(x)=
\Omega^{-2}(n,\lambda)\left[
\eta^{\mu\nu}
+\left(1-\xi^{-2}(x)\right)\hat{u}^{\mu}\hat{u}^{\nu}
\right]
$$
Hence microscopic shape closure, when it yields $\xi\to1/\gamma$, is injected directly into $g_{\mu\nu}^{\text{eff}}$.

In the local Noether sea rest frame ($\hat{u}^\mu=(1,0,0,0)$), with observer-sector coordinate $x^0=c_0 t$:
$$
ds_{\text{eff}}^2=g_{\mu\nu}^{\text{eff}}dx^\mu dx^\nu
=\Omega^{2}\left[-\xi^{2}(dx^0)^2+d\mathbf{x}^2\right]
$$
Therefore the stationary ideal clock-rate factor extracted from the metric subclass is $\Omega\xi$, while the spatial ruler scale is governed by $\Omega$. This preserves the geometry-first interpretation: $\xi$ remains the oblate-envelope shape ratio, and the clock rate agrees with $\xi$ only after the geometry-to-clock closure is proved.

## Observer Construction and Operational Invariance

### Assembly clocks and rods

Physical observers are built from the same bound-state class that obeys the above deformation and period laws. Therefore, measurement devices inherit velocity-dependent retuning.

### Two-way signal speed criterion

For ruler and clock systems made of translated assemblies, two-way signal experiments must satisfy
$$
c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})
$$
uniformly in orientation $\theta$. This is the operational statement that maps substrate anisotropy into effective Lorentz symmetry at observer scale.

For clock-and-ruler synchronization, $c_{\text{iso}}$ is the dressed local assembly signal speed. For photon synchronization, it is the local photon-channel speed $c_\gamma$; photon Gate A must show when the photon branch shares the same homogeneous-cell limit as $c_{\text{eff}}$.

### Conditional synchronization-reabsorption lemma

The synchronization claim has a compact conditional form. In a weak homogeneous cell, suppose the same moving-assembly response supplies the photon-channel clock and ruler laws
$$
L_{\parallel}(v)=\frac{L_0}{\gamma_\gamma},
\qquad
\frac{d\tau}{dt}=\frac{1}{\gamma_\gamma},
\qquad
\gamma_\gamma=\frac{1}{\sqrt{1-v^2/c_\gamma^2}},
$$
with $v$ measured relative to the Euclidean-void rest frame. These equations are not assumed as completed dynamics; they are the response form the branch must derive from one Noether sea and assembly record.

In the absolute frame, the one-way photon legs along a longitudinal arm are unequal:
$$
t_{\to}=\frac{L_{\parallel}}{c_\gamma-v},
\qquad
t_{\leftarrow}=\frac{L_{\parallel}}{c_\gamma+v}.
$$
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
The moving assembly clock records
$$
\tau_{\mathrm{rt}}
=
\frac{t_{\mathrm{rt}}}{\gamma_\gamma}
=
\frac{2L_0}{c_\gamma}.
$$
Thus the measurable two-way photon-channel speed is $c_\gamma$ even though the two one-way legs were asymmetric in absolute time. Einstein synchronization assigns the remote-clock reading by splitting this round trip; a Reichenbach-style one-way freedom remains, but embedded observers cannot extract the absolute anisotropy unless the clock, ruler, or signal-channel response leaves a residual in the preferred-frame leakage budget.

This lemma proves only a conditional reabsorption statement: if one branch supplies the square-root ruler law and the square-root clock law, then the two-way optical row self-nulls. It does not prove that the Noether sea response yields those laws. Any deviation in $L_{\parallel}$, $d\tau/dt$, or $c_\gamma$ becomes one of the leakage residuals below.

The same caution applies to speed identification. Let $c_{\mathrm{clk}}$ denote the limiting speed that appears in the moving-assembly clock law and let $c_\gamma$ denote the photon-channel speed used for synchronization. The conditional reabsorption above requires $\gamma_{\mathrm{clk}}=\gamma_\gamma$ in the tested homogeneous branch. If a primitive calculation supplies $\gamma_f(v)$ using $c_f$ while the photon row uses $\gamma_\gamma(v)$ with a different speed, the mismatch appears as an $O(\beta^2)$ two-way residual rather than as Lorentz closure. The accepted target is therefore common-mode dressing: the observer-facing clock, ruler, photon, and effective gravitational channels must share the same homogeneous limiting speed after the Noether sea response is declared. It is not legitimate to collapse $c_f$, $c_\gamma$, $c_{\text{eff}}$, and $c_{\mathrm{GW}}^{\mathrm{eff}}$ by notation before that derivation is supplied.

The same criterion has a long-baseline photon consequence. If the photon branch uses a frequency-dependent delay factor, then a distant transient comparison accumulates
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf{x},t)
-
\chi_\gamma(\omega_b,\mathbf{x},t)
}{c_0}\,d\ell
$$
Operational Lorentz closure therefore requires this residual to vanish, or remain below the declared timing bound, in the same weak homogeneous branch that supplies $c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}})$. It is not enough to recover local two-way isotropy while leaving cosmological photon timing to a separately tuned channel record.

### Round-trip anisotropy cancellation through $O(\beta^4)$

Let arm lengths in the preferred frame be written using the declared two-way signal channel speed, with $\beta_\star=v/c_\star$:
$$
\frac{L_{\parallel}}{L_0}=1+\alpha_2\beta_\star^2+\alpha_4\beta_\star^4+O(\beta_\star^6)\qquad
\frac{L_{\perp}}{L_0}=1+b_2\beta_\star^2+b_4\beta_\star^4+O(\beta_\star^6)
$$
Round-trip absolute times are
$$
t_{\parallel}
=\frac{2L_{\parallel}c_\star}{c_\star^2-v^2}
=\frac{2L_0}{c_\star}\left[
1+(1+\alpha_2)\beta_\star^2+(1+\alpha_2+\alpha_4)\beta_\star^4+O(\beta_\star^6)
\right]
$$
$$
t_{\perp}
=\frac{2L_{\perp}}{\sqrt{c_\star^2-v^2}}
=\frac{2L_0}{c_\star}\left[
1+\left(b_2+\frac{1}{2}\right)\beta_\star^2
+\left(b_4+\frac{b_2}{2}+\frac{3}{8}\right)\beta_\star^4
+O(\beta_\star^6)
\right]
$$
Define the normalized anisotropy mismatch
$$
\Delta_{\text{tw}}(\beta_\star)\equiv \frac{t_{\parallel}-t_{\perp}}{2L_0/c_\star}
=A_2\beta_\star^2+A_4\beta_\star^4+O(\beta_\star^6)
$$
with
$$
A_2=\alpha_2-b_2+\frac{1}{2}
\qquad
A_4=\alpha_4-b_4+\alpha_2-\frac{b_2}{2}+\frac{5}{8}
$$
Operational isotropy through $O(\beta_\star^4)$ requires
$$
A_2=0\qquad A_4=0
$$
In the transverse-gauge choice $b_2=b_4=0$, this yields
$$
\alpha_2=-\frac{1}{2}\qquad \alpha_4=-\frac{1}{8}
$$
which is precisely $L_{\parallel}=L_0/\gamma_\star+O(\beta_\star^6)$.

## Derivation Program

### Stage A: binary analytic benchmark

Start with a single causal path-history binary under constant drift $\mathbf{v}$. Derive:

1. Existence and stability of periodic or quasi-periodic attractors.
2. Closed-form or asymptotic estimates for $(a_{\parallel}/a_{\perp})(v)$.
3. First nonzero leakage coefficients in $v/c_f$ expansion.

### Stage B: nested shell braid full closure

Promote to a nested shell braid with coupled circulation scales. Establish:

1. Persistence of aligned attractor family under drift.
2. Factorization or controlled coupling of inner/middle/outer period shifts.
3. Emergent universal $\gamma$-law independent of axial-structure details, within a defined class.

### Stage C: continuum handoff

Derive coarse-grained kinematic constitutive relations used by effective metric models:
$$
\mathcal{K}_{\text{micro}} \Longrightarrow \mathcal{K}_{\text{eff}}(v,n,\nabla n,\dots)
$$
so local assembly kinematics and macroscopic refractive geometry are mathematically linked.

### Stage D: effective-medium and weak-field closure sequence

To connect the two-channel deformation model to observables, use the following sequence:

1. Single-braid constitutive closure: derive or fit-test $R_\perp(E)$ and induced $\xi(E,\beta)$ from causal path-history nested shell braid dynamics.
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
Geodesic flow in the observer sector is
$$
\frac{d^2x^\lambda}{d\tau^2}
+\Gamma^\lambda_{\mu\nu}
\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}=0
$$

For weak drift, slowly varying Noether sea flow, and quasi-static fields in a local Noether sea rest frame, define
$$
\Phi_{\text{eff}}(x)\equiv c_0^2\ln\!\big(\Omega(n,\lambda)\,\xi\big)
$$
Then the nonrelativistic geodesic limit becomes
$$
\frac{d^2\mathbf{x}}{dt^2}
=-\xi^{2}\nabla \Phi_{\text{eff}}
+O\!\left(\frac{\|\mathbf{v}\|^2}{c_0^2},\epsilon_{\text{LV}}\right)
=-\nabla \Phi_{\text{eff}}
+O\!\left(
\left|1-\xi^{2}\right|\,\left|\nabla\Phi_{\text{eff}}\right|,
\frac{\|\mathbf{v}\|^2}{c_0^2},
\epsilon_{\text{LV}}
\right)
$$
with explicit source channels
$$
\nabla \Phi_{\text{eff}}
=c_0^2\left[
\partial_{\ln n}\ln\Omega\ \nabla\ln n
+\partial_{\ln \lambda}\ln\Omega\ \nabla\ln \lambda
+\nabla\ln\xi
\right]
$$
Thus gradients of $n$ and $\lambda$ (and kinematic $\xi$ gradients) enter the affine structure as the apparent-gravity source terms.

The eikonal/least-time handoff is then:
$$
\delta\!\int_{\Gamma} n_{\text{eff}}(x)\,ds=0
\quad\Longleftrightarrow\quad
\nabla_{\dot{x}}\dot{x}=0\ \text{under}\ g_{\mu\nu}^{\text{eff}}
$$
in the weak-field refractive regime.

### Coefficient-extraction and closure estimators

For each simulated drift speed, keep the channel label explicit. Primitive branch calculations use $\beta=v/c_f$; dressed observer-channel fits use $\beta_\star=v/c_\star$ after the dressing map is declared. Extract from long-window attractor statistics:
$$
\hat{\alpha}_j\equiv \frac{a_{\parallel,q}(\beta_j)}{a_{\perp,q}(\beta_j)}\qquad
\hat{\tau}_j\equiv \frac{T_q(\beta_j)}{T_0}
$$
Fit even-power truncations
$$
\hat{\alpha}(\beta)=1+\hat{\alpha}_2\beta^2+\hat{\alpha}_4\beta^4\qquad
\hat{\tau}(\beta)=1+\hat{\tau}_2\beta^2+\hat{\tau}_4\beta^4
$$
Lorentz closure at this order requires
$$
\hat{\alpha}_2=-\frac{1}{2}\quad \hat{\alpha}_4=-\frac{1}{8}\qquad
\hat{\tau}_2=\frac{1}{2}\quad \hat{\tau}_4=\frac{3}{8}
$$
Define closure residuals on a primitive calibration band $0\le\beta\le\beta_{\max}$, or on the dressed band after replacing $\beta$ by $\beta_\star$ and $\gamma$ by $\gamma_\star$:
$$
R_{\parallel}^{(q)}(\beta)
\equiv
\hat{\alpha}(\beta)-\frac{1}{\gamma(\beta)}
$$
$$
R_T^{(q)}(\beta)
\equiv
\hat{\tau}(\beta)-\gamma(\beta)
$$
The reported leakage scores are
$$
\mathcal{E}_{\text{shape}}
\equiv
\sup_{0\le \beta\le \beta_{\max}}
\left|R_{\parallel}^{(q)}(\beta)\right|
$$
$$
\mathcal{E}_{\text{clock}}
\equiv
\sup_{0\le \beta\le \beta_{\max}}
\left|R_T^{(q)}(\beta)\right|
$$
For two-way anisotropy, fit
$$
\Delta_{\text{tw}}(\beta,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta)\cos(2m\theta)
$$
and enforce
$$
\sup_{0\le \beta\le \beta_\star}|\mathcal{A}_{2m}(\beta)|\le C_m\epsilon_{\text{LV}}
$$

### Analytic derivation of kinematic closure coefficients

On the circular benchmark branch, take the rest-frame attractor $\boldsymbol{\rho}^\star(s;0)$ as a stable planar orbit of radius $r_0$ and frequency $\omega_0$. The cycle carries emergent phase symmetry $\phi\mapsto \phi+\text{const}$ with adiabatic invariant
$$
J=\oint \mathbf{p}_{\text{eff}}\cdot d\mathbf{r}
$$
For each principal oscillator channel, $J_i\propto \sqrt{K_i}\,A_i^2$, so adiabatic drift retuning implies
$$
A_i(\beta)=A_i(0)\left(\frac{K_i(0)}{K_i(\beta)}\right)^{1/4}
$$
This provides the fixed-action retuning route from stiffness expansion to the coefficient extraction in [Stiffness Tensor from Causal-Wake Surface Integrals](#stiffness-tensor-from-causal-wake-surface-integrals).

The simplest scalar kernel is useful mainly because it fails in a controlled way. For translation $\mathbf{v}=v\hat{\mathbf{e}}_{\parallel}$ with primitive $\beta=v/c_f$, suppose one tries the causal-delay potential form
$$
\mathcal{U}_{\text{eff}}(\mathbf{r};\beta)
=
\frac{\kappa\,\epsilon^2}{r_{\text{cd}}\!\left(1-\boldsymbol{\beta}\cdot \hat{\mathbf{n}}_{\text{cd}}\right)}
\qquad
\boldsymbol{\beta}\equiv \frac{\mathbf{v}}{c_f}
$$
Define stiffness by cycle-averaged Hessian evaluation on $\boldsymbol{\rho}^\star(s;\beta)$:
$$
K_{ab}(\beta)
=
\left\langle
\frac{\partial^2 \mathcal{U}_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}
$$
Naively expanding the causal-delay closure
$$
\tau=\frac{\|\mathbf{r}+\mathbf{v}\tau\|}{c_f}
$$
and projecting longitudinal/transverse channels would suggest integrals of the form
$$
\mathcal{I}_{\parallel}(\beta)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\cos^2\theta}{(1-\beta\cos\theta)^3}
$$
$$
\mathcal{I}_{\perp}(\beta)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^3}
$$
This naive block is not a derivation of the Lorentz-matching vector. With the displayed normalization it gives positive normalized stiffness growth rather than the required negative coefficient pattern, and any sign reversal would require an additional channel normalization that is not present in the scalar kernel. The block is therefore a failure diagnostic: the target vector must come from the completed action kernel on the same causal-root ledger, with branch phase closure and fixed-action retuning included before the stiffness derivatives are taken.

The valid theorem target keeps the [Stiffness Tensor from Causal-Wake Surface Integrals](#stiffness-tensor-from-causal-wake-surface-integrals) extraction rules,
$$
k_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\parallel}\big|_{\beta=0}}
{2\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\perp}\big|_{\beta=0}}
{2\,\mathcal{I}_{\perp}(0)}
$$
$$
k_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\parallel}\big|_{\beta=0}}
{24\,\mathcal{I}_{\parallel}(0)}
\quad
\ell_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\perp}\big|_{\beta=0}}
{24\,\mathcal{I}_{\perp}(0)}
$$
but now requires the branch-action integrals $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ to be computed from the completed delayed action and the admitted moving branch chart. The Lorentz-matching closure condition remains
$$
(k_2,\ell_2,k_4,\ell_4)
=
\left(-\frac{1}{3},-\frac{4}{3},-\frac{1}{9},\frac{2}{9}\right)
$$
The target vector is not a fit parameter, but this section no longer claims that the displayed scalar kernel derives it. A valid derivation must show that the completed action kernel, the causal-root ledger, branch phase closure, and fixed-action retuning together yield the derivative identities above on the same branch.

### Causal-root ledger progression as a Lorentz prediction

The coefficient calculation above suggests a sharper interpretation of the Lorentz closure problem. In standard observer physics, the Lorentz formulas are usually treated as kinematic consequences of invariant signal speed and the relativity principle. In this chapter they are instead treated as emergent observer-level consequences of a delayed assembly dynamics. The additional $\mathbb{A}\mathbb{A}\mathbb{A}$ prediction is that the Lorentz coefficients are not merely smooth deformation coefficients. They should be generated by the same branch-chart structure that later appears, after coarse-graining, as discrete quantum behavior.

Stated more strongly, the novel claim is a branch-quantized Lorentz response. This does not mean that the algebraic function
$$
\gamma(v)=\frac{1}{\sqrt{1-v^2/c_\star^2}}
$$
is replaced everywhere by a step function. It means that a physical clock or ruler can realize Lorentz behavior only through stable branch charts whose causal-root ledgers are integer objects. For a stable branch class $q$, define the realized clock and ruler Lorentz factors by
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta)\equiv \frac{T_q(\beta)}{T_0}
\qquad
\gamma_{\mathrm{rul}}^{(q)}(\beta)\equiv \frac{R_{\perp,q}(\beta)}{R_{\parallel,q}(\beta)}
$$
The branch-quantization claim is that the admissible material responses at fixed background conditions form the ledger-indexed set
$$
\Gamma_{\mathrm{adm}}(\beta)
=
\left\{
\big(\gamma_{\mathrm{clk}}^{(q)}(\beta),\gamma_{\mathrm{rul}}^{(q)}(\beta)\big)
:
q\in\mathcal{Q}_{\mathrm{stable}}(\beta)
\right\}
$$
where $\mathcal{Q}_{\mathrm{stable}}(\beta)$ is the set of stable causal-root ledger classes. The observer-level Lorentz factor is recovered only when the active branch family, hierarchy averaging, and Noether sea dressing collapse this set to a universal effective value:
$$
\gamma_{\mathrm{clk}}^{(q)}(\beta)
=
\gamma_{\mathrm{rul}}^{(q)}(\beta)
=
\gamma(\beta)+O(\epsilon_{\mathrm{LV}})
$$
for all admitted clock/ruler assemblies in the tested homogeneous regime. Thus $\gamma$ remains the continuous effective envelope measured by Physical Observers, while the substrate implementation is quantized by admissible causal-root ledgers. If this is correct, residual deviations from exact Lorentz closure should carry branch-spectrum signatures rather than arbitrary smooth phenomenological drift.

In this chapter, the native formulation of this idea is the progression of the causal-root ledger. This progression is the ordered change, under a control parameter such as drift speed $\beta$, of the active causal-root ledger
$$
\mathcal{L}_{\mathrm{root}}(\beta)
=
\left\{
(a,b,m,t,t_{0,m},J_{ab}^{(m)},\sigma_{ab}^{(m)})
:
m\in\mathcal{R}^{\mathrm{act}}_{ab}(\beta)
\right\}
$$
Here $a$ is the receiver, $b$ is the source, $m$ labels an active delayed branch, $t_{0,m}$ is the emission time, $J_{ab}^{(m)}$ is the causal Jacobian, and $\sigma_{ab}^{(m)}$ records the interaction sign or channel orientation used by the local branch chart. The ledger is quantum-facing because stable assembly states depend on integer branch counts, separator events, and admissible self-hit / partner-hit histories. It is Lorentz-facing because the same roots determine the cycle-averaged stiffness tensor and clock period.

The local prediction can be stated as a closure condition. There must exist one admissible branch-chart class $\mathfrak{B}_{\mathrm{mov}}(\beta)$ on a drift band $0\le\beta\le\beta_\star$ such that
$$
K_{ab}(\beta)
=
\left\langle
\sum_{(a,b,m)\in\mathcal{L}_{\mathrm{root}}(\beta)}
\partial_a\partial_b
\mathcal{U}_{ab}^{(m)}(t;\beta,\eta)
\right\rangle_{\mathrm{cyc}}
$$
and the extracted coefficient vector
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
\equiv
(k_2,\ell_2,k_4,\ell_4)
$$
satisfies
$$
\mathbf{c}_{\mathrm{L}}(\mathfrak{B}_{\mathrm{mov}})
=
\left(-\frac{1}{3},-\frac{4}{3},-\frac{1}{9},\frac{2}{9}\right)
+O(\epsilon_{\mathrm{br}}+\epsilon_{\mathrm{hier}}+\epsilon_{\mathrm{reg}})
$$
The error terms have distinct jobs. $\epsilon_{\mathrm{br}}$ measures branch-chart incompleteness or missed active roots, $\epsilon_{\mathrm{hier}}$ measures nested shell braid hierarchy leakage away from the binary benchmark, and $\epsilon_{\mathrm{reg}}$ measures finite-$\eta$ regularization error. This condition is stronger than fitting $L_{\parallel}=L_0/\gamma$ and $T(v)=\gamma T_0$. It says the fitted coefficients must be traceable to active causal roots with no independent Lorentz postulate and no per-observable retuning.

This gives a possible prediction of the framework. If Lorentz behavior is rooted in causal-root progression, then the first nonzero deviations from exact Lorentz closure should not be arbitrary smooth functions of speed. They should inherit the structure of branch charts: smooth even-power drift terms inside a fixed chart, plus localized or resonant leakage near separator events, small-divisor interlayer resonances, or changes in admissible root multiplicity. In a nonresonant chart the leakage should obey
$$
\left\|
\mathbf{c}_{\mathrm{L}}(\beta)
-
\left(-\frac{1}{3},-\frac{4}{3},-\frac{1}{9},\frac{2}{9}\right)
\right\|_W
\le
C_{\mathrm{br}}\epsilon_{\mathrm{br}}
+C_{\mathrm{hier}}\epsilon_{\mathrm{hier}}
+C_{\mathrm{reg}}\epsilon_{\mathrm{reg}}
$$
while near a chart-changing event the two-way anisotropy diagnostic should decompose into the ordinary Lorentz-canceling part plus a branch-sourced residual:
$$
\Delta_{\mathrm{tw}}(\beta,\theta)
=
\Delta_{\mathrm{tw}}^{\mathrm{smooth}}(\beta,\theta)
+
\sum_{r\in\mathcal{R}_{\mathrm{res}}}
B_r\,\mathcal{W}_r(\beta)\cos(2m_r\theta+\varphi_r)
$$
Here each residual label $r$ must correspond to a named branch-chart feature: a separator approach, a small-divisor relation between layer frequencies, a finite-memory cutoff, a Jacobian-floor loss, or a root-ledger transition. A residual with no branch-chart source is not a successful prediction; it is either ordinary fitting error or an incomplete closure model.

The technology-facing status is therefore conditional. The immediate test is not necessarily a laboratory Lorentz-violation search. The first test is mathematical and computational: solve a controlled translating branch chart, extract $\mathcal{L}_{\mathrm{root}}(\beta)$, compute $K_{\parallel}$, $K_{\perp}$, $T(v)$, and $\Delta_{\mathrm{tw}}$, and verify that the same ledger produces the Lorentz coefficients and any residual sidebands. Only after a nonzero residual survives branch completion, hierarchy averaging, and $\eta\to0$ control does the question become an experimental one. If the predicted residual amplitude lies below existing clock, resonator, matter-interferometer, or photon-channel sensitivity, the theory remains constrained but not yet technology-testable. If a branch-sourced residual survives at an accessible scale, its signature should be more specific than a generic Lorentz-violation coefficient: it should carry the speed, orientation, material-channel, or medium-density dependence of the responsible branch-chart feature.

This also prevents overclaiming. This chapter does not prove that quantum mechanics causes special relativity. It states a narrower closure target: in $\mathbb{A}\mathbb{A}\mathbb{A}$, the discrete causal-root progression that supports quantum-facing assembly behavior must also generate the Lorentz formulas in the homogeneous weak-field observer limit. If the branch ledger produces quantum-like discreteness but fails to produce the Lorentz coefficient vector, then the proposed common mechanism fails. If it produces the Lorentz vector only by tuning a separate clock law, ruler law, or photon speed for each observable, the Lorentz bridge also fails.

### Nested shell braid adiabatic decoupling bound

Let
$$
\mathbf{c}^{(2)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{binary}}
\qquad
\mathbf{c}^{(3)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{nested shell braid}}
$$
and define
$$
\mathcal{D}_{23}\equiv
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_W
\qquad
\|x\|_W^2\equiv x^\top W x,\ W\succ 0
$$
For nested layers $(H,M,L)$, decompose the outer-channel stiffness as
$$
K_{ab}^{(3)}
=
K_{ab}^{(L)}
+
\left\langle \frac{\partial^2\mathcal{U}_{L\leftrightarrow M}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
+
\left\langle \frac{\partial^2\mathcal{U}_{L\leftrightarrow H}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
$$
Under hierarchical separation
$$
\omega_H\gg \omega_M\gg \omega_L\qquad
r_H\ll r_M\ll r_L
$$
apply Hamiltonian averaging (Lie-Deprit transform) to eliminate fast phases. The monopole part renormalizes $\mathcal{I}_0$ only; the dipole contribution vanishes in the inner-layer center-of-mass frame; the leading anisotropic correction is quadrupolar and scales as $(r_M/r_L)^2$. Therefore
$$
\mathcal{D}_{23}
\le
C_Q\left(\frac{r_M}{r_L}\right)^2
+O\!\left(\left(\frac{r_H}{r_L}\right)^2\right)
$$
A sufficient closure condition is
$$
\left(\frac{r_M}{r_L}\right)^2\le C_{23}\epsilon_{\text{LV}}
$$
which yields
$$
\mathcal{D}_{23}\le C_{23}\epsilon_{\text{LV}}
$$

### Spectral-decoupling vulnerability criterion

The [Nested Shell Braid Adiabatic Decoupling Bound](#nested-shell-braid-adiabatic-decoupling-bound) assumes Diophantine nonresonance:
$$
|m\omega_L-n\omega_M|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\quad
\forall\,m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$
If this condition is violated so that
$$
|m\omega_L-n\omega_M|\lesssim \delta\omega_{\text{nl}}
$$
for small integers $(m,n)$ and nonlinear coupling width $\delta\omega_{\text{nl}}$, then small divisors invalidate the homological equations of the Lie transform. The resulting secular resonance destroys adiabatic decoupling, can break KAM tori, and drives $O(1)$ interlayer energy exchange. In that regime, coefficient drift can exceed the quadrupole estimate and local preferred-frame leakage can rise above $O(\epsilon_{\text{LV}})$ even when geometric hierarchy is large.

## Theorem Targets

### Theorem A0 (forward partner-root speed-limit lemma)

The primitive material speed-limit row has a kinematic upper-bound lemma before any detailed nested shell braid deformation is solved. In a translating branch with center drift $u\hat{\mathbf e}$, a retained partner row whose receiver lies ahead of its source by positive co-moving separation $d_{\parallel}\ge d_{\min}>0$ must satisfy
$$
c_f\tau
=
\left\|
u\tau\,\hat{\mathbf e}
+
\boldsymbol{\rho}_i(t)-\boldsymbol{\rho}_j(t-\tau)
\right\|
\ge
u\tau+d_{\min}
$$
and therefore
$$
\left(c_f-u\right)\tau\ge d_{\min}
$$
No such forward partner root exists for $u\ge c_f$; for $u<c_f$ its required delay is at least $d_{\min}/(c_f-u)$. Thus a bound translating assembly whose structural closure requires leading-side partner rows cannot preserve its causal-root ledger at or above primitive field speed. This proves the upper-bound side
$$
c_{\mathrm{mat}}^{\mathrm{lim}}\le c_f
$$
for that class of material branches. The remaining Lorentz program is the constructive side: proving that stable branch families exist for $u<c_f$, that their deformation and periods approach the common envelope, and that Noether sea dressing maps the primitive bound to the observer-channel speeds without an independent fit.

### Theorem A1 (translating binary Lorentz residual)

The first constructive test of Theorem G is the translating maximum-curvature binary benchmark defined in [Translating Binary Benchmark](#translating-binary-benchmark). Start from the certified rest binary with radius $R_0$, period $T_0$, active root ledger $b_0$, and positive Jacobian floors. For each $0<u<c_f$, solve the absolute-time delayed root equations for
$$
\mathbf{x}_{\sigma}(t)
=
u t\,\hat{\mathbf e}
+
\sigma\,\boldsymbol{\rho}_u(\theta(t))
$$
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
with either
$$
\mathcal{R}_{\mathrm{bin}}(u)=0
$$
on the primitive branch, or a controlled residual whose source is a named causal-root feature: a branch transition, small Jacobian floor, finite-memory cutoff, shape-mode excitation, or Noether sea dressing row.

This calculation decides whether the first available internal clock and ruler obey primitive FitzGerald contraction and clock dilation:
$$
\frac{L_{\parallel}(u)}{L_{\perp}(u)}
=
\frac{1}{\gamma_f(u)},
\qquad
\frac{T_u}{T_0}
=
\gamma_f(u),
\qquad
\gamma_f(u)=\left(1-\frac{u^2}{c_f^2}\right)^{-1/2}
$$
If these equalities hold on the same branch ledger, the Lorentzian compensation has been derived for the two-body clock rather than asserted. If they fail, the residual is the earliest foundation-level falsification pressure: it marks exactly where the primitive kernel departs from Lorentzian matter behavior before nested shell braid averaging or Noether sea dressing is allowed to repair anything.

### Theorem A (attractor existence under drift)

For admissible coupling and regularization parameters, there exists a bounded translating attractor family for binary and nested shell braid systems for $\|\mathbf{v}\|<c_f$.

### Theorem B (anisotropic deformation law)

Let $\beta_\star=v/c_\star$ and $\gamma_\star=(1-\beta_\star^2)^{-1/2}$ for the declared observer channel.

On the attracting manifold, principal-axis deformation obeys
$$
\frac{a_{\parallel}}{a_{\perp}}
=1-\frac{1}{2}\beta_\star^2-\frac{1}{8}\beta_\star^4+R_1(\beta_\star)
\qquad
|R_1(\beta_\star)|\le C_1\epsilon_{\text{LV}}\,\beta_\star^2
$$
equivalently
$$
\frac{a_{\parallel}}{a_{\perp}}=\frac{1}{\gamma_\star}+R_1(\beta_\star)
$$

### Theorem C (clock renormalization law)

Fundamental period satisfies
$$
\frac{T(v)}{T_0}
=1+\frac{1}{2}\beta_\star^2+\frac{3}{8}\beta_\star^4+R_2(\beta_\star)
\qquad
|R_2(\beta_\star)|\le C_2\epsilon_{\text{LV}}\,\beta_\star^2
$$
equivalently
$$
\frac{T(v)}{T_0}=\gamma_\star+R_2(\beta_\star)
$$

### Theorem D (operational Lorentz closure)

For composite observers formed from this assembly class, two-way kinematic observables satisfy
$$
\Delta_{\text{tw}}(\beta_\star,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta_\star)\cos(2m\theta)
\qquad
|\mathcal{A}_{2m}(\beta_\star)|\le C_m\epsilon_{\text{LV}}
$$
uniformly on $0\le\beta_\star\le\beta_{\max}$.

### Theorem E (coefficient identifiability from attractor statistics)

Given smooth attracting branches and nondegenerate Jacobian of the map
$$
(k_2,\ell_2,k_4,\ell_4)\mapsto (\alpha_2,\alpha_4,\tau_2,\tau_4)
$$
the drift-response coefficients are locally identifiable from $(a_{\parallel}/a_{\perp},T/T_0)$ data up to the leakage scale $O(\epsilon_{\text{LV}})$.

### Theorem F (cross-regime universality of closure coefficients)

If binary and nested shell braid attracting branches exist, are smooth in $\beta$, share the same coarse-grained causal kernel class, and satisfy nonresonant hierarchy
$$
\omega_H\gg \omega_M\gg \omega_L\qquad
|m\omega_L-n\omega_M|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\ \ \forall\ m,n\in\mathbb{Z}\setminus\{0\}
\qquad
\gamma_D>0,\ \tau_D>1
$$
then their extracted closure vectors satisfy
$$
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_{W}
\le
C_Q\left(\frac{r_M}{r_L}\right)^2
+O\!\left(\left(\frac{r_H}{r_L}\right)^2\right)
$$
In particular, if $(r_M/r_L)^2\le C_{23}\epsilon_{\text{LV}}$, operational Lorentz closure is universal across these two micro-regimes up to preferred-frame leakage.

### Theorem G (structural-integrity common-limit closure)

This theorem is the parent Lorentz-closure target for Theorems B-D, the photon synchronization row, and the weak-field gravitational-wave speed row. Theorem A0 supplies the primitive kinematic obstruction: a material branch that needs forward partner-hit closure cannot have a sustained translating ledger with $c_{\mathrm{mat}}^{\mathrm{lim}}>c_f$. Theorem A1 supplies the first constructive clock/ruler decision surface by asking whether the translating two-body branch returns $R_T^{\mathrm{bin}}=0$ and $R_{\xi}^{\mathrm{bin}}=0$ before nested shell braid averaging or Noether sea dressing is invoked. In the weak homogeneous observer branch, a retained material assembly branch closes only if the matter-assembly limiting speed, the Noether sea dressed clock/ruler speed, the photon-channel speed, and the empirical calibration speed obey
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
on the same causal-root ledger. The same branch record must then supply the longitudinal deformation $a_\parallel/a_\perp=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, clock cadence $d\tau/dt=\gamma_0^{-1}+O(\epsilon_{\text{LV}})$, two-way signal residual $\Delta_{\text{tw}}=O(\epsilon_{\text{LV}})$, and the gravitational-wave speed residual $|c_{\mathrm{GW}}/c_\gamma-1|\le\epsilon_{\mathrm{GW}}$ in the weak-field TT channel. Closure fails if the photon speed, gravitational-wave speed, material limiting speed, or deformation coefficients require independently fitted dressing records.

## Observable Interface

Key outputs to pass into validation and simulation layers:

1. Predicted anisotropy harmonics for resonator-style tests.
2. Velocity-dependent clock shift coefficients beyond leading $\gamma$ term.
3. Orientation-dependent residuals in two-way propagation observables.
4. Parameter surfaces where leakage remains below target bounds.
5. Branch-sourced residual labels linking any nonzero $\Delta_{\text{tw}}$ sideband, clock residual, or shape residual to a specific causal-root ledger feature rather than to a free phenomenological coefficient.

## Failure Conditions

The Lorentzian conspiracy program fails if any of the following occur:

1. No stable translating attractor exists over physically relevant drift range.
2. Required contraction or period scaling appears only by fine tuning.
3. Residual anisotropy terms exceed accepted bounds after full observer construction.
4. Different assembly decorations produce incompatible kinematic laws that prevent universal operational closure.
5. The weak-field connection built from $g_{\mu\nu}^{\text{eff}}$ fails to reproduce a Newtonian Poisson limit for $\Phi_{\text{eff}}$ in the operational observer sector.
6. Diophantine nonresonance fails (small-divisor regime), causing secular interlayer resonance and invalidating the adiabatic mismatch bound used in [Nested Shell Braid Adiabatic Decoupling Bound](#nested-shell-braid-adiabatic-decoupling-bound).
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
4. [Nested Shell Braid Dynamics](../noether-braid/nested-shell-braid-dynamics.md)
5. `spacetime/*`
6. [validation/constraint-ledger.md](../validation/constraint-ledger.md)
7. [validation/no-go-theorems.md](../validation/no-go-theorems.md)
