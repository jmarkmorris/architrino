# Independent assessment of the later population refresh and continuation

**Accepted through $9/2$ for the unchanged supplied-history problem.** The independent review accepts the complete refreshed state at $15/4$, direct complete-population continuation through $17/4$, the 956-identity continuation through $9/2$, and strictly increasing common target height through that endpoint. All residual, source-domain, archive and class conditions below are discharged by Section 9. The requested next maximum remains open. The preceding [independent acceptance through $33/8$](smooth-two-particle-post-restart-independent-adjudication.md) remains frozen.

The unmodified Master Equation, $g=16$, $c_f=1$, infinite alternating cubic population, prescribed eight-source stationary block sum, and exact supplied past remain the inputs. Actual existence through $33/8$ is already accepted. A new small-state certificate for the surrounding population is a stronger quantitative statement.

## 1. Independent population and source coverage

For environmental identity $k$, let

$$
m(k)=\min_{\substack{e\in\{(0,0,0),(1,0,0)\}\\|k-e|^2\ge2}}|k-e|^2,
\qquad \tau_k=\sqrt{m(k)}-\frac{11}{8}.
$$

The unit-distance channels do not receive the supplied negative-time pulse after time zero. Generated environmental excitation is no earlier than this old-pulse front, by the triangle inequality along the preceding causal segments. The two target futures begin at the previously established $\sqrt2-3/8$. Until its first excitation, each other identity remains exactly at its lattice point. Thus first-excitation counting uses the unmoved receiver.

An independent integer-lattice enumeration, with exact squared-radius comparisons and known shell controls recorded before the target, gives:

| Horizon | Environmental identities | Including the two targets | Largest admitted $m(k)$ |
|---|---:|---:|---:|
| $15/4$ | 674 | 676 | 26 |
| $33/8$ | 834 | 836 | 30 |
| $17/4$ | 834 | 836 | 30 |
| $9/2$ | 954 | 956 | 34 |

The new $15/4$ archive therefore requires all 674 environmental identities and both targets, including 170 environmental identities additional to the accepted $13/4$ archive. The $17/4$ continuation adds 160 environmental identities to that refreshed archive. Complete continuation to $9/2$ adds 120 more. These are identity counts; the infinite stationary contribution remains in the equation.

At a hypothetical first exit from a common comparison ball of radius $B$, every cross range is at least $1-2B$. For $H=17/4$ and $B=1/64$,

$$
s\le H-1+2B=\frac{105}{32}<\frac{15}{4}.
$$

This preliminary inequality establishes that all required source histories are already known. It precedes the sharper bound using the smaller certified source displacement. Every source identity omitted from the refreshed archive is stationary at all queried times. There is no circular assumption that unknown later sources are small.

## 2. Stationary cubic treatment and independent control

The frozen independent stationary reference gives

$$
S_{0,i}(y)=a\left(y_i^3-\frac32y_i\sum_{j\ne i}y_j^2\right)+R_i(y),
\qquad a\in[14.301634301781185,14.327024926809749].
$$

The population subject uses the wider interval $a\in[14.23,14.4]$ and accepted tensor remainder

$$
|gR(y)|\le\frac{16\cdot7995}{(1-1/64)^7}|y|^5.
$$

Including the cubic field and its first two Taylor coefficients inside the centered residual expansion, then adding this pointwise remainder, is valid. Derivatives of the omitted remainder are unnecessary: the cubic is the field used in that expansion, and its difference from the true field is bounded separately at each reception point. Repeated interval coefficients only enlarge the enclosure.

The independent exact rational reference passed axial and diagonal controls before the frozen helper was exercised. At $y=(1,2,3)$, zero velocity and acceleration, and coefficient $14$, its exact value is $(-259,-308,63)$. The subject encloses these components, and its derivative jets enclose zero. This checks cross-coordinate terms absent from an axial test. Receipts are the files population-cubic-known.json and population-cubic-target.json under the literal local directory .tmp/mec-008-post-restart/moore/. This control establishes the helper's algebra, not the complete new residual.

## 3. Conditional refresh errors through $15/4$

Start at $c=13/4$ from the accepted complete-state error. Use receiver radius $1/500$ and incoming source bounds

