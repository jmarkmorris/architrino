# Viewports

## Why this note exists

The composer now has two closely related but not identical visual jobs:

- a design viewport where we place assemblies, paths, reactions, and timeline objects;
- and a camera viewport where we judge what the authored shot actually sees.

Those are easy to confuse because both look at the same scene, but they serve different authoring questions.

- The design viewport answers: "What is in the world, where is it, and how is it moving?"
- The camera viewport answers: "What will the viewer actually see, when, and with what framing?"

The complexity comes from the fact that the same gesture can mean different things in each context. Dragging an object in the design viewport changes the world. Dragging a target in a camera viewport may instead change framing, shot intent, or a follow relationship. If those controls are not carefully separated and then reconnected, the tool becomes confusing very quickly.

## Standard designs

The common patterns in animation and editorial tools are familiar for a reason.

### 1. Single design viewport with camera overlays

This is the simplest approach. The main viewport remains the only large working surface, while camera frustums, safe frames, shot windows, and path guides are drawn into that same space.

Advantages:

- the author always works in one place;
- world edits and camera edits stay visibly connected;
- it uses screen space efficiently.

Costs:

- it can become visually busy;
- the user must mentally translate from "world view" to "viewer view";
- subtle framing mistakes are easy to miss.

### 2. Split design viewport and camera preview

This is the most standard professional layout. One viewport shows the scene structurally. A second viewport shows the active camera output.

Advantages:

- the division of purpose is immediately clear;
- framing can be judged while the world is still edited directly;
- shot changes are easier to debug.

Costs:

- it consumes more screen space;
- duplicated controls can become awkward;
- the relationship between the two views must be synchronized very carefully.

### 3. Picture-in-picture camera preview

This is a compromise. The design viewport stays dominant, and the camera view appears as a smaller inset or temporary panel.

Advantages:

- preserves canvas dominance;
- keeps the authored shot visible;
- scales well for casual authoring.

Costs:

- small previews are weak for precise framing;
- camera editing can feel secondary;
- the user may ignore the preview unless it is made salient at the right times.

### 4. Dedicated shot or camera mode

Some tools switch into a camera-editing mode where the controls change meaning.

Advantages:

- strong focus;
- fewer simultaneous controls;
- easier to teach advanced camera editing.

Costs:

- mode switching increases friction;
- it is easy to lose spatial context;
- authors may feel like they are leaving the scene rather than refining it.

## Why our case is harder

In a generic editor, the scene is often a set of meshes plus camera tracks. In the composer, the scene is not just geometry. It is assemblies, nested local frames, transport paths, reaction choreography, and delayed structure. That means the design viewport must remain truth-bearing about structure, while the camera viewport must remain truth-bearing about what the audience perceives.

Those are different truths.

For us, the camera is not only a recorder. It is part of the authored argument. A shot may need to reveal:

- a body-level proxy first;
- then the transport path;
- then orbital or shell structure;
- then constituent members;
- then transfer or reaction staging.

So camera design is inseparable from semantic zoom and reveal order.

## Common controls that should stay shared

The two viewports should not become two unrelated apps. They should share one authoring grammar.

Shared controls should include:

- timeline scrub/play state;
- active shot and active camera path;
- selection and focus target;
- point-of-interest targeting;
- object visibility filters like labels, paths, envelopes, and history traces;
- playback scale and pause/warp interpretation;
- and object identity, so a selected assembly in one view is the same selected assembly in the other.

The views can differ in what gestures do, but they should not disagree about what is selected, what time it is, or what object the user is dealing with.

## Common controls that should stay different

The views should diverge when the author intent diverges.

The design viewport should favor:

- placing assemblies;
- dragging path points;
- arranging members and subassemblies;
- and revealing structural guides.

The camera viewport should favor:

- framing;
- shot composition;
- follow and target behavior;
- lens or distance choices;
- and timing of reveals, overlays, and editorial emphasis.

The same selected object can therefore expose two different manipulations:

- world transform in the design viewport;
- framing relationship in the camera viewport.

## A strong Architrino-specific opportunity

We do not need to treat camera design as a totally separate subsystem. The Architrino assembly architecture gives us a better unifying idea.

The design principle should be:

- the camera is another authored participant attached to frames, paths, and targets rather than a detached global inspector.

That suggests a more intuitive model:

### Camera as an authored assembly-adjacent actor

Instead of thinking of the camera as only a hidden renderer, think of it as an authored observer with:

- a position path;
- a target relationship;
- a reveal state;
- and an overlay stack.

That means a camera shot can be described with the same kinds of anchors we already use elsewhere:

- attach to scene root;
- attach to an assembly frame;
- follow a path point;
- look at a selected constituent;
- inherit a local frame and then offset from it.

This is much more intuitive than separate piles of camera numbers because the author can think: "track this assembly from its parent frame" rather than "set global camera X/Y/Z and then fix the drift later."

### Camera frustum as a visible guide object

The camera viewport should be backed by a visible guide in the design viewport:

- shot origin marker;
- look target marker;
- connecting line;
- frustum or focus cone;
- and optional shot window planes.

That guide should be draggable and targetable like other composer objects, not hidden in a form.

### One scene, two lenses

The best near-term design is likely:

- one dominant design viewport;
- one smaller camera viewport or inset;
- both reading from the same authored scene state;
- and both sharing selection, time, and focus.

The design viewport would show structure. The camera viewport would show audience view. The user should be able to click an assembly in either place and keep working on the same underlying object.

### Semantic reveal tied to assembly scale

Because our scenes naturally move between proxy scale and constituent scale, the camera system should exploit that rather than fight it.

A shot could explicitly declare reveal behavior such as:

- proxy-only;
- proxy plus path;
- shell-visible;
- constituent-visible;
- transfer-focused;
- or reaction-stage focus.

This uses the existing assembly architecture to make the camera feel intelligent. The camera is not merely moving through space. It is selecting which level of Architrino structure the audience should be allowed to perceive.

### Overlay objects should be real timeline objects

Text notes, arrows, bubbles, images, and other graphics should not be special camera-only hacks. They should be timeline objects with:

- target attachment;
- local or world anchoring;
- fade-in and fade-out;
- and visibility rules by shot or reveal state.

That keeps the camera viewport and the design viewport synchronized because the overlay is part of the authored scene language, not a separate annotation layer.

## A practical staged direction

The likely staged approach is:

1. Keep the design viewport dominant.
2. Add the new timeline object palette for overlays and camera-related items.
3. Introduce a small camera viewport or inset tied to the active shot.
4. Make camera guide objects directly manipulable in the design viewport.
5. Let shots bind to assembly frames, local targets, and reveal states rather than only raw world-space coordinates.

That would give us a standard, understandable workflow at first, while still opening the door to a more native Architrino authoring model afterward.

## Recommendation

The composer should not choose between "design viewport" and "camera viewport" as competing modes. It should treat them as synchronized readings of one authored assembly world.

Standard tooling gives us the baseline:

- dominant design view,
- smaller shot preview,
- visible camera guides,
- shared timeline,
- shared selection.

The Architrino-specific improvement is to make the camera itself frame-aware, assembly-aware, and reveal-aware. That is the path to a camera tool that feels less like a bolted-on film editor and more like a natural extension of the assembly architecture itself.
