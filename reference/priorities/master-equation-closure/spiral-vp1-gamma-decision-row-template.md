# VP-1 Receiver-Normal Radial Decision Template

Status. Receiver-normal template for a future VP-1 radial decision row. This file no
longer defines a gamma/branch-sum shortcut and does not provide a pass or
failure fixture.

Claim level. Restart target, not a certificate.

## Required Row

A future `rows.radial_turn` object may decide VP-1 only if it contains:

| Field | Required meaning |
| --- | --- |
| `status` | `passed`, `certified_fail`, or `blocked` after receiver-normal evaluation |
| `data.D_s_interval` | source-normal interval on the retained root box |
| `data.D_t_interval` | receiver-normal interval on the same box |
| `data.W_rec_interval` | outward interval for `abs(D_t/D_s)` |
| `data.B_r_rec_interval` | receiver-normal radial branch-sum interval |
| `data.gamma_interval` | independently justified kinematic interval, if used |
| `data.negative_control` | confirms the row fails closed when $D_t$ is missing or mismatched |

## Promotion Rule

No VP-1 radial row may pass or fail from a source-normal branch sum. The row must
compare the kinematic demand to $B_r^{\mathrm{rec}}$ computed from same-record
$D_s$, $D_t$, and $W^{\mathrm{rec}}$ intervals.
