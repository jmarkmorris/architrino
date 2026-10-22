# Interval certificate for the untwisted rotating alternating ladder at radius 1000

## Result

The untwisted [rotating alternating ladder](rotating-alternating-ladder.md) with pair radius $R=1000$, in units $K=c_f=1$, balances exactly under the unchanged Master Equation at exactly one spacing ratio and member speed in an explicit box, and that balance lies in a much smaller box. Write $\delta=d/R$ for the spacing ratio and $\varepsilon=\omega R$ for the member speed. Let

$$
X=[3.3450352918,\ 3.3450352937]\times[0.0138408140807,\ 0.0138408144806].
$$

There is exactly one $(\delta,\varepsilon)\in X$ at which the ladder of radius $1000$, with every rung $k\in\mathbb Z$ on both rails retained, satisfies the law at every member and every time; and that point lies in

$$
\delta\in[3.34503529238,\ 3.34503529306],\qquad \varepsilon\in[0.0138408142416,\ 0.0138408143198],
$$

so that the spacing and angular rate obey

$$
d\in[3345.03529238,\ 3345.03529306],\qquad \omega\in[1.38408142416,\ 1.38408143198]\times10^{-5}.
$$

The certified half-widths are $3.35\times10^{-10}$ in $\delta$ and $3.91\times10^{-11}$ in $\varepsilon$. The recorded float values $\delta\approx3.345035293$ and $\varepsilon\approx0.01384081428$ of the subject's table lie inside the final enclosure. The intervals above are rounded outward (final enclosure) or inward (uniqueness box $X$) from the binary endpoints stored in the receipt.

**Claim grade.** Derived, as a computer-assisted proof: every inequality the argument needs was checked in outward-rounded interval arithmetic, and every truncation of the sum over rungs is covered by an explicit tail bound proved below. The proof rests on four declared dependencies: the causal-root lemma and the reduction to two scalar conditions (Lemmas 1 and 2 of the [small-speed existence proof](rotating-ladder-small-speed-existence.md), accepted by its [independent adjudication](rotating-ladder-small-speed-existence-independent-adjudication-2026-10-03.md), re-derived in Section 1 and re-verified at sampled rows by a raw three-vector evaluation); the correctness of mpmath 1.3.0 `iv` as an outward-rounding interval library; the correctness of the Python transcription of the formulas of Sections 2 to 4, which the known-case controls of Section 5 test but do not prove; and the hand derivation of the tail bounds in Section 3. The derivation, its transcription, the Krawczyk argument and the root enclosures were independently reviewed and accepted with reporting corrections (see Independent review disposition below); the transcription remains tested rather than proved. The certificate is new evidence: it does not depend on the existence theorem's unspecified speed threshold $\varepsilon_0$, which it neither uses nor bounds.

**Claim boundary.** The statement is existence and uniqueness of the balance in the box $X$ at $R=1000$, for rigid untwisted rotation with complete history, under the stated law. It says nothing about stability, about other branches outside $X$, about other radii, or about twisted or translating structures.

## 1. Law, configuration and reduction

**Law.** A receiver at $\mathbf x$ at time $T$ receives from each source $j$, at each causal emission time $s<T$ with $T-s=\lvert\mathbf x-\mathbf X_j(s)\rvert$, the acceleration $\sigma_{ij}(\mathbf x-\mathbf X_j(s))/(\tau^3\lvert D\rvert)$, where $\tau=T-s$, $\mathbf n=(\mathbf x-\mathbf X_j(s))/\tau$, $D=1-\mathbf n\cdot\mathbf V_j(s)$ and $\sigma_{ij}=\pm1$ is the product of polarities. Contributions add over all sources and all causal roots, including any positive-delay root from the receiver's own past. The emission at $s=T$ is excluded. No cap, response factor, event rule or altered kernel is used. Units are $c_f=1$ and $K=1$.

**Configuration.** For every $k\in\mathbb Z$ the positive member of rung $k$ moves on $((-1)^kR\cos\omega t,(-1)^kR\sin\omega t,kd)$ and the negative member on the opposite point of the same circle, for all past and future time. Measuring lengths and times in units of $R$ gives the unit ladder with radius $1$, spacing $\delta$ and angular rate $\varepsilon$; accelerations scale by $1/R^2$. The receiver is the positive member of rung $0$ at $\mathbf x=(1,0,0)$ at time $0$. The source $(\nu,k)$, with rail sign $\nu=\pm1$, has path $(\nu\cos\varepsilon t,\nu\sin\varepsilon t,k\delta)$ and polarity product $\nu(-1)^k$ with the receiver; $(\nu,k)=(+1,0)$ is the receiver itself.

