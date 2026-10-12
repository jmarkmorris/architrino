# The pursuit-limit spiral: uniqueness of its root, and a self-contained brief on its formal spectrum (ceiling-contact open research, problem 2)

**The equation behind this record is the field-speed ceiling variant, not the Master Equation**, and the object studied here is the *pursuit limit* of that variant's approaching pair: two points moving at wake speed, each aimed exactly at the other's causal image, with no third member. It is the formal limit identified in [Section 7 of the contact study](ceiling-contact-two-hour-2026-10-06.md#7-the-pursuit-limit-spiral-a-closed-form-comparison-and-its-formal-spectrum); it is a comparison for release C1 and not a solution of the variant. Nothing here adopts the variant or selects any contact rule or continuation.

This record closes obligation 2 of the study under the [launch brief](ceiling-contact-open-research-launch-brief.md) in two parts. Part A proves analytically that the spiral equation has exactly one root, replacing the sign scan the study relied on. Part B is a brief written for a reader outside this model family, from which the characteristic function of the spiral's linearization can be re-derived and its roots recounted without reading anything else; it reports the re-derivation made in this thread, which reproduced the study's formula and roots, and says plainly that no outside reader has yet checked it. Units: $c_f=1$.

## Part A. The spiral equation has exactly one root

**The spiral.** Write $s$ for the time remaining to coincidence and use complex notation in the plane of motion. The pursuit law for member 0, with partner member 2, is

$$
z_2(s+\tau)-z_0(s)+\tau\,z_0'(s)=0,\qquad \tau=\lVert z_2(s+\tau)-z_0(s)\rVert
$$

where $'$ is $d/ds$ and $s+\tau$ is the emission instant (earlier in time, so larger $s$). The first equation says the velocity $-z_0'$ (unit length, since $\tau$ equals the length of the image vector) points at the partner's image; the same law with the labels exchanged governs member 2. The self-similar antipodal solution $z_0=c\,s^{1+ik}$, $z_2=-z_0$, with $k=\tan\alpha$ and $c=\cos\alpha$ so that the speed is one, has $\tau=(\lambda-1)s$ for a constant $\lambda>1$, and substitution gives the single complex condition

$$
\lambda^{1+ik}+1=(\lambda-1)(1+ik)
$$

Its modulus gives $(\lambda-2)^2+k^2(\lambda-1)^2=\lambda^2$, that is $k^2=4/(\lambda-1)$; its argument, after dividing by $\lambda$, gives $\cos(k\ln\lambda)=1-2/\lambda$ and $\sin(k\ln\lambda)=k(\lambda-1)/\lambda>0$, so $k\ln\lambda=\arccos(1-2/\lambda)+2\pi m$ for an integer $m\ge0$ with the principal arccosine. With $k=2/\sqrt{\lambda-1}$ (the sign of $k$ is the chirality of the spiral and changes nothing below) this is

$$
\frac{2\ln\lambda}{\sqrt{\lambda-1}}=\arccos\!\left(1-\frac2\lambda\right)+2\pi m
$$

**Theorem (derived).** This equation has exactly one solution $\lambda>1$, and it has $m=0$.

*Proof.* Put $\lambda=1+u^2$ with $u>0$. Then $1-2/\lambda=(u^2-1)/(u^2+1)=\cos(2\operatorname{arccot}u)$, because $\cos2\beta=(1-\tan^2\beta)/(1+\tan^2\beta)$ with $\tan\beta=1/u$; and $2\operatorname{arccot}u\in(0,\pi)$, so the principal arccosine of $(u^2-1)/(u^2+1)$ is exactly $2\operatorname{arccot}u$. The left side is $2\ln(1+u^2)/u$. For $m\ge1$ there is no solution: $\ln(1+u^2)\le u$ for all $u\ge0$ (the difference $u-\ln(1+u^2)$ vanishes at $0$ and has derivative $(1-u)^2/(1+u^2)\ge0$), so the left side is at most $2<2\pi\le$ the right side. For $m=0$ the equation is $g(u)=0$ with

$$
g(u)=u\operatorname{arccot}u-\ln(1+u^2),\qquad g'(u)=\operatorname{arccot}u-\frac{3u}{1+u^2},\qquad g''(u)=\frac{2u^2-4}{(1+u^2)^2}
$$

So $g''<0$ on $(0,\sqrt2)$ and $g''>0$ on $(\sqrt2,\infty)$. At the ends, $g'(0^+)=\pi/2>0$, $g'(\sqrt2)=\operatorname{arccot}\sqrt2-\sqrt2<0$, and $g'(u)\to0$ from below as $u\to\infty$ (since $\operatorname{arccot}u=1/u-1/(3u^3)+\dots$ and $3u/(1+u^2)=3/u-3/u^3+\dots$, the difference is $-2/u+O(u^{-3})$). Hence $g'$ decreases strictly on $(0,\sqrt2)$ from a positive to a negative value and has exactly one zero $u_1$ there, and $g'$ increases strictly on $(\sqrt2,\infty)$ toward $0$ and is negative throughout. Therefore $g$ rises on $(0,u_1)$ from $g(0^+)=0$ to a positive maximum and falls strictly on $(u_1,\infty)$; as $u\to\infty$, $g(u)=1-2\ln u+O(u^{-2})\to-\infty$. So $g$ has exactly one zero $u^\ast$, which lies in $(u_1,\infty)$, and $\lambda^\ast=1+u^{\ast2}$ is the unique root. $\square$

Numerically $u_1=0.46$ and $u^\ast=1.124504516$, which is the study's $\sqrt{\lambda-1}$, with $\lambda^\ast=2.264510406$ and $k=2/u^\ast=1.778561110$; the constants in the study's table follow. The study's remark that other branches are unreachable because $2\ln\lambda/\sqrt{\lambda-1}\le1.61$ is replaced by the clean bound $2$ above. The substitution also exhibits the root as the unique solution of $\ln(1+u^2)=u\operatorname{arccot}u$, which is the form in which it is easiest to recompute.

## Part B. Brief for an outside reader: re-deriving the characteristic function and recounting its roots

This part assumes nothing from the rest of the repository. It defines the reduced system, states the spiral, derives its linearization in full, gives the characteristic function and the equation for out-of-plane displacements, lists the roots that symmetry forces and that must appear in any correct derivation, and describes a recount procedure. The numerical values at the end are what the recount should reproduce.

### B.1 The reduced system

Two points move in a plane at unit speed. Each point's velocity at time $t$ points at the *image* of the other: the place the other occupied at the earlier instant $S$ from which a signal travelling at unit speed reaches the first point's present position at $t$, so that $t-S$ equals the distance from the image to the receiver. Nothing else acts. In the time-to-coincidence variable $s$ (so $d/ds=-d/dt$) and with complex coordinates $z_0(s)$, $z_2(s)$:

$$
F_0(s):=z_2(s+\tau_0)-z_0(s)+\tau_0\,z_0'(s)=0,\qquad \tau_0=\lvert z_2(s+\tau_0)-z_0(s)\rvert
$$

and the same with $0\leftrightarrow2$. The modulus condition on $\tau_0$ makes $\lvert z_0'\rvert=1$ automatic.

### B.2 The spiral

$z_0=c\,s^{1+ik}$, $z_2=-z_0$, $c=1/\sqrt{1+k^2}$, $\tau_0=\tau_2=(\lambda-1)s$, where $\lambda$ and $k$ satisfy $\lambda^{1+ik}+1=(\lambda-1)(1+ik)$ (Part A). Write $\theta=k\ln\lambda$, the turn of the velocity over one delay; then $\cos\theta=1-2/\lambda$ and $\sin\theta=k(\lambda-1)/\lambda$. Set $Z=\lambda^{1+ik}$, so $Z+1=(\lambda-1)(1+ik)$. Check that the spiral solves B.1: $z_2(\lambda s)-z_0(s)=-c\,s^{1+ik}(Z+1)$ and $\tau_0z_0'=c\,s^{1+ik}(\lambda-1)(1+ik)$; their sum vanishes, and $\lvert z_2(\lambda s)-z_0(s)\rvert=c\lvert Z+1\rvert s=c(\lambda-1)\sqrt{1+k^2}\,s=(\lambda-1)s$.

### B.3 Linearization

Perturb $z_j\mapsto z_j(1+\varepsilon\xi_j(s))$, $j=0,2$, with $\xi_j$ complex-valued, and $\tau_0\mapsto\tau_0+\varepsilon\,\delta\tau$. Write $u=z_2(s+\tau_0)-z_0(s)$ for the image vector. To first order,

$$
\delta u=z_2'(\lambda s)\,\delta\tau+z_2(\lambda s)\,\xi_2(\lambda s)-z_0(s)\,\xi_0(s)
$$

(the first term because the unperturbed emission point slides along the path when the delay changes). The causal condition $\tau_0^2=\lvert u\rvert^2$ gives $\delta\tau=\operatorname{Re}(\bar u\,\delta u)/\tau_0$, and on the spiral $u=-\tau_0z_0'(s)$, so $\delta\tau=-\operatorname{Re}\bigl(\overline{z_0'(s)}\,\delta u\bigr)$. Since $\delta u$ contains $\delta\tau$, solve: with $\operatorname{Re}(\overline{z_0'(s)}\,z_2'(\lambda s))=-\cos\theta$ (the two unit tangents make the angle $\pi-\theta$),

$$
(1-\cos\theta)\,\delta\tau=c^2s\,\operatorname{Re}\bigl((1-ik)\,[Z\xi_2(\lambda s)+\xi_0(s)]\bigr)
$$

using $\overline{z_0'}\,z_0=c^2(1-ik)s$ and $\overline{z_0'}\,z_2(\lambda s)=-c^2(1-ik)Zs$. Define $W_0=[Z\xi_2(\lambda s)+\xi_0(s)]/(1+ik)$; then $\operatorname{Re}((1-ik)(1+ik)W_0)=(1+k^2)\operatorname{Re}W_0$, and with $1-\cos\theta=2/\lambda$ and $c^2(1+k^2)=1$,

$$
\frac{\delta\tau}{s}=\frac\lambda2\operatorname{Re}W_0
$$

The variation of $F_0$ is $\delta u+\delta\tau\,z_0'+\tau_0(z_0\xi_0)'$. Divide by $z_0(s)=c\,s^{1+ik}$ and use $z_2'(\lambda s)/z_0=-(1+ik)\lambda^{ik}/s$, $z_0'/z_0=(1+ik)/s$, $z_2(\lambda s)/z_0=-Z$, $\tau_0z_0'/z_0=Z+1$, $\tau_0z_0\xi_0'/z_0=(\lambda-1)s\xi_0'$:

$$
(1+ik)(1-\lambda^{ik})\frac{\delta\tau}{s}-Z\xi_2(\lambda s)+Z\xi_0(s)+(\lambda-1)s\xi_0'(s)=0
$$

Replace $-Z\xi_2(\lambda s)=-(1+ik)W_0+\xi_0$ and $1+Z=(\lambda-1)(1+ik)$, divide by $(\lambda-1)(1+ik)$, and insert $\delta\tau/s$:

$$
\xi_0+\frac{s\,\xi_0'}{1+ik}=\frac{1}{\lambda-1}\Bigl[W_0-\frac\lambda2\bigl(1-e^{i\theta}\bigr)\operatorname{Re}W_0\Bigr]
=\frac{i}{\lambda-1}\bigl[\operatorname{Im}W_0+\kappa\operatorname{Re}W_0\bigr],\qquad \kappa=\cot\frac\theta2
$$

where the last step uses $\frac\lambda2(1-\cos\theta)=1$ to cancel the real parts and $\frac\lambda2\sin\theta=\sin\theta/(1-\cos\theta)=\cot(\theta/2)$. The equation for $\xi_2$ is the same with the labels exchanged. This is a *real-linear* equation (it contains $\operatorname{Re}W_0$), autonomous in $\ln s$ and of delayed type toward $s=0$.

### B.4 Modes and the characteristic function

Because the equation is real-linear, a mode is $\xi_0=A\,s^{\mu}+\bar B\,s^{\bar\mu}$ with complex $A$, $B$, $\mu$; take the exchange-symmetric sector $\xi_2=\eta\xi_0$ with $\eta=+1$ or $-1$. Put $a=\eta\lambda^{1+ik+\mu}+1$ and $b=\eta\lambda^{1-ik+\mu}+1$ (so $\bar b$ with $\mu\to\bar\mu$ is the conjugate of $a$). Then $W_0=[Aa\,s^{\mu}+\bar B b\,s^{\bar\mu}]/(1+ik)$, and collecting the coefficients of $s^{\mu}$ in the equation and in its complex conjugate gives the linear system

$$
\Bigl[(1+ik+\mu)-\frac{a(1+i\kappa)}{2(\lambda-1)}\Bigr]A-\frac{b\,(i\kappa-1)}{2(\lambda-1)}\frac{1+ik}{1-ik}B=0,\qquad
\frac{a(1+i\kappa)}{2(\lambda-1)}\frac{1-ik}{1+ik}A+\Bigl[(1-ik+\mu)-\frac{b(1-i\kappa)}{2(\lambda-1)}\Bigr]B=0
$$

whose determinant, after the cross terms cancel exactly, is the entire function

$$
D_\eta(\mu)=(1+ik+\mu)(1-ik+\mu)-\frac{(1+i\kappa)\,a\,(1-ik+\mu)+(1-i\kappa)\,b\,(1+ik+\mu)}{2(\lambda-1)}
$$

This equals the study's expression written with $i(\kappa-i)=1+i\kappa$ and $-i(\kappa+i)=1-i\kappa$. A mode shrinks relative to the spiral as $s\to0$ exactly when $\operatorname{Re}\mu>0$.

**Out of plane.** A displacement $\zeta_j(s)$ normal to the plane enters the vector form of B.1 only through its own component at first order, because $\lvert u\rvert$ changes at second order in $\zeta$: $\zeta_2(\lambda s)-\zeta_0(s)+(\lambda-1)s\,\zeta_0'(s)=0$. With $\zeta_j=C_js^{\nu}$ and $\zeta_2=\eta\zeta_0$: $O_\eta(\nu)=\eta\lambda^{\nu}-1+\nu(\lambda-1)=0$. The spiral's own scale is $s$, so the tilt shrinks relative to it when $\operatorname{Re}\nu>1$.

### B.5 Roots forced by symmetry (checks that any derivation must pass)

The reduced system is invariant under rotation of the plane, under translation of the plane, under a shift of the coincidence instant, and, in three dimensions, under translation and tilt of the plane. Each invariance is an exact family of solutions and therefore an exact root with an explicit mode:

| Invariance | Sector | Root | Mode |
| --- | --- | --- | --- |
| rotation $z\mapsto e^{i\phi}z$ | $\eta=+1$ | $\mu=0$ | $\xi_j=i\phi$ |
| shift of coincidence time $s\mapsto s+s_0$ | $\eta=+1$ | $\mu=-1$ | $\xi_j=(1+ik)s_0/s$ |
| translation of the centre | $\eta=-1$ | $\mu=-1\mp ik$ | $\xi_0=z_\text{shift}/z_0\propto s^{-1-ik}$ |
| translation out of plane | $\eta=+1$ | $\nu=0$ | $\zeta_j=$ const |
| tilt of the plane | $\eta=-1$ | $\nu=1\pm ik$ | $\zeta_j\propto\operatorname{Re}$ or $\operatorname{Im}z_j$ |

$D_{+1}(0)=D_{+1}(-1)=0$, $D_{-1}(-1\mp ik)=0$, $O_{+1}(0)=0$, $O_{-1}(1\pm ik)=0$ exactly; and $D_{-1}(0)$, $D_{+1}(-1-ik)$, $O_{+1}(1+ik)$ must *not* vanish. A derivation that fails any of these is wrong.

### B.6 Recount procedure

1. Compute $u^\ast$ from $\ln(1+u^2)=u\operatorname{arccot}u$ (Part A), then $\lambda=1+u^{\ast2}$, $k=2/u^\ast$, $\theta=k\ln\lambda$, $\kappa=\cot(\theta/2)$.
2. Assert the seven symmetry roots and the three negative controls of B.5 to rounding.
3. Count zeros of $D_\eta$ on the rectangle $-12\le\operatorname{Re}\mu\le0.3$, $\lvert\operatorname{Im}\mu\rvert\le14$ by the argument principle (the winding of $D_\eta$ along the boundary, sampled finely enough that no phase step exceeds, say, $0.3$ rad), for $\eta=\pm1$; likewise $O_\eta$ on $-4\le\operatorname{Re}\nu\le1.3$, $\lvert\operatorname{Im}\nu\rvert\le10$. The study showed by a size estimate that any root with $\operatorname{Re}\mu\le0.3$ lies within these boxes.
4. Locate the roots by Newton iteration from a grid and list those with real part up to $8$.
5. Nonlinear check of the linearization: take a non-symmetry root $\mu$, solve the $2\times2$ system for $(A,B)$, build $z_j(1+\varepsilon\xi_j)$ with $\xi_0=As^{\mu}+\bar Bs^{\bar\mu}$, $\xi_2=\eta\xi_0$, evaluate the exact residual $\lvert F_0(s)\rvert/(cs)$ of B.1 at $s=1$ for $\varepsilon=10^{-2},10^{-3},10^{-4}$; it must fall by a factor near $100$ per decade of $\varepsilon$, while for a non-root it falls by a factor near $10$.

### B.7 What the recount should reproduce (this thread's values, double precision)

| Sector | Zeros with $\operatorname{Re}\mu\le0.3$ (or $\operatorname{Re}\nu\le1.3$) | All roots found with real part up to $8$ |
| --- | --- | --- |
| in plane, $\eta=+1$ | $2.000$: $\mu=-1$, $\mu=0$ | $-1$; $0$; $1.359982\pm4.872282\,i$; $2.477030\pm13.017620\,i$ |
| in plane, $\eta=-1$ | $2.000$: $\mu=-1\mp1.778561\,i$ | $-1\pm1.778561\,i$; $1.908403$; $2.057611\pm9.039890\,i$ |
| out of plane, $\eta=+1$ | $1.000$: $\nu=0$ | $0$; $2.404929\pm5.410692\,i$; $3.469276\pm13.207782\,i$ |
| out of plane, $\eta=-1$ | $2.000$: $\nu=1\pm1.778561\,i$ | $1\pm1.778561\,i$; $3.052788\pm9.317607\,i$ |

Largest phase step on any contour $6\times10^{-4}$. Residual test (step 5): at $\mu=1.359982+4.872282i$ ($\eta=+1$) the residual is $1.99\times10^{-4}$, $1.81\times10^{-6}$, $1.80\times10^{-8}$ at $\varepsilon=10^{-2},10^{-3},10^{-4}$ (ratios $110$, $101$); at $\mu=1.908403$ ($\eta=-1$) it is $2.11\times10^{-3}$, $2.27\times10^{-5}$, $2.29\times10^{-7}$ (ratios $93$, $99$); at the non-root $\mu=0.7+0.3i$ the ratio is $9.95$; at the symmetry roots the residual is $8\times10^{-11}$ for every $\varepsilon$, as it must be for an exact solution.

**Conclusion of Part B, and its limit.** Every perturbation of the pursuit-limit spiral other than a relabeling decays relative to it at least as $s^{1.36}$ (in plane, symmetric), $s^{1.91}$ (in plane, antisymmetric), $s^{2.40-1}$ relative tilt (out of plane, symmetric) and $s^{3.05-1}$ (out of plane, antisymmetric). This is a statement about the formal linearization of the reduced system. It is not a nonlinear stability theorem for the reduced system (a nonlinear theorem in the planar symmetric sector is given in the [delay-ratio record](ceiling-contact-open-research-delay-ratio-bound-2026-10-11.md)), and it says nothing about the pointing error or the third member of the variant.

## Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The spiral equation has exactly one root, with $m=0$ | Derived (Part A) | An error in the sign analysis of $g'$; a second zero of $g$ found numerically |
| $D_\eta(\mu)$ and $O_\eta(\nu)$ as stated | Derived in this thread, independently of the study's derivation, and agreeing with it; symmetry roots and negative controls asserted; non-symmetry modes verified against the exact law to second order | A symmetry root that fails, or a non-symmetry root at which the exact residual does not fall as $\varepsilon^2$; `ccor_pursuit_spectrum.py` |
| Root counts and values of B.7 | Derived characteristic function; roots counted and located numerically in double precision | A phase step above $0.3$ on a refined contour, or a root in a box not in the table; `ccor-pursuit-spectrum.json` |
| Outside-reader check | Not supplied: no reader outside this model family has re-derived or recounted; this brief is the material for one | A re-derivation by such a reader giving a different $D_\eta$ or different counts |

## Validation, files and review status

Command, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root (numpy and mpmath only):

```
python ccor_pursuit_spectrum.py
```

Receipt `ccor-pursuit-spectrum.json` and log. The script shares no code with the study's `ccth_spectrum.py`. Review status: self-review. The derivation of B.3 and B.4 was carried out by hand in this thread before the code was written and reproduces the study's formula; both are by the same model family. No human and no reader of another family has reviewed Part A or Part B.