$$
b_s=\frac1{2000},\qquad v_s=\frac1{1000},\qquad a_s=\frac1{100}.
$$

All 202 lattice positions in nonempty squared-distance shells through 13 are retained as a conservative generated-row inventory. Both old pulse rows use late range floor four. The stationary derivative contributes at most $1600|y|^2$. Exact rational sensitivity formulas give receiver Lipschitz coefficient $L<10.842096<11$.

Conditional on new environmental full-law residual at most $10^{-6}$, let $E_P,E_V$ be the inherited source errors at emission time and set

$$
Q(t)=10^{-6}+16\sum_m n_m\left[C_{P,m}E_P(t-d_m+b_s+b_r)+C_{V,m}E_V(t-d_m+b_s+b_r)\right].
$$

Here $d_m$ is a rational lower bound on $\sqrt m$, $b_r=1/500$, and the sensitivity coefficients retain the delay-root dependence. With $C_L(u)=\cosh(\sqrt L\,u)$ and $K_L(u)=\sinh(\sqrt L\,u)/\sqrt L$, the comparison is

$$
\begin{aligned}
e_P(t)&\le C_L(t-c)e_P(c)+K_L(t-c)e_V(c)+\int_c^tK_L(t-u)Q(u)\,du,\\
e_V(t)&\le L K_L(t-c)e_P(c)+C_L(t-c)e_V(c)+\int_c^tC_L(t-u)Q(u)\,du.
\end{aligned}
$$

The independent instrument uses positive power series with rigorous geometric tails and upper forcing values on steps of width $1/2048$. It retains the accepted emission-time profile; earlier emissions are conservatively bounded by the accepted $73/32$ error. Known shell, stationary-sensitivity and hyperbolic-solution controls precede target computation. Conditional environmental errors are:

| Reception time | Position error | Velocity error | Acceleration error |
|---|---:|---:|---:|
| $105/32$ | $<1.798\times10^{-6}$ | $<8.014\times10^{-6}$ | $<7.638\times10^{-5}$ |
| $115/32$ | $<9.898\times10^{-6}$ | $<5.187\times10^{-5}$ | $<2.353\times10^{-4}$ |
| $15/4$ | $<2.157\times10^{-5}$ | $<1.027\times10^{-4}$ | $<4.361\times10^{-4}$ |

The retained target histories use their separately accepted theorem. Their errors at $15/4$ are below $2.437325\times10^{-5}$, $1.028663\times10^{-4}$, and $3.357703\times10^{-4}$. Integrating the accepted target acceleration-error ceiling from $13/4$ to $105/32$ gives position error below $1.926\times10^{-6}$ and velocity error below $1.618\times10^{-5}$.

The outward polynomial norms reported at $105/32$ are below $0.000447962$, $0.001033040$, and $0.005155400$. Thus the complete actual incoming prefix obeys displacement $1/1800$, speed $1/800$, and acceleration $1/100$, conditional on the environmental residual. Full $15/4$ polynomial maxima plus the displayed errors fit actual displacement $1/600$ and speed $1/200$. The known and target receipts are refresh-error-known.json and refresh-error-target.json in the same independent scratch directory.

## 4. Independent direct continuation condition through $17/4$

The complete population has 836 histories. On receiver ball $1/64$, retain all 340 lattice positions in nonempty squared-distance shells through 18, both old pulse rows, and the stationary field. With source bounds $1/1800$, $1/800$, $1/100$, the independent exact rational Lipschitz bound is $L<13.917613<14$.

The environmental candidate uses a cubic stationary center, whereas the copied target candidate omitted that field from its numerical center. Their full-law residuals require separate budgets. In particular, environmental residual $10^{-6}$ alone does not imply that budget for the targets.

Starting from the sharper complete-state errors at $15/4$, retaining their emission-time dependence, and allowing a common new residual budget $1/6250$ gives

$$
e_P(17/4)<0.000260209,\qquad
e_V(17/4)<0.001179004,\qquad
e_A(17/4)<0.005533418.
$$

