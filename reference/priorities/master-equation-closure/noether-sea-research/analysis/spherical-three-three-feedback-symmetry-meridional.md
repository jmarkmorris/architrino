# Meridional continuation to the first generated-source arrivals

Status: independently derived secondary-history reference, pending review. No new peer feedback finding was read before saving this derivation. This is the fresh [feedback investigation](spherical-three-three-feedback-plan.md), using the admitted [incoming-preparation solution](spherical-three-three-symmetry-first-incoming-preparation.md) and independently accepted [support transition](spherical-three-three-symmetry-support-adjudication.md). The proposed conclusion is a reached first $S=0$ event and a nonzero actual feedback interval, not continuation of the old stationary field.

## Complete symmetry and moving-source reduction

Set $K=R=c_f=1$. Write $u(a)=(\cos a,0,\sin a)$, $Q_k$ for rotations through $2k\pi/3$ around the vertical axis, and $X_{k,\eta}(T)=\eta Q_k u(\alpha(T))$, with polarity $\eta=\pm1$. The complete assigned preparation has $\alpha=\alpha_0=\pi/6$ before $-1/4$ and $\alpha=\alpha_0+(T/4)(1+4T)^3$ afterward through zero. The full history is preserved by $C_3$, inversion with global polarity reversal, and meridional reflection. Canonical roots, transmitter weights and normal projection commute with these operations. Local uniqueness therefore retains a common latitude and zero azimuthal motion on any complete ordinary chart. This establishes equal speeds $|\dot\alpha|$, not constant speed.

For representative receiver $(0,+)$ put $a=\alpha(T)$, $b=\alpha(S)$, $\theta=2k\pi/3$ and

$$
C_k=\cos a\cos b\cos\theta+\sin a\sin b,
\quad D_k=-\sin a\cos b\cos\theta+\cos a\sin b,
\quad E_k=-\cos a\sin b\cos\theta+\sin a\cos b.
$$

Every admitted root for persistent label $(k,\eta)$ satisfies

$$
T-S=r_{k\eta}=\sqrt{2-2\eta C_k},\qquad
D_{t,k\eta}=1-\frac{\eta\dot\alpha(S)E_k}{r_{k\eta}}.
$$

Direct projection of the canonical per-hit vector gives the exact all-root equations

$$
\ddot\alpha=\sum_{k,\eta,S}-\frac{D_k}{r_{k\eta}^3|D_{t,k\eta}|},\qquad
A_n=\sum_{k,\eta,S}\frac{\eta}{2r_{k\eta}|D_{t,k\eta}|},\qquad
\lambda=-\dot\alpha^2-A_n.
$$

The positive-delay self label $(0,+)$ belongs to the root census; its absence below is proved rather than imposed. The radial identity follows from $u(a)\cdot[u(a)-\eta Q_ku(b)]=r^2/2$. Reflection pairs the $k=1,2$ roots and cancels their azimuthal components. Receiver playback is $(1-\dot\alpha(T)e_a\cdot\hat r)/D_t$, not an extra canonical acceleration weight.

The prepared source latitude satisfies

$$
\alpha_0-\frac{27}{4096}\le b\le\alpha_0,\qquad
-\frac1{16}\le\dot b\le\frac14.
$$

For the first moving source class, the opposite non-antipodal pair, define

$$
q_b=\cos a\cos b-2\sin a\sin b,\quad B_b=\sin a\cos b+2\cos a\sin b,
\quad J_b=\tfrac12\cos a\sin b+\sin a\cos b.
$$

Their shared distance and transmitter factor are $d=\sqrt{2-q_b}$ and $D=1+\dot bJ_b/d$. While the other three partner roots are stationary, the exact scalar and normal equations are

$$
\ddot\alpha=-\frac{B_0}{d_L^3}-\frac{B_b}{d^3D}+\frac{\sin(a-\alpha_0)}{d_A^3},
\qquad
A_n=\frac1{d_L}-\frac1{dD}-\frac1{2d_A},
$$

where $B_0=\rho_0\sin a+\cos a$, $\rho_0=\sqrt3/2$, $d_L^2=2+\rho_0\cos a-\sin a$, $d_A^2=2+2\cos(a-\alpha_0)$, and $b$ is evaluated at the unique implicit moving-source emission. The stationary-source first integral is not used after $T_B$.

## Explicit acceleration bounds for the moving-preparation interval

