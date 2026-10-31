**Disposition: ACCEPT AFTER CORRECTIONS.** B.1–B.8 are supported at their stated conditional scope. I found two reporting defects, described below; neither changes the independently verified barrier, growth bounds or obstruction.

No files were edited. All seven supplied file identities, the frozen `signed_barrier.py` identity and the accepted October 18 subject identity matched by byte count and SHA-256 using the shared venv.

**What I read.** I read:

- `AGENTS.md`, the startup router and the theorem-review procedure; the four requested canonical Master Equation passages.
- The full [subject](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20.md), evidence README, all three instrument versions, `run3.json`, `run3.out` and the frozen `signed_barrier.py`.
- The complete accepted summed signed-remainder note and its final review.
- Q6 and Q8, including their proofs; X1 and X5’s matching argument; E.1–E.3; S.1, S.3 and S.4; forward-evolution Theorem 1, maximal continuation and Proposition 4; preparation Lemma 3 and the residue verdict.
- The retained run-source copies, version differences and supervisor receipts needed to check the README’s provenance claims.

My independent calculations used stdin scripts under `/Users/markmorris/vibe/.venv/bin/python`, with no author-instrument imports. Polynomial arithmetic used exact fractions; exponentials used rational Taylor enclosures where needed, and the growth/time calculations used separately constructed `mpmath.iv` expressions. Hand polynomial, summation and maximum controls passed before the corresponding targets. Primitive lattice-sum, contour and inverse-norm enclosures remain accepted conditional inputs; I did not independently regenerate those libraries.

**Claim-by-claim assessment**

1. **B.1 — supported, derived conditional on Q6/Q8.** Q8 supplies reality of *every* determinant zero inside the contour, rather than merely three sampled real roots. At a real zero, Weyl’s inequality gives
   \[
   |\lambda h(\lambda)|\le31.854/400.
   \]
   The accepted slope bound then yields the claimed distance from \(\lambda_g\). Independently,
   \[
   \delta_r=\frac{15927}{2004200}
   =0.0079468116954395768885\ldots .
   \]
   Consequently the endpoints are strictly inside \([2.7872,2.8033]\). The use of real symmetry and the slope interval is valid.

2. **B.2 — supported.** Multiplicity introduces no missing polynomial-in-time factors. If \(K\) spans the kernel at a real zero, positive definiteness of \(F_\lambda\) gives the inverse residue
   \[
   R=K(K^{\mathsf T}F_\lambda K)^{-1}K^{\mathsf T}\succeq0.
   \]
   The determinant may have multiplicity greater than one—three at \(Q\)—while the inverse still has only a first-order pole. Thus the stated residue representation holds for every real time.

   The positive-semidefinite order argument is also correct. It bounds the operator norm of the weighted residue sum by \(c\|P(k)\|\); it does not require the residues to commute or their images of \(\mathbf e\) to align.

   Independent arithmetic gives
   \[
   \begin{aligned}
   \frac1{2.7952(4.2797)}+0.00725
     &=0.090843745684472879039\ldots<0.09085,\\
   0.09085(2.8033/2.6952)^2
     &=0.098283834001960963373\ldots<0.0983.
   \end{aligned}
   \]
   Both time cases and \(n=0,\ldots,3\) are valid. The translated norm uses \(n\le2\), with the additional derivative factor handled separately. The argument retains the accepted scalar bump normalization and fixed unit vector; it does not establish the same constants for arbitrary vector-valued seeds.

3. **B.3 — supported.** For \(t+T'\ge0\), the extra decay is \(e^{(\lambda_{\rm hi}-a)T'}\). For \(t+T'<0\), it is \(e^{(\lambda_{\rm lo}-a)T'}\), together with \(e^{\lambda_{\rm lo}t}\le e^{\lambda_{\rm hi}t}\). Both give the claimed bound from \(t=0\).

   Independently,
   \[
   e^{-0.0804125}=0.9227356394199614780269\ldots<0.92274,
   \qquad
   \frac{2.8033}{2.6952}=1.0401083407539329\ldots<1.0402.
   \]
   L.2, L.3 and L.4 use \(\mu\) through the source seed bounds, including envelope variation and the pure-seed third derivative. Replacing that factor is legitimate. The receiver factor remains \(d+y\).

