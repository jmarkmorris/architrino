# §86 Fold Routing, Warm Complement, and Delay-Window Audit — 2026-07-14

## Disposition

`priority-only`; `warm_complement_implemented`; `delay_window_tightened`;
`fold_routing_change_rejected`; `no_tolerance_change`;
`no_fail_closed_change`; `accepted_output_unchanged`; `no_score_increase`.

The bracket-only warm start remains rejected. The operator's corrected target
supplies the missing proof object: a complete collection of root-free cells
whose residual enclosures can be transported between snapshots. The engine now
reuses those exclusions, never the old root brackets.

## Fold-routing check

For the supplied exact-pin values

```text
rho = 0.96009867914
omega = 1.0415596039524766
c_f = 1
D = 0.042
```

direct evaluation gives

```text
g(D) = -3.348840740262371e-6
D_s = +2.3919909609593226e-4
rho omega^3 D^2 / 8 = +2.392086330932184e-4
```

The derivative sign is strict, but `D=0.042` is not an IVT root bracket. The
live difficult cell has same-sign endpoint residuals while its retained-token
whole-cell source-normal hull marginally overlaps zero. Refining below the
existing root tolerance was tested and rejected: it entered the real token
noise floor, attempted MPFR 48 times, took `226.604 s`, and still returned the
finite-width route. That experiment was reverted. The production path retains
the unchanged finite-width classification for the two middle self pairs.

## Warm-complement certificate

Each reusable exclusion cell carries its emission bounds, exact source-segment
identity, residual enclosure, and receiver-normal bound. Reuse requires all of
the following:

1. the previous ordered-pair certificate was complete;
2. the source segment is byte-for-byte identical in all polynomial and error
   tokens;
3. the residual enclosure widened by the reception-time and candidate-motion
   bound remains strictly sign-definite.

For fixed emission time, the transport identity is

```text
dg/dt = r_hat . v_r - c_f = -D_T.
```

The implementation bounds its integral by `(c_f + |v_r|) |dt|` and adds the
certified candidate-position correction. It also computes the direct
receiver-displacement bound and uses the tighter of the two valid upper
bounds. A cell whose widened residual touches zero is re-evaluated by the
unchanged classifier. Root brackets are always rebuilt, and uniqueness still
requires the sign-definite source-normal hull.

The native fixture `warm_complement_current` advances reception by `0.001`,
transports a root-free residual with drift bound `0.001`, reuses one exclusion
cell, and performs zero cell re-evaluations. The existing
`automatic_mpfr_precision_gate` still reaches MPFR without forcing it and
certifies two roots at 128 bits.

## Certified delay window

The history-window proof now computes a certified radial maximum over each
individual history segment. The triangle inequality then gives

```text
Delta <= (max |x_r| + max |x_s|) / c_f.
```

For the accepted §86 step, the certified separation upper bound is `2.00966`.
The active root-search lower bound is `-2.0091987601537618`, so `5.9908` of the
eight retained time units is excluded before ordered-pair root classification.
The bound is recomputed at every snapshot and widens automatically if the
object expands.

## Measurement and invariants

The accepted one-worker baseline was `7.153516 s/step`. The same fixed
`0.0005` step now measures `6.388428 s/step`, a `1.1197615x` speedup. This is a
wall-clock dud under the corrected `1.5x` round threshold, although the warm
certificate deletes work: under the same tightened delay window, root-cell
re-evaluations fall from `207234` to `168320` (`18.78%`). Snapshot and pair
search counts remain unchanged because the complement, not the roots, is warm:

```text
snapshots                         14 -> 14
ordered-pair root searches       504 -> 504
corrector iterations             4,3,2
rejected steps                   0
middle self classification       coincident_endpoint_root_continuation
native MPFR pairs / attempts     0 / 0
```

The accepted trajectory CSV is byte-identical to the pre-tightening run. The
independent evolved-history replay passed 72/72 ordered-pair rows across two
snapshots with no divergence. The four suites passed 23 root-oracle, 14
native-history, 12 native-acceleration, and 14 native-coupled-evolution tests;
all three CMake native fixtures also passed.

The corrected stopping rule is three consecutive rounds below `1.5x`, or less
than `2x` remaining total headroom. This is the second consecutive sub-`1.5x`
round. The prematurely launched physics process was alive at approximately
195% CPU, then was interrupted to serialize the work. No replacement physics
run was launched in this round.

Machine-readable evidence:
[section-86-warm-complement-delay-window-2026-07-14.json](section-86-warm-complement-delay-window-2026-07-14.json).
