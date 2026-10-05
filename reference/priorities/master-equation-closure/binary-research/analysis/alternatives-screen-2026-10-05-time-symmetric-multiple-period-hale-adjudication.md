# Independent C1 multiple-period existence assessment

**Derived admission with one regularity qualification.** For every sufficiently large fixed integer $k$, the selected equal-past/future canonical radial law admits small nontrivial reversible mirror-planar periodic solutions near the circle whose opposite frequency is $m_k=1-1/k$. Every sufficiently small nonzero prescribed kernel amplitude occurs at at least one nearby parameter. The selected parameters tend to the resonant parameter as amplitude tends to zero. No unique, continuous or differentiable branch selection is asserted.

This is an adversarial reconstruction after reading the [coordinator candidate](alternatives-screen-2026-10-05-time-symmetric-multiple-period-coordinator-reference.md), SHA-256 a2f64cd3bf278bf927bcd5272f3e123f4c05bfb3cdc90d439d920baad2b98437. No independently assigned Poincare multiple-period source was read or used. The candidate is preserved unchanged. Its assertion that the full operator family $L_\beta:C^2\to C^0$ is analytic requires correction: parameter-dependent translations of first derivatives do not in general have that operator-norm regularity. The analytic finite Fourier block suffices, as proved below, so the nonlinear existence conclusion survives without that assertion.

## 1. Fixed law, complete paths and exact nonlinear map

Use the already selected equal half-weight past/future version of the radial inverse-square acceleration law, with opposite polarities and $K=c_f=1$. It is a complete periodic boundary problem, not the causal initial-history problem. For a fixed $k$, put $P=2\pi k$ and

$$
X_1(T)=R(\beta)Y(\theta),\qquad X_2(T)=-X_1(T),\qquad
\theta=\omega(\beta)T,\qquad
Y(\theta)=Q(\theta)(e_R+u(\theta)),
$$

where $R\omega=\beta$, $x=\beta\cos x$, $c=\cos x$, $D_c=1+\beta\sin x$ and $R=(4\beta^2cD_c)^{-1}$. Work in a compact positive parameter neighborhood of the chosen resonance. The unknown $u$ is a $P$-periodic $C^2$ function with $u_r$ even and $u_t$ odd. This specifies the entire all-time history.

For $\varepsilon=\pm1$, define the nonnegative rotating-time delay $d_\varepsilon$ and source phase $\sigma_\varepsilon$ by

$$
d_\varepsilon(\theta)=\beta|Y(\theta)+Y(\theta+\varepsilon d_\varepsilon(\theta))|,
\qquad
\sigma_\varepsilon=\theta+\varepsilon d_\varepsilon.
$$

Set $b_\varepsilon=Y(\theta)+Y(\sigma_\varepsilon)$, $\ell_\varepsilon=|b_\varepsilon|$, $n_\varepsilon=b_\varepsilon/\ell_\varepsilon$ and

$$
D_\varepsilon=1-\varepsilon\beta n_\varepsilon\cdot Y'(\sigma_\varepsilon).
$$

The physical partner velocity is $-\beta Y'(\sigma_\varepsilon)$, so this is exactly the prescribed transmitter denominator $1+\varepsilon n_\varepsilon\cdot V_2$. In the uniformly subfield neighborhood it is positive, and retaining its absolute value gives the same quantity.

The normalized exact residual is

$$
\mathcal F(\beta,u)=Q(-\theta)\left[
Y''+\frac{1}{2R\beta^2}
\sum_{\varepsilon=\pm1}\frac{n_\varepsilon}{\ell_\varepsilon^2D_\varepsilon}
\right].
\tag{1}
$$

The coefficient $1/(2R\beta^2)=2cD_c$ follows from dividing the physical acceleration residual by $R\omega^2$. At $u=0$, $d_\varepsilon=2x$, $\ell_\varepsilon=2c$, $D_\varepsilon=D_c$ and the summed input cancels $Y''=-Y$, so $\mathcal F(\beta,0)=0$ exactly.

