# A joint radial–tangential exclusion near the right-angle inner gap

## Proposed continuous exclusion

**Derived claim pending independent reconstruction:** in the fixed logarithmic three-neutral-antipodal-pair circular class, no complete history balances on

$$
r_1=r_2=1,\qquad 3\le b=r_3\le4,\qquad
0\le\omega\le\frac18,\qquad
\left|\beta-\frac\pi2\right|\le\frac1{100},\qquad \chi\in\mathbb T.
$$

The positive phases are $0,-\beta,\chi$, and the complete paths use absolute time $T$, $X_{a,s}(T)=s r_a e^{i(\omega T+\phi_a)}$. The equation remains the inverse-distance logarithmic law with $K_{\log}=c_f=1$, unchanged transmitter weighting, persistent unit polarities and all ordinary positive-delay roots. The combined four-component residual at the two positive inner receivers has Euclidean norm greater than $1/500$; at least one radial or tangential component has magnitude greater than $1/1000$.

This continuous phase/radius/rate strip extends the earlier all-phase inner-equal exclusion through $\omega=1/12$ into part of its previously unresolved higher-rate region. It is not a whole-domain exclusion, an exact reference, a stability result or actual-time evolution. No numerical grid, optimizer, new interval target or enlarged old cover is selected. All outer speeds here are at most $1/2$, so the complete census is thirty ordinary partner roots and no positive self roots.

## Required response vectors and their joint norm

Use the [independently reconstructed linked equations](overnight2-c-linked-response-independent-review.md). Let $v=\omega$ be the inner speed and define the complete unit-circle chart by

$$
\gamma=H_v(\alpha)=\alpha-2v\sin(\alpha/2),\qquad
D_v=1-v\cos(\alpha/2),\qquad R_v(\gamma)=1/D_v,
$$

$$
B_v(\gamma)=\frac{\cot(\alpha/2)}{D_v},\qquad
P_v(\gamma)=R_v(\gamma)-R_v(\gamma+\pi),\qquad
Q_v(\gamma)=B_v(\gamma)-B_v(\gamma+\pi).
$$

Here $\gamma,\alpha\in(0,2\pi)$, and the paired functions have $\gamma\in(0,\pi)$. The two actual outer-pair responses would have to equal

$$
W_1=\left(-v^2+\frac{R_v(\pi)-P_v(\beta)}2,
\frac{B_v(\pi)-Q_v(\beta)}2\right),
$$

$$
W_2=\left(-v^2+\frac{R_v(\pi)+P_v(\pi-\beta)}2,
\frac{B_v(\pi)+Q_v(\pi-\beta)}2\right).
$$

Set $\mathcal W=(W_1,W_2)\in\mathbb R^4$. Their tangential difference is

$$
W_{2,t}-W_{1,t}=L
=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2\ge Q_v(\pi/2)
$$

by the checked strict convexity. Their radial average is

$$
\overline W_r=-v^2+\frac{R_v(\pi)}2
+\frac{P_v(\pi-\beta)-P_v(\beta)}4.
$$

The next two sections prove $L>15/8$ and $\overline W_r>19/40$ throughout this strip. Cauchy's two-component inequalities then give

$$
|\mathcal W|^2\ge\frac{L^2}{2}+2\overline W_r^2
>\frac{225}{128}+\frac{361}{800}
>\left(\frac{297}{200}\right)^2.
$$

The last exact difference is $307/80000>0$. This lower bound retains both the radial and signed-tangential requirements.

## A sharper lower bound on the equal-circle tangential difference

Let $0\le v\le1/8$. At present angle $\pi/2$, the emission half-angle lies in $[\pi/4,\pi/4+v]$; at $3\pi/2$ it lies in $[3\pi/4,3\pi/4+v]$. On these intervals,

