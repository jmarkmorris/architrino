# Braid Mathematics

Six architrinos interacting through delayed causal wakes form a hard dynamical problem: the state is an entire path history, the per-hit accelerations arrive along causal roots that must be solved for, and no general closed-form solution exists. This chapter collects what can nevertheless be established exactly — by symmetry, geometry, and kinematics — before any support-band structure is chosen and before any branch is claimed to persist. The machinery here is core-agnostic: every braid realization in the [Noether Braid](noether-braid.md) family consumes it, and none of it asserts branch retention.

The results divide by strength, and the division is stated with each result. Exact derivations include the constant-lag reduction of the rotating-wave ansatz and the algebraic consequences of a declared transverse speed-budget premise. Scoped negative results include the anti-damping family, which rejects specific fixed-coordinate charts without rejecting the braid program. The causal-root event analysis distinguishes integer root counts from physical action amounts. The Accessory Configuration moment analysis remains a hypothesis, and the eigen-braid spectrum system remains a theorem target. Claim levels travel with their statements throughout. The phase-compensated equal-geometry locus-specific invariant channels, two-ring geometry, dipole identity, momentum-screw alignment, and return-response analysis live in [Coordinate-Axis Six-Point Symmetry and Return Response](coordinate-axis-six-point-symmetry-and-return-response.md).

## Document Role

This chapter owns the shared mathematical machinery of the braid family: the substrate levels and speed hierarchy with the transverse speed-budget lemmas, the spiral-helical motion picture and mass thesis, the hinge equation sketch, the bounded-weight inverse-square escape lemma, the acceleration-gradient comparison, the scoped anti-damping negative results, the eigen-braid spectrum framing, the distinction between root events and action amounts, and the Accessory Configuration moment analysis. The neutral six-body base lives in [Noether Braid](noether-braid.md#neutral-braid-base); prescribed coordinates and definitions live in [Braid Taxonomy](braid-taxonomy.md), [Braid orthogonal-axis three-binary configurations](3d-braid-assemblies.md), and [Braid coincident-axis three-binary configurations](3d-braid-assemblies.md). The realization-independent proof obligations live in [Braid Recovery Requirements](braid-recovery-requirements.md). Realization chapters state which of this machinery their configurations inherit and what fixture-specific evidence they add.

**Represented-history atlas boundary.** An atlas row describes a declared retained history, not an unbounded past. It must name the retained interval, prehistory, complete transmitter inventory, and any fixed spatial enclosure. On a bounded history whose transmitters remain uniformly below $c_f$, whose pairwise separations stay positive, and whose root inventory is complete, the causal-root map is transverse and finite. A nontrivial same-transmitter root is excluded on the strictly sub-field-speed interval, and the represented history can be reconstructed across time from its declared charts while those hypotheses persist.

These statements do not bound an omitted finite-width Gaussian tail, cover an undeclared transmitter, or extend automatically to a drifting enclosure or an unbounded past. Without a separately checked quantitative tail theorem, the certified quantity stops at the declared retained-interval integral.

Scalar rows extracted from the history are diagnostics. They may distinguish a declared negative control, but they do not by themselves classify topology, prove persistence or stability, identify a physical assembly, or select a particle interpretation. Those conclusions require their own branch and reconstruction certificates. A finite history can be classified exactly within its stated window. Nothing in that classification silently supplies the missing past or turns a diagnostic number into a physical fate.

## Substrate and Effective Levels

Braid dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $T$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Noether braids, their coupled binary layers, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Observer-inference exports | Rest mass, photon propagation, reconstructed kinematics, geodesics, and horizon behavior as later reconstructed by assembly-built observers. |
| Inference and closure status | Mathematical closures that remain to be derived before effective claims can be treated as proved rather than reconstructed. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter only as observer-level bookkeeping reconstructed downstream from Noether sea state variables and assembly response.

## Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf X,T)$ | Noether sea dressed assembly-channel propagation speed used only after a downstream observer-channel map has been declared. |
| $c_\gamma(\mathbf X,T)$ | Local photon-channel speed; equality with $c_{\text{eff}}(\mathbf X,T)$ is a photon-channel closure target for the working observer-level photon branch, not a definition. |
| Locally measured light speed | The operational speed reconstructed downstream from assembly periods, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ belongs to Noether sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level periods, rulers, or photons must declare its dressing map outside the primitive branch calculation.

### Transverse Causal Budget Lemma

When a retained moving branch is exported to a clock, ruler, or photon-synchronization channel, the branch must declare the channel speed used by that export. The primitive branch chart solves causal roots with $c_f$. A dressed clock/ruler comparison uses $c_\star=c_{\text{eff}}(\mathbf X,T)$ after the Noether sea dressing map has been declared, while a photon synchronization comparison uses its declared photon-channel speed $c_\gamma(\mathbf X,T)$. The weak homogeneous measured limit may identify the declared channel speed with $c_0$ only after the clock, ruler, and photon rows collapse to one observer-accessible speed within the preferred-frame leakage budget.

For a branch whose response center moves through the local Noether sea with material group velocity $\mathbf w$, the transverse budget is
$$
c_\star^2
=
\|\mathbf w\|^2+c_{\perp}^2,
\qquad
\beta_\star=\frac{\|\mathbf w\|}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-813718eb5b450e1e)

