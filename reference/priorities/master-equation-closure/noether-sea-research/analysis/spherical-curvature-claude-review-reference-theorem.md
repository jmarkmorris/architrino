# Spherical curvature investigation: review theorem reference (wake-speed crossing on an ordinary chart), frozen before reading any wave-2 subject

Role: review (`ramon-e-moore` lens). Owner: the review role only. Companion to the [frozen review reference](spherical-curvature-claude-review-reference.md) and to section G.1 of [adjudication-1](spherical-curvature-claude-review-adjudication-1.md), which it restates as a free-standing theorem with its own small-delay bounds. Authored before reading `spherical-curvature-claude-symmetry-wave2.md` or any other wave-2 subject. Units $R=c_f=K=1$ unless shown; general $R$ is restored by the scaling of reference 2.1. Correction 1 read at 2026-10-11 00:03 UTC.

## Setting and hypotheses

Six members on the unit sphere. Fix a time $T_1$ (release, $T_1=0$, in the application). (H1) Supplied history on $[T_1-2,T_1]$: each path is $C^1$, on the sphere, with speed at most $1$ and acceleration at most $a_{\mathrm p}$. (H2) Candidate continuation on $[T_1,T_1+\varepsilon)$: each path is $C^1$ on the sphere, velocity continuous at $T_1$, acceleration uniformly bounded by $a_{\max}$ on the whole interval (a pointwise-finite acceleration that is unbounded as $T\to T_1^+$ is excluded by hypothesis, not by theorem). (H3) The selected law $\ddot{\mathbf X}_i=P_i\mathbf A_i-|\mathbf v_i|^2\mathbf n_i$ holds pointwise on $(T_1,T_1+\varepsilon)$ with the complete all-root canonical sum, every admitted root at positive separation. (H4) Pairwise chords are at least $d_{\min}>0$ on $[T_1-2,T_1+\varepsilon)$. Write $a^*=\max(a_{\mathrm p},a_{\max})$, $t=T-T_1$, $v_{\sup}=1+a_{\max}\varepsilon$.

## Lemma 1 (self root exists above wake speed)

If $|\mathbf v_i(T)|>1$ then $f_{ii}(\tau)=\tau-|\mathbf X_i(T)-\mathbf X_i(T-\tau)|$ has $f_{ii}'(0^+)=1-|\mathbf v_i(T)|<0$ and $f_{ii}(2)\ge0$, so a positive-delay self root exists. Claim grade: derived. Falsifier: a sphere path with $|\mathbf v_i(T)|>1$ and $f_{ii}>0$ on $(0,2]$.

## Lemma 2 (small-delay bounds for a self root, actual curve, no model path)

Let $u$ be a self-root delay at reception $T=T_1+t$, $t\in(0,\varepsilon)$, and $L$ the path length over $[T-u,T]$. Exact sphere inequality: a chord between two points of the unit sphere joined by a curve of length $L\le\pi$ is at most $2\sin(L/2)$, hence $u=\text{chord}\le2\sin(L/2)$, so $L\ge2\arcsin(u/2)\ge u+u^3/24$ (the arcsine series has positive coefficients). Speed bound on the window: at most $1$ before $T_1$ and at most $1+a_{\max}s$ at $T_1+s$. If the emission is before $T_1$ (that is $u>t$): $L\le(u-t)+t+a_{\max}t^2/2=u+a_{\max}t^2/2$, so $u^3\le12a_{\max}t^2$. If the emission is after $T_1$: $u\le t$. Therefore every self-root delay satisfies

$$
u\ \le\ \max\!\bigl(t,\ (12a_{\max})^{1/3}t^{2/3}\bigr)\ \xrightarrow[t\to0^+]{}\ 0 .
$$

Lower bound: from $|\mathbf X_i(T)-\mathbf X_i(T-u)-u\mathbf v_i(T)|\le a^*u^2/2$ and the root condition, $u\ge u|\mathbf v_i(T)|-a^*u^2/2$, so $u\ge2(|\mathbf v_i(T)|-1)/a^*$. The delay of any self root is squeezed between the speed excess and a power of the elapsed time. Claim grade: derived (the sphere chord bound is exact; the Taylor bound uses only (H1)–(H2)). Falsifier: a self root on a path satisfying (H1)–(H2) with $u$ outside these bounds.

## Lemma 3 (projected direction cone and sign)

For a self root with $a^*u\le1/2$: $|\hat{\mathbf r}-\mathbf v_i(T)|\le a^*u/2$ (divide the Taylor bound by the chord $u$), so the angle $\vartheta$ between $\hat{\mathbf r}$ and $\mathbf v_i(T)$ has $\sin\vartheta\le a^*u/(2-a^*u)\le a^*u$ and $\hat{\mathbf r}\cdot\hat{\mathbf v}_i(T)\ge1-a^*u$. Since $\hat{\mathbf v}_i$ is tangent, the tangent projection of the hit has component along $\hat{\mathbf v}_i$ at least $(1-a^*u)$ times the hit magnitude. Every self hit has $\sigma=+1$: self hits with small delay all push forward and cannot cancel one another. Claim grade: derived. Falsifier: a self root with $\hat{\mathbf r}\cdot\hat{\mathbf v}_i<1-a^*u$ on a path satisfying the hypotheses.

