# Stage 3 Validated Evolution Design, Addendum 6: The Three Expectation Bases, Stated Exactly

[Addendum 5](matched-pair-stage-3-evolution-design-addendum-5.md) separated replay validity from selected-record identity and offered a restore against an expectation. The independent [review of increment 3](matched-pair-review-stage-3-increment-3-2026-10-12.md) closed the main error and narrowed one claim: addendum 5 let an expectation of controls alone claim "the selected original", and said any self-consistent different record would be refused by it. Neither holds. This addendum states the three bases and exactly what each selects. It governs where it differs from addendum 5. Nothing here is implemented or measured. Every instance uses $c_f=1$.

## 1. What each basis selects

A restore reports one `identity_basis`. The value says how much the caller pinned from outside the record, and therefore how much the result may claim.

| Basis | The caller supplies | What it selects | What it does not select |
| --- | --- | --- | --- |
| `expected_record` | The SHA-256 of the complete record bytes | Exactly those bytes: origin, scalars, policies, controls, legs, step log, final-state claims | Nothing is left unselected. It is a content identity, not authentication |
| `expected_controls` | The complete bound control set, and optionally each origin path's identifier, charge and chain | Those fields only | The legs, the step log and the final-state claims; and the origin too, if the origin was not supplied |
| `record_only` | Nothing | No external original at all | Everything |

So the claim each may make is:

- `expected_record`: the returned state is the replayed state of the record the caller named, byte for byte.
- `expected_controls`: the returned state is valid, was produced under the controls the caller named, and started from the origin the caller named if one was named. It is **not** a claim to be one particular run. Two different records can satisfy the same expectation: the same controls with a different origin when the origin was not supplied, and the same controls and origin with different legs, for example a different requested end or a different cancellation point.
- `record_only`: the returned state is valid for the inputs the record contained. Nothing more.

Every result reports the record's actual full identity, the SHA-256 of the bytes read, and the fields that were expected and compared, whatever the basis. A caller who used a weaker basis can still see which record it got.

## 2. Corrections to addendum 5

- Section 2 of addendum 5 said a successful restore against an expectation "may state that they are the restored state of the selected record". That holds for `expected_record` only. For `expected_controls` the statement is the weaker one above.
- Section 3's table said a wholly self-consistent different record is "refused at the expectation". That holds for `expected_record`. Under `expected_controls` it is refused only if it differs in an expected field; a different run with the same controls, and the same origin where supplied, is **accepted**, by design.
- Section 5's test families are adjusted below.

## 3. What a seal certifies

The record builder checks a returned certificate against its sealed continuation and evidence before appending a leg. Those seals certify the accepted boundary: the controls, the accepted time, the controller state, the ledger, and each path's identifier, charge and chain at that boundary. They do not certify the rest of the leg's transcript: how the leg ended, how many attempts it made, the intermediate steps' tokens, or the chains after intermediate steps. Those are plain fields. They are recorded as claims and are checked the only way they can be, by driver-leg replay at restore.

The builder therefore makes two different kinds of check and the record says which is which: boundary fields compared with seals at append time, and transcript fields carried as claims for replay to confirm.

## 4. Tests

Known cases first, unchanged: a recorded run restored under each of the three bases returns chains, ledger and continuation equal to the original's, and a further leg from the restored state equals the same leg from the original state; likewise a multi-leg run and a grouped run.

Then, kept apart:

- **Raw corruption.** One byte changed, stored digest left alone: refused under every basis.
- **Full-identity refusal.** Each single change with the digest recomputed, and a genuinely different self-consistent record, restored under `expected_record` with the original's identity: every one refused, before replay.
- **Controls-basis refusal.** Each change to an expected control, and to the origin where the origin is expected: refused before replay. Changes to transcript claims with expected fields intact: refused at replay.
- **Weaker-mode intentional acceptance.** Under `expected_controls` without an origin: a different origin with the same controls, honestly recorded, is accepted, and the result reports basis, actual identity and the fields that were compared. Under `expected_controls` with an origin: the same controls and origin with different legs is accepted likewise. Under `record_only`: a slack-control change and a wholly different self-consistent record are accepted as themselves.
- **No usable partial state.** Every refusal, at the expectation or at any point of replay, returns no population beyond what the caller already had, no evidence and no continuation.
- **Builder.** A certificate whose boundary fields were altered after the driver returned it is refused at append. A certificate whose transcript fields were altered is appended as claimed and then refused at replay.

Unchanged from addendum 5: driver-leg replay; budgets and other controls recorded as finite exact tokens; no evidence or continuation read from disk; restore without replay returns neither; the checkpoint unit, its format and its outputs untouched; no cost claim.

**Falsifiers.** A result under `expected_controls` or `record_only` that claims to be a particular original run; a result that omits the actual identity or the compared fields; a refusal that returns usable state; or a restore under `expected_record` that accepts bytes other than those named.
