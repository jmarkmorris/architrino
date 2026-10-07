# Source clocks and logarithmic position corrections in the proved canonical dispersal

**Derived asymptotic candidate, awaiting independent assessment.** The accepted nominal and spatial dispersal theorem supplies two distinct terminal velocity vectors. That fact determines the leading partner-source clock ratios and acceleration coefficients algebraically. Integrating the actual inverse-square acceleration then gives a logarithmic correction to each asymptotically linear position. This is a theorem about the same proved futures, not a new preparation or a numerical extrapolation.

## Fixed case and inherited all-future domain

Retain exactly the canonical opposite-polarity pair, literal coefficients and complete histories of the [nominal assessment](overnight2-a-reference-nominal-phase-fate.md) and [spatial assessment](overnight2-a-reference-spatial-phase-transport.md). Wake speed and reference radius are $c_f=R_0=1$. The [quantitative assessment](overnight2-a-reference-quantitative-terminal-speed.md) gives

$$
V_i(T)\longrightarrow v_i,\qquad
U_\infty=v_+-v_-=\delta N,\qquad \delta>10^{-21},\quad |N|=1,
$$

and all generated speeds are below $\beta=1/20$. The remote supplied past keeps its own strict bound; it is not assigned $\beta$. The exact ordinary row remains

$$
A_i(T)=-\frac{K n_i(T)}{R_i(T)^2D_i(T)},\qquad
R_i=T-\tau_i=|X_i(T)-X_j(\tau_i)|,
\quad D_i=1-n_i\cdot V_j(\tau_i).
\tag{1}
$$

There is one partner root per receiver and no positive-delay self root on the complete joined history. The account-zero event is past; the present argument uses only the established all-future subfield dispersal and velocity limits, not an all-future angular floor.

All asymptotic constants below may depend on the actual member and its unknown terminal vectors. No numerical terminal direction, practical starting time or evaluated error prefactor is claimed. The logarithm uses the inherited dimensionless time; equivalently it is $\log(T/T_{\rm ref})$ for a fixed unit reference time. Changing that reference changes the constant position term, not an acceleration coefficient.

## Late source coverage and the first decay bound

The terminal limits give $X_i(T)=v_iT+o(T)$ and $d(T)/T\to\delta>0$. Before applying the smaller generated speed bound to a delayed source, establish that the source is generated. The source residual at zero is

$$
T-|X_i(T)-X_j(0)|\ge(1-\beta)T-C>0
$$

for sufficiently large $T$, using the already bounded generated velocity. Strict root monotonicity therefore puts $\tau_i(T)>0$. Applying the same speed bound to both generated positions then yields

$$
\tau_i(T)\ge\frac{(1-\beta)T-C}{1+\beta}.
\tag{2}
$$

Thus sources tend to infinity proportionally to reception time. No remote history is deleted by convention.

On that tail the exact source chord gives $R_i\ge d/(1+\beta)$ and $D_i\ge1-\beta$. Eventually $d\ge\delta T/2$, so

$$
|A_i(T)|\le\frac{4K(1+\beta)^2}{(1-\beta)\delta^2T^2}.
\tag{3}
$$

Integrating the actual velocity tail gives $V_i(T)=v_i+O(T^{-1})$. A further integration from a fixed late time gives

$$
X_i(T)=v_iT+O(\log T).
\tag{4}
$$

This order of reasoning first proves the acceleration bound from separation and root coverage, then improves the position error. It does not infer acceleration decay merely from existence of a velocity limit.

## Exact limiting causal geometry

Define $\lambda_i\in(0,1)$ as the root of

$$
1-\lambda_i=|v_i-\lambda_i v_j|.
\tag{5}
$$

The left-minus-right function is strictly decreasing with difference slope at most $-(1-\beta)$, positive at zero and negative at one because $v_i\ne v_j$. Hence its root exists uniquely. Set

$$
\ell_i=1-\lambda_i,\quad
n_i^\infty=\frac{v_i-\lambda_i v_j}{\ell_i},\quad
D_i^\infty=1-n_i^\infty\cdot v_j,
\quad B_i=-\frac{K n_i^\infty}{\ell_i^2D_i^\infty}.
\tag{6}
$$

All denominators are positive: $\ell_i>0$, $D_i^\infty\ge1-\beta$. Evaluating the actual source residual at the trial time $\lambda_iT$ and using (4) gives a residual $O(\log T)$. Its source derivative has modulus at least $1-\beta$ throughout the intervening generated interval. Consequently

$$
\tau_i(T)=\lambda_iT+O(\log T),\quad
R_i(T)=\ell_iT+O(\log T),
$$
$$
n_i(T)=n_i^\infty+O(\log T/T),\quad
D_i(T)=D_i^\infty+O(\log T/T).
\tag{7}
$$

The source velocity discrepancy is $O(1/T)$ by (2)–(3); the direction discrepancy accounts for the larger logarithmic allowance. The root derivative estimate applies on positive trial and actual source times for all sufficiently large receptions. Substitution into the full row (1) therefore gives

$$
A_i(T)=\frac{B_i}{T^2}+O\left(\frac{\log T}{T^3}\right).
\tag{8}
$$

## Integrated trajectories and radial approach

Integrating (8) to the actual terminal velocity and then integrating the remaining absolutely integrable position discrepancy gives constants $C_i\in\mathbb R^3$ with

