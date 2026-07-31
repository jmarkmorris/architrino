# FSC-001 Field-Speed Ceiling Compatibility Decision

**Date:** 2026-07-30
**Status:** compatibility decision packet complete; minimal collinear
partner-contact convention selected for review; no canonical adoption
**Claim level:** discussion-scoped compatibility analysis
**Decision authority:** this packet does not change the canonical
$\mathbb{A}\mathbb{A}\mathbb{A}$ velocity domain, Master Equation, EOM solver
contract, or closure score.
**Reviewed by:** [Jack K. Hale read-only review, captured 2026-07-31](jack-k-hale-review-response-2026-07-31.md);
[Lars Hörmander read-only review, captured 2026-07-31](lars-hormander-review-response-2026-07-31.md).

## Decision question

The current canonical primitive velocity domain is the open, unbounded domain

$$
\mathcal V_{\mathrm{open}}=\mathbb R^3.
$$

It admits finite velocities below, at, and above $c_f$. Field speed is the
causal-wake propagation speed; it is not presently an architrino speed
ceiling. Root existence, $D_t$, $D_r$, folds, caustics, and retained history
determine which causal receptions contribute.

The proposed alternative replaces that domain with

$$
\mathcal V_{\mathrm{closed}}
=
\left\{
\mathbf V\in\mathbb R^3:
\|\mathbf V\|\le c_f
\right\}.
$$

That replacement is not compatible with the current corpus or EOM solver as a
one-line bound or numerical clamp. It is conditionally compatible only as a
separately versioned model with:

1. one complete constrained-response axiom containing the closed domain,
   exact interior recovery, and least-change response to a complete finite
   ordinary net ledger; and
2. the proposed Minimal Collinear Partner-Contact Postulate for the exact
   mirror-collinear coincidence; and
3. a typed event rule for every other nonisolated or zero-Jacobian
   boundary-contact family if a general closed-domain model is sought.

Plainly: the existing theory lets an architrino move faster than its wakes.
A closed domain changes that theory. Preventing an outward velocity update is
not enough, because the delayed-root ledger itself can cease to be an ordinary
finite sum at the boundary.

## Compatibility disposition

| Question | Evidence-bounded disposition |
| --- | --- |
| Can $\|\mathbf V\|\le c_f$ be added without changing the current model? | No. It contradicts the explicit open velocity domain and removes admitted super-field-speed retained histories. |
| Does the closed domain remove the MEC-007 newborn sharp self-root? | Yes, conditionally. That root requires a continued history with $u>c_f$, which the closed domain does not admit. This is domain exclusion, not deletion of a root from an admitted history. |
| Does the closed domain by itself define boundary evolution? | No. Conditional on the `Awaiting verification` MEC-007 input, the incoming ordinary partner row is finite and speed-increasing at first field-speed arrival. A state constraint alone does not select its response. |
| Does the minimal total-ledger projection define the whole collinear continuation? | No. It defines a unique conditional half-open cap segment, then reaches a nonisolated partner-contact interval where the finite-ordinary-ledger premise fails. The separately proposed reset gives only a velocity-preserving outgoing contact one-jet, not a right-hand path. |
| Does the exact thirty-root reference theorem support the ceiling? | No. It establishes regular root topology on one prescribed closed-domain geometry. It does not establish dynamical closure. |
| Does the minimal-response vector diagnostic retain that reference braid? | No. All four relative polarity orientations have a counterexample at $T=0$. The diagnostic rejects that geometry under that response only. |
| Is FSC-001 an adoption decision? | No. The operator has selected one narrow collinear event postulate for review inside this priority packet. Neither the ceiling nor that postulate is canonical. |

Plainly: the ceiling removes one known super-field obstruction but immediately
creates a different missing-law problem. The clean thirty-root braid geometry
also fails its first necessary acceleration-closure test, so it cannot be used
as positive evidence for the ceiling.

Claim grades in this packet are:

- `derived conditional` for the collinear ledger, contact obstruction,
  prescribed straight-trace negative, and local-existence boundary;
- `derived` for the exact thirty-root reference-path theorem;
- `measured` for the high-precision vector-closure counterexamples;
- `inferred` for the compatibility and dependency map, based on the live
  corpus, contracts, implementation, oracle, and tests; and
- `proposed postulate` for every closed-domain response or event alternative,
  including the selected minimal collinear zero-impulse convention.

The compatibility map is falsified by a live canonical or EOM owner that
already declares the closed domain with a complete boundary-contact update, or
by a direct affected dependency omitted from the inventories below. Neither
condition was found in the audited state.

