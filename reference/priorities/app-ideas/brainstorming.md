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

### 2. [Assembly Viewer](../app-borg/assembly-viewer-requirements.md)

- Status: `consolidated into app-borg`.
- The Borg requirements packet owns 3D chart-pose and evolved-record replay, while the Braid Program instrument gate owns `assembly-view-record.v0` acceptance.
- Summary: inspect sealed assembly records without recomputing physics; preserve raw source order and `unquotiented-labeled` tri-binary rows, optionally group source-declared $S_3$ equivalents for navigation, and display stable-sector or accessory-capture diagnostics only when the source carries them with provenance.

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
- Include a branch table with emission time, distance, source-normal $D_s$, receiver-normal $D_T$, branch strength $W^{\mathrm{rec}}$, contribution, and accept/reject reason.
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

### 18. [Roots: Causal-Residual Zero Crossing And Root Birth](../app-roots/priorities.md)

Status:

- `proposed` in a dedicated packet; no implementation has been dispatched.
- Preferred product direction: preserve the dedicated mathematical packet, but consider delivering it as an advanced `Roots` story or lab inside [Causal Delay Feedback](../app-causal-delay-feedback/priorities.md) so both experiences share one source, receiver, retained-history model, and wake renderer.

Description:

- Show how the delay-map function changes as a control parameter passes through a generic fold: a tangent zero becomes two zero-crossings, so a pair of active causal roots is born.
- Synchronize the algebraic event with its geometry: each zero is an old source event whose expanding causal wake reaches the receiver now.
- Teach the difference between the pointwise acceleration spike and the finite accumulated velocity change through an ordinary interior fold.
- Resolve the operator's provisional $c(\cdot)$ label against the existing packet's $g(T_r;T_t)$ notation before writing end-user copy; do not expose two names for the same function.

Visualization:

- Begin with the simple Causal Delay Feedback scene, then open a linked graph of the delay-map function against emission time.
- Mark the zero line prominently. Slow the animation as the curve touches zero, then show the two intersection markers separating.
- Keep matching colors across the function graph, wake intersections, source-history points, and root-count ledger.
- Add an optional fourth view in which the pointwise acceleration grows near the fold while the accumulated velocity change remains bounded.

Requirements:

- Reuse the linked-view equations and acceptance conditions in [app-roots/requirements-and-design.md](../app-roots/requirements-and-design.md).
- Keep the graph's zero-crossing count exactly equal to the active-root ledger at the same receiver time.
- Identify the fold through $D_s=0$ and the local line-of-sight source motion, not through total speed alone.
- Keep the ordinary interior-fold result separate from coincident same-source root birth, which remains fail closed under the current sharp equation.
- Use acceleration language, never force language.

### 19. Prescribed Translation And Spiral Tubes In Borg

Status:

- `feature candidate` for prescribed-assembly replay in [app-borg](../app-borg/priorities.md).

Description:

- Let a prescribed assembly translate while its internal paths continue to orbit, making the fixed-frame worldlines form visible spiral strands.
- Show that the same record looks like closed or nearly closed internal paths in a co-translating frame and like extended helical paths in the fixed frame.
- Use the contrast to teach the difference between internal prescribed geometry, group translation, display frame, and physical retention.

Visualization:

- Provide fixed-frame and co-translating-frame camera toggles that preserve the same underlying record.
- Add a translation-vector control only when the source specification declares that coordinate.
- Draw each architrino worldline as a polarity-colored spiral strand and optionally render a translucent display tube around the strand.
- Allow the user to shorten or lengthen the visible trail, freeze the assembly, and rotate the camera to inspect the phase relation among strands.
- Include a split view that shows the compact orbit chart beside the translating spiral structure.

Requirements:

- Generate the display from sealed prescribed-geometry records or exact source formulas; do not infer missing coordinates.
- Label spiral strands and swept tubes as display geometry, not EOM-solver-retained motion, stability, binding, or physical realization.
- Do not call the tubes wake streams. A wake layer remains unavailable until the record carries native wake rows with the required provenance.
- Keep source-carried polarity, path ids, phases, frequencies, group translation, and time coverage unchanged.
- A frame toggle must change only the display transform, never the source record or its evidence status.

### 20. Gell-Mann Pattern Atlas And AAA Derivation Gap

