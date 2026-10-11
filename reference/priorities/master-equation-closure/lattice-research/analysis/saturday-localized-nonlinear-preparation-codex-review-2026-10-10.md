# Independent review of Saturday's localized nonlinear lattice preparation

## Disposition

✓ Reviewed and resolved at the nonlinear preparation scope. Direct reads of the revised [subject](saturday-localized-nonlinear-preparation-2026-10-10.md), including the full corrected Lemma 2 and spatial bootstrap, verify L1–L5 resolved. The separate derivation below supports small nonzero localized complete-past solutions at $g=16$, with one solution having every spatial decay order. Amplitude thresholds and contour neighborhoods remain existential; numerical certification, later evolution, stability and physical acceptance are separate obligations. Shared tracker integration remains pending writer handover. The findings table retains the original requested corrections as review history; the final disposition records their resolution.

Claim grade: derived review judgments from the separate calculations below, under the lane's accepted stationary block prescription and the unchanged Master Equation. This is not a numerical certification of the subject's scripts, spectral census, amplitude threshold or subsequent evolution. The original subject and comparison instruments are read-only to this reviewer. The separate proof calculations, rather than agreement between agents or replay of their scripts, are the reference for this assessment.

## Equation and stationary reduction

The [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) supplies the transmitter-weighted acceleration row. For $c_f=1$, on the positive transmitter-factor domain, it is $g\sigma_d R/(|R|^3D)$, where $D=1-\widehat R\cdot v$. This equals the subject's $g\sigma_d\Psi(R,v)$. Unit spacing, $g=16$, the full alternating population and the fixed eight-source blocks are retained. No response, ceiling, root exclusion or event law is selected.

