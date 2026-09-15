# Independent assessment of the complete first returned pulse

## Verdict and exact scope

**Pass for the scoped mathematical claims in Sections 1–6.** Direct reconstruction found no required mathematical correction in the frozen [subject](smooth-two-particle-next-feedback.md), SHA-256 `b234522aba2469f177ac0bcd2b588ed3897868f8dc9ef68682d138e62320770e`. The supported continuation reaches $T=21\ell/16$ for the identical supplied complete past, alternating unit-spaced lattice in dimensionless coordinates, fixed eight-source block sum, $c_f=1$ and entire interval $0<g=G/\ell\le16$. It receives all eight source events defining completion of the first returned pulse. The exact positive four-source integral is a comparison result; the actual separation velocity after $T=17\ell/16$ remains unresolved.

Claim grade: derived, conditional on the already accepted generated-feedback, separation and distance-two theorems and the stationary-sum and reflection facts they consume. This assessment reconstructs the new argument, rather than re-adjudicating those dependencies or their full histories. The independent reference is the algebra, geometric census and method-of-steps reconstruction below. A separately authored rational instrument checks arithmetic only. Neither the coordinator's arithmetic nor the geometry and pulse workers' scratch reports or instruments were read or used as evidence.

| Claim | Assessment |
| --- | --- |
| Continuation through $21\ell/16$ at all $0<g\le16$ | Accepted for the fixed control |
| Only accepted source histories sampled, finite corrections to the same stationary tail | Accepted |
| Displacement, speed, acceleration, jerk, complete roots and original class | Accepted on this bounded interval |
| Uniqueness in the enlarged displacement ball with speed at most $1/4$ | Accepted for identical supplied past and summation prescription |
| 148 entered old receptions, 100 complete and 48 unfinished at the new horizon | Accepted |
| 144 generated channels to 76 receivers, and 102 nonconstant histories over the full interval | Accepted |
| All eight composed pulse-end receptions occur before the new horizon | Accepted |
| Positive anchor four-source displacement sum for every positive comparison time | Accepted as an analytical comparison |
| Exact signed impulse identity for actual target separation | Accepted |
| Actual separation sign beyond $17\ell/16$ | Unresolved; no new sign theorem |
| Restricted finite-disturbance local evolution lemma | Accepted on the same unit-spaced lattice, with its explicit compatibility and regularity premises |
| Arbitrary original-class evolution, global population admissibility, regulator selection or coincidence exclusion outside the interval | Not established |

No failed new mathematical claim was found within that scope. For standalone reuse of Section 6, stating “anchors $i\in\mathbb Z^3$ with nearest-neighbor spacing one” explicitly would make its scale assumption immediate. In the subject this is already the setting established in Section 1; for a lattice of minimum spacing $a_0$, the corresponding restrictions are $B<a_0/2$ and step length less than $a_0-2B$. This is a clarification of the supported lemma, not a change to the present control.

## 1. Input, composed reception maps and endpoint event

Let $t=T/\ell$, $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$, $E=\{0,e_1\}$, $\alpha=\sqrt2-11/8$ and $\beta=\alpha+1$. Substitution of $s=-11/8+v$ into the accepted pulse gives

$$
2^{-16}(8v-1)\left[1-(8v-1)^2\right]^4
=(8v-1)v^4(1-4v)^4=p(v).
$$

Thus the subject's pulse is exactly the accepted input, with support $0\le v\le1/4$. Differentiation gives $p'=-4v^3(1-4v)^3(1-6v)(1-12v)$, so $1/12$ is its first interior derivative zero. The other interior zero is $1/6$; no acceleration sign follows from either profile derivative zero alone.

For exciting target $c$, environmental source $j$ and receiving target $i$, define $s_j(v)$ by reception of the original target emission and $t_{ij}(v)$ by reception of the environmental emission at that source event. Their two equations in the subject are the causal range equations applied consecutively. Applying the reverse triangle inequality to each equation and adding gives

$$
|t_{ij}(v)-(\beta+v)|
\le\|\mathbf y_i(t_{ij}(v))\|+2\|\mathbf U_j(s_j(v))\|+|p(v)|.
$$

