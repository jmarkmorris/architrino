# Ideal Core App Design Brief

This is the design for a controllable web app that presents a Noether core as a dynamic system of architrino paths and offers visualizations of the emitted potential fields.

## Purpose

The app should make the path geometry legible at a glance while leaving room for meters, controls for rotating the sphere contents, and modeling overlays. The page should avoid unnecessary jargon in both design and code. When a stable $\mathbb{A}\mathbb{A}\mathbb{A}$ term already exists, reuse it rather than inventing a new label.

## Primary Design Goal

- Use one reserved central spherical viewing stage for both the Noether core paths and spherical test-surface field inspection.
- Keep that stage visually dominant, but not so large that the surrounding analytical UI loses room.
- Render the Noether core as moving architrino paths, with relative path behavior as the primary visual read rather than a solid body or enclosing volume.
- Make path scale, group velocity, binary path behavior, and per-binary path parameters readable from one screen.
- Make the emitted potential field readable as isolated inner-binary, middle-binary, and outer-binary contributions and as their superposition.
- Treat ideal elliptical-like relative paths, normalized to group velocity, as a working hypothesis to inspect rather than as a settled geometry.
- Reuse the existing animator motion language as the starting point, then extend it from simple circular motion toward normalized path geometry.

## Central Spherical Stage

- In 2D, the central spherical viewing stage should read as a large reserved circle for the core path view and spherical test-surface field view.
- Size the stage for clear inspection rather than maximum footprint: preserve enough room for corner panels, side bands, and technical surfaces.
- Keep the displayed path system large enough for relative trajectories to remain legible from the default screen composition.
- Use one straight-on camera view of the spherical stage; rotate the sphere contents inside that fixed view instead of rotating the camera.
- Do not make the central view imply that the core is a solid body, fixed envelope, or predetermined velocity-compressed boundary.
- Do not fragment the page into nested interior frames.
- Keep main controls and larger analytical surfaces outside the stage.
- Design the outside-canvas UI as supporting instrumentation around the core rather than as competing windows.
- Preserve enough surrounding screen area for many simultaneous readouts, since the app is meant to support detailed inspection rather than a minimal toy view.

## Core Path Views And Interaction

- Allow the user to rotate the contents of the spherical stage while the camera remains straight on.
- Provide sphere contents orientation presets tied to the group-velocity direction and the net-angular-momentum direction once those quantities are defined.
- Allow the user to toggle reference-frame lines on and off.
- The app will support only one camera view, and that view is straight on.
- Animate the binary paths and the architrinos continuously.
- Normalize the displayed motion as needed so the central visual emphasizes relative path behavior, scale, and group velocity rather than only six architrinos whipping around at raw literal speeds.
- Support the spherical test-surface workflow defined below: selectable radius, visible field values, and test points for local potential or fluctuation behavior.

## Meters, Displays, And Readouts

- Treat the outer page as four primary corner zones around the stage, with optional secondary placement zones along the left and right sides.
- Show scale factors for radii, frequencies, and velocities as dedicated meters.
- Velocities will be shown relative to field speed v=c_f.
- Render scale factors in scientific notation as `$y.z \times 10^x$`.
- Let the settings panel choose what counts as the `1.0` reference scale, with at least a human-scale option and an event-horizon option.
- Show per-binary path frequency after scale-factor application.
- Provide a detailed binary-measures table for the inner binary, middle binary, and outer binary.
- Use four columns in that table: measure name, inner binary, middle binary, and outer binary.
- Use that table for repeated binary-level quantities such as path radius or scale, path frequency, architrino velocity, phase, and energy level.
- Render those table values in compact scientific notation so dense quantitative comparison remains readable.
- Show group velocity and net angular momentum as assembly-level readouts associated with the binary table, not as per-binary cell values.
- Do not present the current binary radii as if they determine an enclosing volume.
- Use the surrounding readouts, graphs, and table values to communicate changes in relative path behavior, group velocity, and net angular momentum.
- Add fluctuation traces and field-evolution graphs for the spherical test-surface workflow.
- Make room for multiple graph and equation panels outside the central stage.
- Treat the surrounding instrumentation as part of the core-reading workflow, not as secondary decoration.
- Prefer clear numeric values, short labels, and restrained trend indicators over dense control-room blocks.
- When a compact trend indicator is selected, open the corresponding full graph instead of forcing that graph to remain visible at all times.

## Readout Legibility Standard

