# Octahedral Antipodal Generic-Axis Quotient Domain

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact compact domain frozen; complete boundary excluded; continuous interior cover remains open
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../analysis/platonic-moving-history-reduction.md)

## Exact Quotient

For the antipodal-alternating word `+-+-+-`, the twelve coloured equation symmetries induce six distinct actions on the oriented angular-velocity axis. Choose the integer seed $\mathbf q=(1,2,4)$. A closed Dirichlet representative cell on the unit sphere is

$$
\mathcal D
=
\left\{
\hat{\mathbf n}\in S^2:
\hat{\mathbf n}\mathbin{\cdot}\mathbf q
\geq
\hat{\mathbf n}\mathbin{\cdot}A\mathbf q
\text{ for every induced axial action }A
\right\}.
$$

Every oriented axis orbit has at least one representative in $\mathcal D$: select the orbit point whose inner product with $\mathbf q$ is maximal. Interior representatives are unique; boundary duplicates are retained and must be joined by the recorded group action rather than discarded.

Plainly: the continuous sphere of rotation directions is reduced to one exact sixth of the sphere. The boundary can contain two equivalent copies, which is safer for a fail-closed interval cover than silently dropping an edge.

The five nontrivial halfspace normals are

$$
(2,6,6),\quad(3,3,8),\quad(5,4,5),\quad(-3,1,2),\quad(-1,-2,3).
$$

Their spherical cone has four cyclic extreme rays

$$
(-3,-10,11),\quad(3,-11,10),\quad(1,1,1),\quad(-11,10,3).
$$

Splitting along the first-to-third diagonal gives two exact simplex charts. For triangle rays $(\mathbf r_0,\mathbf r_1,\mathbf r_2)$, use

$$
\mathbf u(a,b)=a\mathbf r_0+b\mathbf r_1+(1-a-b)\mathbf r_2,
\qquad
a\geq0,\quad b\geq0,\quad a+b\leq1,
$$

and $\hat{\mathbf n}=\mathbf u/\|\mathbf u\|$. The dot product $\mathbf q\mathbin{\cdot}\mathbf u$ stays positive throughout both simplices, so normalization never encounters zero. Pair either simplex with $0\leq\beta\leq1$ for the compact numerical cover; retain $0\leq\beta<1$ as the strict scientific speed domain.

Plainly: the remaining generic-axis calculation is now two triangular parameter boxes plus speed, not an undefined search over arbitrary display directions.

## Exact Audit And Boundary

The checker `scripts/prescribed-path-analysis/oracle/freeze_octahedral_antipodal_generic_axis_domain.py` reconstructs the coloured axial group, six-element seed orbit, five halfspaces, four extreme rays, and two nondegenerate cone simplices using exact SymPy integer arithmetic.

Run:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/freeze_octahedral_antipodal_generic_axis_domain.py
```

Two consecutive executions produced byte-identical standard output at SHA-256 `980c71760b3895dee283320db657a78c998783d855300e1ff8ebc12c20158a76`; the checker SHA-256 is `cd4e1b9047cd4030ef5f7674a47f9b496862a3e73efac249ac00f813f5f4de5e`.

This packet freezes geometry and quotient ownership only. It does not itself certify a causal root, acceleration residual, zero count, balance, EOM evolution, retention, stability, binding, or physical identity. The accepted mixed-face exclusion supplies one interior negative orbit. The separate [face-diagonal exclusion](2026-09-02-octahedral-antipodal-face-diagonal-exclusion.md) excludes the extreme ray $(1,1,1)$ continuously over the strict sub-field speed chart. The remaining-extreme-ray checker excludes $(-3,-10,11)$, $(3,-11,10)$, and $(-11,10,3)$ by tangential projections in `[-1.128562106033269,-0.1017572007967045]`; each cover uses 67 accepted boxes, maximum depth one, and minimum transmitter factor `0.780378125607363351388980056231164221085295574`. The [complete five-edge certificate](2026-09-02-octahedral-antipodal-generic-axis-edge-exclusion.md) now propagates complete roots and all nine residual channels through 9,078 outward-rounded boxes, excluding every quotient edge with no survivor. Neither fixed-axis nor edge exclusion propagates into a simplex interior without a continuous interval argument in both axis parameters.

Run the three-ray certificate with:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_remaining_extreme_rays.py
```

Two consecutive outputs were byte-identical at SHA-256 `b905ae94edbaf31adf5673a94bec17411149484fe36ab9bda76e53d89b941cc2`; the wrapper SHA-256 is `c4aa2278d46f1da6672ea08ceb62dc3e7464fd8f86d729aac0855218b81f861c`.

The unchanged generic prescribed-history evaluator independently samples all three declared tangential projections at six speeds, retains five partner roots per receiver, and places every sample inside the interval enclosure. All five focused octahedral tests pass; the test SHA-256 is `da4b7f4165c7836753f2de19919aaeeb7db1c0faca4105f2a1a2960184ef2718`.

Plainly: one lopsided face direction, all four corner axes, and all five connecting edges are ruled out. A residual sign can still change inside either triangular chart, so both interiors remain to be proved empty or to yield a genuine isolated zero.

## Falsifier And Next Object

An induced axial action outside the six recorded actions, a seed orbit of different size, an axis orbit with no representative satisfying all five halfspaces, a missing extreme ray, or a gap in the two-simplex cone decomposition overturns the corresponding domain statement.

The next certificate must preserve all 30 strict-sub-field partner roots and no nontrivial self roots over each interior simplex-speed box, inherit the certified edge ownership on shared boundaries, and evaluate the nine independent full-vector residual channels. A sign-definite forbidden projection closes a box; otherwise interval Newton or Krawczyk plus subdivision must isolate every common zero or report the exact unresolved boundary.

Closure goal: certify the complete root and nine-channel residual cover on the two exact generic-axis simplex charts, preserving boundary identifications and the strict $c_f=1$ speed scope.
