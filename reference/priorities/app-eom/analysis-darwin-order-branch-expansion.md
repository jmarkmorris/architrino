# Darwin-Order Expansion of the Receiver-Normal Branch Law

## Verdict

**The canonical receiver-normal branch law does not reproduce the Darwin-order interaction for a neutral, uniformly drifting infinite line.** On the simple low-speed branch, the source-normal denominator is cancelled exactly by the transport from a common absolute-time source label to the retarded emission position. What remains is independent of source drift. A neutral population therefore produces no receiver-velocity-independent acceleration and no receiver-velocity-linear current response. With the Darwin current coefficient normalized to one, the canonical coefficient is

$$
\boxed{C_{B,\mathrm{can}}=0,
\qquad
C_{B,\mathrm{D}}=1,
\qquad
\frac{C_{B,\mathrm{can}}}{C_{B,\mathrm{D}}}=0.}
$$

The exact deficit is one full Darwin coefficient, or $-100\%$ relative to the benchmark.

Claim grade: **derived** for the canonical coefficient and its ratio to the stated benchmark. The inference that the present receiver-sampling postulate cannot by itself recover current magnetism is graded separately below. No measured or guessed claim is used.

## Scope and decisive geometry

This calculation uses the smallest steady geometry that isolates the coefficient:

- one infinite straight source line along $\hat{\mathbf x}$;
- a receiver at perpendicular offset $\rho\hat{\mathbf y}$ at absolute time $T$;
- source species $\alpha$ with uniform signed line density $\Lambda_\alpha=n_\alpha q_\alpha$ on the common $T$ slice and constant drift $u_\alpha\hat{\mathbf x}$;
- common-slice neutrality but nonzero current,
  $$
  \sum_\alpha\Lambda_\alpha=0,
  \qquad
  \mathcal J\equiv\sum_\alpha\Lambda_\alpha u_\alpha\ne0;
  $$
- $|u_\alpha|/c_f\ll1$ and $\|\mathbf V\|/c_f\ll1$, so $D_s>0$ and $D_T>0$ on every line-of-sight branch and the absolute value in $W^{\mathrm{rec}}$ does not change the expansion.

An infinite line removes end effects. A finite line can generate boundary terms that depend on its length and endpoint preparation, but those terms do not define the universal local Darwin coefficient tested here.

Claim grade: **derived** that this geometry is a valid simple-root specialization of the canonical law. Claim grade: **inferred** that it is the decisive minimal bulk test; its falsifier is a demonstrated Darwin coefficient that intrinsically depends on line endpoints rather than surviving the infinite-line limit.

## Canonical branch and notation

For one source with constant velocity $\mathbf u$ over the relevant delay, let

$$
\mathbf R=\mathbf X_i(T)-\mathbf X_j(T),
\qquad
R=\|\mathbf R\|,
\qquad
\mathbf N=\frac{\mathbf R}{R},
$$

and let the retained emission time be $S=T-r/c_f$. The delayed separation is

$$
\mathbf r
=\mathbf X_i(T)-\mathbf X_j(S)
=\mathbf R+\frac{r}{c_f}\mathbf u,
\qquad
r=\|\mathbf r\|,
\qquad
\widehat{\mathbf r}=\frac{\mathbf r}{r}.
$$

Define

$$
\boldsymbol\beta=\frac{\mathbf u}{c_f},
\qquad
\boldsymbol\gamma=\frac{\mathbf V}{c_f},
\qquad
a=\mathbf N\cdot\boldsymbol\beta,
\qquad
h=\mathbf N\cdot\boldsymbol\gamma.
$$

The low-speed canonical per-hit acceleration is

$$
\mathbf A_{i\leftarrow j}
=\kappa q_iq_j
\frac{D_T}{D_s}
\frac{\widehat{\mathbf r}}{r^2},
\qquad
D_s=c_f-\widehat{\mathbf r}\cdot\mathbf u,
\qquad
D_T=c_f-\widehat{\mathbf r}\cdot\mathbf V.
$$

This section uses only the canonical delayed central kernel. The effective electric and magnetic labels below are comparison labels applied after population summation; they are not architrino-level inputs.

Claim grade: **derived** by specialization of the canonical Master EOM to a constant-velocity simple root.

## Second-order delayed-branch expansion

### Delay geometry

Squaring $\mathbf r=\mathbf R+r\boldsymbol\beta$ gives

$$
(1-\beta^2)r^2-2Ra\,r-R^2=0.
$$

The positive causal root is

$$
\frac rR
=\frac{a+\sqrt{1-\beta^2+a^2}}{1-\beta^2}
=1+a+\frac12(\beta^2+a^2)+O(\epsilon^3),
$$

where $\epsilon$ counts either $\|\boldsymbol\beta\|$ or $\|\boldsymbol\gamma\|$. Therefore

