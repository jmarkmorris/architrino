# Pairwise Causal-Root Ledger Closure Proof Design

## Status

- Kind: `priority`
- Queue item: `MEC-005`
- Claim level: `priority-only proof design`
- Workstream: [master-equation-closure](priorities.md)
- Topology owner: [topological-causal-root-ledger-proof-target](topological-causal-root-ledger-proof-target.md)
- Discussion inputs: [topological causal-root ledger capture](brainstorming.md#topological-causal-root-ledger-discussion-capture-2026-06-29) and [universal conservation ledger capture](brainstorming.md#universal-conservation-ledger-discussion-capture-2026-07-10)
- Routed research input: [wake reception, transfer, and maturity](../../research-office/research-history/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md) requires MEC-005 provenance before its cumulative-extraction and angular-pin account tests can run; it supplies no account values or conservation claim.
- Certificate synthesis: [two-history causal-root ledger certificate](../../research-office/research-history/review-packets/mec-005-two-history-causal-root-ledger-certificate-2026-07-29.md) supplies the prescription-neutral full-domain envelope integrated below; it supplies no root-finder, boundary value, account map, or status change.
- Promotion status: not promoted

## Closure Question

Begin with exactly two Architrinos whose complete history inputs are declared on a bounded absolute-time slab. Treat each ordered receiver-transmitter pair as its own causal-root bundle, retain multiple roots and folds, enumerate every positive-delay self root separately from the unresolved diagonal semantics, and determine whether the resulting root set admits a finite, provenance-complete, signed, non-duplicated accounting description.

This is a proof-design question, not a conservation theorem. A finite signed root ledger would establish only that the causal-root geometry can be enumerated and attributed without double booking under its declared assumptions. It would not derive the values carried by debit, credit, wake, or boundary maps.

Plainly: the first target is a trustworthy index of who can receive which emission history, including folds and boundary events. It is not yet a proof that any physical quantity is conserved.

## Authority And Non-Selection Boundary

MEC-005 does not select or establish:

- a conservation law;
- a wake capacity law;
- a physical debit, credit, or account representation;
- new Architrino ontology;
- a retained branch;
- a branch-strength or acceleration law;
- an EOM solver acceptance result; or
- many-body superposition.

The Master Equation and the EOM solver are possible downstream consumers of an accepted pairwise ledger. Neither is an assumption, oracle, or source of topological authority for this packet.

## Declared Two-Architrino Domain

Set $c_f=1$. Let the two declared histories be

$$
\mathbf x_a\colon [S_0,T_1]\longrightarrow\mathbb R^3,
\qquad
a\in\{1,2\},
$$

with receiver interval $I=[T_0,T_1]$ and one declared continuous retained-history lower rule $L(T)$ satisfying

$$
S_0\le L(T)<T
\qquad
\text{for every }T\in I.
$$

The full encounter search domain is the compact causal closure

$$
\mathcal D
=
\left\{
(T,s):
T\in I,\,
L(T)\le s\le T
\right\}.
$$

Admitted delayed roots lie in the strict causal interior $L(T)<s<T$. The face $s=L(T)$ is the retained-history boundary and $s=T$ is the diagonal closure face. A finite family of search cells may replace direct work on $\mathcal D$ only when their interiors are disjoint, their union is exactly $\mathcal D$, and every shared face has one declared owner.

For ordered receiver $i$ and transmitter $j$, define

$$
G_{ij}(T,s)
=
\|\mathbf x_i(T)-\mathbf x_j(s)\|-(T-s)
$$

and the ordered root bundle

$$
\mathcal Z_{ij}
=
\left\{
(T,s)\in\mathcal D:
L(T)<s<T,\,
G_{ij}(T,s)=0
\right\}.
$$

Plainly: $\mathcal Z_{12}$ and $\mathcal Z_{21}$ are different ledgers because they reverse receiver and transmitter. A root in one must never be silently reused as a root in the other. A fixed rectangle $[T_0,T_1]\times[S_0,S_1]$ with $S_1<T_0$ is an allowed old-prehistory subdomain, not a full encounter certificate: it omits emissions produced during the receiver interval and cannot carry diagonal attachments.

The complete ordered-bundle domain is

$$
\mathcal Z_{\mathrm{ord}}
=
\mathcal Z_{11}\sqcup
\mathcal Z_{12}\sqcup
\mathcal Z_{21}\sqcup
\mathcal Z_{22}.
$$

Positive-delay self-root admission is frozen independently of diagonal evaluation:

$$
\mathcal Z_{\mathrm{self}}^+
=
\mathcal Z_{11}\sqcup\mathcal Z_{22},
\qquad
\texttt{self\_root\_admission}
=
\texttt{all\_positive\_delay\_roots}.
$$

For each self bundle, the structural diagonal

$$
\Delta_i
=
\left\{
(T,T):
T\in I
\right\}
$$

is a boundary carrier rather than an active root stratum. Its specification is

```yaml
diagonal_boundary_semantics: quarantined_unresolved
value_status: not_derived
prescription_ref: absent
consumer_allowed: false
disposition: Not advanced
```

This declaration assigns no diagonal acceleration, gradient, account value, continuation, core, or outgoing history. Any later accepted boundary prescription must attach to one separately owned boundary row without changing which positive-delay self roots the topology certificate enumerates.

Plainly: partner contact does not prove self-contact. A topology-only negative control may use histories with no positive-delay self root, but it may not exclude an admitted self bundle by convention. The diagonal remains visible as an unresolved boundary even when no positive-delay self root exists.

## What Counts As One Ledger Row

A numerical root sample is not itself a durable ledger row. On the bounded slab, one row is a connected regular root stratum together with its incident fold or boundary events. A canonical row key has the form

$$
\rho
=
\left(
\mathsf H,\,
i\leftarrow j,\,
\beta,\,
\mu,\,
\mathsf S_+,\,
\mathsf Q_\Delta,\,
\omega,\,
\mathsf B
\right),
$$

where:

- $\mathsf H$ identifies the exact two-history input and retained slab;
- $i\leftarrow j$ is the ordered receiver-transmitter owner;
- $\beta$ is the connected root-stratum identifier;
- $\mu$ is the declared local multiplicity;
- $\mathsf S_+$ records positive-delay self-root admission;
- $\mathsf Q_\Delta$ records the separately declared diagonal-boundary disposition;
- $\omega$ is the winding owner when a torus lift is used and is `none` in the Euclidean first control; and
- $\mathsf B$ identifies the independently checkable root bracket, inactive complement, and boundary-event record.

Plainly: repeated samples along the same root branch are evidence about one row, not new rows. Reversing the ordered pair, changing the history, or crossing a genuine fold creates different provenance.

The canonical identifier $\beta$ must be content-addressed from the exact history and domain identities, ordered-bundle owner, and an independently checkable invariant stratum descriptor. A root rank, row number, solver discovery order, or current numerical bracket is evidence metadata, not a canonical identity. Refinement must provide a bijection from each parent stratum to the same canonical stratum or to explicitly proved child strata at a newly resolved genuine event.

## Two-History Certificate Envelope

The desired proof object has literal claim scope `pairwise_root_ledger_topology_and_provenance_only` and schema `mec005_two_history_causal_root_ledger_certificate/v1`. It is a prescription-neutral envelope around reusable per-reception and event-free-slab root certificates, not another root finder. Its minimum record groups are:

1. `scope`, fixing the literal claim, schema version, certificate and producer identities, $c_f=1$, $I$, $L(T)$, the full domain $\mathcal D$, and an explicit nonclaims list;
2. `histories`, containing exactly two persistent labels, opposite-polarity provenance, exact history identities and digests, representation and segment metadata, reconstruction-error bounds, and the tameness evidence;
3. `ordered_bundles`, containing exactly the four owners $1\leftarrow1$, $1\leftarrow2$, $2\leftarrow1$, and $2\leftarrow2$;
4. `coverage_cells`, proving an exact partition of every ordered copy of $\mathcal D$ with no gap or double-covered interior;
5. `root_strata` and `boundary_strata`, with stable identifiers, multiplicity, orientation, classification, brackets or tubes, and independent evidence references;
6. `incidence`, recording every incident half-branch exactly once in both the stratum-to-event and event-to-stratum directions;
7. `emission_provenance_cells` and `ownership_index`, assigning each root, emission, and boundary event to exactly one owner without copying a source row for each reception;
8. `independent_verification`, naming the independently authored theorem, exact instrument, or interval checker and the precise reach of its check; and
9. `verdict`, separating full-domain topology/provenance from every unresolved boundary-semantic and downstream account claim.

The nonclaims list must cover conservation, action, continuation, physical boundary values, retained branches, MEC-006 closure, and solver acceptance. Every `coverage_cells` leaf has exactly one class: `root_free`, `simple_root_tube`, `boundary_stratum`, or `unresolved_search_cell`. An unresolved cell remains inside the possible-zero cover and blocks the full-domain verdict; it is never converted to an empty cell.

Multiplicity must come from a declared local factorization, intersection number, or independently checked derivative hierarchy. An ordinary fold has one event owner and two incident simple half-branches with opposite topology orientations. A higher or simultaneous singularity requires its own certified chart; otherwise its geometry and incidence remain unresolved. Each boundary row records its bundle-local or shared-geometric-event scope, combinatorial root-count flux, incident branch germs and coefficients, and either proved local multiplicity or `not_applicable_structural_boundary`. One shared geometric occurrence may have one ledger-level event group referenced by several bundle-local cells; simultaneous events generated independently in different ordered bundles remain distinct.

Every certified boundary with unknown evaluation semantics carries `quarantined_unresolved`, `value_status: not_derived`, `consumer_allowed: false`, and `Not advanced`. This differs from an `unresolved_search_cell`: unknown geometry, incidence, multiplicity, or ownership makes the full-domain topology/provenance verdict `Verification incomplete` and `Not advanced`. Certified geometry may support a narrow topology/provenance result while its quarantined semantic row and every consumer that needs a value remain `Not advanced`. MEC-005 itself remains `Queued`. `consumer_allowed` remains false at and beyond the earliest receiver projection of a quarantined boundary.

Existing `eom_root_completeness_certificate/v1` and `eom_root_continuation_certificate/v1` records may be reused only as leaf evidence. The full-domain verifier must reconstruct the partition and re-evaluate $G_{ij}$, the relevant derivatives, signs, incidence predicates, and refinement correspondence from the raw history representation. It may not import the producer's root ownership, canonicalization, expected output, or rank-derived identity. Agreement between two paths that share those components is same-implementation parity, not independent verification. In particular, the current slab producer's rank-bearing identity is leaf provenance only, not the envelope's canonical `stratum_id`.

The independent-oracle owner now documents the live `eom_root_completeness_certificate/v1` schema emitted by `certified_history.py` and asserted by its root-certification test. The piecewise-cubic v0 history-representation label is separate and unchanged. This documentation reconciliation supplies no status or evidence upgrade.

The separately authored [`verify-mec005-two-history-causal-root-ledger.mjs`](../../../scripts/eom/verify-mec005-two-history-causal-root-ledger.mjs) bounded structural-contract stage checks the frozen envelope identity, the exact four ordered bundles, finite declared entity sets, reciprocal incidence, multiplicity, refinement-stable identity, unique ownership, boundary quarantine, exact `/v1` leaf labels, and the implemented negative controls. Its report explicitly places full metadata binding, exact partition-tree coverage/disjointness, complete root and boundary evidence shape, the remainder of the fifteen mandatory negative controls, and independent reconstruction from raw histories outside its current reach. Its mathematical stage is therefore `not_implemented`, and every result remains `Verification incomplete`, `Not advanced`, consumer-disabled, and `Queued`.

### Mandatory negative controls

The `/v1` envelope returns `Verification incomplete` and `Not advanced` if any of these controls fires:

1. an older or second root is omitted;
2. $1\leftarrow2$ is reused as $2\leftarrow1$;
3. a self row is omitted, replaced by a partner row, or deleted because the diagonal prescription is unknown;
4. one connected stratum is split into duplicate canonical rows;
5. one event payload is copied into each incident branch;
6. a tangent or higher singularity is encoded as ordinary simple roots;
7. a diagonal or coincident boundary is represented only by an exclusion boolean, empty root list, numeric zero, `null`, or omission;
8. a retained-history edge is truncated and called inactive;
9. equal endpoint root counts are used to miss an interior fold-pair birth and death;
10. a simultaneous fold and history-edge event is flattened to one unsupported ordinary reason;
11. a root interval, accumulation, or non-tame history is admitted as a finite ledger;
12. persistent identity changes with root rank, row or traversal order, subdivision, or refinement;
13. an undeclared $s\ge T$ value or post-reception history enters the certificate;
14. a quarantine disappears under refinement without child proofs; or
15. the verifier shares producer root enumeration, canonicalization, expected outputs, or digest construction while their agreement is described as independent.

The master falsifier is any declared domain point that is neither certified root-free nor covered by a regular, boundary, or unresolved search cell, or any overlap without explicit incidence. A `/v0` leaf label consumed as `/v1` without explicit schema reconciliation also blocks the certificate.

Plainly: the envelope must prove how all four root bundles fit together over the whole encounter. It fails when a root or event is missing, when refinement renames the same geometry, or when an unresolved boundary is disguised as a usable value.

## Assumption Ledger

| Obligation | Minimum assumption needed before a proof attempt | Failure disposition |
| --- | --- | --- |
| Root enumeration | Each $G_{ij}$ is continuous on the compact causal domain $\mathcal D$ or a proved exact partition and belongs to a declared tame class, such as piecewise polynomial, semialgebraic, or real analytic with a finite stratification and no zero component on which $G_{ij}$ vanishes identically. | `root_enumeration_not_finite` |
| Completeness | An independently checkable active-root isolation covers every zero, and the complementary cells have certified nonzero gaps. | `root_row_omitted` |
| Root birth/death | Regular strata meet only finitely many declared diagonal, endpoint, memory-edge, seam, separately declared core, or finite-order singular events; an ordinary fold has local multiplicity two. | `boundary_flux_unclassified` |
| Attribution | Every stratum and event names one history record, one ordered-pair owner, one emission coordinate, one receiver coordinate, and one root or boundary certificate. | `root_provenance_incomplete` |
| Signed maps | Debit, credit, and boundary map domains, codomains, signs, and allowed inputs are frozen before evaluating a balance; no map may be defined from the residual it is intended to close. | `signed_map_residual_defined` |
| Multiplicity | Local multiplicity is obtained from a declared factorization, intersection number, or separately checked derivative hierarchy; a tangent root is not duplicated merely because a numerical solver returns two brackets. | `root_multiplicity_unowned` |
| Self-interactions | Every positive-delay self root is enumerated under the same root equation as partner roots, while the structural diagonal has a separate `quarantined_unresolved` semantic row; partner-pair lemmas are not reused as self-hit proofs. | `self_pair_convention_mixed` |
| Finiteness | The stratified root set has finitely many connected regular cells and finitely many incident event cells on the compact causal domain. Compactness without tameness is insufficient. | `root_accumulation_or_interval` |
| No double booking | Refinement-stable canonicalization maps every geometric root stratum and boundary event to exactly one row key; emission provenance and reception roots are indexed separately, and rank or traversal order is not identity. | `duplicate_or_replayed_entry` |

Plainly: smooth bounded histories are not enough. A smooth function can have infinitely many zeros accumulating inside a compact interval, so the allowed history class or an equivalent finite-stratification certificate must rule that out.

## Oriented Root And Boundary Accounting

At a simple root, define the topology-only orientation

$$
\varepsilon(\rho)
=
\operatorname{sgn}\!\left(\partial_sG_{ij}(T,s)\right).
$$

For an ordinary fold, the two incident simple branches must have opposite orientations. Their birth or death therefore changes the unsigned slice count by two while leaving the local algebraic count unchanged. Memory-edge, endpoint, core, and seam crossings instead require explicit boundary-flux rows.

The proof object sought by MEC-005 is a finite oriented cell ledger

$$
\mathfrak R_2
=
\left(
\mathcal C_1,\,
\mathcal C_0,\,
\partial_{\mathrm{root}},\,
\operatorname{owner},\,
\operatorname{mult}
\right),
$$

where $\mathcal C_1$ is the finite set of regular root cells, $\mathcal C_0$ is the finite set of fold and boundary-event cells, $\partial_{\mathrm{root}}$ records their incidence, `owner` assigns each cell to exactly one ordered bundle, and `mult` records local multiplicity.

Plainly: opposite signs at a fold can explain why two root branches appear together without creating an unowned topological remainder. They do not say that energy, momentum, angular momentum, or any other physical account closes.

Higher-order tangencies, intersecting fold strata, root intervals, or accumulating roots are not silently decomposed into ordinary folds. They stop the proof until a separately justified singular chart and multiplicity rule is supplied.

## Debit, Credit, And Provenance Maps

Let $\mathcal E$ be the finite set of emission-provenance cells represented in the bounded packet, $\mathcal R$ the finite set of reception-root cells, and $\mathcal B$ the finite set of boundary-event cells. The provenance map

$$
p\colon\mathcal R\longrightarrow\mathcal E
$$

need not be injective: more than one reception-root cell may refer to the same emission-provenance cell. That many-to-one relation must not cause the source-side row to be copied once per reception.

Candidate signed maps may be posed abstractly as

$$
D\colon\mathcal E\to\mathcal A,
\qquad
C\colon\mathcal R\to\mathcal A,
\qquad
F\colon\mathcal B\to\mathcal A,
$$

with a bounded-packet residual

$$
\mathfrak B_{\mathcal A}
=
\sum_{e\in\mathcal E}D(e)
+
\sum_{\rho\in\mathcal R}\operatorname{mult}(\rho)C(\rho)
+
\sum_{b\in\mathcal B}F(b).
$$

Here $\mathcal A$ is only an unspecified algebraic codomain used to state the proof burden. MEC-005 does not choose its physical representation, its capacity, or the values of $D$, $C$, and $F$, and it does not assert $\mathfrak B_{\mathcal A}=0$.

Plainly: this formula states where independently derived entries would have to go. It deliberately leaves blank what each entry carries and whether the total vanishes.

The universal-ledger discussion forbids a settlement-pair shortcut. Emission provenance is past-anchored, future receptions are contingent, and one emitted isochron is not consumed by one reception. Therefore:

1. $D(e)$ is evaluated once for an emission-provenance cell, not once for every $\rho$ with $p(\rho)=e$.
2. $C(\rho)$ is evaluated once for its canonical reception-root row.
3. $F(b)$ is evaluated once by the unique owner of the fold, memory, core, endpoint, or seam event.
4. Equality between a source debit and a later receiver credit is not assumed; it is part of a future wake-state and account derivation.
5. Any continuously emitted record that cannot be represented by finitely many provenance cells on the slab defeats finite ledger closure or requires a separately selected measure-valued account representation.

## Candidate Proof Sequence

### P1 — Finite ordered-bundle stratification

Prove that the declared tame history class gives each $\mathcal Z_{ij}$ a finite stratification into regular one-dimensional cells and finitely many zero-dimensional fold or boundary cells.

Falsifier: one admissible history produces a root interval, an interior accumulation of isolated roots, or infinitely many connected root cells.

### P2 — Complete root enumeration

Construct an active-root isolation and inactive-complement certificate for every ordered bundle. Check it against an independently authored exact, interval, or theorem-based enumerator.

Falsifier: the independent instrument finds an unlisted root or shows that two listed rows are the same root stratum.

### P3 — Boundary-flux identity

Prove that slice-count changes arise only from the declared fold, retained-edge, endpoint, core, or seam event cells, with ordinary folds incident to one oppositely oriented branch pair.

Falsifier: the unsigned root count changes with no owned event, an ordinary fold emits unequal orientation, or a root crosses the retained boundary without a flux row.

### P4 — Provenance and multiplicity uniqueness

Prove that every regular and event cell has one canonical row key and one local multiplicity, independent of numerical subdivision and refinement.

Falsifier: refinement changes the row count without discovering a genuine new stratum, or one event receives two owners.

### P5 — Signed-map well-posedness

After $D$, $C$, and $F$ are supplied independently, prove that every declared map is evaluated exactly once on its own domain and that all sums are finite.

Falsifier: a map reads future receiver history, is defined from $\mathfrak B_{\mathcal A}$, copies one emission debit across multiple receptions, omits a boundary owner, or diverges on the bounded packet.

### P6 — Pairwise closure verdict

Only after P1–P5 may a separately authored verifier decide whether $\mathfrak B_{\mathcal A}=0$ for the declared account maps. A zero result would be account-specific and slab-specific; it would not establish universal conservation.

Falsifier: the zero depends on changing a map after seeing the residual, on discarding a root or boundary row, or on comparing two implementations of the same accounting path as if they were independent.

## Acceleration-Operator Readiness Gate

No damping, growth, rebound, capture, or incoming/outgoing imbalance may be interpreted as an account or conservation verdict until the exact acceleration operator used by the control is identified and checked root by root.

For each admitted root $(i,j,T,s)$, the current regular-root target is

$$
\mathbf A_{ij}(T;s)
=
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^2|D_{t,ij}|}
\widehat{\mathbf r}_{ij},
$$

