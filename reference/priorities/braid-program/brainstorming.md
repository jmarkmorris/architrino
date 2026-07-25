# Braid Program — Brainstorming

Append-only insight capture. Dated entries, newest last. Every entry carries a claim grade; the only grade permitted for content originating in the legacy directories is **idea (unproven lead)** with a source citation. Promotion out of this file goes through a campaign spec or the corpus rules, never directly.

Entry format: `## Entry N — <plain title> (YYYY-MM-DD, <origin: operator discussion | campaign | mining>)`, body states the insight, its grade, what would confirm or kill it, and its relationships.

## Entry 1 — the dual-braid fermion hypothesis: every fermion is a two-braid assembly (2026-07-15, operator discussion, restating a legacy-campaign idea fresh)

**The idea (grade: idea, unproven lead).** All fermions — not only the neutrino — are two-braid assemblies: a braid and a partner braid in a declared conjugacy relation, with accessory architrinos supplying the charged sector where needed. Canon currently splits the architecture (neutrino = polarity-conjugate braid pairing; charged fermion = single braid + axial accessory layer); this hypothesis unifies it: the electron would become a braid pair plus the six-site accessory inventory, and the fermion/boson distinction would live in the pair's lock degree and relative configuration rather than in braid count.

**Why it is attractive.** (1) The Dirac benchmark: the effective theory must recover two spin projections times two polarity-conjugate sectors from one object's records (canon `theory-mapping.md`); a two-braid assembly with a conjugacy relation and a relative-configuration freedom carries a natural two-by-two sector structure, where a single braid must manufacture it. (2) Architectural economy: photon carrier, neutrino, and meson are already two-braid assemblies in canon; universal duality would make the fermion table one family varying in lock degree, accessory occupancy, and conjugacy relation. (3) The orientation-antimatter correspondence hypothesis (canon `terminology-usage.md`) and the pair-production sea-sourcing premise both hand fermions to us in pairs.

**Tensions to respect.** A polarity-conjugate braid pair is net neutral, so charged fermions require the accessory layer to carry the whole charge ledger — that is expressible with the canon capture machinery but is a real structural commitment. And the neutrino's own pairing is referent-pending in canon (the photon lock is unexhibited), so the hypothesis's cleanest instance is itself unproven.

**What would confirm or kill it.** The N-ladder reaches it directly: if single six-architrino braids persist alone (ladder rung 4) with accessory capture producing viable charged states, the single-braid electron survives and universality is unnecessary; if single braids fail to persist but conjugate braid pairs do, duality is strongly favored. The assembly-composition axes of the configuration chart (braid count, conjugacy relation, relative configuration, accessory occupancy) make both architectures expressible in one campaign family, so the comparison is a designed experiment rather than an accident.

**Relationships.** Configuration chart obligation 1a (added same day); canon two-braid precedents (`mesons.md`, `neutrinos.md`, photon-carrier definition); accessory capture (`noether-braid-configuration-space.md`); orientation-antimatter correspondence hypothesis (`terminology-usage.md`).

## Entry 2 — the first non-spindle symmetric-shell chart requires internal deformation (2026-07-21, operator discussion)

**The overlap result (grade: derived geometry).** Let the face-opposite seed use $\mathbf e_x,\mathbf e_y,\mathbf e_z$, common radius $R$, body-diagonal axis $\hat{\mathbf n}=(1,1,1)/\sqrt3$, and fixed-coordinate common-frequency co-rotation

$$
\mathbf X_{\pm,k}(T)
=
\mathbf C(T)
\pm R\operatorname{Rot}(\hat{\mathbf n},\omega T)\mathbf e_k,
\qquad
k\in\{x,y,z\}.
$$

Every pair is exactly antipodal, all six paths share one axis and one frequency, and each path has constant axial height $\pm R/\sqrt3$ and constant transverse radius $R\sqrt{2/3}$. Its spindle cap angle is therefore $\alpha=\arcsin(1/\sqrt3)$. The fixed-coordinate face-opposite co-rotating chart is an equal-radius, equal-cap-angle member of the spindle family; cataloging it as the first non-spindle prescribed geometry would duplicate the family under a support label. Falsifier: one of the prescribed paths lacks a fixed common axis, fixed common frequency, exact antipodality, constant radius, or the stated cap height.

**Candidate non-spindle chart (grade: proposed display ansatz; operator selection required).** Preserve the exact $C_3\times\langle\iota\rangle$ symmetric-shell channel while giving its common shell radius a periodic breathing mode,

