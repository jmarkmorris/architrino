# Topological Causal-Root Ledger Proof Target

## Status

- Kind: `priority`
- Claim level: `priority-only theorem target`
- Workstream: [master-equation-closure](priorities.md)
- Topology layer: EOM-independent priority-only proof program. A chosen EOM may
  consume the retained ledger later, but it is not an input assumption here.
- Downstream corpus destinations if accepted by a future EOM consumer:
  [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md),
  [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md),
  and the relevant branch-certificate packets.
- Promotion status: not promoted. This packet records a candidate proof route and
  working mathematics for discussion and refinement.

## Purpose

This packet captures a topology-oriented proof route suggested by the causal-root
and self-hit discussion. The target is not a new force law and does not assume a
chosen EOM. The immediate target is to decide whether branch admissibility can
be stated as an EOM-independent causal-root ledger condition: the same retained
path-history record must account for causal-root intersections, root-count
changes, boundary strata, and declared same-record routes before any downstream
force, action, wake-history, medium-response, or cross-sector consumer may use
the row.

The proof laboratory is a neutral finite 3-torus
$$
T_L^3=\mathbb{R}^3/(L\mathbb{Z})^3
$$
with periodic boundary conditions. The 3-torus is used as a compact,
boundaryless, flat model. It is not being asserted as physical cosmology.

## Working Thesis

The candidate topological claim is:

> For a declared retained history window on $T_L^3$, causal-hit ledgers are
> stable intersection records. Root counts can change only through declared
> boundary strata: endpoint exclusion, memory-window entry or exit, causal-root
> caustic $J=0$, collision/core regularization, or winding/seam ownership.
> A branch can be offered to any downstream EOM consumer only when those boundary
> strata are absent, paired, or routed into the same retained source record. An
> EOM label, force-law label, or sector-specific residual cannot substitute for
> the retained topological ledger object.

This separates the topology-native rows from the downstream consumer rows:

| Layer | Topological readout |
| --- | --- |
| Topology-native root ledger | Root intersections, winding ownership, Jacobian floors, root-count continuity, and declared boundary strata are recorded without choosing an EOM. |
| Retained branch chart | Simple roots persist as local sections of the root ledger until a declared stratum is reached. |
| Downstream EOM consumer | A force or acceleration row may consume only retained root rows that already carry same-record topology. |
| Action / variational residual | Endpoint and multiplier terms are downstream pullbacks that must reference the same retained source record. |
| Noether wake-history charges | Root births, deaths, and memory-boundary flux become charge-boundary terms only after a same-record event ledger is supplied. |
| Noether sea response | Medium-response rows consume the same retained history, not a separate fit. |
| Cross-sector acceptance | No sector may consume a root ledger whose boundary is unaccounted elsewhere. |

## EOM-Independent Theorem Target

The smallest topology-native theorem target is:

> Given a retained path-history window $W$ on $T_L^3$, with winding-labeled
> causal-root rows and a positive simple-root floor away from declared strata,
> root identities persist under time continuation, and the root count can change
> only at endpoint, memory-window, caustic $J=0$, collision/core, winding/seam,
> or omitted-row boundary strata. A branch is topology-admissible for downstream
> consumption only when every such boundary contribution is absent, paired, or
> routed into the same retained source record.

This theorem target deliberately excludes the choice of acceleration law,
branch-strength law, action functional, medium-response coefficients, or
observer-facing signal speed. Those are downstream consumers. The missing
topology-native proof object is an oriented boundary operator on retained
winding-labeled root rows, plus a same-record routing map that records whether
each boundary contribution is absent, paired, or routed without invoking an EOM
or force-law label.

## EOM Boundary Audit

The current split is:

| Packet item | Current classification |
| --- | --- |
| Causal-root equation $G_{ij,n}(t,s)=0$ | Topology-native retained intersection record. |
| Winding ownership and seam transfer | Topology-native ledger data. |
| Positive $J$ floor away from $J=0$ | Topology-native transversality condition for simple-root persistence. |
| Caustic $J=0$, endpoint, memory-window, collision/core, and omitted-row strata | Topology-native root-count boundary candidates. |
| Force or acceleration row | Downstream EOM consumer; may use only retained topology-native root rows. |
| Action endpoint and multiplier row | Downstream same-record pullback; not part of the topology-only theorem. |
| Noether wake-history charge row | Downstream same-record pullback from declared event ledger rows. |
| Noether sea medium-response row | Downstream same-record pullback from one retained response object. |
| EOM or force-law label | Not admissibility data; fails closed unless the topology-native active root ledger object is present. |
| Branch retention or corpus promotion | Not supplied by this packet; still requires accepted branch evidence from a future downstream consumer. |

