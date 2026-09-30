# Continuation after the complete-population restart

## Scope and status

**Developing sufficient theorem; no actual continuation beyond $15/4$ is claimed here yet.** The accepted input is the [complete-population restart](smooth-two-particle-population-restart-independent-adjudication.md): all affected histories exist through $15/4$, every affected history is represented and certified through $h=13/4$, and the common target height is strictly rising through $15/4$. The current numerical search has not located the next upward maximum. This subject owns continuation and delayed-error requirements for the next finite candidate interval, initially $H=33/8$.

The supplied complete past, $g=16$, $c_f=1$, alternating cubic lattice, infinite stationary eight-source block field and original regularity class are fixed. No settling, future maximum, population typicality or completed-excursion claim is assumed. Previous subjects and archives remain frozen inputs.

## 1. Received histories and the restart state

The accepted actual state at $h=13/4$ obeys the uniform bounds $p_0=1/2000$, $v_0=1/1000$, $a_0=1/100$. Its archive contains 504 environmental histories and both original targets through $h$. Every other identity has zero state until its first old-pulse front arrives. The accepted first-front argument excludes generated-only first-excitation identities outside that inventory: a generated chain cannot outrun the direct anchor-distance front, and the original unit-neighbor exception receives the other original target's old pulse earlier.

For a prospective receiver bound $B$ and received-source bound $b_s=1/2000$, every future emission through $H=33/8$ satisfies

$$
s\le H-1+B+b_s.
\tag{1}
$$

For $B=1/64$ the right side is $3.141125<13/4$; even $B=1/16$ leaves strict coverage. There is no circular use of the small source bound: the preliminary whole-population range $1-2B$ first gives $s\le H-1+2B\le13/4$ for every $B\le1/16$, after which the already certified source radius gives (1). Thus no new source-history integration is necessary to cover this horizon. The original environmental history-class ceiling is $1/16$, whereas the preceding proof's $1/64$ population tube is an auxiliary estimate. Any newly chosen auxiliary tube must retain the original history class and give an explicit comparison uniqueness statement.

Restarting from the preceding coarse endpoint envelope $Y(15/4)=0.015$ would leave only $0.000625$ inside $1/64$. The useful restart is therefore the certified small actual state at $13/4$, with its complete already-known incoming histories, not that coarse endpoint envelope.

## 2. Source-resolved integrated estimates

Let $\beta_j(s)$ be a nondecreasing certified displacement envelope for persistent source $j$, zero before its first excitation, and write $B_{1,j},B_{2,j}$ for its first and second primitives from the zero past. For anchor-distance brackets $d\le|i-j|\le\bar d$, set

$$
S^+(t)=t-d+B+b_s,\qquad S^-=h-\bar d-B-b_s,\qquad k=(d-B-b_s)^{-1}.
\tag{2}
$$

With receiver speed $V$, receiver acceleration $A$ and received-source speed $v_s$, the already established vector-source identity gives

$$
M=\frac{1+v_s}{1-V},\quad D=\frac{k^2}{1-V},\quad J=\frac{2k^3}{1-V}+\frac{2k^3VM}{1-V}+\frac{k^2}{(1-V)^2}[k(VM+v_s)V+AM]+\frac{k^3V(1+v_s)}{(1-V)^2}.
\tag{3}
$$

For $\Delta=H-h$, the generated contributions for receiver $i$ are bounded by

$$
\begin{aligned}
G_{P,i}&=g\sum_{j\ne i}\{J[B_{2,j}(S^+(H))-B_{2,j}(S^+(h))-\Delta B_{1,j}(S^-)]+D[B_{1,j}(S^+(H))-B_{1,j}(S^+(h))+\Delta\beta_j(S^+(h))]\},\\
G_{V,i}&=g\sum_{j\ne i}\{J[B_{1,j}(S^+(H))-B_{1,j}(S^-)]+D[\beta_j(S^+(H))+\beta_j(S^+(h))]\}.
\end{aligned}
\tag{4}
$$

Both restart endpoint terms and the lower source-time primitive are retained. Each summand uses the source's own position in the lattice and its own certified history. Stationary sources have zero changed row; their infinite contribution remains in the stationary field. A shellwise uniform replacement is sufficient only if its own first-exit inequalities close.

For $Y(h+u)=p_0+Ku$, a stationary-field bound $|S_0(y)|\le C|y|^3$ contributes

$$
\begin{aligned}
S_P&=gC[p_0^3\Delta^2/2+p_0^2K\Delta^3/2+p_0K^2\Delta^4/4+K^3\Delta^5/20],\\
S_V&=gC[p_0^3\Delta+3p_0^2K\Delta^2/2+p_0K^2\Delta^3+K^3\Delta^4/4].
\end{aligned}
\tag{5}
$$

