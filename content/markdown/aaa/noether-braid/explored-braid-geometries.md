# Explored Braid Geometries

This chapter defines two braid families of the Noether braid case structure: the **symmetric shell braid** (the one-band family and its maximal-symmetry member) and the **nested shell braid** (the three-band frequency-separated family). Together with the [spindle braid](spindle-braid.md), whose flat and full-tilt limits absorb the planar and axial configurations once treated as separate alternatives ([Spindle Braid](spindle-braid.md#boundary-members)), they form the candidate population of the braid search. No family ranking is asserted in this chapter: every family here is a live candidate on equal footing, and comparative screening and evolution on the validated engine are open obligations of the research program.

The status discipline of the braid stack binds throughout — no family on this page is a retained branch, and the retained-branch certificate target of [Neutral Braid](neutral-braid.md) remains open for every realization named here.

One neighboring chapter remains the active home of machinery first developed on these families: [Braid Envelope Geometry](braid-envelope-geometry.md) carries the exclusion-envelope and observer-export interface consumed by the spacetime and nuclear-atomic chapters. Those interfaces are stated family-generally where possible and are expected to be re-hosted onto whichever family is eventually retained. The fully analytic doubling-frequency lock study lives in its own chapter, [Doubling-Frequency Resonance Lock](doubling-frequency-lock.md).

## Symmetric Shell Braid

The **symmetric shell braid** is the maximal-symmetry one-band member of the braid family. It is the most analytically featured realization because it carries the exact machinery of [Braid Mathematics](braid-mathematics.md) — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — and is therefore the most analytically tractable member of the family. This section owns the one-band family definition, the maximal-symmetry fixture identity, the isolated-release analysis, the sea-embedding route, and the accessory-dressing application hypotheses.

### The One-Band Family

A shell braid adds controlled radial support to a [neutral braid](neutral-braid.md) without yet asserting the three ordered support bands of a [nested shell braid](#nested-shell-braid).

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

### The Symmetric Member

The symmetric shell braid is the maximal-symmetry member of this family: the face-opposite seed, three positrinos on the positive coordinate axes at common radius $R$, three electrinos at their antipodes, all on one common sphere. The exact machinery this seed carries — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — is core-agnostic mathematics shared across the braid family, and it lives in [Braid Mathematics](braid-mathematics.md). This chapter consumes that machinery for the one-band configuration at rest.

### Isolated Release and the Return-Response Question

Two claims about the face-opposite seed on the zero-angular-momentum channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) must not be conflated. The symmetry claim is established: the seed stays exactly on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact — an equivariance theorem of the channel, independent of any trajectory. The retention claim is a separate question, and the isolated seed does not answer it in the affirmative: the channel carries no centrifugal support and the void row supplies no restoring term, so nothing in the isolated construction makes it a self-maintaining branch. What the seed actually does once released is open, and is a target for direct evolution rather than a recorded result. Claim level: established equivariance theorem for the channel; the dynamical fate is open.

This pairing is informative rather than damaging. A shell braid was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-source self-hit rows, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The axis-neutral rotating channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support. The environmental candidate is the sea-embedding route stated next.

The question can be stated sharply rather than qualitatively, because the invariant channel carries a conditional no-return certificate. Two monitored conditions carry it: sub-field speed, meaning every worldline stays below the field speed $c_f$; and an opposite-polarity separation floor, meaning the closest opposite-polarity non-antipodal pair stays at least one reduced radius $R$ apart. The floor holds automatically from the channel's own geometry, and the retained causal-root count reduces to exactly one root per directed pair, so sub-field speed is the only condition that must be watched forward in time. Under the two conditions the reduced-radius acceleration satisfies a signed inverse-square lower bound $\ddot R\ge -K/R^2$, with $K$ built only from the row's coupling, its declared speed and weight caps, and the polarity structure — same-polarity partner terms cancel by an exact radial-sign argument, and the opposite-polarity terms are bounded by the floor. A short energy-integral argument then closes it: if the outward speed at a chosen certificate time clears the margin $\dot R^2>2K/R$, the reduced radius cannot turn back while the two conditions hold. This conditional statement is an established derivation on the channel, not a retained-branch claim. Whether any isolated row actually clears the margin is an evolution question and is open.

The consequence sharpens the return-response question to a single named target. A return turn cannot be the first event — any return must be preceded by a violation of sub-field speed or the opposite-polarity floor — so once the margin is cleared on the isolated channel the reduced radius cannot turn back while the row stays sub-field, and retention is possible only through a term that ends sub-field speed first, driving the internal speed to the field-speed hinge where the outward drive stops before the radius can turn. If the anti-damping indications of [Braid Mathematics](braid-mathematics.md#scoped-anti-damping-results) hold, any such transverse pumping feeds escape rather than return, and its only bearing on the certificate is that it pushes the speed toward $c_f$ — the very condition whose failure ends the window. The open target is therefore precise: exhibit an internal or environmental absorber that ends sub-field speed before the margin is crossed. The fold-geometry constraint on single-site absorbers is set out in [Braid Mathematics](braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord); the environmental candidate is the sea-embedding route below.


### The Sea-Embedding Route

The environmental route embeds the same one-band configuration at rest in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. This does not name a new shell family; it is the rest configuration with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing it requires an explicit like-assembly population record, a declared boundary condition, and a sea-response row tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). Whether a static like-assembly environment can supply retention, and whether a dynamic, formation-history-driven sea response can do what a static one cannot, are open questions for the research program's campaigns; no environmental verdict is carried in this chapter.

### Accessory Dressing and Apparent Energy

The material in this section is a candidate mechanism at hypothesis level. It constrains how accessory architrinos should dress a Noether braid core, and none of it is yet supported by a retained branch record.

The general selection rule — same-polarity accessories under mutual repulsion and braid-supplied confinement select the classical minimum-energy arrangement of equal charges, and the selected arrangement fixes the leading multipole at which the dressing exposes structure — is the [Thomson dressing mechanism](braid-mathematics.md#thomson-dressing-mechanism) of Braid Mathematics. For six accessory sites the selected arrangement is a regular octahedron, with the accessory sites driven outward along the $\pm$ coordinate axes and no structure-revealing moment below hexadecapole order. Six accessory electrinos — the full electron charge complement — therefore form the quietest possible dressing beyond the unshieldable net charge. This is the candidate reading of two electron facts at once: the observed mass is small despite the large shielded interior energy because the dressing exposes almost no structure, and the electron is resilient because the sixfold octahedral arrangement is a deep, symmetric minimum.

Because the net polarity inventory cannot be masked by any superposition, a dressed fermion remains electromagnetically visible at exactly its net charge, while the high-cadence braid carrier masks accessory structure above the net-charge level through amplitude dominance and cadence separation. Accessory-mediated interactions would then be resolvable only when another assembly approaches within roughly the braid scale, where the near field exposes the accessory causal roots. This is a candidate origin for the short range of weak-channel interactions that does not introduce a massive mediator as a primitive; it requires a two-assembly near-field derivation before any stronger claim.

The octahedral dressing also addresses the protected six-unit polarity inventory named as a high-priority explanatory target in [Architrino](../foundations/architrino.md#polarity-and-electric-bookkeeping): the requirement of a finite site-stabilizer action whose orbit has exactly six sites. Pure inversion is a symmetry of a same-polarity dressing even though the core's own symmetry pairs inversion with polarity exchange, and the group generated by the braid's three-fold rotation together with inversion has order six and acts on the octahedral accessory sites as a single free orbit. On this candidate reading, observer-level charge arrives in units of $6\epsilon$ because charge dressing comes in whole orbits of the braid's rotoinversion symmetry, and one full orbit is six sites. This is a hypothesis for the quantum-number mapping program, not a derivation of the charge quantum.

The same quietness ladder orders the quark cases. Accessory counts of four and two — the up-type and down-type inventories — select a tetrahedron, which leaks structure at octupole order, and an axial pair, which leaks at quadrupole order. Both dressings are noisier than the electron's, exposing more structure and coupling more strongly to the environment, which is the candidate reading of why isolated quarks are unstable. The confinement-flavored speculation is that pairs and triples of quarks combine their accessory inventories toward quieter composites, so that isolation is forbidden by unquenched dressing multipoles rather than by decree.

The undressed end of the ladder is the neutrino-like case: an iso-frequency braid with no accessory charges, no net charge, and a configuration just short of the proposed planar lock of the photon channel (a lock that remains a hypothesis — no locked photon branch has been exhibited), retaining only a small exposed energy. If the three binaries couple symmetrically under the three-fold rotation of the axis-neutral channel, their residual phase operator is a circulant matrix whose eigenvectors are the discrete Fourier modes, the first being the democratic vector $(1,1,1)/\sqrt3$ with the remaining two carrying $120^\circ$ phases. Flavor states as Fourier modes of the three-binary phase residual, oscillation as their beats, and mass splittings as residual gap scales form the corresponding speculative readout. As a comparison observation only: the democratic direction appears independently in two measured lepton-sector patterns, the Koide relation, which fixes the charged-lepton root-mass vector at angle $\pi/4$ to $(1,1,1)$, and the near-trimaximal neutrino mixing column proportional to $(1,1,1)/\sqrt3$. These observational patterns are treated as comparison targets for the dressing and phasing program, not as evidence that any braid branch is retained.

The shielding-tier reading that pairs this quietness ladder with the fermion generations lives with the [nested shell braid hierarchy](#the-nested-shell-braid-hierarchy-and-fermion-generations).

## Nested Shell Braid

The **nested shell braid** is the three-band support family: a shell braid with three ordered radial support bands, the frequency-separated arrangement that the particle-architecture and Noether sea chapters historically consumed as their scaffold. It remains the named comparison population for the spindle braid's iso-frequency route, and the generation and dressing hypotheses developed below are stated so that they can be re-hosted on whichever family is eventually retained.

A **nested shell braid** is a shell braid with three ordered radial support bands. The simple picture is a neutral six-architrino branch whose activity is not all happening at one scale. There is an inner support band, a middle support band, and an outer support band, and the proof task is to show that the delayed causal-root ledger lets those bands stay coordinated.

This is the case used by the downstream particle-architecture and Noether sea chapters. It should be read first as branch architecture, not as a completed particle identity. The labels describe the scaffold that later chapters try to certify.

The reader-facing picture is a three-level rhythm, not three miniature solid shells. The inner, middle, and outer support bands are regions of recurring causal activity, phase return, and wake exchange. They matter because one retained branch must coordinate all three bands while still exporting the effective properties that later chapters call mass, spin, photon response, and Lorentz behavior.

This makes the page a scaffold definition. It gives names to the support bands, role labels, and closure ledgers that the dynamics must later earn. It does not by itself prove that the scaffold is stable, minimal, or identical to any observed particle.

The geometric shell labels are

$$
I,\ M,\ O
$$

for **inner**, **middle**, and **outer** radial order. These are geometry labels: they say which support band is deepest, intermediate, or most externally exposed. They do not by themselves prove a dynamical role, a generation label, or a particle identity.

The role labels are

$$
H,\ M,\ L
$$

for **high**, **middle**, and **low** branch role. In the weak-stress nested shell braid chart, $H$ is the high-cadence or high-stress role, $M$ is the hinge or transfer role, and $L$ is the low-cadence or external-coupling role. The letter $M$ is therefore context-dependent: in $I/M/O$ it means middle radius, while in $H/M/L$ it means the middle role between high and low branch response. The usual weak-stress branch is expected to align these two orderings approximately, but that alignment is a branch result rather than a naming axiom.

The recursive binary picture remains valuable inside this case. Just as an Electrino:Positrino pair is hypothesized to stabilize into a bound binary, a declared binary can participate in a larger coupled support structure, and three energy-separated candidate binaries can form a nested shell hierarchy. The candidate stability mechanism is still separation of scale: each surrounding support band must have a larger radius, a lower cadence, and a compatible causal-root ledger than the deeper support band.

Nested shell braid diagrams may therefore use logarithmic radius rather than literal radius. A log-radius diagram is a visualization convention: it may compress empty intervals between support bands and label the bands by scale, but it must preserve the declared inner/middle/outer radial order, cadence ordering, support-band widths, and branch-ledger quantities. It must not be read as evidence that a stable branch exists or that the three bands have fixed spacing in physical radius.

In this case, a candidate stable configuration is the **nested shell braid with exact binary assumptions**. It consists of three binaries, one in each ordered shell, and supplies the assembly scaffold later used in [Nested Shell Braid Dynamics](explored-braid-geometries.md#nested-shell-braid-dynamics).

-   **Why Three?** The stability of a three-shell nested structure is a theorem target tied to the three-dimensional nature of Euclidean space. Each binary defines an orbital plane or dominant support sheet. The working claim is that three mutually orthogonal support sheets can form a dynamically stable, symmetric, three-dimensional structure that is resistant to perturbation; the proof burden is to derive that role count from the delayed causal dynamics rather than assuming it.

-   **Why "Noether"?** This braid family is named in honor of Emmy Noether. Noether's theorem links symmetries in physical systems to conserved quantities. The highly symmetric nested shell braid is the candidate scaffold through which spin, branch-quantized energy records, and other conserved observer-level labels should be recovered from closure labels and emitted causal-wake envelopes.

### Relation to the Symmetric Shell Channel

The one-band [shell braid](#symmetric-shell-braid) carries an exact three-fold symmetry channel about the axis-neutral direction — the invariant channel developed in [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions): a rotation by $120^\circ$ maps each opposite-polarity pair onto the next, which requires the three pairs to be congruent — same radius, same speed, same cadence. A nested shell braid with three energy-separated radii cannot carry that pair-permutation symmetry, because an isometry cannot map an orbit of one radius onto an orbit of another, and combining the rotation with a time shift does not change this: the spatial map must still carry one support band onto a band of different scale. Integer frequency locks such as $4:2:1$ restore something real but different — exact global periodicity, the closed-figure condition recorded by the integer phase-closure winding counts — without restoring the permutation symmetry itself.

Three consequences keep this statement in its proper place. First, absence of a symmetry is not a stability proof against the nested shell braid: less symmetric branches are harder to analyze, not thereby excluded, and no falsification of nested retention exists. The correct reading is that the symmetric one-band configuration is the maximal-symmetry member of the family, and the nested shell braid is its symmetry-broken relative, in the same way that the generation ladder below reads heavier fermions as less shielded relatives of the electron tier. Second, the axis-neutral direction survives the symmetry breaking in a weaker but still useful form: when the three binary planes are mutually orthogonal, the $120^\circ$ rotation about the body diagonal permutes the three planes, so the diagonal remains the distinguished axis of the support architecture and the natural candidate precession axis, even though the decorated configuration with unequal radii is no longer invariant. Third, the relationship poses a formation question rather than answering one: whether braids persist in the symmetric one-band configuration throughout their recycling history, or form by binary capture at separated energy levels and then ring down toward the symmetric configuration, is open. The simplest hypothesis is symmetric persistence; the capture-and-ring-down route would make nested hierarchies transient intermediates. Deciding between them belongs to the same configuration-space program that compares the frequency families.

The symmetry relationship supplies the natural observable for that question: **precession**. On the symmetric shell channel the kinematic angular momentum is pinned exactly along the axis-neutral direction by the three-fold symmetry, so the axis cannot wander — a braid on the symmetric channel does not precess, and any precession is a direct signature of broken pair-permutation symmetry. A nested or freshly captured configuration, with its unequal binaries, precesses; a configuration relaxing toward the symmetric channel should show decaying precession as it rings down; and the terminal-alignment statement that precession ceases at the horizon condition is the strong-field endpoint of the same diagnostic. Precession amplitude is therefore a candidate symmetry-distance meter across the whole braid family, from formation transients to horizon alignment.

Comparative standing: no family ranking is asserted. The **spindle braid** — the rigid uniaxial iso-frequency family in which tilt angles, not frequency ratios, decouple layer speeds from nesting radii ([Spindle Braid](spindle-braid.md), [Noether Braid Taxonomy](noether-braid-taxonomy.md#a-named-candidate-the-spindle-braid)) — is a structurally distinct sibling candidate. The nested shell families in this chapter remain named candidates alongside it, and the generation and dressing hypotheses developed below are stated so that they can be re-hosted on whichever family is eventually retained.

### Properties of the Nested Shell Braid

-   **Energy-Separated Scales:** In low-energy nested shell braid conditions, the three shell binaries have energy-separated orbital radii and cadences. The innermost binary is the smallest and fastest, while the outermost is the largest and slowest. This separation of scales is crucial for the stability mechanism under study.

-   **Internal Stabilization:** The system is expected to be stable only on branches where the high-frequency causal-wake emissions from the innermost binary, inter-layer wake exchange, and outer-layer shielding close into a persistent return cycle. The time-averaged potential picture is useful, but the theorem burden is to show that the root ledger, phase closure, and separator conditions keep the coupled hierarchy on the same branch.

-   **Energy Shielding via Superposition:** From a distance, a nested shell braid appears to have far less energy and a much smaller potential signature than the raw sum of its six constituent architrinos. The rapid oscillation of the positive- and negative-polarity architrinos within the nested structure causes their wake contributions to largely cancel out through superposition. This shielding effect is the working mechanism for how highly energetic structures can form the basis for relatively low-mass observed particles; quantitative extraction remains a mass-map closure target.

### Integer Phase-Closure States

A nested shell braid should be treated as a closed-cycle geometry before it is treated as a particle label. Over a stable return duration $T_{\mathrm{ret}}$ beginning at a chosen absolute-time origin $T_0$, each binary must return its phase together with the relevant causal-root ledger:

$$
\Theta_a(T_0;T_{\mathrm{ret}})
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}\omega_a(T')\,dT'
+
\Phi_a^{\text{root}}(T_0;T_{\mathrm{ret}})
=
2\pi k_a,
\qquad
k_a\in\mathbb{Z},
\qquad
a\in\{I,M,O\}
$$

The integers $k_a$ are winding counts over the closure period. They are not a claim that the layer frequencies are integer-valued at every instant. When ordinary layer frequency is used below, $\omega_a=2\pi f_a$. The surrounding root ledger records which self-hit, partner-hit, and inter-layer branches made the closure admissible.

On the retuning hypothesis below, an accepted energy-level change is a one-$h_{\mathrm{act}}$ closed-cycle action transaction that moves the nested shell braid from one admissible integer-and-root ledger to another. The causal wake emitted by the retuned braid should therefore carry information about the braid's closure state. Higher-level atomic orbital configurations, when they are recovered, should appear as electron-assembly resonance envelopes in that structured nuclear and Noether sea wake environment, not as primitive labels pasted onto the braid.

The same closure-label machinery is the native carrier for branch-quantized Lorentz response. A moving nested shell braid should not be assigned a Lorentz factor independently of its internal ledger. Instead, a stable closure label should determine the all-layer retuning of radii, frequencies, characteristic speeds, and wake exchange; the outer envelope then projects the ruler factor seen by Physical Observers. In the homogeneous weak-field limit, the admitted labels must collapse to the observer-calibrated $\gamma_0(v_{\mathrm{eff}})=(1-v_{\mathrm{eff}}^2/c_0^2)^{-1/2}$ within the preferred-frame leakage bound.

### Cadence-Scale Retuning Hypothesis

The single-braid version of the $h_{\mathrm{act}}$-step claim is geometric rather than merely thermal. An accepted action transaction does not add energy to a rigid object. It moves the nested shell braid from one admissible closure branch toward another, and the braid resolves that transaction by retuning its cadence-scale closure. The symbol $h_{\mathrm{act}}$ denotes the closed-cycle action unit in this chart; it is distinct from the finite-memory depth $h_{\mathrm{mem}}$ used in dynamics chapters, and its comparison with the observer-level Planck constant $h$ remains part of action-scale closure.

The bookkeeping distinction is

$$
h_{\mathrm{act}}=\text{action per accepted cycle},
\qquad
A_N=Nh_{\mathrm{act}},
\qquad
E_N=A_N f_N
$$

Here $h_{\mathrm{act}}$ is the fixed closed-cycle action unit, $N$ is the integer number of accepted action units carried by the branch, $A_N$ is the total branch action level, and $f_N$ is a representative cadence extracted from the closed nested shell braid branch. A one-$h_{\mathrm{act}}$ transaction changes the action ledger; a branch with many accepted units is scaled by $Nh_{\mathrm{act}}$. The accepted branch may answer through one or more of the cadence, layer radii, envelope scale, envelope ratio, orientation, strain, and inter-layer wake-exchange variables. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ are defined in [Reduced Nested Shell Braid Closure Label](#reduced-nested-shell-braid-closure-label):

$$
\Delta A_{\mathrm{cyc}}=\pm h_{\mathrm{act}}
\quad\Rightarrow\quad
(f_N,\ R_I,R_M,R_O,\ \lambda,\ \xi,\ \mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO})
\longmapsto
(f_N',\ R_I',R_M',R_O',\ \lambda',\ \xi',\ \mathcal{G}_{IM}',\mathcal{G}_{IO}',\mathcal{G}_{MO}')
$$

In the simplest fixed-speed layer estimate,

$$
v_\ell\sim 2\pi R_\ell f_\ell,
\qquad
\ell\in\{I,M,O\}
$$

If a branch keeps $v_\ell$ approximately fixed while accepting the transaction, then

$$
R_\ell f_\ell\approx\text{constant},
\qquad
\Delta f_\ell>0\Rightarrow\Delta R_\ell<0,
\qquad
\Delta f_\ell<0\Rightarrow\Delta R_\ell>0
$$

The proof target is the constrained map, not only this sign rule. On a fixed branch chart $q$, collect the logarithmic retuning variables into

$$
\mathbf{y}_q
=
\left(
\ln f_I,\ln f_M,\ln f_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)_q^{T}
$$

Let $A_{\mathrm{cyc},q}(\mathbf{y},\mathcal{G})$ be the closed-cycle action ledger on that chart, and let

$$
\mathcal{C}_q(\mathbf{y},\mathcal{G})=0
$$

collect the integer phase-closure, causal-root, separator, inter-layer wake-exchange, and stability conditions that define the branch. A first-order accepted retuning with action sign $s_{\mathrm{act}}\in\{+1,-1\}$ must satisfy

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
s_{\mathrm{act}}h_{\mathrm{act}}
$$

together with the branch-preservation condition

$$
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0
$$

If $\Delta\mathcal{C}_{\mathcal{G}}=0$, the retuning stays on the same causal-root ledger. If $\Delta\mathcal{C}_{\mathcal{G}}\neq0$, the event is a branch transition and must be treated as a separator crossing or causal-locus reconnection rather than as smooth single-braid drift.

The local cadence-scale retuning map is therefore the closure target

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,s_{\mathrm{act}})}
:
(\Lambda_{\text{NS}},\theta_{\mathrm{env}})
\longmapsto
\left(
\Delta f_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right)
$$

where $\Lambda_{\text{NS}}$ is defined in [Reduced Nested Shell Braid Closure Label](#reduced-nested-shell-braid-closure-label), and $\theta_{\mathrm{env}}$ records the local Noether sea state and neighboring-assembly conditions. The representative cadence increment is an extraction from the layer increments, for example

$$
\Delta\ln f_N
=
w_I^{(q)}\Delta\ln f_I
+
w_M^{(q)}\Delta\ln f_M
+
w_O^{(q)}\Delta\ln f_O,
\qquad
w_I^{(q)}+w_M^{(q)}+w_O^{(q)}=1
$$

with the weights determined by the same branch and exposure record used for clock and medium coupling. The full nested shell braid need not put the entire transaction into a single layer. One layer may tighten while another expands, and the outer envelope may change through $\lambda$ or $\xi$, provided the total closure label remains admissible.

This is the local branchwise origin of the smoother Noether sea equilibrium-current language: individual retunings are discrete, while many asynchronous accepted retunings can coarse-grain into a continuous cadence-space current.

#### Action Clicks at the Field-Speed Hinge

The candidate physical implementation of the discrete action transaction — each accepted transaction realized as a controlled crossing of the causal-root fold set that changes the integer root count by one — is core-agnostic machinery and is developed at hypothesis level in [Braid Mathematics](braid-mathematics.md#action-clicks-at-the-fold-set). For this chapter's ledger the hypothesis-level consequences are that the closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one crossing, that closure-label changes are tied to causal-root bifurcation, and that many asynchronous crossings coarse-grain into the smooth cadence-space current named above. No dynamical mechanism holding a layer at the field-speed locus is asserted.

### Rest-Level Scaling Curve

The cadence-scale retuning map becomes more predictive when a homogeneous pool of group-velocity-zero Noether braids is assumed to occupy the same reduced closure label and the same integer rest level. In that case the pool is made of equal braids at one level $N$, while the scaling curve compares neighboring admissible rest levels along the same branch. The scaling variable is not $h_{\mathrm{act}}$ itself. The fixed quantity is the closed-cycle action unit $h_{\mathrm{act}}$; the branch variable is the total action level

$$
A_N=Nh_{\mathrm{act}},
\qquad
N\in\mathbb{Z}_{>0}
$$

For the outer binary, write the outer action allocation as

$$
N_O=p_O^{(q)}N,
\qquad
I_O=N_O\hbar_{\mathrm{act}}
=p_O^{(q)}N\frac{h_{\mathrm{act}}}{2\pi}
$$

Here $p_O^{(q)}$ is the branch share carried by the outer binary and $\hbar_{\mathrm{act}}\equiv h_{\mathrm{act}}/(2\pi)$. With the reduced circular-action chart

$$
I_O=\mu_O^{\mathrm{rot}}R_O v_O
$$

Here $\mu_O^{\mathrm{rot}}$ is an effective rotational branch-response coefficient for this reduced chart. It is not a primitive mass assigned to architrinos; it is a bookkeeping response factor that must ultimately be extracted from the same branch record used by the mass-map program.

With this declaration, the action ledger determines the product

$$
\boxed{
R_O(N)\,v_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_O^{\mathrm{rot}}}.
}
$$

This is the part fixed directly by the $Nh_{\mathrm{act}}$ action ledger. It says that a higher rest level must carry a larger radius-speed product, but it does not by itself decide whether the extra product appears as larger outer radius, higher outer speed, or both. The separate functions $R_O(N)$, $v_O(N)$, and

$$
f_O(N)=\frac{v_O(N)}{2\pi R_O(N)}
$$

therefore require one more branch-closure equation.

One possible closure is a branch-pinned speed — stated as a chart hypothesis only; no mechanism holding a branch at fixed speed is established, and an earlier proposed pinning mechanism was retired when its own condition was measured false. If the outer branch keeps

$$
v_O=\beta_Oc_f
$$

with fixed $\beta_O$, then

$$
\boxed{
R_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}}{2\pi\mu_O^{\mathrm{rot}}\beta_Oc_f},
\qquad
f_O(N)
=
\frac{\mu_O^{\mathrm{rot}}\beta_O^2c_f^2}
{p_O^{(q)}Nh_{\mathrm{act}}}.
}
$$

This special branch gives

$$
\boxed{
R_O\propto N,
\qquad
v_O\propto N^0,
\qquad
f_O\propto N^{-1}.
}
$$

A different closure comes from a bare inverse-square radial balance. If the delayed root ledger reduces to

$$
\frac{v_O^2}{R_O}
=
\frac{K_O}{4R_O^2}\mathcal{B}_O(\beta_O;\Lambda_{\text{NS},O})
$$

Here the factor $1/(4R_O^2)$ is the inverse-square factor for an opposite member at diameter $d=2R_O$. The coefficient $K_O$ is the reduced outer-channel coupling combination, $\mathcal{B}_O(\beta_O;\Lambda_{\text{NS},O})$ is the dimensionless delayed-root radial balance factor, and $\Lambda_{\text{NS},O}$ is the outer-channel sublabel inherited from the reduced nested shell braid closure label. If $\mathcal{B}_O$ is approximately constant on the compared segment, then the same action product gives

$$
\boxed{
R_O\propto N^2,
\qquad
v_O\propto N^{-1},
\qquad
f_O\propto N^{-3}.
}
$$

Thus the $Nh_{\mathrm{act}}$ ledger alone does not canonize a single radius curve. It supplies the product law; the branch speed, delayed-root radial balance, tangential closure, and any Noether sea return terms decide the actual rest-level scaling.

If the outer binary instead carries a declared outer energy projection

$$
E_O(N)=\zeta_O^{(q)}\mu_O^{\mathrm{rot}}v_O^2
$$

then

$$
\boxed{
v_O(N)
=
\sqrt{\frac{E_O(N)}{\zeta_O^{(q)}\mu_O^{\mathrm{rot}}}},
\qquad
R_O(N)
=
\frac{p_O^{(q)}Nh_{\mathrm{act}}\sqrt{\zeta_O^{(q)}}}
{2\pi\sqrt{\mu_O^{\mathrm{rot}}E_O(N)}}.
}
$$

This form is the safest way to use any external energy-level equation: insert the branch energy projection $E_O(N)$, then derive the corresponding outer radius and speed.

The same chart also gives a packing readout for the Noether sea. In a nearly spherical exclusion-envelope approximation, let

$$
R_{\mathrm{excl}}
=
\alpha_O^{(q)}R_O
$$

where $\alpha_O^{(q)}$ converts the outer-binary radius into the selected exclusion-interface threshold. Equal exclusion-envelope center contact then occurs at

$$
d_{\mathrm{nn}}=2R_{\mathrm{excl}}
$$

and the densest ordinary equal-sphere center density is

$$
\rho_{\mathrm{NS},\max}^{\#}
=
\frac{1}{4\sqrt{2}R_{\mathrm{excl}}^3}
$$

The density symbol functions as packing notation for this chart, distinct from the physical Noether sea density field $\rho_{\text{NS}}(\mathbf X,T)$; the $\#$ marks a center number density for the relevant Noether braid exclusion envelopes. Therefore the packing curve inherits the radius closure:

$$
\rho_{\mathrm{NS},\max}^{\#}(N)
\propto
R_O(N)^{-3}
$$

For example, the fixed-speed branch gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-3}$, while the bare inverse-square branch with approximately constant $\mathcal{B}_O$ gives $\rho_{\mathrm{NS},\max}^{\#}\propto N^{-6}$. These are branch diagnostics, not competing definitions of a Noether braid.

This packing formula is only the spherical leading estimate. At high relative velocity, high Noether sea delay, or high gravitational strain, the branch data cannot be kept constant:

$$
p_O^{(q)},\ \mu_O^{\mathrm{rot}},\ \alpha_O^{(q)},\ \mathcal{B}_O(\beta_O;\Lambda_{\text{NS},O})
\longrightarrow
p_O(q,\theta_{\mathrm{env}}),\ \mu_O^{\mathrm{rot}}(q,\theta_{\mathrm{env}}),\ \alpha_O(q,\theta_{\mathrm{env}}),\ \mathcal{B}_O(\beta_O;\Lambda_{\text{NS},O},\theta_{\mathrm{env}})
$$

The scaling curve is therefore piecewise by branch. Once the branch supplies $\xi$ and $\lambda$, the exclusion envelope must be treated as an oblate spheroidal envelope rather than a sphere, and the center-density calculation must inherit orientation, strain, and Noether sea delay data from the same branch label.

### Reduced Nested Shell Braid Closure Label

For proof work, the integer phase-closure state should be packaged with the branch data that made the closure admissible. The reduced nested shell braid closure label is a branch label, not a new ontological ingredient. The symbol $\Lambda_{\text{NS}}$ denotes this reduced closure label:

$$
\Lambda_{\text{NS}}
=
\left(
k_I,k_M,k_O;\
\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O;\
\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO};\
\chi_c
\right)
$$

Here $k_I,k_M,k_O$ are the layer winding counts over the chosen return period. The layer ledgers $\mathcal{G}_I,\mathcal{G}_M,\mathcal{G}_O$ record active self-hit and partner-hit branches, root multiplicities, winding or phase branch, emission-order data, and separator history. The inter-layer ledgers $\mathcal{G}_{IM},\mathcal{G}_{IO},\mathcal{G}_{MO}$ record delayed exchange roots and phase-lock constraints between binary layers. The branch label $\chi_c$ records ordered braid chirality; the current candidate data are the `HML/HLM` ordered-braid distinction together with $\operatorname{Wr}_c$ or a multi-component causal-writhe parity.

This label is reduced because it omits the full architrino trajectories and retains only the closure data needed for branch comparison. It is useful only under a theorem-target burden: smooth branch-preserving deformations should keep $\Lambda_{\text{NS}}$ fixed, while a change of label should be tied to a causal-root bifurcation, separator crossing, or causal-locus reconnection. The chirality entry $\chi_c$ is not yet proved by this definition; it names the entry that the later causal-writhe or ordered-frame proof must fill.

The quantum-number generalization begins at this level. Generation, spin, chirality, and later observer-level orbital labels should be read as downstream coarse-grainings or measurement labels derived from admissible nested shell braid closure labels and their emitted causal-wake envelopes. They should not be imposed as primitive particle labels before the closure, wake-envelope, and apparatus-coupling maps have been derived.

For the horizon-interface entropy calculation, the counted labels must be restrictions of this same reduced closure label, not a second black-hole bookkeeping system. The alignment-restricted label is the theorem-target restriction
$$
\Lambda_{\text{NS}}^{\mathrm{align}}
=
\left.
\Lambda_{\text{NS}}
\right|_{\substack{
v_M=c_f,\;v_O\to c_f\\
\text{coplanar/co-linear binary layers}\\
\text{precession ceases}
}}
$$
with the remaining admissible entries inherited from the layer ledgers, inter-layer ledgers, chirality entry, and emitted wake envelope. For a connected block $U$ of alignment-area patches, the local label set to be counted has the schematic form
$$
\mathcal{L}_U(\theta_{\mathrm{env}})
=
\left\{
\left(\Lambda_{\text{NS},a}^{\mathrm{align}}\right)_{a\in U}
:
\mathcal{G}_{\partial U},\,
\mathcal{B}_{\partial\Omega}^{(O)}(\theta_{\mathrm{env}};W),\,
\text{conservation and interface compatibility hold}
\right\}
/
\sim_{O,\theta_{\mathrm{env}},W}
$$
Here $\mathcal{G}_{\partial U}$ records the causal-root and wake-exchange compatibility across the edge of the block. This expression does not yet derive the entropy coefficient. It identifies the native object whose block entropy density must be computed before $\log|\mathcal{L}_U|/|U|\to1/4$ can be treated as more than a comparison target.

### Geometry and Exclusion Envelope

The same nested shell braid motion that supplies shielding is the geometric footprint a retained branch would sweep into a dynamic exclusion envelope. That envelope is not the braid definition itself; it is the candidate excluded-region readout of the nested assembly. For the oblate spheroidal form, exclusion-envelope interpretation, and deformation channels, see [the nested shell braid geometry chapter](braid-envelope-geometry.md).

### The Nested Shell Braid Hierarchy and Fermion Generations

The broader assembly program suggests reading the nested shell braid hierarchy as a natural hierarchy of fermion shielding tiers:

-   **Isolated binary:** the most exposed shielding tier, corresponding to Generation III.
-   **Two-support-row shielding tier:** one shielding tier restored, corresponding to the Generation-II shielding tier.
-   **Nested shell braid:** the fully shielded three-tier braid, corresponding to the Generation-I shielding tier.

On this reading, the generation ladder is not an arbitrary label attached after the fact. It is the visible signature of how many nested shielding tiers still surround the deepest binary engine; this same shielding ladder is the starting point for [Particle Masses: Emergent Inertia in the Noether sea](../assemblies/particle-masses.md) and the charged-lepton story beginning with [Electron](../assemblies/fermions/electron.md).

The accessory-dressing applications that pair this shielding ladder with the Thomson quietness ladder — the electron, quark, and neutrino readings — live with the featured realization in [Symmetric Shell Braid](#accessory-dressing-and-apparent-energy), with the mechanism itself stated in [Braid Mathematics](braid-mathematics.md#thomson-dressing-mechanism).

### Nested Shell Braid Alignment and Planck-Scale Framing

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary** is the near-field-speed hinge, written as $s_M\approx c_f$ in the ordinary weak-stress branch and as $v_M=c_f$ in the terminal-alignment target; its shell scale and cadence retune along the branch. It acts as the **energy-storage fulcrum** for transfers across the nested shell braid.

The horizon-approach hypothesis of this family reads: as a nested shell braid approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune; at the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment. This is a derivation target of the terminal-alignment program, not an evolved-trajectory result.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It is not a claim that the inner, middle, and outer binaries become identical. It means the middle binary remains on the field-speed hinge, the outer binary is driven into the same terminal threshold, and the inner binary remains the self-hit interior row while the assembly loses ordinary volumetric slack. Because $s_\ell=\omega_\ell\rho_\ell$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes the nested shell braid more than a particle scaffold. In the nested shell braid reading, it contains a local black-hole dual: the middle binary is the horizon-interface threshold, the inner self-hit binary is the beyond-threshold interior row, and the outer binary is the exterior-coupling row that can be driven into terminal alignment under strong-field stress. This is a primitive black-hole pattern inside the assembly ontology, not an assertion that an ordinary particle is an observer-level compact object. The dynamics-facing proof burden is stated in [Nested Shell Braid Dynamics](../proof-programs/terminal-alignment.md#local-black-hole-duality-target).

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell braid coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Braid Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

The alignment limit also has a wake-signature reading, at hypothesis level. The [axial polarity dipole identity](braid-mathematics.md#moments-and-the-axial-polarity-dipole) shows that a braid's leading polarity-signed moment lives entirely on its axial extent and vanishes as the configuration flattens toward the planar limit. Terminal alignment — coplanarity at field speed — is therefore also the **dipole-quiet limit**: an assembly driven into alignment stops broadcasting its leading polarity-signed structure exactly when it reaches the horizon condition. On this reading, the darkness of the horizon boundary is not only a causal-escape statement; the infalling assembly's loudest wake channel closes as a matter of geometry, leaving only higher-moment and phase data as the distinguishable content. That surviving content is what the alignment-restricted closure label $\Lambda_{\text{NS}}^{\mathrm{align}}$ enumerates, which makes the horizon-interface entropy counting and the dipole-quiet limit two views of the same restriction.

### The Foundation for Fermions

The Noether braid class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.


### Nested Shell Braid Dynamics

The nested family's mechanism program — how a three-band assembly could keep compatible branch
records as one moving delayed system, with same-record closure across period, active-root ledger,
deformation map, medium response, observer export, and event ledger — is a research-program
obligation, tracked with the proof programs rather than in this chapter. The realization-independent
machinery lives with the shared mathematics in [Braid Mathematics](braid-mathematics.md#substrate-and-effective-levels),
and the strong-field endpoint lives in [Terminal Alignment](../proof-programs/terminal-alignment.md).
Results enter this chapter only when certified at corpus grade.

For the strong-field continuation, see [Black Holes](../spacetime/black-holes.md) and
[Horizon Chirality](../spacetime/horizon-chirality.md).
