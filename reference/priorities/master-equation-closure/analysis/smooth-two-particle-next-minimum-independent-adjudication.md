# Independent assessment of the next vertical minimum

## Verdict and scope

**Accepted as a computer-assisted derivation for this fixed supplied history: the unmodified Master Equation continues through $H=9/4$, both targets have exactly one next vertical minimum in $[2274/1024,2277/1024]$, and the completed downward excursion is smaller than the preceding upward excursion.** The independently checked ratio is enclosed by the submitted interval $0.4192709137<D_4/U<0.5237782768$. The targets are rising again at $H$.

The assessment independently developed the causal dependencies, population comparison, source-time error propagation and turn tests before reading the new contributor subjects. It then reviewed the frozen [continuation and error theorem](smooth-two-particle-next-minimum-continuation.md), [full-law residual certificate](smooth-two-particle-next-minimum-certificate.py), and [fourth-turn certificate](smooth-two-particle-next-minimum-turns.py). The accepted [pulse-end continuation](smooth-two-particle-later-pulse-end-independent-adjudication.md), [full-law residual propagation](smooth-two-particle-later-residual-propagation.md), and their numerical data are inherited inputs. No earlier mathematical subject or independent reference was modified for this assessment.

The same infinite checkerboard cubic lattice, fixed complete supplied history, prescribed eight-source stationary block sum, $g=16$ and $c_f=1$ remain in force. The relevant coordinate is the common vertical displacement of the two reflected targets. A vertical minimum is a change of its velocity from negative to positive. It is not a reversal of their horizontal separation, and no finite collection of minima establishes eventual settling.

The numerical scout selected $H=9/4$ after locating a proposed minimum near $2.222$; that estimate selected the domain and is not a proof premise. Actual continuation, full residuals and continuous sign enclosures now discharge the hypotheses below. The result is a finite supplied-history theorem. Eventual settling, a damping law, horizontal separation reversal and typical populated-universe preparation remain unproved.

## 1. A finite dependency construction inside the infinite population

Let $B=1/128$ be a conservative local radius for the source and target dependency calculation, and retain the accepted source cut $a_0=33/32$. The certified source and target tubes in Section 2.1 are much smaller; the global population uses the separate ball in Section 1.1. Choose a new source cut $a_1=41/32$. A cross-root sampled by a receiver at time $t$ inside the local dependency tubes satisfies

$$
s\le t-1+2B,
$$

because distinct anchors are at least one lattice spacing apart. Thus the exact rational comparisons

$$
H-1+2B=\frac{81}{64}<a_1,
\qquad
a_1-1+2B=\frac{19}{64}<a_0
\tag{1}
$$

give three receiving stages. The old-pulse source prefix is already accepted through $a_0$. Newly required source histories can be evolved through $a_1$ using only that older prefix. The final target can then be evolved through $H$ using the new prefix. These stages arise from strictly positive propagation delays. They do not prescribe a source future or discard the infinite stationary field.

For an environmental lattice label $j$, define $m_j$ as its smallest squared distance to an original target among distances at least two. Squared distances zero and one are excluded because those particular old pulse receptions finished before the forward release. The first postrelease old excitation starts at $\sqrt{m_j}-11/8$. Before that event the label is stationary unless an earlier generated path reaches it; the triangle inequality excludes such an earlier generated path for environmental labels in this geometry. The two targets themselves require separate treatment because their direct old excitations finished before release.

For a final target $i$, an environmental identity can contribute a changed row only if

$$
\sqrt{m_j}+\lVert i-j\rVert\le H+\frac{11}{8}+2B.
\tag{2}
$$

The reversed margin $-2B$ suffices to establish that its onset has occurred. Exact integer enumeration and rational square comparisons find the same set on both sides, giving the following definite membership through the candidate horizon:

| Squared target-source anchor distance | Environmental identities |
| --- | ---: |
| $1$ | 5 |
| $2$ | 12 |
| $3$ | 8 |
| Total | 25 |

