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

## Entry 11 — Planck-cadence sampled logarithmic binary spiral (2026-08-13, operator exploration)

**Proposed construction (grade: speculation with derived kinematic test).** Consider a family of externally contained circular binary states indexed by completed revolution $n$. Define $T_*=L_*/c_f$ and normalized frequency $\nu=fT_*$. Introduce the proposed initial radius $r_0=2\pi\ell_P$, initial normalized frequency $\nu_0=\nu_P$, additive rule $\nu_n=\nu_P-n$, phase $\theta_n=2\pi n$, and logarithmic radius samples

$$
r_n=r_0e^{b\theta_n}=2\pi\ell_Pe^{2\pi bn}.
$$

If the sample after $N$ revolutions is required to have radius $r_N=2\pi L_*$, then

$$
b=\frac{\ln(L_*/\ell_P)}{2\pi N}.
$$

The shorthand $b=\ln(1/\ell_P)/(2\pi N)$ is dimensionally lawful only when $1$ denotes a declared reference length $L_*$ and $\ell_P$ denotes its dimensionless ratio $\ell_P/L_*$. If instead the endpoint radius itself is $L_*$, then the numerator is $\ln[L_*/(2\pi\ell_P)]$.

**Kinematic obstruction.** If $f_n$ is the orbital frequency, circular kinematics fixes

$$
\frac{v_n}{c_f}
=
2\pi\frac{r_n}{L_*}\nu_n.
$$

The requirements $r_{n+1}>r_n$ and $v_{n+1}<v_n$ imply

$$
e^{2\pi b}\frac{\nu_n-1}{\nu_n}<1,
\qquad
b<\frac{1}{2\pi}\ln\!\left(\frac{\nu_n}{\nu_n-1}\right).
$$

The tightest row is the initial one. For $\nu_P\gg1$ it requires $b\lesssim1/(2\pi\nu_P)$. Combined with the proposed endpoint relation, this requires approximately

$$
N>\nu_P\ln\!\left(\frac{L_*}{\ell_P}\right),
$$

while positive additive frequency requires $N<\nu_P$. Any expansion by more than a factor $e$ therefore conflicts with monotone speed decrease under the unit-step-per-revolution rule. The obstruction is dimensionless and does not depend on the name of the frequency unit.

The proposed initial pair also differs from the current Planck-alignment convention $R_{\mathrm{align}}=\ell_P/(2\pi)$. If $f_P\ell_P=c$ is used as an observer-level comparison and $f_P$ means cycles per second, $r_0=2\pi\ell_P$ gives $v_0=4\pi^2c$, not $c$. This does not algebraically forbid a contained speculative state, but it prevents identifying it with the current field-speed Planck-alignment row.

**Strongest coherent variant.** Keep the logarithmic radius but make the orbital frequency fall multiplicatively,

$$
\nu(\theta)=\nu_0e^{-pb\theta},
\qquad p>1.
$$

Then

$$
r(\theta)=r_0e^{b\theta},
\qquad
\frac{v(\theta)}{c_f}
=
2\pi\frac{r_0}{L_*}\nu_0e^{-(p-1)b\theta},
$$

so radius increases and tangential speed decreases at every phase. The case $p=1$ gives constant speed. Alternatively, the additive unit-step rule can be retained only if the named frequency is an internal cadence rather than orbital frequency, in which case a separate derived map from that cadence to orbital speed is required.

**Assumptions and proof burden.** The containment acceleration, Planck-scale initial datum, unit frequency update, and constrained-to-unconstrained point correspondence are proposed rules rather than outputs of the master equation. A viable branch must specify whether frequency is orbital or internal, declare the endpoint length $L_*$, reconcile the $2\pi$ convention, define the containment acceleration without assigning primitive mass, and show through retained-history evolution why the constrained circular family corresponds to samples of one unconstrained spiral.

