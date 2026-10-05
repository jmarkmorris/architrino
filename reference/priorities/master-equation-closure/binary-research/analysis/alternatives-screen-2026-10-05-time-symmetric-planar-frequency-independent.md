# Bounded planar frequencies outside the circle period

Status: independent analytical subject, 2026-10-05, prepared under the Poincare lens and [frozen analytical protocol](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent-protocol.md). The coordinator's new planar reference was not read before this source was frozen. Every mathematical assertion below is derived from the selected acceleration law. No numerical target or solver run supplies a premise.

For every sufficiently small positive speed, the balanced equal past/future circle has a bounded planar variational direction that is not an infinitesimal Euclidean motion and does not have the circle's physical period. Its positive rotating-frame frequency divided by the circle frequency is

$$
m(\beta)=1-\frac{\beta^2}{2}+O(\beta^4).
$$

This is a simple root in the opposite-displacement planar sector. The statement concerns the complete linearized boundary equation on the whole time axis. It does not construct a nonlinear noncircular history or determine causal stability.

## 1. Complete circle and source clocks

Select exactly the Section 14 law of [the original binary source](alternatives-screen-2026-10-05-binary.md): canonical radial acceleration with equal past/future weights, opposite polarities, $K=c_f=1$, and no additional response factor. For $0<\beta<1$, define

$$
x=\beta\cos x,\quad c=\cos x,\quad s=\sin x,\quad D=1+\beta s,\quad R=\frac1{4\beta^2cD},\quad \omega=\frac\beta R,\quad \tau=2Rc=\frac{2x}{\omega}.
$$

The complete base histories are $X_1(t)=R(\cos\omega t,\sin\omega t,0)$ and $X_2(t)=-X_1(t)$. At reception on the positive horizontal axis, the partner source times are exactly $t\pm\tau$. The two acceleration contributions have opposite tangent components and their half-weighted sum is $-e_R/(4R^2cD)=-R\omega^2e_R$. Thus the base is balanced before linearization.

Completeness follows directly from the uniform speed bound. In either time direction the partner root function is strictly monotone with derivative of magnitude at least $1-\beta$; its sign changes between zero age and sufficiently large age because the paths are bounded. There is exactly one partner root in each direction. A nonzero-age self root would require a displacement equal to its age, whereas the displacement is at most $\beta$ times that age. No such root exists. This argument does not prescribe an instantaneous diagonal contribution.

For an arbitrary Cartesian variation $\eta$, put $\varepsilon=-1$ for the past root and $+1$ for the future root, $S=t+\varepsilon\tau$, $\ell=|X_i(t)-X_j(S)|$, $n=(X_i(t)-X_j(S))/\ell$, $v=X_j'(S)$, $a_s=X_j''(S)$, $D_\varepsilon=1+\varepsilon n\cdot v$, and $P=I-nn^{\mathsf T}$. With $d_0=\eta_i(t)-\eta_j(S)$, differentiation of the root equation gives

$$
\delta S=\frac{\varepsilon n\cdot d_0}{D_\varepsilon},\qquad \delta r=B_\varepsilon d_0,\qquad B_\varepsilon=I-\frac{\varepsilon v n^{\mathsf T}}{D_\varepsilon},\qquad \delta v=\eta_j'(S)+a_s\delta S.
$$

Differentiating the one-row acceleration $\sigma n/(\ell^2D_\varepsilon)$, with $\sigma=-1$, therefore yields

$$
\delta A=M_\varepsilon d_0+N_\varepsilon\eta_j'(S),
$$

$$
\begin{aligned}
M_\varepsilon&=\frac{\sigma}{\ell^3D_\varepsilon}\left[(I-3nn^{\mathsf T})B_\varepsilon-\frac{\varepsilon n v^{\mathsf T}P B_\varepsilon}{D_\varepsilon}-\frac{\ell(n\cdot a_s)nn^{\mathsf T}}{D_\varepsilon^2}\right],\\
N_\varepsilon&=-\frac{\sigma\varepsilon nn^{\mathsf T}}{\ell^2D_\varepsilon^2}.
\end{aligned}
$$

The last term of $M_\varepsilon$ retains the acceleration caused by shifting the source velocity's evaluation time. The selected linearized law averages these complete past and future rows.

## 2. Continuous-frequency planar block

Let $Q(\theta)$ be counterclockwise planar rotation and $J=Q'(0)$. Write $\eta_i(t)=Q(\omega t)u_i(\omega t)$ in the plane. Exchange parity $\chi=+1$ means $u_2=u_1$, and $\chi=-1$ means $u_2=-u_1$. A trial $u_1(\theta)=v_0e^{im\theta}$ is meaningful for every real $m$; integer $m$ is needed only when the variation is required to have the base period.

