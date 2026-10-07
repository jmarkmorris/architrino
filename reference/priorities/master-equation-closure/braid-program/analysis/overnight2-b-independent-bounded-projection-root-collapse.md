# Independent review of bounded-projection self-root collapse

## Disposition and hypotheses

**Derived and accepted without repair.** The [frozen subject](overnight2-b-bounded-projection-root-collapse.md) proves that the stated bounded above-wake exact history cannot retain a uniform positive self-delay floor on any future tail. For every tail and every positive threshold there is an actual positive self causal root below that threshold. One can consequently select receptions tending to infinity with positive self delays tending to zero.

If the selected member additionally has uniformly bounded physical acceleration $|\ddot X|\le M$, then both reception and emission speeds along these roots tend to one, and

$$
0<|D_n|\le Md_n/2\longrightarrow0.
$$

This is necessary asymptotic degeneration of a hypothetical exact ordinary history. It does not prove existence of such a history, a finite-time event, or divergence of the complete acceleration sum.

Use physical absolute time and $K=c_f=1$. The exact-domain premises are those of the [accepted independent recent-gap theorem](overnight2-b-independent-wake-speed-crossing.md): finitely many complete $C^2$ paths, collision-free simultaneous positions, a locally uniform finite complete-past root cutoff, every positive-delay root ordinary and included, positive self polarity, the absolute source divisor, and a well-defined finite canonical acceleration sum equal to prescribed acceleration. For one member on $I=[t_0,\infty)$, use a fixed orthogonal decomposition $X=(Y,z)$, assume $|\dot Y|\le1$, at least one strict above-wake reception in $I$, a finite future planar diameter $D_{\rm pl}$ and a finite axial range width $H_z$. The additional acceleration bound concerns this selected member on the future, not all sources on their entire pasts.

The unchanged [independent projection theorem](overnight2-b-independent-unit-planar-speed.md) implies that $z$ is strictly monotone on $I$. The recent-gap sign is positive throughout $I$, with a locally uniform root-free gap near each finite reception. Neither statement provides a single uniform cutoff on the whole unbounded interval. The argument below proves that such a global cutoff is impossible. The Ramon E. Moore role is an analytical lens, not proof authority; no additional physical premise is used.

## Uniform root absence would give uniform positive chords

Fix any future tail beginning at $L\ge t_0$ and any proposed positive cutoff $d_*$. Suppose that no reception $t\ge L$ has a positive self root with $d\le d_*$. At each such fixed reception, the accepted theorem gives positive self gap for sufficiently small positive delays. The distance-minus-delay gap is continuous for $d>0$. Its sign cannot change on $(0,d_*]$ without a zero. Hence the assumed absence of roots implies

$$
|X(t)-X(t-d)|>d\qquad(t\ge L,\ 0<d\le d_*).
$$

This step starts with an assumption of uniform root absence. It does not improperly upgrade the actual pointwise or locally uniform gaps to a tail-wide gap. Complete history supplies the path values even when $t-d<L$; the later block construction uses only segments wholly in the future tail.

Reverse the scalar coordinate orientation if necessary so $z$ is strictly increasing. This is an orthogonal coordinate choice, not a change in polarity or the law. Choose $\delta>0$ with $2\delta<d_*$ and an integer $N\ge2$ with $N\delta>2D_{\rm pl}$. Such choices are possible for every finite diameter, including zero.

## One-step and two-step estimates

Take a block beginning at $t\ge L$ with $N$ successive steps of length $\delta$. Define the average planar step velocities and positive axial increments by

$$
u_k=\frac{Y(t+(k+1)\delta)-Y(t+k\delta)}{\delta},\qquad
w_k=z(t+(k+1)\delta)-z(t+k\delta)>0,
$$

for $k=0,\ldots,N-1$, and put $W=\sum_{k=0}^{N-1}w_k$. The speed bound and triangle inequality give $|u_k|\le1$.

Apply the assumed strict positive-gap inequality at the later endpoint of a single step. Orthogonality of the planar and scalar coordinates gives

$$
\delta^2|u_k|^2+w_k^2>\delta^2,
\qquad |u_k|^2>1-(w_k/\delta)^2.
$$

For each adjacent pair of steps, use delay $2\delta<d_*$ at its later endpoint to obtain

$$
\delta^2|u_k+u_{k+1}|^2+(w_k+w_{k+1})^2>4\delta^2.
$$

The exact parallelogram identity then gives

