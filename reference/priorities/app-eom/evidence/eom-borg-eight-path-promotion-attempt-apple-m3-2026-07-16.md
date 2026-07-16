# Borg Eight-Path Promotion Attempt — Apple M3 — 2026-07-16

## Verdict

- Claim grade: `measured`
- Promotion: `FAIL-CLOSED`
- Seed-cut strict ladder: `PASS`
- Seed-free $T=90$ checkpoint: `NOT PRODUCED`
- Post-burn-in strict ladder: `NOT RUN`
- Borg compatibility retirement: `OPERATOR-AUTHORIZED; NOT PROMOTION EVIDENCE`

The shared checkout acquired concurrent uncommitted deletions of the Borg
compatibility query branch and runner files while this run was active. This
campaign did not make or restore those changes. The operator authorized the
retirement independently; it was not caused by, and is not evidence of, a
promotion pass.

## Engine Diagnosis

The retired 16-path failure at `[0.06,0.07]` was not regulator divergence.
The base finite-width event certificate for `1004<-1013` returned
`insufficient_history_depth` when a causal root entered through the oldest
retained-history boundary. With no accepted event impulse, no regulator
refinement series existed. The regulator wrapper masked that upstream failure
as `regulator_convergence_failed`.

The engine now propagates the base event failure code. A manufactured
`[0.06,0.07]` boundary-entry regression rejects atomically with
`insufficient_history_depth`; a separately retained completed regulator ladder
still tests genuine `regulator_convergence_failed` behavior.

## Eight-Path Promotion Evidence

- Population: deterministic prefix `1001`–`1008`
- Retained-history depth and burn-in target: `90`
- Maximum initial causal delay: about `79.36964`
- Seed-cut steps: `0.01`, `0.005`, `0.0025`, and four-thread `0.0025`
- Maximum seed-cut state delta: `6.291495102672684e-14`
- Thread parity: byte-identical
- Persistent worker: same process for all seed-cut cases
- Best accepted strict checkpoint: $T=34.4940625$
- Continuation controls: initial step `0.5`, minimum step `0.0003125`, all root
  and state/correction tolerances `1e-8`, four threads
- Continuation result: process timeout after `600.174` seconds with no new
  accepted boundary
- Post-burn-in result: not reached because the retained history still contains
  seed material

The raw local ladder record has SHA-256
`76c35c91a1ba0fa36fa427b0ff3d4d126c7772842a78d459b314e3fcd55ef25c`.
The resumed checkpoint has SHA-256
`0752571054dfece4976ae0ddfd909f0dc9c2f38e1a7b281725e764c1483a4bba`.
The rebuilt Borg EOM worker has SHA-256
`bb9d857bce48a7789b13b363521c3a8fe721e08bcab4f31edec78e5b55acf33e`.

## Falsifier

Resume an accepted eight-path checkpoint under the declared strict controls,
reach $T=90$ within an explicit observed resource envelope, verify that no seed
segment remains, and pass the unchanged `0.01`, `0.005`, `0.0025`, and
four-thread `0.0025` post-burn-in ladder. Until then Borg promotion remains
closed.
