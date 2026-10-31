Theorem R and Corollaries R.1–R.3 survive independent reconstruction. The corrections concern explanatory scope and the instrument’s serialized evidence, rather than the displayed theorem inequalities.

**(a) What I read and checked**

I read:

- `AGENTS.md` in full, the startup router, and the live theorem-review procedure.
- All five files under review in full. `wc -c` and `shasum -a 256` matched every supplied identity; a final SHA-256 check matched them again.
- All seven listed accepted analysis notes, the low-angular-momentum and actual-correlation review files, and manuscript Sections 9.4–9.7.
- The canonical Master Equation passages covering the emission-time transmitter factor, per-hit acceleration, all-root sum, partner/self split, and zero-delay exclusion.
- The curved-window strength-difference note in full, to reconstruct the constant \(c(w)\), and the signed-breathing review’s final disposition.
- The companion’s displayed excursion formula for comparison only; its proof is not a dependency of this review.

I independently reconstructed the mathematics and authored a separate rational interval evaluator using `Fraction` and rational bisection, without importing or executing the author’s instrument. Controls preceded targets: interval arithmetic, the known square root \(3/2\), a squared bracket for \(\sqrt2\), zero-speed limits, and four hand rational coefficients. The first control attempt stopped before targets because it unnecessarily required bisection to return an exact singleton; the corrected enclosure test passed before target evaluation.

No file was edited, and no solution history was integrated.

**(b) Claim-by-claim assessment**

**1. Choice of weight — supported, with a precise interpretation of uniqueness.**

For \(F=G(r)J^2/2\), substitution of the strength difference gives the common-motion contribution

\[
GJr\delta P_\perp\big|_{\text{common}}
=\frac12Gr\,\dot\vartheta P_\parallel P_\perp.
\]

Thus \(g=Gr\) is correct. Independently differentiating the rotating-frame components gives

\[
\dot Q=2H+4\dot\vartheta P_\parallel P_\perp,
\]

and hence

\[
\int g\dot\vartheta P_\parallel P_\perp
=\frac{[gQ]}4-\frac14\int\dot gQ-\frac12\int gH.
\]

The contribution to \(\dot F\) is half this expression, so its radial–anisotropy coefficient is \(-1/8\), while the displayed weighted-turning identity correctly has \(-1/4\). The accepted \(G=1\) balance therefore gives the stated \(K_2\) expression.

The unique weight that **eliminates the explicit \(\dot gQ\) term algebraically for arbitrary positive \(r\)** is \(G=C/r\). This is not a theorem excluding other integrated cancellations on particular histories.

**2. Theorem R — supported.**

The kinematic identity follows directly from

\[
\frac{d}{dt}\frac{J^2}{r}
=\frac{2J\dot J}{r}-\frac{\dot rJ^2}{r^2}.
\]

Relative recurrence makes \(J^2/r\) periodic, so

\[
\oint\dot rd^2=2\oint\frac{J\dot J}{r}.
\]

Every contribution to the lower bound reconstructs with the stated sign and coefficient:

- **Gain:** \(\mu J^2/r\ge\alpha J^2/r^3\), and the radial identity gives
  \[
  \oint J^2/r^3=\oint A_r\ge c_-I_2.
  \]
  The contribution is therefore at least \(\alpha c_-I_2\).

