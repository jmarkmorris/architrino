# Braid Mathematics

Six architrinos interacting through delayed causal wakes form a hard dynamical problem: the state is an entire path history, the per-hit accelerations arrive along causal roots that must be solved for, and no general closed-form solution exists. This chapter collects what can nevertheless be established exactly — by symmetry, geometry, and kinematics — before any support-band structure is chosen and before any branch is claimed to persist. The machinery here is core-agnostic: every braid realization in the [Noether Braid](noether-braid.md) family consumes it, and none of it asserts branch retention.

The results divide by strength, and the division is stated with each result. Exact derivations include the transverse speed-budget lemmas and the constant-lag reduction of the rotating-wave ansatz. Scoped negative results include the anti-damping family, which rejects specific fixed-coordinate charts without rejecting the braid program. Candidate mechanisms at hypothesis level include the action-click picture at the causal-root fold set and the Accessory Configuration moment analysis. Theorem targets include the eigen-braid spectrum system. Claim levels travel with their statements throughout. The A2-specific invariant channels, two-ring geometry, dipole identity, momentum-screw alignment, and return-response analysis live in [A2 Symmetry and Return Response](braid-a2-symmetry-and-return-response.md).

## Document Role

This chapter owns the shared mathematical machinery of the braid family: the substrate levels and speed hierarchy with the transverse speed-budget lemmas, the spiral-helical motion picture and mass thesis, the hinge equation sketch, the bounded-weight inverse-square escape lemma, the acceleration-gradient comparison, the scoped anti-damping negative results, the eigen-braid spectrum framing, the action-click mechanism, and the Accessory Configuration moment analysis. The neutral six-body base lives in [Noether Braid](noether-braid.md#neutral-braid-base); prescribed coordinates and definitions live in [Braid Taxonomy](braid-taxonomy.md), [Braid Family A](braid-family-a.md), and [Braid Family B](braid-family-b.md). The realization-independent proof obligations live in [Braid Recovery Requirements](braid-recovery-requirements.md). Realization chapters state which of this machinery their configurations inherit and what fixture-specific evidence they add.

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

For a branch whose response center drifts through the local Noether sea with material drift $\mathbf w$, the transverse budget is
$$
c_\star^2
=
\|\mathbf w\|^2+c_{\perp}^2,
\qquad
\beta_\star=\frac{\|\mathbf w\|}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}
$$
Thus an observer-export clock or ruler row must extract
$$
\frac{c_{\perp}}{c_\star}
=
\frac{1}{\gamma_\star}
$$
from the same retained branch record, not append it as an independent Lorentz factor. The lemma fails as a citation target if a calculation solves primitive roots with $c_f$ and then reports an observer-level clock, ruler, or photon speed without the declared dressing map, or if the clock, ruler, and photon rows are sourced from different branch ledgers.

### Transverse Internal-Motion Speed-Budget Lemma

Let one site's native velocity be decomposed into group translation and internal motion,

$$
\mathbf V_i
=
\mathbf V_{\mathrm{grp}}+\mathbf v_i^{\mathrm{int}}
$$

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

If a branch additionally pins the total site speed to $\|\mathbf V_i\|=\beta_{\mathrm{pin}} c_f$, the available internal speed is forced to

$$
v_{\mathrm{int},i}(u)
=
\sqrt{\beta_{\mathrm{pin}}^2c_f^2-u^2}
$$

The quadrature is exact kinematics under the transverse-motion hypothesis. The pinning of $\beta_{\mathrm{pin}}$ is a separate branch hypothesis, not an established retention mechanism. The A2 body-diagonal rotating channel and the B1 axial screw chart are two realizations of the transverse geometry; neither realization makes fixed total site speed automatic. A record with $\mathbf V_{\mathrm{grp}}\cdot\mathbf v_i^{\mathrm{int}}\neq0$ falsifies use of the quadrature for that site and must retain the cross term, which generally makes the maximum speed phase dependent.

