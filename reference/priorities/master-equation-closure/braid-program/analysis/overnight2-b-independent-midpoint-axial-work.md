# Independent review of the finite-speed midpoint axial-work theorem

## Verdict and exact scope

**Derived and independently accepted:** the [frozen midpoint axial-work theorem](overnight2-b-midpoint-axial-work.md) is valid under its stated hypotheses, including its two quantitative mean lower bounds. No mathematical repair is required. The proof below reconstructs the endpoint geometry, complete causal-root inventory, change of phase measure and polarity-dependent numerators directly from the canonical acceleration law. It uses no numerical work-mean result and no imported physical energy premise.

The scenario is the canonical equation with $K=c_f=1$, alternating polarity product $\sigma_j=(-1)^j$ between receiver zero and partner $j$, and complete histories
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jH\cos\phi\bigr),
\qquad \phi=\kappa t/R.
$$
Assume $R,H,\kappa>0$, real $\beta$, real $2\pi$-periodic $C^2$ profiles $\rho,p$, a common reflection center with $\rho(-\phi)=\rho(\phi)$ and $p(-\phi)=-p(\phi)$, global bounds $0<r_-\le\rho\le r_+$, and one uniform physical speed bound $|\dot X_j|\le v_*<1$. Every ordinary partner delay must satisfy $0<\kappa\Delta<\pi$, where $\Delta=(t_r-t_s)/R$. Alternating axial signs and alternating interaction polarities are both used; neither may be silently changed.

Let $A$ denote the dimensionless canonical acceleration, so physical acceleration is $A/R^2$. The accepted conclusion is
$$
\langle V_zA_z\rangle_\phi>0,
\qquad V_z=-\kappa H\sin\phi,
\qquad \langle F\rangle_\phi=\frac1{2\pi}\int_0^{2\pi}F(\phi)\,d\phi.
$$
This excludes exact canonical acceleration balance for every $R>0$ within the stated reflection class. It does not assert pointwise positive axial work, balance of any prescribed member, stability, or an exclusion of arbitrary asymmetric profiles. The separate neighborhood and reflection-extension subjects are outside this review.

## Complete reception and midpoint root charts

The [canonical branch sum](../../../../../content/markdown/aaa/dynamics/master-equation.md) gives the dimensionless ordinary contribution
$$
A_j=\frac{\sigma_jQ_j}{\Delta_j^3D_s},\qquad
D_s=1-n\cdot V_s,\qquad
n=Q_j/|Q_j|,
$$
where $Q_j=[X_0(t_r)-X_j(t_s)]/R$, $V_s=\dot X_j(t_s)$ and the causal root obeys $|Q_j|=\Delta_j$. Below-wake-speed motion makes $D_s>0$, so its absolute value in the canonical weight equals $D_s$.

At fixed reception time, set $Q_j(\Delta)=[X_0(t_r)-X_j(t_r-R\Delta)]/R$. The source speed bound implies
$$
\big||Q_j(\Delta_2)|-|Q_j(\Delta_1)|\big|\le v_*|\Delta_2-\Delta_1|.
$$
Hence every positive secant of the gap $G_j(\Delta)=|Q_j(\Delta)|-\Delta$ lies between $-(1+v_*)$ and $-(1-v_*)$. This argument also covers accidental zero separation away from the causal root, where differentiation of the norm would be unavailable.

At zero delay the planar partner chord is $2\rho(\phi)|\sin(j\pi/6)|\ge r_-$ for all $j=1,\ldots,5$. Thus $G_j(0)>0$. Every dimensionless position lies in the fixed ball of radius $B=\sqrt{r_+^2+H^2}$, so $G_j(2B)\le0$ and $G_j(\Delta)<0$ whenever $\Delta>2B$. Continuity and strict decrease give exactly one positive partner root. The self displacement satisfies $|X_0(t_r)-X_0(t_r-R\Delta)|/R\le v_*\Delta<\Delta$, so no positive self root exists. This covers the complete past rather than a truncated delay interval. At each partner root $Q_j\ne0$ and
$$
1-v_*\le D_s\le1+v_*.
$$
The same secant estimate and present-time chord give the common delay bounds
$$
d_-:=\frac{r_-}{1+v_*}\le\Delta_j\le d_+:=2\sqrt{r_+^2+H^2}.
$$
Consequently $\kappa d_+<\pi$ is a sufficient condition for the required delay-phase restriction.

For an independent midpoint construction, hold $t_m=R\theta/\kappa$ fixed and set $t_r=t_m+R\Delta/2$, $t_s=t_m-R\Delta/2$. In inertial Cartesian coordinates,
$$
\partial_\Delta Q_j=\frac{V_r+V_s}{2},\qquad V_r=\dot X_0(t_r).
$$
The source contribution has a plus sign because its endpoint moves backward as the subtracted position is differentiated. Both endpoint speeds are bounded by $v_*$, so the norm of this derivative is at most $v_*$. The midpoint gap therefore has the same global strict secant decrease, positive zero-delay chord, bounded-diameter crossing and ancient-root exclusion. For every $\theta$ there is exactly one midpoint root $\Delta_j(\theta)>0$. Its derivative divisor is
$$
D_m=1-\partial_\Delta|Q_j|
=1-\frac{n\cdot V_r+n\cdot V_s}{2}
=\frac{D_r+D_s}{2},\qquad D_r=1-n\cdot V_r.
$$
In particular $1-v_*\le D_m\le1+v_*$. The receiver divisor here is a derivative identity; it is not an additional multiplier in the acceleration law. At roots the implicit-function theorem applies because separation is nonzero and $D_m$ is bounded away from zero.