Thus an observer-export clock or ruler row must extract
$$
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star}
$$

[View →](../../../../equation-mapping.html#corpus-equation-06d44856fc2aaa8a)

from the same retained branch record, not append it as an independent Lorentz factor. The lemma fails as a citation target if a calculation solves primitive roots with $c_f$ and then reports an observer-level clock, ruler, or photon speed without the declared dressing map, or if the clock, ruler, and photon rows are sourced from different branch ledgers.

### Transverse Internal-Motion Speed-Budget Premise and Consequence

Let one site's native velocity be decomposed into group translation and internal motion,

$$
\mathbf V_i
=
\mathbf V_{\mathrm{grp}}+\mathbf v_i^{\mathrm{int}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8772dafac2550ec6)

The exact native speed identity is

$$
\|\mathbf V_i\|^2
=
\|\mathbf V_{\mathrm{grp}}\|^2
+
\|\mathbf v_i^{\mathrm{int}}\|^2
+
2\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4a9a2a8b27b58b89)

If the internal motion is transverse to the group translation at every instant, then the cross term vanishes and the site speed is the exact quadrature

$$
\|\mathbf V_i\|^2
=
u^2+v_{\mathrm{int},i}^2,
\qquad
u=\|\mathbf V_{\mathrm{grp}}\|,
\qquad
v_{\mathrm{int},i}=\|\mathbf v_i^{\mathrm{int}}\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-358a1ee6eb1d1c92)

If a branch additionally declares the physical premise that the total site speed is pinned to $\|\mathbf V_i\|=\beta_{\mathrm{pin}} c_f$, the available internal speed follows algebraically as

$$
v_{\mathrm{int},i}(u)
=
\sqrt{\beta_{\mathrm{pin}}^2c_f^2-u^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4cb81593b9f3a036)

The quadrature and square-root relation are derived consequences of the transverse-motion and pinned-speed premises. The pinning of $\beta_{\mathrm{pin}}$ is a guessed branch hypothesis, not an established retention mechanism or a consequence of the canonical interaction law. Deriving or rejecting that premise from a retained branch remains open. The phase-compensated equal-geometry locus body-diagonal rotating channel and the coincident-axis three-binary locus axial screw chart are two realizations of the transverse geometry; neither realization makes fixed total site speed automatic. A record with $\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}\neq0$ falsifies use of the quadrature for that site and must retain the cross term, which generally makes the maximum speed phase dependent. A retained transverse record whose total site speed varies independently of $u$ falsifies the pinned-speed premise.

