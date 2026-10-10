# Rigid rotation of the alternating equatorial hexagon

## Scope and result

**Derived, submitted for independent review.** A regular equatorial hexagon with alternating polarities cannot rotate rigidly at any nonzero sub-wake speed under the canonical Master Equation with normal-only support. Its canonical tangent acceleration is strictly positive in the direction of rotation. This excludes this prescribed family for every finite positive radius and coupling; it does not exclude other six-member motions or establish their fate or stability.

Use the [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md), with its transmitter factor and all admitted causal roots. The sole selected addition is acceleration normal to the sphere. Set $c_f=1$, fix $K=K_{\mathrm{int}}>0$, and prescribe the complete histories

$$
\mathbf X_i(T)=R\bigl(\cos(\omega T+i\pi/3),\sin(\omega T+i\pi/3),0\bigr),
\qquad \sigma_i=(-1)^i,\qquad \omega=\beta/R,\qquad 0<\beta<1.
$$

The prescribed histories extend over the entire past. Their minimum simultaneous separation is $R$. Rotation and cyclic relabeling preserve every polarity product, so all receivers have the same radial and tangent components in their own rotating frames. This calculation concerns exact prescribed-history compatibility, not numerical evolution or an energy assignment. The stationary supported hexagon is recovered at $\beta=0$.

## Complete root ledger

Fix receiver zero at phase zero. For partner $k\in\{1,2,3,4,5\}$ put $a_k=k\pi/6$. Define $x_k$ as the unique solution

$$
x_k+\beta\sin x_k=a_k,\qquad 0<x_k<\pi.
$$

The left side has derivative $1+\beta\cos x>1-\beta>0$, maps $[0,\pi]$ onto itself, and hence supplies a unique bracketed root for each partner. Its dimensionless delay is $u_k=2\sin x_k\in(0,2]$; the actual delay is $Ru_k$. At emission the transmitter's angular offset is $2a_k-\beta u_k=2x_k$. Thus

$$
\widehat{\mathbf r}_k=(\sin x_k,-\cos x_k,0),\qquad
D_{t,k}=1+\beta\cos x_k>1-\beta.
$$

This construction finds every root, not just one branch per partner. For a fixed receiver event, the delay residual $f(\tau)=\tau-|\mathbf X_i(T)-\mathbf X_j(T-\tau)|$ increases with lower Lipschitz slope $1-\beta>0$. It is negative at zero for every partner and nonnegative at $2R$. Hence each of the five partners has exactly one root in $(0,2R]$. A self chord has length at most $\beta\tau<\tau$, excluding all positive-delay self roots. There are precisely thirty directed partner roots and zero positive-delay self roots for the six receivers throughout every period. No finite sign scan or retained-history truncation enters this proof.

For completeness $D_{r,k}=1-\widehat{\mathbf r}_k\cdot\mathbf V_i=1+\beta\cos x_k=D_{t,k}$: root playback is unity. No receiver denominator is inserted into the acceleration. Every root is ordinary throughout the stated open speed interval. This argument makes no claim at $\beta=1$ or beyond.

## Exact residual and the stationary limit

Define dimensionless radial and tangent accelerations

$$
N(\beta)=\frac14\sum_{k=1}^5\frac{(-1)^k}{\sin x_k(1+\beta\cos x_k)},
\qquad
T(\beta)=-\frac14\sum_{k=1}^5\frac{(-1)^k\cos x_k}{\sin^2x_k(1+\beta\cos x_k)}.
$$

The full canonical vector is $\mathbf A=(K/R^2)(N\mathbf n+T\mathbf t)$; its out-of-plane component is zero exactly. Required centripetal acceleration is $-\beta^2\mathbf n/R$. Consequently the signed outward normal support and the additional tangent support that would be required are

$$
\lambda=-\frac{\beta^2}{R}-\frac K{R^2}N(\beta),\qquad
\mu=-\frac K{R^2}T(\beta),\qquad \nu=0.
$$

After applying normal support, the full vector residual is $-(K/R^2)T\mathbf t$. Normal-only compatibility is therefore equivalent to $T(\beta)=0$. A radius change cannot change its zero set at fixed $\beta$ and positive $K$.

At zero speed the exact geometric reference gives

$$
N(0)=-\frac54+\frac1{\sqrt3},\qquad T(0)=0,
\qquad \lambda(0)=\frac K{R^2}\left(\frac54-\frac1{\sqrt3}\right)>0.
$$

This is an analytical control from the five stationary separations $R,\sqrt3R,2R,\sqrt3R,R$ and alternating signs. It is not a numerical fixture.

## Small-speed sign

Write $x=x(a,\beta)$ for the same inverse and

$$
h(a,\beta)=-\frac{\cos x}{\sin^2x(1+\beta\cos x)}.
$$

Implicit differentiation gives $x_\beta=-\sin x/(1+\beta\cos x)$ and

$$
\partial_\beta h=-W(a,\beta),\qquad
W(a,\beta)=\frac{1+\beta\cos^3x}{\sin^2x(1+\beta\cos x)^3}>0.
$$

Since $T=\frac14\sum(-1)^kh(a_k,\beta)$,

