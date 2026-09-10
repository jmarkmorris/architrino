# Composed Scenes, Observer Intent, and Recorded Motion

## 1. The Composed Scene as an Authored Object

### 1.1. A scene within a scene network

Animator organizes assemblies, paths, reaction timing, observer motion, overlays, and playback into a composed scene. Its subject is the authored presentation of those objects: where they appear, how their motion is staged, and how an observer encounters the explanation. A composed scene belongs within the explicit scene network. Collection and index scenes can point to it, and the normal manifest can identify it, while opening it enters a dedicated composed-animation runtime. Authored animation data supplies behavior that a scene accompanied by Markdown alone does not express.

This design keeps scene identity separate from the particular editor view. The canonical scene document is the durable authored object. Preview data, browser-local drafts, and downloadable scene JSON are different uses or representations of that object; transient panel state is insufficient as its interchange format. Directly authored assembly, path, and timing data and accepted imported staging material enter the same composition process. Referenced media contributes explanatory content without becoming assembly geometry.

The source design assigns Animator spatial staging, choreography, observer framing and autoscale, explanatory media, editing, preview, persistence, and export. Upstream ingest, solving, imported-source acceptance, and publication policy have separate owners. An imported scene is therefore accepted input to authoring, rather than an invitation to recompute its reaction logic. The [design account](design-and-interfaces.md) develops this authoring model; the [recorded-motion account](simulation-mode.md) defines the distinct boundary for EOM output.

### 1.2. Canvas-first editing and implementation scope

The intended editor is an overlay controlling a live three-dimensional viewport. Assembly actions belong on assemblies where practical, and path edits belong at path points or other local canvas interactions. Persistent side panels serve scene-level control; transport remains compact and adjacent to the timeline. This arrangement makes an edit's object and spatial consequence visible while keeping canonical JSON as the interchange representation.

The local implementation account reports a substantial runtime with canonical scene construction, previews, JSON export, browser-local drafts, and scene-tree, path, orbit, preview, and export workflows. It also reports timeline support for pause, warp, images, video, and graphics. These are source-reported capabilities, not fresh observations of a running application in this exposition. Audio and Observer menu entries are described as placeholder authoring blocks. Framing normalization, required and optional participation, autoscale target selection, and a first autoscale behavior are reported, while compact author-facing framing controls remain incomplete. The source also distinguishes an existing canonical structure bridge and narrow Split Group mutation from complete structural editing.

These distinctions matter to the design argument. A menu label does not establish a fully authored timeline object; working framing mathematics does not establish an editable, round-tripping framing interface; and one structural mutation does not establish a shared canonical transformation path. The following chapters explain the intended model without treating those gaps as completed implementation.

## 2. Two Views of One Authored State

### 2.1. Structure and perceived result

The design view presents scene structure: assemblies, paths, reaction choreography, nested local frames, and timeline objects. The observer view presents what an authored interval actually shows, including its emphasis, framing, and reveal timing. These are two readings of one scene, with different editing purposes. The design view must accurately represent the authored structure; the observer view must accurately represent its presentation to the audience.

A shared object identity connects the views. Selecting an assembly in either view selects the same assembly. Time, play state, active observer interval and path, selection, focus, and point-of-interest targeting must agree. Visibility filters for labels, paths, envelopes, and history traces, as well as playback scale and pause or warp interpretation, also belong to the shared authoring grammar. Unsynchronized states or clocks can make the two views disagree about the scene being edited.

Gesture meaning follows the selected editing domain. Moving an assembly or path point in the design view changes placement or motion; manipulating an observer guide changes a target, following relation, reveal emphasis, or other observation intent. The interface must make that distinction explicit. An observation edit must not silently move the underlying assembly, and a structural drag must not silently become an observation adjustment.

### 2.2. Layout alternatives

Four arrangements offer different ways to keep these readings available. The tradeoffs below are the design source's qualitative assessments, rather than measured usability results.

