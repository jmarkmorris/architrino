# The first event of a self-consistent staggered lattice

## Current result and scope

The incoming population in this investigation is an exact solution of the unchanged Master Equation at every earlier time. It has one architrino at each unit cubic anchor, alternating polarity, and opposite vertical motion of the two polarity sublattices. The coupling is $g=16$ and the normalized wake speed is $c_f=1$. The original eight-source block sum remains part of the law.

The branch reaches wake speed before any turn, contact, cross-root failure or failure of the infinite sum. For the representative amplitude $a=2^{-40}$, its first event satisfies $1191/128<t_*\le1193/128$. Every label reaches speed one simultaneously because the exact two-sublattice symmetry gives all labels the same speed. At that event the incoming acceleration remains transverse to the speed boundary: $\mathbf V_i\cdot\mathbf A_i>5.9711295686$. Distinct-label separation remains greater than $0.5088917028$ lattice units.

**Claim grade: derived first-event theorem with an independently accepted interval certificate.** The [independent adjudication](staggered-lattice-first-event-independent-adjudication.md) checks the analytical domain, source census, continuous residual, inherited uncertainty, positive comparison and event inequalities. This supplies a self-consistent incoming example under the unchanged equation. It does not establish finite-support instability, generic population behavior, or an outgoing event rule.

## 1. The exact incoming history

Let $\sigma_i=(-1)^{i_1+i_2+i_3}$ for $i\in\mathbb Z^3$. The branch has the form

$$
\mathbf X_i(t)=i+\sigma_iq(t)e_3.
\tag{1}
$$

The [accepted incoming-history construction](smooth-two-particle-incoming-reachability.md) supplies a unique small correction to

$$
q(t)=a e^{\lambda t}+w(t),\qquad a=2^{-40},\qquad t\le0,
\tag{2}
$$

where $\lambda$ is the unique positive root

$$
\lambda=\frac{16}{3}\sum_{d\ne0}\frac{e^{-\lambda|d|}}{|d|^2},
\qquad 2<\lambda<4.
\tag{3}
$$

With $K_0=150000$ and $\beta=2\lambda$, the certified incoming error is

$$
|w^{(k)}(t)|\le\beta^kK_0a^2e^{\beta t},\qquad 0\le k\le2.
\tag{4}
$$

This history is $C^3$, satisfies the full population law, and has $q,q',q''>0$ at every finite incoming time. Every positive-delay self channel is empty. The exact zero-delay diagonal remains excluded.

Time translation gives a useful exact identification. If $a<b\le1/2000000$ and $T_b=\lambda^{-1}\log(b/a)$, shift the accepted amplitude-$b$ history by $T_b$. Its leading coefficient becomes $a$, and its correction still obeys (4). Uniqueness in the accepted contraction ball therefore identifies it with (2) on their common past. This proves a regular continuation to $T_b$ without prescribing a new segment or integrating a delay equation backward. It does not allow the small-amplitude estimates to be extrapolated beyond their proven range.

## 2. Full scalar equation and source orbits

Write a source offset as $d=(d_1,d_2,m)$, with $p=d_1^2+d_2^2$ and $\sigma_d=(-1)^{m+p}$. For an even receiver, use the convention $d=i-j$. The emission time $s=s_d(t)<t$ is determined by

$$
r=t-s=\sqrt{p+z^2},\qquad
z=m+q(t)-\sigma_dq(s),\qquad n=z/r,
\qquad D=1-\sigma_dnq'(s).
\tag{5}
$$

The vertical acceleration row is $g\sigma_dn/(r^2D)$. Its transverse components cancel by coordinate reflection. Offsets with the same $(m,p)$ have identical scalar rows; their exact integer multiplicity counts every $(d_1,d_2)$ in that orbit. The offset $d=0$ is omitted only because its positive self-root set is empty before the first speed-one event.

Let $S(q)=e_3\cdot\mathbf S(qe_3)$ be the accepted original stationary block field. The scalar equation is

$$
q''(t)=gS(q(t))+
g\sum_{d\ne0}\sigma_d
\left[
\frac{n_d}{r_d(t)^2D_d}
-\frac{m+q(t)}{[p+(m+q(t))^2]^{3/2}}
\right].
\tag{6}
$$

