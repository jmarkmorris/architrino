# Twisted rotating ladder: independent geometry, the branch at $R=10^3$, and its fold near $0.878\pi$

Worker note for the Principal Investigator (launch name: rotating ladder twisted geometry; specialist lens: Henri Poincaré). Written 2026-10-20. This note tests the claims in the section "Twisted structures move along their axis" of the [rotating alternating ladder](rotating-alternating-ladder.md). It is a float measurement and derivation of geometry only. It contains no interval certificate, no stability statement, and no statement about finite segments.

## Result

1. **The recorded branch at $R=10^3$ is confirmed.** Solving the three balance conditions with a separately written evaluator, seeded only from this note's own first-order solution, reproduces every printed digit of the recorded table for $\alpha/\pi=1.00,0.98,\dots,0.88$, including the axial speeds and their ratios to the rotation speed. The ratio at $R=100$, $\alpha=0.9\pi$ is $-0.37477$, confirming $-0.375$. Grade: measured (float evaluator `twisted_eval.py`, truncation $\lvert k\rvert\le N$ with $N$ from $4000$ to $32000$; it can establish agreement to about ten digits, not existence).
2. **The branch folds back at $\alpha_f=0.8777499\pi$.** Continuation in twist shows the branch reaching a smallest twist $\alpha_f/\pi=0.87774988$ at $R=10^3$, with $d/R=2.89714$, $\omega R=0.0132802$, $u=-0.0097517$. There the Jacobian determinant in the unknowns changes sign, the twist turns back, and $\alpha$ as a function of spacing has a nondegenerate minimum. Every hypothesis holds through the fold: the member speed is $0.0165$, the spacing is far from collapse, and each source keeps exactly one causal root. The loss of continuation below $0.88\pi$ recorded in the subject document is this fold, not a physical ending and not a numerical failure. Grade: measured for the location; inferred for "no balance near this branch below $\alpha_f$", which follows from the measured quadratic turning point but is not certified.
3. **The fold is already present at first order.** In the limit of large radius the balance reduces to a symmetric two-by-two linear system whose determinant has two zero curves in the plane of twist and spacing; they meet at $\alpha_f(\infty)/\pi=0.8777201$, $d/R=2.89725$. The fold moves in proportion to $1/R$: $0.8777499\pi$ at $R=10^3$ and $0.8780191\pi$ at $R=100$. Grade: derived (the first-order system); measured (its roots, by series summation).
4. **The returning branch ends in a non-rotating translating ladder.** Past the fold the branch returns toward $\alpha=\pi$ with growing axial speed and falling rotation speed. It reaches $\alpha=\pi$ exactly where the rotation stops, at the untwisted, non-rotating ladder translating along its axis with $d/R=2.5083135333$ and $\lvert u\rvert=0.8433854761$. Continued further, the branch is the mirror image of itself. The member speed stays below $0.844$ along the whole branch. The endpoint's spacing is fixed by an exact identity derived below: for a non-rotating ladder of any twist, translating at any speed below wake speed, the axial acceleration equals $u$ times its first-order coefficient. Grade: derived (the identity and the endpoint spacing); measured (the endpoint speed and the connection of the branch to it).
5. **The separate solution at $\alpha=0.6\pi$ exists and is far below wake speed.** At $R=10^3$: $d/R=0.6400299$, $\omega R=0.0167840$, $u=+0.0439735$, ratio $2.61996$, total member speed $V=0.0471$. A second solution sits beside it at $d/R=0.6264195$ with $u=-0.1304914$ (ratio $-7.647$, $V=0.132$). At first order both lie on a small closed curve that exists only for twists between about $0.592\pi$ and $0.603\pi$. Grade: measured for both solutions; inferred for the closed curve (coarse first-order scan).

## Provenance and independence

The geometry derivation (held in scratch as `.tmp/rotating-ladder/twisted-geometry/derivation.md`, SHA-256 `a3da87eaebd161494b1e9afbbc05b6ecd129739ffdcb48bd5a9bf36ea4195fe5`) and the instruments were frozen at 2026-10-20T21:59:20Z, after their controls and before any comparison with the recorded table. Frozen SHA-256 values: `twisted_eval.py` `6b4b33a466cbd4accd922ba86f8a7e1e3b50dc01037a4a48855ceb228f3bfa94`, `first_order.py` `8c851a358f460ff4fe6fa86e273840e530066a6447c55b790c13bfe194c841ae`, `solve.py` `69c7832d195f15e95260aa33282eaaef26000f62855574bbb8212661f60cfa22`, `controls.py` `f2ef439d9c4643d189c3b1071b095b7dd453f7102f2ca7a3a67f8e5a0a37dc79`. None was edited afterwards. The recorded table was visible in the subject document before the freeze, because the assignment points to it; no value from it was used as a seed or a tolerance. This worker did not open `helix_scan.py`, `helix_exact.py`, the 2026-10-03 geometry session, or any file of the twisted-certificate worker. The agreement in Result 1 is therefore between two separately written evaluators of the same law, which tests both implementations; it is not a certificate.

