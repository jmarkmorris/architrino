# An upper bound on the outermost subfield radius ratio

## Result and assumptions

Claim grade: derived, pending independent review. Under the fixed logarithmic inverse-distance equation with $K_{\log}=c_f=1$, unchanged transmitter weighting, all ordinary positive-delay roots and no ceiling, an exact circular configuration of three persistent neutral antipodal pairs with common center and angular rate cannot have

$$
r_1=1<r_2<r_3,\qquad r_3\ge400,\qquad |\omega|r_3<1.
$$

All relative phases are allowed. The six complete paths are $X_{a,\sigma}(t)=\sigma r_a e^{i(\omega t+\phi_a)}$ for every real time, with unit polarity $q_{a,\sigma}=\sigma$ and fixed pair identity. The [equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) remains unchanged. Radius normalization is a scale gauge, so four hundred is a ratio, not a selected physical length.

The contradiction has two parts. A distant outer pair first forces the two inner pairs close together. Then one inner receiver has a single large contribution from its nearby cross-pair source, while its four other received contributions remain too small to cancel it. Thus the near-coincidence required by the scalar contraction cannot satisfy the full vector equation. This is a continuous exclusion, not a finite search result. The numerical bound is deliberately conservative and is not claimed sharp.

## Previously checked inequalities and the forced separation

Write $u=|\omega|$ and $s=r_3\ge400$. Strict subfield speed and positive present separation give exactly thirty ordinary partner roots and no positive-delay self roots, as reconstructed in the [large-radius review](overnight-c-large-radius-independent-review.md#complete-root-census-without-a-compact-radius-bound). Reflection permits using $u\ge0$ in the estimates.

The [separated-radius review](overnight-c-separated-radius-independent-review.md) proves that $r_2\ge6$ and $r_3\ge30$ are excluded. Therefore any hypothetical configuration in the present domain must have $r_2<6$. Apply the [independently checked inner-separation inequality](overnight-c-distant-outer-independent-review.md) with the fixed value $M=6$:

$$
d\le\frac{12M^2}{(s-M)(2-H_M(s))},\qquad
H_M(s)=\frac{6M^2+8Ms}{(s-M)^2}+\frac{4M^2}{s^2},
$$

provided $H_M(s)<2$. Here $d$ is the minimum present separation among the four inner members. The derivative of the first term in $H_M$ is

$$
\frac{d}{ds}\frac{6M^2+8Ms}{(s-M)^2}
=-\frac{8Ms+20M^2}{(s-M)^3}<0,
$$

and the last term also decreases. Hence $H_M$ decreases for $s>M$. Once $H_M<2$, both positive factors in $(s-M)(2-H_M(s))$ increase, so the displayed upper bound on $d$ decreases with $s$.

At $S=400$ and $M=6$, exact rational values are

$$
H_6(S)=\frac{48889281}{388090000}<2,\qquad
\delta=\frac{432}{(S-6)(2-H_6(S))}
=\frac{425520000}{727290719}<1.
$$

Thus every hypothetical exact configuration with $s\ge S$ must have $d\le\delta$. The inner same-pair separations are two and $2r_2>2$, so this minimum is a cross-pair separation. By the antipodal symmetry, one of the two endpoints in the radius-$r_2$ pair lies at distance $d$ from the positive radius-one receiver. The other endpoint of that same pair lies at present distance at least $2-d$, by the triangle inequality applied to twice the receiver position.

## Lower bound for the one nearby contribution

The nearby source speed is $u r_2\le M/S=:v$. Put $v=3/200$ and $U=1/S=1/400$. For a present source-receiver distance $d$ and source speed at most $v<1$, the causal delay obeys

$$
\tau\le d+v\tau,
\qquad\text{so}\qquad \tau\le\frac{d}{1-v}.
$$

The actual source factor obeys $0<D\le1+v$. A unit-polarity logarithmic row has vector magnitude $1/(\tau D)$; its polarity affects direction but not magnitude. Therefore the nearby contribution $A_{\mathrm{near}}$ satisfies

$$
|A_{\mathrm{near}}|
\ge\frac{1-v}{(1+v)d}
\ge\frac{1-v}{(1+v)\delta}
=\frac{727290719}{438480000}.
$$

There is exactly one such contribution. The opposite endpoint of the radius-$r_2$ pair is separated from this receiver by at least $2-d>1$, and the ordinary subfield census gives one hit per source, so no extra nearby or self sheet is available to cancel it.

## Upper bound for all other contributions and the required acceleration

The negative radius-one partner is exactly antipodal. Its causal source factor is $D_0=1+u\sin(u\tau_0/2)\ge1$. Its delay obeys $\tau_0\ge2/(1+u)$, so its row norm is at most $(1+u)/2\le(1+U)/2$.

For the other radius-$r_2$ endpoint, the present distance is at least $2-d\ge2-\delta$. A source speed bounded by $v$ gives $\tau\ge(2-\delta)/(1+v)$ and $D\ge1-v$. Hence its row norm is at most

$$
\frac{1+v}{(1-v)(2-\delta)}.
$$

Each of the two radius-$s$ sources has delayed distance at least $s-1$. The circle-height estimate at the radius-one receiver gives $D\ge1-u\ge1-1/s$. Their total row norms are therefore at most $2s/(s-1)^2$. This expression decreases for $s>1$, so it is bounded by $2S/(S-1)^2$. This bound retains the actual outer contributions even when their full speeds approach one from below.

Circular kinematics requires the total received vector to have norm $u^2\le U^2$. The triangle inequality applied to that full equation would require

$$
|A_{\mathrm{near}}|
\le |A_{\mathrm{own}}|+|A_{\mathrm{far}}|
+|A_{\mathrm{outer},+}|+|A_{\mathrm{outer},-}|+u^2.
$$

The entire right side has the uniform upper bound

$$
R=\frac{1+U}{2}
+\frac{1+v}{(1-v)(2-\delta)}
+\frac{2S}{(S-1)^2}+U^2
=\frac{3187534568705719565843}{2581923133458758880000}.
$$

But exact rational subtraction gives the strict contradiction

$$
\frac{727290719}{438480000}-R
=\frac{95265590168624957827777}{224627312610912022560000}>0.
$$

The positive margin is approximately $0.4241$ in the normalized acceleration units. The nearby contribution already exceeds all possible cancellation and the prescribed circular acceleration. Therefore no full-vector exact circular configuration exists in the stated domain.

## Consequences and evidence boundary

Any exact strictly subfield configuration in this ordered unequal-radius class must have $r_3<400$, in addition to the preceding necessary radius condition. This removes the hypothetical unbounded-radius escape route entirely. It does not establish compactness of the remaining ordinary parameter domain: radius collisions and the wake-speed boundary remain excluded endpoints that can still be approached. It also does not prove existence or nonexistence within the remaining region, address superfield histories, or authorize motion through coincidence.

Known-first shared-venv rational arithmetic checked $3/5\div(2/5)=3/2$ before evaluating $H_6(S)$, $\delta$, the nearby lower bound, the cancellation upper bound and the displayed margin. The theorem is frozen pending independent reconstruction. Its premises are the separately reviewed finite inequalities, not the numerical searches or partial interval cover. Falsifiers are a wrong root census, failure of either delay bound, an omitted cancellation contribution, an incorrect antipodal or circle-height factor bound, a failed monotonicity step, wrong exact arithmetic, or an exact circular configuration in the displayed domain.
