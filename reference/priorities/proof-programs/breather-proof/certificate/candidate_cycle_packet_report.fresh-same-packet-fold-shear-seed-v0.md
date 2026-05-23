# Fresh Same-Packet Fold-Shear Candidate Packet Report

## Status

This packet instantiates the phase-shifted fold-shear seed as fresh candidate
data for the collinear-breather proof program. It is not a pre-ledger pass, not
a live ledger update, and not branch-chart authorization.

Artifacts:

- `phi_cyc.fresh-same-packet-fold-shear-seed-v0.json`
- `mesh.fresh-same-packet-fold-shear-seed-v0.json`
- `causal_preledger_input_screen.fresh-same-packet-fold-shear-seed-v0.json`

## Candidate

The same-packet identity is `fresh-same-packet-fold-shear-seed-v0`. The shifted seed is
$$
X_\delta(\theta)
=
1.25\cos(2\pi(\theta+\delta))
+\varepsilon H(\theta+\delta),
\qquad
\delta=0.02,
\qquad
\varepsilon=\frac{1}{16}.
$$
The section values are
$$
X_\delta(0)=1.2447644729563,
\qquad
\dot x_\delta(0)=-0.0876176690331297.
$$
Thus the new section is an inbound section with
$$
v_\ast=0.0876176690331297<c_f.
$$

## Pre-Ledger Input Screen

`causal_preledger_input_screen.fresh-same-packet-fold-shear-seed-v0.json` records the shifted regular and fold-layer
intervals plus sampled null-coordinate range screens for the ordered rows. These
screens are only inputs for the next interval pre-ledger. A sampled disjoint row
is not accepted until an outward-rounded interval certificate proves the same
gap on the frozen packet identity.

The branch-chart stop rule remains unchanged: no `branch_chart.json` may be
created until a fresh null-coordinate pre-ledger accepts every row as
`empty`, `simple_root`, or `fold_layer` with no unresolved parent
complements.

## Capture Decision

Priority-only. The packet advances the proof program from a seed contract to
fresh same-packet candidate data, while preserving the live-ledger prohibition.
