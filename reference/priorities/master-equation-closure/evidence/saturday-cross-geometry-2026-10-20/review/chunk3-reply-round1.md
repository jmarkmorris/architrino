**Overall disposition: ACCEPT AFTER CORRECTIONS.** The weighted field estimate and method-of-steps argument are supported. The statement needs to distinguish actual arrivals from comparison-path crossings, and Step 6 needs explicit regularity before each member’s arrival, including across an unattained population infimum.

No files were edited.

**(a) What I read**

- The [persistence note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-persistence.md) in full. `shasum -a 256` and `wc -c` returned the supplied hash and 23,355 bytes; the final hash check was unchanged.
- `AGENTS.md` in full, the startup router, and the theorem-review procedure.
- The canonical [Master Equation](/Users/markmorris/vibe/architrino/content/markdown/aaa/dynamics/master-equation.md), specifically causal emission times and the canonical per-hit, total-acceleration, and exclusion passages.
- The accepted [field theorem](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20.md) and [sharpness companion](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-continuation-2026-10-20-sharpness.md), both in full. The field-theorem hash matches the supplied identity.
- The [comparison](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-2026-10-10.md), Section 4 including Theorem 2 and its proof, plus the relevant localized-preparation scope; its [review](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/saturday-cross-geometry-comparison-codex-review-2026-10-10.md), reconstruction, G2, and final disposition.
- [Population delayed summation](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/population-delayed-summation.md) in full.
- The [staggered first-event note](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event.md) and its [adjudication](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/staggered-lattice-first-event-independent-adjudication.md), both in full.
- The [curved-path obstruction](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/curved-path-wake-speed-obstructions.md) and [jump exclusion](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/analysis/curved-path-wake-speed-jump-exclusion.md), both in full.

**(b) Claim decisions and independent reconstruction**

**1. Section 2: uniform field constants — supported.**

The finite-source argument must be uniform over receivers, which it is: windows meeting positive time require
\[
R_j\le T_*+\delta+c_W.
\]
The lattice supplies a common finite bound on their number. Their displacement, velocity, and acceleration bounds follow from (P1), subunit speed, (P2), and (P3), including windows crossing release.

For the remaining windows, (P2) gives a common exponential majorant proportional to
\[
e^{\mu(T_*+\delta+c_W)}e^{-\mu R_j}.
\]
The shell count \(24m^2+2\le26m^2\) therefore controls both light-cone sums uniformly. The stationary-field bounds are also uniform in the receiver label.

The claimed uniform \(\kappa_1\) follows, rather than requiring an additional assumption. Let \(M_B,L_t,L_x\) be uniform bounds for the reference field and its time and position Lipschitz constants. From (P3), arriving velocities satisfy
\[
|\bar{\mathbf X}_i'(t)-\mathbf u_{0,i}|
 \le\bar A(T_*-t).
\]
Hence their speeds are uniformly bounded away from zero near the event. On that interval, their unit directions are Lipschitz with a common constant, for example \(4\bar A\). Consequently
\[
t\longmapsto \mathbf e_i(t)\cdot
 \bar{\mathbf B}_i(t,\bar{\mathbf X}_i(t))
\]
has Lipschitz constant at most \(L_t+L_x+4\bar A M_B\). Choosing the interval short enough makes its difference from \(\beta_i\) at most \(\beta_0/2\), uniformly in \(i\).

These are **derived, conditional on (P1)–(P6)**. A failure would require violating one of these uniform majorants.

**2. Lemma D: root and row estimates — supported.**

The incidence derivative is
\[
\partial_sG^Y=-1+\mathbf n\cdot\mathbf Y_j'\le-(1-w).
\]
Since \(|G^Y(s^X)|\le H_j\), monotonicity gives
\[
|s^X-s^Y|\le\frac{H_j}{1-w}.
\]
The displayed position and velocity bounds then follow directly:
\[
|\Delta\mathbf X|\le H_j+w\frac{H_j}{1-w}
 =\frac{H_j}{1-w},
\qquad
|\Delta\mathbf V|\le H_j'+L_j^X\frac{H_j}{1-w}.
\]

