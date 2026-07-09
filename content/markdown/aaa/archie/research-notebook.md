# Research Notebook

This notebook is a stylistic journal of major events in the evolution of $\mathbb{A}\mathbb{A}\mathbb{A}$.

Read it as project memory. The notebook preserves the turning points that changed how the architecture is written, but it does not replace the current source documents, proofs, validators, or claim-status pages.

It records turning points, major corrections, conceptual reframings, and other moments that materially changed how the theory was written, organized, or understood.

Each dated section should preserve the reasoning of the moment closely enough that later readers can see what changed and why.

Entries are maintained in descending date order, with the newest `##` section first.

## 2026-07-04: Coordinate-Layer Notation Established

Relevant files:

- [Mathematical Style Guide](mathematics-style-guide.md)
- [Mathematical Terminology](mathematics-terminology.md)
- [Ontology](../foundations/ontology.md)
- [Observer Framework](../spacetime/observer-framework.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)

The coordinate notation settled into a core layer rule: every equation must show whether it is using the native absolute frame or an effective observer/GR-comparison chart. The native substrate variables are $T$ for absolute time and $\mathbf X=(X^1,X^2,X^3)$ for position in the Euclidean void. Worldlines, velocities, causal-root conditions, and primitive wake geometry therefore use $\mathbf X_i(T)$, $\mathbf V_i=d\mathbf X_i/dT$, $dT$, $dX^i$, $\partial_T$, and $\nabla_{\mathbf X}$.

The GR-relative Lorentz frame is not a second substrate. It is the effective observer chart reconstructed by Physical Observers from clocks, rulers, signals, Noether sea state, and retained records. Its coordinates are $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$, with differentials and operators such as $dt_{\mathrm{eff}}$, $dx_{\mathrm{eff}}^i$, and $\partial_{t_{\mathrm{eff}}}$. Effective metric rows use $g_{\mu\nu}^{\mathrm{eff}}$ and related observer-sector objects only after that chart has been declared.

The important realization is that the same physical dimensions do not make two coordinates the same object. $T$ and $t_{\mathrm{eff}}$ both measure time-like quantities, and $X^i$ and $x_{\mathrm{eff}}^i$ both carry length units, but they live on different sides of the theory. Treating them as interchangeable hides the constitutive map that the Lorentz and gravity programs are supposed to derive.

