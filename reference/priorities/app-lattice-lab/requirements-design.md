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
- Every admitted case has an exactly neutral displayed population: half electrinos and half positrinos. All sites are architrinos; the red/blue distinction is their declared polarity.
- Render nearest-neighbor geometry with thin light-purple lines. These lines depict geometric adjacency, not physical bonds, wake paths, or acceleration vectors.
- Every displayed case names its geometry, occupied sites, polarity rule, scale convention, and finite/infinite boundary treatment.
- The visual presentation separates nearest-neighbor intuition from the complete declared acceleration ledger.
- The learner sees a simple state: `reference configuration` or `modified configuration`. Each canned reference case is backed by an internal case record that states its actual scope and cancellation basis.
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
- Reserve the top of that rail for a dynamic **What You're Seeing** card before the controls. It is a concise case-specific explanation, not a separate story sequence.
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
- Keep a small fixed, labeled XYZ orientation tripod in a corner, a faint transparent unit-cell frame, and optional layer/slice planes as depth anchors.
- Offer Front, Side, Top, and Reset camera actions.
- Support cutaway, slice, and layer modes so users can inspect cubic planes, close-packed layers, and supercells.
- Make the selected site visually unambiguous and preserve it while the user changes camera view.

### Case Panel

- Name the lattice geometry and polarity construction.
- State coordination number, nearest-neighbor distance convention, and red/blue population for the declared **polarity repeat cell**.
- State the geometric site density $n=C/d^3$ and, when helpful, the equal per-polarity density $n/2$.
- State the boundary treatment explicitly: finite diagnostic, periodic visual repetition, or a named symmetry/exhaustion convention.
- Show whether the learner is viewing the canned `reference configuration` or a `modified configuration`, plus a short plain-language scope note.

### Neighbor-Shell Fields

The gallery table carries each case's local **neighbor-shell** fields: nearest shell, next local shell, and selected local total. Each canned case supplies the actual count and distance for those fields, plus red/blue counts where helpful. The total covers the declared local-shell depth only; it is not every site in the infinite pattern and is not created by the dotted display crop. The polarity repeat cell is the finite block that repeats both the lattice sites and their red/blue polarity pattern; it is distinct from a geometry-only unit cell and from the larger dotted display crop.

### What You're Seeing

The top-left card translates the active settings into a short paragraph for the learner. It should name the selected geometry—such as cubic, FCC, or HCP—the visible polarity population, the selected site or shell, and what the canvas is showing.

When a ledger result is available, the card should explain in plain language whether the displayed contribution groups cancel under the active declared scope, or identify what remains unavailable. It must not turn the finite display crop alone into an all-lattice conclusion; it may state an all-lattice result for a canned ideal infinite repeat whose declared symmetry construction covers every site.

### Lattice Primer

Reserve the lower portion of the left rail for a collapsible **Lattice Primer**. It teaches the selected geometry independently of the active acceleration result.

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
- When a permitted polarity edit changes the displayed residual, describe it as `cancellation broken: nonzero initial acceleration`, not as a stability verdict.

### Acceleration Ledger

The lower-right ledger makes the displayed cancellation reasoning inspectable rather than merely visual.

- Identify the selected receiver, active geometry/polarity case, and whether it is the reference or a modified configuration.
- Show the declared contribution groups or rows by shell/direction, polarity, contribution vector, and running displayed residual.
- State the calculation's coverage and boundary treatment beside the result.
- Keep unavailable, omitted, or unresolved rows visibly unavailable; never render them as a zero contribution.
- Treat any displayed total as a finite diagnostic unless the active case record supplies a stronger verified scope.

### Polarity Repeat Cell Miniature

The miniature above the ledger shows the active case's polarity repeat cell: its red/blue sites, labeled cell outline, and repeat directions when useful. It shares the main canvas's camera rotation exactly, is never mirrored or flipped relative to that view, and has no independent orbit control. Both views therefore turn by the same amount and in the same direction; camera reset resets them together. It is a compact schematic and orientation aid, not a second full canvas, physical boundary, or replacement for the dotted display crop.

## Exploratory Controls

Potential controls, all subject to later requirements:

- Case selector and reset-to-canonical-case action.
- Geometry selector for simple cubic, BCC, FCC, HCP, diamond-style, and future candidates.
- Canned gallery and named-variant selectors only; no free-form lattice or polarity-pattern authoring in the first version.
- A neutrality-preserving polarity-swap interaction: choose site A, then choose an opposite-polarity site B; the moment B is selected, their polarities exchange. A one-site flip is unavailable because it would violate the Lab's exact 50/50 population rule.
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

The first build should be a static, display-only case viewer reached through the Applications scene for direct operator testing. The Applications-scene ring is ordered alphabetically by displayed app title, with Lattice Lab added as the fourteenth entry; its visual start position is a layout choice, not a title-order rule. Its guided order is simple-cubic checkerboard, BCC two-sublattice, FCC, then HCP. FCC and HCP remain adjacent so the `ABC` versus `AB` stacking comparison is immediate. Simple-cubic alternating planes and diamond-cubic remain later named variants. The build has a declared finite display region, polarity rendering, and the A-then-B swap interaction. It should not initially solve the full delayed Master Equation, simulate release, predict trajectories, or certify an infinite lattice.

[LAT-001](simple-cubic-checkerboard-cancellation-certificate.md) selects the simple-cubic checkerboard as the first exact case. Its retained history is stationary, its numerical convention is $c_f=1$, and its infinite calculation boundary is a receiver-centered inversion-symmetric exhaustion. The certificate derives exact zero acceleration at release for every site under that declared exhaustion. The result does not extend to an arbitrary summation order, a modified polarity pattern, perturbative stability, or later EOM-solver evolution.

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
| Orthographic 3D camera interaction | Borg canvas runtime | Drag rotation, wheel zoom, named views, and Reset for the main canvas and the synchronized repeat-cell miniature. |
| 3D picking | Borg canvas runtime | Site selection and the A-then-B polarity-swap interaction. |
| Fixed visible marker-size convention | Borg viewport convention | All architrino markers stay one on-screen size. Borg currently uses point sprites, while this Lab needs solid sphere markers, so the visual rule transfers but not the marker implementation unchanged. |
| Left-panel collapse/expand treatment | Equation Mapping app | Reuse its established open/closed panel icon and behavior by extracting it into a shared runtime surface for Equation Mapping and Lattice Lab. |
| Top-right five-control navigation strip | Borg and other standalone apps | Reuse the standard Table of Contents, Back, Forward, Home, and Search controls rather than creating app-specific navigation. |
| Applications-scene routing | Existing app-scene runtime | Direct operator testing from the Applications scene. |
| Plain-language explanatory panel pattern | Causal Wake app | The top-left **What You're Seeing** card; it is adapted for the active lattice case, not reused as a story sequence. |

The left-panel treatment originates in Equation Mapping and is currently local there. The core build extracts that exact presentation into a shared runtime surface rather than creating a competing Lattice Lab control.

### Potential Migration to Borg

The Lab may later become a dedicated Borg workspace or hand selected cases to Borg. This is a possible migration path, not a first-version commitment.

That migration requires an EOM-solver path that can represent the selected many-architrino stationary retained history, produce the complete per-site causal-root ledger, and evolve the population without turning an unverified display result into a solver claim. Only then could a future `Run in Borg` action test the later behavior of a selected lattice case.

Until those conditions exist, the Lab remains a static geometry-and-ledger explorer in the Applications scene. Its reusable visual surfaces do not imply that Borg can yet evolve the displayed lattice.
