# A2 Symmetry and Return Response

A2 is the fully symmetric Family-A member defined in [Braid Family A](braid-family-a.md#a2). This specialist chapter owns the mathematics and retention analysis unique to its exact face-opposite reference fixture: the invariant symmetry channels, the two-ring projection, the axial polarity dipole, the momentum screw, the near-antipodality diagnostic, and the isolated and sea-embedded return-response questions.

The chapter does not redefine A2 and does not certify a retained branch. Its exact results constrain the declared A2 fixture under their stated hypotheses. The realization-independent retention contract remains in [Braid Recovery Requirements](braid-recovery-requirements.md), and the family-general speed split remains in [Braid Mathematics](braid-mathematics.md#transverse-internal-motion-speed-budget-lemma).

## Invariant Channels and Equivariant Reductions

The sharpest currently proved structure for A2 is a symmetry channel, not a retained branch. The face-opposite seed places the three electrinos opposite the three positrinos on the positive coordinate axes,

$$
\epsilon_{+,x}=(R,0,0),
\qquad
\epsilon_{+,y}=(0,R,0),
\qquad
\epsilon_{+,z}=(0,0,R),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

This seed lies on a common sphere, so it is the maximal-symmetry Family-A member: the A2 reference fixture defined in [Braid Family A](braid-family-a.md#a2). Two finite symmetry groups act on the seed by simultaneous spatial transformation and site relabeling. For a coordinate-axis permutation $\rho\in S_3$, let $M_\rho$ be the coordinate-permutation matrix and let $\rho$ permute site labels within each polarity; let $\iota$ compose point inversion with polarity exchange. Both act on configurations by

$$
(g\cdot\mathbf X)_\ell(t)=M_g\,\mathbf X_{g^{-1}\ell}(t)
$$

and because point inversion commutes with every permutation matrix, the groups are direct products: the zero-angular-momentum group $G_0=S_3\times\langle\iota\rangle$ of order twelve, and the body-diagonal rotating group $G_{\mathrm{rot}}=C_3\times\langle\iota\rangle$ of order six, where $C_3=\langle\varrho\rangle$ is the three-fold rotation about the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt3}
$$

No physical process relabels an electrino as a positrino: every architrino is unique, with its own provenance and path history. The operations above are comparison maps between two possible configurations of the universe. If one configuration solves the delayed dynamics, its transformed twin solves it too. When the seed happens to be its own twin, the twins' shared trajectory is constrained, and that constraint is the entire content of the channel.

### The Six-Point Symmetry Invariant Lemma

The channel statement is a derivation about the delayed dynamics, proved for the partner-wake master-equation kernel class. For receiver $\ell$ at reception time $T_r$, the retained acceleration law under proof is

$$
\mathbf A_\ell[\mathbf X]\!(T_r)
=
\sum_{\ell'}\;
\sum_{T_t\in\mathcal R_{\ell\ell'}[\mathbf X]\!(T_r)}
\sigma_\ell\sigma_{\ell'}\,\kappa\,
\frac{W(T_t)}{\left(d^2+\varepsilon^2\right)^{3/2}}\;\mathbf d
$$

where $\mathbf d=\mathbf X_\ell(T_r)-\mathbf X_{\ell'}(T_t)$ with $d=\|\mathbf d\|$, the causal roots $T_t$ solve $d=c_f(T_r-T_t)$ within the retained history window, $\varepsilon$ is the softening, $\kappa$ the coupling, and the acceleration weight is $W=c_f/|D_t|$ on a sign-certified transmitter-side Jacobian floor. Receiver-side velocity remains in the signed root-playback record $D_r/D_t$ but not in this instantaneous acceleration kernel.

Four explicit hypotheses carry the proof:

1. **Kernel equivariance.** The acceleration magnitude depends only on invariant scalars times the polarity product $\sigma_\ell\sigma_{\ell'}$, directed along $\hat{\mathbf d}$.
2. **Symmetric retained-root policy.** The retained-root set is determined by the root residual and declared invariant criteria only, with no ordering-dependent or label-dependent pruning.
3. **Well-posedness window.** On the window, pairwise separations keep a positive floor and all speeds stay below field speed by a fixed margin; then each directed pair has exactly one causal root, the Jacobian floor is automatic, and the method of steps yields a unique forward solution.
4. **Symmetric initial history.** The hold-window history is invariant under the acting group: the static seed is $G_0$-invariant, and the rigidly rotating seed about $\hat{\mathbf n}$ is $G_{\mathrm{rot}}$-invariant. Transpositions reverse the rotation sense and are excluded from the rotating group; this is where ordered-braid chirality first enters the rotating channel.

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

a closed two-function state-dependent delay system in $(a,b)$. On the body-diagonal rotating channel,

$$
\epsilon_{+,y}=\varrho\,\epsilon_{+,x},
\qquad
\epsilon_{+,z}=\varrho^2\,\epsilon_{+,x},
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

a closed three-function reduced system in $\epsilon_{+,x}$ alone. Once the branch also carries group velocity along $\hat{\mathbf n}$, translation breaks $\iota$ while preserving $C_3$, and the reduction needs two representative worldlines, $\epsilon_{+,x}$ and $\epsilon_{-,x}$.

Exact corollaries follow on the channel: the dynamic center is identically zero and antipodal pairs are exact; all six sites share one radius and one speed, so the reduced-radius diagnostic is exact rather than an empirical average; the acceleration of $\epsilon_{+,x}$ has the template $(A,B,B)$ forced by its stabilizer; and the kinematic angular momentum is exactly parallel to $\hat{\mathbf n}$ on the rotating channel.

The scope boundary is part of the result. Invariance of the channel does not prove stability transverse to it, and no statement in this section claims branch retention. The lemma is a derivation-closure result for the invariance and reduction obligations only, proved for the declared kernel class. Any solver kernel or runner that violates kernel equivariance or root-policy symmetry — an axis-fixed cap, asymmetric softening, or ordering-dependent pruning — voids the conclusion for that run, which makes the lemma an audit predicate on implementations. Applying the channel to any retained-history record still requires the same-record receiver-side, action, wake, event, support, and stability entries demanded by [Braid Recovery Requirements](braid-recovery-requirements.md).

### Polarity Conjugation

Because the delayed acceleration kernel depends on polarity only through products $\sigma_i\sigma_j$, global polarity conjugation leaves every trajectory unchanged: an electrino-face-leading branch and a positrino-face-leading branch are exactly degenerate in isolation. The leading-octant sign can acquire physical meaning only through coupling to an environment that is not polarity-balanced, which is where ordered-braid chirality must obtain its content; the helicity sign of the momentum screw below is the candidate carrier of that chirality label. Translation along $\hat{\mathbf n}$, by contrast, produces a real asymmetry: with $\iota$ broken, the leading face meets fresh medium while the trailing face rides in the branch's own wake, and this fore-aft wake asymmetry is the native deformation channel developed further in [A1 Dynamics](braid-a1-dynamics.md#a1-dynamics).

## A2 Two-Ring Geometry

Every site of the face-opposite A2 seed has the same height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and the same lever arm $R\sqrt{2/3}$ from the axis, because the body diagonal makes equal angles $\arccos(1/\sqrt3)$ with the three coordinate axes. Viewed along $\hat{\mathbf n}$, the three electrinos form one triangular ring below the mid-plane and the three positrinos form a matching triangular ring above it. The two triangles are staggered by $60^\circ$, so their projections interleave into a hexagon.

The two-ring view also organizes the neutral braid's channel bookkeeping. Each site's two repulsive channels connect it to its own ring mates, and its three attractive channels connect it to the opposite ring. Intra-ring repulsion spaces each ring at $120^\circ$, while inter-ring attraction sets the ring separation. The same minimum-energy logic that arranges accessory charges around a dressed assembly therefore already organizes the core itself: two mutually repelling rings are bound face-to-face by cross-ring attraction. Each member of one ring couples attractively to all three members of the other, and the staggered rings give those connections a zigzag pattern. Under rotation the connections wind into helices about the axis, and the handedness of the winding is the chirality datum carried by the rotating channel. Equal lever arms give every site the same tangential speed under rigid rotation about $\hat{\mathbf n}$, and on the rotating channel the three opposite-polarity pairs hold an exact $120^\circ$ phase separation at every instant, because the rotation by $2\pi/3$ about $\hat{\mathbf n}$ is one of the acting symmetries rather than an approximate phase convention.

## Moments and the Axial Polarity Dipole

A **moment** here is a polarity-weighted sum over the configuration: the plain total $\sum_\ell\sigma_\ell$ is the net polarity inventory, the first moment $\sum_\ell\sigma_\ell\mathbf X_\ell$ is the dipole, and higher moments record signed shape at finer order. Moments matter because they are what a distant receiver can reconstruct from the superposed delayed potential, ranked by distance: the $\ell$-th moment controls the contribution fading as $1/r^{\ell+1}$. For a polarity-neutral assembly the dipole is independent of the choice of origin, so the braid's dipole is a well-defined property of the branch rather than of a coordinate convention.

Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$ for the cyclic coordinate permutation $\varrho$, the polarity-signed dipole of the channel is exactly axial at all times, even under drift:

$$
\sum_{\ell}\sigma_\ell\,\mathbf X_\ell
=
3\left(\hat{\mathbf n}\cdot\left(\epsilon_{+,x}-\epsilon_{-,x}\right)\right)\hat{\mathbf n}
$$

The transverse dipole components cancel in balanced three-phase fashion. This cancellation is a statement about the braid's summed distant signature, not about the accelerations inside it: each architrino still receives the full delayed influence of all five partners through its own causal roots, and none of those per-receiver contributions vanish. What cancels is the collective polarity-signed moment that a distant receiver reconstructs from the superposed wakes. A branch that flattens toward the transverse plane therefore loses its leading polarity-signed moment entirely: the flattened fast configuration is quiet at dipole order, with its first surviving structure at higher moment order. This identity is the channel's native contribution to the energy-shielding story used by the Family-A chapters, and it links the terminal planar limit to wake quietness rather than to increased exposure.

## Momentum Screw and Helicity

The same projector identity pins both kinematic momenta to the axis on the rotating channel:

$$
\mathbf P_{\mathrm{kin}}
=
3\,\hat{\mathbf n}\cdot\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\hat{\mathbf n},
\qquad
\mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}
$$

The body-diagonal direction is therefore the central axis of the branch's momentum screw: the unique direction that carries both linear and angular kinematic momentum, with the transport state reduced to the two scalars $P_\parallel$ and $J_\parallel$. The displayed $\mathbf P_{\mathrm{kin}}=\sum_i\mathbf v_i$ is an equal-weight linear diagnostic, not a primitive mass sum. For an isotropic momentum function, replace each velocity by $P(\|\mathbf v_i\|)\hat{\mathbf v}_i$; equal site speeds and the same projector symmetry preserve the axial direction conclusions. Their origin-independent combination $\mathbf J\cdot\mathbf P$ — helicity in normalized form, screw pitch in geometric form — is the natural combined label, since an origin shift changes $\mathbf J$ only by a term orthogonal to $\mathbf P$. In delayed dynamics the particle-only momenta are not separately conserved; the causal wakes carry momentum and angular momentum of their own, and conservation is a statement about the combined particle and wake ledger. On the channel, symmetry fixes the momentum directions exactly while the magnitudes exchange with the wake ledger.

For the translating rotating A2 channel, group velocity along $\hat{\mathbf n}$ is perpendicular to every site's tangential velocity. Its exact site-speed split is therefore an A2 realization of the family-general [transverse internal-motion speed-budget lemma](braid-mathematics.md#transverse-internal-motion-speed-budget-lemma). A mechanism that pins the total site-speed budget remains an open branch hypothesis.

## Retention and Return Response

The prescribed A2 geometry and its exact near-rest reference fixture do not establish retention. The following diagnostic and no-return result state what an A2 branch record must overcome.

### Near-Antipodality Recovery Diagnostic

Exact antipodality belongs to the A2 reference fixture. A retained record under external disturbance need not preserve that ideal relation at every instant, so recovery is tested separately from the member definition. Let $\iota$ exchange the two opposite-polarity members of each binary, let $\mathbf C(T)$ be the declared braid-center curve, and let $R$ be the common A2 binary radius. Define

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R}
$$

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

for $T,T+T_{\mathrm{recov}}\in J$. Here $T_{\mathrm{recov}}$ is the declared recovery time, $\theta_{\mathrm{recov}}$ is the dimensionless recovery contraction factor, and $\varepsilon_{\mathrm{drive}}$ is the driving residue. This is a certificate target, not an established A2 property.

### Isolated Release and the Return-Response Question

Two claims about the face-opposite seed on the [zero-angular-momentum channel](#invariant-channels-and-equivariant-reductions) must not be conflated. The symmetry claim is established: the seed stays exactly on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact — an equivariance theorem of the channel, independent of any trajectory. The retention claim is a separate question, and the isolated seed does not answer it in the affirmative: the channel carries no centrifugal support and the void supplies no restoring term, so nothing in the isolated construction makes it a self-maintaining branch. What the seed actually does once released is open, and is a target for direct evolution rather than a recorded result. Claim level: established equivariance theorem for the channel; the dynamical fate is open.

This pairing is informative rather than damaging. A2 was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-transmitter self-hit contributions, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The threefold rotating channel above supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support. The environmental candidate is the sea-embedding route stated next.

The question can be stated sharply rather than qualitatively, because the invariant channel carries a conditional no-return certificate. Two monitored conditions carry it: sub-field speed, meaning every worldline stays below the field speed $c_f$; and an opposite-polarity separation floor, meaning the closest opposite-polarity non-antipodal pair stays at least one reduced radius $R$ apart. The floor holds automatically from the channel's own geometry, and the retained causal-root count reduces to exactly one root per directed pair, so sub-field speed is the only condition that must be watched forward in time. Under the two conditions the reduced-radius acceleration satisfies a signed inverse-square lower bound $\ddot R\ge -K/R^2$, with $K$ built only from the branch's coupling, its declared speed and weight caps, and the polarity structure. Same-polarity partner terms cancel by an exact radial-sign argument, and the opposite-polarity terms are bounded by the floor. A short energy-integral argument then closes it: if the outward speed at a chosen certificate time clears the margin $\dot R^2>2K/R$, the reduced radius cannot turn back while the two conditions hold. This conditional statement is an established derivation on the channel, not a retained-branch claim. Whether any isolated branch actually clears the margin is an evolution question and is open.

The consequence sharpens the return-response question to a single named target. A return turn cannot be the first event — any return must be preceded by a violation of sub-field speed or the opposite-polarity floor — so once the margin is cleared on the isolated channel the reduced radius cannot turn back while the branch stays sub-field, and retention is possible only through a term that ends sub-field speed first, driving the internal speed to the field-speed hinge where the outward drive stops before the radius can turn. If the anti-damping indications of [Braid Mathematics](braid-mathematics.md#scoped-anti-damping-results) hold, any such transverse pumping feeds escape rather than return, and its only bearing on the certificate is that it pushes the speed toward $c_f$, the condition whose failure ends the window. The open target is therefore precise: exhibit an internal or environmental absorber that ends sub-field speed before the margin is crossed. The fold-geometry constraint on single-site absorbers is set out in [Braid Mathematics](braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord); the environmental candidate is the sea-embedding route below.

### The Sea-Embedding Route

The environmental route embeds the same A2 configuration at rest in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. This does not define a new taxonomy member; it is the same configuration with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing it requires an explicit like-assembly population record, a declared boundary condition, and a Noether sea response entry tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). Whether a static like-assembly environment can supply retention, and whether a dynamic, formation-history-driven Noether sea response can do what a static one cannot, are open questions; no environmental verdict is carried in this chapter.

## Claim Boundary

The invariant-channel lemma, its exact channel corollaries, the two-ring geometry, the dipole identity, the momentum-screw alignment, and the conditional no-return bound retain their stated derivation or exact-kinematic grades. None establishes A2 branch retention. A same-record evolution that violates the lemma's hypotheses or its predicted fixed-point relations would falsify application of the theorem to that record; a retained A2 claim still requires the complete certificate defined in [Braid Recovery Requirements](braid-recovery-requirements.md).
