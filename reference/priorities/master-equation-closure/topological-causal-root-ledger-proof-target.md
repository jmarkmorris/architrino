# Topological Causal-Root Ledger Proof Target

## Status

- Kind: `priority`
- Claim level: `priority-only theorem target`
- Workstream: [master-equation-closure](master-equation-closure.md)
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

## Discussion Capture 2026-06-29

The topology thread raised four additional questions that should remain attached
to this proof target until they are either absorbed into a downstream EOM
consumer stack or rejected.

### Source Path Point Versus Source Path Segment

At the sharp causal-root level, a causal hit is from a source-history point. The
receiver event selects an emission time $s<t$ satisfying
$$
G_{ij,n}(t,s)=0.
$$
The source point
$$
\tilde{\mathbf{x}}_j(s)
$$
is the center of the causal wake surface that reaches the receiver. In that
sharp limit, the received branch row is point-to-event: one historical source
point to one receiver event.

At the proof and numerical level, the point is found and weighted only by
looking at a source path segment. The source worldline must be continuous
enough to solve the root equation, compute the Jacobian floor, track root
transport, and decide whether nearby roots are active or inactive. With finite
causal-surface width $\eta>0$, the received contribution no longer collapses
to an exact point; it comes from a finite neighborhood of the root on the source
path. Thus the correct split is:

| Regime | What contributes |
| --- | --- |
| Sharp simple-root branch | One or more selected source-history points. |
| Finite-$\eta$ regularized branch | Small source-path neighborhoods around selected roots. |
| Branch certification | A retained source-path segment, because root identity, gaps, Jacobian floors, and memory boundaries must persist under replay. |

Plain-language version: a transmitter leaves expanding wake shells at every
instant. A hit is like one shell touching the receiver. In the ideal sharp
picture, that shell came from one exact place where the transmitter was. To
know that this is a real, stable hit rather than a drawing artifact, the proof
must inspect the nearby stretch of the transmitter's path.

### Photon Planar Pair Speed Split

The photon channel currently describes a **coaxial contra-rotating pro/anti
planar pair** with a photon-channel propagation speed $c_\gamma$ that approaches
$c_f$ in a weak homogeneous Noether sea. In broader medium-response contexts,
$c_{\text{eff}}$ is the dressed limiting signal speed; the photon proof should
keep $c_\gamma$, $c_{\text{eff}}$, and $c_f$ distinct until a common-limit
derivation identifies them.

The topology question is about constituent architrino speeds inside the photon
carrier. If a constituent has forward translation
$$
\mathbf v_{\parallel}=c_\gamma\hat{\mathbf e}
$$
and transverse orbital motion
$$
\mathbf v_\perp
\perp
\hat{\mathbf e},
$$
then the absolute substrate velocity is
$$
\mathbf v_a=\mathbf v_{\parallel}+\mathbf v_\perp,
\qquad
\|\mathbf v_a\|^2=c_\gamma^2+\|\mathbf v_\perp\|^2
$$
in the orthogonal idealization. If $c_\gamma$ is already close to $c_f$, any
nonzero transverse component can make the constituent absolute speed exceed
$c_f$ even though the photon-channel propagation speed remains at or below the
observer-facing light speed.

This is not automatically a contradiction. In the current architecture, $c_f$
is the causal-wake propagation speed, not a declared speed limit for every
architrino worldline. Downstream Master Equation packets currently provide
examples of rows for super-field-speed source histories, self-hit, caustics, and
multiple causal roots, but the topology layer should not depend on that EOM.
What is not yet closed is the photon-specific proof that the coaxial planar-pair
branch keeps its Gate A/B/C ledgers while its constituent absolute velocities
may be super-field-speed.

Required photon-side rows:

| Required row | Purpose |
| --- | --- |
| `photon_constituent_absolute_velocity_split` | Separate $c_\gamma\hat{\mathbf e}$ from transverse internal velocity. |
| `photon_super_field_speed_constituent_route` | Decide whether any $\|\mathbf v_a\|>c_f$ intervals generate accepted self-hit, partner-hit, caustic, or inactive rows. |
| `photon_planar_pair_root_ledger` | Recompute causal roots using the constituent absolute histories, not only the centerline photon speed. |
| `photon_gate_a_speed_consistency` | Keep $c_\gamma$, $c_{\text{eff}}$, and $c_f$ distinct until the common-limit branch is proved. |

### Field-Speed Hinge Telegraph Pattern

The middle support band in a Noether braid is already treated as a candidate
$c_f$ hinge. The new intuition is that a middle binary riding near the local
field-speed threshold may have a causal-contact pattern that switches as tiny
perturbations move it across the symmetry-breaking boundary:
$$
\sigma_M(t)
=
\operatorname{sign}(v_M^{\mathrm{rel}}(t)-c_f).
$$

