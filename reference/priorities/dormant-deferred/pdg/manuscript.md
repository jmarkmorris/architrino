# From Particle Data to an Explicit Reaction Ledger

## 1. Three boundaries with different meanings

The deferred PDG workstream separates an observed-channel description, a constructed assembly ledger, and an authored diagram. These are related records, but they answer different questions. A Particle Data Group entry reports a particle property or channel in its own effective description. An upstream translation can turn supported participants into explicit assembly occurrences. A solver can then attempt a legal rearrangement under a declared finite rule set. An editor finally presents the resulting objects and relationships.

The [workstream owner](priorities.md) preserves this chain as `pdgfeed → pdgsolve → pdgedit`. Ingest and request emission belong to the first stage; construction, review, acceptance and publication belong to the second; the final authored surface belongs to the third. The documents are frozen reference material within a deferred lane whose task queue is empty. Their implementation descriptions and prospective requirements are retained at source-time scope. This exposition neither verifies current software nor reactivates the pipeline.

A channel's successful translation is not a physical derivation of the channel. Likewise, an exact primitive ledger is not a trajectory, a reaction rate, a branching probability or an independently established assembly. Here “exact” describes closure under the written occurrence, rule and provenance contract. PDG-facing particle language is an upstream observational vocabulary; it is not imported as an architrino-level dynamical law. The [source coverage](analysis/manuscript-source-coverage.md) retains the detailed interfaces, examples, historical instructions and unresolved inconsistencies behind this exposition.

## 2. Data access and the meaning of a proposal

### 2.1. A local, versioned data source

The retained API note proposes the official Python package and a local SQLite database, with the package's bundled database as the default unless an explicit database URL is supplied. Normal ingest is intended to work offline after installation. Package and database updates belong to development maintenance, not an ingest operation that silently changes its data edition. Direct SQL is secondary when the API cannot expose a required traversal; REST and website inspection are outside the normal ingest path.

The note illustrates connection, edition/schema inspection, particle lookup by name or Monte Carlo identifier, charge-state lookup, property iteration and exclusive decay traversal. A decay product can identify a concrete particle, a generic class, a multiplicity or a nested subdecay. Its formatted branching value can include uncertainty or a limit. Treating that formatted value as an unqualified numerical probability would discard part of the source meaning.

These are locally retained API examples. Package compatibility, requirements, edition-dependent outputs, database filenames, licensing and redistribution statements have not been checked against current PDG documentation. The reproducibility requirement is nevertheless explicit: preserve the package version, edition, schema version and database identity/path with derived data. The source favors backend/local storage over bundling the full database into the frontend or ordinary Git history, while its exact storage and wrapper decisions remain deferred.

### 2.2. Normalize before handing off

The ingest layer first creates a repository-owned proposal with stable identity, source provenance, participants, multiplicities, subdecay structure, ranking and ambiguity notes. A solver request is emitted only from that normalized proposal. It carries explicit assembly occurrences with stable identifiers and a backlink to the proposal. Raw PDG objects do not cross directly into solve-core state.

Concrete repeated products may expand into repeated occurrences when every identity is mapped. Generic or textual products and subdecay-dependent interpretations remain blocked unless an explicit upstream rule resolves them. A subdecay is treated as hierarchy within the particle's decay table; it does not supply the complete production history of the parent or an independently specified reaction network. Ambient Noether sea participation and local medium loading are generally absent from the effective channel record.

The source distinguishes two obstacles. A concrete channel can lack a repository mapping, producing a backlog case. A channel can also be incomplete as an explicit assembly boundary because it remains generic, inclusive or missing necessary provenance. Neither condition says that the observed PDG channel is physically unreal. Supported concrete rows and deterministically completed rows can be request-ready, while both kinds of unresolved case remain blocked.

### 2.3. Deliberate completion rather than hidden guessing

The mapping registry is a declared translation policy. Only explicit supported canonical names may emit assembly rows; aliases may normalize a name but do not create new solver vocabulary. A generic-family charge-closure pass for pion, nucleon and antinucleon product tokens is permitted only when the parent charge and already concrete siblings force exactly one unordered assignment. Zero or multiple assignments leave the proposal blocked.

