# Recovery Track — Codex Dispatch Prompt

Copy the block below to start the Codex recovery-track thread. It runs in parallel with the [adjudication thread](jughead-adjudication-handoff-prompt.md).

The **going-forward track is the [claims-triage ledger](../priorities/app-solver/claims-triage-ledger-2026-07-12.md)**. This prompt exists to give that ledger's worklist enough context to be executed correctly rather than quickly.

---

Closure goal: Recover the Architrino/AAA claims corpus from the solver disaster by driving the claims-triage ledger to retirement, row by row, using the corrected method. The ledger is the recovery plan; this prompt is why it reads the way it does.

## Read first, in order

1. `AGENTS.md` — especially **Evidence Independence** and its **Claim Grading** subsection. Both were written on 2026-07-14 in direct response to the failures recorded there. Grade every claim you make: derived / measured / inferred / guessed.
2. `reference/priorities/app-solver/claims-triage-ledger-2026-07-12.md` — **the recovery plan.** Tiers, quarantine register, re-run object geometry (five classes), and the worklist. Everything below serves this file.
3. `reference/priorities/app-solver/central-solver-independent-audit-2026-07-12.md` — why the quarantine exists.
4. `reference/priorities/braid-archive/braid-ideal/evidence/antipodal-binary-prehistory-collapse-test-2026-07-14.md` — why the ledger's *remedy* had to change.
5. `reference/op/codex-goal-seeking-prompt-template.md` — the meta wrapper.

## The disaster

Everything in this theory ran for months on `src/solver/app/AbsoluteHistoryRootRuntime.mjs`. An independent audit found it is a **prescribed-orbit force evaluator with no integrator**. Source motion was a closed-form rigid circle; history was never evolved. The "native" engine was never wired — the shipped wasm is smoke-only and a JS `js_reference_facade` ran instead. The C++ path named `masterEquation` discards its request and computes an instantaneous softened toy.

**No test ever validated evolved dynamics against an independent answer.** Every "reproduces to $10^{-9}$" was the code agreeing with itself. That single missing rule — the thing now written as *Evidence Independence* — is what allowed it.

What that evaluator **could** compute: instantaneous delayed forces, force and torque balance, equilibria, charge sums, geometry. What it **could not**: any time evolution, any release, any dispersal, any growth rate, any "native retained-history" run.

## What survived, and what the recovery is for

**T1 SURVIVES** and it is the bulk of the corpus: instantaneous force facts, force-balance results, equilibria, charge ledgers, geometry anchors ($\kappa_{\rm eq}=0.28623$, $R_M^{\rm eq}=3.4937$), the support sum rule, and — most importantly — the **negatives**. No bare braid, isolated triple, or tested planar assembly **binds**. The strategic frontier conclusion rests entirely on those T1 negatives and is unaffected.

**T2 (linear stability / $\mathrm{Re}\,\lambda$) and T3 (anything temporal)** are quarantined. Recovering them is this track.

## What has already been recovered (2026-07-14)

Do not redo any of this.

- **A real engine exists and is validated.** `src/eom` (C++20): no prescribed paths, canonical master equation, genuine coupled implicit Hermite corrector, all-roots fail-closed, self-hit first-class, sound outward-rounded interval arithmetic, and an independently authored 90-digit Python oracle. Native↔oracle parity $72/72$.
- **An evolved-history root defect was found and repaired.** The MPFR fallback treated more arithmetic bits as if they reduced *path reconstruction* uncertainty. A million representable-value advances at 512 bits move $\sim10^{-150}$ against a retained-history enclosure of $\sim10^{-9}$. Fixed with a tolerance-bounded strict-sign IVT bracket, uniqueness enforced by a sign-definite $D_s$ hull.
- **The program is affordable.** The token-dominance gate delivered **88.39×** ($632.3\to7.15$ s/step, MPFR production use $0/0$, accepted answer bit-identical). The accepted step grew **53×** to $5\times10^{-4}$ — a braid cycle went from 640,000 steps to 12,065. One cycle is hours.
- **Optimization is CLOSED.** Three further rounds returned $1.04\times$, $1.12\times$, $1.38\times$; the stopping rule fired. Parallelism is tapped: $2.795\times$ on 8 cores, Amdahl serial fraction $26.6\%$, infinite-core ceiling $3.76\times$. **Do not reopen it without a measured target.** The remaining cost is the pin, and the pin is the physics.
- **The corpus is repaired.** 46 promoted claims across 11 files, including rows attributing results to a "native retained-history solver" that never existed. T3 removed from reader-facing prose, T2 re-graded to *indication*, T1 preserved verbatim.
- **§97/§98 flutter is VOID** — retired, not quarantined, and **removed from the worklist**. Every point failed the force-balance precondition by its own recorded $\epsilon_{\rm bind}$ (one scored a growth rate at $\epsilon_{\rm bind}=0.999999995$). A pencil about a circle the object does not follow has no referent. Do not re-run it.