4. **B.4 — supported.** At the central label the Fourier phase is one. Each scalar \(\mathbf e^{\mathsf T}R_i\mathbf e\) is nonnegative, so the lower exponential can be taken outside the sum and integral. The normalized nonnegative bump and \(P(k)\succeq p_0I\) give the claimed lower bound.

5. **B.5 — supported.** The three conditions pass independently. In particular,
   \[
   d+2Kd^2=0.05933775<1/16.
   \]
   At \(d_0=0.0006351\),
   \[
   31.9d_0^2=0.000012866929119,
   \quad
   C_LF(d_0,31.9d_0^2)
   \approx0.0000006072190343095535.
   \]
   Thus the initial chart condition and upper concavity endpoint hold. Positivity at both concavity endpoints excludes the interval between them, establishing the smaller initial coefficient. Nonnegative polynomial coefficients justify scaling to smaller \(d\), and the strict endpoint inequality excludes first crossing.

   E.1 and maximal continuation apply to the actual translated correction history. This continues the same solution without replacing its past. No third derivative of the actual correction is used.

   The exact all-label arithmetic is:

   | Quantity | Independent value |
   |---|---:|
   | displacement upper bound | \(0.044918875\) |
   | speed upper bound | \(0.159933037575\) |
   | acceleration upper bound | \(0.640563448606795\) |
   | transmitter-factor lower bound | \(0.840066962425\) |
   | separation lower bound | \(0.91016225\) |
   | delay-deviation upper bound | \(0.08983775\) |

   Every displayed rounded bound in the theorem is safe. The root census follows from the complete-history sub-wake-speed chart; the weighted conclusion remains qualitative.

6. **B.6 — supported.** Independent evaluations give
   \[
   \begin{aligned}
   C_LF(0.020,0.0024)&=0.00239798066084936723\ldots,\\
   C_LF(0.025,0.0053125)&=0.00529951514130337613\ldots.
   \end{aligned}
   \]
   Both starts pass. The stated half-grid choices also reproduce independently; this establishes no continuous optimum. All time-table entries and both quoted correction bounds at accepted \(T_N\) round safely.

7. **B.7 — supported.** Independently,
   \[
   \beta=0.99425676880819034709\ldots,\qquad
   1-\beta=0.00574323119180965291\ldots>0.
   \]
   Hence the endpoint lower bound increases with \(\varepsilon\). Its positive value at \(10^{-37}\) establishes positivity throughout the declared range.

   All displayed endpoint, ladder, initial-size and growth-factor bounds round outward. The four central lower bounds at accepted \(T_N\) independently evaluate to
   \[
   0.01231194718\ldots,\quad
   0.01265299656\ldots,\quad
   0.01173955973\ldots,\quad
   0.01008342387\ldots .
   \]
   These are guaranteed bounds, not evaluated trajectory displacements.

8. **B.8 — supported for the specified estimate.** The polynomial has nonnegative coefficients, so \(\varphi_d\) is concave in \(y\) and nonincreasing in \(d\). The tangent-line maximum certificate is valid.

   The chart-radius comparison has the correct direction. Although \(\kappa\) and the transmitter denominator decrease with radius, they enter through reciprocal powers. The row constants, \(\eta\), \(\mathsf s_1\), \(c_{E3}\), reciprocal denominators and declared band source factor increase. I found no coefficient contribution with a negative sign that defeats the comparison.

   The larger-chart conclusion remains conditional on deriving the listed chart facts and estimates with the same formulas. It is not an extension theorem on those charts.

   For smaller charts, the radius-zero lower polynomial and shrinking admissible range of \(y\) give the claimed obstruction. Independently, its maximum at \(d=0.0425\), \(0\le y\le0.010\), is
   \[
   -0.0000448884004498678411\ldots .
   \]
   The hypothetical deletion thresholds \(0.0383,0.0377,0.0478\) reproduce. Their orientation-only labeling is appropriate; they establish neither valid improved barriers nor attainable gains.

