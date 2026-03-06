# Lorentzian Conspiracy and Emergent Lorentz Kinematics

## Abstract

This document develops a first-principles program for deriving effective Lorentz kinematics inside $\mathbb{A}\mathbb{A}\mathbb{A}$ from delayed architrino dynamics in a Euclidean void with absolute time. The central claim is not postulated covariance, but dynamical compensation: moving assemblies deform and retune their internal frequencies so that assembly-built observers recover Lorentz-consistent clock and ruler behavior. The objective is an exact or asymptotically controlled derivation of
$$
L_{\parallel}(v)=\frac{L_0}{\gamma(v)},\qquad
T(v)=\gamma(v)\,T_0,\qquad
\gamma(v)=\frac{1}{\sqrt{1-v^2/c_f^2}},
$$
with bounded preferred-frame leakage in measurable observables.

## 1. Problem Statement

### 1.1 Kinematic closure target

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the substrate ontology is:

1. Euclidean 3-space with absolute coordinates.
2. Global absolute time $t$.
3. Finite propagation speed $c_f$ for potential transfer through the Noether Sea.

To match modern precision constraints, operational observers made from bound assemblies must infer effective Lorentz kinematics even though the substrate itself is not Minkowskian at the fundamental level. We call this required dynamical compensation the Lorentzian conspiracy.

### 1.2 Mathematical objective

Given a translating bound assembly (binary and then tri-binary), derive:

1. The velocity-dependent equilibrium shape tensor $Q(v)$ and its anisotropy.
2. The velocity-dependent internal period $T(v)$.
3. Conditions under which $(Q(v),T(v))$ produce effective Lorentz ruler and clock laws.
4. Residual non-Lorentz terms and their scaling.

## 2. Governing Microdynamics

### 2.1 Causal path-history interaction form

For architrino labels $i,j\in\{1,\dots,N\}$, with positions $\mathbf{x}_i(t)$ and masses $m_i$,
$$
m_i\ddot{\mathbf{x}}_i(t)=\sum_{j\neq i}\mathbf{F}_{ij}\!\left(\mathbf{x}_i(t),\mathbf{x}_j(t-\tau_{ij}(t)),\dot{\mathbf{x}}_j(t-\tau_{ij}(t))\right)+\mathbf{F}^{\text{self}}_i(t),
$$
with causal delay
$$
\tau_{ij}(t)=\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t-\tau_{ij}(t))\|}{c_f}.
$$
The self-hit term $\mathbf{F}^{\text{self}}_i$ captures history-dependent wake re-intersections and is the non-Markovian source of branch-sensitive corrections.

### 2.2 Co-moving decomposition

For an assembly center trajectory $\mathbf{X}(t)$ with mean velocity $\mathbf{v}$, write
$$
\mathbf{x}_i(t)=\mathbf{X}(t)+\mathbf{r}_i(t),\qquad \sum_i m_i\mathbf{r}_i(t)=\mathbf{0}.
$$
The closure task is to solve for bounded relative motion $\mathbf{r}_i(t)$ under translation $|\mathbf{v}|<c_f$ and extract period and geometry renormalization.

### 2.3 Dimensionless drift-delay form and variational closure

Fix a rest-attractor length scale $a_0$ and period $T_0$, and define
$$
\beta\equiv \frac{v}{c_f},\qquad s\equiv \frac{t}{T_0},\qquad
\boldsymbol{\rho}_i(s)\equiv \frac{\mathbf{r}_i(t)}{a_0},\qquad
\chi\equiv \frac{c_f T_0}{a_0}.
$$
Then delay closure in co-moving coordinates is
$$
\hat{\tau}_{ij}(s)=\frac{1}{\chi}\left\|
\boldsymbol{\rho}_i(s)-\boldsymbol{\rho}_j\!\left(s-\hat{\tau}_{ij}(s)\right)
+\chi\beta\,\hat{\mathbf{e}}_{\parallel}\hat{\tau}_{ij}(s)
\right\|,
$$
with $\hat{\tau}_{ij}\equiv \tau_{ij}/T_0$.

Let $\boldsymbol{\rho}^\star(s;\beta)$ be a $P(\beta)$-periodic translating attractor. Linearization gives a delay-Floquet system
$$
\delta\dot{\mathbf{y}}(s)=A_0(s;\beta)\,\delta\mathbf{y}(s)+\sum_{n=1}^{N_d}A_n(s;\beta)\,\delta\mathbf{y}\!\left(s-\hat{\tau}_n^\star\right),
$$
where $\mathbf{y}$ stacks positions and velocities in relative coordinates. Kinematic closure requires:

1. Existence of $\boldsymbol{\rho}^\star(s;\beta)$ for $\beta\in[0,\beta_{\max})$.
2. Spectral stability of the monodromy operator (all nontrivial Floquet multipliers inside the unit disk).
3. Smooth coefficient maps for axis and period renormalization extracted from $\boldsymbol{\rho}^\star$.

### 2.4 Exact substrate symmetries and delay currents

