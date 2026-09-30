# Cross-Workstream Theory Questions

This document synthesizes provisional questions whose ownership crosses several priority lanes. It is not an execution queue. A question advances only after it acquires a defined mathematical object, an owning workstream, and a testable completion condition.

## Geometry research ownership and the Noether sea — 2026-09-29

**Disposition:** migration approved and completed on 2026-09-30; the [work log](work-log.md) records AWT-016. Master-Equation Closure is the chosen physical parent for collinear, lattice, Braid Program, Noether sea and field-speed-ceiling research. Its README provides the common entry point. Each child keeps its scientific responsibility; field-speed-ceiling remains dormant. The filing approval changes no scientific activation or equation assumption.

### The scientific distinctions the filing system must preserve

A collinear arrangement specifies motion along one line. A lattice specifies repeated spatial organization. A braid specifies an assembly's internal path structure. The Noether sea specifies an ambient population of assemblies and its collective response. These descriptions answer different questions and can overlap: braid centers can occupy a lattice, a local sea calculation can use an ordered comparison population, and the same braid architecture can be studied in isolation or embedded among neighboring assemblies. A directory hierarchy therefore organizes responsibility; it does not declare mutually exclusive physical species or a compulsory progression from collinear motion to lattices to the sea.

The common research overview should describe each investigation by its constituents, spatial arrangement, population extent, complete history and environment, equation and summation prescription, and supported result. In particular, it must distinguish individual architrinos at lattice sites from lattices whose sites carry resolved braid assemblies. It must also distinguish supplied histories from histories constructed under the equation, and coherent infinite disturbances from spatially localized ones. Evidence grade belongs beside the result rather than being inferred from the geometry's name. This follows the existing [Braid Taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md), where exact configurations are flat peers with separate characteristics, and the [configuration chart](../master-equation-closure/braid-program/configurations/configuration-chart.md#obligations-on-the-authored-version), which already requires explicit histories, ambient inventory and boundary scope. It calls for extending that description to populations, rather than introducing a competing scientific classification.

The operator's target of a dense population of highly energetic scaled braids surrounding regions containing Standard Model particle assemblies fits Noether sea research. Such a population requires more specification than a packing geometry: braid scale or cadence distributions, orientation and phase correlations, neighboring assembly histories, and reciprocal response at the boundary of the matter-containing region. Here the high-energy scale distribution is part of the proposed physical preparation; a packing picture alone does not derive an energy account or establish retention. Particle identities remain recovery claims made by the relevant mapping workstream. The [Noether sea chapter](../../../content/markdown/aaa/spacetime/noether-sea.md#local-branches-in-the-medium) already supplies the distinction between ambient population, resolved local assemblies and incoming boundary histories. A matter-containing pocket can contain and interact with ambient braids; the directory name should not assume an empty cavity or a rigid wall.

### Current owners and scientific boundaries

The following current locations were checked by direct reads of the linked owners and scoped `rg` searches under `reference/priorities/` and `content/markdown/aaa/`. They identify the responsibilities relevant to this proposal, rather than claiming an exhaustive inventory of every geometry reference.

