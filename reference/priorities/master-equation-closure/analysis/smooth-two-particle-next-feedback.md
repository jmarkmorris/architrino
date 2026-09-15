# Continuation through the first returned pulse and the separation decision

## Status, physical question and plan

The next target is the receipt of the complete first environmental response to the prescribed pulse. The targets have already begun separating when only the beginning of that response has arrived. Receipt of the pulse endpoint tests whether the remainder of this same response preserves the separation velocity. A later appearance of another source channel is a different event and is not needed to pose this first decision.

Claim grade: the new calculations below are **derived, provisional pending independent assessment**. The fixed complete past, alternating eight-source block prescription, normalized wake speed $c_f=1$ and full coupling interval $0<g=G/\ell\le16$ remain unchanged. The accepted frontier remains the [generated-feedback continuation](smooth-two-particle-generated-feedback-independent-adjudication.md) and [separation adjudication](smooth-two-particle-feedback-separation-independent-adjudication.md) through $T=17\ell/16$. A new conditional continuation calculation reaches the complete returned pulse. Its signed separation decision is still open; a positive comparison is not a theorem about the actual target motion.

The agreed four-step plan is:

1. **Specify the reception event and its competitors.** Deliver the composed source-to-environment-to-target arrival equations, moving arrival bounds and complete channel census. Completion requires proving which source histories can be sampled, rather than assigning anchor times to moving receivers. Sections 1–3 supply this derivation.
2. **Decide separation through that event.** Deliver a signed estimate for the actual separation velocity, including source receiver motion, unequal emission times and transmitter weights. Completion means continued separation, an actual transition to approach, or a demonstrated obstruction of the unchanged law. Sections 4–5 isolate the positive analytical comparison and the remaining error; this step is in progress.
3. **Extract the supported local evolution statement.** Deliver a local existence and uniqueness lemma and sufficient continuation conditions for finite disturbances of this stationary background. Section 6 gives a provisional restricted lemma. It does not replace the blocked arbitrary-population formulation.
4. **Assess and integrate.** Keep accepted references unchanged, check the displayed arithmetic and review the new mathematical subject independently. Integrate only the resulting assessed scope into the manuscript. The work log records validation and remaining work.

## 1. Unchanged input and the event to decide

Use dimensionless time $t=T/\ell$, displacements $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$, anchors $i\in\mathbb Z^3$ and polarities $\sigma_i=(-1)^{i_1+i_2+i_3}$. The target set is $E=\{0,e_1\}$. Their identical supplied third-coordinate pulse, expressed in emission offset $v$, is

$$
e(v)=-\frac{11}{8}+v,\qquad
p(v)=-(1-8v)v^4(1-4v)^4,\qquad 0\le v\le\frac14,
$$

and $p$ is zero outside this interval. This is exactly the accepted pulse $2^{-16}\psi(8(s+5/4))$, not a new amplitude or history family. Environmental supplied pasts are stationary. Write

$$
\alpha=\sqrt2-\frac{11}{8},\quad
\beta=\alpha+1,\quad H=\frac{17}{16},\quad h=\frac{113}{128}.
$$

The first 24 responding environmental labels form $\mathcal S=\bigcup_{c\in E}\{j:\|j-c\|^2=2\}$. The right target receives their generated motion from $j=e_1\pm e_2,e_1\pm e_3$, all originally excited by $c=0$. The left target has the reflected four channels, excited by $c=e_1$. Each target/source polarity product is negative. These actual source futures through $h$ are accepted EOM outputs.

### 1.1. A pulse feature traverses two moving reception maps

For one of these channels, let $s_j(v)$ be the time at which source $j$ receives the original emission $e(v)$. Let $t_{ij}(v)$ be when target $i$ receives the environmental emission from that event. The definitions are

$$
\begin{aligned}
s_j(v)-e(v)&=\|j-c+\mathbf U_j(s_j(v))-p(v)e_3\|,\\
t_{ij}(v)-s_j(v)&=\|i-j+\mathbf y_i(t_{ij}(v))-\mathbf U_j(s_j(v))\|.
\end{aligned}
$$

Here $\mathbf U_j$ is the actual previously evolved source displacement. The two distances equal $\sqrt2$ and $1$ only at their anchor comparison. Their sum explains the reference arrival $\beta+v$ and the correction

