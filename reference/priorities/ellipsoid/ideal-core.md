# Ideal Core App Design Brief

This is the design brief for a controllable web app that presents a Noether core as a dynamic system of architrino paths and uses those paths to inspect emitted potential fields.

## Design Thesis

The app is a technical instrument, not a decorative animation. Its first job is to make the relative path behavior of the Noether core legible from one screen while leaving enough room for quantitative readouts, controls, graphs, formulas, and model-state inspection.

The visual center is one reserved central spherical area. The camera does not orbit the scene. There is only one camera view, and it is straight on. When the user changes orientation, the sphere contents rotate inside that fixed view.

The Noether core should read as moving architrino paths rather than as a solid body, fixed envelope, or enclosing volume. The same central spherical area also supports spherical test-surface field inspection so path behavior and field behavior remain visually connected.

## First-Pass Scope

The first pass should support:

- one straight-on central spherical area with rotatable sphere contents,
- animated architrino paths for the inner binary, middle binary, and outer binary,
- direct specification of per-binary path parameters,
- selectable spherical test-surface field inspection,
- isolated inner-binary, middle-binary, and outer-binary field contributions plus their superposition,
- readouts for path scale, binary path behavior, and scale factors,
- a detailed binary-measures table,
- freeze and resume controls,
- and a clean split between Python-owned model state and JavaScript-owned presentation.

Deferred topics are listed in `Future Considerations And Open Questions`.

## UI Elements

The first-pass UI is organized around one central spherical area and four surrounding corner zones. The central area owns the live Noether core and spherical test-surface field view. The corners own the larger controls, tables, graphs, and formulas so the center remains open.

### Central Spherical Area

- In 2D, the central spherical area should read as a large reserved circle for the core path view and spherical test-surface field view.
- Size the central spherical area for clear inspection rather than maximum footprint: preserve enough room for the four corner zones.
- Use one straight-on camera view of the central spherical area; rotate the sphere contents inside that fixed view instead of rotating the camera.
- Keep the displayed path system large enough for relative trajectories to remain legible from the default screen composition.
- Render the Noether core as moving architrino paths rather than as a solid body or fixed envelope.
- Support spherical test-surface field inspection at selectable radius, with field values and test points visible inside the same central area.
- Keep larger analytical surfaces outside the central spherical area.
- Do not fragment the page into nested interior frames.

### Upper-Left Corner: Graph Zone

- Use the upper-left corner as the default home for graph panels and trace views.
- Show fluctuation traces and field-evolution graphs for the spherical test-surface workflow.
- Treat graphs as deliberate analytical surfaces, not as places to dump every available variable at once.

### Upper-Right Corner: Control Panel Zone

- Use the upper-right corner as the default home for the main control panel.
- Include controls for sphere contents orientation presets, path visibility, spherical test-surface visibility, and test-point visibility.
- Include field-inspection controls for test-surface radius.
- Allow direct specification of the key path parameters for each binary.
- Allow direct specification of each binary path frame's orientation.
- Keep frequently used display controls in one place so the user does not have to hunt across the page to reconfigure the instrument.
- Make it easy to return to a clean default arrangement after exploratory changes.

### Lower-Left Corner: Reserved Equation Zone

- Reserve the lower-left corner as a future-use zone for formula surfaces.
- Keep the reserved area visually compatible with the graph and table zones without requiring populated formulas in the first pass.

### Lower-Right Corner: Technical Table Zone

- Use the lower-right corner as the default home for the detailed binary-measures table.
- Use one detailed quantitative table for side-by-side comparison of the inner binary, middle binary, and outer binary.
- The default column order should be: measure, inner binary, middle binary, outer binary.
- The default first-pass rows should include path radius or scale, path frequency, architrino velocity, phase, and energy level.
- Show per-binary path frequency after scale-factor application.
- Use compact scientific notation for dense quantitative comparison.
- Do not present the current binary radii as if they determine an enclosing volume.
- Keep the table tight and technical, but still readable enough that rows can be scanned without degrading into a dense diagnostic wall.

## Analytical Workflows

### Path Inspection

- Animate the binary paths and the architrinos continuously.
- Normalize the displayed motion as needed so the central visual emphasizes relative path behavior and scale rather than only six architrinos moving at raw literal speeds.
- Use path-first terminology for overlays and readouts: architrino paths, relative paths, path radius or scale, phase, and frequency.

### Spherical Test-Surface Field Inspection

- Treat the potential-field view as a primary analytical surface alongside the core view and the binary table.
- Use one or more spherical test surfaces at selectable radius as the primary field-inspection surface.
- Show potential-field values on those surfaces with a colored logarithmic scale so weak and strong structure can be seen together.
- Allow isolated inner-binary, middle-binary, and outer-binary contributions as well as their superposition.
- Show selected test-point traces as logarithmic charts so frequencies from all three binaries can be picked up from the local signal over time.
- Treat evolving potential patterns as part of the method for discovering or validating formulas relating frequency, radius, velocity, and resulting field structure.