| Subject | Current route | Responsibility |
| --- | --- | --- |
| Shared equation and continuation | [Master-Equation Closure](../master-equation-closure/priorities.md) | Keep general causal-root definitions, admissible histories, population summation, continuation and account questions here. Geometry studies cite and test these results. |
| Motion along one line | [Collinear research](../master-equation-closure/collinear-research/README.md) | The directory now sits under MEC, retaining encounter, approach, passage, turn and recurrence studies. |
| Repeated populations and disturbances | [Lattice manuscript, Chapter 1](../master-equation-closure/lattice-research/manuscript.md#1-infinite-populations-and-cancellation) | Give lattice-specific preparations, evolution, stability questions and exposition a dedicated `master-equation-closure/lattice-research/` owner using the prepared file-and-section map. |
| Binaries, braids and assemblies | [Braid Program](../master-equation-closure/braid-program/README.md) | The directory now sits under MEC; retain internal architecture, candidate dynamics, assembly retention and existing evidence. Joint embedded studies link to the sea owner. |
| Ambient braid populations and matter embedding | [Noether sea response packet](../master-equation-closure/noether-sea-research/analysis/pressure-dependent-noether-sea-constitutive-response.md) and [Noether sea chapter](../../../content/markdown/aaa/spacetime/noether-sea.md) | Establish `master-equation-closure/noether-sea-research/` for resolved populations, collective disturbances, embedded assemblies and constitutive response. Preserve deferred status when transferring a target. |
| Historical speed-ceiling investigation | [Dormant ceiling archive](../master-equation-closure/field-speed-ceiling/README.md) | Move the complete directory to `master-equation-closure/field-speed-ceiling/`, preserving dormant status, historical receipts and already-separated scientific owners. |
| Standard Model identification and prediction | [Standard Model mapping](../mapping-standard-model/priorities.md) | Retain the mapping from derived assembly behavior to particle properties and observations; consume the assembly and sea results. |
| Calculation and presentation | [EOM solver](../app-solver/README.md) and [Lattice Lab](../app-lattice-lab/priorities.md) | Retain software and visualization responsibility. A lattice research owner does not duplicate either app's queue or turn displayed geometry into scientific evidence. |

The sea route distinguishes physical parent from scientific responsibility: the response packet now names Noether sea research as its execution owner, while the parent's [authority table](../master-equation-closure/priorities.md#current-authority-and-revocation-boundary) describes the response as a downstream target that should not count as general equation closure. A dedicated sea child within MEC makes that responsibility explicit. Moving the packet preserves its `defer-with-blocker` status and its requirement for a shared, retained population history; organization supplies no missing solution.

The lattice split is justified by the developed scientific subject: prescribed local pulses, self-consistent collective histories, population summation, causal propagation and decisive events. General theorems discovered through lattice examples can remain in Master-Equation Closure, with their lattice applications explained by the new owner. A mixed proof should have one authoritative home selected by what its statement establishes. The lattice manuscript carries the detailed population story, while the Master-Equation Closure manuscript retains the implications for the law and links to the application. Copying the whole chapter into two maintained manuscripts would create competing explanations.

### Research directories under Master-Equation Closure

The directed arrangement uses the existing Master-Equation Closure directory as the physical parent. A new parent README explains the common law, compares the investigations and routes readers to their detailed accounts. General theorems, the parent's manuscript and its shared-law queue remain in place. Child manuscripts and queues retain their own subjects and task identities. There is no separate configuration-research directory or duplicate aggregate queue.

```text
reference/priorities/master-equation-closure/
  README.md                       common research overview
  manuscript.md                   general equation account
  analysis/                       shared proofs and definitions
  collinear-research/
  lattice-research/
  braid-program/
  noether-sea-research/
  field-speed-ceiling/             dormant historical investigation
```

Mapping workstreams, source acquisition and application owners keep their current locations. Each result has one scientific owner; being physically under MEC does not turn an application result or an explored equation variant into general closure. Existing marginal objects keep their score and execution owner, with nested tracker paths recognized by the global ranking machinery.

The [priority validator](../../../scripts/validate-priority-ranking.mjs) now follows declared nested workstreams and accepts nested tracker paths. The [reference-surface builder](../../../scripts/build-reference-surface.mjs) now reaches child `analysis/` directories and labels dormant children. The parent’s `workstreams.json` declares field-speed-ceiling dormant, so its physical location does not activate its old queue. Application consumers, relative links and fixed Python repository-root ancestry are part of the migration’s verification scope.

### Decision and migration boundary

**Claim grade: operator-directed layout and inferred implementation boundaries.** The MEC parent follows the operator's explicit direction. Scientific responsibility still follows each theorem or investigation's scope. An overlooked source binding, current consumer or mixed theorem requires a correction to the transfer map; filing establishes no retained braid, sea equilibrium or relaxation result.

The [revised ownership and migration plan](campaigns/configuration-research-ownership-map.md) records the nested destinations, complete collinear/Braid/ceiling tree inventory, selected lattice and sea transfers, manuscript boundaries, existing task identities and consumer obligations. Frozen subjects, independent references and runtime archives retain provenance. The operator approved execution. Directories and manuscript sections now use the nested owners; existing task identities, active assignments and scientific grades are retained.

The field-speed-ceiling child keeps its historical designation and original scientific assumptions. Its already-routed collinear, circular/braid and shared-equation successors stay with those scientific owners as their paths change. The speed ceiling describes an equation assumption across geometries; the MEC overview labels that assumption explicitly. Its new directory location neither changes the law used in the lattice theorem nor supplies a sea continuation rule.

## Advancing Master-Equation Closure and the Braid Program — 2026-09-14

This is a proposed research sequence, inferred from the live [Master-Equation Closure priorities](../master-equation-closure/priorities.md) and [Braid Program strategy](../master-equation-closure/braid-program/priorities.md). It changes no assignment, score, equation, or scientific acceptance. Its theory level is substrate dynamics: what the stated master equation permits and whether freely evolving assemblies persist. The shared opportunity is to resolve continuation of actual delayed histories, whose past emissions determine present acceleration. Neither program needs to await every objective of the other before making a bounded advance.

### Master-Equation Closure: decide the next physical event

The accepted smooth population control now includes the environment's EOM response and the targets' first generated feedback. The [independent separation adjudication](../master-equation-closure/lattice-research/analysis/smooth-two-particle-feedback-separation-independent-adjudication.md), as recorded in the live priorities, establishes increasing target separation over the first feedback interval through $T=17\ell/16$, with initial separation $\ell$, normalized wake speed $c_f=1$, and $0<G/\ell\le16$. This is an accepted bounded derivation, not evidence of permanent separation or generic population behavior.

The recommended next artifact is an event-based continuation theorem for this same control. Identify the next arriving feedback capable of changing the separation estimate, then establish whether separation continues to grow, an approach begins, or a precisely identified condition prevents continuation. Preserve the original history class, coupling domain, and complete causal-root accounting; any reduced coupling interval must be reported explicitly. A later endpoint alone is useful only insofar as it reaches that event or yields a reusable continuation estimate. A sign reversal would overturn continued separation for the affected interval; a failed bound alone would leave the sign unresolved. This distinction prevents mathematical uncertainty from being interpreted as physical attraction or contact.

Alongside that concrete route, formulate the smallest general evolution problem justified by the existing law: admissible past histories, population summation assumptions, causal-root conditions, and a local existence and uniqueness statement with an explicit continuation criterion. This is a proof target, not an assertion that such a theorem already holds. It matters because finite acceleration at release does not show that subsequent coupled evolution exists uniquely. Use the concrete control to test whether the proposed assumptions include the example they are meant to explain. If they exclude it, explain that restriction before attempting a broad theorem. The regulator question remains a separate substantive formulation decision; an unspecified smoothing family cannot decide uniqueness of a regulator limit. Accepted results should extend the existing Master-Equation Closure manuscript.

### Braid Program: obtain a trustworthy binary fate

The ratified ladder begins with the opposite-polarity binary below wake speed, proceeds to wider speed regimes, then to pairs of binaries and six-architrino candidates. The next high-value outcome is a defensible statement about freely evolving binary behavior over a declared domain. A prescribed circular configuration establishes geometry and selected root properties; it does not establish that the master equation sustains that motion.

The [retained frontier evidence](../master-equation-closure/braid-program/evidence/2026-07-27-refined-prefix-joint-frontier-extension.md), still named by the live strategy, reports failure at the next step because uncertainty in the retained history makes the causal emission-time enclosure wider than its fixed tolerance. The evidence attributes that particular boundary to the history remainder rather than insufficient arithmetic precision. This is a recorded instrument limitation, not a newly reproduced failure or a physical fate result.

First establish whether that failure remains on the present EOM solver, then isolate the history-error contribution at the failing step. If it persists, seek a justified history refinement or tighter propagation estimate that reduces that contribution. Keep the acceptance tolerance unchanged. Use an independently derived analytical bound or separately authored reference to establish correctness; agreement between two routes through the same implementation only checks their consistency. If the failure changes or disappears on the current implementation, follow the newly measured obstruction rather than repairing the historical one.

After that local capability is demonstrated, carry a minimal declared binary case through the complete close approach or other event needed for its classification, including relevant self-root onset or a law-domain boundary. Then expand to the existing fate campaign. A turn or finite survival interval does not establish permanent binding; retention requires its stated duration and perturbation scope, while an asymptotic claim requires additional proof. An unbound result or a demonstrated boundary of the unchanged law is also scientific progress. Elaborate geometry searches and assembly mapping should receive attention when they address a named missing dynamical result.

### Decision and stopping conditions

Recommended attention order is Master-Equation Closure first, with a bounded Braid solver diagnosis as the next enabling task. This is a dependency judgment, not a measured optimal allocation. Reconsider it if the continuation proof produces only repeated endpoint extensions without a new physical distinction, or if a current binary case becomes ready for decisive classification. Avoid an open-ended infrastructure project: a solver change earns priority by the specific physical calculation it enables. No broader campaign is launched by this proposal.

The immediate deliverables are the next-feedback theorem target and the current binary failure diagnosis. Successful derivations belong in the existing scientific manuscript or Braid analysis owner after independent assessment. Numerical results retain their explicit history, root, error, duration, and population limits.

## Accounting Before Reduction

Energy and response ledgers should preserve polarity-resolved contributions until a derivation proves that a reduced account loses no information needed by the Master Equation or by an observer-level conservation map. Kinetic and potential bookkeeping may therefore require separate positive- and negative-polarity entries before any symmetric reduction is attempted.

## Delayed Geometry and Scalar Descriptions

A wake map may assign one scalar intensity to each evaluation point while its acceleration contribution also requires transmitter identity, emission time, and the radial line of action. The scalar value and the directional causal-root geometry are distinct objects. Standard scalar-field language is useful only as an effective comparison; it does not establish that an arriving causal wake is fully represented by one scalar at substrate level.

Plainly: one number can describe the local wake strength, but the acceleration calculation still needs to know which past emission arrived and which way the corresponding line of action points.

## Assembly Energy and Frequency Hypotheses

The parked braid fragments suggest that changes in internal frequency, radius, alignment, and translation may participate in one coupled work ledger. They also suggest possible relations among stored angular-momentum-like accounts, internal excitation, thermalization, reaction channels, and strong-field planarity. These are candidate organizing ideas rather than derived mechanisms; none supplies retention, a frequency ladder, a black-hole interior branch, or an effective momentum law.

## One Nature, Many Theories Routing

The two-framework-unification synthesis has moved to the dedicated [One Nature, Many Theories draft](../mapping-one-nature-many-theories/analysis/one-nature-many-theories.md) and its owning [brainstorming file](../mapping-one-nature-many-theories/brainstorming.md). This cross-workstream file retains only the routing boundary; the new lane owns the domain inventory, bridge taxonomy, evidence program, and eventual corpus-promotion decision.

## Relationship to Existing Owners

Accepted cross-workstream tasks remain in [work-queue.md](work-queue.md). Master-equation accounting belongs to the owning Master Equation packets, assembly retention and internal-frequency claims belong to the Braid Program, and observer-level strong-field interpretations belong to the corresponding closure lanes.

## Unresolved Ideas

### Conceptual Exploration Options — 2026-08-27

**Operator preference:** keep several enjoyable conceptual projects alongside the main closure work; recent gauge-theory and ontology discussions were enjoyable. The shortlist began as an inferred preference match; the operator has now selected the spinor and geometric-phase explorations for introductory attention as recorded below. The other options remain provisional, and no scientific result or global priority change follows. Revise the selection if these questions do not sustain the operator's interest or do not yield a concrete explanation, example, or counterexample.

| Candidate exploration and owner | Bounded next artifact | Scope and promotion boundary |
| --- | --- | --- |
| [Spinors, rotations, and history](../mapping-quantum/analysis/spinors-rotations-and-history.md) | Work through one full rotation and two full rotations, then distinguish a mathematical sign from a physically detectable relative phase. | Mathematical learning and an existing recovery target; promote only a separately justified result to the angular-momentum/spin owner. |
| [Gauge, geometric phase, and holonomy](../mapping-standard-model/analysis/geometric-phase-and-holonomy.md) | Compare one change of phase convention with one closed transport cycle, identifying the invariant observable and the missing substrate carrier. | Effective comparison; the assembly gauge chapters retain mechanism and recovery ownership. |
| Information, entropy, and observer access; [entropy mapping](../mapping-benchmarks/analysis/entropy.md) | Compare a complete source-history description with a declared observer's accessible record and identify exactly what the projection loses. | Effective comparison or conditional mathematical example; no assumed invertibility, entropy-production law, or wake-account closure. |
| [One Nature, Many Theories](../mapping-one-nature-many-theories/priorities.md) | Choose one new pair of routes between the same descriptions and compare preserved information, calibration, and prediction. | The prior promotion is complete and its queue is empty; this is a possible new example, not reopening the completed work. |
| [Category theory](../category-theory/priorities.md) as a supporting laboratory | Construct one explicit example distinguishing identical snapshots from equivalent histories or predictions. | Mathematical organization only; category-specific physical expansion remains paused and simpler mathematics is the comparison baseline. |
| [Information Relay Machines](../dormant-deferred/information-relay-machines/priorities.md) | Trace one spoken sentence through a phone call, separating carrier changes from preserved and discarded information. | Established engineering comparison and a possible paper example; the directory remains dormant unless explicitly resumed. |

Plainly: these are choices for satisfying conceptual work, with one small result to aim for in each. Learning a mathematical structure does not establish that an architrino assembly realizes it, and an enjoyable project does not automatically become a higher scientific priority.

**Selected exploration directories:** [spinors-rotations-and-history](../mapping-quantum/analysis/spinors-rotations-and-history.md) and [geometric-phase-and-holonomy](../mapping-standard-model/analysis/geometric-phase-and-holonomy.md) now hold the operator-approved conceptual projects. Their parent queues carry [QC-012](../mapping-quantum/work-queue.md#qc-012--spinors-rotations-and-history-exploration) and [SMC-012](../mapping-standard-model/work-queue.md#smc-012--geometric-phase-and-holonomy-exploration) for introductory attention. The other options remain provisional. These are child explorations, not new top-level workstreams; existing scientific ranks and acceptance contracts are unchanged. Candidate corpus destinations remain subject to separate review and promotion authority.
