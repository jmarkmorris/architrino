# Prescribed-Path Analysis

This library evaluates causal intersections, wake maps, virtual-probe response, flight-time geometry, and self-hit spans for motion prescribed analytically by its caller.

The older observer-field and path-display APIs remain labeled `display-only-visualization`. `evaluatePrescribedSourceWake` has a narrower analytical contract: it consumes `prescribed-path-analysis/exact-source-record.v1`, solves the causal root from the exact declared trajectory, and evaluates the signed wake $\mathcal W$, unsigned wake $\mathcal W_{\mathrm{abs}}$, and virtual-probe acceleration $\mathbf A_p$. Its result is graded `derived` only as a conditional consequence of the source record. It does not establish that the prescribed path is dynamically retained or stable.

The first evaluator certifies the sub-field-speed domain, where each source has at most one simple causal root at the requested event. It fails closed when a source speed bound reaches the field speed. Multiple-root and fold handling require a later root policy rather than silent sampling.

Run the first spindle-backed evaluation at one absolute-coordinate event with:

```bash
node scripts/eom/evaluate-prescribed-source-wake.mjs \
  --time 4 \
  --position 1,0.25,0.1 \
  --probe-charge 1 \
  --field-speed 1 \
  --coupling 1
```

The CLI hashes the exact source file and reports `resultPayloadSha256`, the SHA-256 digest of the evaluation payload before that digest field is attached. It does not read the sampled Borg display record.
