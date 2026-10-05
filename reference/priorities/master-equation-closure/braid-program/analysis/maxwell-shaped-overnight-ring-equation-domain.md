# Four-member Maxwell-shaped alternating ring: balance and Cartesian variation

This source freezes the permitted secondary case of the operator-selected Maxwell investigation. The isolated binary outcome is checked before this escalation. The [Braid Program owner](../README.md) distinguishes balance, stability and evolved persistence; those distinctions remain binding. The reference is only the existing four-member alternating-ring candidate from the [Maxwell yardstick ledger](../../analysis/maxwell-yardstick-ledger-2026-10-04.md). The 24-member candidate is deferred. This source derives the full balance equations and a conditional Cartesian variational equation. It publishes no spectrum around the unverified floating-point candidate.

## 1. Complete frozen case specification

There are exactly four members indexed $i=0,1,2,3$, with polarity signs $(-1)^i$ and equal fixed pair coupling $K=1$. Wake speed is $c_f=1$. The equation is separately E or E+M, exactly Sections 7 and 8 of the [variation manuscript](../../equation-variants/manuscript.md). All positive-delay partner and self channels are retained. No cap, projection, braking multiplier, spatial core, impulse, external source or added self response is selected. The complete candidate history on $(-\infty,\infty)$ is

$$
\mathbf X_i^0(T)=r Q(\omega T)\mathbf e_i,\qquad
\mathbf e_i=(\cos\alpha_i,\sin\alpha_i,0),\quad
\alpha_i=i\pi/2,\quad \beta=r\omega>0.
$$

Here $Q(\theta)$ rotates Cartesian space about the fixed z axis, and $r>0$ is member radius. The candidate speed box is $0.42\le\beta\le0.44$; all histories are smooth, separated and have complete speed margin at least $0.56$. The ledger's values near $\beta=0.429117162$, $r_E=2.067839$ and $r_{E+M}=2.559211$ remain floating-point candidate locators. They do not define exact histories, enclose a zero or establish complete balance. The radius is determined separately by each selected law after its common tangential zero is enclosed.

The unrestricted, inclusive-ceiling and strict-ceiling labels coincide on this box because no boundary response is selected. Equality, superfield branches and any ceiling enforcement remain undefined by the case. A complete exact circular solution requires root census and both Cartesian acceleration components, not the radial equation alone. Any stability verdict also requires perturbations beyond imposed ring symmetry and the delayed source-acceleration terms.

## 2. Complete root census and exact balance equations

By rotational equivalence consider receiver $i=0$ at $T=0$. For partner angular offset $\alpha\in\{\pi/2,\pi,3\pi/2\}$, let $z=\tau/r>0$, $\tau=T-S$, and $\theta=\alpha-\beta z$. The causal equation is

$$
z=\|\mathbf e_0-Q(\theta)\mathbf e_0\|=2|\sin(\theta/2)|.
$$

The residual on the right minus $z$ decreases strictly, with chord slope at most $\beta-1<0$. Its value at zero is the positive simultaneous partner distance divided by $r$, and it is nonpositive by $z=2$. Therefore each of the three partners has exactly one positive root. The source speed bound gives $D\ge1-\beta\ge0.56$. Every self chord is shorter than its positive travel time, so there is no positive-delay self root. Thus the full four-member census has exactly twelve directed partner hits and no directed self hits at every reception time. No finite-history omission or imposed deletion is used.

Write $\mathbf e_\theta=Q(\theta)\mathbf e_0$ and $J=Q'(0)$, the linear map $J(x,y,z)=(-y,x,0)$. The dimensionless source data at a root are

$$
\mathbf n=(\mathbf e_0-\mathbf e_\theta)/z,\quad
\mathbf v=\beta J\mathbf e_\theta,\quad
\mathbf a_*=-\beta^2\mathbf e_\theta,\quad
\mathbf u=\beta J\mathbf e_0,\quad D=1-\mathbf n\cdot\mathbf v.
$$

The actual delayed source acceleration is $\mathbf a=\mathbf a_*/r$. The scaled E kernel is

