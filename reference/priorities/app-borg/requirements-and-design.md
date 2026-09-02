# Borg App Requirements and Design

## Purpose

The app lets the operator build, run, inspect, and replay finite simulation windows that approximate an unbounded architrino universe with controlled scale and initial conditions. The first target is a bounded 3D window whose outbound shell statistics can generate statistically matched inbound architrinos and wake history. Solver diagnostics must remain explicit about what is retained, replayed, display-only, verification incomplete, or not advanced.

This packet owns the durable app requirements. The live app already consumes EOM-run rows, but no display, replay, or developer-test surface upgrades those rows beyond their source authority.

## Non-Negotiable Boundaries

1. The EOM solver is the production solver for architrino motion, causal roots, delayed hits, path histories, wake history, simulation-window stepping, and solver-owned geometry.
2. The app must not create a new production solver, parallel solver stack, app-local solver, or alternate default engine.
3. JavaScript-only paths may exist only as explicitly named `reference`, `fallback`, `test`, fixture, or comparison code.
4. Architrino primitives do not have physical mass. If the app exposes a numerical integration scalar, it must label it as `integrationWeight` / `integrationWeights`, not physical mass.
5. The app must model architrino primitives directly. Assemblies may appear later only as derived diagnostics or corpus-bound comparison objects, not as the base entity type for this app.
6. App output is candidate-level unless the run binds same-record retained evidence for source histories, receiver histories, causal roots, branch rows, wake rows, and diagnostics.

## Simulation Window Boundary Model

The first app model is a finite spherical simulation envelope embedded in an unbounded-universe approximation. The outer boundary shell is where boundary-shell rows live, while the default viewport displays and interprets the interior central ball.

The boundary rule is statistical: record the boundary-shell patch statistics of outbound architrinos and wakes at the outer spherical envelope, characterize those statistics, and introduce statistically matched inbound architrinos and wake histories on those outer boundary-shell patches. This is an approximation policy for a local window inside an unbounded universe. It must be visibly distinct from exact retained path history or same-record wake evidence.

An exiting architrino contributes to an outbound shell row. A later inbound architrino generated from boundary-shell patch statistics is a boundary-generated architrino with reduced value authority unless the manifest explicitly binds it to retained external path history. Likewise, an inbound wake history generated from boundary-shell patch statistics is background/replay input, not a retained wake row and not branch evidence.

The viewport renders one dotted sphere at the outer boundary shell. Initial positions are sampled uniformly throughout that same outer spherical volume. The central ball remains a declared measurement region but is neither the initial-population volume nor a second rendered sphere. When an architrino crosses the outer shell, it contributes to the boundary-shell statistics. A statistically matched inbound architrino is a new identity; the app must not depict it as the same identity returning at another shell location.

## Central Volume Observation Rule

The primary measured region is a declared `centralBall` inside the outer computed window. The app should be designed so the operator observes the central ball while boundary-shell reconstruction remains a boundary condition, not the object being interpreted.

Boundary-generated inbound architrinos are new architrinos. They may carry reconstructed wake history sampled from statistically similar outbound wake rows, but that reconstructed wake history has `boundary-generated-value` authority unless the manifest binds retained external path history. This distinction is required even when the boundary replay is numerically useful.

The simulation envelope must declare a buffer margin from the central ball to the outer spherical envelope boundary-shell patches:

$$
b_{\mathrm{shell}}(\mathcal C)
=
\min_{\mathbf x\in \mathcal C}
\operatorname{dist}(\mathbf x,\partial\Omega_{\mathrm{calc}}),
$$

where $\mathcal C$ is the central ball and $\partial\Omega_{\mathrm{calc}}$ is the boundary of the outer spherical envelope.

The strict central-ball buffer target is:

$$
b_{\mathrm{shell}}(\mathcal C)
\ge
\max\left(c_f h,\ v_{\max}T_{\mathcal C}\right),
$$

where $c_f h$ is `wakeHorizon`, $v_{\max}$ is the declared or measured velocity bound for architrinos that could affect the central ball, and $T_{\mathcal C}$ is the central-ball observation interval. If the run cannot declare or measure $v_{\max}$, it cannot claim strict central-ball buffer status. It may still use statistical boundary replay, but central-ball values require the residual test below.

Central-ball acceleration or wake-background values may be displayed as authoritative only when the boundary-shell residual is inside the declared central-ball tolerance:

$$
R_{\mathrm{boundary\to central}}
=
\frac{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathcal C}
-
\mathbf a^{\mathrm{boundary}}_{\mathcal C}
\right\|_{\mathcal W_{\mathcal C}}
}{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathcal C}
\right\|_{\mathcal W_{\mathcal C}}
+\varepsilon_0
}
\le
\tau_{\mathcal C}.
$$

If no reference or bound is available, the central-ball result must carry `missing-error-budget` or `fail-closed-value`. If the residual exceeds $\tau_{\mathcal C}$, the run may still be useful for visual exploration, but it cannot claim that boundary-shell activity is of no matter for the observed central ball.

## Scale Controls

The app should expose scale as a declared simulation envelope, not as cosmetic zoom.

| Control | Meaning | Solver-facing obligation |
| --- | --- | --- |
| `outerRadius` | Outer spherical-envelope radius $r_{\mathrm{outer}}$ | Defines the boundary shell and the diameter used by the app's causal-history bound. |
| `scaleFactor` | Operator-controlled scaling from model units to display or campaign units | Recorded in the run manifest; does not change ontology by itself. |
| `centralArchitrinoCount` | Target number of primitive architrinos in the displayed central ball | Main population count for central-ball interpretation and first-screen readability. |
| `architrinoCount` | Total number of primitive architrinos in the outer spherical envelope | Derived from `centralArchitrinoCount`, `centralBallRadius`, and `radialBufferMargin`; drives solver cost, pair pressure, path streams, and wake-history pressure. |
| `bufferArchitrinoCount` | `architrinoCount - centralArchitrinoCount` | Exterior computed population used to protect the central ball from boundary-shell patch effects. |
| `electrinoCount` / `positrinoCount` | Requested polarity inventory for the initial condition | Must map to explicit per-architrino polarity or composition rows; native numerical encodings are implementation details. |
| `duration` | Simulated time span | Determines required path-history depth and storage. |
| `timeStepPolicy` | Fixed, adaptive, or solver-selected stepping policy | Must be part of the EOM solver model contract. |
| `historyDepth` | Active causal-history time window $h$ | Measured in time; must be enough to support requested wake/root queries, or verification remains incomplete. |
| `wakeHorizon` | Wake travel length $c_f h$ corresponding to `historyDepth` | Measured in length; determines whether wakes can reach the simulation-window boundary-shell patches inside the retained history. |
| `wakeFloor` | Declared threshold below which wakes are not retained as resolved rows | Must route to background/noise rows rather than silent truncation. |
| `boundaryMode` | Local window or statistical boundary shell | Must determine whether outbound/inbound boundary-shell patch rows are required in displayed rows. |
| `centralBall` | Declared interior observation region $\mathcal C$ | Main displayed region for interpretation; diagnostics outside it must not silently upgrade central-ball status. |
| `centralBallRadius` | Radius $r_{\mathrm{central}}$ of the displayed central ball | Must be smaller than `outerRadius` unless the run intentionally has no buffer. |
| `radialBufferMargin` | Radial distance $b_{\mathrm{shell}}(\mathcal C)$ from the central ball to the outer boundary shell | Must satisfy the strict central-ball buffer target or trigger boundary-to-central residual validation. |
| `centralBoundaryTolerance` | Declared tolerance $\tau_{\mathcal C}$ for boundary-shell influence on the central ball | Required before central-ball values can be presented as inside the declared boundary-influence budget. |

The Borg simulation envelope uses the canonical normalized field speed $c_f=1$. Any different numeric value requires an explicit unit transform in the run manifest; an unexplained fixture-local override is invalid. The live app computes `historyDepth` from the full simulation-envelope diameter $2r_{\mathrm{outer}}$ and the active source-speed bound, then declares `wakeHorizon = c_f h`. With `outerRadius = 0.5`, per-axis initial-speed bound `0.01`, and sample interval `0.01`, the exact startup history depth is derived from that startup's randomized velocities rather than fixed in the manifest.

`historyDepth` and `wakeHorizon` must not be collapsed into one UI field. `historyDepth` is the retained time window, while `wakeHorizon = c_f h` is the corresponding length scale. If `wakeHorizon` is small compared with `radialBufferMargin`, the central ball can be interpreted as local with respect to retained wakes, subject to the velocity-bound term above. If `wakeHorizon` is comparable to or larger than `radialBufferMargin`, boundary-shell diagnostics, outbound shell statistics, inbound replay policy, and wake-background status become relevant for central-ball interpretation.

The app may provide visual zoom independently, but visual zoom must not change `outerRadius`, `centralBallRadius`, causal speed, history depth, or solver precision unless the operator explicitly changes the simulation envelope.

## Initial Conditions

The app should support several initial-condition families while preserving explicit architrino identities:

| Family | Required fields | Claim limit |
| --- | --- | --- |
| `random` | Seed, count, electrino/positrino mix, position distribution, velocity policy | Exploration only until repeated under declared seeds and diagnostics. |
| `lattice` | Grid dimensions, spacing, jitter, electrino/positrino mix, velocity policy | Geometry diagnostic, not evidence for crystalline ontology. |
| `clustered` | Cluster centers, spreads, counts, electrino/positrino mix, velocity policy | Candidate stress test for wake/root density. |
| `explicit` | Per-architrino position, velocity, identity, and optional path segment input | Best first path for reproducible fixtures. |
| `imported` | Manifest id, schema version, source hash, units, and scale normalization | Must preserve source provenance and schema version. |

The current browser implementation launches from a fresh `seeded-random` geometry on every page startup: six architrinos are sampled by rejection uniformly in the full spherical simulation envelope, with a 3:3 electrino/positrino mix, declared minimum pair separation `0.2`, and independently sampled velocity components bounded by `0.01`. The rendered dotted sphere and the initial-population volume share `outerRadius = 0.5`; the startup seed is recorded so an explicit seed can reproduce the distribution without imposing a lattice. The accepted initial-history certificate records the measured all-pairs separation and its `1e-12` comparison tolerance.

