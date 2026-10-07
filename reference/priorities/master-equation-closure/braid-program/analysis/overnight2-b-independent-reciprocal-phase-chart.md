# Independent reciprocal-radius phase chart review

## Verdict and corrections

**Derived and independently accepted as a prescribed-history geometric chart, with two explicit normalization/arithmetic corrections.** The [frozen reciprocal-phase subject](overnight2-b-reciprocal-phase-chart.md) has a correct continuous lifted primitive, reciprocal-radius mean identity, speed-budget map and complete-past root argument. Its conclusions are exactly five ordinary positive partner roots, no positive self root, divisor $D\ge1/10$, and normalized partner delays $0.34<d/R<3.82$ for every parameter in the declared box, every $R>0$ and every time. This establishes neither canonical balance nor existence of an exact solution.

The corrections are:

1. The displayed $\beta+\kappa p'$ and $\kappa^2p''$ are derivatives of angle with respect to normalized time $\tau=t/R$. Physical-time angular velocity and angular acceleration are $(\beta+\kappa p')/R$ and $\kappa^2p''/R^2$. The speed calculation is nevertheless correct, because multiplication by the physical radius $R\rho$ cancels the first factor $1/R$. All numerical delay bounds in the all-$R$ chart are bounds on $d/R$, not on the unnormalized physical delay $d$.
2. $0.646/1.9=0.34$ exactly; the subject's strict numerical comparison between these two constants is incorrect. The desired strict lower bound survives because the actual radius floor is strictly greater than $0.646$, yielding $d/R>0.646/1.9=0.34$.

No trajectory formula or root count needs correction. The frozen subject was not edited; the receiving parent account should carry these qualifications. Its SHA-256, measured by native `shasum -a 256`, is `893521d9aaaa9d2565359d53adb341f99f75164d05d0e4c7602f8a587db151e4`.

## Continuous lift and parameter representation

The scenario retains $K=c_f=1$ and the complete six-member histories. Put $A=\sqrt{a^2+b^2}<1$, $\eta=\sqrt{1-A^2}$ and $\delta=\operatorname{atan2}(b,a)$ for $A>0$. Then $a=A\cos\delta$, $b=A\sin\delta$, $\psi=\phi-\delta/2$ and $\rho=1+A\cos2\psi>0$. Let $k_A=\sqrt{(1-A)/(1+A)}>0$.

A rigorous globally defined version of the proposed increasing lift is
$$
\mathcal A(\psi)=\int_0^\psi\frac{\eta}{1+A\cos2s}\,ds.
$$
On the branch interval $(-\pi/2,\pi/2)$, differentiation of $\arctan(k_A\tan\psi)$ gives
$$
\frac{k_A}{\cos^2\psi+k_A^2\sin^2\psi}=\frac{\eta}{1+A\cos2\psi}.
$$
It agrees with the integral at zero. Its limits at the two interval endpoints are $\pm\pi/2$, so translating by multiples of $\pi$ yields the continuous lift with $\mathcal A(\psi+\pi)=\mathcal A(\psi)+\pi$. The integral description also shows it is smooth through the apparent tangent poles: the denominator is everywhere positive. The principal arctangent alone would have jumps and is not the prescribed function.

Define
$$
F(\phi)=\mathcal A(\psi)-\frac{A\eta\sin2\psi}{2\rho}+\frac\delta2.
$$
Changing the representative $\delta$ to $\delta+2\pi j$ changes $\psi$ to $\psi-\pi j$, changes $\mathcal A$ by $-\pi j$, leaves the rational periodic term unchanged, and adds $\pi j$ in $\delta/2$. These changes cancel. Thus the branch choice of `atan2` does not create a change in $F$ when the lift is handled consistently.

At $A=0$, the separate definition $F(\phi)=\phi$ is correct: $\eta=1$, the rational term vanishes and the lifted arctangent becomes $\mathcal A(\psi)=\psi$. Moreover $F-\phi=\mathcal A(\psi)-\psi-A\eta\sin2\psi/(2\rho)$ tends uniformly to zero as $A\to0$, uniformly in the arbitrary shift $\delta/2$, since its terms are bounded periodic functions and their derivative perturbations tend uniformly to zero. The separate zero-amplitude definition removes the otherwise undefined `atan2(0,0)`; it is not a different trajectory limit.

## Primitive derivatives and mean identity

