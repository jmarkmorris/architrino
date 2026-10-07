# Independent review of the joint radial–tangential strip

## Verdict, controls and frozen domain

**Derived verdict: supported; no mathematical defect found.** In the stated closed strip $r_1=r_2=1$, $3\le b=r_3\le4$, $0\le\omega\le1/8$, $|\beta-\pi/2|\le1/100$ and arbitrary outer phase $\chi$, the joint four-component residual at the two positive inner receivers has Euclidean norm strictly greater than $1/500$. Consequently at least one radial or tangential component has absolute value strictly greater than $1/1000$. This excludes exact complete circular balance throughout that strip.

The frozen subject is [the joint-vector note](overnight2-c-joint-vector-strip.md), supplied SHA-256 `387b303c0fe3ece8cf18579b61ef03763c1a3fdf329ec81d8f535f1377bc9e86`. The law remains $K_{\log}=c_f=1$, unchanged logarithmic transmitter weighting, persistent unit polarities and complete circular histories. The clock tool returned 2026-10-07 12:49:29 UTC at review start; the live report retains launch 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC. The live Ramon E. Moore lens applies. This is an analytical review; no numerical instrument, target or scientific rerun was used.

The analytical references for the reconstruction are the static controls $D_0=R_0=1$, $B_0(\gamma)=\cot(\gamma/2)$, $P_0=0$, $Q_0(\gamma)=2/\sin\gamma$. At $\beta=\pi/2$ these give required vectors $W_1=(1/2,-1)$ and $W_2=(1/2,1)$, hence $L=2$, radial average $1/2$ and $|\mathcal W|^2=5/2$. At static source phase zero, the paired response values are $-1/u$ and $-i/w$ at gaps zero and $\pi/2$. These hand-known cases fix the radial/tangential signs and joint norm convention before applying the new bounds. They are not claimed exact six-member states.

## Required response vectors and the residual norm

Place the positive inner phases at $0,-\beta$ and the outer positive phase at $\chi$. At the first unit receiver, the other inner neutral pair contributes $(P_v(\beta),Q_v(\beta))/2$; at the second it contributes $-(P_v(\pi-\beta),Q_v(\pi-\beta))/2$. The own-antipode row is the same $-(R_v(\pi),B_v(\pi))/2$ in both local frames, where $v=\omega$. Subtracting those inner contributions from required circular acceleration $(-v^2,0)$ gives exactly

$$
W_1=\left(-v^2+\frac{R_v(\pi)-P_v(\beta)}2,\ \frac{B_v(\pi)-Q_v(\beta)}2\right),
$$

$$
W_2=\left(-v^2+\frac{R_v(\pi)+P_v(\pi-\beta)}2,\ \frac{B_v(\pi)+Q_v(\pi-\beta)}2\right).
$$

The outer responses are seen at counterclockwise relative phases $\chi,\chi+\beta$, consistent with the clockwise arguments used for $P,Q$. Their required tangential difference and radial average are therefore

$$
L=W_{2,t}-W_{1,t}=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2,\qquad
\overline W_r=-v^2+\frac{R_v(\pi)}2+\frac{P_v(\pi-\beta)-P_v(\beta)}4.
$$

The complete residual at these two receivers is $\mathcal G-\mathcal W$, since adding their inner rows and prescribed circular residual term subtracts precisely $W_i$. Local component frames are orthonormal, so Euclidean four-space is the appropriate norm. For any two tangential entries with difference $L$ and two radial entries with mean $\overline W_r$,

$$
|\mathcal W|^2\ge L^2/2+2\overline W_r^2.
$$

## Independent sharper tangential bound

The checked convexity of $Q_v$ gives $L\ge Q_v(\pi/2)$. For $v\le1/8$, the emission half-angles at present angles $\pi/2$ and $3\pi/2$ belong respectively to $[\pi/4,\pi/4+v]$ and $[3\pi/4,3\pi/4+v]$. Since $\cos v\ge1-v^2/2$ and $\sin v\le v$,