with

$$
D_{t,ij}
=
c_f-\widehat{\mathbf r}_{ij}\cdot\mathbf V_j(s),
\qquad
\frac{ds}{dT}
=
\frac{D_{r,ij}}{D_{t,ij}}.
$$

The factor $c_f/|D_{t,ij}|$ is the transmitter-side root-Jacobian acceleration weight. The second ratio is signed root playback; it is not an additional instantaneous acceleration multiplier.

Plainly: a scalar distance law by itself is not the declared operator. The operator also needs the arriving direction, the transmitter-side bunching of causal surfaces, the root identity, and the separately routed playback and singular-event data.

### Live readiness audit

| Layer | Live status | MEC-005 consequence |
| --- | --- | --- |
| Canonical regular-root acceleration value | **Resolved as a declared target.** The Master Equation derives the arriving spatial normal, inverse-square factor, polarity sign, and $c_f/|D_t|$ transmitter-side root factor, with $D_r/D_t$ retained only for playback. | The symmetric control must bind to this exact row structure rather than to a scalar $1/r$ or unweighted $1/r^2$ surrogate. |
| EOM solver regular-root path | **Implemented for the declared regular rows.** [CoupledEvolution.cpp](../../../src/eom/src/CoupledEvolution.cpp), [JointAccelerationSnapshot.cpp](../../../src/eom/src/JointAccelerationSnapshot.cpp), and [SharpAccelerationSensitivity.cpp](../../../src/eom/src/SharpAccelerationSensitivity.cpp) evaluate the delayed displacement direction, inverse-square vector, transmitter factor, acceleration weight, and root-time/direction/factor sensitivities. | A run packet must expose those per-root fields and prove that the encounter used that path without fallback to a different operator. |
| Complete receiver/self acceleration gradient | **Regular domain independently verified; singular derivative boundary awaiting disposition.** [MEC-006](receiver-wake-gradient-closure.md) now has an independent analytic audit and a separately structured three-dimensional numerical verifier for the fixed-reception regular partner-root tensor. Its positive-delay same-history specialization remains conditional on separation and transmitter-factor floors. No unique self-diagonal, fold, or coincident-birth derivative prescription follows from the regular mathematics. | The kinematic control may consume accepted regular rows only. Every quarantined derivative row remains unresolved and consumer-ineligible. Completed MEC-007 supplies the encounter's unchanged-law obstruction, but a two-body conservation interpretation remains gated wherever MEC-006 derivative rows are consumed and on a separately selected boundary update with same-update account derivation. |
| Self-pair acceleration | **Declared but conditional.** Every positive-delay same-transmitter root is admitted to the topology census; consuming a regular self row still requires separation and $D_t$ control, finite memory, and a singular-event route when a fold is reached. The structural diagonal has no assigned value. | The encounter cannot suppress an admitted positive-delay self row, and it cannot consume the quarantined diagonal as an acceleration row. |
| Pure scalar $1/r$ action route | **Established incomplete.** The live Master Equation records an uncancelled receiver-variation interior derivative and an unclosed derivation of the transmitter-side weight. | Agreement with a scalar action diagnostic cannot establish acceleration-operator or conservation readiness. |
| Characteristic-tail action candidate | **Awaiting verification.** The cross-pair receiver-gradient identity survives, but the complete self-diagonal functional remains inadmissible under its frozen convention. | It cannot yet supply the encounter's conserved account or boundary charge. |
| Circular growth statement | **Derived diagnostic, not an evolved conservation result.** The principal partner branch on the declared symmetric circular chart has forward tangential acceleration and is anti-damped; complete simple-root algebraic balance points do not certify a retained branch. | The concern that a current growth result came from an omitted full wake gradient is not established for the canonical acceleration operator. Whether a complete action/account operator reproduces the same result remains unresolved. |