## Reflection of the root and the exact phase measure

Write $a=\kappa\Delta/2$, $\phi_+=\theta+a$, $\phi_-=\theta-a$, and $r_\pm^{\rm loc}=\rho(\phi_\pm)$. In a frame rotated with the receiver, the relative planar angle is
$$
\alpha_j=j\pi/3-\beta\Delta+p(\theta-a)-p(\theta+a).
$$
The squared distance is
$$
S_j=(r_+^{\rm loc})^2+(r_-^{\rm loc})^2-2r_+^{\rm loc}r_-^{\rm loc}\cos\alpha_j
+H^2[\cos(\theta+a)-\sigma_j\cos(\theta-a)]^2.
$$
Under $\theta\mapsto-\theta$, even radius exchanges the local radii and odd phase leaves the phase difference unchanged. The axial difference is $-2H\sin\theta\sin a$ for $\sigma_j=+1$ and $2H\cos\theta\cos a$ for $\sigma_j=-1$. Its square is even in either case. Thus $S_j(-\theta,\Delta)=S_j(\theta,\Delta)$ for each individual partner, with no pairing or relabeling of $j$ needed.

Uniqueness now gives an even midpoint root $\Delta_j(-\theta)=\Delta_j(\theta)$. The squared-distance formula is $2\pi$-periodic in $\theta$, so uniqueness also gives $2\pi$-periodicity. Near each root $\sqrt{S_j}$ is smooth; its partial delay derivative inherits evenness. Therefore the evaluated $D_m(\theta)$ and $a(\theta)$ are even and periodic as well. Absolute planar angle need not return after a height period: its common rotation cancels from the distance and from the axial quantities.

To reconstruct the phase Jacobian directly, let $g(\phi,\Delta)$ be the reception-phase gap. At fixed delay, both physical endpoint times advance at rate $R/\kappa$ as $\phi$ varies. Hence, at a root,
$$
g_\Delta=-D_s,\qquad
\kappa g_\phi=n\cdot(V_r-V_s)=D_s-D_r.
$$
The midpoint gap is $g(\theta+\kappa\Delta/2,\Delta)$. Its delay derivative at fixed $\theta$ is $-D_s+(\kappa/2)g_\phi=-D_m$, consistently with the inertial calculation. Along its root,
$$
\Delta_j'(\theta)=\frac{g_\phi}{D_m},\qquad
\frac{d\phi}{d\theta}=1+\frac\kappa2\Delta_j'(\theta)
=\frac{D_s}{D_m}>0.
$$
Thus
$$
\boxed{\frac{d\phi}{D_s}=\frac{d\theta}{D_m}}.
$$
Periodicity of $\Delta_j$ makes $\phi(\theta+2\pi)=\phi(\theta)+2\pi$. Together with the positive derivative, this is a degree-one increasing change of phase variable covering a full receiver cycle once. Each channel may use its own such change of variable. No multiplicity, endpoint correction or phase-weight factor is omitted.

## Independent polarity calculation and strict mean sign

At a midpoint root the receiver velocity is $V_z=-\kappa H\sin(\theta+a)$, whereas the axial separation is $Q_z=H[\cos(\theta+a)-\sigma_j\cos(\theta-a)]$. The source velocity appears only in $D_s$; substituting it for the current receiver velocity would change this calculation.

For the two same-polarity partners, $j=2,4$, direct multiplication gives
$$
\sigma_jV_zQ_z
=2\kappa H^2\sin\theta\sin a\,\sin(\theta+a)
=2\kappa H^2[\sin^2\theta\sin a\cos a+\sin\theta\cos\theta\sin^2a].
$$
For the three opposite-polarity partners, $j=1,3,5$, the negative polarity reverses the negative receiver-velocity sign, giving
$$
\sigma_jV_zQ_z
=2\kappa H^2\cos\theta\cos a\,\sin(\theta+a)
=2\kappa H^2[\sin\theta\cos\theta\cos^2a+\cos^2\theta\sin a\cos a].
$$
After the exact phase change, the common denominator is $\Delta_j^3D_m$. Each mixed term is odd in $\theta$ because every other factor in it is even. Its integral over $[-\pi,\pi]$ vanishes. Using $2\sin a\cos a=\sin(\kappa\Delta_j)$ leaves the exact identity
$$
\boxed{
\langle V_zA_{z,j}\rangle
=\frac{\kappa H^2}{2\pi}\int_{-\pi}^{\pi}
\frac{f_{\sigma_j}(\theta)\sin(\kappa\Delta_j(\theta))}
{\Delta_j(\theta)^3D_m(\theta)}\,d\theta,
\qquad f_{+1}=\sin^2\theta,\quad f_{-1}=\cos^2\theta.
}
$$
The delay-phase hypothesis makes the sine strictly positive. Both denominators are positive. Each $f_{\sigma_j}$ is positive on an open interval; the remaining factors are continuous there. Thus all five channel means are individually strictly positive, proving strict positivity of their sum. This argument does not require their roots to coincide, nor the instantaneous axial work to have one sign.

