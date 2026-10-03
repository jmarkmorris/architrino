# Recrossing branches, repeated self folds and finite event accumulation

The smaller upward-birth family permits complete small excursions that return to another upward crossing. Repeated choices have two conditional consequences. Summable excursion durations produce finite event accumulation without a position turn and obstruct continuation with a finite acceleration trace. Under an additional positive affine-profile condition on the regular old roots, nonsummable shrinking durations instead give a global no-turn solution: $P$ approaches a finite limit, $v$ approaches $-1$, and $x$ decreases linearly to negative infinity. These are distinct constructions with explicitly chosen family members at every upward event.

The statement concerns allowed choices from the family at each successive upward crossing. It does not identify the fate of a numerical sample whose subsequent family choices have not been supplied. It also does not establish that every member accumulates, or that an exact held-release trajectory satisfies the hypotheses. In particular, numerical evidence of one later turn is compatible with this conditional nonturning construction.

## Selected law and complete historical state

Set $c_f=1$, $k=0.2862286103053385$, and use the symmetric positions $x$ and $-x$, with the original held history $x=1/2$ for $T\leq0$. Retain the complete multiplier-free signed linear-numerator law from [the selected comparison](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law): all positive-delay partner and self roots, their absolute source-clock derivatives, and no receiver multiplier, cap, softening, impulse, omitted source or assigned reversal. This is an exploratory law; its result does not transfer to the inverse-square Master Equation.

Write $P(T)=T+x(T)$ and $Q(T)=T-x(T)$. The two old roots are an original ascending self source $s_o(L)$, with $P(s_o)=L$, and a partner source $s_p(L)$, with $Q(s_p)=L$, where $L=P(T)$. Their acceleration is

$$
R(T,L)=k\left[\frac{T-s_p(L)}{Q'(s_p(L))}-\frac{T-s_o(L)}{P'(s_o(L))}\right].
$$

Both source derivatives are positive. The result requires a compact receiver neighborhood $U$ in which these sources remain regular with positive delays, $x<0$, and $Q$ remains above the whole earlier $P$ maximum. Assume $R$ is continuously differentiable, bounded, and strictly positive on $U$, with $R\geq h>0$. At each exact upward crossing under consideration, the preceding two-root interval has incoming curvature $B=R(T_u,P_u)>0$. Require the uniform strict threshold $B^2>4k$ on $U$. These are sufficient hypotheses on an exact supplied history, not inferred numerical equalities.

Additional small clock extrema created by the construction will be confined to levels above the newest minimum. Before choosing another excursion its maximum must lie strictly below the preceding minimum. That nested gap excludes all older small excursions from the new local root chart. It is a root-census hypothesis enforced by the excursion size, rather than suppression of historical sources.

## The first recross supplies a useful strict sign

