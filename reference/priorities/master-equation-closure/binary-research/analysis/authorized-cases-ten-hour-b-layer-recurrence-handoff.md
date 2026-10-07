# Exact degree-fourteen layer recurrence and its first missing bound

**Status: derived recurrence and conditional transfer lemma; unreviewed.** Fix the identical complete preparation at $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$. This completes the initial-layer part of the [correlated-map handoff](authorized-cases-ten-hour-b-correlated-map-contract.md). No coefficient constructor or target phase has run. The actual terminal branch remains unresolved.

## 1. The recurrence is triangular, including the compatible jets

Use $\sigma=s/\epsilon$ and seek the finite comparison

$$
Y^{[14]}(\sigma;\epsilon)=\sum_{n=0}^{14}\epsilon^nY_n(\sigma),
\qquad Y_0=e_1,\quad Y_1=\sigma e_2.
\tag{1}
$$

Let $L=2+\ell$, where $\ell=\sum_{n\ge2}\epsilon^n\ell_n$. The absence of degree one follows because the first summed displacement is tangential. For source derivative order $d=0,1,2$, define its coefficient exactly by

$$
S_n^{(d)}(\sigma)=
\sum_{j=0}^n\sum_{k=0}^{\lfloor(n-j)/2\rfloor}
\frac{(-1)^k}{k!}
Y_j^{(d+k)}(\sigma-2)
[\epsilon^{n-j}]\ell^k.
\tag{2}
$$

Put $q_n=Y_n+S_n^{(0)}$. The range coefficients are determined by

$$
\ell_n=e_1\cdot q_n+\frac14
\left(\sum_{i+j=n\atop i,j\ge1}q_i\cdot q_j
-\sum_{i+j=n\atop i,j\ge2}\ell_i\ell_j\right).
\tag{3}
$$

There is no hidden $\ell_n$ on the right: the only potential same-degree delay term differentiates $Y_0$, which is constant. Set $b_0=1/2$ and

$$
b_n=-\frac12\sum_{j=1}^n\ell_jb_{n-j},
\qquad N_n=\sum_{j=0}^nq_jb_{n-j}.
\tag{4}
$$

These are the coefficients of $L^{-1}$ and $n=q/L$. Form $D=1+N\cdot S^{(1)}$ by ordinary coefficient convolution, invert it by $d_0=1$, $d_n=-\sum_{j=1}^nD_jd_{n-j}$, and form $L^{-2}D^{-3}$ from the two and three inverse products. The exact scaled equation then gives

$$
Y_n''=-4[\epsilon^{n-2}]
\left[L^{-2}D^{-3}
\left\{(1-S^{(1)}\cdot S^{(1)})N
+D S^{(1)}-LN(N\cdot S^{(2)})\right\}\right].
\tag{5}
$$

At order n, (5) uses only $Y_j$ with $j\le n-2$. Thus it is a known piecewise-polynomial right side, not a delay equation for the unknown $Y_n$.

Let $v_n$ be the coefficient of $\epsilon^n$ in $\epsilon h_0e_2$. Explicitly, $v_{2k+1}=\binom{2k}{k}8^{-k}e_2$ and $v_{2k}=0$. Integrate

$$
Y_n(\sigma)=\sigma v_n+\int_0^\sigma(\sigma-\tau)Y_n''(\tau)\,d\tau,
\qquad \sigma\ge0.
\tag{6}
$$

For $n\ge1$, only after this positive piece is determined, define its supplied negative piece to be its Taylor polynomial through degree five at zero:

$$
Y_n(\sigma)=\sigma v_n+\sum_{m=2}^5
\frac{Y_n^{(m)}(0^+)}{m!}\sigma^m,
\qquad -3\le\sigma<0.
\tag{7}
$$

Equation (7) determines the parameter coefficients of the original compatible jets: $[\epsilon^{n-m}]J_m=Y_n^{(m)}(0^+)$. It does not choose new jets. The actual finite compatibility branch is unique and analytic, and its coefficients satisfy the same triangular equations, so this is its coefficient recurrence. At zero, the source lies in the smooth negative polynomial piece and every derivative needed for the five-jet trace is available. No derivative at a later propagated seam is substituted into this compatibility calculation.

The first controls are $Y_2=-\sigma^2e_1/2$ and $Y_3=(\sigma/4-\sigma^3/6)e_2$, in addition to the independently accepted four compatibility-kick coefficients and the integral $8/21$ from the [initial-layer kernel](authorized-cases-ten-hour-b-initial-layer-kernel.md). Equations (2)–(7) determine the remaining coefficients by rational polynomial operations on the six pieces ending at $0,2,4,6,8,200$.

## 2. The first unsupported quantitative step

The finite derivative inventory permits (2) through the required order. It does not, by itself, bound its remainder uniformly when the exact source clock crosses a displaced seam. That is the first genuinely unsupported quantitative step in the completed layer proposal.

