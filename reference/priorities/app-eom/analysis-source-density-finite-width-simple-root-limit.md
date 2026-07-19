# Source-Density Finite-Width Equation and Simple-Root Limit

## Status

- Purpose: first mathematical promotion check for the proposed Master Equation
- Scope: finite-width emission and ordinary simple roots only
- Standing: priority analysis; not canon and not an EOM solver specification
- Current binding: unchanged; this document does not amend the receiver-weighted binding

## Result in plain language

If a transmitter emits wake uniformly through its own history, the finite-width wake equation reduces at an ordinary causal hit to the proposed factor $c_f/|D_t|$. The receiver's velocity does not enter that acceleration factor. It enters only when the causal hit is followed from one reception time to the next.

This is a mathematical result conditional on the chosen uniform emission measure. It does not establish that nature uses that measure, and it does not resolve folds, coincident endpoints, or conservation.

Claim classification: **derived**. The derivation uses only the delayed wake geometry, a normalized finite-width profile, and a change of variables. It imports no observer-level dynamics law or spacetime premise.

## 1. Causal geometry

For receiver $r$ at reception time $T_r$ and transmitter $t$ at emission time $T_t<T_r$, define

$$
\mathbf r_t(T_r,T_t)
=
\mathbf X_r(T_r)-\mathbf X_t(T_t),
\qquad
r=\|\mathbf r_t\|,
$$

and

$$
g(T_r,T_t)
=
r-c_f(T_r-T_t).
$$

A causal hit is a root $g(T_r,T_t)=0$. Differentiation at fixed $T_r$ gives

$$
\frac{\partial g}{\partial T_t}
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)
=D_t.
$$

Therefore $D_t$ measures how rapidly causal-surface distance changes as emission time moves through transmitter history. A simple root has $D_t\ne0$.

## 2. Proposed finite-width equation

Let $\delta_\eta(u)$ be a nonnegative, normalized wake profile of width $\eta>0$ measured in distance:

$$
\int_{-\infty}^{\infty}\delta_\eta(u)\,du=1,
\qquad
\delta_\eta(u)\longrightarrow\delta(u)
\quad\text{as}\quad\eta\to0^+.
$$

Let the finite core kernel be

$$
\mathbf K_{\epsilon_c}(\mathbf r)
=
\frac{\mathbf r}{(r^2+\epsilon_c^2)^{3/2}},
\qquad
\epsilon_c>0.
$$

For retained history length $h$, the proposed finite-width acceleration from transmitter $t$ to receiver $r$ is

$$
\boxed{
\mathbf A_{r\leftarrow t}^{(\eta,\epsilon_c)}(T_r)
=
\kappa\,\sigma_{tr}|q_tq_r|
\int_{T_r-h}^{T_r}
c_f\,
\mathbf K_{\epsilon_c}\!\left(\mathbf r_t(T_r,T_t)\right)
\delta_\eta\!\left(g(T_r,T_t)\right)
\,dT_t
}.
$$

The factor $c_f$ normalizes the emission measure. Since $\delta_\eta$ has units of inverse distance, $c_f\delta_\eta(g)dT_t$ is dimensionless. For a stationary transmitter, $D_t=c_f$, so the sharp causal-hit weight becomes one.

The equation consumes the receiver's current position at $T_r$ and the transmitter's retained positions at $T_t<T_r$. It does not consume the transmitter's present position. Receiver velocity is absent from the acceleration integrand.

## 3. Simple-root theorem

Fix $T_r$. Assume the retained interval contains finitely many causal roots $T_{t,\ell}$ and that:

1. every root lies strictly inside the retained interval;
2. every root is simple, with $|D_t(T_r,T_{t,\ell})|\ge\nu_t>0$;
3. the roots have disjoint neighborhoods and the remaining interval has a positive causal-residual gap;
4. $r\ge r_{\min}>0$ near every root;
5. the retained histories and kernel are continuous near the roots.

Then the normalized finite-width profile collapses onto the roots as $\eta\to0^+$:

$$
\begin{aligned}
\lim_{\eta\to0^+}
\mathbf A_{r\leftarrow t}^{(\eta,\epsilon_c)}(T_r)
&=
\kappa\,\sigma_{tr}|q_tq_r|
\sum_\ell
\mathbf K_{\epsilon_c}\!\left(
\mathbf r_t(T_r,T_{t,\ell})
\right)
\frac{c_f}{|D_t(T_r,T_{t,\ell})|}.
\end{aligned}
$$

If the core scale is then removed while $r_{\min}>0$, this becomes

