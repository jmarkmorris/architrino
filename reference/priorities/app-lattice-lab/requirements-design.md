# Architrino Lattice Lab Requirements and Design

## Purpose

**Architrino Lattice Lab** is a single-page, geometry-first educational explorer for idealized red/blue architrino arrangements. It asks a deliberately limited question: given a declared stationary arrangement, polarity pattern, and boundary convention, what does the displayed acceleration-cancellation ledger show at each site?

The lab is not initially a physical model of a void-filling medium, a stability solver, or an EOM closure instrument. It must distinguish a candidate construction, a finite visual calculation, and a certified exact result.

## Audience and Experience

The app should let a curious user see why lattice geometry, polarity population, and boundary treatment are separate choices. A user chooses a case, looks around the three-dimensional arrangement, selects a site, and inspects the geometric contributions that do—or do not—cancel.

The first version should feel like a laboratory: visual, manipulable, and explicit about what has been assumed. It should not make the user infer mathematical authority from a symmetric-looking picture.

## Release Thought Experiment

Each declared case begins with every architrino held at one fixed spatial position with velocity zero. Absolute time continues, and the retained history is an infinite stationary history at those same positions. All sites are then released synchronously.

The lab asks whether the declared complete acceleration ledger cancels at every site at release, yielding no initial acceleration and therefore no initial motion. This question remains separate from perturbative stability, later delayed-history behavior, or a physical medium claim.

## Design Principles

- Render the two declared polarities as solid spheres in the standard red and blue; their colors are visual labels, not evidence by themselves.
- Every configuration currently shown in the curated gallery has an equal-count displayed population: half electrinos and half positrinos. This is a population fact, not an acceleration-cancellation result. Any future finite random configuration must declare and verify its own population rule; equal counts are not a hidden universal assumption. All sites are architrinos; the red/blue distinction is their declared polarity.
- Render nearest-neighbor geometry with thin light-purple lines. These lines depict geometric adjacency, not physical bonds, wake paths, or acceleration vectors.
- Every displayed case names its geometry, occupied sites, polarity rule, scale convention, and finite/infinite boundary treatment.
- The visual presentation separates nearest-neighbor intuition from the complete declared acceleration ledger.
- The first version shows curated reference configurations only. Each canned case is backed by an internal case record that states its actual scope and cancellation basis.
- A zero residual at one selected site is not shown as an all-lattice result from the visible crop alone. A canned ideal infinite repeat may state an all-lattice result when its declared symmetry construction covers every site.
- Exact rest at a declared initial state is distinct from delayed-dynamics stability under a displacement, defect, or altered history.
- The app uses acceleration-first language throughout.

## Candidate Case Gallery

The following cases were collected from the earlier `aaa-lattice-lab` design exploration. They are a proposed gallery, not a current acceptance list. Each must become a defined canned reference case through the LAT-001 case contract before it appears in the Lab.

| Candidate case | Geometry question for the lab | Nearest shell | Next local shell | Selected local total | Site density $n$ | Visual teaching opportunity |
| --- | --- | --- | --- | --- | --- | --- |
| Diamond-cubic two-sublattice pattern | How can two interpenetrating FCC populations create tetrahedral local geometry? | 4 at $d$ | 12 at $4d/\sqrt6$ | 16 | $3\sqrt3/(8d^3)$ | Show a four-neighbor tetrahedral coordination environment; use zincblende-type ordering as the familiar two-sublattice example. |
| Simple cubic alternating planes | Can a plane-by-plane polarity rule preserve site-centered balance? | 6 at $d$ | 12 at $\sqrt2d$ | 18 | $1/d^3$ | Show rows, planes, opposite directions, and the difference between same- and opposite-polarity neighbors. |
| Simple cubic checkerboard | What changes when every nearest-neighbor bond alternates polarity? | 6 at $d$ | 12 at $\sqrt2d$ | 18 | $1/d^3$ | Make the bipartite structure and six equal nearest-neighbor directions visible. |
| BCC two-sublattice pattern | How can corner and body-center sites form an interpenetrating red/blue pattern? | 8 at $d$ | 6 at $2d/\sqrt3$ | 14 | $3\sqrt3/(4d^3)$ | Show eight nearest-neighbor directions and the two simple-cubic sublattices; use CsCl-type ordering as the familiar two-sublattice example. |
| FCC polarity patterns | How do close packing and triangular neighbor loops constrain two-color patterns? | 12 at $d$ | 6 at $\sqrt2d$ | 18 | $\sqrt2/d^3$ | Compare the twelve-neighbor shell with candidate alternating-plane and non-planar supercell colorings. |
| HCP layer patterns | What does a layered close-packed geometry add beyond FCC? | 12 at $d$ | 6 at $\sqrt2d$ | 18 | $\sqrt2/d^3$ | Show `ABAB` stacking, the six-in-plane plus three-above/three-below picture, and the distinction between a local shell and all-shell cancellation. |

