# Planar Three-Binary T04 Phase-Box Certificate

## Disposition

**Status:** Completed local zero census. The regular T04 balance is the unique full-vector balance in the declared equal-radius phase-speed box.

**Closure goal:** Certify a nonzero two-phase, one-speed neighborhood of T04 with complete causal-root ownership, an interval-Newton zero count, and an exact disposition of every planar residual row.

**Claim grade:** **Computer-assisted derived local isolation.** The independently authored oracle implements the circular causal equation, its implicit derivatives, and the complete receiver-by-receiver acceleration sum with outward-rounded interval arithmetic. It binds the accepted T04 release source and tracked bounded-ladder theorem packet by SHA-256, embeds the accepted scalar bracket, preserves the historical scalar receipt and oracle hashes as provenance, and does not import the pointwise phase-Jacobian diagnostic, prescribed-path evaluator, or EOM solver.

Plainly: this result replaces the earlier pointwise rank signal with a continuous-box proof. It decides the declared local phase question, not the whole two-dimensional phase domain.

## Declared chart and box

Fix the first positive endpoint at phase zero and write

$$
\phi_2=\frac{2\pi}{3}+\delta_2,
\qquad
\phi_3=\frac{4\pi}{3}+\delta_3.
$$

The six labeled phases, in binary-pair order, are

$$
0, \pi, \frac{2\pi}{3}+\delta_2, \frac{5\pi}{3}+\delta_2, \frac{4\pi}{3}+\delta_3, \frac{7\pi}{3}+\delta_3,
$$

with polarity word `+-+-+-`, equal radii, one common positive circulation, and $c_f=1$. The certified box is

$$
|\delta_2|\leq9\times10^{-6},
\qquad
|\delta_3|\leq9\times10^{-6},
\qquad
|\beta_f-\beta_{\mathrm{T04}}|\leq9\times10^{-6},
$$

where

$$
\beta_{\mathrm{T04}}=2.974307176117293568027380199624405914686222541005478142309948\ldots.
$$

The source declaration uses spatial phase order. The certificate uses the explicit source-member permutation $(0,3,2,5,4,1)$ to put the same six members into antipodal binary-pair order before checking the source root-count matrix.

Plainly: both independent phase gaps and the common dimensionless speed may move throughout the whole box. The opposite member of each neutral binary remains exactly antipodal.

## Source-bound causal-root census

For receiver phase $\phi_r$, transmitter phase $\phi_t$, and positive delay angle $\vartheta$, the oracle evaluates

$$
G(\beta_f,\phi_r-\phi_t,\vartheta)
=
2\beta_f\left|\sin\left(\frac{\phi_r-\phi_t+\vartheta}{2}\right)\right|-\vartheta.
$$

Each center root is only a proposal. A parametric one-dimensional interval-Newton step encloses the corresponding root throughout the full three-coordinate box and proves its causal derivative has fixed nonzero sign. The complement of those enclosures is divided into 288 outward-rounded boxes. Direct range exclusion or a fixed-sign derivative with same-sign endpoints excludes a root on every complement box; maximum subdivision depth is six. For the excluded coincident self root, the analytic bound $\sin z\geq z-z^3/6$ proves that no unlisted positive self root can emerge from $\vartheta=0$ before the ordinary complement cover begins.

The result preserves the source-permuted root-count matrix and all 72 directed roots. The minimum certified causal-derivative magnitude is

$$
|\partial_{\vartheta}G|>0.1163389800080226298384101813,
$$

the minimum unit-radius separation is greater than $0.2632672084506800983015814036$, and the minimum transmitter-factor magnitude is greater than $0.1150066049118463390244378803$.

Plainly: every source root keeps the same receiver, transmitter, and emission-time ordinal everywhere in the box. The proof also checks that no hidden extra root, collision, or causal fold lies between the listed roots.

## Interval-Newton zero count

