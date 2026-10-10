# Independent adjudication of the primary initial support reversal

## Verdict and frozen provenance

**Derived verdict: accepted within the stationary-source interval, with no later sign extrapolation.** The [dynamics support refinement](spherical-three-three-feedback-dynamics-support-refinement.md), frozen SHA256 `6c627ebb05fb7faac219995a6264a0573d83efa53bab63577dfb42f667a7a9ec`, proves a unique initial support zero at reached phase $1/8<\Phi_*<3/20$, its time and source margins, transversality, and inward support afterward through the first moving-preparation arrival. This is a refinement of an already selected signed-support observable, not a new evolution law or extension of motion.

The [independent support reference](spherical-three-three-feedback-review-support-reference.md), frozen SHA256 `b35e93e94975cd045ab017a5de3375df08e193936dcc8141460baa2f55f313b9`, was saved before this subject was opened. It separately derives the stationary support identity, $f_0'>3$ on a wider phase interval and an initial zero before preparation arrival. The subject's sharper lower zero bracket and explicit source/time margins are checked below by a separate reconstruction. This agreement does not certify the stronger generated-source support conclusions in that independent reference; those require the separate adjudication requested by the coordinator.

## Identity, initial constants and derivative bounds

Direct differentiation of $N=(1/4)\sum\sigma_k\csc(k\pi/6-\Phi/2)$ gives $N'=(1/8)\sum\sigma_k\cos x_k/\sin^2x_k=-f/2$. Since the actual positive signed speed obeys $u\,du/d\Phi=f/10$, integration yields $u^2=1/16+(1/5)\int f$ and $\ell=\ell_0-(3/20)\int f$. This matches the independently frozen derivation, including the centripetal contribution and factor three. It is valid exactly while all source positions are stationary. The control values $f(0)=0$, $N(0)=1/\sqrt3-5/4$ and $u(0)=1/4$ agree with direct five-site summation.

The constant bounds follow by positive squaring: $3\cdot37^2-64^2=11>0$ implies $1/\sqrt3<37/64$, and $40^2-3\cdot23^2=13>0$ implies $1/\sqrt3>23/40$. Thus $43/64<C_0<27/40$ and $3/640<\ell_0<1/200$ have the correct directions.

The independently reconstructed identity is

$$
8f'=J(\pi/6-h)+J(\pi/6+h)-J(\pi/3-h)-J(\pi/3+h)+J(\pi/2-h),
$$

with $J=2\csc^3-\csc$, $J\ge1$ and $J''>0$. The subject correctly uses convexity both to lower-bound the nearest pair by 28 and to locate its upper bound at $h=3/40$. The even sines exceed $33/40$, so their $J$ values are each below $5/2$; the middle term is at least one. This gives $f'>3$ without assuming a sign for a generic alternating sum.

For the upper bound, the nearest-pair sine floors $3/7$ and $9/16$ imply $J$ sum below $23717/729$. The central sine exceeds $99/100$, giving its $J<5/4$; both even terms are at least one. The resulting upper bound $8f'<92681/2916<32$ is correct. Therefore $3<f'<4$, and integrating from $f(0)=0$ gives $3\Phi<f<4\Phi$ on $0<\Phi\le3/20$.

Here are exact positive residuals for the critical endpoint arithmetic, obtained by direct rational subtraction after the elementary sine/cosine bounds. These are analytical integer identities, not floating-point interval displays or a phase scan:

| Comparison | Exact positive margin |
| --- | --- |
| $137355/166400>33/40$ | $3/6656$ |
| $5/2>84440/35937$ | $10805/71874$ |
| $2771/6400>3/7$ | $197/44800$ |
| $504286/896000>9/16$ | $143/448000$ |
| $3191/3200>99/100$ | $23/3200$ |
| $5/4>1019900/970299$ | $771895/3881196$ |
| $32>92681/2916$ | $631/2916$ |

The auxiliary bound $45/52<\sqrt3/2$ has squared margin $3/2704$. The sine bounds evaluate the respective endpoint extrema; none treats a cosine upper polynomial at a nonzero endpoint as a uniform upper bound near zero. All trigonometric arguments lie in the ordinary positive-sine chart, so reciprocal monotonicity is valid.

## Actual reachability, source margins and root census

