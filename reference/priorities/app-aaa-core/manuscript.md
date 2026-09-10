# Shared Path Services and Source-Bound Computation

## 1. A common computational boundary

### 1.1 Paths, products, and scientific authority

A collection of applications can share path data without sharing every interpretation of those data. An accepted trajectory, an authored curve, an experimental reconstruction, a display approximation, and a derived map have different meanings even when they use the same coordinates. A common service boundary must preserve these distinctions while supporting construction, validation, encoding, selection, computation, and exchange.

The architecture considered here is a headless platform: its users interact through consuming applications rather than a separate public platform screen. Its central object is a versioned logical path representation, with purpose-specific encodings and explicitly bounded products. The local contracts establish logical identity and synthetic software-conformance requirements. They do not establish production storage, transport, throughput, a scientific kernel, or a physical result.

Scientific authority remains with the owner of the declared calculation. The EOM solver owns forward evolution, step acceptance, causal-root obligations, and continuation semantics. A prescribed-path provider owns the mathematical meaning and evidence grade of its analysis. The shared platform can validate that the declared inputs and outputs match a contract; that validation cannot demonstrate that the calculation describes nature. Within $\mathbb{A}\mathbb{A}\mathbb{A}$, observer-level quantities and recovered laws remain distinct from substrate dynamics. A field-like map or a reaction ledger supplies no additional primitive law merely by passing an interface check.

### 1.2 Shared services and application composition

The architecture separates eleven responsibilities: path construction, validation and identity, codec registration, codec provision, storage, indexing, streaming, queries and transforms, compute dispatch, publication, and client access. These are logical responsibilities that may be composed in several deployment postures. They are not eleven independently deployed services or a mandatory processing chain.

The local implementation inventory records six headless modules for path interchange, codec negotiation, accepted-history streams, query and publication behavior, the thin client, and Potential sampling. It records five structural schemas for the first five contracts. These are source-attributed implementation statements; the inventory alone does not establish current executable behavior. The same boundary also leaves future storage, indices, device scheduling, and remote operation incompletely specified.

The recorded application composition is uneven by design. Lorentz Geometry uses the shared Potential sampling boundary for an existing display-only surface. Topo has a thin Potential consumer, while its existing signed ordinary wake-intensity map retains its own declared meaning. Equation Mapping participates in a client conformance example and can retrieve a published product; that example does not establish that its browser application already uses the client. EOM integration is an adapter design, and other applications remain possible consumers. A study-pipeline interface would belong to a separate application, with Core supplying reusable operations beneath it.

## 2. Logical paths and immutable identity

### 2.1 The five record classes

The path-interchange contract has five record classes: path-set manifests, immutable path chunks, stream envelopes, views, and derived products. A manifest identifies membership, history kind, source coverage, coordinate frame, units, interpolation, numeric policy, provenance, authority, and an ordered chunk list. A chunk holds declared path samples and event boundaries over a specified interval. A stream describes an accepted prefix and its terminal condition. A view identifies a selection and ordered transformations. A derived product carries its own content while binding the source and view that produced it.

The common envelope contains a schema identifier, record type, record identifier, version, content identity, and payload. Canonical identity sorts object keys recursively and preserves array order. If $C$ denotes this declared canonical serialization, $H$ its SHA-256 digest, and $r^{-}$ the record with only its own content-hash field removed, the contract's identity rule is

$$
h(r)=H\bigl(C(r^{-})\bigr).
$$

This equation specifies a content-binding convention. It does not prove mathematical correctness or independently establish the truth of provenance labels. Identity construction also avoids a circular dependency: a chunk binds the manifest's record identifier, the manifest lists ordered chunk identities, and views and products subsequently bind the completed manifest identity. They do not require each other's unfinished hashes.

### 2.2 Coverage, frames, and authority

A path set declares absolute-time coverage with a start, end, and accepted-through watermark. The basic ordering is

