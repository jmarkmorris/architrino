# Same-Level Branch Mathematics

This priority packet states theorem targets for same-level tri-binary branch mathematics. It is not a completed existence, stability, or observer-export proof. Its role is to make the DDE well-posedness and causal-root ledger obligations precise enough that a retained branch certificate can later be checked against [swarm-architecture.md](swarm-architecture.md).

Promotion status: `priority-only`. Do not promote this document into `content/markdown/aaa` until a concrete same-level branch supplies the active causal roots, Jacobian floors, finite memory depth, tangential residual closure, polarity ledger, and weak-limit data required below.

---

## 1. Absolute-Timespace Branch Chart

Work on absolute timespace

$$
\mathcal{M}=\mathbb{R}\times\mathbb{R}^3,
\qquad
\Sigma_t=\{t\}\times\mathbb{R}^3,
\qquad
h_{ij}=\delta_{ij},
$$

with absolute time $t$, Euclidean void slices $\Sigma_t$, and primitive causal-wake speed $c_f>0$. A same-level branch chart over a compact window $W=[t_-,t_+]$ consists of $N$ architrino worldlines

$$
\mathbf{x}_i: [t_- - h,t_+]\to\mathbb{R}^3,
\qquad
\mathbf{v}_i(t)=\dot{\mathbf{x}}_i(t),
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
X(t)=
\left(
(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)_{i=1}^N,
\mathbf{C}(t),\dot{\mathbf{C}}(t),
R(t),\delta(t),
\mathcal{I},
\Phi(t),
\mathcal{K}
\right),
$$

where $\mathbf{C}$ is the center gauge, $R\pm\delta$ is the declared radial-sector support band, $\mathcal{I}$ is the central inventory and polarity ledger, $\Phi$ records phase offsets and winding rows, and $\mathcal{K}$ records the topological carrier and framed-wake data.

Plain language: the chart describes architrinos moving in one Euclidean void on one absolute clock, with same-level geometry recorded relative to a declared center and support descriptor. The radial support band is the default sector row, not a spherical-path assumption.

---

## 2. Admissible History Space

For memory depth $h>0$, define the history segment at time $t$ by

$$
X_t(\theta)=X(t+\theta),
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
\mathbf{y}_i(t)=\mathbf{x}_i(t)-\mathbf{C}(t),
\qquad
\mathbf{u}_i(t)=\dot{\mathbf{y}}_i(t).
$$

A branch certificate must declare weights $\omega_i>0$ with $\sum_i\omega_i=1$ and impose the center gauge

$$
\sum_{i=1}^N\omega_i\mathbf{y}_i(t)=\mathbf{0},
\qquad
\sum_{i=1}^N\omega_i\mathbf{u}_i(t)=\mathbf{0}.
$$

This removes translational gauge motion from the branch chart. Moving-assembly exports may reintroduce $\dot{\mathbf{C}}\ne\mathbf{0}$, but the branch-existence row is first checked in the center-gauge chart.

### 2.2 Support Band And Noncollision

The same-level condition is not a nested-radius hierarchy. In the radial same-level sector, a sufficient support certificate is the common support-band condition

$$
0<R_-\le R(t)-\delta(t),
\qquad
R(t)+\delta(t)\le R_+<\infty,
$$

and

$$
R(t)-\delta(t)
\le
\|\mathbf{y}_i(t)\|
\le
R(t)+\delta(t)
\qquad
\text{for every }i\text{ and }t\in W.
$$

More general hybrid sectors may replace this radial norm band by a declared support descriptor with equivalent lower/upper support margins, as in [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md). The radial row above should therefore be read as a sector certificate, not as a spherical path assumption.

Noncollision is an independent Euclidean gate:

$$
d_{\min}
=
\inf_{i\ne j,\ t\in W}
\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|
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
\mathcal{A}_{ij}(t)
=
\left\{
s<t:
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|
=c_f(t-s)
\right\}.
$$

The retained causal-root ledger is

$$
\mathcal{A}(t)
=
\left\{
(i,j,\alpha,s_{ij}^{\alpha}(t),\tau_{ij}^{\alpha}(t),J_{ij}^{\alpha}(t),\chi_{ij}^{\alpha})
\right\},
$$

where $\alpha$ labels the retained root, $\tau_{ij}^{\alpha}(t)=t-s_{ij}^{\alpha}(t)$, and $\chi_{ij}^{\alpha}$ is one of

| Root status | Meaning |
| --- | --- |
| `absent-by-policy` | ordinary same-source roots are excluded from the branch force ledger |
| `regularized-fold-layer` | a controlled $\eta>0$ fold-layer rule replaces the singular ideal root |
| `split-source-retained` | a distinct resolved source representative supplies its own positive-delay root and Jacobian floor |
| `reject` | the branch has unresolved tangent or near-zero self-root behavior |