For exact balance the physical axial acceleration is both $A_z/R^2$ and $\kappa^2\zeta''/R$, with $\zeta(\phi)=H\cos\phi$. Therefore $A_z=R\kappa^2\zeta''$ and
$$
\langle V_zA_z\rangle
=R\kappa^3\langle\zeta'\zeta''\rangle
=\frac{R\kappa^3}{4\pi}\big[(\zeta')^2\big]_0^{2\pi}=0.
$$
The contradiction holds for every $R>0$. The corresponding physical velocity–acceleration mean is $\langle V_zA_z\rangle/R^2$ and has the same sign. This is an exact periodic derivative identity, with no assumption about physical energy conservation.

## Both quantitative margins

Suppose the explicit common bounds obey $0<\kappa d_-\le\kappa d_+<\pi$. Concavity of sine on $[0,\pi]$ ensures that its minimum on this subinterval occurs at an endpoint, so
$$
s_*:=\min\{\sin(\kappa d_-),\sin(\kappa d_+)\}>0.
$$
With $\Delta_j\le d_+$ and $D_m\le1+v_*$, the exact integral yields
$$
\langle V_zA_{z,j}\rangle
\ge\frac{\kappa H^2s_*}{2\pi d_+^3(1+v_*)}\int_{-\pi}^{\pi}f_{\sigma_j}\,d\theta
=\frac{\kappa H^2s_*}{2d_+^3(1+v_*)}.
$$
Both squared trigonometric functions integrate to $\pi$, irrespective of polarity. Summing exactly five partners proves the first claimed bound:
$$
\boxed{\langle V_zA_z\rangle\ge\frac{5\kappa H^2s_*}{2d_+^3(1+v_*)}>0.}
$$
For the sharper small-lag form assume $\kappa d_+\le1$. Let $E(x)=\sin x-x+x^3/6$. Its first three initial values $E(0),E'(0),E''(0)$ vanish, while $E'''(x)=1-\cos x\ge0$ for $x\ge0$. Three integrations prove $\sin x\ge x-x^3/6$. Hence
$$
\frac{\sin(\kappa\Delta_j)}{\Delta_j^3}
\ge\frac\kappa{\Delta_j^2}-\frac{\kappa^3}{6}
\ge\frac\kappa{d_+^2}\left[1-\frac{(\kappa d_+)^2}{6}\right].
$$
The bracket is at least $5/6$, and another application of the exact integral gives
$$
\boxed{\langle V_zA_z\rangle\ge\frac{5\kappa^2H^2}{2d_+^2(1+v_*)}\left[1-\frac{(\kappa d_+)^2}{6}\right]>0.}
$$
Both constants and powers agree with direct integration. A uniform family statement requires genuinely common bounds: positive height and rate floors, bounded $d_+$, and for the first formula a common positive lower bound for $s_*$. Pointwise strictness without a common margin does not alone give a uniform positive infimum. The subject's compact-subdomain qualification supplies the intended restriction; no numerical perturbation radius is obtained here.

## Verification, falsifiers and preservation

The subject identity measured with native `shasum -a 256` is `a6ca012a9223cdcd828f4acd16d2fc71b4cc76a9212301b38f5ec59ace7283bb`. The current canonical transmitter-weight branch equation, the live Specialist charter and the assigned interval/all-root analytical lens were inspected. The role supplies a review discipline, not a mathematical premise or acceptance authority. This report's evidence is the separate analytical reconstruction above; no subject instrument, saved numerical mean, numerical target or known-first computational stage was needed.

The decisive operator-checkable falsifiers are a history satisfying every stated assumption but lacking exactly five ordinary partner roots or admitting a positive self root; a violation of the displayed endpoint derivative or phase Jacobian; failure of either direct polarity expansion; or a nonpositive full-period axial-work mean for such a history. The exact lower-bound claims would also be refuted by a permitted profile whose mean lies below either applicable displayed bound. Changing the canonical transmitter weight, allowing a zero divisor, losing the shared reflection center, or allowing a delay phase outside $(0,\pi)$ changes the premises and does not falsify this scoped result.

Only this new independent Markdown report was authored. The subject, previous references and independent reports, parent account, shared owners, instruments and runtime evidence were read-only. No companion, numerical run, generator, Git mutation or recursive delegation was used. Native whitespace checking and final subject hashing provide file-level validation, distinct from the analytical proof. The theorem requires no repair within its scope; parent integration is the remaining disposition step. The neighborhood and further reflection subjects remain unreviewed here.
