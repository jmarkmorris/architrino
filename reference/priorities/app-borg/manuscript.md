# Borg: Identity, History, and Evidence in an Assembly Viewer

## 1. Viewing an assembly without changing its meaning

### 1.1. Three objects behind one picture

An assembly viewer can draw the same apparent motion from three different kinds of object: an explicitly prescribed path, a retained record of dynamical evolution, or a projection prepared for display. Their images can agree while their evidential meanings differ. A prescribed circular trajectory describes a geometry. An accepted evolution record describes what a specified dynamical computation admitted over a stated interval. A display projection describes how either object reaches a screen. None acquires the authority of another merely by being animated.

Borg is specified as a consumer of those objects within $\mathbb{A}\mathbb{A}\mathbb{A}$. Its physical substrate is the theory's delayed path-history interaction in Euclidean space and absolute time. General relativity, quantum theory and particle classifications remain effective descriptions or recovery targets. They do not supply the viewer with primitive mass, magnetic force, intrinsic spin, quantization, or binding rules. Where acceleration is displayed, its numerical authority belongs to a declared producer and its retained evidence.

The common architecture is therefore a sequence of explicit mappings: a source defines the model; an identity relation specifies which model or realization is meant; a record carries its paths and provenance; a projection declares a frame and display rule; and a separate scientific relation states what has been established about the exact object. The [identity contract](contracts/assembly-identity-relation-contract.md) and [viewer contract](contracts/assembly-viewer-requirements.md) supply complementary parts of this separation.

### 1.2. Prescribed, evolved, and exploratory motion

A sealed assembly record is read-only. Playback evaluates retained segments using the record's declared interpolation and persistent path identities. Optional samples support inspection but do not authorize continuation beyond missing segments. A prescribed record and an evolved record retain their distinct grades even when both provide continuous-looking paths.

An exploratory evolution branch is a separate child object. The declared prescribed-to-Display handoff cuts at a common accepted segment boundary and retains the exact source prefix; it does not reconstruct an initial state from pixels. The recorded display profile uses normalized wake speed $c_f=1$, coupling $\kappa=0.0005$, nominal step $0.01$ and chunk horizon $0.3$. These are a source-bound exploratory profile, not a recovered physical scale. The child remains non-promotable Display motion, and returning to the sealed source restores its original identity.

Random initialization is another workspace. It must not overwrite the sealed record or borrow its scientific status. The source's launch contract is idle until Start. A running evolution, a paused source replay and an exploratory child need isolated, separately restorable state. Pending asynchronous responses must be invalidated when they no longer match the selected workspace. The principle is continuity of identity as well as continuity of position.

## 2. Exact identity and the structure of a catalog

### 2.1. Four kinds of identity

A label identifies a presentation choice; it is not sufficient to identify a mathematical model. The model binding combines a stable assembly identifier with the digest of its identity-bearing scientific definition. That definition includes the source law and units, prescribed operators or paths, persistent constituent order, component membership and coordinate parameters. A record digest additionally identifies particular serialized bytes. A scientific relation has its own stable identifier and source revision.

These identities have different change rules. Renaming a presentation label need not alter the model. Changing a constituent order, source law or geometric parameter can invalidate an exact scientific relation even if the old label and image remain. A byte change can produce a new record without changing the scientific model, provided the declared identity procedure establishes that distinction. A digest alone does not decide the distinction.

The source also separates a model from a physical occurrence and a causal state. An occurrence requires source-carried formation or lineage information. A causal-state identity would require the declared checkpoint and history content needed for that comparison. The prescribed registry does not carry those objects. Its unavailable occurrence and causal-state fields preserve an absence of evidence rather than supplying synthetic histories.

### 2.2. Typed relations and grouping

Exact-record equality, exact-model equality under declared symmetries, continuation, merge or split lineage, tolerance-dependent morphological similarity, and membership in a versioned taxonomy are different relations. Morphological comparison requires a metric, alignment rule, time interval and tolerance. A taxonomy relation requires its classification revision. Neither establishes exact dynamical equality.