The Initial Condition panel exposes exact `electrinoCount`, exact `positrinoCount`, the run coupling `κ`, nominal `stepHeight`, `adaptiveMinimumStep`, `randomVelocityMaxComponentMagnitude`, and `randomVelocityMinSpeed`. The nominal height sets both the first attempted EOM height and the adaptive-growth ceiling; the adaptive minimum is the smallest retried height before a named not advanced halt. The panel requires `0 < adaptiveMinimumStep <= stepHeight <= chunkDuration`, so neither control is aspirational. The component maximum bounds each of `|v_x|`, `|v_y|`, and `|v_z|`; the minimum speed bounds the complete vector magnitude `sqrt(v_x^2+v_y^2+v_z^2)`. An accepted panel edit uses the current deterministic seed with random placement subject to the declared minimum-separation gate, constructs a certified exact polynomial initial history, discards prior forward frames, and returns the timeline to `T=0` without starting motion. The timeline Play control starts forward EOM evolution with the accepted coupling and step controls. The die control advances the seed and performs the same reset. The timeline places a visible path-history selector after the run-duration limit and before playback speed, with 30, 60, 90, 180, and 360 units of simulation time $T$ and a 30-unit default. That selector redraws the displayed trails immediately in either run grade without resetting the simulation. It is not the EOM solver's causal-history depth and cannot delete solver input merely because a segment is visually old. The lower-right timeline status is a fixed-width `T hh:mm:ss.s` clock; buffer lead and adaptive playback-rate diagnostics remain available in diagnostics rather than occupying the primary timeline. The runtime validates a combined population from 1 through 512 and rejects an unreachable speed, step, or placement request. A rejected edit leaves the prior accepted initial datum visible. These rows are accepted input, not canonical equation-of-motion evidence. Per-architrino position and velocity-vector editing remains outside this implemented control set; high populations remain gated in practice by measured EOM throughput.

### Population Count From Central Sphere To Outer Sphere

The displayed architrino count and the total app population differ once the app declares a radial buffer. The app chooses the central-ball count first, then derives the total count by preserving the declared number density across the two spherical volumes:

$$
N_{\mathrm{calc}}
=
\left\lceil
N_{\mathcal C}
\left(
\frac{r_{\mathrm{central}}+b_{\mathrm{radial}}}{r_{\mathrm{central}}}
\right)^3
\right\rceil.
$$

For the current defaults, $N_{\mathcal C}=3$, $r_{\mathrm{central}}=0.4$, and $b_{\mathrm{radial}}=0.1$. The pre-ceiling value is $5.859375$, so the declared total remains six architrinos, split 3:3 by polarity.

The app should display both counts:

| Count | Meaning | Claim rule |
| --- | --- | --- |
| `centralArchitrinoCount` | Architrino count targeted inside the displayed central ball. | This is the visible count for central-ball interpretation. |
| `architrinoCount` | Total architrino count requested for the outer spherical envelope. | This drives solver cost, path-history pressure, and wake-history pressure. |
| `bufferArchitrinoCount` | Difference `architrinoCount - centralArchitrinoCount`. | This is computed exterior population, not the primary observation set. |

Central-sphere counts are interpretable only after exterior boundary-shell patch effects are excluded by the strict central-ball buffer target or by a passing $R_{\mathrm{boundary\to central}}$ residual. If neither condition is available, the central count may still be displayed as the staged interior population, but central-ball acceleration and wake-background claims must not advance.

No initial-condition editor should ask the operator for architrino physical mass. The initial-condition editor must expose the requested electrino/positrino inventory directly. The operator should be able to set the central architrino count, see the derived outer computed count, and set the mix as exact counts, a ratio, or a percentage view, with the manifest preserving the resolved per-architrino polarity assignment across both the central ball and the buffer population.

Velocity initialization needs first-class controls rather than a single random-speed knob:

| Velocity policy | Required behavior | Status |
| --- | --- | --- |
| `zero` | Set every initial velocity vector to zero. | Native-backed once emitted in the initial-condition manifest. |
| `scale-mix` | Assign a controlled mixture of speed scales and directions, with exact seed, scale bands, and distribution parameters recorded. | Exploration policy until the manifest records the generated vectors. |
| `explicit` | Set each architrino velocity vector directly. | Best path for reproducible fixtures. |
| `drift-v` | Assign a shared velocity vector or grouped velocity vectors to selected architrino groups. | Initial-condition editing mode, not a branch group-velocity claim. |

The launch-state editor should include a `custom` mode. In `custom` mode, the operator starts from any generated or explicit initial condition, then directly edits the staging state before running: click-drag an architrino to change its position, and click-drag the endpoint of its velocity ray to resize and reorient its initial velocity vector. These edits must update exact numeric fields and keep the run in a pending initial-condition state until the EOM solver accepts the run request.

## Assembly-view Replay

The canonical Borg page is one persistent workbench with visibly distinct random-simulation, prescribed-replay, and prescribed-Display-branch states. A direct `borg.html?assemblyId=<assembly-id>&modelRevisionSha256=<model-revision-sha256>` route opens the same workbench with that exact current catalog configuration selected; an optional matching `recordSha256` pins the emitted record bytes. `EomHistoryDataset.mjs` remains the only record-ingestion path, and record replay does not construct the live EOM client. Replay may evaluate only declared interpolation and display arithmetic. It cannot evolve, repair, extrapolate, compute accelerations or causal roots, classify branches, or upgrade evidence.

Replay exposes persistent provenance, prescribed/evolved labels, retained-segment playback, delay-horizon trails, coverage-clamped scrub and playback, chart pose, co-rotating camera, display-only swept envelope, static image export, a disabled animation-export placeholder, catalog-backed prescribed-geometry navigation, and raw source-order collection navigation. For a prescribed `chart-hypothesis`, playback is animation of the declared analytical path, not simulated evolution. Optional $S_3$ grouping and filters consume source-carried fields only and never replace the selected raw record.

The unified `Starting geometry` selector contains `Random architrinos` plus every current prescribed catalog record exactly once. Selecting a prescribed entry loads it by `assemblyId + modelRevisionSha256`; selecting random restores the saved simulation workspace rather than converting a chart into live initial conditions. All active records are emitted from complete source specifications with `engineId: prescribed-geometry`; source metadata supplies exact constraints without imposing a hierarchy. Pressing Play from chart pose starts prescribed-path playback. `Continue with Display simulation` creates a separate child branch at an exact common segment boundary, copies the exact piecewise-cubic segment prefix through that cut into EOM retained history, uses the fixed `borg-prescribed-display-v1` profile, starts directly at Display grade, and remains promotion-ineligible. It never reconstructs history from rendered frames or changes the source record's grade. Each source-carried binary axis is rendered as a dashed guide; coincident axes remain coincident. Chart-pose paths use the same exact standard polarity color as their architrinos and obey the circle-occupancy trail contract below. The selector is not a geometry source and does not solve the deferred external packet/manifest carrier.

Parameter variations remain source-defined. A change to labeled member radii, cap angles, phases, or other chart parameters produces a separate complete source specification, sealed record, and catalog entry. Borg does not synthesize a variation in the browser, and an `I:M:O` label mapping is never inferred from binary source order.

The active planar boundary record and the all-axial boundary control reuse the tilted three-binary chart's declared radii, angular frequency, phases, polarity assignments, record interval, and frame. The planar record changes only the three declared cap angles to $0$; the all-axial control changes only those angles to $\pi/2$. These are controlled boundary constructions, not a hierarchy of configuration families.

Current sealed assembly-view records carry the ratified `assembly-view-record-frame.v1` and `assembly-view-vector-overlays.v1` contracts, and `assembly-view-collection.v1` supplies the external ordered collection. Comparison requires explicit clock/ruler transforms into one named frame and transformed $c_f$ agreement; circular neutral-pair vectors remain source-owned display rows rather than intrinsic angular momentum or a standard-physics dipole law. Legacy or external records that lack any required carrier still fail closed and never receive substitute app-defined values.

### Taxonomy Selection Canvas

The bounded [Assembly Library demonstrator](../../../borg-library.html) exercises this interaction design over the current sealed seed catalog. [Its run instructions and scope](../../../src/apps/borg/library/README.md) distinguish the implemented read-only seed provider from the full registry, identity migration, and taxonomy-coverage requirements below.

Borg uses a visual-first faceted selection canvas backed by the exact assembly catalog. Human discovery begins with filters and independently interactive spherical previews rather than opaque taxonomy names. Descriptive labels and exact identity remain searchable, accessible secondary metadata and become prominent when a result is selected or copied. The canvas uses a responsive grid and follows the canonical [UI Guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md): dark navy or near-black shell surfaces, thin cool-gray borders, compact rounded geometry, `8px`-`12px` gaps, `8px`-`16px` panel padding, common UI typography tokens, visible keyboard focus, and short functional transitions. Those shell rules do not constrain the scientific colors inside a preview sphere.

The filter rail exposes at minimum exact architrino count; source-declared braid count; breathing state; assembly-centered radius relation; Circle occupancy with `One per circle`, `Multiple per circle`, and `Mixed`; speed policy; separate component-braid dimensionality and whole-assembly span; and nonexclusive visual-form descriptors. A value must be source-carried, explicitly assigned in a versioned source classification, or computed by a versioned deterministic descriptor from source-declared inventory and geometry, with its owner/version and inspectable reason retained. `Any` leaves a selector unrestricted and includes missing assignments. `Not assigned` is not a menu option. The canvas never infers a facet from rendered pixels.

Plainly: the filter asks what the assembly contains and what its declared geometry does; it does not ask the user to remember an opaque code. If the source cannot establish a value, Borg reports `Not assigned` rather than placing the record in a false negative bucket.

