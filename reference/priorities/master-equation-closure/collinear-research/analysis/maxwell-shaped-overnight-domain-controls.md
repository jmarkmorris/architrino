# Maxwell-shaped collinear controls and finite strict-domain loss

This source fixes a collinear case before analytical target use in the operator-selected Maxwell investigation. It is a control for the binary campaign, not a substitute for planar coupled evolution. The selected E and E+M laws are Sections 7 and 8 of the [variation manuscript](../../equation-variants/manuscript.md); $K=c_f=1$, opposite polarity, two isolated members, mirror line positions $\mathbf X_\pm(T)=\pm x(T)\mathbf e$, all positive-delay partner and self channels, and no added boundary response. Complete supplied pasts are separated, uniformly subfield and $C^{2,1}$. The endpoint is compatible with each selected law. No cap, projection, root deletion, impulse, spatial core, external source or supplementary self response is selected. The result is author-derived and self-reviewed, pending an independently fixed check.

## 1. Exact response reduction on the line

At an ordinary partner root, write $\mathbf v=v_n\mathbf n$ and $\mathbf a=a_n\mathbf n$, with $|v_n|<1$ and $D=1-v_n>0$. The acceleration-dependent numerator of E vanishes identically:

$$
(\mathbf n-\mathbf v)(\mathbf n\cdot\mathbf a)-D\mathbf a
=D\mathbf n a_n-Da_n\mathbf n=0.
$$

The receiver term also vanishes when the receiver velocity is collinear. Consequently

$$
\mathbf A^{E+M}=\mathbf A^E
=\frac{\sigma K(1+v_n)}{R^2D}\mathbf n
=(1+v_n)\mathbf A^{\mathrm{ME}}.
$$

This is exact even for accelerated sources. The delayed highest derivative cancels in this geometry, so collinear evolution cannot test the neutral transverse-source-acceleration coupling that matters in the planar case. A stationary source gives the canonical inverse-square row. For an affine source and present range $d$, $R=d/(1-v_n)$ and $\mathbf A^E=\sigma K(1-v_n^2)\mathbf n/d^2$. These are controls on complete prescribed histories, not claims that those sources solve the isolated pair equation. The amplitude-gradient row is separately $\sigma K[1+Ra_n/D]\mathbf n/(R^2D^2)$ and retains its own definition and proof domains.

## 2. Frozen compatible held-tail case

The concrete case uses $x(0)=1$ and $x'(0)=0$. Its complete supplied half-history is

$$
\phi(T)=
\begin{cases}
1,&T\le-1/4,\\
1-\dfrac18T^2(1+4T)^3,&-1/4\le T\le0.
\end{cases}
$$

The mirror supplies the other member's past. The patch and its first two derivatives join continuously at $-1/4$; at zero it has position one, velocity zero and acceleration $-1/4$. Its displacement is at most $1/128$, its speed is at most $3/16<1/4$, and $0<\phi\le1$. The launch partner root is $S=-2$, outside the patch, and therefore samples a stationary source. Its E and E+M acceleration is exactly $-1/4$, proving compatibility. There is one partner root and no positive-delay self root by the complete strict-speed chord bound. Both equations use this identical compatible complete history because M vanishes on the line.

While $x(T)>0$ and the future remains strictly subfield, put $u(T)=-x'(T)$. The partner root satisfies

$$
R=T-S=x(T)+x(S),\qquad
x''(T)=-\frac{1+u(S)}{R^2[1-u(S)]}.
$$

For negative $S$, $u(S)=-\phi'(S)$ may have either sign but lies in $[-1/4,1/4]$. For nonnegative $S$ it will lie in $[0,1)$ because the displayed acceleration is negative. Thus the complete source ratio obeys $(1+u(S))/(1-u(S))\ge3/5$. Since every supplied or generated $x(S)\le1$ before contact, $R\le2$ and

$$
u'(T)\ge\frac3{20}.
$$

This lower bound concerns the actual coupled delayed pair, not a stationary-host future. It implies that a regular strictly subfield noncoincident future cannot last longer than $20/3$ normalized time units.

## 3. The finite boundary is speed-domain loss

The actual positions decrease and the incoming speeds increase, so they have limits at a finite maximal endpoint. If both the limiting half-separation and the speed gap were positive, the complete one-root/no-self census, bounded row and ordinary method of steps would continue the solution; no regular-domain boundary would have occurred. A contact limit with incoming speed bounded strictly below one is also impossible.

