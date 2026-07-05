# App Ideas Brainstorming

This file preserves ideas and insights for new single-page animation apps that are working toward promotion to an existing or new document or app.

The idea bank favors app concepts that make the theory's native mechanisms visible: causal-delay interaction, path-history dependence, branch geometry, threshold crossing, Noether sea response, nested shell braid structure, observer-level coarse-graining, and ledger closure.

## Routing Rules

- Keep loose app concepts here until they have a concrete promotion target, claim level, and owner.
- Promote material into [priorities.md](priorities.md) only when it becomes a selected app packet, implementation task, or document/app destination.
- Keep app concepts candidate-level unless the underlying corpus already supplies a derivation.
- Identify the existing or new document or app each concept may support when that route is known.

## App Ideas

### 1. [Causal Delay Feedback Depth](../app-causal-delay-feedback/priorities.md)

- Status: `promoted`.
- The dedicated app packet owns the description, visualization, controls, diagnostics, and first-build requirements.
- Summary: one main canvas shows a moving source, Virtual Observer, retained causal-delay paths, arriving pulses, and a contribution stack so users can see how active path-history changes the present Virtual Observer readout.

### 2. [Assembly Configuration Explorer](../app-assembly-explorer/priorities.md)

- Status: `promoted`.
- The dedicated app packet owns the unquotiented three-binary dataset contract, comparison diagnostics, and solver-output adapter boundary.
- Summary: inspect candidate rows from the unordered Noether braid configuration space, preserve $S_3$-equivalent repeats, compare speed regimes and energy differentials, and prepare stable-sector and accessory-capture views without replacing solver authority.

### 3. [Equation Mapping App](../app-equation-mapping/priorities.md)

- Status: `promoted`.
- The dedicated app packet owns the static equation layer, explanatory overlay comments, formula-section pointer lines, collapsible subject index, search menu, home control, and background settings.
- Summary: compare existing physics equations with candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ mappings in a quiet annotation surface that supports centered equations, comment rectangles with equations, and thin lines pointing to exact formula sections.

### 4. Path-History Ledger

Description:

- Show that the current force or potential is not determined only by current positions.
- Let the user scrub time and see which old source path segments are causally active at the receiver.
- Make path-history feel like a live ledger: old data can be irrelevant, active, or decisive depending on the causal-root geometry.

Visualization:

- Split the canvas into a large spatial track on top and a horizontal path-history timeline below.
- Draw the source trail as a fading ribbon; active causal-root segments glow where old emissions reach the receiver now.
- Animate a `now` cursor sweeping across the receiver while small hit markers jump from the timeline to the spatial view.
- Keep inactive history gray, active history bright, and rejected roots dashed with an accept/reject label.
- Let selecting a row in the ledger table trace the corresponding source segment, causal path, and receiver contribution on the canvas.

Requirements:

- Show source history as a trail with active hit segments highlighted.
- Provide a time scrubber with `past emission`, `receiver now`, and `future inactive` regions.
- Display active roots with emission time, hit distance, source velocity, receiver direction, and contribution sign.
- Include a small table of retained path-history rows and allow selecting one row to highlight it in the animation.
- Support a simple two-body mode before adding many-source Noether sea background.

### 5. Self-Hit Near $c_f$

Description:

- Teach that self-hit behavior depends on causal-root geometry, not a simple speed label.
- Compare sub-$c_f$, exactly-$c_f$, and super-$c_f$ regimes using the same source path.
- Show why a same-source root can be absent, degenerate, unstable, or active depending on path curvature and transversality.

Visualization:

- Use a central path canvas with the source moving along a controllable line or curve.
- Draw expanding emission shells from earlier source positions and highlight shell intersections with the later source path.
- Show the three regimes as side-by-side mini panels or as selectable overlays using the same coordinate scale.
- Animate shell/path tangencies in slow motion so degenerate and accepted branches can be distinguished visually.
- Add a small Jacobian strip chart under the canvas that moves in sync with the selected root.

