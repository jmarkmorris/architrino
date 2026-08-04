# FSC-018 — Uniform-Translation Spatial Receiver-Measure Limit

## Status and answer

- Claim grade: `derived exact boundary-measure theorem`.
- Scope: one eternally and uniformly translating labeled transmitter, one
  fixed translation direction, $0\leq\beta<1$, and the canonical
  inverse-square causal-surface kernel in normalized units $c_f=1$.
- Topology: local total variation of vector-valued spatial Radon measures;
  therefore also weak convergence against every smooth compactly supported
  test function.
- Result: as $\beta\uparrow1$, the complete source-provenanced spatial receiver
  measure has a locally finite limit independent of the chosen sequence of
  speeds. The limit is exactly the known ordinary measure on the strict
  trailing half-space. Its singular residual is the zero measure. Because the
  source history is eternal, the measure has infinite total variation over all
  of $\mathbb R^3$; the finite statement is on compact receiver regions and
  against compactly supported tests.

Plainly: for this declared straight-path family, the leading root pile-up does
not leave a hidden point or plane measure. The complete boundary measure is the
ordinary trailing measure, although the pointwise ordinary formula remains
undefined at the source itself.

## 1. Type of the measure

The core mathematics packet defines an ordinary receiver measure in source
time at one fixed receiver event. This theorem forms the corresponding
**spatial family of receiver measures at one fixed absolute time** and keeps
the transmitter label and emission age in its carrier before taking the
spatial marginal. It does not replace or retype the fixed-receiver object.

Fix a reception time $T$, put the transmitter's current position at the
origin, and let $\mathbf e$ be its unit translation direction. For
$0\leq\beta<1$, prescribe the all-past path

$$
\mathbf X_\beta(T-\tau)=-\beta\tau\mathbf e,
\qquad
\tau>0.
$$

The factor for ordered receiver channel $i\leftarrow j$ is

$$
\Gamma_{ij}=\kappa\,\sigma_{ji}|q_jq_i|.
$$

For emission age $\tau$ and propagation direction
$\boldsymbol\omega\in\mathbb S^2$, define the arrival map

$$
\Phi_\beta(\tau,\boldsymbol\omega)
=
\tau(\boldsymbol\omega-\beta\mathbf e).
$$

The lifted, source-provenanced vector measure is

$$
\left\langle
\widetilde{\boldsymbol{\mathsf M}}_{ij}^{\beta},
\Psi
\right\rangle
=
\Gamma_{ij}
\int_0^\infty\!\int_{\mathbb S^2}
\boldsymbol\omega\,
\Psi\!\left(T-\tau,\Phi_\beta(\tau,\boldsymbol\omega)\right)
\,d\Omega\,d\tau.
$$

Its spatial marginal is the vector-valued Radon measure
$\boldsymbol{\mathsf M}_{ij}^{\beta}$ defined, for
$\varphi\in C_c^\infty(\mathbb R^3)$, by

$$
\boxed{
\left\langle
\boldsymbol{\mathsf M}_{ij}^{\beta},\varphi
\right\rangle
=
\Gamma_{ij}
\int_0^\infty\!\int_{\mathbb S^2}
\boldsymbol\omega\,
\varphi\!\left(\Phi_\beta(\tau,\boldsymbol\omega)\right)
\,d\Omega\,d\tau
}.
$$

Both objects contain only positive-delay receiver contributions. The nonzero
point-emission measure $\mathsf E_{j,T}$ at $\tau=0$ remains a separately typed
source object and is not added to receiver acceleration by this construction.

The measure $d\Omega$ is not a new emission law. It is the ordinary spherical
area element that appears when the canonical spatial delta integral is put in
polar coordinates around each emission site. Indeed,

