# Octahedral Fold-Aware Cross-Binary Source Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-quarter-profile-certificate](octahedral-fold-aware-cross-binary-quarter-profile-certificate.md). The predecessor reduces the representative cross-binary clock/length problem to one quarter-period primitive. This packet maps the source rows and fold cells inside that quarter period.

It is a source/fold atlas, not a coarea interval certificate. It does not certify the retained branch.

## Source Classes

The representative receiver is $1+$ and the quarter domain is

$$
0\le u < \frac{H}{4}.
$$

The four cross-binary source rows reduce to the following classes:

| Source | $\kappa$ | $\tilde\theta$ | force sign |
| --- | ---: | --- | ---: |
| $2+$ | $+1$ | $\theta$ | $+1$ |
| $2-$ | $-1$ | $\theta+\pi/2$ | $-1$ |
| $3+$ | $-1$ | $\theta$ | $+1$ |
| $3-$ | $+1$ | $\theta+\pi/2$ | $-1$ |

The reduced cross-binary equation is

$$
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0.
$$

The fold equation is

$$
F_{\kappa,v}=0,
\qquad
F_{\delta}=0,
$$

with

$$
F_{\delta}
=
\frac{2\delta}{v^2}
-\cos(2\tilde\theta-\delta)
+\kappa\cos\delta.
$$

The ordinary projected Jacobian obeys

$$
\boxed{
F_{\delta}
=
\frac{2\delta}{v^2}J.
}
$$

This identity is the reason a future interval proof must use coarea cells at projected folds rather than a global positive $|J|$ floor.

## Fold Endpoint Atlas

At the certified zero-ray representative

$$
v_*\approx3.021564740248,
$$

the $\kappa=+1$ fold equation has two fold endpoints in $\tilde\theta\pmod\pi$:

$$
\tilde\theta_1\approx1.159039827771,
\qquad
\delta_1\approx1.317120096091,
$$

and

$$
\tilde\theta_2\approx2.568166982038,
\qquad
\delta_2\approx3.296355158443.
$$

The $\kappa=-1$ fold equation has no fold endpoints at this speed.

Thus, over the representative quarter domain:

$$
2+:
\quad
[0,\tilde\theta_1)
\;\text{is one-root},
\qquad
(\tilde\theta_1,H/4)
\;\text{is three-root}.
$$

For $3-$, subtract the $\pi/2$ source shift from the second $\kappa=+1$ endpoint:

$$
\tilde\theta_2-\frac{\pi}{2}
\approx
0.997370655243.
$$

Therefore

$$
3-:
\quad
[0,0.997370655243)
\;\text{is three-root},
\qquad
(0.997370655243,H/4)
\;\text{is one-root}.
$$

The $\kappa=-1$ rows stay one-root through the quarter:

$$
2-:\;\text{one-root on }[0,H/4),
\qquad
3+:\;\text{one-root on }[0,H/4).
$$

The sampled source root-count regimes are therefore:

$$
2+:\{1,3\},
\qquad
3-:\{1,3\},
\qquad
2-:\{1\},
\qquad
3+:\{1\}.
$$

## Source-Pair Quarter Antisymmetry

The source rows pair under the quarter shift:

$$
\boxed{
f_{2+}(u)+f_{3-}\left(u+\frac{H}{4}\right)=0,
}
$$

and

$$
\boxed{
f_{2-}(u)+f_{3+}\left(u+\frac{H}{4}\right)=0.
}
$$

The executable atlas checks this pairwise residual at sampled phases and finds it at numerical null scale. This pairwise row explains the cross-binary quarter-shift identity used in the predecessor packet:

$$
f_{\times}\left(u+\frac{H}{4}\right)=-f_{\times}(u).
$$

The same transport holds at the root-row level: paired source rows have matching root counts and phase delays after the quarter shift, matching Jacobians, and opposite tangential scalar contributions. Hence the four labeled source rows reduce to two canonical source classes:

$$
\boxed{
2+ \longleftrightarrow 3-,
\qquad
2- \longleftrightarrow 3+.
}
$$

Equivalently, the interval proof needs one canonical $\kappa=+1$ source class and one canonical $\kappa=-1$ source class, plus their quarter-shift transports. The atlas does not support a further reduction to one canonical row across $\kappa=+1$ and $\kappa=-1$.

## Burden Reduction

The future coarea interval proof no longer has to discover the source topology. It has to enclose the quarter profile on two canonical source classes and their transports:

- a canonical $\kappa=+1$ source class, represented by $2+$, with its folded source cells and the transported $3-$ row;
- a canonical $\kappa=-1$ source class, represented by $3+$, with its one-root row and the transported $2-$ row.

The only fold endpoints to enclose are the two $\kappa=+1$ endpoints above. The $\kappa=-1$ rows require regular one-root bounds only at this speed.

The direct successor [octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction](octahedral-fold-aware-cross-binary-source-atlas-quarter-cell-reduction.md) consumes this atlas and fixes the unified quarter-cell partition:

$$
\boxed{
[6,4,6]
\quad\text{across}\quad
0<\theta_{3-}<\theta_{2+}<H/4.
}
$$

It also fixes the source-atlas-aware formula for $f_\times$, $C_\times$, $m_Q$, and $M_Q$ while preserving that their interval enclosures remain open.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-source-atlas.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-source-atlas.mjs) emits:

- the source quarter-profile predecessor validation;
- no-fixed-speed-window atlas parameters;
- $\kappa=+1$ fold endpoints and the absence of $\kappa=-1$ folds;
- per-source root-count regimes and quarter cell rows;
- source-pair quarter antisymmetry checks;
- root-level source-pair transport checks;
- the two-canonical-$\kappa$ source-class reduction;
- fold-cell adjacency checks around the two quarter-domain fold boundaries;
- non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-source-atlas.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-source-atlas.test.js) verifies source scope, speed-window removal, four-source coverage, root-count regimes, fold endpoint positions, source-pair antisymmetry, fold-cell adjacency, CLI emission, JSON validation, and non-retention claims.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_cross\_binary\_source\_fold\_atlas=true}.
$$

It also certifies:

$$
\texttt{certifies\_two\_canonical\_kappa\_source\_classes=true}.
$$

It does not certify:

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{cross-binary-quarter-source-fold-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it identifies the exact source-class fold topology for the remaining quarter-profile proof. Its direct successor upgrades that topology into a source-atlas-aware three-cell formula reduction. Neither packet should be promoted into reader-facing AAA prose until the atlas is used by a coarea interval enclosure for $C_\times$, $m_Q$, and $M_Q$.