When $\sigma_M<0$, strict sub-field-speed same-source intervals do not supply
nearby self-hit roots. When $\sigma_M>0$, super-field-speed curved intervals
can admit same-source roots. At $\sigma_M=0$, the row is near a tangent or
degenerate boundary and must be routed through the caustic or finite-$\eta$
chart rather than treated as an ordinary simple-root row. If perturbations repeatedly
cross this hinge, the retained causal-root ledger may look like an on/off or
short/long pulse sequence:
$$
0,\ 1,\ 0,\ 1,1,\ 0,\ldots
$$
where the symbols denote root-ledger status, not literal communication bits.

This is the "telegraph" intuition: dot-dash-like contact pulses could arise
from threshold crossings of the same causal-root topology. It is a proof target,
not an accepted mechanism. A real row would need:

| Required row | Purpose |
| --- | --- |
| `middle_hinge_speed_residual` | Track $v_M^{\mathrm{rel}}(t)-c_f$ on one retained branch. |
| `middle_hinge_root_count_word` | Emit the root-count or root-status sequence across hinge crossings. |
| `middle_hinge_caustic_route` | Route $J=0$ or tangent events as caustic / finite-impulse / fail-closed rows. |
| `middle_hinge_action_increment` | Decide whether the contact pulses correspond to $h$-scale action increments, $2h$-scale increments, or neither. |
| `middle_hinge_not_decision_by_itself` | Preserve the distinction between metastability substrate and controlled Switch / Decider status. |

### Photon Speed Question And Telegraph Question Are Coupled

The photon question and the middle-hinge question share one root-topology
problem: a branch can have an observer-facing propagation speed at or below the
effective light channel while some constituent architrino histories still cross
the $c_f$ hinge in absolute substrate motion. If that happens, the branch must
not hide the resulting self-hit, partner-hit, inactive-root, or caustic rows
inside a smooth photon or middle-binary label. The causal-root ledger has to
show whether those rows cancel, stabilize, radiate, route into action, or break
the candidate branch.

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
$\tau=t-s$, the same-source torus distance behaves locally like
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
self-hit onset, but a retained branch still must provide the same-source root,
positive Jacobian floor or caustic route, finite memory, and action/energy
ledger closure.

This keeps the existing distinction intact:

- Self-hit is determined by source identity.
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

The executable population check for this handoff now lives at
`scripts/proof-programs/noether-sea-compatibility-handoff-diagnostic.mjs`, with
focused coverage in `tests/noether-sea-compatibility-handoff-diagnostic.test.js`.
It builds or accepts a Lorentz/GR handoff-like JSON object and emits rows for
the seven components of $\partial\mathcal{M}_{\mathrm{sea}}$, plus the
speed-convention row that prevents premature identification of $c_f$,
$c_\gamma$, $c_{\text{eff}}$, and $c_0$. Its negative controls route the
current blocker to `residual.retained_history_mismatch`,
`residual.speed_conflation`, or `gravity.hidden_tuning` without promoting any
Lorentz/GR coefficient.

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
   same-source arcs do not supply nearby self-hit roots.
6. Test whether the topology-native ledger condition gives downstream
   branch-chart consumers the same retained source-record identity burden
   without adding a new force, gate, or ontology.

## Smallest Executable Check

The first diagnostic implementation now lives at
`scripts/proof-programs/topological-causal-root-ledger-checker.mjs`, with test
coverage in `tests/topological-causal-root-ledger-checker.test.js`. It is a
priority-only diagnostic, not a validation gate and not a retained-branch
certificate. It samples a small neutral path inventory on $T_L^3$ and emits:

| Output | Requirement |
| --- | --- |
| `pair_contact_min_root_count` | For all distinct pairs, at least one root when $h>D_L/c_f$. |
| `winding_owner_present` | Every root carries a winding class or seam-transfer route. |
| `simple_root_floor_min` | Simple roots report a positive Jacobian floor. |
| `caustic_candidate_count` | Near-zero $J$ events are separated from ordinary simple-root rows. |
| `self_hit_root_count` | Same-source roots are reported separately from partner roots. |
| `source_record_contract` | Root topology declares the retained source-record identity consumed by pullback diagnostics. |
| `eom_independence_contract` | Declares that the checker uses no EOM assumption and rejects force-law label substitution. |
| `compact_only_rows` | Rows that disappear when fixed $h$ and $L\to\infty$ are flagged. |
| `source_point_vs_eta_segment` | Distinguish sharp source-history points from finite-$\eta$ path neighborhoods. |
| `photon_constituent_speed_split` | Report centerline $c_\gamma$ and constituent absolute speed ranges. |
| `middle_hinge_root_count_word` | Emit the threshold-crossing root-status sequence for a near-$c_f$ middle row. |

The checker currently reports the requested rows and then stops at
`action_wake_history_noether_sea_and_cross_sector_rows_not_computed`. That is
the correct fail-closed boundary: root topology is now executable at toy level,
but action, wake-history, Noether sea, and cross-sector pullbacks are still the
open downstream proof burden.

## Native T3 Run Envelope Handoff 2026-06-29