The same pinned-speed hypothesis appears in the retained A1 scaling material of [A1 Dynamics](braid-a1-dynamics.md#retention-and-interpretation): a branch that holds an indexed internal speed fixed while accepting action transactions is forced onto the $R_a f_a\approx\text{constant}$ product law. The shared lemma shows how the hypothesis would also constrain transport; it does not establish that A1, A2, or B1 satisfies the pinning condition.

## Spiral-Helical Motion Picture

A resting Noether braid is a phase-locked structure of coupled binary layers. When the braid moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

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

where $E_{\text{internal}}(A)$ is the closed internal causal-history energy ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed braid dynamics.

## Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\frac{d^2\mathbf X_i}{dT^2}(T)=\mathbf{a}_{i,j}(T;\{T_{p,k}\})+\mathbf{a}_{i,i}^{\mathrm{active}}(T;\{T_{s,m}\})+\mathbf{a}_{\text{ext}}(T)
$$
with delay constraints (causal roots):
$$
\|\mathbf X_j(T_{p,k})-\mathbf X_i(T)\|=c_f\,(T-T_{p,k}), \quad
\|\mathbf X_i(T_{s,m})-\mathbf X_i(T)\|=c_f\,(T-T_{s,m})
$$
where $\mathbf{a}_{i,i}^{\mathrm{active}}$ is a shorthand for the sum over retained self-hit roots in $\mathcal{C}_{ii}(T)$, not an instantaneous switch $H(s-1)$. Self-hit remains path-history dependent: roots emitted during an earlier super-field-speed interval can stay active after the current speed has changed.
The second constraint is the native small-scale bridge-like causal structure in this sketch: the receiver at $\mathbf X_i(T)$ is linked to an earlier point on the same worldline by its own causal wake. The connectedness is path-history closure in the causal-root ledger, not a tunnel in the Euclidean void. Any connected-geometry translation belongs only after coarse-graining into an effective horizon-interface or metric description.

and $s=\|\mathbf V\|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2)
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s)
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

## Bounded-Weight Inverse-Square Escape Lemma

Let $R(T)>0$ be a declared outward scalar coordinate on an interval where $\dot R>0$, and suppose the complete projected acceleration satisfies
$$
\ddot R\ge-\frac{K}{R^2}
$$
for a constant $K>0$. Then
$$
\mathcal E_R=\frac12\dot R^2-\frac{K}{R}
$$
is nondecreasing, because
$$
\frac{d\mathcal E_R}{dT}
=
\dot R\left(\ddot R+\frac{K}{R^2}\right)
\ge0.
$$
If at some $T_\ast$,
$$
\dot R(T_\ast)^2>\frac{2K}{R(T_\ast)},
$$
then $\mathcal E_R(T_\ast)>0$ and $\dot R$ cannot later reach zero while the hypotheses remain valid. This is an escape certificate for that scalar chart, not a family-general no-binding theorem.

