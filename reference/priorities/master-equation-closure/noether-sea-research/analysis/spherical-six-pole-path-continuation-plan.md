# Six-pole path continuation and bracket repair: campaign plan (Claude PI)

*Status: active from 20:54:49 UTC on 2026-10-20. This plan is the PI's living document until closeout; dated corrections are added in place.*

## 1. Selection and its reading

On 2026-10-20 the operator answered the Claude PI's closing list from the October 14 correlated-continuation campaign with "do items 1 thru 3". Those items were:

1. move the wider-bracket certificate into the subject's main write-up, with the narrower bracket conditional;
2. repair the like-pair delay-root search bracket and continue past step 492 toward the path turn;
3. run the repair for the narrower support-turn bracket (fix the sub-box edges, controls, rerun only ends 412 and 431).

**Reading.** Item 1 was already done before this selection. The root Codex session integrated the certificate into [manuscript section 5.14](../manuscript.md#514-the-first-strict-minimum-of-signed-support): the broader bracket is final there and the narrower one is conditional. That integration was committed in `4e17f9aff` (2026-10-18). This campaign therefore verifies item 1 and does not redo it. It runs items 2 and 3 as one bounded research campaign on the same history.

The lane trackers said that the bracket repair and a path-turn continuation "require a new operator selection". This reply is read as that selection, for those two items only. If that reading was not intended, every result of this campaign is unapproved evidence and is not to be integrated.

## 2. Questions

- **Q2, path turn.** Continue the identical radius-10 six-pole rest history beyond the certified step 492. Does the signed speed $w$ reach zero, so that the common coordinate $q$ attains a maximum (a path turn)? A certified path turn needs: $w>0$ proved at one certified instant, $w<0$ proved at a later one, full time uncertainty, and a proved sign of the tangent acceleration $a$ on the bracket for uniqueness and strictness. A positive-to-negative crossing of $w$ is a maximum of $q$ and a zero of speed magnitude; it is not another speed maximum.
- **Q3, narrower support bracket.** Close the gap identified by review adjudication 14. The support's end-instant 3×3 cover can leave a sliver of about one rounding unit uncovered at the last sub-box edge. Its effect was dismissed only with an inferred Lipschitz constant. Either repair the cover so that it provably covers the whole end box and rerun ends 412 and 431, or supply a rigorous bound. Then the bracket $(5.986684593623649597167969,\,6.176684709182828044891357)$ is certified or stays conditional.

## 3. Fixed law and starting point

Identical six-pole REST release with a complete stationary past: $K=1$, $R=10$, $c_f=1$, $g=1/10$, $t=T/10$. The admitted great-circle reduction has a common signed coordinate $q(t)$ and $w=dq/dt$. The canonical transmitter-weighted ALL-root tangent interaction is retained; the canonical radial acceleration is discarded; the geometric normal acceleration is required; the speed is signed and variable. The partner classes are unlike (multiplicity 2), like (2) and the own antipode (1).

The starting point is the admitted correlated reconstruction r1–r5 under instrument steps10-cm v4.4 (`1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540`). Its last certified step is 492, at $t\in[6.786684593623649597167969,\,6.786684709182828044891357]$, with record `…-continuation-steps10-cm-v44-C22-r5.json` (`7af6178534c67a97e78800f6a5c7782b4c27fd6f124ed15bad7d82483e54b875`).

**The obstruction.** Step 493 was refused because the like delay-root search bracket failed: the like root had fallen to the lower end of a fixed bracket ($\mathrm{chord}_L-0.90$). The end evaluation at step 492 was refused for the same reason. The like root was $[1.03676,1.04363]$ at the step-474 end and falls about 0.0055 per step (inferred from the recorded roots). This is an instrument limit, not a physical one.

Forbidden throughout: a changed law, controller, cap, damping, smoothing, root deletion, sign clamp, new event rule, energy import, support provider, competing forward solver, EOM production runs, window or stationary extrapolation, silent narrowing, midpoint substitution, subset selection.

## 4. Roles

| role | lens | owns |
| --- | --- | --- |
| PI | Claude "curvature" | plan, grants, synthesis, lane integration, closeout |
| continuation | `jack-k-hale` | Q2: the root-bracket repair (new version of the step instrument) and the continued slices |
| support | `emmy-noether` | Q3: the end-instant cover repair and the reruns of ends 412 and 431; the partner account at the path-turn joins |
| independent review | `ramon-e-moore` | its own frozen derivation first, then numbered adjudications of both repairs, every slice, and the event rulings |

The review freezes its own reference before it opens any new file of this campaign written by another role. The reference covers: the validity condition for a delay-root bracket; the cover condition for an end-instant evaluation; and the path-turn certificate. The review keeps its own audit instruments and must not edit the subject's code.

## 5. Compute rules (binding on every role)

- **Python.** Only `../.venv/bin/python -I` (mpmath works; scipy is broken in this venv). Run from the checkout root as `OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 110; exec @ARGV' -- ../.venv/bin/python -I <script> <args>`. Print `os.getpid()` first.
- **One grant per invocation.** Every invocation, including one-liners, needs an explicit PI grant that names the holder, the exact invocation and its run-specific output names. The role returns a receipt: PID, UTC start and end, exit, wall time, peak RSS and output sha256.
- **One slot.** One process at a time, one thread, at most 110 s per invocation. A census with `pgrep -x Python; pgrep -x python; pgrep -x python3.13` runs immediately before launch. Any Python process blocks the launch unless the grant names that exact foreign PID, with its script and start time. Foreign processes are never touched.
- **Idle gap.** Leave at least 90 s of idle slot between consecutive target invocations, across all roles, so that a ready independent comparison can take the slot. Multi-run grants are not issued.
- **Controls first.** Known and negative controls run before targets for every new or repaired instrument, in a separate saved controls record.
- **No background processes.** No watchers and no polling Python. Shell-only foreground waits are allowed.

## 6. Evidence and files

- **Prefix.** Each role writes only under `spherical-six-pole-path-continuation-claude-<role>-*` in `analysis/` (reports) and `evidence/` (code, records, receipts). The PI owns this plan and `spherical-six-pole-path-continuation-claude-synthesis.md`.
- **Frozen material.** The October 14 campaign and every earlier campaign are closed and frozen. Cite them and never edit them. A repaired instrument is a NEW file. A script is copied to `-vN.py` before it is edited after it has run.
- **No destructive changes.** Never delete, overwrite or move evidence. No Git writes. No edits to the corpus, `src/`, generated files, the manuscript or the trackers by roles; the PI integrates into the manuscript and trackers at closeout.
- **Storage.** Bulk goes in `.local-data/master-equation-closure/six-pole-path-continuation/<role>/`, scratch in `.tmp/six-pole-path-continuation/<role>/`. The campaign budget is 50 MiB including scratch.
- **Manifest.** A dated, self-excluded manifest is written at closeout and verified row by row.
- **Grading.** Grade every claim as derived, measured, inferred or guessed. Name the instrument and domain. State a falsifier.
- **Writing.** Write Markdown one paragraph per line with relative links and `$...$` math. Use causal-delay vocabulary and acceleration language only. Put TeX in shell only inside quoted heredocs.

## 7. Clock (never extended)

Start 20:54:49 UTC; stop NEW exploration 23:39:49 UTC; hard closeout 23:54:49 UTC. Early closeout follows when one of these holds:

- both questions have an independent ruling;
- or Q2 meets an adjudicated obstruction and Q3 has a ruling.

## 8. Closing conditions

- **Q2.** Either a path turn independently adjudicated with both sides, a full account and its bracket; or the strongest certified endpoint with an adjudicated obstruction.
- **Q3.** Either the narrower bracket certified by the review on the repaired cover; or a ruling that it stays conditional, with the reason.