The other target's generated future is also a changed source history, giving **26 changed source identities per target**. Its first generated reception back at its partner occurs after two additional unit legs from the earliest old environmental excitation, around $\sqrt2+5/8$. Positive self roots remain excluded by the subunit-speed hypothesis. A count of identities is not a count of excitation paths or all pairwise lattice relations.

The new prefix $[0,a_1]$ needs 100 old-excited environmental labels, grouped by first squared exciting distance as $24,8,12,32,24$ for $m=2,3,4,5,6$. Both target histories also evolve on this prefix; only the opposite target is required as a source for one final target. Labels outside that finite causal region still contribute their exact stationary rows through the fixed infinite block sum. These counts are measured by the independently authored exact lattice instrument, conditional on the displayed displacement and continuation hypotheses; they do not themselves prove actual continuation.

The upper bound $19/64$ on incoming source times is earlier than $\sqrt3-11/8$, so only first-$m=2$ histories can be sampled as generated sources on the new prefix. Their generated range must be one: $\sqrt2+\sqrt2-11/8-2B>a_1$ excludes the next range. Thus the new source stage has at most six changed generated unit rows per receiver. Its first-$m=6$ old-excited labels may use the exact trial zero cut $137/128<\sqrt6-11/8$; these newly required labels were stationary on the old retained prefix.

### 1.1. Independent population continuation inequalities

A larger population ball can close the new continuation while the source and target histories used by the certificate retain much smaller radii. The independently reconstructed sufficient choice is

$$
B_{\rm pop}=1/64,\quad C=1500,\quad
Y(t)=b+K(t-1)_+^2,\quad b=1/25000,\quad K=1/144,
\quad V=1/32,\quad A=1/8.
$$

The new source-prefix bounds are $b_1=1/200000$ and $v_1=1/16000$. The source certificate in Section 4 establishes them against the already accepted actual evolution on $[0,a_1]$. The coarse source cut is $H-1+B_{\rm pop}+b_1=1.26563<a_1$. Thus a global receiver in the prospective population ball still samples only constructed source histories. The target membership calculation in (2) needs only the much smaller target/source tubes of Section 2.1; it is not inferred from $B_{\rm pop}$ alone.

The stationary block estimate remains valid since $1309/(1-B_{\rm pop})^5<1500$. The old-pulse range floor needs a separate sharp check: $B_{\rm pop}$ alone does not give range $7/5$. The stronger bootstrap does, because $Y(H)<1/80$ and

$$
\left(\frac75+\frac1{80}+\frac1{314928}\right)^2<2.
$$

This check precedes reuse of the integrated old-pulse identity. Generated range floors may still use the looser population ball. Only squared ranges $1,2,3,4$ can occur globally: their maximum anchor range is below $\sqrt5$. Set

$$
d=(1,7/5,12/7,2),\quad N=(6,12,8,6),\quad
Q_j=\frac{2b_1(d_j-B_{\rm pop}-b_1)^{-3}+v_1(d_j-B_{\rm pop}-b_1)^{-2}}{1-v_1}.
$$

The direct acceleration bound is

$$
g\left[CB_{\rm pop}^3+2\frac{825}{11238052}+\sum_jN_jQ_j\right]
<0.112768<\frac18.
$$

It supplies the acceleration parameter required by the old-pulse integration identity. For $w=(t-1)_+$ and $W=H-1=5/4$, each delayed term satisfies $(t-d_j)_+\le(H-d_j)w/W$. The independently integrated stationary term has the same cubic-polynomial identity as the accepted earlier continuation. Exact rational evaluation gives

| First-exit comparison | Derived upper value | Required ceiling |
| --- | ---: | ---: |
| Position constant, integrated old pulse plus stationary constant | $3.024340\times10^{-5}$ | $b=4\times10^{-5}$ |
| Coefficient multiplying $w^2$ | $0.006085027$ | $K=1/144$ |
| Speed | $0.022758$ | $1/32$ |
| $Y(H)$ | $0.010890695$ | $1/80$ |

