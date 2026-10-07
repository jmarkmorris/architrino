# Balanced Rings of Three and Three on One Circle: Independent Classification (Lane B)

Status: **level 2 reached for the complete classification** (2026-10-07). The two non-alternating polarity words are excluded by pencil proofs (Theorem 1). For the alternating word a pencil lemma bounds every solution away from collisions by an explicit margin (Lemma 5), and the remaining compact region is settled by a computer-assisted proof to the standard of [Section 12.3 of the preregistration](weber-binding-sphere-preregistration.md) (Theorem 2). Level 1, a pencil proof of the whole classification, was not reached: the alternating word still depends on interval computation. This document is lane B of two blind lanes; it was written without reading lane A's files or the earlier unvalidated ring instrument, and its code shares nothing with them.

## 1. Result

Six members of unit weight, three of each polarity, sit on one circle and rotate rigidly about its centre. The ring is in inverse-square ring balance when the acceleration of every member, summed over the other five, points at the centre with one common magnitude. The result of this document is that exactly one arrangement does this, up to rotation, reflection, relabelling within a polarity and the global polarity flip: the alternating regular hexagon, with $\Omega^2=5/4-1/\sqrt3\approx 0.672650$ in units $K=R=1$. For general $K$ and $R$ the rate scales as $\Omega^2=(K/R^3)(5/4-1/\sqrt3)$.

The argument has three parts, and a reader should know which part carries which grade. First, a short identity for two neighbouring members of the same polarity shows that neither non-alternating arrangement can make the tangential accelerations vanish; this is a pencil proof. Second, for the alternating arrangement, the tangential conditions require every half-gap to exceed $0.4069$ radian, so no solution is anywhere near a collision; this is also a pencil proof. Third, on the small compact region that remains, interval arithmetic excludes every box except one around the hexagon, and inside that box the hexagon is shown to be the only solution; this is a computer-assisted proof, run on two arithmetic substrates. A stronger statement comes out of the same work at the same grade: the radial conditions and the sign of $\Omega^2$ are not needed. The alternating regular hexagon is the only collision-free arrangement of three and three on a circle in which all six tangential accelerations vanish.

Because the two pencil steps have so far been read only by their author, the computation was also run without them, on the plain region where every gap is at least $0.02$ radian, for all three polarity words; it finds the hexagon and nothing else (Section 5.3). That run is not part of the proof, since it stops short of collisions, but it limits where an error in the pencil steps could matter.

## 2. Notation and the balance conditions

Units are $K=R=c_f=1$. The weights are unit numerical weights of the comparison law; they are not a physical mass. There are $N$ members at $z_i=e^{i\theta_i}$ on the unit circle, with polarities $q_i=\pm1$ and $\sigma_{ij}=q_iq_j$, so that $\sigma_{ij}=+1$ for a like pair and $-1$ for an unlike pair. In the instantaneous comparison law the acceleration of member $i$ is

$$
\mathbf a_i=\sum_{j\ne i}\sigma_{ij}\,\frac{z_i-z_j}{|z_i-z_j|^3},
$$

so a like pair accelerates apart and an unlike pair accelerates together. A ring rotating rigidly at rate $\Omega$ is in balance when $\mathbf a_i=-\Omega^2z_i$ for every $i$, with $\Omega^2>0$.

**Components.** Write $\phi_{ij}=\theta_i-\theta_j$. Then $z_i-z_j=z_i(1-e^{-i\phi_{ij}})=2z_i\sin(\phi_{ij}/2)\,[\sin(\phi_{ij}/2)+i\cos(\phi_{ij}/2)]$ and $|z_i-z_j|=2|\sin(\phi_{ij}/2)|$, so

$$
\frac{z_i-z_j}{|z_i-z_j|^3}=z_i\left[\frac{1}{4|\sin(\phi_{ij}/2)|}+i\,\frac{\cos(\phi_{ij}/2)\,\operatorname{sgn}\sin(\phi_{ij}/2)}{4\sin^2(\phi_{ij}/2)}\right].
$$

Dividing $\mathbf a_i$ by $z_i$ turns the outward radial direction into the real axis and the counterclockwise tangential direction into the imaginary axis. The balance is therefore equivalent to a tangential condition $T_i=0$ and a radial condition $U_i=-\Omega^2$ for every $i$, where

$$
T_i=\sum_{j\ne i}\sigma_{ij}\frac{\cos(\phi_{ij}/2)\,\operatorname{sgn}\sin(\phi_{ij}/2)}{4\sin^2(\phi_{ij}/2)},\qquad U_i=\sum_{j\ne i}\frac{\sigma_{ij}}{4|\sin(\phi_{ij}/2)|}.
$$

These agree with the conditions stated in Section 12.2 of the preregistration.

**Half-angle form.** For $j\ne i$ let $\beta_{ij}\in(0,\pi)$ be half the counterclockwise angle from member $i$ to member $j$, so that $\beta_{ji}=\pi-\beta_{ij}$. Define the two kernels

$$
f(x)=\frac{\cos x}{4\sin^2x},\qquad h(x)=\frac{1}{4\sin x},\qquad 0<x<\pi .
$$

Since $\phi_{ij}/2\equiv-\beta_{ij}$ modulo $\pi$, and both summands above are unchanged when $\phi_{ij}/2$ is shifted by $\pi$, the conditions read

$$
T_i=-\sum_{j\ne i}\sigma_{ij}f(\beta_{ij})=0,\qquad U_i=\sum_{j\ne i}\sigma_{ij}h(\beta_{ij})=-\Omega^2 .
$$

The potential-like sum $W=\sum_{i<j}\sigma_{ij}/|z_i-z_j|$ satisfies $\partial W/\partial\theta_i=-T_i$ and $\sum_iU_i=W$, so the tangential conditions say that the arrangement is a critical point of $W$, and the radial conditions say that the six partial sums are equal and negative.

**Gap coordinates.** Number the members $p_1,\dots,p_N$ counterclockwise and let $\alpha_k>0$ be half the angular gap from $p_k$ to $p_{k+1}$ (indices modulo $N$), so that $\sum_k\alpha_k=\pi$ and $\beta_{ij}=\alpha_i+\dots+\alpha_{j-1}$ for $i<j$. The half-gaps $\alpha_1,\dots,\alpha_{N-1}$ are the working coordinates; rotation has been removed. A collision is $\alpha_k\to0$.

**Polarity words.** The cyclic sequence of polarities is the polarity word. Up to rotation, reflection and the global flip, six members with three of each polarity have exactly three words: the alternating word $+-+-+-$, the two-one-one-two word $++-+--$, and the block word $+++---$. (Of the four necklaces of three marks in six places, two are mirror images of each other.) The cyclic order, and hence the word, is constant on each connected component of the collision-free configuration space, so the absolute values in $T_i$ and $U_i$ cause no further case splitting.

**Properties of the kernel $f$ used below.** Each is elementary.

- (F1) $f'(x)=-(1+\cos^2x)/(4\sin^3x)<0$, and $f$ runs from $+\infty$ to $-\infty$, so $f$ is a strictly decreasing bijection from $(0,\pi)$ onto the real line.
- (F2) $f(\pi-x)=-f(x)$; $f>0$ on $(0,\pi/2)$, $f(\pi/2)=0$, $f<0$ on $(\pi/2,\pi)$.
- (F3) $m(x)=|f'(x)|$ satisfies $m(\pi-x)=m(x)$ and is strictly decreasing on $(0,\pi/2]$, because its numerator decreases and its denominator increases there. Hence $m(x)$ is a strictly decreasing function of the distance $\min(x,\pi-x)$ from $x$ to the nearer end of $(0,\pi)$.
- (F4) $\rho(x)=4x^2f(x)=x^2\cos x/\sin^2x$ is strictly decreasing on $(0,\pi/2]$ with $0\le\rho<1$ there, and $\rho<0$ on $(\pi/2,\pi)$. Proof: on $(0,\pi/2]$ the sign of $\rho'$ is the sign of $k(x)=\sin2x-x(1+\cos^2x)$; $k(0)=0$ and $k'(x)=\sin x\,(2x\cos x-3\sin x)<0$ because $3\tan x>2x$; so $k<0$ and $\rho'<0$. The limit of $\rho$ at $0$ is $1$.

## 3. Pencil results

### 3.1 Two neighbouring members of the same polarity

