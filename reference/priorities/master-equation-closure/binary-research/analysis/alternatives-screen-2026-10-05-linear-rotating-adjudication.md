# Independent assessment of finite unit arrival for the linear-vector rotating pair

## Verdict and independence

**Derived verdict: accepted in the stated rotating mirror class.** For the fixed multiplier-free linear-vector comparison, every compatible complete separated uniformly subfield planar mirror preparation with nonnegative past signed areal rate and positive release areal rate has a finite first unit-speed endpoint on each maximal ordinary strict-subfield future. Limiting pair separation is positive. The supplied radius-one, speed-$3/10$ circular-tail patch is a compatible example and satisfies the stated conservative elapsed-time bound. No substantive correction to these claims was found.

This is an independent analytical reconstruction after disclosure of the subject, using the Jack K. Hale lens. The frozen [subject](alternatives-screen-2026-10-05-linear-rotating-finite-event.md) has SHA-256 `363daa7e3a8098979d4bcff4e30f8eb098dc90af6b55f313c8eb8513c9cd90ec`, measured by `shasum -a 256` before this assessment was written. I read its [radial class dependency](alternatives-screen-2026-10-05-radial-rotating-class.md) but reconstruct the required statements below instead of taking another assessment as a premise. The [complete comparison law](../../collinear-research/analysis/multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law) and [fixed alternatives screen](../../analysis/alternatives-screen-2026-10-05.md) identify the equation. The subject and previous references were not edited.

The conclusion is arrival at the boundary of the strict-subfield ordinary chart. It asserts neither transverse crossing nor a selected continuation after arrival. It establishes no stability, periodic binding, or fate after equality. Arbitrary merely locally $C^1$ supplied histories need not supply a locally Lipschitz delayed-velocity coefficient; uniqueness in that weakest class is unnecessary for this theorem and is not added here. The explicit $C^{2,1}$ preparation has the stronger regularity needed for ordinary local uniqueness before its boundary.

## Equation and complete root census

Set $c_f=1$ and retain the exact positive decimal coupling $k=0.2862286103053385$. Opposite-polarity labels follow $q(T)$ and $-q(T)$ in one plane. Every ordinary positive-delay partner and self root contributes its signed $k\mathbf r/|D|$ row; the zero-delay diagonal is excluded. No multiplier, cap, cutoff, or event selector is inserted.

For a fixed receiving time with $r(T)=|q(T)|>0$, define the partner residual

$$
F_T(S)=T-S-|q(T)+q(S)|,\qquad S\le T.
$$

The supplied past has $|q'|\le b_0<1$. On each finite generated strict interval, continuity supplies a speed maximum below one. For $S_1<S_2\le T$, the strict chord inequality therefore gives $F_T(S_1)>F_T(S_2)$. Also $F_T(T)=-2r(T)<0$, whereas $F_T(S)\to+\infty$ as $S\to-\infty$: the estimate $|q(S)|\le r(0)+b_0(-S)$ controls the whole unbounded old past. Thus precisely one partner root exists. At that root,

$$
R=T-S=|q(T)+q(S)|>0,\qquad
D=1+n\cdot q'(S)>0,\qquad
n=\frac{q(T)+q(S)}R.
$$

For a self root, $|q(T)-q(S)|<T-S$ for every $S<T$, so there are none. This proves completeness over the supplied past and all generated history, not over a truncated source window. The exact acceleration on this chart is consequently

$$
q''(T)=-\frac{k[q(T)+q(S)]}{D}.
$$

## Actual causal angle and positive areal rate

Write $a=q(S)$, $b=q(T)$ and $C=(a+b)/2$. For any $u\in[S,T]$,

$$
2|q(u)-C|
\le |q(u)-a|+|q(u)-b|
\le\int_S^T|q'(s)|\,ds
<T-S=2|C|.
$$

The entire causal window therefore lies in the open half-plane $C\cdot q>0$. Also $|b-a|<|b+a|$ gives $a\cdot b>0$. Since the angular lift stays in an interval of width $\pi$, its actual endpoint difference lies in $(-\pi/2,\pi/2)$; an unobserved winding cannot be substituted for this lift.

Let $h=q\times q'$ be the signed planar areal rate. Its purely geometric derivative is

$$
h'=q\times q''
=\frac{k r(T)r(S)\sin[\theta(T)-\theta(S)]}{D}.
$$

Nonnegative past $h$ and $h(0)=h_0>0$ give a strictly positive angle increment at release, by continuity near release. While generated $h$ remains positive, each later causal window includes a positive-length terminal interval with positive angular derivative. Thus $0<\theta(T)-\theta(S)<\pi/2$ and $h'>0$. A first loss of positive $h$ is impossible. In particular,

$$
h(T)\ge h_0>0,\qquad r(T)>h(T)\ge h_0
$$