The neutral T3 simulator now emits a `t3-run-summary.v1` record from
`src/solver/t3/T3UniverseSimulator.mjs` when `run()` returns. The record is a
run envelope, not a causal-root proof. In solver mode it
aggregates the native bulk T3 step summaries returned through
`solverClient.stepT3UniverseF64` and records:

- step count and particle count,
- neighbor-pair count series,
- occupied-cell count series,
- cell-count series when the native step reports it,
- periodic image-delta totals and wrapped-particle step counts,
- interaction preset,
- execution path counts,
- native bulk step count,
- per-particle fallback step count,
- and already-emitted event counts, including boundary-like event counts only
  when an existing event detector emits such a row.

The current test coverage in `tests/t3-universe-simulator.test.js` proves the
solver-engine route for this envelope: a three-step solver run calls
`stepT3UniverseF64` once per step, reports `executionPath: "native_c_abi"`,
and does not call `integrateConstantAccelerationMotionF64`. That makes the
run envelope a useful benchmark record for topology-native work because it can
show, without choosing a receiver-normal EOM or Master Equation closure, which
particles crossed periodic images, how many native neighbor pairs were present,
and whether the execution path stayed on the native bulk T3 route.

What this can discipline: the missing oriented boundary-operator proof must be
compatible with retained winding and image-delta evidence that appears in
native bulk T3 runs. In particular, image-delta totals and wrapped-particle
step counts give a small executable witness for where seam ownership rows would
have to be declared, paired, or routed in the same retained source record.

What remains unproven: the run envelope does not construct the oriented
boundary operator on retained winding-labeled causal-root rows, does not supply
the same-record routing map for absent, paired, or routed boundary
contributions, and does not prove branch admissibility for any downstream EOM,
action, wake-history, Noether sea, or cross-sector consumer. Until those proof
objects exist, this remains priority-only executable evidence.

## T3 Oriented Boundary Prototype 2026-06-29

The smallest executable prototype now lives in
`src/solver/t3/T3OrientedBoundaryOperator.mjs` and is attached to each
`t3-run-summary.v1` record as `orientedBoundaryPrototype`. Its schema is
`t3-oriented-boundary-prototype.v1`, with `promotionStatus:
priority-only executable evidence`, `masterEomDependency: false`,
`retainedBranch: false`, and `provesBranchAdmissibility: false`.

The prototype defines the topology-native readout for
$$
\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}
$$
only at the evidence-envelope level. The input domain remains the desired
retained winding-labeled causal-root rows on $T_L^3$, but the T3 run envelope
does not yet construct those rows. Therefore the prototype treats the summary
channels as constraints on any future oriented boundary operator:

| Run-summary channel | Prototype boundary readout | What it can discipline | What it cannot prove |
| --- | --- | --- | --- |
| `periodicWrapEvidence.imageDeltaTotals` | Signed seam-transfer coefficient by axis. | Which winding direction would need a seam-owner row. | That the seam owner is a retained causal-root row. |
| `periodicWrapEvidence.absoluteImageDeltaTotals` | Seam-transfer multiplicity by axis. | Whether the seam evidence is absent, cancelling, or owner-requiring in the run summary. | That cancelling signed totals are paired on the same retained source record. |
| `neighborPairCounts.perStep` | Finite-difference rows for native neighbor-pair population. | Candidate pair-contact births and deaths in the native T3 run. | Causal-root multiplicity, Jacobian floor, caustic status, or branch admissibility. |
| `eventSummary.eventTypeCounts` and `boundaryLikeEventCount` | Detector-declared boundary-like event rows with no orientation sign. | Whether existing T3 event detectors emitted seam, wrap, periodic, image, or boundary rows. | Accepted wake-history event-ledger evidence or same-record routing. |

The sign convention is minimal: a positive image delta contributes a
$+\mathbf e_a$ seam-transfer demand on axis $a$, and a negative image delta
contributes $-\mathbf e_a$. If the absolute image delta is nonzero while the
signed total cancels, the row is only a paired seam-transfer candidate until
the same-record owner rows are supplied. Neighbor-count increases are
candidate pair-contact births; decreases are candidate pair-contact deaths.
Event rows are detector declarations and therefore carry no boundary sign until
a retained event ledger supplies one.

This gives an executable first approximation to the missing
oriented-boundary object:
$$
\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}
\leadsto
\Delta_{\mathrm{seam}}^{T3}
+\Delta_{\mathrm{neighbor}}^{T3}
+\Delta_{\mathrm{event}}^{T3}
+\Delta_{\mathrm{unresolved\ root}}.
$$
The final term is explicit: the run summary still lacks the retained
causal-root rows, Jacobian floors, caustic routes, endpoint rows,
memory-window rows, collision/core rows, omitted-row gaps, and same-record
absent/paired/routed map. Consequently this prototype can reject premature
promotion and discipline future proof objects, but it cannot certify branch
admissibility or substitute for any downstream Master Equation, action,
wake-history, Noether sea, or cross-sector consumer.

The prototype now also emits a fail-closed `retainedBoundaryTarget` plus a
`negativeControlMatrix`. This is the priority-only matrix form of the same
operator target:

| Target row source | Required retained evidence | Negative control |
| --- | --- | --- |
| Signed image-delta row | Same-record winding-owner row for the signed seam-transfer demand. | `signed_image_delta_without_winding_owner` |
| Cancelling image-delta row | Same-record pairing map proving the cancelling image deltas are one retained seam transfer. | `cancelled_image_delta_without_same_record_pairing` |
| Neighbor-pair delta row | Retained causal-root row delta with winding owner, Jacobian floor or declared stratum, and same-record source identity. | `neighbor_pair_delta_without_retained_causal_root_rows` |
| Boundary-like detector event | Same-record retained event row with explicit orientation sign before any wake-history event-ledger consumer may use it. | `boundary_like_detector_event_without_retained_event_row` |
| Generic detector event | Declared boundary stratum before the event can enter $\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}$. | `generic_event_count_without_boundary_stratum` |
| Run-summary envelope alone | Retained winding-labeled causal-root rows with endpoint, memory-window, caustic, collision/core, omitted-row, and seam routing. | `run_summary_without_retained_causal_root_rows` |

The matrix deliberately fails closed whenever any required retained evidence is
missing. A clean T3 run summary can therefore be a useful executable witness
for seam, neighbor, and detector-event discipline while still blocking
promotion to branch retention, action closure, wake-history closure, or
cross-sector acceptance.

One additional negative control prevents a common false closure: a zero signed
coefficient total is not the same as
$$
\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}=0.
$$
If image-delta, neighbor, or detector-event rows remain unresolved, the
prototype emits `signed_balance_is_not_boundary_closure` and adds
`zero_signed_boundary_sum_without_same_record_routing`. This blocks the
inference that algebraic cancellation in the run-summary envelope supplies the
same-record absent, paired, or routed map required by the retained
causal-root ledger. The result also reports an exact first blocker as
`retained_boundary_target_unresolved:<rowId>` plus the first required retained
evidence string, so a downstream report can point at the missing seam-owner,
pairing-map, root-delta, event-row, or unresolved-root object without promoting
the T3 envelope itself.

The prototype also emits `retainedBoundaryChronology`, a per-step view of the
same fail-closed evidence. Each row records `stepIndex`, `rowFamily`, `rowKind`,
`evidenceMagnitude`, `signedBalance`, `firstBlocker`, and booleans that mark
whether the row is a retained-boundary target row, detector row, neighbor row,
or negative-control row. The chronology compares three summary channels at
each step:

| Chronology family | Per-step source | Fail-closed blocker |
| --- | --- | --- |
| `seam` | `periodicWrapEvidence.perStep` image-delta rows by axis. | Missing same-record winding owner or same-record seam pairing. |
| `neighbor` | Finite differences of `neighborPairCounts.perStep`. | Native neighbor-pair delta without retained causal-root rows. |
| `detector-event` | `eventSummary.perStep` event counts and boundary-like event counts. | Detector event without retained event row or declared boundary stratum. |
| `unresolved-root` | The run-summary envelope itself. | No retained winding-labeled causal-root replay. |
| `signed-balance` | Step-local signed sum and evidence magnitude. | Zero signed sum without same-record routing. |

This chronology is a comparison surface, not a proof of closure. Its strongest
use is to locate the first step where seam evidence, neighbor-population
evidence, and detector evidence diverge before a causal-root replay exists. The
remaining blocker is unchanged: the T3 run summary must be replaced or joined
by same-record retained causal-root rows with winding ownership, Jacobian
floors or declared strata, endpoint and memory-window routing, collision/core
handling, omitted-row gaps, and event-row orientation before
$$
\partial_{\mathrm{top}}\mathcal{R}^{\mathrm{act}}=0
$$
can be asserted.

The replay boundary is now machine-readable as `sameRecordReplayBoundary` with
schema `t3-same-record-replay-boundary.v1`. It is not accepted replay evidence:
`acceptedReplayRowCount` remains zero, and the first required producer object is
`t3-retained-causal-root-replay.v1`. For every active chronology row, the object
records the chronology row id, step index, row family, evidence magnitude or
signed balance, candidate orientation when the run summary provides one, and
the missing retained replay fields: same-record replay id, retained source
record id, retained causal-root row id, row-family identity, boundary
orientation, winding label, Jacobian floor or declared stratum, endpoint route,
memory-window route, collision/core route, and omitted-row route. Family-specific
fields add seam pairing or winding owner rows, neighbor birth/death routes,
event-row orientation, unresolved root ledger ids, or same-record cancellation
maps as needed.

Two replay negative controls keep the chronology priority-only. A cross-step or
aggregate-only replay attempt fails as
`cross_step_or_aggregate_only_replay_without_chronology_row_identity`; each
chronology row must replay against its own retained source record before any
aggregation can be used. A zero signed-balance replay attempt fails as
`zero_signed_balance_replay_without_same_record_pairing_map`; algebraic
cancellation in the run summary is not a same-record absent, paired, or routed
map. The exact blocker therefore moves from "there is no chronology" to "there
is no retained causal-root replay producer carrying those same-record fields."

