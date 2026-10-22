**Overall disposition: ACCEPT AFTER CORRECTIONS.** The sharpened solution bounds, the threshold \(59/500\), and both conclusions of Theorem Y.12 are supported. Three corrections are needed to the stated domain and numerical-evidence wording; none changes the certified threshold.

No files were edited.

**What I read and independently checked.**

I read `AGENTS.md` in full, the startup router and theorem-review procedure; the canonical Master Equation’s per-hit acceleration, total acceleration, conventions/exclusions, direction/sign and normalization passages; and:

- The [chunk-3 subject](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-sharpened.md), instrument, entire evidence README, and all three specified run records, in full.
- Both companion notes, in full, including Lemma Y.3, Theorem Y, Lemma Y.5, Theorem Y.6 and Corollary Y.7.
- The curved-window, non-mirror and low-angular-momentum source notes, in full, with particular attention to the requested accepted inputs.

`wc -c` and `shasum -a 256` matched every supplied size and digest for the eight specified files.

Before reading the sharpened instrument, I implemented a separate, two-sided rational-interval evaluation, with integer-square-root brackets at scale \(10^{40}\). Its arithmetic controls passed before target evaluation. I subsequently checked the prescribed-path identity separately at 65-digit precision and reproduced the author’s run entirely in memory with file writes disabled.

**Claim-by-claim findings.**

1. **Lemma Y.8: numerator identity supported; general strength statement needs correction.**

   Independently expanding the two quadratic expressions gives
   \[
   q(\tau)=N=-2\mathbf e\cdot(\boldsymbol\rho+\tau\mathbf v)+|\mathbf e|^2,
   \]
   and
   \[
   h(\tau)-h(T)=N+(\tau-T)\boldsymbol\rho\cdot\mathbf v.
   \]
   Substitution into \(\tau E=h(\tau)+\tau\mathbf e\cdot\mathbf v-\tau\mathbf R\cdot\boldsymbol\sigma\) produces exactly the six displayed terms. The steps through \(h,q,D_n\), including their signs, are correct. The integral representations give
   \[
   2\mathbf e+\tau\boldsymbol\sigma
   =\int_s^t[2(u-s)-\tau]\ddot{\mathbf x}_j(u)\,du.
   \]

   For constant acceleration \(g\) toward the receiver with present velocity zero,
   \[
   r=\tau+\tfrac12g\tau^2,\qquad
   \tau E=\tau^2(1+g\tau),
   \]
   so \(TE^0-\tau E=g^2\tau^4/4\) exactly.

   The qualification missing from the broadly stated kinematic lemma is **positive transmitter factor at emission**. Present speed below one does not ensure this. The canonical strength contains \(|D|\), whereas \(1/(\tau E)\) uses signed \(D\). See correction **SW-DOM** below. On \(\mathcal C_w\), \(D\ge1-w>0\), so this does not affect any downstream theorem.

2. **Lemma Y.9: supported on the stated solution class.**

   The zero-mean argument is correct:
   \[
   \int_s^t m=0,\qquad \int_s^t|m|=\frac{\tau^2}{2},
   \]
   and subtracting the midpoint of the range of \(f\) yields the absolute bound
   \[
   \left|\boldsymbol\rho\cdot\int_s^tm\ddot{\mathbf x}_j\right|
   \le\frac{r\tau^2}{4}\operatorname{osc}(f).
   \]

   The receiver-index signs also work. With the accepted conventions,
   \[
   \mathbf n_1=\cos\beta_1\,\hat{\mathbf r}-\sin\beta_1\,\hat{\boldsymbol\theta},
   \qquad
   -\mathbf n_2=\cos\beta_2\,\hat{\mathbf r}-\sin\beta_2\,\hat{\boldsymbol\theta}.
   \]
   For transmitter \(1\), both \(\hat{\boldsymbol\rho}\) and its acceleration introduce a minus sign; for transmitter \(2\), neither remains. Thus both cases reduce to
   \[
   f(u)=a_j(u)\cos\!\bigl(\vartheta(u)-\vartheta(t)-\beta_j(u)\bigr).
   \]
   Consequently the claimed \(\bar\psi\) bounds the absolute angle for both indices.

   The amplitude interval follows from the upper and lower separation bounds. The two branches for \(\hat\Omega\) handle the sign of \(\gamma\) correctly: when \(\gamma<0\), the lower product bound must use \(A_{\rm hi}\gamma\).

   The other numerator bounds reconstruct as:
   \[
   \frac32w\tau^3\bar a,\qquad
   \frac{wr\tau^2\bar a}{2(1-w)},\qquad
   \frac34\tau^4\bar a^2.
   \]
   Their substitutions give precisely \(2w\hat\tau^3\hat a\,r\) and \(\tfrac34\hat\tau^4\hat a^2\).

   Finally,
   \[
   \tau\ge\frac r{1+w},\quad
   E\ge\frac{r(1-w)}{1+w},\quad
   T\ge\frac r{1+w},\quad E^0\ge rS_w,
   \]
   prove the stated product denominator. All factors are positive.

   Inputs B1–B5 hold pointwise without recurrence. The whole-past assumption is essential when bounding the incoming rows that produce the transmitter’s acceleration at earlier window times.

