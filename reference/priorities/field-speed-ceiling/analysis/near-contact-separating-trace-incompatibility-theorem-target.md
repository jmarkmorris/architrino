# Near-Contact Separating-Trace Incompatibility Theorem Target

**Date:** 2026-07-31 **Status:** queued prove-or-refute theorem target; FSC-006a provenance and positive-range convergence prerequisite complete; consumes the constructed FSC-006b exact-event restart but remains blocked on its independent review and local-uniqueness boundary; no result claimed **Claim level:** proposed theorem program **Origin:** finding 9 of the [Jack K. Hale review](../reviews/jack-k-hale-review-response-2026-07-31.md), revised by finding 7 of the [Lars Hörmander review](../reviews/lars-hormander-review-response-2026-07-31.md), and narrowed by the [Albert Einstein second review](../reviews/albert-einstein-second-review-response-2026-08-01.md) **Scope:** exact mirror-collinear partner contact under the unchanged ordinary positive-separation causal-root law, with normalized $c_f=1$

## Target question

Within a declared BV-velocity/vector-Radon solution class, does every sufficiently regular separating right trace compatible with the outgoing contact one-jet generate, in both ordered partner channels, an uncancelled speed-reducing complete-ledger term proportional to $\delta^{-2}$? If so, that trace cannot be a locally finite projected solution unless a separately typed competing stratum, event, or leading cancellation changes the update.

This is a theorem target, not a result. The endpoint reanalysis proves the $\delta^{-2}$ statement only for one prescribed unaccelerated straight separating trace. The target does not claim that every continuation is impossible or that the proposed contact coefficient is invalid.

Plainly: the narrow question is whether the unchanged received ledger makes every regular separating trace in one specified solution class too singular. It is not a universal no-continuation theorem.

## Candidate trace and solution class

Set $T_{\mathrm c}=0$ and $c_f=1$. The reset supplies only

$$
\mathbf X_1(0)=\mathbf X_2(0)=\mathbf X_{\mathrm c},
\qquad
\mathbf V_1(0^{+})=\mathbf e,
\qquad
\mathbf V_2(0^{+})=-\mathbf e.
$$

The initial theorem attack should use:

1. Lipschitz paths with $\mathbf V_i\in BV([0,\varepsilon];\mathbb R^3)$, so $D\mathbf V_i$ is a finite vector Radon measure;
2. a regular subclass $\mathbf X_i\in C^{1,\alpha}([0,\varepsilon];\mathbb R^3)$, $\alpha>0$, for the root asymptotics;
3. $\|\mathbf V_i(T)\|\le1$ and strict label separation for $T>0$;
4. separately labeled source measures $\mathsf E_{j,s}$ retained for every admitted $s\in[0,T)$, including the nonzero contact-time record $\mathsf E_{j,0}$;
5. no undeclared reset on $(0,\varepsilon]$;
6. every competing ordinary, degenerate isolated, characteristic-interval, diagonal, or cross-channel stratum explicitly routed by the FSC-006 ownership interface; and
7. the complete raw ledger, rather than a single selected row, satisfying the leading-asymptotic and sign hypotheses below.

Items 4–7 are assumptions to prove, weaken, or refute. They do not follow from the outgoing contact one-jet.

## Both ordered root equations

For $i\in\{1,2\}$, let $j=3-i$. At receiver time $T=\delta>0$, define

$$
g_{i\leftarrow j}(\delta,s)
=
\left\|
\mathbf X_i(\delta)-\mathbf X_j(s)
\right\|
-
(\delta-s),
\qquad
s\in[0,\delta].
$$

The endpoint $s=\delta$ is used only for the continuity sign test; ordinary positive-delay candidates satisfy $s<\delta$.

The proposed root route for each ordered channel is:

1. use the speed bound to obtain $g_{i\leftarrow j}(\delta,0)\le0$;
2. use strict separation to obtain $g_{i\leftarrow j}(\delta,\delta)>0$;
3. obtain at least one root $s_{i,\delta}\in[0,\delta)$ by continuity;
4. prove isolation, uniqueness in the near-contact stratum, and $s_{i,\delta}=o(\delta)$;
5. prove $R_{i,\delta}=\delta-s_{i,\delta}\sim\delta$ and $D_{t,i}(\delta,s_{i,\delta})\to2$; and
6. retain the source label and ordered-channel provenance of that root in the receiver measure.

The moving root $s_{i,\delta}$ is not the contact-time emission $s=0$ unless the root equation proves equality. Retaining $\mathsf E_{j,0}$ preserves source provenance but does not by itself make $s=0$ the received root.

## Per-channel sign hypothesis

For each ordered channel, the candidate asymptotic is

$$
\mathbf a_{i\leftarrow j}(\delta)
=
\frac{\mathbf b_{i\leftarrow j}}{\delta^2}
+
o(\delta^{-2}),
\qquad
\mathbf V_i(0^{+})\mathbin{\cdot}
\mathbf b_{i\leftarrow j}<0.
$$

The negative dot product is a hypothesis to derive from the declared polarity, direction, and root asymptotics in both channels. A magnitude result alone is insufficient.

## Complete-ledger hypothesis

Let every ordinary and separately routed competing contribution be included before the proposed tangent-cone response. The required no-leading-cancellation condition is

$$
\mathbf A_i^{\mathrm{raw}}(\delta)
=
\frac{\mathbf b_i}{\delta^2}
+
o(\delta^{-2}),
\qquad
\mathbf p_i
=
\mathcal P_{\mathbf V_i(0^{+})}(\mathbf b_i),
\qquad
\mathbf V_i(0^{+})\mathbin{\cdot}\mathbf p_i<0.
$$

