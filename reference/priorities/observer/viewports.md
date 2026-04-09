# Viewports

## Why this note exists

The composer has two closely related but not identical visual jobs:

- a design view where we place assemblies, paths, reactions, and timeline objects;
- and an observer view where we judge what the authored interval actually shows.

Those are easy to confuse because both read the same scene, but they answer different questions.

- The design view answers: "What is in the scene, where is it, and how is it moving?"
- The observer view answers: "What will the observer actually see, when, and with what emphasis?"

The complexity comes from the fact that the same gesture can mean different things in each context. Dragging an object in the design view changes scene structure. Dragging a focus anchor in the observer view may instead change observation intent, follow behavior, or reveal emphasis. If those controls are not carefully separated and then reconnected, the tool becomes confusing very quickly.

One design rule should stay explicit from the start:

- `camera` may remain an internal runtime term;
- `observer` should be the user-facing metaphor.

The author should feel like they are shaping observation, not operating a film rig.

Another boundary should stay explicit too:

- viewport tools are downstream of accepted pdgedit output or an equivalent downstream staging contract derived from it;
- they should not solve the upstream composition again or repair missing upstream geometry;
- and they should treat upstream structure as authored input, not as something to reinterpret.

## Standard designs

The common patterns in animation and editorial tools are familiar for a reason. We should understand them clearly even if we adapt them to a more AAA-native language.

### 1. Single design view with observer guides

This is the simplest approach. The main viewport remains the only large working surface, while observer anchors, focus guides, sight lines, safe regions, and reveal guides are drawn into that same space.

Advantages:

- the author always works in one place;
- structure edits and observer edits stay visibly connected;
- it uses screen space efficiently.

Costs:

- it can become visually busy;
- the user must mentally translate from scene structure to observed result;
- subtle framing or emphasis mistakes are easy to miss.

### 2. Split design view and observer preview

This is the most standard professional layout in renamed form. One viewport shows the scene structurally. A second viewport shows the active observer output.

Advantages:

- the division of purpose is immediately clear;
- observation can be judged while the scene is still edited directly;
- shot and reveal decisions are easier to debug.

Costs:

- it consumes more screen space;
- duplicated controls can become awkward;
- the relationship between the two views must be synchronized very carefully.

### 3. Picture-in-picture observer preview

This is a compromise. The design view stays dominant, and the observer view appears as a smaller inset or temporary panel.

Advantages:

- preserves canvas dominance;
- keeps the active observer result visible;
- scales well for casual authoring.

Costs:

- small previews are weak for precise composition;
- observer editing can feel secondary;
- the user may ignore the preview unless it is made salient at the right times.

### 4. Dedicated observer mode

Some tools switch into an observation-editing mode where the controls change meaning.

Advantages:

- strong focus;
- fewer simultaneous controls;
- easier to teach advanced observation design.

Costs:

- mode switching increases friction;
- it is easy to lose spatial context;
- authors may feel like they are leaving the scene rather than refining it.

## Why our case is harder

In a generic editor, the scene is often a set of meshes plus view tracks. In the composer, the scene is not just geometry. It is assemblies, nested local frames, transport paths, reaction choreography, and delayed structure. That means the design view must remain truth-bearing about structure, while the observer view must remain truth-bearing about what the audience perceives.

Those are different truths.

For us, the observer is not only a passive recorder. Observation is part of the authored argument. One interval may need to reveal:

- a body-level proxy first;
- then the transport path;
- then orbital or shell structure;
- then constituent members;
- then transfer or reaction staging.

So observer design is inseparable from semantic zoom and reveal order.

## Common controls that should stay shared

The two views should not become two unrelated apps. They should share one authoring grammar.

Shared controls should include:

- timeline scrub and play state;
- active observer interval and active observer path;
- selection and focus target;
- point-of-interest targeting;
- object visibility filters like labels, paths, envelopes, and history traces;
- playback scale and pause/warp interpretation;
- and object identity, so a selected assembly in one view is the same selected assembly in the other.

The views can differ in what gestures do, but they should not disagree about what is selected, what time it is, or what object the user is dealing with.

