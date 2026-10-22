# Member 1 of release C1 after the meeting: it rides away at wake speed and never hears the meeting (ceiling-contact open research, obligation 10)

**The equation in this record is the field-speed ceiling variant, not the Master Equation**, under its frozen specification ($K=c_f=c_a=1$, ordinary partner rows at their original weight, zero self acceleration, the inclusive response applied after summation), together with the operator-selected rule P1 at the meeting. P1 is terminal coincidence: the paths of members 0 and 2 end at the coincidence instant $t^\ast$; wakes they emitted before $t^\ast$ continue to propagate and enter other rows at their original weight; no row from or to them is admitted after $t^\ast$. The selection and its exact scope are in the [variant index](../../equation-variants/README.md), in its paragraphs of 2026-10-20 and 2026-10-21. Nothing else is selected.

This record answers obligation 10 of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status), "Member 1's motion after the inferred coincidence", which the operator directed on 2026-10-21. Times are in units with $c_f=1$ unless marked as periods $P=1.282228$; sizes are $0.196735$.

## 1. Result

**Member 1 is pushed up to wake speed shortly after the meeting, then rides the ceiling straight away from it, and never receives any wake emitted later than about $0.59\,P$ (measured to 100 time units after the meeting; the limit derived for a straight ride at wake speed).** At the last stored node before the meeting, member 1 is $0.4276$ from the meeting point and moving at $0.8627$. It continues under the pair's earlier wakes. It reaches wake speed at $0.98752\,P$, $0.1445$ time units after $t^\ast$, and stays at the ceiling for the rest of the run, within $9\times10^{-13}$ of unit speed. Its velocity turns toward the outward radial direction, which it has reached to within $2.0\times10^{-3}$ radians at a distance of $100$.

A receiver moving at wake speed away from a source hears that source at an emission time that advances ever more slowly, because the delay grows almost as fast as time does. Here the two emission times member 1 receives freeze:

| Member 1's distance from the meeting point | Emission time received from member 0 | from member 2 |
| --- | --- | --- |
| $0.43$ (start) | $t^\ast-0.541$ | $t^\ast-0.472$ |
| $\approx17$ ($16.6\,P$) | $t^\ast-0.4184$ | $t^\ast-0.3623$ |
| $\approx47$ ($37.4\,P$) | $t^\ast-0.4177$ | $t^\ast-0.3615$ |
| $\approx100$ ($78.9\,P$) | $t^\ast-0.4175$ | $t^\ast-0.3612$ |
| fitted limit ($a+b/T$) | $t^\ast-0.4172$, that is $0.5495\,P$ | $t^\ast-0.3609$, that is $0.5934\,P$ |

At those emission times members 0 and 2 were early in the breakup. Member 2 had reached the ceiling at $0.4598\,P$ and was climbing toward member 0. Member 0 was still on its circle and reaches the ceiling only at $0.7812\,P$. Member 1 therefore never receives any wake from the association, the spiral or the meeting. It continues to receive the pair's wakes from that earlier epoch, at a strength falling as the distance to the minus third power. Only the turning part of its summed row survives the response; the forward part is removed.

**Consequence for the continuation rule (derived from the above).** Member 1's entire future is determined by wakes emitted before about $0.59\,P$, long before the meeting at $0.8748\,P$. It is therefore independent of how the pair's last stretch before $t^\ast$ is represented, and, under this history, independent of the choice of continuation rule at the meeting: any rule that leaves the pair's emissions before $t^\ast$ unchanged gives the same member 1. P1's requirement that the run declare how the last stretch is represented and show its effect is met trivially. Three representations, described in Section 3, give final velocities identical in every digit.

**What dissociation means here.** In the study's vocabulary member 1 dissociates. Under P1 the dissociation is total and self-sustaining: member 1 leaves at wake speed, with its received emission time frozen, so the release ends with the pair gone at $t^\ast$ and member 1 receding at wake speed for ever, its motion shaped only by the configuration of about $0.55$ to $0.59\,P$. Its asymptotic velocity is $(0.8468,\,0.1292,\,-0.5160)$ in the case's frame. It moves outward and downward, $31^\circ$ below the plane of the original rotation.

## 2. Why the emission times freeze (derived)

For a row received by member 1 from a source $j$, the emission time $S$ advances at $dS/dT=D_r/D_t$. Here $D_r=1-\hat{\mathbf n}\cdot\mathbf V_1$ is the receiver factor, with $\hat{\mathbf n}$ the unit vector from the emission point to member 1, and $D_t=1-\hat{\mathbf n}\cdot\mathbf V_j(S)$ is the transmitter factor. At wake speed, $D_r=1-\cos\theta$, with $\theta$ the angle between member 1's velocity and the line from the emission point. On a straight path at unit speed with impact parameter $b$ about the emission point, $\theta\approx b/d$ at distance $d$. So $D_r\approx b^2/(2d^2)$, and since $d$ grows at unit rate,

$$
\int^{\infty}\frac{D_r}{D_t}\,dT\;\le\;\frac{1}{\min D_t}\int^{\infty}\frac{b^2}{2d^2}\,dd\;<\;\infty
$$