The earlier exploration also suggested larger repeated polarity blocks for cubic Bravais lattices. The Lab may use those internally to define canned variants, but it will not expose a user-defined supercell editor in the first version.

Here $d$ is the selected geometry's nearest-neighbor spacing. Each site's geometric density is $n=C/d^3$, where $C$ depends on the lattice; the HCP row uses the ideal close-packed height ratio. Because every reference case is 50/50, each polarity has density $n/2$. These are geometric quantities only; the cancellation ledger and its scope remain separate.

## Core Screen

The single-page layout should center on a rotatable three-dimensional lattice view with a compact case panel and an inspectable selected site.

### Screen Regions

- Place the complete control panel in a left-side rail. It must be collapsible with the repository's established left-pane collapse/expand icon and behavior, rather than a new local control design.
- Reserve the top of that rail for a dynamic **What You Are Seeing** card before the controls. It is a concise case-specific explanation, not a separate story sequence.
- Reserve a **Shared Display Conventions** card at the bottom of the left rail for facts that hold across every currently shown curated case.
- Reserve a compact **Polarity Repeat Cell** miniature above the lower-right ledger.
- Reserve the lower-right region for the **Acceleration Ledger** associated with the selected site and active case.
- Keep the lattice view as the primary canvas between these two anchors, without allowing either panel to obscure the selected site or orientation frame.

### Lattice View

- Render occupied sites as equal-size solid red and blue spheres.
- Keep every architrino sphere at one fixed on-screen size, as in Borg; do not scale markers by near/far depth. Convey depth through occlusion, the orientation frame, layer cues, and camera motion instead.
- Place the rendered lattice inside a faint dotted sphere, reusing the Borg visual metaphor as a **display envelope**.
- Treat the dotted sphere as a viewport crop only: it is not a physical boundary or an infinite-lattice exhaustion rule. Neighbor lines that leave the visible crop may fade or terminate at it, alongside the visible note `display crop: continuation not shown`.
- Draw thin light-purple nearest-neighbor geometry lines between visible sites. Clip each line to the surfaces of its endpoint spheres and apply normal depth occlusion, so no line visibly runs through a solid sphere to its center.
- Show a selectable finite display region and repeated neighboring cells where helpful for reading periodicity.
- Provide orbit/pan/zoom, plus named camera views such as cell, plane, shell, and selected-site views.
- Keep the fixed, labeled XYZ orientation key in the lower-left corner. Its displayed footprint is $144\times132$ pixels, twice the original width and height. Treat the requested unit-circle idea as a centered equal-scale three-dimensional unit-axis construction rather than an added circle: X, Y, and Z each extend one unit in both positive and negative directions, follow the main view's unrestricted three-dimensional trackball quaternion, and place their labels beyond the positive projected endpoints. No axis, including Y, remains artificially screen-vertical; a full trackball gesture may introduce roll while the key remains synchronized. The default, case-reset, and reload orientation presents semantic +Z upward without relabeling or remapping model coordinates. The dotted spherical display envelope authors its polar caps on semantic $\pm Z$ and inherits the same root quaternion as the lattice and key. Optional layer/slice planes may provide depth anchors. Do not draw a cube-like frame around the lattice or repeat-cell miniature.
- Keep a compact polarity legend in the lower-right usable canvas area, clear of the inspector and orientation key. It places one red sphere labeled `Positrino` above one blue sphere labeled `Electrino`; each swatch has the same 16-pixel diameter and lit highlight/midtone/shadow treatment as the corresponding fixed-size canvas site marker at the live viewport. The legend is an accessible display key only and never changes polarity identities, calculations, or evidence.
- Keep direct drag-orbit and wheel zoom on the canvas. Do not show named-view or reset presets.
- Support cutaway, slice, and layer modes so users can inspect cubic planes, close-packed layers, and supercells.
- Make the selected site visually unambiguous and preserve it while the user changes camera view.