$$
\cos(\pi/4+v)=\sin(3\pi/4+v)\ge\frac{1-v-v^2/2}{\sqrt2}\ge\frac{111}{128\sqrt2}>\frac35.
$$

The last strict sign follows from $555^2=308025>294912=2\cdot384^2$. In the second interval, $|\cos(\alpha/2)|\le(1+v)/\sqrt2\le9/(8\sqrt2)<4/5$, as $2025<2048$. Thus the first root has $D\le1-3v/5$, and its positive cotangent is at least $(1-v-v^2/2)/(1+v-v^2/2)$ by the tangent addition formula and $\tan v\le v/(1-v^2/2)$. This proves the subject's bound $B_v(\pi/2)\ge F(v)$.

For the second root, put $z=\alpha/2-3\pi/4$. The root equation gives $z=v\sin(\alpha/2)\ge3v/5$. Since $|\cot(3\pi/4+z)|=\tan(\pi/4+z)$ and the tangent derivative is at least two on this interval, its magnitude is at least $1+2z\ge1+6v/5$. Dividing by $D\le1+4v/5$ gives $-B_v(3\pi/2)\ge J(v)$ as claimed.

To verify the monotonic endpoint reduction, write $F=A/d$ with $A=(1-v-v^2/2)/(1+v-v^2/2)$ and $d=1-3v/5$. Direct differentiation gives $A'=-(2+v^2)/(1+v-v^2/2)^2\le-128/81$, since the denominator's base is at most $9/8$. Also $0<A\le1$, $37/40\le d\le1$. Hence $F'=A'/d+(3/5)A/d^2\le-128/81+960/1369$. The exact derivative $J'=(2/5)/(1+4v/5)^2\le2/5$ proves $(F+J)'<0$: its upper bound is less than $-3/2+3/4+2/5<0$.

At $v=1/8$, $F=4440/5291$ and $J=23/22$, so

$$
L\ge\frac{219373}{116402}>\frac{15}{8},
$$

with exact cross-product difference $8954>0$. All factors used to divide these positive cotangent magnitudes stay positive. This is an analytic estimate for the complete two-channel response, not a numerical value or a sampled lower bound.

## Independent radial-average estimate

At present angle $\pi$, write the emission half-angle as $\pi/2+z$. The complete root gives $z=v\cos z$, so $0\le z\le v$. Its factor is $1+v\sin z\le1+v^2$, implying $R_v(\pi)\ge1/(1+v^2)$. Independently differentiating the complete response gives $R_v'(\gamma)=-v\sin(\alpha/2)/(2D_v^3)$. Since $D_v\ge1-v$, both terms in $P_v'$ have magnitude at most $v/[2(1-v)^3]$, and therefore

$$
|P_v'|\le\frac{v}{(1-v)^3}\le\frac{64}{343}.
$$

For $h=|\beta-\pi/2|$, the two arguments of $P$ in the radial average are $2h$ apart. After the factor $1/4$, their contribution has magnitude at most $32h/343$. Thus

$$
\overline W_r\ge\frac{32}{65}-\frac1{64}-\frac{32}{34300}
=\frac{19}{40}+\frac{5349}{7134400}>\frac{19}{40}.
$$

The positive radial average permits squaring its lower bound. Combining with $L>15/8$ yields

$$
|\mathcal W|^2>\frac{225}{128}+\frac{361}{800}
=\left(\frac{297}{200}\right)^2+\frac{307}{80000},
$$

so $|\mathcal W|>297/200$.

## Correlated reciprocal-ellipse norm and phase sensitivity

For the static radius-$b$ neutral pair, the checked complex response has reciprocal $Z(s)=-u\cos s+iw\sin s$, where $u=(b^2-1)/(2b)>0$ and $w=(b^2+1)/(2b)>u$. At phases $s$ and $s+\pi/2$, the squared moduli of $Z$ have sum $u^2+w^2$ and product

