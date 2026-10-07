# Independent reconstruction of the alternating-gap equations

## Verdict and exact scope

**Derived verdict:** the [frozen alternating-gap formulation](overnight2-c-alternating-gap-next-step.md), including its cyclic indices, complete source count, and derivative of $B_v$, is correct. It represents three neutral antipodal unit-polarity pairs on a common circle, with six distinct simultaneous positions, alternating cyclic polarity, $0<v\le1$, $K_{\log}=c_f=1$, and the unchanged transmitter factor. No mathematical defect was found. The independently reconstructed six scalar equations retain the same linked present phases and all ordinary positive-delay roots.

This is a verification of an exact reformulation, not an exclusion, an admitted equilibrium, or a proof that the paired curve is injective or convex. The earlier necessary speed restriction may subsequently restrict the speed domain; the algebra here holds on the stated larger interval $0<v\le1$. No numerical search or instrument was used.

## Recovering the simplex from the six original paths

Start with persistent original pair labels $k=1,2,3$ and complete paths

$$
X_{k,s}(t)=s a\exp\bigl(i(ut+\phi_k)\bigr),\qquad s\in\{+1,-1\},\quad t\in\mathbb R.
$$

The polarity of $X_{k,s}$ is $s$. Logarithmic scale covariance permits $a=1$, scaling time by the same factor and retaining speed $v=ua$; thus the normalized angular rate is $v$. Choose a fixed permutation of the original pair labels so their positive endpoints are indexed $i=1,2,3$ in counterclockwise order. This is an indexing convention with a fixed inverse map to persistent labels, not a reassignment of physical polarities. Choose phase representatives $\theta_1<\theta_2<\theta_3<\theta_1+2\pi$ and put $\theta_4=\theta_1+2\pi$.

Define $G_i=\theta_{i+1}-\theta_i$ cyclically. Alternation and antipodal pairing imply $0<G_i<\pi$, while $\sum_iG_i=2\pi$. The complements $\xi_i=\pi-G_i$ therefore satisfy $\xi_i>0$ and $\sum_i\xi_i=\pi$. Conversely any point of this open simplex yields the positive phases, after a common rotation,

$$
\theta_1=0,\qquad \theta_2=\pi-\xi_1,\qquad
\theta_3=2\pi-\xi_1-\xi_2=\pi+\xi_3.
$$

Adding $\pi$ to these phases supplies their negative antipodes. Every $G_i$ is strictly between zero and $\pi$, so no two positive endpoints coincide or are antipodal; all six member positions are distinct. Exactly one negative endpoint lies in each positive-to-positive gap, proving alternation. Hence the simplex represents the full ordered alternating phase domain. Choosing a different positive endpoint as the start cyclically permutes its coordinates. For preassigned original labels, their fixed ordering permutation must accompany this chart; the phrase “one simplex” does not assert a unique chart with the original numerical labels already sorted.

## Full-history chart and source count

At a receiver rotated to phase zero, a source at clockwise emission separation $\alpha\in(0,2\pi)$ has chord $\tau=2\sin(\alpha/2)$ and direction $(\sin(\alpha/2),\cos(\alpha/2))$ in the outward-radial, positive-rotation-tangential frame. The present clockwise separation $\beta$ satisfies

$$
\beta=H_v(\alpha)=\alpha-2v\sin(\alpha/2),\qquad
D=H_v'(\alpha)=1-v\cos(\alpha/2)>0.
$$

For completeness, every possible positive causal delay is at most two, the circle's diameter. The circular phase relation initially gives $\beta\equiv H_v(\alpha)\pmod{2\pi}$, but $0<H_v(\alpha)<2\pi$ for $0<\alpha<2\pi$ and $v\le1$. Thus no additional winding branch is lost in writing equality. The endpoint values $H_v(0)=0$, $H_v(2\pi)=2\pi$, together with strict interior monotonicity, give exactly one root for each distinct partner. For self reception the present separation is zero modulo $2\pi$, which is not an interior value of $H_v$; there is no positive self root. This remains true at $v=1$, where $D>0$ at every distinct-partner hit.

