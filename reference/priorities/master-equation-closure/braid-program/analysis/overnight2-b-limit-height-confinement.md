# Height-ratio confinement in the nondegenerate slow limit

## Result and scope

Claim grade: derived, initially self-reviewed. Every regular periodic radial/axial orbit of the [normalized limiting equation](overnight2-b-independent-coupled-period.md#finite-positive-scale-limiting-equation-and-its-normalization) obeys
$$
\left|\frac zr\right|<h_U,\qquad \frac{11}{10}<h_U<\frac98.
$$
The number $h_U$ is the unique positive zero of
$$
u(h)=\frac1{\sqrt3}-\frac1{\sqrt{1+4h^2}}
-\frac1{4\sqrt{1+h^2}}.
$$
This restricts possible limiting shapes of exact canonical slow families with a finite positive scale limit and the previously stated convergence hypotheses. It is not an all-speed theorem for the delayed law. In particular, the exploratory shots starting at $r=1,z=1.25$ cannot be periodic limiting orbits, for an analytical reason independent of their numerical event or bracket outcomes.

## First integral derived from the limiting equation

The normalized radial/axial equations are
$$
\ddot r=\ell^2/r^3-\partial_r U,\qquad
\ddot z=-\partial_z U,
$$
where $r>0$, $\ell$ is constant and
$$
U(r,z)=\frac{u(z/r)}{r}
=\frac1{\sqrt3\,r}-\frac1{\sqrt{r^2+4z^2}}
-\frac1{4\sqrt{r^2+z^2}}.
$$
This function was derived from all five simultaneous canonical partner rows. Define the mathematical quadratic first integral
$$
\mathcal I=\frac12\left(\dot r^2+\dot z^2+\frac{\ell^2}{r^2}\right)+U(r,z).
$$
Direct differentiation, followed by substitution of the displayed equations, gives
$$
\dot{\mathcal I}
=\dot r(\ddot r-\ell^2/r^3+U_r)+\dot z(\ddot z+U_z)=0.
$$
Thus $\mathcal I$ is constant for this derived limiting equation. This is an algebraic property of that equation, not a premise of physical energy conservation or intrinsic architrino mass, and it is not asserted for the original finite-delay law.

The potential is homogeneous of degree minus one, so direct differentiation also gives $rU_r+zU_z=-U$. Consequently
$$
\frac12(r^2+z^2)^{\cdot\cdot}
=\dot r^2+\dot z^2+\frac{\ell^2}{r^2}+U.
$$
Let $K_{\rm q}=(\dot r^2+\dot z^2+\ell^2/r^2)/2$ be shorthand for the nonnegative quadratic expression. Period averaging gives $2\langle K_{\rm q}\rangle+\langle U\rangle=0$. Since $\mathcal I$ is constant,
$$
\mathcal I=\langle K_{\rm q}+U\rangle=-\langle K_{\rm q}\rangle<0.
$$
Strictness follows because $K_{\rm q}$ cannot vanish identically on an orbit: that would require $\ell=\dot r=\dot z=0$, while the axial equation forces $z=0$ and the radial acceleration there equals $-(5/4-1/\sqrt3)/r^2\ne0$. Therefore, at every time,
$$
U=\mathcal I-K_{\rm q}<0.
$$

## The shape potential changes sign once

The even function $u$ has $u(0)=1/\sqrt3-5/4<0$ and limit $1/\sqrt3>0$ as $h\to\infty$. For $h>0$,
$$
u'(h)=\frac{4h}{(1+4h^2)^{3/2}}
+\frac{h}{4(1+h^2)^{3/2}}>0.
$$
Hence $u$ has exactly one positive zero $h_U$, and $U<0$ with $r>0$ implies $|z/r|<h_U$.

A short exact-rational enclosure locates the zero without numerical shooting. The following root brackets follow simply by squaring their rational endpoints:
$$
1.732<\sqrt3<1.733,\quad
\sqrt{146/25}<2.417,\quad
\sqrt{221/100}<1.487,
$$
$$
\sqrt{97/16}>2.462,\qquad \sqrt{145/64}>1.505.
$$
All displayed finite decimals are exact rationals. At $h=11/10$, these bounds give
$$
u(11/10)<\frac{1000}{1732}-\frac{1000}{2417}-\frac{250}{1487}<0.
$$
At $h=9/8$, they give
$$
u(9/8)>\frac{1000}{1733}-\frac{1000}{2462}-\frac{250}{1505}>0.
$$
Both final signs are exact rational comparisons. Strict monotonicity therefore places the unique root in $(11/10,9/8)$. The interval is a deliberate coarse analytical bound; no fine decimal estimate or numerical root certificate is needed for this conclusion.

## Additional scale bounds within the normalized equation

Put $c_0=5/4-1/\sqrt3>0$. Since $u(h)\ge u(0)=-c_0$, one has $U(r,z)\ge-c_0/r$. At every point on a periodic orbit,
$$
\mathcal I=K_{\rm q}+U\ge-\frac{c_0}{r},
\qquad
\mathcal I\ge\frac{\ell^2}{2r^2}-\frac{c_0}{r}.
$$
The first gives $r\le c_0/|\mathcal I|$. If $\ell\ne0$, strict negativity of $\mathcal I$ and the second inequality also give
$$
r>\frac{\ell^2}{2c_0}.
$$
These are orbit-specific bounds from a negative value of the derived first integral; they do not supply a uniform radius floor when $\ell\to0$ or an upper bound when $\mathcal I\to0^-$. For a simultaneous-turning-point preparation $r=1,z=H,\dot r=\dot z=0$, a necessary condition is
$$
\frac{\ell^2}{2}+u(H)<0.
$$
This offers a preparation-specific exclusion before any numerical shot. It is necessary, not sufficient for a periodic orbit or for either canonical delayed period condition.

## Verification boundary and falsifiers

The derivation is self-contained and initially awaiting independent review. A wrong primitive, derivative identity, strictness argument, rational endpoint sign or scale-inequality direction would defeat its respective claim. A regular periodic limiting orbit violating the height-ratio bound or the stated first-integral bounds would falsify the result. Degenerate scale limits, nonperiodic radial/axial motions, singular paths and finite-speed canonical trajectories are not covered by this limiting-equation theorem. The shared numerical receipts remain unchanged; no earlier unsuccessful shot is retroactively promoted into proof. The receiving account is the second-allocation report.
