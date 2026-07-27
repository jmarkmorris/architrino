# Deferred Roots Teaching Work Log

This file preserves the chronological history of the Roots teaching packet inside the deferred Causal Delay Feedback priority area.

Use [roots-brainstorming.md](roots-brainstorming.md) for provisional ideas, [roots-product-plan.md](roots-product-plan.md) for the focused packet, and [priorities.md](priorities.md) as the sole priority owner.

## Log Entries

### 2026-07-19 Priority Area Opened

Created `app-roots` to stage a proposed visualization app for the causal-root fold: root pairs are created or annihilated when a source's velocity component along the line of sight to the receiver crosses $c_f$, per the fold law in [master-equation.md](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). No implementation exists yet; Status is `proposed` and Rank is `unranked` pending operator/developer scoping and entry into the unified priority table.

### 2026-07-19 V1 Requirements And Design Drafted

Wrote [requirements-and-design.md](requirements-and-design.md): a synchronized 2x2 pane grid (delay-map roots, wake scene, root-count ledger, finite-impulse pane) driven by a source-velocity slider $\beta=v/c_f$ plus a secondary impact-parameter slider and standard time-transport controls. Key design fact used to justify the control set: for a straight-line constant-speed source pass, $\hat{\mathbf r}_{ij}\cdot\mathbf V_j\to v$ as the source position goes to $\pm\infty$ along its line, so $\beta>1$ alone guarantees a fold region exists regardless of impact parameter — the impact parameter only changes when/how compressed the fold looks, not whether it occurs. Still open: Pane B dimensionality (2D vs. 3D), whether the circular-orbit source mode ships in V1, and whether the readout strip exposes $D_{T,ij}$. No implementation dispatched.

### 2026-07-23 Consolidated Into Causal Delay Feedback

The operator selected capability grouping over a separate Roots product. This directory now preserves the mathematical, linked-view, and acceptance packet for a future Roots mode inside Causal Delay Feedback. The standalone `roots.html` and `src/apps/roots/` implementation direction was retired before code existed. The mode must reuse Causal Delay Feedback's canonical source, receiver, retained-history state, causal-root evaluator, and wake renderer.

### 2026-07-26 Merged And Deferred

Moved the complete Roots packet into the dormant Causal Delay Feedback directory. The current app already contains the shared evaluator and internal Roots view, but the advanced fold lesson remains deferred because coordinating the delay map, wake geometry, root-count ledger, and finite accumulated velocity change is a substantial teaching challenge. No standalone route, duplicate runtime, or new implementation queue was opened.