The speed-policy selector reads an explicit source-model or run-policy declaration, never a current-frame or recorded-maximum speed test. Its provenance states the policy owner/version, which speed quantity is capped, the frame, and units; constituent speed and assembly translation are not interchangeable. New numerical fixtures and recalculations use $c_f=1$, while legacy provenance retains its recorded normalization. Missing policy metadata remains unavailable. A changed cap or speed law changes identity-bearing model/run configuration. Filtering does not impose or remove a cap, modify playback, introduce an EOM solver capability, or establish conformance to the declared cap.

Plainly: `Uncapped` does not mean “currently faster than $c_f$,” and `Capped at $c_f$` is a statement about the model or run policy rather than a GUI speed limit.

The default result level is one sphere per registered model representative, with compact counts for attached revisions, evolved occurrences, and sealed records. Evaluate revision- or record-specific facets before grouping, then show the matching variants and their counts rather than copying the representative's facet values to all members. A broad result may be represented by a group sphere only when the sphere is visibly marked as a group and shows its member count. Selecting a group applies its represented facet or descends to a narrower result set. A leaf sphere resolves to one exact model or sealed record. A group has its own result identity; a displayed representative is an identified example, not the geometry, evidence status, or scientific standing of every member.

The seed demonstrator's first source-derived multi-configuration braid entry collects the one hundred `equal-radius-planar-three-binary-balance-row.v1` records that share one exact source-ledger hash. The default canvas shows one card labeled `Equal-radius planar three-binary circular balance` with the matching exact-configuration count; its sphere is explicitly an example preview. Selecting it shows the exact rows with their independent $\beta_f$, $R/R_*$, `assemblyId`, model-revision hash, and sealed-record hash. Facets and search apply to exact rows before this presentation grouping, so a query matching one row returns that leaf directly. This relation adds no parent or family field to the flat catalog.

Plainly: one card says how many solutions of the same source-declared parameter form are available. Opening the card reveals the solutions; it does not merge their identities or make the example's parameters stand for the others.

The query response exposes the total displayed braid entries or explicit groups as `total`, the matching exact configurations as `exactRecordCount`, the matching exact configurations linked to indexed active findings as `activeFindingConfigurationCount`, and available braid-entry facet counts before preview geometry loads. Each source-derived multi-configuration braid entry contributes at most one count to a facet value in the default canvas; exact configuration drill-down counts each leaf separately. The active-finding count counts an exact configuration once even when several current finding relations match it. Facet filtering still evaluates exact rows before grouping. Results use deterministic ordering, cursor pagination or virtualization, and lazy preview loading; Borg never instantiates every match as a live sphere. Saved and shared URLs preserve exact filter state and the selected result identity. Each interactive result exposes through accessible DOM or an equivalent stable test contract its result kind, stable id, exact target id and revision for a leaf, facet values, member count, active-finding configuration count, selected state, and unavailable reason. Automated and AI tests use those carriers rather than inferring identity or filter truth from screenshots.

Plainly: a million registry rows may reduce to a few dozen visible representatives. Humans recognize the pictures; assistive technology and tests read the same exact identities and filter facts underneath.

Each preview sphere contains only the source-carried architrinos and their paths. A plain non-dotted circular perimeter may define its clipping edge, but it renders no dotted globe or outer-boundary overlay, globe dots, latitude or longitude marks, great-circle guides, axes, labels, wake shells, diagnostic glyphs, panels, or decorative interior texture. The sphere is a clipping and interaction frame for the assembly preview, not a second scientific boundary or evidence surface.

Each preview supports independent unrestricted three-dimensional rotation by pointer or touch drag and by an accessible keyboard equivalent. It provides no zoom: wheel and trackpad scrolling continue to move the selection canvas, pinch does not rescale the preview, and no zoom, fit, or focus control is exposed inside a selection cell. Reset returns only the preview orientation to its deterministic poster orientation.

The complete visible assembly must remain inside the sphere at every rotation. For preview center $\mathbf c$ and the set $\mathcal P$ of every displayed architrino position and path point, define the rotation-invariant preview bound

$$
R_{\mathrm{preview}}=\max_{\mathbf x\in\mathcal P}\lVert\mathbf x-\mathbf c\rVert.
$$

The fixed preview projection and safe-frame margin must contain that bound under every allowed orientation; selection-cell rotation must not change projection scale. Records without enough source-carried geometry to compute a complete bound remain visibly unavailable rather than being partially clipped or silently rescaled during interaction.

Plainly: turning a preview can change which part is in front, but it can never push an architrino or its path out of the circular selection frame. The operator should be able to judge the assembly by eye without fighting zoom or mistaking a globe decoration for part of the geometry.

Acceptance fixtures include at least one pair of visually similar configurations with different histories, one pair of differently named configurations with the same coarse shape, capped and uncapped configurations with the same sub-$c_f$ displayed speed, and a record with no declared speed policy. A user must be able to reach each exact leaf through filters and selected-result details without knowing any development code, while the machine contract distinguishes the targets without pixel comparison. Identical-looking records must not require visual discrimination alone.

### Scientific-Status Inspector

Every inspected exact Library record and exact prescribed-record replay in the Borg workbench consumes the same `borg-scientific-status-projection.v1` contract. The Braid Program's [candidate requirement adjudication](../braid-program/braid-candidate-requirement-adjudication.md) remains the scientific authority; the versioned [machine-readable projection](../braid-program/braid-candidate-adjudication-projection.v1.json) carries exact identity targets, explicit slice or broader scope, `H1`--`H5` tokens and claim grades, tested realization and domain, assumptions, horizon, instrument, evidence links, boundaries, blocker, falsifier, lifecycle, owner path, owner digest, and source anchor. The browser validates and renders this projection but never parses the Markdown owner, solves a causal root, runs the EOM solver, evaluates stability, or adjudicates a candidate.

Plainly: the panel explains the current Braid Program record for the exact assembly being inspected. It does not calculate a new scientific answer.

Exact adjudication binds only by `assemblyId + modelRevisionSha256`. A presentation rename preserves that binding, but a changed model revision does not. A slice-only or broader finding may appear as labeled context and never supplies an exact verdict. Active, superseded, and withdrawn relation lifecycles remain distinct. Missing exact coverage reports `No adjudication linked`; mismatched identity, stale owner digest, missing source row or anchor, unsupported state token, duplicate active exact relation, or broken evidence link reports `Projection stale or invalid` and suppresses the scientific verdict.

The verdict follows the strongest exact source state without reducing `H1`--`H5` to a score. `H5 P[...]` alone permits `Retained branch established`; `H5 U` reports `No retained branch established yet`; exact `H4 F[...]` reports `This exact realization failed bounded release`; and actual `H5 F[...]` reports `Retained-branch claim falsified within the tested scope`. A bounded no-success result names the searched domain. Unknown is not failure, prescribed replay is not ordinary evolution, bounded release is not retention, and neither playback nor visual persistence is a stability test.

Plainly: passing an early requirement does not silently pass a later one. In particular, `H4` success cannot become an `H5` retained branch.

The shared renderer exposes an accessible `H1`--`H5` table, overall verdict, tested realization, parameter domain, assumptions, horizon, instrument, `Establishes`, `Does not establish`, `Current blocker`, `Falsifier`, controlling links, projection revision, source, freshness, lifecycle, and stable `data-scientific-status`, `data-scientific-verdict`, `data-requirement`, and `data-status-hook` attributes. Group and variant cards aggregate exact members into pass, scoped-fail, unknown, unindexed, and stale counts. An example preview never lends its verdict to other members.

The owner-wide projection census is currently three `H4 P[M]` rows and zero `H5` passes. Of the current Borg catalog, 23 exact configurations have exact adjudication bindings; one further exact adjudication remains bound to the display-withheld centered-five-coordinate identity and transfers nothing to its stella-octangula replacement. These counts are checked against the owner and current catalog by `node scripts/check-borg-scientific-status-projection.mjs`; they are not browser constants.

Plainly: Borg retains the retired row's evidence under its retired identity while treating the new replacement record as scientifically unindexed.

#### Catalog Composition Classifications

The operator's 2026-08-30 clarification replaces the former nesting facet with assembly-centered radius equality. For the one source-declared whole-assembly center $\mathbf C(T)$, define $r_i(T)=\lVert\mathbf x_i(T)-\mathbf C(T)\rVert$. Iso-radii means all $r_i(T)$ agree at each equal-time slice throughout the recorded window; Hetero-radii means at least one slice has unequal radii. The center is not a preview bound, fitted centroid, individual circle center, or component-braid center. Equal radii may breathe together; breathing and shape remain separate dimensions.

Plainly: compare everyone's distance from the same assembly center at the same time. The axial-transverse and high-axial coincident-axis three-binary interior references are Hetero-radii under this definition.

For a circular source, write $\mathbf x-\mathbf C=\mathbf d+\mathbf u\cos\theta+\mathbf v\sin\theta$ with $\mathbf u\perp\mathbf v$ and $\lVert\mathbf u\rVert=\lVert\mathbf v\rVert=\rho$. Expanding the squared norm gives

$$
r^2=\lVert\mathbf d\rVert^2+\rho^2+2(\mathbf d\cdot\mathbf u)\cos\theta+2(\mathbf d\cdot\mathbf v)\sin\theta.
$$

Plainly: the orbit's radius is only part of the distance to the assembly center. An offset along the orbit axis contributes in quadrature; a sideways offset can make that distance vary with phase.

For a linear source the squared radius is $\lVert\mathbf d+\mathbf v t\rVert^2=\lVert\mathbf d\rVert^2+2\mathbf d\cdot\mathbf v\,t+\lVert\mathbf v\rVert^2t^2$. phase-varying display representative's orthogonal axial and transverse reconstruction gives $h^2+\rho_j^2$. asymmetric counter-breathing representative gives $h_\sigma(T)^2+\rho_\sigma(T)^2$; each breathing square uses $(b+a\sin\phi)^2=b^2+a^2/2+2ba\sin\phi-(a^2/2)\cos(2\phi)$. These are Euclidean identities for declared source paths, not EOM solver results.