Resolve the future tensor in the orthonormal ray basis $n=(c,s)$, $t_r=(-s,c)$. On the circle, $v\cdot n=\beta s$, $v\cdot t_r=-\beta c$, and $\ell(n\cdot a_s)=2\beta^2c^2$. Substitution in the preceding derivative gives

$$
\frac{M_+}{\omega^2}=\alpha nn^{\mathsf T}+\gamma(nt_r^{\mathsf T}+t_rn^{\mathsf T})+\zeta t_rt_r^{\mathsf T},\qquad \frac{N_+}{\omega}=\kappa nn^{\mathsf T},
$$

$$
\alpha=\frac1{c^2D}+\frac{\beta^2}{2D^2},\qquad \gamma=-\frac{\beta}{2cD},\qquad \zeta=-\frac1{2c^2},\qquad \kappa=\frac{\beta}{cD}=-2\gamma.
$$

For example, $B_+$ in this basis is $(1/D,0;\beta c/D,1)$, and the bracket in $M_+$ is $(-2/D-\beta^2c^2/D^2,\beta c/D;\beta c/D,1)$. The source-acceleration shift contributes to its first entry and hence to $\alpha$. With $E=\operatorname{diag}(1,-1)$, the past tensors obey $M_-=EM_+E$, $N_-=-EN_+E$.

Define

$$
\begin{aligned}
A&=\alpha c^2+\kappa cs+\zeta s^2,& C&=\alpha s^2-\kappa cs+\zeta c^2,\\
U&=\alpha c^2-\zeta s^2+\kappa cs,& V&=-\alpha s^2+\zeta c^2+\kappa cs,\\
W&=(\alpha+\zeta)cs+\gamma\cos(2x).
\end{aligned}
$$

The dimensionless receiving operator is

$$
H_\chi=(imI+J)^2-\frac{M_++M_-}{2\omega^2}+\frac\chi2\sum_{\varepsilon=\pm1}\left[\frac{M_\varepsilon}{\omega^2}-\frac{N_\varepsilon}{\omega}(imI+J)\right]Q(2\varepsilon x)e^{2i\varepsilon mx}.
$$

Multiplication and reflection give the Hermitian matrix, for real $m$,

$$
H_\chi(m,x)=\begin{pmatrix}a&i f\\-i f&d\end{pmatrix},\qquad F_\chi(m,x)=\det H_\chi=ad-f^2,
$$

$$
\begin{aligned}
a&=-m^2-1-A+\chi[U\cos(2mx)+m\kappa c^2\sin(2mx)],\\
d&=-m^2-1-C+\chi[V\cos(2mx)-m\kappa s^2\sin(2mx)],\\
f&=-2m+\chi[-W\sin(2mx)+m\kappa cs\cos(2mx)].
\end{aligned}
$$

Both the delayed phase and the advanced phase are present. The $N_\varepsilon J$ term comes from differentiating the physical rotated source displacement; omitting it changes the block. This derivation reproduces the [frozen Cartesian formulation](alternatives-screen-2026-10-05-time-symmetric-speed-family-formulation.md) without any restriction of $m$ to integers.

As exact algebraic controls, setting $x=0$ gives

$$
H_+(m,0)=\begin{pmatrix}-m^2-1&-2im\\2im&-m^2-1\end{pmatrix},\qquad H_-(m,0)=\begin{pmatrix}-m^2-3&-2im\\2im&-m^2\end{pmatrix},
$$

and determinants $(m^2-1)^2$ and $m^2(m^2-1)$. For nonzero $x$, a constant physical translation supplies common $m=\pm1$, and a change of circle phase supplies opposite $m=0$. These controls follow independently from translation and rotation covariance of the original root equation. The limiting point $x=0$ is only the regular analytic continuation of these normalized tensors; the physical radius diverges there.

## 3. Controlled continuation of the opposite root

Use $\beta=x/c$. All entries above are real analytic and even in $x$ for real $m$ near one. In particular, $D=1+x\tan x$, so neither $c$ nor $D$ vanishes on $|x|\le1/8$. Direct Taylor expansion of the ray tensors gives

$$
\alpha=1+\frac{x^2}{2}+O(x^4),\quad \gamma=-\frac x2+O(x^5),\quad \zeta=-\frac12-\frac{x^2}{2}+O(x^4),\quad \kappa=x+O(x^5),
$$

$$
A=1+O(x^4),\quad C=-\frac12+O(x^4),\quad U=1+x^2+O(x^4),\quad V=-\frac12+O(x^4),\quad W=\frac23x^3+O(x^5).
$$