$$
T'(0)=-\frac14\sum_{k=1}^5(-1)^k\csc^2a_k
=-\frac14\left(-4+\frac43-1+\frac43-4\right)=\frac{19}{12}.
$$

Reversing rotation and reflecting the polygon makes $T$ odd in the signed speed parameter. Smooth implicit inversion near zero therefore gives $T(\beta)=19\beta/12+O(\beta^3)$, while $N(\beta)=N(0)+O(\beta^2)$. This already excludes a nonzero constant-speed branch emerging locally from the stationary hexagon. The following inequality strengthens it to the whole sub-wake interval.

## Strict convexity and full-interval exclusion

Fix $0\le\beta<1$. We prove that $W(a,\beta)$ is strictly convex for $0<a<\pi$. Put $c=\cos x$, $S=1-c^2>0$ and $D=1+\beta c>0$. Direct differentiation using $\partial_a=-(\sqrt S/D)\partial_c$ gives

$$
W_a=-\frac{P}{S^{3/2}D^5},\qquad
P=2c+\beta(8c^2-3-c^4)+2\beta^2c^5,
$$

$$
W_{aa}=\frac{E}{S^2D^7},
$$

where

$$
E=2+4c^2+\beta(-c+18c^3+c^5)
+\beta^2(15-48c^2+59c^4-8c^6)+6\beta^3c^7.
$$

Here is a sign proof covering the entire domain. For $c\ge0$, put $t=c^2\in[0,1]$. The quadratic-speed coefficient obeys

$$
15-48t+59t^2-8t^3\ge15-48t+51t^2\ge\frac{63}{17}>0.
$$

The remaining terms obey $2+4c^2+\beta(-c+18c^3+c^5)+6\beta^3c^7\ge2-\beta c>1$. Thus $E>0$ on this half of the domain.

For $c=-z<0$, put $t=z^2\in(0,1)$. An exact rearrangement gives

$$
E=(2+4t)(1-\beta z)^3+\beta(1-t)(A+B\beta+C\beta^2),
$$

$$
A=z(7+t),\qquad B=15-39t+8t^2,\qquad C=2z^3(1+3t).
$$

If $B\ge0$, the bracket is positive. If $B<0$, then $t>2/5$ because $B$ decreases on $[0,1]$ and $B(2/5)=17/25>0$. In that region

$$
4AC-B^2=(1-t)^2(-40t^2+720t-225)>0:
$$

the last polynomial increases on $[2/5,1]$ and equals $283/5>0$ at $2/5$. The quadratic $A+B\beta+C\beta^2$ therefore has negative discriminant and positive leading coefficient, so is positive. The first term of $E$ is also strictly positive for $\beta<1$. This proves $W_{aa}>0$ for negative $c$ as well. At $\beta=0$ the formula reduces independently to $(2+4c^2)/\sin^4x$, the familiar second derivative obtained by differentiating $\csc^2a$ twice directly.

Use the equally spaced points $a_k=k\pi/6$. Strict midpoint convexity gives

$$
W_1+W_3>2W_2,\qquad W_3+W_5>2W_4.
$$

Consequently

$$
T'(\beta)=\frac14(W_1-W_2+W_3-W_4+W_5)
>\frac18(W_1+W_5)>0.
$$

Together with $T(0)=0$, this yields $T(\beta)>0$ for every $0<\beta<1$. The requested normal-only branch is excluded throughout this interval without a numerical scan. Reversing the sense of rotation reverses the oriented tangent component but leaves its nonzero component along the direction of motion positive. No choice of finite $R>0$ removes this mismatch for fixed positive coupling. The extra support required would oppose the motion; such support is not selected in this scenario.

## Review boundary and retained checkpoint

This is a derived analytical exclusion awaiting a separate independent reconstruction, especially of the rational second derivative and its positivity decomposition. Its falsifiers are an error in the transmitter-weighted canonical projection, a missed root despite the whole-history sub-wake bound, or failure of the displayed convexity identity or sign argument. The stationary limit and first derivative provide exact controls but are not independent adjudication of the full theorem. No numerical target, evolution instrument, CPU-intensive job, or additional speed grid was needed or launched. No singular extension, modified law or physical-fate conclusion is supplied.

The current artifact is this new dynamics-prefixed companion. Earlier analyses and instruments were not edited. The coordinator owns integration into the shared synthesis. The mathematical task stops at this proposed full-interval exclusion; independent review is the next dependency. The live startup router, research owner, Jack K. Hale analytical lens and canonical Master Equation were inspected for this slice. Prior memory supplied only the reminder to keep stationary balance and motion claims separate; all equations and conclusions above were reconstructed from the live scenario.

Measured hygiene and preservation: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics (status 1 records the new-file difference). `shasum -a 256` matched the retained hashes of the preceding direction review (`06dd37166d37033b9be61e766b67966386b777950e11dd4da5af50b6b1a78744`), fold-local instrument (`a5889a5b53a35959a051cea98b4abf902774fc2239ee52c3e15d97387bb19096`) and superfield-root instrument (`73f65040e65dcefafdbe26010bff2fb7d5353c3a60a956963acb7c1885889a4b`). These scoped hash checks establish preservation of those three artifacts; no global repository cleanliness claim is made. There is no runtime payload or regeneration obligation from this analytical slice.