$$
|t_{ij}(v)-(\beta+v)|
\le \|\mathbf y_i(t_{ij}(v))\|+2\|\mathbf U_j(s_j(v))\|+|p(v)|.
$$

Both maps increase strictly while receiver and source speeds are below one. Implicit differentiation of a regular arrival from emission $a$ to reception $b$ gives $db/da=(1-\mathbf n\cdot\mathbf V_{\rm source})/(1-\mathbf n\cdot\mathbf V_{\rm receiver})>0$. Composition therefore preserves the order of features on each channel, though different channels need not receive the same feature simultaneously.

Define the completion event

$$
\tau_{\rm end}=\max_{i\in E,\ j\in J_i}t_{ij}(1/4),
\qquad J_{e_1}=\{e_1\pm e_2,e_1\pm e_3\},\quad
J_0=\{\pm e_2,\pm e_3\}.
$$

By this time all eight target channels have received the source events at which their original exciting pulse ended. This is not an assertion that the sources cease moving or that their later emissions vanish. The EOM-generated velocity and displacement retain the earlier response.

The pulse derivative is $p'=-4v^3(1-4v)^3(1-6v)(1-12v)$. Its first interior zero at $v=1/12$ is encountered before pulse completion. It is an emission-profile turning point, not a zero of source acceleration or target separation acceleration: the range-dependent displacement contribution remains, and the target samples an integrated environmental response. No physical reversal follows from this zero alone.

### 1.2. Event-based theorem target

For the same fixed input and every $0<g\le16$, determine the sign of $d'(t)$ through $\tau_{\rm end}$, where $d(t)=\|\mathbf X_{e_1}(\ell t)-\mathbf X_0(\ell t)\|/\ell$. The successful alternatives are a proof of $d'>0$ throughout $(\beta,\tau_{\rm end}]$, or a demonstrated first loss of positive separation velocity followed by $d'<0$. A transverse first zero with $d''<0$ would suffice for the latter; a tangential zero requires further analysis. If the unchanged law cannot reach the event, the obstruction must identify an actual failure of its root, range or summation conditions. Failure of a chosen estimate or departure from an auxiliary proof ball is insufficient.

Section 2 removes a regular-continuation obstruction before this event, provisionally. It does not decide the remaining sign. The target is receipt of a defined part of the history and its effect on separation, rather than another time endpoint alone.

## 2. Continuation reaching the complete returned pulse

### 2.1. Source histories remain within the accepted prefix

Choose the auxiliary slab and displacement ball

$$
H_*=\frac{21}{16},\qquad B_*=\frac1{256},\qquad
\rho=1-2B_*=\frac{127}{128}.
$$

This proof ball is larger than the preceding ball $1/512$ but remains strictly inside the original environmental envelope $1/16$. It does not change the prescribed histories or original class. Every cross range on the ball is at least $\rho$. Therefore

$$
s\le H_*-\rho=\frac{41}{128}<\sqrt3-\frac{11}{8}<h.
$$

Only the first 24 environmental responders can supply nonconstant received generated histories. Also $H_*+2B_*<\sqrt2$, so only nearest-neighbor generated corrections occur anywhere on the slab. Nonconstant postrelease target emissions are not yet received. At the source cut $h$, the residual is strictly of the nonroot sign since $H_*-h<1-B_*-1/1024$; monotonicity towards the earlier past gives a unique root below the cut. Thus defining each receiver equation samples no unknown source future.

The exact equation remains

$$
\mathbf y_i''=g\left[\mathbf S_0(\mathbf y_i)
+\sum_{j\in E\setminus\{i\}}\sigma_i\sigma_j\mathbf Q^{\rm old}_{ij}
+\sum_{\substack{j\in\mathcal S\\\|i-j\|=1}}\sigma_i\sigma_j\mathbf Q^{\rm gen}_{ij}\right],
$$

where $\mathbf S_0$ is the same stationary block sum and each correction is the actual transmitter-weighted row minus its stationary row. There are at most two old and six generated corrections per receiver. Stationary received histories still contribute their reference rows. The infinite tail remains the accepted stationary tail plus these finite corrections.

### 2.2. A time-dependent bound closes the larger interval

