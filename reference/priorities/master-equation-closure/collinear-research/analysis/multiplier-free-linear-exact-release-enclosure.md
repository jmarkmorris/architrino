# Exact held release, causal-event charts and an enclosure route

The exact held release is independently certified through its first downward self birth, supersonic contact, integrable inherited partner fold and first upward self birth. The resulting source and curvature margins meet the admitted smaller-family fate theorem. Thus the unchanged multiplier-free law admits global histories with no later outer turn, and other admitted choices yield finite event accumulation obstructing continuation in the declared finite-one-sided-acceleration-trace class. The historical numerical $c_0=-0.03$ member remains separately uncertified; the theorem does not select a unique future for that sample.

The terminal smaller-family parameter $c_0=-0.03$ can specify one exact local member once its event-relative coordinate and exact eigenbasis are fixed and the bounded-past contraction is certified. The finite-cutoff BVP currently used numerically does not, by itself, certify that exact member: it replaces a nonzero stable forced tail by zero and starts from an approximate retained history. This report derives quantitative bounds for both gaps. It supplies a completed exact initial slice and implementable a posteriori lemmas; it does not claim a completed enclosure through the first upward birth.

## Selected equation and exact parameter interpretation

Use the unchanged selected multiplier-free signed linear-numerator law, held $x=1/2$, $v=0$ for $T\leq0$, all admitted positive-delay partner and self roots, absolute source weights, and $c_f=1$. The prescribed value $k=0.2862286103053385$ is interpreted here as the exact decimal rational $2862286103053385/10^{16}$. If the intended exact constant is instead another mathematical expression, that definition must replace this rational consistently; a floating field by itself does not choose an exact-real interpretation.

For each negative-distance partner root $Q(s)=P(T)$ its acceleration is $+k(T-s)/|Q'(s)|$; for each negative-displacement self root $P(s)=P(T)$ it is $-k(T-s)/|P'(s)|$. The other two clock families have the corresponding signs from their admitted displacement. Write $P=T+x$ and $Q=T-x$. No receiver factor, cap, softened core, impulse, selected rebound or source deletion is introduced. These certificates concern this exploratory law and do not establish the inverse-square Master Equation.

## Completed exact slice: stationary sources through the first release join

While the partner emission time is in the held past, the distance is $x(T)+1/2>0$, its absolute source weight is one, and its unique emission time is $s=T-x(T)-1/2$. There is no earlier self hit while both clocks increase. The complete equation therefore reduces to $x''=-k(x+1/2)$ with the exact release data. Its unique solution is

$$
x(T)=\cos(\sqrt k\,T)-\frac12,\qquad
v(T)=-\sqrt k\sin(\sqrt k\,T).
$$

The stationary-source chart ends when $s=0$, equivalently at the root

$$
T_0=\cos(\sqrt k\,T_0).
$$

This is a unique root in $(22/25,9/10)$. On $[0,9/10]$, $\sqrt k\,T<1/2$, and $f(T)=T-\cos(\sqrt k T)$ has derivative $1+\sqrt k\sin(\sqrt kT)>0$. At $T=22/25$ the alternating cosine lower bound $1-kT^2/2$ exceeds $T$; at $T=9/10$ its upper bound $1-kT^2/2+k^2T^4/24$ is below $T$. All these inequalities reduce to rational arithmetic using the exact stated $k$. Thus the bracket and uniqueness require no floating root service.

For the whole interval through the join, $x\geq1-k(9/10)^2/2-1/2>0.38$ and $|v|\leq kT<0.258$. Hence $P',Q'>0.742$, the partner displacement stays positive, both source-clock families are monotone and no nontrivial self root exists. The held partner source is strictly earlier until its regular join at $s=0$, where its derivative is still one. The acceleration joins continuously to the emitted-source equation. These bounds certify the complete census and absence of contact, turn or speed crossing on this slice.

Claim grade: derived. The exact held release reaches its first regular emitted-source join in $(22/25,9/10)$ with the explicit solution and clock floors above. Falsifiers are an additional admitted source under those strict monotonicities, failure of the rational endpoint inequalities, or failure of the displayed solution to satisfy the complete held-source acceleration and release data.

An executable certificate can store rational lower and upper cosine/sine series, the endpoint signs and derivative floors. It should first pass independently known series/root brackets, then report this exact slice separately from any later uncertified numerical prefix. Binary64 sine/cosine and a small reported residual would be measurements, not this certificate.

## Executed exact-arithmetic continuation beyond the source join

The separately authored [exact-release enclosure script](../../../../../scripts/collinear-research/linear-exact-release-enclosure.py) implements exact `Fraction` arithmetic with outward dyadic projection at 96 bits after every interval operation. Alternating rational cosine and scaled-sine partial sums enclose the analytic source functions; rational bisection encloses the source join. It gives

$$
0.889007965517<T_0<0.889007965518.
$$

The first accepted exact-source run with meaningful known controls uses $h=1/1000$ and interval Picard inclusion through $T=7/5$. Its outward endpoint enclosures are

$$
0.230552695322<x(7/5)<0.230761845709,
$$

$$
-0.373791621175<v(7/5)<-0.372918084647.
$$

All of its 520 cells keep the admitted source below $22/25$, where the history is analytically exact, and preserve the complete one-positive-partner/zero-self census. The receipt is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T201927.366113Z/certificate.json`; its exact rational endpoints, arithmetic model, source intervals and cell inclusions carry the certificate, while the displayed decimals are outward presentation bounds. An independent reviewer checked this interval Picard construction against a separately derived analytic bootstrap through $T=1$. Initial arithmetic-control precedence errors were repaired before this run; later controls forbid interval truthiness and reject invalid zero-crossing division explicitly. Earlier receipts are preserved and are not the current certificate basis.

The deeper retained-history implementation encloses each completed cell by its integral position and velocity formulas, and isolates the complete monotone clock inverse against these enclosures. Near contact it uses the cancellation estimate below instead of a false positive delay floor. A first $h=1/1000$ retained run reached about $T=6.8957$, with position width about $0.0814$ and velocity width about $0.1255$, before a broad contact tube failed inclusion after 16 local halvings. That failure is interval wrapping and a conservative velocity tube, not a physical event obstruction. A subsequent slower run was interrupted without a final certificate; its progress messages are not a completed prefix receipt.

The completed repaired $h=1/2000$ run retains 21,801 accepted cells and certifies the exact ordinary solution through $T=771154223/65536000$, approximately $11.7668796234$. Its outward endpoint enclosures are

$$
x\in[0.679425564539,2.025202618723],\qquad
v\in[-0.999999972380,-0.333306168559].
$$

The receipt is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T204525.534568Z/certificate.json`; its frozen `subject.py` has SHA-256 `d7c39588af7c57f5cec1805d488c5b60cf8f7528892d5c68282c88b3b39623b5`. It records each whole-cell contraction product, source floor, source acceleration bound, complete census and integral endpoint. The run took 876.849 seconds by its instrument wall timer. Its final attempted step $1/65536000$ loses the current subcritical velocity tube after 16 halvings. The already enclosed exact velocity remains above $-1$; failure to extend the box is not a speed-event certificate or a physical obstruction. An independent read-only review checked its range aggregation, integral velocity bounds and separated-source contraction against the derived bounds below.

