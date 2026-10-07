# Independent source-history reference for the one-hour Maxwell E investigation

**Frozen reference, 2026-10-05.** This reference is written before inspecting the new one-hour subject derivation, implementation, or outputs. The input is [Section 7](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), the [original independent reference](maxwell-shaped-overnight-independent-reference.md), and the [prior independent neutral reference](maxwell-e-first-event-final-neutral-hale-reference.md). Its derived statements are conditional mathematical results, not a certification of a target trajectory. The assigned case is the original opposite-polarity, equal-coupling mirror planar history with $K=c_f=1$, initial speed $3/10$, radius $25/9$, and angular speed $27/250$. It retains the original compatible circle-tail endpoint patch and its $C^{2,1}$ regularity. The affine example in Section 3 of the original reference is not the selected preparation. No new response term, physical history, equality rule, or future physical support is introduced.

## 1. Two clocks and two distinct domains

A validated step starts at time $a$ and attempts to construct the physical trajectory on $[a,b]$. Write $Y(s)$ for one physical source history, already validated for $s\le a$, and $\bar Y(q)$ for a prescribed comparison curve. An error enclosure on an old physical interval $I\subset(-\infty,a]$ has the form

$$
\left|Y^{(k)}(s)-O\bar Y^{(k)}(s+\theta)\right|\le e_k(s),\qquad s\in I,\quad k=0,1,2.
$$

Here $O$ is an orthogonal spatial alignment and $\theta$ is a comparison-clock offset. Both are held fixed when differentiating the source variable $s$. The three enclosures cover physical position, velocity, and acceleration. They do not assert physical existence at $s+\theta$. The prescribed comparison curve must supply position, velocity, acceleration, and a bounded almost-everywhere jerk on every nominal interval used by the proof. The physical history only needs its previously established position, velocity, acceleration, and compatible $C^{2,1}$ seams; no bound on physical jerk is silently inferred from nominal jerk.

The distinction is essential when $s\le a$ but $s+\theta>a$. Evaluating the prescribed comparison curve there is legitimate if its definition and jet bounds cover that nominal time. Querying a physical error enclosure at that nominal time is illegitimate unless physical validation separately reaches it. A finite retained comparison curve is sufficient only when all nominal queries stay in its declared domain; the phrase complete comparison history does not create missing coefficients.

**Falsifier.** A physical-error lookup indexed by $s+\theta$ rather than $s$, or a nominal-jet lookup outside the prescribed curve's declared domain, defeats the corresponding step certificate.

## 2. Root existence, uniqueness, and old-source coverage

For a receiver position $x$ at reception time $t$, set

$$
F(s)=t-s-|x-Y(s)|,\qquad n=\frac{x-Y(s)}{|x-Y(s)|},\qquad D=1-n\cdot Y'(s).
$$

Where the range is positive, $F_s=-D$. If the source speed is at most $q<1$ throughout a declared interval, then $D\ge1-q$. Thus opposite endpoint signs on $[\ell,a]$, namely $F(\ell)\ge0$ and $F(a)<0$, give exactly one root there. Bounds must hold for every receiver in the step enclosure and every reception time in the step. Equality at the old left endpoint can be included by a closed seam convention; strict negativity at $a$ proves a positive gap from the latest old physical time.

The upper sign can be proved using only the old edge:

$$
|x-Y(a)|>t-a.
$$

It does not require knowing a future source position $Y(t)$. A complete uniformly subfield old tail gives the lower sign sufficiently far in the past, because $F(s)\to+\infty$ as $s\to-\infty$. The remaining interval $(a,t)$ is root-free if the physical step bootstrap has source speed below one: monotonicity then continues $F(a)<0$. This combination proves all-root coverage without evaluating unknown future source data. It also distinguishes a proved old-source gap from a nominal root that happens to precede a nominal cutoff.

For the actual mirror pair with a proved complete subfield extension, the simultaneous separation is $2|x(t)|$, and the familiar delay lower bound is $2|x(t)|/(1+q)$. This formula cannot be used for an intermediate comparison pair whose source and receiver have been translated, rotated, or varied independently. On that pair the correct distance is $|x-Y(t)|$ when both terms are defined, or the old-edge sign argument above. A positive present-radius bound alone does not supply its separation.

