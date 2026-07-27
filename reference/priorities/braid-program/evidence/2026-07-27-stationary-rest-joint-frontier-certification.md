# Stationary-Rest Joint Retained-History Frontier Certification

Status: CURRENT-SOURCE VALIDATION-ONLY CERTIFICATION; BOTH CROSS ROOTS
CERTIFIED; CAMPAIGN 1 DISABLED; G3/G4 UNCHANGED (2026-07-27).

## Scope and result

The validation-only fixture
[`eom_stationary_joint_frontier_fixture_cli.cpp`](../../../../src/eom/native/eom_stationary_joint_frontier_fixture_cli.cpp)
rebuilds the exact stationary-rest R0 input used by
[the frontier diagnostic](2026-07-27-stationary-rest-root-frontier-diagnostic.md):
$c_f=1$, charges
$\pm0.1666666666666666666666666666666667$, stationary positions
$\mathbf X_\pm=(\pm0.5,0,0)$ on $[-20,0]$, R0 history segments of width
$0.1$, initial step $0.02$, minimum step $0.005$, and root-time tolerance
$10^{-5}$.

The fixture evolves only to the accepted frontier
$T=1.2399999999999993$ while retaining the joint affine histories published
by accepted endpoint-corrector steps. It then supplies that accepted carrier
directly to one atomic replay ending at
$T=1.2449999999999992$. The replay is accepted, and both cross-pair root rows
are `certified_complete`.

Claim grade: measured current-source EOM-solver validation. This closes the
specific `joint_root_history_missing` blocker for this exact in-process step.
It is not independent acceptance of the EOM solver or authorization to use
the carrier in a campaign.

Plainly: when the solver preserves the correlation state that its accepted
endpoint corrector produced, the previously blocked next R0 step certifies
without loosening the root tolerance.

## Certified rows

Both symmetry-related cross rows returned one root, a certified root-free
complement, one 128-bit directed-MPFR attempt, and the same exact tokens:

| Receiver $\leftarrow$ transmitter | Root bracket | Transmitter factor | Receiver factor |
| --- | --- | --- | --- |
| `positive` $\leftarrow$ `negative` | $[0.529166364309222802199399474920937791467136,\ 0.5291763643092228021993994749209377914668]$ | $[0.844297603880903384504762103607819188158166,\ 0.844304846552852842081309632852906757681743]$ | $[1.44664454578466685763618919505532818285218,\ 1.44666769158137578627982480885592744454161]$ |
| `negative` $\leftarrow$ `positive` | $[0.529166364309222802199399474920937791467136,\ 0.5291763643092228021993994749209377914668]$ | $[0.844297603880903384504762103607819188158166,\ 0.844304846552852842081309632852906757681743]$ | $[1.44664454578466685763618919505532818285218,\ 1.44666769158137578627982480885592744454161]$ |

The prefix completed 149 accepted controller steps and delivered two joint
histories at the frontier. After the controller's bounded condensation and
frontier lift, each emitted joint history had 12 shared symbols and 498
segments. The exact replay input start token was
`1.2399999999999993`; the replay reported `atomic_fail_closed=true`.

Claim grade: measured fixture output. Falsifier: a rebuilt fixture changes
either cross row from `certified_complete`, loses the root-free complement,
changes the declared input or tolerance, or reaches the row without the
published endpoint-corrector joint histories.

Plainly: both directions see the same certified causal event, and the solver
would still publish nothing from a rejected replay.

## Carrier boundary

The fixture seeds only the exact zero-deviation joint representation of the
declared stationary prehistory. The EOM solver then lifts the ordinary release
enclosure into the shared registry and publishes later joint histories only
after its existing endpoint corrector certifies the step. No joint coefficient
is inferred from an observer-side comparison.

The fixture keeps the carrier in-process because the current checkpoint schema
does not serialize joint histories. It does not modify checkpoint semantics,
the attractor harness request, the Campaign 1 dispatch path, solver equations,
root tolerances, G3/G4 status, or any campaign result.

Claim grade: derived from the fixture and live request/checkpoint contracts.
Falsifier: the fixture begins from a fitted cross-path coefficient, or a
campaign/checkpoint path begins carrying the new state in this change.

Plainly: this test proves the existing certified carrier can cross this one
frontier. It deliberately does not turn that carrier on anywhere else.

## Validation

- Repository commit at validation start:
  `19dbd156856ca21780ddc86883235a57595b1544`.
- `src/eom` aggregate SHA-256:
  `7ecb58c66240af97e19eebc2a1b618db8b123acf4bdb52ffee1ceb30f34f6298`.
- Fixture source SHA-256:
  `60f4bbdc688544a78aa7e98e7ec7cbff9c9eaf1e2e5697d3b4bd2333d5f56e88`.
- EOM static-library SHA-256:
  `485492ae98bbda10eb0fcb98242fab083e0fa1d8f8a544210f943b18480fa3b4`.
- Fixture binary SHA-256:
  `b06d4614f99511fcb830d7cdc52403434c3395fba4124727858cf2d89ea2b16e`.
- Rebuilt compiled CTest fixtures: 6/6 passed, including
  `eom_stationary_joint_frontier_fixture`.
- Separately authored Python root-certification tests:
  23/23 passed via
  [`test_eom_oracle_root_certification.py`](../../../../tests/test_eom_oracle_root_certification.py).

The Python suite independently exercises the high-precision root-isolation
rules, but it does not recompute this exact joint-affine frontier row.
Accordingly, the exact result above remains a measured EOM-solver
certification, not an independent numerical-correctness claim.

Plainly: the new compiled case passes alongside every existing compiled
fixture, and the separate root oracle suite still passes. The exact stationary
row has not been promoted beyond the authority of the instrument that emitted
it.

## Unchanged scientific boundary

No crossing, rebound, outer turn, recapture, breathing cycle, fate, binding,
stability, retention, energy closure, particle identity, physical
realization, Campaign 1 result, or G3/G4 acceptance follows. The next
campaign-facing blocker remains a separately reviewed durable carrier path,
including checkpoint handling if chunked execution must preserve joint state,
followed by the unchanged instrument reacceptance process.

Plainly: one missing numerical certificate is now available. Nothing about
what the binary ultimately does has been measured here.
