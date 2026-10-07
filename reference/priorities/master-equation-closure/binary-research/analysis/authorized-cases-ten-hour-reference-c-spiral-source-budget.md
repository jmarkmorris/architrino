# Blind reference: inward speed budget and sampled transmitter degeneration

**Derived reference, frozen before the new inward-budget subject is opened.** Work on the same positive-angular, acute-lag logarithmic family. Let $w=t-s_0$, $r=|x|$, $p=r'$ and $E=|v|^2$. The source clock increases from $s_0$, so $R\le w$. The initial $r(0)<-s_0$ and unit speed give $0<r/w<1$ throughout any strict continuation. The exact radial projection and positive tangential acceleration imply

$$
p'\le\frac1r,\qquad E'\ge\frac{(-p)r}{w^2}\quad\text{when }p\le0. \tag{1}
$$

These estimates do not assume speed convergence or a uniform future speed margin.

## Finite inward interval

At a time $t$ with $p(t)=-q<0$, let $r_0=r(t)$, $w_0=w(t)$ and $\ell=qr_0/8$. If strict continuation lasts for this entire interval, unit speed gives $r\ge r_0/2$ and $w\le2w_0$. From $p'\le2/r_0$, its radial speed remains at most $-q/2$. Integrating (1) therefore gives

$$
E(t+\ell)-E(t)\ge\frac{q^2r_0^2}{128w_0^2}. \tag{2}
$$

For an all-future strict continuation this proves the necessary budget

$$
1-E(t)\ge\frac{p(t)^2r(t)^2}{128w(t)^2}\qquad(p(t)<0). \tag{3}
$$

Conversely, if the actual state satisfies $E(t)+p(t)^2r(t)^2/[128w(t)^2]>1$, strict continuation cannot last to $t+\ell$. The accepted finite-endpoint theorem for this family makes that a sufficient finite-unit-arrival criterion: positive radius and delay floors and earlier regular sources exclude a different finite strict-domain obstruction. This is an actual-state conditional criterion, not evidence that any chosen member meets it. Equality of the two sides is deliberately not used as a strict stopping test.

## Transmitter consequence

At a generated sampled time $s$, write $p_s=r'(s)$, $z_s=h(s)/r(s)>0$, $c_s=r(s)/(s-s_0)<1$, and let $\gamma\in(0,\pi/2)$ be the angle from the source radius to the chord. Then

$$
D=1+p_s\cos\gamma+z_s\sin\gamma.
$$

If $D<1$, necessarily $p_s<0$ and $D\ge1+p_s$, hence $-p_s\ge1-D$. Also $E_s\ge p_s^2\ge(1-D)^2$. Applying (3) at the source gives

$$
2D\ge1-E_s\ge\frac{(1-D)^2c_s^2}{128}. \tag{4}
$$

For $D\le1/2$, this implies $D\ge c_s^2/1024$; for larger $D$, the same lower bound follows from $c_s<1$. Therefore every all-future member has the explicit sampled-source bound

$$
D(t)\ge\frac1{1024}\left(\frac{r(s(t))}{s(t)-s_0}\right)^2
$$

once its sampled source is generated. In particular $D$ cannot approach zero while the sampled radius remains a fixed positive fraction of source elapsed time. Any sequence with $D\to0$ must have $r_s/(s-s_0)\to0$, $p_s\to-1$, $|v_s|\to1$ and $z_s\to0$. Its source times escape by the accepted clock theorem. The chord direction also approaches the outward source radial direction, since $D\ge1-\cos\gamma$ for $p_s\ge-1,z_s>0$.

These are necessary degeneration properties, not a proof that degeneration occurs or a uniform denominator floor without the radius hypothesis. The bound uses the actual earlier state rather than an invented comparison history. A violation of (3) is a finite-event sufficient condition; failure to violate it proves no all-future continuation. The exact spiral, with positive radial velocity and $D>1$, is a known consistency case outside the inward test. Falsifiers are a sign error in (1), insufficient interval persistence for (2), or an invalid source-frame inequality in (4). No numerical target or process was run.
