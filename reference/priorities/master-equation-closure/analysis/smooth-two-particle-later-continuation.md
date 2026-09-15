# Continuation through the next environmental returns

## Result and scope

For the same alternating cubic lattice, fixed complete supplied past, prescribed eight-source block sum, coupling $g=16$ and normalized wake speed $c_f=1$, the classical evolution continues through $T=2\ell$. Every cross channel has exactly one positive causal root, no positive self root occurs, and the original history-class bounds remain satisfied. By this time each target has received generated motion from 21 distinct environmental sources. The new families include its twelve face-diagonal neighbors and its outward axial neighbor.

Claim grade: **derived candidate, awaiting independent reconstruction**. This is a concrete continuation of the [accepted first-return theorem](smooth-two-particle-next-feedback-independent-adjudication.md), whose horizon is $21\ell/16$. The [accepted signed-error theorem](smooth-two-particle-signed-error-independent-adjudication.md) supplies the earlier separation reversal; it is not extended by the absolute-value estimates here. No new turning point, damping rate, repeated oscillation, asymptotic settling or self-consistent preparation is proved. The supplied past remains the input whose [unforced preparation fails](smooth-two-particle-preparation-independent-adjudication.md).

The continuation improves the bounds on received source histories by integrating the pulse contribution before taking its absolute bound. Merely extending the earlier uniform acceleration estimate would charge a short velocity pulse over the entire subsequent interval. The cancellation below retains the short support and its zero endpoint displacement.

## 1. Equation, known histories and pulse integrals

Write $t=T/\ell$, $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$, $i\in\mathbb Z^3$, $E=\{0,e_1\}$ and $\sigma_i=(-1)^{i_1+i_2+i_3}$. The two supplied target displacements are $p(u)e_3$, with emission time $s=-11/8+u$ and

$$
p(u)=-(1-8u)u^4(1-4u)^4,\qquad 0\le u\le1/4,
$$

and zero otherwise. All environmental supplied pasts are stationary. Let

$$
\alpha=\sqrt2-11/8,\qquad \beta=\alpha+1,
\qquad a_0=33/32.
$$

The stationary block field $\mathbf S_0$ is the accepted equilibrium field. On $\|\mathbf y\|\le B=1/128$ its accepted cubic estimate gives

$$
\|\mathbf S_0(\mathbf y)\|\le C\|\mathbf y\|^3,
\qquad \|D\mathbf S_0(\mathbf y)\|\le3C\|\mathbf y\|^2,
\qquad C=1400>\frac{1309}{(1-B)^5}.
$$

Every correction retains the [canonical transmitter-weighted acceleration](../../../../content/markdown/aaa/dynamics/master-equation.md). With $\mathbf K(\mathbf R)=\mathbf R/\|\mathbf R\|^3$, source displacement $\mathbf U(s)$ and velocity $\mathbf W(s)$, the correction is

$$
\mathbf Q(t,\mathbf y)=\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U(s))}{1-\mathbf n\cdot\mathbf W(s)}-\mathbf K(\mathbf k+\mathbf y),
\qquad t-s=\|\mathbf k+\mathbf y-\mathbf U(s)\|.
$$

The infinite stationary contribution is retained. These corrections change only finitely many received source rows on the stated interval. Receiver playback is not an extra acceleration multiplier.

Three exact pulse quantities are useful:

$$
A_p=\max|p|=\frac1{314928},\qquad
I_p=\int_0^{1/4}|p(u)|\,du=\frac1{2621440},\qquad
V_p=\int_0^{1/4}|p'(u)|\,du=4A_p.
$$

The amplitude follows from the accepted extrema at $u=1/12,1/6$. For the integral, set $f(u)=u(1-4u)$. Since $p=-(f^5)'/5$ and $f(1/8)=1/16$, each lobe has absolute integral $1/(5\cdot16^5)$; doubling gives $I_p$. The two lobes travel from zero to one extremum and back, giving total variation $4A_p$. The complete supplied pulse speed is at most $\nu=1/8192$.

## 2. An integrated old-pulse bound

An old-pulse row that is active after release has anchor distance at least $\sqrt2$. Under the displacement bounds used below its actual range and straight subtraction segment both exceed $7/5$. Put $k=5/7$, so $\|\mathbf K\|\le k^2$, $\|D\mathbf K\|\le2k^3$, and the derivative of a unit range vector has norm at most $k$.