Known-controlled extraction of strict signed endpoint markers from this receipt yields the following event brackets. Acceleration is negative for positive position and positive for negative position, so the consecutive sign sectors establish the corresponding contact and turn uniqueness.

| Event | Exact decimal bracket |
| --- | --- |
| First contact $x=0$, inward | $[1.9415,1.943]$ |
| First turn $v=0$, negative position | $[4.7485,4.7665]$ |
| Second contact $x=0$, outward | $[6.92,6.977]$ |
| Second turn $v=0$, positive position | $[10.0565,10.8655]$ |

The interval boxes widen substantially after the second contact: by $T=8.328$ the position width is about $0.23639$, despite every cell being enclosed. Smaller last steps cannot remove inherited uncertainty. A fixed-past incoming auxiliary therefore tests whether this completed history still suffices to bracket the first speed event. Its improved exclusion ledger retains the lower bound of $P(s)=s+x(s)$ over every newly emitted auxiliary cell, and compares their minimum to the receiver target's upper bound. This is stronger than imposing the simple sufficient $h<2\chi$ condition throughout a long auxiliary interval.

The final auxiliary receipt is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T210245.901805Z/certificate.json`, with frozen subject SHA-256 `639333eb4b0e654f2c52874301a2d42be57117d0b9de4c226356563ed065b021`. Its 538 accepted cells reach $T=806412591/65536000$, approximately $12.3048796234$, in 27.226 seconds. They enclose only the partner-only auxiliary after a possible speed crossing. The endpoint has $x\in[0.001366809357,1.798634053352]$ and $v\in[-1.610784344402,-0.497339557776]$; it does not bracket the first speed crossing. The next position tube has lower endpoint $-0.000633190643$, so the positive-position auxiliary chart fails before a strict $v<-1$ endpoint is enclosed. This is a quantified enclosure boundary. The first attempt, with only the stronger-than-needed global $h<2\chi$ condition, is preserved separately and is superseded as a boundary assessment.

Claim grade: derived enclosure conditional on the audited interval arithmetic and per-cell inclusion proof. The displayed endpoints and event brackets are outputs of the named certificate and known-controlled marker extraction. Falsifiers include a frozen-subject hash mismatch, any cell failing its recorded outward inclusion/contraction inequality, a missing historical source sector, or a signed marker outside the exact solution enclosure. Neither the ordinary wrapping boundary nor the auxiliary chart failure decides the selected law's first birth or ultimate fate.

Final independent acceptance is recorded in [the independent check](multiplier-free-linear-exact-release-independent-check.md). A separately authored exact-`Fraction` checker, after a known passing case and a rejected bad case, checked all 21,801 ordinary cells for chaining, state continuity, contraction, subcritical tubes, source derivative positivity, Picard inclusion and integral endpoint containment. It also checked all 538 auxiliary cells for positive receiver position, $|v|<2$, negative acceleration, fixed earlier positive-delay source, positive source derivative, strict newly emitted $P$ gap and contraction, after its known pass and rejected zero-gap control. Both frozen hashes and the auxiliary input-subject hash matched. This acceptance confirms the declared finite certificate slices and the auxiliary's incomplete crossing status; it does not supply the missing first-birth or later fate certificate.

## Regular-root enclosure lemma

Suppose one complete root sector has an exact clock $H(s)=s\pm x(s)$ and a supplied clock $\widehat H(s)=s\pm\widehat x(s)$. Both are monotone with $|H'|,|\widehat H'|\geq m>0$ on the same isolating source interval. At the same receiver time assume history position and velocity errors are bounded by $\varepsilon_x,\varepsilon_v$, and the receiver target error by $\varepsilon_L$. Interval endpoint signs must establish one root in that interval on both sides; a numerical root finder reporting one root does not establish this assumption.

Their roots obey

$$
|s-\widehat s|\leq E_s:=\frac{\varepsilon_x+\varepsilon_L}{m}.
$$

This follows by evaluating the exact clock at the supplied root, then applying the mean-value theorem on the exact monotone source interval. If $|\widehat v'|\leq M$ on the enlarged interval, the absolute source derivatives differ by at most $E_D=\varepsilon_v+ME_s$. An acceleration row with admitted sign $\eta\in\{-1,1\}$ is $A_j=\eta k(T-s)/D$. If both denominators are at least $m$ and the supplied delay is bounded by $\Delta$, then

$$
|A_j-\widehat A_j|\leq k\left[\frac{E_s}m+\frac{\Delta E_D}{m^2}\right].
$$

The delay form avoids a second subtraction of uncertain source and receiver positions. For two receiver points at the same time on fixed history, $\varepsilon_L=|\delta x|$, and the corresponding receiver-position Lipschitz constant is

$$
L_j=k\left[\frac1{m^2}+\frac{\Delta M}{m^3}\right].
$$

Summing these bounds over the complete census gives the chart's acceleration error and Lipschitz bounds. Root admissibility is separately protected by positive delay and displacement margins exceeding their derived interval errors. Source interval endpoints and held joins must be retained explicitly. If an inactive clock sector's target gap exceeds the clock and receiver errors, it stays inactive; otherwise subdivision or an event chart is required rather than assigning it zero.

These bounds quantify the familiar sensitivity to a small source derivative: source position error is amplified as $m^{-1}$, while row and derivative errors can involve $m^{-2}$ and $m^{-3}$. They cannot be used across a birth or inherited fold with $m=0$.

## Residual enclosure on an ordinary chart

Take a piecewise continuously differentiable candidate state $\widehat y=(\widehat x,\widehat v)$ and define its defects by $r_x=\widehat x'-\widehat v$ and $r_v=\widehat v'-A[\widehat x]$. The bracketed acceleration means the complete root law evaluated on the entire candidate history, including its exact held tail. It is not the candidate integrator's saved accumulation field.

On a verified tube with complete root census, let $L_A$ bound the acceleration difference in the weighted state/history norm $\|y\|=|x|+|v|$, using the previous row bounds, and put $L=1+L_A$. Then the maximum error through time $t$ obeys

$$
E(t)\leq\left[E(t_a)+\int_{t_a}^{t}(|r_x|+|r_v|)\,dT\right]e^{L(t-t_a)}.
$$

The proof subtracts the two integral equations, bounds the complete-history evaluation by the running maximum error, and applies the scalar integral comparison. More efficient validated propagation uses the two-component error system $e_x'\leq e_v+|r_x|$, $e_v'\leq L_x e_x+L_hE_{\rm past}+|r_v|$ on each method-of-steps cell, treating already enclosed delayed history as known input. Either form must close its own tube: the resulting error bound must stay inside the radii on which the denominator, census and derivative bounds were established.

A candidate cubic Hermite position should use $\widehat v=\widehat x'$ throughout each cell. Then $r_x=0$ identically and $r_v=\widehat x''-A[\widehat x]$ is a separately evaluated defect. Interpolating saved velocity by a different polynomial and silently identifying it with the position derivative changes the defect. Interval arithmetic must enclose the defect on the whole cell, including every source-inverse sector; sampled residuals or Gaussian quadrature disagreement do not give that bound.

An ordinary residual certificate consists of outward enclosures of polynomial coefficients, isolating source intervals, derivative floors and acceleration defects. Interval root isolation may use interval Newton on each monotone sector. It must preserve the held-tail root and audit all four clock families. Rational polynomial arithmetic or correctly rounded interval operations are suitable mechanisms; SciPy tolerances and floating root residuals are not outward error bounds.

For the implemented retained/current-history inclusion, the contraction domain is a closed set of $C^1$ position curves with $v=x'$, derivative in the declared velocity tube and $\operatorname{Lip}(v)\leq M$, together with the already enclosed completed history. The map is the second-order Volterra position map $x(T)=x_a+(T-t_a)v_a+\int_{t_a}^{T}(T-s)A[x](s)\,ds$. Its derivative is the corresponding integrated acceleration. Enclosed acceleration bounded by $M$ and the Picard tube inclusions make this domain invariant; treating position and velocity as unrelated candidate functions would not preserve $x'=v$.

Use the norm $\max(\|x\|_\infty,\|x'\|_\infty)$. If the complete acceleration functional has Lipschitz bound $L_A$, the Volterra map has factor at most $\max(h^2/2,h)L_A\leq hL_A$ for $h\leq2$. Source-clock derivative floors and the source-velocity Lipschitz bound apply to every candidate in this restricted domain. A conservative implementation bound is $L_A\leq2k[2/m^2+\Delta/m^2+2\Delta M/m^3]$, allowing both receiver/history position errors and the contact direction switch; it records $h(1+L_A)<1/2$ on each accepted cell. This supplies an explicit unique fixed point rather than relying on a sampled right-hand side or a loose unconstrained first-order Picard interpretation.

When an entire isolated source interval lies strictly before the cell's left endpoint, its history is already fixed and the receiver acceleration depends only on receiver position and time. In that chart the sharper bound is $L_A\leq k(m_s^{-2}+\Delta M_s m_s^{-3})$, using the isolated source derivative floor $m_s$ and source acceleration bound $M_s$. A small derivative elsewhere in the completed history need not enter this ordinary ODE contraction. The source-root enclosure still uses the complete monotone historical clock; the sharper constant changes the contraction estimate, not the source census.

### A certified auxiliary chart for the first speed event

Let the complete subcritical history be enclosed through $T_0$, with $-1<V_0^-\leq v(T_0)\leq V_0^+<0$. Suppose a receiver tube on $[T_0,T_0+h]$ satisfies $x\geq\chi>0$ and $h<2\chi$. Every newly emitted partner source $s\geq T_0$ then satisfies $P(s)\geq T_0+\chi>T_0+h-\chi\geq Q(T)$ throughout that tube. Thus the admitted partner source lies in the fixed completed past even when an auxiliary receiver speed passes below $-1$. Its source inverse and acceleration can be enclosed without assuming that the auxiliary current clock remains monotone.

The opposite partner direction remains absent: old $Q(s)$ is bounded above by $Q(T_0)<T_0<P(T)$, since the completed past has monotone $Q$ and $x(T_0)>0$; for new sources, $Q(s)=s-x(s)<T<P(T)$ because both source and receiver positions are positive. Hence the partner census is complete. For a longer auxiliary tube the implementation instead bounds every newly emitted $P$ value by its cell's lower endpoint $T_a+x_{\rm tube}^-$, retains the minimum over all accepted cells, and compares that bound to the next receiver $Q$ upper bound. Whole-cell tube inclusion makes this stronger exclusion valid for every candidate in the contraction domain.

Define the auxiliary ODE using that partner row only. If its whole-cell contraction and inclusion close, and its acceleration lies in $[-M,-a]$ with $M\geq a>0$, its first crossing has the rigorous bracket

$$
\frac{1+V_0^-}{M}\leq T_e-T_0\leq\frac{1+V_0^+}{a},
$$

provided the upper bound lies inside the certified positive-position tube. Acceleration is strictly negative, so the crossing is unique and transverse. Up to this first crossing the complete selected law has no nontrivial self root and coincides with the auxiliary solution by uniqueness. After the crossing this auxiliary is only a device for locating the incoming event; it omits the newly admitted self rows and is not the full-law continuation. The inequality $h<2\chi$, source denominator enclosure, whole-cell defect and crossing signs are explicit falsifiers of this route. Endpoint error remains in the displayed bracket; event-relative cancellation is not presumed.

## Event-time and contact lemmas

Let a candidate event marker $g$ have an interval bracket, and suppose the exact marker derivative has one sign with $|g'|\geq\mu>0$ on its certified event tube. If marker error is at most $\varepsilon_g$, then $|T_e-\widehat T_e|\leq\varepsilon_g/\mu$, enlarged by the numerical bracket width. Position contact uses $g=x$, a speed event uses $g=1+v$, and a source-fold reception uses its clock-level marker. The derivative floor is $|v|$, $|A|$ or the appropriate receiver-clock derivative, respectively; none can be replaced by its sampled event value without a whole-tube bound.

At contact the partner delay can tend to zero, so a positive delay floor cannot remain a certificate through that event. Nonzero source-clock derivatives instead give a cancellation bound. For a near-contact partner hit with direction $\sigma$, let $\overline v$ be the mean source-to-receiver velocity. The exact identities give $d=2x/(1+\sigma\overline v)$ and $T-s=\sigma d$. If both $|1+\sigma\overline v|$ and $|1+\sigma v(s)|$ are at least $m$, then

$$
|A_{p,\sigma}|\leq\frac{2k|x|}{m^2}.
$$

The row therefore tends to zero with $x$ even though its delay tends to zero. The surviving complete law has a locally Lipschitz piecewise extension across the admission boundary on a tube with bounded history derivatives. Subcritical contact switches one local partner direction; supersonic contact admits both new partner rows on its outgoing side, emitted before contact. Their limiting acceleration is zero individually, not an assertion that the total acceleration is zero. The affine sign and coefficient controls in the existing [independent birth-to-fold geometry](multiplier-free-linear-self-birth-to-fold-independent-check.md#exact-affine-control-and-correction-of-the-earlier-contact-coefficient) are the independent references for these local births.

## Singular events require event-relative remainder bounds

At a speed crossing write the source distance from the exact enclosed event as $q$, and use the clock expansion $p(q)=Bq+q^2C(q)$ with an interval bound $|C(q)|\leq C_0$. The equation supplies the exact incoming curvature $B$ from the surviving regular rows. The clock target difference is enclosed by integrating this centered slope, giving $\Delta P=Bq^2/2+q^3\widetilde C(q)$ with $|\widetilde C|\leq C_0/3$. Thus quotient cancellation in $p/q$ and $\Delta P/q^2$ is algebraic, not floating subtraction of long-prefix coordinates.

A uniform absolute position enclosure by itself is insufficient here: division by $q^2$ amplifies it without bound as $q\to0$. An uncertain event time must also be transported into the event-relative chart, rather than treated as a fixed floating $T_u$ in $T_u-s$. Each accepted source Taylor sector must have its own one-sided trace and remainder. At a self birth those traces differ, so one smooth interpolation cell across the jump cannot stand in for the exact history.

For the first downward birth the stable limiting system selects the unique bounded finite inward-trace continuation. Its quantitative proof can use a semigroup bound $\|e^{Jr}\|\leq M_J e^{-\lambda r}$, $r\geq0$, and the bounded-past integral operator. In a weighted norm with $0<\sigma\leq1$, an $O(q)$ forcing bound $F_0q_0$ and nonlinear Lipschitz bound $\ell$ give operator radius contribution at most $M_JF_0q_0/(\lambda+\sigma)$ and contraction factor at most $M_J\ell/(\lambda+\sigma)$. Enclosing these constants below one certifies existence, uniqueness and the omitted startup tail. A fixed-point seed at a finite $q_0$ without this tail bound is only an approximation.

For this specific downward-birth Jacobian the semigroup constants can be sharpened exactly. Write $J=\left(\begin{smallmatrix}-1&-a\\c&-2\end{smallmatrix}\right)$, $a=B/W_0^2>0$, $c=k/W_0>0$, and use squared norm $c(\delta z)^2+a(\delta W)^2$. Its derivative under the linearized system is $-2c(\delta z)^2-4a(\delta W)^2$, since the cross terms cancel. Thus $\|e^{Jr}\|\leq e^{-r}$ in this weighted norm: $M_J=1$, $\lambda=1$, regardless of whether its eigenvalues are real or complex. A certified weighted Lipschitz remainder $\ell<1+\sigma$ and radius $F_0q_0/(1+\sigma-\ell)$ close the germ directly. The weights vary with the enclosed exact curvature but stay positive on a compact $B$ interval, and their interval uncertainty must be included when converting the germ back to physical variables.

The derivative bound for the positive partner row supplies the needed incoming source remainder. If its source derivative is at least $m$ and source acceleration magnitude at most $M_s$, then along an incoming receiver tube

$$
|A'|\leq k\left[\frac{1+J_s}m+\frac{\Delta M_sJ_s}{m^2}\right],\qquad J_s=\frac{1+|v|}{m}.
$$

Here $s'=Q'(T)/P'(s)$ and $D'=v'(s)s'$ give the bound by differentiating the exact delayed row. Together with the enclosed event curvature, this establishes $p(q)=Bq+O(q^2)$ around the same exact event; it does not require subtracting two absolute clock values with separately uncertain origins.

There is also a sharper contact-to-fold bootstrap than the generic old-source bound. Let $\Delta=P_c-T_3>0$ be the gap from supersonic contact to the earlier source maximum. While $v<-1$, receiver time lasts at most $\Delta/2$ before $Q=P_c$, and its negative-partner target lies in $[T_3-\Delta,T_3]$. The lower endpoint exceeds $Q(t_c)=t_c-x_c$ by $2(T_3-t_c)>0$, so that source lies on the already evolved supersonic birth-to-contact sector with $Q'>2$. Consequently $T_3-s\leq\Delta/2$, its reception delay is at most $\Delta$, and its sole positive acceleration contribution is at most $k\Delta/2$. Every other row is negative. The explicit sufficient condition is therefore

$$
v(T_3)+\frac{k\Delta^2}{4}<-1.
$$

A verified upper bound for the left side closes the complete four-root approach to the inherited fold. This conditional bound is derived from the full source geometry and can be evaluated using coarse enclosed event data; it does not require a globally small absolute history error.

At the inherited partner fold use the square-root reception coordinate $r=\sqrt{P_c-Q(T)}$ and interval source expansions on each side of the earlier maximum. The source roots are $s=t_c+r u_\pm(r)$; their limiting factors satisfy $u_\pm(0)=\pm\sqrt{2/B_\pm}$. Interval implicit-function bounds on $u_\pm$ avoid dividing an uncertain clock difference by $r^2$. The coupled receiver equations are

$$
T_r=-\frac{2r}{1-v},\qquad
v_r=\frac{2[G(r,T)-rR(r,T)]}{1-v},
$$

where $G=r(-A_{\rm pair})$ extends continuously to its unequal-curvature limit. A positive receiver floor $1-v>0$ and Lipschitz bounds for $G,R$ allow the ordinary residual lemma on this regularized chart all the way to $r=0$. Position and velocity then pass continuously; an acceleration bound in ordinary reception time at the fold is neither available nor required. Extending the coupled chart on its outgoing side uses only the surviving roots and the complete census.

## Exact meaning of the sample parameter and its bounded-past certificate

At the first upward event of an exact incoming solution, its incoming curvature equals its old-root acceleration, $B=H$. The smaller finite trace determines $W_*>0$ and $z_*=B/W_*$. Define relative coordinates $y=(z/z_*-1,W/W_*-1)$, and let $E$ have the negative and positive eigenvectors of

$$
J_{\rm rel}=\begin{pmatrix}-1&-1\\-kB/W_*^3&-2\end{pmatrix}
$$

as its columns, in that order. Give each column Euclidean norm one and positive second component. These conventions define the basis without dependence on a numerical eigensolver's ordering or signs. Set the exact terminal source section $q_0=10^{-5}$ and impose $(E^{-1}y(q_0))_+=-0.03$. This is a mathematically declared terminal family parameter. It is independent of any arbitrary cutoff on the earlier logarithmic interval.

The existing bounded-past contraction gives uniqueness of that member within its certified local tube if this terminal value lies in the admissible radius. No unconditional existence assertion for the specific $-0.03$ follows just from the theorem's phrase “sufficiently small.” Its radius, nonlinear contraction constants, terminal eigencoordinate and whole source sector must be enclosed for this value. The normalized $(\xi,u)$ coordinates from [the recross fate theorem](multiplier-free-linear-recross-fate-independent-check.md#a-uniform-source-normalization-permits-global-no-turn-continuation) provide a well-conditioned preconditioner even when the relative-coordinate eigenbasis is poorly conditioned. The parameter definition itself remains the declared relative-basis functional.

In logarithmic source time $\eta=\log(q/q_0)\leq0$, diagonal coordinates satisfy the negative- and positive-mode integral equations. Suppose $|F(\eta,y)|\leq M q_0e^\eta+N|y|^2$ and its tube Lipschitz constant is $\ell$. With $0<\sigma<\min(1,\lambda_+)$, their Green-operator difference constant is at most

$$
C_G=\frac1{\sigma-\lambda_-}+\frac1{\lambda_+-\sigma},
$$

in the sum of the diagonal weighted norms. If $C_G\ell<1$, an approximate infinite-interval member with weighted defect $\varepsilon_{\rm def}$ and terminal parameter error $\varepsilon_c$ has distance at most

$$
\frac{C_G\varepsilon_{\rm def}+\varepsilon_c}{1-C_G\ell}
$$

from the unique exact member, provided the resulting ball closes inside the tube. Basis transformations and their interval uncertainty must be included when forming these constants.

For a finite cutoff $\eta=-L$, the omitted stable coordinate is not zero. If $|y(\eta)|\leq R e^{\sigma\eta}$, its bounded-past equation gives

$$
|a_-(-L)|\leq\frac{Mq_0e^{-L}}{1-\lambda_-}
+\frac{NR^2e^{-2\sigma L}}{2\sigma-\lambda_-}.
$$

This is a quantitative tail boundary interval for a finite validated BVP. The present numerical subject instead sets that coordinate to zero. Its asymptotic tail statement and mesh/logspan refinement do not enclose the displayed interval or the resulting nonlinear solution. A residual certificate can use this exact tail interval, a rigorous polynomial defect on the finite mesh, and the Green bounds; alternatively it can construct a controlled analytic tail and evaluate one infinite-interval defect. Either route retains the free positive terminal parameter and does not select it by forward integration from a fixed point.

## Executable event-centered first-birth transfer

The following helpers are implemented in the new enclosure script and have been run only on known cases. No numerical incoming germ is treated as exact. Let $t_c,x_c$ denote the same exact enclosed first downward event; write $p(q)=1+v(t_c-q)>0$, $\tau=T-t_c$, $w=-1-v(T)>0$, and $y=w^2$. Before the next contact, the complete one-partner/one-self equation is

$$
\tau_q=\frac{p(q)}{\sqrt y},\qquad
y_q=2G(T,X)p(q)+2k(\tau+q),
$$

where $G>0$ is the magnitude of the regular older partner row and $X=x_c-\tau-\int_0^q p(u)\,du$. Define $b(q)=p(q)/q$, $r=\tau/q$, $z=y/q^2$, and $\eta=\log(q/q_0)$. The exact regularized equations are

$$
r_\eta=\frac{b(q)}{\sqrt z}-r,\qquad
z_\eta=2G b(q)+2k(r+1)-2z.
$$

If $B=p_q(0)>0$ and $G_0=G(t_c,x_c)>0$, their limiting equilibrium is $r_*=B/d$, $z_*=d^2$, with

$$
d^2=G_0B+k+\frac{kB}{d}.
$$

The scalar left-minus-right function has derivative $2d+kB/d^2>0$ on $d>0$, so the positive equilibrium is unique. For the physical incoming first birth, $G_0=B$: both are supplied by the same partner-only incoming equation. Separately enclosed intervals need not preserve their correlation to give conservative bounds, but a numerical difference between interpolated curvature and the actual row is not an additional physical parameter.

Let $a_*=B/(2d^3)$ and $c=2k$. The Jacobian is $J=\left(\begin{smallmatrix}-1&-a_*\\c&-2\end{smallmatrix}\right)$. In the exact weighted norm $\|(\delta r,\delta z)\|_*^2=c\delta r^2+a_*\delta z^2$, its transformed off-diagonals are skew and its symmetric part is $\operatorname{diag}(-1,-2)$. Hence $\|e^{Jt}\|_*\leq e^{-t}$. Use the bounded-past norm

$$
\|u\|_{q}=\sup_{0<q\leq q_0}\frac{\|u(q)\|_*}{q/q_0}.
$$

Its Green constant is $1/2$. Given $|p_q(q)-B|\leq J_{
m in}q$, the source bound is $|b(q)-B|\leq J_{
m in}q/2$. Given $L_G\geq|G_T|+|G_X|$ on the full old-root chart, $|G-G_0|\leq L_G q(r_{max}+q_0b_{max}/2)$ and $|\partial_rG|\leq qL_G$.

The helper `first_birth_germ` encloses the equilibrium over the input parameter intervals and a proposed weighted radius $R_0$. Write $a_-\leq a_*\leq a_+$, $z_-\leq z\leq z_+$ on that ball, and let $\delta_a$ bound $|a_*-b/(2z^{3/2})|$. Conservative nonlinear and forcing coefficients are

$$
\ell=\sqrt{c/a_-}\,\delta_a+
\sqrt{a_+/c}\,2b_{max}q_0L_G,
$$

$$
F_1=\frac{\sqrt c\,J_{
m in}}{2d_-}
+2\sqrt{a_+}\left[
G_{max}\frac{J_{
m in}}2+
B_+L_G(r_{max}+q_0b_{max}/2)\right].
$$

If $\ell<2$ and $R=F_1q_0/(2-\ell)<R_0$, and the full ball stays in positive $r,z,b$ and the supplied regular old-source chart, the bounded-past operator is a contraction with factor $\ell/2$. It supplies the unique germ in this weighted class and $\|u(q)\|_*\leq Rq/q_0$. The output encloses $r,z$, $\tau=q_0r$, $y=q_0^2z$, and the centered clock drop. It also supplies the exact right curvature $b_{
m right}=d^2/B=G_0+k/B+k/d$ and a one-sided remainder, needed for the inherited unequal-curvature fold.

The helper uses exact rational cubic brackets and outward integer-square-root enclosures. Its known controls prescribe $p=q$ and constant $G=1-2k$, giving exactly $d=r=z=1$, $\tau=q$, $y=q^2$ and zero forcing; an unequal-curvature control prescribes $p=q$, $G=4-3k/2$, giving $d=2$, $r=1/2$, $z=4$. These are exact references for the local equations with prescribed inputs, not complete held-release histories. An independent review accepted the weighted contraction and interval formulas. The known-only receipt is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T212353.793057Z/known.json`, recording the equal/unequal germ outputs, contact-transfer output and rejected failed margin; no target candidate has been run through these helpers.

