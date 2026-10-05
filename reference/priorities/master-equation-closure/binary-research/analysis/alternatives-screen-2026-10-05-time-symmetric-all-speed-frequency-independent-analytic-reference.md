# All-speed common exclusion and opposite-sector reference

Status: independent analytical reference frozen 2026-10-05 before any new target instrument or coordinator report was read. The [protocol](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-protocol.md) fixes the complete Section 14 equal past/future circle, opposite polarities, $K=c_f=1$, and every $0<\beta<1$. This source proves an all-speed common-sector classification and an all-speed opposite phase multiplicity and existence result. Opposite-pair uniqueness and exclusion of additional opposite pairs are explicitly unresolved here.

## 1. Complete symbol and notation

Use the complete physical Cartesian derivative and symbol in the [frozen small-speed classification](alternatives-screen-2026-10-05-time-symmetric-planar-classification-independent.md), Sections 1–2. That derivative retains $\delta S=\varepsilon n\cdot(\eta_i-\eta_j)/D_\varepsilon$ and $\delta v_j=\eta_j'+a_j\delta S$ in both time directions. No delay, source acceleration, rotating physical derivative or ordinary root is removed. Write

$$
x=\beta\cos x,\quad c=\cos x,\quad s=\sin x,\quad D=1+\beta s,\quad R=(4\beta^2cD)^{-1},\quad \omega=\beta/R.
$$

The exact circle is balanced with complete partner roots $t\pm2x/\omega$, and strict subfield speed excludes nonzero-age self roots. The instantaneous diagonal is not assigned a new rule. Throughout $0<x<x_*<3/4<\pi/4$ and $x_* =\cos x_*$. The frequency $m$ is any real number in rotating time $\theta=\omega t$.

The future ray-basis tensors are

$$
\widehat M=\begin{pmatrix}\alpha&\gamma\\\gamma&\zeta\end{pmatrix},\quad \widehat N=\kappa\begin{pmatrix}1&0\\0&0\end{pmatrix},\quad
\alpha=\frac1{c^2D}+\frac{\beta^2}{2D^2},\quad \zeta=-\frac1{2c^2},\quad \gamma=-\frac\kappa2,\quad \kappa=\frac\beta{cD}.
$$

The physical rotation and past reflection give the exact Hermitian symbol $H_\chi=(a,if;-if,d)$:

$$
\begin{aligned}
A&=\alpha c^2+\kappa cs+\zeta s^2,& C&=\alpha s^2-\kappa cs+\zeta c^2,\\
U&=\alpha c^2-\zeta s^2+\kappa cs,& V&=-\alpha s^2+\zeta c^2+\kappa cs,\\
W&=(\alpha+\zeta)cs-\frac\kappa2\cos2x,\\
a&=-m^2-1-A+\chi[U\cos(2mx)+m\kappa c^2\sin(2mx)],\\
d&=-m^2-1-C+\chi[V\cos(2mx)-m\kappa s^2\sin(2mx)],\\
f&=-2m+\chi[-W\sin(2mx)+m\kappa cs\cos(2mx)].
\end{aligned}
$$

All following algebra is from this fixed symbol. Let $L=\alpha+\zeta$, $B=\alpha-\zeta$, $r=\kappa x=\beta^2/D$, and

$$
u=\frac{x^2}{D^2},\qquad \epsilon=\frac{\beta^2(1-\beta^2)}{2D^2}>0.
$$

In the orthonormal circular basis $(1,i)/\sqrt2,(1,-i)/\sqrt2$, the symbol becomes a real symmetric matrix with diagonal entries

$$
\phi_\chi(m-1),\quad\phi_\chi(m+1),\qquad \phi_\chi(q)=-q^2-\frac L2+\frac\chi2[L\cos(2qx)+q\kappa\sin(2qx)],
$$

and off-diagonal entry

$$
\psi_\chi(m)=\frac{\chi g(m)-g(1)}2,\qquad g(t)=B\cos(2tx)+t\kappa\sin(2tx).
$$

The identities $U+V=L\cos2x+\kappa\sin2x$ and $2W=L\sin2x-\kappa\cos2x$ prove the two diagonal formulas; $U-V=B$ and $A-C=g(1)$ prove the off-diagonal formula. This basis change is unitary and preserves determinant, nullity and multiplicity.

## 2. Common sector: all real frequencies at every subfield speed

Define the entire real function $\operatorname{sinc}z=\sin z/z$, with its removable value one. Then

$$
\phi_+(q)=-q^2\mathcal A(q),\qquad \mathcal A(q)=1+Lx^2\operatorname{sinc}^2(qx)-r\operatorname{sinc}(2qx).
$$

First, $L=(1+\beta^2\cos2x)/(2c^2D^2)>0$. Also

$$
r-2Lx^2=\frac{\beta^2(D^2-D-x^2)}{D^2}>0,
$$

because $D=1+x\tan x$ and $D^2-D-x^2=x(\tan x-x+x\tan^2x)>0$. The elementary inequality

$$
\operatorname{sinc}(2z)=\operatorname{sinc}z\cos z\le\frac{\operatorname{sinc}^2z+1}{2}
$$