3. **Lemma Y.10: supported.**

   The displacement identity and aberration signs agree with the accepted conventions. The estimate
   \[
   |\hat{\boldsymbol\theta}(t)\cdot\mathbf n_1(u)|
   \le w+\frac{2w(t-u)}{r_{\rm lo}}
   \]
   follows from the sine inequality and axis-turn bound.

   Direct integration gives
   \[
   \frac{\bar a}{\tau}\int_0^\tau
   x\left[w+\frac{2w(\tau-x)}{r_{\rm lo}}\right]dx
   =\bar a w\tau\left(\frac12+\frac{\tau}{3r_{\rm lo}}\right).
   \]
   The scaled \(\hat\epsilon_{\rm new}/r\) follows with the claimed constants. Exchanging members supplies the other inequality.

4. **Lemma Y.11 and Theorem Y.12: supported, conditional on membership in \(\mathcal C_w\).**

   The floor folds the additional inverse-fourth-power term in the correct direction:
   \[
   \frac{\kappa_2}{r^4}\le
   \frac{\kappa_2/\rho_w}{r^3}.
   \]
   This gives exactly \(c_{\rm new}=2\kappa_1+2\kappa_2/\rho_w\).

   The transverse allowance is correctly
   \[
   a_1|\sin\beta_1+b_2|+
   a_2|\sin\beta_2-b_1|
   \le\frac{2c_1\hat\epsilon_{\rm new}}{r^3}.
   \]
   Reconstructing the radial and transverse decompositions of Lemma Y.3 produces the stated \(C_A^{\rm new}\) and \(e^{\rm new}\).

   Both floor arguments are sufficient: closest approach supplies it for relative-periodic histories; strict concavity below the floor supplies it for every complete history. The latter uses completeness in both time directions, not recurrence.

   The companion proofs then carry through with the replacement constants. In particular, the finite-interval estimate retains
   \[
   \Gamma_{\rm new} I-B_w\sqrt I\le K_w.
   \]
   Positivity bounds the whole-line integral, and the speed bound prevents infinitely many bounded-separation returns from having arbitrarily short duration. This proves \(r(t)\to\infty\) at both ends.

