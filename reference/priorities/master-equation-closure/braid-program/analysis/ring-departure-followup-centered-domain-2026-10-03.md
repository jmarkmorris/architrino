# Polynomial-centered continuation of the T02 complete history

Date: 2026-10-03. Assignment: Validated ring departure, Jack K. Hale lens, stable agent `/root/ring_axial`. **Unchanged Master Equation, $K=c_f=1$, all ordinary positive-delay hits including self.** Frozen subject for separate adjudication; all earlier instruments and subjects remain unchanged.

## 1. New domain and honest boundary

**Derived with outward computer-assisted bounds, pending separate adjudication:** the inherited fast normalized T02 ancient branch extends through $|q|\le0.006$, with $q(T)=q(0)e^{\lambda T}$, for either sign and every true fast root in the inherited enclosure. The exact complete census remains eight ordinary hits per receiver, including one positive-delay self hit, or 48 directed hits. This is $6\times10^{10}$ times the former $10^{-13}$ radius. It continues the same complete history rather than treating a finite polynomial as a trajectory.

For $q=0.006w$, $p(q)=P_{20}(q)+v(w)$, and $\mathcal E=w\partial_w$, the new bounds give

$$
\|v\|_1<6.685\times10^{-7},\qquad \|\mathcal E^2v\|_1<0.000232705,\qquad \|\mathcal Ev\|_1<0.0000110812.
$$

The vector norm is the maximum coordinate coefficient sum on the complex unit disk. The physical position remainder is at most $\sqrt2\|v\|_1$; the velocity remainder at most $\sqrt2(\lambda_+\|\mathcal Ev\|_1+\Omega_+\|v\|_1)$; the acceleration remainder at most $\sqrt2(\lambda_+^2\|\mathcal E^2v\|_1+2\lambda_+\Omega_+\|\mathcal Ev\|_1+\Omega_+^2\|v\|_1)$. Rounded coefficients add their own interval rounding error.

**Derived on this domain:** $|D|>0.12565$ at every hit, member speed $>1.69268$, and simultaneous member separation $>0.95717$. Hence there is no fold, wake-speed event or collision in the certified window. These margins establish that its final chart is nonsingular; the endpoint is a proof boundary rather than an intrinsic continuation obstruction. No neighbor transfer, global dispersal or eventual fate has yet been determined.

The [first enlarged-domain subject](ring-departure-followup-tail-domain-2026-10-03.md) explains the coefficient algebra, recurrence and tail fixed point. This subject replaces its zero-centered delay balls with polynomial-centered balls and its Cauchy derivative cap with a direct chain-rule cap. The [degree-eight coefficient enclosure subject](ring-departure-followup-coefficient-enclosures-2026-10-03.md) and frozen degree-twenty outward recurrence retain the exact coefficient and normalization obligations. None of these new subjects is called independently checked before its separate verdict.

## 2. Polynomial-centered delay fixed points

Let $P=P_{20}(0.006w)$ be the exact polynomial whose interval coefficients are supplied by the frozen degree-twenty target. For each row let $d_P(w)=\Delta+\sum_{n=1}^{20}d_n(0.006w)^n$ be its exact degree-twenty delay polynomial. These coefficients are the signed implicit-delay recurrence coefficients, not a fitted root predictor. Its squared-gap coefficients through degree twenty vanish identically when substituted with $P$. This follows from the inherited triangular delay construction, not from residual intervals merely containing zero.

In the notation $F(p,d)=Q(p,d)\cdot Q(p,d)-d^2$ of the first enlarged-domain subject, set $p=P+h$, $d=d_P+e$. The actual analytic ball has $\|h\|_1\le\zeta=10^{-5}$ and $\|e\|_1\le s=0.0004$. Its map is

$$
e\longmapsto e+\frac{F(P+h,d_P+e)}{2\Delta D_0}.
$$

A second ball uses $P(1.4w),d_P(1.4w)$ and $h=0$, with the same error radius. It supplies the scaled coefficient norm for the residual-tail estimate. These are two analytic estimates of the same normalized formal delay branch, since their series agree near $w=0$; they are not alternative causal-row selections.

The new [centered-domain instrument](../../../../../scripts/braid-program/ring_departure_followup_centered_domain_20261003.py) evaluates the explicit squared gap $F(P,d_P)$ as an outward jet through degree 64. Its degree-21-through-64 absolute coefficient sum is enclosed directly. For the omitted tail it bounds the complete coefficient norm of the explicit function $F(P(2w),d_P(2w))$ and divides by $2^{65}$; the scaled ball similarly multiplies retained coefficients by $1.4^n$ and uses $(1.4/2)^{65}$ for its tail. The outer function is explicit and analytic: it contains finite polynomials, exponential and trigonometric composition, with no implicit-root existence premise at the outer radius. Thus this outer estimate does not extrapolate an exact history to $q=0.012$.