### Case Panel

- Use the selected gallery case title as this card's sole accessible heading. Update it on every case selection and render it in the established all-caps light-purple subpanel treatment; do not add a separate static `Active Case Record` label or duplicate title inside the card.
- Name the lattice geometry and polarity construction.
- State coordination number and nearest-neighbor distance convention. Keep current-gallery population and display-shape conventions out of this case-specific panel.
- State the geometric site density $n=C/d^3$ and, when helpful, the equal per-polarity density $n/2$.
- State the boundary treatment explicitly: finite diagnostic, periodic visual repetition, or a named symmetry/exhaustion convention.
- Identify the canned `reference configuration` and show a short plain-language scope note.

### Shared Display Conventions

The bottom-left shared-conventions card contains only facts verified across every curated gallery case. Its sole title is **Shared Display Conventions**, rendered in the same all-caps light-purple size, weight, and casing treatment as comparable card headings; it has no second title or subtitle. The card states `Every configuration in this curated gallery has equal numbers of electrinos and positrinos.`, explicitly as a population fact that does not establish acceleration cancellation. It also states that the main view uses a spherical display crop and that light-purple relationship lines show nearest-neighbor geometry rather than bonds, wakes, or acceleration vectors. Case-specific geometry, polarity rules, shell counts, density, detailed boundary treatment, evidence, and calculation scope remain in the Active Case Record. Future finite random configurations must declare whether their own assignment rule preserves equal counts; this curated-gallery card does not impose 50/50 as a universal rule.

### Neighbor-Shell Fields

The gallery table carries each case's local **neighbor-shell** fields: nearest shell, next local shell, and selected local total. Each canned case supplies the actual count and distance for those fields. The total covers the declared local-shell depth only; it is not every site in the infinite pattern and is not created by the dotted display crop. The polarity repeat cell is the minimal translational tile for both the occupied geometry and red/blue assignment. It may be skew or non-cubic. Each actual site has exactly one owned representative under a half-open fundamental-domain convention; periodic image spheres are display cues, not duplicate architrinos. The cell tiles space by translation only and is distinct from the larger dotted display crop.

### What You Are Seeing

The top-left card translates the active settings into a short paragraph for the learner. It should name the selected geometry—such as cubic, FCC, or HCP—the visible polarity population, the selected site or shell, and what the canvas is showing.

When a ledger result is available, the card should explain in plain language whether the displayed contribution groups cancel under the active declared scope, or identify what remains unavailable. It must not turn the finite display crop alone into an all-lattice conclusion; it may state an all-lattice result for a canned ideal infinite repeat whose declared symmetry construction covers every site.

### Lattice Primer

Reserve the lower portion of the left rail for an open, content-driven **Lattice Primer**. Its internal collapse control is disabled in the first version. It teaches the selected geometry independently of the active acceleration result.