therefore gives the uniform lower bound

$$
\mathcal A(q)\ge \mathcal A(0)=a_*:=1-\frac{\beta^2}{2}+\frac{\beta^2u}{2}>0.
$$

For the off-diagonal entry, put $\mathcal B(m)=[g(m)-g(1)]/[2(m^2-1)]$, using its continuous values at $m=\pm1$. Treat $g$ as an entire function of $y=t^2$. With $w=2x\sqrt y$,

$$
\frac12\frac{dg}{dy}=\frac r2[\cos w-3\operatorname{sinc}w]+\epsilon\operatorname{sinc}w.
$$

Here the exact coefficient identity is $2r-Bx^2=\epsilon$. For every real $w$,

$$
|\cos w-3\operatorname{sinc}w|\le2.
$$

For completeness, on $[0,\pi]$ the upper inequality $3\sin w/w-\cos w\le2$ follows by setting $f(w)=w(2+\cos w)-3\sin w$: $f(0)=f'(0)=f''(0)=0$ and $f'''(w)=w\sin w\ge0$. The lower inequality on this interval follows from $\sin w\ge0$. For $w\ge\pi$, the absolute value is at most $1+3/w\le1+3/\pi<2$; evenness covers negative $w$.

Applying the mean-value integral in $y$ between $1$ and $m^2$ gives $|\mathcal B(m)|\le r+\epsilon=:b_*$. The strict gap is

$$
a_*-b_*=(1-\beta^2)\left(1-\frac{\beta^2}{D^2}\right)>0.
$$

Consequently the circular-basis symbol has the exact factorization

$$
H_+=-\begin{pmatrix}m-1&0\\0&m+1\end{pmatrix}
\begin{pmatrix}\mathcal A(m-1)&-\mathcal B(m)\\-\mathcal B(m)&\mathcal A(m+1)\end{pmatrix}
\begin{pmatrix}m-1&0\\0&m+1\end{pmatrix}.
$$

The middle matrix is positive definite, with quadratic form at least $(a_*-b_*)|v|^2$. Therefore

$$
F_+(m,x)=(m^2-1)^2Q_+(m,x),\qquad Q_+\ge a_*^2-b_*^2>0
$$

for every real $m$ and every $0<\beta<1$. The only common real roots are exactly $m=\pm1$, each of determinant multiplicity two and matrix nullity one. This is an all-speed, all-real-frequency analytic exclusion. Its quantitative lower bound degenerates as $\beta\uparrow1$, which does not invalidate the strictly subfield statement.

The Fourier-support and scalar-elimination argument in the frozen classification now applies to the common sector at every fixed subfield speed. Its tempered real solution space has dimension four, with two translations and two generalized directions growing linearly. The only bounded common planar solutions are translations. The exact generalized formulas in that source remain valid because their rank and multiplicity premises now hold throughout the speed interval.

## 3. Opposite sector: exact phase multiplicity and existence at every speed

The circular-basis opposite diagonal is strictly negative at every real frequency. Indeed

$$
-\phi_-(q)=q^2+L\cos^2(qx)+q\kappa\sin(qx)\cos(qx)\ge (1-r)q^2+L\cos^2(qx)>0,
$$

using $r=\beta^2/D<1$; at $q=0$ the last term is $L>0$. Thus $\operatorname{tr}H_-<0$ for every real $m$, and every real zero of its determinant has matrix nullity exactly one.

There is a further exact simplification at the phase root. The expansion about $m=0$ is

$$
a=-(3+u)+O(m^2),\qquad d=-(1+u)m^2+O(m^4),\qquad f=-(2+u)m+O(m^3).
$$

These identities follow by substituting the exact coefficients above and using $\beta^2=x^2+(D-1)^2$. For example, $a(0)=-(3+u)$, $\partial_m f(0)=-(2+u)$, and $\tfrac12\partial_m^2d(0)=-(1+u)$. Hence

$$
F_-(m,x)=-m^2+O(m^4),\qquad \left.\frac{F_-(m,x)}{m^2}\right|_{m=0}=-1
$$

exactly at every subfield speed. The phase root is always exactly double, so no extra real pair can be born by changing its multiplicity. Its ordinary mode is phase rotation and its unique generalized partner has rotating coordinates

$$
u_{\mathrm{gen}}(\theta)=\theta e_T-\frac{2+u}{3+u}e_R.
$$

The existing [independent finite-mode certificate](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) proves $F_-(1,x)>0$ for every physical $x>0$: its normalized factor exceeds $811/1000$ on the complete enclosing interval $[0,3/4]$. This is an explicitly imported frozen interval theorem, not a new sample or an inference from integer-mode absence. Since $F_-/m^2=-1$ at zero, continuity gives at least one real opposite root in $(0,1)$ for every fixed $0<\beta<1$, and its negative counterpart. At least one root in this interval has odd multiplicity. Simplicity and uniqueness throughout the speed interval are not proved by this sign change.

In particular, a non-Euclidean bounded planar oscillatory direction exists at every strictly subfield speed. A null vector at any such $0<m<1$ yields a bounded smooth mode; the exchange parity and nonzero rotating frequency distinguish it from translations and phase rotation. This assertion requires no claim that the same locally simple small-speed branch remains simple through all speeds.

