# Field-Speed Ceiling: Geometry, Boundary Response, and Open Mechanisms

This synthesis examines the provisional hypothesis that $c_f$ is both the causal-wake propagation speed and an upper bound on every architrino path speed. The hypothesis is not canonical and supplies no continuation law by itself.

## Foundational Distinctions

A closed admissible velocity domain, a boundary reaction, an exact coincidence event, and a rule selecting an outgoing history are different mathematical objects. MEC-007's sharp-law obstruction establishes none of the latter three, and the absence of an admissible super-field-speed segment does not prove passage, rebound, or any other continuation.

The current proposed constrained-response picture forms a complete finite ordinary acceleration ledger before applying a radial normal-cone reaction to keep regular velocity inside the closed domain. Exact nonordinary coincidence families require a separately declared event classification. Even after such a classification, a continuation may remain multivalued.

Plainly: a speed limit says which velocities are allowed. It does not say what happens at the boundary or choose one future when several allowed futures exist.

## Exact-Mirror Continuation Boundary

The exact-mirror packet now distinguishes the incoming partner cap family, its trace-dependent right-hand presence, and the proposed zero-impulse coincidence convention. The focused [event-family construction](analysis/mirror-event-family-completion-and-right-trace.md), [selection analysis](analysis/exact-mirror-continuation-selection-analysis.md), and [delayed-ignition theorem](analysis/trailing-front-activation-dichotomy.md) own those results.

For every positive waiting time in the declared local class, a braking continuation shares the preceding straight history and then activates a new ordinary partner root. The straight trace is also compatible. This establishes conditional local nonuniqueness, not rebound, retention, stability, conservation, or physical realization.

Plainly: the proposed restart admits more than one local future. A new selection principle would be needed to choose among them.

## Strict-Inequality Variant: An Open Domain Is Not a Braking Law

Consider replacing the proposed closed domain by the strict open ball

$$
\mathcal B_{c_f}^{\circ}
=
\left\{\mathbf V:\|\mathbf V\|<c_f\right\}.
$$

Every admitted velocity is then an interior point. Its tangent cone is $\mathbb R^3$ and its Euclidean normal cone is $\{\mathbf0\}$. Therefore the current normal-cone construction would return the complete ordinary acceleration unchanged at every admitted state. If an ordinary mirror approach has a positive speed-increasing acceleration and reaches $\|\mathbf V\|=c_f$ in finite time, the strict inequality supplies neither a braking contribution nor a boundary state on which to define one; the proposed evolution simply leaves its admissible domain.

Plainly: “less than $c_f$” states which speeds are forbidden, but there is no greatest allowed speed immediately below $c_f$ and no boundary point inside the model where a reaction can switch on. A separate response law is required.

A fixed regulator $\|\mathbf V\|\le c_f-\varepsilon$ with $\varepsilon>0$ would be a different closed-domain model. Under the same least-change response, a purely speed-increasing collinear ledger is canceled only at $c_f-\varepsilon$, so the mirror partners coast at that sub-field speed and still reach coordinate coincidence. Taking $\varepsilon\downarrow0$ approaches the closed-ceiling cap geometry; it does not create braking or select turnaround.

The prescribed post-coincidence constant-speed test also shows why a sub-field passage does not automatically repair the event. In normalized units $c_f=1$, let the separating trial be $X_1(t)=ut$ and $X_2(t)=-ut$ with $0<u<1$, and let $K>0$ denote the attractive normalized partner coupling. Its unique post-event partner root is

$$
s(t)=\frac{1-u}{1+u}\,t,
\qquad
r(t)=\frac{2u}{1+u}\,t,
\qquad
D_t=1+u,
\qquad
D_r=1-u.
$$

The ordinary partner contribution points opposite the separating velocity, but its magnitude scales as

$$
\frac{K}{r(t)^2D_t}
=
\frac{K(1+u)}{4u^2t^2}.
$$

Its accumulated variation diverges at $t=0$. This prescribed trace therefore exhibits a singular immediate-braking obstruction, not a finite continuous turnaround solution. A lawful turnaround would need a separately declared pre-boundary response or event law and a proof that its net speed-reducing acceleration is locally integrable and sufficient to reduce each inward speed to zero before or at a classified event.

