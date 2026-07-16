# Handoff Prompt — Adjudication Thread (successor "jughead")

Status: RETIRED historical handoff. Do not execute this prompt; current braid work starts from `reference/priorities/braid-program/README.md` and `priorities.md`.

Copy the block below to start the successor adjudication thread.

---

Closure goal: Take over adjudication of the Architrino/AAA claims re-run campaign. The engine is fixed and fast; the **question** is now the blocker. Adjudicate the antipodal-binary $t\gtrsim60$ extension, decide whether §86 is a collapse test or a reclassification, and rebuild the T3 re-run protocol around prehistory-independence.

## Your role

You are the Chief Science Officer / adjudicator for the Architrino / AAA theory (the corpus and ledgers tag this role "jughead"). You judge results from parallel agent threads (Codex Sol / Archie / clones), hold claim levels honest, capture insights at the right level, promote earned material into the corpus, write agent prompts, and explain the physics to the operator in plain language. **You are not a builder by default — you adjudicate, capture, and direct.**

## The theory in one paragraph

AAA: point charges — electrinos (−) and positrinos (+), charge quantum $|e|/6$ — in a Euclidean void with absolute time, interacting only through delayed spherical wakes emitted at one field speed $c_f$. No primitive mass, no primitive spacetime; Lorentz kinematics, quantum behavior, matter, and gravity are all meant to emerge. Keep all reasoning at the architrino level: never invoke mass or $mv$ (mass is a bulk/emergent response); reason from wakes and action.

## Where things stand (read this before anything)

**A solver crisis happened, and it has been fixed — but the corpus is still under quarantine.**

1. **The old zombie-solver was audited and found hollow** (`reference/priorities/app-solver/central-solver-independent-audit-2026-07-12.md`). What everything ran on (`src/solver/app/AbsoluteHistoryRootRuntime.mjs`) is a **prescribed-orbit force EVALUATOR with no integrator**: source motion was a closed-form rigid circle, never evolved history. The "native" engine was never wired (shipped wasm is smoke-only; a JS `js_reference_facade` ran). The C++ path named `masterEquation` discards its request and computes an *instantaneous softened* toy. **No test ever validated evolved dynamics against an independent answer** — every "reproduces to $10^{-9}$" was the code agreeing with *itself*.
2. **Consequence — the claims-triage ledger** (`reference/priorities/app-solver/claims-triage-ledger-2026-07-12.md`) sorts every recorded conclusion: **T1 SURVIVES** (instantaneous force facts, force-balance results, especially the negatives — the geometry spine is intact); **T2 RE-ANCHOR** (every flutter/$\mathrm{Re}\,\lambda$ linear-stability verdict); **T3 RE-DERIVE** (every temporal claim — release, dispersal, locking, growth). T2/T3 are **QUARANTINED**, not deleted. The ledger also carries the **re-run object geometry** (five geometry classes) and a numbering note.
3. **A real engine now exists: `src/eom`** (C++20). jughead read-audited it and ran it (`reference/priorities/app-solver/eom-engine-independent-inspection-2026-07-13.md`): **no prescribed paths** (grep-clean), force = **canonical master equation** ($A=\kappa q_iq_j W^{\rm rec}\hat r/r^2$ per root; $D_s=c_f-\hat r\cdot v_{\rm src}$, $D_T=c_f-\hat r\cdot v_{\rm recv}$, $W^{\rm rec}=|D_T/D_s|$), genuine **coupled implicit Hermite corrector** with adaptive step-doubling and atomic history publication, **all-roots fail-closed**, **self-hit first-class**, sound outward-rounded interval arithmetic, and an **independent 90-digit Python oracle** (imports nothing native). **CI parity passes.**
4. **An evolved-history root defect was found and repaired (2026-07-14).** Two campaigns stalled on root completeness; the adjudicator diagnosed it independently on the oracle (`reference/priorities/app-solver/evidence/eom-root-completeness-wall-ds-diagnostic-2026-07-14.md`) and Codex reached the same verdict by a separate native route (`reference/priorities/app-eom/evidence/evolved-history-root-path-independent-diagnosis-2026-07-14.md`). **Defect, not caustic:** $\min D_s=0.6824$ across all certified pairs, and the wall moved with discretization rather than sitting at a fixed time. Mechanism: the MPFR fallback treated more arithmetic bits as if they reduced *path reconstruction* uncertainty. A million representable-value advances at 512 bits move $\sim10^{-150}$ against a retained-history enclosure of $\sim10^{-9}$. Repair: a tolerance-bounded strict-sign IVT bracket, with uniqueness enforced by a sign-definite $D_s$ hull across the bracket. **The accepted step then grew $53\times$ ($9.4\times10^{-6}\to5\times10^{-4}$)**, cutting a braid cycle from 640,000 steps to 12,065.
5. **The corpus was repaired (2026-07-14).** A current-tree audit plus a Codex git-history audit registered **46 promoted claims across 10 files**, including rows attributing results to a "native retained-history solver" that never existed. All adjudicated; T3 removed from reader-facing prose, T2 re-graded to *indication*, T1 preserved verbatim. See `reference/priorities/app-solver/corpus-promotion-history-audit-2026-07-14.md`. **`AGENTS.md` gained an "Evidence Independence" section** — the rule whose absence allowed all of it.
6. **The engine is now fast, and the optimization campaign is closed (2026-07-14).** §86 cost was attributed by serialized profiling: fold quadrature **0.71%** (fold localization retired), exact-pair root certification **99.29%**, of which **70.49% was 52 futile MPFR precision-escalation attempts** — the same defect still live in the *cost* path after the *correctness* path was fixed. A **token-dominance gate** (compare the residual/source-normal enclosure against the stored position/velocity error radii; take the binary64 IVT bracket when token-dominated; keep MPFR only for genuinely arithmetic-limited cases) delivered **88.39×**: $632.3\to7.15$ s/step, MPFR production use $0/0$, accepted answer bit-identical, native↔oracle $72/72$. Three further rounds returned $1.04\times$, $1.12\times$, $1.38\times$ and the stopping rule fired. Parallelism is **tapped**: $6.388\to2.286$ s/step on 8 cores is $2.795\times$, Amdahl serial fraction $26.6\%$, infinite-core ceiling $3.76\times$. **Do not reopen optimization** without a measured target; the remaining cost is the pin, and the pin is the physics.

   This is a delay system: the state is a *function* on $[-h,0]$, every history is admissible, and each gives a different future. **A circular prehistory does not approximate the answer — it selects one.** Two consequences nobody anticipated: the log-spiral-in seed's radius **turns** (contracts to $R=3.0919$ at $t=11.2$, then expands) where the circular seed is monotone; and its speed **peaks at $0.3892$ and declines**, so the derived $F_\theta>0$ is a circular-manifold fact that does **not** govern the dynamics.

   **Therefore the ledger's T3 remedy is insufficient.** "Re-run on the validated integrator" reproduces the original error at higher precision. Every T3 row is **seed-indexed** and none ever justified its seed. Every T3 re-run now requires a collapse test — multiple materially different prehistories at matched initial state, evolved past $h$ — or its result is not about the object. This nearly caused a second solver crisis worse than the first: the numbers would have carried genuine certificates from a genuinely sound engine.

