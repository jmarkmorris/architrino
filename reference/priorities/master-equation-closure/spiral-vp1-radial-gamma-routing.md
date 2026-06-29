# VP-1 Receiver-Normal Radial Gamma Routing Target

Status. Receiver-normal restart target for radial gamma routing. This file no longer
routes source-normal branch sums into pass/fail sidecar rows.

Claim level. Priority-only restart target.

The routing rule is:

1. emit $D_s$, $D_t$, and $W^{\mathrm{rec}}$ for every retained VP-1 branch;
2. compute $B_r^{\mathrm{rec}}$ on those same boxes;
3. only then compare $B_r^{\mathrm{rec}}$ to an independently justified
   kinematic $\Gamma$ interval.

Any row lacking the receiver-normal branch table remains blocked.