$$
\cos(\pi/4+v),\ \sin(3\pi/4+v)
\ge\frac{1-v-v^2/2}{\sqrt2}
\ge\frac{111}{128\sqrt2}>\frac35.
$$

The final strict inequality follows by squaring positive sides: $555^2>2\cdot384^2$. Also $|\cos(\alpha/2)|$ on the second interval is at most $(1+v)/\sqrt2\le9/(8\sqrt2)<4/5$, since $45^2<2\cdot32^2$.

For the first root, use $D_v\le1-3v/5$ and $\tan v\le v/(1-v^2/2)$ to obtain

$$
B_v(\pi/2)\ge F(v)
=\frac{1-v-v^2/2}{(1+v-v^2/2)(1-3v/5)}.
$$

For the second root, the exact half-angle relation gives $\alpha/2-3\pi/4=v\sin(\alpha/2)\ge3v/5$. Thus $|\cot(\alpha/2)|\ge1+6v/5$, while $D_v\le1+4v/5$. Consequently

$$
-B_v(3\pi/2)\ge J(v)=\frac{1+6v/5}{1+4v/5}.
$$

The sum $F+J$ decreases on this interval. To verify this without a numerical derivative, put $A(v)=(1-v-v^2/2)/(1+v-v^2/2)$ and $d(v)=1-3v/5$. Then $0<A\le1$, $d\ge37/40$ and

$$
A'(v)=-\frac{2+v^2}{(1+v-v^2/2)^2}\le-\frac{128}{81},
\qquad
(F+J)'\le-\frac{128}{81}+\frac{960}{1369}+\frac25<0.
$$

For the final sign, $128/81>3/2$ and $960/1369<3/4$. Evaluating the decreasing lower bound at $1/8$ gives

$$
Q_v(\pi/2)\ge\frac{4440}{5291}+\frac{23}{22}
=\frac{219373}{116402}>\frac{15}{8}.
$$

The exact final cross-product difference is $8\cdot219373-15\cdot116402=8954>0$. No loss of sign or omitted source row enters this estimate.

## Uniform radial-average bound near the right angle

At present angle $\pi$, write $\alpha/2=\pi/2+z$. The exact relation is $z=v\cos z$, hence $0\le z\le v$ and $D_v=1+v\sin z\le1+v^2$. Therefore $R_v(\pi)\ge1/(1+v^2)$.

For every interior present angle, differentiation of the root chart gives

$$
R_v'(\gamma)=-\frac{v\sin(\alpha/2)}{2D_v^3},\qquad
|P_v'(\gamma)|\le\frac{v}{(1-v)^3}\le\frac{64}{343}.
$$

If $h=|\beta-\pi/2|\le1/100$, the two arguments $\beta$ and $\pi-\beta$ lie $2h$ apart. Their contribution to the radial average has magnitude at most $32h/343$. Hence

$$
\overline W_r\ge\frac{32}{65}-\frac1{64}-\frac{32}{34300}
>\frac{19}{40}.
$$

All comparisons use $v\le1/8$ and retain the small phase displacement explicitly. At exactly the right angle the $P$ difference vanishes, which is a direct symmetry control.

## A correlated upper bound for the same static outer pair

The [checked common shifted comparison](overnight2-c-centered-response-independent-review.md) puts both actual outer-pair responses within

$$
E(b,v)=\frac{2v(2b-1)}{(b-1)^2(1-v)}
$$

of one static response curve at phases $s=\chi-vb$ and $s+\beta$. With radial plus imaginary tangential encoding, the static curve has reciprocal

$$
\frac1{G_b^{(0)}(s)}=-u\cos s+i w\sin s,
\qquad u=\frac{b^2-1}{2b},\qquad w=\frac{b^2+1}{2b}.
$$

At a right-angle gap, the two squared reciprocal moduli are $u^2\cos^2s+w^2\sin^2s$ and $u^2\sin^2s+w^2\cos^2s$. Their product is

