# An analytic remainder for the cubic canonical comparison response

**Derived candidate, pending independent assessment.** The [fifth-order method](overnight2-a-canonical-fifth-order-method.md) needs a Taylor remainder, not only formal coefficients. This note bounds that remainder for its analytic cubic comparison equation. It does not yet add the actual-history-to-comparison error or transfer the result to the nominal/spatial pair. The auxiliary complex variables are a mathematical estimate; physical motion still uses the unchanged canonical equation, original complete past and $c_f=1$.

## Complex comparison tube

Fix real receiving parameters $P,Q$ with $|P|\le3$, $0\le Q\le4$, and $P^2+Q^2\le16$. Complexify only the small parameter $\alpha$ and the comparison time $\xi$, with

$$
|\alpha|\le R_\alpha=.02,\qquad |\xi|\le2.5.
$$

Use the analytic differential equation

$$
\frac{dy}{d\xi}=\alpha w,\qquad
\frac{dw}{d\xi}=\alpha F_3(y,w;\alpha),
\quad y(0)=(1,0),\quad w(0)=(P,Q),
$$

where $F_3$ is the cubic field in the method. In every algebraic expression use the complex bilinear dot product, and the branch $\rho=\sqrt{y\cdot y}$ that equals one at the center. Norms in the estimates below are Hermitian Euclidean norms. With $n=y/\rho$, $p=n\cdot w$ and $v=w-pn$,

$$
F_3=Q\left[-\frac n{\rho^2}
+\frac\alpha{\rho^2}(w-2pn)
+\frac{\alpha^2}{\rho^2}\left(\frac{v\cdot v}{2}n+pv\right)
+\frac{\alpha^3Q}{3\rho^3}(4pn-5v)\right].
\tag{1}
$$

Consider the tube $\|y-(1,0)\|\le.25$, $\|w\|\le5.5$. It has

$$
|y\cdot y-1|\le .5625,\qquad |\rho|\ge\sqrt{.4375}>.661,
\quad \|n\|<1.9,
\quad |p|<10.45,
\quad \|v\|<25.355.
$$

Useful upper inverse bounds are $|\rho|^{-2}<2.29$, $|\rho|^{-3}<3.464$, $|\rho|^{-4}<5.242$ and $|\rho|^{-5}<7.94$. Bounding the four terms of (1) separately gives respectively less than $17.32$, $8.283$, $3.209$ and $.031$. Thus

$$
\|F_3\|<29.
\tag{2}
$$

Along any complex radial segment in the $\xi$ disk, the velocity change is at most $.02(2.5)(29)=1.45$, and the position change is at most

$$
.02(2.5)(4)+\frac{(.02)^2(2.5)^2}{2}(29)=.23625.
$$

Both are strict improvements on the tube. Local analytic ODE existence and uniqueness therefore continue the same branch throughout the complex disk, with analytic dependence on $\alpha$. The integral estimates are along that radial segment and use absolute length; no ordering or sign property of complex time is assumed.

## Implicit root and transmitter factor

The normalized comparison root is determined by

$$
L=\frac12\sqrt{S\cdot S},\qquad
S=(1,0)+y(-2L;\alpha),
\tag{3}
$$

where the argument of $y$ is $\xi$, not physical slow time. On $|L-1|\le.25$, this argument lies inside $|\xi|\le2.5$. Since $\|S-2(1,0)\|\le.25$,

$$
\left|\frac{S\cdot S}{4}-1\right|\le.265625.
$$

The branch of the square root near one consequently maps the $L$ disk into $|L-1|<.144$. To verify the map bound, use $|\sqrt{1+z}-1|=|z|/|\sqrt{1+z}+1|$ and $\operatorname{Re}\sqrt{1+z}\ge\sqrt{1-|z|}$. Its derivative in $L$ has modulus at most

$$
\frac{2.25}{2\sqrt{.734375}}(.02)(5.5)<.145.
$$

Therefore (3) has a unique fixed point on this disk, holomorphic in $\alpha$, equal to one at zero. This is the analytically continued local comparison root. It is not an assertion of physical roots at complex time.

At that root let $N=S/\sqrt{S\cdot S}$ and $D=1+\alpha N\cdot w(-2L)$. The estimates give

