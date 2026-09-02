# EOM Precision Convergence And Failure Policy Acceptance

## Status

- Date: 2026-09-02
- Queue item: `EOM-004`
- Result: accepted at bounded-population numerical-policy grade
- Field-speed instantiation: $c_f=1$
- Production subject: EOM C++20 joint affine retained histories, live acceleration reconstruction, endpoint correction, and atomic publication
- Independent references: analytic static Master-EOM sum and separately authored 80-digit Decimal linear solve
- Claim grade: `derived-and-measured`

## Closure Result

EOM now attaches a deterministic content fingerprint to every joint affine retained history. The identity covers the path id, ordered shared-symbol registry, every retained cubic coefficient, position and velocity remainder radius, and any endpoint override. Atomic-step certificates expose both input and published joint-history identities. Rejection publishes the input joint histories and identical identities, while acceptance additionally verifies that the published joint segment chain preserves every input segment exactly and ends at the accepted time.

Plainly: a rejected attempt cannot quietly alter the correlated history state, and an accepted attempt cannot claim atomic publication after replacing or rewriting an earlier joint segment.

The live six-path snapshot control evaluates 36 ordered relationships at $T=2$. Six coincident self rows contribute exact zero and 30 sharp partner rows are certified and reduced with the production fixed-pairwise path. No accepted-acceleration fallback is used. For static locations $x_i\in\{-0.75,-0.45,-0.15,0.15,0.45,0.75\}$ and unit charge/coupling, the independent reference recomputes each receiver component as

$$
A_i=\sum_{j\ne i}\frac{x_i-x_j}{|x_i-x_j|^3}.
$$

Every exact Decimal sum lies inside the live joint representation $[c_i-r_i,c_i+r_i]$. The common-translation shared coefficient cancels to zero on all three axes for every receiver. The extreme receiver centers are $-16.262345679012356$ and $16.262345679012356$; their outward projection radii are $8.082807642619792\times10^{-14}$ and $7.7275362747397368\times10^{-14}$.

Plainly: this exercises the actual row builder and receiver-total summation, not a duplicate test-only reducer. The independent calculation checks the result of adding five partner contributions for each of six receivers.

The endpoint-corrector control now uses six paths and therefore the actual 18-component endpoint variable. Its live `certify_joint_endpoint_corrector` call assembles the full $18\times18$ Jacobian from the same coefficient-enclosure interface used by evolution, builds its midpoint preconditioner, and returns a strict Krawczyk inclusion with minimum containment margin $9.9772961308491697\times10^{-4}$. A separately authored 80-digit Decimal elimination solves the declared cyclic linear system; every one of its 18 root components lies inside the production Krawczyk image. Enlarging one independent remainder radius to $10^{-2}$ returns `krawczyk_image_not_strictly_interior` and publishes no corrected state.

Plainly: the production corrector handles the full six-path dimension, agrees with a separately implemented high-precision solution, and rejects a deliberately impossible box.

An append control retains the exact shared coefficient $5\times10^{-4}$ with position remainder $2\times10^{-6}$ and velocity remainder $5\times10^{-6}$, and changes the joint-history identity. The accepted evolution reuses one certified joint start snapshot. The partial-run identities survive checkpoint serialization exactly, and new-process continuation ends with the same joint-history identities as uninterrupted evolution. The fail-closed finite-width joint-event control reports nonempty input identities equal to its published identities.

Plainly: coefficients and uncertainty bounds survive storage and reuse, while a rejected event leaves the joint history byte-identity unchanged at the certificate boundary.

## Convergence And Failure Coverage

The complete coupled-evolution suite retains the existing independent sharp-history and finite-width references, regulator refinement, forced 128-bit event path, under-budget failure, thread replay, checkpoint continuation, and candidate-publication rejection controls. The new controls close the four previously named gaps: live snapshot-row summation, the full 18-component endpoint inclusion, coefficient/remainder append plus cache retention, and unchanged joint-history identity on rejection.

No tighter run of EOM is treated as an independent oracle. The static sum is analytic, and the corrector comparison is a separately authored Decimal solve of the declared system.

## Validation

- `cmake --build .tmp/eom-native-dev --parallel 2`
- `ctest --test-dir .tmp/eom-native-dev --output-on-failure`: 7 passed, 0 failed, 87.87 seconds
- `PYTHONPATH=. ../.venv/bin/python tests/test_eom_native_coupled_evolution.py -v`: 42 passed, 0 failed, 92.969 seconds
- `git diff --check`: passed before priority closeout

## Claim Boundary And Falsifiers

This packet closes EOM-004 at bounded-population numerical-policy grade. It does not certify a physical branch, retained assembly, long-term stability, Borg or Braid fate, consumer migration, distributed execution, GPU/SIMD parity, or million-path capability.

The result is falsified if an analytic static receiver total lies outside its joint representation, the Decimal linear root leaves any Krawczyk image, an oversized corrector box certifies, any retained coefficient or remainder changes across checkpoint continuation, an input segment is rewritten during accepted publication, a rejected joint-history fingerprint differs from its published fingerprint, or any named validation fails on the same source state.

Closure goal: preserve one composable, independently checked error and identity chain from retained histories through difficult-row evaluation to atomic publication.
