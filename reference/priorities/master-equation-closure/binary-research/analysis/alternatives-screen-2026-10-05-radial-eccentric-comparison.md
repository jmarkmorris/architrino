# Finite-eccentricity radial-cycle drift for the three-halves comparison

## Comparison theorem and scope

Every noncircular bound radial cycle of the homogeneous $p=3/2$ central comparison has strictly positive first-order drift of its normalized radial scalar under the first-order delayed-response correction. There is no noncircular bound cycle whose first-order gain balances to zero. The associated averaged equation reaches the zero-scalar escape boundary at a finite change of logarithmic radius scale. These are comparison results, not an actual all-future fate theorem for the delayed equation.

The calculation was derived independently of the coordinator's eccentric-cycle reference and recorded before reading that reference. The selected physical response remains [the radial-power row](../../equation-variants/manuscript.md#15-other-radial-response-powers), $p=3/2$, $K=R_*=c_f=1$. The equation used below is expressly its first-order mathematical comparison. It does not replace the selected law, truncate its actual history in an asserted solution, or import a physical conserved energy. The central scalar is an antiderivative derived from this comparison's radial acceleration.

The [finite secular subject](alternatives-screen-2026-10-05-radial-rotating-fate.md) and [changing-scale transition subject](alternatives-screen-2026-10-05-radial-rotating-transition.md) are preserved. Their review status and finite-speed admission limits are not changed here.

## Exact first-order comparison

Use the same scaled mirror variables $r=|Y|$, $u=Y'\cdot n$, $h=Y\times Y'>0$, and small initial speed parameter $\epsilon$, where prime means the original scaled time $s$. The mathematical comparison retains exactly

$$
r'=u,\qquad
u'=\frac{h^2}{r^3}-r^{-3/2}-\frac{\epsilon u}{2r^{3/2}},\qquad
h'=\frac{\epsilon h}{r^{3/2}}.
$$

Here $u'$ is the radial-velocity derivative. Define $a=h^{4/3}$, $\delta=\epsilon a^{-1/4}$, $x=r/a$, $y=a^{1/4}u$, and $d\eta/ds=a^{-5/4}$. These exact coordinate changes give

$$
x_\eta=y-\frac43\delta x^{-1/2},\qquad
y_\eta=x^{-3}-x^{-3/2}-\frac16\delta yx^{-3/2},\qquad
\delta_\eta=-\frac13\delta^2x^{-3/2},\qquad
\frac{a_\eta}{a}=\frac43\delta x^{-3/2}.
$$

Setting $\delta=0$ defines the central control, with scalar

$$
e=\frac12y^2+U(x),\qquad U(x)=\frac1{2x^2}-2x^{-1/2}.
$$

Its derivative is zero because $U'(x)=-(x^{-3}-x^{-3/2})$. The potential has its unique minimum $U(1)=-3/2$, diverges at zero radius, and tends to zero from below at infinite radius. Thus every $-3/2<e<0$ has two simple turning radii $x_-(e)<1<x_+(e)$ and a noncircular periodic radial cycle. None of these central cycles is asserted to be a periodic solution of the delayed equation.

## Strict sign over every bound radial cycle

Evaluate the order-$\delta$ coefficient along a central cycle, holding $\delta$ fixed at this order. Direct differentiation gives

$$
e_\eta=\delta\left[-\frac16y^2x^{-3/2}+\frac43(x^{-3}-x^{-3/2})x^{-1/2}\right].
$$

On the central cycle $y_\eta=x^{-3}-x^{-3/2}$ and $x_\eta=y$. Periodic integration by parts therefore yields

$$
\oint y_\eta x^{-1/2}\,d\eta
=-\oint y\frac d{d\eta}x^{-1/2}\,d\eta
=\frac12\oint y^2x^{-3/2}\,d\eta.
$$

No endpoint term survives. Define the two positive weighted orbit integrals

$$
\begin{aligned}
I(e)&=\oint y^2x^{-3/2}\,d\eta
=2\int_{x_-}^{x_+}x^{-3/2}\sqrt{2[e-U(x)]}\,dx,\\
Q(e)&=\oint x^{-3/2}\,d\eta
=2\int_{x_-}^{x_+}\frac{x^{-3/2}}{\sqrt{2[e-U(x)]}}\,dx.
\end{aligned}
$$

