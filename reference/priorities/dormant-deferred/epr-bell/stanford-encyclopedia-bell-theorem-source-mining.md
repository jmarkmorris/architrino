# Stanford Encyclopedia Bell-Theorem Source-Mining Packet

## Status And Scope

- Mode: edit batch, priority-only capture
- Source status: expert encyclopedia synthesis and primary-source lead map
- Claim authority: the entry organizes theorem interpretations, experiment history, and philosophical options; Bell, CHSH, theorem papers, and official experiment papers remain the authorities for exact results
- Owning theory lane: [EPR--Bell Closure](./priorities.md)
- Reader-facing corpus promotion: none in this pass

This packet mines the Stanford Encyclopedia of Philosophy entry for assumption distinctions and assembly-facing obligations that were not already explicit in the EPR--Bell lane. It does not treat an encyclopedia as primary evidence for a theorem, experimental value, or settled $\mathbb{A}\mathbb{A}\mathbb{A}$ Bell route.

## Source Record

| Field | Record |
| --- | --- |
| Entry | Wayne Myrvold, Marco Genovese, and Abner Shimony, [*Bell's Theorem*](https://plato.stanford.edu/entries/bell-theorem/) |
| Publication record | First published July 21, 2004; substantive revision January 25, 2024 |
| Access date | August 7, 2026 |
| Local capture | `/tmp/aaa-sep-bell-theorem/bell-theorem.html` |
| Capture size | `190600` bytes |
| SHA-256 | `48cb0b0c3d0031ccfc450a0e51be7bcef3960760bb9a1e4de5a5c187639a376f` |
| Authority boundary | Orientation, vocabulary, historical synthesis, and source discovery only |

Plainly: the article was preserved and read as a map. Any numerical or theorem-level claim selected for later corpus promotion must be checked in the cited primary paper.

## Section Map And Disposition

| Entry section | High-value signal | Disposition for $\mathbb{A}\mathbb{A}\mathbb{A}$ |
| --- | --- | --- |
| 1. Introduction | Bell's theorem is a family; the 1966 hidden-variable paper was written before the 1964 theorem paper; Bell first challenged overstrong no-go assumptions. | Retain as support for the EPR-sympathetic discovery history already captured, while preserving that the published 1964 theorem intentionally closes the Bell-local completion branch. |
| 2. Proof | A complete state $\lambda$ can be quantum, supplemented, or otherwise exotic; local response probabilities may already average over apparatus microstates. | Reinforce that richer pair memory, Noether-sea state, and local detector complexity do not weaken CHSH if factorization and measurement independence remain. |
| 2. Angular predictions | Perfect aligned correlations have local toy explanations; the full off-axis sinusoidal curve is the discriminator. | Make the full angular joint table and $E(\theta)$ the assembly recovery target, not matched-axis conservation alone. |
| 3.1. Locality and causality | Factorizability splits into parameter independence and outcome independence; the entry relates the latter to common-cause screening. | Add a route diagnostic separating remote-setting dependence from failure of common-cause screening. |
| 3.2. Supplementary assumptions | A Bell test needs a unique outcome and a declared event at which that outcome becomes definite. | Require an assembly-defined outcome-closure event and persistent record basin in timing and detector models. |
| 3.3. “Local realism” | “Realism” is used incompatibly and outcome determinism is stronger than Bell factorization requires. | Confirm the existing hard guard; no new gate. |
| 4--5. Experiments and loopholes | Early apparatus anomalies, selective detection, heralding, coincidence rules, and spacelike setting-to-registration intervals show where physical modeling enters. | Strengthen mechanism-specific apparatus and trial audits without reopening loopholes generically. |
| 6. Variants | Spin-1/contextual, Hardy, and GHZ variants expose different nonclassical joint-record structures. | Retain only as source leads for existing Quantum Closure multipartite targets. |
| 7. Quantum information | Operational no-signaling can coexist with hidden conditional dependence when the hidden state is not controllable. | Add a control-access distinction to the Bell/no-signaling interface. |
| 8. Options | Measurement dependence, nonlocal preferred-time dynamics, retrocausality, and rejection of common-cause screening are distinct routes. | Refine the route map without selecting one. ER=EPR remains outside this lane's accepted scope. |

Plainly: most of the entry confirms existing safeguards. The real additions are a sharper causal decomposition, an outcome-closure obligation, a native state-space measure requirement, and an explicit control-access check.

## The Useful Mathematical Decomposition

Parameter independence says that, conditional on a complete state, a wing's outcome distribution does not change with the remote setting:

$$
P(a\mid x,y,\lambda)=P(a\mid x,\lambda),
\qquad
P(b\mid x,y,\lambda)=P(b\mid y,\lambda).
$$

Plainly: once the complete relevant physical state and the local knob are fixed, changing the distant knob does not change the local conditional odds.

Outcome independence says that, after both settings and the complete state are fixed, learning the remote outcome does not further change the local outcome distribution. Equivalently,

$$
P(a,b\mid x,y,\lambda)
=
P(a\mid x,y,\lambda)P(b\mid x,y,\lambda).
$$

Plainly: the complete state screens the two outcomes from one another; no unexplained residual correlation remains at fixed $\lambda$ and settings.

The conjunction of parameter independence and outcome independence is Bell factorization:

$$
P(a,b\mid x,y,\lambda)
=
P(a\mid x,\lambda)P(b\mid y,\lambda).
$$

Plainly: each wing has a local response distribution, and multiplying the two local distributions gives the complete conditional joint distribution.

The article's causal taxonomy adds an interpretive step: ordinary causal locality motivates parameter independence, while outcome independence also uses the idea that a sufficiently complete common-past state screens every correlation. That mapping is analytically useful, but it should not be silently equated with the algebraic identity above.

Plainly: the equations say exactly which probabilities factor. Calling one factor “causal locality” and the other “common-cause screening” is a causal interpretation that must match the declared physical model.

For a deterministic theory with complete $\lambda$, the conditional outcome probabilities are zero or one, so outcome independence holds automatically. Such a model can violate factorization only through remote-setting dependence, an incomplete declaration of $\lambda$, measurement dependence, or a failed trial map.

Plainly: a complete deterministic assembly theory cannot escape merely by saying that the outcomes remain correlated after the past is specified. It must show a remote-setting input, omit relevant state, correlate settings with the state, or change which records count as trials.

## Assembly Insight 1 — The Full Angular Law Is The Target

The entry emphasizes that perfect same-axis anticorrelation for a spin singlet, or perfect same-axis correlation for the photon state it discusses, can be reproduced by simple Bell-local toy models. Their failure appears away from aligned analyzers: their correlation falls with angle in the wrong form, whereas the quantum target is sinusoidal.

Plainly: a pair that leaves the source carrying opposite labels can explain the aligned case. Bell pressure begins when the same source model must answer several independently selected, nonaligned detector orientations.

For the EPR--Bell assembly interface, the first positive artifact must therefore use one accepted source ensemble and one accepted detector family to generate the entire angular joint table. Matching only $E(0)=-1$, a conservation rule, or one CHSH setting quadruple is insufficient.

Plainly: the assembly model must generate the curve, its local marginals, and the Bell statistic from the same records. Separate fits would hide the very cross-setting consistency Bell tests.

The entry also usefully keeps the observer-level targets distinct: the spin singlet has $E(\theta)=-\cos\theta$, while its chosen linear-polarization state has a doubled-angle law $E(\theta)=\cos(2\theta)$ under the stated outcome convention.

Plainly: $\theta$ is not one universal substrate angle with one universal Bell formula. The carrier, analyzer, state, and binary labeling determine the observer-level recovery target.

## Assembly Insight 2 — Local Apparatus Complexity Is Already Inside The Model

The complete state may contain source variables, local apparatus histories, detector microstates, setting-generator histories, clocks, cables, and Noether-sea data. Alternatively, unresolved local apparatus microstates may be averaged into stochastic response probabilities.

Plainly: Bell arithmetic does not require elementary detectors. A detector may be a vast assembly; what matters is which conditional dependence its response actually has.

If all apparatus effects remain wing-local, they can be absorbed into $P(a\mid x,\lambda)$ and $P(b\mid y,\lambda)$. Adding braid complexity, $q\mathbf V$, deeper local history, or more detector variables does not then change the Bell bound when the same complete-state distribution is sampled for every setting pair.

Plainly: local complexity makes the response harder to derive, but it does not create the missing remote-setting dependence or setting--state correlation.

The early Holt--Pipkin anomaly supplies a good mechanism template. Clauser's 1976 repetition restored agreement with the quantum prediction and proposed stress-induced optical activity in the Pyrex source bulb as a possible cause of the earlier polarization error. The official primary paper is [Clauser, *Experimental Investigation of a Polarization Correlation Anomaly*](https://doi.org/10.1103/PhysRevLett.36.1223).

Plainly: this is legitimate apparatus skepticism because it names a material state, an optical effect, and a polarization bias. It does not show that modern Bell violations are apparatus artifacts; it shows the level of mechanistic detail an apparatus proposal must reach.

## Assembly Insight 3 — Define When An Outcome Exists

The physical mapping must identify not only a detector interaction but the event at which one unique, persistent binary record exists. For $\mathbb{A}\mathbb{A}\mathbb{A}$ this should be a substrate-defined record basin or another explicit assembly condition, not an imported collapse postulate and not an unanalyzed “click.”

Plainly: a Bell spacetime diagram is only as good as its endpoint. We must say which assembly event closes the outcome and can no longer be changed by local detector evolution.

This sharpens EPRB-004, EPRB-007, and EPRB-008. The timing ledger must include setting availability, detector interaction, outcome closure, time tagging, and record persistence. A proposed live finite-speed influence must be tested against the declared closure event, not an arbitrarily early or late proxy.

Plainly: shifting the endpoint changes the available coordination time. The endpoint therefore has to come from the detector model and be independently checkable.

## Assembly Insight 4 — Conditional Dependence Is Not Yet A Signal

Parameter independence can fail at fixed $\lambda$ while the averaged records still obey operational no-signaling:

$$
\sum_b P(a,b\mid x,y)=P(a\mid x)
$$

with no dependence on $y$, and analogously for the other wing.

Plainly: a remote setting may enter a hidden conditional law while disappearing from every locally accessible frequency table.

To infer controllable faster-than-light messaging from a conditional dependence, a model also needs access to or control over the hidden state that carries the dependence. The lane must therefore keep three questions separate: does factorization fail, do observer-level marginals depend on the remote setting, and can an agent control the variables that would modulate that dependence?

Plainly: Bell nonlocality, operational signaling, and usable communication are not synonyms. A live $c_f$ route owes all three diagnostics.

## Assembly Insight 5 — Measurement Dependence Needs A Native Measure

A measurement-dependent route rejects the equality

$$
\rho(\lambda\mid x,y)=\rho(\lambda).
$$

Plainly: selecting a setting pair selects a different distribution of the complete relevant past state.

The entry's superdeterminism discussion identifies a subtle burden. Calling the required initial conditions “small” or “fine-tuned” presupposes a measure on the allowed state space. If a theory declares a restricted physical state space, counting its states with an arbitrary measure imported from a larger forbidden space does not establish physical fine-tuning.

Plainly: before saying that a setting--pair correlation is rare, the theory must say what histories are physically possible and how typicality is measured among them.

EPRB-006 must therefore declare both the physical support $\Omega_{\mathrm{phys}}$ and a native measure $\mu_{\mathrm{phys}}$ derived from accepted $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics or preparation. It must still quantify the setting--state dependence and predict changes under new setting sources, rates, baselines, orientations, or sea states.

Plainly: restricting the state space can answer one fine-tuning objection. It does not by itself reproduce the Bell table or make the dependence testable.

## Assembly Insight 6 — A Separate Common-Cause-Screening Route

The entry distinguishes rejecting causal locality from rejecting the common cause principle. A fundamentally stochastic law could retain local marginals while assigning irreducible spacelike joint probabilities that are not screened by a complete common-past state.

Plainly: this route treats the correlation as built into a joint probability law, not as a message traveling from one detector to the other.

This is not a free route for the current absolute-time, forward-causal, deterministic assembly ontology. With a genuinely complete deterministic state, outcome independence is automatic. To use unscreened joint probabilities while keeping parameter independence, $\mathbb{A}\mathbb{A}\mathbb{A}$ would need primitive stochasticity or an intentionally incomplete $\lambda$. A new deterministic global nonseparable law would instead violate parameter independence.

Plainly: the route is mathematically distinct from a finite-speed channel, but adopting it would change existing ontology or dynamics. It remains a comparison-model refinement under EPRB-002, not a selected solution.

## Experiment And Source-Authority Audit

The entry is a strong bibliography and a useful conceptual history, but its experiment section is not a safe authority for exact frontier values. In particular, it describes the 2015 tests as requiring no additional hypothesis. That is too strong: physical application still depends on trial definition, event timing, setting provenance, detector behavior, sampling or no-click treatment, and the declared statistical null.

Plainly: closing major loopholes makes the evidence much stronger. It does not turn the mapping from hardware to the mathematical Bell trial into assumption- free arithmetic.

The entry's rounded Giustina 2015 number also differs from the precise bound already retained from the official paper in the EPR--Bell audit. No experimental value from this encyclopedia is promoted. EPRB-005 continues to require current official journal sources and category-specific leaders.

Plainly: the encyclopedia tells us which experiment to open; the experiment's own paper controls the number and its assumptions.

## Primary-Source Leads Retained

| Lead | Why it matters | Next use |
| --- | --- | --- |
| [Bell 1964](https://journals.aps.org/ppf/abstract/10.1103/PhysicsPhysiqueFizika.1.195), [Bell 1966](https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.38.447), and Bell 1971/1976/1990 | Historical progression from EPR-motivated deterministic completion to stochastic factorization and local-causality formulations | Use primary texts for any quotation or claim about Bell's own position. |
| [CHSH 1969](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.23.880), [Clauser and Horne 1974](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.10.526), Jarrett 1983/1984, and Shimony 1984/1986 | Factorization, parameter independence, outcome independence, and control-access history | Open only if EPRB-002 selects a route that turns on this decomposition. |
| [Eberhard 1993](https://journals.aps.org/pra/abstract/10.1103/PhysRevA.47.R747) | Detection-efficiency optimization with nonmaximally entangled states | Use the primary paper if an assembly detector model reaches efficiency optimization. |
| Kent 2005/2018 and [Salart et al. 2008](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.100.220404) | Outcome-closure or collapse-locality timing | Use only after $\mathbb{A}\mathbb{A}\mathbb{A}$ declares a physical outcome-closure criterion. |
| Clauser 1976 | Material apparatus state as a concrete polarization-error mechanism | Use as the mechanism-quality template for EPRB-004. |
| GHZ, Hardy, spin-1 contextual variants | Multipartite and non-inequality pressure on joint-record models | Route to Quantum Closure's existing multipartite benchmark work; do not add a duplicate gate. |

Plainly: these are research leads, not accepted premises. Their priority depends on a live EPR--Bell object needing the specific result.

## Lane Actions

- **EPRB-001:** add parameter independence and outcome independence as diagnostics, while retaining Bell factorization and measurement independence as the actual question asked of “decided at entanglement.”
- **EPRB-002:** distinguish a live remote-setting channel from rejection of common-cause screening; record the ontology change the latter would require.
- **EPRB-003:** separate conditional factorization failure, operational no-signaling, and agent control/access.
- **EPRB-004:** require a substrate-defined outcome-closure event and use the Clauser apparatus anomaly as the standard of mechanism specificity.
- **EPRB-006:** declare the allowed physical state space and its native measure before making fine-tuning claims.
- **EPRB-007:** time finite-speed reach to the derived outcome-closure event.
- **EPRB-008:** require the full angular curve from one source/detector record family, plus separate PI, OI, no-signaling, and control-access verdicts.

Plainly: no new queue object is needed. The source makes seven existing objects more precise.

## Discarded Or Deferred Material

- The entry's exact experimental values are not copied as evidence.
- Its claim that the 2015 tests require no additional hypothesis is rejected as an overstatement.
- Philosophical preferences among Bohmian, collapse, Everettian, retrocausal, and common-cause revisions are not promoted into ontology.
- Device-independent cryptography is adjacent but does not advance the current assembly Bell derivation.
- Weak-measurement Bell variants are deferred because no live lane object consumes them.
- ER=EPR and altered-topology routes remain outside the scoped pair-provenance decision and are not reopened by an encyclopedia mention.

Plainly: the pass retains distinctions and research leads, not the article's entire survey and not its authors' preferred conclusions.

## Closure Statement

The source advances EPR--Bell closure by requiring one complete assembly record family to recover the off-axis angular law, by decomposing factorization without weakening it, by tying spacetime reach to a physical outcome-closure event, and by requiring a native state-space measure for any measurement-dependent route. It does not select live finite-$c_f$ coordination, measurement dependence, or a stochastic common-cause-screening escape.

Plainly: the lane is better specified, but the central operator decision and the assembly derivation remain open.