$$
|\sqrt{S\cdot S}|>1.713,
\qquad \|N\|<1.315,
\qquad |D|>.855.
$$

The analytic comparison response

$$
\Phi(\alpha)=-\frac{4S}{(S\cdot S)^{3/2}D}
$$

therefore satisfies

$$
\|\Phi(\alpha)\|<2.1\qquad (|\alpha|\le.02).
\tag{4}
$$

The denominator in (4) includes the sampled comparison velocity and the same implicit clock. Dropping either would change the function whose coefficients are being bounded.

## Transverse factor on the complex disk

The uniform bound (4) alone would lose the required angular factor. In the fixed reception frame, write $y_t,w_t$ for the second components. The transverse part of (1) can be bounded as

$$
|(F_3)_t|\le22.1|y_t|+.223|w_t|.
\tag{5}
$$

This bound follows term by term, without dividing by $Q$. The zeroth-order coefficient of $|y_t|$ is at most $4|\rho|^{-3}<13.856$. The first-order coefficients are below $5.767$ for $|y_t|$ and $.1832$ for $|w_t|$. For the second-order part, rewrite its transverse component as

$$
\alpha^2Q\left[\frac{v\cdot v}{2}\frac{y_t}{\rho^3}
+\frac{y\cdot w}{\rho^3}w_t
-\frac{(y\cdot w)^2}{\rho^5}y_t\right].
$$

Using $|y\cdot w|\le6.875$ gives coefficients below $2.383$ and $.03811$. The cubic transverse part is

$$
\frac{\alpha^3Q^2}{3}\left[\frac{9(y\cdot w)y_t}{\rho^5}
-\frac{5w_t}{\rho^3}\right],
$$

with coefficients below $.021$ and $.00074$. These totals support (5).

Let $W_t$ and $Y_t$ be the component suprema along a radial segment of the $\xi$ disk. Their common initial data give

$$
Y_t\le.05W_t,\qquad
W_t\le Q+.05(22.1Y_t+.223W_t).
$$

Hence $W_t<1.072Q$ and $Y_t<.0536Q$. In particular $S_t=y_t(-2L)$ has this same bound. Retaining it in the exact response instead of applying (4) indiscriminately yields

$$
|\Phi_t(\alpha)|<.05Q\qquad (|\alpha|\le.02).
\tag{6}
$$

When $Q=0$ the component argument gives zero identically. This is an analytic control for the factor, not an added physical zero-angular history.

## Taylor consequence and its precise scope

Let $T_5\Phi$ be the degree-five Taylor polynomial of this comparison response. Cauchy's coefficient bound and a geometric tail give, for real $0\le\alpha\le.001$,

$$
\|\Phi-T_5\Phi\|
\le\frac{2.1}{(.02)^6(1-\alpha/.02)}\alpha^6
<3.5\times10^{10}\alpha^6,
$$
$$
|\Phi_t-(T_5\Phi)_t|
\le\frac{.05Q}{(.02)^6(1-\alpha/.02)}\alpha^6
<8.3\times10^8Q\alpha^6.
\tag{7}
$$

The instrument's new coefficients are still under a separate blind derivation. Equation (7) concerns the analytically defined Taylor polynomial, regardless of whether a particular printed coefficient list is correct. Only after that independent derivation may the list be identified with $T_5\Phi$.

These constants are intentionally conservative. They pay for a complete complex parameter disk and a broad phase-space tube. They close the local comparison-response Taylor obligation, subject to independent assessment, but do not establish a useful accumulated phase error by themselves. Adding the actual mirror-to-cubic-comparison discrepancy requires a separate application of the local comparison lemma with the new field's derivatives and sufficiently late source generations. The original nominal/spatial forcing and the release interval remain additional obligations. There is no assertion that an infinite sequence of such fields converges or defines an alternative physical law.

Falsifiers are a complex branch crossing excluded by the displayed disks, loss of comparison retention, a missing source-clock derivative, an invalid bilinear-to-Hermitian estimate, or a transverse coefficient exceeding (5). All inequalities are analytical; no new target computation or production process was used. The note is frozen for independent assessment, with integration owned by the [main A report](overnight2-a-followup-and-research-2026-10-07.md).
