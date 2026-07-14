# Corpus Promotion Audit — quarantined claims already in `content/markdown/aaa`

**Date:** 2026-07-14
**Run by:** adjudicator (fingerprint search + targeted read; quotes verified against source)
**Disposition:** `contamination_confirmed`; `corrections_not_yet_applied`;
`t1_spine_intact`; `strategic_conclusion_survives`; `priority-only`.

**Gap this closes.** The [claims-triage ledger](claims-triage-ledger-2026-07-12.md)
sorted the *conclusion register*. It never asked which quarantined conclusions
had already been **promoted into reader-facing corpus prose**. Several had. The
quarantine is therefore not currently enforced where it matters most — the
textbook-facing text a reader takes as the theory's current state.

---

## The severe finding: false claim-level labels

Ordinary T2/T3 contamination is a claim held at too strong a level. This audit
found something worse in a subset of rows: **corpus prose attributes results to
a "native retained-history solver" release — an artifact the
[solver audit](central-solver-independent-audit-2026-07-12.md) found never
existed.** The shipped wasm was smoke-only, a JS reference facade ran, and the
runtime had no integrator at all.

So these are not over-graded claims. They are claims whose *stated provenance is
false*, and the claim-level sentence attached to them asserts the false
provenance as its warrant. Verified examples, quoted from source:

- `noether-braid/noether-braid-taxonomy.md:88` — "the first tabled rest-state
  realization, **released on the native retained-history solver at declared
  regulators**, did not self-support — the wake forces at the fitted coupling
  under-supplied the required centripetal support and **the configuration
  dispersed**".
- `philosophy-history/theory-bridges/angular-momentum-and-spin.md:317` — "**The
  native release of the same fixed point measured exactly this mode class:
  nutation growing from release and preceding shape loss.** The seed-grade
  linear rate underpredicts the native mid-window growth by a factor of a few".
- `noether-braid/spindle-braid.md:108` — "The pin was subsequently **confirmed on
  the native retained-history solver**: a released middle binary overshoots the
  rail to $\beta_M\approx1.08$, turns, and decays back toward it from above — a
  speed attractor, **natively measured, on three independent releases**."

An evaluator with no integrator cannot release anything, cannot overshoot,
cannot turn, and cannot decay back. These sentences describe runs that did not
happen as described.

## Register

| File | Tier | Load-bearing? | Worst item |
|---|---|---|---|
| `noether-braid/spindle-braid.md` | **T2 + T3, 11 native-dynamics phrases** | yes | L232–234 "Released Behavior" section; L262 flutter "not an instrument artifact"; L108 native speed-attractor |
| `philosophy-history/theory-bridges/angular-momentum-and-spin.md` | **T2 + T3** | yes | L307–319 flutter verdict $\lambda=+0.18\pm0.38i$; L317 native-release corroboration |
| `noether-braid/noether-braid-taxonomy.md` | **T3** | yes, severable | L88 "released on the native retained-history solver… dispersed" |
| `noether-braid/explored-braid-geometries.md` | **T3** | yes | L71 "expands without any later inward acceleration row"; L77 escape claim |
| `spacetime/lorentz-kinematics.md` | **T3 + T2** | moderate | L528 "A release of the drifting rigid family confirms the ruler law"; flutter cited as the limitation on higher-drift rows |
| `noether-braid/noether-braid.md` | **T3, framing** | yes, severable | L23 "did not self-support under native release" |
| `assemblies/particle-masses.md` | borderline — **survives as T1** | yes | L565 "the arrest is coupling-scale self-support" ("arrest" implies settling; the equilibrium itself is T1) |
| `noether-braid/neutral-braid.md` | clean | — | — |
| `noether-braid/braid-recovery-requirements.md` | clean | — | — |
| `cosmology/expansion-mechanism.md` | clean | — | — |
| `dynamics/binary-dynamics.md` | clean | — | — |

## Three structural observations

1. **The two hardest T3 claims carry no claim-level tag at all.**
   `explored-braid-geometries.md:71` and `noether-braid-taxonomy.md:88` both
   assert solver-measured time evolution with no "Claim level:" sentence.
   `angular-momentum-and-spin.md` tags everything and makes the *larger* claim —
   the tagged file is the more honest one. Tagging discipline is inversely
   correlated with claim severity here, which is the opposite of what the
   [Theory Advancement Capture](../../../AGENTS.md) policy intends.

2. **T3 clauses are welded into sentences whose other half is T1.** Taxonomy L88
   pairs "the configuration dispersed" (T3, void) with "the wake forces at the
   fitted coupling under-supplied the required centripetal support" (T1
   force-balance negative, survives). `noether-braid.md:23` pairs "did not
   self-support under native release" (T3) with "leads on measured
   prescribed-worldline closure" (T1). **The conclusion survives on the T1 clause
   alone in both cases** — the repair is severing, not retraction.

3. **The flutter verdict is doubly compromised, and it propagates.** In
   `angular-momentum-and-spin.md` the T2 spectrum is measured by a cycle-averaged
   evaluator on *prescribed worldlines* — exactly the audit's "evaluator, no
   integrator" — and its only independent corroboration is the native release
   that could not have run. `lorentz-kinematics.md:528` then *cites that flutter*
   to explain why its higher-drift ruler rows are unconfirmed. So quarantining
   §86 propagates into the Lorentz chapter's stated **limitations**, not only its
   claims: a limitation sourced from a quarantined verdict is not a known
   limitation.

## What survives

**The T1 spine is intact and the strategic conclusion holds.** Every audited
force-balance fact, equilibrium, charge ledger, and geometry anchor stands:
$\kappa_{\rm eq}=0.28623$ and $R_M^{\rm eq}=3.4937$ (`particle-masses.md`) are
equilibrium results and survive; the support sum rule, the tangential-brake
elimination, the pump-has-no-internal-null no-go, and every non-bind negative
survive.

One caution on the strategic reading. `spindle-braid.md:282` states the bare
scaffold "fails to be a free particle on **two independent fronts** — it cannot
shed its axial angular-momentum pump … **and its axis sector flutters**." The
first front is T1 and airtight. The second is §86, quarantined. The conclusion
survives on the first front alone, but the corpus currently presents a
two-legged argument with one quarantined leg, which over-states the evidence
even though the verdict is right.

`dynamics/binary-dynamics.md` is the model the rest should be measured against:
it states its status boundaries up front (L5), keeps every attractor claim
explicitly conjectural (L229, L1170), and its positives are exactly the T1 class
— instantaneous force facts and negatives (L31, L86).

## Disposition and next objects

No corrections are applied here. Severing T3 clauses and re-grading T2 verdicts
across seven reader-facing chapters is a scoped edit campaign, and it should be
done once, correctly, against a complete list — including the git history this
audit could not read.

1. **Complete the list from git.** This audit found promotions by fingerprint
   search of the current tree. It cannot see *when* material was promoted, under
   which evidence, or what was promoted and later reworded. A git-assisted pass
   is dispatched separately.
2. **Then sever and re-grade**, chapter by chapter, preserving the T1 clause and
   the conclusion wherever the T3 clause is severable (observation 2 above).
3. **Do not retract the strategic conclusion.** It rests on T1.

Per repository policy the adjudicator does not run git; the history pass belongs
to a Codex thread.
