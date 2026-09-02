# Animator Recorded EOM Playback

This detailed priority file records Animator's boundary with the EOM solver. Animator remains the 3-D authoring, staging, camera, timeline, path, save, and playback application. It is not an EOM run surface and contains no production solver.

## Direction

The C++20 EOM solver under `src/eom` is the single production computation authority. Borg initiates supported runs and inspects live or recorded run state. Animator accepts completed recorded EOM output and turns the record's retained histories into display frames, trails, field shells, delayed-hit views, and timeline playback.

The Animator worker performs record admission, recorded cubic-history evaluation, and typed-frame packaging only. It has no integrator, Master EOM evaluation, causal-root search, or acceptance logic. JavaScript reference, fixture, and comparison code must remain outside the production solve path.

## Accepted Handoff

Animator accepts `eom-recorded-playback-handoff.v1`. The envelope carries:

- the exact `eom_evolution_contract/v0` record;
- a canonical JSON SHA-256 pin for that record;
- `master_eom_binding/v1`;
- the `eom-solver` engine identity and concrete engine version;
- a concrete run identity and claim grade;
- an accepted evidence status; and
- completed run status.

Admission fails closed. Animator rejects altered or stale record pins, mismatched envelope and record identities, foreign contract or model versions, non-EOM engines, failed claims, unaccepted evidence statuses, and unfinished records.

## Motion Sources

Animator distinguishes two visible sources:

- **Recorded EOM motion:** positions, velocities, field shells, and delayed hits read from an accepted recorded handoff.
- **Authored motion:** paths used for explanatory staging, camera work, and non-certifying visual scenes.

Authored paths never become EOM output. Recorded output keeps its engine, run, contract, model, evidence, status, and record-hash provenance in the Animator document.

## Interface Boundary

Animator exposes a recorded-output chooser and playback diagnostics. It does not expose EOM timestep, causal-root, particle, field-speed, integration, or run controls. Users start or inspect EOM runs in Borg, then load the accepted recorded handoff into Animator.

Offline and high-precision execution belongs to the EOM solver and Borg workflow. Animator may cache accepted playback datasets derived from a pinned record, but a cache cannot upgrade the record's authority or replace the handoff check.

## Completed Work

1. Recorded EOM histories drive Animator playback without changing authored-path behavior.
2. Recorded and authored motion remain independently visible.
3. Planar and 3-D playback, trails, field shells, delayed hits, and diagnostics consume recorded data.
4. The Animator application surface contains no JavaScript solve controls or production-solver bridge.
5. Focused tests cover accepted playback plus stale, altered, unfinished, and incompatible handoffs.

## Non-Goals

- Do not run or continue the EOM solver from Animator.
- Do not treat display interpolation as EOM evolution.
- Do not let authored paths or JavaScript comparison code supply production results.
- Do not accept raw, unpinned records as accepted recorded output.

## Related Priorities

- [simulation protocol routing index](../../../op/simulation-protocol-routing-index.md)
- [app-animator](priorities.md)

## Related AAA Notes

- [run-protocols](../../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [architrino](../../../../content/markdown/aaa/validation/simulations/architrino.md)
- [about-the-webapp](../../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../../learning-office/design/scene-taxonomy.md)
