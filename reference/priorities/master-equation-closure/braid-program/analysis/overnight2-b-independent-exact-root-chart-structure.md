# Independent review of exact-history root-chart structure

## Verdict and required distinction

**Derived and accepted with an explicit remote-sign qualification.** The [frozen subject](overnight2-b-exact-root-chart-structure.md) correctly obtains finite complete ordered root charts from the independently accepted recent-self gap, a locally uniform finite upper bound on causal delays, exact finite canonical acceleration, collision freedom and everywhere-ordinary roots. Its compact-interval floors and conditional periodicity follow. The parity and signed-divisor formulas additionally require a negative sufficiently remote causal gap. Bounded complete past positions guarantee this sign; boundedness merely on a compact lookback, or a root cutoff by itself, does not.

Thus the full result is accepted for the intended bounded complete histories. Under the weaker reading of the subject's phrase “bounded over a locally uniform compact causal lookback,” the finite-chart result survives when that lookback is proved exhaustive, but the claimed parity result requires an added hypothesis. The subject remains frozen. The parent has acknowledged this distinction for integration; the bounded periodic six-member applications satisfy the stronger hypothesis.

This is a pure analytical review under the Ramon E. Moore lens and Specialist charter. Neither a role name nor agreement with the subject supplies proof authority. The derivation below uses the canonical acceleration law and the [accepted independent recent-self proof](overnight2-b-independent-wake-speed-crossing.md); no numerical evidence, orbit proposal, imported physical principle or root-selection modification is used.

## Hypotheses stated without circularity

Let $I$ be a connected reception-time interval and let finitely many complete paths $X_j$ be $C^2$ on the required histories. Fix $K=c_f=1$. Simultaneous positions of distinct members are distinct throughout $I$. Every positive-delay root at every reception in $I$ is ordinary. The canonical sum includes every such self and partner root, uses positive self polarity and the absolute source divisor, exists as an ordinary finite-valued sum, and equals $\ddot X_i(t)$. Finiteness here means a well-defined finite acceleration before the number of roots has been proved finite; no renormalization or subtraction of divergent self contributions is allowed.

For finite-chart continuation require the following actual complete-past exclusion: each $t_0\in I$ has a reception neighborhood $U$ and a finite $B$ such that no root for any receiver/source pair at $t\in U\cap I$ has delay $d\ge B$. Choosing a larger $B$ makes the endpoint strictly exterior. The paths are $C^2$ on the associated compact lookback windows. A finite inspected history window is not evidence that this hypothesis holds.

For parity additionally require $G_{ij}(t,d)<0$ for all sufficiently large $d$, where

$$
G_{ij}(t,d)=|X_i(t)-X_j(t-d)|^2-d^2.
$$

For example, bounded complete past positions, uniformly across the finite set of members, imply a bounded separation at fixed reception and hence this negative remote sign. They also imply a locally uniform root cutoff: take the past position bound together with continuity on a short future extension of the reception neighborhood. Global boundedness over all time is sufficient but stronger than necessary. Neither a positive global collision floor nor a bound on all past velocities is required; velocities on the finite windows used in the proof suffice.

## Recent exclusions and finite root sets

At a fixed reception $t_0$, local collision freedom gives a positive simultaneous partner separation. Continuity preserves a smaller positive separation in a reception neighborhood. Bounded source velocities on a compact recent window then give, for a common sufficiently small $\delta>0$,

$$
|X_i(t)-X_j(t-d)|-d
\ge |X_i(t)-X_j(t)|-(1+V)d>0
\quad (i\ne j,\ 0<d\le\delta).
$$

The finite member set allows one neighborhood and recent cutoff for all partners.

For self roots, the continuous extension

$$
F_i(t,d)=\left|\int_0^1\dot X_i(t-sd)\,ds\right|^2-1,
\qquad F_i(t,0)=|\dot X_i(t)|^2-1
$$

equals $G_{ii}(t,d)/d^2$ for $d>0$. If reception speed differs from one, joint continuity immediately gives a locally uniform positive recent-root gap. At unit speed the accepted proof uses a fixed unit vector $e=\dot X_i(t_0)$ and a sufficiently small common window on which $e\cdot\dot X_i\ge1/2$. Each recent self root has

$$
e\cdot Q\ge d/2,\qquad
0<|D|\le1+V,\qquad
e\cdot\frac{Q}{d^3|D|}\ge\frac1{2(1+V)d^2}>0.
$$

This is a positive projection of the canonical acceleration contribution, even for negative signed $D$. A sequence of self roots approaching zero cannot give a finite projected sum; the terms do not tend to zero and have the same sign. Away from zero, the remote cutoff and ordinariness already make the fixed-reception root set finite by compactness. Thus finite canonical acceleration first gives a pointwise recent-self gap without presupposing finite self count.

