# Dispatch Packet — Diagnose the `src/eom` Root-Completeness Wall

**Date:** 2026-07-14
**Status:** **ANSWERED 2026-07-14 — verdict: DEFECT.** Measured on the
independent oracle by the adjudicator; see
[evidence/eom-root-completeness-wall-ds-diagnostic-2026-07-14.md](evidence/eom-root-completeness-wall-ds-diagnostic-2026-07-14.md).
$\min D_s$ over all 36 certified ordered pairs is $0.6824$, and the
Cauchy–Schwarz bound plus measured accelerations hold $D_s\ge0.42$ at the wall
row across the whole evolved window — no caustic is reachable. Independently,
the wall moves by $2.75\times$ under step refinement and $2.59\times$ under
prehistory-segment refinement while being invariant in $h$: it tracks
discretization, not physical time. **The repair is now dispatched, not the
diagnostic** — see "Dispatched repair" below.
**Gates:** §86 (Class A, and with it §57/§59/§60/§83/§90/§91/§94), and every
remaining T2/T3 direct-evolution re-run in
[claims-triage-ledger-2026-07-12.md](claims-triage-ledger-2026-07-12.md). This
is now the **critical path of the whole re-run program**.

---

Closure goal: Determine whether the `src/eom` root-completeness wall is a
genuine physical caustic (transversality $D_s\to0$), an architectural limit of
bracketing-based root finding, or a defect — by measuring $D_s$ at the failing
row. This is a measurement, not a fix; the fix is dispatched only after the
answer.

## Why this is the critical path

Two independent campaigns have now stalled on root completeness, from opposite
directions:

- **§86** — the exact V5, at the $v=c_f$ speed pin. Fails into finite-width
  fold handling at $\sim32$ s per accepted step and $6.4\times10^{5}$ steps per
  braid cycle ($239$ days/cycle). Cost wall.
- **§97** — an isolated triple with every site strictly sub-$c_f$, no speed pin.
  Fails at `numeric_precision_limit_exhausted` at $t=0.335$. **Not** a cost
  wall: the evidence packet measures $0.01874$ s per accepted path-step, making
  the full $6.93$ horizon about $26$ s of wall time. The answer is
  twenty-six seconds away on the far side of this wall.

Every remaining re-run is a direct evolution and will meet the same surface. No
T2 or T3 row can retire until this is understood.

## The measurement

The delayed-root function for a receiver at $x_r(t)$ and a source path
$x_s(\tau)$ is

$$
g(\tau)=|x_r(t)-x_s(\tau)|-c_f\,(t-\tau),
\qquad
g'(\tau)=c_f-\hat r\cdot v_{\rm src}=D_s .
$$

So $D_s\to0$ **is** root tangency: the source-normal transversality floor
vanishing and the root becoming a double root are the same event, and it is the
same event as the caustic where $W^{\rm rec}=|D_T/D_s|$ diverges. A
bracketing/sign-change scan — which is what `ExactPairBatch.cpp:160-333` does —
is structurally incapable of certifying a tangential root **at any precision**.
That is why $512\to1024$ bits changed nothing, and it is the mechanism to test
first.

**Instrument the failing rows.** At the step where certification is first lost,
and for several steps before it, report per failing ordered pair:

1. $D_s$ (minimum over the search interval), and $|v_{\rm src}|$, $\hat r\cdot v_{\rm src}$;
2. $D_T$ and the resulting $W^{\rm rec}$;
3. the separation, the delay, and the width of the interval enclosure of $g$;
4. the trajectory of the **maximum site speed over all six worldlines versus
   $t$**, from $0$ to the wall.

Reuse the §97 runner and its exact recorded object
(`section-97-98-direct-evolution.cpp`; the baseline `imx`, $10^{-3}$, step
$0.01$, $h=8$, segment $0.02$ row that reaches $t=0.335$). Change nothing about
the physics or the tolerances; add diagnostics only.

## The discriminator

At $t=0$ the §97 object's site speeds are $I=0.3823031$, $M=0.7811697$,
$O=0.2522267$, all strictly sub-$c_f$. Since $\hat r\cdot v_{\rm src}\le|v_{\rm src}|$,
the transversality floor is bounded away from zero at the start:

| Ring | $|v|$ at $t=0$ | $\min D_s\ge c_f-|v|$ |
|---|---:|---:|
| I | $0.3823031$ | $0.617697$ |
| M | $0.7811697$ | $0.218830$ |
| O | $0.2522267$ | $0.747773$ |

The control's **first** loss of certification is on `I+<-I-` and `I-<-I+` — the
antipodal pair *within ring I*, the slowest-moving ring, whose transversality
floor starts at $0.618$. This is the crux:

- **If $D_s$ at that failing row is $O(0.1)$ or larger** — i.e. the root is
  manifestly transversal and precision still exhausts — then this is a
  **defect**, and it lives in `src/eom`'s least-read code. It would contaminate
  §86 and everything downstream, and it becomes the highest-priority item in the
  program. Residual-risk item 2 of the
  [engine inspection](eom-engine-independent-inspection-2026-07-13.md) —
  even-crossing multi-root completeness within a single cell — is the first
  place to look, since a co-cell root pair presents as an uncertifiable row
  regardless of bit depth.