The strict inequalities exclude a first displacement or speed exit. Complete source roots remain in their retained prefix and have positive transmitter factors. The finite receiving equations therefore admit ordinary continuation on this regular domain. The separately written arithmetic instrument checked these comparisons before the contributor proof was opened. The subject supplies a different valid old-pulse estimate using range floor $11/8$ and the exact pulse amplitude, recomputing the pulse integral constants on the whole population ball. Its strict margins agree with this independent continuation conclusion.

The full population separation is at least $1-2B_{\rm pop}=31/32$, and every complete history has speed below $1/32$. The complete cross-delay residual therefore increases at least $31/32$ per unit delay, with opposite signs at zero and sufficiently large delay. Every cross channel has exactly one positive root. The positive self-delay residual is at least $31\tau/32$, so it cannot vanish. The zero-delay diagonal remains unevaluated. At most 34 changed rows, the inherited per-row derivative bound and the stationary derivative give the subject's jerk ceiling $3280$. Together with the acceleration bound and smooth joins, this retains the original history class. The minimum positive cross delay also supplies successive ordinary-ODE uniqueness intervals for the stated bounded comparison class. These statements have been reviewed against the complete supplied past, including its negative-time pulse.

## 2. Error propagation must respect the delayed onset

The former 21-environmental-source error budget cannot simply be applied unchanged. The new source stage contains generated incoming histories, and the final target receives its partner's forward history. Every incoming source-time shift must therefore be charged to its own accepted error enclosure.

For a changed row with range floor $r$, source speed at most $V<1$ and source acceleration at most $A$, let $P(s)$ and $W(s)$ bound source position and velocity errors at the relevant source times. The accepted implicit-root differentiation gives

$$
\lVert\Delta Q\rVert\le C_P(r)P+C_V(r)W,
$$

$$
C_P(r)=\frac{2r^{-3}}{(1-V)^2}+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3},
\qquad
C_V(r)=\frac{r^{-2}}{(1-V)^2}.
\tag{3}
$$

The acceleration term in $C_P$ accounts for evaluating the two source velocities at different emission times. Omitting it would not bound the unchanged delayed equation.

Let $r_i(t)$ be the complete polynomial residual norm, including the stationary-field norm ball. Let $L_i(t)$ bound receiver-position sensitivity, including the derivative of that stationary field. If $S_{ij}(t)$ encloses both relevant emission times, a sufficient actual-path comparison is

$$
\begin{aligned}
E_i(t)&\le E_i(t_0)+(t-t_0)F_i(t_0)\\
&\quad+\int_{t_0}^t(t-u)\left[L_i(u)E_i(u)+r_i(u)+g\sum_j\left(C_{P,ij}\sup_{s\in S_{ij}(u)}E_j(s)+C_{V,ij}\sup_{s\in S_{ij}(u)}F_j(s)\right)\right]du,\\
F_i(t)&\le F_i(t_0)+\int_{t_0}^t\left[L_i(u)E_i(u)+r_i(u)+g\sum_j\left(C_{P,ij}\sup_{s\in S_{ij}(u)}E_j(s)+C_{V,ij}\sup_{s\in S_{ij}(u)}F_j(s)\right)\right]du.
\end{aligned}
\tag{4}
$$

Here $E_i$ and $F_i$ are position and velocity error majorants. Equation (1) makes this a finite staged comparison: the source-error terms are known before the corresponding receiver stage is bounded. For a constant receiver Lipschitz bound $L$, the exact nonnegative integration kernels are $\sinh(\sqrt L(t-u))/\sqrt L$ for position and $\cosh(\sqrt L(t-u))$ for velocity. Constant maxima are sufficient, but unnecessary charging before a causal onset can make them too loose to determine a small turn.

In particular, the additional generated contribution on the new source stage vanishes before its earliest reception. Its further error contribution to the target vanishes until the next delayed reception. The accepted early-zero cuts and exact implicit root intervals must preserve those zeros for the polynomial histories as well as for the actual histories. Charging the largest new source error over the entire interval since $t=1$ would discard this useful causal information.

### 2.1. An independently computed sufficient error profile

For the conditional calculation, use source displacement, speed and acceleration bounds

$$
b_1=1/200000,\qquad v_1=1/16000,\qquad A_1=1/400,
$$

