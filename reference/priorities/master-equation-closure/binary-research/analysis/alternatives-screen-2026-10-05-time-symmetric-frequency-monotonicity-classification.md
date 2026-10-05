# Strict speed monotonicity and the complete local rational-resonance classification

Status: computer-assisted derived subject, 2026-10-05, with complete outward rational coverage and exact endpoint enclosure; independent evaluation and coordinator assessment pending at freeze. The mathematical reference, instrument and known controls were frozen before their targets. No independent Moore monotonicity reference or target result was read before this source was frozen. All preceding sources remain unchanged.

For the exactly balanced equal-past/future radial circle family, the unique positive opposite planar frequency $m_*(\beta)$ is strictly decreasing at every $0<\beta<1$. Its range is $(m_{\rm end},1)$, where the exact implicitly defined endpoint satisfies $3/4<m_{\rm end}<4/5$. Thus a rational rotating frequency $j/k$ occurs at exactly one strictly subfield speed if and only if $m_{\rm end}<j/k<1$. Every such resonance is transverse. In particular $m_*=1-1/k$ is accessible exactly for integers $k\ge5$, and never for $k=2,3,4$.

Combined with the full Cartesian nonlinear reduction, this yields a local classification at every circle and every fixed nominated multiple of its period: circles alone at nonresonant parameters, and circles plus one noncircular branch modulo Euclidean transformations and time phase at resonances. The argument establishing the nonresonant part is included below; it is not inferred from the absence of a linear mode alone. None of these statements concerns stability or excludes distant periodic solutions.

## 1. Fixed complete law and regular quotient

The selected equation is exactly Section 14's equal half-weight past/future canonical radial acceleration for opposite polarities, with $K=c_f=1$. The complete balanced circle has $x=\beta\cos x$, $D=1+\beta\sin x$, $R=(4\beta^2\cos x D)^{-1}$ and $\omega=\beta/R$. It includes both partner roots at ages $2x/\omega$ and every allowed source; strict subfield speed excludes positive-age self roots. The complete Cartesian variational tensor retains source-clock and source-acceleration shifts.

The separately assessed [complete real-frequency theorem](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md) supplies exactly one positive opposite frequency $m_*\in(0,1)$, with simple determinant root. In its notation

$$
F_-(m,x)=m^2G(m^2,x),\qquad G(0,x)=-1,\qquad G_y>0.
$$

The [new mathematical reference](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-mathematical-reference.md), frozen before target use, derives an analytic function $J$ satisfying

$$
G(y,x)=-1+yJ(t,y),\qquad t=x^2,\qquad G_x(y,x)=2xyJ_t(t,y).
\tag{1}
$$

This removes both apparent singularities in $G_x/(xy)$. For a checkable restatement, let $E_r(z)=\sum_{n\ge0}(-1)^nz^n/(2n+r)!$, $v=E_1(t)/E_0(t)$, $h=(1+tv)^{-1}$, $p=tvh$, $u=th^2$, $q=tv^2$ and $z=4ty$. With $S=E_1(z)$, $T=2E_2(z)$, $S_1=-E_3(z)$ and $T_1=-2E_4(z)$,

$$
\begin{aligned}
a&=-1+t[(2+u+q)T-2hS],\\
d&=-1+t[-h^2T+2qh(S-T)],\\
D_1&=4t^2[-h^2T_1+2qh(S_1-T_1)],\\
F_1&=4t[(p-u)S_1+pT/2],\\
J&=-(3+u)D_1+2(2+u)F_1-yF_1^2+ad.
\end{aligned}
\tag{2}
$$

The coefficient substitutions follow from the original full determinant and $p=1-h$, $uq=p^2$. They do not replace the law by a small-speed approximation. The exact axis values are $J(0,y)=J_t(0,y)=1$ on the entire frequency interval. Thus the analytically extended quotient $G_x/(xy)$ is exactly two at zero angle.

