# Research findings

- Date: 2026-07-29
- Artifact type: independent Council synthesis and implementation-ready
  certificate target
- Scope: exactly two persistent opposite-polarity Architrino histories and the
  four ordered bundles \(1\leftarrow1\), \(1\leftarrow2\),
  \(2\leftarrow1\), and \(2\leftarrow2\)
- Claim level: research guidance and a proposed MEC-005 topology/provenance
  sub-obligation
- Authority: no conservation, action, physical boundary law, continuation,
  retained branch, MEC-006 closure, or solver acceptance
- Live owners:
  [MEC-005 work-queue row](../../../priorities/master-equation-closure/work-queue.md#mec-005--pairwise-causal-root-ledger-closure),
  [pairwise proof design](../../../priorities/master-equation-closure/pairwise-causal-root-ledger-closure.md),
  [topological proof target](../../../priorities/master-equation-closure/topological-causal-root-ledger-proof-target.md),
  [EOM evolution contract](../../../priorities/app-solver/contracts/evolution-contract-v1.md),
  and
  [independent dynamical oracle](../../../priorities/app-solver/contracts/independent-dynamical-acceptance-oracle.md)

The five independent reports agree on the smallest useful object. MEC-005 does
not need another causal-root finder. It needs one proof-carrying,
prescription-neutral ownership and quarantine envelope around the existing
per-reception root-completeness records and event-free reception-slab root
tubes.

The existing oracle already supplies exact history digests, root brackets,
root-free cells, unresolved cells, retained-history contact, transmitter-factor
enclosures, precision and resource provenance, and persistent simple-root tubes
on event-free slabs. Those are reusable leaf certificates. They do not supply a
full two-history cell complex with first-class event identities, local
multiplicity, half-branch incidence, refinement-invariant ownership, or
MEC-006-independent boundary quarantine.

Plainly: the current instruments can prove many individual roots and simple
root tubes. The missing certificate says how every root, event, excluded face,
and unresolved boundary fits into one non-duplicated four-bundle ledger.

## Reconciled full-domain requirement

For a receiver slab \(I=[T_0,T_1]\) and one declared retained-history lower
rule \(L(T)<T\), the full search domain is the closure

$$
\mathcal D
=
\left\{
(T,s):
T\in I,\,
L(T)\le s\le T
\right\}.
$$

Admitted delayed roots lie in the strict causal interior \(L(T)<s<T\).
The face \(s=L(T)\) is a retained-history boundary, while \(s=T\) is the
diagonal closure face. A fixed rectangle with \(S_1<T_0\) remains a valid
old-prehistory subdomain, but it cannot by itself certify emissions produced
during the receiver slab or a root attaching to the diagonal. A full ledger
must cover \(\mathcal D\) directly or prove that its declared cells form an
exact partition of \(\mathcal D\).

Plainly: the certificate must search the whole causal triangle used by the
declared histories. A prehistory rectangle is not enough when later emissions
or diagonal attachments are part of the question.

The full certificate requires both ordered partner bundles and both ordered
self bundles. Positive-delay self roots are enumerated under the same root
equation as partner roots. The structural self diagonal
\(G_{ii}(T,T)=0\) is a boundary carrier, not an infinite family of active
roots, not an empty set, and not a zero-valued contribution.

This exposes one live proof-design gap. The current pairwise packet asks for
either `excluded` or `core_declared` before self-root enumeration. That binary
is too coarse for a certificate that must be independent of MEC-006. The
topology/provenance layer instead needs two separate declarations:

- `self_root_admission: all_positive_delay_roots`; and
- `diagonal_boundary_semantics: quarantined_unresolved`.

This separation is a proposed refinement to the MEC-005 proof design, not an
accepted diagonal prescription. It selects which roots must be counted while
selecting no acceleration, gradient, account value, finite part, core,
smoothing profile, event map, or outgoing history.

## Minimum stratification

The ledger is a finite incidence complex with these minimum strata:

| Class | Required distinction | Minimum evidence |
| --- | --- | --- |
| Regular partner root | Connected positive-delay component in \(i\ne j\) bundle | Root tube, positive delayed range and history margin, \(\partial_sG\) bounded away from zero, multiplicity one, orientation, and root-free local complement |
| Regular self root | Connected positive-delay component in \(i=j\) bundle | Same evidence as a partner root; the diagonal does not authorize deletion |
| Ordinary fold | Interior \(G=\partial_sG=0\) with the fold nondegeneracy and transverse-crossing conditions | One event row, local multiplicity two, exactly two incident simple-root germs, opposite orientations, and signed count change zero |
| Higher or simultaneous singularity | Cusp, higher tangency, fold plus edge, multiple-germ degeneracy, root interval, or accumulation | Separately certified singular chart or exact unresolved topology row |
| Structural self diagonal | The carrier \(s=T\) in a self bundle | Boundary-carrier row with structural multiplicity marked not applicable |
| Diagonal attachment or coincident same-transmitter birth | Positive-delay self stratum meets the diagonal | One event row, all incident roots preserved, boundary semantics quarantined |
| Partner same-event contact or present-coordinate coincidence | Current geometric event, distinct from a delayed root unless the root equation also holds | Separate event identity and explicit incidence |
| Retained-history edge | Root meets \(s=L(T)\) | Restricted root enclosure, entry/exit orientation when certified, and one event owner |
| Slab, representation, or seam edge | Receiver endpoint, history-segment compatibility break, or winding/seam transfer | Typed event row and exact owner |

Receiver-side playback turns with \(D_r=0\) are not root-count events when
\(D_t\ne0\). A branch coincidence preserves each independently certified germ;
coordinate equality does not authorize numerical deduplication. Root intervals,
interior accumulation, or infinitely many connected cells falsify the proposed
finite ledger unless a separately certified representation handles them.

Plainly: regular roots are edges in the incidence complex. Folds, diagonal
attachments, history exits, and terminal cuts are nodes. The diagonal is a
boundary carrier. None of those topology labels decides what acceleration or
continuation a boundary has.

## Two kinds of unresolved state

The synthesis distinguishes two states that must not share one status token:

1. An `unresolved_search_cell` means root location, exclusion, singular type,
   multiplicity, incidence, or ownership is not certified. It makes the
   topology/provenance result `Verification incomplete` and `Not advanced`.
2. A `quarantined_unresolved` boundary-semantic row has certified geometry,
   multiplicity, incidence, and ownership, but no accepted acceleration,
   gradient, continuation, or signed-account value. It may coexist with a
   topology/provenance result of `Verification passed` and `Advanced`, while
   that boundary row and every downstream consumer remain `Not advanced`.

Overall MEC-005 remains `Queued`. Its current completion also requires
acceleration-operator rows, boundary flux, and the matched incoming/outgoing
observable. A topology/provenance certificate satisfies only a proposed named
sub-obligation.

Plainly: unknown topology blocks the census. Known topology with an unknown
boundary law can be honestly inventoried, but nothing may consume that boundary
as if its value were known.

## Existing evidence boundary

The live code emits
`eom_root_completeness_certificate/v1` and
`eom_root_continuation_certificate/v1`. The independent-oracle owner still
describes the root-completeness record as `/v0`, so an implementation must bind
to the code-emitted schema and digest or first reconcile that documentation
drift.

The live root-completeness record may report
`root_free_complement=true` while carrying the structural diagonal only as
`coincident_endpoint_excluded=true`. The live slab record routes an event as a
receiver, transmitter, and reason tuple. Those are valid records under the
frozen EOM binding, but neither is sufficient evidence that the corresponding
MEC-005 boundary carrier or event has a unique identity, multiplicity,
incidence graph, and quarantine disposition.

The current finite-width fold route is a downstream EOM treatment. MEC-005 may
use its event detection as evidence, but the finite-width impulse cannot become
topology authority or a default boundary prescription.

# Proposed changes

## Certificate schema

Create one schema target:
`mec005_two_history_causal_root_ledger_certificate/v1`.
It is a thin envelope with these record groups:

```text
mec005_two_history_causal_root_ledger_certificate/v1
  scope
  histories[2]
  ordered_bundles[4]
  coverage_cells[]
  root_strata[]
  boundary_strata[]
  incidence[]
  emission_provenance_cells[]
  ownership_index
  independent_verification
  verdict
```

Plainly: the envelope references existing numerical root evidence. Its new
content is the full-domain partition, stable cell identities, event incidence,
unique ownership, and explicit quarantine.

### `scope` and `histories[2]`

Require:

- literal claim scope
  `pairwise_root_ledger_topology_and_provenance_only`;
- `schema_version`, certificate ID, input digest, producer ID and version;
- exactly two persistent Architrino labels, opposite polarities, exact history
  IDs and content digests;
- \(c_f=1\) as an exact token;
- receiver slab, retained-history rule \(L(T)\), exact domain cells, and
  strict-delay admission \(s<T\);
- history representation, segment partition, reconstruction-error bounds,
  arithmetic representation, and regularity/tameness certificate;
- `self_root_admission: all_positive_delay_roots`;
- `diagonal_boundary_semantics: quarantined_unresolved`; and
- an explicit nonclaims list covering conservation, action, continuation,
  physical boundary values, MEC-006 closure, retained branches, and solver
  acceptance.

The base executable history class may reuse the current exact-decimal,
contiguous piecewise-cubic representation with position and velocity
reconstruction bounds. \(C^1\) data suffice for regular root motion;
an ordinary-fold claim additionally needs the local second-derivative or
factorization evidence that proves its normal-form hypotheses. Smoothness alone
does not prove finite stratification.

### `ordered_bundles[4]` and `coverage_cells[]`

The exact bundle set is

$$
\mathcal P_2
=
\left\{
1\leftarrow1,\,
1\leftarrow2,\,
2\leftarrow1,\,
2\leftarrow2
\right\}.
$$

Each bundle records its receiver and transmitter identities, `partner` or
`self` kind, root-function binding, exact search domain, root-stratum IDs,
boundary-stratum IDs, and referenced leaf certificates.

Each bundle carries an exact partition tree or cell complex. The interiors of
its leaves are disjoint and their union is the declared domain. Each leaf has
exactly one class:

- `root_free`;
- `simple_root_tube`;
- `boundary_stratum`; or
- `unresolved_search_cell`.

A `root_free` leaf requires an interval enclosure excluding zero or a certified
monotonicity and face-sign exclusion. A `simple_root_tube` requires existence
and uniqueness on every receiver fiber, a nonzero
\(\partial_sG\) enclosure, and a root-free local complement. A
`boundary_stratum` references a first-class boundary row. An
`unresolved_search_cell` remains inside the possible-zero cover and blocks the
topology/provenance verdict; it is never counted as empty.

The coverage identity is

$$
\mathcal D_b
=
\bigsqcup_{\ell\in\mathcal L_b}
\mathcal C_\ell,
\qquad
\mathcal Z_b
\subseteq
\mathcal Z_b^{\mathrm{simple}}
\cup
\mathcal Z_b^{\mathrm{boundary}}
\cup
\mathcal Z_b^{\mathrm{unresolved}}.
$$

Plainly: every search-domain point and every possible zero receives one
disposition. An unresolved cell stays visible and prevents a false complete
census.

### `root_strata[]`

Each connected regular root stratum requires:

- a stable content-derived `stratum_id`, not root rank or bracket order alone;
- exact history and ordered-bundle owner;
- `partner` or `positive_delay_self` kind;
- reception base interval and emission-time tube;
- delayed-range, strict-delay, retained-history, inactive-complement, and
  reconstruction-error margins;
- \(\partial_sG\) enclosure and floor;
- local multiplicity, orientation
  \(\operatorname{sgn}(\partial_sG)\), and proof method;
- root-isolation and complement-certificate references with digests;
- incident boundary IDs; and
- refinement correspondence to the same canonical stratum.

Numerical subdivision may create evidence fragments, not new canonical roots.
Refinement must supply a multiplicity-, orientation-, provenance-, and
incidence-preserving bijection after those fragments are collapsed.

### `boundary_strata[]` and `incidence[]`

Each boundary row requires:

- stable `boundary_id`;
- boundary class and scope, `bundle_local` or `shared_geometric_event`;
- exact owner key and every incident bundle;
- location enclosure and active constraints;
- dimension or codimension;
- derivative-rank, interval-Newton/Krawczyk, factorization, or other
  classification proof;
- local multiplicity, or the typed structural value
  `not_applicable_structural_boundary` only where appropriate;
- incident half-branches with root ID, germ ID, side, orientation, and
  incidence coefficient;
- combinatorial root-count flux;
- evidence references; and
- one semantic disposition object.

An ordinary fold passes only when the interval proof certifies
\(G=\partial_sG=0\), the required nondegeneracy and transverse crossing, local
multiplicity two, exactly two incident simple-root germs, and opposite
orientations. If any condition is unavailable, the row is not an ordinary
fold.

Each half-branch appears once in its root closure and once in exactly one event
incidence list. Event payloads are stored once; root rows contain references,
not copies. A shared geometric occurrence may have one ledger-level event group
referenced by several bundle-local cells. Simultaneous but independently
generated ordered-bundle events remain distinct.

Plainly: one fold has two incident branches and one event payload. The branches
stay separate, and the event is not booked twice.

### `emission_provenance_cells[]` and `ownership_index`

Emission provenance and reception roots use separate keys. Multiple reception
strata may reference one emission-provenance cell, but the source row is stored
once and is never replayed once per reception.

The canonical owner key binds:

$$
\left(
\text{history digest},\,
\text{ordered bundle},\,
\text{canonical stratum or event ID},\,
\text{self-admission policy},\,
\text{winding or chart owner}
\right).
$$

The ownership index is injective over canonical root and event cells. Coordinate
equality or shared reception time alone does not merge distinct ordered-bundle
rows. Refinement may not change the canonical owner without a newly certified
stratum.

### Boundary-semantic quarantine

Every certified boundary row has exactly one semantics object.
A resolved object cites its separately accepted prescription. An unresolved
object has exactly this typed shape:

```text
status: quarantined_unresolved
value_status: not_derived
disposition: Not advanced
prescription_ref: absent
consumer_allowed: false
```

The unresolved variant contains no generic numeric `value` field. The schema
must reject zero, `null`, an empty object, an exclusion boolean, an omitted
row, a copied incident-root value, or a residual-defined value as substitutes
for `not_derived`. Acceleration, gradient, continuation, and signed-account
semantics remain separately named unresolved fields.

Plainly: `not_derived` is a positive record of missing authority. It cannot be
encoded as a number that later software might consume.

## Proof obligations and verifier boundary

One separately authored verifier should have a structural stage and an
independent mathematical stage. This avoids creating another production root
engine while keeping schema shape separate from mathematical truth.

The structural stage checks:

1. exactly two opposite-polarity histories, \(c_f=1\), and exactly four
   ordered bundles;
2. digest and reference closure;
3. exact partition-tree coverage and disjoint interiors;
4. unique canonical root and event IDs;
5. reciprocal incidence with every half-branch present exactly once;
6. the ordinary-fold shape;
7. unique root, event, and emission-provenance ownership;
8. refinement correspondence;
9. complete boundary-semantic quarantine; and
10. no numeric, null, empty, excluded, or omitted substitute for
    `not_derived`.

The independent mathematical stage proves or rechecks:

1. finite stratification for the declared history class;
2. root-free complement over the full domain of every ordered bundle;
3. existence, uniqueness, and disjointness of every simple-root tube;
4. local multiplicity, orientation, and singular classification;
5. complete incidence at every boundary cell;
6. invariance of canonical cells under numerical refinement; and
7. the independence and declared reach of every numerical oracle.

The verifier may reuse current code-emitted `/v1` root and slab certificates as
evidence when the producer is independent of that oracle. It must reconstruct
the partition, re-evaluate \(G\), derivatives, signs, and interval predicates
from the raw history coefficients, and must not import the producer's root,
ownership, canonicalization, or expected-output implementation. If the
existing Python oracle produces the packet, a separately authored proof
checker or analytic theorem set must provide the independent side.

Plainly: JSON validation can prove that every required field is present. Only
an independent mathematical check can prove that no root or event is missing.

## Verdict contract

The certificate reports separate verdicts:

| Claim | Verification outcome | Disposition |
| --- | --- | --- |
| Full-domain topology and provenance | `Verification passed` only when every ordered bundle, root, boundary stratum, complement, multiplicity, incidence, owner, refinement bijection, and independent check passes | `Advanced` only for `pairwise_root_ledger_topology_and_provenance_only` |
| Any geometrically unresolved search cell or unsupported incidence/multiplicity | `Verification incomplete` | `Not advanced` |
| A certified boundary with unresolved semantics | `Verification incomplete` for that boundary-semantic row | `Not advanced` for the row and every consumer requiring it |
| Overall MEC-005 | Current broader completion remains unmet | `Queued` |

`consumer_ready` is false at and beyond the earliest receiver projection of a
quarantined boundary. A topology/provenance pass cannot set it true.

## Mandatory negative controls

The verifier must return `Verification incomplete` and `Not advanced` for:

1. an omitted older or second root;
2. \(1\leftarrow2\) reused as \(2\leftarrow1\);
3. a self row omitted, replaced by a partner row, or deleted because the
   diagonal prescription is unknown;
4. one connected stratum split into duplicate canonical rows;
5. one event payload copied into each incident branch;
6. a tangent or higher singularity encoded as ordinary simple roots;
7. a diagonal or coincident boundary represented only by an exclusion boolean,
   empty root list, numeric zero, `null`, or omission;
8. a retained-history edge truncated and called inactive;
9. equal endpoint root counts used to miss an interior fold-pair birth and
   death;
10. a simultaneous fold and history-edge event flattened to one unsupported
    ordinary reason;
11. a root interval, accumulation, or non-tame history admitted as a finite
    ledger;
12. persistent identity changed by rank ordering, row ordering, subdivision,
    or refinement;
13. any undeclared \(s\ge T\) or post-reception history input;
14. a quarantine that disappears under refinement without child proofs; or
15. a verifier sharing producer root/canonicalization code or using
    producer-generated expected outputs.

The master falsifier is any declared domain point that is neither certified
root-free nor covered by a regular, boundary, or unresolved search cell, or
any overlap that lacks explicit incidence.

## Minimal repository change

Add one proposed MEC-005 verifier target to the existing work-queue row. Do not
change MEC-005 status, add a new queue item, implement another root finder,
adopt a self/coincident boundary prescription, or edit reader-facing corpus
prose in this batch.

# Items to disposition into the priorities directory

| Disposition | Live owner | Item |
| --- | --- | --- |
| Promote now as a proposed sub-obligation | MEC-005 work-queue row | Record `mec005_two_history_causal_root_ledger_certificate/v1` and its separately authored verifier as the minimum topology/provenance target; keep MEC-005 `Queued` |
| Promote now as a proof-design correction | MEC-005 pairwise proof design | Separate positive-delay self-root admission from diagonal boundary evaluation; a later integration should replace the `excluded` or `core_declared` enumeration binary with complete positive-delay self enumeration plus explicit diagonal quarantine |
| Promote now as a full-domain correction | MEC-005 pairwise proof design | Treat the causal triangle or an exact partition of it as the full encounter domain; retain the fixed old-prehistory rectangle only as a restricted subdomain |
| Reuse by reference | EOM solver and independent-oracle owners | Reuse `/v1` per-reception root and event-free slab certificates as leaf evidence when their producer is independent; do not create a second root engine |
| Defer with blocker | Full-slab event verifier | Implement first-class boundary identities, interval event predicates, multiplicity, incidence, refinement correspondence, unique ownership, and the negative-control suite without importing producer code |
| Defer with blocker | Higher or simultaneous singularities | Require a separately certified singular chart; otherwise return `Verification incomplete` and `Not advanced` |
| Defer with blocker | Every MEC-006-owned boundary semantic | Keep acceleration, gradient, continuation, and signed-account fields `not_derived`; no boundary value or consumer readiness follows from topology |
| Priority-owner maintenance | Independent dynamical oracle | Reconcile the contract's `/v0` root-completeness label with the live code-emitted and tested `/v1` label before exact schema reuse |
| Reject | MEC-005 implementation | A new production root finder, one-root global assumption, rank-only identity, duplicated event booking, missing-root-as-zero behavior, or same-implementation parity described as independent verification |
| Reject | Theory promotion | Conservation, action, continuation, physical realization, retained-branch, MEC-006 closure, or solver-acceptance claims from this certificate |

Plainly: the immediate priority result is a precise topology/provenance
certificate target. All boundary values stay where they belong: explicitly
quarantined and unavailable to downstream consumers.