**Promotion target and falsifier.** If a retained-history derivation supplies the cadence law and correspondence, the geometry may support the Planck-scale mapping and A1-dynamics chapters. The additive orbital-frequency version is falsified as stated by the inequality above whenever it demands both a radius expansion exceeding $e$ and monotone speed decrease before frequency reaches zero.

**Next artifact.** Build a one-page symbolic comparison of the additive-frequency and multiplicative-frequency laws, including $r_n$, $\nu_n$, $v_n$, elapsed time, endpoint conditions, and the exact monotonicity inequalities, before any EOM-solver implementation.

**Frequency-indexed stabilization refinement (grade: speculative synthesis).** The more promising interpretation is that stabilization samples the continuous outspiral at phase-closure points and assigns each accepted point an integer mode index. Let

$$
n=\frac{\theta_n}{2\pi}\in\mathbb Z_{\geq0},
\qquad
r_n=2\pi\ell_P
\left(\frac{L_*}{\ell_P}\right)^{n/N}.
$$

A unit-step descending normalized-frequency ladder can then be written

$$
\nu_n=\nu_P-n.
$$

Here $T_*=L_*/c_f$ and $\nu=fT_*$. In the stipulated normalized units $L_*=1$ and $c_f=1$, adjacent frequencies differ by exactly one:

$$
\nu_{n+1}-\nu_n=-1,
\qquad
\frac{r_{n+1}}{r_n}=e^{2\pi b}.
$$

The first relation is an arithmetic frequency ladder. The second is a
geometric radius ladder. Constant frequency difference therefore does not mean
constant radial separation; it means that a unit change in frequency maps to a
constant change in $\ln r$.

Eliminating $n$ gives the radius-frequency correspondence

$$
\nu(r)
=
\nu_P-
\frac{N}{\ln(L_*/\ell_P)}
\ln\!\left(\frac{r}{2\pi\ell_P}\right).
$$

The delayed stabilization mechanism would have to supply a phase condition of the form

$$
2\pi\nu_n\frac{\tau_n}{T_*}+\phi_{\mathrm{geom},n}=2\pi k_n,
\qquad k_n\in\mathbb Z,
$$

with $\tau_n$ and $\phi_{\mathrm{geom},n}$ computed from the retained branch. Approximately constant $\tau_n/T_*$ and a unit change in $k_n$ would recover an approximately equally spaced frequency ladder; different delay scaling could instead produce harmonic or subharmonic ladders. This is the possible bridge to the integer mode numbers in effective physics formulas.

**Refined proof burden and next artifact.** Determine whether a stabilized retained-history outspiral admits isolated phase-lock roots $k_n$ and whether their spacings are constant, harmonic, or neither. The focused investigation now lives in [Integer-Frequency Stabilized Outspiral Investigation](integer-frequency-stabilized-outspiral.md); its next useful artifact is a symbolic phase-lock ledger with columns $(n,k_n,r_n,\tau_n,\nu_n)$, not a numerical EOM-solver run.

**Operator clarification: literal unit-step integer-frequency landing rule (grade: stipulated speculative map).** In the intended toy, one completed revolution lands on the next integer normalized frequency. Write $m_n\in\mathbb Z_{>0}$, so

$$
m_{n+1}=m_n-1,
\qquad
\nu_n=m_n,
\qquad
r_n=2\pi\ell_P
\left(\frac{L_*}{\ell_P}\right)^{n/N}.
$$

Thus revolution count and the unit frequency decrement are the same discrete index: $m_n=m_0-n$. The immediate brainstorming question is whether stabilization can make these integer-frequency points the retained states of the otherwise continuous outspiral. The derivation burden is why the physical stabilizer selects $\nu\in\mathbb Z$ with adjacent spacing one rather than a generic discrete spectrum $\nu=F(m)$.

**Operator clarification: the assembly transition is the quantum (grade: speculative assembly-level definition).** The Master Equation remains continuous for individual architrino histories. Quantization is proposed to enter only after two or more architrinos form isolated retained assembly states $\mathcal H_m$ indexed by integer normalized frequency. The elementary quantum is the complete transition