That map is now named explicitly:
$$
(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\chi_{\mathrm{eff}}(T,\mathbf X,\mathcal N_{\mathrm{sea}},\text{observer record}).
$$
Unless a local document has already derived the needed row, $\chi_{\mathrm{eff}}$ remains a closure target. It cannot be smuggled into a derivation by reusing bare $t$, $x^i$, $dt$, or $dx^i$ as if the absolute and observer charts had already been identified.

This notation change matters because it protects the central architecture of $\mathbb{A}\mathbb{A}\mathbb{A}$. The theory keeps absolute time, the Euclidean void, and the Euclidean-void rest frame at the substrate level, while still requiring Physical Observers to recover Lorentz-consistent records inside tested regimes. The notation now forces each calculation to say which side it is on: substrate dynamics in the absolute frame, or observer-accessible Lorentz/GR comparison after clock, ruler, signal, and Noether sea response have been projected into an effective chart.

The milestone is therefore not a proof of Lorentz recovery. It is the establishment of the notation discipline needed for that proof to be honest. A valid-looking equation can no longer pass by dimensional similarity alone. It must carry its coordinate layer, its clock layer, and its map obligation visibly in the symbols.

## 2026-06-30: Original Blog Archive and GitHub Development Home

Relevant links:

- [Architrino](https://architrino.com)
- [Original Architrino Blog](https://architrino.wordpress.com)

The original development of $\mathbb{A}\mathbb{A}\mathbb{A}$ began on WordPress and produced more than 300 blog posts. Those posts remain historically important because they contain many early insights, candidate mechanisms, conceptual turns, and explanatory fragments that are still useful for source mining even when the current theory now needs stricter notation, proof status, and corpus placement.

New development now happens in GitHub, with the public site deployed at [Architrino](https://architrino.com). The original blog remains available at [Original Architrino Blog](https://architrino.wordpress.com). Its home page has been cleaned up into a simple index that lists posts by year, so the archive can be browsed directly without treating the old front page as the current project home.

The repository now carries extracted blog material for further mining, and the project can also search the live WordPress archive when needed. That keeps the original posts available as a research source without making WordPress the development surface. All tags have been removed from the WordPress posts, so future mining should rely on the year index, post titles, extracted archive records, direct search, and current corpus routing rather than legacy tag navigation.

## 2026-06-29: EOM Definition Oversight and Conceptual Resilience

Relevant files:

- [Master Equation](../dynamics/master-equation.md)
- [Noether Braid Configuration Space](../noether-braid/noether-braid-configuration-space.md#candidate-and-certified-braids)

This entry records a major oversight in the definition of the Master Equation of Motion. The important distinction is that the exact EOM is the microscopic dynamical law, while much of the higher architecture is a recovery program above that law. The architecture asks whether delayed path-history dynamics can select retained branches, whether those retained branches can be promoted from candidate braids to certified braids, and whether effective geometry, mass response, quantum records, and observer-level physics can be recovered from those branch records. A correction to the EOM can therefore be serious without invalidating the whole conceptual ladder.

At the conceptual level, $\mathbb{A}\mathbb{A}\mathbb{A}$ adapts easily because its core commitments are not tied to one frozen algebraic presentation of the acceleration law. The framework still begins with architrinos in absolute time and the Euclidean void, causal wakes, path-history dependence, receiver-local interaction, branch certification, and downstream effective reconstruction. What changes is the exact branch-selection and acceleration rule that the proof programs must consume. That is a mathematical bottleneck, not the entire ontology.

The correction should be treated as an opportunity as much as a repair. A better EOM may expose solution families that the earlier definition suppressed or distorted, especially in the search for stable retained branches, braid candidates on the path to certification, self-hit regimes, and Noether braid-scale assemblies. The right response is therefore not defensive preservation of superseded formulas. It is to let the corrected law discipline the candidate geometry and then audit every downstream claim whose proof depended on the superseded exact EOM.

The standing burden is precise. Conceptual resilience does not license automatic theorem transfer. Any statement that used the previous EOM formula to claim branch stability, caustic control, action closure, conservation, binary support, rank-three braid selection, or effective geometry must be rechecked against the corrected law. The durable lesson is that the architecture survives by remaining level-separated: ontology, microscopic dynamics, retained-branch certification, and effective observer geometry are related, but they are not the same assertion.

## 2026-06-22: Noether Braid and General Rank-Three Search Space

Relevant files:

- [Noether Braid](../noether-braid/noether-braid.md)
- [Noether Braid Configuration Space](../noether-braid/noether-braid-configuration-space.md)
- [Noether Braid Doubling-Frequency Resonance Lock](../noether-braid/noether-braid-doubling-frequency-resonance-lock.md)
- [Noether Braid Topological Charge](../noether-braid/noether-braid-topological-charge.md)

The terminology shifted from `swarm` to `braid` because the older word suggested an unstructured collective. It described many objects in motion, but it did not carry the mathematical discipline now needed by the theory. The new word points directly at intertwined path histories, retained ordering, exchange, phase winding, and topological invariants. A Noether braid is not just a cloud of architrinos. It is a candidate six-body polarity-neutral retained branch, built from three electrinos and three positrinos, whose causal-root ledger, phase record, wake history, energy/action rows, and angular-momentum rows can be followed through delayed dynamics.

The term also helps keep topology visible. A braid can be deformed without losing its identity until a fold, reconnection, branch loss, or other declared surgery event changes the retained record. That is the right mental model for assembly topological charge: the integers and signs attached to a branch should be stable under branch-preserving deformation, and should change only when the delayed dynamics force a discrete transition. In that sense, `Noether braid` is both more precise and less misleading than the previous label. It names a retained dynamical organization rather than a population metaphor.

The same day also clarified that rank-three braid notation must begin in the general, unordered configuration space. The raw search labels are $B_1:B_2:B_3$, not an assumed `I:M:O` hierarchy. For each retained support row $a\in\{1,2,3\}$, the minimal state record is
$$
\mathcal{T}_{3R}
=
\left\{
\left(
f_a,\,
r_a,\,
E_a,\,
s_a,\,
\phi_a,\,
\hat{\mathbf n}_a,\,
\mathcal{L}_a
\right)
\right\}_{a=1}^{3}.
$$
Here $f_a$ is the layer frequency or return rate, $r_a$ is the characteristic radius or retained lever arm, $E_a$ is the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ is the scalar speed or speed statistic, $\phi_a$ is the phase offset, $\hat{\mathbf n}_a$ is the plane-normal or principal-direction row, and $\mathcal{L}_a$ is the active causal-root ledger. On a circular carrier chart one has $s_a=2\pi f_a r_a$, but that identity is only a chart relation. It does not make frequency, radius, speed, energy, phase, or ledger complexity subordinate to one fixed ordering.

This generalization changes the search program. Instead of asking first whether the doubling-frequency `4:2:1` pattern, the role-assigned $(f+2,f,f-1)$ middle-hinge candidate, or another named row is correct, the solver should search the labeled but unordered domain
$$
\widetilde{\mathcal C}_{3R}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3)
\right\}
$$
and then attach any `I:M:O` role map only after a retained branch supplies the evidence for inner, middle, and outer roles. The symmetric group $S_3$ acts on the three support-row records, so repeated solutions under relabeling are not waste. They are confirmation that the search has found a symmetric sector. A quotient-sector summary may be useful later, but the raw search should not discard a row simply because a permuted copy has already appeared.

The practical output of this search should be an atlas rather than a single row. Each candidate region should report the unsorted ratios
$$
f_1:f_2:f_3,
\qquad
r_1:r_2:r_3,
\qquad
E_1:E_2:E_3,
\qquad
s_1:s_2:s_3,
$$
along with phase offsets, plane-orientation determinant, causal-root ledgers, response-center motion, group velocity, total momentum, total angular momentum, and assembly topological charge. Stable retained branches can then be compared by energy differentials $\Delta E_{ab}=E_a-E_b$, wake-history decomposition, sea stability, and accessory-architrino capture behavior. This is the beginning of a systematic periodic-table program for the Noether braid: classify stable six-body branches by topological labels and dynamical margins, then ask which architectures can bind additional architrinos without destroying the retained braid ledger.

The iso-frequency possibility became important in this wider space. A candidate can satisfy
$$
f_1=f_2=f_3
$$
without requiring equal radii, equal energies, equal speeds, equal phases, or equal root ledgers. In a circular comparison chart, different lever arms at common frequency give
$$
s_1:s_2:s_3
=
r_1:r_2:r_3
$$
when the same angular-frequency convention is used. Thus an iso-frequency branch can naturally contain one or more super-field-speed carrier rows if a retained lever arm is large enough, while the primitive causal wake speed remains $c_f$. That is not a signal-speed violation. It is a branch-geometry statement: the source trajectory can enter regimes with additional self-hit or partner-hit roots, Jacobian sign changes, folds, and caustic behavior.

This insight changes how the current candidates should be read. Doubling-frequency locks, role-assigned middle-hinge frequency candidates, and iso-frequency rows are subfamilies of $\widetilde{\mathcal C}_{3B}$, not definitions of the Noether braid architecture. The iso-frequency row is especially valuable because it separates a common clock or return-frequency condition from the energy, radius, velocity, phase, and ledger data that may actually distinguish the three binaries. If such a branch exists, the energy differentials and speed regimes would be consequences of branch energy placement and retained lever-arm geometry, not of an imposed frequency hierarchy.

The milestone is therefore both terminological and mathematical. `Noether braid` gives the six-body retained branch a name that matches the topology the proof program needs, while the generalized Noether braid configuration space prevents the notation from prejudging the solution. The next honest work is systematic search: scan broad $B_1:B_2:B_3$ configurations, preserve $S_3$ repeats, identify stable retained branches in a sea of like assemblies, compare their energy differentials, and then test where accessory architrinos can attach.

## 2026-06-21: Causal Delay Feedback Visualization App

Relevant files:

- [Causal Delay Feedback](../../../../causal-delay-feedback.html)

The standalone [Causal Delay Feedback](../../../../causal-delay-feedback.html) app became the project surface for making causal-delay feedback depth visible. Its core lesson is that the present interaction state is not determined only by where the two architrinos are at the displayed instant. It also depends on retained source history, causal-root status, delayed-hit rows, and the active or rejected contribution records that determine which path-history terms can reach the other architrino now.

The app presents that lesson as a time-space canvas rather than as a formula panel. An electrino path and a positrino path are drawn as solid solver-owned trajectories. The dotted causal-wake arc series are not displayed as connections between fixed history markers. Each visible arc series is recomputed from the replay paths: it begins at the back-solved emission point on the emitting architrino path and ends at the reception point on the partner architrino path at the current replay time. The partial-arc view keeps the screen focused on the active emitter-to-receiver sector, while the full-circular-arc preset remains available for showing the complete emitted wake geometry.

The runtime moved the app beyond a hand-drawn demonstration. The standalone page defaults to the central solver bridge `pairInteraction` replay path when that bridge is available, with the representative mock replay preserved as an explicit `?replay=mock` review mode. The central path advances the electrino and positrino together from declared initial positions and velocities, publishes frame samples and path-history data, and leaves the canvas runtime to derive the two live wake series by back-solving emission points against the current reception points. Both central and mock paths preserve a solver-shaped dataset contract: frames, retained path-history samples, delayed-hit diagnostics, rejected or unresolved root diagnostics, and compact contribution summaries.

The interface also settled into a cleaner teaching grammar. The canvas exposes preset selection, play and pause, reset, the `now` scrubber, canvas color, $c_f$ replay speed, architrino speed as $v/c_f$, weak-contribution cue mode, wake selection, and compact contribution readout. Fixed numbered retained path-history dots are no longer part of the default canvas grammar. Retained path-history samples and retained path constraints remain solver or input data, and scripted review paths can still submit retained start, interior, final-position, fixed-signal-speed, and initial-velocity constraints through the central replay contract.

The strongest current solver evidence is the boundary-replay path. Constrained central replays can surface as `solver boundary-seed replay` when finite-difference relaxation has seeded the retained path without a convergence claim, or as `solver boundary replay` when the discrete finite-difference retained-knot boundary relaxation converges under the requested residual tolerance. Those statuses carry retained-position evidence, initial-velocity evidence, retained-knot boundary-residual evidence, relaxation residual evidence, and the explicit physical-boundary status `physical_boundary_solver_pending`. The important boundary is therefore still visible: the app can show a converged discrete retained-knot boundary replay, but it does not claim the full physical pair-interaction/path-constraint boundary-value solver is complete.

This milestone matters because it turns causal-delay language into an inspectable object without letting the picture outrun the solver evidence. A reader can see the emitting point, the reception point, the two live causal-wake series, the active cross-path contribution readout, and the distinction between visual replay, central bridge evidence, finite-difference boundary relaxation, and still-pending physical closure. For $\mathbb{A}\mathbb{A}\mathbb{A}$, that is useful pressure: the app has to keep teaching geometry, solver-shaped replay, and proof status separate instead of letting them collapse into a single animation.

## 2026-06-20: Central Solver Workstream and Benchmark Gate

Relevant files:

- [Photon and Polarization Visualization App](../../../../photon.html)
- [Ideal Noether Braid Lorentz Geometry App](../../../../ideal-braid.html)
- [Animator](../../../../animator.html)
- [Causal Delay Feedback](../../../../causal-delay-feedback.html)

The central solver workstream became the shared engineering and validation target for architrino motion, causal roots, delayed hits, and path-history geometry. Instead of letting each app carry an isolated solver grammar, the work defines a common request and response contract: model identity, equation or force-law version, constants, branch policy, precision path, path-history streams, indexed readback, diagnostics, and app adapters.

This milestone matters because it changes app computation from local demonstration logic into a migration path. Photon, Ideal Braid, Animator, and Causal Delay Feedback can ask the same solver bridge for causal-root, delayed-hit, geometry, dataset, and diagnostic outputs while their interfaces remain presentation surfaces. That separation is important: a visual surface can be solver-derived without pretending the solver has already closed every proof obligation behind the picture.

The benchmark side also became more disciplined. The widened emission-shell v0 stress envelope preserved oracle equality under larger replay pressure and introduced a threshold check that is not merely wall-clock timing. The result is developer-test readiness, not default replacement. In notebook terms, the accomplishment is the discipline: centralize the geometry solver, measure the bridge under stress, and keep opt-in strategies opt-in until breadth and parity evidence justify promotion.

## 2026-06-20: Noether Braid Middle-Hinge Candidate Narrowing

Relevant files:

- [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [Energy](../dynamics/energy.md)
- [Nested Shell Braid Dynamics](../noether-braid/nested-shell-braid-dynamics.md)

The angular-momentum and spin proof route gained a sharper reduced candidate target around the rank-three middle-hinge family. The work used canonical `(I,M,O)` frequency-triplet notation to compare the $(f+2,f,f-1)$ middle-hinge family against symmetric, doubling-frequency, and finite integer-lock controls. The point was not to accept a retained branch; it was to narrow the proof burden by making the candidate and its competitors machine-readable.

The strongest evidence came from the combination of row lineage, self-hit parity, phase-lock coverage, point-event witnesses, route-local transport and recoil balance, and competitor auditing. The middle-hinge family remains on the candidate path because it keeps the strongest self-root parity proxy and phase-lock coverage among the tested families. At the same time, the retained branch claim remains false: common positive-width retained time-domain coverage, zero-slack retained transport, accepted wake energy, action scale, energy routing, and full point-event rules are still missing.

This milestone matters because it replaced a broad question about whether a rank-three rotational-action pattern could carry angular-momentum and spin structure with a narrower branch-certificate problem. The live question is whether the route-authorized point-event and wake payloads can be lifted into one retained row set with accepted transport, partition, torque, phase, stability, and energy-routing rows. That is a much better mathematical target.

## 2026-06-20 Closure Scorecard Update

The 2026-06-20 scorecard cycle applied the validated-closure lens to the current corpus and recorded a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `65` after a full read of the `163` markdown files under `content/markdown/aaa`. The same table gives modern physics an operational score of `88` and a mechanism score of `67`, so the latest total $\Delta$ remains `-23`. The result is a stronger score than the early validated-closure baseline, but it still treats missing coefficients, unfixed parameters, and unvalidated benchmark recovery as real deficits.

Relevant files:

- [Closure scorecard](../validation/closure-scorecard.md)
- [Assessment table](../validation/closure-scorecard.md#assessment-table)
- [2026-06-20 assessment notes](../validation/closure-scorecard.md#2026-06-20-assessment-notes)

The strongest rows show where the corpus has become unusually coherent. Axiom+Notation and Theory Architecture+Ontic Logic both score `99`, Coverage+Interface Readiness scores `96`, Falsification Gates scores `95`, Master EOM+Local Dynamics scores `80`, and Internal Constituent Dynamics scores `78`. Those numbers reflect stable canonical language, broad interface coverage, explicit failure conditions, stronger delayed path-history dynamics, and a more developed nested shell braid and Noether braid account.

The same update keeps the main closure burdens visible. Empirical Precision+Benchmark Validation is `39` with $\Delta=-59$, Formula+Coefficient Recovery is `48` with $\Delta=-48$, Parameter+Scale Closure is `42` with $\Delta=-28$, Potential+Action Closure and Conservation+Invariant Closure are both `71` with $\Delta=-27$, and UV/IR+Regularization Completion is `49` with $\Delta=-21$. The scorecard therefore refuses to let architecture substitute for a retained native record that derives central constants, Lorentz/PPN coefficients, photon-channel coefficients, Born/Bell measures, Standard Model mass and mixing values, radiation benchmarks, and shared cosmology residual fits.

This milestone matters because it turns the project's strongest and weakest mathematical surfaces into a single repeatable assessment. The corpus now has high auditability, strong ontology, and near-modern falsification discipline, but the validated-closure total remains below modern operational physics until branch-derived coefficients, fixed parameters, and benchmark passes arrive under the same native record.

## 2026-06-17: iOS and iPadOS Textbook Reader

The Architrino iOS app became the first Apple-native reading surface for the $\mathbb{A}\mathbb{A}\mathbb{A}$ textbook, and the iPadOS app was developed as part of the same reader effort. The iOS and iPadOS apps are available through the project repository now, and they will appear in the App Store soon. Their first release scope is deliberately narrow: the apps are textbook readers, not a flashcard system, not a molecule viewer, and not a general replacement for the website. The point is to give the book a quiet, durable, touch-native home on iPhone and iPad while keeping the theory itself at the center of the screen.

The app uses a SwiftUI shell around a local rendered-textbook runtime. The bundled package contains chapter-level reading copies, rendered HTML, a table of contents, a link map, a search index, and selected reference material such as glossary and style-guide files. The package is generated and checked against a deterministic book contract, so the reader does not depend on live website state.

This choice made the textbook more book-like. Chapters and in-app markdown references are opened from the local bundle by canonical path. Internal links, glossary links, table-of-contents entries, bookmarks, search results, and navigation controls all route back into the same bundled corpus when the target is present. Links that belong to web-only app scenes can still leave the reader and open the website, but ordinary markdown documents are treated as part of the app's local book rather than as external internet destinations.

The interface also settled into a reader-first grammar. The main screen has minimal chrome, large touch targets, a persistent bottom control row, local bookmarks, theme selection, margin and spacing controls, and the `AAA` font-size control where the center `A` returns the reader to the default size. The standard purple theme became the default reading surface, with the table of contents, search, bookmarks, settings, and about views using the same selected reader colors instead of switching to unrelated system panels.

The iOS and iPadOS apps also include a page-feedback path: from the reading surface, a reader can capture the visible page, annotate the screenshot, copy the annotated image, and open a prefilled GitHub issue for submission. GitHub login is required before the issue can be filed.

The app keeps user state local. Font size, theme, spacing, margins, bookmarks, and reading position are stored on the device rather than in a cloud account. That keeps the v1 reader simple and honest: updates can replace the bundled textbook package, but the reader does not require a server, login, or shared storage service to function.

This milestone matters because it changed the textbook from a generated artifact that could be read on the web into a packaged, inspectable corpus with its own runtime contract. The strict package check records the current book as 11 chapters with mapped files, captured links, and search entries. In practice, the app now tests the corpus as a navigable book: headings need stable anchors, links need deterministic targets, search snippets need faithful rendering, and the table of contents has to carry the reader to the intended place. That is a different kind of pressure than ordinary website browsing, and it is useful pressure for a theory that values parsimony.

## 2026-06-16: Entropy and Record Coarse-Graining Chapter

Relevant files:

- [Entropy and Record Coarse-Graining](../dynamics/entropy.md)

The entropy work became a dedicated dynamics chapter rather than scattered explanatory prose. The chapter states the governing idea directly: entropy is a record-coarse-graining concept in $\mathbb{A}\mathbb{A}\mathbb{A}$, not a primitive substance, not a field in the Euclidean void, not the generator of absolute time, and not an independent gravitational mechanism. It is the value obtained after complete deterministic history is projected into a retained record, access window, and declared coarse-graining.

The mathematical center is the same-record rule. A packet may not fit entropy, temperature, flux, probability weights, apparatus cost, or horizon labels from separate hidden ensembles. If a thermal, quantum, horizon, or computational comparison is claimed, the entropy in that comparison must be a projection of the same record that supplies the other quantities. In formal terms, the chapter makes entropy depend on a record projection $\Pi_{\mathcal{Q},W}$ from complete histories into retained record variables, then applies the entropy functional to the pushed-forward measure.

This milestone matters because it turns entropy from an inherited word into a controlled diagnostic. Thermodynamics, measurement, computation, horizon bookkeeping, quantum mixed-state language, and cosmology can all be compared by asking the same question: which histories are retained, which histories are grouped together, and which boundary records enter the ledger? That gives entropy a strong role without letting it become final ontology.

## 2026-06-14: Molecule Visualization App

Relevant files:

- [Molecule Visualization](../../../../molecule.html)
- [Molecule app scene](../../../scenes/archie/molecule.json)
- [Applications scene](../../../scenes/archie/applications.json)

The standalone [Molecule Visualization](../../../../molecule.html) app is the project molecule-viewer surface. It gives readers a 3D ball-and-bond model for curated molecules and keeps the model connected to the Applications scene through the molecule scene entry.

The app supports curated and session molecule sources. Curated presets provide named structures such as water, caffeine, glucose, graphene, chlorophyll a, and nucleotide bases. A reader can also add a session molecule by entering a chemical formula and optional display name. If the formula matches a curated preset, the app opens that preset. Otherwise, the app queries PubChem for a compound name, CID, and SDF structure record; when PubChem returns a structure, the app adds that molecule for the current browser session. If live lookup is unavailable or no structure is returned, the app falls back to a session-only formula-composition model.

The display is meant for direct inspection rather than a static illustration. Readers can rotate the molecule by dragging the open stage, zoom the camera, shift the molecule across the stage by dragging an atom, and hover atoms to highlight them and swap the readout from molecule totals to atom-level totals. Clicking an atom routes into that atom's element visualization, so a molecule can be used as an entry point into the periodic-table and atom apps.

The app also carries an $\mathbb{A}\mathbb{A}\mathbb{A}$ bookkeeping layer. For the displayed molecule, and for each hovered atom, it reports formula or atom label, atom count, bond count, protons, neutrons, electrons, electrinos, positrinos, and total architrinos using the current typical neutral-atom estimate. This keeps molecule visualization tied to the same ledger language as the atom and periodic-table apps rather than treating chemistry as a separate visual island.

## 2026-06-13: Photon and Polarization Visualization App

Relevant files:

- [Photon and Polarization Visualization App](../../../../photon.html)
- [Photon Guide](photon-guide.md)
- [Mode Taxonomy](../reactions/mode-taxonomy.md)
- [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md)
- [Quantum Summary](../quantum/quantum-summary.md)
- [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md)

The standalone [Photon and Polarization Visualization App](../../../../photon.html) became the workbench for one simple photon idea: a photon-like packet might be modeled as two flat Noether braids moving together along $x$. The trailing braid rotates counter-clockwise, the leading braid rotates clockwise, and the app shows both a face-on view for inspection and a side view closer to the actual geometry.

The app lets the reader change the candidate instead of only looking at a picture. Each braid has `I`, `M`, and `O` binaries with enable switches, frequency, radius, and phase controls. The $\Delta x$ control changes the gap between the two braids in the side view, while the Virtual Observer controls choose the $(x,y,z)$ point where the app calculates the displayed electric-field readout.

That electric-field readout is not hand-drawn. The runtime sums delayed contributions from the active architrinos, finds causal roots, weights them by the receiver-normal branch strength $W^{\mathrm{rec}}/R^2$ on the same retained root, and reconstructs the transverse $\mathbf E$ signal at the Virtual Observer. The separate $\mathbf B$ graph is omitted because, in the plane-wave comparison case, $\mathbf B$ follows from $\mathbf E$ by $\mathbf B=(1/c_f)\hat{\mathbf x}\times\mathbf E$.

The polarization panel asks what kind of field the candidate actually produces. It fits $E_y(t)$ and $E_z(t)$ over one cycle and reports whether the observed signal looks weak, linear, circular, or elliptical. This is a diagnostic result, not a proof: the app helps find promising planar-pair settings, but photon closure still requires a separate branch-ledger argument.

The supporting documents keep that boundary clear. [Photon Guide](photon-guide.md) explains how to use the app. [Mode Taxonomy](../reactions/mode-taxonomy.md), [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md), [Quantum Summary](../quantum/quantum-summary.md), and [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) state what still has to be recovered: stable transverse behavior, polarization, helicity, analyzer response, and no free longitudinal photon mode.

## 2026-06-10: Ideal Noether Braid Lorentz Geometry App

Relevant files:

- [Ideal Noether Braid Lorentz Geometry App](../../../../ideal-braid.html)
- [Ideal Braid Guide](ideal-braid-guide.md)
- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)

The standalone [Ideal Noether Braid Lorentz Geometry App](../../../../ideal-braid.html) became the interactive inspection surface for the Noether braid Lorentz-geometry lesson built around an oblate spheroidal envelope. Its purpose is to make one candidate Noether braid deformation concrete: a nested braid is shown inside a velocity-dependent envelope, the user adjusts $\beta=v/c_f$, and the app ties the visible flattening to $\gamma$, $\xi=R_{\parallel}/R_{\perp}$, relative time, relative length, and the normalized center-of-mass energy ledger. The controls also keep the lesson inspectable rather than merely illustrative: paths, surface, axes, orbit scale, cycle speed, and markdown overlays let the reader compare the moving geometry with the equations on the same screen.

The app deliberately does not claim to prove Lorentz kinematics from Noether braid dynamics. It records the target geometry in a form that can be checked visually and algebraically: in the zero-extra-scale lesson case, the displayed oblate spheroidal envelope satisfies $R_{\parallel}=R_{\perp}/\gamma$ and $\xi=1/\gamma$. That makes the Lorentz factor more than a formula in a side panel; it becomes the aspect ratio of the displayed envelope. The app is therefore a dictionary between the formula, the return-cycle picture, and the geometry that a later branch-ledger derivation would have to recover.

The three supporting documents divide the burden cleanly. [Ideal Braid Guide](ideal-braid-guide.md) is the app-facing explanation: it defines the lesson purpose, the control meanings, the geometry dictionary, the energy and mass-equivalent readouts, and the claim level of the surface. [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md) gives the reader-facing bridge: the continuous observer-level Lorentz function is not replaced by a step function; the discrete object is the admissible material return-cycle branch whose longitudinal and transverse cycles close to the same period. [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) carries the deeper proof program, where the Lorentz laws must be derived from delayed substrate dynamics, stable translating branches, closure residuals, and bounded preferred-frame leakage.

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
to cancel the apparent source-normal diagnostic
$$
|J|^{-1}
$$
 singularity in the fold-coordinate measure. Deep-past memory is no longer an open combinatorial hazard: it is reduced to a finite ancestry complex, and the trapped-exchange loophole is closed by strict backward source-time drift along simple delayed branches. On the recapture side, the four principal escape channels now consume only fixed arithmetic ceilings
$$
F^{\mathrm{mb}}_m
\qquad
\text{and}
\qquad
\overline{A}^{\mathrm{mb}}_{\mathrm{deep}}
$$
so the late comparison laws are no longer hiding qualitative path-history terms inside informal “smallness” language.

This milestone also removed the last major vacuity risks. The chapter now contains an explicit symmetric planar seed packet in Jacobi variables, a delayed seed-margin persistence bridge from Coulomb-like proxy geometry to the exact delayed branch sums, and a seed-centered realization of the explicit convex tame core. That means the closed convex fixed-point domain is no longer only an abstract target: it is anchored to one concrete physical three-body seed configuration with positive leading margins and explicit slack.

For $\mathbb{A}\mathbb{A}\mathbb{A}$ theory development, this milestone matters because it upgrades the master equation from a law written mainly for pair interactions into a realistic candidate law for composite architrino assemblies. The whole theory depends on the claim that stable particles, nested shell braid branches, and Noether braid-scale structures can survive the full delayed path-history dynamics rather than only reduced caricatures. This new planar three-body bridge is the first place where that claim is written in a mathematically serious many-body form. Delay hypergraphs, ancestry complexes, bounded caustic transit, and multi-channel recapture are exactly the structures needed once several interacting delayed source families are present at once. In other words, this is the first proof-program layer that begins to look like the delayed geometry actually required for emergent composite assemblies, rather than just for one protected binary toy model.

It also sharpens the status of the master-equation program itself. The central promise of $\mathbb{A}\mathbb{A}\mathbb{A}$ is that apparently singular or chaotic delayed effects, such as self-hit amplification, fold events, and long path-history memory, can still organize into stable physical assemblies with finite effective behavior. This chapter now shows, at the theorem-program level, how that could happen in the first genuine many-body setting: caustic spikes become finite impulses, deep-past memory becomes a finite ancestry count, and candidate scattering channels are forced into a finite recapture competition. That is directly relevant to the broader theory because the same mechanisms are supposed to underwrite the existence of higher assemblies, shielding, and eventually the dynamics of Noether braid-like objects. The next phase is therefore no longer to invent more scaffold, but to prove that these delayed many-body control mechanisms really hold inside the master equation.

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

## 2026-03-14: Doubling-Frequency Resonance Lock

Today the doubling-frequency-lock note, [Noether Braid Doubling-Frequency Resonance Lock](../noether-braid/noether-braid-doubling-frequency-resonance-lock.md), was rewritten around an explicit assumption package. The live note now begins from the exact ring identity
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
So even if one later tests the doubling-frequency candidate $(m,n)=(2,4)$, the frequency lock $1:2:4$ does not force equal speeds and does not force self-similar radii.

The conceptual gain is that the note now separates three different burdens cleanly. Kinematics gives the exact identity above. Integer phase closure gives commensurate frequencies. The cancellation principle is then the extra ingredient that might select one preferred integer lock from the commensurate lattice.

This mattered for the larger program because the nested shell braid has to satisfy several closure burdens at once: frequency hierarchy, horizon behavior, radiation suppression, and eventually an effective stress-tensor story for higher assemblies. The revised note now reads as a live research surface with explicit assumptions and explicit non-assumptions.

## 2026-03-12: Receiver-Normal Master Equation Canon

Relevant files:

- [Master Equation: canonical form](../dynamics/master-equation.md#the-master-equation-canonical-form)
- [Master Equation: energy, Lagrangian, and Hamiltonian structure](../dynamics/master-equation.md#energy-lagrangian-and-hamiltonian-structure-of-the-architrino-dynamics)
- [Energy and conservation note](../dynamics/energy.md)
- [Causal action functional](../dynamics/causal-action-functional.md)
- [Lorentz near-miss in historical context](../philosophy-history/historical-context-and-missed-opportunities.md#lorentz-before-einstein-the-almost-substrate-moment)

The master equation uses the receiver-normal branch factor in the canonical per-hit law:
$$
\mathbf{a}_{ij}(t; t_0)
=
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}{r_{ij}^2(t;t_0)}\,
W_{ij}^{\mathrm{rec}}(t;t_0)\,
\hat{\mathbf{r}}_{ij}(t;t_0),
\qquad
W_{ij}^{\mathrm{rec}}=\left|\frac{D_{T,ij}}{D_{s,ij}}\right|
$$
with
$$
D_{s,ij}=c_f-\mathbf{v}_j(t_0)\cdot\hat{\mathbf{r}}_{ij}(t;t_0),
\qquad
D_{T,ij}=c_f-\mathbf{v}_i(t)\cdot\hat{\mathbf{r}}_{ij}(t;t_0).
$$
Source strength itself does not change with speed. The source emits according to the same constant-cadence rule. The velocity dependence enters because both transceiver paths set the local wake crossing geometry: the source-normal denominator records how the emitted wake surfaces bunch or dilate, while the receiver-normal numerator records how the receiver cuts those surfaces.

Receiver velocity appears in the received branch magnitude through $D_{T,ij}$ and in the work rate $\mathbf{F}\cdot\mathbf{v}$. Magnetic-like behavior remains an emergent closure target built from delayed geometry, receiver-normal branch strength, superposed radial hits, and assembly/Noether sea response; it is not inserted as a primitive cross-product force.

The canon separates theorem-backed statements from closure targets. Current documents should not state, without local hypotheses, that the master equation is already the exact Euler-Lagrange variation of a completed non-local action or that global energy-momentum conservation is fully restored in every regime. The canonical stance is narrower: the regularized action-functional program supplies a variational lens, the per-hit law supplies the acceleration-first dynamics, and energy bookkeeping must state the assumptions under which work-energy, Noether-style, or action-based conclusions are being claimed.

Corpus requirements:

- remove bare $1/r^2$ and source-normal-only per-hit laws where receiver-normal branch strength belongs,
- avoid splitting the theory into a permanent "reduced model" and a separate "candidate action" unless the local document is explicitly discussing an approximation,
- replace over-broad conservation claims with assumption-scoped theorem language,
- keep constant emission cadence distinct from received causal-flux modulation,
- and include receiver-velocity effects through the receiver-normal numerator before promoting force, action, or finite-certificate rows.

The master equation is a genuinely delayed branch law rather than a static inverse-square law with delayed labels attached. The closure burdens are sharp: self-hit walls, magnetic-like behavior, Lorentz behavior, and action/energy structure all need to be derived from the receiver-normal delayed geometry rather than asserted through imported field-theory vocabulary.

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

The note gives a brief working taxonomy. `Scene-Index` is the structural organizer for child scenes and branch navigation. `Scene-Markdown-View` is the direct reading surface for a single document. `Scene-Markdown-Split` turns one heading level of a markdown file into peer spheres, while `Scene-Markdown-Tree` turns a bounded heading hierarchy into a local scene tree. Together these definitions give developers a clearer rule for when to build a scene as structure, when to present a document directly, and when to derive navigation from markdown.

## 2026-03-07 Hyde Periodic Table

The Hyde periodic table became a meaningful part of the project’s reader-facing structure. The repo now includes both a dedicated [Hyde periodic-table scene config](../../../scenes/chemistry/hyde_periodic_table_scene.json) and a supporting [Hyde analysis note](../nuclear-atomic/hyde-periodic-table.md).

Relevant files:

- [Hyde geometry and periodic structure](../nuclear-atomic/hyde-periodic-table.md#how-the-hyde-geometry-encodes-periodic-structure)
- [Hyde working hypotheses](../nuclear-atomic/hyde-periodic-table.md)
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
