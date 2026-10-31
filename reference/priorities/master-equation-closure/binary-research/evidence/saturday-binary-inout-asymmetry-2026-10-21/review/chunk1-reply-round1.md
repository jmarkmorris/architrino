**Disposition: ACCEPT AFTER CORRECTIONS.** The exclusion of relative-periodic histories in the stated class at whole-history speed bounds \(w\le81/1000\) is supported. I found no sign error, missing derivative term, hidden recurrence assumption on the common velocity, or gap in the many-period argument. Four explanatory corrections are required; none changes the theorem’s equations or its stated exclusion through \(0.081\).

**What I read and verified.** I read the subject, evidence README, instrument, and all three supplied run outputs in full. `wc -c` and `shasum -a 256` matched all six supplied byte counts and hashes.

I also read these accepted sources in full:

- `saturday-nonmirror-periodicity-2026-10-11.md`, including its M2 continuation;
- `saturday-curved-window-strength-difference-2026-10-11.md`;
- `saturday-low-angular-momentum-2026-10-14.md`;
- `saturday-binary-correlation-travel-2026-10-20-inverse-weight.md`.

I read manuscript Section 9.2 and the canonical Master Equation passages on causal emission times, transmitter-side weighting, per-hit acceleration, total acceleration, and exclusions, together with the governing repository and review instructions.

Before opening the author’s instrument, I evaluated \(\Gamma\) using a separately written BigInt interval calculation, with outward rounding at scale \(10^{40}\). Integer-square-root, rational-root, signed-arithmetic, and zero-speed controls passed before target evaluation. Subsequently, a read-only execution of the author’s two parts under the shared venv reproduced the retained JSON exactly. That reproduction establishes repeatability; my mathematical assessment rests on the independent reconstruction below.

The author’s reading chronology and assertion about a pre-run hash command are not independently established by the supplied receipts. Neither is a mathematical premise. I edited no files.

**Assessment of the requested claims follows.**

1. **Lemma Y.1 — supported; derived and kinematic.**

   Writing \(\rho=\dot r\), direct differentiation gives
   \[
   \dot J=r(q_1-q_2),\qquad
   \dot d=q_1-q_2-\frac{d\rho}{r},\qquad
   \ddot r=\frac{d^2}{r}-A_r.
   \]
   Therefore
   \[
   \frac{d}{dt}\frac{\rho^2+d^2}{2}
   =-\rho A_r+d(q_1-q_2).
   \]
   In particular, the two \(d^2\rho/r\) terms cancel with opposite signs.

   The rotating-frame derivative is
   \[
   \dot b_i=q_i-\frac d r u_i,\qquad
   \dot S_i=-t_iq_i+\frac d r u_it_i.
   \]
   Combining this with
   \[
   \frac{d}{dt}\left(-\frac{\rho}{r}\right)
   =-\frac{d^2}{r^2}+\frac{A_r}{r}+\frac{\rho^2}{r^2}
   \]
   reproduces every displayed term and sign in Y.1. No division by \(J\) occurs.

2. **Straight comparison values — supported; derived from the canonical row.**

   For receiver 1, the tangent-history root gives
   \[
   T_1=\frac r{S_2-u_2},\qquad
   \mathbf n_1^0=S_2\hat{\mathbf r}+b_2\hat{\boldsymbol\theta}.
   \]
   For receiver 2,
   \[
   T_2=\frac r{S_1+u_1},\qquad
   \mathbf n_2^0=-S_1\hat{\mathbf r}+b_1\hat{\boldsymbol\theta}.
   \]
   Applying the attractive canonical acceleration \(-a_i^0\mathbf n_i^0\) gives exactly
   \[
   A_r^0=\frac{S_1+S_2+\rho}{r^2},\quad
   q_1^0=-\frac{(S_2-u_2)t_2}{r^2},\quad
   q_2^0=-\frac{(S_1+u_1)t_1}{r^2}.
   \]
   Both transverse signs are correct. The multiplier uses transmitter velocity at emission; no receiver multiplier has entered.

3. **Lemma Y.2 — supported; its explanatory account needs correction.**

   The radial group cancels exactly:
   \[
   -\rho(S_1+S_2+\rho)+(S_1+S_2)\rho+\rho^2=0.
   \]
   The transverse group cancels because
   \[
   r^2(q_1^0-q_2^0)=d+u_1t_1+u_2t_2.
   \]
   The surviving terms are precisely
   \[
   \frac{A_r^0+t_1q_1^0+t_2q_2^0}{r}
   =\frac{(1-t_1t_2)(S_1+S_2+\rho)}{r^3}.
   \]
   The stated positive lower bound holds for \(0<w<1/3\).

   However, the introductory explanation and Section 5 misidentify the cancellation: the common-motion term cancels against the rotating-frame contribution to \(\dot S_i\). It does not cancel directly against the radial acceleration term weighted by \(\dot r\). Also, the surviving expression depends on common transverse motion through \(S_1+S_2\) as well as \(t_1t_2\). See correction YR2.

