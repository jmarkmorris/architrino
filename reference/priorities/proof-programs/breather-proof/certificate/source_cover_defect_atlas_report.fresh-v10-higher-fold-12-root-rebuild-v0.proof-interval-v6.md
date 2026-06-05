# Higher-Fold Source-Cover Defect Atlas

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. Proof-interval v6 already shows that adaptive receiver-grid
refinement does not close the regular parent-complement rows: it resolves
0 coarse cells by refinement
and leaves 3024 structural terminal
source-cover misses across 42 parent rows.

This atlas records the exact boundary-expansion burden for those rows. It is
priority-only: it consumes 0 parent rows, does not update the live
`causal_ledger.json`, and does not authorize `branch_chart.json`.

| Quantity | Value |
| --- | ---: |
| Parent rows | 42 |
| `u` rows | 21 |
| `w` rows | 21 |
| Terminal grid size | 128 |
| Accepted receiver leaves | 622 |
| Terminal missing leaves | 3024 |
| Structural terminal misses | 3024 |
| Indeterminate terminal misses | 0 |
| Failed low-side terminal leaves | 1207 |
| Failed high-side terminal leaves | 1817 |
| Receiver-left boundary missing leaves | 978 |
| Receiver-right boundary missing leaves | 2046 |
| Receiver-interior missing leaves | 0 |
| Rows with low-side only burden | 10 |
| Rows with high-side only burden | 10 |
| Rows with two-sided burden | 22 |
| Minimum certified coverage ratio | 0.0390625 |
| Maximum certified coverage ratio | 0.9921875 |
| Row consumption count | 0 |

## Row Defect Burden

Here `lower expansion` means the source-inner lower boundary must move lower
by at least the recorded amount, or the corresponding receiver lower hull must
move higher. `Upper expansion` means the source-inner upper boundary must move
higher by at least the recorded amount, or the corresponding receiver upper
hull must move lower.

