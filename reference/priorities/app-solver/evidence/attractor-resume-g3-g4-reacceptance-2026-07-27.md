# Attractor Harness G3/G4 Reacceptance

Status: ACCEPTED FOR BOUNDED CAMPAIGN EXECUTION; DETERMINISM,
SERIALIZATION, ACCOUNTING, AND RELEASE-CLEARANCE CLAIMS ONLY (2026-07-27).

## Decision

The checkpoint-chunked ensemble harness is reaccepted under G3, and its
release-root manifest path is reaccepted under G4. The accepted implementation
is commit `287dd735b67e2f3e9407a7ca4ec2bc443c9b5cbc`; the implementation change
preceded this evidence-only acceptance change.

The harness now restores and advances cumulative chunk, accepted-step,
rejected-step, frame, resume-count, and wall-time accounting from the prior
manifest. Resume also requires exact agreement among the checkpoint,
manifest, and requested run identity, plus prior
`releaseRootClearance: certified_complete`. Its declared cross-chunk policy is
`integer-grid-decimal-endpoints/v1`.

Claim grade: measured current-source EOM-solver instrument acceptance. The
accepted claim is deterministic resume, cumulative accounting, exact
checkpoint-to-record serialization parity, sanitizer-clean execution, and
release-ledger propagation. It is not an independent numerical-correctness
claim for the EOM solver.

Plainly: stopping after one chunk and resuming now produces the same recorded
state as running both chunks continuously, while the bookkeeping continues
from the interrupted run rather than starting over.

## Frozen acceptance case

Both the release and sanitizer builds used:

- seed family `phase0-shell-v1`;
- two opposite-polarity paths;
- straight retained prehistories on $[-8,0]$ with segment width $0.02$;
- $c_f=1$;
- initial step $0.01$ and minimum step $0.0025$;
- two chunks of five accepted steps, ending at
  `0.10000000000000001`;
- root-time tolerance `1e-5`, root depth $192$, and two execution threads;
- uninterrupted execution compared with execution stopped after the first
  chunk at `0.050000000000000003` and then resumed.

Both final manifests reported two completed chunks, ten accepted steps, zero
rejected steps, 22 emitted frames, and
`releaseRootClearance: certified_complete`. The uninterrupted manifest
reported `resumeCount: 0`; the resumed manifest reported `resumeCount: 1`.
The resumed cumulative wall time strictly increased across the interruption.

Claim grade: measured instrument output. Falsifier: either build loses
certified release clearance, a cumulative counter resets or disagrees with
the stream, or the final state differs across uninterrupted and resumed
execution.

Plainly: the comparison exercises a real chunk boundary and a real process
restart, including the counters that previously reset.

## Exact comparisons

The separately run acceptance checker and a second standard-tool inspection
both found:

- final `checkpoint.bin` byte-identical;
- final `frames.jsonl` byte-identical;
- final `assembly-view-record.json` byte-identical;
- final `replay.borg-trajectory.json` byte-identical;
- deterministic census projections identical after removing only measured
  wall-time fields;
- every path id, retained-history fingerprint, segment time, coefficient, and
  error token in the evolved record exactly equal to the public checkpoint
  dump.

Release SHA-256 values were:

| Artifact | SHA-256 |
| --- | --- |
| Final checkpoint | `7a182eb6a12baef7076a2306d617e1f419b48a0c66ad47295d5e4143c2ad8d15` |
| Streamed frames | `31f762d3d27e22e1de18a765b5aae5bb708aaec93951ad7f4cd4c9fec9f7ccd6` |
| Evolved record | `f4bc608fde2c9868df5cea8b531febd2ec483405c7bc38e8e8fc748a71befc81` |

The sanitizer comparison independently passed the same obligations, with
checkpoint SHA-256
`a816a4c84dd4c781887444270083426506c4d7e4b632f2c1e9f9d72b4a96a3e6`.
Its frame SHA-256 was the same release value; its evolved-record hash differed
only because the concrete `engineBuildId` was
`287dd735b-sanitizer`.

Claim grade: measured serialization identity. These identity comparisons show
that the two execution routes publish the same bytes. They do not show that
the shared EOM calculation is physically or numerically correct.

Plainly: the restart did not change the stored history or display record, but
matching one implementation to its own uninterrupted run remains a
determinism result.

## Build and sanitizer provenance

- EOM source-tree aggregate SHA-256:
  `7ecb58c66240af97e19eebc2a1b618db8b123acf4bdb52ffee1ceb30f34f6298`.
- Harness source SHA-256:
  `3bff45cef962ac3f54d931af582e6bf724837761e3b1334b7116a9bdc8f7e7c3`.
- Checkpoint dumper source SHA-256:
  `b93d2e96ab11413e9a163c9c3026cf39a3a553ade852d0eb5831253f58860d93`.
- Acceptance checker source SHA-256:
  `7141ff8886992f6dc76da499531206b4c20a042879ad96525f2bab141270fdd7`.
- Release EOM library SHA-256:
  `f54b8f02e8a45d9507c81d17c1c8f1b754c23e6a1a0eaae9270e668053f5bd07`.
- Release harness SHA-256:
  `7307d1e4cc67415c62734a2a6e2982e5c06db547e1e65e2d93cb95579d15ed6d`.
- Sanitizer EOM library SHA-256:
  `a9f92933bf03600c368a5e28f281c6ab383e481aa2fb4ed9925df76f07699f4e`.
- Sanitizer harness SHA-256:
  `4e0c9c0c06d50205e43f587ba40ecc1b7b3edab89732b8b69d191d6205f05393`.
- Compiler: Apple clang 21.0.0 (`clang-2100.1.1.101`).
- CMake: 4.3.3.
- Fresh release fixtures: 6/6 passed.
- Fresh AddressSanitizer and UndefinedBehaviorSanitizer fixtures: 6/6
  passed.

A mismatched-run-id resume exited with status 1 before evolution and reported
`resume manifest identity does not match the checkpoint or request`.

Claim grade: measured build and negative-control evidence. Falsifier: a rebuild
from the identified source changes any required acceptance result or a
mismatched request advances rather than failing closed.

Plainly: both optimized and instrumented builds pass, and a checkpoint cannot
be continued under a different declared run identity.

## Claim boundary and handoff

G3/G4 acceptance permits the Braid Program to use this bounded harness
capability subject to every remaining campaign gate. It does not satisfy the
G5 independent-oracle duty, extend close-approach root completeness, serialize
joint affine retained histories, or authorize Campaign 1 execution by itself.

No persistence, binding, stability, energy closure, crossing, rebound,
recapture, breathing, fate, particle identity, physical realization, or
canonical EOM authority is established.

Plainly: the execution instrument is ready, but the scientific run remains
closed until its separate root and oracle obligations pass.
