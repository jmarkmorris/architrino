# Launch brief: open research on the ceiling contact of release C1

**Suggested thread title:** `ceiling contact open research`

**How to launch.** Open a new session in the existing checkout `/Users/markmorris/vibe/architrino` (not a worktree) and give it one line: `Run the prompt in reference/priorities/master-equation-closure/braid-program/analysis/ceiling-contact-open-research-launch-brief.md`. Everything below the rule is the prompt.

**Why a brief and not a spawned task.** The session that wrote this brief had no tool that starts a session in the existing checkout; the only spawn tool creates a Git worktree, which [AGENTS.md](../../../../../AGENTS.md) rejects for this project and which would also lack the ignored local evidence this work reads.

**Operator instruction and date.** On 2026-10-07 the operator wrote: "Start a named left panel thread to do open-research problems 1 thru 6, 8, and 9". The numbers refer to a list given in that conversation. The table in the prompt maps each to the obligations of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status). Items 7 (member 1's motion after the inferred coincidence) and 10 (human review) of that list were not selected.

---

Work the eight selected open problems left by the ceiling contact study of release C1, in `/Users/markmorris/vibe/architrino`, in the existing checkout.

## Read first

1. `AGENTS.md` in full, the generated router it names, and `reference/op/operator-explanation-standard.md`.
2. `reference/priorities/master-equation-closure/equation-variants/README.md` (the approval rule for equation variants) and Sections 1.2 to 1.4 of `equation-variants/field-speed-ceiling/definition.md`.
3. The study record in full: `reference/priorities/master-equation-closure/braid-program/analysis/ceiling-contact-two-hour-2026-10-06.md`. It is the base for everything here. Its Section 5 holds the lemmas and Theorems A and B, Section 6 the obstruction, Section 7 the limiting spiral, its formal spectrum and the scalar delay equation, Section 8 the measurements and instruments.
4. The two earlier records it builds on, in the same directory: `released-balances-under-field-speed-ceiling-2026-10-06.md` and `ceiling-releases-blind-reproduction-2026-10-06.md`.

Check active work before starting: the session list, and the modification times of files under `braid-program/` and `equation-variants/`. Other sessions work in this checkout at the same time. Leave their files and targets alone.

## The equation, frozen

Every result is about the **field-speed ceiling variant**, not the Master Equation: $K=c_f=c_a=1$, ordinary partner rows at their original weight, zero self acceleration, and the inclusive ceiling response applied after the rows are summed. Nothing else is selected: no softening, smoothing, event map, contact rule, source truncation, new history, or continuation past coincidence. Where the specification stops determining the motion, report that and stop that line of work. Name the variant in every result.

## The problems

Vocabulary: members 0 and 1 are the two positives and member 2 the negative. Members 0 and 2 **associate** in the inward spiral; member 1 **dissociates**. Do not use `decay` for what an assembly does.

| Operator's number | Obligation in the study record | Problem |
| --- | --- | --- |
| 1 | 1 | Prove or refute the delay-ratio bound for histories near the spiral. This is the one hypothesis of Theorem B that is neither self-maintaining nor read from stored history. The scalar delay equation of Section 7 is its smallest form: a two-sided bound on $c(\eta)$. A proof for the planar symmetric pursuit limit is a result; say exactly what it does and does not cover (pointing error, third member, asymmetric and out-of-plane histories). |
| 2 | 2 | Give an analytic proof that the spiral equation $2\ln\lambda=\sqrt{\lambda-1}\,\arccos(1-2/\lambda)$ has exactly one root on $\lambda>1$. Separately, prepare a self-contained brief from which a reader outside this model family can re-derive the characteristic function $D_\eta(\mu)$ and recount its roots. You cannot supply that outside reading yourself; do not describe a same-family check as one. |
| 3 | 3 | Build an integrator of the frozen specification that treats the lock implicitly, so that the region inside $10^{-4}$ sizes is refined by tolerance at a cost that does not grow as $1/r$. It is a new instrument: it must pass the exact ceiling circular pair, and reproduce the stored approach between $10^{-2}$ and $10^{-4}$ sizes, before any new target use. |
| 4 | 4 | Repeat the study's analysis for release C3, and for a contact in which only one member rides the ceiling (twelve of the sixty census contacts). Lemma 2 does not apply to a member below the ceiling; find what replaces it or show where the argument fails. |
| 5 | 5 | Decide whether a dissociating member that lies in the spiral's plane meets a degenerate root from the spiralling pair. C1's margin of $67.5^\circ$ is particular to C1. The rows concerned arrive after the inferred coincidence, so state what can be said without a continuation rule. |
| 6 | 8 | Establish what the frozen specification itself determines at and after the coincidence instant, and whether the association of members 0 and 2 is more than transient. See the approval boundary below. |
| 8 | 6 | Explain why member 2's orbit radius falls from $0.1727$ to $0.1425$ while it climbs toward member 0. It is measured and has no derivation. |
| 9 | 9 | Compute the growing directions of the balance from a linearization about the verified rigid balance, and confirm or correct the inference that member 2's axial displacement is where the balance gives way. The stored balance record lists six growing disturbances, the fastest at $3.79$ times the rotation rate; the measured growth of member 2's height is $3.21$ to $3.29$ per twentieth of a period. |

Suggested order: 9, 8, 2 (the uniqueness proof), 1, 5, 4, 3, then 6 and the outside-reader brief of 2. Problem 1 carries the most weight. Change the order if the work shows a better one, and say why.

## Approval boundary for problem 6

The operator intends to discuss whether the association is more than transient. That discussion has not happened and no continuation has been selected. Under the [variant approval rule](../../equation-variants/README.md#operator-approval-for-deviations), within problem 6 you may:

- determine what the frozen specification says at and after coincidence, including what Proposition C already implies about the regular solution law;
- examine, inside the frozen specification and before coincidence, whether anything other than descent to the common point is available to the associated pair, for example whether histories near the spiral can instead settle onto the variant's exact circular pair at wake speed;
- list candidate rules for coincidence and continuation as **proposals**, each stated in plain language with its exact specification, for the operator to select or reject.

You may not execute, simulate or adopt any contact rule, event map, smoothing, softening or continuation. A proposal is not approval. General instructions to continue or to search broadly are not approval.

## Evidence discipline

- Grade every claim as derived, measured, inferred or guessed where it is made, and give its falsifier.
- An instrument built in this thread is not run on its target until it has passed a known case and that pass is recorded. The exact ceiling circular pair ($R=0.2021113735$, $D=\cos D$) is one available control; the closed-form spiral constants and the stored ladders are others.
- Agreement between two things that share code or a model family is not independent evidence. Say what is and is not independent.
- Refine stopping distance and numerical tolerances separately. Report source coverage, root margins and numerical limits.
- Python runs only under the shared venv, `"${AAA_VENV:-../.venv}/bin/python"`. System `python3` is not a fallback.
- Follow `reference/op/long-running-test-heartbeats.md` for long runs: finite wall and resource limits, a heartbeat, and no process left running at closeout.

## Files

- **Frozen, read only:** everything under `.local-data/master-equation-closure/geometry-session-20261006/` and `geometry-session-20261005/`, and the existing `ccth*` files in `.local-data/master-equation-closure/ceiling-contact-two-hour-20261006/`. Import frozen code unchanged; never edit it.
- **Yours to write:** new records under `reference/priorities/master-equation-closure/braid-program/analysis/` with the prefix `ceiling-contact-open-research-`; runtime data and instruments under a new directory `.local-data/master-equation-closure/ceiling-contact-open-research-<date>/`; scratch under `.tmp/ceiling-contact-open-research/`.
- **Figures:** finished figures go in `content/assets/images/claude-generated/`, each registered in `content/assets/images/images.json` as `needs-review` before it is linked, following `content/assets/images/README.md`.
- **Shared files:** write a self-contained record for each problem as it is finished, so no result lives only in the conversation. At the end, and at any natural checkpoint, index the new records from `braid-program/priorities.md` and `braid-program/work-log.md`, rereading the live passage immediately before each narrow edit. You may add a dated pointer to the study record's Section 10. Do not edit any `manuscript.md`, ledger, or anything under `content/markdown/`.
- **Queue:** the work is entered in `braid-program/work-queue.md` under "Ceiling-contact open research". Update that entry's state as problems finish; remove it when all eight are done or closed.
- No worktrees. No staging, commits, pushes or generator `--write` runs.

## Reporting

There is no fixed time limit from the operator. Work the problems in order, record each as it closes, and stop a problem with a precise statement of the obstruction when it will not yield; a named missing inequality is a result. In the final response give, for each of the eight: the outcome, its grade and falsifier, the exact assumptions, validation commands and results, files written, and what remains. State review status plainly and label self-review as self-review. End with numbered next possible actions, each with a recommendation and a reason.
