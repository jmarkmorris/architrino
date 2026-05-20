# $A_0$ Reduced Branch Certificate Packet

## Background

We are exploring an **assembly**, specifically a candidate neutral rest-branch Noether-core assembly called `$A_0$`.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, an assembly is not a point particle. It is a structured bundle of architrinos with internal motion, internal causal history, and sector-visible projections.

For this $A_0$ case, the reduced assembly has six constituents:

`I+`, `I-`, `M+`, `M-`, `O+`, `O-`

Think of them as three nested pro/anti binary layers:

- `I`: inner binary
- `M`: middle binary
- `O`: outer binary

Each layer has a radius, frequency, handedness, phase, and plane orientation. So the “geometry” is not just where the six things are right now. It includes:

1. Their spatial arrangement.
2. Their velocities.
3. Their layer phases.
4. Their orientation frames.
5. Their path-history.
6. The delayed causal connections among them.

The key geometric object is the **causal-root ledger**.

A causal root answers:

“At current time `$t$`, which past point `$t_0$` on some source constituent can causally reach this receiver constituent?”

The root equation is roughly:

$$
F_{ab}(t;t_0)
=
\|\mathbf{s}_a(t)-\mathbf{s}_b(t_0)\|
-
c_f(t-t_0)
=0.
$$

Here:

- `$a$` is the receiver.
- `$b$` is the source.
- `$\mathbf{s}_a(t)$` is the receiver position now.
- `$\mathbf{s}_b(t_0)$` is the source position in the past.
- `$c_f$` is the field-speed scale.

So the assembly is a moving geometry plus a delayed connection graph.

The roots come in classes:

- **partner roots**: between `+` and `-` members of the same layer;
- **self roots**: a constituent intersecting its own path-history;
- **inter-layer roots**: connections between different layers.

What we were testing is whether this internal geometry is stable enough to be meaningful. A pretty algebraic carrier is not enough. We need to know whether the assembly can evolve while preserving a coherent causal-root ledger.

The recent work added a branch-retention diagnostic:

$$
B_n(k)=\#\{r\in R_n:\kappa(r)=k\},
$$

where `$B_n(k)$` counts how many roots of branch type `$k$` exist at step `$n$`.

Then we compare against the initial root ledger:

$$
\mathcal{B}_{\mathrm{ret}}(n)
=
\sum_k \min(B_0(k),B_n(k)).
$$

Plainly: “Are the same kinds of internal causal connections still present after the assembly evolves?”

What we found is geometrically interesting:

- The initial direct-root ledger has 32 active branches.
- At longer evolution, two inner self-root branches looked like they disappeared on a coarse grid.
- Adaptive refinement showed they did not really disappear.
- Pushing farther, the same inner self-root branches gained an extra short-delay root.

That means the inner binary’s self-history geometry is near a **root multiplicity event**: not simple collapse, but possible fold/splitting behavior in the delayed self-connection chart.

Why this matters for Standard Model-facing geometry:

Before we can derive mass-basis shape functions, weak-basis shape functions, CKM/PMNS overlaps, weak chirality, or confinement geometry, we need an internal assembly whose own causal geometry is stable enough to project from.

So the chain is:

`architrinos` → `Noether-core assembly` → `stable causal-root ledger` → `sector exposure / quotient` → `mass, weak, color, photon-facing geometry`

The current $A_0$ work is at the “stable causal-root ledger” level. It is not yet a particle prediction. It is checking whether an internal assembly can become a reliable geometric source object for later mass and weak-sector calculations.

## Purpose

This packet turns the $A_0$ reference-attractor posture into a concrete reduced proof and simulation target. It does not replace the full six-worldline $A_0$ output schema in [mass-map.md](mass-map.md). Its job is narrower: define the first finite branch-search certificate that can decide whether a coupled multi-scale tri-binary lock is worth promoting into shielding extraction, energy-ledger work, and mass-map comparison.

The central question is:

Can a neutral rest-branch Noether core with inner, middle, and outer binary layers close as one coupled delayed root ledger while satisfying
$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f,
$$
and while retaining a positive non-symmetry Floquet gap?

Until that question is answered, $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, and $\mathcal{M}_{\text{sea}}^{ab}$ remain downstream quantities, not objects to fit.

## Master-Equation Handoff Boundary

The master-equation side may supply a certified branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$ for an $A_0$ candidate, but this packet may consume it only as Tier 0 / Tier 1 branch-certificate input. The allowed content is finite active roots, inactive-root gaps, the Jacobian floor, memory depth, returned-section residuals, and section stability, together with the same root-ledger refinement controls used by the master-equation chart.

Those inputs may populate `branch_label`, `z_lambda`, `root_ledger`, `residuals`, `Delta_k`, `stability`, and `certificate_gates`. They do not populate `energy_ledger`, `far_field_shielding`, `medium_response`, or `mass_summary`. In particular, $\mathfrak{B}$ does not supply $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, $\mathcal{M}_{\text{sea}}^{ab}$, or any particle-facing mass comparison.

Handoff falsifier: if a reported Tier 2 or Tier 3 quantity changes under root-ledger refinement, inactive-gap refinement, memory-depth extension, or controlled $\eta$ refinement while the branch label and quotient row are held fixed, the mass-map packet must treat the downstream extraction as blocked until the branch certificate is refined.

## Scope

This packet owns:

- the reduced branch variables for the first $A_0$ search,
- the small parameters and separation assumptions to test,
- the averaging / locking / leakage classification as lemmas,
- the Tier 0 root-ledger enumerator,
- the Tier 1 $\eta>0$ continuation scan,
- the pass/fail gates before energy, shielding, or mass interpretation begins.

This packet does not own:

- the full numerical implementation,
- particle-label comparisons,
- electron, muon, tau, proton, or hadron masses,
- the final $\eta\to0$ theorem,
- or the full Noether-Sea constitutive map.

## Fixed Inputs

Work in the homogeneous Noether-Sea rest cell used by [mass-map.md](mass-map.md):
$$
u^i_{\text{sea}}=0,
\qquad
G_{\text{grad}}=0,
\qquad
n=1,
\qquad
\chi_{\text{sea}}=1,
\qquad
c_\star=c_f.
$$

The six architrinos are labeled
$$
a=(\ell,\sigma),
\qquad
\ell\in\{I,M,O\},
\qquad
\sigma\in\{+,-\},
$$
with
$$
q_{\ell,+}=+\epsilon,
\qquad
q_{\ell,-}=-\epsilon.
$$

For each layer,
$$
\mathbf{C}_\ell
=
\frac{\mathbf{s}_{\ell,+}+\mathbf{s}_{\ell,-}}{2},
\qquad
\mathbf{r}_\ell
=
\mathbf{s}_{\ell,+}-\mathbf{s}_{\ell,-},
$$
$$
\mathbf{V}_\ell
=
\frac{\mathbf{v}_{\ell,+}+\mathbf{v}_{\ell,-}}{2},
\qquad
\mathbf{u}_\ell
=
\mathbf{v}_{\ell,+}-\mathbf{v}_{\ell,-}.
$$

The reduced branch uses layer radii, phases, and orientation frames extracted from these variables:
$$
R_\ell,\quad
\theta_\ell,\quad
\omega_\ell,\quad
\mathbf{n}_\ell,\quad
H_\ell\in\{+1,-1\}.
$$
Here $H_\ell$ is a handedness label for the oriented binary plane. It is a ledger label, not a new force term.

## Small Parameters and Control Labels

The first reduced search should declare these quantities before any branch is accepted:
$$
\varepsilon_{IM}\equiv\frac{R_I}{R_M},
\qquad
\varepsilon_{MO}\equiv\frac{R_M}{R_O},
\qquad
\delta_M\equiv\frac{s_M-c_f}{c_f},
$$
$$
\eta_I\equiv\frac{\eta}{R_I},
\qquad
\eta_M\equiv\frac{\eta}{R_M},
\qquad
\eta_O\equiv\frac{\eta}{R_O}.
$$

The separated-scale working regime is
$$
0<\varepsilon_{IM}\ll1,
\qquad
0<\varepsilon_{MO}\ll1,
\qquad
|\delta_M|\ll1,
$$
but these are hypotheses to test, not assumptions to hide inside notation. A failed scan must say whether the failure comes from physics, insufficient history depth, insufficient time resolution, or loss of scale separation.

The branch label is
$$
\Lambda
=
\left(
k_I,k_M,k_O;
q_{IM},q_{MO},q_{IO};
\mathcal{B}_{\text{self}},
\mathcal{B}_{\text{partner}},
\mathcal{B}_{\text{inter}}
\right),
$$
where $k_\ell$ are layer windings, $q_{\ell m}$ are inter-layer closure integers, and each $\mathcal{B}$ records the active causal-root branches by source relation.

## Reduced Carrier Ansatz

A circular or elliptic layer carrier is allowed only as a diagnostic coordinate chart. For Tier 0, write
$$
\mathbf{r}_\ell(t)
=
R_\ell
\left[
\mathbf{e}_{\ell,1}\cos(\omega_\ell t+\theta_\ell)
+
\lambda_\ell\mathbf{e}_{\ell,2}\sin(\omega_\ell t+\theta_\ell)
\right]
+
\mathbf{d}_\ell(t),
$$
where $\mathbf{e}_{\ell,1},\mathbf{e}_{\ell,2}$ span the layer plane, $\mathbf{n}_\ell=\mathbf{e}_{\ell,1}\times\mathbf{e}_{\ell,2}$, $\lambda_\ell$ is an ellipticity parameter, and $\mathbf{d}_\ell(t)$ is the unresolved non-circular correction.

## Geometry-First Reduction: Provisional Moduli Object

The reduced search should treat the certificate variables as coordinates on a geometric state space before it treats them as bookkeeping fields. The provisional object for a fixed finite branch label $\Lambda$ and fixed $\eta>0$ is
$$
\mathfrak{M}_{A_0}^{\eta}(\Lambda)
=
\left\{
Y_{\text{geom}}
\;:\;
\mathcal{R}_\Lambda(Y_{\text{geom}})=0,
s_I>c_f,
s_M\approx c_f,
s_O<c_f
\right\}
\Big/
\left(
SO(3)\times S^1_{\mathbf{k}}\times\Gamma_\Lambda
\right),
$$
where the provisional reduced geometric coordinate is
$$
Y_{\text{geom}}
=
\left(
R_\ell,\omega_\ell,\lambda_\ell,
\theta_\ell,\mathbf{n}_\ell,H_\ell,\Lambda
\right).
$$
The quotient removes global rotations, the common closed-cycle phase gauge, and only those finite chart relabelings that preserve the polarity assignment, layer roles, speed ordering, and causal-root branch class. Here
$$
S^1_{\mathbf{k}}:
\left(\theta_I,\theta_M,\theta_O\right)
\mapsto
\left(
\theta_I+2\pi k_I\alpha,\,
\theta_M+2\pi k_M\alpha,\,
\theta_O+2\pi k_O\alpha
\right),
\qquad
\alpha\in\mathbb{R}/\mathbb{Z},
$$
and $\Gamma_\Lambda$ is a provisional notation for the allowed discrete chart relabelings. The root-ledger branch class $[\Lambda]$ is the image of $\Lambda$ under this discrete quotient; it is not an additional dynamical assumption.

