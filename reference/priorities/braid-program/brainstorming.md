# Braid Program — Brainstorming

Append-only insight capture. Dated entries, newest last. Every entry carries a claim grade; the only grade permitted for content originating in the legacy directories is **idea (unproven lead)** with a source citation. Promotion out of this file goes through a campaign spec or the corpus rules, never directly.

Entry format: `## Entry N — <plain title> (YYYY-MM-DD, <origin: operator discussion | campaign | mining>)`, body states the insight, its grade, what would confirm or kill it, and its relationships.

## Entry 1 — the dual-braid fermion hypothesis: every fermion is a two-braid assembly (2026-07-15, operator discussion, restating a legacy-campaign idea fresh)

**The idea (grade: idea, unproven lead).** All fermions — not only the neutrino — are two-braid assemblies: a braid and a partner braid in a declared conjugacy relation, with accessory architrinos supplying the charged sector where needed. Canon currently splits the architecture (neutrino = polarity-conjugate braid pairing; charged fermion = single braid + axial accessory layer); this hypothesis unifies it: the electron would become a braid pair plus the six-site accessory inventory, and the fermion/boson distinction would live in the pair's lock degree and relative configuration rather than in braid count.

**Why it is attractive.** (1) The Dirac benchmark: the effective theory must recover two spin projections times two polarity-conjugate sectors from one object's records (canon `theory-mapping.md`); a two-braid assembly with a conjugacy relation and a relative-configuration freedom carries a natural two-by-two sector structure, where a single braid must manufacture it. (2) Architectural economy: photon carrier, neutrino, and meson are already two-braid assemblies in canon; universal duality would make the fermion table one family varying in lock degree, accessory occupancy, and conjugacy relation. (3) The orientation-antimatter correspondence hypothesis (canon `terminology-usage.md`) and the pair-production sea-sourcing premise both hand fermions to us in pairs.

**Tensions to respect.** A polarity-conjugate braid pair is net neutral, so charged fermions require the accessory layer to carry the whole charge ledger — that is expressible with the canon capture machinery but is a real structural commitment. And the neutrino's own pairing is referent-pending in canon (the photon lock is unexhibited), so the hypothesis's cleanest instance is itself unproven.

**What would confirm or kill it.** The N-ladder reaches it directly: if single six-architrino braids persist alone (ladder rung 4) with accessory capture producing viable charged states, the single-braid electron survives and universality is unnecessary; if single braids fail to persist but conjugate braid pairs do, duality is strongly favored. The assembly-composition axes of the configuration chart (braid count, conjugacy relation, relative configuration, accessory occupancy) make both architectures expressible in one campaign family, so the comparison is a designed experiment rather than an accident.

**Relationships.** Configuration chart obligation 1a (added same day); canon two-braid precedents (`mesons.md`, `neutrinos.md`, photon-carrier definition); accessory capture (`noether-braid-configuration-space.md`); orientation-antimatter correspondence hypothesis (`terminology-usage.md`).

## Entry 2 — the first non-spindle symmetric-shell chart requires non-rigid motion (2026-07-21, operator discussion)

**The overlap result (grade: derived geometry).** Let the face-opposite seed use $\mathbf e_x,\mathbf e_y,\mathbf e_z$, common radius $R$, body-diagonal axis $\hat{\mathbf n}=(1,1,1)/\sqrt3$, and rigid motion

$$
\mathbf X_{\pm,k}(T)
=
\mathbf C(T)
\pm R\operatorname{Rot}(\hat{\mathbf n},\omega T)\mathbf e_k,
\qquad
k\in\{x,y,z\}.
$$

Every pair is exactly antipodal, all six paths share one axis and one frequency, and each path has constant axial height $\pm R/\sqrt3$ and constant transverse radius $R\sqrt{2/3}$. Its spindle cap angle is therefore $\alpha=\arcsin(1/\sqrt3)$. The purely rigid face-opposite rotating chart is an equal-radius, equal-cap-angle member of the spindle family; cataloging it as the first non-spindle prescribed geometry would duplicate the family under a support label. Falsifier: one of the rigid paths lacks a fixed common axis, fixed common frequency, exact antipodality, constant radius, or the stated cap height.

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

**Inputs still requiring operator choice.** Motion class (common radial breathing versus another non-rigid deformation), representative radius $R_*$, fractional breathing amplitude $\varepsilon$, breathing/rotation ratio $m$, rotation rate $\omega$, breathing phase $\phi_b$, drift speed, polarity-face assignment, record interval, and display envelope. Once the motion class is selected, the remaining values can be decided one at a time and sealed in a source-defined `prescribed-geometry` chart.

**Promotion target.** The numerical chart belongs in a source specification and Borg record, not in reader-facing corpus prose. Only the derived rigid-overlap statement or a generally useful symmetry-preserving breathing parameterization should be considered for later corpus promotion after operator review.

## Entry 3 — coordinate-first taxonomy scope and deferred dimensions (2026-07-21, operator discussion)

**Accepted draft policy (grade: operator-approved terminology and scope).** The new braid taxonomy uses three levels: assembly composition, individual braid, and individual binary. Taxonomy members receive neutral group-and-member identifiers such as `A1`, `A2`, and `B1`; these identifiers carry no geometry or mechanism claim. A member is defined by its coordinate-table entries and Borg depiction. In the current taxonomy every binary is neutral, containing one electrino and one positrino. The binary midpoint is derived from its two endpoint positions, and one binary-axis object is sufficient; a redundant axis-line field is not added.

**Axis-structure question (grade: discussion-scoped).** Do not assign a named axis-structure class yet. The current prescribed examples may all require three binary axes, but that observation does not yet define the classification coordinate. Do not add a parallel-but-displaced case at this stage. A rank-two flat geometry is to be treated as an endpoint of a rank-three coordinate family rather than as a separate family. The next discussion must decide which invariant of the three recorded axis vectors defines this dimension and how limiting cases are represented. A candidate mathematical instrument for that discussion is the axis Gram matrix $G_{ab}=\hat{\mathbf n}_a\mathbin{\cdot}\hat{\mathbf n}_b$, but no rank or equivalence rule is accepted yet.

**Deferred motion and geometry breadth (grade: operator-approved scope boundary).** The first taxonomy table records rigid time dependence only as an idealized characteristic. Breathing, precession, and other deformations remain possible later extensions, but they are not table columns now. The reader-facing chapter should state only that many more braid geometries may be investigated; it should not enumerate those possibilities. Support-based names are withheld.

**Promotion routing.** The fixed neutral-binary coordinates and neutral member-ID scheme are promoted now to `content/markdown/aaa/noether-braid/braid-taxonomy.md`. The axis-structure invariant, non-rigid motion coordinates, additional braid-level dimensions, and support terminology remain priority-only until their one-at-a-time operator discussions close.

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
