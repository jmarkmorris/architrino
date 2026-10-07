# An ordinary chart with reciprocal-radius phase modulation

## Purpose and unchanged equation

Claim grade: self-derived chart and proposed candidate representation, pending independent review. The [finite-Fourier obstruction](overnight2-b-independent-finite-fourier.md) shows why a varying limiting radius needs a phase correction with more than fixed finite Fourier degree. This chart builds that necessary angular relationship directly into the prescribed history, while permitting an additional finite-speed phase correction. It remains the canonical six-member equation with $K=c_f=1$, every ordinary partner/self root, and no response factor or event remedy.

Use the existing complete paths with $\phi=\kappa t/R$ and common angle $\beta t/R+p(\phi)$. Let
$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$
Put $A=\sqrt{a^2+b^2}<1$, $\delta=\operatorname{atan2}(b,a)$, $\eta=\sqrt{1-A^2}$ and $\psi=\phi-\delta/2$. Then $\rho=1+A\cos2\psi$. The case $A=0$ is defined separately below, so the arbitrary value of $\delta$ there is immaterial.

## Exact phase primitive

Let $\mathcal A(\psi)$ be the continuous increasing lift of
$$
\arctan\left(\sqrt{\frac{1-A}{1+A}}\tan\psi\right)
$$
with $\mathcal A(0)=0$ and $\mathcal A(\psi+\pi)=\mathcal A(\psi)+\pi$. Define
$$
F(\phi)=\mathcal A(\psi)-\frac{A\eta\sin2\psi}{2(1+A\cos2\psi)}+\frac\delta2.
$$
For $A=0$ set $F(\phi)=\phi$. Direct differentiation away from an arctangent branch endpoint, followed by continuity across the lifted endpoints, gives
$$
\mathcal A'(\psi)=\frac{\eta}{1+A\cos2\psi},
$$
$$
F'(\phi)=\frac{\eta^3}{\rho^2},\qquad
F''(\phi)=-\frac{2\eta^3\rho'}{\rho^3},\qquad
F(\phi+\pi)=F(\phi)+\pi.
$$
For example the derivative of $\sin2\psi/(1+A\cos2\psi)$ is $2(\cos2\psi+A)/(1+A\cos2\psi)^2$, which reduces the displayed first derivative to $\eta(1-A^2)/\rho^2$.

Let $q(\phi)=c\cos2\phi+d\sin2\phi$ be an additional periodic correction, and prescribe
$$
p(\phi)=\frac{\beta}{\kappa}\bigl(F(\phi)-\phi\bigr)+q(\phi).
$$
Since $\kappa>0$, this is real and periodic. The physical angular rate and its derivative are
$$
\beta+\kappa p'=\beta\frac{\eta^3}{\rho^2}+\kappa q',
\qquad
\kappa^2p''=\beta\kappa F''+\kappa^2q''.
$$
When $q=0$, the product $\rho^2(\beta+\kappa p')=\beta\eta^3$ is exactly constant. Under common slow scaling this is the required limiting angular relation. It is only an angular compatibility condition; radial/axial balance and both canonical period means remain separate obligations. The additional $q$ can accommodate a finite-speed correction in a proposal without modifying the law.

The quasi-period increment also proves $\langle\rho^{-2}\rangle=\eta^{-3}$, so this construction agrees with the independently derived reciprocal-radius phase formula. For nonconstant radius, $p$ generally has an infinite Fourier tail. The closed primitive retains that tail without introducing a harmonic cutoff in the prescribed history.

## Uniform speed-budget chart

Use coordinate bounds
$$
|a|,|b|,|c|,|d|\le0.25,\qquad |e|,|f|\le0.1,\qquad
0.2\le H\le1.2,\quad
0.03\le u_0\le0.4,\quad0.05\le v_0\le0.5.
$$
Define conservative amplitude bounds
$$
A_r=\sqrt{a^2+b^2+10^{-8}},\quad
A_p=\sqrt{c^2+d^2+10^{-8}},\quad
A_z=\sqrt{e^2+f^2+10^{-8}},
$$
$$
r_-=1-A_r,\quad r_+=1+A_r,\qquad
S=\sqrt{(2A_r)^2+(2r_+A_p)^2+(H+3A_z)^2}.
$$
The small positive term is only a smooth conservative coordinate bound; it changes no path, derivative or acceleration law. Choose
$$
\beta=\frac{u_0r_-}{\eta^3},\qquad\kappa=\frac{v_0}{S}.
$$
Both are positive throughout the coordinate box. The cylindrical velocity splits into a rotational part with magnitude
$$
\rho\beta F'=\frac{u_0r_-}{\rho}\le u_0
$$
and a deformation/correction part
$$
\kappa(\rho',\,\rho q',\,\zeta')
$$
whose norm is at most $\kappa S=v_0$. Therefore every path speed is at most $u_0+v_0\le0.9<1$, at every time.

Radius exceeds $0.646R$, height is positive at phase zero and negative at phase $\pi$, and positions lie within dimensionless radius $\sqrt{r_+^2+(H+A_z)^2}$. Their full diameter is below $3.82$. The complete-past Lipschitz gap argument then gives exactly one positive delay for each of the five partners, no positive self root, positive transmitter divisor at least $0.1$, partner delay at least $0.646/1.9>0.34$, and every delay below $3.82$. These are chart statements for all $R>0$ and all phases; no phase sample or finite history horizon supplies the root count.

## Proposed full-vector experiment and verification boundary

The numerical proposal evaluator may reuse the frozen all-five-root instrument after independently checking this phase primitive and its derivatives. It must retain the exact infinite-tail primitive at delayed phases, including the continuous angular lift. A branch jump from a principal arctangent would corrupt the history and invalidate the evaluation.

The proposed objective combines the full-vector residual with the two exact period means: $\langle\rho A_t\rangle$ and $\langle V\cdot A\rangle$, where $V=(\kappa\rho',\rho(\beta+\kappa p'),\kappa\zeta')$. Both means must vanish for exact periodic balance. Dividing them by positive speed scales during proposal generation changes the numerical objective, not the equation or acceptance criterion. A floating minimum remains a proposal, even if its sampled means are small.

Falsifiers for this chart include an incorrect lifted derivative or period increment, a discontinuity in $F-\phi$, a reversed speed-bound inequality, or an omitted complete-past causal root. The finite-Fourier theorem does not exclude this phase representation, but that fact is no evidence that it contains an exact canonical solution. Independent chart verification and known-controlled numerical operations remain required before interpreting a candidate.