- Every important readout should be easy to read at normal desktop viewing distance without zooming or hunting.
- Prefer one strong value plus one supporting cue, such as a unit label or a compact status mark.
- Avoid tiny monochrome data walls, low-value diagnostic clutter, and decorative complexity that competes with the central core.
- Use larger, calmer, higher-contrast readouts for primary quantities and keep secondary trend summaries compact.
- When a value matters for reasoning, show it directly as text rather than forcing the user to infer it from a gauge alone.
- Treat graphs and equation panels as deliberate analytical surfaces, not as places to dump every available variable at once.
- Prefer summary-first disclosure: show compact trend indicators by default, then reveal the full graph when the user clicks or otherwise selects that quantity.
- Keep the binary-measures table tight and technical, but still readable enough that rows can be scanned without the table degrading into a dense diagnostic wall.

## Control Panel Scope

- The first-pass control panel should cover the things a user is most likely to want to see differently from one moment to the next.
- That includes sphere contents orientation presets, reference-frame visibility, path visibility, spherical test-surface visibility, graph selection, equation-panel visibility, scale-reference selection, and test-point visibility.
- That includes field-inspection controls for test-surface radius and preset or manual test-point placement.
- That control surface should also allow direct specification of the key path parameters for each binary.
- That control surface should also allow direct specification of each binary path frame's orientation.
- That control surface should also let the user choose which rows appear in the detailed binary-measures table.
- Keep frequently used display controls in one place so the user does not have to hunt across the page to reconfigure the instrument.
- Make it easy to return to a clean default arrangement after exploratory changes.
- The default first-pass location for the main control panel should be the upper-right outer zone.

## Detailed Binary Table

- Use one detailed quantitative table for side-by-side comparison of the three binaries.
- The default column order should be: measure, inner binary, middle binary, outer binary.
- The default first-pass rows should include path radius or scale, path frequency, architrino velocity, phase, and energy level.
- Group velocity should appear adjacent to this table as an assembly-level quantity rather than being forced into the binary columns.
- Treat this table as a deliberate analytical surface similar to the denser technical portions of an instrument display, while still preserving row clarity and alignment.
- Keep this table outside the central spherical stage.
- The default first-pass location for this table should be the lower-right outer zone.

## Outer-Zone Composition

- Use the four corner regions outside the central spherical stage as the main homes for larger UI surfaces.
- Treat the upper-left corner as the default graph zone.
- Treat the upper-right corner as the default control-panel zone.
- Treat the lower-left corner as the default equation zone.
- Treat the lower-right corner as the default technical zone for the detailed binary table.
- Use the remaining corners for other stable high-value surfaces such as graphs, equation panels, or control groupings.
- Use the left and right side bands as persistent summary-readout zones.
- Let the upper-right control panel and lower-right binary table read as a coherent right-side instrument stack.
- Let the left side read as an analysis stack, with graphs above and equations below.
- Use the side bands for secondary quantities that should remain visible without competing with the four main corner panels.
- Use the left side band for always-visible summary readouts anchored by group velocity and net angular momentum.
- Use the right side band for current view and state summaries that support the control stack without duplicating the full control panel.
- Keep the corner layout balanced so no single zone overwhelms the central spherical viewing stage.

## Controls

- Provide a very efficient control panel for changing what the user sees.
- Use that control panel for fast visibility changes, view-mode changes, and graph or equation selection.
- Prefer direct toggles, segmented choices, and short labeled controls over deep nested menus.
- Keep the most frequently used controls visible at all times.
- Collapse secondary controls behind a clean disclosure pattern so advanced options remain available without cluttering the default view.
- Make state changes feel immediate; the control panel should behave like part of the instrument, not like a separate settings page.
- Make the inner-binary, middle-binary, and outer-binary path parameters directly specifiable from the control surface.
- At minimum, allow the user to specify the radius, frequency, velocity, and orientation inputs for each binary path frame.
- Provide a clear pause or freeze control so the user can stop the live instrument for close inspection.
- Make the paused state explicit in the UI so the user always knows whether the surface is live or frozen.
- In the frozen state, hold the streamed state, graphs, and table values fixed together so the full instrument remains internally consistent during inspection.
- Keep sphere contents rotation, panel interaction, and other local inspection behavior available while the streamed data is frozen.
- Provide a single-step control so the user can advance the frozen instrument in deliberate increments during close inspection.
- Make energy-level stepping and velocity-scale stepping the primary step families for inspection.
- Treat stepping through scales of `$N*h$` and scales of velocity as more important than raw time stepping.
- Include a way to choose the stepping family and adjust the step size within that family, while leaving the exact ladder definitions open until the model semantics are better defined.
- Add a velocity control that approaches the field-speed limit with a logarithmic ladder.
- Use repeating-nines resolution below the field-speed threshold so the UI can resolve the increasingly sharp changes near that boundary.
- End the standard velocity mode at the field-speed threshold.
- Treat any above-threshold behavior as a separate path-behavior mode with its own controls and presentation rather than as a blind continuation of the sub-threshold slider.
- In that above-threshold path-behavior mode, make changing path behavior the first-class visual subject.
- Keep path and reference-frame overlays optional so the default view remains readable.

