# Independent review of the quantitative negative-skew restriction

## Verdict and domain

**Derived and independently accepted:** the [frozen quantitative-skew subject](overnight2-b-quantitative-skew.md) proves its general necessary inequality, its parameter-dependent original-box restriction, and its uniform exclusion of the closed portion $f\ge-1/1250000$ at every $R>0$. No mathematical correction is required. The estimates below independently reconstruct the two acceleration components and all rational comparisons; they do not use numerical search or agreement with an instrument.

The scenario is the canonical law with $K=c_f=1$, complete six-member histories, alternating source polarity and axial sign, and
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),\qquad \phi=\kappa t/R.
$$
Here $R,\beta,\kappa,H>0$, $\rho\ge r_->0$, and the real $C^2$ profiles have a common phase period, as in the original $2\pi$-periodic class. The phase correction itself is periodic, so its derivative has zero mean. The height is
$$
z=H\cos\phi+e\cos3\phi+f\sin3\phi,\qquad A=\sqrt{e^2+f^2}\le H/4.
$$
The positive fundamental coefficient fixes the phase convention used to interpret the sign of $f$. The subject's declarations $B>0$ and $A\le H/4$ already exclude $H=0$. A common period is the meaning of the period average below; periodicity of unrelated incommensurate profiles alone would not justify a single finite-period integration.

Assume a complete-history physical-speed bound $|V_j|\le v_*<1$, and at the descending height zero assume every normalized causal delay obeys $\Delta_j\le d_+$, with $L=\kappa d_+<\pi$. No radius or phase reflection symmetry is assumed. These are finite-speed hypotheses, with no slow expansion or limiting orbit used.

## Complete chart and radial scale bound

At a fixed reception let $q_j(\Delta)$ be the normalized receiver-to-past-source vector, so the unsquared root gap is $G_j(\Delta)=|q_j(\Delta)|-\Delta$. For $\Delta_2>\Delta_1$, the global source-speed bound gives
$$
G_j(\Delta_2)-G_j(\Delta_1)\le-(1-v_*)(\Delta_2-\Delta_1)<0.
$$
For each partner $G_j(0)>0$ because its equal-time planar chord is nonzero. The same Lipschitz estimate gives $G_j(\Delta)\le G_j(0)-(1-v_*)\Delta$, so it eventually becomes negative. Continuity and strict decrease prove precisely one positive root per partner. For self, $|q_0(\Delta)|\le v_*\Delta<\Delta$ for every positive delay, so there is no positive self root. No part of the complete past is truncated in this argument.

At a root define $n_j=q_j/\Delta_j$ and the source divisor $D_{s,j}=1-n_j\cdot V_{s,j}$. Then
$$
1-v_*\le D_{s,j}\le1+v_*.
$$
All five roots are ordinary and the canonical absolute divisor equals this positive divisor. The [canonical branch law](../../../../../content/markdown/aaa/dynamics/master-equation.md) gives row norm $1/(\Delta_j^2D_{s,j})$.

Let $d_{0,j}$ be the equal-time source-receiver distance. The source travels at most $v_*\Delta_j$ between emission and reception in normalized coordinates. The triangle inequality therefore gives
$$
d_{0,j}\le\Delta_j+v_*\Delta_j,\qquad
\Delta_j\ge\frac{2\rho|\sin(j\pi/6)|}{1+v_*}.
$$
The axial part of $d_{0,j}$ can only strengthen its planar lower bound. Summing all five row norms yields
$$
|A_r|\le\frac{(1+v_*)^2}{(1-v_*)\rho^2}
\sum_{j=1}^{5}\frac1{4\sin^2(j\pi/6)}
=\frac{C_*}{\rho^2},\qquad C_*:=\frac{35(1+v_*)^2}{12(1-v_*)}.
$$
The five reciprocal squared planar-chord factors are $1,1/3,1/4,1/3,1$, whose sum is $35/12$. Source polarities cannot increase the norm bound.

