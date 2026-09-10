# Quintic Candidate at the Stationary Mirror Boundary

## Result and scope

The existing `CWB-rho5-lineage/v2` candidate admits a local existence-and-uniqueness construction on the exact stationary mirror input. Its newborn self branch can be reconstructed from the fixed incoming history, its diagonal origin can be proved without a numerical classifier, and its acceleration tends to zero at birth. The complete candidate equation then determines a unique short outgoing mirror history with continuous velocity and locally integrable acceleration. The construction below solves an integral equation; it does not prescribe the outgoing path or infer an evolved solution from a birth jet.

This is a **derived local result conditional on using the existing guessed candidate law**, submitted for independent mathematical adjudication. The [candidate definition](diagonal-birth-lineage-causal-wake-candidate.md), [MEC-007 owner](mirror-close-approach-causal-root-boundary.md), [stationary incoming ledger](../evidence/mec-007-stationary-mirror-incoming-ledger-2026-09-02.md), and [accepted self-boundary adjudication](mec-008-self-complement-independent-adjudication.md) remain fixed references. The candidate has not been adopted. No equation in the canonical corpus or EOM solver is changed, and no general admission class is restricted.

The result answers one named missing step: **does the existing quintic rule determine any local outgoing evolution on the stationary record whose unchanged continuation is obstructed?** The answer is yes in the mirror sector, for the exact candidate integral equation and the complete fixed incoming history. It does not establish a regulator-independent transition, continuation through release, general smooth lineage, an asymmetric perturbation theorem, or conserved accounts. The candidate remains incomplete under MEC-002/MEC-003, and the accepted MEC-007 obstruction remains valid under the unchanged sharp law.

## 1. Fixed input and the obstruction that must be preserved

Use normalized wake speed $c_f=1$. Translate absolute time so the accepted first receiver-speed event is at $T=0$; no rescaling or replacement of the incoming record is made. Write the mirror positions as $\mathbf X_-(T)=-q(T)\mathbf e$ and $\mathbf X_+(T)=q(T)\mathbf e$, where $\mathbf e$ is the fixed unit vector along the pair and $u=-q'$ is inward speed. The exact incoming history, denoted by $q_-$ and $u_-$ for $T\le0$, has

$$
q_-(0)=q_*>0,\qquad u_-(0)=1,\qquad 0\le u_-(s)<1\quad(s<0)
$$

The stationary earlier history and the incoming equation specify a whole history, not just terminal coordinates. Its retained partner bracket is complete, and there are no positive-delay self roots at $T=0$. Let $p_*<0$ be the partner emission at the event and let $K>0$ be the reduced magnitude of one ordered row. The two equal-magnitude polarities in this input give the same coefficient $K$ for the partner and self rows. Set

$$
R_*=-p_*>0,\qquad d_*=1-u_-(p_*)>0,\qquad
a_* = \frac{K}{R_*^2d_*}>0
$$

The last quantity is the left limit of inward acceleration. It is finite and positive because the partner root is simple and separated from the excluded diagonal. The accepted incoming oracle records approximately $K=0.2862286103053385$, $q_*=0.05150670314$, $R_*=0.29126461451$, $d_*=0.52804241579$, and $a_*=6.38952805202$. These are measurements from the cited ledger, not new interval enclosures. The proof uses the exact signs and regularity, not these rounded values.

The [accepted unchanged-law proof](../../../office-of-research/research-history/review-packets/master-equation-post-field-speed-existing-law-continuation-obstruction-2026-07-29.md) applies to every continuous genuine crossing on this history. For its newborn self root $s<0<T$, write $\delta=T-s$, $w_-=1-u_-(s)>0$, and $w_+=u(T)-1>0$. Its exact canonical measure is

$$
A_{\mathrm{sharp}}\,dT
=\frac{K}{\delta^2(w_-+w_+)}\,d\delta
$$

Both velocity gaps and the delay tend to zero at birth, so the signed inward integral and total variation diverge. No single value at the excluded diagonal removes that open-side divergence. The construction here explicitly uses the already-proposed factor $M_5$ on the diagonal-born stratum; it therefore changes a premise of that obstruction and does not falsify it.