$$
T_{\mathrm{start}}\leq T_{\mathrm{accepted}}\leq T_{\mathrm{end}}.
$$

Complete coverage requires the accepted-through watermark to reach the declared end; subsequent sealing has additional source and product conditions. The coordinate contract uses declared right-handed Euclidean axes, normalized wake speed $c_f=1$, and explicit length, time, and scale-map identities. Interpolation and approximation bounds remain part of the data contract. Event and branch boundaries are retained explicitly rather than smoothed away by a representation change.

The software authority ordering distinguishes untrusted data, display-only data, diagnostic or derived-analysis data, prescribed or observer data, and accepted EOM history. Equal ordinal levels do not equate an authored history with an experimental reconstruction. They express software permissions, not equal scientific evidence. In the v0 history-kind rules, only an accepted EOM history can permit solver continuation; prescribed and observer histories cannot. A derived product never acquires continuation permission.

The broader architecture also sketches authored past paths as possible EOM setup inputs. That design is not a license to relabel a prescribed v0 record as accepted history. Admission of an authored setup and acceptance of a continuation are separate obligations, with any admissible setup route still requiring the EOM owner's explicit contract. The common platform cannot settle that distinction by raising a source's authority flag.

### 2.3 Precision and experimental provenance

Three representation profiles separate uses of the same logical model. Authoritative solver interchange permits declared binary64, decimal, or interval representations at 53–256 bits and requires zero added approximation under that profile. Precision-bounded analysis permits binary32, binary64, decimal, or interval forms at 24–256 bits with a finite nonnegative error declaration. Display streams permit binary16, binary32, or quantized integers at 8–24 bits with bounded approximation and no continuation authority. Zero added encoding error does not remove source interpolation error, measurement uncertainty, or a scientific model's limitations.

Experimental imports retain the source-native payload, its identity, calibration, selection history, reconstruction provenance, and uncertainty. A normalized model-coordinate view is a separately identified derivative. An import decoder does not turn reconstructed tracks into architrino trajectories, and a derived view does not replace the original instrument record. In particular, the source-preserving observer workload has no native wake-speed instantiation; normalized units apply only to a separately declared model-coordinate product.

## 3. Encodings and access contracts

### 3.1 Negotiated capabilities

A codec capability declares provider and version, input and output types, representation profiles, precision and error bounds, access and chunking modes, device layout, permitted consumers, and refusal behavior. Negotiation checks these declarations before attempting payload conversion. An application may keep private renderer buffers, but a representation exchanged across the common boundary must use a registered capability. Domain providers can supply specialized implementations without defining a second logical path model.

Four capabilities illustrate the accepted local registry. Canonical path-record JSON supports authoritative and analysis records with exact logical round trip. A quantized little-endian layout supports display paths with integer time and position arrays. A Core-owned JSON map codec carries a synthetic Potential product at fixture-conformance grade. A source-native CSV decoder preserves experimental fixture bytes and produces an observer-level path representation. Declared device residency and structure-of-arrays layout are compatibility statements, not measured GPU performance.

### 3.2 Quantization bounds and their limits

The display codec declares a time step and a coordinate step of $10^{-3}$ in normalized units, storing time as signed 32-bit integers and position components as signed 16-bit integers. Its maximum added absolute error is $5\times10^{-4}$. For nearest-step rounding with positive step $q$ of an individual representable component $x$, the elementary bound is

$$
\widehat{x}=q\,\operatorname{round}(x/q),\qquad |\widehat{x}-x|\leq q/2.
$$

This conditional bound assumes the integer result fits the declared range and the rounding operation implements the stated rule. It is a componentwise statement, not a claim that the same bound automatically controls a vector norm, an interpolated path, a causal root, or an observable. Overflow, a tighter source error budget, or lost event information must cause refusal. A finer encoding may be negotiated explicitly; the service cannot silently substitute a weaker representation.

