# Symmetric Shell Braid

This chapter carries the featured realization of the [Noether Braid](noether-braid.md) program: the **symmetric shell braid**, the maximal-symmetry one-band member of the braid family, tested as the `SH-0` effort of the [Noether Braid Proof Map](noether-braid-proof-map.md). Featured is a reading-order selection, not an evidence claim. The symmetric member is explored first because it carries the exact machinery of [Braid Mathematics](braid-mathematics.md) — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — and is therefore the most analytically tractable member of the family. No realization is presently supported by a retained branch record, and nothing in this chapter's ordering changes any proof-map disposition.

## Document Role

This chapter owns the one-band shell braid family definition and the featured symmetric realization built on it: the `SH-0` fixture identity, the isolated-release results, the `SH-0-sea` environment route, and the accessory-dressing application hypotheses. The shared machinery it consumes lives in [Braid Mathematics](braid-mathematics.md); the realization-independent proof obligations live in [Braid Recovery Requirements](braid-recovery-requirements.md); Proof IDs and dispositions live in the [Noether Braid Proof Map](noether-braid-proof-map.md). The symmetry-broken relative is the [nested shell braid](nested-shell-braid.md); the relation between the two realizations, including the open formation question, is stated there and remains the live bridge between the featured and alternative realizations.

## The One-Band Family

A shell braid adds controlled radial support to a [neutral braid](neutral-braid.md) without yet asserting the three ordered support bands of a [nested shell braid](nested-shell-braid.md).

A shell braid is the first step from balanced inventory toward spatial organization. The word `shell` says that the six paths stay within a controlled support band around a branch center. It does not say that the branch has already retained, that exact binary pairs exist, or that nested support bands have appeared.

A **shell braid** over a branch interval $J$ is a neutral braid whose six trajectories remain in a controlled radial band around a declared branch-center curve $\mathbf C:J\to\mathbb{R}^3$. For band limits $R_- < R_+$ and a representative shell scale $R_*$ satisfying $R_- \leq R_* \leq R_+$, the shell condition is

$$
R_-\leq
\left\| \mathbf X_i(T)-\mathbf C(T)\right\|
\leq R_+,
\qquad
i=1,\ldots,6,
\qquad
T\in J
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}}
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell braid. It is a one-band neutral braid whose support is spatially organized strongly enough to make a candidate exclusion envelope, shielding pattern, and Noether sea coupling channel meaningful for later certificate rows.

Near-antipodality is an optional shell braid constraint, not a definition of the neutral braid. A shell branch may carry an approximate fixed-point-free polarity-reversing involution $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$, giving three opposite-polarity pairs. Relative to the declared branch-center curve $\mathbf C(T)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R_*}
$$

Exact antipodality, $\delta_{\mathrm{anti},i}=0$, is an ideal symmetry chart. It should not be expected in ordinary conditions: an external potential can disturb one member of the matching first, and the delayed response takes time to circulate through the full six-body causal ledger. The physical shell claim is therefore near-antipodality plus recovery,

$$
\sup_{T\in J}\delta_{\mathrm{anti},i}(T)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(T+T_{\mathrm{rec}})
\leq
\theta_{\mathrm{rec}}\,\delta_{\mathrm{anti},i}(T)+\varepsilon_{\mathrm{drive}}
\qquad
T,T+T_{\mathrm{rec}}\in J
$$

for recovery time $T_{\mathrm{rec}}$, dimensionless recovery contraction factor $0\leq\theta_{\mathrm{rec}}<1$, and driving residue $\varepsilon_{\mathrm{drive}}$. Near-antipodality is useful because it captures the shell branch's tendency to restore opposite-side balance without pretending that the two matched architrinos remain in lockstep under perturbation.

## The Symmetric Member and the SH-0 Fixture

The symmetric shell braid is the maximal-symmetry member of this family: the face-opposite seed, three positrinos on the positive coordinate axes at common radius $R$, three electrinos at their antipodes, all on one common sphere. The exact machinery this seed carries — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — is core-agnostic mathematics shared across the braid family, and it lives in [Braid Mathematics](braid-mathematics.md). This chapter consumes that machinery and adds the fixture-specific evidence for the one-band configuration at rest, the `SH-0` effort of the [Noether Braid Proof Map](noether-braid-proof-map.md).

## Isolated Release and the Return-Response Question

Held-release diagnostics of the face-opposite seed on the zero-angular-momentum channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) separate two claims that must not be conflated. The symmetry claim holds to numerical precision: the released seed stays on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact. The stability claim fails in isolation: across the tested windows the reduced radius shows a single compression-to-expansion turn and then expands without any later inward acceleration row, so the isolated seed behaves as a symmetric contraction-and-release channel rather than a self-maintaining branch.

