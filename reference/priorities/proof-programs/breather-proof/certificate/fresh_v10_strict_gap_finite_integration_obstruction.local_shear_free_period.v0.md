# Fresh v10 Strict-Gap Finite-Integration Obstruction

## Scope

This packet is a priority-only audit of the direct finite integration of the
free-period strict-gap local-shear witness for
`fresh-same-packet-fold-shear-seed-v0`.

It does not claim a repaired candidate, a proof-interval pre-ledger pass, an
outward-rounded interval root count, a live ledger update, or branch-chart
authorization.

Artifacts:

- `fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json`
- `gap_opening_fresh_v10_strict_gap_result.local_shear_free_period.v0.json`
- `gap_opening_fresh_v10_strict_gap_input.local_shear_free_period.v0.json`
- `../../../../../scripts/proof-programs/fresh-v10-strict-gap-finite-integration-audit.mjs`

## Executed Command

```bash
node scripts/proof-programs/fresh-v10-strict-gap-finite-integration-audit.mjs --pretty
```

## Direct Finite Path

The audit tests the literal finite path suggested by the diagnostic witness:
$$
X_\lambda(\theta)
=
X_{\mathrm{fresh}}(\theta)
+\lambda H_{\mathrm{repair}}(\theta),
\qquad
T_\lambda=T_0+\lambda b_T.
$$
Here
$$
T_0=6.28318530718,
\qquad
b_T=-0.176804284695.
$$
The repair witness is

```json
{
  "b_T": -0.176804284695,
  "h_A0": -0.998248451171,
  "h_A1": -1,
  "h_A2": -0.558213117762
}
```

This is not the full structural solve. It is only the direct finite path that
one would get by applying the strict-gap tangent witness to the existing fresh
seed in the current phase coordinate.

## Strict-Gap Threshold

For each v10 collar, the finite path has the form
$$
g_m(\lambda)=-\kappa_m+\lambda a_m.
$$
The threshold at which all listed collars first become nonnegative is
$$
\lambda_{\min}=0.685286902752066.
$$
Strict opening requires any value $\lambda > \lambda_{\min}$.

| Controlling collar | Required margin | Witness derivative | lambda_min |
| --- | --- | --- | --- |
| `C_u_A4_A2_left_v10_7` | 0.25055598013026 | 0.36562201776226 | 0.685286902752066 |

## Field-Speed Itinerary Audit

The current packet identity uses the doubled-four-arc itinerary, so the direct
finite path should preserve four field-speed separator crossings before it can
be treated as a same-itinerary successor. The root scan counts solutions of
$$
\dot X_\lambda(\theta)=1
\quad\text{or}\quad
\dot X_\lambda(\theta)=-1
$$
with 50000 phase subintervals and bisection refinement.

| lambda | T_cyc | field-speed crossings | max abs(xdot) sampled |
| --- | --- | --- | --- |
| 0 | 6.28318530718 | 4 | 1.29545029980074 |
| 0.01 | 6.28141726433305 | 8 | 1.32023124057101 |
| 0.02 | 6.2796492214861 | 8 | 1.34502633677529 |
| 0.05 | 6.27434509294525 | 8 | 1.41949610116418 |
| 0.1 | 6.2655048787105 | 8 | 1.54389340512019 |
| 0.15 | 6.25666466447575 | 8 | 1.66864259167828 |
| 0.2 | 6.247824450241 | 12 | 1.79374493089967 |
| 0.25 | 6.23898423600625 | 12 | 1.91920188501925 |
| 0.3 | 6.2301440217715 | 12 | 2.0450148714706 |
| 0.4 | 6.212463593302 | 12 | 2.29771518676691 |
| 0.5 | 6.1947831648325 | 12 | 2.55185796926287 |
| 0.6 | 6.177102736363 | 20 | 2.80745559344716 |
| 0.65 | 6.16826252212825 | 20 | 2.93580388063401 |
| 0.685286902752066 | 6.16202364652807 | 20 | 3.02660581020726 |
| 0.69 | 6.16119035074045 | 20 | 3.0387476964691 |
| 1 | 6.106381022485 | 24 | 3.8767697979742 |

At the strict-gap threshold, the direct path has
`20` field-speed crossings. At
`lambda=1`, it has `24`.

For reference, the `lambda=1` crossing phases are:

```json
[
  0.00597328980352729,
  0.072246609058939,
  0.0873308632368967,
  0.132648957729749,
  0.1464961180472,
  0.252816665400528,
  0.282961401556768,
  0.321264535310082,
  0.351283719034232,
  0.418532305360846,
  0.440332718472071,
  0.487771911423616,
  0.505973289803527,
  0.572246609058939,
  0.587330863236897,
  0.632648957729749,
  0.6464961180472,
  0.752816665400564,
  0.782961401556768,
  0.821264535310082,
  0.851283719034232,
  0.918532305360847,
  0.940332718472071,
  0.987771911423616
]
```

## Obstruction

The strict-gap tangent is real, but direct finite integration of that witness
does not stay inside the current four-separator itinerary. The amplitude needed
to open all 10 v10 parent-complement collars is already past the point where
additional field-speed crossings appear. Therefore this witness cannot be
promoted directly to a `fresh-v10-strict-gap-free-period-repair-v0` packet
under `doubled_four_arc_generic`.

The next solver has a concrete decision point:

1. Keep the four field-speed separators as hard constraints and solve for a
   strict-gap direction inside that constrained basis.
2. Explicitly authorize a higher-fold itinerary and rebuild the packet identity
   around the larger separator set.

The first route is lower risk because it preserves the existing proof-program
contract. The second route is a broader theory decision and should not be
implied by this diagnostic.

## Capture Decision

Priority-only. This audit blocks direct promotion of the free-period local-shear
witness, but it does not prove that no strict-gap repair exists. No AAA
reader-facing theorem prose should be promoted until an itinerary-preserving
successor candidate reruns the proof-interval pre-ledger with strict margins.
