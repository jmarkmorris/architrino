# Spherical 3:3 constrained-history dynamics

## Scope and executable capability

This investigation evaluates the operator-selected normal constraint on one fixed sphere under the canonical transmitter-weighted Master Equation. It does not add an along-path controller and does not evolve a trajectory. The initial instrument is a prescribed-history diagnostic whose first target is a nonplanar six-member history on three orthogonal great circles. The [campaign synthesis](spherical-three-three-synthesis.md) is owned by the coordinator.

**Measured capability boundary.** Inspection of `NativeCoupledEvolutionRequest` in [CoupledEvolution.hpp](../../../../../src/eom/include/architrino/eom/CoupledEvolution.hpp), `snapshot_totals` and the accepted acceleration-to-cubic construction in [CoupledEvolution.cpp](../../../../../src/eom/src/CoupledEvolution.cpp), and the [evolution contract](../../../app-solver/contracts/evolution-contract-v1.md) found no normal-constraint input in that request or constrained construction in those inspected paths. The contract explicitly excludes a future constraint or guidance acceleration from accepted canonical evolution. Consequently this investigation uses the authorized diagnostic route. A supported constrained request and implementation path would overturn this scoped capability conclusion; no claim about every repository file is made.

## History and residual definitions

Set the sphere center to the origin, radius $R=1$, wake speed $c_f=1$ and fixed interaction coupling $K_{\mathrm{int}}=1$ for the initial numerical instances. For every absolute time $T$, define $\theta=\beta T$ and three positively labeled paths

$$
\mathbf u_0=(\cos\theta,\sin\theta,0),\qquad
\mathbf u_1=(0,\cos\theta,\sin\theta),\qquad
\mathbf u_2=(\sin\theta,0,\cos\theta).
$$

The six histories are $\mathbf X_{k,+}=\mathbf u_k$ and $\mathbf X_{k,-}=-\mathbf u_k$, with polarity labels $+1$ and $-1$ respectively. This defines the entire past and future candidate; future values are prescribed test data, not an EOM result. The three circles are distinct and mutually orthogonal. Cyclic coordinate permutation maps their positive members transitively, while inversion maps each member to its opposite-polarity antipode. Pair polarity products and the normal constraint are unchanged by the combination. All six prescribed speeds are $\beta$, but that kinematic equality does not establish dynamically constant speed.

For the unit normal $\mathbf n=\mathbf X$, unit tangent $\mathbf t=\dot{\mathbf X}/\beta$ and sideways unit vector $\mathbf b=\mathbf n\times\mathbf t$, the diagnostic computes canonical acceleration $\mathbf A$, outward normal support $\lambda=-\beta^2-\mathbf n\cdot\mathbf A$, along-path support $\mu=-\mathbf t\cdot\mathbf A$, and sideways residual $\nu=\mathbf b\cdot(\ddot{\mathbf X}-\mathbf A)$. The full residual is $\mathbf r=\ddot{\mathbf X}-\mathbf A-\lambda\mathbf n$. Normal-only compatibility requires $\mu=\nu=0$ throughout a complete period. A nonzero residual at one regular event refutes this particular prescribed history as a normal-only solution, without excluding different paths.

**Derived root completeness for $0\le\beta<1$.** Every causal delay lies in $(0,2]$ because all source and receiver points lie on the same unit sphere. With the receiver fixed at its reception event, $f(\tau)=\tau-|\mathbf X_i(T)-\mathbf X_j(T-\tau)|$ obeys $f(\tau_2)-f(\tau_1)\ge(1-\beta)(\tau_2-\tau_1)>0$. Noncoincident partners have $f(0)<0$ and $f(2)\ge0$, hence exactly one partner root. A self chord has length at most $\beta\tau<\tau$, excluding every positive-delay self root. At each partner root, $D_t=1-\hat{\mathbf r}\cdot\mathbf V_j\ge1-\beta>0$. These analytical bounds justify a complete census of thirty directed partner roots and zero positive-delay self roots at every target event, rather than a finite scan that might miss roots. This argument does not apply at or above wake speed.

The simultaneous separation bound is also exact. Different positive circle members have scalar product $\sin\theta\cos\theta$; allowing antipodes changes its sign. Its absolute value is at most $1/2$, so every distinct nonantipodal pair has separation at least $1$, while antipodes have separation $2$. Thus this history has no simultaneous collisions. Delayed root distances remain subject to the recorded measurements.

## Controls recorded before target evaluation

The first execution was `node reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-diagnostic.mjs controls`; it returned `status: passed` before any target was evaluated. Its analytical references are independent formulas, not a fixture generated from the diagnostic.

| Control | Analytical expectation | Measured result |
| --- | --- | --- |
| Great circle at speed $1/2$, zero interaction | $\lambda=-1/4$, $\mu=0$, full residual zero | Exact binary64 values matched |
| Same circle, inward acceleration $(-1/4,0,0)$ | All supports and residual zero | Exact binary64 values matched |
| Same circle plus tangent acceleration $(0,1/8,0)$ | Speed derivative $1/8$, $\mu=-1/8$, residual magnitude $1/8$ | Exact binary64 values matched |
| Stationary octahedron, positive coordinate axes positive and their antipodes negative | At $+\mathbf e_x$, $\mathbf A=(-1/4,-1/\sqrt2,-1/\sqrt2)$ | $(-0.25,-0.7071067811865474,-0.7071067811865474)$ |
| Deliberately imbalanced stationary pair at $\mathbf e_x,\mathbf e_y$, like polarity | $\mathbf A=(1,-1,0)/(2\sqrt2)$ at $\mathbf e_x$ | $(0.3535533905932737,-0.3535533905932737,0)$ |