The retained registry defines 46 braid entries containing 145 configurations. Forty-five entries are singletons. The remaining entry groups 100 configurations through one complete, source-declared equal-radius planar three-binary balance relation and its common ledger identity. This is a particular supported relation, not permission to group all similar-looking assemblies. A component count is likewise determined by complete disjoint source membership, never by dividing the constituent count by six.

For a braid entry $b$, let $M(b)$ be its registered configurations and let $R(m)$ be the current scientific relations that match configuration $m$ at the required identity. The source's active-finding configuration count has the form

$$
N_{\mathrm{active}}(b)=\#\{m\in M(b):\text{at least one relation in }R(m)\text{ is active}\}.
$$

Each configuration is counted once. A configuration with several claims does not become several configurations; an active scoped failure can count as an active relation. Superseded and withdrawn relations do not contribute. The number is coverage bookkeeping, not a score for truth, stability or physical prevalence.

### 2.3. Filtering precedes grouping

A catalog query first resolves exact identity and applies the requested facets. Grouping and representative selection follow. Otherwise an illustrative member can silently transfer its properties to members that do not satisfy the same filter. A group's preview remains one example, and incomplete member evidence must remain visible as incomplete coverage.

The indexed control plane carries model and record hashes, source memberships, taxonomy revisions and deterministic query state. Exact hash lookup, prefix lookup, text search, facet filtering and cursor continuation answer different questions. Prefix collisions must be resolved; a saved cursor or selection cannot silently retarget after its identity or filter revision changes. A migration needs an independently authored comparison of the intended identity rule. Agreement between a new canonicalizer and fixtures emitted by that same canonicalizer checks reproduction, not the rule itself.

An optional assembly-complexity description can be formalized only after fixing a primitive alphabet $B$, allowed joins $J$ and a target equivalence relation. A minimum description length then asks for the least admissible construction of that target under those choices. The local discussion uses such ideas as a possible classification language. It does not derive a formation probability, natural assembly pathway, causal ancestry or retained physical branch from a small description.

## 3. Geometric descriptors with explicit domains

### 3.1. Components, planes, and occupied circles

A braid component can be planar while the full assembly spans three dimensions. Its planarity refers to the complete component path over the declared interval, not a favorable camera angle or one instantaneous pose. Several planar components can occupy different planes. Degenerate static or axial cases require their own boundary designation rather than a forced planar or spatial label.

Circle occupancy refers to a common geometric carrier: center history, unoriented plane normal, radius and any declared common translation. Phase, angular rate and polarity specify motion on a carrier; they do not by themselves define a different circle. Complete carriers can establish that one member occupies each circle or that several members share a circle. A mixture of singleton and multiply occupied carriers is a mixed assignment. Unsupported motion remains unassigned.

A comparison must use one common frame and the complete relevant history. Recentring every path independently could collapse distinct circles into the same carrier. Similarly, chaining pairwise tolerance matches can create a group whose extreme members exceed the intended tolerance. The source requires complete carrier evidence and rejects unsupported inference from trails, pixels or a single pose.

### 3.2. Assembly-centered radii

A radius descriptor is measured from the declared assembly center, which need not coincide with a path's own circle center. For a circular path with constant carrier radius, expressed relative to that assembly center, write

$$
\mathbf r_j(T)=\mathbf d_j+\mathbf u_j\cos\theta_j(T)+\mathbf v_j\sin\theta_j(T),
\qquad
\mathbf u_j\cdot\mathbf v_j=0,
\quad
\|\mathbf u_j\|=\|\mathbf v_j\|=\rho_j.
$$

Direct expansion gives

$$
\|\mathbf r_j(T)\|^2=
\|\mathbf d_j\|^2+\rho_j^2
+2\mathbf d_j\cdot\mathbf u_j\cos\theta_j(T)
+2\mathbf d_j\cdot\mathbf v_j\sin\theta_j(T).
$$

The cross term between the orthogonal basis vectors vanishes, while the two squared trigonometric terms sum to $\rho_j^2$. This elementary identity explains why equal carrier radii do not imply equal assembly-centered radii. Offset and phase terms matter. For source-defined axial offsets orthogonal to each circle plane, the same expression reduces to offset squared plus carrier radius squared; linear paths and radial-breathing operators require their own complete functions.

