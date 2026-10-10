# A unique normal-support reversal before the first moving-source arrival

## Result and admitted interval

**Derived, awaiting independent review.** On the already verified actual symmetric meridional release, the outward signed normal support increases up to the first meridional turn, then decreases, crosses zero exactly once after the return to the initial latitude, and is strictly inward before the first incoming nonstationary preparation. In particular, it is already negative at the reached latitude $\alpha=1/3$, with

$$
\lambda(1/3)<-\frac{11}{30000},\qquad
T_{1/3}<\min\left\{\frac{251}{259},T_B\right\}.
$$

Here $T_B$ is the verified first incoming-preparation boundary, not an extrapolated fixed time. The conclusion is confined to $[0,T_B]$. No further evolution, tangential support, mass, physical pressure law or physical energy interpretation is introduced.

Use the canonical transmitter-weighted Master Equation with the selected normal-only sphere constraint, $R=K_{\mathrm{int}}=c_f=1$. The complete externally prepared history, signed polarity assignments and reached first turn are those in the [accepted first-turn reference](spherical-three-three-symmetry-first-turn.md). The reached return and root-admission boundary are those in the [incoming-preparation reference](spherical-three-three-symmetry-first-incoming-preparation.md), independently adjudicated in the [dynamics review](spherical-three-three-dynamics-first-incoming-review.md). Those premises establish complete five-partner, zero-positive-self root ledgers with stationary source emissions throughout the present interval; the terminal boundary is ordinary and the source position and velocity still equal their stationary values there.

## Eliminating signed speed exactly

Put $\alpha_0=\pi/6$, $z=\alpha-\alpha_0$, $\rho_0=\sqrt3/2$, and

$$
q=\rho_0\cos\alpha-\sin\alpha,\qquad B=\rho_0\sin\alpha+\cos\alpha,
$$

$$
d_L^2=2+q,\qquad d_O^2=2-q,\qquad d_A^2=2+2\cos z.
$$

These are distances from the current receiver to the five fixed old source sites, not simultaneous inter-member distances. The exact canonical radial acceleration and latitude acceleration are

$$
A_n(\alpha)=\frac1{d_L}-\frac1{d_O}-\frac1{2d_A},
$$

$$
f(\alpha)=-B(d_L^{-3}+d_O^{-3})+\frac{\sin z}{d_A^3}.
$$

Differentiating the radial expression gives the useful exact identity

$$
A_n'(\alpha)=\frac B2(d_L^{-3}+d_O^{-3})-\frac{\sin z}{2d_A^3}=-\frac12 f(\alpha).
$$

Thus an antiderivative of $f$ is $U=-2A_n$. The mathematical first integral of the admitted scalar ODE $\ddot\alpha=f(\alpha)$, with $v(0)=1/4$, is

$$
v^2=\frac1{16}+2\int_{\alpha_0}^{\alpha}f(a)\,da
=\frac1{16}-4\bigl(A_n(\alpha)-A_n(\alpha_0)\bigr).
$$

It follows either by differentiating $v^2/2-U(\alpha)$ in time or by integrating on each monotone segment and matching continuously at the turn. It therefore holds on ascent and descent without dividing by $v$ at its zero. This is a calculus identity for the stationary-source reduced equation, not a physical energy functional of the delayed system.

Since $\lambda=-v^2-A_n$, normal support is the single-valued latitude function

$$
\boxed{\lambda(\alpha)=3A_n(\alpha)-4A_n(\alpha_0)-\frac1{16}
=3A_n(\alpha)+\frac8{\sqrt7}-\frac{83}{48}.}
$$

Here $A_n(\alpha_0)=5/12-2/\sqrt7$. On the entire reached stationary-source interval, $f<0$, so

$$
\lambda'(\alpha)=-\frac32 f(\alpha)>0.
$$

Consequently support increases during the ascent, has its unique maximum at the first meridional turn, and decreases strictly during descent. At release and at the return to $\alpha_0$ it equals $2/\sqrt7-23/48>0$. A sign reversal, if reached, can therefore occur only once and on the descending portion. It remains to show that a negative latitude value is actually reached before $T_B$.

## A sharper time bound that reaches latitude one-third