Using $\sin(2mx)=2mx+O(x^3)$ and $\cos(2mx)=1-2m^2x^2+O(x^4)$ then gives, in the opposite sector,

$$
a=-m^2-3-x^2+O(x^4),\qquad d=-m^2-m^2x^2+O(x^4),\qquad f=-2m-mx^2+O(x^4).
$$

All remainders are uniform with any fixed finite number of $m$ derivatives on a compact neighborhood of one. In particular,

$$
F_-(m,x)=m^2(m^2-1)+m^4x^2+\mathcal E(m,x).
$$

The following explicit derivative bound makes the remainder assertion sufficient for a theorem rather than a formal expansion. On the compact set $\mathcal K=[3/4,5/4]\times[-1/8,1/8]$, define the finite positive constant

$$
C_4=1+\frac1{24}\max_{\mathcal K}\left(|\partial_x^4 F_-|+|\partial_m\partial_x^4 F_-|\right).
$$

Taylor's integral remainder and evenness give $|\mathcal E|+|\partial_m\mathcal E|\le C_4x^4$. This definition uses the displayed exact elementary function and contains no numerical estimate or unproved finite-precision premise. Put

$$
\delta=\min\left\{\frac18,\frac1{\sqrt{4(C_4+16)}},\frac1{(4C_4)^{1/4}}\right\}>0.
$$

For $0<x<\delta$ and $a_0\in\{1/4,3/4\}$, substitution of $m=1-a_0x^2$ yields

$$
F_-(1-a_0x^2,x)=(1-2a_0)x^2+E_{a_0},\qquad |E_{a_0}|\le(C_4+16)x^4\le\frac{x^2}{4}.
$$

To check the harmless integer $16$, write $t=x^2$ and expand the polynomial part exactly: its coefficients after the leading term are $5a_0^2-4a_0$, $-4a_0^3+6a_0^2$, $a_0^4-4a_0^3$, and $a_0^4$ at powers $t^2,t^3,t^4,t^5$. Their absolute sum is less than $16$ for $0\le a_0\le3/4$ and $0\le t\le1$. Thus the determinant is negative at $1-3x^2/4$ and positive at $1-x^2/4$.

For every $m\in[7/8,9/8]$,

$$
\partial_mF_-=4m^3-2m+4m^3x^2+\partial_m\mathcal E\ge\frac{119}{128}-\frac14>\frac12.
$$

The intermediate value theorem and this monotonicity prove a unique simple root in this entire fixed $m$ neighborhood, with

$$
1-\frac{3x^2}{4}<m(x)<1-\frac{x^2}{4},\qquad \left|m(x)-1+\frac{x^2}{2}\right|\le2(C_4+16)x^4.
$$

The analytic implicit function theorem, whose nonzero derivative is explicitly $\partial_mF_-(1,0)=2$, shows that this root is real analytic and even in $x$. Consequently $m'(x)=-x+O(x^3)$, and it is strictly decreasing after reducing the positive neighborhood if needed. The map $\beta=x/\cos x$ is strictly increasing there. Since $x=\beta-\beta^3/2+O(\beta^5)$,

$$
m(\beta)=1-\frac{\beta^2}{2}+O(\beta^4).
$$

In particular, the existence and simple-root assertion holds for every $0<\beta<\delta/\cos\delta$. No numerical value is claimed for this positive endpoint. The later monotonicity and eigenvector statements may use a smaller positive endpoint, also independent of the individual sufficiently small speed. Evenness in $m$ gives the conjugate simple root $-m(x)$ in the same opposite sector.

## 4. Actual bounded Cartesian variations

Near this root, $d$ stays negative and tends to $-1$. Set $b=f/d$, evaluated at $m(x)$. It is real analytic and $b\to2$. The vector $v_0=(1,ib)^{\mathsf T}$ satisfies $H_-v_0=0$, because its second row vanishes directly and its first row is $a-f^2/d=0$. The real and imaginary parts of

$$
\eta_1(t)=Q(\omega t)v_0e^{im\omega t},\qquad \eta_2(t)=-\eta_1(t)
$$

are two independent real, smooth, uniformly bounded whole-line variational solutions, with all derivatives bounded. The written complex formula denotes the complexification of the real linear equation, not a complex physical position.

For the real part, the physical planar coordinate can be written as

$$
\eta_{1x}(t)+i\eta_{1y}(t)=\frac{1-b}{2}e^{i(1+m)\omega t}+\frac{1+b}{2}e^{i(1-m)\omega t}.
$$

