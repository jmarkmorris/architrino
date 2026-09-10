# Shared navigation, local controls and interface evidence

## 1. A common interface with distinct responsibilities

The Architrino web applications need recognizable navigation across different kinds of work: reading, inspecting geometric displays, editing structured documents and controlling simulations. A common interface is useful when an action retains its meaning across those contexts. It becomes misleading when a familiar global button opens an unrelated local search or when a playback icon silently resets a model. The governing design therefore separates global navigation, document tools, application modes and domain controls.

This manuscript synthesizes the shared UI standards, their runtime design and the recorded migration evidence. Its design statements specify intended behavior. Its measurements are attributed to the retained September 2026 receipts and July transport-control record; they are not fresh measurements of the current applications. The evidence establishes bounded interface behavior on named surfaces and viewports. It cannot establish the correctness of particle data, molecular geometry, causal-root calculations, assembly classifications or simulation results.

### 1.1. Meaning before placement

Global navigation answers where the user can go in the Architrino site. Local controls answer what the current application does. A scene search can therefore occupy the shared navigation bar, while a reaction filter, equation search, molecule selector or library collection search remains with its own content. The same distinction applies to documents: an application-wide Documents entry may select supporting material, but controls for the document currently being read belong to that reading panel.

The shared bar sits at the top right of a canvas application, respecting safe areas, or at the right side of a sticky document header. The title remains outside it. A compact screen needs a deliberate row arrangement: the bar, title and domain controls must remain reachable without overlapping one another or widening the document. A wide scientific or editing surface may scroll internally without forcing the whole page to become wider than the viewport.

## 2. Navigation and document behavior

### 2.1. Stable action order and contextual presence

The canonical relative order is TOC, Back, Forward, Home, Search, Notes or Documents, Layout, Print or PDF, Settings, an eligible Edit or whole-application mode, and Close. Close belongs to a panel that can actually close. Unsupported actions are omitted rather than represented by permanently inactive promises. The relative order of the remaining actions stays stable.

Presence and availability are distinct. An application with meaningful history can display Back or Forward while disabling one at a history boundary. A surface with no applicable document layout or printing capability should omit that action. Descriptors and accessible names must describe what the current context actually supports.

Main navigation Home returns to the root scene. A standalone application's Home returns to Applications. It uses ordinary history-preserving navigation, so Home itself does not erase the route the user just left. Causal Delay Feedback is an explicit contextual case: its Previous and Next actions are lesson history, owned by the lesson controller, rather than browser Back and Forward. Its first lesson can have Previous present but disabled.

### 2.2. Search is a global scene operation

Shared Search searches the scene index. It must not be rebound to equations, reactions, molecules, document names or a collection merely because those applications also have useful local search. A global search popover initializes its actual index, makes the query field reachable and gives keyboard focus to it. Closing by Escape restores focus to the opener; outside dismissal, query clearing and repeated opening must remain safe. Only one shared popover is open at once.

The distinction also governs conflicting local popovers. In Equation Mapping, opening global Search hides and closes the local toolbar's search or settings presentation and closing global Search restores the local toolbar. In PDG Edit it closes the local reaction picker and hides that row while the global popover is open. Those recorded arrangements protect access to both scopes of search without pretending that they share one data source.

A popover is bounded by the viewport and sized for its content. A fixed empty box or the assumption that every header fits on one row is insufficient. Destruction of a bar or controller must remove or abort listeners and clear stale focus references, so revisiting a page does not duplicate responses.

### 2.3. Reading tools and application modes

A Full Document action is meaningful when a displayed section has a parent document. Layout, Print or PDF, and Close belong to the active reading header. The recorded Main, Photon and Lorentz Geometry reading panels use this separation. The Main migration reports a 49-pixel header, 32-pixel controls and exclusion of the header from print output; Photon and Lorentz Geometry are unchanged references for the panel-local action model. Those Main measurements do not establish dimensions or print behavior on the other panels.

An application-wide mode may be an extension of the shared bar after Settings, or after Search when Settings is absent. Borg Diagnostics is the recorded example. An ordinary playback control, scene choice, solver setting, plot filter or document selector remains local. Eligibility for a shared mode is not evidence that an application has placed it there: Equation Mapping's recorded Search, Edit and Settings toolbar is local even though an eligible application-wide Edit mode is described by the standard.

## 3. One runtime and explicit ownership

### 3.1. Construction, composition and lifecycle

