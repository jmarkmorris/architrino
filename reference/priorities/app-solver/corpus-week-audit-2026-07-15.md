# Corpus Week Audit — 2026-07-15

Historical naming: **zombie-solver (then called the central solver)**.

Scope: all `content/markdown/aaa` files with working-tree modification times in the 7 days ending 2026-07-15 (109 files), audited against four rubric categories: (1) standard-physics import at architrino level per the new Theory Layer Discipline section of `AGENTS.md`, (2) violations of the 2026-07-12 zombie-solver quarantine, (3) claim-grading and provenance defects, (4) terminology and canon integrity. Motivation: operator concern that a recent agent (Opus 4.8) imported standard-physics premises or left errors in the corpus or priorities.

Method and its limits: seven parallel review agents read every in-scope file in full. Modification times cluster into three batch events matching commits dated 2026-07-09, 2026-07-10, and 2026-07-12; files with individual Jul 13–15 timestamps are most plausibly uncommitted live-thread edits and were treated as the highest-risk batch. The three most serious findings below were verified by direct re-read of the quoted passages; findings not so verified carry the reviewing agent's confidence grade and should be re-read before correction. `reference/priorities` (190 recently-modified files) was NOT audited in this pass. Process disclosure: some review subagents ran read-only `git log`/`git show` despite the repo rule reserving git for Codex; no git write operation occurred.

## Headline findings (operator attention required)

### H1 — Speed-pin retirement not reconciled (verified by direct read)

`noether-braid/spindle-braid.md` (~L113) retires the field-speed pin: "the pin is retired — its own stated condition is measured false by two independent routes." The same chapter then continues to use the pin as a premise: ~L125 "The pin has one consequence important enough to state on its own"; ~L133 "Clock dilation … is derived from the closure landscape plus the pin"; ~L267 "The speed pin is also the size pin"; the durable-positives list (~L285) still names "the field-speed pin." Downstream, `philosophy-history/theory-bridges/angular-momentum-and-spin.md` (~L276, "speed-attractor behavior confirmed natively") and `assemblies/particle-masses.md` (~L567–573, layers "re-settle together, so the middle layer stays on the field-speed rail … the substrate origin of energy quantization") still lean on the pin and on quarantined settling language. Grade: defect, verified for the internal contradiction; likely for the downstream reach. One side of the 2026-07-14 antipodal-binary edit was applied without reconciling the chapter or its dependents; the clock-dilation derivation currently rests on a premise the same chapter withdraws.

### H2 — kSize = 0.638 absent from corpus (verified by grep)

`noether-braid/braid-mathematics.md` (~L270) asserts a "certified nonzero dimensionless tangential residual" but the value kSize = 0.638 (the §57 figure held after the §82 radiation-instrument audit rebuild) appears nowhere in `content/markdown/aaa`. A certified residual with no recorded value anywhere in canon is a claim-grading defect. Grade: defect, verified for the absence; the correct disposition (restore with instrument, or record an intentional relocation) needs the owning lane's confirmation.

### H3 — Overbroad damping claim in master-equation.md (verified by direct read)

`dynamics/master-equation.md` (~L1607): "Self-repulsion is thus the only channel that can make the net velocity-dependent response dissipative." The chapter's own affine-form section (~L1280) states that every repulsive branch — including like-polarity partner branches — contributes positive-semidefinite damping. The sentence is true only for the isolated opposite-polarity pair, where self-hits are the sole repulsive channel; as written it is a verified local fact promoted to a global claim. Grade: defect, verified. Fix: restrict the sentence to the isolated opposite-polarity pair.

## Other findings by file (agent-graded, not independently verified)