Choose the $C^2$ neighborhood small enough that $|Y|\ge r_*>0$ and $\beta\|Y'\|_\infty\le b_*<1$. The root function in $d$ has derivative at least $1-b_*$, is negative at zero and tends to positive infinity because $Y$ is bounded. Hence there is exactly one partner root in each direction, globally in delay, including possible whole-period excursions. Its delay is bounded above by $2\beta\|Y\|_\infty$ and below by $2\beta r_* /(1+b_*)$. Nonzero-age self roots are impossible because

$$
\beta|Y(\theta)-Y(\theta+\varepsilon d)|\le b_*d<d.
$$

All denominators, source separations and instantaneous pair separations therefore have positive uniform floors. No root is removed, no future snippet is prescribed separately, and no new instantaneous self convention is introduced.

## 2. Continuous Frechet differentiability at moving source times

For a periodic path perturbation $H$ and parameter perturbation $b$, implicit differentiation of the root equation gives

$$
\dot d_\varepsilon=
\frac{\ell_\varepsilon b+
\beta n_\varepsilon\cdot[H(\theta)+H(\sigma_\varepsilon)]}
{D_\varepsilon}.
\tag{2}
$$

The source-velocity composition varies as

$$
\delta[-\beta Y'(\sigma_\varepsilon)]
=-bY'(\sigma_\varepsilon)
-\beta H'(\sigma_\varepsilon)
-\varepsilon\beta Y''(\sigma_\varepsilon)\dot d_\varepsilon.
\tag{3}
$$

In physical variables the last term is precisely the source acceleration multiplied by the source-clock variation. It is retained, rather than replaced by a frozen-source derivative.

To justify these as Frechet derivatives, first regard the root equation as a map from $(\beta,Y,d)\in\mathbb R\times C^2_{\rm per}\times C^0_{\rm per}$ into $C^0_{\rm per}$. Evaluation $Y(\theta+\varepsilon d(\theta))$ is $C^1$ here, with derivative $H(\sigma)+\varepsilon Y'(\sigma)\dot d$. The derivative in $d$ is multiplication by the positive function $D_\varepsilon$, whose inverse is bounded. The Banach implicit-function theorem gives a jointly $C^1$ periodic root map into $C^0$ and (2).

For the velocity evaluation, at any fixed $C^2$ base path,

$$
Y'(s+\Delta)-Y'(s)-Y''(s)\Delta
=\int_0^\Delta[Y''(s+t)-Y''(s)]\,dt.
$$

Its uniform remainder is bounded by $|\Delta|$ times the modulus of continuity of $Y''$. The additional perturbation remainder $H'(s+\Delta)-H'(s)$ is bounded by $\|H''\|_\infty|\Delta|$. These estimates are $o(\|H\|_{C^2}+\|\Delta\|_\infty)$ on the local chart. Derivative continuity follows from uniform convergence in $C^2$, uniform continuity of the base $Y''$, and bounded derivatives of unit-$C^2$ perturbations. No third derivative of the actual path is used.

Equation (1), including its parameter-dependent prefactor, is consequently jointly $C^1$ from the declared $C^2$ space into $C^0$. This statement does not assert a second nonlinear Frechet derivative.

## 3. Reversibility and Fredholm domain

Let $E=\operatorname{diag}(1,-1)$. The parity condition implies $Y(-\theta)=EY(\theta)$. Time reversal exchanges $d_+$ and $d_-$, reflects the source vectors, and preserves the sum in (1). Therefore the residual has the same radial-even/tangential-odd parity. Mirror symmetry and planarity are exact invariant restrictions of this selected law.

Let $X=C^2_{\rm per,rev}$ and $Z=C^0_{\rm per,rev}$ with period $P$. The principal part of $L_\beta=\mathcal F_u(\beta,0)$ is componentwise second differentiation. On these parity spaces its kernel consists of the radial constants and its range consists of functions whose radial mean vanishes; tangential odd functions already have zero mean. Thus this principal operator is Fredholm of index zero.

At the circle the root shifts are constants. Every remaining term in $L_\beta$ is a constant-coefficient current or shifted term with at most one derivative, including the source-clock contribution containing the fixed circle acceleration. It factors through the compact embedding $C^2_{\rm per}\hookrightarrow C^1_{\rm per}$, then a bounded map into $C^0$. Therefore $L_\beta$ is a compact perturbation of the principal operator and is Fredholm of index zero.

## 4. Resonance, kernel and exact range annihilator

The admitted small-speed expansion is

$$
m_*(\beta)=1-\beta^2/2+O(\beta^4).
$$

It is analytic in $\beta^2$. Analytic inversion gives, for every sufficiently large integer $k$, a unique sufficiently small positive $\beta_k$ satisfying

$$
m_*(\beta_k)=m_k=1-1/k,\qquad
\beta_k=\sqrt{2/k}\,[1+O(k^{-1})],\qquad m_*'(\beta_k)\ne0.
$$

Neither the integer threshold nor the allowed nonlinear amplitude is assigned a numerical value; the neighborhood may depend on $k$.

Periodic Fourier frequencies are $n/k$. The complete opposite real-frequency theorem leaves only the phase frequency zero and the simple pair $\pm m_k$. The phase vector is constant tangential and is excluded by odd parity. The two real oscillatory directions reduce to one reversible direction

$$
\phi(\theta)=(A\cos m_k\theta,-B\sin m_k\theta).
$$

The other quadrature has the wrong parity. At the zero-speed limiting resonance the reversible symbol is $\left(\begin{smallmatrix}-4&2\\2&-1\end{smallmatrix}\right)$, whose null vector has nonzero radial coordinate; continuity guarantees $A\ne0$ at every sufficiently small selected resonance.

Use the ordinary real $L^2$ pairing over one period and normalize $\phi$ to unit norm. The real Fourier block on $(\cos m\theta,0)$ and $(0,-\sin m\theta)$ is symmetric because the full complex symbol is Hermitian. Thus $\langle\phi,L_{\beta_k}v\rangle=0$ for trigonometric polynomials. Periodic convolution approximation converges in $C^2$, extending the identity to every $v\in X$.

The range is closed and has codimension one by Fredholm index zero and the one-dimensional kernel. Hence

$$
\operatorname{Ran}L_{\beta_k}
=\{f\in Z:\langle\phi,f\rangle=0\}.
$$

The bounded projection $\Pi f=\langle\phi,f\rangle\phi$ is valid on both $X$ and $Z$. Consequently $L_{\beta_k}:X\cap\phi^\perp\to Z\cap\phi^\perp$ is a boundedly invertible map.

## 5. C1 reduction and the precise analyticity repair

The range equation for $u=a\phi+w$ gives a unique local jointly $C^1$ map $w(\beta,a)\in X\cap\phi^\perp$ by the Banach implicit-function theorem. It satisfies $w(\beta,0)=0$ and $w_a(\beta_k,0)=0$. Define

$$
g(\beta,a)=\langle\phi,\mathcal F(\beta,a\phi+w(\beta,a))\rangle.
$$

It is $C^1$, and $g(\beta,0)=0$.

One must not infer operator-norm analyticity of $L_\beta:C^2\to C^0$ from its constant-shift formula. For example, differentiating $v'(\theta+s)$ with respect to the shift would require uniform translation continuity of $v''$ on the unit ball of $C^2$, which fails for arbitrarily high-frequency functions. Pointwise smooth formulas on smooth vectors do not repair this operator-norm issue.

Instead fix the two-dimensional reversible Fourier block $\mathcal E$ at frequency $m_k$, and choose a unit vector $\psi\in\mathcal E$ orthogonal to $\phi$. Every $L_\beta$ and the fixed projection preserve $\mathcal E$. Put

$$
\ell(\beta)=\langle\phi,L_\beta\phi\rangle,\quad
b(\beta)=\langle\psi,L_\beta\phi\rangle,\quad
q(\beta)=\langle\psi,L_\beta\psi\rangle.
$$

These are analytic scalar functions because the Fourier frequency is fixed and the coefficients and scalar phase factors are analytic. At resonance $b=\ell=0$ and $q\ne0$. Differentiating the range equation only in amplitude gives

$$
w_a(\beta,0)=-\frac{b(\beta)}{q(\beta)}\psi.
$$

Indeed this vector solves the complement equation, and the unique complement inverse forces it to be the full solution; other Fourier modes cannot be generated. Therefore

$$
g_a(\beta,0)=\ell(\beta)-\frac{b(\beta)^2}{q(\beta)}
=\frac{\det[L_\beta|_{\mathcal E}]}{q(\beta)}
$$

is analytic. This is a finite-dimensional analytic statement; no second derivative of the nonlinear map or analytic operator family is required.

The Fourier determinant identity and $m_*'(\beta_k)\ne0$ give

$$
\partial_\beta F_-(m_k,\beta_k)
=-\partial_mF_-(m_k,\beta_k)m_*'(\beta_k)\ne0.
$$

The nonzero other eigenvalue $q(\beta_k)$ then proves $\partial_\beta g_a(\beta_k,0)\ne0$. This supplies the candidate's required transversality without its unneeded full-operator analyticity assertion.

## 6. Scalar existence with only C1

Set

$$
h(\beta,a)=\int_0^1g_a(\beta,ta)\,dt.
$$

This is jointly continuous and equals $g(\beta,a)/a$ for $a\ne0$. Choose a compact parameter interval around $\beta_k$, inside the implicit-function chart, where $h(\beta,0)$ has its unique zero at $\beta_k$ and opposite signs at the two endpoints. Uniform continuity preserves these endpoint signs for every sufficiently small positive or negative nonzero amplitude. The intermediate-value theorem supplies at least one actual zero $\beta(a)$ for each such amplitude.

Every zero selection in this interval converges to $\beta_k$ as $a\to0$: otherwise a convergent subsequence in the compact interval would have a different zero of $h(\beta,0)$. Moreover,

$$
\frac{w(\beta(a),a)}a
=\int_0^1w_a(\beta(a),ta)\,dt\longrightarrow0
\quad\hbox{in }C^2.
$$

Thus $u=a\phi+o(a)$ in $C^2$, and its kernel projection is exactly $a\phi$, so the solution is nontrivial. Since $A\ne0$, evaluating the radius at opposite extrema of $\cos(m_k\theta)$ gives a nonzero leading difference $2aA+o(a)$. The pair separation is nonconstant; these are not the rigid antipodal circles.

The complete physical paths have period $2\pi k/\omega(\beta(a))$, positive separation and speed uniformly below one. Here $\beta(a)$ parametrizes the comparison circle and time scaling; the noncircular solution need not have constant physical speed equal to it. Minimal period, uniqueness or regularity of the zero selection, and behavior outside the mirror-planar reversible class remain unproved.

## 7. Verdict, provenance and falsifiers

The nonlinear existence statement is admitted in the preceding precise scope. The proof uses the exact complete root map and a $C^1$ Banach-space reduction, followed by an explicit continuous scalar sign argument. It invokes neither an instantaneous conserved quantity nor a named bifurcation theorem requiring unproved higher differentiability. No numerical target was run.

| Antecedent | SHA-256 |
| --- | --- |
| Frozen coordinator candidate | a2f64cd3bf278bf927bcd5272f3e123f4c05bfb3cdc90d439d920baad2b98437 |
| Small-speed planar classification | c6596505ad8b4acd6779205bf8beaf812c21f6bd59dd61388456abcbadaab00c |
| Complete all-speed adjudication | 8152c9bea6db6a738067d856eab8e20c006e53cbaed52e4f24fe1b32df80e5a3 |
| Selected binary-law source at inspection | 9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3 |
| Live canonical acceleration owner | 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f |

Falsifiers are a missing partner or self root in the asserted periodic neighborhood; failure of the subfield denominator floor; omission of the source-acceleration term in (3); failure of the stated uniform composition remainder; an extra reversible Fourier kernel; a wrong Hermitian/parity relation or range annihilator; vanishing finite-block transversality; or failure of the endpoint signs to persist uniformly. A smooth-branch or stability assertion would exceed this assessment even if the existence proof remains correct.