The independent reference is direct-errors-complete.py with complete-direct-error-known.json and complete-direct-error-target.json. A separate refinement, direct-errors-sharper.py, uses the sufficient uniform residual $1/25000$ and gives errors below $0.000240291$, $0.001077343$, $0.005134558$. Its receipt is sharper-direct-error-target.json. The earlier direct-errors.py retains the explicitly conditional $10^{-6}$ calculation; that budget is not assigned to the complete population. The mathematical reference preceded inspection of the new $17/4$ candidate and residual subject.

These sufficient conditions require a complete archive, preserved initial data, exact $C^2$ joins, continuous full-law residual coverage, and polynomial norms that close the position, speed and acceleration bounds. Given these premises, solve the fixed-source receiver equations locally from the accepted state. The error bound prevents a first exit when the polynomial norm plus error remains strictly inside the comparison ball. The argument covers every environmental receiver and both targets. Histories outside the affected set remain stationary by the complete causal census. Uniform range and subunit speed maintain unique cross roots and exclude positive self roots; the original root-tube, complement and jerk requirements still need explicit margins.

## 5. Grid choice and scope

The centered Taylor residual is valid at reception width $1/1024$ as well as finer widths. A wider interval may enlarge the enclosure or cross additional source polynomial cells. Every crossed cell must be included; a source-interval subdivision wrapper must preserve the union and outward hull, with known controls before target use. The source endpoint assertion and gap-free reception coverage remain necessary. A failed enclosure or cell-span assertion calls for subdivision and does not establish failure of the equation.

The final reconciliation in Section 9 covers the refreshed-population residuals, identity/prefix/join audit, class and first-exit margins, and all 120 environmental identities newly affected after $17/4$. The next maximum and any later motion remain open.

**Falsifiers.** An omitted identity, changed history, uncovered emission time, source-cell gap, failed exact join, residual above its budget, invalid stationary coefficient/remainder, or failed strict comparison margin overturns the corresponding claim. The independently controlled instruments and formulas identify where to inspect each premise. Failure of a sufficient estimate alone does not establish a Master Equation obstruction.

## 6. Archive compatibility and exact interpolation

The independent refresh-archive.py passed known exact dyadic endpoint, initial-population and signed-zero controls before reading the refreshed archives. The $15/4$ archive has SHA-256 a58a3b76d5a13b0161de861cc809657d24f680d7237725b18156604fd34fc06e; the $17/4$ archive has SHA-256 d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6. Their environmental identity sets equal the independently derived sets exactly. All 505 and 675 retained source prefixes, respectively, are bitwise unchanged. All 170 and 160 newly appended environmental histories are zero through the corresponding earlier cut. Both target copies and the reflected left partner match their frozen source arrays exactly.

For arbitrary exact nodal data $(y,v,a)$ and $(Y,V,A)$, the quintic Bernstein coefficients on a cell of width $h$ are

$$
\left(y,\ y+\frac{hv}{5},\
y+\frac{2hv}{5}+\frac{h^2a}{20},\
Y-\frac{2hV}{5}+\frac{h^2A}{20},\
Y-\frac{hV}{5},\ Y\right).
$$

The endpoint value, first derivative and second derivative are exactly the supplied triples by subtraction of these expressions. Adjacent cells share one nodal triple, proving every $C^2$ join. The archive audit verifies finite, correctly shaped shared nodal arrays; it applies this universal exact identity rather than claiming to have separately evaluated millions of rational expressions. The residual instrument encloses this exact Hermite polynomial from its dyadic nodes. Its interval coefficient arithmetic does not define a different rounded polynomial.

The source-interval subdivision wrapper was independently exercised on $(t-1/8)^4$ over $[1/16,3/16]$, spanning 128 history cells and containing an interior stationary point. Exact derivative extrema through order four were derived first. The wrapper encloses them and rejects an interval beyond the retained history. Its subdivisions overlap outward at each shared boundary, preserving the original interval's union. Receipts are source-wrapper-known.json and source-wrapper-target.json.

## 7. Independent quarter-step continuation and target comparison

Starting from complete state bounds $|y(17/4)|<0.01$, $|y'(17/4)|<0.03$, set receiver radius $1/16$. The coarse two-sided range bound puts every emission below $29/8<15/4$, after which the certified source radius gives $s\le3.5635<115/32$. Thus this step again uses only known source futures.

