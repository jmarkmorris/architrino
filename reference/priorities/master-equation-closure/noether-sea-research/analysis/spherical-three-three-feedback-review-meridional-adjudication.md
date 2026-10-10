# Independent adjudication of the meridional feedback continuation

## Verdict and independent evidence

**Derived verdict: accepted within the stated local normal-constrained scenario.** The subject [meridional continuation](spherical-three-three-feedback-symmetry-meridional.md) has measured SHA256 `21a7155362c41dd506d2be8c9a9a0408dfbc19e5b281f540594432c591bd11ba`. It proves a reached first generated-source boundary $9/8<T_F<7/6$, followed by the explicit interval $[T_F,T_F+10^{-6}]$ with positive-emission roots and strictly inward support. It does not determine all support zeros between the first preparation arrival and $T_F$.

The analytical reference here is a separate direct projection of the canonical vector kernel, the strict sub-wake root theorem already retained in the [blind primary reference](spherical-three-three-feedback-review.md), and the accepted first-turn/incoming-preparation and support-transition premises cited by the subject. The secondary scalar reconstruction and inequalities below were checked directly rather than inferred from agreement between worker prose. A [separately authored exact rational certificate](../evidence/spherical-three-three-feedback-review-meridional-rationals.mjs) checks the table and event inequalities without a trajectory solver, root scan or floating-point enclosure. Its [known-case controls](../evidence/spherical-three-three-feedback-review-meridional-rationals-controls.json) passed and were recorded before its [target result](../evidence/spherical-three-three-feedback-review-meridional-rationals-target.json). The subject contains no numerical instrument whose replay could be mistaken for independent evidence.

## Canonical reconstruction and controls

For receiver $x=u(a)$ and transmitter $y=\eta Q_k u(b)$, the chord is $z=x-y$. Its squared length is $2-2\eta C_k$. Its tangent numerator is $u'(a)\cdot z=-\eta D_k$, and its radial numerator is $x\cdot z=r^2/2$. Multiplication by the polarity product $\eta$ therefore gives tangent contribution $-D_k/(r^3|D_t|)$ and radial contribution $\eta/(2r|D_t|)$. The source velocity dot chord is $\eta\dot b E_k$, so $D_t=1-\eta\dot b E_k/r$. These reconstruct every sign and denominator in the subject's all-root law. In particular the sign cancellation in the tangent numerator does not remove polarity from the distance or transmitter factor.

For the opposite non-antipodal pair, $C_k=-\cos a\cos b/2+\sin a\sin b=-q_b/2$, $D_k=B_b/2$ and $E_k=J_b$. Summing its two roots gives $-B_b/(d^3D)$ and $-1/(dD)$. For the stationary like pair the sum is $-B_0/d_L^3$ and $1/d_L$. For the stationary own antipode, $D_0=\sin(\alpha_0-a)$, giving $\sin(a-\alpha_0)/d_A^3$ and $-1/(2d_A)$. This independently recovers the reduced equations with the correct omitted-self obligation.

Setting $b=\alpha_0$ and $\dot b=0$ returns the accepted static five-source equations; this is the analytical known case. The positive-delay same-label root is excluded by $|X(T)-X(S)|\le V(T-S)<T-S$, not removed from the law. Every partner has one root because the delay residual increases with lower slope $1-V>0$, starts negative at zero delay and is nonnegative by delay two. The full-history symmetry preserves the meridian and transitive equal speed norm. Signed velocity crosses zero at the first turn; symmetry never implies constant speed or a differentiable speed norm there.

## Table enclosure and strengthened return

The five-row table passes all fifty scalar checks in the retained exact-rational result: lower and upper $L,O,D,Z$ bounds and lower/upper acceleration totals in each row. The certificate uses $314159/100000<\pi<22/7$ and $173205/200000<\sqrt3/2<173206/200000$, sine bounds of degrees seven/five and cosine bounds of degrees six/four. All target angles lie in $[0,1]$, where these alternating remainders have the claimed directions. All rational arithmetic is BigInt arithmetic with exact reduction; no displayed decimal is interpreted as an inexact binary interval endpoint.

