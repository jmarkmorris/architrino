# Blind torque-growth reference for the selected logarithmic continuation

**Derived independently before disclosure of a new growth subject.** Assume the selected sufficiently small mirror-planar perturbation has the positive orientation and root lag proved in the [blind orientation reference](authorized-cases-ten-hour-reference-c-orientation.md), and conditionally has an all-future separated regular continuation with complete uniform speed bound $0<\beta<1$. Let $h_*>0$ be the minimum angular momentum on its compact initially sampled past. The future has increasing $h\ge h(0)\ge h_*$.

## Full-window radius and lag estimates

For any intermediate time $u\in[s(t),t]$, apply the triangle inequality to the two pieces of the causal window. Its entire path length is at most $\beta R$. The identities involving $x(s)+x(t)$ give

$$
\frac{1-\beta}{2}R\le r(u)\le\frac{1+\beta}{2}R.
\tag{1}
$$

For example, $R\le|x(s)-x(u)|+2r(u)+|x(t)-x(u)|\le\beta R+2r(u)$; the other direction follows by writing $2x(u)=[x(u)-x(s)]+[x(s)+x(t)]+[x(u)-x(t)]$. Thus this is a whole causal-window bound, not just endpoint radius comparability. With $k=(1+\beta)/(1-\beta)$, every sampled intermediate radius lies in $[r(t)/k,kr(t)]$.

The endpoint chord inequality $|x(t)-x(s)|\le\beta|x(t)+x(s)|$ also gives

$$
\cos\Delta\ge\frac{1-\beta^2}{1+\beta^2},\qquad
0<\Delta:=\theta(t)-\theta(s(t))\le2\arctan\beta<\frac\pi2.
\tag{2}
$$

The passage from cosine to the actual lag uses the independently proved unwrapped bound $0<\Delta<\pi$; a principal-angle identity alone would not justify it. Therefore $\sin\Delta\ge2\Delta/\pi$. Positivity of the sampled angular momentum and (1) give

$$
\Delta=\int_s^t\frac{h(u)}{r(u)^2}\,du
\ge\frac{h_*R}{k^2r(t)^2}
\ge\frac{2h_*}{(1+\beta)k^2r(t)}.
\tag{3}
$$

## Unbounded angular momentum and radius

The endpoint ratio $r_s/r\in[1/k,k]$, together with $R\le r+r_s$, implies $rr_s/R^2\ge(1-\beta^2)/4$: minimize $z/(1+z)^2$ over $z\in[1/k,k]$. Using $D\le1+\beta$, the exact torque and (2)–(3) give the conservative sufficient inequality

$$
h'=\frac{rr_s\sin\Delta}{R^2D}
\ge\frac{h_*}{\pi k^3r(t)}.
\tag{4}
$$

Since $r(t)\le r(0)+\beta t$, integration yields

$$
h(t)\ge h(0)+\frac{h_*}{\pi k^3\beta}
\log\left(1+\frac{\beta t}{r(0)}\right).
\tag{5}
$$

Thus bounded future angular momentum is impossible under these hypotheses. Moreover $h=r v_\theta\le\beta r$ gives $r(t)\ge h(t)/\beta\to\infty$. Recurrent returns to any fixed bounded-radius region and all-future bounded radius are therefore impossible as well. This is a derived conditional dispersal statement, not a proof that the departing family retains its required regularity and uniform margin.

The constants are sufficient, not optimal. The lower bound (4) uses only the fixed initially sampled minimum $h_*$, so it does not assume a comparison between current and delayed h beyond the proved positivity. No conclusion about a terminal Cartesian velocity, exact radial growth rate, asymptotic spiral or a selected singular endpoint follows. Falsifiers are an intermediate radius outside (1), a hidden full turn invalidating the use of (2), failure of the initial positive angular minimum or a sign error in the exact torque. No new subject or numerical target was used; no owned computation is active.
