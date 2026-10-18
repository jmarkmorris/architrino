# Ordinary Integration, Gate O1 Version 2: Scratch Correction Receipt

This corrects the [O1 scratch candidate](matched-pair-ordinary-stage-1-scratch-receipt-2026-10-14.md) for finding O1-R1 of the [independent O1 review](../analysis/matched-pair-review-ordinary-stage-1-2026-10-14.md). It also tightens the working-set bound, as that review asked. Version 1, its tree, outputs and checker are preserved unchanged. Live `src/eom` is unchanged. Every instance uses $c_f=1$.

The evidence directory [matched-pair-ordinary-stage-1-v2/](matched-pair-ordinary-stage-1-v2/) holds:

- the two bridge sources and the fixture;
- [the whole change from version 1](matched-pair-ordinary-stage-1-v2/o1-version-1-to-version-2.diff) and [the whole library change against live](matched-pair-ordinary-stage-1-v2/live-to-o1-v2-library.diff);
- the version 2 checker, with the script that derives it from version 1 by exact replacement;
- the scripts, outputs and identities.

The scratch tree is `.tmp/eom-ordinary-integration-2026-10-14/o1v2-tree/src/eom`. Raw outputs are under `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1v2-scratch/`.

## O1-R1: what changed

The finding was correct. The bridge took the driver's population and evidence admission as full domain admission, but the speed and separation hypotheses are checked later, by the step producer. So an above-wake-speed or overlapping origin still issued a continuation on cancellation, and was masked as a resource halt under a tiny budget.

**The correction reuses the validated owner's own checks.** It adds no new physical rule. At the start of a run that is not resuming, the bridge asks the producer to certify one step of the shortest length the controller can attempt from that origin, which is the minimum step, or the whole span if that is shorter. The step is discarded. If the producer does not certify it, the request is refused with `EquationAdmissionError` code `unsupported_validated_domain`, naming the producer's code, cause and reason. This happens before cancellation, the memory budget, the diagnostic limit and the driver's own early returns, and nothing is issued.

The producer runs its hypotheses in order:

- H0 admission;
- H1 retained-past speed;
- H2 step boxes farther apart than the step;
- H3 lower sign;
- H4 root window, distance and transmitter-factor floors;
- H5 a priori enclosure;
- H1 step velocity;
- the increment and total budgets.

That covers the common-history, speed, separation, self-hit and near-field obligations together, as the producer defines them.

**Why the shortest step:**

- **Every hypothesis is easier to satisfy on a shorter step.** The step boxes, root windows, velocity box, presence band and budget increments all shrink with the step. So an origin refused at the shortest step cannot take any step.
- **The driver could not get further.** It starts no longer than the initial step and halves down to the minimum, so for such an origin it would halt without accepting a step anyway. The check removes only the accepted-boundary early returns for an origin the method cannot advance from.
- **Assumption.** This rests on monotonicity of the producer's interval tests. Outward rounding could in principle break it at the margin. No supported known case was refused here, and the reviewer's supported controls pass.

**What it leaves alone:**

- A population the driver's own admission refuses, such as foreign evidence, is left to the driver. It reports `initial_population_refused` before any early return, as before.
- A resumed boundary is not reexamined, because it was accepted. Its cancellation returns the boundary the caller already holds. Genuine resumption is preserved.
- Zero-length inspection is already refused by the ordinary admission.
- O2 record opening will use this same entry.

**New order:**

1. selection;
2. named control refusal and the start-snapshot refusal;
3. the matched-pair check and the ordinary `validate_request`;
4. a finite working-set bound;
5. the origin domain check;
6. the memory budget;
7. the driver.

## Working-set bound

The version 1 estimate assumed every history copy duplicated its segments. The actual history type shares segment storage between copies through a `shared_ptr`. Appending copies only the slot index and the tail block, which holds at most 64 segments (`History.cpp:770, 1123`).

The bound is now built from what the driver and bridge actually retain:

