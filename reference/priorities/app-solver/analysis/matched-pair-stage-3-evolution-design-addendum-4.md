# Stage 3 Validated Evolution Design, Addendum 4: Workers, Replay and Persistence — the State, Identity, Evidence and Policy Map

The independent reviewer released design preparation for the two remaining increments and asked for the actual map before any runtime: how worker results are reduced deterministically, what cancellation and atomicity mean exactly, how evidence is reissued by replay and never read from disk as a trusted token, and what is bound. This addendum is that map. Nothing in it is implemented or measured. It describes the validated evolution driver only; the ordinary evolution entry points, the checkpoint unit and its version 7 format are not touched by either increment. Every instance uses $c_f=1$.

## 1. What exists now, in one process

These are the objects the two increments must respect. All are in the live solver after increment 2.

| Object | Holds | Who can make it |
| --- | --- | --- |
| Population | Per path: identifier, charge token, retained history. A history is a sequence of cubic segments, each with exact start and end tokens, coefficient tokens and position and velocity radius tokens | Anyone; it is plain data |
| Content chain of a history | SHA-256 over the history's full content: every segment's tokens in order | Recomputed from the history whenever needed |
| Evidence | Coupling token, step start and end tokens, and per path: identifier, charge, chain before the step, chain after it | Only the step producer, on a certified step. Sealed: no public constructor, no mutator |
| Step certificate | Status and refusal code, tokens of the step, pair list, group list, accounting, per-path boxes, published segment, declared radius, charged growth and its parts, evidence | The step producer |
| Ledger | Per path and axis: inherited radius, charged increment, total, and the two parts of the charge | The driver, from the certificate |
| Continuation | Bound controls: evolution policy token, coupling, initial and minimum step, increment and total budgets, attempt limits, cooldown length, pair policy token, declared pairs in order. Accepted state: accepted time, controller step, cooldown remaining, accepted-step count, ledger, evidence, and each path's identifier, charge and chain | Only the evolution entry point. Sealed |

Admission of a population, hypothesis H0, requires any supplied evidence to bind every path's identifier, charge and chain under the request's coupling, and requires evidence wherever a radius is declared. So a population with generated segments is usable only with the evidence the producer issued for exactly that content.

**The consequence that shapes persistence.** Evidence and continuation cannot be constructed from data. Nothing read from a file can become either. A restored run can hold evidence only if the producer issues it again.

## 2. Increment 3: workers

### What runs in parallel

Inside one step attempt, and inside one iteration of its enclosure loop, the work for each receiver is independent of every other receiver. It reads the same fixed inputs: all step boxes, all histories, charges, the coupling, the declared pairs. It produces that receiver's lower signs, root windows, individual kernel boxes, group bounds and acceleration box. Only that per-receiver work is given to workers.

Everything else stays on the calling thread, in its present order: admission, the past speed bound and its cache, the isolation test, the comparison of required and current boxes and their inflation, the step velocity test, publication, the content chains, the evidence, the budgets.

### The reduction

Each receiver's task writes only into its own private record: its pair entries in source order, its group entries in declared order, its acceleration box, and at most one refusal, namely the first one that receiver meets, with the pair entries it had produced up to that point. A receiver's acceleration box is summed inside its own task in the fixed order the serial code uses, individual sources in path order and then group intervals in declared order. No floating-point value is ever combined across receivers by the workers.

When every task has finished, the records are merged on the calling thread in receiver index order. If no receiver refused, the pair and group lists are the concatenation in receiver order, which is the serial order. If any receiver refused, the step's refusal is that of the lowest-index refusing receiver, and the lists are the complete entries of all lower receivers followed by that receiver's partial entries, which is exactly what the serial loop holds when it stops there. Records of higher receivers are discarded.

**Claim, to be tested and not assumed:** the certificate, the published segments, the chains and the evidence are byte-identical for every worker count and every schedule, because no result depends on which thread computed it or when. The only cost of parallel evaluation of a step that refuses is wasted work on receivers the serial loop would not have reached.

