# Explored Braid Geometries

This chapter collects the braid families that the configuration-space program explored before the [spindle braid](spindle-braid.md) emerged as the leading candidate: the **symmetric shell braid** (the one-band family and its maximal-symmetry member) and the **nested shell braid** (the three-band frequency-separated family). They are kept together here as the comparison population that gives the leading candidacy its meaning. On the unified prescribed-worldline closure comparisons, both families were outperformed by the spindle braid, and the planar and axial configurations once treated as separate alternatives are now read as boundary members of the spindle family itself ([Spindle Braid](spindle-braid.md#boundary-members)).

Demotion to this collection is a standing decision, not a rejection theorem. Each family below retains its definition, its scoped results, and its re-entry condition: if the spindle route is decisively rejected, these families re-enter the search as live candidates. The status discipline of the braid stack binds throughout — no family on this page is a retained branch, and the retained-branch certificate target of [Neutral Braid](neutral-braid.md) remains open for every realization named here.

Two neighboring chapters remain the active homes of machinery first developed on these families. [Nested Shell Braid Dynamics](explored-braid-geometries.md#nested-shell-braid-dynamics) carries the coupled-band mechanism targets and the terminal-alignment program; [Braid Envelope Geometry](braid-envelope-geometry.md) carries the exclusion-envelope and observer-export interface consumed by the spacetime and nuclear-atomic chapters. Those interfaces are stated family-generally where possible and are expected to be re-hosted onto whichever family is eventually retained.

## Symmetric Shell Braid

The **symmetric shell braid** is the maximal-symmetry one-band member of the braid family, tested as the `SH-0` effort of the [Noether Braid Proof Map](noether-braid-proof-map.md). It was the program's featured realization because it carries the exact machinery of [Braid Mathematics](braid-mathematics.md) — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — and is therefore the most analytically tractable member of the family. This section owns the one-band family definition, the `SH-0` fixture identity, the isolated-release results, the `SH-0-sea` environment route, and the accessory-dressing application hypotheses.

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

### The Symmetric Member and the SH-0 Fixture

The symmetric shell braid is the maximal-symmetry member of this family: the face-opposite seed, three positrinos on the positive coordinate axes at common radius $R$, three electrinos at their antipodes, all on one common sphere. The exact machinery this seed carries — the invariant channels and equivariant reductions, the drum geometry, the axial polarity dipole identity, the momentum screw, and the exact speed budget — is core-agnostic mathematics shared across the braid family, and it lives in [Braid Mathematics](braid-mathematics.md). This chapter consumes that machinery and adds the fixture-specific evidence for the one-band configuration at rest, the `SH-0` effort of the [Noether Braid Proof Map](noether-braid-proof-map.md).

### Isolated Release and the Return-Response Question

Held-release diagnostics of the face-opposite seed on the zero-angular-momentum channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) separate two claims that must not be conflated. The symmetry claim holds to numerical precision: the released seed stays on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact. The stability claim fails in isolation: across the tested windows the reduced radius shows a single compression-to-expansion turn and then expands without any later inward acceleration row, so the isolated seed behaves as a symmetric contraction-and-release channel rather than a self-maintaining branch.

This pairing is informative rather than damaging. A shell braid was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-source self-hit rows, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The axis-neutral rotating channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support; the scoped anti-damping results collected there bound what any such candidate must overcome. The environmental candidate is the `SH-0-sea` route stated next.

The void diagnostic can now be stated sharply rather than qualitatively, because the recorded escape obeys a conditional no-return certificate on the invariant channel. Two monitored conditions carry it: sub-field speed, meaning every worldline stays below the field speed $c_f$; and an opposite-polarity separation floor, meaning the closest opposite-polarity non-antipodal pair stays at least one reduced radius $R$ apart. The floor holds automatically from the channel's own geometry, and the retained causal-root count reduces to exactly one root per directed pair, so sub-field speed is the only condition that must be watched forward in time. Under the two conditions the reduced-radius acceleration satisfies a signed inverse-square lower bound $\ddot R\ge -K/R^2$, with $K$ built only from the row's coupling, its declared speed and weight caps, and the polarity structure — same-polarity partner terms cancel by an exact radial-sign argument, and the opposite-polarity terms are bounded by the floor. A short energy-integral argument then closes it: if the outward speed at a chosen certificate time clears the margin $\dot R^2>2K/R$, the reduced radius cannot turn back while the two conditions hold. This conditional statement is an established derivation on the channel, not a retained-branch claim; on every isolated row recorded so far the margin is unmet, consistent with the escape the diagnostic reports.

The consequence sharpens the return-response question to a single named target. A return turn cannot be the first event — any return must be preceded by a violation of sub-field speed or the opposite-polarity floor — so on the isolated channel the reduced radius escapes for as long as the row stays sub-field, and retention is possible only through a term that ends sub-field speed first, driving the internal speed to the field-speed hinge where the outward drive stops before the radius can turn. This is exactly why the [anti-damping pump](braid-mathematics.md#scoped-anti-damping-results) enters with the sign it does: it is transverse, so it feeds escape rather than return, and its only bearing on the certificate is that it pushes the speed toward $c_f$ — the very condition whose failure ends the window. The open target is therefore precise: exhibit an internal or environmental absorber that ends sub-field speed before the margin is crossed. The surviving candidate absorbers, and why the symmetric single-site self-hit is not among the load-bearing ones, are set out in [Braid Mathematics](braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord); the environmental candidate is the `SH-0-sea` route below.


### The SH-0-Sea Environment Route

The declared environment round is `SH-0-sea`: the same one-band configuration at rest, embedded in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. The `-sea` qualifier is defined in [Noether Braid Taxonomy](noether-braid-taxonomy.md): it does not name a new shell family; it is the `SH-0` rest test with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing the round requires an explicit like-assembly population record, a declared boundary condition, and a sea-response row tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). The retention round — a retained branch on one record — is not yet started, but the environmental response now carries a scoped result that narrows what the round can be.

On the static side the answer is negative and certified. For the aligned nearest-neighbor sea shell, the sea's along-velocity wake force decomposes exactly into an orientation-locking part with zero cyclic average and a single velocity-linear coefficient, and that coefficient is certified to lie well below the tangential pump. The static aligned Noether sea is therefore a non-absorber: it can delay the outward turn but cannot remove the pumped tangential action, so the sub-field-speed clock of the [return-response certificate](#isolated-release-and-the-return-response-question) still runs, and a static like-assembly environment cannot by itself supply retention. Two companion static readings agree: a static induced orientational polarization of the neighbors relaxes anti-retentively rather than toward the aligned order retention would require, and a phase-lagged (dynamic) induced polarization is absorptive in sign but, at the orientational stiffness the surrounding cluster supplies, too weak to overcome the pump by a factor of several. The open question is thus no longer whether any sea helps, but whether a dynamic, formation-history-driven sea response — one that self-selects the aligned order the static readings cannot — can end sub-field speed before the certificate margin is crossed.

### Accessory Dressing and Apparent Energy

The material in this section is a candidate mechanism at hypothesis level. It constrains how accessory architrinos should dress a Noether braid core, and none of it is yet supported by a retained branch record.

The general selection rule — same-polarity accessories under mutual repulsion and braid-supplied confinement select the classical minimum-energy arrangement of equal charges, and the selected arrangement fixes the leading multipole at which the dressing exposes structure — is the [Thomson dressing mechanism](braid-mathematics.md#thomson-dressing-mechanism) of Braid Mathematics. For six accessory sites the selected arrangement is a regular octahedron, with the accessory sites driven outward along the $\pm$ coordinate axes and no structure-revealing moment below hexadecapole order. Six accessory electrinos — the full electron charge complement — therefore form the quietest possible dressing beyond the unshieldable net charge. This is the candidate reading of two electron facts at once: the observed mass is small despite the large shielded interior energy because the dressing exposes almost no structure, and the electron is resilient because the sixfold octahedral arrangement is a deep, symmetric minimum.

Because the net polarity inventory cannot be masked by any superposition, a dressed fermion remains electromagnetically visible at exactly its net charge, while the high-cadence braid carrier masks accessory structure above the net-charge level through amplitude dominance and cadence separation. Accessory-mediated interactions would then be resolvable only when another assembly approaches within roughly the braid scale, where the near field exposes the accessory causal roots. This is a candidate origin for the short range of weak-channel interactions that does not introduce a massive mediator as a primitive; it requires a two-assembly near-field derivation before any stronger claim.

The octahedral dressing also addresses the protected six-unit polarity inventory named as a high-priority explanatory target in [Architrino](../foundations/architrino.md#polarity-and-electric-bookkeeping): the requirement of a finite site-stabilizer action whose orbit has exactly six sites. Pure inversion is a symmetry of a same-polarity dressing even though the core's own symmetry pairs inversion with polarity exchange, and the group generated by the braid's three-fold rotation together with inversion has order six and acts on the octahedral accessory sites as a single free orbit. On this candidate reading, observer-level charge arrives in units of $6\epsilon$ because charge dressing comes in whole orbits of the braid's rotoinversion symmetry, and one full orbit is six sites. This is a hypothesis for the quantum-number mapping program, not a derivation of the charge quantum.

The same quietness ladder orders the quark cases. Accessory counts of four and two — the up-type and down-type inventories — select a tetrahedron, which leaks structure at octupole order, and an axial pair, which leaks at quadrupole order. Both dressings are noisier than the electron's, exposing more structure and coupling more strongly to the environment, which is the candidate reading of why isolated quarks are unstable. The confinement-flavored speculation is that pairs and triples of quarks combine their accessory inventories toward quieter composites, so that isolation is forbidden by unquenched dressing multipoles rather than by decree.

The undressed end of the ladder is the neutrino-like case: an iso-frequency braid with no accessory charges, no net charge, and a configuration just short of the planar field-speed lock that characterizes the photon channel, retaining only a small exposed energy. If the three binaries couple symmetrically under the three-fold rotation of the axis-neutral channel, their residual phase operator is a circulant matrix whose eigenvectors are the discrete Fourier modes, the first being the democratic vector $(1,1,1)/\sqrt3$ with the remaining two carrying $120^\circ$ phases. Flavor states as Fourier modes of the three-binary phase residual, oscillation as their beats, and mass splittings as residual gap scales form the corresponding speculative readout. As a comparison observation only: the democratic direction appears independently in two measured lepton-sector patterns, the Koide relation, which fixes the charged-lepton root-mass vector at angle $\pi/4$ to $(1,1,1)$, and the near-trimaximal neutrino mixing column proportional to $(1,1,1)/\sqrt3$. These observational patterns are treated as comparison targets for the dressing and phasing program, not as evidence that any braid branch is retained.

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

Comparative standing: in the configuration-space program that runs these comparisons, the current leading candidate is not a frequency-separated nested arrangement but the **spindle braid** — the rigid uniaxial iso-frequency family in which tilt angles, not frequency ratios, decouple layer speeds from nesting radii ([Spindle Braid](spindle-braid.md), [Noether Braid Taxonomy](noether-braid-taxonomy.md#leading-candidate-the-spindle-braid)). The nested shell families in this chapter remain the named comparison population, and the generation and dressing hypotheses developed below are stated so that they can be re-hosted on whichever family is eventually retained.

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

The candidate physical implementation of the discrete action transaction — the field-speed hinge acting as the braid's escapement, with each accepted transaction realized as a controlled crossing of the causal-root fold set that changes the integer root count by one — is core-agnostic machinery and is developed at hypothesis level in [Braid Mathematics](braid-mathematics.md#action-clicks-at-the-fold-set). For this chapter's ledger the consequences are that the closed-cycle action unit $h_{\mathrm{act}}$ is the action transacted in one click, that closure-label changes are tied to causal-root bifurcation, and that many asynchronous clicks coarse-grain into the smooth cadence-space current named above.

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

One possible closure is a branch-pinned speed. If the outer branch keeps

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

As a nested shell braid approaches an event horizon, the **outer binary frequency increases** and its **speed approaches $c_f$**, while the **middle binary** remains on the declared hinge branch as its shell scale and cadence retune. At the horizon-alignment target, the **middle and outer binaries reach $c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

The canonical term for this whole-assembly transition is the **braid symmetry-breaking point**. It is not a claim that the inner, middle, and outer binaries become identical. It means the middle binary remains on the field-speed hinge, the outer binary is driven into the same terminal threshold, and the inner binary remains the self-hit interior row while the assembly loses ordinary volumetric slack. Because $s_\ell=\omega_\ell\rho_\ell$, equal threshold speed does not by itself imply equal frequency, equal effective lever arm, equal radius, or equal energy.

This makes the nested shell braid more than a particle scaffold. In the nested shell braid reading, it contains a local black-hole dual: the middle binary is the horizon-interface threshold, the inner self-hit binary is the beyond-threshold interior row, and the outer binary is the exterior-coupling row that can be driven into terminal alignment under strong-field stress. This is a primitive black-hole pattern inside the assembly ontology, not an assertion that an ordinary particle is an observer-level compact object. The dynamics-facing proof burden is stated in [Nested Shell Braid Dynamics](../proof-programs/terminal-alignment.md#local-black-hole-duality-target).

**Mapping rule:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (nested shell braid coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale; compare [Singularity Resolution](../spacetime/singularity-resolution.md) and [Mapping the Planck Scale to the Nested Shell Braid Geometry](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

The alignment limit also has a wake-signature reading, at hypothesis level. The [axial polarity dipole identity](braid-mathematics.md#moments-and-the-axial-polarity-dipole) shows that a braid's leading polarity-signed moment lives entirely on its axial extent and vanishes as the configuration flattens toward the planar limit. Terminal alignment — coplanarity at field speed — is therefore also the **dipole-quiet limit**: an assembly driven into alignment stops broadcasting its leading polarity-signed structure exactly when it reaches the horizon condition. On this reading, the darkness of the horizon boundary is not only a causal-escape statement; the infalling assembly's loudest wake channel closes as a matter of geometry, leaving only higher-moment and phase data as the distinguishable content. That surviving content is what the alignment-restricted closure label $\Lambda_{\text{NS}}^{\mathrm{align}}$ enumerates, which makes the horizon-interface entropy counting and the dipole-quiet limit two views of the same restriction.

### The Foundation for Fermions

The Noether braid class supplies the structural scaffold used by the fermion program. Different closure labels, shielding tiers, energy records, and surrounding axial/wake structures are expected to map to Standard Model flavors and generations, but the mapping remains a derivation target until the branch labels, axial-layer inventory, and apparatus-coupling records have been recovered from the dynamics.

The collective motion, or **group velocity**, of a Noether braid assembly determines its emergent behavior. The way these assemblies interact and pack together can lead to different statistical properties. The geometry-facing version of that claim is developed in [Fermi-Dirac and Bose-Einstein Statistics](../quantum/fermi-dirac-and-bose-einstein-statistics.md): volumetric Noether braid envelopes are the substrate candidate for fermionic exclusion, while strongly oblated coherent support is the candidate route to bosonic shared occupation.

### Nested Shell Braid Dynamics

This section carries the nested family's mechanism and certificate-target material: how a nested shell braid could stay together as a moving delayed system, extending the two-body causal-wake problem into a three-band assembly whose inner, middle, and outer support bands must keep compatible branch records instead of behaving like three independent orbits. Stability is treated as same-record closure: the branch must carry the period, active-root ledger, deformation map, medium response, observer-export packet, and event ledger together, and a visually plausible frequency pattern or useful envelope shape is not enough unless it belongs to the same retained delayed record.

The realization-independent machinery first stated here now lives with the shared mathematics — the substrate levels, speed hierarchy, transverse causal budget lemma, spiral-helical motion picture, mass thesis, hinge equation sketch, and acceleration-gradient comparison are in [Braid Mathematics](braid-mathematics.md#substrate-and-effective-levels) — and the strong-field endpoint (the braid symmetry-breaking point, the local black-hole duality target, and the terminal-alignment label-count program) lives in the [Terminal Alignment](../proof-programs/terminal-alignment.md) proof program. What remains below is the nested-specific mechanism scaffold, read together with [Binary Dynamics](../dynamics/binary-dynamics.md) and [Noether Braid Doubling-Frequency Resonance Lock](explored-braid-geometries.md#noether-braid-doubling-frequency-resonance-lock).

#### Relation to Causal Closure

This chapter owns the dynamics baseline: the nested shell braid roles, speed-regime conventions, delay-envelope geometry, gradient response, local cycle-period diagnostics, and stability tests that define the nested shell braid mechanism. It does not try to close the full rest-mass, photon, or observer-inference proof program.

Proper time $\tau$ does not exist at this layer. The EOM is integrated exclusively over absolute substrate time $T$. A nested shell braid branch may output absolute periods, causal-root ledgers, deformation tensors, and stability residuals; later observer-inference chapters may translate those outputs into clock, ruler, signal, and effective-geometry language.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

#### Claim Scope

The claims in this chapter define a canonical dynamics baseline. They do not yet constitute a completed derivation of rest mass, photon behavior, or general relativity from first principles. The claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Nested shell braid roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, cycle-period diagnostics, and stability tests. |
| Reconstruction target | Mass response, photon-channel behavior, observer-inference exports, and weak-field matching inputs as quantities to be derived from the dynamics before downstream interpretation. |
| Open proof burden | Nested shell braid minimality, shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle export bounds, and downstream observer-geometry closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

#### Causal-Closure Certificate Target

The rest-mass, moving-deformation, photon, observer-export, and event-ledger rows should be populated by one retained branch record, not by separately tuned fits. Retention is the conclusion of the certificate, not an assumption made before the rows are checked. For a candidate nested shell braid chart $q$ over a test window $W$, the shared certificate target is

$$
\mathcal{C}_{\mathrm{NSH}}^{(q)}(W)
=
\left(
\mathcal{A}_q,
\nu_J^{(q)},
\nu_{\mathrm{rec}}^{(q)},
g_{\mathrm{inactive}}^{(q)},
h_{\mathrm{mem}}^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{D}_{\beta,q}^{\mathrm{mov}},
T_q(\mathbf V_{\text{trans}}),
\mathcal{M}_{\mathrm{sea},q}^{ab},
\mathcal{R}_{\mathrm{mov},q},
\theta_{\mathrm{obs}}^{(q)},
\mathfrak{S}^{(q)}(W),
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)
$$

Here $\mathcal{A}_q$ is the active causal-root ledger, $\nu_J^{(q)}$ the active source-normal Jacobian floor, $\nu_{\mathrm{rec}}^{(q)}$ the retained receiver-normal branch-strength floor or certified interval for $W_{ij}^{\mathrm{rec}}$, $g_{\mathrm{inactive}}^{(q)}$ the inactive-root gap, $h_{\mathrm{mem}}^{(q)}$ the finite memory depth, and $\Delta_{\mathbf{k}}^{(q)}$ the Floquet or branch-stability gap. The remaining rows record the moving deformation map, absolute branch period, medium-dressed mass-response tensor, moving-branch residual, observer-export packet, active sector residuals, and row-indexed event ledger. The observer-export packet is not an effective metric or clock law; it is the branch-certified data that later observer-inference chapters must consume.

The branch identity check is

$$
d_{\mathcal{A}}^{(q)}
=
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{per}}^{(q)},
\mathcal{A}_{\mathrm{env}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{env}}^{(q)},
\mathcal{A}_{\mathrm{sig}}^{(q)}
\right)
+
d_{\mathcal{A}}
\left(
\mathcal{A}_{\mathrm{sig}}^{(q)},
\mathcal{A}_{\mathrm{event}}^{(q)}
\right)
$$

The candidate chart may be promoted to a retained branch class $q$ only if the same ledger supplies a positive source-normal Jacobian floor, positive receiver-normal branch-strength floor or certified interval, inactive-root gap, finite memory depth, positive stability gap, closed event ledger, and the normalized closure residual

$$
\mathcal{U}_{\mathrm{NSH}}^{(q)}(W)
=
\max\left(
\frac{d_{\mathcal{A}}^{(q)}}{\epsilon_{\mathcal{A}}},
\frac{\left\|\mathcal{R}_{\mathrm{mov},q}\right\|_W}{\epsilon_{\mathrm{mov}}},
\frac{\left\|\mathcal{M}_{\mathrm{sea},q}^{ab}-h^{ab}/c_{\text{eff}}^2\right\|_W}{\epsilon_{\mathrm{mass}}},
\frac{R_{\mathrm{div}T}^{(q)}+R_{\mathrm{Pois}}^{(q)}+R_{\mathrm{EFE}}^{(q)}+R_{\mathrm{var}}^{(q)}}{\epsilon_{\mathrm{GR}}},
\sup_{S\in\mathfrak{S}^{(q)}(W)}
\frac{\left\|\mathcal{R}_S^{(q)}\right\|_W}{\epsilon_S},
\frac{\left\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}\right\|_W}{\epsilon_{\mathrm{led}}}
\right)
\le1
$$

This is a certificate target, not an additional force law. It prevents a moving-deformation ratio, a mass-response average, a photon row, or an observer-export residual from being promoted unless the same causal-root branch supplies the period, envelope, signal, observer-export, mass, sector, and event-ledger data. If a row fails on $q$, the verdict is a rejected chart or continuation target under its declared hypotheses, not evidence against the broader neutral braid or shell braid class.

#### Multi-Scale Layer Locking

The baseline nested shell braid is not a stack of three identical circular binaries. It is a nested causal lock whose shells operate in different speed regimes. Let $s_\ell$ denote the characteristic speed of one member of shell $\ell$ around that shell's center. In the ordinary weak-stress regime, the target ordering is

$$
s_I > c_f,
\qquad
s_M \approx c_f,
\qquad
s_O < c_f
$$

The inner binary is therefore self-hit and history-supported, the middle binary is the $\|\mathbf V\| = c_f$ hinge where root branches are most sensitive, and the outer binary is the sub-field-speed interface that controls shielding and boundary coupling. Their radii, cycle times, and history-window depths may differ by orders of magnitude. A reduced derivation can start with a separated-scale hypothesis such as $R_I \ll R_M \ll R_O$ and $T_I \ll T_M \ll T_O$, but the branch must report the actual hierarchy rather than hiding it in the notation.

This is why ordinary circular or elliptic orbit language is limited. A circular carrier can expose useful geometry and a separable shell ansatz can diagnose missing forces, but a tangential residual in that ansatz does not by itself settle the nested shell braid closure problem. In a coupled lock, inter-shell wakes, self-hit roots, and near-separator branch changes can supply phase corrections that are absent from a single isolated two-body chart.

The same distinction applies to compact nested shell braid carriers. A finite-coordinate no-go for one compact carrier rejects that branch chart and its declared coordinates; it does not falsify the $A_0$ branch program. Raw root-key splits, observation-phase bins, and fitted residual bases remain diagnostic unless they belong to a branch-native coordinate declared before fitting. A checker-cleared coordinate may seed only a rerun candidate; it is not physical branch structure until the same branch identity survives root-ledger transport, residual checks, and stability continuation.

The perturbation status should therefore be sorted before simplification:

| Perturbation class | Dynamics role |
| --- | --- |
| Nonresonant fast terms | Average over the closed nested shell braid cycle and mostly affect convergence or small far-field corrections. |
| Resonant and near-separator terms | Change phase closure, causal-root counts, Jacobians, or Floquet multipliers, so they remain part of the branch definition. |
| Leakage terms | May be small internally while surviving as far-field multipoles or anisotropy, so they control the shielding extraction. |

#### Planar Reduced Noether Braid Chart

The **planar reduced Noether braid chart** is the simplest controlled chart for studying the braid symmetry-breaking point. It projects three declared branch rows into a common plane or near-plane and records, for each row $a\in\{1,2,3\}$ before role assignment,

$$
\Pi_{\mathrm{pl}}(B_{3B})
=
\left(
f_a,\phi_a,\rho_a,s_a,\sigma_a^{\mathrm{plane}},\mathcal{B}_a
\right)_{a=1}^{3}
$$

together with the causal-root, receiver-normal branch-strength, wake, angular-momentum, energy-routing, and stability ledgers that would make the projection admissible. Here $f_a$ is a frequency or integer phase-lock row, $\phi_a$ is the phase offset, $\rho_a$ is the effective lever arm, $s_a=\omega_a\rho_a$ is the local speed row, $\sigma_a^{\mathrm{plane}}$ is the planar circulation sign, and $\mathcal{B}_a$ is the oriented plane bivector used for sector classification.

This chart is a reduced proof bridge, not a replacement for the full three-dimensional branch. It connects three active searches:

- the $x:y:z$ frequency-pattern search, including iso-frequency, integer-ratio, and doubling-frequency families;
- the braid symmetry-breaking point, where the planar chart becomes the terminal-alignment slice of the nested shell braid;
- the photon channel, where two planarized pro/anti braid records form the coaxial contra-rotating pro/anti planar pair.

Taxonomically, this remains a chart label. It becomes `PL-NSH-0` evidence only when the local calculation is testing lower-rank nested shell retention on a declared branch record. It becomes `NSH-TERM` evidence only when the local calculation is the terminal hinge or braid symmetry-breaking boundary. In the photon-channel use, it is bridge evidence consumed by photon closure; it does not certify a Noether braid branch by itself.

The first planar discriminator is the reduced residual

$$
\mathcal{R}_{\mathrm{pl}}
=
\max\left(
d_{\mathrm{plane}},
d_{\mathrm{root}},
d_{\Theta},
d_{\mathbf{J}},
d_E,
d_{\mathrm{wake}},
d_{\mathrm{stab}}
\right),
$$

where $d_{\mathrm{plane}}$ measures coplanar sector support from the bivector Gram matrix, $d_{\mathrm{root}}$ measures same-row causal-root identity, $d_{\Theta}$ measures phase-bundle or return-period closure, $d_{\mathbf{J}}$ measures angular-momentum ledger closure, $d_E$ measures energy/action routing, $d_{\mathrm{wake}}$ measures causal-wake pullback and provenance closure, and $d_{\mathrm{stab}}$ measures branch stability over the declared event or positive-width branch domain. A planar frequency pattern is only a candidate until this residual closes on one retained row set.

#### All-Layer Translating Branch Response

A translating nested shell braid is not described by one outer radius alone. The hidden state includes all three shell radii, frequencies, characteristic speeds, axes, active causal roots, and wake exchange:
$$
B_q(v)
=
\left(
R_I,R_M,R_O;\,
\omega_I,\omega_M,\omega_O;\,
s_I,s_M,s_O;\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O;\,
\mathcal{L}_{\mathrm{root}};\,
\mathcal{L}_{\mathrm{wake}}
\right)_q
$$

The moving-branch extraction starts with a primitive drift band
$$
\mathcal{D}_{\beta_f}=\{\,0\le \|\mathbf V_{\text{trans}}\|/c_f\le\beta_{\max}<1\,\}
$$
All causal roots in the branch ledger are solved with $c_f$ and absolute time $T$. No dressed observer-channel speed is allowed inside this branch calculation.

The strict upper end of this drift band is kinematic. A leading-side partner row must be caught by a causal wake emitted from a source behind the receiver in the co-moving branch chart. If the center drift reaches $\|\mathbf V_{\text{trans}}\|\ge c_f$, that forward partner row has no positive-delay root, and the causal-root ledger starves on the leading side. The resulting speed-limit statement applies to sustained center translation of an internally bound branch; it does not prohibit inner-shell self-hit histories or other internal components from entering super-field-speed regimes relative to the primitive wake speed.

For the same admitted branch $q$, extract semiaxes from the cycle-averaged nested shell braid shape tensor
$$
Q_{ab}^{(q)}(\mathbf V_{\text{trans}})
=
\frac{1}{6}
\left\langle
\sum_{i=1}^{6}r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q}
$$
The uniform factor reflects the six equivalent primitive architrinos in the retained branch; it is not a primitive mass weighting.
With drift direction $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, define
$$
R_{\parallel,q}(\mathbf V_{\text{trans}})
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}\hat e_{\parallel}^{b}},
\qquad
R_{\perp,q}(\mathbf V_{\text{trans}})
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}}
$$
The physical branch period is extracted from a declared layer or composite phase on that same branch ledger:
$$
T_q(\mathbf V_{\text{trans}})
=
\frac{2\pi}{\langle\dot{\theta}_{q}\rangle_{\mathrm{cyc}}},
\qquad
T_{q,0}=T_q(\mathbf{0})
$$
where the dot means $d/dT$ with respect to absolute substrate time.

##### Absolute Cycle-Stretch Theorem Target

Let
$$
N_{\text{hits},q}
=
\left(
N_{\ell\rho}^{(q)}
\right)_{\ell\in\{I,M,O\},\,\rho\in\{\mathrm{self},\mathrm{partner},\mathrm{inter}\}}
\in\mathbb{N}^{m_q}
$$
be the integer ledger of causal roots required to complete one primitive branch rotation. Its total hit count is
$$
|N_{\text{hits},q}|_1
=
\sum_{\ell,\rho}N_{\ell\rho}^{(q)}
$$
Preserving the same branch means preserving this integer ledger, the source identities of the roots, their emission-order classes, the positive Jacobian floor, and the phase-return condition over the whole cycle.
Equivalently, let $\mathcal{H}_q$ be the ordered multiset of retained hit rows represented by $N_{\text{hits},q}$.

For a retained transverse closure row $a$ with rest closure length $\ell_a>0$, a translating receiver must intercept the wake after both the internal closure displacement and the center translation have occurred. In the reduced orthogonal row,
$$
c_f^2\left(\Delta T_a\right)^2
=
\ell_a^2
+
\|\mathbf V_{\text{trans}}\|^2\left(\Delta T_a\right)^2
$$
so
$$
\Delta T_a(\mathbf V_{\text{trans}})
=
\frac{\ell_a}{\sqrt{c_f^2-\|\mathbf V_{\text{trans}}\|^2}}
=
\frac{\Delta T_a(\mathbf{0})}
{\sqrt{1-\|\mathbf V_{\text{trans}}\|^2/c_f^2}}
$$
Thus any retained ledger that requires nonzero transverse closure rows has a larger absolute-time delay per such row when $\mathbf V_{\text{trans}}\ne\mathbf{0}$, unless the internal geometry retunes. A branch-period decomposition has the schematic form
$$
T_q(\mathbf V_{\text{trans}})
=
\sum_{a\in \mathcal{H}_q}
\Delta T_a(\mathbf V_{\text{trans}})
+
\mathcal{R}_{\mathrm{phase},q}
$$
where $\mathcal{R}_{\mathrm{phase},q}$ records finite-memory, inter-layer, and phase-return corrections on the same retained branch chart. The theorem target is:
$$
N_{\text{hits},q}(\mathbf V_{\text{trans}})=N_{\text{hits},q}(\mathbf{0}),
\quad
\nu_J^{(q)}>0,
\quad
\Delta_{\mathbf{k}}^{(q)}>0
\quad\Longrightarrow\quad
T_q(\mathbf V_{\text{trans}})\ge T_{q,0}
$$
with strict inequality for nonzero translation unless a compensating shape retuning changes the relevant $\ell_a$ rows. This is an absolute-time period theorem target, not a statement about observer clock time.

##### Mechanical Oblation From Receiver-Normal Wake-Flux Asymmetry

Receiver-normal branch strength is the dynamics-side mechanism behind the wake-flux change that standard field language would otherwise distribute across the effective electromagnetic connection, current/displacement terms, vector-potential curl, and the Noether sea response. For a retained root row $a=(i,j,T_{\mathrm{em}})$,
$$
D_{s,a}
=
c_f-\mathbf V_j(T_{\mathrm{em}})\cdot\hat{\mathbf r}_{ij}(T;T_{\mathrm{em}}),
\qquad
D_{T,a}
=
c_f-\mathbf V_i(T)\cdot\hat{\mathbf r}_{ij}(T;T_{\mathrm{em}}),
\qquad
W_a^{\mathrm{rec}}
=
\left|\frac{D_{T,a}}{D_{s,a}}\right|,
\qquad
w_a
=
\frac{W_a^{\mathrm{rec}}}{r_a^2}.
$$
The branch force contribution is proportional to $w_a\hat{\mathbf r}_a$. Decompose the transceiver velocities into center translation plus internal motion,
$$
\mathbf V_j(T_{\mathrm{em}})
=
\mathbf V_{\text{trans}}
+
\mathbf{u}_j(T_{\mathrm{em}}),
\qquad
\mathbf V_i(T)
=
\mathbf V_{\text{trans}}
+
\mathbf{u}_i(T).
$$
On a retained chart away from grazing, translation enters both $D_{s,a}$ and
$D_{T,a}$. A longitudinal denominator effect is therefore not an oblation proof
unless the same retained row also carries the receiver-normal numerator. The
retained-row target is the receiver-normal anisotropy
$$
\Delta_w
\equiv
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\parallel}
-
\left\langle \frac{W_a^{\mathrm{rec}}}{r_a^2}\right\rangle_{\perp}
\sim
\mathcal{R}_{\mathrm{rec}}
$$
on the same causal-root ledger. Here $\mathcal{R}_{\mathrm{rec}}$ records internal-motion, unequal-radius, finite-memory, unpaired-row, and receiver/source-normal correction terms.

For attractive partner rows, a positive receiver-normal longitudinal anisotropy would increase the cycle-averaged longitudinal restoring stiffness. If $K_{\parallel}^{(q)}$ and $K_{\perp}^{(q)}$ denote the Hessian projections of the retained branch potential reconstructed from the same receiver-normal rows, the oblation target is
$$
K_{\parallel}^{(q)}
>
K_{\perp}^{(q)}
\quad\Longrightarrow\quad
\frac{R_{\parallel,q}}{R_{\perp,q}}
\sim
\sqrt{\frac{K_{\perp}^{(q)}}{K_{\parallel}^{(q)}}}
<1
$$
The physical squash into an oblate $R_{\parallel}<R_{\perp}$ branch is therefore not imported from a relativistic metric. In the canonical Master EOM it must be read as the mechanical response to receiver-normal wake-flux asymmetry created by translating the same causal-root ledger through the Euclidean void; any stiffness estimate that lacks same-record $D_T/D_s$ branch strength is a restart target.

A one-$h_{\mathrm{act}}$ closed-cycle action transaction is a candidate map between stable branch states,
$$
B_q(\mathbf V_{\text{trans}})
\longrightarrow
B_{q'}(\mathbf V_{\text{trans}}+\Delta\mathbf V)
$$
subject to the all-layer action and energy ledgers
$$
\Delta A_{\mathrm{cyc}}\equiv\Delta A_{\text{cycle}}=s_{\mathrm{act}}h_{\mathrm{act}},
\qquad
\Delta I_I+\Delta I_M+\Delta I_O+\Delta I_{\text{wake}}=s_{\mathrm{act}}\hbar_{\mathrm{act}},
\qquad
s_{\mathrm{act}}\in\{-1,+1\}
$$
$$
\sum_{\ell\in\{I,M,O\}}
\int_{B_q\to B_{q'}}\omega_\ell\,dI_\ell
+
\Delta E_{\text{wake}}
=
\Delta E_{\text{coupl}}
$$
Thus acceleration, absorption, or any accepted transaction can change all three $\omega_\ell$, all three $R_\ell$, and all three $s_\ell$. The outer binary is the leading envelope projector because it is the exposed boundary layer. The middle binary remains the separator-sensitive hinge, and the inner binary remains the self-hit/history-supported engine. Dropping the middle or inner layer is therefore a reduced observable model, not a proof of translating-branch closure.

#### Cadence-Scale Retuning Closure

The retuning-map problem is the local dynamics version of the one-$h_{\mathrm{act}}$ transaction. On a branch chart $q$, define

$$
\mathbf{y}_q
=
\left(
\ln\nu_I,\ln\nu_M,\ln\nu_O,\,
\ln R_I,\ln R_M,\ln R_O,\,
\ln\lambda,\ln\xi
\right)^{T},
\qquad
\omega_\ell=2\pi\nu_\ell
$$

The layer-speed identities give the first kinematic constraint:

$$
\Delta\ln s_\ell
=
\Delta\ln R_\ell
+
\Delta\ln\nu_\ell,
\qquad
\ell\in\{I,M,O\}
$$

The simple inverse rule $\Delta\ln R_\ell=-\Delta\ln\nu_\ell$ is therefore valid only on a sub-branch where $\Delta\ln s_\ell=0$. The ordinary nested shell braid speed hierarchy instead imposes inequalities and hinge tolerances:

$$
s_I'>c_f,
\qquad
\left|s_M'-c_f\right|\le\epsilon_M c_f,
\qquad
s_O'<c_f
$$

where primed quantities are evaluated after retuning and $\epsilon_M$ is the declared middle-hinge tolerance. A transaction that violates these conditions is not a smooth retuning inside the same regime; it is a branch event at the speed-regime boundary.

The first calculable closure can be written as a constrained compliance problem. Let $\mathcal{C}_q(\mathbf{y},\mathcal{G})=0$ collect the phase-closure, causal-root, separator, inter-layer exchange, and stability constraints. Let $\mathbf{K}^{\mathrm{ret}}_q$ be the positive semidefinite local compliance matrix for retuning costs on the declared branch chart. Then the candidate increment is

$$
\Delta\mathbf{y}_{q,s_{\mathrm{act}}}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}
\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
s_{\mathrm{act}}h_{\mathrm{act}},
\qquad
D\mathcal{C}_q[\Delta\mathbf{y}]
+
\Delta\mathcal{C}_{\mathcal{G}}
=0
$$

and to the post-retuning speed-regime inequalities above. The matrix $\mathbf{K}^{\mathrm{ret}}_q$ is not a new force law. It is the local second-variation record of how costly it is for the accepted branch to place the action increment into cadence, layer scale, envelope shape, orientation, or wake exchange. In a simulation, it should be estimated from the linearized return map or from finite retuning trials around an admitted branch.

The cadence-scale retuning map is then the projection

$$
\mathcal{R}_{\mathrm{cyc}}^{(q,s_{\mathrm{act}})}
=
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y}_{q,s_{\mathrm{act}}},
\Delta\mathcal{G}_{q,s_{\mathrm{act}}}
\right)
$$

with

$$
\Pi_{\mathrm{ret}}
\left(
\Delta\mathbf{y},
\Delta\mathcal{G}
\right)
=
\left(
\Delta\nu_N,\Delta R_I,\Delta R_M,\Delta R_O,\Delta\lambda,\Delta\xi
\right)
$$

This map is falsifiable at the branch level. It fails if no admissible minimizer exists, if the minimizer crosses a separator while being treated as same-branch drift, if the middle hinge leaves its declared tolerance, if the envelope projection and branch-period stretch come from different retained ledgers, or if the wake-ledger residual is large enough to survive hierarchy averaging. These are not bookkeeping nuisances; they are the diagnostics that decide whether the same one-$h_{\mathrm{act}}$ transaction can become the Noether sea cadence current used in cosmology.

The first reduced validation model for this target is [Retuning-Map Toy Model](../validation/simulations/retuning-map-toy-model.md), with runtime script `scripts/nested-shell-braid/retuning-map-toy-model.mjs`. That model solves the linearized constrained compliance problem and reports the induced $J_\nu$ estimate. It is a branch-bookkeeping scaffold, not delayed-dynamics validation.

#### Observer-Inference Export Boundary

This dynamics chapter exports branch-certified substrate records, not observer geometry. The reusable export packet is
$$
\mathcal{E}_{q}^{\mathrm{obs}}
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)
$$
Every entry is computed in absolute time from the retained causal-root chart. Later observer-inference chapters may ask whether this packet recovers clock behavior, ruler behavior, photon synchronization, or effective geometry. Those are downstream recovery tests. They are not definitions, assumptions, or integration variables in nested shell braid dynamics.

#### Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the nested shell braid as inner engine, middle fulcrum, and outer shielding/interface shell.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local cycle-period diagnostics from the absolute cycle-stretch theorem target.
5. Solve all-layer branch updates for one-$h_{\mathrm{act}}$ transactions and extract the branch-indexed period-stretch and envelope-oblation records.
6. Compute the terminal-alignment area-normalized label density $\bar{\alpha}_{\mathrm{align}}=s_{\mathrm{align}}/a_{\theta}$ from alignment-restricted closure labels, patch-area normalization, and edge wake compatibility.
7. Output alignment, closure, Floquet, grazing, branch-residual, and observer-export diagnostics.
8. Keep mass, photon, equivalence-principle, and full observer-geometry matching claims outside the primitive dynamics layer until their proof burdens close.

#### Working Hypotheses

1. The formed nested shell braid has stable invariants ($R_{\text{braid}}$, $\omega_{\text{braid}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity may produce an oblate causal envelope that drives planar alignment in the terminal rung; this remains a working hypothesis until the swept-volume and branch-stability tests close.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

#### Geometry Focus

##### A) High Group Velocity Geometry (Nested-Family Oblate Spheroidal Envelope)

**Nested-family assumption (testable):** The outer binary of a moving nested shell braid generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$ on the primitive branch chart. This law is not the spindle family's rest-envelope law: the spindle is fusiform at rest, and its moving-envelope projection remains an explicit open obligation in [Braid Envelope Geometry](braid-envelope-geometry.md#retuning-projection-to-envelope-variables).

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an oblate spheroidal envelope
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Use the kinematic contraction law as a theorem target to be derived from branch dynamics:
$$
\beta_f = \frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp\sqrt{1-\beta_f^2}
$$
As $\beta_f \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the primitive causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta_f^2}
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta_f^2}$, which is the triangle form of the oblate spheroidal envelope theorem target rather than a completed recovery.

**Impact on delay locking:** The round-trip delay $\Delta T_{\text{rt}}$ is the absolute-time interval between an outer-binary architrino's emission and the moment its wake returns to influence that same architrino, approximating the inner and middle binaries as a compact subsystem at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the oblate spheroidal envelope is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}
$$
Then $\Delta T_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf V_{\text{trans}}) = \omega_n\,\Delta T_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(T)$ so
$$
V(T) = \frac{4\pi}{3} R_\perp(T)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(T)}{c_f}\right)^2}
$$
This expression belongs to the primitive branch chart; downstream dressed-channel variants must be rebuilt from an explicit observer-inference map.