$$
\mathcal H_m\longrightarrow\mathcal H_{m\pm1},
$$

not the frequency label by itself. If $I[\mathcal H_m]$ is the
action-derived, radian-normalized rotational action of the complete retained
assembly and wake record, the universal-angular-momentum version of the
hypothesis is

$$
I[\mathcal H_{m\pm1}]-I[\mathcal H_m]=\pm I_*.
$$

Observer-level recovery would identify $I_*=\hbar$ and the corresponding
closed-cycle action transaction as $\Delta A_{\mathrm{cycle}}=\pm h$. Neither
identification is assumed at the substrate level. Integer frequency spacing
alone does not prove constant $\Delta I$; both relations must be derived from
the same retained-history family.

**Assumptions and proof burden.** Derive neighboring retained states and both
transition directions from the Master Equation; obtain $I$ from a
symmetry-preserving action; close the assembly, wake, environment, source, and
boundary angular-momentum ledger; and show that $\Delta I$ is independent of
$m$ with no retained fractional endpoint.

**Promotion target and next artifact.** If derived, this supplies the native
bridge from continuous architrino dynamics to the action-quantum and
angular-momentum recovery program. Add $I_m$, $I_{m+1}$, $\Delta I_m$, and the
signed transfer partition to the three-state symbolic ledger before assigning
$I_*=\hbar$.

## Entry 12 — neutral six-point static balance on one sphere (2026-08-13, operator exploration)

**Question and exact reduction (grade: derivation target).** Place three
electrinos and three positrinos at distinct points $\mathbf x_i\in S^2$ and
hold their prior histories stationary. In normalized units $c_f=1$, with no
nontrivial stationary self-hit roots, release from zero velocity has zero
initial partner acceleration at every site exactly when

$$
\sum_{j\ne i}
\sigma_i\sigma_j
\frac{\mathbf x_i-\mathbf x_j}
{\|\mathbf x_i-\mathbf x_j\|^3}
=\mathbf0,
\qquad i=1,\ldots,6.
$$

Plainly: every architrino must receive five partner contributions whose vector
sum is zero. A cancellation obtained only after adding different receivers
together does not keep any one architrino at rest.

Because $\|\mathbf x_i\|=1$, the radial projection supplies this necessary
condition at every site:

$$
\sum_{j\ne i}\frac{\sigma_j}{\|\mathbf x_i-\mathbf x_j\|}=0
$$

Plainly: at each site, the distance-weighted contributions from the two
same-polarity partners and three opposite-polarity partners must cancel even
before the tangential components are checked. Thus cancellation of the total
acceleration or of a distant moment is insufficient; all six receiver-local
vector ledgers must vanish.

**Exact symmetric negatives (grade: derived for the stated charts).** The A2
face-opposite octahedron does not satisfy the condition. At the positive
$x$-axis site its partner acceleration, apart from the common positive
coupling, is the following vector, whose magnitude is $\sqrt{17}/4$:

$$
-\frac14\mathbf e_x
-\frac1{\sqrt2}(\mathbf e_y+\mathbf e_z),
$$

Plainly: the octahedral symmetry keeps the six-body motion in a reduced
symmetry channel, but it does not make the initial acceleration vanish.

The antipodal three-pair family numerically relaxes to the alternating regular
hexagon; that exact hexagon also fails, with inward radial magnitude at every
site

$$
\frac54-\frac1{\sqrt3}\approx0.6726497308
$$

Plainly: the best symmetric planar arrangement still pulls every site inward;
its opposite-polarity contributions are stronger than its same-polarity
contributions.