Plainly: the regular acceleration law already contains more than a scalar distance factor. What remains open is whether one complete action and wake account derives that same operator, including its self and boundary rows.

### Readiness acceptance

The gate passes for a kinematic encounter only if:

1. every partner and admitted self root names its exact displacement, separation, line of action, polarity sign, $D_t$, $D_r$, acceleration weight, multiplicity, and boundary status;
2. the evaluated acceleration equals the declared vector operator on every regular row;
3. any root sensitivity used by an implicit or joint evolution differentiates emission time, line of action, inverse-square factor, and $D_t$ on the same history record;
4. folds, coincident births, core contacts, and root accumulations use their declared non-regular routes rather than the simple-root formula;
5. positive-delay self-root admission is frozen before evolution, every such root is retained, and diagonal-boundary semantics remain separately quarantined; and
6. an independently authored oracle checks at least the regular partner row, one admitted self row if present, and one fold or boundary negative control.

The gate passes for a conservation interpretation only after the stronger condition also holds: the same accepted action or causal-wake update derives the acceleration operator, signed account maps, and all encounter-boundary fluxes without residual-defined cancellation. That stronger condition is not currently met. It is also gated on an independently accepted MEC-006 receiver/self gradient disposition, because an undeclared near-diagonal sensitivity cannot be hidden inside the two-body account residual, wherever that derivative is consumed. MEC-007 now fixes the collinear encounter's same-event and limiting-measure disposition as an unchanged-law obstruction; a conservation interpretation therefore requires a separately accepted MEC-002/MEC-003 boundary update and its same-update accounts. These requirements must be met before either the collinear encounter below or a symmetric circular control can carry a conservation interpretation.

