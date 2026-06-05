# Higher-Fold Source-Cover Boundary Ownership Audit

## Verdict

The higher-fold packet `fresh-v10-higher-fold-12-root-rebuild-v0` still fail-closes before branch-chart
authorization. This sidecar imports the proof-interval v6 receiver covers and
the source-cover defect atlas, then proves the exact terminal receiver
partition for the 42 regular parent-complement rows:

- 42 / 42
  rows have complete terminal-grid receiver partitions;
- 3024 missing terminal leaves are
  boundary components;
- 978 missing leaves attach
  to the receiver-left boundary and 2046
  attach to the receiver-right boundary;
- 0 missing leaves are
  receiver-interior components.

The audit does not consume rows. It proves that the regular-row obstruction is
not an interior receiver-cover hole, but it also proves that boundary ownership
is still absent: 0 rows
satisfy the finite boundary-ownership pass rule.

| Quantity | Value |
| --- | ---: |
| Parent rows | 42 |
| Complete receiver partitions | 42 |
| Rows with only boundary missing components | 42 |
| Certified terminal leaves | 2352 |
| Boundary terminal leaves | 3024 |
| Boundary components | 64 |
| Certified components | 42 |
| Rows passing boundary ownership rule | 0 |
| Row consumption count | 0 |

## Pass-Rule Field Audit

| Field | Rows certified |
| --- | ---: |
| `complete_receiver_partition` | 42 / 42 |
| `all_terminal_spans_owned` | 0 / 42 |
| `strict_source_coverage_or_contraction` | 0 / 42 |
| `memory_margins_all_owned_components` | 0 / 42 |
| `endpoint_ownership_no_double_counting` | 0 / 42 |
| `simple_root_branch_reuse_exclusion` | 0 / 42 |
| `non_owned_complement_closed` | 0 / 42 |

## First Probe Rows

These are the smallest boundary burdens from the source-cover defect atlas.
They are now exact one-boundary terminal partition probes, but none is accepted
because ownership and no-double-counting fields are absent.

| Row | Boundary leaves | Left leaves | Right leaves | Max defect | Pass rule satisfied |
| --- | ---: | ---: | ---: | ---: | --- |
| `R_w_A04_A03` | 1 | 1 | 0 | 0.000026691996524 | false |
| `R_u_A10_A09` | 1 | 1 | 0 | 0.000026691996524 | false |
| `R_u_A07_A06` | 1 | 1 | 0 | 0.00024618430271 | false |

## Row Partition Summary

