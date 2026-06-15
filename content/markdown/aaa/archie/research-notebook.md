# Research Notebook

This notebook is a stylistic journal of major events in the evolution of $\mathbb{A}\mathbb{A}\mathbb{A}$.

It records turning points, major corrections, conceptual reframings, and other moments that materially changed how the theory was written, organized, or understood.

Each dated section should preserve the reasoning of the moment closely enough that later readers can see what changed and why.

Entries are maintained in descending date order, with the newest `##` section first.

## 2026-06-14: Molecule Visualization App

Relevant files:

- [Molecule Visualization](../../../../molecule.html)
- [Molecule app scene](../../../scenes/archie/molecule.json)
- [Applications scene](../../../scenes/archie/applications.json)

The standalone [Molecule Visualization](../../../../molecule.html) app is the project molecule-viewer surface. It gives readers a 3D ball-and-bond model for curated molecules and keeps the model connected to the Applications scene through the molecule scene entry.

The app supports curated and session molecule sources. Curated presets provide named structures such as water, caffeine, glucose, graphene, chlorophyll a, and nucleotide bases. A reader can also add a session molecule by entering a chemical formula and optional display name. If the formula matches a curated preset, the app opens that preset. Otherwise, the app queries PubChem for a compound name, CID, and SDF structure record; when PubChem returns a structure, the app adds that molecule for the current browser session. If live lookup is unavailable or no structure is returned, the app falls back to a session-only formula-composition model.

The display is meant for direct inspection rather than a static illustration. Readers can rotate the molecule by dragging the open stage, zoom the camera, shift the molecule across the stage by dragging an atom, and hover atoms to highlight them and swap the readout from molecule totals to atom-level totals. Clicking an atom routes into that atom's element visualization, so a molecule can be used as an entry point into the periodic-table and atom apps.

The app also carries an $\mathbb{A}\mathbb{A}\mathbb{A}$ bookkeeping layer. For the displayed molecule, and for each hovered atom, it reports formula or atom label, atom count, bond count, protons, neutrons, electrons, electrinos, positrinos, and total architrinos using the current typical neutral-atom estimate. This keeps molecule visualization tied to the same ledger language as the atom and periodic-table apps rather than treating chemistry as a separate visual island.

## 2026-06-13: Photon and Polarization Visualization

Relevant files:

- [Photon and Polarization Visualization](../../../../photon.html)
- [Photon Guide](photon-guide.md)
- [Mode Taxonomy](../interactions/mode-taxonomy.md)
- [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md)
- [Quantum Summary](../quantum/quantum-summary.md)
- [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md)

The standalone [Photon and Polarization Visualization](../../../../photon.html) app became the workbench for one simple photon idea: a photon-like packet might be modeled as two flat Noether swarms moving together along $x$. The trailing swarm rotates counter-clockwise, the leading swarm rotates clockwise, and the app shows both a face-on view for inspection and a side view closer to the actual geometry.

The app lets the reader change the candidate instead of only looking at a picture. Each swarm has `I`, `M`, and `O` binaries with enable switches, frequency, radius, and phase controls. The $\Delta x$ control changes the gap between the two swarms in the side view, while the Virtual Observer controls choose the $(x,y,z)$ point where the app calculates the displayed electric-field readout.

That electric-field readout is not hand-drawn. The runtime sums delayed contributions from the active architrinos, finds causal roots, weights them by the delay Jacobian, and reconstructs the transverse $\mathbf E$ signal at the Virtual Observer. The separate $\mathbf B$ graph is omitted because, in the plane-wave comparison case, $\mathbf B$ follows from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$.

The polarization panel asks what kind of field the candidate actually produces. It fits $E_y(t)$ and $E_z(t)$ over one cycle and reports whether the observed signal looks weak, linear, circular, or elliptical. This is a diagnostic result, not a proof: the app helps find promising planar-pair settings, but photon closure still requires a separate branch-ledger argument.

The supporting documents keep that boundary clear. [Photon Guide](photon-guide.md) explains how to use the app. [Mode Taxonomy](../interactions/mode-taxonomy.md), [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md), [Quantum Summary](../quantum/quantum-summary.md), and [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) state what still has to be recovered: stable transverse behavior, polarization, helicity, analyzer response, and no free longitudinal photon mode.

## 2026-06-10: Ideal Noether Swarm Lorentz Geometry

