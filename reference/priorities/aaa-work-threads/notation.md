# Notation Strategy and Transition Plan

Closure goal: Establish the shortest clear and consistent notation for $\mathbb{A}\mathbb{A}\mathbb{A}$, starting from existing canon, then approve complete transitions by concept before changing the corpus or its consumers.

**Status:** Discussion draft, updated 2026-08-28. The operator authorized this planning document only. No proposed replacement below is approved for execution, and this document does not override the mathematical guides. The only current write target is this file; this planning task does not change corpus prose, guides, app code, schemas, tests, generated artifacts, or priority rankings.

## 1. Strategy

Use the briefest notation that accurately identifies the concept in its mathematical setting. Preserve familiar notation when its meaning remains compatible. Where $\mathbb{A}\mathbb{A}\mathbb{A}$ reframes a familiar concept, state the changed definition and use a short qualifier when needed to prevent the old definition from being imported. Give central theory concepts short canonical symbols that are reused consistently across documents.

The long-term target is a compact working mathematical language, not permanently verbose migration notation. A subscript should communicate a distinction that matters: coordinate layer, physical channel, event role, quantity type, or selected member. Do not attach a theory acronym or a generic qualification to every symbol merely to mark ownership.

The operator's direction supports the following strategy; its exact implementation remains open:

1. **Straighten out approved notation first.** The mathematical guides and accepted decisions are our initial choices, collected in Section 3.2. Prioritize their consistent use across all active consumers before reviewing the remaining frequency rows. They remain revisable, but record and approve departures explicitly; do not treat every collision as permission to redesign the notation.
2. **Assign notation by concept.** The same concept should have the same canonical notation wherever it appears. Different spellings of the same concept are a different problem from one familiar letter used for unrelated, explicitly scoped concepts.
3. **Preserve mathematical familiarity.** Keep established calculus operators, ordinary index conventions, and recognizable comparison formulas. A reframed physical interpretation does not automatically require replacing every familiar symbol.
4. **Claim short symbols when appropriate.** A central theory quantity can own a short symbol even if another discipline uses that letter differently. Define it clearly, document the reservation, and distinguish the meanings in comparison passages.
5. **Spend qualifiers where they prevent confusion.** Retain distinctions such as primitive versus observer-channel speed. Prefer a concise role subscript over a long descriptive identifier, but do not shorten away an unresolved physical distinction.
6. **Make the reframe explicit.** State what is preserved, what is redefined, its physical layer, and whether correspondence is a definition, derived result, recovery target, or comparison. Similar glyphs do not prove equivalent physics.
7. **Change a concept everywhere.** An approved transition includes every active occurrence of that concept, its definitions, dependent expressions, examples, app explanations, and relevant implementation interfaces. It does not replace every matching character regardless of meaning.
8. **Review readability as well as consistency.** A replacement that is longer, harder to recognize, or ambiguous with another quantity must earn its cost. Leave well-scoped conventional reuse alone unless it creates a concrete reader or calculation error.

Plainly: readers should learn one short name for each recurring concept. Extra marks belong where they stop two different things from being confused. A familiar letter can still do another clearly defined job in a separate mathematical setting.

### Reassessing the preliminary concern labels

The consultation census identified overloaded notation, not mandatory renames. Its `Concern` labels are review leads. Using $n$ for an integer and for normalized density, or $\pi$ for the circle constant and for a permutation, does not by itself establish an error. Ask whether a reserved meaning is violated, whether meanings coexist ambiguously, and whether the same concept changes notation between documents.

The current [symbol canon](../../../content/markdown/aaa/archie/mathematics-terminology.md) is stricter than unrestricted local reuse: one glyph has one meaning within a document; a symbol used in three or more chapters requires a canonical row; subscripts and indices are part of identity. An allowance for clearly scoped bound indices or conventional comparison notation must therefore be decided in the guides before it is used as an exception. This plan does not silently relax that rule.

Plainly: an integer index called “en” is not automatically a density mistake. But a chapter cannot quietly change a reserved meaning. We need to agree where a mathematical scope begins and ends before enforcing a global rename.

## 2. Existing Knowledge: The Initial Draft

### 2.1 Authority and ownership