Claim grade: **derived** for the stated exact input properties and unchanged-law consequence, using the accepted incoming and obstruction proofs; **measured** only for the quoted terminal numbers, by the stationary incoming oracle. Falsifiers are an additional admitted incoming root, failure of the declared stationary-history regularity or positive margins, or a finite unchanged complete self measure on this identical record. Agreement with a candidate-weighted measure is not such a falsifier.

## 2. Regularity supplied by the incoming equation

Only local information from the exact retained history is needed to construct the birth. Define its incoming acceleration by

$$
a_-(s)=u_-'(s),\qquad s<0
$$

Near the terminal section, $a_-$ extends to a positive continuously differentiable function on a one-sided closed interval $[-\eta,0]$, with $a_-(0)=a_*$. This is a consequence of the regular incoming delay equation. The partner emission near the terminal reception stays in an earlier evolved interval of the original stationary release, away from the initial activation corner and away from $D_t=0$. There $q_-$ is twice continuously differentiable and $u_-'$ is continuous. Differentiating the simple partner root and the regular row once therefore gives a finite continuous derivative of $a_-$ near the terminal reception. No continuation beyond $T=0$ is used to establish this fact.

The separation from the initial corner can also be checked without the oracle's rounded times. The original stationary input has half-separation $1/2$ and $u=0$ before its activation. While the partner emission is still in that stationary segment, the incoming equation is $u'=K/(q+1/2)^2$. Integration using $q'=-u$ gives

$$
u^2=2K\left(\frac{1}{q+1/2}-1\right)<2K<1
\qquad(q>0)
$$

The last strict inequality uses this input's exact specified $K<1/2$. The partner emission advances monotonically on the incoming chart, so it must have passed the initial corner before the positive-separation event $u=1$. Continuity then supplies an open earlier evolved interval around the terminal partner emission.

Consequently, after reducing $\eta>0$ if necessary, constants $a_0,a_1,L$ exist such that

$$
0<a_0\le a_-(s)\le a_1<\infty,
\qquad |a_-'(s)|\le L,
\qquad -\eta\le s\le0
$$

These constants bound an already specified history. They are not new admission axioms. The accepted complete stationary history, rather than a finite table of oracle samples, is the input of the theorem. A sampled interpolation cannot independently certify these bounds or replace that history.

For explicit root reconstruction put $y=-s\ge0$ and define

$$
\alpha(y)=a_-(-y),\qquad
w(y)=1-u_-(-y)=\int_0^y\alpha(r)\,dr,
\qquad
\phi(y)=\int_0^y w(r)\,dr
$$

Here $y$ is the distance backward in time to a self emission, $w$ is its incoming speed deficit, and $\phi$ is the corresponding excess of $X_{\mathrm{in}}-s$ above its event minimum, where $X_{\mathrm{in}}=-q$ is the left label's inward coordinate. These functions are fixed before any outgoing evolution is solved. They satisfy

$$
a_0y\le w(y)\le a_1y,
\qquad
\frac{a_0}{2}y^2\le\phi(y)\le\frac{a_1}{2}y^2,
\qquad
\phi'(y)=w(y)>0\quad(y>0)
$$

Thus $\phi$ has a unique continuous inverse for sufficiently small nonnegative arguments. Its inverse has an unbounded derivative at zero, which must be controlled before applying any existence theorem for a smooth ordinary differential equation.

Claim grade: **derived** from the regular incoming equation and the integral definitions. A failure of positive continuous incoming acceleration, loss of the earlier partner tube, or failure of either quadratic bound on the declared history would falsify this input reduction. No additional right-side differentiability assumption is made here.

## 3. Reconstructing the complete root set from the unknown displacement

Represent an outgoing path by its excess inward displacement $z$ beyond speed-one motion:

$$
q(T)=q_*-T-z(T),\qquad
u(T)=1+z'(T),\qquad z(0)=z'(0)=0
$$

This is a change of variables for the unknown path, not a prescribed trajectory. Once $z(T)>0$ is increasing, the newborn self root is exactly

$$
\phi(y(T))=z(T),\qquad s(T)=-y(T)<0,
\qquad \delta(T)=T+y(T)
$$

Indeed the causal condition is $X_{\mathrm{in}}(T)-X_{\mathrm{in}}(s)=T-s$, or equality of $X_{\mathrm{in}}(v)-v$ at emission and reception. Before the event this function decreases strictly; on an outgoing segment with $u>1$ it increases strictly. There is exactly one match in the complete incoming history and none between $0$ and $T$. All earlier incoming values outside a sufficiently small $[-\eta,0]$ interval have a positive gap above the event minimum, so taking $z<\phi(\eta)$ also excludes that older complement. The stationary tail introduces no unlisted root.