## Brainstorming Link 2026-06-29

The source-path, photon speed, and field-speed hinge discussion capture moved to [brainstorming.md](brainstorming.md#topological-causal-root-ledger-discussion-capture-2026-06-29). This proof target keeps the formal topology setup below.

## Torus Root Setup

Represent positions on $T_L^3$ by lifts
$$
\tilde{\mathbf{x}}_a(t)\in\mathbb{R}^3,
\qquad
\mathbf{x}_a(t)=\tilde{\mathbf{x}}_a(t)\bmod L.
$$

For a receiver $i$ at time $t$, source $j$ at emission time $s<t$, and winding
class $n\in\mathbb{Z}^3$, define the lifted causal-root function
$$
G_{ij,n}(t,s)
=
\left\|
\tilde{\mathbf{x}}_i(t)
-
\tilde{\mathbf{x}}_j(s)
-
Ln
\right\|
-
c_f(t-s).
$$

A causal hit is a zero
$$
G_{ij,n}(t,s)=0,
\qquad s<t.
$$

The winding class $n$ records which periodic image of the source wake reaches
the receiver. In a retained packet, $n$ is ledger data, not a coordinate
artifact. If a shorter representative replaces a longer representative across a
periodic seam, the certificate must record whether this is only a relabeling of
the same physical root or a genuine retained-ledger boundary.

The simple-root Jacobian is
$$
J_{ij,n}(t,s)
\equiv
1
-
\frac{
\widehat{\mathbf r}_{ij,n}(t,s)\cdot\mathbf v_j(s)
}{c_f},
$$
where
$$
\widehat{\mathbf r}_{ij,n}(t,s)
=
\frac{
\tilde{\mathbf{x}}_i(t)-\tilde{\mathbf{x}}_j(s)-Ln
}{
\left\|\tilde{\mathbf{x}}_i(t)-\tilde{\mathbf{x}}_j(s)-Ln\right\|
}.
$$

This is a topology-native source-velocity transversality row that any downstream
simple-root EOM consumer must respect. A root with $J_{ij,n}=0$ is a caustic
boundary, not an ordinary simple-root row.

## Candidate Lemma 1: Compact Pair-Contact

Let
$$
D_L=\frac{\sqrt{3}}{2}L
$$
be the diameter of the flat cubic 3-torus. For distinct simultaneous positions
$\mathbf{x}_i(t)\ne\mathbf{x}_j(t)$, define the torus distance
$$
d_L(t,s)=
\min_{n\in\mathbb{Z}^3}
\left\|
\tilde{\mathbf{x}}_i(t)-\tilde{\mathbf{x}}_j(s)-Ln
\right\|.
$$

If the retained history window satisfies
$$
h>\frac{D_L}{c_f},
$$
then the scalar function
$$
H_{ij}(\tau)
=
d_L(t,t-\tau)-c_f\tau,
\qquad
0\le\tau\le h,
$$
has
$$
H_{ij}(0)>0
$$
and
$$
H_{ij}(\tau)<0
\quad
\text{for some }\tau\le h.
$$

Thus, by continuity, at least one pairwise causal root exists inside the
retained window.

### Interpretation

This is the compact-space version of pairwise causal contact. It does not hold
as stated in noncompact Euclidean space. In noncompact space, a source moving
super-field-speed toward a receiver can outrun all prior wakes relevant to that
receiver event, leaving no past emission root. On the compact torus, the
bounded distance supplies a sign change once the memory window is longer than
the torus light-crossing time.

### First Failure Modes

| Failure mode | Meaning |
| --- | --- |
| `memory_window_too_short` | $h\le D_L/c_f$, so the sign-change proof does not fire. |
| `current_coincidence_endpoint_excluded` | $\mathbf{x}_i(t)=\mathbf{x}_j(t)$ makes the endpoint root degenerate and excluded from ordinary branch rows. |
| `root_at_cut_locus_without_winding_owner` | The minimum-distance representative changes but no winding ownership row is supplied. |
| `simple_root_floor_missing` | A root exists but cannot be consumed as an ordinary branch row because $J=0$ or no positive floor is certified. |

## Candidate Lemma 2: Root-Count Stability

On a fixed winding class $n$, suppose
$$
G_{ij,n}(t,s_\ell(t))=0
$$
and
$$
\left|\partial_sG_{ij,n}(t,s_\ell(t))\right|
=
c_f|J_{ij,n}(t,s_\ell(t))|
\ge c_f\nu_J>0
$$
on a time interval. Then the implicit-function theorem gives a continuous
root branch $s_\ell(t)$ over that interval. The root count in the retained
winding class is locally stable.

Root count can change only when one of the following boundaries is reached:

| Boundary stratum | Required route |
| --- | --- |
| Endpoint $s=t$ | Exclude the trivial coincidence or route through the declared core convention. |
| Memory edge $s=t-h$ | Record entry or exit as finite-window wake-history flux. |
| Caustic $J=0$ | Route through finite impulse, branch transition, or fail-closed singular-stratum chart. |
| Collision/core locus | Use the same $\epsilon_c$ convention in root, action, and energy rows. |
| Periodic seam or winding transfer | Record winding ownership or prove it is only representative relabeling. |
| Omitted branch row | Fail closed until the active and inactive root ledgers are complete. |

## Candidate Lemma 3: Self-Hit Is Not Pair-Contact

Self-hit uses the same root topology, but with source identity equal to receiver
identity:
$$
G_{ii,n}(t,s)=0,
\qquad s<t.
$$

The trivial endpoint $s=t$, $n=0$ is excluded. Therefore the compact
pair-contact lemma does not automatically prove self-hit. For small
$\tau=t-s$, the same-transmitter torus distance behaves locally like
$$
d_L(t,t-\tau)
=
\|\mathbf v_i(t)\|\tau+O(\tau^2)
$$
away from seams and nonsmooth path points. Hence
$$
H_{ii}(\tau)
=
d_L(t,t-\tau)-c_f\tau
=
(\|\mathbf v_i(t)\|-c_f)\tau+O(\tau^2).
$$

A strict sub-field-speed interval therefore has no nearby simple self-hit root.
A super-field-speed arc supplies the local sign needed for a candidate
self-hit onset, but a retained branch still must provide the same-transmitter root,
positive transmitter-side Jacobian floor or caustic route, finite transmitter-side acceleration contribution, finite memory, and action/energy
ledger closure.

This keeps the existing distinction intact:

- Self-hit is determined by transmitter identity.
- Multi-hit is determined by root count.
- A partner row can be single-root or multi-root.
- A self row can be single-root or multi-root.

## Candidate Lemma 4: Neutral Torus Inventory

For a finite 50-50 polarity inventory on $T_L^3$,
$$
\sum_a q_a=0,
\qquad
q_a\in\{-\epsilon,+\epsilon\},
$$
the compact box has no spatial boundary and no net primitive polarity. This
does not prove stability, mass, Lorentz behavior, quantum weights, or Noether
sea response. It gives a clean neutral laboratory in which every retained
source-provenanced causal-root row has one of the following statuses:

1. accepted simple root with winding owner,
2. caustic or fold boundary,
3. memory-window boundary,
4. collision/core boundary,
5. inactive-root gap,
6. rejected missing row.

The useful mathematical question is whether the total retained root ledger has
zero unaccounted boundary after the action, wake-history, and medium-response
pullbacks are applied.

## Candidate Closed-Ledger Conjecture

Let $\mathcal{R}^{\mathrm{act}}$ be the active causal-root rows in a retained
branch chart on $T_L^3$, and let $\partial\mathcal{R}^{\mathrm{act}}$ denote
the formal boundary generated by caustics, memory-window crossings, endpoint
events, core events, winding transfers, and omitted-row gaps. A candidate branch
is topology-admissible only if the topology-native boundary has no unaccounted
row:
$$
\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}
=0
$$
where zero means every boundary contribution is absent, paired, or routed into
the same retained source record by an explicit boundary-stratum row. This first
condition does not use an EOM.