## 1. Configuration and conventions

Units are $c_f=1$, $K=1$. Let $R$ be the pair radius, $d$ the rung spacing, $\delta=d/R$, $\omega>0$ the angular rate, counterclockwise about $+z$, $v=\omega R$ the rotational speed of each member, $u$ the axial speed of the whole structure, positive toward $+z$, and $\alpha$ the twist: the turn of rung $k+1$ relative to rung $k$, measured in the sense of rotation. For $k\in\mathbb Z$ and $\nu\in\{+1,-1\}$ the member $(\nu,k)$ follows

$$
\mathbf X_{\nu,k}(t)=\bigl(\nu R\cos(\omega t+k\alpha),\ \nu R\sin(\omega t+k\alpha),\ kd+ut\bigr),
$$

with $\nu=+1$ positive and $\nu=-1$ negative. At $\alpha=\pi$ the positive member of rung $k$ is at $(-1)^kR\,\mathbf e(T)$, which is the untwisted ladder of the subject document. The polarity product of source $(\nu,k)$ with a positive receiver is $\sigma=\nu$, and with a negative receiver $-\nu$. Every member has velocity $\omega\mathbf e_z\times\mathbf X_\perp+u\mathbf e_z$, of constant magnitude $V=\sqrt{v^2+u^2}$, and acceleration $-\omega^2R\,\mathbf e_r$, because $u$ is constant.

## 2. Symmetries and the three conditions (derived)

The per-hit acceleration $\sigma(\mathbf x-\mathbf X(s))/(\tau^3\lvert D\rvert)$ depends only on relative position, relative time, the source velocity and the polarity product, and it rotates as a vector. It is therefore covariant under Euclidean isometries, time shifts and relabelling. Three symmetries of the history follow.

- **Screw.** Rotation by $\alpha$ about the axis with translation by $d$ along it maps rung $k$ onto rung $k+1$ at every time.
- **Time shift.** The shift $T\to T+t_0$ composed with rotation by $\omega t_0$ and translation by $ut_0$ maps the history onto itself.
- **Half turn with polarity exchange.** Rotation by $\pi$ about the axis maps each positive member onto the negative member of the same rung. Exchanging every polarity leaves every product unchanged.

Together these act transitively on pairs (member, time). The acceleration at any member and time is the image, under the rotation part of the symmetry, of the acceleration at the positive member of rung $0$ at $T=0$, and the required acceleration $-\omega^2R\,\mathbf e_r$ transforms in the same way. Balance at that one receiver at that one time is therefore balance everywhere. At the receiver $\mathbf x=(R,0,0)$ the conditions are $a_r=-\omega^2R$, $a_t=0$ along the rotational motion $(0,1,0)$, and $a_z=0$. In lengths and times measured in units of $R$, with $A=R^2a$, they read

$$
A_r(\alpha,\delta,v,u)=-v^2R,\qquad A_t(\alpha,\delta,v,u)=0,\qquad A_z(\alpha,\delta,v,u)=0,
$$

so the radius enters only the radial condition.

## 3. Causal roots and the subwake condition (derived)

Let a receiver at $\mathbf x$ at time $T$ see a source path with $\lvert\dot{\mathbf X}\rvert=V<1$ at all times. Put $f(\tau)=\tau-\lvert\mathbf x-\mathbf X(T-\tau)\rvert$. The distance term changes at rate at most $V$, so $f$ increases with slope at least $1-V>0$. Since $f(0)=-\lvert\mathbf x-\mathbf X(T)\rvert\le0$ and $f\to\infty$, there is exactly one root $\tau\ge0$, and it lies in $[\lvert\mathbf x-\mathbf X(T)\rvert,\ \lvert\mathbf x-\mathbf X(T)\rvert/(1-V)]$. The root is zero only when the source is at the receiver at time $T$, which happens only for the receiver itself; for the receiver $f(0)=0$ and $f>0$ for every $\tau>0$, so it receives nothing from its own past. Every other source has exactly one causal root, and $D=1-\mathbf n\cdot\mathbf V\ge1-V>0$.

The evaluator uses a stronger property. On the helix, $G(\tau)=\tau^2-\lvert\mathbf x-\mathbf X(-\tau)\rvert^2$ has $G''=2-2\nu v^2\cos\phi-2u^2\ge2(1-V^2)>0$, where $\phi$ is the source angle at emission, so $G$ is strictly convex with $G(0)\le0$. Newton's method started at the upper bound above therefore decreases monotonically to the root.

The condition $\omega R<1$ alone does not suffice when $u\ne0$. For the receiver's own path, $\lvert\mathbf X(0)-\mathbf X(-\tau)\rvert^2=2R^2(1-\cos\omega\tau)+u^2\tau^2=V^2\tau^2+O(\tau^4)$. If $V>1$ the self distance exceeds $\tau$ at small $\tau$, and if $\lvert u\rvert<1$ it falls below $\tau$ at large $\tau$, so a positive-delay self root exists. With $v=0.8$ and $u=0.7$ ($V=1.063$) the first self root is at $\tau=2.039R$ (measured, control C3). Every result in this note has $V\le0.844$.