and a target radius $b_t=1/100000$. The source-prefix certificate and continuation comparison discharge these hypotheses in Section 4. Using the larger constant $C=1500$ for the stationary derivative is harmless on these smaller tubes. The exact changed-row receiver derivative formula, including the implicit source-time derivative, gives

$$
L_{\rm src}<6.448264<7,\qquad L_{\rm target}<0.679279<1.
\tag{7}
$$

The source inventory has at most two old rows and six generated unit rows. The target inventory has six unit rows including its partner, twelve face-diagonal rows and eight body-diagonal rows. Rational range floors are $99/100$, $7/5$ and $12/7$. Equation (7) includes the full stationary derivative, not only the changed rows.

The old source error for first excitation $m$ may start from its own accepted exact zero time $\theta_m$:

$$
E_{0,m}(s)=\frac{\rho_0}{7}\left[\cosh\!\left(\sqrt7(s-\theta_m)_+\right)-1\right],
\quad
F_{0,m}(s)=\frac{\rho_0}{\sqrt7}\sinh\!\left(\sqrt7(s-\theta_m)_+\right),
\tag{8}
$$

where $\theta_2=1/32$, $\theta_3=11/32$, $\theta_4=39/64$, $\theta_5=27/32$ and $\theta_6=137/128$. Both actual and trial paths have zero position and velocity at those cuts. These individual zero times materially improve the error bound for later-excited sources.

Starting from the inherited values at $a_0$, propagate each source error on exact cells of width $h=1/1024$. For a cell with constant nonnegative incoming error upper bound $q$, the exact positive comparison update is

$$
\begin{aligned}
E_+&=C_LE+S_LF+D_Lq,\\
F_+&=LS_LE+C_LF+S_Lq,\\
C_L&=\cosh(\sqrt Lh),\qquad
S_L=\frac{\sinh(\sqrt Lh)}{\sqrt L},\qquad
D_L=\frac{C_L-1}{L}.
\end{aligned}
\tag{9}
$$

Source-stage incoming error is bounded from (8) at the right cell endpoint minus $1-b_1-b_0$, where $b_0=1/60000$. The next target stage uses its complete integer source inventory and upper emission times $t-\sqrt n+b_t+b_1$. The square-verified rational floors $1414213/10^6<\sqrt2$ and $1732050/10^6<\sqrt3$ replace the irrational distances conservatively. Rounding every queried source time up to its next grid endpoint preserves a nondecreasing error majorant. The partner's incoming error is obtained from the already computed earlier target majorant, because its positive delay places the query before the current receiving cell.

The separately authored instrument encloses the coefficients in (9) with exact positive rational series plus geometric upper bounds on their tails. Its subsequent nonnegative floating-point additions and multiplications each round upward. Under uniform full residual budgets

$$
\rho_0\le10^{-10},\qquad\rho_1\le10^{-10},\qquad\rho_t\le10^{-9},
$$

it independently obtains the following sufficient bounds at $H=9/4$:

| Error | Strict upper bound |
| --- | ---: |
| Source-prefix position through $a_1$ | $2.112\times10^{-10}$ |
| Source-prefix velocity through $a_1$ | $9.001\times10^{-10}$ |
| Target position through $H$ | $7.912\times10^{-9}$ |
| Target velocity through $H$ | $3.048\times10^{-8}$ |
| Target acceleration on its cells | $1.240\times10^{-7}$ |

These are sufficient error bounds computed before reading the new archives or contributor proof. They are not measured target states. The exact archive check in Section 4 supplies the slightly stronger old first-$m=2$ trial zero needed at the retained prefix: a source-time shift can cross the older conservative cut $1/32$ just before $a_0$, while the actual onset is later. The archive has the required stronger zero without a data change.

After the contributor freeze, a separate exact positive-series reconstruction also checked its convolution formula and obtained source errors below $2.467902\times10^{-10}$, $1.104307\times10^{-9}$ and $5.854369\times10^{-9}$ in position, velocity and acceleration. Its target errors are below $1.216109\times10^{-8}$, $4.616893\times10^{-8}$ and $1.832462\times10^{-7}$. Thus the submitted rounded allowances

