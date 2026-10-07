# Blind explicit inward finite-event criterion

**Derived before the new explicit-inward subject is opened.** Keep the actual logarithmic family, positive angular orientation and acute lag. Let $a$ be a strict generated reception whose twice-sampled source is generated, $s(s(a))\ge0$. The following conservative criterion uses only the existing actual history and current radial velocity:

$$
p(a)\le-1+2^{-60}
\quad\Longrightarrow\quad
\text{a finite strict-domain unit endpoint occurs by }a+\frac{-p(a)r(a)}8.
\tag{1}
$$

No member is claimed to meet (1). The endpoint conclusion uses the previously accepted finite-endpoint alternative. The source-generation condition can be replaced by a separately checked acute positive-angle interval covering the same nested sources.

Suppose instead that the strict continuation lasts through the short interval in (1). Put $q=-p(a)$, $\eta=1-q\le2^{-60}$, $b=s(a)$, $L=a-b$ and $\alpha=r(a)/L$. The finite inward budget at $a$, whose only future assumption is that short interval, gives

$$
\frac{q^2\alpha^2}{128}\le1-|v(a)|^2\le1-q^2\le2\eta.
$$

Since $q\ge1/2$, $\alpha\le32\sqrt\eta\le2^{-25}$. The root equation gives $|r(b)/L-1|\le\alpha$.

Let $e_b=x(b)/r(b)$. The nonnegative inward-projection deficit on the complete generated arc satisfies

$$
\frac1L\int_b^a[1+v(u)\cdot e_b]du
=1+\frac{[x(a)-x(b)]\cdot e_b}{L}\le2\alpha.
$$

Choose $m\in[b+L/4,b+L/2]$ with $1+v(m)\cdot e_b\le8\alpha$. The exact fixed-projection argument on the acute arc says $v(u)\cdot(-e_b)$ increases for $m\le u\le a$. The unit ball therefore gives uniformly

$$
|v(u)+e_b|\le4\sqrt\alpha.
$$

At the last point, $|v(a)+e_a|\le\sqrt{2\eta}$, so $|e_a-e_b|\le\sqrt{2\eta}+4\sqrt\alpha$. The acute unwrapped angle is at most twice this chord distance, hence below $1/8$ with the displayed dyadic constants.

All accelerations from $m$ to $a$ now lie in the fixed cone used in the radial-margin proof, whose projection on its chosen bisector is at least one half. Thus

$$
\int_m^a|x''|du\le2|v(a)-v(m)|\le16\sqrt\alpha.
$$

The clock inequality $R'/R\ge-2|x''|$ gives $R(m)\le L\exp(32\sqrt\alpha)<2L$. The last strict bound can be checked without decimal constants: $32\sqrt\alpha<1/128$ and $e^x\le1/(1-x)$ for $0\le x<1$.

The chosen point obeys $r(m)\ge r(b)-(m-b)\ge L/4$. Its radial direction lies between $e_b$ and $e_a$, so the bounds above give $p(m)\le-1/2$. Also $1-|v(m)|^2\le16\alpha$. Its own short inward-budget interval has length at most $r(m)/8<L/4$, whereas $a-m\ge L/2$. That entire interval is already in the generated strict past before $a$; no second future-continuation assumption is needed.

Applying the finite inward budget at $m$ therefore yields

$$
1-|v(m)|^2\ge\frac{p(m)^2r(m)^2}{128R(m)^2}
\ge2^{-15}.
$$

But $16\alpha\le2^{-21}<2^{-15}$, a contradiction. Thus strict continuation cannot persist through the sole future interval at $a$, proving (1). All constants are deliberately conservative; no optimized threshold is claimed.

This quantitative criterion also supplies a uniform late inward radial exclusion for every infinite branch once its nested sources are generated. It does not supply a total-speed margin or a selected exit state. Falsifiers are an uncovered acute source interval, a wrong fixed-projection sign, a middle budget extending beyond $a$, or an incorrect dyadic inequality. The exact spiral has positive radial velocity and lies outside the trigger. No new history or numerical target was used.