### Finite contact and a sufficient fold margin

Suppose the complete incoming self-source sector satisfies $b_{min}q\leq p(q)\leq b_{max}q$ and the regular older partner chart has $0<G\leq G_{max}$ until contact. The exact equation implies $y_q\geq2kq$, hence $w\geq\sqrt{k}q$ and $\tau_q\leq b_{max}/\sqrt{k}$. Consequently

$$
w\geq\frac{k}{b_{max}}\tau,\qquad
w_T=G+k\frac{\tau+q}{p(q)}
\leq D_{max}:=G_{max}+\frac{k}{b_{min}}
\left(1+\frac{b_{max}}{\sqrt{k}}\right).
$$

Integrating $x_T=-1-w$ bounds contact time from both sides. For $x_c\in[x_c^-,x_c^+]$,

$$
\tau_-:=\frac{2x_c^-}{1+\sqrt{1+2D_{max}x_c^-}}
\leq T_3-t_c\leq
\tau_+:=\frac{2x_c^+}{1+\sqrt{1+2kx_c^+/b_{max}}}.
$$

The complete incoming sector need only cover $q\leq\sqrt{2x_c^+/b_{min}}$: before contact the centered clock drop $\int_0^q p\leq x_c$ gives this bound. The older partner target $Q$ stays below $t_c+\tau_+$; the strict gap $x_c^- -\tau_+>0$ separates it from the inherited maximum. Complete source coverage and regular-row bounds therefore allow ordinary continuation away from $q=0$ until a unique finite transverse contact. This conclusion follows from the germ and compact chart bounds; it does not require a numerical contact endpoint.

