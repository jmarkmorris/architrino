# Borg EOM Run-Grade Evidence — Seed 0 and 64 Paths — 2026-07-16

## Outcome

Display grade now warns at the entry dispatch and skips the finite-width
regulator, event cells, state reconstruction, and exit adjudication. Seed 0
crossed the encounter with a `5.19938 s` terminal encounter chunk, continued
to $T=2.0$, and then was not advanced when the next process request raised the
retained-history boundary error `history evaluation lies outside segment`.
It did not reach the requested $T=3$ boundary. Certified grade retained the
existing route, and the pre-change and final certified fixture artifacts have
identical SHA-256 digests.

Claim grade: `measured`. Falsifier: the commands below fail to reproduce the
accepted endpoints, warnings, claim markers, or hashes from the named source
state and binary controls.

## Instrument and build

The instrument was
`scripts/eom/profile-borg-incremental-chunks.mjs` driving the persistent
`eom_borg_shadow_cli` process through `BorgEomShadowRunner`. The final Release
binary was rebuilt at `2026-07-16 23:15:16 -0400`, after the last solver-source
change at `2026-07-16 23:15:03 -0400`.

- Binary SHA-256:
  `1f9ee17e995e25753e2fbc7caa4c2caadbbeeeaf5e8001ee22bf87d3d50b7396`
- Seed-0 display profile SHA-256:
  `8df04b225bc1bcc3afc49374805606cc1b57f53530e6dc2a517078e8cf7ed399`
- 64-path display profile SHA-256:
  `d6327262655df439b86144a2fc1784e52a185e3353866cfd13a50d0f2b471688`

Claim grade: `measured`. Falsifier: a binary timestamp at or before the final
source timestamp, or a digest mismatch for a retained measurement artifact.

## Certified-grade control

The seed-0 3:3 certified request used demo tolerances, `h_initial=h_max=0.025`,
`h_min=0.0001`, adaptive growth enabled, and 0.05-time chunks. It halted at
`T=1.3759765625` with `caustic_transit_uncertified`; the terminal row was
`FWC-REG-02`, no warning was published, and the terminal chunk cost
`111.026 s`.

The frozen pre-change fixture artifact for this change and the final fixture
artifact both have SHA-256
`589b086b96ed3f441eaae30c8fcce177103e8d2c22b6c0fa862c1c53749deacc`.
This establishes bit identity of the deterministic certified control; it is a
regression check, not independent evidence that the underlying mathematics is
correct.

Claim grade: `measured`. Falsifier: any deterministic token differs between
`/tmp/eom-display-fast-baseline.json` and a final
`eom_native_evolution_fixture_cli all` artifact, or the certified seed-0
request publishes a warned segment.

## Display-grade seed-0 passage

Command:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  /tmp/eom-display-fast-baseline/eom_borg_shadow_cli \
  --chunks=60 --seed=0 --chunk-duration=0.05 \
  --initial-step=0.025 --minimum-step=0.0001 --maximum-step=0.025 \
  --adaptive-growth=true --run-grade=display --summary-only=true
```

| Chunk interval | Accepted end | EOM wall seconds | Cumulative warnings | Claim marker |
| --- | ---: | ---: | ---: | --- |
| $[1.30,1.35]$ | 1.35 | 0.0401665 | 0 | `executable_architecture_evidence` |
| $[1.35,1.40]$ | 1.40 | 0.925956 | 0 | `executable_architecture_evidence` |
| $[1.40,1.45]$ | 1.45 | 5.19938 | 38 | `uncertified-through-encounters` |
| $[1.45,1.50]$ | 1.50 | 0.696855 | 38 | `uncertified-through-encounters` |
| $[1.50,1.55]$ | 1.55 | 1.49377 | 38 | `uncertified-through-encounters` |
| $[1.95,2.00]$ | 2.00 | 0.109969 | 38 | `uncertified-through-encounters` |

The first warning time was `1.4023437499999998`. Every warning row was emitted
at `FWC-ENTRY-02`; the fixture control recorded zero event impulses and zero
regulator certificates even with a one-cell event ceiling. Relative to the
prior display implementation, the two encounter chunks fell from `95.9311 s`
and `97.0854 s` to `0.925956 s` and `5.19938 s`, respectively. The terminal
encounter chunk is within the declared roughly two-times pre-FWC target.

The requested continuation reached $T=2.0$. The $[2.0,2.05]$ process request
then exited before returning an EOM certificate with `history evaluation lies
outside segment`; the runner surfaced that as `eom_shadow_run_failed`. This is
not an FWC halt and no post-$T=2.0$ segment was published. Reaching $T=3$
therefore remains blocked on adjudicating the retained-history boundary.

Claim grade: `measured`. Falsifier: the same request halts at either warned FWC
row, any published post-warning segment lacks the demoted marker, or a
non-caustic failure is accepted.

## 64-path display rate

The population controls were `32` electrinos and `32` positrinos. Dense initial
placement used a deterministic $4\times4\times4$ grid whose all-pairs geometry
certificate accepted the unchanged `0.2` minimum separation. One 0.05-time
chunk produced 384 playback frames and two accepted 0.025 steps with no
warnings.

| Paths | Simulated time | EOM wall seconds | Runner outer seconds | Sim time / wall second |
| ---: | ---: | ---: | ---: | ---: |
| 64 | 0.05 | 1.14139 | 1.206753167 | 0.0414335 |

This is `7.17%` faster than the earlier `0.0386633` outer-wall rate. The
aligned pair/root index removed an accidental quadratic identity scan from the
event detector; it did not alter any deterministic certificate token.

Claim grade: `measured`. Falsifier: the same 32:32 population cannot construct
an accepted initial datum, the runner does not return playable frames, the
rate falls below the earlier control outside normal host-load variation, or a
certified fixture token changes.

## Gate separation and authority

Display demotion is pair-scoped and entry-row-scoped. The synthetic control
accepted the warned candidate with zero regulator certificates and zero event
impulses. Its ordinary-correction negative remained rejected with
`coupled_correction_failed`. Memory-boundary contact, local-error failure, and
non-caustic resource ceilings retain their rejection paths. Producer-asserted
evidence flags are not consumed as an authority upgrade, and display output
is promotion-ineligible.

Claim grade: `derived-design` and `tested-regression`. Falsifier: a display
request publishes after any non-FWC rejection, a display response becomes
promotion-eligible, or certified output changes when only run-grade support is
added.

## Validation

- EOM Python: 140 tests passed.
- Borg JavaScript: 66 tests passed.
- The repository pre-commit hook passed content/reference validation, scene
  graph validation, receiver-normal and notation checks, and animator wiring.
- A repository sweep found one V4 producer, one exact-22-field parser, and no
  code path accepting an earlier magic or an under-length `RUN` record.

Claim grade: `measured`. Falsifier: any named suite or hook fails on the same
source state, or a code search identifies a second producer or permissive
parser.
