# Borg Eight-Path Accepted-Initial-History Promotion — Apple M3 — 2026-07-16

## Verdict

- Claim grade: `measured`
- Promotion: `PASS-UNDER-ACCEPTED-INITIAL-HISTORY-CONTRACT`
- Accepted-initial-history strict ladder: `PASS`

## Eight-Path Promotion Evidence

- Population: deterministic prefix `1001`–`1008`
- Retained-history construction: certified exact inertial polynomial per path
- Maximum initial causal delay: about `79.36964`
- Current outward-rounded initial-history depth for this seed: `79.86`
- Refinement steps: `0.01`, `0.005`, `0.0025`, and four-thread `0.0025`
- Maximum state delta: `6.291495102672684e-14`
- Thread parity: byte-identical
- Persistent worker: same process for all refinement cases
- Evolution claim: `eom-evolution-conditioned-on-accepted-initial-history`
- Publication begins with the first atomically accepted EOM extension from $T=0$; the input history is never relabeled as EOM output.

The raw local ladder record has SHA-256 `76c35c91a1ba0fa36fa427b0ff3d4d126c7772842a78d459b314e3fcd55ef25c`. The resumed checkpoint has SHA-256 `0752571054dfece4976ae0ddfd909f0dc9c2f38e1a7b281725e764c1483a4bba`. The rebuilt Borg EOM worker has SHA-256 `bb9d857bce48a7789b13b363521c3a8fe721e08bcab4f31edec78e5b55acf33e`.

## Falsifier

Borg promotion does not advance if the artificial retained history lacks complete causal coverage, its certificate or provenance does not match the selected population, the refinement ladder exceeds its declared state tolerance, one-thread and four-thread histories differ, or the app presents the artificial input history as EOM-produced output.