$$
\mathbf E_*(\alpha,\beta)=
\frac{(1-\beta^2)(\mathbf n-\mathbf v)+z[(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a_*)-D\mathbf a_*]}{z^2D^3}.
$$

The complete circular coefficient is

$$
\mathbf C_E(\beta)=\sum_{j=1}^3(-1)^j\mathbf E_*(j\pi/2,\beta),
$$

$$
\mathbf C_{E+M}(\beta)=\sum_{j=1}^3(-1)^j
[(1-\mathbf u\cdot\mathbf n_j)\mathbf E_{*,j}
+\mathbf n_j(\mathbf u\cdot\mathbf E_{*,j})].
$$

The actual acceleration is $\mathbf C/r^2$. Full balance requires

$$
C_\theta(\beta)=0,\qquad C_z(\beta)=0,\qquad
C_r(\beta)=-\beta^2r.
$$

Planar reflection makes $C_z=0$ identically. Each receiver term is perpendicular to the tangential receiver velocity, so the E and E+M tangential coefficient functions coincide exactly on this same complete circular history. Their radial coefficients need not coincide. A root enclosure with $C_r<0$ gives $r=-C_r/\beta^2>0$ for the corresponding law. That establishes a smooth complete circular solution only after all three partner roots and the entire acceleration equation are independently verified on the enclosed parameter/radius relation.

## 3. Full Cartesian first variation at a balanced history

This section is conditional on an exact history satisfying Section 2. It retains all twelve partner interactions and allows independent three-dimensional perturbations of every member. A variation parameter $\zeta$ gives $\mathbf X_i=\mathbf X_i^0+\zeta\boldsymbol\xi_i+O(\zeta^2)$. At a base root $S=T-\tau_{ij}$, write base $R,\mathbf n,\mathbf v,\mathbf a,D,\mathbf u,\mathbf E$ as in the selected law, and let $\mathbf j=\mathbf X_j^{0\,\prime\prime\prime}(S)=-\omega^2\mathbf v$. Every variation is evaluated at the fixed base reception time; the shift of the sampled emission is included explicitly.

Put $\Delta\mathbf x=\boldsymbol\xi_i(T)-\boldsymbol\xi_j(S)$. Differentiating the root equation gives

$$
\delta S=-\frac{\mathbf n\cdot\Delta\mathbf x}{D},\quad
\delta\mathbf r=\Delta\mathbf x-\mathbf v\delta S,\quad
\delta R=\mathbf n\cdot\delta\mathbf r=-\delta S,\quad
\delta\mathbf n=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\delta\mathbf r}{R}.
$$

The sampled transmitter jets and receiver velocity vary as

$$
\delta\mathbf v=\boldsymbol\xi_j'(S)+\mathbf a\delta S,\qquad
\delta\mathbf a=\boldsymbol\xi_j''(S)+\mathbf j\delta S,\qquad
\delta\mathbf u=\boldsymbol\xi_i'(T),\quad
\delta D=-\delta\mathbf n\cdot\mathbf v-\mathbf n\cdot\delta\mathbf v.
$$

The term $\boldsymbol\xi_j''(S)$ is essential: omitting it turns the selected neutral delayed equation into another equation. Let