## 4. Handedness (derived)

Reflection $z\to-z$, followed by relabelling $k\to-k$, maps the parameters $(\omega,\alpha,u)$ to $(\omega,-\alpha,-u)$. Reflection in a plane containing the axis maps them to $(-\omega,-\alpha,u)$. The proper half turn about the $x$ axis maps them to $(-\omega,\alpha,-u)$; composing it with the second reflection gives the first again. Every improper isometry therefore relates $(\alpha,u)$ to $(2\pi-\alpha,-u)$ at the same $\delta$, $v$ and $R$, and a balance at one is a balance at the other. A reflection maps the structure to itself only when $\alpha\equiv-\alpha\pmod{2\pi}$ and $u=0$, that is, for $\alpha\in\{0,\pi\}$; for every other twist no reflection survives. The proper rotations also give the identification $(v,\alpha,u)\sim(-v,2\pi-\alpha,u)$ of solution sets, which is used in Section 9.

At $\alpha=\pi$ the reflection $z\to-z$ survives for every $u$ and maps the configuration with speed $u$ to the one with $-u$, so $A_z$ is odd in $u$ there and vanishes at $u=0$. Because $\partial A_z/\partial u=Z_u\ne0$ on the ladder branch (Section 5), the axial condition forces $u=0$ at $\alpha=\pi$ near that branch. With the convention above the recorded branch has $u<0$ for $\alpha<\pi$; its mirror, at $2\pi-\alpha$, has $u>0$. A convention measuring $\alpha$ against the rotation, or $u$ toward $-z$, flips the sign.

## 5. First order: a symmetric two-by-two system (derived)

For a source with present separation $\mathbf r_0=\mathbf x-\mathbf X(T)$, unit vector $\mathbf n_0$ and velocity $\mathbf V$, the delayed position is $\mathbf X(T)-\mathbf V\tau+O(\tau^2\lvert\mathbf A\rvert)$, $\tau=r_0(1+\mathbf n_0\cdot\mathbf V)+O(V^2)$ and $D=1-\mathbf n_0\cdot\mathbf V+O(V^2)$, so

$$
\mathbf a=\frac{\sigma}{r_0^2}\bigl[\mathbf n_0+\mathbf V-2(\mathbf n_0\cdot\mathbf V)\,\mathbf n_0\bigr]+O(V^2).
$$

For the unit twisted ladder, source $(\nu,k)$ has $\mathbf r_0=(1-\nu\cos k\alpha,\,-\nu\sin k\alpha,\,-k\delta)$, $r^2=2(1-\nu\cos k\alpha)+k^2\delta^2$, $\sigma\mathbf V=v(-\sin k\alpha,\cos k\alpha,0)+\nu u\,\mathbf e_z$ and $\mathbf r_0\cdot\mathbf V=-\nu v\sin k\alpha-k\delta u$. The radial velocity terms are odd in $k$ and cancel. With $\sum'$ the sum over all $(\nu,k)\ne(+1,0)$,

$$
A_t=vT_v+uT_u,\qquad A_z=vT_u+uZ_u,\qquad A_r=-S+O(V^2),
$$

$$
T_v=\sum{}'\Bigl[\frac{\cos k\alpha}{r^2}-\frac{2\nu\sin^2k\alpha}{r^4}\Bigr],\quad T_u=-2\delta\sum{}'\frac{k\sin k\alpha}{r^4},\quad Z_u=\sum{}'\frac{\nu\,(r^2-2k^2\delta^2)}{r^4},\quad S=-\sum{}'\frac{\nu(1-\nu\cos k\alpha)}{r^3}.
$$

The coefficient of $v$ in $A_z$ equals the coefficient of $u$ in $A_t$: the axial drive of rotation and the spin-up by translation are the same sum. At $\alpha=\pi$, $T_v$ is the ladder bracket $\pi/(2\delta\sinh(2\pi/\delta))-\pi^2/(6\delta^2)$, $T_u=0$ and $Z_u$ is the ladder's braking coefficient. The static tangential and axial sums are odd in $k$, so every twist is a relative equilibrium of the zero-delay comparison, as the subject document states.

A balance with $(v,u)\ne0$ at large $R$ needs $\det M=T_vZ_u-T_u^2=0$ for $M=\begin{pmatrix}T_v&T_u\\T_u&Z_u\end{pmatrix}$, and then $u/v=-T_u/Z_u$ and $v^2R\to S$. Spacing and $u/v$ are functions of the twist alone in this limit, which is why the ratio barely changes between $R=100$ and $R=10^3$; the radius enters at relative order $v^2\approx S/R$.

