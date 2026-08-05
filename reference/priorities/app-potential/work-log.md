# Potential App Work Log

This file is the chronological work log for the `app-potential` priority area. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted executable work, [brainstorming.md](brainstorming.md) for provisional ideas, and [requirements-and-design.md](requirements-and-design.md) for the current application boundary.

## Log Entries

### 2026-08-02 — Potential Codec Provider Boundary Clarified

- Kept the logical interchange model, registry, common envelopes, and conformance rules with AAA Core.
- Assigned any specialized published Potential map/tile encoder and decoder to Potential as a registered AAA Core provider.
- Kept transient GPU textures, vertex buffers, and renderer caches private when they are not published or consumed across a process boundary.

Plainly: Potential can optimize its map data for real-time use without turning that application-specific format into an undocumented island.

### 2026-08-02 — AAA Core Became The Shared Owner

- Accepted [AAA Core](../app-aaa-core/priorities.md) as the shared path factory and service layer.
- Replaced the unnamed suite/interchange dependency with the first [AAA Core architecture draft](../app-aaa-core/architecture-v0.md).
- Moved suite-wide interchange, codec, experimental-import, filtering, accelerator, and reaction-workspace ideas from Potential brainstorming into AAA Core ownership.
- Retained Potential ownership of map selection, progressive assembly, publication behavior, rendering, and app interaction.

Plainly: Potential now asks AAA Core for shared path and compute services instead of developing its own incompatible path system.

### 2026-08-02 — Timespace Publication And Live EOM Streaming Accepted

- Promoted timespace-map publication and real-time EOM path-stream consumption from optional future ideas into required `app-potential` capabilities.
- Required every map to distinguish a fixed-$T$ 3D spatial volume, a two-space-plus-time volume, or a tiled full three-space-plus-time product.
- Added publishable map manifests with source hashes, observable version, axes, domain, time interval, resolution, filters, error/display grade, coverage, completeness, and publication identity.
- Established a published potential-timespace map as a reusable derived interchange product that remains bound to, and does not replace, its source path manifest.
- Added a live accepted-history pipeline with source, consumer, and map-completion watermarks; deterministic replay; duplicate handling; missing-predecessor failure; backpressure; and provisional-versus-sealed publication.
- Expanded the queue with the live-pipeline contract, reference publisher, and measured GPU streaming surface.

Plainly: Potential must be able to build and share maps across time, and it must update those maps while accepted solver history is still arriving without disguising lag or incomplete coverage.

### 2026-08-02 — Priority Area Created

- Accepted `app-potential` as the priority-directory name and `Potential` as the display name.
- Established the application as a standalone consumer of provenance-complete path histories and declared potential observables.
- Recorded 2D slices as the first reference visualization surface; later on 2026-08-02, 3D spatial maps, timespace publication, and live time playback became required capabilities.
- Kept EOM forward evolution outside the application and deferred the common path schema, codec family, shared libraries, and accelerator API to a suite-level architecture decision.
- Captured the application-suite, experimental-import, filter/shaping, heterogeneous GPU, and reaction-workspace ideas in [brainstorming.md](brainstorming.md).
- Queued the smallest next object, later expanded to `potential_consumer_and_publication_contract_v1`.

Plainly: the app now has an owned planning home and a clear first contract, while the shared path system remains a separate architecture decision rather than being buried inside the viewer.
