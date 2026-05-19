# Candidate Cycle Packet Report

## Status

This report records the first finite candidate packet for the collinear-breather
certificate:

- `phi_cyc.json`
- `mesh.json`

The packet clears only the old `Candidate data absent` failure row. It does not
certify a null-coordinate pre-ledger, branch chart, returned-sample residual,
topology row, or Schauder theorem.

## Candidate Template

The draft packet uses the normalized analytic template
$$
x(\theta)=1.25\cos(2\pi\theta),
\qquad
T_{\mathrm{cyc}}=2\pi,
\qquad
c_f=1.
$$
With
$$
t=T_{\mathrm{cyc}}\theta,
$$
the velocity and acceleration are
$$
\dot x(\theta)=-1.25\sin(2\pi\theta),
\qquad
\ddot x(\theta)=-1.25\cos(2\pi\theta).
$$
The peak speed is
$$
\max_\theta |\dot x|=1.25>c_f,
$$
so the field-speed separators occur where
$$
|\dot x|=c_f.
$$
This gives the four separator phases
$$
\theta_{\Sigma_1}=0.147583617650,
\quad
\theta_{\Sigma_2}=0.352416382350,
\quad
\theta_{\Sigma_3}=0.647583617650,
\quad
\theta_{\Sigma_4}=0.852416382350.
$$
The two origin-layer events are
$$
\theta_{C_1}=0.25,
\qquad
\theta_{C_2}=0.75.
$$

Thus the template realizes the doubled four-arc velocity itinerary
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

## Pre-Ledger Readiness

The mesh now supplies the data needed for the first null-coordinate range pass:
sample values of
$$
u(t)=c_f t-x(t),
\qquad
w(t)=c_f t+x(t),
$$
all five itinerary intervals, all four separator layers, both origin-layer
events, and all ordered receiver-source arc-pair subblocks.

The follow-on artifact now exists as `causal_ledger.json`, with its interval
explanation in `causal_preledger_interval_report.md`. The first coarse pass
rejected the five-arc mesh. The refined diagnostic artifact
`mesh_refined_preledger_v1.json` then isolates the four field-speed separator
layers and extracts six strict `simple_root` subrows. The follow-on
`diagonal_exclusion_subledger.json` closes the monotone diagonal rows and the
periodic endpoint contacts as empty rows. The packet still remains uncertified
because the full partition is not accepted: `fold_layer_atlas.json` supplies
kinematic fold data but no finite fold impulse ceiling, and parent-row boundary
leftovers remain unresolved before branch-chart certification.

## Residual Obstruction

The template has not been solved against the dual-mollified absolute-time law.
Therefore the EOM residuals
$$
E_j
=
\left|
\ddot x(t_j)-F_\eta^\Pi(t_j)
\right|
$$
and returned-history residuals
$$
R_j^x,
\qquad
R_j^v
$$
are intentionally marked `not_evaluated` in `phi_cyc.json`.

This is a useful obstruction rather than a defect in the packet: the next proof
question is now concrete. Either the null-coordinate pre-ledger can classify the
ordered arc-pair blocks with strict range gaps, derivative floors, memory-depth
windows, and fold-layer bounds, or this particular velocity-class template is
rejected before branch-chart and returned-sample work begins.

## Next Gate

The `Null-Coordinate Causal Pre-Ledger` target has now been run on this exact
packet identity:
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
\right).
$$
The refined run rejects the current partition rather than the entire breather
program. It also proves that the template is not vacuous: the ledger now contains
six strict simple-root subwindows with positive derivative, memory-depth,
horizon, and sign margins, plus sixteen accepted diagonal-exclusion empty rows.
The next certificate step must either bound the dual-mollified fold impulse on
the four separator layers and finish the parent boundary partition, or
deliberately replace the candidate template and restart the same-domain packet
sequence.
