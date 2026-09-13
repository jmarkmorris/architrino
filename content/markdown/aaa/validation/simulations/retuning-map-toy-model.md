# Retuning-Map Toy Model

This chapter defines a proposed arithmetic model for the cadence-scale retuning map introduced in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis). The model is not a delayed-dynamics proof. It tests conditional branch bookkeeping for a stipulated total cycle-plus-wake action transaction $\sigma h$, where $\sigma\in\{-1,+1\}$ and $h>0$ is an assumed action scale.

A Noether braid is a candidate neutral assembly of six architrinos in three binaries; cadence is a cycle frequency, and retuning changes that frequency together with the geometry. A branch chart specifies one local family of histories and its causal-root identities. Arithmetic feasibility can reject an inconsistent specification. It cannot establish a retained braid, physical acceptance of the transaction, or stability of the retuned history.

The quantities of interest are $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

## Scope and Evidence

No numerical evaluation is reported here. The model specifies a conditional calculation, not an observed action transaction or a demonstrated stable braid. Action increments are expressed in units of $h$, speeds relative to $c_f$, and radius and cadence changes as logarithmic increments. Numerical instantiations use $c_f=1$. The linked branch owner calls a candidate derived cycle-action unit $h_{\mathrm{act}}$; identifying it with the observer Planck benchmark requires the separate [Action-Increment Protocol](coincident-midpoint-orthogonal-axis-action-increment-protocol.md). Inserting that benchmark into this toy calculation cannot count as recovering it. A physical return-map linearization requires a retained reference solution before any stability interpretation.

## Replay Equation

On branch chart $q$, use positive radii $R_a$, positive cadence magnitudes $\nu_a$, a positive envelope scale $\lambda$, and a positive envelope shape ratio $\xi$. Circulation signs and orientations are separate fixed branch data. Every logarithm below acts on the dimensionless ratio to a fixed positive reference with the same units: $\ln\nu_a$ abbreviates $\ln(\nu_a/\nu_{a,*})$, and similarly for radius, scale, and shape. References remain fixed across the transaction. A zero-valued flattening coordinate is outside this logarithmic chart and must not silently replace the positive scale $\lambda$. The eight-component toy state is

$$
\mathbf{y}_q
=
\left(
\ln\nu_1,\ln\nu_2,\ln\nu_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6016bd6fa4dec409)

Given a real symmetric positive semidefinite $8\times8$ retuning-cost matrix $\mathbf K_q^{\mathrm{ret}}$, select an increment by the constrained minimization below. The cost has one declared normalization and is not assumed to be physical energy. The notation denotes a unique vector only under the uniqueness condition below; otherwise the argmin is a set.

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f2be58ed4c74128)

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8850fe0716bb5eeb)

and the declared linearized branch constraints, evaluated at the same reference state. The action derivative is a linear functional with action units per dimensionless coordinate. The wake increment is prescribed independently; if it varies with the unknown state, its derivative belongs in the constraint row rather than being adjusted after solving.

Collect the action row divided by $h$ and the scaled branch rows into $C\Delta\mathbf y=b$. For $m$ rows, $C$ is an $m\times8$ real matrix, and the action component of $b$ is $\sigma-\Delta A_{\mathrm{wake}}/h$. Feasibility requires $b\in\operatorname{range}(C)$, equivalently $\operatorname{rank}(C)=\operatorname{rank}([C\ b])$. Duplicate rows are allowed only if their targets agree. An inconsistent system has no minimizer and is reported as infeasible.

On a nonempty affine feasible set, this semidefinite quadratic has a minimum. It is unique precisely when $\ker C\cap\ker\mathbf K_q^{\mathrm{ret}}=\{0\}$: the cost must be positive in every nonzero feasible direction. The optimality equations are $\mathbf K_q^{\mathrm{ret}}\Delta\mathbf y+C^T\boldsymbol\mu=0$ and $C\Delta\mathbf y=b$, with constraint multipliers $\boldsymbol\mu$. Redundant rows may make the multipliers nonunique even when the increment is unique. A null-cost feasible direction requires reporting the family or declaring an extra selection convention; a least-norm solver's choice is not a derived physical preference.

For finite log increments, reconstruct each positive component exactly as $z'=z\exp(\Delta\ln z)$ and $\Delta z=z[\exp(\Delta\ln z)-1]$. The action constraint remains first order: with a twice-differentiable action and Hessian norm bounded by $M_A$ on the step segment, its omitted term is at most $M_A\|\Delta\mathbf y\|^2/2$. Branch constraints need analogous bounds or direct nonlinear reevaluation. A one-unit action transaction need not be small in this chart. Impose a declared local step domain; rejecting a candidate outside it does not prove that every feasible increment or another branch is impossible.

For the circular characteristic-speed ansatz $s_a=2\pi R_a\nu_a$, the layer-speed diagnostic is

$$
\Delta\ln s_a
=
\Delta\ln R_a
+
\Delta\ln\nu_a,
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-161a0863a2c781cf)

This log-product identity is exact for the stated speed ansatz with fixed conversion factor; it is not a general instantaneous-speed formula for noncircular histories. Reconstruct $s_a'=s_a\exp(\Delta\ln R_a+\Delta\ln\nu_a)$ before checking the speed conditions. The reference must already lie in the selected domain, and $\epsilon_2\ge0$ is a dimensionless tolerance fixed beforehand. These source-record roles do not follow from the persistent indices or assign a taxonomy member:

$$
s_1'>c_f,
\qquad
\left|s_2'-c_f\right|\le\epsilon_2 c_f,
\qquad
s_3'<c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-665a2b9b2bcfaf55)

For fixed nonnegative weights summing to one, define the representative cadence as a weighted geometric mean in the fixed reference units. Its log increment is

$$
\Delta\ln\nu_N
=
w_1\Delta\ln\nu_1
+
w_2\Delta\ln\nu_2
+
w_3\Delta\ln\nu_3,
\qquad
w_1+w_2+w_3=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd4ef1008dbdcd71)

Thus $\Delta\nu_N=\nu_N[\exp(\sum_a w_a\Delta\ln\nu_a)-1]$, rather than the log increment itself. If the weights change during a transaction, their change must enter the extraction; the displayed identity applies to fixed weights only.

For a coarse-grained jump model, let $f_N(\nu,T)$ be braid number density per unit cadence at fixed spatial location, and $r_\sigma(\nu,T)\ge0$ the accepted transaction rate per braid per absolute time. Here $f_N$ is a distribution; the linked branch chapter uses that glyph for its representative cadence, written $\nu_N$ here. Set $\delta_\sigma=\Delta\nu_N^{(q,\sigma)}$ and $a_n=\sum_\sigma r_\sigma\delta_\sigma^n$. The current through second jump order is

$$
J_\nu
=
\sum_{\sigma=\pm1}
f_N r_\sigma\Delta\nu_N^{(q,\sigma)}
-\frac12\partial_\nu(f_N a_2)
+\mathcal R_{\ge3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f914069606810168)

The first term is drift and the second is leading spreading. For a smooth compactly supported test function $\varphi$, the jump model gives $\partial_T\int\varphi f_N\,d\nu=\int f_N\sum_\sigma r_\sigma[\varphi(\nu+\delta_\sigma)-\varphi(\nu)]\,d\nu$. Taylor expansion and integration by parts yield $\partial_T f_N=-\partial_\nu(f_Na_1)+\tfrac12\partial_\nu^2(f_Na_2)+\cdots$, hence the displayed current in $\partial_T f_N+\partial_\nu J_\nu=0$. The remainder $\mathcal R_{\ge3}$ starts formally with $\tfrac16\partial_\nu^2(f_Na_3)$. Rates and jump sizes stay inside derivatives when they vary with cadence. Controlled truncation requires finite jump moments, bounded derivatives, jumps small relative to the distribution's variation scale, and a stated cadence-boundary treatment. Source, sink, or inter-branch transfers require additional terms. This is an effective statistical assumption, not a derivation of Markovian transport from delayed histories.

## Model Inputs

Each scenario supplies:

| Input | Meaning |
| --- | --- |
| Reference state | positive $R_a,\nu_a,\lambda,\xi,\nu_N$, fixed reference units, branch label, $s_a,c_f,\epsilon_2$, and the reference constraint residuals |
| Cadence weights | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| Retuning-cost matrix | declared symmetric matrix $\mathbf K_q^{\mathrm{ret}}$; diagonal nonnegative entries define the simple toy case |
| Action gradient | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| Branch constraints | linearized branch constraints, each with coefficients and target |
| Cadence distribution | local Noether braid cadence-state distribution value |
| Cadence-distribution slope | derivatives of the distribution and rate-weighted jump moments, through the retained transport order |
| Transactions | accepted or control $\sigma$ transactions with wake action increment and local rate density |

A diagonal matrix is a simplifying model choice. A physical application needs a justified response or variational construction that relates the cost to the same retained dynamics, including off-diagonal couplings when required. A return map alone does not uniquely determine a symmetric positive cost matrix.

## Consistency Tests

A calculated increment is arithmetically admissible only if feasibility, the stated selection rule, local step domain, nonlinear remainder bounds, and speed conditions all pass their declared tolerances. The relevant diagnostics are the solved logarithmic retuning vector, the reconstructed component changes, the largest constraint residual, and the post-retuning speed in each binary. The cadence-current calculation also needs each transaction's contribution $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$, their sum, and the derivative of the second jump moment and a bound on $\mathcal R_{\ge3}$.

Two controls distinguish arithmetic consistency from physical evidence. Opposite action signs need not give opposite cadence jumps: even symmetric log steps give $\nu_N(e^d-1)$ and $\nu_N(e^{-d}-1)$, whose sum is $2\nu_N(\cosh d-1)$. Unequal rates can add further drift; symmetric finite cadence jumps with equal rates have zero first moment but can still produce a spreading current in a nonuniform distribution. Conversely, a solution of the linear action constraint is inadmissible if binary 2 leaves its declared wake-speed tolerance. Neither control establishes that an actual braid realizes the assumed transaction.

A residual above tolerance means that the linearized constraints are unsatisfied. A speed-regime crossing rejects the proposed increment in that domain; it does not prove the constrained problem has no other admissible solution. Linearized equality and endpoint speed checks also do not certify unchanged causal-root topology along the path. A large higher-order current remainder calls for smaller increments or a higher-order transport approximation.

The physical derivation remains open. It requires a dynamically justified $\mathbf K_q^{\mathrm{ret}}$, nonlinear retained-branch continuation with preservation of the same causal-root ledger, and speed conditions evaluated on the same branch state that supplies $\Delta\nu_N$. An arithmetic solution without that dynamical input is only a conditional retuning model.