At contact let $\Delta=P_c-T_3=x_c-(T_3-t_c)$, so $\Delta\leq\Delta_+:=x_c^+-\tau_-$. Both newborn positive-direction partner rows and the self row are negative. The only positive row is the negative-direction partner, whose source lies after the birth and before contact. Its source $Q'>2$, its delay is at most $\Delta$, and its acceleration is at most $k\Delta/2$. While $v<-1$, $Q'>2$ also bounds the reception duration to the inherited fold by $\Delta/2$. Thus the explicit sufficient margin is

$$
\frac{k\tau_-}{b_{max}}-\frac{k\Delta_+^2}{4}>0.
$$

It preserves $v<-1$ through the fold, including its finite continuous outgoing velocity. The helper `contact_fold_transfer` evaluates these inequalities outward, rejects a nonpositive old-peak gap or fold margin, and returns the contact-time, source-coverage, velocity-deficit and fold-time bounds. Its known prescribed $p=q$, $G=1-2k$, $x_c=1$ reference has exact contact $\sqrt3-1$; the helper encloses it and rejects a deliberately failed fold margin before any target. An independent review accepted the contact comparisons and complete-census fold bootstrap at this conditional scope; incoming source coverage and the regular surviving rows remain caller obligations.

At the inherited source maximum, the piecewise quadratic curvatures are $B$ and $b_{
m right}$, both positive. If $\rho=\sqrt{P_c-Q(T)}$, the pair's regularized negative magnitude has limit