Canonical JSON preserves declared logical identity and event metadata. The experimental CSV capability is decode-only: retaining the original bytes differs from reconstructing identical source text from decoded numbers. Its zero added parsing-error declaration does not erase uncertainty attached to each measurement. The Potential map codec likewise transfers declared fixture data without independently validating the scalar values or granting a production observable definition.

### 3.3 Refusal is part of the representation

The path and codec contracts require explicit refusal for unsupported fields or versions, identity failures, missing coverage, incompatible scales, unsupported precision, broken predecessors, lost source bindings, authority escalation, and incomplete sealing. Codec-specific failures also include payload-integrity errors, semantic round-trip failure, error-budget excess, lost events, changed source identity, uncertainty loss, and unsupported source schemas. A successful round trip proves the agreed representation survived that round trip. Scientific correctness still requires a separately justified reference.

## 4. Accepted-history streams

### 4.1 Prefixes and independent progress

An accepted-history stream admits immutable EOM-accepted chunks in a contiguous sequence beginning at zero. Each chunk binds its predecessor and source manifest, begins at the current accepted-through time, and extends a nonempty interval. The accepted v0 broker example uses chunk identities already listed in a bound manifest. This finite conformance setting should not be mistaken for a complete design for indefinitely growing live manifests or production retention.

Three watermarks distinguish producer commitment, delivery into a consumer's bounded queue, and that consumer's checked acknowledgement. With a common initial time and a valid contiguous prefix, their meanings imply

$$
T_{\mathrm{ack}}\leq T_{\mathrm{delivered}}\leq T_{\mathrm{producer}},\qquad L=T_{\mathrm{producer}}-T_{\mathrm{ack}}\geq0.
$$

Different consumers may have different delivery and acknowledgement watermarks. Agreement about the source's committed prefix does not require identical queue positions or identical consumer receipts. Each receipt includes its consumer identity as well as the source, ordered acknowledged chunks, and exact terminal event.

### 4.2 Pressure, replay, and terminal events

A consumer declares both a maximum buffered chunk count and a maximum buffered byte count. Reaching either limit applies backpressure. A repeated sequence with the same content identity is an idempotent no-op, including at the limit; a changed duplicate is a conflict. A new unique chunk is refused while a connected required consumer is at its declared limit. A chunk too large for the buffer is refused. No authoritative chunk is silently dropped, overwritten, or coarsened.

Acknowledgement follows queue order. Disconnecting removes unacknowledged delivery from the connection while the fixture broker retains its log. Reconnection supplies the last acknowledged sequence and content identity; replay resumes after that validated cursor. Acknowledgement may immediately release a retained replay backlog into the queue, so reduced occupancy does not necessarily remove pressure permanently.

Sealing requires a complete bound manifest, every declared chunk, and the exact final sequence and watermark. A consumer receives the terminal receipt only after acknowledging the retained prefix. A halt preserves the accepted prefix and carries the exact code, detail, failed sequence, and accepted-through time to every subscriber, including after reconnection. A terminal event is immutable; later producer events are refused.

The recorded synthetic example spans $T=0$ to $T=3$ at $c_f=1$. A watermark observer and a separately implemented digest-ledger observer check different bookkeeping aspects of the same stream. Their source-prefix agreement supports consumer conformance; it is not an independent scientific check of EOM evolution, a potential kernel, or throughput. The separate halt example preserves a prefix when another consumer reconnects after the halt.

## 5. Queries, transformations, and publication

### 5.1 Equivalent requests and ordered operations

A query request binds source manifests, a selection, an ordered transform sequence, a numeric policy, and an output contract. Its trace identifier is retained for inspection but excluded from computation identity. Source bindings, selected path identifiers, and event kinds are set-like: duplicates are refused and their order is canonicalized. Object-key order is likewise normalized. Transform order remains semantic.

