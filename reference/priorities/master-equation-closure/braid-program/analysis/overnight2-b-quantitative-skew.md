# Quantitative negative height skew from simultaneous radial and axial balance

## Claim and its domain

Claim grade: derived, pending independent reconstruction. The qualitative third-harmonic sign condition can be strengthened by using radial balance to bound the common scale. Consider the canonical complete six-member histories with $K=c_f=1$,
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),\quad \tau=t/R,\quad\phi=\kappa\tau,
$$
where $R,\beta,\kappa>0$, and $\rho,p,z$ are $C^2$ periodic profiles with $\rho>0$. The phase correction $p$ is a real periodic function, so $\langle p'\rangle=0$. The height is
$$
z=H\cos\phi+e\cos3\phi+f\sin3\phi,\qquad A=\sqrt{e^2+f^2}\le H/4.
$$
All ordinary positive-delay partner and self roots are included. A complete-history speed bound $|V_j|\le v_*<1$ gives exactly five ordinary partner roots, no positive self roots and $1-v_*\le D_s\le1+v_*$. Let $\rho\ge r_->0$, and let every root at the descending height zero have $\Delta\le d_+$, with $L:=\kappa d_+<\pi$. Define
$$
B=\sqrt{H^2-A^2}-3A>0,\qquad g=H-3|e|>0,\qquad s_L=\frac{\sin L}{L}>0,
$$
$$
C_*:=\frac{35(1+v_*)^2}{12(1-v_*)}.
$$
Then exact full-vector balance necessarily requires
$$
\boxed{-f\ge\frac{5B\,s_L\,g\,r_-^3\beta^2}{8H\kappa d_+^2(1+v_*)C_*}>0.}
$$
The inequality is necessary, not sufficient. It excludes an explicit interval of negative $f$ next to zero, as well as the nonnegative half. No small-speed expansion, finite sampling or optimizer residual enters the argument.

## A scale bound from the radial equation