Plainly: these formulas compare complete prescribed motion, not how one preview frame looks. asymmetric counter-breathing representative can start with equal radii and become unequal later.

[The radius descriptor](../../../src/apps/borg/library/BorgLibraryRadii.mjs), included in facet version `borg-record-facets.v7`, checks complete source operators and declared assembly placement. It canonicalizes squared-radius functions into a degree-two polynomial and constant-frequency sine/cosine terms. For each pair, the triangle-inequality coefficient bound over the window bounds their squared-radius difference. Iso-radii requires every pair bound to be no larger than $10^{-12}\max(1,B)$, where $B$ is the largest source-model coefficient bound. Hetero-radii requires a finite evaluated time with squared-radius spread greater than that tolerance. Seventeen probe times seek such a witness; failure to find one is unassigned, not evidence of equality. Unsupported motion, missing centers, or nonfinite bounds remain unassigned. This is floating-point source-geometry screening, not certified interval arithmetic; the descriptor's numerical geometric checks use the same base tolerance.

Plainly: equality must follow from the full formula. One unequal frame disproves it; several equal frames cannot prove it. Tests use hand-derived Euclidean and trigonometric controls without changing the shared worldline evaluator.

The radius descriptor evaluates every current exact record directly from its source paths. [The audit](selector-assignment-audit.md) gives the current assignment method and representative source calculations. No spherical-shape assignment is inferred from radius equality.

Only the six explicitly selected spindle-shape assignments remain in [library-classifications.v4.json](library-classifications.v4.json), each pinned by `assemblyId + modelRevisionSha256`. The inspector exposes the classification revision, source, and file digest. Presentation renaming preserves a pin; scientific change requires a new exact identity and assignment. Missing spindle assignments stay unassigned. Shape tags remain nonexclusive, and an operator-supplied shape assignment is not measured binding or stability.

Plainly: source formulas determine radii; declared membership determines braid count; the operator's separate assignments determine spindle shape.

Classification v4 rejects radius overrides and noncurrent fields. The API rejects retired query keys and values rather than translating them. Descriptor or classification revisions invalidate cached results and cursors without rewriting scientific source records.

`Braids in assembly` counts source-declared component groups only when their nonempty member lists partition the declared constituent inventory exactly once. It does not divide architrino count by six. The browse count does not assert that component groups are separately bound braids. Missing, overlapping, or incomplete membership yields `Not assigned`.

Plainly: the number comes from declared membership, not from how crowded a sphere looks. The selector still offers three so the empty result is explicit and the next source-declared three-braid record needs no interface change.

Falsifier: a source declared Iso-radii has an unequal centered-radius slice outside the stated numerical tolerance, a Hetero-radii witness is not unequal, the descriptor substitutes an orbit/component center, or a saved selection opens changed bytes.

##### Circle Occupancy

`Circle occupancy = {One per circle, Multiple per circle, Mixed}` classifies complete source-supported geometric circles. Two circular members occupy the same circle only when their center histories, unoriented plane-normal histories, radii histories, and explicitly declared common translation agree over the comparison interval. Phase, cadence, direction, circulation, polarity, and binary membership do not change circle equality. An assembly may contain several distinct multiply occupied circles, including circles with different radii.

Plainly: the selector counts how many architrinos travel each actual circle. It does not say that the whole assembly uses one circle.

[The geometry descriptor](../../../src/apps/borg/BorgOrbitGeometry.mjs) validates source-to-record membership and fails closed on missing, noncircular, ambiguous, degenerate, or nontransitive carrier data. It never independently recenters paths, merges instantaneous crossings, or equates merely congruent circles. The descriptor reports `Not assigned` rather than inventing a false value.

Circle occupancy does not authorize a trail length by itself. The trail renderer separately requires complete phase and rate carriers for phase-gap arcs, and a source-declared antipodal opposite-polarity pair for two half-turn tails. A single-occupant supported circle receives one full preceding turn or declared reconstruction cycle.

Falsifier: displaced or crossing circles merge, incomplete source data produces `One per circle`, a record containing both occupancy types cannot report `Mixed`, or a presentation-only half-turn rule is used as the geometric definition.

### Exact Identity and Flat Selection

Every catalog leaf is a peer identified by `assemblyId + modelRevisionSha256`. A scientific-content change creates a new pair. A label, filename, chapter, URL, or style change preserves the pair; `recordSha256` additionally pins exact emitted bytes. Borg exposes no alias table, family parent, compatibility reader, redirect, or translated old query.

The [flat assembly catalog decision](../../architectural-decisions/flat-assembly-catalog.md) removes parent membership from catalog and navigation. The workbench renders Random architrinos followed by each exact record once in source order. The Library discovers records through factual filters and opens one exact current identity. Missing characteristics remain `Not assigned`.

Plainly: names can improve without changing an assembly. Geometry or path changes create a different identity; filters reveal similarities without making a hierarchy.

## Path-History Retention

Path history means the recorded source and receiver motion needed to replay where each architrino was when a causal root, delayed hit, or wake row was formed.

| Record | Required fields |
| --- | --- |
| Current state | `architrinoId`, position, velocity, acceleration, boundary-shell patch status, time, step index, status. |
| Segment row | Path id, segment id, time bounds, endpoint states or segment coefficients, interpolation law, numeric precision, error budget. |
| Active window | Hot in-memory path range used for ongoing root and wake solving. |
| Spill manifest | Chunk ids, path id ranges, time ranges, byte offsets, checksums, units, scale normalization, schema version. |
| Replay index | Fast lookup for path id, time range, frame range, and root/wake consumers. |

The app should render trails and playback from these records, but the authoritative data is the solver-owned path stream and manifest.

## Polarity-Matched Path Color And Half-Turn Fade

Every Borg path is visually owned by the architrino that traverses it. An electrino path uses the same exact standard blue as its electrino, `#0000ff`; a positrino path uses the same exact standard red as its positrino, `#ff0000`. Borg must not substitute pastel tints, white fallback paths, a shared purple prescribed-path color, speed colors, family colors, or per-binary colors for this base path identity. Any optional diagnostic overlay must remain separable from the canonical polarity-colored path.

A source-confirmed opposite-polarity antipodal binary alone on one circle has two preceding half-turn trails: one red and one blue. Each fades linearly from full intensity at its architrino to zero at angular lag $\pi$. A circle traversed by one architrino uses a complete preceding turn in that architrino's solid standard color. Binary membership alone does not establish circle equality: axially separated partners have separate circles and each gets a full turn.

Plainly: one multiply occupied circle has a red half and a blue half. Two separate circles are each entirely their owner's color.

[The circle-aware trail policy](../../../src/apps/borg/BorgOrbitTrails.mjs) compares source circle centers, velocities, radii, and planes, then checks declared neutral-pair membership and antipodal phase/circulation before assigning a half-turn. With three or more occupants on a circle, equal signed angular rates and distinct source phases assign each member the preceding gap divided by its angular rate. Nonuniform gaps are supported; counter-rotation, unequal rates, or coincident phases do not establish fixed arc ownership. Single-occupant asymmetric counter-breathing paths use one declared phase turn, and phase-varying paths use one full reconstruction cycle. Missing or ambiguous orbit/phase carriers remain unavailable. Non-orbital and unclassified EOM histories retain their explicit time/depth window without asserting an orbital period.

Only recorded history at or before the displayed time is drawn. Fractional endpoints are clipped; scrubbing backwards removes later segments. At the beginning of coverage, a trail grows from the available past instead of borrowing future samples or fabricating a previous cycle. The history-depth control can shorten either span. Multi-occupant arc trails fade to zero at their assigned boundary; single-occupant full-turn or reconstruction-cycle trails remain solid.

Plainly: a full single-occupant circle appears once enough past motion is available. The display never invents missing history to fill a circle.

The same policy serves library cards and inspectors, prescribed animated replay and chart pose, and scene image exports. Source ansatz curves without unique worldline ownership are not rendered as extra base orbits. Optional axes, envelopes, and diagnostic overlays are separate from architrino paths; selected history tubes inherit their owning architrino's color and time window. Live retained and compacted history paths also use exact polarity colors and reject an unknown color instead of falling back to white. Comparison remains unavailable until its source transform contract is ratified; it has no separate path renderer to recolor.

Claim grade: source-carried geometry determines presentation, and tests measure rendering behavior; this establishes no dynamics or physical acceptance. Falsifier: a base path has a different color from its owner, an axially separated binary is limited to half an orbit, a two-occupant antipodal circle is painted as two overlapping full circles, or any displayed segment lies outside the available past.

### Live-Run Browser Retention

The executable browser-retention authority is [BorgLiveRunRetentionPolicy.js](../../../src/apps/borg/BorgLiveRunRetentionPolicy.js). During an unbounded-duration display run, Borg keeps the recent EOM frame rows needed for current-state inspection and playback, then compacts older browser rows into sampled per-path trail points. Those compacted points are `display-only-compacted-path-history`; they are not EOM state, retained causal history, wake evidence, or a durable paging source.

Compaction must preserve a shared boundary endpoint between the compacted trail and the exact recent trail, use stable historical frame positions when thinning older points, and keep the browser display-memory bound separate from EOM solver state and chunk requests. Authoritative inspection uses the retained recent EOM rows or a future durable path-history page source. The executable module owns all numeric limits, trigger values, strides, snapshot fields, and runtime status tokens; this packet owns only the authority boundary and required behavior.

## Wake-History Retention

Wake history means the retained causal influence rows generated by source path history and consumed by receiver motion or diagnostics.

| Record | Required fields |
| --- | --- |
| Resolved wake row | Wake row id, source architrino id, receiver architrino id, source path id, receiver path id, emission time, hit time, causal-root id, residual, branch row id when applicable, wake strength, boundary-shell status, status. |
| Background/noise row | Threshold, aggregation interval, source population, receiver population or region, omitted resolved-row count, aggregate magnitude, claim-level downgrade. |
| Boundary-generated row | Boundary-shell patch id, time bin, source summary id, sampling seed, inbound source policy, inbound wake policy, value authority, error budget. |
| Failure row | Missing path history, unresolved root, insufficient history depth, missing boundary-shell patch summary, precision failure, branch-row mismatch, or simulation-envelope overflow. |

