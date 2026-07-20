# App Roots Work Log

This file is the chronological work log for the `app-roots` priority area. Use it for dated agent status, proof-attempt notes, checker narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use `brainstorming.md` for provisional ideas, insights, conceptual maps, and draft corpus-promotable text when this priority area has one. Use the main priority tracker in this directory for the compact current queue, blockers, promotion routing, and next action. Keep focused proof packets, certificates, app specs, and requirement notes in their own sibling files when they need a stable structure.

## Log Entries

### 2026-07-19 Priority Area Opened

Created `app-roots` to stage a proposed visualization app for the causal-root fold: root pairs are created or annihilated when a source's velocity component along the line of sight to the receiver crosses $c_f$, per the fold law in [master-equation.md](../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse). No implementation exists yet; Status is `proposed` and Rank is `unranked` pending operator/developer scoping and entry into the unified priority table.

### 2026-07-19 V1 Requirements And Design Drafted

Wrote [requirements-and-design.md](requirements-and-design.md): a synchronized 2x2 pane grid (delay-map roots, wake scene, root-count ledger, finite-impulse pane) driven by a source-velocity slider $\beta=v/c_f$ plus a secondary impact-parameter slider and standard time-transport controls. Key design fact used to justify the control set: for a straight-line constant-speed source pass, $\hat{\mathbf r}_{ij}\cdot\mathbf V_j\to v$ as the source position goes to $\pm\infty$ along its line, so $\beta>1$ alone guarantees a fold region exists regardless of impact parameter — the impact parameter only changes when/how compressed the fold looks, not whether it occurs. Still open: Pane B dimensionality (2D vs. 3D), whether the circular-orbit source mode ships in V1, and whether the readout strip exposes $D_{T,ij}$. No implementation dispatched.
