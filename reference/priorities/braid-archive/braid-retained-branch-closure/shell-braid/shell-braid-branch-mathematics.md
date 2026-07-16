# Shell Braid Branch Mathematics

This priority packet states theorem targets for same-level braid branch mathematics. It is not a completed existence, stability, or observer-export proof. Its role is to make the DDE well-posedness and causal-root ledger obligations precise enough that a retained branch certificate can later be checked against [Braid Architecture](braid-architecture.md).

Promotion status: `priority-only`. Do not promote this document into `content/markdown/aaa` until a concrete same-level branch supplies the active causal roots, Jacobian floors, receiver-normal branch strengths, finite memory depth, tangential residual closure, polarity ledger, and weak-limit data required below.

---

## 1. Absolute-Timespace Branch Chart

Work on absolute timespace

$$
\mathcal{M}=\mathbb{R}\times\mathbb{R}^3,
\qquad
\Sigma_T=\{T\}\times\mathbb{R}^3,
\qquad
h_{ij}=\delta_{ij},
$$

with absolute time $T$, Euclidean void slices $\Sigma_T$, and primitive causal-wake speed $c_f>0$. A same-level branch chart over a compact window $W=[T_-,T_+]$ consists of $N$ architrino worldlines

$$
\mathbf X_i: [T_- - h,T_+]\to\mathbb{R}^3,
\qquad
\mathbf V_i(T)=\frac{d\mathbf X_i}{dT}(T),
\qquad
i=1,\ldots,N,
$$

with intrinsic polarities

$$
q_i=\sigma_i\epsilon,
\qquad
\sigma_i\in\{+1,-1\},
\qquad
\epsilon=\frac{|e|}{6}.
$$

The branch state vector is

$$
\mathsf Z(T)=
\left(
(\mathbf X_i(T),\mathbf V_i(T),q_i)_{i=1}^N,
\mathbf{C}(T),\frac{d\mathbf C}{dT}(T),
R(T),\delta(T),
\mathcal{I},
\Phi(T),
\mathcal{K}
\right),
$$

where $\mathbf{C}$ is the center gauge, $R\pm\delta$ is the declared radial-sector support band, $\mathcal{I}$ is the central inventory and polarity ledger, $\Phi$ records phase offsets and winding rows, and $\mathcal{K}$ records the topological carrier and framed-wake data.

Plain language: the chart describes architrinos moving in one Euclidean void on one absolute clock, with same-level geometry recorded relative to a declared center and support descriptor. The radial support band is the default sector row, not a spherical-path assumption.

---

## 2. Admissible History Space

For memory depth $h>0$, define the history segment at time $T$ by

$$
\mathsf Z_T(\theta)=\mathsf Z(T+\theta),
\qquad
\theta\in[-h,0].
$$

For $\eta>0$ regularized evolution, the admissible history space is a Banach chart

$$
\mathscr{H}_{h,\eta}^{N}
\subset
C^1([-h,0];\Gamma_N),
$$

where $\Gamma_N$ is the finite-dimensional state space of positions, velocities, center-gauge variables, support-band variables, phase variables, and fixed polarity data satisfying the ledger constraints below. For the ideal $\eta\to0$ packet, the weaker chart

$$
\mathscr{H}_{h,0}^{N}
\subset
W^{1,\infty}([-h,0];\Gamma_N)
$$

is allowed only after the weak-limit obligations in Section 8 are supplied.

### 2.1 Center Gauge

Let

$$
\mathbf{y}_i(T)=\mathbf X_i(T)-\mathbf{C}(T),
\qquad
\mathbf U_i(T)=\frac{d\mathbf y_i}{dT}(T).
$$

A branch certificate must declare weights $\omega_i>0$ with $\sum_i\omega_i=1$ and impose the center gauge

$$
\sum_{i=1}^N\omega_i\mathbf{y}_i(T)=\mathbf{0},
\qquad
\sum_{i=1}^N\omega_i\mathbf U_i(T)=\mathbf{0}.
$$

This removes translational gauge motion from the branch chart. Moving-assembly exports may reintroduce $d\mathbf{C}/dT\ne\mathbf{0}$, but the branch-existence row is first checked in the center-gauge chart.

### 2.2 Support Band And Noncollision

The same-level condition is not a nested-radius hierarchy. In the radial same-level sector, a sufficient support certificate is the common support-band condition