Plainly: the packet keeps proofs, measurements, compatibility conclusions, and
new-law proposals at different authority levels.

## Unchanged results

The following results survive unchanged because they are either interior
results or conditional geometry theorems whose assumptions remain explicit.

1. **Primitive causal geometry.** Euclidean void, absolute time, propagation
   at symbolic $c_f$, the positive-delay causal-root equation, and the
   ordinary simple-root factors $D_t$, $D_r$, and
   $W^{\mathrm{acc}}=c_f/|D_t|$ are unchanged.
2. **Interior Master Equation.** On every admitted history segment with
   $\|\mathbf V\|<c_f$ and a complete finite ordinary root ledger, the proposed
   closed model must reproduce the canonical acceleration exactly.
3. **MEC-007 conditional incoming branch.** MEC-007 remains
   `Awaiting verification`. Its proposed unique inward partner root, finite
   speed-increasing acceleration, and first field-speed arrival are retained
   unchanged as conditional inputs. MEC-007 does not supply the boundary rule.
4. **Collinear open cap segment.** Conditional on the minimal total-ledger
   response, the history on $[T_\ast,T_{\mathrm c})$ is unique. Each receiver
   has one old ordinary partner root, no older self root, no cap-emitted
   partner root, and one recorded inactive co-moving self-contact interval.
5. **Finite accumulated incoming row.** The old partner acceleration grows
   pointwise as $D_t\to0$, but its raw accumulated variation on the half-open
   cap segment is finite. The candidate projection removes its purely
   speed-increasing effect on that segment.
6. **Partner-contact obstruction.** At $T_{\mathrm c}$ the cap-emitted partner
   histories form a nonisolated positive-delay contact interval with $D_t=0$.
   The ordinary constrained Master Equation has no value there. This derived
   obstruction is unchanged by adding a separate event postulate.
7. **Conditional straight-trace negative.** A prescribed unaccelerated
   straight separating right trace creates a
   regular post-contact partner row with magnitude proportional to
   $\delta^{-2}$. Its slowing direction is retained by the minimal projection,
   and its integral diverges. This rejects that prescribed trace under the
   unchanged ordinary law. It is not a universal continuation no-go.
8. **Outgoing contact one-jet.** Conditional on the proposed Minimal
   Collinear Partner-Contact reset, each label has
   $\mathbf V_i(T_{\mathrm c}^{+})=\mathbf V_i(T_{\mathrm c}^{-})$. This is a
   velocity-preserving outgoing contact one-jet, not a right-hand path, and is
   a consequence of an explicit postulate rather than the ordinary law.
9. **Local-existence verdict.** The candidate is locally defined and unique
   on the half-open cap segment, and the proposed event postulate selects the
   contact velocity state. No finite, unique solution on an open post-contact
   interval has been established.
10. **Thirty-root theorem.** For the prescribed six-path, common-radius,
   mutually orthogonal, $120^\circ$ phase reference with
   $c_f=R=\omega=1$, every distinct-label ordered channel has exactly one
   positive-delay simple root with $D_t>0$ and $D_r>0$, while each same-label
   channel has none. The exact inventory is thirty ordinary roots at every
   reception time, with no transmitter-side fold.
11. **Negative vector diagnostic.** For all four inequivalent relative
    polarity orientations, the minimal total-ledger response fails at least
    one necessary prescribed-circle closure condition at $T=0$: a receiver is
    slowed or receives a nonzero binormal component. This is a measured
    negative on the prescribed paths, not an interval theorem and not a test
    of an unselected redirection law.

Plainly: these results remain useful without deciding the foundational
question. They tell us exactly where the ordinary mathematics works, where it
ends, and which first braid candidate does not close.

## Removed or reclassified hypotheses and diagnostics

A closed primitive domain would not disprove the current open-domain theorems.
It would instead make their super-field-speed histories inadmissible in the
new model. The following material must therefore be removed from the new
model, rewritten as an open-model comparison, or replaced by a derived
closed-domain mechanism.

### Direct mathematical removals

- The uniform-circular simple self-hit branch for speed ratio $\beta>1$
  remains a valid open-domain theorem but has no admissible closed-domain
  trajectory.
- The persistent-memory statement that an architrino can later receive a
  self-hit emitted during an earlier super-field-speed interval is unavailable
  for histories generated wholly by the closed model.
- General claims that curved super-field-speed motion can open multiple
  self-hit or partner-hit roots become comparison statements, not closed-model
  mechanisms.
