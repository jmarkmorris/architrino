# Pairwise Causal-Root Ledger Closure Proof Design

## Status

- Kind: `priority`
- Queue item: `MEC-005`
- Claim level: `priority-only proof design`
- Workstream: [master-equation-closure](priorities.md)
- Topology owner:
  [topological-causal-root-ledger-proof-target](topological-causal-root-ledger-proof-target.md)
- Discussion inputs:
  [topological causal-root ledger capture](brainstorming.md#topological-causal-root-ledger-discussion-capture-2026-06-29)
  and
  [universal conservation ledger capture](brainstorming.md#universal-conservation-ledger-discussion-capture-2026-07-10)
- Routed research input:
  [wake reception, transfer, and maturity](../../research-office/research-lead/review-packets/terence-tao-wake-reception-transfer-and-maturity-2026-07-28.md)
  requires MEC-005 provenance before its cumulative-extraction and angular-pin
  account tests can run; it supplies no account values or conservation claim.
- Promotion status: not promoted

## Closure Question

Begin with exactly two Architrinos whose complete history inputs are declared on
a bounded absolute-time slab. Treat each ordered receiver-transmitter pair as
its own causal-root bundle, retain multiple roots and folds, and declare the
self-pair convention separately. Determine whether the resulting root set
admits a finite, provenance-complete, signed, non-duplicated accounting
description.

This is a proof-design question, not a conservation theorem. A finite signed
root ledger would establish only that the causal-root geometry can be
enumerated and attributed without double booking under its declared
assumptions. It would not derive the values carried by debit, credit, wake, or
boundary maps.

Plainly: the first target is a trustworthy index of who can receive which
emission history, including folds and boundary events. It is not yet a proof
that any physical quantity is conserved.

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

The Master Equation and the EOM solver are possible downstream consumers of an
accepted pairwise ledger. Neither is an assumption, oracle, or source of
topological authority for this packet.

## Declared Two-Architrino Domain

Set $c_f=1$. Let the two declared histories be

$$
\mathbf x_a\colon [S_0,T_1]\longrightarrow\mathbb R^3,
\qquad
a\in\{1,2\},
$$

with receiver times $T\in[T_0,T_1]$ and retained emission times
$s\in[S_0,S_1]$, where $S_1<T_0$. For ordered receiver $i$ and transmitter
$j$, define

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
(T,s)\in[T_0,T_1]\times[S_0,S_1]:
G_{ij}(T,s)=0
\right\}.
$$

Plainly: $\mathcal Z_{12}$ and $\mathcal Z_{21}$ are different ledgers because
they reverse receiver and transmitter. A root in one must never be silently
reused as a root in the other.

The cross-pair domain is

$$
\mathcal Z_{\mathrm{cross}}
=
\mathcal Z_{12}\sqcup\mathcal Z_{21}.
$$

The self-pair domain is declared independently:

$$
\mathcal Z_{\mathrm{self}}^{(\chi)}
=
\begin{cases}
\varnothing,
& \chi=\texttt{excluded},\\[4pt]
\mathcal Z_{11}^{(\epsilon_c)}
\sqcup
\mathcal Z_{22}^{(\epsilon_c)},
& \chi=\texttt{core\_declared},
\end{cases}
$$

where `core_declared` must exclude the trivial diagonal $s=T$ with a fixed
core or diagonal convention $\epsilon_c$ before roots are enumerated. MEC-005
does not permit a mixed packet in which self roots are included opportunistically.

Plainly: partner contact does not prove self-contact. A topology-only negative
control may exclude self-pairs, but the dynamical encounter must use the
declared model convention and enumerate every self root that convention admits.

## What Counts As One Ledger Row

A numerical root sample is not itself a durable ledger row. On the bounded
slab, one row is a connected regular root stratum together with its incident
fold or boundary events. A canonical row key has the form

$$
\rho
=
\left(
\mathsf H,\,
i\leftarrow j,\,
\beta,\,
\mu,\,
\chi,\,
\omega,\,
\mathsf B
\right),
$$

where:

- $\mathsf H$ identifies the exact two-history input and retained slab;
- $i\leftarrow j$ is the ordered receiver-transmitter owner;
- $\beta$ is the connected root-stratum identifier;
- $\mu$ is the declared local multiplicity;
- $\chi$ is the self-pair convention;
- $\omega$ is the winding owner when a torus lift is used and is `none` in the
  Euclidean first control; and
- $\mathsf B$ identifies the independently checkable root bracket, inactive
  complement, and boundary-event record.

Plainly: repeated samples along the same root branch are evidence about one
row, not new rows. Reversing the ordered pair, changing the history, or crossing
a genuine fold creates different provenance.

## Assumption Ledger

| Obligation | Minimum assumption needed before a proof attempt | Failure disposition |
| --- | --- | --- |
| Root enumeration | Each $G_{ij}$ is continuous on a compact slab and belongs to a declared tame class, such as piecewise polynomial, semialgebraic, or real analytic with a finite stratification and no zero component on which $G_{ij}$ vanishes identically. | `root_enumeration_not_finite` |
| Completeness | An independently checkable active-root isolation covers every zero, and the complementary cells have certified nonzero gaps. | `root_row_omitted` |
| Root birth/death | Regular strata meet only finitely many declared endpoint, memory-edge, core, seam, or finite-order singular events; an ordinary fold has local multiplicity two. | `boundary_flux_unclassified` |
| Attribution | Every stratum and event names one history record, one ordered-pair owner, one emission coordinate, one receiver coordinate, and one root or boundary certificate. | `root_provenance_incomplete` |
| Signed maps | Debit, credit, and boundary map domains, codomains, signs, and allowed inputs are frozen before evaluating a balance; no map may be defined from the residual it is intended to close. | `signed_map_residual_defined` |
| Multiplicity | Local multiplicity is obtained from a declared factorization, intersection number, or separately checked derivative hierarchy; a tangent root is not duplicated merely because a numerical solver returns two brackets. | `root_multiplicity_unowned` |
| Self-interactions | The packet declares either `excluded` or one fixed diagonal/core convention; partner-pair lemmas are not reused as self-hit proofs. | `self_pair_convention_mixed` |
| Finiteness | The stratified root set has finitely many connected regular cells and finitely many incident event cells on the compact slab. Compactness without tameness is insufficient. | `root_accumulation_or_interval` |
| No double booking | Canonicalization maps every physical root stratum and every boundary event to exactly one row key; emission provenance and reception roots are indexed separately. | `duplicate_or_replayed_entry` |

Plainly: smooth bounded histories are not enough. A smooth function can have
infinitely many zeros accumulating inside a compact interval, so the allowed
history class or an equivalent finite-stratification certificate must rule that
out.

## Oriented Root And Boundary Accounting

At a simple root, define the topology-only orientation

$$
\varepsilon(\rho)
=
\operatorname{sgn}\!\left(\partial_sG_{ij}(T,s)\right).
$$

For an ordinary fold, the two incident simple branches must have opposite
orientations. Their birth or death therefore changes the unsigned slice count
by two while leaving the local algebraic count unchanged. Memory-edge,
endpoint, core, and seam crossings instead require explicit boundary-flux
rows.

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

where $\mathcal C_1$ is the finite set of regular root cells,
$\mathcal C_0$ is the finite set of fold and boundary-event cells,
$\partial_{\mathrm{root}}$ records their incidence, `owner` assigns each cell
to exactly one ordered bundle, and `mult` records local multiplicity.

Plainly: opposite signs at a fold can explain why two root branches appear
together without creating an unowned topological remainder. They do not say
that energy, momentum, angular momentum, or any other physical account closes.

Higher-order tangencies, intersecting fold strata, root intervals, or
accumulating roots are not silently decomposed into ordinary folds. They stop
the proof until a separately justified singular chart and multiplicity rule is
supplied.

## Debit, Credit, And Provenance Maps

Let $\mathcal E$ be the finite set of emission-provenance cells represented in
the bounded packet, $\mathcal R$ the finite set of reception-root cells, and
$\mathcal B$ the finite set of boundary-event cells. The provenance map

$$
p\colon\mathcal R\longrightarrow\mathcal E
$$

need not be injective: more than one reception-root cell may refer to the same
emission-provenance cell. That many-to-one relation must not cause the
source-side row to be copied once per reception.

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

Here $\mathcal A$ is only an unspecified algebraic codomain used to state the
proof burden. MEC-005 does not choose its physical representation, its
capacity, or the values of $D$, $C$, and $F$, and it does not assert
$\mathfrak B_{\mathcal A}=0$.

Plainly: this formula states where independently derived entries would have to
go. It deliberately leaves blank what each entry carries and whether the total
vanishes.

The universal-ledger discussion forbids a settlement-pair shortcut. Emission
provenance is past-anchored, future receptions are contingent, and one emitted
isochron is not consumed by one reception. Therefore:

1. $D(e)$ is evaluated once for an emission-provenance cell, not once for every
   $\rho$ with $p(\rho)=e$.
2. $C(\rho)$ is evaluated once for its canonical reception-root row.
3. $F(b)$ is evaluated once by the unique owner of the fold, memory, core,
   endpoint, or seam event.
4. Equality between a source debit and a later receiver credit is not assumed;
   it is part of a future wake-state and account derivation.
5. Any continuously emitted record that cannot be represented by finitely many
   provenance cells on the slab defeats finite ledger closure or requires a
   separately selected measure-valued account representation.

## Candidate Proof Sequence

### P1 — Finite ordered-bundle stratification

Prove that the declared tame history class gives each $\mathcal Z_{ij}$ a
finite stratification into regular one-dimensional cells and finitely many
zero-dimensional fold or boundary cells.

Falsifier: one admissible history produces a root interval, an interior
accumulation of isolated roots, or infinitely many connected root cells.

### P2 — Complete root enumeration

Construct an active-root isolation and inactive-complement certificate for
every ordered bundle. Check it against an independently authored exact,
interval, or theorem-based enumerator.

Falsifier: the independent instrument finds an unlisted root or shows that two
listed rows are the same root stratum.

### P3 — Boundary-flux identity

Prove that slice-count changes arise only from the declared fold, retained-edge,
endpoint, core, or seam event cells, with ordinary folds incident to one
oppositely oriented branch pair.

Falsifier: the unsigned root count changes with no owned event, an ordinary
fold emits unequal orientation, or a root crosses the retained boundary without
a flux row.

### P4 — Provenance and multiplicity uniqueness

Prove that every regular and event cell has one canonical row key and one local
multiplicity, independent of numerical subdivision and refinement.

Falsifier: refinement changes the row count without discovering a genuine new
stratum, or one event receives two owners.

### P5 — Signed-map well-posedness

After $D$, $C$, and $F$ are supplied independently, prove that every declared
map is evaluated exactly once on its own domain and that all sums are finite.

Falsifier: a map reads future receiver history, is defined from
$\mathfrak B_{\mathcal A}$, copies one emission debit across multiple
receptions, omits a boundary owner, or diverges on the bounded packet.

### P6 — Pairwise closure verdict

Only after P1–P5 may a separately authored verifier decide whether
$\mathfrak B_{\mathcal A}=0$ for the declared account maps. A zero result would
be account-specific and slab-specific; it would not establish universal
conservation.

Falsifier: the zero depends on changing a map after seeing the residual, on
discarding a root or boundary row, or on comparing two implementations of the
same accounting path as if they were independent.

## Acceleration-Operator Readiness Gate

No damping, growth, rebound, capture, or incoming/outgoing imbalance may be
interpreted as an account or conservation verdict until the exact acceleration
operator used by the control is identified and checked root by root.

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

The factor $c_f/|D_{t,ij}|$ is the transmitter-side root-Jacobian acceleration
weight. The second ratio is signed root playback; it is not an additional
instantaneous acceleration multiplier.

Plainly: a scalar distance law by itself is not the declared operator. The
operator also needs the arriving direction, the transmitter-side bunching of
causal surfaces, the root identity, and the separately routed playback and
singular-event data.

### Live readiness audit

| Layer | Live status | MEC-005 consequence |
| --- | --- | --- |
| Canonical regular-root acceleration value | **Resolved as a declared target.** The Master Equation derives the arriving spatial normal, inverse-square factor, polarity sign, and $c_f/|D_t|$ transmitter-side root factor, with $D_r/D_t$ retained only for playback. | The symmetric control must bind to this exact row structure rather than to a scalar $1/r$ or unweighted $1/r^2$ surrogate. |
| EOM solver regular-root path | **Implemented for the declared regular rows.** [CoupledEvolution.cpp](../../../src/eom/src/CoupledEvolution.cpp), [JointAccelerationSnapshot.cpp](../../../src/eom/src/JointAccelerationSnapshot.cpp), and [SharpAccelerationSensitivity.cpp](../../../src/eom/src/SharpAccelerationSensitivity.cpp) evaluate the delayed displacement direction, inverse-square vector, transmitter factor, acceleration weight, and root-time/direction/factor sensitivities. | A run packet must expose those per-root fields and prove that the encounter used that path without fallback to a different operator. |
| Complete receiver/self acceleration gradient | **Regular domain independently verified; singular boundary awaiting disposition.** [MEC-006](receiver-wake-gradient-closure.md) now has an independent analytic audit and a separately structured three-dimensional numerical verifier for the fixed-reception regular partner-root tensor. Its positive-delay same-history specialization remains conditional on separation and transmitter-factor floors. No unique self-diagonal, fold, or coincident-birth prescription follows from the regular mathematics. | The kinematic control may consume accepted regular rows only. Every excluded boundary row remains unresolved. A two-body conservation interpretation remains gated on an accepted self-compatible MEC-006 disposition and the separate same-update account derivation. |
| Self-pair acceleration | **Declared but conditional.** A nontrivial same-transmitter root needs the diagonal exclusion or core convention, complete self-root census, separation and $D_t$ control, finite memory, and a singular-event route when a fold is reached. | The encounter cannot exclude self rows after the trajectory enters a regime in which the declared self rule admits them. |
| Pure scalar $1/r$ action route | **Established incomplete.** The live Master Equation records an uncancelled receiver-variation interior derivative and an unclosed derivation of the transmitter-side weight. | Agreement with a scalar action diagnostic cannot establish acceleration-operator or conservation readiness. |
| Characteristic-tail action candidate | **Awaiting verification.** The cross-pair receiver-gradient identity survives, but the complete self-diagonal functional remains inadmissible under its frozen convention. | It cannot yet supply the encounter's conserved account or boundary charge. |
| Circular growth statement | **Derived diagnostic, not an evolved conservation result.** The principal partner branch on the declared symmetric circular chart has forward tangential acceleration and is anti-damped; complete simple-root algebraic balance points do not certify a retained branch. | The concern that a current growth result came from an omitted full wake gradient is not established for the canonical acceleration operator. Whether a complete action/account operator reproduces the same result remains unresolved. |

Plainly: the regular acceleration law already contains more than a scalar
distance factor. What remains open is whether one complete action and wake
account derives that same operator, including its self and boundary rows.

### Readiness acceptance

The gate passes for a kinematic encounter only if:

1. every partner and admitted self root names its exact displacement,
   separation, line of action, polarity sign, $D_t$, $D_r$, acceleration
   weight, multiplicity, and boundary status;
2. the evaluated acceleration equals the declared vector operator on every
   regular row;
3. any root sensitivity used by an implicit or joint evolution differentiates
   emission time, line of action, inverse-square factor, and $D_t$ on the same
   history record;
4. folds, coincident births, core contacts, and root accumulations use their
   declared non-regular routes rather than the simple-root formula;
5. the self rule is frozen before evolution and is applied whenever its
   admissibility conditions fire; and
6. an independently authored oracle checks at least the regular partner row,
   one admitted self row if present, and one fold or boundary negative control.

The gate passes for a conservation interpretation only after the stronger
condition also holds: the same accepted action or causal-wake update derives
the acceleration operator, signed account maps, and all encounter-boundary
fluxes without residual-defined cancellation. That stronger condition is not
currently met. It is also gated on an independently accepted MEC-006
receiver/self gradient disposition, because an undeclared near-diagonal
sensitivity cannot be hidden inside the two-body account residual. These
requirements must be met before either the collinear encounter below or a
symmetric circular control can carry a conservation interpretation.

Falsifiers include a run row using $1/r$ as acceleration, omitting
$c_f/|D_t|$, multiplying by $D_r/D_t$ as instantaneous strength, evaluating
only one of multiple active roots, dropping an admitted self root, or assigning
an unowned finite value at a singular root.

### MEC-006 singular-boundary intake rule

The MEC-006 boundary-option matrix does not authorize a new MEC-005
self-pair convention. Until one option is explicitly accepted, the ledger must
retain:

1. each incident regular root stratum with its existing ordered-pair identity;
2. one distinct unresolved boundary-event cell;
3. the self-pair convention that was frozen before enumeration; and
4. `not_derived` for every boundary acceleration-gradient or signed-account
   field.

A later core, smoothing profile, event map, distributional term, or
counterterm must receive one new boundary owner and may not also be copied
into each incident root row. Branch selection may not erase an admitted
simple-root row under the unchanged canonical acceleration operator.

Plainly: a fold has two incident root histories and one boundary event. The
ledger must show all three without counting the event twice or disguising an
unresolved value as zero.

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

Set $c_f=1$. Choose a large finite comparison separation
$R_\Lambda=2x(T_-)$ as a regulated proxy for asymptotic separation, a closing
relative speed $u_{\mathrm{in}}\in(0,2)$, and a finite retained-history depth
$H_\Lambda$ long enough to certify the complete initial root census. On the
input-history interval $[T_--H_\Lambda,T_-]$, use the mirror-symmetric affine
prehistory

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

Each initial Architrino speed is below $c_f$, so the affine prehistory supplies
no nontrivial self root. The evolution must not assume a breather, periodic
return, rebound, or eventual departure. For the evolved interval,
`self_pair_convention = excluded` is not an admissible shortcut when the
declared acceleration law permits nontrivial self roots.

Plainly: the control starts with two widely separated opposite polarities
moving directly toward one another. “Asymptotic” means a sequence of larger
finite comparison radii, not an initial condition placed at infinity.

### Encounter interval and terminal classifications

Evolve from $T_-$ with the readiness-gated acceleration operator until the
first applicable terminal condition:

| Outcome | Exact condition |
| --- | --- |
| `outbound_crossing` | A first $T_+>T_-$ exists with $R(T_+)=R_\Lambda$ and $\dot R(T_+)>0$. |
| `captured_or_bounded_on_window` | No outbound crossing occurs before the predeclared terminal time, while separation and the complete root ledger remain bounded. |
| `core_or_coincident_boundary` | The declared core or coincident-root boundary is reached without an accepted continuation. |
| `root_census_incomplete` | An active, inactive, self, fold, or boundary row cannot be certified. |
| `acceleration_operator_not_ready` | The run cannot prove that every admitted root used the declared full operator. |
| `unbounded_or_unresolved` | The retained window, speed, root multiplicity, acceleration impulse, or numerical enclosure loses its declared bound. |

Plainly: this classification prevents a failed or non-returning encounter from
being discarded merely because it does not resemble the desired outgoing
state.

### Full encounter root census

For every accepted time cell through the encounter, record:

1. both ordered partner bundles $\mathcal Z_{12}$ and $\mathcal Z_{21}$;
2. both self bundles under the frozen self convention;
3. every simple-root branch, multiplicity, $D_t$ sign and floor, $D_r/D_t$
   playback row, and acceleration weight;
4. every fold birth or death, higher singularity, memory-edge crossing, core
   contact, and terminal-boundary crossing;
5. the unique owner and signed boundary flux for every event; and
6. inactive-complement certificates proving that no additional root was
   omitted.

The census must report whether either history crosses $c_f$, whether
multiple-root or fold regimes occur, and whether any self root becomes
admissible. Crossing $c_f$ is a warning observable, not by itself a root event
or a conservation verdict.

Plainly: every arriving partner or self contribution stays visible from the
initial history through the terminal classification, including roots created
or removed during the encounter.

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

These labels do not establish gain or loss of a conserved account. They become
an account comparison only after predeclared maps supply

$$
\Delta L_{\mathcal A,\Lambda}
+
\Phi_{\mathcal A,\partial,\Lambda}
$$

on the same root census and retained boundary record. The acceptance observable
is the tuple

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

where $\Delta\mathfrak R_\Lambda$ is the change in the canonical root-ledger
signature between the matched comparison surfaces and
$\Phi_{\mathrm{root},\partial,\Lambda}$ is the complete signed root-boundary
flux through the encounter slab.

Unavailable account fields are reported as `not_derived`, never filled by the
negative of the kinematic residual.

Plainly: returning to the same large separation with the same relative speed is
a sharp symmetry check. It is not an energy theorem until the wake and boundary
accounts have been independently defined and counted.

### Existing energy-counting boundary

The corpus does not license inserting an instantaneous pair potential or a
quadratic single-Architrino kinetic formula into this control. The live energy
chapter leaves the primitive kinetic scalar $K(s)$ as a scaffold to be fixed,
requires the history-aware interaction and wake record, and imposes this
anti-double-count rule:

- either $E_{\mathrm{wake}}$ carries all interaction content; or
- an effective $U_{\mathrm{int}}$ may be shown separately only when the
  corresponding near-field content is explicitly removed from
  $E_{\mathrm{wake}}$ on the same finite window.

Plainly: one interaction contribution may be counted in the wake column or in
a separately exposed near-field column, but never in both.

Its binding-energy zero at an inner turning point is available only for an
accepted bound branch. MEC-005 has no such branch, so the finite
$R_\Lambda$ crossing is a comparison surface, not a potential-energy zero.

Therefore the first control may report positions, velocities, root rows,
acceleration rows, impulses, and boundary flux classifications. It may report
potential or kinetic energy only after citing one accepted counting convention,
one fixed history window, one interaction/wake partition, and independently
derived maps valid for this encounter.

### Regulated asymptotic test

One finite $R_\Lambda$ run is only a bounded control. An asymptotic statement
requires a predeclared sequence $R_{\Lambda,1}<R_{\Lambda,2}<\cdots$, matching
incoming data and history conventions, and convergence of
$\mathcal O_{\Lambda,k}$ under increasing separation and memory depth. A
failure to converge, a changing root inventory at the comparison surface, or
unbounded boundary flux falsifies the proposed asymptotic account.

## Dependency And Promotion Boundary

MEC-005 is a necessary design dependency for MEC-004 because conserved-account
maps cannot be audited if roots, multiplicities, emission provenance, and
boundary ownership can be duplicated or omitted. It is not sufficient for
MEC-004: the Architrino-native motion, wake, and boundary maps must still be
derived on the MEC-002 update and checked independently.

MEC-006 is the acceleration-gradient companion to this topology packet.
MEC-005 decides which regular and singular rows exist and who owns them;
MEC-006 decides whether the derivative of each admitted regular acceleration
row is complete and where the self/diagonal formula stops. The regular
partner-root derivative is now independently verified on its declared open
domain. MEC-005's symmetric two-body control remains kinematic-only until
MEC-006 receives an accepted singular-boundary disposition and the separate
account maps close.

No MEC-006 boundary choice can fill an MEC-004 row by itself. If a boundary
update is later accepted, MEC-004 must derive its signed maps on exactly that
update and MEC-005 must attribute each resulting boundary row once. A residual
or a duplicated incident-root entry is not a signed-map derivation.

Many-body superposition may be considered only after the pairwise construction
passes P1–P6 for both ordered cross-pairs and the separately declared self-pair
convention. A many-body sum must then prove that shared emission provenance and
shared boundary events are not copied across pair bundles. Pairwise closure
cannot be inferred from a many-body residual that cancels only after
aggregation.

This packet is `priority-only`. Its intended corpus destination is the Master
Equation accounting discussion only after a theorem-grade pairwise result and
an independently derived account map exist.
