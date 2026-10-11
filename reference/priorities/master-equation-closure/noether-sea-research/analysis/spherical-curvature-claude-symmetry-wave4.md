# Symmetry wave 4: argument-principle certification, in-plane D6 modes of the stationary hexagon, and the longer-preparation classification

## Status and checkpoint record

Legend: ✓ Done, ◐ Partial, ○ Not done. Role: symmetry (Specialist lens `emmy-noether`, launch name "spherical-curvature symmetry"), wave 4 of the [spherical curvature investigation](spherical-curvature-configuration-space-plan.md). Waves 1–3 ([scaling and classes](spherical-curvature-claude-symmetry-scaling-and-classes.md) 40f0abe6…, [wave 2](spherical-curvature-claude-symmetry-wave2.md) d7f4e29a…, [wave 3](spherical-curvature-claude-symmetry-wave3.md) b5f2c304…) are frozen and cited, not edited. Units: unit sphere, $c_f=1$, $g=K/(Rc_f^2)$; physical time $T=Rt/c_f$. Acceleration language only; every claim carries its grade and falsifier. Coverage's files were not read for item (b), which is an independent route.

Checkpoint log (actual `date -u` read immediately before each save):

- 2026-10-11 00:49:57 UTC — first save of this file: items (a), (b), (c) all saved below from instrument run 2 (00:48:00 UTC; run 1 at 00:47:21 UTC retained). All wave-4 items ✓ at their stated grades.

## (a) Argument-principle certification of the dominant roots

Instrument: [spherical-curvature-claude-symmetry-wave4-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave4-instrument.py) (venv Python, numpy; 5.8 s wall; output [spherical-curvature-claude-symmetry-wave4-results.json](../evidence/spherical-curvature-claude-symmetry-wave4-results.json), run 1 retained as `*-wave4-results-run1.json`). It computes the winding number of a characteristic function $h$ around the rectangle $\mathrm{Re}\,\Lambda\in[-4,4]$, $\mathrm{Im}\,\Lambda\in[-40,40]$ by sampling the boundary and refining until every phase step between consecutive samples is below $\pi/2$ (so no winding can be lost between samples), then compares the count with the number of distinct Newton roots found inside; a second count on the right strip $\mathrm{Re}\,\Lambda\in[-0.01,4]$ is compared with the Newton roots there, which is the statement that certifies the dominant root. Controls recorded before the target, all passed: known no-delay Family A at $g=1$ counts exactly $2$ (the pair $\pm i\sqrt{gC}$); known $m=0$ in-plane function has $h(0)=0$ exactly and a real root $1.5832\times10^{-3}$ at $g=10^{-3}$ against the frozen $T'(0)=19/12$ prediction $1.5833\times10^{-3}$; known receiver coefficient $c=29/8-5/(6\sqrt3)=3.1439$; known $m=0$ static sum exactly $0$; negative control, the contour shifted to $\mathrm{Re}\le0.4$ at $g=1$ counts $10$ against $12$ for the full rectangle, missing exactly the dominant pair.

Family A (wave-3 function) at $g\in\{4,2,1,1/2,1/4,1/10\}$: full-rectangle counts $22,20,12,6,6,6$, each equal to the Newton count; right-strip counts $2,2,2,2,2,2$, each equal to the Newton roots there, namely the conjugate pair at $0.8467\pm1.877i$, $0.6866\pm1.545i$, $0.5147\pm1.256i$, $0.3583\pm1.004i$, $0.2314\pm0.784i$, $0.1162\pm0.544i$. What lies outside the rectangle: for $\mathrm{Re}\,\Lambda\ge0$ every exponential has modulus at most one, so a root needs $|\Lambda|^2\le g(|a_0|+\sum|a_k|)=3.577g$, that is $|\Lambda|\le3.78$ at $g=4$ and less at smaller $g$; hence every root with nonnegative real part lies inside the rectangle, and the certified dominant root is the rightmost root of the whole function. Roots with $\mathrm{Re}\,\Lambda<-4$ or $|\mathrm{Im}\,\Lambda|>40$ exist in infinite number (the usual chains of a delay equation) and are irrelevant to the growth statement. Claim grade: measured for the counts (instrument, with the refinement criterion stated), derived for the outside bound. Falsifier: a boundary sample pair with phase step above $\pi/2$ (the instrument records the maximum step), or a root with $\mathrm{Re}\ge0$ and $|\Lambda|>\sqrt{3.577g}$, impossible by the modulus bound.

