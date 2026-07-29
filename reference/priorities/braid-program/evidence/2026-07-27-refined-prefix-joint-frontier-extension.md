# Refined-Prefix Joint Frontier Extension

Status: CURRENT-SOURCE VALIDATION-ONLY CERTIFICATION THROUGH
`1.394999999999996`; NEXT STEP FAILS CLOSED; CAMPAIGN 1 NOT RUN
(2026-07-27).

## Capability result

The stationary joint-frontier fixture now constructs its retained-history
prefix with minimum integration step `0.0025` rather than `0.005`. The
frontier replay remains a sequence of fixed `0.005` atomic steps. The
root-time tolerance remains `1e-5`, the precision ladder remains 128 through
512 bits, the normalized field speed remains `1`, and every failed step
retains atomic fail-closed publication.

This is a tighter numerical construction, not a wider acceptance rule. The
refined prefix takes 179 accepted EOM-solver steps and retains 558 joint
segments, compared with 149 steps and 498 joint segments in the preceding
packet.

Claim grade: measured current-source EOM-solver validation for the exact
stationary fixture. Falsifier: a fresh build using the recorded `0.0025`
minimum step fails to reproduce the stated frontier, changes a declared
tolerance or precision limit, or publishes any rejected candidate history.

Plainly: the solver recomputes the earlier path in smaller pieces, which
narrows its certified history error. The root checker and its pass line do not
move.

## Former blocker cleared

Under the preceding `0.005` prefix minimum, the step to
`1.3849999999999962` failed because its joint root-time width was
`1.0036629916485125e-05`. With the refined prefix, both symmetry-related rows
certify that endpoint at 128 bits with one root and a root-free complement.
Each root interval is

`[0.790966809905286559999999999999999999999278, 0.79097626589141445000000000000000000000014]`

and has width `9.455986127890000000000000000e-06`.

The fixture then certifies the next two fixed steps. At
`1.394999999999996`, both rows return

`[0.811741528434414269999999999999999999999621, 0.811751475274239850000000000000000000001714]`

with width `9.946839825580000000000000000e-06`, still below the unchanged
`1e-5` tolerance. The certified-traversal and direct exhaustive exact-pair
routes return exact-token parity at the retained frontier.

Claim grade: measured interface behavior and certified root enclosure. Route
parity is a same-implementation carrier control, not an independent proof of
the stationary numerical row. Falsifier: either cross row loses its unique
root, root-free complement, 128-bit route, or exact-token route parity.

Plainly: smaller prefix steps recover three additional `0.005` frontier
steps. The final passing bracket is close to, but still inside, the declared
limit.

## New fail-closed boundary

The next fixed step to `1.3999999999999959` rejects atomically. Both cross
rows report:

- outer failure: `numeric_precision_limit_exhausted`;
- diagnostic:
  `interior_root_not_surrounded/joint_root/root_time_budget_exceeded`;
- achieved precision: 512 bits in three MPFR attempts;
- joint root-time width: `1.0205062366854167e-05`;
- ordinary-box root-time width: `1.1399023121699673e-05`;
- projected affine radius: `3.5572726500569751e-322`;
- projected remainder radius: `3.8146835796385637e-06`;
- nonlinear radius: `1.2593939873926716e-11`;
- isolated roots: zero;
- root-free complement: `false`;
- rejected candidate publication: none.

An experimental eight-pass repetition of the already-certified endpoint
Krawczyk inclusion changed the former blocker width by only about
`6.5e-17`; that experiment was reverted and no contraction-policy change is
retained. The new boundary is again controlled by the retained-history
remainder, not by MPFR precision or a missing carrier.

Claim grade: measured fail-closed blocker plus a bounded negative capability
test. Falsifier: the recorded request certifies the next step without changing
its prefix, tolerance, or precision contracts, or a separately justified
history construction produces a smaller outward remainder.

Plainly: the first refinement worked, but the same kind of numerical
uncertainty becomes limiting three steps later. More digits still cannot
shrink that uncertainty band.

## Evidence boundary and readiness

The native/Python root-budget controls independently recompute analytical
radial and transverse bounds. They validate the root-consumption rule but do
not independently reproduce this full stationary evolution. The fixture's
direct-versus-traversal agreement validates carrier parity only.

The stationary retained-history frontier is therefore certified through
`1.394999999999996` for this exact refined-prefix protocol. Certified root
completeness through the full head-on close approach and the longer
transverse path remains open. Campaign 1, evolution evidence, and fate
classification did not start.

Plainly: this is real solver-readiness progress with a narrow claim. It is not
yet the complete root gate required to launch the declared campaign.

## Validation and provenance

- Fresh release stationary fixture: passed with schema v4 and exact recorded
  frontier tokens.
- Fresh release compiled fixture suite: 6/6 passed.
- Focused ASAN/UBSAN stationary fixture: passed with the same exact frontier
  and fail-closed boundary tokens.
- Native/Python history-layer and independent root-contract suite: 35/35
  passed.
- Independent certified-evolution oracle suite: 10/10 passed.
- Exact-state repository validation: passed; the commit-bound receipt verified
  an exact repository-state match.

Closure goal: extend independently checked retained-history root completeness
through the full declared close approach without changing acceptance
boundaries, then and only then reconsider Campaign 1 launch readiness.