Their integrable endpoint singularities are the ordinary square-root turning singularities. The first-order cycle coefficients are exactly

$$
\Delta e=\frac\delta2 I(e),\qquad
\Delta\log a=\frac43\delta Q(e),\qquad
\Delta\delta=-\frac13\delta^2Q(e).
$$

These displayed changes mean the leading per-cycle coefficients, not exact finite changes along a perturbed trajectory. On a compact interval of nondegenerate central cycles, actual comparison-cycle increments have higher-order errors. The strict coefficient $I(e)>0$ excludes a noncircular first-order balance anywhere in the bound interval. At the circular endpoint the coefficient vanishes, so this sign statement alone does not generate an initial radial oscillation.

Differentiating under the first integral, with its zero endpoint integrands, gives $I'(e)=Q(e)$. Thus the first-order averaged radius-scale equation has the particularly simple form

$$
\frac{de}{d\log a}=\frac38\frac{I(e)}{Q(e)},\qquad
\frac{d\log I}{d\log a}=\frac38.
$$

Consequently its weighted action $I$ grows in proportion to $a^{3/8}$. Here “weighted action” names this explicitly defined orbit integral; it is not an assumed physical account or an extra law of the delayed model.

## A coordinate that removes the infinite-radius period divergence

Introduce reciprocal square-root radius $z=x^{-1/2}>0$ and a weighted time $\chi$ by $d\chi/d\eta=x^{-3/2}=z^3$. The exact first-order comparison becomes

$$
z_\chi=-\frac12y+\frac23\delta z,\qquad
y_\chi=z^3-1-\frac16\delta y,\qquad
\delta_\chi=-\frac13\delta^2,\qquad
\frac{a_\chi}{a}=\frac43\delta.
$$

This polynomial system has bounded coefficients at $z=0$. Its central scalar is

$$
e=\frac12y^2+W(z),\qquad W(z)=\frac12z^4-2z.
$$

At zero correction, $z_\chi=-y/2$ and $y_\chi=z^3-1$, so $e_\chi=0$ directly. The radial turning at infinite $x$ becomes the regular point $z=0$, where $W'(0)=-2$. The central $e=0$ cycle touches this boundary at $y=0$; slightly positive central scalar gives an outgoing crossing with $y>0$. Extending the polynomial central oscillator to $z<0$ is a mathematical device for its orbit coordinates, not a negative physical radius or a continuation of the original variables beyond spatial infinity.

If $z_-(e)<z_+(e)$ are the positive turning values for $-3/2<e<0$, substitution gives

$$
I(e)=4\int_{z_-}^{z_+}\sqrt{2[e-W(z)]}\,dz,\qquad
Q(e)=4\int_{z_-}^{z_+}\frac{dz}{\sqrt{2[e-W(z)]}}.
$$

Thus $Q$ is precisely the central period in $\chi$, and $I=\oint y^2\,d\chi$. The turning roots remain simple as $e\uparrow0$: they tend to zero and $4^{1/3}$. Standard endpoint square-root substitution, performed separately near each simple root, supplies an integrable bound and proves continuity of both integrals at zero. No divergent physical-time period is inserted into these weighted integrals.

Direct evaluation at zero gives

$$
I(0)=\frac{8\pi}{3},\qquad
Q(0)=\frac23\,2^{1/3}B\left(\frac16,\frac12\right)>0,
$$

where $B(\alpha,\beta)=\int_0^1 t^{\alpha-1}(1-t)^{\beta-1}\,dt$ is the stated finite elementary beta integral. For example, in the original radius variable $y=2x^{-1/4}\sqrt{1-1/(4x^{3/2})}$ at $e=0$; the substitution $t=1/(4x^{3/2})$ gives $I(0)=(16/3)B(1/2,3/2)=8\pi/3$ and the displayed $Q(0)$. Their finiteness is a derived tail fact, not a numerical extrapolation.