For a single reception, differentiation of $b-a=\|\mathbf X_r(b)-\mathbf X_s(a)\|$ gives $(1-\mathbf n\cdot\mathbf V_r)b'=1-\mathbf n\cdot\mathbf V_s$. Both factors are positive under the proved subunit speed bounds. Each map is therefore strictly increasing, as is their composition. This orders features on each channel without asserting simultaneous arrival across different channels. The maximum of the eight endpoint events is consequently a well-defined completion event once those events are shown to exist.

## 2. Source cutoff and continuation estimate

Set $H=17/16$, $h=113/128$, $H_*=21/16$, $B_*=1/256$ and $\rho=1-2B_*=127/128$. Every cross range in the proposed displacement ball is at least $\rho$. Hence every source root received through $H_*$ satisfies

$$
s\le H_*-\rho=41/128<\sqrt3-11/8<h.
$$

The accepted prefix states that outside the 24 first responders $\mathcal S$, environmental motion begins no earlier than $\sqrt3-11/8$. Targets do not begin their postrelease motion before $\beta$. Only $\mathcal S$ can therefore supply received generated motion in this step. Since $H_*+2B_*<\sqrt2$, a received generated row must join nearest neighbors. The residual at the known source cut has the required negative sign because $H_*-h=55/128<1-B_*-1/1024$. Monotonicity toward the remote past therefore defines every receiver equation from the accepted source histories alone. There is no assumed source future on the new slab.

The exact EOM is the same stationary block field plus at most two old and six generated corrections. For $\mathbf K(\mathbf R)=\mathbf R/\|\mathbf R\|^3$, subtraction of an anchor source row before taking norms gives

$$
\left\|\frac{\mathbf K(\mathbf R)}D-\mathbf K(\mathbf R_0)\right\|
\le\frac{2P\rho^{-3}+V\rho^{-2}}{1-V},
$$

where $P$ and $V$ bound source displacement and speed, and the whole segment from $\mathbf R_0$ to $\mathbf R$ has range at least $\rho$. This follows from $\|D\mathbf K\|\le2\rho^{-3}$ and $|D-1|\le V$. It preserves the canonical transmitter weight; no receiver-playback factor is inserted.

The old row still has range greater than $7/5$, since $\sqrt2-B_*-2^{-16}>7/5$. Its accepted pulse bounds therefore yield the same $Q_o=825/11238052$. The stationary estimate applies throughout the enlarged ball, and

$$
\frac{1309}{(1-B_*)^5}<1400,
\qquad 1400B_*^3+2Q_o<1/4300.
$$

For generated emission time $s\ge\alpha$, put $u=s-\alpha$. The accepted acceleration bound, integrated from resting onset, gives $P\le gu^2/12800$ and $V\le gu/6400$. Because $\rho+\alpha>1$, $u<t-1=w$. On the new slab $w\le5/16$ and $V\le1/1280$, giving

$$
\|\mathbf Q^{\rm gen}\|
\le\frac{g(w^2\rho^{-3}+w\rho^{-2})}{6400(1-1/1280)}
<\frac{gw}{4750}.
$$

At the largest $w$, the coefficient of $gw$ is exactly $2736128/13099409285<1/4750$. Hence $\|\mathbf y_i''\|\le g/4300+6g^2(t-1)/4750$. With the accepted initial position and speed at $H$, integration over a duration $1/4$ gives the subject's bounds. In particular, writing $q=t-H$ gives

$$
\int_H^{H_*}(H_*-t)(t-1)\,dt
=\int_0^{1/4}(1/4-q)(1/16+q)\,dq
=7/1536.
$$

At $g=16$ the reconstructed endpoint estimates are

$$
\begin{aligned}
\|\mathbf y_i\|&\le305261/78432000<1/256,\\
\|\mathbf y_i'\|&\le94387/4902000<1/32,\\
\|\mathbf y_i''\|&\le428/4085<3/8.
\end{aligned}
$$

The corresponding majorants increase with time and coupling, so these endpoints bound the whole new slab and full coupling domain. The strict displacement margin prevents a first exit from the proof ball. The receiver ODE exists locally on a larger open regular domain; bounded position and speed permit extension through $H_*$. This is a continuation result with a positive separation floor, independent of any sign for the separation velocity.