**Causal roots (Lemma 1, re-derived).** With $z=k\delta$ the squared distance from the receiver to the source at time $-\tau$ is $z^2+2-2\nu\cos(\varepsilon\tau)$, so a causal delay is a zero $\tau\ge0$ of $\Phi_\nu(\tau)=\tau^2-z^2-2+2\nu\cos(\varepsilon\tau)$. Now $\Phi_\nu(0)=-z^2-2(1-\nu)\le0$, with equality only for $(\nu,z)=(+1,0)$; and $\Phi_\nu'(\tau)=2\tau-2\nu\varepsilon\sin(\varepsilon\tau)\ge2\tau(1-\varepsilon^2)>0$ for $\tau>0$ because $\lvert\sin x\rvert\le\lvert x\rvert$; and $\Phi_\nu\to\infty$. Hence every source other than the receiver has exactly one causal root $\tau_\nu(z,\varepsilon)>0$, and the receiver has no positive-delay root from its own past (derived). Write $\theta=\varepsilon\tau$, $p=\sin\theta/\theta$, $w=\tau-\nu\varepsilon\sin\theta=\tau(1-\nu\varepsilon^2p)$ and $D_\nu=w/\tau$; then $1-\varepsilon^2\le D_\nu\le1+\varepsilon^2$.

**Rows (Lemma 2, re-derived).** On the receiver's rail the source at the root sits at angle $-\theta$, so $\mathbf x-\mathbf X=(1-\cos\theta,\sin\theta,-k\delta)$ and $\mathbf V=\varepsilon(\sin\theta,\cos\theta,0)$; on the other rail it sits at angle $\pi-\theta$, so $\mathbf x-\mathbf X=(1+\cos\theta,-\sin\theta,-k\delta)$ and $\mathbf V=-\varepsilon(\sin\theta,\cos\theta,0)$. In both cases $1-\mathbf n\cdot\mathbf V=D_\nu>0$. Multiplying by $\nu(-1)^k/(\tau^3D_\nu)$ and using $\sin\theta=\varepsilon\tau p$, the source contributes the tangential acceleration $\varepsilon(-1)^kg_\nu$, the outward radial acceleration $\nu(-1)^kh_\nu$ and the axial acceleration $-\nu(-1)^kk\delta/(\tau^3D_\nu)$, with

$$
g_\nu=\frac{p(\theta)}{\tau\,w},\qquad h_\nu=\frac{1-\nu\cos\theta}{\tau^2\,w},\qquad \tau=\tau_\nu(k\delta,\varepsilon).
$$

The axial terms of $k$ and $-k$ cancel because $\tau_\nu$ depends on $z^2$. With

$$
G(\delta,\varepsilon)=\sum_{k\ne0}(-1)^kg_+(k\delta,\varepsilon)+\sum_{k\in\mathbb Z}(-1)^kg_-(k\delta,\varepsilon),\qquad
S(\delta,\varepsilon)=\sum_{k\in\mathbb Z}(-1)^kh_-(k\delta,\varepsilon)-\sum_{k\ne0}(-1)^kh_+(k\delta,\varepsilon),
$$

the receiver's acceleration is $\varepsilon G$ along the motion, $-S$ radially outward and $0$ along the axis. By the screw, rotation and polarity-exchange symmetries of Lemma 2(d), the ladder of radius $R$ satisfies the law at every member and time if and only if

$$
F(\delta,\varepsilon)=\bigl(G(\delta,\varepsilon),\ S(\delta,\varepsilon)-R\,\varepsilon^2\bigr)=0 .
$$

This is the subject proof's reduction; it is graded derived there and accepted by the adjudication. Here it was additionally re-verified at sampled rows by control C3 of Section 5 (measured).

**Absolute convergence (derived).** From $\tau\ge\lvert z\rvert$ (both rails, since $\tau^2=z^2+4\sin^2(\theta/2)$ or $z^2+4\cos^2(\theta/2)$) and $w\ge(1-\varepsilon^2)\tau$: $\lvert g_\nu\rvert\le1/((1-\varepsilon^2)k^2\delta^2)$, $\lvert h_\nu\rvert\le2/((1-\varepsilon^2)\lvert k\rvert^3\delta^3)$, and the axial term is at most $1/((1-\varepsilon^2)k^2\delta^2)$. All three component series converge absolutely, so their values do not depend on the order of summation.

## 2. The certificate: Krawczyk's test with a self-contained proof

Let $X=X_1\times X_2$ be a box in $(\delta,\varepsilon)$ with $\delta>0$ and $0<\varepsilon<1$, $\tilde x\in X$ a point, $\mathbf J$ an interval matrix whose entries enclose the partial derivatives of $F$ at every point of $X$, $Y$ any real $2\times2$ matrix, $\mathbf C=I-Y\mathbf J$ evaluated in interval arithmetic, and

$$
K=\tilde x-Y\,F(\tilde x)+\mathbf C\,(X-\tilde x),
$$

with $F(\tilde x)$ replaced by an interval enclosure. **Proposition (derived).** If $K$ lies in the interior of $X$ and every row of $\lvert\mathbf C\rvert$ sums to less than $1$, then $F$ has exactly one zero in $X$, and it lies in $K\cap X$. *Proof.* $F$ is continuously differentiable on a neighbourhood of $X$ (Section 3 gives uniformly convergent series of derivatives). For $x\in X$, the mean value theorem applied to each component on the segment from $\tilde x$ to $x$ gives $F(x)-F(\tilde x)=M(x-\tilde x)$, where row $i$ of $M$ is the gradient of $F_i$ at a point of $X$; so $M\in\mathbf J$ entrywise. Then $\gamma(x)=x-YF(x)=\tilde x-YF(\tilde x)+(I-YM)(x-\tilde x)\in K\subset X$. By Brouwer's theorem $\gamma$ has a fixed point $x^*$, so $YF(x^*)=0$. Since every matrix $M\in\mathbf J$ has $\lVert I-YM\rVert_\infty<1$, $YM$ is nonsingular, hence $Y$ is, hence $F(x^*)=0$. If $x,y\in X$ are zeros, the same mean value argument gives $0=M'(x-y)$ with $M'\in\mathbf J$, so $x-y=(I-YM')(x-y)$ and $\lVert x-y\rVert_\infty\le\lVert I-YM'\rVert_\infty\lVert x-y\rVert_\infty$, forcing $x=y$. Every zero lies in $\gamma(X)\subset K$. $\qquad\blacksquare$