The resting grouped equilibrium is an accepted input from [the lattice manuscript](../manuscript.md#11-what-the-stationary-lattice-establishes). The separate derivative calculation gives

$$
D_R\Psi(d,0)h=\frac{I-3nn^{\mathsf T}}{r^3}h=-T_dh,
\qquad D_v\Psi(d,0)h=\frac{nn^{\mathsf T}}{r^2}h=B_dh.
$$

Thus source displacement has coefficient $+T_d$, receiver displacement has coefficient $-T_d$, and source velocity has coefficient $B_d$. Emission-time variation acts on a resting source and contributes no first-order term. A remote signed eight-site block of $T_d$ is a third finite difference of a degree $-3$ smooth kernel, hence $O(r^{-6})$. Its block series converges absolutely. The difference between block unions and receiver-centered cubes has $O(N^2)$ sites of size $O(N^{-3})$, and vanishes as $N\to\infty$. In a centered cube the signed tensor sum is invariant under the cubic group and trace-free, hence zero. This verifies the receiver cancellation with the actual block prescription.

Subtracting resting and receiver-linear rows leaves $f_d(\alpha)=O(|\alpha|^2r^{-4})$. Its sum is absolute in three dimensions. The source correction is bounded by $C(|y(s)|r^{-3}+|y'(s)|r^{-2})$ and is absolutely summable through exponential past decay. These two distinct convergence arguments justify the stated reduction; they give different tail rates.

For unweighted history norm at most $1/16$ and $a\le3$, the velocity bound is $3/16$. The delay function has derivative $D\ge13/16$, is negative at zero for distinct sites and tends to positive infinity. There is one positive root per distinct source. The chord of a source's own history has length at most $(3/16)\tau<\tau$, excluding a positive own root. Displacements give $|\tau-r|\le1/8$, distinct instantaneous separation at least $7/8$, and $|R|\ge7r/8$. All these conditions depend on unweighted smallness, rather than smallness of a spatially weighted norm.

## Linear inverse and localized seed

Twice integrating $f$ from the infinite past gives $\mathcal Jf$, with the position, velocity divided by $\nu$, and acceleration divided by $\nu^2$ all bounded by $\|f\|_{0,\nu}/\nu^2$. The delayed position and velocity rows have operator norms $2r^{-3}$ and $r^{-2}$ respectively. The weight inequality therefore yields

$$
\|\mathcal Jg\mathcal K\|_{X_\nu\to X_\nu}
\le \frac{16[2S_3(\nu-1/4)+\nu S_2(\nu-1/4)]}{\nu^2}.
$$

The geometric-series shell majorant is obtained by keeping the 6, 12 and 8 nearest shell sites and bounding the complement of $[-1,1]^3$ using $r\ge2$ and $r\ge\|d\|_1/\sqrt3$. This reproduces the displayed bound independently. At $\nu=5.3$ it gives an upper bound below $0.2003$, which remains an upper bound at larger $\nu$ by monotonicity. Keeping this tighter bound gives $C_L<0.0446$. The weaker rounded bound $0.21$ alone would give approximately $0.0451$; the stated $0.0446$ must be attributed to the tighter bound. No numerical spectral search is needed for this inverse.

At $Q=(\pi,\pi,\pi)$ the tensor sum vanishes shell by shell and the velocity tensor sum is $\Sigma(\lambda)I/3$, giving $F(Q,\lambda)=\lambda h(\lambda)I$. Positivity and strict decrease of $\Sigma$ imply the unique positive root with $h'>1$. The first three shells at $2.7$ give the lower root bracket. The same elementary shell majorant evaluated at $3$ gives the upper bracket: with $z=e^{-\sqrt3}$,

$$
\Sigma(3)\le 6e^{-3}+6e^{-3\sqrt2}+\frac83e^{-3\sqrt3}
+\frac14\left[\left(\frac{1+z}{1-z}\right)^3-(1+2z)^3\right]<0.511,
\qquad \frac{16}{3}\Sigma(3)<2.726<3.
$$

For example, outward elementary estimates $e^{-3}<0.049788$, $e^{-3\sqrt2}<0.014371$, $e^{-3\sqrt3}<0.005539$ and $z<0.177$ put the right side below $0.510405$. This supplies a hand upper bracket, whereas the subject currently cites the uncertified shell measurement $2.203$ for that step.

The finite numerical evaluation of this majorant is a check of arithmetic, not a certified interval instrument: a Node evaluation first passed the known separable-tail case $[(1+z)/(1-z)]^3-(1+2z)^3=19$ at $z=1/2$, then returned majorants $S_2(5.05)=0.04937679$, $S_3(5.05)=0.04493254$, inverse factor $0.20024896$ and $C_L=0.04451367$. It did not evaluate the subject's lattice scripts or use their outputs as an oracle.

Choose a fixed contour with left edge $a\ge2.65$ around the isolated staggered pole and a symmetric compact wavevector neighborhood on which the contour inverse exists. Spatial derivatives fall on $F^{-1}V$, without introducing factors of $T$ because the contour coordinate is independent of wavevector. Integration by parts gives every spatial power uniformly after division by $e^{aT}$. Multiplication by $F$ leaves an entire contour integrand, establishing the linear equation. Reflection of the contour and $V(-k)=\overline{V(k)}$ establish reality. The nonzero residue at $Q$ gives a nonzero smooth Fourier transform, hence nonzero Fourier coefficients. These arguments verify the seed's properties without using the sampled residues.

The nearby real growing band follows from $\partial_\lambda F(Q,\lambda_g)=\lambda_gh'(\lambda_g)I>0$: in a sufficiently small real rectangle this derivative remains positive definite, while $F$ at the two rate endpoints has opposite definite signs. Its eigenvalues cross zero with multiplicity retained. The seed proof itself only needs the fixed contour inverse. The weak-coupling note's Hessian calculation also checks separately: its far-cube errors sum as $s^2\sum e^{-sm/2}+s\sum e^{-sm/2}/m+\sum m^{-2}$, uniformly bounded for $0<s\le1$. This yields $\Sigma(s)=4\pi/s+O(1)$ and then $s_g^2=4\pi g/3+O(g^{3/2})$. This statement is not used in the $g=16$ preparation proof.

## Nonlinear estimate and the repair to spatial localization

Write $A_0=\|u\|_a^{(0)}$ and $A_w=\|u\|_a^w$, and suppose $A_0\le1/16$, $A_w<\infty$ and $1/4<a\le3$. The row domain remains regular even if $A_w$ is large. All Taylor segments lie in $|v|\le3/16$, $|R|\ge7r/8$, so the second row derivatives are bounded by constants times $r^{-4},r^{-3},r^{-2}$, respectively.

With $p=y(T-\tau)$ and $b=y'(T-\tau)$, subtracting the source linearization gives products $\alpha p/r^4$, $p^2/r^4$, $\alpha b/r^3$, $pb/r^3$ and $b^2/r^2$. The two delay correction terms are

$$
-T_d\int_r^\tau y'(T-t)\,dt,
\qquad -B_d\int_r^\tau y''(T-t)\,dt.
$$

Their lengths are bounded by $|\alpha|+|p|$. Every product contains a source factor. Apply the weighted bound to one factor and the unweighted bound to the other. A receiver-source product gains $\omega_de^{-ar}$ when the weighted factor is at the source, and a source-source product has at least the same decay. Uniform delay offsets add only factors bounded by $e^{3/8}$. Consequently

$$
\|\mathcal N[u]\|_{0,2a}^w\le C_N A_0A_w,
\qquad
w_ie^{-2aT}|\mathcal R_d|\le C A_0A_w\omega_de^{-ar}(r^{-4}+ar^{-3}+a^2r^{-2}),
$$

with constants independent of the spatial exponent or a truncated weight. The receiver term uses $|E(\alpha)|\le c_E|\alpha|^2$, also giving $A_0A_w$. This is the strengthened estimate needed for the final bootstrap. It requires small $A_0$, not small $A_w$.

For differences of histories, monotonicity of the root gives

$$
|\tau_1-\tau_2|\le\frac{16}{13}\left(|\alpha_1-\alpha_2|+|(y_1-y_2)(T-\tau_1)|\right).
$$

Split each delayed position or velocity difference into the history difference at a common time and the shift of the second history. The latter uses $y_2'$ or $y_2''$. Split each integral difference into a common-domain difference of integrands and the change of its endpoint. The common-domain term uses $y_1''-y_2''$ for the velocity-delay integral; the endpoint term uses a bound on $y_2''$, with no third derivative. On the original small weighted balls, this gives the stated Lipschitz estimate. Thus there is no derivative loss in the contraction's $C^2$ norm.

For each fixed weight the correction ball in $X_{2a}$ is invariant and contractive once $\varepsilon$ is small: $\|v\|_a\le4\|v\|_{2a}$, the image size is bounded by $C_LC_N(\varepsilon\Lambda+4\varrho)^2$, and the Lipschitz factor by $8C_LC_N'(\varepsilon\Lambda+4\varrho)$. This verifies fixed-weight existence and uniqueness in the declared correction ball. Nonzero history follows by choosing a nonzero seed value at $T=0$ and taking the quadratic correction smaller than its linear amplitude.

For one solution to have every weight, take the $m=0$ fixed point and $w^L=\min(w,L)$. The truncated norms are finite but need not be small. Apply the strengthened estimate just derived, obtaining

$$
\|v\|_{2a}^{w^L}\le C_LC_N A_0(\varepsilon\Lambda_m+4\|v\|_{2a}^{w^L}).
$$

Choosing $4C_LC_NA_0\le1/2$ permits absorption uniformly in $L$ and $m$. Monotone passage to $L\to\infty$ gives every spatial power for the same solution. This repairs the gap without changing the equation, seed, physical smallness class or reference instruments.

## Findings requiring subject correction

| Finding | Status | Required bounded correction |
| --- | --- | --- |
| **L1 — truncated-weight hypothesis** | ✓ Resolved | State the product estimate for histories small in the unweighted norm and of arbitrary finite weighted norm; prove that extension explicitly. The current Lemma 2 requires the weighted norm itself to be at most $1/16$, which the all-order bootstrap does not establish. The derivation above supplies the repair. Keep the original weighted-small Lipschitz statement for the contraction if convenient. |
| **L2 — distinct infinite tails** | ✓ Resolved | Restrict $e^{-2.4R}$ to the delayed-source remainder tail. For the separately summed receiver remainder $E$, the available absolute estimate gives $C|\alpha|^2/R$ beyond $r>R$. The resting grouped term has its own block tail. Do not claim the source estimate bounds the entire nonlinear or original row sum. No sharper stationary cancellation estimate is required for this theorem. |
| **L3 — numerical falsifier** | ✓ Resolved | A finite-onset run initialized with only $\varepsilon\phi$ uses a different history from the constructed $\varepsilon\phi+v$ and is not a direct falsifier of ancient-history existence or its correction bound. Replace this with failure of the specified invariant/contraction estimates or a controlled violation on the constructed full-history family; a finite-onset comparison requires its own convergence and history-error protocol. |
| **L4 — analytical hypotheses and hand bounds** | ✓ Resolved | Add $a>1/4$ to the weighted remainder lemma, use a hand upper bound at $3$ to establish $\lambda_g<3$, and attribute $C_L\le0.0446$ to $q\le0.2003$. In proposed tracker text use the proved weighted inverse at $\nu\ge5.3$, or explicitly label the unweighted $3.84$ threshold as uncertified measured evidence. The hand shell majorant above suffices; no new simulation is needed. |
| **L5 — comparison scope** | ✓ Resolved | Absence of mode roots with real part at or above $2a$ is a necessary spectral requirement for this injective inverse, not a proved sufficient replacement for spatially weighted resolvent bounds. Replace “the true condition” with that bounded statement. The coherent single-wavevector history is a control outside localized weights, but shrinking the support of an unscaled smooth seed tends toward zero rather than that plane wave; remove the asserted limiting-family identification or explicitly mark it a formal analogy without a proved distributional or nonlinear limit. |

Falsifiers of this review: an admissible unweighted-small history family for which the ratio $\|\mathcal N[u]\|_{0,2a}^w/(A_0A_w)$ is unbounded for the stated weights would defeat the proposed L1 repair; failure of the regular row derivative or delay-difference bounds would defeat the contraction assessment; failure of the shell majorant at the stated elementary bounds would defeat the analytical root/inverse checks. Subsequent evolution or a different supplied history does not overturn this preparation assessment.

## Ownership, delivery and verification record

The subject read for this review has SHA-256 `860a927d47bb8497c123761dcdc807ec3ea89ef5a5bb071f6bda0691e2a0761c`, measured by Node SHA-256 over its bytes before this companion was created. The companion path was absent by `fs.existsSync` before creation. The live lattice queue read during review records boundary reproduction as completed, but that does not establish that other writers have relinquished the shared trackers. The `1-mec` coupling assignment remains active. No shared lattice tracker or original scientific reference was edited; the campaign allocation supplies discoverability while tracker integration remains pending ownership clarification.

The initial desktop observation reported the Mac locked and automatic unlock unsuccessful. Queue return routing remains in force. No successor initiative is released until the correction receipt is independently checked and the stage disposition recorded. The deadline remains 2026-10-11T10:04:26Z.

The full correction request was appended as Codex contribution 5 at 2026-10-10T23:36:50Z with a single verified 4,639-byte append and prior bytes preserved. Its prepared pointer is `.tmp/saturday-serial/i2-review-notification.txt` at the repository root. A direct Node SHA-256 comparison verifies the subject bytes unchanged across this review. `git diff --check` passed for the tracked allocation and transcript edits. A Node whitespace check passed known positive and negative cases before checking this new companion, and direct `fs.existsSync` checks verified its three explicit relative file targets; link fragments and numerical evidence were not certified by these checks.

Delivery recovered after Op reported the Mac unlocked. A fresh transcript read showed no intervening correction receipt. Desktop accessibility verified Saturday's exact URL and empty composer. The first paste attempt reported a user UI change and left the composer empty; after re-observation the pointer was entered, its exact text checked, and Send clicked once. The post-send accessibility tree showed the submitted correction pointer in the bound chat and Claude running “Reading Codex's initiative-2 review entry and locating the companion review,” observed before the 2026-10-10T23:39:36Z clock measurement. Arrival and processing are observed; correction completion is not. Saturday was left selected after the reported UI change. This notification completes contribution 5 and does not create contribution 6.

## Final disposition — initiative 2 accepted at its preparation scope

Claude's 2026-10-10T23:41:18Z correction receipt was processed before any successor assignment. Direct reads of the revised subject verify the unweighted-small product estimate for arbitrary finite weighted norms and its use in the truncated-weight absorption (L1), separate receiver/source/resting tails (L2), falsifiers of the actual constructed history and estimates (L3), analytical rate hypotheses and hand root/inverse bounds (L4), and the narrowed spectral and coherent-branch comparisons (L5). No new actionable proof gap was found at this declared scope. The corrected subject SHA-256 is `e3dac0f739ad217fdaac4e72c8a5c5d061cbe30d5d531770509600e49a4092aa`, measured by Node SHA-256 over its bytes for this disposition.

The result is a derived existence theorem for sufficiently small, rapidly localized nonlinear histories on $T\le0$ at unit spacing, $g=16$ and $c_f=1$, with all labels free under the unchanged Master Equation and the accepted block prescription. All labels being dynamical does not assert strictly nonzero motion at every site or time. The amplitude threshold, contour radius and wavevector neighborhood remain existential; float measurements are not certified numerical inputs. A counterexample to the stated row estimates or a failure of the constructed history to satisfy the equation within its hypotheses would overturn acceptance. Later evolution, stability, typicality, finite numerical construction and a retained constituent have not been established.

Initiative 2 has no remaining assigned calculation by Claude's receipt; no independent process census is claimed. Shared lattice tracker integration remains a coordinator obligation pending a safe writer handover, with the accepted subject and this companion linked from the allocation account. This administrative boundary does not reopen the accepted preparation theorem or authorize overwriting neighboring work. Initiative 3 may now be released as the sole active stage.
