# Continuous residual of the comparison used to locate the next event

## Purpose and claim boundary

The [numerical comparison](smooth-two-particle-next-event-evolution.md) supplies polynomial curves for 1502 receiver identities on $[5,11/2]$, using the frozen incoming comparison histories through $5$. This analysis bounds their mismatch with the acceleration equation between saved nodes. It does not, by itself, bound their distance from an actual solution. The latter requires propagation of the inherited position, velocity and source-history errors, together with a continuation argument.

The equation tested here contains every cross contribution, the supplied negative-time pulses and the infinite stationary complement. It excludes positive own-history roots. This is the unchanged Master Equation only while the actual solution remains before its first global speed-one event, when such roots are absent. Beyond a comparison curve's speed-one candidate, the curve is an auxiliary cross-row reference, not a claimed full-law solution. Its later values may support a stopped comparison proving that an actual first event must occur earlier.

The [history audit](smooth-two-particle-next-event-history.md) separately checks the finite receiver census and source-row coverage. The stationary coefficient reference and the signed derivative calculations receive [independent assessment](smooth-two-particle-next-event-independent-adjudication.md).

## 1. Exact meaning of the curves

Each stored binary64 position, velocity and acceleration is treated as an exact dyadic number defining a quintic Hermite polynomial on its grid cell. Adjacent cells match these three data, so the resulting curve is $C^2$, even though its jerk may jump at a grid boundary. The receiver suffix starts at absolute time $5$ with the same saved endpoint data as the earlier archive. The incoming source curves retain their original absolute-time domain and exact-zero prefixes.

The instrument evaluates Hermite coefficients with outward interval arithmetic as needed. It includes every grid cell intersecting a query interval. It does not extrapolate a source after $5$, and it does not set the nonzero receiver state at the start of the suffix to zero. Known cubic curves with a nonzero absolute start check this distinction.

For broad initial source-time intervals, a point evaluation and a previously certified numerical source-speed bound give a cheaper position enclosure. If $m$ is the chosen midpoint and $V_j$ bounds the speed of the source comparison on its complete retained prefix, then

$$
\widetilde y_j(s)\in\widetilde y_j(m)+[-V_j,V_j]^3(s-m).
\tag{1}
$$

This enclosure is used only to contract root intervals. After contraction, interval evaluation of the actual piecewise polynomials supplies source position, velocity and acceleration. Formula (1) concerns the numerical source curve; its separate error relative to the actual source history belongs to the later trajectory comparison.

## 2. Stationary field without a finite-lattice replacement

Let $T$ be the already established stationary cubic vector polynomial. The unchanged infinite stationary field has the representation

$$
S_0(y)=aT(y)-\nabla\sum_{l=6,8,10,12,14}\Phi_l^{(24)}(y)+\mathcal R(y).
\tag{2}
$$

Here $a$ is the accepted full cubic coefficient and $\Phi_l^{(24)}$ is the homogeneous degree-$l$ term of the potential from sites with $0<|n|_\infty\le24$. The finite coefficient intervals were independently computed from Legendre coefficients and exact integer shell moments, separately from the numerical constructor's binomial expansion. Equation (2) restores the original infinite field with a quantified remainder; it does not replace the physical population by the displayed finite cube. Expressing the complete retained field as a polynomial preserves the exact cancellation of its constant and linear parts in the derivative bounds.

For $r=|y|<1$, define $q=r^2/4$ and $F(q)=16/(1-q)+2q/(1-q)^2$. The 26 sites of the nearest cube have squared radii $m=1,2,3$ with respective multiplicities $c_m=6,12,8$. An absolute shell bound gives the conservative acceleration remainder

$$
\begin{aligned}
16|\mathcal R(y)|\le16\bigg[
&\sum_{k=5,7,9,11,13}(k+1)r^k
\left(\frac{24}{k-1}24^{1-k}+\frac2{k+1}24^{-k-1}\right)\\
&+r^{15}\left\{\sum_{m=1}^3c_m m^{-17/2}F(r^2/m)
+\left(\frac{24}{14}+\frac2{16}\right)F(q)\right\}
\bigg].
\end{aligned}
\tag{3}
$$

The first line covers coefficients outside cube 24 at the retained degrees. The second covers all higher degrees, explicitly retaining the nearest 26 sites and bounding the remaining sources with radius at least two. Cubic and finite coefficient uncertainties enter the interval evaluation of (2) directly, and are not added again to (3). The calculation retains the preceding broad accepted interval $14.3016\le a\le14.3271$; a sharper independent coefficient interval is available but is not needed to define this residual.

## 3. Cancel the unchanged contribution before bounding

For one generated source correction, write $R_0=i+\widetilde y_i-j$, $U=\widetilde y_j(s)$, $R=R_0-U$, $r=|R|$, $r_0=|R_0|$, $n=R/r$, $v=\widetilde y_j'(s)$, $a_s=\widetilde y_j''(s)$ and $D=1-n\cdot v$. The causal equation is $s+r=t$. The acceleration kernel with its stationary reference removed is

$$
C=\frac{R}{r^3D}-\frac{R_0}{r_0^3}.
\tag{4}
$$

Direct subtraction of two interval expressions for (4) loses their common dependence on the receiver. The equivalent expression

$$
\begin{aligned}
C&=-\frac{U}{r^3}+R_0d_3+\frac{R}{r^3}\frac{n\cdot v}{D},\\
d_p&=\frac{(r_0-r)\sum_{j=0}^{p-1}r_0^{p-1-j}r^j}{r^p r_0^p},\\
r_0-r&=\frac{2R_0\cdot U-|U|^2}{r_0+r}
\end{aligned}
\tag{5}
$$

