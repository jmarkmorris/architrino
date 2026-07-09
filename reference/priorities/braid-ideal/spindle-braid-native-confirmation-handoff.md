# Spindle Braid Native Confirmation Handoff

Promotion status: `executed-candidate-rejected-2026-07-09`. This packet was the candidate-row handoff for `native_retained_history_promotion` (queue item 4). The run was executed on the tabled candidate and the operator REJECTED the retained-branch certificate in the run thread, first blocker `shape_loss_radial_under_support`; the run record is [fold-crossing-chart-spec.md Section 30](fold-crossing-chart-spec.md#30-spindle-braid-native-retained-history-confirmation-run-certificate-rejected-the-rest-state-disperses-the-pin-is-a-speed-attractor-2026-07-09) (owner script [spindle-braid-native-retained-history-confirmation-run.mjs](../../../scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs)). The gate stays fail-closed (`retainedBranchClaim=false`, `scoreMovement=no_score_increase`) awaiting the next named candidate row. Durable findings: the field-speed pin natively confirmed as a speed attractor; native cap fall-in. The packet below is retained as the executed scope contract.

## 1. The Named Candidate Row

Six architrinos (3 electrinos : 3 positrinos), three neutral antipodal axes, rigid co-rotation about one axis at one common frequency (the **spindle braid**; corpus definition in the Comparative Glossary and the Configuration Space chapter). Rest-state candidate parameters (units: $R_M=1$, $c_f=1$, $\kappa=1$; angles from the equatorial plane; azimuths about the axis):

| Layer | Radius $R_a$ | Tilt $\alpha_a$ | Azimuth of $+$ site | Speed $\beta_a=\omega R_a\cos\alpha_a$ |
| --- | --- | --- | --- | --- |
| Inner | $0.50$ | $-12°$ | $0°$ | $0.489$ |
| Middle | $1.00$ | $0°$ | $120°$ | $1.000$ (the $c_f$ rail) |
| Outer | $1.65$ | $+84°$ | $330°$ | $0.172$ |

$\omega=1$; each axis's $-$ site is antipodal to its $+$ site. Refinement note: the closure landscape is a shallow saddle here; a descent-refined variant ($q_I{=}0.47$, coupled tilt shift) scores $0.4531$ vs $0.4721$ — the native run should release from the TABLED parameters (canonical, documented) and may report drift toward the refined variant as a finding, not a discrepancy.

Provenance: unified-closure champion of the 2026-07-08 prescribed-worldline search ([fold-crossing-chart-spec.md](fold-crossing-chart-spec.md) Sections 15–26; owner evaluators and tests under `scripts/braid-ideal/` and `tests/`, all green). Key measured properties the native run should probe: (i) partner-channel closure residual $0.4721$ with one global $\kappa^*$; (ii) middle binary exactly at self-hit root birth (the clicker poised on the rail); (iii) hierarchy reversal (the core closes better with the caps than without); (iv) cap-dish polarity anti-alignment (swap measured anti-binding); (v) under axial drift: pinned cadence $\omega_0/\gamma$ (pump-plus-pin), electrino cap leads, finite optimal drift basin $u^*\approx0.5$–$0.65$.

## 2. What The Native Run Must Do

1. Build the six prescribed worldlines above as the SEED (held phase), then RELEASE into the native central-solver retained-history path (`AbsoluteHistoryRootRuntime` surfaces; no new solver, no schema change).
2. Retain full path history over a declared memory window covering at least several rotations; solve all causal roots (30 directed cross pairs + same-source policy per site) on the production runtime.
3. Report the retained-branch certificate rows (Section 3) on the same record. The decisive physics questions, in order: does the released braid hold its shape (tube residence vs Lemma T-style drift); does the middle binary hold the rail (the pin: pump up from below, self-hit brake above — the first NATIVE test of the field-speed pin); do the tangential residuals close as the prescribed evaluator predicts (internal cross-layer transfer)?

## 3. Acceptance-Chain Rows (all same-record; fail-closed)

- Active causal-root ledger $\mathcal A$ with per-root source-normal $D_s$, receiver-normal $D_T$, and branch strength $W^{\mathrm{rec}}$ (signed orientation available via `signedBranchOrientation`); positive source-normal Jacobian floor $\nu_J$ AND retained receiver-normal branch-strength floor/interval $\nu_{\mathrm{rec}}$ (per the 2026-07-08 receiver-normal audit — both floors co-equal).
- Inactive-root gaps; finite memory depth; declared same-source policy with self-root parity; declared coincidence handling ($d_0$ per the 2026-07-08 operator declaration, `jacobianFloorOrDeclaredStratum`).
- Force/action/event rows closing on the same record: tangential residual per layer, radial support per layer, $h_{\mathrm{act}}$ action ledger at any rail crossing (click transactions logged as root-count changes, $\pm1$ integer steps).
- Stability row: perturbation return (linear gap or return-map evidence) — the item-17 basin question in its native form.
- Fail-closed discipline: `retainedBranchClaim=false` and `scoreMovement=no_score_increase` until the operator accepts the certificate IN THE SAME THREAD as the run (the gate's anti-search-loop rule); any missing row = first-blocker report, not partial credit.

## 4. Failure Modes To Report Honestly

Shape loss (layers disperse); rail loss (middle slides off $c_f$ without pin behavior — would falsify the pump-plus-pin mechanism natively); tangential runaway (pump un-absorbed — the retention crux re-opened); caustic/fold events not matching the escapement reading; regulator dependence of any claimed closure.

## 5. Operator Steps

Run from a fresh thread with the codex goal-seeking wrapper; keep this packet as the scope contract; the acceptance decision (or rejection with first blocker) happens in that thread. On acceptance, queue item 4 flips to accepted and the archive call on superseded configuration families (operator's standing wish) ripens.
