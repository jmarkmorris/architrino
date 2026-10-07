# Independent review of the unit-planar-speed obstruction

## Verdict and scope

**Derived and accepted without repair.** Under the exact-domain hypotheses in the [frozen subject](overnight2-b-unit-planar-speed.md), a member with physical planar speed identically one has axial coordinate either constant or strictly monotone on the connected exact reception interval. More generally, planar speed at most one together with any strict above-wake reception on that interval forces strictly monotone height. The periodic-height and fixed-projection consequences follow with the stated whole-history assumptions.

In particular, the selected six-member constant-radius family with $\rho=1$, $p=0$ and $\beta=1$ cannot have any nonconstant periodic $C^2$ height in an everywhere-ordinary exact history, at any positive scale, amplitude or frequency. This is stronger in that class than the earlier turning-curvature test. It requires no third derivative, curvature threshold or nondegenerate turning point.

The dependency is the unchanged [independent wake-speed sign theorem](overnight2-b-independent-wake-speed-crossing.md): complete $C^2$ paths, finitely many members, collision-free simultaneous positions, a locally uniform finite complete-past causal-delay bound, all positive-delay roots ordinary and included, positive self polarity, absolute source divisors, and a well-defined finite canonical sum equal to prescribed acceleration on the connected interval $I$. The scenario is $K=c_f=1$. Bounded complete past positions suffice for the remote cutoff; a finite inspected history window alone does not. The recent-gap theorem, not a speed ceiling or an imported law, is the dynamical premise. The Ramon E. Moore role is an analytical lens rather than proof authority.

## The required uniform recent-gap statement

For one physical path write $X(t)=(Y(t),z(t))$ relative to a fixed orthogonal planar/axial decomposition. The accepted exact-history theorem supplies a locally constant sign of

$$
F(t,d)=\frac{|X(t)-X(t-d)|^2}{d^2}-1
$$

for sufficiently small positive delays. If there is a strict above-wake reception in $I$, this sign is positive throughout the connected interval. Its locally uniform form says that near every $t_0\in I$ there are a reception neighborhood $U$ and $d_*>0$ such that

$$
|X(t)-X(t-d)|>d\qquad(t\in U\cap I,\ 0<d\le d_*).
$$

The common positive cutoff, not just the sign at $t_0$ itself, is essential. At a unit-speed reception it is obtained from exact finite canonical acceleration and the positive projection of recent self rows, as established in the accepted dependency. This review does not replace that argument with continuity of speed alone.

If $|\dot Y|=1$ on $I$ and $z$ is nonconstant there, choose two times in $I$ at which its values differ. The mean-value theorem on the compact interval between them gives an interior reception with $\dot z\ne0$. Orthogonality then gives

$$
|\dot X|^2=|\dot Y|^2+\dot z^2=1+\dot z^2>1.
$$

Thus the positive uniform recent-gap statement applies. When only $|\dot Y|\le1$ is known, nonconstant height does not imply a strict above-wake reception; that reception must remain an explicit additional premise. The subject keeps this distinction correctly.

## Equal-height pairs and local injectivity

Fix an interior point of a nondegenerate $I$. Choose a smaller open time interval $V$ whose closure is contained in $U\cap I$ and whose length is less than $d_*$. If $u<v$ lie in $V$ and $z(u)=z(v)$, then

$$
|X(v)-X(u)|=|Y(v)-Y(u)|
\le\int_u^v|\dot Y(s)|\,ds\le v-u.
$$

The planar speed bound is needed only on the intervening segment, which lies in $I$. But reception $v$ is in $U\cap I$ and $0<v-u<d_*$, so the uniform recent-gap statement gives the opposite strict inequality. This contradiction proves that $z$ is injective on $V$.

The two equal-height times need not include $t_0$. The later reception can vary with the chosen pair. A proof using only the gap at the fixed reception $t_0$ would therefore be insufficient; the accepted uniform statement supplies exactly the missing quantifier. The argument includes flat extrema, stationary points of arbitrary degeneracy, oscillations accumulating near a reception and plateaus: any loss of local injectivity produces the prohibited pair, regardless of derivatives at the central point.

