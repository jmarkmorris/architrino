# Blind bounded-angular tail refinement

**Derived conditional reference before a new D tail refinement subject.** Assume the same actual canonical coupled tail, complete speed bound $\beta<1$, $d=|Z|\to\infty$, $U=Z'\to0$, center velocity $C'\to c$, and bounded $H=Z\times U$. A limiting separation direction or a power-law rate is not assumed.

## The radial equation supplies the missing direction limit

The previously independently derived actual-clock row asymptotic holds uniformly in the instantaneous direction $N=Z/d$. Put $a=N\cdot c$ and $g=\sqrt{1-|c|^2+a^2}$. Then

$$
d''=\frac{|H|^2}{d^3}-\frac{2Kg}{d^2}+o(d^{-2}).
$$

Since $g$ stays bounded above and below by positive constants, eventually $d''$ is strictly negative and lies between two negative multiples of $d^{-2}$. Also $d'\to0$. Thus $d'>0$ eventually. Integrating the radial inequalities with $d$ as variable gives positive upper and lower multiples of $1/d$ for $(d')^2$. Hence $d\asymp t^{2/3}$ and $\int^\infty dt/d^2<\infty$.

The identity $N'=H\times N/d^2$ now makes $N$ converge to a unit vector $N_\infty$. Therefore $g\to g_\infty$, and a second radial integration gives

$$
(d')^2\sim\frac{4Kg_\infty}{d},\qquad
d^{3/2}\sim3\sqrt{Kg_\infty}\,t.
\tag{1}
$$

The earlier torque argument consequently applies without a separate direction-limit hypothesis: $(N_\infty\cdot c)(N_\infty\times c)=0$. This is still a conditional tail theorem, not a claim that an actual prepared member has zero relative terminal speed.

## A sharper actual affine-row remainder

For the next conclusion assume additionally $H\to H_\infty$. Write $q=d'$ and $U=qN+U_\perp$, with $U_\perp=H\times N/d=O(d^{-1})$. On each actual source interval of length $O(d)$, the relative separation changes by $O(\sqrt d)$ using (1), and thus remains comparable to current $d$. The exact canonical rows give individual acceleration $O(d^{-2})$ there. Integrating twice shows that the actual rows differ from instantaneous affine rows at the current source velocities by $O(d^{-3})$ in acceleration, hence $O(d^{-2})$ in torque. This is sharper than the earlier unrestricted $o(d^{-2})$ acceleration error.

For one affine source velocity $v=\alpha N+b$, $b\perp N$, let $g_v=\sqrt{1-|b|^2}$. Its dimensionless positive-receiver row vector is

$$
A(N,v)=(g_v-\alpha)N+(1-\alpha/g_v)b,
\qquad F_+=-KA/d^2.
$$

Use the actual current velocities $c(t)\mp(qN+U_\perp)/2$, where $c(t)=C'(t)$. If $U_\perp=0$, the two relative-row tangential contributions sum exactly to $-2[c(t)\cdot N]c_\perp(t)/g(t)$; all terms linear in $q$ cancel there. The radial relative contribution gains $qN$, which produces no torque. Reintroducing $U_\perp=O(d^{-1})$ and the actual-clock error therefore proves

$$
H'=\frac{2K}{d}\frac{c(t)\cdot N}{g(t)}N\times c(t)+O(d^{-2}).
\tag{2}
$$

The radial relative speed must be separated explicitly; bounding the whole $U=O(d^{-1/2})$ as an undirected affine error would obscure the needed logarithmic-order coefficient.

## Restrictions when the angular vector converges

Let $B=N_\infty\times c$ and $a_\infty=N_\infty\cdot c$. From $H\to H_\infty$ and (1),

$$
N-N_\infty=-\frac{H_\infty\times N_\infty}{\sqrt{Kg_\infty}\sqrt d}+o(d^{-1/2}).
\tag{3}
$$

Likewise the leading center row integrates to

$$
c(t)-c=-\frac{K(2a_\infty N_\infty-c)}{\sqrt{Kg_\infty}\sqrt d}+o(d^{-1/2}).
\tag{4}
$$

At either allowed alignment, (4) preserves its leading center direction and contributes no new first-order transverse coefficient to (2).

If $c\ne0$ is parallel to $N_\infty$, substituting (3) in (2) gives a nonzero positive multiple of $H_\infty d^{-3/2}$ unless $H_\infty=0$. Since $\int dt/d^{3/2}$ diverges logarithmically by (1), convergence of $H$ requires

$$
H_\infty=0\qquad(c\parallel N_\infty,\ c\ne0).
$$

If $c\ne0$ is perpendicular to $N_\infty$, the coefficient instead is a nonzero negative multiple of $(H_\infty\cdot B)B$. Therefore

$$
H_\infty\cdot(N_\infty\times c)=0
\qquad(c\perp N_\infty).
$$

Because $H_\infty\perp N_\infty$, this permits $H_\infty$ parallel to $c$ in three dimensions. In a planar pair it forces $H_\infty=0$. These are necessary restrictions on the full convergent-angular zero-speed tail, not evidence that nonmirror perturbations fail to disperse or that any actual preparation realizes such a tail.

Falsifiers are failure of source-window separation comparability, an unaccounted $q$ contribution to the transverse affine sum, an incorrect sign in (3), or a nonzero fixed logarithmic torque coefficient compatible with convergent $H$. No new history, numerical target or tail subject was used.
