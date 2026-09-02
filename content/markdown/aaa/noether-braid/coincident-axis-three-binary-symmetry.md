# Coincident-Axis Three-Binary Symmetry

This chapter owns the coincident-axis three-binary locus harmonic-matching hypothesis, discrete-symmetry derivations, and open retention burden. The prescribed common-center, common-axis path geometry and its equatorial, axial, and axial-translation loci are defined in [Braid coincident-axis three-binary configurations](3d-braid-assemblies.md).

The status discipline of the braid stack binds throughout. coincident-axis three-binary locus is a prescribed member, not a retained branch. The kernel-covariance results below are derivations within their declared scope; physical formation, self-support, retention, selection, and observer-level symmetry recovery remain open. The retained-branch certificate target of [Braid Recovery Requirements](braid-recovery-requirements.md) governs those claims.

## The Harmonic-Matching Hypothesis

The fixed-coordinate co-rotation hypothesis is motivated by a structural argument; the argument does not select the coincident-axis three-binary locus antipodal geometry, and its quantitative force is untested. A circular orbit's kinematic requirement is a single-harmonic rotating vector, so only the time-constant part of the received causal wake in the co-rotating frame can supply it. Common-frequency co-rotation puts all wake power into exactly that part. Any relative binary motion — frequency locks between binaries, counter-rotation, or speed modulation — moves wake power into oscillating harmonics that circular kinematics cannot absorb, and the lowest-mode orbit deformations add kinematic harmonics faster than they match wake harmonics.

Causal delay is what would make this principle decisive rather than a soft preference. During one antipodal wake transit at near-field speed the pair rotates through roughly a third of a turn, so static-binding intuition — including the naive Kepler-third-law scaling for frequency-separated binaries — does not transfer to the delayed dynamics. Claim level: analytic structural argument; the comparative strength of common-frequency co-rotation against the other taxonomy members is not established.

The fixed-coordinate prescription has a second, exact consequence: every pairwise alignment scalar between sites is time-constant, so any alignment condition arranged once in the geometry holds around the entire cycle, sustained by the co-rotation itself rather than by a separate phase-locking mechanism.

## Cyclic-Symmetric Orthogonal-Axis/Coincident-Axis Overlap

The face-opposite phase-compensated equal-geometry orthogonal-axis three-binary configuration seed has a second exact chart on the body-diagonal axis $\hat{\mathbf n}=(1,1,1)/\sqrt3$. Every site has axial height magnitude
$$
h=\frac{R}{\sqrt3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fc7bcb8b643c7fc8)
and transverse radius
$$
\rho=R\sqrt{\frac23},
\qquad
\frac{h}{\rho}=\frac{1}{\sqrt2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-fdf6b8e61333862d)
The three equal-radius path pairs have that axis, one angular frequency and circulation sense, and phases separated by $120^\circ$. Under common-frequency co-rotation about $\hat{\mathbf n}$ they therefore occupy a cyclic-symmetric coincident-axis three-binary sublocus. The same prescribed worldlines admit a phase-compensated orthogonal-axis description and a coincident-axis description; these are coordinate structures over one physical inventory, not duplicate assemblies.

This overlap is independent of the orthogonal-axis three-binary $\lambda=1$ boundary. It also does not certify retention. The fixed-plane lemma below derives axial no-balance for a polarity-segregated interior two-ring chart on every ordinary simple-root branch chart, without imposing a member-speed ceiling. The all-equatorial boundary remains the only fixed-coordinate coincident-axis three-binary locus-family locus not excluded by that axial argument, but it still requires the full retained-branch certificate.

### Fixed-Plane Axial No-Balance Lemma

Fix an oriented axis $\hat{\mathbf n}$ and two parallel planes at signed axial heights $+h$ and $-h$, where $h>0$. Let each labeled worldline remain in its assigned plane throughout the complete active emission-to-reception history, let the axial center be stationary, and segregate the polarities so that every site in one plane has one polarity and every site in the other plane has the opposite polarity. Assume bounded continuous histories that are differentiable with finite velocity at each admitted root, positive ranges, and a complete ledger of ordinary simple causal roots with finite nonzero transmitter factors. No common angular frequency, constant member velocity, or bound on member speed is required.