$$
\rho(-A_{
m pair})\longrightarrow
k(T_f-t_c)\left(\frac1{\sqrt{2B}}+
\frac1{\sqrt{2b_{
m right}}}\right).
$$

The coupled fold chart from the independent theorem then gives an integrable transition. Its surviving-source denominator floors and the actual birth-to-contact history remain required inputs; the fold margin cannot authorize omitting either newborn partner root or substituting a prescribed postbirth source curve.

### Remaining postfold upward-event certificate

After the inherited fold and before an upward event, the complete remaining rows on fixed precontact source sectors have $R(T,L)=\alpha(L)T+\beta(L)$, $L=P(T)$, with $\alpha=k(D_Q^{-1}-D_P^{-1})$. An interval with $D_P>D_Q>0$ gives a strict positive slope. It must be checked on the actual source sectors; directly after the fold the negative partner source may still have $Q'>2$, so this positivity cannot be silently assumed there.

Once a certified postfold entry has $w=-1-v\in[W_-,W_+]$ and a compact clock interval supports $R(T_0+t,L)\geq r_0+\alpha_0t$ with $\alpha_0>0$, define $u_+$ by $r_0u_++\alpha_0u_+^2/2=W_+$. The clock-drop bound until the first return is

$$
D_+=W_+u_+-\frac{r_0u_+^2}{2}-
\frac{\alpha_0u_+^3}{6}.
$$

