# Barnes-Hut Lane Work Queue

[Priorities](priorities.md) owns the current scope. The lane is unranked and has no assigned numerical scores. Local ordering below follows dependencies.

Legend: ✓ Done, ◐ Partial, ○ Not done. Completed objects are removed from the live list and recorded in [work-log.md](work-log.md).

## Ranked Next Objects

No runnable object is selected. The lane is in background collection and design; its first accepted object will be a specification of the candidate algorithm's remainder bound against the EOM far-field enclosure contract, which requires operator selection.

## Deferred / blocked

### BHL-001 — Certified remainder bound for one space-time cell

- **Status:** ○ Not done — Awaiting operator selection after review of the manuscript's candidate algorithm.
- **Scope:** For one source cell over one emission-time slab and one receiver event, state and prove an outward bound on the difference between the exact Master Equation contribution and its truncated moment expansion, under the cubic retained-history representation and the existing transmitter-factor floor.
- **Completion:** A derivation reviewed by a separately authored check, with a worked $c_f=1$ example and a falsifier naming the independent exact-pair evaluation that would overturn the bound.

### BHL-002 — Comparison against the zero-centered enclosure route

- **Status:** ○ Not done — Deferred behind BHL-001.
- **Scope:** Measure, on a bounded population with existing EOM fixtures, how many ordered pairs the moment-expanded route admits under a fixed acceleration budget compared with the implemented zero-centered far-field enclosure.
- **Completion:** Matched wall-time and admitted-pair counts recorded in `evidence/`, with the same budget, population and host; a geometric or count-only argument does not close this object.
