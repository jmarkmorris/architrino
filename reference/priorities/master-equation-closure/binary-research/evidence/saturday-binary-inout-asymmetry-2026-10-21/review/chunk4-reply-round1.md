**Disposition: ACCEPT AFTER CORRECTIONS.** Lemma Y.13, the certificate calculation, and Theorem Y.14’s proof transfer are supported. Two prose claims need correction; neither changes the theorem or the \(129/1000\) threshold. No files were edited.

I read AGENTS.md in full, the startup router and theorem-review owner, and the following mathematical/evidence files in full:

- Chunk 4’s regrouped note, instrument, evidence README, and all three specified run outputs.
- Chunk 3’s sharpened note and accepted chunks 1–2.
- The accepted curved-window and non-mirror notes, including the specified lemmas, bounds, and Sharpness section.

I also read the canonical Master Equation’s “Per-Hit Acceleration,” “Total Acceleration,” and “Conventions and Exclusions.” By `wc -c` and `shasum -a 256` on the specified files, their lengths and hashes match the supplied identities.

**Claim-by-claim assessment**

1. **Regrouping and its bounds — supported; introductory comparison needs correction.**

   Writing \(\mathbf g=\mathbf e+\tau\boldsymbol\sigma\), direct integration gives
   $$
   \mathbf g
   =-\int_s^t(t-u)\ddot{\mathbf x}_j(u)\,du,
   \qquad
   |\mathbf g|\le\frac{\tau^2\bar a}{2}.
   $$
   Equivalently,
   $$
   \mathbf g=\mathbf x_j(s)-\mathbf x_j(t)+\tau\mathbf v_j(s),
   $$
   the negative departure at reception from the tangent extrapolated from emission.

   Independently expanding the causal-root equation and the straight comparison equation reproduces Y.8’s numerator, hence
   $$
   TE^0-\tau E
   =\boldsymbol\rho\cdot\int_s^t m\,\ddot{\mathbf x}_j\,du
   +\tau\mathbf v\cdot\mathbf g
   -\mathbf e\cdot\mathbf g
   -(\tau-T)\boldsymbol\rho\cdot\mathbf v.
   $$
   Therefore
   $$
   |\tau\mathbf v\cdot\mathbf g|
   \le\frac{w\tau^3\bar a}{2},
   \qquad
   |\mathbf e\cdot\mathbf g|
   \le\frac{\tau^4\bar a^2}{4}.
   $$
   These are exact kinematic deductions for \(C^2\) paths.

   The introduction’s statement that the shared vector is “half the size that the separate bounds allow” is incorrect: the bounds improve from \(3\tau^2\bar a/2\) to \(\tau^2\bar a/2\), a factor of **three**. The *total speed-dependent numerator allowance* is correctly halved because its separate delay-error contribution remains unchanged.

2. **Lemma Y.13 and zero-speed sharpness — supported, with the stated formal scope.**

   The zero-mean weight satisfies
   $$
   \left|\boldsymbol\rho\cdot\int m\,\ddot{\mathbf x}_j\,du\right|
   \le\frac{r\tau^2}{4}\operatorname{osc}
   \bigl(\hat{\boldsymbol\rho}\cdot\ddot{\mathbf x}_j\bigr).
   $$
   Reconstructing the angular and strength bounds gives the stated \(\hat\Omega/r^2\) oscillation allowance. Combining all four terms yields
   $$
   |TE^0-\tau E|
   \le r\left(\frac{\hat\tau^2\hat\Omega}{4}
                 +w\hat\tau^3\hat a\right)
        +\frac{\hat\tau^4\hat a^2}{4}.
   $$
   The canonical denominator is positive because \(D\ge1-w>0\), and
   $$
   \tau ETE^0\ge
   \frac{(1-w)S_w}{(1+w)^3}r^4=\mathcal D r^4.
   $$
   Division produces both displayed constants exactly.

   For constant acceleration and zero present transmitter velocity,
   \(\mathbf e=\mathbf g_{\!a}\tau^2/2\) and
   \(\boldsymbol\sigma=-\mathbf g_{\!a}\tau\), so the numerator is exactly
   \(g_{\!a}^2\tau^4/4\). With \(g_{\!a}=r^{-2}\), its strength error is
   \(1/(4r^4)+O(r^{-5})\).

   This establishes sharpness of that numerator coefficient on prescribed windows. It establishes neither attainment by a solution nor optimality of the complete solution allowance. The note appropriately calls \(w=0\) a formal endpoint.

3. **Theorem Y.14 — supported, conditional on the inherited proof inputs.**

   The floor gives
   $$
   |a_i-a_i^0|
   \le\frac{\kappa_1^{\rm reg}+\kappa_2^{\rm reg}/\rho_w}{r^3}
   =\frac{c_{\rm reg}}{2r^3}.
   $$
   Reconstructing Y.11’s radial and transverse estimates confirms that replacing \(c_{\rm new}\) by \(c_{\rm reg}\), while retaining \(\hat\epsilon_{\rm new}\), produces the stated \(C_A^{\rm reg}\) and \(e^{\rm reg}\). The subsequent period and arbitrary-interval arguments retain their validity.

   The dependencies are:

   - **Regrouping identity:** independent of chunk 3’s acceptance status.
   - **Y.13:** uses Y.8 and the reused axial-oscillation/window estimates from Y.9; it does not require Y.10–Y.12.
   - **Y.14:** additionally uses Y.10’s aberration allowance, Y.11’s transfer argument, and Y.12’s proof mechanism, together with accepted chunks 1–2.
   - **Certificate arithmetic:** verifies the displayed formulas; its dynamical significance depends on those lemmas.

   This review does not declare chunk 3’s separate round-2 review closed.