The downstream cross-sector conjecture is stronger. Once action, wake-history,
and medium-response consumers are supplied, a branch can be consumed by the full
closed-ledger stack only if
$$
\partial\mathcal{R}^{\mathrm{act}}
+
\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}}
+
\partial S_{\mathfrak B}^{(\eta)}
+
\partial\mathcal{M}_{\mathrm{sea}}
=
0
$$
on the same retained history record, with any residual routed to the declared
cross-sector acceptance failure
$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}.
$$

This is a working conjecture, not a canonized law. The topology-native term can
be developed before choosing an EOM; the remaining terms are downstream
same-record consumers. The terms need precise definitions before this becomes
theorem-grade:

| Term | Needed definition |
| --- | --- |
| $\partial\mathcal{R}^{\mathrm{act}}$ | EOM-independent boundary operator on winding-labeled causal-root rows. |
| $\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ | Energy, momentum, and angular-momentum wake-history boundary under the same retained rows. |
| $\partial S_{\mathfrak B}^{(\eta)}$ | Variational endpoint and multiplier residual boundary on the retained branch chart. |
| $\partial\mathcal{M}_{\mathrm{sea}}$ | Medium-response mismatch caused by using a different retained history or response map. |
| $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ | The cross-sector acceptance intersection that rejects unaccounted boundaries. |

