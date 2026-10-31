**Disposition: ACCEPT AFTER CORRECTIONS.** Theorem B’s common-sign divergence argument and both power-profile thresholds are supported by independent analytic reconstruction. Two corrections are needed: distinguish cross channels from self channels, and clarify that the root census uses only (H1)–(H2), without assuming the summability being disproved.

No files were edited. All mathematical conclusions below are **derived**, conditional on the stated prescribed histories and summation prescription. None rests on numerical sampling or the author’s instruments.

**What I read**

- The complete [sharpness companion](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md). `shasum -a 256` matched the supplied digest before and after review; `wc -c` confirmed 15,811 bytes.
- Sections 2–4 and Corollary A.3 of the [context document](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md), for definitions and dependencies only. This is not an adjudication of chunk 1.
- The complete [accepted obstruction](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/population-delayed-summation.md) and [summation adjudication](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/population-summation-independent-adjudication.md), including its scope table.
- “Independent reconstruction of stationary block convergence” in the [population adjudication](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/population-independent-adjudication.md).
- The setting and equation (6) of the [staggered-lattice first-event note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event.md).
- The causal-emission definition and complete canonical-form section of the [Master Equation](/Users/markmorris/vibe/architrino/content/markdown/aaa/dynamics/master-equation.md), together with the repository’s physics and review rules.

The claim-by-claim findings follow.

1. **Pulse shapes — supported.**

   Expanding \(\psi\) gives
   \[
   \psi(t)=t-4t^3+6t^5-4t^7+t^9.
   \]
   Its coefficient absolute sums before and after differentiation are \(16\) and \(80\), proving the stated bounds. The fourth-order zeros at both endpoints make its zero extension \(C^3\). A further differentiation gives \(\|\psi''\|_\infty\le384\), sufficient for the velocity-Lipschitz assertion.

   Direct differentiation gives
   \[
   P'(u)=140u^3(1-u)^3.
   \]
   Thus \(P(0)=0\), \(P(1)=1\), and \(P',P'',P'''\) vanish at both endpoints. These conditions establish the plateau extension’s \(C^3\) joins. Since \(u(1-u)\le1/4\), with equality at \(u=1/2\),
   \[
   \|\phi'\|_\infty=140/64.
   \]

2. **Uniform bounds and pulse timing — supported.**

   For (V), the bounds are exactly \(16/1024=1/64\) and \(80/1024=5/64\). For (E), displacement is at most \(1/1024\), and speed is at most \(140/(64\cdot1024)<3/1024<1/256\). Both families therefore satisfy the stated common (H1)–(H2) constants.

   The latest possible pulse endpoints are
   \[
   -10+1=-9\quad\text{(V)},\qquad
   -10+1/1024+2<-7\quad\text{(E)}.
   \]
   Uniformly bounded derivatives through order three follow from the fixed compact polynomial shapes and bounded amplitudes. Distinct-label separation is also uniformly positive: at least \(1-2b=31/32\).