### Shared state

| State | Access during the parallel section |
| --- | --- |
| Step boxes, charges, coupling, declared pairs | Read only. They change only between iterations, on the calling thread |
| Histories | Read only, through the history layer's const interface, which the ordinary route already calls from worker threads |
| The producer's speed cache | Not touched. It is used before the loop, on the calling thread |
| The step certificate | Not touched. Written only in the merge |

An exception thrown inside a task is caught in that task, stored in its record, and rethrown in the merge at the lowest receiver index that has one, after all workers have been joined.

### Worker count is not a mathematical control

The request gains a worker count of at least one, with one as the default. It is recorded in the run's certificate as a fact about the execution. It is not bound into the continuation: a run may be resumed with a different count and must produce the same bytes. If the byte-identity claim above fails for any case, this increment is not acceptable, and the answer is not to bind the count.

### Cancellation and atomicity

Workers exist only inside one call of the step producer. That call joins every worker before it returns, whether it certifies, refuses or throws. No worker survives a step, and none is running when the driver looks at cancellation, which it does only after admission and after an accepted step, as now. Publication happens after the merge, on the calling thread, from a complete certificate, so a step is published whole or not at all, as now. The accepted population, evidence, ledger and time are still replaced together and only on acceptance.

### Evidence for acceptance

- Known first: worker count one reproduces every increment 2 output byte for byte.
- Byte-identical outputs of every evolution fixture command for worker counts 1, 2, 3, 4 and 8, each repeated, including grouped runs.
- A population large enough that several workers are busy at once, at least eight paths, with and without declared pairs.
- Refusals arising at the first, a middle and the last receiver, and at two receivers in the same step, each giving the serial certificate.
- Resumption with a changed worker count equal to the uninterrupted run.
- The six ordinary and four far-step fixture outputs unchanged.

## 3. Increment 4: replay and persistence

### Principle

A file holds claims. It never holds evidence. Restoring a run means running the same steps again from a population that needs no evidence, and comparing what the producer issues with what the file claims. The evidence and continuation of a restored run are the ones issued during that replay.

### The record

A new unit and its own file format, a *validated run record*. It does not use, extend or alter the checkpoint unit.

| Part | Content | Why |
| --- | --- | --- |
| Format token and version | A fixed string | Refuse anything else |
| Scalars | Field speed token `1`, coupling token | Mathematical controls |
| Policies | Evolution policy token, pair policy token, declared pairs in order | Mathematical controls |
| Controls | Initial step, minimum step, increment budget, total budget or its absence, attempts per step, lower-sign retries, cooldown length. Budgets as the exact decimal expansion of their binary64 values | Controller identity |
| Origin | Origin time token, and per path: identifier, charge token, and every segment of an exact prescribed history | The one population admissible without evidence |
| Legs | In order, for each call of the driver that extended the run: requested end token, accepted-step limit, how it ended, and how many steps it accepted | The controller's choices depend on the requested end, so the calls must be reproduced as they were made |
| Step log | For each accepted step: ordinal, start, step and end tokens, and each path's chain after the step | The claims replay is compared with |
| Final state claims | Accepted time, controller step, cooldown remaining, accepted-step count, and the ledger | Compared with the continuation replay returns |
| Record digest | SHA-256 over all of the above | Detects accidental corruption. It is not a trust anchor: anyone can recompute it |

The origin must be exact: zero radii on every segment and no analytic carrier. A record whose origin declares a radius is refused, because nothing could admit it.

The record is built from what the driver returned and nothing else: it is opened from an origin request and extended by one leg per returned certificate. A leg is accepted into the record only if its start is the record's accepted time, its input chains are the record's last chains, and its controls and policies equal the record's. It is written to a temporary file and renamed, and only from a returned certificate, so a record always describes accepted boundaries.

### Restore with replay