The stationary estimates give $\|\mathbf S_0(\mathbf y)\|\le C_{B_*}\|\mathbf y\|^3$, with $C_{B_*}=1309/(1-B_*)^5<1400$. The unchanged old-pulse bound is $Q_o=825/11238052$, since every nonzero old correction has subtraction range greater than $7/5$. Hence

$$
C_{B_*}B_*^3+2Q_o<\frac1{4300}.
$$

For a sampled generated source, let $u=s-\alpha\ge0$. The accepted prefix acceleration gives $\|\mathbf U_j\|\le gu^2/12800$ and $\|\mathbf U'_j\|\le gu/6400$. Since $\rho+\alpha>1$, one has $u<t-1$. On $H\le t\le H_*$ put $w=t-1\le5/16$. Source speed is at most $1/1280$, and both actual and subtraction-segment ranges are at least $\rho$. Consequently

$$
\begin{aligned}
\|\mathbf Q^{\rm gen}_{ij}\|
&\le\frac{g(w^2\rho^{-3}+w\rho^{-2})}{6400(1-1/1280)}
<\frac{gw}{4750},\\
\|\mathbf y_i''(t)\|&\le\frac g{4300}+\frac{6g^2}{4750}(t-1).
\end{aligned}
$$

The increasing-in-time bound avoids charging the largest received source velocity across the whole interval. At the accepted cut, $\|\mathbf y_i(H)\|\le29/19200$ and $\|\mathbf y_i'(H)\|\le19/6000$. Since $H_*-H=1/4$ and

$$
\int_H^{H_*}(H_*-t)(t-1)\,dt=\frac7{1536},
$$

the maximal coupling $g=16$ gives

$$
\begin{aligned}
\|\mathbf y_i(H_*)\|
&\le\frac{29}{19200}+\frac{19}{24000}+\frac{16}{137600}+\frac7{4750}
=\frac{305261}{78432000}<\frac1{256},\\
\|\mathbf y_i'(H_*)\|
&\le\frac{19}{6000}+\frac4{4300}+\frac{72}{4750}
=\frac{94387}{4902000}<\frac1{32},\\
\|\mathbf y_i''\|&\le\frac{16}{4300}+\frac{480}{4750}
=\frac{428}{4085}<\frac38.
\end{aligned}
$$

The bounds increase with time and coupling. They therefore hold throughout the slab for the full range $0<g\le16$. Regular local receiver ODE existence and the strict first-exit displacement bound continue the solution through $H_*$. The lower bound for separation here is only $d\ge\rho$; it does not prove monotonicity.

For receiver dependence, the prior bound of $11$ per correction remains valid: sampled source speed is at most $1/4$, source acceleration at most $3/8$, and ranges exceed $7/8$. The stationary derivative is at most $4200B_*^2<1$, so $89g$ again bounds the acceleration's receiver-position Lipschitz constant. Time differentiation retains source acceleration through $D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s'$. The prior bound $\|\mathbf Q'\|<6$ per row applies with receiver speed below $1/32<1/4$. Thus jerk is below $49g\le784$; the stationary derivative contribution is below $g$. Endpoint flatness of the old pulse and the smooth known source histories preserve $C^3$ joins. The equation also agrees with the accepted equation near $H$.

### 2.3. Complete roots and comparison uniqueness

The complete joined history has speed below $1/32$. Its delay-minus-range residual increases by at least $31/32$ times a positive delay increment, including at zero range by the Lipschitz inequality. Every cross residual is negative at zero delay and positive in the remote past, hence has exactly one positive root. Every cross range is at least $127/128$. Each original half-width $1/256$ tube lies in positive delay, has transmitter floor at least $31/32$, and has complement gap at least $31/(32\cdot256)>1/(4\cdot256)$. The self residual obeys $f_{ii}(\tau)\ge31\tau/32$, excluding all positive-delay self roots. The exact zero-delay diagonal remains unevaluated.

Uniqueness is among classical continuations with this exact supplied past and block prescription, displacement at most $B_*$ and speed at most $1/4$. This enlarged comparison needs its own argument. Up to $h$, all cross emissions are negative because $h<1-2B_*$, so a competitor solves the same fixed-past receiver equations and matches the accepted prefix. Thereafter, through $H_*$, all received source times are below $41/128<h$, so the equations sample identical known histories and receiver ODE uniqueness applies again. The earlier uniqueness statement restricted to $1/512$ is not used to exclude a larger-ball competitor.