A braid application must derive $R$ and the bound $K$ from the actual retained acceleration ledger. A speed cap, separation floor, acceleration-weight cap, and polarity inventory can supply such a bound only when their projection covers every retained root contribution on the same interval. Failure of any bound suspends the certificate. The A2 isolated-release channel is one conditional application route; see [A2 Symmetry and Return Response](braid-a2-symmetry-and-return-response.md#isolated-release-and-the-return-response-question).

## Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should output compatible delay-geometry records on the same kind of branch packet (the scan packet defined with A1 diagnostics in [A1 Dynamics](braid-a1-dynamics.md#a1-dynamics)):
$$
\mathcal{D}_{A1}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{A1}^{\mathrm{grad}}(W)
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---


## Scoped Anti-Damping Results

A recurring obstruction shapes the whole retention program: in chart after chart, the delayed kernel does net positive work on the assembly's current motion. The wake pushes forward rather than braking — anti-damping — so a persistent braid cannot close as a static acceleration balance; it must supply an exchange or export channel for the pumped action. The evidence family consists of scoped negative results, each valid only under its own chart, kernel, and conventions:

1. **Circular partner-wake binary.** On the uniform circular benchmark, the retained circular row has an inward radial component and a forward tangential work row; the combination accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must beat this row through non-circular geometry, wake-flux export, recoil, or a later multi-root ledger. The detailed statement lives in [Binary Dynamics](../dynamics/binary-dynamics.md).
2. **Collinear self-hit reading.** Along a true collinear history, the same-transmitter term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: self-interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The open question is therefore whether partner attraction can recapture the motion despite that self-drive.
3. **Fixed-coordinate octahedral chart.** The fixed-coordinate zero-offset octahedral carrier at fixed speed is conjectured to carry a nonzero tangential residual rejecting the narrow fixed-speed branch chart; this conjecture is unverified, and the reading discipline for that chart is recorded in [Braid Recovery Requirements](braid-recovery-requirements.md#reading-discipline).
4. **Zero-angular-momentum channel invariance.** The face-opposite seed placed on the zero-angular-momentum channel stays exactly on that channel: the dynamic center holds at zero, all six radii stay equal, and antipodal partners stay exact. This is the invariant-channel theorem, not a statement of the seed's dynamical fate, which is open; the fixture record lives in the [A2 isolated-release analysis](braid-a2-symmetry-and-return-response.md#isolated-release-and-the-return-response-question).
5. **Fixed-coordinate single-frequency rotating-wave family.** The fixed-coordinate single-frequency A2 rotating wave fails twice, independently. Axially: same-ring contributions have exactly zero axial component, while every opposite-ring contribution pulls the two rings together, and a sum of strictly one-signed terms cannot vanish — so this rotating wave has no axial equilibrium at any two-ring aspect and any sub-field rim speed, and the tested single-frequency family, if it existed, would be forced planar. This axial no-balance statement is a derivation. Tangentially: on the planar hexagon, the conjectured behavior is a strictly positive tangential residual growing with rim speed while the radial residual stays inward — the delayed kernel pumping the rotation rather than braking it. That tangential conjecture is unverified; the axial derivation stands on its own.

The reading discipline matters as much as the results. Each entry is scoped to the chart and assumptions that produced it; the agreement across charts is qualitative consilience, and no ledger quantity may be consumed across charts. None of these results rejects the neutral braid, A1, A2, B1, and C-family, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

The constructive consequence is a sharpened search. The scoped negative results direct the live search away from the tested fixed-coordinate single-frequency charts. They do not prove that every retained branch must deform. Candidate alternatives exchange pumped tangential action with another internal channel — radial breathing against rotation or the two-frequency class whose closed figures are the integer phase-closure states — absorb it through same-transmitter contributions at the field-speed hinge, or export it to a Noether sea environment. A fixed-coordinate ansatz cannot represent wake exhaust by construction, so a retained branch must have somewhere to put any pumped action, with escaped boundary flux recorded by [wake escapement](../dynamics/energy.md#wake-escapement). The spectrum hunt below therefore emphasizes relative periodic orbits while leaving any untested relative-equilibrium branch to its own acceptance record.

## The Eigen-Braid Spectrum

If persistent braids exist, the family should have a spectrum: a discrete set of admissible internal configurations, the way a bounded resonator has modes. The natural first ansatz is the rotating wave — a relative equilibrium of the delayed dynamics on the body-diagonal channel,

$$
\mathbf X_\ell(t)
=
\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)
+u\,\hat{\mathbf n}\,t
$$

with angular rate $\omega$ and axial drift $u$. On the channel the free data reduce to the representative worldlines of the equivariant reduction, and the natural branch coordinate is the screw pitch, equivalently the pair $(u,\omega)$ with the channel radius.

A constant-lag reduction makes the ansatz tractable, and it is a derivation. On the rotating-wave ansatz, every directed-pair causal delay is constant in time: splitting any initial separation into axial and transverse parts relative to $\hat{\mathbf n}$, the rotation acts only on the transverse part and the drift only on the axial part, so the separation norm between reception time $T_r$ and transmitter emission time $T_r-\tau$ depends on $\tau$ alone. Each directed pair's root residual

$$
F_{ij}(\tau)
=
\left\|\boldsymbol\Delta_\perp(\tau)\right\|^2
+\left(\Delta_\parallel+u\tau\right)^2
-c_f^2\tau^2
$$

is a fixed transcendental function of the lag $\tau$, and causal roots are its zeros: constant phase lags. The same argument covers same-transmitter root records. The consequence is structural: on this ansatz the state-dependent delay system collapses to a finite algebraic problem, and the infinite-dimensional history disappears from the unknowns.

The spectrum system is then a theorem target. An admissible rotating-wave row is a solution of a finite residual system: for each representative receiver, the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration; the root equations $F_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class; and the admissibility inequalities — sub-field speed or declared hinge occupancy, positive Jacobian floors, transmitter-side acceleration-weight floors, noncollision margins. Solutions form the **eigen-braid spectrum**: for fixed drift and fixed root-topology class, a solution set $\{(\omega_k,R_k)\}$ indexed by root topology and winding data. Discreteness is a target rather than an assumption — the residuals are real-analytic away from caustics and collisions, so solution sets are generically isolated, and a degenerate continuum would itself be a reportable structure.

A second interface target rides on the spectrum. Each row carries a definite screw pitch and helicity sign, and the interface hypothesis is that admissible rows at fixed root topology form a discrete pitch ladder whose transitions are root-topology transitions — the click picture below — so that action quantization is inherited from integer root counts rather than imposed.

The current status keeps the target honest. The axial no-balance derivation above forces the tested fixed-coordinate single-frequency family planar, and the anti-damping indications (where they hold) disfavor it further, so the live spectrum question is posed for relative periodic orbits — breathing against rotation with periodic rather than constant delays — and for hinge-occupying and sea-embedded rows. A found row would still be a relative equilibrium or relative periodic orbit only; transverse stability, action and wake balance, and the same-record rows of [Braid Recovery Requirements](braid-recovery-requirements.md) all remain between a spectrum row and a retained branch.

## Action Clicks at the Fold Set

The material in this section is a candidate mechanism at hypothesis level: it proposes how the discrete action transaction of the [cadence-scale retuning hypothesis](braid-a1-dynamics.md#cadence-scale-retuning-hypothesis) is physically implemented, and none of it is yet supported by a retained branch record.

Start with an everyday machine. A mechanical watch does not spend energy continuously; an escapement lets the stored energy advance the mechanism one discrete click at a time, and the click count is an integer because a gear tooth is either engaged or it is not. The proposal here is that the field-speed hinge is the braid's escapement.

Three properties make the field speed special for the hinge row, and none of them is arbitrary. First, $c_f$ is the boundary of self-interaction: delayed same-transmitter causal roots exist only for a strand that has exceeded field speed somewhere on its recent path, so crossing the edge is not a matter of degree — it opens a class of causal roots that simply do not exist below it. Second, the transmitter-side factor of the transmitter-side acceleration weight $W^{\mathrm{acc}}$ approaches its caustic as a source's normal speed approaches $c_f$, so the edge is where wake delivery is most sharply concentrated. Third, for a given support radius, the stored kinematic angular momentum of a row grows with its tangential speed and saturates at the sub-field edge, so the hinge is the configuration that stores the most angular momentum per unit radius without opening the self-interaction ledger. The hinge row sits at the marginal point of all three properties at once.

The click itself is then a root-topology event, and it already has a canonical mathematical home: the causal-root fold set $\Sigma_{ij}$ defined in [Architrino](../foundations/architrino.md#core-definition), where the root residual and its emission-time derivative vanish together. An accepted transaction momentarily carries the hinge row across the edge, one same-transmitter causal root opens or closes — a controlled crossing of the fold set rather than a pathology — and the branch re-locks below the edge with its integer ledger changed by one. Quantization on this reading is not imposed on the dynamics; it is inherited from the fact that a causal root either exists or does not, so the count of active roots is an integer and every admissible transaction changes it by a whole step. The closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one such click, and the statement that closure-label changes are tied to causal-root bifurcation becomes the click's formal description. The hinge acts as the assembly's double-entry accountant: each click posts one entry to the internal integer ledger and a matching entry to the outgoing wake, so the books balance event by event rather than continuously. A wake entry remains on the books whether or not it is ever received; in a populated Noether sea essentially every entry is eventually redeemed by some receiver, and the unredeemed remainder is regulated by the medium's convergence requirement rather than lost.

The click is also an instance of the codimension-one transition pattern stated in [Emergence of Structure](../foundations/emergence-of-structure.md#the-dynamics-of-structure-and-asymmetry): an integer branch label changes only when the retained chart crosses a singular stratum, and self-hit onset is named there as exactly such a fold. The hinge click is that fold crossed deliberately and repeatedly, under control, as the branch's transaction mechanism.

The statistical layer is where familiar physics should emerge. A single braid is a discrete clicking system: its energy record changes in whole steps at particular instants, and the timing of a given click depends sensitively on the phase of the internal cycle when the transaction arrives, which makes individual click outcomes practically unpredictable even though the substrate dynamics is deterministic. Click-outcome weights therefore belong to the declared-measure basin formalism of [Emergence of Structure](../foundations/emergence-of-structure.md#context-as-constraint-on-basin-selection): a click probability is a basin volume under a declared preparation measure, and any Born-rule contact inherits that chapter's measure discipline rather than adding a probability postulate. A population of braids clicks asynchronously, and the coarse-grained result is a smooth cadence-space current — the same relationship as between molecular collisions and smooth gas pressure. On this reading, the smoothness of observed energy exchange is a law-of-large-numbers statement about click ensembles, and the discreteness that quantum measurements keep finding at the bottom is the escapement showing through. The same picture supplies a destabilization boundary: a transaction rate slow compared with the internal cadence lets the braid re-lock between clicks (an adiabatic exchange), while forcing faster than the cadence — a sharp transverse re-pointing of the branch axis, or an abrupt longitudinal deceleration — outruns the re-locking and breaks the phase lock instead of advancing it, releasing structure rather than storing action. Whether this adiabatic-to-diabatic boundary reproduces observed radiative and decay thresholds is an open, falsifiable target: in solver records, clicks should appear as integer transitions in the active root count of the hinge row, and the declared hinge tolerance is the click window.

### Fold Geometry of the Click: Coincidence Versus Finite Chord

Whether a hinge click can supply a clean, chart-defined transacted amount depends on where on the fold set the crossing is born, and the two singular loci of the point-transceiver ontology separate the cases. [Architrino](../foundations/architrino.md#point-transceiver-status) distinguishes the coincidence stratum $\{r_{ij}=0\}$ — a spatial point-kernel problem that requires a declared spatial regularization — from the caustic stratum $\{\partial_{T_t}F_{ij}=0\}$ — a causal-root fold that requires a fold-resolution chart. A click carries a chart-defined magnitude only when its crossing sits on the second locus while staying clear of the first.

A same-transmitter (self-hit) crossing on a smooth strand is born on the coincidence stratum. As the causal lag $\Delta\to 0$ the separation is $\lVert\mathbf X(T)-\mathbf X(T-\Delta)\rVert=\lvert\mathbf v\rvert\,\Delta+O(\Delta^2)$, so the same-transmitter root nucleates exactly at the field-speed crossing with a vanishing chord, $r_{ij}\to 0$ as the root opens. On the symmetric one-band channel this onset is a cusp rather than a generic fold, and the transacted amount is not fixed by the fold chart; it is set by the declared spatial regularization scale $\epsilon_c$. Identifying the physical value of $\epsilon_c$ with a conditional minimum-circular-binary or near-field two-body scale is a separate hypothesis, not part of the substrate regularization definition. This is a scoped negative for any single-site absorber picture: the symmetric single-site self-hit cannot supply a chart-defined transacted amount, because its magnitude is a property of $\epsilon_c$ rather than of the branch geometry. Same-transmitter rows remain in the ontology; they simply do not fix a clean click on their own.

A cross-hit crossing between two distinct strands can instead be born at finite chord. When the transmitter-side alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ holds at finite separation, the crossing sits on the caustic stratum with $r_{ij}\neq 0$: a generic (Whitney $A_2$) fold of nonzero curvature whose transacted impulse is finite and independent of the short-distance regularization. This is the surviving route to a chart-clean click magnitude, and it is a theorem target rather than a result. It is contingent on a hinge geometry that sustains the alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ across a click window — the same dynamic-alignment and formation-history condition that gates the [A2 return-response question](braid-a2-symmetry-and-return-response.md#isolated-release-and-the-return-response-question). Whether a braid's own formation and recycling dynamics hold that alignment long enough to transact is the open question on which the clean click magnitude, and with it the whole hinge-absorber route, depends.


## Accessory Configuration

An **Accessory Configuration** is a declared set of six architrinos associated with a Noether braid but not included in the braid's neutral six-architrino core. Each accessory site has its own declared electrino or positrino polarity. The six positions may lie inside the braid's effective envelope, cross that envelope, or lie outside it; the term does not assume an axial layer, a surrounding shell, or any other placement geometry.

Let the accessory sites be indexed by $p\in\{1,\ldots,6\}$, with polarity signs $\tau_p\in\{+1,-1\}$ and positions relative to the braid group center

$$
\mathbf r_p(T)
=
\mathbf X_p^{\mathrm{acc}}(T)-\mathbf X_{\mathrm{grp}}(T).
$$

The first configuration data are the net accessory polarity and polarity-signed spatial moments,

$$
Q_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p,
\qquad
\mathbf p_{\mathrm{acc}}=\sum_{p=1}^{6}\tau_p\mathbf r_p,
$$

with higher moments built from the same six signed positions. These moments are derived readouts of a specified Accessory Configuration. They do not determine the six trajectories, prove confinement, or establish a retained assembly.

At hypothesis level, configurations whose low-order polarity-signed moments cancel may expose less structure to distant receivers than configurations with the same net accessory polarity but larger surviving moments. The net polarity $Q_{\mathrm{acc}}$ cannot be hidden by rearranging the six sites. Any additional quietness ordering must be computed from the actual six-site polarity assignment, positions, path histories, and braid coupling. It cannot be inferred from an equal-polarity point arrangement or from a four-site or two-site substitute.

The required dynamical test is a same-record calculation: the braid core must remain retained while all six accessory trajectories acquire bounded causal-return ledgers, and the computed far-field wake must be compared with the moment ordering. The moment hypothesis fails if the first surviving moment does not track independently computed exposed-wake or mass-response records.
