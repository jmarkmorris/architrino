# Braid Mathematics

Six architrinos interacting through delayed causal wakes form a hard dynamical problem: the state is an entire path history, the per-hit accelerations arrive along causal roots that must be solved for, and no general closed-form solution exists. This chapter collects what can nevertheless be established exactly — by symmetry, geometry, and kinematics — before any support-band structure is chosen and before any branch is claimed to persist. The machinery here is core-agnostic: every braid realization in the [Noether Braid](noether-braid.md) family consumes it, and none of it asserts branch retention.

The results divide by strength, and the division is stated with each result. Exact derivations include the symmetry-invariance lemma with its equivariant reductions, the drum geometry of the face-opposite seed, the axial polarity dipole identity, the momentum-screw alignment, the exact speed budget, and the constant-lag reduction of the rotating-wave ansatz. Scoped negative results include the anti-damping family, which rejects specific rigid charts without rejecting the braid program. Candidate mechanisms at hypothesis level include the action-click picture at the causal-root fold set and the Thomson dressing mechanism. Theorem targets include the eigen-braid spectrum system. Claim levels travel with their statements throughout.

## Document Role

This chapter owns the shared mathematical machinery of the braid family: invariant channels, equivariant reductions, exact channel identities, the substrate levels and speed hierarchy with the transverse causal budget lemma, the spiral-helical motion picture and mass thesis, the hinge equation sketch, the acceleration-gradient comparison, the scoped anti-damping negative results, the eigen-braid spectrum framing, the action-click mechanism, and the Thomson dressing mechanism. The family definitions live in [Braid Families](braid-families.md#the-neutral-braid-base-of-the-family-ladder), [Symmetric Shell Braid](braid-families.md#symmetric-shell-braid), and [Nested Shell Braid](braid-families.md#nested-shell-braid); the realization-independent proof obligations live in [Braid Recovery Requirements](braid-recovery-requirements.md). Realization chapters state which of this machinery their configurations inherit and what fixture-specific evidence they add.

## Invariant Channels and Equivariant Reductions

The sharpest currently proved structure in the braid family is a symmetry channel, not a retained branch. The face-opposite seed places the three electrinos opposite the three positrinos on the positive coordinate axes,

$$
\epsilon_{+,x}=(R,0,0),
\qquad
\epsilon_{+,y}=(0,R,0),
\qquad
\epsilon_{+,z}=(0,0,R),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

This seed lies on a common sphere, so it is the maximal-symmetry member of the family — the symmetric one-band configuration whose fixture evidence is carried by [Symmetric Shell Braid](braid-families.md#symmetric-shell-braid). Two finite symmetry groups act on the seed by simultaneous spatial transformation and site relabeling. For a coordinate-axis permutation $\rho\in S_3$, let $M_\rho$ be the coordinate-permutation matrix and let $\rho$ permute site labels within each polarity; let $\iota$ compose point inversion with polarity exchange. Both act on configurations by

$$
(g\cdot\mathbf X)_\ell(t)=M_g\,\mathbf X_{g^{-1}\ell}(t)
$$

and because point inversion commutes with every permutation matrix, the groups are direct products: the zero-angular-momentum group $G_0=S_3\times\langle\iota\rangle$ of order twelve, and the axis-neutral rotating group $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$ of order six, where $C_3=\langle\varrho\rangle$ is the three-fold rotation about the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt3}
$$

A note on what these symmetry operations are. No physical process relabels an electrino as a positrino: every architrino is unique, with its own provenance and path history. The operations above are comparison maps between two possible configurations of the universe — they say that if one configuration solves the delayed dynamics, then its transformed twin solves it too. When the seed happens to be its own twin, the twins' shared trajectory is constrained, and that constraint is the entire content of the channel.

### The Six-Point Symmetry Invariant Lemma

The channel statement is a derivation about the delayed dynamics, proved for the partner-wake master-equation kernel class. For receiver $\ell$ at absolute time $T$, the retained acceleration law under proof is

$$
\mathbf A_\ell[\mathbf X]\!(T)
=
\sum_{\ell'}\;
\sum_{t_r\in\mathcal R_{\ell\ell'}[\mathbf X]\!(T)}
\sigma_\ell\sigma_{\ell'}\,\kappa\,
\frac{W(t_r)}{\left(d^2+\varepsilon^2\right)^{3/2}}\;\mathbf d
$$

where $\mathbf d=\mathbf X_\ell(T)-\mathbf X_{\ell'}(t_r)$ with $d=\|\mathbf d\|$, the causal roots $t_r$ solve $d=c_f(T-t_r)$ within the retained history window, $\varepsilon$ is the softening, $\kappa$ the coupling, and the branch weight $W$ is the receiver-normal factor over the floored source-normal factor with a sign-preserving Jacobian floor. Every scalar in the kernel is a function of separation, delay, source-normal speed, receiver-normal speed, floors, softening, and coupling.

Four explicit hypotheses carry the proof:

1. **Kernel equivariance.** The acceleration magnitude depends only on invariant scalars times the polarity product $\sigma_\ell\sigma_{\ell'}$, directed along $\hat{\mathbf d}$.
2. **Symmetric retained-root policy.** The retained-root set is determined by the root residual and declared invariant criteria only, with no ordering-dependent or label-dependent pruning.
3. **Well-posedness window.** On the window, pairwise separations keep a positive floor and all speeds stay below field speed by a fixed margin; then each directed pair has exactly one causal root, the Jacobian floor is automatic, and the method of steps yields a unique forward solution.
4. **Symmetric initial history.** The hold-window history is invariant under the acting group: the static seed is $G_0$-invariant, and the rigidly rotating seed about $\hat{\mathbf n}$ is $G_{\mathrm{rot}}$-invariant. Transpositions reverse the rotation sense and are excluded from the rotating group — this is where ordered-braid chirality first enters the rotating channel.

**Lemma.** Under these hypotheses, the unique solution remains on the fixed-point set of the acting group for as long as the window lasts.

The proof has two moves. First, functional equivariance: the root residual is built from norms, so the retained root sets of transformed pairs correspond, every kernel scalar is invariant, and the polarity product is preserved — permutations fix each $\sigma_\ell$, while $\iota$ flips both factors — so the acceleration functional transforms exactly as the configuration does. The $\iota$ case is precisely the charge-conjugate inversion oddness obligation: conjugating polarities and inverting space negates every acceleration. Second, uniqueness transfer: the transformed solution is again a solution with the same history, so uniqueness forces it to coincide with the original, which is exactly the statement that the solution stays on the fixed-point set.

The lemma converts the six-body problem into small closed reduced systems. On the zero-angular-momentum channel the fixed-point set is

$$
\epsilon_{+,x}=(a,b,b),
\qquad
\epsilon_{+,y}=(b,a,b),
\qquad
\epsilon_{+,z}=(b,b,a),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed two-function state-dependent delay system in $(a,b)$. On the axis-neutral rotating channel,

$$
\epsilon_{+,y}=\varrho\,\epsilon_{+,x},
\qquad
\epsilon_{+,z}=\varrho^2\,\epsilon_{+,x},
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed three-function reduced system in $\epsilon_{+,x}$ alone. Once the branch also carries group velocity along $\hat{\mathbf n}$, translation breaks $\iota$ while preserving $C_3$, and the reduction needs two representative worldlines, $\epsilon_{+,x}$ and $\epsilon_{-,x}$.

Exact corollaries follow on the channel: the dynamic center is identically zero and antipodal pairs are exact; all six sites share one radius and one speed, so the reduced-radius diagnostic is exact rather than an empirical average; the acceleration of $\epsilon_{+,x}$ has the template $(A,B,B)$ forced by its stabilizer; and the kinematic angular momentum is exactly parallel to $\hat{\mathbf n}$ on the rotating channel.

The scope boundary is part of the result. Invariance of the channel does not prove stability transverse to it, and no statement in this section claims branch retention. The lemma is a derivation-closure result for the invariance and reduction obligations only, proved for the declared kernel class; any solver kernel or runner that violates kernel equivariance or root-policy symmetry — an axis-fixed cap, asymmetric softening, ordering-dependent pruning — voids the conclusion for that run, which makes the lemma double as an audit predicate on implementations. Applying the channel to any retained-history record still requires the same-record receiver-normal, action, wake, event, support, and stability rows demanded by [Braid Recovery Requirements](braid-recovery-requirements.md).

### Polarity Conjugation

Because the delayed acceleration kernel depends on polarity only through products $\sigma_i\sigma_j$, global polarity conjugation leaves every trajectory unchanged: an electrino-face-leading branch and a positrino-face-leading branch are exactly degenerate in isolation. The leading-octant sign can acquire physical meaning only through coupling to an environment that is not polarity-balanced, which is where ordered-braid chirality must obtain its content; the helicity sign of the momentum screw below is the candidate carrier of that chirality label. Translation along $\hat{\mathbf n}$, by contrast, produces a real asymmetry: with $\iota$ broken, the leading face meets fresh medium while the trailing face rides in the branch's own wake, and this fore-aft wake asymmetry is the native deformation channel developed further in [Nested Shell Braid Dynamics](braid-families.md#nested-shell-braid-dynamics).

## Drum Geometry

Every site of the face-opposite seed has the same height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and the same lever arm $R\sqrt{2/3}$ from the axis, because the body diagonal makes equal angles $\arccos(1/\sqrt3)$ with the three coordinate axes. Viewed along $\hat{\mathbf n}$, the configuration is a short drum: the three electrinos form a matching ring below the mid-plane, the three positrinos form a triangular ring above it, and the two triangles are staggered by $60^\circ$ so their projections interleave into a hexagon.

The drum also organizes the neutral braid's channel bookkeeping. Each site's two repulsive channels connect it to its own ring mates, and its three attractive channels connect it to the opposite ring. Intra-ring repulsion is what spaces each ring at $120^\circ$ — three equal charges on a circle repel into an equilateral triangle — while inter-ring attraction is what sets the drum height. The same minimum-energy logic that arranges accessory charges around a dressed assembly therefore already organizes the core itself: the configuration is two mutually repelling rings bound face-to-face by cross-ring attraction, one containment-and-repulsion principle appearing at both levels of the architecture. The binding topology is that of a rope-tensioned drum: each member of one ring is tied by attraction to all three members of the other, and because the rings are staggered, those ties fan out in the zigzag pattern of drum lacing. Under rotation the ties wind into helices about the axis — the drum picture and the word braid are the same object, viewed in space and in spacetime respectively, and the handedness of the winding is the chirality datum carried by the rotating channel. Equal lever arms give every site the same tangential speed under rigid rotation about $\hat{\mathbf n}$, and on the rotating channel the three opposite-polarity pairs hold an exact $120^\circ$ phase separation at every instant, because the rotation by $2\pi/3$ about $\hat{\mathbf n}$ is one of the acting symmetries rather than an approximate phase convention.

## Moments and the Axial Polarity Dipole

A **moment** here is a polarity-weighted sum over the configuration: the plain total $\sum_\ell\sigma_\ell$ is the net polarity inventory, the first moment $\sum_\ell\sigma_\ell\mathbf X_\ell$ is the dipole (the signed offset of positive from negative content), and higher moments record signed shape at finer order. Moments matter because they are what a distant receiver can reconstruct from the superposed delayed potential, ranked by distance: the $\ell$-th moment controls the contribution fading as $1/r^{\ell+1}$. For a polarity-neutral assembly the dipole is independent of the choice of origin, so the braid's dipole is a well-defined property of the branch rather than of a coordinate convention.

Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$ for the cyclic coordinate permutation $\varrho$, the polarity-signed dipole of the channel is exactly axial at all times, even under drift:

$$
\sum_{\ell}\sigma_\ell\,\mathbf X_\ell
=
3\left(\hat{\mathbf n}\cdot\left(\epsilon_{+,x}-\epsilon_{-,x}\right)\right)\hat{\mathbf n}
$$

The transverse dipole components cancel in balanced three-phase fashion. This cancellation is a statement about the braid's summed distant signature, not about the accelerations inside it: each architrino still receives the full delayed influence of all five partners through its own causal roots, and none of those per-receiver contributions vanish. What cancels is the collective polarity-signed moment that a distant receiver reconstructs from the superposed wakes. A branch that flattens toward the transverse plane therefore loses its leading polarity-signed moment entirely: the flattened fast configuration is quiet at dipole order, with its first surviving structure at higher moment order. This identity is the channel's native contribution to the energy-shielding story used by the nested chapters, and it links the terminal planar limit to wake quietness rather than to increased exposure.

## Momentum Screw and Helicity

The same projector identity pins both kinematic momenta to the axis on the rotating channel:

$$
\mathbf P_{\mathrm{kin}}
=
3\,\hat{\mathbf n}\cdot\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\hat{\mathbf n},
\qquad
\mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}
$$

The axis-neutral direction is therefore the central axis of the branch's momentum screw: the unique direction that carries both linear and angular kinematic momentum, with the transport state reduced to the two scalars $P_\parallel$ and $J_\parallel$. Their origin-independent combination $\mathbf J\cdot\mathbf P$ — helicity in normalized form, screw pitch in geometric form — is the natural combined label, since an origin shift changes $\mathbf J$ only by a term orthogonal to $\mathbf P$. In delayed dynamics the particle-only momenta are not separately conserved; the causal wakes carry momentum and angular momentum of their own, and conservation is a statement about the combined particle and wake ledger. On the channel, symmetry fixes the momentum directions exactly while the magnitudes exchange with the wake ledger.

## The Exact Speed Budget

Because the rotation is about the same axis as the drift, every site's tangential velocity is exactly perpendicular to the group velocity at every instant. The field-frame speed of each architrino on the translating rotating channel is therefore an exact quadrature,

$$
\beta^2 c_f^2=u^2+v_t^2
$$

with no cycle-dependent cross terms — a special property of axis-neutral transport, since a generic drift direction mixes with the rotation and makes the maximum speed a phase-dependent quantity. If a branch additionally pins its site speed at a fixed fraction of field speed, $\beta=\beta_\ast$, the tangential speed available to the internal cycle is forced to

$$
v_t(u)=\sqrt{\beta_\ast^2c_f^2-u^2}
$$

so the internal cadence of a faster-translating branch slows by exactly the square-root factor familiar from the light-clock argument. On this channel the Lorentz-style clock relation is not imported; it is the arithmetic of a fixed speed budget split between getting somewhere and going around. The pinning of $\beta_\ast$ — some mechanism holding a branch at a fixed speed budget — is a branch hypothesis that the retention program must earn; no such mechanism is currently established, and the quadrature itself is exact channel kinematics that stands independent of any pinning claim. At the $u\to\beta_\ast c_f$ endpoint the tangential budget vanishes and the internal cycle freezes, which is the channel's own statement of the terminal boundary: a branch cannot both translate at its full speed budget and keep an internal clock running.

This is the same pinned-speed hypothesis that already drives the rest-level scaling chart of the [nested shell braid](braid-families.md#nested-shell-braid): there, a branch that holds its layer speed fixed while accepting action transactions is forced onto the $R_\ell f_\ell\approx\text{constant}$ product law. The speed budget extends that one hypothesis to transport: a single pinned $\beta_\ast$ simultaneously fixes how the radius-frequency product retunes at rest and how the internal clock slows under translation, so the rest-level scaling branch and the moving clock export are two projections of one branch commitment rather than two independent assumptions.

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

## Acceleration-Gradient Branch Comparison

The local dynamics burden behind later equivalence-principle recovery is a substrate comparison, not an observer postulate. A uniformly accelerated assembly and a stationary assembly placed in a matched Noether sea gradient should output compatible delay-geometry records on the same kind of branch packet (the scan packet defined with the nested family's diagnostics in [Explored Braid Geometries](braid-families.md#nested-shell-braid-dynamics)):
$$
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{accel}}(W)
\sim
\mathcal{D}_{\mathrm{NSH}}^{\mathrm{grad}}(W)
$$
with the comparison made from phase-closure residuals, anisotropy ratios, branch-period records, stability thresholds, and cycle-averaged causal-work or phase-slip variance.

The ambient Noether sea must participate in this comparison. Deforming the assembly alone is not enough, because the gradient-driven case changes the Noether sea response record while the accelerated case changes how the same retained causal-root ledger is transported through absolute time. The downstream observer-inference question is whether those exported packets recover the usual local equivalence behavior. This chapter only asks whether the substrate packets match before that translation.

---


## Scoped Anti-Damping Results

A recurring obstruction shapes the whole retention program: in chart after chart, the delayed kernel does net positive work on the assembly's current motion. The wake pushes forward rather than braking — anti-damping — so a persistent braid cannot close as a static force balance; it must supply an exchange or export channel for the pumped action. The evidence family consists of scoped negative results, each valid only under its own chart, kernel, and conventions:

1. **Circular partner-wake binary.** On the uniform circular benchmark, the retained circular row has an inward radial component and a forward tangential work row; the combination accelerates the orbiting motion and prevents a partner-only constant-speed circle. Any sub-field-speed contraction claim must beat this row through non-circular geometry, wake-flux export, recoil, or a later multi-root ledger. The detailed statement lives in [Binary Dynamics](../dynamics/binary-dynamics.md).
2. **Collinear self-hit reading.** Along a true collinear history, the same-source term is naturally read as an anti-damping or positive-work contribution on the physically relevant post-crossing outbound branch: self-interaction tends to reinforce the current radial motion rather than furnish a centrifugal-style barrier. The open question is therefore whether partner attraction can recapture the motion despite that self-drive.
3. **Frozen rigid octahedral chart.** The rigid zero-offset octahedral carrier at fixed speed is conjectured to carry a nonzero tangential residual rejecting the narrow fixed-speed branch chart; this conjecture is unverified, and the reading discipline for that chart is recorded in [Braid Families](braid-families.md#the-neutral-braid-base-of-the-family-ladder).
4. **Zero-angular-momentum channel invariance.** The face-opposite seed placed on the zero-angular-momentum channel stays exactly on that channel: the dynamic center holds at zero, all six radii stay equal, and antipodal partners stay exact. This is the invariant-channel theorem, not a statement of the seed's dynamical fate, which is open; the fixture record lives in [Symmetric Shell Braid](braid-families.md#isolated-release-and-the-return-response-question).
5. **Rigid rotating-wave family.** The rigid single-frequency rotating drum fails twice, independently. Axially: same-ring contributions have exactly zero axial component, while every opposite-ring contribution pulls the two rings together, and a sum of strictly one-signed terms cannot vanish — so the rigid rotating wave has no axial equilibrium at any drum aspect and any sub-field rim speed, and the rigid single-frequency family, if it existed, would be forced planar. This axial no-balance statement is a derivation. Tangentially: on the planar hexagon, the conjectured behavior is a strictly positive tangential residual growing with rim speed while the radial residual stays inward — the delayed kernel pumping the rotation rather than braking it. That tangential conjecture is unverified; the axial derivation stands on its own.

The reading discipline matters as much as the results. Each entry is scoped to the chart and assumptions that produced it; the agreement across charts is qualitative consilience, and no ledger quantity may be consumed across charts. None of these results rejects the neutral braid, shell braid, nested shell braid, bounded-speed, controlled self-hit, fold-layer, or medium-response programs.

The constructive consequence is a sharpened search. Admissible persistent braids are necessarily non-rigid: the pumped tangential action must be exchanged with another internal channel — radial breathing against rotation, the two-frequency class whose closed figures are the integer phase-closure states — or absorbed by same-source rows at the field-speed hinge, or exported to a Noether sea environment. The rigid ansatz cannot represent wake exhaust by construction, so its failure was arguably necessary: a retained branch must have somewhere to put the pumped action. The spectrum hunt below is therefore a hunt for relative periodic orbits, not relative equilibria.

## The Eigen-Braid Spectrum

If persistent braids exist, the family should have a spectrum: a discrete set of admissible internal configurations, the way a drum has modes. The natural first ansatz is the rotating wave — a relative equilibrium of the delayed dynamics on the axis-neutral channel,

$$
\mathbf X_\ell(t)
=
\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)
+u\,\hat{\mathbf n}\,t
$$

with angular rate $\omega$ and axial drift $u$. On the channel the free data reduce to the representative worldlines of the equivariant reduction, and the natural branch coordinate is the screw pitch, equivalently the pair $(u,\omega)$ with the channel radius.

A constant-lag reduction makes the ansatz tractable, and it is a derivation. On the rotating-wave ansatz, every directed-pair causal delay is constant in time: splitting any initial separation into axial and transverse parts relative to $\hat{\mathbf n}$, the rotation acts only on the transverse part and the drift only on the axial part, so the separation norm between receiver time $T$ and source time $T-\tau$ depends on $\tau$ alone. Each directed pair's root residual

$$
F_{ij}(\tau)
=
\left\|\boldsymbol\Delta_\perp(\tau)\right\|^2
+\left(\Delta_\parallel+u\tau\right)^2
-c_f^2\tau^2
$$

is a fixed transcendental function of the lag $\tau$, and causal roots are its zeros: constant phase lags. The same argument covers same-source rows. The consequence is structural: on this ansatz the state-dependent delay system collapses to a finite algebraic problem, and the infinite-dimensional history disappears from the unknowns.

The spectrum system is then a theorem target. An admissible rotating-wave row is a solution of a finite residual system: for each representative receiver, the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration; the root equations $F_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class; and the admissibility inequalities — sub-field speed or declared hinge occupancy, positive Jacobian floors, receiver-normal branch-strength floors, noncollision margins. Solutions form the **eigen-braid spectrum**: for fixed drift and fixed root-topology class, a solution set $\{(\omega_k,R_k)\}$ indexed by root topology and winding data. Discreteness is a target rather than an assumption — the residuals are real-analytic away from caustics and collisions, so solution sets are generically isolated, and a degenerate continuum would itself be a reportable structure.

A second interface target rides on the spectrum. Each row carries a definite screw pitch and helicity sign, and the interface hypothesis is that admissible rows at fixed root topology form a discrete pitch ladder whose transitions are root-topology transitions — the click picture below — so that action quantization is inherited from integer root counts rather than imposed.

The current status keeps the target honest. The axial no-balance derivation above forces the rigid single-frequency family planar, and the anti-damping indications (where they hold) disfavor it further, so the live spectrum question is posed for relative periodic orbits — breathing against rotation with periodic rather than constant delays — and for hinge-occupying and sea-embedded rows. A found row would still be a relative equilibrium or relative periodic orbit only; transverse stability, action and wake balance, and the same-record rows of [Braid Recovery Requirements](braid-recovery-requirements.md) all remain between a spectrum row and a retained branch.

## Action Clicks at the Fold Set

The material in this section is a candidate mechanism at hypothesis level: it proposes how the discrete action transaction of the [cadence-scale retuning hypothesis](braid-families.md#cadence-scale-retuning-hypothesis) is physically implemented, and none of it is yet supported by a retained branch record.

Start with an everyday machine. A mechanical watch does not spend energy continuously; an escapement lets the stored energy advance the mechanism one discrete click at a time, and the click count is an integer because a gear tooth is either engaged or it is not. The proposal here is that the field-speed hinge is the braid's escapement.

Three properties make the field speed special for the hinge row, and none of them is arbitrary. First, $c_f$ is the boundary of self-interaction: delayed same-source causal roots exist only for a strand that has exceeded field speed somewhere on its recent path, so crossing the edge is not a matter of degree — it opens a class of causal roots that simply do not exist below it. Second, the source-normal denominator of the receiver-normal branch strength $W^{\mathrm{rec}}$ approaches its caustic as a source's normal speed approaches $c_f$, so the edge is where wake delivery is most sharply concentrated. Third, for a given support radius, the stored kinematic angular momentum of a row grows with its tangential speed and saturates at the sub-field edge, so the hinge is the configuration that stores the most angular momentum per unit radius without opening the self-interaction ledger. The hinge row sits at the marginal point of all three properties at once.

The click itself is then a root-topology event, and it already has a canonical mathematical home: the causal-root fold set $\Sigma_{ij}$ defined in [Architrino](../foundations/architrino.md#core-definition), where the root residual and its emission-time derivative vanish together. An accepted transaction momentarily carries the hinge row across the edge, one same-source causal root opens or closes — a controlled crossing of the fold set rather than a pathology — and the branch re-locks below the edge with its integer ledger changed by one. Quantization on this reading is not imposed on the dynamics; it is inherited from the fact that a causal root either exists or does not, so the count of active roots is an integer and every admissible transaction changes it by a whole step. The closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one such click, and the statement that closure-label changes are tied to causal-root bifurcation becomes the click's formal description. The hinge acts as the assembly's double-entry accountant: each click posts one entry to the internal integer ledger and a matching entry to the outgoing wake, so the books balance event by event rather than continuously. A wake entry remains on the books whether or not it is ever received; in a populated Noether sea essentially every entry is eventually redeemed by some receiver, and the unredeemed remainder is regulated by the medium's convergence requirement rather than lost.

The click is also an instance of the codimension-one transition pattern stated in [Emergence of Structure](../foundations/emergence-of-structure.md#the-dynamics-of-structure-and-asymmetry): an integer branch label changes only when the retained chart crosses a singular stratum, and self-hit onset is named there as exactly such a fold. The hinge click is that fold crossed deliberately and repeatedly, under control, as the branch's transaction mechanism.

The statistical layer is where familiar physics should emerge. A single braid is a discrete clicking system: its energy record changes in whole steps at particular instants, and the timing of a given click depends sensitively on the phase of the internal cycle when the transaction arrives, which makes individual click outcomes practically unpredictable even though the substrate dynamics is deterministic. Click-outcome weights therefore belong to the declared-measure basin formalism of [Emergence of Structure](../foundations/emergence-of-structure.md#context-as-constraint-on-basin-selection): a click probability is a basin volume under a declared preparation measure, and any Born-rule contact inherits that chapter's measure discipline rather than adding a probability postulate. A population of braids clicks asynchronously, and the coarse-grained result is a smooth cadence-space current — the same relationship as between molecular collisions and smooth gas pressure. On this reading, the smoothness of observed energy exchange is a law-of-large-numbers statement about click ensembles, and the discreteness that quantum measurements keep finding at the bottom is the escapement showing through. The same picture supplies a destabilization boundary: a transaction rate slow compared with the internal cadence lets the braid re-lock between clicks (an adiabatic exchange), while forcing faster than the cadence — a sharp transverse re-pointing of the branch axis, or an abrupt longitudinal deceleration — outruns the re-locking and breaks the phase lock instead of advancing it, releasing structure rather than storing action. Whether this adiabatic-to-diabatic boundary reproduces observed radiative and decay thresholds is an open, falsifiable target: in solver records, clicks should appear as integer transitions in the active root count of the hinge row, and the declared hinge tolerance is the click window.

### Fold Geometry of the Click: Coincidence Versus Finite Chord

Whether a hinge click can supply a clean, chart-defined transacted amount depends on where on the fold set the crossing is born, and the two singular loci of the point-transceiver ontology separate the cases. [Architrino](../foundations/architrino.md#point-transceiver-status) distinguishes the coincidence stratum $\{r_{ij}=0\}$ — a spatial point-kernel problem that requires a declared spatial regularization — from the caustic stratum $\{\partial_{T_{\mathrm{em}}}F_{ij}=0\}$ — a causal-root fold that requires a fold-resolution chart. A click carries a chart-defined magnitude only when its crossing sits on the second locus while staying clear of the first.

A same-source (self-hit) crossing on a smooth strand is born on the coincidence stratum. As the causal lag $\Delta\to 0$ the separation is $\lVert\mathbf X(T)-\mathbf X(T-\Delta)\rVert=\lvert\mathbf v\rvert\,\Delta+O(\Delta^2)$, so the same-source root nucleates exactly at the field-speed crossing with a vanishing chord, $r_{ij}\to 0$ as the root opens. On the symmetric one-band channel this onset is a cusp rather than a generic fold, and the transacted amount is not fixed by the fold chart; it is set instead by the point-transceiver short-distance self-regularization scale $d_0$ — of order the near-field two-body scale $\kappa\epsilon^2/c_f^2$ of [Binary Dynamics](../dynamics/binary-dynamics.md) (with $\epsilon$ the architrino polarity-charge magnitude), and in the minimum-circular-binary reading the collapse-arresting radius itself, whose derivation from $\kappa$, $\epsilon$, and $c_f$ remains an open question noted in [Particle Masses](../assemblies/particle-masses.md). This is a scoped negative for any single-site absorber picture: the symmetric single-site self-hit cannot supply a chart-defined transacted amount, because its magnitude is a property of $d_0$ rather than of the branch geometry. Same-source rows remain in the ontology and are what set $d_0$; they simply do not fix a clean click on their own.

A cross-hit crossing between two distinct strands can instead be born at finite chord. When the source-normal alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ holds at finite separation, the crossing sits on the caustic stratum with $r_{ij}\neq 0$: a generic (Whitney $A_2$) fold of nonzero curvature whose transacted impulse is finite and independent of the short-distance regularization. This is the surviving route to a chart-clean click magnitude, and it is a theorem target rather than a result. It is contingent on a hinge geometry that sustains the alignment $\mathbf v_j\cdot\hat{\mathbf r}_{ij}=c_f$ across a click window — the same dynamic-alignment and formation-history condition that gates the return-response question of [Symmetric Shell Braid](braid-families.md#isolated-release-and-the-return-response-question). Whether a braid's own formation and recycling dynamics hold that alignment long enough to transact is the open question on which the clean click magnitude, and with it the whole hinge-absorber route, depends.


## Thomson Dressing Mechanism

The material in this section is a candidate mechanism at hypothesis level: it constrains how accessory architrinos should arrange themselves around any braid core, and none of it is yet supported by a retained branch record.

Accessory architrinos of one polarity repel each other, so a dressed assembly must balance that repulsion against confinement supplied by the braid. Under mutual repulsion and approximately isotropic confinement, $N$ equal charges select the classical minimum-energy arrangement — the Thomson problem — and the selected arrangement fixes which polarity-signed moments the dressing exposes. Six accessory sites select a regular octahedron, whose dipole, quadrupole, and octupole moments all vanish, leaving its first structure-revealing moment at hexadecapole order. Four sites select a tetrahedron, which leaks structure at octupole order. Two sites select an axial pair, which leaks at quadrupole order. The arrangements therefore form a quietness ladder: for each accessory count, geometry dictates the leading multipole at which the dressing broadcasts its structure to distant receivers, and larger vanishing-moment towers mean quieter, more weakly coupled, more resilient dressings.

Two masking rules complete the mechanism. First, the net polarity inventory cannot be masked by any superposition: a dressed assembly remains electromagnetically visible at exactly its net charge, because the plain polarity total is the one moment no arrangement can cancel. Second, structure above the net-charge level can be masked dynamically, through amplitude dominance and cadence separation: a high-cadence braid carrier can dominate the superposed potential so that accessory-mediated interactions become resolvable only when another assembly approaches within roughly the braid scale, where the near field exposes the accessory causal roots.

This chapter carries the mechanism only. Its applications — the electron, quark, and neutrino readings, the charge-quantum orbit counting, and the confinement-flavored composites — are realization hypotheses that live with the [symmetric shell braid dressing ladder](braid-families.md#accessory-dressing-and-apparent-energy) at their stated claim levels.