The complete supplied and evolved acceleration is at most $3/(8\ell)$, jerk at most $784/\ell^2$, and complete displacement at most $\ell/256$. These remain below the original class ceilings; the speed and equal-time separation bounds retain its root and spatial conditions. The same anchor-cube density proof applies at every new cut. This proves preservation only for the fixed control and this bounded interval, not a neighborhood of arbitrary original-class histories.

## 3. Receiving census and the ordered event families

Old-pulse boundary arrivals from exciting target $c$ solve $t=e(v)+\|i-c+\mathbf y_i(t)\|$ at $v=0,1/4$, because $p$ vanishes at the endpoints. Their times lie within $B_*$ of $\|i-c\|-11/8$ and $\|i-c\|-9/8$, respectively. Speed below one makes each boundary unique.

| Event family | Anchor time or exact definition | Scope through $H_*$ |
| --- | --- | --- |
| Old squared-distance-six entries | $\sqrt6-11/8$ | All enter after $H$ and before the squared-distance-five exits. |
| Old squared-distance-five exits | $\sqrt5-9/8$ | All finish before $H_*$. |
| First pulse-velocity turn received by a target | $t_{ij}(1/12)$, near $\beta+1/12$ | A profile landmark; not an acceleration-sign theorem. |
| Pulse endpoint received by a target | $t_{ij}(1/4)$, near $\beta+1/4$ | All eight are received before $H_*$. |
| Old squared-distance-six exits | $\sqrt6-9/8$ | Later than $H_*$ even after the displacement correction. |
| First additional generated channels at a target | $t-\alpha=\|i-j+\mathbf y_i(t)\|$, $\|i-j\|^2=2$, $j\in\mathcal S_i$ | Anchor time $2\sqrt2-11/8$; absent on this slab. Their eventual reception is conditional on later continuation. |

There are no integer vectors with squared norm seven: squares modulo eight are $0,1,4$, and three cannot sum to seven. The next old shell after six is therefore eight, whose onset also has anchor time $2\sqrt2-11/8$. This later equality of anchor times does not prove equality of moving arrivals at different receivers.

The old receiving union becomes $\mathcal A_6=\bigcup_{c\in E}\{i:\|i-c\|^2\in\{2,3,4,5,6\}\}$. Shell sizes per center are $12,8,6,24,24$, giving 148 ordered old receptions. To check the overlap, if $m=\|i\|^2$ and $n=\|i-e_1\|^2$, then $m-n=2i_1-1$ is odd and the transverse squared radius is $m-i_1^2$. Relative to the 24 previous double receivers, the new ordered squared-distance pairs $(3,6),(6,3)$ contribute four labels each and $(5,6),(6,5)$ eight each. Thus 48 receivers see both target histories, $|\mathcal A_6|=148-48=100$, and 24 environmental labels are newly reached. By $H_*$ exactly 100 old-pulse receptions have ended and the 48 shell-six receptions are unfinished.

The generated census remains 144 nearest-neighbor channels to 76 labels, as in the accepted proof: 72 channels from each center's distance-two shell. Its receiving set $\mathcal R$ satisfies $\mathcal R\setminus\mathcal A_6=E$. Hence $\mathcal A_6\cup E$ contains 102 potentially nonconstant histories; the complement stays stationary by the zero solution and receiver uniqueness. The 24 newly reached environmental labels have shell-six offsets with nonzero third component and have a nonzero fifth-order response to their first old-pulse entry. They cannot already receive generated motion because $\mathcal R\subset\mathcal A_5\cup E$. Thus all 102 histories are nonconstant somewhere on the full interval, without asserting nonzero acceleration at every instant or from every entered channel.

At a pulse-end source event the accepted prefix gives $\|\mathbf U_j\|<1/1024$ and $p(1/4)=0$. The composed-event enclosure is therefore

$$
\left|t_{ij}(1/4)-\left(\sqrt2-\frac18\right)\right|
\le B_*+\frac2{1024}=\frac3{512}.
$$

