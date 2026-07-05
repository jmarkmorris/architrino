# Architrino Simulation Tests

This note records the minimum tier-1 simulation tests that should be passed before any strong self-hit or non-Markovian claims are trusted numerically. Its purpose is narrow: establish provenance-resolved propagation, baseline diagnostics, and a workable history-buffer strategy before moving to richer dynamics.

The reader should treat this as the simulator's first honesty check. Before the code is allowed to talk about rich self-hit behavior, it has to show that causal rings arrive in the right order, source identities are preserved, and history lookups are not quietly inventing the past.

The file is therefore an implementation-facing checklist rather than a general theory chapter. It should be read as a gate on simulation credibility.

## Tier-1 Mandatory Unit Tests (Before Self-Hit Claims)

### Provenance-resolved propagation test
Implement 1-architrino and 2-architrino setups with $\mathbb{U}_{\text{now}}$ sensors arranged on causal rings:
- Verify causal isochron propagation at $c_f$
- Verify correct arrival ordering and phase behavior (per kernel)
- Verify numerical stability of $t_{\text{emit}}$ inversion as $\Delta t \to \Delta t / 2$
- Produce provenance tables showing correct `emitter_id` values and emission times

### Baseline diagnostics
- Energy/momentum bookkeeping (as defined by the model) must be stable under refinement
- Cross-integrator comparison required for the above propagation test


### Grid-Based History Strategy

1. **Problem**: Infinite memory cost for particle-based history in self-hit regimes.
2. **Solution**: Use the $\mathbb{U}_{\text{now}}$ Grid as the history buffer. Store potential magnitude/gradient at grid nodes.
3. **Algorithm**: When an architrino requires its self-potential from $t-\Delta t$, query the **grid node** closest to where the particle *was*, rather than indexing the particle list.
4. **Deliverable**: Prove convergence of this grid-based history against analytic causal isochrons.


### Grid-Based History

* **Memory Strategy:** Use the fixed grid to store potential history.
* **Lookup:** Query grid nodes for history potential values (Order(1) lookup) rather than querying particle history (Order(N)).
* **Validation:** Verify causal isochron propagation and phase ordering on the grid.
