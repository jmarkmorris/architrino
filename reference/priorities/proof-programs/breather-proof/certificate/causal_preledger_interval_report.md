# Causal Pre-Ledger Interval Report

## Status

This report runs the null-coordinate causal pre-ledger on packet `seed-doubled-four-arc-cosine-template-v0`.
The result is a useful rejection of the current coarse mesh, not a rejection of the
breather program. The current packet supplies certified empty rows, but it does
not supply a complete finite pre-ledger because several overlapping rows have no
strict simple-root or fold-layer margin on the present arc partition.

The generated ledger is `causal_ledger.json` with status
`preledger_rejected_split_required_rows`.

## Null Coordinates And Lift Rule

The range pass used
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t),
\qquad
c_f=1,
$$
with
$$
x(t)=1.25\cos t,
\qquad
T_{\mathrm{cyc}}=2\pi.
$$

Rows whose source interval is later in phase order than the receiver interval
were tested on the previous-period lift. Thus both null coordinates shift by
$$
-T_{\mathrm{cyc}}
$$
on that source row. Same-arc rows kept the same-period diagonal contact, because
that contact must be split or excluded by a separate strict memory-depth row
before branch-chart promotion.

The derivative floors are
$$
J_u=1-\dot x(s)=1+1.25\sin s,
\qquad
J_w=1+\dot x(s)=1-1.25\sin s.
$$
On the current closed arc intervals, the relevant floor is zero whenever the row
retains a field-speed separator endpoint for that ledger.

## Result Summary

| Quantity | Value |
| --- | ---: |
| Total ledger rows | 50 |
| Certified empty rows | 28 |
| Certified simple-root rows | 0 |
| Certified fold-layer rows | 0 |
| Split-required rows | 22 |
| Minimum certified empty gap $\gamma_{\mathrm{empty}}$ | 0.214297435588 |

The accepted rows are only inactive complements. They have positive
null-coordinate range gaps and root-count bound $[0,0]$. The pre-ledger fails
because no active row is yet certified as `simple_root` or `fold_layer`.

## Blocking Split Rows

The current mesh has 22 blocking rows. The failure modes are:

| Failure reason | Rows |
| --- | ---: |
| `diagonal_contact_not_split` | 10 |
| `range_overlap_not_strictly_covered` | 22 |
| `zero_derivative_separator_not_isolated` | 16 |
| `periodic_lift_boundary_contact_not_split` | 2 |

### $u$-ledger blocking rows

| Row | Subblock | Primary failure | Separator evidence |
| --- | --- | --- | --- |
| `L_u_I0_I0` | `B_I0_I0` | `diagonal_contact_not_split` | none |
| `L_u_I0_I4` | `B_I0_I4` | `zero_derivative_separator_not_isolated` | `source:Sigma_4` |
| `L_u_I1_I0` | `B_I1_I0` | `range_overlap_not_strictly_covered` | none |
| `L_u_I1_I1` | `B_I1_I1` | `diagonal_contact_not_split` | none |
| `L_u_I2_I1` | `B_I2_I1` | `zero_derivative_separator_not_isolated` | `receiver:Sigma_3` |
| `L_u_I2_I2` | `B_I2_I2` | `diagonal_contact_not_split` | `source:Sigma_3; receiver:Sigma_3` |
| `L_u_I3_I2` | `B_I3_I2` | `zero_derivative_separator_not_isolated` | `source:Sigma_3; receiver:Sigma_3; receiver:Sigma_4` |
| `L_u_I3_I3` | `B_I3_I3` | `diagonal_contact_not_split` | `source:Sigma_3; source:Sigma_4; receiver:Sigma_3; receiver:Sigma_4` |
| `L_u_I4_I2` | `B_I4_I2` | `zero_derivative_separator_not_isolated` | `source:Sigma_3; receiver:Sigma_4` |
| `L_u_I4_I3` | `B_I4_I3` | `zero_derivative_separator_not_isolated` | `source:Sigma_3; source:Sigma_4; receiver:Sigma_4` |
| `L_u_I4_I4` | `B_I4_I4` | `diagonal_contact_not_split` | `source:Sigma_4; receiver:Sigma_4` |

### $w$-ledger blocking rows

| Row | Subblock | Primary failure | Separator evidence |
| --- | --- | --- | --- |
| `L_w_I0_I0` | `B_I0_I0` | `diagonal_contact_not_split` | `source:Sigma_1; receiver:Sigma_1` |
| `L_w_I0_I4` | `B_I0_I4` | `zero_derivative_separator_not_isolated` | `receiver:Sigma_1` |
| `L_w_I1_I0` | `B_I1_I0` | `zero_derivative_separator_not_isolated` | `source:Sigma_1; receiver:Sigma_1; receiver:Sigma_2` |
| `L_w_I1_I1` | `B_I1_I1` | `diagonal_contact_not_split` | `source:Sigma_1; source:Sigma_2; receiver:Sigma_1; receiver:Sigma_2` |
| `L_w_I2_I0` | `B_I2_I0` | `zero_derivative_separator_not_isolated` | `source:Sigma_1; receiver:Sigma_2` |
| `L_w_I2_I1` | `B_I2_I1` | `zero_derivative_separator_not_isolated` | `source:Sigma_1; source:Sigma_2; receiver:Sigma_2` |
| `L_w_I2_I2` | `B_I2_I2` | `diagonal_contact_not_split` | `source:Sigma_2; receiver:Sigma_2` |
| `L_w_I3_I2` | `B_I3_I2` | `zero_derivative_separator_not_isolated` | `source:Sigma_2` |
| `L_w_I3_I3` | `B_I3_I3` | `diagonal_contact_not_split` | none |
| `L_w_I4_I3` | `B_I4_I3` | `range_overlap_not_strictly_covered` | none |
| `L_w_I4_I4` | `B_I4_I4` | `diagonal_contact_not_split` | none |

## Mathematical Obstruction

For an empty row the interval test proves
$$
\operatorname{dist}\!\left(Y_\alpha^y,Y_\beta^y\right)>0.
$$
The minimum such distance is
$$
\gamma_{\mathrm{empty}}=0.214297435588>0.
$$
Those rows are safe inactive complements.

For a simple-root row, the current theorem target requires strict source and
receiver monotonicity floors, strict source coverage of the receiver range,
strict nonzero memory depth, and strict sign separation. The present mesh cannot
supply those margins. Same-arc rows still contain the excluded diagonal
$(s=t)$, separator-adjacent rows keep zero null-coordinate derivative floors,
and several boundary-contact rows only overlap at an endpoint rather than inside
a strictly covered interval.

Therefore the branch chart must not be attempted from this ledger. The next
mathematical operation is to replace the coarse five-arc mesh with a refined
pre-ledger mesh that isolates the four separator layers and separates diagonal,
periodic-boundary, inactive, and active source intervals before repeating the
range pass.

## Next Certificate Action

The next packet should keep the same candidate history, period, section,
parameter tuple, and representation unless the template is being replaced. Any
mesh refinement changes the packet component $\Theta$, so the refined artifacts
must record a new same-domain packet identity. The refinement must give one of
two honest outcomes:

1. a split mesh with strict simple-root rows away from every separator and away
   from the excluded diagonal; or
2. a bounded fold-layer atlas around `Sigma_1` through `Sigma_4` with
   nonzero exit floors and parity data.

Until one of those exists, `branch_chart.json` and `seed_chart_interval_report.md`
remain blocked.