The sums reproduce the recorded first-order numbers: zero-push spacings ($T_v=0$) $3.27560$, $2.67319$ and $1.67264$ at $\alpha/\pi=0.9$, $0.7$ and $0.5$, axial drives $T_u=-0.0425$, $-0.1799$ and $-0.5366$ in units $Kv/R^2$ at those spacings, and braking $Z_u=-0.14230$ at $\alpha=\pi$, $\delta=3.34528$. Grade: measured (first-order sums in `first_order.py`, truncated at $\lvert k\rvert\le10^5$).

**Two first-order curves and their meeting point.** The zero set of $\det M$ near the ladder has two curves. The outer one starts at the ladder ($\delta=3.34528$, $u/v=0$, where $T_v=0$). The inner one starts at $\delta=2.50831$, where $Z_u(\delta,\pi)=0$, and there $u/v\to\pm\infty$. The two approach each other as the twist falls:

| $\alpha/\pi$ | outer $\delta$ | outer $u/v$ | inner $\delta$ | inner $u/v$ |
| --- | --- | --- | --- | --- |
| $1.00$ | $3.345280$ | $0$ | $2.508314$ | $\pm\infty$ |
| $0.98$ | $3.338861$ | $-0.0580$ | $2.513126$ | $-9.217$ |
| $0.94$ | $3.284383$ | $-0.1858$ | $2.554803$ | $-2.883$ |
| $0.90$ | $3.148015$ | $-0.3727$ | $2.665844$ | $-1.442$ |
| $0.88$ | $2.978865$ | $-0.6002$ | $2.817780$ | $-0.898$ |
| $0.87$ | none | | none | |

They meet at $\alpha_f(\infty)/\pi=0.8777201$, $\delta=2.89725$, $u/v=-0.73423$, where $\alpha(\delta)$ along the zero set has a minimum with second derivative $0.6963\pi$. Grade: measured (sums and a quartic fit of $\alpha(\delta)$ on nine points). No zero of $\det M$ was found for $\delta\in[0.3,6]$ at $\alpha/\pi\in\{0.87,0.86,0.85,0.84,0.82,0.80,0.75,0.70,0.60\}$ on a grid of step $0.05$ in $\delta$; that grid misses the narrow structure near $\alpha=0.6\pi$ reported in Section 10.

## 6. An exact identity for non-rotating translation (derived)

Let $v=0$, so every member moves with the same velocity $u\mathbf e_z$, $\lvert u\rvert<1$. Write a source's present separation as transverse distance $b$ and axial offset $z$, put $\gamma=(1-u^2)^{-1/2}$, $\zeta=\gamma z$ and $\rho'=\sqrt{\zeta^2+b^2}$. The causal delay of a uniformly moving source is $\tau=\gamma(\gamma uz+\rho')$, and $\tau D=\rho'/\gamma$, so the axial component of the row is

$$
a_z=\sigma\,\frac{\zeta+u\rho'}{(u\zeta+\rho')^2\rho'} .
$$

Sources at rungs $k$ and $-k$ have the same $b$ for every twist, because $\cos k\alpha$ is even, and opposite $z$. Adding the two rows and using $\rho'^2-u^2\zeta^2=b^2+z^2$ gives

$$
a_z(z)+a_z(-z)=2\sigma u\,\frac{b^2-z^2}{(b^2+z^2)^2},
$$

the $u$-dependence of the stretched variables cancelling exactly. Summed over all sources, $A_z=u\,Z_u(\delta,\alpha)$ for every $\lvert u\rvert<1$ and every twist when $v=0$: the first-order axial coefficient is exact for a non-rotating translating ladder. At $\alpha=\pi$ the reflection in the plane through the axis and the receiver also gives $A_t=0$. A non-rotating translating untwisted ladder therefore balances exactly when $Z_u(\delta,\pi)=0$, which fixes $\delta_*=2.5083135$, and the radial acceleration vanishes, $A_r(\delta_*,u)=0$, since with $v=0$ no centripetal acceleration is required. The radial condition is independent of $R$. For $\alpha\ne\pi$ and $u\ne0$ the tangential component does not vanish at $v=0$: translation spins a twisted ladder up, which is the reciprocal of the axial drive in Section 5.

Measured check: the evaluator gives $A_z-uZ_u$ below $4\times10^{-16}$ at $(\alpha/\pi,\delta,u)=(1,2.45,0.5)$, $(0.9,3.0,0.7)$, $(0.6,0.64,-0.3)$ and $(0.75,1.7,0.9)$, and $A_z(\delta_*,u)$ below $3\times10^{-16}$ for $u$ from $0.05$ to $0.95$.

## 7. Evaluator, controls and truncation

`twisted_eval.py` evaluates, in float arithmetic, every causal root of every source with $\lvert k\rvert\le N$ in both polarities, excluding only the receiver. Each row is $\nu\,\mathbf r/(\tau^3\lvert D\rvert)$ from raw three-vectors, and the three components are summed with correctly rounded summation (`math.fsum`). `solve.py` applies Newton's method to the three conditions with a central-difference Jacobian, and pseudo-arclength continuation in $(\alpha/\pi,\delta,v/v_s,u/v_s)$ with $v_s=\sqrt{0.19/R}$. The controls ran first, and their outputs are recorded in `controls_receipt.json`.

- **C1, stationary source.** Delay equals distance and the row equals $\sigma\mathbf r_0/r_0^3$, with relative errors $1.4\times10^{-16}$ and $1.1\times10^{-16}$.
- **C2, uniformly moving source.** The evaluator with $v=0$ was compared with the closed-form delay $\tau=[\mathbf r_0\cdot\mathbf V+\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-V^2)r_0^2}]/(1-V^2)$ and the closed-form row $\sigma(\mathbf r_0+\mathbf V\tau)/(\tau^2\rho)$, $\rho=\sqrt{(\mathbf r_0\cdot\mathbf V)^2+(1-V^2)r_0^2}$, at $u=0.3$, $-0.6$ and $0.95$. The largest relative errors are $2.5\times10^{-15}$ in the delay and $5.7\times10^{-15}$ in the row, both at $u=0.95$.
- **C3, rotating and translating source.** At $v=0.5$, $u=0.4$, the root residual is $2.2\times10^{-16}$ relative and agrees with an independent 200-step bisection to $6.3\times10^{-16}$. The self-distance test is positive at every sampled delay, and the $V>1$ counterexample of Section 3 produces a self root.
- **C4, alternating sums and the ladder bracket.** The summation gives $\sum_{k\ne0}(-1)^k/k^2=-\pi^2/6$ and $\sum_k(-1)^k/(k^2+c^2)=\pi/(c\sinh\pi c)$ to the truncation error $2.5\times10^{-13}$. `first_order.py` gives the closed-form bracket at $\delta=3$ to $5.6\times10^{-12}$. The exact $A_t/v$ approaches the bracket with relative difference $3.2\times10^{-6}$ at $v=10^{-3}$ and $3.2\times10^{-8}$ at $v=10^{-4}$, the expected $v^2$ scaling. $A_z$ is below $3\times10^{-22}$ at $u=0$.
- **C5, first-order rows against exact rows at $\alpha=0.9\pi$.** At $\delta=3.2$ and $u=-0.4v$, the radial difference scales as $v^2$ ($1.8\times10^{-7}$ to $1.8\times10^{-9}$), the tangential difference as $v^3$, and the axial difference is at rounding level. This confirms the symmetric form $A_z=vT_u+uZ_u$.
- **C6, untwisted ladder at $R=10^3$.** At $\alpha=\pi$, $u=0$: $\delta=3.345035292740$ and $v=0.0138408142807$, against the targets $3.345035293$ and $0.01384081428$. The residuals are below $3\times10^{-17}$, and $A_z=-4\times10^{-19}$. With $u$ left free, Newton returns $u=1.6\times10^{-16}$.

