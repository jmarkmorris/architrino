# A finite first-unit theorem from a record-radius bound

## Fixed class and independent construction

**Grade: derived candidate, frozen before receiving the independently assigned first-event proof.** Fix $0<p<1$, $K=R_*=c_f=1$, the sharp radial mirror planar equation $q''=-N/(R^pD)$ and the complete history class of the [positive radial-response theorem](alternatives-screen-2026-10-05-radial-rotating-class.md). The supplied past is separated, locally $C^{2,1}$, acceleration-compatible, uniformly subfield with bound $b_0<1$, and has nonnegative signed areal rate with $h_0=h(0)>0$. Write $r_0=|q(0)|$. No uniform bound below one is assumed for the generated future.

The coordinator previously derived only an obstruction to a global uniform future speed margin. The new argument below removes that extra hypothesis by bounding the first attempted large-radius excursion. It was constructed before dispatching the worker's corresponding first-event follow-up; no new worker derivation has been received. The endpoint patch family already supplied for the selected sublinear equation provides nonempty cases, but the result is not restricted to near circles.

**Claim:** the maximal separated strict-subfield future reaches unit speed in finite time at positive separation. The proof supplies a conservative time bound depending on the fixed exponent, supplied speed margin and release data. It proves neither transversality nor an outgoing event selector.

## Geometry before a first large-radius record

Throughout the strict-subfield future, the complete half-plane lemma gives $q(T)\cdot q(S)>0$, exact positive torque gives $h(T)\ge h_0$, and hence $r(T)>h_0$. Let $M>2r_0$ and suppose the radius first reaches $M$ at time $t_M$. At every earlier receiving time $T\le t_M$, all generated source radii are at most $M$.

If $S\ge0$, the partner range is at most $2M$. If $S<0$, the complete supplied speed bound gives $r(S)\le r_0-b_0S$. Since $S=T-R$,

$$
(1-b_0)R\le r(T)+r_0-b_0T\le M+r_0\le2M.
$$

Thus, for either kind of source, $R\le2M/(1-b_0)$. This estimate uses only the supplied speed margin and the first-record condition; it remains uniform as generated speed approaches one. Also $D<2$. The acute source/reception angle yields

$$
N\cdot\frac{q(T)}{r(T)}
=\frac{r(T)^2+q(T)\cdot q(S)}{r(T)R}
\ge\frac{r(T)}R.
$$

On the upper half of the attempted excursion, $M/2\le r(T)\le M$, the exact inward radial input is therefore bounded by

$$
A_r\le-\frac{r(T)}{2R^{p+1}}
\le-C_0M^{-p},\qquad C_0=\frac{(1-b_0)^{p+1}}{2^{p+3}}>0.
$$

The kinematic centrifugal term satisfies $h^2/r^3\le1/r\le2/M$ because current speed is below one. Consequently

$$
r''\le\frac2M-C_0M^{-p}.
$$

No comparison conserved scalar, small-delay expansion or future uniform speed margin enters.

## A first-record contradiction

Choose, for example,

$$
M=\max\left(4r_0,\left(\frac8{C_0}\right)^{1/(1-p)}\right).
$$

Then $C_0M^{1-p}\ge8$, so on the entire upper-half excursion $r''\le-(C_0/2)M^{-p}<0$. Let $t_0$ be the last time before $t_M$ at which $r=M/2$. Such a time exists by $M>2r_0$. Radius remains between $M/2$ and $M$ on this interval. Since $r'$ decreases strictly there, it must remain positive; otherwise it could never reach $M$. Integrating $d(r'^2)/dr=2r''$ gives

$$
r'(t_M)^2\le r'(t_0)^2-\frac{C_0}{2}M^{1-p}
<1-4<0,
$$

an impossibility. Thus $r(T)<M$ throughout every strict-subfield future. The argument permits arbitrary earlier radial turns and never assumes that radius increases globally.

## Positive torque supplies a finite lifetime

Once $T>M+r_0$, no negative-time source remains: if $S\le0$, the preceding old-history inequality would imply $T\le M+r_0+(1-b_0)S\le M+r_0$. Hence the complete causal interval then lies in generated history, with $h\ge h_0$ and $h_0<r<M$. The half-plane angle lies in $(0,\pi/2)$ and satisfies

$$
\Delta\theta=\int_S^T\frac{h(u)}{r(u)^2}\,du\ge\frac{h_0R}{M^2}.
$$

The exact torque identity, $D<2$, $R\le2M$, $r(T),r(S)>h_0$ and $\sin x\ge2x/\pi$ give

$$
h'(T)\ge\kappa_0:=\frac{(2M)^{-p}h_0^3}{\pi M^2}>0.
$$

But $h(T)<r(T)<M$ while speed remains subfield. Thus the strict-domain lifespan is bounded by

$$
T_*\le M+r_0+\frac{M}{\kappa_0}<\infty.
$$

Contact is excluded by $r\ge h_0$. Bounded speed and position exclude finite escape. Root range satisfies $R\ge r\ge h_0$, so sampled sources remain a fixed positive time before the endpoint. Their complete old and generated history is uniformly strict on the sampled compact set, giving a positive transmitter floor and bounded regular source input. If receiving speed also had a strict endpoint margin, ordinary continuation would extend the solution. Therefore its finite first boundary is unit speed at positive separation, at least $2h_0$.

This endpoint does not assert a transmitter fold or divergent acceleration. No sign of the unit-speed derivative is proved here. The ordinary chart's outgoing continuation remains separate. The same argument applies to every fixed $0<p<1$ in the stated positive-rotation history class, with constants degenerating as $p\uparrow1$ or $b_0\uparrow1$; it is not an exponent-uniform theorem.

Falsifiers are a failure of the acute complete-chord geometry, incorrect treatment of a negative-time source in the record bound, an attempted first record without the upper-half concavity contradiction, loss of the exact positive torque or a finite non-unit endpoint with all stated continuation margins. A numerical unit event is unnecessary to establish this theorem. No executable instrument was used.