The inherited correction derivative bound below $11$ remains applicable: sampled source speed is at most $1/4$, acceleration at most $3/8$, and range exceeds $7/8$. The background derivative is bounded by $4200B_*^2=525/8192<1$, so the receiver-position Lipschitz constant $89g$ remains valid. The time derivative includes source acceleration in $D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s'$. The accepted estimate below $6$ per correction applies with the new receiver speed below $1/32$, which is stronger than its required $1/4$ ceiling. Including the stationary term gives jerk below $49g\le784$. Source smoothness, endpoint flatness and agreement of the EOM near $H$ provide the $C^3$ join.

## 3. Complete roots, comparison uniqueness and original class

On the complete joined histories, including the prescribed past, speed is below $1/32$. For any source and $\tau_2>\tau_1$, the triangle inequality gives

$$
f(\tau_2)-f(\tau_1)
\ge(31/32)(\tau_2-\tau_1),
\qquad f(\tau)=\tau-\|i-j+\mathbf y_i(t)-\mathbf y_j(t-\tau)\|.
$$

This inequality holds even where a range derivative would not exist. A cross residual starts negative because the present separation is at least $\rho$, and it becomes positive for sufficiently large delay because complete displacements are bounded. It has exactly one positive root. The cross range floor holds for all source times, the root delay exceeds $\rho$, the original half-width $1/256$ enclosure remains in positive delay, and the transmitter factor is at least $31/32$. Outside that enclosure the residual magnitude is at least $31/(32\cdot256)$, exceeding the original required complement gap. A self residual satisfies $f_{ii}(\tau)\ge31\tau/32$, which excludes every positive self root and supplies both original self complements. No value is assigned to the zero-delay diagonal.

Uniqueness in the enlarged ball does require the separate argument the subject provides. Any competitor with the identical complete supplied past, same summation rule, displacement at most $B_*$ and speed at most $1/4$ has negative cross emission times up to $h$, since $h<1-2B_*$. Its receiver equations therefore use only the identical prescribed past and have ordinary ODE uniqueness. It matches the accepted solution through $h$. For later reception through $H_*$, all source times lie below $41/128<h$, so the source functions already match. Ordinary receiver uniqueness completes the comparison. The narrower predecessor uniqueness statement is not being used outside its own ball.

In physical units the bounds are displacement below $\ell/256$, speed below $1/32$, acceleration at most $3/(8\ell)$ and jerk at most $784/\ell^2$. They preserve the original environmental and target envelopes, speed ceiling $4$, acceleration ceiling $256/\ell$ and jerk ceiling $65536/\ell^2$. The pairwise range floor is stronger than $\ell/8$. The original anchor-cube density proof applies to these even smaller complete displacements, and the root conditions and $C^3$ joins were checked above. This is original-class preservation for the fixed continuation, not invariance of a neighborhood of arbitrary histories in that class.

## 4. Receiving geometry and census

At a pulse endpoint $v=0$ or $1/4$, the source pulse displacement vanishes. The old reception event differs by at most $B_*$ from its anchor time. The bound below one for receiver speed gives each endpoint a unique crossing. Independently squared positive rational enclosures for $\sqrt2$, $\sqrt3$, $\sqrt5$ and $\sqrt6$ verify

$$
\begin{gathered}
H<\sqrt6-11/8-B_*,\\
\sqrt6-11/8+B_*<\sqrt5-9/8-B_*,\\
\sqrt5-9/8+B_*<\beta+1/12-(3/512+2^{-16}),\\
\sqrt2-1/8+3/512<H_*<\sqrt6-9/8-B_*.
\end{gathered}
$$

The third inequality uses the full composed-event error, including the pulse amplitude, and thus proves separation of the stated event families despite moving receivers. No within-family simultaneity is used. The shell after squared radius six cannot have squared radius seven: three squares, each congruent to $0$, $1$ or $4$ modulo eight, never sum to seven. Its next possible squared radius is eight, with onset beyond $H_*$. Shell-six exits also remain beyond the constructed interval.

The shell sizes for squared radii $2,3,4,5,6$ are respectively $12,8,6,24,24$, from the signed permutations of $(1,1,0)$, $(1,1,1)$, $(2,0,0)$, $(2,1,0)$ and $(2,1,1)$. Each center has 74 old reception channels, hence 148 ordered channels. For a double receiver with $m=\|i\|^2$ and $n=\|i-e_1\|^2$, its first coordinate is $(m-n+1)/2$ and its transverse squared radius is $m-i_1^2$. The old nonempty pairs $(2,3),(3,2),(2,5),(5,2),(4,5),(5,4)$ each contribute four labels. The new pairs $(3,6),(6,3)$ each contribute four; $(5,6),(6,5)$ each contribute eight. Equal-parity pairs are impossible, and the remaining opposite-parity possibilities require two squares summing to three. Thus there are 48 double receivers and $148-48=100$ distinct environmental receivers. The first four shells give exactly 100 completed channels at $H_*$; the 48 sixth-shell channels remain unfinished.