Relevant files:

- [Ideal Noether Swarm: Lorentz Geometry](../../../../ideal-swarm.html)
- [Ideal Swarm Guide](ideal-swarm-guide.md)
- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)

The standalone [Ideal Noether Swarm: Lorentz Geometry](../../../../ideal-swarm.html) app became the interactive inspection surface for the Noether swarm Lorentz-geometry lesson built around an oblate spheroidal envelope. Its purpose is to make one candidate Noether swarm deformation concrete: a nested swarm is shown inside a velocity-dependent envelope, the user adjusts $\beta=v/c_f$, and the app ties the visible flattening to $\gamma$, $\xi=R_{\parallel}/R_{\perp}$, relative time, relative length, and the normalized center-of-mass energy ledger. The controls also keep the lesson inspectable rather than merely illustrative: paths, surface, axes, orbit scale, cycle speed, and markdown overlays let the reader compare the moving geometry with the equations on the same screen.

The app deliberately does not claim to prove Lorentz kinematics from Noether swarm dynamics. It records the target geometry in a form that can be checked visually and algebraically: in the zero-extra-scale lesson case, the displayed oblate spheroidal envelope satisfies $R_{\parallel}=R_{\perp}/\gamma$ and $\xi=1/\gamma$. That makes the Lorentz factor more than a formula in a side panel; it becomes the aspect ratio of the displayed envelope. The app is therefore a dictionary between the formula, the return-cycle picture, and the geometry that a later branch-ledger derivation would have to recover.

The three supporting documents divide the burden cleanly. [Ideal Swarm Guide](ideal-swarm-guide.md) is the app-facing explanation: it defines the lesson purpose, the control meanings, the geometry dictionary, the energy and mass-equivalent readouts, and the claim level of the surface. [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md) gives the reader-facing bridge: the continuous observer-level Lorentz function is not replaced by a step function; the discrete object is the admissible material return-cycle branch whose longitudinal and transverse cycles close to the same period. [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) carries the deeper proof program, where the Lorentz laws must be derived from delayed substrate dynamics, stable translating branches, closure residuals, and bounded preferred-frame leakage.

Together these four surfaces turned the Lorentz lesson into a governed research object. The app provides the visible target, the guide explains how to read it, the bridge names the branch-indexed mechanism, and the kinematics chapter states the mathematical work still required. That separation matters because it lets the project use the app pedagogically without mistaking a visualization for a completed theorem.

## 2026-04-19: PDG Applications Failure and Reset

The PDG application work reached a reset point after roughly a month of effort. The original goal was to ingest Particle Data Group reaction data, map selected channels into $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly bookkeeping, build a provenance-aware reaction diagram, and then animate the resulting reaction sequence. The work started from the animator and moved backward toward data ingestion, which made the requirements unstable and pushed too much logic into JavaScript before the reaction-data problem was understood.

The main lesson was architectural. A static 2D reaction-diagram tool was needed before a live animation tool, and a PDG data-analysis stage was needed before either one. The later Python pipeline made that clearer by separating PDG access, filtering, reaction solving, and diagram export, but by then the broad PDG-to-$\mathbb{A}\mathbb{A}\mathbb{A}$ solver had already accumulated too much uncertainty.

The deeper content problem was that many PDG reaction records are not complete causal histories. Collider records often list downstream products of an initial collision, such as proton-proton scattering, while leaving unresolved or undetected intermediates, photons, recoil channels, and Noether sea participation outside the record. That makes the data useful for comparison and selected examples, but not sufficient by itself to generate complete $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction provenance.

Only a small number of channels, especially neutron and muon beta-family reactions, were suitable as initial illustrative cases. The broad PDG completion project was therefore archived as a general solver effort. The reaction-diagram and animator surfaces remain useful as teaching and authoring tools, but their role is now narrower: they should present curated, provenance-aware examples rather than imply that raw PDG reaction tables can be automatically completed into full assembly histories.

## 2026-03-17: Planar Three-Body Breather Bridge Frozen

Today the live breather bridge note, [master-equation-breather.md](../proof-programs/master-equation-breather.md), crossed from theorem discovery into proof-program freeze. The chapter now carries a coherent planar three-body route from the exact delayed master equation to a Schauder fixed-point target. In concrete terms, the many-body ladder now runs through: unreduced local well-posedness, gauge selection, quantitative no-accumulation of delayed events, bounded many-body caustic transit, finite active delay hypergraph control, cluster-valued ancestry and deep-past exclusion, multi-channel recapture, explicit convex-core construction, boundary trapping, invariant-envelope closure, and the final Schauder capstone.

