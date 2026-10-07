# Independent compact slow-scale and height-band review

## Verdict and scope

**Derived and independently accepted, with no repair required.** Under precisely the compact-family assumptions in the [frozen subject](overnight2-b-compact-slow-scale.md), exact canonical slow histories have $R\epsilon^2$ bounded above and bounded away from zero for sufficiently small $\epsilon$. The limiting-equation, positive angular constant and strict height-band conclusions are also correct under the additional convergence hypotheses stated there. The compact scale result alone is not a claim of $C^2$ subsequential compactness.

The separately reviewed extension at the end of this report proves that exact balance upgrades a $C^1$ subsequence to $C^2$. Thus an exact family under the original common bounds automatically has a subsequence satisfying those convergence hypotheses; no separate convergence assumption is needed for that subsequential conclusion.

The scenario remains the canonical all-ordinary-root equation with $K=c_f=1$ and the six prescribed alternating-height paths. No response multiplier, root exclusion or imported physical conservation law enters. This review reconstructs the estimates from the paths and the [previously checked limiting equation and period conditions](overnight2-b-independent-coupled-period.md), using the [independently checked confinement theorem](overnight2-b-independent-height-confinement.md) for the upper height bound. It does not claim that any exact family exists or exclude arbitrary finite-speed histories.

The frozen subject identity, measured with native `shasum -a 256`, is `5c4f34eb10f33ed84c96631f4ee88b6465a2c8f303204d9e3f00051c71d13a3c`. The subject and every prior reference remain read-only. All arithmetic below is direct finite rational algebra; no numerical instrument, target or runtime evidence directory was needed for this analytical review.

## Uniform ordinary chart and zeroth-order convergence

Let $r_-\le\rho\le r_+$, $|\zeta|\le Z$, and let the common $C^2$ and rate bounds be as stated. In normalized time $\tau=t/R$, physical velocity equals the derivative of the dimensionless position with respect to $\tau$ and has cylindrical components
$$
\epsilon(k\rho',\;\rho(b+kp'),\;\pm k\zeta').
$$
Thus a fixed finite $V_*$ bounds every speed by $v_\epsilon=\epsilon V_*$, independently of $R$, phase and member of the family. Put $M_*=\sqrt{r_+^2+Z^2}$. All dimensionless positions lie in the ball of radius $M_*$.

For one receiver-source pair let $\delta=d/R$, let $Q_\epsilon(\delta)$ be the dimensionless retarded separation, and let $s=|Q_\epsilon(0)|$. The smallest simultaneous partner separation is at least $r_-$: the neighbor, same-polarity and diametric distances are respectively $\sqrt{\rho^2+4\zeta^2}$, $\sqrt3\rho$ and $2\sqrt{\rho^2+\zeta^2}$. Source motion is Lipschitz with constant $v_\epsilon$, so
$$
\big||Q_\epsilon(\delta_2)|-|Q_\epsilon(\delta_1)|\big|\le v_\epsilon|\delta_2-\delta_1|.
$$
The root gap $|Q_\epsilon(\delta)|-\delta$ is consequently strictly decreasing for $v_\epsilon<1$, positive at zero for partners and nonpositive at $2M_*$. There is exactly one positive root for each of the five partners, with
$$
\frac{r_-}{1+v_\epsilon}\le\delta\le2M_*.
$$
The self gap is at most $(v_\epsilon-1)\delta<0$ for every positive $\delta$, so there is no positive self root. This is a complete-past statement, since bounded diameter rules out roots beyond $2M_*$; a local root finder or finite history truncation is unnecessary.

At a partner root the transmitter divisor satisfies $D\ge1-v_\epsilon>0$, and
$$
|Q_\epsilon-Q_0|\le v_\epsilon\delta\le2M_*v_\epsilon,\qquad
|\delta-s|\le|Q_\epsilon-Q_0|,\qquad |D-1|\le v_\epsilon.
$$
The canonical signed row is $\sigma Q_\epsilon/(\delta^3D)$, where $\sigma$ is the source-receiver polarity product. On these common bounds its denominators stay away from zero, and the displayed estimates give the uniform row limit $\sigma Q_0/s^3+O(\epsilon)$. Summing five rows gives
$$
A_\epsilon=A^{(0)}+O(\epsilon)
$$
uniformly throughout the family. This establishes the zeroth-order estimate independently without assuming an equilibrium, a scale limit or physical acceleration bounds uniform in $R$. The subject's stronger common $C^2$ hypothesis is sufficient; this particular zeroth-order argument uses only the corresponding first-derivative bounds.

## Nonvanishing simultaneous acceleration and the scale floor