Direct quotient differentiation gives
$$
\frac d{d\psi}\left(\frac{\sin2\psi}{1+A\cos2\psi}\right)
=\frac{2(\cos2\psi+A)}{\rho^2}.
$$
Since $d\psi/d\phi=1$,
$$
F'=\frac\eta\rho-\frac{A\eta(\cos2\psi+A)}{\rho^2}
=\frac{\eta(1-A^2)}{\rho^2}=\frac{\eta^3}{\rho^2},
$$
$$
F''=-\frac{2\eta^3\rho'}{\rho^3},\qquad F(\phi+\pi)=F(\phi)+\pi.
$$
These identities hold through every lifted endpoint by the smooth integral representation. Integrating $F'$ over $2\pi$ gives
$$
\eta^3\langle\rho^{-2}\rangle=\frac{F(2\pi)-F(0)}{2\pi}=1,
\qquad \langle\rho^{-2}\rangle=\eta^{-3}.
$$
Thus $F-\phi$ is real and $\pi$-periodic. For $q=c\cos2\phi+d\sin2\phi$ and $\kappa>0$,
$$
p=\frac\beta\kappa(F-\phi)+q
$$
is a well-defined real periodic correction. Writing $\tau=t/R$ and $\phi=\kappa\tau$, the common angle is equivalently $\theta=(\beta/\kappa)F(\phi)+q(\phi)$. Its normalized derivatives are exactly
$$
\theta_\tau=\beta+\kappa p'=\beta F'+\kappa q',\qquad
\theta_{\tau\tau}=\kappa^2p''=\beta\kappa F''+\kappa^2q''.
$$
The physical derivatives have the powers of $R$ stated in the correction above.

At $q=0$, $\rho^2\theta_\tau=\beta\eta^3$ is constant and the mean identity gives
$$
p'=\frac\beta\kappa\left(\frac{\rho^{-2}}{\langle\rho^{-2}\rangle}-1\right).
$$
This agrees with the necessary limiting angular relation. Nonzero $q$ is allowed in the geometric chart but does not automatically obey that relation. In an exact compact slow family with this representation, a nonconstant limiting $q$ cannot be asserted as an angularly compatible correction without checking the limiting tangential equation. In particular, a constant product would imply $\rho^2q'$ constant; periodicity of $q$ would then force $q'=0$ in that limit.

For nonconstant positive finite-degree $\rho$, the reciprocal primitive has an infinite Fourier tail in its derivative, by the independently accepted finite-product obstruction. Adding a finite trigonometric $q$ does not remove that tail. Keeping this representation is therefore distinct from truncating $p$ to finitely many harmonics, but that distinction is no evidence of balance or existence.

## Speed-budget map and strict size bounds

The declared smoothed amplitudes satisfy $A<A_r$, $\sqrt{c^2+d^2}<A_p$, and $\sqrt{e^2+f^2}<A_z$; their small positive addition affects only the conservative coordinate map. Over the box,
$$
A_r^2,A_p^2\le\frac18+10^{-8}<0.354^2=0.125316,
$$
$$
A_z^2\le\frac1{50}+10^{-8}<0.142^2=0.020164.
$$
Consequently $r_-=1-A_r>0.646$, $r_+=1+A_r<1.354$, $\rho\ge1-A>r_->0$, and $\eta>0$. Also $S\ge H+3A_z\ge H\ge0.2$, so the map
$$
\beta=\frac{u_0r_-}{\eta^3},\qquad\kappa=\frac{v_0}{S}
$$
is positive and finite everywhere in the box. All parameter maps are continuous; singular denominators are excluded uniformly.

For each path, the physical velocity in its cylindrical frame is
$$
(\kappa\rho',\;\rho\theta_\tau,\;(-1)^j\kappa\zeta').
$$
Split the middle component using $\theta_\tau=\beta F'+\kappa q'$. The pure rotational vector has magnitude
$$
\rho\beta F'=\frac{u_0r_-}{\rho}\le u_0.
$$
The remaining vector has components bounded in magnitude by $\kappa(2A_r,2r_+A_p,H+3A_z)$. Its norm is at most $\kappa S=v_0$. The triangle inequality therefore gives the complete-time physical speed bound
$$
|V_j|\le u_0+v_0\le0.9<1
$$
for all six paths and all scales. This calculation does not require the total angular rate to be positive after adding $q'$; the norm bound remains valid either way.

At phase zero, $\zeta(0)=H+e\ge0.1>0$; at phase $\pi$, $\zeta(\pi)=-H-e\le-0.1<0$. The height changes sign uniformly in the box. All dimensionless positions lie within the ball of radius
$$
M=\sqrt{r_+^2+(H+A_z)^2}<\sqrt{1.354^2+1.342^2}.
$$
The exact decimal squares give $1.354^2+1.342^2=3.634280<3.6481=1.91^2$, so $M<1.91$ and the full dimensionless diameter is strictly less than $3.82$. The phase correction affects planar orientation but not this norm bound.

## Complete-past root count and divisor

Fix a receiver time and one source. Use normalized delay $\Delta=d/R$ and dimensionless separation $Q(\Delta)=X_i(t)/R-X_j(t-R\Delta)/R$. The physical speed bound implies source motion is Lipschitz with constant $v_*=0.9$ in this dimensionless delay, so
$$
\big||Q(\Delta_2)|-|Q(\Delta_1)|\big|\le v_*|\Delta_2-\Delta_1|.
$$
Hence the gap $g(\Delta)=|Q(\Delta)|-\Delta$ is strictly decreasing for increasing $\Delta$, with secant slopes at most $-(1-v_*)=-0.1$. This argument remains valid even away from roots where a separation might vanish.

For partners the present-time distances are $\sqrt{\rho^2+4\zeta^2}$ for neighbors, $\sqrt3\rho$ for the same-polarity pair, and $2\sqrt{\rho^2+\zeta^2}$ for the diametric source. Their minimum is at least $\rho>0.646$. Thus $g(0)>0$. At $\Delta=3.82$, bounded diameter gives $g(3.82)<0$, and beyond this value the diameter bound still rules out all roots. Continuity and strict decrease give exactly one positive root for each partner over the complete past.

At a positive self delay, $|X_i(t)-X_i(t-d)|/R\le v_*\Delta<\Delta$, so no positive self root exists. The root at zero is not an ordinary positive self root and is outside this root sum by the original definition, not by a new exclusion rule.

For a partner root, the transmitter divisor is $D=1-\widehat Q\cdot V_j(t-d)\ge1-|V_j|\ge0.1$. It is ordinary and simple. If $s=|Q(0)|$, the source displacement estimate gives $s\le|Q(\Delta)|+v_*\Delta=(1+v_*)\Delta$, so
$$
\frac dR=\Delta\ge\frac{s}{1.9}>\frac{0.646}{1.9}=0.34,
\qquad \Delta<3.82.
$$
These prove the all-time, all-scale chart, including every source and the ancient-delay complement. No phase sampling, retained-history cutoff or numerical root solver was used as evidence.

## Representation and verification boundary

A future evaluator must implement the continuous angular lift for arbitrary delayed phases, including negative phases and more than one period in either direction. Evaluating the principal arctangent without restoring its integer multiples of $\pi$ produces discontinuities. Replacing $F$ by $F$ modulo $\pi$ is also generally invalid in the common angle because its multiplier $\beta/\kappa$ need not turn that missing increment into an integer multiple of $2\pi$. One may reduce periodic quantities such as $F-\phi$ consistently, or use the integral/lift definition, but the complete angle difference must retain its accumulated rotation. No evaluator implementation is certified by this analytical review.

The two proposed period means are necessary for exact balance: $\langle\rho A_t\rangle=0$ follows by averaging the derivative of $\rho^2\theta_\tau$, and $\langle V\cdot A\rangle=0$ follows by averaging the derivative of $|V|^2/2$ after applying exact acceleration balance. Their vanishing is not sufficient for the full vector equation. A sampled proposal minimum cannot establish either a continuous zero or exact membership.

Falsifiers are a discontinuity in the stated lifted function, failure of its derivative or quasi-period increment, an incorrect speed/diameter bound, a missing or additional positive causal root, or a divisor below the proved floor within the declared box. A violation of $0.34<d/R<3.82$ would also falsify the delay estimate. Unnormalized delays outside those numerical bounds at other scales do not falsify it. The subject's incorrect strict comparison and physical-angular-rate wording should be corrected in the parent integration as stated at the start; they do not invalidate the repaired chart proof.

This review is analytical. The exact rational comparisons are displayed directly; no new numerical instrument, target or runtime receipt was required, and no empirical resource estimate is claimed. This report is the only authored deliverable. The frozen subject, prior reports/oracles and receipts, parent account and shared owners were not edited. No production run, regular tests, recursive reviewer, generator or Git mutation was used. No evidence was removed, moved or replaced, and no replay or remote-backup claim is made. The parent owns integration of the accepted chart and explicit corrections. Balance, exact-solution existence and any future evaluator's independent controls remain separate obligations.

Final scoped validation: native `shasum -a 256` reproduced the frozen subject identity above after the review. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for this new report; exit one denotes the new-file difference. The lift, derivative, speed and root-count arguments were reconstructed independently as displayed. No numerical branch implementation or future proposal instrument was run, so this validation is limited to the analytical chart and source formatting.
