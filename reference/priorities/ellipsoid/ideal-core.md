# Ideal Core App Design Brief

This is the design brief for a controllable web app that presents a Noether core as a dynamic system of architrino paths and uses those paths to inspect emitted potential fields.

## Design Thesis

The app is a technical instrument, not a decorative animation. Its first job is to make the relative path behavior of the Noether core legible from one screen while leaving enough room for controls, graphs, tables, and model-state readouts.

The visual center is one reserved central spherical area. The camera does not orbit the scene. There is only one camera view, and it is straight on. When the user changes orientation, the sphere contents rotate inside that fixed view.

The Noether core should read as moving architrino paths rather than as a solid body, fixed envelope, or enclosing volume. The same central spherical area also supports spherical test-surface field inspection so path behavior and field behavior remain visually connected.

## First-Pass Scope

The first pass should support:

- one central spherical area with rotatable sphere contents,
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

The first-pass UI is organized around one central spherical area and four surrounding corner zones. The central area owns the live Noether core and spherical test-surface field view. The corners own controls, graphs, the binary table, and the reserved equation zone so the center remains open.

### Central Spherical Area

- In 2D, the central spherical area should read as a large reserved circle for the core path view and spherical test-surface field view.
- Size the central spherical area for clear inspection rather than maximum footprint: preserve enough room for the four corner zones.
- Keep the displayed path system large enough for relative trajectories to remain legible from the default screen composition.
- Keep larger analytical surfaces outside the central spherical area.
- Do not fragment the page into nested interior frames.

### Upper-Left Corner: Graph Zone

- Use the upper-left corner as the default home for graph panels.
- Treat graphs as deliberate analytical surfaces, not as places to dump every available variable at once.

### Upper-Right Corner: Control Panel Zone

- Use the upper-right corner as the default home for the main control panel.
- Include controls for path visibility, spherical test-surface visibility, test-point visibility, and test-surface radius.
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
- The default first-pass rows should include path radius or scale, path frequency, architrino velocity, and phase.
- Use compact scientific notation for dense quantitative comparison.
- Do not present the current binary radii as if they determine an enclosing volume.
- Use the table to compare binary-level path behavior against scale state.
- Keep the table tight and technical, but still readable enough that rows can be scanned without degrading into a dense diagnostic wall.

## Analytical Workflows

### Path Inspection

- Animate the binary paths and the architrinos continuously.
- Normalize the displayed motion as needed so the central visual emphasizes relative path behavior and scale rather than only six architrinos moving at raw literal speeds.
- Use path-first terminology for overlays and readouts: architrino paths, relative paths, path radius or scale, phase, and frequency.

### Spherical Test-Surface Field Inspection

- Treat the potential-field view as a primary analytical surface alongside the core view and the binary table.
- Use one spherical test surface at selectable radius as the primary field-inspection surface.
- Show potential-field values on that surface with a colored logarithmic scale so weak and strong structure can be seen together.
- Allow isolated inner-binary, middle-binary, and outer-binary contributions as well as their superposition.
- Treat evolving potential patterns as part of the method for discovering or validating formulas relating frequency, radius, velocity, and resulting field structure.

### Freeze And Resume

- Provide a clear pause or freeze control so the user can stop the live instrument for close inspection.
- Make the paused state explicit in the UI so the user always knows whether the surface is live or frozen.
- In the frozen state, hold the model state, graphs, and table values fixed together so the full instrument remains internally consistent during inspection.
- Keep sphere contents rotation, panel interaction, and other local inspection behavior available while the model state is frozen.

## Interaction Model

The interaction model has one fixed rule: the camera is straight on. Rotation controls rotate the sphere contents, not the camera.

- Keep exact binary radius, frequency, velocity, orientation, and other quantitative inputs in dedicated controls rather than assigning them to single-key shortcuts.

### Keyboard Shortcuts

