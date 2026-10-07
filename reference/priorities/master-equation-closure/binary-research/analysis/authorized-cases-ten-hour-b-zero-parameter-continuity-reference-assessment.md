# Assessment of the zero-speed continuity reference

**Derived acceptance of the reduction and conditional return obstruction.** The [independent reference](authorized-cases-ten-hour-b-zero-parameter-continuity-reference.md), SHA-256 `07e3f7b64f2d8e2c8b73337329fb806cf22304c272948ac3d6b931de1898f0bc`, was read only after the separately constructed [subject](authorized-cases-ten-hour-b-zero-parameter-continuity-subject.md), SHA-256 `80d6022e2a9c86aa350925ec96d01920a0156f7bb838fef8e2cc999614b1ca82`, was frozen. The reference correctly proves that terminal-vector continuity at a hypothetical zero-speed parameter is equivalent to local uniform escape from bounded radii. It also proves a quantitative terminal-speed gap for any actual sequence of arbitrarily late fixed-radius returns. It establishes neither continuity nor discontinuity and constructs no zero-speed member or returning sequence. No substantive correction is required.

## Complete pre-tail placement and the annular bound

The accepted [all-future assessment](authorized-cases-ten-hour-reference-b-adjudication.md) supplies $|v|^2r\le1024$ and $\mathcal E'>\epsilon^3/r^4$ through the nonpositive stage and the entire finite positive-account passage before the qualified outgoing-tail entry. These are precisely the phases where the reference uses them. They need not hold after entry. Source coverage and the original seams are inherited from that assessment; no generated equation is imposed on an old supplied source.

Failure of local uniform escape supplies $\epsilon_j\to\epsilon_*$ and $s_j\to\infty$ with $r_j(s_j)\le R$, for a fixed enlarged $R\ge1$. Finite-prefix convergence to the dispersing zero-speed base implies that the prefix maxima $M_j\to\infty$. For large $j$ a maximizing reception is interior, so $p=0$ there. A qualified tail cannot have started before this maximum because its radius is strictly increasing. Nor can it start between this maximum and the subsequent first arrival at $R$: its entry radius would exceed $R$, precluding that return. At the arrival itself, the derivative is nonpositive by first arrival from above, whereas qualified entry has $p_t>0$. Thus the entire closed maximum-to-return interval is before entry, including both endpoints.

At the maximum the account's term involving $p$ vanishes. The speed bound implies $h^2\le1024M_j$, hence

$$
\mathcal E(\sigma_j)\ge-\frac1{M_j}-\frac{512b^2}{M_j^2}
$$

on the local parameter neighborhood $0<a\le\epsilon\le b$. This lower bound requires no negative-account assumption and tends to zero. Since $M_j>2R$ eventually, the last $2R$ crossing before the first $R$ arrival exists. Between those crossings $R\le r\le2R$, even if the motion has intervening turns. The elementary displacement inequality gives

$$
\Delta s\ge\frac{R}{32/\sqrt R}=\frac{R^{3/2}}{32},\qquad
\Delta\mathcal E\ge\frac{a^3\Delta s}{16R^4}
\ge\frac{a^3}{512R^{5/2}}.
$$

This independently checks the exponent, coefficient and inequality directions without assuming radial monotonicity. Account increase from the maximum to this annulus then gives, for sufficiently large $j$,

$$
\mathcal E(\tau_j)\ge\delta_R:=\frac{a^3}{1024R^{5/2}}>0.
$$

The accepted positive-account passage takes this same actual solution to its later qualified tail entry and preserves account increase up to that entry. With $r_t\mathcal E_t=128$ and the exact tail bound $|v_\infty|^2\ge257/(2r_t)>\mathcal E_t$, it follows that

$$
|V_\infty(\epsilon_j)|
=\epsilon_j|v_\infty(\epsilon_j)|
>a\sqrt{\delta_R}>0.
$$

This is a physical speed gap. It does not rely on monotonicity of the account in the later ballistic tail. It also shows that an initially unspecified returning sequence must eventually consist of positive-speed members; no such positivity was assumed to derive the annular increment.

## Both directions of the equivalence

The return argument proves the contrapositive of continuity implying local uniform escape. Its sequential formulation has the correct quantifiers: failure of one common radius neighborhood/time bound allows successively smaller relative parameter neighborhoods and larger receiving times. The base's own pointwise escape makes the corresponding large prefix maxima unavoidable by finite-prefix continuity.

For the other direction, suppose local uniform escape holds. Choose a large common radius $R$ and a finite reception $S$ after its common escape time, with the base velocity small. Finite-prefix continuity then makes nearby $|v(S)|$ small. A positive member entering its exact tail after $S$ has $|v_\infty|<19/\sqrt R$. A positive member which entered earlier satisfies

$$
|v(S)|\ge\sqrt{\frac{257}{2r_t}},\qquad
|v_\infty|<\frac{19}{\sqrt{r_t}}
\le\frac{19\sqrt2}{\sqrt{257}}|v(S)|<2|v(S)|.
$$

The last arithmetic comparison is exact because $2\cdot19^2<4\cdot257$. Zero-speed neighbors need no bound. Multiplying by the local parameter upper bound $b$ gives the reference's common physical terminal estimate, which can be made arbitrarily small by choosing $R$, then $S$, then the parameter neighborhood. No uniform positive radial-speed floor is assumed across the zero member and no angular-limit continuity is required for convergence to the zero vector.

The physical uniform-escape conversion also checks. For a desired physical radius $L$, use scaled radius $4b^2L$ and physical time $S/(4a^3)$. Conversely, for a desired scaled radius $R$, use physical radius $R/(4a^2)$ and scaled time $4b^3T$. The smallest and largest parameter factors occur in the correct places. This argument requires $\epsilon_*>0$ and makes no assertion at the excluded parameter zero.

## Relation to the frozen subject and remaining boundary

The subject independently reduced continuity to divergence of nearby positive members' qualified entry radii, equivalently to vanishing of their remaining pre-entry account integral. The reference's local uniform-escape condition is stronger in appearance because it quantifies over all sufficiently late times and includes neighboring zero-speed members. The annular gap proves the missing reverse implication: failure of that condition forces a sequence of positive terminal speeds bounded away from zero. Together the two accepted reductions identify equivalent forms of the same unresolved obligation; their agreement is not being substituted for the annular proof above.

The complete incoming source interval remains part of the accepted tail transition even when it contains pre-entry source times. Increasing source clocks prevent temporal source rollback, but they do not make the generated spatial radius monotone before entry. Thus neither the pointwise zero-branch grazing confinement nor positive-branch openness rules out the late return sequence. The new equivalence sharpens the unanswered question without selecting either terminal-continuity verdict.

The quantitative all-future assessment has SHA-256 `de94d663737d7d004cd2dcbf39f52ea0b4d23742f68d47eaf50de4e08dc071a5`. The reference's finite-prefix source and corrected zero-branch sources are identified in its frozen source table; both subject/reference identities above were rechecked by scoped `shasum -a 256` reads before this assessment. No new scientific computation, source history, law, parameter member or arbitrary-history class was introduced. Both frozen constructions remain unchanged.

Falsifiers are failure of the accepted pre-entry speed/account bounds on an incoming passage, loss of strict outward tail monotonicity, failure of finite-prefix continuity or the two-sided terminal bounds, or incorrect physical scale conversion. A proof of actual local uniform escape would establish continuity; an actual returning parameter sequence would establish its failure. This assessment accepts only the equivalence and quantitative conditional obstruction. The existing known-first document checker validates notation and local destinations separately from that mathematical assessment.