For certain neutral particles, the v1 translation emits a union of supported constituent rows. It does not carry superposition amplitudes, coefficients or interference. That literal row union cannot be read as a derivation of a quantum state. Likewise, a primitive deficit can be completed upstream by explicit pro- and anti-orientation Noether-braid occurrences. Each two-braid recipe contains one of each orientation. The compatibility token for that recipe does not establish photon identity or an independently accepted medium history.

Such completion makes omitted participation visible in the request rather than inventing it inside the solver. After completion, ordinary ingest requests declare no additional solver-side augmentation. Remaining material may be routed to explicit boundary rows, including one counted unbound-architrino product when the written policy calls for it. The mathematical question is whether every count and occurrence is declared; the physical question of which medium history actually participated remains outside this bookkeeping rule.

## 3. A small language for explicit material

### 3.1. Names, occurrences and counts

The compact notation uses fermion family letters with generation indices, nucleon tokens, a small set of core forms and explicit counted unbound material. Separators are optional only where longest-match tokenization remains unambiguous. Every character must be consumed by a valid token. A prefix for anti orientation binds to one permitted token, and a number must not serve simultaneously as a multiplicity and a generation or core-form suffix.

An unbound ledger always states both primitive counts, including an explicit zero when one side is empty. The all-zero ledger is forbidden. Named mixed-core composites have atomic tokens; suffixes, stacked anti prefixes, omitted ledger sides and retired whole-core aggregate notation are rejected. These restrictions make a typed boundary explicit instead of relying on a parser to guess intent. The grammar table is a naming bridge, not a one-to-one equivalence of PDG ontology and assembly ontology.

The registry defines three core sizes with equal electrino and positrino counts: three, two and one of each. A fermion row adds its specified polar counts to a generation-matched core. Charged matter leptons add six electrinos; their antiparticles add six positrinos. Neutrinos add three of each. Down-type matter quarks add four electrinos and two positrinos; up-type matter quarks add one electrino and five positrinos, with the corresponding antiparticle recipes exchanging the polar counts. These are the source's finite recipe declarations, not newly established physical structures.

### 3.2. A source disagreement that cannot be normalized away

The ingest grammar says that the positive weak-boson token carries anti-core provenance and the negative token pro-core provenance. Its composite registry instead writes the positive row with a pro core and the negative row with an anti core, together with corresponding opposite orientation labels. The two passages are inconsistent. Both weak-boson composite rows are explicitly marked as not transformed to solver rows, so their names do not grant solve-core admission.

The editor separately retains weak-boson artwork and a possible downstream classification of explicit intermediate rows. A concrete classification contract is still required before those labels become valid authored assembly types. Preserving this distinction avoids resolving a source contradiction through an invented physical interpretation or a silent rewrite of the old table.

## 4. What an exact assembly construction requires

### 4.1. The finite law system

The solver reference describes a finite assembly alphabet, a primitive-content map, boundary multisets and finite local law tables. With electrino and positrino content as the primitive basis, write

$$
Q=(\mathcal A,\mathcal P,\mu,R,T,\Delta,\Gamma,\Pi),
\qquad \mathcal P=\{E,P\},
\qquad \mu:\mathcal A\to\mathbb N^{\mathcal P}.
$$

Here $R$ and $T$ are explicit boundary multisets after any permitted augmentation has been fixed, and $\Pi$ is the policy. The map extends linearly to multisets. A dissociation of assembly $a$ may use only an admitted output multiset in $\Delta(a)$; an association may gather only an admitted recipe in $\Gamma(a)$. Each law preserves the primitive vector:

$$
\mu(d)=\mu(a)\quad(d\in\Delta(a)),\qquad
\mu(g)=\mu(a)\quad(g\in\Gamma(a)).
$$

Pass-through is identity, preserving the same provenance block. Dissociation opens one reactant into allowed intermediate material; association gathers exactly the needed intermediate recipe into one product. The five semantic stages are reactants, reactant-side operators, intermediate assemblies, product-side operators and products. Their order constrains legality; screen coordinates do not.

One counted unbound-architrino ledger is the explicit exception to ordinary fixed recipe rows. Multiple dissociations can contribute to it, while associations and a product-side unbound pass-through draw declared counts from it. It is not an unlimited reservoir. No routed balance can become negative, no second intermediate ledger may appear, and an intact core cannot silently serve as a free polar source.

### 4.2. Finite recipes and their reach

The written first-pass laws decompose each fermion into its generation-matched core and polar counts, with the inverse recipe for association. Core ladder dissociation releases one electrino and one positrino while moving from the three-binary form to the two-binary form, then to the one-binary form, and finally to fully unbound material. Every released primitive must enter the common ledger explicitly.

