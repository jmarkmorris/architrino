# Other polarity orders on the fixed orthogonal-plane ring weave

## Finding and scope

All twenty globally neutral six-member polarity words fail the full acceleration-balance requirement on the two inherited speed brackets T02 and T04. Ten words represent their global-conjugacy classes; one is the previously excluded alternating-pair order and nine are new orders. Every new class has an outward-rounded nonzero transverse acceleration at reception phase zero, so no positive common radius can repair it anywhere in either declared speed bracket. The full six-receiver acceleration vectors and comparison-radius residuals are retained, rather than inferring failure from a single binary or a planar sum.

This is a bounded result on two narrow speed boxes for the fixed equal-radius, common-frequency, phase-compensated orthogonal-plane geometry. It does not exclude the nine new orders at other speeds, different relative phases, unequal radii, displaced centers, breathing, precession or general three-dimensional histories. No configuration is admitted as an equilibrium and no stability calculation is performed.

Claim grade: derived polarity conjugacy and geometric reduction, computer-assisted derived nonzero residuals on the two boxes, and measured rounded diagnostic centers. Independent Cartesian adjudication of the new screen is pending. Falsifier: an omitted causal root, an invalid lobe census, an incorrect signed contribution, or a directed-rounding recomputation putting zero in the declared witness interval overturns the corresponding rejection. A balance at another speed or geometry lies outside this result.

## Exact geometry, phases and polarity enumeration

Let $Q(x,y,z)=(z,x,y)$, $d_0(\theta)=(0,\cos\theta,\sin\theta)$ and $\phi_a=2\pi a/3$ for $a=0,1,2$. The exact phase-compensated frames are

$$
U_a=Q^a(0,\cos\phi_a,-\sin\phi_a),\qquad V_a=Q^a(0,\sin\phi_a,\cos\phi_a).
$$

The six prescribed histories are

$$
X_{a,e}(T)=eR[U_a\cos(\Omega T+\phi_a)+V_a\sin(\Omega T+\phi_a)]=eR Q^a d_0(\Omega T),\qquad e=\pm1.
$$

They occupy the $yz$, $xz$ and $xy$ planes with equal $R$, equal positive $\Omega$, one common center, geometric antipodal partners and the declared phases $0,2\pi/3,4\pi/3$. The compensation is part of the inherited geometry; omitting it would produce a different history. At phase zero the three positive geometric endpoints are respectively $(0,R,0)$, $(0,0,R)$ and $(R,0,0)$. Their endpoint signs specify paths and are distinct from polarity signs.

Member order is $(a1+,a1-,a2+,a2-,a3+,a3-)$. Globally neutral polarity words have three positive and three negative entries, giving $\binom63=20$ possibilities. Every acceleration coefficient depends on $q_iq_j$, so global conjugation leaves it unchanged. Fixing $q_0=+1$ gives ten representatives. Four classes have opposite polarities within every geometric pair; one is the old $+-+-+-$ order and three are new. The other six classes have a same-polarity geometric pair and its compensating opposite pair while remaining globally neutral.

The unchanged Master Equation, $K=c_f=1$, includes every positive-delay self root. There is no cap, response multiplier, root exclusion or event prescription. Primitive mass, imported magnetic laws and standard-physics conservation assumptions are absent.

## Consumed prior exclusion

The [old complete-cycle diagnostic](../evidence/2026-08-29-orthogonal-plane-weave-complete-cycle.md), [fold-separated ordinary certificate](../evidence/2026-08-29-orthogonal-plane-weave-fold-separated-interval.md) and [fold-limiting extension](../evidence/2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.md) already exclude the single $+-+-+-$ order throughout its declared $0.25\leq\beta\leq12$ fixed relative-phase locus. This note consumes that result rather than redoing its interval theorem. The old word is retained in the local two-box screen only to identify scope and compare arithmetic. Its whole-interval conclusion is not transferred to another polarity order.

The new [ring_orthogonal_polarity_screen_20261003.py](../../../../../scripts/braid-program/ring_orthogonal_polarity_screen_20261003.py) reuses the frozen [trigonometric-lobe oracle](../../../../../scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_interval_oracle.py), with an enforced source hash, for scalar root proposals and inherited lobe uniqueness. It does not modify that oracle, the old JavaScript evaluator, their protocols or receipts. Reusing this oracle is not independent evidence for the new polarity-weighted Cartesian acceleration sums.

## Complete phase-zero root census

Use unit-radius root geometry, $\beta=\Omega R$, normalized delay $\delta=\Delta/R$ and $x=\beta\delta$. Any retained hit has $0<\delta\leq2$ because every source and receiver lies on the same radius-one sphere. The coincident self endpoint is excluded, while every positive-delay self hit remains.

At phase zero, the circular self and partner equations and the two variable cross equations are

$$
H_s=2-2\cos x-x^2/\beta^2,\quad H_p=2+2\cos x-x^2/\beta^2,\quad H_+=2+2\sin x-x^2/\beta^2,\quad H_-=2-2\sin x-x^2/\beta^2.
$$

For receiver pair $a$, the cyclic-next transmitter pair has two fixed-delay hits $\delta=\sqrt2$ with $D=1$. The cyclic-previous transmitter pair contributes $H_+$ or $H_-$ according to the product of its geometric endpoint signs with the receiver's. Polarity does not enter these causal equations. The inherited lobe theorem gives every first-lobe root and every later pair above its minimum. The new instrument checks that each entire speed bracket lies strictly above or below every relevant fold, certifies all retained root-tube endpoint signs and fixed $H_x$ signs, and rejects any root reaching a zero divisor. Its scalar divisor is $D=-\beta^2H_x/(2x)$.