**Topological-symmetry refinement (grade: exact no-balance derivation on the
declared strata).** Interpret full colored symmetry to mean that all six sites
are equivalent under spatial symmetries that either preserve polarity or
exchange both polarity classes. The natural $C_3$ two-orbit realization places
the electrinos on one equilateral ring at height $h$ and the positrinos on the
mirror ring at height $-h$, with ring radius
$\rho=\sqrt{1-h^2}$. For the staggered triangular-antiprism assignment, a
representative electrino has

$$
\frac{\mathbf A}{\kappa}
=
\left[
\frac{1}{\sqrt3\rho^2}
-\frac{\rho}{(1+3h^2)^{3/2}}
-\frac{\rho}{4}
\right]\hat{\boldsymbol\rho}
-
\left[
\frac{4h}{(1+3h^2)^{3/2}}
+\frac{h}{4}
\right]\hat{\mathbf z}.
$$

Plainly: for every $h>0$, the axial bracket is strictly positive, so the
acceleration has a strictly negative axial component and cannot be zero. At
$h=0$ the family becomes the already rejected alternating regular hexagon;
at $h=1/\sqrt3$ it is the regular face-opposite octahedron.

The aligned triangular-prism assignment fails by the same one-signed argument:

$$
\frac{A_z}{\kappa}
=
-\frac{1}{4h^2}
-\frac{4h}{(3+h^2)^{3/2}}
<0,
\qquad h>0.
$$

Plainly: the directly opposed positrino and the other two positrinos all pull
toward the opposite ring; the same-polarity ring mates have no axial component
available to oppose them. A single alternating six-site ring at any latitude
is only a rescaled copy of the failed regular-hexagon ledger, so changing its
latitude cannot create a zero either.

This closes the natural aligned-ring, staggered-ring, regular-octahedral, and
single-ring transitive symmetry strata. It is not yet a classification theorem
for every finite subgroup action on six colored points, and a merely
topological adjacency symmetry without a metric embedding cannot decide the
inverse-square vector sum.

**Bounded diagnostic and claim boundary.** A 40-start nonlinear least-squares
search over twelve spherical angles found no zero and returned the alternating
regular hexagon as the best row, with full residual norm about $1.64765$.
This search is model-grade evidence about those starts only. It neither proves
that an arbitrary six-point solution is impossible nor establishes stability
or retained-history persistence if a static zero exists. The current strongest
answer is therefore that no exact unit-sphere construction is known here; the
global existence question remains open.

**Proof burden, falsifier, and next artifact.** Eliminate global rotation,
write the nine-dimensional collision-free configuration chart, and certify
either (a) one root of all eighteen acceleration components by an interval
Newton or Krawczyk box with an independently evaluated residual, or (b) a
global lower bound excluding zero after symmetry strata and collision
boundaries are covered. One certified noncollision root falsifies the negative
lead immediately. The next artifact is a finite colored-symmetry-stratum table
that enumerates the transitive subgroup actions, their metric parameters, and
one exact residual or sign certificate per stratum. A compact arbitrary-chart
static-balance certificate follows only for any strata left open; neither
artifact is a retained-branch or stability campaign.

**Promotion target.** If a root or global exclusion theorem is certified, the
result can support the Noether-braid static-seed discussion and the general
Master Equation stationary-cancellation treatment. Until then it remains
priority-only.

## Entry 13 — body-diagonal spin does not support the nonplanar A2 seed (2026-08-15, operator exploration)

**Question and chart (grade: exact kinematics).** Give the face-opposite A2
octahedron common-frequency co-rotation about the unoriented body-diagonal axis
$(-1,-1,-1)\leftrightarrow(1,1,1)$. With
$\hat{\mathbf n}=(1,1,1)/\sqrt3$, every site has fixed-coordinate chart values

$$
h=\frac1{\sqrt3},
\qquad
\rho=\sqrt{\frac23},
\qquad
v_{\mathrm{rim}}=\omega\rho.
$$

Plainly: each polarity class is a rotating equilateral triangle; the two
triangles remain staggered by $60^\circ$ and lie on opposite sides of the
mid-plane in the prescribed chart.