3. **Exact roots and uniqueness — supported for cross channels; wording needs correction.**

   In (V), \(s=-d_j\) gives position \(j\), range \(d_j\), velocity \(\nu_j\sigma_j\mathbf n_j\), and consequently \(D=1-\nu_j\sigma_j\).

   In (E), at \(s_j^*=-(d_j-\nu_j\sigma_j)\), the range is exactly \(d_j-\nu_j\sigma_j>0\), the direction remains \(\mathbf n_j\), and velocity vanishes. Hence \(D=1\).

   Independently, the incidence residual
   \[
   G(s)=t-s-|\mathbf x-\mathbf X_j(s)|
   \]
   is strictly decreasing wherever relevant, with \(G'(s)=-D\le-59/64\). The bounded-position and endpoint-sign arguments establish existence and uniqueness using (H1)–(H2) alone.

   The opening’s “exactly one ordinary causal root in every ordered channel” is false if self channels are included. For every actual self channel,
   \[
   |\mathbf X_i(t)-\mathbf X_i(s)|\le w(t-s)<t-s,
   \]
   so there is **no** positive-delay self root.

4. **Light-cone windows — supported.**

   The (V) window contains \(-d_j\), where speed equals \(\nu_j\); the global bound gives
   \[
   \nu_j\le V_j\le80\nu_j.
   \]

   For (E), \(h\le1/4\) gives \(c_W\le17/32\). Every point of \(W_j\) is within
   \[
   c_W+\nu_j\le545/1024<1
   \]
   of the shifted pulse center. The whole window lies inside the plateau, proving exactly \(E_j=\nu_j\) and \(V_j=L_j=0\) for pulsed sources.

5. **Common-sign identities and lower bounds — supported, including negative polarity.**

   For (V), exact subtraction gives
   \[
   \sigma_j\mathbf c_j
   =\frac{\nu_j\mathbf n_j}{d_j^2(1-\nu_j\sigma_j)}.
   \]
   Projection onto the cone axis is at least
   \[
   \frac{\nu_j}{2(1+\nu_j)d_j^2}\ge\frac{\nu_j}{3d_j^2}.
   \]

   For (E), write \(a=\nu_j\), \(d=d_j\). The scalar coefficients multiplying \(\mathbf n_j\) are
   \[
   \frac{a(2d-a)}{d^2(d-a)^2}\quad(\sigma_j=+1),\qquad
   \frac{a(2d+a)}{d^2(d+a)^2}\quad(\sigma_j=-1).
   \]
   The first is at least \(2a/d^3\). The second is at least
   \[
   \frac{2a}{d^3(1+a/d)^2}\ge\frac{a}{d^3},
   \]
   since \(a/d\le1/10240<10^{-4}\). Thus both polarities give projection at least \(a/(2d^3)\). No small-amplitude expansion is required.

6. **Stationary baseline, boxes, and every exhaustion — supported.**

   I independently reconstructed stationary block convergence: the alternating eight-corner sum is a threefold finite difference of \(\mathbf K(\mathbf y)=\mathbf y/|\mathbf y|^3\), hence a block decays as \(R^{-5}\). Cubic block density makes its norm series summable. The finitely many near blocks remain finite after omitting the receiver diagonal.

   For even \(m\), the box endpoints align with complete blocks. Its coordinate lengths give \(m(2m)(2m)=4m^3\) labels. Within it,
   \[
   d_j\ge m,\qquad d_j\le\sqrt6m,\qquad
   \mathbf n_j\cdot\mathbf e\ge1/\sqrt3.
   \]
   Applying the source lower bounds reproduces exactly
   \[
   \frac{4\nu}{3}6^{-1-k/2}m^{1-k}\quad\text{(V)},\qquad
   \frac{2\nu}{6\sqrt6}6^{-k/2}m^{-k}\quad\text{(E)}.
   \]
   The dyadic boxes are disjoint. Their contributions prove divergence for \(0\le k\le1\) in (V), and for \(k=0\) in (E).

   The nonnested-exhaustion argument is valid: each block must be **eventually always present**. Once a finite collection contributes above the requested threshold plus the absolute stationary bound, every later set exceeds that threshold. Merely requiring the union of the sets to contain all blocks would not suffice.

7. **Converse and sharp exponents — supported at the stated scope.**

   For (V), displacement, speed, and velocity-Lipschitz bounds are all \(O(d_j^{-k})\). The slowest summand decays as \(d_j^{-k-2}\), which is summable in three dimensions for \(k>1\). Corollary A.3 applies after absorbing the harmless conversion from \(d_j^{-k}\) to \(\langle j\rangle^{-k}\) into its constants.

   For (E), the window identities leave only displacement terms \(O(d_j^{-k-3})\) and \(O(d_j^{-k-4})\), with \(\Sigma_1^t=0\). These converge for \(k>0\).

   Thus the thresholds \(1\) and \(0\) are sharp **within these prescribed, cone-supported power-profile families at receiver \(0\)**. This is worst-case sharpness of sufficient assumptions, not a necessity theorem for convergence of every individual history having a nonsummable majorant.

8. **Physics, grades, and remaining scope — supported, subject to the channel correction.**

   The calculations use \(c_f=1\), the canonical acceleration kernel, and no imported standard-physics premise. Because \(D>0\), replacing the canonical \(1/|D|\) by \(1/D\) is justified.

   The prescribed-history limitation, single receiver, absence of a Lipschitz-counterexample result, and conditional alternative-prescription statement are correctly retained. The accepted obstruction is precisely the constant-amplitude (V) mechanism, after its spacing rescaling. The new material adds variable amplitudes, displacement pulses, and exponent thresholds; it establishes no coupled solution.

The analytic findings are checkable without sampling: endpoint derivative mismatches would refute item 1; a violated amplitude bound or residual monotonicity inequality would refute items 2–4; an incorrect rational subtraction or box count would refute items 5–6; and failure of the shell criterion \(k+p>3\) would refute item 7.

Next possible actions — actionable corrections, all **○ Not done**:

1. **[B-CHANNEL] Correct the opening channel claim.** Recommendation: replace “every ordered channel” at [line 5](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md:5) with “every distinct-label ordered channel,” and state that positive-delay self-root sets are empty. This fixes a false scope statement.
2. **[B-ROOT] Clarify the root-proof dependency.** Recommendation: at [line 44](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md:44), explicitly invoke the **(H1)–(H2)-only argument in the proof of Theorem A(a)**. Theorem A as formally stated also assumes \(\Sigma_0<\infty\), which these counterexamples violate; the root proof itself does not need that assumption.