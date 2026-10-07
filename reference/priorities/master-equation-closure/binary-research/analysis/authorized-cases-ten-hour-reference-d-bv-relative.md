# Blind integrated relative-row estimate with bounded-variation acceleration

**Derived conditional reference, frozen before a new BV subject.** Use the same complete canonical homotopy $X_\pm^\lambda=\lambda C\pm x$, $|\lambda|\le1$, on a fixed reception interval of length $T$. Assume all its partner roots lie in a declared finite source interval, complete speed is at most $\beta<1$, and $R_-\le R_i^\lambda\le R_+$ with $R_->0$. All source accelerations are bounded by $A$ and have total variation at most $V_A$ on that interval, including a specified extension if smoothing is used. Put $M=\sup|C'|$, $A_C=\sup|C''|$, $m=1-\beta$, $L=R_+/R_-$ and $a=R_+A$. These are hypotheses on the whole homotopy tube, not consequences of the original broad $W^{2,\infty}$ class.

The desired full relative row is $G(\lambda)=F_+(\lambda)-F_-(\lambda)=F_+(\lambda)+F_+(-\lambda)$. Its evenness is exact. The following conservative bound is sufficient:

$$
\begin{aligned}
\int|G(1)-G(0)|\,dt
\le\frac{K}{R_-^2m}\bigg[
&\frac{64L^2(1+a)^2}{m^4}TM^2
+\frac{2R_+}{m^2}TMA_C\\
&+\frac{(1+\beta)R_+^2}{m^4}M^2V_A
\bigg].
\tag{1}
\end{aligned}
$$

This is quadratic in a center norm controlling both $M$ and $A_C$. It is not uniformly quadratic in $M$ alone unless $A_C/M$ is controlled. A finite source acceleration jump contributes through $V_A$, rather than an unavailable pointwise jerk.

## Two parameter derivatives before integrating in reception time

First take smooth histories. For one clock, let $W=C'(s)$, $V$ and $A_s$ be its source velocity and acceleration. The already independently derived first variations give $|s_\lambda|\le R_+M/m$, $|n_\lambda|\le M/m$ and $|D_\lambda|\le M(1+a)/m$. Differentiating the implicit range a second time gives exactly

$$
-Ds_{\lambda\lambda}
=\frac{|(I-nn^{\mathsf T})S_\lambda|^2}{R}
-2n\cdot W s_\lambda-n\cdot A_s s_\lambda^2.
$$

Consequently $|s_{\lambda\lambda}|\le R_+M^2(3+a)/m^3$. Differentiating $n=S/R$ twice gives the safe bound $|n_{\lambda\lambda}|\le L(8+2a)M^2/m^3$. The second sampled-velocity derivative is

$$
V_{\lambda\lambda}=2C''(s)s_\lambda
+A_s s_{\lambda\lambda}+A_s' s_\lambda^2.
$$

The last term is the only derivative of source acceleration. The regular part of $D_{\lambda\lambda}$ is bounded by $16L(1+a)^2M^2/m^3+2R_+MA_C/m$, and its remaining measure-sensitive part by $|A_s'|R_+^2M^2/m^2$.

Apply these bounds to $F=-KnR^{-2}D^{-1}$. Differentiating the logarithm of $R^{-2}D^{-1}$ makes its product terms explicit. Direction, range and transmitter contributions combine to

$$
|F_{\lambda\lambda}|\le\frac{K}{R_-^2m}
\left[\frac{64L^2(1+a)^2}{m^4}M^2
+\frac{2R_+}{m^2}MA_C
+\frac{R_+^2}{m^3}M^2|A_s'|\right].
\tag{2}
$$

The coefficient 64 has slack: the normalized direction bound contributes at most $10L(1+a)^2/m^3$, the mixed direction/logarithmic-factor term at most $6L(1+a)/m^3$, and the scalar second-factor bound at most $40L^2(1+a)^2/m^4$. Their sum is below the stated coefficient.

For each fixed homotopy parameter, the ordinary source clock has reception derivative at least $m/(1+\beta)$. Changing variables in the last term therefore bounds its reception integral by $(1+\beta)V_A/m$. Finally the exact even second-difference identity is

$$
G(1)-G(0)=\int_0^1(1-\lambda)
\{F_+''(\lambda)+F_+''(-\lambda)\}\,d\lambda.
$$

Its total nonnegative weight is one, giving (1). The two clocks are represented by the two parameter signs; neither is frozen and their shifts need not be symmetric in source time.

## Passing through acceleration seams

Approximate the complete histories locally by smooth histories after extending the bounded-variation accelerations over the declared source interval. Velocity and position converge uniformly; source acceleration remains bounded and its total variation does not increase under convolution. The source-clock speed margins and range bounds persist with arbitrarily small enlargements. The smooth estimates above are uniform, and the acceleration-derivative term is bounded by its total variation after the monotone clock change of variables. Taking the limit proves (1) for BV acceleration, including finite jumps. This is an integrated bound; the pointwise absolute-linear seam defect remains valid.

The extension and interval coverage are indispensable. Merely local bounded acceleration without a uniform variation bound supplies no constant $V_A$. Likewise this finite-tube result does not show that its right side is integrable on an infinite slow tail. In particular it does not remove the separately derived anisotropic $1/d$ angular obstruction.

Known controls are constant translation, the exact parallel affine row, and the scalar seam identity whose triangular second-difference kernel has integral equal to the acceleration jump times the squared shift. Falsifiers are a missed $2C''s_\lambda$ term, an unbounded clock Jacobian, a source seam outside the declared variation interval, or use of a pointwise jerk bound in place of the BV measure argument. No new physical history, numerical target or subject conclusion was used.