The accepted proof then places a boundary inside that gap and continues the finite nonrecent ordinary roots, excluding the compact complement. Their complete acceleration sum is locally bounded. The prescribed $C^2$ acceleration is also locally bounded. Exact equality therefore bounds the sum of the positive recent projections and gives a common lower delay bound for every possible recent self root. Choosing a strict smaller cutoff excludes them uniformly. This step is what upgrades pointwise finiteness to a locally uniform recent gap at unit speed; pointwise finite sums alone would not suffice.

Combining these recent guards with the remote cutoff confines every root to a compact delay interval $[a,B]$, with $a>0$. The root set there is closed. At a positive root,

$$
\partial_dG_{ij}=2Q\cdot\dot X_j(t-d)-2d=-2dD_{ij},
\qquad D_{ij}=1-\frac{Q}{d}\cdot\dot X_j(t-d).
$$

The delayed source velocity appears in this divisor. Ordinariness makes the derivative nonzero, so each root is isolated. An infinite closed subset of a compact interval has an accumulation point; continuity would make that point a root, contradicting its isolation. The complete fixed-reception root set is therefore finite.

## Local completeness, global ordering and uniform floors

At $t_0$, choose disjoint small delay neighborhoods around its finitely many roots and keep both exterior boundaries strictly root-free. Continuity preserves a strict derivative sign in each neighborhood after shrinking the reception neighborhood; the implicit function theorem supplies its unique $C^1$ root branch. One may also retain opposite endpoint signs to see directly that each branch remains inside its chosen neighborhood.

The remaining closed delay complement is compact and root-free at $t_0$. The absolute gap has a positive minimum there. Uniform continuity preserves nonvanishing on that complement at nearby receptions. Combined with the already uniform recent and remote guards, this excludes additional roots everywhere in the complete past. Continuing the known roots alone would not have proved this completeness step.

The complete number $N_{ij}(t)$ is locally constant, hence constant on the connected interval $I$. For each source channel, label the roots by increasing delay. Each local branch agrees with its order label; distinct simple roots cannot exchange order without meeting, and a meeting would violate simplicity. The local branches therefore glue to global ordered $C^1$ functions $d_{ij,1}(t)<\cdots<d_{ij,N_{ij}}(t)$. Empty channels are permitted. No compactness of the whole reception interval is needed for constant counts or these labels.

On any compact reception subinterval $J\subset I$, the finitely many continuous positive delay functions attain a positive lower bound and a finite upper bound. The continuous nonzero divisors along them attain a positive minimum absolute value. Taking extrema over finitely many receiver/source/root labels yields common floors for the complete chart on $J$. If the entire chart is empty, these floor statements are vacuous and arbitrary positive constants may be chosen. A finite cover by local chart neighborhoods gives the same conclusion. There is no assertion of common constants over all histories, all spatial scales or an unbounded reception interval.

At interval endpoints, these statements use relative one-sided neighborhoods and restrictions of local branches. A hypothesis that exactness holds only at an isolated reception would not supply the neighborhood conclusion beyond that reception. Signed divisors are continuous and nonzero along every branch; their signs are constant on $I$.

## Conditional periodicity

The sufficient periodicity hypothesis is that the full delayed scalar geometry repeats: $G_{ij}(t+P,d)=G_{ij}(t,d)$ for all relevant receptions and all positive delays. This follows, for example, if every complete path satisfies

$$
X_j(s+P)=O X_j(s)+a
$$

with the same fixed orthogonal map $O$ and fixed translation $a$ for all members and all source/reception times involved. Then delayed differences transform by $O$, delayed velocities do likewise, and both gaps and divisors repeat. The bounded-history hypotheses still have to hold separately for the particular motion.

The ordered root sets at $t$ and $t+P$ are identical, so $d_{ij,k}(t+P)=d_{ij,k}(t)$ whenever both receptions and their required histories are in the theorem's domain. A full-period conclusion requires a domain on which that comparison is available; an arbitrarily short exact interval alone does not assert a periodic extension. Periodicity of simultaneous shape alone, especially under a time-dependent frame change, does not automatically give periodicity of delayed geometry. Under the stated relative-geometry hypothesis there is no unproved label-return assumption: ordering removes possible permutations.

## Signed crossing count and parity

Now impose the negative remote-gap hypothesis. A partner starts with $G_{ij}(t,0)>0$ by collision freedom and ends negative. Each ordinary root is a simple crossing. At a positive-to-negative crossing $G_d<0$ and $D>0$; at a negative-to-positive crossing $G_d>0$ and $D<0$. Hence the ordered signs alternate $+,-,+,\ldots,+$, the partner count is odd, and

$$
N_{ij}^+-N_{ij}^-=\sum_b\operatorname{sgn}D_{ij,b}=1\qquad(i\ne j).
$$

This is a count of signed divisors, not a statement about polarity signs or acceleration weights.