For

$$
\mathbf{r}_{ij}(t,s)=\mathbf{x}_i(t)-\mathbf{x}_j(s),
\qquad
r_{ij}(t,s)=\|\mathbf{r}_{ij}(t,s)\|,
\qquad
\hat{\mathbf{r}}_{ij}(t,s)=\frac{\mathbf{r}_{ij}(t,s)}{r_{ij}(t,s)},
$$

the branch Jacobian is

$$
J_{ij}(t,s)
=
1-
\frac{\mathbf{v}_j(s)\cdot\hat{\mathbf{r}}_{ij}(t,s)}{c_f}.
$$

Equivalently, for

$$
G_{ij}(t,s)=r_{ij}(t,s)-c_f(t-s),
$$

one has

$$
\frac{\partial G_{ij}}{\partial s}(t,s)=c_fJ_{ij}(t,s).
$$

The transversality target is therefore

$$
J_{\min}
=
\inf_{(i,j,\alpha,t)\in\mathcal{A}}
\left|J_{ij}^{\alpha}(t)\right|
>
\epsilon_J
>
0,
$$

together with finite root count $|\mathcal{A}(t)|<\infty$ for every $t\in W$.

---

## 4. Fixed-Speed Carrier And Tangential Closure

The ideal same-level carrier constraint is

$$
\|\mathbf{u}_i(t)\|=c_f
\qquad
\text{for every active carrier row}.
$$

The speed residual is the architecture residual

$$
\mathcal{R}_{\mathrm{speed},i}(t)
=
\|\mathbf{u}_i(t)\|-c_f.
$$

For a retained root, write the line-of-action causal-wake contribution as

$$
\mathbf{F}_{ij}(t,s)
=
\kappa\,\mathrm{sign}(q_iq_j)
\frac{|q_iq_j|}
{r_{ij}^2(t,s)\,|J_{ij}(t,s)|}
\hat{\mathbf{r}}_{ij}(t,s),
$$

using the same active root convention as the causal-root ledger. The fixed-speed tangential closure residual is

$$
\mathcal{R}_{\mathrm{tan},i}(t)
=
\mathbf{u}_i(t)\cdot
\left[
\sum_{(j,\alpha)\in\mathcal{A}_i(t)}
\mathbf{F}_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)
-
\ddot{\mathbf{C}}(t)
\right].
$$

In the center-gauge branch-existence chart with $\ddot{\mathbf{C}}=\mathbf{0}$, this reduces to the uncorrected sum of retained causal-wake forces. Moving-branch exports must keep the center-acceleration term.

A branch with $\mathcal{R}_{\mathrm{speed}}=0$ but $\mathcal{R}_{\mathrm{tan}}\ne0$ has not closed the carrier. The tangential residual is the theorem-target replacement for assuming that same-level $c_f$ motion automatically stays on a closed choreography.

If the branch declares a bounded speed factor, this fixed-speed tangent row is replaced by the speed-ODE solvability row and the bounded-speed normal row; nonzero tangent force is allowed only when it produces a closed, band-limited $\nu_i$ on the same root/action ledger.

---

## 5. Lemma Targets For Branch Mathematics

The statements below are theorem targets for a future retained branch packet. They identify what a proof must establish; they do not assert that any same-level tri-binary branch has already satisfied the hypotheses.

### Lemma Target 1: Finite Memory From Bounded Support

Assume the support band is bounded by $R_+$, and the center gauge has drift bound

$$
\|\dot{\mathbf{C}}(t)\|\le V_C<c_f
\qquad
\text{on }[t_- - h,t_+].
$$

Then any active causal root satisfies

$$
\tau_{ij}^{\alpha}(t)
=
t-s_{ij}^{\alpha}(t)
\le
\frac{2R_+}{c_f-V_C}.
$$

In the center-gauge branch-existence chart with $\dot{\mathbf{C}}=\mathbf{0}$, this reduces to

$$
h_{\mathrm{mem}}
\le
\frac{2R_+}{c_f}.
$$

Proof route: combine the root condition $c_f(t-s)=\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|$ with

$$
\|\mathbf{x}_i(t)-\mathbf{x}_j(s)\|
\le
\|\mathbf{C}(t)-\mathbf{C}(s)\|+2R_+
\le
V_C(t-s)+2R_+.
$$

Remaining obligation: exclude unresolved near-zero self roots by assigning every same-source row one of the statuses in Section 3. The ordinary same-curve arclength row is constrained by [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md): it cannot be retained as a positive-delay Jacobian-regular root.

### Proposition Target 2: Root Continuation By The Implicit Function Theorem

Suppose $G_{ij}(t_*,s_*)=0$ and