The two sums defining $F$ are evaluated as a head $\lvert k\rvert\le N$, summed term by term in interval arithmetic, plus a tail $\lvert k\rvert>N$, enclosed by the bounds of Section 3. The same is done for each Jacobian entry. Because $g_\nu$ and $h_\nu$ are even in $k$, the head is $g_-(0)+2\sum_{k=1}^N(-1)^k(g_++g_-)$ for $G$ and $h_-(0)+2\sum_{k=1}^N(-1)^k(h_--h_+)$ for $S$.

**Root enclosures (requirement (a)).** For each $k$ with $0\le k\le N+1$ and each rail, the instrument encloses $\tau_\nu(k\delta,\varepsilon)$ simultaneously for all $(\delta,\varepsilon)$ in the box by the parametric interval Newton operator $N(T)=m-\Phi_\nu(m;z,\varepsilon)/\Phi_\nu'(T;\varepsilon)$, with $m$ the midpoint of $T$ and $\Phi_\nu$ written as $\tau^2-z^2-4\sin^2(\varepsilon\tau/2)$ for $\nu=+1$ and $\tau^2-z^2-4\cos^2(\varepsilon\tau/2)$ for $\nu=-1$ to avoid cancellation. If $0\notin\Phi_\nu'(T)$ and $N(T)$ lies in the interior of $T$, then for every parameter point there is exactly one zero of $\Phi_\nu$ in $T$ and it lies in $N(T)$; by Lemma 1 it is the causal root. The starting box is a float guess with a small radius, falling back to the Lemma 1(c) bracket $\lvert z\rvert\le\tau_+\le\lvert z\rvert/\sqrt{1-\varepsilon^2}$, $\sqrt{(z^2+4)/(1+\varepsilon^2)}\le\tau_-\le\sqrt{z^2+4}$; the float guess only seeds the box and plays no role in the proof. The instrument stops with an error if any root is not certified. In the target run all $20{,}003$ roots of each of the two evaluations (at the centre and over the box) were certified, with at most three Newton steps. Sampled enclosures over the uniqueness box, each started from the Lemma 1 bracket, are:

| Rail $\nu$ | Rung $k$ | Enclosure of $\tau_\nu$ over $X$ | Width | $D_\nu$ over $X$ |
| --- | --- | --- | --- | --- |
| $-1$ | $0$ | $[1.99980847160,\ 1.99980847162]$ | $1.1\times10^{-11}$ | $1.0001915437$ |
| $+1$ | $1$ | $[3.3453556815,\ 3.3453556837]$ | $2.0\times10^{-9}$ | $0.9998085003$ |
| $-1$ | $1$ | $[3.8969671010,\ 3.8969671028]$ | $1.7\times10^{-9}$ | $1.0001914753$ |
| $+1$ | $100$ | $[334.50676514,\ 334.50676535]$ | $2.0\times10^{-7}$ | $1.0000412359$ |
| $+1$ | $10^4$ | $[33450.352958,\ 33450.352979]$ | $2.0\times10^{-5}$ | $1.0000003803$ |
| $-1$ | $10^4$ | $[33450.352935,\ 33450.352956]$ | $2.0\times10^{-5}$ | $0.9999996197$ |

The widths are those of the parameter box propagated through $\partial\tau/\partial\delta=kz/w$, not numerical error.

**Head evaluation.** Values and first derivatives of $g_\nu$ and $h_\nu$ are propagated in interval arithmetic by forward differentiation in $(\delta,\varepsilon)$. The root enters with the implicit derivatives $\partial\tau/\partial\delta=kz/w$ and $\partial\tau/\partial\varepsilon=\nu\tau\sin(\varepsilon\tau)/w$, both obtained by differentiating $\Phi_\nu(\tau)=0$ and evaluated on the certified root enclosure. The function $p=\sin\theta/\theta$ is evaluated as $\sin\theta/\theta$ for $\theta>10^{-3}$ and by its alternating Taylor series with a remainder interval below; in the target the smallest delay angle is about $0.0277$ (the rung partner; corrected after review from an earlier $0.046$), so the Taylor branch is used only in the zero-speed controls.

## 3. Tail bounds (requirement (b))

All bounds below hold uniformly over a box with $\delta\in[\underline\delta,\overline\delta]$, $\varepsilon\in[\underline\varepsilon,\overline\varepsilon]$, $0\le\overline\varepsilon<1$. Write $L=1-\overline\varepsilon^2$ and $P=1+\overline\varepsilon^2$. Every bound is derived; the constants are evaluated in interval arithmetic and their upper endpoints used.