The selected logarithmic law consequently gives each partner row

$$
(A_{ij,r},A_{ij,t})=\frac{q_iq_j}{2}\bigl(R_v(\beta_{ij}),B_v(\beta_{ij})\bigr),
$$

where $R_v=1/D$ and $B_v=\cot(\alpha/2)/D$. Five partners at each of six receivers give thirty directed roots. Evaluating the fifteen roots at positive receivers determines the other fifteen by half-turn polarity symmetry, including their local component equations. Smooth pointwise roots at $v=1$ do not by themselves establish a uniform factor bound near a collapsing simplex edge.

## Reconstructing the indices by enumerating the five sources

Fix positive receiver $i$. Its preceding positive endpoint has phase difference $-G_{i-1}$; its following positive endpoint has phase difference $G_i$. Reducing the clockwise present separations to $(0,2\pi)$ gives the following full inventory. Every row is a distinct persistent member; $i-1$ and $i+1$ are cyclic indices.

| Source | Polarity product | Clockwise present separation |
|---|---|---|
| Preceding positive endpoint $i-1$ | $+1$ | $G_{i-1}=\pi-\xi_{i-1}$ |
| Its negative antipode | $-1$ | $G_{i-1}+\pi=2\pi-\xi_{i-1}$ |
| Following positive endpoint $i+1$ | $+1$ | $2\pi-G_i=\pi+\xi_i$ |
| Its negative antipode | $-1$ | $\pi-G_i=\xi_i$ |
| Receiver's own negative antipode | $-1$ | $\pi$ |

Grouping the first two rows gives $\tfrac12(P_v(\pi-\xi_{i-1}),Q_v(\pi-\xi_{i-1}))$. Grouping the next two gives $-\tfrac12(P_v(\xi_i),Q_v(\xi_i))$. The last gives $-\tfrac12(R_v(\pi),B_v(\pi))$. Consequently the complete sums are

$$
2A_{i,r}=P_v(\pi-\xi_{i-1})-P_v(\xi_i)-R_v(\pi),
$$

$$
2A_{i,t}=Q_v(\pi-\xi_{i-1})-Q_v(\xi_i)-B_v(\pi).
$$

The prescribed normalized circular acceleration is $(-v^2,0)$. Equating these components and moving the own-antipode terms to the right yields exactly the subject's six equations:

$$
P_v(\pi-\xi_{i-1})-P_v(\xi_i)=R_v(\pi)-2v^2,
$$

$$
Q_v(\pi-\xi_{i-1})-Q_v(\xi_i)=B_v(\pi),\qquad i=1,2,3.
$$

All arguments of $P_v,Q_v$ are in $(0,\pi)$. In addition the simplex imposes $\pi-\xi_{i-1}=\xi_i+\xi_{i+1}>\xi_i$; subsequent reasoning must preserve this correlation. A solution of these equations in the declared chart would satisfy the complete prescribed circular equations at every reception time by rotational covariance and the antipodal symmetry. Their verified formulation does not establish that such a solution exists.

## Independent derivative calculation

Set $x=\alpha/2$, $s=\sin x>0$, $c=\cos x$, and $D=1-vc>0$. Then $B=c/(sD)$ and $d\beta/dx=2D$. Direct differentiation gives

$$
\frac{dB}{dx}
=-\frac{D+vc s^2}{s^2D^2}
=-\frac{1-vc^3}{s^2D^2},
$$

and therefore

$$
\frac{dB_v}{d\beta}
=-\frac{1-v\cos^3(\alpha/2)}{2\sin^2(\alpha/2)[1-v\cos(\alpha/2)]^3}.
$$

If $c<0$, the numerator exceeds one. If $0\le c<1$, then $vc^3<1$ for $0<v\le1$. The numerator is therefore strictly positive throughout the interior, and $B_v$ is strictly decreasing. Independently, $dR_v/d\beta=-v\sin(\alpha/2)/(2D^3)<0$. Both paired functions $P_v(\beta)=R_v(\beta)-R_v(\beta+\pi)$ and $Q_v(\beta)=B_v(\beta)-B_v(\beta+\pi)$ are consequently positive for $0<\beta<\pi$.