**Truncation.** Each rung contributes $f(\psi)-f(\psi+\pi)$, where $f$ is the contribution of a positive source at emission angle $\psi$. Its mean over $\psi$ is zero, so the rung contributions are pure odd harmonics of $\psi_k=k\alpha-\omega\tau_k$. Their amplitudes are $O(v/k^2)$ in the velocity terms and $O(1/k^3)$ in the static and axial terms. Abel summation then gives the asymptotic tail size $\lvert A_t^{\mathrm{tail}}(N)\rvert\approx4v/(\delta^2N^2\lvert\sin(\beta/2)\rvert)$ with $\beta\approx\alpha\mp v\delta$; this is an asymptotic size, not a bound, since the phase is not exactly linear in $k$. At $N=4000$ it is about $3\times10^{-10}$ near $\alpha=0.9\pi$. The cancellation between $k$ and $-k$ makes the measured change smaller: from $N=4000$ to $32000$ the solved $\delta$ moves by at most $4.3\times10^{-10}$, $v$ by $6\times10^{-13}$ and $u$ by $3\times10^{-12}$, and from $8000$ to $32000$ $\delta$ moves by at most $1.5\times10^{-10}$.

## 8. The branch at $R=10^3$ and the ratio at $R=100$ (measured)

Seeds came from the outer first-order root, with $v=\sqrt{S/R}$ and $u=(u/v)_{\text{first order}}\,v$. Values are at $N=32000$, and every residual in units $K/R^2$ is below $1.2\times10^{-16}$.