- The current MCB and super-field-speed binary root-ledger hypotheses lose
  their proposed self-hit barrier unless a new boundary event supplies a
  separately derived replacement. The replacement cannot inherit the old
  theorem by renaming a boundary event as a self root.
- Any proposed assembly, braid, strong-field, or cosmological branch that
  requires a constituent row with $\|\mathbf V\|>c_f$ becomes inadmissible
  under the closed model until its geometry and ledger are rederived inside
  $\mathcal V_{\mathrm{closed}}$.

Plainly: the closed model cannot keep the consequences of super-field-speed
history while forbidding that history. A new boundary mechanism would have to
earn any analogous effect from its own equations.

### Prescribed and diagnostic reclassification

- The A1.1 bounded-root diagnostic deliberately contains an outer
  super-field-speed circular layer. Its exact root topology, structural
  ledger, and existing records remain valid only as prescribed open-domain
  diagnostics. They cannot be combined with closed-domain evidence.
- The application field-speed scan retains above-boundary rows as
  open-model rows or explicit `not-admitted` controls. A closed-model result
  may not silently omit them or reinterpret them as evolved closed histories.
- Existing EOM controls for an unclamped super-field-speed receiver,
  super-field-speed inertial history, and super-field circular roots remain
  valid controls of `master_eom_binding/v1`. They become negative
  model-binding tests for a future closed variant, not tests to delete.
- Display classifiers and compact-family diagnostics that label
  `super-field-speed` continue to describe their recorded inputs. They do not
  establish that those inputs belong to a closed model.

Plainly: old diagnostic records do not become wrong. Their authority stays
with the open model that generated or prescribed them.

## Proposed regular-chart axiom and collinear event postulate

A closed variant first requires one **Complete Constrained-Response Axiom**.
It places primitive velocity in the closed ball, leaves the canonical complete
finite ordinary net ledger exactly unchanged below $c_f$, and at the boundary
selects its Euclidean least-change tangent-cone projection after the complete
net sum is formed. The net forward speed-increasing component has zero
effective impact, the transverse component turns, and the backward component
slows.

This is one complete proposed foundational law, not a response derived from
the bare velocity inequality. It introduces no new numerical scale and does
not delete, clip, or reweight any ordinary row before summation. A different
response would belong to Alternative C below.

The complete axiom is sufficient only while the ordinary root sum is complete
and finite. The derived conditional collinear partner-contact obstruction
shows that the exact mirror-collinear event needs an additional event-domain
postulate. The operator has selected this minimum convention for review:

> **Minimal Collinear Partner-Contact Postulate.** At exact same-path partner
> coincidence, the ordinary positive-separation, isolated-reception ledger has
> no contact row. The zero-radius point-emission delta is source bookkeeping,
> not a partner acceleration contribution. One separately recorded event owns
> the nonisolated partner-contact family and limiting incoming-root transition
> exactly once, and contributes
>
> $$
> \Delta\mathbf V_{i,\mathrm{contact}}=\mathbf0
> $$
>
> for each participating label.

This postulate is selected only as proposed Field-Speed priority mathematics.
It is not derived from the constrained-response axiom, positive-separation
ordinary reception, or the source delta, and it is not canonical. Its reset
gives
$\mathbf V_i(T_{\mathrm c}^{+})=\mathbf V_i(T_{\mathrm c}^{-})$ as part of a
velocity-preserving outgoing contact one-jet. It does not supply a right-hand
path or set acceleration to zero on a positive post-contact interval.

The contact-time source measures remain separately labeled and nonzero. The
displayed zero is only the coefficient of the proposed receiver-time atomic
velocity update. It is not a cancellation, principal value, finite part, or
regulator-independent limit of the unresolved receiver-side contact measure.

The proposed postulate is falsified as a viable collinear event rule by an
accepted same-record contact law that produces a nonzero velocity impulse, a
complete census that finds an ordinary isolated contact row at
$T_{\mathrm c}$, proof that the source delta already carries a canonical
partner acceleration, or nonunique event ownership of the contact family and
limiting incoming root.

For arbitrary nonordinary contacts, a complete closed-domain model still
needs the broader interface:

> **Typed Nonordinary Contact Event Postulate.** Every retained boundary
> contact family that is nonisolated, has $D_t=0$, reaches zero separation, or
> otherwise lies outside the ordinary simple-root chart must receive exactly
> one declared event disposition: `inactive`, `terminal`, or
> `active-boundary-measure`. Its event record must identify every owned
> transmitter emission and limiting ordinary root without duplication. If the
> disposition continues the history, the same record must define a unique
> velocity and retained-history update, the outgoing emission record, and a
> locally finite post-event receiver measure. Under a perturbation that
> restores isolated simple roots, the source-provenanced receiver measures
> must split and converge weak-* in a declared topology with uniform local
> total variation, independently of parameterization.