| Row | Ledger | Receiver | Source | Certified leaves | Missing leaves | Failed side | Lower expansion | Upper expansion | Max terminal defect |
| --- | --- | --- | --- | ---: | ---: | --- | ---: | ---: | ---: |
| `R_w_A01_A00` | `w` | `A01` | `A00` | 17/128 | 68 | both | 0.042731386788218 | 0.000246184302709 | 0.042731386788218 |
| `R_w_A02_A00` | `w` | `A02` | `A00` | 4/128 | 115 | both | 0.042591365667114 | 0.263734231585876 | 0.263734231585876 |
| `R_w_A02_A01` | `w` | `A02` | `A01` | 11/128 | 87 | hi | 0 | 0.263493046822007 | 0.263493046822007 |
| `R_w_A03_A00` | `w` | `A03` | `A00` | 3/128 | 121 | both | 0.141011174327481 | 0.265185012361177 | 0.265185012361177 |
| `R_w_A03_A01` | `w` | `A03` | `A01` | 5/128 | 111 | both | 0.098288218619836 | 0.264943827597308 | 0.264943827597308 |
| `R_w_A03_A02` | `w` | `A03` | `A02` | 22/128 | 43 | both | 0.098428816350752 | 0.00147831101435 | 0.098428816350752 |
| `R_w_A04_A00` | `w` | `A04` | `A00` | 4/128 | 112 | both | 0.141036453319775 | 0.052672284658635 | 0.141036453319775 |
| `R_w_A04_A01` | `w` | `A04` | `A01` | 8/128 | 96 | both | 0.09831349761213 | 0.052431099894766 | 0.09831349761213 |
| `R_w_A04_A02` | `w` | `A04` | `A02` | 18/128 | 56 | lo | 0.098454095343046 | 0 | 0.098454095343046 |
| `R_w_A04_A03` | `w` | `A04` | `A03` | 33/128 | 1 | lo | 0.000026691996524 | 0 | 0.000026691996524 |
| `R_w_A05_A00` | `w` | `A05` | `A00` | 5/128 | 113 | both | 0.161205151726346 | 0.051802035529916 | 0.161205151726346 |
| `R_w_A05_A01` | `w` | `A05` | `A01` | 9/128 | 97 | both | 0.118482196018701 | 0.051560850766047 | 0.118482196018701 |
| `R_w_A05_A02` | `w` | `A05` | `A02` | 17/128 | 60 | lo | 0.118622793749617 | 0 | 0.118622793749617 |
| `R_w_A05_A03` | `w` | `A05` | `A03` | 28/128 | 19 | lo | 0.020195390403096 | 0 | 0.020195390403096 |
| `R_w_A05_A04` | `w` | `A05` | `A04` | 28/128 | 19 | lo | 0.020172488258602 | 0 | 0.020172488258602 |
| `R_w_A06_A00` | `w` | `A06` | `A00` | 2/128 | 123 | both | 0.161118346284705 | 0.716780596851076 | 0.716780596851076 |
| `R_w_A06_A01` | `w` | `A06` | `A01` | 4/128 | 118 | both | 0.118395390577059 | 0.716539412087207 | 0.716539412087207 |
| `R_w_A06_A02` | `w` | `A06` | `A02` | 11/128 | 90 | both | 0.118535988307975 | 0.45307389550425 | 0.45307389550425 |
| `R_w_A06_A03` | `w` | `A06` | `A03` | 16/128 | 70 | both | 0.020108584961454 | 0.451620246892503 | 0.451620246892503 |
| `R_w_A06_A04` | `w` | `A06` | `A04` | 11/128 | 92 | both | 0.02008568281696 | 0.664132974595045 | 0.664132974595045 |
| `R_w_A06_A05` | `w` | `A06` | `A05` | 13/128 | 81 | hi | 0 | 0.665006039574784 | 0.665006039574784 |
| `R_u_A07_A06` | `u` | `A07` | `A06` | 33/128 | 1 | hi | 0 | 0.00024618430271 | 0.00024618430271 |
| `R_u_A08_A06` | `u` | `A08` | `A06` | 11/128 | 87 | hi | 0 | 0.263734231585877 | 0.263734231585877 |
| `R_u_A08_A07` | `u` | `A08` | `A07` | 11/128 | 87 | hi | 0 | 0.263493046822006 | 0.263493046822006 |
| `R_u_A09_A06` | `u` | `A09` | `A06` | 15/128 | 71 | hi | 0 | 0.265185012361178 | 0.265185012361178 |
| `R_u_A09_A07` | `u` | `A09` | `A07` | 5/128 | 111 | both | 0.098288218619835 | 0.264943827597307 | 0.264943827597307 |
| `R_u_A09_A08` | `u` | `A09` | `A08` | 22/128 | 43 | both | 0.098428816350752 | 0.00147831101435 | 0.098428816350752 |
| `R_u_A10_A06` | `u` | `A10` | `A06` | 22/128 | 40 | hi | 0 | 0.052672284658636 | 0.052672284658636 |
| `R_u_A10_A07` | `u` | `A10` | `A07` | 8/128 | 96 | both | 0.098313497612129 | 0.052431099894765 | 0.098313497612129 |
| `R_u_A10_A08` | `u` | `A10` | `A08` | 18/128 | 56 | lo | 0.098454095343046 | 0 | 0.098454095343046 |
| `R_u_A10_A09` | `u` | `A10` | `A09` | 33/128 | 1 | lo | 0.000026691996524 | 0 | 0.000026691996524 |
| `R_u_A11_A06` | `u` | `A11` | `A06` | 24/128 | 37 | hi | 0 | 0.051802035529916 | 0.051802035529916 |
| `R_u_A11_A07` | `u` | `A11` | `A07` | 9/128 | 97 | both | 0.118482196018701 | 0.051560850766046 | 0.118482196018701 |
| `R_u_A11_A08` | `u` | `A11` | `A08` | 17/128 | 60 | lo | 0.118622793749617 | 0 | 0.118622793749617 |
| `R_u_A11_A09` | `u` | `A11` | `A09` | 28/128 | 19 | lo | 0.020195390403096 | 0 | 0.020195390403096 |
| `R_u_A11_A10` | `u` | `A11` | `A10` | 28/128 | 19 | lo | 0.020172488258602 | 0 | 0.020172488258602 |
| `R_u_A12_A06` | `u` | `A12` | `A06` | 12/128 | 82 | hi | 0 | 0.611870332929382 | 0.611870332929382 |
| `R_u_A12_A07` | `u` | `A12` | `A07` | 4/128 | 116 | both | 0.118395390577059 | 0.611629148165511 | 0.611629148165511 |
| `R_u_A12_A08` | `u` | `A12` | `A08` | 12/128 | 84 | both | 0.118535988307976 | 0.348163631582554 | 0.348163631582554 |
| `R_u_A12_A09` | `u` | `A12` | `A09` | 17/128 | 62 | both | 0.020108584961454 | 0.346709982970807 | 0.346709982970807 |
| `R_u_A12_A10` | `u` | `A12` | `A10` | 11/128 | 87 | both | 0.02008568281696 | 0.559222710673349 | 0.559222710673349 |
| `R_u_A12_A11` | `u` | `A12` | `A11` | 13/128 | 76 | hi | 0 | 0.560095775653089 | 0.560095775653089 |

