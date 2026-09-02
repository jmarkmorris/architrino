# Animator prescribed-scene handoff v1

`animator-prescribed-scene-handoff.v1` is the canonical one-way document boundary from Animator to Borg.

Animator remains the authoring and playback authority. Publication normalizes the current `0.1.0` Animator scene document, rejects solver-derived or mixed motion, expands the authored assembly/member motion into an `assembly-view-record.v0`, validates that exact record through Borg's existing record adapter, and seals both the normalized source document and emitted record with SHA-256 identities.

Borg receives the handoff through a one-shot `postMessage` structured clone. It validates the record hash and identity again, retains no link to Animator, and replays only the received copy. The record declares `motionAuthority: authored-prescribed`, `claimGrade: chart-hypothesis`, `evidenceStatus: display-only`, `physicsInvoked: false`, and `recordOnlyReplay: true`. Borg therefore disables the action that could seed a new EOM run from this record.

Publication fails closed when the scene schema is unsupported, timing is invalid, an assembly or path reference is missing, a replay member lacks explicit electrino/positrino identity, an authored motion type is unsupported, or any solver-derived/mixed motion is present. Borg also rejects altered hashes, mismatched identity fields, missing record-only declarations, and any authority upgrade.

Plainly: Animator creates and previews the intended motion. Borg receives a checked, frozen copy and can only replay it; neither application shares mutable runtime state, and the copy never becomes EOM-evolved evidence.
