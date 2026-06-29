# Topological Causal-Root Ledger Proof Target

## Status

- Kind: `priority`
- Claim level: `priority-only theorem target`
- Workstream: [master-equation-closure](master-equation-closure.md)
- Corpus destination if accepted:
  [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md),
  [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md),
  and the relevant branch-certificate packets.
- Promotion status: not promoted. This packet records a candidate proof route and
  working mathematics for discussion and refinement.

## Purpose

This packet captures a topology-oriented proof route suggested by the causal-root
and self-hit discussion. The target is not a new force law. The target is to
decide whether branch admissibility can be stated as a closed causal-root ledger
condition: the same retained path-history record must account for causal-root
intersections, root-count changes, action residuals, Noether wake-history
charges, Noether sea response, and cross-sector acceptance without leaving an
untracked boundary.

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
> A branch can be consumed by the Master Equation closure stack only when those
> boundary strata are either absent, paired, or routed into the same
> wake-history and action ledger.

This would make the six repeated closure items projections of one object:

| Closure item | Topological readout |
| --- | --- |
| Delayed Master EOM | Root intersections supply the local force rows. |
| Retained branch chart | Simple roots persist as local sections of the root ledger. |
| Action / variational residual | Root-constraint work and endpoint terms must close on the same ledger. |
| Noether wake-history charges | Root births, deaths, and memory-boundary flux become charge-boundary terms. |
| Noether sea response | Medium-response rows consume the same retained history, not a separate fit. |
| Cross-sector acceptance | No sector may consume a root ledger whose boundary is unaccounted elsewhere. |

## Discussion Capture 2026-06-29

The topology thread raised four additional questions that should remain attached
to this proof target until they are either absorbed into the Master Equation
proof stack or rejected.

### Source Path Point Versus Source Path Segment

At the sharp branch-law level, a causal hit is from a source-history point. The
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
architrino worldline. The Master Equation already has rows for
super-field-speed source histories, self-hit, caustics, and multiple causal
roots. What is not yet closed is the photon-specific proof that the
coaxial planar-pair branch keeps its Gate A/B/C ledgers while its constituent
absolute velocities may be super-field-speed.

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
chart rather than treated as an ordinary force row. If perturbations repeatedly
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

This is the same source-velocity transversality row used by the Master Equation
branch law. A root with $J_{ij,n}=0$ is a caustic boundary, not an ordinary force
row.

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
| Collision/core locus | Use the same $\epsilon_c$ convention in force, action, and energy rows. |
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
is admissible only if
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

This is a working conjecture, not a canonized law. The terms need precise
definitions before this becomes theorem-grade:

| Term | Needed definition |
| --- | --- |
| $\partial\mathcal{R}^{\mathrm{act}}$ | Boundary operator on winding-labeled causal-root rows. |
| $\partial\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ | Energy, momentum, and angular-momentum wake-history boundary under the same retained rows. |
| $\partial S_{\mathfrak B}^{(\eta)}$ | Variational endpoint and multiplier residual boundary on the retained branch chart. |
| $\partial\mathcal{M}_{\mathrm{sea}}$ | Medium-response mismatch caused by using a different retained history or response map. |
| $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ | The cross-sector acceptance intersection that rejects unaccounted boundaries. |

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
6. Test whether the closed-ledger conjecture reproduces the existing
   branch-chart promotion requirements without adding a new force, gate, or
   ontology.

## Smallest Executable Check

Build a toy checker that samples a few paths on $T_L^3$ and emits:

| Output | Requirement |
| --- | --- |
| `pair_contact_min_root_count` | For all distinct pairs, at least one root when $h>D_L/c_f$. |
| `winding_owner_present` | Every root carries a winding class or seam-transfer route. |
| `simple_root_floor_min` | Simple roots report a positive Jacobian floor. |
| `caustic_candidate_count` | Near-zero $J$ events are separated from ordinary force rows. |
| `self_hit_root_count` | Same-source roots are reported separately from partner roots. |
| `compact_only_rows` | Rows that disappear when fixed $h$ and $L\to\infty$ are flagged. |
| `source_point_vs_eta_segment` | Distinguish sharp source-history points from finite-$\eta$ path neighborhoods. |
| `photon_constituent_speed_split` | Report centerline $c_\gamma$ and constituent absolute speed ranges. |
| `middle_hinge_root_count_word` | Emit the threshold-crossing root-status sequence for a near-$c_f$ middle row. |

This checker would be a diagnostic, not a validation gate, unless the proof
route later shows that it protects an existing branch-certificate obligation.

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

## Current Disposition

Priority-only. This is a strong proof-route candidate because it turns the
shock-front, pair-contact, multi-hit, self-hit, and six-item admissibility
questions into one topological ledger problem. It should stay in
`reference/priorities` until the boundary operator, closed-ledger conjecture,
and large-box limit are made precise enough for theorem-grade corpus prose.
