# Fresh v10 Higher-Fold Root-Tube Certificate Attempt

## Scope

This packet evaluates the 12 field-speed contacts of
`fresh-v10-higher-fold-12-root-rebuild-v0` as candidate root tubes for the new itinerary
`fresh_v10_shifted_threshold_12_root_itinerary`.

It is not an outward-rounded interval certificate. It records binary64
sampled/Lipschitz evidence that the 12 sampled contacts are simple roots and
that the complements have no additional sampled field-speed roots under the
global derivative envelope. The packet remains priority-only and does not
authorize the preledger, live ledger, or branch chart.

## Status

- Status: `binary64_lipschitz_root_tube_certificate_ready_for_directed_rounding`
- Target root count: `12`
- Root tubes: `12`
- Binary64 complement no-extra-root pass:
  `true`
- Binary64 tube disjointness:
  `true`
- First-half/second-half tube counts:
  `6/6`
- Minimum sampled root derivative floor:
  `20.733612612016`
- Minimum binary64 complement Lipschitz margin:
  `0.0372582796775772`
- Proof-grade ready: `false`

## Root Tubes

| contact | theta | equation | sign change | derivative floor | tube separation | piecewise breaks |
| --- | --- | --- | --- | --- | --- | --- |
| `Sigma_hf_01` | `0.0152760654045269` | `xdot(theta)+1=0` | `true` | `46.5173527652966` | `0.0374175117591023` | `0` |
| `Sigma_hf_02` | `0.0566935771636292` | `xdot(theta)+1=0` | `true` | `42.1448331220341` | `0.0374175117591023` | `0` |
| `Sigma_hf_03` | `0.127583617650084` | `xdot(theta)+1=0` | `true` | `30.0264522566465` | `0.0668900404864548` | `1` |
| `Sigma_hf_04` | `0.239882538921423` | `xdot(theta)+1=0` | `true` | `24.3557108905942` | `0.088533843428642` | `0` |
| `Sigma_hf_05` | `0.332416382350065` | `xdot(theta)+1=0` | `true` | `20.733612612016` | `0.067508000136465` | `1` |
| `Sigma_hf_06` | `0.40392438248653` | `xdot(theta)+1=0` | `true` | `45.1344252412403` | `0.067508000136465` | `0` |
| `Sigma_hf_07` | `0.515276065404527` | `xdot(theta)-1=0` | `true` | `46.5173527652965` | `0.037417511759102` | `0` |
| `Sigma_hf_08` | `0.556693577163629` | `xdot(theta)-1=0` | `true` | `42.1448331220339` | `0.037417511759102` | `0` |
| `Sigma_hf_09` | `0.627583617650084` | `xdot(theta)-1=0` | `true` | `30.0264522566465` | `0.066890040486455` | `1` |
| `Sigma_hf_10` | `0.739882538921423` | `xdot(theta)-1=0` | `true` | `24.3557108905943` | `0.088533843428642` | `0` |
| `Sigma_hf_11` | `0.832416382350065` | `xdot(theta)-1=0` | `true` | `20.733612612016` | `0.067508000136465` | `1` |
| `Sigma_hf_12` | `0.90392438248653` | `xdot(theta)-1=0` | `true` | `45.1344252412403` | `0.067508000136465` | `0` |

## Complement Scan

| interval | theta range | binary64 no-extra-root | min margin |
| --- | --- | --- | --- |
| `C01` | `[0, 0.0132760654045269]` | `true` | `0.100013192034561` |
| `C02` | `[0.0172760654045269, 0.0546935771636292]` | `true` | `0.0824536582713875` |
| `C03` | `[0.0586935771636292, 0.125583617650084]` | `true` | `0.0865891208489025` |
| `C04` | `[0.129583617650084, 0.237882538921423]` | `true` | `0.0456273594194229` |
| `C05` | `[0.241882538921423, 0.330416382350065]` | `true` | `0.0372582796775772` |
| `C06` | `[0.334416382350065, 0.40192438248653]` | `true` | `0.0724323295833688` |
| `C07` | `[0.40592438248653, 0.513276065404527]` | `true` | `0.0853336818122433` |
| `C08` | `[0.517276065404527, 0.554693577163629]` | `true` | `0.0824536582713967` |
| `C09` | `[0.558693577163629, 0.625583617650084]` | `true` | `0.0865891208488931` |
| `C10` | `[0.629583617650084, 0.737882538921423]` | `true` | `0.0456273594194229` |
| `C11` | `[0.741882538921423, 0.830416382350065]` | `true` | `0.0372582796775772` |
| `C12` | `[0.834416382350065, 0.90192438248653]` | `true` | `0.072432329583369` |
| `C13` | `[0.90592438248653, 1]` | `true` | `0.0853355276232206` |

## Proof-Grade Handoff

This binary64 packet is an audit surface, not the final certificate. Its
proof-grade consumer is the outward-rounded interval backend for the same
root-tube inequalities:

- directed-rounded enclosures for $X(\theta)$, $\dot X(\theta)$, and
  $d\dot X/d\theta$;
- root-tube and complement splitting at the recorded piecewise basis
  breakpoints;
- one-root parity/no-double-counting in every tube;
- no-root complement signs for both $\dot X(\theta)+1$ and
  $\dot X(\theta)-1$.

Only after that interval certificate exists should the proof-interval preledger
be rerun under the new packet identity. If
`fresh_v10_higher_fold_root_tube_interval_certificate.v0.md` exists and
passes, that interval packet supersedes this binary64 attempt for the
root-count topology gate.

## Capture Decision

Priority-only. This packet sharpens the higher-fold route into a concrete
root-count stability target, but the proof-grade topology result belongs to the
outward-rounded interval certificate, not to this binary64 attempt.
