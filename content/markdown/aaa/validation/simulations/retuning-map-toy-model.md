# Retuning-Map Toy Model

This chapter defines a proposed arithmetic model for the cadence-scale retuning map introduced in [A1 Dynamics](../../noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis). The model is not a delayed-dynamics proof. It describes constrained branch bookkeeping conditional on an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction and tests whether the resulting increment is consistent with same-branch retuning.

The toy model answers an accounting question before it answers a physics question. If a branch accepts one action-sized transaction, can the cadence, radius, scale, and speed rows be retuned without leaving the declared branch regime? Only after that arithmetic is clean does the harder delayed-dynamics proof become worth asking.

The quantities of interest are $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

## Scope and Evidence

No numerical evaluation is reported here. The model specifies a conditional calculation, not an observed action transaction or a demonstrated stable braid. Action increments are expressed in units of $h$, speeds relative to $c_f$, and radius and cadence changes as logarithmic increments. Numerical instantiations use $c_f=1$.

## Replay Equation

On branch chart $q$, the toy state is

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

Given a positive semidefinite retuning-cost matrix $\mathbf{K}^{\mathrm{ret}}_q$, the proposed increment is defined by the constrained minimization

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

and the declared linearized branch constraints. The layer-speed diagnostics are then checked through

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

The proposed increment must satisfy the candidate source-record speed conditions below. These branch roles do not assign an A1 or other taxonomy member:

$$
s_1'>c_f,
\qquad
\left|s_2'-c_f\right|\le\epsilon_2 c_f,
\qquad
s_3'<c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-665a2b9b2bcfaf55)

The representative Noether braid cadence increment is

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

For a local rate density $r_\sigma$ of accepted $\sigma$ transactions per braid, the first current estimate is

$$
J_\nu
=
\sum_{\sigma=\pm1}
f_N r_\sigma\Delta\nu_N^{(q,\sigma)}
+
O\!\left((\Delta\nu_N)^2\partial_\nu f_N\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f914069606810168)

## Model Inputs

Each scenario supplies:

| Input | Meaning |
| --- | --- |
| Reference state | baseline $R_1,R_2,R_3,\lambda,\xi,\nu_N,s_1,s_2,s_3,c_f,\epsilon_2$ |
| Cadence weights | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| Retuning-cost matrix | diagonal version of $\mathbf{K}^{\mathrm{ret}}_q$ |
| Action gradient | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| Branch constraints | linearized branch constraints, each with coefficients and target |
| Cadence distribution | local Noether braid cadence-state distribution value |
| Cadence-distribution slope | local slope used only to estimate the higher-order current remainder |
| Transactions | accepted or control $\sigma$ transactions with wake action increment and local rate density |

A diagonal matrix is a simplifying model choice. A physical application requires the linearized return map to determine the full matrix, including any off-diagonal coupling.

## Consistency Tests

A calculated increment is admissible only if the declared linear constraints and speed conditions hold within tolerance. The relevant diagnostics are the solved logarithmic retuning vector, the reconstructed component changes, the largest constraint residual, and the post-retuning speed in each binary. The cadence-current calculation also needs each transaction's contribution $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$, their sum, and an estimate of the omitted $O((\Delta\nu_N)^2\partial_\nu f_N)$ term.

Two controls distinguish arithmetic consistency from physical evidence. Opposite one-$h$ increments may both satisfy the constraints while unequal local transaction rates produce a nonzero net current. Conversely, a solution of the linear action constraint is inadmissible if binary 2 leaves its declared field-speed tolerance. Neither control establishes that an actual braid realizes the assumed transaction.

A residual above tolerance means that the linearized constraints are unsatisfied. A speed-regime crossing means that the proposed increment leaves the declared branch domain. A large higher-order current remainder calls for smaller increments or a higher-order transport approximation.

The physical derivation remains open. It requires a return-map-derived $\mathbf{K}^{\mathrm{ret}}_q$, preservation of the same causal-root ledger, and speed conditions evaluated on the same branch state that supplies $\Delta\nu_N$. An arithmetic solution without that dynamical input is only a conditional retuning model.