$$
\frac{1}{r^2}
=\frac{1}{R^2}
\left(1-2a-\beta^2+2a^2\right)
+O(\epsilon^3),
$$

and

$$
\widehat{\mathbf r}
=\mathbf N
\left(1-a+\frac12(a^2-\beta^2)\right)
+\boldsymbol\beta
+O(\epsilon^3).
$$

Claim grade: **derived** by direct expansion of the $\mathbb{A}\mathbb{A}\mathbb{A}$ causal-root equation. Falsifier: substituting the displayed $r/R$ into the quadratic leaves a residual of order $O(\epsilon^2)$ or lower rather than $O(\epsilon^3)$.

### Source and receiver normals

The delayed sightline gives

$$
\frac{D_s}{c_f}
=1-a+a^2-\beta^2+O(\epsilon^3),
$$

and

$$
\frac{D_T}{c_f}
=1-h+ah-\boldsymbol\beta\cdot\boldsymbol\gamma
+O(\epsilon^3).
$$

Consequently the complete receiver-normal branch strength is

$$
W^{\mathrm{rec}}
=\frac{D_T}{D_s}
=1+a-h+\beta^2
-\boldsymbol\beta\cdot\boldsymbol\gamma
+O(\epsilon^3).
$$

The angular $ah$ term cancels inside the ratio. Dropping delay corrections in $\widehat{\mathbf r}$ before expanding $D_s$ or $D_T$ would miss that cancellation and would not be a self-consistent branch expansion.

Claim grade: **derived**. Falsifier: direct expansion of the exact ratio on a positive-normal branch produces a nonzero second-order $ah$ term or a coefficient other than $-1$ on $\boldsymbol\beta\cdot\boldsymbol\gamma$.

### Complete per-hit kernel

Multiplying the delayed direction, inverse-square factor, and receiver-normal strength gives

$$
\boxed{
\frac{D_T}{D_s}\frac{\widehat{\mathbf r}}{r^2}
=\frac{1}{R^2}
\left\{
\mathbf N
\left[
1-2a-h
+\frac32a^2-\frac12\beta^2
-\boldsymbol\beta\cdot\boldsymbol\gamma
+3ah
\right]
+\boldsymbol\beta(1-a-h)
\right\}
+O(\epsilon^3).
}
$$

The receiver-velocity-independent terms are obtained by setting $\boldsymbol\gamma=0$. The receiver-velocity-linear terms are

$$
\left.
\frac{D_T}{D_s}\frac{\widehat{\mathbf r}}{r^2}
\right|_{\mathbf V\text{-linear}}
=\frac{1}{R^2}
\left{
\mathbf N
\left[-h-\boldsymbol\beta\cdot\boldsymbol\gamma+3ah\right]
-\boldsymbol\beta h
\right\}
+O(\epsilon^3).
$$

Claim grade: **derived**. Falsifier: evaluation of the exact constant-velocity branch at scaled velocities $(\epsilon\mathbf u,\epsilon\mathbf V)$ differs from the boxed expression by $O(\epsilon^2)$ rather than $O(\epsilon^3)$.

## Neutral-line sum with root transport

The order-by-order expansion is useful for coefficient identification, but the line sum has an exact change of variable that exposes the decisive cancellation.

For species $\alpha$, label each source by its line coordinate $\xi$ on the common absolute-time slice $T$. Its retarded emission coordinate is

$$
y=\xi-\frac{u_\alpha r}{c_f},
\qquad
r=\sqrt{y^2+\rho^2},
\qquad
\widehat{\mathbf r}
=\frac{-y\hat{\mathbf x}+\rho\hat{\mathbf y}}{r}.
$$

Because $dr/dy=y/r=-\widehat r_x$,

$$
\frac{d\xi}{dy}
=1+\frac{u_\alpha}{c_f}\frac{dr}{dy}
=1-\frac{u_\alpha}{c_f}\widehat r_x
=\frac{D_{s,\alpha}}{c_f}.
$$

This is the source-label transport that must accompany the retarded branch. It is not an optional density correction: the population sum is over source identities on one common absolute-time slice, while their selected emission events lie on different retarded times.

On the positive-normal branch,

$$
d\xi\,\frac{D_T}{D_s}
=dy\,\frac{D_s}{c_f}\frac{D_T}{D_s}
=dy\,\frac{D_T}{c_f}
=dy\left(1-\widehat{\mathbf r}\cdot\boldsymbol\gamma\right).
$$

The source velocity has disappeared exactly. Hence species $\alpha$ contributes

$$
\mathbf A_\alpha
=\kappa q_i\Lambda_\alpha
\int_{-\infty}^{\infty}
\left(1-\widehat{\mathbf r}\cdot\boldsymbol\gamma\right)
\frac{\widehat{\mathbf r}}{r^2}\,dy,
$$

