# AAA Core Accepted-History Stream v0

## Status and authority

- **Contract:** `aaa_core_accepted_history_stream/v0`
- **Lifecycle:** accepted at synthetic in-process broker and consumer-conformance grade
- **Logical dependency:** [`aaa_core_path_interchange/v0`](path-interchange-v0.md)
- **Codec dependency:** [`aaa_core_codec_registry/v0`](codec-registry-v0.md)
- **Machine control record:** [`aaa-core-accepted-history-stream.v0.json`](aaa-core-accepted-history-stream.v0.json)
- **Contract schema:** [`src/contracts/aaa-core-accepted-history-stream/v0/schema.json`](../../../src/contracts/aaa-core-accepted-history-stream/v0/schema.json)
- **Executable broker and harness:** [`src/aaa-core/accepted-history-stream-v0.mjs`](../../../src/aaa-core/accepted-history-stream-v0.mjs)
- **Focused tests:** [`tests/aaa-core-accepted-history-stream-v0.test.js`](../../../tests/aaa-core-accepted-history-stream-v0.test.js)
- **Authority boundary:** immutable accepted-prefix transport semantics, subscription cursors, bounded buffering, acknowledgement, replay, reconnect, seal, halt, and deterministic receipt conformance only

Plainly: this contract defines how accepted EOM history moves through Core without gaps, hidden drops, or changed identities. It does not implement a production network service or decide whether the EOM should accept a path.

## Owner sequence

```mermaid
sequenceDiagram
    participant EOM as EOM solver
    participant Core as AAA Core broker
    participant Potential as Potential consumer
    participant Audit as History-audit consumer

    EOM->>Core: Commit immutable accepted chunk
    Core->>Core: Verify source, sequence, predecessor, time, and identity
    Core-->>Potential: Deliver through bounded subscription
    Core-->>Audit: Deliver through bounded subscription
    Potential-->>Core: Acknowledge checked prefix
    Audit-->>Core: Acknowledge independently checked prefix
    alt a connected queue reaches its declared limit
        Core-->>EOM: Backpressure; admit no new unique chunk
    end
    EOM->>Core: Seal complete prefix or halt exactly
    Core-->>Potential: Deliver exact terminal event after retained prefix
    Core-->>Audit: Deliver exact terminal event after retained prefix or reconnect
```

Plainly: the EOM solver produces accepted history; Core verifies and distributes it; each consumer checks and acknowledges its own prefix. A slow client can pause intake, but Core cannot discard that client's missing history and pretend it stayed current.

## Producer contract

Only an immutable `path_chunk` whose `authority.level` is `accepted_history`, whose representation profile is `authoritative_history`, whose producer is the EOM solver, and whose identity appears in the bound complete path-set manifest may enter the stream. Sequence numbers begin at zero and form one contiguous integer prefix. Each chunk names the exact prior content hash, and its accepted interval begins at the current producer watermark and ends at its own `acceptedThroughT`.

The broker derives `producerAcceptedThroughT` from the highest contiguous committed chunk end. An exact repeat of a sequence and content hash is an idempotent no-op. Reusing a sequence with a different identity, skipping a sequence, changing the predecessor, changing the source binding, or opening a time gap fails before any watermark advances.

Plainly: Core accepts package 0, then package 1 pointing to package 0, and so on. A second copy of the same package is harmless, but a changed, missing, or out-of-order package stops the authoritative stream.

## Subscription and watermark contract

Each subscription binds the stream source and declares `maxBufferedChunks` and `maxBufferedBytes`. It reports three different boundaries:

| Watermark | Meaning |
| --- | --- |
| `producerAcceptedThroughT` | Highest contiguous accepted chunk committed by Core |
| `consumerDeliveredThroughT` | Highest contiguous chunk placed in that consumer's bounded queue |
| `consumerAcknowledgedThroughT` | Highest contiguous chunk independently checked and acknowledged by that consumer |
| `lagT` | Producer watermark minus consumer acknowledgement watermark |

Plainly: a chunk may exist in Core, sit in a client's queue, or already have been checked by that client. Those are distinct states, so the consumer's display or analysis cannot claim the producer's newest time merely because Core has received it.

Acknowledgement removes only the queue head and must follow sequence order. Disconnect discards unacknowledged delivery from that connection, not from the retained broker log. The reconnect cursor contains the last acknowledged sequence and exact chunk hash. A matching cursor resumes at the next sequence; a stale or invented cursor is refused.