A useful reduced chart on this quotient is
$$
z_\Lambda
=
\left(
\varepsilon_{IM},\varepsilon_{MO},\delta_M,
T_I/T_M,T_M/T_O,
\lambda_I,\lambda_M,\lambda_O,
G_{\ell m},\chi_N,
H_I,H_M,H_O,
\Phi_{\text{rel}},
[\Lambda]
\right),
$$
with
$$
G_{\ell m}\equiv\mathbf{n}_\ell\cdot\mathbf{n}_m,
\qquad
\chi_N
\equiv
\operatorname{sign}
\left(
\mathbf{n}_I\cdot
\left(\mathbf{n}_M\times\mathbf{n}_O\right)
\right),
\qquad
\Phi_{\text{rel}}
\equiv
\left(\theta_I,\theta_M,\theta_O\right)/S^1_{\mathbf{k}}.
$$
The two period ratios record time-scale separation alongside the radius ratios. The Gram data $G_{\ell m}$ records the inter-plane angles after global rotations are removed, $\chi_N$ records the orientation class of the ordered plane-normal frame, the three $H_\ell$ record layer handedness, and $\Phi_{\text{rel}}$ records phase offsets after the common time-origin gauge is removed. For nonzero winding vector $\mathbf{k}=(k_I,k_M,k_O)$, $\Phi_{\text{rel}}$ is a two-dimensional phase torus; an implementation may choose any two integer phase combinations orthogonal to $\mathbf{k}$.

The stability object on the quotient is the residual-gap functional
$$
\mathscr{Q}_\eta([Y])
=
\|\mathcal{R}_\Lambda(Y)\|_{W}^{2}
+
\sum_{\mu_i\notin G_{\text{sym}}}
\max(0,|\mu_i|-1)^2,
$$
where $W$ is the declared residual-weight matrix and $[Y]$ denotes the quotient class of a representative branch coordinate. A stable rest branch should appear as an isolated zero of $\mathscr{Q}_\eta$ with
$$
\Delta_{\mathbf{k}}>0.
$$
This gives a provisional normal-hyperbolicity reading of the existing positive-gap gate: time shift, center translation, and global rotation do not count as physical instability, but every remaining Floquet direction must be separated from the unit circle. Integer closure without this positive gap is a point in the closure locus, not a stable rest-branch moduli point.

**Provisional reduced-moduli lemma.** For fixed $\eta>0$, fixed finite causal-root branch class $[\Lambda]$, and nonzero winding vector $\mathbf{k}$, any Tier 1 branch with $\mathcal{R}_\Lambda=0$, no center drift, retained speed ordering, and $\Delta_{\mathbf{k}}>0$ determines an isolated point of $\mathfrak{M}_{A_0}^{\eta}(\Lambda)$. If the same data give $\mathcal{R}_\Lambda=0$ but $\Delta_{\mathbf{k}}\le0$, the branch is a closed reduced configuration but not a stable $A_0$ rest branch.

Tier 0 may set $\mathbf{d}_\ell=0$ only to enumerate roots and residuals. If this carrier leaves tangential residuals, the result is not a no-go theorem. It is a demand for one of three next moves:

- an inter-layer phase correction,
- a non-circular carrier correction $\mathbf{d}_\ell(t)$,
- or a locking term that must stay in the Tier 1 continuation.

## Root Ledger

For every source $b$ and receiver $a$, active roots satisfy
$$
F_{ab}^{(m)}(t;t_0)
\equiv
\|\mathbf{s}_a(t)-\mathbf{s}_b(t_0)\|
-c_f(t-t_0)
=0,
\qquad
t_0<t.
$$

The branch Jacobian is
$$
J_{ab}^{(m)}(t;t_0)
=
1-\frac{\mathbf{v}_b(t_0)\cdot\hat{\mathbf{r}}_{ab}(t;t_0)}{c_f},
$$
with
$$
\hat{\mathbf{r}}_{ab}(t;t_0)
=
\frac{\mathbf{s}_a(t)-\mathbf{s}_b(t_0)}
{\|\mathbf{s}_a(t)-\mathbf{s}_b(t_0)\|}.
$$

Each root is classified as one of:

| Class | Condition | Certificate data |
| --- | --- | --- |
| Partner | $a$ and $b$ are opposite members of the same layer | branch count, delay, polarity sign, $J_{ab}^{(m)}$, parity event flag |
| Self | $a=b$ with $t_0<t$ | self-root count, separator proximity, $J_{aa}^{(m)}$, local stability effect |
| Inter-layer | $a$ and $b$ belong to different layers | source layer, receiver layer, delay, phase relation, closure integer |

Separator events must record whether the raw root jump obeys
$$
\Delta N\in2\mathbb{Z}.
$$

## Lemma Targets

### Lemma 0: Finite Root-Ledger Reduction

For fixed $\eta>0$, fixed carrier chart, bounded history window, and declared scale ratios, the active delayed roots over one candidate period $T_{\mathbf{k}}$ must be representable by a finite causal-root ledger:
$$
\mathcal{G}_{A_0}
=
\left(
V_A,
E_{\text{partner}},
E_{\text{self}},
E_{\text{inter}},
\mathcal{B},
\mathcal{P}
\right).
$$
Here $V_A$ is the six-architrino vertex set, the three edge sets record partner, self, and inter-layer root channels, $\mathcal{B}$ records branch labels, and $\mathcal{P}$ records phase and separator events.

Certificate burden: a Tier 0 row must emit this finite ledger, or emit a failure code explaining why no finite ledger was obtained. A scan that only reports carrier radii and frequencies has not reduced the branch problem.

### Lemma 1: Nonresonant Averaging

Let $Q(t)$ be a signed contribution from a fast layer to a slower layer's carrier equations over a closed candidate period $T_{\mathbf{k}}$. If its phase contains no stationary or integer-resonant component on the branch label $\Lambda$, then
$$
\frac{1}{T_{\mathbf{k}}}\int_0^{T_{\mathbf{k}}}Q(t)\,dt
=
O(\varepsilon_{IM})+O(\varepsilon_{MO})+O(\eta_\ell)
$$
in the reduced certificate.

Certificate burden: report the terms placed in this class and the measured or derived residual size. A term may not be averaged away if it changes any active root count, any separator proximity, or any retained Floquet multiplier.

### Lemma 2: Near-Separator Locking

Terms are locking terms when they satisfy at least one of:
$$
|J_{ab}^{(m)}|\le J_{\text{lock}},
\qquad
|s_\ell-c_f|\le \delta_{\text{lock}}c_f,
$$
or when their phase contributes to an inter-layer closure integer $q_{\ell m}$.

Certificate burden: locking terms remain in the branch equations. They are not part of far-field simplification until the closure and stability gates pass.

### Lemma 3: Leakage Tensor Extraction

For a candidate branch that passes closure, define the cycle-averaged far-field wake coefficient in direction $\hat{\mathbf{R}}$ by
$$
\mathcal{L}(\hat{\mathbf{R}})
=
\left\langle
\sum_{a\in A_0}
q_a\,W_a(t,\hat{\mathbf{R}})
\right\rangle_{T_{\mathbf{k}}},
$$
where $W_a$ is the normalized leading far-field contribution of constituent $a$ on the selected wake channel.

The scalar shielding coefficient is the isotropic leading projection:
$$
\zeta(A_0)
=
\frac{\|\Pi_0\mathcal{L}\|}
{\|\mathcal{L}_{\text{naive}}\|},
$$
while the anisotropic residue is carried by the non-isotropic projection
$$
\mathcal{L}_{\text{aniso}}
=
(1-\Pi_0)\mathcal{L}.
$$

Certificate burden: the scalar $\zeta(A_0)$ is not accepted unless $\mathcal{L}(\hat{\mathbf{R}})$ is stable under far-field radius, angular resolution, $\Delta t$, and $\eta$ refinement.

### Lemma 4: Reduced Branch Closure

A branch label $\Lambda$ is a reduced closed branch only if the residual vector
$$
\mathcal{R}_\Lambda
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}}
\right)
$$
is below declared tolerances, where
$$
\mathcal{R}_{\text{speed}}
=
\max
\left(
\max_{t}\frac{c_f-s_I(t)}{c_f},
\max_{t}\frac{|s_M(t)-c_f|}{c_f},
\max_{t}\frac{s_O(t)-c_f}{c_f}
\right)
$$
is interpreted with sign-aware inequalities for the intended branch regime.

This is the closure residual vector before the monodromy gate. The full branch-row residual surface is $\mathcal{R}_{A_0}$ below, which also includes $\mathcal{R}_{\text{Floquet}}$ with a Tier 0 status of not computed until Tier 1 builds the return-map diagnostic.

The classification residuals record what happened to higher-order internal terms:

- $\mathcal{R}_{\text{avg}}$ measures the terms claimed to average out under Lemma 1.
- $\mathcal{R}_{\text{lock}}$ measures the retained separator and resonance terms under Lemma 2.
- $\mathcal{R}_{\text{leak}}$ measures the remaining far-field residue under Lemma 3.

Certificate burden: report the tolerance table and whether each residual is a physics failure, a chart failure, or a resolution/history failure.

### Lemma 5: Stability Gate

Let $\mathcal{M}_{\mathbf{k}}$ be the linearized return map around the candidate branch, and let $G_{\text{sym}}$ be the symmetry subspace generated by time shift, Euclidean translations, and Euclidean rotations. The basin-robustness gap is
$$
\Delta_{\mathbf{k}}
=
1-\max_{\mu_i\notin G_{\text{sym}}}|\mu_i|.
$$

The branch may be promoted only if
$$
\Delta_{\mathbf{k}}>0
$$
after convergence checks. Integer closure without this stability gate is not an attractor certificate.