## Candidate Definition 5: Noether Sea Compatibility Boundary

The Lorentz/GR residual handoff already requires one Noether sea response
record
$$
\mathcal{M}_{\mathrm{sea}}^{ab}
$$
or bridge equivalent to supply normalized density, delay, effective potential,
stress, lapse, shift, spatial compliance, $G_{\mathrm{eff}}$,
$c_{\text{eff}}$, and $c_\gamma$ projections. The topological ledger adds a
same-history condition to that handoff: the medium-response record must be
read from the same retained branch chart that supplies the active roots,
inactive gaps, Jacobian floors, finite-memory window, regulator state, and
wake-history event ledger.

For a retained branch chart $\mathfrak B$, define the medium-response source
record as
$$
\Theta_{\mathrm{sea}}(\mathfrak B)
=
\left(
q,\ W,\ h,\ \eta,\ \epsilon_c,\ \mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},\ \nu_J,\ \mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{P}_{\mathrm{sea}}
\right),
$$
where $q$ is the branch class, $W$ is the retained comparison window,
$\mathcal{P}_{\mathrm{sea}}$ denotes the projection maps that read clock,
ruler, signal-speed, weak-field metric, and photon-channel rows from the
Noether sea response object, and the other rows are the retained topological
ledger rows that any downstream EOM or medium-response consumer must reference.

The candidate boundary is the residual vector
$$
\partial\mathcal{M}_{\mathrm{sea}}
=
\left(
\Delta_{\mathrm{id}},
\Delta_W,
\Delta_{\mathrm{reg}},
\Delta_{\mathrm{root}},
\Delta_{\mathrm{event}},
\Delta_{\mathrm{proj}},
\Delta_{\mathrm{coef}}
\right).
$$
It vanishes only when:

| Residual | Zero condition | Existing handoff failure if nonzero |
| --- | --- | --- |
| $\Delta_{\mathrm{id}}$ | The medium-response row names the same branch class $q$ and retained chart as the root/action rows. | `residual.provenance_gap` |
| $\Delta_W$ | The medium-response row uses the same retained window $W$ and memory depth $h$. | `residual.observable_refit` |
| $\Delta_{\mathrm{reg}}$ | The medium-response row declares the same $\eta$ and $\epsilon_c$ status used by the root/action rows, or declares a legal coarse-grained limit from them. | `residual.provenance_gap` |
| $\Delta_{\mathrm{root}}$ | Active roots, inactive gaps, Jacobian floors, and caustic routes consumed by the medium row match the retained root ledger. | `residual.branch_unidentified` |
| $\Delta_{\mathrm{event}}$ | Medium updates consume the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ row as clock, ruler, signal, and metric outputs. | `event.ledger_residual` |
| $\Delta_{\mathrm{proj}}$ | $n$, $\chi_{\text{sea}}$, $\Phi_{\mathrm{eff}}$, lapse, shift, spatial compliance, $G_{\mathrm{eff}}$, $c_{\text{eff}}$, and $c_\gamma$ are projections of one $\mathcal{M}_{\mathrm{sea}}^{ab}$ record. | `residual.medium_response_missing` |
| $\Delta_{\mathrm{coef}}$ | No clock, ruler, photon, PPN, or SME row changes coefficients per observable after the response record is declared. | `gravity.hidden_tuning` |

