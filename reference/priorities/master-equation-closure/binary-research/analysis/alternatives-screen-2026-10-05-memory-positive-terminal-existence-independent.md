# Positive terminal speeds in the fixed uniform-memory family

## Fixed theorem and new argument

**Claim grade: derived candidate, requiring independent assessment of the new zero-endpoint argument.** For the original canonical-plus-unit-uniform-memory law with $K=c_f=\lambda=\tau=1$, positive-terminal-speed parameters accumulate at zero in the unchanged complete compatible circle-tail family with physical half-unit patch. Every sufficiently small interval $(0,\epsilon_1)$ contains a member with a strictly positive outward terminal velocity magnitude.

The existing all-future dispersal and zero-speed accumulation theorems remain unchanged. The positive set is open by the admitted positive terminal strip, so positive parameter intervals occur arbitrarily close to zero. No particular parameter, numerical threshold, genericity, ordering, density or discreteness of the zero set is established.

The law-specific reconstruction below retains the exact memory equation and its weighted radial and transverse errors. Its angle-clock equations admit a polynomial corrected scalar. Subtracting that scalar's zero-speed endpoint value gives a strictly increasing quantity tending to zero at every zero-speed endpoint. A resulting upper bound on the remaining angle proves continuity of terminal angle relative to the zero set. The memory family's separately established terminal integer then cannot diverge if every sufficiently small member is zero-speed.

No radial-power fate theorem is used as a premise. There is no local replacement of the memory, new initial datum, tuned preparation, physical conserved account or continuation prescription at infinity.

## Original equation, normalization and complete compatible history

The selected physical acceleration equation is

$$
q''(T)=F_{\rm can}[q](T)
-\int_0^1[q'(T)-q'(T-\vartheta)]\,d\vartheta,
$$

with opposite mirror labels $q,-q$ and the complete canonical ordinary self/partner reception. The exact memory identities are

$$
H(T)=-q'(T)+q(T)-q(T-1)
=-\int_0^1(1-\vartheta)q''(T-\vartheta)\,d\vartheta.
$$

The first identity is the position-velocity evolution formulation. The second is a representation of the same response, not a new acceleration-history degree of freedom. Constant velocity gives zero memory response; constant acceleration gives minus one-half that acceleration. These are exact kernel controls, not an instantaneous substitution in the future equation.

Retain the [original preparation](alternatives-screen-2026-10-05-memory-formulation.md):

$$
r_0=(6\epsilon^2)^{-1},\qquad
s=\epsilon T/r_0,\qquad q=r_0Y,\qquad
\mu=6\epsilon^3,\qquad 0<\epsilon\le1/16.
$$

Let $Y_c=(\cos s,\sin s)$ and $\xi=\epsilon\cos\xi$, with $0<\xi<\epsilon$. The exact scaled canonical and memory contributions from that old circle are

$$
F_c=-\frac32\frac{(\cos\xi,-\sin\xi)}
{\cos^2\xi(1+\epsilon\sin\xi)},\qquad
H_c=\left(\frac{1-\cos\mu}{\mu^2},
\frac{\sin\mu-\mu}{\mu^2}\right).
$$

Put $B_{\rm prep}=F_c+H_c+(1,0)$ and $d_0=\mu/2$. Supply $Y=Y_c$ for $s\le-d_0$ and

$$
Y=Y_c+\frac{d_0^2}{2}\zeta^3(1-\zeta)^2B_{\rm prep},
\qquad \zeta=1+s/d_0,\qquad -d_0\le s\le0.
$$

The physical patch width is exactly $1/2$. Its old-seam jets through second derivative vanish, while its release jets are $(0,0,1)$. The canonical release source lies below $-\epsilon<-d_0$, and the memory endpoint $-\mu$ also lies before the patch. Position and velocity at zero are unchanged. Both received inputs therefore retain their old-circle values, proving exact compatibility.

The complete supplied history is separated and locally $C^{2,1}$, has scaled speed below two and acceleration below eight, and has positive geometric areal rate. The original bounds $|Y-Y_c|\le18\epsilon^7$, $|Y'-Y_c'|\le96\epsilon^4$ and $|Y''-Y_c''|\le100\epsilon$ remain applicable. No part of this history is resupplied or adjusted below.

## Complete ordinary roots and exact acceleration filter

On a complete history with physical speed at most $b<1$, the partner residual $u-|q(T)+q(T-u)|$ increases with modulus at least $1-b$, is negative at zero, and tends to positive infinity. Thus there is exactly one simple partner root. Every positive-delay self root is excluded by the strict chord inequality. The canonical self channel is retained in the law and vanishes by this complete census.

