# Independent review of coupled root degeneration

## Verdict and exact scope

**Derived and accepted without repair.** The [frozen subject](overnight2-b-coupled-root-degeneration.md) correctly turns the possible-cancellation qualification into a necessary second loss of divisor margin. At the same sufficiently late receptions as the assumed small self roots, an actual different retained root has delay at least a fixed positive $\eta$ and satisfies

$$
0<\nu_n\le
\frac{N}{\eta^2\left(1/(Md_n^3)-M\right)}
\le\frac{2NM}{\eta^2}d_n^3\longrightarrow0.
$$

The second inequality holds once $M^2d_n^3\le1/2$. The selected nonrecent root may be self or partner. The argument does not identify a unique branch, require that one row alone cancels the recent sum, or establish a finite-time fold or divergent total acceleration. It gives a necessary simultaneous degeneration if such an exact history exists.

Use physical absolute time and the unchanged canonical scenario $K=c_f=1$, unit polarity magnitudes, positive self polarity and absolute source divisors. The assumptions include complete $C^2$ paths for finitely many members, collision-free simultaneous positions, locally uniform finite complete-past root cutoffs, every positive-delay root ordinary and included, and a well-defined finite canonical sum equal to prescribed acceleration on a connected future interval. For the selected receiver, require speed at least one, acceleration norm bounded by $M>0$, a common future bound $V_*<\infty$ on every source speed, and a common positive simultaneous receiver-partner separation floor $s_*$. Assume actual self roots at receptions $t_n\to\infty$ have positive delays $d_n\to0$.

The receiver-speed condition follows from the [accepted independent recent-gap theorem](overnight2-b-independent-wake-speed-crossing.md) if the connected exact interval contains a strict above-wake reception. The Ramon E. Moore role is an analytical lens under the Specialist charter, not proof authority. No ceiling, event prescription or extra interaction weight is added.

## Why the complete count is a fixed finite number

The [independent exact-chart review](overnight2-b-independent-exact-root-chart-structure.md) supplies finite ordered ordinary root charts under these hypotheses. In outline, collision freedom excludes sufficiently recent partner roots locally, while finite exact acceleration and the recent-self projection argument provide a locally uniform recent-self gap. A locally uniform remote cutoff leaves a compact delay region. Ordinary roots there are isolated and form a closed set, so there are only finitely many. Implicit continuation of those roots together with exclusion of their compact complement proves local constancy of the complete count.

The total count for the receiver is therefore a locally constant finite integer on a connected interval and hence a single finite number $N$. This does not require a uniform remote cutoff over the whole unbounded future; the local cutoffs suffice for continuation and connectedness. No parity or remote-gap sign is used. In particular, the earlier qualification that a negative remote gap is an additional premise for parity does not affect this count argument.

The count includes every source channel and all positive self roots, not just roots found by a numerical procedure. The small-root sequence implies $N\ge1$. At the late receptions where the compensation argument applies, existence of a separate nonrecent root in fact requires at least two retained roots. If the complete count left no such root available, the assumed exact-history sequence would already be impossible.

## A fixed recent interval contains only self roots

Choose once and for all

$$
0<\eta\le\min\left\{\frac1M,\frac{s_*}{2(1+V_*)}\right\}.
$$

The constants make this possible. For sufficiently large $n$, $d_n<\eta$ and every source-time segment $[t_n-d,t_n]$ with $0<d\le\eta$ lies in the future interval carrying the uniform bounds. For a partner source,

$$
|X_i(t_n)-X_j(t_n-d)|
\ge|X_i(t_n)-X_j(t_n)|-|X_j(t_n)-X_j(t_n-d)|
\ge s_*-V_*d.
$$

Subtracting $d$ gives a gap at least

$$
s_*-(1+V_*)d\ge s_*/2>0.
$$

Thus no partner root occurs even at the endpoint $d=\eta$. The later decomposition uses $d<\eta$ as recent and $d\ge\eta$ as nonrecent, so there is no unassigned boundary root. A self root at exactly $\eta$ is assigned to the nonrecent set, which is harmless.

