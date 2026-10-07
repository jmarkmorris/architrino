# A quantitative small-gap requirement near equal-radius wake speed

## Statement and scope

**Derived claim, pending independent reconstruction:** any exact equal-radius three-neutral-antipodal-pair circular configuration with $11/12\le v<1$ must satisfy

$$
\frac{d_{\min}}a<4(1-v)^{3/2},
$$

where $a$ is the common radius and $d_{\min}$ is the minimum simultaneous member separation. The equation remains coefficient-one logarithmic reception with $K_{\log}=c_f=1$, unchanged transmitter factor and complete infinite circular histories. Positions are distinct; all thirty directed partner roots and zero positive self roots are retained. The result supplies a necessary phase–speed restriction, not an exact reference or a stability claim.

Together with the already independently reconstructed positive separation floor after setting $a=1$, this gives an explicit gap below wake speed for every possible exact equal-radius configuration. The [wake-boundary exclusion](overnight2-c-equal-radius-wake-exclusion.md) handles $v=1$ separately. The present proof does not assume a uniform convexity property that fails for $v<1$.

## Where convexity becomes valid

Use the [checked complete angle chart](overnight2-c-equal-radius-chart-independent-review.md), and put $c=\cos(\alpha/2)$, $s=\sin(\alpha/2)$ and $D=1-vc$. Direct differentiation gives

$$
R_v''(\beta)=-\frac{v(c+2vc^2-3v)}{4D^5}.
$$

For $0<v<1$, the positive zero of the numerator polynomial is

$$
c_*(v)=\frac{\sqrt{1+24v^2}-1}{4v}\in(0,1).
$$

The other zero lies below $-1$ for $v<1$, since $\sqrt{1+24v^2}>4v-1$ (automatic if the right side is negative, otherwise by squaring). Consequently $R_v''>0$ whenever $c<c_*$. Define

$$
\alpha_*=2\arccos c_*,\qquad
b_*=H_v(\alpha_*)=\alpha_*-2v\sin(\alpha_*/2)>0.
$$

The strict monotonicity of $H_v$ makes $R_v$ strictly convex for $\beta>b_*$. Thus $P_v(x)=R_v(x)-R_v(x+\pi)$ is strictly decreasing for $x\ge b_*$ within $(0,\pi)$: its derivative is the negative integral of $R_v''$ from $x$ to $x+\pi$, strictly negative even at $x=b_*$. If $b_*\ge\pi$, the later assertion that all gaps exceed it is impossible and the small-gap alternative is immediate; the high-speed bound below in fact places $b_*<\pi$.

By the independently reconstructed polarity-order theorem, exact configurations must alternate. Write their complementary positive gaps as $x_i>0$, with $\sum x_i=\pi$. The [gap reduction](overnight2-c-alternating-gap-independent-review.md) gives

$$
P_v(\pi-x_{i-1})-P_v(x_i)=R_v(\pi)-2v^2.
$$

Suppose every $x_i\ge b_*$. Then $\pi-x_i$ is the sum of the other two gaps, also at least $b_*$, so every argument and intervening comparison interval lies in the strictly decreasing domain of $P_v$. Comparing receiver equations reverses predecessor/successor order. Composing that reversal around the three-cycle forces $x_1=x_2=x_3=\pi/3$, exactly as in the wake-boundary proof. This statement uses only the values on the proposed orbit; it does not assume an inverse outside the actual range.

## Uniform radial failure of the regular case at high speed

For the regular alternating hexagon, let $R_k=R_v(k\pi/3)$. Its complete dimensionless radial sum is

$$
2aA_r=-R_1+(R_2-R_3)+(R_4-R_5)>-R_1.
$$

For $v\ge11/12$, the elementary bounds $\sin(3\pi/8)>9/10$ and $\pi<22/7$ give

$$
H_v(3\pi/4)-\pi/3
=5\pi/12-2v\sin(3\pi/8)
<55/42-33/20<0.
$$

