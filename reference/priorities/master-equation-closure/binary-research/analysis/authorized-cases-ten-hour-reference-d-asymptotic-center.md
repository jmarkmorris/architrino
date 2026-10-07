# Blind asymptotic common-center row reference

**Derived conditional reference, frozen before a D asymptotic subject.** Assume an actual canonical opposite pair with $c_f=1$, fixed $K$, complete uniform speed bound $\beta<1$, separation vector $z=X_+-X_-=dN$, $d\to\infty$, relative velocity $z'\to0$, and center velocity $C'\to c$. This is a question about a given coupled solution; no affine prescribed history is substituted as a solution.

Since $d'\to0$, $d=o(t)$. Complete chord comparison puts both delays between $d/(1+\beta)$ and $d/(1-\beta)$, hence both delays are $o(t)$ and both source times tend to infinity. Both particle velocities tend to $c$, uniformly on the full sampled windows. For each actual ray,

$$
X_+(t)-X_-(t-R_+)=dN+cR_++o(R_+),
$$

with the analogous negative-separation expression for the other receiver. The clock error is therefore $o(d)$, uniformly with respect to the possibly varying direction $N$. The fixed subfield margin makes the implicit clock inversion uniformly Lipschitz. Thus the independently known affine instantaneous rows give the leading actual rows, without requiring an acceleration convergence rate.

Set $a=N\cdot c$, $c_\perp=c-aN$, $g=\sqrt{1-|c_\perp|^2}$ and $\rho_\pm=(g\pm a)/(1-|c|^2)$. Then

$$
R_\pm/d=\rho_\pm+o(1),\qquad
D_\pm=g/\rho_\pm+o(1),
$$

$$
d^2X_+''=-K\frac{N+c\rho_+}{g\rho_+^2}+o(1),\qquad
d^2X_-''=K\frac{N-c\rho_-}{g\rho_-^2}+o(1).
$$

Consequently

$$
d^2C''=K(2aN-c)+o(1),\qquad
d^2z''=-2K\left(gN-\frac a g c_\perp\right)+o(1).
\tag{1}
$$

The errors are uniform because $|c|\le\beta<1$. These are actual-clock asymptotics deduced from velocity convergence, not an equation symmetry under subtraction of $ct$.

Now also assume $N\to N_\infty$ and bounded $H=z\times z'$. In a plane the cross product can be read as its scalar perpendicular component. Its exact derivative and (1) give

$$
H'=\frac{2K}{d}\frac{N\cdot c}{\sqrt{1-|c-(N\cdot c)N|^2}}\,N\times c+o(1/d).
\tag{2}
$$

Because $d=o(t)$, $\int^\infty dt/d(t)=\infty$. If the limiting vector coefficient in (2) were nonzero, projection on its fixed limiting direction would eventually have a fixed sign and magnitude at least a positive constant times $1/d$. This contradicts bounded $H$. Therefore

$$
(N_\infty\cdot c)(N_\infty\times c)=0.
\tag{3}
$$

For nonzero $c$, the limiting common velocity must be parallel or perpendicular to the limiting separation. A generic oblique common velocity cannot retain all the stated slow relative-motion, limiting-direction and bounded-angular-history hypotheses. This is a necessary restriction, not a proof that either exceptional orientation occurs or a counterexample to dispersal.

A secondary necessary condition follows when $c\ne0$: the limiting center coefficient $2(N_\infty\cdot c)N_\infty-c$ has norm $|c|$, hence is nonzero. Projecting the center acceleration on that direction and using convergence of $C'$ implies $\int^\infty dt/d(t)^2<\infty$. This condition is compatible with familiar sublinear separation scales but none was assumed or needed for (3).

The static common-velocity case and the parallel/perpendicular affine controls are independent consistency checks. Falsifiers are a source clock that does not escape, a failure to retain both clocks, loss of uniform subfield inversion, or interpreting a possibly rotating torque coefficient as fixed without the hypothesis $N\to N_\infty$. No target computation or new history was used.