## 2. Complete speed-derivative certificate

The [frozen protocol](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-protocol.md) and [new interval instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-interval.py) cover the closed rectangle

$$
0\le t\le\frac9{16},\qquad 0\le y\le1.
\tag{3}
$$

It contains every physical angle and the complete positive-root curve, as well as both analytic axes. First-order interval jets in $t$ differentiate every term of (2), including the circle coefficients and phase argument. The instrument imports only the unchanged independently authored Cartesian interval reference and its unchanged outward rational arithmetic; it imports no earlier scalar $G_y$ subject.

Each entire value and derivative is evaluated at an exact rational midpoint using degree-40 series, with the first omitted alternating value and derivative terms bounding their tails. Complete interval enlargement uses the independently derived integral estimates

$$
|E_r'|\le\frac1{(r+2)!},\qquad |E_r''|\le\frac2{(r+4)!}.
$$

The mathematical reference proves these estimates from weighted cosine integrals. Every signed product and reciprocal is enclosed outward. Denominators have checked positive lower endpoints.

**Measured known-first result.** At 21:29:21 UTC, before the target, the instrument passed all five entire-function value/derivative controls at zero, elementary exact jet product and reciprocal controls, the complete $t=0$ axis identity $J=J_t=1$, nine determinant comparisons with separately assembled full Cartesian matrices, and complete plus deliberately incomplete coverage controls. The unchanged Cartesian known suite also passed. The derivative axis tests have an exact analytical answer; nonzero determinant parity uses a separately authored tensor assembly rather than a replay of the new formula.

**Measured complete target result.** Following prospective coordinator inspection of the full source and derivation, the watched target completed at 21:30:25 UTC. It evaluated 1154 boxes in 6.201667458284646 seconds and retained 609 certified leaves, zero pending leaves, no exceptions and no guard failures. The structural audit reconstructed the full partition from 64 exact dyadic roots and their binary split paths, checking both children at every internal node. The minimum certified rational lower bound is

$$
\mu=\frac{422595463317692637086958663559874741859423}{10^{45}}>\frac1{2500}.
\tag{4}
$$

Hence $J_t\ge\mu>0$ on the complete rectangle (3), subject to the stated outward arithmetic and independent assessment. This is a whole-box certificate, not a sampled minimum. The corresponding regular quotient obeys $G_x/(xy)\ge2\mu$ under its analytic extension.

At the root $y_*=m_*^2$, implicit differentiation and $x_\beta=\cos x/D>0$ now give

$$
m_*'(\beta)
=-\frac{x\,m_*\,J_t(x^2,m_*^2)}{G_y(m_*^2,x)}\frac{\cos x}{D}<0
\qquad(0<\beta<1).
\tag{5}
$$

Every factor has its correct complete-circle value. The derivative can tend to zero at an endpoint without contradicting strict negativity at each fixed positive speed; no endpoint-uniform negative bound is claimed.

## 3. Independent analytic-endpoint enclosure

Let $x_*$ be the unique zero of $\cos x-x$ on $[0,3/4]$. This is the analytic coefficient limit as $\beta\uparrow1$, not a separately introduced physical unit-speed solution. The determinant and the positive $G_y$ enclosure extend through $x_*$, which lies inside the same closed angle domain. Since $G(0,x_*)=-1$ and the independent first-frequency certificate gives $G(1,x_*)>0$, there is exactly one $y_{\rm end}\in(0,1)$ satisfying $G(y_{\rm end},x_*)=0$. Put $m_{\rm end}=\sqrt{y_{\rm end}}$. The analytic implicit-function theorem, together with positive-root uniqueness, identifies this as $\lim_{\beta\uparrow1}m_*(\beta)$.