## (b) In-plane D6 modes about the stationary hexagon

### Decoupling and setting

Perturbations of the stationary hexagon split into in-plane (azimuthal) and out-of-plane (latitude) sectors because the equatorial reflection is a symmetry of the equilibrium and of the law; a linear operator commuting with it cannot mix even and odd sectors. Wave 3 treated the one odd mode of Family A; here every in-plane mode is treated. Member $k$ sits at angle $\theta_k+\psi_k(t)$, $\theta_k=k\pi/3$, polarity $(-1)^k$, on the equator. For the receiver at $\psi_0$ and a transmitter at emission angle $\alpha=\theta_k+\psi_k(t-u)$, write the relative angle $\delta=\alpha-\psi_0$. Exact in-plane facts: the chord is $u=2\sin(\delta/2)$ (this is the root equation, which fixes $u$ implicitly through $\psi_k(t-u)$); the azimuthal component of the line of action at the receiver is $\mathbf e_\phi\cdot\hat{\mathbf r}=-\cos(\delta/2)$; the transmitter velocity $\psi_k'(t-u)$ along its own azimuth gives $\mathbf v_k\cdot\hat{\mathbf r}=-\psi_k'(t-u)\cos(\delta/2)$, so $D_t=1+\psi_k'(t-u)\cos(\delta/2)$ (a transmitter moving away from the receiver dilates, $D_t>1$). The per-hit azimuthal acceleration is therefore $\sigma_k\,F(\delta)/D_t$ with

$$
F(\delta)=-\frac{\cos(\delta/2)}{4\sin^2(\delta/2)},\qquad F'(\delta)=\frac{1+\cos^2(\delta/2)}{8\sin^3(\delta/2)} .
$$

### Linearization including the root shift and the transmitter factor

To first order $\delta=\theta_k+\Delta_k$ with $\Delta_k=\psi_k(t-\tau_k)-\psi_0(t)$ and $\tau_k=2\sin(\theta_k/2)\in\{1,\sqrt3,2\}$; the root shift $u-\tau_k=\cos(\theta_k/2)\Delta_k$ is first order but enters only through $\delta$, and $F(\delta)$ already contains the root through $u=2\sin(\delta/2)$, so the root shift is accounted for exactly by $F'$. The weight gives $1/D_t=1-\psi_k'(t-\tau_k)\cos(\theta_k/2)$. Hence

$$
\psi_0''(t)=g\sum_{k=1}^{5}\sigma_k\Big[F'(\theta_k)\big(\psi_k(t-\tau_k)-\psi_0(t)\big)-F(\theta_k)\cos(\theta_k/2)\,\psi_k'(t-\tau_k)\Big],
$$

and the zeroth order $\sum\sigma_kF(\theta_k)=0$ is the stationary hexagon. The receiver coefficient $-\sum_k\sigma_kF'(\theta_k)=2\cdot\tfrac74-2\cdot\tfrac{5}{12\sqrt3}+\tfrac18=\tfrac{29}8-\tfrac{5}{6\sqrt3}=c$ reproduces the wave-1 value exactly, which checks $F'$. The equations for the other five members follow by the $\pi/3$ rotation with polarity swap, under which the law is invariant, so the system is circulant in $k$ with $\sigma_{jk}=(-1)^{k-j}$ and delays depending on $k-j$ only.

### Irreducible modes and their characteristic functions

