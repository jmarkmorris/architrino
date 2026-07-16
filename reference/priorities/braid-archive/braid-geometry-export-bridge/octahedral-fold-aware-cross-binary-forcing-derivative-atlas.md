# Octahedral Fold-Aware Cross-Binary Forcing-Derivative Atlas

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-fold-square-limit-atlas](octahedral-fold-aware-cross-binary-fold-square-limit-atlas.md). The predecessor supplies the square-coordinate endpoint model for projected folds. This packet supplies the regular-cell derivative formula for the source-atlas-aware quarter forcing

$$
f_\times(u)
=
s_{+,+}(u)
-
s_{+,+}(u+Q)
+
s_{-,+}(u)
-
s_{-,+}(u+Q),
\qquad
Q=\frac{\pi}{2}.
$$

It is a sampled source-atlas-aware forcing-derivative atlas. It is not an interval derivative enclosure, not an interval critical-exhaustion theorem, not an interval quadrature certificate, and not a retained branch.

## Regular-Cell Derivative

On a regular open cell, each canonical source root solves

$$
F_{\kappa,v}(\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+
\sin(2\theta-\delta)
+
\kappa\sin\delta
=0.
$$

Write

$$
\phi=2\theta-\delta,
\qquad
D=F_\delta
=
\frac{2\delta}{v^2}
-
\cos\phi
+
\kappa\cos\delta.
$$

Since the row is regular, $D\ne0$ and implicit differentiation gives

$$
\boxed{
\delta'(\theta)
=
-\frac{F_\theta}{F_\delta}
=
-\frac{2\cos\phi}{D}.
}
$$

The source-row kernel is

$$
B
=
-\frac12\left(\cos\phi+\kappa\cos\delta\right),
$$

with

$$
\dot B
=
\sin\phi
+
\frac12\left(\kappa\sin\delta-\sin\phi\right)\delta',
$$

and

$$
\dot D
=
2\sin\phi
+
\left(
\frac{2}{v^2}
-
\sin\phi
-
\kappa\sin\delta
\right)\delta'.
$$

Therefore

$$
\boxed{
s'_{\kappa,\sigma}(\theta;v)
=
\sum_{\delta\in\mathcal R^+_{\kappa,v}(\theta)}
\frac{2\sigma}{v\delta^2|D|}
\left[
\dot B
-
B
\left(
\frac{2\delta'}{\delta}
+
\frac{\dot D}{D}
\right)
\right].
}
$$

The quarter forcing derivative is then

$$
\boxed{
f'_\times(u)
=
s'_{+,+}(u)
-
s'_{+,+}(u+Q)
+
s'_{-,+}(u)
-
s'_{-,+}(u+Q).
}
$$

This formula is valid on the three regular open cells only. At the two projected folds, the square-coordinate model from the predecessor remains the correct local chart.

## Regular Critical Rows

At the two sampled regular primitive-critical locations, the derivative row gives negative nonzero slopes:

| Candidate | $u$ | $f_\times(u)$ | $f'_\times(u)$ | Finite-difference check | Classification |
| --- | ---: | ---: | ---: | ---: | --- |
| `I1.z1` | $0.129625153956$ | $\approx-2.62\times10^{-13}$ | $-0.090309125625$ | $-0.090309127618$ | sampled nondegenerate local maximum of $A$ |
| `I2.z1` | $1.133431464570$ | $\approx-3.72\times10^{-12}$ | $-4.176455139963$ | $-4.176454792812$ | sampled nondegenerate local maximum of $A$ |

Here

$$
A(u)=\int_0^u f_\times(q)\,dq.
$$

Thus both regular sampled zeros of $A'(u)=f_\times(u)$ are simple negative-slope crossings. This strengthens the primitive-critical atlas: the two regular critical points are no longer merely sign-change samples; they now carry an executable implicit-derivative witness for nondegeneracy.

## What Remains Open

This packet does not prove that there are no additional zeros of $f_\times$ on $I_1$, $I_2$, or $I_3$. It reduces that future proof to a sharper object:

$$
\text{bound the explicit expression for }f'_\times
\text{ on each regular cell,}
$$

while using the predecessor's square-coordinate fold limits at the endpoints. A true interval critical-exhaustion theorem still needs outward-rounded derivative bounds or an interval Newton-style exclusion on each cell. A true interval profile still needs interval quadrature for

$$
C_\times,
\qquad
m_Q,
\qquad
M_Q.
$$

The direct successor [octahedral-fold-aware-cross-binary-forcing-topology-atlas](octahedral-fold-aware-cross-binary-forcing-topology-atlas.md) packages the sampled regular-cell topology that this derivative formula exposes: $I_1$ is sampled decreasing with one forcing zero, $I_2$ has one sampled derivative crest followed by one forcing zero, and $I_3$ is sampled increasing but remains negative. It still leaves interval critical exhaustion open.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-forcing-derivative-atlas.mjs) emits:

- predecessor validation for the critical-value atlas;
- predecessor validation for the fold-square limit atlas;
- no-fixed-speed-window derivative parameters;
- the implicit source-root derivative formula;
- regular-cell formula comparison rows against the pointwise witness;
- finite-difference derivative checks on regular samples;
- two regular critical derivative rows;
- non-retention and non-interval boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-forcing-derivative-atlas.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-forcing-derivative-atlas.test.js) verifies predecessor validation, speed-window removal, derivative formula emission, witness agreement, finite-difference derivative agreement, regular critical nondegeneracy, CLI emission, JSON validation, invalid controls, and non-retention claims.

## Claim Boundary

This packet certifies only sampled derivative and nondegeneracy rows:

$$
\texttt{certifies\_source\_atlas\_aware\_derivative\_formula=true},
$$

$$
\texttt{certifies\_formula\_witness\_agreement\_on\_regular\_samples=true},
$$

and

$$
\texttt{certifies\_sampled\_regular\_critical\_nondegeneracy=true}.
$$

It does not certify:

$$
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_fold\_limit\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_quadrature\_enclosure=false},
$$

$$
\texttt{certifies\_C\_m\_Q\_M\_Q\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
$$

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
\texttt{sampled-source-atlas-aware-forcing-derivative-atlas-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it turns the regular-cell critical-exhaustion problem into an explicit derivative-bounding problem and proves sampled nondegeneracy for the two regular primitive-critical rows. Its direct successor recovers the sampled forcing topology from that derivative formula. Neither packet should be promoted into reader-facing AAA prose until the derivative formula is converted into outward-rounded interval derivative enclosures or is consumed by an interval critical-exhaustion proof for the representative quarter profile.