$$
|u_{k+1}-u_k|^2
=2|u_k|^2+2|u_{k+1}|^2-|u_k+u_{k+1}|^2
<\left(\frac{w_k+w_{k+1}}{\delta}\right)^2.
$$

Both axial increments are positive, so taking square roots is valid and preserves a strict bound. Summing over adjacent steps yields

$$
\sum_{k=0}^{N-2}|u_{k+1}-u_k|
<\frac{2W-w_0-w_{N-1}}{\delta}<\frac{2W}{\delta}.
$$

No step vector is normalized to unit length; the identity applies to average planar velocities exactly as defined. The squared lower bound for an individual step need not be positive in general. It is used as a positive lower bound only in the small-$W$ case below.

## Bounded diameter forces an axial gain per block

Assume $W\le\delta/10$. Then $w_0\le W$ and the single-step inequality implies

$$
|u_0|>\sqrt{99/100}.
$$

The total-variation estimate puts every $u_k$ within $2W/\delta\le1/5$ of $u_0$. Triangle inequality in the reverse direction gives

$$
\left|\sum_{k=0}^{N-1}u_k\right|
\ge N|u_0|-\sum_{k=0}^{N-1}|u_k-u_0|
>N\left(\sqrt{99/100}-1/5\right)>\frac34N.
$$

The exact last comparison follows from $99/100=396/400>361/400=(19/20)^2$, so $\sqrt{99/100}>19/20$ and $19/20-1/5=3/4$. Consequently

$$
|Y(t+N\delta)-Y(t)|>\frac34N\delta>D_{\rm pl}.
$$

For $D_{\rm pl}>0$, $N\delta>2D_{\rm pl}$ even gives the stronger lower bound $3D_{\rm pl}/2$. For $D_{\rm pl}=0$, the left side is strictly positive because $N\delta>0$, again contradicting the diameter bound. Thus every such block must have

$$
W>\delta/10.
$$

Apply this to $n$ consecutive nonoverlapping blocks with shared endpoints. Since all increments have the same sign, their axial changes telescope exactly to $z(t+nN\delta)-z(t)$ and exceed $n\delta/10$. Yet both endpoints lie in an axial interval of width $H_z$, so the change is at most $H_z$. Choosing

$$
n=\left\lfloor\frac{10H_z}{\delta}\right\rfloor+1
$$

makes $n\delta/10>H_z$, a contradiction within a finite collection of future blocks. There is no assumption about convergence of velocity, acceleration or a time average. If $H_z=0$, strict monotonicity is already incompatible with the axial range; the block inequality also gives a contradiction with one block.

## Actual roots at arbitrarily late receptions

The preceding contradiction disproves the assumed absence of roots with $d\le d_*$ on any tail. Therefore for every $L\ge t_0$ and every $d_*>0$, some $t\ge L$ has an actual positive self causal root with $0<d\le d_*$. To state a strictly-below-threshold version for any $\theta>0$, apply this result with $d_*=\theta/2$. This removes any endpoint ambiguity.

For example, take tails beginning at $\max\{t_0,n\}$ and thresholds $1/n$. Select a root from each. The resulting receptions satisfy $t_n\to\infty$ and delays satisfy $0<d_n<1/n\to0$. No root is inferred from a failed interval solver or a sampled list. It is the exact continuity implication from absence of roots to a forbidden chord inequality that forces these roots.

The accepted local uniform recent gaps also supply a positive self-delay floor on every compact reception interval by a finite subcover. Hence any future sequence of self roots with delays tending to zero must eventually leave each compact reception interval. This is compatible with ordinary roots and finite canonical acceleration at every finite time; the conclusion is asymptotic. It does not locate a first finite-time singularity.

## Bounded acceleration implies speed and divisor degeneration

Assume additionally $|\ddot X(t)|\le M<\infty$ on $[t_0,\infty)$. Since $t_n\to\infty$ and $d_n\to0$, the whole segment $[t_n-d_n,t_n]$ is in that future for sufficiently large $n$. At a self causal root let

$$
n_n=\frac{X(t_n)-X(t_n-d_n)}{d_n}
=\frac1{d_n}\int_{t_n-d_n}^{t_n}\dot X(s)\,ds,
\qquad |n_n|=1.
$$

The acceleration bound makes velocity Lipschitz with constant $M$ on the segment. Averaging its distance from the reception velocity gives