## Lemma 4 (weight bound)

At any self root, $|D_t|=|1-\mathbf V_i(T-u)\cdot\hat{\mathbf r}|\le1+|\mathbf V_i(T-u)|\le1+v_{\sup}$, so the transmitter weight is at least $1/(1+v_{\sup})$, which is at least $1/2$ for a pre-release emission. The hit magnitude is at least $K/(u^2(1+v_{\sup}))$. Claim grade: derived. Falsifier: a root with $|D_t|>1+|\mathbf V_i|$.

## Lemma 5 (localization of all self roots and bounded partner sum)

For $\delta\in(0,2)$ let $m(\delta)=\min_{[\delta,2]}f_0>0$ where $f_0(\tau)=\tau-|\mathbf X_i(T_1)-\mathbf X_i(T_1-\tau)|$ (positive by the on-sphere path-length argument under (H1)). Since $|f_{ii}(\tau;T)-f_0(\tau)|\le2v_{\sup}t$, for $t<m(\delta)/(2v_{\sup})$ every self root lies in $(0,\delta)$. For $t<d_{\min}$ every partner root has emission before $T_1$, so by the sphere certificate (adjudication-1 A.2) each partner has exactly one root with $D_t\ge1-\sqrt{1-d_{\min}^2/4}$ and $|P_i\mathbf A_i^{\mathrm{partners}}|\le C_{\mathrm p}=5K/(d_{\min}^2(1-\sqrt{1-d_{\min}^2/4}))$. Claim grade: derived. Falsifier: a self root in $[\delta,2]$ at some $t<m(\delta)/(2v_{\sup})$.

## Theorem (no upward wake-speed crossing on an ordinary chart)

Under (H1)–(H4) there is $T_c>0$ such that $|\mathbf v_i(T)|\le1$ for every member and every $T\in(T_1,T_1+T_c)$. Proof: choose $\delta$ with $K(1-a^*\delta)/(\delta^2(1+v_{\sup}))-C_{\mathrm p}>a_{\max}$ and $T_c=\min(\varepsilon,d_{\min},m(\delta)/(2v_{\sup}))$; if $|\mathbf v_i(T)|>1$ at some $T<T_1+T_c$, Lemma 1 gives a self root, Lemma 5 puts every self root in $(0,\delta)$, Lemmas 3–4 make their tangent sum along $\hat{\mathbf v}_i$ at least $K(1-a^*\delta)/(\delta^2(1+v_{\sup}))$, and Lemma 5 bounds the partner sum, so $|P_i\mathbf A_i|>a_{\max}$, contradicting (H2). Iterating from any later time up to which the history is sub-wake-or-equal, the speed never exceeds $1$ while the chart is ordinary and chords stay bounded below. Claim grade: derived under (H1)–(H4). Falsifier: a path satisfying (H1)–(H4) with $|\mathbf v_i(T)|>1$ at some $T\in(T_1,T_1+T_c)$.

## Corollary (which $v=c_f$ releases continue)

On $(T_1,T_1+T_c)$ the sphere certificate applies (speed at most $1$ on every window), so the law there is the sub-wake law with unique partner roots and no self roots; on the stationary-source interval it is the static-field ODE from the release data, whose solution is unique and is the only candidate. Hence a $v=c_f$ release has an ordinary-chart continuation on some $(0,\varepsilon)$ if and only if that unique sub-wake solution keeps every speed at most $1$ on $(0,\varepsilon)$. Sufficient: $\beta_i'(0)<0$ for every member. Not necessary in general ($\beta'(0)=0$ with $\beta''(0)<0$, or speed identically $1$, would also qualify). For the six poles, where $\beta''(0)=g^2\sin^2\psi/\beta+g\beta/8>0$ whenever $\beta'(0)=0$, the condition reduces to $\cos\psi_i>0$ for all six. Application: A1 (common rotation, $\beta'(0)=0$, $\beta''(0)=9/8$) has no ordinary-chart continuation. What the law supplies past such a release: nothing; no event rule is selected, and the theorem does not exclude continuations whose acceleration is pointwise finite but unbounded as $t\to0^+$. Claim grade: derived (the six-pole application uses the exactly verified second-order law of adjudication-1 G.2). Falsifier: an explicit path satisfying (H2)–(H3) for A1 on some $(0,\varepsilon)$.

Frozen: 2026-10-11 00:35:01 UTC. sha256 over all bytes preceding this line (`head -n       42 <file> | shasum -a 256`): af6803578e4b6be7c22fbf864589a1a391d2ae796219a2c157d5b5ae81e43a0d. Frozen before reading any wave-2 subject or the deferred rotating/H2 sections.