This pairing is informative rather than damaging. A shell braid was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-source self-hit rows, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The axis-neutral rotating channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support; the scoped anti-damping results collected there bound what any such candidate must overcome. The environmental candidate is the `SH-0-sea` route stated next.

## The SH-0-Sea Environment Route

The declared environment round is `SH-0-sea`: the same one-band configuration at rest, embedded in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. The `-sea` qualifier is defined in [Noether Braid Taxonomy](noether-braid-taxonomy.md): it does not name a new shell family; it is the `SH-0` rest test with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing the round requires an explicit like-assembly population record, a declared boundary condition, and a sea-response row tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). The round is declared and not started; this chapter records the route, not a result.

## Accessory Dressing and Apparent Energy

The material in this section is a candidate mechanism at hypothesis level. It constrains how accessory architrinos should dress a Noether braid core, and none of it is yet supported by a retained branch record.

The general selection rule — same-polarity accessories under mutual repulsion and braid-supplied confinement select the classical minimum-energy arrangement of equal charges, and the selected arrangement fixes the leading multipole at which the dressing exposes structure — is the [Thomson dressing mechanism](braid-mathematics.md#thomson-dressing-mechanism) of Braid Mathematics. For six accessory sites the selected arrangement is a regular octahedron, with the accessory sites driven outward along the $\pm$ coordinate axes and no structure-revealing moment below hexadecapole order. Six accessory electrinos — the full electron charge complement — therefore form the quietest possible dressing beyond the unshieldable net charge. This is the candidate reading of two electron facts at once: the observed mass is small despite the large shielded interior energy because the dressing exposes almost no structure, and the electron is resilient because the sixfold octahedral arrangement is a deep, symmetric minimum.

Because the net polarity inventory cannot be masked by any superposition, a dressed fermion remains electromagnetically visible at exactly its net charge, while the high-cadence braid carrier masks accessory structure above the net-charge level through amplitude dominance and cadence separation. Accessory-mediated interactions would then be resolvable only when another assembly approaches within roughly the braid scale, where the near field exposes the accessory causal roots. This is a candidate origin for the short range of weak-channel interactions that does not introduce a massive mediator as a primitive; it requires a two-assembly near-field derivation before any stronger claim.

The octahedral dressing also addresses the protected six-unit polarity inventory named as a high-priority explanatory target in [Architrino](../foundations/architrino.md#polarity-and-electric-bookkeeping): the requirement of a finite site-stabilizer action whose orbit has exactly six sites. Pure inversion is a symmetry of a same-polarity dressing even though the core's own symmetry pairs inversion with polarity exchange, and the group generated by the braid's three-fold rotation together with inversion has order six and acts on the octahedral accessory sites as a single free orbit. On this candidate reading, observer-level charge arrives in units of $6\epsilon$ because charge dressing comes in whole orbits of the braid's rotoinversion symmetry, and one full orbit is six sites. This is a hypothesis for the quantum-number mapping program, not a derivation of the charge quantum.

The same quietness ladder orders the quark cases. Accessory counts of four and two — the up-type and down-type inventories — select a tetrahedron, which leaks structure at octupole order, and an axial pair, which leaks at quadrupole order. Both dressings are noisier than the electron's, exposing more structure and coupling more strongly to the environment, which is the candidate reading of why isolated quarks are unstable. The confinement-flavored speculation is that pairs and triples of quarks combine their accessory inventories toward quieter composites, so that isolation is forbidden by unquenched dressing multipoles rather than by decree.

The undressed end of the ladder is the neutrino-like case: an iso-frequency braid with no accessory charges, no net charge, and a configuration just short of the planar field-speed lock that characterizes the photon channel, retaining only a small exposed energy. If the three binaries couple symmetrically under the three-fold rotation of the axis-neutral channel, their residual phase operator is a circulant matrix whose eigenvectors are the discrete Fourier modes, the first being the democratic vector $(1,1,1)/\sqrt3$ with the remaining two carrying $120^\circ$ phases. Flavor states as Fourier modes of the three-binary phase residual, oscillation as their beats, and mass splittings as residual gap scales form the corresponding speculative readout. As a comparison observation only: the democratic direction appears independently in two measured lepton-sector patterns, the Koide relation, which fixes the charged-lepton root-mass vector at angle $\pi/4$ to $(1,1,1)$, and the near-trimaximal neutrino mixing column proportional to $(1,1,1)/\sqrt3$. These observational patterns are treated as comparison targets for the dressing and phasing program, not as evidence that any braid branch is retained.

The shielding-tier reading that pairs this quietness ladder with the fermion generations lives with the [nested shell braid hierarchy](nested-shell-braid.md#the-nested-shell-braid-hierarchy-and-fermion-generations).