Falsifiers include a run row using $1/r$ as acceleration, omitting $c_f/|D_t|$, multiplying by $D_r/D_t$ as instantaneous strength, evaluating only one of multiple active roots, dropping an admitted self root, or assigning an unowned finite value at a singular root.

### MEC-006 singular-boundary intake rule

The MEC-006 boundary-option matrix does not authorize a new MEC-005 diagonal semantics. Until one option is explicitly accepted, the ledger must retain:

1. each incident regular root stratum with its refinement-stable canonical identity and ordered-pair owner;
2. one distinct unresolved boundary-event cell;
3. `self_root_admission: all_positive_delay_roots`;
4. `diagonal_boundary_semantics: quarantined_unresolved`; and
5. `not_derived` for every boundary acceleration-gradient, continuation, or signed-account field.

A later core, smoothing profile, event map, distributional term, or counterterm must receive one new boundary owner and may not also be copied into each incident root row. Branch selection may not erase an admitted simple-root row under the unchanged canonical acceleration operator.

Plainly: a fold has two incident root histories and one boundary event. The ledger must show all three without counting the event twice or disguising an unresolved value as zero.

### MEC-007 mirror-encounter intake rule

The completed [MEC-007 mirror close-approach record](mirror-close-approach-causal-root-boundary.md) uses this packet's symmetric collinear encounter, but it does not replace MEC-005 ownership. Its first-boundary theorems, independently checked incoming ledger, and unchanged-law obstruction may enter as bounded event geometry only. Every root, event, and unresolved boundary cell still needs one refinement-stable MEC-005 identity, and no MEC-007 acceleration integral may be interpreted as a provenance or no-double-booking pass.

