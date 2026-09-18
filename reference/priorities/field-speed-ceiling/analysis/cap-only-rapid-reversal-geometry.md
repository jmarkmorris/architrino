# Cap-only rapid reversal with updated causal geometry

**Date:** 2026-09-15. **Status:** exploratory analytic test; no event or reception rule adopted. **Grade:** derived geometry and acceleration directions on the stated candidate paths; full cap-only evolution unresolved. **Scope:** isolated, opposite-polarity, mirror-collinear pair, $c_f=1$, incoming capped history of duration $L>0$.

## Question

Can a singular partner contribution reverse a receiver from speed $+1$ to speed $-1$, leaving a bounded velocity under the cap? A supplied acceleration pulse can do so, as the [bounded-reception discussion](exploratory-bounded-reception-functional.md#alternative-raised-by-the-operator-constrain-velocity-rather-than-bound-the-kernel) demonstrates. The present calculation replaces that prescribed pulse with the causal geometry of the actual mirror history. It finds a persistent nonordinary partner family on the exact rebound ray, directed against the rebound velocity. Smooth finite-duration turns miss that old family, so their limiting geometry cannot alone establish a limiting acceleration law.

This result neither proves rebound impossible nor selects rebound. It identifies why the supplied-pulse example does not yet construct a solution of the Master Equation plus cap.

## Retained history and arbitrary right path

Place crossover at $t=0$ and let the incoming paths be

$$
X_1(s)=s,\qquad X_2(s)=-s,\qquad -L\le s\le0.
$$

Receiver 1 has an absolutely continuous candidate position $x(t)$ with $x(0)=0$ and $|x'(t)|\le1$ almost everywhere; jumps in velocity at the event are not ruled out for this exploratory geometry. Mirror symmetry specifies $X_2(t)=-x(t)$ on the right. The older partner residual is

$$
g_{\mathrm{old}}(t,s)=|x(t)+s|-(t-s),\qquad -L\le s<0.
$$

The speed bound gives $|x(t)|\le t$, hence

$$
|x(t)+s|\le|x(t)|+|s|\le t-s.
$$

For $s<0$, equality holds precisely when $x(t)=-t$. This reproduces the exact [inherited-family dichotomy](inherited-partner-characteristic-family-disposition.md#general-right-trace-dichotomy-for-the-retained-partner-cap) without its later event-suppression convention:

- if $x(t)>-t$, no old cap emission is a partner root;
- if $x(t)=-t$, every old cap emission is a partner root.

The equality case implies maximum negative speed almost everywhere between zero and $t$, since

$$
t+x(t)=\int_0^t[1+v(u)]\,du=0
$$

and the integrand is nonnegative. Thus the exact ray requires immediate reversal at the event. Any genuine interval with $v>-1$ leaves a positive accumulated deficit that cannot subsequently decrease under the cap.

## Exact instantaneous rebound

### Sharp-law audit — 2026-09-16

**Scope:** only the sharp Master Equation, the authorized ceiling, and zero self response. Historical prescribed curves and auxiliary comparisons elsewhere in this note supply no dynamical evidence for this audit.

**Derived domain obstruction:** on the proposed rebound ray, the sharp residual $g(t,s)=|-t+s|-(t-s)$ is identically zero for $t>0$ and $-L<s<0$. Both first derivatives and all higher derivatives vanish on this open set. The canonical weight $1/|D_t|$ is undefined, and the sharp surface-delta representation has no standard pullback on this identically zero constraint. A formal $\delta(0)$ supplies neither an acceleration value nor an integrated velocity change. The obstruction persists when source and receiver intervals are restricted away from zero; it is not solely a zero-range collision defect.

The [finite-impulse fold result](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse) requires a nonzero quadratic source-time derivative and a transverse reception-time unfolding. This identically zero residual meets neither hypothesis. The fold result therefore supplies no response for this persistent family.

The [canonical law](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) has no receiver crossing-rate multiplier that switches acceleration off while riding a surface. Deleting previously encountered emissions or declaring them spent would add a response rule. This is one persistent contact set, not a derived sequence of repeated discrete hits. The once-passed geometric theorem does not settle persistent equality because no positive interior gap opens on this ray.

All old partner centers lie to A's right. The attractive kernel direction is positive; at outgoing velocity $-1$ the regular cap retains any finite positive acceleration because it reduces speed. Thus the cap does not justify ignoring the family, and its undefined magnitude cannot be called a definite braking acceleration. New partner emissions have residual $2s>0$ for $0<s<t$ and supply no roots on this ray. Self response is zero by the operator's premise.

**Disposition:** two requirements remain: derive the event update $\Delta v_A=-2$, $\Delta v_B=+2$, and supply an admitted sharp outgoing response for the persistent family. An event update at zero alone would not repair the undefined equation on the subsequent open rebound interval. The exact full-speed rebound ray is therefore not an admitted ordinary-root solution. This does not prove every discontinuous reversal with changing outgoing velocity impossible; such paths have different root sets.

**Verification and falsifier:** direct substitution, differentiation of the residual, comparison with the canonical weight and fold hypotheses, and the sign of the cap projection establish this scoped obstruction. An error in those calculations or a sharp-law theorem admitting this persistent family would overturn it. No smoothing, source depletion, or additional collision rule is used.

Take $x(t)=-t$ for $t>0$. Receiver 1 moves left, while all old partner emission centers $X_2(s)=-s$ lie to the right. At each old partner reception,

$$
r=t-s>0,\qquad \hat r=-1,\qquad V_2(s)=-1,\qquad v_1(t)=-1,
$$

so

$$
D_t=0,\qquad D_r=0.
$$

Opposite-polarity attraction has direction $+1$, toward those old centers. It opposes the receiver's negative rebound velocity. The cap would retain a finite contribution in that direction; it would not hold the receiver at $-1$ by suppressing it. This sign is opposite to the constant negative driving acceleration used in the supplied-pulse illustration after that illustration reaches $-1$.

The older family is not one ordinary root with a large finite coefficient. On the open two-variable set $t>0$, $s\in(-L,0)$, the residual is identically zero. Both source-time and receiver-time transversality fail. The delta integral cannot be evaluated by either simple-root collapse or the receiver-time atom calculation used at crossover. This failure persists at positive ranges, even if the source interval is restricted away from $s=0$. The family must not be assigned zero response merely because it is co-moving, nor may its undefined response be treated as a finite braking acceleration.

For new partner emissions $0<s<t$, the partner is at $+s$, and $g(t,s)=2s>0$; there is no new positive-time partner root on the exact rebound ray. The endpoint $s=0$ joins the nonisolated old interval, and the transmitter velocity has a corner there, so the simple isolated-endpoint calculation for straight passage cannot be reused. Post-event self emissions on the straight rebound ray also form a characteristic family; no complete finite ledger is claimed.

## Finite-duration reversal and its limit

### Rebound distance and approach symmetry

**Operator follow-up, 2026-09-15; zero self-action retained:** does singular braking on attempted passage imply a hard-sphere-like bounce, and would the rebound retrace the approach dynamically? The straight-trial result is an unbounded backward contribution as $t\downarrow0^+$, not a derived collision map. A finite velocity jump cannot be inferred by calling this an infinite kick. A hard-sphere collision rule would supply precisely the velocity update that this analysis has not derived; it is an analogy, not admitted dynamics.

If immediate full-speed rebound is prescribed, $x(t)=-t=x(-t)$ retraces the incoming cap positions, so the positions are time-reflected. The wake histories are not. For an old partner emission at $s=-\tau$ with $0<\tau\le L$, its center stays at $+\tau$, its radius after the event is $t+\tau$, and the receiver at $-t$ remains on that front. The same partner center attracts toward the right before and after the event, but the receiver's velocity changes sign. Before incidence this direction is forward and the regular cap suppresses speed increase; after rebound it is backward and the cap permits slowing. In addition, earlier histories remain retained and new emissions continue. No time-reversal symmetry of the full delayed dynamics follows from a reflection of these positions.

Each old front's geometric dilution factor on the prescribed rebound ray is $1/(t+\tau)^2$. This decreases with outbound time at fixed $\tau$, but does not supply an ordinary acceleration: the complete old family has $D_t=D_r=0$. Integrating only the radial factor would omit this reception degeneracy. With no justified partner-family response, neither an outbound distance nor an outbound stopping time can be calculated. Constant speed would imply distance $t$ only for as long as the prescribed full-speed ray persisted; persistence is the unanswered dynamical question. Reaching distance $L$ in time $L$ is a kinematic conditional, not a predicted symmetric return to the field-speed-arrival positions.

**Grade:** derived geometry and sign comparison; inferred failure of the proposed symmetry argument, not a universal irreversibility theorem. A full history-preserving event and reception calculation yielding a symmetric trajectory would establish such a special solution. This note provides none and introduces no rebound rule.

Suppose a candidate starts in the incoming direction and turns continuously over a positive time. Define its positional deficit relative to immediate rebound by

$$
d(t)=t+x(t),\qquad d'(t)=1+v(t)\ge0.
$$

Any interval with $v>-1$ gives $d>0$. Even if the receiver subsequently reaches $v=-1$, $d$ stays positive, and it never catches the exact ray $x=-t$. Therefore all older partner-cap roots remain absent. For a receiver already on the negative side, $g_{\mathrm{old}}=-d<0$ for every old cap emission: those fronts have already passed the receiver.

An explicit kinematic check is

$$
v_\epsilon(t)=\begin{cases}
1-2t/\epsilon,&0\le t\le\epsilon,\\
-1,&t\ge\epsilon,
\end{cases}
\qquad
x_\epsilon(t)=\begin{cases}
t-t^2/\epsilon,&0\le t\le\epsilon,\\
\epsilon-t,&t\ge\epsilon.
\end{cases}
$$

The paths obey the cap and $x_\epsilon(t)>-t$ for every $t>0$. After the turn, $d=\epsilon$. They converge uniformly on bounded time intervals to $x(t)=-t$, but no approximating path has an old cap root at any positive receiver time, whereas the limiting path has the whole old cap interval. These are test paths, not solutions of the coupled equations. The example proves discontinuity of this root census under path convergence, not nonuniqueness of actual evolution.

## Ordinary receptions during a finite excursion

### Labeled-front tracking and the meaning of a finite turn

A finite turn means that the change from $v=+1$ to $v=-1$ occurs over a positive duration $\epsilon$. It is a trajectory property, not a replacement equation. Prescribing a linear velocity change is a kinematic example, not a claim that the Master Equation produces it. A finite-width wake or core used to generate such a turn would instead be an explicitly auxiliary model whose relation to the sharp law must be proved. The earlier continuous-launch obstruction remains in force for its stated sharp-law class; no finite-turn solution has been constructed by drawing one.

For an arbitrary labeled emission at time $s$ and fixed center $C_s$, define its signed interior gap along a capped receiver path by

$$
d_s(t)=(t-s)-|x(t)-C_s|.
$$

For $t_2>t_1\ge s$, the triangle inequality and speed bound give

$$
d_s(t_2)-d_s(t_1)
\ge(t_2-t_1)-|x(t_2)-x(t_1)|\ge0.
$$

Thus once a front has genuinely passed the receiver, meaning $d_s>0$, it cannot meet that receiver again under the speed cap. This is a geometry theorem, not a source-depletion or one-time-response postulate. The zero set can be an interval when the receiver rides a front, so the theorem does not define the response during persistent equality.

For the old partner label $s=-\tau$, $C_s=\tau$, the front's left edge is $-t$. In the linear-turn diagnostic already displayed, the labeled tracking table is:

| Time | Receiver position $x_\epsilon$ | Velocity | Old front left edge | Gap from left edge |
| --- | --- | --- | --- | --- |
| $0$ | $0$ | $+1$ | $0$ | $0$ |
| $\epsilon/2$ | $\epsilon/4$ | $0$ | $-\epsilon/2$ | $3\epsilon/4$ |
| $\epsilon$ | $0$ | $-1$ | $-\epsilon$ | $\epsilon$ |
| $2\epsilon$ | $-\epsilon$ | $-1$ | $-2\epsilon$ | $\epsilon$ |

For each old label, the receiver is strictly inside the sphere at every positive time on this test path. During $0<t<\epsilon$, $|x_\epsilon(t)|<t$, so $|x_\epsilon(t)-\tau|<t+\tau$; at later times the exact interior gap is $\epsilon$. Every old label therefore has one arrival at $t=0$ and no later intersection. This tracks receptions rather than inventing a numerical hit counter or attributing a finite acceleration impulse to an individual source-time label.

The table exposes an additional limitation of the drawing: because both mirror receivers initially pass the origin and then turn back, they meet a second time at $t=\epsilon$. A coupled calculation must classify that new coincidence and its newly emitted fronts too. The original old family is already strictly inside and does not reappear at this second meeting. The prescribed example must not be mistaken for a one-collision solution.

As $\epsilon\downarrow0$, the trajectories converge to immediate rebound while their positive old-front gaps vanish. For every finite member the old label is encountered only at zero, whereas the limiting path remains on that front. Evaluating intersections on the limiting path therefore changes the reception set. Calculus does not require counting a past crossing again; it requires proving which limit of the labeled response defines an event when the geometry becomes singular. A finite velocity jump would require a well-defined integrated constrained acceleration through the shrinking interval, not an unexplained product of infinite acceleration and zero time. The gap theorem proves no repeated crossing after passage; it does not construct that event integral.

### Operator clarification: a finite turn does not land on the old family

The operator's proposed resolution is that reversal occurs over a positive $\Delta T$, however small, rather than as a velocity jump at precisely $t=0$. This is geometrically correct as a distinction from the exact rebound ray. On the left-going side, an old partner front emitted at $s=-\tau$ has edge position $-t$. A receiver reversing over a positive interval has

$$
x(t)-(-t)=d(t)=\int_0^t[1+v(u)]\,du>0
$$

whenever $v>-1$ on a set of positive duration. For that front the receiver then lies inside the expanding sphere rather than on its left edge. Once the receiver reaches $v=-1$, the positive gap remains constant; at any slower leftward speed it grows. Thus no old capped partner front is re-encountered. The linear velocity-turn example above gives $d(\Delta T)=\Delta T$, not zero.

The exact zero-duration limit must nevertheless be distinguished from every finite member. If $\Delta T\to0$ and the gaps tend to zero, the limiting positions can be the characteristic ray even though no approximating receiver rides it. Substituting the limiting path directly into the sharp reception law is therefore not a justified replacement for taking the limit of the coupled finite-turn response. This observation supports examining finite-turn evolutions first; it does not prove that such evolutions exist under the unchanged singular law.

In particular, the complete positive-side ordinary launch analysis excludes a continuous launch exactly from incidence in its stated sharp-law class. A finite-turn diagnostic must exhibit its actual causal evolution or declare its auxiliary resolution. Also, the older partner family's direction at incidence is forward relative to the incoming motion; the negative acceleration that reverses a receiver is not established merely by citing the size of that forward family. The outgoing partner contribution is the separately identified braking candidate. No sign, event impulse, or reversal outcome is assumed by this geometric clarification.

For new partner emissions on a general mirror continuation,

$$
g_{\mathrm{new}}(t,s)=|x(t)+x(s)|-(t-s),\qquad 0\le s<t.
$$

At every separated receiver event with $|x(t)|<t$ and $x(t)\ne0$, the endpoint signs are

$$
g_{\mathrm{new}}(t,0)<0,\qquad
g_{\mathrm{new}}(t,t)=2|x(t)|>0.
$$

Continuity therefore gives a new partner root in $(0,t)$. Where this root is simple, put $n=\operatorname{sign}(x(t)+x(s))$. Its unchanged ordinary contribution is

$$
a_{1\leftarrow2}(t)
=-\frac{K n}{(t-s)^2|1+n v(s)|}.
$$

This formula uses the source velocity at the actual emission time. It is not in general the straight-trial expression $-K/(2t^2)$. Root isolation, additional characteristic families, self reception, repeated coincidence, and the complete sum must be checked along an actual solution before projecting that sum onto the cap. The endpoint sign argument establishes existence of a root, not ordinary admissibility or a complete dynamics theorem.

## Verdict and verification boundary

The operator's bounded-velocity idea remains mathematically viable in principle; a speed cap can bound velocity despite large driving acceleration. The exact mirror rebound is not established by that observation: it puts the receiver on a full partner characteristic family whose attractive direction opposes rebound and whose canonical sharp integral remains undefined as an ordinary response. Smooth rapid turns and instantaneous rebound have different root censuses, so the former cannot justify the latter by path convergence alone.

Verification here is direct substitution, the speed-bound triangle inequality, exact integration of $1+v$, and the intermediate value theorem for the new-root sign test. No numerical experiment or separately selected smoothing law was used. Falsifiers are a capped candidate with an old root but $x(t)\ne-t$, an error in the polarity direction, or a failure of the endpoint signs under their explicit separation hypotheses. An independently established canonical treatment of the characteristic family could resolve the dynamical obstruction and would require this status to be revisited.

The next target is a declared cap-compatible near-event limiting calculation that tracks the full ledger and proves convergence of its response, not just its paths. A smoothing used for that purpose is diagnostic until independence from its unadopted choices is established. No bounded kernel, frozen-front suppression, zero-impulse event, or automatic rebound has been adopted.