This hierarchy is already stated in [Terminology Usage: Canon Ownership and Precedence](../../../content/markdown/aaa/archie/terminology-usage.md#canon-ownership-and-precedence).

| Existing owner | What it controls | Use in this plan |
| --- | --- | --- |
| [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md) | Equation construction, coordinate layers, TeX, vectors, indices, presentation. | First owner for strategy, permitted shorthand, and the eventual reader explanation. |
| [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md) | Canonical cross-chapter symbols and their meanings. | Authoritative definitions and reservations; approved decisions ultimately land here. |
| [Terminology Usage](../../../content/markdown/aaa/archie/terminology-usage.md) | Term selection, physical-layer distinctions, rationale. | Explains why an inherited ontology must not enter a substrate derivation through familiar language. |
| [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md) | Translation between standard frameworks and this theory. | Records inherited meaning, reframed meaning, and correspondence status; does not override symbol canon. |
| [Academic Style Guide](../../../content/markdown/aaa/archie/academic-style-guide.md) | Expository structure and comprehension. | Keeps definitions and explanations near their equations. |
| [Repository instructions](../../../AGENTS.md) | Theory layers, normalized wake-speed units, evidence and edit boundaries. | Prevents a notation change from becoming an unapproved physical or workflow change. |

Plainly: the style guide explains how to write the mathematics, the symbol glossary says what it means, and the comparison glossary explains how to read it alongside familiar physics. This planning file must not become a competing permanent glossary.

### 2.2 Current reservations and distinctions

These are observed rules in the live guides, not new policy approved by this plan.

| Subject | Current notation and rule | Initial disposition |
| --- | --- | --- |
| Absolute time and position | $T$, $\mathbf X$, $\mathbf X_i(T)$; native differentials use the same capitals. | Retain. |
| Velocity and acceleration | $\mathbf V=d\mathbf X/dT$, $\mathbf A=d\mathbf V/dT$; bold vectors, hats for unit directions. | Retain; distinguish scalars and components. |
| Observer chart and clock | $t_{\mathrm{eff}}$, $x_{\mathrm{eff}}^i$ for observer coordinates; $\tau$ for derived physical-clock time. | Retain pending an explicitly approved shortening policy. |
| Other time quantities | $T_t$ emission, $T_r$ reception, $T_W$ record window, $T_{\mathrm{rec}}$ persistence duration, $T_{\mathrm{temp}}$ temperature. | Preserve roles; resolve period notation separately. |
| Spatial metric | $h_{ij}$ for Euclidean geometry; $g_{\mu\nu}^{\mathrm{eff}}$ and indexed $\gamma_{ij}^{\mathrm{eff}}$ for observer geometry. | Retain type and layer distinctions. |
| Speed channels | $c_f$ primitive wake; $c_{\mathrm{eff}}$ dressed assembly channel; $c_\gamma$ photon channel; $c_0$ asymptotic calibration; $c_\star$ declared comparison channel. | Retain; equality requires a derivation and regime. |
| Speed ratios | Channel-qualified $\beta_f,\beta_{\mathrm{eff}},\beta_\star$ and corresponding $\gamma$ factors; $v$ assigned to assembly drift. | Retain channels; resolve internal orbital-speed uses. |
| Density and delay | $n=\rho_{\mathrm{NS}}/\rho_{\mathrm{NS},0}$ is normalized sea density; $\chi_{\mathrm{sea}}=c_f/c_{\mathrm{eff}}$ is sea delay factor. | Retain; do not call native delay factor $n$. |
| Envelope geometry | $\xi=R_\parallel/R_\perp$ is shape; $\lambda=R_\perp/R_{\perp,0}$ is transverse scale. | Retain these short assignments initially. |
| Polarity and interaction | $q_i$ polarity, $\epsilon$ polarity magnitude, $\epsilon_\pm$ inventory units, $\kappa$ coupling, $\sigma_{tr}$ interaction sign. | Retain; separate effective charge bookkeeping. |
| Causal-hit geometry | $\Delta_{r\leftarrow t}$ delay, $\mathbf r_t$ separation vector, $r$ distance, $D_t,D_r$ event-role factors, $W^{\mathrm{acc}}$ acceleration weight. | Retain; different factors or weights are not spelling variants. |
| Universe state | $\mathbb{U}_{\text{now}}\equiv S(T)$. | Retain; resolve other state/action/entropy contexts by scope. |
| Differential operators | $\nabla,\nabla^2$ for spatial differentiation and Laplacian; subscripted $\Delta$ for delays or residuals. | Retain, along with ordinary finite changes such as $\Delta E$. |
| Identifier spelling | Subscripts and indices are part of identity; stable identifiers use $\mathrm{...}$, ordinary words use $\text{...}$. | Normalize only after distinguishing identifiers from prose. |
| Local definitions | Define new symbols locally; shared symbols also need canonical definitions. | An app fallback is not a substitute. |
| Comparison formulas | Label the standard form, supply a layer-explicit working form and symbol map. | Retain; no standard-physics premise imported into the substrate. |

Plainly: the existing system already gives short names to time, position, polarity, density, shape, and scale. Its longer names usually distinguish clocks, channels, or event roles. Those distinctions should survive any improvement in spelling.

### 2.3 Earlier decisions and unfinished work

Live Git history confirms earlier notation work. Commit `626211d84` on 2026-07-05 included capital native coordinates, vector notation, and coordinate-layer normalization. Commit `a6c3d9c79` on 2026-07-06 further distinguished observer calibration from primitive wake speed in effective-potential formulas. These are evidence of deliberate choices, not authority to restore every formula or convention they contained; current owners govern.

The [cross-workstream queue](work-queue.md) already routes related work through AWT-006 (atomic/nuclear notation review), AWT-007 (spacetime notation, ownership, and speed distinctions), and AWT-014 (speed-symbol consolidation). This file coordinates discussion without closing those tasks, changing status or ranking, or claiming their physical blockers have disappeared.

One live guide conflict illustrates the need to review guidance itself: the comparative glossary's Absolute Time row still uses lowercase $t$ for the native global parameter, while the mathematical owners reserve $T$. The precedence rule identifies the owner; the non-owner occurrence belongs in the future inventory.

Plainly: earlier discussions left durable rules and some unfinished propagation. Preserve the decisions that still hold, repair incomplete propagation, and explicitly reconsider any rule the operator wants to improve.

## 3. Equation Census and Its Limits

### 3.1 Snapshot and instrument

The consultation examined the [Equation Mapping registry](../../../content/generated/equation-mapping/corpus-equations.json). Its contents were rechecked unchanged while preparing this draft.

| Observation | Recorded value and boundary |
| --- | --- |
| Equation records | 4,598 display records in 153 files containing displays; the generator scans 199 Markdown files in total. |
| Repeated formulas | 4,436 distinct strings after whitespace normalization; 162 excess records under that limited test. Not an algebraic redundancy count. |
| Instrument | One-off JavaScript traversal of vendored KaTeX 0.16.11 parse trees; exploratory, not an accepted semantic validator. |
| Coverage | All 4,598 formulas parsed; one unsupported triple-dot spelling expanded in scratch analysis only. Four manually enumerated examples checked selected tokenization behavior, not whole-corpus semantics. |
| Uses | Selected symbol appearances, including repeats inside one formula. |
| Equations | Records containing the normalized symbol; repeated records remain included. |
| Normalization | Numeric powers grouped with bases; subscripts, named superscripts, and vector styling generally retained; equivalent bracing and identifier text/roman spellings normalized. Operator limits traversed separately. |
| Exclusions | Numerals, punctuation, basic arithmetic/relation signs, ordinary text, and named functions. Named calculus operators remain counted. |
| Assessment grade | Counts measured under instrument conventions; meanings and consistency inferred from canon and sampled contexts. |
| App descriptions | 29,623 symbol-description records; 20,375 (68.8%) classified as `shared-context` fallback text. Not a measurement of how many symbols lack mathematical definitions. |

Plainly: the census tells us what readers encounter often. It does not establish that repeated letters have the same meaning, duplicate formulas are unnecessary, or every occurrence has been semantically reviewed.

Registry SHA-256: `c67ac690439a18b541775793b88fd30e59332b308d7006fe8d02422ab006a36b`. Consultation script SHA-256: `dee997fcebe1599eb8f557e85c978f66471feaa8a1a82734dcee2197676e10e7`. The script and full output were temporary consultation artifacts; this file preserves the findings without depending on temporary-file links. Rebuild a reproducible census before treating counts as migration acceptance evidence.

Plainly: these fingerprints identify the input and instrument. A changed input or counting rule needs a new dated result; this table must not silently become a current enforcement baseline.

A numeric superscript may mean a power or a space's dimension; an inverse may mean reciprocal or inverse map. Indices, quantities, and particle labels can share glyphs. The temporary normalization is unsuitable for automatic replacements. Repetition also biases frequency toward repeated exposition. A semantic inventory must retain raw TeX and source locations alongside normalized identifiers and report occurrence-weighted and deduplicated views.

Plainly: a search hit is a place to inspect, not permission to replace. First establish the object, units, indices, and physical layer.

### 3.2 Approved $\mathbb{A}\mathbb{A}\mathbb{A}$ notation — first priority

**Current choices, open to revision.** The [canonical symbol guide](../../../content/markdown/aaa/archie/mathematics-terminology.md) and [style guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md) already assign the meanings below. These are our starting choices, not new proposals and not immutable decisions. Our first priority is to straighten out their definitions and use across the corpus, app-equation, and other active consumers. Any replacement of an approved form must be explicitly agreed before propagation.

Plainly: start with the symbols we already think we want. Make their use consistent everywhere; reconsider a choice when there is a clear reason to improve it.

#### 3.2.1 Approved reservations represented in the top 50

The following 16 rows are moved from the original census table; the remaining 34 follow in Section 3.3. Ranks, counts, and preliminary assessments are unchanged. The meaning column now states the approved role, not the collection of meanings encountered. Counts still include other uses of the counted symbol: the $S$ count, for example, is not a count solely of the approved universe state $S(T)$.

| Census rank | Symbol | Uses | Equations | Approved meaning | Preliminary consistency assessment |
| ---: | --- | ---: | ---: | --- | --- |
| 1 | $T$ | 1,786 | 705 | Absolute time | Concern: also cycle period. |
| 5 | $T_t$ | 648 | 238 | Transmitter emission time | Consistent event role. |
| 8 | $c_f$ | 443 | 337 | Primitive wake speed | Consistent shared quantity. |
| 10 | $T_r$ | 398 | 142 | Receiver reception time | Consistent event role. |
| 12 | $t_{\mathrm{eff}}$ | 342 | 163 | Observer coordinate time | Consistent layer distinction. |
| 13 | $\mathbf X$ | 338 | 178 | Euclidean position vector | Consistent position/configuration geometry. |
| 15 | $c_0$ | 317 | 193 | Observer speed calibration | Consistent channel assignment. |
| 19 | $r$ | 274 | 134 | Causal separation distance | Mixed separation and orbital geometry. |
| 21 | $v$ | 249 | 119 | Assembly drift speed | Concern: assembly drift and internal orbit. |
| 24 | $n$ | 212 | 144 | Normalized Noether braid density | Concern to reassess by scope. |
| 26 | $\beta_f$ | 209 | 111 | Drift/wake-speed ratio | Concern: drift or orbital numerator. |
| 29 | $\xi$ | 176 | 88 | Envelope shape ratio | Concern: distinct core definitions. |
| 37 | $\nabla$ | 145 | 104 | Spatial differentiation | Consistent; coordinate layer matters. |
| 38 | $\kappa$ | 139 | 123 | Interaction coupling | Consistent core role. |
| 41 | $S$ | 135 | 95 | Universe state, as $S(T)$ | Concern: also surfaces and Bell expressions. |
| 43 | $\lambda$ | 131 | 75 | Transverse scale ratio | Concern: also wavelength and hidden variable. |

Plainly: “approved” describes the intended symbol and meaning. It does not certify all counted occurrences. A concern in this table is a priority to investigate, not an already approved replacement.

#### 3.2.2 Related approved forms, including those outside the top 50

These families complete the central reservations summarized in Section 2.2 and include other explicit assignments in the live guide. They belong to the same first-priority pass even when they are uncommon. No occurrence counts are assigned here without a fresh census. This is a planning extract; the linked guides remain the full authority.

| Approved form or family | Brief meaning | First-pass obligation |
| --- | --- | --- |
| $\mathcal M=\mathbb R\times\mathbb R^3$, $\Sigma_T$, $\mathbf X_i(T)$ | Absolute timespace; slice; worldline | Preserve absolute time and Euclidean space; no substrate spacetime metric. |
| $\mathbf V=d\mathbf X/dT$, $\mathbf A=d\mathbf V/dT$ | Velocity; acceleration | Keep vectors, scalar speeds, components, and derivatives distinct. |
| $h_{ij}$, $\hat{\mathbf r}_t$, $\|\cdot\|$, $\nabla^2$ | Spatial metric; direction; norm; Laplacian | Retain spatial layer and vector/operator identity. |
| $x_{\mathrm{eff}}^i$, $dt_{\mathrm{eff}}$, $dx_{\mathrm{eff}}^i$, $\partial_{t_{\mathrm{eff}}}$ | Observer coordinates and derivatives | Pair with $t_{\mathrm{eff}}$; require an explicit map from absolute coordinates. |
| $\tau$, $d\tau$ | Derived clock time | Distinguish clock readout from either coordinate time. |
| $T_W$, $T_{\mathrm{rec}}$, $T_{\mathrm{temp}}$ | Record window; persistence; temperature | Protect bare $T$; do not merge these quantities. |
| $\mathbb U_{\text{now}}\equiv S(T)$ | Complete universe state | Preserve the required history and provenance; classify other $S$ uses separately. |
| $c_{\mathrm{eff}}$, $c_\gamma$, $c_{\mathrm{GW}}$, $c_\star$ | Dressed; photon; gravitational-wave; declared speed | Keep channel definitions distinct, alongside $c_f$ and $c_0$. |
| $\beta_X=v/c_X$, $\gamma_X=(1-\beta_X^2)^{-1/2}$ | Channel drift ratio; Lorentz factor | Use a declared channel $X$; do not silently use internal orbital speed for $v$. |
| $\rho_{\text{NS}}$, $\rho_{\text{NS},0}$, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | Physical; reference; normalized density | Reserve $n$ for normalized density; decide local-index exceptions explicitly. |
| $\chi_{\text{sea}}=c_f/c_{\mathrm{eff}}$, $\chi_\gamma=c_0/c_\gamma$ | Sea; photon delay factors | Preserve different reference speeds; neither is density $n$. |
| $\xi=R_\parallel/R_\perp$, $\lambda=R_\perp/R_{\perp,0}$ | Envelope shape; transverse scale | Separate delay angles, wavelengths, and other parameters from these geometry ratios. |
| $\Omega(n,\lambda)$, $\omega_{\text{clk}}/\omega_0=d\tau/dt_{\mathrm{eff}}$ | Constitutive factor; clock-rate ratio | Keep geometry, constitutive response, and extracted clock rate distinct. |

Plainly: the less frequent partners matter too. Time, speed, density, shape, and clock readings need complete families of names, not isolated repairs to their most common letters.

| Approved form or family | Brief meaning | First-pass obligation |
| --- | --- | --- |
| $\epsilon$, $\epsilon_\pm$, $q_i$, $q_t$, $q_r$, $\sigma_{tr}$ | Polarity magnitude; labels; values; interaction sign | Keep inventories, fixed polarities, and the acceleration sign aligned. |
| $T_t$, $T_r$, $\Delta_{r\leftarrow t}=T_r-T_t$ | Emission; reception; travel delay | Distinguish a time delay from an angle or finite change. |
| $\mathbf r_t$, $r=\|\mathbf r_t\|$, $\hat{\mathbf r}_t$ | Causal separation; distance; direction | Use the emission site and reception site, not simultaneous positions. |
| $\mathcal C_{r\leftarrow t}(T_r)$ | Arriving emission-time set | Preserve transmitter/receiver roles and causal-root membership. |
| $D_t$, $D_r$, $J^t_{r\leftarrow t}$, $W^{\mathrm{acc}}_{r\leftarrow t}$ | Emission; crossing; Jacobian; acceleration weight | Protect the separate formulas; legacy weight differences are not automatic renames. |
| $\delta(r-c_f\Delta)$, $\delta_\eta$, $H(\Delta)$, $\Phi$, $\Phi_\eta$ | Causal surface; smoothing; step; potentials | Retain the declared distribution, smoothing, and causal conventions. |
| $o_{\mathrm{PA}}$, $c_{\mathrm{pol}}$, $\chi_{\mathrm{pol}}$ | Orientation; polarity assignment; handedness | Preserve each sign's definition and domain of validity. |
| $a\in\{1,2,3\}$, $(R_a,f_a,\phi_a)$, $h\in\{1,2,3\}$ | Binary identity; coordinates; candidate carrier | Do not relabel persistent indices by size or speed; $h$ needs its declared analysis. |
| $g_{\mu\nu}^{\mathrm{eff}}$, $\gamma_{ij}^{\mathrm{eff}}$, $\Gamma^\lambda_{\mu\nu}(g^{\mathrm{eff}})$ | Observer metrics; connection | Keep tensor indices and observer layer; scalar $\gamma_{\mathrm{eff}}$ is a different object. |
| $\Phi_N$, $\Phi_{\text{eff}}$, $U$, $U_\Phi$, $U_{\text{eff}}$ | Benchmark; constitutive; branch potentials | Preserve the guide's signs, definitions, and effective/comparison roles. |
| $K_\parallel,K_\perp$, $(k_2,\ell_2,k_4,\ell_4)$ | Stiffness channels; expansion coefficients | Keep axis roles and expansion conventions together. |
| $\gamma_{\mathrm{PPN}}$, $\beta_{\mathrm{PPN}}$, $\alpha_i$, $\Xi_i$, $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}$ | Comparison parameters; leakage diagnostics | Do not consume the dressed drift symbols $\beta_{\mathrm{eff}},\gamma_{\mathrm{eff}}$. |
| $\mathcal L_{\text{eff}}$, $D_\mu$, $g,g'$, $\theta_W$, $Y$ | Effective Lagrangian and gauge symbols | Preserve labeled effective mappings; these are not primitive premises. |
| $a(t_{\mathrm{eff}})$, $H(t_{\mathrm{eff}})$, $\Omega_m$, $\Omega_\Lambda$ | Effective cosmology summaries | Keep observer-time dependence and distinguish local index and operator uses. |

