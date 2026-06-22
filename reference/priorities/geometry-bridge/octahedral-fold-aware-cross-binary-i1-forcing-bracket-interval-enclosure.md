# Octahedral Fold-Aware Cross-Binary I1 Forcing Bracket Interval Enclosure

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-finite-interval-closure-reduction](octahedral-fold-aware-cross-binary-finite-interval-closure-reduction.md). The finite closure reduction identified `I1.forcing-bracket` as the global finite-row radius bottleneck. This packet attacks that bottleneck directly by certifying the two endpoint point signs that define the first forcing bracket:

$$
f_\times(a_1)>0>f_\times(b_1),
$$

with

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556.
$$

It is a machine-expanded speed-envelope point-sign certificate. It is not yet a full directed-rounding source-root interval arithmetic certificate, not an `I1.f1` zero-isolation proof, not an interval derivative enclosure, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## I1 Forcing Bracket Certificate

The finite closure stack uses only the certified positive speed-ratio zero enclosure

$$
3.02156\le v_\ast\le3.02157.
$$

Across that enclosure, the executable evaluates the source-atlas formula

$$
f_\times(u)
=
s_{+,+}(u)-s_{+,+}(u+Q)+s_{-,+}(u)-s_{-,+}(u+Q),
\qquad
Q=\pi/2,
$$

at the two fixed bracket endpoints. Each sampled speed row retains the expected six source roots. The machine-expanded forcing envelopes are:

| Endpoint | Expected sign | Forcing envelope | Radius |
| --- | ---: | ---: | ---: |
| `I1.f1.left` | $+$ | $[0.000471690862363,\;0.000472960105266]$ | $6.346214515\times10^{-7}$ |
| `I1.f1.right` | $-$ | $[-0.0011858057038,\;-0.00118456783555]$ | $6.18934125\times10^{-7}$ |

Both radii are far below the imported first target radius

$$
0.000236179200694,
$$

and both envelopes are sign-definite. Thus the endpoint point-sign part of the bottleneck row is certified under the current speed-envelope contract:

$$
\boxed{
\texttt{I1.forcing-bracket endpoint point signs certified}.
}
$$

## Remaining I1 Burden

This packet does not yet certify the whole `I1.f1` zero-isolation row. The zero-isolation theorem still needs the regular-subcell derivative enclosure:

$$
\texttt{I1.derivative-negative.full-cell}.
$$

Only after that derivative row is interval-certified can the `I1.f1` bracket become a one-zero isolation result. The remaining finite closure work therefore shifts from the endpoint forcing signs to the regular derivative row and the rest of the thirty-three-family finite closure set.

The direct successor [octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.md) now advances that row with a no-fixed-speed-window sampled derivative certificate on the compact regular `I1` core. The sampled composition successor [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md) then tracks the `I1.f1` simple-root branch across the same speed-ratio enclosure. Both packets leave the directed-rounding interval derivative enclosure and full `I1.f1` zero isolation open.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.mjs) emits:

- no-fixed-speed-window enclosure parameters using $3.02156\le v_\ast\le3.02157$;
- sampled speed-envelope rows for `I1.f1.left` and `I1.f1.right`;
- six-source-root checks at each sampled speed point;
- machine-expanded endpoint forcing envelopes;
- the imported `I1.forcing-bracket` margin and target radius;
- non-derivative, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.test.js) verifies schema validation, speed-window removal, endpoint sign preservation, radius preservation below the bottleneck target, claim boundaries, invalid controls, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_forcing\_bracket\_point\_signs=true},
\qquad
\texttt{certifies\_I1\_forcing\_bracket\_speed\_envelope=true}.
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
\texttt{source-atlas-aware-i1-forcing-bracket-speed-envelope-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it certifies the endpoint point signs for the current global bottleneck row under the accepted no-fixed-speed-window speed envelope. It should not be promoted into reader-facing AAA prose until the directed-rounding source-root interval arithmetic contract is available, or until the result is consumed by a retained branch certificate together with the required derivative and finite-row enclosures.