| Speed box | Self roots | Partner roots | $H_+$ roots | $H_-$ roots | Fixed cross roots | Hits per receiver | Directed hits | Diagnostic minimum $|D|$ |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| T02, $\beta\approx1.82643096465468$ | 1 | 1 | 1 | 1 | 2 | 6 | 36 | 1 |
| T04, $\beta\approx2.97430717611729$ | 1 | 3 | 1 | 3 | 2 | 10 | 60 | 0.1168060287363 |

The T02 and T04 speed and comparison-radius bounds are consumed from their frozen six-member reference receipts via exact binary interval endpoints. Printed centers do not replace their uncertainty. The new screen uses 100-decimal point arithmetic and 85-decimal outward-rounded interval arithmetic. Every directed row independently reconstructs its source position and velocity, checks the Cartesian causal residual encloses zero and checks its geometric $D$ agrees with the scalar $-\beta^2H_x/(2x)$ formula while both keep a nonzero sign. Every new word uses the same complete geometry-dependent root inventory, with new polarity products in the full sum.

## Full residual and radius-independent witness

At each admitted ordinary root, define $n=(X_i-X_j(S))/\delta$ and source velocity $v_j(S)$ in unit-radius geometry. The unsigned row is

$$
B_{ijr}=\frac{n_{ijr}}{\delta_{ijr}^2|1-n_{ijr}\cdot v_j(S)|},\qquad A_i=\sum_{j,r}q_iq_j B_{ijr}.
$$

For a general positive physical radius, the scaled full residual is $A_i+\beta^2R\widehat X_i$, where $\widehat X_i$ is the unit-radius path. Its tangent and plane-normal components equal those of $A_i$ because the prescribed circular acceleration is radial. Therefore a strictly nonzero transverse component at even one receiver and one phase rejects all positive radii at that speed. The instrument nevertheless evaluates all six acceleration vectors, radial/tangential/normal projections and full residual vectors at the inherited planar-ring comparison radius. It does not replace the full mutual residual with individual-pair balance.

The table displays centers of representative containing intervals; the authoritative outward-rounded intervals are in the receipts. Receiver indices are zero based in the declared member order. Every displayed component has a fixed sign throughout its speed box.

| Representative polarity word | T02 witness, receiver and component | T04 witness, receiver and component | Scope |
| --- | --- | --- | --- |
| $+++---$ | $+1.63021757660009$, receiver 1 normal | $-1.63883087777440$, receiver 0 normal | new |
| $++-+--$ | $-1.63021757660009$, receiver 0 normal | $+1.63883087777440$, receiver 1 normal | new |
| $++--+-$ | $-1.63021757660009$, receiver 2 normal | $+1.63883087777440$, receiver 3 normal | new |
| $++---+$ | $+1.63021757660009$, receiver 3 normal | $-1.63883087777440$, receiver 2 normal | new |
| $+-++--$ | $-1.63021757660009$, receiver 4 normal | $+1.63883087777440$, receiver 5 normal | new |
| $+-+-+-$ | $+0.838704995348492$, receiver 0 tangent | $+1.28892827360994$, receiver 1 normal | prior excluded order |
| $+-+--+$ | $+1.39909141849576$, receiver 0 normal | $-1.66246883472698$, receiver 4 tangent | new |
| $+--++-$ | $-1.39909141849576$, receiver 0 normal | $-1.66246883472698$, receiver 0 tangent | new |
| $+--+-+$ | $-1.39909141849576$, receiver 4 normal | $-1.66246883472698$, receiver 4 tangent | new |
| $+---++$ | $+1.63021757660009$, receiver 5 normal | $-1.63883087777440$, receiver 4 normal | new |

Outward margins exceed $1.39909$ for all nine new classes on T02 and $1.63883$ on T04. These deliberately rounded-down lower bounds come from the retained witness intervals, not their printed centers. No speed or phase grid is being promoted into a continuum claim: the directed arithmetic encloses the whole two inherited speed brackets, while failure at phase zero is logically sufficient to disprove a complete periodic balance there.

## Controls, validation and next work

The new instrument first passes the analytic static-source acceleration $(1/4,0,0)$ at distance two, the moving self-root control $\beta=\pi/2,x=\pi,D=1$, and the fixed orthogonal delay $\sqrt2,D=1$. It checks all ten enumerated representative words are neutral and distinct under the fixed first sign. Geometry controls verify unit radius, tangent velocity, exact antipodes and the equivalence of phase-compensated frames to the explicit cyclic coordinates before any target. Current-hash known and control receipts are mandatory gates.

An initial owned run completed both boxes in 0.6 wall seconds, exit zero and closed process group. The new instrument was then strengthened with direct Cartesian causal and divisor identity checks; all analytical controls were rerun before the final target stage, which completed in under one second by the watched foreground command. The two final receipts are `T02-screen.json` and `T04-screen.json` under `.local-data/ring-exploration/orthogonal-polarities/`; they retain every directed ordinary root, full six-receiver sum, residual and polarity witness. The frozen lobe oracle and previous evidence remained unchanged.

1. Independently adjudicate the new Cartesian contribution and polarity sum on both boxes; recommendation: reconstruct positions, causal roots and signed products without importing this screen.
2. If this fixed geometry remains worth pursuing, extend the nine new orders over a declared speed continuum with fold treatment; recommendation: do not infer their whole-interval exclusion from the old order's theorem.
3. Consider genuinely different relative phases or geometry only with new complete-root charts; recommendation: require full residual balance before any perturbation or stability calculation.
