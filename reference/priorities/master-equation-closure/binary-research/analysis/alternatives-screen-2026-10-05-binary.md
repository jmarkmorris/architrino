# Selected binary alternatives: analytical investigation of 2026-10-05

## Scope and status

This is the binary subject record for the explicitly selected comparison laws in the [2026-10-05 brief](../../brainstorming.md#codex-collinear-and-binary-alternatives-for-2026-10-05). The baseline remains canonical. Every numerical instantiation uses $c_f=1$. Two persistent opposite-polarity labels have equal coupling, including their self channels. This record does not investigate the separate Maxwell successor, Weber or Darwin. New subject files have the prefix `alternatives-screen-2026-10-05-`; existing sources and references remain unchanged.

The first analytical checkpoint was frozen before any new target instrument was used. The first-screen disposition is now recorded below; subsequent independent reviews must name the exact bounded result they assess. A failed circle balance is not a fate theorem; the finite-width continuation theorem supplies a mathematical outgoing future but no binding, capture or physical account. Full Cartesian perturbations are evaluated only at a residual-zero solution.

### Frozen first-screen disposition

Markers denote ✓ Completed bounded finding, ◐ Partial or awaiting independent assessment, and ○ Not completed. The coordinator owns the independent references and shared integration.

| Status | Finding and exact boundary |
| --- | --- |
| ✓ Completed | Subfield radial-power, linear and amplitude-gradient antipodal circles are excluded; fixed uniform memory also excludes circles through equality. The coordinator independently reconstructed the subfield formulas and memory obstruction. |
| ✓ Completed | The finite-width law has finite complete-past input and a unique global future for every fixed positive width/core, with exact nonzero affine self response. The coordinator supplied a separate analytical reconstruction and different conservative bounds. |
| ✓ Completed | A $p=3/2$ superfield circle exists in the independently enclosed speed interval $[3.69148037,3.69148040]$, with the complete one-self/three-partner census. A full Cartesian formal positive characteristic rate exists with $0.24<\lambda/\omega<0.26$; no nonlinear fate or incoming-release connection follows. |
| ✓ Completed | Equal past/future weighting admits the exact circle family. At $b=1/2$, independently enclosed finite planar Fourier blocks, the analytic Fourier tail and the transverse proof give exactly the six Euclidean symmetry directions in the full fixed-period Cartesian kernel. Formal growing all-time exponentials belong to a different boundary space. |
| ◐ Awaiting independent final assessment | The distant outgoing nonmirror preparations in Sections 10–11 have derived global scattering proofs for $p=3/2$ and amplitude gradient, with positive terminal relative speed. Large initial separation and imposed outward motion are essential; these are not near-circular fate claims. |
| ◐ Awaiting independent assessment | Section 14 excludes all positive radial-magnitude circles before the first partner fold; Section 15 excludes finite-width circles for $0<b\le\pi/2$ without a small-width assumption. |
| ○ Deferred auxiliary case | Section 16 preserves an unassessed co-moving finite-width event derivation prepared before the first-screen closeout instruction. It is not an admitted target or a requested duplicate run; the separate collinear worker owns the already checked approaching-pair events. |
| ○ Not completed | Nonlinear fate near the exact superfield circle, nonlinear periodic-boundary isolation, broader linear superfield circle classification, arbitrary-history amplitude-gradient fate and noncircular memory fate remain open. |

Subject sources are this file and the two new instruments [circle](../evidence/alternatives-screen-2026-10-05-circle.py) and [Cartesian variation](../evidence/alternatives-screen-2026-10-05-cartesian.py). Their named known cases passed before targets. No long job or detached process was launched; the only yielded foreground spectral process completed with exit code zero. Independent evidence is linked at its point of use. Original manuscripts, registries, priorities, ledgers, worklogs and previously existing references were not edited by this worker.

## 1. Complete circle geometry and radial powers

Write the complete all-time antipodal paths as $\mathbf X_\pm(T)=\pm R(\cos\omega T,\sin\omega T,0)$, with $R>0$, $\omega>0$, and $b=R\omega$. At reception zero use radial and tangential axes $(\mathbf e_r,\mathbf e_\theta)$. Let $x=\omega(T-S)/2>0$ denote half the delayed angle. Every possible ordinary root lies in $0<x\le b$, because each chord has length at most $2R$. The complete root equations are

$$
\mathcal S_b=\{x>0:x=b|\sin x|\},\qquad
\mathcal P_b=\{x>0:x=b|\cos x|\}.
$$

The endpoint $x=0$ is excluded. Repeated roots with zero transmitter denominator lie outside the ordinary law. For the self and partner channels, respectively, the normalized directions and denominators are

$$
\begin{aligned}
\mathbf n_s&=(|\sin x|,\operatorname{sgn}(\sin x)\cos x,0),&D_s&=1-b\operatorname{sgn}(\sin x)\cos x,\\
\mathbf n_p&=(|\cos x|,-\operatorname{sgn}(\cos x)\sin x,0),&D_p&=1+b\operatorname{sgn}(\cos x)\sin x.
\end{aligned}
$$

These follow directly by subtracting the emission position from $(R,0,0)$ and taking its dot product with the source velocity. The root set is finite away from folds: split $[0,b]$ at the zeros and stationary points of $x-b|\sin x|$ and $x-b|\cos x|$; each resulting interval is monotone and contains at most one root. This is a complete scalar enumeration prescription, not a numerical root census performed here.

For the selected radial-power law with $K=R_*=1$, define

$$
\begin{aligned}
C_r(p,b)&=2^{-p}\left[\sum_{\mathcal S_b}\frac{|\sin x|^{1-p}}{|D_s|}-\sum_{\mathcal P_b}\frac{|\cos x|^{1-p}}{|D_p|}\right],\\
C_t(p,b)&=2^{-p}\left[\sum_{\mathcal S_b}\frac{\operatorname{sgn}(\sin x)\cos x}{|\sin x|^p|D_s|}+\sum_{\mathcal P_b}\frac{\operatorname{sgn}(\cos x)\sin x}{|\cos x|^p|D_p|}\right].
\end{aligned}
$$

**Derived circle criterion.** A regular antipodal circle is an exact all-time solution precisely when

$$
C_t(p,b)=0,\qquad C_r(p,b)<0,\qquad b^2R^{p-1}=-C_r(p,b).
$$

For $p\ne1$ this selects $R=[-C_r/b^2]^{1/(p-1)}$; for $p=1$ it requires $b^2=-C_r$ and leaves $R$ free. The different scaling in the logarithmic case must not be lost. Rotation covariance then proves the equation at every time. This criterion includes all positive-delay self and partner roots, but does not claim a superfield root has been found.

For $0<b\le1$ there is no positive-delay self root because $|\sin x|<x$. There is exactly one partner root $x=b\cos x$, with $0<x<\pi/2$ and $D=1+b\sin x>0$. Its acceleration is

$$
\mathbf A=-\frac{(\cos x,-\sin x,0)}{(2R\cos x)^pD}.
$$

The tangential component is strictly positive. **Derived exclusion:** no selected positive-$p$ radial law, including $p=1,3/2,2$, admits an antipodal uniform circle at $0<b\le1$ without an additional response. Equality is included by the chord proof, not by a speed clamp. The result says nothing about noncircular fate or superfield circles. A regular counterexample with all roots and zero tangential residual would falsify it.

## 2. Vector linear law and frozen controls

The newly selected vector extension is

$$
\mathbf X_i''=k\sum_{j,S}\sigma_{ij}\frac{\mathbf X_i(T)-\mathbf X_j(S)}{|1-\mathbf n\cdot\mathbf V_j(S)|},\qquad k=0.2862286103053385.
$$

The instantaneous control has relative coordinate $\mathbf q=\mathbf X_+-\mathbf X_-$ and centre $\mathbf c=(\mathbf X_++\mathbf X_-)/2$. Direct subtraction and addition give

$$
\mathbf q''=-2k\mathbf q,\qquad \mathbf c''=0,
\qquad \mathbf q(T)=\mathbf q_0\cos(\sqrt{2k}T)+\frac{\mathbf q'_0}{\sqrt{2k}}\sin(\sqrt{2k}T).
$$

This is an exact Cartesian oscillator control in any dimension; the quadratic invariant is mathematical bookkeeping only. For held partner source $\mathbf a_j$, the exact first-interval solution is

$$
\mathbf X_i(T)=\mathbf a_j+(\mathbf X_i(0)-\mathbf a_j)\cos(\sqrt{k}T)+\frac{\mathbf V_i(0)}{\sqrt{k}}\sin(\sqrt{k}T).
$$

Its validity stops when a partner emission samples the nonheld preparation, a self root appears or another domain boundary occurs. A constant complete past permits only zero endpoint velocity if velocity continuity is required; the displayed nonzero-velocity formula is an ODE control and is not by itself a compatible rotating complete preparation.

On a circle the exact criterion is $C_t(-1,b)=0$ and $\omega^2=-kC_r(-1,b)>0$, with $R=b/\omega$. Here $C_r,C_t$ denote the same finite sums above evaluated algebraically at $p=-1$; this notation is only a formula extension, not selection of another positive-power law. At $0<b\le1$ the tangential input is $2kR\cos x\sin x/D>0$, excluding circles. This does not transfer the collinear event-selection theorem to vector dynamics.

## 3. Amplitude-gradient circle screen

The domain remains the original complete separated compatible uniformly subfield regular pair, with locally Lipschitz acceleration. It gives one partner root and no ordinary self root. No superfield extension is used. For the circle above, $0<b<1$, $x=b\cos x$, $D=1+b\sin x$, substitution of the actual delayed source acceleration into the [selected law](../../equation-variants/manuscript.md#6-amplitude-gradient-response-on-the-selected-regular-pair-domain) gives

$$
A_r=-\frac{1+2b\sin x+b^2}{4R^2\cos xD^3},\qquad
A_\theta=\frac{\sin x-b\cos(2x)}{4R^2\cos^2xD^3}.
$$

The sign is exact. Multiplying the tangential numerator by $\cos x$ gives $f(x)=\tfrac12\sin(2x)-x\cos(2x)$; $f(0)=0$ and $f'(x)=2x\sin(2x)>0$ on this root range. **Derived exclusion:** the selected amplitude-gradient law has no nonzero antipodal uniform circle on its domain. The small-$b$ push begins cubically; a missing source-acceleration term would change this result. This screen does not enlarge the previously proved sufficiently-slow mirror separation class.

## 4. Canonical input plus uniform memory

The chosen extra input is $\mathbf H(T)=-\mathbf V(T)+\mathbf X(T)-\mathbf X(T-1)$. This follows by integrating the velocity exactly; it preserves the ordinary canonical self channel. It vanishes on an affine path. On a circle it equals

$$
H_r=R(1-\cos\omega),\qquad H_\theta=R\sin\omega-b.
$$

For $0<b\le1$ put $A=1/(4R^2\cos xD)>0$. Both components of balance require

$$
\frac{b^2}{R}=A-R(1-\cos\omega),\qquad
A\tan x=b-R\sin\omega.
$$

Equivalently,

$$
\tan x=\frac{\omega-\sin\omega}{\omega^2+1-\cos\omega},\qquad
b^3\cos xD=\frac{\omega^3}{4(\omega^2+1-\cos\omega)},\qquad b=\frac{x}{\cos x}.
$$

These are necessary and sufficient within this circle chart. Their solvability is not asserted at this checkpoint. For superfield circles replace the canonical radial/tangential rows by the complete $p=2$ sums before adding the same memory. A negative memory coefficient alone is not a dissipation theorem, and no spectrum is computed about a residual-nonzero circle.

## 5. Equal past/future radial boundary problem

Set $\alpha=1/2$, $K=1$ and require complete all-time periodic paths. On an antipodal circle with $0<b\le1$, future and past sides each have exactly one partner root and no positive-delay self root. Reflection about the reception radial axis changes the tangential sign and preserves radial input and absolute denominator. Hence the two tangential components cancel exactly. **Derived complete solution family:**

$$
x=b\cos x,\qquad
R(b)=\frac{1}{4b^2\cos x(1+b\sin x)},\qquad
\omega(b)=\frac b{R(b)},\qquad 0<b\le1.
$$

These are complete residual-zero periodic boundary solutions of the selected time-symmetric law. No future snippet is prescribed independently. Merely requiring periodicity, without fixing period/radius, is nonunique because this family contains every displayed $b$. This supplies no causal initial-value selection, capture or stability claim. Full Cartesian perturbations must retain both emission-clock variations and all future terms. A temporal exponential solves a formal mixed-time characteristic equation; its interpretation requires the chosen boundary space, and an exponentially growing mode is not automatically an instability of a periodic boundary-value problem.

## 6. Finite-width complete-past theorem

Fix one of the four selected pairs $h\in\{1/16,1/32\}$, $\rho\in\{1/32,1/64\}$. Each is a different equation. Write $\tau=T-S\ge0$, $\mathbf r=\mathbf X_i(T)-\mathbf X_j(T-\tau)$, and

$$
f_\tau(\mathbf r)=\frac{\mathbf r}{(\|\mathbf r\|^2+\rho^2)^{3/2}}\delta_h(\|\mathbf r\|-\tau),\qquad
\delta_h(z)=\frac1h(1-|z|/h)_+.
$$

### 6.1 Complete-past input exists without a speed hypothesis

If $f_\tau\ne0$, then $\|\mathbf r\|\ge(\tau-h)_+$. At every point

$$
\|f_\tau(\mathbf r)\|\le b(\tau):=\frac{1}{h[\rho^2+(\tau-h)_+^2]}.
$$

The bound follows from $r/(r^2+\rho^2)^{3/2}\le1/(r^2+\rho^2)$. It is integrable and gives the per-channel bound

$$
B:=\int_0^\infty b(\tau)\,d\tau=\frac1{\rho^2}+\frac\pi{2h\rho}.
$$

Thus every continuous complete past defines a finite acceleration, irrespective of collisions, speed crossings, repeated sharp roots or the length of its past. For two labels with unit channel couplings, $\|\mathbf A_i\|\le2B$. This is a bound for the finite-width equation and does not define a zero-width limit.

### 6.2 Integrable Lipschitz bound and global continuation

The spatial core vector has Jacobian norm at most $2/(r^2+\rho^2)^{3/2}$. The triangular window is globally Lipschitz with constant $h^{-2}$. Away from its finitely many nondifferentiable surfaces, their product therefore has spatial derivative norm bounded by

$$
\ell(\tau)=\frac{2}{h[\rho^2+(\tau-h)_+^2]^{3/2}}+\frac{1}{h^2[\rho^2+(\tau-h)_+^2]}.
$$

The same global Lipschitz bound follows along straight segments by absolute continuity; zero input outside the reception shell causes no jump at the shell boundary. Its integral is

$$
L:=\int_0^\infty\ell(\tau)\,d\tau=\frac2{\rho^3}+\frac3{h\rho^2}+\frac\pi{2h^2\rho}<\infty.
$$

Supply continuous complete pasts that are $C^1$ near zero, positions and matching initial velocities. For two candidate futures with the same past, put $d(t)=\max_i\sup_{0\le s\le t}\|\mathbf X_i(s)-\widetilde{\mathbf X}_i(s)\|$. Each displacement difference is at most $2d(t)$, so summing two channels gives $\|\mathbf A_i-\widetilde{\mathbf A}_i\|\le4Ld(t)$. The twice-integrated equation is a contraction on a sufficiently short interval satisfying $2Lt^2<1$, with a position ball preserved by the acceleration bound. Dominated convergence using $b(\tau)$ makes the resulting acceleration continuous in $T$; the solution is $C^2$ for positive time.

**Derived theorem, pending independent reconstruction.** The finite-width/core equation has a unique global forward solution for every such complete preparation. It satisfies $\|\mathbf V_i(T)\|\le\|\mathbf V_i(0)\|+2BT$ and $\|\mathbf X_i(T)\|\le\|\mathbf X_i(0)\|+T\|\mathbf V_i(0)\|+BT^2$. These bounds preclude finite-time escape to infinity; the same uniform Lipschitz constants permit repeated extension. Coincidence and unit-speed crossing are ordinary points of this integral equation. If the supplied past acceleration has the correct endpoint value, the joined solution is $C^2$ across zero. This theorem establishes a unique mathematical outgoing history for the fixed law, not boundedness or recurrence.

### 6.3 Nonempty compatible separated preparations

Choose distinct fixed positions $\mathbf a_i$ and a smooth scalar cutoff $\chi$ supported in $[-\delta,0]$, equal to one near zero. Consider complete histories $\phi_i(S)=\mathbf a_i+\tfrac12S^2\chi(S)\mathbf a_i^{(2)}$ for $S\le0$, where the two endpoint-acceleration vectors $\mathbf a_i^{(2)}$ are initially unknown. Let $\Psi$ map these vectors to the finite-width equation's acceleration at zero. The bound above gives $\|\Psi_i\|\le2B$. If $C_\chi\delta^2$ bounds $|S^2\chi(S)|/2$, the Lipschitz estimate gives $\|\Psi(a)-\Psi(\widetilde a)\|\le4LC_\chi\delta^2\|a-\widetilde a\|$. Choose $\delta$ so this constant is below one. Banach iteration on the acceleration ball of radius $2B$ gives exactly compatible endpoint accelerations. Taking $\delta$ still smaller preserves separation and a uniform subfield speed bound because the position change is $O(B\delta^2)$ and the velocity change is $O(B\delta)$. Thus the global theorem has complete smooth, separated, compatible, uniformly subfield preparations; it does not depend on an acceleration-discontinuous held release.

### 6.4 Exact affine self response

For a complete affine self history with velocity $\mathbf u$ and $v=\|\mathbf u\|>0$, $\mathbf r=\tau\mathbf u$. Put $a=|v-1|$. If $a>0$, let $Q=h/a$ and $z=vQ/\rho$. Direct integration gives

$$
\mathbf A_{\rm self}=\frac{\mathbf u}{h}\left[\frac{1}{v^2}\left(\frac1\rho-\frac1{\sqrt{v^2Q^2+\rho^2}}\right)-\frac{a}{hv^3}\left(\operatorname{arsinh}z-\frac{z}{\sqrt{1+z^2}}\right)\right].
$$

The integral form is $\mathbf u h^{-1}\int_0^Q\tau(v^2\tau^2+\rho^2)^{-3/2}(1-\tau/Q)d\tau$, showing that its coefficient is strictly positive. At $v=1$ the support is the whole past and the exact value is $\mathbf u/(h\rho)$. At $v=0$ it is zero; its small-velocity leading term is $\mathbf u h/(6\rho^3)$, obtained from $Q\to h$ and direct integration. Broad reception therefore creates forward affine self input even in the strict subfield regime. Omitting it would change the selected equation.

Setting $\rho=0$ produces a divergent near-diagonal self integral for every nonzero affine velocity, since its integrand is proportional to $\tau^{-2}$ near zero. This excludes that pure-width self-inclusive affine control; it does not contradict the fixed positive-core theorem. The stationary distinct-source response at range $r\ge h$ remains exactly $\sigma\mathbf r/(r^2+\rho^2)^{3/2}$ by normalization of the whole triangular window.

## 7. Evidence boundaries and next derivations

The circle formulas and finite-width theorem were derived before target computation. The independent reference must reconstruct the circle root/direction signs, the advanced Jacobian and the finite-width global spatial Lipschitz bound rather than replay these formulas. Falsifiers are an omitted ordinary root, a wrong radial/tangential component, failure of the pointwise bounds or a failure of the complete-past contraction argument. Finite-width scales are fixed inputs; the proof constants deliberately become unbounded as either scale shrinks, so they prove no uniform sharp limit.

Current work continues on full Cartesian boundary perturbations of the time-symmetric circle, the memory balance obstruction, superfield radial and linear balances, and a controlled nonmirror amplitude-gradient result. No target numerical result or spectrum is asserted in this checkpoint.

## 8. Time-symmetric Cartesian first variation and exact transverse spectrum

This addition follows the frozen circle checkpoint analytically and precedes any target numerical spectrum. It concerns the exact subfield circle in Section 5. Let $\varepsilon=-1$ label a past root and $\varepsilon=+1$ a future root, so $S=T+\varepsilon\tau$. All quantities below are evaluated on the corresponding base root. Set $D_\varepsilon=1+\varepsilon\mathbf n\cdot\mathbf v>0$, $P=I-\mathbf n\mathbf n^{\mathsf T}$, and $\mathbf d=\boldsymbol\eta_i(T)-\boldsymbol\eta_j(S)$ for arbitrary Cartesian path variations. Varying the root equation first gives

$$
\delta S=\frac{\varepsilon\mathbf n\cdot\mathbf d}{D_\varepsilon},\qquad
\delta\mathbf r=B_\varepsilon\mathbf d,\qquad
B_\varepsilon=I-\frac{\varepsilon\mathbf v\mathbf n^{\mathsf T}}{D_\varepsilon}.
$$

The complete variation of one canonical radial row is

$$
\delta\mathbf A_{ij,\varepsilon}=M_\varepsilon\mathbf d+N_\varepsilon\boldsymbol\eta_j'(S),
$$

where $r$ is the source-receiver range and

$$
\begin{aligned}
M_\varepsilon&=\frac{\sigma_{ij}}{r^3D_\varepsilon}\left[(I-3\mathbf n\mathbf n^{\mathsf T})B_\varepsilon-\frac{\varepsilon\mathbf n\mathbf v^{\mathsf T}PB_\varepsilon}{D_\varepsilon}-\frac{r(\mathbf n\cdot\mathbf a)\mathbf n\mathbf n^{\mathsf T}}{D_\varepsilon^2}\right],\\
N_\varepsilon&=-\frac{\sigma_{ij}\varepsilon\mathbf n\mathbf n^{\mathsf T}}{r^2D_\varepsilon^2}.
\end{aligned}
$$

The source acceleration in $M$ comes from shifting the source velocity's emission time. The displayed expression follows by differentiating $\sigma\mathbf n/(r^2D)$ with $\delta\mathbf n=P\delta\mathbf r/r$ and $\delta D=\varepsilon[\mathbf v\cdot P\delta\mathbf r/r+\mathbf n\cdot\boldsymbol\eta_j'+(\mathbf n\cdot\mathbf a)\delta S]$. Thus it includes source, receiver, velocity and root-clock terms; freezing the delay would remove terms. The selected law's variation averages its past and future expressions. This is an explicit full Cartesian linearized operator, not a claim that its entire spectrum has been classified.

For the transverse components $z_i=\boldsymbol\eta_i\cdot\mathbf e_z$, all base vectors lie in the circle plane. Therefore $\delta S=\delta D=0$ and the operator reduces exactly to

$$
z_i''(T)=-c\left[z_i(T)-\frac{z_j(T-\tau)+z_j(T+\tau)}2\right],\qquad
c=\frac1{r^3D}=\frac{\omega^2}{2\cos^2x},\qquad \tau=\frac{2x}{\omega}.
$$

For common displacement $z_+=z_-$ and opposite displacement $z_+=-z_-$, respectively, the formal exponential equations are

$$
\lambda^2+c[1-\cosh(\lambda\tau)]=0,\qquad
\lambda^2+c[1+\cosh(\lambda\tau)]=0.
$$

**Derived formal growth.** For each $0<b<1$ the common-displacement equation has exactly one positive real rate, with its negative partner. Put $y=\lambda\tau/2>0$; the equation is $\sinh y/y=1/b$. The left side increases strictly from one to infinity because $(y\cosh y-\sinh y)'=y\sinh y>0$. This proves existence, uniqueness and simplicity of the positive rate. At $b=1$ there is no positive real rate in this sector. These unbounded all-time exponentials solve the formal variational equation but are not periodic boundary perturbations and are not small for all absolute times. They supply no causal-release instability label.

**Derived periodic transverse kernel.** Fix the base period $2\pi/\omega$ and use periodic Cartesian perturbations. In the common sector, a Fourier frequency $\nu=m\omega$ must obey $(\nu\tau/2)^2=b^2\sin^2(\nu\tau/2)$, impossible for nonzero real $\nu$ and $0<b\le1$. Only constant vertical translation remains. In the opposite sector, $m^2\cos^2x=\cos^2(mx)$. For $|m|\ge2$ the left side exceeds one because $x\le0.739086<\pi/3$; $m=0$ fails, and $m=\pm1$ give the two rigid tilt variations. Thus the fixed-period transverse kernel consists exactly of translation and tilt symmetries. This excludes an additional infinitesimal transverse periodic branch at fixed period within the specified smooth periodic space; a nonlinear branch or planar degeneracy requires its own proof.

The contrast between the real exponential solutions and the periodic kernel is essential: the temporal boundary space changes the admissible perturbations. No numerical root list is used in either proof. A nonzero additional fixed-period transverse Fourier mode, or a violation of the root-shift variation above, falsifies the respective statement.

## 9. Uniform memory does not balance a subfield antipodal circle

The two necessary equations in Section 4 cannot hold simultaneously for any $\omega>0$ and $0<b\le1$. This is an analytic exclusion, with no root sweep. Let $W=\omega^2+1-\cos\omega$ and $t=\tan x=(\omega-\sin\omega)/W$. The elementary inequalities $0<\omega-\sin\omega\le\omega^3/6$ and $W\ge\omega^2$ give $t\le\omega/6$. For $\omega\ge3$, the alternative bound $t\le(\omega+1)/\omega^2\le4/9$ holds. Together they imply $t\le1/2$ for every positive $\omega$ compatible with tangential balance.

Since $x=\arctan t<t$, the left side of the radial equation is

$$
b^3\cos xD=x^3(1+t^2)(1+xt)<t^3(1+t^2)^2\le\frac{25}{16}t^3.
$$

If $0<\omega\le3$, this is at most $25\omega^3/3456\le225\omega/3456<\omega/6$. But $1-\cos\omega\le\omega^2/2$ gives the required right side $\omega^3/(4W)\ge\omega/6$, a contradiction. If $\omega\ge3$, the left side is at most $25/128$, whereas the right side is at least $\omega^3/[4(\omega^2+2)]\ge27/44>25/128$. Thus **no antipodal circle through wake-speed equality balances** under the selected canonical-plus-uniform-memory law. Superfield inventories and noncircular futures are outside this proof. A root-frozen or memory-truncated spectrum would have no solution to refer to on this excluded chart.

## 10. Controlled nonmirror dispersal for the radial power

Circle exclusion is supplemented here by an all-future theorem for a distinct open scattering class, with transverse relative motion and common drift. This is not a near-circular capture theorem. Let $\mathbf q=\mathbf X_+-\mathbf X_-$, $d=\|\mathbf q\|$, and fix the initial separation direction $\mathbf e=\mathbf q(0)/d_0$. Supply complete separated, endpoint-compatible histories with speed at most $v_*<1$. Suppose the initial outward relative projection is $u=\mathbf e\cdot(\mathbf V_+(0)-\mathbf V_-(0))>0$. Put $c=u/2$ and

$$
C_p=\frac{(1+v_*)^p}{1-v_*},\qquad
J_p=\frac{C_p d_0^{1-p}}{c(p-1)},\qquad p>1.
$$

Assume $2J_p<u/2$ and $\max_i\|\mathbf V_i(0)\|+J_p<v_*$. On a proposed continuation with $\mathbf e\cdot\mathbf q(T)\ge d_0+cT$ and speeds below $v_*$, complete-past geometry gives one partner root, no self root, $r\ge d/(1+v_*)$ and $D\ge1-v_*$. Therefore

$$
\|\mathbf A_i(T)\|\le\frac{C_p}{(d_0+cT)^p},\qquad
\int_0^\infty\|\mathbf A_i(T)\|dT\le J_p.
$$

Integrating proves $\mathbf e\cdot(\mathbf V_+-\mathbf V_-)>u-2J_p>u/2$ and preserves the strict individual speed slack. The bootstrap closes by continuity. On every finite interval the separation, speed and root margins remain strict, and the ordinary delayed position/velocity response is locally Lipschitz; repeated short method-of-steps continuation gives a unique global classical future. The integrable acceleration yields velocity limits $\mathbf V_i^\infty$ with $\mathbf e\cdot(\mathbf V_+^\infty-\mathbf V_-^\infty)>u/2$. Consequently $d(T)\to\infty$ at least linearly. These are derived actual-solution statements conditional only on the displayed explicit complete-preparation hypotheses.

The relative direction also converges with finite remaining total angular variation. Indeed the velocity tail is $O(T^{1-p})$. Integrating it shows $\mathbf q(T)=T\mathbf w_\infty+O(T^{2-p})$ for $1<p<2$, $O(\log T)$ error for $p=2$, and $O(1)$ error for $p>2$. Subtracting $T\mathbf w(T)$ yields the same bounds. Hence $\|\mathbf q\times\mathbf w\|/d^2$ is bounded by an integrable $O(T^{-p})$, $O(T^{-2}\log T)$ or $O(T^{-2})$, respectively. The finite initial interval is regular. No endless rotation or recurrence occurs in this scattering class.

### An explicit compatible rotating and asymmetric preparation

Set $u=1/8$, $v_*=1/4$, $d_0=2^{28}$ and $\mathbf q(0)=d_0\mathbf e_x$. Choose

$$
\mathbf V_\pm(0)=\mathbf U\pm\tfrac12\mathbf w_0,\qquad
\mathbf U=(1/64,0,1/128),\qquad \mathbf w_0=(1/8,1/16,0).
$$

The velocities have different magnitudes; their common drift includes an out-of-plane component, and $\mathbf q(0)\times\mathbf w_0\ne0$. Take complete affine tails $\mathbf a_i+S\mathbf V_i(0)$ for $S\le-1$, with $\mathbf a_\pm=\pm d_0\mathbf e_x/2$. Their relative minimum separation over the entire affine line is $d_0/\sqrt5>0$. On $-1\le S\le0$ add $g(S)\mathbf A_i^0$, where

$$
z=S+1,\qquad g(S)=\tfrac12z^3(1-z)^2,
$$

and $g=0$ before $-1$. It satisfies $g=g'=g''=0$ at $-1$, $g=g'=0$, $g''=1$ at zero, and the conservative bounds $|g|\le1/2$, $|g'|\le8$, $|g''|\le25$. Define $\mathbf A_i^0$ by the selected ordinary row at zero using the affine partner tail. Its emission time is below $-1$, since the present separation is enormous compared with the one-unit patch and all speeds are below $1/4$. The patched histories therefore sample exactly the same affine source at their zero-time roots. They are exactly acceleration-compatible, locally $C^{2,1}$ and uniformly subfield; patch sizes are bounded by $C_p/d_0^p$, while the affine separation floor is $d_0/\sqrt5$.

For $p=3/2$, $C_p<2$ and $J_p=32C_p/\sqrt{d_0}<1/256$, so both strict admission inequalities hold with wide margin. The same complete-preparation construction at $p=2$ satisfies still stronger bounds, with $C_2<3$ and $J_2<48/d_0$. Each law uses its own exact compatible acceleration patch; the affine tails, endpoint positions and velocities and dimensional matching convention agree. The $p=1$ control retains the circle exclusion but fails the integrable-tail estimate: its corresponding majorant has a divergent logarithmic integral. That failure is an obstruction to this proof, not proof of nondispersal under $p=1$.

## 11. Amplitude-gradient scattering with asymmetry and transverse motion

The following theorem enlarges the complete preparation class in a direction different from the existing sufficiently-slow mirror near-circle theorem. It admits common drift and nonzero transverse relative velocity and proves scattering for an explicitly controlled distant outgoing pair. It does not assert robustness of every old near-circle preparation, and it assumes no practical speed threshold from that theorem.

Use $d_0=D_0=2^{20}$ and the same $\mathbf U,\mathbf w_0$ and affine-plus-polynomial preparation in Section 10. Define each patch acceleration $\mathbf A_i^0$ by the exact amplitude-gradient affine-source formula

$$
\mathbf A_i^0=-\frac{(1-\|\mathbf v_j\|^2)\mathbf q_i+(\mathbf q_i\cdot\mathbf v_j)\mathbf v_j}{[(1-\|\mathbf v_j\|^2)\|\mathbf q_i\|^2+(\mathbf q_i\cdot\mathbf v_j)^2]^{3/2}},\qquad \mathbf q_i=\mathbf a_i-\mathbf a_j.
$$

The original accelerated-source law and its complete uniformly subfield root theorem are the premises. The affine tails have zero acceleration, and $\|\mathbf A_i^0\|\le6/D_0^2$. The patch has acceleration at most $150/D_0^2$, is exactly compatible because its sampled source is before $-1$, and preserves complete separation and speed margins by the estimates already given. Put $f(T)=D_0+T/16$ for $T\ge0$, and $f(S)=D_0$ for $S<0$.

Bootstrap $\|\mathbf V_i\|<1/4$, $\|\mathbf w\|<1/4$, $\mathbf e_x\cdot\mathbf q\ge f(T)$, and $\|\mathbf A_i(T)\|\le C/f(T)^2$ with $C=256$. The acceleration bound also holds on the complete past because $150<256$. The complete root theorem gives

$$
\frac45d(T)\le r\le\frac43d(T),\qquad D\ge\frac34.
$$

Since $d(T)\le D_0+T/4$, the source time obeys $S\ge(2/3)T-(4/3)D_0$. For $S\ge0$ this gives $f(S)\ge11D_0/12+T/24\ge(2/3)f(T)$. If $S<0$, the same lower bound implies $T<2D_0$, so $f(T)<9D_0/8$ and again $f(S)\ge(2/3)f(T)$. Thus the delayed acceleration is at most $9C/[4f(T)^2]$.

In the selected amplitude-gradient numerator, $1-\|\mathbf v\|^2\le1$ and $D\|\mathbf v\|\le(5/4)(1/4)=5/16$. Using the larger safe bound $11/8$ and the displayed range/denominator floors gives the nonacceleration term at most $6/d^2$. The source-acceleration coefficient is at most $3/d$. Consequently

$$
\|\mathbf A_i(T)\|\le\frac1{f(T)^2}\left(6+\frac{27C}{4D_0}\right)<\frac C{f(T)^2}.
$$

The strict inequality closes the neutral delayed-acceleration estimate without dropping source acceleration or declaring its coefficient small by assumption. Here its smallness follows from the explicit separation. The integrated bound is

$$
\int_0^\infty\|\mathbf A_i\|dT\le\frac{16C}{D_0}=\frac1{256},\qquad
\int_0^\infty\|\mathbf A_+-\mathbf A_-\|dT\le\frac1{128}.
$$

It preserves individual speed below $1/4$, relative speed below $1/4$, and relative outward projection at least $1/8-1/128=15/128>1/16$. The strict inequalities close every geometric bootstrap. On every bounded time interval, separation and the complete speed gap give a positive minimum delay; method-of-steps propagation of the supplied locally Lipschitz acceleration preserves finite local $C^{2,1}$ norms. Thus no finite-time regularity boundary is hidden in the argument, and the original local coupled theorem can be repeatedly applied.

**Derived all-future result, pending independent reconstruction:** this complete asymmetric, transverse, uniformly subfield preparation has a unique global future, remains separated, disperses at least linearly and approaches distinct terminal velocities with relative outward projection at least $15/128$. The direction has finite total angular variation by the $p=2$ argument in Section 10. These strict inequalities also give an open family of nearby complete compatible preparations with the same controlled margins; the explicit example is not an isolated mirror artifact. The result is a scattering theorem for this enlarged class, not an arbitrary-history separation theorem or a near-circular binding verdict. A violation of the delayed weight comparison or acceleration bound would falsify it.

## 12. Frozen first superfield circle interval and controls

Before a new root instrument is run, fix the geometric search interval $3\le b\le4$ for $p=3/2$, its $p=1,2$ controls and the selected vector linear law. Couplings remain exactly as selected. This is a supplied complete periodic history calculation, not continuation from a subfield release. The amplitude-gradient law is not extended to this interval.

There is exactly one positive self root and three partner roots throughout this entire closed interval, all ordinary. The self root lies in $(0,\pi)$; $x-b\sin x$ has one negative minimum followed by one crossing. For $\pi\le x\le b\le4$, $b|\sin x|\le4(x-\pi)<x$, because $3x\le12<4\pi$, excluding every extra self root. Partner roots comprise one in $(0,\pi/2)$ and two in $(\pi/2,3\pi/2)$. On the latter interval $x+b\cos x$ has one minimum. It is negative at $x=9\pi/10$ for every $b\ge3$: use $\cos(\pi/10)\ge1-\pi^2/200$ and $\pi<22/7$ to obtain $9\pi/10-3\cos(\pi/10)<0$. Its endpoint signs are positive, giving exactly two roots. There are no possible roots at or beyond $3\pi/2>4$. None is a repeated root, because the minimum is strictly negative and the roots are strictly away from all trigonometric zeros.

This proof freezes brackets $(0,\pi)$ for the nonzero self root (use its unique minimum as the positive left numerical endpoint), $(0,\pi/2)$ for the first partner root, $(\pi/2,9\pi/10)$ for the second, and $(9\pi/10,3\pi/2)$ for the third. Every instrument must record all four roots and absolute denominators. For $p=1$, a tangential zero still requires the separate dimensionless radial compatibility $b^2=-C_r$; an arbitrary radius cannot repair it.

The known-first instrument control fixes $x_0=1/2$, $b_0=x_0/\cos x_0<1$ and $R_0=2$. The complete analytical census is one partner root $x_0$ and no self root, and the acceleration is exactly $-(\cos x_0,-\sin x_0,0)/[(2R_0\cos x_0)^p(1+b_0\sin x_0)]$. The direct vector law additionally gives $-k\mathbf r/D$. This frozen known input tests root solving, power normalization, signs and vector reduction before any superfield target calculation. Independent mathematical root reconstruction by the coordinator is requested before interpreting a target balance as checked.

**Known-before-target measurement, 2026-10-05 13:03:34 UTC.** The new [circle instrument](../evidence/alternatives-screen-2026-10-05-circle.py) ran `--known` under the shared venv before any `--target`. The independently specified $x_0=1/2$ control returned root error below $2.0\times10^{-15}$ and Cartesian acceleration errors below $7.6\times10^{-15}$ across $p=1,3/2,2,-1$. The receipt is retained locally at `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05/circle-known.json`. These errors validate this floating instrument on the control only. The coordinator separately reconstructed the complete $[3,4]$ root census and confirmed the negative signed transmitter factor of the lower secondary partner root; the absolute weight is retained. The coordinator's [independent reference](../../analysis/alternatives-screen-2026-10-05-independent-reference.md) also reconstructs the memory exclusion, time-symmetric circle/transverse claims and finite-width global continuation mechanism, with disclosure of the latter theorem statement before reconstruction.

The `--target` run finished at 13:03:56 UTC with measured computation wall time 0.270 seconds. In 2001 samples on the frozen interval it found one sign-changing $p=3/2$ balance candidate at $b\approx3.691480382840137$, $R\approx0.0009425841809523375$, $\omega\approx3916.3402669355846$, $C_r\approx-0.41837064356116105$ and $|C_t|<1.5\times10^{-16}$. Its minimum absolute transmitter factor is about $1.953854$. The $p=2$ control recovers the existing baseline values $b\approx3.070356625389678$, $R\approx0.08694167347415922$. The $p=1$ and linear samples have no tangential sign crossing; sampling does not prove exclusion or uniqueness. All row data are retained in local `circle-target.json`. These are floating balance candidates pending an independent continuous existence check; no stability follows yet.

**Independent existence admission.** The coordinator's separately authored [rational Taylor interval reference](../evidence/alternatives-screen-2026-10-05-independent-circle.py) passed its own known controls before target application and encloses a continuous $p=3/2$ tangential crossing in $3.69148037<b<3.69148040$, with $-0.418375622<C_r<-0.418365665$ and $0.0009425617305<R<0.0009426066234$. Its complete root census retains one self and three partner roots with $|D|>1.95385$. The local independent receipt is `root-reference/circle-balance.json` under the campaign bulk owner. This upgrades existence to an independently enclosed all-time superfield circular solution, by the continuous circle criterion and rotation covariance. It supplies neither uniqueness in the bracket nor accessibility from a subfield release.

## 13. Frozen full Cartesian variation on all ordinary circle roots

For any selected radial exponent, including the algebraic $p=-1$ notation for the vector linear numerator with its extra factor $k$, retain the complete ordinary root census and its signed $D=1-\mathbf n\cdot\mathbf v\ne0$. For a past root and Cartesian variation $\mathbf d=\boldsymbol\eta_i(T)-\boldsymbol\eta_j(S)$,

$$
\delta S=-\frac{\mathbf n\cdot\mathbf d}{D},\qquad
B=I+\frac{\mathbf v\mathbf n^{\mathsf T}}D,\qquad
\delta\mathbf r=B\mathbf d.
$$

For coupling $k_p$ (one for positive-$p$ rows and the selected $k$ for the linear row), the full row derivative is $M\mathbf d+N\boldsymbol\eta_j'(S)$, where

$$
\begin{aligned}
M&=\frac{\sigma k_p}{r^{p+1}|D|}\left[(I-(p+1)\mathbf n\mathbf n^{\mathsf T})B+\frac{\mathbf n\mathbf v^{\mathsf T}(I-\mathbf n\mathbf n^{\mathsf T})B}{D}-\frac{r(\mathbf n\cdot\mathbf a)\mathbf n\mathbf n^{\mathsf T}}{D^2}\right],\\
N&=\frac{\sigma k_p}{r^p|D|D}\mathbf n\mathbf n^{\mathsf T}.
\end{aligned}
$$

The signed $D$ remains inside the derivatives even though the row magnitude uses $|D|$. In particular the lower secondary partner root cannot be treated as positive-$D$. These formulas follow by differentiating $\log|D|$, whose derivative is $\delta D/D$ on each fixed ordinary sign chart. They include the source acceleration generated by shifting the emission time, and source velocity variations. All self terms are retained with their delayed argument, not identified with the present receiver variation.

Let $J$ generate rotations about $z$, let $Q(\theta)=\exp(\theta J)$, and write $\boldsymbol\eta_i(T)=Q(\omega T)\mathbf u_i(T)$. The two labels' row tensors coincide in this common rotating frame because simultaneous inversion changes $(\mathbf n,\mathbf v,\mathbf a)$ to their negatives. Exchange-even and exchange-odd sectors therefore decouple. For either sector assign $\chi=+1$ to self rows and $\chi=+1$ or $-1$ to partner rows according to the exchange parity. The full three-dimensional characteristic matrix is

$$
\mathcal H(\lambda)=(\lambda I+\omega J)^2-\sum M+\sum\chi\left[M Q(-\omega\tau)-NQ(-\omega\tau)(\lambda I+\omega J)\right]e^{-\lambda\tau}.
$$

For the time-symmetric law average past/future contributions using Section 8's $M_\varepsilon,N_\varepsilon$, replace the rotation by $Q(\varepsilon\omega\tau)$, and the exponential by $e^{\varepsilon\lambda\tau}$. This gives the full planar operator as well as its already classified transverse block. Fixed-period boundary perturbations use $\lambda=im\omega$, $m\in\mathbb Z$, while causal all-root circles use the usual formal exponential equation; neither convention erases history compatibility or nonlinear proof obligations.

Before target spectral evaluation, the operator must pass these exact symmetry controls: common spatial translations (in-plane rotating-frame frequencies $\lambda=\pm i\omega$ and vertical zero frequency), constant phase shift in the opposite planar sector at $\lambda=0$, and rigid tilts in the opposite vertical sector at $\lambda=\pm i\omega$. These derive from Euclidean translation/rotation covariance of a complete exact solution. No root or coefficient may be adjusted to fit the controls. A separate finite variation of the original complete root equation provides an independent numerical differentiation check of the row derivative, while agreement of two evaluations of this matrix alone is not independent evidence.

### Fixed-period target and analytic Fourier tail

Freeze the time-symmetric target at $b=1/2$, with its radius and frequency selected by exact balance in Section 5. In dimensionless units $M_\varepsilon/\omega^2$ has operator norm at most $136/49$, and $N_\varepsilon/\omega$ at most $4/7$. To verify these coarse bounds, use $x<1/2$, $\cos x\ge7/8$, $D\ge1$, $\|B\|\le3/2$, and $r(\mathbf n\cdot\mathbf a)=2b^2\cos^2x\le1/2$. The tensor bracket is at most $3+3/4+1/2=17/4$ and the prefactor at most $32/49$. These estimates cover both reflected time directions and both exchange sectors. Averaging does not increase them.

At Fourier index $m$, the dimensionless planar matrix is $-m^2I+E_m$, with

$$
\|E_m\|\le2|m|+1+\frac{272}{49}+\frac47(|m|+1)=\frac{18}{7}|m|+\frac{349}{49}.
$$

For every integer $|m|\ge5$ this is strictly less than $m^2$, proving invertibility by a geometric-series inverse. Thus only $m=0,1,2,3,4$ require finite evaluation. This is a complete high-frequency exclusion, not an arbitrary spectral truncation. The zero modes associated with exact symmetries must be factored or counted explicitly rather than included in a numerical minimum singular value.

**Known-before-target measurement, 2026-10-05 13:07:49 UTC.** The [Cartesian instrument](../evidence/alternatives-screen-2026-10-05-cartesian.py) passed `--known` before periodic or causal spectral targets. Its stationary-source Cartesian derivative controls at $p=1,3/2,2,-1$ have zero floating discrepancy, and its translation, phase and tilt residuals on the exact analytic time-symmetric circle are below $5.0\times10^{-16}$. The local receipt is `cartesian-known.json` in the same bulk owner as the circle receipts. These controls establish instrument calibration on the named cases; the all-root superfield row derivative still requires its independent assessment before target interpretation.

At 13:08:19 UTC the periodic target returned only the expected planar symmetry zeros among $m=0,1,2,3,4$: common displacement at $m=1$ (two real translations) and opposite displacement at $m=0$ (phase rotation). The smallest measured nonsymmetry singular value is approximately $0.0398261$ in the opposite $m=1$ block, whose determinant is approximately $0.201938$. Combined with the analytic Fourier tail and transverse proof, this is a candidate full Cartesian fixed-period kernel consisting only of the six Euclidean rigid symmetries. Continuous finite-mode enclosure and independent tensor evaluation are still required before promoting the candidate to a checked kernel theorem. Local nonlinear uniqueness has not been derived.

After the independent circle existence admission, the frozen causal target ran in the foreground and completed at 13:15:17 UTC. It measured a positive real root $\mu=\lambda/\omega\approx0.2508751738132124$, $\lambda\approx982.5125451791474$, in the exchange-even planar block, with determinant residual below $1.4\times10^{-17}$. This is a displacement of the common Cartesian centre, not the opposite-displacement radius/phase sector. The root is a formal full-Cartesian growth witness pending independent enclosure; its derivation includes every self/partner source and emission-clock term. The scan of $0.0001\le\mu\le50$ found no additional positive-real sign crossing in the other three blocks, which is only a bounded measurement, not a root exclusion or complete spectrum. The receipt is local `cartesian-causal.json`. No nonlinear history evolution or terminal fate of this circular solution is certified.

**Independent full-Cartesian admission.** The separately authored [interval Cartesian reference](../evidence/alternatives-screen-2026-10-05-independent-cartesian.py), with its own known-before-target controls, encloses the common-planar determinant at $\mu=0.24$ inside $[-0.044056,-0.025701]$ and at $\mu=0.26$ inside $[0.020316,0.037436]$ throughout the admitted circle interval. Continuity therefore proves a positive real formal characteristic root for every enclosed exact balance. Simplicity and complete spectral enumeration are not claimed. The same reference encloses every nonsymmetry $m=0,1,2,3,4$ determinant away from zero for the time-symmetric $b=1/2$ target, and proves rank exactly one for the two symmetry blocks by combining a nonzero entry with the exact symmetry null vector. Its `root-reference/cartesian-target.json` receipt, the analytic high-frequency exclusion and the exact transverse calculation establish the full six-dimensional Euclidean symmetry kernel in the declared fixed-period space. This remains a linear boundary statement, not a nonlinear stability or local uniqueness theorem.

## 14. A circle obstruction before the first partner fold

The root geometry itself extends the low-speed exclusion beyond equality for every strictly positive radial magnitude, including the selected positive powers and the vector linear response. Let $x_f\in(\pi/2,\pi)$ minimize $x/(-\cos x)$, so $\tan x_f=-1/x_f$, and write $b_f=x_f/(-\cos x_f)=\sqrt{1+x_f^2}<\pi$. For $1<b<b_f$, the complete circle census is exactly one self root $x_s\in(0,\pi)$ and one partner root $x_p\in(0,\pi/2)$. The other partner lobe has no root by the definition of its strict minimum; there is no additional self lobe because $x\le b<\pi$.

Their net acceleration can be written

$$
\mathbf A=a(\sin x_s,\cos x_s,0)-b_1(\cos x_p,-\sin x_p,0),\qquad a,b_1>0.
$$

The positive numbers $a,b_1$ contain the actual selected magnitude and absolute transmitter factors; the argument does not assume they are equal. If $x_s\le\pi/2$, both tangential terms are positive. Otherwise tangential cancellation requires $a/b_1=\sin x_p/(-\cos x_s)$. Its radial component is then

$$
A_r=b_1\frac{\cos(x_s-x_p)}{-\cos x_s}>0.
$$

To prove the strict sign, put $y=x_s-\pi/2$. The root identity gives $b\cos y=x_s=y+\pi/2$, so $y-b\cos y=-\pi/2<0$. The function $t-b\cos t$ is strictly increasing on $(0,\pi/2)$ and vanishes at $x_p$, hence $y<x_p$ and $0<x_s-x_p<\pi/2$. A tangential zero therefore has outward radial acceleration, incompatible with a circle. **Derived exclusion:** no ordinary antipodal circle balances below the first partner-fold speed for any selected everywhere-positive radial magnitude. At $b=b_f$ the ordinary equation is undefined at the double partner root; the proof does not select a singular response there. This result removes an entire superfield inventory without mistaking a tangential zero for full balance.

## 15. Finite-width circle exclusion without a small-width assumption

For every fixed $h,\rho>0$, including all four selected pairs, the self-inclusive finite-width law admits no complete antipodal uniform circle with $0<b=R\omega\le\pi/2$. The argument controls the whole past integral even when the temporal width spans many revolutions. It requires no expansion in $h/R$, no sharp-root replacement and no ignored self input.

At reception zero write $\theta=\omega\tau$. The self and partner ranges are $r_s(\theta)=2R|\sin(\theta/2)|$ and $r_p(\theta)=2R|\cos(\theta/2)|$. Both are even and $2\pi$-periodic. After polarity is included, both tangential integrands have the sign and form

$$
\frac{R\sin\theta}{[r_j(\theta)^2+\rho^2]^{3/2}}\delta_h\!\left(r_j(\theta)-\frac\theta\omega\right)\frac{d\theta}{\omega},\qquad j=s,p.
$$

For $0<\varphi<\pi$ and every integer $n\ge0$, pair the positive-sine phase $\theta_+=\varphi+2\pi n$ with the negative-sine phase $\theta_-=2\pi(n+1)-\varphi$. Their ranges and core denominators agree, while $0\le\theta_+<\theta_-$ and

$$
\frac{\theta_++\theta_-}{2\omega}=\frac{(2n+1)\pi}{\omega}\ge\frac\pi\omega\ge2R\ge r_j(\varphi).
$$

This midpoint inequality means $|\theta_+/\omega-r_j|\le|\theta_-/\omega-r_j|$. The triangular window is nonincreasing as a function of absolute distance from its centre, so the positive-sine weight is at least the negative-sine weight. Every paired integral is nonnegative. Absolute convergence, already proved for arbitrary complete histories, justifies this rearrangement; a circular history in fact has support only up to age $2R+h$.

Strict positivity follows from the self channel and $n=0$ near $\varphi=0$: its range tends to zero, the positive-age window tends to $1/h$, and the negative-age window tends to $\delta_h(2\pi/\omega)<1/h$. On a sufficiently small positive interval, the weight difference and $\sin\varphi$ are positive, while the core denominator is finite. Hence $A_\theta>0$. The circle's required tangential acceleration is zero, giving the claimed exclusion. Width can remove a sharp singularity without removing the geometric forward angular input. Higher-speed circles and noncircular fate remain separate questions.

## 16. Deferred auxiliary derivation: co-moving finite-width unit-speed event

**Disposition:** this proof candidate was written before the first-screen stop instruction and remains unassessed. The coordinator requested no duplicate target because the collinear worker already owns independently checked approaching preparations. Preserve it as an auxiliary proposed case; do not integrate its conclusion as an admitted campaign finding or launch a numerical follow-up without renewed assignment.

This is a complete-history event theorem for each of the four selected positive width/core laws, not a circular perturbation. The two labels begin at positions $a_+=8$ and $a_-=-8$ on one fixed Cartesian axis, both with velocity $1/2$ in the positive direction. Their equal initial velocities and constant old separation make the affine self input explicit; the self channel is retained. There is no ceiling, receiver multiplier or outgoing event selector. The invariant collinear subspace is a control inside the full vector equation, and the global theorem in Section 6 supplies its unique future in that equation.

### Exact compatible complete preparation

Let $\delta=10^{-8}$. For $S\le0$ set

$$
\phi_i(S)=a_i+\tfrac12S+g_\delta(S)A_i^0,
\qquad
 g_\delta(S)=\tfrac12\delta^2z^3(1-z)^2,
\quad z=1+S/\delta,
$$

on $-\delta\le S\le0$, and put $g_\delta=0$ before $-\delta$. As in Section 10, $g_\delta(0)=g_\delta'(0)=0$, $g_\delta''(0)=1$, and the value and first two derivatives match zero at the old join. Its bounds are $|g_\delta|\le\delta^2/2$, $|g_\delta'|\le8\delta$, $|g_\delta''|\le25$.

Define $(A_+^0,A_-^0)$ as the fixed point of the exact finite-width acceleration evaluated on these complete histories at zero. This is an exact definition, not a numerically fitted pair of coefficients. Across all four selected laws, Section 6's constants satisfy $B<7500$ and $L<1100000$. Therefore the acceleration map preserves the closed ball $\max_i|A_i^0|\le15000$ and has Lipschitz constant at most $2L\delta^2<2.2\times10^{-10}$. The contraction theorem gives a unique fixed point in this ball. The scalar subspace is preserved because every source-receiver displacement lies on the same line.

The resulting histories are complete, separated and locally $C^{2,1}$, with exactly compatible acceleration at zero. Their speeds lie between $0.4988$ and $0.5012$, and their separation exceeds $16-1.5\times10^{-12}$. They therefore have a uniform subfield gap. The large but bounded patch acceleration is explicit and is not hidden in an affine endpoint discontinuity.

### A retained historical self band gives the event

Put $t_b=3/400=0.0075$. Until the first upper exit from $1/2\le V_i(T)\le1$, write

$$
\eta_i(T)=X_i(T)-a_i-\tfrac12T,\qquad 0\le\eta_i(T)\le T/2.
$$

For every age $\tau\in[h/4,h]$ and $0\le T\le t_b$, the source time $S=T-\tau$ is earlier than $-\delta$, since $h/4\ge1/128>t_b+\delta$. Thus this whole source band remains in the exactly affine tail, and its self displacement is

$$
r_i(T,\tau)=\tfrac12\tau+\eta_i(T)>0.
$$

Because $T\le t_b<h/4\le\tau$, the gap satisfies $|r_i-\tau|\le\tau/2\le h/2$, so $\delta_h(r_i-\tau)\ge1/(2h)$. Also $r_i\ge\tau/2$ and $r_i\le(h+t_b)/2$. Therefore this fixed historical band alone contributes at least

$$
A_{i,\mathrm{self}}\ge
\frac{15h}{128\left[((h+t_b)/2)^2+\rho^2\right]^{3/2}}>70.
$$

The inequality holds for both selected $h$ values and every selected $\rho\le1/32$. It can be checked entirely with rational bounds. For $h=1/16$, the bracket is less than $1101/500000$ and its square root less than $47/1000$, making $70$ times their product smaller than $15/2048$. For $h=1/32$, the bracket is less than $1352/10^6$ and its square root less than $37/1000$, making $70$ times their product smaller than $15/4096$. Every other self age contributes nonnegatively because the complete past and current bootstrap path both move strictly forward.

Partner emissions that contribute during this short interval lie in the affine past as well. Present and recent-source separations exceed $15$, so ages close enough to sample the patch or new future have gaps far outside the width. On the remaining affine tail write the displacement as $q_i+\tau/2$, where $q_i=\pm16+\eta_i(T)$ and $|q_i|>15.99$. The gap $|q_i+\tau/2|-\tau$ is strictly decreasing with slopes between $-3/2$ and $-1/2$. Consequently the integrated triangular weight is at most two. On its support,

$$
r\ge\frac{|q_i|-h}{3/2}-h>10,
$$

so the absolute partner input is less than $2/10^2<1$. The spatial core can only reduce this upper bound. Combining the retained self band with every partner contribution gives $A_i>69$ throughout the proposed interval before unit speed.

The lower velocity face cannot be crossed because its acceleration points strictly inward to the bootstrap region. If no member reached unit speed by $t_b$, integration would give $V_i(t_b)>1/2+69(3/400)>1$, a contradiction. Hence **an actual first unit-speed event occurs before $3/400$**, at separation greater than $15.99$, with positive acceleration greater than $69$ for the first member at equality. It is a transverse crossing. The fixed finite-width law remains well defined and has a unique local and global outgoing future by Section 6; there is no root singularity at this event. A strict or inclusive speed-domain restriction without an extra response would therefore fail to contain this complete compatible future.

This proves a concrete event for the fixed selected laws. It does not show long-time dispersal, binding, a physical account or the sharp-limit continuation. The falsifiers are a failed fixed-point compatibility estimate, an omitted negative self contribution despite positive path velocity, or a violation of the retained-band/partner bounds. The proof uses the complete past and no time discretization.

## First-screen closeout and validation

The first-screen assignment is frozen for the coordinator's fresh adversarial review. AST parsing under the shared venv passes for both owned Python instruments. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for the three owned files; its difference exit status reflects their new-file content. Exact-path `git --no-optional-locks status --short` reports those three files as untracked. Known and target receipts are retained in the named ignored bulk owner, and the yielded foreground Cartesian process completed with exit code zero. No owned process remains running. The unassessed distant-scattering, pre-fold exclusion and finite-width phase-pairing arguments are the principal review targets; the auxiliary co-moving event in Section 16 is deferred, and nonlinear stability or local periodic isolation has not been pursued.