The registry's iso-radii descriptor compares these source functions over the complete declared interval. Its coefficient comparison uses a relative scale bound of $10^{-12}\max(1,B)$ for the declared coefficient scale $B$. This is a floating geometric assignment, not an interval-certified physical theorem. Seventeen probes can witness unequal radii; failure to find such a witness cannot establish functional equality. Circle comparison has its own tolerance and must not inherit the radius tolerance by name alone.

### 3.3. What the catalog examples establish

The source registry contains planar balanced examples, alternating-polarity rings, three-axis circular constructions, two-component circular assemblies, radial-breathing and phase-varying operators, static boundary cases and rotating Platonic examples. Their common achievement is a source-defined displayable geometry. Their component, circle and radial descriptors retain separate meanings.

The six-constituent orthogonal-axis weave and the ordinary three-axis examples are not interchangeable with two-component assemblies. The two-component circular examples distinguish coincident and separated centers, coaxial planar components and co-spherical planar components. A full assembly can be spatial in each case while its individual components are planar or spatial according to their own source membership. The phase-varying and counter-breathing cases retain unsupported circle or breathing assignments where a complete classifier is absent.

The registry's actual configuration arrays carry 125 iso-radii and 20 hetero-radii assignments; 123 multiply occupied-circle, 18 single-occupant and four unavailable assignments; and no mixed-circle assignment. All 145 speed-policy fields are unavailable. These are a census of the retained metadata, not fresh certifications of geometry, a current menu census or evidence for a universal speed restriction. A prescribed path's rate does not establish an accepted scientific speed policy.

Six configurations have a pinned Platonic relationship: five generic rotating vertex constructions and one separately scoped octahedral construction. A resemblance to a solid is not sufficient for assignment. The stella-octangula example retains its own identity and evidence; it does not acquire an exact Platonic facet or a bounded-release result through its name or shared visual structure.

## 4. A view that preserves the source

### 4.1. Selection geometry and inspection geometry

The taxonomy selection canvas uses a rotation-invariant bound on every source-carried path. That bound keeps the complete assembly visible at allowed orientations. It is a preview-fitting device, not a claim that the assembly is a sphere and not the simulation's physical boundary shell.

The source's selection contract permits only the constituent markers, their polarity-colored paths and the clipping rim. It excludes an interior globe, axes, text labels, wake effects and scientific diagnostics. Pointer and keyboard rotation with reset are supported; zoom and pinch scaling are excluded, and wheel gestures remain page scrolling. The exact-record inspector is a different surface with provenance and scientific-status detail. Keeping those surfaces distinct prevents the selection image from presenting itself as an evidential instrument.

### 4.2. Trails follow occupants and available past

A trail belongs to its constituent's polarity. The recorded contract uses red for positrinos and blue for electrinos, with the exact source base colors preserved independently of evidence grade. Fading changes opacity, not the base hue. A failure or run-grade change belongs in the authority display rather than recoloring paths.

For an opposite-polarity antipodal two-occupant circle, the preceding half-turn fades linearly to zero at its old end. A singleton circle instead receives its preceding full turn or complete reconstruction cycle without the two-occupant half-turn restriction. For at least three co-rotating members, a preceding arc can end at the preceding phase neighbor only when the nonzero signed angular rate is common and the phases are complete and distinct. If the preceding angular gap is $\Delta\theta>0$, the corresponding history duration is $\Delta T=\Delta\theta/|\omega|$.

Unequal rates, counterrotation, phase collisions or missing carriers do not justify that rule. Binary membership alone also does not prove a shared circle. Every trail is clipped to available past; missing history is not filled by wrapping into future samples. Trail length is a display choice and never determines how much causal history the evolution needs.

### 4.3. Frames, vectors, and collections

A comparison frame carries a positive clock scale, positive ruler scale, epoch and wake-speed convention. Multiple records require compatible frame declarations and an overlapping supported time range. A legacy record without the required carrier remains unavailable for that comparison rather than receiving an implicit identity transform.