The mean-value argument is valid. Its interpolation remains inside the source’s anchor ball and the velocity ball, so the interpolated range retains the floor \(\rho_j\). It does not rely on the exterior of a range ball being convex. Direct differentiation of the canonical kernel gives the stated \(c_R(w)\) and velocity-derivative bounds.

**3. Weighted form and \(K_\mu\) — supported bound; proof needs correction.**

The shell calculation reconstructs exactly, including the additional \(h\):
\[
s\le t_0-R_j+c_W
 <t-R_j+c_W+h.
\]
Together with \(\rho_j\ge c_0m\), this produces the displayed \(K_\mu\). Both resulting series converge for every \(\mu>0\).

There is a window-domain gap in the proof as written. The weighted hypothesis holds only for \(s\le t-\gamma\), whereas the whole \(W_j\) need not lie there when \(t<t_0\).

The estimate remains valid after truncating the windows. Both actual roots satisfy
\[
s\le t-\rho_j\le t-\gamma-h<t-\gamma.
\]
Thus apply Lemma D on \(W_j\cap(-\infty,t-\gamma]\), which contains both roots and the interval between them. **P-WIN** below records this repair.

**4. Step 1: decoupling and the acceleration-inclusive norm — supported.**

Steps shorter than the common emission gap use only already known source histories. The infinite population therefore reduces on each step to independent receiver ODEs with uniform bounds.

The acceleration component of \(N\) can be controlled explicitly. Write
\[
|\mathbf k_i''|\le A_x|\mathbf k_i|+GEe^{\mu t},
\qquad E=N(t_k),\quad G=gK_\mu.
\]
For \(L=1+A_x\), the weighted position-plus-velocity difference on the step is bounded by
\[
E\,e^{L\tau}(1+G\tau).
\]
Substitution into the acceleration inequality gives, for example,
\[
N(t_k+\tau)\le
\max\!\left\{1,\,
(1+A_x)e^{L\tau}(1+G\tau)+G\right\}N(t_k).
\]
This independently establishes the claimed step estimate, including acceleration. The conversion from weighted to ordinary errors introduces bounded factors \(e^{\mu a}\), which can be absorbed into the constants.

**5. Steps 2–4: fixed tubes, comparison paths, identification — supported.**

The tube geometry supplies
\[
G_j(a)\le b-a-(1-2b_P)<0.
\]
Bounded anchor displacements give \(G_j(s)\to+\infty\) toward the remote past, and the known prefix supplies strict monotonicity. The field is therefore constructed before any unknown future solution is invoked.

The windows \(W_j^Q\) contain both roots. Their common range floor is positive because
\[
\beta_Q+b_P<1.
\]
Their exponential estimate reconstructs with the stated replacement factor \(e^{\mu(c_Q+b-a)}\), after retaining the overall bounded reception-time factor.

The comparison paths remain inside their tubes by the stated first-exit argument. While the actual population remains regular, it agrees with them. Future velocities of other members are unnecessary for this identification: the anchor ball excludes their new emissions.

**6. Step 5: uniform transverse crossings — supported for comparison paths; needs correction for actual arrivals.**

The uniform derivative bound gives one crossing for every \(i\in\mathcal A\), with
\[
|t_i^\eta-T_*|\le\frac{4C_4}{\beta_0}\varepsilon,
\qquad
\frac{d}{dt}|\mathbf z_i'|(t_i^\eta)\ge\frac{\beta_0}{4}.
\]
No minimum over infinitely many positive rates is needed beyond the explicit hypothesis \(\beta_i\ge\beta_0\).

However, the actual regular solution is established only up to
\[
T^\eta=\inf_i t_i^\eta.
\]
A member with \(t_i^\eta>T^\eta\) has a **comparison-path crossing**, not an established later arrival of the actual population. Theorem P, Corollary P.1, and the opening explanation currently blur this distinction. The accepted finite comparison explicitly treats later lags as comparison-path quantities.

There is also a quantitative mismatch for nonarriving members: the proof obtains
\[
|\mathbf z_k'|\le1-m_0/2+C_4\varepsilon,
\]
whereas Theorem P promises \(1-m_0/2\). This is repairable by retaining more reference margin before perturbation.

**7. Step 6: unattained-infimum argument — supported under an additional regularity requirement; not established by the literal definition.**

