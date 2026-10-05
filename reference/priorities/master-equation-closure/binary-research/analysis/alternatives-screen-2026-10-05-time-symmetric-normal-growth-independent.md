# Normal real exponential rates and their endpoint limits

Status: independent analytical derivation, 2026-10-05, following the [frozen protocol](alternatives-screen-2026-10-05-time-symmetric-normal-growth-independent-protocol.md). The coordinator's new normal-growth reference was not read before this source was frozen. No numerical target was run. All conclusions below are derived from the selected complete boundary equation; no standard-physics law enters as a premise.

For each fixed $0<\beta<1$, the common normal sector has the real characteristic rates $0$, of multiplicity two, and $\pm\lambda_+(\beta)$, each simple. The opposite normal sector has no real characteristic rate. The positive rate is

$$
\lambda_+(\beta)=4\beta^2D\,y_\beta,\qquad \frac{\sinh y_\beta}{y_\beta}=\frac1\beta,\qquad y_\beta>0.
$$

The nonzero exponentials are unbounded on the whole time axis and lie outside the bounded and tempered perturbation classes used in the preceding frequency theorems. They are formal solutions of the extended linear equation, not a causal-instability conclusion.

## 1. Complete balanced reference case

The selected law is exactly Section 14 of [the frozen binary source](alternatives-screen-2026-10-05-binary.md): equal past/future canonical radial acceleration, opposite polarities, and $K=c_f=1$. Define

$$
x=\beta\cos x,\quad c=\cos x,\quad s=\sin x,\quad D=1+\beta s,\quad R=\frac1{4\beta^2cD},\quad \omega=\frac\beta R.
$$

The complete base paths are $X_1(t)=R(\cos\omega t,\sin\omega t,0)$ and $X_2(t)=-X_1(t)$. Their complete partner roots are $S=t\pm\tau$, where

$$
\tau=2Rc=\frac{2x}{\omega}=\frac1{2\beta^2D}.
$$

The half-weighted tangent contributions cancel, while the radial contribution is $-e_R/(4R^2cD)=-R\omega^2e_R$. Thus the circle is an exact balanced history before variation. The uniform speed margin gives exactly one partner root in each time direction and excludes all nonzero-age self roots through the strict chord/age inequality. No instantaneous diagonal rule or root deletion is added.

Section 8 of the original binary source already established the positive common real rate and its uniqueness. The present source independently reconstructs the physical projection and completes the real-rate census, multiplicities, endpoint expansions and function-space distinction. It does not present that earlier existence result as a new discovery.

## 2. Source-clock variation before projection

For a partner root labeled by $\varepsilon=-1$ in the past and $+1$ in the future, put $S=t+\varepsilon\tau$, $\ell=|X_i(t)-X_j(S)|$, $n=(X_i(t)-X_j(S))/\ell$, $v=X_j'(S)$, $a_s=X_j''(S)$, $D_\varepsilon=1+\varepsilon n\cdot v$, and $P=I-nn^{\mathsf T}$. For arbitrary Cartesian path variations $\eta_i$, define $d_0=\eta_i(t)-\eta_j(S)$. Differentiating the root and the physical source velocity first gives

$$
\delta S=\frac{\varepsilon n\cdot d_0}{D_\varepsilon},\quad \delta r=B_\varepsilon d_0,\quad B_\varepsilon=I-\frac{\varepsilon v n^{\mathsf T}}{D_\varepsilon},\quad \delta v=\eta_j'(S)+a_s\delta S.
$$

For the attractive row $-n/(\ell^2D_\varepsilon)$, the complete variation is $M_\varepsilon d_0+N_\varepsilon\eta_j'(S)$, with

$$
\begin{aligned}
M_\varepsilon&=-\frac1{\ell^3D_\varepsilon}\left[(I-3nn^{\mathsf T})B_\varepsilon-\frac{\varepsilon n v^{\mathsf T}PB_\varepsilon}{D_\varepsilon}-\frac{\ell(n\cdot a_s)nn^{\mathsf T}}{D_\varepsilon^2}\right],\\
N_\varepsilon&=\frac{\varepsilon nn^{\mathsf T}}{\ell^2D_\varepsilon^2}.
\end{aligned}
$$