The 24 new labels can be described without a numerical lattice census. Relative to center zero, the new shell-six vectors have first coordinate $-2$ with transverse coordinates $(\pm1,\pm1)$, or first coordinate $-1$ with transverse coordinates a signed permutation of $(2,1)$. These are 12 labels. The other 12 are their reflected counterparts about $x_1=1/2$. All have nonzero third coordinate, and their squared distance to the other exciting center is nine or eleven, so there is a single first old-pulse entry. They have not been reached by generated motion. Near their exact onset, with offset $\theta$ and shell-six vector $\mathbf k$, the accepted general response calculation gives

$$
\mathbf y_i=-\frac{g\mathbf k k_3}{180}\theta^5+O_g(\theta^6),
$$

because the polarity product is positive and $\|\mathbf k\|^4=36$. This coefficient is nonzero. Together with the accepted 78 nonconstant histories, it gives exactly 102 over the full continued interval. A reception count is not being substituted for a proof of nonconstant motion.

For generated channels, each center's squared-distance-two shell has nearest-neighbor receivers at squared distances one, three and five, respectively with 6, 8 and 24 labels and multiplicities 4, 3 and 1. Thus each center supplies $6\cdot4+8\cdot3+24\cdot1=72$ channels to 38 receivers. The two receiver sets have opposite lattice parity and are disjoint. This reconstructs 144 channels to 76 receivers. Every receiver at squared distance three or five is already in the old set; the unit-distance receivers also belong to that set through the other center, except for the two targets. Hence $\mathcal R\setminus\mathcal A_6=E$. All labels outside $\mathcal A_6\cup E$ retain the unique stationary solution.

At the old-pulse endpoint, $|s_j(1/4)-(\sqrt2-9/8)|<1/1024$, so every environmental endpoint occurs well inside the accepted prefix. Applying the composed estimate with $p(1/4)=0$ gives $|t_{ij}(1/4)-(\sqrt2-1/8)|\le3/512$. Both endpoints of this enclosure lie after $H$ and before $H_*$. The monotone reception equations therefore have all eight completion roots on the new slab.

The later target channels come from the target's own squared-distance-two source shell. For target displacement $(x,0,z)$, minimizing over that shell means maximizing $k_1x+k_3z$ over signed permutations of $(1,1,0)$. Its maximum is $|x|+|z|$, proving the subject's envelope $\sqrt{2-2(|x|+|z|)+x^2+z^2}$. It identifies a future event family conditionally. Its positive-sign minimizing source labels are valid only under the signs explicitly stated; those signs are not established beyond the accepted interval.

## 5. Exact four-source comparison and actual separation criterion

Hold the four environmental receivers at their anchors only while evaluating the comparison acceleration. For $a=k_3\in\{1,-1,0,0\}$ let $r_a(v)=\sqrt{2-2ap(v)+p(v)^2}$ and $\theta_a(v)=v+r_a(v)-d_0$, $d_0=\sqrt2$. Its derivative is $D_a=1+(p-a)p'/r_a>0$ by the accepted pulse-speed bound. Thus $v_a(u)$ is the unique inverse of $\theta_a$, with $\theta_a(0)=0$ and $\theta_a(1/4)=1/4$.

The first-coordinate comparison acceleration is $g[r_a(v_a)^{-3}/D_a-d_0^{-3}]$. Twice integration from rest followed by the substitution $d\theta_a=D_a\,dv$ gives exactly

$$
Z_a(u)=\int_0^{v_a(u)}(u-v-r_a(v)+d_0)r_a(v)^{-3}\,dv-\frac{u^2}{2d_0^3}.
$$