Plainly: approved notation does not certify the physical result it names. A recovery target stays a target, a conditional quantity stays conditional, and a change of spelling must not change the mathematics.

**First-priority order:** time and coordinate roles; speed channels and drift ratios; density, delay, shape, and scale; then the remaining approved state, polarity, causal-interaction, and effective families. Start with the documented collisions involving $T$, $v,\beta_f$, and $\xi$, while carrying all related approved forms through each complete dependency batch. Within this pass, keep consistent families unchanged after verification. Review the remaining frequency rows afterward, except where a collision with an approved family makes them part of its batch. An unresolved decision blocks that family, not other approved families; record any deferred approved family explicitly.

### 3.3 Remaining top-50 rows from the consultation

These 34 rows complete the original top 50 after the approved reservations moved to Section 3.2. Their placement does not make ordinary calculus or conventional local notation disapproved. They are a second review priority unless they collide with an approved family; for example, bare $t$ and $c$ must be inspected during the time/channel pass.

`Consistent` means a stable role in sampled contexts. `Mixed` identifies local reuse. `Concern` preserves the preliminary review lead, not a mandatory rename. Section 1 governs reassessment. Ties are ordered by equation count, then normalized spelling.

| Rank | Symbol | Uses | Equations | Brief meaning | Preliminary assessment |
| ---: | --- | ---: | ---: | --- | --- |
| 2 | $d$ | 1,224 | 589 | Differential; distance | Mixed: also particle label. |
| 3 | $\Delta$ | 1,019 | 492 | Change; delay; phase gap | Concern: roles can have different units. |
| 4 | $\theta$ | 703 | 317 | Angle; parameter collection | Concern: also configuration and history parameter. |
| 6 | $\sum$ | 508 | 379 | Summation | Consistent operator. |
| 7 | $\partial$ | 478 | 268 | Derivative; boundary | Mixed conventional roles. |
| 9 | $a$ | 408 | 219 | Scale factor; index | Mixed: also outcome and coefficient. |
| 11 | $\int$ | 354 | 276 | Integration | Consistent operator. |
| 14 | $i$ | 335 | 261 | Index; imaginary unit | Mixed conventional roles. |
| 16 | $A$ | 317 | 168 | Assembly; coefficient | Mixed: also apparatus and clock factor. |
| 17 | $\pi$ | 303 | 250 | Circle constant; map | Mixed: also permutation and record map. |
| 18 | $W$ | 287 | 165 | Observation window/domain | Mixed temporal and spatial scope. |
| 20 | $b$ | 255 | 146 | Branch; outcome; parameter | Mixed local definitions. |
| 22 | $s$ | 235 | 118 | Speed; path parameter | Mixed: also sign and particle label. |
| 23 | $R$ | 215 | 146 | Radius; map; curvature | Mixed quantity types. |
| 25 | $\delta$ | 210 | 121 | Variation; delta distribution | Mixed: also local phase difference. |
| 27 | $k$ | 196 | 111 | Wavenumber; index | Mixed mode, outcome, component roles. |
| 28 | $t$ | 195 | 96 | Unqualified time | Concern where working layer is undeclared. |
| 30 | $E$ | 174 | 108 | Energy; endpoint label | Mixed: also environment class. |
| 31 | $j$ | 173 | 145 | Transmitter/component index | Mixed indexed objects. |
| 32 | $m$ | 167 | 117 | Effective mass; mode index | Mixed quantity and integer label. |
| 33 | $\ell$ | 165 | 95 | Length; mode/index | Mixed length, harmonic, binary roles. |
| 34 | $O$ | 158 | 136 | Remainder order; observer | Mixed, predominantly order estimates. |
| 35 | $\omega$ | 151 | 73 | Angular frequency | Consistent quantity, differing oscillators. |
| 36 | $\hbar$ | 148 | 117 | Reduced action quantum | Consistent meaning; recovery status separate. |
| 39 | $T'$ | 136 | 47 | Auxiliary/transformed time | Mixed integration/transformation roles. |
| 40 | $e$ | 135 | 96 | Exponential base; charge | Mixed: also event labels. |
| 42 | $N$ | 131 | 81 | Count; clock factor | Mixed discrete and continuous roles. |
| 44 | $p$ | 130 | 69 | Momentum; spiral pitch | Mixed: also scaling parameter. |
| 45 | $P$ | 127 | 68 | Probability; momentum magnitude | Mixed local meanings. |
| 46 | $c$ | 123 | 91 | Comparison speed; label | Concern where speed channel is unspecified. |
| 47 | $\rho$ | 123 | 71 | Density; radius ratio | Concern: also statistical state and action fraction. |
| 48 | $\theta_{\mathrm{sea}}$ | 121 | 63 | Sea-state parameters | Mostly consistent; record contents vary. |
| 49 | $u$ | 120 | 62 | Drift; auxiliary parameter | Mixed: also integration and particle labels. |
| 50 | $z$ | 119 | 49 | Redshift; coordinate | Mostly consistent in cosmology; other local roles. |

