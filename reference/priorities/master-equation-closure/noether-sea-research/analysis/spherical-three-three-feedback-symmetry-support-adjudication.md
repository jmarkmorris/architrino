# Independent adjudication of the primary support refinement

Verdict: **accepted within the already admitted interval**, for [the frozen support reference](spherical-three-three-feedback-review-support-reference.md), SHA-256 `b35e93e94975cd045ab017a5de3375df08e193936dcc8141460baa2f55f313b9`. This adjudication uses direct kernel differentiation and separately chosen rational radial bounds; it neither assumes the subject's radial table nor replays its certificate. No dynamics support subject was read. Earlier subjects, instruments, references and the coverage audit remain unchanged. No motion is extended beyond the admitted $\delta\tau=1/10000$ feedback interval.

## Kernel and inherited domain

The canonical reconstruction is as follows. In the instantaneous receiver frame, a retarded source at angle $2x$ gives unit chord $(\sin x,-\cos x)$, physical distance $2R\sin x$, polarity product $(-1)^k$, and source tangent dot chord $-\cos x$. Thus $D_t=1+v\cos x$ and the dimensionless tangent/radial contributions are $-(-1)^k\cos x/(4\sin^2xD_t)$ and $(-1)^k/(4\sin xD_t)$. With $g=1/10$, $q''=F/10$ and $\ell=R\lambda=-u^2-N/10$. Receiver playback is absent from the acceleration weight.

The already accepted [reached-feedback adjudication](spherical-three-three-feedback-review-dynamics-feedback-adjudication.md) supplies the complete root ledger, $q<29/80$ before feedback, $3/4<\tau_F<1$, lower comparison $q>\tau/4-3\tau^2/40$, partner delays greater than $2/3$, and exactly one possibly nonstationary source per receiver. The other four remain stationary through the existing feedback interval. That fact is supported there by constructing their stationary-source roots with a strict preparation margin, not just by comparing instantaneous distances. All thirty directed partner roots are ordinary and no positive-delay self root occurs. This review uses those admitted motion premises and checks the new support claims; it does not manufacture a new trajectory.

## Independent static-field derivative bounds

For the old stationary sites set $h=q/2$, $a=\pi/6$, $b=\pi/3$. Differentiating the signed tangent contributions in the canonical formula gives

$$
8f_0'=J(a-h)+J(a+h)-J(b-h)-J(b+h)+J(\pi/2-h),\qquad
J(x)=2\csc^3x-\csc x.
$$

A second direct differentiation gives $J''=(24-20\sin^2x+\sin^4x)/\sin^5x>0$. Thus the nearest pair is at least $2J(a)=28$, and the central term is at least one. The middle pair increases with $h$, by convexity. At the largest required $h=3/16$, its sine arguments satisfy $\sin(b-h)>3/4$ and $\sin(b+h)>15/16$. For the minus sign, use $\cos h\ge1-h^2/2$ and $\sin h\le h$; for the plus sign use the same cosine lower bound and $\sin h\ge h-h^3/6$, with $\sqrt3/2>19/22$. These are sign-correct independent bounds. The decreasing function $2/s^3-1/s$ then bounds the middle pair by $92/27+4592/3375<5$. Therefore $f_0'>3$ throughout $0\le q\le3/8$, and $f_0(q)>3q$ for $q>0$.

A separate simple upper bound suffices for the early zero. On $q\le1/4$, $\sin(a-h)>3/8$ makes $J(a-h)<952/27<36$; $J(a+h)\le14$ and $J(\pi/2-h)<2$. Dropping the two subtracted positive terms gives $f_0'<13/2<33/4$. This independently supplies the weaker upper bound used by the subject. None of these are small-phase series approximations to the field; the elementary sine/cosine inequalities bound the entire indicated interval.

## Positive actual tangent acceleration before feedback

For the one moving leading source, put $x=x_0+p(s)/2$, $x_0=a-q/2$ and

$$
A(x,v)=\frac{\cos x}{4\sin^2x(1+v\cos x)}.
$$

All other terms are exactly their static values. When $v\le0$, the preparation phase $p\le0$ gives $x\le x_0$, so $A(x,v)\ge A(x,0)\ge A(x_0,0)$. Hence $F\ge f_0(q)>0$.

When $v>0$, differentiating the preparation polynomial shows $s>-1/16$. With delay greater than $2/3$, this implies $\tau>29/48$. The admitted increasing lower comparison then gives $q>3/25+563/153600>3/25$. The logarithmic derivative of $A$ in $x$ is $-2\cot x-\sin x/[\cos x(1+v\cos x)]<0$; its derivative in $v$ is negative. Since $v\le1/4$,