## Nearest Closure Rows

These rows have the fewest terminal missing leaves and are the best local probes
for a source-cover parent-complement theorem.

| Row | Ledger | Receiver | Source | Missing leaves | Max terminal defect | Failed side |
| --- | --- | --- | --- | ---: | ---: | --- |
| `R_w_A04_A03` | `w` | `A04` | `A03` | 1 | 0.000026691996524 | lo |
| `R_u_A10_A09` | `u` | `A10` | `A09` | 1 | 0.000026691996524 | lo |
| `R_u_A07_A06` | `u` | `A07` | `A06` | 1 | 0.00024618430271 | hi |
| `R_w_A05_A04` | `w` | `A05` | `A04` | 19 | 0.020172488258602 | lo |
| `R_u_A11_A10` | `u` | `A11` | `A10` | 19 | 0.020172488258602 | lo |
| `R_w_A05_A03` | `w` | `A05` | `A03` | 19 | 0.020195390403096 | lo |
| `R_u_A11_A09` | `u` | `A11` | `A09` | 19 | 0.020195390403096 | lo |
| `R_u_A11_A06` | `u` | `A11` | `A06` | 37 | 0.051802035529916 | hi |

## Largest Defect Rows

These rows have the largest single terminal source-cover defect and are the
right stress tests for a candidate-change route.

| Row | Ledger | Receiver | Source | Missing leaves | Max terminal defect | Failed side |
| --- | --- | --- | --- | ---: | ---: | --- |
| `R_w_A06_A00` | `w` | `A06` | `A00` | 123 | 0.716780596851076 | both |
| `R_w_A06_A01` | `w` | `A06` | `A01` | 118 | 0.716539412087207 | both |
| `R_w_A06_A05` | `w` | `A06` | `A05` | 81 | 0.665006039574784 | hi |
| `R_w_A06_A04` | `w` | `A06` | `A04` | 92 | 0.664132974595045 | both |
| `R_u_A12_A06` | `u` | `A12` | `A06` | 82 | 0.611870332929382 | hi |
| `R_u_A12_A07` | `u` | `A12` | `A07` | 116 | 0.611629148165511 | both |
| `R_u_A12_A11` | `u` | `A12` | `A11` | 76 | 0.560095775653089 | hi |
| `R_u_A12_A10` | `u` | `A12` | `A10` | 87 | 0.559222710673349 | both |

## Boundary Span Diagnosis

All terminal source-cover defects in this atlas attach to receiver-boundary
spans: 978
missing leaves touch the left boundary and
2046
touch the right boundary, while
0
terminal missing leaves are interior-only. The remaining regular-row problem is
therefore not an interior receiver-cover hole; it is a boundary ownership or
boundary movement problem.

## Closure Condition

For each row, a future source-cover/parent-complement theorem or candidate change must eliminate every terminal defect by proving sufficient same-packet source-inner boundary expansion, receiver-range contraction, or endpoint/topology ownership with no double counting. This atlas only records the exact terminal burdens.

## Pass Rule

A regular parent-complement row may be consumed only after every terminal miss in this atlas has a proof-grade same-packet closure certificate and endpoint ownership/no-double-counting is certified. This artifact by itself consumes no rows.

## Capture Decision

Priority-only. The atlas sharpens the next proof target: a source-cover
parent-complement theorem must supply exact same-packet boundary movement,
receiver contraction, or endpoint/topology ownership for the 42 rows above.
Absent such a theorem, the next candidate must change the source-inner or
receiver outer ranges by at least the recorded rational burdens before these
rows can be consumed.