$$
\varepsilon_P=1.3\times10^{-8},\qquad
\varepsilon_V=5\times10^{-8},\qquad
\varepsilon_A=2\times10^{-7}
$$

are accepted. The independent calculation above is tighter because it retains each source's own exact zero time and the partner's earlier error profile. Both derivations include the source-time displacement term and both use the same unmodified acceleration law.

## 3. A sufficient next-minimum and excursion test

Let $Z$ be the final target's vertical polynomial coordinate, and let $\varepsilon_P(t)$, $\varepsilon_V(t)$ and $\varepsilon_A(t)$ be certified actual errors. To prove that $[l,r]$ contains the next minimum after the old endpoint $H_0=259/128$, require continuous bounds

$$
Z'(t)+\varepsilon_V(t)<0\quad(H_0\le t\le l),
$$

$$
Z'(l)+\varepsilon_V(l)<0,
\qquad Z'(r)-\varepsilon_V(r)>0,
\qquad Z''(t)-\varepsilon_A(t)>0\quad(l\le t\le r).
\tag{5}
$$

The first inequality excludes an intervening turn. The remaining inequalities establish existence and uniqueness of the minimum: actual velocity crosses zero once while increasing strictly. A sampled sign change alone establishes neither complete exclusion nor uniqueness.

Write $m_2$ for the previous accepted minimum, $M_3$ for the following accepted maximum, and $m_4$ for this new minimum. The preceding upward excursion is $U=M_3-m_2$ and the new downward excursion is $D_4=M_3-m_4$. Their shared maximum cancels:

$$
D_4<U\quad\Longleftrightarrow\quad m_4>m_2.
\tag{6}
$$

Consequently an enclosed lower bound on the new minimum exceeding the accepted upper bound on $m_2$ proves the next excursion is smaller, without independently charging the common maximum twice. Conversely, an enclosed upper bound on $m_4$ below the old minimum's lower bound proves that the new excursion is larger. Overlapping intervals leave this comparison unresolved; they do not establish equal amplitudes.

For intervals $m_2\in[B_-,B_+]$, $M_3\in[C_-,C_+]$, $m_4\in[D_-,D_+]$ satisfying the relevant order, a ratio enclosure can be obtained by monotonicity of $(C-D)/(C-B)$ or by exact interval arithmetic retaining the common $C$. No numerical turning time is treated as an exact root.

## 4. Frozen full-law residual and archive assessment

The new archive contains 101 source paths through $a_1$ and one final target path through $H$: 100 environmental histories plus the opposite target's prefix. The other target is the final receiver. Thus it represents 102 distinct identities, while the mathematical population is infinite. Its source arrays have shape $(1313,101,3)$ and its target arrays have shape $(2305,1,3)$ on the exact grid $1/1024$.

The independent archive check verifies the retained 76 source histories through $a_0$, the complete old right-target nodes through $H_0$, and the exact plane reflection defining the opposite target's prefix. Position, velocity and acceleration nodes are compared as binary64 bit patterns. Reflection preserves the full equation and supplied histories: both polarities change sign, their pair products do not, and the accepted fixed-block symmetry supplies the stationary-field transformation. The opposite target therefore inherits the accepted right-target full-law residual. Its old negative-time pulse is still part of the complete supplied history; at the final target's unit-range channel and $t\ge0$, the source root lies after that pulse ended, so the polynomial provider's zero negative-time lookup is equivalent on every queried root.

Each interval path is the unique exact nodal quintic interpolating position, velocity and acceleration at its endpoints. Solving the six endpoint conditions proves the common $C^2$ joins for arbitrary nodal data. The separate exact rational instrument additionally reconstructs all 232 new target cells and checks 4,176 endpoint equalities. The interval coefficient arithmetic in the residual checker encloses these exact polynomials; the polynomial is not defined by independently rounded floating coefficients.

Two stronger exact zeros protect the inherited residual prefix. The first-$m=2$ source arrays vanish through $33/1024$, which exceeds the largest source time that could enter a newly added trial row before $a_0$. The opposite target's prefix vanishes through $33/32$, which excludes its new trial row on the retained final-target interval through $H_0$. The new first-$m=6$ histories pass the submitted zero cut $17/16$; the independent archive check additionally finds exact zero through $137/128$, discharging the stronger cut used in Section 2.1. No source history is extrapolated beyond its recorded horizon.

