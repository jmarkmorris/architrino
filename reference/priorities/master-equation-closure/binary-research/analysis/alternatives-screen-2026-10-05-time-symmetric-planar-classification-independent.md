# Complete planar imaginary-frequency classification at small speed

Status: independent analytical subject, 2026-10-05, under the [frozen classification protocol](alternatives-screen-2026-10-05-time-symmetric-planar-classification-independent-protocol.md). No new coordinator classification source was read before freezing this derivation. All mathematical findings below are derived; no numerical target was run. The speed threshold is positive but is not assigned a numerical value.

For every sufficiently small positive speed, the complete real-frequency planar characteristic zeros are:

| Exchange sector | Dimensionless rotating frequency | Determinant multiplicity | Bounded real directions |
| --- | --- | --- | --- |
| Common displacement | $m=\pm1$ | Two at each root | Two translations |
| Opposite displacement | $m=0$ | Two | One phase rotation |
| Opposite displacement | $m=\pm m_*(\beta)$ | One at each root | Two oscillatory directions |

Here $m_*(\beta)=1-\beta^2/2+O(\beta^4)$ and $0<m_*(\beta)<1$. Each listed matrix has nullity one over the complex numbers. There are no other real planar frequencies. The whole-line tempered real planar solution space has dimension eight; its bounded subspace has dimension five. The three additional tempered directions grow linearly in time. This is a classification of the linearized boundary equation, not a nonlinear family or a causal stability theorem.

## 1. Selected complete boundary case and physical derivative

Use exactly the Section 14 equal past/future canonical radial law of [the binary source](alternatives-screen-2026-10-05-binary.md), with opposite polarities and $K=c_f=1$. For $0<\beta<1$, define

$$
x=\beta\cos x,\quad c=\cos x,\quad s=\sin x,\quad D=1+\beta s,\quad R=(4\beta^2cD)^{-1},\quad \omega=\beta/R,\quad \tau=2Rc=2x/\omega.
$$

The histories are $X_1(t)=R(\cos\omega t,\sin\omega t,0)$ and $X_2(t)=-X_1(t)$. The complete partner roots are $t\pm\tau$. Their half-weighted tangent accelerations cancel and their summed radial acceleration is $-e_R/(4R^2cD)=-R\omega^2e_R$. Strict subfield speed makes each partner root function strictly monotone, gives one root in each time direction, and excludes every nonzero-age self root by the displacement bound $|X(t)-X(S)|\le\beta|t-S|$. This does not define a new instantaneous diagonal law.

To preserve the physical content of the linearization, let $\varepsilon=\pm1$ index the future and past partner roots, $S=t+\varepsilon\tau$, $\ell=|X_i(t)-X_j(S)|$, $n=(X_i(t)-X_j(S))/\ell$, $v=X_j'(S)$, $a_s=X_j''(S)$, $D_\varepsilon=1+\varepsilon n\cdot v$, and $P=I-nn^{\mathsf T}$. For $d_0=\eta_i(t)-\eta_j(S)$,

$$
\delta S=\frac{\varepsilon n\cdot d_0}{D_\varepsilon},\qquad \delta r=B_\varepsilon d_0,\qquad B_\varepsilon=I-\frac{\varepsilon v n^{\mathsf T}}{D_\varepsilon},\qquad \delta v=\eta_j'(S)+a_s\delta S.
$$

The variation of a complete attractive row is $M_\varepsilon d_0+N_\varepsilon\eta_j'(S)$, where

$$
\begin{aligned}
M_\varepsilon&=-\frac1{\ell^3D_\varepsilon}\left[(I-3nn^{\mathsf T})B_\varepsilon-\frac{\varepsilon n v^{\mathsf T}PB_\varepsilon}{D_\varepsilon}-\frac{\ell(n\cdot a_s)nn^{\mathsf T}}{D_\varepsilon^2}\right],\\
N_\varepsilon&=\frac{\varepsilon nn^{\mathsf T}}{\ell^2D_\varepsilon^2}.
\end{aligned}
$$