Plainly: a sub-field wake can catch a particle after passage and point backward, but in the simplest constant-speed trial it does so with a nonintegrable near-coincidence contribution. That does not prove rebound; it shows that the proposed passage is not a regular solution.

- **Claim level:** `derived` for the open-ball tangent/normal-cone consequence and the prescribed constant-sub-field root calculation; `inferred obstruction` for the absence of an absolutely continuous passage on that trial; `speculation` for any soft-barrier or pre-boundary turnaround law.
- **Assumptions and proof burden:** retain normalized $c_f=1$, declare whether the strict inequality is merely admissibility or comes with a new response, classify the coincidence limit, and prove existence, uniqueness, local integrability, and a complete root census before asserting braking or turnaround.
- **Promotion target:** the Field-Speed Ceiling mathematics packet only if the operator selects a strict-domain alternative for formal comparison; no canonical or proposed-law replacement is made here.
- **Next artifact:** a strict-domain viability packet comparing the bare open ball, the closed regulators $\|\mathbf V\|\le1-\varepsilon$, and one explicitly stated soft-barrier law, with threshold reachability, coincidence time, root census, accumulated acceleration, and turnaround criteria.

## Ceiling Negative: Reframe the Bound as an Emergent-Theorem Test

The closed-ceiling and strict-inequality results jointly weigh against a primitive velocity constraint as the missing evolution law. The closed ball requires a separately proposed reaction and still leaves the exact-mirror continuation multivalued; the open ball supplies no reaction and terminates when the unchanged ordinary evolution reaches its excluded boundary. Inside this Field-Speed investigation only, the conservative alternative is to keep $c_f$ as the primitive causal-wake propagation speed and ask whether an FSC-local candidate update could make a path-speed bound emerge as a theorem. This question is not promoted or assigned to Master Equation Closure.

Let

$$
b_i(T)=c_f^2-\|\mathbf V_i(T)\|^2.
$$

An update would establish strict nonattainment on a regular interval if it derived an integrable $C(T)$ such that

$$
\mathbf V_i\mathbin{\cdot}\mathbf A_i^{\mathrm{native}}
\le
C(T)b_i(T).
$$

Then $b_i'(T)\ge-2C(T)b_i(T)$ and Gronwall's inequality preserves $b_i(T)>0$ from strictly sub-field initial data. This would be a consequence of the candidate update rather than a projected boundary rule. The stationary-mirror evidence consumed by this packet fails the estimate under the unchanged sharp-root continuation: its partner contribution remains finite, inward, and speed-increasing while $b_i\downarrow0$.

Plainly: the clean target is not “forbid $v>c_f$.” It is “derive an interaction law whose own acceleration makes the speed gap stay positive.” The current regular law does not do that.

Even a derived nonattainment estimate would not prove turnaround. For a mirror half-separation $q(T)>0$ and inward signed speed $u(T)>0$, a turnaround additionally requires a finite time $T_{\mathrm{turn}}$ with $q(T_{\mathrm{turn}})>0$, $u(T_{\mathrm{turn}})=0$, and enough accumulated native speed-reducing acceleration to cancel the incoming speed. That condition must follow from the same wake update and complete ledger; it cannot be inferred from the speed-gap estimate.

One FSC-local candidate mechanism family is an autonomous retained-history-plus-wake state with declared emission, propagation, reception, maturity, and boundary behavior. It could in principle make the singular root-birth accumulation change the candidate wake state and return a finite motion update. Within this lane it is only a comparison proposal: it is not an MEC-002 object or a Master Equation change. It is acceptable for further FSC analysis only if it reduces exactly to the packet's regular simple-root row, uses no future receiver history, deletes no admitted root, and introduces no fitted barrier profile or unexplained core scale.

FSC-009's source-provenanced intersection or swept-reception measure remains useful but insufficient alone. It may derive the correct type of ordinary, frozen, and event contributions without an arbitrary cap, but retyping does not by itself make the consumed stationary-mirror input's infinite-total-variation newborn self-root measure finite.

