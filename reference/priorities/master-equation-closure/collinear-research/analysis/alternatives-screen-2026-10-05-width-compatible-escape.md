# Compatible complete histories with proved unbounded escape

This is a second, explicitly different preparation for each of the same four selected finite-width laws. It proves that these unrestricted laws admit complete prepared solutions with unbounded outward speed. It does not establish that the original approaching preparations enter escape; their exact postcontact fate remains a separate target. No coefficient of the response law is adjusted.

## Fixed past family and complete channel census

Keep $c_f=K_{ij}=1$, $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$, both mirror self and opposite-polarity partner channels, and the original triangular reception integral. Put $\delta=1/2048$ and define the right-at-preparation label's complete history, parameterized by $A\in[0,128]$, as follows:

$$
x_A(s)=
\begin{cases}
1/2,&s\le-4/5,\\
1/2-11(q^3-q^4/2),\quad q=(s+4/5)/(11/20),&-4/5\le s\le-1/4,\\
-10-20s,&-1/4\le s\le-\delta,\\
-10-20s-A(s+\delta)^3/(6\delta),&-\delta\le s\le0.
\end{cases}
$$

Its mirror partner is $-x_A$. The transition velocity is $-20(3q^2-2q^3)$, so it joins rest to velocity $-20$ monotonically with zero acceleration at both ends. The final cubic joins the affine portion with zero acceleration and finishes at

$$
x_A(0)=-10-A\delta^2/6,\qquad
x_A'(0)=-20-A\delta/2,\qquad x_A''(0)=-A.
$$

Thus each past is $C^{2,1}$, nonincreasing, and bounded above by $a=1/2$. These are preparation histories; the equation is required from release onward and at the release endpoint by compatibility.

Let $F(A)$ be minus the complete integral acceleration evaluated on this entire past at zero. For $A=0$, the recent affine self support ends at age $h/19<1/4$. Every age in $[1/4,4/5]$ has self range at least five and partner range at least $9.5$, exceeding age by more than $h$, so that transition contributes neither channel. The complete stationary tail supplies an additional self band at range $10.5$ and a partner band at range $9.5$. Both have full triangular mass one. Therefore the exact control is

$$
F(0)=S_{\rm aff}(20)+f_\rho(10.5)-f_\rho(9.5),
\qquad f_\rho(r)=\frac r{(r^2+\rho^2)^{3/2}}.
$$

The old self band is retained; the recent affine formula alone is not the complete self response of this prepared history.

## Unique release-compatible coefficient

The complete displacement perturbation in either channel is at most $|A-B|\delta^2/3$. The previously independently checked global per-channel Lipschitz constant $L<2^{20}$ for all four laws gives

$$
|F(A)-F(B)|\le\frac{2L\delta^2}{3}|A-B|<\frac16|A-B|.
$$

For the affine term, $z=20h/(19\rho)>1$ and $\operatorname{arsinh}(z)/z$ is decreasing, so $1-\operatorname{arsinh}(z)/z>1/10$ (already $\operatorname{arsinh}(1)<9/10$). Since $1/(20h\rho)\ge25.6$, this gives $S_{\rm aff}(20)>2.56$, while $f_\rho(9.5)<1/9.5^2$. Hence $F(0)>0$. Conversely $S_{\rm aff}(20)<1/(20h\rho)\le102.4$ and $f_\rho(10.5)<1/10.5^2$, giving $F(0)<103$. It follows that

$$
F(128)-128<103+128/6-128<0.
$$

The continuous function $F(A)-A$ is strictly decreasing by the contraction estimate. It has exactly one root $A_*\in(0,128)$. At that root the left endpoint acceleration $-A_*$ equals the full law's right acceleration, so the resulting unrestricted global solution is $C^2$ through release. This selects a compatible history coefficient, not a response-law parameter or an outgoing branch rule.

## Derived escape from release

Use the [independently assessed escape criterion](alternatives-screen-2026-10-05-width-escape-criterion.md), with $U=10$, $a=1/2$, and the smaller common recent-window length $\ell_0=1/2048$. The proof of that criterion requires the pre-entry acceleration bound on the recent window, rather than the equation itself there: in this construction $|u'|\le A_*<128<C$, so that requirement holds directly. This is the only replacement of its stated entry hypotheses; the same first-downcrossing proof uses exactly that bound.

For all four laws, $C<2^{14}$, so $\ell_0<U/C$, and $\ell_0<h/(4U)$. The complete history is nonincreasing, its recent speed is at least twenty, and its initial outward distance is at least ten. The uniform near-diagonal self lower bound for this shorter window is smallest at $h=1/16$, $\rho=1/32$, giving

$$
S_0=\frac15\left[32-\frac{32}{\sqrt{1+25/256}}\right]>\frac{32}{125}.
$$

Indeed $1/\sqrt{1+25/256}<24/25$, as follows by squaring positive quantities. Meanwhile the partner upper bound is at most $1/(10-1/2)^2=4/361<32/125$. Every entry inequality is therefore strict for the exact compatible history. Global existence, the first-downcrossing barrier, integrable braking, and the positive affine-self limit yield

$$
u(t)>10,\qquad -x(t)\ge10+10t,\qquad
u(t)\longrightarrow+\infty,\qquad \frac{-x(t)}t\longrightarrow+\infty.
$$

> Claim grade: derived, independent assessment requested. This is an exact compatible-preparation existence theorem for each of the four fixed laws. It supplies no asymptotic growth exponent, no bounded-speed scattering state, and no conclusion about the original approaching preparations. Falsifiers are a missed complete source band in the exact $F(0)$ control, a failed contraction or entry inequality, or a later turn for the constructed exact compatible solution.