- **If $D_s\to0$** — because the object, being $12\%$ out of force balance, is
  disintegrating and has accelerated ring-I sites from $0.38$ toward $c_f$
  within $0.04$ of a period — then this is a **genuine caustic**, the engine is
  correctly failing closed, and the architectural conclusion follows: caustics
  are **generic**, not a special feature of the V5 speed pin. Any unbalanced
  object drives sites to $c_f$ and manufactures them. The bracketing
  architecture then needs a tangency-capable route (certify $g$ and $g'$
  jointly; a double root is a root of both) as first-class engine work, not as
  a §86-local fold patch.

Report the measured $D_s$ and the max-site-speed trajectory. **Do not fix
anything in this packet** — the two branches lead to different fixes, and
guessing which one to build is how the previous solver was lost.

## Discipline

- Diagnostics only; no change to the interaction law, the tolerances, the
  fail-closed policy, or the object.
- `src/eom` used as-is; do not fork it.
- Architrino-level, no mass and no $mv$; "delayed", never the disallowed
  variant; KaTeX.
- `validate-content --check --strict`, `build-scene-graph --check --strict`, and
  `git diff --check` pass. (The broken links previously reported in
  `reference/priorities/app-eom/priorities.md` now resolve; the content gate is
  green again and is no longer masked.)

## Expected output

An evidence packet recording the measured $D_s$, $W^{\rm rec}$, and max-site-speed
trajectory at and before the wall; a stated verdict of **defect** or **genuine
caustic**; and, if caustic, the earliest $t$ at which any site first reaches
$c_f$. No fix, no promotion, no quarantine movement.

## On return — adjudication

If **defect**: it takes priority over every re-run, and the §86 fold-cost
finding is re-opened, since a root-scan defect at the pin would look exactly
like expensive-but-correct fold handling.

If **genuine caustic**: the pinned-fold route and this wall are one problem, and
the engine needs a tangency-capable root certificate as a first-class
capability. That single piece of work then unblocks §86, Class A, and the T3
temporal set together — and the $26$-second §97 arithmetic shows the re-run
program is cheap on the far side of it.

---

## Dispatched repair — 2026-07-14

The verdict is **defect**. The caustic branch is closed and the tangency-capable
root certificate is withdrawn as unjustified by this evidence.

Closure goal: Find and repair the defect in the `src/eom` **evolved-history**
root path that walls certification at $D_s\ge0.42$ — a transversal root the
oracle certifies cleanly — and demonstrate the repair by carrying the §97
finalist to $t\ge6.93$ with a wall that no longer moves under step or
prehistory-segment refinement.

**The signature to explain.** Clean certification on factory circular history;
failure only on evolved history; unmoved by $512\to1024$ MPFR bits; moving with
step and segment count; invariant in memory depth $h$. Any proposed cause must
account for all five.

**Measure first, in this order.**

1. **Error-token accumulation (leading hypothesis, residual-risk item 4).**
   Report the position and velocity error radius of each published cubic segment
   versus step index, and the width of the $g=|x_r(t)-x_s(\tau)|-c_f(t-\tau)$
   enclosure at the failing cell, against the $10^{-5}$ root tolerance. An
   interval dominated by a stored error radius does not narrow when arithmetic
   precision rises — which is exactly the observed precision-independence. At
   step $0.01$ the wall arrives after $33$ steps; tokens of order $10^{-6}$
   accumulating past a $10^{-5}$ tolerance would fit.
2. **Even-crossing multi-root completeness in one cell (residual-risk item 2).**
   If the enclosure is *not* token-dominated, confirm whether a co-cell root
   pair is presenting as an uncertifiable row.
3. **Native ↔ oracle parity on evolved history.** The oracle certifies this
   object's start where the native path walls at $t=0.335$. Parity has only ever
   been tested at short horizons. Extend it: run the same §97 object on both
   paths, step for step, and report the first step at which the certificates
   diverge. This is the regression that should have caught this.

**Do not** widen the root tolerance, relax the fail-closed policy, or raise
precision further to paper over the wall. The engine is failing closed correctly
given its inputs; the inputs are wrong.

**Then re-open §86.** A root-scan defect at the $v=c_f$ pin would present exactly
as expensive-but-correct fold handling, so the §86 cost diagnosis is not
trustworthy until this lands. The analytic pinned-fold result — $100.3\times$
fewer fold cells for only $1.25\times$ whole-step wall time, residual cost in
temporal step error — already points at step acceptance rather than fold
geometry as the real bottleneck, which is consistent with a defect in the same
evolved-history path. Re-measure §86's cost after the repair before accepting
any feasibility verdict on it.

Closure goal (next): with the root path repaired, re-measure the §86 step-cost
wall, then run the T3 temporal set as direct evolutions in ledger order.