The accepted support theorem reaches $a=1/3$ before $T_B$. Thus $a(T_B)<1/3$. The incoming-preparation theorem gives $a(T_B)>7/50$, downward velocity, and a unique solution through $T_B+1/2000$. Consider further continuation while $1/10\le a\le1/3$, all emissions remain nonpositive, and $T\le7/6$. Each scalar contribution displayed above is negative because $a<b$. Hence descent persists.

In this domain the like pair and own antipode remain stationary: $d_L>3/2$ and $d_A>39/20$ imply $T-d_L<-1/3<-1/4$ and an even earlier antipodal emission. Only the opposite non-antipodal pair can read moving preparation.

The following bounds are rational enclosures. Here $L=B_0/d_L^3$, $O=B_b/d^3$, $Z=\sin(\alpha_0-a)/d_A^3$, and $D$ uses the full prepared range of $\dot b$. Decimal entries in this table denote exact terminating rationals, not numerical trajectory samples.

| Receiver latitude interval | Bounds on $L$ | Bounds on $O$ | Bounds on $D$ | Bounds on $Z$ |
| --- | --- | --- | --- | --- |
| $[0.10,0.15]$ | $(0.234,0.253)$ | $(0.725,0.820)$ | $(0.978,1.086)$ | $(0.047,0.057)$ |
| $[0.15,0.20]$ | $(0.250,0.269)$ | $(0.700,0.790)$ | $(0.976,1.093)$ | $(0.040,0.049)$ |
| $[0.20,0.25]$ | $(0.265,0.286)$ | $(0.680,0.763)$ | $(0.975,1.100)$ | $(0.034,0.043)$ |
| $[0.25,0.30]$ | $(0.282,0.303)$ | $(0.657,0.733)$ | $(0.973,1.106)$ | $(0.027,0.036)$ |
| $[0.30,1/3]$ | $(0.299,0.315)$ | $(0.646,0.698)$ | $(0.972,1.109)$ | $(0.023,0.030)$ |

For reproduction, $B_b$ and $d$ increase in each argument on this rectangle. Thus a lower bound for $O$ uses $B_b$ at the lower corner divided by the upper-corner $d^3$, and an upper bound reverses those corners. The like term increases with $a$. For $D$, bound $J_b$ from above and $d$ from below; use $-1/16\le\dot b\le1/4$. For $Z$, its maximum occurs at the smallest $a$. All trigonometric entries can be bounded by the alternating sine polynomials through degrees five/seven and cosine polynomials through degrees four/six, using $3.14159<\pi<22/7$ and $1.73205<\sqrt3<1.73206$; positive square-root comparisons are then squared. The table deliberately uses separate corner bounds and does not assume that source emission and receiver latitude can independently attain their extrema along the trajectory.

In every row, $L_{\min}+O_{\min}/D_{\max}+Z_{\min}>9/10$ and $L_{\max}+O_{\max}/D_{\min}+Z_{\max}<7/6$. Consequently the exact moving-source acceleration obeys

$$
\boxed{\frac9{10}<-\ddot\alpha<\frac76.}
$$

These bounds also hold on the stationary descending arc from $\alpha_0$ to $1/3$: the previously verified lower bound is $37/40$, while $q<1/2$, $B<4/3$, $S(q)<4/5$ and $|\sin z|/d_A^3<1/14$ give $-f<16/15+1/14<7/6$.

## Sharper return bound and bootstrap to a reached feedback event

On the short accepted ascent, $0<q\le1/4$. The function $B S(q)$ increases with $q$ there: $S'\ge15q/(16\sqrt2)$, $B^2\ge27/16$, and $S<3/4$ make $(B^2S'-qS)/B>0$. Its maximum at $q=1/4$ is less than $19/20$, by substituting $B=3\sqrt3/4$ and $S=8/27+8/(7\sqrt7)$. The positive antipodal tangent term only reduces deceleration. Therefore $T_*>5/19$ and

$$
\frac{10}{19}<T_R=2T_*<\frac{20}{37}.
$$

The upper return bound is the independently accepted $37/40$ deceleration argument. After return, put $u=T-T_R$. As long as the candidate chart remains admitted, the bounds just proved give

$$
\frac14+\frac9{10}u<-\dot\alpha<\frac14+\frac76u,
\qquad
\alpha_0-\frac u4-\frac7{12}u^2<\alpha(T)
<\alpha_0-\frac u4-\frac9{20}u^2.
$$

