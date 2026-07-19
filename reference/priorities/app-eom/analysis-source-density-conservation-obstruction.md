# Conservation Obstruction for the Scale-Only Source-Density Equation

## Status

- Purpose: test the energy, momentum, and angular-momentum promotion obligation
- Scope: the proposed scale-only acceleration with factor $c_f/|D_t|$
- Standing: priority analysis; not canon and not an EOM solver specification
- Result: conservation is not derivable from the scale-only equation with the current action evidence

## Finding in plain language

The proposed base acceleration does not yet carry a proved conservation law. The action calculation that selects the factor $c_f/|D_t|$ also produces a second, nonzero recoil contribution. That recoil contribution is required by the same action's translation and rotation identities. Keeping the selected scale term while dropping the recoil term breaks the only current action-based route to energy, momentum, and angular-momentum balance.

The acceleration equation by itself cannot repair this gap. It specifies how velocity changes, but it does not specify the primitive kinetic function, momentum function, or wake-history charges needed to state a unique conserved total.

Claim classification: **derived obstruction from the current scalar-action decomposition; inferred promotion consequence for every other possible action**.

## 1. What the current action actually derives

The existing regularized scalar action has an exact kernel split

$$
K_0^{(\eta)}
=
K_{\mathrm{scale}}^{(\eta)}
+
K_C^{(\eta)}.
$$

Its spatial variation gives two distinct acceleration contributions:

$$
\mathbf A_i^{\mathrm{action}}
=
\mathbf A_{\mathrm{scale},i}^{(0)}
+
\mathbf A_{C,i}.
$$

The first contribution has the proposed simple-root factor

$$
\frac{c_f}{|D_t|}.
$$

The second contribution comes from the derivative of the causal constraint. It is nonzero on the branch-preserving perturbation family analyzed in [Recoil Pullback Lemma for the Pure Scalar Action](analysis-recoil-pullback-lemma.md). The same analysis constructs wake-history energy, momentum, and angular-momentum increments for that recoil contribution from the action's time-translation, spatial-translation, and rotation symmetries.

Therefore the current action supports the recoil-inclusive equation, not the scale-only equation.

Falsifier: a correct variation of the same action for which $\mathbf A_C$ vanishes identically on every retained branch chart.

## 2. Residual left by dropping recoil

Suppose a trajectory is advanced with

$$
\mathbf A_i
=
\mathbf A_{\mathrm{scale},i}^{(0)}
$$

while the scalar action remains the proposed conservation authority. The trajectory then fails the full action equation by

$$
\mathbf R_i
=
-\mathbf A_{C,i}
$$

in the action-to-acceleration normalization used to compare the two contributions.

The corresponding symmetry projections are proportional to

$$
\mathcal R_E
=
\sum_i
\mathbf V_i\cdot\mathbf A_{C,i},
$$

$$
\boldsymbol{\mathcal R}_P
=
\sum_i
\mathbf A_{C,i},
$$

and

$$
\boldsymbol{\mathcal R}_J
=
\sum_i
\mathbf X_i\times\mathbf A_{C,i}.
$$

The recoil analysis exhibits branch-preserving perturbations for which these projections are not all zero. The scale-only trajectory therefore cannot inherit the scalar action's conserved wake-history totals.

Plain language: deleting one term from an action-derived acceleration does not merely simplify the motion. It also deletes the transfer needed to balance the action's energy and motion accounts.

Claim classification: **derived for this action and its declared branch neighborhood**. A proof that all three displayed projections vanish identically on that same neighborhood would overturn the obstruction.

## 3. Why the acceleration equation alone is insufficient

At substrate level, acceleration is primitive. A conservation statement nevertheless needs additional defined objects. For example, a kinetic scalar $K(s)$ and a radial momentum magnitude $P(s)$ must satisfy their declared compatibility relation before one can infer an energy change or a momentum balance from acceleration. Wake-history energy and motion accounts also require a rule assigning content to causal records and their boundary crossings.