The sharper source boundary is
`t3-retained-causal-root-replay-source-boundary.v1`: it records that the
observed `t3-run-summary.v1` source is `aggregate_and_step_summary_only`, with
zero retained producer rows, and that the expected source object remains one
`t3-retained-causal-root-replay.v1` row per active chronology row. That source
object must carry the retained source record id, retained causal-root row id,
row-family identity, boundary orientation, winding label, Jacobian floor or
declared stratum, endpoint route, memory-window route, collision/core route,
omitted-row route, and the family-specific seam, neighbor, event, unresolved
root, or cancellation-routing fields before chronology rows can become
same-record replay evidence.

The photon constituent route diagnostic now lives at
`scripts/proof-programs/photon-constituent-root-route-diagnostic.mjs`, with
coverage in `tests/photon-constituent-root-route-diagnostic.test.js`. It
consumes the topological checker's `photon_constituent_speed_split` rows and
turns the super-field-speed constituent case into an explicit fail-closed route
contract:

| Output | Requirement |
| --- | --- |
| `speed_symbol_distinction` | Keep $c_f$, $c_\gamma$, $c_{\text{eff}}$, and $c_0$ distinct. |
| `absolute_velocity_split` | Recompute constituent absolute speed from $c_\gamma$ and transverse speed. |
| `sample_source_record_identity` | Every photon constituent route sample names the same retained source record as the causal-root topology. |
| `super_field_speed_route` | Every $\|\mathbf v_a\|>c_f$ sample has a self-hit, partner-hit, caustic, or inactive-root route. |
| `centerline_not_constituent_route` | A legal centerline $c_\gamma\le c_f$ does not by itself route the constituent absolute history. |

The default artifact fails closed on `super_field_speed_route`, because the
current packet exposes a super-field-speed constituent sample but has not
replayed it through a photon-specific root ledger. A synthetic routed fixture
exists only to test route logic; it is not a proof of photon closure. A
stronger toy replay fixture, `--self-hit-replay`, models the constituent as a
helical path with $c_\gamma<c_f<\|\mathbf v_a\|$ and finds a non-endpoint
same-source root by sign change over one transverse period. For the current
sample it emits a self-hit route near $\tau=2.06024718621$. This is a
priority-only route witness for the toy constituent model, not photon closure,
Gate A/B/C closure, or branch retention. The artifact now also emits
`route_evidence_summary`, which distinguishes missing route evidence,
synthetic row logic, toy self-hit replay, and any future
`accepted_for_branch_retention` evidence. The current default, synthetic, and
toy fixtures all report `accepted_for_branch_retention: false`. A future
accepted route cannot be supplied by a bare label; the route evidence must also
match the same source record, retained chart, retained window, and regulator
state carried by the source-record contract and carry an active-root route
`derivation_proof_object` with the same accepted evidence id and source record.

The near-$c_f$ middle-hinge route diagnostic now lives at
`scripts/proof-programs/middle-hinge-root-status-diagnostic.mjs`, with coverage
in `tests/middle-hinge-root-status-diagnostic.test.js`. It consumes the
topological checker's `middle_hinge_root_count_word` rows and treats the
sequence as a root-status word:

| Output | Requirement |
| --- | --- |
| `speed_residual_word` | Recompute the word from $\operatorname{sign}(v_M^{\mathrm{rel}}-c_f)$, with `C` reserved for tangent or finite-$\eta$ routing. |
| `sample_source_record_identity` | Every middle-hinge route sample names the same retained source record as the causal-root topology. |
| `super_field_root_replay_route` | Every `1` sample has a self-hit or inactive-root replay route. |
| `caustic_finite_eta_route` | Every `C` sample has a caustic or finite-$\eta$ route. |
| `transition_rows` | Adjacent word samples emit classified threshold transitions such as `0->1`, `1->C`, and `C->0`, with the corresponding route obligation. |
| `not_literal_communication` | The word is root-status routing, not literal communication. |

The default artifact fails closed on missing routes for the `1` and `C`
samples and on transition rows whose route obligations are unpopulated. A
synthetic routed fixture exists only to test row logic. A toy
`--threshold-replay` fixture instead populates the current `1` samples with
self-hit threshold replay evidence and the current `C` sample with finite-$\eta$
threshold evidence. It is still priority-only route evidence, not a proof of a
middle-hinge action increment, controlled Switch / Decider behavior, or
communication mechanism. The artifact also emits `route_evidence_summary`,
splitting missing route evidence, synthetic row logic, toy threshold self-hit
routes, toy threshold finite-$\eta$ routes, and any future
`accepted_for_branch_retention` evidence. The current synthetic and toy
fixtures remain non-accepted for branch retention. The summary records
`accepted_evidence_mismatches` when an accepted route is asserted without the
same-record evidence fields and active-root route derivation proof object
required by the source-record contract.