The vector carrier distinguishes source-defined kinematic angular-rate and negative-to-positive pose vectors from intrinsic spin or a physical dipole. An empty vector set means unavailable, not a zero physical observable. A collection preserves exact source order and the model and record identity of each member. Object-store references, when present, are retained provenance and are not permission to fetch, delete or replace raw sources.

The viewer contract describes replay, prescribed-chart inspection, source-carried co-rotating or screw-frame views, envelope comparison and static export. Animation export remains a separate unavailable operation in the retained record. Playback never becomes EOM continuation through a frame transformation or export command. Older broader comparison and editing proposals coexist with narrower implemented records; those differences cannot be settled by an attractive interface alone.

## 5. Delayed geometry as a query, not an evolution engine

### 5.1. Source time and receiver time

For a receiver event at position $\mathbf X_R(T_R)$, a source path $\mathbf X_j(T_e)$ contributes a geometrically eligible retarded time when

$$
\|\mathbf X_R(T_R)-\mathbf X_j(T_e)\|=c_f(T_R-T_e),
\qquad T_e\le T_R.
$$

The prescribed-translation interface asks the designated analytical evaluator for every eligible root in the declared source-history domain. It does not evolve the prescribed assembly or turn this geometric condition into an app-local acceleration law. Symbolic $c_f$ records the wake-speed dependence; new numerical illustrations use $c_f=1$.

A root-bearing response distinguishes multiplicity, ordinal, residual bound, certification status and the source's declared derivative information. Several roots can belong to one source path. A certified root-free interval is different from an uncomputed interval, missing history or an unresolved interval. A negative derivative token is not a license to discard a root. Unsupported or uncertified branches must not be interpolated into a smooth authoritative curve.

### 5.2. Translation and the three history pictures

A fixed frame and a co-translating frame are related only by the explicitly declared common translation. The source placement and receiver event must be interpreted together. Independent per-path recentering or a translation estimated from the picture changes the query. A zero translation makes the two views coincide but provides no general test of nonzero translation.

A causal-history tube shows the prescribed source history. A source-to-receiver arrival connection depicts a returned retarded relation. A retained EOM wake row is producer evidence from an evolution record. These are three distinct layers with different authority. Drawing the first two does not manufacture the third or demonstrate an acceleration, retained branch or field recovery.

The architecture binds source, protocol, implementation, result, case and campaign identities. A selection change cancels or invalidates stale queries; a late response must not attach to the new source. Queries can settle after interaction rather than rerunning a costly evaluator on every display frame. The browser consumes one compact provider contract, whether its authorized backing is a static projection or a local analytical service. It does not open raw ledgers or reconstruct missing root physics.

### 5.3. Controls and measured scope

The retained design names controls for static and uniformly moving sources, multiple roots and negative derivative cases, certified root-free and unresolved intervals, drawn-but-uncomputed geometry, absent score fields, identity mismatch and missing carriers. These controls concern the interpretation of source and evaluator outputs. They do not substitute for independent correctness of the analytical owner.

The browser performance receipt covers one identified prescribed projection, including six returned roots at receiver time four, one narrow viewport and a 120-frame sample. Its original zero-translation comparison cannot establish the general transformation rule. The source reports an additional nonzero-translation control separately. A later presentation successor retains a different byte identity and was not remeasured by the original performance receipt.

## 6. Accepted histories and resource limits

### 6.1. Retention is a causal obligation

A delayed interaction can depend on history that is invisible to the camera. Removing a trail mesh, hiding a path or dropping a playback sample therefore does not justify deleting the corresponding evolution history. Shared segment endpoints can be represented without duplicate state, but every required accepted segment and its identity must remain recoverable through the declared retention or spill mechanism.

The source describes an optional fixed-envelope release certificate. A complete leading segment may be released only when its outward causal support has passed the entire declared receiver envelope, and a candidate leaving that envelope is refused. This is conditional history release for that envelope. It is not permission to discard every constituent that happens to be outside the visible sphere, nor a theorem about an unbounded environment.