In particular, the source acceleration shift is retained. Averaging these rows is the selected linear equation. Its full derivation and the independently bounded continuation of the opposite root are in [the preceding frozen frequency subject](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent.md).

Let $Q(\theta)$ be counterclockwise planar rotation, $J=Q'(0)$, and $\theta=\omega t$. In the future ray basis $n=(c,s)$, $t_r=(-s,c)$, the normalized tensors are

$$
\widehat M_+=\alpha nn^{\mathsf T}+\gamma(nt_r^{\mathsf T}+t_rn^{\mathsf T})+\zeta t_rt_r^{\mathsf T},\quad \widehat N_+=\kappa nn^{\mathsf T},
$$

$$
\alpha=\frac1{c^2D}+\frac{\beta^2}{2D^2},\quad \gamma=-\frac\beta{2cD},\quad \zeta=-\frac1{2c^2},\quad \kappa=\frac\beta{cD}=-2\gamma,
$$

with $\widehat M=M/\omega^2$, $\widehat N=N/\omega$. Reflection $E=\operatorname{diag}(1,-1)$ gives $\widehat M_-=E\widehat M_+E$, $\widehat N_-=-E\widehat N_+E$.

## 2. Exact symbol and its symmetry roots

Write $\eta_i(t)=Q(\theta)u_i(\theta)$ and $u_2=\chi u_1$ for exchange parity $\chi=\pm1$. The trial $u_1=v_0e^{im\theta}$ has symbol

$$
H_\chi=(imI+J)^2-\frac{\widehat M_++\widehat M_-}{2}+\frac\chi2\sum_{\varepsilon=\pm1}[\widehat M_\varepsilon-\widehat N_\varepsilon(imI+J)]Q(2\varepsilon x)e^{2i\varepsilon mx}.
$$

This formula holds for every real $m$. Define

$$
\begin{aligned}
A&=\alpha c^2+\kappa cs+\zeta s^2,& C&=\alpha s^2-\kappa cs+\zeta c^2,\\
U&=\alpha c^2-\zeta s^2+\kappa cs,& V&=-\alpha s^2+\zeta c^2+\kappa cs,\\
W&=(\alpha+\zeta)cs+\gamma\cos2x.
\end{aligned}
$$

Direct multiplication gives $H_\chi=(a,if;-if,d)$ and $F_\chi=ad-f^2$, where

$$
\begin{aligned}
a&=-m^2-1-A+\chi[U\cos(2mx)+m\kappa c^2\sin(2mx)],\\
d&=-m^2-1-C+\chi[V\cos(2mx)-m\kappa s^2\sin(2mx)],\\
f&=-2m+\chi[-W\sin(2mx)+m\kappa cs\cos(2mx)].
\end{aligned}
$$

The diagonal entries are even in $m$, the off-diagonal scalar $f$ is odd, and the determinant is even. All entries are real analytic in $(m,x)$ near any bounded $m$ interval and $x=0$, after substituting $\beta=x/\cos x$.

The independently known zero-speed controls are

$$
F_+(m,0)=(m^2-1)^2,\qquad F_-(m,0)=m^2(m^2-1).
$$

The zero-speed point is an analytic continuation of the normalized operator, not a finite-radius physical circle. At every physical positive speed, translation covariance gives common $m=\pm1$, and rotation covariance gives opposite $m=0$. Substituting the coefficients yields

$$
a_+(1,x)=d_+(1,x)=f_+(1,x)=h(x),
$$

$$
h=-\frac{2\beta^2s^4+\beta^2s^2+4\beta s^3+2\beta s+s^2+2}{D^2}<0,
$$

and

$$
H_-(0,x)=\operatorname{diag}(a_0,0),\qquad a_0=-\frac{2\beta^2s^2+\beta^2+6\beta s+3}{D^2}<0.
$$

Thus these matrices have nullity one, not two. The derivative of the common determinant at $m=1$ is $h(a_m+d_m-2f_m)$. Direct differentiation gives

