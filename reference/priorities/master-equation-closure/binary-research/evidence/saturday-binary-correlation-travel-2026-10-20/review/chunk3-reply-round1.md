The main inequalities and all certified numerical bounds are supported. Corrections are needed to the small-speed asymptotic coefficient, the scope of the claimed improvement, and several explanatory statements.

**(a) What I read and independently checked**

I read in full:

- All six files under review, including the complete evidence README.
- The chunk-2 inverse-weight note and both cited review replies.
- The accepted low-angular-momentum, signed-breathing, curved-window strength-difference, and solution-weighted geometry notes.
- The actual-common-motion-correlation note, to check the historical scope comparison.

I also read AGENTS.md in full, the applicable live review procedure, the canonical Master Equation passages at lines 1363–1533 and 1751–1806, and the relevant non-mirror component equations, remainder derivations, and Theorem F.

A Node `fs`/SHA-256 check matched every supplied byte count and hash, including the chunk-2 hash; a closing hash check matched them again.

I reconstructed the mathematics and wrote a separate JavaScript BigInt interval evaluator using directed arithmetic on a \(10^{-50}\) grid and square-root bisection. Controls passed **before targets**: signed division, rational containment, \(\sqrt{9/4}=3/2\), squared brackets for \(\sqrt2\), zero-speed constants, and hand values of \(\alpha,c_1\). I neither imported nor executed the author’s instrument.

No file was edited. No history was integrated or sampled.

**(b) Claim-by-claim assessment**

**1. Corollary S.1 and class nesting — supported, derived conditionally.**

Theorem R’s proof does not use \(D\) or Theorem Z. Independently reconstructing its lower-bound contributions gives