## The correction that changes how every remaining row must be run

The ledger says T3 rows are "quarantined pending re-derivation on the validated integrator." **That remedy is insufficient, and running it as written would cause a second disaster worse than the first.**

On the antipodal binary — the cheapest object in the theory — four materially different prehistories seeded to the **identical** $(R_0,s_0)$ to 16 significant figures **do not collapse**. Seed spread in $s$: $27.2\%$ at $t=8$, $40.7\%$ at $t=20$, $39.4\%$ at $t=25$. It grows, plateaus, and does not shrink. The refinement control on the same seed gives $1.5\times10^{-8}$. **Signal-to-noise $2.6\times10^{7}$.**

This is a delay system. The state is a **function** on $[-h,0]$; every history is admissible; each gives a different future. **A circular prehistory does not approximate the answer — it selects one.**

So every T3 row is **seed-indexed**, and not one ever justified its seed. Re-running §83 or §60 on `src/eom` with a circular prehistory would produce a clean number with a genuine certificate from a genuinely sound engine — and it would be a seed artifact. The first disaster was catchable because the solver was hollow. That one would not have been.

Two further consequences, both measured on the binary and both invisible from a circular seed: the log-spiral-in seed's radius **turns** (contracts to $R=3.0919$ at $t=11.2$, then expands) where the circular seed is monotone; and its speed **peaks at $0.3892$ then declines**, so the derived $F_\theta>0$ is a circular-manifold fact that does **not** govern the dynamics.

## The method — every T2/T3 row, no exceptions

**Before anything, check the row is well-posed:**

- **T2 rows require force balance.** A stability spectrum about a configuration that is not an equilibrium has no referent. Where a T1 negative says nothing binds, the matching T2 row is **void by construction** — retire it, do not re-run it. §96's flutter row sits on a recorded non-bind and is the next candidate for the §97/§98 treatment.
- **T3 rows require a collapse test.** A single prehistory is a chosen answer.

**Then run it as a collapse test:**

1. **At least three materially different prehistories** at matched initial state — the exact circular history plus two genuinely different histories consistent with the same object at $t=0$ (e.g. a slow radial breath, a tilt-modulated history). **Match the $t=0$ state to full precision and report the match.** That is what makes the comparison controlled and it is why the binary result is unarguable.
2. **Evolve well past the memory depth $h$.** Below $t=h$ the future is still the seed talking and the run means nothing.
3. **Carry the refinement control** on at least one seed — half step, half prehistory segment, $h\to10$ — so the seed effect can be read against numerical noise.
4. **Collapse first, claim second.** Plot phase curves against each other, never against $t$. Report seed spread versus $t/h$ and whether it shrinks.
5. **Three dispositions:** seeds collapse → the collapse curve is the answer and the row can lift; seeds do not collapse → the row is **reclassified as not well-posed**, which is a real result and must be reported as one, not as a failure; horizon-blocked → say so with the wall-time arithmetic.

## The worklist (from the ledger, as corrected)