The source-stage changed-row inventory contains 136 environmental generated edges, independently reconstructed as first-$m=2$ sources at unit range. The other eight physical generated prefix receptions are four to each target and are covered by the inherited target certificate and exact reflection. The final target has the independently reconstructed 26 changed source identities. All excluded trial rows lie in verified exact-zero history segments; the complement's stationary rows remain in the infinite stationary field.

Reading the frozen residual implementation confirms the original transmitter denominator, implicit moving-root time derivatives, ordered checkerboard signs, source-knot derivative hulls and stationary-field norm ball. Its centered residual Taylor enclosure splits at every target polynomial knot. It covers 2,048 exact time cells for each of 100 added environmental paths and 1,856 exact time cells for the added final target. Each interval has width $1/8192$. The source callback rejects any upper query beyond its retained prefix; its root enclosures and positive transmitter factors are checked inside the inherited interval primitive.

The submitted continuous-cell results are:

| Certificate quantity | Enclosed result |
| --- | ---: |
| Full source residual, inherited maximum included | $<9.471749\times10^{-11}$ |
| Added source residual | $<6.550483\times10^{-11}$ |
| Full target residual, inherited maximum included | $<1.539527\times10^{-11}$ |
| Added target residual | $<5.921864\times10^{-12}$ |
| Source polynomial position, velocity, acceleration norms | $<3.116196\times10^{-6}$, $<2.771665\times10^{-5}$, $<0.000691546$ |
| Final target polynomial position norm | $<4.651661\times10^{-6}$ |
| Largest source-stage generated emission | $<0.281253167<a_0$ |
| Largest final-target emission | $<1.250001002<a_1$ |

The stationary norm ball is included at both stages. Its largest added source and target contributions are below $6.778319\times10^{-13}$ and $1.999542\times10^{-14}$, respectively. These enclosures are residual evidence for the original infinite-lattice equation, even though the numerical proposal used zero as the center of the stationary contribution. They are not finite bare-lattice results.

The source polynomial norms plus the independently checked errors close all three actual source-prefix bounds. That prefix already has actual existence from the accepted earlier theorem, so the error argument improves its bounds without assuming a final-target numerical trajectory. The source bounds then supply population continuation; the target polynomial radius plus its error closes the target tube. This discharges the conditional hypotheses in Sections 1–3.

### 4.1. Complete population count

The separate exact census audit of the frozen subject finds 392 entered old directed channels, of which 328 have completed their old pulse receptions, and 1,540 generated directed channels to 216 receivers. Their receiver union has 248 histories that are nonconstant somewhere on $[0,H]$. The old direct receivers number 246; the generated receiver union adds just the two targets. The remaining infinitely many labels stay stationary through this horizon. The source-prefix construction requires only its 100 environmental identities and two target prefixes, because every later received root lies inside that earlier causal region.

These counts are accepted together with the subject's onset argument. Inventory alone would not establish nonzero motion: the first direct pulse has a nonzero leading coefficient, and any tied generated contribution begins at higher order. The separately checked event margins put every included family before the horizon and every excluded family after it, without an unresolved boundary shell. Four new body-diagonal return paths per target have entered, but their old-pulse endpoints remain beyond this horizon. The minimum occurs while those received histories are still evolving.

## 5. Accepted fourth minimum and smaller descent

The independent exact rational instrument reconstructs the new target's quintic coefficients from the nodal data, differentiates them and transforms each polynomial to Bernstein form on its entire cell. The Bernstein basis is nonnegative and sums to one, so its coefficient extrema bound all intermediate times. It does not infer a sign from sampled nodes.

With the accepted rounded errors, its fourth-turn window is

$$
I_4=[2274/1024,2277/1024]=[2.220703125,2.2236328125].
$$