The partner emission $p=p(T,z)$ is the root in the retained incoming bracket of

$$
q_*-T-z+q_-(p)-(T-p)=0
$$

Its derivative with respect to $p$ is $1-u_-(p)>0$. The simple root at $(T,z,p)=(0,0,p_*)$ therefore extends to a smooth local function with $p<0$, positive range $T-p$, and transmitter factor bounded away from zero. Strict monotonicity on the complete earlier history excludes other incoming partner roots. For new emissions $0\le s<T$, the positive present half-separation gives a uniform positive gap in $q(T)+q(s)-(T-s)$ when the interval is sufficiently short. There are no new partner roots there.

Every constructed reception consequently has exactly the MEC-007 four ordered rows: one partner and one self row per receiver. The self root is simple for $T>0$, because $D_t=w(y)>0$, and has $D_r=-z'(T)<0$. Its direction and positive self polarity give inward acceleration. The negative playback changes emission traversal, not this sign.

### Local lineage and event ownership

For each ordered self channel the graph $(T,-\phi^{-1}(z(T)))$ is connected and unique on the open interval, and its closure meets the structural diagonal only at $(0,0)$. That is a direct incidence certificate for the candidate's `diagonal_birth` origin. There is no positive-delay fold, interval of roots, merger, accumulation, or root-rank choice on this chart. The event owner is the corresponding ordered self channel at this single diagonal event; the two mirror labels have distinct spatial event sites and distinct ordered owners despite sharing the same reception time. Their arbitrary identifier spelling has no dynamical effect.

This proves the local topological facts required by the candidate's lineage gate. It does not implement a general classifier or supply general MEC-005 ownership. The candidate still has to authorize the gate by its own proposed semantics. Setting the gate to `ordinary` on this certified diagonal-born branch would be a different rule and would recover the accepted sharp-law obstruction.

Claim grade: **derived** on the monotone outgoing neighborhood constructed below. A second admitted root, a positive-delay singular point, another possible origin for the unique graph, or a need to duplicate either ordered owner would falsify the local certificate. Its use outside this neighborhood is not asserted.

## 4. The exact candidate operator on this input

The collinear self direction is constant. The velocity component perpendicular to that direction vanishes, so the candidate's geometric derivative is

$$
G_t=-a_-(s)=-\alpha(y),\qquad |G_t|=\alpha(y)
$$

To avoid confusing the candidate's dimensionless coordinate with the delay called $\rho$ in MEC-007, write that coordinate as $\varrho$ here. It is precisely the same candidate quantity $r|G_t|$ in units $c_f=1$:

$$
\varrho=(T+y)\alpha(y)
$$

For the certified active birth lineage with $\varrho<1$, substitution of the existing $M_5(\varrho)=\varrho^5$ into the canonical row gives the exact inward self contribution

$$
\boxed{
S(T,z)=K\frac{(T+y)^3\alpha(y)^5}{w(y)},
\qquad y=\phi^{-1}(z),\quad T>0,\ z>0
}
$$

The partner row remains sharp:

$$
P(T,z)=\frac{K}{(T-p(T,z))^2[1-u_-(p(T,z))]},
\qquad P(0,0)=a_*
$$

It is positive, continuous, and locally Lipschitz in $z$: changing $z$ changes $P$ by at most a fixed constant times that displacement change within a sufficiently small neighborhood. Its first derivatives are bounded there. More explicitly, put $R=T-p(T,z)$ and $d=1-u_-(p(T,z))$. Implicit differentiation gives $\partial_zp=1/d$ and

$$
\partial_zP
=K\left\{\frac{2}{R^3d^2}
+\frac{a_-(p)}{R^2d^3}\right\}
$$

Positive lower bounds for $R$ and $d$, and a finite incoming acceleration bound near $p_*$, give the required finite derivative bound directly. The full candidate equation is

$$
z''(T)=P(T,z(T))+S(T,z(T))
$$

Both emissions are strictly before the event. In particular, the cached $\mathbf A^-_{j,e}$ used by $G_t$ is known incoming acceleration, not the unknown outgoing receiver acceleration. The equation is causal without a future lookup or a circular acceleration definition.

