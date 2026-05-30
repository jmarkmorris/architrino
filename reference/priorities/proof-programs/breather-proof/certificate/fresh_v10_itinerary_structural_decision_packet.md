# Fresh v10 Itinerary and Structural Decision Packet

## Scope

This is a priority-only proof-strategy decision packet for the fresh v10
strict-gap repair route. It records what replaces generic same-itinerary basis
enrichment after the shifted three-coordinate, split-two, Hermite boundary,
Hermite dual, and Hermite rationalization screens.

It does not accept any pre-ledger row, does not edit a live ledger, does not
authorize `branch_chart.json`, and does not promote a theorem into AAA prose.

Source packet:

- `fresh-same-packet-fold-shear-seed-v0`

## Decision Trigger

The current repair route tries to preserve the doubled-four-arc itinerary while
opening the 10 proof-interval-v10 parent-complement collars. The following
priority-only screens now bound that route:

| Screen | Basis | Result |
| --- | --- | --- |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator.v0.md` | three shifted-separator coefficients | $\gamma_{\mathrm{sample}}=-0.204126631574676$ |
| `fresh_v10_finite_itinerary_strict_gap_screen.shifted_separator_split2.v0.md` | six split shifted-separator coefficients | $\gamma_{\mathrm{sample}}=-0.207816886605516$ |
| `fresh_v10_hermite_itinerary_gap_boundary_screen.v0.md` | anti-periodic cubic Hermite basis through 270 nodes / 541 LP variables | $\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$ |
| `fresh_v10_hermite_dual_obstruction.v0.md` | numerical row-only dual for the Hermite sampled LP | residual-adjusted bound $\gamma\le -2.20862209291526\times 10^{-10}$ at half-grid 256 |
| `fresh_v10_hermite_dual_rationalization_audit.v0.md` | exact-rational active multiplier audit for the half-grid-256 dual | denominator cap $10^9$ preserves binary64-row bound $\gamma\le -2.20860276388005\times 10^{-10}$ |
| `fresh_v10_hermite_active_row_interval_backend.v0.md` | exact-rational active multipliers plus outward-rounded active row bounds | proof-grade finite sampled row-system bound $\gamma\le -2.20499517531647\times 10^{-10}$ |

These artifacts are not interval infeasibility proofs, but they are strong
sampled evidence that generic same-itinerary basis enrichment has reached a
boundary rather than a constructive repair.

## Current Decision

The selected immediate route was:

**Option A: proof-grade intervalization of the Hermite dual obstruction.**

Option A is now closed for the declared finite sampled Hermite row system. The
multiplier side is exact-rational at denominator cap $10^9$, the active row
backend reconstructs exact rational Hermite coefficients, encloses
trigonometric row bounds outward by rational intervals, repairs gamma
stationarity exactly without a gamma residual cap, and proves
$$
\gamma\le -2.20499517531647\times 10^{-10}.
$$

This does not prove a continuous Hermite-family obstruction between samples.
The current same-itinerary decision boundary is therefore: either build a
continuous-in-collar lift of the sampled obstruction, or stop enriching this
generic same-itinerary Hermite family and choose between Option B and Option C
below.

## Decision Options

| Option | Route | Proof value | Construction value | Risk | Required new artifacts | Reuse allowed | Closure condition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | Intervalize the Hermite dual obstruction | Highest for closing the current same-itinerary sampled branch | Low; it proves obstruction rather than building a candidate | Complete for finite sampled rows; continuous-in-collar lift remains separate | outward-rounded active row data, selected exact-rational multipliers, residual budget | Current v10 collar list, Hermite active rows, sampled LP form, rationalization audit | Proof-grade upper bound $\gamma<0$ for the declared sampled row system; achieved by `fresh_v10_hermite_active_row_interval_backend.v0` |
| B | Different same-itinerary structural ansatz | Medium; keeps current itinerary alive only with a new structural mechanism | Medium to high if the ansatz is dynamics-generated | Can become another unconstrained basis search if not sharply specified | new packet identity or structural law, hard field-speed inequalities, strict-gap solve, persistence checks | Current v10 collars may remain the target | Positive certified collar gaps while preserving field-speed itinerary and recomputing/preserving accepted rows |
| C | Higher-fold itinerary rebuild | High if the field-speed roots are accepted as real structure | High, but it restarts the packet | Large scope; prior row reuse becomes historical only | new itinerary parity, candidate packet, mesh, pre-ledger input screen, proof-interval pre-ledger rerun | Only historical diagnostics and solver-basis lessons | A new packet identity passes the proof-interval pre-ledger before any branch chart |

## Rejected Non-Option

Do not continue by merely adding more generic same-itinerary basis functions.
The three-coordinate, split-two, and Hermite screens already cover the obvious
linear enrichment ladder. Any same-itinerary continuation must either:

1. prove a continuous-in-collar lift of the sampled dual obstruction, or
2. introduce a genuinely different structural ansatz with hard field-speed
   itinerary constraints built into the solve.

## Guardrails

- No branch chart may be built until a proof-interval pre-ledger passes.
- No sampled LP updates a live causal ledger.
- Same-itinerary routes must preserve field-speed itinerary constraints as hard
  constraints, not as post-hoc diagnostics.
- A higher-fold route must freeze a new packet identity before any pre-ledger
  rerun.
- The 10 v10 collars remain the strict-gap target unless the itinerary is
  explicitly replaced.
- `C_u_A4_A2_left_v10_7` remains highlighted as the controlling collar from
  the direct-integration and shifted-separator screens.
- Existing accepted or partial rows remain historical unless recomputed or
  explicitly proven persistent for the repaired or successor packet.

## Capture Decision

Priority-only. This packet records proof-strategy routing from diagnostic and
sampled obstruction artifacts. It is not corpus-ready because it does not supply
an interval certificate, an accepted candidate, or a theorem-level derivation.