This exclusion genuinely uses uniform source speed and simultaneous separation on the relevant future segments. Pointwise collision freedom alone cannot provide one common $\eta$ on an unbounded tail. Source bounds before the future interval are not used in this recent guard. Older roots remain in the nonrecent sum and are not discarded.

## Every recent self row has a common positive projection

At a fixed late reception $t_n$ define

$$
e_n=\frac{\dot X_i(t_n)}{|\dot X_i(t_n)|}.
$$

The denominator is nonzero because the receiving speed is at least one. At any self root of delay $0<d<\eta$, the unit chord is the delayed average velocity,

$$
n_d=\frac{X_i(t_n)-X_i(t_n-d)}d
=\frac1d\int_{t_n-d}^{t_n}\dot X_i(s)\,ds,
\qquad |n_d|=1.
$$

The receiving member's acceleration bound gives

$$
|n_d-\dot X_i(t_n)|
\le\frac1d\int_{t_n-d}^{t_n}M(t_n-s)\,ds
=Md/2.
$$

Consequently

$$
e_n\cdot n_d\ge|\dot X_i(t_n)|-Md/2\ge1-M\eta/2\ge1/2.
$$

All recent self rows at this reception have the same positive projection direction $e_n$. The canonical self polarity and absolute source divisor give

$$
e_n\cdot a_d
=\frac{e_n\cdot n_d}{d^2|D_d|}
\ge\frac1{2d^2|D_d|}>0.
$$

A negative signed divisor does not change that sign. The direction $e_n$ may vary with reception; a single fixed projection over the whole infinite sequence is neither needed nor asserted.

For the chosen root $d_n$, the same averaged-velocity calculation from the emission endpoint yields

$$
|n_n-\dot X_i(t_n-d_n)|\le Md_n/2.
$$

The divisor uses that delayed source velocity, so

$$
D_n=1-n_n\cdot\dot X_i(t_n-d_n)
=n_n\cdot\bigl(n_n-\dot X_i(t_n-d_n)\bigr),
\qquad 0<|D_n|\le Md_n/2.
$$

Combining the two estimates proves

$$
e_n\cdot a_{d_n}\ge\frac1{Md_n^3}.
$$

The product of the two factors of $1/2$ is handled correctly: $e_n\cdot n_n\ge1/2$, whereas $1/|D_n|\ge2/(Md_n)$, leaving precisely the coefficient $1/M$. Every other recent root is self and adds a positive quantity in this projection.

## Exact balance forces a nonrecent small divisor

Write the complete finite sum as $A=A_{\rm rec}+A_{\rm far}$ using delays $d<\eta$ and $d\ge\eta$. Then

$$
e_n\cdot A_{\rm rec}\ge\frac1{Md_n^3}.
$$

If the nonrecent set were empty, exact balance and $|\ddot X_i|\le M$ would imply $1/(Md_n^3)\le M$. This is impossible once $d_n^3<1/M^2$. Thus a nonrecent root exists for all sufficiently late selected receptions; the eventual stronger threshold $M^2d_n^3\le1/2$ ensures this automatically.

Let $\nu_n$ be the minimum of $|D|$ over that finite nonempty nonrecent set. Every divisor is nonzero by ordinariness, so $\nu_n>0$ and the minimum is attained at an actual root. A nonrecent row has unit polarity magnitude and unit chord direction, hence

$$
|a_b|=\frac1{d_b^2|D_b|}\le\frac1{\eta^2\nu_n}.
$$

There are at most $N$ such rows, giving $|A_{\rm far}|\le N/(\eta^2\nu_n)$. Exact vector balance and projection now yield

$$
\frac1{Md_n^3}
\le e_n\cdot A_{\rm rec}
=e_n\cdot\ddot X_i(t_n)-e_n\cdot A_{\rm far}
\le M+\frac{N}{\eta^2\nu_n}.
$$