The runtime design assigns common DOM construction to one shared bar builder and common presentation to one stylesheet. Focused standalone navigation and scene-search adapters provide routing and search integration. Applications supply their host, action capabilities and callbacks; the shared runtime does not become the owner of their domain state.

Construction receives a host, a bar label, action descriptors, and document and window dependencies. An action has a kind, identifier, accessible label, title and activation callback, with applicable pressed, expanded, disabled, controlled-element, popover and centrally registered icon information. The design rejects duplicate kinds or identifiers, unknown kinds or icons, missing labels and invalid ordering. Updating capabilities and destroying the instance are part of the contract, not incidental cleanup.

The Main and Animator adapters move the same constructed DOM tree between the Main scene header and the Animator header. Moving one tree preserves identity and avoids hidden duplicate identifiers and listeners. This is different from constructing two similar bars and concealing one: both can still receive events or be found by accessibility and application code.

The common runtime owns the arrangement and generic interaction rules. The page composition owns which actions apply, the navigation adapter owns its route contract, and the domain controller owns application behavior. This division gives each test an identifiable subject. A passing shared-runtime test does not establish that every page supplied the correct callback or that a local editor saved the intended document.

### 3.2. Visual and accessible construction

The standard calls for circular 32-pixel shared icon controls, 8-pixel gaps, dark translucent backgrounds, a thin border, current-color SVG artwork and visible focus. Shared typography uses the Helvetica Neue and Arial family. Border-box sizing and an explicit minimum height prevent generic application button rules from changing shared dimensions. Safe-area spacing and wrapping are preferred to shrinking controls until they become unusable.

Accessible names, keyboard operation, focus restoration and touch-target discipline apply to the whole interface, including lightweight exceptions. An icon is a visual representation of an action, not its only name. The artwork must be actual SVG with the correct namespace, a usable view box and painted child geometry. Emoji, text arrows, application-specific pseudo-elements and duplicated path definitions do not satisfy the shared icon contract.

The retained records contain a qualification to the broad square-control description. Several five-action bars report a 51.56-pixel-wide textual TOC control followed by four 32-pixel icon controls, all 32 pixels high. The later icon-repair receipt likewise distinguishes TOC text from four SVG navigation icons. These records do not establish that all five controls are square icons, and this synthesis does not invent a new canonical exception to reconcile the wording. The standard's general dimension statement and the measured textual TOC remain separately identifiable.

## 4. Surface classes and local application controls

### 4.1. Full navigation and deliberate exceptions

The migration record identifies fourteen full-bar surfaces: Main, Animator, Lattice Lab, Topo, Photon, Causal Delay Feedback, Greek Letter Match, Equation Mapping, PDG Edit, Molecule, Lorentz Geometry, Braid Search, Borg and Borg Library. That inventory is a source-time report of adoption. Establishing their present state would require current composition and browser checks.

A full bar is not imposed on every HTML artifact. The source distinguishes eight classes whose purpose supports a smaller or separately owned shell:

| Surface class | Appropriate navigation boundary |
| --- | --- |
| Public utility, such as Feedback | A compact Return to Applications action with local form controls; a full bar requires promotion to a workbench. |
| Public static operations page, such as Website Stats | Operations or Archie identity and local analytics opt-out. Public static hosting is not access control; a private service would require authentication. |
| Public reference, such as Branding and Marketing | Its existing return to Branding and Marketing in Archie and local section navigation; no duplicate Home merely to imitate a workbench. |
| Developer harness, such as Solver GPU | Local development identity, compact Applications return and local benchmark controls; the declared Pages exclusion is separate from public-product classification. |
| Static review, such as PDG Review | A review artifact rather than an automatically promoted application. |
| Generated reading copy | Content owned by its reading shell; do not hand-edit generated copies to add navigation. |
| Native reader content | SwiftUI Reader Shell and Search Snippet integration rather than a web standalone bar. |
| Local children's-book review export | An export review surface, exempt unless explicitly made a public product. |

Earlier lightweight classifications in the chronology must not override the later explicit distinction between a public operations page and an internal developer harness. Conversely, a declaration that a harness is excluded from deployment is not a fresh verification of build output. The retired Assembly Explorer redirect to Borg Library is not an additional active application.

### 4.2. Domain controls remain with their content

The local control arrangements preserve application meaning while sharing navigation:

| Application or group | Local responsibilities preserved by the recorded migration |
| --- | --- |
| Animator | Viewport and scene controls, EOM actions, clearing, library and document selection, Exit, timeline and canvas interactions. |
| Lattice Lab and Topo | Gallery and lattice controls, or scenario, playback and map controls. |
| Photon | Configuration search, presets, measurements, diagnostics, plots, supporting documents and simulation controls. |
| Causal Delay Feedback | Lesson list, replay and wake/chart controls; explicit Previous and Next callbacks own lesson history. |
| Greek Letter Match | Twenty-four choices, mode and symbol selection, answers, results and pronunciation. |
| Equation Mapping | Local equation Search, Edit and Settings and its index; the compact index remains collapsed even when a desktop preference had expanded it. |
| PDG Edit | Document picker, reaction filter, Exact and Probability controls and editing; the 1600-pixel reaction strip scrolls within its surface. |
| Molecule | Presets, atom ledger, formulae, names, links and opted-in external lookup; the desktop preset row clears the bar and the compact title sits below it. |
| Lorentz Geometry and Braid Search | Simulation and reading content, or the campaign dashboard and its controls. |
| Borg | Viewport and timeline locally; Diagnostics as the explicit global mode extension. |
| Borg Library | Collection search, filters, grouping, playback and a separate Workbench action, with responsive wrapping. |

These are UI ownership statements. Preserving a visible control does not validate its domain computation. A successful Molecule navigation receipt explicitly leaves molecular geometry, ledger values and external data unvalidated; the same separation applies to PDG reactions and Borg classifications.

## 5. Transport controls have stable meanings

### 5.1. Six actions and one stateful toggle

Play starts or resumes the current operation. Pause holds it at the current state. First Frame returns to the earliest frame while paused. Rewind moves backward without silently resetting unrelated state. Reset restores an explicitly defined scope, which should be named when necessary, as in Reset Time. Stop ends an operation and is distinct from holding it with Pause.

A Play/Pause toggle occupies one stable location and shows the next action. While running, it presents Pause and a pressed state of true; while held, it presents Play and false. The label, title, tooltip and accessibility state must stay synchronized with the action the next activation performs. Replacing a glyph does not authorize a change in playback, reset scope, button availability or application state ownership.

The shared icon module supplies six current-color SVG marks in a 24-by-24 view box, compatible with 18-by-18 presentation, using 2-pixel rounded strokes without fill. Play is a triangle; Pause has two strokes at horizontal positions 8 and 16; First Frame adds a left stop bar to a left-facing triangle; Rewind uses two left-facing triangles; Reset is counterclockwise; Stop is a small-radius 10-by-10 square. A Unicode pause mark, application-specific CSS shape or separately copied SVG paths would allow the visual language to diverge again.

### 5.2. Transport evidence and exclusions

The July record describes migration of five applications. Borg and Animator use Play/Pause and First Frame, with the old Restart label corrected where it meant the earliest frame. Causal Delay Feedback uses its toggle and Reset; Lorentz Geometry uses a toggle; Photon uses a Play/Pause toggle, a separate Play result action and Reset time. Camera or view reset is not automatically transport. Resetting all parameters or loading a preset is also a separate domain operation.

The work log reports 230 focused tests and browser Play/Pause checks on the five applications without console errors, plus visual inspection of Borg's two-stroke pause mark. It also reports passing scene and reading checks and one strict-content taxonomy-index warning that was not regenerated. These are historical instrument results. This manuscript neither reruns them nor establishes causal attribution for the recorded warning.

## 6. What the migration evidence establishes

### 6.1. Structural adoption and bounded page checks

The early standard and design entries distinguish specification and structural audit from runtime and visual evidence. The later migration record adds focused tests, page interactions and viewport captures. The eleven retained JSON bodies consist of ten capture receipts and one icon-repair check receipt. The ten capture receipts list 38 image records across their named routes and states. Their paths, byte counts and expected hashes are retained provenance; the historical PNG bodies were not opened or rehashed for this manuscript.

