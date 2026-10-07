# Finite phase reduction without adding source regularity

**Status: derived structural candidate, unreviewed.** The preparation remains exactly $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ with the complete fixed past. This develops the finite-map proposal captured in the [phase-route treatment](authorized-cases-ten-hour-b-phase-map-route.md). It does not evaluate a target phase or assert a terminal branch. Its purpose is to locate the remaining finite calculation and the actual regularity boundary, rather than infer impossibility from the number of leading cycles.

## 1. The finite geometric-angle field is polynomial

Write $a=1/r$, $p=r'$ and $t=h/r$. Give $p,t$ weight one and $a$ weight two. The autonomous coefficient construction has the algebraic form

$$
(F_n)_r=r^{-2}\sum_{j,k,\ell\ge0\atop j+2k+2\ell=n}
 c_{jk\ell}^{(n)}p^jt^{2k}a^\ell,
\tag{1}
$$

$$
(F_n)_\theta=r^{-2}t
\sum_{j,k,\ell\ge0\atop 1+j+2k+2\ell=n}
 d_{jk\ell}^{(n)}p^jt^{2k}a^\ell,
\tag{2}
$$

with rational coefficients. Here $F_0=-e_r/r^2$ and $F_1=0$. The explicit coefficients through five in the [fifth-order subject](authorized-cases-ten-hour-b-fifth-order-cycle.md) satisfy (1)–(2).

The closure argument uses the normalized source jets $r^{m-1}y^{(m)}$. Multiplication by $r$ times the central time derivative maps the ring $\mathbb Q[a,p,t]$ to itself: $ra'=-pa$, $rp'=t^2-a$, $rt'=-pt$, and the polar-frame derivatives multiply by $t$. It raises the stated weight by one. The higher autonomous coefficients preserve the same graded rule after collecting their parameter degrees. The normalized implicit range has nonzero constant term two, so its finite inverse, square-root and root-series operations use only rational coefficient algebra. No negative power of $a$ is generated. Reflection across the radial line makes the radial coefficient even in $t$ and the tangential coefficient odd, giving its explicit factor $t$. This establishes (1)–(2) inductively for every retained finite degree, without an analyticity assertion about the actual history.

Now put $w=h^2/r$, $u=hp$, $\eta=\epsilon/h$ and use actual geometric angle $\phi$. Multiplication by the factors in the exact polar equations gives

$$
r^2\epsilon^n(F_n)_r
=\eta^n\sum c_{jk\ell}^{(n)}u^jw^{2k+\ell},
\tag{3}
$$

$$
\frac{r^3}{h^2}\epsilon^n(F_n)_\theta
=\eta^n\sum d_{jk\ell}^{(n)}u^jw^{2k+\ell}.
\tag{4}
$$

Thus the finite system for $(w,u,\eta)$ is polynomial through each retained parameter degree. It has no inverse power of $w$. The large-radius point $w=u=0$ is a regular point of this comparison field. All its noncentral corrections vanish there, so its exact limiting direction is

$$
w_\phi=0,\qquad u_\phi=-1,\qquad \eta_\phi=0.
\tag{5}
$$

For the actual path, the accepted radius-weighted remainder has the vanishing factors specified in the phase-route treatment. Consequently it is a small value perturbation of this polynomial field throughout its physical parabolic region. Analytically extending the polynomial through $w=0$ is only a device for finite estimates; it does not extend a physical path through infinite radius.

A useful coefficient bound follows from the accepted finite-field bound. Extract the coefficients of (1)–(2) near $a=1$, $p=t=0$ on complex radii $2^{-12},2^{-12},2^{-12}$. These points lie inside the admitted finite-field state domain. Cauchy's factors cost at most $2^{12n}$; converting powers of $a-1$ to powers of $a$ costs at most $2^n$. Together with the bound $2^{30+5010n}$, a safe coefficient bound is $2^{40+5023n}$. On $|w|\le3$, $|u|\le2$, the monomial count and evaluation factors are absorbed by $2^{60+5025n}$. The finite angle field is therefore uniformly analytic on the small parameter disk $|\eta|\le2^{-5100}$ in a fixed bounded state neighborhood of all central cycles up to $e=1$.

This eliminates the physical-period divergence as a denominator in the proposed finite averaging. With $x=w-1$, the central angular generator is the ordinary rotation of $(x,u)$ with period $2\pi$, including the limiting circle through $w=u=0$. The difficult final event is the grazing of the boundary $w=0$, not a zero angular frequency of this comparison field.

## 2. The original layer permits enough finite value coefficients

For this paragraph only put $\sigma=s/\epsilon$ and $Y(\sigma)=y(\epsilon\sigma)$. The exact row becomes

$$
Y_{\sigma\sigma}=-\frac{4\epsilon^2}{L^2D^3}
\left\{(1-|Y_{\sigma,d}|^2)n
+D Y_{\sigma,d}-L n(n\cdot Y_{\sigma\sigma,d})\right\},
\tag{6}
$$

$$
\sigma_d=\sigma-L,\quad
L=|Y(\sigma)+Y(\sigma_d)|,\quad
D=1+n\cdot Y_{\sigma,d}.
$$

The neutral acceleration has the same outer $\epsilon^2$ as the rest of this scaled equation. Its leading coefficient is therefore triangular in parameter degree: the coefficient of order $n$ uses source coefficients of order at most $n-2$, not its own unknown order-$n$ acceleration.