$$
\begin{aligned}
\left\langle
\boldsymbol{\mathsf M}_{ij}^{\beta},\varphi
\right\rangle
&=
\Gamma_{ij}
\int_{\mathbb R^3}\!\int_0^\infty
\varphi(\mathbf y)
\frac{\widehat{\mathbf r}_\beta}{r_\beta^2}
\delta(r_\beta-\tau)
\,d\tau\,d^3\mathbf y,
\\
\mathbf r_\beta
&=\mathbf y+\beta\tau\mathbf e,
\qquad
r_\beta=\|\mathbf r_\beta\|,
\qquad
\widehat{\mathbf r}_\beta=\frac{\mathbf r_\beta}{r_\beta}.
\end{aligned}
$$

The radial factor $r^2$ in $d^3\mathbf y=r^2dr\,d\Omega$ cancels the
canonical inverse-square factor, and the radial delta sets $r=\tau$. This
gives the boxed pushforward formula exactly.

Plainly: every emission time and every point on its spherical wakefront is
included once after emission. Source time is retained in the lifted record,
while the spatial marginal answers what complete receiver measure is present
around the moving source at time $T$. The current source delta is preserved in
its own ledger and is not silently retyped as a receiver row.

## 2. Equivalence with the ordinary ledger for $\beta<1$

Write

$$
u=\mathbf y\cdot\mathbf e,
\qquad
\mathbf z=\mathbf y-u\mathbf e,
\qquad
\rho=\|\mathbf y\|,
$$

and define

$$
\lambda_\beta
=
\sqrt{u^2+(1-\beta^2)\|\mathbf z\|^2}.
$$

For $\mathbf y\ne\mathbf0$ and $0\leq\beta<1$, the causal equation has the
unique positive emission age

$$
\tau_\beta
=
\frac{\beta u+\lambda_\beta}{1-\beta^2}
=
\frac{\rho^2}{\lambda_\beta-\beta u}.
$$

At that root,

$$
\boldsymbol\omega_\beta
=
\frac{\mathbf y}{\tau_\beta}+\beta\mathbf e,
\qquad
D_{t,\beta}
=
1-\beta\boldsymbol\omega_\beta\cdot\mathbf e
=
\frac{\lambda_\beta}{\tau_\beta}>0.
$$

The arrival map has Jacobian

$$
\left|\det D\Phi_\beta\right|
=
\tau^2(1-\beta\boldsymbol\omega\cdot\mathbf e).
$$

It is therefore one-to-one away from the source and gives the ordinary-ledger
density

$$
\boxed{
d\boldsymbol{\mathsf M}_{ij}^{\beta}(\mathbf y)
=
\Gamma_{ij}
\frac{\boldsymbol\omega_\beta(\mathbf y)}
{\tau_\beta(\mathbf y)\lambda_\beta(\mathbf y)}
\,d^3\mathbf y
=
\Gamma_{ij}
\frac{\boldsymbol\omega_\beta(\mathbf y)}
{\tau_\beta(\mathbf y)^2D_{t,\beta}(\mathbf y)}
\,d^3\mathbf y
}.
$$

Thus the pre-collapse source-provenanced measure and the canonical isolated-
root row agree exactly at every ordinary point for $\beta<1$.

Plainly: this is not a regulator that changes individual wakes. It is the same
canonical row written before and after the ordinary coarea collapse.

## 3. Exact-speed candidate

Set $\beta=1$ in the arrival map:

$$
\Phi_1(\tau,\boldsymbol\omega)
=
\tau(\boldsymbol\omega-\mathbf e).
$$

If $u<0$, there is one ordinary root,

$$
\tau_1=-\frac{\rho^2}{2u},
\qquad
D_{t,1}=-\frac{u}{\tau_1}>0,
\qquad
\boldsymbol\omega_1
=
\mathbf e-\frac{2u\mathbf y}{\rho^2}.
$$

The resulting ordinary trailing measure is

$$
\boxed{
d\boldsymbol{\mathsf M}_{ij}^{\mathrm{trail}}(\mathbf y)
=
2\Gamma_{ij}
\frac{\boldsymbol\omega_1(\mathbf y)}{\rho^2}
\mathbf1_{\{u<0\}}
\,d^3\mathbf y
}.
$$