The last term of $M_\varepsilon$ is the source-acceleration shift. It has not been omitted. Now specialize to normal variations $\eta_i=z_i e_z$. Every base vector $n,v,a_s$ lies in the circle plane, so $n\cdot d_0=0$, $\delta S=0$, $\delta\ell=0$, $\delta n=d_0/\ell$, and

$$
\delta D_\varepsilon=\varepsilon\left[v\cdot\delta n+n\cdot\eta_j'(S)+(n\cdot a_s)\delta S\right]=0.
$$

Thus the clock and shifted-acceleration contributions vanish because of normal orthogonality, rather than because the source clock was frozen. The normal projection is exactly

$$
M_\varepsilon e_z=-\frac{e_z}{\ell^3D},\qquad N_\varepsilon e_z=0.
$$

Averaging both complete partner rows gives

$$
z_i''(t)=-k\left[z_i(t)-\frac{z_j(t-\tau)+z_j(t+\tau)}2\right],\qquad k=\frac1{\tau^3D}=\frac{\omega^2}{2c^2}>0.
$$

The useful exact identity is $k\tau^2/2=\beta^2$.

## 3. Complete real characteristic census

Set $z_2=\chi z_1$, where $\chi=+1$ denotes common normal displacement and $\chi=-1$ opposite displacement. An exponential trial $z_1=e^{\lambda t}$ gives

$$
\Delta_\chi(\lambda)=\lambda^2+k[1-\chi\cosh(\lambda\tau)].
$$

For real $\lambda$, set $y=\lambda\tau/2$. Multiplication by $\tau^2/4$ gives the exact scalar functions

$$
\frac{\tau^2}{4}\Delta_+(\lambda)=y^2-\beta^2\sinh^2y,\qquad \frac{\tau^2}{4}\Delta_-(\lambda)=y^2+\beta^2\cosh^2y.
$$

The opposite expression is strictly positive for every real $y$, including zero. Hence there is no opposite real characteristic rate.

For the common sector, zero is a root and every nonzero real root obeys $\sinh|y|/|y|=1/\beta$. The function $f(y)=\sinh y/y$ is strictly increasing from one to infinity on $y>0$: the numerator of its derivative is $y\cosh y-\sinh y$, whose derivative is $y\sinh y>0$ and whose value at zero is zero. Therefore there is exactly one $y_\beta>0$, with its negative partner. The nonzero roots are simple, since at a positive root

$$
\frac{d}{dy}(y^2-\beta^2\sinh^2y)=2y(1-\beta\cosh y)=2y(1-y\coth y)<0.
$$

The last inequality follows again from $y\cosh y-\sinh y>0$. At zero,

$$
\Delta_+(\lambda)=(1-\beta^2)\lambda^2-\frac{k\tau^4}{24}\lambda^4+O(\lambda^6),
$$

so the zero root has multiplicity exactly two for every strictly subfield speed. Its ordinary and generalized solutions are a common vertical translation and a common linear normal drift. There are no higher polynomial factors at zero and no polynomial factors multiplying the simple nonzero exponentials.

Consequently all real-characteristic exponential-polynomial normal solutions are common displacements of the form

$$
z_1(t)=z_2(t)=A+Bt+C e^{\lambda_+t}+E e^{-\lambda_+t}.
$$

This is the complete real-rate exponential-polynomial span. It is not the full normal solution space: the opposite rigid-tilt oscillations have imaginary rates, and other complex rates are outside the present question.

## 4. Small-speed endpoint

As $\beta\downarrow0$, $y_\beta\to\infty$. Put $L=\log(2/\beta)$ and $\ell_L=\log L$. The defining equation is equivalently

$$
y_\beta=L+\log y_\beta-\log(1-e^{-2y_\beta}).
$$

For sufficiently large $L$, evaluation of $\beta\sinh y-y$ at $L$ and at $L+2\log L$ gives opposite signs. Thus $L<y_\beta<L+2\log L$. This supplies the initial control $y_\beta=L+O(\log L)$ without assuming an asymptotic solution.

Define $h(y)=y-L-\log y+\log(1-e^{-2y})$. On the controlled range, $h'(y)=1-1/y+2e^{-2y}/(1-e^{-2y})\ge1/2$ for sufficiently large $L$. Substituting $Y=L+\ell_L+\ell_L/L$ and using the Taylor remainder for $\log(1+u)$ gives $h(Y)=O(\ell_L^2/L^2)$. The mean-value theorem therefore proves the controlled expansion

$$
y_\beta=L+\log L+\frac{\log L}{L}+O\left(\frac{(\log L)^2}{L^2}\right).
$$

Since $D=1+O(\beta^2)$ and $\lambda_+=2y_\beta/\tau=4\beta^2D y_\beta$,

$$
\lambda_+(\beta)=4\beta^2\left[L+\log L+\frac{\log L}{L}+O\left(\frac{(\log L)^2}{L^2}\right)\right]\longrightarrow0.
$$

The $O(\beta^2L)$ correction inside the bracket from $D-1$ is exponentially smaller than the displayed remainder when expressed in $L$. Meanwhile $x=\beta+O(\beta^3)$ and $\omega=4\beta^3[1+O(\beta^2)]$, so

$$
\frac{\lambda_+}{\omega}=\frac{y_\beta}{x}\sim\frac{\log(2/\beta)}\beta\longrightarrow\infty,
\qquad \tau\sim\frac1{2\beta^2}\longrightarrow\infty.
$$

Thus the physical rate tends to zero even though its rate relative to circle rotation diverges. This is a singular large-radius, large-delay limit. There is no finite-radius zero-speed circle in the selected family, and convergence of physical rates to zero does not assign a characteristic multiplicity to a nonexistent zero-speed boundary case.

## 5. Approach to field speed

Let $\delta=1-\beta\downarrow0$, and let $x_*\in(0,3/4)$ solve $x_*=\cos x_*$. Put $D_*=1+\sin x_*$. The equation $\sinh y/y=1/\beta$ gives $y_\beta\to0$. The analytic function of $Y=y^2$,

$$
\frac{\sinh\sqrt Y}{\sqrt Y}=1+\frac Y6+\frac{Y^2}{120}+O(Y^3),
$$

has derivative $1/6$ at zero. Its analytic inverse gives, first in $h=\beta^{-1}-1$ and then in $\delta$,

$$
y_\beta^2=6h-\frac95h^2+O(h^3)=6\delta+\frac{21}{5}\delta^2+O(\delta^3),
$$

$$
y_\beta=\sqrt{6\delta}\left[1+\frac7{20}\delta+O(\delta^2)\right].
$$

The circle equation has $x'(\beta)=\cos x/D$. Differentiating $D=1+\beta\sin x$ gives $D'=(\sin x+\beta)/D$, hence $D'(1)=1$. Therefore $D=D_*-\delta+O(\delta^2)$ and

$$
\lambda_+(\beta)=4D_*\sqrt{6\delta}\left[1-\left(\frac{33}{20}+\frac1{D_*}\right)\delta+O(\delta^2)\right]\longrightarrow0,
$$

$$
\frac{\lambda_+}{\omega}\sim\frac{\sqrt{6\delta}}{x_*}\longrightarrow0,\qquad \tau\longrightarrow\tau_*:=\frac1{2D_*}.
$$

These are controlled asymptotics from analytic inversion near a nonzero derivative and the analytic circle parameterization; they are not fitted numerical rates.

The formally limiting common characteristic equation at $\beta=1$ has

$$
\Delta_{+,*}(\lambda)=-\frac{\tau_*^2}{12}\lambda^4+O(\lambda^6).
$$

Its zero has multiplicity four and it has no other real root, since $\sinh y>y$ for $y>0$. Thus the double zero and the two simple real roots merge into a fourth-order zero of that limiting scalar equation. Its common polynomial solutions through degree three are consistent with that multiplicity. This statement concerns the analytic endpoint equation only; it does not extend the strictly subfield complete-history perturbation theorem to a field-speed neighborhood.

## 6. Function-space and interpretation boundary

The normal operator was derived first in a separated, globally uniformly subfield neighborhood of the complete circle. There the ordinary root census is fixed and the physical source derivative is valid. Its resulting constant-shift linear formula extends algebraically to all smooth functions on the whole time axis, or to distributions tested on compact sets. The real exponentials solve that extended formula.

For every $\lambda_+>0$, $e^{\lambda_+t}$ grows as $t\to+\infty$ and $e^{-\lambda_+t}$ grows as $t\to-\infty$. Neither belongs to the whole-line tempered distribution class, and no nonzero combination of this pair is bounded. They therefore do not contradict the previously established [bounded normal classification](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) or the [bounded Cartesian classification](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-classification.md).

A fixed nonzero affine perturbation in the growing normal direction has speed

$$
|X_i'(t)+\epsilon\lambda_+e^{\lambda_+t}e_z|=\sqrt{\beta^2+\epsilon^2\lambda_+^2e^{2\lambda_+t}},
$$

which eventually exceeds one. The negative-rate direction fails the same condition toward the remote past. Such a direction is not a tangent vector in the globally bounded $C^1$ perturbation space. Moreover, a complete perturbed path that becomes superfield far away can change its ordinary source census; solving the extended linear formula does not establish a derivative of the full complete-history nonlinear operator along that unbounded path family.

The common linear drift $Bt$ is different: it is tempered and, at sufficiently small amplitude, its affine perturbation has uniform speed $\sqrt{\beta^2+\epsilon^2B^2}<1$. Its displacement is nevertheless unbounded, so it lies outside the bounded normal class. This observation does not assert an exact nonlinear boost symmetry.

Finally, the equation contains both advanced and past evaluations and no causal initial-value problem has been supplied. A real positive formal rate therefore supplies neither nonlinear instability in a declared whole-line norm nor a causal-release growth conclusion. Those would require a specified nonlinear solution space, admissible preparation, solvability and perturbation theorem. The present result classifies real normal characteristic rates only.

## 7. Provenance and falsifiers

The original binary source has frozen SHA-256 `9362c263573002225ecf47258ebdd37a5a9ccfb5ccd4af4d787a060ff1de47a3`. The preceding bounded normal source has SHA-256 `f72f83f2d6f6c3da9d56b86242786ccba7bea94bde98ba77360367324b8d2fdb`; the all-speed bounded Cartesian subject has SHA-256 `a3cbe5e262005ce6c11e7a0abf21163497056f3382b2ba45b76ac713e74f05d9`. The present independent protocol has SHA-256 `9421593b9e8cb377ac4d8ed0c2f3449460fa528209e26f82c0b14b63d577e64e`. These antecedents and shared owners were not edited.

The checks are direct differentiation of the physical clock, projection after retaining source acceleration, exact characteristic normalization, a monotonicity proof, analytic multiplicity tests, and remainder-controlled endpoint inversion. No floating experiment, interval target or evolution solver was used. The coordinator's independently frozen reference remains the separate comparison for assessment.

Falsifiers are a nonzero first-order source-clock or denominator variation for a purely normal input at this planar base; a missing half-weight; failure of $k\tau^2/2=\beta^2$; a second positive common real root; an opposite real root; a different nonzero-root or zero-root multiplicity; a wrong coefficient in either endpoint expansion; or a claim that the nonzero exponentials are globally bounded, tempered, uniformly subfield affine perturbations, or causal solutions. Other complex roots would not contradict this deliberately real-rate classification.