Other design alternatives—retiring outbound identities and generating new inbound boundary identities, or retaining exact histories on disk for an unbounded domain—have different obligations. The source does not combine them into one accepted global retention policy. A boundary approximation cannot repair a missing retained local history merely because both consume less memory.

### 6.2. Transport and display budgets

Accepted-history transport can reuse an exact retained-prefix token bound to path metadata and per-path segment counts. A normal extension transmits the suffix while the worker retains the matching prefix. A mismatch requires the declared full-retry path; an unknown token is rejected. Halt, restart and executable-identity changes invalidate reuse. Responses contain only newly admitted extensions, and completed promises must not retain obsolete large payloads.

Claim-grade runs have a fixed declared budget and cannot silently downgrade into Display continuation. Display-grade runs use a separate host-aware envelope. Its source-time policy reserves the larger of twenty percent of RAM and two gibibytes, subject to the documented half-RAM cap, and uses a minimum available-growth floor. That resource policy changes how much exploratory history can be held; it does not change the EOM law or make a Display result promotable.

The source records earlier experiments in automatic grade downgrade and later replaces that behavior with a fixed grade for each run. Likewise, its exact chunk-end continuity repair addresses binary floating-point formatting at transport boundaries. The correct displayed endpoint and source token are not interchangeable with a rounded time label. A rejected or timed-out candidate does not become part of the accepted path prefix.

### 6.3. What the performance history can support

The retained history reports particular memory, transport, playback and module-decomposition measurements. They explain why exact-prefix transport, payload release and focused ownership matter. They do not constitute a new profile on the present machine. A change in module line count is not a speedup, and comparing two differently configured historical runs does not isolate one causal performance effect.

The source's browser budgets distinguish bundle size, static payloads, Pages storage, browser heap, GPU rendering, local storage, automation cost and EOM throughput. Passing one category supplies no measurement of the others. The July preset sweep describes a former non-EOM display runtime; the September indexed-registry benchmark uses synthetic entries. Neither establishes physical dynamics or the feasibility of an arbitrary future assembly population.

## 7. A finite observation window

### 7.1. Geometry, counts, and a declared buffer

A spherical observation model declares center $\mathbf c$, outer computed radius $r_O$, central observation radius $r_C$ with $0<r_C<r_O$, and positive buffer $b=r_O-r_C$. The central ball determines where a claim is assessed; it need not be rendered as a second visible sphere. The outer envelope is likewise not a material wall or a source of primitive force.

If $N_C$ is a uniform-density sizing target for the central ball, the source's spherical population rule is

$$
N_{\mathrm{calc}}=\left\lceil N_C\left(\frac{r_C+b}{r_C}\right)^3\right\rceil.
$$

With the recorded normalized example $N_C=3$, $r_C=0.4$ and $b=0.1$, this gives $\lceil3(1.25)^3\rceil=6$. This is an elementary volume-ratio calculation and a sizing target. A particular uniformly sampled realization need not contain exactly three members inside its central ball. It would be incorrect to use the central target as the total computed count after adding a positive buffer.

The manifest also retains an older length-based count convention and larger design targets. Without a declared relation between that length and a spherical radius, its density expression cannot be silently treated as the same physical number density. The spherical formula above states its own geometric assumptions and does not adjudicate those older conventions.

For history depth $h$, central observation horizon $T_C$ and a declared speed bound $v_{\max}$ over the relevant domain, the source gives the strict-buffer target

$$
b\ge\max(c_fh,\,v_{\max}T_C).
$$

This is the contract's interpretation condition. It is not, by itself, a newly proved theorem that a finite calculation recovers an unbounded physical environment. Its use requires the specified domains, histories and speed bound, together with the separate boundary-to-central error test.

### 7.2. Crossings and explicit empty cells

At an outer-shell crossing, the outward normal is determined by the shell geometry:

$$
\mathbf n(\mathbf x)=\frac{\mathbf x-\mathbf c}{r_O}.
$$

A positive $\mathbf v\cdot\mathbf n$ denotes an outbound crossing and a negative value an inbound crossing. Zero or an interval with indeterminate sign is unresolved. Such a crossing cannot be assigned replay authority merely by choosing a sign numerically.