Here $\mathbf b_i$ is the sum of every order-$\delta^{-2}$ coefficient, including both the partner term and any competing stratum assigned to the ordinary pre-response ledger. The strict sign implies $\mathbf p_i\ne\mathbf0$ and says that the proposed projection retains a speed-reducing leading term. This condition must be proved for both receivers; it cannot be inferred from one row or from root counts.

For any finite ledger at a fixed cap direction,

$$
\mathcal P_{\mathbf V}(\mathbf b)=\mathbf0
\quad\Longleftrightarrow\quad
\mathbf b=\lambda\hat{\mathbf v},
\qquad
\lambda\ge0.
$$

Thus a nonzero transverse or backward leading coefficient is an exact leading- order obstruction. Conversely, a purely forward coefficient removes only the displayed leading term. It is not sufficient for a finite effective Radon measure: the projected $o(\delta^{-2})$ remainder may still be nonintegrable. The theorem or its refutation must therefore control the response direction and the remainder, not only $\mathbf b_i$.

Under these hypotheses,

$$
\mathbf A_i^{\mathrm{eff}}(\delta)
=
\frac{\mathbf p_i}{\delta^2}
+
o(\delta^{-2}),
$$

so its receiver-time variation is not locally finite:

$$
\int_0^\varepsilon
\left\|
\mathbf A_i^{\mathrm{eff}}(\delta)
\right\|\,d\delta
=
\infty.
$$

That contradicts the requirement that $D\mathbf V_i$ be a finite vector Radon measure for a BV velocity.

Plainly: the contradiction appears only after the full leading ledger is known, its sign is known, and cancellation has been ruled out. One singular row by itself is not enough.

## Required lemmas

1. **Two-channel root-existence lemma.** Establish a positive-delay partner root in both $1\leftarrow2$ and $2\leftarrow1$.
2. **Root/source distinction lemma.** Preserve $\mathsf E_{j,0}$ while identifying the actual received root $s_{i,\delta}$ without equating them by assumption.
3. **Asymptotic root-location lemma.** Prove $s_{i,\delta}=o(\delta)$ and $R_{i,\delta}\sim\delta$ in both channels.
4. **Uniform transversality and isolation lemma.** Prove $D_{t,i}\ge d_0>0$ and separate the roots from all competing strata.
5. **Per-channel sign lemma.** Derive $\mathbf V_i(0^+)\cdot\mathbf b_{i\leftarrow j}<0$ from the declared channel data.
6. **Source-provenanced measure lemma.** Realize the split simple roots as the labeled receiver measures required by FSC-006.
7. **Complete-leading-ledger lemma.** Classify every order-$\delta^{-2}$ contribution and prove the displayed no-leading-cancellation condition after competing-stratum routing.
8. **BV/Radon contradiction.** Show that the retained leading term is incompatible with finite total variation of $D\mathbf V_i$.
9. **Response-remainder lemma.** Use finite-ledger response continuity and the cap-direction limit to justify the projected asymptotic. If the leading coefficient is purely forward, prove or refute local integrability of the projected remainder rather than declaring the response measure finite.

## Refutation routes

The theorem target is refuted by one admissible trace in the declared class for which:

- either ordered partner root does not exist;
- the relevant roots fail isolation, transversality, or the stated range asymptotic;
- the per-channel signed coefficient is not speed-reducing;
- a separately owned competing stratum changes the leading balance;
- the complete ledger has a canonical leading cancellation before projection;
- the source-provenanced receiver measures fail the FSC-006 weak-limit formulation;
- after a purely forward leading cancellation, the projected remainder nevertheless defines a finite vector Radon measure; or
- another declared reset occurs before the ordinary near-contact chart forms.

A trace that changes the reset, merges source labels, drops an ordinary root, or silently removes a competing stratum is not an admissible counterexample.

## Exact limited conclusion

If every lemma is proved, the conclusion is only:

> No separating right trace in the declared regular subclass can be a BV-velocity/vector-Radon projected solution on $[0,\varepsilon]$ while preserving the unchanged ordinary ledger, the FSC-006 ownership rules, the displayed two-channel sign hypotheses, and the complete-ledger no-leading-cancellation condition without another declared event.

The conclusion would not establish a universal continuation no-go, choose a terminal or rebound outcome, invalidate the proposed zero event coefficient, or establish a regulator-independent contact measure.

## Dependencies and acceptance boundary

FSC-005 now consumes FSC-006a's completed source-provenanced far-part theorem and exact endpoint residue. FSC-006b now supplies a proposed typed exact-event family, competing-stratum ownership rule, and right-trace restart in the [mathematics packet](../mathematics-geometry-dynamical-system.md). It also uses the [endpoint reanalysis](capped-collinear-endpoint-reanalysis.md) only for the prescribed straight-trace calculation and MEC-007 only for the conditional incoming threshold history.

`Advanced` would require either:

1. proofs of all nine lemmas with both ordered channels and the complete leading ledger explicit; or
2. one complete counterexample satisfying the candidate trace, source, ownership, competing-stratum, and measure assumptions.

The prescribed straight trace, a sampled numerical trace, root-count convergence, or an argument from the outgoing one-jet alone remains `Not advanced`.

Closure goal: reconcile the constructed FSC-006b restart, then prove or refute the limited two-channel BV/Radon incompatibility with leading and remainder control and without assuming a continuation outcome.
