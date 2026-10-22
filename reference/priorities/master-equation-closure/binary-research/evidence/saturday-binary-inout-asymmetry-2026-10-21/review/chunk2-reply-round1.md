**Disposition: ACCEPT AFTER CORRECTIONS.** Lemma Y.5, Theorem Y.6 and Corollary Y.7 are mathematically supported on the stated class. I found no defect in Lemma Y.3. Two explanatory claims need correction; neither changes chunk 2’s theorem.

No files were edited. Closing `shasum -a 256` checks on both reviewed files still matched the supplied hashes.

**What I read**

I read in full:

- [Chunk 2: separation note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-separation.md).
- [Chunk 1: balance-function note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21.md), auditing its derivative, straight-row cancellation, Lemma Y.3 and certificate as chunk 2’s dependencies.
- [Low-angular-momentum source](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-low-angular-momentum-2026-10-14.md).
- [Nonmirror source, including its continuation](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-nonmirror-periodicity-2026-10-11.md).
- [Curved-window source](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-curved-window-strength-difference-2026-10-11.md).

I also read the live `AGENTS.md`, review instructions, and the canonical Master Equation passages covering causal emission times, transmitter-side weighting, per-hit acceleration, total acceleration, and exclusions. I did not use the author’s instruments or another reviewer’s conclusions as verification.

**Claim-by-claim assessment**

**1. Canonical equation and pointwise inputs — supported, derived.**

The canonical law reduces here to
\[
\ddot{\mathbf x}_i=-\frac{\mathbf n_i}{\tau_i^2D_i},
\qquad D_i=1-\mathbf n_i\cdot\mathbf v_j(s_i).
\]
The transmitter velocity is evaluated at emission; no receiver multiplier has entered.

The whole-history speed bound gives \(D_i\ge1-w>0\), the delay bounds, and uniqueness and existence of the partner root. Positive-delay self roots are excluded because a member’s displacement over a delay \(\tau\) is at most \(w\tau<\tau\).

The source bounds used by Lemma Y.3 are pointwise. Their derivations use the past speed bound and acceleration bounds over nested delay windows, **without recurrence**. In particular,
\[
A_r\ge \frac{2(1-w)^2S_w}{(1+w)r^2}
=\frac{c_-}{r^2}
\]
follows from the lower row strengths and \(\cos\beta_i\ge S_w\).

**2. Lemma Y.3 — supported, derived; no defect found.**

I independently differentiated \(\mathcal L\) and reconstructed the straight-row cancellations in Lemmas Y.1–Y.2. They give
\[
\dot{\mathcal L}^{\,0}
=(1-t_1t_2)\frac{S_1+S_2+\dot r}{r^3}.
\]
The affine correction to this expression has exactly the three coefficients stated in chunk 1.

For the radial correction,
\[
|\cos\beta_1-S_2|
\le\frac{2w\,\epsilon_2}{2S_w},
\qquad r^2a_1^0\le1+w,
\]
and similarly for the other member. Adding the strength errors gives the stated \(C_A/r^3\).

For the transverse correction, the decomposition in Lemma Y.3 is correct. Moreover,
\[
a_1\epsilon_2=\frac{\bar a_2}{2\tau_1D_1},
\]
so the accepted delay and acceleration bounds give
\[
a_1\epsilon_2+a_2\epsilon_1\le\frac{c_3}{r^3}.
\]
Adding the two strength errors multiplied by \(|b_i|\le w\) gives \(e/r^3=(c_3+wc)/r^3\).

Thus C1 is supported independently of periodicity, mirror symmetry or a sign condition on \(J\).

**3. Lemma Y.5 and its continuation arguments — supported, derived.**

Below \(\rho_w=c_-/(4w^2)\), the displayed inequality gives strict concavity.

If \(\dot r(t_*)\le0\), then on the maximal future interval below the floor, \(\dot r\) strictly decreases and \(r\) decreases. A finite endpoint cannot terminate this interval: completeness supplies the endpoint and continuity leaves \(r\) strictly below the floor there, permitting extension. The interval therefore extends indefinitely. Its derivative becomes strictly negative, and the resulting linear upper bound eventually contradicts positive separation.

If \(\dot r(t_*)>0\), the same argument backwards gives an indefinitely extended interval with \(\dot r(t)>\dot r(t_*)>0\). Integrating backwards again contradicts positive separation.

The proof uses **both time directions of completeness**, \(C^2\) regularity, and positive separation. It assumes neither recurrence nor reversible delayed dynamics: the backwards argument is an inequality along an already given complete history.

**4. Bounds on \(\mathcal L\) — supported, derived.**

Since \(2S_w-2w>0\),
\[
\mathcal L
<\tfrac12|\mathbf v_1-\mathbf v_2|^2
\le2w^2.
\]
Also, \(S_1+S_2+\dot r\le2+2w\), so the floor gives
\[
\mathcal L\ge-\frac{2+2w}{\rho_w}.
\]
These bounds hold at both endpoints of every finite interval. They do not require conservation or Lemma Y.3.

**5. Finite-interval integration and boundary allowances — supported, derived.**

The radial-speed integral is exactly
\[
\int_{t_0}^{t_1}\frac{\dot r}{r^3}\,dt
=\frac12\bigl(r(t_0)^{-2}-r(t_1)^{-2}\bigr)
\ge-\frac1{2\rho_w^2}.
\]