The same pinned-speed hypothesis appears in the retained coincident-midpoint orthogonal-axis locus scaling material of [coincident-midpoint orthogonal-axis locus Dynamics](zero-axial-offset-three-binary-dynamics-and-interpretation.md#retention-and-interpretation): a branch that holds an indexed internal speed fixed while accepting action transactions is forced onto the $R_a f_a\approx\text{constant}$ product law. The shared lemma shows how the hypothesis would also constrain transport; it does not establish that coincident-midpoint orthogonal-axis locus, phase-compensated equal-geometry locus, or coincident-axis three-binary locus satisfies the pinning condition.

## Spiral-Helical Motion Picture

A resting Noether braid is a phase-locked structure of coupled binary layers. When the braid moves with group velocity (center-of-mass convention) $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. For a translating assembly, a causal wake sent between partners or layers reaches a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, group velocity is encoded as internal geometry.

This is the common mechanical basis for three later downstream readouts:

- branch-period stretch, because each completed internal cycle requires a different causal path in absolute time;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

## Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a55435f686ee6e79)

where $E_{\text{internal}}(A)$ is the closed internal causal-history energy ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed braid dynamics.

## Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\frac{d^2\mathbf X_i}{dT^2}(T)=\mathbf{a}_{i,j}(T;\{T_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(T;\{T_{s,m}\})+\mathbf{a}_{\text{ext}}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-692ba4f073f377a6)

with delay constraints (causal roots):
$$
\|\mathbf X_j(T_{p,k})-\mathbf X_i(T)\|=c_f\,(T-T_{p,k}), \quad
\|\mathbf X_i(T_{s,m})-\mathbf X_i(T)\|=c_f\,(T-T_{s,m})
$$

[View →](../../../../equation-mapping.html#corpus-equation-16b10a9ff072c882)

where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(T)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed. The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf X_i(T)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf V\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0751d8f251047510)

with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4fa3a02b273b8067)

The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

This local hinge geometry determines the root and acceleration behavior on the declared circular chart. A change in a physical action-step scale requires a separately defined action observable and its derivation from the evolved history; it does not follow from self-hit onset alone.

## Bounded-Weight Inverse-Square Escape Lemma

Let $R(T)>0$ be a declared outward scalar coordinate on an interval where $\dot R>0$, and suppose the complete projected acceleration satisfies
$$
\ddot R\ge-\frac{K}{R^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-734d14f24aba55d3)

for a constant $K>0$. Then
$$
\mathcal E_R=\frac12\dot R^2-\frac{K}{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-66a2f296a9e85423)

is nondecreasing, because
$$
\frac{d\mathcal E_R}{dT}
=
\dot R\left(\ddot R+\frac{K}{R^2}\right)
\ge0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b18d6235a0cd67f2)

If at some $T_\ast$,
$$
\dot R(T_\ast)^2>\frac{2K}{R(T_\ast)},
$$