This broader interface remains a requirement, not a selected physical rule. It
does not say which disposition is correct, how an active boundary measure
accelerates a receiver, or whether any noncollinear or otherwise nonordinary
event produces holding, turning, passage, or rebound.

Plainly: the selected narrow postulate books one exact collinear event once and
returns an outgoing contact one-jet with no velocity kick. Other nonordinary
contacts still need their own typed rule. The
partner-contact interval is positive-delay and positive-separation; its first
ordinary-chart failure is nonisolated $D_t=0$ event ownership, not an ordinary
inverse-square infinity that the constrained-response axiom can project.

## Exact threshold alternatives

All alternatives condition on the incoming MEC-007 partner root as an ordinary
root. None may clamp, delete, or reweight that assumed row before the complete
ordinary acceleration sum is formed. Rejection of the MEC-007 input rejects
the corresponding collinear instantiation without selecting among the
boundary alternatives.

### Alternative A — no new boundary root

At first field-speed arrival, retain the canonical incoming partner row in the
raw ledger and apply the declared total-ledger tangent-cone response. Keep the
zero-delay self diagonal excluded and record any co-moving same-transmitter
interval as inactive rather than ordinary. No new root owns the rejected
speed-increasing component.

This alternative supplies the conditional half-open cap segment. With the
selected Minimal Collinear Partner-Contact Postulate, it also supplies a
separately owned zero-impulse event and a velocity-preserving outgoing contact
one-jet. It does not supply a right-hand path or a finite solution on a
positive post-contact interval. A terminal disposition remains a different
possible general event choice.

Falsifiers and consistency checks:

- any accepted open post-contact history claimed from the zero-impulse event
  without a finite retained-history evolution;
- omission of the incoming partner row from the raw ledger;
- a projected boundary acceleration with
  $\mathbf V\cdot\mathbf A_{\mathrm{eff}}>0$;
- a root census contradicting the unique half-open cap-segment inventory; or
- a claim that the outgoing contact one-jet establishes continuation,
  conservation,
  stability, physical realization, or all-time dynamics.

Plainly: this is the smallest outgoing one-jet option for the stated collinear
event. It does not carry the ordinary evolution through the interval after it.

### Alternative B — one separately declared threshold root

Introduce one new threshold object at the field-speed event. It is not an
ordinary causal root unless a positive-delay emission, nonzero separation,
and the required root chart are independently supplied. In the present
collinear geometry those data are absent, so the object must be typed as a
boundary event rather than relabeled self-hit.

The incoming partner row remains in the raw ordinary ledger. The threshold
event may own a declared boundary response to the net rejected
speed-increasing component, but its record must identify that input without
claiming a second copy of the partner wake. At later partner contact, the same
event schema must either aggregate the contact interval with a
subdivision-invariant ownership map or terminate; a single ordinary root
cannot silently replace the continuum.

Falsifiers and consistency checks:

- no unique emission or event provenance for the threshold object;
- counting both the ordinary partner row and the event as independent copies
  of the same received wake;
- dependence of the aggregated event on arbitrary sampling, partition, or
  parameterization of the contact interval;
- failure to reduce to the ordinary ledger when a perturbation separates the
  roots;
- a nonfinite or nonunique outgoing velocity/history record; or
- use of the event name alone to claim self-hit, conservation, passage, or
  rebound.

Plainly: one new event can be considered, but it must be genuinely new
mathematics with one owner. Calling the contact continuum “one root” does not
solve the accounting problem.

### Alternative C — changed evolution or update rule

Retain the ordinary causal roots as the input ledger, then replace the
minimal tangent-cone response with a declared boundary update. Examples
include a history-dependent event map, an active boundary measure, or a
geometrically selected transverse-redirection law. These are distinct model
changes; the speed ceiling does not derive any of them.

The incoming partner row remains represented in the complete raw ledger. The
new update must state how that row and every nonordinary contact family enter
the boundary state, what acceleration or event increment is applied, and how
the outgoing retained history emits new wakes. Any redirected component must
derive both its magnitude and transverse direction from declared
$\mathbb{A}\mathbb{A}\mathbb{A}$ geometry.

Falsifiers and consistency checks:

- failure to reproduce the canonical Master Equation on strict interior
  ordinary charts;
- any accepted update leaving $\|\mathbf V\|>c_f$;
- nonunique outcomes from the same retained history and event ledger;
- silent loss, duplication, or reweighting of root ownership;
- regulator-, timestep-, or partition-dependent limiting histories without a
  declared physical scale;
- no locally finite outgoing root/boundary measure; or
- failure of an independently authored same-record continuation test.

The completed six-path diagnostic adds one concrete falsifier: the minimal
total-ledger projection cannot retain the declared equal-radius,
$120^\circ$, mutually orthogonal reference braid for any of the four relative
polarity orientations. A changed update survives that test only by stating a
different vector equation and passing a new independent closure calculation.

Plainly: this is the broadest alternative and the only class that can encode
turning or another continuing boundary response. It also carries the largest
new-theory and validation burden.

## Corpus dependency inventory

No file in this inventory is changed by FSC-001. The table states what a
future adoption would have to reconcile.

| Dependency class | Exact corpus owners | Required closed-model disposition |
| --- | --- | --- |
| Root law and speed-domain theorems | [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md), [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), [Energy](../../../content/markdown/aaa/dynamics/energy.md) | Preserve the ordinary interior law; replace the open-domain declaration; retain super-field theorems only as open-model comparisons; remove super-field mechanisms from closed-model derivations. |
| Foundational interpretation | [Absolute Time](../../../content/markdown/aaa/foundations/absolute-time.md), [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Comparative Glossary](../../../content/markdown/aaa/archie/comparative-glossary.md), [Research Notebook](../../../content/markdown/aaa/archie/research-notebook.md) | Rewrite the current statement that point-transceiver speed may exceed $c_f$; define boundary-contact terminology only after selection. |
| Binary and assembly hypotheses | [Particle Masses](../../../content/markdown/aaa/assemblies/particle-masses.md), [Dark Matter](../../../content/markdown/aaa/cosmology/dark-matter.md), [Photon Guide](../../../content/markdown/aaa/archie/photon-guide.md) | Reclassify every branch that requires an above-field constituent; no MCB, photon, strong-field, or recycling claim may inherit an excluded branch. |
| Braid mathematics and configuration | [Braid Mathematics](../../../content/markdown/aaa/noether-braid/braid-mathematics.md), [Braid Analysis Methodology](../../../content/markdown/aaa/noether-braid/braid-analysis-methodology.md), [Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md), [Noether Braid Topological Charge](../../../content/markdown/aaa/noether-braid/noether-braid-topological-charge.md), [A3.3 Doubling-Frequency Lock](../../../content/markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md) | Remove super-field retained-memory mechanisms from the closed model; rebuild speed tuples, root strata, assigned exterior speed bounds, and any topological-charge consumer that uses those ledgers. |
| Recovery bridges and interpretation | [Angular Momentum and Spin](../../../content/markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Special Relativity and Noether Braid](../../../content/markdown/aaa/philosophy-history/theory-bridges/special-relativity-noether-braid.md), [Treasure Physics Overlooked](../../../content/markdown/aaa/philosophy-history/treasure-physics-overlooked.md), [Reality, Quantum, and Causality](../../../content/markdown/aaa/quantum/reality-quantum-causality.md) | Rebuild bridge arguments from the selected closed-domain law; do not use observer-level relativity as the primitive ceiling premise. |
| Validation and action diagnostics | [A1 Action Increment Protocol](../../../content/markdown/aaa/validation/simulations/a1-action-increment-protocol.md), [Action Model](../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md), [Analytic Baselines](../../../content/markdown/aaa/validation/simulations/action-energy/analytic-baselines.md), [Causal Set and Delay Geometry](../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md), [Informational Ambiguity](../../../content/markdown/aaa/validation/simulations/action-energy/informational-ambiguity.md), [Self Energy](../../../content/markdown/aaa/validation/simulations/action-energy/self-energy.md), [Self-Interaction Switch](../../../content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md), and [Perspective](../../../content/markdown/aaa/validation/simulations/perspective.md) | Split open- and closed-model protocols; above-field rows remain explicit controls, while new event/update rows require independent oracles and cannot inherit action or account claims. |

Plainly: adoption would require a coordinated corpus migration, not a local
sentence edit. The deepest change is loss of the super-field history mechanism
currently used to motivate self-hit and several candidate assembly branches.

## Priority and prescribed-diagnostic dependencies