At action level, use a causal path-history functional
$$
S=\int dt\left[
\sum_i \frac{1}{2}m_i\dot{\mathbf{x}}_i^2
-\frac{1}{2}\sum_{i\ne j}\int_{\Sigma_{ij}} d^2\sigma\,
\mathcal{L}_{\text{int}}\!\left(\mathbf{x}_i(t),\mathbf{x}_j(t-\tau)\right)
\right].
$$
The exact substrate symmetry group is
$$
G_{\text{fund}}=E(3)\times \mathbb{R},
$$
so Noether currents in delay form give conserved totals including wake channels:
$$
\mathbf{P}_{\text{tot}}
=
\sum_i m_i\dot{\mathbf{x}}_i+\mathbf{P}_{\text{wake}},
\qquad
E_{\text{tot}}
=
\sum_i \frac{1}{2}m_i\dot{\mathbf{x}}_i^2+E_{\text{wake}}.
$$
Therefore an isolated translating assembly admits a co-moving reduction to a bounded periodic or quasi-periodic branch $\boldsymbol{\rho}^\star(s;\beta)$ with fixed mean drift $\mathbf{v}=\mathbf{P}_{\text{tot}}/M_{\text{tot}}$.

## 3. Emergent Kinematics from Delay Anisotropy

### 3.1 Directional delay asymmetry

For a benchmark drifting binary with instantaneous separation vector $\mathbf{r}=r\,\hat{\mathbf{n}}$ and center drift $\mathbf{v}=v\,\hat{\mathbf{e}}_{\parallel}$, causal-delay closure satisfies
$$
\tau=\frac{\|\mathbf{r}+\mathbf{v}\tau\|}{c_f}.
$$
With $\mu\equiv \hat{\mathbf{n}}\cdot\hat{\mathbf{e}}_{\parallel}$ and $\beta=v/c_f$, the two directional roots are
$$
\tau_{\pm}(r,\mu;\beta)
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta^2(1-\mu^2)}\pm \beta\mu}{1-\beta^2}.
$$
Special orientations recover standard forms:
$$
\mu=1:\quad
\tau_{+}=\frac{r}{c_f-v},\qquad
\tau_{-}=\frac{r}{c_f+v},
$$
$$
\mu=0:\quad
\tau_{+}=\tau_{-}=\frac{r}{\sqrt{c_f^2-v^2}}.
$$
The symmetric delay channel and associated causal-rate proxy are
$$
\bar{\tau}(\mu;\beta)\equiv \frac{\tau_{+}+\tau_{-}}{2}
=\frac{r}{c_f}\,
\frac{\sqrt{1-\beta^2(1-\mu^2)}}{1-\beta^2},
$$
$$
\nu(\mu;\beta)\equiv \frac{1}{\bar{\tau}(\mu;\beta)}.
$$
Since $\bar{\tau}$ depends on $\mu$, interaction response is anisotropic and induces
$$
K_{\parallel}(v)\neq K_{\perp}(v).
$$

### 3.1.1 Weak-velocity expansion to $O(\beta^4)$

Direct expansion of the symmetric lag gives
$$
\bar{\tau}(\mu;\beta)=\frac{r}{c_f}\left[
1+\frac{1+\mu^2}{2}\beta^2
+\frac{3+6\mu^2-\mu^4}{8}\beta^4
+O(\beta^6)
\right],
$$
and thus
$$
\nu(\mu;\beta)=\frac{c_f}{r}\left[
1-\frac{1+\mu^2}{2}\beta^2
+\frac{-1-2\mu^2+3\mu^4}{8}\beta^4
+O(\beta^6)
\right].
$$
Two anchor limits are:
$$
\mu=1:\ \bar{\tau}=\frac{r}{c_f}\gamma^2,\ \nu=\frac{c_f}{r}(1-\beta^2),
\qquad
\mu=0:\ \bar{\tau}=\frac{r}{c_f}\gamma,\ \nu=\frac{c_f}{r}\frac{1}{\gamma}.
$$

### 3.2 Effective shape law

Define the cycle-averaged shape tensor on the translating attractor:
$$
Q_{ab}(v)\equiv
\frac{1}{M}
\left\langle
\sum_i m_i\,r_{i,a}r_{i,b}
\right\rangle_{\text{cyc}},
\qquad
M\equiv \sum_i m_i.
$$
Let $q_{\parallel}(v),q_{\perp,1}(v),q_{\perp,2}(v)$ be principal-frame eigenvalues of $Q(v)$, with principal axis chosen along drift for $q_{\parallel}$. Define semiaxes
$$
a_{\parallel}(v)\equiv \sqrt{q_{\parallel}(v)},\qquad
a_{\perp}(v)\equiv \sqrt{\frac{q_{\perp,1}(v)+q_{\perp,2}(v)}{2}}.
$$
The Lorentzian conspiracy then requires
$$
\frac{a_{\parallel}(v)}{a_{\perp}(v)}=\frac{1}{\gamma(v)}+O(\epsilon_{\text{LV}}),
$$
with $\epsilon_{\text{LV}}$ the preferred-frame leakage scale.

### 3.2.1 Quadratic closure and coefficient constraints

On the attracting manifold, use principal-frame quadratic closure
$$
U_{\text{eff}}=\frac{1}{2}K_{\parallel}(v)\,r_{\parallel}^2+\frac{1}{2}K_{\perp}(v)\left(r_{\perp,1}^2+r_{\perp,2}^2\right).
$$
For fixed action shell, semiaxes scale as $a_i\propto K_i^{-1/2}$, hence
$$
\frac{a_{\parallel}}{a_{\perp}}=\sqrt{\frac{K_{\perp}}{K_{\parallel}}}.
$$
Write
$$
\frac{K_{\parallel}}{K_0}=1+k_2\beta^2+k_4\beta^4+O(\beta^6)+\Delta_{\parallel}^{\text{LV}},
$$
$$
\frac{K_{\perp}}{K_0}=1+\ell_2\beta^2+\ell_4\beta^4+O(\beta^6)+\Delta_{\perp}^{\text{LV}},
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
+O(\beta^6)+O(\epsilon_{\text{LV}}).
$$
Matching to
$$
\frac{1}{\gamma}=1-\frac{1}{2}\beta^2-\frac{1}{8}\beta^4+O(\beta^6)
$$
imposes
$$
\ell_2-k_2=-1,
$$
$$
4(\ell_4-k_4)+3k_2^2-2k_2\ell_2-\ell_2^2=-1.
$$