throughout the generated strict future, where $h\le r|q'|<r$ supplies the last assertion. Contact cannot precede the speed boundary. These are geometric identities and inequalities, with no conserved physical quantity assumed.

## Radial excursion bound

The preceding angle result makes the partner contribution to the radial numerator positive. Since $0<D<2$,

$$
A_r=-\frac{k[r+r(S)\cos\Delta\theta]}D\le-\frac{kr}{2}.
$$

The polar identity and strict speed imply

$$
r''=\frac{h^2}{r^3}+A_r
\le\frac1r-\frac{kr}{2},\qquad |r'|<1.
$$

Let $L=2/\sqrt{k}$ and $c=\sqrt{k}/2$. For $r\ge L$, one has $1/r\le kr/4$, hence $r''\le-c$. On any component of $r>L$ entered after release, start at its crossing of $L$. Until the component ends,

$$
r(T)\le L+u_a(T-a)-\frac c2(T-a)^2
\le L+\frac{(u_a)_+^2}{2c}
\le L+\frac1{\sqrt{k}},
$$

where $u_a=r'(a)$ and $(u_a)_+=\max(u_a,0)$. A component already present at release obeys the identical estimate with $L$ replaced by $r(0)$. There is no accumulation issue: this bound applies separately to every open component of $r>L$, and points outside those components have $r\le L$. Therefore

$$
r(T)\le M:=\max\{r(0),2/\sqrt{k}\}+1/\sqrt{k}.
$$

Only the instantaneous bound $|r'|<1$ was used. An unknown or vanishing all-future speed margin cannot invalidate this estimate.

## Bounded radius contradicts an infinite strict future

Suppose for contradiction that the strict future exists for every $T\ge0$. If a receiving root has $S\le0$, then

$$
T-S\le M+r(0)-b_0S,
\qquad T\le M+r(0)+(1-b_0)S\le M+r(0).
$$

Consequently every causal window at $T>M+r(0)$ is generated future. On it, $h\ge h_0$ and $h_0<r\le M$, so

$$
\Delta\theta=\int_S^T\frac{h(u)}{r(u)^2}\,du
\ge\frac{h_0R}{M^2}.
$$

The chord estimate also gives $R>r(T)$: indeed $2r(T)\le|q(T)+q(S)|+|q(T)-q(S)|<2R$. Using $D<2$ and $\sin x\ge2x/\pi$ for $0\le x\le\pi/2$ in the exact torque yields

$$
h'(T)\ge\frac{k h_0^3 R}{\pi M^2}
\ge\frac{k h_0^4}{\pi M^2}>0.
$$

This eventually contradicts $h(T)<r(T)\le M$. Both the old-source clearing argument and the torque lower bound remain valid when the receiving speed tends toward one. Thus no infinite strict future exists.

## Finite endpoint and continuation alternatives

Let $T_*<\infty$ be the maximal strict endpoint. Speed below one makes $q$ Lipschitz and gives a finite limiting position with $r_*\ge h_0$. The inequality $R>r(T)>h_0$ keeps every sampled source at least $h_0$ before reception. The complete old-past margin also bounds source times below: for negative sources the previous bound, without sending $T$ to infinity, implies

$$
S\ge\frac{T-M-r(0)}{1-b_0}.
$$

Thus all sources for receptions sufficiently close to $T_*$ lie in a fixed compact interval ending strictly before $T_*$. On that interval the already supplied or generated velocities have a positive speed margin. Hence $D$ stays bounded away from zero, the exact acceleration remains bounded, and $q'$ has a limit at $T_*$. The partner root remains positive-delay, simple, and unique. No positive-delay self root appears at this endpoint: every such chord still integrates strictly subunit speed except possibly at its single receiving endpoint.

If the limiting speed were below one, the root would remain in an already known regular source window and ordinary local continuation would extend the strict future. Locally Lipschitz source velocity gives the usual unique continuation; with merely continuous source velocity, local continuous-coefficient existence suffices to contradict maximality. Therefore

$$
\lim_{T\uparrow T_*}|q'(T)|=1,\qquad
|X_+(T_*)-X_-(T_*)|=2r_*\ge2h_0>0.
$$

This excludes finite contact, a partner fold, source escape to the remote past, and loss of ordinary coefficients as earlier endpoint alternatives. It does not give a positive limiting derivative of speed. It also does not determine the self-root census or response immediately after equality.

## Independent check of the explicit complete preparation

Put $\beta=3/10$ and $q_c(T)=(\cos\beta T,\sin\beta T)$. The function $\xi-\beta\cos\xi$ is negative at zero, positive at $\beta$, and strictly increasing there. Its unique root satisfies $0<\xi<\beta$. The old circular root is $S_0=-2\cos\xi$, because its angular lag is $-\beta S_0=2\xi$. Direct evaluation gives