The maximum actual velocity before this window is below $-3.658512\times10^{-7}$, and the minimum actual velocity after it through $H$ exceeds $5.835841\times10^{-7}$. Throughout the window, the actual acceleration exceeds $0.0003423119$. The endpoint signs and strictly positive acceleration establish exactly one minimum. The full intervening signs, combined with the preceding accepted certificate, establish that it is the fourth consecutive vertical turn on $[5/4,H]$.

The submitted actual height and completed-excursion enclosures are accepted:

$$
3.6306106607\times10^{-7}<m_4<3.8976380051\times10^{-7},
$$

$$
5.9055689390\times10^{-7}<D_4<7.3784026631\times10^{-7},
\qquad
0.4192709137<\frac{D_4}{U}<0.5237782768<1.
$$

The separate Bernstein enclosure is slightly tighter, giving $m_4\in[3.63211179499\times10^{-7},3.89763795147\times10^{-7}]$ and ratio $[0.4192709175,0.5236717142]$, contained in the submitted intervals. These displayed decimals are rounded outward; the receipt retains the exact fractions. The difference is consistent with the different continuous polynomial range bounds and changes no conclusion.

The new minimum is strictly above the preceding accepted minimum, which lies in $[-4.282122483461487\times10^{-7},-3.077868455403922\times10^{-7}]$. Thus the common preceding maximum cancels as in (6), proving the new descent is smaller. For the ratio, differentiation of $(C-D)/(C-B)$ shows that it increases with $C$ and $B$ and decreases with $D$ when $C>D>B$. Hence the rigorous correlated bounds are

$$
\frac{C_--D_+}{C_--B_-}\le\frac{D_4}{U}\le\frac{C_+-D_-}{C_+-B_+}.
$$

This uses the same maximum in numerator and denominator. The final target velocity interval is strictly positive, approximately $[1.33933429097\times10^{-5},1.34933429098\times10^{-5}]$. Both reflected targets are rising again at $H$. The certificate establishes this additional finite excursion; it does not establish that every subsequent excursion shrinks.

## Evidence record and falsifiers

The new independent instruments in `.tmp/mec-008-next-minimum/moore/` each passed known controls before their target runs. `dependency_check.py` checked the initial $5/2$ planning domain; `horizon_check.py` checked the narrowed $9/4$ domain; `population_check.py` checked the independently reconstructed continuation; `propagation_check.py` checked the independent delayed error profile; `subject_check.py` checked the frozen subject's complete census and convolution bounds; and `turn_check.py` checked the frozen archive, exact joins, reflection, continuous signs and correlated excursion ratio. The known cases include exact lattice shells and absent shell seven, exact square-root brackets, positive-series coefficients, a directly integrated low-degree convolution, an exact quadratic minimum, and polynomial/Hermite/Bernstein identities. The shared venv executed Python 3.13.2.

The full-law residual implementation was reviewed as a frozen subject. Its current interval primitives passed their independent analytic controls before the new residual run, and its new graph, signed scatter, quintic and centered-remainder controls passed before target use. The primitive controls include separately evaluated nonzero implicit reception derivatives. This assessment did not duplicate the full residual run or call a same-code replay an independent dynamics instrument. Independence comes from the separately derived continuation and delay comparisons, exact census and series arithmetic, and the independently constructed exact polynomial sign reference.

Under the operator's contemporaneous removal of historical own/sibling script-hash enforcement, the new reviewer instruments record source hashes as provenance rather than reject a source file solely because its bytes differ. Fresh known controls preceded fresh target runs after that administrative change. Numerical archive authentication and exact retained-data comparisons remain active. This change does not modify the mathematical reference or the numerical data. The role used is the Ramon E. Moore certified-interval lens; the role name supplies no acceptance authority beyond the displayed evidence.

The final review has no unresolved mathematical blocker for this fixed finite-interval result. Concrete falsifiers are a failed population tube, an uncovered incoming source time, an omitted partner or environmental history, premature nonzero interpolant, an incorrect transmitter denominator, a missing stationary-field contribution, invalid joins or root enclosures, or a failed strict sign or amplitude inequality. A later larger excursion, horizontal reversal, or failure to settle would not falsify the result accepted here.