$$
\boxed{
\lim_{\epsilon_c\to0^+}
\lim_{\eta\to0^+}
\mathbf A_{r\leftarrow t}^{(\eta,\epsilon_c)}(T_r)
=
\kappa\,\sigma_{tr}|q_tq_r|
\sum_\ell
\frac{1}{r_\ell^2}
\frac{c_f}{|D_{t,\ell}|}
\hat{\mathbf r}_{t,\ell}
}.
$$

### Proof

In a neighborhood of simple root $T_{t,\ell}$, use $u=g(T_r,T_t)$ as the integration variable. The inverse-function theorem applies because $D_t=\partial g/\partial T_t$ is nonzero there, and

$$
dT_t
=
\frac{du}{D_t}.
$$

Reversing the integration bounds when $D_t<0$ supplies the absolute value. The root neighborhood therefore contributes

$$
\int
c_f\,
\mathbf K_{\epsilon_c}(\mathbf r_t)
\delta_\eta(g)
\,dT_t
=
\int
c_f\,
\frac{
\mathbf K_{\epsilon_c}(\mathbf r_t(T_r,T_t(u)))
}{|D_t(T_r,T_t(u))|}
\delta_\eta(u)
\,du.
$$

As $\eta\to0^+$, normalization and continuity evaluate the smooth factor at $u=0$, giving $c_f\mathbf K_{\epsilon_c}(\mathbf r_{t,\ell})/|D_{t,\ell}|$. The positive residual gap makes the contribution away from all root neighborhoods vanish. Summing the finitely many roots proves the first limit.

For $r_\ell>0$,

$$
\lim_{\epsilon_c\to0^+}
\mathbf K_{\epsilon_c}(\mathbf r_{t,\ell})
=
\frac{\mathbf r_{t,\ell}}{r_\ell^3}
=
\frac{\hat{\mathbf r}_{t,\ell}}{r_\ell^2},
$$

which proves the sharp equation.

Claim classification: **derived**. This result is false if the change of variables produces any Jacobian other than $1/|D_t|$, or if direct evaluation of a simple-root example fails to approach the displayed sharp limit as both widths decrease.

## 4. Exact stationary check

Take a stationary transmitter and receiver with fixed separation vector $\mathbf r$, where $0<r<c_fh$. There is one root,

$$
T_t=T_r-\frac{r}{c_f},
\qquad
D_t=c_f,
$$

and the spatial kernel is constant over emission time. For the Gaussian profile

$$
\delta_\eta(u)
=
\frac{1}{\sqrt{2\pi}\eta}
\exp\!\left(-\frac{u^2}{2\eta^2}\right),
$$

direct integration gives

$$
\mathbf A_{r\leftarrow t}^{(\eta,\epsilon_c)}
=
\kappa\,\sigma_{tr}|q_tq_r|
\mathbf K_{\epsilon_c}(\mathbf r)
\left[
\Phi\!\left(\frac{r}{\eta}\right)
-
\Phi\!\left(\frac{r-c_fh}{\eta}\right)
\right],
$$

where $\Phi$ is the standard normal cumulative distribution. The bracket tends to one as $\eta\to0^+$, and the core kernel tends to $\hat{\mathbf r}/r^2$ as $\epsilon_c\to0^+$. This checks the $c_f$ normalization. It cannot distinguish the proposed equation from the receiver-weighted equation because a stationary receiver has $D_r=c_f$.

Claim classification: **derived analytic check**. Direct integration that differs from the displayed expression would overturn it.

## 5. Why the receiver factor is a different law

If $c_f$ in the finite-width equation were replaced by $|D_r|$, the same simple-root calculation would give

$$
\left|\frac{D_r}{D_t}\right|.
$$

That receiver-weighted equation is mathematically consistent as a different postulate. It does not follow from uniform emission in transmitter time. The choice between the two numerators is therefore a choice of physical measure, not a root-finding identity.

The identity

$$
\frac{dT_t}{dT_r}
=
\frac{D_r}{D_t}
$$

remains valid for transporting a root through reception time. It does not alter the finite-width emission measure above.

## 6. What this result does not establish

This derivation does not settle:

- whether uniform emission in transmitter time is the correct physical measure;
- behavior as $D_t\to0$, where the simple-root change of variables fails;
- coincident same-source root birth;
- whether either width may be removed in those singular regimes;
- energy, momentum, or angular-momentum balance;
- a discriminating physical or recovery test against the receiver-weighted law.

The document therefore closes one promotion obligation only: the proposed finite-width equation has the proposed sharp limit on an ordinary simple-root domain. Independent mathematical review remains required before this result supports canon or EOM solver migration.