Circulant structure diagonalizes on $\psi_k(t)=e^{im\theta_k}\psi(t)$, $m\in\{0,\pm1,\pm2,3\}$: $m=0$ is the rigid in-phase rotation, $m=3$ the counter-rotation of the positrino triangle against the electrino triangle (the pairing or dimerization mode), $m=\pm1$ and $m=\pm2$ the two doubly degenerate pairs (a conjugate pair gives one real function, so four functions suffice). Grouping the five transmitters by delay ($n=1,5$ at $\tau=1$ with $\sigma=-1$, $F'=7/4$, $-F\cos(\theta/2)=3/4$; $n=2,4$ at $\tau=\sqrt3$ with $\sigma=+1$, $F'=5/(12\sqrt3)$, $-F\cos(\theta/2)=1/12$; $n=3$ at $\tau=2$ with $\sigma=-1$, $F'=1/8$, $F=0$):

$$
\Lambda^2=g\Big[c+\sum_{k=1}^{3}\big(a_k^{(m)}+\Lambda\,b_k^{(m)}\big)e^{-\Lambda\tau_k}\Big],
$$

$$
a_1^{(m)}=-\tfrac72\cos\tfrac{m\pi}3,\quad b_1^{(m)}=-\tfrac32\cos\tfrac{m\pi}3,\qquad
a_2^{(m)}=\tfrac{5}{6\sqrt3}\cos\tfrac{2m\pi}3,\quad b_2^{(m)}=\tfrac16\cos\tfrac{2m\pi}3,\qquad
a_3^{(m)}=-\tfrac18\cos m\pi,\quad b_3^{(m)}=0 .
$$

| $m$ | $a_1$ | $b_1$ | $a_2$ | $b_2$ | $a_3$ | static sum $c+\sum a_k$ |
| --- | --- | --- | --- | --- | --- | --- |
| $0$ (rigid rotation) | $-7/2$ | $-3/2$ | $5/(6\sqrt3)$ | $1/6$ | $-1/8$ | $0$ exactly |
| $\pm1$ | $-7/4$ | $-3/4$ | $-5/(12\sqrt3)$ | $-1/12$ | $+1/8$ | $2-5/(4\sqrt3)=1.2783$ |
| $\pm2$ | $+7/4$ | $+3/4$ | $-5/(12\sqrt3)$ | $-1/12$ | $-1/8$ | $21/4-5/(4\sqrt3)=4.5283$ |
| $3$ (polarity counter-rotation) | $+7/2$ | $+3/2$ | $5/(6\sqrt3)$ | $1/6$ | $+1/8$ | $29/4=7.25$ |

Two independent checks of the velocity couplings $b_k$: for $m=0$ the small-$\Lambda$ expansion gives $\Lambda^2\approx g\Lambda\big(-\sum a_k\tau_k+\sum b_k\big)=g\Lambda\big(\tfrac{35}{12}-\tfrac{16}{12}\big)=\tfrac{19}{12}g\Lambda$, which is the frozen rotating-hexagon slope $T'(0)=19/12$ (the $b_k$ contribute the $-16/12$; without them the slope would be $35/12$ and the check would fail); and the exact zero $h_0(0)=0$ says a rigid rotation of the whole hexagon is a static zero mode, as it must be. Claim grade: derived for the linearization and the coefficient table (every entry is a two-term sum from the stated $F$, $F'$ values); the two checks are independent agreements with frozen results. Falsifiers: $-\sum\sigma_kF'(\theta_k)\ne c$; an $m=0$ slope other than $19/12$; a coefficient entry not equal to its displayed sum.

### Dominant roots (measured, certified by the argument principle as in (a))

Every in-plane mode has a real positive dominant root at every $g$ in the sweep; no complex root with nonnegative real part was found, and the right-strip counts equal the Newton counts in every case (two for $m=0$, which includes the exact zero root, one for each other mode). Full-rectangle counts equal the Newton counts in 23 of 24 cases; at $m=3$, $g=2$ the full count is $21$ against $19$ Newton roots after a finer retry, so two roots with $\mathrm{Re}\,\Lambda<-0.01$ were not located there, which does not affect the dominant root (the right-strip count is $1$ and matched).