The second sum is an absolutely convergent changed-source correction. Equation (6) includes all source labels, even those whose emissions belong to the arbitrarily old small-amplitude history. It does not replace the stationary block sum by a finite bare lattice.

## 3. Regular continuation before a geometric boundary

Suppose a continued segment obeys

$$
0<q(t)<\frac12,\qquad 0<q'(t)<1.
\tag{7}
$$

Then the entire earlier history is monotone and subunit. Its current separation floor is $1-2q(t)>0$, every distinct-label channel has a unique simple root, and every self channel remains empty. On a compact time interval where $q\le B<1/2$, cross delays are at least $1-2B$. Consequently the source values for a sufficiently short next step lie in an already determined earlier interval. Their velocities have a common margin below one.

There are infinitely many such sources, but only finitely many can emit after time zero on any bounded future interval. Every remaining emission is covered by (2)–(4). Its contribution and the receiver derivative carry an exponential factor in anchor distance, so the changed-source tail converges uniformly. The stationary receiver field is smooth for $|q|<1$. The next-step equation is therefore an ordinary nonautonomous receiver equation with a locally Lipschitz acceleration function and a strictly earlier, fixed source history. Local existence and uniqueness can be repeated while (7) stays away from its boundaries.

In particular, if a finite maximal time $T$ has limits $q(T)<1/2$ and $0<q'(T)<1$, the same construction extends the solution beyond $T$. Neither the infinite source count nor a failed numerical enclosure is a physical obstruction in this compact regular domain.

## 4. Contact cannot precede turn or wake speed

Only the forward axial opposite-polarity partner can have range below one while (7) holds. For that source, $d=-e_3$ and $\sigma_d=-1$, so the positive delay $\delta(t)$ obeys

