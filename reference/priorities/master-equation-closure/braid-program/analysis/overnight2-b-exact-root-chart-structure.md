# Finite root charts follow from bounded ordinary exact histories

## Scope and statement

The [independently accepted recent-self argument](overnight2-b-independent-wake-speed-crossing.md) shows that finite exact acceleration supplies a locally uniform gap between zero delay and every positive self root. This has a useful consequence for the ordinary exact-reference question: under the stated regularity and boundedness hypotheses, a finite complete root chart need not be an additional assumption about a proposed exact history.

Select the canonical equation with $K=c_f=1$, all positive-delay self and partner roots, positive self polarity, and the absolute source divisor. Let finitely many complete $C^2$ paths be collision-free and bounded over a locally uniform compact causal lookback, with every positive root ordinary and the complete canonical sum finite and equal to prescribed acceleration on a connected reception-time interval. **Derived proposal, pending independent review:** each receiver/source pair has finitely many positive roots, their number is constant on that interval, and their delays have ordered $C^1$ branches. On every compact reception subinterval, the complete chart has a positive delay floor, a finite delay ceiling and an absolute source-divisor floor. If the relative geometry is periodic, these ordered branches are periodic, so a complete ordinary full-period chart follows automatically.

This result does not make a numerical root sample complete. It is a necessary structural theorem about histories already assumed exact, finite and everywhere ordinary. To admit a prescribed nonexact history, its root coverage must still be established independently.

## Local finite charts

Fix a receiver and a reception. For partners, local collision freedom and a velocity bound exclude sufficiently short positive delays. For self, if reception speed differs from one, continuity of

$$
\frac{|X(t)-X(t-d)|^2}{d^2}-1
\longrightarrow |\dot X(t)|^2-1
$$

gives a recent-root gap. If speed equals one, the accepted recent-self proof supplies a uniform gap from positivity of the projected self acceleration and boundedness of the complete ordinary nonrecent sum. The theorem's finite-sum assumption excludes accumulation of self roots at zero before a finite count is asserted.

The locally uniform remote bound leaves a compact delay interval away from zero. Every ordinary root is isolated; a closed infinite root set in that compact interval would have an accumulation root, contradicting its nonzero delay derivative. Thus the complete root list is finite. The implicit function theorem continues each root uniquely in reception time. Nonzero gap on the compact complement prevents an additional root from appearing away from those continued branches. The recent and remote guards prevent any root entering through a boundary. The root count is therefore locally constant.

A locally constant integer on a connected reception interval is constant. Within each source channel, order the delays increasingly. Distinct branches cannot exchange order without coinciding, and two distinct simple roots cannot coincide while remaining ordinary. Thus the increasing ordering supplies global labels without monodromy. Covering a compact reception interval by finitely many of the local charts yields uniform positive delay and divisor floors and a finite upper delay bound. The signed divisor is continuous and nonzero on each branch, so its sign is constant.

For relatively periodic paths, a common rigid rotation after a period preserves every relative norm and source contraction. The scalar gaps and divisors repeat. Uniqueness of each ordered root then makes each delay branch periodic. No assumption that an individual root label returns to itself is needed beyond the ordering argument.

## Parity and signed-divisor identities

For a fixed ordinary reception, use the squared causal gap

$$
G_j(d)=|X_i(t)-X_j(t-d)|^2-d^2,
\qquad G_j'(d)=-2dD_j
$$

at a root. The sufficiently remote gap is negative. A partner gap is positive at zero because the simultaneous positions are distinct. Every ordinary root reverses its sign, so a partner channel has an odd number of roots. Reading roots in increasing delay, its divisor signs alternate $+,-,+,\ldots,+$. In particular,

$$
N_{ij}\text{ is odd},\qquad
N_{ij}^{+}-N_{ij}^{-}=1,\qquad
\sum_{b\in(i\leftarrow j)}\operatorname{sgn}D_b=1\quad(i\ne j).
$$

Here $N^{+}$ and $N^{-}$ count positive and negative signed source divisors, not acceleration polarities. Canonical row weights still contain $|D_b|$.

For self, let $\sigma_i$ be the accepted locally constant recent-gap sign. If $\sigma_i=+1$, the same positive-to-negative sign count gives an odd self count with alternating divisor signs starting and ending positive. If $\sigma_i=-1$, the recent and remote gaps are both negative; the self count is even, possibly zero, and divisor signs alternate negative, positive, ending positive when roots exist. Thus

$$
\sum_{b\in(i\leftarrow i)}\operatorname{sgn}D_b
=\frac{1+\sigma_i}{2}.
$$

At a strict-speed reception, $\sigma_i=\operatorname{sgn}(|\dot X_i|^2-1)$. At unit speed the positive-delay gap, not the zero-delay limit, defines the sign. The accepted theorem makes this sign constant along the connected exact history.

If the same member has speed at most one over its entire complete past, every self chord is at most its delay. Equality would require a constant unit velocity over that whole segment, making its positive self root nonordinary. Therefore an everywhere-ordinary history with speed at most one over its entire past has no positive self roots. This conclusion requires the whole relevant past, not merely a finite interval of below-speed receptions; a prescribed earlier above-speed past can leave later self roots.

For a receiver with $n-1$ partners, the combined signed-divisor count is consequently

$$
\sum_{j,b}\operatorname{sgn}D_{ij,b}
=n-1+\frac{1+\sigma_i}{2}.
$$

For six members on a strictly above-wake-speed exact component this count is six; the geometric chart $(1,3,1,1,1,1)$ indeed has seven positive and one negative divisor. This agreement is a consistency check only. Omitting a pair of roots with opposite divisor signs would preserve the identity. Neither parity nor signed counting replaces exhaustive root coverage.

## Qualifications and falsifier

The result supplies no uniform constants across all histories, all spatial scales or an unbounded reception interval. Its compact-interval floors are existential consequences of the selected history's exactness and ordinary domain. The prescribed functional norm chart is a separate constructive admission result.

The assumptions exclude collisions, nonordinary roots, divergent self sums, omitted roots, noncanonical signed-divisor weighting and singular-event continuations. Root counts may change outside that regular domain; this theorem supplies no continuation there. A finite exact bounded ordinary history with a root count change, a positive-delay root accumulating in a compact ordinary complement, or an ordered periodic branch failing to return would falsify the respective structural step. A missing opposite-sign pair would not violate the parity identities and is explicitly outside what those checks can detect.

This companion is a purely analytical subject awaiting separate review. No numerical instrument, target run, new physical premise or root-selection rule is used. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