Plainly: these rows retain the rest of the census, with their original ranks and counts. Frequency helps us find common notation, but our approved concepts determine what we straighten out first.

### 3.4 Strongest source-backed leads

- **Time versus period:** [Return-Cycle Lorentz Quantization](../../../content/markdown/aaa/philosophy-history/theory-bridges/return-cycle-lorentz-quantization.md) uses $T(v)=\gamma_\star(v)T_0$ for duration, while canon reserves $T$ for absolute time. [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md) already uses $P_b$ for branch period, an existing short alternative.
- **Shape versus delay angle:** [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md) defines $\xi=\omega\Delta/2$ in circular geometry; [Braid Envelope Geometry](../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md) uses $\xi=R_\parallel/R_\perp$. They are different dimensionless objects.
- **Drift versus circulation:** the circular Master Equation benchmark uses $v=\omega R$ and $\beta_f=v/c_f$ for internal motion, while the guide assigns $v$ to assembly drift. Existing binary ratio $s$ is a possible compact destination, subject to preserving dimensions.

Plainly: a period is a duration, xi can mean flattening or an angle, and internal motion is not movement of the whole assembly. These are concrete opportunities to carry the wrong definition between related derivations.

Each lead is overturned or narrowed by a valid explicit mapping and approved scope rule that makes the roles unambiguous. Counts alone cannot establish these semantic findings.

## 4. Proposed Transition Table

**Every entry is a discussion proposal.** “Retain” recommends keeping canon; it does not authorize enforcement. Candidate spellings require a collision and ownership inventory. A transition includes a concept and all active consumers. It can close separately from other concept families, but not after changing only one chapter.

### 4.1 Time, geometry, and speed

| Current use | Proposed destination | Reason and scope | Prerequisite or decision |
| --- | --- | --- | --- |
| $T$ absolute time | Retain $T$. | Central short canonical quantity. | Existing canon; enforcement awaits authorization. |
| Native $t,\mathbf x$ or scalar-styled vectors | $T,\mathbf X$ and indexed native forms. | Existing coordinate-layer rule. | Classify native/comparison uses; preserve actual scalar components; include guidance consumers. |
| Observer $t,x^i$ in working formulas | $t_{\mathrm{eff}},x_{\mathrm{eff}}^i$. | Distinguish observer and substrate coordinates. | No shortening to bare letters without a guide decision. |
| $T(v),T_q,T_0$ as periods | Prefer existing $P,P_b$ and corresponding $P_0$; $P_{\mathrm{cyc}}$ only when another $P$ coexists. | Short period notation; reserve $T$. | Approve family reservation; inspect probability, pressure, and momentum collisions first. |
| Bare $T$ temperature | $T_{\mathrm{temp}}$ or an existing temperature subscript. | Already settled in the guide. | Preserve true absolute-time uses. |
| $\tau$ physical-clock readout | Retain $\tau$. | Familiar clock/proper-time bridge. | Do not identify it with absolute time. |
| $\tau$ native causal travel delay | Prefer $\Delta$ with event subscripts when needed. | Separate travel delay from clock readout. | Comparison relaxation/proper-time meanings are separate concepts. |
| $\Delta$ change, travel time, phase gap | Keep $\Delta E$; explicit delay $\Delta_{r\leftarrow t}$; existing $\delta$ family for full delay angles. | Preserve concise forms without mixing duration and angle. | Check delta distributions and variations before selecting angle spelling. |
| $\xi$ envelope shape | Retain $\xi$. | Existing short geometry reservation. | Preserve axis-ratio definition, not a Lorentz identity by definition. |
| $\xi$ half-delay angle | Candidate $\xi_d$; alternatively an already defined full angle divided by two. | Short distinction with minimal algebraic change. | Audit candidate; a full-angle transformation changes derivative factors and domains. |
| $\lambda$ envelope scale | Retain $\lambda$. | Existing concise shape/scale pair. | Inspect adjoining wavelength/eigenvalue/hidden-variable uses. |
| Other $\lambda$ concepts at shared interfaces | Candidates $\lambda_\gamma$ wavelength, $\lambda_{\mathrm{hv}}$ hidden variable when needed. | Familiar letter with a role qualifier. | No mandatory suffix in isolated approved comparison notation; no invented equivalence to a history record. |
| Primitive/dressed/photon/calibration speeds | Retain $c_f,c_{\mathrm{eff}},c_\gamma,c_0,c_\star$. | Protect physical channels. | No collapse without theorem and regime; numerical primitive wake speed remains $c_f=1$. |
| Bare $c$ in native or mixed working formulas | Actual declared channel symbol. | Remove an unspecified propagation law or denominator. | Identify from definition, not familiar algebra. |
| $v$ assembly drift | Retain $v$. | Existing short role. | Separate assembly and internal motion. |
| Dimensionful internal orbital $v$ | Candidate $v_{\mathrm{orb}}$ or explicit $\|\mathbf V_i\|$. | Preserve dimensions and identify the moving object. | Audit existing orbital notation; never replace a speed directly by a ratio. |
| Orbital $\beta_f$ and binary $s$ | Prefer existing $s$ internally; keep $\beta_f$ for drift ratio. | Short distinction between circulation and translation. | Verify $v_{\mathrm{orb}}=c_f s$ and every dependent factor, bound, and derivative. |
| PPN versus drift $\beta,\gamma$ | Retain $\beta_{\mathrm{PPN}},\gamma_{\mathrm{PPN}}$ and channel-qualified drift factors. | Existing distinct roles. | Indexed metric tensors are not these scalar parameters. |