## Keyboard Shortcuts

- The app shall provide a keyboard shortcut layer for inspection, navigation, and playback.
- The keyboard shortcut layer shall not serve as the main path for exact quantitative parameter entry.
- Scene-level shortcuts shall be active only when an element in the spherical viewing stage has focus.
- Scene-level shortcuts shall be inactive while a text input, numeric input, textarea, select control, or other editable field has focus.
- The first-pass single-key shortcut pool shall be limited to keys common to macOS, Windows, and Linux: arrow keys, `Space`, `Enter`, `Escape`, digits `0` through `9`, letters `A` through `Z`, `-`, and `=`.
- `Tab` and `Shift+Tab` shall remain reserved for focus navigation.
- The first-pass core shortcut set shall not use function keys, `Home`, `End`, `PageUp`, or `PageDown`.
- The first-pass core shortcut set shall not use browser-reserved or system-reserved combinations.
- The keyboard shortcut layer shall operate within the one straight-on camera view of the layered core, binary paths, and field surfaces.
- Keyboard rotation shortcuts shall rotate the sphere contents only.
- Binary path-frame orientation shall be set through dedicated controls rather than through sphere contents rotation shortcuts.
- The spherical test surface shall share the sphere contents rotation model; its first-pass controls shall be radius, field visibility, and test-point layout.
- When the spherical viewing stage has focus, the arrow keys shall turn or tilt the sphere contents within the straight-on view.
- `ArrowLeft` and `ArrowRight` shall turn the sphere contents left or right.
- `ArrowUp` and `ArrowDown` shall tilt the sphere contents upward or downward.
- `Q` and `E` shall rotate the sphere contents counterclockwise or clockwise in the screen plane.
- `R` shall reset the sphere contents to the default orientation.
- `Space` shall freeze or resume the live instrument surface.
- `Enter` shall advance the instrument by one coherent step while the surface is frozen.
- `0` shall select the superposed potential-field view.
- `1` shall select the inner-binary field contribution by itself.
- `2` shall select the middle-binary field contribution by itself.
- `3` shall select the outer-binary field contribution by itself.
- `-` shall decrease the spherical test-surface radius to `r/2`.
- `=` shall increase the spherical test-surface radius to `2r`.
- `X` shall toggle reference-frame visibility.
- `P` shall toggle spherical potential-surface visibility.
- `T` shall toggle test-point visibility.
- `H` shall open a compact keyboard-help overlay.
- `Escape` shall close transient overlays and return focus to the spherical viewing stage.
- Exact binary radius, frequency, velocity, orientation, and other quantitative inputs shall be edited only through dedicated parameter controls and shall not be assigned to first-pass single-key shortcuts.

## Path Geometry Content To Support

- The app should make the relative architrino paths understandable, not decorative.
- Show reference-frame lines when requested, including the group-velocity direction and net-angular-momentum direction when those quantities are available.
- Use path-first terminology for overlays and readouts: architrino paths, relative paths, group velocity, net angular momentum, path radius or scale, phase, and frequency.
- Do not use solid-body terminology as the controlling description of the core.
- If coordinate readouts are added, prefer plain-language labels first and only introduce more formal angle terms where they clearly help.
- Any displayed formulas should be rendered in KaTeX and should follow the project math rules.

## Model Relations To Expose

- At this stage of the app, the velocity, frequency, radius, and orientation of each binary path frame must be explicitly specifiable.
- The displayed core state should be defined by the architrino paths and emitted fields, not by a solid enclosing body.
- Ideal elliptical-like relative paths, after normalizing to group velocity, are hypotheses to inspect.
- The app should not assume that the relative paths are perfect ellipses, because the paths are expected to adjust continuously.
- Deviations from elliptical-like relative paths should be treated as meaningful data rather than as rendering errors.
- Any effective exclusion volume implied by the path system remains unresolved; its implementation, boundary geometry, time evolution, and velocity dependence are open modeling targets.
- The relation between outer-binary frequency, path radius, and translation velocity is still open and should be presented as a live modeling target, not as settled law.
- The app should eventually be able to show the geometric formulas that govern the displayed state.
- One explicit investigation target is whether a clean geometric route to the Lorentz beta factor emerges from the normalized path behavior or the generated field structure.
- The most analytically interesting inspection path is expected to come from changes in energy scale and velocity scale, not from watching unnormalized raw binary motion alone.
- The potential-field objective below is one method for discovering or validating formulas relating specified path states to observed 3D field patterns over time.
- Treat low and moderate group velocity as a regime where the normalized relative paths may remain close to their baseline path family, but do not hard-code that behavior as settled law.
- Treat the above-threshold regime as a distinct path-behavior domain rather than as an ordinary continuation of the sub-threshold path family.
- In that distinct path-behavior domain, prioritize visible path transformation first.