Let $O_V$ bound the two possible original supplied-pulse rows on the restart. Their range is at least $h+9/8=35/8$; the inherited inverse-range ceiling $1/4$ is sufficient. The explicit first-exit requirements are

$$
p_0+K\Delta<B,\qquad v_0+O_V+\frac{\max_iG_{P,i}+S_P}{\Delta}<K,\qquad v_0+O_V+\max_iG_{V,i}+S_V<V,
\tag{6}
$$

along with the pointwise acceleration bound below $A$, strict source-time coverage (1), and the original history-class margins. The improved stationary-field estimate being developed separately is an input only after its independent proof is accepted; it is not silently assumed here.

## 3. A sufficient population tube through $33/8$

The [stationary-field reference](smooth-two-particle-post-restart-stationary.md) proves $S_0(y)=aT(y)+R(y)$ with $|a|<14.3977$, $|R(y)|\le7995(1-B)^{-7}|y|^5$ and $|DR(y)|\le39975(1-B)^{-7}|y|^4$. Its cubic satisfies the sharper norm bound $|T(y)|\le|y|^3$: putting $u_i=y_i^2/|y|^2$, $e_2=\sum_{i<j}u_iu_j$ and $e_3=u_1u_2u_3$, direct expansion gives

$$
\frac{|T(y)|^2}{|y|^6}=1-\frac{15}{4}(e_2-5e_3)\le1.
\tag{7}
$$

Indeed $e_2\ge9e_3$ follows from $\sum_i1/u_i\ge9$ when every $u_i>0$, and the boundary follows directly. Thus on $B=1/20$, the reference gives $|S_0(y)|<50|y|^3$ and, separately from its derivative remainder, $|DS_0(y)|<10000|y|^2$. The deliberately loose derivative bound is used only for the history-class jerk check. These are bounds on the unchanged infinite field.

Use

$$
B=\frac1{20},\quad V=\frac18,\quad A=\frac12,\quad K=\frac1{20},\quad C=50,\quad b_s=\frac1{2000},\quad v_s=\frac1{1000},\quad A_s=\frac1{100}.
\tag{8}
$$

The source envelopes use two frozen outward polynomial norm receipts: `.local-data/master-equation-closure/population-restart/check/polynomial-bounds.json` and `.local-data/master-equation-closure/post-restart/check/prefix-norms.json`. Both refer to the accepted population archive through $13/4$. The latter evaluates that same archive at $90/32,\ldots,104/32$; it introduces no new trajectories. The previously derived actual source error is below $10^{-6}$ in position through $89/32$, and below $5\times10^{-6}$ in position and $15\times10^{-6}$ in velocity through $13/4$. These looser ceilings follow from the accepted preceding positive-kernel error theorem and include both original targets.

For each persistent source, the arithmetic constructs a nondecreasing step envelope as follows. Before $73/32$ the accepted global levels are $5\times10^{-6}$ after $1/32$, $10^{-5}$ after $41/32$ and $25\times10^{-6}$ after $57/32$. Each may be capped by that source's certified full-prefix norm plus $5\times10^{-6}$. On each subsequent interval ending at $n/32$, use the corresponding per-path polynomial norm plus $10^{-6}$ for $n\le89$, and plus $5\times10^{-6}$ for $90\le n\le104$. Capping by the full-prefix ceiling and taking a nondecreasing running maximum preserves an upper envelope. An increment may be delayed to the dyadic floor of the source's exact first onset, because that history is zero before onset. The reflected partner and separately stored right target have equal norm bounds, as established by the accepted exact reflection. No environmental path is replaced by the original target path.

The exact rational instrument `restart_exact.py` first passes known constant-envelope, zero-cut, cubic-shell, radical-bracketing and upward-rounding controls. It authenticates the population archive, encloses every source envelope upward on a $10^{-10}$ grid, and brackets each anchor distance by rational endpoints within $10^{-9}$. Formula (4)'s nonnegative coefficient of every step increment is computed exactly and rounded upward on a $10^{-18}$ grid. The resulting integer sums bound every receiver separately. Distances with squared value at least 19 are inactive, since even the earliest generated source onset plus their lower range exceeds $H$; the exact first-onset inventory supplies all 836 receivers. No statistical or cancellation assumption enters these sums.

The recorded target arithmetic gives

