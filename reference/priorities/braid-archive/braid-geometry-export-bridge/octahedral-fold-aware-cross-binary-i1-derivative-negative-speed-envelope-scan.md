# Octahedral Fold-Aware Cross-Binary I1 Derivative Negative Speed-Envelope Scan

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure](octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md). The forcing-bracket packet certified the endpoint point signs

$$
f_\times(a_1)>0>f_\times(b_1)
$$

for the first `I1` bracket. The remaining calculus step for `I1.f1` zero isolation is the derivative row

$$
\texttt{I1.derivative-negative.full-cell}.
$$

This packet advances that row with a machine-expanded speed-envelope scan on the compact regular `I1` core. It does not yet certify a directed-rounding interval derivative enclosure over the continuous cell, and therefore does not yet certify `I1.f1` zero isolation.

## Scan Certificate

The scan uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
3.02156\le v_\ast\le3.02157,
$$

with no fixed speed band. On the compact regular interval

$$
10^{-5}\le \theta \le \theta_{3-}-10^{-5},
\qquad
\theta_{3-}=0.997370655243,
$$

the executable evaluates the source-atlas-aware implicit derivative formula for the representative receiver `1+`:

$$
f'_\times(\theta;v_\ast)
=
s'_{+,+}(\theta)-s'_{+,+}(\theta+Q)
+s'_{-,+}(\theta)-s'_{-,+}(\theta+Q),
\qquad
Q=\pi/2.
$$

The default scan uses $48$ midpoint samples in $\theta$ and $9$ speed samples across the certified speed-ratio enclosure, for $432$ sampled derivative evaluations. Every sampled row preserves the expected six source roots. The sampled derivative range, with an explicit $10^{-9}$ machine padding, is

$$
-45.5042121895
\le
f'_\times
\le
-0.0199795715084,
$$

so the scan-level derivative envelope remains strictly negative. The weakest sampled row occurs at approximately

$$
v_\ast=3.02157,
\qquad
\theta=0.197402317184,
\qquad
f'_\times\approx-0.0199795715084.
$$

Thus the packet certifies the sampled speed-envelope row

$$
\boxed{
\texttt{I1.derivative-negative.full-cell.speed-envelope-scan}.
}
$$

## What This Changes

Before this packet, the first `I1` bracket had certified endpoint signs but only an open derivative row. This scan supplies direct executable evidence that the imported derivative target has the expected sign across the same speed-ratio enclosure and source-root structure used by the endpoint certificate.

The result is stronger than another target list: it converts the direct successor to `I1.forcing-bracket` into a concrete negative-derivative speed-envelope certificate. It is still weaker than theorem-grade interval topology because the sampled scan does not bound every point of the continuous compact interval by outward-rounded interval arithmetic.

The direct successor is therefore:

$$
\texttt{I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required}.
$$

Once that successor is closed, the already-certified endpoint signs and the derivative row can be composed into the `I1.f1` one-zero isolation theorem.

The direct sampled successor [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md) now performs that composition at scan level. It tracks a single sampled `I1.f1` root branch across the same speed-ratio enclosure while leaving the full directed-rounding interval zero-isolation theorem open.

The bracket-local derivative successor [octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier](octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md) sharpens the derivative burden on the actual `I1.f1` bracket. It partitions the bracket and speed enclosure into finite mesh cells, attaches local stencil allowances, and keeps the derivative upper barrier negative with signed clearance $\approx0.0603824889362$. The later burden-reduction packet [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction](octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md) then shows that local `I1.f1` zero isolation only needs the bracket-local directed-rounding derivative-variation successor; the full-cell derivative enclosure remains open for broader interval sign-topology use.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.mjs) emits:

- no-fixed-speed-window scan parameters using $3.02156\le v_\ast\le3.02157$;
- the compact regular `I1` scan interval padded by $10^{-5}$ away from the fold endpoint;
- sampled derivative rows with forcing value, derivative value, source-root count, and term root counts;
- per-speed derivative-slice summaries;
- a global machine-expanded negative-derivative envelope;
- explicit non-interval, non-zero-isolation, non-critical-exhaustion, non-quadrature, and non-retention claim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.test.js) verifies schema validation, speed-window removal, compact `I1` scan parameters, six-root preservation, negative derivative clearance, per-speed slice status, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_derivative\_negative\_speed\_envelope\_scan=true},
\qquad
\texttt{certifies\_source\_root\_count\_six\_on\_I1\_scan=true},
$$

$$
\texttt{advances\_I1\_derivative\_negative\_full\_cell=true}.
$$

It does not claim:

$$
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
\qquad
\texttt{certifies\_I1\_zero\_isolation=false},
$$

$$
\texttt{certifies\_interval\_sign\_topology=false},
\qquad
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-derivative-negative-speed-envelope-scan-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it gives the first direct negative-derivative certificate for the `I1.derivative-negative.full-cell` row under the accepted no-fixed-speed-window speed envelope. It should not be promoted into reader-facing AAA prose until the derivative row is upgraded to a directed-rounding interval enclosure, or until it is consumed by a retained branch certificate that states the remaining interval and quadrature burdens explicitly.
