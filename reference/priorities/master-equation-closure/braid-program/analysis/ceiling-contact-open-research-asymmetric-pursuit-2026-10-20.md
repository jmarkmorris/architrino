# The planar pursuit limit without exchange symmetry: exact reduction, spectrum, and why the contraction proof does not extend (ceiling-contact open research, continuation of problem 1)

**The equation behind this record is the field-speed ceiling variant, not the Master Equation**, and the system treated here is the *pursuit limit* of its approaching pair: two points moving at wake speed, each aimed exactly at the other's causal image, with no third member, in one plane. Nothing here adopts the variant or selects any contact rule or continuation.

This record continues the [delay-ratio record](ceiling-contact-open-research-delay-ratio-bound-2026-10-11.md), which proved the delay-ratio bound and convergence to the spiral when the two members are mirror images through a fixed centre. On 2026-10-20 the operator asked for the next step that record named: the same question without the mirror symmetry. Units $c_f=1$.

## 1. Result

**The general planar pursuit limit reduces exactly to a delay system in four quantities, and the headings drop out (derived).** The four quantities are the two members' turning variables $c_0$ and $c_2$, the ratio $\rho$ of their delayed ranges, and the misalignment $\chi$ of their headings from exactly opposite. Each member's turning variable is fixed by the partner's turning over the receiver's own window, read in the partner's clock, plus or minus half the misalignment. The window is longer or shorter than in the symmetric case by the ratio $\rho$.

**Its linearization about the spiral reproduces the formal spectrum of the study, by an independent route (derived; roots located numerically).** Every non-symmetry root that the study's characteristic function has in the plane appears here, in both sectors, to $3\times10^{-14}$: $1.359982\pm4.872282\,i$ and $2.477030\pm13.017620\,i$ (symmetric), and $1.908403$ and $2.057611\pm9.039890\,i$ (antisymmetric). These variables share nothing with the study's perturbation of positions in complex form: they are angles and delayed ranges, and the characteristic functions are different functions. This is a further derivation of the formal spectrum, by a different method, made by a member of this model family. The spectrum has also been recounted, on 2026-10-20, by a Codex reader outside this model family, who agreed with every root used here; see the correction section of that date in the [spiral record](ceiling-contact-open-research-spiral-root-and-spectrum-brief-2026-10-11.md). Following that reading, the rounded exponent $1.36$ is not used as a bound: the slowest symmetric exponent is $1.359982$.

**The reduced system admits one pair of growing modes that a real pursuit never excites, so no contraction argument confined to these variables can succeed (derived).** The pair is at $\mu=-1\pm ik$ in the study's exponent, so it grows relative to the shrinking spiral as $1/s$. It is the offset of the image constraint: the vector by which the point a member aims at differs from where its partner actually was. The reduced equations are exactly the two components of the statement that this offset does not change in time. They conserve it, whatever its value, but they do not contain the positions needed to set it to zero. In a real pursuit it is zero by definition. A solution of the reduced equations with a constant nonzero offset is a member aiming at a fixed displacement from its partner's image, which is not the pursuit. Relative to a spiral of size $s$ a fixed displacement grows as $s^{-1}$, which is exactly the root found. A proof of convergence for the asymmetric case therefore has to carry position information, or work on the set where the offset vanishes, which the reduced variables cannot describe by themselves.

**Even without that mode, the one-window argument fails here, for a second reason (derived).** In the symmetric case the window functional alone was a contraction, with gain $0.563$. Here, if the memory of the window is dropped, the antisymmetric part grows: its instantaneous matrix has eigenvalues $0.897\pm2.219\,i$ per unit of rescaled time, which is $\mu=-0.709\pm1.755\,i$. The ratio of delayed ranges grows by itself, because the member with the longer delayed range shrinks it proportionally more slowly, and its longer window lowers its turning variable, which slows it further. Only the delayed feedback through the misalignment restores it. Stability of the antisymmetric sector is a property of the delay, so any proof must estimate a delayed feedback loop, not a single window.

**The nonlinear dynamics converge anyway (measured).** Two independent pursuers were simulated directly, with no symmetry imposed. They started from four asymmetric histories: one arm 5% larger; one arm rotated by $0.1$ radian; one arm with a phase wobble of $0.15$; both arms wobbled differently by $0.1$. In every run the asymmetry, measured as the largest of $\lvert c_0-c_2\rvert$, $\lvert\ln\rho\rvert$ and $\lvert\chi\rvert$, fell from $0.06$–$0.31$ in the first decade of separation to $5\times10^{-11}$–$3\times10^{-10}$ by $10^{-5}$ of the starting separation. Fitted between $10^{-2}$ and $10^{-5}$ its exponent is $1.908$, $1.912$, $2.023$ and $1.914$, against the slowest antisymmetric root $1.9084$. The third run's per-decade ratios oscillate because the oscillatory root $2.058\pm9.040\,i$ is strongly excited there. The delay ratio never exceeded $1.486$.

