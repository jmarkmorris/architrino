# Master-Equation Closure and its research programs

This directory brings the shared Master Equation and its configuration-specific investigations together. The parent owns general questions about causal roots, admissible histories, infinite-population summation, continuation and common accounts. Its [manuscript](manuscript.md), [priorities](priorities.md) and [queue](work-queue.md) explain that work; `analysis/` contains the shared derivations and assessments.

## Research directories

| Research owner | Subject | Current route |
| --- | --- | --- |
| [Collinear research](collinear-research/README.md) | Complete histories constrained to one line: approach, coincidence, passage, braking and recurrence | [Manuscript](collinear-research/manuscript.md) · [Queue](collinear-research/work-queue.md) |
| [Lattice research](lattice-research/README.md) | Repeated populations, their supplied or self-consistent histories, disturbances and collective motion | [Manuscript](lattice-research/manuscript.md) · [Queue](lattice-research/work-queue.md) |
| [Binary research](binary-research/README.md) | One two-architrino system: circular motion, general approach, delayed response and fate | [Manuscript](binary-research/manuscript.md) · [Queue](binary-research/work-queue.md) |
| [Braid Program](braid-program/README.md) | Multi-binary and other multi-architrino collections: configuration, complete-history dynamics and persistence | [Manuscript](braid-program/manuscript.md) · [Queue](braid-program/work-queue.md) |
| [Photon research](photon-research/README.md) | Candidate photon assemblies, propagation and interaction with specified source and ambient histories | [Manuscript](photon-research/manuscript.md) · [Deferred target](photon-research/work-queue.md) |
| [Neutrino research](neutrino-research/README.md) | Candidate neutrino assemblies, their complete histories, propagation and source/detector coupling | [Manuscript](neutrino-research/manuscript.md) · [Research routes](neutrino-research/work-queue.md) |
| [Quark research](quark-research/README.md) | Candidate quark geometry, mixed-polarity accessories and complete-history assembly interactions | [Manuscript](quark-research/manuscript.md) · [Research routes](quark-research/work-queue.md) |
| [Noether sea research](noether-sea-research/README.md) | Ambient braid populations, collective response and interaction with embedded assemblies | [Manuscript](noether-sea-research/manuscript.md) · [Deferred target](noether-sea-research/work-queue.md) |

Binary research owns the single-pair problem; the Braid Program studies collections beyond that pair, including two or more binaries without assuming every collection already forms a retained braid. Collinear research remains the geometry owner for motion constrained to a line and supplies linked controls to binary research. Photon, neutrino and quark research own their respective candidate assemblies; the Braid Program supplies generic assembly qualification, mapping workstreams own observer-level recovery, and the Photon app presents source-backed results. This working taxonomy can be refined when the dynamics establish more specific families.

The physical parent does not merge these scientific responsibilities. Each result has one authoritative source and each task one execution owner. The parent queue covers shared-law questions; child queues cover their particular investigations. The [workstream declaration](workstreams.json) identifies current and dormant children for priority discovery and navigation. A deferred target in a current research owner remains deferred.

## Where the unchanged equation stands across geometries

Three documents give the cross-geometry picture and are kept current as owners record results.

- The [geometry configuration registry](configurations/geometry-configuration-registry.md) lists every configuration the owners name, with three answers for each: whether a complete history satisfies the equation, what happens to nearby histories, and whether any evolved motion has been retained.
- The [findings ledger](configurations/findings-ledger.md) lists the individual findings with their grades, rates the open research routes, and records the decisions waiting on the operator.
- The [slow-regime synthesis](analysis/slow-regime-synthesis-2026-10-03.md) connects the results below and across wake speed into one account.

