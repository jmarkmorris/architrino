# Causal-Recoil No-Go for the Current Two-Time Action

## Status

- Purpose: decide whether the current regularized two-time action can supply a recoil acceleration from retained particle histories alone
- Scope: fixed positive causal width on a positive-separation chart, with the conclusion unchanged if a positive spatial core is added
- Standing: priority analysis; not canon and not an EOM solver specification
- Result: no such retained-particle-history functional can equal the complete action variation on arbitrary admissible continuations

## Finding in plain language

The current action is intrinsically two-sided in time. Varying a particle at time $U$ produces one contribution from wakes emitted in the past and received at $U$, plus another contribution from the wake emitted at $U$ and received by a particle in the future.

The second contribution cannot be computed from particle histories ending at $U$. Two candidate evolutions can be identical at every time through $U$ and differ only later; the past contribution is then identical, while the future-reception contribution can differ. Positive wake width and core scale make the integrals finite on regular charts, but they do not change this temporal dependence.

Therefore the existing action cannot be converted into a causal recoil acceleration by rearranging its present variables. A causal completion would need an independently evolving wake state, a different causal action, or a boundary-value law that openly retains future dependence.

Claim classification: **derived no-go theorem for a retained-particle-history reconstruction of the current two-time action**. It is not a no-go theorem for every possible causal wake theory.

## 1. Regularized action variation

Write one regularized action component in the generic ordered form

$$
S_C
=
\frac12
\sum_{i,j}
\int dT\int dS\,
\Theta(T-S)
\mathcal K_{C,ij}^{(\eta,\epsilon_c)}(T,S),
$$

where $T$ is the reception time, $S$ is the emission time, and the kernel depends on the two event positions through their separation and causal residual. The causal width is fixed and positive. The optional symbol $\epsilon_c$ may denote a positive spatial core; on a chart with a positive separation floor it may instead be set to zero.

Vary worldline $k$ at time $U$. Terms with $T=U$ make $k$ the receiver and give the past-reception contribution

$$
\mathbf R_{k}^{\mathrm{past}}(U)
=
\sum_j
\int_{S<U}
\nabla_1
\mathcal K_{C,kj}^{(\eta,\epsilon_c)}(U,S)
\,dS.
$$

Terms with $S=U$ make $k$ the transmitter and give the future-reception contribution

$$
\mathbf R_{k}^{\mathrm{future}}(U)
=
\sum_i
\int_{T>U}
\nabla_2
\mathcal K_{C,ik}^{(\eta,\epsilon_c)}(T,U)
\,dT.
$$

Up to the common Euler sign and coupling convention, the complete action contribution is

$$
\boxed{
\mathbf R_{C,k}(U)
=
\mathbf R_{k}^{\mathrm{past}}(U)
+
\mathbf R_{k}^{\mathrm{future}}(U)
}.
$$

This split occurs before root collapse. It therefore does not depend on a simple-root Jacobian, a fold chart, or a sharp endpoint convention.

## 2. Same-past, different-future proof

Assume there is an admissible future reception of the event $(k,U)$ inside the regularized causal support and that the associated spatial derivative is not identically zero. The existing recoil analyses supply explicit nonzero examples.

Choose two smooth continuation families, $\mathbf X^{(a)}$ and $\mathbf X^{(b)}$, such that

$$
\mathbf X^{(a)}_i(T)
=
\mathbf X^{(b)}_i(T)
\qquad
\text{for every }T\le U,
$$

but perturb one future receiver near a supported time $T_*>U$. The two past-reception integrals are identical because every event they consume lies at or before $U$:

$$
\mathbf R_{k}^{\mathrm{past},(a)}(U)
=
\mathbf R_{k}^{\mathrm{past},(b)}(U).
$$

The future perturbation changes the separation, causal residual, or spatial derivative in the second integral. For a nonzero supported kernel, choose the perturbation along a direction in which that derivative changes. Then

$$
\mathbf R_{k}^{\mathrm{future},(a)}(U)
\ne
\mathbf R_{k}^{\mathrm{future},(b)}(U).
$$

Suppose a functional of retained particle history alone existed:

$$
\mathbf R_{C,k}(U)
=
\mathcal F_k
\left[
\{\mathbf X_i(S):S\le U\}
\right].
$$

The two continuations present exactly the same argument to $\mathcal F_k$, so the functional must give the same value for both. The complete action variation gives different values. This is a contradiction.

Therefore no retained-particle-history functional can reproduce the complete action contribution on both continuations.

Claim classification: **derived**. A representation of the displayed future integral using only the common past data for every admissible pair of continuations would falsify the theorem.

## 3. Why finite width does not restore causality

Positive $\eta$ replaces exact causal-surface support by a finite neighborhood. If supplied, positive $\epsilon_c$ bounds the spatial kernel near coincidence. These changes can make each displayed integral finite and continuous. They do not change the domains $S<U$ and $T>U$ created by varying the reception and emission arguments of the same two-time action.

The no-go theorem therefore applies at fixed positive widths. Taking a sharp limit can add singularities, but it cannot remove the future argument on every regular branch. Conversely, keeping finite physical widths does not by itself turn the action equation into a past-history evolution law.

## 4. Relation to coincident same-source birth

At a same-source root born from the coincident endpoint, the incoming past-reception recoil is computable from the retained history. Its sharp contribution has the forward $t^{-4}$ behavior derived in [Causal-Recoil Asymptotic at Coincident Same-Source Birth](analysis-causal-recoil-coincident-birth-asymptotic.md).

The time-transposed partner belongs to the earlier emission event and its later reception. At that earlier time, the later event is part of $\mathbf R^{\mathrm{future}}$, not retained history. The present theorem shows that this is not a notation problem specific to the local chart; it is the general temporal structure of the action variation.

Thus the existing action supplies neither a causal cancellation of the same-source transition nor a causal conservation acceleration. Its cross-cut symmetry accounts remain valid action identities, but those accounts do not turn the two-sided Euler equation into an initial-history evolution law.

## 5. Remaining causal routes

Three logically distinct routes remain:

1. **Independent wake state.** Introduce wake variables with their own causal evolution and initial data. Derive how emission changes that state, how later reception changes particle acceleration, and how one common state carries energy, momentum, and angular momentum.
2. **Different causal action or evolution principle.** Derive a law whose complete variation or update rule uses only current state and retained past state while reproducing the accepted simple-root acceleration and ordinary-fold impulse.
3. **Two-sided boundary-value theory.** Retain the current action equation and supply past and future boundary data. This is mathematically possible in principle, but it is not the past-history Master Equation proposed in the walkthrough.

The first two routes add or change theory. They cannot be selected by algebraic manipulation of the current action packet.

## 6. Promotion consequence

The proposed scale-only finite-width acceleration remains a causal retained-history equation, but it does not inherit the current action's conservation proof. The recoil-inclusive action equation retains its conservation identities, but it is not a causal retained-particle-history equation.

This closes the proposed “rewrite the existing recoil as a retained-particle-history functional” route with a no-go result. Promotion now requires either an independent causal wake state with conserved accounts or a different conservation derivation for the scale-only equation.

Promotion classification: **priority-only no-go theorem; Master Equation promotion remains blocked on new causal structure rather than further rearrangement of the present action**.
