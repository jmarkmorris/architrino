# $A_0$ Reduced Branch Certificate Packet

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
\mathcal{R}_{\text{Floquet}}
\right).
$$

Every component must include units or normalization, tolerance, refinement status, and the branch label $\Lambda$ that produced it. A scan that reports only a best geometry without this residual vector is not a certificate.

## Reduced Certificate Proposition

For fixed $\eta>0$, a branch label $\Lambda$ is a reduced $A_0$ branch certificate when all of the following are reported in one auditable packet:

1. a finite causal-root ledger $\mathcal{G}_{A_0}$ over $T_{\mathbf{k}}$;
2. nonresonant terms assigned to $\mathcal{R}_{\text{avg}}$ with declared order and tolerance;
3. near-separator and resonance terms retained in $\mathcal{R}_{\text{lock}}$;
4. leakage terms assigned to $\mathcal{R}_{\text{leak}}$ with the leading far-field channel named;
5. reduced closure equations for state, phase, center, speed ordering, and energy ledger;
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

Tier 1 passes only if a branch has:

- declared residuals below tolerance,
- speed ordering retained,
- $\Delta_{\mathbf{k}}>0$,
- no secular center drift,
- stable root ledger under refinement.

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

Build the Tier 0 algebraic branch-search artifact first. The minimum useful artifact is a reproducible table of finite reduced candidates, not a full simulator.

The first implementation pass should produce:

1. a small parameter-grid definition for $\varepsilon_{IM}$, $\varepsilon_{MO}$, $\delta_M$, $(R_I:R_M:R_O)$, $(T_I:T_M:T_O)$, and $(H_I,H_M,H_O)$;
2. a carrier evaluator for circular and elliptic diagnostic charts;
3. a root-ledger enumerator that emits partner, self, and inter-layer root classes with $J_{ab}^{(m)}$ values;
4. a quotient-coordinate emitter for $z_\Lambda$ with the removed rotation, phase, and chart relabeling gauges declared;
5. a resonance classifier that separates $\mathcal{R}_{\text{avg}}$ from $\mathcal{R}_{\text{lock}}$;
6. a leakage placeholder that reports the leading nonzero far-field channel rather than hiding it;
7. a provisional `weak_retained_amplitude_handoff` field that reports `not-computed` or `candidate` with the missing Tier 1/Tier 2 inputs named;
8. one output row per branch label $\Lambda$, including $z_\Lambda$, $\mathcal{R}_{A_0}$, $\Delta_{\mathbf{k}}$, and a failure code.

Only after Tier 0 emits at least one nontrivial candidate should the workstream spend effort on Tier 1 direct delayed dynamics.

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
