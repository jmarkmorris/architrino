# Complete Cartesian robustness of positive-speed radial scattering

## Result and provenance boundary

**Grade: derived subject, pending separate independent assessment.** Fix $p=3$ or any one $p>3$, with $K=R_*=c_f=1$. Every fixed sufficiently small positive-speed member admitted by the [cubic assessment](alternatives-screen-2026-10-05-radial-cubic-adjudication.md) or [above-three assessment](alternatives-screen-2026-10-05-radial-above-three-adjudication.md) has a relative open neighborhood of complete compatible three-dimensional histories whose actual futures are global, separated and uniformly subfield, and scatter with distinct nonzero Cartesian terminal velocities. The neighborhood includes nonmirror and noncoplanar histories. No fixed-center or planar restriction is imposed on the equation or perturbation space.

The [analytical specification](alternatives-screen-2026-10-05-radial-scattering-robustness-specification.md) fixes the equation, complete-history topology and sufficient outgoing inequalities. This subject independently derives the root census, finite-time map and entry argument. It uses the assessed positive terminal speed as a premise and does not re-prove its near-circular selection. The [distant nonmirror scattering control](../../analysis/alternatives-screen-2026-10-05-independent-reference.md#explicit-distant-nonmirror-scattering-preparations) supplied the antecedent integrable-impulse idea; no old large-separation assumption is transferred to the present release. The forthcoming coordinating Cartesian robustness reference was not consulted.

The proof below gives an explicit sufficient tail inequality and an initial-neighborhood formula in terms of the fixed reference's finite-time bounds and terminal speed. Those constants have not been numerically enclosed. It gives no uniform neighborhood as launch speed tends to zero, no zero-terminal-speed robustness, and no stable binding. These are scattering neighborhoods; trajectories with different terminal velocities need not remain a bounded distance apart.

## Actual law and complete roots in three dimensions

Write $X_i(t)\in\mathbb R^3$, $V_i=X_i'$ for the two opposite-polarity labels. On the complete ordinary strictly subfield chart the selected sharp radial law is

$$
A_i(t)=X_i''(t)=-\frac{n_i(t)}{R_i(t)^pD_i(t)},\qquad j=3-i,
$$

$$
s_i=t-R_i,\qquad
R_i=|X_i(t)-X_j(s_i)|,\qquad
n_i=\frac{X_i(t)-X_j(s_i)}{R_i},\qquad
D_i=1-n_i\cdot V_j(s_i).
$$

This formula is the consequence of the complete root census, not an imposed restriction of the sum to a preferred root. The original self convention is unchanged. No additional same-time self prescription is introduced.

Suppose the complete paths through reception time $t$ have individual speed at most $b<1$, and current separation $d(t)=|X_1(t)-X_2(t)|>0$. For every delay $r\ge0$ define

$$
F_i(r)=r-|X_i(t)-X_j(t-r)|.
$$

For $r_2>r_1$, the speed chord inequality gives

$$
F_i(r_2)-F_i(r_1)\ge(1-b)(r_2-r_1).
$$

Also $F_i(0)=-d<0$ and $F_i(r)\ge(1-b)r-d\to\infty$. Thus there is exactly one partner root over the entire unbounded emission past. At that root, $D_i\ge1-b$, so it is simple. The displacement can vanish away from the root without affecting this monotonicity argument. For a self source, $|X_i(t)-X_i(t-r)|\le br<r$ for every $r>0$, excluding every positive-delay self root. None is deleted.

The same chord bound compares the received range with current separation:

$$
\frac{d(t)}{1+b}\le R_i(t)\le\frac{d(t)}{1-b},\qquad
1-b\le D_i(t)\le1+b.
\tag{1}
$$

Consequently, for $C_b=(1+b)^p/(1-b)$,

$$
|A_i(t)|\le C_bd(t)^{-p}.
\tag{2}
$$

These estimates include a source still in the supplied circular tail. They do not require that every old source be spatially distant, that the center be fixed, that velocities be mirrored, or that an instantaneous interaction replace the delay.

The exact source clock is also controlled. Implicit differentiation of $t-s_i=|X_i(t)-X_j(s_i)|$ gives

$$
s_i'(t)=\frac{1-n_i\cdot V_i(t)}{1-n_i\cdot V_j(s_i(t))},\qquad
\frac{1-b}{1+b}\le s_i'(t)\le\frac{1+b}{1-b}.
\tag{3}
$$

In particular every source clock advances through the entire initial window and eventually enters the generated future. For an entry time $T$,

$$
s_i(t)\ge s_i(T)+\frac{1-b}{1+b}(t-T).
\tag{4}
$$

All intervening source intervals are retained before this happens. The bounds (1)–(2) already control them, including times when $s_i<0$ or $s_i<T$.

## A sufficient Cartesian outgoing criterion

For this section the analytical criterion is valid for fixed $p>1$; the assigned application remains $p=3$ and separately fixed $p>3$. At time $T$, supply the entire compatible past through $T$, with complete individual speed at most $b_0<b<1$. Choose a fixed unit vector $e$ and define

$$
z_0=e\cdot[X_1(T)-X_2(T)]>0,\qquad
w_0=e\cdot[V_1(T)-V_2(T)].
$$

Choose $v>0$ and put

$$
I=\frac{C_bz_0^{1-p}}{(p-1)v}.
$$

The sufficient strict inequalities are

$$
I<b-b_0,\qquad 2I<w_0-v.
\tag{5}
$$

They imply global ordinary continuation with

$$
e\cdot[X_1(t)-X_2(t)]\ge z_0+v(t-T),\qquad
\sup_{i,t\ge T}|V_i(t)|\le b_0+I<b.
\tag{6}
$$

To prove this, bootstrap individual speeds below $b$ and projected relative velocity above $v$. The projected separation is then at least $f(t)=z_0+v(t-T)$. By the complete-root bound (2),

$$
|A_i(t)|\le C_bf(t)^{-p},\qquad
\int_T^\infty C_bf(t)^{-p}\,dt=I.
$$

The individual speed is at most $b_0+I$, and the projected relative velocity is at least $w_0-2I>v$. Both improve the bootstrap strictly. On every bounded time interval the separation and all positive delays have positive lower bounds, $D_i$ stays above $1-b$, and acceleration is bounded. The elementary positive-delay continuation argument in the next section therefore precludes a finite endpoint while these inequalities hold. Hence the bootstrap is global. No sign of the acceleration projection, torque conservation or central-energy premise is used.

Since acceleration is integrable, each velocity has a limit $U_i$, with

$$
e\cdot(U_1-U_2)\ge w_0-2I>v,
\qquad
|U_i-V_i(t)|\le\frac{C_b}{v(p-1)}f(t)^{1-p}.
\tag{7}
$$

Thus the terminal velocities are distinct. When $p>2$, the first moment of acceleration is integrable too, and there are vectors $a_i$ such that

$$
X_i(t)=U_i(t-T)+a_i+E_i(t),\qquad
|E_i(t)|\le\frac{C_b}{v^2(p-1)(p-2)}f(t)^{2-p}.
\tag{8}
$$

Indeed integrate $V_i-U_i$ to infinity using (7); this proves (8) without an assumed scattering theorem. At $p=3$ the velocity remainder is $O(t^{-2})$ and the position remainder is $O(t^{-1})$; for fixed $p>3$ the powers are those displayed above.

The relative direction has finite total spherical angular variation. Set $D=X_1-X_2$ and $W=U_1-U_2\ne0$. Equations (7)–(8) give $D=W(t-T)+a+O(t^{2-p})$ and $D'=W+O(t^{1-p})$. Therefore $|D\times D'|=O(1)$ for $p\ge3$, whereas $|D|\ge f(t)$. Thus $|(D/|D|)'|=O(t^{-2})$ on the late tail; the finite preceding interval contributes a finite amount because separation never vanishes. No common plane is required.

## Complete-history norm, finite-time map and continuation

Let $\bar H_i:(-\infty,0]\to\mathbb R^3$ be the complete supplied past of one fixed admitted mirror member, and let $\bar X_i$ denote that member continued into the future. The complete histories considered here have bounded position and velocity on the supplied half-line and are locally $C^{2,1}$. Use

$$
\|H-\bar H\|_{1,\infty}
=\max_i\sup_{S\le0}\max\{|H_i(S)-\bar H_i(S)|,|H_i'(S)-\bar H_i'(S)|\}.
\tag{9}
$$

The units are the selected $R_*=c_f=1$ units. The compatible class consists of such histories whose release accelerations equal their actual complete-root received accelerations. Openness below is relative to that class, with the metric (9); it is not a claim that compatibility is open among arbitrary endpoint jets. No smallness assumption on all past accelerations is hidden in the norm. Local $C^{2,1}$ regularity supplies the bounded acceleration needed on each compact source window.

The reference has a complete global speed bound

$$
B=\max_i\sup_{t\in\mathbb R}|\bar V_i(t)|<1.
$$

Here negative-time paths are prescribed, and positive-time paths are the admitted actual future. For any fixed finite $T>0$, set

$$
d_* =\inf_{t\le T}|\bar X_1(t)-\bar X_2(t)|>0,\qquad
M=\max_i\sup_{t\le T}|\bar X_i''(t)|<\infty.
\tag{10}
$$

These facts follow from the bounded compatible circle tail and patch, and the separated regular finite reference future. In particular the infimum in (10) includes the entire old past. Choose $b_1\in(B,1)$ and a tube size $\eta$ with $2\eta<d_*/2$ and $\eta<b_1-B$. Within the position/velocity tube of radius $\eta$, both paths have complete speed below $b_1$, current separation at least $d_*/2$, and partner ranges at least

$$
a=\frac{d_*}{2(1+b_1)}.
$$

Write $k=1-b_1$. Let $E(t)$ be the maximum position/velocity difference from the reference over both labels and every time $S\le t$. Comparing the two complete residuals at the same trial delay and using their monotonicity gives

$$
|R_i-\bar R_i|\le\frac{2E(t)}k,\qquad
|n_i-\bar n_i|\le\frac{4E(t)}{ka}.
\tag{11}
$$

At the differing source times, first compare the two source velocities at one common time, and then shift the reference velocity. Its acceleration bound $M$ gives

$$
|D_i-\bar D_i|
\le\left(1+\frac{4b_1}{ka}+\frac{2M}k\right)E(t).
\tag{12}
$$

This uses a bound on the reference acceleration only, so the estimate remains uniform when a nearby compatible history has large but locally bounded higher derivatives. Applying the mean value bound to $R^{-p}$ and $D^{-1}$ yields

$$
|A_i-\bar A_i|\le L E(t),\qquad
L=\frac{(4+2p)a^{-p-1}}{k^2}
+\frac{a^{-p}}{k^2}
\left(1+\frac{4b_1}{ka}+\frac{2M}k\right).
\tag{13}
$$

For $\delta=\|H-\bar H\|_{1,\infty}$, integrating the position and velocity equations gives

$$
E(t)\le\delta+(1+L)\int_0^t E(u)\,du,
\qquad E(t)\le\delta e^{(1+L)t}.
\tag{14}
$$

For completeness, the second inequality follows by setting $Q(t)=\delta+(1+L)\int_0^tE$, observing $Q'\le(1+L)Q$, and integrating the scalar inequality. It is not an imported perturbation theorem for delay equations.

Existence and continuation used in this comparison can also be seen directly. At a step start $t_0$, each source is at most $t_0-a$. Choose step length less than $ak/[2(1+b_1)]$. The upper source-clock bound $(1+b_1)/k$ then keeps every sampled source below $t_0-a/2$, in already constructed history. On such a step the complete implicit root is a locally Lipschitz function of reception position and time, by the residual slope $k$ and the known locally Lipschitz source velocity. The acceleration is therefore locally Lipschitz in the reception state on the tube. The integral map for $(X_i,V_i)$ is a contraction on a sufficiently short step because its Lipschitz constant is multiplied by step length; its iterates converge to a unique solution. Compatibility makes the acceleration continuous through release. Repeating this construction gives local $C^{2,1}$ regularity, since the known source position and velocity and the implicit source clock are locally Lipschitz at every positive range.

The full root remains in the already constructed history on each step: its initial positive-delay margin and the clock bound preserve that property, and (1) renews the margin after the step. The clock estimate initially holds by local implicit continuation and the velocity margin, so it prevents reaching the boundary of known source history during the step. One may shorten the step further for the local contraction without changing the finite-time estimate. On a compact interval, supplied source velocities have bounded acceleration and generated accelerations are bounded by (2); the acceleration formula then has a finite local Lipschitz constant, so the construction cannot accumulate at an interior finite endpoint while the tube margins persist.

Every sampled source in $0\le t\le T$ belongs to a fixed compact interval. If $G=\max_{0\le t\le T}|\bar X_1(t)-\bar X_2(t)|+2\eta$, equation (1) gives

$$
-\frac{G}{1-b_1}\le s_i(t)\le t-a.
\tag{15}
$$

The infinite earlier history has not been truncated: the globally monotone residual proves there is no additional root there. Its global velocity bound is retained through (9). Equations (11)–(15) therefore control the complete finite-time map, including the old circle, compatibility patch and every subsequently generated source interval.

If $\delta<\eta e^{-(1+L)T}/2$, (14) keeps the path strictly inside the tube for the entire interval. The continuation just proved then reaches $T$. This supplies an explicit sufficient finite-time continuity radius in reference-dependent quantities. The same local argument applies to the global outgoing bootstrap: on any finite prospective endpoint the strict speed, positive separation and delay margins persist and all source intervals remain compact, so another short step exists.

## Entry from each assessed positive-speed member

Fix one assessed member. Let its opposite terminal velocities be $u,-u$, put $s=|u|>0$, and set $e=u/s$. The admitted velocity convergence alone gives

$$
\bar z(t)=e\cdot[\bar X_1(t)-\bar X_2(t)]\sim2st,
\qquad
\bar w(t)=e\cdot[\bar V_1(t)-\bar V_2(t)]\longrightarrow2s.
$$

Define

$$
b_0=\frac{1+B}{2},\qquad b=\frac{1+b_0}{2},\qquad v=\frac s2.
$$

Choose a finite $T$ sufficiently large that

$$
\bar z(T)>0,\qquad \bar w(T)\ge\frac{3s}{2},\qquad
|\bar V_1(T)-u|<\frac s8,\qquad
|\bar V_2(T)+u|<\frac s8,
$$

and, with $Z=\bar z(T)/2$,

$$
I_Z=\frac{C_b Z^{1-p}}{(p-1)v}
<\min\{b-b_0,s/8\}.
\tag{16}
$$

Such a finite $T$ exists because $s>0$ and $p>1$. This is the only use of positive-speed selection from the assessed sources. No assumption that all old source positions are already distant enters (16).

Compute $d_*,M,a,k,L$ from (10)–(13) on this finite interval, with $b_1=b_0$, and put

$$
\eta=\min\left\{\frac{d_*}{8},\frac{b_0-B}{2},
\frac{\bar z(T)}4,\frac s8,1\right\},\qquad
\delta_0=\frac\eta2e^{-(1+L)T}>0.
\tag{17}
$$

Every compatible history with distance less than $\delta_0$ in (9) is separated throughout its supplied past and has a unique continuation through $T$. The finite-time estimate gives error below $\eta/2$, and in particular below $\eta$. Its complete incoming speed through $T$ is below $b_0$, its projected separation at $T$ exceeds or equals $Z$, and

$$
w(T)\ge\frac{3s}{2}-2\eta\ge\frac{5s}{4}.
$$

Its impulse bound is at most $I_Z<s/8$. Hence $2I_Z<s/4<5s/4-s/2$, and both inequalities (5) hold strictly. The full Cartesian scattering criterion applies for all later time. In addition, each terminal velocity is within $3s/8$ of its respective $u$ or $-u$: use the $s/8$ reference entry error, the perturbation error at most $s/8$, and the tail impulse below $s/8$. Thus each terminal speed is at least $5s/8>0$, as well as the pair having distinct terminal velocities.

Formula (17) is a quantitative sufficient neighborhood once the stated reference constants and an entry time are bounded. This work supplies no numerical enclosure of them. In particular it does not provide a numerical launch threshold, a practical numerical neighborhood radius, or a positive lower bound uniform as $s\downarrow0$, $\epsilon\downarrow0$ or $p\downarrow3$.

## Genuine compatible Cartesian perturbations

The compatible relative neighborhood is not merely a family of rigid images of the reference. Let the two exact release partner source times be $\bar s_i(0)<0$. Choose smooth compactly supported perturbations of the supplied histories, with supports in negative-time intervals avoiding zero and both release source times. They can be arbitrarily small in the norm (9), can act on the labels independently, and can have components normal to the reference circle plane.

The histories and their first two derivatives are unchanged near zero; their positions and velocities are unchanged near both release source events. Therefore the old release roots still solve the perturbed residual equations. Global strict subfield monotonicity proves those are still the unique roots. Received release accelerations are unchanged, so compatibility is exact, with no fitted endpoint acceleration or Galilean transformation. The global past gap and speed margins survive sufficiently small perturbations.

A nonzero normal bump on only one label breaks the mirror relation; since the unchanged old circular tail already spans the original plane, it also makes the complete history noncoplanar. Supports can be chosen between the corresponding release source time and zero, so this is not restricted to perturbations forever outside the future's source domain. Equation (3) makes that source clock traverse the support at a finite reception time. At its first nonzero normal source displacement, the other receiver's initially planar equation receives a normal acceleration component. Choosing one such source bump with a nonzero normal position on an interval therefore also produces a future departing from the reference plane. The conclusion of the theorem, however, covers every compatible history in (17), not just these special constructions.

The global uniform position norm is an explicit topology choice. It admits arbitrary sufficiently small bounded complete Cartesian deformations; it does not admit a nonzero affine change of remote-past common drift, which grows without bound relative to the circular past. No claim of openness in a weaker local-only or differently weighted history topology is made. Nonmirror velocities and a moving future center are allowed; neither $V_1=-V_2$ nor $X_1+X_2=0$ appears in the neighborhood definition or sufficient criterion.

## Continuity of scattering data and precise limits

The terminal velocities vary continuously in this compatible neighborhood. On any fixed finite interval, the comparison (11)–(14) applies about a nearby regular solution using its finite source bounds. For that comparison it suffices to take $M$ over the compact source interval (15), where local $C^{2,1}$ regularity guarantees finiteness; no global acceleration bound on the perturbed infinite past is required. All histories in a smaller common neighborhood share $z(T)\ge Z$, the same $v,b$ and the tail estimate (7). First choose a late time so this uniform tail is small, then use finite-time continuity of velocity at that time. This proves continuity of $U_i$ directly. For $p>2$, the integrable first-moment bound in (8) proves continuity of the affine offsets by the same finite-part plus uniform-tail argument.

The result is robust scattering, not asymptotic stability of one particular trajectory: different terminal velocities produce linearly growing position differences, and no conserved center or common terminal drift is assumed. The proof excludes contact and unit speed within its stated neighborhood, but it does not classify arbitrary histories, distant initial data, zero-speed members, incoming sublinear contact, or any unselected law. There is no binding claim and no linear spectrum is used.

Falsifiers are explicit: a complete subfield history with another partner root or a positive-delay self root; a failure of (1), (3), (11) or (12); a compatible finite-time continuation that leaves the tube despite (14) and its strict margins; a failure of (5) to preserve the speed and outgoing projection; or divergent acceleration/first-moment integrals under the displayed bounds. Loss of positivity of the reference terminal speed invalidates the entry construction and is not hidden by the theorem. A perturbation small only on a finite old-history interval does not meet (9).

## Source identities and validation boundary

The inherited assessments and antecedents were read directly. Their SHA-256 identities, measured with `shasum -a 256` over the named sources, are:

| Source | Identity |
| --- | --- |
| [Cubic assessment](alternatives-screen-2026-10-05-radial-cubic-adjudication.md) | `6ae368163cc49afcf24624a1baddd8e249fb3a156f217bac13400d057473585c` |
| [Above-three assessment](alternatives-screen-2026-10-05-radial-above-three-adjudication.md) | `8978d48ac66d5e8328fc7d4e7779b77d6bd79f6289022bf924dd2daaf00345b8` |
| [Frozen circle-tail formula](alternatives-screen-2026-10-05-radial-power-family-preparation.md) | `5bb3bf495cdb40975f86d1c7ff8e14398848f3e094bfcd6a739a8ef215beed04` |
| [Distant scattering reference](../../analysis/alternatives-screen-2026-10-05-independent-reference.md#explicit-distant-nonmirror-scattering-preparations) | `ca59fa93e0bac8521108d8736f286c5b9cb674af81a7962ed1a7a9841912edb1` |

The formula owner's original exponent range is extended to the present fixed exponents only by the respective assessed cubic and above-three sources. No inference extrapolates its original $1<p\le2$ estimates. Validation here is analytical: complete residual monotonicity, chord inequalities, the exact source-clock derivative, elementary integral contraction and scalar comparison, endpoint-compatible perturbations and explicit tail integrals. No numerical target, empirical neighborhood measurement or new instrument is used. Independent admission belongs to the coordinator. Only the new assigned specification and subject are authored; earlier sources and shared owners remain unchanged.