A surface partition is a bounded summary device. It declares complete spherical coverage, nonoverlap except shared edges, patch-area bounds and time bins. Every patch/time cell must have either an accepted summary or an explicit certified-empty disposition. Silence is not evidence of emptiness. Partition resolution and uncovered-area bounds belong to the error budget; no fixed Cartesian direction is a primitive part of the spherical model.

The original requirements contain a six-patch description, while the sampling protocol fixes eight patches and two time bins, and a separate fixture reports eight total patch/time cells. Those are different recorded scopes. A reader cannot infer a single current partition by multiplying or substituting the numbers without identifying the particular source.

### 7.3. Influence and replay identity

A shell summary retains crossing events, source path segments, patch and time identities, normal and tangential velocity statistics, polarity statistics and extraction status. Its influence model is path-derived and names the interaction kernel, path index and compression or quadrature error. A cached value at a display point is only a visualization aid.

A replay source maps observed shell data to new inbound paths through a declared rotation and tangent basis, time mapping, sampling seed and polarity policy. It preserves source traceability while assigning new identities. An inbound replay member is not the same retained external constituent returning under a convenient identifier. The mapping must not invent an unobserved velocity tail or conceal incomplete source coverage.

Boundary-generated contributions retain reduced-model authority. They do not replace local retained wake rows, certify causal roots, establish branch retention or promote a benign-noise interpretation. These restrictions remain in force even if a producer asserts a favorable evidence flag.

## 8. Coverage and residual decisions

### 8.1. Exhaustive accounting precedes interpretation

The manifest partitions candidate wake rows into resolved, admissibly aggregated, boundary-generated and failed dispositions:

$$
N_{\mathrm{candidate}}=N_{\mathrm{resolved}}+N_{\mathrm{aggregated}}+N_{\mathrm{boundary}}+N_{\mathrm{failure}}.
$$

The equality is meaningful only with exclusive and exhaustive row membership. Equal totals alone do not establish that no row was duplicated or omitted. It is an accounting identity, not conservation of energy or a proof of physical completeness.

Aggregation of a below-floor contribution requires that it is not selected, carries no branch dependency and lies inside the declared aggregation error. An above-floor row cannot simply be trimmed. A gap is a failure disposition with an affected receiver or region; it is not zero influence. The displayed acceleration decomposition must retain the producer's local, boundary, background and unresolved distinctions rather than recreating them in browser code.

### 8.2. Interval decisions for a paired comparison

The shell contract specifies a relative weighted comparison between reference values $A_i$ and boundary values $B_i$, with positive weights $W_i$ and positive normalization floor $\epsilon_0$:

$$
R=\frac{\sqrt{\sum_i W_i(B_i-A_i)^2}}{\sqrt{\sum_i W_i A_i^2}+\epsilon_0}.
$$

When the inputs are intervals, the producer returns an enclosure for the residual. A required row passes only if the enclosure's upper bound does not exceed the declared tolerance. A lower bound above tolerance establishes failure within that comparison. An enclosure that straddles the tolerance is indeterminate and remains fail-closed. Pointwise display rounding cannot resolve the uncertainty.

The three required comparisons are shell self-similarity, shell replay and boundary-to-central influence, with recorded thresholds $0.05$, $0.01$ and $0.001$, respectively. Distinct reference and boundary identities, positive interval weights, source-row identities and the requested receiver domains are part of the comparison. Missing reference data, untraceable mappings or an absent required residual prevent admission. Their absence cannot be replaced by a producer assertion that the run passed.

### 8.3. A completed sampler with a negative outcome

The retained velocity-sampling protocol freezes calibration seeds separately from holdout seeds. It uses normalized wake speed one and the declared speed range $0.2$ to $0.8$. The source records five EOM runs, 18 calibration crossings and 12 holdout crossings, with complete per-run shell and influence accounting. Its candidate replay policy samples only complete observed calibration rows.