Write the exact dimensionless acceleration as $A/R^2$ and the prescribed acceleration as $L/R$, so exact balance is $RL=A$. Set $\omega=\beta+\kappa p'$. The radial demand is $L_r=\kappa^2\rho''-\rho\omega^2$. Multiplying radial balance by $\rho$ and averaging a period gives
$$
R\left\langle\kappa^2(\rho')^2+\rho^2\omega^2\right\rangle=-\langle\rho A_r\rangle.
$$
Integration by parts has no boundary term. Cauchy–Schwarz, together with $\langle\omega\rangle=\beta$, yields
$$
\langle\rho^2\omega^2\rangle\langle\rho^{-2}\rangle\ge\beta^2,
\qquad\left\langle\kappa^2(\rho')^2+\rho^2\omega^2\right\rangle\ge r_-^2\beta^2.
$$
This step permits arbitrary phase asymmetry and does not replace the variable angular speed by its mean pointwise.

At every reception, the present planar chord to partner $j$ is $2\rho|\sin(j\pi/6)|$. Any axial separation only increases the present distance. The complete-history speed bound and root equation imply
$$
\Delta_j\ge\frac{2\rho|\sin(j\pi/6)|}{1+v_*}.
$$
The norm of each canonical contribution is $1/(\Delta_j^2D_{s,j})$. Since
$$
\sum_{j=1}^5\frac1{4\sin^2(j\pi/6)}=2+\frac23+\frac14=\frac{35}{12},
$$
we obtain $|A_r|\le C_*/\rho^2$. Thus
$$
-\langle\rho A_r\rangle\le\langle\rho|A_r|\rangle\le C_*/r_-,
\qquad\boxed{R\le\frac{C_*}{r_-^3\beta^2}.}
$$
No conserved energy or standard-physics law is imported; this is a necessary period identity of the canonical acceleration equation.

## A lower bound on every emitted height

The [third-harmonic zero argument](overnight2-b-third-harmonic-skew.md) gives one descending zero $\phi_0$ in $(0,\pi)$, with $|\cos\phi_0|\le A/H$, and a positive preceding half-cycle. For a phase lag $\alpha\in(0,\pi)$ put
$$
C=H\cos\phi_0,\quad B_0=H\sin\phi_0,\quad F=e\sin3\phi_0-f\cos3\phi_0.
$$
At the zero, $e\cos3\phi_0+f\sin3\phi_0=-C$, so $C^2+F^2=A^2$ and $B_0\ge\sqrt{H^2-A^2}$. Exact angle subtraction gives
$$
z(\phi_0-\alpha)=\sin\alpha\left[B_0+4C\sin\alpha\cos\alpha+F(3-4\sin^2\alpha)\right].
$$
The squared norm of the last two coefficients is
$$
(4\sin\alpha\cos\alpha)^2+(3-4\sin^2\alpha)^2=9-8\sin^2\alpha\le9.
$$
Therefore $z(\phi_0-\alpha)\ge B\sin\alpha$. Since $\sin\alpha/\alpha$ decreases on $(0,\pi)$, every root obeys
$$
z(\phi_0-\kappa\Delta_j)\ge B\,s_L\kappa\Delta_j.
$$
The complete zero-height identity cancels all partner polarities:
$$
-A_z(\phi_0)=\sum_{j=1}^5\frac{z(\phi_0-\kappa\Delta_j)}{\Delta_j^3D_{s,j}}
\ge\frac{5B\,s_L\kappa}{d_+^2(1+v_*)}>0.
$$
Both the lower delayed-height bound and the divisor bound hold at the actual implicit roots. No root is frozen while varying the waveform.

## Converting curvature to the sine coefficient

At the zero, $z''(\phi_0)=8H\cos\phi_0$. The zero equation also reads
$$
\cos\phi_0\,[H+e(4\cos^2\phi_0-3)]=-f\sin3\phi_0.
$$
The bracket is at least $g=H-3|e|>0$, giving
$$
|z''(\phi_0)|\le\frac{8H|f|}{g}.
$$
The strictly negative axial sum requires $z''<0$ under exact balance; the zero-location argument therefore gives $f<0$. Taking magnitudes in $R\kappa^2z''=A_z$, applying the axial lower bound, then the radial upper bound on $R$, proves the displayed quantitative condition. This use of two components is essential: the axial equation alone could compensate an arbitrarily small negative curvature by choosing an arbitrarily large scale.

## Explicit original-box consequence

In the original independently admitted box, $r_-=22/25$, $v_*=801/1000$, $d_+=14/5$, $\kappa\le7/20$ and $A\le H/4$. These deliberately conservative constants give
$$
B>H/5,\qquad L\le49/50<1,\qquad s_L>5/6,
$$
$$
\frac{5B s_L}{d_+^2(1+v_*)}>\frac H{18}.
$$
For the last inequality it suffices to replace $1+v_*$ by $181/100$ and verify $12500/212856>1/18$ by integer cross multiplication. Also $C_*<48$ and $48/(22/25)^3<71$, giving $R<71/\beta^2$. Consequently every exact history in that box must satisfy the simpler strict condition
$$
\boxed{f<-\frac{(H-3|e|)\beta^2}{10224\kappa}.}
$$
Since $H-3|e|\ge13/100$, $\beta\ge3/20$ and $\kappa\le7/20$, the right-hand magnitude exceeds $1/1250000$. Hence the closed portion
$$
\boxed{f\ge-\frac1{1250000}}
$$
of the original box is excluded at every positive scale. The parameter-dependent condition is generally stronger than this uniform floor. The remaining more negative coefficients have no admission claim.

## Verification boundary and falsifiers

This subject is a new analytical extension; independent reconstruction is pending. The accepted complete chart and zero-height identity are named dependencies. The new obligations are the weighted radial scale bound, exact harmonic lag inequality, curvature-to-coefficient estimate and their composition. A wrong period integration, failure of the present-chord delay lower bound, missing root, reversed divisor, wrong trigonometric identity or violation of the proposed bound by an exact admitted history would defeat the corresponding claim. Positive mean rotation, a periodic real phase correction, a positive radius floor, the harmonic-size bound and the short-lag condition are essential assumptions.

No numerical job or search is needed. All earlier subjects and independent references remain frozen. The receiving account is the second overnight B report; its parent owns integration and the reviewer owns a separate independent report.