Summing all four terms and splitting at the common emission time $u$ gives the subject's $H_3,H_2$ identity. Its stationary subtraction is correct: when $p=0$, the common-integral terms sum to $4(u-v)d_0^{-3}$, whose integral exactly cancels the four $u^2/(2d_0^3)$ terms. Every additional endpoint integral is nonnegative. If $v_a(u)>u$, then $u-\theta_a(v)\ge0$ on the forward interval. If $v_a(u)<u$, the integrand is nonpositive and the integration orientation reverses. No endpoint approximation is used.

Combining fractions directly gives

$$
H_2(a)=\frac{2(2+a^2)}{4+a^4}+\frac2{2+a^2}-2
=-\frac{2a^6}{(2+a^2)(4+a^4)}.
$$

For $H_3$, set $s=2+a^2$ and $b=2a/s$. The positive even binomial terms give a lower bound $4s^{-3/2}+15a^2s^{-7/2}-4d_0^{-3}$. Convex tangent bounds then give

$$
4s^{-3/2}-4d_0^{-3}\ge-12a^2d_0^{-7},
\qquad
15a^2s^{-7/2}\ge15a^2d_0^{-7}(1-7a^2/4).
$$

Adding proves $H_3(a)\ge a^2d_0^{-7}(3-105a^2/4)>0$ for the accepted nonzero pulse amplitudes. Thus $(u-v+d_0)H_3(p(v))-H_2(p(v))$ is nonnegative and strictly positive wherever the pulse is nonzero. Every initial interval $u>0$ includes a positive-measure set with nonzero pulse. The endpoint terms are nonnegative, establishing $\mathcal Z(u)>0$ for all positive comparison times, including both pulse lobes and both transverse sources.

For $u\ge1/4$, inverse uniqueness gives $v_a(u)=u$ and the endpoint terms vanish. Reflection of the pulse about $1/8$ changes its sign; the kernels are even. Hence $\int_0^{1/4}vH_m(p(v))\,dv=C_m/8$, proving $\mathcal Z(u)=(u+d_0-1/8)C_3-C_2$ with $C_3>0$ and $C_2<0$. The positive residual comparison velocity is $gC_3$.

For the pulse-square integral, $w=4v$ gives $I_0=4^{-9}\int_0^1w^8(1-w)^8(1-2w)^2\,dw$. The three beta integrals are related by $B(10,9)=B(9,9)/2$ and $B(11,9)=5B(9,9)/19$. Their combination is $B(9,9)/19$. Repeated integration by parts yields $B(9,9)=8!^2/17!$, so $I_0=1/1089735229440$. Integrating the lower bound for $H_3$ and using $p^2\le2^{-32}$ gives exactly $C_3\ge d_0^{-7}(3-105/2^{34})I_0$.

For the actual target equation, every source anchor vector has first coordinate zero. Its negative polarity product makes the first-component correction $U_{j,1}F_j+x(f_j-F_j)$. The accepted reflection identity gives $S_{0,1}(0,0,z)=0$, so the fundamental theorem in $x$ gives the stationary contribution in $b$. This reconstructs $x''=A+bx$ and the subject's exact error $\mathcal E$. Integration from $H$ gives

