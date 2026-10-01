# Electrostatic Potential Falloff from Point-Charge Configurations

## Scope and mechanism

In ordinary three-dimensional vacuum electrostatics, a finite configuration of fixed point charges can have a leading distant potential proportional to any positive integer inverse power of distance. Each charge contributes an inverse-distance potential, but signed contributions can cancel successive terms of the distant expansion. The first surviving term determines the leading power. This is a derived result within the Coulomb comparison model, not a derivation of electrostatics from architrino dynamics. Holding the charges at their prescribed positions does not establish a freely sustained equilibrium.

Let charge $q_i$ occupy position $\mathbf a_i$, with all positions inside a sphere of radius $a$ about the chosen origin. At observation position $\mathbf r=r\hat{\mathbf n}$, take the potential to vanish at infinity. The exact comparison potential is

$$
V(\mathbf r)=k\sum_i\frac{q_i}{|\mathbf r-\mathbf a_i|},
\qquad k=\frac{1}{4\pi\epsilon_0}.
$$

Here $\epsilon_0$ is the vacuum permittivity in the standard electrostatic model, $r$ is distance from the origin, and $\hat{\mathbf n}$ is the observation direction. For $r>a$, expanding each denominator gives

$$
V(r,\hat{\mathbf n})=k\left[
\frac{Q}{r}
+\frac{\mathbf p\cdot\hat{\mathbf n}}{r^2}
+\frac{1}{2r^3}\sum_i q_i\left(3(\hat{\mathbf n}\cdot\mathbf a_i)^2-|\mathbf a_i|^2\right)
+\cdots\right],
$$

