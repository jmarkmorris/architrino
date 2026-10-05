# A compatible planar finite-width preparation reaches unit speed

This is a new explicit preparation for each of the four selected finite-width laws, not a replacement for the original incoming collinear preparations. Set $c_f=K_{ij}=1$, retain both self and opposite-polarity partner channels, and take independently $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$. The complete equation is

$$
X_i''(t)=\sum_j\sigma_{ij}\int_{-\infty}^t
\frac{X_i(t)-X_j(s)}{(|X_i(t)-X_j(s)|^2+\rho^2)^{3/2}}
\delta_h(|X_i(t)-X_j(s)|-t+s)\,ds,
\quad
\delta_h(g)=\frac{(1-|g|/h)_+}{h},
$$

where $\sigma_{ii}=1$ and $\sigma_{ij}=-1$ for the distinct labels. Every source time in this integral is included; there is no source-root selector or zero-self convention.

## Frozen complete preparation

Let $e_x,e_y$ be orthogonal unit vectors in the plane. Fix

$$
R=100,\qquad b=\frac12,\qquad \delta=2^{-24},\qquad C=2^{14}.
$$

For a vector $A$ in the closed Euclidean ball $|A|\le C$, prescribe

$$
X_A(s)=R e_x+b s e_y+\frac{(s+\delta)_+^3}{6\delta}A\quad(s\le0),
\qquad X_-(s)=-X_A(s).
$$

The positive-part term vanishes on the entire affine tail $s\le-\delta$. The affine tail is tangential to the release separation direction before the small compatibility patch; the resulting release need not have exactly zero radial velocity. The supplied history is $C^{2,1}$, with acceleration zero at the patch's left join and $X_A''(0)=A$. Define $\mathcal F(A)$ as the complete acceleration integral of the positive member at zero for these histories. The preparation selects the unique fixed point $A=\mathcal F(A)$, without changing any coefficient of the law.

The dimension-independent bounds already derived for the complete width functional are, per channel,

$$
B=\frac4{3\sqrt3\rho^2}+\frac2{h^2},\qquad
L=\frac2{\rho^3}+\frac4{3\sqrt3h\rho^2}+\frac4{h^3}.
$$

They imply $2B<C$ and $L<2^{20}$ for all four fixed pairs. The second bound controls variation in the displacement argument after integration over the complete age domain. Changing $A$ by $\Delta A$ changes each history position by at most $\delta^2|\Delta A|/6$. Hence each channel displacement changes by at most $\delta^2|\Delta A|/3$, and

$$
|\mathcal F(A)-\mathcal F(\widetilde A)|
\le \frac{2L\delta^2}{3}|A-\widetilde A|<\frac12|A-\widetilde A|.
$$

The map takes the ball into itself, so contraction proves exact acceleration compatibility and uniqueness. Every candidate history obeys

$$
|V(s)|\le\frac12+\frac{C\delta}{2}=\frac12+\frac1{2048}<1,
\qquad V_y(s)\ge\frac12-\frac1{2048}>\frac{49}{100}.
$$

The mirror pair has a unique global forward continuation by the complete-past Volterra theorem; this theorem applies in the plane with the same bounds. Mirror symmetry persists by uniqueness.

## Complete source bounds

Consider the positive member for $0\le t\le1$ before its first unit-speed event. Its present horizontal coordinate satisfies

$$
X_x(t)\ge100-\frac{C\delta^2}{6}-t>98.
$$

For a partner source in the patch or generated future, its horizontal coordinate is $-X_x(s)<-98$, including all $s\in[-\delta,t]$. The corresponding displacement has length greater than $196$, while its age is at most $1+\delta$. Consequently its reception gap is greater than $h$: every such source is rigorously outside the triangular window. All admitted partner sources therefore belong to the complete affine tail, where $X_-(s)=-100e_x-bs e_y$.

On that tail every partner range is greater than $198$, since its horizontal displacement is $X_x(t)+100>198$. Its source gap derivative satisfies

$$
\frac{d}{ds}\bigl(|X(t)-X_-(s)|-t+s\bigr)
=1-n\mathbin{\cdot}V_-(s)\ge1-b=\frac12.
$$

As $s\to-\infty$ the gap tends to $-\infty$; at $s=-\delta$ it exceeds $h$. Thus the entire triangular gap window lies in this single monotone affine-tail band. Changing variable to the gap, retaining its full interval, gives

$$
|A_{\rm partner}(t)|
\le \frac{1}{198^2(1-b)}=\frac2{198^2}<\frac1{1000}.
$$

This proves both complete source support and a bound on every component of the partner input. It does not assume the future source clock is monotone. The same argument holds at release for every candidate preparation, before its fixed point is selected.

For the self channel, suppose the complete path up to $t$ satisfies $|V|\le1$ and $V_y\ge q>0$. On every age $\tau\in[h/4,h/2]$, its self displacement $Z=X(t)-X(t-\tau)$ obeys

$$
Z_y\ge q\tau,\qquad |Z|\le\tau,\qquad
-\frac h2\le |Z|-\tau\le0,
\qquad \delta_h(|Z|-\tau)\ge\frac1{2h}.
$$

All other self contributions have nonnegative $y$ component because their displacement is the integral of a nonnegative longitudinal velocity over their whole source interval. Therefore this one fixed age strip supplies the lower bound

$$
A_{{\rm self},y}(t)
\ge \frac{q h}{32[(h/2)^2+\rho^2]^{3/2}}.
$$

Uniformly over the four pairs, $[(h/2)^2+\rho^2]^{3/2}<1/8192$ and $h\ge1/32$. For $q=49/100$, the right side is greater than $98/25$. After subtracting the complete partner bound, the total longitudinal acceleration is greater than $3$.

At release this estimate applies to every candidate $A$, since all their velocities have longitudinal component greater than $49/100$. In particular the compatible fixed point has $A_y>3$. Its selected cubic patch consequently has $V_y(s)\ge b=1/2$ on the entire complete supplied past, with $V_y(0)>1/2$.

## First unit event at positive separation

As long as future speed remains below one, the lower barrier $V_y\ge1/2$ is invariant. If a first crossing of this barrier were possible before time one, every prior longitudinal velocity would be at least one half, and the preceding complete-source bounds would give $V_y'>3$ at that crossing, a contradiction. The strict acceleration lower bound therefore persists until the first unit event or time one.

An all-subfield continuation through time $1/6$ would instead satisfy

$$
V_y(1/6)>\frac12+3\left(\frac16\right)=1,
$$

which is impossible. There is a finite first unit-speed event $t_*<1/6$. The present separation at that time obeys

$$
|X_+(t_*)-X_-(t_*)|=2|X(t_*)|
\ge 2X_x(t_*)
>200-\frac{C\delta^2}{3}-\frac13>199.
$$

Global continuation of the softened integral equation remains unique through this event. The theorem concerns an actual compatible coupled planar history reaching unit speed, rather than an imposed affine self-response. It does not claim a circular orbit, binding, a later escape rate, or a transverse norm-speed crossing. A strict speed-limited formulation encounters its boundary even at this large positive separation; the unrestricted finite-width law has no corresponding loss of existence.

> Grade: derived analytical preparation and event theorem, pending independent assessment of this frozen text. Falsifiers are failure of the complete-past displacement bounds, a compatible coefficient outside the contraction ball, an admitted partner source at or after the patch, or a subfield solution whose complete positive longitudinal history violates the displayed self lower bound. No numerical target instrument or evolution is used.