4. **Lemma Y.3 and its constants — supported; derived on solutions.**

   The accepted bounds are applicable without a sign condition on \(J\). Their relevant dependence can be reconstructed from the canonical row:
   \[
   a_i=\frac1{\tau_i^2D_i},\qquad D_i\ge1-w.
   \]
   The delay and separation-window bounds give
   \[
   \bar a_j\le
   \frac{(1+w)^2(1-w)}{(1-3w)^2r^2}.
   \]
   Crucially,
   \[
   a_1\epsilon_2=\frac{\bar a_2}{2\tau_1D_1},
   \]
   so the summed bound is indeed \(c_3/r^3\); it is not necessary to multiply unrelated coarse bounds and obtain a larger constant.

   The curved-window proof’s tangent-displacement, delay, and transmitter-factor estimates reproduce its separate-row bound \(c/(2r^3)\).

   For the new radial estimate,
   \[
   |\cos\beta_1-S_2|
   \le\frac{w\epsilon_2}{S_w}
   \]
   follows from the difference of squares and the positive cosine branch. That branch is justified by the wake geometry, not merely by the sine bound.

   The sharper comparison-strength estimate is also correct:
   \[
   \frac{u_i^2}{S_i^2}
   \le\frac{w^2-b_i^2}{1-b_i^2}\le w^2,
   \qquad r^2a_i^0\le1+w.
   \]
   These yield the displayed \(C_A\). The two transverse decompositions yield \(e=c_3+wc\).

   Finally, the affine coefficients are exactly
   \[
   1/r-\rho,\qquad d+t_1/r,\qquad -d+t_2/r.
   \]
   The subsequent absolute-value estimate is valid.

5. **Theorem Y — supported; derived conditional on the stated class.**

   Relative periodicity makes \(r,\rho,d\) periodic. Consequently,
   \[
   \mathcal L(NT)-\mathcal L(0)
   =-\frac{[S_1+S_2]_0^{NT}}{r(0)},
   \]
   whose absolute value is at most \(2(1-S_w)/r(0)\), independently of \(N\). The individual velocities need not recur.

   After Y.3’s bounds are applied, the lower-bounding integrand depends only on \(r,\rho,d\) and fixed constants. Its integral therefore repeats each period even when the actual individual rows do not.

   Both integration identities are correct:
   \[
   \oint\frac{\rho}{r^3}\,dt=0,\qquad
   2\oint\frac{\rho^2}{r^3}\,dt
   =\oint\frac{d^2}{r^3}\,dt-\oint\frac{A_r}{r^2}\,dt.
   \]
   Since \(A_r>0\), the weighted Cauchy–Schwarz step gives exactly
   \[
   \oint\frac{C_A|\rho|+e|d|}{r^3}\,dt
   \le2w\sqrt{C_A^2+2e^2}\,I_3.
   \]

   At minimum separation, \(\ddot r\ge0\) and \(|d|\le2w\) give the accepted floor. Thus
   \[
   I_4\le\frac{4w^2}{c_-}I_3.
   \]
   The resulting inequality
   \[
   N\Gamma(w)I_3\le\frac{2(1-S_w)}{r(0)}
   \]
   contradicts \(\Gamma(w)>0\) as \(N\to\infty\). No positive lower bound on \(I_3\) uniform across different histories is needed: each hypothetical history has its own fixed \(I_3>0\).

   Class nesting correctly covers all slower histories without assuming monotonicity of \(\Gamma\).

