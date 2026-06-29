# Spiral A1 Receiver-Normal Nonconstant Time-Law Target

Status. Current-law restart target for nonconstant A1 time-law charts. This file
does not preserve a radial/tangential verdict from any constant-rate or
source-normal branch-strength calculation.

Claim level. Priority-only restart target.

## Target

A nonconstant time law may be tested only by rebuilding the retained branch chart
with same-record
$$
D_s,\qquad D_t,\qquad W^{\mathrm{rec}}=\left|D_t/D_s\right|.
$$

The branch topology, memory horizon, inactive gaps, and source-normal Jacobian
floors are admissibility diagnostics. They are not drive evidence.

## Required Output

The next nonconstant A1 chart must emit:

| Row | Required content |
| --- | --- |
| retained roots | $P_1,P_2,P_3,S_1$ boxes on the selected time law |
| source-normal floor | $D_s$ interval and nonzero lower bound |
| receiver-normal row | $D_t$ interval on the same box |
| branch strength | outward $W^{\mathrm{rec}}$ interval |
| radial sum | recomputed receiver-normal radial interval |
| tangential sum | recomputed receiver-normal tangential interval |
| negative control | fail closed if any row lacks same-record $D_t/D_s$ |

## Promotion Rule

No A1 time-law chart may claim radial closure, tangential closure, obstruction,
or no-go status until those rows are present.