**Lemma 1 (like-pair identity).** Let $p$ and $p'$ be members of the same polarity that are neighbours on the circle, $p'$ following $p$ counterclockwise at half-gap $a$. For every other member $j$ let $y_j\in(0,\pi-a)$ be half the counterclockwise angle from $p'$ to $j$, and let $s_j=\sigma_{pj}=\sigma_{p'j}$. If $T_p=T_{p'}=0$, then

$$
\sum_{j\ne p,p'}s_j\,g_a(y_j)=2f(a),\qquad g_a(y)=f(y)-f(y+a).
$$

*Proof.* Seen from $p'$, member $j$ is at $\beta=y_j$ and $p$ is at $\beta=\pi-a$; seen from $p$, member $j$ is at $\beta=y_j+a$ and $p'$ is at $\beta=a$. With $\sigma_{pp'}=1$ and (F2), $T_p=-f(a)-\sum_js_jf(y_j+a)$ and $T_{p'}=+f(a)-\sum_js_jf(y_j)$. Subtracting, $T_{p'}-T_p=2f(a)-\sum_js_jg_a(y_j)$. $\blacksquare$

**Lemma 2 (shape of $g_a$).** For $0<a<\pi$ and $0<y<\pi-a$, with $\mu_a=(\pi-a)/2$: (i) $g_a(y)>0$; (ii) $g_a(\pi-a-y)=g_a(y)$; (iii) $g_a$ is strictly decreasing on $(0,\mu_a]$ and strictly increasing on $[\mu_a,\pi-a)$; (iv) $g_a(y)\ge g_a(\mu_a)=2f(\mu_a)>0$; (v) $2f(a)+4f(\mu_a)>0$.

*Proof.* (i) is (F1). (ii) follows from (F2). For (iii), $g_a'(y)=-m(y)+m(y+a)$; for $y<\mu_a$ the point $y$ is nearer to an end of $(0,\pi)$ than $y+a$ is, since $y<y+a$ and $y<\pi-y-a$, so $m(y)>m(y+a)$ by (F3) and $g_a'<0$; the other half follows from (ii). (iv) is (iii) with $\mu_a+a=\pi-\mu_a$ and $\mu_a<\pi/2$. For (v): if $a\le\pi/2$ both terms are non-negative and the second is positive; if $a>\pi/2$ then $\mu_a<\pi-a$, so $f(\mu_a)>f(\pi-a)=-f(a)$ and $2f(a)+4f(\mu_a)>2f(\mu_a)>0$. $\blacksquare$

In words: a like pair needs something to hold it together tangentially, and the identity weighs every other member by how close it sits to the pair along the outer arc. Members of the pair's own polarity help, members of the other polarity count against, and nearer members count more.

### 3.2 The non-alternating words have no balanced ring

**Theorem 1.** Let six members, three of each polarity, sit collision-free on a circle with polarity word $++-+--$ or $+++---$ (in any of their rotated, reflected or flipped forms). Then the six tangential conditions $T_i=0$ cannot all hold. In particular no balanced ring has either word. The radial conditions and the sign of $\Omega^2$ are not used.

*Proof for the two-one-one-two word.* Take the two neighbouring like members as $p,p'$ in Lemma 1, at half-gap $a$. Along the outer arc from $p'$ counterclockwise to $p$ the remaining four members appear with the third like member $L$ strictly between unlike members: in every form of this word there is at least one unlike member before $L$ and at least one after it. Lemma 1 reads $g_a(y_L)=2f(a)+\sum_ug_a(y_u)$ over the three unlike members $u$. If $y_L\le\mu_a$, an unlike member $u^\ast$ before $L$ has $y_{u^\ast}<y_L\le\mu_a$ and so $g_a(y_{u^\ast})>g_a(y_L)$ by Lemma 2(iii); if $y_L>\mu_a$, an unlike member $u^\ast$ after $L$ has $y_{u^\ast}>y_L>\mu_a$ and again $g_a(y_{u^\ast})>g_a(y_L)$. The other two unlike terms are each at least $2f(\mu_a)$ by Lemma 2(iv), so the right-hand side is at least $g_a(y_{u^\ast})+2f(a)+4f(\mu_a)>g_a(y_L)$ by Lemma 2(v). This contradicts the identity. $\blacksquare$

*Proof for the block word.* Let the block of one polarity be $p_1,p_2,p_3$ with half-gaps $a$ (from $p_1$ to $p_2$) and $b$ (from $p_2$ to $p_3$). Lemma 1 for the pair $(p_1,p_2)$, whose third like member is at $y=b$, gives $g_a(b)=2f(a)+\sum_ug_a(y_u)>2f(a)$, that is $f(b)-f(a+b)>2f(a)$. Lemma 1 for the pair $(p_2,p_3)$, whose third like member $p_1$ is at $y=\pi-a-b$, gives $f(a)-f(a+b)>2f(b)$ after (F2). Adding the two, $-2f(a+b)>f(a)+f(b)$. If $a+b\le\pi/2$ the left side is at most zero and the right side is positive, so $a+b>\pi/2$. The same holds for the other block, with half-gaps $c,d$: $c+d>\pi/2$. But $a+b+c+d<\pi$, because the two half-gaps between the blocks are positive. $\blacksquare$

The same lemma disposes of the four-member block word $++--$: with no third like member, Lemma 1 gives $-\sum_ug_a(y_u)=2f(a)$, so $f(a)<0$ and $a>\pi/2$ for each like pair, while the two like half-gaps sum to less than $\pi$.

### 3.3 The alternating word: a collision margin

From here on the word is alternating and $N$ is $6$ or $4$. Then $\sigma_{k,k+m}=(-1)^m$ and, with $f_m=f(\beta_{k,k+m})$ for $m=1,\dots,N-1$,

$$
T_k=f_1-f_2+f_3-\dots+f_{N-1},\qquad f_1>f_2>\dots>f_{N-1},
$$

the ordering holding because $\beta_{k,k+m}$ increases with $m$ and $f$ is decreasing. Note $f_1=f(\alpha_k)$, $f_2=f(\alpha_k+\alpha_{k+1})$, $f_{N-1}=-f(\alpha_{k-1})$ and $f_{N-2}=-f(\alpha_{k-1}+\alpha_{k-2})$.

**Lemma 3 (alternating sums).** If $T_k=0$ for every $k$ in an alternating ring with $N=6$ or $N=4$, then every half-gap is smaller than $\pi/2$, and for every three consecutive half-gaps $u,v,w$, read in either direction round the circle,

$$
f(w)\ \ge\ f(v)-f(u+v),
$$

with strict inequality when $N=6$.

*Proof.* For $N=6$, group $T_k=(f_1-f_2)+(f_3-f_4)+f_5=0$; both brackets are positive, so $-f_5=f(\alpha_{k-1})>f_1-f_2=f(\alpha_k)-f(\alpha_k+\alpha_{k+1})>0$. This gives $\alpha_{k-1}<\pi/2$ and the inequality for $(u,v,w)=(\alpha_{k+1},\alpha_k,\alpha_{k-1})$. Grouping instead $T_k=f_1-(f_2-f_3)-(f_4-f_5)=0$ gives $f(\alpha_k)=f_1>f_4-f_5=f(\alpha_{k-1})-f(\alpha_{k-1}+\alpha_{k-2})$, the inequality for $(u,v,w)=(\alpha_{k-2},\alpha_{k-1},\alpha_k)$. For $N=4$, $T_k=f_1-f_2+f_3=0$ gives the two statements with equality. $\blacksquare$

**Lemma 4 (ratio step).** Let $u,v,w>0$ with $v\le\pi/2$, $u+v<\pi$, $w<\pi$ and $f(w)\ge f(v)-f(u+v)$. If $u\ge\mu v$ for some $\mu>0$, then

$$
w<\lambda(\mu)\,v,\qquad \lambda(\mu)=\frac{1+\mu}{\sqrt{\mu(2+\mu)}} .
$$

*Proof.* Since $(1+\mu)v\le u+v<\pi$ and $f$ is decreasing, $f(u+v)\le f((1+\mu)v)$. In terms of $\rho$ from (F4), $f(v)-f((1+\mu)v)=[\rho(v)-\rho((1+\mu)v)/(1+\mu)^2]/(4v^2)$. Now $\rho(v)\ge0$ because $v\le\pi/2$, and $\rho((1+\mu)v)\le\rho(v)$ either by monotonicity on $(0,\pi/2]$ or because $\rho$ is negative beyond $\pi/2$. Hence $f(w)\ge\rho(v)\,[1-(1+\mu)^{-2}]/(4v^2)=\rho(v)/(4\lambda^2v^2)$. If $\lambda v\ge\pi$ there is nothing to prove. Otherwise $\rho(\lambda v)<\rho(v)$ strictly, for the same two reasons and $\lambda>1$, so $f(w)>\rho(\lambda v)/(4\lambda^2v^2)=f(\lambda v)$ and $w<\lambda v$ by (F1). $\blacksquare$

The lemma is exactly scale-free: it would be an identity for the small-angle kernel $1/(4x^2)$, and the function $\rho$ measures how far $f$ falls below that kernel.

**Lemma 5 (collision margin).** Define $a_1=1$ and $a_{k+1}=a_k(a_k+1)/\sqrt{2a_k+1}$, so $a_2=2/\sqrt3=1.154700\ldots$, $a_3=1.367670\ldots$, $a_4=1.675474\ldots$. Let an alternating ring satisfy $T_k=0$ for all $k$, and let $\varepsilon=\alpha_1$ be its smallest half-gap.

- For $N=6$: $\alpha_2,\alpha_6<a_2\varepsilon$, $\alpha_3,\alpha_5<a_3\varepsilon$, $\alpha_4<a_4\varepsilon$, and therefore $\varepsilon>\pi/(1+2a_2+2a_3+a_4)=0.406930\ldots>0.4069$.
- For $N=4$: $\alpha_2,\alpha_4<a_2\varepsilon$, $\alpha_3<a_3\varepsilon$, and therefore $\varepsilon>\pi/(1+2a_2+a_3)=0.671700\ldots>0.6717$.

In both cases $\varepsilon\le\pi/N$, since the smallest half-gap cannot exceed the mean.

*Proof.* All half-gaps are below $\pi/2$ by Lemma 3, so Lemma 4 applies to every consecutive triple. Triple $(\alpha_6,\alpha_1,\alpha_2)$ (for $N=4$ read $\alpha_4$ for $\alpha_6$): $u=\alpha_6\ge\varepsilon=v$, so $\mu=1$ and $\alpha_2<\lambda(1)\varepsilon=a_2\varepsilon$; by the mirror triple, $\alpha_6<a_2\varepsilon$. Triple $(\alpha_1,\alpha_2,\alpha_3)$: $u=\varepsilon$ and $v=\alpha_2$, so with $\mu=\varepsilon/v$ the bound is $\alpha_3<\lambda(\varepsilon/v)\,v=v(v+\varepsilon)/\sqrt{\varepsilon(2v+\varepsilon)}=:\psi(v)$; $\psi$ is increasing in $v$ (its logarithmic derivative is $1/v+1/(v+\varepsilon)-1/(2v+\varepsilon)>0$), and $v<a_2\varepsilon$, so $\alpha_3<\psi(a_2\varepsilon)=a_3\varepsilon$; by the mirror, $\alpha_5<a_3\varepsilon$. For $N=6$, triple $(\alpha_2,\alpha_3,\alpha_4)$: $u=\alpha_2\ge\varepsilon$ and $\lambda$ is decreasing in $\mu$, so $\alpha_4<\psi(\alpha_3)<\psi(a_3\varepsilon)=a_4\varepsilon$. Summing, $\pi=\sum_k\alpha_k<\varepsilon(1+2a_2+2a_3+a_4)$ for $N=6$ and $\pi<\varepsilon(1+2a_2+a_3)$ for $N=4$. $\blacksquare$

The margin is large. For six members every angular gap of a solution exceeds $0.8138$ radian ($46.6^\circ$) and every chord exceeds $2\sin0.4069>0.79$, against $60^\circ$ and $1$ for the hexagon. No solution is near a collision, and the search region is small.

**The compact region.** The alternating problem is invariant under shifting the gap labels by one place (a rotation by one member combined with the global polarity flip) and under reversing them. One may therefore assume that $\alpha_1$ is the smallest half-gap and that $\alpha_2\le\alpha_N$. With Lemma 5 and $\varepsilon\le\pi/6$, every six-member solution has a representative in

$$
D_6=\Big\{0.4069\le\alpha_1\le\tfrac{\pi}{6},\ \ \alpha_1\le\alpha_k\ \text{for all }k,\ \ \alpha_2\le\alpha_6,\ \ \alpha_2,\alpha_6\le a_2\tfrac{\pi}{6},\ \ \alpha_3,\alpha_5\le a_3\tfrac{\pi}{6},\ \ \alpha_4\le a_4\tfrac{\pi}{6},\ \ \textstyle\sum_k\alpha_k=\pi\Big\},
$$

with $a_2\pi/6<0.6047$, $a_3\pi/6<0.7162$, $a_4\pi/6<0.8773$. The four-member region $D_4$ is the same with $0.6717$, $\pi/4$, and bounds $a_2\pi/4<0.9070$, $a_3\pi/4<1.0742$.

### 3.4 The hexagon and the square are solutions

In a regular alternating $N$-gon with $N$ even, $\beta_{k,k+m}=m\pi/N$, and the terms $m$ and $N-m$ of $T_k$ cancel by (F2) while the middle term is $f(\pi/2)=0$; so $T_k=0$. All $U_k$ are equal by rotational symmetry. For the hexagon $U_k=-\tfrac12+\tfrac1{2\sqrt3}-\tfrac14+\tfrac1{2\sqrt3}-\tfrac12=-(5/4-1/\sqrt3)$, and for the square $U_k=-\tfrac{1}{2\sqrt2}\cdot2+\tfrac14=-(2\sqrt2-1)/4$. Both are negative, so both are balanced rings, with $\Omega^2=5/4-1/\sqrt3$ and $\Omega^2=(2\sqrt2-1)/4$.

## 4. The computer-assisted part

### 4.1 Method

The unknowns are $\alpha_1,\dots,\alpha_{N-1}$, with $\alpha_N=\pi-\sum_{k<N}\alpha_k$. Every $\beta_{ij}$ is either a sum $S_{ab}=\alpha_a+\dots+\alpha_{b-1}$ of consecutive unknowns or $\pi$ minus such a sum, and $f(\pi-S)=-f(S)$, $h(\pi-S)=h(S)$; so each $T_i$ and each $U_i$ is a signed sum of $f(S_{ab})$ or $h(S_{ab})$ over the fifteen sums $S_{ab}$ (six for $N=4$), and $\pi$ enters only through the constraint on $\alpha_N$. The functions tested are the six $T_i$ and the five differences $U_i-U_{i+1}$, in which the shared term cancels exactly.

*Enclosures.* On a box $B$ of half-gaps, each $S_{ab}$ is enclosed by adding endpoint intervals and is then intersected with $[\delta\ell,\ \pi-\delta(N-\ell)]$, where $\ell=b-a$ and $\delta$ is the margin of Lemma 5; this cap is valid at every point of $B$ that lies in the region, because all $N$ half-gaps are at least $\delta$ there. The range of $f$ over an interval is taken from the endpoints, by (F1); the range of $\sin$ from the endpoints and the value $1$ if the interval contains $\pi/2$; the range of $|f'|$ from the endpoints and the value $\tfrac14$ at $\pi/2$, by (F3). Two enclosures of each function are formed: the natural one, and a mean-value one $F(c)+\nabla F(B)\cdot(B-c)$ about the midpoint $c$, used only when $c$ itself has $\alpha_N(c)\ge\delta$, so that the segment from $c$ to any point of the region inside $B$ stays in the convex set where the capped gradient enclosure is valid. (The second substrate of Section 4.2 takes the range of $f$ from the endpoints in the same way but evaluates $h$ and $f'$ by their plain interval formulas.)

*Branch and bound.* A box is discarded if $\alpha_N$ cannot lie in its allowed range, or if it violates the symmetry normalisation everywhere, or if it lies inside the uniqueness box, or if some function's enclosure excludes zero. A box that straddles a face of the uniqueness box is cut along that face; any other surviving box is bisected along its widest side. The run is complete when no box remains; a box narrower than $10^{-7}$ that is still undecided is reported as a failure.

*Uniqueness box.* Let $G=(T_1,\dots,T_{N-1})$, let $c$ be the binary64 value of $\pi/N$ in every coordinate, $X=c+[-r,r]^{N-1}$, $Y$ a floating-point inverse of the Jacobian of $G$ at $c$ (used as an exact matrix), and $J(X)$ an interval enclosure of the Jacobian over $X$. The instrument evaluates the Krawczyk image $K(X)=c-YG(c)+(I-YJ(X))(X-c)$ and the row-sum norm bound $\kappa\ge\|I-YJ(X)\|_\infty$ in interval arithmetic. If $\kappa<1$, every matrix $M$ in $J(X)$ is nonsingular, since $YM=I-(I-YM)$ is invertible by the Neumann series. By the mean value theorem applied to each row, two zeros $x,y$ of $G$ in the convex set $X$ satisfy $M(x-y)=0$ for some $M$ in $J(X)$, so $x=y$: $G$ has at most one zero in $X$. The regular polygon is a zero in $X$ by Section 3.4, so it is the only one. The inclusion $K(X)\subset\operatorname{int}X$, which is the classical Krawczyk existence and uniqueness test, is also checked and recorded, although existence is already known here.

### 4.2 Two arithmetic substrates and their trust assumptions

The proof was run on two substrates that share no code.

*Substrate N: [weber-binding-sphere-ring-b-certify.mjs](../evidence/weber-binding-sphere-ring-b-certify.mjs), Node 26.3.0, binary64.* Every arithmetic result is widened outward by at least one floating-point step, using $x\pm(|x|2^{-52}+2^{-1074})$. Its trust assumptions are: (A1) the operations $+,-,\times,\div$ and the square root are correctly rounded to nearest in binary64, as IEEE 754 and the language standard require; (A2) `Math.sin` and `Math.cos` return values within two floating-point steps of the true value on $[0,3.2]$; the instrument widens each such value by two steps; (A3) `Math.PI` is below $\pi$ and the next binary64 number is above it; (A4) the program does what Section 4.1 says. A1 to A3 are supported, not proved, by known case KB2 below; A3 is also checked there against a 40-digit value.

*Substrate M: [weber-binding-sphere-ring-b-ivcheck.py](../evidence/weber-binding-sphere-ring-b-ivcheck.py), mpmath 1.3.0 interval context `iv` at 30 significant digits.* It uses none of the binary64 devices and no `Math` functions. Its trust assumptions are: (B1) `mpmath.iv` arithmetic, square root, sine, cosine and $\pi$ return enclosures; (B2) the program does what Section 4.1 says. Box endpoints are binary64 numbers, which the interval context represents exactly.

Both rely on the standard Neumann-series and mean-value arguments written out in Section 4.1, and on Lemmas 3 to 5 for the region. The two programs were written by one author in one session to one plan, so their agreement tests the arithmetic and the transcription, not the plan; the plan is checked by the pencil arguments above and by the blind comparison with lane A.

### 4.3 Theorem 2

**Theorem 2 (computer-assisted).** In the alternating word with $N=6$, the only collision-free arrangement with $T_k=0$ for all six members is the regular hexagon. In particular the alternating regular hexagon is the only balanced ring with this word.

*Proof.* By Section 3.3 every solution has a representative in $D_6$. Both substrates cover $D_6$ (in fact the slightly larger box whose upper bounds are rounded up) completely. With $r=0.005$ the uniqueness box $X=[\pi/6-0.005,\pi/6+0.005]^5$ has $\kappa\le0.39012$ on both substrates and $K(X)\subset[0.52164,0.52555]^5\subset\operatorname{int}X$, so the hexagon is the only zero of $(T_1,\dots,T_5)$ in $X$. Outside $X$ every leaf box is discarded by a domain, symmetry or exclusion test, with no undecided box; the counts are in Section 5.2. The statement with the tangential conditions alone is the run in which only $T_1,\dots,T_6$ are allowed as exclusion tests. $\blacksquare$

**Corollary (classification).** Six unit-weight members, three of each polarity, on one circle are in rigid inverse-square ring balance if and only if they form the alternating regular hexagon; then $\Omega^2=5/4-1/\sqrt3$. Up to rotation, reflection, relabelling within a polarity and the global polarity flip there is exactly one solution. More strongly, the alternating regular hexagon is the only collision-free arrangement of three and three on a circle at which all tangential accelerations vanish, that is, the only critical point of $W$.

*Proof.* The three words exhaust the cases. Theorem 1 excludes two of them and Theorem 2 settles the third; Section 3.4 shows the hexagon is a solution with the stated rate. $\blacksquare$

**Against the standard of Section 12.3.** (i) The written collision-margin lemma with proof is Lemma 5, with Theorem 1 covering the words where no margin is needed because nothing survives. (ii) The validated exclusion of the remaining compact region is the branch and bound of Section 4.1 on $D_6$, with rounding handled as stated in Section 4.2 and the trust assumptions A1 to A4 and B1 to B2 named there. (iii) The certified uniqueness box is $X$ above. The required known cases are recorded first in Section 5.1.

## 5. Validation record

The known cases were run before the targets, in the order below, by one driver, [weber-binding-sphere-ring-b-freeze-run.sh](../evidence/weber-binding-sphere-ring-b-freeze-run.sh), whose stamped output is [weber-binding-sphere-ring-b-freeze-run.log](../evidence/weber-binding-sphere-ring-b-freeze-run.log). The instrument's SHA-256 at that time is in Section 10 and inside each receipt. Earlier passes, one exploratory and two superseded when an option was added to the instrument, are described in the run record; their outputs are not runs of record, and every count they produced is the same as in the final pass.

### 5.1 Known cases

| Case | Command (from the repository root) | Value | Tolerance | UTC | Result |
| --- | --- | --- | --- | --- | --- |
| KB1 residual evaluator, complex form | `node <certify> kb1` | hexagon at $\Omega^2=5/4-1/\sqrt3$: $1.58\times10^{-15}$; at $1.1\,\Omega^2$: $6.73\times10^{-2}$; square at $(2\sqrt2-1)/4$: $1.7\times10^{-16}$; antipodal unlike pair at $1/4$: $1.5\times10^{-17}$; half-gap formulas for $T_i,U_i$ against the complex form on 10000 random arrangements of five words: worst relative difference $1.9\times10^{-14}$ | $\le10^{-13}$; $\ge10^{-2}$; $<10^{-10}$ | 03:59:44Z | pass |
| KB2 enclosure property, wide boxes | `node <certify> kb2export 100000`, then `python <kb2-check> kb2-enclosures.jsonl` | 100000 random boxes of width $10^{-6}$ to $10^{-1}$ over five words, one random interior point each; 2920000 function values (natural and mean-value enclosures of all $T_i$, $U_i$, $U_i-U_{i+1}$) re-evaluated by mpmath at 40 digits from the complex form, and 456000 Jacobian entries re-evaluated from separately coded derivative formulas; 0 outside | 0 failures | 04:01:31Z | pass |
| KB2 enclosure property, tight boxes | `node <certify> kb2export 100000 tiny`, then `python <kb2-check> kb2-enclosures-tiny.jsonl` | 100000 boxes of width $0$ or $10^{-13}$, same counts; 0 outside; smallest slack $4.5\times10^{-16}$; enclosure of $\pi$ confirmed | 0 failures | 04:01:31Z | pass |
| KB2 hand-known count, two members | `node <certify> run n2unlike`, `run n2like` | unlike pair on $\alpha_1\in[0.01,3.13]$: one uniqueness box $[\pi/2\pm0.05]$ ($\kappa=0.0063$), all else excluded, none undecided; like pair: all excluded by $U_1>0$ | must reproduce: only the antipodal unlike pair | 04:01:38Z | pass |
| KB3 four members | see Section 6 | only the alternating square | must contain the square; compare with multi-start | 04:01:39Z | pass, agree |
| KB4 hexagon not excluded; non-solution excluded | `node <certify> kb4` | 21 boxes containing the hexagon, widths $10^{-12}$ to $10^{-1}$, three placements: none excluded; box of radius $10^{-3}$ about $(0.45,0.5,0.55,0.6,0.5)$, complex-form residual $0.35$: excluded by $T_1$ | as stated | 04:01:38Z | pass |
| Substrate M known value | first lines of `python <ivcheck>` | interval value of the hexagon's radial sum contains $-(5/4-1/\sqrt3)$ to 28 digits; four-member run precedes six-member run | overlap | 04:01:39Z | pass |

The two-member case has a pencil answer: $T_1=-\sigma f(\alpha_1)=0$ gives $\alpha_1=\pi/2$, and $U_1=\sigma/4=-\Omega^2<0$ then requires an unlike pair with $\Omega^2=1/4$.

Here `<certify>` is `reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-ring-b-certify.mjs`, `<kb2-check>` and `<ivcheck>` are the Python files of the same stem run with `../.venv/bin/python`, and the `.jsonl` files are under the runtime directory of Section 10.

Numerical sanity checks of the pencil lemmas, [weber-binding-sphere-ring-b-lemma-checks.py](../evidence/weber-binding-sphere-ring-b-lemma-checks.py), are measured support only: the identity of Lemma 1 holds to $8\times10^{-29}$ relative on 1200 random arrangements of four words evaluated from the complex form at 30 digits; 0 violations of Lemma 2 in 20000 samples; 0 violations of the monotonicity of $\rho$ on a 20000-point grid; 0 counterexamples to Lemma 4 in 181320 samples.

### 5.2 Target runs (six members, alternating word)

| Run | Substrate | Boxes processed | Leaves: outside domain / symmetry / natural exclusion / mean-value exclusion / uniqueness box / undecided | $\kappa$ | UTC end |
| --- | --- | --- | --- | --- | --- |
| all conditions | N | 2941 | 5 / 382 / 790 / 293 / 1 / 0 | 0.390115 | 04:01:50Z |
| all conditions | M | 2935 | 5 / 381 / 847 / 234 / 1 / 0 | 0.390115 | 04:01:50Z |
| tangential only | N | 4083 | 6 / 511 / 1128 / 396 / 1 / 0 | 0.390115 | 04:01:50Z |
| tangential only | M | 4081 | 6 / 512 / 1198 / 324 / 1 / 0 | 0.390115 | 04:02:04Z |

In each row the leaves number one more than half the remaining boxes, as a binary tree requires. In the first row 905 exclusions came from a tangential function and 178 from a radial difference. The small differences between substrates come from where a bound falls relative to zero at different precisions; both complete.

### 5.3 Validated cross-checks that do not use the pencil lemmas (not needed for the proof)

The pencil results carry the proof near collisions, and nobody but their author has read them yet. To guard against an error in them, the Node instrument was also run with no lemma and no symmetry reduction, on the plain region where all six half-gaps are at least $0.01$ (every gap at least $0.02$ radian, about $1.1^\circ$), for all three words. The upper bound on each half-gap is then only $\pi-5\times0.01$.

| Word | Conditions used | Boxes processed | Outcome | UTC end |
| --- | --- | --- | --- | --- |
| $+-+-+-$ | all | 645637 | all excluded except the uniqueness box $[\pi/6\pm0.005]^5$ about the hexagon; none undecided | 04:02:12Z |
| $++-+--$ | all | 127271 | all excluded; none undecided | 04:02:06Z |
| $+++---$ | all | 3235 | all excluded; none undecided | 04:02:06Z |
| $+-+-+-$ | tangential only | 1760681 | all excluded except the same uniqueness box; none undecided | 04:02:33Z |
| $++-+--$ | tangential only | 252765 | all excluded; none undecided | 04:02:14Z |
| $+++---$ | tangential only | 3757 | all excluded; none undecided | 04:02:14Z |

So, under assumptions A1 to A4 alone, the alternating regular hexagon is the only balanced ring of three and three whose gaps are all at least $0.02$ radian, and also the only such arrangement with all tangential accelerations zero. This is a validated classification on a stated region. The tangential-only rows test Theorem 1 in the form in which it is stated. It does not reach collisions, which is what Theorem 1 and Lemma 5 are for; but it means that an error in those pencil arguments could only matter for arrangements with some gap below $0.02$ radian, and it confirms independently that Lemma 5 hides no alternating solution with a half-gap between $0.01$ and $0.4069$. It was run on substrate N only.

## 6. The four-member classification (known case KB3)

**Statement.** Four unit-weight members, two of each polarity, on one circle are in rigid inverse-square ring balance if and only if they form the alternating square; then $\Omega^2=(2\sqrt2-1)/4\approx0.457107$.

The method is the one used for six. The block word $++--$ is excluded by Lemma 1 (end of Section 3.2). For the alternating word, Lemma 5 gives the region $D_4$ with margin $0.6717$, and the computation covers it: substrate N, 43 boxes, leaves $0/2/17/2/1/0$ in the order of the table above, uniqueness box $[\pi/4\pm0.02]^3$ with $\kappa\le0.47832$ and $K(X)\subset[0.7758,0.7950]^3$; substrate M, 43 boxes, leaves $0/2/18/1/1/0$, the same $\kappa$. With tangential conditions only: 85 boxes on each substrate, none undecided. As further validated checks without the lemmas, on the region of half-gaps at least $0.01$: the block word, 123 boxes, all excluded; the alternating word, 1363 boxes, all excluded except the uniqueness box about the square.

**Comparison with an unvalidated search.** [weber-binding-sphere-ring-b-multistart.py](../evidence/weber-binding-sphere-ring-b-multistart.py) fixes labelled polarities, draws random angles (so all words are sampled) and solves the full balance by least squares. For four members: 3000 starts, 1143 converged to residual below $10^{-10}$ with positive $\Omega^2$ and no gap below $10^{-3}$, and all 1143 are the alternating square with $\Omega^2=0.457106781$; the other 1857 did not converge. With tangential conditions only: 3000 starts, 1159 converged, all the square. Every solution found by either method is the square; the two agree.

## 7. Multi-start census for six members (measured)

Same instrument, six members, seed 20261013. Full balance: 6000 starts; 807 converged, all to the alternating regular hexagon with $\Omega^2=0.6726497308$; 5193 did not converge; none was rejected for a collision or for non-positive $\Omega^2$. Tangential conditions only: 6000 starts; 918 converged, all to the alternating hexagon; 5082 did not converge. No converged solution had a non-alternating word. A multi-start search cannot establish absence; it is recorded as a measured statement consistent with the theorems, from an instrument whose known cases (two members, then four) ran first in the same script.

## 8. Claims, grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| C1. No arrangement with word $++-+--$ or $+++---$ has all tangential accelerations zero (Theorem 1). | Derived, pencil. | A single arrangement of either word with $\max_i\lvert T_i\rvert=0$; or an error in Lemma 1 or 2, for which the 30-digit check of the identity in the lemma-checks script is the first place to look. |
| C2. Every alternating arrangement with all $T_k=0$ has all half-gaps in $(0.4069,\pi/2)$, with the finer bounds of Lemma 5. | Derived, pencil. | An alternating arrangement with $T=0$ and a half-gap at most $0.4069$; or a triple $u,v,w$ violating Lemma 4. |
| C3. In the alternating word the hexagon is the only arrangement with all $T_k=0$ (Theorem 2). | Derived, computer-assisted, conditional on A1 to A4 or on B1 and B2. | An enclosure failure (a true value outside its interval) in either substrate, checkable by rerunning KB2 or extending it; an undecided or wrongly discarded box, checkable by rerunning either program and comparing the leaf counts of Section 5.2; a second zero of $(T_1,\dots,T_5)$ in the uniqueness box. |
| C4. The balanced rings of three and three on one circle are exactly the alternating regular hexagons, $\Omega^2=5/4-1/\sqrt3$. | Derived from C1 to C3 at the weaker of their grades: computer-assisted. | Any other balanced ring; lane A reporting a second solution or a solution in a region this document excludes. |
| C5. The balanced rings of two and two are exactly the alternating squares, $\Omega^2=(2\sqrt2-1)/4$. | Derived, computer-assisted for the alternating word; pencil for the block word. | As for C3 with the four-member receipts. |
| C6. Multi-start census: 807 of 6000 and 918 of 6000 six-member starts converge, all to the hexagon; 1143 and 1159 of 3000 four-member starts, all to the square. | Measured (scipy least squares, random starts; cannot show absence). | Rerun with other seeds; a converged solution of another shape. |
| C7. Among arrangements of three and three with all half-gaps at least $0.01$, of any word, the only balanced ring, and the only arrangement with all tangential accelerations zero, is the alternating regular hexagon; no pencil lemma is used. | Validated classification on that region (substrate N only), conditional on A1 to A4. | As for C3, with the six receipts of Section 5.3. |

## 9. What is not proved, and limits of scope

- The alternating word has no pencil proof here. Level 1 was not reached.
- Neither program is formally verified, and both were written by one author to one plan. The pencil lemmas have had numerical sanity checks but no second reader. The intended independent check is the blind comparison with lane A.
- A2, the accuracy assumed of `Math.sin` and `Math.cos`, is an assumption about the JavaScript engine, supported by 5.8 million re-evaluated values but not proved. Substrate M does not use it, at the price of trusting `mpmath.iv` instead.
- The statement concerns the instantaneous inverse-square comparison law for unit weights on one circle rotating rigidly about its centre. It says nothing about stability, about the delayed law, about members off the circle, about unequal weights, or about other polarity counts such as four and two.
- The census of Section 7 is measured and adds no proof.

## 10. Evidence locations

Tracked candidates under `reference/priorities/master-equation-closure/braid-program/evidence/`, with SHA-256:

| File | SHA-256 |
| --- | --- |
| `weber-binding-sphere-ring-b-certify.mjs` | `928e823c2aa84bd2b2b3e194e772997245e6bf5971258d4339dc6da900e8f2bd` |
| `weber-binding-sphere-ring-b-ivcheck.py` | `c59b569b458bfd76d9206ddeca944ae3103448b74093c72d9c530a70935ea9df` |
| `weber-binding-sphere-ring-b-kb2-check.py` | `28c657d4ba0f6abad81c2eebf074becf7eaa70fdc352721415568367ecf23f92` |
| `weber-binding-sphere-ring-b-lemma-checks.py` | `56c10d9e465cb57d9f587e2ab450b26c59a260d03d8e95691782645b1ce0ca87` |
| `weber-binding-sphere-ring-b-multistart.py` | `3ed46e5d3471e7397de1a46d293bf294240e64a4f669ccb41dc41afb12ea03a0` |
| `weber-binding-sphere-ring-b-freeze-run.sh` | `3fcd1d443ec6d8441153bc92ceaf46f4b5af045bb965b771474169bede0f8616` |
| `weber-binding-sphere-ring-b-freeze-run.log` | `f0ad6322b1e2e48ec7d936489e45c6bdde56d6e2dc645a90e5e7767a1fb24376` |
| `weber-binding-sphere-ring-b-receipt.json` (consolidated receipts, 52683 bytes) | `22c89a89b6f7842ec0fb7713a5b31a142dceaf187207115fdedf45dbff870abe` |

The consolidated receipt holds the known-case records, the statistics and uniqueness-box data of every Node run, both substrate-M receipts, the full census, and the SHA-256 of every runtime file.

Runtime output is under `.local-data/master-equation-closure/weber-binding-sphere/ring-b/`, 320 MB by `du -sh` at 04:02Z. It is local retention only and is not backed up. Almost all of it is the two enclosure sets, which the Node instrument regenerates deterministically in a few seconds: `kb2-enclosures.jsonl` (152888291 bytes, SHA-256 `ce56445a8fa8de270a1bad58245734bdc3cae06d349f4e4761d9a7824afaa005`) and `kb2-enclosures-tiny.jsonl` (152911872 bytes, SHA-256 `88b75b757f98106653d664b01e3edee62241ac2c35594cb200fe71a6a75978e2`). The per-run receipts (`receipt-*.json`), `ivcheck-*.json`, `multistart-census.json`, `kb1.json`, `kb4.json`, `lemma-checks.json`, the two `kb2-check-*.log` files and `freeze-run.log` are small and are reproduced in the consolidated receipt. Receipts from exploratory passes (`receipt-generic_*_0.05*.json`, `*_0.2.json`, `*_0.1_polygonbox.json`) are not runs of record; the consolidated receipt flags each run. The first lines of the driver log list file hashes as they stood when the driver started, so the log's own entry and the consolidated receipt's entry there are those of the previous pass.

To reproduce everything in order: `bash reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-ring-b-freeze-run.sh` from the repository root (about three minutes, most of it the two mpmath enclosure checks), then `../.venv/bin/python reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-ring-b-multistart.py <output.json>` (about four minutes).

## Cross-review of lane A (after exposure)

Written after the Principal Investigator announced exposure (04:08Z). Everything above this marker is lane B's frozen text and is unchanged. Lane A's document, [weber-binding-sphere-ring-classification.md](weber-binding-sphere-ring-classification.md) (SHA-256 `4357070d38ef448a1433383886f950f3d10f9928d07dc1b3befd34a718c1a261`, confirmed by `shasum` at 04:06Z), was read in full; its scripts and receipts were not opened. The review is on paper, with one small double-precision computation that is labelled where it is used. Lane A writes arcs and gaps where this document writes half-angles and half-gaps: its $h(\psi)$ is $f(\psi/2)$ here, its $u(\psi)$ is $h(\psi/2)$ here, its gap $g_k$ is $2\alpha_{k+1}$, and its members are numbered from $0$.

### Item 1. Proposition 1 (non-alternating words): confirmed

*The argument.* For member $0$ with the others at arcs $\psi_{0\to1}<\dots<\psi_{0\to5}$, the kernel values decrease, $h_1>\dots>h_5$. For $++-+--$ the signs seen from member $0$ are $+,-,+,-,-$, so $T_0=-(h_1-h_2)-(h_3-h_4)+h_5<h_5$; for $+++---$ they are $+,+,-,-,-$, so $T_0=-(h_1-h_3)-(h_2-h_4)+h_5<h_5$. Both groupings are correct and both brackets are positive. $T_0=0$ then gives $h_5>0$, the arc to the last member is below $\pi$, the gap $g_5$ exceeds $\pi$, all six members lie on an arc shorter than $\pi$, and that contradicts $\sum_i\mathbf X_i=0$. The centre condition is correctly derived: the pair terms are antisymmetric, so the accelerations sum to zero, and $\Omega^2\ne0$ is needed and is stated. I find no error.

*Every form of each word.* The proof needs one member whose counterclockwise sign sequence is $+,-,+,-,-$ (or $+,+,-,-,-$). The sequence consists of the products $\sigma_{0k}$, which do not change under the global flip, so a flipped form needs no separate treatment. The rotation classes of the two-one-one-two word are $++-+--$ and $++--+-$, the second being both the mirror image and the flip of the first. In $++-+--$ the member is the first member of the $++$ pair; in $++--+-$ it is member $2$, the first member of the $--$ pair, whose sequence is again $+,-,+,-,-$. In words: the counterclockwise-first member of the like pair that is followed by a single member of the other polarity. For the block word every form is a rotation of $+++---$ or of its flip, and the member is the counterclockwise-first member of either block. So the choice works for every rotated, reflected and flipped form; lane A covers this by its remark in Section 1 that the third rotation class is the flip of the second, which is correct.

*Is it a different argument from Theorem 1 here?* Yes, in what it uses and in what it proves. Lane A uses one tangential condition and the centre condition, which is the sum of all twelve scalar balance equations and needs $\Omega^2\ne0$. Theorem 1 here uses the difference of the tangential conditions of two neighbouring like members (Lemma 1), and for the block word a second such pair, and never uses a radial condition. Lane A's proof is shorter. Theorem 1 proves more: no arrangement of these words has all tangential accelerations zero, whereas lane A's inequality alone leaves open an arrangement with $T=0$ and one gap above $\pi$. The two share no step, so their agreement on "no balanced ring" is agreement of two independent pencil proofs.

### Item 2. Lemma C (collision margin $0.05$ rad): confirmed, constants recomputed

*Identity.* With signs $-,+,-,+,-$ and $h(2\pi-x)=-h(x)$, $T_i=h(r_1)-h(r_1+r_2)+h(\psi^{(3)}_i)+h(p_1+p_2)-h(p_1)$, which is $\Phi(r_1,r_2)-\Phi(p_1,p_2)=-h(\psi^{(3)}_i)$ as stated. The monotonicity claims for $\Phi$ are correct ($\partial_a\Phi<0$ exactly when $2a+b<2\pi$). This identity is the same equation as the two groupings in Lemma 3 here, kept as an equality with the third-member term explicit.

*Bounds F2.* With $t=x/2$, $x^2h(x)=t^2\cos t/\sin^2t$, which is the function $\rho$ of (F4) here. The lower bound follows from $t\ge\sin t$, $\cos t\ge1-t^2/2$ and $\cos t\ge0$; the upper bound from $\sin^2t\ge t^2(1-t^2/3)$ and $\cos t\le1-t^2/2+t^4/24\le1-t^2/3$ for $t^2\le4$. Both are correct on $0<x\le\pi$. The factor $0.999$ is valid for $x\le\sqrt{0.008}=0.0894$, as stated.

*Constants, recomputed by hand.* $0.999-\tfrac14-\tfrac19-\tfrac1{16}=0.575389\ge0.57538$; $1/\sqrt{0.57538}=1.31833\le1.3184$; $0.999/1.3184^2-1/2.3184^2=0.574739-0.186047=0.388692\ge0.38869$; $0.38869-\tfrac19-\tfrac1{16}=0.215079\ge0.21507$; $1/\sqrt{0.21507}=2.15631\le2.157$; $1+2(1.3184)+2(2.157)=7.9508\le7.951$; $7.951\times0.05=0.39755\le0.398<\pi$. All as lane A states. The index bookkeeping of the four uses of the identity (members $0$, $1$, $2$, $5$) is correct, and so is the direction of each inequality on the third-member term.

*One wording point, not a defect.* In Step 2 the decrease of $\Phi$ in its first argument is applied on the whole interval from $g_1$ to $1.3184\,g$, so the condition needed is $2a+g<2\pi$ for all $a$ in that interval, not only $2g_1+g<2\pi$ as written. It holds trivially ($2\times0.066+0.05<2\pi$).

*Relation to Lemma 5 here.* The two margins differ by design and do not conflict. Lane A's uses the centre condition, hence full balance, takes two steps of the chain with crude constants, and gives gaps above $0.05$ rad. Lemma 5 here uses the tangential conditions only, runs the chain all the way round with the sharp scale-free ratio of Lemma 4, closes on $\sum_k\alpha_k=\pi$ instead of the centre condition, and gives gaps above $0.8138$ rad. Lane A's first constant $1.3184$ against $a_2=1.1547$ here is the cost of bounding the third-member and second-neighbour terms by $1/9+1/16$ instead of keeping them.

### Item 3. Uniqueness certificate: confirmed, and reproduced

*Sufficiency.* Injectivity of $F=(T_0,\dots,T_4)$ on the convex box, from a norm bound below $1$ on $I-CJ(X)$ and the row-wise mean value theorem, together with the hexagon as a known zero in the box, is a complete uniqueness statement for balanced rings in the box. The inclusion half of the Krawczyk test is needed only for existence, which the closed form supplies. This is the argument written out in Section 4.1 here; this document checked the inclusion as well, but did not need it.

*Consistency with the box here.* Lane A's box has half-width $0.025$ in gaps, that is $0.0125$ in half-gaps, and contains the box here (half-width $0.005$ in half-gaps, $0.01$ in gaps). The norm $\|I-CJ(X)\|_\infty$ does not change when all variables are rescaled by one factor, so the two lanes' numbers are directly comparable at equal gap radius. They differ: at gap radius $0.01$ lane A reports $0.370$ and this document $0.390$. The cause is the preconditioner, not an error. Lane A inverts the midpoint of the interval Jacobian $J(X)$; this document inverts the Jacobian at the centre of the box. A scratch computation written for this review, [weber-binding-sphere-ring-b-cross-review-norm.py](../evidence/weber-binding-sphere-ring-b-cross-review-norm.py) (measured, double precision, not rigorous; coded from lane A's description in half-gap coordinates), first reproduced this document's certified $0.39011$ at half-gap radius $0.005$ as its known case, and then gave, at gap radius $0.01$, $0.02$, $0.025$, $0.03$:

| Variant | $0.01$ | $0.02$ | $0.025$ | $0.03$ |
| --- | --- | --- | --- | --- |
| lane A as reported | 0.370 | 0.731 | 0.90497 | 1.074 |
| scratch, inverse of the midpoint of $J(X)$ (lane A's stated choice) | 0.37006 | 0.73080 | 0.90497 | 1.07379 |
| scratch, inverse of the Jacobian at the centre (this document's choice) | 0.39011 | 0.82474 | 1.06290 | 1.31773 |
| scratch, largest value over 4032 sampled points of the box (a lower bound on the true supremum) | 0.17868 | 0.40098 | 0.53245 | 0.68012 |

Lane A's four reported values are reproduced to the digits given. At its radius the true supremum is at least $0.53$ and its bound $0.905$ sits above that, as a valid bound must. This document's instrument would not certify a box of gap half-width $0.025$ with its own preconditioner ($1.063$); that is a weakness of the choice made here, not of lane A's certificate. Lane A also notes that its enclosure of $\kappa$ by monotonicity and the plain interval formula give the same number; that is expected, because the plain interval formula for $(1+\cos^2)/\sin^3$ is exact on any interval inside $(0,\pi)$, its two extremes each being attained at an end point or at $\pi/2$, where numerator and denominator are extreme together. What cannot be checked from the document alone is that the instrument takes the minimum of $\kappa$ at $\pi$ for the three-gap arc, which straddles $\pi$; the reproduction above did so and matched.

### Item 4. Trust assumption TA2 (own sine and cosine, blanket widening): confirmed, thin in three places of exposition

*Recomputed.* Argument reduction to $y=x/8\le0.4$ is exact in binary64. Truncation: $0.4^{17}/17!=4.8\times10^{-22}<10^{-21}$. Doubling: with errors at most $e$ in $s$ and $c$, both at most $1$ in magnitude, the error of $2sc$ is at most $2(|s|+|c|)e+2e^2\le2\sqrt2\,e+2e^2$ plus about $2.2\times10^{-16}$ of rounding, and the error of $1-2s^2$ is at most $4|s|e+2e^2$ plus about $3.3\times10^{-16}$ of rounding; both are below $4e+5\times10^{-16}$. From $e_0=4\times10^{-15}$: $e_1\le1.65\times10^{-14}$, $e_2\le6.65\times10^{-14}$, $e_3\le2.67\times10^{-13}\le2.7\times10^{-13}$. The widening to $10^{-12}$ leaves a factor of about $3.7$. The relative widenings of $10^{-13}$ on quotients and five-term sums, and $10^{-12}$ on arc end points, exceed the rounding of the few operations they cover by three or more orders of magnitude. The argument as written is sound.

*Where it is thin.* (a) The bound $e_0\le4\times10^{-15}$ after the polynomial stage is an operation count (thirty operations at $2^{-53}$ on magnitudes at most $1$), not a derivation; it does not say whether the Taylor coefficients are literals or computed quotients, whose representation errors also enter. A Horner analysis gives an error of order $10^{-16}$, so the stated bound holds with about a factor of ten to spare, but the text does not show it. (b) The doubling recurrence omits the quadratic term $2e^2$ and the split of the $5\times10^{-16}$; both are covered, as recomputed above, but unstated. (c) The text does not say whether the cap $2\pi-(6-m)\delta$ is itself rounded outward. This cannot affect the theorem: by Lemma C every solution has gaps above $0.05$, so its arcs lie at least $0.04$ below a cap computed with $\delta=0.01$. None of the three changes a conclusion. TA2 is also not a single point of failure across the lanes: the Node instrument here assumes something different (A2, the accuracy of the library functions, widened by two steps), and substrate M here and lane A's own leaf recheck use `mpmath.iv`.

### Item 5. The two cross-lane chains

*Lane A's lemma with lane B's code.* Lane A's Lemma C leaves the alternating arrangements with every gap above $0.05$ rad, that is every half-gap above $0.025$. The lemma-free run of Section 5.3 covers every arrangement with all half-gaps at least $0.01$, with no symmetry reduction, and $0.025>0.01$, so that region contains everything Lemma C leaves. Therefore lane A's Proposition 1 (pencil), lane A's Lemma C (pencil) and lane B's lemma-free alternating run with its uniqueness box (645637 boxes, substrate N, assumptions A1 to A4) form a complete proof of the classification in which the pencil part and the code were written in different lanes. Lemma C needs full balance, and that run uses all conditions, so the two fit.

*Lane B's lemma with lane A's code.* The region $D_6$ of Section 3.3 has every half-gap at least $0.4069$, so every gap at least $0.8138\ge0.01$, and its normalisation ($\alpha_1$ smallest, $\alpha_2\le\alpha_6$) is lane A's ($g_0$ smallest, $g_1\le g_5$) with the index shifted by one. So $D_6$ lies inside the reduced domain of lane A's run `w1-d0.01`, and inside its run without symmetry reduction. Therefore Theorem 1 and Lemma 5 here, with lane A's branch and bound and certificate, also form a complete proof across the lanes.

### Verdicts

| Item | Verdict |
| --- | --- |
| 1. Proposition 1 | Confirmed. Correct; the member choice works for every form; a different argument from Theorem 1 here. |
| 2. Lemma C | Confirmed. Identity, bounds and all seven constants recomputed; one wording point in Step 2, no effect. |
| 3. Uniqueness certificate | Confirmed. Injectivity with the known zero suffices; consistent with the box here; the reported norms reproduced by separately written code (measured). |
| 4. TA2 | Confirmed as sound; exposition thin at (a), (b), (c) above; no effect on the result. |
| 5. Cross-lane chains | Confirmed in both directions. |

### Common results of the two lanes

| Result | Lane A | Lane B | Agree |
| --- | --- | --- | --- |
| Tangential and radial conditions | $T_i=-\sum\sigma_{ij}h(\psi_{i\to j})$, $U_i=\sum\sigma_{ij}u(\psi_{i\to j})$ | the same in half-angles | yes |
| Number of polarity words | three | three | yes |
| Words $++-+--$ and $+++---$ | no balanced ring; pencil, one tangential condition and the centre condition | no arrangement with all $T_i=0$; pencil, like-pair identity | yes; different proofs; lane B's statement is the stronger |
| Same words, validated region | all excluded for gaps $\ge0.01$ (108525 and 1847 boxes) | all excluded for half-gaps $\ge0.01$ (127271 and 3235 boxes; tangential only 252765 and 3757) | yes |
| Alternating word, collision margin | every gap $>0.05$ rad; needs full balance | every gap $>0.8138$ rad; tangential conditions only | consistent; lane B's is the stronger |
| Alternating word, compact region | reduced domain, gaps $\ge0.01$: 555407 boxes; without symmetry 14682807 | $D_6$: 2941 boxes (N), 2935 (M); lemma-free, half-gaps $\ge0.01$, no symmetry: 645637 | yes: only the hexagon's box survives |
| Uniqueness box about the hexagon | gap half-width $0.025$, norm $0.90497$ | gap half-width $0.01$, norm $0.39012$ | yes; nested; the difference in norm is the preconditioner |
| Hexagon and its rate | $\Omega^2=5/4-1/\sqrt3$ | the same | yes |
| Classification of three and three | alternating regular hexagon only | the same | yes |
| Four members, two and two | alternating square only, $\Omega^2=(2\sqrt2-1)/4$; margin $0.05$ rad | the same; margin $1.3434$ rad in gaps | yes |
| Multi-start search, six members | 2514 of 3000 alternating starts, all the hexagon; none for the other words | 807 of 6000 starts drawn over all words, all the hexagon | yes (measured on both sides) |
| Tangential conditions alone suffice | not claimed | claimed (Corollary) | lane B only; not confirmed by lane A |

What the comparison does and does not establish. The two lanes agree on every common result, by separately written pencil arguments and separately written code, and each lane's pencil margin closes the other lane's computation. The one statement resting on a single lane is the tangential-only strengthening, which is lane B's alone.

## 11. Run record (append-only, UTC, 2026-10-07)

- 03:31Z: lane B started; read AGENTS.md, the operator explanation standard, the heartbeat procedure and Section 12 of the preregistration. Lane A's files, the earlier ring instrument and its receipt, and the continuation document were not opened.
- 03:31Z to 03:38Z: derivation, before any computation, of the half-angle form, Lemmas 1 to 5 and Theorem 1; plan for the alternating word fixed as margin lemma, interval branch and bound in half-gap coordinates, uniqueness box.
- 03:40:02Z: Node instrument written; KB1 passed (hexagon residual $1.58\times10^{-15}$, detuned $6.73\times10^{-2}$).
- 03:40:27Z to 03:40:53Z: enclosure sets exported and their mpmath checks started under the compute supervisor; KB4 passed; two-member and four-member runs complete.
- 03:40:59Z: **order deviation, recorded.** A first six-member target run was made while the KB2 enclosure checks were still running (they passed at about 03:42:56Z). It is exploratory and is not a run of record. It also returned a negative result worth keeping: with uniqueness radius $r=0.02$ the test failed ($\kappa=1.89$) and 7 boxes near the hexagon were left undecided.
- 03:41:12Z: radii $0.01$, $0.005$, $0.002$ tried ($\kappa=0.82$, $0.39$, $0.15$); all three complete. $r=0.005$ chosen.
- 03:42Z to 03:44:43Z: multi-start census run under the supervisor (two, four, then six members).
- 03:43Z: substrate M written and run; four-member then six-member case complete.
- 03:44:11Z: lemma sanity checks passed.
- 03:44:43Z to 03:45:06Z: exploratory validated runs on the non-alternating words with margins $0.2$, $0.05$, $0.01$; all complete.
- 03:46:33Z: substrate M rerun with and without the radial differences; both complete.
- 03:47:15Z: Node instrument frozen (provenance fields added, default radius set to $0.005$; no change to the arithmetic), SHA-256 `d5c67b46…8bac`.
- 03:47:16Z to 03:49:53Z: **runs of record**, one supervised driver, known cases first: KB1 (03:47:16Z), KB2 exports and both checks (passed 03:49:14Z), lemma checks, KB4, two-member cases, four-member cases on both substrates (03:49:22Z), then the six-member targets on both substrates (03:49:36Z, 03:49:52Z), then the non-alternating cross-checks (03:49:53Z). Every run complete, no undecided box.
- 03:50:41Z: receipts consolidated and hashed.
- 03:53:43Z: this document written.
- 03:54:26Z: one option added to the Node instrument (`--polygon-box`, a uniqueness box about the regular polygon for runs that use no lemma); no change to the arithmetic or to any existing case. Two exploratory runs with it (four members at margin $0.05$, six members at margin $0.1$) complete. New SHA-256 `20230074…e918`. Because the instrument changed, the 03:47Z pass is superseded as the run of record.
- 03:54:35Z to 03:54:40Z: exploratory lemma-free run, alternating word, margin $0.01$: 645637 boxes, complete.
- 03:54:54Z to 03:56:58Z: **runs of record, final**, one supervised driver, known cases first, instrument SHA-256 `20230074…e918`: KB1 (03:54:54Z), both KB2 checks (passed 03:56:19Z), lemma checks, KB4 and the two-member and four-member cases on both substrates (03:56:25Z), the six-member targets on both substrates (03:56:35Z, 03:56:49Z), then the lemma-free cross-checks for all three words (03:56:50Z, 03:56:58Z). Every run complete, no undecided box, every count identical to the 03:47Z pass. Driver exit code 0, process group closed.
- 03:57:21Z: receipts consolidated and hashed again; Sections 5, 6, 8 and 10 of this document updated to the final pass.
- 03:58:56Z: no lane B process and no active lease of the owner task, by `pgrep -fl ring-b` and by the supervisor's `list --active`.
- 03:59:33Z: one more option added to the Node instrument (`--tangential-only` for lemma-free runs), so that Theorem 1 can be cross-checked in the form in which it is stated; no change to the arithmetic or to any existing case. Two exploratory runs with it (the non-alternating words at margin $0.01$) complete. New SHA-256 `928e823c…f2bd`. The 03:54Z pass is thereby superseded as the run of record.
- 03:59:44Z to 04:02:33Z: **runs of record, final** (supervisor run `db28876c-3419-4769-bdfd-dcbbd644ae53`, exit code 0, process group closed), known cases first, instrument SHA-256 `928e823c…f2bd`: KB1 (03:59:44Z), both KB2 checks (passed 04:01:31Z), lemma checks, KB4, the two-member and four-member cases on both substrates (04:01:38Z to 04:01:39Z), the six-member targets on both substrates (04:01:50Z, 04:02:04Z), then the six lemma-free cross-checks (04:02:06Z to 04:02:33Z). Every run complete, no undecided box; every count shared with the earlier passes is identical.
- 04:02:53Z: receipts consolidated and hashed; Sections 5, 8 and 10 updated to this pass.
- 04:03:32Z: closeout check. 22 supervisor leases whose command names a lane B file, all with the process group closed (scan of `.local-data/owned-compute/leases/`); no process matching `ring-b` by `pgrep -fl`; the one lease still active under the shared owner task does not name a lane B file and was left alone. By `git --no-optional-locks status --porcelain`, lane B created this document and eight files matching `evidence/weber-binding-sphere-ring-b-*`, all untracked, and modified no existing file. Lane B frozen.
- 04:06:41Z: exposure announced by the Principal Investigator (message stamped 04:08Z). Lane A's document read in full, SHA-256 `4357070d…c1a261` confirmed by `shasum`; its scripts and receipts not opened.
- 04:09:31Z: scratch norm computation for the cross-review run twice (known case first: this document's certified 0.39011 reproduced; then lane A's 0.370, 0.731, 0.90497, 1.074 reproduced with its stated preconditioner). Script kept as `evidence/weber-binding-sphere-ring-b-cross-review-norm.py`, SHA-256 `0eac6f7b7a45cd6a2e5bfce1f89f3f5b7f099323d2561cea397d678a200a9d5c`; output at `.local-data/master-equation-closure/weber-binding-sphere/ring-b/cross-review-norm.log` (local retention). Measured, double precision; it ran in under a second in the foreground, with no supervised lease.
- 04:11Z: section "Cross-review of lane A (after exposure)" inserted before this run record. The frozen text above the marker is byte-identical to the 04:03:40Z freeze (39634 characters, SHA-256 prefix `11a759b21f8d57ff` before and after). Verdicts: items 1 to 5 confirmed; no defect found in lane A; one wording point in its Lemma C and three thin places in the exposition of its TA2, none affecting the result.
