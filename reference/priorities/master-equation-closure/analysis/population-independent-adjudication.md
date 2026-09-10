# Independent adjudication of the complete-history population class

## Verdict and scope

The [proposed population class](population-history-class.md) is accepted as a nonempty mathematical class of prescribed initial histories at release time zero. Its density bounds, finite complete channel census, delayed-root counts, stationary and independently perturbed nonstationary realizations, stationary absolute-source obstruction, and stationary eight-source block convergence follow from the assumptions at their stated scope. The history norm is suitable for the declared relative domain; local root persistence has uniform relaxed margins, and preservation of the exact class constants requires uniform slack. None of these conclusions supplies an infinite EOM solution or selects a physical partition.

This adjudication addresses revised [queue contract 1](../work-queue.md#effort-contracts). The subject is read-only. This file contains the independent mathematical reconstruction and proposed coordinator integration; it does not change the queue or the shared closure owners. The stationary and bump controls already in the subject suffice. No additional prescribed-path example is introduced.

| Claim under review | Verdict | Exact accepted or rejected scope |
| --- | --- | --- |
| Nonempty complete-history class | Accept | Stationary histories and the displayed independent bump subset satisfy every defining initial condition. |
| Uniform spatial density and local finiteness | Accept | Every center, every past time, and radii at least the declared shell threshold; finite restrictions are not infinite dense members. |
| Complete root window and channel multiplicity bound | Accept | Every cross channel has a root; all positive roots lie in the stated distance window; the regular-tube assumptions give the conservative bound 2050. Completeness of arbitrary supplied histories remains an admission requirement. |
| Delayed-root shell counts | Accept | Conditional on the complete-past displacement and regular-chart assumptions, uniformly in the receiver. |
| Arbitrary individual-source-order independent update on this class | Reject | The stationary member has a divergent sum of source norms. This accepts the subject's negative theorem. |
| Stationary eight-source block convergence | Accept | Absolute convergence of complete blocks of the displayed diagnostic partition, hence invariance under permutations of those blocks. |
| General nonstationary block convergence or equality across partitions | Unresolved | Neither follows from stationary moment cancellation or the density assumptions. |
| Declared history topology and local regular-root persistence | Accept with explicit scope | Uniform complete-past position/velocity norm on the relative constrained domain; relaxed common margins persist. Exact constants require uniform slack. |
| Infinite-sum differentiability, coupled EOM preservation, or positive common lifespan | Unresolved | The class is an input proposal. A summation functional and compatible derivative/preservation theorems remain necessary. |
| Coordinate contact or same-transmitter root birth | Unresolved | Neither nonemptiness nor overlapping target envelopes proves either event. They are different obligations. |

The accepted mathematical claims have grade `derived` by the arguments below. Acceptance of these implications does not promote the proposed class to physical ontology; selection of this population model remains a proposal.

## Definitions needed for the reconstruction

Use normalized wake speed $c_f=1$. Fix $L>0$, lattice spacing $\ell=L/100$, anchors $\mathbf z_a=\ell a$ for $a\in\mathbb Z^3$, charges $q_a=q_0(-1)^{a_1+a_2+a_3}$ with $q_0>0$, and coupling $\kappa>0$. Histories $\mathbf X_a(s)$ are defined for every $s\le0$. Environment displacements from anchors are at most $b=\ell/16$; the two target labels $0,e_1$ have the larger allowance $B=4\ell$. All labels therefore satisfy the common bound $B$. The class also requires $C^3$ histories with speed, acceleration-of-input, and jerk bounds $4$, $256/\ell$, and $65536/\ell^2$, respectively, and distinct-label release separation at least $d_*=\ell/8$.

For receiver $i$ at zero and source $j$ at emission time $-\tau$, let $d_{ij}=\|\mathbf z_i-\mathbf z_j\|$, $r_{ij}(\tau)=\|\mathbf X_i(0)-\mathbf X_j(-\tau)\|$, and $f_{ij}(\tau)=\tau-r_{ij}(\tau)$. Positive zeros of $f$ are the causal roots. On positive range, its derivative is $D_t=1-\hat{\mathbf r}\cdot\mathbf V_j(-\tau)$, where $\hat{\mathbf r}$ points from emission site to receiver. The [master equation's transmitter factor](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) gives a regular per-root acceleration $\kappa q_iq_j\hat{\mathbf r}/(r^2|D_t|)$. Receiver playback $D_r/D_t$ does not multiply this acceleration.

The proposal additionally requires disjoint centered root tubes of half-width $w=\ell/256$, positive range at least $w$, and $|D_t|\ge\delta=1/4$ throughout each tube. Cross-channel complements have $|f|\ge\gamma=w/4$. Self channels instead have $|f|\ge\eta\tau$ for $0<\tau\le\tau_0=2w$, with $\eta=1/4$, no root tube meeting this interval, and the ordinary gap $\gamma$ on the remaining complement. The zero-delay diagonal is excluded and unresolved. These are admission assumptions, not effects inferred from density.

## Density reconstructed from disjoint cubes

Assign the half-open cube of side $\ell$ centered at $\mathbf z_a$ to label $a$. These cubes partition space and have volume $\ell^3$. For any point in the cube, its distance to $\mathbf X_a(s)$ is below $B+\sqrt3\ell/2<5\ell$. Write $D=5\ell$. A cube whose label occupies the shell $R\le\|\mathbf X_a(s)-\mathbf x\|<2R$ lies inside the enlarged annulus $(R-D,2R+D)$. Conversely, almost every point of the annulus $(R+D,2R-D)$ belongs to a cube whose label occupies the desired shell. Comparison of volumes yields

$$
\frac{4\pi}{3\ell^3}\big[(2R-D)^3-(R+D)^3\big]
\le N(\mathbf x,s;R)\le
\frac{4\pi}{3\ell^3}\big[(2R+D)^3-(R-D)^3\big].
$$

For $R\ge40\ell$, set $u=D/R\le1/8$. The lower polynomial $(2-u)^3-(1+u)^3$ decreases with $u$, while the upper polynomial $(2+u)^3-(1-u)^3$ increases. Their limiting values at $1/8$ are $(15^3-9^3)/512=2646/512>3$ and $(17^3-7^3)/512=4570/512<12$. Consequently $4\pi\ell^{-3}R^3\le N\le16\pi\ell^{-3}R^3$, exactly as claimed. A bounded region has only finitely many anchors within its $B$-enlargement, proving local finiteness independently of the shell lower bound.

The specified high-density convention gives $\rho_-L^3=4\pi\,10^6$ with the shell threshold $R_0=0.4L$. This is a definition-relative deterministic count, not a measured density of nature. Every finite restriction fails a positive shell lower bound at sufficiently large radius.

Claim grade: derived. Falsifier: a displacement-admissible configuration violating either cube-annulus inclusion or the two displayed polynomial inequalities would overturn this result.

## Complete-past root bounds and delayed counts

The reverse triangle inequality gives $|r_{ij}(\tau)-d_{ij}|\le2B$ at every positive delay. Thus every root lies in $[\max(0,d_{ij}-2B),d_{ij}+2B]$, and $f_{ij}(\tau)\ge\tau-d_{ij}-2B$ excludes all sufficiently early emissions. There is no common finite memory horizon over all source labels. For a cross channel, $f_{ij}(0)\le-d_*<0$ and the tail is positive, so the intermediate value theorem supplies at least one positive root even if the source reaches zero range at other delays. Differentiability at those nonroot zero-range points is unnecessary.

The root-center window has length at most $4B=16\ell$. Distinct disjoint closed tubes force center spacing strictly greater than $2w=\ell/128$. For $n$ centers, $(n-1)2w<4B$, hence $n-1<2048$ and $n\le2048$. The subject's $M=2050$ is conservative and valid; there is no need to amend it. The same packing argument excludes an infinite set of such roots. Self roots have $\tau\le2B$ and are separately subject to the normalized near-diagonal exclusion.

For delayed-root counting take $R\ge64B=256\ell$. Then $2B\le R/32$. Every source anchor with $5R/4\le d_{ij}<7R/4$ has at least one cross root, and every such root lies in $[R,2R)$. Counting anchors with their cubes loses at most $\sqrt3\ell/2\le R/32$ at either annular boundary. The resulting lower volume has dimensionless difference

$$
\left(\frac{55}{32}\right)^3-\left(\frac{41}{32}\right)^3
=\frac{97454}{32768}>\frac34.
$$

Multiplication by $4\pi R^3/(3\ell^3)$ proves the stated lower bound $\pi\ell^{-3}R^3$. Conversely, a counted root implies $d_{ij}<2R+2B<3R$. The corresponding cubes lie in the ball of radius $7R/2$, so there are fewer than $(343\pi/6)\ell^{-3}R^3<64\pi\ell^{-3}R^3$ eligible labels. Multiplying by $M$ proves the upper root bound. Self roots cannot enter these shells. Finally, $|D_t|\le1+\|\mathbf V_j\|\le5$, independently of the assumed lower floor.

Claim grade: derived. Falsifier: a cross channel without a positive root despite the endpoint signs, a root outside the distance window, or more than 2050 disjoint width-$2w$ tubes in that window would overturn the corresponding claims. The cube counts give the separate check on delayed multiplicity per shell.

## Nonemptiness using the existing controls

For the stationary control $\mathbf X_a(s)=\mathbf z_a$, every cross channel has $f_{ij}(\tau)=\tau-d_{ij}$ and its sole positive root at $d_{ij}\ge\ell$. The tube is inside positive delay, has constant range $d_{ij}$ and $D_t=1$, and its complement has residual magnitude at least $w>\gamma$. Self channels have $f_{ii}(\tau)=\tau$, no positive root, and satisfy both self complement conditions. Displacement and derivative bounds hold, while release separation is at least $\ell>d_*$. This verifies all initial conditions, including the complete earlier past.

For the existing bump control let $\phi$ be a nonconstant smooth bump supported in $(-2,-1)$, $\|\mathbf e_a\|\le1$, and $\mathbf X_a(s)=\mathbf z_a+\varepsilon\ell\mathbf e_a\phi(s/\ell)$. Choose $\varepsilon$ under the four strict inequalities in the subject. Its displacement is below $\ell/32$, speed below $1/4$, acceleration-of-input below $256/\ell$, and jerk below $65536/\ell^2$. At zero, the displacement vanishes. For $\tau_2>\tau_1$, the source Lipschitz estimate gives

$$
f_{ij}(\tau_2)-f_{ij}(\tau_1)
\ge(1-1/4)(\tau_2-\tau_1).
$$

This inequality holds without differentiability of range at zero and proves strict monotonicity. Each cross channel has exactly one root. Throughout its tube, the range is at least $\ell-\ell/32>w$, the root itself is farther than $w$ from zero, and $D_t\ge3/4$. Outside the centered tube, the residual magnitude is at least $3w/4>\gamma$. A self channel obeys $r_{ii}(\tau)\le\tau/4$ because it compares two points of one path, hence $f_{ii}(\tau)\ge3\tau/4$ and has no positive root. At $\tau_0=2w$, this lower bound is already $3w/2>\gamma$.

All label vectors may be chosen independently. To obtain a nonstationary member, choose at least one nonzero vector. The zero-vector choice merely returns the stationary member. A translated bump can test arbitrarily old emissions under the same derivative estimates; the class does not impose fading memory. No trajectory after release has been constructed here.

Claim grade: derived. Falsifier: one history satisfying these strict smallness bounds but violating the monotonicity, range, release-separation, or self-residual estimates would refute nonemptiness as established here. An EOM residual on these prescribed pasts would not refute this claim because EOM compatibility of the pasts is not an assumption.

## Why arbitrary source ordering fails

At the stationary control the complete cross-source contribution is a single vector with norm $\kappa q_0^2/d_{ij}^2$. For the anchor shell $R\le d_{ij}<2R$, the accepted stationary density bound therefore gives

$$
\sum_{R\le d_{ij}<2R}\|\mathbf F_{ij}\|
\ge \frac{\kappa q_0^2}{4R^2}\,4\pi\ell^{-3}R^3
=\pi\kappa q_0^2\ell^{-3}R.
$$

The dyadic shells are disjoint, and these positive lower bounds do not even tend to zero. The series of norms diverges. Alternating polarity does not affect this conclusion.

For completeness, in three-dimensional real vector space, if a series converged to one finite value under every permutation, each coordinate series would have that property. A real series with infinite positive or negative absolute subseries either cannot converge or admits a permutation selecting enough terms of one sign to violate the proposed common limit. Hence all three coordinate absolute series must converge. The inequality $\|\mathbf v\|\le|v_1|+|v_2|+|v_3|$ would then imply convergence of the vector norm series, contradicting the shell estimate. Thus the stationary member already rejects an arbitrary-source-order independent functional on the full proposed class. This argument does not say that every specified exhaustion diverges.

Claim grade: derived. Falsifier: a finite stationary absolute source sum compatible with the displayed shell lower bounds would refute this obstruction; a convergent specially ordered signed sum would not.

## Independent reconstruction of stationary block convergence

Retain exactly the subject's diagnostic partition, whose block $n\in\mathbb Z^3$ contains labels $2n+\epsilon$ for $\epsilon\in\{0,1\}^3$. Each block center is $\mathbf c_n=\ell(2n+(1/2,1/2,1/2))$, and each vertex is at distance $a=\sqrt3\ell/2$ from it. The signed sum of every monomial of degree at most two vanishes because at least one coordinate has exponent zero, leaving a factor $1-1$. This verifies the claimed moment cancellation without using a computed block sum.

An exact repeated finite-difference identity gives a separate route to the tail estimate. Put $\mathbf K(\mathbf y)=\mathbf y/\|\mathbf y\|^3$ and let $\mathbf E_k$ be the coordinate unit vectors. The alternating sum over the eight corners equals, up to an overall sign, the integral of $D^3\mathbf K[\mathbf E_1,\mathbf E_2,\mathbf E_3]$ over the cube parameterized by three intervals of length $\ell$. This follows by applying the fundamental theorem of calculus once in each coordinate. With $R_n=\|\mathbf z_i-\mathbf c_n\|>a$ and $C_3=\sup_{\|\mathbf y\|=1}\|D^3\mathbf K(\mathbf y)\|_{\rm op}$, it yields

$$
\|\mathbf B_{in}\|\le
\frac{\kappa q_0^2 C_3\ell^3}{(R_n-a)^5}
\le32\kappa q_0^2 C_3\ell^3 R_n^{-5}
\quad(R_n\ge2a).
$$

The power five follows directly by differentiating the homogeneous degree-minus-two kernel three times. A finite bound on $C_3$ can also be established explicitly: write $g=\|\mathbf y\|^{-3}$. For unit arguments, $\|D^2g\|\le18\|\mathbf y\|^{-5}$ and $\|D^3g\|\le150\|\mathbf y\|^{-6}$, from differentiating $g$. The product rule for $\mathbf K=\mathbf y g$ gives $C_3\le150+3(18)=204$. No numerical differentiation is needed. The subject's separate Taylor bound has coefficient $(8/6)32=128/3$ multiplying $C_3a^3$; that arithmetic and its remainder order are also valid.

Block centers have disjoint cubes of side $2\ell$. For $S\ge2\sqrt3\ell$, all cubes with centers in the shell $[S,2S)$ fit in a ball of radius $5S/2$. Their count is at most $(125\pi/48)S^3\ell^{-3}<3\pi S^3\ell^{-3}$. Multiplying this by the preceding bound at $S$ and summing over $S=2^kR$ proves the explicit tail estimate

$$
\sum_{R_n\ge R}\|\mathbf B_{in}\|
\le128\pi\kappa q_0^2 C_3 R^{-2},
\qquad R\ge2\sqrt3\ell.
$$

The finitely many nearer blocks are finite after the exact receiver diagonal is omitted, since every remaining stationary cross range is at least $\ell$. This proves absolute convergence of the complete-block series and its invariance under every permutation of those complete blocks.

This conclusion permits neither arbitrary splitting of blocks nor unrestricted repartitioning. A boundary fragment estimate of order $R^2$ sources times $R^{-2}$ per source is only an order-one upper bound. It proves neither disappearance nor a nonzero discrepancy. Equality for a particular alternative partition would need its own actual boundary estimate. Independent history perturbations also need not preserve the stationary moments, and causal emissions are generally sampled at different times. No nonstationary block theorem is established by this calculation.

Claim grade: derived for this stationary partition. Falsifier: failure of the exact threefold finite-difference identity, a nonzero signed moment of degree at most two, or violation of the displayed complete-block tail would refute the claim. A different partition or nonstationary history does not test this scoped theorem.

## The perturbation topology and its precise local consequences

Let $p=\sup_{a,s}\|\mathbf h_a(s)\|/\ell$ and $v=\sup_{a,s}\|\dot{\mathbf h}_a(s)\|$, where $\mathbf h=\widetilde{\mathbf X}-\mathbf X$ compares histories with the same labels and charges. The norm is $p+v$. Its ambient space consists of families with bounded positions and bounded continuous first derivatives, interpreted as displacement differences; unbounded anchor positions are not elements of that linear space. Uniform limits in both quantities preserve the derivative relation by integration on each compact time interval, so this is the usual complete uniform $C^1$ space. The proposed histories form a constrained relative subset, not an asserted open Banach-space domain. The norm controls all old emissions without decay and imposes no relation among label perturbations.

At a simple root with emission time $s$, differentiation of $\|\mathbf X_i(0)-\mathbf X_j(s)\|-(-s)=0$ gives

$$
\delta s=-\frac{\hat{\mathbf r}\cdot(\mathbf h_i(0)-\mathbf h_j(s))}{D_t},
\qquad
\delta\mathbf V_j^{\rm effective}
=\dot{\mathbf h}_j(s)+\mathbf A_j^{\rm hist}(s)\delta s.
$$

Both signs agree with the subject. The second term accounts for sampling the original source velocity at a moving emission time. Prescribed acceleration therefore enters this derivative even though the acceleration kernel originally samples only source velocity.

For differences of admissible histories, the jerk bound is $2J_*$. Comparing $\dot{\mathbf h}$ with its backward difference quotient over a past interval of length $t$ gives

$$
\|\ddot{\mathbf h}\|_\infty\le\frac{2v}{t}+J_*t
\quad\Longrightarrow\quad
\|\ddot{\mathbf h}\|_\infty\le2\sqrt{2J_*v}.
$$

The full past allows this backward interval even at release. This proves the claimed square-root control. In a single-root expansion, the extra evaluation error from the perturbed velocity is bounded by $\|\ddot{\mathbf h}\|_\infty|\delta s|$, of order $(p+v)^{3/2}$ for fixed class constants; the unperturbed velocity Taylor remainder is bounded by $J_*|\delta s|^2/2$. Both are smaller than first order. This establishes the stated local regularity mechanism, not differentiation of an infinite sum.

Uniform persistence can be made quantitative. At the same delay, $|\widetilde f-f|\le2\ell p$. On an old tube where $r\ge w$, requiring $2\ell p<w/2$ preserves positive range. Unit-direction comparison gives $\|\widetilde{\hat{\mathbf r}}-\hat{\mathbf r}\|\le4\ell p/w$, hence

$$
|\widetilde D_t-D_t|\le16\ell p/w+v.
$$

Choose the norm small enough that this last quantity is below $\delta/2$ and $2\ell p<\gamma/2$. The transmitter factor keeps its sign on each old tube; the opposite endpoint residual signs persist; and exactly one root remains inside each tube. The old ordinary complements have residual magnitude at least $\gamma/2$, excluding new roots there. On the self near-diagonal sector, $|\widetilde f_{ii}-f_{ii}|\le\tau v$, so the normalized margin remains at least $\eta/2$ when $v<\eta/2$. The exact diagonal has not acquired an assigned row.

For centered tubes after the shift, take smaller half-width $w/2$. The new center moves by at most $2\ell p/\delta$ as estimated using the old residual slope; require this below $w/4$. The new tubes then lie in the old tubes, and their intervening parts have residual at least $\delta w/4$ using the perturbed slope. Thus a common relaxed complement gap is $\min(\gamma/2,\delta w/4)$. Tube disjointness persists. This supplies the uniform relaxed-chart statement rather than presuming that the original fixed tube endpoints remain centered on the new roots.

Keeping the original constants requires uniform slack in the relevant infima and suprema, including the width-$w$ tube conditions and separation between tubes. Pointwise strict inequalities over infinitely many labels do not imply such uniform slack. Moreover the $C^3$ and derivative bounds are not open conditions in the ambient $C^1$ norm: arbitrary ambient perturbations need not stay in the class. The subject already directs derivatives to the relative domain or to a declared extension. These are scope clarifications, not additional moment restrictions or amendments to the class.

Claim grade: derived for the relative norm, local root variations, and relaxed persistence estimates. Falsifier: admissible perturbations tending to zero in $p+v$ that violate one of the explicit uniform estimates would overturn the corresponding local claim. Loss of an exact saturated class constant is not a counterexample to relaxed persistence. Infinite operator-norm summability remains unresolved.

## Coordinator integration and remaining dependency

Proposed integration text: “Revised effort 1 independently accepts the proposed population class as a nonempty prescribed complete-past input class, with the stated spatial density and delayed-root bounds. The stationary and independent bump controls satisfy all initial constraints. The stationary absolute-shell lower bound rejects arbitrary individual-source-order independence; the eight-source stationary partition has absolute complete-block convergence with an inverse-square tail in cutoff radius. This does not select a physical grouping or establish general repartitioning equality. The uniform complete-past position/velocity topology and relative local root calculus are accepted with relaxed common margins; exact constants require uniform slack. No infinite EOM future, infinite history derivative, density-preserving evolution, coordinate contact, or same-transmitter birth is established.”

The precise next mathematical dependency is a restricted nonstationary summation theorem or an admissible counterexample on this same reviewed domain, paired with a derivative-tail result in this same independent-source norm. Any proposed moment-constrained subclass changes the input and needs coordinator adjudication. A physical ordering rule cannot be replaced by an arbitrary enumeration. Coupled evolution then still owes preservation for all environmental and target labels over one common interval. The review leaves no mathematical correction required for the subject's scoped central estimates; the old effort numbers in its consumer table must be mapped to the revised queue by the coordinator, not treated as fresh dispatch authority.

## Evidence and validation record

The subject and its frozen scratch copy had identical SHA-256 `dbe3b4f14a7253747863a4d3979aaf3b43d24b6eb1843b3264d11e2640184c2e` by `shasum -a 256` before mathematical reconstruction. The scratch copy is `.tmp/population-independent-adjudication/population-history-class.frozen.md`. The subject was not edited. Analytical evidence here is independently reconstructed from the class definitions and the canonical acceleration row: cube inclusions, intermediate-value and packing bounds, exact control residuals, an absolute-shell lower bound, the threefold finite-difference identity, and quantitative relative perturbation estimates. No subject checker or prior simulation is treated as independent mathematical acceptance.

Validation is scoped to this authored adjudication and frozen subject identity. No Python, EOM run, generator write, publication, index write, or downstream dispatch is part of this review. The derivations above carry the mathematical verdict; syntax checks cannot establish an infinite-population theorem.

The task-scoped syntax instrument first failed to load KaTeX because its import traversed one directory too far; correcting that scratch-only path allowed the known case to run. Before any target run, `node .tmp/population-independent-adjudication/check.mjs known` passed a known two-formula, one-file-link case with fenced-dollar exclusion and rejected both an invalid macro and trailing whitespace. This records the required known-case validation before applying the instrument to this document.

Final measured validation: `node .tmp/population-independent-adjudication/check.mjs target` passed 186 KaTeX expressions, three relative file targets, balanced dollar delimiters, and absence of trailing whitespace in this adjudication. It checks file targets, not anchor resolution or browser layout. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/population-independent-adjudication.md` emitted no whitespace diagnostic (exit 1 for the new-file difference). Final `shasum -a 256` on the subject and frozen copy returned the dispatch digest for both. These checks establish syntax and frozen-input byte identity, not EOM acceptance.