**Elementary facts.** (F1) $\tau\ge\lvert z\rvert$ on both rails. (F2) $z^2\le P\tau^2$: on the receiver's rail $z^2=\tau^2-4\sin^2(\theta/2)\le\tau^2$, and on the other $z^2=\tau^2(1+\varepsilon^2q)-4$ with $0\le q=\operatorname{sinc}^2(\theta/2)\le1$. (F3) $L\tau\le w\le P\tau$, because $\lvert\varepsilon\sin(\varepsilon\tau)\rvert\le\varepsilon^2\tau$; and as functions of $\tau$ at fixed $\varepsilon$, $w'=1-\nu\varepsilon^2\cos(\varepsilon\tau)$ with $\lvert w'\rvert\le P$ and $w''=\nu\varepsilon^3\sin(\varepsilon\tau)$ with $\lvert w''\rvert\le\varepsilon^3$. (F4) $s=\sin(\varepsilon\tau)/\varepsilon$ obeys $\lvert s\rvert\le\tau$, $s'=\cos(\varepsilon\tau)$, $\lvert s''\rvert\le\varepsilon$. (F5) Differentiating $\Phi_\nu(\tau)=0$: $\partial_z\tau=z/w$, $\partial_z^2\tau=(w^2-z^2w')/w^3$, $\partial_\varepsilon\tau=\nu\tau\sin(\varepsilon\tau)/w$; hence $\lvert\partial_z\tau\rvert\le\sqrt P/L$, $\lvert\partial_z^2\tau\rvert\le2P^2/(L^3\tau)$, $\lvert\partial_\varepsilon\tau\rvert\le1/L$.

**The tangential summand as a function of the delay.** At fixed $\varepsilon$, $g_\nu=A(\tau)=s\,\tau^{-2}\,w^{-1}$. The product rule with (F3) and (F4) gives

$$
\lvert A'\rvert\le\frac{a_3}{\tau^3},\quad a_3=\frac3L+\frac P{L^2};\qquad
\lvert A''\rvert\le\Bigl(\frac{\overline\varepsilon}L+\frac{\overline\varepsilon^3}{L^2}\Bigr)\frac1{\tau^3}+\frac{c_4}{\tau^4},\quad c_4=\frac{10}L+\frac{6P}{L^2}+\frac{2P^2}{L^3}.
$$

For $A''$ the six terms of $(abc)''$ with $a=s$, $b=\tau^{-2}$, $c=w^{-1}$ are bounded by $\varepsilon/(L\tau^3)$, $6/(L\tau^4)$, $\varepsilon^3/(L^2\tau^3)+2P^2/(L^3\tau^4)$, $4/(L\tau^4)$, $2P/(L^2\tau^4)$ and $4P/(L^2\tau^4)$, using $\lvert c'\rvert\le P/(L^2\tau^2)$ and $\lvert c''\rvert\le\varepsilon^3/(L^2\tau^2)+2P^2/(L^3\tau^3)$.

**Tail of $G$, using the alternation.** Extend the rung index to a real variable $t\ge1$, $z=t\delta$, and put $f_\nu(t)=g_\nu(t\delta,\varepsilon)$, which is analytic in $t$ by Lemma 1(b). By (F5), $\lvert d\tau/dt\rvert\le\overline\delta\sqrt P/L$ and $\lvert d^2\tau/dt^2\rvert\le2\overline\delta^2P^2/(L^3\tau)$, so

$$
\lvert f_\nu''(t)\rvert\le\lvert A''\rvert\Bigl(\frac{d\tau}{dt}\Bigr)^2+\lvert A'\rvert\Bigl\lvert\frac{d^2\tau}{dt^2}\Bigr\rvert\le\overline\delta^2\Bigl(\frac{\alpha_3}{\tau^3}+\frac{\alpha_4}{\tau^4}\Bigr),\qquad
\alpha_3=\frac P{L^2}\Bigl(\frac{\overline\varepsilon}L+\frac{\overline\varepsilon^3}{L^2}\Bigr),\quad\alpha_4=\frac P{L^2}c_4+\frac{2P^2}{L^3}a_3 ,
$$

and, by (F1), $\tau\ge t\underline\delta$, so for $M\ge1$

$$
\int_M^\infty\lvert f_\nu''\rvert\,dt\le\overline\delta^2\Bigl(\frac{\alpha_3}{2\underline\delta^3M^2}+\frac{\alpha_4}{3\underline\delta^4M^3}\Bigr).
$$

**Lemma (alternating remainder, derived).** Let $F$ be twice continuously differentiable on $[M,\infty)$ with $F\to0$ and $\int_M^\infty\lvert F'\rvert$, $\int_M^\infty\lvert F''\rvert$ finite. Then $U=\sum_{j\ge0}(-1)^jF(M+j)$ converges and $\lvert U-\tfrac12F(M)\rvert\le\tfrac12\int_M^\infty\lvert F''\rvert$. *Proof.* With $\Delta_j=F(M+j)-F(M+j+1)$, $\lvert\Delta_j\rvert\le\int_{M+j}^{M+j+1}\lvert F'\rvert$, so $\sum(-1)^j\Delta_j$ converges absolutely, and $\sum_{j\ge0}(-1)^j\Delta_j=U+(U-F(M))$, which shows that $U$ converges and $U=\tfrac12F(M)+\tfrac12\sum_j(-1)^j\Delta_j$. Grouping in pairs, $\Delta_{2i}-\Delta_{2i+1}=\int_0^1\!\int_0^1F''(M+2i+r+u)\,du\,dr$, whose size is at most $\int_{M+2i}^{M+2i+2}\lvert F''\rvert$; summing over $i$ gives $\lvert\sum_j(-1)^j\Delta_j\rvert\le\int_M^\infty\lvert F''\rvert$. $\qquad\blacksquare$

Apply it with $F=f_++f_-$ and $M=N+1$. Since $F$ is even in $k$, $\sum_{\lvert k\rvert>N}(-1)^kF(k)=2(-1)^MU$, and therefore

$$
\sum_{\lvert k\rvert>N}(-1)^k\bigl(g_++g_-\bigr)\in(-1)^{M}\bigl[F(M)-I_2,\ F(M)+I_2\bigr],\qquad I_2=2\,\overline\delta^2\Bigl(\frac{\alpha_3}{2\underline\delta^3M^2}+\frac{\alpha_4}{3\underline\delta^4M^3}\Bigr),
$$

where $F(M)=g_+(M\delta,\varepsilon)+g_-(M\delta,\varepsilon)$ is enclosed by two further certified rows. This route bounds the derivative of the summand in a continuous rung variable directly; the identity $G=B+\varepsilon^2E$ of Lemma 3 is not used.

**Tail of $S$.** By (F1) and (F3), $\lvert h_\nu\rvert\le2/(L\tau^3)\le2/(L\lvert k\rvert^3\underline\delta^3)$, and $\sum_{k>N}k^{-3}\le1/(2N^2)$; counting both signs of $k$ and both rails, $\bigl\lvert\sum_{\lvert k\rvert>N}(\dots)\bigr\rvert\le4/(L\underline\delta^3N^2)$. No alternation is needed here because $\partial F_2/\partial\varepsilon\approx-27.7$ makes this error small in $\varepsilon$.

**Tails of the Jacobian entries.** Each bound below is for one rung on one rail; the tail over $\lvert k\rvert>N$ multiplies it by $4$ and uses $\sum_{k>N}k^{-p}\le N^{1-p}/(p-1)$ with $\tau\ge k\underline\delta$. Termwise differentiation is justified because each bound is summable uniformly on the box.

- $\partial_\delta g_\nu=A'(\tau)\,k\,\partial_z\tau$, so $\lvert\partial_\delta g_\nu\rvert\le a_3\sqrt P\,k/(L\tau^3)$ and the tail is at most $4a_3\sqrt P/(L\underline\delta^3N)$.
- $\partial_\varepsilon g_\nu=\partial_\varepsilon A\rvert_\tau+A'\,\partial_\varepsilon\tau$. With $\partial_\varepsilon s=(\varepsilon\tau\cos\varepsilon\tau-\sin\varepsilon\tau)/\varepsilon^2$, $\lvert\partial_\varepsilon s\rvert\le\tau/\varepsilon+1/\varepsilon^2$, and $\partial_\varepsilon w=-\nu(\sin\varepsilon\tau+\varepsilon\tau\cos\varepsilon\tau)$, $\lvert\partial_\varepsilon w\rvert\le2\varepsilon\tau$: $\lvert\partial_\varepsilon g_\nu\rvert\le[1/(\underline\varepsilon L)+2\overline\varepsilon/L^2]\tau^{-2}+[1/(\underline\varepsilon^2L)+a_3/L]\tau^{-3}$, and the tail is at most $4\{[1/(\underline\varepsilon L)+2\overline\varepsilon/L^2]/(\underline\delta^2N)+[1/(\underline\varepsilon^2L)+a_3/L]/(2\underline\delta^3N^2)\}$.
- With $h_\nu=c_h\tau^{-2}w^{-1}$, $c_h=1-\nu\cos\varepsilon\tau\in[0,2]$, $\lvert dc_h/d\tau\rvert\le\varepsilon$: $\lvert dh_\nu/d\tau\rvert\le\overline\varepsilon/(L\tau^3)+b_4/\tau^4$ with $b_4=4/L+2P/L^2$. Then $\lvert\partial_\delta h_\nu\rvert\le(\sqrt P/L)\,k\,[\overline\varepsilon/(L\tau^3)+b_4/\tau^4]$, with tail at most $4(\sqrt P/L)[\overline\varepsilon/(L\underline\delta^3N)+b_4/(2\underline\delta^4N^2)]$.
- $\partial_\varepsilon h_\nu=\partial_\varepsilon h\rvert_\tau+(dh/d\tau)\,\partial_\varepsilon\tau$ with $\partial_\varepsilon c_h=\nu\tau\sin\varepsilon\tau$: $\lvert\partial_\varepsilon h_\nu\rvert\le1/(L\tau^2)+5\overline\varepsilon/(L^2\tau^3)+b_4/(L\tau^4)$, with tail at most $4[1/(L\underline\delta^2N)+5\overline\varepsilon/(2L^2\underline\delta^3N^2)+b_4/(3L\underline\delta^4N^3)]$.

**Values at the target ($N=10^4$, over $X$).** $I_2\le4.30\times10^{-11}$; $S$ tail $\le1.07\times10^{-9}$; tails of $\partial_\delta G$, $\partial_\varepsilon G$, $\partial_\delta S$, $\partial_\varepsilon S$ at most $4.28\times10^{-5}$, $2.59\times10^{-3}$, $1.49\times10^{-7}$ and $3.58\times10^{-5}$. The bound for $\partial_\varepsilon G$ uses no alternation and is loose, about half the entry itself; its effect is small but not confined to the off-diagonal: it enters both $C_{12}$ and $C_{22}$ of the contraction matrix $C=I-YJ(X)$ because the preconditioner entry $Y_{21}$ is nonzero, and the interval row-norm tests account for it and pass (corrected after review). It requires a positive lower speed $\underline\varepsilon>0$ and is not claimed for boxes touching zero speed.

## 4. The target computation

The box centre $\tilde x=(3.345035292723288,\ 0.013840814280681282)$ was found by a float Newton iteration on a float version of $F$ with $2\times10^5$ rungs; its role is only to be a point of $X$. The uniqueness box is $X=[\tilde x_1\pm10^{-9}]\times[\tilde x_2\pm2\times10^{-10}]$, the truncation is $N=10^4$, and the arithmetic is mpmath `iv` at 20 decimal digits. The outcome (measured by the instrument, certified by the Proposition):

- $F(\tilde x)$ is enclosed in $[-4.30,\ 4.30]\times10^{-11}$ for $G$ and $[-1.069,\ 1.069]\times10^{-9}$ for $S-1000\varepsilon^2$; the widths are almost entirely the tail bounds.
- The Jacobian over $X$ is enclosed in $\partial_\delta G\in[0.130397,\ 0.130483]$, $\partial_\varepsilon G\in[0.00202,\ 0.00721]$, $\partial_\delta S\in[0.0372299,\ 0.0372303]$, $\partial_\varepsilon S-2000\varepsilon\in[-27.67550,\ -27.67542]$ (outward-rounded; corrected after review, which found three displayed endpoints rounded inward relative to the receipt; the code uses the receipt's intervals, not these decimals). The head parts alone are $\partial_\delta G\approx0.1304402$, close to the first-order slope $\beta_*=0.1304156$, and $\partial_\varepsilon G\approx0.004616\approx\varepsilon/3$, as Proposition 6 of the existence proof predicts.
- With $Y$ the float inverse of the midpoint Jacobian, the rows of $\lvert I-Y\mathbf J\rvert$ sum to at most $0.0202$, and $K=[3.3450352923880,\ 3.3450352930581]\times[0.0138408142416,\ 0.0138408143198]$ lies in the interior of $X$.
- Over $X$, $S\in[0.19156813,\ 0.19156815]>0$, consistent with $S=1000\varepsilon^2$.

**Why this width.** The half-width $3.35\times10^{-10}$ in $\delta$ is $(Y)_{11}\approx7.67$ times the $G$ tail bound $I_2\approx4.3\times10^{-11}$; the half-width $3.9\times10^{-11}$ in $\varepsilon$ is about $(Y)_{22}\approx0.036$ times the $S$ tail bound $1.07\times10^{-9}$. Both tail bounds fall as $N^{-2}$, and run time grows linearly in $N$ (82 seconds of interval work at $N=10^4$), so a box ten times narrower would need about $N=3\times10^4$; an alternating bound for the $S$ tail would narrow $\varepsilon$ further at no cost in rows. The requested order $10^{-8}$ is exceeded by a factor of thirty, so no further narrowing was attempted.

**Truncation cross-check (measured).** The same instrument at $N=3000$ with $X$ widened to radii $10^{-8}$ and $2\times10^{-9}$ also certifies, with final enclosure $\delta\in[3.3450352886,\ 3.3450352969]$, $\varepsilon\in[0.01384081384,\ 0.01384081472]$, which contains the $N=10^4$ enclosure. This is consistency of one instrument with itself, not independent evidence; its value is that a violated tail bound at $N=3000$ would likely have shown as disjoint enclosures.

## 5. Known-case controls, run before the target

Every instrument passed a known case before the target run. The controls receipt was written at 2026-10-20T22:04:04Z and the target run started at 22:05:00Z (clock from `date -u` and file times). The two control runs before the passing one failed: the first stopped on a zero-speed root that the Lemma 1 bracket alone could not certify (the bracket is degenerate at $\varepsilon=0$; it is now padded); the second completed with C3 failing, a relative tangential deviation of $3.6\times10^{-7}$, and with $G$ enclosures $10^{-6}$ wide, both caused by a Taylor enclosure of $\operatorname{sinc}$ that was used up to $\theta=0.25$ with only two terms. The Taylor branch was restricted to $\theta<10^{-3}$ with four terms and an explicit remainder, after which every control passed. The failing receipt was overwritten by the passing run and is recorded here only.

- **C1, interval Newton on known roots (passed).** On $x^2-2$ over $[1,2]$ the Newton operator certified an enclosure of width $1.7\times10^{-21}$ that contains $\sqrt2$ computed to 40 digits. The kernel's causal-root routine at $\varepsilon=0$, where the sources are stationary and the roots are $\tau_+=\lvert z\rvert$ and $\tau_-=\sqrt{z^2+4}$ exactly, returned certified enclosures containing the exact values for $k\in\{0,1,7,1000\}$ on both rails at three spacings.
- **C2, static alternating sums against closed forms (passed).** At $\varepsilon=0$ the kernel's head plus certified tail, with $N=400$, enclosed $\sum_{k\ne0}(-1)^k/(k\delta)^2=-\pi^2/(6\delta^2)$ and $\sum_k(-1)^k/(4+k^2\delta^2)=\pi/(2\delta\sinh(2\pi/\delta))$ separately, and their sum $B(\delta)$ through the full $G$ routine, at $\delta=\delta_*=3.3452801575$, $2$ and $5$; for example at $\delta_*$ the enclosure of $G$ is $[-2.1,\ 2.7]\times10^{-8}$ around $B(\delta_*)=-6.05\times10^{-12}$. The enclosure of $S(\delta,0)$ lies inside the bracket of Lemma 8 at all three spacings ($[0.1915339,\ 0.1915353]$ at $\delta_*$, against the float value $0.1915345910$ recorded in the existence proof).
- **C3, raw three-vector rows against the reduction (passed).** A separately written float routine evaluates the canonical law directly: source position and velocity on the circle, causal root by bisection on $\tau-\lvert\mathbf x-\mathbf X(-\tau)\rvert$, $D=1-\mathbf n\cdot\mathbf V$, and the acceleration vector. At $(\delta,\varepsilon)=(3.345035293,\ 0.01384081428)$ and $(3.3,\ 0.3)$, for $k\in\{0,1,2,7,40\}$ on both rails, its delay, tangential and radial components agree with the kernel's $\tau_\nu$, $\varepsilon(-1)^kg_\nu$ and $\nu(-1)^kh_\nu$ to relative $4.3\times10^{-16}$, $6.4\times10^{-15}$ and $1.6\times10^{-14}$, and the axial components of rungs $k$ and $-k$ cancel exactly. This tests the reduction of Lemma 2 at these rows; it is not independent of the law, which both sides implement.
- **C4, Krawczyk routine on a known system (passed).** For $x^2+y^2=2$, $x=y$ on $[0.9,1.1]\times[0.85,1.12]$ the routine certified a box containing $(1,1)$, with contraction bound $0.125$; on the root-free box $[1.2,1.4]^2$ it correctly failed to certify.
- **C5, tail consistency (passed).** At the recorded float point, the enclosures of $G$ and $S$ with $N=300$ and $N=3000$ overlap; the $G$ enclosure narrows from $2.05\times10^{-7}$ to $1.03\times10^{-9}$, a ratio of about $198$ (corrected after review from an earlier statement of $100$; the bound $I_2$ has both $M^{-2}$ and $M^{-3}$ terms, so no pure power law applies).

## 6. Side conditions (requirement (c))

- **Positive separation (derived).** In units of $R$, two members on the same circle are $2$ apart, members at the same angle on successive rungs are $\delta$ apart, and all other pairs are farther apart; over $X$, $\delta>3.34>2$, so every pair of members is at least $2R=2000$ apart at all times.
- **Strictly below wake speed (derived).** Every member moves at speed $\varepsilon\le0.0138408145<1$, so $D_\nu\ge1-\varepsilon^2>0.99980$ for every source.
- **No positive-delay self root (derived).** Section 1, from Lemma 1 with $(\nu,z)=(+1,0)$: $\Phi_+(\tau)=\tau^2-4\sin^2(\varepsilon\tau/2)$ vanishes at $\tau=0$ and is strictly increasing for $\tau>0$.
- **Exactly one causal root per source (derived).** Section 1, and certified enclosures for $\lvert k\rvert\le N+1$.
- **Absolute convergence (derived).** Section 1; the axial component vanishes exactly by the pairing of $k$ and $-k$.

## 7. Next row this instrument could certify

The certificate was complete and recorded at 22:06:34Z, before 23:40Z, so the following is recorded as a proposal; the run was not started. Of the two faster recorded rows, $R=1$ with $\varepsilon\approx0.48440$, $\delta\approx2.973283306$ is the better next target. Every bound of Section 3 holds for any $\overline\varepsilon<1$, and Lemma 1 holds below wake speed, so the kernel and the tail bounds need no change. Evaluating the tail bounds alone at $N=10^4$ on a box of radius $10^{-8}$ around that row gives $I_2\le5.9\times10^{-9}$, $S$ tail $\le2.0\times10^{-9}$ and Jacobian tails at most $2\times10^{-4}$ (measured, by `tail_bounds`; no certification was attempted), so a box of half-width of order $10^{-7}$ in $\delta$ is expected (inferred, assuming $\partial_\delta G$ remains of order $0.1$). For $R=0.4$, $\varepsilon\approx0.87221$, the factors of $1/L=1/(1-\varepsilon^2)\approx4.2$ inflate the bounds to $I_2\le2.1\times10^{-6}$ and a $\partial_\delta G$ tail of $8.9\times10^{-3}$; a certificate is still expected there, with half-width of order $10^{-5}$ in $\delta$ or a larger $N$ (inferred). The changes needed are only parameters of the driver: $R$ in $F_2=S-R\varepsilon^2$ and in $\partial_\varepsilon F_2=\partial_\varepsilon S-2R\varepsilon$, the recorded starting point, the box radii and possibly $N$. Since the existence theorem gives no explicit $\varepsilon_0$, such a certificate would be the first proof of a balance at those speeds.

## Independent review disposition

Codex reviewed the frozen certificate (note SHA-256 `6c00962a2893bae30bef0971e12c202daef9c7ce180f4159d3358e1fe8adcf3a` and eight evidence files, frozen 2026-10-20T22:13:15Z) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T22:21:43Z, with the disposition **accept with corrections**. It accepts existence and uniqueness of the balance in the stated box, conditional on the correctness of mpmath 1.3.0 `iv`, after re-deriving the tail inequalities, checking the Krawczyk argument and its implementation, checking the parametric root enclosures, re-running the frozen code byte for byte (controls first, then the certificate, which reproduced every receipt field), testing the six tail constants against exact rational evaluation at two cutoffs, and probing 45 row and derivative values at the box corners and at its own pre-subject reference point with a separately constructed instrument. The corrections concern reported diagnostics only and do not change the final enclosure; the PI applied them to this note on 2026-10-20 after the review: the outward rounding of three displayed Jacobian endpoints and one residual endpoint (Section 4), the reason the broad $\partial_\varepsilon G$ tail bound is harmless and its restriction to positive lower speed (Section 3), the smallest delay angle (Section 2) and the control width ratio (Section 5). Two further reporting points stand as stated here. The receipt field `normC_upper` is a float conversion of the interval row-norm endpoints and is not guaranteed to be an upper bound (it falls below the exact sum by about $1.6\times10^{-18}$); the certificate itself compares the interval endpoints with one before any conversion, so the field is a diagnostic approximation. The receipt fields `rows_evaluated` and `newton_iterations_max` describe the 20001 head rows; the two boundary rows at $M=N+1$ are evaluated by separate calls, each certified. The failed development controls receipt was overwritten during development and cannot be reconstructed; the reviewer's controls-before-target rerun validates the final frozen implementation without recovering that history.

## What is not shown

- Nothing about stability, linear or nonlinear.
- Uniqueness holds only in $X$. Other balances at $R=1000$ with $(\delta,\varepsilon)$ outside $X$ are neither excluded nor examined; the existence theorem's uniqueness in a spacing window holds only below its unspecified $\varepsilon_0$.
- Nothing about other radii, twisted ladders, translating ladders, or ladders whose rails differ.
- The certificate relies on the correctness of mpmath 1.3.0 `iv` and of the transcription of Sections 2 and 3 into `ladder_interval_kernel.py`. The tail-bound derivation and its transcription have been checked only by their author; an independent check of Section 3 against the function `tail_bounds` is the most useful review step.

## Falsifiers

- An independent evaluation of the tail $\sum_{\lvert k\rvert>N}(-1)^k(g_++g_-)$ at any point of $X$ that lies outside $(-1)^{N+1}[F(N+1)\pm I_2]$, or of the $S$ tail exceeding $4/(L\underline\delta^3N^2)$, would refute Section 3.
- An independently written evaluator, with more rungs or higher precision, whose zero of $(G,\ S-1000\varepsilon^2)$ lies outside the final enclosure by more than its own error, would refute the certificate.
- A second zero of $F$ in $X$, found by any method, would refute uniqueness.
- A row of the raw law at a member speed below $1$ with a second causal root, or a positive-delay root from the receiver's own past, would refute Lemma 1.
- A correct interval library returning disjoint enclosures for any quantity recorded in the receipts would expose a dependency failure.

## Instruments and reproduction

Directory: [`../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/`](../evidence/rotating-ladder-claude-2026-10-20/untwisted-certificate/). Python is the shared virtual environment (Python 3.13, mpmath 1.3.0, numpy 2.2.4); no scipy.

- `ladder_interval_kernel.py`: reusable kernel (causal-root enclosure by parametric interval Newton, rows with first derivatives, tail bounds, ladder sums, 2-D Krawczyk test). Its public functions are `root_enclosure`, `row`, `tail_bounds`, `ladder_sums` and `krawczyk_2d`.
- `controls.py` writes `controls_receipt.json` (C1 to C5; 9.5 s).
- `certify_untwisted_r1000.py 10000 1e-9 2e-10` writes `certificate_receipt.json` (93.8 s wall time: 17.6 s for $F(\tilde x)$, 64.3 s for the Jacobian over $X$). It refuses to run unless the controls receipt records a pass. Its optional fourth argument, the receipt name, was added after this run; the computation is unchanged.
- `certify_untwisted_r1000.py 3000 1e-8 2e-9 certificate_receipt_N3000_check.json` writes the truncation cross-check (38.6 s).
- `root_samples.py` writes `root_samples_receipt.json`, the root table of Section 2.
- Run logs are in `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/untwisted-certificate/`.