Once $1/(Md_n^3)-M>0$, rearrangement gives

$$
\nu_n\le\frac{N}{\eta^2\bigl(1/(Md_n^3)-M\bigr)}.
$$

For $M^2d_n^3\le1/2$,

$$
\frac1{Md_n^3}-M
=\frac{1-M^2d_n^3}{Md_n^3}
\ge\frac1{2Md_n^3},
$$

which proves $\nu_n\le2NMd_n^3/\eta^2\to0$. The chosen root is different from the root $d_n$, since its delay is at least $\eta>d_n$ at the same reception.

The exact equation also shows that the nonrecent aggregate projection must be negative once the recent lower bound exceeds $M$. The divisor-minimizing root need not itself provide all that negative projection or be uniquely responsible for compensation. The theorem proves existence of a small nonrecent divisor, not a selected cancellation mechanism. A nonrecent self root can have a chord direction opposing the receiving velocity despite positive self polarity; the argument cannot identify the second degeneration as a partner fold.

## Combination with bounded-projection collapse

The [accepted bounded-projection review](overnight2-b-independent-bounded-projection-root-collapse.md) supplies actual $d_n\to0$ at $t_n\to\infty$ for its bounded above-wake geometry with planar speed at most one. Combining that conclusion with the additional uniform assumptions of this review yields both

$$
d_n\to0,\qquad |D_n|\le Md_n/2\to0
$$

at the selected recent self roots and

$$
d_{b_n}\ge\eta,\qquad
0<|D_{b_n}|\le\frac{2NM}{\eta^2}d_n^3\to0
$$

at some other retained roots at those same receptions. The previous bounded-position and $C^2$ assumptions do not automatically supply a uniform source-speed bound, receiving-acceleration bound or simultaneous separation floor on an unbounded interval; those remain explicit additional premises here.

The result therefore rules out keeping all nonrecent divisors uniformly bounded away from zero while recent self delays collapse under these uniform hypotheses. It does not contradict pointwise ordinariness at every finite reception or select any finite-time continuation. It does not prove that such a paired asymptotic degeneration can actually satisfy the exact equation.

## Falsifiers, validation and preservation

A partner root with $d\le\eta$ under the stated separation and speed floors would falsify the uniform guard. A recent self row with nonpositive projection along $e_n$ would contradict the averaged-velocity estimate or the selected canonical sign/weight convention. A chosen self divisor exceeding $Md_n/2$ under the acceleration bound would falsify the delayed-source estimate. An exact finite-count history satisfying every uniform premise while keeping all nonrecent divisors above a fixed positive floor along the small-self-root sequence would directly refute the compensation bound. Losing the count premise through an unaccounted remote root or nonordinary event would instead leave the theorem's domain.

No conclusion about divergence of the complete sum follows from the individual large recent row alone. Here exact balance is used to bound the required nonrecent sum and deduce its loss of divisor margin. Without the separation floor, recent partner rows could enter with opposing polarity; without uniform source speed or receiving acceleration, the declared constants fail; without unit polarity magnitudes or fixed finite count, the stated row-sum bound must be changed. None of those changes is selected by this review.

Scoped verification was analytical after a full read of the frozen subject: the complete-count premise, fixed recent interval, average-velocity signs, nonrecent existence threshold, attained minimum and exact cubic coefficient were independently reconstructed above. Native `shasum -a 256` identifies the frozen subject as `e0fe833367f1590e93ec45727d7c85fc577f0b653884c0da69f944bedb3c3d03`; final hashing confirms that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped new-file whitespace check; exit one without diagnostics denotes the new-file difference. No numerical instrument, target, companion or runtime receipt was required, and the parent's numerical slot was untouched.

Only this new report was authored. Frozen subjects, accepted dependencies, prior reports, instruments, receipts, parent account and shared owners remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Retained local evidence remains in place without a backup or archive-recovery assertion. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining receiving action. This bounded review is complete.