| Quantity | Upper bound or strict lower margin |
|---|---:|
| Maximum generated displacement $G_P$ | $<0.038399937$ |
| Maximum generated speed increment $G_V$ | $<0.097114213$ |
| Old-pulse speed increment $O_V$ | $<0.000015620$ |
| Stationary displacement $S_P$ | $0.002714477978515625$ |
| Stationary speed $S_V$ | $0.015336034765625$ |
| Displacement-slope margin in (6) | $>0.001996478$ |
| Speed margin in (6) | $>0.011534133$ |
| Pointwise acceleration | $<0.445779773<1/2$ |
| Endpoint envelope $p_0+K(H-h)$ | $0.04425<1/20$ |
| Source-history coverage margin | $13/4-(H-1+B+b_s)=0.0745$ |

The pointwise acceleration check uses each source's own full-prefix position and velocity norm, retaining the two old-pulse rows and stationary contribution. The position quotient $(G_P(u)+S_P(u))/u$ is nondecreasing in $u$, because the integrated row envelopes have nonnegative nondecreasing integrands; thus the endpoint slope inequality controls the entire restart interval. The positive margins close the usual first-exit bootstrap. The data and source errors used here have already been accepted; acceptance of the independent stationary reference discharges the remaining field-bound input.

## 4. Complete population, roots and original history class

At $H=33/8$, $H+11/8=11/2$, so the first-excitation population consists of both targets and all environmental identities with $m_i\le30$. There are **834 environmental identities and two targets**, 836 total. The complete first-onset proof is the accepted anchor-front triangle argument; it does not infer completeness merely from a finite list generated by a numerical solver. All 506 histories represented through $13/4$ are available as candidate sources, and onset tests remove those that cannot yet be received. The infinite stationary complement remains in $S_0$.

The separately known-controlled `census.py` enumerates both signs of the receiver margin $B=1/20$. It finds 1368 certainly active old channels and 1464 possible old channels; for generated channels it finds 27008 certain and 29936 possible. These are conservative admission bounds in the enlarged auxiliary tube, not an assertion that every possible channel has already become nonzero. The ambiguous generated groups have source first squared radius, receiving squared range and multiplicity

$$
(20,1,192),\ (17,2,672),\ (2,17,1152),\ (14,3,384),\ (3,14,384),\ (12,4,48),\ (4,12,96).
\tag{9}
$$

All are retained; an inactive row evaluates to zero by its complete source history. There are at most 99 possible generated rows at any receiver, plus at most two supplied-pulse rows. An exact channel admission count is unnecessary for the complete law and is not claimed from these wider margins.

Complete-population speed is below $1/8$, every cross range is at least $1-2B=9/10$, and the lookback-root residual has derivative at least $7/8$. Thus every cross channel has one positive causal root and there is no positive self root. Root tubes of the original width retain transmitter and complement-gap margins strictly stronger than the original $1/4$ requirements. Every root received after $h$ queries a future time at most $3.1755<h$, or the completely supplied negative-time past. There is no boundary extrapolation, omitted root or frozen environmental future.

On this interval the received source speed is at most $1/1000$ and received acceleration is at most $3/8$, including the original pulse. Writing $R$ for a received displacement, implicit differentiation gives $|s'|<8/7$, $|R'|<1/7$. A complete changed-row time derivative is bounded by

$$
\frac{2(10/9)^3/7}{1-1/1000}
+\frac{(10/9)^2[(10/9)/(7000)+(3/8)(8/7)]}{(1-1/1000)^2}
+\frac{2(1/8)}{(1-1/20)^3}
<1.214264.
\tag{10}
$$

The last term differentiates the subtracted stationary row. The complete jerk, adding the independently bounded stationary derivative, is below $2013$, within the original ceiling 65536. The actual population displacement bound $0.04425$ is below the original environmental ceiling $1/16$; speed $1/8$ and acceleration $1/2$ are below the original class ceilings. All earlier history intervals keep their accepted bounds. The original history and regularity class has therefore not changed. Only the auxiliary population comparison radius grew from $1/64$ to $1/20$.

For clarity, a sufficient uniqueness comparator on the new interval is the same complete past and block law, displacement at most $1/20$ and speed at most $1/4$. In that tube all newly sampled source times lie before $h$, so the new equations are ordinary receiver equations with fixed, known incoming histories and locally Lipschitz root evaluations. Their solutions are unique. Local uniqueness in the original regular history class also precludes a second solution departing from the certified path: at a first departure the two histories coincide, and the same regular root chart supplies a common local uniqueness neighborhood. This does not claim uniqueness after a later regularity failure.

## 5. Delayed target error through $33/8$

The complete-population result supplies existence. Target residual propagation separately compares the numerical target with that solution. Use the target comparison ball $B_t=1/128$ and the incoming bounds $(b_s,v_s,A_s)$ in (8). Exact target-specific enumeration gives 97 generated source rows, with multiplicities