1. Read the file. Refuse an unknown format or version, a digest that does not match, a malformed token, an unknown policy token, a pair policy and declaration that do not agree, or an origin that is not exact.
2. Build the origin population and controls from the record. Admit it through the driver's ordinary admission. It carries no evidence and needs none.
3. For each leg in order, call the driver with that leg's requested end and limit, carrying the continuation the previous leg returned, and stop it after the recorded number of accepted steps where the leg was recorded as cancelled. This is the same entry point with the same inputs as the original run.
4. After each accepted step compare its start, step and end tokens and every path's chain with the step log. After each leg compare how it ended and its count.
5. At the end compare the accepted time, controller step, cooldown, count and ledger with the final state claims.

If everything agrees, the restore returns the population, the evidence and the continuation that replay produced. They are genuine: the producer issued them in this process. If anything disagrees, the restore refuses, names the first disagreement, and returns nothing.

Replay costs what the original run cost. That is the price of not trusting the file, and it is stated, not hidden.

### Restore without replay

Offered as a separate, explicitly named call. It returns the origin, the controls and the claimed step log as plain data, with no population beyond the origin, no evidence and no continuation. It cannot return generated histories as usable state, because without evidence the driver's admission refuses them, and it does not try.

### What each thing is bound by

| Item | Bound in process by | Recorded as | Verified on restore by |
| --- | --- | --- | --- |
| Full ancestry of every history | The chain, which covers every segment from the origin | Origin segments, and the chain after every step | Replay regenerates every segment; every chain compared |
| Charges and identifiers | Evidence members and continuation members | Origin | Admission, and replayed evidence |
| Coupling and field speed | Evidence coupling; continuation | Scalars | Used as replay inputs; a changed value changes the chains |
| Evolution and pair policy, declared pairs and order | Continuation | Policies | Used as replay inputs; token and declaration checks; a changed declaration changes the chains |
| Budgets, step limits, attempt limits, cooldown length | Continuation | Controls | Used as replay inputs; a changed control changes the step sequence or the outcome, and the legs and step log then disagree |
| Controller state: step, cooldown, ordinal | Continuation | Final state claims | Compared with the replayed continuation |
| Ledger | Continuation | Final state claims | Compared with the replayed ledger |
| Evidence | Sealed object | Not recorded at all | Reissued by replay |
| Continuation | Sealed object | Not recorded at all | Reissued by replay |

### Refusals

Unknown format or version. Record digest mismatch. Any malformed token. Unknown evolution or pair policy token, or a declaration that does not agree with the pair policy. Origin with a declared radius or an analytic carrier. Origin refused by admission. Any replayed step whose tokens or chains differ from the log. Any leg that ends differently or accepts a different number of steps. Final state that differs from the claims. In every case nothing is returned.

### Evidence for acceptance

- Known first: a record of a run, restored with replay, returns chains, ledger and continuation equal to the original's, and a further leg from the restored state equals the same leg from the original state.
- A multi-leg run, with a cancellation and a resumption, restored the same way.
- A grouped run restored the same way.
- One altered item at a time, each refused: a coefficient, a radius, a boundary token, a charge, the coupling, a budget, a step limit, the cooldown length, the pair policy, a declared pair, a leg's end, a step's chain, the final ledger, the format token, and the digest alone.
- Restore without replay returns no evidence and no continuation, and its generated-history claims cannot be passed to the driver as a population.
- The checkpoint unit's own fixture outputs and every other existing output unchanged, and no file of the checkpoint unit changed.

## 4. What stays open after both

- The validated policy, its controls and the continuation are still not bound into the ordinary evolution request or the checkpoint identity. That needs the checkpoint owner and is not part of this assignment.
- The content chain is recomputed over the whole history at every step. Replay inherits that cost. Changing how the chain is computed is deferred, as directed, until it can be reviewed without changing subject and reference together.
- Seals hold within one process. Across processes the only bridge is replay.

**Falsifiers for this design.** A worker count or schedule that changes any output byte; a step published before its certificate is complete; a restore that returns evidence or a continuation without having replayed; an altered record item that restores; or any change to a checkpoint unit file or output.