## From local injectivity to global strict monotonicity

A continuous injective real function on an interval is strictly monotone. One direct proof is that for any $a<b<c$ in that interval, injectivity and the intermediate-value theorem force the middle value to lie strictly between the endpoint values. Otherwise a value strictly between the middle value and the nearer endpoint value is attained once on each adjacent subinterval. That would violate injectivity. The resulting between-values property propagates the direction determined by any two distinct arguments to every pair.

Apply this to each local interval $V$. Each point of the interior of $I$ has either increasing or decreasing local orientation. The two orientation sets are open. They are disjoint: two such neighborhoods of the same point overlap in an open interval containing two distinct ordered times, on which a function cannot be both strictly increasing and strictly decreasing. They cover the interior of $I$, which is connected. Therefore only one orientation occurs.

To turn the common local orientation into a global order, take any compact subinterval $[s,t]$ inside the interior. A finite cover by the local monotonicity neighborhoods has a positive Lebesgue number. Partition $[s,t]$ into sufficiently short consecutive segments, each lying within one covering interval. The common strict order on each segment chains to $z(s)<z(t)$ in the increasing case, or the reverse in the decreasing case. This works even if the original exact interval is unbounded.

Continuity preserves the strict order at included endpoints. For example, in the increasing case continuity gives $z(a)\le z(s)$ for interior $s>a$, and for any interior $t>s$ strict interior monotonicity gives $z(s)<z(t)$, hence $z(a)<z(t)$. The analogous argument treats a right endpoint and pairs of included endpoints. No assumption of a two-sided exact neighborhood outside $I$ is needed. A singleton interval has a constant restriction and is trivial. Thus the conclusion applies to open, closed and half-open connected reception intervals.

This proves the stronger implication

$$
|\dot Y|\le1\text{ on }I
\quad\text{and some }|\dot X|>1\text{ on }I
\quad\Longrightarrow\quad z\text{ strictly monotone on }I.
$$

For unit planar speed, nonconstant height supplies the second premise, giving the constant-or-strictly-monotone alternative. Strict monotonicity does not assert a uniform nonzero derivative or unbounded height. A bounded strictly monotone function on an unbounded interval is not excluded by this argument.

## Periodicity and fixed projections

For a complete ordinary exact history with periodic axial coordinate and $|\dot Y|\le1$ throughout the same connected whole-history reception domain, a strict above-wake reception would force strict monotonicity on that domain. Periodicity gives distinct times separated by its period with equal height, contradicting strict monotonicity. Hence full speed must be at most one everywhere. Constant periodic height is included: its full speed already equals its planar speed. These conclusions require exactness on a connected interval containing the comparisons; periodic data outside a shorter exact interval cannot be silently used to extend exactness.

If a complete physical path is itself periodic and is everywhere ordinary and exact, every scalar projection is periodic. Suppose it has some strict above-wake reception and one fixed orthogonal planar projection had speed at most one at every reception. Its orthogonal scalar complement would then be both periodic and strictly monotone, a contradiction. Therefore every fixed orthogonal planar projection must exceed unit speed at some reception. The exceeding reception may depend on the plane; the result does not assert simultaneous excess in all projections. The projection must be orthogonal in the fixed Euclidean geometry, not an arbitrarily rescaled linear map.

Full spatial periodicity is sufficient for that every-plane corollary. Relative periodicity under a rotation does not by itself make every fixed scalar projection periodic. The weaker hypothesis of periodicity of the particular complementary coordinate suffices for the corresponding one-plane argument. The subject's selected planar-rotation application uses precisely that weaker hypothesis and does not require absolute periodicity of the whole spatial path.

## Selected six-member class and scale independence

For normalized time $\tau=t/R$ and physical positions $R x_\ell(\tau)$ in the selected common-radius/common-phase/alternating-height class, physical velocity is the first normalized derivative. With dots now denoting normalized-time derivatives, the planar speed is

$$
|\dot Y_\ell|^2=\dot\rho^2+\rho^2(\beta+\dot p)^2.
$$

