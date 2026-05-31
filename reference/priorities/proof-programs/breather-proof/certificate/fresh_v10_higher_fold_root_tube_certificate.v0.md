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
  `20.359228137299`
- Minimum binary64 complement Lipschitz margin:
  `0.0365691941041439`
- Proof-grade ready: `false`

## Root Tubes

| contact | theta | equation | sign change | derivative floor | tube separation | piecewise breaks |
| --- | --- | --- | --- | --- | --- | --- |
| `Sigma_hf_01` | `0.0155469919352606` | `xdot(theta)+1=0` | `true` | `45.3388167732802` | `0.036992240267396` | `0` |
| `Sigma_hf_02` | `0.0565392322026566` | `xdot(theta)+1=0` | `true` | `41.0785727606544` | `0.036992240267396` | `0` |
| `Sigma_hf_03` | `0.127583617650084` | `xdot(theta)+1=0` | `true` | `29.6527693589666` | `0.0670443854474274` | `1` |
| `Sigma_hf_04` | `0.240031876245625` | `xdot(theta)+1=0` | `true` | `23.9720888325785` | `0.08838450610444` | `0` |
| `Sigma_hf_05` | `0.332416382350065` | `xdot(theta)+1=0` | `true` | `20.359228137299` | `0.067363750208169` | `1` |
| `Sigma_hf_06` | `0.403780132558234` | `xdot(theta)+1=0` | `true` | `44.5468123007981` | `0.067363750208169` | `0` |
| `Sigma_hf_07` | `0.51554699193526` | `xdot(theta)-1=0` | `true` | `45.3388167732815` | `0.036992240267397` | `0` |
| `Sigma_hf_08` | `0.556539232202657` | `xdot(theta)-1=0` | `true` | `41.0785727606549` | `0.036992240267397` | `0` |
| `Sigma_hf_09` | `0.627583617650084` | `xdot(theta)-1=0` | `true` | `29.6527693589666` | `0.067044385447427` | `1` |
| `Sigma_hf_10` | `0.740031876245625` | `xdot(theta)-1=0` | `true` | `23.9720888325784` | `0.0883845061044399` | `0` |
| `Sigma_hf_11` | `0.832416382350065` | `xdot(theta)-1=0` | `true` | `20.359228137299` | `0.067363750208169` | `1` |
| `Sigma_hf_12` | `0.903780132558234` | `xdot(theta)-1=0` | `true` | `44.5468123007981` | `0.067363750208169` | `0` |

## Complement Scan

| interval | theta range | binary64 no-extra-root | min margin |
| --- | --- | --- | --- |
| `C01` | `[0, 0.0135469919352606]` | `true` | `0.097668289859838` |
| `C02` | `[0.0175469919352606, 0.0545392322026566]` | `true` | `0.0803778310293815` |
| `C03` | `[0.0585392322026566, 0.125583617650084]` | `true` | `0.0845270349710121` |
| `C04` | `[0.129583617650084, 0.238031876245625]` | `true` | `0.0449156051417192` |
| `C05` | `[0.242031876245625, 0.330416382350065]` | `true` | `0.0365691941041439` |
| `C06` | `[0.334416382350065, 0.401780132558234]` | `true` | `0.0713702347439342` |
| `C07` | `[0.405780132558234, 0.51354699193526]` | `true` | `0.0888236154916281` |
| `C08` | `[0.51754699193526, 0.554539232202657]` | `true` | `0.0803778310293654` |
| `C09` | `[0.558539232202657, 0.625583617650084]` | `true` | `0.0845270349710299` |
| `C10` | `[0.629583617650084, 0.738031876245625]` | `true` | `0.0449156051417178` |
| `C11` | `[0.742031876245625, 0.830416382350065]` | `true` | `0.0365691941041439` |
| `C12` | `[0.834416382350065, 0.901780132558234]` | `true` | `0.0713702347439344` |
| `C13` | `[0.905780132558234, 1]` | `true` | `0.0888236090707824` |

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