Plainly: the divergence is evidence that the transparent root-sampling rule is incomplete at root birth. A non-artificial repair must come from a derived wake update or action boundary law, not from an epsilon cap, a hand-shaped barrier, deletion of self roots, a fitted finite core, or a chosen rebound.

- **Claim level:** `derived negative` for the bare closed- and open-domain formulations already analyzed; `FSC-local derivation target` for an emergent speed-gap theorem and finite turnaround under a candidate update; `speculation` for any specific maturity or wake-state mechanism not yet derived.
- **Assumptions and proof burden:** within FSC, derive the candidate from source, wake, path-history, polarity, and absolute-time primitives; preserve the regular acceleration row; prove finite birth-neighborhood total variation, unique continuation, regulator independence, the speed-gap estimate, and a separate positive-separation turnaround criterion.
- **Promotion target:** remain in `reference/priorities/field-speed-ceiling`. No Master Equation owner, canonical law, or reader-facing corpus claim receives this work without a separate explicit operator promotion decision.
- **Next artifact:** inside the Field-Speed lane, test each FSC-local candidate update on the consumed stationary-mirror history against two predeclared obligations: an emergent gap inequality $\mathbf V\cdot\mathbf A^{\mathrm{candidate}}\le C(c_f^2-\|\mathbf V\|^2)$ and a finite positive-separation turnaround integral, while preserving the packet's regular partner row.

## Autonomous Crossing-State Braking and Breather Audit

The minimal FSC-local autonomous crossing state carries source labels, received-source clocks, and one-time event-family ownership. A clock advances only after an independently produced geometric crossing; a plateau does not use the acceleration of its still-inactive channel to create its own first crossing. On the exact isolated mirror restart this state selects the straight trace, so it produces no braking and no breather.

The broader delayed-ignition relation nevertheless contains conditional braking branches. For a supplied onset $u_*>0$, the first-chart variables satisfy

$$
2m-\frac{m^2}{2}
=
K\left(\frac{1}{u_*}-\frac{1}{t-E/2}\right).
$$

The sufficient condition $K\ge3u_*$ keeps the zero-speed turnaround inside the stored straight-source segment and gives positive turnaround separation. The attractive row then reverses the motion; conditional on the declared ordinary/event census, the pair returns to coincidence. Choosing the same onset after the reflected return event produces a formal second lobe and spatial cycle, but the autonomous state does not select that repeated onset.

Plainly: the candidate state fails to start braking, not because the available partner wake is too weak, but because no admitted state variable tells a plateaued channel when to activate. Once a sufficiently early activation is supplied, one brake-turn-return excursion is mathematically available. A repeatable breather still needs a derived reset-compatible trigger.

- **Claim level:** `derived negative` for braking under the minimal autonomous crossing state; `derived conditional theorem` for first-chart turnaround when $K\ge3u_*$; `conditional return argument` for the next coincidence; `speculation` for an autonomous periodic breather.
- **Assumptions and proof burden:** remain inside FSC; retain source labels, one-time event ownership, the proposed zero-impulse event completion, the complete ordinary root census, and normalized $c_f=1$; independently verify the post-turn root census and show that every future-relevant wake-state component is shift-periodic across two lobes.
- **Promotion target:** remain in `reference/priorities/field-speed-ceiling`; no Master Equation or reader-facing promotion without a separate operator decision.
- **Next artifact:** construct the complete two-lobe FSC return map with state variables $(x,v,S_{12},S_{21},\mathcal O_{\mathrm{evt}})$, prove or refute shift-periodicity, and require any proposed onset trigger to be derived from that state rather than inserted as a waiting-time constant.

### Two-Lobe Return Map Result

The [two-lobe return-map audit](analysis/two-lobe-return-map-and-autonomous-trigger-audit.md) completes the proposed next calculation. A prescribed onset satisfying $K\ge7u_*/2$ produces a brake--turn--inward-cap--coincidence lobe and resets the exact-mirror event geometry. Repeating the same onset gives a reflected spatial two-cycle. This is not an autonomous full-state breather because the minimal crossing state supplies no onset and literal all-past ownership records have not been placed in a proved shift-periodic state space.

