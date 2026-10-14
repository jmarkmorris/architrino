# Coordinate-Axis Six-Point Symmetry and Return Response

The phase-compensated equal-geometry orthogonal-axis three-binary configuration is defined in [Spatial (3D) Braid Assemblies](3d-braid-assemblies.md#phase-compensated-equal-geometry-orthogonal-axis-three-binary-configuration). This specialist chapter owns the mathematics and retention analysis unique to that configuration's exact face-opposite reference fixture: the invariant symmetry channels, two-ring projection, axial polarity dipole, momentum screw, near-antipodality diagnostic, and isolated and sea-embedded return-response questions.

The chapter does not redefine this configuration and does not certify a retained branch. Its exact results constrain the declared fixture under their stated hypotheses. The realization-independent retention contract remains in [Braid Recovery Requirements](braid-recovery-requirements.md), and the family-general speed split remains in [Braid Mathematics](braid-mathematics.md#transverse-internal-motion-speed-budget-premise-and-consequence).

## Invariant Channels and Equivariant Reductions

The sharpest currently proved structure for this configuration is a symmetry channel, not a retained branch. The face-opposite seed places the three electrinos opposite the three positrinos on the positive coordinate axes,

$$
\mathbf x_{+,x}=(R,0,0),
\qquad
\mathbf x_{+,y}=(0,R,0),
\qquad
\mathbf x_{+,z}=(0,0,R),
\qquad
\mathbf x_{-,i}=-\mathbf x_{+,i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-77d5d9c718258b2a)

This seed lies on a common sphere, so it is the maximal-symmetry orthogonal-axis three-binary member: the phase-compensated equal-geometry orthogonal-axis three-binary configuration reference fixture defined in [Spatial (3D) Braid Assemblies](3d-braid-assemblies.md#phase-compensated-equal-geometry-orthogonal-axis-three-binary-configuration). Two finite symmetry groups act on the seed by simultaneous spatial transformation and site relabeling. For a coordinate-axis permutation $\rho\in S_3$, let $M_\rho$ be the coordinate-permutation matrix and let $\rho$ permute site labels within each polarity; let $\iota$ compose point inversion with polarity exchange. Both act on configurations by

$$
(g\cdot\mathbf X)_\ell(T)=M_g\,\mathbf X_{g^{-1}\ell}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9eba84bb602f7e55)

and because point inversion commutes with every permutation matrix, the groups are direct products: the zero-angular-momentum group $G_0=S_3\times\langle\iota\rangle$ of order twelve, and the body-diagonal rotating group $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$ of order six, where $C_3=\langle\varrho\rangle$ is the three-fold rotation about the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ba5cebce63ffa12)

No physical process relabels an electrino as a positrino: every architrino is unique, with its own provenance and path history. The operations above are comparison maps between two possible configurations of the universe. If one configuration solves the delayed dynamics, its transformed twin solves it too. When the seed happens to be its own twin, the twins' shared trajectory is constrained, and that constraint is the entire content of the channel.

### The Six-Point Symmetry Invariant Lemma

The channel statement is a derivation about the delayed dynamics, proved for the partner-wake master-equation kernel class. For receiver $\ell$ at reception time $T_r$, the retained acceleration law under proof is

$$
\mathbf A_\ell[\mathbf X]\!(T_r)
=
\sum_{\ell'}\;
\sum_{T_t\in\mathcal R_{\ell\ell'}[\mathbf X]\!(T_r)}
\sigma_\ell\sigma_{\ell'}\,\kappa\,
\frac{W(T_t)}{d^3}\,\mathbf d
$$

[View →](../../../../equation-mapping.html#corpus-equation-6705a6df8d92128d)

where $\mathbf d=\mathbf X_\ell(T_r)-\mathbf X_{\ell'}(T_t)$ with $d=\|\mathbf d\|>0$, the causal roots $T_t$ solve $d=c_f(T_r-T_t)$ within the retained history window, $\kappa$ is the coupling, and the acceleration weight is $W=c_f/|D_t|$ on a sign-certified transmitter-side Jacobian floor. Receiver-side velocity remains in the signed root-playback record $D_r/D_t$ but not in this instantaneous acceleration kernel. The proof also applies to an explicitly auxiliary radial regularization when its scalar kernel is equivariant, but such a regularization does not supply evidence for the Master Equation’s kernel without a convergence argument.

Four explicit hypotheses carry the proof:

1. **Kernel equivariance.** The acceleration magnitude depends only on invariant scalars times the polarity product $\sigma_\ell\sigma_{\ell'}$, directed along $\hat{\mathbf d}$.
2. **Symmetric retained-root policy.** The retained-root set is determined by the root residual and declared invariant criteria only, with no ordering-dependent or label-dependent pruning.
3. **Well-posedness window.** Use compatible complete histories with a uniform speed margin below $c_f$ and a positive separation floor throughout the contributing history intervals. Subfield transmitter speed makes the root residual strictly monotone and supplies a positive Jacobian floor, so each directed partner pair has at most one root. Require existence and inclusion within the retained window separately, for example through endpoint signs and complete history coverage. Assume an applicable local existence-and-uniqueness result for the admitted history class and acceleration functional; these geometric bounds alone are not that theorem.
4. **Symmetric initial history.** The hold-window history is invariant under the acting group: the static seed is $G_0$-invariant, and the uniformly co-rotating prescribed seed about $\hat{\mathbf n}$ is $G_{\mathrm{rot}}$-invariant. Transpositions reverse the rotation sense and are excluded from the rotating group; this is where ordered-braid chirality first enters the rotating channel.

**Lemma.** Under these hypotheses, the unique solution remains on the fixed-point set of the acting group for as long as the window lasts.

The proof has two moves. First, functional equivariance: the root residual is built from norms, so the retained root sets of transformed pairs correspond, every kernel scalar is invariant, and the polarity product is preserved — permutations fix each $\sigma_\ell$, while $\iota$ flips both factors — so the acceleration functional transforms exactly as the configuration does. The $\iota$ case is precisely the charge-conjugate inversion oddness obligation: conjugating polarities and inverting space negates every acceleration. Second, uniqueness transfer: the transformed solution is again a solution with the same history, so uniqueness forces it to coincide with the original, which is exactly the statement that the solution stays on the fixed-point set.

The lemma converts the six-body problem into small closed reduced systems. On the zero-angular-momentum channel the fixed-point set is

$$
\mathbf x_{+,x}=(a,b,b),
\qquad
\mathbf x_{+,y}=(b,a,b),
\qquad
\mathbf x_{+,z}=(b,b,a),
\qquad
\mathbf x_{-,i}=-\mathbf x_{+,i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4efe7ee838766689)

a closed two-function state-dependent delay system in $(a,b)$. On the body-diagonal rotating channel,

$$
\mathbf x_{+,y}=\varrho\,\mathbf x_{+,x},
\qquad
\mathbf x_{+,z}=\varrho^2\,\mathbf x_{+,x},
\qquad
\mathbf x_{-,i}=-\mathbf x_{+,i}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c33b86bf2a28f578)

a closed three-function reduced system in $\mathbf x_{+,x}$ alone. Once the branch also carries group velocity along $\hat{\mathbf n}$, translation breaks $\iota$ while preserving $C_3$, and the reduction needs two representative worldlines, $\mathbf x_{+,x}$ and $\mathbf x_{-,x}$.

On both nontranslating channels, point inversion with polarity exchange makes the dynamic center identically zero and keeps opposite-polarity partners antipodal. The acting groups relate all six sites, so they share one radius and one speed. On the zero-angular-momentum $G_0$ channel, the transposition stabilizing the $x$ site forces its acceleration to have the template $(A,B,B)$. On the rotating $G_{\mathrm{rot}}$ channel, cyclic symmetry instead relates the three acceleration vectors without forcing two components of one vector to coincide; it also makes the summed kinematic angular momentum parallel to $\hat{\mathbf n}$. When translation breaks $\iota$, $C_3$ relates the three sites within each polarity orbit, but equality of radius or speed between the two orbits requires an additional condition.

The scope boundary is part of the result. Invariance of the channel does not prove stability transverse to it, and no statement in this section claims branch retention. The lemma is a derivation-closure result for the invariance and reduction obligations only, proved for the declared kernel class. Any solver kernel or runner that violates kernel equivariance or root-policy symmetry — an axis-fixed cap, asymmetric softening, or ordering-dependent pruning — voids the conclusion for that run, which makes the lemma an audit predicate on implementations. Applying the channel to any retained-history record still requires the same-record receiver-side, action, wake, event, support, and stability entries demanded by [Braid Recovery Requirements](braid-recovery-requirements.md).

### Polarity Conjugation

Because the delayed acceleration kernel depends on polarity through products $\sigma_i\sigma_j$, conjugating every polarity in an isolated complete system preserves its acceleration functional. With the corresponding transformed history and an applicable uniqueness result, electrino-face-leading and positrino-face-leading comparison branches are degenerate. In an environment held fixed, conjugating only the assembly need not preserve its interactions. Net polarity balance is insufficient: the environment's spatial and retained-history record must be invariant under the corresponding comparison to retain that degeneracy. The helicity sign of the momentum screw below remains a candidate chirality label. Translation along $\hat{\mathbf n}$ breaks $\iota$ while preserving $C_3$; any fore-aft environmental response must be evaluated on the actual assembly and medium histories, as discussed in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation).

## Phase-Compensated Two-Ring Geometry

Every site of the face-opposite phase-compensated equal-geometry orthogonal-axis three-binary configuration seed has the same height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and the same lever arm $R\sqrt{2/3}$ from the axis, because the body diagonal makes equal angles $\arccos(1/\sqrt3)$ with the three coordinate axes. Viewed along $\hat{\mathbf n}$, the three electrinos form one triangular ring below the mid-plane and the three positrinos form a matching triangular ring above it. The two triangles are staggered by $60^\circ$, so their projections interleave into a hexagon.

The two-ring view organizes the polarity-channel inventory. Each site's two like-polarity partner channels connect it to its own ring mates, and its three opposite-polarity channels connect it to the other ring. The $120^\circ$ spacing and ring separation here belong to the prescribed geometry; channel counting does not show that the delayed dynamics maintains either relation or minimizes an energy. The staggered rings give their cross-ring connections a zigzag pattern. Under prescribed common-frequency co-rotation those connections wind into helices about the axis, whose handedness is a geometric chirality label. Equal lever arms give equal tangential speeds in that prescribed motion. More generally, $C_3$ symmetry relates the three opposite-polarity pairs at every instant by rotation through $2\pi/3$; an orbit on the rotation axis has no defined transverse azimuth.

## Moments and the Axial Polarity Dipole

A **moment** here is an equal-time polarity-weighted sum over the configuration: $\sum_\ell\sigma_\ell$ is the net polarity inventory, $\sum_\ell\sigma_\ell\mathbf X_\ell$ is the dipole, and higher moments record signed shape at finer order. In a declared static inverse-distance comparison, these moments organize the multipole expansion. A distant receiver under the Master Equation instead samples different emission times with their causal-root geometry and acceleration weights; a delayed multipole statement needs that complete record and an independently controlled expansion. For a polarity-neutral assembly the equal-time dipole is independent of the choice of origin.

Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$ for the cyclic coordinate permutation $\varrho$, the polarity-signed dipole of the channel is exactly axial at all times, even under group velocity:

$$
\sum_{\ell}\sigma_\ell\,\mathbf X_\ell
=
3\left(\hat{\mathbf n}\cdot\left(\mathbf x_{+,x}-\mathbf x_{-,x}\right)\right)\hat{\mathbf n}
$$

[View →](../../../../equation-mapping.html#corpus-equation-082b053380ee5012)

The transverse components of this equal-time dipole cancel by the cyclic projector identity. This does not remove any of the per-receiver partner contributions from the delayed acceleration law. If the axial difference $\hat{\mathbf n}\cdot(\mathbf x_{+,x}-\mathbf x_{-,x})$ tends to zero, the entire equal-time dipole tends to zero. Inferring a diminished distant wake signature or energy shielding additionally requires a delayed expansion controlling emission phases, every root weight, and its remainder. The identity supplies a geometric input to that derivation, rather than an established shielding result.

## Momentum Screw and Helicity

The same projector identity pins both kinematic momenta to the axis on the rotating channel:

$$
\mathbf P_{\mathrm{kin}}
=
3\left[\hat{\mathbf n}\cdot\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\right]\hat{\mathbf n},
\qquad
\mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0e591bc40d4b27b4)

When the kinematic momentum is nonzero, the body-diagonal direction carries both its linear and angular components on the rotating channel, with axial diagnostics $P_\parallel$ and $J_\parallel$. The displayed $\mathbf P_{\mathrm{kin}}=\sum_i\mathbf v_i$ is an equal-weight linear diagnostic, not a primitive mass sum. Replacing each velocity by an isotropic momentum map $P(\|\mathbf v_i\|)\hat{\mathbf v}_i$ preserves the axial conclusions because each $C_3$ orbit has equal speed. The combination $\mathbf J\cdot\mathbf P$ is origin independent: shifting the origin changes $\mathbf J$ by a cross product with $\mathbf P$, orthogonal to $\mathbf P$. For $\mathbf P\ne0$, the geometric screw pitch is $(\mathbf J\cdot\mathbf P)/\|\mathbf P\|^2$. These are kinematic identities, not conservation laws. A conserved total momentum or angular momentum requires an independently derived motion, wake and boundary account on the same retained history. Symmetry fixes the particle-diagnostic directions but does not itself construct that account or prove its conserved magnitudes.

For prescribed common-frequency co-rotation with fixed internal axial heights, translation along $\hat{\mathbf n}$ is perpendicular to each site's internal tangential velocity, giving the speed split described in the configuration-independent [transverse internal-motion speed-budget premise and consequence](braid-mathematics.md#transverse-internal-motion-speed-budget-premise-and-consequence). General evolving $C_3$ histories need not preserve those fixed heights or transverse internal velocities; their speed budget must retain the actual axial motion and cross term. A mechanism that pins the total site-speed budget remains an open branch hypothesis.

## Retention and Return Response

The prescribed phase-compensated equal-geometry orthogonal-axis three-binary configuration geometry and its exact near-rest reference fixture do not establish retention. The following diagnostic and no-return result state what a phase-compensated equal-geometry orthogonal-axis three-binary configuration branch record must overcome.

### Near-Antipodality Recovery Diagnostic

Exact antipodality belongs to the phase-compensated equal-geometry orthogonal-axis three-binary configuration reference fixture. A retained record under external disturbance need not preserve that ideal relation at every instant, so recovery is tested separately from the member definition. Let $\iota$ exchange the two opposite-polarity members of each binary, let $\mathbf C(T)$ be the declared braid-center curve, and let $R$ be the common phase-compensated equal-geometry orthogonal-axis three-binary configuration binary radius. Define

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0879e008fffe5d50)

A candidate recovery entry must declare tolerances and show

$$
\sup_{T\in J}\delta_{\mathrm{anti},i}(T)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(T+T_{\mathrm{recov}})
\leq
\theta_{\mathrm{recov}}\,\delta_{\mathrm{anti},i}(T)+\varepsilon_{\mathrm{drive}},
\qquad
0\leq\theta_{\mathrm{recov}}<1
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c906dd7bb567512)

for $T,T+T_{\mathrm{recov}}\in J$. Here $T_{\mathrm{recov}}$ is the declared recovery time, $\theta_{\mathrm{recov}}$ is the dimensionless recovery contraction factor, and $\varepsilon_{\mathrm{drive}}$ is the driving residue. This is a certificate target, not an established phase-compensated equal-geometry orthogonal-axis three-binary configuration property.

### Isolated Release and the Return-Response Question

Two claims about the face-opposite seed on the [zero-angular-momentum channel](#invariant-channels-and-equivariant-reductions) must not be conflated. Under the invariant-channel lemma's complete-history and uniqueness hypotheses, the solution remains on that channel, with center zero, equal site radii, and antipodal partners. This symmetry statement does not determine the trajectory or establish retention. Zero summed angular momentum does not make each site's velocity radial; the two-function channel can have a nonzero tangential speed contribution to its radius equation. The void supplies no environmental restoring term, while the actual internal response still has to be evaluated. What the isolated seed does once released is open, and is a target for direct evolution rather than a recorded result. Claim level: derived conditional equivariance theorem; dynamical fate open.

The isolated fixture leaves several internal and environmental response questions open: the complete signed self-hit contribution where such roots are admitted, tangential exchange, a derived wake-energy account, shielding, angular-momentum-bearing initial data, and local Noether sea response. None of these entries is an established support mechanism for this fixture, and circular self-hit cannot supply centripetal support by itself. The retention question asks whether a specified internal or environmental response produces a second turning point, a stable support radius, or a bounded cycle while also satisfying the full acceleration and account requirements. The threefold rotating channel supplies one internal comparison; the zero-angular-momentum channel remains a two-function delayed system rather than an established radial free-fall trajectory. The environmental candidate is the sea-embedding route below.

The invariant channel admits a conditional no-return certificate once its acceleration bound is established on the actual retained history. Let $R(T)=\|\mathbf x_{+,x}(T)\|>0$ and assume a fixed complete-past speed margin $\|\mathbf V_\ell\|\le\beta c_f$ with $0\le\beta<1$ on every contributing emission-to-reception interval. Require complete retained-root coverage, at most $M$ partner hits per receiver, an acceleration-weight bound $W\le W_{\max}$, and a same-time separation floor $d_{\mathrm{instant}}\ge\alpha_{\mathrm{sep}}R(T)$ for every contributing partner, with one fixed $\alpha_{\mathrm{sep}}>0$. The opposite-polarity same-time floor follows from the channel geometry, but an all-partner floor also requires control of the same-polarity separations. For each causal chord $r$, the transmitter displacement is at most $\beta c_f(T_r-T_t)=\beta r$, so the triangle inequality gives $r\ge d_{\mathrm{instant}}/(1+\beta)$. The same speed margin gives $W\le1/(1-\beta)$. With the kernel normalization above, all partner contributions therefore satisfy $\|\mathbf A_{+,x}\|\le K/R^2$, where $K=|\kappa| M W_{\max}(1+\beta)^2/\alpha_{\mathrm{sep}}^2$ is fixed on the certificate interval. The complete retained policy must justify $M$; speed monotonicity alone does not establish inclusion of a root within finite memory. No same-polarity delayed row is discarded by a presumed outward sign. Since $\ddot R=\hat{\mathbf x}_{+,x}\cdot\mathbf A_{+,x}+(\|\mathbf V_{+,x}\|^2-\dot R^2)/R$, the bound implies $\ddot R\ge-K/R^2$. While $\dot R>0$, the derivative of $\dot R^2/2-K/R$ is nonnegative. Consequently an outward state satisfying $\dot R^2>2K/R$ cannot have a later first turning point while all these hypotheses hold. This is a derived conditional implication, not evidence that an isolated EOM history enters its outward domain.

After the outward margin is cleared, a return under the same isolated partner-wake law requires failure of at least one certificate hypothesis before the turn: speed margin, separation, root coverage, acceleration-weight bound, or the fixed complete acceleration bound. This result does not identify which event occurs, and it does not require every retention mechanism to drive a member to $c_f$. An environmental contribution can change the radial bound while all member speeds remain below $c_f$; its effect must be derived from the complete interaction record. The anti-damping indications in [Braid Mathematics](braid-mathematics.md#scoped-anti-damping-results) remain scoped to their own histories and do not decide this fixture's fate. The return-response target is therefore a complete internal or environmental history with its actual radial bound and turning behavior established. [Braid Mathematics](braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord) distinguishes coincident self-root endpoints from finite-chord folds; that geometry alone establishes neither an absorber nor a fixed action transfer. The environmental candidate is the sea-embedding route below.

### The Sea-Embedding Route

The environmental route embeds the same phase-compensated equal-geometry orthogonal-axis three-binary configuration at rest in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. This does not define a new taxonomy member; it is the same configuration with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The environmental route asks whether the delayed response of a like-assembly population supplies a second turning point, a stable support radius, or a bounded cycle on the target history. Closing it requires an explicit like-assembly population record, a declared boundary condition, and a Noether sea response entry tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). Whether a static like-assembly environment can supply retention, and whether a dynamic, formation-history-driven Noether sea response can do what a static one cannot, are open questions; no environmental verdict is carried in this chapter.

## Claim Boundary

The invariant-channel lemma, its exact channel corollaries, the two-ring geometry, the dipole identity, the momentum-screw alignment, and the conditional no-return bound retain their stated derivation or exact-kinematic grades. None establishes phase-compensated equal-geometry orthogonal-axis three-binary configuration branch retention. A same-record evolution that violates the lemma's hypotheses or its predicted fixed-point relations would falsify application of the theorem to that record; a retained phase-compensated equal-geometry orthogonal-axis three-binary configuration claim still requires the complete certificate defined in [Braid Recovery Requirements](braid-recovery-requirements.md).