$$
\rho(T)=R_*\left[1+\varepsilon\cos(m\omega T+\phi_b)\right],
\qquad
0<\varepsilon<1,
\qquad
m\in\mathbb N,
$$

$$
\mathbf X_{\pm,k}(T)
=
\pm\rho(T)\operatorname{Rot}(\hat{\mathbf n},\omega T)\mathbf e_k.
$$

This keeps all six sites on one instantaneous sphere, preserves exact antipodality and the three-fold phase relation, and occupies the controlled shell band $R_-=R_*(1-\varepsilon)$ through $R_+=R_*(1+\varepsilon)$. For integer $m$, the chart returns after one rotation period. It is outside the spindle family whenever $\dot\rho$ is not identically zero because each worldline changes radius and axial height instead of tracing one fixed circular plane. At zero drift every site has the same exact speed,

$$
\|\dot{\mathbf X}_{\pm,k}\|^2
=
\dot\rho^2
+
\frac{2}{3}\rho^2\omega^2.
$$

The ansatz is consistent with the live relative-periodic-orbit target of radial breathing against rotation. It is prescribed display geometry only; it is not a master-equation solution, retention result, or selected physical mode. Falsifier: the emitted paths violate the common shell band, antipodality, three-fold symmetry, period return, or equal-speed identity.

**Inputs still requiring operator choice.** Motion class (common radial breathing versus another internal deformation), representative radius $R_*$, fractional breathing amplitude $\varepsilon$, breathing/rotation ratio $m$, rotation rate $\omega$, breathing phase $\phi_b$, drift speed, polarity-face assignment, record interval, and display envelope. Once the motion class is selected, the remaining values can be decided one at a time and sealed in a source-defined `prescribed-geometry` chart.

**Promotion target.** The numerical chart belongs in a source specification and Borg record, not in reader-facing corpus prose. Only the derived fixed-coordinate overlap statement or a generally useful symmetry-preserving breathing parameterization should be considered for later corpus promotion after operator review.

## Entry 3 — coordinate-first taxonomy scope and deferred dimensions (2026-07-21, operator discussion)

**Accepted draft policy (grade: operator-approved terminology and scope).** The new braid taxonomy uses three levels: assembly composition, individual braid, and individual binary. Taxonomy members receive neutral group-and-member identifiers such as `A1`, `A2`, and `B1`; these identifiers carry no geometry or mechanism claim. A member is defined by its coordinate-table entries and Borg depiction. In the current taxonomy every binary is neutral, containing one electrino and one positrino. The binary midpoint is derived from its two endpoint positions, and one binary-axis object is sufficient; a redundant axis-line field is not added.

**Axis-structure question (grade: discussion-scoped).** Do not assign a named axis-structure class yet. The current prescribed examples may all require three binary axes, but that observation does not yet define the classification coordinate. Do not add a parallel-but-displaced case at this stage. A rank-two flat geometry is to be treated as an endpoint of a rank-three coordinate family rather than as a separate family. The next discussion must decide which invariant of the three recorded axis vectors defines this dimension and how limiting cases are represented. A candidate mathematical instrument for that discussion is the axis Gram matrix $G_{ab}=\hat{\mathbf n}_a\mathbin{\cdot}\hat{\mathbf n}_b$, but no rank or equivalence rule is accepted yet.

**Deferred motion and geometry breadth (grade: operator-approved scope boundary).** The first taxonomy table records fixed-coordinate prescribed time dependence only as an idealized characteristic. Breathing, precession, and other deformations remain possible later extensions, but they are not table columns now. The reader-facing chapter should state only that many more braid geometries may be investigated; it should not enumerate those possibilities. Support-based names are withheld.

**Promotion routing.** The fixed neutral-binary coordinates and neutral member-ID scheme are promoted now to `content/markdown/aaa/noether-braid/braid-taxonomy.md`. The axis-structure invariant, internal-deformation coordinates, additional braid-level dimensions, and support terminology remain priority-only until their one-at-a-time operator discussions close.

## Entry 4 — Accessory Configuration moment applications require the full six-site record (2026-07-21, taxonomy migration audit)

**The retained idea (grade: idea, unproven lead).** An Accessory Configuration is a set of six architrinos associated with a braid but outside its neutral six-architrino core inventory. Each site's polarity and position must be declared, and the sites may lie inside, across, or outside the braid envelope. The lowest surviving polarity-signed moment of that six-site record may help order exposed mass response, resilience, and near-field coupling.

