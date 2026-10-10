# Shell Work Log

This file records authorization, inspections and validation. The current explanation belongs in [manuscript.md](manuscript.md), design in [contracts/requirements-and-design.md](contracts/requirements-and-design.md), and unresolved executable work in [work-queue.md](work-queue.md).

## 2026-10-10 — App priority opened

The operator requested a new `reference/priorities/` folder for an app studying distributions of architrinos supplied with initial conditions and histories on a fixed closed shape, initially a spherical or ellipsoidal 3:3 population. The operator explicitly selected artificial surface confinement. Codex proposed **Shell**, directory `app-shell`, as a working app name; final naming remains open to operator revision.

Created the design owner, constrained-equation treatment, application requirements, queue and provisional extension capture. This is a planning deliverable. No app runtime, solver change, target evolution, independent mathematical adjudication or physical assembly result is reported.

Reading `app-borg/priorities.md` and the spherical 3:3 synthesis identified their distinct display and scientific responsibilities. Reading the EOM contract's retained-history clause and `NativeCoupledEvolutionRequest` in `src/eom/include/architrino/eom/CoupledEvolution.hpp` identified the constrained-mode contract dependency within that inspected scope; a supported constrained request/implementation would overturn it. The existing spherical dynamics analysis reports the same boundary in its named construction paths. Existing spherical files and concurrent work are untouched by this task.

The new normal-support derivation follows the twice-differentiated fixed-surface condition and is self-reviewed. Independent review remains in SHELL-001. The great-circle example is an analytical reference for future verification, not a numerical run. The energy–size–frequency relation remains guessed; no energy scalar or damping rule is introduced.

**Measured document checks:** `node scripts/validate-priority-ranking.mjs` passed with the new owner included: 33 active owners have queues and 14 ranked rows remain aligned. `git diff --check -- reference/priorities/README.md` and separate `git diff --no-index --check /dev/null <file>` checks for every new Shell Markdown file emitted no whitespace diagnostics. These are owner-structure and document-hygiene checks, not scientific acceptance.

An inline Node link instrument first passed known ordinary-link, fenced-code, heading-slug and existing/missing-path controls. Its target run falsely classified the mathematical expression `A[X](T)` as a link. The instrument was corrected to exclude inline and display mathematics, passed that added known control before reuse, then checked all 32 conventional Markdown relative links and section anchors across the seven Shell documents successfully. Standalone display delimiters were paired. The check's scope is the authored link syntax in these documents, not a general Markdown parser or a rendered-math check; a missing target, anchor or unmatched display delimiter would overturn the corresponding receipt. No source mathematics was changed to satisfy the instrument.