4. **Numerical claims — supported.**

   Before reading the author’s instrument, I evaluated the formulas using a separately written integer interval calculation with directed rounding at scale \(10^{40}\). Integer-root, signed-rounding, square-root, and zero-speed controls passed before target evaluation.

   Independent values below are display approximations:

   | \(w\) | \(c_{\rm reg}\) | \(C_A^{\rm reg}\) | \(e^{\rm reg}\) | \(\Gamma_{\rm reg}\) |
   |---|---:|---:|---:|---:|
   | \(1/100\) | 0.09824318109 | 0.09842795084 | 0.01983173652 | 1.99763073382 |
   | \(1/20\) | 0.72643722588 | 0.73359346459 | 0.19431453915 | 1.90956837956 |
   | \(1/10\) | 2.67952700126 | 2.73282721371 | 0.91613432198 | 1.28576192416 |
   | \(1/8\) | 4.91209321549 | 5.03072681445 | 1.82467236622 | 0.29164507445 |

   Every corresponding conservative inequality in the note is valid. The chunk-3 comparison entries also check: its \(c_{\rm new}\) values are approximately \(0.12152597087\), \(0.95106361287\), and \(3.89122974120\); its certificate values are approximately \(1.99717335575\), \(1.88646014585\), and \(1.01553537382\). At \(1/8\), its certificate is negative.

   My two-sided enclosures give
   $$
   0.03886897652558
   <\Gamma_{\rm reg}(129/1000)
   <0.03886897652559,
   $$
   $$
   -0.03002076335088
   <\Gamma_{\rm reg}(13/100)
   <-0.03002076335087,
   $$
   and
   $$
   -0.27795302344119
   <\Gamma_{\rm reg}(2/15)
   <-0.27795302344118.
   $$

   The independent upward grid calculation first becomes non-positive at \(130/1000\). The monotonicity claim also follows analytically: the positive gain decreases, while the nonnegative subtracted allowances increase; the two branches of \(\hat\Omega\) agree at their junction.

   The author’s caution about negative **lower enclosures** is correct. This review now supplies stronger information: continuity and strict decrease place the certificate’s unique zero between \(129/1000\) and \(13/100\). That is a boundary of this certificate, not an existence threshold for bound histories.

   The worked \(1/8\) numbers also check: the curvature term is approximately \(1.41348573502\), the straight gain \(1.94859919758\), and the boundary coefficient is less than \(0.0158\).

5. **Instrument and README — supported within their declared scope.**

   Code inspection and an in-memory execution under the shared venv reproduce the reported controls, arithmetic displays, grid result, and floating discrepancy. No output files were written.

   Known cases precede targets **within each part**. Part A’s controls precede T4; Part B’s four controls precede its certificate targets. The two regressions are correctly identified as regressions rather than independent references.

   Separately, I reconstructed Simpson quadrature for the harmonic paths using analytic finite sums at 70-digit precision. After known-case controls, the same 300 prescribed samples give a largest scaled quadrature discrepancy of approximately \(2.7606571\times10^{-11}\), consistent with the recorded floating result \(2.7608758\times10^{-11}\).

   These are finite algebra/quadrature checks on prescribed paths. They certify no solution, acceleration allowance on solutions, recurrence exclusion, or separation limit. The README correctly distinguishes nearest-rounded displays from certified bounds.

6. **Physics, scope, grades, and falsifiers — supported, except the proposed necessity for further progress.**

   The argument uses the canonical attractive acceleration row with its transmitter velocity evaluated at emission, \(c_f=1\), and positive transmitter factor. It introduces no observer-level law, conservation premise, additional recurrence, or modified interaction.

   The conclusions concern complete planar histories with the whole-history speed bound and the declared root census. The separation conclusion requires no recurrence. Neither existence of such histories nor a scattering-speed increase is proved.

   The grades and falsifiers appropriately distinguish kinematic identities, conditional solution estimates, arithmetic verification, and finite sampling. However, the assertion that further progress “needs” information beyond acceleration size is **not supported as a necessity**. No optimality argument establishes that restriction; tighter existing estimates or averaging could also improve the certificate.

Next possible actions:

1. **○ RG-FACTOR — Required correction:** In the [introduction, line 5](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-regrouped.md:5), replace “the shared vector is half the size…” with “the shared-vector bound is one third of the separate triangle bound.” Retain the correctly stated halving of the total speed-dependent allowance.
2. **○ RG-NEED — Required correction:** At [line 62](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-inout-asymmetry-2026-10-21-regrouped.md:62), present acceleration-variation estimates as a possible route, rather than a necessary one. Recommendation: “Further improvement may come from tighter window or averaging estimates; controlling acceleration variation is one possible route.”