A [separately frozen endpoint protocol](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-endpoint-protocol.md) and [endpoint driver](../evidence/alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-endpoint.py) use the unchanged full Cartesian matrix evaluator directly. They do not use (2) to establish the endpoint signs. Known controls passed at 21:31:02 UTC, including the unchanged Cartesian suite, exact zero cosine, strict starting bracket signs and exact zero-angle determinants at both prescribed frequencies. After prospective review, exact rational bisection retained every strict interval sign and produced

$$
x_*\in\left[
\frac{406316348943}{549755813888},
\frac{3250530791547}{4398046511104}
\right],\qquad
\text{width}=\frac3{4398046511104}<2^{-40}.
\tag{6}
$$

Strict decrease of $\cos x-x$, whose derivative is $-\sin x-1$, makes this a complete root bracket. The full Cartesian determinant was then evaluated over all of (6), giving strict enclosures contained in the following coarse rational intervals:

| Frequency | Complete-angle determinant enclosure |
| --- | --- |
| $m=3/4$ | $[-58/1000,-57/1000]$ |
| $m=4/5$ | $[35/10000,37/10000]$ |

The exact finer rational endpoints and imaginary-component enclosures are retained in the receipt. Both signs passed at 21:31:42 UTC, with measured target runtime 0.04925016686320305 seconds and no guard failure. Because $F_-=yG$ and $G_y>0$, these signs prove

$$
\frac34<m_{\rm end}<\frac45.
\tag{7}
$$

No Moore endpoint result or source was used for this certificate. The shared full Cartesian reference is explicitly identified as an antecedent rather than counted as a newly independent derivation of the law.

## 4. Exact rational accessibility and the resonance count

The admitted small-speed expansion gives $m_*(\beta)\to1$ as $\beta\downarrow0$. Equations (5)–(7) therefore establish the bijection

$$
m_*:(0,1)\longrightarrow(m_{\rm end},1).
\tag{8}
$$

A rational $j/k$ with integers $0<j<k$ is consequently attained at exactly one speed if and only if $m_{\rm end}<j/k<1$. Every attained rational is transverse by (5). Equality with the limiting endpoint is excluded from the strictly subfield domain. This is a complete criterion even though $m_{\rm end}$ is specified implicitly rather than by an approximate decimal.

For each fixed positive integer $k$, the number of distinct resonant speeds in the nominated $k$-period problem is exactly

$$
N_k=k-1-\lfloor k m_{\rm end}\rfloor.
\tag{9}
$$

This also covers the possibility that $k m_{\rm end}$ is an integer, since the lower inequality is strict. The speeds are strictly ordered opposite to their frequencies: larger $j$ gives smaller resonant speed.

For $k=1,2,3,4$, (7) gives $N_k=0$. For every $k\ge5$, the value $j=k-1$ satisfies $j/k\ge4/5>m_{\rm end}$, so $N_k\ge1$. In particular the sequence $m_*=1-1/k$ exists uniquely exactly for $k\ge5$. Its sufficiently-large-$k$ asymptotic $\beta_k=\sqrt{2/k}[1+O(k^{-1})]$ remains the previously derived small-speed result; it is not used to decide the finite threshold.

## 5. Nonresonant full Cartesian local uniqueness

Fix any $k\ge1$ and any $0<\beta_0<1$ with $k m_*(\beta_0)\notin\mathbb Z$. Use the nominated period $P(\beta)=kT(\beta)$, phase $s=\omega(\beta)t/k$, and full circle profile $Q_\beta=(R q_k,-R q_k)$, where $q_k=(\cos ks,\sin ks,0)$. The nominated period is a valid local parameter because $\omega'/\omega=3/\beta+\beta\cos^2x/D^2>0$.

The complete full nonlinear operator and root chart are those of the [Cartesian local classification](alternatives-screen-2026-10-05-time-symmetric-multiple-period-cartesian-independent.md). On an open full Cartesian $C^2$ neighborhood there is exactly one partner root per direction, no positive-age self root, positive range, positive root denominator and a strict physical speed margin. The residual is jointly $C^1:C^2\times\mathbb R\to C^0$, with the complete source-clock and acceleration derivative.