- **Turning correlation:**
  \[
  \frac12\int\dot\vartheta P_\parallel P_\perp
  =\frac{[Q]}8-\frac14\int H.
  \]
  Since \(|Q|\le4w^2\), the boundary contribution is at least \(-w^2\). The upper bound on \(H/4\) gives exactly
  \[
  -(w^2c_1+k_1)I_2-\frac{k_A'}4I_3.
  \]

- **Straight strength difference:** the member-wise identity is
  \[
  \dot\vartheta u_ib_ig(b_i)
  =b_ig(b_i)q_i-\frac{d}{dt}\Phi(b_i).
  \]
  The canonical row directions give \(q_1=a_1\sin\beta_1\) and \(q_2=-a_2\sin\beta_2\). Consequently the acceleration products cost at most \(wz_0c_1I_2\). The remaining term uses
  \(\dot\vartheta d=d^2/r\ge0\), and costs at most
  \[
  \frac{z_0}{2}\int d^2/r
  =\frac{z_0}{2}\int A_r
  \le z_0c_1I_2.
  \]
  The total is \(-(1+w)z_0c_1I_2\), with boundary
  \(-[\Phi(b_1)+\Phi(b_2)]\ge-2\Phi(w)\).

- **Curvature:** the two terms are bounded by
  \[
  (wc+c_3)|d|r^{-2}=e|d|r^{-2}.
  \]
  Both alternatives are valid:
  \[
  \oint|d|r^{-2}\le2wI_2,
  \qquad
  \oint|d|r^{-2}
  \le\sqrt{\left(\oint d^2/r\right)I_3}
  \le\sqrt{c_+/r_{\min}}\,I_2.
  \]

Over \(N\) periods these estimates give

\[
\frac N2\oint\dot rd^2
\ge NG(w,r_{\min})I_2-w^2-2\Phi(w).
\]

This is the important recurrence check: common-motion integrands need not repeat. Their pointwise bounds reduce to periodic relative quantities, and their endpoint allowances remain bounded independently of \(N\). Dividing by \(N\) removes them without rigid recurrence or a presumed limit of individual common-motion period integrals.

Monotonicity in \(\rho\) is also correct: both separation-dependent subtractions decrease in magnitude as \(\rho\) increases.

I found no sign transfer between different weights, division by \(J\), or missing factor of two.

**3. Corollary R.1 — supported.**

Constant separation makes the left side zero, while \(G>0\) and \(I_2>0\). The independent arithmetic confirms

\[
G(0.1,\text{floor})\approx0.243772293254634>0.
\]

The nesting argument is sufficient: every history with speed bound \(w'\le0.1\) belongs to \(\mathcal C_{0.1}\). No monotonicity in \(w\) is needed.

This extends the cited exclusions in both separation and recurrence scope. The earlier \(10^6\) and \(2\times10^7\) results concern rigid positive-\(J\) histories; the accepted all-sign cutoff reconstructs as approximately \(4{,}043{,}686.12356\). R.1 applies at every separation under relative recurrence.

**4. Corollary R.2 — supported; its speed-comparison prose needs correction.**

Writing \(V_{1/r}=\oint|\dot r|r^{-2}dt\), subtraction of the midpoint of the range of \(J^2\) gives

\[
\oint\dot rd^2
\le\frac{\operatorname{osc}(J^2)}2V_{1/r}.
\]

Combining with Theorem R yields

\[
\operatorname{osc}(J^2)V_{1/r}\ge4GI_2.
\]

Then \(V_{1/r}\le2wI_2\) gives \(\operatorname{osc}(J^2)\ge2G/w\). The constant-\(J\) exclusion and its all-sign scope follow.

It removes October 10 alternative (a) **for relative-periodic histories at the stated speed bound**. It does not settle the nonperiodic half-line proposition M1.

The sentence saying Theorem F remains “the only result” between \(0.1\) and \(0.14\) is not supported. Theorem R’s own formula, independently evaluated at \(w=0.105\), gives

\[
G(0.105,\text{floor})\approx0.096862325442252>0.
\]

The principal statement may remain restricted to \(w\le0.1\), but that exclusivity sentence must be withdrawn or qualified.

**5. Corollary R.3 — supported; unconditional amplitude-growth wording needs qualification.**

Centering \(1/r\) at the midpoint of its range gives

\[
\oint\dot rd^2
=2\oint J\dot J(1/r-h)
\le\frac{\Delta r}{r_{\min}r_{\max}}\oint|J\dot J|.
\]

The actual acceleration bound supplies

\[
|J\dot J|\le wc_+|d|,
\]

which proves the displayed product inequality.

The subsequent estimates also reconstruct:

\[
L_d\le\sqrt{TQ_d}
\le\sqrt{c_+}\,r_{\max}^{3/2}I_2,
\]

and, when \(D>0\),

\[
L_d\le kT\le kr_{\max}^2I_2.
\]

Thus both \(\kappa_a\) and \(\kappa_b\) are correct.

At \(w=0.1,\ r_{\min}\ge10^4\), independent evaluation gives approximately

\[
\kappa_aG=4.52293283268465,\qquad
\kappa_bG=140.937931816224.
\]

With \(r_{\min}\ge r_{\max}/2\), these imply

\[
\Delta r>2.26146641634\sqrt{r_{\max}},
\qquad
\Delta r>70.4689659081.
\]

All stated worked numbers are conservative.

However, growth of the required absolute amplitude with size needs a restriction such as a fixed positive lower bound on \(r_{\min}/r_{\max}\). The general bound \(r_{\min}/\sqrt{r_{\max}}\) does not grow when \(r_{\min}\) stays fixed and \(r_{\max}\) increases.

The companion comparison is numerically consistent **conditional on its separately reviewed inequality**; it is not needed for R.3.

**6. Section 3 decimals — supported. Serialized bound labels — need correction.**

All **45 numeric cells** in the two Section 3 tables passed exact rational interval comparisons in the conservative direction. The worked examples passed separately.

Representative independently computed values, shown here as approximations, are:

| \(w\) | \(G\) at floor | \(G(10^4)\) | \(G_\infty\) |
|---|---:|---:|---:|
| \(0.1\) | 0.243772293255 | 0.997124592328 | 1.062609652246 |
| \(0.05\) | 1.276416940927 | 1.442786557874 | 1.472490601425 |
| \(0.01\) | 1.860342066722 | 1.866776798578 | 1.883137426664 |

The author’s internal rational enclosure directions are correct for the published targets. Its serialization is different: [`dec()`](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_constants.py:129) converts bounds to floating point and rounds to nearest.

For example, `run1.json` stores

```text
G_lo = 0.243772293255
```

but that number exceeds the independently enclosed true value by approximately \(3.66\times10^{-13}\). The stored `kappa_a_lo` likewise rounds above its true value.

Thus the serialized `_lo`/`_up` strings are display approximations, not necessarily directed bounds. This does **not** invalidate the note’s coarser table entries, which were independently checked.

**7. Remaining obstruction, frozen ellipse, limits and physics discipline — mostly supported, with explanatory corrections required.**

The surviving scalar obstruction is indeed

\[
\oint\dot rd^2,
\]

which contains no common-velocity factor. This does not make relative evolution autonomous; common-motion effects have been bounded in this particular balance.

Substituting the rate equation back into \(\oint J\dot J/r\) reproduces the same balance and supplies no new upper estimate. That observation is valid; it does not prove that no other use of the rate equation could help.

For the cited speed-\(0.1\) frozen ellipse, constant \(J\) gives

\[
\oint\dot rd^2=J^2\oint\dot r/r^2=0.
\]

Since its parameters lie in the positive-\(G\) regime, it fails the necessary solution inequality. Its rejection as a solution is therefore supported, independently of its already-known failure of common-motion evolution.

The hand estimate at \(w=0.11\) is correct:

\[
G(0.11,\text{floor})\approx-0.062972214240875.
\]

This concerns the floor-based sufficient certificate; it locates neither an optimal speed threshold nor a boundary for actual histories.

The qualitative assertion that a “near-circular or nearly rigid” history cannot meet the balance is too broad. R.3 allows its required fractional amplitude to approach zero at large size. Likewise, strongly eccentric recurrence is **not excluded**, rather than demonstrated possible.

The proofs use canonical acceleration rows and kinematics. I found no imported observer-level premise or prohibited symmetry/conservation assumption. The mathematical claims are derived necessary conditions, not sampled trajectory findings. General recurrence and existence remain unresolved. The stated complete-solution falsifiers are appropriate.

**(c) Numbered actionable corrections**

1. **IW1 — Restrict the qualitative exclusion claims.** In the lead and [Section 4](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-inverse-weight.md:143), replace the blanket near-circular/nearly-rigid statement with the explicit R.2–R.3 predicates. Qualify amplitude growth by the required separation-ratio restriction. Describe eccentric histories as unexcluded, and say the particular substitution supplies no new upper bound. Recommendation: correct the prose while retaining the theorem inequalities.

2. **IW2 — Correct the comparison above \(w=0.1\).** Remove “Theorem F remains the only result” on \((0.1,0.14]\). State instead that the principal corollary here is certified and presented for \(w\le0.1\). Recommendation: retain that chosen scope; no expanded speed theorem is required to fix the sentence.

3. **IW3 — Clarify numerical output authority.** Explain in the evidence README that serialized decimal fields are nearest-rounded approximations to internal rational bounds and must not themselves be consumed as certified bounds. Preserve the frozen instrument and original outputs. Recommendation: retain the independently verified published tables; any future machine-readable certificate should preserve exact fractions or use directed serialization.

**(d) Overall disposition**

**ACCEPT AFTER CORRECTIONS.**

Theorem R and Corollaries R.1–R.3 are supported at their declared complete-solution, relative-recurrence scope. Every Section 3 decimal is conservative. IW1–IW3 remain necessary before final acceptance of the document and its evidence description. No general periodicity exclusion or repeating solution has been established.

Next possible actions:

1. Apply IW1–IW3 and return the corrected subject/README identities for verification; this should require no change to the mathematical inequalities or frozen run.

