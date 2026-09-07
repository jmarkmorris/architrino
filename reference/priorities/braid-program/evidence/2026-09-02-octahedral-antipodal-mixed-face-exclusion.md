# Octahedral Antipodal Mixed-Face Exclusion

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: computer-assisted derived exclusion ready for independent integration review
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../analysis/platonic-moving-history-reduction.md)

## Decision

For the antipodal-alternating octahedral word `+-+-+-`, in vertex order $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, consider rigid rotation about

$$
\hat{\mathbf n}=\frac{\mathbf e_x+\mathbf e_y-\mathbf e_z}{\sqrt3}
$$

with normalized wake speed $c_f=1$ and dimensionless angular speed $0\leq\beta<1$. At receiver $+\mathbf e_x$, the direction

$$
\hat{\mathbf t}=\frac{\mathbf e_y+\mathbf e_z}{\sqrt2}
$$

is orthogonal to both $\hat{\mathbf n}$ and $\mathbf e_x$. The prescribed rigid acceleration lies in their span, so its $\hat{\mathbf t}$ projection is exactly zero. The complete delayed acceleration instead satisfies the outward-rounded enclosure

$$
\mathbf A_{+x}([0,1])\mathbin{\cdot}\hat{\mathbf t}
\subset
[-1.22125065916056183910655721053412361849782576,
-0.590024110286817937424900870673214622965649004].
$$

The strict sign excludes this complete mixed-face-axis orbit on the declared strict sub-field chart. It establishes no result for another axis stratum, $\beta\geq1$, deformation, ordinary EOM evolution, retention, stability, binding, or physical realization.

Plainly: rigid rotation requires no acceleration in the one direction perpendicular to both the receiver radius and the rotation axis. Every delayed contribution together produces a substantial negative component in that forbidden direction, so neither radius nor sub-field angular speed can balance this history.

## Certified Cover

The shared outward-rounded oracle now admits an exact projection vector in addition to a coordinate component. The mixed-face wrapper covers $0\leq\beta\leq1$ with 242 accepted boxes from 64 initial boxes, 420 processed boxes, and maximum refinement depth seven. For the selected receiver it encloses all five partner roots on every box. The strict-sub-field theorem supplies the complete 30 directed partner roots and absence of nontrivial self roots. The minimum transmitter factor is greater than $0.7357704957572767$, and the certified strict-negative margin is greater than $0.5900241102868179$.

Plainly: the interval calculation covers the whole speed interval rather than a sample, and it stays away from a root fold. One forbidden receiver component is enough to exclude a six-receiver common balance.

## Reproduction And Independent Check

Run the certificate with:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_mixed_face.py
```

Two consecutive executions produced byte-identical standard output at SHA-256 `c3d0001d2275e518e5ca980ade38c64df993af6a34b050d981bfb02d1c24a694`. The wrapper SHA-256 is `48a6a101eefc89de0fb7721c5e2342874ba4c4c55c0e62503bd5b01ea104e4a1`; the shared interval implementation SHA-256 is `846a660e0be20b5361c83e7ed806eb9ccfa4dbe468622c108f002e81af665367`.

Run the independent point checks with:

```sh
node --test tests/octahedral-nine-channel-edge-axis.test.js
```

The unchanged generic prescribed-history evaluator independently checks $\beta\in\{0.1,0.25,0.5,0.75,0.9,0.99\}$, returns five partner roots for every receiver, and reproduces the strict-negative projection. All five focused octahedral tests pass. The test SHA-256 is `da4b7f4165c7836753f2de19919aaeeb7db1c0faca4105f2a1a2960184ef2718`.

Plainly: the point instrument and the interval oracle solve roots through different implementations. The point checks do not prove the continuum; they independently test the oracle's root and projection meaning at representative speeds.

## Claim Grade And Falsifier

- **Derived:** the prescribed rigid acceleration has zero $\hat{\mathbf t}$ projection.
- **Computer-assisted derived:** outward-rounded intervals enclose the selected complete receiver row with a strict negative projection over the full declared speed chart.
- **Bounded nonexistence:** no rigid prescribed acceleration balance exists for this antipodal-alternating mixed-face-axis orbit at $0\leq\beta<1$.
- **Not established:** another mixed-face or generic-axis orbit not related by the coloured equation symmetry, field- or super-field speed, non-rigid motion, evolution, retention, stability, binding, identity, score, or scientific acceptance.

A complete-root evaluation with a nonnegative selected projection at any $0\leq\beta<1$, a missed partner or self root, a nonpositive transmitter factor, a gap in the interval cover, an error in the exact zero prescribed projection, or an outward-rounding failure overturns the corresponding conclusion.

Closure goal: integrate this exclusion after independent review, then cover the continuous generic-axis nine-channel chart without inferring it from this one symmetry orbit.