The octahedral reference is independently stated in [the existing spherical balance analysis](../../braid-program/analysis/neutral-six-point-balance-and-phase-compensated-symmetric-rotation.md#exact-symmetric-negatives), which was not edited. Stationary-source roots also matched their geometric separations and had $D_t=1$. Assertion tolerance was $2\times10^{-12}$. These controls establish the tested arithmetic and projection cases; they do not certify all target evaluations or establish a spherical solution.

## A full-period obstruction for the synchronized orthogonal-circle family

**Derived, awaiting independent review.** For every $0<\beta<1$ and positive coupling, the six prescribed histories above fail the normal-only constant-speed equation. The reason is a strictly positive mean along-path acceleration from the opposite-polarity antipode on the receiver's own circle. The four orthogonal-circle contributions cancel in the period average and cannot cancel that mean. This excludes this synchronized great-circle family at every finite radius; it does not exclude another spherical history.

It suffices to take the receiver on $\mathbf u_0$, with $\mathbf t_0=(-\sin\theta,\cos\theta,0)$. Write the dimensionless delay angle as $\delta=\beta\tau$ and use $\varepsilon\in\{+1,-1\}$ for a transmitter's polarity and antipodal sign. The position products with the other two circle directions, evaluated at emission phase $\theta-\delta$, are

$$
C_1(\theta,\delta)=\sin\theta\cos(\theta-\delta),\qquad
C_2(\theta,\delta)=\cos\theta\sin(\theta-\delta).
$$

The corresponding tangent products are

$$
B_1(\theta,\delta)=\cos\theta\cos(\theta-\delta),\qquad
B_2(\theta,\delta)=-\sin\theta\sin(\theta-\delta).
$$

At a root, the distance satisfies $d^2=2-2\varepsilon C_j$ and $\tau=d$. The transmitter factor is $D_t=1+\beta\varepsilon(\partial_\delta C_j)/d$. The canonical tangent contribution is $-B_j/(d^3D_t)$: one factor of $\varepsilon$ comes from the polarity product, another from the projected separation, and they cancel. All these roots have positive $D_t$ in the subfield domain.

Under $\theta\mapsto\theta+\pi/2$, the products transform as

$$
(C_1,C_2)\mapsto(-C_2,-C_1),\qquad
(B_1,B_2)\mapsto(-B_2,-B_1).
$$

Exchange source circles $1\leftrightarrow2$ and source signs $\varepsilon\leftrightarrow-\varepsilon$. Then distance, root equation and $D_t$ are unchanged, while the projected acceleration reverses. Uniqueness of each partner root makes this a bijection of the complete four-root set. Thus their summed tangent acceleration $a_\perp$ obeys $a_\perp(\theta+\pi/2)=-a_\perp(\theta)$ and has exactly zero period mean.

For the opposite-polarity antipode on the receiver's own circle, put $\xi=\delta/2$. Its unique causal root obeys $\xi=\beta\cos\xi$, with $0<\xi<\beta<1$. The delayed chord has length $2\cos\xi$, transmitter factor $1+\beta\sin\xi$, and positive tangent acceleration

$$
C(\beta)=\frac{\sin\xi}{4\cos^2\xi\,(1+\beta\sin\xi)}>0.
$$

Positive-delay self roots are absent by the preceding speed bound. Therefore the exact period mean of the canonical projected acceleration is

$$
\left\langle\mathbf t_i\cdot\mathbf A_i\right\rangle
=\frac{K_{\mathrm{int}}}{R^2}C(\beta)>0.
$$

Restoring arbitrary radius only supplies the displayed positive scale factor, with $\beta=s/c_f$ and numerical $c_f=1$. A normal-only constant-speed solution would have $\mathbf t_i\cdot\mathbf A_i=0$ at every event and hence zero mean, a contradiction. This is an average along a prescribed history, not a measured speed increase on an evolved trajectory. A missed positive-delay self root below wake speed, failure of the quarter-period root correspondence, or a sign error in the antipodal contribution would falsify the proof; each can be checked in the formulas above.

The exact mean also gives a useful support floor: RMS along-path support is at least $K_{\mathrm{int}}C(\beta)/R^2$, by the elementary inequality between RMS and the absolute mean. For $g=K_{\mathrm{int}}/(Rc_f^2)$, the dimensionless mean correction is $\langle R\mu/c_f^2\rangle=-gC(\beta)$. No finite positive radius or coupling eliminates it within this family. This scale statement is derived and needs no twelve-cell numerical radius sweep.

## Target measurements and reproducibility

The [prescribed-history diagnostic](../evidence/spherical-three-three-dynamics-diagnostic.mjs) ran at 48, 192 and 768 uniformly spaced phases for $\beta=0.25,0.75$. Every invocation reran the controls before target evaluation. The 48-phase pilot measured 0.0432 seconds and 63.8 MB process RSS; the 768-phase run measured 0.606 seconds and 80.7 MB RSS through `performance.now()` and `process.memoryUsage()`. Each was one Node process with a 256 MiB heap cap; no long-running job or evolution solver was launched. Output files are retained locally under `.local-data/master-equation-closure/spherical-three-three/dynamics/subfield-{48,192,768}.json`.

At $R=K_{\mathrm{int}}=c_f=1$, the 768-phase measurements are:

| Quantity | $\beta=0.25$ | $\beta=0.75$ |
| --- | ---: | ---: |
| Normal support range | $[-0.259417,0.620319]$ | $[-0.849992,0.152066]$ |
| Normal support RMS | $0.347320$ | $0.485792$ |
| Along-path support range | $[-0.922943,0.802656]$ | $[-1.661159,1.360559]$ |
| Along-path support RMS | $0.629932$ | $0.930756$ |
| Sideways residual RMS | $0.937558$ | $0.927883$ |
| Full constrained residual RMS | $1.129527$ | $1.314258$ |
| Minimum sampled delayed distance | $0.883688$ | $0.704286$ |
| Minimum sampled transmitter factor | $0.832906$ | $0.696229$ |
| Mean projected acceleration, numerical | $0.06014339172306883$ | $0.1502999792290215$ |
| Mean projected acceleration, analytical formula | $0.06014339172306854$ | $0.15029997922902144$ |

Ranges are sampled extrema, not certified continuous extrema. The 192-to-768 RMS differences were below $10^{-13}$; this is refinement consistency, not independent validation. The instrument measured maximum root residual below $1.8\times10^{-15}$ and maximum six-member spread of normal/along-path support below $2.4\times10^{-15}$. A root bisection bracket has width $2^{-49}$, but the implementation uses ordinary binary64 arithmetic and does not provide outward-rounded certificates. Consequently the numerical values are measured diagnostics; the analytical mean obstruction, not small numerical residuals or agreement between scripts, bears the family-exclusion claim.

The [separate mean check](../evidence/spherical-three-three-dynamics-mean-check.mjs) evaluates the derived formula and quarter-period relation against retained rows. Before reading target data it passed the known case $\beta=\pi/(3\sqrt3)$, $\xi=\pi/6$, and $C=1/[6(1+\pi/(6\sqrt3))]$, along with a known arithmetic mean. It found quarter-period cancellation errors below $5.2\times10^{-15}$. Its analytical reference is the proof above; it is not an independently authored numerical oracle.

Reproduce the principal measurements from the repository root:

```bash
node reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-diagnostic.mjs controls
node --max-old-space-size=256 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-diagnostic.mjs target 768 .local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json
node reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-mean-check.mjs .local-data/master-equation-closure/spherical-three-three/dynamics/subfield-768.json
```

## Evidence and outstanding boundaries

The small reproducible instruments and concise summary are retained with this analysis; original target outputs remain in the named local-data directory. Regeneration of these small outputs is empirically subsecond on this host, excluding tool overhead; no separate backup claim is made. Independent review is pending at this checkpoint. No scientific acceptance, stability, energy-radius-speed relation, free surface evolution, or physical sea result has been obtained. The [Energy chapter](../../../../../content/markdown/aaa/dynamics/energy.md#kinetic-energy-and-momentum-of-a-single-architrino) explicitly leaves the primitive kinetic functional unestablished; $\beta$ and $R$ are parameter labels, not energy levels. Above-wake-speed cases, perturbed histories and other non-great-circle patterns remain untested; the subfield root theorem must not be reused for them. Coordinator integration and independent adjudication remain open.

At this handoff, `node --check` passed for both `.mjs` instruments, and `git diff --no-index --check /dev/null <file>` passed separately for this analysis and both instruments. The latter checks include these newly created files, unlike a tracked-diff-only check. `du -h` measured the three local outputs as 388K, 1.4M and 5.6M respectively. The diagnostic is frozen for review at SHA-256 `b8ad44d6f6d8ad15be33c4574e358edd5c5d89c55a4a13b3a83acf4ae1890fde`; the analytical mean check is frozen at `2bb03ef1594ab14754e7ea1acf019310c2c490a71892aaeaa4e089c9411eea33`. No process or computation lease was created by this worker, and all launched short commands returned successfully.

## Relative-phase extension: initial checkpoint

The next bounded question retains the same circles, orientation and opposite-polarity antipodes but replaces their phases by $(\theta,\theta+\alpha,\theta+\gamma)$. Thus $\alpha$ and $\gamma$ are the two independent relative phases after fixing the common time origin. All six speeds remain prescribed equal to $\beta$; simultaneous transitive symmetry is no longer assumed. The synchronized result and both original instruments above remain frozen.

**Derived collision domain.** The exact minimum simultaneous separation over a full period is

$$
d_{\min}=\sqrt{1-\max\{|\sin\alpha|,|\sin\gamma|,|\sin(\gamma-\alpha)|\}}.
$$

For example, $\sin\theta\cos(\theta+\alpha)=[\sin(2\theta+\alpha)-\sin\alpha]/2$ has maximum absolute value $(1+|\sin\alpha|)/2$, and both antipodal signs are present. The other two circle pairs give the other phase differences. The family is therefore collision-free exactly when none of $\alpha,\gamma,\gamma-\alpha$ is $\pi/2$ modulo $\pi$. On this collision-free domain and $\beta<1$, the earlier complete-root proof still supplies exactly thirty partner roots and no positive-delay self roots at every event. A collision case is outside the regular diagnostic, not a zero contribution.

The quarter-period transformation exchanges the two orthogonal source types while retaining their phase shifts. It therefore pairs a source of phase $\alpha$ with a source of that same phase, which the actual receiver sees at phase $\gamma$. The prior pointwise cancellation proof is not automatically valid when $\alpha\ne\gamma$. Whether a different mean identity resolves the shifted family remains under investigation.

The new [phase-shift companion](../evidence/spherical-three-three-dynamics-shifted.mjs) passed its five analytical projection/static-root controls in a `controls`-only execution before target use. It copies the frozen evaluator solely to preserve the original instrument's bytes; it is a task-specific prescribed-history diagnostic, not a second evolution solver or independent oracle. A small phase pilot is the next dependency; no shifted-family claim is accepted at this checkpoint.

### Necessary mean equations and the surviving exact exclusions

Define $F_\beta(d)$ as the period mean of the tangent acceleration at a positive member on circle $0$ from the positive/negative pair on circle $1$ with relative phase $d$, at $R=K_{\mathrm{int}}=1$. It includes both unique partner roots, with their actual transmitter factors. Its integrand is obtained from the earlier $C_1,B_1$ formulas by replacing $\theta-\delta$ with $\theta+d-\delta$. This defines a one-variable mean response on collision-free phase differences; it is not an added dynamical law.

For a pair on circle $2$ with the same relative phase $d$, the quarter-period transformation still reverses the mean. Its response is therefore $-F_\beta(d)$. Applying cyclic coordinate permutation and shifting the time origin separately for each receiver gives the three pairwise means

$$
M_0=C(\beta)+F_\beta(\alpha)-F_\beta(\gamma),
$$

$$
M_1=C(\beta)+F_\beta(\gamma-\alpha)-F_\beta(-\alpha),
$$

$$
M_2=C(\beta)+F_\beta(-\gamma)-F_\beta(\alpha-\gamma).
$$

The negative member of each antipodal pair has the same projected acceleration as its positive member by global inversion and polarity conjugation. At general radius these expressions are multiplied by $K_{\mathrm{int}}/R^2$. A constant-speed normal-only trajectory requires all three means to vanish, and still requires the full time-dependent tangent and sideways residuals to vanish; solving the mean equations alone would only nominate a candidate.

**Derived exclusions, awaiting independent review.** If $\alpha=\gamma$ modulo $2\pi$, then $M_0=C(\beta)>0$. If $\gamma=0$ modulo $2\pi$, then $M_1=C(\beta)>0$. If $\alpha=0$ modulo $2\pi$, then $M_2=C(\beta)>0$. Thus every collision-free history in which any two of the three positive-member phases coincide is excluded throughout $0<\beta<1$. This is a union of three one-parameter subsets, not the whole two-phase family.

The generic sum is

$$
M_0+M_1+M_2=3C(\beta)+H_\beta(\alpha)-H_\beta(\gamma)+H_\beta(\gamma-\alpha),
\qquad H_\beta(d)=F_\beta(d)-F_\beta(-d).
$$

A proof that the right-hand side stays nonzero throughout the collision-free phase domain would exclude the entire shifted family. The synchronized proof supplies no such bound. It also supplies no evenness theorem for $F_\beta$, so replacing the sum by $3C(\beta)$ is unjustified. The pilot below directly rejects that tempting extension.

### Shifted pilot and completed-slice checkpoint

The phase companion evaluated $(\alpha,\gamma)=(0,0),(0.3,-0.4),(\pi/3,2\pi/3),(0.6,0.6),(-0.3,0.4)$ at $\beta=0.25,0.75$, first at 96 then 384 uniformly spaced phases. All are collision-free by the exact clearance formula. The commands were `node --max-old-space-size=256 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-shifted.mjs target N .local-data/master-equation-closure/spherical-three-three/dynamics/shifted-N.json`, for those two values of `N`. Every invocation reran known controls before targets. The pilot measured 0.3993 seconds and 90.1 MB RSS; refinement measured 1.5916 seconds and 115.6 MB RSS through the same timing/memory instruments as before. No long-running process or extra compute allocation was needed.

The 384-phase results below give $(M_0,M_1,M_2)$ and the RMS full constrained residual over all members and phases, at $R=K_{\mathrm{int}}=c_f=1$:

| $\beta$ | $(\alpha,\gamma)$ | Pair means | Full residual RMS |
| --- | --- | --- | ---: |
| $0.25$ | $(0,0)$ | $(0.060143,0.060143,0.060143)$ | $1.129527$ |
| $0.25$ | $(0.3,-0.4)$ | $(0.079525,-0.060013,0.168204)$ | $1.487254$ |
| $0.25$ | $(\pi/3,2\pi/3)$ | $(-1.756110,0.033481,1.876397)$ | $3.880952$ |
| $0.25$ | $(0.6,0.6)$ | $(0.060143,0.160444,-0.040157)$ | $1.449458$ |
| $0.25$ | $(-0.3,0.4)$ | $(0.078594,-0.067118,0.161668)$ | $1.461130$ |
| $0.75$ | $(0,0)$ | $(0.150300,0.150300,0.150300)$ | $1.314258$ |
| $0.75$ | $(0.3,-0.4)$ | $(0.191311,0.051198,0.224026)$ | $1.741537$ |
| $0.75$ | $(\pi/3,2\pi/3)$ | $(-1.290486,0.169387,1.591086)$ | $4.331780$ |
| $0.75$ | $(0.6,0.6)$ | $(0.150300,0.242964,0.057636)$ | $1.699163$ |
| $0.75$ | $(-0.3,0.4)$ | $(0.136031,0.066415,0.232820)$ | $1.711800$ |

**Measured falsification of the unchanged cancellation claim.** At $\beta=0.25$, $(\alpha,\gamma)=(0.3,-0.4)$, the mean over all members is $0.0625720587269559$, whereas the antipodal value is $C(0.25)=0.06014339172306854$. Their difference, about $0.002429$, persists under the 96-to-384 refinement. The three separate means also differ substantially, including a negative one. Thus neither the per-member equality to $C$ nor the aggregate equality to $C$ extends to arbitrary phases. This does not refute the possibility that the aggregate stays positive by a different theorem.

No tested shifted candidate satisfies the full residual condition or improves on the synchronized candidate's RMS residual. This is a bounded ten-cell diagnostic finding, not an optimization result or a global exclusion. The exact remaining obstacle is control of $H_\beta$ in the displayed sum, or direct solution/exclusion of the three necessary mean equations on the collision-free domain. No particular untested phase choice is established as promising by this pilot. Broadening to a phase search or a different history class would be a next scientific slice rather than a conclusion of these measurements.

**Checkpoint disposition.** This slice supplies exact collision clearance, a complete subfield root domain, the mean-response reduction, three excluded phase subsets, and a counterexample to the unchanged synchronized cancellation claim. The original synchronized result and instruments are preserved. The new derivations await independent review; the generic shifted family remains unresolved. Retained original pilot/refinement data are the two `shifted-N.json` files named above. All launched commands completed; no job remains. Coordinator integration into the existing synthesis and independent checking of the response transformation are the next dependencies.

The shifted companion passed `node --check`; it and this extended analysis passed `git diff --no-index --check /dev/null <file>`. A fresh `shasum -a 256` reproduced both original instrument hashes and froze the shifted companion at `8665e80b4971a0d003aaad4cf2a2eabed7072e9f7ca98d997010fd7f907778fb`. `du -h` measured the retained shifted outputs as 3.6M and 14M. These checks establish syntax, whitespace, byte preservation and local storage only; they do not replace independent mathematical review.

## Beyond-wake-speed root admission: initial checkpoint

The next authorized slice returns to the synchronized history and studies $\beta=3/2$ and $\beta=3$, with $R=c_f=1$. It establishes causal-root admission before any target acceleration or residual. Positive-delay self roots must now be retained. The independently frozen circular-self reference in the [review record](spherical-three-three-review.md#circular-self-root-control-with-an-exact-endpoint) supplies the analytical control: for $1<\beta<\pi$, $x=\beta\sin x$ has exactly one root in $(0,\pi)$, its delay is $u=2x/\beta$, and $D_t=D_r=1-\beta\cos x>0$. Both selected speeds are in that domain. The known endpoint case $\beta=\pi/2$, $x=\pi/2$, $u=2$, $D_t=D_r=1$ is retained; no self-root scan replaces this reference.

For the opposite-polarity antipode, the full equation is $x=\beta|\cos x|$, $0<x\le\beta$. At $\beta=3/2<\pi/2$ there is one root on the decreasing positive-cosine branch. At $\beta=3$, that principal root remains, and two roots occur in $(\pi/2,3)$: $g(x)=x+3\cos x$ is strictly convex there, positive at both endpoints, and negative at $x=2.8$. The negativity is a trigonometric inequality to be bounded in the retained root check. Their transmitter factors are $1-3\sin x$, negative at the first of these secondary roots and positive at the second. None may be deleted on the basis of that sign. The same-circle receiver factor equals the transmitter factor, so root playback is one wherever these roots are simple.

For cross-plane partners of type 1, put $z=2\theta-\beta u$ and use transmitter polarity $\varepsilon=\pm1$. The squared chord equation is

$$
F(u;\theta)=u^2-2+\varepsilon[\sin z+\sin(\beta u)]=0.
$$

Because $u>0$, this has exactly the same roots as the unsquared positive-distance equation. A fold has $F=F_u=0$, giving

$$
\sin z=\varepsilon(2-u^2)-\sin(\beta u),\qquad
\cos z=\cos(\beta u)+2\varepsilon u/\beta.
$$

The necessary and sufficient scalar fold condition is therefore

$$
H_\varepsilon(u)=[2-u^2-\varepsilon\sin(\beta u)]^2+[\cos(\beta u)+2\varepsilon u/\beta]^2-1=0.
$$

Type 2 gives the same two functions with $\varepsilon$ reversed. The companion [root-admission instrument](../evidence/spherical-three-three-dynamics-superfield-roots.mjs) bounds these functions with outward-rounded BigInt intervals at rational grid points and an explicit derivative bound between them. It uses Taylor polynomials and exact rational Lagrange remainder bounds for sine and cosine, not binary64 sign tests. Before target use, `controls` passed signed floor/ceiling, interval addition/squaring, exact trigonometric values at zero, the known identity $H_\varepsilon(0)=4$, and independent broad alternating-series bounds at argument one. Target root admission remains pending at this initial checkpoint.

### Completed admission at $\beta=3/2$

**Derived with an exact-arithmetic bound instrument, awaiting independent review.** Every reception phase has exactly one positive-delay self root, one own-circle antipodal root and one root from each of the four cross-plane partners. Thus each receiver has six admitted roots and the six-member ledger has thirty-six roots. All transmitter factors are positive. No positive-delay root is excluded.

The cross-plane count follows from a continuation argument with explicit boundaries. The bound instrument evaluates $H_\varepsilon$ at every $u=k/100$, $0\le k\le200$. Its interval arithmetic has scale $10^{24}$ with integer outward rounding; sine is expanded through degree 39 and cosine through degree 40, with rational Lagrange remainder bounds. For $0\le u\le2$,

$$
|H_\varepsilon'(u)|\le6(4+\beta)+2(1+4/\beta)(\beta+2/\beta).
$$

At $\beta=3/2$ this is $484/9$. Every point is within $1/200$ of a grid node, so subtracting $484/1800$ from each lower grid bound gives a whole-interval lower bound. The [retained receipt](../evidence/spherical-three-three-dynamics-superfield-root-bounds.json) yields $H_{-1}>3.73$ and $H_{+1}>0.68$ throughout $[0,2]$. The displayed rounded inequalities are weaker than the exact fixed-point comparisons used by the instrument. Consequently neither cross-plane root type can have $D_t=0$.

At receiver phase zero, the type-1 transmitter lies in the perpendicular plane, so its unique root is $u=\sqrt2$ with $D_t=1$. At receiver phase $\pi/2$, the same statement holds for type 2. Varying reception phase connects each root family to one of these exact reference events. Roots cannot pass through zero because $F(0;\theta)\le-1$. They cannot pass through $u=2$ at this speed: each expression there is at least $1-|\sin3|>0$. All roots therefore remain in a compact interior delay interval; the absence of non-simple roots preserves the count and positive sign of $D_t$. This proves one root per cross-plane partner for the complete period, rather than inferring completeness from a sign scan.

The self and antipodal uniqueness statements above finish the ledger. The scalar self root is bracketed analytically in $x\in(0,3/2)$ by the strictly decreasing ratio $\sin x/x$; the antipodal root is bracketed in $x\in(0,3/2)$ by the strictly increasing function $x-(3/2)\cos x$. Their actual positive delays are $u=4x/3$. This is admission and analytical bracketing, not a numerical trajectory or a residual calculation.

### Specific non-simple-root obstruction at $\beta=3$

For this speed, the same interval instrument gives $H_{-1}>1.36$ throughout $[0,2]$, but establishes opposite signs of $H_{+1}$ at the ends of two disjoint intervals:

| Delay interval | Left endpoint bound | Right endpoint bound |
| --- | ---: | ---: |
| $(0.43,0.44)$ | $H(0.43)>0.0476$ | $H(0.44)<-0.0050$ |
| $(1.15,1.16)$ | $H(1.15)<-0.0029$ | $H(1.16)>0.0018$ |

By continuity, each contains a delay $u_*$ with $H_{+1}(u_*)=0$. Set

$$
z_* = \operatorname{atan2}\bigl(2-u_*^2-\sin(3u_*),\ \cos(3u_*)+2u_*/3\bigr),
\qquad
\theta_*=(z_*+3u_*)/2\pmod\pi.
$$

The unit-circle identity $H=0$ makes these values satisfy both $F=0$ and $F_u=0$ exactly. They are genuine positive-delay, noncollision cross-plane roots with $D_t=0$, not zeros introduced by squaring or omitted self roots. At either root, $F_{uu}=9u_*^2-16<0$, so the emission-time degeneracy is quadratic. The intervals prove existence of at least two such non-simple events; they do not claim a complete classification of every singular event at this speed.

A separate elementary root-count argument explains why the singularity is unavoidable. For a positive next-plane partner at receiver phase zero there is one root, $u=\sqrt2$. At phase $\pi/2$, its root equation is $u^2-2+2\sin(3u)=0$. Its signs at $0,\pi/6,\pi/3,2$ alternate negative, positive, negative, positive, giving at least three distinct roots. The upper endpoint is never a cross-plane root because $1-|\sin6|>0$, and zero is excluded as before. The change of count therefore requires an interior non-simple root. The interval calculation locates two definite instances of that obstruction.

The same-circle ledger remains meaningful separately: one self root follows from $1<3<\pi$, and three antipodal roots follow from the absolute-cosine equation. For the secondary antipodal roots, the elementary estimate $\cos(2.8)<-0.94$ gives $g(2.8)<-0.02$; it can also be checked by the displayed Taylor polynomial and remainder construction. Strict convexity of $g$ on $(\pi/2,3)$ then gives exactly two secondary roots, with opposite nonzero derivative signs. This does not remove the independent cross-plane singularity and does not authorize continuing the whole assembly through it with an invented event rule.

### Receiver factors and disposition

At an ordinary cross-plane root, $F_u=2uD_t$. The receiver factor remains $D_r=1-\hat{\mathbf r}\cdot\mathbf V_i$ and appears only in root playback $dS/dT=D_r/D_t$, never as an additional acceleration denominator or multiplier. With the local tangent product $B_j$ used above, $D_r=1+\varepsilon\beta B_j/u$. A zero of $D_r$ alone is not a root-admission failure. This admission slice does not certify a nonzero receiver-factor floor, because the canonical acceleration does not require one. At the $\beta=3$ non-simple events, the failure is $D_t=0$ regardless of $D_r$.

The single short target run was `node --max-old-space-size=256 reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-superfield-roots.mjs target reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-three-three-dynamics-superfield-root-bounds.json`. It reran controls first, then measured 0.0511 seconds and 57.7 MB RSS through `performance.now()` and `process.memoryUsage()`. No target acceleration or full residual was evaluated. The durable companion and receipt preserve the complete reproduction path; no bulky output or long-running process was created.

**Completed-slice checkpoint.** The $\beta=3/2$ synchronized history has a complete ordinary thirty-six-root ledger throughout its period. The $\beta=3$ synchronized history necessarily encounters cross-plane non-simple roots, so a full-period ordinary-root acceleration ledger is not available under the present sharp-root chart. Both conclusions await independent review of the fold reduction and interval implementation. A sign error in $F_u$, failure of the interval remainder/rounding bounds, or a missed boundary root would falsify the corresponding conclusion. The next dependency is reviewer adjudication; after that, a bounded residual diagnostic at $\beta=3/2$ is admissible, while $\beta=3$ requires an explicitly owned singular-event treatment before any continuation claim. No fate or physical support conclusion follows from this root boundary.

The root-admission companion passed `node --check`; it and the extended analysis passed `git diff --no-index --check /dev/null <file>`. The companion is frozen at SHA-256 `73f65040e65dcefafdbe26010bff2fb7d5353c3a60a956963acb7c1885889a4b`, and its retained receipt at `6f7a145f62cb64d563edae86948733d67002598dadf72e4bdb46e2ab821c78aa`, measured by `shasum -a 256`. These are preservation and syntax checks, not independent scientific adjudication.

## Exact phase-zero vector and obstruction at $\beta=3/2$

This follow-up derives a decisive necessary-condition failure before running a target residual calculation. It includes the positive-delay self root explicitly. The numerical companion has been prepared and its known controls passed, but its target mode has not been run; the full-period admission result above is still under independent review at this checkpoint.

Take the positive receiver on circle $0$ at phase zero, so its position is $\mathbf e_x$, velocity is $\beta\mathbf e_y$ and required prescribed acceleration is $-\beta^2\mathbf e_x$. Set $\beta=3/2$ and retain $R=c_f=K_{\mathrm{int}}=1$ for the vector formula. Define the self half-angle $x$ and opposite-polarity antipodal half-angle $a$ by

$$
x=\beta\sin x,\quad 0<x<\beta<\pi/2,
\qquad
a=\beta\cos a,\quad 0<a<\beta<\pi/2.
$$

Their uniqueness and positive transmitter factors follow from the earlier one-lobe arguments. Write $q=\sqrt2\beta$, and let $u_+,u_-$ be the delays from the positive and negative members on the $xz$ circle. They are the unique roots

$$
u_+=2\sin(\pi/4+\beta u_+/2),\quad \sqrt2<u_+<2,
$$

$$
u_-=2\cos(\pi/4+\beta u_-/2),\quad 0<u_-<\pi/(2\beta).
$$

These brackets admit a direct completeness proof at this event, separately from the whole-period bound instrument. For the positive source, $\sin(\beta u)>0$ on $0<u\le2$, so the chord $\sqrt{2+2\sin(\beta u)}$ is greater than $\sqrt2$. On $[\sqrt2,2]$, the angle $\pi/4+\beta u/2$ exceeds $\pi/2$, so the root residual $u-2\sin(\pi/4+\beta u/2)$ has positive derivative greater than one. Its endpoint signs are negative and positive. For the negative source before $u=\pi/(2\beta)$, the residual $u-2\cos(\pi/4+\beta u/2)$ is strictly increasing from negative to positive. Beyond that point the absolute-cosine chord obeys

$$
2|\cos(\pi/4+\beta u/2)|
\le\beta u-\pi/2<u,
\qquad \pi/(2\beta)\le u\le2,
$$

because $\beta=3/2$ and $\pi/2>(\beta-1)u$. Thus no second negative-source root exists. Both $yz$ source roots have exact delay $\sqrt2$ and $D_t=1$, since their entire source circle is perpendicular to the receiver position. This provides the complete six-root phase-zero ledger without assuming the full-period result under review.

Put $\delta_\pm=\beta u_\pm$. The full canonical vector at this event is

$$
\begin{aligned}
\mathbf A={}&
\frac{(\sin x,\cos x,0)}{4\sin^2x(1-\beta\cos x)}
+\frac{(-\cos a,\sin a,0)}{4\cos^2a(1+\beta\sin a)}\\
&+\frac{(0,-\cos q,\sin q)}{\sqrt2}
+\frac{(1+\sin\delta_+,0,-\cos\delta_+)}{u_+^3(1-\beta\cos\delta_+/u_+)}\\
&-\frac{(1-\sin\delta_-,0,\cos\delta_-)}{u_-^3(1+\beta\cos\delta_-/u_-)}.
\end{aligned}
$$

The five displayed terms are respectively the self hit, the own-circle antipodal hit, the exact sum of two $yz$ hits, the positive $xz$ hit and the negative $xz$ hit. All six roots are simple. The last two terms have zero $y$ component because their entire source histories and the receiver lie in the $xz$ plane. Therefore the along-path projection is exactly

$$
A_y=
\frac{\cos x}{4\sin^2x(1-\beta\cos x)}
+\frac{\sin a}{4\cos^2a(1+\beta\sin a)}
-\frac{\cos(3/\sqrt2)}{\sqrt2}.
$$

**Derived exclusion, awaiting separate review.** The self and antipodal terms are strictly positive, and the remaining term is positive as well. An explicit root-independent lower bound follows from the alternating Taylor upper bound

$$
\cos(3/\sqrt2)
\le1-\frac{9}{4}+\frac{81}{96}
=-\frac{13}{32}.
$$

For this argument, the cosine-series tail after degree four starts negative and its term magnitudes decrease, since the argument squared is $9/2$ and every subsequent factorial ratio is at least $5\cdot6$. Consequently

$$
A_y>\frac{13}{32\sqrt2}>0.
$$

A normal correction at $\mathbf e_x$ has no $y$ component, whereas the prescribed constant-speed great circle requires zero $y$ acceleration. Thus the synchronized orthogonal-circle history at $\beta=3/2$ cannot satisfy the normal-only constrained equation. Restoring radius and positive fixed coupling gives $A_y>13K_{\mathrm{int}}/(32\sqrt2R^2)$, so changing radius cannot repair this history. This lower bound is a necessary-condition obstruction, not a measured speed increase or a free-evolution result.

The same-event normal support and the other residual components are determined by $\lambda=-\beta^2-A_x$, $\mu=-A_y$ and $\nu=-A_z$. No numerical value is needed for the exclusion. A wrong self tangent sign, a missing phase-zero root, or an error in the cosine upper bound would falsify the proof. A different speed, winding, phase, curve or added tangent controller is outside this particular result.

### Prepared diagnostic and checkpoint

The new [phase-zero companion](../evidence/spherical-three-three-dynamics-phase-zero-superfield.mjs) implements the displayed scalar brackets and six canonical contributions. Its `controls`-only execution passed a known linear root, a rejected invalid bracket, the absent self-root case at $\beta=1/2$, the exact self endpoint at $\beta=\pi/2$, the exact antipodal half-angle $\pi/6$ at $\beta=\pi/(3\sqrt3)$, and the stationary-transmitter case with $D_r=0$ but nonzero acceleration. These are the independently frozen analytical controls, not target output used as an expectation. At the self endpoint it returned $u=2$, $D_t=D_r=0.9999999999999999$ and $\mathbf A=(0.25000000000000006,1.53\times10^{-17},0)$, within its $2\times10^{-13}$ comparison tolerance. No target run was performed.

**Completed preparation checkpoint.** The full vector reference and an analytical radius-independent exclusion are retained above, with the complete phase-zero root proof. The target diagnostic is ready but unnecessary for establishing the sign obstruction and remains unrun pending admission review. The next dependency is independent adjudication of this separate proof; no phase scan, $\beta=3$ residual or singular-event continuation is proposed. All prior instruments and receipts remain unchanged, and no job remains active.

## Radius and support map after root-admission review

The coordinator supplied the independent acceptance of the $\beta=3/2$ full-period admission and the $\beta=3$ ordinary-chart obstruction before authorizing this map. The new map fixes $K_{\mathrm{int}}=c_f=1$ and uses $g\in\{0.1,1,10\}$, hence radii $R=1/g\in\{10,1,0.1\}$. It reuses the retained sub-wake period samples and adds one controlled phase-zero evaluation at $\beta=3/2$. It does not assign energy levels or claim evolved constant-speed motion.

### Exact scaling and sign conventions

Let $\lambda_1,\mu_1,\nu_1$ be the unit-radius normal support, along-path correction and sideways correction at the corresponding prescribed phase, with coupling one. Under $\mathbf X_R(T)=R\mathbf X_1(T/R)$, velocities and $\beta$ are unchanged, every positive causal delay scales by $R$, all transmitter and receiver factors are unchanged, and canonical acceleration scales by $R^{-2}$. The required great-circle centripetal acceleration instead scales by $R^{-1}$. Therefore

$$
\lambda_R=g^2\lambda_1+(g^2-g)\beta^2,
\qquad
\mu_R=g^2\mu_1,
\qquad
\nu_R=g^2\nu_1.
$$

The full residual magnitude scales by $g^2$. Dimensionless supports $R\lambda_R$, $R\mu_R$, $R\nu_R$ follow by dividing these values by $g$. The positive normal direction points away from the fixed center; $\lambda_R<0$ means additional inward support, while $\lambda_R>0$ means outward support. Positive $\mu_R$ adds acceleration along the prescribed velocity. The sideways sign uses $\mathbf b=\mathbf n\times\mathbf t$; its sign reverses between antipodal members, even though its magnitude, along-path support and normal support agree. These are the accelerations that would have to be added to maintain the prescribed history. Only normal support is an adopted experiment constraint; the other two remain mismatch diagnostics.

### Sub-wake full-period sample map

The following values are scaled from the original 768-phase data. Normal ranges are **sampled extrema**, and RMS values are sample means over members and phases; none is asserted to be a certified continuous extremum. Supports are dimensional acceleration values in the declared normalized units.

| $\beta$ | $g$ | $R$ | Signed normal range | Normal RMS | Along-path RMS | Sideways RMS | Full residual RMS |
| --- | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| $0.25$ | $0.1$ | $10$ | $[-0.008219,0.000578]$ | $0.004838$ | $0.006299$ | $0.009376$ | $0.011295$ |
| $0.25$ | $1$ | $1$ | $[-0.259417,0.620319]$ | $0.347320$ | $0.629932$ | $0.937558$ | $1.129527$ |
| $0.25$ | $10$ | $0.1$ | $[-20.316711,67.656943]$ | $37.960014$ | $62.993201$ | $93.755843$ | $112.952652$ |
| $0.75$ | $0.1$ | $10$ | $[-0.059125,-0.049104]$ | $0.054220$ | $0.009308$ | $0.009279$ | $0.013143$ |
| $0.75$ | $1$ | $1$ | $[-0.849992,0.152066]$ | $0.485792$ | $0.930756$ | $0.927883$ | $1.314258$ |
| $0.75$ | $10$ | $0.1$ | $[-34.374150,65.831639]$ | $37.277146$ | $93.075629$ | $92.788268$ | $131.425779$ |

The positive/negative normal ranges mean the required radial correction changes direction during the sampled history. The all-negative normal range at $\beta=0.75,R=10$ means inward support was needed at every sampled phase. Neither observation removes the nonzero tangent-plane mismatch. The previously derived period mean $\langle\mu_R\rangle=-g^2C(\beta)<0$ is an exact obstruction across the full sub-wake family, independently of the sampled extrema.

### Minimal admitted $\beta=3/2$ event map

The [phase-zero target receipt](../evidence/spherical-three-three-dynamics-phase-zero-superfield-target.jsonl) records controls first and then six admitted roots. At unit radius it gives

$$
\mathbf A=(-0.07007214418808366,\ 0.6344798540967014,\ -0.30916715686370033).
$$

This is a binary64 magnitude check of the exact vector formula, not independent proof of it. The supports below refer to the positive receiver on circle $0$ at phase zero. All six members have the same support magnitudes at that event by symmetry; antipodal sideways signs reverse. **These are event values, not full-period RMS or extrema.**

| $g$ | $R$ | Signed normal $\lambda_R$ | Signed along-path $\mu_R$ | Signed sideways $\nu_R$ | Full residual magnitude |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $0.1$ | $10$ | $-0.224299$ | $-0.006345$ | $0.003092$ | $0.007058$ |
| $1$ | $1$ | $-2.179928$ | $-0.634480$ | $0.309167$ | $0.705797$ |
| $10$ | $0.1$ | $-15.492786$ | $-63.447985$ | $30.916716$ | $70.579672$ |

All three event cells require inward normal support and an opposing along-path correction. The exact phase-zero lower bound above makes the along-path mismatch nonzero at every finite positive radius; changing radius only rescales it. No radius in the map, or elsewhere at fixed shape and speed, removes the certified mismatch for the sub-wake histories or the derived $\beta=3/2$ event obstruction. The latter proof remains subject to its separate independent reconstruction at this checkpoint.

At $\beta=3$, all three $g$ cells retain the status **inadmissible for a full-period ordinary-root residual** because the same dimensionless cross-plane $D_t=0$ events persist under radius scaling. No acceleration or support value was assigned to those cells, and no physical impossibility or fate is inferred from the chart boundary.

### Map provenance, checks and profiling limitation

The [scaling companion](../evidence/spherical-three-three-dynamics-radius-map.mjs) records the SHA-256 identities of its input files in the [complete support-map receipt](../evidence/spherical-three-three-dynamics-radius-map.json). It retains signed means, RMS values, sampled ranges and dimensionless supports, including explicit per-cell scope. Before reading retained target inputs it passed known mean/RMS controls and a direct radius-ten synthetic normal-support control, $\lambda=-0.25/10+0.1/100=-0.024$. This checks that the centripetal term scales as $R^{-1}$ rather than being incorrectly scaled with the interaction. The map reruns no root geometry at another radius.

The sole new target evaluation used `/usr/bin/time -l node --max-old-space-size=256 .../spherical-three-three-dynamics-phase-zero-superfield.mjs target reviewed-admission`. The target emitted its complete controls and result successfully. The retained [profile output](../evidence/spherical-three-three-dynamics-phase-zero-superfield-profile.txt) measured 0.05 seconds real time, but `/usr/bin/time -l` then returned exit status 1 because the sandbox denied `sysctl kern.clockrate`; extended resource statistics, including peak memory, are unavailable. This is a profiling limitation, not a numerical target failure. The original output and partial profile are preserved, and the target was not rerun merely to repair telemetry. No job remains active.

**Completed map checkpoint.** Nine radius/speed cells have support magnitudes with their distinct sample/event boundaries; three $\beta=3$ cells have the accepted ordinary-chart obstruction. Exact scaling and known controls support the map; no new free evolution, energy relation or singular-event treatment was introduced. Coordinator integration and review of the new magnitude/scaling receipt are the remaining handoff dependencies.

## Local ordinary-side behavior of the $\beta=3$ singular events

This analytical slice studies the two admitted cross-plane non-simple events without selecting a passage rule at $D_t=0$. For the positive receiver on circle $0$ and positive next-plane source, the retained equation is $F(u,\theta)=u^2-2+\sin(2\theta-3u)+\sin3u$. At a fold delay, $F_{uu}=9u^2-16$ and $F_\theta=2[\cos3u+2u/3]$. The previously isolated delay intervals put $F_{uu}<0$; reception transversality and possible simultaneous singular contributions remain to be checked before making a total-acceleration claim.

The new [local-fold companion](../evidence/spherical-three-three-dynamics-fold-local.mjs) preserves the earlier certificate and uses its integer/Taylor interval arithmetic in a separate small instrument. It isolates zeros of $H_+$ on the whole delay domain using interval exclusion and the exact factored derivative

$$
H_+'(u)=2(u^2-16/9)(2u+3\cos3u).
$$

Every accepted root interval must have opposite endpoint signs and a derivative interval excluding zero; every other interval must be excluded or remain explicitly unresolved. Before target use, its controls found exactly one bracketed root of $x^2-2$ on $[1,2]$, verified that the rational bracket straddled the exact algebraic value by integer squaring, excluded all roots of $x^2+1$ on $[0,1]$, and recovered the exact trigonometric values at zero and $H_+(0)=4$. The controls passed. The next step is a short interval isolation, not a phase scan or target residual calculation.

### Two ordinary folds with reception transversality

The [local-fold interval receipt](../evidence/spherical-three-three-dynamics-fold-local.json) establishes exactly two zeros of $H_+$ on $[0,2]$, using 135 interval cells and leaving none unresolved. Together with the earlier positive lower bound for $H_-$, this completes the cross-plane fold-delay classification for this synchronized speed. The following outward-rounded displayed bounds are slightly wider than the retained intervals:

| Quantity | First event | Second event |
| --- | --- | --- |
| $u_*$ | $(0.43902063,0.43902070)$ | $(1.15595132,1.15595139)$ |
| $F_\theta$ | $(1.08740160,1.08740205)$ | $(-0.35322615,-0.35322570)$ |
| $F_{uu}$ | $(-14.26534795,-14.26534747)$ | $(-3.97398889,-3.97398764)$ |
| $\sin2\theta_*$ | $(0.73696859,0.73696902)$ | $(-0.87575188,-0.87575148)$ |
| $\cos2\theta_*$ | $(-0.67592702,-0.67592657)$ | $(0.48276166,0.48276200)$ |

Both $F_\theta$ and $F_{uu}$ are nonzero, so these are ordinary quadratic folds, not higher-order emission degeneracies or reception-tangent degeneracies. Reception phases are determined modulo $\pi$ by the displayed sine/cosine pair; approximate phase labels are $1.15651$ and $2.60810$ radians. The interval phase signatures, rather than these rounded labels, carry the separation argument.

For a fixed receiver, type-1 negative sources and type-2 positive sources have no non-simple roots because their condition is $H_-=0$. Type-2 negative-source folds are the type-1 positive-source folds shifted by $\pi/2$ in reception phase. The two displayed phase signatures are neither equal nor negatives of each other; their narrow disjoint intervals prove this. Consequently no other cross-plane source pair is singular at either representative event. The one self root and three antipodal roots are phase-independent and ordinary at $\beta=3$. All remaining partner roots, including any ordinary third root from the singular pair, are also retained as a bounded local background. Finite root counts and boundedness follow from analytic root functions on a compact positive-delay interval with no other zero derivatives at the event; present partner separation is at least one, so their delays are at least $1/4$.

### Square-root splitting and signed transmitter factors

Set $h=\theta-\theta_*$ and $q=\operatorname{sign}F_\theta(u_*,\theta_*)$. The two coalescing roots exist on the ordinary side $qh>0$, sufficiently close to the fold, and obey

$$
u_\pm(\theta)=u_*\pm c\sqrt{|h|}+O(|h|),
\qquad
c=\sqrt{\frac{2|F_\theta|}{|F_{uu}|}}>0.
$$

To derive this, use $F=F_u=0$ in the Taylor expansion $F=F_\theta h+F_{uu}(u-u_*)^2/2+O(h^2+|h||u-u_*|+|u-u_*|^3)$. Since $F_{uu}<0$, the sign of $h$ must match $F_\theta$ for two real nearby roots. The first event therefore has its two-root side at $h>0$, and the second at $h<0$. On the other local side there are no roots from this coalescing pair; any separate ordinary roots remain in the ledger.

At a root, $D_t=F_u/(2u)$, hence

$$
D_{t,\pm}=\pm\frac{F_{uu}c}{2u_*}\sqrt{|h|}+O(|h|).
$$

The larger-delay branch has negative $D_t$ and the smaller-delay branch positive $D_t$. Both are admitted. Conservative consequences of the retained interval bounds are $0.390<c<0.391$ at the first fold and $0.421<c<0.422$ at the second. Their reception factor has the nonzero limit

$$
D_r^*=\frac{3F_\theta}{2u_*},
$$

obtained by differentiating the squared root equation with respect to the common phase. Thus signed playback $D_r/D_t$ diverges, but $D_r$ is not an additional denominator in the canonical acceleration. This derivation uses $R=c_f=1$, $\beta=3$; an absolute-time displacement satisfies $h=3(T-T_*)$.

### The paired acceleration adds and the required support diverges

Let $\mathbf n_*=[\mathbf u_0(\theta_*)-\mathbf u_1(\theta_*-3u_*)]/u_*$ be the unit chord direction of the representative positive-source fold. Both roots approach this same direction and have the same positive polarity product. The absolute transmitter weight therefore gives the pair sum

$$
\mathbf A_{\mathrm{pair}}
=\frac{B\mathbf n_*}{\sqrt{|h|}}+O(1),
\qquad
B=\frac{4}{u_*|F_{uu}|c}>0.
$$

The opposite signs of $D_t$ do not cancel: replacing $|D_t|$ by $D_t$ would change the canonical law. Conservative coefficient ranges are $1.63<B<1.64$ at the first fold and $2.06<B<2.07$ at the second. Because the rest of the complete admitted ledger is bounded locally and no other pair is singular at the same event, this is also the leading term of the total canonical acceleration. Divergence is therefore a property of the total ordinary-chart acceleration, not merely one large summand left susceptible to an omitted cancellation.

At the receiver, let $\mathbf n_i=\mathbf u_0(\theta_*)$ be the outward sphere normal and $\mathbf t_i$ its positive path tangent. Equal source and receiver radius give $\mathbf n_i\cdot\mathbf n_*=u_*/2>0$, while the receiver factor gives

$$
p_t=\mathbf t_i\cdot\mathbf n_*=\frac{1-D_r^*}{3}.
$$

The interval bounds imply $-0.91<p_t<-0.90$ at the first fold and $0.48<p_t<0.49$ at the second, so neither tangent projection vanishes. With $p_b=\mathbf b_i\cdot\mathbf n_*$ and $\mathbf b_i=\mathbf n_i\times\mathbf t_i$, the identity $p_b^2=1-(u_*/2)^2-p_t^2$ also gives $p_b^2>0.12$ and $p_b^2>0.42$, respectively. Thus normal, along-path and sideways corrections all diverge in magnitude:

$$
\lambda=-\frac{Bu_*}{2\sqrt{|h|}}+O(1),
\qquad
\mu=-\frac{Bp_t}{\sqrt{|h|}}+O(1),
\qquad
\nu=-\frac{Bp_b}{\sqrt{|h|}}+O(1).
$$

For these positive-source representatives the normal support diverges inward. Along-path correction diverges positively at the first fold and negatively at the second. The quarter-period negative-source companion has the opposite polarity product and corresponding sign changes; it occurs at a different reception event and cannot cancel the representative divergence.

**Claim boundary.** These are local asymptotics of the prescribed history on its ordinary two-root side. The divergence exponent $|h|^{-1/2}$ is locally integrable, but that fact alone supplies neither an accepted event impulse nor a continuation of the history. No acceleration value is assigned at $D_t=0$, no singular-event rule is added, and no physical fate or evolved constrained motion follows. The exact event-local domain is a sufficiently small neighborhood containing only the indicated coalescing roots and bounded ordinary background, with $h\ne0$ and $qh>0$. The other side and the singular event itself are not bridged by this calculation.

### Completed local-boundary checkpoint

The short interval job reran its known controls and measured 0.0351 seconds and 54.9 MB RSS through `performance.now()` and `process.memoryUsage()`. It evaluated root geometry and derivative bounds only. The original admission certificate and all earlier instruments remain unchanged. The new companion and receipt preserve exact fixed-point delay brackets, parameter-derivative bounds, phase-separation evidence and the reproduction path.

The decisive result is a quantified ordinary-chart boundary: two individually ordinary folds, a complete exclusion of simultaneous cancellation at each representative receiver event, and a nonzero $|\theta-\theta_*|^{-1/2}$ divergence of total canonical acceleration and every required support component on the two-root side. This is derived with an exact-arithmetic isolation instrument and remains subject to independent adjudication. The next dependency is a separate check of the derivative factorization, isolation completeness, root-side signs and absolute-weight coefficient; changing any of those would falsify the corresponding conclusion. No additional phase scan or continuation is needed for this slice, and no job remains active.