| $g$ ($R=1/g$) | $m=0$ | $m=\pm1$ | $m=\pm2$ | $m=3$ | Family A (wave 3) | static $\sqrt{g\,\Sigma}$ for $m=3$ |
| --- | --- | --- | --- | --- | --- | --- |
| $4$ ($1/4$) | $3.379$ | $3.468$ | $3.613$ | $3.674$ | $0.847\pm1.877i$ | $5.385$ |
| $2$ ($1/2$) | $2.192$ | $2.370$ | $2.612$ | $2.705$ | $0.687\pm1.545i$ | $3.808$ |
| $1$ ($1$) | $1.320$ | $1.589$ | $1.898$ | $2.011$ | $0.515\pm1.256i$ | $2.693$ |
| $1/2$ ($2$) | $0.733$ | $1.054$ | $1.379$ | $1.498$ | $0.358\pm1.004i$ | $1.904$ |
| $1/4$ ($4$) | $0.384$ | $0.699$ | $0.999$ | $1.113$ | $0.231\pm0.784i$ | $1.346$ |
| $1/10$ ($10$) | $0.157$ | $0.412$ | $0.647$ | $0.744$ | $0.116\pm0.544i$ | $0.852$ |

Physical growth rates at $K=1$ are these numbers times $c_f/R=g$. For $\mathrm{Re}\,\Lambda\ge0$ a root needs $|\Lambda|\le\big(gB+\sqrt{g^2B^2+4gA}\big)/2$ with $A=c+\sum|a_k|$, $B=\sum|b_k|$, at most $9.7$ at $g=4$, so every root with nonnegative real part lies inside the rectangle and the tabulated roots are the rightmost roots of their functions.

Reading. The stationary alternating hexagon is linearly unstable in every in-plane D6 sector. Three of the four are already unstable without delay (positive static sums: a single member or any non-rigid in-plane pattern is pushed further by the static field, the strongest being the polarity counter-rotation $m=3$, whose static growth rate $\sqrt{7.25g}$ the delays reduce to the tabulated values); the rigid-rotation sector $m=0$ is statically neutral and is destabilized by the delays alone, its small-$g$ growth rate being $\tfrac{19}{12}g$, the same number that makes the uniformly rotating hexagon accelerate in wave 2 item (i). The in-plane growth rates exceed the Family A latitude rate at every $g$ (at $g=1$: $2.01$ for $m=3$ against $0.51$), so the fastest linear departure from the hexagon is in-plane pairing, not latitude breathing. Claim grade: measured for the roots; the step from certified rightmost roots of the linearized delay equations to "linearly unstable" is the standard inference for autonomous linear delay equations with finitely many delays and is not re-proved. Not established: nonlinear fate, out-of-plane modes other than Family A, any periodic orbit, any physical interpretation. Falsifiers: a coefficient error (checkable from the table), a phase-step violation in the winding computation, a root with $\mathrm{Re}\ge0$ outside the modulus bound.

## (c) Longer H1 preparation: radius-scaled duration $R/c_f$ instead of $R/(4c_f)$

Stretched profile (same polynomial shape): $\theta(s)=\beta\,s\,(1+s)^3$ on $-1\le s\le0$, zero before; $\theta'(s)=\beta(1+s)^2(1+4s)$, $\theta''(s)=6\beta(1+s)(1+2s)$; $\theta(0)=0$, $\theta'(0)=\beta$, $C^2$ seam at $s=-1$ (same regularity class), $\theta'\in[-\beta/4,\beta]$ (so the sub-wake and equality classifications are unchanged), maximum displacement $27\beta/256=0.105\beta$ radians (four times the short preparation), near-release speed $\theta'=\beta(1+6s+O(s^2))$ instead of $\beta(1+24s+\dots)$.

