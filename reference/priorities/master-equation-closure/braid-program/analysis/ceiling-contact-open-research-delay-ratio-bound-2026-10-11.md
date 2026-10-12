# The delay-ratio bound in the planar exchange-symmetric pursuit limit: a contraction theorem (ceiling-contact open research, problem 1)

**The equation behind this record is the field-speed ceiling variant, not the Master Equation**, and the system treated here is the *pursuit limit* of its approaching pair, reduced further to planar motion in which the two members stay antipodal about a fixed centre: the scalar delay equation of [Section 7 of the contact study](ceiling-contact-two-hour-2026-10-06.md#7-the-pursuit-limit-spiral-a-closed-form-comparison-and-its-formal-spectrum). Nothing here adopts the variant or selects any contact rule or continuation.

This record addresses obligation 1 of the study under the [launch brief](ceiling-contact-open-research-launch-brief.md): prove or refute the delay-ratio bound for histories near the spiral. Units: $c_f=1$.

## 1. Result

**Theorem (derived). In the planar exchange-symmetric pursuit limit, every history that starts within $0.15$ of the spiral, in the sense of Section 2, stays within that distance for ever, converges to the spiral, and reaches coincidence in finite time with ordinary causal roots throughout; the delay ratio is bounded along the whole approach.** More precisely, with $c^\ast=1.1245045$ the spiral's value of the scalar variable $c=\cot(\Phi/2)$ (where $\Phi$ is the angle between a member's velocity and the reverse of its partner's velocity at emission), if $\lvert c-c^\ast\rvert\le d$ on an initial window and $d\le0.15$, then $\lvert c-c^\ast\rvert\le d$ at all later times, and the largest deviation on each successive window is at most $\kappa(d)$ times that on the previous one, with $\kappa(0.15)=0.968$, $\kappa(0.10)=0.806$, $\kappa(0.05)=0.674$ and $\kappa(d)\to0.563$ as $d\to0$. The proof is a single explicit inequality for the functional that produces $c$ from its own past (Section 3), and it is the contraction estimate that the study said was missing, for this class.

**What the theorem covers and does not cover.** It covers the reduced system in which (i) the two members are at wake speed and aimed exactly at each other's images (no pointing error), (ii) there is no third member, (iii) the motion is planar, and (iv) the two histories are exchange-symmetric (antipodal about a fixed centre, equal delayed ranges). Of C1's actual approach it covers none of these exactly: C1 has a pointing error of about $2\tau$ (Lemma 2 of the study bounds it by $3\tau$), a third member, a plane that forms only asymptotically, and arms that become symmetric only as $r^{1.9}$. What the theorem establishes is that in the reduced class the delay ratio is not a marginal variable at all: it is confined, and the spiral attracts. Section 5 states what a proof for C1 would still need and gives, for the perturbation structure that the actual variant imposes, the elementary extension of the contraction argument to a forcing that decays with the separation. Section 6 lists the falsifiers.

**Numerical confirmation (measured on two instruments written for this record).** Marching the scalar equation forward from histories displaced from the spiral by $0.1$ to $0.3$, the largest deviation per window falls by factors between $0.2$ and $0.42$, faster than the theorem's bound and near the formal spectrum's $\lambda^{-1.36}=0.33$. Simulating the reduced pursuit system directly from a spiral with a wobbled phase, $c$ returns to $c^\ast$ to $2\times10^{-6}$ within three decades of separation and the delay ratio stays between $1.290$ and $1.386$ throughout, converging to the spiral's $1.290061$.

## 2. The scalar equation and its budget form

**Variables.** In the planar exchange-symmetric pursuit limit (the study's Section 7, re-derived in this thread and reproduced in the brief for problem 2), with $\tau$ the common delayed range, $\varphi$ the heading of member 0 and the rescaled time $d\eta=dT/\tau$,

$$
\frac{d\varphi}{d\eta}=2c,\qquad \frac{d\ln\tau}{d\eta}=-c^2,\qquad c(\eta)=\cot\Theta(\eta),\qquad \Theta(\eta)=\int_{\eta-N(\eta)}^{\eta}c\,d\eta'
$$

where the window $N(\eta)$ is the delay in rescaled time, fixed by $\int_{\eta-N}^{\eta}\exp\bigl(\int_{\eta'}^{\eta}c^2\bigr)d\eta'=1$. The quantity $\Theta$ is half the turn of the heading over one delay; $b=\cos2\Theta$ is the study's $b$, the transmitter factor is $1-b$, and $c=\sqrt{(1+b)/(1-b)}$. The spiral is the constant solution $c\equiv c^\ast=\sqrt{\lambda-1}$, with window $N^\ast=\ln\lambda/(\lambda-1)=0.6463834$ and $\Theta^\ast=\operatorname{arccot}c^\ast=0.7268611$; $\lambda=2.2645104$ is the root of Part A of the [spiral record](ceiling-contact-open-research-spiral-root-and-spectrum-brief-2026-10-11.md). The equation is explicit: $c(\eta)$ is determined by $c$ on $[\eta-N(\eta),\eta)$, so a solution exists as long as $\Theta\in(0,\pi)$, which holds throughout the region of the theorem.

**Budget form (derived).** Let $Q(\eta')=\int_{\eta'}^{\eta}\exp\bigl(\int_{\eta''}^{\eta}c^2\bigr)d\eta''$ be the cumulative weight counted backward from the present, so that $Q$ runs from $0$ at $\eta'=\eta$ to $1$ at the oldest end of the window, and write $p(Q)$ for $c$ at the point of the past where the weight reaches $Q$. Then $dQ=e^{\rho}d\eta'$ with $\rho=\int_{\eta'}^{\eta}c^2$, and $d\rho/dQ=p^2e^{-\rho}$, so $e^{\rho}=1+\int_0^Qp^2$; hence

$$
\Theta=\int_0^1\frac{p(Q)}{1+P(Q)}\,dQ,\qquad P(Q)=\int_0^Qp(Q')^2\,dQ'
$$

The window has disappeared into the variable: the functional is explicit in $p$ on the fixed interval $[0,1]$. For constant $p=x$ it gives $\ln(1+x^2)/x$, which at $x=c^\ast$ is $\Theta^\ast$.

**Linearization and kernel (derived).** Put $p=x+\delta$ with $x=c^\ast$, $\lvert\delta\rvert\le d$, and $g(Q)=1+x^2Q$. Then $P=x^2Q+\epsilon$ with $\epsilon=2x\Delta+\Delta_2$, $\Delta=\int_0^Q\delta$, $\Delta_2=\int_0^Q\delta^2$, $\lvert\epsilon\rvert\le(2xd+d^2)Q$. Expanding $1/(g+\epsilon)=1/g-\epsilon/g^2+\epsilon^2/(g^2(g+\epsilon))$ and exchanging the order of integration in the term $\int x\cdot2x\Delta/g^2$,

$$
\Theta=\Theta^\ast+\int_0^1K(Q)\,\delta(Q)\,dQ+R,\qquad K(Q)=\frac2\lambda-\frac1{1+x^2Q}
$$

The kernel is negative near the present ($K(0)=2/\lambda-1=-0.117$), changes sign at $Q_0=0.1046$, and is positive and largest at the oldest end ($K(1)=1/\lambda=0.442$): a change of $c$ in the recent past hardly moves $\Theta$, because it shortens the window as much as it lengthens the integrand, while a change in the distant past moves it fully. In closed form $\int_0^1\lvert K\rvert=0.2485210$ and $\int_0^1K=2(1-1/\lambda)/x^2-N^\ast=0.2368097$, the latter being the derivative of $\ln(1+x^2)/x$. These two numbers are the whole difference between the study's failed estimate and the proof: the study bounded the window and the integrand separately, which amounts to a kernel of size $1.056$ and a gain $2.39$; the true kernel, which accounts for the shortening of the window, has size $0.2485$ and gain $(1+c^{\ast2})\times0.2485=0.5628$.

**Remainder bound (derived).** The three second-order terms are $-\int x\Delta_2/g^2$, $-\int\delta\,\epsilon/g^2$ and $\int(x+\delta)\epsilon^2/(g^2(g+\epsilon))$; with $I_1=\int_0^1Q/g^2\,dQ=\bigl(\ln(1+x^2)+1/(1+x^2)-1\bigr)/x^4=0.1619495$ and $I_2(d)=\int_0^1Q^2/\bigl(g^2(1+(x^2-2xd-d^2)Q)\bigr)dQ$,

$$
\lvert R\rvert\le R(d):=d^2\Bigl[(3x+d)\,I_1+(x+d)(2x+d)^2\,I_2(d)\Bigr]
$$

## 3. The theorem and its proof

**Interval map.** If $\lvert c-c^\ast\rvert\le d$ on the window of $\eta$, then $\lvert\Theta(\eta)-\Theta^\ast\rvert\le e(d):=0.2485210\,d+R(d)$, and since $\cot$ is decreasing, $c(\eta)=\cot\Theta(\eta)$ lies in $[\cot(\Theta^\ast+e),\cot(\Theta^\ast-e)]$. Define $d'(d)$ as the larger of $\cot(\Theta^\ast-e)-c^\ast$ and $c^\ast-\cot(\Theta^\ast+e)$, and $\kappa(d)=d'/d$.

| $d$ | $e(d)$ | new interval for $c$ | $d'$ | $\kappa=d'/d$ |
| --- | --- | --- | --- | --- |
| $0.005$ | $0.00126$ | $[1.12165,1.12737]$ | $0.00287$ | $0.573$ |
| $0.01$ | $0.00257$ | $[1.11870,1.13034]$ | $0.00584$ | $0.584$ |
| $0.02$ | $0.00531$ | $[1.11255,1.13661]$ | $0.01210$ | $0.605$ |
| $0.05$ | $0.01464$ | $[1.09190,1.15820]$ | $0.03370$ | $0.674$ |
| $0.10$ | $0.03423$ | $[1.04984,1.20515]$ | $0.08064$ | $0.806$ |
| $0.15$ | $0.05973$ | $[0.99761,1.26969]$ | $0.14519$ | $0.968$ |
| $0.20$ | $0.09239$ | $[0.93449,1.35871]$ | $0.23421$ | $1.171$ |

**Theorem.** Let $c$ solve the scalar equation for $\eta\ge\eta_0$ with a continuous initial history on $[\eta_0-N(\eta_0),\eta_0]$ satisfying $\lvert c-c^\ast\rvert\le d$ there, $0<d\le0.15$. Then (i) $\lvert c(\eta)-c^\ast\rvert\le d$ for all $\eta\ge\eta_0$; (ii) if $d_k$ denotes the largest deviation on the $k$-th window $[\eta_k-N(\eta_k),\eta_k]$ where $\eta_{k+1}=\eta_k+N(\eta_k)$, then $d_{k+1}\le\kappa(d_k)\,d_k$ with $\kappa$ as tabulated, so $d_k\to0$ and $c\to c^\ast$; (iii) $\tau(\eta)\le\tau(\eta_0)\,e^{-(c^\ast-d)^2(\eta-\eta_0)}$, the time to coincidence $\int\tau\,d\eta$ is at most $\tau(\eta_0)/(c^\ast-d)^2$, and $\tau\to0$, $r\to0$; (iv) the transmitter factor $1-b=1-\cos2\Theta$ stays in $[0.762,1.027]$ for $d\le0.15$, so every root is ordinary; (v) the delay ratio obeys $\tau/r\le\Lambda(d)$ with the explicit $\Lambda$ of Section 4, $\Lambda(0)=6.39$ and $\Lambda(0.15)=15.8$.

*Proof.* (i) Let $\eta_1$ be the supremum of the times up to which $\lvert c-c^\ast\rvert\le d$ holds on $[\eta_0-N(\eta_0),\eta_1)$; it is at least $\eta_0$. The window start $\eta-N(\eta)$ is the emission time in rescaled units and increases with $\eta$ (the emission clock runs forward, $dS/dT=2/(1-b)>0$), so for every $\eta\le\eta_1$ the whole window lies in the region where the bound holds. By continuity of $\Theta$ in $\eta$, $\lvert\Theta(\eta_1)-\Theta^\ast\rvert\le e(d)$ and $\lvert c(\eta_1)-c^\ast\rvert\le d'(d)<d$; the same strict inequality holds on a neighbourhood of $\eta_1$ by continuity, contradicting the definition of $\eta_1$ unless $\eta_1=\infty$. (ii) Each point of the $(k+1)$-th window has its own window inside the union of the $k$-th window and the part of the $(k+1)$-th already bounded, on all of which the deviation is at most $d_k$; apply the interval map with $d=d_k$. Since $\kappa(d)\le0.968$ for $d\le0.15$ and decreases to $0.563$, $d_k$ decreases geometrically. (iii) From $d\ln\tau/d\eta=-c^2\le-(c^\ast-d)^2$. (iv) $\Theta\in[\operatorname{arccot}(c^\ast+d),\operatorname{arccot}(c^\ast-d)]=[0.6654,0.7984]$ and $1-\cos2\Theta$ is increasing on it. (v) is Section 4. $\square$

The numbers $e(d)$ and $\kappa(d)$ are explicit functions of $\lambda$ evaluated in double precision; the only non-elementary step is the integral $I_2(d)$, computed by quadrature on $2\times10^5$ points. The remainder bound was checked against the exact functional on $46$ histories at each of five values of $d$ (constant, cosine, square-wave, two-level and random piecewise-constant); the largest remainder found was $0.30$, $0.30$, $0.29$, $0.27$, $0.24$ of the bound at $d=0.02$, $0.05$, $0.1$, $0.2$, $0.3$.

## 4. The delay ratio in the class

In the exchange-symmetric class the receiver's position is $X_0(T)=\tfrac12\bigl(\int_S^Te^{i\varphi}dt-\tau e^{i\varphi(T)}\bigr)$ (the image is $-X_0(S)$ and $X_0(S)=X_0(T)-\int_S^Te^{i\varphi}$), so the separation is

$$
r=2\lvert X_0(T)\rvert=\Bigl\lvert\int_S^T\bigl(e^{i\varphi(t)}-e^{i\varphi(T)}\bigr)dt\Bigr\rvert\ \ge\ \int_S^T\bigl(1-\cos(\varphi(T)-\varphi(t))\bigr)dt
$$

by projecting on the present velocity. The heading turns at the rate $2c/\tau$ in time, with $c\ge m:=c^\ast-d$ and $\tau\le\tau(S)$ on the window; and $\tau(S)/\tau(T)=\exp\int c^2\le\exp\bigl(M^2\ln(1+m^2)/m^2\bigr)=:\Lambda_S$ with $M=c^\ast+d$, because the window length is at most $\ln(1+m^2)/m^2$ when $c\ge m$. So $\varphi(T)-\varphi(t)\ge2m(T-t)/(\Lambda_S\tau)$, an angle below $\pi$, and

$$
\frac r\tau\ \ge\ 1-\frac{\sin(2m/\Lambda_S)}{2m/\Lambda_S}=:\frac1{\Lambda(d)}
$$

At $d=0$, $\Lambda_S=\lambda$ and $\Lambda=6.39$; at $d=0.15$, $\Lambda_S=3.133$ and $\Lambda=15.8$. The bound is crude (the spiral's actual ratio is $1.29$) but explicit, and it is all that Theorem B of the study asks for in this class. In the class, however, coincidence does not need Theorem B at all: it follows from (iii) directly.

## 5. What a proof for C1 would still need, and the forced version of the contraction

The actual variant perturbs the scalar equation in three ways, each of relative size proportional to $\tau$ in the inner approach: the pointing error $\psi\approx1.99\tau$ (Lemma 2 of the study traps it below $3\tau$ whatever $c$ does), the third member's row (bounded, against pair rows that grow as $1/\tau^2$), and the departure from exchange symmetry (measured to die as $r^{1.9}$). Out-of-plane motion is a fourth, with the same decay. Suppose these enter as a forcing $f(\eta)$ in $c(\eta)=\cot\Theta(\eta)+f(\eta)$ with $\lvert f\rvert\le\epsilon_0\tau(\eta)/\tau(\eta_0)$. Then the window estimate becomes $d_{k+1}\le\kappa(d_k)d_k+\epsilon_k$ with $\epsilon_k\le\epsilon_0e^{-m^2kN}$ summable, and the elementary recursion gives $d_k\le\kappa^kd_0+\sum_{j<k}\kappa^{k-1-j}\epsilon_j\to0$ provided $d_0+\epsilon_0/(1-\kappa)\le0.15$ keeps every $d_k$ inside the region of the theorem. That is the shape of the argument for C1. What is **not** done: showing that the variant's three perturbations can be written as such a forcing of the scalar equation (they are coupled: the pointing error and the asymmetry have their own dynamics, which the study's Lemma 2 and the formal antisymmetric spectrum describe only in part), and treating the asymmetric planar system, in which $c_0$, $c_2$, the two windows and the misalignment $\chi=\varphi_0-\varphi_2-\pi$ form a four-component delay system whose kernel is a matrix. The first is the obstruction that remains for C1; the second is the next theorem to attempt, and the present proof is its template.

C1's measured entry into the class, for reference: at $10^{-3}$ sizes its $c=\sqrt{(1+b)/(1-b)}$ is $c^\ast-9.1\times10^{-4}$ and the two arms' delay ratios differ by $4\times10^{-5}$; if its inner history were in the class, the theorem would apply with $d=10^{-3}$ and the contraction factor $0.57$ per window.

## 6. Instruments, controls and measurements

`ccor_scalar.py` (new; numpy and mpmath) computes the constants in 30-digit arithmetic, checks the budget form against the window form of $\Theta$ on constant, sinusoidal, ramp and step histories (agreement $\le2\times10^{-6}$, the step history's value limited by quadrature), checks the kernel by central finite differences of the exact functional on three test functions ($\le3\times10^{-10}$), verifies the remainder bound as stated above, tabulates the interval map, marches the scalar equation with step $N^\ast/300$ (the constant history stays constant to $7\times10^{-7}$, the discretization error), and simulates the reduced pursuit system directly (one member and its antipode, aimed at the image, fourth-order Runge–Kutta with step $0.01\tau$ and cubic Hermite history). Controls on the pursuit simulator, asserted before the perturbed runs: started on the exact spiral history it stays on the spiral over eight decades of separation to $7\times10^{-8}$ in $c$, $1\times10^{-8}$ in the delay ratio, $5\times10^{-8}$ in the closing rate and $7\times10^{-8}$ in the transmitter factor. All controls pass (receipt `ccor-scalar.json`).

| Instrument and history | Largest deviation of $c$ from $c^\ast$ per successive window (march) or per decade of $r$ (pursuit) |
| --- | --- |
| march, $0.1\sin6\eta$ | $0.044$, $0.018$, $0.0073$, $0.0015$, $5.6\times10^{-4}$, $2.3\times10^{-4}$, $8.1\times10^{-5}$ (ratios $0.41$, $0.40$, $0.20$, $0.38$, $0.42$, $0.35$) |
| march, square wave of height $0.2$ | $0.20$, $0.039$, $0.011$, $0.0047$, $0.0019$, $4.4\times10^{-4}$, $1.6\times10^{-5}$ |
| march, constant offset $+0.3$ | $0.30$, $0.069$, $0.027$, $0.0069$, $0.0018$, $7.4\times10^{-4}$, $3.0\times10^{-4}$ |
| pursuit, spiral with phase wobble $0.05\sin(12\ln s)$ | $0.118$, $8.0\times10^{-4}$, $6.5\times10^{-5}$, $2.1\times10^{-6}$, $1.8\times10^{-7}$, then at the floor $6\times10^{-8}$ |
| pursuit, phase wobble $0.15\sin(8\ln s)$ | $0.232$, $0.011$, $4.8\times10^{-4}$, $2.2\times10^{-5}$, $6.9\times10^{-7}$, then at the floor |

In the pursuit runs the delay ratio never exceeded $1.386$ (first decade) and converged to $1.290061$, and the transmitter factor never fell below $0.771$. The march histories with offset $0.3$ lie outside the proved region ($d\le0.15$) and still contract: the theorem's region is sufficient, not necessary. The per-window contraction of the march, $0.2$ to $0.42$, is below the theorem's $\kappa$ and close to the formal spectrum's slowest symmetric mode, $\lambda^{-1.36}=0.329$, since one window of rescaled length $N^\ast$ shrinks $s$ by the factor $\lambda$.

## 7. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| Budget form, kernel, remainder bound, interval map, theorem (i)–(v) | Derived; constants in double precision; remainder bound checked on $230$ histories | An algebra error in Section 2 or 3; a history $p$ with $\lvert p-c^\ast\rvert\le d\le0.15$ on $[0,1]$ whose $\Theta$ lies outside $\Theta^\ast\pm e(d)$; `ccor_scalar.py` |
| The scalar equation is the planar exchange-symmetric pursuit limit | Derived in the study; re-derived in this thread (clock identity, turning identity, window condition) | A planar symmetric pursuit history on which the direct simulation and the march disagree beyond discretization |
| Contraction measured on the march and on the direct pursuit simulation | Measured; two instruments written in this thread, same model family as the study | A perturbed history inside the region that does not return to the spiral in either instrument |
| The forced recursion of Section 5 | Derived, for a forcing of the stated form | Not a claim about C1; C1's perturbations have not been shown to take that form |
| What remains for C1 | Stated | — |

## 8. Validation, files and review status

Command, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root:

```
python ccor_scalar.py
```

Receipt `ccor-scalar.json` and log. Two instrument defects were found and fixed by the controls before any result was read: a reversed cumulative integral in the window form of $\Theta$ (caught by the constant-history control) and a finite-difference read-out of the emission velocity that broke down when the delay fell to the size of the difference step (caught by the exact-spiral control at small separation, and replaced by the interpolant's derivative). Review status: self-review only; no reader of another model family and no human has reviewed the proof.