**Conflict found during migration.** The older application substituted four-site and two-site same-polarity arrangements for the up-type and down-type quark inventories. Current corpus architecture uses six accessory sites, with the charged-fermion record declaring the polarity at every site. The old shortcut therefore cannot be promoted as the current quark model. An octahedral six-position comparison is only one placement hypothesis and does not supply the required polarity, confinement, path-history, or far-field ledger.

**What would confirm or kill it.** Build the actual six-site polarity-weighted moment tensor for each proposed Accessory Configuration, including braid-induced site deformation. The idea survives if the first nonzero moments order independently computed exposed-wake ledgers and mass-response tensors. It fails if the moment order does not track those ledgers or if the required six-site configurations are not retained.

**Promotion routing.** The Accessory Configuration definition and moment ledger are promoted in `braid-mathematics.md`. Particle-specific applications remain priority-only until a six-site component ledger, polarity-weighted moment calculation, and retained far-field comparison exist.

## Entry 5 — persistent binary indices replace radius-ordered roles (2026-07-21, operator discussion)

**Accepted taxonomy rule (grade: operator-approved terminology and coordinate policy).** Family-A binary indices $a\in\{1,2,3\}$ are persistent record identities. They are not assigned by sorting radius, frequency, speed, or any later dynamical role. The A1 coordinates require only $R_a>0$ and permit equal radii; an evolved record may pass through equalities or coordinate crossings without relabeling the binaries. Indexed ratios such as $f_1:f_2:f_3=4:2:1$ describe frequencies only.

**Derived-role rule.** Field-speed occupancy, same-transmitter-root access, curvature concentration, energy-transfer leverage, external exposure, and boundary leadership are branch diagnostics. A comparison chart may declare a candidate carrier index $h$, but must compare admissible choices or derive one from the retained record. The envelope-leading index is direction- and window-dependent and is defined, when unique, by which indexed path attains the full six-path support maximum.

**What would confirm or kill a derived assignment.** A role assignment survives only if the same retained branch record supplies the declared speed statistic, causal-root rows, exposure or support functional, and refinement stability. It fails if the maximizer changes without being recorded, if another index gives the same diagnostic within tolerance, or if the role was inferred only from a frequency or radius label.

**Promotion routing.** The persistent-index rule and branch-derived diagnostics are promoted to the taxonomy, Family A, A1 dynamics, A1.3 lock, envelope, configuration-space, topological-charge, and controlled terminology sources. Downstream reader chapters that still encode fixed inner/middle/outer roles require a separate bounded migration and claim-level review.

## Entry 6 — common-axis braid train (2026-07-22, operator discussion, source drawing dated 2021-01-02; taxonomy disposed 2026-07-23)

**The idea (grade: idea, unproven lead).** A generalized Family-B train contains six ordered architrino worldlines paired into three neutral binaries. A Family-C train contains twelve coaxial architrino worldlines and six neutral binaries without requiring decomposition into two B1 components. Axial spacings are primary coordinates because they change causal delays and wake-arrival phase. The source-inspired Family-C stratum also tests a separately declared six-worldline Accessory Configuration, for eighteen declared architrino worldlines in total.

**Dimension-extension relation (grade: derived coordinate identity).** For binary $a$, any paired axial coordinates decompose as $\xi_{a,\pm}=b_a\pm h_a$. Canonical B1 is the common-midpoint locus $b_1=b_2=b_3$, with the common value absorbed into the braid center. Modulo that common translation, the nearest six-worldline train generalization adds only two relative-midpoint coordinates, such as $(b_2-b_1,b_3-b_1)$, to the existing B1 half-separations. C3 through C6 impose a two-B1 decomposition inside the more general twelve-worldline Family-C chart. Accessory worldlines change the assembly inventory and are not merely extra coordinates of that defining chart.

**Source geometry.** The supplied drawing contains twelve ordered orbit traces with a radius envelope increasing toward the center and decreasing toward the ends. The drawing supports the ordered train and central radius envelope only. Its colors and visible markers do not declare polarity, counterpart pairing, Accessory Configuration placement, phase, circulation, or frequency.

**Exact reduction.** For any defining or accessory architrino path written as

