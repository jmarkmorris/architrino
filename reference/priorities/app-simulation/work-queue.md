# Simulation Protocol Routing Work Queue

This directory is an active routing index, not an execution owner.

## Ranked Next Objects

No locally owned rows. All preserved simulation tasks route to canonical owners.

## Routed objects

| Object | Execution owner |
| --- | --- |
| `tier0_tier1_runs` | [Master-Equation Closure](../master-equation-closure/work-queue.md) |
| `field_speed_action_self_hit_scan` | [Braid Program](../braid-program/work-queue.md) and Master-Equation Closure |
| `convergence_and_provenance` | [App Solver](../app-solver/work-queue.md) |
| `eta_positive_package` | Master-Equation Closure |
| `hydrogen_gamma_n_record_extraction` | [Nuclear, Atomic, and Molecular Closure](../dormant-deferred/mapping-nuclear-atomic-molecular/work-queue.md) |
| `gw_public_waveform_packet` | [Strong-Field Closure](../mapping-strong-field/work-queue.md) and [Equation Mapping](../mapping-equations/work-queue.md) |

## Open work

No rows. Promote a simulation-side idea only into the canonical owner’s queue.
