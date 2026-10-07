# The canonical pair's finite turning budget

**Derived subject awaiting independent assessment.** The nominal canonical pair has already been proved to disperse. This companion asks how much rotation precedes and follows the first auxiliary-account zero. It retains the exact preparation, decimal phase, coefficients, complete older extensions, original spatial-history neighborhood and $c_f=1$ from the [current A report](overnight2-a-followup-and-research-2026-10-07.md). No physical equation or source history changes.

For the nominal planar member, let $\vartheta(T)$ be the continuous signed angle of the relative separation ray, measured from its release direction and with the original positive orientation. In the spatial neighborhood, use instead its accumulated spherical arclength, denoted $\theta$, whose derivative is $|N'|$. The accepted developed-frame negative-stage angle agrees with this arclength. These two interpretations must not be conflated: the spatial statement does not assign winding around a fixed axis.

## The integer in the literal phase is an actual turning count

At the first account zero $T_e$, the [accepted localization](overnight2-a-reference-first-zero-location.md) gives $1498<h_e<1501$, $1.5<\psi_e<2.5$, $\big||e_e|-1\big|<10^{-6}$ and

$$
|\theta_e-(\theta_*-P_e)|<.204,
\qquad P_e=|e_e|\sin\psi_e.
\tag{1}
$$

The [independently accepted literal phase](overnight2-a-reference-nominal-phase-fate.md) gives the integer $m=714729$ and

$$
\theta_*=2\pi m+\phi_*+\pi+\Gamma,
\qquad -.328064<\Gamma<-.328061.
\tag{2}
$$

Here $\phi_*$ is the direction of the initial corrected vector in the release radial/tangential axes. Its exact defining vector has negative radial component and positive tangential component, so $\pi/2<\phi_*<\pi$. For the tighter upper estimate below, the original rational receipt encloses $\phi_*\in(1.5708797177975791,1.5708797177975792)$; independent assessment must either inherit that explicitly checked component enclosure or reconstruct the weaker sufficient bound $\phi_*<1.571$ from the exact release tokens. The wrapped gap alone does not imply this extra bound.

On $[1.5,2.5]$, sine has its minimum at an endpoint. The alternating polynomial $x-x^3/6+x^5/120-x^7/5040$ gives $\sin(2.5)>.588$, while $\sin(1.5)>.99$. Thus

$$
.58<P_e<1.000001.
$$

Combining these bounds with (1)–(2), $3.14<\pi<3.142$ and $\phi_*<1.571$ gives the deliberately loose strict interval

$$
\boxed{3.17<\theta_e-2\pi m<4.01.}
\tag{3}
$$

The lower estimate uses only $\phi_*>\pi/2$: $1.57+3.14-.328064-1.000001-.204>3.17$. The upper estimate is $1.571+3.142-.328061-.58+.204<4.01$. On the negative stage the intrinsic angle is strictly increasing. Therefore the nominal relative ray has completed exactly $714729$ full positive turns when the account first vanishes. The spatial case has accumulated between $2\pi m+3.17$ and $2\pi m+4.01$ radians of spherical arclength, with no assertion of a fixed plane.

## The entire remaining angular variation is less than 2.23 radians

Use physical relative variables $Z=dN$, $U=uN+v$, $v\cdot N=0$, $\mathbf H=Z\times U$, $H=|\mathbf H|=d|v|$, $k=K/d^2$, $\chi=K/d$. These differ from the slow variables above by $H=4\epsilon h$, with $K=4\epsilon^2$.

The [accepted speed-scale assessment](overnight2-a-reference-terminal-speed-scale.md) gives, for every $T\ge T_e$,

$$
u>\frac43\sqrt\chi,\quad u>\delta>2\times10^{-11},\quad
|V_i|<B=2\times10^{-6},\quad
M<2.65\times10^{-20},\quad
\Lambda_e=\frac{H_e^2}{Kd_e}<2.2,
$$
$$
\chi_e<2.25\times10^{-13},\quad
\int_{T_e}^\infty k\,dt<\frac32\sqrt{\chi_e}<7.125\times10^{-7},
\quad K<4.5\times10^{-7},\quad H_e>1.99.
\tag{4}
$$

The bound $u>\delta$ is supplied by the separately accepted [outgoing-tail assessment](overnight2-a-reference-usable-outgoing-tail.md). The complete earlier source windows retain their old $.05$ ceiling. Only the current affine segment uses $B$.

Write $W=aN+b$, $g=\sqrt{1-|b|^2}$ and $g_B=\sqrt{1-B^2}$. The full actual angular-vector identity and its affine transverse estimate are

