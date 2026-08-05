# AAA Core Work Log

This file is the chronological work log for `app-aaa-core`. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted work, [architecture-v0.md](architecture-v0.md) for the current architecture draft, and [brainstorming.md](brainstorming.md) for loose ideas.

## Log Entries

### 2026-08-02 — AAA Core Named And First Architecture Drafted

- Accepted `app-aaa-core` as the shared factory and service layer for the application ecosystem.
- Drafted `aaa_core/v0` with explicit boundaries among paths, EOM evolution, scientific kernels, application composition, experimental imports, and evidence authority.
- Defined the first conceptual product family: path-set manifests, immutable chunks, stream envelopes, query and transform manifests, kernel requests, derived-product manifests, and resource profiles.
- Defined focused service boundaries for construction/validation, identity, codecs/storage, indexing, streams, queries/transforms, compute dispatch, publication/catalog, and application clients.
- Defined authoritative-history, precision-bounded-analysis, and display-stream representation profiles over one logical path model.
- Captured live accepted-history flow, provisional and sealed publication, replay, backpressure, heterogeneous GPU/CPU routing, and multiple deployment postures.
- Moved suite-wide architecture ideas from `app-potential` into AAA Core ownership and retained Potential as the first concrete consumer.
- Marked `aaa_core_path_interchange/v0` as awaiting verification; no implementation or production authority was claimed.

Plainly: AAA Core now has a first blueprint for turning trustworthy path inputs into reusable services and products for many apps, while keeping the solver and scientific claims in their proper owners.

### 2026-08-02 — Codec Provider Boundary And Root-Compute Posture Added

- Split codec ownership into a Core-owned control plane and registry, broadly reusable Core providers, domain-owned registered providers, and app-private transient layouts.
- Required source-native experimental measurements to remain immutable while decoded, calibrated, filtered, and normalized variants become separately identified derived products.
- Expanded the heterogeneous-compute design around the actual irregularity of causal-root work: staged screening, compaction, bracket isolation, conditioning buckets, branch-preserving refinement, precision escalation, and complete/disjoint accounting.
- Preserved EOM ownership of its root equations, completeness criteria, and acceptance decisions; Core provides shared scheduling and data services only.
- Added a dated local-versus-cloud hardware and cost packet and made a measured root-accelerator operating decision an explicit deferred queue item.

Plainly: specialized apps and instruments may bring their own encoders and decoders, but published data remains interoperable. GPUs receive regular root batches, while hard cases are visibly routed to stricter computation rather than silently weakened.
