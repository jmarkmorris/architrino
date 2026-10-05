# Independent adjudication of Cartesian robustness of the finite-width unit event

## Verdict and exact scope

**Claim grade: derived.** The [Cartesian robustness subject](alternatives-screen-2026-10-05-width-cartesian-unit-robustness.md) supports its finite-event theorem for each of the four fixed positive-width, positive-core laws. A sufficiently small neighborhood of its complete compatible planar preparation, taken relative to the exact acceleration-compatibility constraint in the stated complete $C^2$ norm, retains a finite first unit-speed event at separation greater than $198$. Each member has one upward transverse unit crossing near its base crossing. The first of those two crossings is the pair's first event; equality of their times is not required and is not asserted to persist.

The neighborhood contains complete histories that break the mirror relation and are not contained in any common affine plane. The endpoint correction proving this fact is a contraction for six independent Cartesian acceleration components, rather than a symmetry-restricted construction. The conclusion concerns this finite crossing only. It supplies no later-fate, stable-binding, sharp-width-limit or arbitrary-history conclusion.

The independent reconstruction below verifies the two essential transfers: complete-age spatial Lipschitz bounds imply uniform closeness of the actual coupled futures, and uniform velocity/acceleration closeness preserves an isolated transverse first crossing. The already assessed base event is also reconstructed at the level needed for those transfers. No numerical evolution or newly built numerical instrument is used.

## The selected integral law and complete preparation

