# Bounded interacting Surface qualification

## Selected task and fixed protocol

The operator selected Stage D on 2026-10-11 after Stage C engineering delivery. This record owns the bounded production calculation and integration; a separately authored [reference/review](equation-provider-stage-d-review-2026-10-11.md) owns independent mathematical comparison. The [staged design](../contracts/equation-provider-design-v1.md#11-delivery-sequence-and-acceptance) requires complete 3:3 ordinary constrained evolution, root/self accounting, refinement, independent interaction reference, retained history coverage and explicit unsupported-event halt. Stage E UI, Git publication, recurrence/stability and physical energy interpretation are outside this selection.

Use `canonical-surface/v1`, unrestricted speed with `boundaryPolicy: none`, fixed centered sphere radius $R=0.1$, positive coupling $K=10^{-6}$ and numerical $c_f=1$. Six ordered equatorial circular histories carry alternating charges $+1,-1,+1,-1,+1,-1$, speed $0.01$ and angular speed $0.1$. Their recorded decimal phases approximate $k\pi/3$; no exact symbolic rotational-symmetry theorem is inferred from those tokens. Preparation covers $[-0.5,0]$. Only that past is prescribed; the EOM solver determines the future on $[0,0.25]$. Delays are short enough that accepted future emissions must enter the finite run; explicit positive-time emission/source-carrier checks establish that feedback actually occurred.

Before targets, the separately authored reference checks an exact stationary antipodal interaction, tangent projection, curvature and a negative sign control using the unchanged `scripts/eom/oracle/reference_kernel.py`. At $R=0.1$, opposite charges separated by $0.2$ give delay $0.2$ and inward acceleration magnitude $25\times10^{-6}$; stationary tangent/curvature acceleration vanishes. Independent circular curvature magnitude is $v^2/R=0.001$. No force, mass or observer-level physics law enters the substrate calculation.

The finite refinement matrix holds equation, geometry, population and history domain fixed:

| Run | Maximum/initial step | Root tolerance | Acceleration, position, velocity, correction and Surface tolerances | Preparation segment width |
| --- | --- | --- | --- | --- |
| base | 0.01 | 1e-5 | 1e-4 | 0.02 |
| step | 0.005 | 1e-5 | 1e-4 | 0.02 |
| tight | 0.005 | 1e-7 | 1e-5 | 0.01 |

Minimum step is one eighth of the selected initial width. Each row is a bounded ordinary-chart calculation, with 80 attempts, 20 rejected attempts and a 2 GiB admission allowance and a 120-second watched-worker deadline. An outer supervised deadline covers cleanup. Failure remains a retained failed record; no unselected equation change, velocity controller or prescribed future substitutes for it.

The independent reference uses unchanged arbitrary-precision kernel/root functions and separately derived spherical projection/support. It computes all 30 ordered partner roots at selected retained segment midpoints, compares emission/factor and receiver-superposed boxes, checks computed-source feedback and compares nominal delayed acceleration residuals at interior segment points. The predeclared point residual acceptance threshold is $2\times10^{-5}$, two percent of the prepared curvature magnitude; it is a diagnostic threshold, not a bound derived from position/velocity errors. Reference precision is refined at 70 and 100 decimal digits. Root uniqueness and positive-delay self exclusion require the separately checked coherent subwake speed bound and old-memory sign; uploaded completeness flags alone cannot establish them.

Independent rational Bernstein polynomial bounds screen complete nominal dense segments for radius, tangency and speed, with recorded error-tube allowances kept separate. Production's validated solution/error/whole-slab gates retain their own existence/enclosure scope. The independent comparison is not a second production solver and does not independently reproduce a whole-slab Picard proof. Common-time retained histories are compared under refinement within summed published position/velocity radii. A changed deterministic model/source identity, absent population/root coverage, unsupported accepted publication, root/kernel mismatch, excessive residual, missing future-source feedback or failed refinement overturns the corresponding qualification.

## Ownership, bindings and preservation

Root owns `scripts/eom/fixtures/surface-stage-d-run.mjs`, this record and EOM/Surface status integration. The separate Codex reviewer owns `scripts/eom/fixtures/surface-stage-d-reference.py` and its review record. Existing production EOM, independent oracle and frozen definitions remain unchanged during this Stage D comparison. Current dirty changes from earlier stages are preserved; other writer identities remain unknown. Source/build/configuration identity binds the Stage C executable, which is rebuilt before use. Authored source and independent-reference hashes are recorded before target comparison.

Raw requests, responses, durable checkpoints and compact measured receipts remain under `.local-data/eom/surface-stage-d-2026-10-11/`; supervised logs remain under `.local-data/owned-compute/`. This established ignored storage is accepted local retained evidence, without an independently verified backup. Before closeout, inventory present artifacts with hashes, bytes, source/protocol identities and retrieval/reproduction status. No payload deletion, archive service, generated navigation write, worktree or Git publication is selected.

## Current disposition

✓ Done — The fixed production matrix and separately authored independent reference pass for the bounded declared-memory case. The rebuilt EOM receipt is `1d622342-42e7-40e7-bae7-a595d53e54a5` (exit 0, empty stderr, 0.637 s). Final numerical outcomes and limits are below; independent review owns adjudication, and owner integration/operational closeout are completed through their named instruments.

### Initial admission failure

**Measured:** lease `342470cf-a4ae-4ac8-aa4f-01bd4090acce` returns a durable halted prefix at time zero with `memory_budget_exhausted`. Direct read of `estimate_coupled_working_set_bytes` shows the Surface allowance scales with population, maximum attempts and persistent diagnostic workspace. The initial 200-attempt, 1 GiB preparation was refused before evolution. Original input/output/inspection/run receipt are preserved as `memory-admission-first.*.json` in the declared local owner, with the original checkpoint retained. The subsequent bounded matrix reduces the attempt ceiling to 80 and uses the wire’s existing 2 GiB maximum; no equation, population, history or accuracy threshold changes. The allowance is an estimate, not measured peak memory.

### Retained base and response capture

**Measured:** base lease `0080b7ad-6075-43d5-ac24-fc4d2f7efd00` completes 25 steps through time 0.25 with no rejected steps. The driver checks 36 ordered point pairs per snapshot, comprising 150 self exclusions and 750 single partner hits over the 25 snapshots; 300 solution certificates and 38,694 computed-source slab rows are retained. Production completeness flags are engineering evidence pending independent root/projection comparison. Its response is 53,416,829 compact bytes and 88,003,238 bytes in the retained formatted file. The subsequent 50-step refinement uses the same watched production CLI with stdout streamed directly to a retained file because the shared browser/process response buffer is bounded to 64 MiB. This scientific capture route does not widen that consumer budget or establish app delivery. Streamed future payloads retain original response bytes; existing originals and the step run’s first raw/formatted copies remain preserved.

The known-case-first source inventory verifies all 79 authored inputs and source digest `6c21ad55bce6904e906cc8e720a39092dd7f57a22e1012f480b18a497721fb13` before target comparison. The separate reference’s known-only pass precedes target reads; its frozen source digest is `20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976`, and the unchanged kernel digest is `a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6`.

An additional labeled negative control sets p1’s supplied past equal to p0’s while retaining distinct path IDs and opposite charges. This is a coincident-partner ordinary-chart obstruction, not another scientific target. Require explicit halt at the durable preparation boundary with zero accepted future, rather than an event continuation or a deleted contribution.

### Production matrix receipts

**Measured by the explicit-use run driver and retained CLI responses:** base, step and tight reach the requested time 0.25, preserve all six histories and produce durable checkpoints. Base uses 25 accepted steps, step uses 50, and tight uses 62 with smaller accepted widths near the final endpoint; all report zero rejected attempts. Smaller selected widths are accepted preparation/controller choices, not unexplained omitted failures. The final separately authored comparison passes with the scope and limits below.

| Case / supervised command suffix | Lease | Wall time / outcome |
| --- | --- | --- |
| `node scripts/eom/fixtures/surface-stage-d-run.mjs base` | `0080b7ad-6075-43d5-ac24-fc4d2f7efd00` | 26.216 s, exit 0 |
| `node scripts/eom/fixtures/surface-stage-d-run.mjs step` | `9777fb16-0309-481b-a6ed-3352c9e6f3ef` | 41.679 s, exit 0 |
| `node scripts/eom/fixtures/surface-stage-d-run.mjs tight` | `fea68030-3dd5-4c20-8480-02bedf8486af` | 63.267 s, exit 0 |
| `node scripts/eom/fixtures/surface-stage-d-run.mjs contact` | `9a507db1-13db-4e01-a515-5ba0f4f169b2` | 0.212 s, exit 0; expected durable zero-future halt |

Every command is wrapped by `node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 150 --`. Production/refinement stderr is empty; progress and compact receipts use supervised stdout. Contact reports `root_completeness_not_certified`, time zero, zero accepted steps and `durable: true`; its attempted interval [0,0.00125] is unresolved coverage, not a resolved contact trajectory. This establishes fail-closed behavior for this negative control, not every event class.

To reproduce without overwriting original observations, pass the qualified executable as driver argument three and a fresh repository-local evidence directory as argument four. Exact input/output identities are retained below. Source/configuration receipts are descriptive; do not reinterpret this short weak-coupling equatorial preparation as a generic shape, population, response, high-speed, long-time or physical-assembly qualification.

## Finite-window causal coverage

**Derived, separately checked:** the recorded initial principal angular gaps exceed 1.04. Initial partner chords therefore exceed $0.2(0.52-0.52^3/6)>0.099$. With a coherent speed bound $u=0.02$, each path moves at most 0.005 over the selected interval, so simultaneous partner separation remains greater than 0.089. For fixed reception time $T$, let $g(S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-(T-S)$. The reverse triangle inequality and source Lipschitz bound give $g(S_2)-g(S_1)\ge(1-u)(S_2-S_1)$, including any intermediate spatial coincidence. Thus the root function is strictly increasing. Radius at most 0.1001 gives $g(-0.5)\le0.2002-(T+0.5)\le-0.2998$, while $g(T)>0.089$. Exactly one strictly past partner root exists inside the declared memory for every reception time in the finite window; its ordinary transmitter factor is at least 0.98. For a coherent self history, the same speed bound gives separation at most $u(T-S)<T-S$, excluding positive-delay self hits. Coincident same-time self is excluded separately, without dropping a positive-delay hit.

The theorem uses coherent constrained solutions and their speed/radius bounds; production’s independently reviewed validated inclusion supplies the solution-existence premise, while the new reference checks the retained nominal polynomials and declared tubes independently. It is not a second full-slab existence proof. Roots before the supplied memory are excluded only under the explicit additional domain condition that the older histories also remain on this fixed sphere (or inside radius 0.1001): their separation is at most 0.2002 while delay is at least 0.5. No particular unprovided past is reconstructed or measured. Without that condition, qualification is restricted to the declared retained memory and cannot establish whole-past completeness.

**Measured precision routes by the retained point-ledger field inventory:** base has 750 binary64-outward/53-bit hits, step has 1500, and tight has 1852 plus 8 MPFR-directed-interval/128-bit hits. The tighter case therefore exercises the existing precision escalation without a new production arithmetic setting. The separate reference’s 70/100-digit comparison remains an independently authored precision check, rather than another execution of the production evaluator.

## Independent qualification outcome

**Measured:** frozen reference lease `d0c8bd89-2888-4486-a048-5ab75a8a69c9` exits 0 in 428.976 s. Its known analytical/sign/polynomial controls execute before target reads; stderr retains per-path/per-precision progress, and stdout records all comparison results. Source and oracle hashes match their pre-target identities. The raw report is retained as `independent-reference.json` beside the exact inputs and outputs.

| Independent measurement | base | step | tight |
| --- | --- | --- | --- |
| Dense midpoints | 300 | 600 | 744 |
| Independent partner-root evaluations at each precision | 1500 | 3000 | 3720 |
| Positive-time source roots at each precision | 606 | 1206 | 1926 |
| Maximum midpoint delayed ODE residual | 9.37777470e-11 | 2.35616948e-11 | 2.34772156e-11 |
| Full-segment polynomial plus tube radial bound | 4.29833589e-9 | 1.02981058e-8 | 1.97609711e-8 |
| Full-segment polynomial plus tube tangency bound | 3.83824098e-8 | 1.19195750e-7 | 3.81498589e-7 |
| Full-segment polynomial plus tube speed bound | 1.00004338e-2 | 1.00005140e-2 | 1.00007754e-2 |

Every independently reconstructed emission/factor, receiver-superposed net/tangent/discarded-normal/curvature/support/total vector and solution acceleration lies in its corresponding production interval. All retained future nominal polynomial segments pass the rational Bernstein screens with the declared position/velocity tubes; midpoints alone do not establish dense geometry. Reference root/factor changes between 70/100 digits are below 3.2e-59 and acceleration changes below 5.7e-64, compared with the predeclared 1e-45 threshold. These are arbitrary-precision measurements rather than independently rounded interval proofs of the transcendental reference arithmetic. Tiny reported normal/tangent leakage reflects point-reference arithmetic and is not a physical exactness claim.

Common-time comparisons cover 1740 path/time records for base versus step and 1542 for step versus tight. Maximum central position/velocity differences are respectively 2.419e-12/1.954e-11 and 8.655e-15/6.370e-13. The first comparison consumes at most 0.004535 of summed emitted position radii and 0.005300 of velocity radii; the second at most 1.278e-6 and 6.926e-6. Thus the refined central histories remain inside their combined certified uncertainty. Reported tube radii need not shrink monotonically when more segments propagate interval uncertainty; their passing overlap is the claim. Exact delayed midpoint residuals decrease under step refinement, but no whole-time residual supremum is inferred from those samples.

**Inferred bounded disposition:** this complete finite 3:3 ordinary Surface run, independently reconstructed interaction/projection, whole-segment geometry screening, refinement and fail-closed contact control satisfy the selected Stage D gate for this declared scenario. Reviewed production solution inclusion remains the existence instrument; the new reference supplies a mathematically different check of the stated numerical observables. The [separate review](equation-provider-stage-d-review-2026-10-11.md) owns independent acceptance. This is a short equatorial weak-coupling experiment with explicit support and supplied memory, not a generic arbitrary-preparation, shape, event or long-time qualification. No settled pattern, recurrence, stable assembly, free release, physical energy/radius/frequency law, sea constituent or independently verified old unknown trajectory is established.

## Independent review and owner integration

✓ Done — The [separate Stage D review](equation-provider-stage-d-review-2026-10-11.md) reads the final all-three comparison logs and terminal lease, independently verifies the frozen reference/oracle and six request/response hashes, and checks all 79 authored EOM inputs against the Stage C compiled source receipt. No actionable comparison blocker remains for this declared finite case. Root has integrated that disposition into the Solver and Surface manuscripts, strategy trackers, queues, Surface README and shared design/handoff packet. EOM-007 remains incomplete; SURFACE-002 is partial and queued for Stage E. Completed Stage D is retained as evidence rather than as a live task. No scientific campaign ranking or acceptance outside this scenario is changed.

The app dependency now includes bounded record consumption: complete raw qualification ledgers exceed the existing browser/process response buffer. Streaming the same EOM CLI supplied these scientific observations, without changing the shared transport budget. Stage E must implement a suitable bounded consumer path, accepted-only playback, returned-manifest matching, explicit evidence labels and viewport verification. Its initial preset can use this qualified sphere; interacting oblate/torus studies need their own qualification. This is an implementation recommendation, not authorization to start Stage E.

## Preservation receipt and retrieval

**Measured by `.tmp/eom-provider-stage-d/retain.mjs`, with the known SHA-256 `abc` control passed before inventory:** the local evidence family contains 31 inventoried files totaling 505,271,742 bytes, excluding its own 7899-byte inventory receipt to avoid circular self-hashing. The receipt is `.local-data/eom/surface-stage-d-2026-10-11/retention-receipt.json`, SHA-256 `e2a9d0c8ca5bd980c7a2b100cfd26f888e8b2d3adc2c9de0a40a387f7844dd32`; it enumerates every input/output/checkpoint, original failed admission, negative control, original step wire/formatted captures and independent comparison report with bytes, lines and hash. It also verifies the final driver, frozen reference and unchanged oracle identities. All observations remain at their original local owner; no deletion, relocation or verified independent backup is claimed. Local retention follows the operator's accepted `.local-data/` boundary in the [retention policy](../../../op/machine-artifact-retention.md#preservation-from-creation-through-closeout).

| Primary retained artifact | Bytes / physical lines | SHA-256 |
| --- | --- | --- |
| `base.response.json` | 88,003,238 / 3,548,920 | `7a62c923420a04c22926588399c0ae9d8dc1417b51c3e934327f3dc2109294e4` |
| `step.response.json` | 176,066,970 / 7,092,169 | `93f49894965f033996a82c8d9a58d274ccd220dbfccf4b4cfd09c6f8f7842acf` |
| `tight.response.json` | 132,647,856 / 1 | `a3a06cae65b1b082aad697a714154518669c203066bf723b1fd1775c577520b4` |
| `independent-reference.json` | 4718 / 1 | `7e33d5ea90fe250340c6386f74561fd15de2dab509e391d4190deae78235d842` |

Retrieve these files directly under `.local-data/eom/surface-stage-d-2026-10-11/`; compare `shasum -a 256` with the inventory before independent reuse. The frozen reference consumes the three request/response pairs; independent/human review also uses their complete diagnostic ledgers and the negative/original failure records. The driver commands and reference lease identify reproduction, with measured supervised wall costs of 26.216, 41.679 and 63.267 seconds for the successful production rows and 428.976 seconds for the independent comparison. Peak memory was not measured; admission allowances are not consumption measurements. Numerical refinements do not establish byte-identical regeneration: UUIDs, timing, checkpoint paths and environment receipts can differ. Retain originals and use a fresh local evidence owner for any reproduction. The inventory is a binding and retrieval aid, not a substitute for these large payloads; retained raw/formatted step copies are intentional preservation of original observations.

## Focused verification and operational closeout

**Measured:** `.tmp/eom-provider-stage-d/validate-docs.mjs` passes its link-extraction, TeX/code exclusion, heading-anchor and existing/missing-file controls before checking all twelve Stage D/design/Solver/Surface documents. Full-file whitespace and paired display delimiters pass. It retains the historical OPS-020 anchor issue unchanged from HEAD rather than treating it as a new Stage D finding. `node scripts/validate-priority-ranking.mjs` passes with 34 active owners and 14 aligned ranked rows; `node --check scripts/eom/fixtures/surface-stage-d-run.mjs` and scoped `git diff --check` pass. These are navigation, priority and source-hygiene checks, not additional numerical acceptance. The independent numerical reference and review own that acceptance above.

**Measured:** `node scripts/dev/owned-compute-supervisor.mjs closeout --owner-task "$CODEX_SESSION_ID"` returns `status: clear` for owner `01a12411-95e0-7a23-ba12-eabc27442b3c`, inspecting 2109 leases. The scientific jobs are terminal and the final comparison process group is closed. The separate review records its redundant base-only launch, exact owned cooperative stop and failed sandbox admission without treating their partial output as a numerical result. No job is intentionally detached at this handoff. Broader writer visibility remains unknown; no unrelated checkout work was reverted.

✓ Done — Stage D's selected finite calculation, frozen independent comparison, separate review, owner integration, original-evidence preservation and operational closeout are complete. Stage E app delivery remains open, as do broader shapes, high-speed/events, long-time dynamics, recurrence/stability, release and physical energy interpretation. No production EOM/oracle modification, new recurring test enrollment, generated regeneration or Git publication was performed by this Stage D task.

The final document check resolves 294 links across twelve files, including 60 targets new relative to HEAD, with only the unchanged historical OPS-020 issue. Both new scientific instrument files pass full-file `git diff --no-index --check /dev/null` with no diagnostics (exit 1 denotes the expected new-file difference). The final scoped tracked-file whitespace check also passes.
