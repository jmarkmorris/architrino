# Long post-departure survival forces an attained complete connection

## Claim and actual-family binding

Claim grade: derived candidate awaiting independent assessment. This note strengthens the [attained exit-set reduction](authorized-cases-ten-hour-c-spiral-attained-exit-set.md): the approximating actual members need not be infinite. It is enough that their strict lifetimes after the accepted nonlinear departure become arbitrarily long in similarity time.

Keep the exact coefficient-one logarithmic law, $c_f=1$, complete ordinary roots, and the original compatible one-parameter family from the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). All held-tail, polynomial-patch and analytic-segment data are unchanged. Let $\tau_\eta$ be its accepted sampled exit time and $T_{\max,\eta}$ its maximal strict-subfield time, possibly infinity. Define

$$
W_\eta=e^{\tau_\eta}=1+T_{\rm exit,\eta},
\qquad
L_\eta=\log\frac{1+T_{\max,\eta}}{W_\eta}.
\tag{1}
$$

The accepted departure theorem makes $\tau_\eta\to\infty$ as $\eta\downarrow0$. No explicit perturbation amplitude is chosen here.

**Candidate implication.** If $\eta_j\downarrow0$ and $L_{\eta_j}\to\infty$, the actual exit trajectories have a subsequential normalized limit which is nontrivial at exit, tends to the admitted spiral as similarity time tends to minus infinity, and has a complete future with speed at most one. The limit has ordinary partner roots and no positive-delay self roots. It is obtained from the actual family, not assigned as a replacement departure history.

Therefore, excluding all such attained complete connections would imply a uniform upper bound on $L_\eta$ for all sufficiently small actual amplitudes. This is stronger than proving each member finite separately. The present note proves the reduction, not the exclusion.

## 1. Exit normalization retains a positive future radius floor

Normalize each actual trajectory by its own exit time and the exact admitted rotating frame:

$$
Q_j(u)=\frac{e^{-i\omega\tau_{\eta_j}}
x_j(W_j u-1)}{W_j},\qquad
u>0.
\tag{2}
$$

The actual strict future extends to $u=e^{L_{\eta_j}}\to\infty$. The accepted local departure chart supplies constants $h_E>0$ and $r_E<\infty$, independent of sufficiently small amplitude, such that at exit

$$
Q_j(1)\times Q_j'(1)\ge h_E,
\qquad |Q_j(1)|\le r_E.
$$

This uses the positive exact spiral angular momentum and a fixed sufficiently small exit neighborhood, not an explicitly selected numerical departure state. Positive torque persists through every actual strict continuation. Since $|Q_j'|<1$, for $u\ge1$ while that continuation exists,

$$
|Q_j(u)|\ge Q_j(u)\times Q_j'(u)\ge h_E,
\qquad
|Q_j(u)|\le r_E+u-1.
\tag{3}
$$

Thus finite future windows cannot collapse to the origin, even though their members may eventually reach a unit endpoint.

## 2. Long survival gives the needed source margin on each finite window

The [explicit inward criterion](authorized-cases-ten-hour-c-spiral-explicit-inward-event.md) says that a sufficiently generated actual state with

$$
p\le-1+2^{-50}
\tag{4}
$$

cannot remain strict through the following physical interval of length $(-p)r/8$. This criterion is invariant under (2). Its independently assessed proof assumes only that short future interval, not an infinite trajectory.

Fix a finite normalized interval $[a,U]\subset(0,\infty)$. The accepted source-ratio bound, originally expressed relative to the bounded old source-time shift, becomes

$$
u_s\ge u/40
\tag{5}
$$

on this interval for all sufficiently large $j$. The difference between $1+T$ and the original elapsed-time coordinate is bounded before division by $W_j\to\infty$; the factor 40 leaves room for that difference. Iterating (5) a fixed number of times shows that the nested source events needed by (4) are generated for all sufficiently large $j$.

The complete pre-exit windows at any fixed positive $u$ are uniformly controlled by the accepted local departure chart. Together with (3), this gives a uniform radius upper bound on every fixed $[a/40,U]$. The short future interval in (4) therefore has a uniformly bounded normalized length for every state in that interval. Because the actual normalized lifetimes tend to infinity, the members survive beyond all these short intervals once $j$ is sufficiently large. Consequently (4) cannot occur there.

At an acute partner source, write its velocity as $v_s=p_s e_s+z_sJe_s$, with $z_s>0$. Both $n\cdot e_s$ and $n\cdot Je_s$ are nonnegative. Hence

$$
D=1+n\cdot v_s\ge\min\{1,1+p_s\}>2^{-50}
\tag{6}
$$

on the fixed receiving window. This proves the required denominator margin for long surviving finite members. It does not infer a global margin for a member after its finite endpoint.

## 3. Compactness and passage of the whole equation

