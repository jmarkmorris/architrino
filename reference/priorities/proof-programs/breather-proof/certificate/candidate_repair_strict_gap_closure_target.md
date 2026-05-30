# Candidate Repair Strict-Gap Closure Target

## Scope

This packet implements the selected route from
`regular_boundary_route_decision.md`: pivot away from the regular-boundary
$T(C)$ domination route and drive the fresh sidecar toward strict null-coordinate
parent-complement closure.

It is priority-only. It does not accept any row, does not edit a live ledger,
and does not authorize `branch_chart.json`. It gives the next repaired candidate
or successor packet a finite pass/fail target.

## Source State

The current packet `fresh-same-packet-fold-shear-seed-v0` has a strong partial
pre-ledger:

- 124 accepted empty rows;
- 6 proof-interval-v4 simple-root subrows;
- 10 receiver-side parent-complement strips still `split_required`;
- 16 active fold-layer rows still requiring same-packet fold-layer fields;
- no branch-chart authorization.

The regular-boundary path is blocked because proof-interval-v8 has no fresh
same-packet fold ceiling, no $I^{\mathrm{reg\text{-}bdry}}$ bounds, and no
non-core complement closure. Therefore the next closure attempt should change
the candidate geometry until the 10 parent-complement collars become strict
range-empty, exact fold-layer, or endpoint-owned rows before any branch-chart
work.

## Strict-Gap Functionals

For a parent-complement strip
$$
M=R\times S
$$
with ledger coordinate
$$
z_\ell(\theta)=c_fT_{\mathrm{cyc}}\theta+\sigma_\ell X(\theta),
\qquad
\sigma_u=-1,\quad \sigma_w=+1,
$$
define the two possible strict-gap functionals
$$
\delta_{S<R}(M)
=
\inf_{\theta_r\in R}z_\ell(\theta_r)
-
\sup_{\theta_s\in S}z_\ell(\theta_s),
$$
and
$$
\delta_{R<S}(M)
=
\inf_{\theta_s\in S}z_\ell(\theta_s)
-
\sup_{\theta_r\in R}z_\ell(\theta_r).
$$
The strip is range-empty when either functional is strictly positive. At the
current v10 sidecar every listed strip has both functionals nonpositive. The
repair target chooses the smaller current deficit unless structural constraints
force the opposite orientation.

For a candidate parameter vector $\mathbf a$, the strict-gap repair condition is
$$
\delta_m(\mathbf a)>0
\qquad
\text{for all }m=1,\ldots,10.
$$
For a tangent repair direction $\xi$ at a provisional structural candidate
$\mathbf a_0$, the sufficient finite test is
$$
D\delta_m(\mathbf a_0)\xi
\ge
\kappa_m+\gamma_m,
\qquad
\gamma_m>0,
$$
where
$$
\kappa_m=-\delta_m(\mathbf a_0)
$$
is the current strict-gap deficit in the chosen orientation.

## Current v10 Deficits

The current v10 interval ranges give the following repair targets. The selected
orientation is the lower-deficit orientation computed from the recorded
receiver/source null-coordinate ranges.

| Strip | Ledger | Parent row | Selected orientation | Current deficit |
| --- | --- | --- | --- | ---: |
| `C_w_A1_A0_left_v10_1` | `w` | `R_w_A1_A0` | $S<R$ | 0.030530625174797876 |
| `C_w_A2_A0_left_v10_2` | `w` | `R_w_A2_A0` | $R<S$ | 0.09712946440190295 |
| `C_w_A2_A0_right_v10_3` | `w` | `R_w_A2_A0` | $S<R$ | 0.06160689267192887 |
| `C_w_A2_A1_left_v10_4` | `w` | `R_w_A2_A1` | $R<S$ | 0.030206375980674993 |
| `C_w_A2_A1_right_v10_5` | `w` | `R_w_A2_A1` | $S<R$ | 0.06517841972513794 |
| `C_u_A3_A2_left_v10_6` | `u` | `R_u_A3_A2` | $S<R$ | 0.04542975382825887 |
| `C_u_A4_A2_left_v10_7` | `u` | `R_u_A4_A2` | $S<R$ | 0.2505559801302599 |
| `C_u_A4_A2_right_v10_8` | `u` | `R_u_A4_A2` | $S<R$ | 0.049789505024516956 |
| `C_u_A4_A3_left_v10_9` | `u` | `R_u_A4_A3` | $R<S$ | 0.026634572563022374 |
| `C_u_A4_A3_right_v10_10` | `u` | `R_u_A4_A3` | $S<R$ | 0.03846190342426503 |