$$
V_i(T)=v_i-\frac{B_i}{T}
+O\left(\frac{\log T}{T^2}\right),
$$
$$
X_i(T)=v_iT-B_i\log T+C_i
+O\left(\frac{\log T}{T}\right).
\tag{9}
$$

Indeed the derivative of $X_i-v_iT+B_i\log T$ is $O(\log T/T^2)$, whose tail integral is $O(\log T/T)$. This proves existence of each $C_i$ rather than treating it as a fitted integration constant. The position does not approach a straight ray with bounded offset unless the nonzero logarithmic term is removed.

For explicit relative coefficients, write

$$
W_\infty=(v_++v_-)/2=aN+b,\qquad b\cdot N=0,
\qquad g=\sqrt{1-|b|^2}.
$$

The limiting chords and delays from (5)–(6) can be evaluated directly:

$$
n_+^\infty=gN+b,\qquad n_-^\infty=-gN+b,
$$
$$
\ell_+=\frac{\delta}{g-a+\delta/2},\qquad
\ell_-=\frac{\delta}{g+a+\delta/2},
$$
$$
D_+^\infty=g(g-a+\delta/2),\qquad
D_-^\infty=g(g+a+\delta/2).
\tag{10}
$$

For example the plus chord satisfies $\ell_+n_+^\infty=\delta N+\ell_+v_-$; its norm is one because $g^2+|b|^2=1$. Its positive solution is the unique root already established, so no second branch is selected.

Put $B=B_+-B_-$ and $C=C_+-C_-$. Subtraction of (6) using (10) gives

$$
B=-\frac{K(2g+\delta)}{\delta^2}N
+\frac{2Ka}{g\delta^2}b.
\tag{11}
$$

Thus the asymptotic relative acceleration is generally not central when the limiting midpoint velocity has both radial and transverse components. The second term is derived from the unchanged transmitter weighting and both actual source clocks, not an added receiver response.

Equations (9)–(11) imply

$$
d(T)=\delta T+\frac{K(2g+\delta)}{\delta^2}\log T
+N\cdot C+O\left(\frac{(\log T)^2}{T}\right),
$$
$$
u(T)=d'(T)=\delta+\frac{K(2g+\delta)}{\delta^2T}
+O\left(\frac{(\log T)^2}{T^2}\right).
\tag{12}
$$

The second line follows directly from $u=(Z/|Z|)\cdot U$ and (9), not from differentiating a big-O remainder. The relative transverse speed is $O(\log T/T)$. In the exact radial identity $u'=N(T)\cdot A_{\rm rel}+|U-uN(T)|^2/d$, this gives

$$
u'(T)=-\frac{K(2g+\delta)}{\delta^2T^2}
+O\left(\frac{(\log T)^2}{T^3}\right).
\tag{13}
$$

Consequently the actual separation speed eventually approaches its positive limit from above and is decreasing. Earlier inward motion or account-stage turning is not excluded by this eventual statement.

## What does and does not follow about the orbital plane

The physical relative angular vector $\boldsymbol H=Z\times U$ obeys, directly from (9),

$$
\boldsymbol H(T)
=\delta N\times B\,(\log T-1)+C\times\delta N
+O\left(\frac{\log T}{T}\right).
\tag{14}
$$

If $a b\ne0$, (11) makes the leading cross product nonzero. Then its unit direction converges to the direction of $aN\times b$, although its magnitude grows logarithmically. If $a b=0$, the logarithmic cross product vanishes and $\boldsymbol H$ has the finite limit $C\times\delta N$. A nonzero such limit supplies a limiting unit normal; if it vanishes, (14) alone supplies no unit-normal conclusion. Thus neither a universal finite angular limit nor a universal limiting plane is asserted. The terminal vectors and $C$ have not been computed for the nominal member.

This distinction also explains why the earlier transported-frame proof did not need a fixed physical plane: its finite phase comparison and all-future dispersal are valid regardless of which asymptotic angular case occurs.

## Analytical controls, scope and falsifiers

A constant-velocity source and receiver with distinct velocities pass (5)–(7) exactly with positions $v_iT$: the root scales linearly and the algebraic row equals $B_i/T^2$. This is a control of the causal geometry and response formula, not a claim that the straight pair solves its nonzero acceleration equation. For $W_\infty=0$, (10) reduces to the two opposite axial chords and (11) gives $B=-K(2+\delta)N/\delta^2$. The extra $\delta$ is the retained finite source-velocity weighting. The elementary integrals of $T^{-2}$ and $(\log T)T^{-3}$ fix the signs in (9). Expanding $Z\times U$ fixes both the logarithmic and constant terms in (14).

The whole conclusion is analytical and conditional only on already accepted nominal/spatial fate premises. It does not assign a numerical terminal vector, enlarge the complete-history neighborhood, use a uniform smaller margin for the remote past, or supply a superfield continuation. Falsifiers include a late source failing (2), a residual slope smaller than its complete generated bound, an omitted source-velocity term in (7), a nonunique positive root of (5), a sign error in (10)–(11), or differentiating an uncontrolled remainder in deriving (12)–(14). Each step is displayed for separate review. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns acceptance and integration. No new numerical instrument or physical trajectory is launched.
