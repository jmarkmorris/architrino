# Adaptive Cubic-Medium Kinematics And Ledger Contract

## Status And Decisions

- Kind: priority-side pre-EOM kinematics, provenance, and directional-adjudication contract
- Created: 2026-08-25
- Claim level: derived geometry and rank-selection lemma; measured implementation checks; candidate-only medium architecture
- Parent seed: [F6c Cubic Lattice](f6c-cubic-lattice.md)
- Exploration source: [Session 24](brainstorming.md#session-24--locally-deformable-twisting-and-reorganizing-cubic-medium-2026-08-25)
- Structural consumer: [adaptive cubic-medium kinematics](../../../scripts/mapping-electromagnetism/adaptive-cubic-medium-kinematics.mjs)
- Focused tests: [adaptive cubic-medium kinematics tests](../../../tests/adaptive-cubic-medium-kinematics.test.js)

**Closure-goal 1 decision: closed at the candidate-architecture and structural-contract level.** The rigid two-history response ansatz is superseded as the next moving-medium candidate by site-local center, orbit, phase, and orientation histories. Persistent member identity is separated from time-dependent neighbor classification. A neighbor change advances only through a rank-gap certificate, reciprocal changed-edge incidence, complete transition accounts, and a later retained-history test. The exact stationary checkerboard and the rejected two-history runs remain valid controls and evidence records; they are not rewritten as adaptive-medium successes.

Plainly: the new candidate allows different regions to bend, twist, and rearrange. It does not let an analysis relabel a failed trajectory as a new neighbor pattern without proving who moved, when the neighborhood changed, and where every causal and conservation-facing account went.

**Closure-goal 2 decision: not yet adjudicable from physical records.** The current repository has no accepted adaptive cubic background with a one-period EOM history return, no closed periodic or exterior-tail boundary for that background, and no matched retained Physical Observer assembly plus readout-map records along $[100]$, $[110]$, and $[111]$. The structural adjudicator therefore returns `directional_campaign_blocked`. The literal cubic architecture remains `candidate_only`; it is neither accepted nor rejected by a physical-receiver directional campaign.

Plainly: the decision rule now exists, but the measurements that could choose between adaptive cubic order and replacement do not. Running directional disturbances against the already rejected background would manufacture a response claim with no reference state.

## Authority Boundary

The Euclidean void and absolute time remain the substrate. Architrino identities, polarities, positions, velocities, and causal path histories remain the EOM authority. A site label, center history, orbit frame, neighbor relation, deformation tensor, or Physical Observer readout is derived bookkeeping. None is a pin, primitive bond, added acceleration law, or independent substance.

The contract excludes:

- a Hooke-like architrino law or fitted spring constant;
- nearest-neighbor-only dynamics;
- a primitive rotating frame or imported frame-dragging mechanism;
- an externally imposed neighbor swap;
- a claim that kinematic graph change is a retained branch;
- linear stability analysis about a background that has not passed its EOM return obligation;
- global isotropy inferred from three directions or one scalar readout; and
- electromagnetic, gravity, Lorentz, modulus, wave-speed, or Noether-sea identity claims before the same-record source, medium, receiver, and boundary ledgers close.

Plainly: this document defines how to describe and test a flexible candidate. It does not add flexibility to the Master Equation or declare that the candidate exists.

## Persistent Identity And Site-Local History

Choose one reference ordering at $T_0$ with integer label $\mathbf g\in\mathbb Z^3$ and checkerboard polarity

$$
s_{\mathbf g}=s_0(-1)^{g_x+g_y+g_z},
\qquad
s_0\in\{+1,-1\}.
$$

The map $\mathbf g\mapsto i(\mathbf g)$ binds a reference label to one persistent architrino identity. It is injective and does not change during deformation or reorganization. The label is provenance, not a permanent spatial socket.

For one declared history window, decompose the actual member position as

$$
\mathbf X_{\mathbf g}(T)
=
\mathbf Y_{\mathbf g}(T)
+\rho_{\mathbf g}(T)
\left[
\mathbf p_{\mathbf g}(T)\cos\theta_{\mathbf g}(T)
+\mathbf q_{\mathbf g}(T)\sin\theta_{\mathbf g}(T)
\right]
+\mathbf e_{\mathbf g}(T),
$$

where $\mathbf Y_{\mathbf g}$ is the derived local center history, $(\mathbf p_{\mathbf g},\mathbf q_{\mathbf g})$ is an orthonormal local plane frame, $\rho_{\mathbf g}\ge0$, and $\mathbf e_{\mathbf g}$ is the declared reconstruction residual. Every record binds a center-estimator identifier, history fingerprint, error enclosure, and window. The decomposition has no authority when the estimator is missing, the frame loses rank, or the residual exceeds its frozen bound.

Plainly: the EOM solver evolves $\mathbf X_{\mathbf g}$. The center and orbit variables summarize that worldline over a declared window. An analyst may not move the center to make a desired deformation look cleaner.

There is a plane-phase representation freedom:

$$
(\mathbf p_{\mathbf g},\mathbf q_{\mathbf g},\theta_{\mathbf g})
\longmapsto
(\mathbf p'_{\mathbf g},\mathbf q'_{\mathbf g},\theta_{\mathbf g}-\alpha_{\mathbf g}),
$$

where $(\mathbf p'_{\mathbf g},\mathbf q'_{\mathbf g})$ is the original plane frame rotated by $\alpha_{\mathbf g}$ inside its plane. A comparison must either fix this representation with one estimator or use only invariant quantities such as the plane normal, reconstructed position, or phase differences transported by a declared rule.

Plainly: rotating the two arrows drawn inside one orbit plane while shifting the phase does not change the actual position. A directional residual must not be created by choosing different arrow conventions in different runs.

## Local Common And Polarity-Differential Coordinates

Let $W_{\mathbf g\mathbf h}\ge0$ be one frozen local smoothing window. Normalize its positive- and negative-polarity weights separately and define

$$
\mathbf u_{\mathbf g,+}
=
\frac{\sum_{\mathbf h:s_{\mathbf h}=+1}W_{\mathbf g\mathbf h}\mathbf u_{\mathbf h}}
{\sum_{\mathbf h:s_{\mathbf h}=+1}W_{\mathbf g\mathbf h}},
\qquad
\mathbf u_{\mathbf g,-}
=
\frac{\sum_{\mathbf h:s_{\mathbf h}=-1}W_{\mathbf g\mathbf h}\mathbf u_{\mathbf h}}
{\sum_{\mathbf h:s_{\mathbf h}=-1}W_{\mathbf g\mathbf h}},
$$

$$
\mathbf u_{\mathbf g,\mathrm c}
=
\frac12(\mathbf u_{\mathbf g,+}+\mathbf u_{\mathbf g,-}),
\qquad
\mathbf u_{\mathbf g,\mathrm d}
=
\frac12(\mathbf u_{\mathbf g,+}-\mathbf u_{\mathbf g,-}).
$$

Here $\mathbf u_{\mathbf g}=\mathbf Y_{\mathbf g}-d\mathbf g$ only after one reference origin and orientation are frozen. The common/differential split is a local translation-symmetry diagnostic. It is not a gravity/electric identity and cannot be evaluated where either polarity weight vanishes.

Plainly: the old ansatz assigned one displacement to every positive site and another to every negative site. The new chart computes those combinations locally, so a disturbance can vary across the population without erasing the polarity structure.

## Local Deformation Geometry

While all six reference neighbors remain present, define the centered local deformation-gradient columns by

$$
F_{\mathbf g}\hat{\mathbf e}_a
=
\frac{
\mathbf Y_{\mathbf g+\hat{\mathbf e}_a}
-
\mathbf Y_{\mathbf g-\hat{\mathbf e}_a}
}{2d},
\qquad
a\in\{x,y,z\}.
$$

The exact metric-deformation diagnostic and one rotation-facing diagnostic are

$$
E_{\mathbf g}
=
\frac12(F_{\mathbf g}^{\mathsf T}F_{\mathbf g}-I),
\qquad
\Omega_{\mathbf g}
=
\frac12(F_{\mathbf g}-F_{\mathbf g}^{\mathsf T}).
$$

$E_{\mathbf g}$ vanishes under an exact rigid rotation and measures geometry rather than a constitutive stress. $\Omega_{\mathbf g}$ is an antisymmetric rotation-facing diagnostic; at finite deformation it is not itself the unique rotation from a polar decomposition. No modulus, energy, or restoring acceleration follows from either tensor.

Plainly: $E_{\mathbf g}$ says whether local lengths and angles changed. $\Omega_{\mathbf g}$ says whether the local map contains turning. Neither says the medium resists that motion or will return afterward.

After a certified reclassification, the old six-reference-neighbor chart is not silently continued. The new branch either declares a new locally conditioned chart with its provenance map or reports the affine diagnostic as unavailable. This prevents a neighbor swap from being hidden inside a matrix whose columns changed meaning.

## Cutoff-Robust Neighbor Classification

Fix the reference coordination number at six. For receiver member $i$, let $r_{ij}$ be the distance between derived center histories at one recorded time. If center-error radii are $\epsilon_i$ and $\epsilon_j$, use the enclosure

$$
R_{ij}
=
\left[
\max(0,r_{ij}-\epsilon_i-\epsilon_j),
r_{ij}+\epsilon_i+\epsilon_j
\right].
$$

Sort by nominal distance only to nominate six candidates. Let

$$
U_{i,6}
=
\max_{j\in N_i^{(6)}}\sup R_{ij},
\qquad
L_{i,7}
=
\min_{k\notin N_i^{(6)},\,k\ne i}\inf R_{ik},
$$

and define the certified rank gap

$$
\Gamma_i=L_{i,7}-U_{i,6}.
$$

The directed six-neighbor identity is certified only when $\Gamma_i>\gamma_{\mathrm{rank}}$, where $\gamma_{\mathrm{rank}}$ is a predeclared numerical separation floor rather than a physical interaction cutoff.

Plainly: the test never says “everything within radius $r$ is connected.” It asks whether the six closest center histories are unambiguously separated from every competitor after their numerical uncertainty is included.

### Rank-Gap Uniqueness Lemma

**Lemma.** If $\Gamma_i>0$, every realization of the center positions inside the declared error balls has the same six nearest identities $N_i^{(6)}$.

**Proof.** Every nominated neighbor has realized distance no greater than $U_{i,6}$. Every omitted member has realized distance no less than $L_{i,7}$. Since $U_{i,6}<L_{i,7}$, no omitted member can exchange rank with a nominated member. Therefore the selected identity set is unique throughout the full error product.

Claim grade: **derived**. The lemma is falsified by one admissible realization inside the declared center-error balls that changes the first six identities despite $\Gamma_i>0$.

Plainly: a positive certified gap makes the neighbor names insensitive to the remaining center uncertainty. When the intervals overlap, the correct result is unresolved.

## Neighbor-Reclassification Event

A candidate reclassification event for member $i$ between $T_-$ and $T_+$ requires:

1. the same persistent member identity, polarity, and reference label at both endpoints;
2. certified neighbor identities at both endpoints;
3. at least one removed and one added identity;
4. reciprocal changed-edge incidence: a removed neighbor certified $i$ before the event, and an added neighbor certifies $i$ after the event;
5. a bracket or dwell record showing that the change is not an unresolved instantaneous rank tie;
6. complete causal roots, pair clearance, speed allocation, and boundary history;
7. closed action-, energy-, momentum-, angular-momentum-, source-recoil-, and exterior-history accounts; and
8. a later retained-history test of the proposed post-event branch.

The structural ledger emits one of four decisions:

| Decision | Meaning | Claim boundary |
| --- | --- | --- |
| `neighbor_identity_unresolved` | sixth and seventh identities overlap or changed-edge reciprocity fails | no topology or reorganization claim |
| `no_reclassification` | both certified neighbor sets agree | deformation may still exist |
| `kinematic_reclassification_only_missing_accounts` | graph change is geometrically certified but at least one mandatory account is absent | no lawful branch-transition claim |
| `branch_reorganization_admissible_for_retention_test` | geometry, identities, and transition accounts close | still not retained until the later history return passes |

Plainly: “admissible” means the event is well enough accounted for to test the new branch. It does not mean the new branch survives.

## Elastic Return, Excitation, Reorganization, And Failure

After a matched source-on/source-off history, classify the result only after the last direct source wake and declared boundary tail have cleared the probe window:

| Outcome | Neighbor ledger | History return | Meaning |
| --- | --- | --- | --- |
| elastic return | original certified graph returns | original background history returns within the frozen relation and refinement tolerance | reversible response candidate |
| persistent excitation | original certified graph remains | nonzero bounded residual persists | excitation candidate, not elastic return |
| retained reorganization | a new certified graph and transition ledger close | the new history repeats under its declared return action | branch-reorganization candidate |
| failure | roots, clearance, identity, boundary, accounts, or return fail | unavailable | no response interpretation |

Plainly: spring-back, ringing, rearrangement, and breakdown are different verdicts. A source-off displacement alone cannot choose among them.

## Adaptive Orientation Diagnostics

For local orbit-plane normal $\mathbf n_{\mathbf g}=\mathbf p_{\mathbf g}\times\mathbf q_{\mathbf g}$ and normalized weights $w_{\mathbf g}$, define the orientation-order tensor

$$
Q_{ij}
=
\sum_{\mathbf g}w_{\mathbf g}n_{\mathbf g,i}n_{\mathbf g,j}
-\frac13\delta_{ij}.
$$

For a propagation direction $\hat{\mathbf k}$, define the fourth-order directional diagnostic

$$
H_4(\hat{\mathbf k})
=
\sum_{\mathbf g}w_{\mathbf g}
(\mathbf n_{\mathbf g}\mathbin{\cdot}\hat{\mathbf k})^4
-\frac15.
$$

The subtractions are the values for a continuously isotropic distribution of unoriented plane normals. $Q=0$ and $H_4=0$ are orientation-distribution diagnostics only. They do not prove isotropic propagation because the acceleration response also depends on positions, phases, polarities, roots, histories, and receiver coupling.

Plainly: balanced plane normals can remove an obvious preferred direction from the orientation census while the actual disturbance still travels differently through the underlying center and wake geometry.

## Matched Directional Campaign Contract

No directional response row is consumer-ready until its background has passed a one-period EOM history return under the same boundary treatment. The campaign then requires primary and refined rows along $[100]$, $[110]$, and $[111]$ with:

- one campaign, background, source, receiver, boundary, and readout-map fingerprint;
- equal Euclidean source-to-receiver distance;
- identical source and receiver internal orientations relative to the transported local frame, with any required rotation stated explicitly;
- $c_f=1$ and one frozen numerical contract;
- complete causal roots and closed boundary history;
- one retained Physical Observer assembly whose readout map is fixed before results are inspected; and
- normalized readouts for arrival, growth or attenuation, dispersion, longitudinal/transverse leakage, polarization, and source-off residual.

For normalized readout $R_a(\hat{\mathbf k})$, define

$$
\Delta_a^{\mathrm{dir}}
=
\max_{\hat{\mathbf k}\in\{[100],[110],[111]\}}R_a(\hat{\mathbf k})
-
\min_{\hat{\mathbf k}\in\{[100],[110],[111]\}}R_a(\hat{\mathbf k}),
$$

and let $\Delta_a^{\mathrm{ref}}$ be the maximum primary-to-refined change for that readout. Every tolerance $\epsilon_a$ is a predeclared recovery or apparatus tolerance, not a universal substrate constant.

Plainly: the comparison changes direction and resolution, not the medium, source, detector, distance, or analysis rule.

The directional adjudicator returns:

- `directional_campaign_blocked` when any background, root, boundary, physical receiver, matching fingerprint, refinement row, or normalized readout is absent;
- `directional_campaign_blocked` when any $\Delta_a^{\mathrm{ref}}$ exceeds its frozen tolerance, because a resolution-dependent result cannot carry a physical architecture verdict;
- `literal_cubic_architecture_rejected_for_claimed_isotropic_records` when refinement closes but at least one $\Delta_a^{\mathrm{dir}}$ exceeds its frozen tolerance; or
- `adaptive_cubic_visibility_suppressed_within_declared_records` when every declared residual is within tolerance.

A bounded null does not prove global isotropy. A failure rejects the literal cubic architecture only for the claimed isotropic record family under that accepted background. Replacement may use dynamically oriented domains, a noncubic reference order, an assembly population without persistent lattice sites, or another architecture selected by the EOM; the contract does not choose one in advance.

Plainly: three directions can kill an isotropy claim, but they cannot prove equality in every direction, at every scale, for every detector.

## Physical Observer Record Boundary

The [Observer Framework](../../../content/markdown/aaa/spacetime/observer-framework.md) requires a Physical Observer record to retain its readout, apparatus-response kernel, modulation protocol, calibration covariance, nuisance family, and boundary-wake record. The directional campaign therefore cannot substitute point-position displacement for a clock, ruler, detector, or apparatus readout.

The current [F6c Cubic Lattice](f6c-cubic-lattice.md#cubic-symmetry-and-anisotropy) packet correctly states that clock- or ruler-facing anisotropy is not reported until physical clock or ruler assemblies are included. No accepted adaptive background or matched physical-receiver record is present in the live packet. The structural consumer's empty-record audit consequently returns:

```json
{
  "decision": "directional_campaign_blocked",
  "responseClaim": "not_available"
}
```

Plainly: this is an instrument-reach boundary, not evidence that directional differences are absent.

### Live EOM And Receiver Readiness Audit

The 2026-08-25 source audit found that the current [attractor-ensemble harness](../../../scripts/eom/attractor-ensemble-harness.cpp) exposes one cubic seed family, `f6c-cubic-lattice-o0-v1`. That family records the prehistory as `antiphase-global-plane` and emits `boundaryStatus: finite_replicated_diagnostic`. No adaptive site-local seed/history input or `periodic_exact` cubic operator is present on that path. The EOM API's [NativeReceiverAcceleration](../../../src/eom/include/architrino/eom/CertifiedAcceleration.hpp) is an acceleration record for one receiving architrino path. It is not a retained Physical Observer assembly, apparatus-response kernel, calibration record, or readout map.

Claim grade: **measured source-path audit**. The audit is falsified by a live EOM code path that accepts the site-local history contract with a closed exact-periodic or controlled-tail boundary, or by a retained apparatus consumer that emits the required matched readout records. A class or field using the word `receiver` does not falsify the audit unless it carries the Physical Observer obligations.

Plainly: the EOM solver can calculate what acceleration reaches an individual architrino. The requested directional decision needs a repeating adaptive population and a physical detector made from retained assemblies. Those are different capabilities, and the second is not implemented here.

## Structural Implementation Checks

The focused structural tests establish eight implementation facts:

1. the exact cubic fixture recovers the six axis-neighbor identities, a positive sixth-versus-seventh gap, $F=I$, and zero metric strain;
2. an independently declared affine shear is reconstructed to numerical tolerance without assigning a modulus;
3. a certified neighbor change with missing accounts remains kinematic-only;
4. a synthetic fully populated transition ledger advances only to a retention test;
5. absent physical records fail closed, while a direction-dependent synthetic record rejects the claimed isotropic record family;
6. a matched synthetic null stays explicitly bounded to its declared records;
7. population replacement is rejected as identity loss and a neighbor change remains incomplete without bracket-or-dwell timing evidence; and
8. mismatched apparatus/readout fingerprints and refinement residuals above tolerance block adjudication rather than producing an architecture verdict.

Claim grade: **measured implementation checks**. The synthetic records test the structural consumer, not the Master Equation, a physical medium, a retained branch, or a receiver law. The checks are falsified by a focused test failure or an independently implemented evaluation that disagrees with the displayed definitions.

Plainly: the implementation knows how to reject incomplete evidence and how to calculate the declared geometry. It has not generated the evidence needed for the physical decision.

## Current Closure Boundary

The rigid two-history moving seed is no longer the next response candidate. The adaptive site-local contract is ready to consume an EOM history, but no such history currently satisfies the prerequisite background return and boundary obligations. The physical-receiver directional decision is therefore blocked upstream, before response execution.

The next admissible artifact is not a directional response run. It is one adaptive-background existence packet that supplies:

1. site-local history reconstruction with bounded residuals;
2. complete roots, identity, clearance, and speed records;
3. exact periodic images or a controlled exterior-tail boundary;
4. certified neighbor identities or explicit unresolved intervals;
5. one-period history return for the unperturbed adaptive background; and
6. a fixed retained Physical Observer candidate and readout-map fingerprint for later use.

Plainly: first show that the flexible medium exists and repeats. Then show that a real detector inside it reads the same result in different directions.

Closure goal: produce one root-complete adaptive-background existence record with a closed boundary and a retained Physical Observer candidate; only that record can unlock the matched $[100]/[110]/[111]$ decision between suppressed cubic visibility and replacement of the literal cubic architecture.