### 3.2.2 Stiffness tensor from causal-wake surface integrals

To anchor coefficient matching in the microdynamics, define the pairwise causal-wake potential on a translating attractor $\boldsymbol{\rho}^\star(s;\beta)$:
$$
\mathcal{U}_{ij}(t;\beta)\equiv
\int_{\Sigma_{ij}^{\text{wake}}(t)}
\frac{\kappa\,\epsilon^2}{\|\mathbf{x}_i(t)-\mathbf{x}_j(t-\tau)\|^2}\,
W_{ij}(t,\sigma;\eta)\,d^2\sigma,
$$
where $W_{ij}$ is the regularized causal kernel weight and $\eta>0$ is the regularization scale.
Set
$$
U_{\text{eff}}(t;\beta)\equiv \sum_{i<j}\mathcal{U}_{ij}(t;\beta),
\qquad
K_{ab}(\beta)\equiv
\left\langle
\frac{\partial^2 U_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}},
$$
with cycle average $\langle\cdot\rangle_{\text{cyc}}$ taken on $\boldsymbol{\rho}^\star$.
Project to principal channels:
$$
K_{\parallel}=\hat{e}_{\parallel}^a K_{ab}\hat{e}_{\parallel}^b,\qquad
K_{\perp}=\frac{1}{2}(\delta^{ab}-\hat{e}_{\parallel}^a\hat{e}_{\parallel}^b)K_{ab}.
$$

Dimensionless factorization exposes Category A coupling:
$$
K_i(\beta)=\frac{\kappa\,\epsilon^2}{a_0^3}\,\mathcal{I}_i(\beta,\chi,\eta,\dots),
\qquad i\in\{\parallel,\perp\}.
$$
Hence
$$
k_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\parallel}\big|_{\beta=0}}
{2\,\mathcal{I}_{\parallel}(0)},
\qquad
\ell_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\perp}\big|_{\beta=0}}
{2\,\mathcal{I}_{\perp}(0)},
$$
$$
k_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\parallel}\big|_{\beta=0}}
{24\,\mathcal{I}_{\parallel}(0)},
\qquad
\ell_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\perp}\big|_{\beta=0}}
{24\,\mathcal{I}_{\perp}(0)}.
$$
Therefore the Lorentz-matching constraints in Sec. 3.2.1 and Sec. 3.3.1 become explicit derivative identities on $\mathcal{I}_{\parallel},\mathcal{I}_{\perp}$ evaluated on the delay-Floquet attractor.

### 3.3 Period renormalization

Let $T(v)$ be the fundamental oscillation period of the assembly attractor in absolute time. Operational proper-time behavior requires
$$
T(v)=\gamma(v)\,T_0\,[1+O(\epsilon_{\text{LV}})].
$$
Exact closure is the limit $\epsilon_{\text{LV}}\to 0$.

### 3.3.1 Clock-channel expansion and minimal closure solution

Use a symmetric clock-frequency aggregator
$$
\omega_{\text{clk}}(v)\equiv \omega_0\left(\frac{K_{\parallel}K_{\perp}^2}{K_0^3}\right)^{1/6},
\qquad
\frac{T(v)}{T_0}=\frac{\omega_0}{\omega_{\text{clk}}(v)}.
$$
Then
$$
\frac{T(v)}{T_0}
=1-\frac{k_2+2\ell_2}{6}\beta^2
+\left[
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
\right]\beta^4
+O(\beta^6)+O(\epsilon_{\text{LV}}).
$$
Matching to
$$
\gamma=1+\frac{1}{2}\beta^2+\frac{3}{8}\beta^4+O(\beta^6)
$$
gives the clock constraints
$$
k_2+2\ell_2=-3,
$$
$$
\frac{7}{72}(k_2+2\ell_2)^2
-\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
=\frac{3}{8}.
$$
Combining with shape closure yields a minimal matched coefficient set
$$
k_2=-\frac{1}{3},\qquad \ell_2=-\frac{4}{3},
$$
and, at $O(\beta^4)$,
$$
k_4=-\frac{1}{9},\qquad \ell_4=\frac{2}{9},
$$
before leakage terms are added.

### 3.4 Outer-binary transduction hypothesis (working)

Assume the outer binary $L$ is the dominant transducer for energy exchange with passerby assemblies (non-locally coupled encounters). Under this hypothesis, the leading kinematic response is boundary-driven at $L$, then propagated inward through $M$ and $H$ couplings.

For locally coupled assemblies (strong axial coupling), interaction pathways are distinct and should be modeled as a separate regime, not merged with passerby-transfer fits.

### 3.5 State update map for single-quantum uptake

