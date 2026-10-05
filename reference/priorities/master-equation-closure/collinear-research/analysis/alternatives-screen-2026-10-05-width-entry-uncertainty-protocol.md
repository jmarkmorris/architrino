# Isolating source, receiver and travel uncertainty

Before implementing a higher-order source quadrature, the [probe instrument](../evidence/alternatives-screen-2026-10-05-width-entry-uncertainty-probe.mjs) reuses the frozen v8 candidate and bound formulas on a single fixed receiver leaf: original Hermite segment 900, first one-thirty-second of its displacement span. It reports enclosure feasibility and cost only. It does not assert a contact or interval-union certificate.

The exact candidate and history are fixed. For each travel partition, the probe evaluates source subdivisions 4, 16 and 64 on the same receiver leaf, then receiver partitions 4 and 16 while holding source subdivisions at 16. Separate runs use travel partitions 64, 256 and 1024. Every comparison reports minimum directed derivative margins, functional enclosure widths, travel interval widths and elapsed cost. This separates sources of interval inflation without interpreting parameter agreement as independence.

Frozen source hash `70fd602784155aea631423c652953cc7ccb6153bdf143edab97cbd88baa697d6` passed the independent arithmetic, affine and growing-derivative controls at 15:48:19 UTC before probe targets, in 0.146 measured seconds. Receipt: `width-entry-uncertainty-controls/receipt.json` under the campaign local evidence owner. Analytical references and target receipts remain unchanged.