The accepted ascent has $0\le z\le1/28$, and $B\le\sqrt7/2<4/3$. Hence $q\ge1/4-(4/3)(1/28)=17/84>1/5$. Define $S(q)=(2+q)^{-3/2}+(2-q)^{-3/2}$. Convexity of $x^{-7/2}$ gives

$$
S''(q)\ge\frac{15}{16\sqrt2},\qquad
S(q)\ge\frac1{\sqrt2}\left(1+\frac{15q^2}{32}\right).
$$

Since $B\ge3\sqrt3/4$ on the ascent,

$$
BS\ge\frac{489\sqrt6}{1280}.
$$

Also $d_A^2\ge4-1/784>(39/20)^2$, and $(39/20)^3>50/7$, so $0\le\sin z/d_A^3<1/200$. Using $\sqrt6>22/9$ gives the strictly improved deceleration bound

$$
-f>\frac{489\sqrt6}{1280}-\frac1{200}
>\frac{10758}{11520}-\frac1{200}>\frac{37}{40}.
$$

Therefore $T_*<10/37$ and the already reached symmetric return obeys $T_R=2T_*<20/37$.

The same lower deceleration bound holds while descending from $\alpha_0$ to $1/3$. On that interval $1/4\le q<1/2$; the upper bound follows from the rational trigonometric enclosure below. The earlier exact bound $S(q)<4/5$ and $B^2=7/4-q^2\ge3/2$ give