Write $s_i\in\{+1,-1\}$ for receiver $i$'s plane, so $\hat{\mathbf n}\cdot\mathbf X_i=s_i h$. For a hit emitted by a site $j$ in the same plane, including a same-transmitter hit, the canonical delayed separation has zero axial projection. For a hit emitted from the opposite plane,

$$
\hat{\mathbf n}\cdot\hat{\mathbf r}_{ij}
=
\frac{2s_i h}{r_{ij}},
\qquad
\hat{\mathbf n}\cdot\mathbf A_{ij}
=
-s_i\frac{2\kappa |q_iq_j|h}{r_{ij}^{3}}W^{\mathrm{acc}}_{ij},
$$

[View →](../../../../equation-mapping.html#corpus-equation-41c91addc9177652)

where $W^{\mathrm{acc}}_{ij}=c_f/|D_{t,ij}|>0$ on an ordinary simple root. Thus every opposite-plane hit accelerates the receiver strictly toward the midplane, while every same-plane hit contributes exactly zero axially. The signs cannot cancel. A bounded complete opposite-plane history supplies at least one cross-plane root: for delay $\tau\ge0$, the continuous root residual $F(\tau)=c_f\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|$ begins negative and becomes positive once $c_f\tau$ exceeds the bounded separation. If that crossing is non-simple, the history has left the lemma's ordinary-root domain rather than produced axial balance.

A fixed-height path has $\hat{\mathbf n}\cdot\ddot{\mathbf X}_i=0$, contradicting the strictly inward axial sum. Therefore no polarity-segregated rigid two-ring history satisfying these assumptions is acceleration-balanced at nonzero height. The conclusion includes finite sub-field, field-speed, and super-field-speed motions because member speed changes the root inventory and positive weights but not the axial signs.

Claim level: **derived** from the canonical [Master Equation](../dynamics/master-equation.md#transmitter-side-roots-acceleration-weight-and-action-residual) on the stated ordinary simple-root chart. The lemma excludes caustics, non-simple roots and any associated event contribution, collisions, incomplete or unbounded histories, variable ring height, plane precession, axial translation, old history outside the two fixed planes, mixed polarity within a plane, and any external, constraint, or Noether-sea acceleration. The $h=0$ planar boundary is outside its strict conclusion. A complete bounded ordinary-root history meeting the assumptions whose exact canonical axial acceleration sum vanishes would falsify the result. The lemma makes no claim about retention, stability, post-release fate, or an orthogonal-plane weave.

## Discrete-Symmetry Structure

Claim level: **analytical (derivation grade) for the declared kernel's discrete-symmetry covariance; derivation target for physical formation, branch retention, and weak-sector parity and $CP$ recovery.** This section distinguishes what the interaction law fixes from what the imposed fixed-channel geometry and any later effective transaction operator would still have to establish.

**The law's evenness.** The pairwise causal-wake law is even under polarity conjugation $C$ (every electrino $\leftrightarrow$ positrino: only the polarity product $\sigma_a\sigma_b$ enters, invariant under a global sign flip of every polarity) and even under parity $P$ (the acceleration is radial along the delayed line of action, $\propto\hat{\mathbf r}/r^2$, with no primitive handedness). Two exact degeneracies follow at once, as theorems about the law rather than observations about a solution: the $C$-image of any closed configuration — the polarity-conjugate braid, the same geometry with every polarity reversed — is a degenerate solution, and the $P$-image — the mirror geometry with rotation sense reflected — is a degenerate enantiomer. Polarity conjugation does not change the pro/anti ordered orientation because it does not move a worldline.

**The chiral invariant.** A prescribed coincident-axis three-binary locus member is chiral when its axial polarity dipole $\mathbf p$ (polar, reversed by both $C$ and $P$) is locked to its spin $\mathbf S$ (axial, invariant under both $C$ and $P$), with the binary phase offsets supplying the third locked structure. Their product is a pseudoscalar,

$$
\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S),
$$

[View →](../../../../equation-mapping.html#corpus-equation-fb282f2daf21e3eb)

the declared chiral invariant of that prescribed member. Its transformation law is forced by the vector characters above:

| operation | $\mathbf p$ | $\mathbf S$ | $\chi$ |
| --- | --- | --- | --- |
| $C$ (polarity conjugation) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $P$ (parity) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $CP$ | $+\mathbf p$ | $+\mathbf S$ | $+\chi$ |

So $C$ and $P$ each reverse $\chi$, while $CP$ preserves it. For the declared polarity-product radial kernel, the $C$-, $P$-, and $CP$-transforms of any solution are degenerate transformed solutions. This is an exact covariance of the declared kernel; it does not establish formation into an $\iota$-fixed history, branch retention, or $CP$ conservation in weak reaction channels. Claim level: derivation grade for the declared kernel.

The pro/anti ordered orientation is a separate sign. Let $o_{\mathrm{PA}}$ denote the deformation-stable orientation extracted from the indexed coincident-axis three-binary locus path or angular-momentum-frame record. It is not a high/middle/low radius order. Because $C$ leaves worldlines fixed, $o_{\mathrm{PA}}$ is $C$-even; because $P$ mirrors the orientation, it is $P$-odd. The polarity-assignment sign on this chart is therefore

$$
c_{\mathrm{pol}}
\equiv
\chi o_{\mathrm{PA}},
\qquad
\chi=o_{\mathrm{PA}}c_{\mathrm{pol}}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9860f65e88fc9cff)

Thus $C$ reverses $c_{\mathrm{pol}}$ at fixed $o_{\mathrm{PA}}$, while $P$ reverses $o_{\mathrm{PA}}$ at fixed $c_{\mathrm{pol}}$. With left/right defined by the sign of $\chi$, $C$ maps a left braid to a right polarity-conjugate braid on the same pro/anti orientation; $CP$ maps it to a left polarity-conjugate braid on the mirrored orientation. This is exact covariance of the declared kernel plus definition-level sign bookkeeping. It does not establish formation, branch retention, or $CP$ conservation in weak reaction channels.

**Any axial polarity-orientation selection must be $C$-covariant.** If a dynamical mechanism selects a preferred group-velocity orientation relative to the axial polarity dipole — one polarity-leading side — the kernel evenness forces the selection to lock to $\chi$ rather than to an absolute polarity: a braid and its $C$-image would lead with opposite polarities, and the two configurations would be exactly degenerate under the kernel covariance. Whether any such selection mechanism exists is an open question; none is asserted here.

**The crossing order is the observable face of $o_{\mathrm{PA}}$, not of $\chi$ alone.** An observer stationed on the incoming group-velocity axis, watching the three binary paths cross a reference meridian as the braid rotates, records a fixed cyclic order — $1{:}2{:}3$ or $1{:}3{:}2$ — whose sign is $o_{\mathrm{PA}}$; the two orders are the $P$-image enantiomers. Polarity conjugation leaves that sequence unchanged while reversing $\chi$. For a prescribed common-frequency co-rotating chart this order is a structural invariant, and its invariance is also a representability marker: a genuine closed braid preserves the order, whereas a differential- or counter-rotating configuration lets the binaries lap and the order scramble.

**Which channels could read the glove.** Effective channels that do not resolve the internal lock are candidates to inherit the declared kernel's parity covariance. A weak-flavored transaction channel that reorganizes the internal lock is a candidate route by which a maximal coincident-axis three-binary locus lock could produce maximal parity selectivity, but no weak-transaction operator has yet been derived from a retained branch record. The primitive kernel remains $CP$-covariant; reproducing the measured nonzero $CP$ asymmetries therefore requires a separate $CP$-odd effective event or branch residual. Candidate sources include Noether sea polarity/chirality texture and interference between transaction paths at different group-velocity-dependent internal angles, but these are hypotheses rather than established next-order terms. The combined $CPT$ benchmark is carried in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md).

The coincident-axis three-binary locus construction therefore supplies a conditional discrete-symmetry scaffold, not yet a recovery of the observed pattern. A retained chiral branch and a derived weak-transaction operator must still produce the observed handedness selectivity, while a separate $CP$-odd event or branch residual must reproduce the measured kaon and B-system asymmetries. Neither recovery has been established. Claim level: derivation target for weak parity and $CP$ recovery; the primitive-kernel covariance is exact within its declared scope.

## Candidate Status and Open Burden

coincident-axis three-binary locus is a prescribed member. Everything beyond its exact geometry and the declared kernel-covariance structure is open: whether any realization satisfies the master equation, whether a satisfying realization persists under evolution, whether persistence requires an environment, and how coincident-axis three-binary locus compares with the other taxonomy members. Those questions are governed by the retention contract of [Braid Recovery Requirements](braid-recovery-requirements.md). Results enter this chapter only when established, with instrument and claim level stated.