6. **Numerical claims — supported, except the claimed continuous interval of certificate failure.**

   My independent interval arithmetic gives the following strict rational enclosures; each decimal endpoint is an exact rational with denominator \(10^{12}\):

   | \(w\) | Lower endpoint for \(\Gamma(w)\) | Upper endpoint |
   |---|---:|---:|
   | \(1/100\) | 1.903979033660 | 1.903979033661 |
   | \(1/50\) | 1.782346946904 | 1.782346946905 |
   | \(1/20\) | 1.198448694154 | 1.198448694155 |
   | \(1/16\) | 0.814973008845 | 0.814973008846 |
   | \(3/40\) | 0.310413853880 | 0.310413853881 |
   | \(2/25\) | 0.066389664210 | 0.066389664211 |
   | \(81/1000\) | 0.014269108241 | 0.014269108242 |
   | \(811/10000\) | 0.008993409846 | 0.008993409847 |
   | \(82/1000\) | −0.039016587925 | −0.039016587924 |
   | \(1/12\) | −0.111923360314 | −0.111923360313 |
   | \(1/10\) | −1.231830157281 | −1.231830157280 |

   Every displayed straight-gain lower bound, curvature upper bound, floor-term upper bound, and \(\Gamma\) lower bound in the subject’s table is conservative. The worked \(w=1/20\) bounds and \(c(1/10)>12.7\) also check out.

   **The claim that the certificate is nonpositive throughout \(0.081<w\le0.1\) is false:** the \(0.0811\) row supplies a counterexample. Continuity already makes some extension beyond \(0.081\) unavoidable.

   The “largest grid value” is correct. Independently, \(\Gamma\) is strictly decreasing on the domain: its positive leading contribution decreases, while \(C_A,e,\hat t\) increase and \(c_-\) decreases. Thus the negative value at \(0.082\) excludes a later positive grid interval. The stopping rule alone would not establish that fact.

7. **Instrument and README — supported with one numerical-error correction.**

   Code inspection and the read-only reproduction confirm the descriptions and recorded values of A-K1–A-K3, T1, T2, and B-K1–B-K3. Each part’s controls precede its targets. The exact-rational enclosure directions are correct. The output decimals are correctly identified as approximate displays rather than certified endpoints.

   T1 and T2 record finite floating-point discrepancies; they do not certify identities or solutions, and the code does not impose target pass/fail tolerances. The manuscript generally describes that boundary accurately.

   The README’s attribution of T1’s \(2.92\times10^{-8}\) discrepancy to truncation error is **not supported**. My separately implemented, 70-digit evaluation of the same prescribed sample set gives a maximum scaled central-difference truncation discrepancy of approximately
   \[
   6.35000288\times10^{-10}
   \]
   at \(h=10^{-4}\). A floating-point step sweep also becomes worse at \(h=10^{-5}\). The reported discrepancy includes substantial floating-point numerical error; it should not be identified with truncation error alone.

8. **Scope, Theorem R, and policy — supported with explanatory qualifications.**

   Theorem R’s necessary asymmetry condition is represented correctly. For the excluded speed class, its necessary conditions apply to an empty relative-periodic class. The two integral identities in subject line 170 independently follow from periodicity and the radial equation.

   There is no division by \(J\), conservation premise, rigid-recurrence assumption, or transfer of a sign between different weights. No observer-level physical law is imported.

   The result is a theorem conditional on the complete planar opposite-unit, unit-coupling, positive-separation, whole-history speed-bounded class. It establishes neither existence of complete histories nor exclusion of every bounded nonrecurrent history or every subwake history.

   The title’s “only increases” wording exceeds what the given proof establishes. The proof establishes positive accumulated change over hypothetical relative periods using a periodicity-dependent separation floor; it does not establish pointwise monotonicity of \(\mathcal L\) on general solutions.

   The principal claim grades and falsifiers are appropriate. The numerical-error explanation should be treated as an inference requiring correction.

**Required actionable corrections:**

1. **○ YR1 — Correct the continuous speed-range statement.** Revise subject lines 17 and 168 to distinguish the certified \(0.081\) grid threshold from the continuous endpoint of \(\Gamma>0\). State that the grid first fails at \(0.082\); do not claim failure everywhere above \(0.081\).

2. **○ YR2 — Correct the cancellation mechanism.** Revise subject lines 12 and 170 so the common-motion term cancels against the rotating-frame contribution to \(\dot S_i\). In line 93, retain the surviving common-motion dependence through both \(S_1+S_2\) and \(t_1t_2\). Preserve the correct equations.

3. **○ YR3 — Replace the pointwise-monotonicity wording.** Revise the title, its README link label, and associated summary wording to describe positive period-averaged or accumulated growth under hypothetical relative periodicity. A suitable title is “A balance-function obstruction to repeating two-member histories at small speed bounds.”

4. **○ YR4 — Correct the differentiation-error explanation.** Replace the README’s line-21 truncation-error assertion with “finite-difference discrepancy including floating-point rounding and truncation effects.” Keep the observed discrepancy and its scale unchanged. The subject’s corresponding explanation should use the same qualification.

The supplied hashes identify the reviewed version. These findings can be captured in the existing evidence review record; I have left that capture to the receiving author under your no-edit instruction.

Next possible actions:

1. Have the author apply YR1–YR4 and return the revised subject and README for closure review. Recommended: retain the theorem and \(81/1000\) exclusion unchanged.

