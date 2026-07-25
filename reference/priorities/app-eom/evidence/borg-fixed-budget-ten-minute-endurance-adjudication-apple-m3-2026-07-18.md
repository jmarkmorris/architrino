# Borg Fixed-Budget Ten-Minute Endurance Adjudication — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_fixed_budget_ten_minute_endurance_adjudication/apple-m3/2026-07-18`
- Protocol: `EOM_BORG_NATIVE_V8`
- Budgets: unchanged `research-certified-v1` and `interactive-certified-v1`
- Population: six paths, deterministic seeds 0–3
- Requested gate: ten wall-clock minutes without a terminal halt with a Not advanced disposition
- Result: `failed; no preset survives one wall-clock minute on all four seeds`
- Budget, root completeness, acceleration enclosure, local-error rejection, and atomic-publication gates changed: no

The previous sub-second failure was real but avoidable. Borg consumed the
optional certified far-field enclosure for 18 of 36 ordered pairs during the
first evolution chunk. That approximation contributed a receiver acceleration
width of `0.0111853`, so half of that width entered the velocity-radius
recurrence at every step. It was an enclosure intended to save exact pair
work, but for a six-path run it made the retained state wider much faster than
the exact fallback it replaced.

The Borg request now disables far-field enclosure consumption during
evolution and takes the existing exact-pair fallback for every ordered pair.
This changes neither pair accounting nor the root-free-complement obligation:
all 36 ordered pairs remain accounted for, every active root set remains
certified, and a failed candidate remains unpublished. This correction removes
the early `T approximately 0.35` Research halt without spending more tolerance.

The literal endurance gate nevertheless fails. Depending on seed and preset,
the rebuilt binary halts after `4.13` to `45.47` wall seconds, at accepted
solver times from `T=4.952794255188131` through `T=11.475`. The terminal rows
are encounter-dependent sharp-root state amplification, except for Research
seed 2 where the finite-width caustic regulator cannot certify the next
candidate. The evidence therefore rejects another tolerance ratchet: the next
remedy must reduce dependency loss in the joint retained state or provide a
separately validated reconditioned integrator.

Claim grade: `measured-current-binary` for both the removed first mechanism and
the endurance matrix; `derived-current-tree` for the preservation of verification before advancement;
`inferred-adjudication` for the next architecture target. Falsifier: the same
binary and unchanged preset hashes complete 600 wall seconds on all seeds 0–3,
or a certified joint-state/reconditioned method keeps every root set and
caustic row closed under the same allocations.

## Corrected Width Path

The implementation makes four representation and integration corrections,
none of which widens a certified budget:

1. `use_far_field_enclosure_in_evolution=false` for Borg forces exact ordered-
   pair evaluation instead of injecting optional far-field approximation width
   into the state recurrence.
2. Retained histories expose correlated position and velocity endpoint hulls.
   Candidate construction consumes the same certified endpoint intersection on
   both sides of a segment join.
3. Acceleration reconstruction contracts a certified sharp-root bracket by
   the interval mean-value relation around its midpoint, intersects the result
   with the published root certificate, and falls back to the original bracket
   unless the intersection is strictly tighter. The root-completeness record
   itself is unchanged.
4. Borg validates a four-quarter candidate against the existing two-half
   candidate, publishes the finer candidate inflated by their endpoint
   difference, and then performs the unchanged complete recertification and
   atomic publication. This is an embedded sensitivity estimator from the same
   implementation, not an independent correctness oracle.

At seed 0 and `T=0.3`, the sharp-root contraction reduced the largest receiver
acceleration width from `2.09054e-8` to `5.72474e-10`, about `36x`. Four-quarter
publication reduced the measured endpoint local differences to
`3.647379e-10` in position and `4.376259e-9` in velocity. Those improvements
are substantial but do not stop later close-encounter state amplification.

Claim grade: `derived-current-tree` for the enclosure relations and
`measured-current-binary` for the two reductions. Falsifier: disabling either
correction does not reproduce the wider recorded row, the contracted bracket
escapes the published root certificate, or a four-quarter candidate publishes
without the complete existing acceptance pass.

## Fixed-Budget Endurance Matrix

Each row used history depth `1.01`, at most 100 requested `0.3` chunks, the
selected preset's unchanged allocation hash, and no custom tolerance override.
The accepted prefix remains displayable; the failed candidate does not publish.