If this equals one throughout the exact reception domain, any nonconstant periodic height supplies a strict above-wake reception and violates the constant-or-monotone conclusion over its whole exact history. If it is only at most one, periodic height instead implies that the full speed is at most one. These statements are independent of $R>0$ because physical speed has no remaining scale factor.

For $\rho=1$, $p=0$, $\beta=1$, the planar speed is identically one. Every nonconstant periodic $C^2$ height is therefore excluded from bounded complete everywhere-ordinary exact histories, including all $H\cos(\kappa\tau)$ with $H,\kappa>0$. Positive planar radius makes the simultaneous six positions distinct; bounded periodic height and fixed radius bound all complete positions, supplying the remote condition. No small-amplitude, frequency or curvature restriction remains in this class. Constant height is not excluded by this specific inference, and no exactness claim for it is made.

For coupled profiles, positive radius and bounded complete positions must still be verified separately when invoking the theorem. The formula for planar speed does not establish those properties on its own. A general planar path of unit speed is allowed in the abstract argument, but still must satisfy the stated complete-history exact-domain hypotheses.

## Independent check of the cosine illustration

For $z(\tau)=H\cos(\kappa\tau)$, compare normalized times $-\varepsilon$ and $+\varepsilon$ near a maximum. Their heights agree exactly. In the unit circular plane their chord has length $2|\sin\varepsilon|<2\varepsilon$ for small positive $\varepsilon$, while their normalized delay is $2\varepsilon$. The normalized gap at reception $+\varepsilon$ and delay $2\varepsilon$ is therefore negative.

At that same later reception the zero-delay limit is

$$
|V(+\varepsilon)|^2-1
=H^2\kappa^2\sin^2(\kappa\varepsilon)>0
$$

for sufficiently small $0<\varepsilon<\pi/\kappa$. Joint kinematic continuity in positive delay then gives at least one self root $d_\varepsilon\in(0,2\varepsilon)$ by the intermediate-value theorem. These delays approach zero while their receptions approach the maximum. For fixed $R$, the physical reception shifts and delays are scaled by $R$ and have the same limiting property.

This argument is purely kinematic. It does not assert root simplicity, exact acceleration balance or an admissible evolution. If the prescribed histories were everywhere ordinary and exact near the maximum and strict above-wake receptions, the accepted locally uniform root gap would forbid these roots. A fixed-reception expansion at the maximum can have a positive leading coefficient for large turning curvature without preventing this varying-reception construction. Thus the new proof strengthens, rather than contradicts, the earlier [turning-curvature review](overnight2-b-independent-wake-speed-tangency.md).

## Falsifiers, validation and preservation

An everywhere-ordinary finite exact history satisfying all declared hypotheses and unit planar speed on a connected interval but with nonconstant nonmonotone height would refute the theorem. An at-most-unit planar projection plus a strict above-wake reception and nonmonotone height would refute the stronger conditional implication. Earlier failure points would be an invalid locally uniform recent gap, an equal-height chord longer than the planar arclength bound, or a continuous locally injective scalar function whose monotonic direction changes on an interval. The proof exposes where each uniformity, connectedness and periodicity assumption is used.

Profiles with planar speed exceeding one somewhere, constant height without a strict above-wake reception, bounded monotone height, nonordinary roots, omitted self roots, divergent canonical sums or absent complete-past exclusion are not ruled out by this argument. They are not asserted to exist as exact solutions either. The theorem introduces no general speed ceiling and gives no stability or fate result.

Scoped validation was purely analytical after a full read of the frozen subject: the uniform-gap quantifiers, local injectivity, local-to-global orientation, included endpoints, time scaling, periodic comparisons and reception-dependent cosine roots were independently reconstructed above. Native `shasum -a 256` identifies the frozen subject as `9c5c3b7884ade33806a5bd918ff2bd3f478541c041551869eba62cbd4cb468b3`; final hashing verifies that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped new-file whitespace check; exit one without diagnostics denotes its new-file difference. No numerical target, companion or runtime evidence was required, and the parent's numerical slot was untouched.

Only this new independent report was authored. Frozen subjects, accepted dependencies, prior reports and instruments, receipts, the parent account and shared owners remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Retained evidence remains local without a backup or archive-recovery claim. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining receiving action. This bounded review is complete.
