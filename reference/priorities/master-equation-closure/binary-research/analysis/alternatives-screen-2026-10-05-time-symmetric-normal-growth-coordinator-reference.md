# Real exponential normal variations of the equal-past/future circle

**Derived candidate, frozen before independent worker assessment.** The case is the selected equal-past/future canonical radial comparison law, opposite polarities, $K=c_f=1$, and the complete balanced circle at any fixed $0<\beta<1$. Put $x=\beta\cos x$, $c=\cos x$, $D=1+\beta\sin x$, $R=(4\beta^2cD)^{-1}$, $\omega=\beta/R$ and $\tau=2Rc$. This is a whole-line variational boundary problem. No causal initial-value solution operator is assumed.

## Independent normal reduction

Write $z_i(T)$ for a Cartesian variation perpendicular to the base circle plane. The complete root equation has first variation proportional to the base ray dotted into the relative displacement. This vanishes for a purely normal variation, so the first root shift is zero. The source-acceleration term that multiplies that shift vanishes for this geometric reason; it is not deleted from the original path derivative. The first denominator variation also vanishes: the base ray and base source velocity are planar, and both their normal first variations are perpendicular to that plane. Differentiating the acceleration direction gives the normal displacement difference divided by the range.

Each past/future contribution therefore gives $-(z_i-z_j(T\mp\tau))/(2(2Rc)^3D)$. Summing both and using the exact circle balance yields

$$
z_i''=-k\left[z_i-\frac{z_j(T-\tau)+z_j(T+\tau)}2\right],\qquad k=\frac1{8R^3c^3D}=\frac{\omega^2}{2c^2},\qquad k\tau^2=2\beta^2.
$$

The complete circle has exactly one partner root in each direction and no positive-age self root. This variational calculation uses precisely those roots.

## Exact common-sector growing and decaying pair

For $z_1=z_2=\exp(\lambda T)$, the scalar equation is

$$
\lambda^2=k[\cosh(\lambda\tau)-1].
$$

Let $q=\lambda\tau>0$. The equation is equivalent to

$$
\frac{q}{2\sinh(q/2)}=\beta.
$$

The left side decreases strictly from one to zero. To prove strict decrease, set $s=q/2$ and note $s\cosh s-\sinh s>0$ because its derivative is $s\sinh s>0$ and its value at zero is zero. Its endpoint limits follow from the Taylor series at zero and exponential growth at infinity. Thus every fixed $0<\beta<1$ has exactly one positive real exponent and its negative in this common normal sector. Both are simple: at the positive root, the derivative of $q^2-4\beta^2\sinh^2(q/2)$ is $2q[1-(q/2)\coth(q/2)]<0$.

The common zero exponent is exactly double for $\beta<1$, since the characteristic function is $(1-\beta^2)q^2+O(q^4)$. The opposite normal sector has $\lambda^2=-k[1+\cosh(\lambda\tau)]$ and therefore has no real exponent, including zero. These statements classify real normal exponents only; they do not classify complex exponents or planar growth.

As $\beta\uparrow1$, the positive root satisfies $q=\sqrt{24(1-\beta)}[1+O(1-\beta)]$ by $q/(2\sinh(q/2))=1-q^2/24+O(q^4)$. No numerical threshold or computed spectrum is used.

## Precise interpretation and falsifier

The positive mode is a genuine exponentially growing solution of the complete Cartesian linear boundary equation. Its common normal displacement is an accelerating translation of the circle plane, not a constant Euclidean translation, tilt, phase change or zero-exponent linear drift. It is unbounded on one half of the time line and therefore does not contradict the classification of bounded or tempered whole-line variations. In particular it is not a tangent vector in a uniformly bounded whole-line history space.

This linear mode by itself proves neither nonlinear instability in a specified boundary-data norm nor departure of a compatible causal release. There is no selected causal evolution for the equal-past/future row. No nonlinear complete solution with this displacement is asserted: a finite-amplitude exponential displacement eventually exits every uniform subfield neighborhood. A nonlinear admissibility or instability theorem requires its own function space, boundary conditions and existence argument.

Falsifiers are an incorrect complete normal path derivative, a missed root, failure of the circle-balance relation $k\tau^2=2\beta^2$, failure of the strictly decreasing scalar quotient, or describing the resulting mode as bounded, a nonlinear future or causal-release instability.