At this nonresonant circle the complete periodic kernel consists exactly of the six Euclidean tangent vectors $\mathcal E$. Indeed the only extra bounded frequency is $m_*$, and its rotating harmonic $k m_*$ is not an integer; all secular generalized directions fail periodicity. The Hermitian Fourier decomposition and complete inverse tail give

$$
\operatorname{Ran}L=C^0\cap\mathcal E^\perp,\qquad
L:C^2\cap\mathcal E^\perp\longrightarrow C^0\cap\mathcal E^\perp
\text{ boundedly invertible}.
$$

To verify the functional step directly, the Fourier inverse is $O(n^{-2})$ outside finitely many invertible blocks. It gives an $H^2$, hence $C^1$, solution for a continuous orthogonal datum. The equation $\nu_0^2u''=f-\mathcal B u$, with lower-order shift operator $\mathcal B:C^1\to C^0$, improves it to $C^2$. Symmetry gives the exact range annihilator, and the inverse is bounded. Thus no range or high-frequency condition is omitted.

The six Euclidean slice equations have invertible orbit Gram matrix, so every sufficiently nearby profile can be put into $u=Y-Q_\beta\perp\mathcal E$ by a constant Euclidean transformation. Let $P_{\mathcal E}$ be the fixed orthogonal projection. On this full slice, solve

$$
(I-P_{\mathcal E})\mathcal F(Q_\beta+u,\beta)=0.
\tag{10}
$$

The displayed inverse and joint derivative continuity make the inverse-preconditioned map a contraction in a sufficiently small $C^2$ ball. Thus (10) has one and only one small solution for each nearby $\beta$. The exact circle family gives $u=0$ for every such $\beta$, so uniqueness forces this solution to be zero. Every zero of the full nonlinear residual satisfies (10), hence every nearby full periodic solution is a Euclidean image of a circle. The circle itself also solves the six omitted projected components, so there is no missing existence equation. No claim that covariance annihilates arbitrary Euclidean residuals is needed.

This proves a local nonlinear circle theorem at each nonresonant nominated multiple period. It uses the actual complete nonlinear map and full complement inverse; the spectral observation alone would not suffice. The same equation-based upgrade as in the Cartesian source extends the statement to classical solutions sufficiently close in $C^1$.

## 6. The resulting complete local periodic classification

At each resonant speed from (8), the [full Cartesian branch theorem](alternatives-screen-2026-10-05-time-symmetric-multiple-period-cartesian-independent.md) applies because (5) supplies transversality. Its complete kernel consists of six Euclidean vectors and the two opposite planar quadratures. Its unique full range completion is forced to be antipodal and planar by exact inversion/exchange and plane-reflection symmetries; a combined time shift and spatial corotation makes it reversible. The invariant-space intersection removes every residual except the scalar critical equation. The separately justified two-level regularity then gives the unique local $C^1$ amplitude branch.

Consequently, for every fixed $k$ and circle speed, a sufficiently small full Cartesian neighborhood with nominated period near $kT$ has precisely one of two forms, modulo constant Euclidean transformations and time phase:

- If $k m_*$ is not an integer, it contains only the local circle family.
- If $k m_*=j$ is an integer, it contains that circle family and the unique local noncircular planar antipodal reversible branch. Signed amplitudes describe the same quotient half-branch. Its nonzero members have labeled fundamental period $(k/\gcd(k,j))T(B(a))$, with $B$ the branch's comparison-frequency parameter.

For $k=2,3,4$, the first alternative holds at every strictly subfield speed. For every $k\ge5$, at least the unique $j=k-1$ resonance realizes the second alternative. Other accessible rational frequencies are decided exactly by (8)–(9). A smaller reduced denominator means the same branch is repeated in the larger nominated-period space; it does not create another branch there.