All six admission checks are required. The velocity-distribution residual is $0.32444284226089354$, above its $0.20$ limit. The central-contribution residual is $0.03802281448384705$, above $0.001$. Tail behavior, correlation, seed variance and patch-replay distribution pass their frozen checks. The result therefore leaves the candidate policy unselected and replay-dependent values fail-closed.

This negative result is compatible with the reported success of all three paired transport residuals within each fixture run. Those residuals and the six policy-admission checks measure different comparisons. A complete transport implementation does not imply an accurate sampling policy. Holdout data withheld from calibration provide separation for the sampling assessment, but all runs share the EOM executable and extractor; they are not an independent oracle for EOM correctness or a physical benign-noise result.

## 9. Scientific status belongs to the exact object

### 9.1. Five requirements without a score

The scientific-status contract preserves five distinct requirements. H1 concerns a closed declared state and identity-bearing model inventory. H2 concerns geometric and coincidence admissibility. H3 concerns causal admissibility and the required root coverage. H4 concerns nonzero-horizon ordinary EOM compatibility without prescribed continuation. H5 concerns a positive-width retained or metastable branch, including the declared return, continuation, prehistory and neighborhood obligations.

A bounded H4 pass says that one realization followed ordinary evolution for the reported interval. It does not establish H5. An accepted H5 pass supports a retained branch within its stated scope; stronger stability language additionally needs the scientific owner's equilibrium and neighborhood obligations. Unknown, unindexed, missing and stale states must remain distinct from a scoped failure.

The resulting vocabulary matters. An exact H4 failure concerns that realization's bounded release. An actual H5 failure falsifies the retained-branch claim only within its tested scope. A bounded search without success says no solution was found in the searched domain. A family-wide falsification requires a source-owned covering theorem, exhaustive certified search or equivalent argument that actually reaches the named family and predicate.

### 9.2. Exact evidence and context

A scientific relation binds exact model identity, source revision, lifecycle, tested realization, parameter domain, horizon, instrument, assumptions and evidence anchors. It also distinguishes what it establishes, what it does not establish, its current blocker and an operator-checkable falsifier. Labels, preview geometry and group representatives cannot substitute for this binding.

The retained source history distinguishes 25 exact adjudications from broader exact-or-contextual coverage of 145 configurations across 46 entries. Earlier versions report different populations. The broader coverage count does not imply 145 exact tests, and no preview inherits another member's accepted result. In particular, an off-catalog centered-five realization's bounded ordinary-evolution evidence does not transfer to the eight-member stella-octangula record. A scoped sum-edge obstruction does not become a failure of every rotating octahedron.

Duplicate relations, unsupported state tokens, missing anchors, stale revisions, changed model identities or incomplete group coverage invalidate the affected presentation. The browser can explain and link evidence; it cannot locally calculate equilibrium, basin width, return, causal admissibility or retention. The source-time census is historical evidence about a projection, not a fresh scientific acceptance or a timeless hard-coded constant.

## 10. Value authority and failure provenance

### 10.1. Displaying a value at its actual grade

The manifest distinguishes authoritative solver output, an app-facing projection, display-only visualization, missing error budget, exceeded error budget and fail-closed value. If several descriptions apply, the least authoritative applicable state controls the display. A projection identifies both its source value and its transformation; a logarithmic view carries the raw value, transformed value and rule.

Authority requires more than a plausible number. It requires the run manifest, model contract, precision path, relevant stage errors, declared tolerances and source history. Selected-object and wake-row diagnostics expose the applicable uncertainty and causal-root information. Missing or exceeded budgets disable authoritative styling and use in branch or retained-wake evidence. A failed requirement and an incomplete verification remain distinguishable causes.

The source's nine product categories connect model/version, envelope, initialization, retained path streams, wake and replay rows, numerical budgets, diagnostic authority, playback handles and claim-level status. Storage and render metadata preserve the route from those values to the interface. None of these declarations authorizes the browser to invent a missing scientific value.

### 10.2. A narrowly bounded historical invalidation

The historical browser-claim review identifies a specific conjunction: an exposed build interval, the browser HTTP EOM route, certified Claim grade and a second-or-later chunk. In that route, returning a trimmed history could make subsequent continuation omit required accepted state. Claims depending on the affected continuation must be invalidated within that provenance scope.

