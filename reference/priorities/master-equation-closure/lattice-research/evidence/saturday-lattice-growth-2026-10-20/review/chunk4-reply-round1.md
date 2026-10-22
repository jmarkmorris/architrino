**Disposition: ACCEPT AFTER CORRECTIONS.** The barrier at seed size \(0.043\), all three ladder pairs, the growth bounds and the \(0.0449\) obstruction reproduce independently. The principal mathematical correction is to state the admissible tube-size hypotheses explicitly in Lemma T.1 and Proposition T.2. Section 1 also omits the receiver-field radius dependence from its inventory.

I made no edits. All computations used stdin scripts with `/Users/markmorris/vibe/.venv/bin/python -B`; none imported or executed the author’s instruments.

**Reading and verification scope.**

I read:

- `AGENTS.md`, the startup router and the theorem-review skill’s live owner.
- The four requested canonical Master Equation passages, including the interaction-structure note and the zero-delay exclusion.
- The tube subject, `tube_barrier.py`, `tb_run1.json` and `tb_run1.out` in full, and the README’s complete chunk-4 section.
- The band-envelope subject, including B.2, B.3 and its proof, B.5, B.7 and B.8.
- The receiver-cubic subject, including R.1’s complete proof and R.2’s constants.
- The October 18 summed signed-remainder subject in full.
- E.1–E.3 and their proofs; Q1 and Q4’s partial-derivative argument; X3’s substitutions; S.3–S.4; the forward-evolution chart facts, Lemma 1, Theorem 1, maximal-continuation remark and qualitative weighted-continuation argument; and the preparation’s root census and equation reduction.

A read-only `hashlib.sha256` audit reproduced every supplied full digest and byte count, including the two earlier subjects and `band_barrier.py`.

My independent polynomial implementation first passed hand-computed per-offset cases: odd bound \(78\), bracket bound \(51\), with unit auxiliary constants. Separate interval-summation checks first passed known lattice-shell counts. Numerical conclusions below remain conditional on the accepted seed/contour and inverse estimates and on interval-library rounding; they are not measurements on solutions.

**1. Section 1’s dependency inventory — needs correction; transmitter-only row dependence — supported.**

The five listed dependencies account for the **source-row estimates**, but not literally every radius occurrence in E.2 and L.4. E.2 separately uses

\[
c_{E3}(\rho)=4Z_5(1-\rho)^{-5},
\]

and L.4 inherits that receiver term. Its receiver-cubic replacement likewise has a radius-dependent fifth-order remainder. Proposition T.2 correctly handles this dependence through \(A_*\), so this omission does not invalidate the endpoint calculation.

I found no additional receiver-velocity multiplier hidden in the source estimates. The canonical row is

\[
\Psi(R,v)=\frac{R}{|R|^2(|R|-R\cdot v)},
\]

where \(v\) is the **source velocity at emission**. Receiver speed remains relevant to chart admissibility, continuation and own-path root exclusion; it does not enter these instantaneous row-derivative bounds.

**2. Lemma T.1 — supported on the intended admissible tubes; its general statement needs correction.**

The displacement and delay argument reconstructs as follows:

\[
|\alpha|\le dX+yX^2\le A_*X.
\]

The accepted chart initially places the actual emission in the \(1/8\) window. B.3 and the correction norm then give

\[
|p|\le X\left(\mu_0d_*s_{1,0}+y_*s_{1,0}^2\right)=Xp_*,
\qquad
|\tau-r|\le|\alpha|+|p|\le\delta_*.
\]

Provided \(\delta_*<1\), the refined window satisfies

