**Disposition: ACCEPT AFTER CORRECTIONS, conditional on acceptance of chunk 1.** I found no defect in the chunk-2 remainder inequalities, assembly, barrier values, or obstruction certificates. The required corrections concern Proposition G’s scope and the evidence account.

No files were edited. All independent calculations used stdin scripts with `/Users/markmorris/vibe/.venv/bin/python -B`. I did not import or execute the author’s instruments.

**(a) What I read**

I read:

- `AGENTS.md` in full, the startup router, theorem-review procedure, and applicable explanation guidance.
- The canonical Master Equation’s “Per-Hit Acceleration,” “Total Acceleration,” and “Conventions and Exclusions.”
- The barrier note, `odd_barrier.py`, `odd_cubic.py`, companion note, README, and all three supplied run records in full.
- The cited accepted passages: L.2–L.4; S.4; B.2, B.4, B.5, B.7; T.1–T.3; G.1–G.3; H.1–H.4.
- Relevant accepted-instrument formulas and declared constants, without executing them; the chunk-4, chunk-5, and chunk-6 round-2 reviews.
- `explore4.py`, its two run receipts and outputs, and the retained formal-run source.

A `hashlib.sha256`/byte-count audit reproduced the supplied barrier, instrument, and run-output fingerprints. The live companion note and README differed from the requested versions; retained snapshots reproduced both requested fingerprints, so I used those snapshots for the pinned review. The final instrument exactly matches its retained run source by byte comparison.

My independent evaluators passed controls before their numerical targets: a hand polynomial value \(9/8\), lattice counts \(r_3(1),\ldots,r_3(12)\), the hand bracket value \(51\), rest derivative constants, Lambert-\(W\) causal delays for both signs, zero-source cancellation, and a concave polynomial with known maximum.

**(b) Claim assessments**

**1. Window sizes — supported, conditional on the accepted seed and tube results.**

B.2’s positive-residue argument extends to every nonnegative integer number of derivatives: differentiation merely supplies the positive weights \(\lambda_i^n\). Its two time-sign cases give

