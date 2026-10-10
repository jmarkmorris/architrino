# Independent adjudication of primary reached feedback

## Verdict, frozen identities and scope

**Derived verdict: accepted, with strict positive-emission inequalities understood on the open-left interval after the event.** The [dynamics reached-feedback subject](spherical-three-three-feedback-dynamics-reached-feedback.md) has SHA256 `d1a59cab071dbb6aa597f94777651b97745c50e310c6ac33bdcdcef5af884e85`, reproduced by `shasum -a 256`. The independently frozen [primary reference](spherical-three-three-feedback-review.md) retains SHA256 `18d42daa1055c4ad56ce782944c27c69082f4c7ad188bae8b5af60952a1f8d4f`. That reference was completed before reading new worker subjects; it separately derives the full delayed scalar law, complete-root admission, reached feedback and a nonzero generated-source continuation. Agreement with its conclusion alone is not the evidence for the subject's sharper claims. The reconstruction below separately verifies the subject's tighter signed kernel bounds, lower event bracket and nonleading stationary-history identification.

The accepted subject result is $3/4<\tau_F<1$ and an actual normal-constrained continuation of length $\delta\tau=1/10000$, with one positive-emission partner per receiver for $\tau_F<\tau\le\tau_F+\delta\tau$, four stationary-source partners and no positive-delay self roots. At $\tau=\tau_F$ the leading emission is exactly zero; any strict displayed positive-emission inequality has this necessary endpoint convention. Physical units are $T=10\tau$: $15/2<T_F<10$ and interval length $1/1000$. The support enclosures pass but do not determine a later sign itinerary.

## Separate kernel reconstruction

The frozen reference derives the canonical tangent contribution $-(-1)^k\cos x_k/(4\sin^2x_kD_{t,k})$ and radial contribution $(-1)^k/(4\sin x_kD_{t,k})$, with $x_k=k\pi/6+[p(s_k)-\Phi]/2$ and $D_t=1+p'(s_k)\cos x_k>0$. The root derivative is $s'=D_r/D_t$; $D_r$ is absent from the acceleration weight. The five source phases and velocities must be bounded independently, as the subject does.

Under its pre-feedback bootstrap, $h_k=(\Phi-p(s_k))/2\in[0,1563/8192]$, strictly below $H=49/256$. The individual contribution signs follow from half-angle positions: positive for $k=1,3,4$ and negative for $k=2,5$, with the possible zero central contribution at $h_3=0$. Non-strict positivity at that endpoint has no effect on the strict upper and lower total bounds.

For the leading source, $\sin(\pi/6-h)$ decreases and $\cos(\pi/6-h)$ increases with $h$, giving the subject's lower $L$ and upper $U$ at $h=H$. For the trailing source, $\sin(\pi/6+h)$ increases and $\cos(\pi/6+h)$ decreases, giving upper $V$ and lower $C$. For source two, $\sin(\pi/3-h)$ decreases and $\cos(\pi/3-h)$ increases, giving the same lower $C$ and upper $V$. These extrema justify using the cosine polynomial upper bound $c_+$ at $H$; it is not assumed to bound $\cos h$ from above at smaller $h$.

The transmitter bounds are also sign-sensitive. Positive cosine gives $D_t\ge15/16$. Source four has negative cosine with magnitude at most $1/2$, so $D_t\ge7/8$. Source five has negative cosine and $p'\ge-1/16$, so $D_t\le17/16$ for the lower bound on its negative contribution's magnitude; for its upper magnitude bound, $p'\le1/4$ and $|\cos x_5|<7/8$ give $D_t>25/32$. Source three obeys $D_t\ge1-H/16$. Thus no inequality silently removes the prepared transmitter velocity.

The resulting bounds are

$$
F_1<12/5,\quad -28/25<F_5<-2/5,\quad 0\le F_3<1/19,
\quad 0<F_4\le4/21,\quad -1/3<F_2<0.
$$

Consequently $-109/75<F<895/399$, which is strictly inside $(-3/2,9/4)$. The discarded terms have the helpful signs in each direction. These are bounds on the canonical actual-history kernel over the whole bootstrap rectangle, not sampled trajectory values.

## Exact rational control and target receipt

The [separately authored rational checker](../evidence/spherical-three-three-feedback-review-primary-rationals.mjs) uses only exact BigInt fractions. Its [control receipt](../evidence/spherical-three-three-feedback-review-primary-rationals-controls.json) records four known checks before its [target receipt](../evidence/spherical-three-three-feedback-review-primary-rationals-target.json): $1/2+1/3=5/6$, signed multiplication, a true strict comparison and rejection of a false one. It is not a dynamics solver or a replay of a subject instrument; the subject supplied analytical inequalities only.

All seventeen target residuals are strictly positive. In particular the four principal rational margins are

$$
9L^2-U=\frac{59097736871}{15461882265600}>0,
$$

$$
10C-17V^2=\frac{103168707673634234480921}{826414134502187912396800}>0,
$$

$$
5C^2-4V=\frac{646563030429}{4209067950080}>0,
$$

$$
4c_-^2(1-H/16)-19H=\frac{3025214756111}{17592186044416}>0.
$$

The bounds use positive constants and elementary trigonometric inequalities with known directions; the exact arithmetic certificate checks their rational consequences. It does not replace the geometric extrema and sign arguments above.

Measured evidence identities by `shasum -a 256`: checker `359d88c7c9bb1642c5b81e9430d84de1899adfeaf6abd69d1006c31c149ef67a`; controls `924a6e22219d4d38d58c3d0f0d5608d0f6f77b5221c0c416581fe2034fe98a84`; target `69c68b4a89d619cf466a7d70020ebe63e3d292d00dbe625ff3a8ad2a2b4af991`. Both short command sessions returned exit zero. No compute lease or trajectory job was launched; scientific reproduction cost was not profiled.