Near the circular endpoint, with $E=e+3/2\downarrow0$ and $\kappa=\sqrt{3/2}$,

$$
Q(e)\longrightarrow\frac{2\pi}{\kappa},\qquad
I(e)=\frac{2\pi}{\kappa}E+O(E^2).
$$

This follows by the local quadratic potential or by the small central oscillator. The averaged logarithmic growth is $dE/d\log a=(3/8)E+O(E^2)$, so radial amplitude grows as $a^{3/16}$ in that limit. It agrees with the independently derived local changing-scale coefficient, without supplying that delayed theorem's remainder bounds.

For an averaged trajectory beginning at any fixed noncircular $e_0\in(-3/2,0)$, the radius-scale ratio at $e=0$ is finite:

$$
\frac{a_{\rm esc}}{a_0}=\left[\frac{I(0)}{I(e_0)}\right]^{8/3}.
$$

If its starting oscillatory scalar is of order $\epsilon^2$, this formula predicts $a_{\rm esc}\asymp\epsilon^{-16/3}$. This last statement remains a comparison prediction until the original delayed preparation, uniform remainder and escape crossing are connected.

## Canonical sign control

A separate algebraic control at $p=2$ uses $a=h^2$, $\delta=\epsilon/h$, and central $U_2(x)=1/(2x^2)-1/x$. Its exact first-order cycle coefficient is $\Delta e_2=2\delta I_2$, with $I_2=\oint y^2x^{-2}\,d\eta>0$. For the central elliptic parametrization $x=(1+e_c\cos\theta)^{-1}$, $y=e_c\sin\theta$ and $d\eta=x^2d\theta$, direct integration yields

$$
I_2=\pi e_c^2,\qquad Q_2=2\pi,\qquad
\Delta e_2=2\pi\delta e_c^2.
$$

The symbol $e_c$ here is the central eccentricity parameter, distinct from the normalized scalar $e_2=(e_c^2-1)/2$. This control fixes the torque and radial-damping signs without borrowing a conserved quantity from standard physics. The $p=2$ dynamics, delayed error bounds and admission thresholds do not supply premises for $p=3/2$ fate.

## The actual delayed bridge still required

The reciprocal coordinate shows that the divergent unweighted radial period is not itself a mathematical obstruction to controlling the last passage. The weighted central period and sign integral stay finite at zero scalar. A bounded-period argument in the original time still cannot be used there, and fixed-radius history estimates still do not reach $x\to\infty$.

The next specific requirement is a uniform actual delayed response estimate for bounded $y$ and $z\ge0$, allowing $x=z^{-2}$ to grow without bound. Its transverse remainder must retain the tangential-speed factor so that the normalized torque remains bounded after division by $x^{-3/2}$. An isotropic acceleration remainder is insufficient for that division. The estimate must retain the complete increasing causal window, prove source-scale comparability using exact positive torque, and include the compatible old preparation when a sampled window still reaches it.

If such an estimate supplies a bounded perturbation of the polynomial system through the final positive-scalar outgoing passage, reaching $z=0$ with $y>0$ would represent infinite physical time and outward scattering, not a finite-time collision or a new physical continuation rule. That implication itself requires the physical-time reconstruction and a proof of a common subfield margin. Neither the comparison sign nor the averaged equation alone establishes it.

**Grade and falsifiers:** the strict orbit-integral sign, $I'=Q$, polynomial coordinate transformation, finite endpoint integrals and canonical control are derived comparison results. Falsifiers are an incorrect integration-by-parts sign, missing coordinate term, a noncircular central cycle with $I\le0$, divergent claimed weighted endpoint integral, or a zero-scalar boundary not represented by the stated reciprocal coordinate. An actual delayed trajectory with a different fate would not by itself refute these comparison identities; it would refute any unsupported transfer to that trajectory.

**Ownership and validation:** this new source alone was authored for the finite-eccentricity comparison. The coordinator's independent sign source was not read before recording it, and the earlier two subjects were not edited. No numerical instrument, orbit integration, production solver, shared owner, Git publication or generator was used. The displayed substitutions and orbit integrals are the evidence; fresh independent assessment is separate. No owned process remains running.