The precise missing certificate is the following residual bound for the constructed comparison, using its own exact implicit root, not the root series substituted without remainder:

$$
\left|Y_{\sigma\sigma}^{[14]}-
\mathcal T_\epsilon[Y^{[14]}]\right|
\le2^{45000}\epsilon^{15},
\qquad 0\le\sigma\le200.
\tag{8}
$$

Here $\mathcal T_\epsilon$ denotes the full scaled row, including its outer $\epsilon^2$ and its original negative polynomial comparison. The same certificate must retain $|Y^{[14]}-e_1|<1/16$, $|Y_\sigma^{[14]}|<1/16$, $|Y_{\sigma\sigma}^{[14]}|<1/16$, a Lipschitz bound at most one for its acceleration, and the strict root/range margins. These bounds are plausible at the fixed parameter but are not supplied merely by writing the recurrence.

To prove (8), the exact coefficient operations must give bounds on the piecewise polynomial norms and the derivatives occurring in (2), and the remainder must be estimated on both sides of every shifted seam. In particular, the original sixth coefficient's source acceleration is $C^{3,1}$: three argument derivatives are used and its Lipschitz third derivative controls the fourth-order Taylor remainder. A pointwise fourth derivative must not be silently taken at its jump. The existing first-kick theorem checks one leading coefficient and does not replace this full degree-fourteen residual certificate.

## 3. Once the residual is proved, the actual-state enclosure follows

The original compatible-jet contraction from [candidate Section 1](authorized-cases-ten-hour-b-direct-release-candidate.md) and [independent assessment Section 1](authorized-cases-ten-hour-reference-b-adjudication.md) is analytic on the conservative complex disk $|\epsilon|\le2^{-64}$, with the jets bounded in its original quarter box. The same contraction extends to complex parameter: its modulus bounds give Lipschitz constant at most $12\,2^{52}2^{-128}<1/4$ and image displacement at most $12\,2^{48}2^{-128}<1/4$. Uniform iteration gives an analytic fixed point on this disk. In particular $|[\epsilon^k]J_m|_\infty\le2^{1+64k}$. For each term $\epsilon^mJ_m(\epsilon)\sigma^m/m!$ in the negative layer polynomial, the omitted orders start at $k=15-m$. On $-3\le\sigma\le0$, its value and first two scaled derivatives gain a factor below $2^{10}$. Summing four geometric tails and two components gives a bound below $2^{1100}\epsilon^{15}$ after the truncations in (7). The release velocity tail is smaller than that. This $2^{-64}$ compatibility radius is distinct from the much smaller finite-field analytic radius $2^{-5010}$; the latter must not be substituted into this coefficient estimate. This bound concerns the existing compatible family; the supplied cutoff is unchanged and lies outside the sampled layer.

Assume (8) and its displayed comparison margins. Two paths with those margins have a scaled-row Lipschitz constant at most $2^{100}\epsilon^2$ in current/source position, source velocity and source acceleration, after root shifts are transported using the comparison acceleration's Lipschitz bound. This is the same value inventory used in the admitted layer theorem, now in the scaled coordinate. It requires no additional actual derivative.

Let $E_2$ be the supremum of the actual/comparison scaled acceleration difference. Over the interval of length 200, integrating from the common release position and the bounded velocity tail gives the factor at most $2^{16}$ for position/velocity errors. The negative polynomial discrepancy is retained separately. Consequently

$$
E_2\le2^{45000}\epsilon^{15}
+2^{116}\epsilon^2E_2+2^{1200}\epsilon^{17}.
\tag{9}
$$

At the selected member the feedback coefficient is less than $1/4$, so $E_2<2^{45001}\epsilon^{15}$. One and two integrations then give the physical state error

$$
|y-y^{[14]}|+|y'-(y')^{[13]}|
<2^{45020}\epsilon^{14}<2^{50000}\epsilon^{14}.
\tag{10}
$$

Thus the proposed layer input in the map contract follows from the specific missing residual (8). A larger certified constant can be propagated through (9) transparently; it must still leave the phase sensitivity margin after division by the protected cubic seed. No unspecified constant is assumed smaller than the fixed dyadic scale.

## Handoff boundary

The recurrence (2)–(7) is exact finite algebra. The residual constant in (8) has not been proved or measured. The conditional transfer (9)–(10) identifies its concrete consumer. The next controlled step is therefore to construct the six-piece coefficient set with independently checked low-order controls, prove the uniform residual and seam bounds, and only then supply that enclosure to the degree-sixteen map. Neither the scalar critical phase nor the final account is presently known.

Falsifiers are a same-degree unknown hidden in (2)–(5), incompatible release traces in (7), an unbounded shifted-seam Taylor remainder, a failed exact-root margin, or an omitted negative-history term in (9). No target instrument, scalar evaluation, new history, seventh actual derivative, physical premise, Python process or Git mutation was used.