**What this changes.** The delay-ratio bound is proved in the planar symmetric class and is now measured, but not proved, in the planar asymmetric class. The obstruction for a proof is named precisely: the constraint offset, and the delayed stabilization of the antisymmetric sector. The coincidence of release C1 remains inferred.

## 2. The reduction

**Notation.** Members $0$ and $2$ move in a plane with unit speed. Member $i$'s heading is $\varphi_i$, so its velocity is $e^{i\varphi_i}$ in complex notation. It is aimed at its partner $j$'s image $\mathbf X_j(S_i)$, where $S_i=T-\tau_i$ is the emission instant of the wake now arriving and $\tau_i$ is the delayed range. Let $\Phi_i$ be the angle between member $i$'s velocity and the reverse of its partner's velocity at emission, $\Phi_i=\varphi_i(T)-\varphi_j(S_i)-\pi$. Let $b_i=\cos\Phi_i$, so that the transmitter factor of the row on $i$ is $1-b_i$, and let $c_i=\cot(\Phi_i/2)$.

**Image constraint.** By definition of the image, $\mathbf C_i:=\mathbf X_i(T)+\tau_i\mathbf e_i(T)-\mathbf X_j(S_i)=0$, with $\mathbf e_i$ the unit vector toward the image, which equals the velocity in the pursuit limit. Differentiating, with $\dot{\mathbf X}_i=\mathbf e_i$, $\dot{\mathbf X}_j(S_i)=\mathbf e_j(S_i)$ and $\dot S_i=1-\dot\tau_i$,

$$
\dot{\mathbf C}_i=(1+\dot\tau_i)\,\mathbf e_i+\tau_i\dot{\mathbf e}_i-(1-\dot\tau_i)\,\mathbf e_j(S_i)
$$

Its component along $\mathbf e_i$ vanishes exactly when $\dot\tau_i=-(1+b_i)/(1-b_i)=-c_i^2$, and its component across $\mathbf e_i$ vanishes exactly when $\tau_i\dot\varphi_i=2c_i$. These are the clock identity and the turning identity of the study; they hold for each member separately and use no symmetry.

**The system.** Write the misalignment $\chi=\varphi_0-\varphi_2-\pi$. Then $\Phi_0=\chi(T)+\int_{S_0}^T\dot\varphi_2$ and $\Phi_2=-\chi(T)+\int_{S_2}^T\dot\varphi_0$ (modulo $2\pi$), so

$$
\frac{\Phi_0}2=\int_{S_0}^{T}\frac{c_2}{\tau_2}\,dT'+\frac\chi2,\qquad \frac{\Phi_2}2=\int_{S_2}^{T}\frac{c_0}{\tau_0}\,dT'-\frac\chi2,\qquad \dot\tau_i=-c_i^2,\qquad \dot\chi=2\Bigl(\frac{c_0}{\tau_0}-\frac{c_2}{\tau_2}\Bigr)
$$

with $c_i=\cot(\Phi_i/2)$ and $S_i=T-\tau_i$. Headings no longer appear, only their difference $\chi$.

**Budget form.** Exactly as in the symmetric case, change the integration variable in receiver 0's window to the cumulative weight $Q$ of the partner's clock $d\eta_2=dT/\tau_2$. Then $\int_{S_0}^T c_2/\tau_2\,dT'=F(p_2;\rho)$ with

$$
F(p;R)=\int_0^R\frac{p(Q)}{1+\int_0^Qp^2}\,dQ,\qquad \rho=\frac{\tau_0}{\tau_2}
$$

where $p_2(Q)$ is $c_2$ at the point of the window where the weight reaches $Q$. The window now has weight $\rho$, not one, because receiver 0's delayed range is $\rho$ times its partner's. Likewise $\int_{S_2}^Tc_0/\tau_0\,dT'=F(p_0;1/\rho)$. In the clock $\eta=\eta_2$,

$$
\frac{d\ln\rho}{d\eta}=c_2^2-\frac{c_0^2}{\rho},\qquad\frac{d\chi}{d\eta}=2\Bigl(\frac{c_0}{\rho}-c_2\Bigr)
$$

The spiral is $c_0=c_2=c^\ast=1.1245045$, $\rho=1$, $\chi=0$. The symmetric class is $c_0=c_2$, $\rho=1$, $\chi=0$ for all time, and there the system is the scalar equation of the delay-ratio record.