The first accepted extension is not thereby declared incorrect, but its returned trimmed history cannot justify the later continuation. Direct command-line or independent process evidence, prescribed playback and unrelated Display artifacts retain their previous grade only when they do not depend on the bad route. Unknown external provenance remains quarantined pending classification. A historical search reporting no persisted matching artifacts does not establish that no external affected artifact exists.

The accompanying code review records repaired status validation, asynchronous selection guards, workspace isolation, disposal, interpolation and time-boundary handling, as well as a falsified allocation-hash accusation. These records support a history of identified mechanisms and bounded repairs. They are not a current code audit, an execution of the old commands or a blanket validation of every present interface.

## 11. Interaction and measurement boundaries

### 11.1. Controls do not redefine dynamics

The recorded initial-state controls distinguish count, polarity inventory, separation, seed, velocity components, coupling, step limits and chunk horizon. An accepted edit prepares a new time-zero state without automatically starting it. The source's random example uses six members, balanced polarity and outer radius $0.5$; it is a source-bound app example, not a material assembly. Unreachable numeric edits retain the previous valid state.

Playback pace and trail duration are display controls. A simulation-time clock can advance more slowly than wall time when production is slow, without changing the integration step. Fixed-width clock formatting and conservative decimal display prevent the interface from overstating an accepted endpoint. Older direct-manipulation proposals remain broader than the source's implemented numeric-control inventory.

The render contract separates outer envelope, paths, wake layers, acceleration diagnostics and contextual panels. Close-pair counts use the evaluator's declared finite-width scale, and outside-shell population counts differ from first-crossing event counts. Delayed-root source-motion ratios are display diagnostics. None is, without additional producer evidence, a binding measurement or physical acceleration result.

### 11.2. Historical engineering evidence

The July preset sweep covers nine combinations of three presets and three viewport sizes. It reports developer-test limits for initialization, append rate, payload growth, heap growth, retained rows, target playback and chunk size. Its motion authority is explicitly the former non-EOM display runtime. Those observations remain useful for interpreting the interface's engineering history but cannot be imported as current solver limits.

The million-entry registry benchmark measures synthetic database engineering: one million models, four million facet rows, storage and import behavior, and seven lookup distributions. Median query latency does not erase a recorded large tail; prefix and facet queries have distinct maxima. No synthetic entry count is evidence for that many natural assemblies. The September one-record browser receipt similarly supplies bounded load, animation, scrub and heap observations, not complete catalog coverage.

The visual registry records dispositions for posters, inspection and animation for all 145 configurations, including two static camera-turntable cases. These are declared historical coverage fields. A camera turntable is not moving physical geometry, and a source statement that a view was inspected is not a fresh visual inspection of its image.

## 12. Extensions whose physical content remains unresolved

The remaining teaching designs address orthogonal geometric coordinates, rational frequency relationships, overlap and flattening, particle-family diagrams, observer-facing quantum labels, conserved-quantity displays and material release. They share a constraint: the app consumes accepted scientific carriers and does not fill missing carriers with familiar standard-physics interpretations.

A rational frequency ratio can define a prescribed return period without establishing dynamical resonance or natural selection. A geometric exclusion or flattening display is not a derivation of Pauli behavior. Flavor groupings and color representations retain their different effective meanings; an octet or decuplet diagram does not recover the Standard Model. Observer charge, weak exposure, hypercharge and color require their own mapped definitions rather than a polarity-based shortcut.

Energy, momentum and angular momentum displays require compatible producer ledgers. The browser cannot reconstruct them from attractive paths, assign primitive architrino mass, or infer conservation from a closed picture. Material release, capture, scattering, heat, recoil and excitation additionally require physical response and constitutive information that the local design does not establish.

Borg's coherent contribution is the preservation of these distinctions while making specified geometries, retained histories and exact evidence inspectable. Its viewer can present a negative result faithfully, expose an unavailable carrier and keep a contextual relation separate from an exact one. The mathematical and architectural clarity of that presentation does not complete the physical recovery obligations it displays.
