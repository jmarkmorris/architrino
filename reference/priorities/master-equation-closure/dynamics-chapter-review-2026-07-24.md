# Dynamics Chapter Review — 2026-07-24

Scope: full review of all six files in `content/markdown/aaa/dynamics/`. I read `causal-action-functional.md`, `energy.md`, `entropy.md`, and `effective-lagrangian.md` in full myself; `master-equation.md` (4,428 lines) and `binary-dynamics.md` (1,666 lines) each received a dedicated full-file review pass with independent rederivation of every checkable formula, and I re-verified the two headline mathematical findings by hand before accepting them. Cross-checked against the foundations and Noether-braid scenes (both freshly reviewed) and against repo policy. Grading as before: **E** = error, **X** = cross-corpus/cross-file, **P** = policy violation, **C** = internal inconsistency, **O** = omission/structure, **G** = claim-grading, **+** = positive, **I** = innovation. Line numbers approximate.

Overall verdict: the dynamics canon's spine is sound — the canonical law, delay-root geometry, fold/caustic machinery, circular and spiral benchmarks, counterterm no-go, and characteristic-tail construction all survive independent rederivation, and the recently narrowed action proposal is correctly reflected with no leftover overclaims. The two genuine math bugs both live in `master-equation.md`'s high-speed circular asymptotics. The systemic debts are: operator "restart/redrive" idiom leaking into reader prose (15 occurrences in master-equation alone), residual force-language (9 occurrences across 4 files), one silent speed identification that collides with the Bell hierarchy option, one banned ordered-label triple, and a master-equation file that is three chapters wearing one filename.

---

## A. Cross-corpus and cross-file findings

**X1 — MAJOR: `energy.md` silently identifies the dressed limit with the primitive speed, colliding with the speed discipline and the Bell hierarchy option.** `energy.md` ~936: "$c_{\text{eff}}$ is the isotropic projection of the local Noether sea response-speed record; in weak-field homogeneous and neutral conditions … $c_{\text{eff}}\to c_f$." Foundations define $c_0\equiv c_{\text{eff}}(\infty)$ (the dressing-flow fixed point, `absolute-time-defense.md`). Chaining the two gives $c_0=c_f$ — exactly the silent identification the five-row speed table forbids, and it flatly contradicts the ontology hub's active Bell route, which **requires** $c_f>c_0$ ("the primitive coordination channel must lie outside the observer photon cone, so $c_f>c_0$"). Either the weak-limit statement must become "$c_{\text{eff}}\to c_\infty$ with $c_\infty=c_0$ by calibration, and the relation of $c_0$ to $c_f$ left as the declared open hierarchy," or the Bell-route hierarchy claim needs revisiting. The same file handles the analogous $c_K$/$c_{\text{eff}}$ identification carefully at ~45–50, so this is a local slip, not a doctrine change — but it is load-bearing: as written, one line in energy.md quietly closes an open question the foundations keep deliberately open. Same phrasing recurs in the mass-shell bullet ("$c_{\text{eff}}\to c_f$ in weak-field neutral limit").

**X2 — Banned ordered labels $\theta^O,\theta^M,\theta^I$.** `effective-lagrangian.md` ~848–854 writes the assembly topological charge as $c_1[\theta^O,\theta^M,\theta^I]$ — Outer/Middle/Inner phase labels. The braid canon repeatedly forbids radius-ordered role names ("the indices are persistent record identities, not a sorting by radius"; "not a high/middle/low radius order"), and the same file's earlier statement (~185) correctly uses a declared ordering $(a,b,c)$ of persistent indices; `noether-braid-topological-charge.md` uses $\theta_1,\theta_2,\theta_3$. Replace O/M/I with the persistent-index notation.

**X3 — The action program has two homes.** The exact-nonlocal-Lagrangian program lives at full length in `master-equation.md` §Exact Nonlocal Lagrangian (~3318–4040) *and* in `effective-lagrangian.md` (~210–560): the same $S_\eta$, the same EL1–EL6, the same kernel variation, residuals, characteristic-tail kernel, and Noether-increment story, at overlapping depth with slightly different vocabulary. This is the largest single duplication in the corpus. Recommend one owner — most naturally, move the master-equation action sections into `effective-lagrangian.md` (or a third "Causal Action" chapter), leaving in master-equation only the falsification decision (3606–3620) and a pointer. This also directly serves the file-split recommendation in §B.