## Certificate Residual Vector

The accepted reduced packet should emit the full vector
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{corr}},
\mathcal{R}_{\text{Floquet}}
\right).
$$

Here $\mathcal{R}_{\text{corr}}$ is the correction residual for any non-circular carrier correction $\mathbf{d}_\ell(t)$ or richer branch-native interaction basis used to close the carrier equation. If a row keeps $\mathbf{d}_\ell=0$, this component must be reported as not applicable for a diagnostic Tier 0 row or as failed for a Tier 1 row whose carrier residuals remain above tolerance. Every component must include units or normalization, tolerance, refinement status, and the branch label $\Lambda$ that produced it. A scan that reports only a best geometry without this residual vector is not a certificate.

## Reduced Certificate Proposition

For fixed $\eta>0$, a branch label $\Lambda$ is a reduced $A_0$ branch certificate when all of the following are reported in one auditable packet:

1. a finite causal-root ledger $\mathcal{G}_{A_0}$ over $T_{\mathbf{k}}$;
2. nonresonant terms assigned to $\mathcal{R}_{\text{avg}}$ with declared order and tolerance;
3. near-separator and resonance terms retained in $\mathcal{R}_{\text{lock}}$;
4. leakage terms assigned to $\mathcal{R}_{\text{leak}}$ with the leading far-field channel named;
5. reduced closure equations for state, phase, center, speed ordering, energy ledger, and any non-circular correction residual $\mathcal{R}_{\text{corr}}$;
6. a reduced monodromy or finite-difference return-map diagnostic with $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.

If these gates pass below declared tolerances, the packet certifies a reduced branch candidate. It does not certify the full six-worldline theorem, does not authorize particle-mass fitting, and does not remove the later $\eta\to0^+$ proof burden.

## Reduced Branch Equations

The Tier 0 certificate should assemble a finite system in the reduced variables:
$$
Y
=
\left(
R_\ell,\omega_\ell,\lambda_\ell,
\theta_\ell,\mathbf{n}_\ell,H_\ell,
k_\ell,q_{\ell m},
\mathcal{B}_{\text{self}},
\mathcal{B}_{\text{partner}},
\mathcal{B}_{\text{inter}}
\right).
$$

The equations are:

1. Causal-root equations $F_{ab}^{(m)}=0$ on the active branches.
2. Layer phase closure:
   $$
   \theta_\ell(t+T_{\mathbf{k}})-\theta_\ell(t)-2\pi k_\ell=0.
   $$
3. Inter-layer closure:
   $$
   \Theta_{\ell m}(t+T_{\mathbf{k}})
   -\Theta_{\ell m}(t)-2\pi q_{\ell m}=0.
   $$
4. Carrier residual balance:
   $$
   \left\langle
   \Pi_{\ell,r}
   \left[
   \mathbf{a}_{\ell,+}-\mathbf{a}_{\ell,-}
   -\mathbf{a}^{\text{carrier}}_\ell
   \right]
   \right\rangle_{T_{\mathbf{k}}}=0,
   $$
   $$
   \left\langle
   \Pi_{\ell,\theta}
   \left[
   \mathbf{a}_{\ell,+}-\mathbf{a}_{\ell,-}
   -\mathbf{a}^{\text{carrier}}_\ell
   \right]
   \right\rangle_{T_{\mathbf{k}}}=0,
   $$
   after the averaging / locking / leakage split is applied.
5. Rest-gauge closure:
   $$
   \mathbf{C}_{A_0}(t+T_{\mathbf{k}})-\mathbf{C}_{A_0}(t)=\mathbf{0}
   $$
   after symmetry modes are removed.
6. Speed-ordering inequalities for $s_I$, $s_M$, and $s_O$.

Here $\Pi_{\ell,r}$ and $\Pi_{\ell,\theta}$ are projections onto the layer radial and tangential carrier directions. These are diagnostic projections; they do not add forces to the master equation.

## Tier 0: Root-Ledger Enumerator

Tier 0 is an algebraic and sampling pass. It does not claim a physical attractor.

Inputs:

- separated circular or elliptic carrier charts,
- declared ranges for $(R_I:R_M:R_O)$ and $(T_I:T_M:T_O)$,
- declared $\eta$ and sampling resolution,
- branch-history window depth,
- initial branch labels.

Required outputs:

- active root counts by class,
- $J_{ab}^{(m)}$ distributions and near-null events,
- the reduced moduli row $z_\Lambda$ before any energy or shielding interpretation,
- the complete branch-row residual surface $\mathcal{R}_{A_0}$, with Tier 0 omissions recorded explicitly,
- $\Delta_{\mathbf{k}}$ status, reported as not computed at Tier 0 unless a monodromy diagnostic is supplied,
- phase-closure residuals,
- tangential and radial carrier residuals,
- averaging / locking / leakage classification,
- provisional `weak_retained_amplitude_handoff` status, with `not-computed` allowed at Tier 0,
- candidate branch labels worth continuing,
- one `failure_code` per rejected row and explicit no-go notes when no labels survive.

Tier 0 passes only if at least one branch label has finite root ledger, controlled residuals, and no immediate contradiction with the speed ordering. Passing Tier 0 does not authorize $\zeta(A_0)$, energy-ledger, or mass interpretation.

### Minimum Branch-Row Schema

Each Tier 0 row should expose the quotient coordinate, residual surface, and stability handoff explicitly:

| Field | Required content |
| --- | --- |
| `branch_label` | $(k_I,k_M,k_O)$, $(q_{IM},q_{MO},q_{IO})$, handedness labels, ellipticity status, and active branch identifiers available at Tier 0 |
| `z_lambda` | the reduced moduli row $z_\Lambda$: radius ratios, period ratios, $\delta_M$, layer ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, $H_I,H_M,H_O$, $\Phi_{\text{rel}}$ status, removed gauges, and root-ledger branch class $[\Lambda]$ |
| `root_ledger` | active and raw partner, self, and inter-layer root counts; excluded near-zero self roots; near-separator counts; minimum $|J|$; maximum root residual |
| `residuals` | structured entries for every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note |
| `residual_values` | numeric audit surface for $\mathcal{R}_{A_0}$, with Tier 0 omissions recorded as null rather than hidden |
| `Delta_k` | Tier 0 status for $\Delta_{\mathbf{k}}$; value is null until Tier 1 constructs the monodromy or finite-difference return map |
| `certificate_gates` | pass/fail/not-computed gates for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, active root ledger, separator handling, near-zero self roots, residual semantics, $\Delta_{\mathbf{k}}$, and Tier 0 continuation |
| `failure_code` | one machine-readable reason the row fails, or `candidate` when it may seed Tier 1 |
| `promotion_boundary` | explicit statement that a passing Tier 0 row may seed Tier 1 only and is not an accepted attractor |

### Provisional Weak-Retained Amplitude Handoff

The branch row that later feeds the Standard Model shielding-envelope calculation needs one additional optional handoff object. This is not a CKM result and not a new particle benchmark. It is the branch-derived weak-retained causal-wake amplitude that the weak-sector overlap packet consumes as $\mathcal{L}_{\ell}^{W,\Lambda}(a,\mathbf{x})$.

The reduced certificate already uses $\Lambda$ for the finite causal-root branch label. In this handoff, the row must therefore record both the exact `branch_label` and the shielding `tier_selector`; the superscript in $\mathcal{L}_{\ell}^{W,\Lambda}$ denotes the combined branch-family handoff consumed by the Standard Model packet. The provisional internal disambiguators below are $\Lambda_{\mathrm{br}}$ for the reduced branch label and $\Lambda_{\mathrm{tier}}$ for the shielding tier.

Use the provisional tier selector
$$
\mathcal{I}_{\mathrm{IMO}}=\{I,M,O\},
\qquad
\mathcal{I}_{\mathrm{IM-}}=\{I,M\},
\qquad
\mathcal{I}_{\mathrm{I--}}=\{I\}.
$$
For refinement index $\nu$, fixed branch label $\Lambda_{\mathrm{br}}$, fixed shielding tier $\Lambda_{\mathrm{tier}}\in\{\mathrm{IMO},\mathrm{IM-},\mathrm{I--}\}$, fixed weak-sector input tuple $(R_{\text{rel}},c,\sigma_{\text{ax}})$, and fixed local Noether-Sea state, define the row-level weak-retained amplitude candidate by
$$
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu}(a,\mathbf{x};\Lambda_{\mathrm{br}})
=
\Pi_{\mathrm{weak}}
\left[
\left\langle
\sum_{\sigma\in\{+,-\}}
q_{\ell,\sigma}
W_{\ell,\sigma}^{(\nu)}(t;a,\mathbf{x};R_{\text{rel}},c,\sigma_{\text{ax}})
\right\rangle_{T_{\mathbf{k}}}
\right]_{\Lambda_{\mathrm{br}}},
\qquad
\ell\in\mathcal{I}_{\Lambda_{\mathrm{tier}}}.
$$
Here $W_{\ell,\sigma}^{(\nu)}$ is reconstructed from the row's accepted state/history segment, active causal-root ledger, and mollified wake rule at refinement level $\nu$. The projection $\Pi_{\mathrm{weak}}$ is the weak-sector projection from the exposure-quotient theorem; it must retain weak-coupling-triad exposure, axial-frame branch data, chirality channel, flavor-overlap data, and weak-corridor provenance in one weak-visible domain. The same row data must supply the phase origin through $z_\Lambda$, especially $\Phi_{\text{rel}}$, $H_I,H_M,H_O$, and the root-ledger branch class $[\Lambda]$.

The emitted amplitude exists only if the refinement limit
$$
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}}}(a,\mathbf{x};\Lambda_{\mathrm{br}})
=
\lim_{\nu\to\infty}
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu}(a,\mathbf{x};\Lambda_{\mathrm{br}})
$$
converges in the weak-measure norm used by the Standard Model packet:
$$
\left\|
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu+1}
-
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu}
\right\|_{\mu_W^{(L)}}
\to0,
$$
under the declared extraction radius, angular resolution, cycle window, $\Delta t$, history depth, and $\eta$ schedule. The tier can seed a shielding envelope only when
$$
\sum_{\ell\in\mathcal{I}_{\Lambda_{\mathrm{tier}}}}
\left\|
\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}}}
\right\|_{\mu_W^{(L)}}>0.
$$

The provisional branch-row field is `weak_retained_amplitude_handoff`:

| Field | Required content |
| --- | --- |
| `status` | `not-computed`, `candidate`, `weak-emitter-ready`, or `failed`; Tier 0 may emit `not-computed` or `candidate`, while `weak-emitter-ready` requires the refinement limit above |
| `tier_selector` | one of $\mathrm{IMO}$, $\mathrm{IM-}$, or $\mathrm{I--}$ with the corresponding active layer set $\mathcal{I}_{\Lambda_{\mathrm{tier}}}$ |
| `source_row` | the row's `branch_label`, `z_lambda`, `root_ledger`, `residual_values`, `Delta_k`, `certificate_gates`, and `promotion_boundary` |
| `weak_inputs` | $R_{\text{rel}}$, $c$, $\sigma_{\text{ax}}$, $\eta_a^{(h)}$, $A_a(\mathbf{x};R_{\text{rel}})$, and the local $\rho_{\text{core}}(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t)$ state used by the weak measure |
| `weak_exposure_map` | the explicit $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, retained labels, discarded labels, and weak-exposure leakage diagnostics used for this row |
| `layer_channels` | one entry per $\ell\in\mathcal{I}_{\Lambda_{\mathrm{tier}}}$ giving $\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu}(a,\mathbf{x};\Lambda_{\mathrm{br}})$ or a `not-computed` marker with the reason |
| `phase_handoff` | branch-fixed phase data sufficient to determine $\arg\mathcal{L}_{\ell}^{W,\Lambda}(a,\mathbf{x})$ after quotienting the common phase origin |
| `refinement` | extraction radius, angular resolution, cycle window, $\Delta t$, history depth, $\eta$, and convergence status |
| `nonfit_statement` | explicit statement that no CKM magnitude, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to construct the amplitude |
| `failure_code` | one weak-emitter failure code, or `weak-emitter-ready` when the handoff may feed the shielding-envelope packet |

The exact pass condition for supplying $B_{\mathrm{IMO}}$, $B_{\mathrm{IM-}}$, and $B_{\mathrm{I--}}$ is that the corresponding branch-family rows all reach `weak-emitter-ready`, have finite nonzero active-tier norm, preserve the same $\Pi_{\mathrm{weak}}$ and quotient choices, and keep all refinement drift below declared tolerance before any Standard Model comparison. The exact failure condition is `weak-emitter-benchmark-fit` if any observed CKM magnitude, CKM angle, or particle mass is used to select the branch row, projection, quotient, amplitude normalization, or phase.

The first Tier 0 failure table should reserve these codes:

| Failure code | Trigger | Consequence |
| --- | --- | --- |
| `quotient-degenerate` | $G_{\ell m}$ and $\chi_N$ do not define a nondegenerate quotient row after global rotations are removed | do not treat $z_\Lambda$ as a moduli coordinate |
| `scale-separation-collapse` | $R_I:R_M:R_O$ or $T_I:T_M:T_O$ violates the declared separated-scale regime | reject the row or widen the scan only as a controlled scale-separation test |
| `root-ledger-instability` | the active causal-root ledger is empty or misses partner, self, or inter-layer root classes | do not seed Tier 1 until the ledger closes with all required source relations |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ | reject the branch as a non-attractor even if integer closure holds |
| `weak-emitter-not-computed` | the row does not carry a weak-retained amplitude handoff or marks the handoff outside its computed tier | do not feed the Standard Model shielding-envelope packet |
| `weak-emitter-zero-norm` | $\sum_{\ell\in\mathcal{I}_{\Lambda_{\mathrm{tier}}}}\|\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}}}\|_{\mu_W^{(L)}}=0$ | no normalized branch-derived envelope can be formed for that tier |
| `weak-emitter-phase-underdetermined` | quotienting leaves $\arg\mathcal{L}_{\ell}^{W,\Lambda}(a,\mathbf{x})$ ambiguous on support contributing to the overlap kernel | do not compute $\Delta\phi_{u\Lambda}$ from this row |
| `weak-emitter-refinement-drift` | $\mathcal{L}_{\ell}^{W,\Lambda_{\mathrm{tier}},\nu}$ fails convergence under extraction radius, angular resolution, cycle window, $\Delta t$, history depth, or $\eta$ refinement | keep the row as a numerical artifact, not a shielding-envelope input |
| `weak-emitter-split-domain` | the row needs a different weak projection or quotient for chirality, flavor overlap, or weak-corridor provenance | the weak exposure theorem has not closed for this row |
| `weak-emitter-benchmark-fit` | CKM data, charged-lepton mass ratios, particle masses, or CKM-derived transport actions are used to select or normalize the handoff | reject the row as fitted rather than branch-derived |

## Tier 1: $\eta>0$ Continuation Scan

Tier 1 promotes a Tier 0 branch label into a smooth regularized delayed-dynamics scan.

Inputs:

- one Tier 0 branch label $\Lambda$,
- an $\eta>0$ mollified wake kernel,
- a history-window rule deep enough to include all active roots,
- non-circular correction basis $\mathbf{d}_\ell(t)$,
- tolerances for $\mathcal{R}_\Lambda$,
- convergence schedule for $\Delta t$, history resolution, angular sampling, and $\eta$.

Required operations:

1. Continue the carrier branch under the full regularized delayed acceleration law.
2. Solve active causal roots at each sampled state.
3. Update the root ledger and detect separator events.
4. Compute $\mathcal{R}_\Lambda$ over at least one $T_{\mathbf{k}}$.
5. Build the linearized return map or a finite-difference monodromy approximation.
6. Remove symmetry modes and compute $\Delta_{\mathbf{k}}$.
7. Reject branches with negative Floquet gap, secular drift, root-ledger inconsistency, or non-convergent energy residuals.

Provisional reduced Tier 1 monodromy packet:

Given a Tier 0 row $\Lambda$ with reduced representative $[Y_\Lambda]$ in the chart $z_\Lambda$, the Tier 1 continuation should define a regularized return map
$$
\mathcal{P}_{\eta,\Lambda}:N_{[Y_\Lambda]}\longrightarrow N_{[Y_\Lambda]},
$$
where $N_{[Y_\Lambda]}$ is the quotient normal chart obtained after removing global rotations, translations, the cycle phase gauge, and the trivial branch relabelings already recorded by $\Gamma_\Lambda$. The active causal-root ledger is part of the chart data, not an external certificate note: if the partner, delayed self-hit, or inter-layer root classes cannot be matched under $\Delta t$, history-window, and $\eta$ refinement, then $\mathcal{P}_{\eta,\Lambda}$ is not defined on the same branch.

The stability functional for this packet is
$$
\Delta_{\mathbf{k}}(\eta,\Lambda)
=1-\rho\!\left(
\Pi_{\perp G_{\text{sym}}}
D\mathcal{P}_{\eta,\Lambda}
\Pi_{\perp G_{\text{sym}}}
\right),
$$
where $G_{\text{sym}}$ is generated by time shift, translations, and rotations. A stable rest-branch candidate requires positive gap on the quotient, convergence of the residual ledger, and persistence of the same root-ledger branch class across the $\eta>0$ ladder before any $\eta\to0^+$ extrapolation.

Tier 1 passes only if a branch has:

- declared residuals below tolerance,
- speed ordering retained,
- $\Delta_{\mathbf{k}}>0$,
- no secular center drift,
- stable root ledger under refinement.

### Tier 1 Diagnostic State: Adaptive Direct-Root Horizon Ladder

The executable continuation-source prototype currently lives at `scripts/mass-map/a0-tier1-continuation-source-prototype.mjs`. It is still a blocked diagnostic source, not an accepted Tier 1 continuation. The accepted-history writer must continue to block its rows until residual closure, center-drift closure, $\Delta_{\mathbf{k}}>0$, and branch persistence across the declared $\eta$ ladder are all present.

The useful diagnostic object now tracked by the prototype is the direct-root branch multiset
$$
B_n(k)=\#\{r\in R_n:\kappa(r)=k\},
$$
where $R_n$ is the active direct-root set at step $n$ and $\kappa(r)$ records receiver, source, source relation, and root status. The retained initial branch count is
$$
\mathcal{B}_{\mathrm{ret}}(n)
=
\sum_k \min(B_0(k),B_n(k)),
$$
and the surplus count is
$$
\mathcal{B}_{\mathrm{extra}}(n)
=
\sum_k \max(0,B_n(k)-B_0(k)).
$$

The first adaptive stress result is:

- the short/default ladder retains all $32$ initial direct-root branches;
- at the $1024$-step rung, the coarse grid first under-resolves the two self branches `I+|I+|self|active` and `I-|I-|self|active` at step `1014`;
- adaptive root-grid refinement from `rootSamples=128` to `rootSamples=256` restores all $32$ retained branches before the state update;
- at the $4096$-step rung, the initial branches remain retained, but the same two self branches become surplus branches at steps `1103` and `1102` for the two ready rows;
- the surplus bracket shows that the retained long-delay self root at delay `0.021361944626227355` persists with $J\approx0.377185$, while a new short-delay self root appears at delay `0.00003471070297711964` with $J\approx-0.060$ and root residual near $7.3\times10^{-7}$;
- the step-fraction controller and event-local fold-layer lock now classify the first self-root surplus as `fold-layer` and route it to $\mathcal{R}_{\text{lock}}$;
- the raw lock estimate is still above the direct attempt cap, but the fold-layer-locked macro-stride attempt packet plans about $9.16\times10^5$--$9.64\times10^5$ retained steps, below the current `1000000` cap;
- the one-period intake now carries the replay samples and active root ledger forward, so accepted-history source coverage passes while the accepted-history writer still blocks on the uncomputed one-period predicates.

At the May 16 handoff, the exact next calculation was no longer surplus classification, step-budget reduction, or accepted-history source coverage. The active target at that point was to run or validate the fold-layer-locked one-period continuation attempt: keep the locked self-root row outside ordinary branch-sum reduction, use it only as a bounded $\mathcal{R}_{\text{lock}}$ input, and then report residual closure, no secular center drift, monodromy setup, and $\eta$-ladder branch persistence before any accepted-history segment is emitted.

Approved validation run on May 16, 2026:

```text
node scripts/mass-map/a0-tier1-continuation-source-prototype.mjs --tier0 scripts/tri-binary/fixtures/a0-tier0-branch-search-minimal.json --direct-probe-steps 64 --direct-step-fraction-ladder 0.0009765625 --pretty --out /tmp/a0-tier1-continuation-source-prototype-fold-lock-approved.json
node scripts/mass-map/a0-tier1-one-period-continuation-prototype.mjs --source /tmp/a0-tier1-continuation-source-prototype-fold-lock-approved.json --pretty --out /tmp/a0-tier1-one-period-continuation-prototype-fold-lock-approved.json
```

