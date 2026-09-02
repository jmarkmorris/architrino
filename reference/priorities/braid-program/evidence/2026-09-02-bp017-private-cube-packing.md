# BP-017 Private-Vertex Cube Packing

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact geometry construction ready for independent integration review; dynamics not authorized
Queue owner: [BP-017 — Packed Platonic Assembly-History Program](../work-queue.md#bp-017--packed-platonic-assembly-history-program)

## Exact Construction

Let the cell centers be $\mathbf c_{\mathbf k}=2\mathbf k$ for $\mathbf k\in\mathbb Z^3$. Give cell $\mathbf k$ the eight privately owned members

$$
\mathbf v_{\mathbf k,\boldsymbol\varepsilon}
=
2\mathbf k+\frac12\boldsymbol\varepsilon,
\qquad
\boldsymbol\varepsilon\in\{-1,+1\}^3,
$$

with persistent member identity $(\mathbf k,\boldsymbol\varepsilon)$. Each cell is a unit-edge cube of circumradius $\sqrt3/2$. Its volume is one inside a lattice fundamental volume of eight, so the geometric packing fraction is exactly $1/8$.

Plainly: start with the ordinary edge-two cubic cell complex and shrink every cube by one half toward its own center. Each resulting vertex belongs to exactly one cube.

## Ownership And Noncoincidence Proof

Suppose two declared coordinates coincide. Then

$$
2(\mathbf k-\mathbf l)
=
\frac12(\boldsymbol\eta-\boldsymbol\varepsilon).
$$

Each coordinate on the left is an even integer, while each coordinate on the right belongs to $\{-1,0,1\}$. Equality therefore forces $\mathbf k=\mathbf l$ and $\boldsymbol\varepsilon=\boldsymbol\eta$. Thus both member identity and coordinate ownership are unique.

For different cells, at least one center coordinate differs by two or more. The two vertex offsets in that coordinate can close at most one unit of that gap, so every inter-cell vertex separation is at least one. More strongly, the closed solid owned by cell $\mathbf k$ is the Cartesian product of the three intervals $[2k_i-1/2,2k_i+1/2]$. For cells $\mathbf k\ne\mathbf l$, their squared solid-to-solid separation is

$$
\sum_{i=1}^3\max\!\left(0,2|k_i-l_i|-1\right)^2,
$$

which is at least one and is attained by face-neighboring cells. Thus the cube interiors and boundaries are disjoint, not merely their declared vertices.

Plainly: adjacent private cubes have a full unit of empty coordinate gap between their nearest vertices. No diagonal arrangement can make two vertices closer because one lattice direction already supplies that unit gap.

## Exact Audit

The checker `scripts/prescribed-path-analysis/oracle/verify_private_cube_packing.py` reconstructs the center cell and all 26 nearest translated cells with exact rational arithmetic. It verifies 216 unique member coordinates, the complete fundamental cube distance set $\{1,2,3\}$ in squared units, and exact minimum inter-cell vertex and whole-solid separation one.

Run:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/verify_private_cube_packing.py
```

Two consecutive executions produced byte-identical standard output at SHA-256 `OUTPUT_SHA256`; the checker SHA-256 is `CHECKER_SHA256`.

The construction is an exact periodic geometry result. It does not assign a polarity word, component history, causal-root ledger, acceleration balance, cross-assembly cancellation, EOM evolution, retention, stability, binding, particle identity, score, or scientific acceptance. BP-016 must first supply a source-qualified finite history before this geometry can authorize any history calculation.

Plainly: this closes the first packing-design question—whether separate Platonic cells can own noncoincident vertices. It does not show that the cubes are braids or that separated candidate histories ignore each other.

## Falsifier

A duplicated identity or coordinate, an inter-cell vertex or whole-solid separation below one, a non-unit cube edge, or a fundamental-cell volume fraction different from $1/8$ overturns the corresponding statement. A later nonzero cross-assembly acceleration would not overturn this geometry; it would falsify dynamical independence.

Closure goal: independently review this exact private-vertex construction, then attach histories only after BP-016 supplies a qualified source history and keep every cross-assembly acceleration contribution explicit.