| Owner | Current dependency | Closed-model consequence |
| --- | --- | --- |
| [MEC-007](../master-equation-closure/mirror-close-approach-causal-root-boundary.md) | Records an `Awaiting verification` first-field-speed input and unchanged-sharp-law obstruction. | Both remain conditional inputs. The closed model conditionally excludes the newborn super-field self root but must not claim MEC-007 acceptance, continuation, or closure. |
| [MEC-002 through MEC-005](../master-equation-closure/work-queue.md) | Own the causal wake update, finite contact transition, same-update accounts, and complete root-ledger proof obligations. | The new boundary postulate creates additional consumers of these obligations; it advances none of them. |
| [Topological causal-root ledger target](../master-equation-closure/topological-causal-root-ledger-proof-target.md) | Tracks root ownership, folds, and self-root history. | Must acquire typed boundary-event ownership and a perturbative reduction theorem before any closed event can enter the ledger. |
| [Braid configuration chart](../braid-program/configuration-chart.md) and [A1.1 frequency-step action ledger](../braid-program/a1-1-frequency-step-action-ledger.md) | Use a prescribed outer super-field circular layer at diagnostic-only grade. | Existing records stay open-model prescribed diagnostics; the closed model requires a new geometry and a new full root census. |
| [Braid priorities](../braid-program/priorities.md) and [work queue](../braid-program/work-queue.md) | Include at/above-field binary and fold-root stages. | Split equality-event work from inadmissible above-field work; do not infer braid retention from the FSC reference theorem. |
| [Application simulation protocol](../app-simulation/simulations.md) | Requires below, equality, and above-field scan rows, including explicit `not-admitted` rows. | Keep all rows and bind each to its model; omission of above-field controls remains invalid. |
| [Compact prescribed campaign diagnostics](../braid-program/evidence/2026-07-23-compact-monte-carlo-runner-benchmark.md) | Accept super-field prescribed inputs for event-specific root evaluation. | Retain provenance and diagnostic grade; do not treat those rows as closed-domain evolution evidence. |

Plainly: FSC-001 changes no MEC or Braid status. It tells those workstreams
what would have to be split or rederived if a closed model were later chosen.

## EOM solver dependency inventory

The current EOM solver is explicitly bound to
`master_eom_binding/v1`, whose supported domain includes speeds below, equal
to, and above $c_f$. A closed model therefore requires a successor contract
and model binding. It must not mutate the meaning of current receipts or
fixtures.