The self operator does not have a bounded extension to a whole rectangular neighborhood of $(T,z)=(0,0)$. At each fixed small $T>0$, its leading factor as $z\downarrow0$ is proportional to $T^3/\sqrt z$, and hence diverges. Finite acceleration on the candidate's prescribed quadratic history alone would not settle this problem. The useful domain is supplied dynamically by the positive partner acceleration: an actual solution leaves the event with $z$ bounded above and below by positive multiples of $T^2$. The next proof establishes that domain and solves the equation on it.

Claim grade: **derived** for the operator reduction and its full-neighborhood limitation; **guessed** for the unchanged candidate choice of quintic weighting. Direct substitution into the frozen candidate or differentiation of the causal geometry can falsify the displayed operator. A bounded full rectangular extension would falsify the stated domain limitation.

## 5. A contraction that constructs the outgoing history

The construction uses candidate accelerations as unknown functions and integrates them twice. This makes the necessary quadratic displacement control automatic during iteration while leaving the acceleration to be determined by the complete equation.

Fix $a_{\mathrm{lo}}=a_*/2$ and $a_{\mathrm{hi}}=3a_*/2$. On an interval $[0,\varepsilon]$, consider the closed set $\mathcal B$ of continuous functions $b$ satisfying

$$
b(0)=a_*,\qquad a_{\mathrm{lo}}\le b(T)\le a_{\mathrm{hi}}
$$

For each $b$ define

$$
z_b(T)=\int_0^T(T-r)b(r)\,dr
$$

These trial functions are an iteration space, not separately postulated outgoing paths. The fixed point will be the only member that satisfies the equation. The integral gives

$$
\frac{a_{\mathrm{lo}}}{2}T^2\le z_b(T)\le\frac{a_{\mathrm{hi}}}{2}T^2,
\qquad
\lambda T\le y_b(T)\le\Lambda T
$$

where $y_b=\phi^{-1}(z_b)$, $\lambda=\sqrt{a_{\mathrm{lo}}/a_1}>0$, and $\Lambda=\sqrt{a_{\mathrm{hi}}/a_0}<\infty$. Thus every trial root stays proportional to time after the event. Taking $\varepsilon$ sufficiently small keeps $y_b<\eta$, preserves the partner tube and positive present separation, and ensures

$$
\varrho_b\le (1+\Lambda)a_1T<1
$$

There is therefore no release event anywhere in the construction. The candidate's irreversible release rule is neither needed nor modified.

### Uniform self-row and derivative bounds

The exact self operator obeys

$$
0\le S(T,z_b(T))
\le \frac{K(1+\Lambda)^3a_1^5}{a_0\lambda}\,T^2
=C_S T^2
$$

The important derivative is with respect to the displacement $z$, with $T$ and the retained history fixed. Since $dy/dz=1/w(y)$, direct differentiation gives