A true rigid rotating-wave solution would require, in the co-rotating frame,

$$
A_{\parallel}=0,
\qquad
A_{\rho}=-\omega^2\rho,
\qquad
A_{\phi}=0.
$$

Plainly: the received partner acceleration must supply exactly the inward
circular-path curvature, with no acceleration along the axis and no change of
angular speed.

**Exact axial obstruction (grade: derivation on the fixed-coordinate
single-frequency chart).** Same-ring partner contributions have zero axial
component, while all three opposite-ring contributions point toward the other
ring. Their axial sum is therefore strictly one-signed for every nonzero ring
height and every sub-field rim speed. Common rotation cannot make
$A_{\parallel}$ vanish. The nonplanar A2 octahedron is consequently not a
rigidly supported rotating wave under the bare partner ledger; the declared
family would have to flatten to the all-equatorial boundary, deform, or acquire
another internal or environmental response.

**Instantaneous spin-up from a stationary history (grade: exact initial-time
identity).** If the positions are held stationary through the history window
and tangential velocities $\mathbf v_i=\omega\hat{\mathbf n}\times\mathbf x_i$
are assigned only at release, the arriving wakes at that instant still give
the static A2 acceleration. Since
$\|\mathbf v_i\|^2=2\omega^2/3$ and
$\mathbf x_i\mathbin{\cdot}\mathbf A_i=-\kappa/4$, the initial common-radius
curvature is

$$
\ddot R(0)
=
\frac{2\omega^2}{3}
-\frac{\kappa}{4}.
$$

Plainly: spin can make the distance from the center initially shrink, remain
flat to second order, or grow. The instantaneous radius threshold is
$\omega^2=3\kappa/8$; if $\kappa=1$, its rim speed is $v_{\mathrm{rim}}=1/2$.
This is not a rotating-branch solution because the axial height still obeys

$$
\ddot h(0)
=
-\frac{1+4\sqrt2}{4\sqrt3}\,\kappa
\approx
-0.960834\,\kappa,
$$

independently of $\omega$.

Plainly: even the radius-tuned kick cannot preserve the octahedron. The two
triangles immediately approach the mid-plane while continuing to rotate, so
the initial motion is a flattening spiral rather than a rigid sphere-bound
orbit.

**Coherent rotating-history boundary.** If the prior history was already
uniformly rotating, delayed roots and transmitter-side acceleration weights
must be recomputed and the static kick formula above no longer applies. The
exact axial sign obstruction still rejects the declared fixed-coordinate
single-frequency two-ring chart. A positive tangential residual that pumps the
spin is conjectured for the fixed-coordinate octahedral/planar family but is
not yet verified; no spin-up, spin-down, collision, rebound, escape, breathing,
or retained-branch outcome follows without direct evolution.

**Proof burden, falsifier, and next artifact.** Build one $c_f=1$ rotating A2
constant-lag ledger and EOM-solver release sweep over sub-field rim speed,
reporting independent axial, radial, and tangential residuals plus the evolved
ring height, transverse radius, angular rate, causal-root census, and retained
history. A certified nonplanar row with all three rotating-wave residuals zero
falsifies the fixed-chart no-balance statement. The next artifact is the
rotating A2 reduced-history evolution record, not a prescribed animation.

**Promotion target.** The exact kick identity and any independently checked
rotating-history result may support the A2 symmetry and return-response
chapter. Until the evolution and ledger close, the physical fate remains
priority-only.

## Entry 14 — fixed-sphere A2 spin becomes an equator-crossing latitude oscillator (2026-08-15, operator exploration)

**Operator stipulation and scope (grade: constrained-chart definition).** The
six architrinos are now required to satisfy $\|\mathbf x_i(T)\|=1$ for all
times. This is not the bare A2 release studied above: an additional normal
constraint acceleration must cancel whatever radial acceleration would leave
the sphere. Assume that this constraint is ideal, preserves the exact
$C_3\times\langle\iota\rangle$ channel, and adds no tangential acceleration.