Requirements:

- Provide speed, curvature, and perturbation controls.
- Draw the source path and the candidate emission shells that may intersect later positions.
- Label each candidate as `no same-source root`, `degenerate tangent family`, `active branch`, or `failed Jacobian floor`.
- Plot $D_s=c_f-\mathbf v_s\cdot\mathbf n$ and $D_T=c_f-\mathbf v_r\cdot\mathbf n$ for selected roots without treating source-normal denominators as speed-only effects.
- Include a slow-motion mode around the threshold regime.

### 6. Branch Geometry Explorer

Description:

- Show that one source-receiver pair can have multiple delayed-hit branches.
- Let users toggle branches and see how the net potential changes.
- Make branch acceptance visible as geometry plus diagnostics, not a hidden solver result.

Visualization:

- Draw the source path as a continuous curve and the receiver as a probe with a live summed vector.
- Render each branch as a colored ribbon from emission point to receiver, with thickness proportional to contribution magnitude.
- Animate branches appearing, splitting, weakening, or failing as source motion and receiver position change.
- Keep a selected branch pinned with a label, emission dot, hit dot, and contribution vector.
- Show the net potential as a vector fan that collapses into one summed arrow at the receiver.

Requirements:

- Display source path, receiver point or receiver path, and all candidate causal-root branches in one view.
- Provide filters for branch age, contribution strength, root kind, and Jacobian floor.
- Show branch-local contribution vectors and a summed vector at the receiver.
- Include a branch table with emission time, distance, $J$, contribution, and accept/reject reason.
- Keep branch labels stable while the animation runs so users can track one branch through time.

### 7. Threshold Crossing Map

Description:

- Animate an assembly moving through a basin landscape until delayed wake input pushes it across a separatrix.
- Show how continuous deterministic motion can produce a fast coarse-grained state change.
- Connect resonance-band transitions, self-hit onset, and measurement-like threshold behavior as examples of the same structural idea.

Visualization:

- Use a phase-space canvas with basin regions drawn as calm background colors and the separatrix as a crisp boundary curve.
- Draw the assembly state as a moving point with a short tail showing recent deterministic motion.
- Animate delayed-wake inputs as arrows or ripples that nudge the moving point toward or away from the separatrix.
- When the point crosses, transition the coarse-grained label quickly while the underlying point motion remains continuous.
- In batch mode, draw many faint trajectories so the basin outcome pattern becomes visible.

Requirements:

- Draw basins of attraction with a visible separatrix and moving state point.
- Let users adjust delayed-wake amplitude, phase, damping, and threshold placement.
- Show before/after coarse-grained labels without implying an ontic jump.
- Include repeated trials from near-identical initial states to show sensitive dependence near the threshold.
- Display the action increment or threshold residual that triggers the crossing.

### 8. Born Rule As Basin Measure

Description:

- Teach outcome frequencies as basin measures of deterministic threshold dynamics.
- Show many near-identical trajectories entering an unresolved threshold region.
- Make the observer-level probability emerge from counted basin outcomes rather than from a primitive random choice.

Visualization:

- Use a wide basin canvas where many small trajectory dots stream from a narrow initial packet into colored outcome regions.
- Draw the initial uncertainty as an adjustable source cloud rather than as a random-choice symbol.
- Animate trials accumulating into outcome bins at the edge of the canvas.
- Show a live histogram beside the canvas with basin area estimate, observed count, and convergence trace.
- Let users zoom into one dot to see that it follows a deterministic path through the same field.

Requirements:

- Support a batch-run mode with hundreds or thousands of small dots entering the same basin field.
- Let users adjust coarse-graining resolution, initial spread, apparatus kernel, and record window.
- Show live counts, basin area estimates, and observed outcome frequencies.
- Distinguish individual deterministic paths from the ensemble summary.
- Include a warning state when the retained coarse-graining is too poor to claim stable weights.

### 9. Record Autonomy And Restartability