$$
\frac{d}{dq}(BS)=\frac{B^2S'-qS}{B}
\ge\frac qB\left(\frac{45}{32\sqrt2}-\frac45\right)>0.
$$

Here $S'(q)\ge15q/(16\sqrt2)$ follows by integrating the preceding second-derivative bound. At $q=1/4$, use $B_0>9/7$ and

$$
S(1/4)=\frac8{27}+\frac8{7\sqrt7}>\frac8{27}+\frac37=\frac{137}{189},
$$

where $\sqrt7<8/3$. Thus $BS>137/147>37/40$. On descent $\sin z\le0$, which only increases $-f$. This proves $-f>37/40$ on the whole segment to $1/3$.

After return, let $u=T-T_R$. Until latitude $1/3$ is reached, the downward displacement is at least $u/4+37u^2/80$. At $u=3/7$ this is $753/3920>4/21>\pi/6-1/3$, using $\pi<22/7$. Hence the old-source scalar trajectory reaches $1/3$ before

$$
T_{1/3}<\frac{20}{37}+\frac37=\frac{251}{259}<\frac{39}{40}.
$$

This is a reached actual trajectory statement, not just an estimate for an unadmitted scalar continuation. Before that latitude, $d_O\ge d_O(1/3)>49/40$ by the enclosure below. Thus the first stationary-emission margin stays positive through the whole proposed descending segment, with endpoint lower bound

$$
d_O-T-\frac14>\frac{49}{40}-\frac{251}{259}-\frac14=\frac{61}{10360}>0.
$$

The existing latitude and sub-wake bootstrap applies because this time is below its contradiction horizon $\overline T$. Alternatively the descending speed bound $|v|<1/4+(5/4)(3/7)=11/14$ already gives a strict local margin. There is no collision or root singularity before the reached latitude. The complete-history monotonicity and no-self arguments remain valid. Therefore $T_{1/3}<T_B$.

## Exact rational negative-support certificate

No quadrature or floating-point target is needed. Alternating Taylor bounds for sine through orders five and seven and cosine through orders four and six at $a=1/3$, together with rational squaring for $\rho_0$, give

$$
\frac{327194}{10^6}<\sin a<\frac{327195}{10^6},\quad
\frac{944956}{10^6}<\cos a<\frac{944959}{10^6},\quad
\frac{866025}{10^6}<\rho_0<\frac{866026}{10^6}.
$$

For example the lower sine polynomial is $a-a^3/6+a^5/120-a^7/5040$, the upper sine polynomial stops at $a^5/120$, the lower cosine polynomial is $1-a^2/2+a^4/24-a^6/720$, and the upper cosine polynomial stops at $a^4/24$. The alternating remainders have the stated signs. Multiplying these positive rational intervals yields

$$
\frac{49115}{100000}<q(a)<\frac{49117}{100000},\qquad
\frac{98194}{100000}<\cos(a-\alpha_0)<\frac{98197}{100000}.
$$

In particular $q(a)<799/1600$, so $d_O(a)^2=2-q(a)>(49/40)^2$, as used above. The following deliberately rounded reciprocal bounds follow by squaring positive quantities:

$$
\frac1{d_L(a)}<\frac{63358}{100000},\qquad
\frac1{d_O(a)}>\frac{81409}{100000},\qquad
\frac1{2d_A(a)}>\frac{25113}{100000},\qquad
\frac8{\sqrt7}<\frac{302372}{100000}.
$$

They can be checked without square-root evaluation by the four rational tests

$$
\left(\frac{63358}{100000}\right)^2\frac{249115}{100000}>1,\qquad
\left(\frac{81409}{100000}\right)^2\frac{150885}{100000}<1,
$$

$$
\left(\frac{50226}{100000}\right)^2\frac{396394}{100000}<1,\qquad
7\left(\frac{302372}{100000}\right)^2>64.
$$

The interval directions are important: the first uses a lower bound on $d_L^2$, the second an upper bound on $d_O^2$, and the third an upper bound on $d_A^2$. It follows that

$$
A_n(a)<\frac{63358-81409-25113}{100000}=-\frac{43164}{100000},
$$

$$
\lambda(a)<-\frac{129492}{100000}+\frac{302372}{100000}-\frac{83}{48}
=-\frac{11}{30000}<0.
$$

All displayed certificates are exact rational inequalities or alternating-series bounds. They are retained for independent arithmetic checking, not reported as output of a numerical instrument.

## Unique sign transition and limitation

There is exactly one latitude $\alpha_C\in(1/3,\pi/6)$ satisfying

$$
A_n(\alpha_C)=\frac43A_n(\alpha_0)+\frac1{48}.
$$

The actual trajectory reaches it exactly once on descent, at $T_C$ with

$$
T_R<T_C<T_{1/3}<T_B,\qquad T_{1/3}<\frac{251}{259}.
$$

Support is outward for $0\le T<T_C$, zero at $T_C$, and inward for $T_C<T\le T_B$. At the crossing $\dot\lambda=-(3/2)fv<0$, because both $f$ and the signed meridional velocity are strictly negative. At $T_B$, support is more negative than its value at latitude $1/3$, hence $\lambda(T_B)<-11/30000$. The isolated zero of support is not an unconstrained solution interval; the support changes sign transversely there.

The sign of support is determined by the difference between the actual canonical radial acceleration and the normal acceleration required by the changing speed on the sphere. This signed acceleration accounting does not identify a material pressure, a support mechanism or a physical energy reservoir. Once sources read moving preparation after $T_B$, the stationary first integral is no longer licensed, and none of the sign or uniqueness proof is extended past that boundary.

## Checkpoint, falsifiers and preservation

The completed artifact is this new dynamics-prefixed companion. The live AGENTS identity and Jack K. Hale lens were checked for this slice. Only the exact five-site field, the mathematical first integral, elementary comparison and rational certificates were used. No new instrument, target scan, quadrature, evolution, compute job or runtime artifact was introduced. Earlier subjects are preserved; the coordinator owns synthesis integration.

The result is derived pending independent reconstruction. Falsifiers are an error in $A_n'=-f/2$, any incorrect reciprocal or Taylor bound, failure of the sharper deceleration bound on its stated strip, or loss of the root-history margin before latitude $1/3$. The retained stationary-source admission proof and the new positive margin $61/10360$ fix where to inspect the reachability claim. The next dependency is independent review of this support-transition derivation, not additional evolution. This completes the bounded signed-support disposition.

Measured preservation: closing `shasum -a 256` retained the first-turn reference hash `82e30c3da469c692944115074292b3f5a244d7551e11318d972af1276b225b2e`, incoming-preparation subject hash `aa66e27bc832b15d548f20feaf95bf60f6a65b7babf4d799abb6f00b89be2d0b`, and independent incoming review hash `8da60171f9f89058e06cc8362d39e4239381ba5e085360d0aca76ab576ec3a9b`. Measured hygiene: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (status 1 records the new-file difference). These checks establish preservation only for the named artifacts and are not independent mathematical verification. No runtime or generated output needs regeneration.