- Name the lattice or stacking classification in ordinary language and standard shorthand, such as simple cubic, BCC, FCC, HCP, `ABAB`, or `ABCABC` where applicable.
- Explain the displayed unit cell, primitive versus conventional description when relevant, basis, coordination number, nearest-neighbor distance convention, and local coordination shape.
- Explain the geometric site density $n=C/d^3$: for a fixed lattice type, increasing the nearest-neighbor spacing lowers the site count per volume by the cube of that spacing. It is not a mass or physical-medium density.
- Show the standard symbols and a compact labeled diagram or key when that helps a learner read the canvas.
- Clearly separate geometry facts from the active polarity rule and from any cancellation evidence.
- Keep deeper definitions, notation, and classification detail available on demand so the left rail stays readable.

### Selected-Site Inspector

- List neighbors by shell, distance, direction, and displayed polarity.
- Toggle vector arrows for individual contributions and summed shell contributions.
- Allow a user to isolate one shell, one polarity, a plane, or a local coordination polyhedron.
- Report the displayed residual as a bounded diagnostic unless the case record states a stronger result.
- Make omitted or unresolved contributions visible rather than silently treating them as zero.

### Acceleration Ledger

The lower-right ledger makes the displayed cancellation reasoning inspectable rather than merely visual. Its result-first hierarchy shows a large icon-plus-text status, dimensionless normalized residual magnitude and vector on one line, and one plain scoped sentence before two concise shell totals. For the certified checkerboard, that sentence is `In this ideal repeating pattern, matching pulls cancel at every site at release.` Exact assumptions remain in the canonical certificate rather than a learner-facing scope disclosure. Non-certified cases must instead state that acceleration is not established. Individual rows remain behind `Show calculation` so the result and both shell summaries are visible at the live narrow viewport.

- Identify the selected receiver and active reference geometry/polarity case.
- Show the declared contribution groups or rows by shell/direction, polarity, contribution vector, and running displayed residual.
- State the calculation's coverage and boundary treatment beside the result.
- Keep unavailable, omitted, or unresolved rows visibly unavailable; never render them as a zero contribution.
- Treat any displayed total as a finite diagnostic unless the active case record supplies a stronger verified scope.

The future random fifty-fifty gallery case alone places a repeat/recalculate action on the same title row as **Site Ledger**. Its asset is a dedicated curved circular arrow with an arrowhead, not a reused standard navigation or refresh icon, and its accessible name states that it calculates a new random finite configuration. Deterministic curated cases do not render this action. The control and case must not ship until the random assignment rule, seed/provenance contract, exact 50/50 handling, and independent verifier are declared. Each activation creates a reproducible finite configuration and recalculates only that displayed finite ledger; it grants no repeating-pattern, all-space, motion, stability, energy, or conservation claim.

### Polarity Repeat Cell Miniature

The miniature above the ledger is headed **How This Pattern Repeats** without an additional instructional sentence. It shows the active case's owned repeat-cell sites and every nearest-neighbor relationship incident to them. A surrounding translated site may appear as a colored sphere only when the displayed node set also shows its complete induced exact-distance nearest-neighbor graph; an unexplained partial halo or orphaned context sphere is not allowed. When a minimal-tile view does not include a translated site as context, its boundary-crossing relationship terminates at a small non-site continuation marker rather than a duplicate colored architrino sphere. Every displayed relationship comes from the undeformed case's declared canonical nearest-neighbor identity set and uses the same solid light-purple treatment; no second-shell or decorative bridge is shown. Deformation changes those canonical relationships' displayed lengths without deleting, substituting, or adding identities. Every architrino sphere in both views uses the same fixed on-screen radius; ownership, continuation, selection, and highlighting never change sphere geometry. The finite miniature does not claim to contain the infinite lattice. Camera orbit is visual inspection, not a tiling operation. Dragging either canvas applies the same handed rotation to both views, and miniature wheel input zooms the full lattice, but these implementation instructions are not learner-facing copy. A default-off `Highlight repeat cell` control is overlaid at the bottom-left inside the bounded repeat-cell image subpanel and affects only the main canvas. When enabled, every nonselected ordinary light-purple relationship remains visible, while the ordinary segment for each selected identity is suppressed and replaced by the emphasized violet overlay; no thin light-purple under-stroke may remain through a selected violet edge. The active outline uses a `0.0176` cylinder radius, 20 percent thinner than the prior `0.022` treatment, and a slightly more violet `#b79cff` color. The two views may frame those edges differently but may not infer separate graphs.

