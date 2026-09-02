# Octahedral Antipodal Sum-Edge Exclusion

Date: 2026-09-01
Compatibility identifier: `aaa-corpus-advancement`
Status: accepted computer-assisted derived exclusion
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../platonic-moving-history-reduction.md)

## Decision

The antipodal-alternating octahedral word `+-+-+-`, in vertex order $(+\mathbf e_x,-\mathbf e_x,+\mathbf e_y,-\mathbf e_y,+\mathbf e_z,-\mathbf e_z)$, has no rigid prescribed acceleration balance about

$$
\hat{\mathbf n}=\frac{\mathbf e_x+\mathbf e_z}{\sqrt2}
$$

for any dimensionless angular speed $0\leq\beta<1$ with $c_f=1$. Because $\hat{\mathbf n}\mathbin{\cdot}\mathbf e_y=0$, the prescribed rigid acceleration at receiver $+\mathbf e_y$ is parallel to $-\mathbf e_y$ and has zero x component. The complete delayed x-acceleration instead obeys

$$
F_{+y,x}([0,1])\subset
[-1.67929680067734487186395131105124139889323948,
-0.650075702972164518079844803765152276251955282].
$$

The strict sign obstruction excludes the complete antipodal-alternating sum-edge orbit on the declared speed chart. It establishes no result for another word or axis, field- or super-field speed, deformation, ordinary EOM evolution, retention, stability, binding, or physical realization.

Plainly: this vertex must accelerate only along the y direction to remain on the rigid orbit, but the delayed interaction always adds a substantial negative x component. No radius or angular rate below field speed can remove that sideways mismatch.

## Certified Root And Acceleration Cover

The tracked oracle instantiates the exact rigid causal-root reduction from the mathematical owner. It covers the closed numerical interval $0\leq\beta\leq1$ with 82 accepted boxes obtained from 64 initial boxes and at most one bisection level. The scientific conclusion retains the strict domain $0\leq\beta<1$.

For the obstructed $+\mathbf e_y$ receiver, the oracle directly encloses one unique causal partner root from each of the five other vertices. The minimum certified transmitter factor is

$$
D_{uv}>0.816673612788766191175418041205655633560941338.
$$

The exact strict-sub-field theorem supplies the global census of 30 directed partner roots and no nontrivial self roots. The certified x-acceleration upper endpoint remains more than $0.650075702972164$ below the required zero component.

Plainly: the obstruction includes every delayed contribution reaching the selected receiver, and none lies near a root fold. One failed receiver component is sufficient to rule out a six-receiver common balance.

## Reproducibility And Independent Check

Run the certificate with:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_sum_edge.py
```

Two consecutive runs produced byte-identical standard output at SHA-256 `5dcc50c69ecdfdf5713ae373daa2125c5f5f750e2912ea95c96cb7c2368d7bb3`. The thin chart wrapper has SHA-256 `68dde2b21669ad2ff79605699aa16a522006fa0ff09df3a9873de6cdef174746`; the shared interval implementation has SHA-256 `6a70226997c3c77468f1934293eda8ebc36b88b08d0d2560cf8c4dbfdfd774b8`.

Run the independent point checks with:

```sh
node --test tests/octahedral-nine-channel-edge-axis.test.js
```

The test has SHA-256 `4b155aef83ee8d609d346d95f1ac6b370a63b541ab19d560d04196a38d01a116`. At $\beta\in\{0.1,0.25,0.5,0.75,0.9,0.99\}$, the unchanged generic prescribed-history evaluator independently finds five partner roots at every receiver and reproduces the strict-negative $+\mathbf e_y$ x-acceleration inside the certified global enclosure.

The Python oracle directly encloses the rigid scalar equations with `mpmath 1.3` `libmpi`; the point check uses the existing general moving-circular prescribed-history evaluator and shares no root implementation with the oracle. The point check samples the chart and therefore does not prove continuous coverage. The outward-rounded oracle supplies that coverage, while the exact reduction supplies the mathematical link between the enclosed roots and the forbidden acceleration component.

Plainly: two different root calculations agree on representative speeds and the five-roots-per-receiver topology. The all-speed conclusion comes from the outward-rounded interval cover, not from sampling.

## Claim Grade And Falsifiers

- **Derived:** rigid rotation about the declared axis requires zero x-acceleration at $+\mathbf e_y$, and the rigid causal-root equations reduce the complete receiver row to five partner contributions.
- **Computer-assisted derived:** outward-rounded intervals certify those five roots, a positive transmitter-factor floor, and a strictly negative complete x-acceleration throughout the declared chart; the separately derived strict-sub-field theorem supplies the global 30-root census.
- **Bounded nonexistence:** no rigid prescribed acceleration balance exists for the antipodal-alternating sum-edge orbit at $0\leq\beta<1$.
- **Not established:** any other word or axis, $\beta\geq1$, a deformed or non-rigid history, ordinary EOM evolution, retention, stability, binding, particle identity, score, or scientific acceptance.

A complete-root evaluation with nonnegative $+\mathbf e_y$ x-acceleration at any $0\leq\beta<1$, a missed partner or self root, a nonpositive transmitter factor, a gap in the interval cover, an error in the exact rigid projection, or an outward-rounding failure overturns the corresponding conclusion.

Plainly: this closes the selected sum-edge stratum only. The mixed-face and continuous generic-axis systems retain their own proof burdens.