$$
\mathbf Z_a(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+\zeta_a\hat{\mathbf n}
+\boldsymbol\delta_a(T),
$$

the positive delay $u$ from transmitter $a$ to receiver $b$ obeys

$$
\left\|
\left(
\zeta_b-\zeta_a+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\boldsymbol\delta_b(T)
-\boldsymbol\delta_a(T-u)
\right\|
=c_fu.
$$

The equation is exact and generally transcendental. Certified all-retained-root enumeration supplies rotating sectors. Full-period axial, radial, and tangential acceleration residuals are separate required objectives.

**Measured bounded result (grade: historical prescribed-path analytics).** Twelve rows were evaluated: six references and one seeded neighborhood row around each. All twelve were rejected by that fixed protocol. The protocol instantiated $c_f=4$ and stationary exterior probes, so current policy makes it non-current evidence. The rows establish only what those exact records and gates returned; they do not sample enough of the continuous or discrete train space to support a negative Family-B or Family-C inference. A changed binary map with unchanged paths produces identical acceleration rows, so pairing labels alone have no analytical effect.

**Taxonomy disposition (operator decision).** Family C is the general coaxial twelve-architrino family. C1/C2 are the general co-/counter-rotating members; C3/C4 are the coaxial two-B1 loci formerly numbered C1/C2; C5/C6 are the all-equatorial loci formerly numbered C1.1/C2.1. An optional Accessory Configuration does not change the member identifier.

**Claim boundaries.** No measured row supports stability, self-stabilization, retention, binding, photon identity, energy closure, quantization, physical realization, or EOM-solver compatibility. The pilot cannot establish a hinge because it does not contain the full coordinate Jacobian. It reports no action organization and no $h$ or $\hbar$ recovery.

**What would confirm or kill the remaining analytical lead.** Start from the exact B1 submanifold at $c_f=1$, then open the two relative-midpoint dimensions and the existing spacing-radius-phase-frequency coordinates under a predeclared space-filling measure. The lead advances if a finite-width region reduces all three residual projections while passing root, separation, co-translating exterior, sensitivity, refinement, and independent-acceptance gates. Only the explicitly sampled bounded domain closes negative if no such region survives held-out seeds and alternative sampling measures.

**Promotion routing.** The exact chart, taxonomy disposition, measured rows, falsifiers, and implementation links are in [Common-Axis Braid-Train Analytics](common-axis-braid-train-analytics.md). The general Family-C chart and exact-delay reduction are promoted into the reader-facing taxonomy and analysis methodology; the measured candidate result remains priority-only.

## Entry 7 — alternating axial polarity assignment in B1 searches (2026-07-23, chapter review)

**The idea (grade: hypothesis, unproven search stratum).** The current axial no-balance derivation assumes polarity-segregated two-ring geometry. A B1 chart with an alternating axial polarity assignment may change the signs and axial projections of the cross-ring acceleration rows and therefore lies outside that derivation's scope.

**Proof burden and falsifier.** Declare the full six-worldline polarity and counterpart map, enumerate every retained ordered-pair root at $c_f=1$, and derive the complete axial acceleration sum before any stability calculation. The lead fails if the exact axial sum remains one-signed throughout the admissible noncollision chart, or if the assignment violates the neutral-binary contract. A zero of the axial sum would only open a balance candidate; it would not establish retention or stability.

**Promotion routing.** Add this as a matched polarity stratum to the B1-outward search protocol. Promote reader-facing material only if a family-general identity or independently checked candidate branch is obtained.

## Entry 8 — winding-to-self-degree parity law (2026-07-23, chapter review)

**The idea (grade: theorem target).** For a retained layer with winding $k_a\in\{1,m,n\}$, the signed self-root degree $D_s^{(a)}$ may obey a parity or lower-bound law determined by the circular self-hit fold-birth sequence and the lifted-strip fiber-intersection formula.

**Proof burden and falsifier.** Fix the finite-memory strip, same-transmitter policy, orientation convention, and admissible deformation class. Derive the fold sequence independently of the implementation that counts roots, then compare the resulting degree law with separately generated charts. One admissible chart with the same winding but a different signed degree falsifies a winding-only law and forces additional branch data into the statement.

**Promotion routing.** The current topological-charge chapter retains this as a reachable theorem target. Promote a parity formula only after the deformation domain and independent proof close; until then it must not classify assemblies or move any retention claim.

## Entry 9 — causal-delay second moment controls the leading Family-C angular correction (2026-07-24, prescribed-path campaign)

**Candidate derivation (grade: inferred leading-order relation).** Work in normalized units $c_f=1$. For a neutral prescribed source observed on a sphere of radius $R$, let $T_0=T_r-R$ and define

$$
\mathbf U(T_0)
=
\sum_s q_s\mathbf v_s(T_0)
$$

and

$$
\mathbf S(T_0)
=
\operatorname{STF}
\sum_s q_s\,
\operatorname{sym}
\left(
\mathbf x_s(T_0)\otimes\mathbf a_s(T_0)
\right).
$$

The leading causal time is direction dependent:

$$
T_{t,s}
=
T_0+\hat{\mathbf n}\mathbin{\cdot}\mathbf x_s(T_0)+\cdots.
$$

Expanding the transmitter velocity at that time makes the signed radial acceleration pattern contain

$$
a_r(\hat{\mathbf n},T_r)
=
\frac{1}{R^2}
\left[
\hat{\mathbf n}\mathbin{\cdot}\mathbf U(T_0)
+
\hat{\mathbf n}^{\mathsf T}\mathbf S(T_0)\hat{\mathbf n}
\right]
+\cdots.
$$

The first displayed term is degree $\ell=1$. The trace-free part of the second is degree $\ell=2$. Spherical integration therefore gives the leading cycle-mean ratio

$$
\frac{P_{\ell=2}}{P_{\ell=1}}
\approx
\frac{2}{5}
\frac{
\left\langle\|\mathbf S\|_{\mathrm F}^2\right\rangle
}{
\left\langle\|\mathbf U\|^2\right\rangle
}.
$$

Here $P_\ell$ is squared angular-coefficient magnitude, not energy or energy per time. The omitted terms include higher speed order, finite-$R$ spatial corrections, and higher causal-time corrections. This relation is not yet a theorem because no uniform remainder bound has been proved.

**Measured diagnostic.** The active $c_f=1$ compact cohort contains $641$ previously evaluated prescribed draws. At $R=3$, degree $\ell=1$ led in $615$, degree $\ell=2$ in $17$, and degree $\ell=3$ in $9$. A targeted $48\times16\times32$ refinement of all $26$ non-$\ell=1$ cases and all $33$ C4 cases preserved every dominant-degree classification. For C4, the refined degree-$2$ share of direct radial-pattern power had minimum $0.0665$, median $0.2722$, and maximum $0.4379$; $\ell=1$ remained dominant in $31$ of $33$ cases.

Across all $197$ Family-C draws, a log-linear fit of the measured $P_{\ell=2}/P_{\ell=1}$ ratio against $\langle\|\mathbf S\|_{\mathrm F}^2\rangle/\langle\|\mathbf U\|^2\rangle$ had slope $1.0067$, multiplicative factor $0.4413$, log-residual RMS $0.1253$, and Spearman correlation $0.9929$. C4 alone had slope $0.9560$, factor $0.4486$, log-residual RMS $0.1126$, and Spearman correlation $0.9836$. The measured factor is close to the leading angular coefficient $2/5$.

**Interpretation boundary.** The result supports a causal-delay mechanism rather than a quadrature accident: axial extent and rotating signed acceleration create a trace-free second moment, while cancellation can reduce the signed velocity dipole without removing that second moment. The result is same-source prescribed-path inference, not independent evidence. It establishes no EOM-solver persistence, binding, stability, energy, retention, shielding, particle identity, or physical realization.

**Artifacts and falsifier.** Local result hashes are `4c938796df305197c707e633d6d591c3840ef137d037c989f76efefa0c92db65` for the all-active angular scan, `9919c95544c656c71d84857435dc27ec2c9c31ed859e7f872bde8d686e88d3e7` for targeted refinement, and `ab86849171583a424513605d3c93d784c99bce337fb0ecb6d6016692c9f42ffc` for mechanism attribution. Reject the proposed leading explanation if an independently implemented expansion does not recover the $2/5$ coefficient, a radius ladder does not approach that coefficient as the source-to-radius ratio decreases, matched controls varying axial extent do not move the delay moment and $\ell=2/\ell=1$ ratio together, or an EOM-evolved retained branch fails to preserve the relation.

**Promotion routing.** Keep this result priority-only until the expansion has a declared small-parameter domain and remainder bound plus an independent implementation or closed-form check. If those close, the mathematical relation belongs in the exterior-analysis portion of the braid-analysis methodology; evolved-branch consequences remain a separate EOM-solver question.

## Entry 10 — the angular approximation has a controlled but non-certifying bound (2026-07-24)

**Disposition (grade: derived bound plus independent prescribed-path measurement).** The compact-source and first causal-delay approximations now have explicit pointwise and harmonic error bounds, and an independent implementation recovered the primary Family-C $\ell=2/\ell=1$ ratios to maximum relative difference $2.06\times10^{-12}$. The $2/5$ coefficient is exact for the first causal-delay approximation. The active speed range makes the uniform remainder too broad to certify individual current draws, so the relationship remains a strong measured prescribed-path regularity rather than a uniformly error-certified coefficient law. The proof, audit hash, numerical scope, and absent-EOM-branch disposition are recorded in [Causal-Delay Angular Approximation Bound and Independent Audit](evidence/2026-07-24-causal-delay-angular-bound.md).