The mathematical achievement is not just that these theorem packages now exist, but that the most dangerous analytic and topological threats were converted into explicit, load-bearing controls. The delayed branch geometry is now finite-state on one controlled cycle. Fold events cannot accumulate because the defect hierarchy produces a receiver-time event gap. Caustic passages no longer sit behind a symbolic fold ceiling: the fold-tube analysis now uses the exact change of variables
$$
dt=\frac{|\partial_s g|}{|\partial_t g|}\,du
$$
to cancel the apparent
$$
|J|^{-1}
$$
 singularity and yield a uniformly finite fold impulse ceiling. Deep-past memory is no longer an open combinatorial hazard: it is reduced to a finite ancestry complex, and the trapped-exchange loophole is closed by strict backward source-time drift along simple delayed branches. On the recapture side, the four principal escape channels now consume only fixed arithmetic ceilings
$$
F^{\mathrm{mb}}_m
\qquad
\text{and}
\qquad
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
$$
so the late comparison laws are no longer hiding qualitative path-history terms inside informal “smallness” language.

This milestone also removed the last major vacuity risks. The chapter now contains an explicit symmetric planar seed packet in Jacobi variables, a delayed seed-margin persistence bridge from Coulomb-like proxy geometry to the exact delayed branch sums, and a seed-centered realization of the explicit convex tame core. That means the closed convex fixed-point domain is no longer only an abstract target: it is anchored to one concrete physical three-body seed configuration with positive leading margins and explicit slack.

For $\mathbb{A}\mathbb{A}\mathbb{A}$ theory development, this milestone matters because it upgrades the master equation from a law written mainly for pair interactions into a realistic candidate law for composite architrino assemblies. The whole theory depends on the claim that stable particles, nested binaries, and Noether swarm-scale structures can survive the full delayed path-history dynamics rather than only reduced caricatures. This new planar three-body bridge is the first place where that claim is written in a mathematically serious many-body form. Delay hypergraphs, ancestry complexes, bounded caustic transit, and multi-channel recapture are exactly the structures needed once several interacting delayed source families are present at once. In other words, this is the first proof-program layer that begins to look like the delayed geometry actually required for emergent composite assemblies, rather than just for one protected binary toy model.

It also sharpens the status of the master-equation program itself. The central promise of $\mathbb{A}\mathbb{A}\mathbb{A}$ is that apparently singular or chaotic delayed effects, such as self-hit amplification, fold events, and long path-history memory, can still organize into stable physical assemblies with finite effective behavior. This chapter now shows, at the theorem-program level, how that could happen in the first genuine many-body setting: caustic spikes become finite impulses, deep-past memory becomes a finite ancestry count, and candidate scattering channels are forced into a finite recapture competition. That is directly relevant to the broader theory because the same mechanisms are supposed to underwrite the existence of higher assemblies, shielding, and eventually the dynamics of Noether swarm-like objects. The next phase is therefore no longer to invent more scaffold, but to prove that these delayed many-body control mechanisms really hold inside the master equation.

## 2026-03-16: 1D Collinear Breather Scaffold Reaches Fixed-Point Closure

The 1D collinear breather note reached a major threshold today. The document now contains an end-to-end proof scaffold from the dual-mollified delayed equation of motion to a Schauder fixed-point existence target for a periodic breather. In practical terms, the note no longer stops at local kinematics or heuristic turnaround arguments. It now tracks the entire cycle: inbound collapse, origin crossing, post-crossing recapture, outer-turn return, tame-history reentry, invariant-envelope closure, and the final closed convex domain needed for the fixed-point route.

The central technical gain was the conversion of the delayed geometry into explicit 1D comparison layers. The inward leg is now controlled by the collapse-to-crossing ladder and the pre-crossing caustic-transit analysis. The outward leg is controlled by the outer sorting map
$$
z(t)=x(t)-c_f t
$$
the deep-past suppression estimates, and the explicit trimmed-apocenter force margins. The note also now contains a seed-history construction
$$
\psi_{\mathrm{seed}}(\theta)=x_\ast-u_{\mathrm{seed}}\theta
$$
which closes the previous vacuity gap by showing that the section-side tame neighborhood is nonempty.

