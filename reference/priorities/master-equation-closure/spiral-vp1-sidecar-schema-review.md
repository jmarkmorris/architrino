# VP-1 Receiver-Normal Sidecar Schema Review

Status. Receiver-normal schema review target. The sidecar schema must no longer
accept source-normal radial or tangential drive rows as theorem-grade evidence.

Claim level. Restart target, not schema closure.

## Schema Requirement

Drive rows must carry receiver-normal data:

| Row family | Required fields |
| --- | --- |
| radial | retained labels, retained boxes, $D_s$, $D_t$, $W^{\mathrm{rec}}$, $B_r^{\mathrm{rec}}$, negative control |
| tangential | retained labels, retained boxes, $D_s$, $D_t$, $W^{\mathrm{rec}}$, weighted receiver-normal drive interval, negative control |
| compatibility | retained labels, retained boxes, $D_s$, $D_t$, $W^{\mathrm{rec}}$, receiver-normal turn-center residual, negative control |

## Promotion Rule

The sidecar can keep topology rows such as active roots, inactive gaps,
finite-memory depth, and source-normal Jacobian floors. It must not mark drive
rows `passed` or `certified_fail` unless those drive rows consume same-record
receiver-normal branch strength.