Let $\mathbf F(\delta_2,\delta_3,\beta_f)\in\mathbb R^{12}$ contain, for each receiver, its tangential acceleration residual and its radial acceleration coefficient minus the six-receiver mean radial coefficient. A full equal-radius circular balance is exactly a zero of all twelve rows. Select the tangential rows of receivers $0$, $2$, and $4$:

$$
\mathbf f=(F_1,F_5,F_9).
$$

The oracle propagates interval automatic derivatives through every enclosed causal root by the implicit formula

$$
\frac{\partial\vartheta}{\partial u_a}
=
-\frac{2\sigma\sin q\,\partial_{u_a}\beta_f+\beta_f\sigma\cos q\,\partial_{u_a}(\phi_r-\phi_t)}{\beta_f\sigma\cos q-1},
\qquad
q=\frac{\phi_r-\phi_t+\vartheta}{2},
$$

where $\sigma$ is the certified fixed sign of $\sin q$. Outward-rounded Gauss-Jordan elimination encloses every inverse of the resulting $3\times3$ interval Jacobian. Its three pivot intervals are strictly positive:

$$
\begin{aligned}
0.4227979250&<p_1<0.4256013014,\\
21.49086346&<p_2<27.17217388,\\
103.6518960&<p_3<1572.557227.
\end{aligned}
$$

The interval-Newton image lies strictly inside the declared box. Its phase coordinates are enclosed within $1.58\times10^{-66}$ of zero, and its speed coordinate is enclosed at the frozen printed precision around the T04 value. Therefore $\mathbf f$ has exactly one zero in the declared box.

Plainly: three independent tangential equations can cross zero only once anywhere in the box. Because every full balance must satisfy those three equations, there can be at most one full balance there.

## Remaining nine full-vector rows

The accepted bounded-ladder theorem packet records one simple regular-phase T04 zero whose source receipt bracket is

$$
2.974307176117293568027380199624405759471313658229216539
\leq\beta_f\leq
2.974307176117293568027380199624407455446056078940370605,
$$

which lies strictly inside the phase-speed box. Hence the unique selected-row zero exists and lies on the regular line $\delta_2=\delta_3=0$.

At that line, rotation through $\pi/3$ followed by a global polarity-label flip leaves every polarity product, causal equation, and acceleration contribution invariant. Rotation covariance therefore makes all six tangential projections equal and all six radial projections equal. The scalar T04 tangential zero sets every tangential row to zero, while subtraction of the common radial mean sets every radial residual to zero. Direct interval evaluation of the nine unselected rows over the accepted scalar bracket also contains zero in every row, with the largest displayed enclosure width below $1.3\times10^{-29}$.

Thus the regular T04 balance is the unique full twelve-row zero in the declared box, and no asymmetric equal-radius balance occurs there.

Plainly: the nine acceptance rows are not discarded. Symmetry determines them at the one point selected by interval Newton, and the complete interval evaluation independently checks that determination.

## Reproduction and boundary

Run:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_planar_three_binary_phase_box.py
```

The certificate script is frozen at SHA-256 `13fa1d3c0d7f07f2a0cd1e9f9f94f0e3487ee85297d93e0d1e35bb3f8c5a38f0`. Two consecutive executions produced byte-identical standard output at SHA-256 `c8b6ff3a946658c9864cbe075b7eaae05bf419d4959992a46cedc35cea5a5a75`.

This certificate establishes local isolation only on the declared equal-radius, antipodal-partner, common-circulation phase-speed box. It establishes no zero census outside that box, unequal-radius result, general planar continuation, evolution, retention, stability, binding, physical identity, score, or scientific acceptance. A missed causal root, overlapping owner enclosure, complement zero, causal fold, zero-containing separation or transmitter factor, singular interval-Jacobian member, escaping Newton image, invalid scalar T04 bracket, failed covariance argument, or independently certified asymmetric full-vector zero inside the box falsifies the result.

Closure goal: use the completed phase-direction isolation together with a separately certified unequal-radius chart before opening the combined general planar continuation.
