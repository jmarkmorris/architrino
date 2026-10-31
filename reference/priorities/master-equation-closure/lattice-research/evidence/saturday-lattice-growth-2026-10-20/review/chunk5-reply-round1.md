**Disposition: ACCEPT AFTER CORRECTIONS.** The enlarged-chart argument and all reported barrier, growth and obstruction numbers reconstruct independently. The main proof correction is to extend the receiver-cubic lemma beyond its stated \(1/16\) domain. The evidence chronology also needs more precise wording.

No files were edited. All computations used stdin scripts with `/Users/markmorris/vibe/.venv/bin/python -B`; none imported or executed the author’s instruments.

**What I read and checked.**

I read the subject, `tube_chart.py`, `tc_run1.json` and `tc_run1.out` in full, and the complete README chunk-5 section. A read-only `hashlib.sha256` audit reproduced all supplied byte counts and hashes, including the unchanged `tube_barrier.py` and current tube subject.

The supporting readings included:

- The four requested canonical Master Equation passages.
- The tube subject, T.1–T.5, and chunk-4’s review and response.
- The band-envelope subject, particularly B.2–B.5, B.7 and the certificate argument.
- The receiver-cubic subject and R.1’s complete proof.
- E.1 and its proof; the forward-evolution chart facts, Lemma 1, Theorem 1, maximal-continuation remark and weighted-continuation argument.
- The preparation’s reduction and series inverse; Q3’s proof; X3’s substitutions.
- The summed signed-remainder formulas L.1–L.4 and their implementations.
- The retained run-source snapshots, scratch exploration source/output, and scratch/formal supervisor receipts.

My independent reference first passed hand-computed per-offset cases—odd bound \(78\), bracket bound \(21/20\)—and elementary exponential, logarithmic, summation and concave-maximum controls. Receiver-sum checks first passed known shell counts and the nearest-shell value \(-84\).

**1. Lemma G.1 — supported, at derived grade for the stated complete-past family.**

I found no indispensable use of \(1/16\), \(3/16\), \(13/16\), \(7/8\), or \(a\le3\) in the generalized argument.

- **Finiteness:** the accepted correction controls the remote past; uniform chart bounds and the contour seed control the compact interval \([0,t]\).
- **Continuity:** the forward Lemma 1 supplies joint Lipschitz dependence uniformly in the member. Together with bounded seed third derivatives, this makes the component maximum defining \(y(t)\) continuous.
- **Reduction:** the resting and receiver-linear block cancellations are independent of chart size. The remaining sums converge absolutely through past decay.
- **Finite forcing norm:** this requires an extension of Q3/X3’s proof, rather than application of their small-radius statements verbatim. That extension works.

For the last point, put
\[
M=\|\tilde u^t\|_a\le \|\varepsilon\phi^t\|_a+4y(t)<\infty,
\qquad \kappa=1-2\rho_c>0.
\]
Use Q1’s constants at speed \(\varpi_c<1\), and the source window \(2\rho_c\). Every Q3 remainder product then has a bound proportional to \(M^2e^{2aT}\), with summable factors \(e^{-ar}/r^p\) or \(e^{-2ar}/r^p\). The receiver remainder has the same rate using its quadratic Taylor bound. Thus
\[
\|\mathcal N[\tilde u^t]\|_{0,2a}<\infty.
\]
Smallness of \(M\) is unnecessary once the chart is supplied separately.

The series inverse depends on \(a,g,\mathcal K\), not the nonlinear chart. Its accepted \(C_L\) therefore remains applicable.

The general root census and continuation theorem also apply: \(D\ge1-\varpi_c\), separations are at least \(1-2\rho_c\), and strict subwake speed excludes positive-delay own-path roots. The canonical zero-delay exclusion is preserved.

**2. Lemma G.2 — source-window argument supported; receiver substitution needs correction.**

The two-stage delay argument is valid:
\[
|\tau-r|\le A_*+\rho_c=\delta_0,
\]
then B.3’s two-case proof with \(L=1-\delta_0\) gives
\[
|p|\le X\left(\mu_0d_*s_{1,0}+y_*s_{1,0}^2\right)=Xp_*,
\]
and hence
\[
|\tau-r|\le A_*+p_*=\delta_*.
\]
Repeating B.3 with \(L=1-\delta_*\) gives the refined factors and source-speed bound.

