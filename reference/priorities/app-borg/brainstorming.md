# Borg App Concept Synthesis

This document retains provisional Borg concepts that are not accepted tasks. Borg is an app-facing consumer of EOM-solver histories and sealed assembly-view records; it does not own forward physics or upgrade replay output into evidence.

## Routing Boundary

Accepted implementation work belongs in [work-queue.md](work-queue.md), strategic and promotion routing belongs in [priorities.md](priorities.md), and detailed design belongs in the existing focused requirements and replay packets.

## Unresolved Ideas

No unresolved proposal to reinstate family hierarchy remains here. Flat catalog organization and peer example names are accepted rules in [the catalog contract](contracts/requirements-and-design.md#flat-catalog-and-selection). Open identity relations and general facet definitions remain in BORG-014 rather than reinstating a family hierarchy.

The accepted circle-occupancy and component-braid-dimensionality design is implemented and owned by [the Borg requirements](contracts/requirements-and-design.md), [the source-assignment audit](evidence/selector-assignment-audit.md), and the canonical [Braid Taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md). No unresolved proposal remains here.

## Assemblies under alternative Master Equations

Proposal captured on 2026-10-09 following the operator's question about incorporating recent equation-variant research. Status: provisional design, not an accepted implementation task or selection of further research. Theory level: comparison of explicitly specified substrate laws. Evidence grade: inferred application design grounded in the inspected interfaces below; no new physical result is asserted.

### What the user should be able to see

Borg should let a reader select an assembly, inspect the equations under which it has been studied, and compare the available results. Each result should answer four separate questions: what geometry and preparation were used, which exact equation was applied, what produced the displayed motion, and what the research establishes. A circular path can illustrate an exact acceleration balance without demonstrating stability; a trajectory can show departure over a finite interval without proving all-future dispersal. These distinctions belong beside the view, with links to the source account.

An equation filter would narrow existing research records. Selecting another equation would select another identified result, or explain that no corresponding record is available. It would not recalculate the displayed paths. A separate run action would request new evolution only for a supported and selected case. The library would retain its flat catalog, with source-declared links between related cases rather than equation-named family hierarchies.

### Existing interfaces and the necessary changes

Code inspection of [EomHistoryDataset.mjs](../../../src/apps/shared/EomHistoryDataset.mjs), specifically `normalizeProvenance`, finds that assembly-view records accept only the EOM engine or `prescribed-geometry`; the latter requires `chart-hypothesis`, `display-only`, and a declaration that no physics was invoked. An offline research integrator's trajectory therefore cannot be imported honestly by relabeling it as either producer. The [assembly-view contract](contracts/assembly-viewer-requirements.md) and its scientific schema owner need a versioned extension that represents research-produced trajectories explicitly, preserving instrument identity, version, source bytes, interpolation, error information, recorded coverage, and evidence grade. This proposal does not declare existing research outputs import-ready: each needs an inventory of its actual trajectory and provenance carriers. A theorem without retained trajectories can have an explanatory geometry and linked theorem, but no invented evolved record.

Reading the [EOM evolution contract](../app-solver/contracts/evolution-contract-v1.md#borg-live-request-binding) establishes that live Borg requests are bound to `master_eom_binding/v1`. Inspection of [BorgPrescribedDisplayBranch.js](../../../src/apps/borg/BorgPrescribedDisplayBranch.js) finds a fixed Display profile and source-history continuation rather than a selector for alternative laws. Live variant execution therefore requires an explicit solver-contract amendment or successor, implementation in the EOM solver, and independent validation for each supported law and domain. A browser equation menu alone cannot supply that capability. The current canonical continuation must not be presented as continuation under a selected research variant.

### Bind each result to its equation and preparation

The [equation-variant index](../master-equation-closure/equation-variants/README.md) remains the definition and authorization owner. A machine-readable projection should point to its exact defining passages and revisions, with source-owned coefficients, distance dependence, time support, self/partner treatment, root policy, speed domain, boundary response, and stopping rules. Authorization, scientific acceptance, and executable solver support are independent properties. A bounded pair selection does not authorize a many-member run, and a historical or withdrawn result can remain inspectable without becoming runnable.

Each study would bind that specification to the exact assembly revision, complete preparation, perturbation, producer and run, numerical settings, result interval, and any independent adjudication. Preserve the current [identity contract](contracts/assembly-identity-relation-contract.md): applicable source-law changes participate in scientific identity, while labels and taxonomy do not. Cross-equation relationships must be explicit source relations; similar pictures cannot transfer identity, a verdict, or stability. Extend the existing scientific-status projection and its exact matching, rather than calculating a second verdict in Borg. Where an existing requirement is inapplicable to a comparison law, report that scope explicitly instead of treating it as a pass.

### Compare like preparations honestly

The default comparison would use two synchronized views, a shared physical time interval and declared frame, and source-carried diagnostics such as separation, speed, acceleration residual and stopping event. New numerical instantiations use $c_f=1$. Normalizing each run by its own period is a separate labeled view, since it can hide different timescales. Stop each replay at its recorded endpoint; retain the terminal pose and reason without extrapolation.

Two useful comparisons require different labels. Evaluating two laws on the same prescribed complete history compares their responses. Evolving separately compatible initial histories compares their resulting futures, but may also reflect different preparations. The [Maxwell investigation](../master-equation-closure/binary-research/analysis/maxwell-shaped-overnight-investigation.md#scope-and-defining-cases) expressly distinguishes those experiments: E and E+M can require different endpoint compatibility patches, and delayed source acceleration makes position and velocity at release insufficient. A preparation comparison must expose these differences. Instantaneous Weber and its selected delayed adaptation likewise remain separate equations with different input obligations.

### Recent research suitable for a first intake

| Research source | Useful Borg presentation | Boundary to preserve |
| --- | --- | --- |
| [Canonical and logarithmic binary accounts](../master-equation-closure/binary-research/priorities.md) | Related preparations, exact or explanatory orbit geometry, and links to local or all-future conclusions; replay only when source histories are available | Analytical enclosures are not measured trajectories; local departure and later fate remain distinct |
| [Maxwell E and E+M](../master-equation-closure/binary-research/analysis/maxwell-shaped-overnight-investigation.md) | Two named equation cases with response comparisons and any qualified recorded evolution | Complete histories and compatibility patches stay visible; no implicit self response or boundary extension |
| [Instantaneous Weber assembly research](../master-equation-closure/braid-program/analysis/weber-binding-sphere-continuation-2026-10-06.md) | Exact ring geometry, linked balance and instability results, and scoped exclusion or search findings | A balanced ring is not a stable braid; bounded search negatives are not global exclusions; delayed Weber is separate |
| [Released balances under the field-speed ceiling](../master-equation-closure/braid-program/analysis/released-balances-under-field-speed-ceiling-2026-10-06.md) | Prescribed rigid past, release, arrival at the ceiling, and the recorded terminal event | Preserve the actual research integrator and its measured grade; stop at unresolved contact without adding a contact law |

These are intake candidates, not a claim that their raw data meet Borg's replay requirements. Amplitude-gradient and combined logarithmic/ceiling cases use the same source-driven scheme when a concrete packet is available; the catalog need not create all combinations of equation labels.

### Recommended sequence and verification boundary

Legend: ○ Not done. The following are proposed steps, not queued execution.

1. ○ Not done — Inventory one bounded released-balance case and its corresponding canonical case, checking that the preparations, coefficients, units, source histories and terminal events are actually comparable. Prefer this pair because it can show the change from the canonical stopping event to the ceiling continuation and its next obstruction. If suitable retained trajectories are absent, begin with labeled geometry and findings.
2. ○ Not done — Specify and implement the source-owned equation binding and research-record import, then expose equation, preparation, producer and findings in the existing Library and workbench. Preserve record-only behavior and provide an explicit unavailable state for unsupported replay data.
3. ○ Not done — Add synchronized comparison using declared transforms, overlapping coverage and source-carried diagnostics. Establish whether the existing comparison path satisfies this use case before extending it.
4. ○ Not done — Add live execution only after the selected variant has an amended EOM contract, validated history admission, independently checked acceleration evaluation and appropriate integration, plus explicit domain/event stops. Retain research/comparison status independently of numerical run grade. Maxwell's delayed acceleration and Weber's implicit acceleration obligations require more than swapping a radial kernel.

Before implementation, agree the focused checks under the testing regime. The decisive checks should demonstrate that equation or preparation changes cannot reuse another case's result, unsupported laws cannot silently invoke canonical evolution, external producers cannot acquire an EOM label, incompatible comparisons remain unavailable, replay does not extend beyond coverage, and law-specific known cases pass against an independent reference established before target use. Preserve independent research instruments while adapting their outputs; do not modify both the solver and its oracle in one change.

Falsifier for this design: it fails its purpose if a reader can change the displayed equation without changing the bound result, mistake a prescribed balance for a stable evolution, or start a continuation that silently changes the source law or preparation. Inspect the selected record identity and provenance, emitted request binding, and terminal playback time to test those failures. The next concrete artifact is the bounded intake inventory and proposed contract delta. Any eventual reader-facing explanation belongs in Borg's app help after the interface and source contracts are accepted; this proposal remains in the working owner.