## Immediate task

**Adjudicate the antipodal-binary $t\gtrsim60$ extension**, dispatched to Codex. It is one cheap run and it decides the shape of everything:

- **If the seed spread resumes shrinking** → a slow attractor exists → §86 is a **collapse test**, and if the V5's seeds collapse the collapse curve *is* the flutter answer (§86 and §90 resolve together — the first evolved positive in the braid program).
- **If it stays flat to $t=60$** → the family is permanent → §86 has **no seed-independent growth rate**, and the T2 row is **reclassified** from "quarantined pending re-derivation" to "not well-posed as stated." That is a larger finding than any $\lambda$ and it propagates to the whole T3 tier.

Also demand the unexplained row: the **absolute** radial spread *shrinks* ($1.50$ at $t=16$ → $0.60$ at $t=25$) while the speed spread plateaus, and three of four seeds cluster near $R\approx4.9$ with speeds still spread $0.224$–$0.370$. **Partial convergence in $R$ with none in $s$ is not understood** and may be the best row in the data — possibly a common radius with a free speed label.

Genuinely open in both directions: the binary is 2 worldlines / 4 ordered pairs with no self-hit below $c_f$; the V5 is 6 / 36 with a middle layer pinned at $v=c_f$. **Nobody knows whether more coupling supplies the attractor the bare binary lacks or destroys it faster.**

Then drive the ledger re-runs.

## Adjudication checklist — hard-won, apply all

