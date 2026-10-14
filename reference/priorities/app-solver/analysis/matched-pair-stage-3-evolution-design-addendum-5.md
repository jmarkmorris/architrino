# Stage 3 Validated Evolution Design, Addendum 5: Replay Validity and Selected-Record Identity Are Different (P-R1)

[Addendum 4](matched-pair-stage-3-evolution-design-addendum-4.md) is the design map for workers and persistence. The independent [review of that map](matched-pair-review-stage-3-increment-2-live-and-successors-2026-10-12.md) accepted driver-leg replay and found one error in it, P-R1, with three related corrections. All are accepted as found. This addendum states the corrected design. Addendum 4 is left as it was sent; where the two differ, this one governs. Nothing here is implemented or measured. Every instance uses $c_f=1$.

## 1. The error

Addendum 4's binding table says of budgets, step limits, attempt limits and the cooldown length that "a changed control changes the step sequence or the outcome, and the legs and step log then disagree". That is false. A control can be slack. The reviewer's probe, on the live library, changes the increment budget from $0.001$ to $0.01$ on a grouped run: times, counts and every content chain are identical, and only the controls bound in the issued continuation differ.

So a record in which a slack control has been changed, and whose digest has been recomputed, replays cleanly. The replay is honest: the producer really does issue evidence for those steps under those controls. What the replay cannot tell is that this is not the run that was recorded. The same holds for any change that happens to give a self-consistent different run, including a changed origin or scalar when the step log is changed with it.

Two claims had been run together:

- **Replay validity.** The state a restore returns was issued by the producer in this process, from the inputs the restore actually used. Replay establishes this, and nothing else is needed for it.
- **Selected-record identity.** The inputs the restore used are the ones the caller meant: the run that was originally made and selected. Replay cannot establish this, and neither can a digest stored in the same file, because whoever can change the file can recompute the digest.

## 2. The corrected interface

There are two restore calls, and the difference between them is what they are allowed to claim.

**Restore against an expectation.** The caller supplies, from somewhere other than the record being restored, what it expects. Two forms are offered:

- an expected *record identity*: the SHA-256 of the complete record bytes. This selects exact bytes. It is a content identity and not an authentication claim: it says "this is the file I meant", not "this file is trustworthy";
- or expected *controls*: the complete bound control set, namely evolution policy token, coupling, field speed, initial and minimum step, increment and total budgets, attempts per step, lower-sign retries, cooldown length, pair policy token and declared pairs in order, and optionally the expected origin chains.

The restore first compares the record with the expectation, field by field for controls and byte for byte for an identity, and refuses on any difference before replaying. It then replays as in addendum 4. On success it returns the replayed population, evidence and continuation, and it may state that they are the restored state of the selected record.

**Bare replay.** The caller supplies only the record. The restore replays it and, on success, returns the replayed population, evidence and continuation together with the identity of the record it actually read and the controls it actually used. It states only that this state is valid for those inputs. It makes no statement that it is any previously selected run, and its result type says so in a field the caller must read: `identity_basis` is `expectation` for the first call and `record_only` for this one.

Both calls return no usable state on any failure. A mismatched record may be kept as data.

The expectation is never read from the record under restoration as its own authority. A record may carry its own digest for corruption detection, and the first call's expected identity may be compared with it, but the comparison that matters is with the bytes.

## 3. What a restore can and cannot detect

| Alteration | Raw record digest left stale | Digest recomputed, restore against an expectation | Digest recomputed, bare replay |
| --- | --- | --- | --- |
| Any byte | Refused: digest mismatch | n/a | n/a |
| A control that binds, so the replayed steps differ | n/a | Refused at the expectation, before replay | Refused at replay: step log disagrees |
| A slack control, replayed steps identical | n/a | Refused at the expectation | **Accepted**, as valid state under the changed control, with `record_only` and the changed controls reported |
| Origin, scalar or policy, step log unchanged | n/a | Refused at the expectation | Refused at replay: chains disagree |
| A wholly self-consistent different record | n/a | Refused at the expectation | **Accepted**, as that different run, with `record_only` |
| A step's chain, a leg's outcome, the final ledger or controller state | n/a | Refused at the expectation for an identity; refused at replay for expected controls | Refused at replay |