The resulting intake row has status `ready_for_fold_layer_locked_one_period_attempt`. The event-local fold-layer lock is ready, classifies the first surplus as `fold-layer`, and passes the paired-polarity validation predicates for the two locked self-root keys. The seed reports `41905` locked events, `276` retained direct-root steps per event, `11565780` locked direct-root steps before macro-striding, selected macro stride `12`, and `963815` planned retained steps, below the `1000000` attempt cap. Accepted-history source coverage passes with no missing fields: `320` ordered finite samples cover the delayed source window and one cycle, `512` active roots have valid labels, nonnegative finite delays, and finite $J$, and partner, self, and inter-layer relations are all present.

This closes the source-coverage and attempt-budget subchecks for the compact fixture. It does not close Tier 1: `residuals_below_tolerance`, `no_secular_center_drift`, `Delta_k_positive`, and `same_branch_persists_across_eta_ladder` remain explicitly uncomputed, and the row is not an `accepted_history_segment`.

Follow-up validation observer implemented on May 16, 2026:

```text
node scripts/mass-map/a0-tier1-fold-layer-locked-validator.mjs --intake /tmp/a0-tier1-one-period-continuation-prototype-fold-lock-approved.json --source /tmp/a0-tier1-continuation-source-prototype-fold-lock-approved.json --pretty --out /tmp/a0-tier1-fold-layer-locked-validator-approved.json
```

This emits `a0-tier1-fold-layer-locked-continuation-validation/v1` with row status `blocked_direct_one_period_integrator_not_run`. It records the available residual evidence without promoting the row: carrier-replay state return passes with maximum residual about $1.0\times10^{-13}$, root residuals pass with `512` roots evaluated and maximum residual about $9.92\times10^{-7}$ under the $10^{-6}$ tolerance, speed ordering passes with maximum residual about $1.11\times10^{-16}$, center drift is zero on the replay samples, and the fold-layer lock remains stable with the same two self-root keys and `963815` planned retained steps. The validator also records a frozen-root negative control: replaying frozen roots gives a large endpoint drift and is not a substitute for the fold-layer-locked direct continuation.

At the validator stage, the remaining blockers were exact: no direct regularized fold-layer-locked one-period trajectory, no phase-closure residual series, no direct energy-like or Noether energy ledger, no quotient monodromy operator / $\Delta_{\mathbf{k}}$, and no $\eta$-ladder continuation. Passing the validator into the accepted-history writer still emits `blocked_tier1_acceptance_incomplete`, not an accepted history segment; the compact fixture also lacks a non-null `z_lambda`, so source-row identity remains a writer-side blocker until the direct continuation carries full quotient-row identity. The May 18 direct-run and residual-balance sections below supersede this blocker state.

### Executable Artifact: Fold-Layer-Locked One-Period Return Target

The direct-run hard branch-closure artifact is the fail-closed fold-layer-locked one-period return map. The locked self-root keys are
$$
K_L
=
\{\texttt{I+|I+|self|active},\texttt{I-|I-|self|active}\}.
$$
They are retained as a fold-layer lock contribution to $\mathcal{R}_{\text{lock}}$, not promoted as ordinary active self branches.

For the compact fixture, let the regularized Tier 1 state be
$$
X_n^\eta
=
\left(
\{\mathbf{s}_a^n,\mathbf{v}_a^n\}_{a\in A_0},
\mathcal{H}_n,
\mathcal{G}_n
\right),
$$
and define the one-step diagnostic continuation target
$$
X_{n+1}^\eta
=
\Phi_{\eta,\Lambda,K_L}(X_n^\eta;\Delta t_n).
$$
At each step, the executable must solve the active causal roots, route any matched key in $K_L$ into the lock ledger, update the state/history, and recompute the root ledger before the next step. The diagnostic root-weighted acceleration used by the current scaffold is
$$
\mathbf{a}_a^\eta(t_n)
=
\sum_{\substack{r\in\mathcal{G}_n^{\mathrm{act}}\setminus L_n\\ \operatorname{rec}(r)=a}}
w_{\operatorname{rel}(r)}q_aq_{\operatorname{src}(r)}
\frac{
\mathbf{s}_{\operatorname{src}(r)}(t_n-\tau_r)-\mathbf{s}_a(t_n)
}{
\left(
\|\mathbf{s}_{\operatorname{src}(r)}(t_n-\tau_r)-\mathbf{s}_a(t_n)\|^2+\eta^2
\right)^{3/2}
\max(|J_r|,J_{\min})
},
$$
where $L_n$ is the fold-layer lock subset for that step. This is a simulation target for the branch certificate, not a promoted master-equation proof.

The one-period map is
$$
\mathcal{P}_{\eta,\Lambda,K_L}(X_0^\eta)=X_N^\eta,
\qquad
\sum_{n=0}^{N-1}\Delta t_n=T_{\mathbf{k}}.
$$
For the current under-cap plan,
$$
N_{\mathrm{locked}}=11{,}565{,}780,
\qquad
s_{\mathrm{macro}}=12,
\qquad
N_{\mathrm{attempt}}=963{,}815.
$$
The emitted residual ledger must be
$$
\mathcal{R}_{\mathrm{1p}}^\eta
=
\left(
R_{\text{state}},
R_{\text{root}},
R_{\text{phase}},
R_E,
R_{\text{drift}},
R_{\text{speed}},
R_{\text{lock}}
\right),
$$
with
$$
R_{\text{phase}}
=
\max_\ell
\frac{
|\theta_\ell(T_{\mathbf{k}})-\theta_\ell(0)-2\pi k_\ell|
}{2\pi},
$$
and
$$
R_E
=
\frac{
|\bar v^2(T_{\mathbf{k}})-\bar v^2(0)|
}{
\max(\bar v^2(0),\epsilon_E)
}.
$$
This energy-like ledger is only a Tier 1 speed-balance proxy until the Noether energy ledger is available.

The monodromy condition for this target is
$$
\Delta_{\mathbf{k}}(\eta,\Lambda,K_L)
=
1-\rho\left(
\Pi_{\perp G_{\text{sym}}}
D\mathcal{P}_{\eta,\Lambda,K_L}
\Pi_{\perp G_{\text{sym}}}
\right),
$$
and the branch remains blocked unless
$$
\Delta_{\mathbf{k}}(\eta,\Lambda,K_L)>0.
$$
The eta-ladder continuation target is
$$
\eta_j=2^{-j}\eta_0,
\qquad
j=0,1,2,3,
$$
with the same locked keys, relation classes, source coverage, residual tolerances, and quotient-row identity retained at each rung.

Assumptions for the first executable attempt:

- the homogeneous Noether-Sea cell remains $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and $c_\star=c_f$;
- the fold-layer keys $K_L$ are lock-ledger entries only, not new accepted self branches;
- no observed particle mass, charged-lepton ratio, CKM datum, electron radius, or measured $\alpha$ enters row selection or normalization;
- the compact fixture must carry a non-null `z_lambda` or an equivalent quotient-row identity before accepted-history emission;
- the macro stride is admissible only if the direct residual ledgers pass under refinement.

Current validation rerun on May 18, 2026:

- source coverage and root replay pass for row `1`: `512` active roots, no invalid labels, finite nonnegative delays, finite $J$, and partner/self/inter-layer relation classes all present;
- carrier-replay residuals pass as necessary evidence: $R_{\text{state}}\approx1.00\times10^{-13}$, maximum root residual $\approx9.92\times10^{-7}$ below the $10^{-6}$ tolerance, speed-ordering residual $\approx1.11\times10^{-16}$, and center drift `0`;
- fold-layer lock passes with `41905` locked events, `276` retained direct-root steps per event, macro stride `12`, and `963815` planned retained steps under the current `1000000` cap;
- phase closure, direct energy-like speed closure, Noether energy closure, quotient monodromy, $\Delta_{\mathbf{k}}$, and eta-ladder persistence are still not computed;
- the frozen-root negative control fails with large endpoint drift and speed-energy drift, so replaying frozen roots is not a valid substitute for $\Phi_{\eta,\Lambda,K_L}$.

Next falsification target: implement and run $\mathcal{P}_{\eta,\Lambda,K_L}$ over the under-cap one-period attempt. The row fails closed if any one-period residual exceeds tolerance, if locked roots are promoted into the active self-branch count, if $\Delta_{\mathbf{k}}\le0$, if the quotient-row identity cannot be carried, or if the same branch does not persist across the declared $\eta$ ladder.

Implementation run on May 18, 2026:

```text
node scripts/mass-map/a0-tier1-fold-layer-locked-one-period-attempt.mjs --intake /tmp/a0-tier1-one-period-continuation-prototype-fold-lock-impl.json --source /tmp/a0-tier1-continuation-source-prototype-fold-lock-impl.json --pretty --out /tmp/a0-tier1-fold-layer-locked-one-period-attempt-impl-v2.json
```

The runner executed the planned fold-layer-locked map for row `1` with `963815` steps, $\Delta t\approx4.0744\times10^{-6}$, $\eta\approx1.7355\times10^{-5}$, `16` root-observation buckets, the same two locked self-root keys $K_L$, and no trajectory abort. This is the first direct negative result for the compact branch chart: the lock ledger passes, but the direct residual ledgers fail.

Observed failures:

- $R_{\text{state}}\approx0.999$ against tolerance `0.02`;
- maximum direct root residual $\approx42.67$ against tolerance $10^{-6}$;
- $R_{\text{phase}}\approx0.208$ with layer residuals approximately `I: 0.012`, `M: 0.208`, `O: 0.0229`;
- maximum speed-ordering residual $\approx29.93$ against tolerance `0.02`;
- center-drift residual $\approx0.132$ against tolerance `0.02`;
- energy-like speed residual $\approx26.68$ against tolerance `0.02`.

This falsifies the naive fold-layer-locked root-weighted map as a closed $A_0$ branch equation. It does not falsify the $A_0$ branch program, because the current map still lacks the residual-balanced carrier correction $\mathbf{d}_\ell(t)$, calibrated branch-native interaction weights, quotient-row identity, monodromy, and eta-ladder continuation. The next executable mathematical step is therefore no longer budget reduction. It is a residual-balanced branch-equation correction or a controlled no-go condition:
$$
\Phi_{\eta,\Lambda,K_L}
\quad\leadsto\quad
\Phi_{\eta,\Lambda,K_L,\mathbf{d},\alpha_{\mathrm{rel}}}
$$
where $\mathbf{d}_\ell(t)$ and the branch-native relation weights $\alpha_{\mathrm{rel}}$ must reduce the failed residual vector without using particle benchmarks.

