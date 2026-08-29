# Machine Artifact Retention

Tracked machine records must remain reviewable, reproducible, and proportionate to their current consumer.

The repository retains authored sources, protocols, compact receipts, independently necessary fixtures, and runtime assets that a fresh clone must serve directly. Bulk search rows, raw ledgers, superseded result versions, benchmark output, and other regenerable analytical payloads belong under the ignored `.local-data/` hierarchy or in content-addressed artifact storage. A compact receipt must bind any untracked raw artifact by SHA-256 and record its byte and line counts, reproduction command, claim boundary, and relevant source or protocol identity.

Plainly: Git should retain the information needed to understand, test, and reproduce a result. It should not retain every verbose intermediate row merely because JSON was the producer's easiest output format.

## Enforced threshold

[`validate-machine-artifact-retention.mjs`](../../scripts/validate-machine-artifact-retention.mjs) checks every tracked JSON file. A record requires an entry in [`machine-artifact-retention-registry.v1.json`](machine-artifact-retention-registry.v1.json) when either condition holds:

- at least `100000` physical lines; or
- at least `10485760` bytes.

Each registry entry must name a current consumer, a regeneration command, the retention reason, and why a compact receipt is insufficient. The validator fails when a qualifying record is unregistered, a registered record disappears, or required justification is blank.

Plainly: an oversized machine record needs a named job in the current repository. Historical interest or possible future use is not enough.

## Version and evidence handling

- Superseded full outputs should leave the tracked tip once a compact correction history records their identities and consequences.
- A current raw result may remain tracked when an independent certificate or current runtime directly consumes its detailed rows and no smaller representation preserves that obligation.
- Tests should consume the smallest fixture that exercises their contract. A test that reads only summary values does not justify retaining unrelated raw ledgers.
- A producer that records runtime, timestamps, host paths, or other volatile metadata must not claim byte-identical regeneration. Its receipt should identify the stable comparison fields.
- Moving a raw record out of Git must not silently upgrade or weaken its scientific authority. Preserve its original claim boundary and falsifier.

Plainly: storage form and evidence grade are separate. Compacting a diagnostic neither validates nor invalidates its scientific conclusion.