$$
\mathbf N=(1-\|\mathbf v\|^2)(\mathbf n-\mathbf v)
+R[(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a].
$$

Its complete variation is

$$
\begin{aligned}
\delta\mathbf N={}&-2(\mathbf v\cdot\delta\mathbf v)(\mathbf n-\mathbf v)
+(1-\|\mathbf v\|^2)(\delta\mathbf n-\delta\mathbf v)\\
&+\delta R[(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a]\\
&+R[(\delta\mathbf n-\delta\mathbf v)(\mathbf n\cdot\mathbf a)
+(\mathbf n-\mathbf v)(\delta\mathbf n\cdot\mathbf a+\mathbf n\cdot\delta\mathbf a)
-\delta D\mathbf a-D\delta\mathbf a].
\end{aligned}
$$

Then

$$
\delta\mathbf E=\frac{\delta\mathbf N}{R^2D^3}
-\mathbf E\left(\frac{2\delta R}{R}+\frac{3\delta D}{D}\right),
$$

$$
\begin{aligned}
\delta\mathbf M={}&\delta\mathbf n(\mathbf u\cdot\mathbf E)
+\mathbf n(\delta\mathbf u\cdot\mathbf E+\mathbf u\cdot\delta\mathbf E)\\
&-(\delta\mathbf u\cdot\mathbf n+\mathbf u\cdot\delta\mathbf n)\mathbf E
-(\mathbf u\cdot\mathbf n)\delta\mathbf E.
\end{aligned}
$$

The full linearized equation is $\boldsymbol\xi_i''=\sum_{j\ne i}(-1)^{i+j}\delta\mathbf E_{ij}$ for E, or the same sum of $\delta\mathbf E_{ij}+\delta\mathbf M_{ij}$ for E+M. All three Cartesian components of every $\boldsymbol\xi_i$ are free. The uniform-margin complete histories preserve the no-self-root chart for sufficiently small complete perturbations within that chart; this is a domain statement, not a declaration that perturbations obey a selected ceiling.

## 4. Rotating-frame characteristic operator, without a spectrum claim

Set $\boldsymbol\xi_i(T)=Q(\omega T)\boldsymbol\eta_i(T)$. Base root delays are constant, and the preceding first variation has constant rotating-frame coefficients. For a formal mode $\boldsymbol\eta_i=e^{\lambda T}\mathbf z_i$, at receiver time zero define $Q_d=Q(-\omega\tau_{ij})$. The variations entering Section 3 become

$$
\Delta\mathbf x=\mathbf z_i-e^{-\lambda\tau_{ij}}Q_d\mathbf z_j,\qquad
\delta\mathbf u=(\lambda I+\omega J)\mathbf z_i,
$$

$$
\delta\mathbf v=e^{-\lambda\tau_{ij}}Q_d(\lambda I+\omega J)\mathbf z_j+\mathbf a\delta S,
\qquad
\delta\mathbf a=e^{-\lambda\tau_{ij}}Q_d(\lambda I+\omega J)^2\mathbf z_j+\mathbf j\delta S.
$$

The remaining geometric/root variations retain their formulas from Section 3. The receiver side is $(\lambda I+\omega J)^2\mathbf z_i$. Substituting all twelve hit rows gives a $12\times12$ characteristic matrix acting on $(\mathbf z_0,\ldots,\mathbf z_3)$. Its determinant, evaluated on a certified exact balance, defines the formal Cartesian characteristic equation. Neutral delayed-acceleration terms contribute $\lambda^2e^{-\lambda\tau_{ij}}$ and must remain in any spectrum or witness computation.

A positive-real or positive-real-part characteristic witness after complete balance certification establishes a linear growing mode in its stated Cartesian sector; it is not an evolved nonlinear fate. A stable verdict would require controlling the relevant neutral characteristic roots and perturbations outside ring symmetry, rather than reporting a finite grid without its omitted-domain bound. Persistent nonlinear binding requires admissible retained coupled histories and the owning qualification obligations. No such verdict is made in this source before the independent balance/reference is fixed.

## 5. Vertical Cartesian sector and symmetry controls

The out-of-plane sector is part of the full Cartesian variation, outside imposed planar ring symmetry. It is particularly transparent because base source/receiver vectors lie in the plane. For $\boldsymbol\xi_i=z_i\widehat{\mathbf z}$ one has $\delta S=\delta R=\delta D=0$, $\delta n_z=(z_i-z_j(S))/R$, $\delta v_z=z_j'(S)$ and $\delta a_z=z_j''(S)$. Define $H_c=1-\beta^2+R(\mathbf n\cdot\mathbf a)$. Then

$$
\delta E_z=\frac{H_c}{R^3D^3}[z_i-z_j(S)]
-\frac{H_c}{R^2D^3}z_j'(S)-\frac1{RD^2}z_j''(S).
$$

The full receiver response is

$$
\delta(E+M)_z=(1-\mathbf u\cdot\mathbf n)\delta E_z
+\frac{\mathbf u\cdot\mathbf E}{R}[z_i-z_j(S)].
$$

This leaves the delayed second derivative intact. The circular geometry gives $H_c=1-\beta^2\cos\theta$ and $1-\mathbf u\cdot\mathbf n=D$. Thus write

$$
z_i''=\sum_{j\ne i}\sigma_{ij}
\{a_j[z_i-z_j(T-\tau_j)]+b_jz_j'(T-\tau_j)+c_jz_j''(T-\tau_j)\}.
$$

For E, the coefficients are $a_j=H_c/(R^3D^3)$, $b_j=-H_c/(R^2D^3)$ and $c_j=-1/(RD^2)$. For E+M, they are $a_j=H_c/(R^3D^2)+(\mathbf u\cdot\mathbf E)/R$, $b_j=-H_c/(R^2D^2)$ and $c_j=-1/(RD)$. All are fixed by the full certified reference if and when it exists; none is an adjustable stability parameter.

For cyclic vertical sector $m=0,1,2,3$, put $z_i=e^{\lambda T}e^{im\alpha_i}$. Its conditional characteristic function is

$$
\chi_m(\lambda)=\lambda^2-\sum_{j=1}^3(-1)^j a_j
+\sum_{j=1}^3(-1)^j e^{im\alpha_j}e^{-\lambda\tau_j}
[a_j-b_j\lambda-c_j\lambda^2].
$$

This supplies no eigenvalue by itself. It is a compact specialization for checking that an eventual full Cartesian instrument retains delayed acceleration and perturbations outside ring symmetry.

Two analytical symmetry controls precede any target spectrum. A constant common vertical translation gives $\chi_0(0)=0$. A common vertical affine variation gives $\chi_0'(0)=0$: E has $-Ra_j-b_j=0$ hit by hit, while E+M has $-Ra_j-b_j=-\mathbf u\cdot\mathbf E_j$, whose complete signed sum vanishes exactly at tangential balance. Infinitesimal rigid tilts give $\chi_1(i\omega)=\chi_3(-i\omega)=0$ at complete balance, by three-dimensional rotational covariance of the selected dot-product law. Failure of these controls indicates a missing root, source-acceleration, receiver or rotating-frame term. They do not indicate stability, and their formal values at an unbalanced candidate cannot be used to certify a spectrum.

## 6. Certified reference and frozen Cartesian screening

The [independent ring reference](maxwell-shaped-overnight-independent-ring.md) subsequently enclosed the unique tangential zero in $0.42911716183<\beta_*<0.42911716184$, proved inward radial coefficients and positive separate radii, and verified the complete root census and acceleration equations. The independently directed radius enclosures are $2.06783883306<r_E<2.06783883308$ and $2.55921061613<r_{E+M}<2.55921061616$. Thus the reference for the following variation is a complete smooth circular solution for each selected law. The initial freeze statements in Sections 1–5 record the stage before that certification; no spectrum was used to establish balance.

### Exact spatial sector reduction

Use local member frames and a discrete Fourier sector $m\in\{0,1,2,3\}$:

$$
\mathbf z_i=Q(\alpha_i)e^{im\alpha_i}\mathbf w.
$$

The complete coefficient and root list at receiver $i$ is the rotation of that at receiver zero, with partner offset $j$ carrying the same polarity product $(-1)^j$ and the same delay $\tau_j$. Hence every receiver residual is $Q(\alpha_i)e^{im\alpha_i}$ times the receiver-zero residual. This is an exact invariant spatial subspace of the full Cartesian neutral operator, not an imposed ring preparation. Reflection in the base plane splits its three-dimensional block into a two-dimensional planar block $B_m(\lambda)$ and the scalar vertical block $\chi_m(\lambda)$ from Section 5. The planar block is obtained by inserting $\mathbf w=(1,0,0)$ and $(0,1,0)$ in Section 4 and taking the first two components of the receiver-zero residual. Invertibility of the discrete Fourier transform gives the exact characteristic factorization, up to its constant change-of-basis normalization,

$$
\det\mathcal K(\lambda)=\prod_{m=0}^3\det B_m(\lambda)\,\chi_m(\lambda).
$$

All delayed-acceleration terms remain in both factors. In sector $m=2$, the phase is real $(-1)^i$, so $B_2$ has real entries for real $\lambda$. A positive-real zero of its determinant is therefore a Cartesian linear growing mode. Its local radial and tangential perturbations alternate with member index; it is outside uniform-radius ring symmetry. A vertical growing mode likewise lies outside the imposed planar symmetry.

### Controls, freeze and measured witnesses

The separately authored subject [Cartesian characteristic instrument](../evidence/maxwell-shaped-overnight-ring-characteristic.py) first checked the known static inverse-square differential $(I-3\mathbf n\mathbf n^{\mathsf T})\Delta\mathbf x/R^3$ and the independently known transverse delayed-acceleration coefficient $-1/R$ at a static hit. It then passed common translation, common affine vertical motion, both tilt modes and in-plane rigid rotation on the certified ring, with residuals below $5\times10^{-61}$. Its full twelve-component operator and separately coded vertical specialization agree below $10^{-50}$ for all four spatial sectors at a nontrivial complex test parameter. These are calibration and implementation checks; the independently built potential-derivative reference is required to assess the general variation.

The Cartesian instrument was frozen before its target root screen. Its declared dimensionless box was $0<\operatorname{Re}(\lambda/\omega)<8$, $|\operatorname{Im}(\lambda/\omega)|<12$, with six real seed values and integer imaginary seeds from $-11$ to $11$ for each vertical sector. At 60 decimal digits it measured the following growing vertical roots; their conjugates lie in the conjugate spatial sector:

| Selected law | Sector with positive imaginary part | Measured characteristic parameter | Full Cartesian residual |
| --- | --- | --- | --- |
| E | $m=3$ | $\lambda\simeq0.02135268760361724+0.2150676194267515i$ | below $3\times10^{-62}$ |
| E+M | $m=3$ | $\lambda\simeq0.007858681922622623+0.1332477514951012i$ | below $9\times10^{-63}$ |

The separate [planar-sector instrument](../evidence/maxwell-shaped-overnight-ring-planar-characteristic.py) uses the unchanged frozen full Cartesian implementation. Before its target it checked the analytically known static $m=2$, $\lambda=0$ block $\operatorname{diag}(1/\sqrt2+1/2,-\sqrt2-1/4)$, directly obtained from the three stationary hit differentials. This static control is an algebraic calibration, not a spectrum about a static equilibrium. The planar source was frozen before screening real $0.05\le\lambda/\omega\le4$ from the nine declared real seeds. It measured

| Selected law | Sector | Measured positive-real parameter | Local radial/tangential eigenvector | Full Cartesian residual |
| --- | --- | --- | --- | --- |
| E | $m=2$ | $\lambda\simeq0.3138917268102317$ | $(0.5847958815,0.8111804836)$ | below $7\times10^{-62}$ |
| E+M | $m=2$ | $\lambda\simeq0.2110794100112759$ | $(0.6775629532,0.7354647812)$ | below $4\times10^{-62}$ |

These are measured candidate witnesses from independently selected bounded search boxes, reproduced by the separately frozen potential-derivative reference. Small floating-point residuals alone do not enclose a zero; the reference's directed determinant face-sign certificate must be assessed before promoting an exact positive root. The finite screens do not claim a complete characteristic census, a stable complement, nonlinear instability or evolved fate. Once a positive characteristic witness is certified on the exact balanced history, it suffices to exclude linear stability to unrestricted Cartesian perturbations. The full coupled persistence question remains distinct.

Reproduction commands are the shared-venv Python invocations of the Cartesian source with `--controls --screen` and of the planar source without arguments. Frozen source copies, declared pre-target SHA-256 digests after the standard `abc` control, known-case records and full measured outputs are retained under `.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-equation-domain/`; the subject sources are tracked reproduction inputs. An independently checked root with a nonpositive real part, a failed exact sector reduction, an omitted source-acceleration term or a balance interval failing to contain the evaluated base would overturn the corresponding witness. Failure to find an additional root in the finite screen says nothing about excluded search domains.

### Independent positive-root disposition

The [independent directed sign certificate](maxwell-shaped-overnight-independent-ring.md#certified-growing-cartesian-modes) then established opposite strict signs of the real $m=2$ determinant on the entire certified balance enclosure: negative at $\lambda=0.3138916$ and positive at $0.3138919$ under E, and negative at $0.2110793$ and positive at $0.2110796$ under E+M. Its unchanged nested potential-derivative reference supplies independent mathematical evidence for the explicit-numerator subject. Continuity of the real characteristic determinant on the ordinary complete root chart proves at least one exact positive real characteristic root in each bracket; neither a complex root enclosure nor uniqueness is needed. The exact sector reduction above then supplies a nonzero allowed Cartesian growing perturbation. Both separate complete circular solutions are therefore **derived linearly unstable** to a shape perturbation beyond uniform ring symmetry. This is the strongest certified ring conclusion here; the vertical complex candidates remain measured, and no nonlinear fate is inferred.

Review inspected the independent wrapper's propagation of the complete beta/radius/half-angle boxes, exact quarter-turn signs, root-shift source jerk and delayed acceleration. The shared-venv invocation of `maxwell-shaped-overnight-independent-real-mode-certificate.py --target --output` reproduced its known derivative/determinant controls and strict face signs into the distinct local review receipt `reviewed-independent-real-mode-certificate.json`, without modifying the reference. That replay is a review receipt; the independently constructed nested-potential reference and directed sign proof are the evidence for correctness. The finite subject screens agree with the two certified brackets but do not supply their existence proof.

## 7. Compatible complete growing-mode perturbation family

This section fixes an analytical preparation family before any numerical target use. It uses each certified exact ring separately, its exact positive real $m=2$ characteristic root in Section 6's bracket, and any real unit planar null vector $\mathbf w$ of $B_2(\lambda)$. The root bracket and a selected unit null vector are part of a particular complete case specification; a numerical experiment must freeze their explicit values and implementation before launch. They are not adjustable coefficients of the response law.

For $T\le0$, set

$$
\widetilde{\mathbf X}_i^\varepsilon(T)=
\mathbf X_i^0(T)+\varepsilon r e^{\lambda T}Q(\omega T)(-1)^iQ(\alpha_i)\mathbf w.
$$

This is a complete separated smooth past for sufficiently small signed $\varepsilon$. Its perturbation and every derivative decay toward the remote past, with velocity perturbation norm at most $|\varepsilon|r(\lambda+\omega)$. The baseline speed margin is fixed and its pair clearance is positive. Complete partner-root uniqueness, no positive-delay self root and positive transmitter denominators follow from the common strict-speed bound; these are consequences of the perturbed complete past, not imposed root deletion.

The endpoint acceleration residual

$$
\Delta\mathbf a_i(\varepsilon)=
\mathcal F_i[\widetilde{\mathbf X}^\varepsilon](0)
-\widetilde{\mathbf X}_i^{\varepsilon\,\prime\prime}(0)
$$

is $O(\varepsilon^2)$. The constant and linear terms vanish by complete balance and the exact full Cartesian characteristic equation, including emission shifts and delayed source acceleration. Let $\tau_{\min}>0$ be the minimum baseline partner delay. Fix a patch width $0<d<\tau_{\min}/8$ and shrink the allowed $|\varepsilon|$ so all perturbed launch partner emissions remain earlier than $-2d$. Add the terminal patch

$$
\mathbf X_i^{\phi,\varepsilon}(T)=
\widetilde{\mathbf X}_i^\varepsilon(T)
+\begin{cases}
0,&T\le-d,\\
\tfrac12\Delta\mathbf a_i(\varepsilon)T^2(1+T/d)^3,&-d\le T\le0.
\end{cases}
$$

It leaves endpoint position and velocity unchanged and raises endpoint acceleration by exactly $\Delta\mathbf a_i$. Every launch hit samples the unpatched older history, and the receiver endpoint is unchanged; thus the law's input at launch is unchanged and this is exactly compatible. The complete past is $C^{2,1}$, with fixed positive separation, speed margin, delay floor and denominator floor for sufficiently small $|\varepsilon|$. This construction permits independent three-dimensional future evolution; only the first-order preparation chooses the already certified planar shape mode. It supplies no future ring constraint.

**Derived subject, review pending: fixed-horizon linear comparison.** For each fixed finite horizon $L>0$, sufficiently small $|\varepsilon|$ yields a unique ordinary-root coupled solution on $[0,L]$, and on that interval

$$
\max_i\|\mathbf X_i^\varepsilon(T)-\mathbf X_i^0(T)
-\varepsilon r e^{\lambda T}Q(\omega T)(-1)^iQ(\alpha_i)\mathbf w\|_{C^2([0,L])}
\le C_L\varepsilon^2.
$$

To obtain this finite-horizon estimate, take fixed method-step intervals shorter than one quarter of the baseline delay floor. The base and mode jets are smooth and bounded on the complete sampled window. Root changes are $O(\varepsilon)$ by the strict denominator floor, and their second-order remainder is bounded on that smooth reference. The old terminal correction is uniformly $O(\varepsilon^2)$ in its first two derivatives because its width is fixed. At each successive step the source-position/velocity/acceleration errors enter linearly bounded ordinary hit derivatives; even a shifted evaluation of the already bounded $O(\varepsilon^2)$ acceleration error remains $O(\varepsilon^2)$, while reference and mode shifts admit their smooth Taylor expansions. The current receiver position and velocity enter an ordinary locally Lipschitz step equation. Its integral error inequality bounds the current $C^2$ error by a finite multiple of the prior-step error plus $\varepsilon^2$. Induction across finitely many steps proves the displayed estimate and closes the strict-margin geometry for sufficiently small $|\varepsilon|$ depending on $L$. No small neutral gain is required for a fixed finite number of positive-delay steps.

This is a controlled infinitesimal growing-mode comparison on each fixed horizon. It does not bound $C_L$ uniformly as $L\to\infty$, cannot exchange the limits $L\to\infty$ and $\varepsilon\to0$, and does not prove nonlinear instability, escape or capture. A most decisive retained perturbation experiment would freeze one such compatible case, evolve its full Cartesian future with an independent history/root method, and check the mode projection against $e^{\lambda T}$ on an early interval while separately recording all domain events. A failed fixed-horizon second-order error bound within the stated ordinary-root boxes would falsify the local comparison theorem; departure of a finite perturbation at later time cannot by itself establish that theorem's uniformity or nonlinear fate.

## 8. Directed out-of-plane characteristic disks

This separate subject freezes a complex-root witness after the scalar vertical operator and independent Cartesian reference were already fixed. It preserves the earlier bounded screen and the certified planar instability. For each selected law choose the measured $m=3$ center in Section 6, with its literal center retained in the [separate directed disk source](../evidence/maxwell-shaped-overnight-vertical-root-certificate.py), and disk radius $\rho=10^{-7}$. The full certified beta, radius, source half-angle, delay, denominator and tangential E-coefficient enclosures determine the scalar vertical coefficients; no rounded center is substituted for an exact circular solution.

For the fixed exact history write $f=\chi_3$ and $z_0$ for the declared center. Directed complex arithmetic encloses $f(z_0)$ and $f'(z_0)$. A closed-form second-derivative bound on $|z-z_0|\le\rho$ follows from $P_j(z)=a_j-b_jz-c_jz^2$:

$$
|f''(z)|\le2+\sum_j e^{-\tau_j(\operatorname{Re}z_0-\rho)}
\{\tau_j^2[|a_j|+|b_j|L+|c_j|L^2]
+2\tau_j[|b_j|+2|c_j|L]+2|c_j|\},
\quad L=|z_0|+\rho.
$$

Positive $\operatorname{Re}z_0-\rho$ makes the exponential upper bound use the interval's minimum delay, while polynomial factors use their maximum delays and coefficient moduli. Exact spatial phases have modulus one. Let the directed upper bounds be $\eta\ge|f(z_0)|$, $M\ge\sup|f''|$, and lower bound $d\le|f'(z_0)|$. Taylor's integral remainder gives

$$
|f(z)-f'(z_0)(z-z_0)|\le\eta+\tfrac12M\rho^2
<d\rho\le|f'(z_0)(z-z_0)|
$$

on the disk boundary. The elementary holomorphic zero-count comparison therefore gives exactly one characteristic zero, counting multiplicity, inside the disk. This theorem concerns the scalar vertical characteristic function, rather than a finite grid or a nonlinear stability result.

The instrument first passed exact complex modulus-five and multiplication controls and the known polynomial disk for $z^2-1$ centered at one, before target use. Its source and literal centers were frozen before the disk evaluation. Directed outward certificates from the complete balance boxes give the following conservative readable bounds:

| Selected law | $\eta$ upper | $d$ lower | $M$ upper | Remainder side $\eta+M\rho^2/2$ | Linear side $d\rho$ |
| --- | --- | --- | --- | --- | --- |
| E | $4\times10^{-28}$ | $0.4235$ | $9.066$ | below $4.534\times10^{-14}$ | above $4.235\times10^{-8}$ |
| E+M | $4\times10^{-28}$ | $0.2895$ | $7.465$ | below $3.734\times10^{-14}$ | above $2.895\times10^{-8}$ |

**Derived directed subject, independent assessment pending.** Each law has one exact $m=3$ vertical characteristic root within $10^{-7}$ of its displayed measured center, with positive real part at least $0.02135258$ under E and $0.00785858$ under E+M. Real coefficients supply a conjugate root in sector $m=1$. This would certify an out-of-plane growing mode in addition to the already independently certified planar shape mode. The required independent assessment concerns the scalar coefficient specialization, derivative enclosure and analytic remainder bound; passing the target arithmetic alone does not supply that assessment. No full characteristic census or nonlinear fate is asserted.

Reproduction uses the shared-venv Python command for `maxwell-shaped-overnight-vertical-root-certificate.py --target --output`, with the matching ignored owner retaining `vertical-root-known.json`, `frozen-vertical-root-certificate.py` and `vertical-root-certificate.json`. The pre-target source digest follows a known `abc` SHA-256 check. The independent outward endpoint exporter is imported without editing it. An omitted delayed-acceleration coefficient, wrong phase, derivative bound failing anywhere in the disk, or a non-strict zero-count inequality would falsify this witness.

## Falsifiers and review boundary

An extra positive-delay root, a zero transmitter denominator in the declared speed box, a nonpositive enclosed radius, or a nonzero full tangential/radial residual falsifies the proposed reference. A missing root-shift term, delayed second derivative or rotating-frame generator term falsifies the variational equation. A spectrum evaluated at rounded candidate values before complete balance is certified is outside this source's authority. The equation/variation derivation is assessed by the separately frozen potential-derivative reference and its directed positive-root certificate. The resulting grade is a complete circular solution and a certified Cartesian linear growing mode for each separate law; nonlinear fate remains unproved. Known-case and syntax checks do not substitute for the independent mathematical evidence.

## Subsequent independent successor assessment

The [independent compatible-mode reference](maxwell-shaped-overnight-independent-ring.md#independent-compatible-mode-preparation-and-finite-window-comparison) fixed its ancient decaying mode, endpoint residual correction and finite-horizon method-step argument before inspecting Section 7, then accepted its exact compatible preparation and $O_L(\varepsilon^2)$ coupled comparison. The [independent complex-disk reference](maxwell-shaped-overnight-independent-ring.md#independent-complex-disk-enclosure-reference) fixed its scalar derivative and analytic disk bound before inspecting Section 8's wrapper, verified the complete parameter-box scaling, exact phases and delay-dependent exponential bounds, and accepted the two positive-real out-of-plane disks. Thus both the planar shape and vertical growing-mode witnesses are now derived linear instability results; nonlinear fate and a full characteristic census remain unproved.

Artifact identification is explicit: the unchanged directed vertical Python source and its frozen Python copy have SHA-256 `e6dd5c31997ff7c12d8174225284a6dbaeba4777198db1d6b7a284e8c3f9900d`, while the distinct full Markdown freeze through Section 8 has SHA-256 `0261f6d5a4d065f35b35adc8fa08cf4ee579b99ef4347eb3cbd20dfe109c2ae7`. A shared-venv SHA-256 check after the standard `abc` case confirmed these different artifact identities; they do not describe a script change. The original source, snapshots and target receipts are preserved.