The comparison histories have displacement at most \(d_*\) and speed at most \(\bar a d_*\). They admit the coarse census first, followed by the same refined window. The required Taylor segments preserve the stated range and velocity bounds.

The sufficient condition
\[
\varpi_ce^{0.0002}<1
\]
does establish \(v_*<1\), and comfortably covers the declared chart.

However, **R.1 is stated only for \(\rho\le1/16\)**, and T.2’s receiver proof explicitly invokes that restriction. Here
\[
A_*=0.067041375>1/16.
\]
Consequently, G.2’s claim that the remaining proof does not refer to the caps is inaccurate.

This is repairable without changing any number: R.1’s proof extends to every \(|\alpha|\le\rho<1\). Its segment bound becomes
\[
|d+\theta\alpha|\ge(1-\rho)r;
\]
the derivative estimate, absolute convergence, parity cancellation and cubic symmetry argument remain valid. State that extension explicitly.

**3. Theorem G.3 — numerical claims supported; theorem supported after that domain correction.**

The independent reconstruction gives:

| Quantity | Reconstructed value |
|---|---:|
| \(A_*\) | \(0.067041375\), exact |
| \(\delta_0\) | \(0.150374708333333333\ldots\) |
| Declared \(\eta_0,s_{1,0},\mu_0\) | \(1.499760,\ 0.101278,\ 0.92489\) |
| \(p_*\) | \(0.0045663996133791255\), exact |
| \(\delta_*\) | \(0.0716077746133791255\), exact |
| \(\kappa_*\) | \(0.9283922253866208745\), exact |
| Declared \(\eta_*,s_{1,*},\mu_*\) | \(1.212889,\ 0.081906,\ 0.91822\) |
| \(v_*\) | \(0.0101687382555408313587\), exact |
| Declared receiver coefficient | \(14.675\) |
| \(c_{20},c_{11},c_{02}\) | \(7.0827,\ 3.0621,\ 2.0623\) |
| \(c_{30},c_{21},c_{12},c_{03}\) | \(34.6137,\ 20.4353,\ 12.3741,\ 6.2504\) |

For example, the exact rational source-displacement calculation is
\[
p_*=0.92489(0.0465)(0.101278)
 +0.020541375(0.101278)^2.
\]

I independently expanded L.2 and L.3 and summed their monomials using the stated lattice majorants. The endpoint contributions are:

| Contribution to \(C_LF_{\rm tube}\) | Independent value |
|---|---:|
| Receiver | \(0.002778354977698098182\ldots\) |
| Brackets | \(0.005296478137592013143\ldots\) |
| Half odd sum | \(0.012354154288913635760\ldots\) |
| **Total** | **\(0.020428987404203747085\ldots\)** |

Thus
\[
C_LF_{\rm tube}<0.0204290<0.020541375,
\]
with slack \(0.000112387595796252915\ldots\).

Conditions (a)–(c) pass. At the start,
\[
31.9d_0^2=0.000012866929119,
\qquad
C_LF_{\rm tube}(d_0,31.9d_0^2)
=0.000000359573957157765\ldots.
\]
The start sizes lie inside the endpoint tube. Nonnegative-coefficient scaling and concavity establish the smaller initial barrier; fixed endpoint constants then support the first-crossing argument.

The ladder independently gives:

| \(d_*\) | \(K\) | \(C_LF_{\rm tube}\) | \(Kd_*^2\) |
|---:|---:|---:|---:|
| \(0.040\) | \(5\) | \(0.007969980798488406\ldots\) | \(0.008\) |
| \(0.043\) | \(6.5\) | \(0.011726800405675367\ldots\) | \(0.0120185\) |

Their caps, start inequalities and containment conditions also pass.

Items 1–5 have the claimed scope. The exact endpoint bounds underlying item 3 are
\[
\begin{aligned}
\text{displacement}&\le0.067041375,\\
\text{speed}&\le0.236061786075,\\
\text{acceleration}&\le0.934708806830895,\\
D&\ge0.763938213925,\\
\text{separation}&\ge0.86591725,\\
|\tau-r|&\le0.13408275.
\end{aligned}
\]
Every printed rounding is outward.

Independent logarithmic bounds give
\[
T_V-T_U=0.027914314165358043889\ldots,
\]
and, at \(\varepsilon=0.00646\),
\[
T_V-T_N=0.279972647555227342769\ldots.
\]
The latter increases with \(\ln(1/\varepsilon)\), since its coefficient is \(1/2.8033-1/2.8953>0\).