Plainly: the sphere is now a real part of the model rather than an initial
drawing surface. Its origin and its constraint-acceleration provider must be
carried in any physical interpretation.

Write a representative electrino at latitude $\alpha$ and azimuth $\phi$:

$$
h=\sin\alpha,
\qquad
\rho=\cos\alpha,
\qquad
\mathbf x=\rho\hat{\boldsymbol\rho}+h\hat{\mathbf z}.
$$

Plainly: $h=0$ is the equator, while $|h|=1$ is a pole where the three sites
in one same-polarity ring would coincide.

**Instantaneous constrained tangent law (grade: exact for stationary arriving
histories and the unsoftened signed inverse-square partner row).** Projecting
the symmetric two-ring partner acceleration onto increasing latitude gives

$$
\frac{A_{\alpha}}{\kappa}
=
-h\left[
\frac{1}{\sqrt3\rho^2}
+\frac{3\rho}{(1+3h^2)^{3/2}}
\right].
$$

Plainly: above the equator the partner contribution points south; below the
equator it points north. It vanishes at the equator and diverges away from a
pole as the same-polarity ring separation collapses.

The constrained latitude equation also contains the exact path-curvature term
from azimuthal motion:

$$
\ddot\alpha
=
A_{\alpha}
-h\rho\dot\phi^2.
$$

Plainly: co-rotation strengthens the initial motion toward the equator on both
hemispheres; it does not drive either ring toward its nearer pole.

**Crossing and turning picture (grade: derived for the instantaneous
constraint surrogate; hypothesis for delayed evolution).** At $h=0$ the two
staggered triangles form six distinct alternating sites on one great circle,
so there is no collision and the rings may pass through the equatorial chart,
exchanging hemispheres. In the instantaneous time-symmetric surrogate, a
release with zero latitude speed crosses the equator, slows in the opposite
hemisphere, turns at the mirror latitude, and returns. The sequence is

$$
+\alpha_0
\longrightarrow 0
\longrightarrow -\alpha_0
\longrightarrow 0
\longrightarrow +\alpha_0.
$$

Plainly: the natural motion is a rotating north-south latitude oscillation,
not contraction to a pole followed by re-expansion. Approaching a pole would
instead drive three same-polarity sites toward coincidence and terminate the
ordinary point-kernel chart.

Combining continuous azimuthal rotation with latitude oscillation yields a
spherical-band path. A rational rotation-to-latitude frequency ratio closes
after finitely many oscillations; an irrational ratio does not close and
samples a band. This is kinematic topology only and does not establish a
retained Noether braid, quantized mode, or physical constraint source.

**Delayed-history boundary.** For a coherently rotating and latitude-breathing
history, the arriving roots are not the stationary rows used in the displayed
tangent formula. Delayed tangential acceleration can change both the spin and
the latitude amplitude, so the exact Master EOM may produce growing,
shrinking, biased, or non-closing oscillations. Symmetry preserves the reduced
channel but does not supply time-reversal or amplitude conservation. A claim
that the rings turn exactly at $\pm\alpha_0$ therefore remains surrogate-only.

**Proof burden, falsifier, and next artifact.** Specify the normal
constraint-acceleration row explicitly, verify that it contributes no tangent
component, and evolve the reduced constrained rotating history at $c_f=1$.
Record equator crossings, minimum same-polarity separation, latitude turning
points, azimuthal phase advance, causal-root census, and the constraint ledger.
The next artifact is a constrained-A2 latitude/azimuth reduced-history
protocol. One retained history that reaches a pole without first violating the
declared separation floor falsifies the ordinary-chart boundary; one unbiased
constant-amplitude delayed orbit would advance the oscillator hypothesis.

