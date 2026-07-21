# App Borg Brainstorming

This file preserves ideas and insights that are working toward promotion to an existing or new document or app.

## Routing Rules

- Keep loose ideas here until they have a concrete promotion target, claim level, and owner.
- Promote material into the control file only when it becomes a queue item, proof route, app task, or document/app destination.
- Keep speculative notes claim-limited and identify the existing or new document or app they may support.

## Ideas And Insights

### Prescribed-history display-simulation branch

- Operator intent: converge the prescribed-geometry workspace and simulation workspace into one Borg workbench rather than maintaining two page halves. Claim grade: operator direction; provisional architecture until its history and branch contracts are ratified. Promotion target: `assembly-viewer-requirements.md` and `requirements-and-design.md`.
- Proposed state flow: choose a source-defined geometry, inspect or play its sealed history, select a cut time, then explicitly create a new simulation branch with a new run id. The canvas, camera, layer strip, taxonomy, and timeline stay mounted; only the active source/branch state changes.
- A `Continue with display simulation` action should pass the record's exact retained segments over the required interval ending at the selected cut. It must not sample screen frames and reconstruct a different history. The handoff records the source record id, exact cut token, path and polarity mapping, interval coverage, interpolation/segment coefficients, and the simulation parameters that are not carried by the record.
- Because a `prescribed-geometry` chart is a display-only hypothesis rather than accepted EOM output, its branch starts directly in the EOM solver's existing display run grade and remains promotion-ineligible. It does not first claim certified authority and then downgrade. The source replay remains immutable; the new display simulation is a separate child branch, not an extension written back into the record.
- Implementation burden: add an exact record-segment-to-retained-history adapter; let `BorgEomShadowRunner` start explicitly in display grade with source provenance; add the branch boundary to the runtime state machine; and replace URL-mode bootstrapping with an in-page source/branch controller. No second dynamics engine or viewer-side evolution is permitted.
- Open contract inputs: the current spindle record does not carry every simulation parameter. The branch action must either bind an explicit simulator profile for field speed, coupling, core scale, envelope, and numerical controls or remain disabled with a named missing-input message.