For labels $i,j\in\{1,2\}$ let $\sigma_{ii}=1$ and $\sigma_{ij}=-1$ for $i\ne j$. The selected [finite-width law](../../equation-variants/manuscript.md#11-finite-width-wake-reception), with $K_{ij}=c_f=1$, is

$$
X_i''(T)=\mathcal A_i(X)_T
=\sum_{j=1}^2\sigma_{ij}\int_0^\infty
G_\tau\bigl(X_i(T)-X_j(T-\tau)\bigr)\,d\tau,
$$

$$
G_\tau(z)=F_\rho(z)w_h(|z|-\tau),\qquad
F_\rho(z)=\frac{z}{(|z|^2+\rho^2)^{3/2}},\qquad
w_h(g)=\frac{(1-|g|/h)_+}{h}.
$$

The source age is $\tau\ge0$; every source age, including the self channel and the complete old tail, is integrated. The four independent choices are $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$. The spatial core $\rho$ is strictly positive, so the vector input is defined at spatial coincidence. This is the selected modified acceleration equation, not a sharp-root approximation.

For each law its base complete past is $X_1^0=q_A$, $X_2^0=-q_A$, where

$$
q_A(S)=100e_x+\tfrac12S e_y+C_\delta(S)A,\qquad
C_\delta(S)=\frac{(S+\delta)_+^3}{6\delta},\quad S\le0,
\qquad \delta=2^{-24}.
$$

The planar coefficient $A$ is the compatible release-acceleration fixed point in $|A|\le2^{14}$. Its complete past is separated and $C^{2,1}$, with speed at most $1/2+1/2048<1$. The [base assessment](alternatives-screen-2026-10-05-width-planar-independent-assessment.md), [event subject](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-unit-event.md) and [transversality supplement](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-transversality.md) establish its common mirror-member first event $T_*<1/6$, separation greater than $199$, and $d|V_i^0|/dT>1$ at $T_*$.

The perturbation topology in the reviewed subject is

$$
\max_i\sup_{S\le0}\sum_{k=0}^2
\left|\phi_i^{(k)}(S)-(X_i^0)^{(k)}(S)\right|<\epsilon.
$$

This is a norm on differences of histories. The affine tails themselves are unbounded in position, which poses no difficulty. Each perturbed history is complete, $C^{2,1}$, and exactly compatible with its own full acceleration functional at zero. The norm imposes no mirror symmetry, common center or common plane. Uniform old-time control, rather than compact-old-time convergence alone, is used in the following theorem.

## Independent full-age bounds, including interpolation and corners

The maximum core magnitude is $M_\rho=2/(3\sqrt3\rho^2)$. It follows by maximizing $r/(r^2+\rho^2)^{3/2}$, whose radial derivative vanishes at $r=\rho/\sqrt2$. The derivative of $F_\rho$ has two tangential eigenvalues $(r^2+\rho^2)^{-3/2}$ and radial eigenvalue $(\rho^2-2r^2)/(r^2+\rho^2)^{5/2}$. Therefore

$$
\|DF_\rho(z)\|\le\rho^{-3},\qquad
|F_\rho(z)|\le r^{-2},\quad
\|DF_\rho(z)\|\le2r^{-3}\quad(r>0).
$$

For the global derivative bound, write $s=r^2/\rho^2\ge0$ and observe $(1-2s)^2\le(1+s)^5$; the tangential bound is immediate. These bounds are dimension independent and hence apply to unrestricted Cartesian displacements.

For $0\le\tau\le2h$, the window has height at most $1/h$ and Lipschitz constant $1/h^2$. Thus

$$
|G_\tau|\le\frac{M_\rho}{h},\qquad
\operatorname{Lip}(G_\tau)\le\frac1{h\rho^3}+\frac{M_\rho}{h^2}.
$$

For $\tau\ge2h$, a nonzero window or a nonzero almost-everywhere derivative requires $r\ge\tau-h\ge\tau/2$. Consequently

$$
|G_\tau|\le\frac4{h\tau^2},\qquad
\operatorname{Lip}(G_\tau)\le\frac{16}{h\tau^3}+\frac4{h^2\tau^2}.
$$

The Lipschitz bound is global in $z$ for each age, not just a bound evaluated at the two endpoint displacements. To see this, interpolate those displacements along a straight segment. The composed core-window product is absolutely continuous on that segment. At almost every point where its derivative is nonzero, the same active-shell lower range bound holds; where the shell is inactive the product and its derivative vanish. Integrating the derivative along the segment gives the stated Lipschitz constant. A segment passing through a window corner or through $z=0$ causes no exception: the window and norm are Lipschitz, and the core is smooth. In the large-age part, a neighborhood of $z=0$ is outside support altogether.

Integrating the short-age and tail majorants gives, per source channel,

$$
\int_0^\infty|G_\tau|\,d\tau\le
B,\qquad B=\frac4{3\sqrt3\rho^2}+\frac2{h^2},
$$

$$
\int_0^\infty\operatorname{Lip}(G_\tau)\,d\tau\le
L,\qquad L=\frac2{\rho^3}+\frac4{3\sqrt3h\rho^2}+\frac4{h^3}.
$$

For example, the two tail derivative integrals are each $2/h^3$. These complete-age majorants are independent of source trajectory, source speed and reception time. They do not require any unique-root or monotone source-clock assertion.

If $d(T)=\max_j\sup_{S\le T}|X_j(S)-Y_j(S)|$ is finite, the displacement discrepancy in each channel is at most $2d(T)$. There are two channels, so

$$
|\mathcal A_i(X)_T-\mathcal A_i(Y)_T|\le4L\,d(T)=\Lambda d(T),\qquad \Lambda=4L.
$$

The signs $\sigma_{ij}$ cannot increase the triangle-inequality bound. This verifies the subject's constant for independent receiver and source perturbations, including perturbations of both labels. It is not a bound restricted to shared prescribed source histories.

**Claim grade: derived. Falsifier:** a nonintegrable tail contribution, a segment on which the active-shell derivative exceeds its majorant, or a further omitted source channel would defeat this estimate. None is needed or omitted for the selected two-label law.

## Actual coupled futures depend continuously in acceleration as well as velocity

The acceleration bound $|\mathcal A_i|\le2B$ and the global functional Lipschitz constant also reconstruct unrestricted global forward existence. For a fixed complete continuous past and finite release velocities, the twice-integrated position map is contractive on a sufficiently short forward interval, with contraction factor at most $\Lambda t^2/2$. The old past remains fixed in that map. Iteration gives uniqueness, and the uniform acceleration bound prevents finite-time velocity or position blowup. The same short-step construction can therefore be continued over every finite time interval. Dominated convergence using the complete-age magnitude majorant gives continuous acceleration for every continuous joined trajectory. Exact compatibility makes its acceleration agree with the supplied left endpoint jet.

For a perturbed solution and its base, define $P(t)$ as the maximum position discrepancy over both labels and all $S\le t$, and $Q(t)$ as the maximum velocity discrepancy over both labels and $0\le S\le t$. The complete-history norm gives

$$
P(t)\le\epsilon+\int_0^tQ(s)\,ds,\qquad
Q(t)\le\epsilon+\Lambda\int_0^tP(s)\,ds.
$$

Thus $D=P+Q$ obeys $D(t)\le2\epsilon+(1+\Lambda)\int_0^tD(s)\,ds$, and direct Gronwall integration yields

$$
P(t)+Q(t)\le2\epsilon e^{(1+\Lambda)t},\qquad
\max_i|A_i(t)-A_i^0(t)|\le2\Lambda\epsilon e^{(1+\Lambda)t}.
$$

These constants are deliberately conservative and may be large. Their finiteness, not a useful numerical perturbation radius, is what establishes the existential neighborhood. They control the two actual coupled futures uniformly through any fixed $T_1$, because each acceleration is evaluated on its own generated history. There is no dependence on a prescribed unchanged future source path.

Smallness in the given history norm also retains the complete supplied speed margin and separation. The base speed is at most $1/2+1/2048$ and each perturbed velocity differs by at most $\epsilon$. The base old-time separation has a uniform positive lower bound from its horizontal coordinates, and the relative-position perturbation is at most $2\epsilon$. Hence sufficiently small perturbations remain separated and uniformly subfield over the whole negative-time half-line.

**Claim grade: derived. Falsifier:** failure of the complete past difference norm to be finite, or loss of the global acceleration/Lipschitz estimates, would invalidate this transfer. Compact convergence on old-time intervals alone is not substituted for the stated topology.

## The base event supplies an isolated transverse first crossing

The base event is a property of its actual future. A short reconstruction of the independent assessment identifies the quantitative margins being transferred. Before first unit speed and for $T\le1/6$, the member's horizontal coordinate satisfies $q_x(T)\ge100-2^{14}\delta^2/6-1/6$. All partner ranges are therefore at least $L_0=200-2^{14}\delta^2/3-1/3>199$. Integrating the complete partner tail gives

$$
|A_{\rm partner}|\le\frac1{h(L_0-2h)}<\frac16.
$$

No omitted remote source band is required for this estimate. On the self-age strip $[h/4,h/2]$, a complete positive longitudinal velocity lower bound $V_y\ge q_*>0$, together with speed at most one, gives

$$
A_{{\rm self},y}\ge
\frac{q_*h}{32[(h/2)^2+\rho^2]^{3/2}}>8q_*.
$$

The other self contributions are nonnegative in that component. At the compatible release the longitudinal acceleration exceeds three, and its complete supplied history has $V_y\ge1/2$. A first-loss argument preserves this barrier before unit speed and gives $V_y'>3$, forcing a first event before $1/6$.

For transversality, the independent moving cone is $|V_x|\le\kappa(T)V_y$, with $\kappa=1/1000+T/2$ for future time and $1/1000$ on the supplied past. The self integral preserves the current expanding cone because each displacement is an integral of earlier velocities in narrower cones. At a possible cone boundary,

$$
\frac d{dT}(\kappa V_y\pm V_x)
\ge\tfrac12V_y-\sqrt{1+\kappa^2}|A_{\rm partner}|>0.
$$

Since $\kappa<1/10$ through $T=1/6$, the cone and the self-strip estimate give at first unit speed

$$
V\cdot A\ge(1-\kappa^2)V_yA_{{\rm self},y}-|V||A_{\rm partner}|
>\frac{99}{100}\frac12\,4-\frac16>1.
$$

At unit speed this is precisely $d|V|/dT>1$. Continuous acceleration carries the inequality to the endpoint and slightly beyond it. The softened global law, not an additional speed response, defines that continuation. The second member shares the event by the base mirror symmetry.

## First-event localization survives, while simultaneous crossing may split

Choose $0<t_-<T_*<t_+<1/6$ sufficiently close to the base event that each base speed is nonzero and has derivative above $3/4$ on $[t_-,t_+]$, its endpoint values straddle one, and base separation is greater than $198$ on $[0,t_+]$. The first-event property and compactness give a strict earlier margin

$$
m=1-\max_i\max_{0\le T\le t_-}|V_i^0(T)|>0.
$$

This strict margin is indispensable. A transverse crossing near $T_*$ alone would not exclude an earlier perturbed first crossing. Here the margin follows from continuity and the definition of the base first event, because $t_-<T_*$.

The complete-history and finite-time bounds allow $\epsilon$ small enough to preserve this earlier margin, both strict endpoint inequalities, and separation greater than $198$. On the final short interval, the map $(V,A)\mapsto V\cdot A/|V|$ is uniformly continuous on a compact neighborhood of the nonzero base velocities and bounded accelerations. Uniform velocity/acceleration closeness therefore ensures

$$
\frac d{dT}|V_i(T)|>\frac12\qquad(t_-\le T\le t_+).
$$

Each perturbed member has exactly one upward unit crossing in this interval by the intermediate value theorem and strict monotonicity, and no earlier crossing by the earlier margin and subfield supplied past. The minimum of the two crossing times is the pair's first event. The argument permits two distinct crossing times and proves transversality separately at each; no implicit-function theorem for a simultaneous double event is used.

The crossing times tend to $T_*$ as the history perturbation tends to zero. For example, at the base crossing the perturbed speed error is bounded by the uniform velocity error, and its derivative exceeds $1/2$ on the localization interval; the perturbed root-time error is at most twice that speed error. This supplies the claimed closeness of crossings, not merely their eventual existence.

The same construction can be performed separately for all four fixed laws, then their positive neighborhood radii can be minimized. This produces one existential common radius measured relative to each law's own base history. It does not identify the different base solutions or assert uniformity over a continuum of widths and cores.

**Claim grade: derived. Falsifier:** a compatible sequence converging in the stated norm whose crossing times fail to approach $T_*$, or whose first event loses the separation or transverse derivative margin, would contradict the displayed finite-time estimate and earlier compact speed margin. Equality of the two crossing times is not protected and its loss is not a counterexample.

## Exact compatibility admits independent Cartesian perturbations

Let $\psi_1,\psi_2$ be any sufficiently small complete $C^{2,1}$ perturbations with bounded first two derivatives and bounded positions relative to the base. Define

$$
\phi_i^B=X_i^0+\psi_i+C_\delta B_i,\qquad
B=(B_1,B_2)\in\mathbb R^6,
$$

where the same $C_\delta$ as above is zero before $-\delta$ and satisfies

$$
\|C_\delta\|_\infty=\delta^2/6,\qquad
\|C_\delta'\|_\infty=\delta/2,\qquad
\|C_\delta''\|_\infty=1,
\qquad C_\delta''(0)=1.
$$

The polynomial and its first two derivatives join continuously to zero at the old seam, with a Lipschitz second derivative. It changes release position and velocity by small quantities, which is permitted in the declared class. It is not incorrectly treated as a patch preserving those jets.

Since the base is exactly compatible, $(\phi_i^B)''(0)=A_i^0(0)+\psi_i''(0)+B_i$. Thus exact compatibility for the perturbed full equation is equivalent to

$$
B_i=\mathcal A_i(\phi^B)_0-A_i^0(0)-\psi_i''(0)=:\mathcal T_i(B).
$$

Use the norm $|B|_*=\max_i|B_i|$. The complete-history position difference under a coefficient change is at most $(\delta^2/6)|B-\widetilde B|_*$. The preceding two-label functional bound gives

$$
|\mathcal T(B)-\mathcal T(\widetilde B)|_*
\le k|B-\widetilde B|_*,\qquad k=\Lambda\delta^2/6.
$$

For the selected parameters, using $4/(3\sqrt3)<4/5$ gives

$$
L<2\cdot64^3+\frac45\cdot32\cdot64^2+4\cdot32^3
=760217.6<2^{20}.
$$

Consequently $\Lambda<2^{22}$ and $k<2^{-26}/6<1/2$ because $\delta^2=2^{-48}$. These are elementary exact inequalities with a terminating rational decimal in the intermediate upper bound, not numerical trajectory evidence.

If $\|\psi\|_{C^2}\le\eta$, then $|\mathcal T(0)|_*\le(\Lambda+1)\eta$. The closed ball of radius $(\Lambda+1)\eta/(1-k)$ is invariant, and the contraction gives a unique compatible coefficient with the same bound. In particular $B\to0$ as $\psi\to0$, and

$$
\|\phi^B-X^0\|_{C^2}
\le\eta+(1+\delta/2+\delta^2/6)|B|_*\longrightarrow0.
$$

Thus the exact compatible set has arbitrarily small nonsymmetric members in the specified topology. Its being constrained does not make the relative-neighborhood theorem empty.

For a concrete geometric witness, choose a smooth compactly supported normal pulse on member one only, supported strictly before $-\delta$, and no pulse on member two. Leave both tails unchanged outside that compact interval. The endpoint correction vanishes on the pulse interval and cannot cancel it. The two unchanged remote affine lines are distinct parallel lines whose affine span is exactly the original plane. Any common affine plane containing the complete perturbed histories would have to contain those lines and hence equal that plane, but the pulse leaves it. Likewise the remote tails fix the mirror center, while the one-member pulse violates the mirror relation there. This constructs genuinely nonmirror and noncoplanar complete compatible histories; no rigid motion of the base can produce them. Sufficiently small amplitudes preserve the complete separation and speed margins already proved.

**Claim grade: derived. Falsifier:** a missing position contribution to the release acceleration map, an incorrect endpoint second derivative, or a contraction factor at least one would invalidate the compatibility construction. The six independent components and the complete functional estimate explicitly account for both receivers and both sources.

## Boundaries, frozen identities and checks

The theorem is accepted for the full Cartesian class exactly as stated, with existential neighborhood size and fixed positive widths and cores. The unrestricted integral equation supplies both continued crossings. A strict subfield formulation stops at the earliest boundary, and an inclusive ceiling still requires a separately selected equality response. No conclusion about later physical fate, collision, escape, binding, a stable binary, or a sharp-root limit follows from the finite-event neighborhood.

Source identities measured by `shasum -a 256` before authoring this assessment are:

| Frozen source | SHA-256 |
| --- | --- |
| [Cartesian robustness subject](alternatives-screen-2026-10-05-width-cartesian-unit-robustness.md) | `45b3e771efcf42fbd7a2ab69eb876a55c5d2f61d93db265e4d6c949e693335c3` |
| [Planar independent assessment](alternatives-screen-2026-10-05-width-planar-independent-assessment.md) | `82471e819d9ae44cffb97207906e4581ff5299d0bf05c19d99ab966fac1205de` |
| [Planar event subject](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-unit-event.md) | `4e8baed82f3eaa5959ca921f22e7827f3db1aaf821b3e4fc71b97f54cf7f0ff9` |
| [Planar transversality subject](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-transversality.md) | `d502e73aee2ec212bd036255c3b8e019e35cc12b45752d9c15d7082a31b7b68c` |

The mathematical controls are the explicit core derivative eigenvalues, integrable age majorants, straight-segment Lipschitz reconstruction, actual coupled-future integral inequality, complete self-cone base argument, compact earlier speed margin and six-component contraction. No new test suite, target simulation, Python process, production solver or numerical perturbation threshold was introduced. Only this new assessment is authored for this second review; the subject and its dependencies remain untouched by it. Shared integration, Git publication and regeneration remain outside this review's scope.

Measured textual validation: `git diff --no-index --check /dev/null` on this new assessment emitted no whitespace diagnostics; exit status 1 denotes the new-file difference. Repeated `shasum -a 256` on the reviewed Cartesian subject returned its frozen identity above. These checks validate file identity and formatting, not the mathematics.
