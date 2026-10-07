# Blind nonlinear common-center reference

**Derived reference, frozen before the new D nonlinear subject.** Keep the canonical opposite-polarity pair, $c_f=1$, fixed $K$, complete physical histories $X_\pm=C\pm x$ and a complete bound $|X_\pm'|\le\beta<1$. The statements below concern the exact partner rows at a fixed receiving time with simultaneous separation $d=2|x(t)|>0$. They do not establish actual historical membership or all-future dispersal. Locally $W^{2,\infty}$ histories suffice for the first bound.

## Complete homotopy and both clocks

For $-1\le\lambda\le1$ set $X_\pm^\lambda=\lambda C\pm x$. Its velocities are convex combinations of the original velocities and their negatives, so the same complete speed bound holds. Every partner clock is unique and ordinary, and every self root is excluded by the strict complete chord bound. The simultaneous separation remains $d$, while every sampled range satisfies

$$
\frac d{1+\beta}\le R_i^\lambda\le\frac d{1-\beta}.
$$

Let $\mathcal W$ contain all intervals $[s_i^\lambda,t]$ for both receivers and every $\lambda\in[-1,1]$. Write $M=\sup_{\mathcal W}|C'|$, $b=1-\beta$, and let $A_*$ bound both homotopy source accelerations on this union. Such a bound exists on the compact sampled intervals under the stated local regularity. A uniform complete source bound can replace it.

For either receiver, abbreviate its source velocity and acceleration by $V,A$, and write $D=1-n\cdot V$, $Q=I-nn^{\mathsf T}$, $\Delta=C(t)-C(s)$. Differentiating with respect to $\lambda$ at its actual moving clock gives, almost everywhere,

$$
\dot s=-\frac{n\cdot\Delta}{D},\qquad
\dot R=\frac{n\cdot\Delta}{D},\qquad
\dot n=\frac1R Q\left(I+\frac{Vn^{\mathsf T}}D\right)\Delta,
$$

$$
\dot V=C'(s)-A\frac{n\cdot\Delta}{D},\qquad
\dot D=-\dot n\cdot V-n\cdot\dot V.
$$

The dot here is parameter differentiation, not time differentiation. These identities keep both clocks; they require no artificial common delayed time. At points where the source acceleration has a jump, use the almost-everywhere formulas and the absolutely continuous parameter dependence of the sampled source velocity. In particular

$$
|\Delta|\le RM,\quad |\dot s|\le RM/b,\quad
|\dot n|\le M/b,\quad
|\dot D|\le M(1+RA_*)/b.
$$

The last inequality uses $1+\beta/b=1/b$. For the canonical partner contribution $f=-Kn/(R^2D)$, it follows that

$$
|\dot f|\le \frac{KM}{R^2b^3}(4+RA_*).
\tag{1}
$$

For an actual solution, the center acceleration is $(f_++f_-)/2$. At $\lambda=0$ the two rows cancel. Integrating (1) from zero to one and using the range comparison proves the exact conditional estimate

$$
|C''(t)|\le
\frac{K(1+\beta)^2}{d^2b^3}
\left(4+\frac{dA_*}{b}\right)
\sup_{\mathcal W}|C'|.
\tag{2}
$$

Alternatively replace $dA_*/b$ by the sharper supremum of $R_i^\lambda|A_i^\lambda(s_i^\lambda)|$. The bound is invariant under a constant center translation, and it vanishes for $C'=0$. It is a reduction in terms of the actual full sampled window, not a closed nonlinear stability estimate: the source acceleration bound and the size of that window still require control.

## Why evenness does not supply a quadratic estimate at a seam

Reflection combined with label exchange gives $f_+(-\lambda)=-f_-(\lambda)$. Thus the center row is odd and the relative row $(f_+-f_-)/2$ is even. Evenness alone does not imply a quadratic remainder for a locally Lipschitz row. An even function can have a nonzero $|\lambda|$ term.

The obstruction occurs directly at a source acceleration seam. Take a radial mirror source with velocity zero at its sampled seam $s_0$, and one-sided radial accelerations $a_-$ and $a_+$. Take a small common affine center velocity $m$ along that radial direction. At the symmetric clock of range $R$, the two source times move to $s_0\mp\lambda mR+O(\lambda^2m^2)$. The sampled mirror velocities are therefore $-a_-\lambda mR$ and $a_+\lambda mR$ for positive $\lambda m$. Their mean has the term $(a_+-a_-)|\lambda m|R/2$. In the two canonical denominators this produces the relative-row correction

$$
\frac{K(a_+-a_-)}{2R}|\lambda m|+O(\lambda^2m^2),
\tag{3}
$$

while the averaged first-order range terms cancel. Bounded local pieces can be continued to a complete strict-speed history; the example is a row regularity control, not a coupled solution or a replacement physical preparation. It demonstrates why a $W^{2,\infty}$ source acceleration jump prevents a general quadratic relative-row theorem. A release seam sampled by the homotopy is included in this obstruction.

A sufficient regularity package for a genuine second parameter derivative is source position $C^{2,1}$ on the whole homotopy sampled window: acceleration is Lipschitz and jerk exists essentially bounded. The second sampled-velocity derivative contains

$$
2C''(s)\dot s+A'(s)\dot s^2+A(s)\ddot s.
$$

Accordingly a bound quadratic solely in $M=\sup|C'|$ also needs control of $C''$ proportional to $M$, or a stronger center norm that includes a weighted $\sup|C''|$. Smoothness without such a uniform quantitative bound does not supply the requested constant. A direct bound naturally contains $M\sup|C''|$ and $M^2\sup|A'|$ in addition to the ordinary $M^2$ geometry terms. On a fixed direction scaled by an amplitude, all center derivatives scale with that amplitude, but the coefficient depends on their ratio to $M$.

Under those quantitative hypotheses the even relative row satisfies its ordinary integral second-derivative remainder, with the linear term zero. If a seam is crossed, either retain its explicit first-order seam contribution or prove an additional cancellation for that exact source. It cannot be removed by symmetry alone.

Falsifiers are an omitted source-clock variation, a sampled interval outside $\mathcal W$, a homotopy speed exceeding the complete bound, or a proposed quadratic estimate contradicted by (3). No new subject was read, no target computation was run, and no physical preparation was selected for this reference.