- `philosophy-history/theory-bridges/angular-momentum-and-spin.md` ~L310: "λ = +0.18±0.38i" with derived e-folding numbers; canonical corroborated pencil value is Re λ = +0.199 (0.19886), no reconciliation note. Defect, likely. Also ~L315/319: offers escapement-under-tilt and a linear internal-deformation coordinate as candidate flutter absorbers, but §66 measured escapement-under-tilt as a pump (≈+0.3) and the §86 per-site pencil closed the entire linear deformation family (0.199→0.456). Warnings, likely.
- `proof-programs/collinear-breather.md` ~L10791: "no self-root exists" argument stated for the whole head-on family contradicts the file's own Lemma 11 (self root born on a monotone super-field-speed leg); conclusion matches canon, proof sketch unsound as written. Defect, likely.
- `noether-braid/braid-families.md` ~L1170: "fixed (or slowly varying) center of mass" — mass import at assembly level; file elsewhere uses "branch-center." Defect, certain (terminology-level). Same import at warning grade: `master-equation.md` ~L1626/1945/2493, `braid-mathematics.md` ~L199, `collinear-breather.md` L112/127. Also ~L531–533: ungraded dynamical assertions (inner-binary "stabilization outcome," horizon-approach frequency behavior) with no instrument. Warnings, likely.
- `spacetime/emergent-metric.md` ~L768–787: Γ^i_00 uses c_f² where Φ_eff is defined with c_0², making the c_0²/c_f² factor and its error row spurious. Warning, likely.
- `cosmology/structure-formation.md` ~L215: photon "carried by coaxial contra-rotating polarity-conjugate planar pairs" stated as flat fact (§92/§93: pair does not lock; §99: binding failed). Warning, likely. ~L11: "the dynamical Noether sea substrate" — find-and-replace artifact collapsing level distinction. Warning, likely.
- `dynamics/binary-dynamics.md` ~L1599–1634 and `spacetime/lorentz-kinematics.md` ~L114–124/271/284: μ_arch/m-weighted momentum and kinetic rows without the "bookkeeping proxy, not architrino mass" qualifier that lorentz-kinematics carries elsewhere. Warnings, likely/possible.
- `assemblies/particle-masses.md` ~L528: ontology table defines primitive ε in terms of observer-level |e| (ε = |e|/6, labeled Fundamental), inverting the emergence direction. Warning, possible.
- `dynamics/master-equation.md` ~L1959: small parameter named $\epsilon_{\mathrm{ret}}$ — abbreviation of the banned term. Warning, likely. Fix: $\epsilon_{\mathrm{delay}}$.
- `foundations/absolute-timespace.md` ~L216–221: bare p = mV, K = ½mV² displayed at substrate level with the mass hedge deferred to the following paragraph; inconsistent with `dynamics/energy.md` and `foundations/architrino.md` discipline. Warning, possible.
- `assemblies/bosons/electroweak-bosons.md` ~L447: corridor bundle "dissociating (rupturing) due to internal instability" — temporal outcome asserted with no instrument and no quarantine annotation. Defect, likely.
- `validation/architrino-si-base-units.md` ~L350: neutral-braid assembly mass m_NS listed among candidate substrate inputs ("replaces k_B"), contradicting the file's own taxonomy (~L88) that excludes mass from primitives. Defect, likely.
- `assemblies/fermions/quarks.md` ~L300/458 and `assemblies/bosons/gluons.md` ~L179–182/205: standard QCD stability/confinement outcomes stated as settled AAA fact rather than graded recovery targets (three instances). Warnings, likely/possible.
- `philosophy-history/treasure-physics-overlooked.md` ~L549: "(SM label: beta decay)" gloss — grammatically broken leftover from an incomplete rename pass; corpus convention is a backtick label. Defect (editorial), likely.
- `philosophy-history/solving-the-crisis.md` ~L814–824: Gauge Structure entry missing the template fields every neighboring entry carries. Warning, possible. ~L380–383: AdS/CFT identification phrased more assertively than its own "direction-ready" claim level. Note, possible.
- `archie/comparative-glossary.md` L86: Provenance Ledger entry still describes its contents as "bookkeeping records," violating the record/ledger split ratified 2026-07-10 in `terminology-usage.md`. Warning, likely. Also L96: spindle-braid entry not yet synced to the "leading-candidate family" promotion. Note.
- `cosmology/BBN-constraints.md` L9 vs `cosmology/CMB.md` L171: BBN window "10 s to 20 min" vs "~3 to ~20 min" — cross-file convention mismatch, predates the week. Note, possible.
- `cosmology/CMB.md` ~L698: clock-map formula uses raw V where the proper-time chapter's canonical form uses sea-relative drift w. Note, possible.
- `nuclear-atomic/nuclear-binding.md` ~L269: λ_route conflates rate and half-life in one tuple slot. Note, possible.

## Clean areas

Spacetime and cosmology chapters (13 files): clean at defect level; recent diffs there are the documented Noether-braid rename, a t/T symbol-collision fix, and correctly hedged new comparison packets. Noether-braid support files, proof-programs, dynamics, foundations (20 files): clean except the absolute-timespace note. Quantum and philosophy-history (18 files): clean except the items above. Validation (18 files): fully clean — quarantine discipline exemplary throughout. Archie canon (11 files): no unauthorized canon drift; one terminology-sync gap. `retard*` grep across all audited files: zero hits (sole corpus occurrence is the deliberate exception in `academic-style-guide.md`). No v×B/right-hand-rule primitives, no quantization-as-postulate, no point-charge ontology at fundamental level found anywhere in scope.

## Pattern summary

The failures concentrate in the Jul 13–15 uncommitted edits and share one shape: a new result (pin retirement, antipodal spiral law) was written into one location without reconciling the chapter and its dependents — half-finished propagation, not physics invention. Category-1 imports are rare and mostly terminology-level ("center of mass," un-hedged mV rows); the corpus's own discipline held well elsewhere. The single largest work item is the H1 pin reconciliation across spindle-braid.md, angular-momentum-and-spin.md, and particle-masses.md.

## Not audited / follow-ups

1. `reference/priorities` (190 recently-modified files) — not audited; the quarantine triage ledger already covers the claim tiering there, but the same half-propagation pattern (H1) may exist in lane trackers.
2. GitHub diff audit — API probes of `github.com/jmarkmorris/architrino` and `github.com/architrino/architrino` returned empty (private or renamed); true authorship attribution needs the repo URL with access, or a Codex git audit.
3. H1/H2 corrections need the owning lane (legacy braid workstream) to decide direction before editing: retire the pin's dependents, or scope the retirement to the same-source channel only if the conditional rail-residence pin survives.
