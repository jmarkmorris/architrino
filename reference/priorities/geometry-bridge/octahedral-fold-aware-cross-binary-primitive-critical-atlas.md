# Octahedral Fold-Aware Cross-Binary Primitive Critical Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction](octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md). The predecessor fixes the source-atlas-aware formula for $f_\times$, $C_\times$, $m_Q$, and $M_Q$ on the three quarter cells with root-count vector $[6,4,6]$. This packet advances the remaining primitive-extrema problem by locating the sampled regular zeros of

$$
A'(u)=f_\times(u)
$$

inside those cells and by classifying the fold endpoint one-sided sign turns.

It is a sampled primitive-critical atlas, not an interval critical-exhaustion theorem and not a coarea interval certificate. It does not certify the retained branch.

## Critical Rule

Let

$$
A(u)=\int_0^u f_\times(q)\,dq.
$$

On each regular open quarter cell $I_r$, primitive extrema can occur only where

$$
\boxed{
A'(u)=f_\times(u)=0.
}
$$

The fold endpoints must also remain in the finite candidate set because the $\theta$ projection has one-sided singular behavior there. Therefore, before interval exhaustion is certified, the extrema candidates for $m_Q$ and $M_Q$ are:

$$
\boxed{
\{0,Q\}
\cup
\{u\in I_1\cup I_2\cup I_3:f_\times(u)=0\}
\cup
\{\theta_{3-},\theta_{2+}\}.
}
$$

## Sampled Critical Roots

Using the source-atlas quarter partition,

$$
0<\theta_{3-}\approx0.997370655243
<
\theta_{2+}\approx1.159039827771
<
Q,
$$

the sampled forcing sign scan gives:

| Cell | Interval | Left sign | Right sign | Sampled regular zeros | Primitive role |
| --- | --- | --- | --- | ---: | --- |
| $I_1$ | $[0,\theta_{3-})$ | $+$ | $-$ | $1$ | local maximum candidate |
| $I_2$ | $(\theta_{3-},\theta_{2+})$ | $+$ | $-$ | $1$ | local maximum candidate |
| $I_3$ | $(\theta_{2+},Q)$ | $-$ | $-$ | $0$ | no sampled interior critical root |

The refined sampled roots are

$$
\boxed{
u_1\approx0.129625153956,
\qquad
f_\times(u_1)\approx0,
}
$$

and

$$
\boxed{
u_2\approx1.133431464570,
\qquad
f_\times(u_2)\approx0.
}
$$

Both have the sampled sign transition

$$
+\to-,
$$

so each is a local maximum candidate for the primitive $A$.

## Fold Endpoint Turns

The first fold endpoint has the one-sided sampled sign transition

$$
\theta_{3-}:\quad
-\to+,
$$

so it is a fold-local minimum candidate for $A$.

The second fold endpoint has

$$
\theta_{2+}:\quad
-\to-,
$$

so it remains a fold endpoint limit in the candidate set but is not a sampled local extremum turn. Its role is

$$
\texttt{fold-endpoint-limit-without-extremum-turn}.
$$

## Candidate Set

The sampled primitive-extrema candidate set is therefore

$$
\boxed{
\left\{
0,\ 
0.129625153956,\ 
0.997370655243,\ 
1.133431464570,\ 
1.159039827771,\ 
\frac{\pi}{2}
\right\}.
}
$$

This is a substantial reduction of the future $m_Q$ and $M_Q$ enclosure: the next interval proof must enclose $A$ at these six candidate locations and prove no additional roots of $f_\times$ exist on the three regular cells.

The direct successor [octahedral-fold-aware-cross-binary-critical-value-atlas](octahedral-fold-aware-cross-binary-critical-value-atlas.md) evaluates $A$ at these six locations with transformed sampled quadrature and finds the sampled ordering

$$
A(Q)
<
A(\theta_{3-})
<
A(\theta_{2+})
<
A(u_2)
<
A(0)
<
A(u_1).
$$

It preserves that interval quadrature and interval critical exhaustion remain open.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-primitive-critical-atlas.mjs) emits:

- predecessor validation for the source-atlas quarter-cell reduction;
- no-fixed-speed-window atlas parameters;
- the primitive critical rule $A'(u)=f_\times(u)=0$ on regular open cells;
- sampled critical counts $[1,1,0]$ across the three cells;
- refined sampled roots $u_1$ and $u_2$ with sign transitions;
- one-sided fold endpoint sign rows;
- the six-point sampled primitive-extrema candidate set;
- non-retention and non-interval boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-primitive-critical-atlas.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-primitive-critical-atlas.test.js) verifies predecessor validation, speed-window removal, the primitive critical rule, sampled critical counts, refined roots, fold endpoint turns, the six-point candidate set, CLI emission, JSON validation, and non-retention claims.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_sampled\_primitive\_critical\_atlas=true},
$$

$$
\texttt{certifies\_sampled\_interior\_critical\_counts=true},
$$

and

$$
\texttt{certifies\_fold\_endpoint\_turn\_classification=true}.
$$

It does not certify:

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{sampled-source-atlas-aware-primitive-critical-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it reduces the primitive-extrema problem for $m_Q$ and $M_Q$ to a sampled finite candidate set tied to the source-atlas quarter cells. Its direct successor evaluates the sampled candidate values. Neither packet should be promoted into reader-facing AAA prose until the candidate set is upgraded into interval critical exhaustion and interval enclosures for $C_\times$, $m_Q$, and $M_Q$.