## 3. Linearization

Put $c_i=x+\delta_i$ with $x=c^\ast$, $\rho=e^{\varepsilon}$, and let $K(Q)=2/\lambda-1/(1+x^2Q)$ be the kernel of the delay-ratio record. The window end contributes $\partial F/\partial R=x/(1+x^2)$ at $R=1$, and $c=\cot\Theta$ gives $\delta=-(1+x^2)\,\delta\Theta$. With $\ell(Q)=\ln(1+x^2Q)/x^2$ the lag at weight $Q$, the symmetric part $s=(\delta_0+\delta_2)/2$ and the antisymmetric part $a=(\delta_0-\delta_2)/2$ obey

$$
s(\eta)=-(1+x^2)\!\int_0^1\!K(Q)\,s(\eta-\ell(Q))\,dQ
$$

$$
a(\eta)=(1+x^2)\!\int_0^1\!K(Q)\,a(\eta-\ell(Q))\,dQ-x\,\varepsilon-\tfrac{1+x^2}2\chi,\qquad \varepsilon'=-4x\,a+x^2\varepsilon,\qquad \chi'=4a-2x\,\varepsilon
$$

For modes $e^{\nu\eta}$, with $\hat k(\nu)=\int_0^1K(Q)(1+x^2Q)^{-\nu/x^2}dQ$, the characteristic equations are $1+(1+x^2)\hat k(\nu)=0$ in the symmetric sector and

$$
\det\begin{pmatrix}1-(1+x^2)\hat k(\nu)&x&\tfrac{1+x^2}2\\4x&\nu-x^2&0\\-4&2x&\nu\end{pmatrix}=0
$$

in the antisymmetric sector. Rescaled time and time to coincidence are related by $e^{\nu\eta}=s^{\mu}$ with $\mu=-\nu/(\lambda-1)$, the study's exponent: a mode shrinks relative to the spiral when $\operatorname{Re}\mu>0$.

**Roots (measured numerically from the derived functions).** Newton iteration from a $24\times24$ grid, with $\hat k$ by 200-point Gauss–Legendre quadrature:

| Sector | Roots found, as $\mu$ | Study's formal spectrum, non-symmetry roots | Extra roots |
| --- | --- | --- | --- |
| symmetric | $1.359982\pm4.872282\,i$; $2.477030\pm13.017620\,i$ | the same, to $3.3\times10^{-14}$ | none |
| antisymmetric | $1.908403$; $2.057611\pm9.039890\,i$; $-1\pm1.778561\,i$ | the first three, to $2.5\times10^{-14}$ | $-1\pm ik$, the constraint offset |

The study's own symmetry roots (rotation, time shift, translation of the centre) do not appear, because a rigid rotation, a shift of the coincidence instant and a rigid translation change none of $c_i$, $\rho$, $\chi$. The pair at $-1\pm ik$ coincides with the study's translation roots in location, but its origin here is different. A rigid translation is invisible in these variables; what appears is a constant offset of the image constraint. The study's variables contain positions, so there the same location belongs to a genuine symmetry. That this pair is the constraint offset is inferred, from three facts: the conservation law of Section 2, the fact that a fixed offset relative to a spiral of size $s$ scales as $s^{-1-ik}$, and the absence of any other root in the region. By the argument principle, on the box $\operatorname{Re}\nu\in[-0.38,40]$, $\lvert\operatorname{Im}\nu\rvert\le60$ (that is, $\operatorname{Re}\mu\le0.3$ inside it), the symmetric function has no zero and the antisymmetric function has exactly two. Largest phase steps on the contours were $0.015$ and $0.021$ radians.

**The memory-free antisymmetric matrix.** Dropping the window integral, the pair $(\varepsilon,\chi)$ evolves by $\begin{pmatrix}5x^2&2x(1+x^2)\\-6x&-2(1+x^2)\end{pmatrix}$, with eigenvalues $0.8968\pm2.2187\,i$. That is the second reason given in Section 1.

## 4. Direct simulation of two independent pursuers

`ccor_asym.py` integrates two members in the plane, each with unit velocity toward the other's image, located by bisection and Newton polish on the partner's stored path (cubic Hermite). It uses fourth-order Runge–Kutta with step $0.01$ of the smaller delayed range. Nothing is reduced and no symmetry is imposed. Every ten steps it reads $c_i$ from the transmitter factors, $\rho$ from the two delayed ranges and $\chi$ from the two velocities.