- **Per reachable attempt:** the attempt record, with its producer certificate holding one segment per path, every ordered pair, every group, local errors, evidence and ledger; plus three atomic-step copies (the attempt's, the driver run's and the ordinary view's), each with every path's history object, fingerprint and local error.
- **Per reachable accepted step and path:** one history version, holding its copied tail block of $((s_0+j-1) \bmod 64)+1$ segments, summed exactly, plus one index slot per block.
- **Reachable steps:** at most $\lfloor \text{span}/h_{\min}\rfloor + 1$, within the accepted-step limit. Computed in exact scaled-integer arithmetic.
- **Attempts per step:** at most one more than the number of exact halvings from the initial step that stay at or above the minimum, within the per-step limit.
- **Time tokens:** bounded by exact digit counts, with one more fraction digit per halving. At a large epoch the integer digits are counted.
- **Coefficient and radius tokens:** charged at 1,076 characters, the longest exact binary64 expansion. These outputs contain such tokens; the longest observed is 1,076 characters and the mean is 15.
- **Overflow:** any arithmetic that cannot be held, or a counter that could overflow, refuses with `validated_resource_bound_unavailable`. It does not saturate.
- **Certificate copies:** the bridge now moves the driver's certificate into the shared result rather than copying it twice.

This remains an admission bound with stated allowances, not a measured resident-set cost.

| Case | Version 1 estimate | Version 2 bound |
| --- | --- | --- |
| Three-path, four steps of $1/128$ | 40,818,697 bytes | 2,199,417 |
| Receding source, span 3, initial 1.5, minimum $10^{-4}$ | $\approx 7.2\times10^{14}$ | 82,737,215,647 ($8.3\times10^{10}$) |

**The second case still exceeds the maintained wire's 2 GiB ceiling.** It allows up to 30,001 reachable steps of 14 attempts each. With worst-case tokens, every segment is charged about 23 kB. By my arithmetic from the stated terms, a little over half the bound is retained tail-block copies, about $2\times30{,}001\times32.5$ segments. Most of the rest is the one segment per path that each of the roughly 420,000 reachable attempts retains in its producer certificate. That is a sound bound on the owner's actual retention under worst-case tokens, not slack in the arithmetic. Bringing such a run under 2 GiB needs one of these:

- a larger minimum step;
- a lower wire step limit;
- a driver that retains less per attempt (a frozen-owner change);
- a proven tighter token bound.

That decision belongs in O3. I did not trade soundness for a smaller number.

## Results

**Build.** Release, two build workers, owned-compute supervisor, exit 0, no compiler warning or error. Library SHA-256 `9acc53a31aeef374c34a250a4af3c196c6c84bce8542e0a9c20f778631c1f332`, fixture `56a47f84d0f31807a7e482be026ef110e3ef78839a459272f0bc3eeb0fab92bd`.

| Check | Result |
| --- | --- |
| **Reviewer's admission probe, unchanged, compiled against this archive** | Both supported known cases pass first. All six targets (receiver at speed 1.25 and coincident paths, each run normally, cancelled and under a one-byte budget) now throw `unsupported_validated_domain`, naming `VFS-H1-01 (retained_past_speed)` and `VFS-H2-01` |
| [Version 2 checker](matched-pair-ordinary-stage-1-v2/o1-v2-check-output.txt) | **57 of 57**, known cases first. That is every version 1 row except its four above-wake-speed rows, which recorded the behaviour O1-R1 rejects, plus three new rows: 16 unsupported-origin requests refused with the producer's code; no finite bound refused; the reviewer probe's output |
| Unsupported origins in the fixture | Source above wake speed, receiver above wake speed, coincident paths, and an increment budget that admits no step. Each is run normally, cancelled, at one byte and under the diagnostic limit: 16 explicit refusals, `VFS-H1-01`, `VFS-H2-01` or `VFS-BUDGET-0x` |
| Supported behaviour kept | Frozen three-path brackets ungrouped, grouped and at $h=1/256$. Row-for-row parity with the direct driver. Cumulative counts and callbacks. Resumption with a changed worker count, and with rejections (214 accepted, 42 rejected). The per-invocation diagnostic chain. Memory halts with no continuation. Foreign evidence and changed declarations refused by the driver's admission. Supported cancellation still issues its admitted origin |
| Workers | One and four workers byte-identical, SHA-256 `6700c1f43e5e4cd0…` |
| [Default comparison](matched-pair-ordinary-stage-1-v2/default-comparison.txt) | Known cases first. 73 identical, 11 equal after the named build-identity and binding paths, 0 different |
| [Field dispositions](matched-pair-ordinary-stage-1-v2/field-dispositions.txt) | All 103 fields: 18 translated, 4 checked, 81 refused unless default |

**One defect of my own instrument was found on its first run and is preserved** as `o1-v2-check-output-first-run-selector-defect.txt`. The budget-token row selected every name containing `-budget-`, which caught the four new `N-origin-budget-admits-no-step` cases. Those are correctly refused as a domain refusal, not as a token refusal, so the row reported 56 of 57. I narrowed the selector to exclude `N-origin-` names, with no change to the subject or to any output. The version 1 checker cannot run on version 2 outputs, because it reads the removed above-wake-speed rows by name.

## Independence and limits

The bridge, fixture, checkers, comparison and bound are mine. The independent elements are:

- the reviewer's admission probe, compiled unchanged;
- the frozen three-path brackets;
- the accepted Stage 3 checker, read unchanged.

The origin check costs one discarded producer step at the start of a run. That step falls under the bound's one-extra-step allowance.

## Live application, on release

As in version 1:

1. Re-observe the seven live preimages, including the two v8 refusal lines in `ProviderTransport.cpp` accepted in the O1 seam, and the Surface session's state.
2. Apply the v2 bytes with the file-edit tools.
3. Confirm `diff -rq` against this tree is empty.
4. Build into a separate live directory.
5. Rerun the fixture, the version 2 checker, the reviewer probe, the default comparison and the field dispositions.

**Falsifiers.** Any of these falsifies version 2:

- an unsupported origin that returns a continuation, an accepted-boundary success, or a resource or cancellation disposition;
- a supported origin refused;
- a resumed boundary reexamined or refused for its geometry;
- a working-set bound below what the run retains in the stated shapes;
- a saturated bound admitted;
- any change outside the named default paths.