$$
\partial_zS
=K\left\{
\frac{3(T+y)^2\alpha^5}{w^2}
+\frac{5(T+y)^3\alpha^4\alpha'}{w^2}
-\frac{(T+y)^3\alpha^6}{w^3}
\right\}
$$

Here $\alpha'=d\alpha/dy$; its sign is retained, and only its absolute bound is used. The three terms are respectively the range derivative, the derivative of the cached incoming acceleration, and the transmitter-factor derivative. None may be omitted. On $\lambda T\le y\le\Lambda T$ they give, for a fixed sufficiently small upper interval length $\varepsilon_0$,

$$
|\partial_zS|\le K\left\{
\frac{3(1+\Lambda)^2a_1^5}{a_0^2\lambda^2}
+\frac{5(1+\Lambda)^3a_1^4L\varepsilon_0}{a_0^2\lambda^2}
+\frac{(1+\Lambda)^3a_1^6}{a_0^3\lambda^3}
\right\}=L_S<\infty
$$

The segment between any two allowed $z_b(T)$ values remains in the same interval, so this derivative gives an actual uniform Lipschitz bound there. This is stronger than a derivative evaluated only on one prescribed birth jet. Write $L_P$ for the corresponding finite displacement Lipschitz bound of $P$.

### Existence and uniqueness inside the iteration space

Define the map

$$
(\mathcal T b)(T)=P(T,z_b(T))+S(T,z_b(T))\quad(T>0),
\qquad (\mathcal T b)(0)=a_*
$$

The value at zero is the continuous limit of the complete open-side expression, with zero self contribution. It does not admit a structural diagonal row or add an event impulse. Uniform continuity of $P$ and the bound $C_St^2$ imply, after shrinking $\varepsilon$, that $\mathcal T$ maps $\mathcal B$ into itself: for example, require $|P(T,z_b)-a_*|\le a_*/4$ and $C_S\varepsilon^2\le a_*/4$.

For two trial accelerations $b,c$, let $\|b-c\|_\infty$ denote their largest absolute difference on the interval. Double integration and the two Lipschitz bounds give

$$
|z_b(T)-z_c(T)|\le\frac{T^2}{2}\|b-c\|_\infty
$$

$$
\|\mathcal T b-\mathcal T c\|_\infty
\le \frac{(L_P+L_S)\varepsilon^2}{2}\|b-c\|_\infty
=\theta\|b-c\|_\infty
$$

Choose $\varepsilon$ also so $\theta<1$. Iterating $b_{n+1}=\mathcal T b_n$ from any member of $\mathcal B$ makes successive differences decrease geometrically. The sum of these differences is finite, so the iterates converge uniformly to a continuous member $b$ of the same closed set. The Lipschitz estimate allows passage to the limit and gives $b=\mathcal T b$. Any two fixed points have distance at most $\theta$ times that distance, and therefore coincide. This supplies the contraction argument directly.

The resulting $z=z_b$ is twice continuously differentiable, $q=q_*-T-z$ and $u=1+z'$ solve the full candidate equation, and $u(T)>1$ for every $T>0$. The previously established complete root census and active-lineage condition hold throughout the chosen interval. Both mirror receivers use this same scalar solution with opposite coordinate orientations. No independent choice of an outgoing acceleration, emission time, birth owner, or release status remains within the construction.

Claim grade: **derived local existence and uniqueness for the exact candidate on the fixed incoming mirror record**. A failure of the uniform derivative estimate or self-mapping condition, or two distinct fixed points satisfying the same complete equation and input, would falsify the result. The proof supplies an existence interval, not a numerically certified duration or an accepted EOM solver trajectory.

## 6. The quadratic domain is a consequence for regular solutions

Restricting the iteration space does not establish uniqueness unless other regular candidate continuations are shown to enter it. That step is available on this input. Consider any mirror-symmetric continuation with continuous velocity at the event, locally absolutely continuous velocity for $T>0$, the exact candidate row equation almost everywhere, complete root admission, and no added singular event update. Absolute continuity means that velocity changes on compact intervals are obtained by integrating the displayed acceleration, rather than by an unrecorded jump or singular measure.

Continuity keeps $q>0$ and $u>0$ sufficiently close to the event. The partner root persists with $P\ge p_0>0$, independently of whether $u>1$ has yet been proved. Every possible self chord points inward because the complete retained and short outgoing history are nondecreasing in the inward coordinate; self polarity and the candidate factor are nonnegative. Thus all defined self rows are nonnegative and

$$
u'(T)\ge p_0
$$

almost everywhere. Integrate first between positive times and then take the earlier time down to zero, using velocity continuity. It follows that

$$
u(T)-1\ge p_0T,\qquad z(T)\ge\frac{p_0}{2}T^2
$$

There is no waiting solution with $u=1$: it would contradict the persistent positive partner acceleration. Monotonic crossing now gives exactly the single self root and lineage of Section 3. Since $z(T)\to0$, its incoming emission distance $y=\phi^{-1}(z)$ tends to zero. The lower displacement bound implies $y\ge\sqrt{p_0/a_1}\,T$, so $T\le C y$ for a fixed constant $C$. Consequently

$$
0\le S(T,z(T))
\le \frac{K(1+C)^3a_1^5}{a_0}y^2
\le \frac{2K(1+C)^3a_1^5}{a_0^2}z(T)
\longrightarrow0
$$

The complete acceleration therefore tends to $P(0,0)=a_*$. Away from zero it is continuous, since the root is simple and the incoming functions are regular. It is bounded near zero, so taking the endpoint limit in its integral gives an absolutely continuous extension of velocity across the event and then a continuous acceleration extension with value $a_*$. Thus

$$
z(T)=\frac{a_*}{2}T^2+o(T^2)
$$

Every such regular solution enters $\mathcal B$ on a sufficiently short interval and equals the constructed solution there. This proves uniqueness as a local history germ: two allowed solutions agree after their intervals are shortened to a common neighborhood of the event. Finite jumps, arbitrary singular measures, undefined quarantined events, and nonsymmetric histories are outside this assertion. The candidate does not specify an extra impulse, and none is supplied here.

Claim grade: **derived uniqueness among the stated regular mirror candidate continuations**, rather than an assumed quadratic outgoing contact class. A continuous-velocity, complete, locally absolutely continuous candidate solution that evades the positive partner bound, the single incoming self match, or the endpoint acceleration limit would falsify the upgrade. Failure of an unproved nonsymmetric extension would not falsify this scoped theorem.

## 7. The birth jet is now an output

The incoming regularity gives $\alpha(y)=a_*+O(y)$, $w(y)=a_*y+O(y^2)$, and $\phi(y)=a_*y^2/2+O(y^3)$. The complete solution has $b(T)=a_*+O(T)$ because $P$ has bounded first derivatives and $S=O(T^2)$. Inverting the two quadratic expansions yields

$$
y(T)=T+O(T^2),\qquad
s(T)=-T+O(T^2),\qquad
\delta(T)=2T+O(T^2)
$$

$$
D_t=a_*T+O(T^2),\qquad
\varrho=2a_*T+O(T^2)
$$

The exact candidate row and derivative therefore have the limits

$$
\boxed{
S(T,z(T))=8Ka_*^4T^2+O(T^3),\qquad
\partial_zS(T,z(T))=4Ka_*^3+O(T)
}
$$

These reproduce the candidate's $k=1$ powers as consequences of the solved same-input equation. The higher odd-order and infinitely flat prescribed births do not govern this event: the nonzero value $a_*$ rules them out for every regular candidate continuation just proved. No new prescribed geometry is required.

The integrated self contributions to inward speed and displacement are respectively

$$
\int_0^T S(r,z(r))\,dr=\frac{8}{3}Ka_*^4T^3+O(T^4)
$$

$$
\int_0^T(T-r)S(r,z(r))\,dr=\frac{2}{3}Ka_*^4T^4+O(T^5)
$$

They are contributions within the complete equation, not a comparison with a separately prescribed partner-only path. The weighted delay measure also becomes

$$
S\,dT
=\frac{K\delta^3\alpha(y)^5}{w(y)+z'(T)}\,d\delta
$$

Along the constructed solution, its density is $Ka_*^4\delta^2+O(\delta^3)$, which is locally integrable. This is the exact location at which the frozen candidate removes the sharp-law divergence: its factor tends to zero with fifth order on the certified birth lineage. The complete acceleration remains inward, so this short continuation is neither braking nor rebound. It remains before coordinate coincidence and before release.

Claim grade: **derived asymptotics of the constructed candidate solution**. Different leading coefficients, nonintegrability of this identical weighted measure, or a regular solution with vanishing right acceleration would falsify these conclusions. These are neither unchanged-law nor numerical solver claims.

## 8. What is resolved and what still requires more input

| Question | Same-record result | Remaining boundary |
| --- | --- | --- |
| Does the existing quintic expression have a causal one-sided meaning? | Yes on this chart: the exact self root, emission acceleration, and active lineage are determined from incoming history and current displacement. | There is no bounded operator on an arbitrary full neighborhood of event state. The proof uses the dynamically established quadratic region. |
| Is the local diagonal origin identifiable? | Yes: one simple graph per ordered self channel, with only the diagonal endpoint in its closure. | General smooth events, root intervals, mergers, and accumulation remain outside this local certificate. |
| Does the candidate determine an evolved history? | Yes locally in the regular mirror sector, by contraction and the subsequent uniqueness upgrade. | This is a theorem about the guessed candidate, awaiting independent adjudication; it is not candidate adoption or EOM solver acceptance. |
| Is simultaneous mirror birth ambiguous? | No within this construction: the two distinct spatial events have separate ordered self owners and share the uniquely determined mirror history. | No theorem for general interacting simultaneous events is supplied. |
| Is the release rule used? | No: the construction proves $\varrho<1$ throughout a sufficiently short interval. | Existence, uniqueness, and lineage after the first $\varrho=1$ event remain unproved. |
| Is regulator independence established? | No regulator or approximation family is defined or run here. | A family must preserve or converge to this same integral operator and have compactness and uniform control; fixed-equation uniqueness alone does not establish those facts. |
| Is the full-history dependence eliminated? | No: the inverse $\phi^{-1}$ and partner tube use the exact incoming functions. | A terminal position, velocity, and finite collection of jets cannot replace complete incoming provenance and history. |
| Does MEC-004 obtain accounts? | No. | The candidate's independently rejected finite shell-account sector remains rejected. This assessment makes no account change. |

The missing regulator property is precise. If an approximation is claimed to select this continuation, its root lineage must stay correctly owned, its incoming data must control the sampled acceleration $a_-$, and its complete acceleration operators must approach the displayed $P+S$ on the dynamically allowed region with enough uniform control to pass through the integral equation. Convergence of positions or velocities alone does not control the fifth power of sampled incoming acceleration. A regulator family could alter that quantity, root incidence, or an event-supported update while agreeing at ordinary positive-delay points; none of those changes is ruled out merely by the fixed candidate's local uniqueness.

For a candidate approximation acting on the same acceleration-function space, the concrete missing estimate can be written as a uniform operator defect. If $b_n=\mathcal T_n b_n$ stays in $\mathcal B$, then the already-proved contraction gives

$$
\|b_n-b\|_\infty
\le\frac{\sup_{c\in\mathcal B}\|\mathcal T_n c-\mathcal T c\|_\infty}{1-\theta}
$$

This identifies exactly what convergence would suffice in that topology; it does not assert that any physical regulator or numerical history family has the numerator tending to zero, or that all admissible approximations stay in $\mathcal B$. No new regulator, admissible-history restriction, or constitutive rule is proposed to force those premises. For weaker convergence modes, a separate compactness and limit-equation argument is still needed.

Claim grade: **derived** for the fixed-operator result and the displayed defect inequality; **inferred** for retaining the broader continuation block, because the candidate supplies no verified approximation family or post-release event construction. A same-record independent regulator theorem with complete lineage and a unique common limiting equation would discharge that specific remaining obstruction. It would be additional evidence, not something already proved here.

## 9. Proposed integration and operator decision

The coordinator can integrate the following statement at priority-only mathematical grade after independent adjudication:

> On the exact accepted stationary mirror incoming history, the existing quintic lineage candidate has a local regular mirror continuation. Positive finite incoming partner acceleration yields a nondegenerate incoming speed deficit. Its integral supplies an invertible self-root history coordinate, giving an exact causal self operator with $O(T^2)$ magnitude and uniformly bounded displacement derivative on the dynamically enforced quadratic region. A contraction constructs the full outgoing solution, and positivity of the complete row sum shows every regular mirror candidate solution enters that region, proving local uniqueness. The diagonal-born graph and its ordered owner are uniquely identifiable on this chart. This is a result for the unadopted candidate law; the unchanged MEC-007 obstruction, general lineage and release problems, regulator-independence requirement, and failed account sector remain unchanged.

No operator decision is required to finish the authorized assessment. Adoption of `CWB-rho5-lineage/v2` as a physical boundary law would be a separate substantive decision, and this local theorem is insufficient grounds for it. The recommended immediate action is independent adjudication of Sections 2–6, especially the incoming regularity justification, complete root complement, derivative bound, and uniqueness upgrade. The candidate definition and its acceptance instruments should remain frozen during that review. Shared queue, priorities, brainstorming, work log, and synthesis are coordinator-owned and were not edited by this task.

| Assigned work | Disposition |
| --- | --- |
| Confront the accepted unchanged-law obstruction on the actual input | ✓ Done — preserved, with the modified premise stated explicitly. |
| Derive the exact candidate self operator and certify the local birth lineage | ✓ Done — Sections 2–4. |
| Determine local candidate existence and uniqueness | ✓ Done — Sections 5–6 give a proof submitted for independent adjudication. |
| Identify missing regulator, release, and full-history properties | ✓ Done — Section 8 separates proved local facts from unprovided convergence and later-event inputs. |
| Shared integration and independent acceptance | ○ Not done — coordinator-owned; proposed text supplied. |
| General boundary closure and candidate adoption | ○ Not done — outside this assessment and still unsupported. |

## 10. Validation and preservation record

The mathematical evidence is the explicit root reconstruction, complete sign and complement argument, derivative estimate, contraction, and uniqueness upgrade above. Structural checks and arithmetic controls do not independently adjudicate the theorem. The exact input equations and the candidate definition were not altered to obtain agreement.

Measured by `test ! -e` on the assigned report and scratch paths, neither existed before this task created them. Frozen mathematical inputs and acceptance instruments are copied under `.tmp/quintic-mirror-boundary-assessment/frozen/`; their source identities were recorded with `shasum -a 256` in `.tmp/quintic-mirror-boundary-assessment/input-sha256.txt`. The manifest includes the candidate, MEC-007, the accepted self-boundary adjudication, the incoming ledger and machine record, the unchanged-law obstruction, the canonical Master Equation, the incoming oracle, and the existing candidate analyzer and tests.

The project venv executed successfully through `"${AAA_VENV:-../.venv}/bin/python"`, reporting the repository-adjacent interpreter and `mpmath` 1.3.0. No system Python fallback is used. No EOM integration, outgoing prescribed trajectory, new regularizer, account construction, or generated write is part of this assessment.

The unchanged document checker was copied from the accepted self-boundary adjudication's scratch directory; `cmp` confirmed identical bytes. Before its target run, `node .tmp/quintic-mirror-boundary-assessment/check-document.mjs --known` returned the expected three mathematical expressions, one display, and one real file link, ignored inline and fenced code, and rejected bad TeX, an unmatched delimiter, a missing file, and trailing whitespace. Its receipt is `known-controls.json` in this task's scratch directory.

The task-local symbolic instrument was likewise run on known cases before its target: `"${AAA_VENV:-../.venv}/bin/python" .tmp/quintic-mirror-boundary-assessment/check-algebra.py --known` checked an elementary chain rule, the existing frozen quadratic candidate's magnitude and complete derivative, rejection of an incorrect coefficient, and selection from a synthetic known record. Its pass was recorded in `algebra-known.json` before the target call. This control reuses the existing analytical example solely to test the instrument; it supplies no outgoing prescribed trajectory.

Measured by the subsequent `check-algebra.py` target run, SymPy 1.14.0 accepted the exact candidate substitution, the complete three-term self displacement derivative, and the weighted delay measure. The existing finest incoming record's acceleration, recomputed from $K/(R_*^2d_*)$ using `mpmath`, differed from its printed value by approximately $1.99\times10^{-24}$, consistent with the record's finite printed precision. The resulting diagnostic coefficients are $8Ka_*^4\approx3816.61325$ and $4Ka_*^3\approx298.661593$; they measure arithmetic on the saved input, not a simulated outgoing history or a certified numerical interval. The full receipt is `algebra-check.json`.

Measured by `node --test --test-concurrency=1 tests/causal-wake-birth-lineage-candidate.test.mjs`, all seven existing candidate tests passed; the retained output is `frozen-candidate-tests.txt`. Those tests protect the frozen candidate's existing analytical and status boundaries. They do not prove the new existence-and-uniqueness theorem.

Measured by `node .tmp/quintic-mirror-boundary-assessment/check-document.mjs reference/priorities/master-equation-closure/analysis/quintic-mirror-boundary-assessment.md`, the report passes KaTeX syntax, dollar-delimiter balance, relative file-target existence, prohibited-terminology, and whitespace checks; the receipt is `document-check.json`. The report uses no fragment links requiring a separate anchor check. A final readback checked the incoming regularity argument, all root complements and signs, complete derivative, contraction constants, endpoint bootstrap, asymptotic coefficients, and candidate-versus-canonical boundaries. Reception notation uses absolute $T$ throughout, with transmitter-role subscripts $D_t$ and $G_t$ preserved.

Measured by `node scripts/validate-content.mjs --check --strict`, repository content validation completed with zero errors and zero warnings; its output is `strict-content-check.txt`. The command `git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/quintic-mirror-boundary-assessment.md` emitted no whitespace diagnostics. Measured by `shasum -a 256 -c .tmp/quintic-mirror-boundary-assessment/input-sha256.txt`, every frozen source and acceptance instrument still matches its initial bytes; the receipt is `input-preservation.txt`. These checks validate the authored surface and reference preservation, not the theorem's independent acceptance.