- Scene-level shortcuts shall be active only when an element in the spherical viewing stage has focus.
- Scene-level shortcuts shall be inactive while a text input, numeric input, textarea, select control, or other editable field has focus.
- The first-pass single-key shortcut pool shall be limited to keys common to macOS, Windows, and Linux: arrow keys, `Space`, `Escape`, `Q`, `E`, and `R`.
- `Tab` and `Shift+Tab` shall remain reserved for focus navigation.
- The first-pass core shortcut set shall not use function keys, `Home`, `End`, `PageUp`, or `PageDown`.
- The first-pass core shortcut set shall not use browser-reserved or system-reserved combinations.
- Keyboard rotation shortcuts shall rotate the sphere contents only.
- Binary path-frame orientation shall be set through dedicated controls rather than through sphere contents rotation shortcuts.
- When the spherical viewing stage has focus, the arrow keys shall turn or tilt the sphere contents within the central view.
- `ArrowLeft` and `ArrowRight` shall turn the sphere contents left or right.
- `ArrowUp` and `ArrowDown` shall tilt the sphere contents upward or downward.
- `Q` and `E` shall rotate the sphere contents counterclockwise or clockwise in the screen plane.
- `R` shall reset the sphere contents to the default orientation.
- `Space` shall freeze or resume the live instrument surface.
- `Escape` shall close transient overlays and return focus to the spherical viewing stage.

## Readout Standard

- Every important readout should be readable at normal desktop viewing distance without zooming or hunting.
- Show reasoning-critical values directly as text, with one supporting cue such as a unit label or compact status mark.
- Prefer clear numeric values, short labels, high contrast, and restrained trend indicators; avoid tiny data walls, low-value diagnostic clutter, and decorative complexity that competes with the central core.

## Runtime Contract

- Keep Python as the canonical source for core state, path calculations, field calculations, derived measures, and quantitative outputs.
- Keep JavaScript responsible for rendering, interaction, layout, camera setup, sphere contents rotation, panel behavior, and client-side inspection.
- Keep the model boundary clean: JavaScript should display and manipulate Python-produced state rather than re-implementing the core calculations independently.
- Reuse the animator visual language from the JavaScript side where it helps, but keep the architrino path logic owned by the Python model.

## Implementation Starting Point

- Start from the existing animator visualization and reuse its path-rendering language where it fits the first-pass core view.
- In parallel, define the Python core model that supplies the canonical state and derived measures for the UI.
- Extend the combined system toward architrino paths, layer controls, and meter readouts in that order.

## Appendix: Circular-Orbit Potential Math

The reduced first target assumes three circular binary paths, giving six architrinos total. For each binary $b$, choose a fixed center $\mathbf{C}_b$, path radius $a_b$, angular frequency $\omega_b$, and orthonormal orbit-plane basis vectors $\mathbf{u}_b$ and $\mathbf{v}_b$:

$$
\mathbf{u}_b\cdot\mathbf{v}_b=0,\qquad \left\|\mathbf{u}_b\right\|=\left\|\mathbf{v}_b\right\|=1
$$

For architrino $i$ in binary $b(i)$, the phase at emission is:

$$
\theta_i(t_i^e)=\omega_{b(i)}t_i^e+\phi_i
$$

where $t_i^e$ is the emission time and $\phi_i$ is the architrino's phase offset. The two architrinos in one binary can be represented by phase offsets separated by $\pi$.

The emitted position is:

$$
\mathbf{s}_i(t_i^e)=\mathbf{C}_{b(i)}+a_{b(i)}\left(\mathbf{u}_{b(i)}\cos\theta_i+\mathbf{v}_{b(i)}\sin\theta_i\right)
$$

For a field sample point $\mathbf{x}=(x,y,z)$ at observation time $t$, let $\tau_i$ be the flight time of the arriving emission from architrino $i$. Then:

$$
t_i^e=t-\tau_i
$$

The source-to-sample displacement, distance, and direction are:

$$
\mathbf{R}_i(\mathbf{x},t)=\mathbf{x}-\mathbf{s}_i(t-\tau_i)
$$

$$
R_i(\mathbf{x},t)=\left\|\mathbf{R}_i(\mathbf{x},t)\right\|
$$

$$
\mathbf{n}_i(\mathbf{x},t)=\frac{\mathbf{R}_i(\mathbf{x},t)}{R_i(\mathbf{x},t)}
$$

If $\tau_i$ is already known, the first-pass inverse-distance scalar potential from architrino $i$ is closed form:

$$
\Phi_i^{(0)}(\mathbf{x},t)=\frac{Kq_i}{R_i(\mathbf{x},t)}
$$

Here $K$ is the model's potential normalization and $q_i$ is the signed or weighted source strength assigned to that architrino. If the supplied flight time is consistent with field propagation speed $c_f$, then $R_i=c_f\tau_i$, so the same expression can also be written as:

$$
\Phi_i^{(0)}(\mathbf{x},t)=\frac{Kq_i}{c_f\tau_i}
$$