$$
0<R_-\le R(T)-\delta(T),
\qquad
R(T)+\delta(T)\le R_+<\infty,
$$

and

$$
R(T)-\delta(T)
\le
\|\mathbf{y}_i(T)\|
\le
R(T)+\delta(T)
\qquad
\text{for every }i\text{ and }T\in W.
$$

More general hybrid sectors may replace this radial norm band by a declared support descriptor with equivalent lower/upper support margins, as in [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md). The radial row above should therefore be read as a sector certificate, not as a spherical path assumption.

Noncollision is an independent Euclidean gate:

$$
d_{\min}
=
\inf_{i\ne j,\ T\in W}
\|\mathbf X_i(T)-\mathbf X_j(T)\|
>
\epsilon_x.
$$

The central inventory is a ledger row, not a permission to place unresolved architrinos at $\mathbf{C}(t)$.

### 2.3 Polarity Ledger

The polarity ledger is

$$
\mathcal{P}
=
\left(
(\sigma_i)_{i=1}^N,
N_+,
N_-,
Q
\right),
$$

with

$$
N_+=\#\{i:\sigma_i=+1\},
\qquad
N_-=\#\{i:\sigma_i=-1\},
\qquad
Q=\epsilon\sum_{i=1}^N\sigma_i.
$$

The full inventory row used by the same-level certificate is

$$
\mathcal{I}=(N_+,N_-;C_{\mathrm{cent}},S_{\mathrm{chor}},Q).
$$

The ledger must close on the same retained branch as the root, energy, exposure, and event rows.

---

## 3. Active Causal-Root Ledger

For receiver $i$ and source $j$, define the active causal-root set

$$
\mathcal{A}_{ij}(T)
=
\left\{
T_{\mathrm{em}}<T:
\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\|
=c_f(T-T_{\mathrm{em}})
\right\}.
$$

The retained causal-root ledger is

$$
\mathcal{A}(T)
=
\left\{
(i,j,\alpha,T_{\mathrm{em},ij}^{\alpha}(T),\Delta_{ij}^{\alpha}(T),J_{ij}^{\alpha}(T),\chi_{ij}^{\alpha})
\right\},
$$

where $\alpha$ labels the retained root, $\Delta_{ij}^{\alpha}(T)=T-T_{\mathrm{em},ij}^{\alpha}(T)$, and $\chi_{ij}^{\alpha}$ is one of

| Root status | Meaning |
| --- | --- |
| `absent-by-policy` | ordinary same-source roots are excluded from the branch force ledger |
| `regularized-fold-layer` | a controlled $\eta>0$ fold-layer rule replaces the singular ideal root |
| `split-source-retained` | a distinct resolved source representative supplies its own positive-delay root and Jacobian floor |
| `reject` | the branch has unresolved tangent or near-zero self-root behavior |

For

$$
\mathbf{r}_{ij}(T,T_{\mathrm{em}})=\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}}),
\qquad
r_{ij}(T,T_{\mathrm{em}})=\|\mathbf{r}_{ij}(T,T_{\mathrm{em}})\|,
\qquad
\hat{\mathbf{r}}_{ij}(T,T_{\mathrm{em}})=\frac{\mathbf{r}_{ij}(T,T_{\mathrm{em}})}{r_{ij}(T,T_{\mathrm{em}})},
$$

the branch Jacobian is

$$
J_{ij}(T,T_{\mathrm{em}})
=
1-
\frac{\mathbf V_j(T_{\mathrm{em}})\cdot\hat{\mathbf{r}}_{ij}(T,T_{\mathrm{em}})}{c_f}.
$$

Equivalently, for

$$
G_{ij}(T,T_{\mathrm{em}})=r_{ij}(T,T_{\mathrm{em}})-c_f(T-T_{\mathrm{em}}),
$$

one has

$$
\frac{\partial G_{ij}}{\partial T_{\mathrm{em}}}(T,T_{\mathrm{em}})=c_fJ_{ij}(T,T_{\mathrm{em}}).
$$

The transversality target is therefore

$$
J_{\min}
=
\inf_{(i,j,\alpha,T)\in\mathcal{A}}
\left|J_{ij}^{\alpha}(T)\right|
>
\epsilon_J
>
0,
$$

together with finite root count $|\mathcal{A}(T)|<\infty$ for every $T\in W$.

---

## 4. Fixed-Speed Carrier And Tangential Closure

The ideal same-level carrier constraint is

