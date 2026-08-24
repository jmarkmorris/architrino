# A1.1 Exact-Circular Inter-Binary Interval Reduction

Date: `2026-07-27`

Status: `partial-diagnostic-closure`, `drawn-not-evaluated`, `null-score`, `diagnostic-only`, and `priority-only`.

## Scope and unchanged boundary

This receipt compares a rigor-preserving exact-circular reduction against the first [A1.1 continuous ratio-phase receipt](2026-07-27-a1-1-continuous-ratio-phase-root-inventory.md). It retains the same protocol hash, frozen near-neighbor ratio box, history reach $\chi_n=9/4$, symmetric phase baseline, all $36$ ordered channels, certification floors, depth limit, per-channel cell ceiling, nine-rule fail-closed protocol, fold visibility, null-score rule, and independent direct-coordinate squared-residual recomputation.

The reduction changes only the prescribed-path interval instrument. It does not call the EOM solver, evolve a path, increase a resource ceiling, broaden the ratio box, calculate energy or action, or select a physical candidate.

Plainly: this is a tighter calculation over exactly the previously approved drawing family. It does not change the family or its evidential authority.

## Dominant subdivision diagnosis

In the first receipt, all $144{,}536$ depth-limited unresolved boxes carrying derivative data had delay-derivative enclosures bounded away from the declared transversality floor. None was classified as a possible fold. Nevertheless, the median causal-residual enclosure width was approximately $0.0625$ after the median reception-phase and delay widths had fallen to approximately $0.52\%$ and $0.39\%$ of their full ranges.

The dominant avoidable widening came from enclosing receiver and emitter coordinates separately, repeating the same phase variables in several trigonometric components, squaring the interval displacement components, and then taking a square root. That construction discarded exact correlations before the root-free and face-sign tests.

Plainly: the old subdivision was mostly fighting a loose way of enclosing the same exact circles. The diagnostic did not show that the unresolved mass was dominated by folds.

## Exact circular reduction

For one ordered inter-binary channel, let

$$
A=\Theta_n+\phi_r,
\qquad
B=\Theta_n-\delta+\phi_t,
$$

where $\delta$ is the dimensionless causal delay. The reviewed cyclic frames make the unsigned plane-direction dot product exactly one of

$$
q=\sin A\cos B
\quad\text{or}\quad
q=\cos A\sin B.
$$

Plainly: each pair of orthogonal circle planes shares exactly one coordinate, so their dot product contains one sine-cosine product rather than three independent coordinate differences.

Product-to-sum identities reduce both cases to the two phase coordinates

$$
\sigma=2\Theta_n-\delta+\phi_r+\phi_t,
\qquad
\tau=\delta+\phi_r-\phi_t,
$$

with

$$
\sin A\cos B=\frac{\sin\sigma+\sin\tau}{2},
\qquad
\cos A\sin B=\frac{\sin\sigma-\sin\tau}{2}.
$$

If $\kappa=s_rs_t\in\{-1,1\}$ is the receiver/transmitter endpoint-sign product, the exact squared separation is evaluated in the preconditioned form

$$
D^2=(R_r-R_t)^2+2R_rR_t(1-\kappa q).
$$

The interval derivative is obtained analytically from this identity and $F(\delta)=D(\delta)-\delta$. The implementation also intersects the analytic dot-product enclosure with its exact range $[-1,1]$. The positive radius-gap square prevents the artificial cancellation produced by the earlier coordinate-by-coordinate form.

Plainly: the new path computes the same separation from one exact shared coordinate and two combined phase variables. It keeps the known radius gap positive instead of allowing interval arithmetic to forget it.

Simultaneously inverting both endpoints leaves $\kappa$ unchanged. Therefore the distance, causal residual, and delay derivative are identical for the two endpoint pairs in each ordered-binary/sign-product class. The instrument evaluates $12$ exact inter-binary symmetry representatives and copies each certificate or unresolved disposition to its paired channel with explicit representative provenance. All $24$ inter-binary channels remain present in the topology ledger.

Plainly: symmetry removes duplicate computation, not channel accounting.

## Comparison with the first receipt

The reduced run is recorded in the [version-2 durable summary](a1-1-continuous-ratio-phase-root-inventory-summary.v2.json). The ignored complete ledger is `.local-data/braid-program/a1-1/a1-1-continuous-ratio-phase-root-inventory.v2.json.gz`.