| Arrangement | Design benefit | Cost or limitation |
| --- | --- | --- |
| One design view with observer guides | One place to work, visible connection between structural and observer edits, economical use of screen area. | Guides can crowd the scene; the author must mentally translate structure into observed result; subtle framing errors can be missed. |
| Split design view and observer preview | Clear division of purpose, simultaneous direct editing and observation, easier inspection of interval and reveal choices. | Greater screen demand, potentially awkward duplicate controls, and a strict synchronization requirement. |
| Picture-in-picture observer preview | Preserves canvas dominance, keeps the active result visible, and suits casual authoring. | A small image limits precise composition; observation can feel secondary or be overlooked. |
| Dedicated observer mode | Strong focus, fewer simultaneous controls, and a clearer teaching context for advanced observation design. | Mode switching adds friction, can lose spatial context, and can feel like leaving the scene. |

The source's preferred near-term direction is a dominant design view with a smaller observer view or inset, both reading the same authored state and sharing selection, time, and focus. This is a design preference within the alternatives, not an independently established optimum or a claim that the arrangement is already implemented. The source's statement that the central viewport is the live observer view describes the observer-facing model; the separate design/observer discussion makes clear that an author also needs an explicit structural reading. The preferred arrangement preserves both purposes rather than identifying them.

## 3. Observer Intent and Semantic Reveal

### 3.1. The observer as a participant

The observer is an authored participant attached to frames, paths, and targets. This is a presentation model, not a claim that the renderer is a physical constituent of an assembly. Its authored state includes a position path, target relationship, reveal state, and overlay stack. An interval can anchor the observer at the scene root or an assembly frame, follow a path point, look toward a constituent, or inherit a local frame before applying an offset. Frame-relative authorship preserves the relationship being explained as an assembly moves.

Visible guides make those relationships editable. The design view can display the observer origin, a focus target, the connecting sight line, a focus cone or attention corridor, and optional composition or safe-region guides. Draggable, targetable guides expose the spatial consequence of an observer edit directly. Author-facing language uses “observer”; internal camera objects and the source-recorded camera-path and shot field names remain implementation vocabulary.

### 3.2. Framing an interval

A shot becomes an observer interval with teaching intent. It connects a time span to framing intent and synchronized observer-path behavior. Required assembly participation identifies what the interval must show; optional participation identifies what can appear without controlling every framing choice. Interval-level overrides refine those defaults. Autoscale consequently responds to authored intent instead of automatically fitting every visible object.

For example, a transfer-focused interval can emphasize the participating assembly and its destination while treating other displayed structure as optional context. This is an illustration of the design semantics, not a measured framing algorithm or an additional rule for physical transfer. The same scene can support a broader structural view and a narrower observer composition because visibility, required participation, and explanatory emphasis are distinct choices.

The six reveal choices retained in the design are proxy-only, proxy plus path, shell-visible, constituent-visible, transfer-focused, and reaction-stage focus. They connect the interval to assembly scale and explanatory purpose. Observer motion alone cannot express this change of meaning: moving nearer to an object does not by itself specify whether the audience should see its proxy, shell, constituents, or stage of a reaction.

### 3.3. Authored overlays and staged interaction

Text notes, arrows, bubbles, images, and other graphics are timeline objects. Each carries target attachment, local or world anchoring, fade-in and fade-out behavior, and visibility rules tied to an observer interval or reveal state. A callout attached to an assembly remains identifiable in both views because it belongs to the authored scene, not to an unrecorded editor annotation layer.

The source proposes five stages of interaction development: keep the design view dominant; add the overlay and observer-related timeline palette; introduce a small interval-linked observer view when needed; make observer guides directly manipulable; and bind intervals to assembly frames, local targets, and reveal states. This order expresses a design dependency from common scene state toward richer interaction. It does not report five completed stages.

## 4. Visual Grammar and the Meaning of Grouping

### 4.1. Primitives, reveal order, and rendering order

The design uses six rendered primitives: sphere, path, orbit or shell trace, ellipse or ellipsoid guide, callout leader, and text label. These provide a small explanatory vocabulary across scales. A sphere-like proxy can identify an object before its internal structure is relevant; paths reveal motion, and repeated traces or shells reveal repeated structure.