$$
(a_m+d_m-2f_m)_{m=1}=2x[-(U+V)\sin2x+\kappa\cos^22x+2W\cos2x+2\kappa cs\sin2x].
$$

But

$$
U+V=(\alpha+\zeta)\cos2x+2\kappa cs,\qquad 2W=(\alpha+\zeta)\sin2x-\kappa\cos2x.
$$

The bracket cancels exactly. Therefore $F_+(1,x)=\partial_mF_+(1,x)=0$, and evenness supplies both identities at $m=-1$. The limiting double root does not split into an additional nearby simple oscillatory root.

## 3. Exclusion of the unbounded frequency tail

For the entire physical speed interval $0<\beta<1$, one has $c>7/10$ and $1\le D<2$. In the orthonormal ray basis, $\alpha\ge|\zeta|$, and the symmetric-matrix row-sum bound gives

$$
\|\widehat M_\varepsilon\|\le\alpha+|\gamma|\le\frac{100}{49}+\frac12+\frac57=\frac{319}{98},\qquad \|\widehat N_\varepsilon\|\le\frac{10}{7}.
$$

All rotations and real-frequency phases in the symbol have norm one, and $\|imI+J\|\le|m|+1$. Consequently

$$
\|H_\chi+m^2I\|\le2|m|+1+2\frac{319}{98}+\frac{10}{7}(|m|+1)=\frac{24}{7}|m|+\frac{438}{49}<m^2\quad (|m|\ge6).
$$

The last inequality holds at $|m|=6$ and its positive difference increases thereafter. A Neumann inverse excludes every real root with $|m|\ge6$ in both parities. No integer-frequency assumption enters this argument, and no frequency tail is inferred from a scan.

## 4. Complete compact-frequency factorization

Because the common determinant and its first $m$ derivative vanish at both $\pm1$ for every small $x$, analytic division defines

$$
F_+(m,x)=(m^2-1)^2Q_+(m,x).
$$

The quotient is jointly analytic across $m=\pm1$. One direct construction divides twice by $m-1$ using the integral Taylor identity and then twice by $m+1$; away from these points it is the ordinary quotient. At $x=0$, $Q_+(m,0)=1$ on the whole interval $[-6,6]$. Joint continuity and compactness therefore give $Q_+>1/2$ throughout that interval for all sufficiently small $|x|$. Hence the common roots are exactly $\pm1$, each of multiplicity two.

In the opposite sector, $F_-(0,x)=0$ and evenness give an analytic factorization $F_-=m^2G_-$, with $G_-(m,0)=m^2-1$. The [preceding independent theorem](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent.md) derived

$$
F_-(m,x)=m^2(m^2-1)+m^4x^2+O(x^4)
$$

uniformly with $m$ derivatives near one, including an explicit compact fourth-derivative remainder bound and a strict derivative lower bound. It supplies an even analytic simple root $m_*(x)=1-x^2/2+O(x^4)$, with $0<m_*<1$ for every sufficiently small positive $x$. Evenness supplies its negative. Since $m_*$ stays separated from zero, analytic division at the two moving simple roots yields

$$
F_-(m,x)=m^2[m^2-m_*(x)^2]Q_-(m,x).
$$

The same integral-division construction, now centered at $m=\pm m_*(x)$, makes $Q_-$ jointly analytic over a neighborhood of $[-6,6]\times\{0\}$. At $x=0$, $Q_-=1$. By compactness $Q_->1/2$ on that entire interval after reducing the positive $x$ threshold. Thus the opposite roots are exactly zero, of multiplicity two, and $\pm m_*$, each simple. Their matrices have nullity one: at zero use $a_0<0$, and near $\pm m_*$ use $d\to-1$.

Taking the minimum of these finitely many positive thresholds and that in the preceding root theorem proves the classification for every $0<x<x_0$ with some $x_0>0$, equivalently every $0<\beta<\beta_0=x_0/\cos x_0$. This is an existence theorem for a uniform small-speed interval. It supplies no numerical value of $\beta_0$. The two compact factorizations and the tail inverse together cover the entire real frequency axis, with no unresolved frequency box in this small-speed domain.