For the latter claim, suppose $x(T)\to0$ with $u(T)\to u_*<1$. The complete history then has a common speed bound $v_*<1$. Its root bound gives $R\le2x/(1-v_*)$. Combining this with the positive source-ratio bound gives

$$
u'\ge\frac{3(1-v_*)^2}{20x^2}.
$$

After any positive initial interval $u>0$, and $d(u^2)/dx=-2u'$. Integrating the last bound toward $x=0$ makes $u^2$ unbounded, contradicting $u_*<1$. Therefore the finite maximal strict-domain endpoint must have $u(T)\to1$; its half-separation may be positive or simultaneously tend to zero. This proof does not decide which alternative occurs or define an acceleration trace at a simultaneous root/coincidence event.

**Derived bounded fate.** This frozen compatible opposite-polarity collinear case loses the strict speed domain in finite time $T_*\le20/3$. It cannot persist as a separated uniformly subfield binary. E and E+M have identical coupled line futures until this first boundary because their complete equations coincide there. This theorem is a collinear control only; it says nothing about the nonzero angular preparation of the primary planar campaign.

## 4. Speed labels, exclusions and falsifiers

The unrestricted, inclusive-ceiling and strict-ceiling labels coincide on every compact interval before $T_*$. The strict label excludes the limiting speed one. The inclusive label admits that speed as an inequality but adds no response or singular-event definition. The unrestricted label supplies no selected Maxwell extension beyond this uniformly subfield chart; a formal continuation of a partner expression cannot omit newly admitted self roots or a nonordinary event. No clamp or equality rule is inferred.

A complete compatible solution of this exact case that remains strictly subfield and noncoincident after $20/3$ would falsify the bounded-domain theorem. A nonzero collinear M or surviving longitudinal delayed-source-acceleration term would falsify the reduction. A rigorously established positive or zero half-separation at the first speed endpoint would decide an alternative left open here. Syntax, link or symbolic-row checks validate their stated scope and do not constitute independent mathematical adjudication.

## 5. Separate delay-floor strengthening and positive-clearance endpoint

The frozen case and initial Section 3 proof are preserved. This separate subject decides the endpoint alternative using the actual implicit root rather than a stationary source. Restore symbolic fixed $K>0$ for the identity; its numerical case remains $K=c_f=1$. Let $u_S=u(S(T))$, $D=1-u_S$ and $\tau=R=T-S=x(T)+x(S)$. Differentiating the complete root gives the exact equations

$$
S'=\frac{1+u}{D},\qquad
\tau'=-\frac{u+u_S}{D},\qquad
u'=\frac{K(1+u_S)}{\tau^2D}.
$$

The emission time increases. While $S<0$, the supplied source position has the fixed floor $x(S)\ge127/128$, so $\tau\ge127/128$ while the receiver half-separation is positive. If $S$ first reaches zero at a time $T_a<T_*$, write $\tau_a=\tau(T_a)>0$ and $u_a=u(T_a)<1$. From then onward $u,u_S\ge0$. Apart from a possible isolated zero endpoint, $u+u_S>0$, and division gives

$$
\frac{du}{d(1/\tau)}=K\frac{1+u_S}{u+u_S}\ge K.
$$

The inequality follows solely from $u<1$. Integrating it on the actual future yields

$$
\tau\ge\left[\tau_a^{-1}+\frac{1-u_a}{K}\right]^{-1}>0.
$$

If no such $T_a$ occurs before $T_*$, the earlier prescribed-source floor suffices. Thus there is a positive delay floor throughout the finite strict-domain evolution. The delays are at most two, the source time is increasing, and each limiting source time satisfies $S_*=T_*-\tau_*<T_*$. It therefore samples a compact portion of the completed strictly subfield history, with a strict source denominator floor and finite source jets. In particular no transmitter singularity occurs at this incoming endpoint.

To exclude simultaneous contact directly, the exact chord identity is

$$
2x(T)=\tau(T)-[x(S(T))-x(T)]
=\int_{S(T)}^T[1-u(t)]\,dt.
$$

At the finite limit the integrand is strictly positive for every $t<T_*$, including the complete supplied past, and the limiting integration interval has positive length $\tau_*$. Consequently $x_*>0$. This uses the whole completed interval rather than the limiting receiver speed alone. The compact delayed sampling and positive range then give a finite strictly positive inward acceleration trace

$$
a_*=\lim_{T\uparrow T_*}u'(T)
=\frac{K[1+u(S_*)]}{\tau_*^2[1-u(S_*)]}>0.
$$