These positivity statements concern each paired function's value. They do not prove monotonicity of those paired functions or determine the sign of the differences at the two linked arguments in the balance equations. They supply no injectivity or convexity assertion for $C_v=(P_v,Q_v)$. The joint vector equation $C_v(\pi-\xi_{i-1})-C_v(\xi_i)=(R_v(\pi)-2v^2,B_v(\pi))$ is exactly the two scalar equations together, with no additional independence among their variables.

## Independent hand controls

For an asymmetric index check, choose $(\xi_1,\xi_2,\xi_3)=(\pi/6,\pi/3,\pi/2)$. Reconstructing the original present phases gives positives $(0,5\pi/6,3\pi/2)$ and negatives $(\pi,11\pi/6,\pi/2)$. Direct subtraction of these phases gives the five separations below, in the source order of the preceding inventory:

| Receiver phase | Preceding positive | Its antipode | Following positive | Its antipode | Own antipode |
|---|---|---|---|---|---|
| $0$ | $\pi/2$ | $3\pi/2$ | $7\pi/6$ | $\pi/6$ | $\pi$ |
| $5\pi/6$ | $5\pi/6$ | $11\pi/6$ | $4\pi/3$ | $\pi/3$ | $\pi$ |
| $3\pi/2$ | $2\pi/3$ | $5\pi/3$ | $3\pi/2$ | $\pi/2$ | $\pi$ |

This checks every cyclic receiver, including the wrap from receiver one to its preceding endpoint three, without assuming the reduction being checked. For the regular alternating hexagon $\xi_i=\pi/3$, each receiver's five-source set reduces to positive sources at $2\pi/3,4\pi/3$ and negative sources at $\pi/3,\pi,5\pi/3$; the three equations then coincide as required by rotation symmetry.

At the independently known static limit $v=0$, the geometric chart gives $R_0=1$, $P_0=0$, $B_0(\beta)=\cot(\beta/2)$, and $Q_0(\beta)=2\csc\beta$. The reduced radial equation becomes $0=1$, correctly encoding the nonzero static radial sum $-1/2$. The reduced tangential left side is $2\csc\xi_{i-1}-2\csc\xi_i$, agreeing with direct pairing of static chord rows. At emission angle $\alpha=\pi$, the derivative formula gives $dB_v/d\beta=-1/2$ for every admitted $v$, since $s=D=1$ and $c=0$. These controls are hand-derived identities; no Python or numerical target was run.

## Falsifiers, provenance, and preservation

The formulation would be falsified by a discrepancy between a source's direct clockwise phase subtraction and the five-row table, a missing positive causal root, a partner factor losing positivity inside the declared chart, or a direct derivative calculation disagreeing with the displayed $B_v'$ formula. A root of a reduced system constructed with independent causal angles or incorrectly permuted persistent labels would not test the stated linked simplex. No global sign, convexity, existence, exclusion, or stability conclusion is promoted from this reduction.

The source SHA-256 measured with `shasum -a 256` was `d6a326910e68870da52268fddf7204e3f80599eec3716dbbd8d0889c00cbc01a`. Startup reread the live `AGENTS.md`, generated router, theorem-review owner, review-skill owner, Ramon E. Moore role, current second C report, second-allocation plan, and the selected logarithmic law. The dedicated parent instruction authorizes this new review artifact while preserving the subject and every main/shared owner.

The live clock returned 2026-10-07 06:32:56 UTC. The report and plan retain launch 03:25:15 UTC, exploration stop 13:55:15 UTC, and hard deadline 15:25:15 UTC on October 7. Only this new independent-review Markdown file was written for this assignment. No numerical search, additional worker, subject edit, main-report edit, shared-owner edit, Git mutation, or recursive delegation was performed. The parent owns integration and any next theorem selection.