$$
u^2w^2+(w^2-u^2)^2\sin^2s\cos^2s\ge u^2w^2,
$$

and their sum is $u^2+w^2$. Consequently the joint static norm satisfies

$$
|G_b^{(0)}(s)|^2+|G_b^{(0)}(s+\pi/2)|^2
\le\frac1{u^2}+\frac1{w^2}
\le\frac9{16}+\frac9{25}=\frac{369}{400},\qquad b\ge3.
$$

Both $u$ and $w$ increase for $b>1$. This joint cap is stronger than letting both responses attain the separate maximum $1/u$ independently. It holds for the one shared phase, without sampling or maximizing numerically.

Moreover,

$$
\left|\frac{dG_b^{(0)}}{ds}\right|\le\frac w{u^2}
=\frac{2b(b^2+1)}{(b^2-1)^2}\le\frac{15}{16},\qquad b\ge3.
$$

The final rational function decreases: its derivative is $-2(b^4+6b^2+1)/(b^2-1)^3<0$. Shifting only the second phase by at most $h$ therefore gives the four-component bound

$$
\left|\bigl(G_b^{(0)}(s),G_b^{(0)}(s+\beta)\bigr)\right|
\le\frac{\sqrt{369}}{20}+\frac{15h}{16}
<\frac{77}{80}+\frac3{320}.
$$

Here $369\cdot16=5904<77^2=5929$, and $h\le1/100$.

## Delayed error, residual margin and complete roots

For $b\ge3$ and $v\le1/8$, the checked pair error obeys $E\le5/14$. Combining its two vector errors in Euclidean four-space gives at most $\sqrt2E<25/49$, using $\sqrt2<10/7$. Thus the complete actual outer-pair response vector $\mathcal G$ satisfies

$$
|\mathcal G|<\frac{77}{80}+\frac3{320}+\frac{25}{49}
=\frac{23239}{15680}<\frac{1483}{1000}.
$$

The latter gap is $361/392000>0$. Since $|\mathcal W|>297/200$, the actual residual vector at the two inner receivers obeys

$$
|\mathcal G-\mathcal W|\ge|\mathcal W|-|\mathcal G|
>\frac{297}{200}-\frac{1483}{1000}=\frac1{500}.
$$

A four-component vector has maximum absolute component at least half its Euclidean norm. Hence some radial or tangential residual exceeds $1/1000$. This strict inequality holds throughout the closed declared strip and every outer phase.

The estimate uses all three inner sources and both outer sources at each selected receiver. Their separate actual delays and the transmitter factor are unchanged. The other positive receiver's two equations and the antipodal negative receivers remain necessary for exactness but are not needed to contradict the first four equations. Distinct inner phases are guaranteed by the narrow right-angle interval; unequal outer radius precludes mixed collisions. Every member is strictly subfield, so the complete thirty-partner/no-self census follows from the existing root theorem rather than a truncation.

## Controls, limits and falsifiers

At $v=0$, the shifted-pair comparison error vanishes and the reciprocal ellipse is exact. At $\beta=\pi/2$, the radial $P$ difference vanishes. At static phase zero, the right-angle norm bound is attained by $G_b^{(0)}(0)=-1/u$ and $G_b^{(0)}(\pi/2)=-i/w$; this checks both denominator assignments and signs. The tangential lower bound is controlled by exact endpoint rational comparisons, not floating evaluation. Independent reconstruction must verify the derivative signs, full linked source inventory, norm choice, delay comparison and every exact constant before acceptance.

An incorrect clockwise/counterclockwise conversion, wrong sign in either required vector, invalid root-factor estimate, dropped actual source row, failed norm inequality or exact configuration in the declared strip would falsify the result. This proof does not decide other phase gaps, $1<b<3$, higher angular rates, arbitrary unequal radii, superfield configurations, stability or actual-time fate. Those open regions are not silently promoted to empty. No new numerical instrument or target is used in this derivation.