For an assembly state
$$
\mathcal{S}=\{v_{\text{tr}}, f_H,f_M,f_L,\mathbf{A},\mathcal{E}_{\text{excl}},\tau_{\text{op}}\},
$$
let one absorbed quantum $\Delta E_q$ induce
$$
\mathcal{S}\mapsto \mathcal{S}'=\mathcal{S}+\Delta\mathcal{S}(\Delta E_q),
$$
with the following structured components:

1. Translational architrino speed increase: $\Delta v_{\text{tr}}>0$.
2. Discrete frequency retuning of $H,M,L$: $\Delta f_k=n_k\,\delta f_k$, with $n_k\in\mathbb{Z}$ and $k\in\{H,M,L\}$.
3. Tri-binary axis realignment: $\Delta\mathbf{A}\neq 0$ (precession/tilt of principal axes).
4. Exclusion-zone geometry shift: $\Delta\mathcal{E}_{\text{excl}}\neq 0$ (shape and orientation update).
5. Operational time response shift: $\Delta\tau_{\text{op}}\neq 0$.

### 3.6 Open mapping: perceived time dilation in $\mathbb{A}\mathbb{A}\mathbb{A}$

The human-observed "time dilation" channel is not yet fully mapped in substrate variables. The working interpretation in this document is:
$$
\tau_{\text{op}}=\tau_{\text{op}}(f_H,f_M,f_L,\mathbf{A},\mathcal{E}_{\text{excl}},v_{\text{tr}}),
$$
where $\tau_{\text{op}}$ is an emergent clock functional of assembly internal frequencies, axis geometry, exclusion-zone shape, and translation state.

The immediate task is to identify which subset dominates $\partial \tau_{\text{op}}/\partial E$ in the passerby-transfer regime, with the default prior that outer-binary $L$ mediated updates are first-order.

### 3.7 Evolving scenario: exclusion-volume driven effective spacetime

Working assumption:

1. The outer precessing binary of a Noether core defines the effective exclusion volume boundary.
2. Each tri-binary layer ($H,M,L$) has its own orbital axis.
3. Total angular and translational momentum are conserved at assembly level (up to modeled exchange channels with environment).

Proposed mechanism chain under applied force (acceleration of a Noether-core-based assembly):

1. External forcing increases translational state.
2. Axis coupling drives partial alignment of $H,M,L$ orbital axes.
3. Alignment is accompanied by binary radius contraction across layers (with layer-dependent sensitivity).
4. The exclusion volume changes shape and orientation because its boundary is set by the precessing outer binary $L$.
5. Neighboring assemblies then see changed path-history geometry and interaction timing.
6. At coarse scale, this appears as a modified effective kinematic/geometric background, i.e. an emergent spacetime response.

This can be treated as a coupled state map:
$$
(\mathbf{v},\mathbf{A}_H,\mathbf{A}_M,\mathbf{A}_L,R_H,R_M,R_L,\mathcal{E}_{\text{excl}})
\xrightarrow{\;\Delta \mathbf{p}\;}
(\mathbf{v}',\mathbf{A}_H',\mathbf{A}_M',\mathbf{A}_L',R_H',R_M',R_L',\mathcal{E}_{\text{excl}}').
$$

Initial directional hypothesis for acceleration response:
$$
\|\mathbf{A}_H-\mathbf{A}_L\|,\ \|\mathbf{A}_M-\mathbf{A}_L\| \downarrow,\qquad
R_H,R_M,R_L \downarrow,
$$
with the strongest transduction at $L$.

Interpretive thesis:

Einstein-like spacetime behavior may be recovered as the continuum limit of moving, deforming exclusion volumes of Noether cores under translation and local volume variation, rather than from fundamental geometric curvature at substrate level.

Consistency checks required for this scenario:

1. Contraction and alignment must satisfy conservation laws and admissible torque channels.
2. The induced clock/ruler renormalization must reproduce Lorentz-like scaling to required accuracy.
3. Residual anisotropy harmonics must remain below empirical bounds after observer construction.
4. Local axial-coupling encounters must be modeled separately from passerby-transfer events.

Status: scenario is a structured hypothesis, not yet a proved derivation. It is retained as an evolving design model for theorem and simulation development.

### 3.8 Two-channel deformation: shape plus scale

Relevant to Lorentzian closure, the core deformation is not only axis-ratio change. A working two-channel model is:

1. Shape channel (oblateness): longitudinal compression relative to transverse radius.
2. Scale channel (radius rescaling): transverse radius changes with energy state.

Use
$$
R_\parallel=\frac{R_\perp}{\gamma},\qquad \gamma=\frac{1}{\sqrt{1-\beta^2}},\qquad \beta=\frac{v_{\text{tr}}}{c_f},
$$
and
$$
R_\perp=R_\perp(E),\qquad \frac{dR_\perp}{dE}<0
$$
as the default constitutive sign convention in energized regimes.

The corresponding exclusion volume model is
$$
V(\beta,E)=\frac{4\pi}{3}R_\perp(E)^2R_\parallel(E,\beta)
=\frac{4\pi}{3}R_\perp(E)^3\sqrt{1-\beta^2}.
$$

This gives a direct state-space channel from energy and translation into local medium geometry:
$$
(\beta,E)\longmapsto (R_\parallel,R_\perp,V).
$$

### 3.9 Local deformation fields and effective geometry handoff

For coarse-grained modeling, define local fields
$$
\xi(x)=\frac{R_\parallel}{R_\perp}=\frac{1}{\gamma(x)},\qquad
\lambda(x)=\frac{R_\perp(x)}{R_{\perp,0}},
$$
with $\xi\in(0,1]$ as shape and $\lambda$ as scale.

