# Spindle Braid

The **spindle braid** is a named candidate realization of the [Noether Braid](noether-braid.md) case structure. It is the rigid uniaxial iso-frequency family: all six architrinos co-rotate at one common frequency about a single shared axis, with each binary a tilted antipodal pair. This chapter owns the family's definition and exact geometry, the harmonic-matching hypothesis that motivates its rigidity, and its discrete-symmetry structure. The configuration-space axes that locate the family among alternatives belong to [Noether Braid Configuration Space](noether-braid-configuration-space.md); the comparison families are collected in [Braid Families](braid-families.md).

The status discipline of the braid stack binds here as everywhere. The spindle braid is a named candidate family, not a retained branch. Its definition, geometry, and symmetry structure are exact statements about the family; whether any realization is retained, self-supporting, or preferred among the candidate families is entirely open. No family ranking is asserted in this chapter. The retained-branch certificate target of [Braid Families](braid-families.md#the-neutral-braid-base-of-the-family-ladder) remains the open burden.

## Definition and Geometry

The spindle braid carries the neutral braid inventory: three electrinos and three positrinos organized as three binaries. The family is defined by three constraints.

1. **One axis.** All six architrinos rotate rigidly about a single shared axis.
2. **One frequency.** The rotation is iso-frequency: every site returns at the same common angular frequency $\omega$, so the family sits in the `1:1:1` frequency-ratio row of the classification axes.
3. **Tilted antipodal binaries.** Each binary is an antipodal pair on its own layer sphere of radius $R_a$, tilted by a cap angle $\alpha_a$ out of the equatorial plane.

Antipodality is therefore a defining restriction of this candidate family. It is not derived here as a formation outcome, an attracting channel, an energetic minimum, or a retained branch. Claim level: definitional for the spindle family; derivation target for physical formation and selection.

Under rigid rotation every site traces a horizontal circle about the shared axis, and the speed of layer $a$ is

$$
s_a=\omega R_a\cos\alpha_a
$$

This formula is the family's defining mechanism: the tilt angles decouple the speed tuple $s_1:s_2:s_3$ from the spherical nesting order $R_1:R_2:R_3$. A frequency-separated nested arrangement must trade layer speed against nesting radius; the spindle braid does not. The farthest layer can be the slowest, and the full unordered speed tuple remains a free search coordinate at one common frequency.

The swept envelope gives the family its name. The union of the six horizontal circles over one period is fusiform — spindle-shaped — with slow near-polar caps and the widest working ring at the equator.

## Boundary Members

The family contains two previously named configurations as limits of the cap-tilt coordinate:

- the **planar tri-binary** state is the flat limit $\alpha_a=0$, all three binaries working the equatorial plane;
- a **static axial pair** is the full-cap-tilt limit, the binary degenerated onto the axis.

The planar and axial alternatives studied elsewhere in the braid stack are therefore best read as boundary members of the spindle family rather than rivals.

## The Harmonic-Matching Hypothesis

The rigidity constraint is motivated by a structural argument; the argument does not select antipodality, and its quantitative force is an untested hypothesis. A circular orbit's kinematic requirement is a single-harmonic rotating vector, so only the time-constant part of the received causal wake in the co-rotating frame can supply it. Rigid co-rotation puts all wake power into exactly that part. Any relative layer motion — frequency locks between layers, counter-rotation, speed modulation — moves wake power into oscillating harmonics that circular kinematics cannot absorb, and the lowest-mode orbit deformations add kinematic harmonics faster than they match wake harmonics.

Causal delay is what would make this principle decisive rather than a soft preference. During one antipodal wake transit at near-field speed the pair rotates through roughly a third of a turn, so static-binding intuition — including the naive Kepler-third-law scaling for frequency-locked nested layers — does not transfer to the delayed dynamics. Claim level: analytic structural argument; the comparative strength of rigid co-rotation against the alternative families is not established.

Rigidity has a second, exact consequence: every pairwise alignment scalar between sites is time-constant, so any alignment condition arranged once in the geometry holds around the entire cycle, sustained by the rotation itself rather than by a separate phase-locking mechanism.

## Motion as Screw

Drifting the spindle braid along its axis is a screw motion — rotation plus translation — so rigidity survives translation exactly, and family members remain exactly evaluable at every drift speed. The exact split of a fixed site-speed budget between axial drift and internal transverse cadence is channel kinematics, carried in [Braid Mathematics](braid-mathematics.md#the-exact-speed-budget); whether any mechanism holds a branch at a fixed speed budget is an open branch hypothesis, not a property of the family.

## Discrete-Symmetry Structure

Claim level: **analytical (derivation grade) for the declared kernel's discrete-symmetry covariance; derivation target for physical formation, branch retention, and weak-sector parity and $CP$ recovery.** This section distinguishes what the interaction law fixes from what the imposed fixed-channel geometry and any later effective transaction operator would still have to establish.

**The law's evenness.** The pairwise causal-wake law is even under polarity conjugation $C$ (every electrino $\leftrightarrow$ positrino: only the polarity product $\sigma_a\sigma_b$ enters, invariant under a global sign flip of every polarity) and even under parity $P$ (the acceleration is radial along the delayed line of action, $\propto\hat{\mathbf r}/r^2$, with no primitive handedness). Two exact degeneracies follow at once, as theorems about the law rather than observations about a solution: the $C$-image of any closed configuration — the polarity-conjugate braid, the same geometry with every polarity reversed — is a degenerate solution, and the $P$-image — the mirror geometry with rotation sense reflected — is a degenerate enantiomer. Polarity conjugation does not change the pro/anti ordered orientation because it does not move a worldline.

**The chiral invariant.** A prescribed spindle member is chiral when its cap polarity dipole $\mathbf p$ (polar, reversed by both $C$ and $P$) is locked to its spin $\mathbf S$ (axial, invariant under both $C$ and $P$), with the cap azimuthal offset supplying the third locked structure. Their product is a pseudoscalar,

$$
\chi=\operatorname{sign}(\mathbf p\cdot\mathbf S),
$$

the declared chiral invariant of that prescribed member. Its transformation law is forced by the vector characters above:

| operation | $\mathbf p$ | $\mathbf S$ | $\chi$ |
| --- | --- | --- | --- |
| $C$ (polarity conjugation) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $P$ (parity) | $-\mathbf p$ | $+\mathbf S$ | $-\chi$ |
| $CP$ | $+\mathbf p$ | $+\mathbf S$ | $+\chi$ |

So $C$ and $P$ each reverse $\chi$, while $CP$ preserves it. For the declared polarity-product radial kernel, the $C$-, $P$-, and $CP$-transforms of any solution are degenerate transformed solutions. This is an exact covariance of the declared kernel; it does not establish formation into an $\iota$-fixed history, branch retention, or $CP$ conservation in weak reaction channels. Claim level: derivation grade for the declared kernel.

The pro/anti ordered orientation is a separate sign. Let $o_{\mathrm{PA}}$ denote the retained `HML/HLM` order where that order exists. Because $C$ leaves worldlines fixed, $o_{\mathrm{PA}}$ is $C$-even; because $P$ mirrors the order, it is $P$-odd. The polarity-assignment sign on this chart is therefore

$$
c_{\mathrm{pol}}
\equiv
\chi o_{\mathrm{PA}},
\qquad
\chi=o_{\mathrm{PA}}c_{\mathrm{pol}}.
$$

Thus $C$ reverses $c_{\mathrm{pol}}$ at fixed $o_{\mathrm{PA}}$, while $P$ reverses $o_{\mathrm{PA}}$ at fixed $c_{\mathrm{pol}}$. With left/right defined by the sign of $\chi$, $C$ maps a left braid to a right polarity-conjugate braid on the same pro/anti orientation; $CP$ maps it to a left polarity-conjugate braid on the mirrored orientation. This is exact covariance of the declared kernel plus definition-level sign bookkeeping. It does not establish formation, branch retention, or $CP$ conservation in weak reaction channels.

**Any leading-cap selection must be $C$-covariant.** If a dynamical mechanism selects a preferred drift orientation relative to the cap polarity dipole — one polarity cap leading — the kernel evenness forces the selection to lock to $\chi$ rather than to an absolute polarity: a braid and its $C$-image would lead with opposite-polarity caps, and the two configurations would be exactly degenerate under the kernel covariance. Whether any such selection mechanism exists is an open question; none is asserted here.

**The crossing order is the observable face of $o_{\mathrm{PA}}$, not of $\chi$ alone.** An observer stationed on the incoming drift axis, watching the three binary axes cross the meridian as the braid spins, records a fixed cyclic order — inner:middle:outer or inner:outer:middle — whose sign is $o_{\mathrm{PA}}$; the two orders are the $P$-image enantiomers. Polarity conjugation leaves that sequence unchanged while reversing $\chi$. For a rigid iso-frequency braid this order is a structural invariant, and its invariance is also a representability marker: a genuine closed braid preserves the order, whereas a differential- or counter-rotating configuration lets the layers lap and the order scramble.

**Which channels could read the glove.** Effective channels that do not resolve the internal lock are candidates to inherit the declared kernel's parity covariance. A weak-flavored transaction channel that reorganizes the internal lock is a candidate route by which a maximal spindle lock could produce maximal parity selectivity, but no weak-transaction operator has yet been derived from a retained branch record. The primitive kernel remains $CP$-covariant; reproducing the measured nonzero $CP$ asymmetries therefore requires a separate $CP$-odd effective event or branch residual. Candidate sources include Noether sea polarity/chirality texture and interference between transaction paths at different drift-dependent internal angles, but these are hypotheses rather than established next-order terms. The combined $CPT$ benchmark is carried in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md).

The spindle construction therefore supplies a conditional discrete-symmetry scaffold, not yet a recovery of the observed pattern. A retained chiral branch and a derived weak-transaction operator must still produce the observed handedness selectivity, while a separate $CP$-odd event or branch residual must reproduce the measured kaon and B-system asymmetries. Neither recovery has been established. Claim level: derivation target for weak parity and $CP$ recovery; the primitive-kernel covariance is exact within its declared scope.

## Candidate Status and Open Burden

The spindle braid is a named candidate family. Everything beyond its definition, exact kinematics, and kernel-covariance structure is open: whether any realization satisfies the master equation, whether a satisfying realization persists under evolution, whether persistence requires an environment, and how the family compares against the alternative families of the taxonomy. Those questions are governed by the retention contract of [Braid Recovery Requirements](braid-recovery-requirements.md) and the certificate target of [Braid Families](braid-families.md#the-neutral-braid-base-of-the-family-ladder). Results enter this chapter only when established, with instrument and claim level stated.