**Promotion target.** The constrained geometry may support a future
constraint-model or spherical-candidate comparison section only after the
constraint provider is native to the theory or explicitly retained as an
external comparison instrument. It does not modify the bare A2 release result.

## Entry 15 — unrestricted planar neutral six-point static balance (2026-08-15, operator exploration)

**Question and exact chart (grade: derivation target).** Place three electrinos
and three positrinos at six distinct points
$\mathbf x_i\in\mathbb R^2$ at one release time, with stationary arriving
histories and normalized wake speed $c_f=1$. The fact that the coordinates are
planar does not replace the Master Equation partner row with a logarithmic
two-dimensional interaction. For the unsoftened signed inverse-square row, zero
initial partner acceleration requires

$$
\mathbf A_i
=
\kappa\sum_{j\ne i}\sigma_i\sigma_j
\frac{\mathbf x_i-\mathbf x_j}{\|\mathbf x_i-\mathbf x_j\|^3}
=\mathbf0,
\qquad i=1,\ldots,6.
$$

Plainly: this is the same distance law as before, evaluated at points that all
happen to lie in one plane. All twelve scalar acceleration components must
vanish at once; a zero total over all six receivers is automatic and is not the
requested balance.

**Two exact necessary conditions (grade: derived).** Pairing the terms in
$\sum_i\mathbf x_i\mathbin{\cdot}\mathbf A_i$ gives the scale identity

$$
\sum_{i<j}\frac{\sigma_i\sigma_j}
{\|\mathbf x_i-\mathbf x_j\|}=0.
$$

Plainly: the inverse-distance total of the six same-polarity pairs must equal
the inverse-distance total of the nine opposite-polarity pairs. This scalar
condition is necessary but does not enforce the receiver-local vector
cancellations.

Summing the three electrino acceleration rows cancels their internal pair
terms and leaves

$$
\sum_{p\in P}\sum_{n\in N}
\frac{\mathbf x_n-\mathbf x_p}
{\|\mathbf x_n-\mathbf x_p\|^3}=\mathbf0.
$$

Plainly: the convex hull of the three electrino sites must overlap the convex
hull of the three positrino sites. If a line strictly separates the two
triangles, every cross-polarity term has the same signed projection on that
line and their sum cannot vanish.

**Symmetric and unrestricted diagnostics (grade: measured, bounded).** Direct
evaluation rejects the alternating regular hexagon. Searches over two
concentric equilateral triangles, including aligned and staggered phases and
variable radius ratio, found no finite zero; the optimizer reduced its
residual by sending one ring outward rather than locating a balance. A separate
64-start nonlinear least-squares search fixed two electrinos at
$(-1,0)$ and $(1,0)$, varied the other eight coordinates in the box
$[-8,8]^8$, and found no zero. Its best full residual norm was about $0.2983$;
that row was nearly collinear and extended to radius about $6.83$.

Plainly: the obvious symmetric drawings do not work, and the unrestricted
search also did not reveal an asymmetric solution. The smallish residual is
not a near-proof: it is partly obtained by separating sites, which weakens
some contributions without canceling the fixed finite ledger.

**Current claim boundary.** No finite, collision-free planar arrangement is
currently exhibited here, but the bounded searches do not prove that none
exists. The planar global existence question therefore remains open. Even a
certified zero would establish only zero initial partner acceleration for the
declared stationary history; it would not establish stability, binding, or a
retained delayed-history branch.

**Proof burden, falsifier, and next artifact.** Quotient translation, rotation,
and scale, then either certify one noncollision root with an interval Newton or
Krawczyk box and an independently evaluated twelve-component residual, or
cover the compactified shape chart with a positive residual lower bound,
including collision and separation boundaries. One certified finite root
immediately falsifies the negative lead. The next artifact is a planar
static-balance certificate, not a dynamical braid claim.

**Promotion target.** A certified root or global exclusion theorem can support
the general Master Equation stationary-cancellation treatment and the neutral
braid seed discussion. Until then this remains priority-only.
