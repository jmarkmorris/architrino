# Octahedral Fold-Aware Cross-Binary I1 Complement Sign-Exclusion Scan

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration](octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.md) and imports the $\theta_{3-}^{-}$ row from [octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate](octahedral-fold-aware-cross-binary-fold-collar-sign-transport-certificate.md). The predecessor integration packet reduced the `I1` regular critical-exhaustion burden to the two outside-bracket signs

$$
f_\times(\theta)>0
\quad\text{on}\quad
[0,a_1],
$$

and

$$
f_\times(\theta)<0
\quad\text{on}\quad
[b_1,\theta_{3-}].
$$

The new result does not close those rows at interval grade. It turns them into a source-atlas-aware sampled and fold-aware packet with a precise remaining interval obligation.

## Compact and Fold-Collar Split

The left complement is regular in ordinary $\theta$ coordinates:

$$
[0,a_1]
=
[0,\;0.124678831905].
$$

The right complement reaches the square-root fold at $\theta_{3-}$. The ordinary $\theta$ atlas is therefore used only on the compact subinterval

$$
[b_1,\theta_{3-}-y_c^2]
=
[0.145456970556,\;0.997361655243],
\qquad
y_c=0.003.
$$

The remaining singular collar is assigned to the existing square-coordinate transport theorem

$$
\theta=\theta_{3-}-y^2,
\qquad
0<y\le y_c,
$$

with

$$
G(y)=2y f_\times(\theta_{3-}-y^2).
$$

The imported fold-collar row has negative square limit

$$
\lim_{y\to0^+}G(y)
=
-0.192715477558,
$$

and transports the near-fold sign

$$
f_\times(\theta_{3-}-y^2)<0
$$

for sufficiently small positive $y$. The packet therefore avoids treating the fold endpoint as a bounded ordinary-$\theta$ derivative problem.

## Sampled Complement Rows

The executable scan uses only the certified positive speed-ratio zero enclosure

$$
3.02156\le\nu\le3.02157,
$$

with no speed band, speed window, speed minimum, or speed maximum. The default grid uses $65$ $\theta$ samples on each compact complement, $9$ speed samples across the enclosure, and root subdivision $5000$.

The certified sampled rows are:

| Row | Interval | Expected sign | Sample count | Sampled margin |
| --- | ---: | ---: | ---: | ---: |
| `I1.left-complement.forcing-positive` | $[0,\;0.124678831905]$ | $+$ | $585$ | $0.000471690862363$ |
| `I1.right-compact-complement.forcing-negative` | $[0.145456970556,\;0.997361655243]$ | $-$ | $585$ | $0.00118456783555$ |

Both compact rows preserve the six-source-root atlas and the term root-count signature

$$
(1,3,1,1).
$$

The weakest sampled source-root regularity margin in the two compact scans is

$$
\min |F_\delta|
\approx
0.000871583789,
$$

which occurs near the compact/fold interface. This is useful because it tells the interval successor exactly where the ordinary atlas becomes fragile.

## Claim Boundary

Closed here:

- sampled positivity on the left `I1` complement;
- sampled negativity on the compact right `I1` complement;
- imported negative sign transport on the $\theta_{3-}^{-}$ fold collar;
- explicit right-complement split into compact ordinary-$\theta$ proof and square-coordinate fold-collar proof.

Still open:

- directed-rounded interval enclosure for `I1.left-complement.forcing-positive`;
- directed-rounded interval enclosure for `I1.right-compact-complement.forcing-negative`;
- an explicit interval fold-collar radius for $\theta_{3-}^{-}$;
- theorem-grade `I1` regular critical exhaustion;
- interval quadrature for $C_\times$, $m_Q$, and $M_Q$;
- retained branch status.

The packet may claim

$$
\texttt{certifies\_sampled\_I1\_complement\_sign\_exclusion\_scan=true},
$$

and

$$
\texttt{imports\_conditional\_theta\_3minus\_left\_fold\_collar\_sign\_transport=true}.
$$

It does not claim

$$
\texttt{certifies\_I1\_complement\_sign\_interval\_enclosures=false},
\qquad
\texttt{certifies\_I1\_regular\_critical\_exhaustion=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.mjs). It emits:

- compact complement scan summaries for the left positive and right compact negative rows;
- preserved source-root counts and term root-count signatures;
- machine-padded sampled sign margins;
- an imported $\theta_{3-}^{-}$ fold-collar transport check;
- explicit non-retention and non-interval claim boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.test.js) validates the sampled signs, source-root signatures, fold-collar import, no-fixed-speed-window discipline, CLI write/validate path, and overclaim rejection.

## Result

The result status is

$$
\texttt{sampled-source-atlas-aware-i1-complement-sign-exclusion-scan-certified}.
$$

The next theorem-grade successor row is

$$
\texttt{I1.complement-sign-exclusion-directed-rounded-interval-enclosures-required}.
$$

The interval-safe compact portion of this successor is now partially closed by [octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure](octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.md). That packet proves directed-rounded signs on $[0,a_1]$ and on the conservative right core $[b_1,\theta_{3-}-0.115^2]$. The remaining theorem-grade successor is therefore sharper:

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

The sharpening matters: the fixed reference collar $\theta=\theta_{3-}-y^2$ crosses the speed-dependent fold location below $y\approx0.00279103994955$ across the certified speed enclosure. The sampled speed-dependent packet now verifies the moving-fold $G,D$ signs on the diagnostic grid in the chart $\theta=\theta_{3-}(\nu)-y^2$, and the fold-limit interval successor proves the moving fold endpoint bracket with $L(\nu)\le-0.192653693867$. The remaining proof must replace the sampled $G,D$ row with directed-rounded normal-form remainder bounds before the compact interval enclosures, fold-collar sign row, and certified `I1.f1` unique zero can compose into `I1` regular critical exhaustion.