## Exploratory Controls

Potential controls, all subject to later requirements:

- Curated reference-case selector.
- One fixed-X **Uniaxial Deformation** slider displays only $\beta\in[0,1]$: $\beta=0$ is the undeformed baseline and $\beta=1$ is the maximum supported nondegenerate deformation. Internally, the static X-axis coordinate scale is $s_x=1-0.99\beta$, so the endpoints are $s_x=1$ and $s_x=0.01$. Semantic Y and Z coordinates remain unchanged for every intermediate and endpoint value; the repeat miniature retains its undeformed uniform display-fit scale so viewport reframing cannot create an apparent second-axis stretch or switch which axis appears deformed. This app-specific $\beta$ is not velocity, relativistic $v/c$, or a Lorentz quantity. Render **Uniaxial Deformation** in the same all-caps light-purple size, weight, casing, and tracking as peer subpanel headings. The explanatory paragraph avoids force, motion, stability, and broader physical claims. The control applies to every curated case as a static geometry/view diagnostic. It transforms main and repeat-cell coordinates and nearest-neighbor lines while sphere markers remain fixed in screen size and red/blue counts remain unchanged. At exactly $\beta=1$, sites whose true transformed positions fall within one rendered marker diameter form reversible display-only groups: each multi-site group is drawn as one purple sphere, internal group edges and duplicate group-to-group edges are suppressed, and only distinct resulting-site relationships remain visible. Group metadata retains every underlying site and edge identity, and all original red/blue markers and relationships return below the endpoint and after reset or reload. This endpoint aggregation does not alter geometry, polarity data, calculation rows, evidence, or case claims. Only the simple-cubic checkerboard may show the existing positive all-site result, conditional on its declared inversion-pair check passing at the underlying $s_x$. Every other case remains diagnostic-only unless a separately authored per-case transformed periodic cancellation check independently establishes a stronger result.
- Geometry selector for simple cubic, BCC, FCC, HCP, diamond-style, and future candidates.
- Canned gallery and named-variant selectors only; no free-form lattice or polarity-pattern authoring in the first version.
- Polarity editing is deferred. The first version provides no one-site flip, two-site swap, or other non-reference configuration interaction.
- Red/blue visibility, neighbor-shell depth, vector, cell-boundary, layer, and polyhedron toggles.
- Finite-cell versus repeated-cell visualization, with a prominent statement that visual repetition is not automatically a complete infinite-lattice calculation.
- A comparison mode that places two declared cases side by side without implying a physical ranking.
- Packed-sphere display as an optional visual mode; the geometry-line view remains the default for reading interior sites.
- Left-rail collapse/expand through the existing shared icon and interaction pattern.

## Evidence and Computation Boundary

The app must not invent a cancellation result from display geometry. A case is only eligible for a positive cancellation statement after it supplies:

1. an exact coordinate and polarity specification;
2. the stationary retained-history assumptions relevant to the declared calculation;
3. the root/acceleration row class being summed;
4. a finite, periodic, or receiver-centered exhaustion rule;
5. a reproducible residual or symmetry proof covering the stated sites; and
6. an independent check appropriate to that result.

Until then, the app may show a proposed arrangement and finite visual vectors labeled `candidate` or `finite diagnostic`. It must not label it an equilibrium, stable state, physical medium, or full delayed-EOM evolution.

## First Implementation Boundary

