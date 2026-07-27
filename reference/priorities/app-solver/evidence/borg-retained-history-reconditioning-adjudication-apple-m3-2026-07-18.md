# Borg Retained-History Reconditioning Adjudication — Apple M3 — 2026-07-18

## Disposition

- Evidence id: `borg_retained_history_reconditioning_adjudication/apple-m3/2026-07-18`
- Protocol: `EOM_BORG_NATIVE_V8`
- Budgets: unchanged `research-certified-v1` and `interactive-certified-v1`
- Population: six paths, deterministic seeds 0–3
- Requested gate: seeds 0–3 in both presets survive or complete 600 wall seconds
- Result: `failed; all eight rows halt before 45 native wall seconds`
- Root, acceleration, finite-width, local-error, and atomic-publication gates changed: no

The implemented retained-history reconditioning preserves one differentiable
error function through every stored segment join in the MPFR root path. If a
segment has position remainder $e$ with $|e|\leq\epsilon_x$ and derivative
remainder $|e'|\leq\epsilon_v$, then two times separated by $h$ obey

$$
|e(T)-e(S)|\leq\min(2\epsilon_x,\epsilon_v h).
$$

Forward and backward constraint propagation intersects that theorem with the
ordinary per-segment boxes. The ordinary box remains the fallback enclosure;
no failed intersection, root, or complement is promoted.

An analytic native fixture independently checks the rule. Its continuous
four-segment source has a first position radius of `1e-9`, later radii of
`1e-3`, and zero velocity-error radius. Continuity and $e'=0$ force the same
constant remainder across the chain, so the first narrow radius bounds every
later join. The forced-MPFR row certifies the known root at zero inside the
unchanged `1e-5` root ceiling with a complete root-free complement.

Claim grade: `derived-current-tree` for the reconditioning theorem and
`measured-current-binary` for the fixture. Falsifier: the analytic chain fails
to enclose zero, exceeds `1e-5`, loses its root-free complement, or can be made
to pass while violating continuity or its zero derivative-error premise.

## Fixed-Budget Gate Probe

On Research seed 0, the first difficult root remains receiver `1001`, source
`1002`, source segment 81, at accepted solver time
`6.350099999999999`. The prior MPFR point residual was approximately
`[-1.913e-5, 1.070277e-3]`. Reconditioning narrows it to
`[-1.325821449012088e-6, 1.052465045871579e-3]`, while the source normal remains
strictly positive at `[1.042337015820023, 1.050763472135781]`.

The lower-side uncertainty falls by about `93%`, but the monotone root image is
still about `1%` wider than the fixed `1e-3` root-time ceiling. MPFR again
exhausts 512 bits and does not advance with `interior_root_not_surrounded`.
Interactive seed 0 reaches the identical accepted solver time and terminal
row under allocation hash
`11f005592d4636dec0cec8a062ce95ac7ab84bf51da36961fefcffa74705d33f`.
Research retains hash
`9fb413d991d7bc31457af7c062f32a3cacef94b6830a1cc8beb59227c9911b36`.

The complete post-change matrix is:

| Preset | Seed | Accepted solver time | Native wall seconds | Terminal row |
| --- | ---: | ---: | ---: | --- |
| Research | 0 | `6.350099999999999` | `4.41` | `root_completeness_not_certified` |
| Research | 1 | `8.602148437500002` | `7.910873` | `root_completeness_not_certified` |
| Research | 2 | `11.350000000000003` | `44.9668076` | `caustic_eta_convergence_failed` |
| Research | 3 | `4.952794257140315` | `8.885881` | `root_completeness_not_certified` |
| Interactive | 0 | `6.350099999999999` | `4.467396` | `root_completeness_not_certified` |
| Interactive | 1 | `8.602148437500004` | `6.5809713` | `root_completeness_not_certified` |
| Interactive | 2 | `11.475100000000001` | `39.5314804` | `root_completeness_not_certified` |
| Interactive | 3 | `4.9530296875` | `4.949256` | `root_completeness_not_certified` |

No row survives 600 wall seconds. Seven stop on root completeness and Research
seed 2 stops on the unchanged finite-width regulator route.

Claim grade: `measured-current-binary`. Falsifier: any unchanged-hash row
survives or completes 600 wall seconds, or a terminal mechanism moves outside
deterministic representation on an exact rebuilt replay.

## Remedy Ablations

All experimental changes in this section were removed after measurement.

| Candidate | Research seed-0 result | Adjudication |
| --- | --- | --- |
| Eight internal publication substeps | halted at `T=6.320217`, about `13.55` native seconds | more interval wrapping |
| Two-half publication | halted at `T=6.17734375`, about `2.22` native seconds | coarser path also worse |
| Existing synchronized multirate publication | halted at `T=6.09453125`, about `3.16` native seconds | fewer stored segments do not remove state-width growth |
| Two-half/four-quarter enclosure intersection | unchanged first terminal row | four-quarter enclosure already controls the relevant components |
| Full-step/four-quarter enclosure intersection | halted at `T=6.1549828125` | full-step enclosure is wider on the encounter |
| Direct interval solve of the receiver-velocity affine form | same terminal time; endpoint velocity radius grew from about `1.64e-3` to `1.82e-3` | unpreconditioned interval elimination adds dependency width |

These controls rule out publication count, retained segment count, embedded
path intersection, and an unpreconditioned affine solve as sufficient remedies.
They do not rule out a certified preconditioned joint-state method such as a
Krawczyk-style contraction, QR/Lohner representation, or another theorem-backed
cross-path enclosure that retains dependencies through the coupled update.

Claim grade: `measured-current-binary` for each ablation and
`inferred-adjudication` for the surviving architecture target. Falsifier: a
replay of a listed candidate under the same hashes and host contract reaches a
later certified prefix without weakening a named gate.

## Remaining Closure Object

Single-history temporal correlation is no longer the first missing object. The
terminal receiver and source are different paths, and the remaining residual
width comes from projecting their coupled endpoint state as independent boxes.
The next implementation must therefore carry a certified cross-path joint
state through the corrector, or use a separately validated preconditioned
integrator whose inclusion test contracts that joint state. A candidate is not
accepted merely because its midpoint settles; its interval inclusion theorem,
complete root recertification, and all existing rejection rows must pass.

No reader-facing theory claim is promoted by this packet.

## Validation And Reproduction

```text
cmake --build .tmp/eom-native-dev --target eom_borg_shadow_cli -j 4
ctest --test-dir .tmp/eom-native-dev --output-on-failure
PYTHONPATH=. ../.venv/bin/python tests/test_eom_native_history_layer.py
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=research-certified-v1 --seed=0 --chunks=100 --history-depth=1.01 --root-details=false --history-error-series=false
node scripts/eom/profile-borg-incremental-chunks.mjs .tmp/eom-native-dev/eom_borg_shadow_cli --certified-budget-id=interactive-certified-v1 --seed=0 --chunks=100 --history-depth=1.01 --root-details=false --history-error-series=false
```
