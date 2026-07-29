# Master-Equation Closure Work Queue

This is the canonical execution ledger for the characteristic-tail action
adjudication and the three jointly accepted Master-Equation closure
obligations.

## Ranked Next Objects

1. `characteristic_tail_action_adjudication` — [MEC-001](#mec-001--characteristic-tail-action-adjudication). Status: `Awaiting verification`.
2. `causal_wake_update_law` — [MEC-002](#mec-002--causal-wake-update-law). Status: `In progress`.
3. `finite_coincident_same_transmitter_transition` — [MEC-003](#mec-003--finite-coincident-same-transmitter-transition). Status: `Deferred / blocked`.
4. `same_update_conserved_accounts` — [MEC-004](#mec-004--same-update-conserved-accounts). Status: `Deferred / blocked`.

## In progress

### MEC-002 — Causal wake update law

- **Status:** In progress
- **Priority object:** `causal_wake_update_law`
- **Request / acceptance:** Derive the smallest independently evolving wake state with emission, propagation, reception, maturity, and boundary updates declared before evolution; on regular charts it must reduce to the canonical transmitter-side acceleration.
- **Evidence / blocker:** The kinematic emission/transport substate exists; maturity, reception transfer, conserved accounts, and account-bearing boundary law remain missing.
- **Completion:** One Architrino-native update evolves without future receiver history or residual-defined wake state and passes the regular-chart reduction.

## Deferred / blocked

### MEC-003 — Finite coincident same-transmitter transition

- **Status:** Deferred / blocked
- **Priority object:** `finite_coincident_same_transmitter_transition`
- **Request / acceptance:** Derive finite, unique, open-neighborhood continuation through complete coincident same-transmitter root birth on MEC-002.
- **Evidence / blocker:** Depends on MEC-002 and must be accepted jointly with MEC-004.
- **Completion:** Continuation is regulator-path independent and is not an event-only patch.

### MEC-004 — Same-update conserved accounts

- **Status:** Deferred / blocked
- **Priority object:** `same_update_conserved_accounts`
- **Request / acceptance:** Derive motion, wake, and boundary accounts for energy, momentum, and angular momentum on exactly the MEC-002 update.
- **Evidence / blocker:** Depends on MEC-002 and must be accepted jointly with MEC-003; account maps cannot import mass-based single-architrino formulas or be defined by residual cancellation.
- **Completion:** All three accounts close on the same update under predeclared maps and independent checks.

## Awaiting verification

### MEC-001 — Characteristic-tail action adjudication

- **Status:** Awaiting verification
- **Priority object:** `characteristic_tail_action_adjudication`
- **Request / acceptance:** Freeze one characteristic-tail candidate and
  execute an independently checked complete receiver-plus-transmitter
  variation before downstream simulation or promotion work.
- **Evidence:** The receiver-gradient identity survives. Direct variation and
  an independently authored finite-difference action check reproduce the
  future-transmitter coefficient on the regular cross-worldline sector.
- **Blocker:** `CT-FH-1` retains all nontrivial $i=j$, $t>s$ self-history terms
  while excluding only $t=s$. For every $C^1$ history the separation approaches
  zero at that diagonal, contradicting the declared positive separation floor,
  and the finite-width kernel gives a nonintegrable self contribution. The
  displayed static transverse histories are therefore not admissible histories
  of the whole frozen action.
- **Completion:** Freeze a finite self-diagonal or core prescription, name it
  as a new candidate if it changes `CT-FH-1`, and independently vary that
  complete functional. Record whether the future coefficient and transverse
  control survive or are removed under the repaired pair, endpoint, and
  variation conventions, then issue `CONFIRMED` or `OVERTURNED`.

## Verified

No rows.
