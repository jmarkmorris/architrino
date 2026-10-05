# Finite first unit-speed event for a sublinear rotating mirror pair

## The theorem and complete input class

**Claim grade: derived candidate, requiring independent assessment.** Fix $0<p<1$ and $K=R_*=c_f=1$. Select the ordinary sharp radial acceleration $-N/(R^pD)$ for the opposite-polarity mirror planar pair $q,-q$, with the unchanged complete self and partner root convention. Supply a complete separated locally $C^{2,1}$ past on $(-\infty,0]$, with

$$
|q'(S)|\le b_0<1,\qquad
q(S)\times q'(S)\ge0,\qquad
H_0=q(0)\times q'(0)>0,
$$

and exact release compatibility. The cross product denotes its signed planar component. The supplied history need not solve the future equation. No response multiplier, core, cap, root deletion, endpoint selector or physical conservation law is inserted.

Every maximal separated ordinary strict-subfield future of this preparation reaches its first unit-speed boundary in finite time, at positive separation. The complete supplied past may have unbounded radius. No uniform all-future speed margin is assumed.

This includes the [frozen compatible sublinear circle-tail family](alternatives-screen-2026-10-05-radial-sublinear-preparation-independent.md) for every $0<\epsilon\le1/16$, at each fixed $0<p<1$. Its complete preparation was already verified and is unchanged. No small-speed admission beyond those preparation bounds is needed for this qualitative event theorem. The more detailed near-circular expansion remains restricted to its separately established sufficiently small parameters.

The proof was constructed independently before reading a new coordinator sublinear first-event reference. It closes the finite-versus-infinite strict-future alternative left open by the [preceding independent analysis](alternatives-screen-2026-10-05-radial-sublinear-rotation-independent.md); that source remains frozen with its original scope.

## Ordinary roots, causal angle and positive radius

Write physical variables

$$
r=|q|,\qquad H=q\times q',\qquad
R=T-S=|q(T)+q(S)|,\qquad
N=\frac{q(T)+q(S)}R,\qquad
D=1+N\cdot q'(S).
$$

On every finite interval preceding a strict-subfield endpoint, the complete joined history has some speed bound below one: the old past has the supplied margin and the finite generated interval is compact. The partner residual $u-|q(T)+q(T-u)|$ is therefore strictly increasing, negative at zero, and tends to positive infinity. It has exactly one positive root. Every positive-delay self root is excluded by the strict speed chord inequality. These statements cover the entire history.

The causal segment lies in one open half-plane. Indeed, with $C=[q(S)+q(T)]/2$, every intermediate point satisfies

$$
2|q(u)-C|
\le |q(u)-q(S)|+|q(u)-q(T)|
\le\int_S^T|q'(t)|\,dt<2|C|.
$$

The endpoint chord inequality also gives $q(S)\cdot q(T)>0$. Nonnegative past rotation and positive release rotation then give the actual lifted angle $0<\Delta\theta=\theta(T)-\theta(S)<\pi/2$. The exact geometric areal-rate derivative is

$$
H'=\frac{r\,r_S\sin\Delta\theta}{R^{p+1}D}>0.
$$

A first loss of positive rotation is impossible. Throughout the strict future,

$$
H\ge H_0,\qquad r>H_0,\qquad 0<D<2.
$$

The radius bound follows from $H\le r|q'|<r$. Also $R>r$: the chord inequality gives $R\ge2r/(1+b_T)>r$ on each completed finite interval. No contact can precede unit speed.

## The missing estimate: source ranges below a prospective radius barrier

Let $\rho_0=r(0)$ and choose a positive number $M\ge2\rho_0$. Suppose, only provisionally, that the generated radius has not yet exceeded $M$. Every source at nonnegative time then has radius at most $M$, so its causal range obeys $R\le2M$.

For a source at negative time, use the complete supplied-past bound rather than a future speed margin:

$$
|q(S)|\le\rho_0+b_0(-S)=\rho_0+b_0(R-T).
$$

The root equation consequently gives

$$
R\le r(T)+\rho_0+b_0(R-T),
$$

and hence

$$
(1-b_0)R\le r(T)+\rho_0-b_0T\le2M.
$$

Thus all sources, both old and generated, satisfy the uniform conditional bound