The document leaves the sufficiency of one-step ladder openings unresolved. It also describes a constructive mapper using core conversions, support rows and residue-only opening in terms not fully reconciled with every local-rule passage. Those sentences do not authorize a manuscript to invent additional executable laws. Wider coverage requires clarification of the rule inventory and its owner before a new run.

The finite-alphabet notation and a counted ledger serve different purposes: ordinary assembly recipes have fixed primitive content, while the one ledger carries state-dependent counts. A complete implementation must represent that exception explicitly rather than infer that every ledger balance is a new fixed particle type. Equal primitive vectors likewise do not identify distinct assemblies or supply a legal association recipe.

### 4.3. Conservation includes provenance

The source's stronger bookkeeping picture is one primitive carrier set viewed through different assembly partitions. Let

$$
\Omega=\Omega_E\sqcup\Omega_P.
$$

Reactant, intermediate and product partitions of this same set must realize the corresponding inventories. A dissociation refines a provenance block; an association coarsens blocks with the same union. No primitive disappears or is counted twice merely because the aggregate totals agree. Consequently exact closure requires

$$
\mu(R)=\mu(x_3)=\mu(T),\qquad
\delta=\mu(R)-\mu(T)=(\delta_E,\delta_P)=0.
$$

A nonzero imbalance rules out exact closure for that fixed boundary under conserving laws. Zero imbalance is necessary but insufficient: the local recipes, core availability, nonnegative routing and complete provenance witness must still exist. This distinction is essential when reading a deterministic failure result.

### 4.4. The beta example exposes a boundary inconsistency

The source gives a beta-boundary example with two down-quark rows and one up-quark row on the reactant side, and one down, two up, one electron and one antineutrino on the product side. Using its own declared primitive vectors gives

$$
\mu(R)=2(7,5)+(4,8)=(18,18),
$$

$$
\mu(T)=(7,5)+2(4,8)+(9,3)+(6,6)=(30,30),
\qquad\delta=(-12,-12).
$$

Its exact-positive regression expectation and two frozen request examples omit additional material while declaring no boundary augmentation. They therefore cannot satisfy the same document's exact conservation condition. This is an internal arithmetic inconsistency, not a new claim about observed beta decay.

One declared pro/anti two-braid unit has primitive vector $(6,6)$. Two such units added upstream would balance these particular counts. That observation does not prove that the finite operator system can construct the desired products, identify the actual medium, or explain a physical decay. The old examples remain unchanged; any future executable request must resolve its boundary explicitly before it can be treated as an exact positive case.

## 5. Construction, ranking and failure

The source-declared shipped algorithm is a deterministic core-first mapper, not an enumerating search. It preserves occurrence order, pairs same-assembly boundary occurrences as pass-through first, computes remaining core demands, dissociates remaining material, allocates the common primitive ledger and validates operator and intermediate balances. At most one exact family is emitted. Otherwise it emits one deterministic no-exact family with diagnostics.

Failure can arise from unsupported normalization, primitive imbalance, unsupported product tasks, unavailable cores, insufficient or unmatched residue, operator imbalance or provenance/intermediate failure. A nonzero primitive vector supplies a mathematical impossibility for the fixed conserving boundary. Failure of one core-first construction does not establish that every other admissible construction fails. The no-exact label must retain that algorithmic scope.

The score is a declared lexicographic tuple,

$$
\kappa=(\epsilon,m_{\mathrm{prim}},m_{\mathrm{mid}},
 n_{\mathrm{aug}},n_{\mathrm{op}},n_{\mathrm{diss}},n_{\mathrm{amb}},\tau).
$$

It prioritizes exact matching and a complete witness, then primitive and intermediate mismatches, support burden, nonidentity operators, dissociations, ambiguity and deterministic tie-breaking. Stable assembly, occurrence, operator and provenance order makes the emitted representative repeatable. This is ordering and diagnostic metadata for the constructed candidate; it is not proof of global minimality among ungenerated alternatives.

A retained regression asks for at least two distinct exact families, while the documented vertical slice emits at most one. Broader branch-family and best-representative language must therefore be read separately from the actual declared construction limit. Neither that prospective regression nor a score tuple proves that enumeration was implemented or that the finite recipe system is complete over all mapped channels.

