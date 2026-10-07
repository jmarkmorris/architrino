# Complete root exclusion using a feasible comparison path

## The unresolved interpolation premise

The [first finite-history comparison](overnight-d-finite-history-error.md) permits a position reference $Q_j$ whose derivative is slightly outside the unit velocity ball, together with a feasible comparison velocity $W_j$. Its error inequality explicitly retains the kinematic defect $\rho_j^x=Q_j'-W_j$. Feasibility of $W_j$ does not make the causal gap formed from $Q_j$ globally monotone. A complete approximate root census therefore remains necessary before the selected approximate row can be called the complete row.

This note derives sufficient complete-exclusion tests using a feasible auxiliary position path and the accumulated kinematic defect. The [independent review](overnight2-d-feasible-proxy-independent-review.md) accepts both the uniform-distance proof and the sharper correlated-increment proof below, including exact overspeed and multiple-root controls. Neither changes the physical equation, the original preparation, or the reference position evaluated in the acceleration residual. Units are $c_f=1$. No target application, trajectory extension, or improvement in a physical error allowance is claimed. The [locally conditioned root test](overnight2-d-local-causal-root-enclosure.md) is the zero-defect case with an already feasible reference position.

## A feasible path and its position discrepancy

Fix reception time $t\ge0$. Assume the reference position $Q_j$ is continuous and locally absolutely continuous on its complete past, has bounded sufficiently distant negative history, and has speed at most one on negative time. Let $W_j$ be a measurable feasible velocity on $[0,t]$, so $|W_j(s)|\le1$ almost everywhere. Define an auxiliary position path by

$$
\widehat Q_j(s)=Q_j(s)\quad(s\le0),\qquad
\widehat Q_j(s)=Q_j(0)+\int_0^s W_j(u)\,du\quad(0\le s\le t).
$$

The two traces agree at zero, and the complete auxiliary path is globally 1-Lipschitz. Define a nonnegative verified bound

$$
\varepsilon_j(t)\ge\int_0^t|Q_j'(u)-W_j(u)|\,du.
$$

Then $|Q_j(s)-\widehat Q_j(s)|\le\varepsilon_j(t)$ for every $s\le t$, including the exact zero discrepancy on negative time. This is a bound on a mathematical auxiliary path, not an assertion that the actual source follows it. For the feasible projection $W_j=\Pi_B(Q_j')$, the integrand is exactly $(|Q_j'|-1)_+$. If intervals of widths $h_k$ cover $[0,t]$ and have verified speed upper bounds $L_k$, their outward sum $\sum_k h_k\max(L_k-1,0)$ bounds the exact defect integral. Choose $\varepsilon_j(t)$ at least as large as that outward sum. A loose whole-history speed bound may make this test unhelpful, which is a quantitative limitation rather than permission to ignore the defect.

## Complete exclusion from two endpoint margins

Fix the reference receiver position $x_0=Q_i(t)$ and a translation $x_\theta=x_0+\theta p$, where $0\le\theta\le1$ and $|p|\le P$. For delays $r\ge0$, define

$$
F_\theta(r)=r-|x_\theta-Q_j(t-r)|,
\qquad
\widehat F_\theta(r)=r-|x_\theta-\widehat Q_j(t-r)|.
$$

The feasible auxiliary path makes $\widehat F_\theta$ globally nondecreasing. The original $F_\theta$ need not be monotone globally. The reverse triangle inequality gives $|F_\theta(r)-\widehat F_\theta(r)|\le\varepsilon_j(t)$ and $|F_\theta(r)-F_0(r)|\le P$.

Suppose a finite bracket $0<a<b$ satisfies the strict outward endpoint tests

$$
F_0(a)+P+2\varepsilon_j(t)<0,
\qquad
F_0(b)-P-2\varepsilon_j(t)>0.
$$

For every $0\le r\le a$, monotonicity of the auxiliary gap gives

$$
F_\theta(r)\le\widehat F_\theta(r)+\varepsilon_j(t)
\le\widehat F_\theta(a)+\varepsilon_j(t)
\le F_0(a)+P+2\varepsilon_j(t)<0.
$$

The same argument with reversed inequalities gives $F_\theta(r)>0$ for every $r\ge b$. Thus no original-reference root lies outside the bracket, for any allowed translation. The factor two pays separately for the auxiliary discrepancy at the bracket endpoint and at the exterior delay; omitting one payment is not justified by a uniform discrepancy bound alone.

Inside the bracket, require nonzero source distance and a positive ordinary position-root factor almost everywhere:

$$
1-n_\theta(r)\cdot Q_j'(t-r)\ge d>0,
\qquad
n_\theta(r)=\frac{x_\theta-Q_j(t-r)}{|x_\theta-Q_j(t-r)|}.
$$

Absolute continuity makes $F_\theta$ strongly increasing there. Its strict endpoint signs give exactly one root in the bracket, and the preceding exterior exclusion makes that root complete. Both one-sided velocity bounds and all intersected source pieces must be covered. The derivative in this test is $Q_j'$, not $W_j$.