The preferred reveal sequence begins with the coarse sphere-like proxy, then exposes a path when motion matters, an orbit or shell trace when repeated structure matters, and constituent spheres with local paths when constitution matters. This sequence concerns what information is introduced. It is distinct from the preferred rendering stack, ordered as background field, path and orbit traces, sphere bodies and proxies, shell and ellipsoid guides, callout leaders, and text labels. The rendering stack organizes visual layers; it does not assert a physical ordering or derive a background-field model.

### 4.2. A composite label does not redefine an assembly

The source admits the phrase “composite of assemblies” for downstream display grouping. Its initial scope is metadata over related four-tile assemblies in lanes 1 and 20. Adjacency, labels, spans, reveals, and proxy or constituent presentation can be created or refined by staging or adapters after import. These restrictions belong to the recorded design scope; they are not a new universal classification of assemblies or a current solver claim.

A label tile or token such as “Photon” is artwork for the grouping's span, not an assembly row. The composite is neither a single assembly nor a dissociate or associate target. Dissociation begins from an individual upstream four-tile reactant, and association ends at an individual four-tile product. Transit and reassembly timing likewise remain anchored to the upstream assembly endpoints. Highlighting a composite around those rows does not make the grouping itself the object being opened or gathered.

This distinction protects interpretation at the app boundary. The visual editor can organize accepted objects for explanation without creating a new primitive, solver object, or reaction law. Imported grouping metadata must be explicit, and missing upstream geometry cannot be supplied by relabeling a display group.

### 4.3. Media as explanatory overlays

The source phase admits jpg, jpeg, png, and svg images; mp4 and mov video; and mp3 audio, stored in the relevant Animator image, video, and audio asset directories. It excludes webp, webm, aac, and m4a from that phase. These are attributed scope choices, not statements about current browser support, codecs, compatibility, or a newly selected media pipeline.

Images and video are viewport overlays rather than scene-space geometry. Their authored spans determine visibility, and the observer view provides direct dragging and resizing. Callout text, leader lines, and attachment to assemblies or path points remain the small explanatory overlay language. Listing an audio format in this boundary does not resolve the separate source-recorded Audio placeholder: media scope and a fully implemented authored timeline object are different requirements.

## 5. Canonical Structure and Data Boundaries

### 5.1. One model for reading and editing

Canonical scene structure must govern both what the editor displays and what its edits produce. The source directs existing read paths toward broader viewport and editor use, while moving mutation onto shared structure transforms. Parent and child nesting must describe local structure, rather than only collections of grouped identifiers. Nesting, scale, and transfer staging then remain coherent across authoring surfaces.

Unbound Architrinos are outputs of structure-changing edits in this design, rather than top-level add-menu stamps. Richer structure depiction follows the canonical edit path. This ordering prevents an increasingly detailed picture from outpacing the model that records its edits. The reported structure bridge and narrow Split Group path are useful starting points, but they do not establish completion of that shared transformation model.

### 5.2. Intake, composition, and output

Animator accepts authored scene documents and local drafts; directly authored assemblies, paths, and timing; accepted authored imports or equivalent explicit scene-staging contracts; and referenced media assets. It translates accepted inputs into Animator-owned scene state. Outputs include canonical composed scenes, preview data, local drafts, repository-ready JSON, and observer, framing, and overlay state suitable for downstream playback. Suitability for publication is a property sought of the output, not permission to publish it.

An adequate imported description retains participant identities and roles, solved mapping corridors or equivalent provenance paths, and stage timing for dissociation, transit, association, or reassembly. Timing remains bound to the individual assembly endpoints described in §4.2. Initial framing targets, flyby anchors, and explanatory labels or overlays convey observer hints without transferring upstream runtime ownership.

The boundary excludes upstream reaction re-solving, live upstream review state or request selections, external runtime imports for the handoff, and shared live UI state. The local account reports that dedicated staging data already carries observer framing, preview identifiers, and export scene data without importing an external app runtime. This is a source-reported implementation boundary; no new inspection of that runtime is implied.