1. **§86 flutter** — redesigned as a multi-seed collapse campaign; see `reference/priorities/braid-archive/braid-ideal/section-86-flutter-rerun-dispatch-packet.md` §"Superseding design". Gated on the antipodal-binary $t\gtrsim60$ extension currently running, which decides whether §86 is a collapse test or a reclassification. **Do not start §86 until that returns.**
2. ~~**§97/§98**~~ — VOID, removed.
3. **T3 temporal set** — §83 release, §90 saturation, §92/§93 locking, §94 settling, §60 expansion. All need the collapse method. §60 Row 7 and §83 are both Class A (bare tilted V5 at rest) and are the natural first attempts once §86's design is settled.
4. **§99 assembly** — its force-balance non-bind already survives as T1; only the anchored-pencil row is at issue, and it must pass the force-balance precondition first.

**Geometry classes** — resolve a class, cascade to its members: **A** bare tilted V5 at rest (§57/59/60/83/86/90/91/94); **B** dressed tilted V5 + payload (§88/89); **C** braid + sea, moving/oblique (§85/62/87, axial-drift); **D** contra-rotating pair, planar (§92/93, §99); **E** moving single braid/triple (§96); **H** collinear head-on (breather).

## The frontier that is not blocked by any of this

The strategic conclusion survives on T1: no bare braid, isolated triple, or planar assembly binds. Pairing closes the pump and the six-electrino payload gives clean $-1e$, but binding fails ($\epsilon_{\rm bind}\approx1.0$ against the $0.03$ gate). **The next lever is a derived constitutive Noether sea operator, gated on the same-record wake-action / angular-momentum Ward identity** — the deepest open problem in the theory, and it is **analytic**. It needs no integrator, no collapse test, and no §86 verdict. It has been queued behind engine work for three days.

**Do not accept another proxy-sea sweep as evidence about the constitutive law.** A model swept over its own knobs reports whatever its author built in; the sea's response is precisely the thing that must be derived, so modeling it and sweeping it assumes the answer.

## Discipline

- `src/eom` as-is; do not fork it. Architrino-level: **no mass, no $mv$** — $\kappa q^2/r^2$ *is* an acceleration, and "centripetal need" means $v^2/R$, a kinematic requirement of circular motion. "delayed", never the disallowed variant. KaTeX.
- `validate-content --check --strict`, `build-scene-graph --check --strict`, `git diff --check` pass. Report generator drift; do not `--write` it.
- **Never report `DONE` while leaving a job running that nothing is watching.** Either wait, or detach properly and leave it observable: report the PID, flush a heartbeat every ~100 accepted steps (step index, $t$, wall seconds), name the output path. On 2026-07-14 a run launched in the same message that reported `DONE` was SIGHUP-killed seconds later and left a zero-byte log that looked like progress for 23 minutes.
- **Rebuild before running** and state the binary's build time against the last `src/eom` change. A stale binary is a wrong answer that looks like a slow one; one such run predated the token gate and would have crawled at 632 s/step.
- **Record evidence and status. The adjudicator lifts claim levels; the builder does not.** Status-tracking is welcome; self-declared verdicts are not.

## What the adjudicator got wrong, so you can catch it faster

Eight adjudicator errors in one session, all one shape: **a verified local fact extrapolated to an unverified global claim, in the same confident voice as the verified part.** The derivations all held — the twin hinges, $W^{\rm rec}\equiv1$, $F_r/F_\theta$ matching the native engine to 9 digits, the cubic tangency predicting the difficult cell to 19%, the delay bound landing at $2.00966$ against a predicted $2.0$. The inferences about the artifact all failed: the fold was "very likely an artifact" (it was $0.71\%$ of the cost); cells were "the portable cost metric" ($100.3\times$ fewer bought $1.25\times$); a sealed prediction said the self-hit brakes at the rail (it pumps, $2.5\times$ harder than the partner); the IVT target confused uniqueness with existence; the warm-bracket target ignored that certification's obligation is proving the **complement** root-free; a live run at 195% CPU was declared dead from a silent log.

**You refuted four of these in one line each, by reading the code and measuring.** Keep doing that. If a dispatch reasons from geometry to cost, or from a derivation to an implementation, say so immediately rather than spending a round on it.

Closure goal (next): from the §86 design verdict, begin the T3 tier as collapse tests in ledger order — and open a parallel thread on the constitutive Noether sea operator and its Ward identity, which no engine result blocks and which is the actual frontier.