$$
n=(\cos\xi,-\sin\xi),\qquad
n\cdot q_c'(S_0)=\beta\sin\xi,
$$

and therefore exactly the acceleration displayed in the subject,

$$
A_c=-\frac{k}{1+\beta\sin\xi}
(1+\cos2\xi,-\sin2\xi).
$$

Set $\Delta=A_c+\beta^2(1,0)$ and $\delta=1/100$, and use the subject's polynomial patch $q=q_c+\phi\Delta$, with $\phi=\tfrac12T^2(1+T/\delta)^3$ on $[-\delta,0]$ and zero earlier. Its triple zero at $-\delta$ matches the value and first two derivatives; at zero, $\phi=\phi'=0$ and $\phi''=1$. Thus the complete past is $C^{2,1}$ and its release acceleration is $A_c$.

The following inequalities are direct rational or elementary trigonometric bounds; no computed root or sampled trajectory is used:

$$
|\Delta|\le2k+9/100<2/3,\quad
|\phi|\le\delta^2/2,\quad
|\phi'|\le\delta+3\delta/2=5\delta/2.
$$

They give $|q-q_c|<1/30000$, $|q'-q_c'|<1/60$, $|q'|<19/60$ and $|q|>1-1/30000$. Further,

$$
|h-3/10|
<\frac{1}{30000}\frac3{10}+\frac1{60}
+\frac1{30000}\frac1{60}<\frac1{50}.
$$

Hence the whole supplied past has $h>7/25$ and uniform strict speed, with $h(0)=3/10$. Since $\cos(3/10)>1-(3/10)^2/2=191/200$, the unchanged circular source obeys $S_0<-191/100<-\delta$. It remains a root after patching, because both its position and velocity and the release position remain unchanged. The complete monotonicity argument already proved makes it the only partner root, and excludes every earlier self root. Thus the endpoint response really is $A_c$, with no hidden patch source, and the acceleration matching is exact.

Since $k<1$, this preparation has $r(0)=1<2/\sqrt{k}$ and $M=3/\sqrt{k}$. Its limiting pair separation is at least $3/5$.

## Conservative elapsed-time bound

For the explicit preparation, the supplied radii obey $r<1+1/30000<M$, while the generated radii obey the derived upper bound $M$. Set $h_p=7/25$. On the complete supplied-plus-generated interval, $h\ge h_p$, $r\ge h_p$, and $r\le M$; on the supplied part the radius estimate proves the lower bound, and on the generated part $r>h\ge h_0>h_p$ proves it.

Every receiving window therefore has $\Delta\theta\ge h_pR/M^2$, and the exact torque calculation, valid even while the source lies in the patch or circular tail, gives

$$
h'(T)\ge c_h:=\frac{k h_p^4}{\pi M^2}
=\frac{k^2(7/25)^4}{9\pi}>0.
$$

Consequently all strict times satisfy $3/10+c_hT\le h(T)<M$. In particular the finite first endpoint satisfies the exact conservative bound

$$
0<T_*\le\frac{M-3/10}{c_h}
=\frac{9\pi[3/\sqrt{k}-3/10]}{k^2(7/25)^4}.
$$

The non-strict endpoint inequality is the immediate conclusion from inequalities valid for $T<T_*$. This is a derived upper bound for the specified preparation, not a measured arrival time and not a certificate of transverse passage.

## Validation, falsifiers and ownership

The scientific validation is the independent exact reconstruction above: complete root census; lifted-angle control; areal-rate bootstrap; radial excursion estimate; late-source clearing; torque contradiction; finite-endpoint continuation; explicit polynomial compatibility and complete-past bounds. No numerical instrument, evolution, or new process was launched. Therefore there is no known-case numerical receipt to claim and no numerical admission uncertainty hidden behind the constants.

Operator-checkable falsifiers are an admitted ordinary extra root under the complete strict-speed hypotheses; a causal window violating the open-half-plane inequality; an excursion above $M$ satisfying the displayed polar inequality and $|r'|<1$; a failed circular-tail acceleration or seam identity; or a finite endpoint with limiting speed below one despite the proved compact positive-margin source window. An infinite strict future within this exact class would directly contradict the theorem. A nonmirror path, sign-changing past rotation, superfield supplied segment, modified numerator, or post-event continuation is outside its scope and would not refute it.

Only this new assessment file is owned by this review. The subject, previous reviews, shared manuscripts, registries, priorities, and production code remain outside the write scope. Measured repository validation: `git diff --no-index --check /dev/null` applied to this assessment returned no whitespace diagnostics, and a repeated `shasum -a 256` on the subject returned the frozen hash recorded above. These checks do not establish the mathematics. This bounded review is complete and does not close the broader alternatives campaign.