which depends on $\Lambda_\alpha$ but not on $u_\alpha$.

The required line integrals are

$$
\int_{-\infty}^{\infty}
\frac{\widehat{\mathbf r}}{r^2}\,dy
=\frac{2}{\rho}\hat{\mathbf y},
$$

and

$$
\int_{-\infty}^{\infty}
\frac{\widehat{\mathbf r}\widehat{\mathbf r}^{\mathsf T}}{r^2}\,dy
=\frac{\pi}{2\rho}
\left(
\hat{\mathbf x}\hat{\mathbf x}^{\mathsf T}
+\hat{\mathbf y}\hat{\mathbf y}^{\mathsf T}
\right).
$$

Thus the entire canonical line response is

$$
\mathbf A_{\mathrm{line}}^{\mathrm{can}}
=\kappa q_i
\left(\sum_\alpha\Lambda_\alpha\right)
\left[
\frac{2}{\rho}\hat{\mathbf y}
-\frac{\pi}{2\rho c_f}
\left(V_x\hat{\mathbf x}+V_y\hat{\mathbf y}\right)
\right].
$$

For common-slice neutrality,

$$
\boxed{
\mathbf A_{\mathrm{line}}^{\mathrm{can}}=\mathbf0
}
$$

even when $\mathcal J=\sum_\alpha\Lambda_\alpha u_\alpha\ne0$.

Claim grade: **derived**, and stronger than a second-order statement: the cancellation is exact for the ideal constant-drift infinite line while $D_s$ and $D_T$ retain one sign. Falsifier: a direct source-identity sum on this geometry, using the same retained root for $r$, $D_s$, and $D_T$, converges to a nonzero bulk term proportional to $\mathcal J$ as the symmetric line cutoff tends to infinity.

### Order-by-order cancellation check

The exact result can also be read directly from the second-order kernel. Subtracting the stationary-source kernel and integrating over the line gives:

| Source-dependent order | Integrated canonical coefficient | Reason |
| --- | ---: | --- |
| $u_\alpha/c_f$ | $0$ | The delayed-direction term and source-normal compression term are equal boundary transports with opposite signs. |
| $u_\alpha^2/c_f^2$ | $0$ | The longitudinal and transverse second moments cancel. |
| $u_\alpha V/c_f^2$ | $0$ | All receiver-linear current terms cancel between $D_T$, $D_s$, delayed direction, and label transport. |

Claim grade: **derived**. The exact change of variable is the proof; the table is its second-order decomposition.

## Darwin-order benchmark

This subsection is comparison-only effective physics. It does not enter the $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation as a premise.

With the static inverse-square acceleration coupling normalized to the same $\kappa$, the receiver-velocity-linear Darwin acceleration from one uniformly moving source is

$$
\mathbf A_{\mathrm D,V}
=\frac{\kappa q_iq_j}{c_f^2R^2}
\mathbf V\times(\mathbf u\times\mathbf N)
=\frac{\kappa q_iq_j}{c_f^2R^2}
\left[
\mathbf u(\mathbf V\cdot\mathbf N)
-\mathbf N(\mathbf V\cdot\mathbf u)
\right].
$$

Equivalently, the Darwin interaction term supplies the comparison vector potential

$$
\boldsymbol{\mathcal A}_{\mathrm D}
=\frac{\kappa q_j}{2c_f^2R}
\left[
\mathbf u+(\mathbf u\cdot\mathbf N)\mathbf N
\right],
$$

whose curl is $\kappa q_j\,\mathbf u\times\mathbf N/(c_f^2R^2)$. The displayed receiver acceleration follows without using a Lienard-Wiechert intermediate result.

For the neutral line,

$$
\boxed{
\mathbf A_{\mathrm D,V}^{\mathrm{line}}
=\frac{2\kappa q_i\mathcal J}{\rho c_f^2}
\left(V_y\hat{\mathbf x}-V_x\hat{\mathbf y}\right).
}
$$