$$
R\le BM,\qquad B=\frac2{1-b_0}.
$$

Its constant depends only on the complete supplied-past margin. It does not degenerate when generated speed approaches one. This is the step absent from a bound that uses a hypothetical common future speed margin.

## A first-crossing argument gives a uniform radius bound

The exact radial projection of the received acceleration is

$$
A_r=-\frac{r+r_S\cos\Delta\theta}{R^{p+1}D}
\le-\frac{r}{2R^{p+1}}.
$$

During a prospective first crossing of $M$, every reception with $M/2\le r\le M$ therefore obeys

$$
A_r\le-c_0M^{-p},\qquad c_0=\frac1{4B^{p+1}}.
$$

The exact polar identity and strict receiving speed give

$$
r''=\frac{H^2}{r^3}+A_r
\le\frac1r-c_0M^{-p}
\le\frac2M-c_0M^{-p}.
$$

Choose the fixed radius

$$
M=\max\left\{2\rho_0,\left(16B^{p+1}\right)^{1/(1-p)}\right\}.
$$

Then $M^{1-p}\ge4/c_0$, and the preceding inequality becomes

$$
r''\le-cM^{-p},\qquad c=c_0/2,\qquad cM^{1-p}\ge2
$$

throughout the upper half of the prospective first-crossing region.

Suppose a first crossing of $M$ occurred at time $T_M$. Since $r(0)\le M/2$, let $\tau$ be the last time before $T_M$ at which $r=M/2$. On $(\tau,T_M]$ all radii lie in $(M/2,M]$, all earlier generated radii lie below $M$, and the complete source bound just proved applies. With $r'(\tau)<1$, integration gives, for $z=T-\tau$,

$$
r(T)\le \frac M2+z-\frac{cM^{-p}}2z^2
\le\frac M2+\frac1{2cM^{-p}}
\le\frac{3M}{4}.
$$

This contradicts $r(T_M)=M$. The same argument covers $\tau=0$. Therefore the entire maximal strict future satisfies

$$
H_0<r(T)<M.
$$

The argument uses a first crossing, not a global bound assumed in advance. It controls arbitrary radial turns and every source in the complete history. Its integration is an acceleration inequality, not a conserved central-energy argument. The exponent condition $p<1$ is used exactly when the fixed large $M$ is chosen; the proof does not extend to $p=1$ by substitution.

## Bounded radius forces a finite endpoint

Old negative-time sources disappear once $T>M+\rho_0$. If $S\le0$, then

$$
T-S\le M+\rho_0-b_0S
$$

implies $T\le M+\rho_0+(1-b_0)S\le M+\rho_0$. At every later reception the entire causal interval is generated, with

$$
H\ge H_0,\qquad H_0<r<M,\qquad R<2M.
$$

Consequently

$$
\Delta\theta=\int_S^T\frac{H(u)}{r(u)^2}\,du
\ge\frac{H_0R}{M^2}.
$$

Using the exact torque identity, $D<2$ and $\sin z\ge2z/\pi$ on $[0,\pi/2]$ gives

$$
H'\ge\kappa,\qquad
\kappa=\frac{H_0^3}{\pi M^2(2M)^p}>0.
$$

But strict speed and the radius bound require $H<r<M$. A global strict future is impossible. More quantitatively, its maximal time obeys the conservative finite bound

$$
T_*\le M+\rho_0+\frac{M-H_0}{\kappa}.
$$

If the endpoint occurs before old sources disappear, this bound still holds. It is a preparation-scoped analytical upper bound, not a measured event time or an optimal estimate.

## Identification of the first endpoint

On the finite interval $[0,T_*)$, bounded speed gives a limiting position and $r_*\ge H_0>0$. The positive root delay satisfies $R>r>H_0$, so sources near the endpoint lie at least $H_0$ earlier:

$$
S\le T_*-H_0.
$$

Their lower bound is also finite. For $S<0$, the old-source inequality yields

$$
S\ge-\frac{M+\rho_0}{1-b_0}.
$$

Every sampled source therefore lies in one compact already supplied or generated interval whose upper endpoint is strictly before $T_*$. On this interval source speed has a fixed bound $b_s<1$, source acceleration is bounded, and

