# Architrino Simulation Tests

This note records the minimum tier-1 simulation tests that should be passed before any strong self-hit or non-Markovian claims are trusted numerically. Its purpose is narrow: establish provenance-resolved propagation, baseline diagnostics, and a workable history-buffer strategy before moving to richer dynamics.

The reader should treat this as the simulator's first honesty check. Before the code is allowed to talk about rich self-hit behavior, it has to show that causal rings arrive in the right order, source identities are preserved, and history lookups are not quietly inventing the past.

The file is therefore an implementation-facing checklist rather than a general theory chapter. It should be read as a gate on simulation credibility.

## Tier-1 Mandatory Unit Tests (Before Self-Hit Claims)

### Provenance-resolved propagation test
Implement 1-architrino and 2-architrino setups with $\mathbb{U}_{\text{now}}$ sensors arranged on causal rings:
- Verify causal isochron propagation at $c_f$
- Verify correct arrival ordering and phase behavior (per kernel)
- Verify numerical stability of $T_t$ inversion as $\Delta T \to \Delta T / 2$
- Produce provenance tables showing correct `transmitter_id` values and emission times

### Baseline diagnostics
- On the same root and history records, report the normalized finite-window energy, momentum, and angular-momentum pullback residuals $\mathcal R_E$, $\mathcal R_P$, and $\mathcal R_J$ defined by the [Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol](coincident-midpoint-orthogonal-axis-action-increment-protocol.md#branch-chart-conservation-pullback). Each residual must satisfy its predeclared tolerance and remain stable under temporal and history refinement. A diagnostic work integral or acceleration moment does not replace that exact wake-history pullback.
- Compare the numerical arrival times and surface normalization with an independently authored stationary-transmitter analytic isochron. Cross-integrator agreement is an additional implementation-parity check, not an independent oracle.


### Grid Cache Boundary

1. **Problem**: A finite simulation cannot retain unbounded path history.
2. **Authoritative record**: Retain bounded, interpolable worldline segments $\mathbf X_i(T)$ and $\mathbf V_i(T)$ with stable transmitter identities over the declared causal horizon.
3. **Optional cache**: A $\mathbb{U}_{\text{now}}$ grid may cache potential and gradient summaries for visualization or broad-phase search, but a nearest-node lookup cannot replace the transmitter-tagged history needed to solve a self-hit root.
4. **Deliverable**: Demonstrate convergence against an independently authored analytic isochron and show that grid caching preserves the same root identity, emission time, and acceleration contribution as the authoritative history record.


### Grid-Based History

* **Memory Strategy:** Store finite authoritative worldline history; use the fixed grid only as a derived cache.
* **Lookup:** Use a grid or spatial index to nominate candidates, then solve the causal-root equation against the retained transmitter history.
* **Validation:** Verify causal isochron propagation, phase ordering, transmitter identity, and emission time under joint temporal, history, and spatial refinement.