[View →](../../../../equation-mapping.html#corpus-equation-f70a0ffb870211fa)

then $\mathcal E_R(T_\ast)>0$ and $\dot R$ cannot later reach zero while the hypotheses remain valid. This is an escape certificate for that scalar chart, not a family-general no-binding theorem.

A braid application must derive $R$ and the bound $K$ from the actual retained acceleration ledger. A speed cap, separation floor, acceleration-weight cap, and polarity inventory can supply such a bound only when their projection covers every retained root contribution on the same interval. Failure of any bound suspends the certificate. The phase-compensated equal-geometry locus isolated-release channel is one conditional application route; see [Coordinate-Axis Six-Point Symmetry and Return Response](coordinate-axis-six-point-symmetry-and-return-response.md#isolated-release-and-the-return-response-question).

## Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. Let $\mathcal D_{\mathrm{cm}}$ denote the delay-geometry diagnostic record for the coincident-midpoint orthogonal-axis configuration defined in [Zero-Axial-Offset Three-Binary Dynamics and Interpretation](zero-axial-offset-three-binary-dynamics-and-interpretation.md). A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should produce compatible records:
$$
\mathcal D_{\mathrm{cm}}^{\mathrm{accel}}(W)
\sim
\mathcal D_{\mathrm{cm}}^{\mathrm{grad}}(W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-887f9f2ccc91af88)

with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported records recover the usual local equivalence behavior. This chapter asks first whether the substrate records match before that translation.

---


## Scoped Anti-Damping Results

A recurring obstruction shapes the whole retention program: in chart after chart, the delayed kernel does net positive work on the assembly's current motion. The wake pushes forward rather than braking — anti-damping — so a persistent braid cannot close as a static acceleration balance; it must supply an exchange or export channel for the pumped action. The evidence family consists of scoped negative results, each valid only under its own chart, kernel, and conventions:

1. **Circular partner-wake binary.** On the uniform circular benchmark, the retained circular row has an inward radial component and a forward tangential work row; the combination accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must beat this row through non-circular geometry, wake-flux export, recoil, or a later multi-root ledger. The detailed statement lives in [Binary Dynamics](../dynamics/binary-dynamics.md).
2. **Collinear self-hit reading.** Along a true collinear history, the same-transmitter term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: self-interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The open question is therefore whether partner attraction can recapture the motion despite that self-drive.
3. **Fixed-coordinate octahedral chart.** The fixed-coordinate zero-offset octahedral carrier at fixed speed is conjectured to carry a nonzero tangential residual rejecting the narrow fixed-speed branch chart; this conjecture is unverified, and the reading discipline for that chart is recorded in [Braid Recovery Requirements](braid-recovery-requirements.md#reading-discipline).
4. **Zero-angular-momentum channel invariance.** The face-opposite seed placed on the zero-angular-momentum channel stays exactly on that channel: the dynamic center holds at zero, all six radii stay equal, and antipodal partners stay exact. This is the invariant-channel theorem, not a statement of the seed's dynamical fate, which is open; the fixture record lives in the [phase-compensated equal-geometry locus isolated-release analysis](coordinate-axis-six-point-symmetry-and-return-response.md#isolated-release-and-the-return-response-question).
5. **Polarity-segregated fixed-plane two-ring family.** The axial and tangential questions separate. Axially, the [fixed-plane axial no-balance lemma](coincident-axis-three-binary-symmetry.md#fixed-plane-axial-no-balance-lemma) proves that same-plane contributions have exactly zero axial component while every ordinary simple-root opposite-plane contribution accelerates its receiver toward the midplane. The positive canonical root weight cannot reverse that sign, so no fixed-height member of this family has axial acceleration balance at nonzero ring separation for any finite member speed, including super-field-speed motion. This derivation requires complete bounded history in two fixed parallel planes, a stationary axial center, polarity segregation by plane, positive ranges, and an ordinary simple-root ledger. It excludes caustics, non-simple-root event contributions, collisions, incomplete history, variable height, plane precession, axial translation, mixed plane polarities, and additional external, constraint, or Noether-sea acceleration. It does not force a dynamical history to become planar. Tangentially, on the planar hexagon, the conjectured behavior is a strictly positive tangential residual growing with rim speed while the radial residual stays inward — the delayed kernel pumping the rotation rather than braking it. That tangential conjecture is unverified; the axial derivation stands on its own.

The reading discipline matters as much as the results. Each entry is scoped to the chart and assumptions that produced it; the agreement across charts is qualitative consilience, and no ledger quantity may be consumed across charts. None of these results rejects the neutral braid, the coincident-midpoint orthogonal-axis, phase-compensated equal-geometry, coincident-axis three-binary, or two-component circular configuration families, or the bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

The constructive consequence is a sharpened mathematical target. The scoped negative results disfavor the tested fixed-coordinate single-frequency charts without proving that every retained branch must deform. Candidate alternatives exchange pumped tangential action with another internal channel — radial breathing against rotation or the two-frequency class whose closed figures are the integer phase-closure states — absorb it through same-transmitter contributions at the field-speed hinge, or export it to a Noether sea environment. A fixed-coordinate ansatz cannot represent wake exhaust by construction, so a retained branch must have somewhere to put any pumped action, with escaped boundary flux recorded by [wake escapement](../dynamics/energy.md#wake-escapement). The spectrum target below therefore emphasizes relative periodic orbits while leaving any untested relative-equilibrium branch to its own acceptance record.

## The Eigen-Braid Spectrum

If persistent braids exist, the family should have a spectrum: a discrete set of admissible internal configurations, the way a bounded resonator has modes. The natural first ansatz is the rotating wave — a relative equilibrium of the delayed dynamics on the body-diagonal channel,

$$
\mathbf X_\ell(t)
=
\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)
+u\,\hat{\mathbf n}\,t
$$

[View →](../../../../equation-mapping.html#corpus-equation-cee7b95fd49948bc)

with angular rate $\omega$ and constant axial group-velocity component $u$. On the channel the free data reduce to the representative worldlines of the equivariant reduction, and the natural branch coordinate is the screw pitch, equivalently the pair $(u,\omega)$ with the channel radius.

A constant-lag reduction makes the ansatz tractable, and it is a derivation. On the rotating-wave ansatz, every directed-pair causal delay is constant in time: splitting any initial separation into axial and transverse parts relative to $\hat{\mathbf n}$, the rotation acts only on the transverse part and the constant group velocity contributes only along the axial part, so the separation norm between reception time $T_r$ and transmitter emission time $T_r-\tau$ depends on $\tau$ alone. Each directed pair's root residual

$$
F^{\mathrm{sq}}_{ij}(\tau)
=
\left\|\boldsymbol\Delta_\perp(\tau)\right\|^2
+\left(\Delta_\parallel+u\tau\right)^2
-c_f^2\tau^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-8057c1cf9dcfdba7)

is a fixed transcendental function of the lag $\tau$, and causal roots are its zeros: constant phase lags. The superscript distinguishes this squared-distance residual from the unsquared causal-root residual used in the fold analysis below. The same argument covers same-transmitter root records. The consequence is structural: on this ansatz the state-dependent delay system collapses to a finite algebraic problem, and the infinite-dimensional history disappears from the unknowns.

The spectrum system is then a theorem target. An admissible rotating-wave row is a solution of a finite residual system: for each representative receiver, the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration; the root equations $F^{\mathrm{sq}}_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class; and the admissibility inequalities — sub-field speed or declared hinge occupancy, positive Jacobian floors, transmitter-side acceleration-weight floors, noncollision margins. Solutions form the **eigen-braid spectrum**: for fixed group velocity and fixed root-topology class, a solution set $\{(\omega_k,R_k)\}$ indexed by root topology and winding data. Discreteness is a target rather than an assumption — the residuals are real-analytic away from caustics and collisions, so solution sets are generically isolated, and a degenerate continuum would itself be a reportable structure.

A second interface target concerns transitions between spectrum rows. Each row carries a definite screw pitch and helicity sign. Whether admissible rows form a discrete pitch ladder, and whether transitions between them require root-topology changes, must be established from the branch family. Integer root counts alone determine neither an action unit nor the action exchanged in a transition.

The axial no-balance derivation above forces the tested fixed-coordinate single-frequency family planar, and the anti-damping indications, where they hold, disfavor it further. The spectrum question is therefore posed for relative periodic orbits — breathing against rotation with periodic rather than constant delays — and for hinge-occupying and sea-embedded rows. A found row would still be a relative equilibrium or relative periodic orbit only; transverse stability, action and wake balance, and the same-record rows of [Braid Recovery Requirements](braid-recovery-requirements.md) all remain between a spectrum row and a retained branch.

## Action Clicks at the Fold Set

An integer causal-root count records how many past emissions reach a receiver on the declared history domain. It does not specify a fixed action transfer. The [cadence-scale retuning hypothesis](zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis) therefore requires its action observable and transaction scale independently of the root-count geometry. Calling a root event an action click supplies no such derivation.

On a positive-separation chart, use the unsquared root residual $F_{ij}(T_r,T_t)=\|\mathbf X_i(T_r)-\mathbf X_j(T_t)\|-c_f(T_r-T_t)$. An ordinary interior fold satisfies $F_{ij}=\partial_{T_t}F_{ij}=0$, a nonzero second emission-time derivative, and a nonzero derivative in the unfolding parameter. Its local normal form is $u^2\pm\lambda=0$. On opposite sides of the event there are zero or two nearby simple roots, whose emission-time derivative signs are opposite. Thus the root count changes by two while their signed degree is unchanged. A root crossing a retained-history boundary is a different event. These statements are the root-geometry result described in [Binary Dynamics](../dynamics/binary-dynamics.md#root-multiplicity-vs-speed); they establish no one-root-per-transaction rule.

A finite integrated acceleration determines a velocity increment, not an action unit. Neither the integer root count nor that finite increment supplies the action and wake balance needed for a repeatable physical transaction. The branch must supply those quantities from the same Master Equation history before any fixed $h_{\mathrm{act}}$ can be associated with an event.

### Fold Geometry of the Click: Coincidence Versus Finite Chord

Two singular loci require separate analysis: vanishing delayed emission-to-reception separation $r_{ij}=0$ and loss of root transversality $D_{t,ij}=\partial_{T_t}F_{ij}=0$. They may intersect, but neither condition alone supplies a physical continuation. The [point-transceiver definition](../foundations/architrino.md#point-transceiver-status) preserves this distinction.

For a $C^2$ same-transmitter history near the zero-delay endpoint, $\|\mathbf X_i(T_r)-\mathbf X_i(T_r-\Delta)\|=\|\mathbf V_i(T_r)\|\Delta+O(\Delta^2)$. A family of positive-delay roots approaching that endpoint therefore requires the site speed to approach $c_f$, while its causal chord $r_{ii}=c_f\Delta$ tends to zero. This necessary condition does not prove that such a root family exists or that evolution continues through the endpoint. The endpoint is excluded from the Master Equation’s causal-root set and is not an ordinary interior fold. It also does not describe every same-transmitter root birth: interior tangencies require their own root-geometry analysis.

At a finite-chord ordinary fold crossed transversely in reception time, the local branch weight has the integrable inverse-square-root behavior established in [Caustic Transit and Finite Impulse](../dynamics/master-equation.md#caustic-transit-and-finite-impulse), provided the remaining acceleration factors stay bounded. The resulting velocity increment depends on the branch geometry, coefficients, and integration interval. Local integrability neither selects a universal action amount nor proves absorption, re-locking, or an energy transaction. Alignment $\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}=c_f$ alone does not establish the fold's nondegeneracy or transverse crossing, and a spatial smoothing parameter is not a derived physical action scale.


## Accessory Configuration

An **Accessory Configuration** is a declared set of six architrinos associated with a Noether braid but not included in the braid's neutral six-architrino core. Each accessory site has its own declared electrino or positrino polarity. The six positions may lie inside the braid's effective envelope, cross that envelope, or lie outside it; the term does not assume an axial layer, a surrounding shell, or any other placement geometry.

Let the accessory sites be indexed by $p\in\{1,\ldots,6\}$, with polarity signs $\tau_p\in\{+1,-1\}$ and positions relative to the braid group center

$$
\mathbf r_p(T)
=
\mathbf X_p^{\mathrm{acc}}(T)-\mathbf X_{\mathrm{grp}}(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-b50b49b84d139346)

The first configuration data are the net accessory polarity and polarity-signed spatial moments,

$$
Q_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p,
\qquad
\mathbf p_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p\mathbf r_p,
$$

[View →](../../../../equation-mapping.html#corpus-equation-ad2b57b336dc8988)

with higher moments built from the same six signed positions. These moments are derived readouts of a specified Accessory Configuration. They do not determine the six trajectories, prove confinement, or establish a retained assembly.

At hypothesis level, configurations whose low-order polarity-signed moments cancel may expose less structure to distant receivers than configurations with the same net accessory polarity but larger surviving moments. The net polarity $Q_{\mathrm{acc}}$ cannot be hidden by rearranging the six sites. Any additional quietness ordering must be computed from the actual six-site polarity assignment, positions, path histories, and braid coupling. It cannot be inferred from an equal-polarity point arrangement or from a four-site or two-site substitute.

The required dynamical test is a same-record calculation: the braid core must remain retained while all six accessory trajectories acquire bounded causal-return ledgers, and the computed far-field wake must be compared with the moment ordering. The moment hypothesis fails if the first surviving moment does not track independently computed exposed-wake or mass-response records.