Silent wake truncation is not allowed. If the requested scale makes individual wakes smaller than the declared `wakeFloor`, the run must record that boundary as a background/noise row with a claim-level downgrade.

### Borg Wake-History Row

The first resolved wake-history row schema is `borg-wake-history-row.v1`. It is a retained row, not a visualization shell. A displayed wake stream, acceleration contribution, boundary-shell label, or selected wake diagnostic must trace back to this row or to an explicit background/noise, boundary-generated, or failure row.

| Field | Required content |
| --- | --- |
| `schema` | `borg-wake-history-row.v1`. |
| `wakeRowId` | Stable row id unique inside the run manifest. |
| `runId` | Source run id. |
| `sourceArchitrinoId` | Source architrino identity. |
| `receiverArchitrinoId` | Receiver architrino identity. |
| `sourcePathId` | Solver-owned source path-history id. |
| `receiverPathId` | Solver-owned receiver path-history id. |
| `sourceSegmentId` | Source path segment used by the causal-root solve. |
| `receiverSegmentId` | Receiver path segment used by the causal-root solve. |
| `emissionTime` | Source time $t_0$. |
| `hitTime` | Receiver time $t$. |
| `fieldSpeed` | Causal field speed $c_f$ used by the row. |
| `outerRadius` | Simulation-window outer radius $L$ used by the row. |
| `boundaryShellLabel` | Shell-patch label and direction when the row depends on outbound or inbound boundary statistics; null for retained local rows. |
| `sourcePositionAtEmission` | Source position at $t_0$ in the active simulation-window chart. |
| `receiverPositionAtHit` | Receiver position at $t$ in the active simulation-window chart. |
| `boundarySourceSummaryId` | Boundary-shell patch-statistics summary id when the source is boundary-generated; null for retained local source history. |
| `causalRootId` | Root-ledger or causal-root row id. |
| `rootResidual` | Residual of the causal-root equation. |
| `wakeStrength` | Solver-owned wake strength or acceleration contribution before display transforms. |
| `receiverAccelerationContribution` | Vector contribution to receiver acceleration when the solver emits row-resolved acceleration. |
| `branchRowId` | Branch row id when a branch diagnostic depends on this wake row; otherwise null. |
| `evidenceStatus` | `retained-local-evidence`, `boundary-generated-value`, `display-only-visualization`, or `fail-closed-value`. |
| `valueAuthority` | Diagnostic status for the row value, using the app value-authority vocabulary. |
| `errorBudget` | Row-level root, wake-strength, boundary replay, and acceleration-contribution error bounds. |
| `rowStatus` | Retained, background-ineligible, boundary-generated, insufficient history depth, exceeded error budget, missing boundary-shell summary, or another first-failure status. |

### Retained Local And Boundary-Generated Evidence Split

The app must separate retained local evidence from boundary-generated values.

| Evidence status | Admission rule | Claim limit |
| --- | --- | --- |
| `retained-local-evidence` | Same-record source and receiver path history exists inside the active window; the causal root is solved inside the declared `errorBudget`; and the row does not depend on statistical boundary replay. | Supports local simulation-window diagnostics only. It does not prove the external unbounded universe state. |
| `boundary-generated-value` | The value is generated from outbound/inbound boundary-shell patch statistics with an explicit boundary-shell patch label, summary id, sampling policy, seed, and error budget. | Supports reduced-model boundary input only. It cannot stand in for retained path history, retained wake evidence, branch evidence, or same-record causal-root proof. |
| `display-only-visualization` | The value is drawn only to preview boundary behavior and does not feed acceleration, wake rows, or diagnostics. | Helps inspect possible boundary behavior but has no solver authority. |
| `fail-closed-value` | Verification is incomplete because the run needs boundary interpretation but lacks a required boundary-shell patch summary, retained path binding, causal-root record, error budget, replay validation, or record-conservation proof. | Blocks authoritative acceleration, branch evidence, retained wake evidence, and unbounded-window claims for the affected receiver, region, or run. |

## Simulation-Envelope Wake Row Rule

Every run must declare a simulation envelope before wake-history or boundary-shell output can be interpreted. The envelope is a run-manifest object with at least:

| Field | Meaning |
| --- | --- |
| `outerRadius` | Outer spherical envelope outer radius $L_{\mathrm{calc}}$. |
| `historyDepth` | Active causal-history time window $h$. |
| `wakeHorizon` | Wake travel length $c_f h$. |
| `wakeFloor` | Declared per-row wake-strength or acceleration-contribution floor. |
| `errorBudget` | Declared numeric error allowance for root solving, wake-strength evaluation, aggregation, and replay. |
| `boundaryMode` | Local window or statistical boundary shell. |
| `centralBall` | Interior observation region $\mathcal C$. |
| `centralBallRadius` | Displayed central-ball radius $r_{\mathrm{central}}$. |
| `radialBufferMargin` | Radial distance $b_{\mathrm{shell}}(\mathcal C)$ from $\mathcal C$ to the outer boundary shell. |
| `centralArchitrinoCount` | Target count $N_{\mathcal C}$ inside the displayed central ball. |
| `architrinoCount` | Total target count $N_{\mathrm{calc}}$ inside the outer spherical envelope. |
| `bufferArchitrinoCount` | Computed exterior count $N_{\mathrm{calc}}-N_{\mathcal C}$. |
| `centralVelocityBound` | Declared or measured $v_{\max}$ for architrinos that can affect the central ball during the observation interval. |
| `centralObservationInterval` | Time interval $T_{\mathcal C}$ used by the strict central-ball buffer target. |
| `centralBoundaryTolerance` | Declared $\tau_{\mathcal C}$ for $R_{\mathrm{boundary\to central}}$. |
| `aggregationBins` | Time, boundary-shell patch, source population, receiver population, and strength bins used for background/noise rows. |

The app may not display receiver acceleration as authoritative unless every candidate row inside the declared envelope is classified as exactly one of these records:

| Class | Admission condition | Required record |
| --- | --- | --- |
| Resolved wake row | Same-record source and receiver path history exists; the causal root is solved inside `errorBudget`; and the wake contribution is at or above `wakeFloor`, or the selected diagnostic/branch depends on the individual row. | A retained wake row with source id, receiver id, source path id, receiver path id, emission time, hit time, causal-root id, residual, wake strength or acceleration contribution, value authority, and status. |
| Aggregated wake-noise/background row | The individual row is below `wakeFloor`; it is not selected; no branch row, retained record, or selected-object diagnostic depends on that individual row; and the aggregate bin can be bounded inside `errorBudget`. | A background/noise row with threshold, bin definition, omitted-row count, aggregate magnitude, error bound, source population, receiver population or region, boundary-shell patch summary when relevant, and claim-level downgrade. |
| Boundary-generated row | The value comes from a declared boundary-shell replay source with boundary-shell patch id, source summary id, sampling seed, replay policy, and error budget. | A boundary-generated row with reduced value authority and a claim-level downgrade. |
| Failure row | The run cannot prove resolved-row retention, admissible aggregation, or admissible boundary replay. | A not advanced row with first-failure code, affected receiver or region, missing field or exceeded bound, and value-authority downgrade. |

The classification is exclusive and exhaustive inside the declared envelope:

$$
N_{\mathrm{candidate}}
=
N_{\mathrm{resolved}}
+
N_{\mathrm{aggregated}}
+
N_{\mathrm{boundary}}
+
N_{\mathrm{failure}}.
$$

Forbidden silent truncation means:

1. no candidate wake row inside the declared envelope may be dropped without increasing either a resolved-row count, an omitted-row count in a background/noise row, a boundary-generated count, or a failure-row count;
2. a below-floor row may be aggregated only when the row is not selected and is not needed by any retained branch row, same-record binding, or selected-object diagnostic;
3. a missing boundary-shell summary in a boundary run is a failure row, not a background/noise row;
4. insufficient `historyDepth` is a failure row for affected receiver acceleration unless the manifest explicitly downgrades that acceleration to display-only or missing-error-budget;
5. boundary-shell replay may consume background/noise rows only after its validation row passes; it may not replace retained wake rows or repair missing same-record evidence.

## Boundary-shell patch-Boundary Replay

The app should support a candidate unbounded-window boundary experiment: characterize architrino and wake activity crossing the six boundary-shell patches of the simulation-window sphere, then introduce statistically similar inbound architrinos and wake-background histories through the boundary-shell patches. This is an approximation policy for unresolved external influence, not a replacement for retained path-history rows, retained wake rows, or same-record evidence inside the active window.

The first schema and validation fixture for this experiment lives in [boundary-shell-replay](boundary-shell-replay.md). That packet defines `borg-boundary-shell-summary.v1`, `borg-boundary-shell-replay-source.v1`, boundary-shell patch-summary extraction, statistical replay, and the $R_{\mathrm{shell\ replay}}$ pass/fail threshold.

Policy ladder:

1. `retained-window` — preserve retained path-history and wake rows inside the active window; this is the only local path that can support same-record branch evidence.
2. `boundary-shell patch-statistics-replay` — introduce statistically similar inbound architrinos and reconstructed wake history for unresolved external influence; value authority is reduced-model boundary input.
3. `display-only-preview` — show possible boundary-shell patch noise visually without feeding receiver acceleration or diagnostics; value authority is display-only.

## Boundary-Aware Wake Interpretation

When the active causal-history horizon is small compared with $L$, most retained wakes are local to the active window. When the horizon reaches the boundary-shell patch scale, wakes and architrinos can leave the window and external influence must be handled by retained external path history, statistically replayed boundary-shell patch rows, or diagnostics required for advancement. The app must make this visible because boundary-generated rows are not the same diagnostic situation as retained local rows.

Required diagnostics:

1. count outbound and inbound architrino boundary-shell patch crossings by boundary-shell patch and time bin;
2. count resolved wake rows, background/noise rows, and boundary-generated wake rows by boundary-shell patch and time bin;
3. show whether a selected receiver acceleration used retained local rows, boundary replay rows, background/noise rows, or a mixture;
4. report first boundary-shell patch-crossing time for the run envelope when available;
5. mark rows whose interpretation depends on the statistical boundary policy.

## Acceleration View

The acceleration view should decompose receiver acceleration by retained wake rows, boundary-generated rows, and background/noise rows:

$$
\mathbf a_j(t)
=
\sum_{r\in\mathcal W_j^{\mathrm{resolved}}(t)}
\mathbf a_{j,r}^{\mathrm{wake}}(t)
+
\mathbf a_j^{\mathrm{boundary}}(t)
+
\mathbf a_j^{\mathrm{background}}(t)
+
\mathbf a_j^{\mathrm{unresolved}}(t).
$$

The app may display this decomposition, but it must not promote it to proof evidence unless the same record binds source histories, receiver histories, causal-root rows, wake rows, and solver diagnostics.

## User Interface Design

The Borg application entry should open on the visual, property-based Assembly discovery surface. From there, the operator may start a new random simulation or select one exact registered configuration and hand its identity pins to the workbench. The workbench itself should open directly on the working simulation surface rather than another landing page. Both surfaces should remain minimal, elegant, contemporary, and parsimonious by default, with restrained controls, clear hierarchy, and no decorative chrome that competes with assembly inspection or simulation state.

Parsimony means the first screen should expose only the controls and statuses needed for the active run interpretation. Required solver state, value authority, error-budget status, wake-history gaps, boundary-shell status, and diagnostics required for advancement must remain reachable without turning the default view into a dashboard of every possible row.

Primary regions:

1. 3D simulation-window viewport with one faint dotted outer sphere, architrino positions, path trails, wake rows, boundary-shell rows, and diagnostics.
2. Left control rail for scale, initial conditions, EOM solver envelope, run controls, and seed/import controls.
3. Bottom timeline for playback, scrubbing, checkpoint selection, and event selection.
4. Right diagnostics rail for selected architrino state, path-history metadata, wake-history rows, acceleration decomposition, boundary-shell summary, and failure rows.
5. Export panel for run manifest, checkpoints, frame buffers, path-history streams, wake-history rows, boundary rows, and diagnostics.

The design should be dense and work-focused. Controls should favor exact numeric inputs, sliders for bounded values, toggles for binary flags, segmented controls for display modes, and icon buttons where the action is standard.

Minimal does not mean hiding required state. The default view should keep advanced solver diagnostics collapsed or contextual, but the app must still expose path history, wake history, boundary-shell rows, acceleration decomposition, background/noise rows, and failure rows whenever those records affect interpretation.

### Launch State

The app should launch into an initial-condition staging view at the start time, before the simulation is run. The default staging state is the editable `random` preset: architrinos scattered randomly in the spherical simulation envelope with a 50/50 electrino/positrino mix and random velocities. The visible scene shows the outer simulation-envelope boundary as one bright light-gray dotted sphere with editable architrino positions; it has no great-circle guides, and the central ball is not drawn as a second sphere. Velocity rays are off by default and available through the layer toggle or selected-object editing. The operator can set the number and mix of electrinos and positrinos, choose a velocity policy, and adjust initial positions, velocities, and simulation-envelope fields before starting the EOM solver run; those edits are pending initial-condition changes, not path history.

Velocity vectors should render economically as rays from each architrino, without arrowheads. The ray uses the architrino's stable display color, with red/blue reserved for runs that expose an explicit polarity or charge-sign display policy. The first logarithmic magnitude cue should be a lightweight floating exponent label shown on hover, selection, or endpoint drag; for a speed scale near $10^x$, the label displays `x`. The selected-object diagnostics must still show the exact velocity vector, speed, transform type, and value-authority status.

In `custom` staging mode, direct manipulation is part of the initial-condition editor: dragging the architrino point changes initial position, and dragging the velocity-ray endpoint changes initial velocity magnitude and direction. During endpoint drag, the viewport should show the floating order-of-magnitude label for the current ray length or speed scale. The viewport interaction must mirror exact numeric position and velocity inputs in the left rail.

### Visualization Resolution

Visualization resolution is display resolution, not solver resolution. Changing the canvas size, device pixel ratio, antialiasing, or render-scale policy must not change `outerRadius`, `architrinoCount`, `historyDepth`, wake-row retention, central-ball diagnostics, or solver precision.

The required output standard is **4K UHD**: 3840 by 2160 pixels. Produced screenshots, captures, review output, and quality-mode app views must meet this resolution. DCI 4K is a different cinema format, 4096 by 2160; the app requirement is UHD 4K at 3840 by 2160.

The app may use adaptive internal render scaling during interactive orbit, zoom, drag, or solver playback only to preserve responsiveness. That adaptive mode is an interaction fallback, not the quality output standard. Any value or image exported, reviewed, or presented as app output must be rendered or up-rendered to 3840 by 2160 and labeled with its render manifest.

The render manifest should record:

| Field | Meaning |
| --- | --- |
| `viewportCssSize` | Logical viewport size used by layout. |
| `renderPixelSize` | Actual drawing-buffer pixel size. |
| `devicePixelRatio` | Device pixel ratio requested by the browser or shell. |
| `renderScale` | App-selected multiplier used to keep interaction responsive. |
| `targetFrameRate` | Requested interactive frame-rate band for the run view. |
| `visualQualityMode` | `interactive-adaptive`, `quality-4k-uhd`, or `capture-4k-uhd`. |

The default first-screen interaction target may be `interactive-adaptive`: keep the sparse launch view responsive with `simulation-window` and `architrino-position` visible, velocity rays off, and 256 architrinos as the preferred design target. The required review and production output target is `quality-4k-uhd` or `capture-4k-uhd` at full 3840 by 2160. Resolution quality is display output and not stronger solver evidence.

### Deployment Budget

The app must measure deployment cost separately from EOM solver throughput. GitHub Pages serves static files; browser runtime work such as solver playback, WebGL/WebGPU rendering, browser heap use, and browser storage pressure happens on the client device unless a future service backend is introduced.

The first deployment budget should report:

| Budget | Meaning | Must not be confused with |
| --- | --- | --- |
| `bundleSizeBytes` | JavaScript, CSS, HTML, WASM, and app shell transfer size. | EOM solver step throughput. |
| `staticAssetTransferBytes` | Textures, generated JSON, scene data, captures, fonts, and other static payloads. | Browser heap after decompression or parsing. |
| `githubPagesBandwidthEstimate` | Expected monthly transfer from Pages based on bundle/assets and visit count. | Client-side compute cost. |
| `browserHeapBudget` | Expected browser heap for active state, manifests, path history, wake rows, buffers, and parsed assets. | GitHub Pages hosting cost. |
| `gpuMemoryBudget` | Expected GPU/WebGL/WebGPU memory for 4K UHD rendering, point buffers, line buffers, trails, wake visualization, and render targets. | Solver numeric authority. |
| `browserStorageBudget` | IndexedDB, Cache Storage, local replay datasets, captures, and downloaded manifests retained by the browser. | Git repository size or Pages published-site size. |
| `actionsArtifactBudget` | CI/review artifacts, generated captures, benchmark output, and logs retained by GitHub Actions. | Pages bandwidth. |
| `nativeSolverThroughput` | Steps, rows, candidates, and retained records per second under the EOM solver. | Static hosting or browser rendering pressure. |

The deployment budget must not advance when the app cannot distinguish static transfer, browser runtime memory, GPU memory, browser storage, GitHub Actions artifacts, GitHub Pages bandwidth, and EOM solver throughput. A beautiful 4K UHD render does not imply the deployment footprint is acceptable, and a small bundle does not imply solver or browser memory is safe.

Display-grade continuation keeps every causally reachable retained segment in the logical run history, but it must not serialize that complete prefix again at every increment. The first Display request establishes the worker-owned retained-history cache. Each later request names the exact cache token and per-path prefix count and carries only appended input segments; the ordinary case carries zero input segments because the prior accepted response is already the complete prefix. The response likewise carries only solver-published extensions, which the browser appends to its logical history. A cache-token, path-order, charge, or segment-count mismatch invalidates the optimization and permits one complete retransmission; it never permits uncertain prefix reuse or history deletion. Request queues must settle to value-free completion promises so a completed full response cannot remain retained merely as queue state.

Claim grade keeps the certified budget's fixed request-memory allocation. Display grade instead receives a local-service `borg-display-host-memory-envelope/v1` on every increment. On macOS, the service samples system-wide available-memory percentage through `memory_pressure -Q`, samples the persistent EOM worker's resident set through `ps`, and reuses a sample for at most one second. It preserves the larger of 20% of installed RAM or 2 GiB, with the reserve capped at half of installed RAM for small hosts. The next native admission ceiling is the prior native memory estimate plus memory currently available above that reserve, never below 64 MiB. If no growth remains above the reserve, Display stops with `display_host_memory_reserve` before issuing another native request. The host envelope changes resource admission only; it does not change EOM controls, delete retained history, or upgrade Display authority.

Browser frame retention and the selectable trail duration may release display frames and GPU trail points. They do not release EOM retained histories. A retained source segment may be freed only after a solver-owned causal-support certificate proves that no future requested receiver event can reach it. Leaving the visible simulation envelope or allowing a plotted wake to pass the current camera frame is not such a certificate, because camera framing is not part of the EOM causal domain.

## First-Screen Control Layout

The first screen should make camera navigation, viewport layers, and simulation-envelope scale controls physically and visually separate. The operator must not be able to confuse camera zoom with changing the simulation-window outer radius or solver scale.