The most direct event-record trigger, $u_{n+1}=L_{n+1}=G(K,u_n)$ with $L_{n+1}$ the inward-cap duration arriving at the next event, fails in the analytically closed regime $K/u_n\ge6$. There the exact cap map is

$$
\frac{L_{n+1}}{u_n}
=
(1+\zeta_n^2)
\left(1-\zeta_n\arctan\zeta_n\right),
\qquad
\zeta_n=\sqrt{\frac{2}{K/u_n-2}},
$$

and its value lies strictly between zero and one. The reset therefore shortens every later onset and has no positive fixed cycle.

Plainly: a manually repeated alarm produces the requested spatial breathing motion, but the wake-crossing state does not set that alarm. Reusing the last cap duration is natural but does not repair the problem; it drives the cycle toward ever shorter waiting intervals.

- **Claim level:** `derived sufficient theorem inside the proposed FSC model` for the complete lobe; `formal spatial two-cycle` for equal prescribed onsets; `derived negative` for the cap-duration reset at $K/u\ge6$; `open` for a full retained-state periodic orbit or another derived selector.
- **Assumptions and proof burden:** proposed exact-mirror event completion and ceiling response, normalized $c_f=1$, complete one-root census through the open return chart, and one-time family ownership; derive any alternative trigger from an existing wake or action account and construct either a bi-infinite typed ledger or a future-equivalence quotient before claiming delay-state periodicity.
- **Promotion target:** remain in `reference/priorities/field-speed-ceiling`; no Master Equation or reader-facing promotion without a separate operator decision.
- **Next artifact:** independently review the complete-lobe and cap-map derivations, especially the cap-approach measure typing. No existing FSC wake or action account defines $\Phi$; a future selector proposal must supply that missing law explicitly and solve its cap-map fixed-point equation.

## Uniform Field-Speed Geometry

For a prescribed straight path

$$
\mathbf X(s)=c_fs\mathbf e_x,
$$

the forward endpoints of all earlier wake spheres coincide at the current architrino position, while the trailing endpoints are distributed along the rear ray. A point at distance $d>0$ behind the architrino receives exactly one emission with

$$
s=T-\frac{d}{2c_f},
\qquad
r=\frac d2,
\qquad
D_t=D_r=2c_f.
$$

Plainly: the leading direction contains a characteristic pile-up, but a trailing receiver meets successive ordinary fronts one at a time.

The complete all-past spatial result and its zero-residual sub-cap limit belong in [uniform-translation-spatial-receiver-measure-limit.md](analysis/uniform-translation-spatial-receiver-measure-limit.md). It supplies no point self-action, coincidence measure, or ceiling adoption.

## Fixed-Speed Circular Geometry

For a constituent moving on a circle of radius $R$ at speed $c_f$, the required transverse acceleration is

$$
a_\perp=\frac{c_f^2}{R}.
$$

A same-path emission separated by angular advance $\theta$ would require

$$
\theta=2\sin\left(\frac{\theta}{2}\right).
$$

Only $\theta=0$ solves this equation, so a uniform field-speed circle has no nonzero ordinary same-path chord crossing. A phase-offset partner can instead satisfy

$$
\theta=2\left|\sin\left(\frac{\theta+\phi}{2}\right)\right|,
$$

which constrains phase and root topology but does not select a radius because $R$ cancels from the idealized chord equation.

Plainly: circular geometry can select which delayed partner hits exist, but amplitude balance and an all-label closure condition are still required to select a physical scale.

The complete prescribed circular root census belongs in [circular-binary-all-root-certificate.md](analysis/circular-binary-all-root-certificate.md). It establishes neither local continuation nor a retained Braid.

## Capped-Braid Closure Conditions

An equal-radius planar candidate at field speed requires every persistent label to satisfy

$$
A_{\perp,\mathrm{net}}(R,\Phi)=\frac{c_f^2}{R},
\qquad
A_{\parallel,\mathrm{net}}(R,\Phi)=0,
\qquad
A_{z,\mathrm{net}}(R,\Phi)=0.
$$