| Observable | First receipt | Exact-circular reduction |
| --- | ---: | ---: |
| Ordered channels represented | $36$ | $36$ |
| Inter-binary symmetry classes evaluated | $24$ independent channel runs | $12$ exact representatives |
| Actual interval cells evaluated | $480{,}018$ | $180{,}210$ |
| Symmetry-reused represented cells | $0$ | $180{,}192$ |
| Certified root-free represented cells | $95{,}292$ | $82{,}742$ |
| Certified simple-root-sheet represented cells | $114$ | $652$ |
| Inter-binary channels completely disposed | $0$ | $6$ |
| Inter-binary channels unresolved | $24$ | $18$ |
| Unresolved represented partitions | $146{,}224$ | $98{,}152$ |
| Possible-fold partitions emitted | $0$ | $0$ |
| Packet status and score | `drawn-not-evaluated`, null | `drawn-not-evaluated`, null |

The six closed inter-binary channels are:

- binary 1 endpoint 1 receiving from binary 2 endpoint 1;
- binary 1 endpoint 2 receiving from binary 2 endpoint 2;
- binary 2 endpoint 1 receiving from binary 3 endpoint 1;
- binary 2 endpoint 2 receiving from binary 3 endpoint 2;
- binary 3 endpoint 1 receiving from binary 1 endpoint 1; and
- binary 3 endpoint 2 receiving from binary 1 endpoint 2.

The remaining $18$ channels are the two opposite-endpoint binary $1\leftarrow2$ channels, all four binary $1\leftarrow3$ channels, all four binary $2\leftarrow1$ channels, the two opposite-endpoint binary $2\leftarrow3$ channels, the two opposite-endpoint binary $3\leftarrow1$ channels, and all four binary $3\leftarrow2$ channels.

Of the $98{,}152$ represented unresolved partitions, $97{,}016$ reached subdivision depth $18$ and $1{,}136$ were pending when an unchanged $20{,}000$-cell representative-channel ceiling was reached. The evaluated depth-limited rows retained derivative enclosures away from the transversality floor. Resource-pending rows have no enclosure, so the zero emitted-fold count does not prove folds absent from the complete unresolved domain.

Plainly: six inter-binary channels now finish. The other eighteen remain unknown because the unchanged interval partition still cannot align and certify every root sheet before its declared limits.

## Controls and evidence boundary

The existing positive, negative, residual, transversality, and separation controls still pass. A new same-change conformance control checks $144$ inter-binary point rows:

- every direct-coordinate causal residual lies inside the new analytic residual enclosure;
- every finite-difference direct-coordinate delay derivative lies inside the analytic derivative enclosure within the recorded $10^{-7}$ control tolerance; and
- simultaneous endpoint inversion gives zero observed residual difference at the control rows.

The direct-coordinate squared-residual recomputation still covers all sampled point roots and reports maximum normalized residual $9.200510357852533\times10^{-13}$. These controls compare separately structured formulas but were changed and executed in the same work packet. They establish diagnostic conformance, not independent mathematical acceptance.

The protocol hash is `7b2a3a2a56abbe97971d3fae447cd3406724cb2c5916e8ba3a0d39ad80772849`. The reduced result hash is `c2673e581fed4948536c18478b364f516ea821761e8d45c03d38dfeed814ab9f`. The version-2 summary hash is `624f5350ac3a0e4e57cf9da08225c1d7a635daa16c959dd96dc0778440256cdb`.

Plainly: the controls would catch a disagreement between the exact identity and direct-coordinate evaluation at the declared samples. They do not turn a prescribed-path diagnostic into physical evidence.

## Wider-ratio relevance and next boundary

The distance identity, two-coordinate phase reduction, exact dot-product range, analytic delay derivative, and endpoint-inversion symmetry are algebraic properties of the declared circular frames. They remain available for a later separately authorized wider positive-radius domain.

The six channel-closure results do not automatically generalize beyond the frozen near-neighbor box. A wider box changes radius-gap bounds, derivative enclosures, root-sheet geometry, and required partition coverage. The gap-square preconditioning is expected to remain useful when layers are more widely separated, but that is an instrument-design inference, not an executed result.

The exact next boundary is a separately declared treatment of the remaining nine unresolved symmetry representatives. It must improve root-sheet parameterization or monotonic enclosure without weakening the nine-rule protocol; resource increases alone require their own predeclaration. No order-of-magnitude ratio test is authorized by this receipt.

No EOM retention, stability, physical superluminal transport, physical realization, energy, action, angular-momentum dynamics, radiation, pressure, GR recovery, candidate selection, or non-null score follows.