For a candidate delay $r_c$ with $|F_0(r_c)|\le e_c$, a sufficient proposed half-width is any $0<\delta<r_c$ for which the local factor is verified throughout the full translated bracket and

$$
d\delta>e_c+P+2\varepsilon_j(t).
$$

This implies the two strict endpoint margins above. As with the earlier local test, the factor must be verified on the proposed enlarged region before the formula is used as a certificate. The two-point displacement estimate between translated roots then follows from the same local strong monotonicity. No global strict-speed denominator is used.

## Sharper test using the integrated defect

The preceding argument uses only the uniform distance between two paths and pays that distance twice. The integrated-defect hypothesis provides stronger information: the discrepancies at different source times are increments of the same integral. Extend $W_j$ to negative time by $Q_j'$ and set $\rho_j^x=0$ there. For delays $r_2>r_1\ge0$, absolute continuity and feasible $W_j$ give

$$
|Q_j(t-r_1)-Q_j(t-r_2)|\le r_2-r_1+\int_{t-r_2}^{t-r_1}|\rho_j^x(u)|\,du.
$$

The reverse triangle inequality therefore yields

$$
F_\theta(r_2)-F_\theta(r_1)\ge-\int_{t-r_2}^{t-r_1}|\rho_j^x(u)|\,du.
$$

Define verified nonnegative upper bounds $E_L$ and $E_R$ for the two exterior source windows:

$$
E_L\ge\int_{\max(0,t-a)}^t|\rho_j^x(u)|\,du,
\qquad
E_R\ge\int_0^{\max(0,t-b)}|\rho_j^x(u)|\,du.
$$

Applying the increment inequality between $r$ and $a$ when $r\le a$, and between $b$ and $r$ when $r\ge b$, proves the complete exterior bounds

$$
F_\theta(r)\le F_0(a)+P+E_L\quad(0\le r\le a),
\qquad
F_\theta(r)\ge F_0(b)-P-E_R\quad(r\ge b).
$$

Hence strict negativity of the first right-hand side and strict positivity of the second exclude every exterior root. The same positive local position-root factor proves exactly one interior root. The common full-history allowance $\varepsilon_j(t)$ bounds each exterior integral and therefore suffices once in each endpoint test. A candidate half-width may use the sufficient condition $d\delta>e_c+P+\varepsilon_j(t)$, or replace that full-history allowance by $\max(E_L,E_R)$ when the proposed bracket's exterior windows are explicitly bounded. The factor and windows must be verified on the chosen bracket, not inferred from nominal values.

This is the preferred test when the certified information is the kinematic-defect integral. A mere uniform position-discrepancy bound cannot be charged once: the independent review gives an exact piecewise-linear example with discrepancy at most $1/4$, three reference roots, and misleading one-payment endpoint signs around only one root. Its defect integral is one, so the correlated test correctly rejects it. The two tests have different information requirements.

As a positive exact control, let $Q(s)=(\tfrac54\min(\max(s,0),1),0,0)$, take $W=(1,0,0)$ on $(0,1)$ and zero elsewhere, and use reception time three and receiver $(0,2,0)$. The defect integral is $1/4$. The bracket $[7/4,3]$ has zero defect in both exterior source windows and local factor at least one. Its unique complete root is $(25-4\sqrt{21})/3$. The review independently verifies this root and the endpoint signs. This control is comparison geometry with a genuinely overspeed reference; it is not a selected physical trajectory or an eight-member result.

## Relation to the existing ceiling error comparison

The [geometry-preserving comparison](overnight-d-finite-geometry-enclosure.md#translating-one-receiver-while-holding-a-reference-source-path-fixed) already distinguishes the reference position derivative from the feasible velocity entering the acceleration denominator. Its root derivative uses $Q_j'$, its velocity denominator uses $W_j+z$, and the source derivative in its receiver matrix is $W_j'$. With $z=V_j(s)-W_j(s)$ at the actual source time, its endpoint identity remains the appropriate one. The auxiliary position $\widehat Q_j$ is used only to exclude other roots; substituting it into that residual or those matrices would define a different comparison and requires a separate analysis.

The existing comparison still needs interval bounds on $W_j'$, kinematic and acceleration defects, positive acceleration denominators, complete translated regions, source-kick terms, and the normal-cone complementarity allowance. It also needs the declared regularity of $W_j$ for its derivative argument; mere measurable feasibility suffices only for the root-exclusion lemma above. Initialization and every reference-velocity jump must be accounted for, and final velocity bounds must be converted back to the derivative used by the tail neighborhood. None of those obligations is discharged by root exclusion alone.

Falsifiers for an application include an underbounded defect integral, a speed violation by the auxiliary velocity, a position discontinuity at zero, a nonstrict endpoint margin, an omitted source piece, a nonpositive local position-root factor, or an exterior root despite the asserted complete premises. Failure of the test supplies no physical obstruction or continuation through an undefined domain.
