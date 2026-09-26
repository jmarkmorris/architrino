# Independent review: sharp capped-circle escape criterion and finite-history certification

**Date:** 2026-09-26. **Reviewer:** Claude, independent of the submitted analysis and instrument; corrections and a separate mathematical review by Codex on the same date. **Subject:** [sharp-circle-braking-continuation.md](sharp-circle-braking-continuation.md) §4–§5, the instrument [sharp-circle-braking.mjs](../../../../scripts/field-speed-ceiling/sharp-circle-braking.mjs) (SHA-256 `79fcc01f…0dcd`, matching its receipt), and [manuscript §9.3.5–§9.3.6](../manuscript.md#535-first-observed-departures-under-the-sharp-equation). **Model:** the sharp Master Equation with the field-speed ceiling as the only dynamical modification and no self action at or below the ceiling. **Evidence record:** [sharp-circle-escape-independent-review-receipt.json](../evidence/sharp-circle-escape-independent-review-receipt.json). The submitted documents, scripts and braking receipt were not modified by this review.

## Verdicts

The escape criterion follows under the completed hypotheses below. Its proof survives an independent reconstruction from the live equation, and a variant improves the sampled numerical margins. A separately written sixth-order instrument closely corroborates the submitted floating-point trajectory. Neither computation encloses the exact trajectory, so neither applies the criterion to the exact solution. Escape of the specified history remains unproved.

1. **Escape theorem (Theorem A, as submitted):** *derived under the completed hypotheses.* The proof needs velocity regularity through $T_0$, a local continuation argument, and uniqueness to justify the antipodal reduction. The repaired statement is in §2.1. Theorem B in §2.4 replaces the speed bound $b$ in the transmitter-factor estimate by a transverse-speed bound and adds the source projection to the range. A separate Codex review checked both bootstrap arguments and the comparison lemma, including the corrections recorded here; this is mathematical review, not formal or trajectory certification.
2. **No-radial-turn condition:** *proved.* The inequality $X\cdot V\ge x_0u-p_0I+(u^2-I^2)(t-T_0)$ follows exactly as claimed, and $u>I$ with $x_0u>p_0I$ excludes every radial maximum after $T_0$ (§2.3). It says nothing about $[0,T_0]$.
3. **Submitted floating-point continuation:** *numerically corroborated by an independent implementation; not an enclosure.* Velocities differ by less than $2.5\times10^{-9}$ and positions by less than $1.5\times10^{-6}$ at the 1,999 matched log samples before $t=1000$ (§3.2). The submitted release times differ from the independent values by approximately $3\times10^{-9}$ to $6\times10^{-9}$, more than their $10^{-10}$ brackets. The probe in §3.2 supports straddled derivative discontinuities as a cause; it does not provide a total-error bound.
4. **Finite-prefix certification:** *not established.* No positive-time trajectory enclosure was obtained. Supporting results are outward-rounded enclosures of $D$ and $k$ (§4.3), and a comparison lemma that can cover the ceiling switch without locating its exact time (§4.2). The amplification estimates in §4.4 concern proposed norm-based error bounds, not a certified error evolution or a proof that other certification routes are unavailable.
5. **Escape of the specified released history:** *unresolved.* Section 4.1 proposes position radius 0.5 and velocity radius 0.02 on $[S,300]$, with $S=99.27557599180734$. These are planning tolerances. A proof must also certify existence through $300$, continuous reference bounds, the negative causal gap and all Theorem B inequalities.

## 1. Setting and the antipodal reduction

Use $c_f=1$, length unit $R_\ast$ and time unit $R_\ast/c_f$. Here $t$ denotes the resulting dimensionless absolute time, $s$ is its source-time counterpart, and $T_0$ retains the submitted notation for the dimensionless endpoint. The unbolded $X,V,A,e,n$ denote Euclidean vectors as in the reviewed analysis; $x$ is a scalar projection. The live [canonical per-hit law](../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) gives receiver $i$ the contribution $\kappa\sigma_{ij}|q_iq_j|\,\hat{\mathbf r}_{ij}/(r_{ij}^2D_{t,ij})$ from each causal root, with transmitter factor $D_{t,ij}=1-\mathbf V_j(T_t)\cdot\hat{\mathbf r}_{ij}$. For the antipodal pair, the receiver is at $X(t)$ and the transmitter's past position is $-X(s)$ with velocity $-V(s)$. The separation vector is therefore $X(t)+X(s)$, with length $\ell$ and direction $n$. The transmitter factor becomes $D_t=1+n\cdot V(s)=J$. Opposite polarity gives $\sigma=-1$, and the normalized coupling is $k=4D(1+\sin D)$ with $D=\cos D$. The row is

$$
A=-\frac{k\,n}{\ell^2J},\qquad \ell=|X(t)+X(s)|=t-s .
$$

This confirms the submitted reduction, including the sign in $J$. The reduction is legitimate for the full two-body problem because point reflection with label exchange maps each receiver equation to the other's. The supplied data are reflection-symmetric, so the reflected solution solves the same problem. Wherever the regular-chart uniqueness theorem applies, the two-body solution is therefore antipodal. The [field-speed ceiling definition](../../master-equation-closure/analysis/field-speed-ceiling-definition-and-shared-results.md#13-the-velocity-constraint-and-response-order) makes the constrained velocity an absolutely continuous solution of $\dot V+\nu=A$ with $\nu\in N_{\mathcal B}(V)$ almost everywhere, where $N_{\mathcal B}(V)$ is the normal cone of the closed unit velocity ball. Its minimal selection is the rule in the assignment: remove $(V\cdot A)_+V$ at $|V|=1$, retain all of $A$ inside the ball, and leave the boundary when the raw forward component turns negative.

Two monotonicity facts drive everything below, and both follow from the triangle inequality. Write the causal gap as $g(t,s)=|X(t)+X(s)|-(t-s)$. If the source path is 1-Lipschitz on $[s,s']$, meaning its speed never exceeds 1, then $g(t,s')-g(t,s)\ge(s'-s)-|X(s')-X(s)|\ge0$. If the receiver path is 1-Lipschitz on $[t,t']$, then $g(t',s)\le g(t,s)$. Both hold with equality allowed, so they cover the exact unit-speed supplied circle, whose chords never exceed their arcs, as well as every capped future.

## 2. Stage 1: the escape theorem

### 2.1. Repaired statement

**Theorem A (submitted criterion, hypotheses completed).** Let $X$ be an antipodal solution of the capped sharp equation through $T_0$ with the specified supplied past. Take the solution on $[0,T_0]$ to have Lipschitz velocity, with every receiver time owning one ordinary partner root. Fix a unit vector $e$ and write $x=e\cdot X$, $x_0=x(T_0)>0$, $v_0=V(T_0)$ and $w_0=e\cdot v_0$. Suppose some $S<T_0$ has $g(T_0,S)<0$, while $x(s)\ge0$ and $|V(s)|\le b<1$ throughout $[S,T_0]$. Take $0<u$, set $I=k/((1-b)ux_0)$, and suppose $I<\min\{b-|v_0|,\,w_0-u\}$. Then the solution continues uniquely for all $t\ge T_0$ and stays strictly subfield. Each receiver time has exactly one partner root, which lies in $(S,t)$ and satisfies $J\ge1-b$. The receiver obeys $x(t)\ge x_0+u(t-T_0)$, the velocity converges to a limit $V_\infty$ with $|V_\infty-v_0|\le I$ and $e\cdot V_\infty\ge w_0-I>u$, and the separation $2|X(t)|$ grows without bound.

The hypotheses $u<w_0$ and $|v_0|<b$ appearing separately in the submission are implied by the displayed inequality, since $I>0$.

### 2.2. Reconstruction of the proof

**Old sources are excluded permanently.** Every source time $s\le S$ and every receiver time $t\ge T_0$ satisfy $g(t,s)\le g(t,S)\le g(T_0,S)<0$. The first inequality uses the 1-Lipschitz source path on $[s,S]$, which includes the entire unit-speed supplied past. The second uses the capped receiver on $[T_0,t]$. No truncation of the past is involved. The exclusion needs only $|V|\le1$, which the capped response guarantees, so it does not depend on the bootstrap.

**Bootstrap and the root.** Assume $|V|<b$ and $e\cdot V>u$ on $[T_0,t_1)$. For $t$ in that interval, every $s\in[S,t]$ has $|V(s)|\le b$: on $[S,T_0]$ by hypothesis, and after $T_0$ by the bootstrap. Also $x(s)\ge0$ on the same interval. The gap $g(t,\cdot)$ is continuous, negative at $S$, and equal to $2|X(t)|\ge2x(t)>0$ at $s=t$. Its slope satisfies $g(t,s')-g(t,s)\ge(1-b)(s'-s)$. There is therefore exactly one root, and it lies in $(S,t)$. Together with the exclusion step, it is the only root in $(-\infty,t)$. At the root, $J=1+n\cdot V(s)\ge1-b$. The range satisfies $\ell\ge e\cdot(X(t)+X(s))=x(t)+x(s)\ge x(t)\ge x_0+u(t-T_0)$. The self channel contributes nothing: the model assigns no self action at or below the ceiling, and in any case a strictly subfield path has no positive-delay self root. The sign of the row is irrelevant to the argument, which uses only $|A|$.

**Velocity control.** Then $|A(t)|\le k/((1-b)(x_0+u(t-T_0))^2)$, whose integral over $[T_0,\infty)$ is exactly $I$. The submitted proof notes that there is no cap reaction in the strict interior. A stronger statement holds and makes that remark unnecessary. The constant path $W\equiv v_0$ solves $\dot W+N_{\mathcal B}(W)\ni0$, and the normal-cone evolution is nonexpansive in its supplied input. Hence $|V(t)-v_0|\le\int_{T_0}^t|A|$ for the capped solution, whether or not it touches the ceiling. This gives $|V(t)|\le|v_0|+I<b$ and $e\cdot V(t)\ge w_0-I>u$. Both inequalities are strict and independent of $t_1$, so by continuity no first exit time exists. The argument is not circular, because it is run on the maximal existence interval, as described next.

**Continuation.** After $T_0$, the delay satisfies $t-s=\ell\ge x_0$, so on each window of length less than $x_0$ every source lies in already-determined history. The equation becomes the ordinary differential system $\dot X=V$, $\dot V=A(t,X)$ in $(X,V)$, within the strict interior guaranteed by the bootstrap. The root depends continuously differentiably on $X$ with $\partial s/\partial X=-n/J$, because $\partial_sg=J\ge1-b>0$ and the history position is $C^1$. The factor $J$ depends on $V(s)$, which is Lipschitz by hypothesis, so the right-hand side is locally Lipschitz in $X$. Picard–Lindelöf therefore gives a unique local solution. On every finite time interval, bounded speed and the floors $\ell\ge x_0$, $J\ge1-b$ keep the state bounded away from singularities, while $|A|\le k/((1-b)x_0^2)$ preserves Lipschitz velocity. Thus the solution extends across every finite time. The [regular-chart well-posedness theorem](../../master-equation-closure/analysis/regular-chart-history-to-ledger-well-posedness.md#5-local-contraction-existence-and-uniqueness) supplies a compatible alternative with $d_t=d_r=1-b$ and distance and delay floors $x_0$. The needed regularity concerns the full retained source history. A uniform acceleration bound on that history does imply Lipschitz velocity when velocity is absolutely continuous; a bound only at or after $T_0$ does not establish the earlier regularity. No new-data compatibility condition arises at $T_0$, and the acceleration jump at $t=0$ is allowed.

**Limit and escape.** Since $\int^\infty|A|<\infty$, the velocity is Cauchy at infinity, and the limit $V_\infty$ satisfies $|V_\infty-v_0|\le I$ and $e\cdot V_\infty\ge w_0-I>u>0$. Separation grows at least linearly. The theorem makes no claim of monotone speed or of a particular asymptotic speed, and none follows.

### 2.3. The radial condition

Take $e=v_0/|v_0|$, so the transverse velocity $V_\perp=V-(e\cdot V)e$ vanishes at $T_0$. Then $|V_\perp(t)|\le|V(t)-v_0|\le I$, and the transverse position $p=X-xe$, with $p_0=|p(T_0)|$, satisfies $|p(t)|\le p_0+I(t-T_0)$. Write $X\cdot V=x\,(e\cdot V)+p\cdot V_\perp$. The first term is at least $(x_0+u\tau)u$ and the second at least $-(p_0+I\tau)I$, where $\tau=t-T_0$. This gives the submitted inequality exactly. When $u>I$ and $x_0u>p_0I$, the right side is positive for every $\tau\ge0$, so $|X|$ strictly increases after $T_0$ and no later radial maximum exists. Using $e\cdot V\ge w_0-I$ in place of $u$ in the first term gives a slightly stronger version.

### 2.4. A sharpened criterion

The submitted theorem bounds the transmitter factor using the whole source speed ($J\ge1-b$). The sources move almost along $e$ itself, however, and motion along $e$ raises $J$ rather than lowering it. Only transverse source motion can reduce $J$. This observation gives a markedly stronger condition.

**Theorem B (derived; separately reviewed by Codex).** Keep the solution class of Theorem A and a unit vector $e$. Choose $S<T_0$ with $g(T_0,S)<0$. Let $m=\min_{[S,T_0]}x$ and $q=\max_{[S,T_0]}|V_\perp|$, and suppose $e\cdot V\ge0$ on $[S,T_0]$, $x_0+m>0$, and $q_0=|V_\perp(T_0)|$. For $0<u$ and $q\le\beta<1$, define

$$
I_B=\frac{k}{(1-\beta)\,u\,(x_0+m)} .
$$

If $I_B<\min\{w_0-u,\ \beta-q_0,\ 1-|v_0|\}$, the solution continues uniquely for all $t\ge T_0$. It has exactly one partner root in $(S,t)$, with $J\ge1-\beta$ and $\ell\ge x_0+m+u(t-T_0)$. Its velocity satisfies $|V(t)-v_0|\le I_B$ and $|V(t)|\le|v_0|+I_B<1$, while $x(t)\ge x_0+u(t-T_0)$. It converges to a velocity $V_\infty$ with $|V_\infty-v_0|\le I_B$ and $e\cdot V_\infty\ge w_0-I_B>u$; the separation grows without bound. In the sampled target data at $T_0=300$, the third margin is about 0.22 larger than the other two; this numerical observation is not a hypothesis or a general property of the criterion.

*Proof.* The exclusion step is unchanged. Bootstrap $e\cdot V>u$ and $|V_\perp|<\beta$ after $T_0$. Every $s\in[S,t]$ then has $e\cdot V(s)\ge0$ and $|V_\perp(s)|\le\beta$, and it has $x(t)+x(s)\ge x(t)+m>0$. The last inequality uses $x(s)\ge x_0\ge m$ after $T_0$. For the unit vector $n_s$ along $X(t)+X(s)$, this gives $e\cdot n_s\ge0$ and hence

$$
n_s\cdot V(s)=(e\cdot n_s)(e\cdot V(s))+n_s\cdot V_\perp(s)\ge-|V_\perp(s)|\ge-\beta .
$$

The gap slope and the transmitter factor are therefore at least $1-\beta$, which again gives exactly one root in $(S,t)$ with $J\ge1-\beta$. The range satisfies $\ell\ge x(t)+x(s)\ge x_0+m+u(t-T_0)$, so $\int_{T_0}^\infty|A|\le I_B$. The nonexpansive comparison with $v_0$ then gives $e\cdot V\ge w_0-I_B>u$ and $|V_\perp|\le q_0+I_B<\beta$. Both inequalities are strict, which closes the bootstrap. The velocity bound also gives $|V(t)|\le|v_0|+I_B<1$, so the future is strictly subfield. Continuation follows by the Picard route of §2.2 on windows shorter than $x_0+m$, with transmitter floor $1-\beta$ and acceleration bound $k/((1-\beta)(x_0+m)^2)$. That route needs no receiver-factor floor. The regular-chart alternative also has $D_r\ge1-|v_0|-I_B>0$. Integrability gives the velocity limit and escape as before. $\square$

Theorem B improves the sampled target margin. At $T_0=300$ the reference numbers give $q\simeq0.0094$, far below the source speed of about 0.54 that Theorem A must accommodate. They also give $m\simeq47.8$, which adds about a third to the range bound. For exact alignment $e=v_0/|v_0|$, the radial condition of §2.3 carries over with $I_B$. For a fixed direction with $q_0>0$, put $Q=q_0+I_B$ instead: $X\cdot V\ge x_0u-p_0Q+(u^2-Q^2)(t-T_0)$. Thus a certificate with endpoint velocity uncertainty must test $u>Q$ and $x_0u>p_0Q$, rather than silently setting $q_0=0$.

### 2.5. Classification

| Step | Verdict |
| --- | --- |
| Permanent exclusion of sources at or before $S$, including the unit-speed past | Proved; needs only the cap |
| One ordinary root, zero self contribution, $J\ge1-b$, $\ell\ge x_0+u(t-T_0)$ | Proved under the bootstrap; root existence and uniqueness both verified |
| Integrated bound controls vector velocity change by $I$; strict margins close the bootstrap | Proved; the cap-free comparison with $v_0$ removes any reliance on remaining interior |
| Continuation across every finite time | Correct with an added assumption: Lipschitz velocity through $T_0$, plus a named local theorem (Picard–Lindelöf on method-of-steps windows, or the regular-chart theorem) |
| Convergence to a nonzero velocity and unbounded separation | Proved; no monotone-speed or asymptotic-speed claim follows |
| No-radial-turn inequality | Proved |

These are conditional deductions from the finite hypotheses. Verifying those hypotheses for the specified released history remains a separate obligation.

## 3. Stage 2: audit of the submitted continuation

### 3.1. An independent reference

The temporary instrument `.tmp/sharp-circle-escape-independent-review/escape-reference.mjs` (SHA-256 `9683ab7f…c400`) shares no code with the reviewed scripts and uses different numerics throughout:

- a seven-stage sixth-order Runge–Kutta method in place of RK4;
- inertial heading coordinates on the active branch, so unit speed holds by construction and no renormalization is needed;
- quintic Hermite history built from position, velocity and effective acceleration, in place of cubic Hermite;
- a safeguarded Newton root solve using $\partial_sg=J$, in place of bisection;
- Illinois location of the release, with a knot placed there.

The original receipt reports that five known cases passed before its target runs and again on the final instrument hash. The Codex audit reproduced those five controls on the unchanged final hash; that later replay does not independently establish the original run chronology:

- observed Runge–Kutta order 5.79 on an ordinary differential equation with a known solution;
- quintic Hermite exact on a quintic to $1.1\times10^{-15}$;
- the exact $r=1$ circle at $t=6$, with radius, delay $2D$, transmitter factor $1+\sin D$ and forward component $\tan D$ within $10^{-10}$;
- the analytic stationary-past segment $u''=-k/u^2$, within $10^{-12}$ at $t=1$;
- a supplied-ledger ceiling switch at a rotated heading, with release, final speed and distance each within $10^{-12}$ of the exact values.

### 3.2. Agreement, and the breaking-point finding

The original review reports first-order convergence before adding knots at propagated derivative discontinuities. The supplied past has the circle's centripetal acceleration, while the released equation gives a different acceleration at $t=0$. Source velocity is continuous at $s=0$, but its derivative jumps there. When a later receiver's causal source crosses $s=0$, near $t\simeq1.478$, the acceleration account has a derivative discontinuity. Such discontinuities propagate at later source crossings and from the ceiling release. Straddling them can reduce a fixed-step method's order. The original review reported stationary-past discrepancies near $2\times10^{-8}$ before the change and near $2\times10^{-14}$ afterward, with rounding larger at the finest resolution. The retained final instrument resolves crossings through its configured generation limit. The earlier instrument and its raw output were not retained, so this before/after account is a historical report rather than an independently reproduced causal attribution.

With the configured breaking points resolved, three resolutions (maximum steps 0.01/0.04, 0.005/0.02 and 0.0025/0.01) give release near $t=19.90982975694$ and radius $2.8722364547$. At $t=1000$ they give radius about 489.046747758, speed about $0.478276160499$ and transmitter factor about $1.492381776240$. The recorded runs report no radial maximum, speed minimum or return to the ceiling after release; this is a sampled diagnostic, not continuous event exclusion.

The submitted releases, 19.9098297508 and 19.9098297541, move toward this value as the step shrinks, and a first-order extrapolation gives about 19.90982976. Their residual offset is consistent with RK4 straddling the same discontinuities. The submitted diagnostic correctly declined to treat its $10^{-10}$ bracket as a total error. Across the 1,999 matched log times, the recorded maximum velocity difference is $2.44298394\times10^{-9}$ and the maximum position difference is $1.40939727\times10^{-6}$. The latter occurs near $t=999.5$ and is consistent with accumulation of a velocity offset near $1.4\times10^{-9}$; no rigorous error bound follows.

A companion run with $r_0$ raised by $10^{-9}$ shifts the release by $-2.44\times10^{-6}$ and the radius at $t=1000$ by $1.17\times10^{-6}$. These measured finite differences give response ratios of order $10^3$ along this one input perturbation. They do not establish a time-translation identity, the exact derivative, or a bound for general history perturbations.

### 3.3. Audit of the submitted algorithm

- **Release detection:** the sign of the raw forward component is checked only at step ends. A trial step with the smooth boundary extension then bisects the step length, and that extension removes the full tangential component of either sign. This is a sound numerical device. It cannot see a negative excursion of the forward component that begins and ends inside one step. Such an excursion would be mishandled, because the extension keeps unit speed where the law would retain braking. Neither instrument observed one, but neither can exclude one. As the independent release value shows, the bracket width measures only the bisection.
- **Velocity normalization:** the largest correction, $4.45\times10^{-16}$, is numerical hygiene with no physical content.
- **History:** cubic Hermite positions are used, and their derivative supplies the source velocity. The velocity error is third order, the interpolants cross breaking points, and the source-speed excess of $2.46\times10^{-12}$ is not a certificate of the cap.
- **Root brackets:** the lower bracket assumes the history stays within the largest knot radius. An assertion catches any failure, and bisection relies on the cap's monotonicity. The recorded post-release source-speed diagnostics suggest a gap slope above 0.45 on the represented history. It is not a completeness certificate.
- **Stage sources:** an assertion guarantees that no stage source lies beyond accepted history, which is correct.
- **Escape diagnostic:** it evaluates Theorem A on the represented history, using Bernstein control points, which correctly bound each whole cubic segment in exact arithmetic. The independent run agrees with its reported margin at the displayed precision: 0.0318996046 at $T_0=1000$ with $b=0.7$, $u=0.35$ and $S=100$.

### 3.4. Evidential scope

The submitted run is now corroborated by a separately written instrument: floating-point evidence from two independent implementations, which is more than a reproduction by one. It remains measured floating-point evidence about approximate trajectories. Neither run encloses the exact solution, certifies root completeness on continuous intervals, or excludes short events between steps. The outward trend and positive escape-criterion margins are measured numerical diagnostics. They do not prove eventual escape of the exact released history.

## 4. Stage 2: the certification attempt

### 4.1. The finite obligation, made explicit

Theorem B shortens the horizon that has to be certified. On the reference trajectory, with $e$ along the velocity at $T_0$ and $S$ one time unit before the root at $T_0$, the best margins are as follows. These are planning numbers from sampled knots, not enclosures:

| $T_0$ | $x_0$ | $m$ | $q$ | $I_B$ | Theorem B margin | Theorem A best margin |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 150 | 74.76 | 20.54 | 0.0380 | 0.2195 | −0.0027 | — |
| 175 | 87.63 | 25.18 | 0.0278 | 0.2042 | 0.0283 | — |
| 200 | 100.37 | 29.77 | 0.0212 | 0.1946 | 0.0528 | −0.199 |
| 300 | 150.40 | 47.83 | 0.0094 | 0.1641 | 0.1188 | −0.106 |
| 1000 | 488.93 | 169.84 | 0.0009 | 0.1000 | 0.2607 | 0.0895 |

At $T_0=300$ the optimum uses $\beta\simeq0.284$ and $u\simeq0.2125$, and the radial condition also holds: $u-I_B\simeq0.048$ and $x_0u-p_0I_B\simeq30.3$.

Fix $T_0=300$, $S=99.27557599180734$, $\beta=0.285$ and $u=0.2125$. The receipt records $g(T_0,S)\simeq-1.5282589532$ at this source cutoff. A position error bound $\varepsilon_x$ changes this gap by at most $2\varepsilon_x$, by the reverse triangle inequality. The earlier proposed radius 1 therefore could not certify the negative sign. Radius 0.5 leaves a planning gap margin of about 0.528.

For a fixed exact unit direction, position and velocity errors give $(x_0+m)_{\rm lower}=x_0+m-2\varepsilon_x$, $w_{0,\rm lower}=w_0-\varepsilon_v$, $q_{0,\rm upper}=q_0+\varepsilon_v$, $q_{\rm upper}=q+\varepsilon_v$, and $|v_0|_{\rm upper}=|v_0|+\varepsilon_v$. With $\varepsilon_x=0.5$ and $\varepsilon_v=0.02$, substituting the sampled data gives $I_B\simeq0.1651123$ and a remaining margin of about 0.09785. The endpoint transverse allowance is 0.02, so the optional radial test uses $Q\simeq0.1851123$. If the exact unit direction differs from the recorded direction by $\delta_e\le10^{-12}$, projection allowances must additionally include $\delta_e|X|$ and $\delta_e|V|$; a conservative allowance for transverse projection is $2\delta_e|V|$. These terms are small but must be included in a rigorous certificate.

The proposed obligation is therefore **a validated solution enclosure on $[0,300]$, with position radius at most 0.5 and velocity radius at most 0.02 on $[S,300]$, together with certified continuous reference bounds and all Theorem B inequalities.** The sampled extrema above are not bounds between knots. The certificate must enclose those extrema, verify $g(T_0,S)<0$ and $e\cdot V\ge0$, and establish the single-root census and positive regularity floors through $300$. Tolerances alone do not supply these facts. No such certificate is produced here.

### 4.2. The ceiling switch needs no event certificate

The normal-cone structure can cover the switch directly. Let $V$ be the exact velocity, with $\dot V+\nu=A[X]$ and $\nu\in N_{\mathcal B}(V)$. Let $\tilde V$ be an absolutely continuous comparison velocity with $|\tilde V|\le1$, $\dot{\tilde X}=\tilde V$, admissible retained history, and an integrable selection $\tilde\nu\in N_{\mathcal B}(\tilde V)$. Define the full defect $r=\dot{\tilde V}+\tilde\nu-A[\tilde X]$, assuming both acceleration accounts are defined on the comparison interval. The normal cone of a convex set is monotone, so $(V-\tilde V)\cdot(\nu-\tilde\nu)\ge0$. Taking the inner product of the difference equation with $V-\tilde V$, and regularizing the norm at zero, gives

$$
\frac{d}{dt}|V-\tilde V|\le|A[X]-A[\tilde X]|+|r|\quad\text{a.e.}
$$

After integration, the velocity gap is at most its initial value plus the integral of the displayed right-hand side. Neither the exact release time nor a later ceiling contact must be located for this estimate. The comparison path must satisfy the constraint exactly. On an active arc, write $\tilde V=(\cos\alpha,\sin\alpha)$ and choose $\tilde\nu=(\tilde V\cdot A[\tilde X])_+\tilde V$. The radial component of $r$ along $\tilde V$ is then $(\tilde V\cdot A[\tilde X])_-$. The tangential component remains $\dot{\tilde V}-(\mathrm{Id}-\tilde V\tilde V^\mathsf T)A[\tilde X]$ and must also be enclosed. Heading coordinates enforce unit speed, not zero tangential defect. This derived comparison lemma removes the need for exact event location while retaining the full residual, root and existence obligations.

### 4.3. Certified constants

The script `constants_enclosure.py` used `mpmath` 1.3.0 interval arithmetic at 200 bits in the shared virtual environment. It first enclosed $\sqrt2$ as a known case, then certified by bisection with guaranteed signs:

- $D\in[0.73908513321516064165531208767387340401341175890042935,\ 0.73908513321516064165531208767387340401341175890077147]$;
- $k\in[4.9477670781574865649850929662140331508675044836569665,\ 4.9477670781574865649850929662140331508675044836600044]$, whose computed width is $3\times10^{-48}$.

The displayed endpoints are the computed endpoints truncated downward and rounded upward at the last shown digit.

Rigor here rests on the correctness of `mpmath`'s outward-rounded interval routines.

### 4.4. The obstruction

This review exercised `mpmath.iv` for constants and considered an a-posteriori trajectory certificate. That route takes a high-accuracy comparison path, encloses its full defect, and propagates the defect using §4.2 and bounds for the delayed dependence. That dependence runs through root shift, range, direction and $J$, including source velocity. The regular-chart estimates provide a starting point for Lipschitz bounds. This review did not implement or test a validated trajectory integrator; it establishes no exhaustive claim about the tools available in the repository or environment.

The decisive quantity is how far that bound amplifies the defect. It was evaluated along the reference as a planning estimate, not a bound:

| Interval | Sampled sup-norm planning system | Reduced planning system (receiver Jacobian $2|A|/\ell$ only) | Separate local or numerical comparison |
| --- | ---: | ---: | ---: |
| $[0,20]$, near-circle phase | $\sim10^{31}$ | $\sim10^{9.5}$ | $\sim10^{3.6}$ from the circular linearized mode; not a bound along the released path |
| $[0,300]$ | $\sim10^{35.7}$ in position | $\sim10^{10.9}$ | $\sim10^{3.4}$ from the measured release-time finite difference in one input direction; not a history-norm bound |

These planning systems discard correlations that could reduce error growth. Their large amplification suggests that a direct norm-based certificate may need a very small defect, potentially around $10^{-37}$ under the displayed estimates. That is an inferred design concern, not a certified necessary precision. Interval Taylor-series evaluation through the implicit root and source polynomial is one possible way to bound the defect on entire time boxes. The later portion contributes less amplification in these sampled systems, but it still needs rigorous control. Neither the circular linearized exponent nor a single input perturbation bounds general errors along the released history.

The remaining blocker is concrete: **a validated defect evaluator and a rigorous error-propagation bound have not been constructed for this trajectory.** The calculations motivate testing higher precision or correlation-preserving estimates; they do not prove that either is necessary or sufficient. No positive-time prefix was certified in this review.

### 4.5. Smallest next implementation

A bounded next experiment is a validated defect evaluator on the first method-of-steps window, where all sources lie in the analytic supplied past. It would enclose the implicit causal root, compose the source history and bound the full residual on time boxes, splitting at source-segment boundaries and derivative discontinuities. Test it first against the exact $r_0=1$ circle, whose analytic defect is zero; a polynomial approximation still has its own nonzero interpolation defect. Tighter Lipschitz bounds can then test whether simple norm propagation is viable. Propagating correlations through retained history is another prospective route. No runtime or relative-efficiency claim is established until these alternatives are implemented and profiled.

## 5. Escape of the specified released history

Escape is unresolved. The theorem half of the argument is proved, in two forms. The numerical trajectory is corroborated by two separately written floating-point implementations. Evaluating the inequalities on numerical histories gives a Theorem A margin of 0.0319 at $T_0=1000$, and Theorem B margins of 0.119 at $T_0=300$ and 0.261 at $T_0=1000$. Nothing yet connects the exact solution to those numbers. Once §4.1's enclosure exists, the following finite inequalities certify the infinite future through Theorem B: $g(T_0,S)<0$, $e\cdot V\ge0$ and $|V_\perp|\le\beta$ on $[S,T_0]$, $x_0+m>0$, and $I_B<\min\{w_0-u,\beta-q_0,1-|v_0|\}$, all evaluated on the enclosure. This review makes no statement about the contracting input, other perturbations, a stable binary, or physical preparation of the supplied history, whose acceleration mismatch at release remains.

## 6. Documentation repairs to the reviewed analysis

These are not mathematical defects. They are suggested for the owner of the reviewed analysis, which this review did not edit.

1. §4 should state the solution class (Lipschitz velocity through $T_0$) and name the continuation theorem: Picard–Lindelöf on method-of-steps windows of length below $x_0$ for Theorem A, or the regular-chart theorem with $d_t=d_r=1-b$. It should also state that antipodal reduction is justified by reflection symmetry together with uniqueness.
2. §4 may replace "there is no cap reaction in this strict interior" with the nonexpansive comparison against the constant velocity $v_0$, which holds with or without contact. It may also note that $u<w_0$ and $|v_0|<b$ follow from the main inequality.
3. §2 and §5 can explain the refinement discrepancy in the release time: the breaking points propagated from $t=0$ and from the release. An independent breakpoint-aware value is $19.90982975694\pm10^{-11}$, graded as measured floating point.
4. Manuscript §9.3.6's "every future-relevant past source lies in $[S,T_0]$" should read "every source for receivers after $T_0$ lies after $S$". Sources after $T_0$ are controlled by the bootstrap, not by the $[S,T_0]$ hypotheses.
5. The remaining-proof paragraph of §5 can cite the Theorem B obligation of §4.1 and note that release certification is unnecessary (§4.2).

## 7. Evidence and limits

The [receipt](../evidence/sharp-circle-escape-independent-review-receipt.json) records the quantitative results, instrument hashes and originally reported run order, with the historical-data exception noted in §3.2. Its correction addendum preserves the original numerical fields and records the revised certificate plan. The Node instruments ran under Node v26.3.0 in IEEE double precision; the constants used the shared virtual environment's Python 3.13.2 and `mpmath` 1.3.0. All 16 compact original evidence files were copied byte-for-byte to `.local-data/braid-analysis/sharp-circle-escape-independent-review-2026-09-26/`, whose manifest binds 112,796 bytes by file hash and line count and whose README gives command context. The original scratch files remain; no instrument was promoted to a regular script or test. These ignored local copies are retention, not an independently backed-up archive. The follow-up audit verified the named hashes, reproduced the five Node controls and constant enclosure, and checked receipt/output consistency; it did not rerun the full target trajectories.

Claim grades are as follows:

- Theorems A and B, the radial condition and the comparison lemma: derived under their stated hypotheses; separately checked by Codex during this correction pass. This does not certify the target history.
- Constant enclosures: derived by outward-rounded computation.
- Trajectory agreement and margins: measured floating point, produced by the named instrument.
- Amplification figures: inferred planning estimates.
- Proposed implementation routes: prospective; cost and sufficiency remain unmeasured.

## 8. Falsifiers

Any of the following observations would overturn a conclusion of this review:

- **Theorem A or B:** a capped antipodal solution satisfying all exact finite hypotheses that later loses the root census, exceeds the corresponding integrated acceleration bound, or violates the proved longitudinal or speed bounds. A radial turn refutes the additional no-turn conclusion only when its extra radial inequalities have also been established.
- **Comparison lemma:** a capped exact solution and a constraint-satisfying comparison path whose velocity gap grows faster than the integrated ledger difference plus the defect.
- **Measured agreement:** replay of the identified instrument and inputs producing sample discrepancies outside the reported maxima would challenge reproducibility of the comparison. An exact-solution enclosure far from both approximations would instead defeat their use as predictions of that solution; it would not undo their measured agreement with each other.
- **Breaking-point diagnosis:** a controlled before/after experiment that fails to reproduce the claimed order improvement would challenge the proposed explanation. The missing pre-change artifact currently limits that attribution.
- **Escape itself:** a certified bounded future, or another rigorous contradiction of separation tending to infinity, would refute escape. Failure of Theorem B's sufficient conditions leaves escape unresolved. A finite radial turn or ceiling return alone does not refute eventual escape.

## Next step

The separate mathematical review supports the corrected Theorem B and comparison lemma. The next bounded implementation is the defect evaluator in §4.5, tested first against the analytic circle. The eventual certificate target is §4.1's solution enclosure and complete finite hypotheses, with planning tolerances 0.5 in position and 0.02 in velocity; certifying an exact ceiling-switch time is unnecessary if the full comparison defect is enclosed.