The receiver-velocity-independent Darwin coefficient is zero for the steady line neutral on the common laboratory/absolute-time slice, while the receiver-velocity-linear coefficient remains proportional to its nonzero current. The status of the Darwin expansion as the slow-motion Maxwell benchmark is independently established in Markus Kunze and Herbert Spohn, [“Slow Motion of Charges Interacting Through the Maxwell Field”](https://arxiv.org/abs/math-ph/0001002); that benchmark is used here only as an observer-level recovery target.

Claim grade: **derived** for the line integral of the stated Darwin benchmark. Claim grade: **derived** in the cited independent analysis for the benchmark's slow-motion Maxwell status. Falsifier: the curl of the displayed Darwin comparison potential or its infinite-line integral yields a coefficient other than $2\kappa q_i\mathcal J/(\rho c_f^2)$.

## Coefficient comparison

Define the normalized current coefficient $C_B$ by

$$
\mathbf A_{V}^{\mathrm{line}}
\equiv
C_B
\frac{2\kappa q_i\mathcal J}{\rho c_f^2}
\left(V_y\hat{\mathbf x}-V_x\hat{\mathbf y}\right).
$$

| Extracted coefficient after the neutral-line sum | Canonical branch law | Darwin benchmark | Comparison | Grade |
| --- | ---: | ---: | --- | --- |
| Receiver-velocity-independent coefficient (effective $E$) | $0$ | $0$ | Match, but non-discriminating | derived |
| Receiver-linear term proportional to net charge $\sum_\alpha\Lambda_\alpha$ | $0$ after neutrality | $0$ after neutrality | Match, but non-discriminating | derived |
| Receiver-linear current coefficient $C_B$ (effective $B$ candidate) | $0$ | $1$ | **Mismatch** | derived |
| Exact ratio $C_{B,\mathrm{can}}/C_{B,\mathrm D}$ | $0$ | $1$ | **$0$** | derived |
| Deficit $C_{B,\mathrm{can}}-C_{B,\mathrm D}$ |  |  | **$-1$ Darwin coefficient** | derived |

The failure is not a sign error or a factor-of-two error. The current response is absent.

Claim grade: **derived**. Falsifier: recomputation of the same canonical population sum produces $C_{B,\mathrm{can}}=1$ rather than $0$ without changing the kernel, density convention, root record, or infinite-line limit.

## Adjudication of the receiver-sampling postulate

The source-normal denominator $D_s$ and the receiver-normal numerator $D_T$ are self-consistent as a branch-transport measure, but that consistency is exactly what removes the source drift from a uniform continuum. The rule measures how a receiver crosses the emitted wake sequence; it does not retain the transverse source-current information required by the Darwin interaction after the neutral sum.

Therefore:

1. Claim grade: **derived** — the canonical central branch law predicts $C_B=0$ on the stated test.
2. Claim grade: **derived** — the Darwin recovery target has $C_B=1$ under the same static-coupling normalization.
3. Claim grade: **inferred** — the present receiver-sampling postulate is falsified as a sufficient standalone mechanism for Darwin-order magnetism. This does not falsify unrelated $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics or rule out an independently derived recoil, medium-response, or assembly channel; it says that such a channel cannot be claimed to have emerged from this central branch factor alone.

The decisive falsifier is the normalized coefficient itself:

$$
\boxed{
\text{Survival condition: }C_B=1;
\qquad
\text{refuting value derived here: }C_B=0.
}
$$

More generally, any value $C_B\ne1$ refutes exact Darwin-order recovery by the central sampling rule. The specific canonical prediction is zero.

The adjudication would be overturned only if at least one of the following occurred on the same declared test:

- an algebraic audit found that the canonical same-record population measure is not $d\xi\,D_T/D_s$;
- a direct large-cutoff source-identity sum converged to $C_B=1$;
- the accepted canonical law contained an additional independently derived current-carrying branch contribution omitted from the stated per-hit kernel; or
- the required observer-level benchmark ceased to be the Darwin coefficient $C_B=1$ under the shared static normalization.

Claim grade: **derived** for the survival and refuting coefficient values. Claim grade: **inferred** for the scope of the required postulate revision. No measurement was performed in this analysis.

## Claim-grade ledger

| Claim | Grade | Direct falsifier |
| --- | --- | --- |
| The delayed constant-velocity branch expansion is correct through $O(v^2/c_f^2)$. | derived | Exact branch residual or scaled-velocity comparison fails at $O(\epsilon^3)$. |
| Common-slice source-label transport supplies $d\xi/dy=D_s/c_f$. | derived | Differentiating $\xi=y+u_\alpha r(y)/c_f$ gives another Jacobian. |
| The transported canonical line kernel is independent of $u_\alpha$. | derived | Same-record substitution leaves a source-velocity term after $d\xi\,D_T/D_s$. |
| A neutral infinite line has zero canonical effective-$E$ and effective-$B$-candidate response. | derived | Symmetric-cutoff summation converges to a nonzero bulk term. |
| The normalized Darwin current coefficient is $1$. | derived | The Darwin comparison potential and line integral yield a different coefficient under the same static normalization. |
| The canonical-to-Darwin coefficient ratio is $0$. | derived | Either preceding coefficient changes on an audit. |
| The receiver-sampling postulate is insufficient as the standalone origin of Darwin-order magnetism. | inferred | The unchanged postulate is embedded in a complete same-record derivation that yields $C_B=1$. |

## Promotion disposition

Disposition: **priority-only**. The mismatch is a concrete analytic closure result, but it changes the status of a canonical sampling postulate and should not be promoted into reader-facing canon until the branch law, any independently derived missing channel, and the affected action/conservation rows are adjudicated together.