| Recorded batch | Named scope and reported result | Boundary retained here |
| --- | --- | --- |
| Main and Animator | Four capture records; the shared-runtime work reports 33/33 focused tests. A broader run reports 176/178. | The two broader failures are source-attributed to draft spacing and frame bounds; this campaign has not independently established their origin. One-tree host movement is distinct from domain correctness. |
| Lattice Lab and Topo | Five captures; 75/75 focused tests. A combined Topo run reports 114/115. | The source attributes the remaining failure to a legacy color-token expectation. That does not make the whole run green. Topo's narrow rail and bar clearance are bounded viewport measurements. |
| Photon | Two captures; 35/35 focused tests, global navigation, focus and responsive placement. | Inspector movement below the stage and visible document/simulation controls do not establish physical correctness. |
| Causal Delay Feedback | Two captures; 56/56 focused tests, lesson navigation and global-search separation. | Removing a stale duplicated-search CSS assertion is a test change, not an independent scientific check. |
| Lightweight headers | Four captures for Branding and the GPU harness; 8/8 focused tests. | The log also records an older harness static test unable to load a missing Markdown dependency. That failure is not repaired or reclassified here. Existing 42-pixel reference navigation is separate from the 32-pixel full-bar icon rule. |
| Greek Letter Match | Three captures; 44/44 focused tests, 24 choices, compact layout and title clearance. | Choice visibility does not validate pronunciation or learning outcomes. |
| Equation Mapping | Three captures; 82/82 focused tests, separate local toolbar, compact index and global Search behavior. | The record does not validate equation grades, editing persistence or mathematical content. |
| PDG Edit | Four captures; 39/39 focused tests, local-picker separation and an internally scrolling 1600-pixel strip. | No particle-data or editing-correctness claim follows. |
| Molecule | Three captures; 32/32 focused tests, preset clearance and compact title placement. | No geometry, ledger, external-data or scientific interpretation claim follows. |
| Lorentz Geometry, Braid Search, Borg and Borg Library | Eight captures; 73/73 focused tests, focus, routing and Borg Diagnostics activation. | These precede the later SVG diagnosis; Borg Library's bar is recorded at 34 pixels high in this batch. |

Search-open captures commonly record ten results and focus on the scene-search input, with no document-level horizontal overflow. These observations are specific to the recorded states. A source declaration that every page loads one stylesheet or uses a shared builder is useful implementation evidence but does not by itself establish painted icons, content clearance at all widths or correctness after arbitrary interaction histories.

PDG Edit illustrates a particularly useful distinction. At a 390-pixel viewport, the receipt records a 390-pixel surface client width and a 1600-pixel scroll width, with no horizontal document overflow. The strip is intentionally wide; the page is not. Molecule records 26 compact preset controls and a 12-pixel vertical gap between bar and title. Those measurements support the declared layout choices at the named viewport, not a theorem about every screen size.

### 6.2. Why visible shells did not prove visible icons

The later icon-repair receipt records an SVG namespace defect: the shared builder had created SVG elements and children in the HTML namespace. Button shells, labels, action order and search behavior could pass while the icon geometry had zero width and height. The earlier migration checks did not instrument that distinction. Their positive navigation and layout observations must therefore not be promoted into proof that all icons were painted.

The recorded repair uses namespace-aware element creation and addresses Borg Library's generic minimum button height so shared controls return from 34 to 32 pixels. The work log reports 46/46 focused tests; the log and repair receipt describe browser checks on Lorentz Geometry, Braid Search and Borg Library at desktop and compact viewports. It distinguishes one textual TOC control from four SVG icons and checks SVG namespace, nonzero geometry, control height, Search containment and Escape focus restoration.

Changing a shared builder can plausibly repair all of its consumers. That is an implementation-based inference. The retained browser measurement covers the three named pages and two viewport sizes, not a fresh visit to every one of the fourteen surfaces. A counterexample would be another consumer overriding geometry, constructing a different element path or applying conflicting styles; the corresponding page composition and browser output are where that inference must be tested. Even nonzero geometry should be read as the measured condition it is, rather than an unrestricted guarantee about every paint or accessibility state.

### 6.3. An evidence model for future interface work

The records motivate separate checks for semantics, construction, presentation and domain behavior. Semantic checks establish the action and its owner: global scene search, lesson history, a scoped reset or an application mode. Construction checks establish unique identifiers, one shared tree where required, lifecycle cleanup and correctly namespaced artwork. Presentation checks inspect actual geometry, viewport containment, focus and visible output on declared pages. Domain checks belong to the application and must not be inferred from successful chrome.

A retained receipt should make these limits recoverable: name the route, viewport and interaction state; identify the tested implementation and independent expectation; preserve failures alongside passes; distinguish expected image hashes from freshly inspected image bytes; and avoid calling a historical test result current. The standards and migration history can guide consistent interfaces without overstating what their measurements establish.