\[
T'\le-(1-\delta_*),\qquad
e^{aT'}\le X e^{\bar a\delta_*}e^{-ar}.
\]

B.3’s two-case proof works with \(L=1-\delta_*\), yielding the stated \(\mu_*\), and hence the stated source-speed bound.

I checked each requested auxiliary configuration:

| Configuration or segment | Independent justification |
|---|---|
| Odd-core segment | \(|\alpha-\theta p|\le|\alpha|+|p|\), and \(|\theta v|\le v_*\), for \(0\le\theta\le1\). |
| Second-difference scaling | Multiplication by \(t\in[-1,1]\) preserves those bounds. |
| Two sample-shift configurations | Both signed pure-seed histories admit the coarse root census, then the same refined delay argument. Their samples and the segment joining them satisfy the tube bounds. |
| Delay-Hessian segment | \(|z_+|\le|\alpha|+|\bar\Phi(s_+)|\le\delta_*\), so \(|\ell+s z_+|\ge r-\delta_*\) for \(|s|\le1\). |
| L.3 segment between source samples | Both endpoints have displacement at most \(p_*\) and velocity at most \(v_*\); convex interpolation preserves these bounds. Intermediate source times remain inside the refined window. |

The additional segments used to establish Q4’s partial derivatives obey the same bound. Thus every required range is at least

\[
r-\delta_*\ge(1-\delta_*)r,
\]

and L.3’s root comparison legitimately uses \(1/(1-v_*)\).

The missing qualification is substantive: T.1’s written hypotheses bound the **actual solution**, but permit arbitrarily loose choices of \(d_*,y_*\). They do not imply the \(A_*\le1/16\), \(\delta_*<1\) and \(v_*<1\) conditions subsequently used. For example, \(d_*=0.99,\ y_*=0.01\) is not excluded by the written hypotheses, but makes T.2’s receiver coefficient undefined. All four declared tubes satisfy suitable additional hypotheses.

**3. Proposition T.2 — supported after that domain correction.**

Every Q1/L.1 row constant increases with the velocity bound: \(1/(1-v)\) and \((1-v^2)^{-1/2}\) increase, and their displayed combinations have positive coefficients. The L.2–L.3 formulas then preserve this ordering.

The receiver substitution also reconstructs:

\[
|E|\le c_3X^3A^3+
6Z_7(1-A_*)^{-7}X^5A^5
\le
X^2\left[c_3+6Z_7(1-A_*)^{-7}A_*^2\right]A^3.
\]

Nonnegativity follows directly from the displayed majorants, independently of the instrument’s sign check. Expansion gives only quadratic and cubic monomials.

I separately reconstructed R.1’s symmetry reduction and norm bound. An independent cube-and-tail interval calculation gave

\[
H_{1111}^{(40)}=-85.88597769073091688958\ldots,
\qquad
Z_7<7.467059519580139,
\]

supporting the receiver inputs used here.

**Independent endpoint reconstruction.**

Using the declared decimal bounds as exact rationals gives:

| Quantity | Independently reconstructed value |
|---|---:|
| \(A_*\) | \(0.0550185\), exact |
| \(p_*\) | \(0.00386065773545985\), exact |
| \(\delta_*\) | \(0.05887915773545985\), exact |
| \(\kappa_*\) | \(0.94112084226454015\), exact |
| Declared \(\eta_*\) | \(1.171983\) |
| Declared \(s_{1,*}\) | \(0.079143\) |
| Declared \(\mu_*\) | \(0.91715\) |
| \(v_*\) | \(0.0088183655797761102189\), exact |
| \(c_{20},c_{11},c_{02}\) | \(7.0715,\ 3.0537,\ 2.0539\) |
| \(c_{30},c_{21},c_{12},c_{03}\) | \(34.5516,\ 20.3764,\ 12.3234,\ 6.2164\) |
| Receiver coefficient before decimal ceiling | \(14.54843720832559\ldots\) |
| Declared receiver coefficient | \(14.549\) |

For reproducibility, the rounding order matters: Q1’s auxiliary \(\mathsf m\) is first rounded upward to six decimal places; L.1 then uses its five-place upward rounding. Independently following that order reproduces every tabulated row constant.

I expanded L.2 and L.3 separately and summed their monomials using the stated lattice-sum rules. At the endpoint:

| Contribution to \(C_LF_{\rm tube}\) | Independent value |
|---|---:|
| Receiver | \(0.001522440277985353966\ldots\) |
| Source-difference brackets | \(0.002991664462777556596\ldots\) |
| Half odd sum | \(0.007202689711206180742\ldots\) |
| **Total** | **\(0.01171679445196909130\ldots\)** |

Thus the claimed \(0.0117168\) upper bound holds, with slack

\[
y_*-C_LF_{\rm tube}
=0.00030170554803090870\ldots.
\]

The half odd sum contributes approximately \(61.47\%\), supporting the stated \(61.5\%\).

**4. Theorem T.3 — supported, conditional on the corrected lemmas and accepted continuation results.**

Conditions (a)–(c) independently pass:

\[
A_*=0.0550185<1/16,\qquad
\bar a(d_*+2y_*)=0.1806848261<3/16.
\]

At the start,

\[
31.9d_0^2=0.000012866929119,
\]

whereas the endpoint-fixed polynomial gives

\[
C_LF_{\rm tube}(d_0,31.9d_0^2)
=0.0000003354086459654403\ldots.
\]

Both start sizes lie within the endpoint tube. Concavity excludes the interval between \(6.5\tilde\Delta(0)^2\) and \(31.9\tilde\Delta(0)^2\). The nonnegative-coefficient scaling and first-crossing contradiction then apply with **fixed endpoint constants throughout**; there is no circular re-evaluation of constants at an unknown solution size.

The separate ladder calculations give:

| \(d_*\) | \(K\) | Independent \(C_LF_{\rm tube}\) | \(Kd_*^2\) |
|---:|---:|---:|---:|
| \(0.030\) | \(3\) | \(0.0026551501987852153\ldots\) | \(0.0027\) |
| \(0.035\) | \(4\) | \(0.0046803833220002133\ldots\) | \(0.0049\) |
| \(0.040\) | \(5\) | \(0.0079670730369977125\ldots\) | \(0.008\) |
| \(0.043\) | \(6.5\) | \(0.0117167944519690913\ldots\) | \(0.0120185\) |

Their chart caps, start inequalities and start containment also pass independently.

Items 1–4 follow with the stated scope: the same complete-past solution continues, derivative bounds have the stated norm factors, root counts remain unchanged, and spatial localization is qualitative. The exact endpoint quantities underlying item 3 are

\[
\begin{aligned}
\text{acceleration bound}&=0.66162001370466,\\
\text{transmitter-factor floor}&=0.8193151739,\\
\text{separation floor}&=0.889963,\\
\text{delay-deviation bound}&=0.110037.
\end{aligned}
\]

All displayed outward roundings are valid.

For item 5, independent logarithmic evaluation gives

\[
T_U-\tilde T=0.1225246788000558\ldots,
\qquad
T_U-\hat T=0.0944217722780588\ldots.
\]

The minimum gain over \(T_N\) is \(0.2520583333898693\ldots\), at \(\varepsilon=0.00646\). Its derivative with respect to \(\ln(1/\varepsilon)\) is

\[
\frac1{2.8033}-\frac1{2.8953}
=0.0113350823587186\ldots>0.
\]

Every printed inequality in the time table passed independent interval comparison.

**5. Proposition T.4 — supported.**

The endpoint lower bound is exactly the stated expression

\[
p_0(d_*/0.0983)^\beta\varepsilon^{1-\beta}-6.5d_*^2,
\qquad
\beta=\frac{2.7872}{2.8033}<1.
\]

It increases with \(\varepsilon\). At \(10^{-37}\), it equals

\[
0.008540511531668656\ldots>0,
\]

so positivity on the entire stated interval follows analytically, rather than from sampling amplitudes.

Every outward inequality in the growth table passed independent interval comparison. In particular, at \(\varepsilon=10^{-4}\):

\[
\begin{aligned}
\text{central lower bound}&=0.019788950461862653\ldots,\\
\text{initial upper bound}&=0.0000090852898867,\\
\text{growth-factor lower bound}&=2178.1308806482657\ldots.
\end{aligned}
\]

The time-zero coefficient \(3\) follows from the smallest ladder’s own start argument. At \(d=0.040\), the three independently reconstructed lower bounds are

\[
0.021994664769365438\ldots,\quad
0.021600618201494121\ldots,\quad
0.020827987090235856\ldots.
\]

The loss exponent is \(0.00574323119180965\ldots\); no positive endpoint bound uniform as \(\varepsilon\to0\) follows.

**6. Proposition T.5 — supported for the declared estimate.**

Lowering the tube parameters to their values at \((d,0)\), and the receiver coefficient to the declared \(c_3=14.3469\), gives a coefficientwise lower envelope of this estimate. Here “monotonicity” means that \(\delta,\eta,s_1,\mu,v\) and the reciprocal range factors increase; \(\kappa\) itself decreases.

At \(d=0.0449\),

\[
Y_{\max}=\frac{6648103}{539060000}
=0.012332770007049308\ldots.
\]

My independent expansion gives the lower-envelope certificate polynomial approximately as

\[
\varphi(y)=
-0.007147056358873386
+0.6393865943597811y
-4.810468070670470y^2
-9.014444208y^3.
\]

The computation retained exact fractions and interval endpoints, rather than these displayed rounded coefficients. Its derivative at \(Y_{\max}\) is positive, \(0.5166205860713775\ldots\). Since \(\varphi\) is concave, it increases throughout this interval, so its maximum occurs at the right endpoint:

\[
\max\varphi
=-0.000010216460488765831\ldots
<-1.02\times10^{-5}.
\]

At \(d=0.0448\), the corresponding value is positive,
\(0.00008571503148978110\ldots\), which establishes no barrier for the full estimate.

The extension to every larger admissible \(d\) follows from coefficientwise monotonicity and the shrinking \(y\)-interval. This is an obstruction to **this declared sufficient estimate**, not an obstruction to the solution or to sharper estimates.

**7. Scope and evidence account — supported, with two qualifications.**

The accepted E.1 caps suffice throughout. No enlarged-chart estimate is needed. The complete past is preserved, and no order-one motion, fate, arrival or growth uniform in \(\varepsilon\) is established.

The README correctly identifies KC3 and KC4 as sampled checks. General monotonicity and envelope ordering require the mathematical arguments above. Its description of `all_targets_pass` is accurate: that flag covers ladder/start/chart conditions and positivity at \(10^{-37}\); it does not certify T.5 or the hand proofs.

Two statements need qualification:

- The explanatory claim that the nonlinear “disturbance grows at least at rate \(a\)” is **not supported** by this argument. The proof uses past-decay envelopes; it does not establish monotone exponential growth of the actual nonlinear disturbance.
- The relaxed-cap reach near \(0.047\) remains exploration only. I did not independently reproduce that scratch search, so I do not certify its reported reach.

Next possible actions:

1. **TC1 — State the tube domain.** Add explicit nonnegative size hypotheses and sufficient admissibility conditions to T.1–T.2, such as \(d_*+y_*\le1/16\) and \(\bar a(d_*+2y_*)\le3/16\). Explicitly apply the coarse census and refined-window argument to the signed pure-seed comparison histories. **Recommendation: required**, because the current general statements allow undefined or invalid constants.
2. **TC2 — Correct the radius inventory.** Restrict the five-item inventory to source terms and list the receiver-field radius dependence separately. In T.5, describe monotonicity of \(1/\kappa\), rather than of every tube constant. **Recommendation: required**, because the literal inventory and monotonicity statements are false.
3. **TC3 — Correct the growth explanation.** Replace “the disturbance grows at least at rate \(a\)” with the proved past-decay/envelope statement, and identify \(\mu_*s_{1,*}\) as a bound for the **seed component**. **Recommendation: required**, to avoid attributing an unproved growth law to the nonlinear solution.
4. **TC4 — Resolve the stale comparator.** `tube_barrier.py:171` computes `T_C_upper` using `0.0334`, whereas the receiver-cubic endpoint is `0.033`. Correct it or label it explicitly as a separate exploratory comparator; preserve the frozen run and record any corrected run separately. **Recommendation: required for the evidence record**; the theorem’s stated \(0.0944\) gain is independently correct.