The companion Noether sea compatibility diagnostic is
`scripts/proof-programs/noether-sea-compatibility-handoff-diagnostic.mjs`. It
does not sample causal roots. Instead, it tests whether a proposed Lorentz/GR
`medium_response` handoff is read from the same
$\Theta_{\mathrm{sea}}(\mathfrak B)$ record:

| Output | Requirement |
| --- | --- |
| `delta_id` | Same branch class, retained chart, and source record. |
| `delta_W` | Same retained comparison window and memory depth. |
| `delta_reg` | Same $\eta$, $\epsilon_c$, and regulator status. |
| `delta_root` | Same active roots, inactive gaps, Jacobian floor, and caustic routes. |
| `delta_event` | Same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ rows. |
| `delta_proj` | One $\mathcal{M}_{\mathrm{sea}}^{ab}$ object supplies all response projections. |
| `delta_coef` | Clock, ruler, photon, PPN, and SME rows do not refit coefficients independently. |
| `speed_convention` | Primitive $c_f$ is not silently substituted for observer-facing channel speeds. |

This second checker is also priority-only. A passing artifact reports
handoff compatibility only; it still leaves `lorentz_gr_bridge` blocked until a
closed upstream bridge populates the residual rows. It now emits
`accepted_evidence_summary` for the medium-response row. The default
`medium_response` row is `source_record_medium_response_declared`, not
accepted medium-response closure; accepted closure must carry an
`accepted_evidence_id`, the source record, response object, retained chart,
retained window, regulator state, and medium-response `derivation_proof_object`.

The same-retained-history contract now has an explicit diagnostic at
`scripts/proof-programs/closed-ledger-source-record-contract-diagnostic.mjs`,
with coverage in `tests/closed-ledger-source-record-contract-diagnostic.test.js`.
It compares the topological root-ledger artifact, the Noether sea handoff, the
photon constituent route artifact, the middle-hinge route artifact, the
wake-history event pullback, and the action-boundary pullback against one
declared source record before the closed-ledger boundary equation is evaluated:

| Output | Requirement |
| --- | --- |
| `source_record_identity` | Root topology, Noether handoff, photon route artifact and sample rows, middle-hinge route artifact and sample rows, event pullback, and action pullback name the same retained source record. |
| `branch_chart_identity` | Root topology, route artifacts, and Noether sea response use the same branch class and retained chart. |
| `retained_window` | Root topology, route artifacts, source record, and medium response use the same retained window and memory depth. |
| `regulator_state` | Root topology, route artifacts, Noether handoff, and action boundary packet use the same $\eta$ and $\epsilon_c$ regulator state. |
| `active_root_ledger` | Root topology and Noether handoff name the same active root ledger and a positive Jacobian floor. |
| `event_ledger` | Root topology, Noether handoff, and event pullback name the same wake-history event ledger. |
| `response_object` | Root topology and Noether handoff name the same Noether sea response object. |

This diagnostic can pass even when the action-boundary pullback remains
fail-closed, because it checks identity and provenance rather than action
closure. Its negative controls make hidden topological, photon-route artifact,
photon-route sample, middle-hinge-route artifact, middle-hinge-route sample,
event-pullback, regulator, and response-object drift fail before a
sector-specific residual can be mistaken for a shared closed-ledger row. It also
has an `eom-label-decoy-without-topological-ledger` negative control: even when
the retained source record, retained chart, retained window, and regulator
labels are copied from the reference record, an EOM or force-law label fails
closed if the topology-native active root ledger object is absent.

The closed-ledger pullback compositor now lives at
`scripts/proof-programs/closed-ledger-pullback-diagnostic.mjs`, with focused
coverage in `tests/closed-ledger-pullback-diagnostic.test.js`. It consumes the
topological causal-root diagnostic, the Noether sea compatibility diagnostic,
the photon and middle-hinge route diagnostics, the source-record contract
diagnostic, and optional action / wake-history pullback artifacts, then emits
the boundary
rows
$$
\partial\mathcal{R}^{\mathrm{act}},\quad
\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}},\quad
\partial S_{\mathfrak B}^{(\eta)},\quad
\partial\mathcal{M}_{\mathrm{sea}},\quad
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}.
$$
Its default fixture now consumes the root-topology, photon route, middle-hinge
route, source-record contract, Noether handoff, wake-history event, and
action-boundary diagnostics. The source-record contract, Noether handoff, and
wake-history event rows pass at diagnostic level, while
$\partial\mathcal{R}^{\mathrm{act}}$ fails closed on missing photon and
middle-hinge route population. The compositor also rechecks that the route
artifacts and route sample rows it is actually handed name the same retained
source record as the Noether/source contract, so a stale or swapped route artifact fails
$\partial\mathcal{R}^{\mathrm{act}}$ even if a previously built
`source_record_contract` artifact still passes. A synthetic fully populated priority-only
fixture can pass the compositor row logic, but it is not a retained branch or
an action proof. The precise current blocker is therefore active-root route
population first, with accepted action-boundary rows still required downstream.
The $\partial\mathcal{R}^{\mathrm{act}}$ row now carries the photon and
middle-hinge `route_evidence_summary` payloads and an
`accepted_route_evidence_status` field, so a route-populated toy fixture is
visibly `not_accepted_for_branch_retention` even when the row logic passes.