The central population argument works: any extension of positive duration contains some comparison crossing \(t_i^\eta\). Its source emissions still precede \(a\), so other members’ post-infimum behavior cannot change that member’s fixed partner field.

The missing premise is that member \(i\) must follow its ODE continuously until its own arrival, including across \(T^\eta\).

An admitted extension is presently defined using continuous **positions**, solving the equation while below wake speed, and continuation-class membership after arrivals. It does not expressly impose velocity continuity or absolute continuity across an unattained infimum, where no member has yet arrived. An almost-everywhere acceleration equation alone does not exclude a velocity reset or a singular velocity change there. ODE uniqueness cannot be invoked across such a change.

Require continuously differentiable paths with locally absolutely continuous velocity on every pre-arrival interval, including across \(T^\eta\). The bounded fixed field then upgrades the velocity to locally Lipschitz and supplies the required uniqueness.

After that repair, the infimum need not be attained. Theorem A′ applies to the selected member. Its measure conclusions retain their stipulated formulation; full BV exclusion retains the direction rule (M4). This does **not** construct a perturbation having an unattained infimum.

**8. Section 5 and Corollary P.1 — supported from the accepted certificate, subject to the preceding corrections.**

I independently checked the numerical deductions:

- A separately written integer-interval calculation, after known-case checks, enclosed the characteristic sum plus its infinite tail and proved
  \[
  2.79523<\lambda<2.79524.
  \]
  Thus \(\lambda\approx2.7952\) is supported.
- The accepted exact displacement upper bound is below \(0.24556\).
- Using only \(\lambda<4\),
  \[
  \lambda a+2\lambda K_0a^2
  <4a+8K_0a^2
  <3.638\times10^{-12}<10^{-10}.
  \]
- The accepted rational acceleration bound satisfies
  \[
  \frac{3361447112542015}{562949953421312}>5.9711.
  \]
  Sublattice symmetry gives this same event projection for every label.
- An independently written coverage/minimum scan of the accepted 658 continuous cell enclosures found positive acceleration lower bounds throughout the certified nonnegative prefix. Combined with the accepted ancient positivity, this supports monotone \(q'\), bounded acceleration, and (P6).
- \(5.9711/4=1.492775>5.97/4\).

For \(\mu\le\lambda\) and \(s\le0\), \(e^{\lambda s}\le e^{\mu s}\), so the claimed range of envelope rates is correct.

The cell scan checks the implications of **accepted continuous enclosures**; it is not a new independent certification of the original trajectory computation.

**9. Scope and grades — supported after correcting the arrival wording.**

The note uses \(c_f=1\), acceleration-first language, the canonical transmitter-weighted kernel, and prescribed supplied pasts. It imports no standard-physics mechanism.

The supported result is analytical and conditional on its hypotheses and continuation classes. It supplies no numerical \(\varepsilon_0\), localized-preparation result, zero-rate result, or conclusion for continuations leaving the uniform anchor ball. The new argument does not sample population trajectories. Its certificate application inherits accepted computational bounds rather than establishing them anew.

**(c) Actionable corrections**

Next possible actions:

1. **○ P-ARR — Distinguish comparison crossings from actual arrivals.** Recommended: revise Theorem P, Corollary P.1, and the opening explanation. State that every reference-arriving label’s **comparison path** crosses near \(T_*\); the actual regular population agrees with those paths only through its first infimum. This removes the principal overclaim.

2. **○ P-EXT — Complete the admitted-extension definition.** Recommended: require continuous velocity and locally absolutely continuous velocity before each member’s first arrival, explicitly across an unattained \(T^\eta\); retain the precise post-arrival classes and measure assumptions of Theorem A′. Then repeat Step 6 using that regularity. Without this correction, its uniqueness argument does not exclude pre-arrival resets or singular changes.

3. **○ P-MAR — Preserve quantitative margin for nonarrivers.** Recommended: choose the reference extension below \(1-3m_0/4\) and the perturbation error below \(m_0/4\), including the earlier prefix. This proves the theorem’s advertised \(1-m_0/2\) bound.

4. **○ P-WIN — Repair the weighted-window argument.** Recommended: apply Lemma D on \(W_j\cap(-\infty,t-\gamma]\), explaining why it contains both roots. Retain the displayed \(h\) offset and \(K_\mu\). The bound is supported; its current whole-window justification is incomplete.