5. **Numerical claims: supported; endpoint-bracketing justification needs correction.**

   My independent interval calculation certified every conservative decimal in the subject’s table, including the parenthesized accepted comparisons. Approximate central values are:

   | \(w\) | \(c_{\rm new}\) | \(\hat\epsilon_{\rm new}\) | \(C_A^{\rm new}\) | \(e^{\rm new}\) | \(\Gamma_{\rm new}\) |
   |---|---:|---:|---:|---:|---:|
   | \(1/100\) | 0.1215259709 | 0.0091465600 | 0.1217107406 | 0.0200645644 | 1.9971733558 |
   | \(1/20\) | 0.9510636129 | 0.0680694077 | 0.9582198516 | 0.2055458585 | 1.8864601458 |
   | \(1/10\) | 3.8912297412 | 0.2410592809 | 3.9445299537 | 1.0373045960 | 1.0155353738 |

   Two-sided rational enclosures establish:
   \[
   0.06058536107950
   <\Gamma_{\rm new}(59/500)
   <0.06058536107951,
   \]
   \[
   -0.01353144239656
   <\Gamma_{\rm new}(119/1000)
   <-0.01353144239655,
   \]
   \[
   -0.52262291753751
   <\Gamma_{\rm new}(1/8)
   <-0.52262291753750.
   \]
   The independently evaluated upward grid first loses positivity at \(119/1000\). The additional run-output rows at \(3/20,1/6,1/5\) also agree.

   The monotonicity claim is correct. Specifically, \(A_{\rm hi}=\hat a\) increases, \(A_{\rm lo}=(1-w)^4/(1+w)^3\) decreases, and \(\gamma\) decreases. Hence \(\hat\Omega\) increases on both branches, continuously across \(\gamma=0\). The other positive factors have the stated directions, making \(\Gamma_{\rm new}\) strictly decreasing.

   However, **a negative lower enclosure alone cannot establish a negative function value**. The subject’s bracket conclusion needs the negative upper enclosure supplied above; see **SW-SIGN**.

   The worked boundary coefficient also checks:
   \(2(1-\sqrt{0.99})\approx0.01002512579<0.01003\).
   At \(1/8\), the curvature and straight terms are approximately \(2.09725750\) and \(1.94859920\), respectively.

6. **Instrument, README and run records: supported within their declared limits.**

   Code inspection confirms known cases precede targets **within each part**. Part A’s targets precede Part B’s controls, which is consistent with that per-part description.

   A write-disabled, in-memory rerun exactly reproduced `run2.out` and `run2.json`, including sample count, ordering and discrepancy maxima. The supervisor record supports the reported completion, exit code and timing; it establishes operational provenance only.

   Separately, my 65-digit calculation on the 500 generated prescribed paths used a different root procedure and analytic weighted-sinusoid integrals. Its largest scaled residuals were approximately \(6.2\times10^{-56}\) for the numerator identity and \(1.6\times10^{-61}\) for the integral identity. These are additional finite numerical algebra checks, without interval certification.

   The author’s floating discrepancies are correctly described as algebra checks on prescribed paths. They prove no solution bound. The exact-rational evaluator correctly constructs conservative constants and a lower certificate enclosure.

7. **Scope and physics policy: supported, subject to SW-DOM.**

   The proofs introduce no conservation premise, division by \(J\), primitive force law or observer-level mechanism. They tolerate zeros and sign changes of \(J\), independent common motion, and nonrecurring complete histories.

   The conclusions are derived implications of the unchanged Master Equation and the explicitly restricted class. They establish neither existence of that class nor measured scattering behavior. They do not quantify the original in-and-out asymmetry; they bypass it by excluding recurrence and bounded separation in the certified regime.

   The zero-speed/Sharpness comparison needs the asymptotic qualification in **SW-LIMIT**.

**Actionable corrections, in recommended order.**

1. **SW-DOM — Restrict Lemma Y.8’s strength relation.** At [line 35](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-sharpened.md:35), add \(D>0\) at the chosen emission root, or the sufficient assumption \(|\mathbf v_j(s)|<1\). Keep the numerator identity distinguished from the canonical strength relation. A concrete counterexample to the current broad strength wording is \(t=0\), receiver \(x_r=1\), transmitter \(x_j(u)=2u^2\), chosen root \(s=-1\). Present velocity is zero, but \(D=-3\): canonical strength difference is \(-2/3\), whereas the displayed signed-denominator quotient is \(-4/3\). This example is outside \(\mathcal C_w\).

2. **SW-SIGN — Supply a negative upper enclosure for the range endpoint.** Amend [line 132](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-sharpened.md:132) to use a certified upper bound at \(119/1000\), such as the two-sided enclosure above. Together with positivity at \(59/500\), continuity and strict decrease, it establishes the claimed bracket. Preserve the distinction between failure of a lower certificate and proof of negativity.

3. **SW-LIMIT — Qualify the Sharpness comparison.** At [line 80](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-sharpened.md:80) and the corresponding Limits passage, describe \(w=0\) as a formal endpoint evaluation and \(1/(4r^4)\) as the Sharpness example’s leading large-\(r\) strength error. The exact numerator is \(g^2\tau^4/4\); the exact strength error also contains the denominator \(\tau ETE^0\). The factor-three comparison concerns leading coefficients.