The contract separately identifies the normalized source-and-query pair, the ordered transform pipeline, and the computation formed from their identities, the contract version, numeric policy, and output contract. Thus an equivalent request with a different tracking label can refer to the same computation. Changing a scientifically relevant parameter or an ordered operation changes the declared computation even if one particular output happens to coincide.

For an elementary illustration, let $A_b(x)=x+b$ be translation and $S_a(x)=ax$ be scalar scaling. Then

$$
(S_a\circ A_b)(x)=ax+ab,\qquad (A_b\circ S_a)(x)=ax+b.
$$

Their difference is $(a-1)b$, so commutation occurs in this example only when that product is zero. This direct algebra explains why preserving order matters. It neither validates an implemented transform nor shows that the v0 harness executes its numerical action: the source describes conformance for translation, scaling, and selection identities.

### 5.2 Source closure and immutable retrieval

Each transform declares its identifier, version, parameters, finite nonnegative maximum added absolute error, coverage effect, and authority effect. Coverage is preserved or reduced to a subset. Authority is bounded by the weakest source, the derived-product ceiling, and every transform cap. Display shaping caps the result at display-only authority; no transform turns a derived product into continuation history.

A request, view, product, and publication receipt must bind the same canonical source set. Provisional output may expose incomplete coverage. Sealed output requires all source manifests and the requested output interval to be complete, with an immutable receipt. Retrieval requires an explicitly permitted consumer and the exact product identifier, product content identity, and receipt identity. Here publication means a contract-bound product handoff, not release to a public website or a claim of scientific acceptance.

The local positive examples use a complete prescribed path to publish a sealed analysis product and an incomplete accepted-history prefix to publish only a provisional display product. Their fifteen refusal cases cover every named query-publication refusal code. The source also records a corrected aliasing defect: changing a shared source-binding object had changed multiple supposedly separate records. Immutable identity depends on preserving object separation as well as declaring hashes.

### 5.3 The thin client

The shared client delegates nine operations: manifest validation, codec negotiation, query preparation, opening a stream, performing a stream action, stream inspection, publication, retrieval, and operation inspection. It forwards the exact originating exception name, refusal code, and message. Returned results and retained operation records are defensively copied so a caller cannot mutate the shared fixture cache or another caller's record through a returned object.

Each synchronous call returns a terminal success or failure envelope with client and application identities, the operation, one-unit progress, result, and failure. This is not an asynchronous production lifecycle. Only sealed publications enter the in-memory cache; equivalent computation identity is checked together with publisher and permission policy. A provisional result cannot masquerade as a completed cache hit.

The two-consumer fixture gives Topo and Equation Mapping instances of the same client class. They share a manifest, normalized request identity, stream session, and inspectable progress. Topo requests the sealed Potential fixture and obtains a hit for an equivalent request; Equation Mapping retrieves the exact product as a permitted consumer. The example establishes interface reuse at its recorded software grade, with no network, durable catalog, authentication, authorization service, retry policy, production telemetry, or scientific result implied.

## 6. Potential as a declared derived product

### 6.1 Atomic samples and unavailable output

The Potential API owns validation, dispatch to the declared prescribed-path provider, complete contribution accounting, and reduction. The provider's scientific owner retains the kernel's meaning. For $N$ sample points and $M$ declared transmitters, complete output requires exactly one successful finite contribution for each pair. With those conditions satisfied, the reduction is

$$
P_i=\sum_{j=1}^{M}p_{ij},\qquad i=1,\ldots,N.
$$

The required $NM$ count alone is insufficient: pair identities must also be unique and complete. A missing or duplicated contribution, unavailable status, nonfinite value, provider exception, or unsupported request makes the batch unavailable or produces an explicit request error. The atomic sample API publishes no partial numeric batch. A valid zero can result from a complete cancelling sum; missing contributions cannot be interpreted as zero.

Lorentz Geometry and Topo are the declared sampling consumers. Presentation remains application-owned, including cameras, colors, contours, clipping, playback, and interaction. An application must preserve coverage, product identity, claim grade, and unavailable state. This contract neither renames Topo's ordinary wake-intensity map nor creates a standalone Potential application.

