# Research Notebook

This notebook is a stylistic journal of major events in the evolution of $\mathbb{A}\mathbb{A}\mathbb{A}$.

Read it as project memory. The notebook preserves the turning points that changed how the architecture is written, but it does not replace the current source documents, proofs, validators, or claim-status pages.

It records turning points, major corrections, conceptual reframings, and other moments that materially changed how the theory was written, organized, or understood.

Each dated section should preserve the reasoning of the moment closely enough that later readers can see what changed and why.

Entries are maintained in descending date order, with the newest `##` section first.

## 2026-07-22: Braid Geometry Campaign: From Direct Evolution to an Analytical Atlas

Relevant files:

- [Noether Braid](../noether-braid/noether-braid.md)
- [Braid Taxonomy](../noether-braid/braid-taxonomy.md)
- [Braid Family A](../noether-braid/braid-family-a.md)
- [Braid Family B](../noether-braid/braid-family-b.md)
- [Braid Family C](../noether-braid/braid-family-c.md)
- [Braid Mathematics](../noether-braid/braid-mathematics.md)
- [Noether Braid Configuration Space](../noether-braid/noether-braid-configuration-space.md)
- [Braid Recovery Requirements](../noether-braid/braid-recovery-requirements.md)
- [Candidate Braid Analysis Methodology](../noether-braid/braid-analysis-methodology.md)
- [EOM Solver](../../../../src/eom/README.md)
- [Prescribed-Path Analysis](../../../../src/prescribed-path-analysis/README.md)

The campaign to determine the geometry of the Noether braid reached a strategic turning point. The first ambition was direct: begin with six architrinos, evolve them under the Master Equation, and let the EOM solver reveal which geometries survive. That route produced an extraordinarily precise solver in which verification is required for advancement. It certifies causal-root completeness, acceleration enclosures, local error, and retained-history state before publishing an accepted step. Its precision is a genuine achievement, but that same precision exposed how severe the braid problem is.

The architecture permits architrino trajectories below, at, and above the field speed $c_f$. Near the exact-field-speed boundary, the transmitter-side factor

$$
D_t=c_f-\widehat{\mathbf r}_t\mathbin{\cdot}\mathbf V_t(T_t)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-be82225de90c9fdf)

can approach zero. The canonical per-hit acceleration weight $c_f/|D_t|$ then becomes extremely large, causal roots can approach a fold, and a small uncertainty in the retained state can be amplified into a much larger uncertainty in the next candidate state. The practical problem is therefore not that the solver casually loses precision. It is that the solver correctly refuses to certify a next position when the root set, acceleration, or state enclosure no longer closes under the declared error budget.

The measured current-binary result was stark. In the six-path endurance matrix that motivated this entry, with no modeled Noether-sea response, most runs halted within roughly ten wall-clock seconds; the two longer difficult routes lasted about thirty and forty-five seconds. The accepted solver histories reached only about $T=5$ to $T=11.5$, and no preset survived one wall-clock minute on all four declared seeds. That is woefully inadequate for discovering a braid by long-horizon evolution. This is a campaign-specific performance result, not a theorem that every braid evolution must fail. It would be overturned by a same-binary, same-budget run that retains complete roots and bounded numerical error across a useful long horizon.

A parallel effort reorganized the entire Noether Braid section of the textbook so that the document structure matches the new research program. Large overlapping treatments were replaced by a layered architecture: the Noether Braid entry point, a coordinate taxonomy, separate Family A, B, and C definitions, shared braid mathematics, configuration space, recovery requirements, and focused dynamics and symmetry chapters. The former omnibus family and spindle treatments were removed after their durable material was reassigned to those owners. This was not merely editorial cleanup. It separates exact prescribed geometry from analytical consequences, EOM-solver retention, Noether-sea support, and downstream recovery claims, so each document now states one evidence level without borrowing authority from another.