Residual-balance projection result:

The one-period runner now emits `a0-tier1-residual-balance-ledger/v1`. It builds the branch-native root-basis vectors $B_{\text{self}}$, $B_{\text{partner}}$, and $B_{\text{inter}}$ from the active causal-root ledger and solves the branch-data normal equation
$$
\alpha^\star
=
\operatorname*{arg\,min}_{\alpha}
\left\|
\mathbf{a}_{\mathrm{carrier}}
-
\alpha_{\mathrm{self}}B_{\mathrm{self}}
-
\alpha_{\mathrm{partner}}B_{\mathrm{partner}}
-
\alpha_{\mathrm{inter}}B_{\mathrm{inter}}
\right\|_2^2,
$$
where $\mathbf{a}_{\mathrm{carrier}}$ is the finite-difference acceleration of the carrier chart, not a particle benchmark.

For the compact fixture, this gives
$$
\alpha_{\mathrm{partner}}\approx-1.67\times10^{-2},
\qquad
\alpha_{\mathrm{self}}=0,
\qquad
\alpha_{\mathrm{inter}}\approx-5.66\times10^{-3},
$$
with relative residual
$$
\frac{
\left\|\mathbf{a}_{\mathrm{carrier}}-\sum_{\rho}\alpha_\rho B_\rho\right\|_2
}{
\|\mathbf{a}_{\mathrm{carrier}}\|_2
}
\approx0.755.
$$
Against the declared tolerance `0.02`, scalar relation weights alone fail. The compact fixture therefore has a local no-go:

**Relation-weight-only no-go.** For the current compact $A_0$ carrier chart, locked self-root routing, and scalar relation basis $\{B_{\mathrm{self}},B_{\mathrm{partner}},B_{\mathrm{inter}}\}$, no branch-native scalar relation-weight vector $\alpha_{\mathrm{rel}}$ closes the carrier acceleration residual below tolerance. A successful next branch equation must introduce a non-circular carrier correction satisfying
$$
\mathbf{d}_\ell''(t)
=
\Pi_\ell
\left(
\mathbf{a}_{\mathrm{carrier}}(t)
-
\sum_{\rho}
\alpha_\rho B_\rho(t)
\right)
$$
or a richer root/interaction basis that reduces the same residual without observed particle benchmarks.

### Residual-Balanced Carrier Correction Route

The smallest correction route is to keep the root ledger, locked fold-layer routing, and quotient-row label fixed, and replace only the diagnostic circular / elliptic carrier by a symmetry-reduced periodic carrier:
$$
\mathbf{s}_{\ell,\sigma}^{\mathrm{corr}}(t)
=
\mathbf{C}_\ell(t)
+
\frac{\sigma}{2}
\left(
\mathbf{r}^{0}_\ell(t)+\mathbf{d}_\ell(t)
\right),
\qquad
\sigma\in\{+1,-1\}.
$$
The correction $\mathbf{d}_\ell(t)$ is a relative-layer correction, not a new force term. It must satisfy
$$
\mathbf{d}_\ell(t+T_{\mathbf{k}})=\mathbf{d}_\ell(t),
\qquad
\mathbf{d}_\ell'(t+T_{\mathbf{k}})=\mathbf{d}_\ell'(t),
\qquad
\int_0^{T_{\mathbf{k}}}\mathbf{d}_\ell(t)\,dt=\mathbf{0},
$$
and it must be orthogonal to the modes that merely re-label the branch chart:
$$
\Pi_{G_{\mathrm{sym}}}\mathbf{d}_\ell=0.
$$
Here $G_{\mathrm{sym}}$ includes time-origin shift, global Euclidean translations and rotations, and the layer-local radius, phase, and plane-orientation directions already represented in $z_\Lambda$. This prevents $\mathbf{d}_\ell$ from hiding a changed branch label inside a correction term.

Let
$$
\mathbf{g}_\ell(t;\alpha_{\mathrm{rel}})
=
\Pi_\ell
\left(
\mathbf{a}_{\mathrm{carrier}}(t)
-
\sum_{\rho}
\alpha_\rho B_\rho(t)
\right)
$$
be the layer-projected residual-balance forcing from `a0-tier1-residual-balance-ledger/v1`. The first correction equation is the periodic boundary-value problem
$$
\mathbf{d}_\ell''(t)
=
Q_\ell\mathbf{g}_\ell(t;\alpha_{\mathrm{rel}}),
\qquad
Q_\ell=1-\Pi_{G_{\mathrm{sym}}},
$$
with the solvability condition
$$
\int_0^{T_{\mathbf{k}}}
Q_\ell\mathbf{g}_\ell(t;\alpha_{\mathrm{rel}})\,dt
=
\mathbf{0}.
$$
If the mean projected forcing is nonzero for every admissible $\alpha_{\mathrm{rel}}$, the failure is not a numerical one-period failure; it is a compact-fixture correction no-go for this scalar relation basis. If the mean condition passes, the periodic solution can be computed in the nonzero Fourier modes of the sampled branch data:
$$
\widehat{\mathbf{d}}_{\ell,m}
=
-
\frac{
\widehat{Q_\ell\mathbf{g}}_{\ell,m}
}{
\left(2\pi m/T_{\mathbf{k}}\right)^2
},
\qquad
m\ne0,
$$
after omitting modes absorbed by $z_\Lambda$.

This changes the residual ledger by adding a correction component
$$
\mathcal{R}_{\mathrm{corr}}
=
\max_\ell
\left(
\frac{
\left\|
\mathbf{d}_\ell''-Q_\ell\mathbf{g}_\ell
\right\|_{L^2(0,T_{\mathbf{k}})}
}{
\max(\|\mathbf{a}_{\mathrm{carrier},\ell}\|_{L^2},\epsilon_{\mathrm{corr}})
}
+
\frac{
\left\|
\int_0^{T_{\mathbf{k}}}Q_\ell\mathbf{g}_\ell\,dt
\right\|
}{
\max(\int_0^{T_{\mathbf{k}}}\|\mathbf{a}_{\mathrm{carrier},\ell}\|\,dt,\epsilon_{\mathrm{corr}})
}
\right).
$$
The corrected one-period residual vector is therefore
$$
\mathcal{R}_{\mathrm{1p,corr}}^\eta
=
\left(
R_{\text{state}},
R_{\text{root}},
R_{\text{phase}},
R_E,
R_{\text{drift}},
R_{\text{speed}},
R_{\text{lock}},
R_{\text{corr}}
\right).
$$
A row may proceed to monodromy only if $R_{\text{corr}}$ and the original one-period residuals all pass after the corrected carrier is rerun through causal-root solving. Passing the acceleration projection alone is not enough, because $\mathbf{d}_\ell(t)$ changes the root times, Jacobians, phase residuals, speed ordering, and center-drift ledger.

If this periodic correction fails, the next branch-native alternative is not another scalar relation-weight fit. The basis must split the active causal-root ledger more finely before solving the same normal equation. The first admissible refinement is to replace
$$
\{B_{\mathrm{self}},B_{\mathrm{partner}},B_{\mathrm{inter}}\}
$$
by branch-data basis vectors resolved by relation class, receiver layer, polarity, root branch key, and radial/tangential projection:
$$
B_{\rho,\ell,\sigma,\mu,\nu}(t),
\qquad
\rho\in\{\mathrm{self},\mathrm{partner},\mathrm{inter}\},
\qquad
\nu\in\{r,\theta\}.
$$
Those weights remain branch-native only if their equality constraints are declared before fitting: pro/anti symmetry inside a layer, shared weights for quotient-equivalent root keys, no dependence on particle masses or measured $\alpha$, and no promotion of $K_L$ into the active self-branch count. The richer basis is falsified if it cannot reduce the same residual surface below tolerance while preserving these constraints and the corrected one-period root ledger.

First executable step: consume the existing residual-balance ledger, compute $Q_\ell\mathbf{g}_\ell$ on the sampled one-period window, report the mean solvability residual, build the truncated periodic $\mathbf{d}_\ell(t)$ when solvable, and rerun $\mathcal{P}_{\eta,\Lambda,K_L,\mathbf{d},\alpha_{\mathrm{rel}}}$. The corrected branch fails closed if any one of the following occurs:

- $\int Q_\ell\mathbf{g}_\ell\,dt$ remains above tolerance for every admissible $\alpha_{\mathrm{rel}}$;
- the constructed $\mathbf{d}_\ell(t)$ is dominated by modes removed into $z_\Lambda$ rather than by genuine non-circular motion;
- rerunning causal-root solving changes the locked fold-layer keys, active root counts, or quotient-row identity outside tolerance;
- $R_{\text{state}}$, $R_{\text{root}}$, $R_{\text{phase}}$, $R_E$, $R_{\text{drift}}$, $R_{\text{speed}}$, $R_{\text{lock}}$, or $R_{\text{corr}}$ exceeds tolerance;
- the same corrected branch does not persist across the declared $\eta$ ladder.

## Tier 2: Energy and Shielding Extraction

Tier 2 begins only after Tier 1 passes.

Required outputs:

- sign-resolved kinetic ledger,
- interaction and wake/history terms,
- $E_I,E_M,E_O$ and $E_{\text{internal}}(A_0)$,
- far-field sampling grid and angular resolution,
- $\mathcal{L}(\hat{\mathbf{R}})$,
- $\zeta(A_0)$,
- $\mathcal{L}_{\text{aniso}}$,
- unresolved constants list,
- explicit statement that no particle benchmark was used.

Tier 2 does not yet produce the electron mass. It produces the calibration-free exposed-energy coefficient that the later mass-map comparison can test.

## Tier 3: Response Tensor Probe

Tier 3 begins only after Tier 2 produces stable energy and shielding outputs.

Probe two perturbation families:

1. Small acceleration probe in a homogeneous Noether-Sea cell:
   $$
   \mathbf{V}_{\text{cm}}\mapsto\mathbf{V}_{\text{cm}}+\delta\mathbf{V}.
   $$
2. Small matched gradient probe:
   $$
   G_{\text{grad}}\mapsto G_{\text{grad}}+\delta G.
   $$

The homogeneous inertial response target is
$$
p_{\text{int}}^a
\approx
\alpha\,\zeta(A_0)E_{\text{internal}}(A_0)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

