# Velocity Itinerary Parity Report

## Status

This report records a coarse parity pass for the first closed-form collinear breather itinerary. It verifies the velocity-class separator arithmetic required before the ansatz is used to build a candidate history. It does not certify a branch chart or returned-history residuals.

## Selected Itinerary

The first certificate attempt uses the doubled four-arc generic itinerary
$$
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sup}}
\to
\mathsf{S}_{\mathrm{sep}}
\to
\mathsf{S}_{\mathrm{sub}}.
$$
This is the generic transverse option from [closed-form-collinear-breather-ansatz.md](../../../../../content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md). The glancing apocenter itinerary remains a fallback if this branch enumeration fails or if the corridor forces a degenerate outer turn.

## Separator Ledger

For the itinerary-level gate, each field-speed separator is treated as a generic fold in the delayed-root equation. A generic fold creates or annihilates a simple pair of roots. Therefore each local unsigned jump is even and the signed degree is preserved:
$$
\Delta N\in 2\mathbb{Z},
\qquad
\Delta D=0.
$$

| Event | Transition | Model | $\Delta N$ | $\Delta D$ | Local parity |
| --- | --- | --- | ---: | ---: | --- |
| $\Sigma_1$ | sub $\to$ super | fold-pair birth | $+2$ | $0$ | pass |
| $\Sigma_2$ | super $\to$ sub | fold-pair death | $-2$ | $0$ | pass |
| $\Sigma_3$ | sub $\to$ super | fold-pair birth | $+2$ | $0$ | pass |
| $\Sigma_4$ | super $\to$ sub | fold-pair death | $-2$ | $0$ | pass |

The closed-cycle totals are
$$
\sum_{\Sigma}\Delta N
=
2-2+2-2
=0,
\qquad
\sum_{\Sigma}\Delta D=0.
$$
Thus the selected itinerary has no coarse fold-parity obstruction.

## Origin Sheet Events

The origin crossings are treated as signed-sheet relabeling events in this gate, not as root-birth events. They therefore contribute
$$
\Delta N=0,
\qquad
\Delta D=0.
$$
The origin-layer continuity and signed-kernel handling still belong to the topology row of the finite audit.

## Downstream Packet Contract

The parity pass now hands off to one fixed seed packet, not to independent artifacts. The candidate-cycle packet must carry a single identity tuple
$$
\mathfrak{I}_{\mathrm{seed}}
=
\left(
\mathcal{K},
T_{\mathrm{cyc}},
\mathcal{S},
\mathcal{P},
\mathcal{B}_{\mathrm{rep}},
\Theta
\right),
$$
where
$$
\mathcal{K}
$$
is the doubled four-arc generic itinerary checked above. The files `phi_cyc.json`, `mesh.json`, `causal_ledger.json`, `branch_chart.json`, and `seed_chart_interval_report.md` must all report the same packet identity before any seed margin is accepted.

The mesh must include all five itinerary intervals
$$
I_0,\ldots,I_4,
$$
all four separator layers
$$
\Sigma_1,\ldots,\Sigma_4,
$$
and the two origin-layer labels
$$
C_1,
\qquad
C_2.
$$
Its subblocks feed the null-coordinate causal ledger. Every subblock is accepted only as `empty`, `simple_root`, or `fold_layer`; `split_required` is a packet failure until the split is actually performed.

The branch chart is accepted only as an authorized refinement of the pre-ledger. Each simple branch must point to exactly one `simple_root` row of `causal_ledger.json`; empty rows remain inactive complements with positive range gaps; fold-layer rows remain outside branch-sum evaluation until the certified fold-event atlas supplies incoming and outgoing chart labels. This turns the coarse parity ledger into an executable pass/fail target for the seed-chart interval report.

## Conclusion

The doubled four-arc generic itinerary passes the necessary velocity-class parity gate. The next ansatz step is not another itinerary choice; it is the null-coordinate causal ledger and then the actual self-image enumeration for
$$
|x(t)-x(s)|=c_f(t-s)
$$
on the ordered arc pairs of this itinerary. That enumeration must produce finite active branches, inactive complements, Jacobian floors, memory-depth bounds, and strict gap margins before the seed-chart row can pass.