The recent self gap has a definite sign $\sigma_i\in\{-1,+1\}$. The common local root-free interval makes this sign locally constant in reception; overlaps near zero make it independent of the chosen cutoff. Connectedness makes it constant on $I$, including unit-speed plateaus. At a strict-speed reception it equals $\operatorname{sgn}(|\dot X_i|^2-1)$, but at unit speed the zero-delay limit does not determine the positive-delay sign.

If $\sigma_i=+1$, the self gap starts positive and ends negative, so its root count is odd and its divisor signs start and end positive. If $\sigma_i=-1$, it starts and ends negative, so its root count is even, possibly zero; when nonempty its signs start negative and end positive. Thus

$$
\sum_b\operatorname{sgn}D_{ii,b}=\frac{1+\sigma_i}{2},
\qquad
\sum_{j,b}\operatorname{sgn}D_{ij,b}
=n-1+\frac{1+\sigma_i}{2}.
$$

For six members and $\sigma_i=+1$, the sum is six. The admitted chart $(1,3,1,1,1,1)$ has seven positive and one negative divisor, consistent with that result. Neither this signed sum nor parity proves a numerical list complete: deleting two roots with opposite signs leaves both unchanged.

The general telescoping formula makes the remote assumption visible. If a channel has recent sign $s_-$ and remote sign $s_+$, both nonzero, its signed-divisor sum is $(s_--s_+)/2$. The displayed subject formulas substitute $s_+=-1$. A root cutoff alone fixes neither $s_+$ nor its value.

## Why the remote-sign qualification is necessary

A complete straight path $X(t)=vt$ with constant $|v|>1$ has $G(t,d)=(|v|^2-1)d^2>0$ for every positive delay. It is $C^2$, bounded on every compact lookback, and has no positive roots, so any finite root cutoff is valid. In the single-member canonical problem its complete root sum is empty and equals its zero acceleration; collision freedom and ordinariness are vacuous. Its recent sign is positive but its self count is zero, contradicting the odd-count formula if boundedness is weakened to compact-window boundedness plus a root cutoff. This example is not bounded over its complete past and therefore does not contradict the accepted bounded-history theorem. It demonstrates the exact missing inference in the weaker reading, without importing any physical law.

## Entire-past speed at most one

Fix a reception and suppose $|\dot X_i(s)|\le1$ on its entire relevant past. For a self causal root of delay $d$, let $n=(X_i(t)-X_i(t-d))/d$, so $|n|=1$. Equality of chord length and delay gives

$$
d=n\cdot\int_{t-d}^t\dot X_i(s)\,ds
\le\int_{t-d}^t|\dot X_i(s)|\,ds\le d.
$$

All inequalities are equalities. More explicitly the continuous nonnegative function $1-n\cdot\dot X_i(s)$ has zero integral, so $n\cdot\dot X_i(s)=1$ everywhere on the segment. The speed bound forces $\dot X_i(s)=n$ throughout, including the emission endpoint. Therefore $D=1-n\cdot\dot X_i(t-d)=0$. Such a root is nonordinary. In an everywhere-ordinary history no positive self root can exist under the entire-past speed bound. In fact the same contradiction uses only the speed bound on a putative root's entire emission-to-reception segment. A current or recent below-speed interval cannot rule out older roots whose segments traverse an earlier above-speed episode.

## Falsifiers, validation and preservation

This derivation would be overturned by a history satisfying the explicit hypotheses whose complete root count changes within $I$, whose positive roots accumulate in a compact ordinary delay region, or whose compact reception chart loses a positive delay/divisor floor. Check the locally uniform complete-past cutoff and the uniform recent-self proof before treating a root disappearing through a boundary as a counterexample. A nonordinary root or collision leaves the theorem's domain. An ordered branch that fails to repeat despite truly periodic complete delayed gaps would refute the ordering-periodicity step. A wrong parity count under the negative remote-gap hypothesis would refute the crossing-sign derivation. Under a merely root-free remote tail, the straight-path example above already shows why the subject's stronger parity conclusion is unavailable.

Scoped validation consists of the independent analytical reconstruction, the full reads of the frozen subject and accepted recent-self report, and the live canonical source-divisor/ordinary-root discussion. Native `shasum -a 256` confirms subject identity `a72013b25008af0cbe514a3b410586e76956b893e10e718fa78d57da6ed2199a`; final hashing rechecks that identity and records this new report. Native `git diff --no-index --check /dev/null` supplies the new report's whitespace check; exit one with no diagnostics denotes its new-file difference. No in-session numerical instrument or target is necessary for this proof, and the parent's numerical slot was not used.

Only this new report was authored. The subject, earlier independent proofs, all instruments and receipts, parent report, shared owners and corpus remain unmodified by this review. No Git mutation, generator, delegation or sidebar action was performed. No additional runtime evidence was created or old evidence deleted, moved or replaced. The accepted structural theorem with its explicit remote-sign and periodicity qualifications is ready for parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md); no claim of numerical completeness or exact-solution existence follows. This bounded analytical review is complete.