The campaign therefore added a complementary route: prescribe exact braid geometries first, then analyze them without asking the EOM solver to evolve them. Families A, B, and C now provide coordinate-defined classes ranging from one-braid orthogonal-axis and coincident-axis geometries to two-braid compositions. These are imposed paths, not retained physical braids. Their value is that every position, velocity, phase, period, and family coordinate is known exactly enough to support a controlled analytical comparison.

The prescribed-path analysis program computes causal roots, internal and external wake exposure, virtual-probe acceleration response, prescribed-path equation mismatch, cancellation, angular structure, spectra, radial behavior, and source-parameter sensitivity under one declared protocol. The data path is

$$
\boldsymbol\theta^{(k)}\in\Theta_M
\longmapsto
S\!\left(\boldsymbol\theta^{(k)}\right)
\longmapsto
\mathbf G\!\left[S\!\left(\boldsymbol\theta^{(k)}\right);P\right],
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d96f71ab0ea12bae)

where $\Theta_M$ is the admissible configuration space of family member $M$, $S$ is the exact prescribed source record, $P$ is the fixed analysis protocol, and $\mathbf G$ is the resulting analytical measure vector. Result packets, raw ledgers, source and protocol hashes, acceptance state, and indexed measures are stored in a versioned SQLite analytical database so that large campaigns can be queried without separating a result from the exact record that produced it.

The search begins with basic prescribed geometries. Reproducible Monte Carlo campaigns will vary the allowed coordinates of each family and measure points across its configuration space. A single attractive point will not be treated as a solution. Interesting points will receive directed refinement and local differential analysis: small declared coordinate changes will measure gradients, sensitivities, root-topology boundaries, numerical convergence, and the width of any favorable neighborhood. The useful object is a robust region that remains favorable under small perturbations and a fixed common protocol, not a narrowly tuned sample or a hidden weighted score.

The hope is that this analytical atlas will identify geometries worth the much more expensive dynamical and Noether-sea work. $\mathbb{A}\mathbb{A}\mathbb{A}$ must recover tested aspects of general relativity and quantum theory as effective output; neither framework may be inserted as an architrino-level premise. A promising prescribed geometry may guide the analytical program toward measures that bear on those recovery targets, but the prescribed-path results alone cannot establish stability, energy, retention, physical realization, a Noether-sea response, or recovery of either theory. Those claims still require independent instruments and realized-branch evidence.

This strategy has a clear failure condition. If apparently favorable regions disappear under higher resolution, change when the common protocol is held fixed, collapse under local coordinate perturbations, or fail subsequent EOM-solver and Noether-sea tests, then the atlas has not found a promising braid geometry. If robust regions survive those challenges, the campaign will have converted an almost intractable blind evolution problem into a disciplined sequence of increasingly selective tests.

## 2026-07-18: It's Greek to Me! Alphabet Game

Relevant files:

- [It's Greek to Me!](../../../../greek-letter-match.html)
- [Greek alphabet game scene](../../../scenes/archie/greek_letter_match.json)
- [Applications scene](../../../scenes/archie/applications.json)

The standalone [It's Greek to Me!](../../../../greek-letter-match.html) game joined the Applications scene as a compact way to learn the 24-letter Greek alphabet. Its ring keeps each letter at one fixed position: alpha is at noon, beta follows clockwise, and omega completes the circle. The ring can show lowercase symbols, uppercase symbols, or English letter names, while the center presents the form the player must match.

The fixed layout makes position part of the lesson rather than merely part of the interface. A correct choice turns the center green. An incorrect choice turns it red, highlights the correct ring item, and draws an arrow toward that answer. Each round can contain up to 24 prompts, with visible progress, a round percentage, and a session-only graph of completed-round scores. The player chooses when to lock in a full or partial round, and resetting starts a fresh session without preserving statistics outside the page.

The game also includes a teaching mode that does not affect the score. Selecting any ring item reveals its English name, lowercase form, and uppercase form together in the center, with the answer arrow reversed to connect the chosen position back to the explanation. The Greek glyphs use Georgia with optical centering adjustments so their visible forms sit consistently in both the ring and the teaching display.

This milestone matters because it gives the Applications scene a small educational game whose rules reinforce the alphabet's canonical order. Matching mode supports recall, teaching mode supports inspection, and the shared fixed ring lets a reader move between the two without relearning the layout.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bfdfc700a8e12ddd)
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
- [A3.3 Doubling-Frequency Resonance Lock](../noether-braid/braid-a3-3-doubling-frequency-lock.md)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4a7a0324f6e9e216)
Here $f_a$ is the layer frequency or return rate, $r_a$ is the characteristic radius or retained lever arm, $E_a$ is the retained branch-energy row, $s_a=\|\mathbf{v}_a\|$ is the scalar speed or speed statistic, $\phi_a$ is the phase offset, $\hat{\mathbf n}_a$ is the plane-normal or principal-direction row, and $\mathcal{L}_a$ is the active causal-root ledger. On a circular carrier chart one has $s_a=2\pi f_a r_a$, but that identity is only a chart relation. It does not make frequency, radius, speed, energy, phase, or ledger complexity subordinate to one fixed ordering.

This generalization changes the search program. Instead of asking first whether the doubling-frequency `4:2:1` pattern, the role-assigned $(f+2,f,f-1)$ binary-2 closure candidate, or another named row is correct, the solver should search the labeled but unordered domain
$$
\widetilde{\mathcal C}_{3R}
=
\left\{
(\mathcal T_1,\mathcal T_2,\mathcal T_3)
\right\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f45d1884465ade21)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-15e6c51fb55e5a05)
along with phase offsets, plane-orientation determinant, causal-root ledgers, response-center motion, group velocity, total momentum, total angular momentum, and assembly topological charge. Stable retained branches can then be compared by energy differentials $\Delta E_{ab}=E_a-E_b$, wake-history decomposition, sea stability, and accessory-architrino capture behavior. This is the beginning of a systematic periodic-table program for the Noether braid: classify stable six-body branches by topological labels and dynamical margins, then ask which architectures can bind additional architrinos without destroying the retained braid ledger.

The iso-frequency possibility became important in this wider space. A candidate can satisfy
$$
f_1=f_2=f_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e87a038acac89fa7)
without requiring equal radii, equal energies, equal speeds, equal phases, or equal root ledgers. In a circular comparison chart, different lever arms at common frequency give
$$
s_1:s_2:s_3
=
r_1:r_2:r_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0cba6c3f676ea5cf)
when the same angular-frequency convention is used. Thus an iso-frequency branch can naturally contain one or more super-field-speed carrier rows if a retained lever arm is large enough, while the primitive causal wake speed remains $c_f$. That is not a signal-speed violation. It is a branch-geometry statement: the transmitter trajectory can enter regimes with additional self-hit or partner-hit roots, Jacobian sign changes, folds, and caustic behavior.

This insight changes how the current candidates should be read. Doubling-frequency locks, source records that assign a closure role to binary 2, and iso-frequency rows are subfamilies of $\widetilde{\mathcal C}_{3B}$, not definitions of the Noether braid architecture. The iso-frequency row is especially valuable because it separates a common clock or return-frequency condition from the energy, radius, velocity, phase, and ledger data that may actually distinguish the three binaries. If such a branch exists, the energy differentials and speed regimes would be consequences of branch energy placement and retained lever-arm geometry, not of an imposed frequency hierarchy.

The milestone is therefore both terminological and mathematical. `Noether braid` gives the six-body retained branch a name that matches the topology the proof program needs, while the generalized Noether braid configuration space prevents the notation from prejudging the solution. The next honest work is systematic search: scan broad $B_1:B_2:B_3$ configurations, preserve $S_3$ repeats, identify stable retained branches in a sea of like assemblies, compare their energy differentials, and then test where accessory architrinos can attach.

## 2026-06-21: Causal Delay Feedback Visualization App

Relevant files:

- [Causal Delay Feedback](../../../../causal-delay-feedback.html)

The standalone [Causal Delay Feedback](../../../../causal-delay-feedback.html) app became the project surface for making causal-delay feedback depth visible. Its core lesson is that the present interaction state is not determined only by where the two architrinos are at the displayed instant. It also depends on retained transmitter history, causal-root status, delayed-hit records, and the active or rejected contribution records that determine which path-history terms can reach the other architrino now.