$$
\begin{array}{c|rrrrrrrrr}
|i-j|^2&1&2&3&4&5&6&8&9&10\\
\hline
N&6&12&8&6&24&24&4&9&4.
\end{array}
\tag{11}
$$

Both signs of the target margin give the same inventory. No negative-time supplied pulse remains active at a target here. The source-root shift coefficients are the previously derived

$$
C_P(v,A,r)=\frac{2r^{-3}}{(1-v)^2}+\frac{vr^{-3}+Ar^{-2}}{(1-v)^3},\qquad C_V(v,r)=\frac{r^{-2}}{(1-v)^2}.
\tag{12}
$$

In particular the acceleration term in $C_P$ accounts for differing source emission times. With range floors $r_m=\underline{\sqrt m}-B_t-b_s$, the full receiver derivative, including $16\cdot100B_t^2$ for the stationary field, is below $8.224068<9$. The stationary derivative coefficient 100 is supplied by its accepted $1/64$ bound and applies to the smaller target ball.

Let $F_P,F_V$ be the accepted positive-kernel source-error majorants through $13/4$. A concrete conservative choice is the sum of the preceding environmental-prefix, full-population and target error profiles, denoted $\widehat E_2+E_P+G$ in the [population restart derivation](smooth-two-particle-population-restart-continuation.md). These profiles already include the staged environmental residual, both restarted initial errors and the original partner history. They are nondecreasing and vanish before their specified release times; their ordinary derivative envelopes do not introduce artificial impulses at a restarted position term.

Starting at $h_t=15/4$, use the accepted target errors

$$
e_P(h_t)\le7.4\times10^{-5},\qquad e_V(h_t)\le3.1\times10^{-4},
\tag{13}
$$

and a new continuous full-law residual $\rho_t\le1/40000$. On each reception cell of width $1/256$, the monotone source forcing is bounded at the upper emission-time endpoint by

$$
f=\rho_t+16\sum_mN_m[C_P(v_s,A_s,r_m)F_P(t-r_m)+C_V(v_s,r_m)F_V(t-r_m)].
\tag{14}
$$

The source argument is rounded upward to a $1/256$ grid; its greatest value is $803/256<13/4$. Each receiver cell then propagates the exact positive constant-coefficient system $e_P'=e_V$, $e_V'=9e_P+f$. The positive hyperbolic series is enclosed by the inherited exact series and geometric-tail formula; each resulting state is rounded upward to $10^{-15}$. The known controls include a restarted quadratic, constant acceleration, stationary-source coefficients and exact upward rounding before the target run. There is no empirical fitting to the computed trajectory.

The resulting whole-interval error ceilings are

$$
e_P<0.000379232,\qquad e_V<0.001649195,\qquad e_A<0.006951554.
\tag{15}
$$

The safely rounded allowances for the separate sign certificate are

$$
\boxed{\varepsilon_P=0.0004,\quad\varepsilon_V=0.0017,\quad\varepsilon_A=0.0072.}
\tag{16}
$$

The frozen parent residual receipt `.local-data/master-equation-closure/post-restart/check/target-residual.json` reports full-law residual below $2.384854\times10^{-5}<1/40000$ on all 1536 continuous cells, maximum source emission below $3.129049<13/4$, and continuous target position norm below $0.003906612$. Thus the target norm plus (16) remains strictly within $1/128$. Archive authentication, complete root/source coverage and retained-prefix compatibility must also be reconciled in the independent assessment; a small residual number alone is not sufficient.

## 6. Evidence disposition and next boundary

The continuation arithmetic is frozen in `.tmp/mec-008-post-restart/hale/restart-exact-target.json`; the complete conservative inventory and class check are in `census-target.json`; the target propagation is in `target-error-target.json`. Each has a preceding known-control receipt in the same directory. The earlier floating-point probe was used only to choose sufficient constants and carries no acceptance claim. The exact restart and error derivations above are now ready for independent review. Parent residual and continuous sign evidence establish the corresponding actual statements only after that review reconciles all premises.

The next maximum has not been supplied by the numerical candidate. The present theorem is a finite continuation tool and a target comparison bound, not a premise that a later maximum exists. Continuing the search after $33/8$ requires either shorter received-source coverage or a newly certified source prefix, as quantified in the next bounded feasibility step; no arbitrary endpoint completes the requested event search.

Falsifiers are an omitted source or first-excitation path, an uncovered emission time, a failed envelope or interval operation, a stationary-field estimate outside its proved domain, a failed first-exit inequality, loss of the original history-class margins, an inherited-history mismatch or a residual exceeding (14)'s budget. A failed sufficient estimate is not evidence that the actual Master Equation fails or that a later maximum is absent.