\[
\frac12\oint\dot r\,d^2
\ge
\left[
\alpha c_--w^2c_1-k_1-\frac{k_A'}{4r_{\min}}
-(1+w)z_0c_1
-e\min\{2w,\sqrt{c_+/r_{\min}}\}
\right]I_2.
\]

The gain uses \(\oint d^2/r=\oint A_r\). The turning correlation follows from

\[
\dot Q=2H+4\dot\vartheta P_\parallel P_\perp.
\]

The straight-strength terms follow from differentiating \(\Phi(b_i)\), and the curvature terms cost at most \(e\oint|d|r^{-2}\). Over \(N\) periods the remaining endpoint allowance is bounded by \(w^2+2\Phi(w)\), independently of \(N\). Division by \(N\) removes it without common-velocity recurrence.

The consequences reconstruct directly:

\[
\oint\dot r\,d^2=2\oint J\dot J/r,
\]

\[
\operatorname{osc}(J^2)\oint|\dot r|r^{-2}\ge4GI_2,
\]

and, after centering \(1/r\),

\[
\oint\dot r\,d^2
\le
\frac{\Delta r}{r_{\min}r_{\max}}\oint|J\dot J|.
\]

Using \(|\dot r|\le2w\), \(|J\dot J|\le wc_+|d|\), and the stated bound on \(L_d\) gives S.1.

Class nesting is correct. A history in \(\mathcal C_{w'}\), \(w'\le w\), satisfies the certificate evaluated at the containing bound \(w\). This does not require monotonicity of \(G\) in speed.

**2. Thresholds, floors, and \(G_\infty\) lower bounds — supported by independent interval arithmetic.**

The following are independently computed approximations, except the last column, whose strict lower bounds were checked with exact internal interval comparisons.

| \(w\) | Floor, approximately | \(G\) at floor, approximately | \(\rho_w\) | Certified \(G(w,\rho_w)>\) |
|---|---:|---:|---:|---:|
| \(1/10\) | 36.6336283662 | 0.243772293255 | floor | 0.2437722932546 |
| \(21/200\) | 32.6939847321 | 0.0968623254423 | floor | 0.0968623254422 |
| \(11/100\) | 29.3088083615 | −0.0629722142409 | 63 | 0.00275535627138 |
| \(1/8\) | 21.6069690404 | −0.639719537475 | 129 | 0.000554763140075 |
| \(3/20\) | 13.8033938665 | −2.09577185678 | 463 | 0.00119051779747 |
| \(1/5\) | 6.53197264742 | −9.78370253168 | 9199 | 0.0000354642039319 |
| \(1/4\) | 3.48568501159 | −47.4882892210 | 740904 | 0.00000002368831417 |
| \(27/100\) | 2.77107171771 | −104.033740530 | 17126360 | 0.0000000003360777731 |

Every displayed floor is conservative as a lower bound. Every published \(G_\infty\) lower bound passes.

Monotonicity in \(\rho\) extends each certified positive sign to every larger separation. These are sufficient thresholds, not optimal thresholds. For example, my evaluator also finds \(G(3/20,462)>0\) and \(G(1/5,9198)>0\); this is consistent with the document’s explicit nonminimality qualification.

The entry \(-104.0\) is an approximate display, **not** a conservative lower endpoint. The document should preserve that distinction when describing its rounding.

**3. Proposition S.2 — supported, derived.**

The monotonicity argument is correct:

- \(\alpha c_-\) is strictly decreasing and positive.
- Every subtracted component of \(G_\infty\) is nonnegative and increasing.
- The formulas are continuous on \(0<w<1/3\).

Independent evaluation gives

\[
G_\infty(27/100)\approx0.0786790208148874,
\]

\[
G_\infty(3/10)\approx-0.0970175779268282.
\]

Thus there is exactly one zero between those **speed bounds**. Since both finite-separation subtractions are strictly positive, \(G(w,\rho)<G_\infty(w)\) for every finite \(\rho>0\). Above the critical speed, this certificate is negative at every separation.

The text correctly presents this crossing as a limitation of the constants and method. It establishes neither existence nor a physical speed boundary for repeating histories.

**4. Proposition S.3 — inequalities and numerical coefficients supported; explanatory asymptotics need correction.**

The pointwise estimate reconstructs without a sign assumption on \(J\):

\[
|\dot J|
\le c_1|J|r^{-2}+2wc_2r^{-1}+c_3r^{-2},
\]

hence

\[
|J\dot J|
\le c_1d^2+2wc_2|d|+c_3|d|/r.
\]

The required integral estimate follows independently from Cauchy–Schwarz, the radial identity, and the floor:

\[
\oint |d|/r
\le \sqrt{Q_dI_2}
\le \frac{Q_d}{\sqrt{c_-r_{\min}}}
\le \frac{2w}{c_-}Q_d.
\]

When \(D>0\), Theorem Z supplies \(Q_d\le kL_d\), giving precisely

\[
\oint|J\dot J|\le
\left(c_1k+2wc_2+\frac{2wc_3k}{c_-}\right)L_d
=\beta L_d.
\]

Centering \(1/r\) then proves the product inequality and both amplitude consequences. Positive amplitude information requires \(G>0\); when \(G\le0\), their right sides are nonpositive.

Independent coefficient evaluations are:

| \(w\) | \(\beta\), approximately | \(\kappa_a'\), approximately | \(\kappa_b'\), approximately | Improvement factor \(wc_+/\beta\) |
|---|---:|---:|---:|---:|
| \(1/10\) | 0.151066986431 | 8.07372590852 | 251.583269903 | 1.77993150748 |
| \(1/20\) | 0.0192623048202 | 68.1521012190 | 30907.2238272 | 6.02485697647 |
| \(1/100\) | 0.000708752593215 | 1965.69693471 | 27049132.5540 | 29.0765508379 |

All published upper bounds for \(\beta\), and all new and old lower bounds for the amplitude coefficients, are conservative.

However, the sentence \(\beta\approx2wc_2\approx6w^2\) is incorrect. Since

\[
k=w^2+O(w^3),\quad c_1=1+O(w),\quad c_2=3w+O(w^3),
\]

the first term contributes another \(w^2\):

\[
\boxed{\beta=7w^2+O(w^3)},\qquad
\frac{wc_+}{\beta}\sim\frac{2}{7w}.
\]

Also, \(D>0\) alone does **not** make the new bound sharper. At the accepted positive-\(D\) endpoint \(w=8/75\), independent evaluation gives approximately

\[
D=0.0647450,\quad
\beta=0.3905054,\quad
wc_+=0.2924683.
\]

There the new coefficient gives a weaker amplitude requirement. Improvement requires \(\beta<wc_+\); it is verified at the three tabulated speeds.

**Worked numbers — numerically supported, with one vacuous example.**

At \(w=1/10\) and \(r_{\min}\ge10^4\), independent evaluation gives

\[
G(10^4)\approx0.997124592328,
\]

\[
\frac{\kappa_a'G}{2}\approx4.02525532755,\qquad
\frac{\kappa_b'G}{2}\approx125.429932719.
\]

Therefore \(4.02\sqrt{r_{\max}}\), \(125\), \(402\), and \(40{,}200\) are conservative numerical substitutions.

But \(r_{\max}=10^4\), together with \(r_{\min}\ge10^4\), forces constant separation. That endpoint is already excluded. Present it as an exclusion, or replace it with a nonempty separation range.

**5. D-dependent scope and open histories — partly supported; historical attribution needs correction.**

The accepted monotonicity proof is valid, and my independent endpoint calculations confirm

\[
D(8/75)\approx0.06474500569>0,\qquad
D(0.11)\approx-0.006482241572<0.
\]

Consequently the **D-dependent** low-angular-momentum consequences do not apply on \([0.11,1/3)\). The actual-correlation forcing lines require the stronger condition \(D>m\).

The broader assertions at lines 5 and 47 are inaccurate. Not every earlier period estimate or constant-separation exclusion requires \(D>0\). The radial-period G.7 and signed-breathing W.6 exclusions use other sufficient inequalities; non-mirror Theorem F also has a different condition. This does not establish that those results cover speed \(1/5\); it means their limitation cannot be attributed collectively to \(D\).

The \(10^7\)-scale threshold near \(27/100\), the limitation to wide histories there, and the statement that strongly eccentric recurrence remains unresolved are supported.

**6. Instrument and README account — computational logic supported; wording needs minor corrections.**

By inspection of the frozen source:

- Square-root enclosure ends are conservative.
- Lower \(G\) uses lower gain and upper subtractions.
- The opposite ends correctly enclose \(G_\infty\) from above.
- The coefficient evaluations use upper \(\beta,k,\sqrt{c_+}\) where required.
- The doubling/bisection retains a positive lower bound at its returned endpoint. It need not return the least passing integer.
- K0–K6 execute before targets; failure exits before target computation.
- K6 correctly quotes the earlier reviewer’s independently computed values.

The preserved stdout, JSON, and supervisor record consistently record a successful execution. That is operational provenance, not proof of the theorems.

The unsuccessful negative-sign target at \(7/25\) is reported honestly:

\[
G_\infty(7/25)\approx0.0219865762963.
\]

K3 contains the negative upper enclosure at \(3/10\) used by S.2.

Two descriptions need precision:

- The subject says the instrument evaluates lower and upper enclosures of \(G\); it implements lower \(G\) and two-sided \(G_\infty\).
- The README calls K6 the only independent reference. K0–K2 also have independent analytic references. K6 is the comparison with a separately authored numerical evaluator.

Nearest-rounded output strings remain displays, as the README correctly explains. They should not be consumed as directed bounds.

**7. Claim grades, falsifiers, and physics premises — supported at the declared conditional scope.**

The theorem claims are derived necessary conditions on complete solutions in the stated class. The numerical work evaluates constants at finitely many parameters; it samples no solution histories.

I found no forbidden observer-level premise, conserved \(J\), symmetry assumption, inverse-\(J\) chart, or transfer of sign between differently weighted integrals. Relative recurrence is correctly kept separate from common-velocity recurrence.

The subject’s input-counterexample wording correctly withdraws dependent proof support rather than automatically refuting dependent conclusions. Its complete-solution falsifiers are appropriate. A generic falsifier covering any nonconservative numerical table entry would make the arithmetic coverage more explicit.

**(c) Numbered actionable corrections**

1. **○ Not done — SR1: restrict the D attribution.** Correct [lines 5 and 47](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-speed-range.md:5). Name the D-dependent low-J and actual-correlation consequences specifically; do not include all earlier period estimates or constant-separation exclusions.

2. **○ Not done — SR2: correct the asymptotic coefficient.** At [line 74](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-speed-range.md:74), replace the \(6w^2\) explanation with \(\beta=7w^2+O(w^3)\). Retain the independently verified table.

3. **○ Not done — SR3: qualify “sharper.”** State that improvement requires \(\beta<wc_+\), with improvement verified at the tabulated speeds. \(D>0\) establishes validity, not superiority. Optionally retain the stronger bound everywhere by using \(\min\{\beta,wc_+\}\).

4. **○ Not done — SR4: clarify the worked endpoint.** Describe \(r_{\max}=10^4\) as excluded under the stated assumptions, or choose \(r_{\max}>10^4\). The numerical substitutions themselves need no correction.

5. **○ Not done — SR5: tighten arithmetic provenance wording.** Correct [the subject’s instrument paragraph](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-speed-range.md:82) to distinguish lower \(G\) from two-sided \(G_\infty\), qualify the K6 statement in [the README](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/evidence/saturday-binary-correlation-travel-2026-10-20/README.md:70), and exempt approximate display columns from claims of directed rounding. Preserve the frozen instrument and outputs.

**(d) Overall disposition**

**ACCEPT AFTER CORRECTIONS.**

Corollary S.1, Proposition S.2, Proposition S.3’s inequalities, and every certified threshold and coefficient bound are supported. SR1–SR5 concern interpretation, asymptotics, and evidence descriptions. General periodicity and repeating-solution existence remain unresolved.

Next possible actions:

1. Apply SR1–SR5 and return the revised subject/README identities for verification. Recommendation: preserve the theorem displays and frozen computation; their mathematical and numerical content passed this review.