Here is the analytical obligation connecting those endpoint tests to whole rectangles. Both $B_b$ and $d^2$ increase in $a,b$ because their partial derivatives have positive sine/cosine combinations on $1/10\le a\le1/3$, $\alpha_0-27/4096\le b\le\alpha_0$. In particular $\partial_aB_b=q_b>0$ and $\partial_bB_b=2\cos a\cos b-\sin a\sin b>0$. Thus separate numerator/denominator corners enclose $O$ even though the ratio itself need not be monotone. For $L=B_0/(2+q_0)^{3/2}$, its derivative numerator is $q_0(2+q_0)+(3/2)B_0^2>0$. For $Z$, setting $x=\alpha_0-a$ gives $Z=\sin(x/2)/(4\cos^2(x/2))$, which increases with $x$. Both derivatives of $J_b$ are positive in this rectangle. Consequently the certificate's upper $J_b$ and lower $d$ give a valid bound for both signs of prepared $\dot b$. Each ratio test squares only positive quantities: for example $L>l$ is checked as $B_0^2>l^2(d_L^2)^3$.

The acceleration is the negative sum $-(L+O/D+Z)$ because $a<b$ throughout this rectangle. Every certified row total is strictly between $9/10$ and $7/6$. The accepted earlier strip supplies the same bounds from the return down to $a=1/3$, and the accepted support result reaches that latitude before the first preparation arrives. Thus the intervals join without an uncovered latitude gap.