$$
F\ge f_0(q)-\mathcal R(q),\qquad
\mathcal R=A(x_0,0)-A(x_0,1/4)<\frac15A(x_0,0).
$$

For $q\le1/5$, $\sin x_0>2/5$ gives $\mathcal R<5/16$. For $q\le3/8$, a separate bound avoids the subject's prior rational certificate: $x_0>1/3$, since $\pi>25/8$, so $\sin x_0>13/40$ and $\cos x_0<19/20$. Thus $A(x_0,0)<380/169<9/4$, giving $\mathcal R<9/20$.

This independently proves the three lower bounds $F>3q$ for $0<q\le3/25$, $F>3q-5/16$ for $3/25\le q\le1/5$, and $F>3q-9/20$ for $1/5\le q\le3/8$. They are strictly positive. Thus $u>1/4$, $q>\tau/4$ before and at feedback. Integrating $d(u^2)/dq=F/5$ on the monotone phase gives exactly the subject's three continuous lower speed-square functions. Their derivatives are positive on their respective bins; no conserved history-energy quantity is invoked.

## Reached initial support zero

Only before the first preparation arrival, direct differentiation of the radial kernel gives $N_0'=-f_0/2$. Combining this with $d(u^2)/dq=f_0/5$ proves

$$
\ell(q)=\ell(0)-\frac3{20}\int_0^qf_0(z)\,dz,\qquad
\ell(0)=\frac1{16}-\frac1{10\sqrt3}.
$$

The independently recovered upper bound $f_0<(33/4)q$ gives $\ell(1/64)>7/1520-99/655360>0$. The lower bound $f_0>3q$ gives $\ell(3/20)<919/16000-3/52=-53/208000<0$. The square-root comparisons $\sqrt3>19/11$ and $\sqrt3<26/15$ have the helpful directions stated here.

Reachability precedes use of the sign test: at the first preparation arrival, $\tau_B=d_1^0(q_B)-1/4\ge3/4-q_B$ and the newly proved $q_B>\tau_B/4$ imply $q_B>3/20$. Both test phases therefore lie in the actual stationary-source interval. Strict phase increase and $d\ell/d\tau=-(3/20)u f_0<0$ prove exactly one transverse outward-to-inward support zero before $\tau_B$, at phase in $(1/64,3/20)$. The identity is not used afterward.

## Independently bounded radial sum at feedback

At feedback the leading source has phase zero and velocity $1/4$, while four source velocities vanish. Direct substitution into the radial kernel gives the subject's $N_F(q)$. Its phase satisfies $3/16<q_F<29/80$. The five term extrema are obtained by differentiating their sine denominators; for the leading term, $\sin x(1+\cos x/4)$ increases in its relevant interval because its derivative is $\cos x+\cos(2x)/4>0$. Thus the negative leading and central terms take their largest magnitudes at the upper phase endpoint, the negative trailing term at the lower endpoint, the positive second term its minimum at the lower endpoint, and the positive fourth term its minimum at the upper endpoint.

Here are independently chosen, deliberately rounded exact rational term bounds. Entries in the negative columns are upper magnitude bounds; entries in positive columns are lower bounds. Decimal notation denotes exact terminating rationals, not measured target values.

| Phase bin | Leading negative | Trailing negative | Central negative | Second positive | Fourth positive | Resulting lower $N_F$ |
| --- | --- | --- | --- | --- | --- | --- |
| $[3/16,1/4]$ | $0.530$ | $0.435$ | $0.253$ | $0.300$ | $0.270$ | $-0.648>-13/20$ |
| $[1/4,29/80]$ | $0.604$ | $0.414$ | $0.255$ | $0.313$ | $0.265$ | $-0.695>-7/10$ |

The following sufficient endpoint inequalities make this table reproducible independently of the subject's certificate. On the first bin use $\sin(a-1/8)>387/1000$, $\cos(a-1/8)>23/25$, $\sin(a+3/32)>23/40$, $\cos(1/8)>99/100$, $\sin(b-3/32)<5/6$, and $\sin(b+1/8)<25/27$. On the second bin use $\sin(a-29/160)>671/2000$, $\cos(a-29/160)>47/50$, $\sin(a+1/8)>151/250$, $\cos(29/160)>983/1000$, $\sin(b-1/8)<399/500$, and $\sin(b+29/160)<943/1000$.