Write $A=Y''$ and define the normalized canonical geometric row

$$
F=-\frac{4N}{R_d^2D},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,\quad
D=1+\epsilon N\cdot Y'(\sigma).
$$

The exact scaled equation is

$$
A+K_\mu A=\frac32F,\qquad
(K_\mu f)(s)=\int_0^1(1-\vartheta)f(s-\mu\vartheta)\,d\vartheta.
$$

Its kernel mass is $1/2$. The factor $3/2$ on the right follows from the physical scale $r_0=(6\epsilon^2)^{-1}$. For slowly varying input the exact filter estimate below yields $A$ close to $F$, which corresponds to the $2/3$ response relative to the physical canonical input. Neither coefficient is dropped or retuned.

## Weighted full-memory estimate reconstructed

Let $r=|Y|$, $u=Y'\cdot n$, $v=Y'\cdot t=h/r$, and $h=Y\times Y'$. Work in the admitted provisional domain

$$
h\ge\tfrac12,\qquad r\ge c h^2,\qquad |u|\le C/h.
$$

The same bounds include the complete preparation after one fixed enlargement. Complete physical speed is $O(\epsilon)$, so sufficiently small launches retain the full root census and a transmitter margin. On an actual causal interval, $R_d\asymp r$ and all intermediate radii are comparable to the receiving radius.

Across a memory interval of scaled length $\mu$, radius ratios are $1+O(\mu)$. Multiplying the exact filter equation by receiving $r^2$ makes the weighted convolution mass $(1+O(\mu))/2<1$. The forcing and supplied acceleration have bounded weighted norms. A running-supremum or first-exit estimate therefore gives

$$
|A|\le C/r^2.
$$

This first estimate uses no torque sign. Since $|h'|\le r|A|\le C/r$, integration over a causal interval of length $O(\epsilon r)$ gives $|h(q)-h(s)|\le C\epsilon$ and $h(q)/h(s)=1+O(\epsilon/h)$. Source velocity is $O(1/h)$, and its transverse component in receiving axes is $O(h/r)$.

The implicit root derivative is

