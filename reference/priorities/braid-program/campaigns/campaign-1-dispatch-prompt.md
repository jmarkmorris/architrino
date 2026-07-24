# Braid Program — Campaign 1 Dispatch Prompt

Operator dispatch text, authored 2026-07-16. Paste as a single prompt. Part 2 is gated on Part 1 passing; the thread stops and reports rather than proceeding past a failed gate.

---

Closure goal: certify that the EOM engine evolves paths by the master equation and nothing else, then run the braid program's first campaign — sub-field opposite-polarity binary evolution (N-ladder rung 1).

Read first: `reference/priorities/braid-program/README.md` (charter and ground rules), `method.md` (Stage S/E discipline, acceptance gates, collapse protocol), `campaigns/instrument-gate.md` (accepted capabilities G1–G5, barred list, booking checklist, `assembly-view-record.v0`), and `priorities.md` (queue items 2–3). AGENTS.md Solver Ownership and Theory Layer Discipline bind throughout. EOM (`src/eom`) is the only engine; producer-asserted evidence flags are never consumed.

## Part 1 — Path-provenance audit of the EOM engine (gate)

Question: does anything in the EOM stack compute, substitute, or assume a trajectory by any method other than coupled master-equation evolution of retained histories? Evolution output is evidence only if every evolved path segment comes from the master equation acting on declared retained history. Sweep and classify every path source in:

- `src/eom` (C++ host and native layer): history factories, initial-condition constructors, analytic specializations (for example pinned-fold Taylor/midpoint enclosures), fallback branches, checkpoint restore, publication paths;
- `scripts/eom` (harness, ladder, converters): workload construction, seed authoring, replay and conversion;
- `src/apps/shared` and app display adapters: interpolation and sampling;
- `src/prescribed-path-analysis`: confirm its non-evidence firewall — nothing downstream of it may enter an evolution claim;
- the Python oracle (`scripts/eom/oracle`): confirm it is independent and consumes no engine-authored shortcuts.

Classify every path source into exactly one bin: (a) **master-equation evolution** — the only bin that may produce evolved segments; (b) **declared initial condition / prehistory** — authored inputs, legitimate only when declared, certified, and never counted as evolution output; (c) **certified numeric specialization** — approximations of the master-equation integral itself, admissible only with an explicit certificate showing the specialization encloses the unmodified integral; (d) **display-only** — interpolation for rendering, never state; (e) **non-evidence analysis** — conditional evaluation on assumed paths, firewalled from evidence.

Anything that does not fit — a hard-coded motion form, a toy or parameterized interaction stand-in, an analytic orbit substituted for evolution, a fallback that fabricates segments, a flag that upgrades unevolved data — is a FAIL. Fail closed: report each finding with file, line, mechanism, and blast radius; propose the fix or bar; do not modify engine semantics without operator approval. Book the audit as a dated report in `reference/priorities/braid-program/evidence/` (create the directory if absent) with a work-log entry. Part 2 opens only if the audit finds zero unclassified path sources, or every finding is fixed or barred with operator sign-off.

## Part 2 — Campaign 1: sub-field opposite-polarity binary evolution (rung 1)

Author `campaigns/campaign-1-subfield-binary.md` (spec before runs), then execute. The campaign answers: what is the fate of two opposite-polarity architrinos, both strictly below field speed, under master-equation evolution — bound, unbound, or conditional on prehistory?

Spec must declare, per the instrument gate: the engine build identity (build time vs last `src/eom` source change); the initial-condition family (separations, speeds, approach geometries — include head-on/collinear rows in the grid, feeding queue item 4); **declared prehistories as first-class search coordinates** — at least three materially different, endpoint-matched prehistories per claimed configuration; the refinement envelope (step, history segmentation, root-search depth, chunking); master-equation residual gates along every trajectory; root-ledger clearance before any claim window; one independent-oracle parity window per production run (G5); and a named falsifier.

Execution and booking rules: every booked run and every collapse-protocol seed emits an `assembly-view-record.v0` file beside its evidence; fate classifications book at `executable_architecture_evidence` — no canonical claims; object-level temporal claims (bound, dispersed, settled) take the full collapse protocol — endpoint-matched prehistories evolved past the delay horizon and compared on symmetry-reduced observables; a result outside its refinement envelope is not a result; agreement of the engine with itself is determinism evidence only. Windows must stay strictly sub-field: no field-speed folds (that extension is a Waiting On item). Land evidence in `campaigns/` and `evidence/`, update `work-log.md` (append-only) and the queue state in `priorities.md`, and report: audit verdict, spec summary, run inventory, fate table with collapse-protocol outcomes, residual/parity results, and the recommended rung-2 entry conditions.
