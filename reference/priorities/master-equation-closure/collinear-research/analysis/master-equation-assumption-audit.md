# What the Master Equation assumes and what follows from it

> **Scope of retained side studies.** This general assumption audit remains distinct from the [quarantined quadratic-response examinations](../README.md#quarantined-quadratic-response-examinations). Its references to the quadratic, softened and associated action results describe inactive special examinations. They do not select their added receiver multiplier for the Master Equation or later scenarios; reuse requires explicit operator re-selection. The audit's postulate/derivation distinctions and unchanged-equation results are not withdrawn by this quarantine.

## Finding and scope

The Master Equation is a specific proposed microscopic acceleration law, not a consequence of causal delay alone. Its wake-arrival geometry, its response to an individual arrival, and its rule for combining arrivals are distinct commitments. The [Master Equation chapter](../../../../../content/markdown/aaa/dynamics/master-equation.md) explicitly labels the equation a postulate. The [Architrino chapter](../../../../../content/markdown/aaa/foundations/architrino.md) states the primitive object and also summarizes that chosen dynamics; appearing in Foundations does not turn a response postulate into a derivation.

This audit answers the 2026-09-27 [question about the microscopic starting point](../brainstorming.md#is-the-assumed-microscopic-interaction-the-wrong-starting-point). It separates present commitments from conditional mathematical consequences and from desired observable outcomes. It neither changes canon nor selects a replacement equation. Descriptions of current definitions are grounded in the linked live chapters; mathematical deductions below are derived under their stated assumptions; recommendations are inferences from the recorded encounter results.

**Main conclusion:** one can investigate a different receiver response while retaining point identities, polarity, absolute time, Euclidean space and the present spherical arrival geometry. That would be a genuine change to the current Master Equation. It need not be a change to every starting idea. Conversely, introducing an independently specifiable field, internal particle state or intrinsic radius would revise additional present commitments and must be identified as such.

## Starting commitments, not experimental derivations

The following are current foundational choices, not facts established by the collinear calculations. Retaining them for a first comparison is a proposed research scope, not a proof that they are uniquely correct.

| Current commitment | What it specifies | What it does not specify by itself |
| --- | --- | --- |
| Euclidean space and absolute time | Distances, positions and a common ordering of events | The acceleration caused by an interaction |
| Persistent point identities with two polarities | What the constituents are and which label persists through a crossing | An inverse-square magnitude, a collision response or a speed ceiling |
| Continuous spherical emission at speed $c_f$ from the emission position | Where an earlier emission can arrive | How much acceleration reception produces |
| Wake determined by source identity, polarity and path history | No independent wake state remains to be assigned once those inputs are fixed | A separately proved conservation or exchange law |
| No primitive mass | Acceleration is specified without a particle mass coefficient | A particular function mapping reception into acceleration |

The polarity convention already includes like-sign repulsion and opposite-sign attraction in the current Foundations description. Retaining polarity as a label and retaining that dynamical sign rule are logically distinguishable choices. This audit proposes no change to either. The common polarity magnitude and common coupling also define a universal normalization; they do not derive the form of the response.

## Additional choices in the present acceleration law

| Assumption | What the present equation chooses | Why it matters for reconsideration |
| --- | --- | --- |
| Emission weighting | Uniform measure in absolute emission time, with the stated source normalization | Different weighting changes the received contribution even with the same arrival spheres |
| Exact surface reception | The causal selector accepts emissions on the arrival surface; ordinary roots are isolated intersections | Crowded or nonisolated arrivals need a separate mathematical treatment; finite reception width would be a modification |
| Distance dependence | Each ordinary contribution contains $1/R^2$, with $R$ measured from emission position to reception position | This choice is not fixed by delay alone and becomes unbounded as that range tends to zero |
| Direction and polarity | Contribution is radial along the emission-to-reception line, with sign from the polarity product | Rotation symmetry alone does not require radial response when source or receiver velocity supplies other directions |
| Linear addition | Add individual vector acceleration contributions over all admitted sources and roots | Strongly crowded arrivals receive no additional saturation or collective response rule |
| Receiver dependence | At a fixed receiver event and fixed source history, ordinary acceleration has no explicit receiver-speed multiplier | The tested $1-v^2/c_f^2$ factor is an added law, not a correction forced by the original geometry |
| Self response | The same ordinary interaction rule applies to admitted positive-delay self roots | New self roots can create a singular response; merely retaining identity does not derive this response rule |
| Path-history sufficiency | The retained histories determine the received response wherever the equation is well posed | Adding independent medium or receiver memory variables is a larger change than modifying a distance function |
| Speed domain | The unchanged equation imposes no architrino speed ceiling | A ceiling must be supplied by compatible dynamics; $c_f$ is the propagation speed, not automatically a particle speed bound |

These entries are separate assumptions for analysis, not independent knobs whose arbitrary adjustment would constitute a derivation. Some are already incorporated into the definition of an architrino in the current corpus. Their classification identifies what a proposed replacement must explicitly preserve or revise.

## What is actually derived from the arrival geometry

Set $c_f=1$. At fixed receiver event $(\mathbf X_i(T),T)$, let $S$ be an emission time, $\mathbf r=\mathbf X_i(T)-\mathbf X_j(S)$, $R=\|\mathbf r\|$ and $\mathbf n=\mathbf r/R$. The retained spherical propagation postulate gives

$$
g(S)=R-(T-S)=0,\qquad
\frac{dg}{dS}=1-\mathbf n\cdot\mathbf V_j(S)=D_t.
$$

Suppose a proposed response is represented as an integral over emission time, with vector amplitude $\mathbf H$ and the exact arrival selector $\delta(g)$. At isolated simple roots, the mathematical change of variable gives

$$
\int \mathbf H(T,S)\,\delta(g(S))\,dS
=\sum_{S_*}\frac{\mathbf H(T,S_*)}{|D_t(T,S_*)|}.
$$

The current choice is $\mathbf H=\kappa q_iq_j\mathbf n/R^2$. The denominator is therefore derived **conditional on this integral structure and emission measure**; the numerator's distance dependence and its interpretation as acceleration are chosen. Changing $\mathbf H$ while preserving that structure preserves the same denominator. Changing the emission measure, causal selector or nonlinear reception rule requires checking the derivation anew. It would be incorrect either to remove the denominator arbitrarily or to claim it fixes every possible microscopic response.

Along a moving receiver path the selected emission time instead obeys

$$
\frac{dS}{dT}=\frac{1-\mathbf n\cdot\mathbf V_i(T)}{D_t}.
$$

That identity describes which emission arrives as time advances. Interpreting this rate as an additional acceleration multiplier would require a changed reception law. The geometry alone does not make that choice.

The inverse-square geometric argument is conditional in a different way. If a fixed amount is uniformly distributed over a sphere of radius $R$, its amount per unit area is proportional to $1/(4\pi R^2)$. To infer the present acceleration law one must additionally specify what is distributed, how its amplitude is assigned, why receiver response is linear in it, why contributions add linearly, and why the prescription extends to arbitrarily small range. Point support means zero particle size; it does not logically entail an infinite response at contact.

## Assumptions of our experiment, separate from the law

The stationary experiment selects an isolated opposite-polarity pair, exact mirror collinearity, held stationary pasts, and release at a declared time. The preparation is a supplied history, not an assertion that an attracting stationary pair is an equilibrium of the released dynamics. Changing the past changes the delayed inputs even if current positions and velocities initially match.

Isolation removes all other sources. Exact collinearity removes transverse motion. Neither is a consequence of point identity or finite propagation. A failure of this experiment is not automatically a failure of an embedded assembly or another geometry. Conversely, proposing surrounding assemblies is not yet a demonstration that their response produces binding.

The [Noether sea](../../../../../content/markdown/aaa/spacetime/noether-sea.md) is described as a population of assemblies, not a separately adjustable primitive fluid. A sea-based explanation must use declared microscopic dynamics and a compatible surrounding state. Collective binding without isolated-pair binding is a possible hypothesis; assigning an arbitrary restoring influence does not establish it. Similarly, the foundation's history-dependent wake may be stored in an auxiliary computational state without adding ontology, but an independent physical wake degree of freedom would change the current definition.

The three speed regimes remain unrestricted $v$, $v\le c_f$ and $v<c_f$. The last two are variants of field speed ceiling. Neither the choice of regime nor the desired breather fixes its implementation. Softening, suppression of self response and a contact extension are separate choices.

## Which assumptions enter the observed blockers?

This table identifies dependencies of the existing arguments, not a claim that one assumption alone causes every failure.

The last three rows summarize quarantined quadratic-response studies. Their conditional results are retained for comparison, with no active continuation recommendation.

| Encounter result | Ingredients entering it | What the result does not establish |
| --- | --- | --- |
| Unchanged stationary pair cannot continue through first wake-speed arrival in the tested classes | Incoming attraction reaches that event; geometry creates self roots; their unsuppressed response with short delayed range and source weighting has divergent accumulated acceleration | That all geometries fail, that delay itself is impossible, or that the partner's present separation vanishes |
| Equality-speed capped encounter lacks a satisfactory coincidence/departure law | Specified cap histories crowd arrivals; the ordinary-root expression ceases to apply to a whole arrival family; the inherited distance response and added event rules must be evaluated separately | That defining an ordinary-root denominator at zero supplies a valid event response |
| Quadratic speed factor alone approaches coincidence with speed tending to the forbidden ceiling | The chosen factor acts on the retained singular distance response | That every strict-speed equation must do so |
| Softened strict-speed runs pass but show larger return speeds or departure | Introduced length, receiver-speed factor, delayed source weighting and actual histories all determine the path; the fixed-path audit locates the factor imbalance | That source weighting is erroneous, or that every parameter/history has the same fate |
| Summed prescribed-partner action fails to reproduce the causal equation | Varying both paths includes later reception of changed emissions | That a term is missing from the implementation, or that no causal formulation or breather can exist |

Supporting derivations and measured boundaries are in the [encounter manuscript](../manuscript.md), [quadratic response](strict-speed-quadratic-response.md), [softened passage](strict-speed-finite-contact-passage.md), [acceleration balance](strict-speed-acceleration-balance.md) and [two-path variation](strict-speed-two-path-action.md). No new trajectory was calculated in this audit.

## Outputs to recover, not microscopic premises

Electromagnetic behavior of assemblies, including the appropriate Coulomb and Maxwell limits, remains a recovery target. So do a consistent observable charge map, assembly response, and applicable conservation and propagation behavior. This audit does not convert standard equations into architrino premises or claim those recoveries have been demonstrated. The [preceding classical comparison](../brainstorming.md#is-the-assumed-microscopic-interaction-the-wrong-starting-point) records the distinction between Maxwell fields, particle coupling and the proposed sea interpretation.

A collinear breather is a proposed structure to establish. Its existence would not by itself validate a microscopic law; its absence in one model would not disprove every assembly model. Conservation cannot be established by naming an action, and the failure of the tested action does not itself prove nonconservation. These are separate deductions that need actual equations and their domain of validity.

## Recommended point of reconsideration

### Would inverse-distance acceleration remove the blockers?

The conditional inverse-distance comparison is now centralized in [Logarithmic potential research](logarithmic-inverse-distance-collinear-obstructions.md#would-inverse-distance-acceleration-remove-the-blockers), preserving its assumptions, derivations, and self-checked review status.

**Inference:** the first question to reopen is the conversion from arriving wake information into acceleration, including the distance response, addition of simultaneous contributions and self reception. That is broader than changing Coulomb's exponent. The arrival geometry can be held fixed initially so that the effect of revising reception is identifiable. The default comparison would also retain point identities, the polarity convention, absolute time and Euclidean space; this is a suggested bounded investigation, not a newly adopted canon.

Before selecting another formula, state what a single arrival supplies and how the receiver responds when several emissions arrive together. A response proposal should specify its ordinary separated limit, crowded-arrival behavior, self case, and coincidence domain. A new scale or state variable must be identified and justified rather than selected only because it produces a return. The assembly-level electromagnetic limit remains an independent requirement. A mathematical counterexample can show that the starting premises do not uniquely determine the current law, but cannot select the physically correct alternative.

**What would change this assessment:** a derivation of the current receiver response from independently retained premises would move that response from postulate to conditional consequence. An independently checked numerical defect could revise a measured trajectory without revising the law. A complete same-law surrounding-population solution could establish an environmental remedy for its stated configuration. An alternative microscopic law would need both a defined encounter and a defensible route to the declared observable targets. Until then, the audit supports reconsideration, not a verdict that the current law is false or its replacement known.