**X4 — Radial-order regression in the energy summary.** `energy.md` ~1011 (Summary): "Generation dependence through how many outer screening layers still surround the deepest core." The body text at ~648 says it correctly: "Generation shifts are hypothesized to reflect loss of declared support rows, **not a fixed outer-to-inner identity**." The summary reintroduces the outer/inner radial picture the braid taxonomy forbids. Rewrite the summary line in support-row language.

**X5 — Entropy's Liouville claim outruns the foundations' caution.** `entropy.md` ~633: "the fine-grained entropy is constant ($dS_{\mathrm{fine}}=0$ by Liouville)" — stated as a standard-physics observation at effective grade. `absolute-time.md` explicitly warns that for delayed dynamics the invariant-measure statement "is an admissibility assumption, not a free infinite-dimensional Liouville theorem," and `effective-lagrangian.md`'s domain gate makes measure preservation a *conditional* residual. Scope the sentence: "constant in regularized charts admitting a quasi-invariant measure (an admissibility condition for the delayed law, not a free theorem)."

**X6 — `energy.md` declares $c_f=1$ and then keeps $c_f$ explicit everywhere.** Line ~9: "We work in units with causal-wake propagation speed $c_f=1$," followed by $D_t=c_f-\mathbf V\cdot\hat{\mathbf r}$, $W^{\mathrm{acc}}=c_f/|D_t|$, etc. throughout. The formulas are right and the policy (retain symbolic $c_f$ in derivations) is being followed — delete or rescope the $c_f=1$ declaration.

**X7 — Narrowed action-proposal status: correctly reflected (positive).** Verified by targeted search: no $A_C$, no "popped-in receiver," no whole-path-variation claim anywhere in `master-equation.md`; promoted content is limited to the derived kernel identity $D_{ij}K_{\mathrm{eff}}^{(\eta)}=-\delta_\eta/r^2$ (verified), the counterterm no-go (verified), and conditional Noether increments; the falsification certificate for the pure scalar $1/r$ action (3606–3620) is model discipline. One residual watch: ~4037 "the remaining **minimal** action repair" — minimality is unproved; say "currently minimal known."

**X8 — Quarantine compliance: clean.** No quarantined pre-2026-07-12 numerals anywhere in the six files; no surviving measured "speed-attractor pin" claim in `binary-dynamics.md` (all pinned-speed language is hypothesis-graded); emergent units $d_0$, $T_0$, $\beta_{\mathrm{MCB}}$ carry zero fitted values. The flagged benchmark constants $a_{\mathrm{rs}}=0.204$, $b_*=7/2$ appear only in master-equation with disclaimers (but see B-E7/B-C9 on their missing provenance).

---

## B. `master-equation.md` (4,428 lines)

### Errors (mathematical; both headline items independently re-verified)

**B-E1 — MAJOR: large-β partner asymptotics drop the transmitter-side weight.** Lines ~2383–2391 assert $a_\theta^{(\mathrm{part})}=(4C/\pi^2)\beta^2+O(C\beta)$, $a_r^{(\mathrm{part})}=-(2C/\pi)\beta+O(C)$. The exact weighted components derived in the same file (~1995–2005) give, at large β (with $\cos\xi=\xi/\beta\to\pi/2\beta$, $1+\beta\sin\xi\to\beta$): $a_\theta=(4C/\pi^2)\beta$ and $a_r=-2C/\pi$ — one power of β lower. The displayed "canonical" values are exactly the **unweighted** legacy ones, and the "older residual constants" quarantine list immediately below contains the *correct* weighted value — the redrive apparently swapped the labels. The nearby self-hit diagnostic sums ($A_r\sim(C/\pi)\log\beta$, signed $-C\beta/12$, absolute $C\beta/6$) do check out.

**B-E2 — Full signed-chart self projections omit $1/|J|$** (~2350–2363): the positive-sine subchart correctly carries the weight (~2311); the "full signed $|\sin\xi|$ chart" states $a_r^{|\sin|}=C\beta/\xi$ etc. with no $|J|$ and no unweighted-diagnostic label. The sign conclusions survive; the magnitudes contradict the canonical law two paragraphs up.