### Binary Comparison

- At this stage of the app, the velocity, frequency, radius, and orientation of each binary path frame must be explicitly specifiable.
- The displayed core state should be defined by the architrino paths and emitted fields, not by a solid enclosing body.
- Use the binary table and adjacent assembly-level readouts to compare binary-level path behavior against scale state.
- The relation between outer-binary frequency, path radius, and translation velocity is still open and should be presented as a live modeling target, not as settled law.

### Freeze And Resume

- Provide a clear pause or freeze control so the user can stop the live instrument for close inspection.
- Make the paused state explicit in the UI so the user always knows whether the surface is live or frozen.
- In the frozen state, hold the model state, graphs, and table values fixed together so the full instrument remains internally consistent during inspection.
- Keep sphere contents rotation, panel interaction, and other local inspection behavior available while the model state is frozen.

## Interaction Model

The interaction model has one fixed rule: the camera is straight on. Rotation controls rotate the sphere contents, not the camera.

- Provide sphere contents orientation presets once the relevant reference directions are defined.
- Keep exact binary radius, frequency, velocity, orientation, and other quantitative inputs in dedicated controls rather than assigning them to single-key shortcuts.

### Keyboard Shortcuts

- Scene-level shortcuts shall be active only when an element in the spherical viewing stage has focus.
- Scene-level shortcuts shall be inactive while a text input, numeric input, textarea, select control, or other editable field has focus.
- The first-pass single-key shortcut pool shall be limited to keys common to macOS, Windows, and Linux: arrow keys, `Space`, `Escape`, `Q`, `E`, and `R`.
- `Tab` and `Shift+Tab` shall remain reserved for focus navigation.
- The first-pass core shortcut set shall not use function keys, `Home`, `End`, `PageUp`, or `PageDown`.
- The first-pass core shortcut set shall not use browser-reserved or system-reserved combinations.
- The keyboard shortcut layer shall operate within the one straight-on camera view of the layered core, binary paths, and field surfaces.
- Keyboard rotation shortcuts shall rotate the sphere contents only.
- Binary path-frame orientation shall be set through dedicated controls rather than through sphere contents rotation shortcuts.
- The spherical test surface shall share the sphere contents rotation model; its first-pass controls shall be radius, field visibility, and test-point visibility.
- When the spherical viewing stage has focus, the arrow keys shall turn or tilt the sphere contents within the straight-on view.
- `ArrowLeft` and `ArrowRight` shall turn the sphere contents left or right.
- `ArrowUp` and `ArrowDown` shall tilt the sphere contents upward or downward.
- `Q` and `E` shall rotate the sphere contents counterclockwise or clockwise in the screen plane.
- `R` shall reset the sphere contents to the default orientation.
- `Space` shall freeze or resume the live instrument surface.
- `Escape` shall close transient overlays and return focus to the spherical viewing stage.

## Readout Standard

- Every important readout should be easy to read at normal desktop viewing distance without zooming or hunting.
- Prefer one strong value plus one supporting cue, such as a unit label or a compact status mark.
- Avoid tiny monochrome data walls, low-value diagnostic clutter, and decorative complexity that competes with the central core.
- Use larger, calmer, higher-contrast readouts for primary quantities and keep secondary trend summaries compact.
- When a value matters for reasoning, show it directly as text rather than forcing the user to infer it from a gauge alone.
- Treat surrounding instrumentation as part of the core-reading workflow, not as secondary decoration.
- Prefer clear numeric values, short labels, and restrained trend indicators over dense control-room blocks.

## Runtime Contract

- Implement the main core model in Python.
- Use Python for the core state, path calculations, field calculations, derived measures, and the quantitative data that feeds the readouts, graphs, and tables.
- Run that Python model as a live local process so the dynamic UI can request updated state during interaction.
- Treat the Python side as the canonical source for the detailed binary table values and other derived quantitative outputs.
- Treat the Python side as the canonical source for the specified per-binary path parameters and the resulting potential-field evolution.
- Implement the visualization layer in JavaScript.
- Use JavaScript for rendering, interaction, layout, straight-on camera setup, sphere contents orientation behavior, panel behavior, and other browser-native visual work.
- Keep the model boundary clean: JavaScript should display and manipulate the Python-produced state rather than re-implementing the core calculations independently.
- Reuse the animator visual language from the JavaScript side where it helps, but keep the architrino path logic owned by the Python model.
- Have the JavaScript UI talk to the live local Python process for state snapshots and other dynamic updates rather than relying on precomputed files.
- Treat the UI as an instrument surface driven by state from the Python model.
- Allow the user to pause or freeze the live surface for inspection without abandoning the live-process architecture.
- When frozen, suspend incoming model updates to the readouts, graphs, and binary table together, while preserving local client-side inspection controls.