## 4. Exact regularized scalar reference for remaining opposite roots

For a possible independent enclosure, the remaining problem can be stated without dividing interval determinants by a frequency interval containing zero. Set $y=m^2\ge0$ and define entire functions of $y$,

$$
C_y^{\mathrm{fun}}=\cos(2x\sqrt y),\quad S_y^{\mathrm{fun}}=\operatorname{sinc}(2x\sqrt y),\quad T_y^{\mathrm{fun}}=\operatorname{sinc}^2(x\sqrt y).
$$

The superscript distinguishes function names from derivatives; below abbreviate them as $\mathsf C,\mathsf S,\mathsf T$. Their values and derivatives can be enclosed by their entire power series:

$$
\mathsf C=\sum_{j=0}^{\infty}\frac{(-1)^j(4x^2y)^j}{(2j)!},\qquad
\mathsf S=\sum_{j=0}^{\infty}\frac{(-1)^j(4x^2y)^j}{(2j+1)!},\qquad
\mathsf T=2\sum_{j=0}^{\infty}\frac{(-1)^j(4x^2y)^j}{(2j+2)!}.
$$

Define

$$
\bar a=-1+2Ux^2\mathsf T-2\kappa c^2x\mathsf S,\quad
\bar d=-1+2Vx^2\mathsf T+2\kappa s^2x\mathsf S,\quad
\bar f=-2+2Wx\mathsf S-\kappa cs\mathsf C.
$$

Then $a=a_0+y\bar a$, $d=y\bar d$, $f=m\bar f$, where $a_0=-(3+u)$, and the exact regularized determinant is

$$
G(y,x):=\frac{F_-(m,x)}{m^2}=a_0\bar d-\bar f^2+y\bar a\bar d.
$$

Its removable value is $G(0,x)=-1$. Its derivative is

$$
\partial_yG=a_0\partial_y\bar d-2\bar f\partial_y\bar f+\bar a\bar d+y[(\partial_y\bar a)\bar d+\bar a\partial_y\bar d].
$$

At $x=0$ the exact controls are $G(y,0)=y-1$ and $\partial_yG(y,0)=1$ for all $y$. For $y>0$, the independent original Cartesian assembly must give $\det H_-(\sqrt y,x)=yG(y,x)$. Derivative-series remainder bounds and interval coverage would be additional instrument obligations; they are not supplied by a numerical agreement at selected points.

A complete certificate of $\partial_yG>0$ on $x\in[0,3/4]$, $y\in[0,36]$ would suffice to finish the opposite all-speed classification, using $G(0,x)=-1$, $G(1,x)>0$ for $x>0$, and the existing $|m|\ge6$ tail inverse. This is a sufficient proposed test, not a claim that its sign holds. It may be stronger than necessary, and its failure would not by itself demonstrate an extra root.

## 5. Exact remaining domain and claim boundary

The common sector is completely resolved for every fixed $0<\beta<1$. Opposite zero has exactly its phase multiplicity, and every speed has at least one additional bounded oscillatory pair with $0<|m|<1$. The existing small-speed theorem completely classifies a positive neighborhood of zero speed. The all-speed norm bound excludes every real $|m|\ge6$; the existing finite certificate excludes opposite integer $|m|=1,2,3,4,5$.

The unresolved all-speed set is therefore entirely opposite parity, with $0<|m|<6$ and $|m|\notin\{1,2,3,4,5\}$. Any change from the small-speed count at an interior speed must pass through a nonzero multiple root satisfying $F_-=\partial_mF_-=0$ in this set. Roots cannot enter from infinity, and the exact phase coefficient prevents entry through zero. On each compact speed subinterval strictly inside $(0,1)$, continuity and these endpoint exclusions keep roots away from zero and the integer dividing points. This identifies the missing collision-exclusion obligation without claiming it has been met.

The conclusions concern whole-line linear boundary solutions. No nonlinear quasiperiodic family, stability, advanced initial-value solution, causal release or complete complex spectrum follows. No new numerical instrument or target has been run for this reference.

Input provenance: the frozen small-speed classification has SHA-256 `c6596505ad8b4acd6779205bf8beaf812c21f6bd59dd61388456abcbadaab00c`; the preceding frequency derivation has SHA-256 `53ffa20c6583a0f8cd9c1bea532814cffd0a4c070fd0cd5b14d129839b0ccfae`; the imported finite interval theorem has SHA-256 `d9b643565d9682fad07df0476f8a6802d0de254b850f570ad4021d930a996c80`. Existing sources remain immutable.

Falsifiers are a failure of the circular-basis identities; a violation of either scalar trigonometric bound; an incorrect coefficient identity $2r-Bx^2=\epsilon$; a nonpositive claimed common gap; a different opposite phase coefficient; a flaw in the explicitly imported first-frequency interval theorem; or an inconsistency between $yG$ and the original full Cartesian determinant. Additional opposite roots or multiple opposite roots would resolve the stated open question adversely, but would not contradict the narrower existence and common-sector results proved here.
