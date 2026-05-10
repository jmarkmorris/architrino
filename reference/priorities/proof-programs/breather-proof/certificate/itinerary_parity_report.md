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

## Conclusion

The doubled four-arc generic itinerary passes the necessary velocity-class parity gate. The next ansatz step is not another itinerary choice; it is the null-coordinate causal ledger and then the actual self-image enumeration for
$$
|x(t)-x(s)|=c_f(t-s)
$$
on the ordered arc pairs of this itinerary. That enumeration must produce finite active branches, inactive complements, Jacobian floors, memory-depth bounds, and strict gap margins before the seed-chart row can pass.
