# A length bound for parameters left unresolved by the gradient phase test

**Derived candidate, awaiting independent assessment.** This final bounded analytical question ends by 08:25 UTC and remains subordinate to the unchanged E observation. It concerns only the already fixed degree-five complete preparation family on $0<\epsilon\le e_0=2^{-200000}$. No new equation, history construction, source rule, numerical evaluator or trajectory is selected. The independent worker received the question before this subject was disclosed.

Let $\Theta(\epsilon)$ be the entire accepted finite critical expression from the [interval proof](authorized-cases-ten-hour-b-positive-interval-candidate.md), retaining its prepared phase, all finite coefficients, logarithms and reciprocal endpoint correction. The prospective conclusions are strict monotonicity and an explicit bound on the ordinary length of the parameter set not classified by its sufficient positive-speed test. Length on this parameter axis is not a physical probability or population assertion.

## 1. Bound the full remainder before differentiating

The [independent interval reference](authorized-cases-ten-hour-reference-b-positive-interval-blind.md) proves the needed complex domain at $e_0$. Its coefficient estimates also apply to every real center $0<e\le e_0$: all smallness bounds strengthen as the center decreases. On $|z-e|\le e/4$, retain its notation

$$
q(z)=z^3Z(z),\quad \delta(z)=zd(z),\quad
A(z)=Z_r(z)^2+Z_i(z)^2,\quad I(z)=z^6A(z),\quad x(z)=z^2A(z)^{1/3}.
$$

The same analytic branches, straight complex slow path and nonzero denominators remain valid. The exact normalized phase polynomial has constant coefficient

$$
\mathcal T_0(I)=\frac{1-I}{4}.
\tag{1}
$$

This follows from the known comparison $F=0$, $H=1/2$, $k=1$; it is also part of the independently audited endpoint identity. Its leading initial input is $Z(0)=-8i/3$ and $d(0)=1$. Therefore the dominant full phase coefficient is

$$
C=\frac1{4(64/9)}=\frac9{256}.
$$

The derivative conclusion below does not follow from this leading coefficient alone. It requires the following uniform remainder estimate.

The accepted coefficient norm gives $|Z+8i/3|<2^{4097}e$, $|A-64/9|<2^{4101}e$, and $|d-1|<2^{4097}e^2$. The last bound uses the independently checked vanishing coefficient of $z^2$ in $\delta(z)$. In particular $|Ad^3|>1$ and

$$
|Ad^3-64/9|<2^{4103}e.
\tag{2}
$$

The same normalized slow integral as in the interval reference has modulus below 64 on the auxiliary disk $|\zeta|\le\rho=2^{-10000}$. Its positive Taylor powers through thirteen satisfy

$$
|\mathcal T_{13}(I,\delta)-\mathcal T_0(I)|
\le\frac{64v}{1-v}<2^{10008}e,
\qquad v=|\delta|/\rho\le2e/\rho.
\tag{3}
$$

Since $|I|/4<8e^6$, equations (1)–(3) imply

$$
\left|\frac{\mathcal T_{13}}{Ad^3}-C\right|<2^{10010}e.
\tag{4}
$$

Multiplying the exact finite phase expression by $z^9$ gives

$$
z^9\Theta(z)=z^9(\psi_0(z)-\pi)
+\frac{\mathcal T_{13}(I(z),\delta(z))}{A(z)d(z)^3}
+\frac{5z^6}{8d(z)A(z)^{1/3}k_{13}(I(z),\delta(z))}.
\tag{5}
$$

The initial analytic phase has modulus below four, and the other already proved complex margins include $|k_{13}|>3/4$. Thus the first and third terms of (5) are below $64e^9$ and $10e^6$ in modulus. Combining them with (4), define the holomorphic remainder

$$
G(z)=z^9\Theta(z)-C,
\qquad |G(z)|<2^{10012}e
\quad (|z-e|\le e/4).
\tag{6}
$$

All retained corrections are present in this estimate. No Laurent term or logarithm is discarded, and no derivative is inferred from a numerical sample.

## 2. A rigorous derivative sign

Cauchy's derivative estimate at the real center gives $|eG'(e)|<2^{10014}e$. Differentiate the exact identity $\Theta(\epsilon)=\epsilon^{-9}[C+G(\epsilon)]$. Equation (6) yields