9. **Scope/evidence — mostly supported; needs the reporting corrections below.** The complete-past preparation, all dynamical labels, original block prescription, unchanged canonical acceleration law and \(c_f=1\) are preserved. No uniform-in-\(\varepsilon\) endpoint growth, order-one motion, fate or wake-speed arrival follows.

   Version comparisons show additions without changes to earlier functions or target blocks. Retained source copies match their versions, and prior target records agree across runs. The supervisor receipts record exit zero and closed process groups. The six known cases precede the instrument’s target blocks. Of the imported estimate’s operative parameters, only \(\mu\) changes; `mu_accepted` is additional provenance metadata.

**Independent numerical reconstruction**

I rebuilt both per-offset polynomials from L.2–L.3 and summed their source factors using the declared moments, including \(S_5\le S_4\), \(S_1(2a)\le e^{-a}S_1(a)\) and the half factor for the odd sum. The resulting polynomial is approximately
\[
\begin{aligned}
C_LF(d,y)={}&1.296124321104165d^2
+5.012897257436098dy
+3.358164373379229y^2\\
&+160.8813545773936d^3
+321.8763843655016d^2y\\
&+199.8139780938269dy^2
+36.03163872y^3.
\end{aligned}
\]
These coefficients are explanatory approximations; the checks used rational coefficients and enclosed exponentials.

At the main barrier, the receiver, bracket and half-odd contributions are respectively
\[
0.003265657442034742914\ldots,\quad
0.004124402403071476232\ldots,\quad
0.006975439176659069532\ldots .
\]
Their sum lies in
\[
[\,0.01436549902176528867,\ 0.01436549902176528869\,],
\]
below \(0.014418875\). The displayed \(0.0143655\) upper bound is safe.

Other requested recomputations are:

| Quantity | Independent enclosure/value |
|---|---:|
| gain at \(\varepsilon=0.00646\) | \(0.12953365458981347747\ldots\) |
| gain slope in \(\ln(1/\varepsilon)\) | \(0.01133508235871861866\ldots\) |
| central lower bound at \(10^{-4}\), at \(\tilde T\) | \(0.00818677259956947249\ldots\) |
| central lower bound at \(10^{-37}\), at \(\tilde T\) | \(0.0001924743201105432905\ldots\) |
| larger-chart lower-polynomial maximum at \(d=0.0317\) | \(-0.0000825141349884274446\ldots\) |

For the main obstruction, an exact rational derivative bracket is
\[
0.02359841657461<y_*<0.02359841657462.
\]
The tangent certificate gives
\[
\max_{y\ge0}\varphi_{0.0317}(y)
< -0.00008283154789167.
\]
I also checked all 13 main obstruction grid entries and all 197 radius-zero grid entries independently; their reported signs and displayed values agree.

**Actionable corrections**

1. **BG1 — Restrict the sampled spectral statement.** At [subject line 211](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20.md:211), replace “the actual spread of rates, which is much narrower by float measurement” with wording confined to the sampled wavevectors/directions. Those samples suggest a narrower spread; they do not enclose the actual spread throughout the seed support. The proved band and all dependent results remain supported.

2. **BG2 — Clarify the instrument’s final status coverage.** In [the evidence README](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/README.md), state that `all_targets_pass` does not aggregate the T3 obstruction certificates or their domination checks. Static inspection of [lines 431–435](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/band_barrier.py:431) shows that omission. The recorded T3 results pass independently, but the final flag alone cannot establish that. Preserve the frozen source and outputs; document this limitation, or address it in a separately versioned instrument.

The mathematical acceptance is conditional on the declared primitive enclosures. A valid counterexample to the residue positivity, source bounds, complete-history continuation assumptions or declared input bounds would reopen the affected conclusions.

Next possible actions:

1. ○ **Apply BG1–BG2 and return corrected subject/README identities.** Recommendation: proceed with these reporting corrections; no change to the proved constants or frozen evidence is indicated.