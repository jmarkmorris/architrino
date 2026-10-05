# Alternating rings through wake speed: exclusion and the self-root boundary

## Result and scope

Uniform alternating circular rings with $M=2,4,6,8,10,12,24$ members do not satisfy the unchanged Master Equation at any speed $0\leq\beta\leq1$. At positive speed their complete acceleration sum has a strictly positive tangential component; at rest their radial acceleration is strictly inward rather than zero. **Grade: derived exclusion conditional on the new computer-assisted interval signs for the seven declared inventories.** Every interval sign is outward rounded and the cover spans the entire speed interval, rather than a finite scan. A separate adjudication is required before calling this new certificate independently checked.

For every fixed finite even $M$, the near-rest tangential expansion is

$$
C_t(\beta)=\frac{M^2+2}{24}\beta+O(\beta^3),\qquad\beta\to0.
$$

Thus every such inventory is excluded at sufficiently small positive speed. **Grade: derived local expansion, pending separate adjudication of its reconstruction below.** It does not prove whole-subwake positivity for every unexamined even inventory.

At exactly wake speed there are $M-1$ simple partner roots per receiver and no positive-delay self root. Immediately above wake speed one self root per receiver is born from the excluded diagonal; its delay tends to zero and its tangential acceleration diverges. **Grade: derived complete census and one-sided asymptotics for every fixed even $M$.** Equality itself is regular for all retained partner rows, but it has no root-count-preserving neighborhood across the speed boundary.

Use $c_f=1$ in every number, symbolic $\beta=v/c_f$, $K>0$, $R>0$, and positive rotation orientation. Reflection covers the other orientation. No primitive mass, response multiplier, cap, self exclusion or event law is added. There is no stability linearization about these unbalanced circles.

## 1. Owners consumed and the gap filled

The [accepted six-member ladder record](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md) owns the exact superwake balance ladder. Its frozen original interval receipt explicitly gives T00's compact domain as $0.05\leq\beta\leq1$, five roots per receiver, 30 directed hits and no tangential zero. That receipt alone does not cover speeds below $0.05$; the near-rest result and the new complete cover fill that gap without redoing the ladder.