---

##### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent Noether sea response gradient, not as fundamental curvature of the Euclidean void. Dense collections of standard-model assemblies perturb Noether sea density, compliance, stress, effective potential, and terminal-alignment state. The effective gravitational field in this delay-geometry model is the observer-level reconstruction of those coupled gradients.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ only in reduced scans, for example a magnitude extracted from Noether sea density/compliance/stress gradients, $\partial_r\Phi_{\text{eff}}$, or a tidal tensor. In simulations, treat $G_{\text{grad}}$ as a declared proxy around the outer-binary orbit and record which Noether sea response channel it compresses.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

##### C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate spheroidal envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this suggests the terminal-rung failure mode to test: further increases may fail to support a stable 3D mode and may force a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the minimal system; treat results as lower bounds until the swept-volume effect is added.

##### D) Local Cycle-Period Diagnostic

**Goal:** Define local cycle-period change as a geometric effect in the delay loop, not as distortion of substrate time or as a relativistic postulate.

**Reference cadence:** Use a declared reference assembly cadence $T_{\mathrm{ref}}$; the terminal-alignment normalization may specialize this to the outer-binary Planck cadence $T_{\mathrm{ref}}=1/f_P$, where $f_P$ is the Planck-frequency normalization used only after the Planck-scale mapping is declared.

