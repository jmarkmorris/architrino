# Independent assessment of the explicit canonical outgoing-tail bounds

**Derived assessment; accept at the unchanged nominal and original spatial-history scope.** The [frozen companion](overnight2-a-usable-outgoing-tail.md) follows from the [accepted terminal-speed scale](overnight2-a-reference-terminal-speed-scale.md). Its radial, velocity, position, account, passage-time and limiting-direction bounds hold throughout their stated actual outgoing domains. In particular the radial speed stays strictly above its positive terminal value for the entire interval after the first account zero. Monotone radial speed on that entire interval is neither needed nor proved.

This after-disclosure Moore/Hale assessment reconstructs the inequalities and elementary integrals independently. The [first-zero localization](overnight2-a-reference-first-zero-location.md) and [terminal asymptotics](overnight2-a-reference-canonical-terminal-asymptotics.md) remain independently accepted premises. Exact coefficients, $c_f=1$, complete histories and ordinary root census are unchanged. No physical conservation law, new trajectory or source preparation is introduced.

One wording qualification is useful: the chord estimate below uses the positive mutual dot product $N\cdot N_\infty>0$, which the subject proves. Merely placing both vectors in some common hemisphere would not imply the same angle restriction. The precise positive-dot-product condition is sufficient for every stated bound; no numerical correction is required.

## The account remainder controls radial speed at every outgoing time

Retain $Z=dN$, $U=uN+v$, $v\cdot N=0$, midpoint velocity $W$, $g=\sqrt{1-|W-(N\cdot W)N|^2}$, $\chi=K/d$, $k=K/d^2$ and $\Lambda=|v|^2/\chi$. At the actual first account zero $T_e$, the inherited theorem gives monotone unbounded separation thereafter, individual terminal velocities $v_i$, and $\delta=|v_+-v_-|>0$. It also gives, for all $T\ge T_e$,

$$
u>\frac43\sqrt\chi,\quad
|V_i|<B:=2\times10^{-6},\quad
\Lambda<3,\quad
1.99k\chi<\mathcal J'<2.01k\chi,\quad
\mathcal J_\infty=\delta^2/2,
$$
$$
\chi\le\chi_e<2.25\times10^{-13},\qquad
2\times10^{-11}<\delta<5\times10^{-10}.
\tag{1}
$$

The account is $\mathcal J=|U|^2/2-(2g+u)\chi$. Its monotonicity in (1) is the preparation-specific result of the already accepted full transverse barrier, not merely the older zero-boundary invariance.

On this actual outward interval $dt=dd/u$. Thus

$$
0<\mathcal J_\infty-\mathcal J(T)
<2.01\frac34K^{3/2}\int_{d(T)}^\infty r^{-5/2}\,dr
=1.005\chi(T)^{3/2}.
\tag{2}
$$

The integral equals $(2/3)d^{-3/2}$. Its strict lower sign follows from the strictly positive derivative on every nonempty future interval. The integral is finite by its displayed bound, including when $T=T_e$.

The exact identity separating radial and transverse speed is

$$
u^2=2\mathcal J+(4g+2u-\Lambda)\chi.
\tag{3}
$$

Convexity gives $|W|\le B$, hence $g\ge1-B^2$. Substituting (2), $\Lambda<3$ and $u>0$ into (3) yields

$$
u^2>\delta^2+[1-4B^2-2.01\sqrt\chi]\chi.
$$

Since $\sqrt{\chi_e}<4.75\times10^{-7}$, the coefficient is greater than

$$
1-1.6\times10^{-11}-9.5475\times10^{-7}>.99.
$$

For the upper bound, $\mathcal J\le\delta^2/2$, $g\le1$, $\Lambda\ge0$ and $u\le|U|<2B$ give $u^2<\delta^2+(4+4B)\chi<\delta^2+4.01\chi$. Therefore

$$
\delta^2+.99\chi<u^2<\delta^2+4.01\chi,\qquad
u>\delta,
\tag{4}
$$
$$
0<u-\delta=\frac{u^2-\delta^2}{u+\delta}
<\frac{2.005\chi}{\delta}.
\tag{5}
$$

The positive sign of $u$ is inherited from actual outward continuation. Squaring alone would not select it. Equations (4)–(5) constrain values without differentiating any remainder or asserting that $u$ decreases at early outgoing times.

## Terminal velocity balls and the position bound

The actual partner accelerations still obey

$$
|A_i|\le c_\beta k,\qquad c_\beta=\frac{441}{380},
$$