These follow by the addition formulas with $86602/100000<\sqrt3/2<86603/100000$, alternating sine bounds through degrees seven/five and cosine bounds through degrees six/four for $h\le29/160$. All arguments and denominators are positive. For example, the second-bin leading denominator exceeds $4(671/2000)(1+47/200)=165737/100000>250/151$, giving its magnitude below $151/250=0.604$. The second-bin trailing term is below $125/302<0.414$; the central term below $250/983<0.255$; the positive terms exceed $125/399>0.313$ and $250/943>0.265$. The first-bin analogous positive-denominator comparisons give the displayed bounds. These are separate interval inequalities, not evaluations at an assumed trajectory phase.

The speed-square lower functions at the two bin starts are $881/12800$ and $287/4000$, respectively. Their monotonicity and the independently reconstructed radial bounds yield

$$
\ell_F<-\frac{49}{12800}\quad\hbox{or}\quad\ell_F<-\frac7{4000},
\qquad \lambda_F<-\frac7{40000}.
$$

Thus the subject's uniform inward event bound passes.

## Existing generated-source interval and derivatives

The inherited interval has $0\le s_1\le3/10000$, four stationary partners, $|u|<1/2$, delays $d>7/10$, $D_t>1/2$ and $s'<3$. The early generated source phase is below $1/10000$: the admitted upper comparison $q(s)<s/4+9s^2/80$ already proves this for $s\le3/10000$. Its scalar acceleration is then below $(33/40)/10000$ and its squared speed below $1/4$, so its vector acceleration is below one. This right-hand generated-source bound is not applied to the preparation acceleration six at $s=0^-$.

For the dimensionless chord, $|z'|<2$, $|\hat z'|<20/7$, and $|D_t'|<3+(1/2)(20/7)=31/7$. Differentiating the radial hit directly gives $|N'|<4100/49$. Independently, five vector hit magnitudes give $|F|<1000/49$ and hence $|u'|<100/49$. Therefore $|\ell'|<510/49<11$. Support is continuous at the seam and piecewise differentiable with this right-hand bound; integration proves

$$
\ell<-\frac7{4000}+\frac{11}{10000}=-\frac{13}{20000},\qquad
\lambda<-\frac{13}{200000}<0
$$

on the entire already admitted feedback interval. Emission is strictly positive after the left endpoint and zero at it.

For precision about the phrase “speed increasing through feedback,” the subject's displayed positivity proof explicitly reaches $\tau_F$. The following independent derivative bound also confirms positivity throughout its existing extension. At $q_F>3/16$, the pre-event piecewise bounds give $F_F>3/20$. On the open generated-source interval, differentiating the vector kernel gives $|A'|<5[4/((7/10)^3(1/2))+(31/7)/((7/10)^2(1/2)^2)]=102000/343$. Differentiating its tangent projection adds less than $(1/2)(1000/49)$, so $|F'|<310$. Continuity at the seam implies $F>3/20-310/10000>0$. Thus actual speed remains strictly increasing throughout this same interval without extending the motion domain.

## Verdict and limitations

Accepted: positive actual tangent acceleration through the retained feedback interval; one reached initial support zero before moving preparation; inward support at first generated-source feedback; and inward support throughout the existing $1/10000$ dimensionless extension. The proof independently reconstructs the whole-interval restrictions, extrema and derivatives; no certificate replay or new target instrument was used.

Additional support zeros in $(\tau_B,\tau_F)$ remain unresolved. The stationary first integral cannot decide them, and endpoint negativity does not exclude an intervening excursion. No physical energy, confinement mechanism, recurrence or asymptotic stability is inferred. Falsifiers are a wrong canonical projection, a failed endpoint polynomial inequality, an invalid monotonicity or source-velocity restriction, a loss of an inherited root margin, or incorrectly using left preparation acceleration on the right generated-source segment. This bounded review is complete for coordinator integration, with all prior files preserved.

Measured preservation: opening and closing `shasum -a 256` reproduced support-reference identity `b35e93e94975cd045ab017a5de3375df08e193936dcc8141460baa2f55f313b9`; the closing check also reproduced coverage-audit identity `4102f420c9368fc8437459d0d6e31d17467c5e35e7e9f8e38dbd3bc0298546ac` and meridional-subject identity `21a7155362c41dd506d2be8c9a9a0408dfbc19e5b281f540594432c591bd11ba`. The explicit new-file `git diff --no-index --check /dev/null` emitted no whitespace diagnostics (exit 1 denotes the file difference). Both linked feedback sources were read for this adjudication. These are scoped identity/hygiene checks; the independent mathematics is the direct differentiation and alternate rational bounds above. No instrument, target run, numerical evolution, scientific process or lease was created; costs remain unprofiled. The result is returned before the selected 15:46:11 UTC cutoff, with no further motion or exploration undertaken.