The emission time therefore tends to a finite limit $S_\infty$, and the rest of the source's history is never heard. The hypotheses are that member 1 stays at wake speed, that its path becomes straight, and that $D_t$ stays away from zero. The first two are measured over the run: the speed is one to $9\times10^{-13}$, and the acceleration falls as $d^{-3}$, so the total turning is finite. The third holds because the sources' speeds at the frozen emission times are below one. For all later times the first two are inferred, not proved. If member 1 ever dropped below the ceiling, $D_r$ would no longer vanish, its emission times would resume advancing, and it would eventually hear the spiral; nothing in the run suggests this. This is the "frozen branch" of the definition's [Section 2](../../equation-variants/field-speed-ceiling/definition.md#21-root-geometry-at-and-below-wake-speed): a receiver running at wake speed straight away from an emission point pauses the source clock.

## 3. Instrument, known cases and the P1 representation

**Instrument.** `ccor_member1.py` (new; numpy only) integrates member 1 alone, reading members 0 and 2 from stored history. Their history consists of:
- the exact rigid rotation for emission times $\le0$;
- the frozen finest blind-reference trajectory up to its node 16000, at $10^{-2}$ sizes;
- the implicit integrator's trajectory to $3\times10^{-8}$ sizes, whose last node is $6.0\times10^{-9}$ time units before $t^\ast$;
- for the last stretch, a declared representation.

The integrator is classical fourth-order Runge–Kutta with step doubling, at tolerance $10^{-12}$ in velocity and in position relative to the position. It lands on the ceiling by step rejection. After every step a riding member is projected to unit speed, as in Section 1.4 of the definition, and released if its forward part turns negative. Each source's admissible emission times are restricted to those at or before its declared end, and the step is limited so that the emission time advances by at most a fortieth of its remaining distance to that end. A floor of $10^{-13}$ on that advance lets the step cross the end instead of approaching it for ever.

**Known cases, asserted before the target.**
- *K1:* radial fall from rest at distance $10$ toward a static source. It matches the exact cycloid solution at $d\approx4$ to $5.1\times10^{-12}$, with energy conserved to $1.1\times10^{-12}$. The fall stops short of wake speed. An earlier version started at distance 1, where the receiver reaches wake speed at $d=2/3$ and rides the ceiling, so Newtonian energy conservation does not apply; that setup was replaced.
- *K2:* a source moving at speed $0.5$ whose path ends at $t=1$. The receiver's last nonzero and first zero acceleration bracket the exact switch-off time on its own path, and its acceleration is exactly zero afterwards. An earlier version had the admissible delay bracket reversed and was corrected before any target use.
- *K3:* member 1 integrated alone from $0.80\,P$ to $0.873\,P$, reading members 0 and 2 from the frozen finest trajectory, reproduces the stored member-1 path to $3.3\times10^{-12}$ in position and $1.1\times10^{-11}$ in velocity.
- *K4:* a receiver repelled from rest at distance $0.1$ by a static source reaches wake speed at $d=1/9.5$ to $8.5\times10^{-13}$. It then rides at exactly unit speed with zero transverse velocity, and energy below the ceiling is conserved to $7.6\times10^{-11}$.

**Representation of the last stretch, and its effect (the P1 requirement).** P1 requires the run to declare how the last stretch, from the final stored node to $t^\ast=0.8748416593740\,P$, is represented, and to show that its effect is below the run's tolerance. Three representations were run:
- the closed-form pursuit spiral about the final node's midpoint, fitted to that node, with rows omitted from emission times within $10^{-12}$ of $t^\ast$;
- the same spiral with a cutoff of $10^{-10}$;
- truncation of both paths at the final node.

The spiral joins the stored trajectory continuously: amplitude $0.99999998$ of the closed form, velocity mismatch $2.0\times10^{-8}$. The three runs give identical final positions and velocities in every printed digit, a difference of exactly zero. The reason is the result itself: member 1's received emission times never come within $0.36$ of the final stored node.

## 4. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| Member 1 reaches wake speed at $0.98752\,P$ and stays at the ceiling to 100 time units after the meeting | Measured; one new instrument of this model family, after four known cases | A different integrator of the same specification and history in which member 1 leaves the ceiling; `ccor-member1-*.json` |
| Its received emission times freeze at about $0.5495\,P$ and $0.5934\,P$ | Measured to 100 time units; limits fitted | Emission times that keep advancing toward $t^\ast$ in a longer run |
| A receiver riding straight at wake speed hears a source only up to a finite emission time | Derived (Section 2), given the stated hypotheses | — |
| Member 1's whole future is independent of the last-stretch representation and of the rule at the meeting | Derived from the frozen emission times; the three representations agree exactly (measured) | A run in which member 1 reads an emission time after the final stored node |
| Member 1 rides away for ever | Inferred beyond 100 time units | Member 1 dropping below the ceiling at a later time |

## 5. Validation, files and review status

Commands, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root:

```
python ccor_member1.py k
python ccor_member1.py target spiral 1e-12 spiral-scut1e-12 2400 100
python ccor_member1.py target spiral 1e-10 spiral-scut1e-10 2400 100
python ccor_member1.py target truncate 0 truncate 2400 100
```

Each target run took 73 to 86 seconds (2,131 steps, 152 rejected). Receipts `ccor-member1-k.json` and `ccor-member1-*.json`, trajectories `ccor-member1-*-traj.npz`, logs. A first set of target runs, made before the riding projection was corrected, let member 1's speed drift to $1+7\times10^{-12}$ and stopped too early to see the frozen emission times. Those receipts were overwritten by the corrected runs and their logs are not kept. Review status: self-review only.
