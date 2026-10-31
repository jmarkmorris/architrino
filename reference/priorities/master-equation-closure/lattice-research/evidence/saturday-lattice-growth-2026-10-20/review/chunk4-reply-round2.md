**Disposition: ACCEPT.** TC1–TC4 are resolved. I found no new mathematical defect in the corrections. No files were edited.

**What I read.** I read the corrected [tube note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-growth-2026-10-20-tube.md), `tube_barrier.py`, the current README, the round-1 review and response, and `tb_run1.json`/`.out` in full. I compared the subject against the retained round-1 bytes using `diff -u`.

I also read:

- `AGENTS.md`, the startup router and the review-closure procedure.
- The canonical Master Equation’s transmitter-side weight, per-hit acceleration, interaction-structure note, total causal-hit sum and exclusions.
- The band-envelope, receiver-cubic and summed signed-remainder notes in full; the chart-route note for the comparator definition.
- The cited passages containing B.2–B.3, E.1–E.3, Q1, Q4’s partial derivatives, X3’s substitutions, S.3–S.4, the preparation’s root census and reduction, and the forward note’s chart, continuation and weighted-localization arguments.

`shasum -a 256` and `wc -c` reproduced all supplied digests and byte counts. The frozen output digests also match the README.

**Claim assessments**

1. **TC1 — Supported; resolved.**

   The declared-size hypotheses now supply the domain needed by T.1–T.2. T.3(a) explicitly verifies that domain at its endpoint.

   The comparison-history argument is valid on the translated past. For \(T\le0\), B.2’s proof gives
   \[
   M_n(t+T)\le a^n\tilde\Delta(t)e^{aT},\qquad n\le2.
   \]
   S.3(ii) therefore bounds either signed pair average by \(M_0(t+T)\le\tilde\Delta(t)\le d_*\), and its speed by \(a d_*<3/16\). Together with \(|\alpha|\le A_*\le1/16\), this establishes the **coarse** one-root census and \(1/8\) window before the refined estimate is used.

   Inside that coarse window,
   \[
   |\bar\Phi(T')|\le X\tilde\mu_0d_*s_{1,0}\le Xp_*.
   \]
   The root equation then gives \(|\tau-r|\le\delta_*\). Repeating B.3’s two-case proof with \(L=1-\delta_*>0\) establishes the refined factor \(\mu_*\). There is no circular use of the refined window.

   Item 6 is also correct:
   \[
   s_{1,*}<e^{0.0001},\qquad \mu_*\le1,\qquad
   v_*<\frac3{16}e^{0.0002}
   =0.18753750375\ldots<1.
   \]
   Thus the row constants and \(1/(1-v_*)\) are finite.

   The Q4 internal segments remain within the same bounds: their spatial arguments interpolate between the anchor, receiver-only point and sampled configurations, while their velocity arguments interpolate between zero and bounded source velocities. Hence their ranges are at least \(r-\delta_*\ge(1-\delta_*)r\).

2. **TC2 — Supported; resolved.**

   Section 1 now correctly restricts the five-item inventory to source-row estimates and separately identifies the receiver dependence
   \[
   4Z_5(1-\rho)^{-5},
   \qquad
   6Z_7(1-\rho)^{-7}\rho^2.
   \]
   T.2 correctly replaces the receiver radius by \(A_*\).

   T.5’s revised monotonicity statement is correct: \(\delta_*,\eta_*,s_{1,*},\mu_*,v_*\), row constants and reciprocal range factors are nondecreasing; \(\kappa_*=1-\delta_*\) decreases. The displayed majorants preserve coefficientwise ordering through nonnegative sums and products.

3. **TC3 — Supported; resolved.**

   Both replacements describe bounds from the past-decay envelope, without asserting a growth law for the nonlinear solution. Independent exact multiplication of the declared endpoint bounds gives
   \[
   \mu_*s_{1,*}=0.07258600245,\qquad
   s_{1,*}^2=0.006263614449.
   \]
   Their reciprocals are \(13.77676\ldots\) and \(159.65223\ldots\). “About a fourteenth and a hundred-and-sixtieth” is accurate. These compare **upper bounds on components**, not measured component amplitudes.

4. **TC4 — Supported; resolved.**

   The README accurately identifies `T_C_upper` and `gain_over_T_C` as comparisons with the chart-route endpoint at seed size \(0.0334\). Independently,
   \[
   \frac{\ln(0.043/0.0334)}{2.8033}=0.09012385963\ldots,
   \]
   whereas the receiver-cubic comparison is
   \[
   \frac{\ln(0.043/0.033)}{2.8033}=0.09442177228\ldots.
   \]
   The frozen fields and the theorem’s separate \(0.0944\) bound are consistent.

5. **No other subject changes — Supported within the supplied comparison scope.**

   `diff -u` shows six hunks, all implementing TC1–TC3. No unrelated inequality, constant, table entry or claim grade changed. The instrument matches its supplied unchanged digest. No round-1 README snapshot was supplied, so the README assessment concerns its current content and TC4 note, rather than an independently established complete README change history.

**Independent numerical reconstruction.** All computations used stdin scripts with `/Users/markmorris/vibe/.venv/bin/python -B`; none imported or executed the author’s instruments. My separate polynomial implementation passed the hand-worked per-offset values \(78\) and \(51\) before target evaluation.

| Check | Independently reconstructed value |
|---|---:|
| \(A_*\) | \(0.0550185\), exact |
| \(p_*\) | \(0.00386065773545985\), exact |
| \(\delta_*\) | \(0.05887915773545985\), exact |
| Declared \(v_*\) | \(0.0088183655797761102189\), exact |
| \(C_LF_{\rm tube}(0.043,0.0120185)\) | \(0.0117167944519690913\ldots\) |
| Barrier slack | \(0.0003017055480309087\ldots\) |
| Certificate maximum at \(d=0.0449\) | \(-0.00001021646048876583\ldots\) |

All three smaller ladder barriers, start conditions, displayed time and growth inequalities, row constants and all-label bounds reproduce. Separate lattice enumeration with analytic tails also supports the declared exponential sums, \(H_{1111}\) enclosure and \(Z_7\) bound.

These are conditional derivations from the accepted seed, contour, inverse and continuation results, with interval-library rounding assumed. KC3–KC4 remain sampled implementation checks; the general ordering follows from the mathematical argument. The \(0.0449\) obstruction concerns this sufficient estimate. Nothing here establishes measured solution trajectories, growth uniform as \(\varepsilon\to0\), order-one evolution or wake-speed arrival.

**Actionable corrections: none.**

1. **Recommendation — Accept these pinned chunk-4 bytes and close TC1–TC4**, because the revised proofs, numerical statements and evidence labels withstand independent reconstruction.