\[
M_n(t+T')\le
\overline\lambda^{\,n}\rho_Pd\,e^{\underline\lambda T'}.
\]

Combining \(T'\le T-r+\delta_*\), \(T\le0\), and \(\underline\lambda>a\) gives exactly the stated \(\overline\lambda^{\,n}\pi_rX\), including \(n=5\).

The new segments also stay inside the tube. In particular,

\[
\theta\omega+s\bar\zeta
=\frac{s+\theta}{2}\zeta_+
+\frac{s-\theta}{2}\zeta_-,
\]

and the sum of the absolute coefficients is \(\max(|s|,\theta)\le1\). This establishes the spatial and velocity bounds used in \(R_c\); the corresponding radial-expansion segments obey the same argument. No higher derivative of the actual correction is introduced.

**2. Lemma K — supported at derived grade.**

The derivative norm

\[
\lVert\partial^mG\rVert=(m+1)!/\rho^{m+2}
\]

follows by identifying the output contraction with the symmetric \((m+1)\)-st derivative of \(1/\rho\), applying the Legendre bound, and attaining equality radially.

The Gegenbauer identity and resulting bound are correct:

\[
C_m^{(-1/2)}=\frac{P_{m-2}-P_m}{2m-1},
\qquad
\nu_p\le\frac{2(p+1)!}{2p+1}.
\]

Thus \(\nu_4=240/9\) is valid. The sharper earlier constants and the absolute-value Faà di Bruno/Leibniz construction give the displayed majorant. For independent evaluation I used the equivalent closed form

\[
\hat F_j(s)=\frac{j!}{(1-v-s)^{j+1}}.
\]

The reported endpoint constants reproduce. For example, \(c_{40}\) is \(123.401799950375\ldots\) and \(124.532855396568\ldots\) at the two endpoint speeds. The joint-argument subset expansion has the correct multiplicities and range powers.

**3. Lemma R — supported at derived grade; its numerical comparisons remain samples.**

The six residuals telescope to \(\mathcal O_\ell-2C_\ell\) exactly.

- \(R_a\): the even-difference Taylor remainder supplies the stated factor \(1/3\).
- \(R_b\): the cubic difference has three slots, cancelling its prefactor \(1/3\).
- \(R_c\): the displacement-of-base-point integral supplies \(2\theta\), whose \(\theta\)-integral is one; the remaining Taylor integral supplies \(1/3\).
- \(R_d\): the signs of \(z_2=\delta_1(P_1,-P_2)\), and both \(\bar\omega\) estimates, are correct.
- \(R_e,R_f\): the delay-sum, square-sum, cube-sum, and fourth-order time-remainder coefficients are correct.

In particular, adding \(e=\omega_R\) to the symmetric radial pair leaves the error

\[
\frac{|e|^2}{r}
+\frac{1.1548}{(\kappa_*r)^2}
\left(|\bar x|^2+\frac{|e|^2}{3}\right)|e|,
\]

which explains the less immediate terms in \(e_\delta\). Combining this with the source-jet errors gives the stated \(\Delta_2\). The identities defining \(\Delta_q\) and \(\Delta_c\) also hold.

The degree statement should be understood as **minimum/asymptotic order**: \(R_a\) has degree four; \(R_b,R_c,R_d\) have degree five; \(R_e,R_f\) contain degrees five **and seven**, through the cubic-in-\(e\) term of \(e_\delta\). Every final term contains a source factor. This preserves all required \(X\)-power and summability arguments.

I independently evaluated the causal-root row and cubic at 70 digits, using numerical differentiation of the canonical row rather than the author’s cubic implementation. The four author configurations gave:

| Offset | Independently evaluated \(\lvert\mathcal O_\ell-2C_\ell\rvert\) |
|---|---:|
| \((1,0,0)\) | \(3.241825129316725\times10^{-7}\) |
| \((1,1,0)\) | \(6.906765637904182\times10^{-9}\) |
| \((1,1,1)\) | \(3.377872739238911\times10^{-9}\) |
| \((2,0,0)\) | \(4.659770164187475\times10^{-11}\) |

These reproduce the recorded differences. I also tested a signed non-axis offset with a two-exponential source and a collinear configuration with receiver displacement \(0.05\). Every individual residual satisfied its corresponding bound, and their vector sum reproduced the total residual. These checks concern prescribed source histories, not nonlinear solution trajectories.

**4. Proposition D and lattice sums — supported, conditional on chunk 1.**

The deviation uses \(M_\ell(A;p+\Delta p)-M_\ell(A;p)\) correctly, including both rate-spread and \(r^2/800\) envelope terms. Its coefficients are nonnegative because expansion retains precisely the monomials containing at least one increment.

The lattice tail construction is valid:

\[
(2m+1)^3-(2m-1)^3=24m^2+2,
\qquad m\le r\le\sqrt3m.
\]

For negative \(k\), using \(\sqrt3m\) for the positive radial power is necessary and is implemented correctly. Across the declared range, the worst first omitted term beyond \(400\) has base-10 logarithm below \(-461.75\), with subsequent ratio below \(0.06284\). Thus the added \(10^{-300}\) safely covers it.

Independent reconstruction gives

\[
L(1,2)=0.529069843258896817\ldots,
\qquad
L(2,2)=0.025240436523306841\ldots,
\]

and reproduces the other displayed comparisons. The prefactors are correctly distinguished: \(\rho_Pe^{\underline\lambda\delta_*}\) for window remainders and \(\rho_P\) for anchor-jet deviations.

**5. Theorem F — supported, conditional on chunk 1 and the accepted assembly.**

All components are present: the receiver field in its original block prescription, both source-difference brackets, the signed cubic, its deviation, and half the residual sum. The factor \(1/2\) occurs in the correct place.

The cubic terms carry \(X^3\), the residuals at least \(X^4\), and the brackets at least \(X^2\). Division by \(X^2\) is therefore valid. Nonnegativity and minimum degree two follow algebraically from the displayed majorants; they need not rest solely on the instrument’s flag.

**6. Theorems B.1 and B.2 — supported, conditional on the stated dependencies.**

My separate evaluator reconstructed the requested decomposition:

| Contribution to \(C_LF_{\rm odd}\) | \((0.053,0.0070225)\) | \((0.064,0.017408)\) |
|---|---:|---:|
| Receiver | 0.001983156462297036 | 0.005045810995341032 |
| Brackets | 0.002850726522462942 | 0.006846463299594468 |
| Main odd term | 0.001398031583975781 | 0.003058479593364769 |
| Deviation | 0.000143418409257740 | 0.000310907505457624 |
| Half remainder | 0.000495390847414374 | 0.001950093849527193 |
| **Total** | **0.006870723825407873** | **0.017211755243285086** |
| **Barrier slack** | **0.000151776174592127** | **0.000196244756714914** |

The additional pairs give \(0.005507679831809158\ldots<0.005625\) and \(0.012586719947295163\ldots<0.0135\).

All four pairs satisfy the caps, tube conditions, both start inequalities, and start-size inclusion. For the two principal pairs the reconstructed tube values include

\[
(\delta_*,v_*)=
(0.06471127695003225,\ 0.010783582686325979\ldots),
\]

and

\[
(\delta_0,\delta_*,v_*)=
(0.164741333333333333\ldots,\ 0.087840818877431808,\ 0.014260783820132075\ldots).
\]

The all-label quantities reproduce, including accelerations \(0.5890898270781\) and \(0.97078865177088\). The inherited first-crossing argument applies with the endpoint constants fixed.

The independently reconstructed gains are

\[
0.042858171384462329\ldots,\qquad
0.074069619654779903\ldots,
\]

and \(T_O-T_N=0.326646068508679063\ldots\) at \(\varepsilon=0.00646\). Every displayed rounding is valid.

**7. Proposition G — numerical and asymptotic formulas supported; the necessity/spectral-width explanation needs correction.**

Every growth-table inequality reproduces. In particular, at \(\varepsilon=10^{-4}\),

\[
|u_0(T_O)|\ge0.032134980967510782\ldots,
\]

with initial bound \(9.085217415025\times10^{-6}\), giving factor \(3537.062405833725\ldots\).

At \(10^{-37}\), the two endpoint lower bounds are \(0.018287265198798231\ldots\) and \(0.013121650063259584\ldots\). Analytic monotonicity establishes positivity over the stated amplitude interval.

The small-amplitude optimized values reproduce:

| \(\varepsilon\) | Seed size used, approximately | Central lower bound |
|---|---:|---:|
| \(10^{-60}\) | 0.053 | 0.011649627265340124 |
| \(10^{-100}\) | 0.041336828256797823 | 0.004321185117962505 |
| \(10^{-200}\) | 0.011099250830180605 | 0.000311541497321660 |
| \(10^{-300}\) | 0.002980232741272445 | 0.000022460992043587 |

Differentiating \(c\varepsilon^{1-\beta}d^\beta-Kd^2\) gives the claimed optimizing scale and exponents:

\[
\beta=0.994256768808190347\ldots,\qquad
\frac{2(1-\beta)}{2-\beta}=0.011420869688586224\ldots.
\]

The growth-factor exponent is \(-0.988579130311413776\ldots\).

However, an enclosing interval of positive width does **not** prove that the actual rates on every seed’s support have positive width. Also, reducing the correction allowance alone cannot make this particular lower envelope uniform within a fixed bounded chart: even with zero correction, its supremum is bounded by \(cD^\beta\varepsilon^{1-\beta}\to0\). The conclusion should be restricted to the selected envelopes and estimate.

**8. Proposition H — supported as an obstruction to this estimate.**

The lower envelope correctly drops the nonnegative deviation and residual and retains the prescribed bracket and receiver envelopes.

Independent cubic maximization gives:

| Case | Maximizer \(y\) | Maximum of the lower-envelope barrier function |
|---|---:|---:|
| Accepted chart, \(d=0.0558\) | 0.0067 | \(-0.000082304363165647252\ldots\) |
| All charts, \(d=0.0805\) | 0.049395780412877268… | \(-0.000015690222922250141\ldots\) |

These support both certificates and their monotone extension.

The printed \(0.0558\) threshold alone gives a \(5.0179\%\) relative gap. I additionally checked \(d=0.05578\), obtaining maximum \(-0.000062602935736168\ldots\), which does support the strict “within five percent” statement. Adding that tighter certificate, or saying “about five percent,” would make its justification explicit.

**9. Comparison and evidence scope — comparison supported; evidence wording needs correction.**

The accepted-endpoint totals reproduce:

\[
C_LF_{\rm odd}=0.006311479075496134\ldots,\qquad
C_LF_{\rm H}=0.010793849338366968\ldots,
\]

a reduction of \(41.5271\%\). The accepted estimates at the two new endpoints reproduce as \(0.012466365725354242\ldots\) and \(0.031270875373251297\ldots\).

The receipts support the disclosed failed exploration, successful exploration, and subsequent formal run. They do not establish the complete pre-run edit history. Moreover, `explore4.py` uses \(K=m/4\), a **quarter-grid**, not the README’s half-grid.

The “50-digit remainder comparison” description is overstated: `odd_direct` converts its result to `float`, and chunk 2 computes the cubic, subtraction, norm, and bound using floating arithmetic. The source-row calculation uses 50-digit arithmetic internally; the final comparison does not retain 50-digit precision.

The packet correctly excludes claims of measured nonlinear displacements, order-one motion, physical endings, and wake-speed arrival. Its thresholds concern sufficient estimates.

**(c) Actionable corrections**

Next possible actions:

1. **○ Not done — OB-G: Restrict Proposition G’s obstruction explanation.** Recommended: replace the unsupported actual-spectral-width assertion with the established difference between the selected envelope rates. Explain that changing the correction allowance alone does not remove the fixed-chart \(\varepsilon^{1-\beta}\) loss.

2. **○ Not done — OB-E: Correct precision and history descriptions.** Recommended: describe KC4 as a sampled floating comparison using an internally 50-digit root/row calculation. Restrict “exact arithmetic” to the applicable polynomial/interval targets and “no history evaluated” to nonlinear solution histories. Preserve frozen outputs.

3. **○ Not done — OB-C: Make chronology claims evidence-bounded.** Recommended: state that controls precede the **formal barrier target loop**, while exploration used the functions earlier; change “half-grid” to “quarter-grid”; qualify the unsnapshotted pre-run edit account as author-reported. These corrections preserve the independently supported mathematical results.