Specifically, write $c=|\cos\theta|+|\sin\theta|$, $t=\|d_P-\Delta\|_1+s$, $b=e^{\Omega_+t}$, $\rho=e^{-\lambda_-\Delta_-+\lambda_+t}$, and $U_k=\|\mathcal E^kP\|_1$, $U_{k,s}=\|\mathcal E^kP(\rho w)\|_1$. In each ball the source argument has $\rho<1/4$. Consequently the source values and its first two Euler derivatives of $h$ are bounded by $\zeta\rho$; this uses $n\rho^{n-1}\le1$ and $n^2\rho^{n-1}\le1$ for all $n\ge1$ when $\rho\le1/4$. Set

$$
Q_*=\|Q(0,\Delta)\|_\infty+cR_+(b-1),\quad q_p=U_0+\zeta+cb(U_{0,s}+\zeta\rho),\quad V_*=c\beta_+b,
$$

$$
v_p=cb[\Omega_+U_{0,s}+\lambda_+U_{1,s}+(\Omega_++\lambda_+)\zeta\rho].
$$

The reference second-gap derivative is bounded by the previous $K_*$ evaluated at $t$. Hence $\|F_d+2\Delta D_0\|_1\le K_*t+4(Q_*v_p+V_*q_p+q_pv_p)$. Dividing by $2\Delta_-|D_0|_-$ bounds the contraction. The center-image bound combines the explicit residual enclosure with $4(Q_*+U_0+cbU_{0,s})h_Q+2h_Q^2$, where $h_Q=\zeta(1+cb\rho)$. Every row and both balls prove contraction below one and image below $s$. All signed reference rows, including the negative-transmitter newborn row and the positive-delay self hit, remain present.

## 3. Direct derivative and tail proof

The acceleration map $B(P+h)$ obeys $\|B\|_1<M<10.161366$ in the actual ball and $\|B(P(1.4w))\|_1<M_s<16.509316$ in the scaled ball. The new derivative bound is derived by differentiating its complete implicit geometry, rather than dividing an acceleration cap by a small analytic-ball radius.

For each row let $Q,V,A$ be upper infinity-norm caps on separation, source velocity and source acceleration; let $f=|F_d|_-$ and $d_-=\Delta_--t>0$. At fixed delay a unit change of $p$ has separation cap $h_Q=1+cb\rho$ and source velocity cap $h_V=cb(\Omega_++\lambda_+)\rho$. Then

$$
L_d=4Qh_Q/f,\quad F_{dd,*}=4(V^2+QA)+2,\quad F_{dp,*}=4(Vh_Q+Qh_V),
$$

$$
L_Q=h_Q+VL_d,\qquad L_F=F_{dp,*}+F_{dd,*}L_d,
$$

$$
L_{B,m}=\frac{2}{d_-^2f}\left[L_Q+Q\left(\frac{2L_d}{d_-}+\frac{L_F}{f}\right)\right].
$$

These follow from $d_p=-F_p/F_d$, $Q_d=V$, $F_{dd}=2V\cdot V-2Q\cdot A-2$, and $B_m=-2\sigma Q/[d^2\operatorname{sgn}(D_0)F_d]$. The source acceleration cap includes $\Omega^2P$, $2\Omega\lambda\mathcal EP$, $\lambda^2\mathcal E^2P$ and the smoothed perturbation derivatives. Summing gives $L_B<12037.813306$; the frozen zero-state derivative norm remains $L_0<166.742355$. Thus $\|DN(P+h)\|\le L_B+L_0$.

For degree twenty, the same inherited inverse caps are $B_{21}<0.00002371334$ and $B_{21,2}<0.01045758$. The scaled residual tail is at most $M_s1.4^{-21}<0.014094197$. Its initial inverse image is $b<3.342204\times10^{-7}$. Use the tail ball $\|v\|_1\le2b<6.685\times10^{-7}<\zeta$. Its contraction is $B_{21}(L_B+L_0)<0.289411$ and image $<5.27675\times10^{-7}<2b$. Applying the twice-weighted inverse to the same forcing gives the stated $\mathcal E^2$ bound. The first Euler bound follows since every tail term has degree at least 21.

This constructs an analytic exact solution through the larger disk. Its formal coefficients coincide with the earlier normalized ancient branch, so the identity principle and the inherited local uniqueness identify it with that branch on their common domain. Neither finite residual smallness nor coefficient decay alone is used as a convergence theorem.

