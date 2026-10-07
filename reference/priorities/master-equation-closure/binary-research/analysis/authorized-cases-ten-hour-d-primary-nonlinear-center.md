# An exact nonlinear midpoint estimate on complete subfield pair histories

**Grade: derived candidate, awaiting independent assessment.** This result advances the nonlinear reduction in the [fixed Package D case](authorized-cases-ten-hour-d-primary-method.md). It estimates the actual midpoint acceleration of a coupled canonical pair without assuming mirror symmetry. Its global consequence is conditional on an integrated separation bound; it does not prove that a nonmirror perturbation of the selected slow preparation disperses.

## Complete histories and the interpolation

Use $c_f=1$, the source-fixed $K>0$, and two opposite-polarity positions

$$
X_+(u)=C(u)+x(u),\qquad X_-(u)=C(u)-x(u),\qquad u\le t.
\tag{1}
$$

The histories are complete, continuously differentiable and locally $W^{2,\infty}$. Suppose $|X_\pm'(u)|\le\beta<1$ on their entire supplied and constructed past, and put $m=1-\beta$, $d(t)=2|x(t)|>0$. Common constant translations are immaterial. The full-past velocity norm is essential: one present speed sample cannot establish the root census.

For comparison of the unchanged acceleration functional, define

$$
X_\pm^\lambda(u)=\lambda C(u)\pm x(u),\qquad -1\le\lambda\le1.
\tag{2}
$$

These interpolated histories are not asserted to solve the coupled equation. Their velocities are convex combinations of the original velocities and their negatives, so $|(X_\pm^\lambda)'|\le\beta$ for every $\lambda$. Likewise their almost-everywhere source accelerations are bounded by the larger original source-acceleration norm. Their simultaneous separation is always $d(t)$.

For each receiver, the full-past partner causal gap has derivative at least $m$ as a function of positive delay, changes sign once, and tends to positive infinity. It therefore has exactly one partner root. The strict complete chord inequality excludes all positive-delay self roots. This retains every channel of the canonical law. The two partner clocks generally differ, both across receiver labels and across $\lambda$.

Fix the positive receiver. Write its root, range, direction and transmitter factor as

$$
s_\lambda=t-R_\lambda,\quad
S_\lambda=X_+^\lambda(t)-X_-^\lambda(s_\lambda),\quad
R_\lambda=|S_\lambda|,\quad
n_\lambda=S_\lambda/R_\lambda,\quad
D_\lambda=1-n_\lambda\cdot v_\lambda,
\tag{3}
$$

where $v_\lambda=(X_-^\lambda)'(s_\lambda)$. Complete strict speed gives

$$
\frac d{1+\beta}\le R_\lambda\le\frac d m,
\qquad D_\lambda\ge m.
\tag{4}
$$

The negative receiver obeys the same bounds with its own clock. Its reception-time derivative, and that of the positive clock, is separately

$$
\frac{ds_i^\lambda}{dt}
=\frac{1-n_i^\lambda\cdot(X_i^\lambda)'(t)}{1-n_i^\lambda\cdot(X_j^\lambda)'(s_i^\lambda)},
\qquad
\frac m{1+\beta}\le\frac{ds_i^\lambda}{dt}\le\frac{1+\beta}m.
\tag{5}
$$

Thus the interpolation retains ordinary advancing clocks; it never freezes them or introduces a receiver multiplier into acceleration.

## Differentiate the actual clock, then bound the row

Let $I_t=[t-d/m,t]$ and set

$$
M_t=\sup_{u\in I_t}|C'(u)|,\qquad
A_t=\mathop{\mathrm{ess\,sup}}_{u\in I_t}\max_{i\in\{+,-\}}|X_i''(u)|,
\qquad \eta_t=\frac{dA_t}{m}.
\tag{6}
$$

These are bounds on the retained actual histories, not free response parameters. Every interpolated source lies in $I_t$. With $b_\lambda=C(t)-C(s_\lambda)$, one has $|b_\lambda|\le R_\lambda M_t$. Differentiating the causal equation with respect to $\lambda$ gives

$$
\partial_\lambda s_\lambda=-\frac{n_\lambda\cdot b_\lambda}{D_\lambda},\qquad
\partial_\lambda S_\lambda=b_\lambda+v_\lambda\frac{n_\lambda\cdot b_\lambda}{D_\lambda}.
\tag{7}
$$

In particular,

$$
|\partial_\lambda s_\lambda|\le\frac{R_\lambda M_t}{m},\quad
|\partial_\lambda R_\lambda|\le\frac{R_\lambda M_t}{m},\quad
|\partial_\lambda n_\lambda|\le\frac{M_t}{m}.
\tag{8}
$$

The total source-velocity derivative includes the moving-source term:

$$
\partial_\lambda v_\lambda=C'(s_\lambda)+(X_-^\lambda)''(s_\lambda)\partial_\lambda s_\lambda.
\tag{9}
$$

Consequently

$$
|\partial_\lambda D_\lambda|
\le\frac{M_t(1+R_\lambda A_t)}m.
\tag{10}
$$