## Reached event and closed history domain

Integrating $-3/20<u'<9/40$ gives the displayed comparison functions. At $\tau\le1$, $1/10<u<19/40<1/2$ and $\Phi<29/80<3/8$, closing the provisional speed and phase boundaries. The full supplied and generated history therefore remains strictly sub-wake. The independent path-length theorem supplies one partner root each, delays greater than $2/3$, no self roots and positive root derivatives. The nonpositive-time source functions are known and locally Lipschitz, so these compact margins prevent ordinary continuation failure before the event or the horizon.

For positive phase below $3/8<\pi/6$, the leading release site is uniquely nearest. Its zero-emission boundary is $d_1^0(\Phi)-\tau=0$, with derivative $-u\cos(\pi/6-\Phi/2)-1<0$. If no root reaches release by time one, positive phase would give $d_1^0<1$, contradicting negative emission. For any candidate event at $\tau\le3/4$, the upper comparison gives $\Phi\le321/1280$. The decreasing lower chord bound $1-7\Phi/8-\Phi^2/8$ then exceeds $3/4$ by the exact margin $297599/13107200$. No such earlier event exists. This establishes the reached bracket without presuming the trajectory beyond its admitted first event.

## Four stationary nonleading sources

The increasing lower phase comparison on $[0,1]$ gives $\Phi_F>93/640$. The release-site gap between trailing and leading nearest sources is exactly $2\sqrt3\sin(\Phi_F/2)$ and increases throughout this chart. The lower bounds $\sqrt3>19/11$ and $\sin x\ge x-x^3/6$ yield

$$
2\sqrt3\sin(\Phi_F/2)>
\frac{38}{11}\left[\frac{93}{1280}-\frac16\left(\frac{93}{1280}\right)^3\right]
=\frac{501}{2000}+\frac{6309003}{23068672000}>\frac{501}{2000}.
$$

At the reached event $\tau_F=d_1^0$, the stationary trailing-source candidate thus has emission $s_5=\tau_F-d_5^0<-501/2000=-1/4-1/2000$. This is inside the stationary preparation, so the candidate is a root of the actual history law. Complete-history uniqueness makes it the actual root. The other three nonleading release distances are larger on this phase chart, hence their stationary candidates are earlier still and satisfy the same argument. This constructive candidate check is essential: a release-position distance alone would not identify a moving-preparation root.

All root emissions increase strictly along the admitted trajectory. Once their actual values at $\tau_F$ are shown to lie below $-1/4$, those four roots could not have entered preparation earlier. Thus precisely the leading partner traversed moving preparation before the first feedback event, even though the earlier uniform kernel bounds correctly allowed all five sources to have independent prepared phases.

## Generated-source continuation and support

Over $\delta\tau=1/10000$, bootstrap $|u|<1/2$ and delays above $7/10$. Whole-history source speeds below $1/2$ give $1/2<D_t,D_r<3/2$ and $1/3<s'<3$. Delay decreases by less than $2\delta\tau$, leaving it above $3/4-1/5000>7/10$. The five-hit bound $|F|<1000/49$ changes $u$ by less than $1/4900$. Its upper bound remains below $1/2$ by $243/9800$, and its lower bound stays positive. Phase increases by less than $1/20000$, leaving a margin $249/20000$ below $3/8$. These strict improvements close the whole interval.

For every time strictly after its left endpoint, the leading emission satisfies $(\tau-\tau_F)/3<s_1<3(\tau-\tau_F)\le3/10000$. The source segment was already generated near release, since $\tau_F>3/4$. The four nonleading roots can advance by less than $3/10000$, smaller than their preparation margin $1/2000$ by $1/5000$. They therefore remain stationary throughout. The solution is an actual known-history method-of-steps continuation, and the full sub-wake theorem keeps exactly thirty directed partner roots and no self roots. The release seam reads continuous position and velocity; its acceleration mismatch permits a derivative jump, not an impulse.

For support, the exact formula $\ell=-u^2-(1/10)N$ and physical $\lambda=\ell/10$ agree with the frozen independent reduction. Before feedback, $d>2/3$, $D_t\ge3/4$ imply $|N|<5$. Together with $u^2<1/4$ this gives $-3/4<\ell<1/2$ and $-3/40<\lambda<1/20$. On the added feedback interval, $d>7/10$, $D_t>1/2$ imply $|N|<50/7$, giving $-27/28<\ell<5/7$ and $-27/280<\lambda<1/14$. The asymmetric lower endpoints include the centripetal term. Neither enclosure identifies a support sign. Initial outward support and its already accepted persistence through phase $1/64$ remain valid local facts; an old-source integral cannot propagate them through moving preparation or positive emissions.

## Remaining selected obligation and falsifiers

The useful remaining quantitative support obligation is to determine the primary signed support after the admitted initial outward interval: does a zero occur before first feedback, at the event, or on its proved generated-source continuation, and what event ordering can be established? The current exact observable and complete-root domain support that bounded question, but this adjudication does not select or perform new continuation, evolution or an unbounded search. If no support refinement is selected, the accepted account must retain the two-sign enclosures and unresolved zero itinerary.

A reversed transmitter inequality, a failed rational residual, a nonleading stationary candidate outside the supplied stationary domain, a violated phase/speed bootstrap, a missing partner or self root, or use of an ungenerated future source segment would falsify the corresponding result. No all-time motion, free confinement, physical support provider, energy law, recurrence or stability is accepted. The subject and independent reference remain unchanged; only this reviewer companion and its exact arithmetic evidence were added. This completes the routed final comparison for the batch, with coordinator synthesis and any further scientific selection separate.