**Controls, asserted before the asymmetric runs.** Started on the exact spiral history, the simulation stays on it: the largest deviation of $c_0$, $c_2$, $\rho$ and $\chi$ from their spiral values is $5.7\times10^{-8}$ over six decades of separation. A rigidly translated spiral, which is an exact solution, gives the same $5.7\times10^{-8}$. That value is the instrument's floor, and it sits in the common mode: differences between the two members cancel it.

| Initial history | Asymmetry in the decades starting at $1$, $10^{-1}$, …, $10^{-5}$ of the starting separation | Exponent fitted from $10^{-2}$ to $10^{-5}$ | Largest $\lvert\rho-1\rvert$ | Largest delay ratio |
| --- | --- | --- | --- | --- |
| one arm 5% larger | $5.7\times10^{-2}$, $3.0\times10^{-3}$, $3.6\times10^{-5}$, $4.4\times10^{-7}$, $5.8\times10^{-9}$, $7.1\times10^{-11}$ | $1.908$ | $0.031$ | $1.306$ |
| one arm rotated $0.1$ rad | $9.5\times10^{-2}$, $1.8\times10^{-3}$, $3.0\times10^{-5}$, $4.2\times10^{-7}$, $3.8\times10^{-9}$, $5.7\times10^{-11}$ | $1.912$ | $0.078$ | $1.341$ |
| one arm wobbled $0.15$ | $0.29$, $5.2\times10^{-3}$, $5.4\times10^{-5}$, $8.1\times10^{-7}$, $2.9\times10^{-9}$, $4.9\times10^{-11}$ | $2.023$ | $0.068$ | $1.373$ |
| both arms wobbled differently $0.1$ | $0.31$, $1.3\times10^{-2}$, $2.2\times10^{-4}$, $2.9\times10^{-6}$, $2.0\times10^{-8}$, $3.1\times10^{-10}$ | $1.914$ | $0.118$ | $1.486$ |

The symmetric deviation, $\lvert(c_0+c_2)/2-c^\ast\rvert$, falls in the same runs to the instrument's floor of $6\times10^{-8}$. Below $10^{-5}$ of the starting separation the asymmetry stops falling at about $10^{-10}$, which is the instrument's resolution for differences.

## 5. What a proof would need

1. **Positions, or the constraint set.** Either add the constraint offsets $\mathbf C_0$, $\mathbf C_2$ to the state and prove contraction on $\mathbf C=0$, or use a formulation that contains positions. One candidate is the pair's midpoint and the two arm lengths relative to it. The study measured the midpoint's speed falling as the separation to the power $1.9$.
2. **A delayed-feedback estimate.** The antisymmetric sector is unstable without its memory, so the estimate must span at least the loop from $\rho$ through the window to $c$ and back through $\chi$. A Lyapunov functional over one history segment that weights $\varepsilon$, $\chi$ and the history of $a$ is the natural form. Its existence is suggested by the linear spectrum, whose slowest decay rate in this sector is $1.9084$, but it is not constructed here.
3. **The two perturbations of the variant itself.** These are the pointing error, of relative size $2\tau$, and the third member's row. They enter as forcing of the system above, as described in Section 5 of the delay-ratio record.

## 6. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The reduction of Section 2, its budget form and conservation of the constraint offset | Derived | An algebra error in Section 2; a direct two-pursuer simulation whose $c_i$, $\rho$, $\chi$ violate the reduced equations beyond discretization |
| The linearization reproduces the formal spectrum's non-symmetry roots in both sectors | Derived characteristic functions; roots located numerically in double precision | A root of the study's $D_\eta$ with real part up to $8$ missing here, or vice versa; `ccor-asym.json` |
| The extra pair at $\mu=-1\pm ik$ is the constraint offset | Inferred, from the conservation law, the scaling of a fixed offset and the root count | An eigenvector at that root that does not correspond to a constant offset |
| No contraction in the reduced variables; antisymmetric sector unstable without memory | Derived | A norm in the reduced variables in which the window map contracts (impossible if the offset mode is genuine) |
| Asymmetries decay in the nonlinear pursuit limit at exponents $1.91$ to $2.02$ | Measured; one instrument of this model family; four initial histories | A planar two-pursuer history near the spiral whose asymmetry does not decay; another integrator giving a different exponent |
| A proof for the asymmetric planar case | Not established | — |

## 7. Validation, files and review status

Command, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root (numpy and mpmath only):

```
python ccor_asym.py
```

Run on 2026-10-20 from 21:11:02 to 21:11:27 UTC (both times from the log). Receipt `ccor-asym.json`, log `ccor-asym.log`. The script reads the root table of `ccor-pursuit-spectrum.json` as its comparison and shares no code with it. Review status: self-review only.