$$
\frac{d'(t)}2=x'(H)+g^2\int_H^t\mathcal Z(v-\beta)\,dv+\int_H^t\mathcal E(v)\,dv.
$$

The initial velocity is positive by the accepted separation theorem, and the comparison impulse is positive. The last integral has not been bounded with the necessary sign and size. Actual source receiver motion, unequal source times, transmitter/range weights and $bx$ all remain there. A negative lower bound for this identity would not prove approach, and its value at one final time would not exclude an earlier reversal. The subject preserves both distinctions. No actual sign beyond the accepted interval is added by this assessment.

## 6. Restricted local evolution lemma

On the same unit-spaced lattice, let complete supplied pasts through cut $a$ have displacement strictly below $B<1/2$ and speed strictly below $v_*<1$. Let only finitely many labels have nonstationary pasts and let deviations vanish before a common finite time $a_0$. The stationary receiver field is assumed $C^1$ on the uniform ball and zero at every anchor. Keep the same prescribed sum and polarity products. At fresh release, matching acceleration and jerk are additional compatibility conditions for a $C^3$ join; an interior cut already supplies them.

Choose a candidate step $h_0<1-2B$. Cross delay is at least $1-2B$, so every source time lies before $a$. Source speed below one makes its full-past residual strictly monotone and the root single valued. Positive range and transmitter denominator make the root map $C^1$; differentiating a source velocity value includes its acceleration. Each row correction is therefore locally Lipschitz in receiver position, and the prescribed infinite sum is the assumed regular stationary field plus finitely many such corrections.

Only finitely many receivers can sample a nonstationary source during the step. If source label $j$ has a nonzero deviation at received time $s\ge a_0$, then its receiver anchor obeys $\|i-j\|\le a+h_0-a_0+2B$. Each of finitely many source labels therefore affects a finite set of lattice labels. Include the original nonstationary labels in this set. Every complementary label has stationary initial data and the unique zero receiver solution. Local finite-dimensional ODE existence and uniqueness give the required evolution on the receiving set; strict initial margins allow a sufficiently short common step inside the ball. The self Lipschitz inequality excludes positive self roots. The compatibility conditions and differentiation of the equation give the stated smooth join.

The finite-horizon continuation criterion is sufficient with the subject's uniform positive displacement and speed margins, bounded source acceleration, bounded stationary field and receiver derivative, compatible cuts and a finite receiving set on that horizon. The lower delay floor supplies common method-of-steps intervals, while the bounded ODE coefficients permit extension. Original-class retention separately requires the explicit acceleration and jerk ceilings, as checked for the concrete control. Loss of a sufficient margin is not a nonexistence theorem in a larger domain.

This lemma applies to the finite disturbance of a fixed infinite background. It supplies neither continuity under independently changed infinitely many remote histories nor an unrestricted infinite-population summation law, fold treatment, self-root birth chart, regulator limit or global existence.

## 7. Verification, preservation and falsifiers

Claim grade: measured for the following bounded checks. Before reconstruction and after writing this report, `shasum -a 256 -c` passed `.tmp/mec-008-next-feedback/subject-review.sha256` and `.tmp/mec-008-next-feedback/frozen-inputs.sha256`, covering the subject and eight scientific inputs. The final receipts are retained in `independent-review/subject-preservation.txt` and `independent-review/input-preservation.txt`. A changed manifest entry overturns the associated byte-preservation claim and requires assessment of that delta before this disposition is applied to changed material.

The independently authored `independent-review/arithmetic.mjs` uses exact BigInt fractions. Its `known` mode passed signed fraction operations, a reversed-order rejection, the known integral of $1+2t+3t^2$ on $[0,1]$, twice integration of $2+6t$ at $t=1$, and $8!=40320$. That pass was recorded in `independent-review/known.txt` and read before its target mode was run. Its target mode passed the displayed coefficient and continuation comparisons, the endpoint fractions, pulse-square factorial evaluation and timing inequalities using radical enclosures proved by rational squares; the receipt is `independent-review/arithmetic.txt`. The instrument checks arithmetic, not EOM trajectories or the theorem independently of this analytical reconstruction.

The reviewer authored only this report and its own `independent-review/` scratch files. No subject, reference, manuscript, tracker, accepted instrument, generated artifact, EOM solver file or Git state was intentionally modified. The subject and input manifest receipts delimit the measured preservation claim; they do not inventory every other concurrently edited repository file. `git diff --no-index --check /dev/null .tmp/mec-008-next-feedback/review.md` emitted no whitespace diagnostic and returned 1 for the new-file difference.

Operator-checkable falsifiers are specific to each supported step: an emission time exceeding the accepted prefix or an active nonnearest generated channel defeats the source reduction; a failed exact acceleration or strict displacement comparison defeats this continuation estimate; a second positive cross root or any positive self root defeats the complete residual proof; a violated original class ceiling defeats retention; a missing integer intersection or a moving endpoint outside the proved enclosures defeats the corresponding census or ordering; a missing term or incorrect sign in the exact four-source integral defeats comparison positivity; and a missing term in the actual signed impulse defeats the separation criterion. For the reusable lemma, a finite disturbance with the declared margins and regular stationary field but no local bounded receiver ODE continuation would refute the statement. None of these falsifiers is a claim that the unchanged law fails outside the proved domain.

The strongest next proof target is a signed bound on the integrated $\mathcal E$ for every intermediate time through $\tau_{\rm end}$, with no reduction of $0<g\le16$. Its bound must retain common-motion cancellation and all four source channels. The positive comparison supplies a usable reference, while the existing coarse continuation norms cannot decide that much smaller relative response.