The [binary secondary theorem's raw partner ledger](../../binary-research/analysis/circular-binary-secondary-theorems.md#common-chart) already has a positive tangential component for every $0<\beta\leq1$. Although its surrounding document studies the separately proposed ceiling response, only the displayed raw unchanged-equation partner row is consumed here. No boundary projection is inherited. With $\xi=\beta\cos\xi$ and $0<\xi<\pi/2$, that row gives

$$
C_t=\frac{\sin\xi}{4\cos^2\xi(1+\beta\sin\xi)}>0.
$$

The [slow rotor owner](slow-rigid-rotor-first-order-torque.md#the-push-along-the-motion) also supplies the signed finite-sum coefficient. This report reconstructs that coefficient directly from the exact scalar root law and independently covers the specified finite inventories all the way to equality.

## 2. Complete subwake and equality census

For $M=2N$ members at phases $2\pi i/M$ and polarities $(-1)^i$, write the scalar root law in the descending partner labels $j=1,\ldots,M-1$:

$$
x_j-\beta\sin x_j=\frac{j\pi}{M},\qquad0<x_j<\pi.
$$

The transmitting member is $-j$ modulo $M$, with polarity product $(-1)^j$. Its half-chord variable is $x_j$, range and delay are $\ell_j=\Delta_j=2R\sin x_j$, and transmitter factor is $D_j=1-\beta\cos x_j$. This half-chord variable includes the phase label; for a partner it is not simply $\Omega\Delta_j/2$.

For $0\leq\beta\leq1$, the left side increases strictly on $(0,\pi)$ because $D_j>0$ there. Its endpoint values are $0$ and $\pi$, so each of these $M-1$ levels has exactly one root. The full scalar function $\beta\sin x-x$ ranges from $0$ to $-\pi$ and has no other interior lattice levels. This proves completeness, including all source labels. The circle is bounded, so every causal delay is at most $2R$; remote history cannot add a missed root.

A self root would satisfy $\beta\sin x=x$ at $x>0$, which is impossible when $\beta\leq1$, since $\sin x<x$ for every $x\in(0,\pi)$. The endpoint $x=0$ is the excluded zero-delay self coincidence, not an ordinary hit. At $\beta=1$ all partner roots still have $D_j=1-\cos x_j>0$, while the diagonal limit has $D=0$. No retained row is singular at equality.

Consequently the exact directed census through equality is

$$
N_{\rm hits}=M(M-1),\qquad N_{\rm self}=0.
$$

The census is a statement about these prescribed histories and includes the ordinary self channel even when that channel is empty. It is not a rule that disables self interaction. **Falsifier:** a positive-delay root outside these lattice levels or a retained partner root with zero $D$ defeats the census argument.

## 3. Near-rest expansion and static obstruction

The complete baseline acceleration in the receiver's radial and tangential frame is $K(C_r,C_t)/R^2$, where

$$
C_r=\frac14\sum_{j=1}^{M-1}\frac{(-1)^j}{\sin x_jD_j},\qquad
C_t=\frac14\sum_{j=1}^{M-1}\frac{(-1)^j\cos x_j}{\sin^2x_jD_j}.
$$

At rest, $x_j=t_j=j\pi/M$ and paired cosines give $C_t(0)=0$. Implicit differentiation gives

$$
x_j'=\frac{\sin x_j}{D_j},\qquad D_j'=-\cos x_j+\beta\sin x_jx_j'.
$$

Differentiating one unsigned tangential row at zero produces $-1/(4\sin^2t_j)$, hence

$$
C_t'(0)=-\frac14\sum_{j=1}^{M-1}(-1)^j\csc^2t_j.
$$

The finite sine-product identity, differentiated twice logarithmically, gives $\sum_{j=0}^{L-1}\csc^2(z+j\pi/L)=L^2\csc^2(Lz)$. Taking $z\to0$ after subtracting the $j=0$ term yields $S_L=\sum_{j=1}^{L-1}\csc^2(j\pi/L)=(L^2-1)/3$. In the even inventory, the even-index subset is $S_N$. Therefore

$$
\sum_{j=1}^{M-1}(-1)^j\csc^2t_j=2S_N-S_M=-\frac{M^2+2}{6},
\qquad C_t'(0)=\frac{M^2+2}{24}>0.
$$

The root function is analytic near zero for each fixed finite $M$. Moreover $x_j(-\beta)=\pi-x_{M-j}(\beta)$, which makes $C_t$ odd because $M$ is even. This removes the quadratic term and proves the displayed $O(\beta^3)$ remainder. No uniform remainder constant in $M$ is supplied.

At exactly rest, $C_r(0)<0$ for every finite even $M$. To see this directly, let $a_j=\csc(j\pi/M)$ for $j\leq N$; these decrease strictly to $a_N=1$. Reflection gives $C_r(0)=\frac12\sum_{j=1}^{N-1}(-1)^ja_j+\frac14(-1)^N$. If $N$ is odd, pair the successive negative and positive terms to obtain $C_r(0)\leq-1/4$. If $N$ is even, pair all except the last negative term and use $-a_{N-1}/2+1/4<-1/4$. The binary attains $-1/4$; every larger inventory is strictly below it. The stationary paths require zero acceleration, so no positive coupling or radius repairs this mismatch.

**Grade: derived local and static results. Falsifiers:** a different independently differentiated complete sum, failure of the finite sine-product identity, or a stationary regular alternating ring with vanishing radial sum would overturn the respective result.

## 4. New outward interval cover

The new [low-speed instrument](../../../../../scripts/braid-program/ring_low_speed_census_20261003.py) imports no existing ring evaluator. It first passes known controls: static baseline acceleration $1/4$ and radial derivative $-1/4$ at range two, and interval enclosures of the independently known signed $\csc^2$ sum for every declared inventory. The known receipt is `.local-data/ring-exploration/low-speed/known.json`; the target is `.local-data/ring-exploration/low-speed/target.json`.

For each speed box $[a,b]$, the instrument proposes scalar roots at both endpoints and encloses each in a small interval. Outward endpoint signs and a positive transmitter factor certify the proposal. Since $x_j'(\beta)>0$, the interval from the lower endpoint's lower root bound to the upper endpoint's upper bound contains the root throughout the whole speed box. Substitution into the full signed sum then produces outward $C_t$ and $C_t'$ enclosures.

On $[0,0.001]$, a strictly positive derivative enclosure plus the exact $C_t(0)=0$ proves $C_t(\beta)>0$ for every positive speed. An adaptive dyadic cover of $[0.001,1]$ retains only whole boxes whose $C_t$ lower endpoint is strictly positive. The target explicitly checks that adjacent boxes meet and that the cover reaches both endpoints. Thus the instrument could not certify absence merely from sampled speeds.

| Members $M$ | Conservative lower bound for $C_t'$ on $[0,0.001]$ | Positive $C_t$ boxes on $[0.001,1]$ | Maximum subdivision depth | $C_t(1)$, rounded point display |
| --- | ---: | ---: | ---: | ---: |
| 2 | 0.249998 | 1 | 0 | 0.184206996347 |
| 4 | 0.745228 | 13 | 10 | 0.656726185542 |
| 6 | 1.568524 | 20 | 11 | 1.45931197896 |
| 8 | 2.719846 | 21 | 11 | 2.59166262159 |
| 10 | 4.199181 | 21 | 11 | 4.05411511754 |
| 12 | 6.006524 | 21 | 11 | 5.84701881548 |
| 24 | 23.738669 | 29 | 12 | 23.5570198220 |

**Grade: measured outward interval signs, conditional on the explicitly derived complete census and interval root-continuation argument.** The decimal lower bounds in the table are rounded downward; the authoritative receipt retains all binary interval endpoints. The wake-speed decimals are only a readable display of individually certified positive interval quantities. There are 126 accepted boxes in total. No speed-dependent radius adjustment can cancel a nonzero $C_t$, since the tangential acceleration is $KC_t/R^2$ and a uniform circle requires it to vanish.

Falsifier: a failed endpoint sign or root-continuation bound, a missing speed segment, an interval lower endpoint not strictly positive, or a zero of the complete tangential sum in the certified domain invalidates the corresponding certificate. Replaying this instrument is not an independent adjudication.

## 5. The self hit born just above equality

Put $\beta=1+\varepsilon$, $\varepsilon\downarrow0$, and fix $M,R$. The new descending self root solves $(1+\varepsilon)\sin x=x$. Expanding this equation gives

$$
\begin{aligned}
x&=\sqrt{6\varepsilon}\left[1-\frac7{20}\varepsilon+O(\varepsilon^2)\right],\\
D&=1-(1+\varepsilon)\cos x=2\varepsilon-\frac35\varepsilon^2+O(\varepsilon^3),\\
\Delta=\ell&=2R\sin x=2R\sqrt{6\varepsilon}\left[1-\frac{27}{20}\varepsilon+O(\varepsilon^2)\right].
\end{aligned}
$$

Its polarity product is positive. In the same baseline normalization its coefficients obey

$$
C_{r,\rm self}=\frac{1}{8\sqrt6\,\varepsilon^{3/2}}[1+O(\varepsilon)],\qquad
C_{t,\rm self}=\frac{1}{48\varepsilon^2}[1+O(\varepsilon)].
$$

All partner rows have finite limits at equality, so this single positive tangential row dominates at sufficiently small positive $\varepsilon$ for every fixed finite $M$. There is consequently a one-sided interval above wake speed with no balance, although this theorem supplies no numerical width uniform in $M$.

Before the first positive lattice-level fold, the full directed census is $M^2$, with $M$ self roots. This threshold is characterized by

$$
\sqrt{\beta^2-1}-\arccos(1/\beta)=\frac{\pi}{M}.
$$

For sufficiently small $\varepsilon$ the maximum is below this value. The equality transition therefore adds one root per self channel, rather than an ordinary finite-delay pair. At $\beta=1$ the root is exactly the excluded endpoint; as $\beta\downarrow1$ from above its ordinary contribution has no finite acceleration limit. A limit of above-wake ledgers cannot be substituted for the actual equality ledger.

**Grade: derived fixed-inventory census and asymptotics. Falsifiers:** a different series of the self equation, an additional level before the displayed maximum reaches $\pi/M$, or a self contribution with a finite one-sided limit invalidates the respective result. This boundary analysis supplies no linear stability spectrum and no evolution through the singular limit.

## Remaining scope and reproduction

Whole-subwake exclusion is now established at computer-assisted scope for the seven inventories in the table. For another fixed even inventory, the exact census, static obstruction and sufficiently-slow exclusion are derived, but positivity throughout its remaining subwake interval is open. Neither a finite inventory list nor the local coefficient proves a theorem for all even $M$.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_low_speed_census_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_low_speed_census_20261003.py --stage target
```

Only this new analysis, its new instrument and unique local evidence are authored. The shared queue, manuscript, work log, indexes and any qualification/rank/score changes remain outside this scope. No production solver, Git publication or equation variation is invoked. The coordinator owns integration and separate adjudication.
