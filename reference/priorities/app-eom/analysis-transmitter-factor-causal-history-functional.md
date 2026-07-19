# Source-Density Causal Retained-History Functional

## Status

- Purpose: test whether the proposed acceleration is computable from the current receiver state and retained past histories only
- Scope: finite retained history; fixed positive wake width and core scale, plus sharp simple-root and ordinary-fold subdomains
- Standing: priority analysis; not canon and not an EOM solver specification
- Result: causal functional passes at fixed positive widths; global sharp evolution remains blocked at coincident same-source birth

## Finding in plain language

The proposed finite-width acceleration is a genuinely past-history equation. At reception time $T$, it needs the receiver's position at $T$ and transmitter positions from times earlier than $T$. It needs neither the transmitter's position at $T$ nor anyone's future path.

With positive wake width and core scale, the acceleration changes continuously when the retained histories change slightly. That supplies the ordinary local existence and uniqueness property needed to advance the history one step at a time. The same statement holds for the sharp equation while all roots remain simple and separated from coordinate coincidence. It fails globally at coincident same-source birth because that sharp transition has no finite impulse.

Claim classification: **derived mathematical result** under the regularity, finite-memory, and coverage assumptions stated below.

## 1. History-state form

Fix retained-history length $h>0$. At absolute time $T$, define each retained position history by

$$
\boldsymbol\phi_i(s)
=
\mathbf X_i(T+s),
\qquad
-h\le s\le0.
$$

For receiver $i$ and transmitter $j$, put

$$
\mathbf d_{ij}(s)
=
\boldsymbol\phi_i(0)-\boldsymbol\phi_j(s),
$$

and

$$
g_{ij}(s)
=
\|\mathbf d_{ij}(s)\|+c_fs.
$$

The proposed finite-width acceleration functional is

$$
\boxed{
\mathcal A_i^{(\eta,\epsilon_c)}[\boldsymbol\phi]
=
\kappa
\sum_j
\sigma_{ij}|q_iq_j|
\int_{-h}^{0}
c_f
\mathbf K_{\epsilon_c}(\mathbf d_{ij}(s))
\delta_\eta(g_{ij}(s))
\,ds
}.
$$

For $s<0$, every transmitter value is in retained history. At $s=0$ the same-source displacement is zero; the endpoint has measure zero and the finite-core kernel has the continuous value $\mathbf K_{\epsilon_c}(\mathbf0)=\mathbf0$. No future value occurs.

The receiver's current velocity may be carried in the full state needed to advance $\dot{\mathbf X}_i=\mathbf V_i$, but it does not enter the base acceleration functional.

Falsifier: any term in the displayed functional that requires $\boldsymbol\phi_j(s)$ for $s>0$ or a transmitter position not contained in the declared retained history.

## 2. Local regularity at positive widths

Assume:

1. finitely many architrinos are included in the local evolution problem;
2. each retained position history is continuous on $[-h,0]$;
3. $\eta>0$ and $\epsilon_c>0$ are fixed;
4. the chosen finite-width profile is bounded and locally Lipschitz;
5. retained positions remain in a bounded neighborhood during the local step.

The map

$$
\mathbf d\mapsto
\mathbf K_{\epsilon_c}(\mathbf d)
=
\frac{\mathbf d}{(\|\mathbf d\|^2+\epsilon_c^2)^{3/2}}
$$

is smooth with bounded derivative on every bounded set. The Euclidean norm is Lipschitz, and the finite-width profile is locally Lipschitz. Products and finite sums preserve local Lipschitz continuity, while integration over the fixed finite interval preserves the bound. Therefore

$$
\boldsymbol\phi
\longmapsto
\mathcal A_i^{(\eta,\epsilon_c)}[\boldsymbol\phi]
$$

is locally Lipschitz in the uniform history norm.

Writing the complete retained state as position and velocity histories, the evolution law

$$
\dot{\mathbf X}_i(T)=\mathbf V_i(T),
\qquad
\dot{\mathbf V}_i(T)
=
\mathcal A_i^{(\eta,\epsilon_c)}[\boldsymbol\phi_T]
$$

is a retarded functional differential equation: its derivative now depends on a finite interval of state ending now. The local Lipschitz bound gives a unique local continuation from a compatible retained initial history by the usual fixed-point construction.

Plain language: the state is a whole retained transmission line, not one instantaneous node. Once that line is supplied, the positive-width equation advances it without asking for future values.

Claim classification: **derived**. Two distinct local continuations from the same retained history while the stated Lipschitz bound holds would falsify the uniqueness statement.

## 3. Sharp simple-root subdomain

Suppose every active root is interior and simple, with

$$
|D_t|\ge\nu_t>0,
$$

the roots are complete and separated, the root-free complement has a positive residual gap, and

$$
r\ge r_{\min}>0.
$$

The implicit-function theorem then makes each root a locally continuous function of the current receiver event and the retained transmitter history. The sharp contribution

$$
\kappa\,\sigma_{ij}|q_iq_j|
\frac{\hat{\mathbf r}_t}{r^2}
\frac{c_f}{|D_t|}
$$

is locally regular while those floors persist. It remains a causal retained-history functional on that chart.

The result does not authorize extrapolation through $D_t=0$, $r=0$, an unresolved memory boundary, or a change in root count.

## 4. Ordinary-fold continuation

At a nondegenerate interior fold with $r>0$ and $D_r\ne0$, pointwise sharp acceleration is unbounded but has the finite impulse derived in [Source-Density Fold and Coincident-Birth Analysis](analysis-transmitter-side-fold-and-coincident-birth.md). The fold impulse depends only on the causal rectangle covered by the current retained histories and the self-consistent candidate segment being advanced.

This does not introduce future-path dependence. During evolution, the candidate segment is solved together with its acceleration and is accepted only if the resulting segment reproduces the same retained-history functional. A prescribed future transmitter path would be an invalid shortcut, not a requirement of the equation.

Claim classification: **derived causal structure; implementation acceptance remains separate**. A fold update that cannot be formulated as a self-consistent extension of retained history would overturn this claim.

## 5. Global sharp obstruction

At coincident same-source root birth, the sharp transmitter-side contribution has no finite velocity impulse. The sharp functional therefore fails to define a global continuation across a generic smooth field-speed crossing. This is a mathematical failure of the sharp same-source equation, not evidence of future dependence.

Fixed positive $\eta$ and $\epsilon_c$ restore a locally regular causal functional. A globally promotable equation must either retain and physically determine those scales or derive a different near-diagonal rule before claiming sharp same-source evolution.

## 6. Retained-history coverage obligation

Finite memory is sufficient only when it covers the complete causal support needed for the declared step. If a root or a material finite-width tail can cross the oldest retained boundary, the equation cannot distinguish missing history from zero contribution.

Each accepted update must therefore establish one of two conditions:

1. complete causal support lies inside retained history; or
2. the omitted tail has a declared outward bound small enough for the accepted error budget.

Otherwise the update must stop for insufficient history. Absence of a detected root is not evidence that no root exists outside the retained interval.

## 7. Disposition

The causal-history obligation passes for the positive-width equation and for sharp simple-root and ordinary-fold charts with complete retained support. It does not rescue the global sharp equation from coincident same-source birth.

Promotion classification: **promote now within the priority proposal as a causal-functional theorem; defer global sharp-law promotion on the coincident-birth blocker**.