$$
\delta=1-q(t)-q(t-\delta),\qquad
D=1-q'(t-\delta),\qquad
A_+(t)=\frac g{\delta^2[1-q'(t-\delta)]}>0.
\tag{8}
$$

Every nonaxial offset has $p\ge1$, hence range at least one. The backward nearest axial partner has range above one. All more distant axial rows also have range at least one since $q(t)$ and $q(s)$ lie in $(0,1/2)$. Thus all rows other than (8) sample source times at most $t-1$.

Differentiation of (8), with $v(t)=q'(t)$, gives

$$
\delta'=-\frac{v(t)+v(t-\delta)}{1-v(t-\delta)},
\qquad
\left(\frac1\delta\right)'=
\frac{v(t)+v(t-\delta)}{\delta^2[1-v(t-\delta)]}.
\tag{9}
$$

Since both speeds lie in $(0,1)$,

$$
A_+(t)\ge\frac g2\left(\frac1{\delta(t)}\right)'.
\tag{10}
$$

Assume for contradiction that $q(t)\uparrow1/2$ at a finite time $T$ while no turn or speed-one event has occurred earlier. The inequalities $0<v<1$ give a uniformly bounded incoming velocity, and $\delta$ decreases to a nonnegative limit. That limit cannot be positive. If it were $\delta_*>0$, passing to the limit in (8) would give

$$
\delta_*=\frac12-q(T-\delta_*)
=\int_{T-\delta_*}^{T}v(u)\,du<\delta_*.
\tag{11}
$$

The strict inequality follows because $v(u)<1$ at every earlier time. Therefore $\delta(t)\downarrow0$.

Write the remaining acceleration as $R(t)=q''(t)-A_+(t)$. All its nonstationary rows have source time at most $t-1$. Near the finite endpoint, these source histories have a uniform subunit margin and bounded derivatives on their relevant recent compact interval. Its remote tail still lies in the exponentially decaying ancient history. The stationary block contribution stays smooth at receiver displacement $1/2$, since its nearest reference source is one unit away. After removing the corresponding finite stationary row along with (8), these facts give a bounded signed remainder, $|R(t)|\le M$ near $T$.

Integrating (10) from any fixed $t_0<T$ yields

$$
v(t)\ge v(t_0)+\frac g2
\left[\frac1{\delta(t)}-\frac1{\delta(t_0)}\right]-M(t-t_0).
\tag{12}
$$

The right side diverges as $t\uparrow T$, contradicting $v(t)<1$. Hence no finite contact or associated range collapse can occur before the first turn or speed-one event. The same argument excludes a contact limit at a finite first speed-one endpoint, because the incoming velocity is still bounded by one. It does not prove that either event occurs in finite time.

## 5. A scalar error comparison that preserves the linear growth rate

The linear operator about the exact stationary lattice is

$$
Lh(t)=\frac g3\sum_{d\ne0}\frac{h'(t-|d|)}{|d|^2}.
\tag{13}
$$

Replacing the individual source-position derivatives by their absolute values before summing would destroy the exact shell cancellation that gives (13). Over many small-amplitude growth times, that would introduce an artificial error-growth rate. The comparison will therefore retain (13) explicitly and bound the nonlinear difference separately.

At a scalar source chart (5), put $v_s=q'(s)$ and $a_s=q''(s)$. The source-velocity sensitivity and receiver-position sensitivity are

$$
\begin{aligned}
B_d&=\frac{n^2}{r^2D^2},\\
J_d&=\frac1{r^3D}+\frac{2\sigma_dv_sn}{r^3D^2}
+\frac{n^2[v_s^2+2\sigma_dv_sn-3-r\sigma_dna_s]}{r^3D^3}.
\end{aligned}
\tag{14}
$$

Let $H_0$ be the static scalar derivative at the receiver's current position and the unshifted source, and let $H_*$ and $B_*$ be the corresponding zero-history derivatives at offset $d$. A full path variation $h$ has changed-row derivative

$$
(J_d-H_0)h(t)-\sigma_dJ_dh(s)+\sigma_dB_dh'(s).
\tag{15}
$$

Subtracting its zero-history value at $s_0=t-|d|$ yields

$$
\begin{aligned}
&(J_d-H_0)h(t)-\sigma_d(J_d-H_*)h(s)
+\sigma_d(B_d-B_*)h'(s)\\
&\hspace{1em}-\sigma_dH_*[h(s)-h(s_0)]
+\sigma_dB_*[h'(s)-h'(s_0)].
\end{aligned}
\tag{16}
$$

The two time differences are bounded by the position of the source root and already certified velocity and acceleration errors on the interval joining $s$ and $s_0$. The comparison is $C^1$ and piecewise $C^2$ at time zero; its tiny acceleration jump is included in the continuous residual. The velocity error remains continuous and locally absolutely continuous, so the acceleration integral used in the second difference remains valid across that join. Along interpolation between the true and comparison histories, (15) holds almost everywhere in the interpolation parameter and integrates to the same difference bound. Since that entire interval precedes the current step, the acceleration-error lookup is not circular. The receiver coefficient $g[S'(q)+\sum\sigma_d(J_d-H_0)]$ is summed with its signs before taking an absolute bound. Equation (13) contributes a positive delayed sum of velocity-error bounds.

This produces a twice-integrated scalar majorant from an acceleration-error inequality. It does not assert that the norm of a position error itself obeys a second-derivative inequality. The residual of the comparison path, the incoming error (4), every finite source orbit, and the infinite correction tail must all enter that majorant before any event is certified.

## 6. An explicit infinite-tail bound

For a proposed bounded interval $0\le t\le H$ and stopped displacement ball $|q|\le B<1/2$, choose an integer cube cutoff $N>H+2B$. Every omitted source then emits before zero. Put

$$
c_N=1-\frac{2B}{N+1},\qquad
Z_\gamma=\frac{e^{-\gamma(N+1-H-2B)}}{1-e^{-\gamma}}.
\tag{17}
$$

Let $w_{\rm tail}<1$ bound all source speeds in that ancient omitted tail. The absolute omitted changed-source acceleration is at most

$$
g\sum_{(A,\gamma)\in\{(a,\lambda),(K_0a^2,2\lambda)\}}
A Z_\gamma\left[
\frac{52}{c_N^3(N+1)}+
\frac{26\gamma}{c_N^2(1-w_{\rm tail})}
\right].
\tag{18}
$$

Indeed, the shell of sup-norm radius $m$ contains at most $26m^2$ labels, its range is at least $c_Nm$, and its source jets are bounded by the two exponential terms in (4). The position term uses $2|q(s)|/r^3$, the transmitter correction uses $|q'(s)|/[r^2(1-w_{\rm tail})]$, and the remaining scalar exponential series is geometric. This bound concerns only the absolutely convergent correction; the full stationary block field is retained separately.

For $w_{\rm tail}\le1/2$, a corresponding receiver-derivative tail is

$$
g\sum_{(A,\gamma)}A Z_\gamma\left[
\frac{624}{c_N^4(N+1)^2}+
\frac{520\gamma}{c_N^3(N+1)}+
\frac{208\gamma^2}{c_N^2}
\right],
\tag{19}
$$

using $|J-H_0|\le24|q(s)|/r^4+20|q'(s)|/r^3+8|q''(s)|/r^2$. The segment range in this estimate is bounded by the same $c_Nm$. Thus the certificate need not assume a finite affected population or silently set the remote moving histories to zero.

## 7. Event acceptance conditions

A speed-one conclusion requires a continuous certified prefix with $q'>0$, positive distinct-label separations, complete simple cross roots, and the infinite-tail estimates above. A comparison endpoint with a rigorously lower-bounded velocity above one can then force a first speed-one time only if the comparison is formulated as the smooth cross-row auxiliary equation beyond its own numerical crossing. It must agree with the full law before the first actual crossing; it is not a claimed full-law continuation after a self root is born.

At an accepted first speed-one event, positive $q''$ must also be proved. This is the transversality condition. Since every label has velocity $\sigma_iq'e_3$ and acceleration $\sigma_iq''e_3$, the quantity $\mathbf V_i\cdot\mathbf A_i=q'q''$ is then positive for every label. A first turn instead requires an actual zero of $q'$ and the corresponding certified incoming sign. A failed error bound establishes neither kind of event.

The source histories, orbit multiplicities, comparison residuals, infinite tails, propagated errors and event inequalities are retained with their independent references. Sections 8–9 describe the completed certificate and explain how its numerical inequalities establish an event of the exact branch.

## 8. Continuous comparison instrument

The reference path is the exact quintic Hermite interpolant of the saved binary64 position, velocity and acceleration nodes, on a dyadic grid of width $1/512$. Its negative-time segment is $a e^{\lambda_c t}$, where $\lambda_c$ is the saved binary approximation. The exact incoming branch remains (2), with the independently enclosed root

$$
2.795230690086810814283894<\lambda<2.795230690086810814283901.
\tag{20}
$$

The [continuous residual owner](staggered-lattice-first-event-residual.md) bounds the comparison's continuous equation defect on 658 cells from zero through $1193/128=9.3203125$: 576 cells of width $1/64$ through time 9, followed by 82 cells of width $1/256$. Its stationary acceleration enclosure uses the original full-lattice coefficients and an infinite remainder, independently of the numerical reference's acceleration evaluator. The finite changing-source sum contains all 24388 nonzero labels in the cube of radius 14, represented by 3073 exact scalar orbits. The omitted changing sources obey (18). Neither the finite orbit compression nor the numerical reference changes the population or the equation. The final refinement retains the original comparison prefix through time 9. The saved reference trajectory and its complete earlier history remain unchanged.

### 8.1. Incoming uncertainty and causal lookups

The comparison adds (4) to the discrepancy between the exact and saved exponential rates. For $s\in[-64,0]$, let $\Lambda$ contain both $\lambda$ and $\lambda_c$, and let $\Delta_\lambda$ bound their difference. Parameter differentiation gives, for $k=0,1,2$,

$$
\left|\partial_s^k\left[a e^{\lambda s}-a e^{\lambda_c s}\right]\right|
\le a\Delta_\lambda
\sup_{\mu\in\Lambda}
\left(k\mu^{k-1}+64\mu^k\right)e^{\mu s},
\tag{21}
$$

where the first summand is zero for $k=0$. Every finite-cube query lies in this declared interval when negative. The infinite old tail uses the exact exponential bounds (4) directly. The initial acceleration-error bound also includes the difference between the comparison's two one-sided acceleration values at zero.

After zero, each query uses the next already certified time endpoint. Position and velocity bounds are stored as nondecreasing prefix bounds; the acceleration bound is the cumulative maximum of the incoming bound and every completed cell bound. This supplies the complete source interval between the shifted and unshifted roots in (16), rather than only their endpoint values.

### 8.2. Positive integrated majorant

On each cell $[t_j,t_{j+1}]$, the signed receiver derivative, the delayed terms in (13) and (16), and the two omitted-tail bounds produce

$$
|h''(t)|\le L_j|h(t)|+Q_j,\qquad L_j,Q_j\ge0.
\tag{22}
$$

Here $Q_j$ includes the continuous residual. With initial errors bounded by $P_j,V_j$, the positive twice-integrated comparison is

$$
P''=L_jP+Q_j,\quad P(t_j)=P_j,\quad P'(t_j)=V_j.
\tag{23}
$$

The instrument evaluates its endpoint through the positive series

$$
\begin{aligned}
C(z)&=\sum_{n\ge0}\frac{z^n}{(2n)!},&
S(z)&=\sum_{n\ge0}\frac{z^n}{(2n+1)!},&
D(z)&=\sum_{n\ge0}\frac{z^n}{(2n+2)!},\\
P_{j+1}&=C(L_j\Delta^2)P_j+\Delta S(L_j\Delta^2)V_j+\Delta^2D(L_j\Delta^2)Q_j,\\
V_{j+1}&=L_j\Delta S(L_j\Delta^2)P_j+C(L_j\Delta^2)V_j+\Delta S(L_j\Delta^2)Q_j,
\end{aligned}
\tag{24}
$$

where $\Delta=t_{j+1}-t_j$. All coefficients are enclosed outward, including exact reciprocal factorials and geometric remainder bounds. A first-exit argument verifies each provisional displacement-error tube: the resulting $P_{j+1}$ must lie strictly inside its assumed radius. The true and interpolated paths also remain strictly inside $|q|<1/4$. The slightly larger number $0.250001$ is used only to pad binary rounding in the initial root search interval; it does not enlarge the displacement neighborhood of the theorem.

The independently reviewed shell cancellation fixes the linear part (13), while (16) controls the nonlinear difference. On every accepted cell the source interval precedes $t_j$, has speed strictly below one, and therefore determines a unique simple cross root. The root search only intersects intervals known to contain that root. A failed enclosure would report an insufficient proof bound, not an evolution obstruction.

The full auxiliary cross equation can be compared beyond its numerical speed-one crossing because all source queries still lie in a certified earlier subunit prefix. The actual Master Equation and this auxiliary equation coincide until their first speed-one time, since no positive-delay self root exists before that event. No trajectory beyond that first actual event is promoted to a full-law solution.

## 9. The accepted first event

The completed interval comparison gives

$$
\frac{1191}{128}<t_*\le\frac{1193}{128},
\qquad
9.3046875<t_*\le9.3203125.
\tag{25}
$$

The clock in (25) is tied to the leading amplitude $a=2^{-40}$ at time zero. It is not the event time of the earlier supplied-pulse experiment. Translating this exact branch changes that clock while preserving its trajectory in displacement and velocity.

The theorem follows from four complete interval statements. First, the auxiliary velocity is positive throughout the computed interval, and the incoming theorem supplies positive velocity at all earlier times. Second, its velocity is strictly below one through $1191/128$. Third, the lower endpoint velocity at $1193/128$ exceeds $1.0211550976$. Fourth, its acceleration is greater than $5.9711295686$ throughout every cell that could contain the first speed-one event. Continuity therefore forces a first speed-one time in (25), and no turn occurs before it. Before that first event the auxiliary solution is the actual full-law solution.

The same certificate gives the following outward bounds. Quantities stated over the auxiliary comparison prefix are used for the actual solution only through $t_*$.

| Quantity | Certified bound | Meaning |
| --- | --- | --- |
| Event displacement | $0.2207234700<q(t_*)<0.2455541486$ | The two polarity sublattices have opposite vertical displacements of this magnitude. |
| Minimum simultaneous separation | $>0.5088917028$ | All distinct labels remain separated through the event. |
| Minimum causal cross range | $>0.7294887052$ | Every distinct-label reception stays away from zero range. |
| Cross transmitter denominator | $D>0.9287873355$ | Every cross root remains simple. |
| Largest source speed used | $<0.0696827945$ | The incoming cross-source histories are far below wake speed. |
| Latest emitted source time | $<8.5908237948$ | All cross rows sample the certified subunit prefix. |
| Event transversality | $\mathbf V_i\cdot\mathbf A_i>5.9711295686$ | Every label reaches the speed boundary with strictly increasing speed. |

The simultaneous separation follows directly from the exact lattice geometry. For two labels of opposite polarity, their displacement difference has norm $2q$; the triangle inequality gives a gap at least $1-2q$. The nearest vertical opposite-polarity pair attains that geometric form. Equal-polarity labels have identical displacements and retain their anchor separation. The bound uses the entire certified prefix, not a sampled nearest approach.

The last error bounds are $P<0.0048463765$ and $V<0.0390147931$. These are errors of the comparison, not physical spread among particles. The branch has infinitely many architrinos, and all share the same scalar motion up to polarity. The 3073 source orbits are an exact symmetry compression of the retained cube; the infinite complement is still present through the tail estimates.

### 9.1. Why a numerical crossing now implies an actual event

The coarse comparison already closed every displacement tube but gave a final velocity lower bound below one. That was an insufficient sign bound. Refining only the final residual and comparison cells raised the lower bound above one while preserving the same saved trajectory and exact incoming history. The accepted conclusion relies on this refined bound, not on a sampled numerical crossing or agreement between two numerical evolutions.

A separate exact-rational replay reconstructs all 658 positive majorants, authenticates the unchanged prefix through time 9, and checks the radius, source-time and event inequalities against the exact saved node values. It also checks the initial nonlinear and frequency uncertainty. The root formulas, stationary enclosure, source census and continuous residual have their own independent controls. The [adjudication](staggered-lattice-first-event-independent-adjudication.md) records these distinct references.

### 9.2. The obstruction reached

At $t_*$ every past speed is strictly below one, so the positive-delay self-root set is still empty. The cross field is bounded and smooth there: its sources are uniformly earlier, its denominators have the margins above, and its infinite changing-source tail converges with its derivatives. This also remains true in the local neighborhood needed to test a hypothetical continuation. Take a uniform population-position ball $|\mathbf X_i-i|<1/3$, which contains the certified event strictly. Cross incidences then have range at least $1/3$; for reception increments below $1/6$, they sample only pre-event times below $t_*-1/6$. The finitely many recent source offsets therefore have a compact subunit margin. Infinitely distant sources remain in the exponentially decaying ancient history, so their changing-source sum and derivatives converge uniformly. The original stationary sum stays analytic in this ball. Thus the event is neither contact nor failure of an incoming cross root, and the required bounded cross remainder does not depend on a finite disturbed population.

The [transverse own-root birth theorem](smooth-two-particle-next-event-root-birth.md) now applies to each label. Under a hypothetical $C^3$ continuation in this uniform population-position neighborhood, a positive-delay own-history root would emerge immediately after $t_*$. Its acceleration contribution diverges while the cross remainder remains bounded, contradicting that smooth continuation. The unchanged regular equation therefore reaches a genuine own-history obstruction on this fully self-consistent branch. The theorem does not select a post-event history or add an instantaneous update.

## Evidence retention and falsifiers

The retained construction directory is `.local-data/master-equation-closure/staggered-first-event/construction/`. It contains the known-case controls, the initial insufficient comparison, the refined comparison, the event extraction and a hash manifest linking the exact incoming theorem, immutable trajectory, residuals and independent references. The subject instruments are `comparison2.py`, `comparison3.py` and `event_summary.py`; the first exploratory modeled-residual run remains explicitly diagnostic. The complete scientific arguments are in this document and its linked residual and adjudication owners.

The event conclusion would be overturned by a missing source orbit or tail, an invalid stationary-sum enclosure, failure of the incoming uncertainty to cover the exact branch, a comparison step that does not enclose its positive majorant, or loss of any required event sign. These are checkable in the retained census, residual, error tables and independent exact-rational replay. Refining a plot or rerunning the same numerical evolution alone cannot falsify or validate those proof obligations.
