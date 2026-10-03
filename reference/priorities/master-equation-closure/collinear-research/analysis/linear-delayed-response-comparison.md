# A linear attraction repeats without delay but grows with the tested delayed response

> **Quarantined special examination — inactive.** The instantaneous and delayed strict-speed cases both contain the added quadratic receiver multiplier. Their comparison, measured growth and proposed small-amplitude follow-up belong only to those specified equations; they are not active or default collinear assumptions. The ordinary instantaneous oscillator is a separate mathematical control and contains no such factor. Original equations, evidence and reproduction instructions remain preserved; extending or reusing the factor-bearing cases requires explicit operator re-selection for a named scenario. See the [collinear quarantine disposition](../README.md#quarantined-quadratic-response-examinations).

**Instruction mismatch confirmed and repaired, 2026-10-02.** The accepted recommendation was to compare a purely linear delayed response with the ordinary instantaneous oscillator. The shared receiver factor was introduced by the agent afterward; it was not selected for that comparison. The preserved calculations below therefore did not complete the accepted task. The [corrected multiplier-free comparison](multiplier-free-linear-delayed-comparison.md) now supplies the intended equations, independently checked bounded passage/turn/return measurements and the changed causal-root regime. Its first two crossing speeds are 0.457136 and 0.787762, rather than the historical 0.432764 and 0.666169. The later all-root candidate crosses above wake speed, so the historical third speed and modified invariant cannot be reused. The [repair synthesis](shim-repair-and-geometry-reassessment.md) distinguishes changed conclusions from geometry advances.

The bounded numerical comparison finds three increasingly fast passages and two increasingly distant turns under the delayed linear response. With the same release and the same strict-speed factor, the instantaneous response repeats at its original amplitude. This separates regular passage from recurrence: making acceleration finite everywhere does not restore the balance of an instantaneous oscillator.

This is a comparison of specified equations, not an adoption of a spring law for architrinos. The instantaneous conclusions below are derived. The delayed trajectory is measured by the exploratory [comparison instrument](../../../../../scripts/collinear-research/linear-response-comparison.py), with analytical controls and three time steps; it has no independent full-trajectory validation. The bounded result does not prove indefinite growth, escape or the impossibility of a different breather.

## Preparation and the three equations

Two opposite-polarity members start at positions $+a$ and $-a$, where $a=0.5$, and at rest. Their positions are held constant throughout the earlier history, then released at $T=0$. The held history is a preparation, not an equilibrium of the released equation. Reflection symmetry gives positions $x(T)$ and $-x(T)$; $v=\dot x$ is the signed velocity of the member initially on the right. Wake speed is $c_f=1$.

Set $k=0.2862286103053385$, the coefficient relating acceleration to distance. This numerical value matches the original inverse-square release acceleration at initial separation one. It does not match the release acceleration of every softened-length experiment. A linear coefficient and an inverse-square coefficient have different dimensions; their equal normalized numerical values supply a comparison convention, not a physical derivation.

| Case | Equation for the initially right-hand member | Meaning |
| --- | --- | --- |
| Ordinary instantaneous oscillator | $\dot v=-2kx$ | Respond to the partner's current position; no speed restriction imposed |
| Instantaneous, strictly below wake speed | $\dot v=-(1-v^2)2kx$ | Same current-position attraction, with the previously proposed receiver-speed factor |
| Delayed, strictly below wake speed | $\dot v=-(1-v^2)kd/D$ | Respond to the partner's past position with the same arrival weighting used in the earlier experiments |

For the delayed case, the emission time $S$ and the signed distance $d$ from the emitting partner to the receiver satisfy

$$
T-S=|d|,\qquad d=x(T)+x(S),\qquad
D=1+\operatorname{sgn}(d)v(S).
$$

The plus sign in $d$ occurs because the partner is at $-x(S)$. The factor $D$ accounts for the partner's motion when it emitted the arriving wake. On approach, the earlier partner moves toward the receiver, so $D<1$ and division by $D$ increases the response. After passage, the source history and direction determine a different weight. The factor $1-v^2$ reduces the receiver's response near wake speed. These are separate choices: only the latter enforces the proposed strict-speed response.

The signed numerator is linear in distance, $-kd$, at every separation. The complete delayed equation is not linear: emission time and the two speed factors depend on the motion. Equivalently, on a separated single-arrival segment, differentiating the received scalar $kd^2/2$ with respect to receiver position gives $kd/D$. Thus the equation uses a spatial slope, not the raw scalar value.

At coincidence, define the partner acceleration by its continuous limit, zero, while the speeds stay bounded away from one. There is no assigned reversal, velocity reset or waiting interval. Strictly subfield histories have no earlier self-arrival; the zero-time diagonal is not an additional self interaction. The numerical variable $z=\operatorname{artanh}v$ gives $v=\tanh z$ and

$$
\dot x=\tanh z,\qquad \dot z=-kd/D.
$$

Finite $z$ implies strictly subfield speed. The instrument stops if its declared numerical speed or source-denominator margins fail; successful bounded integration is not a proof that these margins hold forever.

## What repeats without delay

For the ordinary oscillator the exact solution is $x=a\cos(\sqrt{2k}T)$. Every crossing has speed $a\sqrt{2k}=0.378304514$, and every turn is at distance $a=0.5$ from the midpoint.

The strict-speed instantaneous equation has the derived constant

$$
H(x,v)=-\frac12\log(1-v^2)+kx^2=\log\cosh z+kx^2.
$$

Indeed, differentiating gives $\dot H=v\dot v/(1-v^2)+2kxv=0$. At release $H=ka^2$. At a turn $v=0$, so $|x|=a$; at a crossing $x=0$, so

$$
|v|=\sqrt{1-\exp(-2ka^2)}=0.365164346.
$$

The travel-time integral between turns is finite, and the autonomous equation retraces this closed position-velocity curve repeatedly. The speed factor changes the speed and timing but does not generate increasing excursions. Here $H$ is a mathematical invariant of the chosen equation; no primitive mass or mechanical-energy interpretation is assumed.

## Measured crossings and turns

Distances below are the distance of either member from the midpoint; pair separation is twice that distance. The first turn follows the first passage. The second crossing is passage back through the midpoint; the second turn follows that return passage.

| Equation | First crossing speed | First turn distance | Second crossing speed | Second turn distance | Third crossing speed |
| --- | --- | --- | --- | --- | --- |
| Ordinary instantaneous, exact | 0.378305 | 0.500000 | 0.378305 | 0.500000 | 0.378305 |
| Instantaneous strict speed, exact | 0.365164 | 0.500000 | 0.365164 | 0.500000 | 0.365164 |
| Delayed strict speed, measured | 0.432764 | 0.831831 | 0.666169 | 1.639889 | 0.937309 |

The finest delayed run, through $T=16$, places the crossings at approximately $1.984851$, $7.132067$ and $13.611723$, and the turns at $4.842802$ and $10.663925$. Passage has zero limiting acceleration, then outgoing braking begins immediately. Braking still produces a turn, but the next inward leg reaches coincidence faster. No repeated cycle has been obtained.

The delayed and strict-speed instantaneous rows change delay and its source-motion weighting together. They show that this combination can produce growth even with a globally linear numerator. They do not separately identify delay or the weighting as the sole cause. Unlike the earlier softened response, the linear attraction grows at large separation rather than falling away; the growing turns therefore cannot be attributed solely to the weakened distant attraction of that earlier model.

## The exact balance that delay changes

Apply the instantaneous quantity $H$ to the delayed equation. Direct differentiation now gives

$$
\dot H=kv\left(2x-\frac{d}{D}\right).
$$

The difference in parentheses is the current-separation restoring term minus the actual delayed, weighted term. There is no identity making it zero. Over any interval,

$$
H(T_2)-H(T_1)=k\int_{T_1}^{T_2}v(T)\left(2x(T)-\frac{d(T)}{D(T)}\right)dT.
$$

This identity is exact for the specified equation. It does not have a globally established sign. At successive crossings in the finest numerical run, the measured values of $H$ are approximately $0.103687$, $0.293296$ and $1.054118$, compared with $0.071557$ at release. At the two turns they are $0.198054$ and $0.769736$. These values are calculated from the measured event states, not an independently evaluated integral or a conserved total including wakes.

The ordinary spring argument therefore fails at a precise step: the actual delayed acceleration no longer cancels the change of the current-position term $kx^2$. This diagnoses the tested equation without claiming an error in the acceleration code or importing a conservation law from ordinary mechanics. Whether a different response or an explicit source/wake account supplies a suitable balance remains unresolved.

## Numerical controls, reproduction and limitations

The exploratory instrument uses explicit midpoint steps, interpolation of stored position and transformed velocity, and a bracketed solution of the arrival equation. Before target use it passed the exact instantaneous invariant and crossing-speed controls and a stationary-source quadrature control for the first half unit of time. The latter follows from $1-u^2=\exp\{k[(x+a)^2-(2a)^2]\}$ while the arriving emission still belongs to the held past. The recorded errors were $2.13\times10^{-10}$ in the invariant, $2.09\times10^{-8}$ in crossing speed and $3.39\times10^{-9}$ in the held-source position. Event interpolation also passed a known linear crossing.

| Delayed time step | First crossing speed | First turn distance | Second crossing speed | Second turn distance | Third crossing speed |
| --- | --- | --- | --- | --- | --- |
| 1/1024 | 0.432764276 | 0.831830685 | 0.666168760 | 1.639888649 | 0.937308261 |
| 1/2048 | 0.432764334 | 0.831830801 | 0.666168774 | 1.639888681 | 0.937308760 |
| 1/4096 | 0.432764334 | 0.831830793 | 0.666168802 | 1.639888809 | 0.937308843 |

Refinement supports the quoted six-decimal event values and the qualitative growth, but is not an independent correctness proof or a rigorous error enclosure. The finest run's largest sampled speed is about $0.937309$; its smallest sampled $D$ is about $0.062697$. These are sampled margins, not certified continuous bounds. The separate instantaneous numerical run agrees with its exact predictions to the errors recorded by its controls.

Reproduce from the repository root using the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-response-comparison.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-response-comparison.py --end 16
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-response-comparison.py --delayed --end 16
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-response-comparison.py --delayed --h 0.00048828125 --end 16
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-response-comparison.py --delayed --h 0.000244140625 --end 16
```

Receipts and histories are retained under `.local-data/collinear-research/linear-response/`. This instrument changes no production EOM path. An independent computation contradicting the event sequence would overturn the measured conclusion. A later bounded state would defeat an extrapolation to indefinite growth, which is not claimed here. The next recommended diagnostic is an analytical small-amplitude cycle balance for this exact delayed equation, to determine whether the observed growth is already systematic near the zero-separation equilibrium. Any small-amplitude approximation must carry its order and domain; it cannot stand in for a global impossibility theorem.