Status:

- `comparison/recovery candidate`.

Description:

- Recreate the baryon octet and decuplet diagrams as an interactive pattern atlas organized by observer-level labels such as $I_3$, $Y$, $S$, and $Q$.
- Teach what the diagrams do exceptionally well: compress a family of observed particles into a geometric classification, expose neighbor relations, and make a missing member visually predictable.
- Teach what they do not do: derive the underlying assembly, confinement, mass, or reaction mechanism.
- Make the $\mathbb{A}\mathbb{A}\mathbb{A}$ learning goal the gap between classification and explanation. The app should ask which native assembly record, polarity ledger, color-singlet closure, and mass-map output would be needed to earn each displayed observer-level label.

Visualization:

- Let users switch among octet, decuplet, quark-content, and charge-axis views.
- Clicking a node opens its observed classification rows, quark-content bookkeeping, and any available candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping in separate authority-labeled columns.
- Include a pattern-completion game in which one node or label is hidden and the user reconstructs it from the lattice coordinates and neighboring states.
- Add a `classification / mechanism` toggle: classification keeps the familiar diagram; mechanism reveals the still-open native derivation rows beneath each node.
- Show unavailable or unproved AAA rows explicitly rather than filling them with illustrative guesses.

Requirements:

- Use [Color Charge and $SU(3)$](../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) for the Eightfold-Way recovery boundary and [Quantum Number Mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md) for effective charge-label bookkeeping.
- Keep flavor-octet classification distinct from color $SU(3)$; visual similarity must not imply identity.
- Treat the Gell-Mann diagram as observer-level organization and a recovery constraint, never as architrino-level ontology or dynamics.
- Do not show an AAA assembly overlay as established unless one same-record derivation supplies the relevant geometry, ledger, stability, and mass rows.
- If built before those rows exist, position the app as a pattern game plus a visible closure map, not as an AAA explanation of the hadrons.

### 21. Braid Harmonics Studio

Status:

- `candidate`.

Description:

- Turn prescribed binary frequency ratios into an audiovisual instrument.
- Let users hear and see when several periodic paths close together, drift in and out of phase, or require a longer common return period.
- Use the constrained $4:2:1$ rows as named examples while allowing other declared integer ratios for mathematical comparison.

Visualization:

- Show three orbit traces, three phase rings, a combined return-period clock, and a simple waveform or pulse lane for each binary.
- Sonify each declared frequency with a soft tone whose phase follows the displayed path.
- Flash a closure marker only when the declared paths return to their starting position, velocity, and phase under the selected prescribed chart.
- Offer short challenges such as `make all three paths close together` or `find the smallest common return period`.

Requirements:

- Keep frequency ratios attached to persistent binary indices and do not infer a radius ordering from them.
- Label closure as prescribed-period closure, not dynamical stability or physical resonance selection.
- Use exact declared ratios and phases; any free-play ratio remains a mathematical display preset.
- Make sound optional and preserve a complete visual equivalent for accessibility.

### 22. Assembly Taxonomy Morph Lab

Status:

- `candidate`; possible focused learning mode beside Borg rather than a second assembly viewer.

Description:

- Make the Family A, B, and C prescribed coordinate charts tangible through direct manipulation.
- Let the user move one valid coordinate at a time and see exactly which paths, axes, offsets, phases, or circulation rows change.
- Teach the difference between a family definition, a constrained member, a parameter variant, and an EOM-solver-retained assembly.

Visualization:

- Use one large 3D assembly view with a compact family/member selector and a coordinate table that updates live.
- Animate the declared Family-A flattening coordinate, B-family cap or axial coordinates, and C-family counterpart relations only where the selected source chart defines them.
- Pin the before and after coordinate tables beside the animation so the visual morph remains auditable.
- Provide `show changed rows only` and `return to canonical preset` controls.

Requirements:

- Drive every preset from the canonical taxonomy or a sealed prescribed record.
- Disable coordinates that the selected chart does not own and never invent missing numerical values.
- Mark all morphed geometry as prescribed-chart exploration unless an evolved record independently supplies retention evidence.
- Reuse Borg's record navigation and provenance grammar where practical.

### 23. Polarity Ledger Builder

Status:

- `candidate`.