The subject's local bootstrap uses the exact stationary equation until phase $3/20$ or first preparation arrival. Since $f>0$, $u>1/4$ and $\tau<4\Phi$ at every reached positive phase. For $\Phi\le3/20$, the leading distance lower bound gives

$$
d_1^0-1/4\ge1971/3200>3/5\ge4\Phi>\tau.
$$

Thus a preparation arrival cannot interrupt this phase interval. Conversely, $u>1/4$ prevents phase $3/20$ from remaining unreached through time $3/5$. The admitted continuation already covers this time range, and the local acceleration and speed bounds give the same ordinary-domain closure. This proves a reached phase interval rather than evaluating a formula on an unverified future path.

At the upper phase endpoint, $\tau<3/5$ and the leading distance bound give $d_1^0-\tau-1/4>51/3200$. Every other stationary site is farther away. The resulting source candidates lie before the preparation starts and are therefore actual roots of the complete supplied history. Uniqueness from the strict sub-wake theorem identifies them with the entire partner census. The bound $u^2<143/2000<(27/100)^2$, whose final squared margin is $7/5000$, and prepared speeds at most $1/4$ preserve that theorem. There are five ordinary partner roots per receiver and no positive-delay self roots; no root is suppressed to maintain the reduction.

## Support bracket, ordering and quantitative crossing

Dividing $\ell$ by $R=10$ and integrating $3\Phi<f<4\Phi$ gives exactly

$$
\frac3{6400}-\frac3{100}\Phi^2<\lambda(\Phi)<\frac1{2000}-\frac9{400}\Phi^2.
$$

At $\Phi=1/8$, the lower endpoint is zero, and the strict enclosure therefore proves positive support. At $\Phi=3/20$, the upper endpoint is $-1/160000$, proving negative support. The exact derivative $d\lambda/d\Phi=-3f/200<0$ proves existence and uniqueness of the zero between them. The strict source margin places it before the first moving-preparation arrival. The previously accepted domain proof keeps $f>0$ through the remaining stationary-source segment with phase below $1/4$, so the same exact derivative prevents another zero there and preserves inward support through that arrival.

The phase ordering $1/64<1/8<\Phi_*<3/20<\Phi_B<\Phi_F$ is therefore supported. The admitted positive actual speed, not a constant-speed replacement, determines the time bracket. From $u<27/100$ and $\Phi_*>1/8$, $\tau_*>25/54$. From $u>1/4$ and $\Phi_*<3/20$, $\tau_*<3/5$. Physical time multiplies these by ten, giving $125/27<T_*<6$.

At the zero, $f(\Phi_*)>3/8$ and $u_*>1/4$. Converting the phase derivative with $d\Phi/dT=u/10$ yields

$$
\left.\frac{d\lambda}{dT}\right|_*=-\frac3{2000}f(\Phi_*)u_*<-\frac9{64000}<0.
$$

The crossing is transverse, smooth and ordinary. It is a change in the signed normal acceleration needed by the constraint, not a root singularity, impulse, unsupported time interval or evidence of a physical support mechanism.

## Controls, limits and completion receipt

Analytical controls are the stationary five-site values, direct differentiation of the radial sum, and the exact rational differences above. The independently frozen support certificate had already passed its five known/negative controls before fifteen exact targets; it supports the blind reference rather than replaying this subject. No new instrument or target run was needed for this comparison. No evolution, production change, job, lease or additional agent was launched. All reviewer command sessions used for this bounded comparison returned terminal results; this is not a claim about other workers' processes. Computational reproduction cost remains unprofiled.

The subject correctly stops its sign conclusion at moving-preparation arrival. A later recrossing would not falsify this result. The separately authored reference's inward sign at generated-source feedback and on the existing short extension is a distinct, stronger theorem pending its own independent review; it is not accepted merely because this weaker subject agrees on the initial reversal.

Falsifiers include an incorrect factor in $N'=-f/2$, a failed trigonometric endpoint or rational comparison, an earlier preparation arrival inconsistent with the explicit margin, a missed root despite full-history sub-wake motion, or a second stationary-source zero despite the strict derivative. The exact preparation, canonical law, variable speed and normal-only constraint are preserved. Subject and frozen reference are unchanged; this reviewer companion is the sole new document for the comparison. The bounded adjudication is complete before 2026-10-10 15:46:11 UTC, with coordinator integration remaining separate.