## 6. Acceptance and publication are explicit operations

A request, normalized problem, result, acceptance and publication graph are different versioned records. The result retains request/problem identity, the exact or fallback family, score, diagnostics, review state, provenance and publication readiness. An available exact family is not automatically accepted: the accepted-family field remains empty until an explicit acceptance operation.

Acceptance locks the selected family, result digest, score, diagnostics, normalization, policy, all five semantic inventories/operator stages, provenance summary and solve graph. The publication graph is layout-neutral. It conveys accepted units and edges so that the downstream adapter need not infer missing solver meaning from arbitrary visual rows.

The batch path can also emit review documents for unresolved requests. A document appearing in the final editor format or library manifest is consequently not sufficient evidence of accepted exact closure. Its accepted or review provenance must remain distinguishable in the surrounding publication records. An authored document is a final surface contract, not an invertible substitute for the original request, laws, witness or acceptance digest.

The publication adapter maps explicit graph structure to editor rows, operators, links and optional grouping labels. The solver does not own screen coordinates, and the renderer does not rerun normalization or reconstruct hidden solver semantics. Versioned data is the seam: shared live stores, cross-stage runtime imports and launcher-state assumptions are excluded.

## 7. A diagram whose geometry is declared

### 7.1. Tiles provide their own spacing

The editor's primitive is an 80-pixel square black tile. Its centered inner border has a 72-pixel outer box, leaving four pixels of black field on each side. Abutting tiles therefore creates visible spacing through the glyph itself, without storing or calculating external gaps. The exact four-pixel stroke uses a centered SVG rectangle whose geometry is shared by every tile family. Content may move inside the outline; the outline may not be shifted or resized as an optical adjustment.

An assembly occupies four horizontal tiles as one object. Its origin is stored once and its internal offsets are fixed, while all four tile keys are explicit display data. An operator occupies one tile with its title between a red positrino count above and a blue electrino count below. The unbound assembly uses title, electrino count glyph, positrino count glyph and closing identity tile in that order. Counts and their color/epsilon conventions are part of the contract.

Binary glyphs use a separate internal coordinate system fitted into the same tile frame. Their mode chooses full orbit, axis without ellipse, or polar pair alone. Binary colors are serialized left/right; polar colors are bottom/top. The source declares eight full, eight axis and four polar variants. These are static glyph recipes, not additional particle states certified by a diagram.

### 7.2. A fixed desktop strip

Two 80-pixel bands sit above the authored surface. The first holds only a compact document selector and home button; the second is empty. A separate blank tile row begins the grid. The 20-column strip is 1,600 pixels wide, centered without scaling, wrapping, decorative inset or mobile fallback. Vertical overflow scrolls below the bands. The specified target is a sufficiently wide desktop viewport.

The three assembly stages occupy columns 2–5, 9–12 and 16–19. Operator columns are 7 and 14, separated from their neighbors by routing columns 6, 8, 13 and 15. Outer columns 1 and 20 are reserved for later labels. Semantic assembly role is explicit and must agree with placement; array order is authorial order, not geometry. Whole occupied cells determine overlap.

Within an assembly stage, insertion and deletion preserve dense occupied rows. The exception is the deliberately reserved top row. Composite row clusters may later move as blocks, but their richer editing behavior remains deferred. The fixed strip gives geometric meaning to placement without making that placement a solver law.

### 7.3. Direct editing stays local to the surface

The editor specifies single-object selection, vertical stage-constrained drag, immediate deletion with incident-link cleanup, and a transient picker on an empty legal target. It excludes persistent inspectors, extra top controls, multiselect, resize handles, context menus and a visible JSON editor. Assembly creation writes stable identity, role, origin and all four tile keys. Operator creation requires explicit integer count fields rather than hidden defaults.

Assemblies use insertion-style reordering and compaction; operators require a free row without automatic shuffling. Moving within a stage preserves identity and attached links. Shift is reserved for linking adjacent stages, while clicking a spline deletes it. Invalid drops restore the previous placement. These are retained interaction requirements, including areas whose implementation was still deferred, rather than new browser observations.

The authored picker offers all three operator types in either operator stage, whereas the solver law grammar restricts dissociation to the reactant side and association to the product side. Surface-document validity must therefore remain distinct from accepted solve legality. Editing an accepted publication also does not by itself create a new accepted solver record.

## 8. Links, labels and a geometric conflict

### 8.1. Whole-object links