### 6.2 Geometry, observables, and fixture scope

The product contract distinguishes a fixed-time spatial volume with three spatial axes, a timespace volume with two chart axes and absolute time, and a full timespace product with three spatial axes and time exchanged as indexed chunks or tiles. Each request specifies history requirements, frame and scale bindings, geometry, sampling, observable and kernel versions, numeric policy, and output capability. Source payloads remain separate from publication records.

The sole local observable-registry example is a synthetic scalar potential for prescribed history, with a maximum declared precision of 64 bits and a test-fixture scientific owner. Its positive fixture uses complete source coverage through $T=2$, a fixed map time $T=1$, binary64 at 53 bits, and a $2\times2\times2$ sample grid. The eight literal values are $0,1,1,2,1,2,2,3$. The fixture reports no missing or unresolved cells and an exact synthetic error grade. These literal values and placeholder source identities are a bookkeeping example, not samples of a recovered physical potential or an independently verified source history.

The five product-negative fixtures alter history availability, scale compatibility, precision, completeness, and observable version. They test declared refusals when executed by their owner; reading their expected codes is not executing those checks. The product contract contains eleven named refusal codes, so five stored mutations should not be described as exercising every product refusal.

### 6.3 Progressive maps and sealing

The live Potential pipeline is a separate derived-product state machine over the shared accepted-history stream. It moves from awaiting a stream to consuming, can become backpressured, and reaches sealed output only after source sealing and complete map coverage. Halted and failed states are terminal. It tracks source accepted-through time, Core consumed-through time, map completed-through time, lag, queue occupancy, and missing tiles.

The consumer's lag measures source progress minus map completion, which differs from the broker's consumer-acknowledgement lag. Candidate EOM steps cannot advance authoritative watermarks. Missing predecessors, changed duplicates, out-of-order map completion, and source rebinding stop dependent advancement. An exact upstream halt is preserved. Sealing requires a complete predecessor chain, the exact source seal, an empty queue, and contiguous map completion through the target end.

The local live fixture contains three contiguous chunks and three corresponding tiles across $T=0$ to $T=3$, one duplicate, two provisional snapshots, and one backpressure interval. Its declared capacity is two chunks and 256 bytes; each unique chunk declares 128 bytes. At the second snapshot, source and consumed progress reach 3 while map completion remains 1, giving lag 2 and two missing tiles. Ordered completion closes the map and permits sealing. Duplicate-free replay is required to produce the same sealed identity. This is deterministic fixture replay, not independent physical evidence.

Atomic sampling and provisional map publication operate at different boundaries. An unavailable atomic batch does not license invented numeric cells. A progressive product may explicitly record absent tiles while remaining provisional. The static observable registry permits only its prescribed synthetic history, whereas the live harness labels synthetic events as accepted-history chunks; these are distinct conformance examples, not proof that one production scientific observable has been validated for both sources.

## 7. Scale, deployment, and measurement

### 7.1 Local studies and staged work

History cost depends on path count, retained intervals, scale span, curvature, event density, root multiplicity and conditioning, precision, access pattern, fan-out, and storage or transfer behavior. Pair count alone cannot predict cost. A bounded keyhole study must declare the focal region and time interval, relevant paths, required predecessor and successor history, and how exterior contributions are included, excluded, approximated, or left open. A selected local window cannot silently become a claim about complete global history.

The proposed accelerator architecture tiles receivers, transmitters, and history intervals; uses conservative bounds; compacts surviving candidates; buckets comparable refinement work; and returns difficult cases to stricter precision. Identities survive every queue transition. Receiver-owned accumulation is separate from root discovery, with complete and disjoint accounting for accepted, rejected, deferred, failed, and unprocessed work. A missing result or cache entry cannot establish that an interval is root-free.