Plainly: MEC-007 can show where the encounter becomes singular. MEC-005 must still show that every root and boundary event was found and booked exactly once.

## Smallest Bounded First Control

Use a symmetric collinear opposite-polarity pair in $\mathbb R^3$:

$$
q_1=-\epsilon,
\qquad
q_2=+\epsilon,
\qquad
\mathbf X_1(T)=-x(T)\widehat{\mathbf e}_1,
\qquad
\mathbf X_2(T)=+x(T)\widehat{\mathbf e}_1.
$$

Set $c_f=1$. Choose a large finite comparison separation $R_\Lambda=2x(T_-)$ as a regulated proxy for asymptotic separation, a closing relative speed $u_{\mathrm{in}}\in(0,2)$, and a finite retained-history depth $H_\Lambda$ long enough to certify the complete initial root census. On the input-history interval $[T_--H_\Lambda,T_-]$, use the mirror-symmetric affine prehistory

$$
\mathbf X_1(T)
=
\left(
-\frac{R_\Lambda}{2}
+\frac{u_{\mathrm{in}}}{2}(T-T_-)
\right)\widehat{\mathbf e}_1,
$$

$$
\mathbf X_2(T)
=
\left(
+\frac{R_\Lambda}{2}
-\frac{u_{\mathrm{in}}}{2}(T-T_-)
\right)\widehat{\mathbf e}_1.
$$

