# Borg EOM Run-Grade Evidence — Seed 0 and 64 Paths — 2026-07-16

## Outcome

Display grade crossed the seed-0 regulator halt and published demoted output
through the measurement boundary at $T=1.45$. It did not produce certified
caustic evidence. Certified grade retained the existing atomic halt, and the
pre-change and final certified fixture artifacts have identical SHA-256
digests.

Claim grade: `measured`. Falsifier: the commands below fail to reproduce the
accepted endpoints, warnings, claim markers, or hashes from the named source
state and binary controls.

## Instrument and build

The instrument was
`scripts/eom/profile-borg-incremental-chunks.mjs` driving the persistent
`eom_borg_shadow_cli` process through `BorgEomShadowRunner`. The final Release
binary was rebuilt at `2026-07-16 21:54:26 -0400`, after the last solver-source
change at `2026-07-16 21:54:15 -0400`.

- Binary SHA-256:
  `f6efe50db17d94b8cad92b4a5c516f7603906a01f5e11fc497c038defc77fc7f`
- Seed-0 display profile SHA-256:
  `d8f8319b77fd08c32df2305cb5eada692c0ceb3feb25bba5bb7d7629b7d4e4f4`
- 64-path display profile SHA-256:
  `a0436fc1cc5b082bc465960842068924303dd401f8c854e16ee419b7e8e87df4`

Claim grade: `measured`. Falsifier: a binary timestamp at or before the final
source timestamp, or a digest mismatch for a retained measurement artifact.

## Certified-grade control

The seed-0 3:3 certified request used demo tolerances, `h_initial=h_max=0.025`,
`h_min=0.0001`, adaptive growth enabled, and 0.05-time chunks. It halted at
`T=1.3759765625` with `caustic_transit_uncertified`; the terminal row was
`FWC-REG-02`, no warning was published, and the terminal chunk cost
`111.026 s`.

The frozen pre-change fixture artifact and the final fixture artifact both
have SHA-256
`7813ab06ec53ba1d08dc6c6de92d2db47bbbe2459a788763483a055935d66f51`.
This establishes bit identity of the deterministic certified control; it is a
regression check, not independent evidence that the underlying mathematics is
correct.

Claim grade: `measured`. Falsifier: any deterministic token differs between
`/tmp/eom-run-grade-baseline-before.json` and a final
`eom_native_evolution_fixture_cli all` artifact, or the certified seed-0
request publishes a warned segment.

## Display-grade seed-0 passage

Command:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  /tmp/eom-run-grade-current/eom_borg_shadow_cli \
  --chunks=29 --seed=0 --chunk-duration=0.05 \
  --initial-step=0.025 --minimum-step=0.0001 --maximum-step=0.025 \
  --adaptive-growth=true --run-grade=display --summary-only=true
```

| Chunk interval | Accepted end | EOM wall seconds | Cumulative warnings | Claim marker |
| --- | ---: | ---: | ---: | --- |
| $[1.30,1.35]$ | 1.35 | 0.0428073 | 0 | `executable_architecture_evidence` |
| $[1.35,1.40]$ | 1.40 | 95.9311 | 2 | `uncertified-through-encounters` |
| $[1.40,1.45]$ | 1.45 | 97.0854 | 10 | `uncertified-through-encounters` |

The first warning time was `1.375`. The first crossed row was `FWC-REG-01` for
the ordered contribution `1003 -> 1006`. The following chunk logged
`FWC-ENTRY-02` for both ordered directions at the retained segment join and
continued on the pair-scoped finite-width chart. The requested measurement
boundary at $T=1.45$, not a solver failure, ended the run. No claim is made here
about survival beyond $T=1.45$.

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
| 64 | 0.05 | 1.2271 | 1.293216667 | 0.0386633 |

Claim grade: `measured`. Falsifier: the same 32:32 population cannot construct
an accepted initial datum, the runner does not return playable frames, or the
measured outer rate differs on repeat outside normal host-load variation.

## Gate separation and authority

Display demotion is pair-scoped and row-scoped. Memory-boundary contact,
ordinary correction failure, local-error failure, and non-caustic resource
ceilings retain their rejection paths. Producer-asserted evidence flags are
not consumed as an authority upgrade, and display output is
promotion-ineligible.

Claim grade: `derived-design` and `tested-regression`. Falsifier: a display
request publishes after any non-FWC rejection, a display response becomes
promotion-eligible, or certified output changes when only run-grade support is
added.

## Validation

- EOM Python: 139 tests passed.
- Borg JavaScript: 66 tests passed.
- The repository pre-commit hook passed content/reference validation, scene
  graph validation, receiver-normal and notation checks, and animator wiring.
- A repository sweep found one V4 producer, one exact-22-field parser, and no
  code path accepting an earlier magic or an under-length `RUN` record.

Claim grade: `measured`. Falsifier: any named suite or hook fails on the same
source state, or a code search identifies a second producer or permissive
parser.