| $\alpha/\pi$ | $d/R$ | $\omega R$ | $u$ | $u/(\omega R)$ | $\lvert\Delta\delta\rvert$, $N=4000\to32000$ |
| --- | --- | --- | --- | --- | --- |
| $1.00$ | $3.345035293$ | $0.013840814$ | $0$ | $0$ | $6.5\times10^{-11}$ |
| $0.98$ | $3.338614946$ | $0.013835425$ | $-0.000802935$ | $-0.05803$ | $2.5\times10^{-10}$ |
| $0.96$ | $3.318871787$ | $0.013818500$ | $-0.001641529$ | $-0.11879$ | $4.3\times10^{-10}$ |
| $0.94$ | $3.284126093$ | $0.013787363$ | $-0.002562539$ | $-0.18586$ | $3.9\times10^{-10}$ |
| $0.92$ | $3.230471557$ | $0.013735651$ | $-0.003646515$ | $-0.26548$ | $4.2\times10^{-10}$ |
| $0.90$ | $3.147703014$ | $0.013646175$ | $-0.005089045$ | $-0.37293$ | $3.1\times10^{-10}$ |
| $0.89$ | $3.085441963$ | $0.013569979$ | $-0.006140486$ | $-0.45251$ | $2.9\times10^{-10}$ |
| $0.88$ | $2.978205936$ | $0.013417312$ | $-0.008064325$ | $-0.60104$ | $7.1\times10^{-11}$ |

Every printed digit of the recorded table agrees, with the recorded sign of $u$ under the convention of Section 1. The total member speed is below $0.016$. At $R=100$, $\alpha=0.9\pi$: $\delta=3.144883955$, $\omega R=0.043176059$, $u=-0.016181188$, ratio $-0.37477$; at $\alpha=\pi$ the spacing is $3.342823366$, matching the subject's untwisted table. The Jacobian determinant in $(\delta,v,u)$ falls from $7.1\times10^{-3}$ at $\alpha=\pi$ to $1.75\times10^{-3}$ at $0.88\pi$, the approach to the fold.

## 9. Below $0.88\pi$: a fold, and a return to a translating ladder (measured; inferred where stated)

**Continuation.** Pseudo-arclength continuation at $R=10^3$, $N=4000$, started at $\alpha=0.90\pi$ toward smaller twist, monitored the determinant of the three-by-three Jacobian in the unknowns and the sign of $d\alpha/ds$. Both change sign at one step, between $\alpha/\pi=0.877820$ ($\delta=2.9113$) and $0.877751$ ($\delta=2.8956$); the following steps have increasing $\alpha$. Along all 410 accepted steps the residual stayed below $3\times10^{-16}$.

**Fold location.** Using $\delta$ as the parameter and solving for $(\alpha,v,u)$ on nine spacings in $2.8956\pm0.03$, a quartic fit of $\alpha(\delta)$ gives the minimum

| $N$ | $\alpha_f/\pi$ | $d/R$ | $\omega R$ | $u$ | $d^2(\alpha/\pi)/d\delta^2$ |
| --- | --- | --- | --- | --- | --- |
| $4000$ | $0.8777498847$ | $2.89713894$ | $0.0132801814$ | $-0.0097517114$ | $0.6965$ |
| $16000$ | $0.8777498847$ | $2.89713895$ | $0.0132801814$ | $-0.0097517112$ | $0.6965$ |
| $32000$ | $0.8777498847$ | $2.89713895$ | $0.0132801814$ | $-0.0097517112$ | $0.6965$ |

At $R=100$ the fold is at $\alpha_f/\pi=0.8780191$, $d/R=2.89616$, ratio $-0.73496$. Relative to the first-order value $0.8777201$, the shift is $3.0\times10^{-5}$ at $R=10^3$ and $3.0\times10^{-4}$ at $R=100$, proportional to $1/R$, that is, to $v^2$.

**Classification.** All the alternatives the assignment names were checked. The spacing does not collapse ($\delta\approx2.9$; no two members are closer than the rung partners, $2R$ apart). The speed does not approach wake speed ($V=0.0165$). Every source keeps one causal root (Section 3 with $V<1$). The sums converge, and the fold location is unchanged to ten digits from $N=4000$ to $32000$. The determinant changes sign together with $d\alpha/ds$, and $\alpha(\delta)$ has a nonzero second derivative. This is a quadratic fold (saddle-node in the twist). The turning point is measured. That no balance continuous with this branch exists for $\alpha<\alpha_f$ near the fold follows from the quadratic normal form, so it is inferred; a certified fold would make it derived. Nothing here excludes other balances, on other branches, below $\alpha_f$.

**The returning branch.** Past the fold the branch runs back toward $\alpha=\pi$ at smaller spacing, approaching the inner first-order curve. Values at $N=32000$, residuals below $1.4\times10^{-16}$, changes from $N=4000$ at most $3\times10^{-10}$:

| $\alpha/\pi$ | $d/R$ | $\omega R$ | $u$ | $V$ |
| --- | --- | --- | --- | --- |
| $0.90$ | $2.6659102$ | $0.0127415$ | $-0.0183661$ | $0.022$ |
| $0.95$ | $2.5397863$ | $0.0122970$ | $-0.0435292$ | $0.045$ |
| $0.99$ | $2.5095096$ | $0.0118555$ | $-0.2197086$ | $0.220$ |
| $0.998$ | $2.5083613$ | $0.0075263$ | $-0.6986248$ | $0.699$ |