An important part of this progress came from repeated AI-assisted audit-and-repair cycles. Several of the hardest structural problems were identified and then turned into clearer theorem targets: the self-root birth at the inbound hinge, the integrable caustic impulse, the distinction between the reflected section state and the literal inbound section return, the deep-past outer self-root suppression mechanism, the outbound-level exclusion via $z$-descent, and finally the topological correction that replaced a domain/codomain mismatch in the Schauder step with a closed convex tame envelope. The result is that [The collinear breather program](../proof-programs/collinear-breather.md) now reads as a coherent global blueprint rather than a loose collection of local lemmas.

What remains is no longer broad theorem discovery. The scaffold should now be treated as stable and shifted into consolidation work: compress duplicated target-theorem language, unify notation across the local and global sections, and then decide which theorem layers should be promoted from proof-program statements into final theorem prose first.

Key victories inside this milestone:

- The collapse-to-crossing layer was separated cleanly from the delayed-root geometry, making the inbound Goldilocks crossing window an explicit theorem target.
- The inbound hinge at $\dot x=-c_f$ was reframed correctly: the self-root caustic is not something to forbid, but something to integrate through with a bounded impulse.
- The pre-crossing delayed geometry was organized around the sorting map
  $$
  w(t)=x(t)+c_f t
  $$
  which made hinge birth, self-root uniqueness, Jacobian recovery, and admissible-crossing preparation explicit.
- The return half was topologically repaired by distinguishing the reflected section state from the literal inbound section return, which fixed the geometry of the Poincaré map.
- The outer-turn problem was reduced to the outer sorting map
  $$
  z(t)=x(t)-c_f t
  $$
  together with explicit post-hinge descent, rather than being left as a vague delayed-force obstacle.
- Deep-past outward self-roots on the apocenter window were forced back onto the pre-crossing inbound leg, where they become unique and automatically transversal with $J_s>1$.
- The invariant-envelope synthesis was decoupled from circular bookkeeping by deriving the dynamical bounds first and only then choosing the larger topological slack constants.
- The affine seed history
  $$
  \psi_{\mathrm{seed}}(\theta)=x_\ast-u_{\mathrm{seed}}\theta
  $$
  removed the vacuity risk by giving an explicit nonempty section-side tame neighborhood.
- The final Schauder-domain mismatch was repaired by introducing a closed convex tame envelope
  $$
  \mathcal{K}_{x_\ast,\eta}
  $$
  so the fixed-point map now acts on a single matching domain.

## 2026-03-14: Dyadic Resonance Lock

Today the dyadic-lock note, [dyadic-resonance-lock.md](../dynamics/dyadic-resonance-lock.md), was rewritten around an explicit assumption package. The live note now begins from the exact ring identity
$$
v_k=2\pi f_k r_k=\beta_k c_f
$$
and then states explicitly the four assumptions that are actually doing the work.

The first assumption is the one that now carries the regime claim: outside the black-hole event horizon, and through the horizon-transition regime, the Middle binary is pinned at the field speed,
$$
v_M=c_f
$$
The second assumption is exact integer phase closure relative to the Outer period, $f_O:f_M:f_I=1:m:n$ with $1 < m < n$, so that when the Outer completes one cycle, the Middle and Inner also return to cycle start. The third assumption is fixed relative phase lock, and the fourth is a selection principle: among admissible integer locks, the realized one should be the one that maximizes cycle-averaged cancellation of the low-order far-field or effective potential signal.

Under these assumptions, the geometry is controlled by the integer pair $(m,n)$ together with the remaining speed factors $\beta_O$ and $\beta_I$. The immediate formulas are
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$
So even if one later tests the dyadic candidate $(m,n)=(2,4)$, the frequency lock $1:2:4$ does not force equal speeds and does not force self-similar radii.

The conceptual gain is that the note now separates three different burdens cleanly. Kinematics gives the exact identity above. Integer phase closure gives commensurate frequencies. The cancellation principle is then the extra ingredient that might select one preferred integer lock from the commensurate lattice.

This mattered for the larger program because the nested shell swarm has to satisfy several closure burdens at once: frequency hierarchy, horizon behavior, radiation suppression, and eventually an effective stress-tensor story for higher assemblies. The revised note now reads as a live research surface with explicit assumptions and explicit non-assumptions.