$$
\mathbf H'=k\mathbf H+\frac{2kda}{g}N\times b
+dN\times Q^{\rm aff}+dN\times e_{\rm rel},
\quad |e_{\rm rel}|\le10k\chi,
$$
$$
|Q_t^{\rm aff}|\le k\left[
\frac{3B^2|v|^2}{4g_B^5}+\frac{u|v|}{2g_B^3}\right].
\tag{5}
$$

Since $2|a||b|\le M^2$, $|v|\le2B$, $u\le2B$ and every reciprocal power of $g_B$ used here is below $1.1$, (5) gives, including at zeros of $H$ through its upper Dini derivative,

$$
H'^+\le c kH+1.1M^2kd+10Kk,
\qquad c=1.000003.
\tag{6}
$$

Indeed the added coefficient of $kH$ is at most $1.65B^3+1.1B<.000003$. No angular floor or fixed plane is assumed after entry. Gronwall and (4) give $\exp(c\int k)<1.000002$. Also $dt<dd/\delta$, so

$$
H(T)\le A+C\log\frac{d(T)}{d_e},
\quad
A=1.000002(H_e+10K I_k),
\quad C=1.000002\frac{1.1M^2K}{\delta},
\tag{7}
$$

where $I_k=\int_{T_e}^\infty k\,dt<7.125\times10^{-7}$. Equation (7) deliberately allows logarithmic angular-magnitude growth. Its use does not contradict the previously derived nonplanar terminal behavior.

The spherical angular speed is $|N'|=H/d^2$. Integrating (7), now using the stronger early-scale radial lower bound in (4), yields

$$
\int_{T_e}^\infty|N'|\,dt
\le\frac{3}{4\sqrt K}\int_{d_e}^\infty
[A+C\log(r/d_e)]r^{-3/2}\,dr
=\frac{1.5A+3C}{\sqrt{Kd_e}}.
\tag{8}
$$

The elementary integrals are $2/\sqrt{d_e}$ and $4/\sqrt{d_e}$, respectively. In the first term, $H_e/\sqrt{Kd_e}<\sqrt{2.2}<1.484$, and $10K I_k/H_e<2\times10^{-12}$. In the second, $C<1.8\times10^{-35}$ and $\sqrt{Kd_e}>\sqrt{.8}>.89$. Thus

$$
\boxed{\int_{T_e}^\infty|N'|\,dt<2.23.}
\tag{9}
$$

All delayed-history errors and midpoint terms are included. The estimate covers possible vanishing or reversal of the angular vector.

For the nominal planar member, $|\vartheta(T)-\vartheta(T_e)|<2.23$ for every later time and its limiting angle. Equations (3) and (9) therefore put all of them strictly between $2\pi m+.94$ and $2\pi m+6.24$, and $6.24<2\pi$. The ray never completes a $714730$th full turn and never unwinds below the $714729$th completed turn. Its entire positive pre-entry rotation is followed by less than $2.23$ radians of additional total variation. The spatial trajectory's accumulated spherical arclength over its entire future likewise lies strictly between $2\pi m+3.17$ and $2\pi m+6.24$; that statement is an arclength budget only.

## A conservative absolute-time lower bound

The result can also be placed on the original time axis without computing an endpoint. On the generated negative stage after $T=40$, the accepted bounds give

$$
.98\epsilon<h_\theta<1.02\epsilon,
\quad 0<Q=h^2/r<2.021,
\quad \theta_T=\epsilon h/r^2.
$$

Consequently

$$
T_e-40=\int_{h(40)}^{h_e}\frac{r^2}{\epsilon h h_\theta}\,dh
>\frac{h_e^4-h(40)^4}{4(1.02)(2.021)^2\epsilon^2}.
\tag{10}
$$

Using $h(40)<1.001$, $h_e>1498$ and $\epsilon<.000334$ makes the right side larger than $2\times10^{18}$. A coarse finite upper bound follows from the already proved pre-zero barrier $r<10^{16}$, $h(40)>.999$ and $h_e<1501$:

$$
T_e-40<\frac{10^{32}}{.98\epsilon^2}
\log\frac{1501}{.999}<8\times10^{39}.
\tag{11}
$$

Thus $2\times10^{18}<T_e<9\times10^{39}$ in the normalized time unit set by $R_0=c_f=1$. The upper bound is intentionally very conservative. These are not seconds assigned to nature or a numerical event-time measurement. They explain why many completed revolutions do not imply permanent binding in this exact preparation.

Independent review must check the winding branch, the extra initial-direction estimate, slow/physical angular conversion, every contribution to (6), the two angular integrals, treatment of angular zeros and signs, and the physical-time change in (10). A failure of any of those checks falsifies its corresponding quantitative conclusion. No new instrument, target trajectory or scientific process has been launched. The main report retains this subject as provisional until separate assessment.