**B-E3/E4 — Force-symbol misuse:** $\mathbf F_{ii}(\text{self-hit})$ set equal to a bare acceleration sum with no $\mu_{\text{arch}}$ (~1500–1508), and $\overline F_{\mathrm{rad}}=\omega^2R$, $\overline F_{\mathrm{tan}}=0$ (~2453–2457) — dimensionally inconsistent with the declared $\mathbf F\equiv\mu_{\text{arch}}\mathbf A$. Rename to $A$-symbols.

**B-E5 — Vacuous clause in Prop 2** (~656): "(or the opposite sign ordering)" is impossible under the just-proved monotonicity and would contradict the stated $D_{ij}=+1$. Delete.

**B-E6 — MCB hypothesis internally unsatisfiable on its own chart** (~1633): "as $D_{t,ii}\to0^+$ with bounded nonzero $D_{r,ii}$" — but the Circular Root-Playback Identity (~1952–1967) proves $D_r=D_t$ on every uniform-circular root, so the hypothesis is only satisfiable off-circular while the MCB operational characterization (~1637, 2432) is circular-ansatz based. Needs a scope sentence.

**B-E7 — Undefined symbols consumed:** $P_1,P_2,P_3,S_1$, the "3+1 chart," $a_{\mathrm{rs}}=0.204$, $b_*=7/2$, $C_{\mathrm{rs}}$ (~2966–2968) — no in-file definition or provenance; `N_3=1\to N_1=2`, `A1.3`, `w_1=2w_3`, `4:2:1` (~807–813) are internal program labels with no in-file referent (they are defined in the braid scene — link them or delete).

**B-E8/E9 — Minor:** "instantaneous causal-delay emission time" (~1855) is self-contradictory phrasing; notation drift $J_{ij}(T_r;S)$ vs the file's $J^t_{ij}$ convention (~257, 2107).

Verified-correct (no action): delta-collapse and transport lemma; fold normal form and $\le4C\sqrt\epsilon$ impulse; interval-speed lemma; Prop 4 starvation chain and $u_{\mathrm{crit}}$; all circular partner/self formulas, tangency thresholds, fold-pair Jacobians; the spiral benchmark decompositions, pitch-flow identities, and log-spiral no-go; two-leg loop $T=T_0/\sqrt{1-\beta^2}$; dimensional analysis; Fokker-kernel algebra, counterterm no-go, characteristic-tail identity.

### Policy violations

- **Force-language at substrate level** (4 hits): "force-balance records" (~3025), "force balance" (~3107), "force-balance" ×2 (~3111); plus the E3/E4 symbol misuse. Compliant declared-bookkeeping uses (75, 996–1000, 1137) are fine.
- **Banned-term residue:** subscript $\epsilon_{\mathrm{ret}}$ (~1890) abbreviates the banned word — rename $\epsilon_{\mathrm{delay}}$.
- **Operator idiom in reader prose** (15 restart/redrive hits): worst block is the retained-spiral ledger (~2950–3068: "restart target," "redriven," "the same retained boxes emit … intervals for $P_1,P_2,P_3,S_1$"); also "solver artifacts should report" (~700), "search artifacts should log" (~759), "the simulation rule is therefore" (~199).
- **Speed conflation:** none — only $c_f$ appears, correctly.

### Internal inconsistencies

- **B-C1:** The sub-field circular Worked Example (~1584–1601) insists the record is "unclosed … no verdict promoted," while ~2050–2058 *is* the completed proof (exact no-constant-speed-circle corollary with full $W^{\mathrm{acc}}$ records). The stub reads as an unrevised quarantine-era placeholder contradicted 450 lines later.
- **B-C2:** Dangling self-correction (~2364): "This corrects the stronger blanket statement that self branches are always positive-tangential" — no such statement exists in the current file (it lives in `binary-dynamics.md`; point there or delete).
- **B-C5/C6:** The work-integral $U$ is correctly demoted to "diagnostic bookkeeping" at ~3300–3306, then $H_{\mathrm{tot}}=K_\mu+U$ is celebrated as a "history-aware conserved quantity/global invariant" at ~4056–4086 — conservation true by construction of $U$. Similarly $P_{\mathrm{tot}}$ is headlined "Conservation law" while the structurally identical $L_{\mathrm{tot}}$ is correctly graded "Conservation target"; symmetrize to the $L$ framing.
- **B-C7:** The proved necessity lemma (super-field-speed interval history necessary for self-hit, ~831) is undersold as a "warning condition" in the summary (~25, 1801).
- **B-C8:** Ungraded expectation "The expected answer … is instability" (~2452) inside an otherwise verdict-free section.
- **B-C9/C10:** Provisional spiral numbers consumed downstream in derived-looking displays (~2972–3053) without per-equation status reminders; `\boxed{}` used for benchmark identities (2609, 2697, 2793, 2800, 2876) diluting box-equals-canonical-commitment semantics.

