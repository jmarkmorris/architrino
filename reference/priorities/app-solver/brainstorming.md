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

- **[inferred] Event-aware integration portfolio.** Compare fixed, adaptive, event-focused, and exactly nested multirate schedules behind the same evolution contract; required evidence: independent analytical cases, cross-integrator convergence, and event-order preservation.
- **[closure target] Precision-escalation policy.** Define portable binary64-through-certified-arithmetic escalation with bounded cost and explicit refusal semantics; falsifier: a difficult-root case changes accepted identity or order across the declared ladder.
- **[inferred] Production toolchain benchmark.** Compare candidate host and accelerator stacks on accepted simulated time, reproducibility, precision capability, portability, build complexity, and maintenance using the same workload and oracle.
- **[closure target] Accelerated root continuation.** Prove that predictive brackets and indices do not miss births or additional roots by pairing them with exhaustive fallback scans and a declared miss criterion.
- **[measured target] Candidate assembly formation diagnostic.** On refined four-path runs, track minimum-cost opposite-polarity pairing, swaps, separation bands, relative speeds, within/between separation ratio, and persistence; assembly promotion still requires the owning branch and independent-evidence gates.
- **[instrument target] Moving-branch drift relaxation.** Evolve declared drift seeds from an accepted rest branch with $c_f=1$, emit shape, clock, synchronization, root, history, and convergence records, and compare direct with sequential drift; Lorentz acceptance remains with Mapping Benchmarks.
- **[inferred] Deterministic CPU decomposition.** Benchmark receiver, source, and history partitioning with fixed reductions and measured counters before adopting work stealing, NUMA placement, or asynchronous output.
- **[inferred] Heterogeneous root pipeline.** Test batched bulk root work with a separate difficult-event path while preserving deterministic reduction and certified mixed-precision escalation.
- **[closure target] Million-path execution envelope.** Measure $N=10^4$, $10^5$, and $10^6$ workloads, admit hierarchical grouping only with certified topology and acceleration remainder bounds, and reject noncompressible cases outside declared resources.
- **[inferred] Performance search program.** Compare exhaustive, indexed, continuation, hierarchical, and hybrid algorithms against one correctness-first implementation and an independently authored oracle; record wall time, energy use, and cost per accepted simulated interval.
- **[inferred] Solver operations surface.** Specify headless run, monitor, accepted-boundary pause, content-hashed resume, dry-run resource estimate, comparison, and export behavior without coupling UI state to evolution semantics.
- **[closure target] Application migration readiness.** Define the record and branch conditions under which Animator, Photon, Borg, and braid consumers may use EOM histories without authored-future-path controls.
