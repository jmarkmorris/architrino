# Exact-ray refinement of the fixed-cell block obstruction

**Status: prospective subject witness, known controls passed; independent admission required before target.** This refines the [Cartesian box test](authorized-cases-ten-hour-a-directional-box-witness-specification.md) using the same accepted receiving cell and no physical evolution. The candidate was selected after inspecting that test's emitted original ray intervals. It is not a blind prediction or independently established target result.

The Cartesian-entry enclosure admitted the zero matrix, but zero does not belong to its original ray-entry box because the upper-right entry has a positive lower bound. That observation motivates retaining the exact orthogonal conjugation rather than independently relaxing its Cartesian entries. The fixed candidate for this refined test is

$$
n_0=(-4/5,3/5),\qquad
N=\begin{pmatrix}0&1/10\\0&0\end{pmatrix},\qquad
R_0=\begin{pmatrix}-4/5&-3/5\\3/5&-4/5\end{pmatrix}.
$$

Direct exact multiplication gives

$$
C=R_0NR_0^{\mathsf T}
=\begin{pmatrix}6/125&8/125\\-9/250&-6/125\end{pmatrix},
\qquad C^2=0,\qquad Cn_0=0.
$$

If the complete ray box containsn0 and the complete ray-entry matrix box containsN, then their relaxation with exact unit-vector/orthogonal-conjugation constraints admits the constant current matrixC. Choose g=0, initialxi=0 and initialeta=V0 n0. The exact relaxed error trajectory is xi(t)=(t−L)V0 n0 and eta(t)=V0 n0, because C annihilatesn0. Its whole position and velocity norms arehV0 andV0. If these lie strictly inside the same frozen trials, a block method using only this stronger relaxed set still cannot certify V<V0 on the fixed cell.

The conclusion remains an information limitation, not a physical E trajectory or an assertion that the actual ray is constant. This relaxed set retains one exact orthogonal conjugation and excludes the zero ray matrix, but discards joint relationships among geometry, source jets and matrix entries, and discards the actual time dependence of the ray. A tighter physical set could excludeC. The test identifies which improvement is needed: merely preserving unit length and orthogonal conjugation does not remove this witness; joint geometric/temporal derivative structure or stronger initial/source correlations would be necessary.

The frozen [instrument](../evidence/authorized-cases-ten-hour-a-directional-ray-witness.mjs), SHA `ec05dcb5da4acfc51f75f57b38e83112c165f3dc40b81a3b191e8b83ecfbbc82`, takes exactly the original accepted first-cell subject922b492c, independent audit e1141b10 and provenance9325fa2b pinned in the earlier specification. It reads the original clock.n and clock.AX; it does not use the inflated Cartesian matrix from the earlier witness. Six exact containment tests, exact orthogonal algebra and the same two strict physical trial inequalities decide the result. Original sourceP, delayed source-A, residual and receiving faces are retained in the output.

Known-only receipt `a/directional-ray-witness-known-v1.json`, SHA `c4cb03a746b4e6a6dabdc1001112a93287b069c6465d9ed9cadf0c3f1b5d5e14`, independently expected unit norm, exact matrix entries, C squared zero, Cn0 zero, and positive/negative interval inclusion controls before target. The output is bounded by2MiB. If admitted, use gate `coordinator-admitted-a-existing-cell-ray-witness-v1`, fresh `a/directional-ray-witness-target-v1.json`, the same three source/audit/provenance arguments, one10-second owned supervisor and1024MiB heap. There is no receiving solve, new residual, new comparison or automatic candidate replacement.

A failed containment or slack rejects this witness. A successful subject output still requires independent rational entry/slack audit. A physically impossible witness is not a falsifier of the relaxed-set statement; it instead emphasizes that a subsequent useful certificate must retain the physical constraint excluding it. Applying the result to the exact E family without that distinction would overclaim.
