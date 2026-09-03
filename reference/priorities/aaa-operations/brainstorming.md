# Operations Conceptual Synthesis

This synthesis reserves space for provisional operational ideas concerning deployment, reliability, cost, performance, security, support, and public release. It is not a theory or solver-design lane.

## Established Ownership

Hosting assumptions, measured budget classes, release criteria, browser performance, artifact retention, observability, recovery, route ownership, dependency review, and feedback intake already have accepted task records in [work-queue.md](work-queue.md). Static hosting costs, browser resources, and EOM solver throughput remain separate measurements.

## Advancement Boundary

An additional operations idea must name a measurable risk, affected public surface, owner, completion condition, and failure-and-recovery behavior. Operational polish cannot create a second solver authority or change theory evidence.

## Unresolved Ideas

- **Agent responses rendered in a side panel rather than inline.** Shelved by the operator on 2026-09-03, kept because the underlying need is real. The request behind it is that a substantive explanatory response be readable with the same symbol-definition support a corpus document has. [OPS-016](work-queue.md#ops-016--reference-equation-mapping-surface) delivers that for anything written to a file. Extending it to chat responses is a different kind of change: a response is not a repository document, so it would have to be written to a known path as well as delivered inline, and then rendered by the reference mapping surface. Measurable risk is file accumulation — every explanation becomes a durable artifact requiring retention policy under [machine-artifact retention](../../op/machine-artifact-retention.md). No owner, no completion condition, and no decision to advance it. Revisit only after OPS-016 ships and the file-based surface has been used enough to show whether it already meets the need.