where this coefficient comes from the whole accessible generated speed ceiling $\beta=1/20$. It is not recomputed using the smaller current ceiling $B$. All preceding source windows, including the independently moving partner clocks and their acceleration coverage, keep their inherited admission.

Using $u>\delta$ in the tail integral gives

$$
\int_T^\infty k\,dt
<\frac K\delta\int_{d(T)}^\infty r^{-2}\,dr
=\frac{\chi(T)}\delta.
$$

Since the individual velocity limits are already established, integrating the actual acceleration toward those limits gives

$$
|V_i(T)-v_i|<\frac{c_\beta\chi(T)}\delta,\qquad
|U(T)-U_\infty|<\frac{2c_\beta\chi(T)}\delta.
\tag{6}
$$

These are Euclidean vector bounds for this admitted actual continuation. Replacing $\delta$ in their denominators by the lower endpoint $2\times10^{-11}$ only enlarges them. Neither inequality admits an arbitrary state or incomplete history with similar present coordinates.

Let $\tau=T-T_e\ge0$. Integrating $d'>\delta$ gives $d(T_e+t)>d_e+\delta t$ for $t>0$. The exact positional difference is

$$
X_i(T)-X_i(T_e)-v_i\tau
=\int_0^\tau[V_i(T_e+t)-v_i]\,dt.
$$

Applying (6) and the linear lower separation bound proves

$$
\left|X_i(T)-X_i(T_e)-v_i\tau\right|
\le\frac{c_\beta K}{\delta}\int_0^\tau\frac{dt}{d_e+\delta t}
=\frac{c_\beta K}{\delta^2}
\log\left(1+\frac{\delta\tau}{d_e}\right).
\tag{7}
$$

The non-strict form includes the equality $0=0$ at entry. This is an explicit error relative to a terminal-velocity line through the entry position, not a claim that the actual logarithmic correction or terminal offset vanishes.

Using $u>\delta$ in the account integral itself gives the independent sharper-late bound

$$
0<\mathcal J_\infty-\mathcal J(T)
<\frac{2.01K^2}{\delta}\int_{d(T)}^\infty r^{-3}\,dr
=\frac{1.005\chi(T)^2}{\delta}.
\tag{8}
$$

Both (2) and (8) hold at every outgoing time, so taking their minimum introduces no extra transition hypothesis.

## Passage-time primitive and endpoint orientation

For $c>0$, put $A=cK>0$ and

$$
F_c(r)=\frac{\sqrt{r(\delta^2r+A)}}{\delta^2}
-\frac{A}{\delta^3}\operatorname{arsinh}\!\left(\delta\sqrt{r/A}\right).
$$

Differentiate both terms before simplifying. Their derivatives are

$$
\frac{2\delta^2r+A}{2\delta^2\sqrt{r(\delta^2r+A)}},
\qquad
\frac{A}{2\delta^2\sqrt{r(\delta^2r+A)}},
$$

respectively. Subtraction gives

$$
F_c'(r)=\frac{r}{\sqrt{r(\delta^2r+A)}}
=\frac1{\sqrt{\delta^2+cK/r}}>0.
\tag{9}
$$

This verifies the coefficient, distance power and inverse-hyperbolic term directly. For every $D>d_e$, monotone unbounded separation supplies a unique attained time $T_D>T_e$. Taking positive square roots and then reciprocals in (4) gives

$$
\frac1{\sqrt{\delta^2+4.01K/r}}
<\frac1u
<\frac1{\sqrt{\delta^2+.99K/r}}.
$$

Integration over the nonempty interval $[d_e,D]$ yields

$$
F_{4.01}(D)-F_{4.01}(d_e)
<T_D-T_e
<F_{.99}(D)-F_{.99}(d_e).
\tag{10}
$$

The larger radial-square coefficient gives the lower passage time, as required. The strict statement requires $D>d_e$; at $D=d_e$ all differences are zero and only non-strict equalities hold. The result estimates time since the first zero, not its absolute time.

## Relative-direction convergence with an explicit hemisphere check

Define $N_\infty=U_\infty/\delta$. The positive terminal relative speed is already established, so this definition is legitimate. From (4) and (6),

$$
N\cdot N_\infty
=\frac{N\cdot U_\infty}{\delta}
>1-\frac{2c_\beta\chi}{\delta^2}.
\tag{11}
$$