The two accepted cells are not defects. They are what bare replay means. The design does not assert that every changed control changes a generated history, and it does not assert that every alteration can be rejected without an external expectation.

## 4. Three related corrections

**Per-leg limits are operational inputs.** Addendum 4 listed a leg's accepted-step limit beside the bound controls. It is not a bound control of the continuation: the driver's continuation binds the policy, scalars, budgets, step limits, attempt limits, cooldown length and pairing, and not the requested end or the accepted-step limit of any one call. A leg's requested end, accepted-step limit and the point at which it was cancelled are recorded as operational inputs of that call, used to reproduce it, and are described as such. They are compared after replay through their effect: how the leg ended and how many steps it accepted.

**No cost claim.** Addendum 4 said replay "costs what the original run cost". Replay runs the same steps again. Whether its wall or processor time equals the original's is unmeasured, and the statement is withdrawn. What is known is the measured growth of step cost with retained history in the [cost receipt](../evidence/matched-pair-stage-3-increment-1-cost-receipt-2026-10-12.md), which replay will also incur.

**A returned certificate is not self-authenticating.** The certificate the driver returns is a plain structure whose fields a caller could alter before handing it to the record. Before a leg is appended, the record builder checks the plain fields against the two sealed objects the certificate carries, which a caller cannot construct or alter:

- against the sealed continuation: policy, coupling, initial and minimum step, budgets, attempt limits, cooldown length, pair policy and declared pairs, accepted time, controller step, cooldown remaining, accepted-step count, ledger, and each path's identifier, charge and chain;
- against the sealed evidence: coupling, and each path's identifier, charge and chain after the last step;
- and the chain of each returned history is recomputed and compared with both.

A leg whose plain fields disagree with its sealed objects is refused by the record builder. A leg with no continuation, which is what a refused initial population returns, is not an accepted boundary and is not appended.

This makes the record a faithful transcript of what the driver issued in the process that wrote it. It does not make the file trustworthy to a later process, which is the point of section 1.

## 5. Tests, replacing the persistence list of addendum 4

Known cases first, as before: a recorded run restored against its own identity, and against its own controls, returns chains, ledger and continuation equal to the original's, and a further leg from the restored state equals the same leg from the original state. The same for a multi-leg run and for a grouped run.

Then three separate families, kept apart because they test different claims:

- **Raw corruption.** One byte changed with the stored digest left alone: refused by both calls on the digest.
- **Selected-record changes with the digest recomputed.** One item at a time: a slack budget, a binding budget, the cooldown length, an attempt limit, the pair policy, a declared pair, the coupling, a charge, an origin coefficient, a step's chain, a leg's end, the final ledger. Restore against the original identity refuses every one. Restore against the original controls refuses every one that changes a control, and refuses the rest at replay. Bare replay refuses those that break replay and accepts the slack-control case, reporting `record_only` and the changed control.
- **A genuinely self-consistent new record.** A different run, honestly recorded. Bare replay accepts it as itself. Restore against the first run's identity or controls refuses it.

And: a certificate altered after the driver returned it is refused by the record builder; restore without replay still returns no evidence and no continuation; no file or output of the checkpoint unit changes.

## 6. What stays open

Authentication of a record across processes or machines is not provided and is not claimed. An expected identity moves the question to wherever the caller keeps that identity. Binding the validated policy, its controls and the continuation into the ordinary request and the checkpoint identity remains with the checkpoint owner.

**Falsifiers.** A restore against an expectation that returns state for a record differing from the expectation; a bare replay whose result claims to be a selected original; a slack-control change that the design text says must be caught without an expectation; an altered certificate appended to a record; or a restore that returns usable state after any failed comparison.