$$
|n_n-\dot X(t_n)|
\le\frac1{d_n}\int_{t_n-d_n}^{t_n}M(t_n-s)\,ds
=\frac{Md_n}{2}.
$$

The analogous integral using $s-(t_n-d_n)$ gives the same bound relative to emission velocity. Reverse triangle inequality therefore yields

$$
\big||\dot X(t_n)|-1\big|\le Md_n/2\longrightarrow0,
$$

and the emission speed likewise tends to one. These are along the selected root sequence; no full-time velocity limit is established. The exact sign theorem also rules out strict below-wake reception speeds on this connected above-wake component, but that extra fact is not needed for the absolute estimate.

The canonical signed divisor uses delayed source velocity, which for self is $\dot X(t_n-d_n)$. Thus

$$
D_n=1-n_n\cdot\dot X(t_n-d_n)
=n_n\cdot\bigl(n_n-\dot X(t_n-d_n)\bigr),
$$

and

$$
0<|D_n|\le Md_n/2\longrightarrow0.
$$

The positive lower inequality is pointwise ordinariness. It asserts no common divisor floor. If $M=0$, the estimate gives $D_n=0$ for every sufficiently late root, directly contradicting ordinariness; hence the entire stated hypothesis package is impossible in that special case.

For $M>0$, the individual self-row norm satisfies

$$
\left|\frac{n_n}{d_n^2|D_n|}\right|
=\frac1{d_n^2|D_n|}\ge\frac2{Md_n^3}\longrightarrow\infty.
$$

This is not a lower bound on the norm of the complete sum. Other source or self rows may also become large, and opposing vector contributions cannot be discarded. The selected member's bounded prescribed acceleration does not alone bound each individual canonical row. Establishing impossibility of compensating contributions would require additional uniform information not assumed or proved here. No total-sum divergence, finite-time blow-up or existence claim is drawn from the individual-row estimate.

## Strictly slower planar projections and scope boundary

If there is a fixed $0\le v_*<1$ with $|\dot Y|\le v_*$ throughout the future, the accepted crossing theorem gives $|\dot X|\ge1$ everywhere on the connected interval containing the strict above-wake reception. Orthogonality then implies

$$
|\dot z|\ge\sqrt{1-v_*^2}>0.
$$

Continuity keeps the sign of $\dot z$ fixed, and integrating its magnitude lower bound gives unbounded axial change on the future, contradicting $H_z<\infty$. This simpler exclusion does not require the block lemma or a proposed uniform recent-root gap. The nontrivial limiting case is the allowed bound $|\dot Y|\le1$ without a fixed strict margin below one.

Periodic height was already excluded in this above-wake projection class by the accepted monotonicity theorem. The present conditional result addresses bounded aperiodic monotone height. It rules out a uniform future self-delay floor and, with bounded acceleration, a uniform future absolute-divisor floor. It does not construct such a history or decide whether the exact equation can realize the required asymptotic degeneration. A root cutoff on the complete past remains a separate premise; bounded future positions alone do not establish that earlier-history condition.

## Falsifiers, verification and preservation

An exact history satisfying every stated premise and retaining a positive self-delay floor on some future tail would directly falsify the main result. An invalid one-step/two-step chord identity, failure of monotone telescoping, or a planar endpoint displacement exceeding the alleged diameter would expose the corresponding geometric assumption or proof defect. An alleged small-root sequence without actual causal equalities would not satisfy the conclusion. Under a genuine uniform acceleration bound, a self root with $|D|>Md/2$ or a reception-speed deviation exceeding $Md/2$ would refute the averaged-velocity estimate. None of these statements treats an unresolved numerical computation as a physical counterexample.

Scoped verification was analytical after a full read of the frozen subject: the projection premise, all strict block inequalities, threshold quantifiers, compact-time qualification, delayed-average estimates and individual-versus-total distinction were reconstructed above. Native `shasum -a 256` identifies the frozen subject as `99f11d135120f88331e71f2ec9122a636172305cb624b830df557b3d82116f7a`; final hashing confirms that identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped whitespace check; exit one without diagnostics denotes this new file's difference. No numerical target, companion or runtime receipt was necessary, and the parent's numerical slot was untouched.

Only this new report was authored. Frozen subjects, accepted dependencies, earlier reports and instruments, retained receipts, the parent account and shared owners remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Retained evidence remains local without a backup or archive-recovery claim. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) is the remaining receiving action. This bounded review is complete.