Together with local assembly density $n(x)$ and preferred-frame flow/orientation $\hat{u}(x)$, these define a minimal handoff tuple
$$
(\xi,\lambda,n,\hat{u})_x
$$
for constructing effective kinematic and metric responses. The kinematic closure requirement is that observer-built rods/clocks from this medium recover Lorentz-consistent operational laws to bounded leakage.

### 3.9.1 Algebraic effective metric map from the handoff tuple

To make Stage D constructive, introduce an observer-sector pseudo-Riemannian template
$$
\eta^{\mu\nu}=\mathrm{diag}(-1,1,1,1),
$$
used only as an operational constitutive object (not as substrate ontology). Let $\hat{u}^\mu$ be the unit medium-flow 4-field with
$$
\eta_{\mu\nu}\hat{u}^\mu\hat{u}^\nu=-1.
$$
Define the disformal inverse metric
$$
g_{\text{eff}}^{\mu\nu}(x)=
\Omega^2(n,\lambda)\left[
\eta^{\mu\nu}
+\left(1-\xi^2(x)\right)\hat{u}^\mu\hat{u}^\nu
\right].
$$
Its covariant form is
$$
g_{\mu\nu}^{\text{eff}}(x)=
\Omega^{-2}(n,\lambda)\left[
\eta_{\mu\nu}
+\left(1-\xi^{-2}(x)\right)\hat{u}_{\mu}\hat{u}_{\nu}
\right].
$$
Hence microscopic shape closure $\xi=1/\gamma$ is injected directly into $g_{\mu\nu}^{\text{eff}}$.

In the local medium-rest frame ($\hat{u}^\mu=(1,0,0,0)$), with $x^0=c_f t$:
$$
ds_{\text{eff}}^2=g_{\mu\nu}^{\text{eff}}dx^\mu dx^\nu
=\Omega^{-2}\left[-\xi^{-2}(dx^0)^2+d\mathbf{x}^2\right].
$$
Therefore the clock channel is governed by $\Omega^{-1}\xi^{-1}$ and the spatial ruler channel by $\Omega^{-1}$, matching the two-channel deformation interpretation.

## 4. Observer Construction and Operational Invariance

### 4.1 Assembly clocks and rods

Physical observers are built from the same bound-state class that obeys the above deformation and period laws. Therefore, measurement devices inherit velocity-dependent retuning.

### 4.2 Two-way signal speed criterion

For ruler and clock systems made of translated assemblies, two-way signal experiments must satisfy
$$
c_{2w}(\theta,v)=c_{\text{iso}}+O(\epsilon_{\text{LV}}),
$$
uniformly in orientation $\theta$. This is the operational statement that maps substrate anisotropy into effective Lorentz symmetry at observer scale.

### 4.3 Round-trip anisotropy cancellation through $O(\beta^4)$

Let arm lengths in the preferred frame be
$$
\frac{L_{\parallel}}{L_0}=1+\alpha_2\beta^2+\alpha_4\beta^4+O(\beta^6),\qquad
\frac{L_{\perp}}{L_0}=1+b_2\beta^2+b_4\beta^4+O(\beta^6).
$$
Round-trip absolute times are
$$
t_{\parallel}
=\frac{2L_{\parallel}c_f}{c_f^2-v^2}
=\frac{2L_0}{c_f}\left[
1+(1+\alpha_2)\beta^2+(1+\alpha_2+\alpha_4)\beta^4+O(\beta^6)
\right],
$$
$$
t_{\perp}
=\frac{2L_{\perp}}{\sqrt{c_f^2-v^2}}
=\frac{2L_0}{c_f}\left[
1+\left(b_2+\frac{1}{2}\right)\beta^2
+\left(b_4+\frac{b_2}{2}+\frac{3}{8}\right)\beta^4
+O(\beta^6)
\right].
$$
Define the normalized anisotropy mismatch
$$
\Delta_{\text{tw}}(\beta)\equiv \frac{t_{\parallel}-t_{\perp}}{2L_0/c_f}
=A_2\beta^2+A_4\beta^4+O(\beta^6),
$$
with
$$
A_2=\alpha_2-b_2+\frac{1}{2},
\qquad
A_4=\alpha_4-b_4+\alpha_2-\frac{b_2}{2}+\frac{5}{8}.
$$
Operational isotropy through $O(\beta^4)$ requires
$$
A_2=0,\qquad A_4=0.
$$
In the transverse-gauge choice $b_2=b_4=0$, this yields
$$
\alpha_2=-\frac{1}{2},\qquad \alpha_4=-\frac{1}{8},
$$
which is precisely $L_{\parallel}=L_0/\gamma+O(\beta^6)$.

## 5. Derivation Program

### 5.1 Stage A: binary analytic benchmark

Start with a single causal path-history binary under constant drift $\mathbf{v}$. Derive:

1. Existence and stability of periodic or quasi-periodic attractors.
2. Closed-form or asymptotic estimates for $(a_{\parallel}/a_{\perp})(v)$.
3. First nonzero leakage coefficients in $v/c_f$ expansion.

### 5.2 Stage B: tri-binary full closure

Promote to nested tri-binary with coupled orbital scales. Establish:

1. Persistence of aligned attractor family under drift.
2. Factorization or controlled coupling of inner/middle/outer period shifts.
3. Emergent universal $\gamma$-law independent of decoration details, within a defined class.