## 2026-03-12: Causal Jacobian Correction

Relevant files:

- [Master Equation: canonical form](../dynamics/master-equation.md#the-master-equation-canonical-form)
- [Master Equation: energy, Lagrangian, and Hamiltonian structure](../dynamics/master-equation.md#energy-lagrangian-and-hamiltonian-structure-of-the-architrino-dynamics)
- [Energy and conservation note](../dynamics/energy.md)
- [Causal action functional](../dynamics/causal-action-functional.md)
- [Lorentz near-miss in historical context](../philosophy-history/historical-context-and-missed-opportunities.md#lorentz-before-einstein-the-almost-substrate-moment)

This entry records a major correction to the master-equation architecture after an AI-assisted audit exposed a false simplification in earlier drafts. The earlier path had treated constant per-wavefront emission amplitude as if it implied a received force law depending only on $1/r^2$. That collapsed two distinct claims: the source emission cadence is constant, but the received causal flux depends on the geometry of delayed emission from a moving source.

The corrected master equation keeps the source-side causal Jacobian in the canonical per-hit law:
$$
\mathbf{a}_{ij}(t; t_0)
=
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}{r_{ij}^2(t;t_0)\,|J_{ij}(t;t_0)|}\,
\hat{\mathbf{r}}_{ij}(t;t_0),
\qquad
J_{ij}(t;t_0)=1-\frac{\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{ij}(t;t_0)}{c_f}
$$
The point of the correction is not that source strength itself changes with speed. The source emits according to the same constant-cadence rule. The velocity dependence enters because the source moves while laying down successive wake surfaces, so the receiver samples a compressed or dilated branch of the source's causal history. The factor $|J_{ij}|^{-1}$ is therefore part of the causal geometry of received wake flux, not an optional adjustment to a static inverse-square force.

This correction also clarified the status of receiver velocity. In the current canon, receiver velocity is not written as a separate source-strength factor in the per-hit magnitude at fixed $r_{ij}$, $\hat{\mathbf{r}}_{ij}$, and $J_{ij}$. It matters through the work rate $\mathbf{F}\cdot\mathbf{v}$, the future evolution of the receiver-source geometry, and the delayed branches sampled by the receiver worldline over time. Magnetic-like behavior remains an emergent closure target built from delayed geometry, Jacobian-modulated flux, superposed radial hits, and assembly/Noether sea response; it is not inserted as a primitive cross-product force.

The same audit also separated theorem-backed statements from closure targets. The current documents should not state, without local hypotheses, that the master equation is already the exact Euler-Lagrange variation of a completed non-local action or that global energy-momentum conservation is fully restored in every regime. The safer canonical stance is narrower: the regularized action-functional program supplies a variational lens, the per-hit law supplies the acceleration-first dynamics, and energy bookkeeping must state the assumptions under which work-energy, Noether-style, or action-based conclusions are being claimed.

Corpus repair targets after this correction were clear:

- remove bare $1/r^2$ per-hit laws where the causal Jacobian belongs,
- avoid splitting the theory into a permanent "reduced model" and a separate "candidate action" unless the local document is explicitly discussing an approximation,
- replace over-broad conservation claims with assumption-scoped theorem language,
- keep constant emission cadence distinct from received causal-flux modulation,
- and treat receiver-velocity effects as work-rate, branch-sampling, and emergent-closure structure unless a local derivation proves a stronger force expression.

The correction remains a major inflection point because it made the master equation a genuinely delayed branch law rather than a static inverse-square law with delayed labels attached. It also made future closure burdens sharper: self-hit walls, magnetic-like behavior, Lorentz behavior, and action/energy structure all need to be derived from the Jacobian-weighted delayed geometry rather than asserted through imported field-theory vocabulary.

## 2026-03-11 Closure Scorecard

A reusable prompt was defined to compare $\mathbb{A}\mathbb{A}\mathbb{A}$ to modern physics along two distinct axes: operational effectiveness and foundational mechanism. The resulting scorecard makes the comparison explicit rather than rhetorical, and it can be reused in later assessment cycles without changing the basic lens.

Relevant files:

- [Closure scorecard](../validation/closure-scorecard.md)
- [Reusable assessment prompt](../validation/closure-scorecard.md#reusable-assessment-prompt)
- [Assessment table](../validation/closure-scorecard.md#assessment-table)

The scores illustrate both sides of the present situation. They show where $\mathbb{A}\mathbb{A}\mathbb{A}$ already does well, especially in architectural coherence and ontic-mechanism framing, and they also show where the framework still needs more development and improvement, particularly in coverage depth, parameter closure, and several mathematical bridge areas. That makes the scorecard useful not just as a verdict sheet, but as a development map.

## 2026-03-10 Philosophy-History Leaf Schema

An important editorial-methodology step was added across the topic documents: each major topic can now define a systematic method for handling its heading-derived leaves, rather than letting individual units accumulate in an ad hoc way. The relevant philosophy-history documents now explicitly introduce unified coverage templates and conformance checks so every topic leaf is written through a deliberate set of areas to cover.

Relevant files:

- [Philosophy of Science subject template](../philosophy-history/philosophy-of-science.md#philosophy-of-science-subject-template-unified)
- [Major Thinkers coverage template](../philosophy-history/major-thinkers.md)
- [Information / Computation subject template](../philosophy-history/information-computation.md)
- [Crisis in Physics section template](../philosophy-history/crisis-in-physics.md#crisis-section-template-unified)

This is visible in documents such as [Philosophy of Science](../philosophy-history/philosophy-of-science.md), [Major Thinkers](../philosophy-history/major-thinkers.md), [Information / Computation](../philosophy-history/information-computation.md), and [Crisis in Physics](../philosophy-history/crisis-in-physics.md). Each one now opens by stating that the layer needs a standard coverage template, then defines the fields, the prose flow, and a conformance protocol for every topic leaf in that file.

The real gain is not just consistency of style. It is that the project now has a well-considered list of areas to cover when treating a leaf topic. Depending on the document, those areas include things such as the subject name and short name, the core question or tension, the historical problem pressure, what still works, what fails or overstates, relation to $\mathbb{A}\mathbb{A}\mathbb{A}$, transition relevance, long-term relevance, and an explicit statement of what survives or what would count as resolution. That methodology turns topic growth into governed expansion rather than note accretion.

## 2026-03-09 GitHub Presence and Community

The project’s GitHub-facing layer was clarified as a distinct public surface for discussion, critique, revision, and collaborative refinement. The point was not merely to host files, but to define a community process in which questions, criticism, issues, pull requests, and AI-assisted participation all have a clear role.

Relevant files:

- [GitHub presence and community note](github-presence-and-community.md)
- [Repository home and purpose](github-presence-and-community.md#repository-home)
- [Discussions community](github-presence-and-community.md#discussions-community)
- [AI-assisted participation](github-presence-and-community.md#ai-assisted-participation)

The core idea is that GitHub serves as a public theory-workshop layer alongside the reader-facing webapp. It provides a durable place for versioned documents, issue tracking, structured discussion, and AI-supported refinement. That makes it possible to compare ideas in public, route them into the right workflow, and build a community that is both critical and constructive around the theory.

## 2026-03-08 Scene Taxonomy Defined

A scene-taxonomy note was defined as a normative reference for developers authoring new scenes. Its purpose is to make scene construction more deliberate by stating what each major scene type is for, where structural hierarchy belongs, and where document-driven presentation begins.

Relevant files:

- [Scene taxonomy note](scene-taxonomy.md)
- [Primary scene classes](scene-taxonomy.md#primary-scene-classes)
- [Markdown presentation types](scene-taxonomy.md#markdown-presentation-types)

The note gives a brief working taxonomy. `Scene-Index` is the structural organizer for child scenes and branch navigation. `Scene-Markdown-View` is the direct reading surface for a single document. `Scene-Markdown-Split` turns one heading level of a markdown file into peer spheres, while `Scene-Markdown-Tree` turns a bounded heading hierarchy into a local scene tree. Together these definitions give developers a clearer rule for when to build a scene as structure, when to present a document directly, and when to derive navigation from markdown.

## 2026-03-07 Hyde Periodic Table

The Hyde periodic table became a meaningful part of the project’s reader-facing structure. The repo now includes both a dedicated [Hyde periodic-table scene config](../../../scenes/chemistry/hyde_periodic_table_scene.json) and a supporting [Hyde analysis note](../nuclear-atomic/hyde-info.md).

Relevant files:

- [Hyde geometry and periodic structure](../nuclear-atomic/hyde-info.md#how-the-hyde-geometry-encodes-periodic-structure)
- [Hyde working hypotheses](../nuclear-atomic/hyde-info.md)
- [Periodic-table navigation and controls](navigation-and-controls.md#periodic-table-scene)

What matters about the Hyde form is not only its historical novelty. It is a spiral layout that works well for intuitive thinkers because it preserves a near-continuous path through atomic number while making shell progression and family resemblance visually legible in one sweep. In the current writeup, the Hyde geometry is treated as a structural representation that reduces the topological breaks of the detached rectangular table and makes periodic recurrence feel spatially continuous rather than block-fragmented.

This also connects directly to the interactive atomic reader. The periodic-table interface in this repo is built around clickable element regions that open element scenes, and the runtime supports anchored interaction through scene hotspots and legend routes. In practical terms, the Hyde table is not just an image: it functions as a visual map with hot spots for drilling down into atomic structure and related element-level scenes.

## 2026-03-06 Comparative Glossary

A comparative glossary was added as a cross-framework translation document. Its role is to let readers, developers, and editors move more cleanly between standard modern terminology and the canonical terminology used in $\mathbb{A}\mathbb{A}\mathbb{A}$, without leaving key words underspecified or letting older vocabulary quietly drag the ontology back toward mainstream assumptions.

Relevant files:

- [Comparative glossary](comparative-glossary.md)
- [Cosmology lineage terms](comparative-glossary.md#cosmology-lineage-terms)
- [Key regime terms](comparative-glossary.md#key-regime-terms)

The glossary works as a controlled translation layer. It pairs familiar modern terms with $\mathbb{A}\mathbb{A}\mathbb{A}$ replacements, clarifies which inherited phrases should be phased out, and gives compact bridge language for major regime distinctions. That makes it useful both for prose consistency and for helping new readers understand where the framework is reusing language, where it is redefining it, and where it is introducing genuinely different concepts.

## 2026-03-03: CKM Closure Reaches Three-Digit Predictive Accuracy

Progress in the CKM realm crossed an important threshold. In the [weak-mixing and CKM note](../philosophy-history/theory-bridges/weak-mixing-ckm.md), the current $\mathbb{A}\mathbb{A}\mathbb{A}$ closure uses only three calibrated CKM magnitudes,
$\lvert V_{us}\rvert = 0.225$, $\lvert V_{cb}\rvert = 0.041$, and $\lvert V_{ub}\rvert = 0.0037$,
and then predicts the remaining magnitude entries to approximately three-digit accuracy.

Relevant files:

- [CKM geometric-overlap minimal model](../philosophy-history/theory-bridges/weak-mixing-ckm.md#ckm-geometric-overlap-minimal-model)
- [CKM confidence-interval closure test](../philosophy-history/theory-bridges/weak-mixing-ckm.md#confidence-interval-closure-test)
- [CKM closure target](../philosophy-history/theory-bridges/weak-mixing-ckm.md#ckm-closure-target-quark-sector)

The resulting post-fit matrix is
$$
\begin{array}{c|ccc}
\text{Model }V_{ij} & d & s & b\\
\hline
u & 0.97435 & 0.22500^{*} & 0.00370^{*}\\
c & 0.22487 & 0.97353 & 0.04100^{*}\\
t & 0.00845 & 0.04029 & 0.99915
\end{array}
$$
with the starred entries used only as calibration anchors. The remaining entries
$\{\lvert V_{ud}\rvert,\lvert V_{cd}\rvert,\lvert V_{cs}\rvert,\lvert V_{td}\rvert,\lvert V_{ts}\rvert,\lvert V_{tb}\rvert\}$
come out numerically close to the PDG hierarchy from closure rather than direct fitting.

The same closure step also fixes the CP structure. Using the holonomy relation
$$
\cos\delta = \frac{s_{13}}{s_{12}s_{23}}
$$
the model gives $\delta = 66.35^\circ$ and $J = 3.04 \times 10^{-5}$, with the phase landing within $1\sigma$ of the quoted benchmark in the current writeup. The significance of this date is not that flavor closure is finished. It is that the project moved from a qualitative CKM story to a quantitatively constrained statement: three cells can set the rest of the matrix to the right three-digit scale.