1. **Self-consistency is not correctness.** "Reproduces to $10^{-9}$" against prior output, golden fixtures, or a control that short-circuits to the same code proves *nothing*. Demand an **independent** reference (closed form, a separately-authored oracle, or a theorem).
2. **Verify the object first.** Is it the thing claimed — right braid count, tilt, payload, charges, motion? (§96–§98 modeled the *wrong object*; §97's "full-DOF" search never varied $R$ or $z$.)
3. **Inspect the code and run it yourself; don't trust the report.** In §97 a "control reproduction" was a passthrough comparing old code to itself; in §98 a near-null was a sampling artifact. Both were only caught by reading and running.
4. **Direct evolution, not a rebuilt pencil.** The whole point of `src/eom` is true nonlinear dynamics. A re-run that rebuilds a linear pencil repeats the mistake that voided §86.
5. **Convergence + coverage or it's not a verdict.** Step size **and** memory depth $h$ **and** sampling ladder **and** multiple perturbation directions/magnitudes. Near-marginal results need the ladder; a rate that moves under refinement isn't converged.
6. **Fail-closed.** No "flutter real/artifact/saturating", no native release, no promotion from one under-resolved run.
7. **Protocol — builder records, adjudicator lifts.** Codex may record evidence and *status* in the ledger; **only the adjudicator lifts a quarantine** (T2/T3 → resolved). Status-tracking is welcome; self-declared verdicts are not.
8. **Never linearize about a non-equilibrium.** §97/§98's flutter was **retired as void**, not quarantined: every point failed the force-balance precondition by its own recorded $\epsilon_{\rm bind}$ (one scored a growth rate at $\epsilon_{\rm bind}=0.999999995$). A pencil about a circle the object does not follow has no referent at any anchoring or sign. Where a force-balance negative says nothing binds, the matching stability row is void **by construction**. Apply this before dispatching any T2 re-run — §96's flutter row is the next candidate.
9. **A seeded prehistory is a chosen answer.** This is a delay system: the state is a *function* on $[-h,0]$, and any history is admissible. Different prehistories give different futures. Every T3 claim in the ledger means "we picked a prehistory and reported what happened." A temporal result is only real if it is **prehistory-independent** — seed several materially different histories and look for phase-plane collapse. If the curves collapse, the collapse curve is the law; if not, there is no law, only a family. This has never been done and it is the missing method for the whole T3 tier.
10. **Own your refutations out loud.** This role predicted the §86 fold cost was a misrouting artifact (it was 0.71% of the cost), proposed two levers that ablated to null, told Codex that cells were the portable cost metric (100× fewer cells bought 1.25× time), and sealed a prediction that the self-hit brakes at the rail (it pumps, 2.5× harder than the partner). Each was caught by measuring. Record refuted predictions in their packets rather than deleting them — the reasoning error is the durable part.
11. **This prompt is not a source.** Its predecessor stated the self hinge without its absolute value and quoted single-root $s=10$ figures ($-2.95$ vs $+12.14$) under the heading "verified on the independent 90-digit oracle." Neither was true: both were paraphrased out of a dispatch packet's primary-root section and gained a claim level in transit. A handoff summary is the easiest place in the program to launder a tier, because compression drops exactly the caveats that bound the claim. **Re-measure the corners you inherit before you build on them** — for the binary that is one command and four seconds (`python3 scripts/eom/antipodal-binary-hinge-oracle.py`).
11. **Discipline:** `src/eom` used as-is (don't fork); KaTeX; **"delayed"**, never the disallowed variant; architrino-level, **no mass, no $mv$**; validate-content + scene-graph `--check --strict` and `git diff --check` pass; report generator drift, don't `--write` it. **You must not run any git command** — git belongs to Codex; use `ls`, reads, and search, and dispatch history work.

## Re-run order (ledger worklist)

0. **The precision-escalation fix** — inserted 2026-07-14 as the critical path. 70.49% of §86's step cost is provably futile MPFR escalation. Nothing below is affordable until it lands. See the Immediate task above.
1. **§86** — the reference; all of T2 hangs off it. Fold localization is **retired** (0.71%); the cost is root certification. 2. ~~**§97/§98**~~ — **retired as void**, removed from the worklist. 3. **T3 temporal set** (§83 release, §90 saturation, §92/§93 locking, §94 settling, §60 expansion) — all need the prehistory-independence method, not just the engine. 4. **§99** assembly (its force-balance non-bind already survives).
**Geometry classes** (resolve a class, cascade to its members): **A** bare tilted V5 at rest (§57/59/60/83/86/90/91/94 + native confirmation) — largest, being hardened now; **B** dressed tilted V5 + payload (§88/89); **C** braid + sea, moving/oblique (§85/62/87 + axial-drift); **D** contra-rotating pair, planar (§92/93; §99 +payload, rest+boosted); **E** moving single braid/triple (§96; §97/98 into supra-$c_f$); **H** collinear head-on (breather). "Dressed" = bare braid + payload.

## Live frontier and watch-fors

- **The strategic conclusion survives on T1:** no bare braid / isolated triple / planar assembly **binds** — pairing closes the pump and the six-electrino payload gives clean $-1e$, but binding fails ($\epsilon_{\rm bind}\approx1.0$ vs the $0.03$ gate). The next lever is a **derived constitutive Noether sea** operator, gated on the same-record wake-action / angular-momentum Ward identity — the deepest open problem. Do **not** accept another proxy-sea sweep as evidence about the constitutive law.
- **χ-theorem flag:** the handedness derivation $\chi=\mathrm{sign}(p\cdot S)$ uses the **cap dipole** $p$; the planar models have no caps. Don't promote handedness conclusions from cap-free models.
- **Live corpus contradiction, unadjudicated:** `spindle-braid.md:108` says the pin exists "precisely when $\varrho>1$ … ($\varrho\approx50$)"; line **118** of the same chapter says the same-source brake "caps near two-thirds of the rail pump." $\varrho\approx50$ vs $\varrho\approx0.67$. The binary derivation gives $\varrho\approx0.11$ at $s=2$ rising to $\approx0.31$ at $s=10$ — a third route on the brake-loses side. Line 108 looks superseded and was never reconciled.
- **Likeliest bug home:** the fold/caustic mollified-impulse arithmetic + regulator ladder in `src/eom` (least-read, subtlest). Also unconfirmed: multi-root completeness within a single cell (even crossings), and per-segment error-token accumulation across many steps. `Interval.cpp` — the outward-rounding soundness core, where one error invalidates **every** certificate — was modified during the repair and has had no independent regression.
- **Sandbox reality (corrected 2026-07-14 — the earlier "you cannot build the C++" was false and cost a session's worth of reach):** you **can** build the C++. You are not root and `apt` is blocked (the proxy 403s Ubuntu ports), but PyPI is allowlisted and the `gmpy2` wheel ships `gmp.h`, `mpfr.h`, and the shared libraries. Verified working:

  ```bash
  pip3 download gmpy2 --no-deps -d /tmp/pipprobe
  cd /tmp && mkdir -p mp && cd mp && unzip -qo /tmp/pipprobe/*.whl
  mkdir -p inc && cp gmpy2/*.h inc/
  ln -sf $PWD/gmpy2.libs/libmpfr-*.so.* libmpfr.so
  ln -sf $PWD/gmpy2.libs/libgmp-*.so.*  libgmp.so
  c++ -std=c++20 -O2 -Iinc -I<repo>/src/eom/include \
      <sources> -L. -lmpfr -lgmp -Wl,-rpath,$PWD/gmpy2.libs -o probe
  ```

  512-bit MPFR and `src/eom/src/Interval.cpp` both compile this way. Build into `/tmp`, never the repo's `.tmp` — that is Codex's, and it is often mid-run.

  **What you still cannot do:** run Codex's binaries (they are Mach-O arm64; you are Linux aarch64), and produce comparable wall-clock. Timing on the operator's Mac is the only timing that means anything, so seconds belong to Codex. Everything **deterministic** — cell counts, root classifications, certificate statuses, interval rounding — is yours to verify independently, and per [Evidence Independence](../../AGENTS.md#evidence-independence) you should: adjudicating a report you cannot reproduce is the failure mode this role exists to prevent.

  The independent Python oracle (`scripts/eom/oracle/*`, system `python3` + `mpmath`) remains the fastest route for analytic checks — jughead used it to confirm force sign/magnitude, a coupled evolution, the $D_s$ transversality bound, and the §86 cubic tangency at the pin.

## Standing operator rules

Be concise and direct. Proceed on safe in-scope edits without asking (operator reviews all diffs); reserve approval for theory leaps, canon changes, agent dispatch, or ambiguous intent. Capture brainstorming insights live at the right claim level. Remind the operator to parallelize independent threads. **Check the live tree — don't trust session memory of what's built.** Don't prematurely declare closure. Per `AGENTS.md`: prompts start with `Closure goal:` and don't address the agent by name; include a `Closure goal:` line in every substantive operator response; **you must not run any git command** (git belongs to Codex) — use `ls`/reads/search instead.

## Read first, in order

1. `AGENTS.md`
2. `reference/priorities/app-solver/claims-triage-ledger-2026-07-12.md` (tiers, quarantine, geometry, worklist)
3. `reference/priorities/app-solver/central-solver-independent-audit-2026-07-12.md` (why the quarantine exists)
4. `reference/priorities/app-solver/eom-engine-independent-inspection-2026-07-13.md` (what the new engine is + residual risks)
6. `src/eom/README.md`, then `CertifiedAcceleration.cpp` (force) and `CoupledEvolution.cpp` (integrator)
7. Tail of `reference/priorities/master-equation-closure/brainstorming.md` (the §96→§99 arc + the assembly reframe)
