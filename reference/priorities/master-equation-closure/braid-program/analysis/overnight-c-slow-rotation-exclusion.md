# A continuous slow-rotation exclusion for three unequal neutral binaries

## Statement and scope

Claim grade: derived, pending independent review. Under the authorized logarithmic equation with $K_{\log}=c_f=1$, three neutral antipodal circular pairs with common center and angular rate cannot form an exact complete history when

$$
r_1=1,\qquad r_2\in[6/5,7/5],\qquad r_3\in[8/5,9/5],
\qquad 0\le |\omega|\le9/1000.
$$

Both relative phases are arbitrary. The claim is continuous over these radii, phases and angular rates; it is not a finite sample result. The radius normalization fixes the logarithmic scale gauge. In ungauged form the angular-rate condition is $|\omega|r_1/c_f\le9/1000$ and the two radius intervals are ratios to $r_1$. This theorem concerns a slow subset of the declared geometry, not all subfield speeds or superfield roots. No stability or evolution claim follows.

The complete paths and unchanged acceleration are

$$
X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)},\qquad q_{a,s}=s,
\qquad a=1,2,3,\quad s=\pm1,
$$

$$
A_i(t)=\sum_j\sum_{\tau>0:\ |X_i(t)-X_j(t-\tau)|=\tau}
q_iq_j\frac{X_i(t)-X_j(t-\tau)}{\tau^2|D_{ij}|},
\qquad D_{ij}=1-\mathbf n_{ij}\cdot\dot X_j(t-\tau).
$$

The histories extend to every past time. All ordinary positive-delay self and partner roots are retained. The speed ceiling, altered coefficients, receiver response and contact rules are absent. The [equation definition](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) owns this response. The [main report](overnight-c-logarithmic-braids-2026-10-06.md) gives its circular component reduction and initial higher-speed search chart.

## Complete root census

Let $v=|\omega|\max_a r_a$. Throughout this domain, $v\le81/5000<1$. Different pairs have present separation at least $1/5$ and each pair's antipodal endpoints have separation at least $2$. For a fixed receiver and source, the function $h(\tau)=|X_i(0)-X_j(-\tau)|-\tau$ is strictly decreasing at rate at least $1-v$ in the Lipschitz sense. For a partner it is positive at zero and negative after $r_a+r_b$, so it has exactly one positive root. For self it starts at zero and is negative at every positive delay. Thus the complete census consists of thirty directed partner hits and no positive-delay self hits. At every hit $D_{ij}\ge1-v>0$ and the delayed separation is positive. These arguments use entire circular histories and therefore apply at every reception time.

## Static identity

Write $x_i=X_i(0)$, $d_{ij}=|x_i-x_j|$, and define the comparison sum on these same present positions by

$$
A_i^0=\sum_{j\ne i}q_iq_j\frac{x_i-x_j}{d_{ij}^2}.
$$

This is the selected equation's stationary-source limit, used only as an algebraic comparison. It is not a replacement law for the moving histories. Pairing its two directed terms gives the exact identity

$$
V_0:=\sum_i x_i\cdot A_i^0
=\sum_{i<j}q_iq_j
=\frac{(\sum_iq_i)^2-\sum_iq_i^2}{2}
=-3.
$$

The final equality uses six unit polarities and neutrality. Neither pair phases nor radii enter this identity. In particular there is no separated static balance anywhere in this domain.

## Uniform bound on the delayed correction

Fix one directed hit and abbreviate $y=x_i-x_j$, $z=x_i-X_j(-\tau)$, and $v_j=|\omega|r_j$. Causality gives $|z|=\tau$, while bounded source speed gives $|z-y|\le v_j\tau$. The elementary inversion identity

$$
\left|\frac{z}{|z|^2}-\frac{y}{|y|^2}\right|
=\frac{|z-y|}{|z||y|}
$$

therefore bounds this difference by $v_j/d_{ij}$. The identity follows by squaring both sides and expanding the scalar products; it requires only nonzero $z$ and $y$. Since $1-v_j\le D_{ij}\le1+v_j$, the triangle inequality gives

$$
\left|\frac{z}{|z|^2D_{ij}}-\frac{y}{|y|^2}\right|
\le\frac{v_j}{(1-v_j)d_{ij}}+
\frac{v_j}{(1-v_j)d_{ij}}
=\frac{2v_j}{(1-v_j)d_{ij}}.
$$

The polarity product has absolute value one and does not affect this bound. Multiplying by $|x_i|=r_i$ and summing all thirty directed rows yields

$$
|V-V_0|\le E,
\qquad
E=\sum_{i\ne j}\frac{2|\omega|r_ir_j}{(1-|\omega|r_j)d_{ij}},
\qquad V=\sum_i x_i\cdot A_i.
$$

The two directed intrapair rows for pair $a$ contribute at most $2|\omega|r_a/(1-v)$. Between pairs $a<b$, there are eight directed rows. Each has $d_{ij}\ge r_b-r_a$, so their total contributes at most $16|\omega|r_ar_b/((1-v)(r_b-r_a))$. The rational radius bounds imply

$$
\sum_a r_a\le\frac{21}{5},\qquad
\frac{r_1r_2}{r_2-r_1}\le6,\qquad
\frac{r_1r_3}{r_3-r_1}\le\frac83,\qquad
\frac{r_2r_3}{r_3-r_2}\le\frac{56}{5}.
$$

For the last inequality, $ab/(b-a)$ increases with $a$ and decreases with $b$, so its maximum is attained at $a=7/5$, $b=8/5$. The first two ratios are likewise decreasing functions of their variable radius. Consequently

$$
E\le\frac{|\omega|}{1-(9/5)|\omega|}
\left[\frac{42}{5}+16\left(6+\frac83+\frac{56}{5}\right)\right]
=\frac{4894|\omega|}{15(1-(9/5)|\omega|)}.
$$

This estimate retains every partner contribution; no small-angle expansion, omitted remainder or sampled root count enters it.

## Contradiction with circular acceleration

Exact circular motion would give $A_i=-\omega^2x_i$ and hence $V=-\omega^2 I$, where

$$
I=\sum_i|x_i|^2=2(r_1^2+r_2^2+r_3^2)\le\frac{62}{5}.
$$

The correction bound then requires $3\le E+\omega^2I$. Both displayed upper bounds increase with $|\omega|$ throughout the selected interval. At its upper endpoint,

$$
E+\omega^2 I
\le\frac{14682}{4919}+\frac{2511}{2500000}
<3.
$$

The first rational is the delay-correction bound at $|\omega|=9/1000$; the second is the largest circular contribution there. The strict margin is

$$
3-\frac{14682}{4919}-\frac{2511}{2500000}
=\frac{175148391}{12297500000}>0.
$$

This contradicts the necessary circular identity and proves the stated exclusion. The exact rational arithmetic is independently replayable; a failed arithmetic identity, underestimated directed-row count, wrong source-speed correction bound, or an exact full-vector balance inside the stated box would falsify the theorem. Outside the bounded domain the displayed estimate may fail to decide anything, and no extrapolation is intended.

## Review boundary

This is an analytical derivation authored during C's assigned investigation. It is frozen for a separate review of the root coverage, vector inequality, multiplicities and exact constants. Numerical search results do not enter the proof. Shared queues, manuscript, scientific acceptance and corpus remain with the coordinator.