Plainly: reconnect starts from the last package the client can prove it processed. Packages that were merely in transit are delivered again, which is safe because duplicates are identity-checked.

## Bounded backpressure

A subscription enters backpressure when its queue count or bytes reaches its declared limit. While any connected required subscriber is backpressured, an exact duplicate remains an idempotent no-op but a new unique producer chunk is refused with `backpressure_active`. A chunk larger than a subscriber's entire byte allowance is refused with `buffer_limit_exceeded`. Ordered acknowledgement frees capacity; retained replay may immediately refill it before the pressure clears.

Plainly: the broker stops the producer before memory limits are exceeded. It does not solve overload by dropping, overwriting, or coarsening authoritative history.

## Seal and halt

A producer seal is valid only when the bound manifest is complete, every manifest chunk has been committed, the final sequence equals the end of the contiguous prefix, and the accepted-through watermark equals the manifest end. Each consumer receives the seal only after it has acknowledged that full retained prefix. Its receipt hash binds the consumer identity, source binding, ordered acknowledged chunks, and exact terminal event.

A halt contains `code`, `detail`, `failedSequence`, and `acceptedThroughT`. The failed sequence must be the next uncommitted sequence and the watermark must equal the preserved accepted prefix. Every subscriber receives the exact same halt after draining its retained prefix; a disconnected subscriber receives it after reconnecting with a valid cursor. Neither seal nor halt permits a later producer event.

Plainly: normal completion proves the whole declared source arrived. Failure preserves everything accepted before the stop and gives every client the same reason and boundary, even if that client was offline when the stop occurred.

## Two independent consumers

The positive conformance harness drives the same broker delivery through two separately implemented observers:

| Consumer | Independent check | Receipt form |
| --- | --- | --- |
| `potential-consumer` | Sequence, predecessor, source binding, and contiguous accepted-time prefix | Ordered chunk summary and acknowledged-through watermark |
| `history-audit-consumer` | Record content identity, predecessor, sequence, and a rolling ordered ledger digest | Row count, ledger digest, and acknowledged-through watermark |

The observers agree on chunk count, acknowledged coverage, and terminal event, but their receipts deliberately have different identities because they contain different consumer-specific evidence. Agreement demonstrates implementation parity on the fixture; it is not an independent scientific validation of the EOM histories.

Plainly: two clients reach the same stream boundary by separate bookkeeping routes. That checks the delivery rules, not the physics inside the chunks.

## Fixture coverage

The sealed fixture contains three hash-valid `aaa_core_path_interchange/v0` chunks over normalized $T=0$ through $T=3$ with $c_f=1$. It exercises two subscriptions, one exact duplicate, a one-chunk audit buffer, backpressure entry and release, audit-client disconnect, cursor-bound replay of two retained chunks, full acknowledgement, seal, and deterministic replay into the same two receipt identities.

The halt fixture accepts and acknowledges the first chunk, disconnects the audit client, records the EOM halt before sequence 1, delivers that halt to Potential, reconnects the audit client, and requires byte-for-byte field equality of both terminal payloads. Twelve negative controls cover a missing sequence, broken predecessor, conflicting duplicate, noncontiguous time, source rebinding, a unique chunk at pressure, an oversized chunk, out-of-order acknowledgement, stale reconnect cursor, premature seal, changed halt expectation, and a producer event after terminal state.

Plainly: the small stream completes once and fails once. Both paths are replayable and every named corruption or resource-boundary violation has an executable refusal.

## Validation and claim boundary

Run:

```bash
node src/aaa-core/accepted-history-stream-v0.mjs
node --test tests/aaa-core-accepted-history-stream-v0.test.js
node scripts/check-potential-live-timespace-pipeline-contract.mjs
```

Passing these checks establishes measured synthetic software conformance for the broker state machine and both consumers. It does not establish production network transport, durable storage across process failure, multi-host ordering, authentication, authorization, throughput, latency, resource cost, live EOM integration, Potential kernel correctness, or any physical result.

Plainly: the stream rules now work in a controlled in-process test. Production service and performance work remain separate, measurable obligations.

## Remaining boundary

CORE-004 closes the shared accepted-history sequencing and subscription contract. It does not close stable query/cache identity and publication behavior in CORE-005, heterogeneous compute in CORE-006, production experiment imports in CORE-007, the application SDK in CORE-008, or any deployed service.

Closure goal: use the accepted source, codec, and stream contracts to define immutable query, transform, cache, and publication identity without allowing derived products to raise source authority.