The scale-only Master Equation supplies none of these definitions uniquely. Many different kinetic functions and wake ledgers can reproduce the same instantaneous acceleration while assigning different conserved totals. Defining a missing wake account afterward as “whatever closes the residual” would be circular and would not provide independent evidence.

Claim classification: **derived underdetermination**. A unique construction of all three conserved totals from the scale-only acceleration and existing architrino primitives alone would falsify it.

## 4. Causality obstruction in the current action route

The complete two-time action variation couples a present event both to past emissions received now and to present emissions received later. Its full Euler contribution is therefore not yet a functional of retained past history alone. The recoil wake-history increments are valid cross-cut action identities, but they do not by themselves provide a causal acceleration evaluator for $\mathbf A_C$.

This leaves a two-sided requirement:

1. dropping $\mathbf A_C$ loses the action-based conservation proof;
2. retaining $\mathbf A_C$ is not acceptable until it is rewritten as a causal retained-history contribution or replaced by an independently derived causal mechanism.

The obstruction is not solved by prescribing a future partner path. That would turn the Master Equation into a boundary-value rule rather than a past-history evolution law. [Causal-Recoil No-Go for the Current Two-Time Action](analysis-two-time-action-causal-recoil-no-go.md) proves the stronger statement: on arbitrary admissible continuations, no functional of retained particle histories alone can equal the complete current action variation. A causal reconstruction therefore requires an independent wake state or a different evolution principle.

## 5. Minimum new structure needed for promotion

The current direct action cannot produce the needed functional from particle histories alone. A conservation-supporting causal completion would instead need an independently evolving wake state $\Psi_T$ and an acceleration functional

$$
\mathbf A_{C,i}^{\mathrm{ret}}
\left[
\Psi_T,
\{\mathbf X_j(S):S\le T\}
\right]
$$

with all of the following properties:

1. $\Psi_T$ has a causal update rule and declared initial data rather than being defined from a future trajectory;
2. the acceleration uses current wake state and retained past particle histories only;
3. it agrees with the accepted incoming regularized contribution on an endpoint-clear branch chart, while any difference from the two-sided action is stated rather than hidden;
4. the same wake state defines energy, momentum, and angular-momentum increments;
5. the three balance residuals vanish or converge to zero under one common regulator and history-window limit;
6. it remains finite through ordinary folds;
7. its coincident same-source asymptotic is computed explicitly, because the incoming action contribution is more singular than the scale acceleration;
8. its definition does not depend on a prescribed future path or an arbitrary characteristic split.

This is one theorem target, not eight independent gates: the same causal wake state and the same retained record must satisfy all eight properties.

## 6. Available resolution routes

Three routes remain logically open:

1. introduce an independently evolving causal wake state and derive its recoil acceleration and conserved accounts;
2. derive a different causal action whose complete variation is exactly the scale-only source-density equation;
3. derive conserved realized-trajectory wake accounts independently of an action, with one common record and non-circular balance tests.

The current evidence closes none of these routes. The first route has the strongest accounting foothold because the recoil kernel and its cross-cut symmetry increments already exist. However, [Causal-Recoil Asymptotic at Coincident Same-Source Birth](analysis-causal-recoil-coincident-birth-asymptotic.md) shows that the incoming sharp recoil has the same sign as the scale contribution and grows as $t^{-4}$, while the time-transposed companion belongs to an advanced pre-crossing event. The causal-recoil no-go theorem shows that the complete current action contribution cannot be reconstructed from retained particle histories alone. An added causal wake state would have to be derived and tested rather than inferred from the direct action by rearrangement.

## 7. Disposition

The conservation obligation remains open. The scale factor $c_f/|D_t|$ is supported by the current action's scale component, but the scale-only equation is not supported by that action's conservation identities.

Promotion classification: **defer with blocker**. The retained-particle-history recoil route is closed negatively; the next mathematical target is an independently evolving causal wake state or a different conservation construction.