### Structure

The receiver-velocity-absence rule is restated ≥10 times; self-hit conditions three times; the Worked Examples (~1548–1649) are weaker duplicates of the Analytic Regimes (~1839–2482). Recommended split: (1) Master Equation core (1–1423), (2) self-interaction and analytic benchmarks (1424–3133), (3) energy/symmetry/action (3135–4428, merged with X3), with the branch-chart-standards machinery (317–557) hoisted to a shared closure-standards appendix. Non-breaking hyphens in headings make anchors fragile; the wake-energy heading contains `$T$` (anchor resolves under common slug rules but is fragile — strip math from headings).

### Claim-grading notes

The canonical ME box is never explicitly labeled "postulated substrate law" — it should be. Momentum conservation is overstated (see B-C6). The action-section grading is exemplary (explicit falsifier). No derived/measured/inferred/guessed vocabulary is used anywhere in the file — it substitutes its own ladder (certified/diagnostic/target/benchmark), which is coherent but should be declared once.

---

## C. `binary-dynamics.md` (1,666 lines)

### Errors

**C-E1 — Partner window census wrong on the full ledger.** ~407–409: "partner roots can occur only in positive-cosine windows $W_k=(4\pi k-\pi,4\pi k+\pi)$." The physical chord is $2R|\cos(\varphi/2)|$, so odd-$m$ (negative-cosine) partner sheets exist — and the file itself derives one at ~1018 (same-sheet $m=1$ partner root for $s>\pi$, verified numerically). Physically consequential: the missed $\sigma=-1$ partner sheets carry *negative* tangential sign — extra cancellation generators, first at $s=\pi$. The hedge at ~423–426 flags the sheet-sign gap but never retracts "can occur only." Fix by stating the full-angle condition $\varphi=2s|\cos(\varphi/2)|$ and merging with the signed-sheet equations (~462–467). This also independently secures the floor conjecture's premise (its "no cancellation generator below $s=\pi/2$" argument tacitly leaned on the incomplete census; the first negative partner generator sits at $s=\pi>\pi/2$).

**C-E2/E3 — Canonical-weight omissions.** The partner-root certificate's radial balance (~369–371) and tangential row (~391–397) omit $1/J_p$ with no stripped-surrogate disclaimer (the Kepler limit survives since $J_p\to1$; the finite-β family should read $R/R_*=1/(4\beta^2\cos(\varphi/2)J_p)$). The "Parameter-Free Circular Branch Packet" (~935–960) labels Jacobian-free coefficients "canonical circular acceleration coefficients," eroding the section's own restart notice exactly where $\mathcal G_{\mathrm{rad}},\mathcal G_{\mathrm{tan}}$ consume them.

**C-E4 — Dangling references:** "see **Status** at top" (~187) — no Status section exists; "Contingent on Conjectures A/B" (~220) — defined nowhere in the corpus.

**C-E5–E10 —** Domain mismatch at $\deltã=\pi$ between the no-go theorem's open interval and the principal self angle's closed interval; a "partner-only" sentence whose displayed residual contains a self-hit sum (~398–405); symbol collisions ($D_t^{2\mathrm B}$ signed degree vs canonical $D_t$; $h$ = action unit vs memory horizon vs $h_b^{\mathrm{lock}}$; $T_0$ emergent unit vs initial time; duplicate Definition/Lemma/Theorem numbering across the two formal sections); "stripped" terminology inverted at ~756–760; blow-up criterion 3 imprecise (the singular condition is $\mathbf V_j(T_t)\cdot\hat{\mathbf r}=c_f$ at emission, not full speed toward the receiver); file ends abruptly at a bare `---` (~1666).