The first two position coefficients are $Y_0=e_1$, $Y_1=\sigma e_2$. Their first summed displacement is tangential, so the range expansion begins

$$
L=2+O(\epsilon^2).
\tag{7}
$$

The compatibility branch is analytic in the parameter on a small fixed complex disk because its finite polynomial trace map is analytic and has the already admitted strict contraction. Its scaled negative-time polynomial therefore has ordinary finite parameter coefficients. No cutoff derivatives enter this layer, which lies wholly in the unchanged recent polynomial interval.

Coefficient recursion in (6) produces piecewise polynomials in $\sigma$, with leading transmission locations $0,2,4,\ldots$. The original sixth coefficient has a sixth-derivative jump at zero and is $C^{5,1}$. Its source acceleration is only $C^{3,1}$. Because the delay correction in (7) starts at degree two, computing the scaled equation through degree fourteen requires at most three argument derivatives of this source-acceleration coefficient: its first appearance is at degree eight, and each additional delay Taylor factor costs two degrees. Those three derivatives exist and are continuous; the fourth-order Taylor remainder is bounded by its Lipschitz third derivative.

The later coefficient regularities are compatible with this count. The first transmitted contribution at degree eight is again $C^{5,1}$ after the two integrations in (6). An additional degree-two delay correction can lower this coefficient regularity by one. Thus a sufficient lower bound for the even degree-$n$ coefficient, $8\le n\le14$, is $C^{9-n/2,1}$. Its source acceleration has regularity $C^{7-n/2,1}$, while degree fourteen requires at most $6-n/2$ argument derivatives. The available derivative count exceeds the required one. Odd degrees have at least the adjacent even-degree regularity and satisfy the same test. This is a finite coefficient induction, not an assertion that the full actual path has fourteen time derivatives.

The first direct pointwise obstruction in this particular Taylor scheme occurs at scaled row degree sixteen: the original sixth coefficient's source acceleration would need a fourth argument derivative at its displaced seam. That derivative has a jump. A uniform pointwise coefficient there requires retaining the displaced seam explicitly or using an integrated value remainder. It cannot be obtained by assuming a smooth seventh actual jet. The obstruction lies beyond the degree-fourteen preparation calculation needed below.

The required preparation accuracy is concrete. Computing $Y_\sigma(200)$ through degree fourteen corresponds to physical velocity through degree thirteen, with a prospective physical value remainder of order $\epsilon^{14}$. Against the actual cubic amplitude, that is relative order $\epsilon^{11}$. The leading phase sensitivity of order $\epsilon^{-9}$ then leaves two powers of $\epsilon$ for explicit constants. This is the same favorable power margin as the admitted seventeenth-order value transfer. The [first initial-layer kernel](authorized-cases-ten-hour-b-initial-layer-kernel.md) supplies the leading nonzero seam correction within this finite recursion; the remaining coefficients and a uniform numerical remainder constant have not been evaluated here.

## 3. What remains in the finite phase calculation

The angle field now has a fixed central rotation and an explicit finite coefficient algebra. A finite averaging transformation can be specified by solving the zero-mean rotation equations degree by degree, retaining all resonant terms. Its independent mathematical obligation is an explicit remainder and sensitivity bound on a state domain reaching the final grazing section. The parameter-order count alone does not give that bound.

There is also a second resonance to handle after averaging. The leading slow law is $dI/d\log H=3I$, where $I$ is the squared radial amplitude, while $d\delta/d\log H=-\delta$. On a monomial $I^j\delta^n$, the slow transport operator has factor $3j-n$. When $n=3j$, a finite primitive can contain a logarithm. These terms cannot be discarded merely because the original local comparison is analytic. For example, an order-$\delta^3I$ correction to the logarithmic slow law is resonant. Its contribution can survive the large leading phase amplification as a logarithmic term.

Consequently the eventual scalar phase formula may contain rational powers, logarithms, initial phase terms and section corrections. The leading comparison value $9/(256\epsilon^9)$ alone supplies none of their fractional-phase information. A large-precision evaluation would only become a scientific target after the finite reduction, its remainder, the degree-fourteen initial layer, and the final-section matching were independently admitted. No such evaluation is launched here.

The current exact missing object is a finite correlated map that transports the original preparation to the first near-parabolic boundary encounter and bounds its signed distance from the grazing case. The polynomial angle domain and the finite initial-layer regularity analysis make that route credible; they do not certify that its eventual enclosure separates the selected dyadic member from grazing. If the enclosure meets the grazing value, more precision or an exact identity would still be needed.

## Scope and falsifiers

The new proposed structural claims are the graded polynomial forms (1)–(4), the uniform angular domain including the central grazing point, and the finite layer derivative inventory through degree fourteen. The terminal branch remains open. A generated negative power of $a$ in the autonomous construction, loss of the tangential factor in (2), an incorrect range degree in (7), or a needed derivative beyond the displayed coefficient regularity would falsify the corresponding claim. A hidden resonance omitted from a future phase formula would invalidate its proposed error bound.

All work here is finite algebra and derivative inventory using the exact selected row. No target instrument, large scalar evaluation, numerical trajectory, new preparation, physical premise, higher actual source regularity, Python job or repository publication was used.
