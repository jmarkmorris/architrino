# Target motion after the complete-population restart

## Scope and fixed inputs

This analysis continues the same supplied-history infinite alternating lattice problem, with $g=16$ and $c_f=1$, after the actual target motion through $9/2$. It retains the original history class, the complete causal roots, and the infinite eight-source stationary block sum. It does not assume that the next upward maximum exists. The [preceding target and population theorem](smooth-two-particle-post-restart-later-continuation.md) supplies the state and source histories through $17/4$ and the target state through $9/2$. The [class-preserving continuation](smooth-two-particle-class-preserving-continuation.md) supplies the complete population through $19/4$ when its residual and compatibility premises are discharged.

The mathematical result below is a sufficient comparison theorem. Its numerical premises come from the frozen independent source-error profiles and the parent's continuous polynomial and full-law residual enclosures. Its scientific conclusion is finite: strict upward target motion through the certified endpoint. A failed sufficient estimate at a later endpoint is not an event of the exact equation.

## 1. Source histories seen by a target

Write $y_i(t)$ for displacement from lattice site $i$, and take the right target at $e_1=(1,0,0)$. For an environmental source $j$, let

$$
m_j=\min\{|j|^2,|j-e_1|^2:\ |j-e|^2\ge2\},\qquad
\tau_j=\sqrt{m_j}-\frac{11}{8}.
$$

The other target's first future onset is $\beta=\sqrt2-3/8$. A generated row can be nonzero only after its first front arrives. Because the source is anchored at its first onset and the subsequent source speed is below one, this front gives the necessary condition

$$
\tau_j+|e_1-j|\le H+B,
\tag{1}
$$

for a receiver displacement bounded by $B$ through $H$. The target row uses $\beta$ in place of $\tau_j$. The source-time function is monotone, so a later moving source does not create an earlier first front. All old supplied-pulse target-to-target receptions ended before this interval; the surviving changes are generated histories and the stationary block field.

The complete certified source prefix through $17/4$ has actual displacement below $1/100$. Therefore every actual or comparison root has range

$$
r_m=\underline{\sqrt m}-B-\frac1{100},\qquad
s\le t-r_m,
\tag{2}
$$

where $m=|e_1-j|^2$ and the radical lower bound is rounded downward. For $H=19/4$ and $B=3/100$, the latest required source time is $3.79<123/32<17/4$. For the exploratory comparison $H=5$, $B=1/16$, it is $4.0725<17/4$. Thus neither target comparison requests an extrapolated source history. The received source speeds remain below $1/32$, so the emission-time derivative of the root equation has magnitude at least $31/32$. The reception charts remain unique and transverse; the range lower bound is positive, and no additional root is discarded.

In (2), the coarse source radius first proves coverage using the already accepted full prefix. Each distance shell then uses the sharper actual position, speed and acceleration bounds at its own required source cut. This order avoids assuming a small unproved source prefix to establish that same prefix's domain.

## 2. Full-law residual-to-error comparison

Let $p(t)$ and $v(t)$ bound the Euclidean target position and velocity errors. For a source prefix bounded by displacement $b$, speed $w<1$ and acceleration $a$, and range at least $r$, define

$$
\begin{aligned}
L(b,w,a,r)&=\frac{24b}{r^4}+\frac2{r^3}\big((1-w)^{-2}-1\big)+\frac{w/r^3+a/r^2}{(1-w)^3},\\
C_P(w,a,r)&=\frac2{r^3(1-w)^2}+\frac{w/r^3+a/r^2}{(1-w)^3},\\
C_V(w,r)&=\frac1{r^2(1-w)^2}.
\end{aligned}
\tag{3}
$$

These are the previously derived derivatives of the changed causal row. The $a$ term accounts for changing the emission time; it is not an omitted acceleration law or an additional model term. If $E_P(s),E_V(s)$ bound the source errors, then on a comparison cell ending at $t_k$,

$$
p''\le \lambda p+f_k,\qquad
f_k=\rho_k+16\sum_m n_m\left[C_P(w_m,a_m,r_m)E_P(t_k-r_m)+C_V(w_m,r_m)E_V(t_k-r_m)\right].
\tag{4}
$$

Here $n_m$ is the complete possible-channel count in shell $m$, $\rho_k$ is the certified full-law residual, and $\lambda$ exceeds the receiver derivative, including the stationary field. The parent's frozen stationary theorem supplies

$$
\|DS_0(y)\|\le D_B|y|^2,\qquad
D_B=6(14.3977)+\frac{39975B^2}{(1-B)^7}.
$$

Thus it is sufficient to take

$$
\lambda\ge16D_BB^2+16\sum_mn_mL(b_m,w_m,a_m,r_m).
\tag{5}
$$

The comparison starts at $h=9/2$ with $p(h)=0.000834$, $v(h)=0.005088$. These exceed the separately derived frozen target endpoint errors $0.00083396142635$ and $0.00508785085027$. The source-error input is the accepted full-population error envelope through $13/4$, the maximum of the frozen environmental and target profiles through $15/4$, and the sharper independently derived full-population profile through $17/4$. No source error is replaced by the target's present error or charged at the receiver's later time.

For a cell of length $d=1/256$, exact positive-series bounds implement