Let a receiving path have speed at most $v<1$ and acceleration at most $A$. Along an old pulse use emission offset $u$ as the parameter, and set

$$
\begin{gathered}
\mathbf R_0=\mathbf k+\mathbf y(t(u)),\quad \mathbf R=\mathbf R_0-p(u)e_3,
\quad r_0=\|\mathbf R_0\|,\quad r=\|\mathbf R\|,\\
\delta=r_0-r,\qquad \mathbf F=\frac{\mathbf K(\mathbf R_0)}{1-\mathbf n\cdot\mathbf y'},
\qquad M=\frac{1+\nu}{1-v}.
\end{gathered}
$$

Then $0<dt/du\le M$, $|\delta|\le|p|$, and $\|\mathbf n_0-\mathbf n\|\le k|p|$. Differentiating the two ranges gives the exact identity

$$
n_3p'=\delta'-(\mathbf n_0-\mathbf n)\cdot\mathbf y'\,\frac{dt}{du}.
$$

Changing variables in the acceleration impulse cancels the transmitter denominator:

$$
\begin{aligned}
\int\mathbf Q\,dt
={}&\int\frac{\mathbf K(\mathbf R)-\mathbf K(\mathbf R_0)}{1-\mathbf n\cdot\mathbf y'}\,du
+[\mathbf F\delta]-\int\mathbf F'\delta\,du\\
&-\int\frac{\mathbf K(\mathbf R_0)(\mathbf n_0-\mathbf n)\cdot\mathbf y'(1-n_3p')}{(1-\mathbf n\cdot\mathbf y')^2}\,du.
\end{aligned}
$$

At entry, and whenever the old pulse has completely passed, $\delta=0$. At an intermediate time only the displayed endpoint term remains. All integrated terms are bounded by $I_p$, not by a support-independent acceleration maximum. Define

$$
\begin{aligned}
D_F(v,A)&=\frac{2k^3vM}{1-v}
+\frac{k^2}{(1-v)^2}\left[k(vM+\nu)v+AM\right],\\
E(v,A)&=D_F(v,A)+\frac{k^3v(1+\nu)}{(1-v)^2}.
\end{aligned}
$$

Here $D_F$ bounds $\|\mathbf F'\|$: $\|\mathbf R_0'\|\le vM$, $\|\mathbf n'\|\le k(vM+\nu)$ and $\|d\mathbf y'/du\|\le AM$. The last summand in $E$ bounds the final integral's coefficient. Thus one old row, through any future time, has impulse norm at most

$$
\frac{2k^3I_p+k^2|p(u(t))|}{1-v}+E(v,A)I_p.
\tag{1}
$$

Its contribution after a second integration through time $t$ has norm at most

$$
I_p\left[\frac{2k^3t+k^2M}{1-v}+E(v,A)t\right].
\tag{2}
$$

For the endpoint term in (2), $\int|p(u(t))|dt\le MI_p$. For the other terms, integrating their cumulative bound for a duration at most $t$ suffices. At most two old rows act on any receiver. Their polarity signs do not enlarge these norm bounds.

The simpler estimate needed once below is

$$
\int\|\mathbf Q\|dt\le\frac{L}{1-v},\qquad
L=2k^3I_p+k^2V_p.
\tag{3}
$$

This follows directly before integration by parts. It also holds with $I_p$ replaced by $A_p/4$.

## 3. Sharper bounds on every source history sampled later

The accepted solution exists through $21/16$ with displacement below $1/256$. All environmental histories are stationary before $\alpha$. A generated reception before $a_0=33/32$ would require a positive source time at least $\alpha$ and a cross range at least $1-2/256$, but

$$
a_0<\alpha+1-2/256.
$$

Therefore every accepted receiver equation through $a_0$ has only old-pulse corrections. This is a causal exclusion, not a prescription that the environmental future is stationary.

First improve its elementary bootstrap to

$$
b_0=1/4096,\qquad v_0=1/4400.
$$

On that ball the old pointwise estimate still gives $\|\mathbf y''\|<g/6400\le1/400$. Equation (3), with $I_p\le A_p/4$, gives

$$
\begin{aligned}
\|\mathbf y'\|&\le gCb_0^3a_0+
\frac{2gA_p(k^3/2+4k^2)}{1-v_0}
<0.000226271<v_0,\\
\|\mathbf y\|&\le a_0v_0=3/12800<b_0.
\end{aligned}
$$

These strict first-exit comparisons apply to the already existing solution. Apply (1) and (2) with $v=v_0$, $A=1/400$ and $M_0=(1+\nu)/(1-v_0)$. They sharpen its uniform bounds to

$$
\begin{aligned}
\|\mathbf y'\|
&\le gCb_0^3a_0+2g\left[\frac{2k^3I_p+k^2A_p}{1-v_0}+E(v_0,1/400)I_p\right]
<0.000061108<\frac1{16000},\\
\|\mathbf y\|
&\le\frac{gCb_0^3a_0^2}{2}
+2gI_p\left[\frac{2k^3a_0+k^2M_0}{1-v_0}+E(v_0,1/400)a_0\right]
<0.000015602<\frac1{60000}.
\end{aligned}
\tag{4}
$$

Write $b_s=1/60000$ and $v_s=1/16000$. These speed bounds are for the evolved environmental source futures, not for the imposed target pulse, whose speed ceiling remains $\nu$. The targets' postrelease paths stay stationary through this source cut. Every source value required in the continuation below belongs to this already constructed prefix.

## 4. Uniform continuation to $t=2$

Use the joint displacement and speed bootstrap

$$
\|\mathbf y_i(t)\|\le Y(t)=b+K(t-1)_+^2,
\quad b=1/30000,\quad K=1/144,
\qquad \|\mathbf y_i'(t)\|\le V=1/32.
\tag{5}
$$

Throughout $0\le t\le2$, $Y(t)\le157/22500<1/128=B$. For a receiver in this ball and a source in the accepted prefix, the cross range is at least $1-B-b_s$. The source-time residual $t-s-r$ is strictly negative at $s=a_0$ because

$$
t-a_0\le2-a_0<1-B-b_s.
$$

The unique full-past root therefore lies below $a_0$, more precisely

$$
s\le t-1+B+b_s\le\frac{241879}{240000}<a_0.
\tag{6}
$$

No undefined source future is used in these equations. The causal residual is strictly monotone because the known source histories have subunit speed.

Only environmental sources whose first old-pulse entry was at squared distance $2,3,4$ or $5$ from a target can occur in (6): $1+B+b_s<\sqrt6-11/8$. They form the accepted 76-label set $\mathcal A_5$. Every environmental source is stationary before $\alpha>1/32$. For a generated row,

$$
\|i-j\|\le2-\alpha+B+b_s<2.
$$

Thus only squared receiver-source distances $1,2,3$ occur. Their lattice multiplicities are at most $6,12,8$ per receiver. Use rational lower bounds

$$
d_1=1,\qquad d_2=7/5<\sqrt2,\qquad d_3=12/7<\sqrt3,
\quad (N_1,N_2,N_3)=(6,12,8),
$$

and set

$$
Q_j=\frac{2b_s(d_j-B-b_s)^{-3}+v_s(d_j-B-b_s)^{-2}}{1-v_s}.
\tag{7}
$$

The subtraction estimate for $\mathbf K$ proves $\|\mathbf Q^{\rm gen}\|\le Q_j$. Each such correction vanishes before $t=d_j$: its actual first arrival is at least $\alpha+d_j-B>d_j$. Hence its acceleration, velocity and displacement contributions are bounded by $gQ_j$, $gQ_j(t-d_j)_+$ and $gQ_j(t-d_j)_+^2/2$, respectively. These bounds allow all indicated source positions and arrival differences; they do not assign anchor-time trajectories to moving receivers.

Before using the acceleration parameter in (2), verify it directly. With the accepted old pointwise constant $Q_o=825/11238052$,

$$
\|\mathbf y_i''\|
\le g\left[CB^3+2Q_o+\sum_{j=1}^3N_jQ_j\right]
<0.034573<\frac1{16}=A.
\tag{8}
$$

This uses only the displacement/speed bootstrap and known sources, so it does not assume the acceleration bound it supplies.

Apply (2) with $v=V$, $A=1/16$, and $t\le2$. The entire twice-integrated old-pulse contribution is bounded by

$$
O=2gI_p\left[\frac{4k^3+k^2(1+\nu)/(1-V)}{1-V}+2E(V,1/16)\right]
<0.000026761<\frac1{32000}.
\tag{9}
$$

For $w=(t-1)_+\le1$, the stationary contribution has bound

$$
\begin{aligned}
gC\int_0^t(t-s)Y(s)^3\,ds
&=gC\left[\frac{b^3t^2}{2}+\frac{b^2Kw^4}{4}+\frac{bK^2w^6}{10}+\frac{K^3w^8}{56}\right]\\
&\le2gCb^3+gC\left[\frac{b^2K}{4}+\frac{bK^2}{10}+\frac{K^3}{56}\right]w^2.
\end{aligned}
$$

Since $(t-d_j)_+\le(2-d_j)w$, the generated contribution is at most $G_2w^2$, with

$$
G_2=\frac g2\sum_{j=1}^3N_jQ_j(2-d_j)^2<0.006374705.
$$

The two strict closure comparisons are

$$
\begin{gathered}
\frac1{32000}+2gCb^3<b,\\
G_2+gC\left[\frac{b^2K}{4}+\frac{bK^2}{10}+\frac{K^3}{56}\right]
<0.006512309<\frac1{144}=K.
\end{gathered}
\tag{10}
$$

They establish $\|\mathbf y_i(t)\|<Y(t)$ at any proposed first displacement exit. For speed, (3) and one integration of the stationary and generated bounds give

$$
\begin{aligned}
\|\mathbf y_i'(t)\|
\le{}&\frac{2gL}{1-V}
+gC\left[2b^3+b^2K+\frac{3bK^2}{5}+\frac{K^3}{7}\right]
+g\sum_{j=1}^3N_jQ_j(2-d_j)\\
<&\ 0.016858<\frac1{32}.
\end{aligned}
\tag{11}
$$

There is no first displacement or speed exit. On a slightly larger open domain the finite receiving equations have smooth known source paths, positive ranges and positive root denominators. Their coefficients are locally Lipschitz in receiver position. Ordinary local existence and the strict bounds continue the accepted solution through $t=2$. This proves continuation for the stated actual histories; it is not merely a comparison curve drawn past the earlier endpoint.

## 5. Complete sources, channels and new target returns

### 5.1. Complete received-source dependencies

Let $m_j$ be the smaller squared distance from environmental source $j$ to an exciting target, counting only squared distances at least two. Distance-one supplied pulses passed before release and cannot initiate its future. For $j\in\mathcal A_5$, $m_j\in\{2,3,4,5\}$, and the first generated emission occurs at $a_j=\sqrt{m_j}-11/8$. The source is still at its anchor at that exact onset.

At the onset of a source's nonconstant history, reception by $i$ solves

$$
t-a_j=\|i-j+\mathbf y_i(t)\|.
\tag{12}
$$

Its event time differs from $a_j+\|i-j\|$ by at most $B$. The source speed and receiver speed make each boundary crossing unique. Comparing these enclosures with $t=2$ gives the complete generated census:

| First old squared distance $m_j$ | Source labels | Received generated squared distances | Ordered source-receiver channels |
| --- | ---: | --- | ---: |
| $2$ | 24 | $1,2,3$ | $24(6+12+8)=624$ |
| $3$ | 8 | $1,2$ | $8(6+12)=144$ |
| $4$ | 12 | $1$ | $12\cdot6=72$ |
| $5$ | 32 | $1$ | $32\cdot6=192$ |
| Total | 76 | As above | 1032 |

The nearest excluded family is $m_j=4$, generated squared distance two: its anchor onset $2+\sqrt2-11/8$ exceeds $2+B$. Every included family has onset below $2-B$. The other excluded combinations have larger onset times. No partly admitted family is hidden inside this count.

All 1032 generated rows sample the known old-pulse-only source histories through (6), including both original exciting pulses whenever a source has received both. There are 184 distinct receivers of these rows. Stationary reference rows remain included for every other source relationship.

### 5.2. The target sources and pulse features

For the right target $i=e_1$, its 21 distinct generated sources occur in four groups. The left target has the reflected groups.

| Sources for the right target | Count | Anchor onset at target | Interpretation |
| --- | ---: | --- | --- |
| $e_1\pm e_2,e_1\pm e_3$ | 4 | $\sqrt2+1-11/8=\beta$ | Existing first-return sources, originally excited by the left target |
| $e_1+\mathbf k$, $\|\mathbf k\|^2=2$ | 12 | $2\sqrt2-11/8$ | The right target's own face-diagonal shell returns its response |
| $2e_1$ | 1 | $2+1-11/8=13/8$ | Outward axial neighbor, originally excited by the left target |
| $(0,\pm1,\pm1)$ | 4 | $\sqrt2+\sqrt3-11/8$ | Additional left-excited sources at distance $\sqrt3$ from the right target |

The new onset families are near $1.4534$, $1.6250$, and $1.7713$. Every actual onset is enclosed within $B$ of the table entry, and the gaps exceed twice this width, so the family order is fixed although within-family simultaneity is not asserted.

Four of the twelve face-diagonal sources, those with offset first coordinate zero, also receive the left target's original pulse at distance $\sqrt3$. That second exciting pulse begins returning to the right target near the same last composite time $\sqrt2+\sqrt3-11/8$. Consequently 21 source identities contain 25 original-pulse-to-source-to-target paths by $t=2$. A count of source identities does not justify omitting the extra received history from those four sources.

For an old-pulse feature at emission offset $u$, the same two moving reception maps as in the accepted first-return theorem give

$$
|t-(d_{cj}+d_{ji}-11/8+u)|\le B+2b_s+|p(u)|.
\tag{13}
$$

This covers both excitation and return receiver motion. The twelve face-diagonal first pulses and the outward-neighbor pulse have completed their returning pulse-end receptions before $t=2$. The four new distance-$\sqrt3$ returns and the four second-excitation returns have anchor pulse-end time $\sqrt2+\sqrt3-9/8>2+B+2b_s$, so those eight later pulse paths are unfinished at the horizon. Source motion does not end when a pulse feature has passed.

### 5.3. Old receivers and nonconstant histories

At $t=2$, old-pulse entries have reached exactly the shells of squared radius

$$
\{2,3,4,5,6,8,9,10,11\}
$$

around each target. Their per-center sizes are $12,8,6,24,24,12,30,24,24$, totaling 164. There are 328 ordered old receptions, with 232 completed through squared radius nine and 96 unfinished at squared radii ten and eleven. The union contains 206 distinct environmental labels. Generated receivers add only the two targets to this old-receiver union, so the affected set has 208 labels. All complementary labels have the stationary solution and receive no changed row on the interval.

The receiving-set claim follows from the integer shell definitions and (12), not from treating omitted rows as zero. The stronger nonconstant-history count uses the first old-pulse onset: each non-target label in the union has a first nonzero direct onset with the fifth-order coefficient when its excitation vector has nonzero third component, or the sixth-order transverse coefficient otherwise. These are the accepted onset formulas from the [distance-two continuation](smooth-two-particle-distance-two-continuation.md). Generated paths cannot precede the direct onset, by the triangle inequality applied successively to their first-entry wake fronts. When collinear paths make the two onsets equal, the source displacement first begins at fifth or sixth order; its generated acceleration contribution starts at least one order later than the direct pulse's third- or fourth-order acceleration and cannot cancel that leading term. The targets are already known to be nonconstant. Thus all 208 histories are nonconstant somewhere on $[0,2]$, without a claim that all move at every instant.

## 6. Roots, original class and uniqueness

The complete supplied and evolved paths through the horizon have speed below $1/32$ and displacement below $B=1/128$. For a cross channel at any reception time through the horizon, its complete delay residual obeys

$$
f(\tau_2)-f(\tau_1)\ge\frac{31}{32}(\tau_2-\tau_1),\qquad \tau_2>\tau_1,
$$

including intervals containing a zero-range coordinate value, because the speed bound proves this inequality directly by the triangle inequality. A cross residual is negative at zero delay and positive in the remote past. It has exactly one positive root, with range at least $1-2B=63/64$. On each accepted half-width $1/256$ root tube the transmitter factor is at least $31/32$, and the complement gap is at least $31/(32\cdot256)$, exceeding the original threshold. For a self channel, $f_{ii}(\tau)\ge31\tau/32$ excludes every positive root; the exact zero-delay diagonal is unevaluated.

The future acceleration bound (8) is smaller than the complete supplied acceleration ceiling $3/8$. For jerk, the inherited per-correction derivative bound below six applies since every range exceeds $7/8$, source speed is below $1/4$, source acceleration below $3/8$, and receiver speed below $1/4$. There are at most 28 corrections, and $3CB^2<1$. Hence complete dimensionless jerk is below $169g=2704$, including the smaller supplied jerk. Physical acceleration is at most $3/(8\ell)$ and jerk below $2704/\ell^2$, still within the original ceilings $256/\ell$ and $65536/\ell^2$. The $C^3$ joins follow from endpoint flatness and the regular known-source equations. The original displacement, separation and anchor-cube density requirements are retained.

Uniqueness holds among classical continuations with the identical complete supplied past and fixed block prescription, displacement at most $B$ and speed at most $1/4$. Such competitors have cross delay at least $1-2B$. On an interval shorter than that delay, all source values are from the already common history, reducing the system to locally Lipschitz receiver ODEs. Induction over such intervals proves equality through $t=2$. A finite common receiving set on each bounded interval follows from the finite start time of the disturbance, subunit speed and finite lattice density. This does not claim uniqueness through a root fold, arbitrary infinite perturbations, or outside the regular comparison class.

## 7. Comparison errors and the next mathematical boundary

The new absolute bounds prove that the actual histories exist across the later return families. They do not resolve their very small signed displacements. An amplitude comparison requires a separate residual estimate for all source and receiver equations, including the second old excitation of a reused source. A small numerical fit alone would not provide that estimate.

A useful derived receiver-derivative estimate retains cancellation in the correction. If a source has displacement bound $P$, speed bound $V_s<1$, acceleration bound $A_s$, and its straight subtraction segment has range at least $r_*$, then

$$
\|D_{\mathbf y}\mathbf Q\|
\le\frac{24P}{r_*^4}
+\frac{2}{r_*^3}\left[(1-V_s)^{-2}-1\right]
+\frac{V_sr_*^{-3}+A_sr_*^{-2}}{(1-V_s)^3}.
\tag{14}
$$

Indeed $D_{\mathbf y}s=-\mathbf n^{\mathsf T}/D$, $\|D_{\mathbf y}\mathbf R\|\le(1-V_s)^{-1}$, and $\|D_{\mathbf y}D\|\le(V_s/r_*+A_s)/(1-V_s)$. Subtract $D\mathbf K(\mathbf R_0)$ before taking norms, and bound the kernel's second derivative by $24/r_*^4$ on the segment. The terms in (14) then follow by the product rule. This bound is suited to a Volterra error inequality around a specified approximate trajectory. The stationary derivative must be evaluated on that actual comparison tube; a large existence ball is not a sharp error tube.

Further continuation is not obstructed by a singular event at $t=2$. The present reduction is limited by its received-source cut: (6) eventually reaches $a_0$ as the receiver horizon increases. Past that cut one must bound genuinely generated source emissions and possibly enlarge the source dependency set. Extending the displayed comparison polynomials without those terms would fail to represent the same equation. Successive extrema and any decrease in their amplitude remain a separate signed-dynamics question.

## Development evidence and falsifiers

The contributor used the hereditary-dynamics Specialist lens, with write scope confined to this analysis and `.tmp/mec-008-later-continuation/hale/`. The accepted subjects, their adjudications and the canonical acceleration rule were read as inputs and left unedited. This is contributor derivation, not independent acceptance.

The separately recorded algebraic identities above are the references for the in-session rational checks. The arithmetic/census instrument `check.py` passed its `known` mode before target execution: signed fraction arithmetic, the six-neighbor cubic shell, a translated origin, an exact squared norm and monomial convolution identities. Its script hash is tied to `known.json`; target mode refuses a mismatched known receipt. Target mode then checked the strict continuation inequalities using exact fractions and enumerated the displayed finite integer shell sets. Its exact receipt is `target.json`. The target decimals in this document are outward-rounded summaries of those exact rational comparisons; the instrument checks arithmetic and set membership, not a trajectory or an independent theorem. An exploratory scalar pulse integration preceded the retained instrument; the integral used here is justified by the exact antiderivative displayed in Section 1, and no result from that exploratory command is used as numerical evidence.

Reproduction uses the shared project environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/hale/check.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/hale/check.py target
```

Operator-checkable falsifiers are an incorrect term in the impulse identity; a failed strict inequality in (4), (8), (10) or (11); a source root above $a_0$ despite (6); a received generated source outside the stated set or squared distances; a missing second exciting pulse in one of the reused source histories; a mistaken integer shell intersection; a direct-onset cancellation at the claimed leading order; an additional cross root or positive self root; or a violation of an original class ceiling. A failure of this candidate would not change the accepted theorem through $21\ell/16$ without a separate defect in that earlier argument. A later sign different from an extrapolated plot would not falsify this existence theorem, which asserts no new signed motion.