The cadence $T_{\mathrm{ref}}$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $T$ remains the uniform ordering parameter for causal-hit evaluation. The local dynamics diagnostic compares assembly cycle counts to this reference cadence:
$$
C_{\text{cyc}}(\mathbf X)
\equiv
\frac{T_{\mathrm{ref}}}{T_{\text{local}}(\mathbf X)}
$$
in the rest branch of the local Noether sea cell. This quantity is a dynamics-side period ratio, not a time coordinate.

**Sector-delay diagnostic from delay geometry:** Define a reference round-trip delay $\Delta T_{\text{rt,ref}}$ and a local delay $\Delta T_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta T_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta T_{\text{rt,ref}}}
$$
and, for the oblate-envelope-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how one sector's phase-closure period compares to the reference cadence:
$$
T_{\text{local}}(\theta) = T_{\mathrm{ref}} \, \alpha(\theta, G_{\text{grad}})
$$
When $\alpha > 1$, local cycles are longer relative to $T_{\mathrm{ref}}$; when $\alpha < 1$, they are shorter. This sector-delay diagnostic remains an absolute-time branch-period record. It can be exported downstream only after the accepted branch functional $T_q(v,G_{\text{grad}})$ is derived from the full cycle and matched to the retained causal-root ledger.

**Geometric source of period shift:** The causal envelope shape sets $\Delta T_{\text{rt}}$. As the nested shell braid tilts out of planar alignment and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Primitive translation parameter:** For the branch scan, use
$$
\beta_f=\frac{v_{\text{trans}}}{c_f},
\qquad
R_\parallel = R_\perp \sqrt{1-\beta_f^2}
$$
Geometrically, $\beta_f$ is the primitive axis-squash control: as $\beta_f \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local cycle frequency as $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Longer causal loops (larger $\alpha$) yield lower cycle frequency at fixed absolute-time reference; any redshift interpretation belongs downstream.