| Region | Location | Contents | Boundary |
| --- | --- | --- | --- |
| Viewport camera cluster | Floating inside the 3D viewport, upper right or lower right. | Rotate/orbit, zoom, pan, reset view, fit window, focus selected. | Camera controls change only the rendered viewpoint. They must never edit `outerRadius`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, precision, or solver state. |
| Layer toggle strip | Floating inside the 3D viewport, upper left or top center. | `path-history`, `wake-streams`, `velocity-vectors`, `boundary-shell-status`, and `diagnostics` toggles. | Layer toggles change visibility only. They must not create, delete, or recompute solver rows. |
| Simulation-envelope panel | Left control rail, outside the 3D viewport. | `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `centralArchitrinoCount`, derived `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, `boundaryMode`, electrino/positrino mix, velocity policy, `duration`, `timeStepPolicy`, and precision claim controls. | These controls change the requested run envelope or pending initial condition and must show pending, accepted, rejected, or Not advanced disposition. |
| Exact-value readout | Near the simulation-envelope panel and selected-object diagnostics. | Exact `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `centralArchitrinoCount`, `architrinoCount`, `bufferArchitrinoCount`, camera zoom ratio, `scaleFactor`, `historyDepth`, `wakeHorizon`, selected time, frame index, selected architrino velocity, selected wake strength, diagnostic status, and value-authority status. | Must keep camera zoom and physical simulation scale in separate labeled rows. |
| Timeline rail | Bottom of the screen. | Linear local scrubber, logarithmic overview, current time, frame index, checkpoint id, and playback speed. | Timeline navigation changes playback/readback position only unless the operator explicitly changes the simulation envelope duration. |
| Diagnostics rail | Right side, contextual and collapsible. | Selected architrino state, selected wake row, error budget, diagnostic status, value authority, first-failure codes, and acceleration decomposition. | Diagnostics may explain a value but must not silently upgrade claim level. |

Required separation labels:

1. Camera controls must be labeled `View`.
2. Simulation-envelope controls must be labeled `Simulation envelope`.
3. Camera zoom must be displayed as `view zoom`.
4. Physical/window scale must display outer computed `outerRadius`, displayed `centralBallRadius`, and `radialBufferMargin` separately.
5. Model/display scaling must be displayed as `scaleFactor`.
6. `historyDepth` must show time units.
7. `wakeHorizon = c_f h` must show length units.

Interaction rules:

1. Mouse wheel, trackpad pinch, viewport zoom buttons, and fit-view commands control `view zoom` only.
2. Editing `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `centralArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, `boundaryMode`, or precision must occur only in the simulation-envelope panel.
3. A changed simulation-envelope or boundary-policy field must enter a pending state until the EOM solver accepts, reruns, rejects, or does not advance.
4. Layer toggles may reveal path history, wake streams, velocity rays, boundary-shell status, and diagnostics without changing run data.
5. Selected-object diagnostics must show both camera-independent solver values and any display transform used by the viewport.

## Logarithmic UI Exploration

The app should explore a logarithmic UI for quantities that naturally span many orders of magnitude. This is a design direction, not a license to hide the underlying run values.

| Surface | Logarithmic use | Required exactness |
| --- | --- | --- |
| Scale | Let the operator move across outer radius, central-ball radius, buffer margin, density, and visual scale ranges without huge sliders. | Show exact `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `scaleFactor`, and units beside the control. |
| Velocity rays | Use logarithmic ray length so slow and fast architrinos remain visible together. | Show the selected architrino's raw velocity and the ray scaling rule. |
| Wake strength | Use logarithmic opacity, shell thickness, or legend bins for resolved wake rows. | Show raw wake strength, threshold, and whether the row is resolved, boundary-generated, or background/noise. |
| History depth | Use logarithmic controls for active path-history window and replay duration. | Show exact history depth, storage estimate, and any solver admission warning. |
| Timeline | Allow logarithmic time navigation for long runs while preserving frame-accurate local scrub. | Show current time, frame index, and whether playback is linear or logarithmic. |
| Diagnostics | Group residuals, magnitudes, and event counts by order-of-magnitude bins. | Keep raw diagnostic values available on selection or hover. |

The UI must label transformed displays explicitly: `linear`, `log`, `normalized`, or `display-only`. A logarithmic control may help the operator navigate the run, but it must not change claim level, precision status, or solver diagnostics by presentation alone.

### First Logarithmic UI Prototype Rules

The first logarithmic UI prototype should test four surfaces: scale, velocity rays, wake strength, and timeline navigation. Each surface must show exact solver values beside or inside the interaction path. Logarithmic display is an app-facing projection unless the solver manifest explicitly marks the transformed value as authoritative.

| Surface | Prototype rule | Exact value requirement | Status requirement |
| --- | --- | --- | --- |
| Scale | Use a logarithmic slider or stepper for `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `scaleFactor`, `historyDepth`, and `wakeHorizon` ranges that span many orders of magnitude. The slider label should show powers or order bands, while the adjacent numeric fields hold exact values. | Always show exact `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, and units. | Values that change the simulation envelope must be marked as pending until the EOM solver accepts or reruns the envelope. |
| Velocity rays | Use logarithmic ray length for viewport readability, with each ray using the architrino's stable color and no arrowhead. Use a floating exponent label as the first magnitude cue during hover, selection, or endpoint drag; for a speed scale near $10^x$, the label displays `x`. | On hover, selection, or endpoint drag, show raw velocity vector, speed magnitude, exponent label, ray scale rule, and whether the ray is linear or logarithmic. | Ray geometry is `app-facing-projection`; the raw velocity remains `authoritative-solver-output` only when its error budget is valid. |
| Wake strength | Use logarithmic opacity, shell thickness, or legend bins for resolved wake rows and background/noise rows. Above-floor retained wake rows must remain visually distinguishable from boundary replay and background/noise. | Show raw wake strength or acceleration contribution, `wakeFloor`, threshold relation, row id, boundary-shell status when relevant, and exact diagnostic status. | Resolved retained rows may display as solver-backed; statistical boundary-shell patch replay and preview shells must remain reduced-model or display-only. |
| Timeline navigation | Use a dual timeline: a linear local scrubber for frame-accurate playback near the current time and a logarithmic overview for long-run navigation across sparse or dense event regions. | Always show exact time, frame index, selected checkpoint id, playback speed, and whether the active timeline interaction is linear or logarithmic. | Log overview positions are navigation aids; frame reads remain authoritative only when backed by the run manifest and stream index. |

## Viewport Layers

The 3D viewport should use optional layers that can be turned on or off without changing the solver run. Layers are display controls over solver-owned state, path-history streams, wake-history rows, boundary-shell rows, and diagnostics.

| Layer | Default | Visual rule | Data dependency |
| --- | --- | --- | --- |
| `simulation-window` | On and locked | Render one bright light-gray dotted sphere at the outer boundary shell; do not render great-circle guides, a second central-ball sphere, walls, panels, or filled boundary-shell patches. | `centralBall`, `centralBallRadius`, `outerRadius`, `radialBufferMargin`, and camera projection. |
| `architrino-position` | On | Render each architrino as a stable colored point or glyph. | Current solver state. |
| `path-history` | On | Render adjacent source rows as straight segments with no smoothing; trail styling and any playback interpolation are display projections. | Path-history stream and replay index. |
| `wake-streams` | Disabled until required rows exist | Render expanding causal spheres or shells only from retained wake rows; boundary-generated rows must be visually downgraded. | Wake-history rows, emission time, hit time, causal speed, boundary-shell status. |
| `velocity-vectors` | Off by default; toggleable in staging and playback | Render each architrino's current velocity as a ray using the same stable color as the architrino, with no arrowhead. Ray length should use logarithmic sizing so slow and fast paths remain legible together. | Current velocity, scale normalization, timestep policy. |
| `boundary-shell-status` | Contextual-disabled until required rows exist | Label outbound/inbound boundary-shell patch rows without cluttering local-only views. | Boundary-shell rows. |
| `diagnostics` | On and locked | Surface halt status, failure rows, background/noise rows, boundary-generated rows, unresolved rows, and claim-level downgrades near the selected object or run summary. | Solver diagnostics and run manifest. |

Velocity rays need a visual cue for magnitude beyond length alone, but persistent markings on every ray may be too busy. The first design should test a floating exponent label on the active ray only. Persistent ray markings are not part of the first app idea.

## First-Screen Layer Control Layout

The first-screen layer controls should keep the workspace minimal by default while making richer path, wake, velocity, boundary-shell, and diagnostic layers one click away. The layer strip belongs inside the 3D viewport, but it must remain visually lighter than the simulation state.

| Layer | First-screen state | Control placement | Selected-object behavior |
| --- | --- | --- | --- |
| `simulation-window` | On and locked. | The viewport renders one dotted outer boundary shell and no central-ball sphere or continuous guide. | Selection reports `outerRadius`, `centralBallRadius`, `radialBufferMargin`, `view zoom`, `scaleFactor`, and boundary mode in the diagnostics rail. |
| `architrino-position` | On. | First visible toggle in the layer strip; cannot be hidden while no other position-bearing layer is visible. | Selecting an architrino opens a compact viewport tag with id, diagnostic status, and speed; full state appears in the diagnostics rail. |
| `path-history` | On. | Toggle in the layer strip, with a small history-depth indicator. | Selecting a path segment shows segment time bounds and value authority in the compact tag; interpolation/error details remain in the diagnostics rail. |
| `wake-streams` | Disabled until required rows exist. | Disabled toggle in the layer strip; when rows exist, its menu must distinguish retained, background, and boundary rows. | Selecting a wake shell shows wake row id, source/receiver ids, boundary-shell status, and authority; residual and threshold details remain in the diagnostics rail. |
| `velocity-vectors` | Off by default; toggleable in staging and playback. | Toggle in the layer strip, with a logarithmic-scale marker when enabled. | Selecting a ray shows raw speed, transform type, and ray scale rule; vector components remain in the diagnostics rail. |
| `boundary-shell-status` | Contextual-disabled until required rows exist. | Toggle is disabled or subdued when no outbound/inbound boundary-shell patch rows exist. | Selecting a boundary-shell label focuses the related wake/path row and shows whether it is retained local, boundary-generated, or display-only. |
| `diagnostics` | On and locked. | Compact status and alerts remain available by default; the full rail stays collapsible. | Selected-object diagnostics appear first as compact tags; detailed tables live in the right diagnostics rail. |

