# T1 Load-Bearing Number Cross-Verification — 2026-07-15

**Disposition:** `FAIL_CLOSED_NOT_VERIFIABLE`; `priority-only`; no corpus promotion.

**Claim levels.** The rebuild and parity results below are **measured**. The
oracle-capability finding is **derived** by inspection of the runnable native
and independent-oracle interfaces. The recorded T1 values remain **recorded
legacy-family measurements**; none is promoted here to an EOM-plus-independent-
oracle measurement.

**Instruments.** Native side: the rebuilt C++20 engine under `src/eom`.
Independent side: the unmodified 90-decimal-digit Python oracle under
`scripts/eom/oracle`. The compatibility-frozen `src/solver` path, its stored
outputs, and golden fixtures were not used as comparison evidence.

## Fail-closed verdict

Part 1 does not pass. The existing independent oracle can certify causal roots,
pair accelerations, receiver acceleration totals, and coupled-history evolution.
It has no runnable fixture adapter or output contract for any of the composite
legacy-family observables requested here:

- fitted equilibrium coupling or rail-radius Newton solve;
- normalized binding residual after a fitted coupling;
- period-averaged layer or whole-assembly torque/pump;
- a separation/phase Newton optimum; or
- a period-integrated cancellation fraction.

This is not a precision failure. It is a missing measurement path. In the
oracle API, `coupling` is an input to `PairAccelerationRequest`, not a fitted
output. Repository-wide capability inspection found no binding, torque,
equilibrium, optimizer, or cancellation reduction in `scripts/eom/oracle` or
the native fixture CLIs. Adding a translator, optimizer, or reduction layer
would extend the oracle's checking capability, which this task explicitly
forbids. Therefore every requested number is `NOT-VERIFIABLE` on the existing,
unmodified EOM-oracle path.

Because Part 1 is not all-PASS, Part 2 is barred. The ledger's R1/R3 text was
not changed in this pass.

## Precision contract and predeclared tolerance rule

The existing oracle evaluates decimal intervals at 90 digits. The accepted
root fixtures use declared root tolerances down to `1e-12`; the sharp
acceleration fixtures declare `1e-9`; native-oracle acceptance is interval
containment/overlap, not equality of rounded midpoint strings. For a composite
observable, the comparison tolerance would have to be declared as the larger
of the propagated native/oracle enclosure and the recorded value's rounding
unit before running the fixture.

No such propagated enclosure exists for the requested composite observables,
because the oracle emits none of them. A numeric tolerance would therefore be
invented rather than derived from the oracle precision contract. The table
marks the tolerance `N/A` and fails closed instead of selecting one after the
fact.

## Per-number result