$$
D\ge1-b_s>0,\qquad
|q''(T)|\le\frac{H_0^{-p}}{1-b_s}.
$$

Thus velocity and acceleration have finite incoming limits. The acceleration limit follows from convergence of the unique implicit source root and continuity of the retained source velocity. Root transversality and the positive delay remain intact.

If the limiting receiving speed were below one, ordinary position-velocity continuation on this compact source chart would extend the solution within the strict domain, contradicting maximality. Hence

$$
|q'(T)|\longrightarrow1,\qquad
|q(T)-[-q(T)]|\longrightarrow2r_*\ge2H_0>0.
$$

This is the first unit-speed boundary because the preceding future is strict. At the endpoint the partner root is still unique, positive-delay and simple. No positive-delay self root appears at this single receiving event: every such chord integrates strictly subunit speed on its open interval, even though the terminal speed equals one.

No positive crossing derivative is proved. A tangential arrival at the speed boundary is not excluded. No root census immediately after equality, outgoing selector, collision prescription or global post-unit continuation is supplied.

## Consequences for the frozen circle-tail family

For the fixed family, $\rho_0=r_0=(2^p\epsilon^2)^{1/(1-p)}$, $H_0=\epsilon r_0$, and one may take

$$
b_0=\epsilon(1+2\epsilon^2)<1,\qquad 0<\epsilon\le1/16.
$$

The preparation has positive complete areal rate, the stated regularity and exact compatibility. Substitution into $B$, $M$ and $\kappa$ therefore gives an explicit sufficient event-time upper bound for every member of that preparation range. The bound becomes very large at small $\epsilon$ because it uses only the initial positive areal rate in its torque floor; no sharp event-time asymptotic is asserted.

The prior controlled passage to a fixed small speed remains useful for detailed early expansion and angle estimates. The new first-crossing argument supplies the missing large-speed conclusion without extending that small-speed expansion outside its domain. It excludes the global strict future whose speeds merely approach one along a sequence.

There is also finite total incoming angle for each fixed preparation. Since $r>H_0$, strict speed gives $0<\theta'=H/r^2<1/H_0$. Hence

$$
0<\theta(T_*)-\theta(0)\le T_*/H_0<\infty.
$$

This is a finite incoming angle bound; it neither gives a sharp coefficient nor extends the trajectory after the event.

## Falsifiers, provenance and scoped validation

A failure of the negative-time source inequality, a source range exceeding $BM$ before the first radius-$M$ crossing, an admitted path crossing that radius while satisfying the displayed concavity inequality, or a global bounded rotating future despite the torque floor would falsify the theorem. A finite endpoint with limiting speed below one and all displayed source margins intact would falsify the continuation step. Nonmirror histories, negative supplied rotation, an incomplete past, a supplied superfield segment, a different radial law or a post-unit branch do not satisfy this theorem's inputs.

The independent validation route is to check the old-source estimate and first-crossing argument separately from the positive-torque and finite-source-window endpoint proof. All of them are explicit inequalities for the actual delayed equation. No numerical target, new executable instrument, fitted response, Python process or background computation is involved.

Source identities measured with shasum -a 256 and retained in the final inventory:

| Source | SHA-256 |
| --- | --- |
| [Frozen sublinear preparation](alternatives-screen-2026-10-05-radial-sublinear-preparation-independent.md) | 06323905616fea6a84ccc368aaffa492d411bab5b0e1d04b092d746aac4f55da |
| [Earlier obstruction and controlled passage](alternatives-screen-2026-10-05-radial-sublinear-rotation-independent.md) | c6d58471aadb927f5eba324e2796f892da9d4330eb420601a275e967b7469e0a |
| [Positive radial rotating geometry](alternatives-screen-2026-10-05-radial-rotating-class.md) | aa271d167786273f8c040c3eda5e116888b7f40df68317dbb9270682f30c1c9a |
| [Earlier linear-vector first-event comparison](alternatives-screen-2026-10-05-linear-rotating-finite-event.md) | 363daa7e3a8098979d4bcff4e30f8eb098dc90af6b55f313c8eb8513c9cd90ec |

Only this new independent first-event source is authored. Earlier preparations, subjects, references and shared owners remain unchanged. The first-event result awaits independent mathematical assessment. Whitespace and exact source hashes are checked after creation.