| EOM dependency | Live owners | Required successor-model work |
| --- | --- | --- |
| Contract and application boundary | [EOM priorities](../app-solver/priorities.md), [Evolution Contract v1](../app-solver/contracts/evolution-contract-v1.md), [Application and Engine Contract](../app-solver/contracts/application-and-engine-contract.md), [Master EOM Binding v1](../app-solver/contracts/master-eom-binding-v1.md), [Independent Dynamical Acceptance Oracle](../app-solver/contracts/independent-dynamical-acceptance-oracle.md) | Add a new contract/model-binding id, closed-domain initial-data rule, threshold-event schema, and independent acceptance obligations. Preserve v1 unchanged. |
| Request, run identity, and persistence | [`CoupledEvolution.hpp`](../../../src/eom/include/architrino/eom/CoupledEvolution.hpp), [`Checkpoint.cpp`](../../../src/eom/src/Checkpoint.cpp) | Bind the selected boundary law and event disposition into request identity, hashes, checkpoints, restart state, and output provenance. |
| Retained-history representation | [`History.hpp`](../../../src/eom/include/architrino/eom/History.hpp), [`History.cpp`](../../../src/eom/src/History.cpp) | Validate closed-domain initial history for the successor binding and represent boundary events and outgoing histories without rewriting legacy histories. |
| Root isolation and completeness | [`CertifiedTraversal.hpp`](../../../src/eom/include/architrino/eom/CertifiedTraversal.hpp), [`CertifiedTraversal.cpp`](../../../src/eom/src/CertifiedTraversal.cpp), [`ExactPairBatch.hpp`](../../../src/eom/include/architrino/eom/ExactPairBatch.hpp), [`ExactPairBatch.cpp`](../../../src/eom/src/ExactPairBatch.cpp), [`BlockExclusion.hpp`](../../../src/eom/include/architrino/eom/BlockExclusion.hpp), [`BlockExclusion.cpp`](../../../src/eom/src/BlockExclusion.cpp) | Preserve all ordinary roots; detect nonisolated contact families; prevent exclusion shortcuts from hiding event members; certify ordinary-to-event reduction under perturbation. |
| Acceleration construction | [`CertifiedAcceleration.hpp`](../../../src/eom/include/architrino/eom/CertifiedAcceleration.hpp), [`CertifiedAcceleration.cpp`](../../../src/eom/src/CertifiedAcceleration.cpp), [`MultiprecisionAcceleration.hpp`](../../../src/eom/include/architrino/eom/MultiprecisionAcceleration.hpp), [`MultiprecisionAcceleration.cpp`](../../../src/eom/src/MultiprecisionAcceleration.cpp), [`JointAccelerationSnapshot.cpp`](../../../src/eom/src/JointAccelerationSnapshot.cpp), [`JointSharpRow.hpp`](../../../src/eom/include/architrino/eom/JointSharpRow.hpp), [`JointSharpRow.cpp`](../../../src/eom/src/JointSharpRow.cpp), [`DelayedRootSensitivity.hpp`](../../../src/eom/include/architrino/eom/DelayedRootSensitivity.hpp), [`DelayedRootSensitivity.cpp`](../../../src/eom/src/DelayedRootSensitivity.cpp), [`SharpAccelerationSensitivity.hpp`](../../../src/eom/include/architrino/eom/SharpAccelerationSensitivity.hpp), [`SharpAccelerationSensitivity.cpp`](../../../src/eom/src/SharpAccelerationSensitivity.cpp) | Form the complete raw ordinary ledger first, then apply the selected total-ledger response; add boundary-event contributions only with unique ownership and independent sensitivity checks. |
| Coupled evolution and acceptance | [`CoupledEvolution.cpp`](../../../src/eom/src/CoupledEvolution.cpp) | Add field-speed event localization, candidate rejection before domain escape, deterministic event/update handling, finite outgoing history, restart parity, and atomic acceptance. No per-row clamp is admissible. |
| Display-only regime reporting | [`DisplayEvaluation.cpp`](../../../src/eom/src/DisplayEvaluation.cpp) | Preserve open-model speed labels and add explicit model-binding display. Display classification cannot decide event admission or evidence status. |
| Process and fixture interfaces | [`eom_borg_shadow_cli.cpp`](../../../src/eom/native/eom_borg_shadow_cli.cpp), [`eom_native_fixture_cli.cpp`](../../../src/eom/native/eom_native_fixture_cli.cpp), [`eom_native_acceleration_fixture_cli.cpp`](../../../src/eom/native/eom_native_acceleration_fixture_cli.cpp), [`eom_native_evolution_fixture_cli.cpp`](../../../src/eom/native/eom_native_evolution_fixture_cli.cpp) | Reject model-binding mismatches at the process edge and add separate closed-model fixtures. Preserve current field-, super-field-, and fold controls under v1. |
| Independent oracle | [`certified_history.py`](../../../scripts/eom/oracle/certified_history.py), [`phase4_acceptance.py`](../../../scripts/eom/oracle/phase4_acceptance.py) | Author a closed-model oracle independently of production event/update code. Keep the current super-field controls for v1. |
| Direct regression controls | [`test_eom_oracle_certified_acceleration.py`](../../../tests/test_eom_oracle_certified_acceleration.py), [`test_eom_oracle_root_certification.py`](../../../tests/test_eom_oracle_root_certification.py), [`test_eom_native_coupled_evolution.py`](../../../tests/test_eom_native_coupled_evolution.py) | Retain v1 tests for the field-speed rail, unclamped super-field receiver, super-field endpoint proof, and inertial parity. Add successor-binding tests rather than changing their expected meaning. |
| Prescribed consumer tests | [`ideal-braid-runtime.test.js`](../../../tests/ideal-braid-runtime.test.js), [`assembly-configuration-explorer-runtime.test.js`](../../../tests/assembly-configuration-explorer-runtime.test.js), [`compact-family-sweep-analyzer.test.js`](../../../tests/compact-family-sweep-analyzer.test.js) | Preserve recorded regime classification; bind new closed-model results explicitly and prohibit evidence promotion from prescribed paths. |

Minimum successor validation includes:

1. strict-interior parity with `master_eom_binding/v1`;
2. rejection of closed-model initial histories containing
   $\|\mathbf V\|>c_f$;
3. exact field-speed rail and inactive co-moving self-contact provenance;
4. complete incoming partner ledger before total-ledger response;
5. event localization for the collinear partner-contact interval;
6. one uniquely owned collinear contact record with no ordinary contact row,
   source-delta partner acceleration, or nonzero contact velocity impulse;
7. exact reset guard, left traces, velocity-preserving outgoing contact
   one-jet, and codomain at that event;