$$
\begin{aligned}
p_+&=p\cosh(\sqrt\lambda d)+v\frac{\sinh(\sqrt\lambda d)}{\sqrt\lambda}+f_k\frac{\cosh(\sqrt\lambda d)-1}{\lambda},\\
v_+&=p\sqrt\lambda\sinh(\sqrt\lambda d)+v\cosh(\sqrt\lambda d)+f_k\frac{\sinh(\sqrt\lambda d)}{\sqrt\lambda},\\
a_+&=\lambda p_++f_k.
\end{aligned}
\tag{6}
$$

Each state is rounded upward after the cell. The positive Taylor series has an explicitly bounded geometric tail; this calculation does not use ordinary floating-point hyperbolic evaluations as its proof.

## 3. Strict upward motion through $19/4$

For $B=3/100$, condition (1) gives 130 possible generated channels. Their shell counts are

| Squared distance $m$ | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $n_m$ | 6 | 12 | 8 | 6 | 24 | 24 | 12 | 30 | 4 | 4 |

The received source bounds for the nearest shell are $(b,w,a)<(0.001925444,0.006117071,0.021236089)$; for squared distance two they are below $(0.000589194,0.001771721,0.006490039)$. More distant rows can use the already accepted $(1/2000,1/1000,1/100)$ prefix bound. Equations (3)–(5) give $L_{\rm receiver}<19.284$, so $\lambda=20$ suffices. The residual in (4) uses the parent's individual $1/32$ time bins; it does not charge the final $t=5$ residual over the earlier interval.

The exact comparison yields the following endpoint error bounds:

$$
p(19/4)<0.003433,\qquad
v(19/4)<0.018393,\qquad
a(19/4)<0.093595.
\tag{7}
$$

The same exact Bernstein calculation bounds the full three-coordinate comparison polynomial. Its largest Euclidean norm plus position error is below $0.019658931<3/100$, strictly closing the first-exit receiver tube used in (2)–(5). The wider rounded budgets $(p,v,a)=(0.00344,0.0184,0.0936)$ are also sufficient throughout this interval.

The scalar vertical path is a quintic Hermite polynomial on each interval of length $1/1024$. Its Bernstein control values are formed exactly from the archived binary endpoint position, speed and acceleration. Differentiating those controls bounds the polynomial vertical velocity throughout each interval. Subtracting (6)'s velocity error at the containing cell's upper endpoint establishes strict positivity continuously, including between saved samples.

The measured exact-arithmetic sign calculation gives

$$
\dot y_{e_1,3}(t)>0.013239\quad(9/2\le t\le19/4).
\tag{8}
$$

The left target obeys the reflected equation with global polarity reversal, which leaves the polarity products invariant. Its vertical motion is identical. Therefore, once the complete-population continuation premises through $19/4$ are discharged, neither target has an upward maximum in this interval. Together with the accepted preceding sign certificate, this extends the absence of a new maximum after the last minimum through $19/4$.

## 4. The next proof boundary

The initial uniform comparison through $5$ uses $B=1/16$, 154 first-front-possible target channels and $\lambda=60$. It returns position error above $0.0437$ and velocity error above $0.3473$. Adding the numerical position near $0.03803$ exceeds this auxiliary target radius, and the velocity allowance exceeds the numerical upward velocity near $0.13553$. This calculation proves neither a turn nor its absence through $5$; it is insufficient for that endpoint.

There is also a separate complete-population obligation after $19/4$. The coarse sufficient full-population state at $19/4$, approximately $P<0.04418$ and $V<0.17973$, cannot by itself close a quarter-step linear displacement bound below the original environmental ceiling $1/16$: already $0.04418+(1/4)0.17973>1/16$, before any acceleration contribution. This is a limitation of those uniform state estimates, not a demonstrated exit by the exact solution. A sharper complete state comparison or a complete population approximant through the next interval is required before a target-only extension may be interpreted as continuation of the original full history class.

The numerical target constructor's later stopping time, $2801/512$, records a construction boundary. Its proposed unit-speed bracket is not an actual event certificate. The original class permits target speed up to four; loss of the constructor's preferred subunit chart and loss of the original full-history class are different questions. To establish an actual first boundary, one must compare complete histories up to a stopped solution, retain every admitted root, and prove the relevant boundary or sign with error intervals.

## Local evidence and falsifiers

The disposable exact instrument is the literal path `.tmp/mec-008-post-restart/hale/five_error.py`. Its known quadratic Bernstein, constant-acceleration comparison, radical/onset, upper-profile-lookup and exact Euclidean norm-ceiling controls passed before its target run. Receipts are the literal paths `.tmp/mec-008-post-restart/hale/five-error-known.json` and `.tmp/mec-008-post-restart/hale/five-error-target.json`.

The authenticated target archive is the literal path `.local-data/master-equation-closure/post-restart/approximant/target-h5.npz`; the parent's full-law residual evidence is `.local-data/master-equation-closure/post-restart/five-check/target-residual.json`. Outward polynomial source norms are read from the existing `population-check/polynomial-bounds.json` and `cubic-population-check/polynomial-bounds.json` under the same local-data owner. The imported frozen independent error receipts are explicitly listed in the new target receipt. Archive authentication remains enforced; source-code hashes are provenance only.

Falsifiers are an uncovered source time, an omitted onset-possible source identity, an invalid shifted-root coefficient, a violated residual or norm premise, failed vector tube closure, nonpositive continuous Bernstein velocity after subtracting its comparison error, or failure of the complete-population continuation premise. Any such finding withdraws the corresponding finite conclusion. None licenses replacing the Master Equation or claiming long-time settling.