The [independent upward-family theorem](multiplier-free-linear-upward-branch-independent-check.md#a-derived-family-counterexample-arbitrarily-early-recrossings) constructs small recrosses by following the negative side of the smaller fixed point. In its parabolic incoming limit, the variables are source distance $q=T_u-s>0$, elapsed receiver time $\tau=T-T_u$, and $z=\tau/q$. The source slope magnitude is $p(q)=-(1+v(T_u-q))=Bq+O(q^2)$. At its recross endpoint the theorem gives

$$
z_e>g_0,\qquad g_0=\frac{HB}{k}-1,
$$

where $H$ is the regular older-root acceleration at the initial upward event; an exact incoming solution has $H=B$. Therefore the single source on the descending segment immediately before $T_u$ has magnitude

$$
N_e=\frac{k(T_d-s)}{p(q)}\longrightarrow\frac{k(z_e+1)}B>H.
$$

Here $T_d$ is the next downward crossing. This is stronger than negativity of the complete acceleration: that one self contribution already exceeds the positive surviving acceleration. The strict gap persists for sufficiently small actual excursions by the smooth-history perturbation argument. Choose a fixed limiting recross section with gap $N_e-H=2c>0$ and scale it by a small positive parameter $\varepsilon$. Then its receiver duration is $O(\varepsilon)$, clock height $P(T_d)-P_u=O(\varepsilon^2)$, and velocity departure from $-1$ is $O(\varepsilon)$.

This argument proves existence of suitable family members. A particular numerical member requires its own sign check $N_e-R(T_d,P(T_d))>0$; negative total acceleration at recross alone does not establish the sufficient bound below.

## Downward birth and the complete three-self interval

At the downward crossing the incoming acceleration is negative and finite. Put $B_d=-A(T_d^-)>0$. The new self root has its source on the ascending segment between $T_u$ and $T_d$. The finite inward right trace $-b_d$ obeys

$$
b_d=B_d+\frac{k}{B_d}+\frac{k}{\sqrt{B_d b_d}},\qquad b_d>0.
$$

The left side increases and the right side decreases in $b_d$, so the root is unique. The bounded source-coordinate construction gives the immediate local continuation in the declared inward finite-trace class. Its new contribution is negative.

For $P_u<L<P(T_d)$ while $v<-1$, the complete census is one negative partner and three negative self roots. They are the original ascending source, the source on the descending segment just before $T_u$, and the new source on the ascending segment between $T_u$ and $T_d$. All three are earlier than $T_d$. The decreasing receiver interval after $T_d$ contributes only its excluded current self diagonal, because its earlier $P$ values exceed the receiver value. Thus the entire ensuing chart uses fixed history through $T_d$; it contains no hidden evolving self source.

Call the two newer self sources $s_-(L)<T_u<s_+(L)<T_d$. Their acceleration is

$$
A(T,L)=R(T,L)-k\frac{T-s_-(L)}{|P'(s_-(L))|}-k\frac{T-s_+(L)}{P'(s_+(L))}.
$$

The negative sign of both rows follows from their earlier times and negative self displacement. Positive-distance self roots are excluded by increasing $Q$; positive-distance partner roots are excluded by the global maximum gap. The law has not changed.

## A sufficient bound forces reception of the minimum fold

As receiver $L$ decreases, the source distance $q=T_u-s_-(L)$ decreases from $q_e=O(\varepsilon)$ to zero. Meanwhile $T\geq T_d$. Smoothness gives, uniformly in this small sector, $p(q)\leq Bq(1+Cq)$ with a fixed $C$. Consequently

$$
k\frac{T-s_-(L)}{p(q)}\geq\frac{k}{B(1+Cq_e)}\left(\frac{T_d-T_u}{q_e}+1\right).
$$

The right side tends to $k(z_e+1)/B>H$, whereas $R(T,L)=H+O(\varepsilon)$ on a receiver tube of size $O(\varepsilon)$. For sufficiently small $\varepsilon$ it follows that $A(T,L)\leq-c<0$ throughout that tube. The second newer self row only strengthens the inequality. In particular, a further upward crossing cannot occur before the receiver reaches $P_u$.

Put $d=-(1+v)>0$. Then $L_T=-d$ and $d_T=-A\geq c$. Starting at $T_d$, this yields $P(T_d)-L(T)\geq c(T-T_d)^2/2$. The fold level is therefore reached in at most

$$
T_f-T_d\leq\sqrt{\frac{2(P(T_d)-P_u)}c}=O(\varepsilon).
$$

Choose the receiver tube larger than this explicit bound. Its assumptions then cannot fail by an arbitrary elapsed-time exit. Complete fixed source inverses remain regular away from their endpoint folds, and the only first source event in the interval is their meeting at $P_u$.

Velocity remains bounded through the event. The exact decreasing-clock identity is

$$
d_f^2=2\int_{P_u}^{P(T_d)}[-A(T(L),L)]\,dL.
$$

For either newer source, substitution $L=P(s)$ cancels its absolute source derivative:

$$
\int_{P_u}^{P(T_d)}\frac{T(L)-s(L)}{|P'(s(L))|}\,dL=\int_{I_s}[T(P(s))-s]\,|ds|.
$$

Its source interval has length $O(\varepsilon)$ and every delay is $O(\varepsilon)$ because the receiver has just been bounded by $T_f-T_d=O(\varepsilon)$. Each integral is therefore $O(\varepsilon^2)$. The bounded old acceleration contributes the same order. Hence $0<d_f=O(\varepsilon)$. This bound derives the impulse estimate from the actual coupled receiver path; it does not substitute a prescribed velocity in the fold kernel.

At $L=P_u$ the two newer sources meet at $T_u$ and disappear. With $r=\sqrt{L-P_u}$ their acceleration has the square-root singularity

$$
A_{\rm pair}=-\frac{k(T_f-T_u)}r\left(\frac1{\sqrt{2B}}+\frac1{\sqrt{2b_u}}\right)+O(1),
$$

where $b_u>0$ is the selected smaller upward trace. The coefficient is strictly positive. The coupled regularized equations from the independent upward-family report give continuous velocity at the fold and an integrable negative acceleration singularity. A finite acceleration trace at this inherited fold is not asserted.

## The surviving roots force a lower upward minimum

Immediately below $P_u$ the two recent self roots are absent, leaving exactly the original partner and ascending self sources. All older small excursion levels exceed the current receiver level. Acceleration is therefore $R(T,L)\geq h>0$. It increases velocity from $-1-d_f$ to $-1$ in at most $d_f/h=O(\varepsilon)$, while $P$ decreases strictly. Boundedness of $R$ and its positive lower bound imply that the new minimum $P_{u,\mathrm{next}}$ is lower by a positive amount of order at most $O(\varepsilon^2)$.

The new incoming event has smooth finite curvature $B_{\mathrm{next}}=R(T_{u,\mathrm{next}},P_{u,\mathrm{next}})>0$ and the same two old roots. It satisfies the uniform two-trace threshold and hence admits the same smaller-trace family. This establishes the complete local excursion: upward birth, downward birth, inherited minimum reception, and a new lower upward birth. Its duration is $O(\varepsilon)$, clock range is $O(\varepsilon^2)$, and velocity differs from $-1$ by $O(\varepsilon)$ throughout. A position turn is excluded by taking its whole velocity tube below zero.

## Repeating the excursion gives a finite accumulation boundary

At each new upward minimum choose another sufficiently small member of the established recrossing family. Choose its maximum below the preceding minimum; this is possible because its clock height tends to zero with its freely selectable source scale. Thus the old excursion roots are absent from the next local chart, and the two fixed original sources remain its regular surviving rows.

Choose these scales further so that the duration of excursion $n$ is below $2^{-n}\delta$, its maximum velocity departure from $-1$ is below $2^{-n}\delta$, and its integrated absolute acceleration is below $2^{-n}\delta$, for a sufficiently small total budget $\delta$. The last requirement is available: on the initial recrossing interval the fixed scaled curve has finite total variation of order $\varepsilon$; between downward birth and fold acceleration is negative, so total variation equals $d_f$; between fold and upward birth it is positive, so total variation again equals $d_f$. All are $O(\varepsilon)$.

The construction stays in $U$, preserves all original positive delays and denominator margins, and has no $v=0$ turn. Its upward times increase to a finite $T_*$, its minima decrease to $P_*$, and

$$
v(T)\longrightarrow-1,\qquad x(T)\longrightarrow P_*-T_*\quad(T\uparrow T_*).
$$

The position limit is negative by the receiver neighborhood. Summable total variation and acceleration integrals supply a continuous extension of position and velocity to $T_*$ with locally absolutely continuous velocity on the closed interval. For every $T<T_*$ only finitely many events have occurred, so the earlier finite-event root equations apply. This proves an actual nonturning history through its finite accumulation boundary, conditional on the declared exact source hypotheses. It does not rely on a graph extrapolation or an arbitrary integration endpoint.

Every received minimum fold has acceleration tending to $-\infty$ from its approach side, whereas each following two-root interval has acceleration at least $h>0$. These fold times also approach $T_*$. Consequently acceleration has no finite left trace at $T_*$. Nor does the incoming $P$ history possess the isolated smooth minimum assumed by the finite-trace upward-birth construction: infinitely many nearby clock extrema remain in its retained past. These are concrete failures of that continuation theorem's domain.

The accumulation result does not prove that the complete law has no continuation in a weaker class. At $T_*$ its instantaneous regular older roots still exist, but outgoing source selection must inspect the infinite sequence of clock extrema; a finite isolated-birth formula does not apply. A continuation that merely imposes an old two-root acceleration after $T_*$ would need a new complete root census and integral proof. No such extension or physical event selection is supplied here.

## No outgoing finite acceleration trace repairs the accumulation

There is also a right-side obstruction. Suppose a continuation has continuous $x,v$, locally absolutely continuous $v$, the complete ordinary-root equation away from its root events, and a finite right acceleration trace $b$ at $T_*$. At a level below $P_*$ the entire accumulated small-excursion history lies above the receiver clock. It supplies no negative self source, and the complete acceleration is the regular $R\geq h>0$. Thus $b<0$ is impossible: the finite trace would give $P(T_*+t)=P_*+bt^2/2+o(t^2)<P_*$ and negative acceleration for all sufficiently small positive $t$, contrary to $R>0$.

If $b>0$, the same expansion makes $P$ increase strictly just after $T_*$. It crosses infinitely many old minimum levels $P_n\downarrow P_*$, at receiver times decreasing to $T_*$. At each such reception the two self sources near that old minimum are admitted on the higher-level side. Their delays are strictly positive, and their absolute weights produce the negative square-root singularity derived above. All additional self contributions are negative; the old partner contribution stays bounded in $U$. Hence acceleration is unbounded below near these reception times, contradicting a finite right trace.

The zero-trace case cannot avoid this conclusion. A finite zero trace would bound $|A|<h/2$ on a sufficiently small punctured right neighborhood. Any receiver point below $P_*$ instead has acceleration $R\geq h$, so the receiver cannot occupy that region. A nontrivial interval on $P=P_*$ would have $v=-1$ identically and an earlier continuum of equal-$P$ self sources with zero source derivative, outside the ordinary isolated-root equation; even disregarding that invalid continuum, its regular old acceleration is positive. The receiver must therefore take some levels above $P_*$ arbitrarily close to $T_*$. By continuity it crosses the old minimum levels between $P_*$ and each attained higher level. At a crossing that enters the higher side, the same negative source-fold singularity applies, even if the receiver crossing is nontransverse. This contradicts the putative bound on acceleration.

Consequently the constructed history has neither a finite incoming nor a finite outgoing acceleration trace at the accumulation boundary. It cannot be extended through that boundary within the finite-trace speed-crossing class. This is a derived nonextension result for that class. It leaves open a weaker continuation with infinitely many received folds immediately after $T_*$ and no finite trace there. The nested excursion intervals do not imply an infinite root count at every nearby fixed level: a level can intersect only one oscillation interval and its connecting descending sector. The obstruction above uses the accumulating sequence of singular receptions, not an unjustified root-count divergence.

## A uniform source normalization permits global no-turn continuation

The finite-accumulation construction deliberately chooses summable durations. A global alternative requires a uniform size estimate, because existence of an arbitrarily small excursion at each individual event does not by itself permit a prescribed nonsummable schedule. The following additional source-profile hypotheses provide that estimate.

Take a compact clock interval $I$ around the initial minimum, on which the two original inverse sources are regular. Write

$$
R(T,L)=\alpha(L)T+\beta(L),\qquad \alpha=k\left(\frac1{Q'(s_p)}-\frac1{P'(s_o)}\right).
$$

Assume $\alpha,\beta$ have bounded derivatives through order two on $I$, $\alpha\geq\alpha_0>0$, and $R(T_u,L)>2\sqrt k$ throughout $I$. Then $R(T,L)>2\sqrt k$ for all $T\geq T_u$, $L\in I$, and $R$ grows comparably to $1+T$. A sufficient pointwise condition for the first profile inequality is $0<Q'(s_p)<P'(s_o)$ with uniform derivative and gap margins on $I$. It must be verified for an application, rather than inferred from one source value.

For the exact incoming curvature $B=R(T_u,P_u)$, let $a$ denote the smaller positive root of $a(1-a)=k/B^2$. Thus $0<a<1/2$, the smaller source-coordinate fixed point is $W_*=Ba$, and $z_*=1/a$. Set $u=W/W_*$, $\xi=z-z_*$, and use the normalized logarithmic coordinate $\zeta=\log q/a$. The parabolic-source, constant-old-acceleration system becomes exactly

$$
\xi_\zeta=\frac1u-1-a\xi,\qquad
u_\zeta=a\left(\frac1u-u\right)-(1-a)\frac\xi u.
$$

At $(\xi,u)=(0,1)$ its Jacobian is

$$
J_a=\begin{pmatrix}-a&-1\\-(1-a)&-2a\end{pmatrix}.
$$

Its eigenvalues are exactly $\lambda_+=1-2a$ and $\lambda_-=-1-a$. They remain uniformly separated from zero on $0\leq a\leq a_0<1/2$. There is also an exact unstable orbit, not merely an inferred phase portrait:

$$
\xi=\frac{1-u}{1-a},\qquad
u_\zeta=-\frac{(1-u)(1-a-au)}u,\qquad 0<u<1.
$$

Substitution into both normalized equations verifies this identity. It approaches the smaller fixed point as $\zeta\to-\infty$, enters the negative-$u$ unstable direction, and reaches $u=0$ in finite normalized time after any fixed section $u=1-\theta$, $0<\theta<1$. At the endpoint

$$
z_e=\frac1a+\frac1{1-a}=\frac{B^2}k,\qquad
z_e-g_0=1,\qquad B_d=\frac kB.
$$

The logarithmic equations are singular at $u=0$, so endpoint persistence is proved in receiver time rather than by applying regular dependence to that singular chart. Since $dT/d\zeta=q/u$, the parabolic receiver-time equations are $q_T=au$, $\xi_T=(1-u-a\xi u)/q$, and $u_T=[a(1-u^2)-(1-a)\xi]/q$. They are regular at $u=0$ for $q>0$. At the recross, $q_eu_T=-(1-a)$, which is uniformly negative on $0\leq a\leq a_0<1/2$; equivalently the physical acceleration is $-k/B$. After scaling receiver time by $q_e$, ordinary continuous dependence in this regular chart preserves transversality. This gives uniform recross and single-row sign estimates even as $B\to\infty$ and $a\to0$.

The same uniform bounds survive the actual source history. On a preceding smooth two-root return segment, acceleration derivative is

$$
\frac{dR}{dT}=\alpha(L)+[\alpha'(L)T+\beta'(L)](1+v).
$$

It is uniformly bounded when $B|1+v|$ is bounded. The constructed preceding excursion has $|1+v|=O(\delta)$, where $\delta$ is its initial upward-to-downward duration, so imposing $B\delta\leq\eta$ gives this bound. The incoming source expansion is therefore $p(q)=Bq+O(q^2)$ with a uniform remainder constant. In a candidate next excursion with duration $\delta$, its relevant source distance is $q=O(\delta/B^2)$ and clock height is $O(\delta^2/B^3)$.

Write $p=Bq(1+\rho)$ and $R=B+\sigma$. The exact corrections to the two normalized equations are

$$
E_1=\frac\rho u,\qquad
E_2=\frac{\rho+\sigma/B+\rho\sigma/B}{au}.
$$

On a fixed saddle tube $u\geq u_0>0$, $|\xi|\leq C_0$, one has $\rho=O(q/B)$ and $\sigma=O(\delta+B\delta^2/B^3)$. Their derivative bounds are $\partial_\xi\sigma=\alpha(L)q$, $q\partial_q\sigma=O(\delta)$ and $q\partial_q\rho=O(q/B)$, where the $q$ derivative holds $\xi,u$ fixed. Indeed $T=T_u+q(z_*+\xi)$ and $L=P(T_u-q)$, so the derivative of $\sigma$ is the bounded time derivative times $q(z_*+\xi)=O(\delta)$ plus $R_Lqp(q)=O(B^2q^2)$. The history-only $\rho$ is independent of $\xi,u$. Since $Ba$ is comparable to $k/B$ for large $B$, these bounds give $O(B\delta)$ for the correction size and its local Lipschitz and logarithmic-source derivative bounds. The same estimate holds uniformly on the remaining compact range of $B$ above the threshold. Multiplication by $u$ cancels the displayed $1/u$ factors in the receiver-time chart used for endpoint persistence.

The corrections decay as $q$ decreases into the source endpoint. Put $m=1-2a_0>0$, and for each actual finite $B$, hence $a>0$, choose the bounded-past weight exponent

$$
\gamma(a)=\min\left(\frac a2,\frac m2\right)>0.
$$

Forcing decays at least as $e^{a\zeta}$ after shifting the terminal section to $\zeta=0$, so $\gamma\leq a/2$ places it in the weighted space. Also $\lambda_+-\gamma\geq m/2$ and $\gamma-\lambda_-\geq1$, uniformly over $0<a\leq a_0$; the eigencoordinate transformations remain uniformly bounded on the compact parameter interval. The stable and unstable integral operators therefore have uniform contraction bounds. The endpoint $a=0$ is the autonomous limiting reference, not a finite-$B$ history requiring a positive weight. One common sufficiently small $\eta$ makes the contraction and its unstable-section perturbation valid whenever $B\delta\leq\eta$. This is the needed uniform eligibility estimate, not merely a separate local existence assertion at each event.

The source neighborhood must also fit inside the preceding smooth return segment, and the new excursion maximum must be below the preceding minimum. Both requirements have quantitative strict gaps. In the parabolic limit put $\delta=T_d-T_u$, so $q_e=\delta/z_e$ and the upward clock height is

$$
h=\frac{B\delta^2}{2z_e^2}=\frac{k^2\delta^2}{2B^3}.
$$

The derivative-cancelling integral of the ascending source across its entire interval $[T_u,T_d]$ is at least $\delta^2/2$, since the receiver time is at least $T_d$. The other newer self row is negative. Hence the minimum-fold deficit satisfies

$$
d_f^2\geq k\delta^2-2Bh
=\delta^2\left(k-\frac{B^2}{z_e^2}\right)=k\delta^2\left(1-\frac k{B^2}\right).
$$

With constant old acceleration $B$, the following return lasts $d_f/B$ and lowers the clock by $d_f^2/(2B)$. Consequently

$$
\frac{h}{\text{return clock drop}}
\leq\frac{B^2}{kz_e^2-B^2}=\frac k{B^2-k}<\frac13,
\qquad
\frac{q_e}{\text{return duration}}
\leq\frac B{\sqrt{kz_e^2-B^2}}=\sqrt{\frac k{B^2-k}}<\frac1{\sqrt3}.
$$

The strictness uses only $B^2/k>4$. These gaps are uniform for $B\geq B_0>2\sqrt k$ and become larger as $B$ grows. Actual source and receiver corrections are arbitrarily small relative to these quantities under the uniform $B\delta$ bound. Thus choosing successive durations decreasing sufficiently slowly, and initially sufficiently small, preserves both nesting and coverage of the next source interval inside the preceding smooth return. The exact duration can be prescribed by varying the existing family source scale: its endpoint time is a positive constant times that scale to leading order, uniformly in the normalized system.

The upper impulse estimate already proved gives $d_f\leq C\delta$. The old positive acceleration is comparable to $B$ during the return, so its clock drop is at most $C\delta^2/B$ and its duration at most $C\delta/B$. The initial recross lasts $\delta$ by construction; the three-self interval has duration at most $C\delta$ from the strict sign bound. Total excursion duration is therefore between $\delta$ and $C\delta$, with uniform $C$. The velocity departure from $-1$ is at most $C\delta$ throughout.

Choose, for a fixed integer $N\geq2$, the decreasing duration schedule

$$
\delta_n=\frac{\delta_0}{(n+N)\log(n+N)}.
$$

Its sum diverges, but its squared sum converges. The excursion duration bounds imply $T_n$ grows comparably to $\log\log(n+N)$. Therefore $B_n$ grows comparably to $1+\log\log(n+N)$, and $B_n\delta_n$ is uniformly small after reducing $\delta_0$. The total clock drop is bounded by $C\sum\delta_n^2/B_n$, so the initial scale can be chosen to keep every minimum and maximum in $I$. The strict height and source-coverage ratios preserve the nested gaps. This closes the induction and supplies a complete global history with only finitely many events on every finite time interval.

There is no position turn: take $C\delta_0$ small enough that every excursion has $v<0$. Its decreasing minima converge to a finite $P_\infty$, its excursion heights tend to zero, and its velocity departures tend to zero. Thus

$$
P(T)\longrightarrow P_\infty,\qquad
v(T)\longrightarrow-1,\qquad
x(T)+T\longrightarrow P_\infty\quad(T\to\infty).
$$

The symmetric pair separation $-2x(T)$ grows linearly with limiting rate two in the normalized wake-speed units. This is a derived global no-turn fate for the explicitly constructed family-choice sequence, conditional on the affine-profile and exact-history assumptions. It is distinct from finite event accumulation and from a numerical finite prefix. It does not assert that the law selects this sequence, that every continuation escapes this way, or that every branch lacks a later turn.

## Scope, application and falsifiers

Claim grade: derived. Under the stated smooth fixed old-source neighborhood, positive old acceleration, strict two-trace threshold and nested excursion gaps, there exist admitted finite-event histories whose no-turn continuation accumulates at finite time and leaves the isolated smooth finite-trace birth class. Falsifiers are failure of the single preminimum self row's strict sign bound, failure of the derivative-cancelling impulse estimate, an additional admitted source under the clock gaps, loss of the coupled fold passage, or impossibility of choosing the next family scale within the previous minimum gap. Each can be checked directly in the equations above.

Claim grade: derived. With the additional regular compact affine-profile hypotheses, an explicit nonsummable schedule of admissible family choices gives a global no-turn history with $P\to P_\infty$, $v\to-1$, and $x+T\to P_\infty$. Additional falsifiers are a normalized saddle eigenvalue approaching zero within $0\leq a\leq a_0<1/2$, a source remainder failing the claimed uniform $O(B\delta)$ bound, failure of either strict nesting ratio, or loss of the affine-profile positivity on the declared compact clock interval. These would withdraw the global construction without invalidating the separately proved local small-excursion or finite-accumulation results.

The proof establishes allowed repeated choices, not the fate of every sequence of choices, and not a finite-time nonexistence theorem for all locally integrable histories. To apply its one-excursion certificate to a numerical sample, independently measure the negative preminimum self row and old $R$ at its downward recross, its source slope sector, the complete census through the minimum reception, the postfold positive-$R$ tube, and the strict threshold at its next upward event. An exact selected-release application additionally requires an exact-history existence and margin enclosure; reconstruction refinements remain measured evidence.

This report was derived without consulting the new numerical subject, its output or a new numerical implementation. The inputs were the selected-law report, the independent postfold local-family theorem, and the independent upward-family recross theorem. The parabolic incoming limit is an analytically known local reference derived from the complete law, not a prescribed substitute for the selected trajectory. Only this analysis file is within this Specialist's write scope; no oracle, production implementation, tracker, generated artifact or historical evidence was changed.