Positive-delay self roots are absent whenever each actual member's complete past through the reception time is uniformly subfield: its displacement over delay $\tau>0$ is at most $q\tau<\tau$. This is an all-past geometric exclusion, including the current bootstrap interval, not a deleted self channel.

**Falsifiers.** An uncovered emission interval, an endpoint without a sign proof, an intermediate nonmirror pair using $2|x|$, or a self-root exclusion based only on present speed invalidates the claimed complete census.

## 3. Comparing roots without extending physical errors

Fix $t$ and compare an actual receiver $x$ with a nominal receiver $\bar x$. The aligned nominal source is $Z(r)=O\bar Y(r+\theta)$. Let $s$ solve the actual root equation and $\hat s$ solve the nominal equation in the same physical-clock coordinate. Its nominal emitted time is $\rho=\hat s+\theta$. Suppose both roots and the segment between them lie in a regular nominal root chart with source-speed bound $\bar q<1$. Evaluating the nominal residual at the actual root gives

$$
|t-s-|\bar x-Z(s)||\le |x-\bar x|+e_0(s).
$$

The reverse triangle inequality proves this directly. Monotonicity of the nominal residual then gives

$$
|s-\hat s|\le\frac{|x-\bar x|+e_0(s)}{1-\bar q}=:\eta.
$$

Consequently, if $M_1,M_2,M_3$ bound the nominal velocity, acceleration, and jerk on the entire nominal segment between $s+\theta$ and $\rho$, then

$$
\begin{aligned}
|Y(s)-O\bar Y(\rho)|&\le e_0(s)+M_1\eta,\\
|Y'(s)-O\bar Y'(\rho)|&\le e_1(s)+M_2\eta,\\
|Y''(s)-O\bar Y''(\rho)|&\le e_2(s)+M_3\eta.
\end{aligned}
$$

These estimates use physical errors only at the old physical time $s$. All time-shift transport is performed along the prescribed nominal curve. In particular, acceleration transport uses nominal jerk, not an unstated physical jerk estimate. The segment must be covered even when its endpoints occupy different nominal pieces. Continuous acceleration and bounds on the almost-everywhere jerk across finitely many covered seams give the needed Lipschitz inequality.

If a proof obtains root shifts by differentiating an interpolation parameter instead, the root chart must hold for every intermediate source-receiver pair. For $F_\lambda(s)=t-s-|x_\lambda-Y_\lambda(s)|$, the identity $\partial_\lambda s=-\partial_\lambda F_\lambda/\partial_sF_\lambda$ only applies after existence, positive range, and a uniform denominator floor are proved over the entire parameter family. Endpoint checks alone do not supply that family. The direct residual estimate above can avoid this additional interpolation obligation when its hypotheses are available.

**Falsifier.** A missing nominal segment, a substituted physical-jerk constant, or a root-family derivative taken outside a proved chart overturns the transport claim.

## 4. Changing offsets or spatial alignment

Suppose a stored enclosure uses $(O_0,\theta_0)$ and a new comparison uses $(O_1,\theta_1)$. For the same physical source time $s$, let $M_k$ bound $|\bar Y^{(k)}|$ on the old nominal point and all swept nominal times. The triangle inequality and the fundamental theorem of calculus give

$$
e_k^{\rm new}(s)\le e_k^{\rm old}(s)+\|O_1-O_0\|M_k+M_{k+1}|\theta_1-\theta_0|,\qquad k=0,1,2.
$$

One may use the old-point $M_k$ and the swept-interval $M_{k+1}$ separately for sharper bounds. Orthogonal maps have norm one. The actual error support remains $s\in I$; it is not translated along with the nominal reference. A certificate using a time-dependent nominal root or alignment must charge these offset changes, or preserve a single frozen alignment over the entire step.

A fixed-reception alignment is an auxiliary source function. If a proof instead differentiates the assembled time-dependent curve $O(t)\bar Y(t+\theta(t))$, the terms containing $O'(t)$ and $\theta'(t)$ must appear. Replacing its physical derivatives by $O\bar Y'$ and $O\bar Y''$ is false. This reference introduces no moving-frame dynamics.

**Falsifier.** Reusing the old error radius after a changed offset without a valid invariant alignment or the displayed transport allowance invalidates that enclosure.

## 5. Neutral-coordinate closure and recovery of the selected equation