Every inequality in the growth table passed independent rational enclosure. In particular, at \(10^{-4}\):
\[
T_V=3.0185027137360869\ldots,\qquad
G=0.0138395990021103139\ldots,
\]
and the growth-factor lower bound is \(1523.297459376631\ldots\).

The endpoint expression is
\[
G(\varepsilon)=
0.0763(0.0465/0.0983)^\beta
\varepsilon^{1-\beta}-0.020541375,
\qquad \beta=2.7872/2.8033<1.
\]
It increases with \(\varepsilon\). At \(10^{-37}\),
\[
G=0.001681054987807125115\ldots,
\]
so positivity throughout the stated interval follows analytically, not by sampling amplitudes.

The time-zero coefficient \(3\) is supported by the smallest tube ladder’s own start argument and uniqueness of the unchanged complete past.

**4. Proposition G.4 — supported for this declared estimate.**

The lower envelope is coefficientwise valid: \(\delta_*\ge d\), while increasing delay increases \(\eta,s_1,\mu\), reciprocal range factors and the resulting row constants. Dropping source displacement and correction from the parameter sizes lowers the coefficients. Here the receiver floor is the estimate’s **declared** coefficient \(14.3469\).

The admissible speed condition implies
\[
y<(1/\bar a-d)/2.
\]
At \(d=0.0526\), its upper endpoint is
\[
0.159208106704262976292\ldots.
\]

My independently reconstructed certificate polynomial is approximately
\[
\varphi(y)=
-0.0114248597542219417904
+0.516782649893369802715y
-5.453210286885006488y^2
-9.014444208y^3.
\]
Certification retained rational bounds, not these displayed rounded coefficients. The unique maximum occurs near
\[
y=0.0428339421035224514065,
\]
with certified upper bound
\[
-0.00000272068774092760618250
<-2.72\times10^{-6}.
\]
Coefficientwise monotonicity and the shrinking admissible interval extend the obstruction to larger admissible \(d\).

This is a coarse obstruction to the declared sufficient estimate. It establishes neither a solution obstruction nor an optimal threshold.

**5. Scope and evidence chronology — supported with qualifications.**

The same complete-past solution continues; the chart caps are a declared choice; spatial localization remains qualitative. No order-one motion, fate, arrival, or growth uniform in \(\varepsilon\) follows. The loss exponent is \(0.00574323119180965\ldots>0\).

An independent cube-and-tail receiver calculation also supports the inherited receiver inputs: it gives \(H_{1111}^{(40)}=-85.8859776907309\ldots\), tail allowance \(0.195\), and \(Z_7<7.467059519580139\).

The formal run’s source and output show KC1–KC3 before its formal target loop. Snapshot byte comparison confirms that the reviewed chart and tube instruments match their retained run sources. KC2 and KC3 are sampled comparisons, not independent proofs of general monotonicity.

The broader “before any target” wording needs correction. Inspection of `scratch_explore7.py:13–14` shows calls to `tube_params_chart` and `F_sgn`; its retained output includes all three eventual ladder configurations, including \((0.0465,9.5)\), before the formal run. It did not invoke `main()`, but it did evaluate the target formulas and configurations.

The receipts corroborate the exploration preceding the formal run, and the run snapshot contains the final pair. The claimed earlier declaration \((0.046,8.5)\) is an author-recorded history that I could not independently reconstruct from a retained pre-change source snapshot.

Next possible actions:

1. **GC1 — Extend the receiver lemma explicitly. Recommendation: required.** In [G.2’s proof](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-tube-chart.md:39), establish R.1 for \(\rho<1\), or at least \(\rho<1/2\), before invoking T.2 at \(A_*>1/16\). The proof extends and the numbers remain valid.

2. **GC2 — Qualify residual chart dependence. Recommendation: required.** Correct the [opening account](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-tube-chart.md:5): the generalized constants retain chart-radius dependence through \(\delta_0=A_*+\rho_c\), then \(p_*\) and the refined parameters.

3. **GC3 — Correct the chronology wording. Recommendation: required.** Qualify [“before any target”](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-tube-chart.md:84) and the [README account](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-growth-2026-10-20/README.md:141): controls preceded the formal target loop, while exploratory evaluations of the same configurations preceded those controls. Preserve the frozen evidence and distinguish that fact from merely not invoking `main()`.