The sine bound follows by squaring from $\sin^2(3\pi/8)=(2+\sqrt2)/4>17/20>81/100$, using $\sqrt2>7/5$. Similarly $\cos^2(3\pi/8)=(2-\sqrt2)/4<3/20<4/25$, so $\cos(3\pi/8)<2/5$. Therefore the first partner emission angle exceeds $3\pi/4$, and

$$
R_1<\frac1{1-2v/5}\le\frac53.
$$

Consequently $2aA_r>-5/3$, while circular balance requires $-2v^2\le-121/72<-5/3$. The dimensionless radial mismatch is greater than $1/72$. This contradicts regular-case exactness throughout $11/12\le v\le1$, without invoking a tangential result.

An exact alternating configuration in the stated high-speed range must therefore have some $x_i<b_*$. That complementary gap is a clockwise separation between distinct opposite-polarity endpoints, giving

$$
d_{\min}/a\le2\sin(x_i/2)<x_i<b_*.
$$

## A simple power bound for the exceptional angular strip

Set $e=1-v>0$ and $t=1-c_*>0$. Substituting $c_*=1-t$ in its quadratic equation gives

$$
e=t(1+4v-2vt)\ge t(1+2v),\qquad t\le\frac{6e}{17},
$$

where $0<t<1$ and $v\ge11/12$ were used. For $\theta=\arccos(1-t)\in(0,\pi/2)$, the concavity bound $\sin(\theta/2)\ge\theta/\pi$ gives $t=2\sin^2(\theta/2)\ge2\theta^2/\pi^2$. Since $\alpha_*=2\theta$ and $\pi^2<10$,

$$
\alpha_*^2\le2\pi^2t<\frac{120}{17}e.
$$

The elementary sine lower bound $\sin z\ge z-z^3/6$ then yields

$$
b_*\le e\alpha_*+\frac{v\alpha_*^3}{24}
\le\alpha_*\left(e+\frac{\alpha_*^2}{24}\right)
<\frac{22}{17}\sqrt{\frac{120}{17}}\,e^{3/2}
<4e^{3/2}.
$$

The last exact rational comparison is $22^2\cdot120=58080<16\cdot17^3=78608$. Combining the previous inequalities proves the claimed small-separation requirement. These arithmetic comparisons are hand-derived controls; no numerical target instrument was used.

## Explicit speed gap from an existing separation theorem

Normalize $a=1$ by the already selected logarithmic scale covariance. The [constructive separation theorem](overnight2-c-explicit-global-separation.md) and [independent reconstruction](overnight2-c-explicit-separation-independent-review.md) apply to distinct complete circular three-pair configurations with minimum radius one and maximum radius at most $R$, not only strictly unequal radii. Thus their explicit separation floor $\delta$ at $R=35$ is available here without a new numerical evaluation. Define

$$
\gamma=\min\left\{\frac1{12},\left(\frac\delta4\right)^{2/3}\right\}>0.
$$

Every exact equal-radius strictly subfield configuration obeys $v<1-\gamma$. Indeed, for $v\ge11/12$, the proved bounds $\delta\le d_{\min}<4(1-v)^{3/2}$ imply $1-v>(\delta/4)^{2/3}\ge\gamma$. For $v<11/12$, the same conclusion follows from $1-v>1/12\ge\gamma$. Together with the separately proved exclusion at $v=1$, this removes a whole explicit speed layer at the equal-radius boundary. The bound is extremely weak; no practical cover size or computed decimal value of $\gamma$ is asserted.

## Limits and falsifiers

The joint radial–tangential problem remains unresolved at intermediate speeds and for unequal radii. Near-coincident phases may defeat global radial convexity below the derived layer, which is why the conditional convexity and existing separation theorem are both needed. A defect in the curvature polynomial, the gap-to-partner identification, strict order reversal, high-speed regular-case inequality or applicability of the separation floor would overturn the corresponding conclusion. All numerical constants are exact rational choices; coupling, wake speed and histories are unchanged.

Independent reconstruction of this frozen proof is required before the new speed gap is reported as checked. The allocation retains its original 03:25:15 UTC start, 13:55:15 UTC exploration stop and 15:25:15 UTC hard deadline. No grid, optimizer, interval cover or new background calculation was launched.