Its upper endpoint is below $21/16$. The source event itself occurs near $\sqrt2-9/8$ and belongs to the accepted prefix. The positive reception derivative and these endpoint signs prove that every completion root exists on the new slab. The small distinct intervals for old shell-six entry, old shell-five exit and the first pulse-velocity turn establish their stated family ordering. Ordering within one family is left to the actual roots; no simultaneous arrival is assumed.

For perspective on the next new target channels, minimize their range over the twelve offsets of squared norm two. Accepted reflection symmetries persist by uniqueness, so the right target has $\mathbf y=(x,0,z)$ and the left $(-x,0,z)$. The earliest range envelope in this family is exactly

$$
\sqrt{2-2(|x|+|z|)+x^2+z^2}.
$$

If both signs are positive, the earliest right source would be $2e_1+e_3$ and its reflected left source $-e_1+e_3$. Those signs are not assumed beyond the accepted interval. The envelope identifies a later event target conditionally; it is not a new continuation result at that later time.

## 4. Signed response of the entire first pulse

This section defines an analytical comparison. Hold the four environmental receivers at their anchors only when evaluating their old-pulse acceleration, and integrate that acceleration twice from their resting onset. These comparison displacements are not substituted for the actual EOM histories. The pulse, root map and transmitter denominator remain exact in the comparison.

For $k\in\{(1,0,1),(1,0,-1),(1,1,0),(1,-1,0)\}$ let $a=k_3$, $d_0=\sqrt2$ and

$$
r_a(v)=\sqrt{2-2ap(v)+p(v)^2},\quad
\theta_a(v)=v+r_a(v)-d_0,\quad
\theta_a(v_a(u))=u.
$$

The first-coordinate comparison displacement is $gZ_a(u)$, where

$$
Z_a(u)=\int_0^{v_a(u)}(u-\theta_a(v))r_a(v)^{-3}\,dv
-\frac{u^2}{2d_0^3}.
$$

Changing reception to emission time cancels the transmitter denominator exactly. The signed four-source comparison is $\mathcal Z(u)=Z_1(u)+Z_{-1}(u)+2Z_0(u)$. It combines the transverse channels with the vertical pair before estimating their potentially cancelling terms. This is preferable to subtracting a large transverse absolute bound from a smaller vertical remainder.

### 4.1. Exact positivity with the moving endpoints retained

Define the even kernel differences

$$
H_m(a)=(2-2a+a^2)^{-m/2}+(2+2a+a^2)^{-m/2}
+2(2+a^2)^{-m/2}-4\,2^{-m/2}.
$$

Splitting each integral at the common emission offset $u$ gives the exact identity

$$
\begin{aligned}
\mathcal Z(u)&=\int_0^u\left[(u-v+d_0)H_3(p(v))-H_2(p(v))\right]dv
+\sum_{a\in\{1,-1,0,0\}}E_a(u),\\
E_a(u)&=\int_u^{v_a(u)}(u-\theta_a(v))r_a(v)^{-3}\,dv.
\end{aligned}
$$

Every $E_a$ is nonnegative. If $v_a(u)>u$, its integrand is nonnegative on the forward interval; if $v_a(u)<u$, its integrand is nonpositive and the integration orientation is reversed. This argument uses the strict increase of $\theta_a$ and retains the endpoint contribution without a Taylor approximation.

The two required kernel signs can be proved directly. Setting $q=a^2$ and combining rational fractions gives

$$
H_2(a)=-\frac{2a^6}{(2+a^2)(4+a^4)}\le0.
$$

For $H_3$, set $s=2+a^2$ and $b=2a/s$, so $|b|<1$. The even terms of the binomial series imply $(1-b)^{-3/2}+(1+b)^{-3/2}\ge2+(15/4)b^2$. Tangent lower bounds for the convex functions $(1+q/2)^{-3/2}$ and $(1+q/2)^{-7/2}$ then give

$$
\begin{aligned}
H_3(a)&\ge4s^{-3/2}+15a^2s^{-7/2}-4d_0^{-3}\\
&\ge\frac{a^2}{d_0^7}\left(3-\frac{105}{4}a^2\right)>0
\qquad (0<|a|\le2^{-16}).
\end{aligned}
$$

The original pulse satisfies this amplitude bound. Since $u-v+d_0>0$ on $0\le v\le u$ and the pulse is nonzero on a positive-measure subset of every initial interval, it follows that