$$
u^2w^2+(w^2-u^2)^2\sin^2s\cos^2s\ge u^2w^2.
$$

Taking reciprocals proves $|G(s)|^2+|G(s+\pi/2)|^2\le1/u^2+1/w^2$. Both $u$ and $w$ increase for $b>1$, so for $b\ge3$ the right side is at most $9/16+9/25=369/400$. This explicitly uses the same phase in both responses. Equality at $s=0$ confirms the assignments of $u,w$ and shows why independent separate maxima would be unnecessarily weak.

Since $|Z'|\le w$ and $|Z|\ge u$, differentiation of $G=1/Z$ gives $|G'|\le w/u^2=2b(b^2+1)/(b^2-1)^2$. Differentiating the final rational function gives $-2(b^4+6b^2+1)/(b^2-1)^3<0$, so $|G'|\le15/16$ for $b\ge3$. Changing only the second phase from $s+\pi/2$ to $s+\beta$ changes the joint four-vector by at most $15h/16$. Thus its norm is at most $\sqrt{369}/20+15h/16$, and strictly less than $77/80+3/320$, using $5904<5929$ and $h\le1/100$.

## Complete delayed response and final margin

The [independently checked common rotated comparison](overnight2-c-centered-response-independent-review.md) uses phases $s=\chi-vb$ and $s+\beta$ simultaneously. Each actual pair response differs from its corresponding static vector by at most $E=2v(2b-1)/[(b-1)^2(1-v)]$. This preserves both actual source delays and their transmitter factors. The function $(2b-1)/(b-1)^2$ decreases with $b$, so at $b\ge3$, $v\le1/8$ one has $E\le5/14$.

Two separate two-component error vectors of norm at most $E$ form a four-vector of norm at most $\sqrt2E$, not $2E$. Using $\sqrt2<10/7$ gives the uniform strict bound $\sqrt2E<25/49$. At $E=0$ this is also strict because its right side is positive. Hence

$$
|\mathcal G|<\frac{77}{80}+\frac3{320}+\frac{25}{49}
=\frac{23239}{15680}
=\frac{1483}{1000}-\frac{361}{392000}<\frac{1483}{1000}.
$$

The reverse triangle inequality now gives $|\mathcal G-\mathcal W|>|297/200|-1483/1000=1/500$. Since a four-component vector has Euclidean norm at most twice its maximum absolute component, at least one residual component is strictly greater than $1/1000$ in magnitude. Both strict conclusions remain valid on the closed parameter boundaries. No response phase has been selected independently at the two receivers.

The selected receivers each include three inner and two outer partner rows. Their ten actual rows are not replaced in the law by static rows; the static construction is only an enclosing comparison. The other receiver equations are unnecessary for this contradiction but remain part of the model. Inner phases in the narrow right-angle band are distinct, outer antipodes are distinct, and $b\ge3$ excludes mixed-radius coincidences. All speeds are at most $1/2$, so the complete theorem supplies thirty ordinary positive partner roots and zero positive self roots over the entire circular history.

## Verification boundary and falsifiers

Every new endpoint comparison, derivative sign, square identity, rational difference and norm inequality above was checked analytically. No interval target, numerical grid, optimizer, computational rerun or practical-cost assertion was used. The supported result is limited to the stated radius/rate/phase strip and arbitrary outer phase. It does not settle other phase gaps, $1<b<3$, higher angular rates, arbitrary unequal radii, superfield histories, stability or actual-time fate.

A wrong local angle convention or required-vector sign, invalid cotangent/factor bound, failure of the $P'$ estimate, loss of the shared static phase, a larger four-vector comparison error, an omitted root or an exact configuration in the strip would falsify the corresponding conclusion. Only this new review was written; the frozen subject, all prior evidence, main report and shared owners were preserved. Parent integration remains separate. This completes the assigned review.