Each initial Architrino speed is below $c_f$, so the affine prehistory supplies no nontrivial self root. The evolution must not assume a breather, periodic return, rebound, or eventual departure. For the evolved interval, `self_root_admission = all_positive_delay_roots` remains fixed, while `diagonal_boundary_semantics = quarantined_unresolved` supplies no diagonal value or continuation.

Plainly: the control starts with two widely separated opposite polarities moving directly toward one another. “Asymptotic” means a sequence of larger finite comparison radii, not an initial condition placed at infinity.

### Encounter interval and terminal classifications

Evolve from $T_-$ with the readiness-gated acceleration operator until the first applicable terminal condition:

| Outcome | Exact condition |
| --- | --- |
| `outbound_crossing` | A first $T_+>T_-$ exists with $R(T_+)=R_\Lambda$ and $\dot R(T_+)>0$. |
| `captured_or_bounded_on_window` | No outbound crossing occurs before the predeclared terminal time, while separation and the complete root ledger remain bounded. |
| `core_or_coincident_boundary` | The declared core or coincident-root boundary is reached without an accepted continuation. |
| `root_census_incomplete` | An active, inactive, self, fold, or boundary row cannot be certified. |
| `acceleration_operator_not_ready` | The run cannot prove that every admitted root used the declared full operator. |
| `unbounded_or_unresolved` | The retained window, speed, root multiplicity, acceleration impulse, or numerical enclosure loses its declared bound. |