**Derived subject awaiting independent review.** The exact held-tail collinear launch reaches speed one in a finite time $T_*\le20/3$ with strictly positive simultaneous separation $2x_*$, a positive partner delay, positive transmitter denominator and a finite positive speed derivative. Its first strict-domain boundary is a transverse speed endpoint, rather than contact or a root fold. E and E+M remain the same actual line future through the incoming limit. No practical numerical enclosure of $T_*$ or $x_*$ is asserted by this theorem.

The [separate continuous-acceleration self-birth theorem](../../binary-research/analysis/maxwell-shaped-overnight-equation-domain.md#12-separate-strengthening-to-continuous-acceleration-crossings) then applies conditionally to a putative classical outgoing continuation: positive retained self coupling would produce an unbounded positive longitudinal self row, so no separated all-root $C^2$ transverse continuation can satisfy the unchanged ordinary formula. This statement still selects no boundary response or weak outgoing history. The delay-floor, positive-clearance and transversality conclusions need independent assessment before this exact collinear result can be integrated at derived grade.

The falsifier is the exact case approaching contact with the proved positive delay floor, a violated root-clock identity, or a nonpositive finite incoming speed derivative while all completed source values remain in the displayed domain. A numerical near-one guard alone is neither proof nor a falsifier of the exact limit.

## 6. Quantitative endpoint margins for the same exact case

The [independent collinear reference](maxwell-shaped-overnight-independent-collinear.md) separately fixed its line-response, root-clock and delay-floor argument before reading Sections 1–5, then accepted the exact held-tail case's finite positive-clearance transverse speed endpoint. It also supplies the simple uniform floor $\tau\ge1/2$: before source time zero the floor is $127/128$, and at the switch $\tau_a=x(T_a)+1\ge1$, $u_a\ge0$, so the displayed reciprocal-delay bound is at most two. This acceptance promotes Section 5's incoming event and its connection to the independently accepted classical self-birth obstruction to derived grade.

The same estimates give explicit widened endpoint margins without integrating a numerical trajectory. First $T_*>1/2$. Indeed, before any attempted endpoint with $T\le1/2$, $u<1$ implies $x(T)\ge1-T\ge1/2$. The complete root is still in the stationary supplied tail: $S=T-[x(T)+1]\le2T-2\le-1$. Then $u'=1/[x(T)+1]^2\le4/9$ and $u(T)\le2/9$, contradicting a speed-one endpoint by $1/2$; contact and ordinary-root loss are already excluded.

Since $u'\ge3/20$ throughout the generated strict-domain future, one has $1-u(t)\ge(3/20)(T_*-t)$ for $0\le t<T_*$. Combining $\tau_*\ge1/2$ with the endpoint chord integral gives

$$
2x_*\ge\int_{T_*-1/2}^{T_*}\frac3{20}(T_*-t)\,dt
=\frac3{160},\qquad x_*\ge\frac3{320}.
$$

If $S_*\ge0$, the same speed-gap bound gives $D_*=1-u(S_*)\ge(3/20)\tau_*\ge3/40$; if $S_*<0$, the supplied-past bound is stronger. The incoming acceleration trace therefore obeys the conservative bounds

$$
\frac12<T_*\le\frac{20}3,\quad
\frac12\le\tau_*\le2,\quad
D_*\ge\frac3{40},\quad
\frac3{20}\le a_*\le\frac{320}3.
$$

The upper acceleration bound uses $1+u(S_*)\le2$, $\tau_*\ge1/2$ and $D_*\ge3/40$. These are analytical enclosure inequalities for the exact complete held-tail case, not approximate endpoint measurements. The speed-one point itself is a domain boundary, while its partner row remains ordinary with positive separation and source denominator. The newborn outgoing self obstruction concerns the conditional unchanged all-root continuation. The new quantitative refinements are author-derived pending the independent reference's assessment; the already accepted qualitative incoming event does not depend on them.

The independent quantitative reference subsequently assessed the frozen Section 6 and accepted its explicit separation, delay, denominator, acceleration and time margins at derived grade. Its own margin proof, fixed before reading the subject, additionally handles a negative source endpoint by splitting the chord integral into its old and future portions. The accepted exact collinear case is therefore a solution through a positive-clearance transverse speed-one boundary with the displayed conservative bounds and a named classical all-root continuation obstruction. It remains a control rather than a verdict for any nonzero-angular binary preparation.
