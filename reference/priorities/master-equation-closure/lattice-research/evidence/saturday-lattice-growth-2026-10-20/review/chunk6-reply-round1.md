**Disposition: ACCEPT AFTER CORRECTIONS.** All seven derivative inequalities, four declared barrier pairs, growth-table entries and two obstruction certificates are supported. One signed identity in the proof needs a minor correction; it does not affect any bound or numerical conclusion.

No files were edited. All computations used the shared venv, scripts supplied on stdin, and no imports from the author’s instruments.

**(a) Reading and verification coverage**

I read:

- `AGENTS.md` in full, the startup router and theorem-review procedure.
- The canonical Master Equation’s “Per-Hit Acceleration,” “Total Acceleration,” and “Conventions and Exclusions” passages.
- All five files under review in full: the sharp subject, `sharp_barrier.py`, both run outputs, and the evidence README.
- The tube and larger-chart subjects, including every specified lemma/proposition; the receiver-cubic subject; band-envelope Proposition B.7 and Proposition B.8 and their supporting arguments; quantification Lemma Q1 and Proposition Q4’s partial bounds; signed-remainder Lemmas L.1–L.3 and Theorem L.4.
- Supporting forward-continuation and Lemma E.1 passages, the imported size/summation code, and the retained exploration source and execution receipts.

A read-only `hashlib.sha256` check, first validated against the known hash of `abc`, reproduced every supplied byte count and hash, including both source-note hashes and `tube_chart.py`.

**(b) Claim-by-claim assessment**

**1. Lemma H.1 — supported inequalities; signed proof identity needs correction.**

The canonical acceleration row reduces to the stated \(\Psi\) because \(c_f=1\), the source speed is below one, and consequently \(1-n\cdot v>0\). No receiver-velocity multiplier or additional physical premise enters.

The factorization and velocity derivatives are correct:

\[
\Psi=\frac{n}{\rho^2}f(w),\qquad
w=n\cdot v,\qquad f(w)=(1-w)^{-1},
\]

\[
\partial_v\Psi[k]=\frac{n(n\cdot k)}{\rho^2}f'(w),\qquad
\partial_v^2\Psi[k,l]=\frac{n(n\cdot k)(n\cdot l)}{\rho^2}f''(w).
\]

For the tensor norms, dualizing the vector output gives fully symmetric scalar derivative forms. The repeated-vector norm property therefore applies.

- **\(G\): supported.** The Legendre expansion gives
  \[
  \|D^jG\|=\frac{(j+1)!}{\rho^{j+2}}.
  \]
  Equality is attained in the radial direction. However, the *signed* repeated-vector expression in the proof needs the factor \((-1)^j\), as detailed below.
- **\(P_k\): supported.** Direct differentiation gives
  \[
  D_iD_j\log\rho=\frac{\delta_{ij}-2n_in_j}{\rho^2},
  \]
  proving the stated identity. The logarithm derivative bounds are \(1,2,6\), with the appropriate inverse-range powers. Combining these with
  \[
  \|D\rho^{-2}\|=2\rho^{-3},\qquad
  \|D^2\rho^{-2}\|=6\rho^{-4}
  \]
  gives \(\|P_k\|\le\rho^{-2}\), \(\|DP_k\|\le2\rho^{-3}\), and \(\|D^2P_k\|\le6\rho^{-4}\).
- **\(n\): supported.** The repeated-direction derivatives of \(\rho\), at unit range, are
  \[
  1-c^2,\qquad -3c(1-c^2),\qquad -3(1-c^2)(1-5c^2).
  \]
  Their maximum absolute values are \(1,2/\sqrt3,3\). These establish the three asserted norms of \(Dn,D^2n,D^3n\).

For an independent reconstruction of the scalar chain-rule calculation, suppress inverse-range powers and define

\[
\begin{aligned}
F_0&=D^{-1},&
F_1&=vD^{-2},\\
F_2&=2v^2D^{-3}+s_3vD^{-2},&
F_3&=6v^3D^{-4}+6s_3v^2D^{-3}+3vD^{-2},\\
B_0&=D^{-2},&
B_1&=2vD^{-3},&
B_2&=6v^2D^{-4}+2s_3vD^{-3}.
\end{aligned}
\]