Plainly: this classification prevents a failed or non-returning encounter from being discarded merely because it does not resemble the desired outgoing state.

### Full encounter root census

For every accepted time cell through the encounter, record:

1. both ordered partner bundles $\mathcal Z_{12}$ and $\mathcal Z_{21}$;
2. both positive-delay self bundles $\mathcal Z_{11}$ and $\mathcal Z_{22}$, plus both structural diagonal boundary carriers under the frozen quarantine;
3. every simple-root branch, multiplicity, $D_t$ sign and floor, $D_r/D_t$ playback row, and acceleration weight;
4. every fold birth or death, higher singularity, memory-edge crossing, core contact, and terminal-boundary crossing;
5. the unique owner and signed boundary flux for every event; and
6. inactive-complement certificates proving that no additional root was omitted.

The census must report whether either history crosses $c_f$, whether multiple-root or fold regimes occur, and whether any self root becomes admissible. Crossing $c_f$ is a warning observable, not by itself a root event or a conservation verdict.

Plainly: every arriving partner or self contribution stays visible from the initial history through the terminal classification, including roots created or removed during the encounter.

### Incoming/outgoing observable

At a matched outbound crossing, define the kinematic comparison

$$
\Delta u_\Lambda
=
\dot R(T_+)-\bigl(-\dot R(T_-)\bigr).
$$

The labels are:

| Observation | Kinematic label only |
| --- | --- |
| $\Delta u_\Lambda=0$ within independently fixed enclosure | `matched_speed` |
| $\Delta u_\Lambda<0$ | `damping_like` |
| $\Delta u_\Lambda>0$ | `growth_like` |
| no $T_+$ | use the terminal classification rather than inventing an outgoing comparison |