The wake-history side now has its own priority-only population diagnostic at
`scripts/proof-programs/event-wake-history-pullback-diagnostic.mjs`, with
coverage in `tests/event-wake-history-pullback-diagnostic.test.js`. It checks
that `energy_wake`, `momentum_wake`, `angular_momentum_wake`, and
`medium_update` rows are present on the same retained event ledger. This
keeps the wake-history side from being the current default blocker unless a
future event artifact fails one of the same-source or missing-row negative
controls. It now emits `accepted_evidence_summary` as well: present event
ledger rows count as `source_record_event_ledger_declared`, not accepted
wake-history closure. A row must carry `accepted_for_wake_history_closure`,
an `accepted_evidence_id`, the retained source record, and the retained event
ledger id before the compositor can report accepted wake-history evidence.
The wake-history derivation proof object must bind the same row, accepted
evidence id, source record, and receiver-normal branch-strength derivative
bundle. In particular, any wake-history row consumed by
$\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ must name the same retained
branch list, $D_s$, $D_t$, $W^{\mathrm{rec}}$, $D_vD_s$, $D_vD_t$, and
reconstructed $D_vW^{\mathrm{rec}}$ rows used by the force/action packet. A
declared event ledger without those rows remains
`not_accepted_for_wake_history_closure`; a terminal aggregate, H39/theta3minus
quotient row, source-normal-only denominator, or old shell-braid force residue
fails as `receiver-normal-first-derivative-row-missing`.

The first same-record receiver-normal derivative contract is now explicit in
that diagnostic. `energy_wake`, `momentum_wake`, `angular_momentum_wake`, and
`medium_update` can each bind
`receiver-normal-retained-branch-family-first-derivative/v0` to the same source
record, event ledger, retained record key, source artifact hash, and consumer
row, then recompute $D_vW^{\mathrm{rec}}$ from $D_s$, $D_t$, $D_vD_s$, and
$D_vD_t$. The artifact emits
`receiver_normal_derivative_contract_summary`, which names accepted row ids,
blocked row ids, the first failure code, and `required_object_blockers` for
each row. Missing derivative bundles now surface as
`receiver-normal-first-derivative-row-missing`; missing accepted derivation
proof objects are named as `wake_history_derivation_proof_object`; source-record
drift surfaces as `receiver-normal-derivative-record-mismatch`,
reconstruction drift surfaces as
`receiver-normal-derivative-reconstruction-failed`, and branch-list drift
surfaces as `branch-family-consumer-checksum-mismatch`. These remain
fail-closed rather than accepted wake-history closure. This is row-logic
evidence only; the closed-ledger compositor still reports the wake-history
sector as not accepted until all required event rows carry accepted evidence
and proof objects from an accepted retained branch.

A repository search found no local accepted retained provider object supplying
`wake_history_derivation_proof_object` for those four rows. The event diagnostic
therefore emits `wake_history_derivation_proof_object_boundary` with
`provider_status: wake_history_derivation_proof_object_missing`,
`accepted_retained_provider_ready: false`, the required retained-record,
receiver-normal derivative, and provenance fields, and
`first_blocked_downstream_consumer: partial_L_EpJ`. A selected row can also be
replayed with the derivative bundle present but the proof object absent; that
fails as `wake-history-derivation-proof-object-missing`, not as accepted
wake-history evidence.

The diagnostic also exposes CLI replay controls for this receiver-normal
contract. `--control receiver-normal-missing-derivative-bundle`,
`--control receiver-normal-missing-proof-object-provider`,
`--control receiver-normal-reconstruction-drift`,
`--control receiver-normal-record-mismatch`, and
`--control receiver-normal-branch-family-checksum-mismatch`, combined with
`--event-row`, emit the corresponding fail-closed artifact for a selected
event row. These controls do not add a validation gate and do not promote the
row-logic fixture; they only make the wake-history accepted-evidence contract
replayable and falsifiable before the closed-ledger compositor consumes a
future artifact.

The action side now has a fail-closed population diagnostic at
`scripts/proof-programs/action-boundary-pullback-diagnostic.mjs`, with coverage
in `tests/action-boundary-pullback-diagnostic.test.js`. It names the required
`action_endpoint_row`, `action_multiplier_row`, `eta_regulator_row`, and
`epsilon_c_core_row` entries for $\partial S_{\mathfrak B}^{(\eta)}$. Each
row is now a structured row contract rather than a presence flag: it must name
the retained source record, retained chart, retained window, regulator state,
and the expected boundary symbol for that action contribution. Its default
artifact fails with `residual.provenance_gap`, because those rows are not
accepted action-boundary evidence yet. A synthetic closed fixture exists only to
test row logic; it is not a proof of action closure. A partial
`--regulator-only` fixture populates only `eta_regulator_row` and
`epsilon_c_core_row` from the declared same-record regulator state. That
fixture is useful for separating regulator provenance from action closure, but
it still fails on `action_endpoint_row` and `action_multiplier_row`.
Action artifacts now also emit `evidence_level_summary`, so synthetic row-logic
fixtures, source-record regulator declarations, and missing endpoint/multiplier
rows cannot be confused. They now also emit `accepted_evidence_summary`; a row
counts as accepted for action closure only when it has an
`accepted_evidence_id`, declares `accepted_for_action_closure`, and still
matches the same source record, retained chart, retained window, regulator
state, boundary symbol, and action-boundary `derivation_proof_object`.
Synthetic action rows and regulator-only rows therefore remain
`not_accepted_for_action_closure` even when their row contracts pass.