For $T\le7/6$, $u<73/114$, so

$$
|\dot\alpha|<\frac14+\frac76\frac{73}{114}=\frac{341}{342}<1,
\qquad
\alpha(T)>\frac\pi6-\frac{73}{456}-\frac7{12}\left(\frac{73}{114}\right)^2>\frac1{10}.
$$

This prevents exit through the lower latitude or speed boundary. Distinct simultaneous members have separations $\sqrt3\cos a$, $\sqrt{1+3\sin^2a}$ or $2$, all exceeding one on the domain. Prepared source speeds are at most $1/4$, and the whole generated history remains below wake speed by the bootstrap. Every partner root is therefore unique, ordinary and complete; positive-delay self roots are excluded by the path-length inequality. Smooth implicit roots give continuation unless an emission reaches zero first. No root is deleted when its segment changes.

At emission $S=0$, all source positions equal the original stationary sites. The opposite non-antipodal pair is the shortest partner class while $a>0$ and $q>0$. Its candidate boundary is therefore

$$
T_F=d_O^0(\alpha(T_F)),\qquad
(d_O^0)^2=2-\rho_0\cos\alpha+\sin\alpha.
$$

This equation alone is not reachability. Suppose no emission reaches zero by $T=7/6$. Since $u>139/222$ there, the upper latitude inequality gives $\alpha(7/6)<1/5$. But $d_O^0(1/5)<7/6$ (equivalently $\rho_0\cos(1/5)-\sin(1/5)>23/36$). The unique negative-time root would then have passed $S=0$, a contradiction. Thus $T_F<7/6$ is reached on the actual solution.

For the lower bound, at $T=9/8$ the lower latitude inequality with $u<91/152$ gives $\alpha>4/25$. Since $d_O^0(4/25)>9/8$, the shortest partner has not yet reached $S=0$. Its boundary residual $d_O^0(\alpha(T))-T$ decreases strictly because receiver speed is below one. Hence

$$
\boxed{\frac98<T_F<\frac76.}
$$

The first labels are $(k,-)$ with $k=1,2$ for receiver $(0,+)$, and their symmetry images for the other receivers. The tie is between distinct partner labels, not a multiple root for one source. At $T_F$, the like pair and own antipode still have strictly negative stationary emissions, and self has no positive-delay root. Entire-history symmetry continues to give equal speeds.

## Signed support through arrival

The exact support is always $\lambda=-\dot\alpha^2-A_n$ with the moving-source $A_n$ above. In the moving-preparation rectangle, $d_L<5/3$, $d>11/10$, $J_b<21/40$ and $d_A>39/20$. Thus

$$
dD=d+\dot bJ_b>\frac{11}{10}-\frac{21}{640}>\frac{16}{15},
\qquad
A_n>\frac35-\frac{15}{16}-\frac{10}{39}>-\frac35.
$$

Also $d_L>3/2$, $dD<3/2$ and $d_A\le2$ imply $A_n<-1/4$. Consequently a uniform signed enclosure after $T_B$ and before $T_F$ is

$$
\frac14-\left(\frac{341}{342}\right)^2<\lambda<\frac35.
$$

The already verified negative support just before $T_B$ persists locally by continuity. The coarse enclosure above does not prove absence of intervening zeros; no old-source monotonicity or first integral is reused to claim that. At the feedback event itself the sign is decisive. Its lower time bound gives

$$
|\dot\alpha(T_F)|>\frac14+\frac9{10}\left(\frac98-\frac{20}{37}\right)=\frac{2297}{2960},
$$

$$
\boxed{\lambda(T_F)<\frac35-\left(\frac{2297}{2960}\right)^2
=-\frac{96245}{43808000}<0.}
$$

This is inward normal support; it is an explicitly selected constraint acceleration, not a physical pressure mechanism.

## A nonzero actual feedback interval and seam regularity

At emission zero, source position and velocity are continuous, with velocity $1/4$; the preparation acceleration need not equal the generated right acceleration. The source velocity is continuous and piecewise differentiable with bounded derivative. The ordinary-root kernel is consequently continuous and locally Lipschitz across this seam, with a possible derivative change rather than an impulse. At reception $T_F$, $D_t\ge3/4$ and receiver playback numerator exceeds $1/342$. Thus the two first roots cross into $S>0$ transversely.