For the mirror source write the positive member as $x$, with $u=x'(t)$, $v=x'(s)$, $a_s=x''(s)$, $R=|x(t)+x(s)|=t-s$, $n=(x(t)+x(s))/R$, $D=1+n\cdot v$, and $W=1-n\cdot u$. The opposite-polarity Section 7 equation is

$$
u'=-C+B_0a_s,\qquad C=\frac{(1-|v|^2)(n+v)}{R^2D^3},\qquad B_0=\frac{(n+v)n^\top-DI}{RD^3}.
$$

The exact source clock satisfies $s'=W/D$. Since $n^\top B_0=0$, the correction $q=(n+v)/(RDW)$ and transformed velocity $p=u+q$ cancel delayed acceleration upon differentiation: $q_v=-(D/W)B_0$, so $B_0a_s+q_va_ss'=0$. The additional receiver derivative $q_uu'$ remains; its delayed-acceleration part vanishes by $n^\top B_0=0$. The prior neutral reference supplies the full derivative and inverse map. Thus a local transformed ordinary differential equation can be validated on a compact regular chart using old physical position and velocity. Its inverse then reconstructs Section 7 using continuous old acceleration. That reconstruction, and any claimed enclosure for physical acceleration, still need the old physical acceleration support described above.

A valid step needs: a self-mapping receiver enclosure; a strictly positive range and $D,W$; old physical root coverage; nominal coverage of every comparison query and swept interval; compatible seams; a local existence/uniqueness argument; and an outward-rounded defect/error bound that closes with strict slack. A small computed error without those domain premises does not establish existence. Failure of one conservative enclosure establishes failure of that certificate, not physical failure of the selected equation.

## 6. Known mathematical controls fixed before subject inspection

The following controls are derived by hand before any target or new implementation inspection. They are references for an implementation test, not numerical target evidence.

1. **Stationary source.** With $Y(s)=0$ and $x=r>0$ in one dimension, $s=t-r$, $D=1$, and Section 7 gives unsigned acceleration $1/r^2$. Perturbing the receiver by $\epsilon$ changes the root by exactly $-\epsilon$ while the range remains positive, saturating the unit root-shift bound.
2. **Translated affine nominal clock.** With $\bar Y(q)=v q$, $|v|<1$, and receiver $x$ on a chart with $x-v(s+\theta)>0$, the root is $s=(t-x+v\theta)/(1-v)$ and $\rho=s+\theta$. Changing $\theta$ by $\Delta$ moves the physical-coordinate nominal root by $v\Delta/(1-v)$ and its nominal clock by $\Delta/(1-v)$. The two shifts must not be confused. The old/new position error allowance is exactly $|v\Delta|$; acceleration and jerk vanish.
3. **Nominal acceleration transport.** For $\bar Y(q)=q^3/6$ on a bounded interval, $\bar Y''(q)=q$ and jerk is one. Moving a comparison source clock by $\Delta$ changes the acceleration by exactly $\Delta$. This tests the nominal-jerk term independently of any physical history.
4. **Nonmirror exclusion trap.** A receiver at $x=1$ and stationary source at $Y=9/10$ have root delay $1/10$. Using the mirror distance $2|x|=2$ would falsely claim delay at least two. Every intermediate-history helper must accept the actual separation or reject the mirror shortcut.
5. **Domain separation.** An actual source query at $s=a-1/10$ with $\theta=1/5$ has nominal clock $a+1/10$. A comparison curve defined there can be evaluated, but a physical-error lookup there must fail if the validated physical prefix ends at $a$. Conversely an actual query $s>a$ must fail even when its nominal clock lies in the comparison domain.
6. **Moving-frame trap.** A constant nonzero nominal position rotated by a varying orthogonal matrix has nonzero assembled velocity, even though its rotated nominal velocity is zero. A helper differentiating an assembled curve must retain frame derivatives.

## Operational freeze and scope

The reference is a separately authored derivation. It does not certify the previously reported physical prefix, any new step, or the first later event. The original reference sources remain unchanged. The owner may now compare a frozen implementation against these conditions and controls, recording the result in the separately assigned adjudication file. Failure can identify a numerical or proof obstruction only; an actual speed boundary, fold, contact, or finite-time loss of regularity requires its own certified event argument. No owned computation is running at this freeze.