Certificate burden: report whether acceleration and gradient probes perturb the same shielded-energy lock to first order. If they do not, the mass-map equivalence-principle route remains open or fails.

## Failure Taxonomy

Every failed certificate should classify the failure:

| Failure | Meaning | Next action |
| --- | --- | --- |
| History-depth failure | roots change when the path-history window is increased | increase history depth before drawing physics conclusions |
| Resolution failure | residuals change under $\Delta t$, angular, or $\eta$ refinement | improve numerical resolution |
| Carrier failure | circular or elliptic carrier has large tangential residuals | add $\mathbf{d}_\ell(t)$ or inter-layer phase correction |
| Root-ledger failure | active roots cannot close over $T_{\mathbf{k}}$ | reject branch label or search different winding integers |
| Separator singularity | $J$ near zero dominates without stable continuation | treat as locking term and run $\eta>0$ continuation |
| Scale-separation failure | $R_I:R_M:R_O$ or $T_I:T_M:T_O$ collapses | revise the separated-scale hypothesis |
| Stability failure | $\Delta_{\mathbf{k}}\le0$ | reject as non-attractor even if integer closure holds |
| Leakage instability | far-field coefficient does not converge | do not compute $\zeta(A_0)$ |
| Response mismatch | acceleration and gradient probes disagree at first order | do not claim inertial/gravitational response closure |

## Next Implementation Packet

The first Tier 0 implementation packet is complete enough for handoff. The current scripts emit the reduced grid, carrier evaluator, active root ledger by relation class, $J_{ab}^{(m)}$ values, quotient row $z_\Lambda$, residual surface, $\Delta_{\mathbf{k}}$ placeholder, weak-retained handoff placeholder, blocked accepted-history writer output, and weak-emitter fail-closed behavior. Those items should no longer be carried as next tasks here.

The fold-layer-locked one-period Tier 1 attempt is now also complete as a fail-closed diagnostic. It preserves the two locked self-root fold-layer keys in $\mathcal{R}_{\text{lock}}$, runs the under-cap retained-step budget, emits one-period residual ledgers, and refuses accepted-history output. Its direct residual failure and residual-balance no-go make the compact circular / elliptic carrier chart inadequate as a closed branch equation.

The periodic residual-balanced carrier-correction bridge is now implemented far enough to falsify the scalar no-omitted-mode correction as a closed branch. The next implementation packet is no longer the bridge itself. It is the richer branch-native basis route that can decide whether the compact fixture needs root-key / projection-resolved interaction weights or should be rejected as a compact-chart branch:
$$
\mathbf{d}_\ell''(t)
=
Q_\ell\Pi_\ell
\left(
\mathbf{a}_{\mathrm{carrier}}(t)
-
\sum_{\rho}
\alpha_\rho B_\rho(t)
\right).
$$
The completed bridge already tests the mean solvability condition, emits a rerun packet when the retained correction basis is executable, and keeps accepted-history output blocked. Since the corrected rerun still fails the one-period ledgers, the next result should be a stronger no-go for the compact fixture unless a refined branch-native basis reduces the same residual surface without changing the branch label.

The remaining branch-equation handoff should now produce:

1. an explicit equality-constrained replacement for the scalar relation basis by $B_{\rho,\ell,\sigma,\mu,\nu}(t)$ resolved by relation class, receiver layer, polarity, root branch key, and radial / tangential projection channel;
2. a proof that the refined basis preserves pro/anti symmetry, quotient-equivalent root sharing, the locked fold-layer keys in $\mathcal{R}_{\text{lock}}$, and benchmark exclusion;
3. a rerun packet or no-go ledger for the refined basis, using the same state-return, root-closure, phase-closure, speed-ordering, energy-like speed, drift, lock-stability, and correction residuals;
4. quotient-row identity carried through the corrected branch row before accepted-history emission;
5. monodromy / $\Delta_{\mathbf{k}}$ and $\eta$-ladder continuation only after the corrected one-period residuals pass;
6. finite envelope-Hessian extraction only after the same corrected branch passes, with $k_R$, $k_\xi$, $k_{R\xi}$, $c_R$, and $c_\xi$ emitted as branch evidence rather than toy stiffnesses;
7. confirmation that accepted-history output remains blocked until one-period residual closure, no secular center drift, positive $\Delta_{\mathbf{k}}$, quotient-row identity, and branch persistence across the declared $\eta$ ladder are all present.

Scanner implementation note, May 20, 2026:

```text
node scripts/mass-map/a0-tier1-carrier-correction-scanner.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-impl-v2.json --pretty --out /tmp/a0-tier1-carrier-correction-scanner.json
```

The fold-layer one-period runner now adds `sampled_forcing` to `a0-tier1-residual-balance-ledger/v1` when it can compute the residual-balance normal equation. The scanner consumes only that sampled branch-native forcing. For each layer it tests
$$
\int_0^{T_{\mathbf{k}}}Q_\ell\mathbf{g}_\ell(t)\,dt=\mathbf{0}
$$
by a relative mean residual, omits declared chart modes from the correction basis, and emits retained Fourier coefficients
$$
\widehat{\mathbf{d}}_{\ell,m}
=
-
\frac{\widehat{\mathbf{g}}_{\ell,m}}{(2\pi m/T_{\mathbf{k}})^2},
\qquad m\ne0.
$$
If `sampled_forcing.period` or `sampled_forcing.samples[].layers.{I,M,O}.residual_forcing` is absent, the scanner returns `blocked_sampled_forcing_missing` with the missing field names. If the mean forcing is above tolerance it returns `blocked_mean_solvability_failed`; if omitted chart modes dominate the resolved nonzero forcing it returns `blocked_chart_mode_dominated`; otherwise it returns `fourier_carrier_correction_candidate`. This candidate status authorizes only a corrected one-period rerun. It is not an accepted-history row and does not compute root closure, quotient monodromy, $\Delta_{\mathbf{k}}$, or eta-ladder persistence.

Carrier-correction chart-policy result, May 20, 2026:

```text
node scripts/mass-map/a0-tier1-carrier-correction-scanner.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-codex-review.json --pretty --out /tmp/a0-tier1-carrier-correction-scanner-codex-review-default.json

node scripts/mass-map/a0-tier1-carrier-correction-scanner.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-codex-review.json --omit-modes none --pretty --out /tmp/a0-tier1-carrier-correction-scanner-codex-review-omit-none.json
```

The regenerated fold-layer attempt artifact `/tmp/a0-tier1-fold-layer-locked-one-period-attempt-codex-review.json` makes the carrier-correction decision chart-policy sensitive. With the default chart policy, mode `1` is omitted as part of the reduced branch coordinate $z_\Lambda$. The scanner returns `blocked_chart_mode_dominated` with one blocked row. The `O`-layer omitted-chart-mode energy fraction is `0.9997697101092003`, and its correction residual is `0.9998848484246575`, while the `I` and `M` layers remain Fourier correction candidates with mean residuals `0.005469226331224925` and `0.003874878104606083`.

With `--omit-modes none`, the same sampled forcing returns `fourier_carrier_correction_candidate` with one candidate row and all three layers candidate. The layer mean residuals are `I: 0.005469226331224925`, `M: 0.003874878104606083`, and `O: 0.001470074064399575`; the correction residuals equal these mean residuals.

**Chart-mode projection criterion.** For each layer $\ell$, let $\mathcal{C}_\ell$ be the omitted chart subspace spanned by the declared Fourier modes already represented in the reduced chart $z_\Lambda$, and let $\mathcal{C}_\ell^\perp$ be the retained correction complement used for $\mathbf{d}_\ell(t)$. If $P_{\mathcal{C}_\ell}$ denotes the $L^2([0,T_{\mathbf{k}}])$ projection onto $\mathcal{C}_\ell$, then the layer-projected sampled forcing must be split as
$$
Q_\ell\mathbf{g}_\ell
=
P_{\mathcal{C}_\ell}Q_\ell\mathbf{g}_\ell
+
\left(1-P_{\mathcal{C}_\ell}\right)Q_\ell\mathbf{g}_\ell,
$$
where only the retained term $\left(1-P_{\mathcal{C}_\ell}\right)Q_\ell\mathbf{g}_\ell\in\mathcal{C}_\ell^\perp$ may feed $\mathbf{d}_\ell(t)$. If
$$
\|P_{\mathcal{C}_\ell}Q_\ell\mathbf{g}_\ell\|_{L^2}
>
\tau_{\mathrm{chart}}
\left\|
\left(1-P_{\mathcal{C}_\ell}\right)Q_\ell\mathbf{g}_\ell
\right\|_{L^2},
$$
for the declared chart-dominance tolerance $\tau_{\mathrm{chart}}$, the forcing is a chart update or branch-split signal, not an admissible retained correction mode. If the retained forcing satisfies the mean-solvability condition and remains below the declared correction tolerance, it may feed a corrected one-period rerun.

On the May 20, 2026 scanner artifacts, the default chart policy puts mode `1` in $\mathcal{C}_O$ and the `O` layer is chart dominated: the omitted-chart-mode energy fraction is `0.9997697101092003`, with correction residual `0.9998848484246575`. Under `--omit-modes none`, $\mathcal{C}_\ell=\{0\}$ for the scanner run, so all three retained forcings are treated as Fourier correction candidates with mean residuals `I: 0.005469226331224925`, `M: 0.003874878104606083`, and `O: 0.001470074064399575`.

Mathematical implication: the non-circular correction is not simply blocked. It is chart-policy sensitive. If mode `1` is treated as part of $z_\Lambda$, the `O`-layer forcing is mostly chart motion and cannot be added as a retained correction $\mathbf{d}_O(t)$ without hiding a changed branch chart inside the correction term. If no mode is omitted, the same sampled forcing passes as a Fourier correction candidate. That status authorizes only a corrected one-period rerun with fresh causal-root solving and residual ledgers; it is not accepted history and does not establish quotient-row identity, monodromy, $\Delta_{\mathbf{k}}$, or eta-ladder persistence.

Correction-packet emitter note, May 20, 2026:

```text
node scripts/mass-map/a0-tier1-carrier-correction-packet.mjs --scanner /tmp/a0-tier1-carrier-correction-scanner-final-omit-none.json --pretty --out /tmp/a0-tier1-carrier-correction-packet-final-omit-none.json
```