The continuation followed the returning branch to $\alpha=\pi$. There $v$ passes through zero (between $\alpha/\pi=0.99936$, $v=0.00285$ and $1.00019$, $v=-0.00088$), at $\delta=2.508314$ and $\lvert u\rvert\approx0.8434$, which is the largest member speed on the branch. Under the identification $(v,\alpha,u)\sim(-v,2\pi-\alpha,u)$ of Section 4, the part with $\alpha>\pi$ and $v<0$ is the same physical family traversed backwards: continued at $\alpha=1.00457\pi$ with $u=-0.437$, it is the mirror image of the point at $0.99543\pi$. The determinant keeps one sign along the returning branch, so no further bifurcation was detected.

**The endpoint.** The point at $\alpha=\pi$, $v=0$ was solved directly from $A_r=0$, $A_z=0$ ($A_t=0$ by symmetry). It gives $\delta_*=2.5083135333$, $u_*=-0.8433854761$, the same at $N=8000$ and $32000$, with a nonsingular two-by-two Jacobian (determinant $0.113$). The mirror point $u=+0.8434$ also balances. The spacing equals the root of $Z_u(\delta,\pi)=0$, as the identity of Section 6 requires. At $u=0$ this spacing has inward acceleration $0.148$; uniform axial motion at $0.843$ cancels it. Because the radial condition at $v=0$ does not involve $R$, the returning branch at every radius ends at this same point, an untwisted, non-rotating ladder translating rigidly at $0.843c_f$. That every radius's branch reaches it is inferred from the $R=10^3$ continuation and the $R$-independence of the endpoint; only $R=10^3$ was continued that far.

**Summary of the branch.** At fixed $R$ the ladder ($\alpha=\pi$, $u=0$) and the translating ladder ($\alpha=\pi$, $v=0$, $u=\mp0.843$) are joined by one curve of rotating and translating twisted balances. The curve runs from the ladder down in twist to the fold at $\alpha_f\approx0.8777\pi$ and back up to $\alpha=\pi$, with the axial speed growing and the rotation stopping. The mirror curve, for $\alpha>\pi$, has the opposite sign of $u$.

## 10. The solutions at $\alpha=0.6\pi$ (measured)

At $R=10^3$, $\alpha=0.6\pi$, Newton's method from the two first-order roots converges in four iterations at $N=8000$ and at $N=32000$ (changes below $8\times10^{-11}$), with residuals below $5\times10^{-16}$:

| $d/R$ | $\omega R$ | $u$ | $u/(\omega R)$ | $V$ | Jacobian determinant |
| --- | --- | --- | --- | --- | --- |
| $0.6400298825$ | $0.0167840203$ | $+0.0439735074$ | $2.61996$ | $0.0471$ | $+0.104$ |
| $0.6264195296$ | $0.0170642846$ | $-0.1304914410$ | $-7.64705$ | $0.1316$ | $-0.114$ |

The first is the recorded "separate solution" ($d/R\approx0.640$, $u\approx2.6\,\omega R$), and its member speed $0.047$ is far below wake speed. Its axial speed is positive in this convention, opposite to the main branch. At first order, $\det M$ is positive only in a narrow window: its maximum over $\delta$ is $1.8\times10^{-3}$ at $0.595\pi$ and $6.4\times10^{-4}$ at $0.600\pi$, and it is negative at $0.59\pi$ and $0.605\pi$. The two solutions therefore lie on a small curve, closed at first order, that exists only for twists between about $0.592\pi$ and $0.603\pi$, bounded by two folds. On that curve $u/v$ passes through infinity where $T_u=Z_u=0$. Grade: inferred, from a scan of step $0.005\pi$ in twist and $0.0025$ in spacing; the curve was not continued exactly.

## Limits

- All exact values are float measurements without enclosures. The agreement with the recorded table is between two separately written evaluators and is not a certificate.
- The tail estimate is asymptotic, not a bound. Truncation sensitivity was measured from $N=4000$ to $32000$.
- Only rigid rotation with uniform axial translation and equal rails was considered. No stability statement and nothing about finite segments is made.
- Continuation was done only at $R=10^3$. The fold was located at $R=10^3$ and $R=100$, and at first order.

## Falsifiers

- **Branch table.** A higher-precision or interval evaluation in which the tangential or axial acceleration at a tabulated $(\alpha,\delta,\omega R,u)$ of Section 8 exceeds about $10^{-12}K/R^2$ would refute it.
- **Fold.** A balance at $R=10^3$ continuous with the ladder branch at $\alpha<0.87774\pi$ would refute the fold. So would a sign-definite Jacobian determinant across $\delta\in[2.89,2.905]$, or $\alpha(\delta)$ not having a minimum there.
- **Identity of Section 6.** Any non-rotating ladder with $\lvert u\rvert<1$ whose axial acceleration differs from $uZ_u(\delta,\alpha)$ would refute it; the check is to evaluate $A_z$ with $v=0$ and compare.
- **Endpoint.** A nonzero $A_r$ at $\alpha=\pi$, $v=0$, $\delta=2.5083135333$, $u=\pm0.8433854761$ would refute it, as would a continuation of the returning branch at $R=10^3$ that does not reach $v=0$ at $\alpha=\pi$.
- **$\alpha=0.6\pi$.** Nonzero residuals at the two tabulated points, or $V\ge1$ there, would refute them.

