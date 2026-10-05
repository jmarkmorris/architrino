# All-frequency and bounded normal variation of the time-symmetric circle

## Result, scope and existing antecedent

**Grade: derived independent subject, 2026-10-05, pending separate assessment.** Fix any $0<\beta<1$ in the balanced Section 14 equal past/future canonical radial family, $\alpha=1/2$ and $K=c_f=1$. The only real temporal frequencies in its full Cartesian normal variational operator are zero in the common sector and $\pm\omega$ in the opposite sector. Zero has multiplicity two, while $\pm\omega$ are simple. Every real tempered-distribution normal solution is

$$
z_1(t)=A+Bt+C\cos\omega t+D\sin\omega t,
\qquad
z_2(t)=A+Bt-C\cos\omega t-D\sin\omega t.
\tag{1}
$$

Consequently every globally bounded normal solution has $B=0$ and is exactly a vertical translation plus two rigid-tilt directions. This excludes additional quasiperiodic or nonperiodic bounded normal solutions without first imposing the circle's period. It does not classify planar variations or nonlinear bounded solutions.

The [original binary source, Section 8](alternatives-screen-2026-10-05-binary.md#8-time-symmetric-cartesian-first-variation-and-exact-transverse-spectrum), already establishes the normal mixed-time equation, the unique positive real common exponential rate and the fixed-period normal kernel. It even excludes every nonzero real oscillation frequency in the common sector. Those are antecedents, not new findings here. The new closure is the unrestricted opposite-sector real-frequency exclusion, multiplicities, whole tempered normal kernel and a second real-space proof of the bounded classification. The [case protocol](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-protocol.md) was frozen first. No new coordinating normal-spectrum source was consulted.

## Balanced reference and complete first variation

Let

$$
x=\beta\cos x,\quad c=\cos x,\quad D_0=1+\beta\sin x,
\quad R=\frac1{4\beta^2cD_0},\quad \omega=\frac\beta R,
$$

$$
X_1(t)=R(\cos\omega t,\sin\omega t,0),\qquad X_2(t)=-X_1(t).
$$

At each reception, the past and future partner roots are $S_\varepsilon=t+\varepsilon\tau$, $\varepsilon=\pm1$, with common range and delay $\tau=2Rc=2x/\omega$ and common denominator $D_0$. Their half-weighted tangential accelerations cancel; their radial sum is $-e_R/(4R^2cD_0)=-R\omega^2e_R$. Thus the reference is balanced before variation.

The strict global speed bound gives the complete census. In each time direction, $a-|X_i(t)-X_j(t+\varepsilon a)|$ increases at least at rate $1-\beta$, begins negative for distinct labels and tends to infinity. Thus each side has exactly one partner root. The self chord is shorter than every nonzero time difference, so no noninstantaneous self root occurs. The same argument holds in a sufficiently small bounded $C^1$ neighborhood of this circle, without periodicity or a mirror restriction on the perturbations. No root is deleted to obtain the operator.

For an arbitrary Cartesian variation $\eta_i$, the complete root and source velocity vary as

$$
\delta S_\varepsilon
=\frac{\varepsilon n\cdot[\eta_i(t)-\eta_j(S_\varepsilon)]}{D_\varepsilon},
\qquad
\delta v=\eta_j'(S_\varepsilon)+X_j''(S_\varepsilon)\delta S_\varepsilon.
\tag{2}
$$

Both terms in the source velocity variation are retained before specialization. For a purely normal variation $\eta_i=z_i e_z$, all base source rays, velocities and accelerations are planar. Thus $\delta S_\varepsilon=0$, $\delta R=0$, $\delta D_\varepsilon=0$ and

$$
\delta n=\frac{z_i(t)-z_j(S_\varepsilon)}\tau e_z.
$$

In particular the source-acceleration shift in (2) vanishes by orthogonality; it is not omitted by freezing a nonzero clock variation. The normal source-velocity perturbation has zero projection onto the planar ray and introduces no extra term. Each attractive radial row therefore has normal derivative $-[z_i(t)-z_j(S_\varepsilon)]/(\tau^3D_0)$.

The exact normal subsystem is

$$
z_i''(t)=-k\left[z_i(t)-\frac{z_j(t-\tau)+z_j(t+\tau)}2\right],
\qquad
k=\frac1{\tau^3D_0}=\frac{\omega^2}{2c^2}.
\tag{3}
$$

It is an invariant sector of the full Cartesian first variation: a normal input produces no planar output. The two label functions are initially independent. Splitting them into common and opposite components,

$$
z_c=(z_1+z_2)/2,\qquad z_o=(z_1-z_2)/2,
$$

gives the scalar operators

$$
L_\chi z=z''+k\left[z-\frac\chi2\{z(t-\tau)+z(t+\tau)\}\right],
\qquad \chi=+1\text{ for common},\quad\chi=-1\text{ for opposite}.
\tag{4}
$$

For bounded $C^2$ normal variations, (3) is also the uniform first derivative at the circle: the normal displacement changes the root equation only at quadratic order, the range and denominator remain uniformly positive, and the bounded perturbation velocity preserves the complete subfield census. For more general distributions below, (4) is the canonical extension of this already derived constant-coefficient linear operator; no nonlinear equation on arbitrary distributions is introduced.

## All real temporal frequencies and their multiplicities

For a real frequency $\nu$, substituting $z=e^{i\nu t}$ in (4) gives

$$
m_\chi(\nu)=-\nu^2+k[1-\chi\cos(\nu\tau)].
\tag{5}
$$

Set $y=\nu\tau/2$. Since $k\tau^2/2=\beta^2$, common zeros satisfy

$$
y^2=\beta^2\sin^2y.
$$

The bound $|\sin y|\le|y|$ and $\beta<1$ exclude every nonzero real y. More quantitatively,

$$
m_+(\nu)\le-(1-\beta^2)\nu^2<0\quad(\nu\ne0).
$$

At zero, Taylor expansion gives $m_+(\nu)=-(1-\beta^2)\nu^2+O(\nu^4)$, so the zero is exactly double.

Opposite zeros instead satisfy

$$
y^2=\beta^2\cos^2y.
\tag{6}
$$

Every solution has $|y|\le\beta<1<\pi/2$, so $\cos y>0$ there. For $y>0$, (6) is exactly $y=\beta\cos y$. The function $y-\beta\cos y$ is strictly increasing on $[0,\beta]$, with negative value at zero and positive value at $\beta$. Its unique zero is the already specified x. Evenness gives the other zero $-x$, and zero itself fails (6). Hence the only opposite-sector real frequencies are

$$
\nu=\pm 2x/\tau=\pm\omega.
$$

Their simplicity follows directly from

$$
m_-'(\omega)=-2\omega-k\tau\sin(2x)<0,
$$

and oddness of the derivative. Here $0<x<\pi/4$: at $\pi/4$, $y-\beta\cos y>\pi/4-\sqrt2/2>0$, and its first zero is smaller. Thus $\sin(2x)>0$. This also proves the useful identity and strict inequality

$$
\omega^2=k[1+\cos(\omega\tau)],\qquad \tan^2x<1.
\tag{7}
$$

The entire exponential characteristic functions are $f_\chi(\lambda)=\lambda^2+k[1-\chi\cosh(\lambda\tau)]$. Since $m_\chi(\nu)=f_\chi(i\nu)$, these are also the multiplicities of the corresponding purely imaginary characteristic zeros. This statement classifies every imaginary-axis normal zero, not every complex characteristic root. The already known real exponential pair is outside this list.

## Complete tempered normal solutions

Let $z\in\mathcal S'(\mathbb R)$, the tempered distributions, and impose $L_\chi z=0$ distributionally on the entire real line. Differentiation and finite translations preserve this space. With Fourier convention $\widehat z(\nu)=\int e^{-i\nu t}z(t)\,dt$ for integrable functions, their distributional versions give

$$
m_\chi\widehat z=0.
\tag{8}
$$

The multipliers are smooth and have polynomially bounded derivatives, so multiplication acts continuously on Schwartz functions and their dual. There is no unjustified transform of a one-sided growing exponential here.

For completeness, the distribution steps that make (8) decisive can be checked directly. If a compactly supported test function is supported away from the zeros of m, its quotient by m is another smooth compactly supported test function. Applying (8) to that quotient shows that $\widehat z$ vanishes there. Its distributional support is therefore contained in the finite zero set found above.

A distribution supported at one point is a finite linear combination of delta derivatives. Here is the needed local proof. Continuity on a fixed compact neighborhood supplies a finite derivative order N controlling its action on tests. If the test's derivatives through order N vanish at the support point, multiply it by a cutoff supported within distance $\epsilon$ and equal to one near that point. The distribution's value is unchanged by support. Taylor's formula and cutoff differentiation make every controlled derivative tend to zero as $\epsilon\to0$, so the value is zero. The distribution therefore depends only on the finite Taylor jet, which is precisely a linear combination of delta derivatives. A partition of unity gives the corresponding statement for finitely many support points.

Near a zero $\nu_0$ of multiplicity d, write $m(\nu)=(\nu-\nu_0)^d a(\nu)$ with a smooth and nonzero. Multiplication by a is locally invertible. The identity

$$
(\nu-\nu_0)\delta_{\nu_0}^{(j)}=-j\delta_{\nu_0}^{(j-1)}
$$

then shows that $m\widehat z=0$ allows delta derivatives only up to order $d-1$. Conversely all such distributions are annihilated. Thus the common transform is a combination of $\delta_0,\delta_0'$, and the opposite transform is a combination of $\delta_\omega,\delta_{-\omega}$. Inverting the Fourier transform and imposing reality yields common $A+Bt$ and opposite $C\cos\omega t+D\sin\omega t$, proving (1).

This argument also excludes continuous-frequency or more irregular bounded distributions solving the normal equation; it is not a search restricted to Fourier series or almost-periodic ansatzes. Every bounded measurable function defines a tempered distribution, so every bounded distributional normal solution is already a smooth function of the displayed form. Boundedness on the whole line forces $B=0$.

## A second, real-space proof for bounded classical solutions

The bounded classification admits a separate proof without a Fourier support argument. If z is a bounded classical solution of (4), then (4) immediately bounds $z''$, because all shifted z values are bounded. Thus the suprema used below are finite.

In the common sector, the exact centered second-difference identity is

$$
z(t+\tau)+z(t-\tau)-2z(t)
=\int_{-\tau}^{\tau}(\tau-|s|)z''(t+s)\,ds.
$$

Equation (4) therefore gives

$$
z''(t)=\frac k2\int_{-\tau}^{\tau}(\tau-|s|)z''(t+s)\,ds.
$$

Its sup-norm factor is $k\tau^2/2=\beta^2<1$, so $\|z''\|_\infty\le\beta^2\|z''\|_\infty$ forces $z''=0$. Global boundedness then leaves a constant.

In the opposite sector put $f=z''+\omega^2z$, which is bounded. The symmetric oscillator identity is

$$
z(t+\tau)+z(t-\tau)
=2\cos(\omega\tau)z(t)
+\frac1\omega\int_{-\tau}^{\tau}
\sin[\omega(\tau-|s|)]f(t+s)\,ds.
$$

It follows by applying the elementary zero-data solution formula for $h''+\omega^2h=f(t+s)+f(t-s)$ to $h(s)=z(t+s)+z(t-s)-2\cos(\omega s)z(t)$; differentiating the integral verifies the formula and its zero initial value/derivative. No dynamical premise from a physical oscillator is imported.

Substitution into (4) and use of (7) give

$$
f(t)=-\frac{k}{2\omega}\int_{-\tau}^{\tau}
\sin[\omega(\tau-|s|)]f(t+s)\,ds.
$$

The kernel is nonnegative because $0\le\omega(\tau-|s|)\le2x<\pi/2$. Its norm is

$$
\frac{k}{\omega^2}[1-\cos(\omega\tau)]=\tan^2x<1.
$$

Hence f vanishes, and solving $z''+\omega^2z=0$ gives precisely the sine and cosine tilt modes. This independently checks that global boundedness suffices to eliminate every other exact normal solution, without requiring periodicity or a Fourier-series representation.

## Euclidean meaning and function-space limits

For $B=0$, the common constant in (1) is vertical translation. An infinitesimal constant spatial rotation by $\Omega=(\Omega_x,\Omega_y,0)$ gives normal components

$$
z_\pm(t)=\pm R[\Omega_x\sin\omega t-\Omega_y\cos\omega t].
$$

Thus $C=-R\Omega_y$ and $D=R\Omega_x$. The bounded normal kernel has exactly three real dimensions and all are Euclidean directions. No new quasiperiodic normal frequency is available. Since the normal block is invariant in the full Cartesian operator, the normal projection of any globally bounded full Cartesian variational solution has this form; its planar projection is not classified here.

The additional tempered mode $Bt$ is a common affine normal drift. It is not bounded in position and is not an extra periodic Euclidean symmetry. Uniformly bounded speed alone does not remove it: the prescribed complete histories $X_i(t)+\epsilon Bt\,e_z$ have speed $\sqrt{\beta^2+\epsilon^2B^2}<1$ for sufficiently small $|\epsilon B|$, and differentiate locally to that normal direction. This observation asserts neither Galilean invariance nor an exact nonlinear drifting-circle solution. It shows why the global position-boundedness premise matters.

The known nonzero real exponential modes from the original source grow exponentially at one end of the complete time axis and are not tempered distributions. The affine perturbation $X_i+\epsilon e^{\lambda t}e_z$ also has unbounded velocity for every nonzero $\epsilon$ when real $\lambda\ne0$, so it is not a small globally uniformly subfield history in the bounded $C^1$ chart. Its formal variational status does not contradict the bounded or periodic classifications. Different local or weighted spaces require their own nonlinear operator and admissibility analysis.

Even the exact bounded linear classification supplies no whole-line coercive inverse modulo these modes. To see a concrete obstruction, use the common function $z_\epsilon(t)=\cos(\epsilon t)$ with $\epsilon>0$ tending to zero. Its uniform distance from the constants is one, whereas

$$
\|L_+z_\epsilon\|_\infty
=|m_+(\epsilon)|=(1-\beta^2)\epsilon^2+O(\epsilon^4)\longrightarrow0.
$$

Thus no uniform estimate of position distance from the bounded kernel by the residual sup norm holds on this whole-line class. The periodic nonlinear classification used a discrete fixed-period spectrum and a compactness estimate; those ingredients cannot simply be transferred to the present nonperiodic space. No nonlinear bounded branch exclusion, global rigidity theorem, advanced initial-value solvability, causal stability, capture or nonlinear fate is proved here.

## Controls, falsifiers and provenance

Constant common translation and the two opposite tilt functions independently check the exact normal operator using Euclidean covariance and balanced acceleration. Common affine drift checks the double zero. The exact inequalities in (5)–(7), finite-support distribution argument, and the two positive-kernel sup-norm arguments provide separate analytical controls. No numerical scan, interval instrument or target computation is used.

Falsifiers are a missing advanced/retarded source; a nonvanishing first-order clock or denominator variation for a purely normal input on this planar base; an incorrect half-weight or value of k; another real-frequency zero; an incorrect zero multiplicity; a bounded non-Euclidean normal solution of (3); failure of either exact integral identity or contraction factor; or an attempted transfer of the bounded result to an unbounded or nonlinear space without a proof. A real exponential direction is not a counterexample to the bounded theorem because it violates its domain.

The following inspected source identities were measured with `shasum -a 256`:

| Source | SHA-256 |
| --- | --- |
| [Full-speed formulation](alternatives-screen-2026-10-05-time-symmetric-speed-family-formulation.md) | `40f8721c7155d10537f1665a4626abb4b1ade9ae866a2c16dc61163ac1c6c753` |
| [Fixed-period kernel](alternatives-screen-2026-10-05-time-symmetric-speed-family-kernel.md) | `d9b643565d9682fad07df0476f8a6802d0de254b850f570ad4021d930a996c80` |
| [Periodic local classification](alternatives-screen-2026-10-05-time-symmetric-speed-family-local-classification.md) | `0f1cb27cdd594471a4271b2c9a5a649486d8384e7d249c96e8edaf666b435ab4` |
| [Original binary source](alternatives-screen-2026-10-05-binary.md) | `9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3` |

Only the new assigned protocol and independent normal-bounded subject are authored. Existing sources, shared owners and the known exponential result remain unchanged. Independent coordinating assessment is the next scientific step.