The default visible stack is `simulation-window`, `architrino-position`, `path-history`, and diagnostics. Velocity rays remain available but off. Wake streams and boundary-shell status remain disabled until their required EOM rows exist, while the full diagnostics rail may stay collapsed so the first screen remains quiet.

Boundary display is part of the `architrino-position` layer: an architrino crossing the outer boundary shell contributes to the boundary-shell rows. Inbound architrinos generated by the boundary policy enter through the shell as boundary-generated rows with reduced value authority unless retained external path history is present. The central ball remains the primary visible region.

Layer strip rules:

1. Use icon toggles with tooltips for each layer, plus a single overflow menu for layer-specific options.
2. Keep the strip to one row on desktop; collapse into a compact layer button on narrow screens.
3. Show an active-count or warning mark on a layer only when it helps interpretation, such as unresolved wake rows, missing error budget, or exceeded error budget.
4. Never use a layer toggle to change the solver run, simulation envelope, or value authority.
5. If enabling a layer would show only display-only projections, label that state before rendering the layer.

Selected-object diagnostics should not clutter the viewport:

1. A selected object may show one compact viewport tag anchored near the object.
2. The tag should contain only object id, diagnostic status, one primary value, and value-authority mark.
3. Full details must appear in the right diagnostics rail, not as large floating cards over the 3D scene.
4. Multiple selected objects should route to a compact list in the diagnostics rail; the viewport should highlight selected objects without opening multiple large tags.
5. Values with a Not advanced disposition may show a stronger inline alert, but the alert must link to the diagnostics rail rather than covering the simulation.

## Viewport Navigation

The 3D viewport must support rotation and zoom so the operator can inspect paths, wakes, boundary-shell rows, and velocity vectors from arbitrary angles.

| Control | Requirement | Boundary |
| --- | --- | --- |
| Rotate | Orbit the camera around the selected view center or selected architrino. | Rotation changes only the camera orientation, not solver state. |
| Zoom | Move the camera closer or farther, with smooth wheel, trackpad, and button controls where practical. | Zoom changes only the view scale, not `outerRadius`, `scaleFactor`, causal speed, or solver precision. |
| Pan | Translate the camera target across the viewport. | Pan must not shift the simulation origin or boundary-shell records. |
| Reset view | Return to the canonical sphere orientation and default zoom. | Reset is a display command, not a rerun. |
| Fit window | Frame the displayed central ball and active visible layers. | Fit must respect the current layer toggles and not alter solver output. |
| Focus selected | Center the camera on a selected architrino, wake row, path segment, or diagnostic row. | Focus should expose the selected object's source data and claim level. |

The interface should make the difference between visual zoom and simulation scale explicit. Changing the outer radius, central-ball radius, buffer margin, scale factor, history depth, wake floor, or precision belongs in the simulation-envelope controls, not the viewport camera.

## Error Budget and Value Authority

The app must make error budget visible enough that a visualization cannot be mistaken for higher-confidence evidence than the solver produced. An error budget is the declared and reported allowance for numerical error across a run or stage. Value authority states whether a value is authoritative solver output, an app-facing projection, a display-only visualization, or a halted/invalid value.

| Surface | Required fields | UI rule |
| --- | --- | --- |
| Run summary | Global error budget, selected precision path, tolerance policy, numeric chart, scale normalization, claim level, and halt status. | Always available in the run diagnostics summary. |
| Stage summary | Motion integration, causal-root solving, wake-row construction, path-history interpolation, stream readback, boundary-shell replay, and display projection error states where available. | Collapsed by default, expanded from diagnostics. |
| Selected architrino | Current state authority, position/velocity/acceleration error state, path-history segment error, and relevant solver status. | Shown in selected-object diagnostics. |
| Selected wake row | Causal-root residual, hit-time error state, wake-strength error state, boundary-shell status, threshold relation, and row authority. | Shown when a wake stream, shell, or acceleration contribution is selected. |
| Logarithmic display | Raw value, transformed value, transform type, and whether the transform is authoritative or display-only. | Shown in hover, legend, or selected-object panel. |
| Failure or downgrade | First-failure code, exceeded budget, unresolved field, and claim-level downgrade. | Must be visible without hunting through raw exports. |

## Diagnostic Status Vocabulary

The app should use a small diagnostic status vocabulary for every displayed solver-derived or visualization-derived value. These statuses are UI-facing labels over solver and manifest metadata; they do not change the underlying solver result.

| Status | Meaning | UI obligation |
| --- | --- | --- |
| `authoritative-solver-output` | The value comes from the EOM solver, is inside the declared error budget, and has the required run manifest, model contract, precision path, and value-authority metadata. | May be styled as authoritative; exact value, units, precision path, and error-budget state must be available. |
| `app-facing-projection` | The value is derived from authoritative solver output for rendering, downsampling, interpolation, binning, or logarithmic display. | Must identify the source authoritative value and the projection rule; must not be styled as raw solver output. |
| `display-only-visualization` | The value or geometry is drawn only to help the operator inspect the run, such as preview wake shells, visual trails, camera overlays, or non-authoritative layer effects. | Must be visually distinct from solver authority; must not feed receiver acceleration, branch evidence, or validation rows. |
| `missing-error-budget` | The value lacks the error-budget metadata required for its claimed use. | Verification is incomplete; the value must be shown as unavailable or warning and must not be styled as authoritative. |
| `exceeded-error-budget` | The value has an error budget, but the reported residual, precision status, replay residual, interpolation error, or stage error exceeds the declared bound. | Must show the exceeded budget and first-failure code; affected values lose authoritative styling. |
| `fail-closed-value` | The value is present only as a halted, invalid, or rejected result, or as a result for which verification is incomplete. | Must show whether verification failed or remained incomplete and block use in branch evidence, retained wake evidence, or authoritative acceleration displays. |

The status order requires verification for advancement by construction. If a value could match more than one status, the app must choose the least-authoritative applicable status in this order: `fail-closed-value`, `exceeded-error-budget`, `missing-error-budget`, `display-only-visualization`, `app-facing-projection`, `authoritative-solver-output`.

## Data Products

Every run should produce a `borg-dataset-manifest.v1` manifest; see [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md). The manifest records:

1. model contract and EOM solver version;
2. simulation-window topology fields and scale envelope;
3. initial-condition source and seed/import source id;
4. path-history stream ids and spill policy;
5. wake-history row ids, boundary-shell patch summary ids, replay source ids, and background/noise policy;
6. timestep, precision, tolerance, global error budget, stage-level error budgets, and halt diagnostics;
7. diagnostic status and value-authority status for solver outputs, app-facing projections, display-only layers, missing error budgets, exceeded error budgets, and values with a Not advanced disposition;
8. frame-buffer or playback dataset handles;
9. validation status and claim level.

### Executable First-Screen Contract

The executable `borg-app-surface-design.v1` contract is the design-owned `BORG_APP_SURFACE_DESIGN_V1` object in [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js), validated by `validateBorgManifest` and focused Borg tests. The source object owns the exact schema, source-manifest binding, layout-region list, layer states, render fields, first-failure codes, and developer-test constants. This packet does not duplicate those executable values.

The browser consumer is [borg.html](../../../borg.html), with [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js) and [main.js](../../../src/apps/borg/main.js). It must show the simulation before manifest detail, keep provenance detail collapsible, render recorded positions and paths without inventing geometry, and classify interpolated playback frames as display-only. Polarity-resolved diagnostics distinguish current outside-shell counts from first-crossing counts, use the evaluator's finite-width core scale for close-pair classification, and expose delayed-root source-motion ratios only as display diagnostics. None of these views is an acceleration measurement, binding result, or proof claim.

## Pass/Fail Conditions

The first app design pass should not advance if any of these occur:

1. an implementation path requires a new production solver;
2. architrino physical mass is introduced as an input or explanatory field;
3. boundary-generated architrinos are treated as retained identities without retained external path history;
4. boundary-generated wake rows omit boundary-shell source summaries;
5. subthreshold wakes are silently discarded instead of routed to background/noise rows;
6. path-history depth is insufficient but receiver acceleration is still displayed as authoritative;
7. JavaScript reference behavior is presented as production behavior;
8. an error budget is missing or exceeded while affected values are still displayed as authoritative;
9. boundary-shell replay is used as branch evidence or as a substitute for retained wake rows;
10. the app lacks a declared `centralBall` but presents central-ball conclusions;
11. the app collapses outer computed `outerRadius`, displayed `centralBallRadius`, and `radialBufferMargin` into one visual scale;
12. the app treats `centralArchitrinoCount` as the total solver `architrinoCount` after a nonzero `radialBufferMargin` is declared;
13. $b_{\mathrm{shell}}(\mathcal C)<\max(c_fh,\ v_{\max}T_{\mathcal C})$ while central-ball values are still presented as satisfying the strict central-ball buffer target;
14. $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$ while central-ball values are still displayed as inside the declared boundary-influence budget;
15. a candidate run is described as proof of AAA ontology without same-record retained evidence;
16. a taxonomy selection sphere permits zoom, draws the dotted globe or any interior object other than source-carried architrinos and paths, or clips the complete assembly at any allowed rotation;
17. a Borg path uses a color other than the exact standard color of its owning architrino; or
18. a path shows future history or an alternate base color; a two-occupant antipodal-circle trail extends beyond its preceding half-turn or fails to fade there; or a single-occupant circle is incorrectly restricted to a half-turn.

## Next Exact Proof/Build Burden

The next exact burden is `build-native-wake-history-and-boundary-residual-fixture`. The artifact must extend the EOM solver contract and bridge so Borg can add retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics on top of the current EOM-run frame/path products. Browser surface-budget and 4K render measurement remain required deployment-budget work, but they must not be treated as a substitute for EOM solver evidence or promote wake streams, boundary-shell replay, benign-noise status, or central-ball acceleration beyond the manifest's value authority and error-budget status.