$$
\|\mathbf U_i(T)\|=c_f
\qquad
\text{for every active carrier row}.
$$

The speed residual is the architecture residual

$$
\mathcal{R}_{\mathrm{speed},i}(T)
=
\|\mathbf U_i(T)\|-c_f.
$$

For a retained root, write the line-of-action causal-wake contribution as

$$
\mathbf{F}_{ij}(T,T_{\mathrm{em}})
=
\kappa\,\mathrm{sign}(q_iq_j)
\frac{|q_iq_j|W_{ij}^{\mathrm{rec}}(T,T_{\mathrm{em}})}
{r_{ij}^2(T,T_{\mathrm{em}})}
\hat{\mathbf{r}}_{ij}(T,T_{\mathrm{em}}),
$$

using the same active root convention as the causal-root ledger. Here $J_{ij}$ remains the source-normal root transversality row; $W_{ij}^{\mathrm{rec}}$ is the receiver-normal wake crossing factor that supplies branch strength. The fixed-speed tangential closure residual is

$$
\mathcal{R}_{\mathrm{tan},i}(T)
=
\mathbf U_i(T)\cdot
\left[
\sum_{(j,\alpha)\in\mathcal{A}_i(T)}
\mathbf{F}_{ij}\!\left(T,T_{\mathrm{em},ij}^{\alpha}(T)\right)
-
\frac{d^2\mathbf C}{dT^2}(T)
\right].
$$

In the center-gauge branch-existence chart with $d^2\mathbf{C}/dT^2=\mathbf{0}$, this reduces to the uncorrected sum of retained causal-wake forces. Moving-branch exports must keep the center-acceleration term.

A branch with $\mathcal{R}_{\mathrm{speed}}=0$ but $\mathcal{R}_{\mathrm{tan}}\ne0$ has not closed the carrier. The tangential residual is the theorem-target replacement for assuming that same-level $c_f$ motion automatically stays on a closed choreography.

If the branch declares a bounded speed factor, this fixed-speed tangent row is replaced by the speed-ODE solvability row and the bounded-speed normal row; nonzero tangent force is allowed only when it produces a closed, band-limited $\nu_i$ on the same root/action ledger.

---

## 5. Lemma Targets For Branch Mathematics

The statements below are theorem targets for a future retained branch packet. They identify what a proof must establish; they do not assert that any same-level braid branch has already satisfied the hypotheses.

### Lemma Target 1: Finite Memory From Bounded Support

Assume the support band is bounded by $R_+$, and the center gauge has drift bound

$$
\left\|\frac{d\mathbf C}{dT}(T)\right\|\le V_C<c_f
\qquad
\text{on }[T_- - h,T_+].
$$

Then any active causal root satisfies

$$
\Delta_{ij}^{\alpha}(T)
=
T-T_{\mathrm{em},ij}^{\alpha}(T)
\le
\frac{2R_+}{c_f-V_C}.
$$

In the center-gauge branch-existence chart with $d\mathbf{C}/dT=\mathbf{0}$, this reduces to

$$
h_{\mathrm{mem}}
\le
\frac{2R_+}{c_f}.
$$

Proof route: combine the root condition $c_f(T-T_{\mathrm{em}})=\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\|$ with

$$
\|\mathbf X_i(T)-\mathbf X_j(T_{\mathrm{em}})\|
\le
\|\mathbf{C}(T)-\mathbf{C}(T_{\mathrm{em}})\|+2R_+
\le
V_C(T-T_{\mathrm{em}})+2R_+.
$$

Remaining obligation: exclude unresolved near-zero self roots by assigning every same-source row one of the statuses in Section 3. The ordinary same-curve arclength row is constrained by [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md): it cannot be retained as a positive-delay Jacobian-regular root.

### Proposition Target 2: Root Continuation By The Implicit Function Theorem

Suppose $G_{ij}(T_*,T_{\mathrm{em},*})=0$ and

$$
|J_{ij}(T_*,T_{\mathrm{em},*})|>\epsilon_J.
$$

Then a retained proof should show that there are neighborhoods $U\ni T_*$ and $V\ni T_{\mathrm{em},*}$ and a unique $C^1$ function $T_{\mathrm{em},ij}^{\alpha}:U\to V$ such that

$$
G_{ij}\!\left(T,T_{\mathrm{em},ij}^{\alpha}(T)\right)=0.
$$

The continuation derivative is