The other identity is also correct:
\[
\frac{2\dot r^2}{r^3}
=\frac{d^2}{r^3}-\frac{A_r}{r^2}
-\frac{d}{dt}\left(\frac{\dot r}{r^2}\right).
\]
Each endpoint value of \(\dot r/r^2\) lies between \(-2w/\rho_w^2\) and \(2w/\rho_w^2\). Consequently,
\[
\int\frac{2\dot r^2+d^2}{r^3}\,dt
\le8w^2I+\frac{4w}{\rho_w^2}.
\]
The sign and factor \(4w/\rho_w^2\) are correct.

Weighted Cauchy–Schwarz then gives
\[
\int\frac{C_A|\dot r|+e|d|}{r^3}\,dt
\le
\sqrt{\frac{C_A^2}{2}+e^2}
\sqrt{I\left(8w^2I+\frac{4w}{\rho_w^2}\right)}
\le2w\sqrt{C_A^2+2e^2}\,I+B_w\sqrt I.
\]
There is no missing endpoint term.

Finally,
\[
\int(C_A+\hat te)r^{-4}\,dt
\le\frac{C_A+\hat te}{\rho_w}I.
\]
Combining these estimates with the upper bound on the change of \(\mathcal L\) produces precisely
\[
\Gamma I-B_w\sqrt I\le K_w.
\]

**6. Quadratic bound and whole-time integral — supported, conditional derived.**

For \(\Gamma>0\), setting \(x=\sqrt I\) gives
\[
\Gamma x^2-B_wx-K_w\le0.
\]
Its negative root is below zero and its positive root is the stated \(X_w\); hence \(I\le X_w^2\).

The bound is independent of both endpoints. Applying it to expanding intervals and using the nonnegative integrand establishes the whole-time bound. No endpoint limit of \(\mathcal L\) or its derivatives is needed.

This conclusion depends on Lemma Y.3 and \(\Gamma(w)>0\); Lemma Y.5 does not.

**7. Corollary Y.7 — supported, conditional derived.**

The residence-time bound follows directly from
\[
\mathbf1_{\{r\le R\}}\le R^3r^{-3}.
\]

Finite inverse-cube integral alone would not imply escape. The proof correctly supplies the missing ingredient, \(|\dot r|\le2w\). Failure of escape yields infinitely many visits below some fixed \(R\). A separated subsequence supplies disjoint intervals of length \(R/w\), on each of which \(r\le2R\). Every interval therefore contributes at least
\[
\frac{R}{w}(2R)^{-3}=\frac1{8wR^2}>0.
\]
This contradicts integrability. The argument works at either end of time.

Thus the limits \(r(t)\to\infty\), the exclusion of bounded separation on either half-line, and the periodicity consequences are all supported.

**8. Numerical certificate — supported by independent arithmetic.**

I independently evaluated the displayed constants using exact BigInt rational arithmetic and square-root bounds verified by integer squaring, after known arithmetic and square-root controls.

For example, at \(w=81/1000\),
\[
0.9967141<S_w<0.9967142
\]
gives conservative rational estimates yielding
\[
\Gamma(81/1000)>0.014.
\]
A tighter independent enclosure gives approximately \(0.01426910824189\).

The companion’s displayed decimal certificate rows are conservative. Its negative signs at \(1/12\) and \(1/10\) also check out. However, its assertion of nonpositivity throughout \(0.081<w\le0.1\) is incorrect: independently,
\[
\Gamma(811/10000)>0.008.
\]
Continuity already prevents the asserted immediate loss of positivity above \(0.081\).

**9. Scope, grades and explanatory reading — supported except as corrected below.**

The theorem concerns complete planar histories in the specified class. It establishes neither existence nor encounter speed gain. Nesting into \(\mathcal C_{81/1000}\) correctly covers every smaller whole-history speed bound without needing monotonicity of \(\Gamma\).

No observer-level law, conserved quantity, recurrence assumption or equation modification enters the proof. These are derived statements, not sampled trajectory results. The stated solution-based falsifiers appropriately distinguish failure of an input from a counterexample to a conclusion.

The explanatory assertion that \(\mathcal L\) grows “at every instant” is **not supported by this proof**. The established estimate is
\[
\mathcal L(t_1)-\mathcal L(t_0)
\ge\Gamma I-B_w\sqrt I-\frac1{2\rho_w^2},
\]
whose right side need not be positive on a short interval. This is a limitation of the demonstrated inference; it is not a counterexample showing that an actual complete history has \(\dot{\mathcal L}<0\).

**Actionable corrections**

1. **C2-GROW — Correct the pointwise-growth explanation.** In chunk 2’s [opening explanation](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-separation.md:5) and [Reading paragraph](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-separation.md:117), replace “steady growth” and growth “at every instant” with the finite-interval estimate above. Explain that an unbounded accumulated inverse-cube weight would force an unbounded net increase despite the boundary allowances. **Required:** this states the mechanism actually proved.

2. **C1-RANGE — Correct the companion’s certificate-range assertion.** Amend its [result summary](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21.md:17) and [Section 5 assertion](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21.md:168): \(81/1000\) is a certified sufficient bound, not the exact positivity endpoint. **Required for those companion claims:** \(\Gamma(0.0811)>0\) directly contradicts the stated range. Chunk 2’s threshold and escape theorem remain valid.