The independent quarter-delayed.py constructs fresh Bernstein norm bounds for every persistent incoming path at each $1/32$ cut of the authenticated $15/4$ archive. It adds the accepted emission-time error profile and sums the original changed-row bound

$$
16\,\frac{2b_j(s)r^{-3}+v_j(s)r^{-2}}{1-1/250},
\qquad r=\underline{|i-j|}-1/16-1/1000,
$$

at each receiver. All 676 incoming histories and all 956 affected receivers are covered. Exact first-onset bounds remove only unexcited rows; squared ranges above 20 are too late. The remaining infinite field is bounded by the already accepted stationary coefficient 70 on this radius. With known controls first, the resulting conditional bounds are

$$
|y_i''|<0.871806078,\qquad
|y_i(9/2)|<0.044743940<1/16,\qquad
|y_i'(9/2)|<0.247951520<1/3.
$$

These strict inequalities close the quarter-step first-exit argument when the preceding residual premises hold. The earlier quarter-independent.py deliberately used full-prefix maxima for every row; its receipt is marked INSUFFICIENT_BOUND and is not the accepted estimate. Retaining each row's emission-time dependence supplies the stronger result without altering the equation.

Complete ranges exceed $7/8$ and speeds stay below $1/3$, hence every cross channel has one simple positive root and no positive self root occurs. Received source speed is at most $1/250$, and received acceleration at most $3/8$, including the original pulse. Differentiating the changed row gives a time derivative below three. At most 388 generated positions plus two old rows and the accepted stationary derivative therefore give jerk below $19000<65536$. Original displacement, density, separation, acceleration and regularity bounds persist; local receiver uniqueness on these charts prevents a second continuation from departing from the certified one.

The separate later-target-reference.py independently finds exactly 113 final target sources, with no uncertain admission at radius $1/64$. Squared-range multiplicities are $6,12,8,6,24,24,12,13,4,4$ at $1,2,3,4,5,6,8,9,10,11$. Its receiver coefficient is below $20.716575<21$. Starting from the sharper independently accepted $33/8$ errors and allowing residual $1/6250$, it gives target errors below $0.000833962$, $0.005087851$, $0.030888588$. These justify the more conservative sign allowances $0.0011$, $0.006$, $0.032$.

With those larger allowances, independent continuous Bernstein and exact rational shared-trough calculations give the conditional enclosures

$$
\begin{aligned}
z'(t)&>0.0021957403361609&& (33/8\le t\le9/2),\\
z(9/2)&\in[0.007325836371441083,\ 0.009525836371441084],\\
z'(9/2)&\in[0.012434032539149193,\ 0.024434032539149195],\\
\frac{z(9/2)-m}{M-m}&\in[9928.264483345742,\ 16129.600222982734].
\end{aligned}
$$

The target archive has SHA-256 8b390a4a33c89eb401fa04dd9aa94c250f37d85b4c1bc818a8274e342a59104f. The final reconciliation accepts its complete reception intervals, full-law residual and required source histories. The ratio is the accumulated, unfinished rise from the accepted trough $m$, divided by the preceding completed fall from $M$. It is not a completed new excursion.

## 8. What crossing the wake speed would imply for own-history roots

This is a derived geometric implication, not an assertion that the actual target reaches that boundary. For a smooth complete path with the supplied stationary distant past, define its own-history causal residual at reception $t$ by

$$
F_t(\tau)=\tau-|X(t)-X(t-\tau)|,\qquad \tau>0.
$$

Suppose $t_*$ is the first instant with $|X'(t_*)|=1$, and every earlier speed is strictly below one. For any positive delay,

$$
|X(t_*)-X(t_*-\tau)|
\le\int_{t_*-\tau}^{t_*}|X'(s)|\,ds<\tau.
$$

The strict inequality follows because the continuous speed is strictly smaller than one throughout the open past interval. Therefore $F_{t_*}(\tau)>0$ for every $\tau>0$: the first equality-speed instant still has no positive own-history root. Nevertheless

$$
\lim_{\tau\downarrow0}\frac{F_{t_*}(\tau)}{\tau}=1-|X'(t_*)|=0.
$$

Thus any positive uniform normalized diagonal margin fails there. In the original class with margin $\eta=1/4$, its small-delay requirement already fails whenever a subunit current speed exceeds $3/4$. This is a boundary of that quantitative regularity certificate.