The app presents that lesson as a time-space canvas rather than as a formula panel. An electrino path and a positrino path are drawn as solid trajectories. The dotted causal-wake arc series are not displayed as connections between fixed history markers. Each visible arc series is recomputed from the replay paths: it begins at the back-solved emission point on the transmitting architrino path and ends at the reception point on the partner architrino path at the current replay time. The partial-arc view keeps the screen focused on the active transmitter-to-receiver sector, while the full-circular-arc preset remains available for showing the complete emitted wake geometry.

The runtime moved the app beyond a hand-drawn demonstration. The standalone page presents a representative mock replay through the explicit `?replay=mock` review mode. The mock replay advances the electrino and positrino together from declared initial positions and velocities, publishes frame samples and path-history data, and leaves the canvas runtime to derive the two wake series by back-solving emission points against the current reception points. The mock replay preserves a replay-shaped dataset contract: frames, retained path-history samples, delayed-hit diagnostics, rejected or unresolved root diagnostics, and compact contribution summaries.

The interface also settled into a cleaner teaching grammar. The canvas exposes preset selection, play and pause, reset, the `now` scrubber, canvas color, $c_f$ replay speed, architrino speed as $v/c_f$, weak-contribution cue mode, wake selection, and compact contribution readout. Fixed numbered retained path-history dots are no longer part of the default canvas grammar. Retained path-history samples and retained path constraints remain replay input data, and scripted review paths can still submit retained start, interior, final-position, fixed-signal-speed, and initial-velocity constraints through the replay contract.

This milestone matters because it turns causal-delay language into an inspectable object without letting the picture outrun the proof evidence. A reader can see the emitting point, the reception point, the two causal-wake series, the active cross-path contribution readout, and the distinction between visual replay and still-pending physical closure. For $\mathbb{A}\mathbb{A}\mathbb{A}$, that is useful pressure: the app has to keep teaching geometry, replay data, and proof status separate instead of letting them collapse into a single animation.

## 2026-06-20: Noether Braid Binary-2 Closure Candidate Narrowing

Relevant files:

- [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [Energy](../dynamics/energy.md)
- [A1 Dynamics](../noether-braid/braid-a1-dynamics.md#a1-dynamics)

The angular-momentum and spin proof route gained a sharper reduced candidate target around a rank-three source record that assigns the closure role to binary 2. The work used persistent `(1,2,3)` frequency-triplet notation to compare the indexed $(f+2,f,f-1)$ candidate against symmetric, doubling-frequency, and finite integer-lock controls. The point was not to accept a retained branch or make the closure role part of the taxonomy; it was to narrow the proof burden by making the candidate and its competitors machine-readable.

The strongest evidence came from the combination of row lineage, self-hit parity, phase-lock coverage, point-event witnesses, route-local transport and recoil balance, and competitor auditing. The binary-2 closure candidate remains on the candidate path because it keeps the strongest self-root parity proxy and phase-lock coverage among the tested rows. At the same time, the retained branch claim remains false: common positive-width retained time-domain coverage, zero-slack retained transport, accepted wake energy, action scale, energy routing, and full point-event rules are still missing.

This milestone matters because it replaced a broad question about whether a rank-three rotational-action pattern could carry angular-momentum and spin structure with a narrower branch-certificate problem. The live question is whether the route-authorized point-event and wake payloads can be lifted into one retained row set with accepted transport, partition, torque, phase, stability, and energy-routing rows. That is a much better mathematical target.

## 2026-06-20: Closure Scorecard Snapshot

The 2026-06-20 scorecard cycle recorded a dated snapshot: a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `65` after a full read of the `163` markdown files then under `content/markdown/aaa`. That snapshot gave modern physics an operational score of `88` and a mechanism score of `67`, for total $\Delta=-23$. These values are historical and are not the current scorecard.

Relevant files:

- [Closure scorecard](../validation/closure-scorecard.md)
- [Assessment table](../validation/closure-scorecard.md#assessment-table)
- [2026-06-20 assessment notes](../validation/closure-scorecard.md#2026-06-20-assessment-notes)

The strongest rows in that snapshot were Axiom+Notation and Theory Architecture+Ontic Logic at `99`, Coverage+Interface Readiness at `96`, Falsification Gates at `95`, Master EOM+Local Dynamics at `80`, and Internal Constituent Dynamics at `78`.

The same snapshot kept the main closure burdens visible. Empirical Precision+Benchmark Validation was `39` with $\Delta=-59$, Formula+Coefficient Recovery was `48` with $\Delta=-48$, Parameter+Scale Closure was `42` with $\Delta=-28$, Potential+Action Closure and Conservation+Invariant Closure were both `71` with $\Delta=-27$, and UV/IR+Regularization Completion was `49` with $\Delta=-21`.

The next retained rescore on 2026-06-26 raised the displayed $\mathbb{A}\mathbb{A}\mathbb{A}$ total to `68` over the then-current `167` markdown files. The 2026-06-28 anti-ratchet rescore kept the raw total at `67.90` (displayed `68`), revised the modern comparator to `86` operational and `56` mechanism, raised Falsification Gates to `98` and Internal Constituent Dynamics to `82`, and changed the displayed total deficit to `-18`. The linked scorecard owns all current values.

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

The app lets the reader change the candidate instead of only looking at a picture. Each braid has binary 1, 2, and 3 controls with enable switches, frequency, radius, and phase settings. The $\Delta x$ control changes the gap between the two braids in the side view, while the Virtual Observer controls choose the $(x,y,z)$ point where the app calculates the displayed electric-field readout.

That electric-field readout is not hand-drawn. The runtime sums delayed contributions from the active architrinos, finds causal roots, weights them by the transmitter-side acceleration weight $W^{\mathrm{acc}}/R^2$ on the same retained root, and reconstructs the transverse $\mathbf E$ signal at the Virtual Observer. The separate $\mathbf B$ graph is omitted because, in the app’s plane-wave comparison case, $\mathbf B$ follows from $\mathbf E$ by $\mathbf B=(1/c_{\mathrm{sig}})\hat{\mathbf x}\times\mathbf E$.

The polarization panel asks what kind of field the candidate actually produces. It fits $E_y(t)$ and $E_z(t)$ over one cycle and reports whether the observed signal looks weak, linear, circular, or elliptical. This is a diagnostic result, not a proof: the app helps find promising planar-pair settings, but photon closure still requires a separate branch-ledger argument.

The supporting documents keep that boundary clear. [Photon Guide](photon-guide.md) explains how to use the app. [Mode Taxonomy](../reactions/mode-taxonomy.md), [Horizon Chirality and Planar Spin](../spacetime/horizon-chirality.md), [Quantum Summary](../quantum/quantum-summary.md), and [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) state what still has to be recovered: stable transverse behavior, polarization, helicity, analyzer response, and no free longitudinal photon mode.

## 2026-06-10: Ideal Noether Braid Lorentz Geometry App

Relevant files:

- [A1 Lorentz Geometry App](../../../../ideal-braid.html)
- [A1 Lorentz Geometry Guide](ideal-braid-guide.md)
- [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md)
- [Lorentz Kinematics](../spacetime/lorentz-kinematics.md)

The standalone [A1 Lorentz Geometry App](../../../../ideal-braid.html) became the interactive inspection surface for the prescribed A1 Lorentz-geometry lesson built around an oblate spheroidal envelope. Its purpose is to make one candidate Noether braid deformation concrete: an A1 braid is shown inside a velocity-dependent envelope, the user adjusts $\beta_f=v/c_f$, and the app ties the visible flattening to $\gamma_f$, $\xi=R_{\parallel}/R_{\perp}$, relative time, relative length, and the normalized center-of-mass energy ledger. The controls also keep the lesson inspectable rather than merely illustrative: paths, surface, axes, orbit scale, cycle speed, and markdown overlays let the reader compare the moving geometry with the equations on the same screen.

The app deliberately does not claim to prove Lorentz kinematics from Noether braid dynamics. It records the target geometry in a form that can be checked visually and algebraically: in the zero-extra-scale lesson case, the displayed oblate spheroidal envelope satisfies $R_{\parallel}=R_{\perp}/\gamma$ and $\xi=1/\gamma$. That makes the Lorentz factor more than a formula in a side panel; it becomes the aspect ratio of the displayed envelope. The app is therefore a dictionary between the formula, the return-cycle picture, and the geometry that a later branch-ledger derivation would have to recover.

The three supporting documents divide the burden cleanly. [A1 Lorentz Geometry Guide](ideal-braid-guide.md) is the app-facing explanation: it defines the lesson purpose, the control meanings, the geometry dictionary, the energy and mass-equivalent readouts, and the claim level of the surface. [Return-Cycle Lorentz Quantization](../philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md) gives the reader-facing bridge: the continuous observer-level Lorentz function is not replaced by a step function; the discrete object is the admissible material return-cycle branch whose longitudinal and transverse cycles close to the same period. [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) carries the deeper proof program, where the Lorentz laws must be derived from delayed substrate dynamics, stable translating branches, closure residuals, and bounded preferred-frame leakage.

Together these four surfaces turned the Lorentz lesson into a governed research object. The A1 Lorentz Geometry App provides the visible target, the guide explains how to read it, the bridge names the branch-indexed mechanism, and the kinematics chapter states the mathematical work still required. That separation matters because it lets the project use the app pedagogically without mistaking a visualization for a completed theorem.

## 2026-04-19: PDG Applications Failure and Reset

The PDG application work reached a reset point after roughly a month of effort. The original goal was to ingest Particle Data Group reaction data, map selected channels into $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly bookkeeping, build a provenance-aware reaction diagram, and then animate the resulting reaction sequence. The work started from the animator and moved backward toward data ingestion, which made the requirements unstable and pushed too much logic into JavaScript before the reaction-data problem was understood.

The main lesson was architectural. A static 2D reaction-diagram tool was needed before a live animation tool, and a PDG data-analysis stage was needed before either one. The later Python pipeline made that clearer by separating PDG access, filtering, reaction solving, and diagram export, but by then the broad PDG-to-$\mathbb{A}\mathbb{A}\mathbb{A}$ solver had already accumulated too much uncertainty.

The deeper content problem was that many PDG reaction records are not complete causal histories. Collider records often list downstream products of an initial collision, such as proton-proton scattering, while leaving unresolved or undetected intermediates, photons, recoil channels, and Noether sea participation outside the record. That makes the data useful for comparison and selected examples, but not sufficient by itself to generate complete $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction provenance.

Only a small number of channels, especially neutron and muon beta-family reactions, were suitable as initial illustrative cases. The broad PDG completion project was therefore archived as a general solver effort. The reaction-diagram and animator surfaces remain useful as teaching and authoring tools, but their role is now narrower: they should present curated, provenance-aware examples rather than imply that raw PDG reaction tables can be automatically completed into full assembly histories.

## 2026-03-14: Doubling-Frequency Resonance Lock

Today the doubling-frequency-lock note, [A3.3 Doubling-Frequency Resonance Lock](../noether-braid/braid-a3-3-doubling-frequency-lock.md), was rewritten around an explicit assumption package. The live note now begins from the exact ring identity
$$
v_k=2\pi f_k r_k=\beta_k c_f
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b5dad870567909c2)
and then states explicitly the four assumptions that are actually doing the work.

The first assumption is the one that now carries the regime claim: outside the black-hole event horizon, and through the horizon-transition regime, source-record binary 2 is pinned at the field speed,
$$
v_2=c_f
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b78868cd05f358b7)
The second assumption is exact integer phase closure relative to the binary-3 period, $f_3:f_2:f_1=1:m:n$ with $1 < m < n$, so that when binary 3 completes one cycle, binaries 2 and 1 also return to cycle start. The third assumption is fixed relative phase lock, and the fourth is a selection principle: among admissible integer locks, the realized one should be the one that maximizes cycle-averaged cancellation of the low-order far-field or effective potential signal.

Under these assumptions, the geometry is controlled by the integer pair $(m,n)$ together with the remaining speed factors $\beta_3$ and $\beta_1$. The immediate formulas are
$$
r_2=\frac{r_3}{m\beta_3},
\qquad
r_1=\frac{\beta_1}{n\beta_3}\,r_3
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c57b996082b116f1)
So even if one later tests the doubling-frequency candidate $(m,n)=(2,4)$, the frequency lock $1:2:4$ does not force equal speeds and does not force self-similar radii.

The conceptual gain is that the note now separates three different burdens cleanly. Kinematics gives the exact identity above. Integer phase closure gives commensurate frequencies. The cancellation principle is then the extra ingredient that might select one preferred integer lock from the commensurate lattice.

This mattered for the larger program because the A1 candidate has to satisfy several closure burdens at once: frequency hierarchy, horizon behavior, radiation suppression, and eventually an effective stress-tensor story for higher assemblies. The revised note now reads as a live research surface with explicit assumptions and explicit non-assumptions.

## 2026-03-12: Master Equation Canon Handoff

Relevant files:

- [Master Equation: canonical form](../dynamics/master-equation.md#the-master-equation-canonical-form)
- [Master Equation: energy, Lagrangian, and Hamiltonian structure](../dynamics/master-equation.md#energy-lagrangian-and-hamiltonian-structure-of-the-architrino-dynamics)
- [Energy and conservation note](../dynamics/energy.md)
- [Causal action functional](../dynamics/causal-action-functional.md)
- [Lorentz near-miss in historical context](../philosophy-history/historical-context-and-missed-opportunities.md#lorentz-before-einstein-the-almost-substrate-moment)

The master equation uses the transmitter-side acceleration weight in the canonical per-hit law:
$$
\mathbf A_{i\leftarrow j}(T_r;T_t)
=
\kappa\,\sigma_{ij}\,
\frac{|q_i q_j|}{r_{ij}^2(T_r;T_t)}\,
W_{ij}^{\mathrm{acc}}(T_r;T_t)\,
\hat{\mathbf r}_{ij}(T_r;T_t),
\qquad
W_{ij}^{\mathrm{acc}}=\frac{c_f}{|D_{t,ij}|}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0132142e58e2d710)
with
$$
D_{t,ij}=c_f-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}(T_r;T_t),
\qquad
D_{r,ij}=c_f-\mathbf V_i(T_r)\cdot\hat{\mathbf r}_{ij}(T_r;T_t).
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a2b5cc65ac89d344)
The transmitter emits according to the same constant-cadence rule. Transmitter motion changes how the emitted wake surfaces bunch or dilate through $D_t$. Receiver motion changes the signed playback of successive emission times through $D_r/D_t$, but it does not change the acceleration strength of a surface that has already arrived.

Receiver velocity appears in signed root playback through $D_{r,ij}/D_{t,ij}$ and affects later reception geometry. Magnetic-like behavior remains an emergent closure target built from delayed geometry, transmitter-side acceleration weight, superposed radial hits, and assembly/Noether sea response; it is not inserted as a primitive cross-product acceleration.

The canon separates theorem-backed statements from closure targets. Current documents should not state, without local hypotheses, that the master equation is already the exact Euler-Lagrange variation of a completed non-local action or that global energy-momentum conservation is fully restored in every regime. The canonical stance is narrower: the regularized action-functional program supplies a variational lens, the per-hit law supplies the acceleration-first dynamics, and energy bookkeeping must state the assumptions under which work-energy, Noether-style, or action-based conclusions are being claimed.

Corpus requirements:

- include the transmitter-side acceleration weight wherever the canonical per-hit law is stated,
- avoid splitting the theory into a permanent "reduced model" and a separate "candidate action" unless the local document is explicitly discussing an approximation,
- replace over-broad conservation claims with assumption-scoped theorem language,
- keep constant emission cadence distinct from received causal-flux modulation,
- and retain receiver velocity only in root playback, future geometry, and derived energy-rate accounts where it is actually used.

The master equation is a genuinely delayed branch law rather than a static inverse-square law with delayed labels attached. The closure burdens are sharp: self-hit walls, magnetic-like behavior, Lorentz behavior, and action/energy structure all need to be derived from delayed geometry rather than asserted through imported field-theory vocabulary.

## 2026-03-11 Closure Scorecard

A reusable prompt was defined to compare $\mathbb{A}\mathbb{A}\mathbb{A}$ to modern physics along two distinct axes: operational effectiveness and foundational mechanism. The resulting scorecard makes the comparison explicit rather than rhetorical, and it can be reused in later assessment cycles without changing the basic lens.

Relevant files:

- [Closure scorecard](../validation/closure-scorecard.md)
- [Reusable assessment prompt](../validation/closure-scorecard.md#reusable-assessment-prompt)
- [Assessment table](../validation/closure-scorecard.md#assessment-table)

The scores illustrate both sides of the present situation. They show where $\mathbb{A}\mathbb{A}\mathbb{A}$ already does well, especially in architectural coherence and ontic-mechanism framing, and they also show where the framework still needs more development and improvement, particularly in coverage depth, parameter closure, and several mathematical bridge areas. That makes the scorecard useful not just as a verdict sheet, but as a development map.

## 2026-03-10 Consistent Philosophy-History Coverage

The philosophy-history documents treat their subjects through a consistent set of substantive questions rather than allowing individual units to accumulate as disconnected notes. The method remains part of editorial practice, while the reader-facing chapters state the resulting comparisons directly.

Relevant files:

- [Philosophy of Science](../philosophy-history/philosophy-of-science.md)
- [Major Thinkers](../philosophy-history/major-thinkers.md)
- [Information / Computation](../philosophy-history/information-computation.md)
- [Crisis in Physics](../philosophy-history/crisis-in-physics.md)

The shared questions remain visible in the substance of each treatment: what problem pressure produced the view, what still works, what fails or overstates, how the result relates to $\mathbb{A}\mathbb{A}\mathbb{A}$, and what survives as a recovery target or methodological constraint. Keeping the authoring schema out of the chapter prose leaves readers with the comparison itself rather than its editorial checklist.

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
- [Key speed-regime terms](comparative-glossary.md#key-speed-regime-terms)

The glossary works as a controlled translation layer. It pairs familiar modern terms with $\mathbb{A}\mathbb{A}\mathbb{A}$ replacements, clarifies which inherited phrases should be phased out, and gives compact bridge language for major regime distinctions. That makes it useful both for prose consistency and for helping new readers understand where the framework is reusing language, where it is redefining it, and where it is introducing genuinely different concepts.

## 2026-03-03: CKM Holonomy Relation Fixes the CP Phase

The [weak-mixing and CKM note](../philosophy-history/theory-bridges/weak-mixing-ckm.md) uses three calibrated CKM magnitudes, $\lvert V_{us}\rvert = 0.225$, $\lvert V_{cb}\rvert = 0.041$, and $\lvert V_{ub}\rvert = 0.0037$, as the standard three-angle parametrization inputs.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-06abf8ac8bcfb338)
with the starred entries used as calibration anchors. The remaining entries $\{\lvert V_{ud}\rvert,\lvert V_{cd}\rvert,\lvert V_{cs}\rvert,\lvert V_{td}\rvert,\lvert V_{ts}\rvert,\lvert V_{tb}\rvert\}$ are algebraic consequences of the imported standard three-angle parametrization. The table is therefore a comparison-grade reconstruction, not six independent $\mathbb{A}\mathbb{A}\mathbb{A}$ predictions.

The non-trivial model content is the holonomy relation
$$
\cos\delta = \frac{s_{13}}{s_{12}s_{23}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-068528654591af70)
which gives $\delta = 66.35^\circ$ and $J = 3.04 \times 10^{-5}$ from those inputs. The claim is restricted to that phase relation and its Jarlskog output; it is not full flavor closure.