Here $\Phi$ contains all phase offsets and retained root incidences. The first row supplies curvature, the second prevents tangential drift or speed change, and the third preserves planarity. These conditions must hold on one complete causal ledger with no exceptional constituent.

For a fixed dimensionless root topology and phase pattern, inverse-square scaling suggests

$$
A_{\perp,\mathrm{net}}
=
\frac{\kappa |q|^2}{R^2}\,C_\perp(\Phi),
$$

and hence the schematic balance

$$
R
=
\frac{\kappa |q|^2}{c_f^2}\,C_\perp(\Phi).
$$

Plainly: this is a scale template, not a derived Braid law. The actual root multiplicity, transmitter factors, polarity, and any boundary response must be included in $C_\perp$.

## Markov Sufficiency Across Master-Equation Variants

The Markov property is relative to a declared state description. Let $Z_H(T)$ be the proposed state at absolute time $T$ extracted from a complete admissible history $H$. A deterministic state description is Markov-sufficient only if

$$
Z_{H_1}(T)=Z_{H_2}(T)
\quad\Longrightarrow\quad
\Phi_{\Delta T}(H_1)=\Phi_{\Delta T}(H_2)
$$

for every admitted future interval $\Delta T\ge0$, where $\Phi_{\Delta T}$ is the physical transition expressed in the proposed state variables. A difference in the next acceleration is enough to falsify Markov sufficiency. Agreement of one next acceleration is not enough to prove it, because a hidden wake record may arrive later. In a stochastic description, the corresponding requirement is equality of the full conditional transition law given $Z(T)$, independent of the earlier history.

Plainly: the present state is sufficient only when knowing more of the past cannot improve or change any future prediction made by the law.

This separates four ideas that are often conflated:

- **Deterministic** means one complete physical state selects one future, subject to the declared well-posedness and selection law.
- **Causal** means influences arrive only through the declared past-supported wake structure.
- **Single-root** means one past emission event contributes for an ordered transmitter-receiver pair on the selected interval.
- **Markovian in $Z$** means $Z(T)$ already contains everything needed to determine the transition law.

None of the first three implies the fourth. A deterministic, causal, single-root delay equation can remain non-Markovian in its instantaneous particle variables.

| Variant and proposed state | What the restriction buys | Markov verdict | Exact reason |
| --- | --- | --- | --- |
| Canonical unrestricted Master Equation with instantaneous $X(T)$ or $(\mathbf X(T),\mathbf V(T),\mathbf q)$ | No reduction of the full causal-root family. | Not Markov-sufficient. | Past transmitter paths select root number, emission times, directions, weights, self-hits, and boundary-wake records. Equal instantaneous data can hide different consumed histories. |
| A ceiling $\|\mathbf V\|\le c_f$ imposed only from a finite time onward | Constrains future velocities. | Not Markov-sufficient. | Previously emitted wakes and earlier super-field-speed self-hit candidates remain in flight; the future cap does not erase them. |
| A universal non-strict ceiling $\|\mathbf V\|\le c_f$ | Removes super-field-speed interiors from the admissible history. | Not Markov-sufficient, and equality remains singular. | Delayed partner hits still use past positions; at equality the strict root-transversality floor may vanish and tangent or degenerate cases require extra event/selection data. |
| A universal strict constraint $\|\mathbf V\|<c_f$ | Forbids ordinary noncoincident self-hits and makes the partner delay map monotone on the consumed interval. | Still not Markov-sufficient in instantaneous variables. | One unique partner root is still a root in the transmitter's past. Present position and velocity do not reconstruct a generally accelerated past path. |
| A uniform margin $\|\mathbf V\|\le c_f-\delta$ with $\delta>0$ | Adds a positive root-conditioning margin on the declared interval. | Still not Markov-sufficient in instantaneous variables. | Better conditioning changes sensitivity, not the information consumed by the delayed law. |
| A finite retained window $\mathbf Y_T(\theta)=\mathbf Y(T+\theta)$ for $\theta\in[-h,0]$, plus required branch and boundary records | Promotes the consumed memory into the state. | Candidate Markov state on an infinite-dimensional phase space. | It passes the information test only where the regularized history problem is well posed, the window is sufficient, and one continuation or transition kernel is actually selected. |
| Canonical complete state $S(T)=(X(T),H_T,\mathcal N_{\mathrm{sea}}(T,\cdot),\mathcal B_T)$ | Includes instantaneous data, path history, Noether sea state, and branch/regularization data. | Intended Markov-sufficient ontic state, conditionally realized. | Sufficiency still requires all consumed boundary-wake data and a single-valued continuation law; the exact-mirror delayed-ignition family shows that a proposed ceiling response can lack such a selector even when the preceding labeled history is shared. |
| Explicit independently evolving wake/medium degrees of freedom | May replace a history functional by local evolution of a larger state. | Possible, not established. | A local field-plus-architrino formulation is Markov only after its state, emission, propagation, reception, boundary rules, and unique evolution are derived and shown equivalent to the delayed law. |
| Coarse assembly or observer state | Discards most substrate history. | At most approximately Markov on a certified domain. | Histories collapsed to one effective state must have matching effective transition laws within a declared residual; otherwise the discarded memory reappears as a memory kernel, environment variable, or prediction error. |

