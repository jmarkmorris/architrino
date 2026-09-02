# Octahedral Antipodal Generic-Axis Quotient Domain

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact compact domain frozen; continuous root-and-residual cover remains open
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../platonic-moving-history-reduction.md)

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

This packet freezes geometry and quotient ownership only. It does not certify a causal root, acceleration residual, zero count, balance, EOM evolution, retention, stability, binding, or physical identity. The accepted mixed-face exclusion supplies one interior negative orbit but cannot be propagated to the rest of $\mathcal D$ without a continuous interval argument.

Plainly: one lopsided face direction is ruled out, but nearby and distant axes can change residual signs. The two-simplex cover is the exact domain on which that possibility must be proved or a genuine zero isolated.

## Falsifier And Next Object

An induced axial action outside the six recorded actions, a seed orbit of different size, an axis orbit with no representative satisfying all five halfspaces, a missing extreme ray, or a gap in the two-simplex cone decomposition overturns the corresponding domain statement.

The next certificate must preserve all 30 strict-sub-field partner roots and no nontrivial self roots over each simplex-speed box, then evaluate the nine independent full-vector residual channels. A sign-definite forbidden projection closes a box; otherwise interval Newton or subdivision must isolate every common zero or report the exact unresolved boundary.

Closure goal: certify the complete root and nine-channel residual cover on the two exact generic-axis simplex charts, preserving boundary identifications and the strict $c_f=1$ speed scope.
