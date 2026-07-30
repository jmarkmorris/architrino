# Architrino Lattice Lab Work Queue

This is the canonical execution ledger for the exploratory display-only workstream. [priorities.md](priorities.md) owns the app purpose and claim boundary.

## Ranked Next Objects

No queued objects.

## Queued

No rows.

## In progress

No rows.

## Awaiting verification

No rows.

## Verified

### LAT-001 — Ideal lattice-case contract

- **Status:** Verified
- **Priority object:** `ideal_lattice_case_contract`
- **Request / acceptance:** Select the first idealized arrangement case and declare its sites, polarity assignment, scale convention, finite/infinite boundary treatment, full acceleration ledger, and independent check for sitewise cancellation or non-cancellation.
- **Verified result:** The simple-cubic checkerboard stationary-release case uses sites $\mathbf X_{\mathbf g}=d\mathbf g$, parity-alternating polarities, $c_f=1$, a stationary retained history, and receiver-centered inversion-symmetric exhaustion. Its generative canonical row is $\mathbf A_{\mathbf n}/a_0=-\sigma(\mathbf n)\mathbf n/\|\mathbf n\|^3$. Every offset $\mathbf n$ has the same polarity sign and distance as $-\mathbf n$, so the pair cancels exactly at every finite exhaustion stage and the declared exhaustion result is zero at every receiver.
- **Artifacts:** [certificate](simple-cubic-checkerboard-cancellation-certificate.md), `src/apps/lattice-lab/SimpleCubicStationaryLedger.js`, and `scripts/verify-lattice-lab-simple-cubic-checkerboard.mjs`.
- **Independent check:** `tests/test_lattice_lab_stationary_oracle.py` reconstructs stationary roots and acceleration rows through the pre-existing high-precision EOM reference kernel without importing the JavaScript implementation. The structural verifier checks 48 cube/ball ledgers, 26,400 rows, both receiver polarities, and a tampered-row negative control.
- **Scope:** Derived exact initial acceleration only for the stationary reference repeat and named exhaustion. No arbitrary-order infinite sum, perturbative stability, later evolution, conservation, or physical-medium result.
- **Completion:** Satisfied.

## Deferred / blocked

No rows.

## Superseded / withdrawn

No rows.