$$
|J_{ij}(t_*,s_*)|>\epsilon_J.
$$

Then a retained proof should show that there are neighborhoods $U\ni t_*$ and $V\ni s_*$ and a unique $C^1$ function $s_{ij}^{\alpha}:U\to V$ such that

$$
G_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)=0.
$$

The continuation derivative is

$$
\frac{d s_{ij}^{\alpha}}{dt}
=
\frac{
c_f-\mathbf{v}_i(t)\cdot\hat{\mathbf{r}}_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)
}{
c_f-\mathbf{v}_j\!\left(s_{ij}^{\alpha}(t)\right)
\cdot
\hat{\mathbf{r}}_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)
}.
$$

The causal-root ledger can retain the same root label $\alpha$ only until one of the following occurs: the root exits the memory window, $J_{ij}$ reaches the Jacobian floor, a collision gate fails, a near-zero self root becomes unresolved, or the branch exits the declared support descriptor.

### Proposition Target 3: Regularized DDE Well-Posedness For $\eta>0$

For $\eta>0$, let the mollified causal-wake force define a causal-history functional

$$
\frac{dX}{dt}
=
\mathfrak{F}_{\eta}(X_t),
\qquad
X_t\in\mathscr{H}_{h,\eta}^{N},
$$

where all causal-surface factors use the same $\delta_\eta$ convention, the inverse-square factor is evaluated only on histories satisfying $d_{\min}>\epsilon_x$, and the center gauge is either eliminated or enforced by a smooth projection onto the gauge slice.

The proof target is:

If $\mathfrak{F}_{\eta}$ is locally Lipschitz on an admissible history neighborhood and the initial history lies in $\mathscr{H}_{h,\eta}^{N}$, then the regularized DDE has a unique local solution depending continuously on the initial history. The solution can be continued until one of the certificate bounds fails:

$$
d_{\min}>\epsilon_x,
\qquad
R(t)+\delta(t)\le R_+,
\qquad
J_{\min}>\epsilon_J,
\qquad
|\mathcal{A}(t)|<\infty,
$$

or until the chosen $\eta>0$ fold-layer rule changes status.

This row proves only regularized evolution. It does not prove an exact fixed-speed carrier, a stable branch, a Noether-Sea response row, or an observer-export result.

### Proposition Target 4: Weak-Limit Obligations As $\eta\to0$

A same-level branch certificate may take $\eta\to0$ only after the following weak-limit obligations are recorded on the same retained branch:

1. Uniform noncollision:

   $$
   \inf_{\eta,t,i\ne j}
   \|\mathbf{x}_{i,\eta}(t)-\mathbf{x}_{j,\eta}(t)\|
   >
   \epsilon_x.
   $$

2. Uniform root control:

   $$
   \inf_{\eta,(i,j,\alpha,t)}
   |J_{ij,\eta}^{\alpha}(t)|
   >
   \epsilon_J,
   \qquad
   \sup_{\eta,t}|\mathcal{A}_{\eta}(t)|<\infty,
   \qquad
   \sup_{\eta}h_{\mathrm{mem},\eta}<\infty.
   $$

3. Distributional force convergence: for every smooth compactly supported test function $\psi(t)$,

   $$
   \lim_{\eta\to0}
   \int_W
   \psi(t)\mathbf{F}_{i,\eta}(t)\,dt
   =
   \int_W
   \psi(t)
   \sum_{(j,\alpha)\in\mathcal{A}_i(t)}
   \mathbf{F}_{ij}\!\left(t,s_{ij}^{\alpha}(t)\right)
   dt.
   $$

4. Residual convergence on the retained row:

   $$
   \mathcal{R}_{\mathrm{tri},\eta}
   \longrightarrow
   \mathcal{R}_{\mathrm{tri},0}
   \quad
   \text{in the declared residual norms}.
   $$

5. Event-ledger convergence for energy, momentum, angular momentum, charge provenance, recoil, and Noether Sea medium update.

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
| $\mathcal{R}_{\mathrm{exposure}}$ | exposure quotient and Noether-Sea medium-response extraction |
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

These codes are certificate stops, not prose warnings. A retained same-level branch packet must either pass the associated residual row, mark the row `not_computed` without promotion, or reject the branch.

---

## 8. Closure Position

The same-level branch mathematics program has four immediate theorem targets:

1. A finite-memory proof from bounded support and center-gauge drift.
2. A causal-root continuation proof with explicit Jacobian floors.
3. A regularized DDE well-posedness proof for each declared $\eta>0$ force law.
4. A weak-limit packet showing that $\eta\to0$ preserves the causal-root ledger, event ledger, and residual vector.

Until those objects are populated by a concrete retained branch, the same-level tri-binary architecture remains an active theorem-target program rather than a canonical replacement for the nested branch machinery.