| Row | Certified components | Certified leaves | Boundary components | Left leaves | Right leaves | Interior leaves | Max defect | Partition complete | Pass rule satisfied |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `R_w_A01_A00` | 1 | 60 | 2 | 1 | 67 | 0 | 0.042731386788218 | true | false |
| `R_w_A02_A00` | 1 | 13 | 2 | 28 | 87 | 0 | 0.263734231585876 | true | false |
| `R_w_A02_A01` | 1 | 41 | 1 | 0 | 87 | 0 | 0.263493046822007 | true | false |
| `R_w_A03_A00` | 1 | 7 | 2 | 71 | 50 | 0 | 0.265185012361177 | true | false |
| `R_w_A03_A01` | 1 | 17 | 2 | 71 | 40 | 0 | 0.264943827597308 | true | false |
| `R_w_A03_A02` | 1 | 85 | 2 | 3 | 40 | 0 | 0.098428816350752 | true | false |
| `R_w_A04_A00` | 1 | 16 | 2 | 72 | 40 | 0 | 0.141036453319775 | true | false |
| `R_w_A04_A01` | 1 | 32 | 2 | 56 | 40 | 0 | 0.09831349761213 | true | false |
| `R_w_A04_A02` | 1 | 72 | 1 | 56 | 0 | 0 | 0.098454095343046 | true | false |
| `R_w_A04_A03` | 1 | 127 | 1 | 1 | 0 | 0 | 0.000026691996524 | true | false |
| `R_w_A05_A00` | 1 | 15 | 2 | 37 | 76 | 0 | 0.161205151726346 | true | false |
| `R_w_A05_A01` | 1 | 31 | 2 | 37 | 60 | 0 | 0.118482196018701 | true | false |
| `R_w_A05_A02` | 1 | 68 | 1 | 0 | 60 | 0 | 0.118622793749617 | true | false |
| `R_w_A05_A03` | 1 | 109 | 1 | 0 | 19 | 0 | 0.020195390403096 | true | false |
| `R_w_A05_A04` | 1 | 109 | 1 | 0 | 19 | 0 | 0.020172488258602 | true | false |
| `R_w_A06_A00` | 1 | 5 | 2 | 36 | 87 | 0 | 0.716780596851076 | true | false |
| `R_w_A06_A01` | 1 | 10 | 2 | 31 | 87 | 0 | 0.716539412087207 | true | false |
| `R_w_A06_A02` | 1 | 38 | 2 | 31 | 59 | 0 | 0.45307389550425 | true | false |
| `R_w_A06_A03` | 1 | 58 | 2 | 11 | 59 | 0 | 0.451620246892503 | true | false |
| `R_w_A06_A04` | 1 | 36 | 2 | 11 | 81 | 0 | 0.664132974595045 | true | false |
| `R_w_A06_A05` | 1 | 47 | 1 | 0 | 81 | 0 | 0.665006039574784 | true | false |
| `R_u_A07_A06` | 1 | 127 | 1 | 1 | 0 | 0 | 0.00024618430271 | true | false |
| `R_u_A08_A06` | 1 | 41 | 1 | 0 | 87 | 0 | 0.263734231585877 | true | false |
| `R_u_A08_A07` | 1 | 41 | 1 | 0 | 87 | 0 | 0.263493046822006 | true | false |
| `R_u_A09_A06` | 1 | 57 | 1 | 71 | 0 | 0 | 0.265185012361178 | true | false |
| `R_u_A09_A07` | 1 | 17 | 2 | 71 | 40 | 0 | 0.264943827597307 | true | false |
| `R_u_A09_A08` | 1 | 85 | 2 | 3 | 40 | 0 | 0.098428816350752 | true | false |
| `R_u_A10_A06` | 1 | 88 | 1 | 0 | 40 | 0 | 0.052672284658636 | true | false |
| `R_u_A10_A07` | 1 | 32 | 2 | 56 | 40 | 0 | 0.098313497612129 | true | false |
| `R_u_A10_A08` | 1 | 72 | 1 | 56 | 0 | 0 | 0.098454095343046 | true | false |
| `R_u_A10_A09` | 1 | 127 | 1 | 1 | 0 | 0 | 0.000026691996524 | true | false |
| `R_u_A11_A06` | 1 | 91 | 1 | 37 | 0 | 0 | 0.051802035529916 | true | false |
| `R_u_A11_A07` | 1 | 31 | 2 | 37 | 60 | 0 | 0.118482196018701 | true | false |
| `R_u_A11_A08` | 1 | 68 | 1 | 0 | 60 | 0 | 0.118622793749617 | true | false |
| `R_u_A11_A09` | 1 | 109 | 1 | 0 | 19 | 0 | 0.020195390403096 | true | false |
| `R_u_A11_A10` | 1 | 109 | 1 | 0 | 19 | 0 | 0.020172488258602 | true | false |
| `R_u_A12_A06` | 1 | 46 | 1 | 0 | 82 | 0 | 0.611870332929382 | true | false |
| `R_u_A12_A07` | 1 | 12 | 2 | 34 | 82 | 0 | 0.611629148165511 | true | false |
| `R_u_A12_A08` | 1 | 44 | 2 | 34 | 50 | 0 | 0.348163631582554 | true | false |
| `R_u_A12_A09` | 1 | 66 | 2 | 12 | 50 | 0 | 0.346709982970807 | true | false |
| `R_u_A12_A10` | 1 | 41 | 2 | 12 | 75 | 0 | 0.559222710673349 | true | false |
| `R_u_A12_A11` | 1 | 52 | 1 | 0 | 76 | 0 | 0.560095775653089 | true | false |

## Closure Condition

The next proof object must supply one of the accepted alternatives for each
boundary component: same-packet source-boundary movement, receiver-range
contraction, or endpoint/topology ownership with no double counting and no
simple-root branch reuse. Until those fields are present, every audited regular
parent-complement row remains `split_required`.

## Capture Decision

Priority-only. This sidecar upgrades the source-cover defect atlas into an
exact rational terminal receiver-partition audit, but it deliberately leaves
row consumption at 0 because the ownership fields are not certified.