If that interval has strictly more available clock width than $D_+$, the solution cannot leave its certified source chart before reaching $w=0$ in time at most $u_+$. An upper affine row bound supplies a positive lower return-time bound, allowing the terminal $H=R$ and its strict $H>2\sqrt{k}$ condition to be enclosed. Together with complete root coverage and a positive $\alpha$ neighborhood, these are executable sufficient tests for connecting the exact release to the existing generic smaller-family global nonturn theorem. A missing initial postfold entry or failure of the clock-width test leaves that connection open.

The existing [exact held-history theorem](multiplier-free-linear-postfold-independent-check.md#exact-held-history-theorem) owns a different terminal escape sector. Under its entire-history increasing prebirth $P$, decreasing postbirth $P$, globally increasing $Q$ and $Q(T)>P_c$ hypotheses, a two-row postfold branch reaching $P<-1/2$ while $v<-1$ has both emissions in the held past, $s_Q=P+1/2$ and $s_P=P-1/2$. Nonheld prebirth $Q$ values exceed $-1/2$, nonheld prebirth $P$ values exceed $1/2$, and strict postbirth descent excludes every earlier nonheld self root at the current $P$ level. These full-history gaps are required; a current coordinate inequality alone does not establish the held census. Its total acceleration is identically $-k$, preserving global no-turn quadratic escape. This report uses that existing conditional fate boundary without claiming entry from the exact release.

## The complete bridge and its current precise boundary

The exact ordinary prefix now reaches $T=12.4$ through the independently accepted quintic-defect receipt `.local-data/collinear-research/linear-exact-release-defect/20261003T212800.961633Z/certificate.json`. Its 6352 outward cells enclose $x\in[0.873598339044,0.873671699962]$ and $v\in[-0.992910216725,-0.992869612298]$. The immutable exact serialized past and the independently audited fixed-past auxiliary receipt `20261003T214224.058259Z` give the exact first downward event

$$
T_c\in[12.411829310011507,12.411934787687622].
$$

Only preevent equality with the full law is used to infer this crossing. The auxiliary after a possible crossing is not the full selected law. The broad box receipt and its failure above remain historical evidence about that enclosure instrument, superseded as the current exact-prefix boundary.

The independently accepted first-birth input receipt `20261003T214849.964424Z` gives $x_c\in[0.861705561636,0.861884898384]$, the physical identity $B=G_0\in[0.599150936815,0.599281478417]$, incoming remainder and old-row gradient bounds, and 121 positive-position incoming blocks covering $0<q\le3$. The actual weighted germ closes at $q_0=0.02$: its error is below $0.01405<0.1$, its contraction product below $0.10326$, and its outgoing curvature lies in $[1.390163542048,1.390762477869]$. The actual application is retained in `.local-data/collinear-research/linear-exact-release-enclosure/20261003T220604.566741Z/certificate.json`; independent review of the sharper germ/contact/fold application `20261003T220451.911947Z` accepted its full source census and analytic existence transfer. Independent review also accepts the initial transit and the final repaired bridge. No floating startup germ is assumed exact.

Derived analytic continuation supplies actual birth-to-contact history: $p/w\le b_{\max}/\sqrt{k}$ makes the regular $q$ system bounded, its old partner inverse remains in the accepted prefix, and strictly decreasing $x_c-\tau-C(q)$ reaches zero before the certified source sector ends. Before contact, emitted postbirth $P$ values exceed the receiver $Q$ target because they exceed the current $P$ and $x>0$; hence the new partner directions do not occur early. At contact the actual precontact trajectory supplies both newborn partner sources. The strict deficit margin keeps $P$ decreasing and $Q$ increasing to the inherited maximum; all new partner emissions remain before contact and the surviving self inverse stays in the accepted incoming sector. The unequal-curvature pair is integrable by the existing fold theorem. These statements discharge existence premises using accepted incoming data; sharper trajectory integration would improve the state bounds rather than supply a missing exact startup.

The sharpened contact state follows from $C(q_c)=x_c-\tau_c=\Delta_c$:

$$
\sqrt{2\Delta_{\min}/b_{\max}}\le q_c\le\sqrt{2\Delta_{\max}/b_{\min}},\qquad
W_c\ge\sqrt{k}q_c,\qquad
W_c^2\le2G_{\max}\Delta_{\max}+kq_{c,\max}^2+2k\tau_{c,\max}q_{c,\max}.
$$

The final inequality integrates $y_q=2Gp+2k(\tau+q)$ and uses monotonicity of $\tau$. The receipt encloses $q_c\in[0.645643127286,1.639999365222]$, $T_f-T_c\in[0.436022364065,0.798379726295]$ and the folded deficit $W_f\in[0.332443725222,3.310159685153]$. The self source satisfies $q_s\in[0.645643127286,2.319309344581]\subset(0,3)$, with its clock derivative above $0.204$. The negative pair impulse is bounded by $k(q_c+\tau_c)(q_c+\tau_c+\Delta)/4$ after cancellation of the source clock derivative under coarea. The regular self impulse is bounded separately; the positive partner row is omitted only from the inward-deficit upper bound.

Initial postfold acceleration is negative, rather than assumed positive. Until $P=Q(T_c)$, its partner source has $s_Q\ge T_c$ and $D_Q\ge2$, whereas the old self source has $s_P\le S_{\max}$ and $D_P\le D_{\max}<2$. Thus

$$
-A\ge\gamma=k\left[\frac{T_{c,\min}-S_{\max}+\tau_{c,\min}}{D_{\max}}-\frac{\tau_{c,\min}}2\right]>0.
$$

At the inherited fold $Q(T_f)=P_c$ gives the exact clock width $P_f-Q(T_c)=2(T_f-T_c)$. The resulting duration is at most $2h/(W_{f,\min}+\sqrt{W_{f,\min}^2+2\gamma h})$. Cancelling the self derivative in its clock integral bounds the deficit growth without a small denominator factor. The newest application encloses entry to $P=Q(T_c)$ with $T\in[13.061941198176,15.906556655980]$ and $W^2\in[0.446591906791,16.591539615710]$. These earlier transit bounds are independently accepted and retained as a broader enclosure.

A further correlated source chart sharpens the precontact state without integrating an uncertain receiver trajectory. Write $Q=P(s)$ for the old emission, with $D=P\prime(s)$. Because $Q=Q_c+2\tau+C(q)$ and $P(T)\le P_c$, the receiver obeys $\max(T_c,Q)\le T\le(Q+P_c)/2$. Each fixed-source panel therefore bounds

$$
k\frac{\max(T_{c,\min},Q_{\min})-s_{\max}}{D_{\max}}\le G\le k\frac{(Q_{\max}+P_{c,\max})/2-s_{\min}}{D_{\min}}.
$$

Three iterations of certified $Q$ panels reduce $G$ to $[0.555782084926,0.979734172446]$. The lower bound strengthens $W_T\ge G_{\min}+k/b_{\max}$ and hence the contact-time upper comparison. Receipt `20261003T220834.867820Z` gives folded $W\in[0.439940416639,2.343689083102]$, $T_f-T_c\in[0.499083278203,0.754474288076]$, and entry to $P=Q(T_c)$ with $T\in[13.217362398072,15.435787515509]$ and $W^2\in[0.589363829388,10.609314335940]$. Exact held-source geometric controls were recorded before this target, and this correlated sharpening is included in the independently accepted final application. Its full panel rows are retained so the interval root and receiver correlation bounds can be checked independently.

The incoming-source bounds can be restricted further using already proven source coverage, without choosing a favorable sector circularly. Each contact iteration first takes the previous certified $q_{c,\max}$, then retains every accepted incoming block intersecting $[T_{c,\min}-q_{c,\max},T_{c,\max}]$; its acceleration minimum supplies the improved $b_{\min}$ only for this contact sector. The surviving fold self sector is restricted separately using its previous certified $q_{s,\max}$ and retains its own lower bound. Three passes give folded $W\in[0.441817116811,1.795272213830]$, $T_f-T_c\in[0.537233663017,0.754474288076]$ and $q_s\le1.726011129101$. The initial transit to $Q(T_c)$ gives $T\in[13.321487574233,15.421365915753]$, $W^2\in[0.628528297837,8.323571297845]$.

The attempted tiny bridge to the fixed-prefix guaranteed upper clock level in receipts `20261003T221029.432594Z` and `20261003T221142.343085Z` had a missing source premise: this level lies below the actual $Q(12.4)$, so its negative partner source can precede $12.4$. Their contact/fold and initial transit bounds remain independently inspectable, but those bridge states are unaccepted. The correction encloses the prefix $Q$ inverse at the fixed target and combines its certified velocity bound with the incoming $[12.4,T_c]$ sector. An outward interval endpoint can extend beyond the rational serialized past endpoint; the implementation queries a strict interior endpoint and covers the remaining sliver with the accepted acceleration bound. The positive partner delay must also be bounded using that earliest prefix source rather than $12.4$; the initial attempt that repaired only its denominator still overstated the inward floor. Both corrections are present in the subsequent application. This is an interface enclosure repair, not a model event or a change to the frozen past.

The corrected serialized application is `.local-data/collinear-research/linear-exact-release-enclosure/20261003T221650.985233Z/certificate.json`, frozen subject SHA-256 `e86325f02f1634fc46b8d6c4ee56f753dec93e44e697e988840682ed82aa1c0e`. Its fixed upper profile level is exactly $12.4-x_{\mathrm{prefix},\max}(12.4)-10^{-12}$. The negative partner source can begin at $12.399963188471$, its prefix speed range and incoming speed sector supply a common denominator floor, and the positive partner delay uses this earliest source. The independently accepted corrected entry is $T\in[13.329642778119,15.451137303461]$, $W^2\in[0.660313926032,8.385850934652]$. This final application is independently accepted; its exact input hashes and every correlated/restricted panel are retained.

Measured scoped validation: the current report renders 454 mathematical segments with no KaTeX failures using `.tmp/validate-campaign-katex.mjs`, after its known two-segment fixture returned exactly two valid segments; the shared-venv `py_compile` passes for the owning script. These syntax checks are separate from scientific acceptance of the new application.

The final application `20261003T221650.985233Z` is independently accepted, including both bridge corrections, every correlated/restricted source panel and the complete two-row census. The remaining profile transit is closed by the independently accepted [fixed-prebirth source profiles and composed comparison](multiplier-free-linear-exact-prebirth-profiles.md), with frozen namespace `.local-data/collinear-research/linear-exact-prebirth-profiles/final-transfer-221650/`. The [independent exact-release check](multiplier-free-linear-exact-release-independent-check.md) owns the acceptance argument. Its negative-band and transition comparisons preserve a strictly positive squared deficit through $P=7.84$. On the later positive band, each completed interval raises the receiver-time lower bound; positive $\alpha$ then raises the next acceleration lower bound. The cumulative action forces the first zero of $W$ before $P=6.45$, rather than identifying an enclosure support failure with a physical event.

The exact first upward event satisfies

$$
P_u\in(6.45,7.84),\qquad T_u\in[14.470361503222314,22.119421355511644],\qquad x_u\le-6.630361503222314.
$$

Across every possible event sector the certified complete two-row acceleration and affine slope obey

$$
H\ge1.1185621451863>2\sqrt{k},\qquad \alpha\ge0.266481041244>0.
$$

The selected prebirth sources remain at positive times with regular inverse-clock denominators. Their acceleration is continuous and locally Lipschitz across the earlier subcritical contacts and source-join receptions. Hence $\alpha,\beta$ are $C^{1,1}$, with bounded weak second derivatives; the accepted $C^{1,1}$ extension of the [smaller-family fate theorem](multiplier-free-linear-recross-fate-independent-check.md) applies. These thresholds are derived from exact interval records, not promoted from a floating event estimate.

Consequently the exact held release, under the unchanged multiplier-free complete-root law and declared continuation class, admits global no-turn family histories: $x(T)+T$ converges while $v(T)\to-1$, with no later outer turn. Choosing summable nested loop durations instead gives finite event accumulation and loss of a finite one-sided acceleration trace, obstructing continuation in the stipulated class. This second conclusion is a precise class boundary; it does not prove nonexistence of a weaker locally absolutely continuous continuation beyond accumulation. The equation alone supplies no choice among the admitted later upward-birth family parameters. These are exact allowed histories and an exact continuation-class obstruction, rather than a unique future assigned to a numerical sample.

The declared specific $c_0=-0.03$ family membership remains a separate, tighter BVP certificate. The generic admitted smaller-family connection proved here does not identify the released history with that historical sample, certify its positive excursion near $4\times10^{-10}$, or establish an eventual turn for any larger selected member.

The retained floating comparison scripts remain historical numerical instruments: `multiplier-free-linear-comparison.py`, `linear-self-birth-to-fold.py`, `linear-postfold-continuation.py` and `linear-upward-branch-continuation.py` do not themselves certify the exact upstream release. That implementation observation is scoped to those four files; it does not describe the new independently audited exact defect prefix or event auxiliary.

The small recross's new clock maximum is numerically about $4\times10^{-10}$ above its preceding minimum. To certify that positive clock excursion, cancellation-aware event-relative quantities must have interval widths smaller than its strict margin. A long-prefix absolute $P$ error cannot be presumed to cancel in this difference. Its recross acceleration and older-row difference also require separate interval signs; a total negative row sum alone does not prove the stronger single-row certificate. Local ordinary residuals after the first upward birth cannot retroactively certify the upstream release history.

Claim grade: derived. Exact parameter membership is well-defined and locally unique after the stated coordinate conventions and contraction bounds are closed; ordinary residual, source-root and event bounds above give an executable enclosure route. Falsifiers are failure of the whole-cell defect bounds, a root outside the complete isolating census, nonclosure of a denominator or event tube, a missing one-sided Taylor remainder, or failure of the specific $c_0=-0.03$ contraction radius. The generic exact-held-release connection through the first upward birth and the smaller-family fate hypotheses is accepted. Exact membership of the particular numerical member remains separate.

This new analysis and the separately authorized new `scripts/collinear-research/linear-exact-release-enclosure.py` are within this Specialist's write scope. No existing independent theorem, numerical subject, oracle, production code, generator or tracker is changed. No target numerical refinement is presented as rigorous certification. A certificate implementation should first pass known rational polynomial, cosine-series, simple-root, contact, parabolic birth, fold-normal-form and mixed stable/unstable BVP controls appropriate to the mechanisms it actually implements, then emit receipts naming its exact arithmetic and outward-rounding model.
