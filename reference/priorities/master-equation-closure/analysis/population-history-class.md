# Complete-history population class

## Scope and disposition

This analysis proposes one deterministic initial-history class for the population extension of $\mathbb{A}\mathbb{A}\mathbb{A}$. Its complete pasts, quantitative density, perturbation topology, and root census are compatible: stationary histories and a family of independently perturbed nonstationary histories realize them. They do not yet define an infinite EOM update. In fact, arbitrary individual-source ordering is impossible already on the stationary member. A summation theorem must therefore specify its more restricted ordering scope or return this obstruction; density and root regularity cannot supply unconditional summation.

The construction includes two distinguished targets whose spatial envelope is larger than the environmental envelope. This prevents the environmental localization assumption from imposing target coincidence exclusion by definition. Complete pasts are prescribed input, not asserted all-time EOM solutions. No future trajectory, probability distribution, physical cell grouping, account map, or universal speed ceiling is supplied.

This is the exclusive output for campaign effort 2. The frozen input is [Population admissibility: ordering, derivatives, and evolution](coincide-or-not.md#population-admissibility-ordering-derivatives-and-evolution); the [campaign contracts](../work-queue.md#effort-contracts) retain dispatch and integration authority. The coordinator must accept or amend this proposed class before separate summation and derivative efforts consume it. Candidate-class selection has claim grade `guessed`; the implications below have claim grade `derived` under the displayed assumptions.

## Labels, charges, and complete pasts

Normalize $c_f=1$ and translate the release cut to $T_0=0$. Fix a reference length $L>0$, lattice spacing $\ell=L/100$, and coupling $\kappa>0$. The reference length is a declared comparison scale, not an emergent constant. Labels are $a=(a_1,a_2,a_3)\in\mathcal I=\mathbb Z^3$, with anchor $\mathbf z_a=\ell a$. Labels $0$ and $e_1=(1,0,0)$ are the two targets; all other labels are environment. Fixed charges are

$$
q_a=q_0(-1)^{a_1+a_2+a_3},\qquad q_0>0.
$$

Thus the charge bounds are exactly $q_-=q_+=q_0$, both polarities occur infinitely often, and charge does not vary under history perturbation. The alternating assignment is a mathematical choice. It neither identifies a physical assembly nor declares a summation partition. In particular, independent displacements need not retain equal-time moments.

Each input supplies $\mathbf X_a:(-\infty,0]\to\mathbb R^3$ for every label. Write $\mathbf u_a=\mathbf X_a-\mathbf z_a$, $\mathbf V_a=\dot{\mathbf X}_a$, and $\mathbf A_a^{\rm hist}=\ddot{\mathbf X}_a$; the last symbol denotes a derivative of prescribed input and is not asserted to equal the EOM acceleration. Impose, at all $s\le0$,

$$
\sup_{a\notin\{0,e_1\},s}\|\mathbf u_a(s)\|\le b=\ell/16,
\qquad
\sup_{a\in\{0,e_1\},s}\|\mathbf u_a(s)\|\le B=4\ell.
$$

All paths are $C^3$ on the complete past, with one-sided derivatives at zero and uniform bounds

$$
\|\mathbf V_a\|\le V_*=4,\qquad
\|\mathbf A_a^{\rm hist}\|\le A_*=256/\ell,\qquad
\|\mathbf X_a^{(3)}\|\le J_*=65536/\ell^2.
$$

These are sufficient regularity assumptions of this chosen class. The bound $V_*=4>1$ permits super-field history segments; it is neither a fundamental velocity limit nor a sub-field premise. The nonemptiness proof may use a slower subset without changing this distinction. At release impose pairwise separation $\|\mathbf X_i(0)-\mathbf X_j(0)\|\ge d_*=\ell/8$ for $i\ne j$. This release-only condition does not prescribe a positive target separation for future time.

Finite restrictions $\mathcal I_N=\{a:\|a\|_\infty\le N\}$, $N\ge1$, inherit these complete pasts and fixed charges. They are finite comparison inputs, not members of the infinite high-density class: no finite population satisfies a positive shell lower bound at every arbitrarily large radius. This distinction is essential for a later exhaustion theorem.

## Density and its meaning

For every center $\mathbf x\in\mathbb R^3$, every time $s\le0$, and radius $R\ge R_0=40\ell$, define the occupied dyadic shell by $R\le\|\mathbf X_a(s)-\mathbf x\|<2R$. The proposed shell constants are

$$
\rho_-=4\pi\ell^{-3},\qquad \rho_+=16\pi\ell^{-3},\qquad
\rho_-R^3\le N(\mathbf x,s;R)\le\rho_+R^3.
$$

These inequalities follow from the displacement bounds rather than constituting additional empirical evidence. To prove them, associate each anchor with its disjoint cube of volume $\ell^3$. Every cube point is within $\sqrt3\ell/2+B<5\ell$ of its label's actual position. Put $D=5\ell$; then $D/R\le1/8$. Cubes belonging to labels in the shell lie within the annulus with radii $R-D$ and $2R+D$. Conversely, the annulus with radii $R+D$ and $2R-D$ is covered by cubes whose labels lie in the shell, apart from measure-zero boundaries. Hence

$$
\frac{4\pi}{3\ell^3}\big[(2R-D)^3-(R+D)^3\big]
\le N(\mathbf x,s;R)
\le\frac{4\pi}{3\ell^3}\big[(2R+D)^3-(R-D)^3\big].
$$

At $D/R=1/8$, the two dimensionless cubic differences are $2646/512>3$ and $4570/512<12$, which yield the stated conservative constants. The same argument proves local finiteness in bounded spatial regions. It applies to the targets as well as the environment and is uniform over the complete past.

Define “high density at scale $L$” to mean $\rho_-L^3\ge10^6$, with the shell regime and coefficient convention explicitly retained. Here $\rho_-L^3=4\pi\,10^6$ and $R_0=0.4L$, so the criterion holds. This is a deterministic label count, not a probability statement or a measured density of nature.

Claim grade: derived. Falsifier: a displacement-bounded configuration and shell in the declared domain violating the cube-volume inequalities. A finite truncation beyond its populated region is outside this claim.

## Complete root chart at release

For receiver $i$ and source $j$, use positive delay $\tau=-s>0$, range $r_{ij}(\tau)=\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|$, and residual

$$
f_{ij}(\tau)=\tau-r_{ij}(\tau),\qquad
\mathcal R_{ij}=\{\tau>0:f_{ij}(\tau)=0\}.
$$

The sign of this residual is the negative of the canonical range-minus-delay residual; its zero set is identical. At a positive-range root, $\partial_\tau f_{ij}=1-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(-\tau)=D_{t,ij}$. Define $d_{ij}=\|\mathbf z_i-\mathbf z_j\|$. The complete-past displacement assumption gives the global inequality

$$
|r_{ij}(\tau)-d_{ij}|\le2B,\qquad
\mathcal R_{ij}\subset[\max(0,d_{ij}-2B),d_{ij}+2B].
$$

This is an all-earlier-emission exclusion: for $\tau>d_{ij}+2B+\gamma$, $f_{ij}(\tau)>\gamma$. The upper endpoint increases with source distance; there is no common finite memory cutoff. For every cross channel, $f_{ij}(0)<0$ by release separation and $f_{ij}(\tau)>0$ for sufficiently large delay, so continuity gives at least one positive-delay root. Bounded displacement thus prevents an entire cross-source channel from being empty, although a recent-root sector can be empty.

The following uniform root conditions define the regular initial chart; they are additional assumptions, not consequences of density. Set

$$
w=\ell/256,\qquad \tau_0=2w,\qquad
\delta=1/4,\qquad \gamma=w/4,\qquad \eta=1/4.
$$

For every ordered channel, including self channels, require the following complete certificate conditions.

1. Every positive-delay root has a closed enclosure $[\tau_b-w,\tau_b+w]\subset(0,\infty)$, with different root enclosures disjoint. Throughout each enclosure, $r_{ij}\ge w$, $|D_{t,ij}|\ge\delta$, and $f_{ij}$ has exactly one zero. Every root has multiplicity one. Intervals consisting entirely of zeros, folds, repeated roots, and infinite root sets are outside this regular class, not approximated by a finite list.
2. On every cross-channel complement in $\tau>0$ outside these intervals, $|f_{ij}(\tau)|\ge\gamma$. This includes recent inactive sectors and the complete earlier past, with the analytical tail inequality supplying the unbounded part.
3. For each self channel, no root interval meets $[0,\tau_0]$, and $|f_{ii}(\tau)|\ge\eta\tau$ for $0<\tau\le\tau_0$. On its remaining complement $\tau\ge\tau_0$, impose $|f_{ii}(\tau)|\ge\gamma$. Every positive-delay self root is retained. The exact $\tau=0$ diagonal remains excluded and unresolved, with no assigned numeric acceleration.

The normalized self margin is necessary: a constant positive residual gap cannot hold arbitrarily close to the diagonal where $f_{ii}(0)=0$. Its limit also implies $|1-\|\mathbf V_i(0)\||\ge\eta$. This is a stated regular-chart exclusion of equality speed at the cut, not a universal speed restriction. A future equality-speed event may leave the chart.

Root centers lie in an interval of length at most $4B$ and are separated by more than $2w$. Consequently each channel has at most $M=2050$ positive roots, since $4B/(2w)+1=2049$. This conservative population-uniform multiplicity bound follows from the chosen tube width and spatial localization. Self-root centers additionally obey $\tau\le2B$. These assumptions do not cover unbounded multiplicity or near-diagonal accumulation; a downstream proof invoking either phenomenon must report loss of this class.

Claim grade: derived for the range window, cross-root existence, and multiplicity bound; the tube and complement conditions are explicit class assumptions. Falsifier: an omitted zero anywhere in the positive-delay domain, a zero outside the window, overlapping declared tubes, a violated transmitter floor, or a self residual approaching zero faster than its stipulated normalized margin.

## Spatial counts become delayed-root counts

At release define $N_i^{\rm root}(R)$ to count all roots with $R\le r_{ij}=\tau<2R$, with multiplicity and ordered source identity. For $R\ge R_1=64B$, the following conservative bound holds uniformly for every receiver:

$$
\pi\ell^{-3}R^3\le N_i^{\rm root}(R)
\le64\pi M\ell^{-3}R^3.
$$

For the lower bound, take anchors with $5R/4\le d_{ij}<7R/4$. Each associated cross source has at least one root, and its entire root set falls inside $[R,2R)$ because $2B\le R/32$. Anchor cube counting gives at least $\pi\ell^{-3}R^3$ anchors in this thinner annulus: even allowing a cube radius $R/32$, the radial factors $7/4-1/32$ and $5/4+1/32$ give a cubic difference greater than $3/4$. For the upper bound, any counted source has $d_{ij}<2R+2B<3R$. All its anchor cubes fit inside a ball of radius $7R/2$, giving fewer than $64\pi\ell^{-3}R^3$ labels because $(4/3)(7/2)^3=343/6<64$, and each label supplies at most $M$ roots. Self roots do not enter these large shells.

The factors are deliberately loose. The mechanism is explicit: bounded complete-past displacement makes anchor distance comparable to emission range, continuity supplies a cross root, and uniform tubes bound multiplicity. Equal-time shell counts without these ingredients would not justify this estimate. Also, $|D_t|\le1+V_*=5$, so transmitter factors have both upper and lower quantitative control on active roots.

Claim grade: derived under the initial chart assumptions. Falsifier: an admissible channel losing all its cross roots, an active root outside its anchor-distance window, or a delayed count violating the displayed cube and multiplicity bounds.

## History topology and allowed perturbations

Use the uniform complete-past position/velocity distance

$$
\|\mathbf h\|_{\mathcal H}
=\sup_{a,s\le0}\frac{\|\mathbf h_a(s)\|}{\ell}
+\sup_{a,s\le0}\|\dot{\mathbf h}_a(s)\|,
\qquad
\mathbf h_a=\widetilde{\mathbf X}_a-\mathbf X_a.
$$

This is a norm on bounded $C^1$ displacement histories; the class has its relative metric inside that ambient space, with the stated $C^3$, displacement, charge, release-separation, and root constraints. Positions themselves grow with label, but their displacements and differences are bounded. No fading weight suppresses old times. Label-dependent independent perturbations are allowed, including target-only perturbations and perturbations at arbitrarily old emission times. There is no polarity-moment constraint and no symmetry constraint on these perturbations. A boundary point saturating a defining inequality need not have a full ambient neighborhood inside the class; all local claims must specify available slack.

The extra source regularity is load-bearing. At one simple root, for direct position variations $\mathbf h_i(0)$ and $\mathbf h_j(s)$, the moving emission time satisfies

$$
\delta s=-\frac{\hat{\mathbf r}\cdot[\mathbf h_i(0)-\mathbf h_j(s)]}{D_t},
\qquad
\delta\mathbf V_j^{\rm effective}
=\dot{\mathbf h}_j(s)+\mathbf A_j^{\rm hist}(s)\,\delta s.
$$

Thus acceleration of the input history enters the derivative even though the original acceleration row samples source velocity. The bound on jerk supplies a uniform modulus of continuity for that acceleration. On differences of admissible histories, the uniform jerk bound and a one-sided finite-difference estimate give $\|\ddot{\mathbf h}\|_\infty\le C\sqrt{J_*\|\dot{\mathbf h}\|_\infty}$ for sufficiently small differences: compare the derivative with a past difference quotient of width $t$, bound its error by $J_*t$, and minimize $2\|\dot{\mathbf h}\|_\infty/t+J_*t$. This prevents arbitrarily rapid velocity perturbations of small norm from invalidating a single-root first-order expansion. It is not a theorem of infinite-series differentiability.

Root persistence also needs the complements. Direct changes in $f$ are at most $2\ell\|\mathbf h\|_{\mathcal H}$; on a tube, direction variation is controlled by the positive range, and source-velocity variation is controlled by the norm. Uniformly small perturbations therefore preserve a relaxed transmitter floor and one root in each tube, while the complement gap excludes additional roots. On the self near-diagonal sector, the difference of two same-label perturbation values is bounded by $\tau\|\dot{\mathbf h}\|_\infty$, so its normalized margin persists. For strict interior histories these facts provide a neighborhood with relaxed common margins; retaining the exact original constants requires the corresponding initial slack. The derivatives in effort 6 must be evaluated on this relative history domain or a declared extension to the ambient Banach space, not on an undeclared cell-constrained topology.

## Nonempty stationary and nonstationary initial histories

Take $\mathbf X_a(s)=\mathbf z_a$ for every $s\le0$. All displacement, regularity, and release-separation bounds hold. For $i\ne j$, $r_{ij}=d_{ij}\ge\ell$, $f_{ij}(\tau)=\tau-d_{ij}$, and there is exactly one root at $\tau=d_{ij}$ with $D_t=1$. Its width-$w$ tube has range at least $\ell$, and the outside residual has magnitude at least $w>\gamma$. For self channels, $f_{ii}(\tau)=\tau$ and there is no positive-delay root; both the normalized and remaining complement conditions hold. The exact diagonal is not evaluated as a row. The root formulas prove all-earlier completeness analytically rather than by a finite search.

There are also independently perturbed nonstationary members. Let $\phi\in C^3(\mathbb R)$ be a nonconstant smooth bump supported in $(-2,-1)$ with bounded first three derivatives. For arbitrary vectors $\|\mathbf e_a\|\le1$, set

$$
\mathbf X_a(s)=\mathbf z_a+\varepsilon\ell\,\mathbf e_a\phi(s/\ell).
$$

Choose $\varepsilon>0$ small enough that $\varepsilon\|\phi\|_\infty<1/32$, $\varepsilon\|\phi'\|_\infty<1/4$, $\varepsilon\|\phi''\|_\infty<256$, and $\varepsilon\|\phi'''\|_\infty<65536$. All sources then have speed below $1/4$ on this particular subset. The residual increases at least $3/4$ times elapsed delay wherever differentiable; the same inequality follows directly from the source Lipschitz bound even at zero range. Each cross channel has exactly one root, with $D_t\ge3/4$, and the complement magnitude outside its tube is at least $3w/4$. At release the bump vanishes, and every cross range throughout the tube is at least $\ell-\ell/32>w$. Each self residual is at least $3\tau/4$, so no positive-delay self root exists. The allowed smallness choices have strictly positive solutions. No relation between the different vectors $\mathbf e_a$ is required.

Claim grade: derived. These formulas prove nonemptiness and independent nonstationary perturbability of an initial-history subset. They do not prove EOM compatibility of either past, or prescribe a stationary or bump-shaped future. Falsifier: one displayed history satisfying the smallness conditions but violating a stated root count or bound.

## Three ordering questions and the decisive obstruction

The transmitter-side row, complete source contribution, and contribution of one finite bookkeeping cell are respectively

$$
\mathbf a_{ijb}=\kappa q_iq_j\frac{\hat{\mathbf r}_{ijb}}{r_{ijb}^2|D_{t,ijb}|},\qquad
\mathbf F_{ij}=\sum_{b\in\mathcal R_{ij}}\mathbf a_{ijb},\qquad
\mathbf B_{ic}=\sum_{j\in c}\mathbf F_{ij}.
$$

Signed playback is separately $ds/dT=D_r/D_t$, with $D_r=1-\hat{\mathbf r}\cdot\mathbf V_i(T)$. It does not multiply any acceleration row above; neither $D_r=0$ nor a playback sign cancels an acceleration contribution.

**Individual-source ordering.** At the stationary member, every cross source contributes exactly one vector of norm $\kappa q_0^2/d_{ij}^2$. A dyadic anchor shell contains at least a constant times $\ell^{-3}R^3$ sources, so its sum of norms is at least a positive constant times $\kappa q_0^2\ell^{-3}R$. The absolute source series diverges. In finite-dimensional vector space, convergence to the same finite value under every permutation implies absolute convergence: apply the assertion to each real coordinate, where unequal positive and negative subseries can be rearranged to defeat a common finite limit, then use $\|\mathbf v\|\le\sum_k|v_k|$. Therefore the proposed class cannot support an arbitrary-source-order-independent update. This is actual absolute divergence with a lower bound, not failure of an upper majorant. It already decides the universal ordering claim negatively, without asserting that every prescribed exhaustion diverges.

More precisely, applying the established shell lower bound at the stationary member gives, for every $R\ge R_0$,

$$
\sum_{R\le d_{ij}<2R}\|\mathbf F_{ij}\|
\ge\frac{\kappa q_0^2}{4R^2}\rho_-R^3
=\pi\kappa q_0^2\ell^{-3}R.
$$

**Whole-cell ordering in one partition.** A partition into finite sets is extra mathematical input. The class does not select one. A possible diagnostic partition uses the eight labels $2n+\epsilon$, $\epsilon\in\{0,1\}^3$, for each $n\in\mathbb Z^3$. At the stationary member its signed spatial moments of total degree zero, one, and two vanish: every monomial of degree at most two misses one of the three binary coordinates, whose alternating sum is zero. Taylor expansion of the smooth inverse-square vector kernel about the block center leaves a third-derivative remainder $O(\ell^3R^{-5})$ per distant block. Cubic block counting then gives an absolutely convergent block series, with an $O(R^{-2})$ tail at fixed $\ell$. A block containing the receiver is a finite exceptional contribution with its exact diagonal excluded. This is a derived stationary diagnostic, not a delayed nonstationary block theorem. Independent histories in the proposed class need not preserve any of these moments, even at equal time.

An explicit remainder constant can be defined without choosing a numerical derivative instrument. Let $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$, let $C_3=\sup_{\|\mathbf y\|=1}\|D^3\mathbf K(\mathbf y)\|_{\rm op}<\infty$, and let $a_{\rm cell}=\sqrt3\ell/2$ be the maximum vertex displacement from the block center. Homogeneity gives $\|D^3\mathbf K(\mathbf y)\|_{\rm op}\le C_3\|\mathbf y\|^{-5}$. For receiver-to-center distance $R_c\ge2a_{\rm cell}$, summing the eight Taylor remainders yields

$$
\|\mathbf B_{ic}\|
\le\frac{8\kappa q_0^2 C_3a_{\rm cell}^3}{6(R_c-a_{\rm cell})^5}
\le\frac{128\kappa q_0^2 C_3a_{\rm cell}^3}{3R_c^5}.
$$

The finiteness of $C_3$ follows from continuity on the unit sphere. This bound and the geometric series with exponent $3-5=-2$ prove the complete-block tail statement directly.

**Alternative partitions and boundary fragments.** Absolute convergence of that block series permits arbitrary permutation of those complete blocks. It does not permit splitting them or replacing the partition without a further equality proof. An exhaustion cutting blocks can leave order $R^2$ individual boundary sources, each of order $R^{-2}$; the resulting order-one upper bound does not tend to zero and also does not prove a nonzero discrepancy. A later equality theorem must control the actual boundary contribution. No grouping is made physically canonical by its convenient cancellations.

Claim grade: derived for the stationary source-order obstruction and stationary complete-block convergence. Falsifiers: a finite absolute source sum despite the shell lower bound, a nonvanishing stationary block moment of degree at most two, or failure of the stated Taylor remainder away from the block. Nonstationary summation, whole-cell derivatives, and partition equality remain unresolved for the proposed class.

## Future interval and preservation obligations

The requested future interval is $J_h=[0,h]$ with $0<h\le\ell/256$. This declares a target time domain for a later existence argument, not an asserted common lifespan. A candidate evolution must solve the mutually coupled EOM for every environmental and target label; no environmental path is held prescribed after zero.

For later regular estimates, translate the root definitions to reception time $T$ and the complete history $(-\infty,T]$. Seek bounds uniform over receivers, $T\in J_h$, and a specified relative history neighborhood. Environmental displacement $b$, target displacement $B$, velocity and derivative bounds, root widths, normalized self margins, transmitter floors, complements, and derived spatial/root counts are quantities to preserve or replace with explicitly compatible bounds. They are established only for the supplied initial pasts. The release-only separation floor $d_*$ is not a future invariant: on compact pre-contact intervals one instead needs the relevant positive separation/root margins, followed by a separate one-sided contact argument. The two target envelopes overlap substantially and do not prohibit their meeting. Environmental localization does restrict this candidate family; failure of its preservation is a failure of this construction, not a theorem that dense EOM populations cannot exist.

There is no claim of EOM existence even on an arbitrarily short positive interval until the summation rule defines a functional for all labels. There is also no claim that the finite four-body reachability histories belong to this specific class: embedding them requires checking the charge assignment, complete-past bounds, root assumptions, and the coupled population update. Nonemptiness of this class cannot substitute for that embedding.

## Fixed downstream inputs and handoff

| Consumer | Fixed input from this effort | Exact unresolved input |
| --- | --- | --- |
| Effort 5, delayed summation | Labels and charges, complete bounded pasts, shell/root counts, root factors, independent perturbations | A convergent ordering prescription on a stated domain; actual unequal-emission cancellations and uniform tails. Arbitrary source ordering is already excluded for the full class. Any added exact moment constraints change the class and require coordinator approval. |
| Effort 6, history derivative | Uniform complete-past position/velocity norm, $C^3$ bounds, simple-root tubes, normalized self and ordinary complement margins | Full operator-norm derivative and tail on the same domain, including source acceleration times moving emission time. A cell-restricted tangent space is not the present independent-source topology. |
| Effort 7, coupled evolution | Explicit initial constraints, target envelopes, and requested $J_h$ | A self-map for all labels, compatible summation/derivative estimates, and preservation on one common interval. No fixed environmental continuation is supplied. |
| Efforts 8–10 | Finite restrictions distinguished from infinite dense members; targets not geometrically barred from contact | Admissible coupled exhaustion, quantitative trajectory error, embedding, one-sided contact or exclusion, and a differentiable rank statement in this topology. |
| Effort 12, independent adjudication | Explicit analytical stationary and bump controls plus source-order obstruction | Independent reconstruction of the inequalities and any later analytical or numerical acceptance claim; separate authorship alone supplies no independent evidence. |

Proposed coordinator integration text: “Effort 2 supplies a nonempty deterministic Euclidean complete-past class, with high density defined at a reference scale, uniform source regularity, an independent-source position/velocity topology, complete simple-root and complement assumptions, and derived spatial-to-delayed-root counts. Stationary and independently perturbed nonstationary prescribed pasts realize it. Arbitrary individual-source ordering fails already on its stationary member by a positive absolute-shell lower bound; a stationary eight-source diagnostic has convergent complete-block sums only at that narrower ordering scope. The proposed class selects no physical grouping, EOM future, probability measure, or universal speed ceiling. Efforts 5–6 must either establish compatible restricted summation and derivative results on the frozen class or return their precise obstruction; any new moment-constrained subclass requires an explicit class amendment. EOM preservation and dense-class coincidence remain open.”

## Evidence and validation record

- Frozen input at read time, verified by `shasum -a 256`: `coincide-or-not.md` had SHA-256 `4beaa15d9f5af4df34f03967808c0a637bf71823d7bfc22d205e868e0bc37014`, matching coordinator dispatch. Its contents and the existing acceptance reference were not edited by this effort.
- Mathematical evidence consists of the displayed cube-volume bounds, exact stationary root residuals, monotone bump residual estimate, packing estimate, and Taylor expansion. These are analytical derivations; no simulation, EOM validation, or independently accepted certificate is claimed.
- The task-scoped Node checker first passed a known two-expression/one-link case, including a fenced-example exclusion and an invalid-macro rejection, before reading this target. Its initial target run identified an unsupported third-time-derivative macro in the bundled KaTeX renderer; the source uses parenthesized derivative notation after correction. The final results below concern syntax and arithmetic transcription, not independent theorem acceptance.
- No Python, generator write, Git index mutation, publication, or downstream dispatch was performed by this effort.
- Final focused check: `node .tmp/population-history-class/check.mjs` passed 172 KaTeX expressions using the bundled renderer, two relative file targets, balanced dollar delimiters, no trailing whitespace, and five constant/packing comparisons. This is markup rendering, not browser layout inspection or mathematical acceptance.
- `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-history-class.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. A clean one-line control likewise returned 1 with no output; a trailing-space negative control returned 3 and identified its offending line. A final `shasum -a 256` of the frozen coincidence input returned the same dispatch digest. These command scopes establish the reported whitespace result and frozen-input byte identity only.