$$
\frac{d T_{\mathrm{em},ij}^{\alpha}}{dT}
=
\frac{
c_f-\mathbf V_i(T)\cdot\hat{\mathbf{r}}_{ij}\!\left(T,T_{\mathrm{em},ij}^{\alpha}(T)\right)
}{
c_f-\mathbf V_j\!\left(T_{\mathrm{em},ij}^{\alpha}(T)\right)
\cdot
\hat{\mathbf{r}}_{ij}\!\left(T,T_{\mathrm{em},ij}^{\alpha}(T)\right)
}.
$$

The causal-root ledger can retain the same root label $\alpha$ only until one of the following occurs: the root exits the memory window, $J_{ij}$ reaches the Jacobian floor, a collision gate fails, a near-zero self root becomes unresolved, or the branch exits the declared support descriptor.

### Proposition Target 3: Regularized DDE Well-Posedness For $\eta>0$

For $\eta>0$, let the mollified causal-wake force define a causal-history functional

$$
\frac{d\mathsf Z}{dT}
=
\mathfrak{F}_{\eta}(\mathsf Z_T),
\qquad
\mathsf Z_T\in\mathscr{H}_{h,\eta}^{N},
$$

where all causal-surface factors use the same $\delta_\eta$ convention, the inverse-square factor is evaluated only on histories satisfying $d_{\min}>\epsilon_x$, and the center gauge is either eliminated or enforced by a smooth projection onto the gauge slice.

The proof target is:

If $\mathfrak{F}_{\eta}$ is locally Lipschitz on an admissible history neighborhood and the initial history lies in $\mathscr{H}_{h,\eta}^{N}$, then the regularized DDE has a unique local solution depending continuously on the initial history. The solution can be continued until one of the certificate bounds fails:

$$
d_{\min}>\epsilon_x,
\qquad
R(T)+\delta(T)\le R_+,
\qquad
J_{\min}>\epsilon_J,
\qquad
|\mathcal{A}(T)|<\infty,
$$

or until the chosen $\eta>0$ fold-layer rule changes status.

This row proves only regularized evolution. It does not prove an exact fixed-speed carrier, a stable branch, a Noether sea response row, or an observer-export result.

### Proposition Target 4: Weak-Limit Obligations As $\eta\to0$

A same-level branch certificate may take $\eta\to0$ only after the following weak-limit obligations are recorded on the same retained branch:

1. Uniform noncollision:

   $$
\inf_{\eta,T,i\ne j}
\|\mathbf X_{i,\eta}(T)-\mathbf X_{j,\eta}(T)\|
   >
   \epsilon_x.
   $$

2. Uniform root control:

   $$
\inf_{\eta,(i,j,\alpha,T)}
|J_{ij,\eta}^{\alpha}(T)|
   >
   \epsilon_J,
   \qquad
\sup_{\eta,T}|\mathcal{A}_{\eta}(T)|<\infty,
   \qquad
   \sup_{\eta}h_{\mathrm{mem},\eta}<\infty.
   $$

3. Distributional force convergence: for every smooth compactly supported test function $\psi(T)$,

   $$
   \lim_{\eta\to0}
\int_W
\psi(T)\mathbf{F}_{i,\eta}(T)\,dT
=
\int_W
\psi(T)
\sum_{(j,\alpha)\in\mathcal{A}_i(T)}
\mathbf{F}_{ij}\!\left(T,T_{\mathrm{em},ij}^{\alpha}(T)\right)
dT.
   $$

4. Residual convergence on the retained row:

   $$
   \mathcal{R}_{\mathrm{tri},\eta}
   \longrightarrow
   \mathcal{R}_{\mathrm{tri},0}
   \quad
   \text{in the declared residual norms}.
   $$

5. Event-ledger convergence for energy, momentum, angular momentum, charge provenance, recoil, and Noether sea medium update.

If any self row converges into a tangent or near-zero fold without a controlled $\eta>0$ rule, the correct certificate status is `reject`, not promotion.

---

## 6. Residual Vector Required For Promotion

This branch-mathematics packet uses the exact architecture residual names:

$$
\mathcal{R}_{\mathrm{tri}}
=
\left(
\mathcal{R}_{\mathrm{state}},
\mathcal{R}_{\mathrm{phase}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{Jac}},
\mathcal{R}_{\mathrm{speed/clock}},
\mathcal{R}_{\mathrm{dyn}},
\mathcal{R}_{\mathrm{inventory}},
\mathcal{R}_{E},
\mathcal{R}_{\mathrm{top}},
\mathcal{R}_{\mathrm{exposure}},
\mathcal{R}_{\mathrm{Lorentz}},
\mathcal{R}_{\mathrm{event}}
\right).
$$

