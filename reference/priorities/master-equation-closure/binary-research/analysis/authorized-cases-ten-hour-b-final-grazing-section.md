# The corrected grazing section and its signed consumer

**Status: analytical candidate, awaiting independent assessment; no scalar target.** This uses only the fixed original amplitude-gradient member with $\epsilon=2^{-200000}$, its complete compatible preparation, and the independently checked finite normal form. It does not change the equation, source past, actual regularity or speed domain. The [normal-form acceptance](authorized-cases-ten-hour-reference-b-normal-acceptance.md), [analytic remainder assessment](authorized-cases-ten-hour-reference-b-normal-remainder-adjudication.md) and [phase assessment](authorized-cases-ten-hour-reference-b-phase-adjudication-v2.md) are separate premises. The original complex initial state and finite slow-map coefficients still require their own admissions.

## An exact auxiliary section

Use the exact analytic composition of the fifteen finite auxiliary flows, whose degree-sixteen Taylor polynomial is the retained forward map. It maps $(Q,\overline Q,\delta)$ to the physical angle coordinates $w-1+iu$ and $\eta=\epsilon/h$. Write $Q=a e^{i\psi}$. This map is a coordinate change of the admitted actual chart; it is not an alternative source history. The finite flow bounds give a common analytic neighborhood of $15/16\le a\le17/16$, $|\psi-\pi|\le1/8$, and $|\delta|\le2^{-10000}$. Cauchy estimates on a slightly larger neighborhood bound each derivative used below by $C=2^{50000}$. The identity map is the parameter-zero control, and all state corrections start at degree two.

The equation $u(a,\psi,\delta)=0$ has exactly one local section $\psi_u(a,\delta)$ near $\pi$. At zero parameter, $u=a\sin\psi$, $\psi_u=\pi$ and $w=1-a$. The analytic bounds and the selected tiny parameter give

$$
|\partial_\psi u|>\tfrac12,\qquad
m(a,\delta):=w(a,\psi_u(a,\delta),\delta),\qquad
-2<\partial_a m<-\tfrac12,
$$

$$
|\partial_\delta m|\le C\delta,\qquad
|\partial_a\psi_u|\le C\delta^2,\qquad
|\partial_\delta\psi_u|\le C\delta.
\tag{1}
$$

All inequalities refer to real positive parameter on this neighborhood. The smallness requirements are explicit consequences of $C\delta<2^{-149000}$ at the selected member. At amplitudes below $15/16$, the same map bound gives $w>1/32$ whenever $\psi$ is near its outer minimum; away from that minimum, the parameter-zero margin is larger. Thus there is no earlier zero of $w$ before this final neighborhood.

The independently checked inverse at physical $w=u=0$ gives

$$
Q_g=-1-\tfrac54\delta^2-\tfrac{7i}{3}\delta^3+O(C\delta^4),
$$

$$
a_g(\delta)=1+\tfrac54\delta^2+O(C\delta^4),\qquad
\psi_u(a_g(\delta),\delta)=\pi+O(C\delta^3).
\tag{2}
$$

The cubic radial term is zero. These are uniform remainder statements from the analytic map and its audited low coefficients, not an extrapolation from a truncated physical trajectory.

## Grazing along the retained slow curve

Let $\delta(a)$ be the retained slow solution and set $\delta_1=\delta(1)$. The admitted slow envelope and the declared initial interval give $\epsilon^3/16<\delta_1<16\epsilon^3$. In the fixed final neighborhood,

$$
\frac{d\log\delta}{da}=\frac{B}{a\Lambda}
=-\frac{2}{3a}+O(C\delta/a).
\tag{3}
$$

The function $a-a_g(\delta(a))$ has derivative between $1/2$ and $2$, by (1)–(3). It has one zero $a_c$, and substituting (3) into (2) gives

$$
a_c=1+\tfrac54\delta_1^2+O(C\delta_1^4).
\tag{4}
$$

Define the lifted critical phase

$$
\Theta_c=\psi(a_c)-\psi_u(a_c,\delta(a_c)).
$$

The audited quartic radial coefficient is $\Lambda_4=0$. Consequently $\Lambda=2\delta^3+O(C\delta^5)$ and $\Omega=1+\delta^2/2+O(C\delta^4)$. Integrating $d\psi/da=\Omega/(a\Lambda)$ from one to (4), while retaining the variation of $a$ and $\delta$, gives

$$
\left|\Theta_c-left\{\psi(1)+\frac{5}{8\delta_1}-\pi\right\}\right|
\le2^{50010}\delta_1.
\tag{5}
$$