Verified-correct: all delay equations, near-hinge asymptotics ($\delta_s\sim\sqrt{24\mu}$, $J_s\sim2\mu$), partner-root certificate existence/uniqueness, Kepler limit, same-sheet no-go term signs, $s=\pi/2$ first-negative-self-sheet threshold (both derivations), self-branch birth conditions and $s_m^*\approx\pi m+\pi/2$, $u_{\mathrm{crit}}$, fold surgery.

### Policy / consistency

Force-language: 3 flagged occurrences plus the §Symmetry/Conservation Definition-level $\mathbf F_{ij}$ usage and a "Center of Mass" heading whose own body pivots to the response center — retitle "Center of Response." No banned words, no speed conflation, no smuggled constants, no un-instrumented measured claims. The σ=−1 correction from master-equation is nowhere contradicted (good), and ~626's sub-$s{=}1$ exclusion is actually *unconditional* (only the principal partner root exists below the first negative sheet at $s=\pi$) — the "same-sheet chart" hedge under-claims a clean result. MCB restart notices present and effective except inside the packet (C-E3). Working-note texture: the Speculative spiral-budget section (~112–140) and the closure-packet/Hessian machinery (~1133–1356) are appendix candidates.

---

## D. `causal-action-functional.md` (253 lines)

Clean — the shortest and most disciplined file in the chapter; the previously flagged $W^{\mathrm{acc}}=1$ error is fixed (~179 now reads $W^{\mathrm{acc}}=c_f/|D_t|=1/|J|$ "and is not generally one"). Remaining items: one "force-balance result" phrase (~152) in substrate context; the branch-count constants ($N_{\mathrm{self}}\le\beta_*/\pi+C_{\mathrm{circ}}$) consistent with the census in master-equation ✓. The retained-record row table and fail-closed negative-control requirement are model discipline worth copying elsewhere.

---

## E. `energy.md` (1,266 lines)

Beyond X1/X4/X6 above:

- **E-G1:** Ungraded descriptive claims in §Noether Sea: "extremely small compared to ordinary particles," "very high internal kinetic and potential energy," and "accepted high-energy branches may retain Planck-scale or higher internal energy" (~640) — hypothesis-level statements in declarative voice; add grade tags.
- **E-C2:** Appendix A ~1040: "(the MCB attractor)" in passing asserts what ~1028 correctly conditions ("when that branch has been certified"); align.
- **E-N3:** Notation drift: receiver index $o'$ and $\sigma_{q_jq_{o'}}$ (~90) vs the canonical $i$/$\sigma_{ij}$; harmless but the only file using it.
- **E-+4:** Protect: the exposed-energy partition with anti-double-count residual $\mathcal R_{\mathrm{part}}$; the shielding-window positivity gate (deep shielding constrained, not free); the $\alpha_{\mathrm m}$ universality residual as a flatness condition over assembly moduli; the center-of-response theorem target with independently pinned moment maps; the adiabatic branch-invariant target turning $h$-like transactions into fold-wall area jumps. These are among the best-constructed targets in the corpus.
- **E-G5:** Appendix A's three-binary bookkeeping table correctly self-labels its roles as hypotheses ✓; keep that sentence when editing.

## F. `entropy.md` (827 lines)

The most polished file in the chapter; the same-record rule, receiver-inference fibers, provenance-graph carrier, and the failure-modes catalog are exemplary. Items: X5 (Liouville scoping); the cosmological entropy scales $10^{89}/10^{104}/10^{123}k_B$ (~619) could carry a one-word "standard-literature estimates" attribution; the $\Lambda_{\mathrm{sea}}$ Clausius-hysteresis prediction (~345–359) is a genuinely novel falsifiable signature and deserves a pointer from the validation scorecard; the wake-concordance parameter $\mathcal K(O_W)$ (~651) is a substantive original contribution to the Boltzmann-brain literature framing and is properly measure-scoped.

## G. `effective-lagrangian.md` (977 lines)

