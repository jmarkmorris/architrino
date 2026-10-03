# Static checkerboard response under the logarithmic candidate

## What is being compared

The inverse-distance reception candidate permits a static restoring response that the inverse-square trace constraint excludes. In the alternating cubic checkerboard, its sign can be decided analytically. The conclusion concerns displacement of one receiver while all other sources stay fixed; it does not establish dynamical stability of a lattice whose members all respond.

**Claim grade: derived, conditional on the inverse-distance kernel and the neutral-cell summation specified below.** Set $c_f=1$ and $K=\kappa_{\log}q^2>0$, which has dimensions $L^2T^{-2}$. Put stationary sources at $\ell d$, $d\in\mathbb Z^3\setminus\{0\}$, with relative polarity $s_d=(-1)^{d_1+d_2+d_3}$. The source histories are stationary for all past times. Each source has exactly one simple root, $D_t=1$; a stationary receiver has no ordinary positive-delay self root. Its acceleration at a displaced position $\mathbf x$ is

$$
\mathbf A(\mathbf x)=K\sum_{d\ne0}s_d
\frac{\mathbf x-\ell d}{|\mathbf x-\ell d|^2}.
$$

This sum is not absolutely convergent term by term. Group the eight sites $d=2m+e$, $e\in\{0,1\}^3$, into complete neutral cells, omit the source at $d=0$, and sum complete cells. This is part of the comparison's definition, not a universal summation law for infinite populations.

## Convergence and the response derivative

A signed cell sum is a successive finite difference in each of the three coordinate directions. For a distant cell at radius $r$, third derivatives of $(\mathbf x-\ell d)/|\mathbf x-\ell d|^2$ are $O(r^{-4})$, uniformly for $|\mathbf x|<\ell/2$. The cell acceleration is therefore $O(r^{-4})$, and its receiver derivative is $O(r^{-5})$. Since a shell contains $O(r^2)$ cells, both grouped sums converge absolutely and locally uniformly. This permits differentiating the grouped acceleration. It does not permit arbitrary ungrouped rearrangements.

The same cell prescription equals Gaussian regularization followed by removal of the regularizer. For the scalar response sum, use $1/|d|^2=\int_0^\infty e^{-t|d|^2}dt$. The integrated absolute value of each distant signed Gaussian cell is $O(|d|^{-5})$: represent its three finite differences by its mixed third derivative, proportional to $t^3 d_1d_2d_3 e^{-t|d|^2}$, and integrate in $t$. The cell bounds are summable. Thus integration and the grouped cell sum may be interchanged. The analogous vector bounds are $O(|d|^{-4})$. These facts justify the Gaussian formulas below in the declared cell prescription.

Gaussian sums respect inversion and cubic rotations, so $\mathbf A(0)=0$ and its derivative is isotropic. Define $\mathbf n_d=d/|d|$. Differentiating each row gives

$$
J=\left.\frac{\partial\mathbf A}{\partial\mathbf x}\right|_0
=\frac K{\ell^2}\sum_{d\ne0}\frac{s_d}{|d|^2}
\left(I-2\mathbf n_d\mathbf n_d^{\mathsf T}\right)
=\frac{K S}{3\ell^2}I,
\qquad
S=\sum_{d\ne0}\frac{s_d}{|d|^2}.
$$

Indeed, cubic symmetry makes the weighted dyad sum equal to $SI/3$. For inverse-square response the matrix instead contains $I-3\mathbf n_d\mathbf n_d^{\mathsf T}$, whose isotropic sum is zero. For inverse-distance response its trace is nonzero; the existing static inverse-square exclusion does not apply.

## An analytic sign for the lattice sum

Define $\theta(t)=\sum_{m\in\mathbb Z}(-1)^m e^{-tm^2}$ for $t>0$. Gaussian separation in the three coordinates yields

$$
S=\int_0^\infty[\theta(t)^3-1]\,dt.
$$

The removed $1$ is precisely the omitted origin. The alternating series $\theta=1-2e^{-t}+2e^{-4t}-\cdots$ gives $\theta(t)<1$, because its terms decrease strictly in magnitude. Positivity follows by periodizing the Gaussian and taking its Fourier coefficients at half-integer frequency:

$$
\theta(t)=\sqrt{\frac\pi t}\sum_{k\in\mathbb Z}
\exp\!\left[-\frac{\pi^2(k+1/2)^2}{t}\right]>0.
$$

For completeness, put $H(x)=\sum_m(-1)^m e^{-t(x+m)^2}$. It is antiperiodic: $H(x+1)=-H(x)$. Its Fourier frequencies are therefore $k+1/2$. Integrating $H(x)e^{-2\pi i(k+1/2)x}$ over $[0,1]$ and setting $y=x+m$ in each summand cancels the factor $(-1)^m$ and joins the intervals into the real line. The coefficient is the Gaussian transform $\int_{\mathbb R}e^{-ty^2}e^{-2\pi i(k+1/2)y}dy=\sqrt{\pi/t}\,e^{-\pi^2(k+1/2)^2/t}$. Evaluating the absolutely convergent Fourier series at $x=0$ gives the displayed sum. This is a mathematical summation identity, not an imported physical law.

Hence $0<\theta(t)<1$ for every $t>0$, and the integrand is strictly negative. The half-integer formula gives $\theta(t)\to0$ as $t\downarrow0$, so the integrand is bounded there. At infinity it is $O(e^{-t})$. The integral is finite and

$$
S<0,\qquad
J=-\omega_{\rm p}^2 I,
\qquad \omega_{\rm p}^2=-\frac{K S}{3\ell^2}>0.
$$

The subscript denotes the fixed-source probe comparison. No decimal evaluation is needed to establish its sign. Each receiver displacement therefore has an opposing linear acceleration when the other sources retain their stationary histories. This supplies a definite static advantage over the matched inverse-square checkerboard comparison under the same cell convention.

## What remains open

Releasing the other sources changes their delayed positions and source-velocity weights. The derivative computed above is only the receiver-displacement part of the full delayed lattice operator. Source-displacement and source-velocity terms can introduce collective growth even when this part is restoring. A full wavevector calculation about this stationary equilibrium is the appropriate stability question; no retained moving population, stable assembly or Noether sea follows from the probe result.

Failure of the stated cell bounds, failure of equivalence to the Gaussian sum, a nonnegative $S$ in that same prescription, or a nonrestoring fixed-source derivative would overturn the corresponding result. A different infinite-summation prescription is a different preparation assumption. This new analytical derivation is self-reviewed and has not received separate mathematical adjudication.