The packet emitter consumes `a0-tier1-carrier-correction-scanner/v1` and emits only `a0-tier1-carrier-correction-packet/v1` rerun-input candidates. On the default scanner artifact it returns `blocked_source_row_not_candidate` because the source row is `blocked_chart_mode_dominated`. On the `--omit-modes none` scanner artifact it returns `correction_packet_ready` for row `1`, with eight retained correction modes for each of the `I`, `M`, and `O` layers. The packet still sets `accepted_history_boundary: false`; it is a bridge into a corrected one-period attempt, not a branch certificate.

Waveform replay note, May 20, 2026:

```text
node scripts/mass-map/a0-tier1-carrier-correction-waveform-replay.mjs --packet /tmp/a0-tier1-carrier-correction-packet-final-omit-none.json --pretty --out /tmp/a0-tier1-carrier-correction-waveform-replay-final-omit-none.json
```

The waveform replay consumes `a0-tier1-carrier-correction-packet/v1`, verifies the retained coefficient identity $\widehat{\mathbf{d}}_{\ell,m}=-\widehat{\mathbf{g}}_{\ell,m}/(2\pi m/T_{\mathbf{k}})^2$, reconstructs $\mathbf{d}_\ell(t)$, $\mathbf{d}_\ell'(t)$, and $\mathbf{d}_\ell''(t)$ on the replay grid, and applies the center-preserving body placement rule
$$
\delta \mathbf{s}_{\ell,+}=+\frac12\mathbf{d}_\ell,
\qquad
\delta \mathbf{s}_{\ell,-}=-\frac12\mathbf{d}_\ell,
$$
with the same signs for velocity and acceleration corrections. The default-policy packet remains blocked as `blocked_source_row_not_ready`. The `--omit-modes none` packet returns `waveform_replay_ready` for row `1`, with `64` samples, eight retained modes per layer, zero coefficient-identity relative error in all layers, and body update records for `I+`, `I-`, `M+`, `M-`, `O+`, and `O-`. This waveform replay is still only a corrected-rerun input check; it does not solve delayed roots on the corrected carrier and does not certify accepted history.

Corrected one-period rerun note, May 20, 2026:

```text
node scripts/mass-map/a0-tier1-fold-layer-locked-one-period-attempt.mjs --intake /tmp/a0-tier1-one-period-continuation-prototype-codex-review.json --source /tmp/a0-tier1-continuation-source-prototype-codex-review.json --correction-packet /tmp/a0-tier1-carrier-correction-packet-final-omit-none.json --pretty --out /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none.json
```

The one-period runner now has a reusable retained Fourier correction evaluator and a `--correction-packet` rerun path. For the `--omit-modes none` packet, row `1` reaches `correction_context_ready`, carries eight retained modes for each of `I`, `M`, and `O`, applies the center-preserving body updates to the initial state, path-history lookup, direct acceleration, emitted samples, and residual-balance source lookup, and reports `corrected_integrator_present: true`. A follow-up patch also corrected the direct prehistory lookup so delayed source states in the acceleration path receive the same correction context. The corrected artifact still sets `accepted_history_boundary: false`.

The corrected run is a controlled negative result, not an accepted branch. Its status is `failed_direct_one_period_residuals`. It improves several direct diagnostics relative to the uncorrected run:

- maximum direct root residual drops from about `42.67` to about `40.12`;
- maximum speed-ordering residual drops from about `29.93` to about `1.59`;
- energy-like speed residual drops from about `26.68` to about `0.872`;
- center drift passes, with maximum center drift about $1.23\times10^{-17}$.

The remaining blockers are decisive:

- $R_{\text{state}}\approx0.942$ still fails against tolerance `0.02`;
- maximum direct root residual $\approx40.12$ still fails against tolerance $10^{-6}$;
- speed ordering still fails against tolerance `0.02`;
- residual balance worsens from about `0.755` to about `0.993`;
- quotient monodromy, $\Delta_{\mathbf{k}}$, and the $\eta$ ladder remain not computed because the corrected one-period residuals did not pass.

Fail-closed control: feeding the runner the default-policy blocked correction packet produces `blocked_packet_fields_missing` for row `1`, with neither the direct nor corrected integrator marked present. The corrected path therefore does not silently fall back to the uncorrected carrier.

Refined-basis no-go, May 20, 2026:

The runner now also emits `a0-tier1-refined-residual-basis-ledger/v1` as `residual_ledgers.refined_residual_balance`. The refined ledger resolves the residual-balance fit by relation class, receiver layer, source layer, pro/anti polarity pair, and instantaneous radial / tangential projection channel, while keeping these equality constraints explicit:

- pro/anti symmetry inside a receiver layer;
- shared weights for quotient-equivalent root classes;
- locked fold-layer keys excluded from the active basis;
- benchmark inputs excluded.

On `/tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-v4.json`, the quotient-equivalent refined ledger reports `30` equality-constrained basis groups, `30` raw root-key classes, `144` equations, and `16` sample buckets. It reduces the corrected residual-balance relative residual from about `0.993` to about `0.426`, but this still fails the declared `0.02` tolerance. The status is therefore `refined_basis_no_go`, not a correction-packet pass.

The same v3 artifact also emits `residual_ledgers.refined_root_key_residual_balance`. This second ledger keeps the current raw key
`receiver|source|relation|status`
as the provisional $\mu$ coordinate in the solved basis. It reports `60` root-key-resolved basis groups, `30` raw root-key classes, `144` equations, and relative residual `0.4262791397038621`. Splitting the quotient-equivalent classes by the current raw root key therefore gives no material improvement and still fails the declared tolerance by a factor of about `21.3`.

The v4 artifact then tests the smallest branch-coordinate revision suggested by the residual localization: `residual_ledgers.refined_i_receiver_phase_bin_residual_balance`. This ledger keeps the root-key-resolved $\mu$ columns and splits only receiver-layer `I` by two observation-phase bins,
$$
b(t)=\left\lfloor 2\,\frac{t\bmod T_{\mathbf{k}}}{T_{\mathbf{k}}}\right\rfloor.
$$
It reports `80` basis groups and relative residual `0.3500173344435869`. This improves the residual but still fails the `0.02` tolerance by a factor of about `17.5`. The layer residuals remain concentrated in `I`: the root-key-resolved test gives approximate layer residuals `I: 0.4305`, `M: 0.0802`, and `O: 0.00338`; the two-bin `I` split improves only the `I` residual to about `0.3534`.

Mathematical implication: the no-omitted-mode scalar Fourier correction removes the bulk center drift and improves the scale of some one-period residuals, but it does not close the compact $A_0$ branch equation. The equality-constrained split, the raw-root-key $\mu$ split, and the first `I`-receiver observation-phase split all improve residual balance over scalar relation weights, but all fail by more than an order of magnitude. The next branch-native move is no longer another scalar relation-weight fit, same-artifact root-key split, or coarse two-bin `I` phase split; it is a declared branch-chart revision that supplies a finite coordinate finer than the current raw key and two-bin phase coordinate, or a non-root-key mode in $z_\Lambda$, before any further corrected rerun.

Compact-fixture no-go decision, May 20, 2026:

The decision for the current branch chart is the stricter no-go under the finite root-key coordinate and first coarse `I`-receiver observation-phase coordinate currently present in the artifact. The quotient-equivalent ledger records `basis_resolution.basis_mode: quotient_equivalent_root_class`; the second ledger records `basis_resolution.basis_mode: root_key_resolved`; the third records `basis_resolution.basis_mode: i_receiver_root_key_phase_bin`. The current active causal-root ledger has no finer finite root-branch coordinate than `receiver|source|relation|status` repeated across the `16` observation buckets, and using that raw key as $\mu$ does not reduce the residual. A two-bin `I` observation-phase split reduces the residual only to about `0.350`.

The no-go statement is therefore:

**Compact finite-coordinate no-go.** For the corrected compact $A_0$ carrier, the locked fold-layer routing $K_L$, benchmark exclusion, radial / tangential projection splitting, the current finite raw-root-key coordinate
`receiver|source|relation|status`, and the coarse two-bin `I` observation-phase coordinate,
no branch-native refined weight vector closes the residual-balance surface below tolerance. Numerically,
$$
\frac{\left\|\mathbf{a}_{\mathrm{carrier}}-\sum_{\rho,\ell,\sigma,\mu,\nu}\beta_{\rho,\ell,\sigma,\mu,\nu}B_{\rho,\ell,\sigma,\mu,\nu}\right\|_2}
{\|\mathbf{a}_{\mathrm{carrier}}\|_2}
\approx0.3500173344
>0.02.
$$
This proves a compact-fixture no-go for the current finite coordinate tests. It does not prove that every imaginable $A_0$ branch chart fails; a further corrected rerun is admissible only after an upstream branch-chart revision supplies a new finite coordinate $\mu$ beyond the current raw key and coarse `I` phase bin, or declares a non-root-key branch-chart mode in $z_\Lambda$ without violating locked-key exclusion, quotient-row identity, and benchmark exclusion.

The next branch-chart packet must therefore answer the equality question before code reruns:

1. Does the revised chart introduce a distinct finite root-branch coordinate $\mu$ not already represented by `receiver|source|relation|status` or by the two-bin `I` observation-phase split?
2. If not, which non-root-key mode in $z_\Lambda$ is missing from the compact carrier?
3. Which equality constraints survive after the new coordinate or mode is declared?
4. Which residual or invariant would falsify the revision as overfitting rather than branch geometry?

The operational contract for answering those questions is now [the $A_0$ Branch-Chart Revision Contract](a0-branch-chart-revision-contract.md). It selects the non-root-key inner-layer harmonic deformation coordinate $\mathcal{H}_I$ as the first Type B candidate for $z_\Lambda^\star$, with primary modes $\{4,5,7\}$, guard mode $\{6\}$, a Nyquist guard for `m=8`, held-out residual checks, locked-key exclusion, and benchmark exclusion before another corrected one-period rerun is admissible. The first executable checker rejects the current artifact: the residual-surface source is `rejected_hidden_fit_split`, and a permissive `prefit_branch_chart` declaration still fails as `overfit_holdout_fail` with held-out relative residual about `2.454`.

## Promotion Rule

An $A_0$ branch may move from `derive_first_attractor_family` into `derive_zeta` only when a certificate packet reports:

1. Tier 0 root-ledger enumeration.
2. Tier 1 $\eta>0$ continuation with residuals below tolerance.
3. Positive non-symmetry Floquet gap.
4. Stable speed ordering.
5. Stable root ledger under refinement.
6. Tier 2 energy and shielding extraction with convergence.
7. Explicit exclusion of observed particle masses and charged-lepton ratios as inputs.

If any item is missing, the packet remains a branch-search artifact, not a mass-map result.