The minimum same-level branch pass condition remains

$$
\max_i
\frac{\|\mathcal{R}_{\mathrm{tri},i}\|}
{\epsilon_{\mathrm{tri},i}}
\le1,
\qquad
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x,
\qquad
h_{\mathrm{mem}}<\infty.
$$

The intended residual meanings for this packet are:

| Residual | Branch-mathematics obligation |
| --- | --- |
| $\mathcal{R}_{\mathrm{state}}$ | support descriptor, center gauge, noncollision, and state-vector consistency |
| $\mathcal{R}_{\mathrm{phase}}$ | same-level phase offsets, winding rows, and phase-lock closure |
| $\mathcal{R}_{\mathrm{root}}$ | active causal-root ledger completeness and root-status assignment |
| $\mathcal{R}_{\mathrm{Jac}}$ | positive Jacobian floor and transversality for retained roots |
| $\mathcal{R}_{\mathrm{speed/clock}}$ | fixed-speed carrier condition or bounded-speed band, clock, and period rows |
| $\mathcal{R}_{\mathrm{dyn}}$ | fixed-speed tangent/curvature closure or bounded-speed speed-ODE/normal closure |
| $\mathcal{R}_{\mathrm{inventory}}$ | polarity ledger, central inventory, and charge provenance |
| $\mathcal{R}_{E}$ | history-dressed energy/action conservation on the retained branch |
| $\mathcal{R}_{\mathrm{top}}$ | topological carrier and framed-wake consistency |
| $\mathcal{R}_{\mathrm{exposure}}$ | exposure quotient and Noether sea medium-response extraction |
| $\mathcal{R}_{\mathrm{Lorentz}}$ | moving-branch clock/ruler/signal export residuals |
| $\mathcal{R}_{\mathrm{event}}$ | event ledger for $E$, $\mathbf{p}$, $\mathbf{J}$, $Q$, recoil, and medium update |

No observer-level claim follows from a residual row marked `not_computed`.

---

## 7. Failure Modes

The failure-code vocabulary must match the architecture draft exactly:

| Failure code | Trigger |
| --- | --- |
| `inventory-mismatch` | integer charge ledger fails the declared branch type |
| `projection-collision` | projected Euclidean paths violate $d_{\min}>\epsilon_x$ |
| `phase-lock-drift` | phase-offset or winding residual exceeds tolerance |
| `root-ledger-empty` | required partner, self, or cross-binary roots are absent |
| `jacobian-floor-violation` | $J_{\min}\le\epsilon_J$ |
| `near-zero-self-root-unresolved` | tangent or near-zero same-source roots lack a retained or regularized status |
| `tangential-residual-open` | fixed-speed branch has nonzero tangential force residual |
| `speed-ode-solvability-open` | bounded-speed branch has not closed the scalar speed-ODE rows |
| `nhim-domination-fail` | Lyapunov spectrum fails the declared stability or SRB target |
| `energy-ledger-open` | $E_{\mathrm{hist}}$ is not conserved within tolerance |
| `exposure-quotient-open` | mass/exposure rows change under branch or extraction refinement |
| `lorentz-export-overclaim` | clock/ruler/signal rows are asserted without passing observer-export residuals |
| `color-connection-missing` | $\mathcal{S}_3$ color slots are promoted without a continuous connection target |
| `strong-field-continuation-open` | finite-boundary continuation is not supplied for strong-field claims |

These codes are certificate stops, not prose warnings. A retained shell braid branch packet must either pass the associated residual row, mark the row `not_computed` without promotion, or reject the branch.

---

## 8. Closure Position

The shell braid branch mathematics program has four immediate theorem targets:

1. A finite-memory proof from bounded support and center-gauge drift.
2. A causal-root continuation proof with explicit Jacobian floors.
3. A regularized DDE well-posedness proof for each declared $\eta>0$ force law.
4. A weak-limit packet showing that $\eta\to0$ preserves the causal-root ledger, event ledger, and residual vector.

Until those objects are populated by a concrete retained branch, the same-level braid architecture remains an active theorem-target program rather than a canonical replacement for the nested branch machinery.