These labels do not establish gain or loss of a conserved account. They become an account comparison only after predeclared maps supply

$$
\Delta L_{\mathcal A,\Lambda}
+
\Phi_{\mathcal A,\partial,\Lambda}
$$

on the same root census and retained boundary record. The acceptance observable is the tuple

$$
\mathcal O_\Lambda
=
\left(
\Delta u_\Lambda,\,
\Delta\mathfrak R_\Lambda,\,
\Phi_{\mathrm{root},\partial,\Lambda},\,
\Delta L_{\mathcal A,\Lambda}
+\Phi_{\mathcal A,\partial,\Lambda}
\right),
$$

where $\Delta\mathfrak R_\Lambda$ is the change in the canonical root-ledger signature between the matched comparison surfaces and $\Phi_{\mathrm{root},\partial,\Lambda}$ is the complete signed root-boundary flux through the encounter slab.

Unavailable account fields are reported as `not_derived`, never filled by the negative of the kinematic residual.

Plainly: returning to the same large separation with the same relative speed is a sharp symmetry check. It is not an energy theorem until the wake and boundary accounts have been independently defined and counted.

### Existing energy-counting boundary

The corpus does not license inserting an instantaneous pair potential or a quadratic single-Architrino kinetic formula into this control. The live energy chapter leaves the primitive kinetic scalar $K(s)$ as a scaffold to be fixed, requires the history-aware interaction and wake record, and imposes this anti-double-count rule:

- either $E_{\mathrm{wake}}$ carries all interaction content; or
- an effective $U_{\mathrm{int}}$ may be shown separately only when the corresponding near-field content is explicitly removed from $E_{\mathrm{wake}}$ on the same finite window.

Plainly: one interaction contribution may be counted in the wake column or in a separately exposed near-field column, but never in both.

Its binding-energy zero at an inner turning point is available only for an accepted bound branch. MEC-005 has no such branch, so the finite $R_\Lambda$ crossing is a comparison surface, not a potential-energy zero.

Therefore the first control may report positions, velocities, root rows, acceleration rows, impulses, and boundary flux classifications. It may report potential or kinetic energy only after citing one accepted counting convention, one fixed history window, one interaction/wake partition, and independently derived maps valid for this encounter.

### Regulated asymptotic test

One finite $R_\Lambda$ run is only a bounded control. An asymptotic statement requires a predeclared sequence $R_{\Lambda,1}<R_{\Lambda,2}<\cdots$, matching incoming data and history conventions, and convergence of $\mathcal O_{\Lambda,k}$ under increasing separation and memory depth. A failure to converge, a changing root inventory at the comparison surface, or unbounded boundary flux falsifies the proposed asymptotic account.

## Dependency And Promotion Boundary

MEC-005 is a necessary design dependency for MEC-004 because conserved-account maps cannot be audited if roots, multiplicities, emission provenance, and boundary ownership can be duplicated or omitted. It is not sufficient for MEC-004: the Architrino-native motion, wake, and boundary maps must still be derived on the MEC-002 update and checked independently.

MEC-006 is the acceleration-gradient companion to this topology packet. MEC-005 decides which regular and singular rows exist and who owns them; MEC-006 decides whether the derivative of each admitted regular acceleration row is complete and where the self/diagonal formula stops. The regular partner-root derivative is now independently verified on its declared open domain.

Completed MEC-007 is the mirror close-approach boundary companion. It owns the stationary-mirror first-boundary theorem, admissible-history first-exit ordering, independently checked pre-boundary root and measure ledger, exact same-event exclusion, and unchanged-law post-threshold obstruction. It does not own root provenance, choose a boundary law, or provide an account map. MEC-005's symmetric two-body control remains kinematic-only until the relevant MEC-006 derivative disposition, a separately accepted MEC-002/MEC-003 boundary update, and separate account maps are accepted for the exact rows consumed.

No MEC-006 derivative choice or MEC-007 encounter result can fill an MEC-004 row by itself. If a boundary update is later accepted, MEC-004 must derive its signed maps on exactly that update and MEC-005 must attribute each resulting boundary row once. A residual or a duplicated incident-root entry is not a signed-map derivation.

Many-body superposition may be considered only after the pairwise construction passes P1–P6 for all four ordered bundles with positive-delay self-root admission and separately quarantined diagonal semantics. A many-body sum must then prove that shared emission provenance and shared boundary events are not copied across pair bundles. Pairwise closure cannot be inferred from a many-body residual that cancels only after aggregation.

This packet is `priority-only`. Its intended corpus destination is the Master Equation accounting discussion only after a theorem-grade pairwise result and an independently derived account map exist.
