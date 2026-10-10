# Independent signed-support reference for the meridional release

Status: derived analytical reference, pending independent comparison. This derivation uses the accepted [first incoming-preparation result](spherical-three-three-symmetry-first-incoming-preparation.md), without reading the dynamics agent's pending support subject. It changes no earlier artifact. The scenario remains $R=K_{\mathrm{int}}=c_f=1$, normal support only, externally prepared past, $\alpha_0=\pi/6$, and initial signed velocity $1/4$.

## Mathematical first integral and support function

Retain the accepted five-source stationary-emission formulas, with $z=\alpha-\alpha_0$, $\rho_0=\sqrt3/2$, $q=\rho_0\cos\alpha-\sin\alpha$, and $B=\rho_0\sin\alpha+\cos\alpha$:

$$
d_L^2=2+q,\quad d_O^2=2-q,\quad d_A^2=2+2\cos z,
\qquad A_n=\frac1{d_L}-\frac1{d_O}-\frac1{2d_A}.
$$

Direct differentiation, using $q'=-B$, gives

$$
A_n'(\alpha)=\frac B2(d_L^{-3}+d_O^{-3})-\frac{\sin z}{2d_A^3}
=-\frac12f(\alpha).
$$

Therefore the autonomous scalar equation $\ddot\alpha=f(\alpha)$ has the mathematical first integral

$$
\dot\alpha^2+4A_n(\alpha)=C,
\qquad
C=\frac1{16}+\frac53-\frac8{\sqrt7},
$$

because $A_n(\alpha_0)=5/12-2/\sqrt7$. Its time derivative vanishes identically, including at zero signed velocity. This is an auxiliary integration identity for a fixed-source ODE, not a physical energy definition or a conservation law for the unrestricted delayed system.

Eliminating the squared speed from the exact sphere support gives

$$
\boxed{\lambda(\alpha)=3A_n(\alpha)-C.}
$$

Throughout the accepted trajectory before $T_B$, $f<0$, so $A_n'>0$ and $\lambda'(\alpha)=-3f/2>0$. The support increases during ascent and decreases strictly after the first turn. At release and the return to the release latitude,

$$
\lambda_0=\frac2{\sqrt7}-\frac{23}{48}>0.
$$

It remains to prove that negative support is actually reached before the stationary-emission reduction ends; a negative value at an inaccessible latitude would not suffice.

## A reachable negative-support latitude

Choose the explicit latitude $a=33/100$. First sharpen the deceleration bound on the actual ascent and the descent down to $a$. The accepted turning rise is below $1/28$. On $a\leq\alpha\leq\alpha_0+1/28$, $0<q<3/5$ and $B=\sqrt{7/4-q^2}$. Write $y=q^2<1/2$. The even binomial expansion with positive coefficients gives

$$
S(q):=(2+q)^{-3/2}+(2-q)^{-3/2}
\geq\frac1{\sqrt2}\left(1+\frac{15q^2}{32}\right).
$$

Indeed the squared product on the right obeys

$$
\frac12(7/4-y)(1+15y/32)^2-\frac78
=\frac y2\left(\frac{41}{64}-\frac{2265}{4096}y-\frac{225}{1024}y^2\right)\geq0,
$$

as the bracket is positive even at $y=1/2$. Thus $BS\geq\sqrt{7/8}$. On the ascending strip, $\sin z/d_A^3<(1/28)(10/19)^3<1/190$; on descent below $\alpha_0$, that term is nonpositive. Consequently throughout these arcs

$$
-f>\sqrt{7/8}-\frac1{190}>\frac{25}{27}.
$$

The first turn therefore satisfies $T_*<27/100$, and the already justified autonomous return satisfies $T_R=2T_*<27/50$. After the return, until latitude $a$ or the first source boundary, putting $u=T-T_R$ gives

$$
\alpha_0-\alpha(T)>\frac u4+\frac{25}{54}u^2.
$$

At $u=87/200$ the right side exceeds $\pi/6-33/100$ (use $\pi<22/7$). Thus the first event $T_a$ with $\alpha(T_a)=a$ would satisfy $T_a<39/40$ if the old-source domain lasts that far.

To close that qualification, direct alternating Taylor bounds give

$$
\frac{99}{200}<q(a)<\frac{62}{125}.
$$

These rational bounds can be checked without quadrature: use $86602/100000<\sqrt3/2<86603/100000$, $1-a^2/2+a^4/24-a^6/720<\cos a<1-a^2/2+a^4/24$, and $a-a^3/6<\sin a<a-a^3/6+a^5/120$. Therefore

$$
d_O(a)>\sqrt{2-62/125}>\frac{49}{40}.
$$

Before reaching $a$, the descending latitude is larger and $d_O$ is larger. If the first source boundary intervened before $T_a$, the same motion inequality would force its time below $39/40$, whereas its required equality $d_O=T+1/4$ would require $T>39/40$. This contradiction proves that $T_a$ is reached before $T_B$, with strict stationary-emission margin $d_O(a)-T_a-1/4>\sqrt{188/125}-49/40>0$. The previously accepted complete root census, sub-wake bound, and ordinary solution continuation apply throughout this subinterval.

At this reached latitude, the lower bound $q(a)>99/200$ yields the rational inverse-distance comparisons

$$
\frac1{d_L(a)}<\frac{6331}{10000},\qquad
\frac1{d_O(a)}>\frac{8151}{10000},\qquad
\frac1{2d_A(a)}\geq\frac14.
$$

The first two follow by squaring against $d_L^2>499/200$ and $d_O^2<301/200$. Hence $A_n(a)<-54/125$. On the other hand $\sqrt7>529/200$ gives $C/3>-54/125$. It follows strictly that $\lambda(a)=3A_n(a)-C<0$.

## Unique transition and scope

There is exactly one latitude $\alpha_\lambda\in(33/100,\pi/6)$ satisfying

$$
A_n(\alpha_\lambda)=C/3.
$$

The actual descending solution reaches it exactly once, at $T_\lambda$ with $T_R<T_\lambda<T_a<T_B$. The support is positive from release until $T_\lambda$, zero at the transition, and negative afterward through the first incoming-preparation boundary. Monotonicity of $A_n$ in latitude, strict descent after the first turn, and negative support at the reached latitude prove both existence and uniqueness. The simultaneous transition occurs for all six members by the accepted transitive full-history symmetry.

With the convention $X''=A+\lambda n$, positive support is outward and negative support is inward. The zero crossing is ordinary: $\dot\lambda=(-3f/2)\dot\alpha<0$ there. It does not delete a causal root, stop the motion, or introduce a new event rule. The prescribed normal-constraint scenario permits signed support. If an additional one-sided outward-only support were imposed, this crossing would instead delimit that additional scenario; no such modification is made here.

No claim is made about the support sign beyond $T_B$, where the arriving nonstationary history invalidates the autonomous first integral. No physical energy or stability statement follows from this integral. Falsifiers for independent checking are the factor four in the integral, the signed derivative $A_n'=-f/2$, the rational lower bound on deceleration, the reached-latitude root margin, and either inverse-distance inequality. This reference uses no numerical evolution, quadrature or new instrument. Its only outstanding dependency is independent comparison and coordinator integration.

Measured document checks: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (exit 1 denotes its new-file difference). `shasum -a 256` over the symmetry-prefixed Markdown files reproduced all nine earlier frozen identities. These checks establish formatting and preservation, not independent mathematical acceptance. Coordinator-owned synthesis and all dynamics/reviewer subjects remain outside this file's write scope.