$$
\sigma'(s)=
\frac{1-\epsilon N\cdot Y'(s)}
{1+\epsilon N\cdot Y'(\sigma)}.
$$

It is bounded. Differentiating the complete canonical row, using the actual source acceleration bound, gives the receiving-axis estimates

$$
|F'|\le C/(hr^3),\qquad |F'_t|\le Ch/r^4.
$$

They hold in integrated form at the supplied seam. The transverse estimate comes from the small angular part of the chord derivative; projecting the norm bound would lose its required factor.

Set $\mathcal D=A-F$ on the complete history. Its exact future equation is

$$
\mathcal D+K_\mu\mathcal D
=\tfrac12F-K_\mu F
=\int_0^1(1-\vartheta)
[F(s)-F(s-\mu\vartheta)]\,d\vartheta.
$$

The forcing has norm at most $C\mu/(hr^3)$ and transverse magnitude at most $C\mu h/r^4$. Use the weights $h^3r^2$ and $r^4/h$ respectively. Their ratios across a memory interval are $1+O(\mu)$, since $|h'/h|+|r'/r|\le C/(hr)$ on the provisional domain.

Choose a fixed small $\kappa_0>0$ so the weighted convolution mass with the factor $e^{\kappa_0\vartheta}$ remains below one. A sufficiently large multiple of $\mu+\epsilon e^{-\kappa_0s/\mu}$ is an absolute-value supersolution. It covers the supplied $O(\epsilon)$ defect and retains its decaying contribution. The kernel has no atom at zero, so a strict first-contact comparison proves the bound.

For the transverse projection, rotating axes across the memory interval creates a radial-to-transverse term of angular size $O(\mu h/r^2)$. The already proved norm estimate controls its weighted size by

$$
\frac{r^4}{h}\frac{C\mu h}{r^2}
\frac{C[\mu+\epsilon e^{-\kappa_0s/\mu}]}{h^3r^2}
\le C\mu.
$$

The same comparison then gives

$$
|\mathcal D|\le
\frac{C[\mu+\epsilon e^{-\kappa_0s/\mu}]}{h^3r^2},
\qquad
|\mathcal D_t|\le
\frac{Ch}{r^4}[\mu+\epsilon e^{-\kappa_0s/\mu}].
$$

These are estimates for the exact retained memory, including its supplied-history transient. They remain valid on elongated causal excursions because the domain imposes no radial upper bound. After $s_*=10\epsilon$, the transient is below the $O(\epsilon^3)$ floor for sufficiently small launches, because $\mu=6\epsilon^3$.

The initial layer has total transient impulse $O(\epsilon\mu)=O(\epsilon^4)$ and leaves $h=1+O(\epsilon^2)>0$. Afterwards the canonical transverse input is $\epsilon h/r^3[1+O(\epsilon/h)]$, and the memory defect is smaller by a relative $O((\epsilon/h)^2)$. Thus the actual transverse acceleration is positive and $h$ increases. This is the memory-specific rotation argument, not an imported radial torque theorem.

## Signed acceleration and the actual angle-clock rows

Integral Taylor expansion on the complete causal windows uses the actual acceleration $A=-n/r^2+O(\delta/r^2)$, where $\delta=\epsilon/h$. Windows reaching the original layer and patch have the same leading estimate on scales near one. The implicit range and transmitter expansions are

$$
\begin{aligned}
L&=1-\epsilon u+\epsilon^2(u^2-r^{-1}+v^2/2)+O(\delta^3),
\qquad L=R_d/(2r),\\
D&=1+\epsilon u+\epsilon^2(2r^{-1}-v^2)+O(\delta^3),\\
N_t&=-\epsilon v+O(\epsilon v\delta^2),\qquad
N_r=1-\epsilon^2v^2/2+O(\delta^3).
\end{aligned}
$$

The range residual has a uniformly positive derivative, identifying this with the actual root. Multiplication gives $L^{-2}D^{-1}=1+\epsilon u+O(\delta^3)$. Adding the exact memory defect yields

$$
\begin{aligned}
A_r&=-\frac{1+\epsilon u-\epsilon^2v^2/2}{r^2}+Q_r,
&|Q_r|&\le\frac{C\epsilon^3}{r^2h^3},\\
A_t&=\frac{\epsilon v+\epsilon^2uv}{r^2}+Q_t,
&|Q_t|&\le\frac{C\epsilon^3v}{r^2h^2}.
\end{aligned}
$$

Set

$$
z=\frac{h^2}{r},\qquad y=hu,\qquad
\delta=\frac\epsilon h,\qquad
\theta'=\frac h{r^2}>0.
$$

Here $\theta$ is the actual lifted polar angle and primes still denote $s$ derivatives. Since $h'=rA_t$,

$$
h_\theta=\epsilon+\epsilon^2u+O(\epsilon^3/h^2).
$$

Differentiating the geometric definitions, with $u'=h^2/r^3+A_r$, gives

$$
\begin{aligned}
z_\theta&=-y+2\delta z+2\delta^2yz+O(\delta^3z),\\
y_\theta&=z-1+\delta^2(y^2+z^2/2)+O(\delta^3),\\
\delta_\theta&=-\delta^2-\delta^3y+O(\delta^4).
\end{aligned}
$$

For $y_\theta$, the term $h_\theta u$ contributes $+\epsilon u=+\delta y$, while $r^2A_r$ contributes $-\epsilon u$; they cancel exactly. The first-row error retains the factor $z$ through the exact identity $z_\theta=-y+2(h_\theta/h)z$. The memory transverse weight is what makes division by $\theta'=h/r^2$ legitimate uniformly as $z\to0$.

The admitted finite transition reaches fixed eccentricity $e_*>0$, and its [global continuation](alternatives-screen-2026-10-05-memory-global-dispersal.md) stays in $h\ge1/2$, $0<z<4$, $|y|<4$, with a scalar gap above the harmonic center. It has finite $\theta_\infty$, $z\to0$, $y\to y_\infty\ge0$ and $h\to h_\infty\in(0,\infty)$. Exact reconstruction gives

$$
r=h^2/z,\qquad
\frac{ds}{d\theta}=\frac{h^3}{z^2},\qquad
q'(T)=\delta(yn+zt).
$$

Thus the endpoint is physical time infinity, and positive terminal speed is equivalent to $y_\infty>0$. These inherited conclusions retain all source and memory windows; the preceding reconstruction verifies the law-specific rows needed for the new scalar argument.

## Terminal-subtracted polynomial and remaining-angle bound

Define

$$
E=\frac12[(z-1)^2+y^2],\qquad
\mathcal B=(z+1)y,\qquad
\mathcal A=E-\frac12-\delta\mathcal B.
$$

For the zero-$\delta$ comparison $F_0=(-y,z-1)$,

$$
F_0\cdot\nabla\mathcal B
=(z-1)^2+2(z-1)-y^2,
$$

while the actual rows give $E_\theta=2\delta z(z-1)+O(\delta^2)$. Therefore

$$
\begin{aligned}
\mathcal A_\theta
&=\delta\{2z(z-1)-[(z-1)^2+2(z-1)-y^2]\}
+O(\delta^2)\\
&=2\delta E+O(\delta^2).
\end{aligned}
$$

All derivatives here are of explicit polynomials and actual coordinates; no memory-error function is differentiated.

At the transition $E_b=e_*^2/2>0$. The admitted global argument keeps a fixed positive lower scalar bound on the entire post-entry path, including the possible final bounded comparison from $E=1$. Its upper bound is also fixed. Reducing the launch threshold gives constants $c_A,C_\delta>0$ such that

$$
\mathcal A_\theta\ge c_A\delta,\qquad
\delta_\theta\ge-C_\delta\delta^2
$$

throughout that whole future.

At a zero-speed endpoint, $z,y\to0$, so $E\to1/2$, $\mathcal B\to0$ and exactly $\mathcal A\to0$. Since $\mathcal A$ strictly increases, it is negative at every earlier post-entry reception on a zero-speed member. If its values there are $\mathcal A_0<0$ and $\delta_0>0$, and $L$ denotes the remaining polar angle, integration gives

$$
-\mathcal A_0\ge
\frac{c_A}{C_\delta}\log(1+C_\delta\delta_0L),
$$

and hence

$$
L\le
\frac{\exp[C_\delta(-\mathcal A_0)/c_A]-1}
{C_\delta\delta_0}.
$$

For a fixed zero-speed member, the upper bound tends to zero at late receptions, because $\delta_0\to\epsilon/h_\infty>0$. This is a conditional endpoint estimate for the exact memory-driven trajectory. A positive member need not satisfy it; if $\mathcal A_0\ge0$, strict increase already excludes a zero-speed endpoint.

## Relative continuity on the zero-speed set

Fix a zero-speed parameter $\epsilon_0>0$ in the common sufficiently small range. The complete circle-tail histories vary continuously in $C^2$ on compact physical-time intervals near $\epsilon_0$. Their physical patch width remains exactly $1/2$. Complete subfield bounds put every partner source for a finite reception interval in a common compact old-time interval; the unit-memory sample enlarges that interval only by one.

A positive separation floor and transmitter margin make the implicit root locally Lipschitz in the retained positions. Bounded source acceleration controls velocity evaluation at a displaced source. The exact memory form $-q'(T)+q(T)-q(T-1)$ is locally Lipschitz in the same position-velocity histories. Successive causal integral estimates therefore give finite-time parameter continuity without assuming convergence of the whole infinite circular past.

Choose a finite physical reception $T_0$ sufficiently late on the selected zero-speed member. Since $E(T_0)\to1/2$ while the fixed entry value $E_b=e_*^2/2$ is small, take $E(T_0)>2E_b$. Nearby parameters then have $E(T_0)>E_b$ by finite-time continuity and must already have crossed their first $|e|=e_*$ event. The global estimates apply to their remaining future with the same positive scalar floor.

At $T_0$, finite-time continuity keeps $\delta$ bounded away from zero and makes $\mathcal A$ uniformly small in magnitude for nearby parameters. For nearby zero-speed members it is negative, and the preceding bound makes their remaining angles uniformly small. The two small tails and the finite-prefix difference imply

$$
\theta_\infty(\epsilon)\longrightarrow\theta_\infty(\epsilon_0)
\quad\text{as }\epsilon\to\epsilon_0
\text{ through zero-speed parameters}.
$$

The same argument, with bounded $h_\theta$ and $y_\theta$, gives relative continuity of their terminal scale and coordinates. No endpoint continuity was assumed as a premise, and no claim at the excluded parameter $\epsilon=0$ is made.

## Memory-specific terminal integer and positive occurrence

The [admitted terminal-selection proof](alternatives-screen-2026-10-05-terminal-speed-selection.md), with its [independent assessment](alternatives-screen-2026-10-05-terminal-speed-adjudication.md), provides the memory family's signed seed and terminal integer. Its law-specific mechanism can be checked against the reconstructed cubic rows.

Let the geometric vector be $e=(z-1)n-yt$. Direct differentiation gives the quadratic polynomial

$$
(e/h)_\theta=
\frac{2\epsilon}{h^2}n+\frac\epsilon h(2nn^{\mathsf T}-I)(e/h)
+\frac{\epsilon^2}{h^3}
\left[-e_t(2+e_n)n-\frac{(1+e_n)^2}{2}t\right]
+O(\epsilon^3/h^4).
$$

The same fixed correctors as in the original transition,

$$
b=\frac eh+\frac{2\epsilon}{h^2}t+\frac{5\epsilon^2}{2h^3}n,
\qquad
Z=(I-\epsilon C(\theta)/h)b,
$$

use the bounded matrix

$$
C(\theta)=
\frac12\begin{pmatrix}\sin2\theta&-\cos2\theta\\-\cos2\theta&-\sin2\theta\end{pmatrix},
\qquad
C_\theta=2nn^{\mathsf T}-I.
$$

The constant quadratic terms are canceled by the displayed $5/2$ coefficient. The retained bounded eccentricity polynomial and cubic errors give

$$
|Z_\theta|\le C\epsilon^2h^{-2}|Z|+C\epsilon^3h^{-4}.
$$

Since $\epsilon/2\le h_\theta\le2\epsilon$ after the initial layer, the coefficient and forcing integrals to any later angle are respectively $O(\epsilon)$ and $O(\epsilon^2)$. The exact preparation and layer give $Z=2\epsilon t(0)+O(\epsilon^2)$ initially, so this remains true through the full global future. At its endpoint,

$$
e_\infty=-n_\infty-y_\infty t_\infty,\qquad
h_\infty\asymp\epsilon^{-1},\qquad
\theta_\infty\asymp\epsilon^{-2},\qquad
\frac{e_\infty}{|e_\infty|}=t(0)+O(\epsilon).
$$

Thus the argument $\varphi(\epsilon)$ of $e_\infty$ has one fixed branch near $\pi/2$, with $t(0)=(0,1)$. The exact integer is

$$
N_m(\epsilon)=
\frac{\theta_\infty+\pi+\arctan y_\infty-\varphi(\epsilon)}{2\pi},
\qquad N_m(\epsilon)\to+\infty
\quad(\epsilon\downarrow0).
$$

For a zero-speed member, $y_\infty=0$ and $e_\infty=-n_\infty$. The newly proved relative terminal-angle continuity makes $e_\infty$ and its fixed-branch argument $\varphi$ continuous relative to the zero set. Therefore $N_m$ is locally constant relative to that set.

If an interval $(0,\epsilon_1)$ had no positive-speed member, the admitted nonnegative-terminal theorem would make it entirely zero-speed. The integer would then be locally constant everywhere on a connected interval and hence constant, contradicting its divergence at zero. Positive-speed parameters therefore accumulate at zero in this exact fixed memory family.

The positive terminal strip already proves openness of their set. This does not establish isolated zeros, genericity, a common sequence with any radial-power family, or a certified outcome at a specified numerical launch.

## Falsifiers, source identities and scoped validation

Load-bearing memory falsifiers are an incorrect exact kernel mass or scaled $3/2$ factor; a changed half-unit compatibility sample; a missing ordinary root; failure of the weighted defect estimate or its transverse factor; an unbounded radial-to-transverse projection error; or a missing first-order term in $y_\theta$. The new endpoint argument fails if the post-entry scalar gap is lost, if the polynomial identity gives a different drift, if a zero-speed endpoint has nonzero terminal $\mathcal A$, or if a nearby zero-speed member violates the remaining-angle bound. The admitted signed seed and terminal integer divergence remain separate necessary premises.

Independent validation can reconstruct the exact filter and weighted rows first, then check the polynomial derivative and logarithmic time integral, and finally verify the relative integer-continuity argument. No genericity, numerical endpoint, physical conservation law or formal substitution from another selected law is part of that route.

Antecedent identities measured with shasum -a 256 before authoring:

| Source | SHA-256 |
| --- | --- |
| Memory preparation and exact filter | e77ae06dccda7f06f0f11302d0d50dd270be5192b88f989d3e3cfa3424103d3a |
| Memory finite transition | ae31d20710478746566688d25d8e2d1e86e21d3af10789bf06e6f3156fadee22 |
| Memory global theorem | b8066d75120561fe0ded282d6ccc34a9f525d7e526dd1073696b0f13d2936a71 |
| Memory trilogy assessment | a21180e917b6eb7034abbcc951067997f60085a7e6a86c3293e4b6b13f90ee16 |
| Terminal selection source | 9736cccba1d7b7309dc4200c09f8dd831872b4c990846606cf67003030b64557 |
| Terminal selection assessment | 747a6a263ce9f8f07478cb4b593ea4d6f8099d8227bd1fbc6b274a2daabd2797 |

Only this new memory positive-terminal source is authored. All complete preparations, equations, frozen antecedents and shared owners remain unchanged. No executable instrument, numerical target, Python process, background computation or regenerated artifact is involved. Scoped whitespace and final source-identity checks follow creation. The new occurrence theorem remains a candidate pending independent mathematical assessment.