Plainly: keep short names for the main concepts. Qualify a competing use or reuse an existing short alternative. Do not turn a change of letters into a hidden change of units, angle normalization, or physical channel.

### 4.2 State, density, polarity, and conventional reuse

| Current use | Proposed destination | Reason and scope | Prerequisite or decision |
| --- | --- | --- | --- |
| Normalized sea density $n$ | Retain $n$ and dimensional $\rho_{\mathrm{NS}}$. | Deliberately concise constitutive notation. | Same definition in every consumer. |
| Native delay/refractive factor called $n$ | $\chi_{\mathrm{sea}}$ or declared photon variant. | Existing density/delay distinction. | Standard optical $n$ may remain as labeled comparison with a map. |
| $n$ bound integer index | Preserve where approved scope permits; another index when density coexists. | Avoid renaming harmless dummy variables everywhere. | Decide exception against current document-wide reservation rule first. |
| $\theta$ angle and parameter record | Keep geometric $\theta$ and shared $\theta_{\mathrm{sea}}$; candidate $\theta_{\mathrm{cfg}}$ for colliding configuration records. | Angle versus parameter collection. | Inventory schemas; bolding an abstract record does not make it a vector. |
| $\rho$ density, normalized radius, delayed radius ratio, statistical state | Keep established density/state notation by domain; candidates $\rho_R$ normalized radius and $\rho_d$ delayed/current radius ratio where derivations meet. | Separate distinct ratios and densities. | Approve exact definitions; no blanket suffix for conventional uses. |
| Complete universe state $S(T)$ | Retain $S(T)$ and $\mathbb{U}_{\text{now}}$. | Existing compact identity. | Preserve required history; naming does not prove state sufficiency. |
| Other $S$ meanings in shared native exposition | Existing $\mathcal S$ for action where applicable; candidates $S_{\mathrm{th}}$ entropy and $S_{\mathrm{CHSH}}$ Bell expression where needed. | Protect recognizable concepts without banning conventional $S$. | Classify action, source, surface, entropy, and statistical meanings. |
| $E$ energy and endpoint/environment labels | Keep energy $E$; candidate $\mathrm{em},\mathrm{rec}$ endpoint labels at ambiguous interfaces. | Preserve the familiar energy symbol. | An event is not merely its time; retain full event data and mapping. |
| $W$ spatial domain and time interval | Keep domain $W$, duration $T_W$; candidate interval $I$ when both coexist. | Domain versus duration. | Inspect other $I$ roles; neither object is $W^{\mathrm{acc}}$. |
| $\epsilon$ polarity and tolerance | Keep polarity $\epsilon$; existing $\varepsilon$ with purpose subscript where needed for tolerances. | Small typographic distinction. | Verify rendering and tolerance consumers; values stay unchanged. |
| $q_i$ polarity and generalized coordinate | Keep polarity $q_i$; use the existing reduced-coordinate family, often $y$, where both meet. | Coordinate values are not fixed polarity values. | Keep conventional $q,p$ in labeled comparisons with a map. |
| $h,\hbar$ action; $h_{ij}$ metric; $h$ history horizon | Keep action and metric conventions; candidate $h_{\mathrm{mem}}$ for colliding history horizon. | Include this below-top-50 family because guides already distinguish the roles. | Audit horizon versus memory-usage definitions before reusing the subscript. |
| $\mu_{\mathrm{arch}}$ and mass-like fields | Retain declared numerical/bulk-bookkeeping meaning. | Cleanup cannot create primitive architrino mass. | Formula/schema meaning changes require a separate decision. |
| $D_t,D_r,J^t,W^{\mathrm{acc}}$ and older weights | Preserve current owner definitions; map provenance explicitly. | Older weights can be different mathematics, not spellings. | Never replace them lexically; route substantive differences to dynamics. |
| $i$ index/imaginary unit, $d$ distance/differential, $e$ charge/exponential base | Preserve familiar forms; evaluate upright typography or $\exp$ where useful. | Ordinary conventions are often shortest and clearest. | Global typography needs approval; particle labels are separate. |
| Generic $a,b,j,k,m,\ell,p,P,N,O,R,u,z$ | No blanket rename; keep stable local and vector/index conventions. | Frequency does not justify exclusive ownership of every letter. | Change only a proven collision or inconsistent spelling of a recurring concept. |
| Equivalent TeX and app symbol chips | One approved spelling per identifier; preserve vectors and meaningful scripts in extraction. | Display and explanation must name the same object. | Repair existing extractor/consumers only in an authorized implementation phase. |

Plainly: preserve familiar short notation by default. Qualify recurring meanings when they actually meet. A qualifier does not cure an undefined concept, and a new name must not change the physical claim.

### 4.3 Required detail for an approved transition

Expand each selected row here before execution: concept and definition; units; scalar/vector/tensor/record type; physical layer; present forms; chosen form; allowed comparison/local forms; forbidden collisions; owner; exact affected paths and occurrences; dependent expressions; code/schema consequences; provenance exceptions; validation.

Distinguish a pure rename from a variable transformation. A rename preserves the object. Replacing a half-angle by a full angle, or a speed by a normalized ratio, changes substitution rules and requires derivative, bound, and unit checks. An unresolved physical correspondence remains unresolved after either operation.

Plainly: establish what moves, where it moves, and what stays unchanged before touching a formula. This table holds decisions; the occurrence inventory supplies the complete work list.

## 5. Detailed Plan Before Execution

### Phase 1 — Agree on strategy and scope

Review Sections 1–2 and the approved notation in Section 3.2 first. Adopt that approved set as the first-priority pass, with explicit retain/reconsider decisions rather than redesigning it from the frequency ranking. Decide how canonical reservations interact with bound indices and labeled comparisons. Keep layer and channel distinctions until their owning definitions or derivations change. Select transition rows for further design and reject unnecessary renames explicitly.

**Completion:** approved strategy and scope rules, with named open choices. Completing discussion does not authorize migration.

### Phase 2 — Build the semantic inventory

Start with the approved families in Section 3.2, including their less frequent partners and any colliding symbols from Section 3.3. Inventory display and inline mathematics, prose definitions, headings, captions, tables, source links, app formulas, labels, explanations, and exports. Search TeX variants, Unicode, vector/scalar forms, subscripts, derivatives, and indexed families. Group by concept and definition, not character alone.

Give every occurrence a deterministic path-by-path disposition: change; retain canonical form; retain distinct concept; preserve labeled comparison; preserve immutable provenance; or unresolved and blocked. Include active priority packets and procedures teaching or consuming the convention. Reconcile the census against raw formulas; separate extractor defects from authored notation defects.