Description:

- Animate why an effective state cannot always be restarted from an intermediate time without retaining path-history.
- Use a double-slit-like or two-channel setup where unresolved path-history still affects the later record.
- Show how a durable record changes the retained state and allows a later restart approximation.

Visualization:

- Use a two-channel canvas with source, channel region, optional record device, and final screen.
- Draw retained variables as solid objects and unresolved path-history influence as translucent wake bands.
- Animate the same intermediate visible state branching into different later records when hidden history is not retained.
- When a durable record is inserted, snap the retained record channel into a visibly stable marker.
- Plot the restartability diagnostic as a line that drops when record autonomy becomes valid.

Requirements:

- Provide modes for `no path record`, `weak path disturbance`, and `durable path record`.
- Show retained state variables separately from hidden path-history influence.
- Plot a restartability diagnostic that is large before a valid record and small after record autonomy.
- Let users insert or remove a record device and watch interference-like structure change.
- Keep the app language focused on retained records and path-history rather than many-world branching.

### 10. Noether Sea Reversible Retuning

Description:

- Show a stable assembly moving through a responsive Noether sea without ordinary dissipative drag below threshold.
- Animate medium stress building and returning as reversible retuning.
- Teach the distinction between inertial response, reversible transport, and logged loss channels.

Visualization:

- Use a canvas filled with a quiet Noether sea field, with the moving assembly passing through it left to right.
- Draw local medium deformation as elastic contour lines or vector glyphs that bend around the assembly and then relax.
- Animate stored stress flowing back into the assembly below threshold rather than trailing away as heat.
- When the transport residual crosses threshold, open explicit visible channels for excitation, heating, radiation-like shedding, or branch transition.
- Keep a threshold gauge fixed near the canvas so users can connect the visual mode change to $\mathcal{R}_{\text{tr}}$.

Requirements:

- Display a moving assembly, surrounding Noether sea response field, and stored stress.
- Provide controls for center-of-mass velocity, acceleration, local Noether sea state, and stability gap.
- Plot the transport residual $\mathcal{R}_{\text{tr}}$ against $\mathcal{R}_{\text{tr},*}$.
- Below threshold, show stress return with no net heating channel.
- Above threshold, route energy into visible excitation, heating, radiation-like shedding, or branch transition.

### 11. Nested Shell Braid Exclusion

Description:

- Animate why volumetric nested shell braid assemblies are candidates for exclusion-like behavior.
- Contrast a 3D nested shell braid envelope with a strongly oblated coherent planar-channel regime.
- Teach the proposed geometry distinction between fermionic effective exclusion and bosonic effective shared-state behavior.

Visualization:

- Use a central canvas with two nested shell braid assemblies approaching the same effective state from opposite sides.
- Draw each nested shell as layered orbit traces inside a translucent dynamic exclusion envelope.
- Animate overlap pressure by brightening the intersection volume and pushing the assemblies apart in volumetric mode.
- Add an oblation slider that visibly flattens the orbital support toward a coherent planar channel.
- In planar mode, show shared coherent bands instead of volumetric overlap pressure.

Requirements:

- Show two nested shell braid assemblies approaching the same effective state.
- Render volumetric exclusion envelopes and overlap pressure in the 3D-support mode.
- Add an oblation control for the canonical ratio $\xi=R_{\parallel}/R_{\perp}$.
- Switch into a coherent planar-channel mode when support becomes effectively two-dimensional.
- Label the transition as a geometry hypothesis unless the app is later backed by a completed spin-statistics derivation.

### 12. Photon Surface Routing

Description:

- Animate photon-like planar-pair ledger interaction with material surfaces.
- Show that a material surface is not a hard wall; it routes the incoming ledger through available material branches.
- Compare coherent re-release, capture, scattering, heat, recoil, and retained excitation.

Visualization:

- Use a side-view canvas with an incoming planar-pair object approaching a material surface cell.
- Draw the material surface as active lattice/electron-envelope components rather than a flat wall.
- Animate route selection by lighting one or more outgoing channels: coherent re-release, capture, scattering, heat, recoil, retained excitation.
- Show the incoming and outgoing ledger quantities as small moving bars attached to the planar-pair and material branch.
- Provide surface presets that visibly change the internal routing geometry, not only the final outcome label.

Requirements:

- Provide surface presets such as high-reflection metal, absorber, transparent medium, rough surface, and high-capture surface.
- Show incoming planar-pair ledger, selected material branch, outgoing channel, recoil, and heat/excitation channels.
- Preserve nuclear inventory unless a separate reaction mode is explicitly supplied.
- Display the local surface residual and selected routing reason.
- Reuse Photon app visual grammar for planar-pair motion where possible.

### 13. Clock-Cadence Retuning

Description:

- Show identical assemblies placed in different Noether sea states with different local delay and response conditions.
- Make effective clock readout a consequence of internal cadence retuning rather than an arbitrary visual slowdown.
- Tie clock behavior to local medium response, branch stability, and path-history effects.

Visualization:

- Use two or three side-by-side clock lanes with identical assembly clocks placed in different local Noether sea backgrounds.
- Draw each clock as a nested orbit or cycle indicator whose phase advances according to the local cadence.
- Animate the surrounding medium state with density, strain, and response glyphs so the clock difference has a visible cause.
- Show accumulated readout difference as aligned tick marks drifting apart over time.
- If a branch becomes unstable, fade the clock lane into an invalid-state overlay instead of continuing the comparison.

Requirements:

- Animate two or more identical assembly clocks side by side.
- Provide controls for Noether sea density, response anisotropy, strain, and delay factor.
- Display internal cycle phase, observer readout, and accumulated proper-time-like difference.
- Keep the assembly identity fixed while local cadence changes.
- Include a mode that shows when the branch becomes unstable rather than continuing as a valid clock.

### 14. Two-Way Signal Recovery

Description:

- Teach how observer-level signal behavior can look Lorentz-like even when the substrate has path-history and medium response.
- Animate one-way and two-way signal timing in a moving apparatus.
- Show why clock, ruler, and two-way signal recovery must be solved together rather than tuned independently.

Visualization:

- Use a moving-apparatus canvas with an emitter, reflector, receiver, onboard ruler, and onboard clock.
- Animate outbound and return pulses as colored packets traveling through the apparatus while it moves.
- Draw one-way timing, return timing, and round-trip timing as synchronized strips below the spatial view.
- Show clock and ruler retuning with small deformation and cadence markers attached to the apparatus.
- Highlight mismatched recovery settings by making the timing triangle fail to close cleanly.

Requirements:

- Show emitter, reflector, and receiver on a moving apparatus.
- Provide controls for apparatus velocity, local signal speed, delay factor, and clock-cadence response.
- Display outbound time, return time, round-trip time, and inferred two-way signal speed.
- Include a mismatch warning when clock, ruler, and signal parameters are tuned independently.
- Keep this as a recovery-target app, not a proof that Lorentz invariance has been derived.

### 15. Action Ledger Conservation

Description:

- Make every interaction close visible energy, momentum, angular momentum, and record channels.
- Teach that heat, recoil, radiation-like transport, branch transition, and retained excitation are ledger routes, not vague losses.
- Turn conservation accounting into an interactive animation instead of a table.

Visualization:

- Use a central interaction canvas with incoming objects on the left, outgoing objects on the right, and ledger channels below.
- Draw ledger channels as colored flow bars that carry energy, momentum, angular momentum, and record state through the event.
- Animate each preset event by routing the bars into elastic output, heat, recoil, radiation-like transport, retained excitation, or branch transition.
- Keep an always-visible balance meter that settles to zero only when all channels close.
- When a channel is missing, leave a red residual block attached to the event center with the missing quantity named.

Requirements:

- Show incoming and outgoing channels as moving ledger bars or flows.
- Provide presets for elastic event, inelastic event, photon absorption, recoil, and branch transition.
- Keep a live balance panel for energy, momentum, angular momentum, and record state.
- Highlight any unbalanced residual in red with the missing channel named.
- Allow users to click a channel and see its physical interpretation in plain language.

### 16. Noether Sea Response Tensor

Description:

- Animate the Noether sea as a direction-dependent response object rather than a scalar background.
- Show how anisotropic medium response affects local transport, clock cadence, signal timing, and branch stability.
- Make tensor-like behavior visible through deformation ellipses, response arrows, and directional probes.

Visualization:

- Use a canvas centered on one local Noether sea region with a rotatable response ellipse or ellipsoid.
- Draw a movable probe that can push, signal, or oscillate along selectable directions.
- Animate response arrows whose length, delay, and phase change with direction.
- Show transport, clock, and branch-stability readouts updating from the same local response object.
- Let the user rotate the response basis and see the ellipse, arrows, and diagnostics rotate together.

Requirements:

- Provide a probe that can push or signal in different directions through the same local Noether sea state.
- Display direction-dependent response magnitude and delay.
- Show a response ellipse or ellipsoid plus local vector readouts.
- Let users rotate the response basis and watch transport and clock diagnostics change.
- Keep any tensor notation secondary to the animation and explain symbols in the diagnostics panel.

### 17. Mass-Map Exposure Viewer

Description:

- Animate exposed versus shielded assembly contributions to effective mass response.
- Show how branch geometry, shielding, Noether sea coupling, and path-history depth can change the exposed response.
- Give the mass-map workstream a visual diagnostic app for comparing branch candidates.

Visualization:

- Use a side-by-side comparison canvas with two candidate branch assemblies shown as layered component maps.
- Color exposed components brightly, shielded components dimly, and partially exposed components with a gradient.
- Animate path-history depth as expanding causal shells or retained-history bands that reveal which components contribute.
- Show Noether sea coupling as local response halos around exposed components.
- Keep total exposed response and residual bars beneath each candidate so visual geometry and mass-map readout stay linked.

Requirements:

- Show assembly components with exposed, shielded, and partially exposed contribution states.
- Provide controls for shielding depth, branch phase, Noether sea coupling, and path-history depth.
- Display total exposed response, hidden/shielded contribution, and residual.
- Support side-by-side comparison of two branch candidates.
- Mark unresolved rows as candidate diagnostics rather than accepted mass derivations.

## Immediate Next Build Candidates

1. [Causal Delay Feedback Depth](../app-causal-delay-feedback/priorities.md) - Best teaching bridge from causal-delay intuition into active path-history mechanics.
2. `path_history_ledger` - Best reusable substrate for later delayed-hit, solver, photon, and self-hit apps.
3. `self_hit_near_cf` - Best single-page correction for the common misconception that self-hit is decided by speed alone.
4. `branch_geometry_explorer` - Best bridge from visual teaching into solver diagnostics.
5. `threshold_crossing_map` - Best conceptual bridge into measurement, resonance changes, and deterministic basin selection.

## Dynamo Team Insights App Notes

- The deferred geometry/dynamics packet reinforces the existing app order rather than adding a new top-priority app. `path_history_ledger`, `self_hit_near_cf`, `branch_geometry_explorer`, `born_rule_basin_measure`, `action_ledger_conservation`, `noether_sea_response_tensor`, and `mass_map_exposure_viewer` already cover the strongest visualizable signals.
- A later `dynamical_atlas_explorer` may be useful only after the theory side supplies concrete chart labels and gluing maps. Until then, fold atlas visuals into `branch_geometry_explorer` and solver diagnostics rather than creating another app concept.
- App language should keep every signal candidate-level: visualizations may teach path-history state, multiple roots, basin measures, reactive wake storage, and response tensors, but they must not imply completed Lorentz, Born-rule, mass-map, or effective-metric derivations.