$$
\left|\epsilon^{10}\Theta'(\epsilon)+\frac{81}{256}\right|
<2^{10017}\epsilon.
\tag{7}
$$

At every $0<\epsilon\le e_0$, the right side is at most $2^{-189983}<1/256$. In particular,

$$
-\frac12\epsilon^{-10}<\Theta'(\epsilon)<-\frac14\epsilon^{-10}.
\tag{8}
$$

The full finite phase is strictly decreasing as the preparation parameter increases, and $\epsilon^9\Theta(\epsilon)\to9/256$ as $\epsilon\downarrow0$. This is a statement about its complete comparison expression. It is not monotonicity of an actual terminal speed or an actual trajectory phase.

The exact leading control $\Theta=C\epsilon^{-9}$ has $\epsilon^{10}\Theta'=-81/256$ and lies strictly inside (8). The independent interval construction supplies the analytic-domain control needed to transfer that sign to the full expression; leading-order agreement alone would be insufficient.

## 3. Ordinary parameter length of the remaining possible zero branch

The independently accepted uniform physical consumer gives

$$
|V_\infty|=0\quad\Longrightarrow\quad
\operatorname{dist}(\Theta(\epsilon),2\pi\mathbb Z)<M\epsilon^2,
\qquad M=2^{191000}.
\tag{9}
$$

Define the explicitly specified unresolved set for this sufficient test by

$$
U=\{0<\epsilon\le e_0:\operatorname{dist}(\Theta(\epsilon),2\pi\mathbb Z)\le M\epsilon^2\}.
\tag{10}
$$

Every parameter outside $U$ has positive terminal speed by the already admitted all-future dichotomy. Membership in $U$ proves neither zero speed nor failure of dispersal. The actual zero-speed set is only known to be a subset of $U$.

Fix $0<a\le e_0$. On the band $[a/2,a]$, (8) bounds the total phase variation by

$$
\Theta(a/2)-\Theta(a)
<\frac12\int_{a/2}^a\epsilon^{-10}\,d\epsilon
=\frac{511}{18}a^{-9}.
\tag{11}
$$

The enlarged phase windows of half-width $Ma^2$ about integer turns therefore intersect this phase interval for fewer than $7a^{-9}$ integers. Indeed $Ma^2<\pi$, $2\pi>6$, and the number is at most the phase variation divided by $2\pi$, plus two endpoint windows. The inverse derivative in (8) is at most $4a^{10}$ throughout the band. Each such phase window consequently has preimage length at most $8Ma^{12}$. Monotonicity prevents repeated preimages. Hence

$$
|U\cap[a/2,a]|\le56Ma^3.
\tag{12}
$$

Here $|\cdot|$ denotes ordinary one-dimensional Lebesgue measure. Sum (12) over the dyadic partition of $(0,a]$. Countably many shared endpoints have zero length, and the geometric series gives

$$
|U\cap(0,a]|\le64Ma^3,
\qquad
\frac{|U\cap(0,a]|}{a}\le2^{191006}a^2.
\tag{13}
$$

At the admitted endpoint $a=e_0$, the relative length is at most $2^{-208994}$. As $a\downarrow0$, the bound tends to zero. Thus the parameters proved to have positive terminal speed have asymptotic density one at zero within this original family, if the derivative and measure arguments are independently accepted. This does not claim that $U$ has zero measure on the full interval, that any zero-speed member exists, or that a physical probability law has been defined.

## Scope and independent-review obligations

The original complete preparation, its compatibility branch, cutoff and sixth-derivative seams are unchanged for each parameter according to the already admitted family rule. This argument classifies many parameters by an explicit finite-expression criterion and bounds the length left unresolved; it supplies no common terminal-speed lower bound, numerical speed value, arbitrary-history robustness or population dynamics. The previously certified single member and explicit positive-speed interval remain valid independently of this proposed density refinement.

The new load-bearing obligations are the full normalized-phase remainder (6), its holomorphic derivative control, the count of integer windows and the inverse-map length estimate. Failure of any of them withdraws the corresponding monotonicity or length conclusion. The all-future physical dichotomy and its uniform necessary zero-speed condition remain separately cited premises. No numerical or long-running process was launched.