All assertions are local in the profile and nominated period. They exclude neither distant noncircular periodic states nor solutions with unrelated periods. The neighborhood size is not uniform over all speeds or $k$. No assertion about causal initial-value solvability, stability, attraction, collision continuation or global branch fate follows.

## 7. Reproducibility and frozen evidence

| Item | SHA-256 |
| --- | --- |
| [New mathematical reference](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-mathematical-reference.md) | b0335f8ac2aaf526a89f0f44d34ffdf6d02520395476ff849486aea8c096e6bc |
| [Complete derivative protocol](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-protocol.md) | ea1529dba739a1ab49c74ea5c7eeb8a55c0610d2bdfad731dc36dbf8b3a7a9a7 |
| [Derivative instrument](../evidence/alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-interval.py) | f536bf32d459fa295486b10671ef30210faff28fd1181b3672351270f913eb9f |
| Derivative known receipt | 52883ccf92bdc8e7bfbfc993ee23a2c78f5b5e5cd9eab0144e1020232fb54da3 |
| Derivative target receipt | b65c82bb996d10cb1eedc3faaf3b100483c7e2fe68440c7f6cfac5c4ac82bded |
| [Endpoint protocol](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-endpoint-protocol.md) | 73514bfa20ee94aa99d871b05e7671fc2b8b25b0bcbefe2caa878841a4af5556 |
| [Endpoint driver](../evidence/alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-endpoint.py) | 2d9123cfcb63d661933eed7f123f71b214c11aa703b11699709e51dfabfa0299 |
| Endpoint known receipt | 3d4cfa4c7efa6f532539d286ee9f73a26420317fd6249f7cf0391f1a55146fef |
| Endpoint target receipt | 7c98e95583b218cfbda987cb3a1ecc967cf07346f7ccd44c81cdfec33c8dff62 |
| Unchanged Cartesian interval reference | 43c7da211120330a76f1e8030d9b211667845329d807df08f61e77e4135ee01b |
| Unchanged outward rational arithmetic | 874c3db24a7f5a12f640b8c6b4a30b32c5b453fabd550f3b9478a744781c9c03 |
| Full Cartesian nonlinear classification | 42385b1feacd9a552d8b4c23149b5c1320a70a542140f1b825de1e0e016160c8 |

The ignored local receipt owner is .local-data/master-equation-closure/binary-research/. The derivative receipts use prefix alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity- and suffix known.json or target.json. Endpoint receipts insert endpoint- before the suffix. These are local provenance; the tracked instruments and protocols above reproduce the calculations. Both instruments refuse to overwrite frozen receipts. A rerun requires separately owned output paths and the same known-before-target order.

Both targets used the mandated shared venv and their explicit known and target modes. The derivative target was capped at 120 seconds, 10000 evaluations and depth 30; it exhausted its mathematical queue before any cap. The endpoint target was capped at 60 seconds and 50 bisections; it also completed. No owned computation remains active. No earlier subject, reference, shared integration owner, production solver, regular test suite or generated artifact was modified.

## 8. Remaining acceptance and falsifiers

Independent assessment must check the new regularization and outward derivative certificate, not merely reproduce the target's point values or replay its queue. The separate endpoint proof must retain the entire root bracket and both determinant signs. At this freeze the subject has no unresolved target boxes or failed controls, while independent acceptance remains distinct from subject completion.

Falsifiers are a wrong factorization in (1)–(2), a missing parameter derivative, a failed entire-function remainder, inward rounding, missing leaf coverage, a nonpositive true $J_t$ on a certified leaf, an incorrect endpoint bracket/sign, a failure of the imported $G_y$ or complete-frequency theorem, or a false full nonlinear range inverse. A failed sufficient quotient certificate would not by itself refute monotonicity along the actual root curve. A stability or global-periodic exclusion inferred from this local boundary classification would exceed the result even if every enclosure remains valid.