**Completion:** every occurrence in a selected family has a disposition and owner. No unresolved “all others” category. Ambiguous definitions or replacements block that family.

Plainly: this makes “change it everywhere” checkable. Every location gets a decision, including places where the same character correctly means something else.

### Phase 3 — Approve notation and representative mappings

Compare the preferred short form with the current form and a reasonable alternative only where there is a real choice. Evaluate brevity, familiarity, collisions, TeX burden, dimensional clarity, and reuse. Review before/after expressions from the owner, a downstream derivation, and a mixed-framework explanation.

Keep proposed guide text here while approval is pending. State any change to a reserved glyph or permitted shorthand exactly. Check agreement between reader explanation, glossary definition, and transition table.

**Completion:** one destination per concept, approved scope/qualifiers, comparison forms, and substitution obligations. Implementation still requires the operator's explicit direction.

### Phase 4 — Plan complete dependency batches

For each approved concept, identify its full active dependency set. Schedule the Section 3.2 families first; record any blocked family and its unresolved decision before moving to lower-priority notation. A family may require several editing sessions, but remains unfinished until all consumers are covered. Representative examples are design checks, not permission to publish a partial migration.

Assign one responsible owner per surface and one integrator for the concept. Keep execution single-owner unless parallel work is explicitly approved. Do not add a notation database or validator when the existing glossary, extractor, tests, and transition table meet the actual need.

| Surface | Required treatment in a later authorized batch |
| --- | --- |
| Guides | Update owning definition and style rule; reconcile other guides by precedence. |
| Corpus Markdown | Change selected meaning in displays, inline math, prose, examples, captions, derivations, and duplicates; preserve unrelated meanings. |
| Active priority material | Update live instructions and consumers so they do not reintroduce old conventions. |
| Equation Mapping | Preserve semantic IDs and links for unchanged mathematical equations; align chips, definitions, search, curated explanations. Inspect source ownership. |
| Other apps and scenes | Include formulas, controls, legends, accessible labels, tooltips, scene metadata; inspect rendered output. |
| Code and tests | Separate display strings from internal names and public contracts; test behavior independently of spelling. |
| Schemas/interfaces | Review readers/writers, serialization, bindings, fixtures together. Incompatible changes need an explicit version/transition decision; no silent aliases or shims. |
| Generated outputs | Regenerate affected web/textbook artifacts from owners only with authority; never hand-edit. iOS is on-demand only, including during final PR flow; see Section 5.3. |
| Historical sources/evidence | Preserve original sources, frozen records, hashes, numerical provenance. Translate at current consumers; these are not active competing conventions. |

Plainly: the accepted meaning must reach the book, app, and working instructions. Historical evidence keeps its recorded notation with an explicit translation. Rewriting frozen evidence would require a separate decision.

### Phase 5 — Execute only after authorization

Recheck live state and ownership. Change canonical sources and all active consumers of the approved family. Preserve stable equation IDs through notation-only edits. For pure renames, retain original mathematical content as an independent comparison basis; for transformations, verify substitutions separately.

Do not change an independent oracle in the same change as its subject. If both implementations must adopt a mathematical rule, their agreement tests implementations only; the rule needs independent justification. Labels, rendering, and schema checks do not validate physics.

Run generator checks during edits. Report drift and its required regeneration command; no generated writes without authority. A transition can be source-complete but awaiting regeneration; it is not publication-complete then.

Plainly: a rename leaves the mathematics unchanged. A variable transformation also needs mathematical verification. Apps and books are finished only when their generated copies agree with approved sources.

### Phase 6 — Verify completeness and comprehension

Use the occurrence inventory as the acceptance list. Account for every remaining old form by disposition. Confirm new forms, units, indices, intact equations/links, and unchanged claim grades. Check that shortening has not erased a channel or promoted an effective quantity into a primitive.

Use existing verification first, rereading entrypoints at execution time:

| Check | What it establishes |
| --- | --- |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Registry, link, context, and generated-record agreement; not semantics. |
| `node --test tests/equation-mapping-corpus.test.js` | Existing extraction/registry behaviors; extend for meaningful gaps if changed. |
| `node scripts/validate-content.mjs --check --strict` | Current content/index integrity. |
| `node scripts/build-scene-graph.mjs --check --strict` | Scene graph agreement. |
| `node scripts/build-textbook-md-pdf.mjs --check` | Reading-copy agreement. |
| `node scripts/export-ios-textbook-package.mjs --check --strict` | iOS package agreement. |
| Applicable existing notation checks | Known polarity, frequency-triplet, and current Master Equation terminology constraints; not all semantics. |
| Browser/reader inspection | Actual symbols, definitions, wrapping, tooltips, search, and comparison maps. |
| `git diff --check` | Whitespace errors in the inspected diff, not mathematics or coverage. |

Plainly: automation catches broken references, stale outputs, and known spelling rules. Correct meaning requires source-context review; a variable transformation additionally requires mathematical verification.

Closeouts must name concepts completed, paths changed, comparison/provenance exceptions, unresolved occurrences, checks actually run, and generated surfaces pending. Fewer symbols or fewer search hits are not success by themselves. Success means the approved meaning and notation across all active uses, readable equations, and unchanged physics.

### 5.1 Step-by-step implementation order

The phases above establish the approval boundaries. The following sequence makes them operational. It is a proposed procedure, not permission to execute it. Repeat the implementation sequence for each approved concept family; complete the family across its active consumers before publishing it. Do not combine equation deduplication, theory revisions, or unrelated editorial cleanup with a notation-only batch.

| Step | Action | Required result before proceeding |
| ---: | --- | --- |
| 1 | Confirm the Section 3.2 approved notation as the first-priority set, with the strategy and scope rules in Sections 1–2. Record which existing choices to retain and which to reconsider. | An ordered approved-family work list; existing notation stays the default until a replacement is explicitly approved. |
| 2 | Capture the current canonical sources, generated registry, equation IDs, source links, counts, and affected-file hashes. Refresh the census against that snapshot. | A reproducible starting point. The earlier 4,598-equation count is a dated observation, not a permanent target. |
| 3 | Starting with the Section 3.2 approved families and their colliding forms, inventory every form of each selected symbol and classify each occurrence by concept, definition, units, physical layer, and disposition. Include inline mathematics and non-equation surfaces. | Complete occurrence list; ambiguous meanings block that family rather than receiving an automatic replacement. |
| 4 | Attach each occurrence to its source owner and downstream consumers using Section 5.2. Record existing equation IDs and any curated formula, callout, code, schema, or export dependency. | Exact source and output paths, preservation exceptions, and responsible editor; no unexamined consumer category. |
| 5 | Approve the completed transition rows and representative before/after equations. Obtain explicit implementation authority and identify whether regeneration is authorized now or reserved for the final publication process. | Approved notation, substitutions, scope, tests, and regeneration boundary. Approval of this plan alone is insufficient. |
| 6 | Establish the mathematical acceptance cases before editing. For renames, preserve the original expressions for comparison; for transformations, verify units, derivatives, bounds, and substitutions independently. | A way to detect changed mathematics, distinct from app rendering and generator checks. |
| 7 | Update the owning guide definitions, reader explanation, and every active canonical Markdown occurrence for the family, including repeated equations and their local definitions. Preserve each existing Equation Mapping link and ID. | The authored concept is consistent throughout the source set. Guide decisions and their consumers are one unfinished batch until both are updated. |
| 8 | Update affected promoted Equation Mapping formulas, formula parts, anchor labels, callouts, and search wording. Inspect extracted symbols and definitions; change extraction behavior only if the approved notation exposes a real gap. | Both basic and promoted app pages express the approved notation. No manually edited generated registry or independent competing glossary. |
| 9 | Update other active consumers: scenes, app labels, diagrams, working instructions, code display strings, and relevant interfaces/tests. Handle any public schema change under a separately approved version decision. | Every listed consumer has a recorded disposition; frozen evidence is preserved, with translations at current consumers where needed. |
| 10 | Run the relevant source, notation, and generator checks. Review every reported difference and coordinate any whole-corpus generator write with other ongoing work. | Known generated drift is recorded as pending; unexpected source changes, missing IDs, and semantic errors are resolved before regeneration. |
| 11 | Once authorized, regenerate affected outputs in the dependency order in Section 5.3, and run the corresponding checks again. | App registry, graph, reading copies, current PDFs, and iOS package agree with their sources wherever affected. |
| 12 | Compare before/after inventories and equation IDs; run the focused tests and broader applicable checks in Section 5.4. | Every old occurrence is changed or explicitly retained; no unexplained lost/added equation IDs, count changes, or stale descriptions. |
| 13 | Inspect actual app and reader output, including promoted and basic pages, source navigation, tooltips, search, narrow layouts, PDF pages, and the relevant iOS views. Exercise editor/reset paths in disposable test state. | Correct visible notation and definitions, working links, readable layouts, and no loss of user data. Tests alone do not satisfy this step. |
| 14 | Review and, only when separately authorized, publish the complete source/output batch through the live branch/PR procedure. Then verify the served app and distributed reader artifacts against the approved revision. | A consistent released version. Pending publication, deployment, or reader distribution remains explicit rather than being reported complete. |
| 15 | Record completion by concept. Account for every first-priority family as verified unchanged, migrated, or explicitly deferred with a blocker before moving to the remaining census rows. Adopt the maintenance loop in Section 5.5 for later edits. Refresh the census after each completed family and again after the full migration. | A current canon with checked consumers, not a one-time cleanup that later edits can silently undo. |

