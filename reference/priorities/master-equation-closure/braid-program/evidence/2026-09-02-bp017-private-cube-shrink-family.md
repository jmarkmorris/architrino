# BP-017 Private-Cube Shrink Family

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: exact periodic packing family derived; dynamics remain blocked by BP-016
Queue owner: [BP-017 — Packed Platonic Assembly-History Program](../work-queue.md#bp-017--packed-platonic-assembly-history-program)

## Exact Family

For $0<s<1$, give lattice cell $\mathbf k\in\mathbb Z^3$ the eight private members

$$
\mathbf v_{\mathbf k,\boldsymbol\varepsilon}(s)
=
2\mathbf k+s\boldsymbol\varepsilon,
\qquad
\boldsymbol\varepsilon\in\{-1,+1\}^3.
$$

The owned solid is the cube $\prod_i[2k_i-s,2k_i+s]$, with edge $2s$ and circumradius $\sqrt3s$. For distinct cells, the exact solid-to-solid separation is

$$
d(\mathbf k,\mathbf l;s)^2
=
\sum_{i=1}^3
\max\!\left(0,2|k_i-l_i|-2s\right)^2.
$$

Its minimum is $2(1-s)>0$, attained by face-neighboring cells. The volume fraction is

$$
\phi(s)=\frac{(2s)^3}{2^3}=s^3.
$$

Thus every $0<s<1$ gives strict private ownership and separation, $0<\phi<1$, and $\sup\phi=1$ as $s\to1^-$; the supremum is not attained under strict separation. The earlier unit-edge construction is the exact member $s=1/2$, with separation one and fraction $1/8$.

Plainly: the prior packing is one point in a complete shrink family. Larger private cubes fill more of each lattice cell, but the empty gap closes at exactly the same limit where strict separation would be lost.

## Exact Audit And Boundary

The rational checker reconstructs the center cell and all 26 nearest cells for several exact rational $s$ values, verifies all 216 coordinates are distinct, and confirms the derived nearest-neighbor separation and volume fraction.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/verify_private_cube_shrink_family.py
"${AAA_VENV:-../.venv}/bin/python" tests/test_bp017_private_cube_shrink_family.py
```

The checker SHA-256 is `50831e1b7d453cfe799e6880aa6c5a4935e362fc10988eca4e95d11932f82ead`; the test SHA-256 is `e35cbb8d9e30c215b68a9e40bf66b75d58c01f9998d21953bf8ebaa2df0793c3`.

This is a **derived exact geometry** result. It assigns no polarity, source history, causal-root ledger, acceleration balance, cross-assembly cancellation, EOM evolution, retention, stability, binding, physical identity, score, or scientific acceptance. BP-016 has not supplied the qualified finite component history required before any BP-017 dynamics calculation. A later independence claim must calculate every cross-assembly acceleration contribution rather than infer independence from positive separation.

A coordinate collision for $0<s<1$, an inter-cell distance below $2(1-s)$, a packing fraction different from $s^3$, or attainment of $\phi=1$ with positive separation falsifies the corresponding theorem.

Closure goal: preserve the exact shrink family, wait for a qualified BP-016 finite history, and only then construct a finite multi-cell history with complete cross-assembly acceleration accounting.