### 5.3 Stage C: continuum handoff

Derive coarse-grained kinematic constitutive relations used by effective metric models:
$$
\mathcal{K}_{\text{micro}} \Longrightarrow \mathcal{K}_{\text{eff}}(v,\rho,\nabla\rho,\dots),
$$
so local assembly kinematics and macroscopic refractive geometry are mathematically linked.

### 5.4 Stage D: effective-medium and weak-field closure sequence

To connect the two-channel deformation model to observables, use the following sequence:

1. Single-core constitutive closure: derive or fit-test $R_\perp(E)$ and induced $\xi(E,\beta)$ from causal path-history tri-binary dynamics.
2. Effective-medium propagation law: construct $n_{\text{eff}}(\xi,\lambda,n)$ for signal transport through deformed-core populations.
3. Effective metric extraction: build $g_{\mu\nu}^{\text{eff}}$ from medium variables and preferred-frame structure.
4. Weak-field consistency checks: verify Newtonian limit and required post-Newtonian behavior in the operational observer sector.
5. Strong-field/cosmology consistency checks: test horizon-adjacent and expansion-regime implications of the same constitutive channels.

### 5.4.1 Effective connection and geodesic emergence

Given $g_{\mu\nu}^{\text{eff}}$ from Sec. 3.9.1, define
$$
\Gamma^\lambda_{\mu\nu}
=\frac{1}{2}g^{\lambda\rho}_{\text{eff}}
\left(
\partial_\mu g_{\rho\nu}^{\text{eff}}
+\partial_\nu g_{\rho\mu}^{\text{eff}}
-\partial_\rho g_{\mu\nu}^{\text{eff}}
\right).
$$
Geodesic flow in the observer sector is
$$
\frac{d^2x^\lambda}{d\tau^2}
+\Gamma^\lambda_{\mu\nu}
\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}=0.
$$

For weak drift, slowly varying medium flow, and quasi-static fields in a local medium-rest frame, define
$$
\Phi_{\text{eff}}(x)\equiv -c_f^2\ln\!\big(\Omega(n,\lambda)\,\xi\big).
$$
Then the nonrelativistic geodesic limit becomes
$$
\frac{d^2\mathbf{x}}{dt^2}
=-\nabla \Phi_{\text{eff}}
+O\!\left(\frac{|\mathbf{v}|^2}{c_f^2},\epsilon_{\text{LV}}\right),
$$
with explicit source channels
$$
\nabla \Phi_{\text{eff}}
=-c_f^2\left[
\partial_{\ln n}\ln\Omega\ \nabla\ln n
+\partial_{\ln \lambda}\ln\Omega\ \nabla\ln \lambda
+\nabla\ln\xi
\right].
$$
Thus gradients of $n$ and $\lambda$ (and kinematic $\xi$ gradients) enter the affine structure as the apparent-gravity source terms.

The eikonal/least-time handoff is then:
$$
\delta\!\int_{\Gamma} n_{\text{eff}}(x)\,ds=0
\quad\Longleftrightarrow\quad
\nabla_{\dot{x}}\dot{x}=0\ \text{under}\ g_{\mu\nu}^{\text{eff}}
$$
in the weak-field refractive regime.

### 5.5 Coefficient-extraction and closure estimators

For each simulated drift speed $\beta_j$, extract from long-window attractor statistics:
$$
\hat{\alpha}_j\equiv \frac{a_{\parallel}(\beta_j)}{a_{\perp}(\beta_j)},\qquad
\hat{\tau}_j\equiv \frac{T(\beta_j)}{T_0}.
$$
Fit even-power truncations
$$
\hat{\alpha}(\beta)=1+\hat{\alpha}_2\beta^2+\hat{\alpha}_4\beta^4,\qquad
\hat{\tau}(\beta)=1+\hat{\tau}_2\beta^2+\hat{\tau}_4\beta^4.
$$
Lorentz closure at this order requires
$$
\hat{\alpha}_2=-\frac{1}{2},\quad \hat{\alpha}_4=-\frac{1}{8},\qquad
\hat{\tau}_2=\frac{1}{2},\quad \hat{\tau}_4=\frac{3}{8}.
$$
Define sup-norm closure defects on a calibration band $\beta\in[0,\beta_\star]$:
$$
\mathcal{E}_{\text{shape}}
\equiv
\sup_{0\le \beta\le \beta_\star}
\left|\hat{\alpha}(\beta)-\frac{1}{\gamma(\beta)}\right|,
$$
$$
\mathcal{E}_{\text{clock}}
\equiv
\sup_{0\le \beta\le \beta_\star}
\left|\hat{\tau}(\beta)-\gamma(\beta)\right|.
$$
For two-way anisotropy, fit
$$
\Delta_{\text{tw}}(\beta,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta)\cos(2m\theta),
$$
and enforce
$$
\sup_{0\le \beta\le \beta_\star}|\mathcal{A}_{2m}(\beta)|\le C_m\epsilon_{\text{LV}}.
$$

### 5.6 Analytic derivation of kinematic closure coefficients