## Common controls that should stay different

The views should diverge when the author intent diverges.

The design view should favor:

- placing assemblies;
- dragging path points;
- arranging members and subassemblies;
- and revealing structural guides.

The observer view should favor:

- emphasis;
- composition;
- follow and target behavior;
- distance and proximity choices;
- and timing of reveals, overlays, and explanatory attention.

The same selected object can therefore expose two different manipulations:

- scene transform in the design view;
- observation relationship in the observer view.

## A strong Architrino-specific opportunity

We do not need to treat observation design as a totally separate subsystem. The Architrino assembly architecture gives us a better unifying idea.

The design principle should be:

- the observer is another authored participant attached to frames, paths, and targets rather than a detached global inspector.

That suggests a more intuitive model.

### Observer as an authored assembly-adjacent actor

Instead of thinking of the observer as only a hidden renderer, think of it as an authored participant with:

- a position path;
- a target relationship;
- a reveal state;
- and an overlay stack.

That means an observer interval can be described with the same kinds of anchors we already use elsewhere:

- attach to scene root;
- attach to an assembly frame;
- follow a path point;
- look toward a selected constituent;
- inherit a local frame and then offset from it.

This is much more intuitive than separate piles of view numbers because the author can think: "follow this assembly from its parent frame" rather than "set global coordinates and fix the drift later."

### Observer guides as visible scene objects

The observer view should be backed by visible guides in the design view:

- observer origin marker;
- focus target marker;
- connecting sight line;
- focus cone or attention corridor;
- and optional composition or safe-region guides.

These guides should be draggable and targetable like other composer objects, not hidden in a form.

### One scene, two readings

The best near-term design is likely:

- one dominant design view;
- one smaller observer view or inset;
- both reading from the same authored scene state;
- and both sharing selection, time, and focus.

The design view would show structure. The observer view would show perceived result. The user should be able to click an assembly in either place and keep working on the same underlying object.

### Semantic reveal tied to assembly scale

Because our scenes naturally move between proxy scale and constituent scale, the observer system should exploit that rather than fight it.

An observer interval could explicitly declare reveal behavior such as:

- proxy-only;
- proxy plus path;
- shell-visible;
- constituent-visible;
- transfer-focused;
- or reaction-stage focus.

This uses the existing assembly architecture to make the observer feel intelligent. The observer is not merely moving through space. It is selecting which level of Architrino structure the audience should be allowed to perceive.

### Overlay objects should be real timeline objects

Text notes, arrows, bubbles, images, and other graphics should not be special observer-only hacks. They should be timeline objects with:

- target attachment;
- local or world anchoring;
- fade-in and fade-out;
- and visibility rules by observer interval or reveal state.

That keeps the observer view and the design view synchronized because the overlay is part of the authored scene language, not a separate annotation layer.

## A practical staged direction

The likely staged approach is:

1. Keep the design view dominant.
2. Add the new timeline object palette for overlays and observer-related items.
3. Introduce a small observer view or inset tied to the active interval when that becomes necessary.
4. Make observer guide objects directly manipulable in the design view.
5. Let observer intervals bind to assembly frames, local targets, and reveal states rather than only raw world-space coordinates.

That gives us a standard, understandable workflow at first, while still opening the door to a more native Architrino authoring model afterward.

## Recommendation

The composer should not choose between design view and observer view as competing modes. It should treat them as synchronized readings of one authored assembly world.

Standard tooling gives us the baseline:

- dominant design view;
- smaller observer preview when needed;
- visible observer guides;
- shared timeline;
- shared selection.

The Architrino-specific improvement is to make the observer itself frame-aware, assembly-aware, and reveal-aware. That is the path to an observation tool that feels less like a bolted-on film editor and more like a natural extension of the assembly architecture itself.

## Related Priorities

- [observer](../observer/observer.md)
- [composer](../observer/composer.md)
- [pdgedit](./pdgedit.md)
- [ellipsoid](../ellipsoid/ellipsoid.md)

## Related AAA Notes

- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [navigation-and-controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
- [scene-taxonomy](../../../content/markdown/aaa/archie/scene-taxonomy.md)