The five-row simultaneous acceleration is
$$
A_r^{(0)}=\frac1{\sqrt3\rho^2}-\frac{\rho}{(\rho^2+4\zeta^2)^{3/2}}-\frac{\rho}{4(\rho^2+\zeta^2)^{3/2}},
$$
$$
A_z^{(0)}=-\zeta\left[\frac4{(\rho^2+4\zeta^2)^{3/2}}+\frac1{4(\rho^2+\zeta^2)^{3/2}}\right],\qquad A_t^{(0)}=0.
$$
The bracket is positive for $\rho>0$. A simultaneous vector zero would require $\zeta=0$, but then $A_r^{(0)}=-(5/4-1/\sqrt3)/\rho^2<0$. Hence the vector has no zero on the entire positive-radius domain, even though its radial component may separately vanish away from the plane.

On the declared compact rectangle, continuity gives
$$
m=\min|A^{(0)}|>0,\qquad B=1+\max|A^{(0)}|<\infty.
$$
The uniform estimate gives $m/2\le|A_\epsilon|\le B$ for all sufficiently small $\epsilon$. These are existence constants depending on the common family bounds; the proof does not provide a numerical threshold.

Direct differentiation of the prescribed paths gives dimensionless geometric acceleration $\epsilon^2L_0$, with
$$
L_0=(k^2\rho''-\rho\omega^2,\;2k\rho'\omega+\rho k^2p'',\;k^2\zeta''),\qquad \omega=b+kp'.
$$
Physical geometric acceleration is $\epsilon^2L_0/R$, while the physical canonical acceleration is $A_\epsilon/R^2$. Exact balance is therefore
$$
\lambda_\epsilon L_0=A_\epsilon,\qquad\lambda_\epsilon=R\epsilon^2>0.
$$
Choose any finite $L_*>0$ strictly exceeding the common bound for $|L_0|$. Then
$$
\lambda_\epsilon L_*\ge |A_\epsilon|\ge m/2,\qquad
\lambda_\epsilon\ge\frac m{2L_*}>0.
$$
No lower bound for $|L_0|$ was assumed. In an exact history the nonzero canonical acceleration would itself prevent $L_0$ from vanishing at a phase.

## Averaged upper scale bound

Use the normalized full-phase mean and integrate the two second-derivative terms by parts. Since real profiles and their derivatives are periodic,
$$
\langle\rho L_{0,r}+\zeta L_{0,z}\rangle
=-\langle k^2(\rho')^2+\rho^2\omega^2+k^2(\zeta')^2\rangle=-\mathcal V.
$$
Every term in $\mathcal V$ is nonnegative. The assumption that $p$ itself is a real periodic function is consequential: it gives $\langle p'\rangle=0$ and hence $\langle\omega\rangle=b$. Therefore
$$
\mathcal V\ge r_-^2\langle\omega^2\rangle\ge r_-^2b^2\ge r_-^2b_-^2>0.
$$
This remains true when $\omega$ changes sign pointwise; a positive pointwise rotation rate was not assumed.

Exact balance gives $-\langle\rho A_{\epsilon,r}+\zeta A_{\epsilon,z}\rangle=\lambda_\epsilon\mathcal V>0$. Pointwise Cauchy–Schwarz and the acceleration bound give
$$
\lambda_\epsilon r_-^2b_-^2\le-\langle\rho A_{\epsilon,r}+\zeta A_{\epsilon,z}\rangle
\le\langle\sqrt{\rho^2+\zeta^2}\,|A_\epsilon|\rangle\le M_*B.
$$
Thus
$$
\frac m{2L_*}\le\lambda_\epsilon\le\frac{M_*B}{r_-^2b_-^2}.
$$
No sign assumption about the simultaneous primitive is involved. If a declared set of bounds made this interval empty, it would exclude the hypothesized exact family, rather than provide a degenerate-scale alternative.

## Limit qualification and positive angular constant

The compact scalar interval ensures a subsequence with $\lambda_\epsilon\to\lambda\in(0,\infty)$. Rate compactness likewise permits convergent subsequences with positive limits. A bounded $C^2$ set is not automatically compact in $C^2$; the subject correctly states derivative convergence as an additional sufficient hypothesis when passing the differential equation. Under that hypothesis, passing exact balance to the limit and using $\chi=\eta/\sqrt\lambda$, $\eta=\epsilon t/R$, gives the already checked normalized equation.

The limiting tangential equation gives $(r^2\dot\theta)^{\cdot}=0$. Since $d/d\chi=\sqrt\lambda\,d/d\eta$,
$$
\ell=\sqrt\lambda\,\rho^2(b+kp')
$$
is constant. Divide by $\sqrt\lambda\rho^2$ and average over a full phase to obtain
$$
\ell=\frac{\sqrt\lambda\,b}{\langle\rho^{-2}\rangle}>0.
$$
The denominator is finite and strictly positive. The normalized time and phase averages agree because $d\phi/d\chi=k\sqrt\lambda$ is a positive constant in the limit. The necessary first-order mean conditions follow from the separately reconstructed uniform first-order expansion and exact period identities; they do not follow from zeroth-order convergence alone. The subject appropriately cites those additional established results.

## Torque sign and strict height band

The limiting torque condition is
$$
0=M_\chi=\ell\left\langle\frac{C(h)}{r^2}\right\rangle_\chi,\qquad h=z/r.
$$
Put $x=h^2$. Multiplying the three terms defining $C$ by $12(1+4x)^2(1+x)$ gives respectively
$$
12(2-4x)(1+x),\qquad-8(1+4x)^2(1+x),\qquad3(1+4x)^2.
$$
Their sum is exactly
$$
N(x)=19-72x-192x^2-128x^3.
$$
For $x\ge0$ the denominator is positive and $N'(x)=-72-384x-384x^2<0$. Since $N(0)=19$ and $N\to-\infty$, there is exactly one positive root $x_C$. Direct rational substitution gives
$$
N(4/25)=\frac{296875-180000-76800-8192}{15625}=\frac{31883}{15625}>0,
\qquad N(1/4)=19-18-12-2=-13<0.
$$
Thus $2/5<h_C=\sqrt{x_C}<1/2$, and $C(h)$ is positive for $|h|<h_C$, zero at equality, and negative for $|h|>h_C$.

The normalized axial equation is $\ddot z=-a(r,z)z$, where $a$ is continuous and strictly positive on each regular periodic orbit. If $z\ge0$ and is not identically zero, then $\int_0^Ta(r,z)z\,d\chi>0$, contradicting $\int_0^T\ddot z\,d\chi=0$. The case $z\le0$ is analogous. Every nontrivial axial periodic solution therefore takes both signs. Its continuous height ratio crosses zero, and continuity gives an interval of positive length where $C(h)>0$.

Because $\ell/r^2$ is strictly positive, the weighted torque mean cannot vanish if $C$ is nonnegative everywhere. It must be negative somewhere, hence on an interval by continuity. Consequently $\max|h|>h_C$, strictly. For $z\equiv0$, $C(0)=19/12>0$ makes the torque mean positive, so the planar branch is excluded from these exact-family limits as well.

The accepted confinement theorem applies to the resulting regular periodic limiting radial/axial orbit and gives $|h|<h_U$ at every phase. A continuous function attains its maximum on a full compact period; applying the pointwise strict inequality there gives $\max|h|<h_U$. Combining the bounds yields
$$
h_C<\max_\chi|z/r|<h_U,\qquad
\frac25<h_C<\frac12,\qquad\frac{11}{10}<h_U<\frac98.
$$
This is a necessary band for limits satisfying the torque condition. Generic solutions of the instantaneous limiting equation need not satisfy that condition. No prescribed waveform, turning-point preparation or sampled numerical orbit was used.

## Falsifiers, validation and preservation

Operator-checkable falsifiers are a failure of uniform complete-root inclusion or of the displayed row convergence estimate; a simultaneous zero of $A^{(0)}$ at positive radius; a wrong scale factor in exact balance; a nonzero periodic boundary term or sign error in the averaged identity; a positive-mean rotation family violating the derived upper bound; a wrong numerator coefficient or endpoint rational sign; or an admissible limiting orbit satisfying zero torque while violating the strict height band. The explicit equations above expose each check. Dropping the positive radius floor, common derivative/amplitude bounds, positive lower mean rotation rate or required convergence changes the hypotheses and does not provide a counterexample to this theorem.

No physical energy conservation, primitive mass, arbitrary finite-speed exclusion or uniform numerical speed threshold is claimed. The result constrains hypothetical compact exact slow families and their suitably convergent limits. Families leaving these bounds, degenerate hypotheses and existence or continuation questions remain separate research obligations.

Evidence is the independently reconstructed analytical derivation in this new file. No program was authored or run on a numerical target, so there is no new known/target control sequence, runtime receipt or resource estimate to report. No background job, regular test suite, generator, recursive reviewer or Git mutation was used. This report is the sole reviewer-authored deliverable; the frozen subject, earlier oracles and receipts, numerical proposal, shared owners and parent report were not edited. No evidence was removed, moved or replaced, and no remote-backup or replay claim is made. Parent integration is the remaining disposition step.

## Separately adjudicated extension: exact balance upgrades convergence

**Derived and independently accepted.** After the frozen subject review, the parent requested review of the separate extension recorded under “Exact balance upgrades compactness to the required derivative convergence” in the [receiving research account](overnight2-b-followup-and-research-2026-10-07.md). This section adjudicates that extension without changing the frozen subject or the parent account. It strengthens the frozen subject's sufficient-convergence statement: for exact sequences under the common bounds already specified, the requisite $C^2$ convergence can always be obtained along a subsequence. It is not a consequence of bounded $C^2$ norms alone.

Work on the fixed compact phase interval $[0,2\pi]$, identifying its endpoints. The common $C^2$ norm bounds the values and first derivatives of $\rho_n,p_n,\zeta_n$, and makes their first derivatives uniformly Lipschitz. Arzela–Ascoli applied to this finite collection gives a subsequence on which each profile and its first derivative converges uniformly. Integration identifies the derivative limits, so the convergence is in $C^1$. Periodicity of values and first derivatives passes to the limit. Taking further subsequences preserves this convergence and gives
$$
b_n\to b>0,\quad k_n\to k>0,\quad \lambda_n\to\lambda>0.
$$
The compact scale bounds proved above are sufficient for the last extraction. The radius bound also passes to the limit: $\rho\ge r_->0$.

Write $\omega_n=b_n+k_np_n'$. Exact balance solves for the phase second derivatives without differentiating the delayed acceleration:
$$
\rho_n''=\frac{A_{n,r}/\lambda_n+\rho_n\omega_n^2}{k_n^2},\qquad
\zeta_n''=\frac{A_{n,z}}{\lambda_n k_n^2},
$$
$$
p_n''=\frac{A_{n,t}/\lambda_n-2k_n\rho_n'\omega_n}{\rho_n k_n^2}.
$$
The factors of $k_n$ and the negative sign in the last numerator follow directly from the tangential entry of $L_0$. All denominators have common positive lower bounds along the selected tail.

The uniform complete-root estimate established above gives
$$
\sup_\phi|A_n(\phi)-A^{(0)}(\rho_n(\phi),\zeta_n(\phi))|\longrightarrow0.
$$
Smoothness of $A^{(0)}$ on the positive-radius compact rectangle and uniform profile convergence imply $A_n\to A^{(0)}(\rho,\zeta)$ uniformly in the instantaneous cylindrical components used in exact balance. In particular $A_{n,t}\to0$. Rotation of the physical frame introduces no extra derivative here: the equation and row estimate are already expressed in the same receiver frame. Every factor on the three displayed right-hand sides now converges uniformly. Thus the second derivatives converge uniformly to continuous functions
$$
g_\rho=\frac{A_r^{(0)}/\lambda+\rho\omega^2}{k^2},\quad
g_\zeta=\frac{A_z^{(0)}}{\lambda k^2},\quad
g_p=-\frac{2\rho'\omega}{\rho k},\qquad \omega=b+kp'.
$$
For any one profile $f_n$, the fundamental theorem of calculus gives
$$
f_n'(\phi)=f_n'(0)+\int_0^\phi f_n''(s)\,ds.
$$
Passing to the uniform limits gives $f'(\phi)=f'(0)+\int_0^\phi g_f(s)\,ds$. Continuity of $g_f$ proves $f\in C^2$ and $f''=g_f$. Hence the selected subsequence converges in $C^2$, including at the identified periodic endpoints. Substitution into the limiting exact equations and the checked time normalization gives a regular periodic radial/axial limiting solution. The previously proved necessary means pass to that subsequence as well.

The extension therefore removes the need to assume separate $C^2$ convergence for existence of an admissible subsequential limit of an exact compact-family sequence. Together with the main review, every such hypothetical sequence has a subsequence with $\ell>0$, both necessary mean conditions, and the strict height band. It does not assert convergence of the full sequence, uniqueness of its limit, existence of the exact sequence, or finite-speed balance for an arbitrary limiting orbit.

Exactness is indispensable to this upgrade: arbitrary bounded prescribed profiles can have bounded but nonconvergent second derivatives. The solved identities additionally rely on the common radius floor, positive rate and scale limits, and uniform complete-root acceleration convergence. Failure of one of those hypotheses defeats the corresponding inference. A counterexample to the accepted extension would need to satisfy every original compact-family assumption and exact balance while having no $C^2$ convergent subsequence; merely presenting a bounded oscillatory prescribed profile would not suffice. No new computation, subject edit or evidence replacement was used for this extension review.

Final scoped verification: native `shasum -a 256` reproduced the frozen subject identity above after the review and extension. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new report; its exit one denotes a new-file difference. The proof, finite endpoint arithmetic and extension were checked analytically as displayed. These checks support this bounded derivation and file formatting, without asserting numerical candidate membership or physical acceptance.