## 4. Direct complete-history root census

The new [centered real-chart instrument](../../../../../scripts/braid-program/ring_departure_followup_centered_real_chart_20261003.py) partitions the complete real amplitude interval $[-0.006,0.006]$ into 96 adjacent exact interval panels. For a candidate delay $d$, it encloses the actual receiving displacement using $P(q)$ plus the exact-tail box, and the source using $P(qe^{-\lambda d})$ plus that box. Its source velocity uses the corresponding Euler polynomial plus the first-Euler tail box. It then evaluates the full squared gap and its delay derivative by outward Cartesian arithmetic.

Each panel has its eight active row brackets centered on the interval delay polynomial and widened by $0.003$. Every bracket retains opposite endpoint signs and one strict derivative sign. The whole complementary delay range $[0.1,3]$ is covered by outward boxes excluding zero. This evaluates the actual history-dependent equation, not a reference-circle residual with a perturbation ignored. The minimum derivative/root-range margin proves $|D|>0.12565$.

The global physical position tube is $<0.009401415$ and velocity tube $<0.133742204$. They exclude recent self hits on $0<d\le0.1$ by the old tangent-secant margin $>0.68202$, and recent partner hits by range-minus-delay margin $>0.66115$. The total range is $<1.970756$, so no root occurs at $d\ge3$. Together these charts establish all roots, not just the named active ones. The same tubes prove the speed and simultaneous separation margins stated above. A common planar ancient departure remains planar in this invariant sector; these computations do not test a three-dimensional history.

## 5. Controls, frozen identities and remaining route

The centered-domain instrument's independently known static inverse-square coefficients, static implicit delay, exponential, trigonometric and composition controls pass before its target. Its one initial interval-left/jet-right expression failed before any target receipt; the expression order was corrected and controls rerun before the successful targets. The real-chart instrument passes a known static root complement, static gap perturbation identity and exact binomial Horner/Euler identities before its target. These controls test the new instruments; they do not replace a separately constructed mathematical adjudication.

| New item | SHA-256 |
| --- | --- |
| Centered-domain instrument | `bebc589078ca765611dc34e58abc034decb6c2811d9feed684a6aca61ca387e9` |
| Centered known | `c25791f78f52860641e1deeb00d26fc89ce99b796d786759d1b38e9613c38e01` |
| Centered `candidate-006.json` | `43e704c435765c124956c21e897aa51602cb6fb9e8613773192df7abf66ad9cc` |
| Centered real-chart instrument | `ce0024b8607ff28f601d6631f6cfa56a8436fc9217d52cf21dd0a249c4abab60` |
| Centered real-chart known | `59fd95153880d33de02335efbe6d7c01e5f817c89cc171c687d359fa9ae1844f` |
| Centered real-chart target | `27776e3fb1a2d96216c4655f1e1ea12d03d8f767144252ac317bbd1ef0f742db` |

These live under `.local-data/ring-followup/departure/centered-domain/` and `centered-real-chart/`. The consumed degree-twenty target remains `1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18`, with exact binary intervals. Owned real-chart run `8a5924cc-1786-4366-9db9-b028ed575cf4` completed exit zero, no stderr and closed process group in 36.849 wall seconds by its lease. Frozen prior owners, instruments, oracles and shared queues/indexes/manuscript/logs are unchanged.

**Remaining:** the current sufficient estimate fails for a candidate $\epsilon=0.007$, $r=1.2$, $\zeta=0.00003$, $s=0.0006$: its last row's delay-ball image fails and its chosen twice-initial-radius tail ball has contraction $>0.5646$, too large for that ball. At $\epsilon=0.008$, $r=1.1$, $\zeta=0.0001$, $s=0.0015$, both newborn delay balls fail and the derivative cap gives contraction $>1.83$. These are measured failures of declared sufficient inequalities, not proofs that the physical solution terminates there. A larger tail ball or sharper row derivative/polynomial preconditioner may repair the first failure. No physical event or sharp intrinsic continuation obstruction has been certified; all extrapolations outside the proved domain remain point estimates.

**Falsifiers:** a failed inherited balance/root or fast-mode premise; incorrect signed delay or harmonic recurrence; non-outward coefficient arithmetic; an invalid explicit residual-tail or implicit map bound; omission of any chain-rule term; uncovered amplitude/delay boxes; or an actual history in this domain violating its census or positive margins defeats the affected claim. Inspect original binary receipts and the separate review. In particular, agreement with the same jet code and a polynomial residual outside the certified domain are not independent event evidence.