retains the cancellation explicitly. Every term vanishes for an unchanged stationary source, even when the receiver occupies an interval of possible positions. This is an algebraic reorganization of the same row.

Let $H(R)=(I-3nn^{\mathsf T})/r^3$ and let $J_C$ denote the similarly factored derivative of (4) with respect to receiver position, including the causal shift of emission time. The time derivative along the receiver curve is

$$
\begin{aligned}
\frac{dC}{dt}&=J_C\,\widetilde y_i'(t)+E,\\
E&=-\frac{H(R)v}{D^2}
-\frac{n\bigl(|v|^2-(n\cdot v)^2\bigr)}{r^3D^3}
+\frac{n(n\cdot a_s)}{r^2D^3}.
\end{aligned}
\tag{6}
$$

The explicit-time part follows from $ds/dt=1/D$ at fixed receiver position. It samples source acceleration as well as source velocity. The complete derivative, including $J_C$, has been independently checked against the direct causal differentiation. No receiver-side playback factor is introduced as a multiplier of the acceleration itself.

## 4. A continuous defect enclosure

Let $F_{\mathrm{tr}}(t,\widetilde y_i(t))$ denote the cross-row acceleration expression with fixed incoming comparison histories and the retained stationary polynomial in (2), excluding its remainder $\mathcal R$. On a reception cell $[b,c]$ with midpoint $m$, the truncated defect is $d_i(t)=\widetilde y_i''(t)-F_{\mathrm{tr}}(t,\widetilde y_i(t))$. A midpoint value and an interval bound on its first derivative give

$$
d_i([b,c])\subset d_i(m)+
\left[\widetilde y_i'''-\frac{dF_{\mathrm{tr}}}{dt}\right]_{[b,c]}
\left[-\frac{c-b}{2},\frac{c-b}{2}\right].
\tag{7}
$$

The instrument takes an outward Euclidean norm of (7) and then adds the whole-cell stationary remainder bound (3). This bounds the full acceleration defect without requiring a derivative bound for $\mathcal R$. Every Hermite cell intersecting $[b,c]$ contributes to the derivative enclosure, including both sides of any jerk jump. The fundamental theorem for the continuous piecewise differentiable truncated defect justifies (7); a fictitious globally continuous jerk is not assumed.

Signed polarity factors and every addition are enclosed outward. Supplied old-pulse corrections are evaluated separately for all receiver/center pairs except the same persistent identity. Generated corrections exclude the same identity by their edge census. The instrument retains per-receiver bounds on each reception cell, rather than replacing all paths by the largest residual of the population.

## Development evidence and limits

The root instruments are the residual.py, residual_factored.py and residual_polynomial.py files under .tmp/mec-008-next-event/root/. Their evidence owner is .local-data/master-equation-closure/next-event/residual/. The first two retain an exact near-26 field in their stationary representation, with a far polynomial and its remainder; the last uses (2)–(3) to improve interval cancellation. All earlier versions and receipts remain preserved. Known controls ran before each target calculation: exact polynomial values and derivatives at a nonzero absolute start, a quartic potential gradient, independently differentiated 60-digit finite-neighbor fields, exact unchanged-source cancellation on a wide receiver box, an analytic constant-velocity source, an independently differentiated curved-source causal row, and 70-digit checks of the added near-shell geometric tails.

The independent reference also verifies that every fixed rational constant supplied to the inherited interval converter encloses its exact rational value. This check is specific to the six tail constants and two cubic endpoints actually used here; it is not a claim that the converter safely accepts arbitrary large integer numerators and denominators.

The initial reception cell of width $1/32$ gave a population residual bound below $0.298605$ using direct row differentiation and below $0.084545$ after the exact cancellation, measured by the two outward interval instruments. Both are bounds for the same comparison, with different arithmetic sharpness; their agreement is not an independent trajectory validation. The completed residual and subsequent comparison receipts determine the accepted event scope.

The completed full-polynomial instrument bounds all 32 reception cells of width $1/64$ from $5$ through $11/2$, with the largest per-path acceleration residual below $0.666199$. The bound is strongly time dependent: the cell ending at $161/32$ is below $0.002202$, while the final cell carries the maximum. The stopped trajectory comparison therefore uses the individual path and cell bounds in residual-polynomial.json. It does not substitute that last maximum over the entire interval. The supervised calculation completed in 568.605 seconds with exit code zero and its process group closed; these are operational measurements, separate from scientific acceptance.

Byte copies of all three root instruments, known-case receipts, pilot results, the full residual table and a SHA-256 manifest are retained under .local-data/master-equation-closure/next-event/residual/. The accompanying reproduction.json maps each retained instrument to its original scratch path, records immutable input hashes and supplies the known-first launch commands. Retained instrument copies preserve their original import and repository-root assumptions; restore them to those recorded paths before reproduction.

The additional residual_grid.py instrument refines only $[43/8,11/2]$ into 16 cells of width $1/128$. Its known-first partition controls and independent review establish exact dyadic endpoints, midpoints and halfwidths for this invocation. It retains the same complete row sum, source histories, polynomial curves and stationary remainder. The completed maximum is below $0.182766$, with 204.457 seconds of supervised wall time, exit zero and a closed process group. This receipt is reserve evidence: the event comparison already closes with the original 32-cell table, and does not use the refined late residual. No generic non-dyadic-grid enclosure claim is made for this driver. Its byte copy, controls and result are included in the same retained manifest.

A missing source row, a source-time query outside the retained domain, an incorrect polynomial join, an inward-rounded arithmetic operation, an invalid coefficient interval, or an omitted stationary remainder would invalidate the claimed residual enclosure. A large but valid enclosure instead indicates insufficient sharpness. Neither a small residual alone nor a comparison speed crossing establishes an actual maximum or a full-law continuation beyond an own-history event.