At every time with $\chi\le\delta^2/10$, the right side is at least $1-2c_\beta/10>0$. In fact $2c_\beta=441/190<2.322$, leaving a large strict positive margin even at equality in the threshold. The mutual angle $\vartheta$ between $N$ and $N_\infty$ is therefore less than $\pi/2$.

Let $\Pi_\infty=I-N_\infty N_\infty^{\mathsf T}$. Projecting the actual relative position integral removes the entire terminal drift:

$$
\Pi_\infty Z(T)=\Pi_\infty Z(T_e)
+\int_{T_e}^T\Pi_\infty[U(t)-U_\infty]\,dt.
$$

Use $|\Pi_\infty Z(T_e)|\le d_e$, (6), and $dt<dd/\delta$ to obtain

$$
|\Pi_\infty Z(T)|
\le d_e+\frac{2c_\beta K}{\delta^2}\log\frac{d(T)}{d_e}.
\tag{12}
$$

The projection bound itself does not require the hemisphere restriction. That restriction is used only to convert it to a unit-vector distance. For $0\le\vartheta<\pi/2$,

$$
|N-N_\infty|=2\sin(\vartheta/2)
\le2\sin\vartheta=\frac{2|\Pi_\infty Z|}{d}.
$$

Combining with (12) gives exactly

$$
|N(T)-N_\infty|
\le\frac2{d(T)}
\left[d_e+\frac{2c_\beta K}{\delta^2}\log\frac{d(T)}{d_e}\right],
\qquad \chi(T)\le\delta^2/10.
\tag{13}
$$

No arbitrary common-hemisphere assertion replaces (11). The condition in (13) is eventually attained because $d$ is unbounded and $\delta>0$. The estimate tends to zero and controls the relative separation direction only. It neither proves a fixed orbital plane nor selects a unit normal when the physical angular vector has a degenerate limit.

## Relationship to asymptotics, falsifiers and provenance

The accepted terminal-asymptotics reference gives $u=\delta+L/T+O((\log T)^2/T^2)$ and obtains eventual $u'<0$ from the actual acceleration and radial identity, with $L>0$. That derivative statement remains separate. The present result strengthens the above-terminal value property to the entire outgoing tail and supplies explicit error coefficients there; it does not improve the onset time for decreasing radial speed. The logarithmic position bound (7) is consistent with the previously proved nonzero logarithmic correction.

Independent analytical controls are the primitives of $r^{-2}$, $r^{-5/2}$ and $r^{-3}$, the two separately differentiated terms in (9), the zero-duration position identity, the reciprocal orientation in (10), and the exact sine/chord identities under the proved positive dot product. No new scientific instrument or target was needed.

Falsifiers are an inherited account derivative outside its accepted domain, a missed factor two in (3) or (6), use of a smaller speed on old source windows, a wrong direction of a radius integral, applying strict (10) at equal endpoints, or converting projection to chord without (11). An unrelated present state or an unadmitted complete history is outside the theorem. No unsupported inequality remains in this reconstruction.

The retained assignment 13ca4a4c-d40f-42ef-b18b-11b2f8a293de was admitted with complete output, exit zero and payloadVerified true; its transportVerified false is not relabeled. Native shasum -a 256 independently matched these four input identities before editing:

| Frozen input | SHA-256 |
| --- | --- |
| Outgoing-tail subject | cac0544b105e0d35c5b3e610311fb025d655e8a5a9c0a341a31f7d7a309a8c60 |
| Speed-scale reference | 08fe12566646405f3676e98a3aa3a18e94eda1331a93f8fd6277df00c91c6af7 |
| First-zero reference | 9b51fd5f7de93e08bdcd4ed75a28c7047894836f7ca425bcdeebab005c85a103 |
| Terminal-asymptotics reference | d0cfd06a236d370e691099da8b1ede7d9a1979710db82d14c747ccd82c789e1c |

Only this new report is authored. All frozen subjects, references, prior evidence, histories, shared owners, production and generated files are retained. No scientific process was started or remains active. The coordinator owns integration into the [main A report](overnight2-a-followup-and-research-2026-10-07.md).

**Validation and freeze, 08:56 UTC.** The established authorized-cases-followup-document-check.mjs command with this report's repository-relative path passed known controls first, then all 92 mathematical spans, five local links and whitespace checks. Its scope is syntax and local destinations. Closing native shasum -a 256 reproduced all four frozen source identities above. The assessment is frozen after the final repeated document check, with the positive-mutual-dot-product qualification governing the direction conversion and no numerical correction required.