Plainly: decide the names, find every use, change the authoritative sources, update the app's extra explanations, rebuild their copies, and inspect what readers receive. A family stays unfinished while any required copy still uses the old convention.

### 5.2 How app-equation and other consumers stay synchronized

Here, `app-equation` means the Equation Mapping app at [equation-mapping.html](../../../equation-mapping.html). The following dependency map is based on source inspection, not an end-to-end runtime measurement. Recheck these owners before execution; a changed loader or generator would invalidate the corresponding routing claim. The [registry and authoring contract](../app-equation-mapping/registry-and-authoring-contract.md) remains the app's authority.

| Surface | Current source and update path | Synchronization obligation |
| --- | --- | --- |
| Basic equation pages | Canonical Markdown → [corpus generator](../../../scripts/build-equation-mapping-corpus.mjs) → `content/generated/equation-mapping/corpus-equations.json` → [loader](../../../src/apps/equation-mapping/EquationMappingCorpusLoader.js) and [registry](../../../src/apps/equation-mapping/EquationMappingRegistry.js). | Edit the equation and local definition at source, then regenerate. Check formula, symbols, description provenance, source context, and navigation together. |
| Promoted equation pages | [EquationMappingData.js](../../../src/apps/equation-mapping/EquationMappingData.js) supplies curated formulas, formula parts, anchors, and overlays. The registry combines these with generated source context and symbol records. | Regeneration alone does not rewrite curated formulas or callouts. Reconcile each affected curated expression with its source, including intentionally expanded forms; literal equality is not always the right test. |
| Equation identity and links | The adjacent `Explore this equation in Equation Mapping` link carries the existing ID. The generator reuses that ID; only an unlinked occurrence receives an ID derived from its path and formula. | Preserve existing link IDs through renames and moves; repair relative link paths when moving files. A missing link must not silently turn a renamed formula into a new page. Splits, merges, and deletions require a separate identity decision. |
| Browser state and app entrypoints | [main.js](../../../src/apps/equation-mapping/main.js) supplies current registry documents to the [runtime](../../../src/apps/equation-mapping/EquationMappingRuntime.js), bypassing saved document drafts on normal startup. A runtime mount without supplied documents merges saved drafts; the current reset action loads the curated seed set. | Test normal startup, alternate mounts, edit/reset, and reload separately. Do not claim that saved drafts override normal corpus loading. Preserve user work; do not clear storage or add a migration mechanism without an approved need and policy. |
| Web corpus, scenes, and other apps | Canonical Markdown, `content/scenes/`, and the relevant app's authored formula/label owners; graph outputs come from [build-scene-graph.mjs](../../../scripts/build-scene-graph.mjs). | Search and update source prose, diagrams, captions, accessible text, controls, and overlays as applicable. Inspect each affected rendering path; Equation Mapping checks do not cover other apps. |
| Textbook reading copies and current review PDFs | Graph/TOC plus canonical Markdown → [reading-copy generator](../../../scripts/build-textbook-md-pdf.mjs) → [review-PDF generator](../../../scripts/build-textbook-review-pdfs.mjs). | Rebuild Markdown before PDFs. The script named `build-textbook-md-pdf.mjs` writes Markdown reading copies, not the actual PDFs. Preserve archival snapshots under their provenance policy. |
| iOS reader | Current TOC, reading copies, reference guides, and reader assets → [package exporter](../../../scripts/export-ios-textbook-package.mjs) → `apps/ios/ArchitrinoReader/GeneratedTextbookPackage/`. | Refresh package content, rendered HTML, links, search index, and manifest together. Equation links route to the public web app; test that boundary. A rebuilt package does not update an already installed reader until its normal distribution/update process occurs. |
| Active procedures, tests, and generated orientation | Update active authored guidance and applicable existing test/check owners. [Startup orientation](../../../scripts/build-agent-startup-orientation.mjs) is generated from its declared sources. | Prevent later authors from reintroducing obsolete notation. Do not rewrite frozen fixtures or historical evidence as cosmetic cleanup; classify their current consumers first. |

Plainly: the source equation feeds the basic app page automatically after regeneration. Promoted pages contain additional authored material that must be changed deliberately. Books, PDFs, and the installed reader each have their own production step.

**Definition quality:** prefer a precise definition beside the source equation. Check the generated symbol record against that local meaning. The generator's shared descriptions and context detection are heuristics, so changing a global fallback for an overloaded letter can spread the wrong meaning. Extend the existing extractor or definition resolution only for a demonstrated, tested gap; do not make a new symbol database a prerequisite for this migration.

**Scope safeguard:** the equation generator's `--write` mode scans the corpus and can insert missing links into canonical Markdown, as well as writing JSON. The other listed generators can also affect more than the selected family. Inventory their expected write sets first; coordinate concurrent source changes and review the actual diff afterward. If the command would include unapproved material, stop for a scope decision rather than hand-editing its output or inventing an unsupported scoped flag.

Plainly: automatic output is only as reliable as its definitions and inputs. A global rebuild can pick up unrelated work, so its write scope must be understood before it runs.

### 5.3 Regeneration order at an authorized checkpoint

**Export scope:** under the current repository policy, the iOS textbook package is an on-demand development snapshot. Every iOS generation, freshness check, view inspection, or distribution step mentioned in this plan applies only when iOS packaging is explicitly requested. It is not a routine notation-batch or final-PR requirement. Preserve historical snapshots; schedule current review-PDF exports only when included in the approved batch.

Run only affected stages, in the order below. These are future commands, not commands run by this planning task. The same live-source snapshot must underlie the entire completed checkpoint; later input changes require rechecking and rebuilding the affected descendants. Each row's check follows its write, and all affected checks run again against the final state.

| Order | Authorized write command | Required check and output |
| ---: | --- | --- |
| 1 | `node scripts/build-scene-graph.mjs --write --strict` | `node scripts/build-scene-graph.mjs --check --strict`; current graph, TOC data, and TOC Markdown for downstream consumers. |
| 2 | `node scripts/build-equation-mapping-corpus.mjs --write` | `node scripts/build-equation-mapping-corpus.mjs --check`; current equation registry and preserved source links. Recheck stage 1 after any source-link insertion and rerun affected stages if it changes their inputs. |
| 3 | `node scripts/build-textbook-md-pdf.mjs --write` | `node scripts/build-textbook-md-pdf.mjs --check`; current chapter and combined Markdown reading copies, including equation links. |
| 4 | `node scripts/build-textbook-review-pdfs.mjs --write` | `node scripts/build-textbook-review-pdfs.mjs --check`; current review PDFs and manifest. Inspect changed pages visually; a manifest check is not visual verification. |
| 5 | `node scripts/export-ios-textbook-package.mjs --write --strict` | `node scripts/export-ios-textbook-package.mjs --check --strict`; current reader package, links, and search data. |
| 6 | `node scripts/build-agent-startup-orientation.mjs --write` | `node scripts/build-agent-startup-orientation.mjs --check`; only when its declared inputs changed or its check reports drift. |