## 5. Ordinary and generalized directions

Write $\mathcal L_\chi$ for the constant-coefficient shift-differential operator in rotating coordinates, so $\mathcal L_\chi(e^{im\theta}v)=e^{im\theta}H_\chi(m)v$. Differentiating this identity in $m$ gives

$$
\mathcal L_\chi\{e^{im\theta}(\theta v+w)\}=e^{im\theta}[\theta H_\chi v+H_\chi w-iH_\chi'v].
$$

A generalized direction therefore obeys $H_\chi w=iH_\chi'v$ in addition to $H_\chi v=0$. The factor $i$ is determined by differentiation of the physical exponential and is not a convention-free sign.

### Common translations and their generalized partners

At $m=1$, put $v=(1,i)^{\mathsf T}$, $v_\perp=(1,-i)^{\mathsf T}$, and $k=(a_m-f_m)_{m=1}$. The exact derivative cancellation proves

$$
H_+v=0,\qquad H_+v_\perp=2h v_\perp,\qquad H_+'v=k v_\perp.
$$

Thus the ordinary complex mode is $u=e^{i\theta}v$ and a generalized mode is

$$
u=e^{i\theta}\left[\theta v+\frac{ik}{2h}v_\perp\right].
$$

In physical coordinates these become, respectively,

$$
\eta_1=\eta_2=v,\qquad \eta_1=\eta_2=\theta v+\frac{ik}{2h}e^{2i\theta}v_\perp.
$$

Real and imaginary parts supply two constant translations and two linearly growing generalized directions. For example, direct simplification gives $k=\kappa cs-2x(\alpha-\zeta)cs+x\kappa\cos2x=-x^2+O(x^4)$. The generalized direction generally needs the displayed bounded correction at twice the circle frequency; a pure in-plane common drift is not being assumed to be a variational symmetry. No nonzero real combination of these two generalized directions is bounded, because its leading term is a nonzero fixed vector times $\theta$.

### Opposite phase and its generalized partner

At $m=0$, put $e_R=(1,0)^{\mathsf T}$, $e_T=(0,1)^{\mathsf T}$, and $f_1=(\partial_m f_-)_{m=0}$. Since $a,d$ are even and $f$ is odd,

$$
H_-'(0)e_T=if_1e_R.
$$

The ordinary direction is $u=e_T$, and its generalized partner is

$$
u=\theta e_T-\frac{f_1}{a_0}e_R.
$$

Both have opposite exchange parity. The ordinary solution is the circle's phase rotation; the generalized solution has a secular tangent component and a constant radial component in rotating coordinates. It is proportional, after normalization, to the derivative of the exact circle family with respect to speed. At zero speed its radial coefficient tends to $-2/3$, as follows directly from $f_1\to-2$ and $a_0\to-3$ in the derived tensor. No external orbital law is used. The secular term prevents this generalized direction from being bounded.

### Opposite simple oscillatory pair

At $m=m_*$, set $b=f/d$. Then $b\to2$ and $v_*=(1,ib)^{\mathsf T}$ spans the nullspace. The two real solutions are the real and imaginary parts of

$$
\eta_1(t)=Q(\omega t)v_*e^{im_*\omega t},\qquad \eta_2(t)=-\eta_1(t).
$$

They are bounded with bounded derivatives. Their physical frequencies are $(1\pm m_*)\omega$, both with nonzero amplitude for sufficiently small positive speed. They are quasiperiodic when $m_*$ is irrational, and periodic with a longer period when it is rational. Their simple sector roots admit no polynomially growing generalized partners.

## 6. Completeness in the tempered and bounded classes

Let the rotating planar components be tempered distributions on the whole real $\theta$ axis satisfying $\mathcal L_\chi u=0$ distributionally. Bounded classical solutions are included. Multiplication by $Q(\theta)$ preserves tempered distributions, so this is equivalent to a tempered Cartesian variation. Derivatives and fixed shifts are continuous on this space. Every entry of $H_\chi(m)$ is smooth with derivatives of at most polynomial growth, and is therefore a valid multiplier on the Fourier side.

On an open interval where $H_\chi$ is invertible, testing against compactly supported smooth functions and multiplying by its smooth inverse shows that the Fourier transform vanishes there. Its support is thus contained in the finite root set already classified. A distribution supported at one point is a finite linear combination of derivatives of a delta distribution: this follows from its finite-order bound on a compact neighborhood and subtraction of the finite Taylor jet of a test function. Hence every solution is a finite sum of vector-valued polynomials times the listed exponentials.

It remains to bound polynomial degree and count independent coefficients, because determinant multiplicity alone does not do so for an arbitrary matrix. Here a diagonal entry is nonzero at each root. Local analytic row and column elimination reduces $H_\chi$ to a nonzero scalar pivot and the scalar Schur complement $F_\chi$ divided by that pivot. Both transformations are invertible analytic multipliers. A scalar zero of order $r$ permits exactly the delta derivatives of orders zero through $r-1$; multiplying by the nonvanishing remaining factor is invertible. Each rank-one root therefore contributes exactly $r$ complex solution coefficients and permits polynomial degree at most $r-1$ after inverse transformation. This proves that the explicit ordinary and generalized directions above exhaust the solution space.

The common pair $\pm1$ contributes four real directions after imposing conjugacy: two translations and two generalized directions. Opposite zero contributes two real directions: phase and its generalized partner. The simple opposite pair contributes two further real directions. The total tempered dimension is eight. Boundedness removes precisely the two common generalized directions and the one opposite generalized direction. Their secular terms cannot cancel between different exchange parities, and the remaining directions are bounded. The bounded planar dimension is therefore five.

Together with the [frozen bounded normal classification](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md), this yields eight bounded real Cartesian directions at sufficiently small positive speed: the six Euclidean directions and the two additional planar oscillatory directions. This last statement concerns the same whole-line variational equation and uses the independent normal theorem as an explicit additional premise.

## 7. Claim boundaries, provenance and falsifiers

The classification is complete over real continuous frequencies only on a sufficiently small positive speed interval. It does not classify the full complex spectrum, all subfield speeds, nonlinear periodic or quasiperiodic solutions, or causal release. The fixed-period kernel theorem remains consistent: integer frequencies retain only the Euclidean directions. Global boundedness removes the polynomial generalized directions but does not remove the noninteger planar oscillatory pair.

The circle, Cartesian tensor and full source-clock derivation are unchanged antecedents. Their SHA-256 values are recorded in the [preceding independent subject](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent.md), whose frozen hash is `53ffa20c6583a0f8cd9c1bea532814cffd0a4c070fd0cd5b14d129839b0ccfae`. The present protocol hash is `dc2a3666f446ab57d97532fbd70e8621a3557dd6429bf513a4b907812f3b99b3`. No source or reference was modified to obtain agreement. Independent coordinator assessment remains required before shared integration.

The exact controls are the limiting determinants, physical translation and phase identities, and direct substitution of every generalized mode into $H w=iH'v$. The new mathematical evidence is the exact common derivative cancellation, the complete compact factorization, the uniform real-frequency tail inverse, and the local scalar elimination of every matrix root. No numerical target, numerical threshold or solver validation is claimed.

Falsifiers are a missing source-clock or source-acceleration term; failure of the exact identity $a_m+d_m-2f_m=0$ at common $m=1$; a real root outside the listed set at arbitrarily small positive speed; failure of the uniform tail norm inequality or analytic quotient continuation; matrix nullity greater than one at a listed root; a wrong sign in a generalized-mode equation; or a tempered solution outside the finite span proved above. A nonlinear stability inference would exceed the result even if the classification itself is correct.

Separate editorial disposition: a case-insensitive `rg` search of the preceding time-symmetric analysis sources found prohibited causal terminology in the frozen bounded-normal subject, line 226. That source and its hash remain unchanged; editorial correction belongs to the coordinator's separately owned disposition.