Take $h=10^{-6}$. Bootstrap receiver speeds below one, partner delays above $1/2$, and all source emissions below $1/1000$ on $[T_F,T_F+h]$. Source data on $0\le S\le1/1000$ are already generated and verified by the earlier first-turn theorem; their speeds are at most $1/4$. Prepared source speeds have the same bound. Therefore $D_t\ge3/4$ and $0<S'<8/3$. Emissions advance by less than $8/(3\cdot10^6)$, so only the first pair reads positive-time generated data and it stays within the known early release. The other three partners retain negative stationary emissions.

Delay decreases at a rate no worse than $5/3$, starting above one, hence stays above $1/2$. Five canonical contributions give $|A|<80/3$, and the full constrained acceleration is less than $28$. The receiver speed increases by less than $28h<1/342$, closing the strict sub-wake bootstrap. Current separation starts above one and changes by less than $2h$, so no collision occurs. The complete-root/no-self argument remains valid. The known-source ordinary equation with these implicit roots has a unique solution through the whole interval. This is a method-of-steps continuation using actual previously generated post-release source values, not a prescribed future.

The support remains inward on this explicit feedback interval. A conservative Lipschitz bound is enough. Source vector acceleration is below $7$ on the preparation and the early generated segment: writing $u=1+4S$, the preparation has $\alpha''=12u^2-6u$, whose magnitude is at most $6$, and $\alpha'^2\le1/16$. Since $|r'|<5/3$ and $r>1/2$, $|\hat r'|<10/3$, and

$$
|D_t'|<7(8/3)+(1/4)(10/3)=39/2.
$$

For one hit, differentiating $(r/r^3)/D_t$ gives a norm less than $320/9+416/3$. Summing five gives $|A'|<872$ wherever the derivative exists. Thus $|A_n'|<899$ and $|\lambda'|<1000$ almost everywhere. Continuity across the seam makes this a Lipschitz bound. Consequently

$$
\lambda(T)<-\frac{96245}{43808000}+\frac1{1000}<0
\quad(T_F\le T\le T_F+10^{-6}).
$$

The feedback interval is deliberately local but starts at a reached $S=0$ event and contains positive generated-source emissions. That is the assigned distinction; it is not an arbitrary extension that still samples only preparation.

## Evidence, limits and review obligations

The result is derived pending independent adjudication of the rational table, strengthened return bound, continuation bootstrap, arrival ordering and support derivative estimates. Exact root formulas and table reproduction bounds are retained above; no numerical evolution, new solver, target instrument, root scan or quadrature was used. A failed table row, wrong projected transmitter sign, incorrect prepared derivative bound, missing root or unclosed event bootstrap would falsify the corresponding assertion. The signed support between $T_B$ and the final inward interval has only the stated enclosure; additional zeros there remain undecided by this proof.

The original external preparation and artificial normal support remain assumptions. No recurrence, physical energy, free assembly, irregular occupation, event law or asymptotic stability is inferred. This independent reference was saved before inspecting new feedback peer findings. Only this new feedback-symmetry companion is authored; earlier frozen artifacts and coordinator-owned synthesis are unchanged. Independent review and coordinator integration are the next dependencies.

Admission receipt: `node scripts/agent-dispatch-session.mjs receive-file` on the assigned retained bundle succeeded at 2026-10-10 14:58:31 UTC with `payloadVerified: true` and transport verification unavailable. A separate `shasum -a 256` reproduced all six dispatch baselines before authoring. The current coordinate skill/live owner, startup router, research owners, Specialist charter, Emmy Noether lens, canonical equation and feedback plan were read or retained at their verified unchanged identities. No capability claim about the production EOM solver is made by this analytical reference.

Measured closing preservation: `shasum -a 256` reproduced incoming-preparation identity `aa66e27bc832b15d548f20feaf95bf60f6a65b7babf4d799abb6f00b89be2d0b` and support-adjudication identity `811cf90fa167f3d5f858054fe682cca6af7218bbf2ff1bd9afe7aeafcf7ddf4a`. The scoped `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (exit 1 denotes its new-file difference). Its three local source links were read in this investigation or the accepted preceding slices. These checks establish scoped document identity/hygiene, not independent mathematical acceptance. There is no target computation, process lease or generated output; scientific re-derivation cost remains unprofiled. The derivation and explicit rational checks are the retained reproduction record. This bounded slice is complete pending review; further continuation or support-zero refinement requires coordinator selection.