The strict leading half-space and the off-source transverse plane $u=0$ have
no positive causal root. The only remaining boundary fibre is

$$
(0,\infty)\times\{\mathbf e\},
$$

which maps entirely to the current source point $\mathbf y=\mathbf0$. It has
zero $d\tau\,d\Omega$ measure because the single direction
$\{\mathbf e\}$ has zero spherical area. Hence the exact pushforward creates
no source-point atom.

Plainly: infinitely many emission ages share the source point, but they occupy
only one propagation direction. Root multiplicity alone is not receiver
measure; the complete carrier assigns that fibre zero measure.

## 4. Local total-variation limit

First keep source provenance. For every
$\Psi\in C_c^\infty((-\infty,T)\times\mathbb R^3)$, compact support in the
source-time coordinate confines $\tau$ to a bounded interval. The arrival maps
$\Phi_\beta$ converge uniformly to $\Phi_1$ on that interval crossed with
$\mathbb S^2$, so dominated convergence gives

$$
\widetilde{\boldsymbol{\mathsf M}}_{ij}^{\beta}
\rightharpoonup
\widetilde{\boldsymbol{\mathsf M}}_{ij}^{1}
$$

against every such smooth test. The limiting lifted measure is the direct
$\beta=1$ pushforward. Its nonordinary fibre has zero carrier measure, so the
lifted limit has no additional source-point component.

Plainly: keeping emission time in the record does not create a hidden event
measure. Every bounded source-time window converges directly, including its
source label and propagation direction.

The spatial marginal requires an additional all-past estimate because a
compact receiver region can be reached from arbitrarily old emissions when
$\beta$ is close to one. Remove the bounded direction vector and the channel
coefficient to define the nonnegative scalar envelope

$$
d\mathsf N_\beta(\mathbf y)
=
I_\beta(\mathbf y)\,d^3\mathbf y,
\qquad
I_\beta=\frac{1}{\tau_\beta\lambda_\beta}
\quad(\beta<1).
$$

For the source-centered ball $B_R$, the pushforward formula gives

$$
\begin{aligned}
\mathsf N_\beta(B_R)
&=
\int_{\mathbb S^2}
\int_0^{R/\|\boldsymbol\omega-\beta\mathbf e\|}
d\tau\,d\Omega
\\
&=
R\int_{\mathbb S^2}
\frac{d\Omega}{\|\boldsymbol\omega-\beta\mathbf e\|}
=4\pi R,
\qquad 0\leq\beta\leq1.
\end{aligned}
$$

For $0<\beta\leq1$, the angular integral is

$$
2\pi\int_{-1}^{1}
\frac{dt}{\sqrt{1+\beta^2-2\beta t}}
=
\frac{2\pi}{\beta}
\big((1+\beta)-|1-\beta|\big)
=4\pi,
$$

and the $\beta=0$ value follows directly.

For almost every $\mathbf y$,

$$
I_\beta(\mathbf y)
\longrightarrow
I_1(\mathbf y)
=
\frac{2}{\rho^2}\mathbf1_{\{u<0\}}.
$$

The transverse plane $u=0$ is the only off-source set where pointwise
convergence to the exact ordinary chart need not hold, and that plane has
three-dimensional Lebesgue measure zero. Moreover,

$$
\int_{B_R} I_\beta\,d^3\mathbf y
=
4\pi R
=
\int_{B_R} I_1\,d^3\mathbf y.
$$

Scheffé's lemma therefore gives

$$
\|I_\beta-I_1\|_{L^1(B_R)}\longrightarrow0.
$$

Since $\|\boldsymbol\omega_\beta\|=1$ and
$\boldsymbol\omega_\beta\to\boldsymbol\omega_1$ almost everywhere on
$u<0$, the estimate

$$
\begin{aligned}
&\left\|
\boldsymbol{\mathsf M}_{ij}^{\beta}
-
\boldsymbol{\mathsf M}_{ij}^{\mathrm{trail}}
\right\|_{\mathrm{TV}(B_R)}
\\
&\qquad\leq
|\Gamma_{ij}|
\left(
\|I_\beta-I_1\|_{L^1(B_R)}
+
\int_{B_R}I_1
\|\boldsymbol\omega_\beta-\boldsymbol\omega_1\|
\,d^3\mathbf y
\right)
\end{aligned}
$$