Links attach at the outer edge midpoints of whole assemblies or operators, never to internal tiles. They are permitted only between adjacent semantic stages through one routing column. A serialized link stores identity and canonical left/right endpoint identifiers, without waypoints, bend, color or screen coordinates. Endpoint reversal does not create another link; self-links and duplicate endpoint pairs are forbidden.

The rendered line is visually undirected: white, two pixels wide, one cubic curve with a wider invisible click target. Ordered stages imply left-to-right reaction presentation without arrows. Stable link identifiers select one of five repeating routing offsets without moving objects or altering validity. The source's general object-to-object list includes same-class endpoint pairs, but its fixed adjacent-stage rule alternates assemblies and operators; that more restrictive placement condition governs which links can actually be valid.

### 8.2. The two spline requirements do not agree

The source simultaneously requires horizontal endpoint tangents and fixes both interior cubic control-point heights to a shared midpoint-plus-offset. For endpoints $P_0,P_3$ and interior controls $P_1,P_2$, a cubic has endpoint derivatives

$$
B'(0)=3(P_1-P_0),\qquad B'(1)=3(P_3-P_2).
$$

Horizontal tangents require the first control height to equal the first endpoint height and the second control height to equal the second endpoint height. A common control height cannot satisfy both for endpoints on different rows. Even equal-row endpoints acquire vertical derivative components when a nonzero slot offset is used. Thus the fixed coordinates and general tangent requirement are incompatible as written.

The retained text also describes offsets as lateral while applying them to the control-point height. This manuscript preserves the exact metrics in support and identifies the unresolved design choice. It does not silently choose replacement curves or claim that a live renderer already resolves the conflict. Same-source renderer/reference agreement would not decide which authored rule is correct.

### 8.3. Composite labels come after explicit rows

Composite labels name row clusters after the tiles and links have been drawn. They carry an admitted type, side, text and inclusive row span; no independent geometry belongs in the record. A photon label, for example, spans explicit pro- and anti-core rows. It is not a standalone four-tile photon assembly. Reference artwork for a label remains distinct from a permitted assembly payload.

The source contains separate composite recipes, including alternative neutral-pion constituent groups. These downstream display groups do not replace the upstream v1 union-of-constituents rule with a physical superposition calculation. Weak-boson corridor classification likewise remains a possible downstream rule over preserved intermediate rows and provenance, not a new solver-native species.

## 9. Final documents and controlled review

The editor document has five required top-level fields: schema plus assembly, operator, link and composite-label arrays. Empty collections remain explicit arrays. Stable identifiers, explicit role/placement, exact tile keys and restricted type vocabularies are validated separately. Assembly type supplies semantic classification; its tile array supplies appearance. Operator type additionally selects its canonical title family. The renderer does not reconstruct omitted payload from labels.

The library manifest points directly to final editor documents using one canonical document-path field. It does not contain raw requests or results. Startup selects the declared default, otherwise the first entry, otherwise an empty surface. A blank starting point is an explicit empty document entry, not a new-document button. Selecting another entry replaces the current surface with that document.

A directly addressable review/export page belongs to the editing workflow but is excluded from the peer product-app launcher and is not an Animator mode. Its renderer, reference exporter and committed SVG checks intentionally share authored catalogs and canonical tile rendering. Their agreement establishes deterministic reproduction and artifact alignment, not an independent proof of the glyph or geometry rules. The locally retained export commands have not been run for this manuscript.

## 10. What remains unresolved

The owner has no active task queue, brainstorming has no unresolved loose idea, and the work log contains no dated entries. The longer component notes nevertheless retain specific unfinished subjects: broader mapping coverage, a deeper account of admitted upstream heuristics and omitted medium participation, wider finite law coverage, ladder sufficiency and richer downstream composite authoring. The API note also leaves wrapper and reproducible database-storage decisions open. These are preserved reference obligations, not newly activated tasks.

Reactivation would require checking live schemas, examples, manifests, catalogs and tests, then introducing an explicit bounded queue under the owning stage. The beta conservation mismatch, multiple-family expectation, weak-boson orientation disagreement and spline conflict must remain visible in that review. None can be resolved by accepting an attractive diagram, an unchanged source hash or a deterministic rerun of the same implementation. The pipeline's useful discipline is to preserve which facts came from the data boundary, which consequences follow from the declared ledger, and which choices belong only to the final authored surface.