The first build should be a static, display-only case viewer reached through the Applications scene for direct operator testing. The Applications-scene ring is ordered alphabetically by displayed app title, with Lattice Lab added as the fourteenth entry; its visual start position is a layout choice, not a title-order rule. Its guided order is simple-cubic checkerboard, BCC two-sublattice, FCC, then HCP. FCC and HCP remain adjacent so the `ABC` versus `AB` stacking comparison is immediate. Simple-cubic alternating planes and diamond-cubic remain later named variants. The build has a declared finite display region, polarity rendering, and no polarity-editing interaction. It should not initially solve the full delayed Master Equation, simulate release, predict trajectories, or promote an uncertified gallery case to an infinite-lattice result.

[LAT-001](simple-cubic-checkerboard-cancellation-certificate.md) selects the simple-cubic checkerboard as the first exact case. Its retained history is stationary, its numerical convention is $c_f=1$, and its infinite calculation boundary is a receiver-centered inversion-symmetric exhaustion. The certificate derives exact zero acceleration at release for every site under that declared exhaustion. The result does not extend to an arbitrary summation order, another polarity pattern, perturbative stability, or later EOM-solver evolution.

## Visual Tuning After First Render

Tune the visual distinction among local-neighbor intuition, ledger results, and the declared scope after the first Applications-scene render is available. This is a presentation refinement, not a blocker on the first build.

## Non-Goals for the First Version

- No physical origin claim for the $\mathbb{A}\mathbb{A}\mathbb{A}$ medium.
- No small-disturbance test: the Lab will not determine what happens after a site is displaced, a defect is introduced, or a retained history is changed.
- No energy or conservation calculation: showing no initial acceleration in one exact ideal configuration is not an energy-accounting or conservation proof.
- No Play/evolution mode in the first version: the canvas shows the held configuration and its ledger, not a time animation presented as EOM-solver motion.
- No automatic promotion of a visual symmetry into a theorem.
- No user-defined lattice, supercell, or polarity-pattern authoring in the first version.

## Reuse and Potential Migration

### Reuse in the First Version

The first version should reuse established app behavior where that behavior fits the Lab, while keeping the lattice-specific geometry and ledger as dedicated work.

| Reused surface | Source | Lattice Lab use |
| --- | --- | --- |
| Dotted spherical guide | Borg simulation-window guide | The display envelope around the visible lattice crop; it remains a display aid, not a physical boundary. |
| Orthographic 3D camera interaction | Borg canvas runtime | Direct drag rotation and wheel zoom for the main canvas and synchronized repeat-cell miniature; no named-view or reset presets. |
| 3D picking | Borg canvas runtime | Site selection for the neighbor-shell ledger. |
| Fixed visible marker-size convention | Borg viewport convention | All architrino markers stay one on-screen size. Borg currently uses point sprites, while this Lab needs solid sphere markers, so the visual rule transfers but not the marker implementation unchanged. |
| Left-panel collapse/expand treatment | Equation Mapping app | Reuse its established open/closed panel icon and behavior by extracting it into a shared runtime surface for Equation Mapping and Lattice Lab. |
| Top-right five-control navigation strip | Borg and other standalone apps | Reuse the standard Table of Contents, Back, Forward, Home, and Search controls rather than creating app-specific navigation. |
| Applications-scene routing | Existing app-scene runtime | Direct operator testing from the Applications scene. |
| Plain-language explanatory panel pattern | Causal Wake app | The top-left **What You Are Seeing** card; it is adapted for the active lattice case, not reused as a story sequence. |

The left-panel treatment originates in Equation Mapping and is currently local there. The core build extracts that exact presentation into a shared runtime surface rather than creating a competing Lattice Lab control.

### Potential Migration to Borg

The Lab may later become a dedicated Borg workspace or hand selected cases to Borg. This is a possible migration path, not a first-version commitment.

That migration requires an EOM-solver path that can represent the selected many-architrino stationary retained history, produce the complete per-site causal-root ledger, and evolve the population without turning an unverified display result into a solver claim. Only then could a future `Run in Borg` action test the later behavior of a selected lattice case.

Until those conditions exist, the Lab remains a static geometry-and-ledger explorer in the Applications scene. Its reusable visual surfaces do not imply that Borg can yet evolve the displayed lattice.