where $Q=\sum_i q_i$ is total charge and $\mathbf p=\sum_i q_i\mathbf a_i$ is the electric dipole moment. The successive angular coefficients are the multipole moments: the monopole measures net charge, the dipole measures signed displacement, and the quadrupole measures the next signed spatial pattern. Multipole order $\ell$ contributes an angular function divided by $r^{\ell+1}$. The convergent expansion and its first moments are given in [Richard Fitzpatrick's multipole expansion notes](https://farside.ph.utexas.edu/teaching/jk1/lectures/node32.html).

If all moments below order $\ell$ vanish and at least one order-$\ell$ moment is nonzero, the generic leading potential is $r^{-(\ell+1)}$. Here generic excludes observation directions where its angular coefficient vanishes. The far-field approximation requires $r\gg a$; a finite separated configuration generally retains faster-decaying corrections.

## Why the leading powers describe the far field

The exact potential depends on the separate distances to every charge. At large distance from a bounded configuration, those distances are nearly equal, and their fractional differences are controlled by source size divided by observation distance. Expanding in this small ratio organizes the total potential into inverse powers of $r$. The complete exterior multipole series equals the exact potential for $r>a$, but replacing that series by its first surviving term is a further approximation. For a fixed source and a fixed direction with a nonzero leading coefficient, the remaining terms become relatively small as $r$ increases. There is no universal distance threshold independent of the charge geometry, angular direction, and desired accuracy.

An axial dipole makes the distinction explicit. Put charge $-q$ at $z=-d$ and charge $+q$ at $z=d$, with $q,d>0$. At a point $z=r>d$, define $p=2qd$, the magnitude of the dipole moment. The exact potential is

$$
V(r)=kq\left(\frac{1}{r-d}-\frac{1}{r+d}\right)
=\frac{2kqd}{r^2-d^2}
=\frac{kp}{r^2}\frac{1}{1-(d/r)^2}.
$$

The last factor contains the finite separation of the charges. When $r\gg d$, its geometric series gives

$$
V(r)=\frac{kp}{r^2}\left[1+\frac{d^2}{r^2}+\frac{d^4}{r^4}+\cdots\right].
$$

The dipole's $r^{-2}$ potential is therefore the leading term of an exact expression that also contains $r^{-4},r^{-6},\ldots$ corrections on this axis. In this example the fractional error of the leading approximation, measured relative to the exact potential, is exactly $(d/r)^2$. This follows by dividing $kp/r^2$ by the exact expression above.

Near the positive charge, write $r=d+\delta$ with $0<\delta\ll d$. The same exact potential becomes

$$
V(d+\delta)=\frac{kq}{\delta}-\frac{kq}{2d+\delta}.
$$

The first term diverges as the inverse distance $\delta$ to that individual charge, while the second remains finite. Thus a neutral pair can have a local $1/\delta$ singularity around either charge and a distant $1/r^2$ leading potential about the pair's center. These statements concern different distance regimes and different reference points.

An individual multipole term has its stated radial power exactly. An ideal point dipole is the mathematical limit $d\to0$ with $p=2qd$ held fixed; its potential is exactly $kp\cos\theta/r^2$ away from the origin, where $\theta$ is the angle from its axis. That limit requires growing charge magnitude and is distinct from a pair of finite charges at nonzero separation. In this static discussion, far field means distance large compared with source size; no radiation or wavelength condition is involved.

## Explicit configurations

The following collinear examples use equally spaced sites, ordered from left to right, with spacing $d>0$ and a nonzero reference charge $q$. Their powers follow from the cancellation proof below.

| Leading multipole | Charges on successive sites | Leading potential | Leading electric-field magnitude in generic directions |
| --- | --- | --- | --- |
| Monopole | $q$ | $r^{-1}$ | $r^{-2}$ |
| Dipole | $-q,\;q$ | $r^{-2}$ | $r^{-3}$ |
| Quadrupole | $q,\;-2q,\;q$ | $r^{-3}$ | $r^{-4}$ |
| Octupole | $-q,\;3q,\;-3q,\;q$ | $r^{-4}$ | $r^{-5}$ |
| Hexadecapole | $q,\;-4q,\;6q,\;-4q,\;q$ | $r^{-5}$ | $r^{-6}$ |

The field column follows from $\mathbf E=-\nabla V$. Differentiating a radial power adds one inverse power of distance, and the angular part of the spatial gradient also carries a factor $1/r$. A zero of the potential's angular factor need not be a zero of the electric field, because the angular derivative may remain nonzero.

For the quadrupole example, place charges $q,-2q,q$ at axial coordinates $-d,0,d$. At an observation point on the positive axis with $r>d$, the exact potential is

$$
V(r)=kq\left(\frac{1}{r+d}-\frac{2}{r}+\frac{1}{r-d}\right)
=\frac{2kqd^2}{r(r^2-d^2)}
=\frac{2kqd^2}{r^3}\left[1+O\!\left(\frac{d^2}{r^2}\right)\right].
$$

Thus the cubic inverse-distance falloff is a direct cancellation result, with a displayed exact expression against which the approximation can be checked.

## Construction at arbitrary order

Choose any nonnegative integer $\ell$, and place charges on the $z$ axis at $z_j=jd$ for $j=0,\ldots,\ell$, with weights

$$
q_j=q(-1)^{\ell-j}\binom{\ell}{j}.
$$

For axial sources, the Coulomb expansion takes the form

$$
V(r,\theta)=k\sum_{m=0}^{\infty}\frac{P_m(\cos\theta)}{r^{m+1}}\sum_{j=0}^{\ell}q_j z_j^m,
\qquad r>\ell d.
$$

Here $\theta$ is the angle to the positive $z$ axis, and $P_m$ is the degree-$m$ Legendre polynomial, the angular function produced by expanding an axial inverse-distance potential. The signed binomial sum is the $\ell$th forward finite difference: each difference lowers the degree of a polynomial by one. It therefore annihilates $j^m$ for $m<\ell$, while its value on $j^\ell$ is $\ell!$. Consequently,

$$
\sum_jq_jz_j^m=0\quad(m<\ell),
\qquad
\sum_jq_jz_j^\ell=q\ell!d^\ell,
$$

and the leading potential is

$$
V(r,\theta)=\frac{kq\ell!d^\ell P_\ell(\cos\theta)}{r^{\ell+1}}+O(r^{-\ell-2}).
$$

This proves the tabulated examples and constructs every positive integer leading inverse power. For a fixed configuration and a fixed direction with $P_\ell(\cos\theta)\ne0$, the ratio $V(2r,\theta)/V(r,\theta)$ tends to $2^{-(\ell+1)}$ as $r$ increases.

## Equal-magnitude square and cube

Equal charge magnitudes also permit higher-order cancellation. Put four charges at $(s_xd,s_yd,0)$ with charge $q s_xs_y$, where each sign variable is independently $+1$ or $-1$. The charges alternate around a square. Summing over either sign cancels total charge and every first moment. In the quadratic expansion only the mixed $xy$ term survives, giving

$$
V(r,\hat{\mathbf n})=\frac{12kqd^2n_xn_y}{r^3}+O(r^{-5}).
$$

The components $n_x,n_y,n_z$ specify the unit observation direction. Similarly, eight charges at $(s_xd,s_yd,s_zd)$ with charge $q s_xs_ys_z$ give a cube whose edge-connected vertices have opposite signs. Every moment of degree below three cancels: its monomial lacks at least one odd coordinate factor, leaving a vanishing signed sum. The cubic $xyz$ term survives, yielding

$$
V(r,\hat{\mathbf n})=\frac{120kqd^3n_xn_yn_z}{r^4}+O(r^{-6}).
$$

The square and cube therefore supply equal-magnitude quadrupole and octupole examples. On their symmetry planes the potential can vanish identically; a generic radial exponent must not be interpreted as an isotropic potential.

## Evidence and interpretation boundary

Claim grade: derived within the declared static Coulomb model. The exact dipole and quadrupole sums, finite-difference identity, and signed square/cube sums provide the derivations; the linked independent electrostatics reference supports the general expansion. A nonzero lower-order moment for a listed configuration, or disagreement between its exact Coulomb sum and the stated asymptotic coefficient in a non-nodal direction, would overturn that configuration's asserted leading power. For the axial dipole, disagreement with the exact relative-error identity $(V-kp/r^2)/V=(d/r)^2$ for $r>d$ would overturn the stated approximation error.

The mechanism is signed spatial cancellation. Applying it to an architrino assembly would require deriving the relevant effective potential, source weights, and averaging regime from its lawful histories. These static comparison configurations establish neither that recovery nor dynamical retention of any assembly.