| Preset | Seed | Accepted solver time | Wall seconds | Terminal status | Position radius | Velocity radius | Acceleration width |
| --- | ---: | ---: | ---: | --- | ---: | ---: | ---: |
| Research | 0 | `6.350099999999999` | `4.127462` | `root_completeness_not_certified` | `2.386942345971238e-4` | `1.639794963328164e-3` | `0.0135078` |
| Research | 1 | `8.601076562500001` | `7.777225` | `root_completeness_not_certified` | `2.81637431388554e-4` | `4.886334518497375e-3` | `0.0999817` |
| Research | 2 | `11.350000000000003` | `45.466270` | `caustic_transit_uncertified` | `2.4787501667833907e-5` | `3.003422662729657e-4` | `0.00483442` |
| Research | 3 | `4.952794255188131` | `6.182979` | `root_completeness_not_certified` | `2.1607372970380175e-4` | `4.246654958049604e-3` | `1.01524e-4` |
| Interactive | 0 | `6.350099999999999` | `4.225253` | `root_completeness_not_certified` | `2.386942345971238e-4` | `1.639794963328164e-3` | `0.0135078` |
| Interactive | 1 | `8.600976562500001` | `6.151984` | `root_completeness_not_certified` | `2.7882604183755206e-4` | `4.412093122163473e-3` | `0.104498` |
| Interactive | 2 | `11.475` | `30.113370` | `root_completeness_not_certified` | `3.982480171742792e-4` | `7.248730072948349e-3` | `1.9053e-4` |
| Interactive | 3 | `4.9544203125` | `4.793563` | `root_completeness_not_certified` | `2.0279252012156822e-4` | `5.037608235928549e-3` | `0.230791` |

All eight rows pass `T=1.2`; none reaches the requested 600 wall seconds. This
is a stronger result than the prior V8 `T approximately 0.35` ablation and
supersedes its inference that a slightly wider root-time row was the next
remedy. The state boxes eventually become wide by encounter-dependent amounts,
and one unchanged-budget route reaches the separate caustic regulator. A
single new root number would move, not remove, the failure boundary.

Claim grade: `measured-current-binary`. Falsifier: an exact repeat changes a
terminal mechanism outside deterministic representation or host timing scatter,
or any seed remains certified for 600 wall seconds.

## Live Borg Controls

After rebuilding and restarting the persistent `5173` service, the in-app
browser exercised both operator methods on the rebuilt executable:

- Research selected, finite duration `1.2`, `Start / restart`: four of four
  forward chunks completed, solver time `1.2`, `completed-live-native-run`.
- Interactive selected, finite duration `1.2`, `Apply & run`: the Interactive
  allocation hash was accepted, four of four forward chunks completed, solver
  time `1.2`, `completed-live-native-run`.
- Browser console errors after both runs: zero.

This is a launch and short-run smoke test, not evidence for ten-minute
endurance. The deterministic matrix above is the endurance adjudicator.

Claim grade: `measured-live-browser`. Falsifier: either named method emits an
engine exception, fails to reach `T=1.2`, selects the wrong preset, or logs a
browser error on the rebuilt service.

## Observability and Reproduction

The incremental profiler now emits a heartbeat every ten wall seconds while a
native chunk is pending, including pending chunk index, accepted-through time,
requested-through time, and elapsed wall seconds. A long caustic-regulator
attempt is therefore distinguishable from a dead worker. The heartbeat has no
publication or acceptance authority.

Representative fixed-budget commands:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=0 --chunks=100 --history-depth=1.01 --root-details=false --history-error-series=true
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=interactive-certified-v1 --seed=0 --chunks=100 --history-depth=1.01 --root-details=false --history-error-series=true
```

The seed argument was repeated for seeds 1, 2, and 3. The binary link time was
later than every participating C++ source modification.

Validation commands:

```text
cmake --build .tmp/eom-native-dev --target eom_borg_shadow_cli -j 8
ctest --test-dir .tmp/eom-native-dev --output-on-failure
node --test tests/borg-eom-migration.test.js tests/borg-eom-runtime-contract.test.js
../.venv/bin/python tests/test_eom_borg_native_process.py
PYTHONPATH=. ../.venv/bin/python tests/test_eom_native_coupled_evolution.py
node scripts/validate-content.mjs --check --strict
```

This packet is `priority-only`. It changes no reader-facing theory claim and
does not promote the current Borg run to accepted long-horizon evidence.