Thus the working pass/fail condition is
$$
\partial\mathcal{M}_{\mathrm{sea}}=0
\quad\Longleftrightarrow\quad
\Theta_{\mathrm{sea}}(\mathfrak B)
\text{ is accepted by the Lorentz/GR medium-response handoff.}
$$
If any component is nonzero, the topological closed-ledger conjecture fails
closed even if the primitive causal roots, action residual, and wake-history
charges close. This is the precise form of the current blocker: the root
ledger can be executable while the Noether sea response projection is still
unproved.

### Lorentz/GR Handoff Test

The smallest test against the Lorentz/GR residual handoff is not a new gate.
It is a population check for the existing `medium_response`, `event_ledger`,
`speed_convention`, and dependency-gate rows:

| Handoff row | Required same-history check |
| --- | --- |
| `medium_response` | Names one $\mathcal{M}_{\mathrm{sea}}^{ab}$ record and one $\Theta_{\mathrm{sea}}(\mathfrak B)$ source record. |
| `event_ledger` | Uses the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ rows named in $\Theta_{\mathrm{sea}}(\mathfrak B)$. |
| `speed_convention` | Keeps $c_f$, $c_\gamma$, $c_{\text{eff}}$, and $c_0$ distinct until the shared response record derives their allowed common limit. |
| `G4_effective_metric_and_shift` | Derives lapse, shift, spatial compliance, and signal-speed projections from the same response object. |
| `G7_null_row_audit` | Emits blocked or failed rows instead of silently omitting a sector whose response projection is missing. |

This test promotes no coefficient. It only decides whether the proposed
medium-response row is compatible with the same retained causal-root ledger.

## Large-Box Limit

The $T_L^3$ proof is useful only if its compactness assumptions are explicit.
There are two different limits:

| Limit | Meaning | Risk |
| --- | --- | --- |
| Fixed $h$, $L\to\infty$ | Local noncompact limit. | Compact pair-contact no longer guarantees roots once $D_L/c_f>h$. |
| $h_L>D_L/c_f$ while $L\to\infty$ | Whole-box contact limit. | Memory depth grows with box size and may not describe local branch packets. |

The safe route is to use $T_L^3$ first as a finite proof laboratory for root
ledger topology, then isolate which lemmas survive on a fixed finite local
window as $L\to\infty$. Any claim that depends on wraparound roots must be
marked compact-box only unless a local noncompact replacement is supplied.

## First Proof Steps

1. Prove the compact pair-contact lemma with torus distance and memory
   condition $h>D_L/c_f$.
2. Rewrite it on universal-cover lifts with explicit winding ownership
   $n\in\mathbb{Z}^3$.
3. Prove simple-root stability by the implicit-function theorem on each
   winding class.
4. Classify root-count changes by endpoint, memory edge, caustic, core, seam,
   and omitted-row strata.
5. State the self-hit criterion separately and show why strict sub-field-speed
   same-transmitter arcs do not supply nearby self-hit roots.
6. Test whether the topology-native ledger condition gives downstream
   branch-chart consumers the same retained source-record identity burden
   without adding a new force, gate, or ontology.

## What This Could Advance

- Explain why the top-ranked workstreams keep asking for the same retained
  branch/history/certificate identity instead of independent sector facts.
- Turn shock-like causal-root onset into a controlled caustic-boundary theorem
  target.
- Separate compact-box pair contact from noncompact root starvation.
- Preserve the distinction between self-hit and multi-hit while showing they
  are instances of the same root-intersection topology.
- Provide a mathematical route for the branch-level cohomology target already
  used in the master-equation closure queue.

## What This Does Not Yet Prove

- It does not certify an eigen-braid.
- It does not prove stable self-hit assemblies.
- It does not derive Noether sea response, mass, Lorentz behavior, quantum
  weights, or Standard Model coefficients.
- It does not make $T_L^3$ physical cosmology.
- It does not replace A1 outward constants, branch certificates, action
  residuals, or cross-sector validation.
- It does not prove that photon constituents are super-field-speed in an
  accepted branch; it only records why the speed split must be audited.
- It does not prove that middle-binary hinge crossings form a physical
  telegraph signal; it only records the root-count topology that could make
  such pulse patterns meaningful.

## Disposition

Priority-only. This is a strong proof-route candidate because it turns the
shock-front, pair-contact, multi-hit, self-hit, and six-item admissibility
questions into one topological ledger problem. It should stay in
`reference/priorities` until the boundary operator, closed-ledger conjecture,
and large-box limit are made precise enough for theorem-grade corpus prose.