Plainly: update the map of the book, update the equation app's data, build the readable book copies, then package them for each reader. Run the checks again after the last input change; an earlier pass does not certify later edits.

Long PDF or package jobs follow the existing [heartbeat procedure](../../op/long-running-test-heartbeats.md). Missing tools, denied regeneration authority, or an unavailable distribution step leave that surface pending. Do not call the family complete by excluding a required output after the fact.

### 5.4 Acceptance checks for each completed family

1. **Coverage and mathematical meaning.** Reconcile every inventoried occurrence, including retained comparisons and provenance. Compare the old/new expressions under the approved mapping. Require unchanged units, mathematical type, physical layer, and claim grade for pure renames; independently justify any transformation.
2. **Stable identity and extraction.** Compare the equation ID sets and their source bindings. For a notation-only batch with no additions or removals, expect the same equation occurrence count and IDs. Inspect changes to symbol counts and meanings separately: different TeX tokenization can legitimately change symbol counts. Existing tests contain snapshot counts; update expectations only from a reviewed inventory change, never merely to obtain a pass.
3. **Focused app tests.** Run `node --test tests/equation-mapping-corpus.test.js tests/equation-mapping-runtime.test.js tests/equation-mapping-sidebar.test.js tests/equation-mapping-symbol-tooltip.test.js`. Extend these existing suites only where changed behavior has a meaningful coverage gap, especially ID preservation, curated/source agreement, local definitions, and draft/reset handling. Run `node --test tests/ios-textbook-link-routing.test.js` when the reader-link boundary is affected.

Plainly: unchanged equation counts and working pages are necessary checks, but they cannot tell us whether a symbol means the right thing. That requires the reviewed concept mapping and local definitions.

4. **Generated and broader checks.** Run the affected checks in Section 5.3 and the live `node scripts/check-content-integrity.mjs` entrypoint. Inspect its current coverage rather than assuming it checks every output; apply the on-demand iOS boundary in Section 5.3. Actual review-PDF freshness needs its separate check above. Use the live foundational-impact routing and branch/PR procedure for additional checks when the changed sources trigger them; this list is not a replacement for those owners.
5. **Reader inspection.** Programmatically inspect all affected records, then visually cover each changed rendering pattern: basic versus promoted page, vector and subscript forms, inline versus display math, tooltip with pointer and keyboard focus, long equations on narrow screens, search results, source-return links, and current PDF/iOS representations. Resolve every failed sample and expand inspection to related instances. A sample is evidence for those cases, not proof of every layout.
6. **Publication and delivery.** When publication is authorized, follow the live [branch/PR workflow](../../op/git/codex-pr-branch.md), including its exact-state validation receipt after final sources and staging. Publish sources, app code, and generated data as one consistent revision. Verify the served registry and app assets correspond to that revision; check normal reload as well as a fresh browser context for stale caching. Verify reader package distribution separately. Do not invent a deployment command or claim that local generation updates installed clients.

Plainly: check the files, then check the working app, then check what was actually delivered. Passing a generator check proves freshness against its inputs, not physical correctness or a completed deployment.

Record the final result per family here: approved mapping; completed paths; justified preserved uses; checks and inspected examples; pending regeneration/publication/distribution; and any new ambiguity. If a release problem requires reversal, use a reviewed change that restores the whole affected source/output family together and preserves unrelated work. Do not restore only the glossary or only the JSON.

### 5.5 Keeping the system current after migration

Use the same shorter loop for every later equation or notation edit:

1. Consult the owning glossary and style rule before choosing a symbol. Propose a canon change first when the desired meaning is not permitted.
2. Edit the equation and its local definitions together; preserve its existing app link. Check other active uses of that concept and any curated app representation in the same change.
3. Run existing source and generator checks during editing. Keep affected generated surfaces visibly pending until an authorized regeneration checkpoint; never silently publish mixed old/new notation.
4. At that checkpoint, regenerate the affected descendants in Section 5.3, run applicable tests, and inspect the changed reader surfaces. Include outputs in the same reviewed release.
5. Extend an existing notation check only when an approved rule can be checked reliably. Do not ban generic letters globally or treat a heuristic meaning guess as enforcement. Reuse the existing [Content Integrity workflow](../../../.github/workflows/content-integrity.yml); it detects generated drift but does not automatically repair or semantically validate it.
6. Refresh the occurrence inventory and census after approved symbol-family changes. Keep the canonical definitions in the existing guides; retain this file for decisions and transition history rather than letting it become a second current glossary.

Plainly: changing a formula includes maintaining its explanation and published copies. Existing checks tell us when copies are stale; an authorized rebuild and reader check finish the job. This is an editing and release discipline, not a new background automation.

## 6. Future Reader-Facing Explanation

Prefer a concise “How to Read the Notation” section in the existing [Mathematics Style Guide](../../../content/markdown/aaa/archie/mathematics-style-guide.md), definitions in [Mathematical Terminology](../../../content/markdown/aaa/archie/mathematics-terminology.md), and framework mappings in the [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md). Do not create another permanent guide unless these owners cannot meet the need.

Proposed reader copy, not an edit to the guides:

> This text keeps familiar mathematical notation wherever the quantity retains its familiar role. Central concepts have short, consistent symbols. A subscript distinguishes a different channel, event, or physical description when that distinction matters to the equation.
>
> Absolute time is written $T$, and a position in Euclidean space is written $\mathbf X$. An observer's reconstructed coordinates use $t_{\mathrm{eff}}$ and $x_{\mathrm{eff}}^i$. The primitive wake speed is $c_f$; other speed subscripts identify other propagation or calibration channels. Sharing units does not make two quantities identical.
>
> When a familiar physical concept is reframed, its definition and its relation to the familiar quantity are stated explicitly. A correspondence may be a definition, a derived result, or a recovery target. The same letter alone establishes none of these. Symbols are defined at introduction, and recurring quantities keep the same notation throughout the text.

Plainly: readers get stable notation and definitions, not migration history. Final wording must match approved decisions; reader-facing guides must not link back to this priority plan.

For Equation Mapping, distinguish source definitions, canonical definitions applied through explicit concept mappings, and unresolved fallbacks. The [generator](../../../scripts/build-equation-mapping-corpus.mjs) produces `source-context` and `shared-context` descriptions. Source-context detection is also heuristic: finding a nearby sentence does not verify the definition. Prefer precise definitions and source references over lists of possible meanings.

Plainly: a tooltip should explain this symbol in this equation. If the meaning is unresolved, say so rather than making vague text look authoritative.

## 7. Decisions Still Open

1. Review the approved notation in Section 3.2 first: retain the current choices by default and explicitly identify any to reconsider. The approved families are the first cleanup priority, not the largest frequency counts.
2. Decide the scope of bound indices and comparison notation under the existing document-wide meaning rule.
3. Choose period, half-delay-angle, and internal-speed notation before exact transition design.
4. Decide whether current layer qualifiers can ever be omitted within a formally declared scope. Initially keep explicit forms; revisit shortening with representative reader examples.
5. Select overloaded families that actually warrant change after inventory; preliminary concern labels are not approval.
6. Approve complete affected paths, comparison/provenance policy, and validation per family before execution.

Discuss strategy and scope first, then make remaining choices one at a time. Do not start migration or canonize candidate spellings merely because they appear here.

**Closure goal:** straighten out the approved notation first, reconsider specific choices explicitly, then authorize complete concept transitions across the corpus, app-equation, and all active consumers.