These are proposed obligations. The EOM solver retains the root equation, isolation rules, completeness criterion, and step acceptance. Regular device layouts do not prove an accelerator advantage, and a strict fallback must not discard difficult rows to improve a benchmark. Effective reaction quantities such as energy, momentum, and angular momentum occur as separately owned ledger targets; their presence in a workload does not make them primitive architrino inputs.

### 7.2 Five unmeasured workloads

The accepted workload definition fixes five different comparisons, all unmeasured. Normalized numerical model workloads use $c_f=1$; the observer import preserves source-native units.

| Workload | Fixed dimensions and access | Required independent check |
| --- | --- | --- |
| EOM continuation | Six paths, $2^{18}$ samples per path, scale span $10^4$, 24 branch/event markers, adaptive precision up to 128 bits; append, lookback, and event-neighborhood access. | Complete coverage, exact discrete root/event identity against an analytical or certified oracle, a state enclosure within frozen tolerance, and exact halt propagation. |
| Live Potential map | 64 paths, $2^{14}$ samples per path, 64 chunks, $128\times128\times64$ cells, scale span $10^3$, 16 event markers, and 64-bit sampling; stream, replay, and tile access. | No source or tile gaps, closed watermarks, and absolute/relative residuals against a separately authored sampler. |
| Reaction keyhole | Twelve paths, $2^{16}$ samples per path, scale span $10^5$, eight event markers across five account channels; 64-bit bulk and 128-bit event work. | Complete pre/event/post coverage, no missing identities or event owners, a bounded ledger residual, and independent product/event-order reconstruction. |
| Optimization sweep | 1,024 six-path candidates, $2^{12}$ samples per path and candidate, scale span $10^4$, 32 frozen invalid/event cases; 64-bit screening with 128-bit escalation. | Rejection of all frozen invalid controls, retained source coverage, held-out objective agreement with a separately authored evaluator, and reproducible selection and tie handling. |
| Collider-track import | 100,000 tracks with at most 512 source samples each; source-native covariance, calibration, selection, and reconstruction records. | Exact source payload and uncertainty preservation, complete provenance, independent coordinate-transform comparison, and no authority escalation. |

Deterministic replay is a separate reproducibility metric for each workload. It cannot replace the independent reference. A candidate must pass the hard correctness gate before resource comparison. Missing instrumentation produces a null value with a reason, never a fabricated zero. Wall time, throughput, median and high-percentile latency, CPU time, host and device memory, I/O, transfers, working and sealed storage, escalation, failures, energy, and cost retain their instrument and operating context. No composite score permits averaging away a correctness failure.

### 7.3 Deployment alternatives and durable lineage

The architecture allows in-process composition, shared or memory-mapped data, immutable file or object stores, local or remote streams, and distributed execution. A cloud posture would separate application consumers, identity and control, data services, compute, tiered storage, and observable APIs. A device cache would not be the sole durable authoritative store. Authentication, authorization mechanisms, quotas, retention, export, and cost attribution remain deployment decisions, rather than capabilities proved by the synchronous client.

Study revisions preserve immutable inputs, run manifests, ordered transforms, parent and successor relationships, comparison records, and explicit publication state. A rerun creates a new execution record even when the study revision is unchanged. Shared or private workspaces govern access; they do not confer scientific authority. Human-readable manifests may be version controlled while large immutable payloads use appropriate content-addressed storage. Migration alternatives include retaining, reshaping, splitting, merging, replacing, or retiring an application only under its separately justified capability and replay obligations.

The dated operations packet compares local, cloud, and hybrid postures and proposes staged CPU, Metal, and strict accelerator evaluation. Its vendor specifications, prices, rental rankings, spend ratios, and proposed budgets are historical supporting notes. They establish neither current offers nor workload performance. No hardware purchase, vendor commitment, backend promotion, or production operating choice follows from the accepted logical contracts. The outstanding empirical question is whether a candidate preserves the complete independently checked computation while improving a measured end-to-end workload.