## Implementation Starting Point

- Start from the existing animator visualization and adapt its camera behavior to a single straight-on camera with rotatable sphere contents rather than inventing a separate rendering language for the first pass.
- In parallel, define the Python core model that supplies the canonical state and derived measures for the UI.
- Extend the combined system toward architrino paths, layer controls, and meter readouts in that order.

## Future Considerations And Open Questions

- Determine how any effective exclusion volume implied by the path system should be implemented, including boundary geometry, time evolution, and velocity dependence.
- Decide how and when the app should show the geometric formulas that govern the displayed state.
- Decide when to populate the lower-left reserved equation zone with rendered formula panels and compact formula references.
- Keep energy-scale and velocity-scale changes as likely high-value inspection paths while the exact stepping semantics remain open.
- Decide when to add reference-frame overlays once their displayed quantities and reference directions are defined.
- Decide when to add graph selection beyond a default graph view.
- Decide when to allow the user to choose which rows appear in the detailed binary-measures table.
- Decide when to add human-scale, event-horizon, or other scale-reference presets beyond a fixed first-pass reference.
- Decide when to add preset test-point layouts beyond a single default test-point layout.
- Decide when to add coherent single-step advancement from the frozen state.
- Decide when velocity-scale stepping should join or replace simpler first-pass stepping.
- Decide when side-band summary readout zones should be added around the four-corner layout.
- Define how group velocity should be calculated, displayed, and used in reference-frame overlays and readouts.
- Determine whether normalized relative path behavior relative to group velocity remains elliptical-like, and how any deformation away from that family should be represented.
- Decide whether deviations from elliptical-like relative paths should become first-class analytical data or remain a later modeling note.
- Determine whether a clean geometric route to the Lorentz beta factor emerges from normalized path behavior or generated field structure.
- Treat low and moderate group velocity as a possible regime where normalized relative paths may remain close to a baseline path family, but do not hard-code that behavior as settled law.
- Treat the above-threshold regime as a distinct path-behavior domain rather than as an ordinary continuation of the sub-threshold path family.
- In that distinct path-behavior domain, prioritize visible path transformation first.
- Treat path precession as a future line of inquiry once its reference frame and control model are defined.
- Treat sphere edge visual language as a future consideration, not a first-pass layout requirement.
- Investigate which path radii change on each `h` exchange, and by how much.
- Determine whether the path system implies an effective exclusion volume, and if so how that inferred volume changes over time and velocity.
- Decide what exact ladders should govern `$N*h$` energy stepping and velocity-scale stepping.
- Decide whether velocity controls should approach the field-speed limit with a logarithmic ladder and repeating-nines resolution near that boundary.
- Decide where standard velocity mode ends relative to field speed and how above-threshold behavior should be presented.
- Determine whether there is a clean constitutive relation between outer-binary frequency, outer path radius, and translation velocity.
- Determine the correct behavior at or above the unresolved threshold regime.
- Decide whether middle and inner binary frequency changes should be shown directly or only implied through changing relative path behavior.
- Decide when to add manual test-point placement beyond the default test-point layout.
- Decide when to add summary-first disclosure where compact trend indicators expand into full graphs.
- Expand keyboard shortcuts beyond core orientation and playback controls, including field-contribution selection, test-surface radius changes, overlay toggles, test-point visibility, and keyboard-help shortcuts.
- Upgrade the Python-to-JavaScript state path from request/snapshot updates to push-style live streaming when the runtime needs it.
- Decide whether the first version should include the markdown reference panel or wait until the main core view is stable.

### Sphere Edge Visual Language

- Prefer polished, precise, tightly integrated instrumentation over bulky floating controls.
- Let the user feel that the circular edge is part of the core-reading instrument itself, not a separate overlay pasted on top.
- Treat the circular edge as an attachment zone for compact controls, compact readouts, and a few small meters that benefit from immediate spatial association with the core.
- Use the circular edge only for selected compact meter forms, such as radial ticks, short arc traces, and small complication-like readouts.
- Allow short sparkline-style arc sections to occupy small portions of the circular edge when they can summarize a changing quantity without pulling attention away from the core.
- Treat sparklines as summary instruments first: compact trend indicators that can expand into full graphs on demand.
- Treat edge elements like watch-complication instrumentation: compact, deliberate, and information-dense without becoming crowded.
- Keep each edge segment short enough that the center still reads first and the edge reads second.
- Favor a small number of high-value edge complications over filling the full circumference with constant activity.
- Keep edge readouts genuinely readable; precision should come from disciplined layout and typography, not from shrinking more information into the ring.
- Future edge-design question: which quantities deserve the limited circular-edge positions?