Description:

- Create a puzzle game in which users place electrino and positrino units into candidate axial or assembly sites and watch the exact polarity inventory update.
- Use the game to show how integer primitive polarity bookkeeping can underlie fractional observer-level charge labels without treating those labels as primitive architrino charges.
- Separate inventory success from the harder burdens of geometry, stability, confinement, mass, and reaction closure.

Visualization:

- Present a clean board of available sites, a tray of polarity units, and a live inventory ledger.
- Color legal bookkeeping matches clearly while keeping geometrically or dynamically unproved rows in a separate `still needed` column.
- Offer graduated puzzles for neutral pairs, charged-lepton candidates, and quark charge-bookkeeping patterns.
- On completion, unfold the arithmetic that connects the primitive inventory to the observer-level charge label.

Requirements:

- Use only candidate mappings already present in the assembly corpus; do not invent a new particle assignment.
- Never mark a bookkeeping match as a retained or stable particle.
- Keep polarity inventory, observer-level charge, weak-isospin exposure, hypercharge bookkeeping, and color closure as distinct rows.
- Make every puzzle solvable from information visible in the app rather than requiring Standard Model memorization.

### 24. Causal Delay Prediction Game

Status:

- `candidate feature` for the Story mode of [Causal Delay Feedback](../app-causal-delay-feedback/priorities.md).

Description:

- Turn the simplest causal-delay lesson into a repeatable game: pause just before a wake reaches the receiver and ask the user which old source position is responsible.
- Reward predictions based on travel time and path history, then reveal the actual emission event and causal path.
- Provide the same satisfying short-round structure as the Greek-letter game while teaching one central $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism.

Visualization:

- Show three to five candidate old source positions along a bright path trail.
- Let the user tap one candidate before the wake reaches the receiver.
- Reveal the expanding wake, the matched emission point, the receiver event, and a short plain-language explanation.
- Increase difficulty by moving both source and receiver, changing the path shape, or hiding the wake until after the prediction.

Requirements:

- Generate every answer from the same causal-root calculation used by the visualization.
- Begin with one unambiguous root; introduce multiple-root rounds only after the single-root lesson is mastered.
- Keep scoring lightweight and never penalize exploration.
- Offer age-layered explanations without changing the underlying geometry.

### 25. Emergence Layer Lens

Status:

- `candidate`, dependent on a suitable record-backed example.

Description:

- Let users move a lens between architrino paths, assembly-level summaries, and observer-level labels.
- Teach that a coarse-grained field, particle label, or probability summary is a compressed description of lower-layer records, not an additional substrate object.
- Show what information is discarded at each layer and which effective claims still require recovery.

Visualization:

- Use one scene with a zoom or resolution slider rather than three unrelated animations.
- At the finest level, show path-history and causal-root events; at the middle level, show assembly geometry and retained ledger rows; at the widest level, show a small set of effective observables.
- Add an `information retained` drawer listing which rows survive each coarse-graining step.
- Let users compare two micro-records that look identical at one coarse resolution but diverge when more path history is restored.

Requirements:

- Use a declared record-backed example; do not manufacture an apparent emergence result from arbitrary visual averaging.
- Label each displayed claim as derived, measured, inferred, or illustrative.
- Never use the observer-level display as a premise for the architrino-level animation.
- Treat missing recovery maps as visible open rows, not silently assumed transformations.

## Consolidation Directions

1. **Causal Delay learning suite:** combine Causal Delay Feedback, Path-History Ledger, Roots, and Causal Delay Prediction Game as `Story`, `Prediction`, `Roots`, and `Sandbox` modes over one shared causal-history engine. Keep the existing `app-roots` packet as the mathematical and acceptance authority for the Roots mode.
2. **Borg prescribed-geometry suite:** add Prescribed Translation and Spiral Tubes, Assembly Taxonomy Morph Lab, and possibly Braid Harmonics Studio as record-driven learning modes or adjacent tools. Reuse the sealed-record consumer and keep all prescribed geometry at display-only or chart-hypothesis authority.
3. **Particle-pattern suite:** pair the Gell-Mann Pattern Atlas with the Polarity Ledger Builder only when the UI can keep observer-level classification, candidate bookkeeping, and missing native derivation visibly separate.

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