## Executable Frontier

The executable chain now separates same-record compatibility, active-root
routing, wake-history rows, action rows, and Noether sea handoff rows. The
default fixture has the following blocker order:

| Diagnostic row | Default status | Next accepted evidence needed |
| --- | --- | --- |
| `source_record_contract` | pass | None at diagnostic level; it is still only a shared identity contract. |
| $\partial\mathcal{R}^{\mathrm{act}}$ | fail | Promote or replace the toy photon self-hit route and toy middle-hinge threshold replay routes as accepted same-record evidence; the route summaries report zero accepted route samples and require active-root route derivation proof objects. |
| $\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ | pass | None at diagnostic row-population level; row-logic fixtures now exercise the receiver-normal derivative bundle for all four required event rows, but accepted branch evidence still has to supply accepted wake-history rows with evidence ids, derivation proof objects, the same retained event ledger, and the same-record receiver-normal derivative bundle. |
| $\partial S_{\mathfrak B}^{(\eta)}$ | fail | The regulator-only fixture can populate `eta_regulator_row` and `epsilon_c_core_row`; real closure still needs `action_endpoint_row` and `action_multiplier_row` evidence with the same source record, retained chart, retained window, regulator state, boundary symbols, accepted evidence ids, and derivation proof objects. |
| $\partial\mathcal{M}_{\mathrm{sea}}$ | pass | None at handoff-population level; Lorentz/GR closure still needs accepted medium-response evidence with a derived Noether sea response id, the same retained source record, receiver-normal branch-strength rows for any force/action consumer, and a medium-response derivation proof object. |
| $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ | fail | All upstream rows must pass on accepted evidence, not only synthetic row-logic fixtures. |

The receiver-normal derivative contract sharpens accepted wake-history evidence
for all four event rows, but it does not change this blocker order:
wake-history row population still passes only at diagnostic level, and accepted
closure still waits for accepted retained-branch evidence with derivation proof
objects.

Thus the next mathematical artifact should not try to promote the closed-ledger
equation. It should replace one toy active-root route row or populate one
action-boundary row with accepted, same-record evidence, then rerun the
compositor.

The compositor tests now include that second case explicitly: when the photon
route is supplied by the toy self-hit replay, the middle-hinge route is supplied
by the toy `--threshold-replay` fixture, and the action side uses the `--regulator-only`
fixture, $\partial\mathcal{R}^{\mathrm{act}}$ passes while
$\partial S_{\mathfrak B}^{(\eta)}$ fails. That verifies the blocker order:
active-root route population first, then endpoint and multiplier action rows.
The compositor CLI can also build the active-root route replay frontier with
`--route-replay-fixtures`, which combines the photon self-hit replay and
middle-hinge threshold replay fixtures while leaving action closure fail-closed.
The compositor artifact also emits `blocker_order`, a compact ordered list of
boundary-row statuses and failure codes for handoff into the next proof pass.
With route replay fixtures, the same artifact reports
`accepted_route_evidence_status: not_accepted_for_branch_retention`, preserving
the proof burden after the executable row population blocker is isolated. The
action row similarly reports `accepted_action_evidence_status:
not_accepted_for_action_closure` until endpoint and multiplier rows carry
accepted same-record action evidence rather than synthetic row logic. The
wake-history row reports `accepted_event_evidence_status:
not_accepted_for_wake_history_closure` until the event ledger rows are backed
by accepted evidence ids rather than declared source-record population alone.
The Noether sea row reports `accepted_medium_response_evidence_status:
not_accepted_for_medium_response_closure` until the medium-response handoff is
backed by accepted evidence rather than same-record compatibility alone. The
cross-sector $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ row now reports
`accepted_evidence_ready` plus per-sector accepted-evidence blockers, so a
fully populated synthetic fixture can pass row logic while still showing that
accepted cross-sector closure has not been reached. It also reports
`cross_sector_acceptance_status`, and the compositor result reports
`branch_retention_status`, so priority-only row-logic compatibility remains
explicitly separate from accepted evidence and never implies branch retention.
The sector validators now reject accepted-summary drift, and the compositor
runs the wake-history and action validators before consuming imported accepted
summaries; forged action or event accepted summaries therefore report
`action_evidence_summary_invalid` or `event_evidence_summary_invalid` and block
the cross-sector row.

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