$$
\mathcal Z(u)>0\qquad\text{for every }u>0.
$$

This exact comparison includes both pulse lobes and both transverse channels. It establishes why a pulse-velocity sign change alone does not reverse this signed four-source displacement sum. It does not assume that the actual moving receivers remain at their anchors.

### 4.2. The residual comparison after pulse completion

For $u\ge1/4$, each $v_a(u)=u$ because the pulse has ended, so every endpoint term vanishes. Let $C_m=\int_0^{1/4}H_m(p(v))\,dv$. The pulse obeys $p(1/4-v)=-p(v)$, and $H_m$ is even, hence its first emission-time moment is $C_m/8$. Therefore

$$
\mathcal Z(u)=\left(u+d_0-\frac18\right)C_3-C_2,
\qquad C_3>0,\quad C_2<0.
$$

The comparison retains a positive first-coordinate velocity sum $gC_3$ after its driving pulse has ended. This is a consequence of its earlier acceleration, not continued nonzero old-pulse acceleration. The exact pulse-square integral is

$$
I_0=\int_0^{1/4}p(v)^2\,dv
=\frac{8!^2}{4^9\,19\,17!}
=\frac1{1089735229440},
\qquad
C_3\ge\frac{3-105/2^{34}}{d_0^7}I_0.
$$

To obtain $I_0$, set $w=4v$, expand $(1-2w)^2$, and integrate the three monomials against $w^8(1-w)^8$ on $[0,1]$; repeated integration by parts gives the displayed factorial ratio. No fitted pulse or numerical trajectory enters this comparison.

## 5. Exact target criterion and the unresolved sign

Throughout the proved candidate slab, the target still has only its four generated corrections. Reflections give $d=1+2x>0$, where $x=y_{e_1,1}$; the third displacement is common and cancels in separation. For absolute source times $s_j(t)$ define