At any reception time $t$ with $|X'(t)|>1$, differentiability instead gives $F_t(\tau)/\tau\to1-|X'(t)|<0$, so $F_t$ is negative for all sufficiently small positive delays. In the stationary distant past, $X(t-\tau)$ becomes a fixed point, hence $F_t(\tau)=\tau-\text{constant}\to+\infty$. Continuity now guarantees at least one positive own-history root. This conclusion needs neither a new dynamical law nor an assumed acceleration sign.

The argument does not establish uniqueness, a nonzero transmitter factor, or a numerical root location. At a simple root, the delay derivative is $1-n\cdot X'(t-\tau)$, where $n$ points from the emitted position to the receiver. Its value concerns the source's emission-time velocity; a superunit reception velocity alone does not determine it. Multiple or nontransverse roots require a separate census and regularity analysis.

A numerical constructor which imposes an empty own-history root set can therefore no longer certify the full Master Equation after producing superunit motion. It has not evaluated the newly required root contributions or their regularity. This does not prove that the actual full equation reaches that numerical event, prohibits superunit motion, fails there, or shares the truncated constructor's subsequent trajectory.

## 9. Final reconciliation and disposition

The separate later-reconcile.py first passed known exact causal-graph, zero-cut boundary, interval-coverage and deliberate-gap controls. Its target run authenticated the numerical archives, reconstructed every selected environmental source edge from exact integer-distance and rational zero-cut inequalities, verified complete contiguous reception coverage, checked each residual budget, and reconciled the final 113 target sources with the independent actual first-onset census.

| Complete receipt | Reception interval | Continuous cells | Environmental generated rows | Full-law residual | Latest enclosed emission |
|---|---|---:|---:|---:|---:|
| population-check/population-residual.json | $[13/4,15/4]$ | 2048 | 17946 | $5.460740\times10^{-7}<10^{-6}$ | $<2.751421<13/4$ |
| cubic-population-check/population-residual.json | $[15/4,17/4]$ | 512 | 33406 | $3.077658\times10^{-6}<1/25000$ | $<3.257480<15/4$ |

These filenames are relative to the literal local evidence directory .local-data/master-equation-closure/post-restart/. The respective receipt SHA-256 values are d6b16b902a4661fbe9f46a94690bc77949deeba69dfbab5a887e55bc47a78f4e and b636861b1812a6e2b7fa6a5d471cc0a4a59086cf3bf0bc0751e209b782b5242d.

The $17/4$ environmental residual exceeds $10^{-6}$; this does not violate the complete-population theorem, whose unchanged sufficient budget is $1/25000$. The target suffix through $17/4$ has residual below $3.020000\times10^{-5}<1/25000$. Its earlier copied suffix retains the accepted residual below $1/40000$. Thus the uniform complete-population budget covers every path, without confusing environmental and target numerical centers. The independent propagated errors and measured polynomial norms close the complete $17/4$ state bounds used by the quarter-step proof.

The final target residual on $[33/8,9/2]$ is below $0.000143888085<1/6250$ on 1536 continuous cells. Its receipt SHA-256 is 3755e8ae616b09977a523ecb72a82930edda918fd34c4e4f39bd3613a4caa6cc. The separate sign receipt has SHA-256 2004530cd9440f0476e466b4275779339a583f3e9ce88182943a258c46c83a53. Independent Bernstein signs and the correlated ratio in Section 7 reproduce their stated conclusions within the relevant outward enclosures.

**Final disposition: accepted through $9/2$.** The scope comprises the full infinite-lattice equation with its stationary complement, complete affected population and causal roots, preserved original class and supplied past, actual continuation, quantitative state and source errors, and strictly increasing common target height. The new acceptance does not require all 956 future paths to be stored through $9/2$: the quarter-step theorem evolves them from their certified state using earlier known source histories. It does not assert a next maximum, a completed rising excursion, convergence, generic populated-universe behavior, or actual arrival at a wake-speed boundary.

No acceptance blocker remains for this finite extension. The final independent receipt is later-reconcile-target.json under .tmp/mec-008-post-restart/moore/. The falsifiers stated above remain attached to each mathematical and measured claim.