---

#### Minimal Models

##### Nested Shell Braid Baseline (Inner + Middle Fixed)

**Focus:** Treat the inner and middle binaries as a formed subsystem with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{braid}}$, $\omega_{\text{braid}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any subsystem element rides $\|\mathbf V\| = c_f$ continuously.

##### Outer-Binary Delay Loop Model with Formed Subsystem

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner and middle binaries modeled as a rigid subsystem with fixed timescales.
- Outer binary orbits that subsystem with non-coplanar planes initially.
- Translational speed $\mathbf V_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use oblate-envelope-based $\Delta T_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf V_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta T_{\text{rt}}(\theta) + \phi_{\text{geom}}(n)
$$
and track when $\partial \Phi_n/\partial r$ changes sign.
Quantization here is emergent: only delay-locked, stable closures persist as discrete rungs, not imposed eigenmodes.

##### Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(T)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test ($SU(2)$ vs $U(1)$):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(T)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(T)$ matches only after $4\pi$, treat as $SU(2)$-like; if after $2\pi$, treat as $U(1)$-like.
- **Diagnostic hypothesis:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should be checked for a possible transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom may reduce to a single in-plane phase ($U(1)$-like), consistent with a boson-like terminal configuration only after the rotation test passes.

##### Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic nested shell braid state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$
Track $\Delta_{\mathbf{k}}$ along scans in declared $\beta_f = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator cycle-period divergence, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf V\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{T-T_*}$ along the eigenvector of the newly activated self-hit root when the crossing parameter satisfies $s(T)-1\sim (ds/dT)(T_*)(T-T_*)$ with $(ds/dT)(T_*)\ne0$. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

#### Observer-Export Diagnostics

Each dynamics scan should output the substrate records needed by later reconstruction chapters without forming an effective line element in this file. The scan-level packet is
$$
\mathcal{D}_{\mathrm{NSH}}(W)
=
\left(
N_{\text{hits},q},
T_q,
Q_{ab}^{(q)},
K_{\parallel}^{(q)},
K_{\perp}^{(q)},
\nu_J^{(q)},
\Delta_{\mathbf{k}}^{(q)},
G_{\text{grad}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}
\right)_W
$$
The spacetime and observer-inference chapters may convert this packet into lapse, ruler, signal, connection, and weak-field comparison variables. This chapter's obligation is narrower: certify that the packet comes from one retained causal-root branch chart in absolute time.

#### Observables and Diagnostics (Summary)

- Compatibility scale invariants: $R_{\text{braid}}$, $\omega_{\text{braid}}$, phase offsets.
- Ladder records: $R_{\text{out}}(T)$, $\omega_{\text{out}}(T)$, plateau stability.
- Geometry records: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation records: inter-plane angles, precession cone angle.
- Stability records: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient record: $G_{\text{grad}}$ and its effect on stability thresholds.
- Observer-export records: $N_{\text{hits},q}$, $T_q$, $Q_{ab}^{(q)}$, $K_{\parallel}^{(q)}$, $K_{\perp}^{(q)}$, $\nu_J^{(q)}$, $\Delta_{\mathbf{k}}^{(q)}$, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{(q)}$.

---

#### Revision Triggers (Failure Modes)

1. **Subsystem stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

#### Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

##### Nested Shell Braid Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the architecture. The $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture posits that three binaries can become coupled into a nested shell braid, with each binary playing a distinct dynamical role.

Nested shell braid minimality is a theorem target: the working claim is that three coupled shell binaries are the minimal stable closure architecture capable of preserving inner memory, commensurability buffering, and boundary coupling under combined kinematic and gradient stress.

- **Inner binary** (MCB, partner/exterior comparison role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (partner/exterior comparison role): near the symmetry hinge ($v \approx c_f$), with shell scale and cadence retuning; energy-storage fulcrum and coupling bridge.
- **Outer binary** (partner/exterior comparison role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether sea gravitational/cosmological response.
At the terminal-alignment interface, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in self-hit interior comparison hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, observer clock behavior, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

##### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector radiation channels.

This chapter therefore keeps only the nested shell braid regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the nested shell braid picture, each nested shell braid is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../spacetime/black-holes.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).

## Noether Braid Doubling-Frequency Resonance Lock

This section hosts the specialized `NSH-421` doubling-frequency `4:2:1` lock study inside the broader [Noether Braid Configuration Space](noether-braid-configuration-space.md). It is comparison-family material: the candidate is definitionally frequency-separated and tests a nested `I:M:O` chart under explicit support, hinge, phase-return, and stability assumptions. It does not make doubling frequency the default Noether braid frequency, certify nested dynamics from kinematics, or generalize to the spindle: the spindle's iso-frequency shared-axis structure has no doubling ladder to lock.

It should be read together with [Binary Dynamics](../dynamics/binary-dynamics.md), [Nested Shell Braid](explored-braid-geometries.md#nested-shell-braid), [Nested Shell Braid Dynamics](explored-braid-geometries.md#nested-shell-braid-dynamics), and [Mapping the Planck Scale](../philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md), which provide the assembly scaffold, geometry, and scale-setting context for the lock relations derived here.

The level distinctions matter throughout. Ontologically, the inner, middle, and outer binaries are assembly layers built from architrino constituents. Dynamically, the reduced model replaces their full delayed causal-wake history by a finite-$\eta$ branch chart. Effectively, low-order multipoles and potentials are comparison summaries of that branch behavior. As a derivation target, an integer lock is selected only after the phase-return degree/holonomy, cancellation score, and stability gap all favor the same branch.

The analysis keeps the field speed $c_f$ explicit rather than setting it to one. Branch labels $k\in\{I,M,O\}$ are used only after the retained branch supplies that role assignment. Here $r_k$ is the characteristic layer radius and $v_k=\|\mathbf{V}_k\|$ is the scalar tangential speed of one member of layer $k$ around that layer's center.

The general unordered state $\mathcal T_{3B}$, its $S_3$ relabeling action, and the iso-frequency and integer-ratio subfamilies are defined in [Noether Braid Configuration Space](noether-braid-configuration-space.md#unordered-layer-semantics). The `NSH-421` specialization adds a certified `I:M:O` role assignment, the exact ring identity $v_k=2\pi f_k r_k$, integer phase-return data, and the finite-$\eta$ selection and stability rows.

### Status and Assumptions

The lock analysis is organized around one exact identity and four explicit assumptions. This separation prevents a kinematic formula from being mistaken for a dynamical selection principle.

#### Exact Kinematic Identity

For each ring,
$$
v_k = 2\pi f_k r_k = \beta_k c_f,
\qquad
0<\beta_k,
\qquad
c_f>0
$$

Equivalently,
$$
f_k=\frac{v_k}{2\pi r_k},
\qquad
r_k=\frac{v_k}{2\pi f_k},
\qquad
v_k=2\pi f_k r_k
$$

Plain language: for any one ring, if we know any two of frequency, tangential speed, and radius, then the third is fixed.

This identity is exact. It is not an assumption, and it does not select a lock by itself.
The logical spine is therefore:

1. **Kinematics:** $v_k=2\pi f_k r_k$ relates speed, frequency, and radius without introducing topology.
2. **Integer closure:** Assumption 2 is the only place where the integer pair $(m,n)$ enters; it turns frequency commensurability into return-map degree/holonomy data.
3. **Selection:** Assumption 4 and the finite-$\eta$ return map decide whether one already-integer-labeled sector is dynamically preferred.

Everything before Assumption 2 is topology-free kinematics. Everything after Assumption 2 is selection among sectors that already carry integer phase-return data.

#### Assumption 1 (Middle Caustic-Grazing Closure)

In the reduced exterior and horizon-transition branch studied here, the middle binary is not pinned exactly on an infinite-force surface. It is modeled as a caustic-grazing carrier whose cycle-averaged hinge value is the field speed:
$$
v_M^{\mathrm{car}}=c_f,
\qquad
\beta_M^{\mathrm{car}}=1
$$
For compact notation, the algebra below writes $v_M=c_f$ and $\beta_M=1$ for this carrier value.

The branch-level motion may have microscopic crossings
$$
v_M(T)=c_f+\delta v_M(T),
\qquad
\langle \delta v_M\rangle_W=0
$$
over the declared window $W$. Each regularized crossing of the $J_M^{\mathrm{src}}(\theta_M)=0$ boundary is a caustic transit with finite impulse
$$
\Delta\mathbf{V}_{M,j}
=
\int_{T_j^-}^{T_j^+}
\mathbf{A}_M^{(\eta)}(T)\,dT,
\qquad
\left\|\Delta\mathbf{V}_{M,j}\right\|<\infty
$$
rather than an infinite-force constraint. These impulse events are candidate mechanical origins for the discrete causal-root ledger steps used in the [energy bookkeeping](../dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

This is the main regime assumption of the `NSH-421` analysis. The speed $c_f$ is the propagation speed of causal isochrons in the reduced dynamics, not an observer-level claim about an effective metric.
It is not a claim that every Noether braid regime has the middle binary exactly at $c_f$; ordinary weak-stress operation may keep the middle layer only near the hinge scale, while the caustic-grazing carrier belongs to the reduced exterior/horizon-transition branch.

#### Assumption 2 (Exact Integer Phase Closure)

Let the outer period be $P_O=\frac{1}{f_O}$. Assume that when the outer ring completes one full cycle, the middle and inner rings also land exactly at the beginning of their own cycles. Equivalently, there exist integers
$$
m,n\in\mathbb{N},
\qquad
1<m<n
$$
such that
$$
\theta_O(T+P_O)=\theta_O(T)+2\pi
$$
$$
\theta_M(T+P_O)=\theta_M(T)+2\pi m
$$
$$
\theta_I(T+P_O)=\theta_I(T)+2\pi n
$$

Therefore the canonical `I:M:O` frequency triplet is $f_I:f_M:f_O=n:m:1$. Equivalently, in outer-normalized order, $f_O:f_M:f_I = 1:m:n$, with $f_M=m f_O$ and $f_I=n f_O$.

Plain language: after one outer revolution, the middle and inner rings have completed whole numbers of revolutions as well, so the three-ring pattern closes exactly.

This is the reduced constant-frequency carrier model. It is a branch-level closure assumption, not a statement that the assembly has only three degrees of freedom. In the full Noether braid closure problem, the simple phases $\theta_k(T)=q_k\omega_O T+\phi_k$, with $\omega_O=2\pi f_O$, are replaced by integrated winding, causal-root, and frame-phase ledgers over the accepted branch chart.

#### Assumption 3 (Fixed Relative Phase Lock)

The lock is not just commensurate in frequency. It also carries fixed relative phase offsets over time. One convenient formulation is
$$
\phi_{MO}(T)\equiv \theta_M(T)-m\theta_O(T)=\phi_{MO}^\ast
$$
$$
\phi_{IO}(T)\equiv \theta_I(T)-n\theta_O(T)=\phi_{IO}^\ast
$$
with constants $\phi_{MO}^\ast,\phi_{IO}^\ast$.

Plain language: the rings keep the same timing relationship cycle after cycle rather than drifting through one another.

#### Bundle Holonomy Reading

Assumptions 2 and 3 can be restated as a phase-bundle condition. Let the outer phase be the base cycle and define the relative connection one-forms

$$
\vartheta_{MO}
=
d\theta_M-m\,d\theta_O,
\qquad
\vartheta_{IO}
=
d\theta_I-n\,d\theta_O
$$

Exact integer phase closure says the covering degrees over one outer cycle are

$$
\frac{1}{2\pi}\oint_{S^1_O}d\theta_M=m,
\qquad
\frac{1}{2\pi}\oint_{S^1_O}d\theta_I=n
$$

or equivalently

$$
\oint_{S^1_O}\vartheta_{MO}=0,
\qquad
\oint_{S^1_O}\vartheta_{IO}=0
\quad
(\mathrm{mod}\ 2\pi)
$$

on the locked branch. Fixed relative phase then says these one-forms are flat on the retained return chart: their integrated values do not drift, and the constants $\phi_{MO}^\ast,\phi_{IO}^\ast$ are the residual flat-connection data. The discrete and continuous pieces should be kept separate:

$$
(m,n)=\text{covering degrees over }S^1_O,
\qquad
(\phi_{MO}^\ast,\phi_{IO}^\ast)=\text{flat-connection moduli}
$$

Thus the lock is a flat relative-phase connection with integer holonomy, not a literal first Chern class over the outer phase circle. In the language of [Effective Lagrangian](../dynamics/effective-lagrangian.md#ordinary-hamiltonian-orientation), the integers $(m,n)$ are the phase-return degree data that make the reduced action-angle chart globally replayable rather than merely local.

The phase-bundle picture also requires genuine three-dimensional layer independence. Let $\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I$ be the orbital-plane normals of the three layer binaries and define

$$
D_{\mathrm{plane}}
=
\det
\left[
\hat{\mathbf{n}}_O,\hat{\mathbf{n}}_M,\hat{\mathbf{n}}_I
\right]
$$

The reduced $T^3$ lock is nondegenerate only while $D_{\mathrm{plane}}\neq0$. Mutual orthogonality gives $|D_{\mathrm{plane}}|=1$, while horizon-alignment or coplanar degeneration drives $D_{\mathrm{plane}}\to0$ and collapses the three-circle bundle to a lower-dimensional projection. The determinant is therefore the natural order parameter for the loss of doubling-frequency precession at alignment.
For a promoted finite-$\eta$ chart this is a conditioning floor,
$$
|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0.
$$
It is the phase-bundle analogue of the basis-conditioning and aperture floors in the frame-construction and detection chapters: $D_{\mathrm{plane}}\to0$ means the three plane normals no longer define a stable oriented frame. The codimension-one wall $D_{\mathrm{plane}}=0$ is also where the near-orthogonal Noether braid phase chart degenerates toward a coplanar cyclic sector, so crossing it is a sector-wall event rather than a harmless coordinate limit.

#### Assumption 4 (Bundle-Flatness and Cancellation Selection Principle)

Among the admissible integer locks $(1:m:n)$, the physically selected lock is assumed to be the one whose phase bundle admits the flattest replayable connection while minimizing exposed causal-wake leakage. The cycle-averaged cancellation of a low-order causal-wake multipole or effective potential signal is the effective diagnostic for that deeper bundle condition.

This is a selection principle, not yet a theorem. Its role is to explain why one exact integer lock might be preferred over nearby commensurate alternatives. The primary object is the branch bundle; the cancellation score is accepted only when it is computed from the same holonomy data, middle-caustic impulse record, and finite-$\eta$ return map.
The admissible class must be declared before minimization: positive radii, $1 < m < n$, a fixed finite-$\eta$ branch chart, nonzero branch-transversality floors, and the speed bounds assigned to the exterior/horizon regime.

In this branch, the middle binary is the curvature carrier. Between caustic events the locked triple is modeled as flat phase transport. At the regularized middle caustics, the connection acquires concentrated curvature,

$$
\Omega_{\mathrm{phase}}
=
\sum_j
\mathcal{F}_j\,
\delta_\eta(\theta_M-\theta_{M,j}^{\ast})\,
d\theta_M\wedge d\theta_O
+
\Omega_{\mathrm{reg}}
$$

where $\theta_{M,j}^{\ast}$ are the middle caustic phases and $\mathcal{F}_j$ is proportional to the finite caustic impulse $\Delta\mathbf{V}_{M,j}$ and its wake-history increment on the retained branch. The fulcrum statement is therefore geometric: outer/inner energy routing changes only at the middle-caustic phases where the phase-bundle connection is not flat. This is the same ledger event class used by the [self-hit echo bookkeeping](../dynamics/energy.md#self-hit-echo-and-discrete-steps-working-note).

A minimal test functional can be written before committing to a particular lock. Let $q_I=n$, $q_M=m$, and $q_O=1$, with phase variables $\theta_k(T)=q_k\omega_O T+\phi_k$ and $\omega_O=2\pi f_O$. For a low-order truncation depth $L$, define
$$
S_L(T)
=
\sum_{k\in\{I,M,O\}}\sum_{a=1}^{L}
A_{k,a}(\beta_k,r_k,\eta,D_s,D_T,W^{\mathrm{rec}},J_k^{\mathrm{src}})\,
e^{ia(q_k\omega_O T+\phi_k)}
$$
The coefficients $A_{k,a}$ are not free fit parameters. They must be extracted from the same finite-$\eta$ receiver-normal branch-strength, branch-transversality, and causal-wake ledger used to test the candidate lock.
They therefore belong to the dynamics of the causal-wake branch chart, even when the resulting signal is later summarized as an effective potential.
For the caustic-grazing middle carrier this extraction is not an ordinary smooth Fourier coefficient. A middle harmonic must carry the caustic transversality weight of the window while keeping receiver-normal force/action strength on the same retained record, schematically

$$
A_{M,a}
=
\int_0^{2\pi}
\frac{
w_{M,a}^{\mathrm{rec}}(\theta_M)
}{
|J_M^{\mathrm{src}}(\theta_M)|+\eta_J
}
e^{-ia\theta_M}\,d\theta_M
$$

with $\eta_J$ the declared Jacobian-floor regularization and $w_{M,a}^{\mathrm{rec}}$ the branch-derived numerator computed from the same retained $D_s$, $D_T$, and $W^{\mathrm{rec}}$ row for that harmonic channel. The $J_M^{\mathrm{src}}$ factor is a caustic-window transversality weight, not a substitute for receiver-normal branch strength. As $\eta_J$ is lowered, the coefficient is dominated by neighborhoods of the caustic phases $\theta_{M,j}^{\ast}$, while the integrated impulse remains finite under the simple-caustic rule in [Master Equation](../dynamics/master-equation.md#caustic-transit-and-finite-impulse). Thus the selection question is not whether three generic Fourier amplitudes cancel, but whether the finite middle-caustic impulse deposits the right spectral weight into the first common resonance block.
The cycle-averaged cancellation score over one outer-period window starting at $T_\ast$ is
$$
C_L(m,n;\phi)
=
\frac{1}{P_O}\int_{T_\ast}^{T_\ast+P_O} |S_L(T')|^2\,dT'
=
\sum_{\nu}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
The doubling-frequency claim becomes a theorem target only if $(m,n)=(2,4)$ minimizes this score under the admissible branch equations and retains a positive stability gap.

**Harmonic-overlap lemma.** The score decomposes into resonance blocks labeled by $\nu$. A phase choice can affect cancellation between two layers only when their finite harmonic supports overlap:
$$
\nu\in q_k\{1,\ldots,L\}\cap q_h\{1,\ldots,L\}
$$
If a block has no overlap, its contribution to $C_L$ is phase-independent and cannot select an integer lock. For the doubling-frequency candidate $(m,n)=(2,4)$, the first Outer/Middle overlap is $\nu=2$ via $(O,a=2)$ and $(M,a=1)$; the first all-layer overlap is
$$
\nu=4
$$
via $(O,a=4)$, $(M,a=2)$, and $(I,a=1)$. Thus this functional can select $1:2:4$ only if $L\ge4$ and the $\nu=4$ block has nontrivial branch-derived amplitudes. A complete cancellation of that all-layer block additionally requires the amplitude magnitudes to satisfy the polygon condition
$$
\max(|A_{O,4}|,|A_{M,2}|,|A_{I,1}|)
\le
\text{sum of the other two}
$$
The lemma is only a harmonic support statement. It shows where cancellation is possible; it does not show that the branch-derived amplitudes or the return-map stability actually select the doubling-frequency lock.
The selection therefore has two independent requirements. The topological requirement is that the all-layer resonance block is nonempty; for the doubling-frequency candidate this is the $\nu=4$ block. The dynamical requirement is that the branch-derived complex amplitudes in that block can close a polygon after the caustic-weighted middle contribution is included. The first requirement belongs to the covering structure; the second belongs to the finite-$\eta$ delayed dynamics and cannot be inferred from topology alone.

Topologically, the same $\nu=4$ statement says the doubling-frequency lock is the first common cover of the three phase circles. The covering maps can be written

$$
S^1_O
\xleftarrow{\ \times m\ }
S^1_M
\xleftarrow{\ \times n/m\ }
S^1_I
$$

when $m$ divides $n$. The doubling-frequency case $m=2,\ n=4$ is the minimal nontrivial self-similar cover because each layer double-covers the one above it. More generally, self-similar covers obey $n=m^2$; after $1{:}2{:}4$, the next such comparison family is $1{:}3{:}9$, not $1{:}2{:}3$ or $1{:}3{:}6$. This does not prove the doubling-frequency branch wins dynamically, but it explains why $1{:}2{:}4$ is the first topologically clean candidate before the amplitude calculation begins.
Equivalently, the resonance blocks are the isotypic components of the integer action generated by the lock, and $\nu=\operatorname{lcm}(1,2,4)=4$ is the first common period of all three circles. The doubling-frequency tower is the unique minimal repeated cover
$$
S^1\xleftarrow{\times 2}S^1\xleftarrow{\times 2}S^1
$$
among non-identity integer towers. This is why the doubling-frequency family is also the natural candidate for a renormalization-style fixed point in the truncation analysis: repeated double covering is the simplest scale-similar phase organization.

#### Non-Assumptions

The `NSH-421` analysis does **not** assume:

- common-speed closure $v_O=v_M=v_I$,
- self-similar radii $r_M=r_O/s$, $r_I=r_O/s^2$,
- or the specific frequency lock $1:2:4$ at the outset.

Those are possible special cases or later outcomes, not starting axioms here.
Only exact integer closure is studied here. Rational or self-similar locks can be compared only after clearing denominators or constructing a separate branch map.

### Immediate Consequences

This section is pure algebra from the exact identity and the first two assumptions. It does not use the cancellation principle.

From Assumptions 1-2 and the exact identity, the middle carrier radius is fixed by the outer frequency:
$$
r_M=\frac{c_f}{2\pi f_M}
=
\frac{c_f}{2\pi m f_O}
$$

For the outer ring,
$$
r_O=\frac{v_O}{2\pi f_O}
=
\frac{\beta_O c_f}{2\pi f_O}
$$
Hence
$$
\frac{r_M}{r_O}
=
\frac{1}{m\beta_O},
\qquad
r_M=\frac{r_O}{m\beta_O}
$$

For the inner ring,
$$
r_I=\frac{v_I}{2\pi f_I}
=
\frac{\beta_I c_f}{2\pi n f_O}
$$
so
$$
\frac{r_I}{r_O}
=
\frac{\beta_I}{n\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

These are the core radius relations of the chapter:
$$
r_M=\frac{r_O}{m\beta_O},
\qquad
r_I=\frac{\beta_I}{n\beta_O}\,r_O
$$

They show that once the canonical integer lock $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, is fixed, the remaining geometry depends on the outer and inner speed factors $\beta_O$ and $\beta_I$. Thus a frequency hierarchy is not yet a radius hierarchy.

### Proposition 1 (Exterior Integer Lock Formulas)

Under Assumptions 1-2,
$$
f_I:f_M:f_O = n:m:1
$$
equivalently, $f_O:f_M:f_I = 1:m:n$ in outer-normalized order, and
$$
r_O:r_M:r_I
=
1:\frac{1}{m\beta_O}:\frac{\beta_I}{n\beta_O}
$$

**Proof.** The frequency ratio is exactly Assumption 2. The radius ratios follow from
$$
r_k=\frac{\beta_k c_f}{2\pi f_k}
$$
together with the carrier value $\beta_M=1$, $f_M=m f_O$, and $f_I=n f_O$. $\square$

The geometry is controlled by integer phase closure plus the middle caustic-grazing carrier condition. The proposition makes no claim about which integer pair is dynamically preferred.

### Could $1{:}2{:}4$ Be a Solution?

If one later chooses the doubling-frequency integers
$$
m=2,
\qquad
n=4
$$
then
$$
f_I:f_M:f_O = 4:2:1
$$
equivalently, $f_O:f_M:f_I = 1:2:4$ in outer-normalized order,
but the radius ratios become
$$
r_O:r_M:r_I
=
1:\frac{1}{2\beta_O}:\frac{\beta_I}{4\beta_O}
$$

So the doubling-frequency lock is a viable candidate pattern, but it does **not** by itself imply equal-speed geometry, and it does **not** by itself imply a self-similar radius law unless further assumptions are added.

### What Exact Periodicity Gives, and What It Does Not

Exact periodicity naturally supports rational or integer commensurability, but it does not by itself choose the integers $m,n$.

What exact lock gives:

- inner, middle, and outer frequencies lie on a commensurate lattice,
- the three-ring configuration repeats after one outer period,
- fixed relative phases become meaningful dynamical observables,
- the covering data $(m,n)$ become phase-bundle winding data for the retained branch chart.

What exact lock does not give by itself:

- that the preferred lock is doubling-frequency,
- that the branch speeds are equal,
- that the radii are self-similar,
- or that cancellation is actually maximal for one specific integer pair $(m,n)$.

The bundle-flatness and cancellation principle is the extra ingredient intended to select among the many admissible integer locks.

### Interpreting the Cancellation Principle

The motivation for Assumption 4 is that a cycle-closing integer lock can support persistent superposition over repeated outer periods only when the relative phase connection stays flat enough to replay. If the phase organization is favorable, the low-order causal-wake multipole or effective potential contribution can cancel more effectively over one full return cycle.

At the substrate level, the relevant quantity is exposed causal-wake leakage. At the effective level, the same organization may be reported as reduced low-order potential signal. At the inference level, the reduced model is allowed to select a lock only if the cancellation gap survives the declared truncation and stability tests.

In that sense, the selection principle is closer to a flat-bundle replay test than to a bare numerology of integer ratios. The intuition is that a physically preferred lock should minimize exposed wake leakage, phase-slip variance, and residual phase curvature subject to the delayed dynamics. If the bundle-flatness diagnostic and the cancellation score disagree, the cancellation score is only an effective summary and cannot by itself overrule a holonomy or return-map failure.

This does not yet prove which pair $(m,n)$ wins. It states the criterion that the reduced model should test.

### RG-Style Truncation Test

The cancellation functional uses a finite harmonic depth
$$
L
$$
That truncation must be certified rather than assumed. The useful analogy from renormalization-group reasoning is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ inherits a field-theory RG flow, but that discarded modes must be shown irrelevant for the decision being made.

The branch geometry predicts which modes are most dangerous. Smooth flat-connection layers should have rapidly decaying coefficients,

$$
|A_{O,a}|,\ |A_{I,a}|
\le
C e^{-c a}
$$

on an analytic replayable chart. The middle caustic layer instead has an algebraic pre-cutoff tail because its impulse is phase-localized:

$$
|A_{M,a}|
\lesssim
C_{\eta}\,a^{-p_{\mathrm{fold}}}
$$

with $p_{\mathrm{fold}}$ fixed by the caustic normal form and the regulator. Here $S_L$ is the impulse-accumulated velocity-row signal obtained after integrating the regularized middle-caustic impulse through the retained branch record; it is not the unintegrated force or potential row. In a local fold coordinate $x=\theta_M-\theta_{M,j}^{\ast}$, a generic Whitney $A_2$ fold gives a velocity-row cusp $B_0+B_1|x|^{1/2}+O(x)$, whose Fourier coefficients scale as $a^{-3/2}$. The corresponding unintegrated force-row singularity would scale as $|x|^{-1/2}$ and would not supply the $L_{\mathrm{eff}}^{-2}$ tail budget used below. Thus the velocity-row normal form gives the pre-cutoff exponent
$$
p_{\mathrm{fold}}=\frac{3}{2}.
$$
A cusp or higher catastrophe would change this exponent and therefore change the truncation budget. The finite-depth proof must therefore report the middle-caustic spectral exponent or cutoff, not only assert that high harmonics are small. In the RG analogy, the flat outer and inner harmonics are irrelevant tails, while the middle caustic block is the marginal channel that can still affect selection beyond the first all-layer block.

For a candidate lock $(m,n)$, define the tail score
$$
T_L(m,n)
\equiv
\sum_{\nu>L_{\mathrm{eff}}}
\left|
\sum_{(k,a):\,a q_k=\nu}
A_{k,a}e^{ia\phi_k}
\right|^2
$$
where
$$
L_{\mathrm{eff}}
$$
is the largest resonance block retained in the selection audit. The finite-depth proof must supply a bound
$$
T_L(m,n)\le \varepsilon_L
$$
uniformly over the admissible branch chart and then compare the winner gap
$$
\Delta C_L
\equiv
\min_{(m,n)\ne(m_\ast,n_\ast)}
\big(C_L(m,n)-C_L(m_\ast,n_\ast)\big)
$$
against the truncation error. A lock is selected by the finite calculation only if
$$
\Delta C_L>2\varepsilon_L
$$
For the generic $A_2$ fold exponent, the middle tail dominates the smooth outer and inner tails:
$$
|A_{M,a}|^2=O(a^{-3}),
\qquad
\varepsilon_L=O(L_{\mathrm{eff}}^{-2}).
$$
Thus a practical finite-depth certificate must choose $L_{\mathrm{eff}}$ large enough that the bound implied by $L_{\mathrm{eff}}^{-2}$ is less than $\frac12\Delta C_L$ on the same branch chart. This is a stopping rule for the selection calculation, not a new assumption about which lock wins.

This turns "higher harmonics are small" into a checkable theorem target tied to the same branch-derived amplitudes used in
$$
C_L
$$

### Reduced-Theorem Target

The right theorem target is not "prove $1:2:4$ from kinematics alone." The stronger target is a proof route that keeps kinematics, branch dynamics, phase-bundle topology, effective cancellation, and inference separate:

1. classify the admissible canonical integer locks $(n:m:1)$, equivalently outer-normalized $(1:m:n)$, under exact delayed phase closure,
2. compute the corresponding radius relations under $\beta_M=1$,
3. require nondegenerate orbital-plane data $D_{\mathrm{plane}}\neq0$ so the retained phase bundle is genuinely three-dimensional,
4. define the phase-bundle curvature and caustic-weighted cancellation functional for the low-order causal-wake multipole or effective potential,
5. determine which integer lock minimizes residual curvature and exposed leakage in the exterior/horizon regime,
6. and verify the selected lock by a finite-$\eta$ return map with a positive Floquet gap on the complement of the flat moduli.

Equivalently, for each candidate $(m,n)$ one should construct a return map
$$
P_{\eta,m,n}:\mathcal{S}_{m,n}\to\mathcal{S}_{m,n}
$$
on the retained branch chart and require
$$
\Delta_{m,n}
=
1-\max_{i\notin G}|\mu_i(P_{\eta,m,n})|
>0
$$
off the neutral symmetry directions $G$.

Here $\mathcal{S}_{m,n}$ is a finite-$\eta$ reduced phase-amplitude branch chart: it retains the layer phases, relative phase offsets, orbital-plane normals, radii, speeds, active branch data, branch-transversality floors, caustic-impulse rows, and history variables needed to evaluate one outer-period return. The neutral directions $G$ are not an arbitrary hand list. They are the tangent directions that preserve the same flat connection and branch identity:

$$
G
=
T_{\mathrm{global}}
\oplus
\mathfrak{so}(3)_{\mathrm{rot}}
\oplus
T_{\mathrm{flat}}
\oplus
G_{\mathrm{rel}}
$$

where $T_{\mathrm{global}}$ is the global time or phase shift, $\mathfrak{so}(3)_{\mathrm{rot}}$ is the rigid spatial-rotation tangent space, $T_{\mathrm{flat}}=\operatorname{span}\{(\delta\phi_{MO},\delta\phi_{IO})\}$ is the flat-connection moduli space, and $G_{\mathrm{rel}}$ contains any declared relabeling symmetry of the retained branch chart. A lock is dynamically stable only if the return map contracts on the complement of $G$ and the flat-modulus directions remain genuinely neutral. If a flat-modulus direction becomes unstable, the frequency commensurability may remain while Assumption 3 fails through relative-phase drift.
The quotient rule is strict. A direction in $T_{\mathrm{flat}}$ is treated as a symmetry only when the holonomy-defect coordinate
$$
\Theta(T)
=
\left(
\phi_{MO}(T)-\phi_{MO}^\ast,\,
\phi_{IO}(T)-\phi_{IO}^\ast
\right)
$$
has zero Floquet exponent on the retained return map. If $\Theta$ has a positive exponent, the same direction is a lock-breaking instability, not a quotient direction. This is the retained-branch version of the embedded-binary warning in [Binary Dynamics](../dynamics/binary-dynamics.md): a reduced subsystem's apparent neutral direction cannot be removed unless it is neutral for the full retained branch chart.

If the minimizer turns out to be the outer-normalized lock $1{:}2{:}4$, equivalently $(m,n)=(2,4)$, then the doubling-frequency hierarchy would be a derived selection result rather than a starting assumption.

In the invariant language of [Noether Braid Topological Charge](noether-braid-topological-charge.md), the reduced theorem target is to find an admissible topological sector

$$
[\mathfrak B]_{\mathrm{freq}}
=
\left(
N_s,\,
M_p,\,
c_1
\right)
=
\left(
N_s,\,
M_p,\,
(m,n)
\right)
$$

with flat phase connection, positive Floquet gap off $G$, and $|D_{\mathrm{plane}}|$ bounded away from zero outside the horizon-alignment locus. The doubling-frequency conjecture is the sharper claim that $(N_s,M_p,(2,4))$ is the minimal-curvature such class in the exterior/horizon-transition regime.

#### Recurrence Diagnostic

The finite-$\eta$ return-map test should also reject transient near-locks. For a sampled returned-branch trajectory, let $\boldsymbol{\psi}_i=(\theta_{O,i},\phi_{MO,i},\phi_{IO,i})$ be the returned phase row, $\mathbf{r}^{\mathrm{lay}}_i=(r_{O,i},r_{M,i},r_{I,i})$ the layer-radius row, $\boldsymbol{\beta}_i=(\beta_{O,i},\beta_{M,i},\beta_{I,i})$ the speed-factor row, and $\mathcal{R}^{\mathrm{rec}}_i$ the returned branch record containing active-root ledger data, middle-caustic impulse rows, and retained causal-wake history variables. The sampled state is
$$
z_i=(\boldsymbol{\psi}_i,\mathbf{r}^{\mathrm{lay}}_i,\boldsymbol{\beta}_i,\mathcal{R}^{\mathrm{rec}}_i,\hat{\mathbf{n}}_{O,i},\hat{\mathbf{n}}_{M,i},\hat{\mathbf{n}}_{I,i})\in\mathcal{S}_{m,n}.
$$
Define a recurrence matrix
$$
Q^{(\epsilon)}_{ij}
=
\mathbf{1}
\left[
d_{\mathcal{S}}(z_i,z_j)<\epsilon
\ \wedge\
\|\Theta_i-\Theta_j\|<\epsilon_{\Theta}
\ \wedge\
|D_{\mathrm{plane},i}-D_{\mathrm{plane},j}|<\epsilon_D
\right]
$$
where $d_{\mathcal{S}}$ is the declared branch-chart distance after quotienting the neutral symmetries in $G$, while the holonomy-defect coordinate is not quotiented:

$$
\Theta(T)
=
\left(
\phi_{MO}(T)-\phi_{MO}^\ast,\,
\phi_{IO}(T)-\phi_{IO}^\ast
\right)
$$

A candidate $1{:}2$ row, or a chained $1{:}2{:}4$ row, is recurrence-positive only if returned-section hits recur at the declared outer-period multiples, the recurrence period agrees with the winding and active-branch ledger, the relative-phase defect $\Theta$ recurs to zero, the plane determinant stays in the nondegenerate domain, the recurrence structure persists under timestep, history-resolution, and $\eta$ refinement, and nearby trials that fail the non-symmetry Floquet gap do not pass this recurrence check. This separates point recurrence from true phase-lock recurrence.

### Ancillary Symmetry Check

The older $\mathbb{Z}_3$ dipole-cancellation identity belongs to a different assembly sector. It can still be kept as a planar symmetry test:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0
$$

This is an in-plane cancellation for three equal phases separated by $120^\circ$. It is therefore naturally associated with coplanar, boson-like stealth arrangements rather than with the near-orthogonal rank-three bundle studied in this chapter. In compact form:

$$
\mathbb{Z}_3\ \text{stealth}
\longleftrightarrow
\text{coplanar cyclic sector}
$$

whereas

$$
1{:}2{:}4\ \text{doubling-frequency cover}
\longleftrightarrow
\text{near-orthogonal }T^3\text{ sector}
$$

The two mechanisms can both reduce exposed causal-wake leakage, but they do it through different topology. Planar cyclic symmetry cancels inside one plane; the doubling-frequency Noether braid lock distributes the phase-bundle covering across three independent orbital planes. The $\mathbb{Z}_3$ identity should therefore not be used as evidence for or against the frequency-selection assumptions above.
The separating wall is the plane-degeneracy condition
$$
D_{\mathrm{plane}}=0.
$$
On one side, the near-orthogonal sector carries three independent phase circles and covering data. On the wall, the phase chart collapses into a coplanar cyclic configuration where cancellation is representation-theoretic inside one plane. Crossing this wall is therefore a change in cancellation topology, not a smooth deformation inside one sector. The reachable theorem target is that the doubling-frequency sector and the coplanar $\mathbb{Z}_3$ sector cannot be connected by a path that preserves both $|D_{\mathrm{plane}}|\ge\delta_{\mathrm{plane}}>0$ and a positive non-symmetry Floquet gap.

For neighboring closure problems, see [Planar Bridge Closure](../proof-programs/planar-bridge-closure.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