Plainly: each speed restriction simplifies the geometry but leaves the same information deficit in the instantaneous state. The history-state variants can satisfy the Markov test only by admitting that the relevant past has become part of “the present state.”

The exact-mirror ceiling proposal exposes a second, logically independent failure. Several continuations can share the same complete labeled preceding history because the proposed response has no activation-time selector. That is not merely non-Markovianity of $(\mathbf X,\mathbf V)$; it is failure to define a single-valued deterministic transition on the proposed complete state. A stochastic transition kernel could make such a process Markov, but only after a physical probability law over the continuations is supplied. Category theory cannot provide that selector.

- **Claim level:** the Markov-sufficiency criterion is standard mathematics; failure of instantaneous Master-Equation states follows from the canonical delayed causal-root dependence; full-history, explicit-wake, and effective Markov formulations remain conditional closure targets.
- **Assumptions and proof burden:** declare the state variables, history domain, wake and boundary records, speed regime, regularization, and continuation concept; then prove that equal declared states induce the same full future transition or transition kernel.
- **Falsifier:** for a claimed Markov state, exhibit two admissible complete histories mapped to that same state whose next acceleration, later arriving wake record, event classification, or continuation law differs.
- **Promotion target:** the Master Equation and field-speed-ceiling owners for dynamics and selection; `CT-001` and `CT-004` for history-object sufficiency and lawful composition if the category-theory lane retains those objects.
- **Next artifact:** build a `markov_sufficiency_variant_matrix` containing matched-state/history-distinct pairs for the unrestricted, capped, strict sub-field, uniform-gap, finite-history, and complete-state variants, with an independent next-acceleration check and a later-wake-arrival check for each pair.

## Assessment and Promotion Boundary

The exact-mirror event and continuation program, regular history-to-ledger theorem, and circular-binary continuation retain their accepted status in [work-queue.md](work-queue.md). The synthesis does not change the Master Equation, the EOM solver, Braid evidence, or the corpus.

## Unresolved Ideas

- **[guessed] Excess-wake transverse redirection.** Derive a geometry-selected transverse direction and magnitude for a speed-increasing boundary contribution; left/right ambiguity or failure to recover the original regular law away from the cap falsifies the candidate.
- **[guessed] Capped-Braid phase-locked family.** Prove that one complete all-label ledger satisfies the transverse, tangential, and planar closure equations across a radius-and-phase family; required next object is a root-complete fixed-law calculation rather than a kinematic construction.
- **[guessed] Discrete transfer and terminal scale.** Determine whether root topology, phase closure, or a bounded transverse response selects discrete neighboring states or a minimum radius; no Planck scale, action quantum, or imported angular-momentum rule may enter as a premise.
- **[guessed] Regime-separated strong-field equations.** Test whether one equation family covers the full speed domain while a second branch description is required only near or above the field-speed threshold; the first object is a domain and root-topology partition with $c_f=1$.