For the return refinement, $B^2=7/4-q^2\ge27/16$, $S'\ge15q/(16\sqrt2)$ and $S<3/4$ imply $(BS)'=(B^2S'-qS)/B>0$ for $0<q\le1/4$. At the endpoint,

$$
BS=\frac{3\sqrt3}{4}\left(\frac8{27}+\frac8{7\sqrt7}\right)<\frac{19}{20}.
$$

For an explicit rational upper test, substitute $\sqrt3<173206/100000$ and $\sqrt7>529/200$ in the helpful directions; the resulting positive rational expression is less than $19/20$. The antipodal contribution reduces deceleration on ascent. Therefore $T_*>5/19$, and the already admitted stationary returning arc gives $T_R=2T_*>10/19$. The separately accepted lower deceleration $37/40$ gives $T_R<20/37$. These return bounds remain within the established all-stationary-source domain; no time-reversal premise is imported into the later causal dynamics.

## Reached event and complete-history bootstrap

Integrating $9/10<-\ddot\alpha<7/6$ from the reached return yields the subject's speed and latitude inequalities. The rational certificate independently verifies all three latitude endpoint tests: at the horizon $u<73/114$, the lower latitude exceeds $1/10$; for $T\le9/8$, $u<91/152$ gives latitude above $4/25$; at $T=7/6$, $u>139/222$ gives latitude below $1/5$ if no earlier zero-emission event has occurred. The speed upper bound is exactly $1/4+(7/6)(73/114)=341/342<1$.

The like-pair and own-antipode roots remain stationary because their distances exceed $3/2$ and $39/20$, respectively, while $T\le7/6$. All moving sources before the target event consequently lie in the supplied preparation. The latitude and speed margins prevent the candidate solution from leaving the chart before the event or the horizon. Bounded ordinary kernels with known source data provide continuation there. Simultaneous separations are $\sqrt3\cos a$, $\sqrt{1+3\sin^2a}$ and $2$, all greater than one on this chart; the full-history speed theorem completes the partner census and excludes all self roots.

At $S=0$ the source latitude equals $\alpha_0$. The candidate distance $d_O^0(a)=\sqrt{2-(\sqrt3/2)\cos a+\sin a}$ increases with $a$. The independently certified comparisons are $d_O^0(1/5)<7/6$ and $d_O^0(4/25)>9/8$. The lower time proof can be read without circular extension beyond an unknown event: for every candidate time $T\le9/8$, the lower latitude bound remains above $4/25$, whence $d_O^0(\alpha(T))>9/8\ge T$ and an earlier zero-emission event is impossible. If no event has occurred by $7/6$, its upper latitude bound gives the opposite strict sign. The boundary residual decreases strictly, either directly from descending latitude or from the receiver sub-wake margin. This proves a reached unique first event, not merely an algebraic event condition.

The first roots are the two opposite non-antipodal labels per receiver, tied by reflection. They are distinct simple roots for distinct transmitters. The other three source classes retain a strict stationary-emission margin, and the same event repeats at each receiver under full-history symmetry.

## Signed support and the positive-emission interval

The chord bounds used in the support estimate follow from the same positive-angle rectangle: $3/2<d_L<5/3$, $d>11/10$, $J_b<21/40$, $39/20<d_A\le2$. They give $dD>11/10-21/640>16/15$. An upper bound $dD<3/2$ follows, for example, from $d<5/4$ and $\dot bJ_b\le21/160$. Therefore

$$
-\frac35<\frac35-\frac{15}{16}-\frac{10}{39}<A_n<-\frac14.
$$

The exact support formula remains $\lambda=-\dot\alpha^2-A_n$. At the reached event, its strict speed lower bound is $2297/2960$, giving

$$
\lambda(T_F)<\frac35-\left(\frac{2297}{2960}\right)^2=-\frac{96245}{43808000}<0.
$$

The broad pre-event support enclosure and local persistence of the earlier negative sign do not exclude further intervening zeros. The subject correctly keeps that question open.

For $h=10^{-6}$, the previously generated segment $0\le S\le1/1000$ is available long before $T_F$. Its speed and the prepared speeds are at most $1/4$. Under the receiver speed bootstrap $|v|<1$, $D_t\ge3/4$ and $0<S'<8/3$; the two crossing roots advance less than $8h/3$ into that known generated segment. Other roots retain stationary negative emissions. Delays start above one and decrease by less than $5h/3$. With delays above $1/2$, the five-hit field has norm below $80/3$ and the normal-constrained vector acceleration has norm below $28$. Thus speed changes by less than $28h<1/342$, closing the full-history sub-wake bound and allowing the complete method-of-steps continuation. No future curve is prescribed.

The support derivative estimate also passes. If $z$ is a source-receiver chord, $|z'|<1+(1/4)(8/3)=5/3$, so $|\hat z'|<10/3$. Source vector acceleration is below seven: prepared $|\alpha''|\le6$, $\alpha'^2\le1/16$, and the early generated source segment has smaller bounds under the admitted first-turn theorem. It follows that $|D_t'|<(8/3)7+(1/4)(10/3)=39/2$. The derivative of $z/|z|^3$ has operator norm $2/|z|^3$, rather than requiring a loose separate radial and directional estimate. Each weighted hit therefore has derivative norm below

$$
\frac{2(5/3)}{(1/2)^3(3/4)}+\frac{39/2}{(1/2)^2(3/4)^2}=\frac{320}{9}+\frac{416}{3}.
$$

Five hits give $|A'|<7840/9<872$, and projection differentiation gives $|A_n'|<899$. Finally $|\lambda'|\le2|v||\dot v|+|A_n'|<1000$. These estimates hold almost everywhere across the continuous, piecewise smooth history seam and imply the claimed Lipschitz bound. Hence the maximum support increase over $h$ is less than $1/1000$, smaller than $96245/43808000$; support stays strictly inward throughout the explicit feedback interval.

## Evidence limits and falsifiers

The known-case run checked exact rational addition and signed multiplication, sine/cosine at zero, an analytically known $3/8$ ratio inside its bracket, and rejection of an intentionally false lower bound. Its recorded pass preceded the target run. The target checks fifty table inequalities and five event/latitude inequalities using exact integer arithmetic. This verifies the specified elementary enclosure obligations; it does not numerically integrate the motion, measure an event time or independently certify a production EOM implementation. Resource cost was not profiled. Both commands terminated, and no reviewer compute lease was launched.

The result is local actual normal-constrained feedback with externally prepared history. A wrong canonical projection, failed positive-corner monotonicity, invalid table or event inequality, missing source-history segment, loss of the strict sub-wake bootstrap, or incorrect Lipschitz constant would falsify the corresponding conclusion. No support-zero count between $T_B$ and $T_F$, asymptotic stability, recurrence, energy law, free confinement or physical support mechanism is accepted. The earlier primary reference and every subject remain unmodified. Coordinator integration and separate adjudication of the reviewer's new primary continuation are separate dependencies.