$$
F_j(t)=\frac{r_j(t)^{-3}}{1-\mathbf n_j(t)\cdot\mathbf U_j'(s_j(t))},
\qquad f_j(t)=\|e_1-j+\mathbf y_{e_1}(t)\|^{-3}.
$$

The first-coordinate equation has the exact form

$$
\begin{aligned}
x''(t)&=A(t)+b(t)x(t),\qquad
A(t)=g\sum_{j\in J_{e_1}}U_{j,1}(s_j(t))F_j(t),\\
b(t)&=g\left[\int_0^1\partial_1S_{0,1}(\theta x(t),0,z(t))\,d\theta
+\sum_j(f_j(t)-F_j(t))\right].
\end{aligned}
$$

The component identity uses the zero first coordinate of each target/source anchor vector and the negative polarity products. It remains valid after the old bound $|b|\le3g^2\delta^4$ leaves its proved interval; that earlier numerical bound is not reused here.

With $u=t-\beta$, define the exact difference from the common-time anchor comparison

$$
\mathcal E(t)=g\sum_j\left[U_{j,1}(s_j(t))F_j(t)-gZ_{k_{j,3}}(u)\right]+b(t)x(t).
$$

Then the physical separation decision is equivalent to the signed impulse identity

$$
\frac{d'(t)}2=x'(H)
+g^2\int_H^t\mathcal Z(v-\beta)\,dv
+\int_H^t\mathcal E(v)\,dv.
$$

The accepted initial bound is $x'(H)\ge g^2(H-\beta)^9/2700>0$. Controlling the last integral against this initial velocity and the positive comparison impulse, at every intermediate $t\le\tau_{\rm end}$, would prove continued separation. An evaluated negative value of the complete right side would instead prove actual approach; a negative lower bound would leave the sign unresolved. A final-time value alone does not exclude an earlier approach and return.

The unresolved terms are specific: actual source receiver motion relative to the anchor comparisons, shifts of the four target source times, unequal transmitter/range weights, and the scalar receiver term. Their coarse norm bounds suffice for continuation but do not resolve the much smaller signed sum. No reduction of the coupling domain has been made to bypass them. These terms are the next proof work, not evidence of attraction, a singularity or failure of the original law.

## 6. Restricted local evolution and continuation lemma

The concrete proof supports the following provisional reusable statement. Fix a stationary lattice and a prescribed summation rule whose reference receiver field is $C^1$ on a uniform displacement ball and vanishes at each anchor. Supply $C^3$ complete pasts through a cut $a$, all with displacement below $B<1/2$ and speed below $v_*<1$. Suppose only finitely many labels have nonstationary pasts, and all deviations vanish before a common finite past time. Keep their polarity products fixed. At an interior cut of an EOM evolution, acceleration and jerk already match the left history; at a fresh release those compatibility conditions must be imposed separately if a $C^3$ joined history is required.

There is a sufficiently short unique classical continuation inside the regular displacement and speed ball. For any candidate step shorter than $1-2B$, each cross root lies before the cut. The source-root map is single valued by the complete-past speed bound, stays a positive distance from zero range, and is continuously differentiable in receiver position. Its derivative includes source acceleration. The infinite row sum equals the fixed regular stationary field plus finitely many known-source corrections. Thus each label obeys a locally Lipschitz receiver ODE. Only finitely many receivers can sample a deviation during a bounded step: the finite starting time and finite source-label set put their anchors inside a finite radius. All other labels retain the unique zero solution. Finite ODE existence and uniqueness now apply to the receiving set, and the self Lipschitz inequality excludes positive-delay self roots. Agreement with the past and differentiation of the same equation establish the asserted smooth joining.

A sufficient continuation criterion on a finite time horizon is uniform positive margins for the displacement ball and source/receiver subunit speed, uniform bounds for sampled source acceleration and the stationary field and its receiver derivative, compatible smooth cuts, and containment of the nonstationary histories in a finite causal receiving set on that horizon. Under these conditions a common positive method-of-steps interval and ordinary ODE bounds allow extension. For retention of the original $C^3$ class one must additionally check its explicit acceleration and jerk ceilings, as Section 2 does. Loss of one sufficient margin does not prove nonexistence in a larger regular domain.

This is a finite-disturbance statement over an infinite stationary background, not a theorem on an open neighborhood of the original uniform history norm. Arbitrarily many independently changed remote histories can destroy the accepted sum and its continuity. Nor does the lemma cover a fold, same-transmitter birth, vanishing positive delay, arbitrary summation partitions or a regulator limit. The current control meets its finite-support and regular-tail premises; the original broader history class does not automatically do so.

## Development record and falsifiers

The task is the operator-authorized `1-mec` priority resumption of September 14, 2026. Preferred write ownership is this lane; the Braid task, solver implementation, shared ranking files and accepted reference instruments remain outside scope. The accepted scientific inputs were identified by `shasum -a 256` before development in `.tmp/mec-008-next-feedback/frozen-inputs.sha256`. An exact-path `rg` under `scripts/`, `tests/`, `src/`, `.github/`, `.githooks/` and this lane's `evidence/` returned no match for the new analysis, manuscript or queue paths. This search does not exclude other binders; the generated reference surface remains a publication-time consumer.

The bounded rational calculation is authorized by this mathematical investigation and is not added to regular testing. Its consequence is limited to the displayed arithmetic. The new `.tmp/mec-008-next-feedback/check.mjs` passed known fraction operations, a rejected reversed inequality and the independently integrated linear-function control before target use; `known.txt` records that pass. Its subsequent target run checked the exact continuation and timing comparisons in `target.txt`. These arithmetic checks do not certify EOM trajectories or accept the theorem. No simulation or long-running job is needed for this step.

The separate read-only event-geometry derivation reconstructed the source cutoff, 144-channel generated census, expanded old census, composed arrival maps and the enlarged-ball uniqueness requirement. A separate read-only derivation develops the signed pulse comparison. Both are contributions to the present subject, not independent acceptance of their combined result. The full candidate remains provisional until a reviewer reconstructs the frozen subject separately.

A source emission above the accepted cut, an omitted nonnearest generated channel, a failed strict displacement estimate, an extra positive-delay root, a lost original class ceiling, a missing old-shell receiver, a wrongly ordered moving endpoint or an omitted term in the signed comparison would overturn its corresponding step. A demonstrated sign change must be in the actual $d'$ identity, not in an upper or lower majorant. The accepted result through $17\ell/16$ is unaffected by an error in this continuation attempt. The unspecified regulator proposal remains deferred.
