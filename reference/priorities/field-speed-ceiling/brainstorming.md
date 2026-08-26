# Field-Speed Ceiling: Geometry, Boundary Response, and Open Mechanisms

This synthesis examines the provisional hypothesis that $c_f$ is both the causal-wake propagation speed and an upper bound on every architrino path speed. The hypothesis is not canonical and supplies no continuation law by itself.

## Foundational Distinctions

A closed admissible velocity domain, a boundary reaction, an exact coincidence event, and a rule selecting an outgoing history are different mathematical objects. MEC-007's sharp-law obstruction establishes none of the latter three, and the absence of an admissible super-field-speed segment does not prove passage, rebound, or any other continuation.

The current proposed constrained-response picture forms a complete finite ordinary acceleration ledger before applying a radial normal-cone reaction to keep regular velocity inside the closed domain. Exact nonordinary coincidence families require a separately declared event classification. Even after such a classification, a continuation may remain multivalued.

Plainly: a speed limit says which velocities are allowed. It does not say what happens at the boundary or choose one future when several allowed futures exist.

## Exact-Mirror Continuation Boundary

The exact-mirror packet now distinguishes the incoming partner cap family, its trace-dependent right-hand presence, and the proposed zero-impulse coincidence convention. The focused [event-family construction](mirror-event-family-completion-and-right-trace.md), [selection analysis](exact-mirror-continuation-selection-analysis.md), and [delayed-ignition theorem](trailing-front-activation-dichotomy.md) own those results.

For every positive waiting time in the declared local class, a braking continuation shares the preceding straight history and then activates a new ordinary partner root. The straight trace is also compatible. This establishes conditional local nonuniqueness, not rebound, retention, stability, conservation, or physical realization.

Plainly: the proposed restart admits more than one local future. A new selection principle would be needed to choose among them.

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

The complete all-past spatial result and its zero-residual sub-cap limit belong in [uniform-translation-spatial-receiver-measure-limit.md](uniform-translation-spatial-receiver-measure-limit.md). It supplies no point self-action, coincidence measure, or ceiling adoption.

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

The complete prescribed circular root census belongs in [circular-binary-all-root-certificate.md](circular-binary-all-root-certificate.md). It establishes neither local continuation nor a retained Braid.

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