## 6. Recorded Motion and Prescribed Motion

### 6.1. Distinct sources of motion

Recorded EOM motion and authored prescribed motion have different authority. Recorded motion supplies positions, velocities, field shells, and delayed hits from an accepted completed record. Authored paths provide intended motion for explanatory staging, observer work, and non-certifying scenes. Showing either source in the same application does not make their evidence equivalent.

The recorded-motion source assigns computation to the EOM solver, run initiation and inspection to Borg, and accepted-record playback to Animator. The reported Animator worker admits records, evaluates retained cubic histories, and packages typed frames. It has no integrator, master-equation evaluation, causal-root search, or scientific acceptance logic. Admission enforces the status and identity of an already accepted record; it does not create that scientific acceptance. Evaluating a recorded history at a display time is interpolation or evaluation of retained data, not a new EOM evolution.

### 6.2. Admission of a completed record

A versioned recorded-playback envelope identifies the exact evolution record, its canonical JSON SHA-256 pin, the model binding, the EOM engine and concrete version, the concrete run and claim grade, accepted evidence status, and completed run status. Each part has a distinct purpose: content identity detects altered bytes, while the contract, model, engine, run, and status fields identify what those bytes claim to represent. A content hash alone does not establish scientific validity.

The source's admission rule fails closed for stale or altered pins, envelope/record identity mismatches, foreign contract or model versions, non-EOM engines, failed claims, unaccepted evidence, and unfinished records. Its historical literal contract versions remain preserved in the supporting source; this explanation does not repin them or certify their compatibility with a later live contract.

The Animator document retains engine, run, contract, model, evidence, status, and record-hash provenance for recorded output. Frames, trails, field shells, delayed-hit views, and timeline playback must remain traceable to that record. Caching a playback dataset does not upgrade its authority or replace admission. Raw unpinned records do not become accepted output by being rendered.

### 6.3. A sealed prescribed-scene handoff

The reverse direction gives Borg a frozen display record of Animator-authored motion. The source describes validation of a normalized authored scene followed by the canonical Borg adapter's validation of the emitted assembly-view record. Separate identities pin the normalized source scene, the derived exact assembly, and the complete replay record. This distinguishes the authored input from its derived display representation and the bytes actually transferred.

The resulting record declares prescribed geometry, authored-prescribed motion, chart-hypothesis claim grade, display-only evidence, no physics invocation, and record-only replay. Validation rejects solver-derived or mixed motion, unsupported scene or motion schemas, missing paths or parents, invalid times or coordinates, and members without explicit electrino or positrino identity. Authorship is consequently visible as authorship; a display record cannot acquire evolved-record authority through transport.

The source-described transfer is a one-shot same-origin structured clone after validation and sealing. Borg checks the content hash and identity again and retains its own frozen copy. There is no shared store, continuing channel, or mutable scene object across that handoff. EOM continuation is disabled for this record class. The source calls the operation publication of a handoff, but it describes a bounded application transfer, not an authorization to release content externally.

### 6.4. Playback capability and evidence limits

The local completion account reports six outcomes: recorded histories drive playback without changing authored paths; both motion sources remain independently visible; planar and three-dimensional playback, trails, shells, delayed hits, and diagnostics consume recorded data; Animator has no JavaScript solve controls or production-solver bridge; focused tests cover accepted and stale, altered, unfinished, or incompatible handoffs; and content-sealed prescribed scenes reach Borg without shared mutable runtime state. These are attributed statements from the retained source record. This manuscript has not rerun those tests or inspected the implementation and does not extend their scope.

The interface boundary supplies a recorded-output chooser and playback diagnostics. Timestep, causal-root, particle, field-speed, integration, and run controls belong outside Animator. Offline and high-precision execution belongs to the EOM solver and Borg workflow. Authored paths and JavaScript reference, fixture, or comparison code cannot supply production results; display interpolation cannot substitute for evolution; and an authored prescribed-scene record cannot seed an EOM run. This separation lets an explanation remain visually rich while preserving the provenance of the motion it shows.