The current account under the unchanged equation is this. Exact rigid balances are common: an infinite [rotating ladder](lattice-research/analysis/rotating-alternating-ladder.md) and 165 finite arrangements of two to twenty members found by two [search campaigns](braid-program/analysis/rigid-balance-search-2026-10-04.md), 126 of them entirely below wake speed and enclosed in interval arithmetic, some travelling along their rotation axis, and the smallest a [pair in closed form](binary-research/analysis/asymmetric-opposite-pair-closed-form.md). Every one has growing modes, never fewer than two per member. [Released with a small disturbance](braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md), the balances below wake speed reached a member arriving at wake speed in 274 of 276 runs, within about two periods, at a measured positive rate with regular rows; in the other two runs the arrangement dispersed with every member still below wake speed, and one of them, followed to 30 periods, is seven free architrinos: a dissolution and not an assembly. A [theorem for curved paths](analysis/curved-path-wake-speed-obstructions.md) shows that an arrival at a positive rate, from an entirely sub-wake past, with bounded and continuous rows from the other members, has no continuation with continuous, absolutely continuous velocity and ordinary roots when the equation is imposed across the event. Balances with a member above wake speed, released with an integrator that resolves the births and mergers of causal roots, end in the converged runs with an arrival at wake speed from below, a descent to it from above, or, for one three-member rotor, dispersal. A [root-birth law](analysis/root-birth-impulse-law.md), derived at leading order and re-derived blind by a delegated adjudicator, gives in closed form the time in which a close passage of a member above wake speed drives a slower member to wake speed. Under the field-speed ceiling variation, which is not the Master Equation, the same releases were [continued past wake speed](braid-program/analysis/released-balances-under-field-speed-ceiling-2026-10-06.md): most then end with two opposite members coming together, which that definition does not resolve, the rest disperse, and none stays bound. Slow motion does not settle: slow pairs expand and unbind, and slow arrangements break into pairs. The grades and limits of each statement are in the linked documents; the release results are float measurements.

## How to compare investigations

Read a configuration together with its constituents, complete histories, boundary population, equation version, summation convention and evidence grade. A lattice of individual architrinos differs from a lattice whose sites contain resolved braids. A supplied local disturbance differs from a coherent history constructed under the equation. An exact prescribed configuration differs from a retained freely evolving assembly.

Each configuration directory owns all research for its subject, including canonical-law studies, field-speed-ceiling studies, logarithmic-potential studies and their explicitly selected combination. Its manuscript, analyses, evidence and queue provide the complete research path. These equation choices are not separate configuration workstreams. Noether sea research retains its unresolved population and constitutive-response conditions; a directory name supplies no equilibrium or relaxation theorem.

## Shared equation variations

The canonical Master Equation remains the baseline. The [equation-variants directory](equation-variants/README.md) owns shared definitions and general consequences of the only authorized research variations: [field-speed ceiling](equation-variants/field-speed-ceiling/README.md) and [logarithmic potential](equation-variants/logarithmic-potential/README.md), separately or [together](equation-variants/combined-variations.md). Research permission does not adopt either variation or silently select it for a scenario. Geometry-specific proofs, reviews, evidence and tasks belong to the corresponding configuration owner; shared questions stay in the parent queue.

The logarithmic collinear encounter and ceiling comparisons are developed in [collinear research](collinear-research/analysis/logarithmic-collinear-manuscript.md). Mixed ceiling history is preserved under its shared definition; its old queue remains historical. The [migration account](analysis/equation-ownership-migration-2026-10-03.md) records ownership and evidence preservation.

[Mapping workstreams](../mapping/README.md) own recovery of observer-level phenomena. The [EOM solver](../app-solver/README.md) owns the computational instrument, while [Lattice Lab](../app-lattice-lab/priorities.md) owns its presentation surface. Those responsibilities remain outside this research parent.

The [migration record](../aaa-work-threads/campaigns/configuration-research-ownership-map.md#9-execution-evidence-and-limits) records source locations, preserved evidence and verification of this organization.

The [binary and photon separation record](../aaa-work-threads/campaigns/binary-photon-research-separation.md) records the subsequent single-pair transfer and photon research owner.

The [directory-review synthesis](analysis/research-review-synthesis-2026-10-03.md) integrates the ten supplied reviews, distinguishes established results from provisional analytical advances, and identifies the remaining proof and evidence questions. It changes no equation selection, accepted score, ranked task or dormant lifecycle.