For future receiving times $u\ge1$, the acute chord gives $R\ge r\ge h_E$. Equation (6) bounds the response by $1/(h_E2^{-50})$ on every fixed surviving future window. Source velocities are bounded by one; the source clock derivative is at most $2/D$. Source accelerations are bounded on their own fixed positive windows by the same argument, or by the pre-exit chart when they lie before exit. Differentiating the response therefore bounds the third position derivative on each compact positive window. Arzela–Ascoli gives $C^2$ subsequential convergence there.

The pre-exit compactness and backward cone estimate are exactly those in the attained exit-set construction. Apply a diagonal extraction over both backward and forward windows. The resulting $Q$ exists for all $u>0$, is nontrivial at $u=1$, and approaches the admitted spiral in the established similarity-history norm as $u\downarrow0$.

The clocks remain in positive source windows by (5); their denominators remain positive by (6). The ordinary implicit roots and the logarithmic acceleration therefore pass to the limit. The limiting speed is at most one everywhere. A positive-delay self root would require a straight unit-speed segment; the nonzero limiting partner acceleration excludes such a segment. The partner root is unique by source monotonicity and its positive denominator. Thus the limiting equation retains the complete root census.

The original fixed old preparation is not used as a formal spiral past. Its bounded positions collapse to zero under (2), while its normalized times recede to $u\le0$. The accepted uniform upper radius ratio, strictly below one, excludes a wake hit from that collapsed old segment. Equivalently, the retained positive source bound (5) already locates every actual sampled root inside the generated positive window. No missing old root is silently dropped.

This proves the candidate implication. The limiting curve may have regular unit touches; it need not itself be a strict physical member of the original family, and its existence alone does not prove that any member has infinite strict lifetime.

## 4. Uniform lifespan is the contrapositive of an attained connection obstruction

Suppose one proves that no nontrivial complete curve with the properties above can extend an attained exit state. If no constants $\eta_0>0$ and $L_*<\infty$ bounded $L_\eta$ for $0<\eta<\eta_0$, choose $\eta_j<1/j$ with $L_{\eta_j}>j$. Sections 1–3 would produce precisely the excluded complete connection. Therefore

$$
L_\eta\le L_*
\qquad(0<\eta<\eta_0).
\tag{7}
$$

The accepted cone-growth bound also gives an existential upper departure time of the form

$$
\tau_\eta\le C+\frac{a}{\log\gamma}\log\frac1\eta,
$$

where $a$ and $\gamma>1$ are the existing sampled step and cone expansion constants. Under the additional exclusion just stated, (7) would therefore imply

$$
1+T_{\max,\eta}\le C'\eta^{-a/\log\gamma}.
\tag{8}
$$

Neither the exclusion nor the resulting bound (7)–(8) is claimed as established for the actual family. The point is that a failure of uniform later-event control has a definite attained complete-trajectory witness, even if every approximating member eventually ends.

## 5. Robust crossing is an additional open event test

The accepted [continuous boundary criterion](authorized-cases-ten-hour-c-spiral-continuous-boundary-criterion.md) permits another transfer test beyond the inward inequality. Suppose an attained exit state has a regular strict prefix to a first unit event, and its unique fixed-past partner-only reconstruction exceeds unit speed at some arbitrarily close later time. This includes a transverse crossing and any established flat odd-order crossing.

Choose that later time so close that all partner sources still lie in the strict prefix. The reconstruction there is a local ordinary integral equation using known past sources. Nearby actual exit trajectories either have already reached their own unit endpoint, or remain strict and obey that same regular partner equation through the chosen short interval. Continuous dependence in the latter case would make their speed exceed one at its end, a contradiction. Thus the crossing condition gives an open neighborhood of exit states whose actual members have finite unit endpoints.

This is a mathematical event test, not integration of the physical law above unit speed: the partner-only curve beyond equality is used solely to contradict the existence of a nearby strict survivor. The boundary theorem says that a continuously matched full-root continuation cannot follow its superfield part.

If all attained exit states were covered by finitely many such robust crossing tests or by the earlier open inward-event tests, all sufficiently small actual members would have a uniform additional similarity-time bound. A unit touch followed by return supplies no such open crossing test by itself; nearby strict trajectories may avoid equality. No cover is proved here.

## Remaining decision and falsifiers

The exact unresolved object is now the attained complete connection forced by unbounded survival, or an open event cover that excludes it. A spectral census alone cannot decide this object because the actual nonlinear exit states and their compatibility corrections remain part of its definition. A freely prescribed complete logarithmic trajectory is also insufficient unless it is reached by the demonstrated limiting construction.

Falsifiers are loss of the common exit angular-momentum floor; use of the inward criterion without its required surviving future interval; failure of the source-coordinate conversion in (5); a missing delayed acceleration in the derivative bounds; loss of the fixed departure distance in the limit; or using a grazing return as if it were a robust crossing. The finite-window proof above is deliberately independent of the stronger compactness theorem's assumption that each approximating member is infinite.

Only this new subject is written. All derivations are analytical; no numerical member, altered preparation, new response, or computation is introduced. Earlier subjects and independent references remain frozen. The parent coordinator owns integration, and this implication requires independent assessment before acceptance.