On the circular benchmark branch, take the rest-frame attractor $\boldsymbol{\rho}^\star(s;0)$ as a stable planar orbit of radius $r_0$ and frequency $\omega_0$. The cycle carries emergent phase symmetry $\phi\mapsto \phi+\text{const}$ with adiabatic invariant
$$
J=\oint \mathbf{p}_{\text{eff}}\cdot d\mathbf{r}.
$$
For each principal oscillator channel, $J_i\propto \sqrt{K_i}\,A_i^2$, so adiabatic drift retuning implies
$$
A_i(\beta)=A_i(0)\left(\frac{K_i(0)}{K_i(\beta)}\right)^{1/4}.
$$
This provides a Noether-constrained route from stiffness expansion to the coefficient extraction in Sec. 3.2.2.

For translation $\mathbf{v}=v\hat{\mathbf{e}}_{\parallel}$ with $\beta=v/c_f$, use the retarded potential form
$$
\mathcal{U}_{\text{eff}}(\mathbf{r};\beta)
=
\frac{\kappa\,\epsilon^2}{r_{\text{ret}}\!\left(1-\boldsymbol{\beta}\cdot \hat{\mathbf{n}}_{\text{ret}}\right)},
\qquad
\boldsymbol{\beta}\equiv \frac{\mathbf{v}}{c_f}.
$$
Define stiffness by cycle-averaged Hessian evaluation on $\boldsymbol{\rho}^\star(s;\beta)$:
$$
K_{ab}(\beta)
=
\left\langle
\frac{\partial^2 \mathcal{U}_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\text{cyc}}.
$$
Expanding the retarded delay closure
$$
\tau=\frac{\|\mathbf{r}+\mathbf{v}\tau\|}{c_f}
$$
and projecting longitudinal/transverse channels gives
$$
\mathcal{I}_{\parallel}(\beta)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\cos^2\theta}{(1-\beta\cos\theta)^3}
=
\mathcal{I}_0\left[1-\frac{1}{3}\beta^2-\frac{1}{9}\beta^4+O(\beta^6)\right],
$$
$$
\mathcal{I}_{\perp}(\beta)
=
\mathcal{I}_0\int_0^{2\pi}\frac{d\theta}{2\pi}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^3}
=
\mathcal{I}_0\left[1-\frac{4}{3}\beta^2+\frac{2}{9}\beta^4+O(\beta^6)\right].
$$
The exact Noether route and the Sec. 3.2.2 derivative route are equivalent once both are expanded on the same branch.
Using the Sec. 3.2.2 extraction rules,
$$
k_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\parallel}\big|_{\beta=0}}
{2\,\mathcal{I}_{\parallel}(0)},
\quad
\ell_2=
\frac{\partial_{\beta}^2\mathcal{I}_{\perp}\big|_{\beta=0}}
{2\,\mathcal{I}_{\perp}(0)},
$$
$$
k_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\parallel}\big|_{\beta=0}}
{24\,\mathcal{I}_{\parallel}(0)},
\quad
\ell_4=
\frac{\partial_{\beta}^4\mathcal{I}_{\perp}\big|_{\beta=0}}
{24\,\mathcal{I}_{\perp}(0)},
$$
hence
$$
(k_2,\ell_2,k_4,\ell_4)
=
\left(-\frac{1}{3},-\frac{4}{3},-\frac{1}{9},\frac{2}{9}\right).
$$
So the $O(\beta^4)$ closure coefficients are obtained directly from the causal path-history Hessian on the circular benchmark branch and are not fit parameters.

### 5.7 Tri-binary adiabatic decoupling bound

Let
$$
\mathbf{c}^{(2)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{binary}},
\qquad
\mathbf{c}^{(3)}\equiv (k_2,\ell_2,k_4,\ell_4)_{\text{tri-binary}},
$$
and define
$$
\mathcal{D}_{23}\equiv
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_W,
\qquad
\|x\|_W^2\equiv x^\top W x,\ W\succ 0.
$$
For nested layers $(H,M,L)$, decompose the outer-channel stiffness as
$$
K_{ab}^{(3)}
=
K_{ab}^{(L)}
+
\left\langle \frac{\partial^2\mathcal{U}_{L\leftrightarrow M}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}
+
\left\langle \frac{\partial^2\mathcal{U}_{L\leftrightarrow H}}{\partial r_a\partial r_b}\right\rangle_{\text{cyc}}.
$$
Under hierarchical separation
$$
\omega_H\gg \omega_M\gg \omega_L,\qquad
r_H\ll r_M\ll r_L,
$$
apply Hamiltonian averaging (Lie-Deprit transform) to eliminate fast phases. The monopole part renormalizes $\mathcal{I}_0$ only; the dipole contribution vanishes in the inner-layer center-of-mass frame; the leading anisotropic correction is quadrupolar and scales as $(r_M/r_L)^2$. Therefore
$$
\mathcal{D}_{23}
\le
C_Q\left(\frac{r_M}{r_L}\right)^2
+O\!\left(\left(\frac{r_H}{r_L}\right)^2\right).
$$
A sufficient closure condition is
$$
\left(\frac{r_M}{r_L}\right)^2\le C_{23}\epsilon_{\text{LV}},
$$
which yields
$$
\mathcal{D}_{23}\le C_{23}\epsilon_{\text{LV}}.
$$

### 5.8 Spectral-decoupling vulnerability criterion

