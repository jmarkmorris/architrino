# EOM Solver Concept Synthesis

This document synthesizes unaccepted numerical, performance, and consumer ideas for the EOM solver. The live evolution law and numerical obligations belong in the [evolution contract](contracts/evolution-contract-v1.md), accepted implementation work belongs in [work-queue.md](work-queue.md), and reusable instruments belong in the [attractor-search packet](campaigns/attractor-search-instrument.md).

## Numerical Control and Precision

The EOM solver requires event-aware time integration, explicit error budgets, retained-history sufficiency, root identity, reproducible convergence ladders, and bounded precision escalation. Fixed, adaptive, multirate, and event-focused methods are implementation candidates behind one contract; none gains authority from speed alone. A genuinely coarse-grained slow-sector law would be a separate model with its own validation envelope, not merely a larger timestep.

Precision strategy begins with nondimensional charts and local origins, then escalates only the difficult roots, predicates, or reductions that require more arithmetic range. Checkpoints must preserve numeric representation, controller state, root identities, and pending escalations. Exhausted precision or event budgets produce a Verification incomplete outcome rather than silent continuation.

## History, Roots, and Restartability

Every run must demonstrate adequate retained history before and during continuation. Accelerated root tracking may continue known branches, but periodic exhaustive scans remain necessary to detect missed births or additional roots. Active, inactive-gap, unresolved, caustic, and excluded-coincidence states remain distinct, and a restart must reproduce the integrator, controller, history, and active-root state exactly.

## Performance Architecture

Performance is measured as accepted simulated time per wall-clock time, including root difficulty, transfers, checkpointing, diagnostics, convergence, and reproducibility. CPU, GPU, mixed-precision, distributed, and hierarchical methods are candidates only after the same correctness and independent-reference boundaries close. At large path counts, certified exclusion or contribution enclosures may reduce work; any approximation must retain membership, root-topology, and conservative remainder certificates.

The mature far-field enclosure idea is owned by the implemented [Certified Far-Field Contribution Enclosure](contracts/far-field-contribution-enclosure.md) and its evidence packet. It is not duplicated here.

## Consumer and Migration Boundary

Headless batch execution is the first reference surface. Monitoring, pause/resume, dry-run resource estimates, run comparison, compact export, and application playback consume accepted solver records without changing their authority. Animator, Photon, Borg, and braid applications may use EOM histories only after their initial-history and branch-closure conditions are defined without prescribing the desired future path.

## Unresolved Ideas

- **[inferred] Provenance-value heuristic.** Measure operational ambiguity counts and storage/query costs in one EOM campaign before treating provenance value as a stable design diagnostic; falsifier: the proposed provenance fields do not reduce ambiguity enough to justify their measured execution and storage cost.