The estimates remain valid for locally Lipschitz velocities. The clock and row are locally Lipschitz functions of $\lambda$ on this uniformly ordinary chart; their almost-everywhere chain rules and the fundamental theorem for absolutely continuous functions suffice. A continuous acceleration or jerk is not required. At a source seam the pointwise derivative formula is used only where its chain rule exists.

The positive acceleration row is $F_+(\lambda)=-Kn_\lambda/(R_\lambda^2D_\lambda)$. Equations (8)–(10) give

$$
|\partial_\lambda F_+(\lambda)|
\le\frac{K M_t}{R_\lambda^2}
\left(\frac3{m^2}+\frac{1+R_\lambda A_t}{m^3}\right)
\le B_\beta(\eta_t)\frac K{d^2}M_t,
\tag{11}
$$

$$
B_\beta(\eta)=\frac{(1+\beta)^2(4-3\beta+\eta)}{(1-\beta)^3}.
\tag{12}
$$

The three terms in $3/m^2$ come from direction and inverse-square range, while the last term retains transmitter-factor sensitivity including source acceleration. In particular the source-acceleration term has not been dropped because the underlying per-hit law contains only source velocity.

## Exact midpoint cancellation and its conditional global consequence

Reflection and label exchange give $F_-(\lambda)=-F_+(-\lambda)$, with each side evaluated at its own actual clock. Therefore the actual coupled midpoint satisfies

$$
C''(t)=\frac{F_+(1)-F_+(-1)}2
=\frac12\int_{-1}^1\partial_\lambda F_+(\lambda)\,d\lambda.
\tag{13}
$$

Combining (11) and (13) proves the exact nonlinear estimate

$$
|C''(t)|\le B_\beta(\eta_t)\frac K{d(t)^2}M_t.
\tag{14}
$$

This is a finite-history estimate for the actual nonlinear solution wherever the declared strict speed, separation and acceleration bounds hold. It is not restricted to an infinitesimal perturbation of a mirror solution and permits three-dimensional center and relative histories.

Let $M_0=\sup_{u\le0}|C'(u)|$ and suppose that along a coupled continuation on $[0,T)$,

$$
J_T=\int_0^T B_\beta(\eta_t)\frac K{d(t)^2}\,dt<\infty.
\tag{15}
$$

Taking the supremum over the constructed past in the integrated equation and applying the elementary integral Gronwall inequality yields

$$
\sup_{u\le t}|C'(u)|\le M_0 e^{J_t},\qquad
\int_0^t|C''(u)|\,du\le M_0(e^{J_t}-1).
\tag{16}
$$

If $T=\infty$ and $J_\infty<\infty$, midpoint velocity converges. This conclusion is genuinely nonlinear but conditional. The accepted mirror bound supplies (15) on the mirror solution; it does not establish (15) on an arbitrary nonmirror solution. Replacing the latter separation by the mirror separation would assume the missing transfer.

For explicit simple constants, $\beta\le1/100$ and $\eta_t\le1/100$ imply $B_\beta(\eta_t)<5$, because $101^2\cdot398<5\cdot99^3$. This is exact rational algebra. When every source in $I_t$ is generated and $\beta<1/3$, the actual canonical bound and $d(u)\ge d(t)(1-3\beta)/m$ give

$$
A_t\le\frac{K(1+\beta)^2m}{(1-3\beta)^2d(t)^2},\qquad
\eta_t\le\frac{K(1+\beta)^2}{(1-3\beta)^2d(t)}.
\tag{17}
$$

If $I_t$ contains supplied times, their explicitly admitted acceleration bound must be included in $A_t$; equation (17) alone is then insufficient. The complete remote past still determines root exclusion and velocity norms even when no remote source is sampled.

## Analytical controls and claim limits

A constant common translation makes $b_\lambda=C'=0$, so both (7) and (14) vanish exactly. For complete affine parallel histories with common velocity $c$, the independently accepted [affine control](authorized-cases-ten-hour-d-common-center-control.md) gives $C''_{\mathrm{row}}=K(2NN^{\mathsf T}-I)c/d^2$. Thus its magnitude is $K|c|/d^2$, which is bounded by (14) with $M_t=|c|$, $A_t=0$ and $B_\beta(0)>1$. These prescribed-history controls are established before using (14) on an actual coupled history; they are not equilibrium or fate claims.

The result isolates a useful nonlinear fact: midpoint acceleration is proportional to recent midpoint velocity, with an inverse-square separation coefficient and a recorded source-acceleration correction. A complete midpoint history with constant position has zero midpoint acceleration exactly. There is no independent forcing of midpoint motion from a purely mirror relative history.

The unresolved primary obligation is a global separation or relative-motion estimate that closes (15) for a complete nonmirror neighborhood of the selected slow mirror preparation. The bounds here do not establish such a neighborhood, positive terminal relative speed, or the literal historical source's fate. Falsifiers are a missed complete-past root, an incorrect clock sign in (7), omission of (9), violation of row estimate (11), or a coupled history satisfying all stated bounds but violating (14) or (16). A nonmirror path that fails (15) does not refute this conditional theorem. No numerical trajectory, Python interpreter, new solver, reference edit or shared-owner edit was used.