Beyond X2/X3: "restart rule"/"restarts" operator idiom in the opening (~5–7) — rephrase as a validity condition; one "force-balance" occurrence; the delayed-oscillator seed, moment-reading of transport coefficients ($\eta_{\mathrm{cg}}$ as odd-frequency kernel moment), memory symplectic form $\omega_{\mathrm{mem}}$ with the return-flux condition, the flat action bundle/monodromy treatment of Bohr-Sommerfeld, and the polarity-domain-wall $\mathbb Z_2$ holonomy as the spin-½ carrier are all correct and well-graded (I checked the oscillator expansion signs and the Legendre/canonical forms). The $\mathbb Z_2$ envelope section (~882–905) is the sharpest statement of the exchange-sign burden anywhere in the corpus and should be cross-cited from `ontology.md`'s exchange-loop hard wall — currently the two treatments don't reference each other.

---

## H. Consolidated suggestions (capped)

1. **Fix B-E1/B-E2** (redrive large-β asymptotics with $W^{\mathrm{acc}}$; label or weight the signed-chart projections) and **C-E1/E2/E3** (full-ledger census; restore $J_p$; rename packet coefficients "geometric"). These are the only substantive math corrections.
2. **Resolve X1** explicitly: one sentence in energy.md declaring the weak-limit dressed speed's relation to $c_f$ an open hierarchy row, cross-cited to the Bell-route requirement $c_f>c_0$.
3. **Rename $\theta^{O/M/I}$** to persistent indices (X2); sweep symbol collisions (C-E7: $D_t^{2\mathrm B}$, $h$, $T_0$; B: $\epsilon_{\mathrm{ret}}$).
4. **Split master-equation into three chapters** and merge the action program into one home (X3); delete the three stub Worked Examples in favor of the exact sections; hoist closure-standards machinery to an appendix chapter.
5. **Purge operator idiom from reader prose** (restart/redrive/boxes-emit; the retained-spiral ledger block either gets defined symbols and provenance or moves to `reference/priorities/`).
6. **Symmetrize conservation grading** ($P_{\mathrm{tot}}$ to "validation condition"; move the $U$-tautology caveat next to the $H_{\mathrm{tot}}$ celebration); label the canonical ME box "postulated substrate law."
7. **Add the missing falsifiers**: ℤ₂ handedness flip (binary-dynamics), floor conjecture decision procedure, and a chapter-top Status block fixing the dangling "see Status"/"Conjectures A/B" pointers plus a real ending for binary-dynamics.
8. **One "Circular Root Atlas"** section in binary-dynamics replacing the four overlapping root/winding treatments, with the derived speed ladder $s=1,\ \pi/2,\ \pi,\ s_1^*\!\approx\!4.60$ and per-sheet sign table.
9. **Cross-cite** the $\mathbb Z_2$ domain-wall holonomy (effective-lagrangian) ↔ exchange-loop hard wall (ontology), and the $\Lambda_{\mathrm{sea}}$ hysteresis prediction ↔ validation scorecard.
10. **Reserve `\boxed{}` for canonical commitments** and adopt a standard status tag (derived / conditional / target / diagnostic) across the chapter — the file-local grading ladders are coherent but undeclared.

## Mechanical verification

- Link/anchor pass over all dynamics files plus every corpus link into dynamics targets: **0 problems** (the wake-energy heading with embedded `$T$` resolves under common slug rules but is fragile — strip math from headings). All cross-file anchors named in both deep-dive reports were confirmed against targets.
- Policy greps: force-balance/force-language 9 occurrences (4 master-equation, 3 binary-dynamics, 1 causal-action, 1 effective-lagrangian); restart/redrive 20 (15 master-equation); no literal banned terms (one subscript residue $\epsilon_{\mathrm{ret}}$); no speed-symbol conflation except X1; no quarantined numerals.
- Math re-verified by hand beyond the subagent passes: B-E1 (weighted large-β limits $(4C/\pi^2)\beta$, $-2C/\pi$), C-E1 (negative-cosine partner sheet at $s>\pi$), the delayed-oscillator expansion, Legendre/canonical forms, and the energy-file per-hit power decomposition.

Suggested triage: B-E1/B-E2 and C-E1–E3 (math), X1 (speed identification), X2 (banned labels), then the policy sweeps (force-language, restart idiom, $\epsilon_{\mathrm{ret}}$), then the structural program (X3 + split + atlas) as a dedicated campaign, then G/O items as convergence fodder.