## Potential Field Objective

- Treat the potential-field view as a primary analytical surface alongside the core view and the binary table.
- Use one or more spherical test surfaces at selectable radius as the primary field-inspection surface.
- Show potential-field values on those surfaces with a colored logarithmic scale so weak and strong structure can be seen together.
- Allow isolated inner-binary, middle-binary, and outer-binary contributions as well as their superposition.
- Support preset test-point layouts as the default workflow, with manual test-point placement available for targeted inspection.
- Show selected test-point traces as logarithmic charts so frequencies from all three binaries can be picked up from the local signal over time.
- Treat evolving potential patterns as part of the method for discovering or validating formulas relating frequency, radius, velocity, and resulting field structure.

## Supporting Reference Content

- Keep a short path-geometry reference available either inline or in a companion markdown panel.
- That reference should cover normalized relative paths, group velocity, net angular momentum, and the unresolved status of any effective exclusion volume.
- Do not make an earlier solid-body approximation the controlling companion note for this app brief unless that approximation is explicitly reintroduced later as a labeled hypothesis.

## Runtime Architecture

- Implement the main core model in Python.
- Use Python for the core state, path calculations, field calculations, derived measures, and the quantitative data that feeds the readouts, graphs, and tables.
- Run that Python model as a live local process so the dynamic UI can request updated state during interaction.
- Implement the visualization layer in JavaScript.
- Use JavaScript for rendering, interaction, layout, straight-on camera setup, sphere contents orientation behavior, panel behavior, and other browser-native visual work.
- Keep the model boundary clean: JavaScript should display and manipulate the Python-produced state rather than re-implementing the core calculations independently.
- Treat the Python side as the canonical source for the detailed binary table values, group velocity, net angular momentum, and other derived quantitative outputs.
- Treat the Python side as the canonical source for the specified per-binary path parameters and the resulting potential-field evolution.
- Reuse the animator visual language from the JavaScript side where it helps, but keep the architrino path logic owned by the Python model.
- Have the JavaScript UI talk to the live local Python process for state snapshots and other dynamic updates rather than relying on precomputed files.
- Use a push-style live update path between Python and JavaScript rather than a poll-first design.
- Treat the UI as a continuously updating instrument surface driven by streamed state from the Python model.
- Allow the user to pause or freeze the streamed surface for inspection without abandoning the live-process architecture.
- When frozen, suspend incoming streamed state updates to the readouts, graphs, and binary table together, while preserving local client-side inspection controls.
- Support stepwise advancement from the frozen state so the Python model can emit the next coherent state increment on demand.
- Support stepwise advancement by energy-scale and velocity-scale changes as first-class streamed transitions from the Python model.

## Open Questions

- What exact ladders should govern `$N*h$` energy stepping and velocity-scale stepping?
- Is there a clean constitutive relation between outer-binary frequency, outer path radius, and translation velocity?
- What is the correct behavior at or above the unresolved threshold regime?
- Does the path system imply an effective exclusion volume, and if so how does that inferred volume change over time and velocity?
- Should the middle and inner binary frequency changes be shown directly, or only implied through changing relative path behavior?
- Should the first version include the markdown reference panel, or should that wait until the main core view is stable?

## Implementation Starting Point

- Start from the existing animator visualization and adapt its camera behavior to a single straight-on camera with rotatable sphere contents rather than inventing a separate rendering language for the first pass.
- In parallel, define the Python core model that supplies the canonical state and derived measures for the UI.
- Extend the combined system toward normalized architrino paths, reference-frame overlays, layer controls, and meter readouts in that order.

## Potential Future Features and Lines of Inquiry

- Treat path precession as a future line of inquiry once its reference frame and control model are defined.
- Investigate which path radii change on each `h` exchange, and by how much.
- Ability to calculate an effective exclusion volume.

## Sphere Edge Visual Language

- Treat sphere edge visual language as a future consideration, not a first-pass layout requirement.
- Use the circumference of a luxury watch as the reference metaphor for the circular edge; it should read like a crafted instrument rim, not like a crowded dashboard bezel.
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