Both coefficients are nonzero for every sufficiently small positive speed because $b\to2$. Both frequencies are positive and distinct because $0<m<1$. If $m$ is irrational, their ratio $(1+m)/(1-m)$ is irrational, and this is a bounded quasiperiodic linear variation with two incommensurate frequencies. If $m$ is rational, the variation is periodic with a period longer than the circle period; it still is not a fixed-physical-period variation. Strict monotonicity of the analytic branch supplies an interval of $m$ values, so both types occur arbitrarily near zero speed, and the rational-frequency exceptions are at most countable in a sufficiently small speed interval.

Planar infinitesimal translations have common exchange parity. The planar infinitesimal rotation has opposite parity and rotating frequency zero. Rotations about axes in the circle plane are normal, not planar. Our opposite-parity frequency $0<m<1$ is therefore not Euclidean. It also has an oscillatory radial component, unlike the phase direction. Changing the circle speed changes its physical angular frequency and produces a secular tangent term in physical time; that is not the bounded two-frequency direction constructed here.

Each fixed positive-speed circle has a strict speed margin. Since these variations and their first derivatives are bounded, sufficiently small affine perturbations of the complete paths remain separated and uniformly subfield, and their complete ordinary root census persists. They solve the variational equation, however, not the nonlinear boundary equation: a residual of second order is not a nonlinear solution. No nonlinear family, torus, persistence theorem, advanced initial-value problem, or causal-release fate follows from this construction.

## 5. Relation to earlier conclusions and limits

The [fixed-period kernel theorem](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) examines integer rotating frequencies. The present root is strictly between zero and one for every sufficiently small positive speed. Therefore the new direction is consistent with the six-dimensional Euclidean kernel at the circle's fixed physical period and with the [local periodic circle classification](alternatives-screen-2026-10-05-time-symmetric-speed-family-local-classification.md). For rational $m=p/q$ in lowest terms with $0<p<q$, any period of the combined base and variation is a multiple of $q$ circle periods; the frequency calculation supplies no nonlinear solution of that period.

The [bounded normal-sector classification](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) eliminates non-Euclidean bounded normal solutions. Global boundedness therefore has different implications in the two sectors: it removes the non-Euclidean normal directions while retaining the planar directions proved here. A proposed full-Cartesian bounded-kernel classification as only Euclidean motions is false for sufficiently small positive speeds.

The theorem establishes a local opposite-sector root pair. It neither classifies the other continuous real frequencies nor proves simplicity in the product of all planar and normal characteristic factors. In particular, the common-sector double root of the zero-speed limiting determinant requires its own analysis if one wants an exhaustive small-speed spectrum. No claim is made that all positive subfield speeds retain this particular branch.

## 6. Provenance, falsifiers and validation boundary

The independent checks are the root differentiation, physical tensor reconstruction, Euclidean symmetry controls, limiting determinants, and explicit uniform Taylor remainder above. They are mathematical checks; there was no numerical root search, interval target, or production-solver run. An independently authored coordinator assessment remains required before integration.

The frozen input SHA-256 values, measured with `shasum -a 256` on these exact paths, are:

| Input | SHA-256 |
| --- | --- |
| [Binary law, circle and Cartesian derivative](alternatives-screen-2026-10-05-binary.md) | `9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3` |
| [Cartesian speed-family formulation](alternatives-screen-2026-10-05-time-symmetric-speed-family-formulation.md) | `40f8721c7155d10537f1665a4626abb4b1ade9ae866a2c16dc61163ac1c6c753` |
| [Fixed-period kernel](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) | `d9b643565d9682fad07df0476f8a6802d0de254b850f570ad4021d930a996c80` |
| [Local periodic classification](alternatives-screen-2026-10-05-time-symmetric-speed-family-local-classification.md) | `0f1cb27cdd594471a4271b2c9a5a649486d8384e7d249c96e8edaf666b435ab4` |
| [Bounded normal classification](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) | `f72f83f2d6f6c3da9d56b86242786ccba7bea94bde98ba77360367324b8d2fdb` |
| [Independent analytical protocol](alternatives-screen-2026-10-05-time-symmetric-planar-frequency-independent-protocol.md) | `a527ab48a035e35dc11c40527987e4d7102abe6ba0b93094365599e338566d13` |

Checkable falsifiers are a failure of either root derivative identity; a missing $a_s\delta S$ term; disagreement of the displayed block with direct Cartesian past/future substitution; an $x^2$ determinant coefficient different from $m^4$; failure of the fourth-derivative compact bound or the endpoint signs; failure of $H_-(1,ib)^{\mathsf T}=0$; or an expression of the displayed opposite, nonzero-frequency planar variation as an infinitesimal Euclidean motion. A nonlinear or causal claim would exceed this source regardless of whether its linear algebra is correct.