8. finite, unique outgoing history on an open interval for any claimed
   continuing disposition;
9. timestep, precision, partition, and restart convergence;
10. the prescribed unaccelerated straight-trace negative control; and
11. independent reproduction of the six-path root theorem and the
    minimal-response vector-closure negative.

Plainly: the present EOM solver is designed to accept above-field histories.
A closed model needs a new identity and new event machinery, while the current
solver and its tests remain the reference implementation of the open model.

## Exact decision choices

Inside FSC-001, the operator has selected the Minimal Collinear
Partner-Contact Postulate as a proposed review target. That selection gives the
exact mirror-collinear event a zero-impulse, velocity-preserving outgoing
contact one-jet. It does not select a right-hand path or adopt the closed
velocity domain itself.

Four broader operator-level choices therefore remain:

1. **Retain the canonical open domain.** Make no foundational or EOM change.
   The FSC results remain bounded comparison mathematics.
2. **Choose a terminal closed model.** Adopt the closed ball, total-ledger
   tangent-cone response on finite ordinary charts, inactive co-moving
   self-contact classification, and terminal disposition at the first
   unresolved nonordinary contact. This does not provide all-time dynamics.
3. **Choose a closed model with typed events.** Start from the selected narrow
   collinear contact convention, then supply provenance, aggregation, response,
   outgoing history, and perturbative reduction for every other admitted
   nonordinary event. No event becomes an ordinary root by declaration.
4. **Choose a closed model with a changed boundary update.** Supply the full
   native update law, including any transverse geometry, and meet the expanded
   corpus and EOM validation burden above.

No broader foundational choice is selected by this packet. In particular, the
selected collinear event postulate does not select rebound, sticking,
transverse redirection, termination, a general passage rule, or an open
post-contact solution.

Plainly: the compatibility work is complete. The next step is FSC-006
distributional formulation of the received contact measure, not a
well-posedness review or a claim that one narrow event coefficient has
completed the dynamics.

## No-escape audit

The separate
[Field-Speed Ceiling No-Escape Audit](no-escape-houdini-audit.md) traces each
canonical premise, the complete proposed constrained-response axiom,
conditional input, derived result, and diagnostic through its operation,
ordinary-chart reduction, and root or event ownership. Its negative guards
verify that the axiom leaves the strict interior equation unchanged, preserves
every ordinary root until after the complete raw sum is formed, does not infer
equality or nonisolated contact from projection, and imports no desired
open-interval continuation, retention, $H$, conservation, Planck-scale, or
Lorentz result.

Plainly: the audit closes argument shortcuts, not the dynamics. One exact
collinear event is now explicitly postulated; the general event law and
open-interval continuation remain missing.

## Completion and claim boundary

FSC-001 is complete as an evidence-bounded compatibility map:

- **unchanged:** primitive causal geometry, the regular interior Master
  Equation, the MEC-007 conditional incoming input, conditional cap segment,
  contact obstruction, local-existence verdict, exact thirty-root theorem,
  and negative minimal-response diagnostic;
- **removed or reclassified under a closed model:** all admissible
  super-field histories, their self-hit-memory mechanisms, dependent
  branch hypotheses, and their use as closed-model diagnostics;
- **proposed regular-chart foundation:** one Complete Constrained-Response
  Axiom containing the closed domain, exact interior identity, and
  least-change total-ledger boundary response;
- **selected proposed collinear event postulate:** no ordinary contact row,
  source bookkeeping rather than partner acceleration at the point delta, and
  $\Delta\mathbf V_{\mathrm{contact}}=\mathbf0$, yielding only a
  velocity-preserving outgoing contact one-jet;
- **required general event-domain interface:** the Typed Nonordinary Contact
  Event Postulate for all contacts outside that exact collinear scope; and
- **required distributional formulation:** source-provenanced receiver-side
  contact and competing-stratum measures, a BV/Radon topology, and a
  perturbative weak-limit theorem or counterexample before FSC-005; and
- **decision choices:** retain the open model, choose a terminal closed model,
  extend typed event coverage, or derive a changed boundary update.

This packet does not adopt a field-speed ceiling, alter canonical
$\mathbb{A}\mathbb{A}\mathbb{A}$ prose, establish a general or open-interval
continuation, claim conservation or stability, establish physical realization,
retain a braid, advance MEC, or move a closure score.

Closure goal: complete FSC-006 and pass one narrow
distributional-formulation review while preserving the canonical open model
and the unresolved post-contact evolution problem.