If the model later chooses a moving-source causal normalization, the architrino velocity at emission is also closed form:

$$
\dot{\mathbf{s}}_i(t_i^e)=a_{b(i)}\omega_{b(i)}\left(-\mathbf{u}_{b(i)}\sin\theta_i+\mathbf{v}_{b(i)}\cos\theta_i\right)
$$

That gives the optional causal denominator:

$$
\kappa_i(\mathbf{x},t)=1-\frac{\mathbf{n}_i(\mathbf{x},t)\cdot\dot{\mathbf{s}}_i(t_i^e)}{c_f}
$$

and the corresponding scalar potential:

$$
\Phi_i(\mathbf{x},t)=\frac{Kq_i}{R_i(\mathbf{x},t)\kappa_i(\mathbf{x},t)}
$$

The hard part is not evaluating $\Phi_i$ after $\tau_i$ is known. The hard part is finding $\tau_i$ from the causal flight-time condition:

$$
\tau_i=\frac{\left\|\mathbf{x}-\mathbf{s}_i(t-\tau_i)\right\|}{c_f}
$$

That equation generally requires a numerical solve even for circular paths. Once the six flight times are available, however, the displayed superposition is a simple scalar sum over the six arriving emissions. Let $\Phi_i$ denote the selected per-architrino potential term; for the first-pass inverse-distance model, use $\Phi_i=\Phi_i^{(0)}$.

$$
\Phi_{\mathrm{total}}(\mathbf{x},t)=\sum_{i=1}^{6}\Phi_i(\mathbf{x},t)
$$

The isolated binary contributions are the corresponding two-term sums:

$$
\Phi_b(\mathbf{x},t)=\sum_{i\in b}\Phi_i(\mathbf{x},t)
$$

The UI can therefore expose inner-binary, middle-binary, outer-binary, and full-superposition field views. When one binary is selected for display, the field view shows that binary's two arriving emissions summed together; when full superposition is selected, it shows the six-term total.

## Future Considerations And Open Questions

- Determine how any effective exclusion volume implied by the path system should be implemented, including boundary geometry, time evolution, velocity dependence, and whether current binary radii affect that inferred volume.
- Decide when to populate the lower-left reserved equation zone with geometric formula panels and compact formula references.
- Decide when to add reference-frame overlays once their displayed quantities and reference directions are defined.
- Decide when sphere contents orientation presets should be added after the relevant reference directions are defined.
- Decide when to add graph selection beyond a default graph view.
- Decide when to add fluctuation traces, field-evolution graphs, and selected test-point logarithmic charts.
- Decide when to allow custom binary-table rows and deferred rows such as energy level and scale-factor-adjusted path frequency.
- Decide when to add human-scale, event-horizon, or other scale-reference presets beyond a fixed first-pass reference.
- Decide when to add preset and manual test-point layouts beyond a single default test-point layout.
- Decide when coherent single-step advancement, `$N*h$` energy stepping, and velocity-scale stepping should become first-class inspection controls, including exact ladder semantics.
- Decide when side-band summary readout zones should be added around the four-corner layout.
- Define how group velocity should be calculated, displayed, and used in reference-frame overlays and readouts.
- Determine whether normalized relative path behavior relative to group velocity remains elliptical-like, and how any deformation away from that family should be represented.
- Decide whether deviations from elliptical-like relative paths should become first-class analytical data or remain a later modeling note.
- Determine whether a clean geometric route to the Lorentz beta factor emerges from normalized path behavior or generated field structure.
- Treat low and moderate group velocity as a possible regime where normalized relative paths may remain close to a baseline path family, but do not hard-code that behavior as settled law.
- Decide how standard velocity mode ends near field speed, whether velocity controls need a logarithmic or repeating-nines ladder near that boundary, and how above-threshold behavior should be presented as a distinct path-behavior domain.
- Treat path precession as a future line of inquiry once its reference frame and control model are defined.
- Investigate which path radii change on each `h` exchange, and by how much.
- Determine whether there is a clean constitutive relation between outer-binary frequency, outer path radius, and translation velocity.
- Decide whether middle and inner binary frequency changes should be shown directly or only implied through changing relative path behavior.
- Decide the exact Python-to-JavaScript runtime architecture, including local-process execution, request/snapshot updates, push-style streaming, and freeze behavior.
- Expand keyboard shortcuts beyond core orientation and playback controls, including field-contribution selection, test-surface radius changes, overlay toggles, test-point visibility, and keyboard-help shortcuts.
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
