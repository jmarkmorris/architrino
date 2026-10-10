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

The current account under the unchanged equation is this. The finite [search campaigns](braid-program/analysis/rigid-balance-search-2026-10-04.md) found 165 rigid balances of two to twenty members, 126 entirely below wake speed and enclosed by interval arithmetic. Separately, existence of the infinite [rotating ladder](lattice-research/analysis/rotating-alternating-ladder.md) is derived for sufficiently small speed; its broader measured branch is a float balance to rounding, without an enclosure. Some travel along their rotation axis, and the smallest is a [pair in closed form](binary-research/analysis/asymmetric-opposite-pair-closed-form.md). Every finite balance examined has growing characteristic roots in the float calculation, never fewer than two per member. These are measured formal modes, rather than certified counts for every balance; the search establishes the enclosed solutions it found and excludes nothing beyond its starts.

[Released with small disturbances](braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md), the 126 balances below wake speed produced 274 arrivals at wake speed in 276 runs, within about two periods. Positive arrival rate and regular-row hypotheses were measured in 250 arrivals; the remaining 24 retain unchecked hypotheses. The other two runs dispersed with every member still below wake speed; one followed to 30 periods shows seven separating architrinos over that measured interval. The [curved-path arrival theorem](analysis/curved-path-wake-speed-obstructions.md) excludes continuation with continuous velocity, absolutely continuous on compact outgoing intervals, and ordinary roots when the whole incoming past is sub-wake, arrival has positive linear rate, partner rows remain bounded and continuous, and the equation is imposed across the event. The [earlier lattice family](analysis/smooth-two-particle-weaker-continuation.md) proves a related obstruction under its own stationary-past and population hypotheses. Neither theorem supplies an outgoing event rule.

Mixed-speed balances released with an integrator resolving root births and mergers end, in the converged runs, at an arrival from below, a descent from above or dispersal of one three-member rotor. The [root-birth law](analysis/root-birth-impulse-law.md), derived at leading order and accepted with corrections after a separately constructed blind derivation, gives an asymptotic arrival time for a close passage. Its validity requires small newborn delay, small curvature-times-delay-cubed and slowly changing birth geometry; for a fast straight source the passing distance times passing speed must be small in the stated normalized units. It is not an exact arrival-time theorem for every passage. Under the [field-speed ceiling variation](braid-program/analysis/released-balances-under-field-speed-ceiling-2026-10-06.md), 153 of 172 runs end at opposite-member contact, 18 disperse and one remains unfinished; no bound future is established by this finite sample. These release results are float measurements under their separately declared equations.

All-future dispersal is derived for the declared very-slow mirror pair preparations and for the [nominal nonmirror spatial preparation and its admitted neighbourhood](manuscript.md#351-controlled-mirror-pair-evolution-under-two-declared-responses). Three slow multi-member releases separate into pairs; other few-member outcomes include unresolved close approaches. These results do not classify arbitrary slow histories or establish universal breakup of arrangements. No persistent assembly has been established by these investigations, and persistence under the unchanged equation remains open.

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