## Reproduction

Instruments and receipts are in [evidence/rotating-ladder-claude-2026-10-20/twisted-geometry/](../evidence/rotating-ladder-claude-2026-10-20/twisted-geometry/). With `P="${AAA_VENV:-../.venv}/bin/python"`, run from that directory:

- `$P controls.py`, about 35 s;
- `$P branch_table.py 1000 1.0,0.98,0.96,0.94,0.92,0.90,0.89,0.88`, about 80 s, and `$P branch_table.py 100 1.0,0.96,0.92,0.90`, about 43 s;
- `$P continue_branch.py 1000 4000 0.90 3.1477 0.013646 -0.005089 -1 40 0.005 0.03 <out.jsonl>`, about 86 s, followed by the two returning legs recorded in `continuation_receipt.json`, about 344 s and 370 s, run under the owned compute supervisor;
- `$P fold_locate.py 1000 <N> 2.8956 0.03 9 0.87775 0.013277 -0.009786`, about 20, 90 and 127 s for $N=4000$, $16000$ and $32000$;
- `$P special_points.py`, about 55 s;
- `$P returning_check.py`, about 45 s.

Full continuation logs are under `.local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/twisted-geometry/`.

## Independent review disposition and corrections

Codex reviewed this note as frozen (SHA-256 `9033aaf0022dc847ff2de3659aa6330b81c115eb86a968961f8ef4c2ff103315`, frozen 2026-10-20T22:33:10Z) in the [shared review record](../../../../op/agent-chats/2026-10-20-rotating-ladder-six-hour/chat.md), entry 2026-10-20T22:54:29Z, using its own raw three-vector evaluator frozen before any Claude result. It accepts the exact axial identity of Section 6 and the closed form $Z_u(\delta,\pi)=(\pi^2/\delta^2)[1/6-\cosh y/\sinh^2y]$, $y=2\pi/\delta$, with its unique zero $\delta_*=2\pi/\operatorname{arccosh}(3+\sqrt{10})$, as derived; it accepts the translating balance and the quadratic fold as numerical findings, confirming the translating speed independently ($\lvert u\rvert=0.84338547606729845545\ldots$ by a 55-digit sum of an independently derived radial expression; radial residual $-6.2\times10^{-15}$ at 32768 rungs in its raw evaluator) and the fold ($\alpha_f/\pi\approx0.877749884713$, singular values $26.55$, $0.1186$, $7.9\times10^{-12}$, a single rank loss). The PI records the following corrections here; the body above is left as frozen and these statements supersede it where they differ.

1. **Delay bounds (Section 3).** The generic delay interval is $r_0/(1+V)\le\tau\le r_0/(1-V)$, not $r_0\le\tau$; even the rung partner has delay below its present separation. The convex-Newton argument, which uses only the upper start, is unaffected.
2. **Reflections and the returning branch (Sections 4 and 9).** The map $(v,\alpha,u)\mapsto(-v,2\pi-\alpha,u)$ comes from reflection in a plane containing the axis, not from a proper rotation; the proper half turn about the receiver's radial axis gives $(-v,\alpha,-u)$. The identification of the continuation beyond $v=0$ with the same family holds in the quotient by reflections, and continuing through $v=0$ uses a signed angular rate, extending Section 1's convention $\omega>0$. Reflection $z\to-z$ at $\alpha=\pi$ relates the histories with $u$ and $-u$ and is a symmetry of a single translating history only at $u=0$; "every improper isometry" should read as the specific reflections and their parameter actions stated here.
3. **The translating balance (Section 6).** $Z_u=0$ fixes the spacing and is necessary for a balance with $u\ne0$; the radial condition must still be solved for $u$, which the PI's [translating-ladder certificate](rotating-ladder-claude-2026-10-20-translating-ladder-certificate.md) does with interval arithmetic. "Translation spins a twisted ladder up" holds generically, not for every $\alpha\ne\pi$ ($\alpha=0$ is another symmetric exception).
4. **Every radius.** That the returning branch at every radius ends at the translating ladder is an open continuation conjecture, supported by the continuations at $R=1000$ and (in the successor note) $R=100$; the radius independence of the endpoint alone does not establish the connection.
5. **Fold precision.** Truncation stability does not bound the polynomial-fit error in the fold's spacing: the width-$0.03$ quartic fit and Codex's narrower fit differ by about $1.3\times10^{-7}$ in $\delta$ (twist minima by $4\times10^{-13}$). The resolved fold coordinates are $\alpha_f/\pi=0.8777498847$, $d/R=2.897139$, $\omega R=0.01328018$, $u=-0.00975171$; further digits in the fit receipts are not resolved. A certified fold would need rank two of the Jacobian, a nonzero left-null projection of $F_\alpha$ and a nonzero quadratic coefficient, with controlled tails.
