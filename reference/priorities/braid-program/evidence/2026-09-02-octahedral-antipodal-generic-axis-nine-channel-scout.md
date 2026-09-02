# Octahedral Antipodal Generic-Axis Nine-Channel Scout

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: measured edge-and-interior scout; continuous certificate remains open
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)

## Result

The tracked scout evaluates the two exact quotient simplices, including all five distinct edges, with normalized wake speed $c_f=1$. For each axis and speed it solves all fifteen representative partner roots, reconstructs the three inversion-paired receiver rows, fits one common positive-or-negative rigid scale in least squares, and records all nine Cartesian residual components. The default bounded grid uses nine points on every edge, the order-four barycentric grid in each simplex, and seventeen speeds from $0.001$ through $0.999$.

The smallest measured maximum nine-channel residual on the five edges is respectively 0.7079902223679769, 0.5551709337915427, 0.5551709337915427, 0.5551709337915427, and 0.6019985556604693. The two simplex minima are both 0.5551709337915427 and occur at the already excluded face-diagonal vertex. The minimum recorded transmitter factor is positive in every evaluated row.

Plainly: no sampled edge or interior point resembles a common zero, and every sampled causal root remains transverse. The grid does not cover the continuum, so it cannot exclude a narrow zero between samples.

## Reproduction And Next Certificate

Run:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/scout_octahedral_antipodal_generic_axes.py
"${AAA_VENV:-../.venv}/bin/python" tests/test_octahedral_antipodal_generic_axis_scout.py
```

The scout SHA-256 is `875783db98002ed7cb3484d9f714eaadff504a3d51f68bd8497254384ce9a18a`; the focused control SHA-256 is `998aaba2a0d770b75ab58123456f1b11f17bec424c97612c173e4c0201522fa7`.

The next executable certificate is now ordered: subdivide all five distinct edge-speed rectangles with outward-rounded axis normalization, preserve every one of the 30 directed partner roots and their exact boundary ownership, evaluate all nine residual components, and close a box only by a sign-definite channel. Any surviving box must receive interval Newton or Krawczyk. The two simplex interiors remain downstream of that edge census.

## Claim Grade And Falsifier

- **Measured:** the finite grid values and positive transmitter factors.
- **Derived implementation target:** three antipodal receiver representatives supply the nine generic-axis channels once the complete strict-sub-field root theorem is applied.
- **Not established:** complement exclusion, a continuous edge or simplex no-zero result, a common-zero isolation, balance, evolution, retention, stability, binding, identity, score, or scientific acceptance.

A replay mismatch, an omitted exact quotient edge, a smaller grid residual, a nonpositive recorded transmitter factor, or an independently evaluated grid point outside the recorded nine-channel result falsifies the corresponding measurement. A zero between grid points does not falsify the finite result; it falsifies any attempted promotion of the scout to continuous exclusion.

Closure goal: replace the finite scout by an outward-rounded five-edge certificate, then apply the same complete-root and nine-channel treatment to both simplex interiors.
