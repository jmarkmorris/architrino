# SURFACE-005 independent reference for the six-pole replay

**Frozen before subject inspection, October 29, 2026.** This reference derives display geometry, units and evidence boundaries from the accepted six-pole scenario and elementary differentiation. The reviewer has not inspected the new Surface adapter or conversion implementation. Root owns implementation and integration; this reference owns no new evolution or scientific acceptance. The source account is the [six-pole manuscript](../../master-equation-closure/noether-sea-research/manuscript.md#53-antipodal-reception-and-changing-normal-support) and its [post-turn recomputation](../../master-equation-closure/noether-sea-research/analysis/spherical-six-pole-post-turn-claude-synthesis.md#f4-the-rebuild-with-a-signed-serializer-and-the-path-turn-re-certified-on-the-sound-chain-derived-from-measured-enclosures-independently-adjudicated).

## Geometry and the five partners

Let $e_0,e_1,e_2$ be the coordinate unit vectors, with indices read cyclically. The positive-polarity member initially at $+Re_i$ follows

$$
n_i(q)=e_i\cos q-\frac{e_{i+1}+e_{i+2}}{\sqrt2}\sin q,\qquad u_i(q)=\frac{dn_i}{dq}=-e_i\sin q-\frac{e_{i+1}+e_{i+2}}{\sqrt2}\cos q.
$$

The opposite-polarity member has $n_{i+3}=-n_i$ and $u_{i+3}=-u_i$. Position is $X_i=Rn_i$. Direct inner products give $n_i\cdot n_i=u_i\cdot u_i=1$, $n_i\cdot u_i=0$ and $du_i/dq=-n_i$. Thus all six positions lie on the selected sphere, each tangent is unit length, and each antipodal pair remains opposite. This is a symmetric six-path motion, not a rigidly rotating octahedron.

For a selected member there are two other same-polarity members, two non-antipodal opposite-polarity members and one opposite-polarity antipode. These are multiplicities **2/2/1**. The antipode is included among the three opposite-polarity partners; there is no third polarity. All five partners participate. Class sums labelled with these multiplicities must not be multiplied again.

## Time, velocity and acceleration

Use $R=10$, $c_f=1$, $K=1$, $g=1/10$, scaled time $t=T/10$, $w=dq/dt$ and $a=d^2q/dt^2$. For either polarity,

$$
\frac{dX_i}{dT}=wu_i,\qquad \frac{d^2X_i}{dT^2}=\frac{au_i-w^2n_i}{10}.
$$

The physical speed is $|w|$. Signed $w<0$ means return along the selected path, rather than a negative speed magnitude. A velocity interval spanning zero maps to an absolute-speed interval with lower endpoint zero; if it does not span zero, take the smaller and larger endpoint magnitudes. A tangent contribution has sign relative to increasing $q$. After $w$ becomes negative, a negative tangent contribution accelerates the return rather than braking it.

For the retained scaled canonical radial component $r=n\cdot A\,R/c_f^2$, the canonical acceleration and additional normal adjustment are

$$
A_i^{canonical}=\frac{au_i+rn_i}{10},\qquad l=-w^2-r,\qquad A_i^{support}=\frac{l n_i}{10}.
$$

They sum to the required constrained acceleration. Each retained class tangent and radial sum is separately divided by ten to obtain physical acceleration. The geometrical normal acceleration is $-w^2n_i/10$. The canonical radial interaction is discarded by the constrained evolution; the support account makes the equivalent normal adjustment visible. It is not an identified physical confinement mechanism. Scaled $l'=dl/dt$ becomes physical support rate $l'/100$.

## Independently known display cases

1. At $q=0$, positive members are exactly at $(10,0,0)$, $(0,10,0)$ and $(0,0,10)$, with the other members at their negatives. At rest $w=0$, all velocities are zero.
2. At $q=\pi/2$, the first positive member is $(0,-10/\sqrt2,-10/\sqrt2)$ and its tangent is $(-1,0,0)$. All normal/tangent identities remain exact.
3. For that member at $q=0,w=-1/5$, velocity is $(0,+1/(5\sqrt2),+1/(5\sqrt2))$. This independently exposes a sign-losing return-path display.
4. For $w=1/5,a=-1/10,r=3/100$, scaled support is $l=-7/100$, physical support is $-7n_i/1000$, and physical total normal acceleration is $-n_i/250$. Replacing support by $-r$, forgetting $w^2$, or forgetting the division by ten gives a different result.
5. The exact release state has $q=w=0$. The unweighted static geometry gives like-pair tangent $g/2$, unlike non-antipodal-pair tangent $g/2$ and antipodal tangent zero. Like-pair and unlike-pair radial terms cancel; the antipodal radial term is $-g/4$. Thus total scaled tangent acceleration is $g=1/10$, canonical radial is $-1/40$, and physical outward additional support is $+1/400$. These release values are a geometry control, not fabricated post-release observations.

## Source selection and uncertainty

The October 21 correction in manuscript section 5.13 suspends the sign-losing correlated slice-resume records and restores the event certificates only on the signed **cm49** recomputation. Use rebuilt R1–R6 for steps155–570 and P4–P6 for571–688, each with `affine_format: signed-v49`, certification flags, exact joins and recorded source hashes. Do not use the former cm44/cm47/cm48 post-resume records merely because their outer bounds look plausible. The pre-anchor box chain through154 and the separately admitted initial fixed-image window are distinct original inputs, unaffected by that serializer defect.

Preserve uncertain true step origins and endpoint times. `t_int` is a whole-step time span, not a point endpoint. A point-state record at an uncertain endpoint must retain its time interval. Its upper possible time is not guaranteed continuous coverage through that number. Likewise a missing endpoint class evaluation remains missing; it must not be replaced by a prior sample without labelling the sampled time.

A rendered midpoint path or interpolated animation is a display approximation, not a fresh solution, a new enclosure between observations, or a source for event times. Show exact retained interval diagnostics with their own sampled time, avoid extrapolation beyond the admitted coverage, and refuse gaps and unreviewed input generations. Never infer a zero, extremum or recurrence from a midpoint curve. Event labels must use the current re-certified account. Importing a reviewed playback does not authorize a new EOM evolution of this complete stationary-past preparation.

The late return path retains the existing qualification: the review's audit lacks an independently known negative-source-speed control; agreement on those later records is cross-code evidence on shared signed-law and history premises. The replay must not erase that limitation. This display review checks faithful consumption and mathematical transformations, not the original stored-rate premises or global physical behavior.

## Falsifiers and review scope

A non-antipodal partner mislabelled as the antipode, incorrect polarity count, extra multiplication by class multiplicity, wrong position/tangent sign, wrong physical scaling, sign-stripped resume input, uncovered time interval or a rendered event outside its source bracket rejects the corresponding display claim. Independently known cases above must run before source-derived targets. Root's one-time conversion and browser checks may support delivery; they do not establish free confinement, a repeat period, a physical support provider or a new scientific certificate.
