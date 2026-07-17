# Far-Field Contribution Enclosure — Apple M3 — 2026-07-16

Status: implemented and certified at the isolated pair and 3:3
memory-boundary mechanism levels; the live seed-0 dispersal replay remains
blocked before dispersal by the independent caustic obligation recorded below.

Subject: `coupled_retained_history_integrator`

Specification:
[`../far-field-contribution-enclosure.md`](../far-field-contribution-enclosure.md)

Frozen law:
[`../master-eom-binding-v0.md`](../master-eom-binding-v0.md)

## Build provenance

The EOM solver was rebuilt after the far-field source changes. The measured
seed-0 and final acceptance binary was
`.tmp/eom-native-dev/eom_borg_shadow_cli`, rebuilt at
2026-07-16 20:30:27 EDT, later than the final `CoupledEvolution.cpp` source
change at 2026-07-16 20:30:18 EDT.

Claim grade: `measured`. Falsifier: the binary timestamp predates any source
file that contributes to the measured run, or a clean rebuild changes the
reported certificates.

## Independent analytic reference

The independent reference is the exact static-pair reduction of the frozen
law, not the native classifier and not a same-change Decimal oracle. Two
zero-velocity like-polarity paths at separation $R=10$, with
$\kappa=0.005$, have one retained root and

$$
\mathbf A
=0.005\frac{(-1,0,0)}{10^2}
=(-0.00005,0,0).
$$

The native classifier emitted:

| Quantity | Native outward interval |
| --- | --- |
| separation | `[9.9999999999999893, 10.000000000000011]` |
| magnitude bound | `[0, 0.000050000000000000233]` |
| pair width budget | `[0.0049999999999999966, 0.0050000000000000044]` |
| derived cutoff radius | `[1.4142135623730927, 1.4142135623730976]` |
| each acceleration component | `[-0.000050000000000000233, 0.000050000000000000233]` |

The exact vector is contained component by component. The four-pair ledger was
$4=0+2+2+0$: two cross-pairs enclosed, two self-pairs exact, zero unresolved.
Only the two self-pairs entered root certification.

Instrument:

```text
.tmp/eom-native-dev/eom_native_evolution_fixture_cli all
tests/test_eom_native_coupled_evolution.py::test_far_field_enclosure_contains_independent_static_pair_law
```

Claim grade: `measured` for interval containment and ledger values; `derived`
for the exact static vector. Falsifier: any analytic component lies outside
the emitted interval, any enclosed cross-pair enters root certification, or
the ledger sum differs from four.

No file under `scripts/eom/oracle/` changed in this implementation batch.
Claim grade: `measured` by the scoped git diff. Falsifier: a same-batch oracle
diff appears.

## 3:3 memory-boundary control

The discriminating control uses six static paths with charges 3:3, positions
$x=0,2,4,6,8,10$, accepted history $[-2,0]$, $c_f=1$,
$\kappa=0.005$, and acceleration component-width tolerance $0.1$. Adjacent
cross-pair roots touch the history boundary at $T=0$.

With the enclosure fraction set to zero, the atomic step `[0,0.1]` rejected as
`insufficient_history_depth`; input and published fingerprints were identical.
With the declared fraction set to `0.25`, the run completed its requested
interval through $T=3$ in 30 accepted steps with no rejection:

$$
36=0+6+30+0.
$$

All 30 off-diagonal pairs were enclosed, all six self-pairs remained exact,
and zero pairs were unresolved at the first and final steps. The maximum
per-receiver enclosed width was `0.0065277777777779065`, inside the declared
`0.025` receiver slice. The all-pair audit sum was
`0.032491666666667252`; acceptance is governed by the per-receiver sum because
each receiver acceleration is reduced separately.

The run ended only because $T=3$ was the requested endpoint. It crossed 1.5
times the two-unit retained-history depth without a root-driven lookback halt.

Instrument:

```text
.tmp/eom-native-dev/eom_native_evolution_fixture_cli all
tests/test_eom_native_coupled_evolution.py::test_far_field_enclosure_crosses_dispersal_memory_boundary_atomically
```

Claim grade: `measured`. Falsifier: the disabled control does not reject at
the boundary, the enabled control fails before $T=3$, an off-diagonal pair is
root-searched, the ledger differs from 36, any unresolved count is nonzero, or
the receiver width exceeds `0.025`.

### Cost

Five repetitions of the dedicated timing mode produced these medians:

| Measurement | Median wall seconds |
| --- | ---: |
| enabled first accepted step | `0.00270137` |
| enabled final accepted step | `0.00768583` |
| enabled 30-step run through $T=3$ | `0.157982` |
| disabled boundary rejection | `0.000479667` |

Command:

```text
for i in 1 2 3 4 5; do
  .tmp/eom-native-dev/eom_native_evolution_fixture_cli far-field-dispersal
done
```

Claim grade: `measured`. This is the isolated 3:3 mechanism cost, not browser
chunk latency. Falsifier: a repeated five-run median materially differs on the
same binary and machine, or profiling shows the reported timer excludes the
atomic step.

## Disabled-route parity

A pre-enclosure Borg binary from 2026-07-16 06:12:47 EDT and the current V2
binary were given equivalent requests, with the current enclosure fraction
set to zero. Both a one-path static step and a two-path interacting step
completed at the same endpoint and emitted byte-identical
`publishedExtensions` JSON.

Claim grade: `measured`. Falsifier: either comparison emits a differing
history token, accepted endpoint, step count, or terminal status.

## Borg protocol

The forward protocol is `EOM_BORG_NATIVE_V2`. Its `RUN` record has exactly 18
tab-separated fields; `farFieldEnclosureFraction` is explicit. The producer
has no protocol-layer default, the parser rejects under-length records, and a
V1 magic token is unsupported.

Touched producer/consumer call sites:

- `src/apps/borg/BorgBootstrap.js`: declared Borg default `0.25`;
- `src/apps/borg/BorgEomShadowRunner.js`: validated run configuration and
  explicit request field;
- `scripts/eom/BorgNativeEomProcessClient.mjs`: sole V2/18-field producer;
- `src/eom/native/eom_borg_shadow_cli.cpp`: sole V2/18-field parser and
  snapshot diagnostics;
- `scripts/eom/profile-borg-incremental-chunks.mjs`: explicit profiling
  control and enclosed-ledger output;
- `tests/borg-eom-migration.test.js` and
  `tests/test_eom_borg_native_process.py`: producer, exact-length, version,
  and missing-field controls.

Claim grade: `measured` by protocol tests and repository search. Falsifier: a
producer omits the field, a parser accepts 17 fields, V1 is accepted, or any
second producer/parser path is found.

## Live seed-0 result and remaining obligation

The live 3:3 seed-0 command requested 140 chunks through $T=7$ with the Borg
default `0.25` enclosure fraction. No pair was enclosed before the close
approach. Smooth chunks through $T=1.35$ cost `0.0141233` to `0.0416461`
seconds. The terminal chunk cost `109.33` seconds and failed closed at
$T=1.3759765625$ as `caustic_transit_uncertified`; the first failed row was
`FWC-REG-02`, whose $\epsilon_c=0.05$ level exhausted 200,001 cells.

Command:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --chunks=140 --seed=0 --chunk-duration=0.05 \
  --initial-step=0.025 --minimum-step=0.0001 --maximum-step=0.025 \
  --adaptive-growth=true --far-field-enclosure-fraction=0.25 \
  --summary-only=true
```

Claim grade: `measured`. Falsifier: rerunning that exact binary and controls
reaches dispersal, encloses a pair before the caustic, or terminates on another
row.

Therefore the current live default trajectory cannot yet measure the requested
before/after-dispersal browser chunk cost or prove that its original $T\approx6$
memory-boundary halt is removed. The isolated 3:3 control proves the exact
memory-boundary mechanism and ledger route, but it is not a substitute for the
blocked live trajectory claim.

Claim grade: `derived` from the measured ordering of terminal events.
Falsifier: a certified caustic transit makes the live trajectory reach the
dispersed regime, at which point the real replay must replace this limitation.

## Validation

| Check | Result |
| --- | --- |
| EOM Python discovery (`test_eom_*.py`) | `139/139` passed in `144.837 s` |
| Borg JavaScript suite | `63/63` passed in `0.754 s` |
| Borg V2 process suite | included in EOM total; `7/7` |
| content validation | 0 errors, 0 warnings |
| scene graph check | 0 errors, 0 warnings |
| receiver-normal clean slate | passed |
| frequency-triplet drift | passed |
| polarity drift | passed |
| Animator wiring | passed |

Claim grade: `measured`. Falsifier: any listed command fails on the current
working tree or a clean rebuild changes the result.

No rejected or uncertified candidate trajectory was published in any control.
Claim grade: `measured` from fingerprint equality on rejection and atomic-step
certificates. Falsifier: a rejected control changes any published fingerprint
or an enabled accepted step contains a nonzero unresolved count.