These respectively bound \(f,D_Rf,D_R^2f,D_R^3f,f',D_Rf',D_R^2f'\). The coefficients \(3\) in the third-order chain rule produce the stated \(6s_3v^2D^{-3}\) term.

Leibniz assembly then gives:

| Constant | Independent assembly |
|---|---|
| \(c_{20}\) | \(6F_0+4F_1+F_2\) |
| \(c_{11}\) | \(2B_0+B_1\) |
| \(c_{02}\) | \(2D^{-3}\) |
| \(c_{30}\) | \(24F_0+18F_1+6F_2+F_3\) |
| \(c_{21}\) | \(6B_0+4B_1+B_2\) |
| \(c_{12}\) | \(6D^{-3}+6vD^{-4}\) |
| \(c_{03}\) | \(6D^{-4}\) |

For \(c_{12}\), the required intermediate bound is \(\|D[P_k(n\cdot l)]\|\le3\rho^{-3}\). Every resulting formula agrees with Lemma H.1.

All terms are positive multiples of \(v^p(1-v)^{-q}\), hence nondecreasing on \(0\le v<1\). The rest constants are exactly the declared tuple \((6,2,2,24,6,6,6)\), understood as **bounds**, without asserting that every mixed bound is optimal. The “within five percent” statement is also supported: even at \(v=0.012\), the largest relative excess is approximately \(0.0494753\).

**Independent numerical sample.** I implemented multiaffine automatic differentiation of the original row, without using the factorized derivative formulas or finite differences. Before sampling, it passed all seven axial closed forms at source velocities zero and \(0.2\).

The sample covered 1,400 arguments, varying range, orientation and speed, with speed caps \(0,0.012,0.03,0.1,0.5,0.9,0.99\). Half used repeated directions and half independently drawn directions. Maximum sampled derivative-to-bound ratios, in the requested order, were

\[
(0.985695,\ 0.980306,\ 0.985669,\ 0.973348,\ 0.962061,\ 0.644104,\ 0.978581).
\]

This is a floating-point sample of directional derivatives, **not** a certification of operator norms or unsampled arguments. The analytic argument supports the universal inequalities.

**2. Substitution and coefficient signs — supported.**

Proposition Q4’s relevant partial bounds use only the second derivatives of \(\Psi\). Their replacements remain valid along the tube’s convex Taylor segments because those segments retain the asserted range floor and source-speed bound. Lemma L.2 uses the third derivatives in precisely the corresponding places; Lemma L.3 uses the second derivatives and the unchanged root-difference factor \(1/(1-v_*)\).

Every assembled term is a product or sum of nonnegative majorants. Thus coefficient nonnegativity follows analytically, as well as from my independent polynomial expansion. Lemma L.2 contributes cubic terms; Lemma L.3 contributes terms of degree at least two. The scaling and concavity arguments therefore survive the substitution.

This conclusion uses the tube-segment and source-window premises supplied by T.1/G.2; it does not establish those premises merely from a smaller derivative constant.

**3. Theorem H.2 — supported, conditional on the accepted inputs.**

My independent reconstruction used exact rational polynomial arithmetic and rational Taylor enclosures of exponentials, with analytic tail bounds. Polynomial, summation and concave-maximum controls passed before target evaluation.

For the main endpoint:

\[
\begin{aligned}
p_*&=0.0042010754763645,\\
\delta_*&=0.0622460754763645,\\
v_*&\approx0.009661612715812045.
\end{aligned}
\]

The declared rounded sizes and all seven rounded row constants safely enclose their formulas, including when checked using the displayed speed upper bound \(0.0096617\).

The independent barrier decomposition is:

| Pair | Receiver cubic | Brackets | Half odd sum | Total \(C_LF_H\) |
|---|---:|---:|---:|---:|
| \((0.047,5)\) | 0.001791197541 | 0.002887883700 | 0.006114768098 | **0.010793849338367** |
| \((0.052,8)\) | 0.003702762663 | 0.005800397199 | 0.011854975255 | **0.021358135117719** |

Thus \(0.0107939<0.011045\) is supported. The alternate pair gives

\[
C_LF_H(0.044,0.008712)\approx0.00814513704403049<0.008712.
\]

At \(d_0=0.0006351\),

\[
31.9d_0^2=0.000012866929119.
\]

Using the main endpoint’s frozen constants, the left side of condition (c) is approximately \(2.9497408654\times10^{-7}\), safely below that value. The lower start endpoint also passes, completing the concavity argument.

**4. Theorem H.3 — supported, conditional on the larger-chart extension.**

The independently reconstructed main sizes include

\[
\delta_0=0.156965333333\ldots,\quad
p_*=0.005191147785511168,\quad
\delta_*=0.078823147785511168,
\]

and \(v_*\approx0.011568166556715536\). All declared rounded bounds are safe. The second row of the decomposition above establishes the main barrier.

The alternate pair gives

\[
C_LF_H(0.050,0.01625)\approx0.0157857060874121<0.01625.
\]

The main condition-(c) value is approximately \(3.2220483912\times10^{-7}<31.9d_0^2\). Both start endpoints pass.

The receiver-lemma extension is valid: the Taylor segment remains separated from the origin for receiver displacement below one half, absolute convergence preserves the parity cancellation, and the cubic tensor is unchanged. H.3 nevertheless retains its stated dependence on the larger-chart continuation/reduction argument; this review does not confer a separate acceptance disposition on chunk 5.

The main all-label arithmetic is:

| Quantity | H.2 | H.3 |
|---|---:|---:|
| Displacement upper bound | 0.058045 | 0.073632 |
| Speed upper bound | 0.186218277 | 0.2567650592 |
| Acceleration upper bound | 0.6623900657662 | 1.00635633944352 |
| Transmitter-factor lower bound | 0.813781723 | 0.7432349408 |
| Separation lower bound | 0.88391 | 0.852736 |
| Delay-deviation upper bound | 0.11609 | 0.147264 |

These verify the caps and every outward-rounded all-label claim.

The independently evaluated time differences are

\[
T_H-T_U\approx0.0317295637343,
\]

and, at \(\varepsilon=0.00646\),

\[
T_H-T_N\approx0.2837878971242,\qquad
T_{H'}-T_N\approx0.3198511500302.
\]

Their dependence on \(\ln(1/\varepsilon)\) has positive coefficient \(0.0113350823587\ldots\). The claimed uniform lower gains over the admitted amplitude range follow.

**5. Growth table and time-zero coefficient — supported.**

I independently checked every displayed time, central-displacement and growth-factor lower bound using rational exponential comparisons.

The formula used was

\[
L_{d,K}(\varepsilon)
=\varepsilon p_0
\left(\frac d{0.0983\varepsilon}\right)^{2.7872/2.8033}
-Kd^2.
\]

At \(\varepsilon=10^{-4}\), the independently reconstructed central bounds are

\[
0.02370352738275\ldots,\qquad
0.01679086373364\ldots,
\]

with growth factors \(2608.95904556\ldots\) and \(1848.10788341\ldots\).

At \(10^{-37}\), they are

\[
0.0114150011883097\ldots,\qquad
0.00320293920792796\ldots.
\]

The printed lower bounds are safe, including the relatively close rounding of \(0.011415\).

The coefficient \(4.5\) at time zero is justified by the passing \((0.044,4.5)\) start argument. It need not equal the final endpoint coefficient. Monotonicity in \(\varepsilon\) follows from \(1-2.7872/2.8033>0\).

**6. Proposition H.4 — supported as an obstruction to this estimate.**

The lower envelopes correctly use the exact H.1 formulas at the lower source speed. Importantly, these are lower envelopes of the **declared majorant polynomial**, not lower bounds on actual acceleration or motion.

My independent rational certificates give:

| Case | Allowed \(y\) ceiling | Maximizer location | Certified maximum upper bound, approximately |
|---|---:|---:|---:|
| Accepted chart, \(d=0.0482\) | 0.01068277000705 | Right endpoint | \(-8.34964777946\times10^{-6}\) |
| All charts, \(d=0.0592\) | 0.15590810670426 | 0.04559494875196 | \(-1.23566735233\times10^{-4}\) |

Both stated negative thresholds are supported. The first envelope uses delay \(d+0.92274\,d\,0.09459\); the second uses delay \(d\).

The extension to larger \(d\) is justified: envelope coefficients are nondecreasing, while the allowed \(y\)-interval shrinks. Consequently the maximum cannot increase. No sampled grid is needed for that extension.

**7. Scope and evidence account — supported, with a provenance limitation.**

The continuation arguments concern the same complete-past solution. The four pairs are passing choices; no optimality follows. The certificates exclude barriers for this particular majorant, and do not exclude continued regular evolution.

The central lower bound tends to \(-Kd^2\) as \(\varepsilon\to0\). It therefore establishes neither growth uniform in \(\varepsilon\), order-one motion, an ending, nor wake-speed arrival.

The original finite-difference check samples **five** derivative types; the README accurately lists those five and calls it a sample. Its truncation and roundoff errors are not enclosed. My independent sample additionally tested \(c_{02}\) and \(c_{03}\).

The source and execution receipts corroborate exploration before the formal run and known cases before its target loop. They do not independently establish the precise time the instrument was *written*; that phrase remains author-reported chronology. The final flag’s exclusion of the certificates is accurately disclosed.

The inherited lattice-sum, contour, seed and inverse-norm inputs retain their stated conditionality. I reconstructed their downstream use rather than recertifying the entire earlier interval-computation chain.

**(c) Actionable correction**

1. **HS1 — Correct the signed Legendre identity** in [the H.1 proof, line 36](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-sharp.md:36). For a repeated unit vector \(h\), write
   \[
   \langle h,D^jG[h,\ldots,h]\rangle
   =(-1)^j\frac{(j+1)!}{\rho^{j+2}}P_{j+1}(n\cdot h),
   \]
   or state the absolute-value bound instead. A direct check at \(R=h\), \(j=1\), gives \(-2\), whereas the current signed expression gives \(+2\). The norm, all seven constants, and every numerical conclusion remain valid.

Next possible actions:

1. Apply **HS1** and retain the existing numerical evidence. Recommendation: make this minor proof correction; no barrier or growth-table revision is required.