and dominated convergence yield

$$
\left\|
\boldsymbol{\mathsf M}_{ij}^{\beta}
-
\boldsymbol{\mathsf M}_{ij}^{\mathrm{trail}}
\right\|_{\mathrm{TV}(B_R)}
\longrightarrow0.
$$

Because every compact subset of $\mathbb R^3$ lies in some $B_R$, the
convergence holds in local total variation. In particular, for every
$\varphi\in C_c^\infty(\mathbb R^3)$,

$$
\lim_{\beta\uparrow1}
\left\langle
\boldsymbol{\mathsf M}_{ij}^{\beta},\varphi
\right\rangle
=
\left\langle
\boldsymbol{\mathsf M}_{ij}^{\mathrm{trail}},\varphi
\right\rangle.
$$

This proof holds for every sequence $\beta_n\uparrow1$ and therefore makes the
limit approximation-independent within the declared family of uniform
straight translations with the fixed all-past source measure.

Plainly: the thin forward region does not hide mass. Its shrinking angular
width exactly offsets its long lookback time, while the total local mass stays
$4\pi R$ and moves into the ordinary trailing density.

## 5. Decomposition and closure verdict

Define the possible singular residual by

$$
\boldsymbol{\mathsf S}_{ij}
=
\underset{\beta\uparrow1}{\operatorname{lim}}
\boldsymbol{\mathsf M}_{ij}^{\beta}
-
\boldsymbol{\mathsf M}_{ij}^{\mathrm{trail}}.
$$

The local total-variation theorem proves

$$
\boxed{
\boldsymbol{\mathsf S}_{ij}=\mathbf0
}.
$$

Therefore the direct exact-speed trailing geometry is the complete boundary
object for this canonical three-dimensional spatial receiver measure. There
is no additional plane-supported, line-supported, or source-point Radon
measure.

This result is dimension-sensitive. The density $2/\rho^2$ is locally
integrable in three dimensions, but its restriction as an area density on a
two-dimensional display plane is not locally integrable at the source. The
Topo plane is a diagnostic slice of the three-dimensional density, not the
measure used in this theorem.

Plainly: the result closes the straight, eternal, uniform-speed boundary test.
It does not turn the source point into an ordinary receiver sample, and it does
not supply any missing contact-event or continuation rule.

## 6. Claim boundary and falsifiers

This theorem does not:

- adopt a path-speed ceiling or apply the proposed constrained response;
- assign self-action or partner action at the current source point;
- define a pointwise value on the degenerate source fibre;
- resolve the mirror-coincidence receiver-time measure, an outgoing history,
  or any nonordinary contact;
- prove the same limit for accelerated or otherwise nonuniform paths;
- cover a $\beta$-dependent retained-history cutoff, source weight, angular
  weight, or altered wake kernel; or
- import the plane-supported Maxwell limit from the Azzurli--Lechner
  comparison.

The result is falsified within its declared scope by any of the following:

1. a failure of the pushforward measure to reproduce the canonical simple-root
   density for some $\beta<1$;
2. a source-centered ball for which the complete scalar-envelope mass differs
   from $4\pi R$;
3. a smooth compactly supported test function and two sequences
   $\beta_n\uparrow1$ giving different limits;
4. a nonzero weak residual after subtraction of the displayed trailing
   measure; or
5. a proof that the canonical inverse-square spatial delta integral carries an
   additional source or angular measure not present in the Master Equation.

Plainly: changing the history class or the source measure would be a different
theorem. No such change is needed, or licensed, for the exact uniform-path
result proved here.

Closure goal: treat the exact-speed trailing measure as the complete weak-limit
boundary object for the declared uniform-translation spatial test, while
keeping point receiver events and nonuniform/contact limits as separate open
problems.