For clarity, the leading integral is $(5\delta_1^2/4)/(2\delta_1^3)$. Each relative variation of $a$, $\delta$ or the leading integrand across this interval is $O(C\delta_1^2)$, so its contribution is $O(C\delta_1)$. The $O(C\delta_1^4)$ endpoint error divided by $\delta_1^3$ is of the same order. The section's phase shift in (2) is smaller. There is no constant correction because the audited quartic radial coefficient vanishes.

## Matching actual sections before the first boundary

Set $F(a)=\psi(a)-\psi_u(a,\delta(a))$. On the final neighborhood, (1)–(3) and the phase equation give

$$
\frac1{4\delta(a)^3}<F'(a)<\frac4{\delta(a)^3}.
\tag{6}
$$

The retained section of index $N$ is $F(a_N)=2\pi N$. Since $m(a,\delta(a))$ is strictly decreasing with derivative between $-3$ and $-1/4$, its sign is positive exactly for $a<a_c$ and negative exactly for $a>a_c$. Adjacent sections close to $a_c$ have parameter differing by a relative $O(C\delta_1^3)$ and their signed minima decrease by more than $\delta_1^3/4$. No section is omitted by considering only the two adjacent to $a_c$: all preceding sections have positive minima by this monotonicity and the earlier $w$ margin.

The actual/comparison lifted phase discrepancy is less than $2^{175082}\epsilon^2$, and the correlated log-parameter discrepancy is less than $2^{175063}\epsilon^{11}$, by the separate phase assessment, conditional on its initial complex-state premise. The latter shifts the section phase by at most $C\delta_1^2$ times that discrepancy. Using (6) converts the total phase discrepancy into an amplitude discrepancy at the same physical $u=0$ section. Equation (1) then yields the conservative signed-minimum error

$$
|m_{\mathrm{actual}}-m_{\mathrm{comparison}}|
<2^{195000}\epsilon^{11}.
\tag{7}
$$

Indeed the phase contribution is bounded by $12(16\epsilon^3)^3\,2^{190000}\epsilon^2<2^{190016}\epsilon^{11}$. The direct parameter contribution is at most $2^{50000}(16\epsilon^3)^2\,2^{175063}\epsilon^{11}$, much smaller at the selected parameter. The analytic coordinate-tail contribution is already covered by the accepted actual transformed value argument, rather than counted as a new physical equation error. All comparisons stop at the first actual zero of $w$; a negative comparison minimum is an event bracket, not a physical continuation through infinity.

## A concrete interval decision

An eventual independently checked scalar evaluator must enclose

$$
\Theta^{[13]}=\psi^{[13]}(1)+\frac{5}{8\delta_1^{[13]}}-\pi
\tag{8}
$$

with the original preparation's initial phase, the complete finite slow expression and its endpoint multiplier. Add the separately admitted slow truncation, (5), input-coordinate uncertainty, phase uncertainty and directed-rounding error. The degree-thirteen multiplier error contributes through the derivative of $1/\delta_1$; it must not be omitted. Under the proposed slow bound it is smaller than $2^{140030}\epsilon^{11}$ and therefore fits the following margin.

If the resulting central interval is farther than

$$
\nu=2^{196000}\epsilon^2
\tag{9}
$$

from every integer multiple of $2\pi$, its nearest preceding and following section minima have strict opposite signs even after (7). To check constants, (6) and (1) convert a phase gap $\nu$ into a minimum magnitude greater than $\nu\delta_1^3/32>2^{195983}\epsilon^{11}$, exceeding (7). The previous minima are all positive; the next comparison minimum is negative. The actual first zero of $w$ therefore occurs transversely with $u>0$, before that negative comparison minimum. On the admitted chart $h$ tends to a finite positive value over this finite final angle interval, so the limiting radial speed $u/h$ is positive. The accepted all-future dispersal theorem then identifies the positive-terminal-speed branch of this same member.

If (9) is not established, this argument yields no branch classification. A zero-containing interval is not skipped; neither a longer finite tail nor a later negative algebraic minimum settles an earlier possible grazing boundary. Exact zero terminal speed would require an exact grazing identity or another independent asymptotic proof.

The known zero-parameter section control has $m=1-a$, $\psi_u=\pi$ and $F'=1/(2\delta^3a)$ under the leading slow law. It independently verifies the sign, spacing and inverse-section mechanism. The known low-order inverse control fixes the $5/(8\delta_1)$ correction. Neither control evaluates the selected large phase. Falsifiers are a failed analytic section neighborhood, a nonzero omitted quartic radial coefficient, a missing parameter/initial-phase contribution, loss of actual chart coverage before the tested section, or an interval decision that fails to exclude the entire $\nu$ neighborhood of $2\pi\mathbb Z$. This proof and its numerical consumer require separate independent admission before target use.