**Which release roots read moving emissions.** At the release instant a partner at chord $d$ is read at delay $d$ and sits at its site with zero velocity iff $d\ge1$ (the preparation now starts at $s=-1$). Six poles: chords $\sqrt2$, $2$, all stationary. Antiprism ($\pi/6$): chords $1.323$, $1.5$, $2$, all stationary. Hexagon: chords $1$, $\sqrt3$, $2$: the two nearest unlike neighbours are read exactly at the seam $s=-1$, where position, velocity and acceleration all equal their stationary values, so the release field is still the stationary one but with zero margin; for every $T>0$ those two roots read moving preparation. Stationary-source windows after release shrink: six poles, $T(1+\beta_{\max})\le\sqrt2-1$, that is $T\le0.21$ at $\beta=1$ and $T\le0.28$ at $\beta=1/2$ (against $0.58$ and $0.77$ before); antiprism, $T(1+\beta_{\max})\le0.323$, $T\le0.16$ at $\beta=1$; hexagon, window empty.

**Symmetry statements.** Every whole-history symmetry of wave 1 used only that all members share one profile $\theta$ along their own great circles; the stretched profile is common to all members, so every group, orbit structure, transitivity and equal-speed statement of wave 1 survives unchanged, for as long as a unique ordinary-chart continuation exists.

**Release tangent work and its first-order change.** At $T=0$ every release field is the stationary one (hexagon with zero margin), so the release tangent work and speed derivative at $v=1/2$ and $v=1$ are those of wave 1 for all three geometries: six poles $d|\mathbf v|/dT=-(K/R^2)\cos\psi$; hexagon $0$; antiprism V2 $-0.946K/R^2$. The first time derivative $\tfrac{d}{dT}(\mathbf v\cdot\mathbf A)|_{0^+}$ is also unchanged: for the six poles and the antiprism the roots stay in the stationary past on an open interval; for the hexagon the two seam roots read emissions at $s=-1+O(T)$ where position deviates by $O((1+s)^3)=O(T^3)$ and velocity by $O(T^2)$, so the correction to the per-hit value is $O(T^2)$ through $D_t$ and $O(T^3)$ through position, and nothing changes at first order in $T$; the hexagon's second-order coefficient (wave-2 $gc\beta$ for V1) acquires an additional term from the seam roots' velocity, which is not computed here. The second-order speed coefficients of the six poles and antiprism are unchanged on their (shorter) windows.

**Wake-speed obstruction.** The wave-2 theorem transfers to the stretched preparation with changed constants only: $|\theta''|\le6$ so $M'=\max(M,7)$; the preparation path over $[-w,0]$ is $w(1-w)^3\le w-3w^2+3w^3\le w-\tfrac94w^2$ for $w\le1/4$, so every self root has $u\le t(1+\sqrt{4M/9})$ and the remaining steps are unchanged with that bound; the obstruction conclusion for the $\beta=1$ cells with nonnegative release work (V1, V3, V4, rotating hexagon) is the same.

Claim grade: derived for the profile properties, the root readings, the symmetry survival, the first-order invariance and the transferred constants; the hexagon second-order change is not computed. Falsifiers: a chord below $1$ in the six-pole or antiprism geometries (none exists); a nonzero $O(T)$ correction from a $C^2$ seam (impossible since the per-hit law reads position and velocity only).

## Evidence record and boundaries

Files written in wave 4 (new, untracked; waves 1–3 untouched): this report; [spherical-curvature-claude-symmetry-wave4-instrument.py](../evidence/spherical-curvature-claude-symmetry-wave4-instrument.py) (revision 2); [spherical-curvature-claude-symmetry-wave4-results.json](../evidence/spherical-curvature-claude-symmetry-wave4-results.json) (run 2) and [spherical-curvature-claude-symmetry-wave4-results-run1.json](../evidence/spherical-curvature-claude-symmetry-wave4-results-run1.json) (run 1, full-rectangle counts only). No background job, build, EOM run or git write; coverage's files were not read. Boundaries: linear modes about a lawful equilibrium of the delayed law, certified rightmost roots; no periodic orbit, no nonlinear statement, no physical interpretation, no sea; nonlinear continuation of the Family A equation was not run.