Write physical acceleration as $A/R^2$ for the canonical sum and $\mathcal L/R$ for the prescribed path. Exact balance is $A=R\mathcal L$. With $\omega=\beta+\kappa p'$, cylindrical differentiation gives
$$
\mathcal L_r=\kappa^2\rho''-\rho\omega^2.
$$
Multiplication by $\rho$ and integration over the common period give the exact identity
$$
R\left\langle\kappa^2(\rho')^2+\rho^2\omega^2\right\rangle=-\langle\rho A_r\rangle.
$$
The sign follows from $\langle\rho\rho''\rangle=-\langle(\rho')^2\rangle$; the endpoint term vanishes by periodicity. Weighted Cauchy–Schwarz applies to $\rho\omega$ and $\rho^{-1}$:
$$
\beta^2=\langle\omega\rangle^2\le\langle\rho^2\omega^2\rangle\langle\rho^{-2}\rangle
\le\frac{\langle\rho^2\omega^2\rangle}{r_-^2}.
$$
This uses only positive mean rotation; the instantaneous $\omega$ may change sign. On the right side of the period identity,
$$
-\langle\rho A_r\rangle\le\langle\rho|A_r|\rangle\le C_*\langle\rho^{-1}\rangle\le C_*/r_-.
$$
Since $\beta,r_->0$, division is legitimate and proves
$$
\boxed{R\le\frac{C_*}{r_-^3\beta^2}.}
$$
This is a necessary acceleration identity and inequality, with no imported energy or other physical premise.

## Exact delayed-height lower bound

The [independent third-harmonic review](overnight2-b-independent-third-harmonic-skew.md) proves two simple zeros per $2\pi$ period, with a unique descending zero $\phi_0\in(0,\pi)$, $|\cos\phi_0|\le A/H$, and a positive preceding lobe of length $\pi$. For completeness, zeros must lie in the strips $|\cos\phi|\le A/H$; in the first strip
$$
z'\le-\sqrt{H^2-A^2}+3A<0.
$$
The endpoints have opposite weak signs, and anti-periodicity supplies the second zero. The strict derivative holds at the amplitude boundary $A=H/4$ because $\sqrt{15}>3$.

Set
$$
C=H\cos\phi_0,\qquad B_0=H\sin\phi_0,\qquad F=e\sin3\phi_0-f\cos3\phi_0.
$$
The zero condition gives $e\cos3\phi_0+f\sin3\phi_0=-C$. Orthogonality of this two-coordinate rotation implies $C^2+F^2=A^2$. Also $B_0=\sqrt{H^2-C^2}\ge\sqrt{H^2-A^2}$, using $\phi_0\in(0,\pi)$.

Independent angle subtraction gives, for every $0<\alpha<\pi$,
$$
\begin{aligned}
z(\phi_0-\alpha)
&=C(\cos\alpha-\cos3\alpha)+B_0\sin\alpha+F\sin3\alpha\\
&=\sin\alpha\,[B_0+4C\sin\alpha\cos\alpha+F(3-4\sin^2\alpha)].
\end{aligned}
$$
The coefficient-vector squared norm is exactly
$$
16\sin^2\alpha\cos^2\alpha+(3-4\sin^2\alpha)^2=9-8\sin^2\alpha\le9.
$$
Cauchy–Schwarz therefore bounds the last two bracket terms below by $-3A$. Defining $B=\sqrt{H^2-A^2}-3A>0$, we obtain
$$
z(\phi_0-\alpha)\ge B\sin\alpha.
$$
The ratio $\sin\alpha/\alpha$ strictly decreases on $(0,\pi)$: its derivative numerator $\alpha\cos\alpha-\sin\alpha$ vanishes at zero and has derivative $-\alpha\sin\alpha<0$. Thus with $s_L=\sin L/L>0$,
$$
z(\phi_0-\kappa\Delta_j)\ge B s_L\kappa\Delta_j.
$$
This holds at every actual implicit root, including a root attaining $d_+$.

At zero current height, source polarity cancels from the axial numerator. The independently reconstructed [zero-crossing identity](overnight2-b-independent-zero-crossing.md) consequently gives
$$
-A_z(\phi_0)=\sum_{j=1}^{5}\frac{z(\phi_0-\kappa\Delta_j)}{\Delta_j^3D_{s,j}}
\ge\frac{5B s_L\kappa}{d_+^2(1+v_*)}>0.
$$
The denominator here is the source divisor, not a receiver divisor. Both its upper bound and the delay upper bound are used in the direction that lowers each positive contribution. The count of five is supplied by the complete chart proved above.

## Curvature estimate and composition

Differentiating the height twice gives $z''=-9z+8H\cos\phi$, so $z''(\phi_0)=8H\cos\phi_0$. The zero equation separately gives
$$
\cos\phi_0\,[H+e(4\cos^2\phi_0-3)]=-f\sin3\phi_0.
$$
Since $4\cos^2\phi_0-3\in[-3,1]$, the bracket is at least $g:=H-3|e|>0$. Hence
$$
|z''(\phi_0)|\le\frac{8H|f|}{g}.
$$
The negative canonical axial sum requires $z''(\phi_0)<0$ under exact balance $A_z=R\kappa^2z''$. The independent zero-location argument determines its coefficient sign: $z(\pi/2)=-f$, and strict decrease on the zero strip makes $\operatorname{sgn}z''(\phi_0)=\operatorname{sgn}f$. Therefore $f<0$ necessarily.

Combining the lower axial magnitude, the curvature upper bound, and the radial scale upper bound gives
$$
\frac{5B s_L\kappa}{d_+^2(1+v_*)}
\le |A_z|=R\kappa^2|z''|
\le\frac{C_*}{r_-^3\beta^2}\kappa^2\frac{8H(-f)}{g}.
$$
Every divisor is strictly positive under the stated hypotheses. Rearrangement proves precisely
$$
\boxed{-f\ge\frac{5B s_L g r_-^3\beta^2}{8H\kappa d_+^2(1+v_*)C_*}>0.}
$$
The nonstrict comparison in this general statement is valid; no unjustified equality exclusion is needed. The original-box simplifications below have explicit strict margins.

## Original coefficient box and exact rational margins

The [accepted original chart](overnight2-b-independent-chart.md) supplies $\rho\ge22/25$, speed below $801/1000$, and every normalized delay below $2789/1000<14/5$, at every reception and throughout the closed coefficient box. In particular the chart applies at the varying descending zero. Its height coefficients satisfy $A^2\le2/625<1/256\le H^2/16$, so the general amplitude hypothesis holds. Use the conservative constants
$$
r_-=\frac{22}{25},\quad v_*=\frac{801}{1000},\quad d_+=\frac{14}{5},\quad \kappa\le\frac7{20}.
$$
From $A\le H/4$,
$$
\frac BH\ge\frac{\sqrt{15}-3}{4}>\frac15.
$$
The strict inequality is equivalent to $\sqrt{15}>19/5$, justified by $375>361$ after squaring and multiplying by $25$. Next $L\le49/50<1$. The elementary bound $\sin L\ge L-L^3/6$ gives $s_L\ge1-L^2/6>5/6$. For example this sine bound follows by integrating $\cos t\ge1-t^2/2$, itself a consequence of $1-\cos t=2\sin^2(t/2)\le t^2/2$.

Since $1+v_*=1801/1000<181/100$,
$$
\frac{5B s_L}{d_+^2(1+v_*)}
>\frac{12500H}{212856}>\frac H{18}.
$$
The final cross-product difference is $12500\cdot18-212856=12144>0$. Thus the axial magnitude is strictly greater than $\kappa H/18$.

The radial constant is exactly
$$
C_*=
\frac{113526035}{2388000}<48,
$$
because $48\cdot2388000-113526035=1097965>0$. Also
$$
\frac{48}{(22/25)^3}=\frac{750000}{10648}<71,
$$
because $71\cdot10648-750000=6008>0$. Hence $R<71/\beta^2$. The two strict margins imply
$$
\frac{\kappa H}{18}<|A_z|
\le R\kappa^2\frac{8H(-f)}g
<\frac{71\kappa^2}{\beta^2}\frac{8H(-f)}g,
$$
where $-f>0$ was already proved. Since $18\cdot71\cdot8=10224$, this establishes the subject's strict parameter-dependent condition
$$
\boxed{f<-\frac{(H-3|e|)\beta^2}{10224\kappa}.}
$$
Finally, in the original box $g\ge13/100$, $\beta\ge3/20$, and $\kappa\le7/20$. Therefore
$$
\frac{g\beta^2}{10224\kappa}
\ge\frac{117}{143136000}
>\frac1{1250000}.
$$
The strict cross-product difference is $117\cdot1250000-143136000=3114000>0$. Consequently every exact member must have $f<-1/1250000$. This excludes the entire closed portion $f\ge-1/1250000$, including its boundary, at every positive scale. The parameter-dependent bound is stronger; neither bound admits or establishes an exact history among the remaining negative coefficients.

## Verification, falsifiers and preservation

The proof is analytical and independently reconstructs the weighted period identity, five-row radial estimate, exact lag identity, coefficient norm, curvature bound and their composition. There is no computational target, numerical evidence, asymptotic approximation or known-first numerical stage. The Moore role supplies a review lens rather than authority for the result. The canonical law and the accepted chart and zero arguments remain explicit dependencies.

A missing ordinary root, a wrong source divisor, a violation of the source-speed delay comparison, a nonperiodic phase correction with nonzero derivative mean, or a reversed integration-by-parts sign would defeat the corresponding argument. A waveform in the stated harmonic class violating the exact lag identity or its lower bound would falsify the axial estimate. An exact complete history satisfying all hypotheses while violating the boxed skew condition would directly refute the theorem. General-speed multiple-root charts, earlier-lobe delays, vanishing mean rotation, absent radius floor, different harmonic content or a different phase convention require a separate argument. They are outside this theorem, not counterexamples to its scoped conclusion.

Native `shasum -a 256` identifies the frozen subject as `73c331eb6f98acc4aaf604bf9e1c74615b89a9ae54ead72b0bc1dabadece20e6`. The accepted third-harmonic independent report is `be5c387649b323205a98234686a07dac096bd0d9fe7d01d3a2ba422708b7a206`, the zero-crossing independent report is `67df2834e8cb6b496e57513c3c684022fff2e786399da5345d96f06dd0c2c1a0`, and the accepted chart report is `b1b714e8bd9db26d446edabe22c0c52934da414b5c69eef2166bfab4a1fd58e2`. Final native hashing checks those identities. `git diff --no-index --check /dev/null` checks only this new report's whitespace; exit one without diagnostics denotes the new-file difference.

Only this independent Markdown report was authored. The frozen subject, all prior proofs, oracles, instruments, receipts, the parent receiving account and shared owners remained read-only. No numerical job, runtime evidence write, delegation, Git mutation, generator or sidebar action was used. The parent's numerical slot was untouched. Parent integration into the current second-allocation account is the remaining disposition step; this bounded review is complete.