The largest selected deficit is the left `R_u_A4_A2` collar. A repair attempt
that cannot open that collar with a certified positive margin cannot consume the
six parent rows by the strict-gap route.

## Closure Criterion

A repaired successor packet may treat the six proof-interval-v4 parent rows as
strict-gap closed only if it supplies, on one frozen packet identity:

1. outward-rounded receiver/source ranges for the 10 strips above;
2. a positive lower bound
   $$
   \delta_m\ge\gamma_m>0
   $$
   in a declared orientation for every strip;
3. a proof that the six simple-root subrows either persist with certified
   source-inner coverage, Jacobian floor, memory-depth margin, and sign margin,
   or are recomputed by the same proof-interval backend;
4. a proof that the 124 already accepted empty rows either persist or are
   recomputed;
5. a separate treatment of the active fold-layer rows, endpoint/seam rows, and
   nonmonotone diagonal contacts.

If any repaired collar remains overlap, endpoint-scale uncertain, or residual
equality core, the strict-gap repair route fails closed for that parent row.

## Solver Use

The existing finite fold-shear witness remains useful only as a seed direction.
The current v10 deficits show that the first sidecar did not finish strict-gap
closure. The free-period local-shear diagnostic and the shifted-separator
fixed-period diagnostic now sharpen the route:

- the free-period local-shear matrix has a strict tangent witness, but direct
  finite integration reaches 20 field-speed crossings at its strict-gap
  threshold;
- the shifted-separator fixed-period matrix has a stricter tangent witness
  $(h_{A0s},h_{A1s},h_{A2s})=(-1,-1,-1)$ with minimum post-margin surplus
  `0.484518823372`, but direct finite integration still reaches 12 field-speed
  roots at $\lambda_{\min}=0.264833953926991`;
- the bounded three-coordinate shifted-separator sampled LP screen adds
  explicit field-speed sign-itinerary inequalities to 810 sampled collar
  inequalities and 1,940 retained field-speed sign guards, but its optimum
  still has nonpositive sampled strict-gap margin
  $\gamma_{\mathrm{sample}}=-0.204126631574676$;
- the split-two shifted-separator enrichment repeats the same sampled screen
  with six subarc coefficients and still has nonpositive sampled margin
  $\gamma_{\mathrm{sample}}=-0.207816886605516$;
- the anti-periodic cubic Hermite same-itinerary screen tests grid refinements
  through 270 Hermite nodes and 541 LP variables, with derivative-bound
  sensitivity over $40\le |H'_i|_{\max}\le 640$, and reaches the sampled
  boundary from below with best margin
  $\gamma_{\mathrm{sample}}=-2.20865857936394\times 10^{-10}$ rather than a
  positive strict-gap margin;
- the row-only numerical dual for that Hermite sampled LP gives a
  residual-adjusted negative upper bound
  $\gamma\le -2.20862209291526\times 10^{-10}$ at half-grid 256;
- the rationalization audit replaces the 23 active half-grid-256 dual
  multipliers by exact rationals with denominator cap $10^9$ while preserving
  the negative binary64-row residual-adjusted bound
  $\gamma\le -2.20860276388005\times 10^{-10}$;
- the active-row interval backend reconstructs those 23 rows with exact
  rational Hermite coefficients, outward rational trigonometric bounds, exact
  gamma stationarity, and no gamma residual cap, proving the finite sampled
  row-system upper bound
  $\gamma\le -2.20499517531647\times 10^{-10}$.

The next solver should therefore:

1. treat generic same-itinerary Hermite basis enrichment as closed at the
   finite sampled level unless a continuous-in-collar lift is explicitly built;
2. either freeze a new repaired packet identity around a genuinely different
   same-itinerary structural ansatz or explicitly reopen the itinerary;
3. assemble the signed gap derivative matrix $A$ for the selected orientations
   above;
4. keep the structural constraint matrix $B=DC(\mathbf a_0)$, including section,
   symmetry, separator, matching, and neutral-coordinate rows;
5. solve
   $$
   B\xi=0,
   \qquad
   A\xi\ge\kappa+\gamma;
   $$
   together with finite field-speed-itinerary inequalities inside that
   constrained solve;
6. emit a candidate packet only after the same deformation also preserves or
   recomputes the simple-root and empty-row certificates.

This is the shortest path toward closure because it attacks the actual
parent-complement obstruction rather than adding a regular-boundary theorem
around the same overlap geometry.

## Capture Decision

Priority-only. This packet is not corpus-ready and should not be promoted into
AAA prose. It provides the next strict finite target for the proof-program
queue: repair the candidate until the 10 parent-complement strips have certified
positive null-coordinate gaps, then rerun the proof-interval pre-ledger before
any branch-chart construction.