The adiabatic bound in Sec. 5.7 assumes Diophantine nonresonance:
$$
|m\omega_L-n\omega_M|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\quad
\forall\,m,n\in\mathbb{Z}\setminus\{0\},
\qquad
\gamma_D>0,\ \tau_D>1.
$$
If this condition is violated so that
$$
|m\omega_L-n\omega_M|\lesssim \delta\omega_{\text{nl}},
$$
for small integers $(m,n)$ and nonlinear coupling width $\delta\omega_{\text{nl}}$, then small divisors invalidate the homological equations of the Lie transform. The resulting secular resonance destroys adiabatic decoupling, can break KAM tori, and drives $O(1)$ interlayer energy exchange. In that regime, coefficient drift can exceed the quadrupole estimate and local preferred-frame leakage can rise above $O(\epsilon_{\text{LV}})$ even when geometric hierarchy is large.

## 6. Theorem Targets

### Theorem A (attractor existence under drift)

For admissible coupling and regularization parameters, there exists a bounded translating attractor family for binary and tri-binary systems for $|\mathbf{v}|<c_f$.

### Theorem B (anisotropic deformation law)

On the attracting manifold, principal-axis deformation obeys
$$
\frac{a_{\parallel}}{a_{\perp}}
=1-\frac{1}{2}\beta^2-\frac{1}{8}\beta^4+R_1(\beta),
\qquad
|R_1(\beta)|\le C_1\epsilon_{\text{LV}}\,\beta^2,
$$
equivalently
$$
\frac{a_{\parallel}}{a_{\perp}}=\frac{1}{\gamma}+R_1(\beta).
$$

### Theorem C (clock renormalization law)

Fundamental period satisfies
$$
\frac{T(v)}{T_0}
=1+\frac{1}{2}\beta^2+\frac{3}{8}\beta^4+R_2(\beta),
\qquad
|R_2(\beta)|\le C_2\epsilon_{\text{LV}}\,\beta^2,
$$
equivalently
$$
\frac{T(v)}{T_0}=\gamma+R_2(\beta).
$$

### Theorem D (operational Lorentz closure)

For composite observers formed from this assembly class, two-way kinematic observables satisfy
$$
\Delta_{\text{tw}}(\beta,\theta)
=\sum_{m\ge 1}\mathcal{A}_{2m}(\beta)\cos(2m\theta),
\qquad
|\mathcal{A}_{2m}(\beta)|\le C_m\epsilon_{\text{LV}},
$$
uniformly on $\beta\in[0,\beta_\star]$.

### Theorem E (coefficient identifiability from attractor statistics)

Given smooth attracting branches and nondegenerate Jacobian of the map
$$
(k_2,\ell_2,k_4,\ell_4)\mapsto (\alpha_2,\alpha_4,\tau_2,\tau_4),
$$
the drift-response coefficients are locally identifiable from $(a_{\parallel}/a_{\perp},T/T_0)$ data up to the leakage scale $O(\epsilon_{\text{LV}})$.

### Theorem F (cross-regime universality of closure coefficients)

If binary and tri-binary attracting branches exist, are smooth in $\beta$, share the same coarse-grained causal kernel class, and satisfy nonresonant hierarchy
$$
\omega_H\gg \omega_M\gg \omega_L,\qquad
|m\omega_L-n\omega_M|
\ge
\frac{\gamma_D}{(|m|+|n|)^{\tau_D}}
\ \ \forall\ m,n\in\mathbb{Z}\setminus\{0\},
\qquad
\gamma_D>0,\ \tau_D>1,
$$
then their extracted closure vectors satisfy
$$
\left\|
\mathbf{c}^{(3)}-\mathbf{c}^{(2)}
\right\|_{W}
\le
C_Q\left(\frac{r_M}{r_L}\right)^2
+O\!\left(\left(\frac{r_H}{r_L}\right)^2\right).
$$
In particular, if $(r_M/r_L)^2\le C_{23}\epsilon_{\text{LV}}$, operational Lorentz closure is universal across these two micro-regimes up to preferred-frame leakage.

## 7. Observable Interface

Key outputs to pass into validation and simulation layers:

1. Predicted anisotropy harmonics for resonator-style tests.
2. Velocity-dependent clock shift coefficients beyond leading $\gamma$ term.
3. Orientation-dependent residuals in two-way propagation observables.
4. Parameter surfaces where leakage remains below target bounds.

## 8. Failure Conditions

The Lorentzian conspiracy program fails if any of the following occur:

1. No stable translating attractor exists over physically relevant drift range.
2. Required contraction or period scaling appears only by fine tuning.
3. Residual anisotropy terms exceed accepted bounds after full observer construction.
4. Different assembly decorations produce incompatible kinematic laws that prevent universal operational closure.
5. The weak-field connection built from $g_{\mu\nu}^{\text{eff}}$ fails to reproduce a Newtonian Poisson limit for $\Phi_{\text{eff}}$ in the operational observer sector.
6. Diophantine nonresonance fails (small-divisor regime), causing secular interlayer resonance and invalidating the adiabatic mismatch bound used in Sec. 5.7.

## 9. Position in the $\mathbb{A}\mathbb{A}\mathbb{A}$ Program

This priority is the first gate because it constrains all downstream bridges:

1. Without kinematic closure, emergent metric claims are underdetermined.
2. Without universal assembly clock behavior, phenomenological mapping to GR tests is unstable.
3. With kinematic closure established, metric constitutive derivations and PPN matching become sharply posed problems.

## 10. Canonical Dependencies

Primary theory anchors:

1. `dynamics/master-equation.md`
2. `dynamics/causal-action-functional.md`
3. `dynamics/binary-dynamics.md`
4. `dynamics/tri-binary-dynamics.md`
5. `spacetime/*`
6. `validation/constraint-ledger.md`
7. `validation/no-go-theorems.md`