| Recorded value | Owning fixture/configuration referent | EOM value | Independent-oracle value | $|\Delta|$ | Declared tolerance | Result | Missing capability |
|---|---|---:|---:|---:|---:|---|---|
| $\kappa_{\rm eq}=0.28623$ | `fold-crossing-chart-spec.md` §58/§60; `SELF_EQUILIBRATED_V5`; `railPinnedEquilibrium` and the Row-7 in-build gate | — | — | — | N/A | **NOT-VERIFIABLE** | Oracle accepts coupling as input; it does not fit $\kappa$ or run the rail-pinned equilibrium solve. |
| $R_M^{\rm eq}=3.4937\,\kappa\varepsilon^2/c_f^2$ | Same §58/§60 V5 fixed-point fixture; recorded relation $R_M^{\rm eq}=1/\kappa_{\rm eq}$ on the selected gauge orbit | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle size-equilibrium/Newton output. |
| §96 $\epsilon_{\rm bind}=0.0492298548241$ | `full-dof-stacked-tilted-braid-spec.md` “Control reproduction”; `FULL_DOF_STACKED_TILTED_FIXTURE.flatControl` / `controlReproduction()` | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle coupling-fit plus normalized multi-ring binding-residual reduction. |
| §99 photon $\epsilon_{\rm bind}=0.9922225625$ | `planar-assembled-free-particle-spec.md` “Photon result”; 24-sample replay of the selected same-branch screened-family configuration in `planar-assembled-free-particle-fixture.mjs` | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle Section-99 fixture adapter or fitted binding-residual reduction. The family remains non-canonical for photon claims. |
| §99 electron-rest $\epsilon_{\rm bind}=0.9999927135$ | `planar-assembled-free-particle-spec.md` “Electron result”; selected same-branch pair plus the recorded six-electrino payload configuration | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle payload-family adapter or fitted binding-residual reduction. |
| §82 held-seed self-torque $+0.424$ | `fold-crossing-chart-spec.md` §82; `SELF_EQUILIBRATED_V5`; `honestNetSelfTorque()` at the declared $N_t$/softness reference | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle period-average torque reduction; the native/oracle acceleration APIs stop at per-receiver acceleration totals. |
| §60 middle-layer open rail pump $+0.227$ | `fold-crossing-chart-spec.md` §58/§60; V5 in-build pointwise booking (`0.2274`, with `0.22736` recorded on the Row-8 replay) | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle layer projection and pump-booking reduction. |
| §92/§93 $\Delta z=1.419842173795055$ | `planar-assembled-free-particle-spec.md` §93 control row and `fold-crossing-chart-spec.md` §93; `CONTRA_ROTATING_CROSS_COUPLING_FIXTURE` plus `refineCoupledEquilibrium()` | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle cross-braid objective or separation/phase Newton refinement. |
| §92/§93 $\Delta\phi=3.8435815410366416$ | Same §93 fixture and refinement | — | — | — | N/A | **NOT-VERIFIABLE** | Same missing optimizer/reduction path. |
| §14 neutral-braid cancellation $\sim97\%$ | `fold-crossing-chart-spec.md` §14; `cross-hit-causal-absorption.mjs::neutralBinaryCausal()` with its declared default geometry and coarse/fine cycle sampling | — | — | — | N/A | **NOT-VERIFIABLE** | No oracle period-integrated signed-transfer and magnitude-sum cancellation reduction. |

The dashes are not zeroes and are not failed numerical comparisons. They mean
the instrument cannot emit the requested observable without new checking code.

## Engine rebuild and independent baseline

**Measured:** the three native fixture binaries were rebuilt at
`2026-07-15 15:46:17–15:46:18 -0400`. The latest EOM source used by the build
was `src/eom/src/CoupledEvolution.cpp`, modified
`2026-07-15 12:54:28 -0400`; the binaries are therefore newer than the latest
source by approximately 2 h 52 min.

**Measured:** the accepted native/oracle suites passed `44/44` tests in this
run: 15 history-layer, 12 acceleration, and 17 coupled-evolution tests.

**Measured:** the existing evolved-history trace replay passed `72/72` ordered
pairs across two snapshots with no divergence. This proves the live native and
independent implementations agree on that trace's root certificates. It does
not manufacture the missing T1 family reductions above.

## Reproduction commands

```bash
cmake -S src/eom -B .tmp/eom-native-dev -DCMAKE_BUILD_TYPE=Release
cmake --build .tmp/eom-native-dev --parallel 8

PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_history_layer.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_acceleration.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_coupled_evolution.py -v

PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" \
  scripts/eom/evolved-history-root-parity.py \
  .tmp/evolved-history-root-parity-warm-final.json --progress-every 1

rg -n -i \
  "bind|closure residual|torque|cancellation|fit.*coupling|kappa|equilibrium|newton|phase.*optimi|separation.*optimi" \
  scripts/eom/oracle src/eom/native src/eom/include src/eom/src --glob '!*.json'
```

The capability search returns only the pinned-fold source comment among the
searched observable terms; a focused read shows `coupling` only as a request
field and row echo in `certified_acceleration.py`.

## First blocker

`missing_unmodified_oracle_fixture_adapter_and_composite_observable_reductions`

The smallest future object that could clear this blocker is an independently
authored T1 fixture/reduction layer that maps the owning legacy configurations
to retained histories and emits fitted coupling, residual, torque, optimizer,
and cancellation certificates. That is deliberately not created in this
thread because it would extend the oracle.
