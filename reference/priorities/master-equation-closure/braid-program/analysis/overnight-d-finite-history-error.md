# Finite-history error bounds for the selected ceiling release

## Purpose and status

The [tail-neighborhood check](overnight-d-tail-interval-independent-review-2026-10-06.md) leaves one principal scientific gap: the original exact release has not been enclosed within the checked position and velocity allowances. This note develops an a posteriori error route for the finite history. Its smooth-bracket comparison has passed [independent reconstruction](overnight-d-finite-history-independent-review-2026-10-06.md); a complete finite enclosure, including source-kick crossings, remains unimplemented and unproved. No new equation, kick, response factor or contact rule is selected.

The exact response is the original inclusive unit-ball normal-cone evolution. In acceleration form, write

$$
\dot{\mathbf V}_i=\mathbf A_i-\boldsymbol\xi_i,
\qquad \boldsymbol\xi_i\in N_B(\mathbf V_i),
\qquad \dot{\mathbf X}_i=\mathbf V_i,
\qquad B=\{\mathbf v:|\mathbf v|\le1\}.
$$

Here $N_B$ is the outward normal cone: zero inside the ball and nonnegative multiples of the outward unit normal on its boundary. This is the already selected ceiling response, not an added constitutive term. The ordinary acceleration is the same complete partner sum with $K=c_f=c_a=1$ and zero self contribution.

## A feasible approximate velocity with separately measured defects

Let $\mathbf x_i(t)$ be an approximate position path and $\mathbf w_i(t)\in B$ a feasible approximate velocity. They need not satisfy $\dot{\mathbf x}_i=\mathbf w_i$ exactly. Define the kinematic defect $\boldsymbol\rho_i^x=\dot{\mathbf x}_i-\mathbf w_i$. One possible construction from the retained cubic-Hermite position is $\mathbf w_i=\Pi_B(\dot{\mathbf x}_i)$, where $\Pi_B$ is Euclidean projection onto the closed ball. This keeps the approximate velocity feasible even when the interpolant slightly exceeds unit speed. It is locally absolutely continuous away from the prescribed kick, so its almost-everywhere derivative can be integrated. A merely almost-everywhere differentiable approximation without absolute continuity would not suffice.

Evaluate the unchanged ordinary row formula using the approximate position history and $\mathbf w_j$ at each approximate source time, giving $\mathbf a_i$. Choose a nonnegative diagnostic scalar $\lambda_i(t)$ and write the identity

$$
\boldsymbol\rho_i^v=\dot{\mathbf w}_i-\mathbf a_i+\lambda_i\mathbf w_i,
\qquad
q_i=\lambda_i|\mathbf w_i|(1-|\mathbf w_i|)\ge0.
$$

The scalar is only a residual decomposition; it does not enter the exact evolution. When the approximate velocity is exactly on the ceiling, a positive radial reaction may be removed without a complementarity penalty. When it lies inside the ball, the same bookkeeping incurs $q_i$. Thus a nearly capped numerical path cannot silently use a boundary reaction while claiming zero defect.

Let $\mathbf e_i^x=\mathbf X_i-\mathbf x_i$ and $\mathbf e_i^v=\mathbf V_i-\mathbf w_i$. Exact normal-cone monotonicity against the feasible point $\mathbf w_i$ gives $-\mathbf e_i^v\cdot\boldsymbol\xi_i\le0$. Also

$$
\lambda_i\mathbf e_i^v\cdot\mathbf w_i
\le\lambda_i(|\mathbf w_i|-|\mathbf w_i|^2)=q_i.
$$

Consequently

$$
\frac12\frac{d}{dt}|\mathbf e_i^v|^2
\le |\mathbf e_i^v|\bigl(|\mathbf A_i-\mathbf a_i|+|\boldsymbol\rho_i^v|\bigr)+q_i,
\qquad
\frac{d^+}{dt}|\mathbf e_i^x|\le|\mathbf e_i^v|+|\boldsymbol\rho_i^x|.
$$

These inequalities avoid differentiating the discontinuous pointwise ceiling response across its boundary. They require feasible approximate velocities, but permit the declared kinematic and complementarity defects. At finitely many jumps of the approximate velocity, add the jump magnitude to the velocity-error allowance; alternatively construct a continuous feasible approximation. An exact-solution velocity remains continuous under bounded ordinary input.

## A conditional partner-row Lipschitz estimate

Fix a reception time and one ordered channel. Let $S$ be its exact emission time and $\bar S$ its approximate emission time. Suppose both roots and the interval between them remain in a verified ordinary source bracket, with approximate causal-gap derivative

$$
1-\overline{\mathbf n}(s)\cdot\dot{\mathbf x}_j(s)\ge\gamma>0.
$$

This derivative uses the position derivative, not $\mathbf w_j$; the kinematic defect must therefore be included when checking it. Let a nondecreasing bound $E_x$ cover position errors at the receiver and every relevant source time, and $E_v$ cover velocity errors. Suppose $|\dot{\mathbf x}_j|\le L$ and $\mathbf w_j$ has Lipschitz constant $M$ on the source bracket. A true velocity jump at the time-zero kick requires an explicit jump modulus or a separately proved event treatment, not a finite $M$ spanning it. Splitting the source bracket alone does not ensure that the exact and approximate roots are on the same side.

At the exact source time, the approximate causal gap differs from zero by at most $2E_x$. The mean-value inequality then gives

$$
|S-\bar S|\le\frac{2E_x}{\gamma}=:\Delta_s.
$$

If both delayed ranges are at least $r>0$, their displacement-vector difference is at most $2E_x+L\Delta_s$. The elementary normalization inequality therefore yields

$$
|\mathbf n-\overline{\mathbf n}|\le\frac{2(2E_x+L\Delta_s)}r=:\Delta_n.
$$

The source-velocity difference is bounded by $E_v+M\Delta_s$. Since the exact source velocity has norm at most one, the transmitter-factor difference is at most $\Delta_n+E_v+M\Delta_s$. Suppose both exact and approximate transmitter factors are bounded below by $\delta>0$. For the original unit-weight row,

$$
|\mathbf A_{i\leftarrow j}-\mathbf a_{i\leftarrow j}|
\le\frac{\Delta_n}{r^2\delta}
+\frac{2\Delta_s}{r^3\delta}
+\frac{\Delta_n+E_v+M\Delta_s}{r^2\delta^2}.
$$

The three terms respectively control direction, inverse-square range and inverse transmitter factor. The polarity sign has absolute value one and does not change this upper bound. Summing the seven rows gives constants $L_x,L_v$ with $|\mathbf A_i-\mathbf a_i|\le L_xE_x+L_vE_v$, provided the bracket, range and factor hypotheses remain true throughout the proposed error region. Those hypotheses must be bootstrapped by interval bounds; the displayed estimate cannot assume the exact root margins that it is meant to certify.

## A scalar comparison problem and its proof obligations

With bounds $R_x,R_v,Q$ on the maximum kinematic defect, velocity residual and complementarity defect over the labels, a candidate comparison system is

$$
\dot E_x=E_v+R_x,
\qquad
\dot E_v=L_xE_x+L_vE_v+R_v+\frac{Q}{E_v},
\qquad E_v>0.
$$

Strictly positive initial allowances avoid division at zero. A zero-initial-energy formulation requires the maximal comparison solution or a justified limit from positive allowances: for $Z'=2\sqrt Z$, $Z(0)=0$, the solution $Z=0$ would fail to bound an error growing as $t$, whereas $Z=t^2$ would cover it. A comparison proof must preserve nondecreasing envelopes or otherwise retain maxima over all relevant delayed source times. Interval evaluation of the residuals and coefficients, ordinary-root bracket admission, initialization at the literal prescribed past and kick, and every source-kick crossing are independent obligations. Failing one of these inequalities invalidates this enclosure attempt, not the original trajectory or the tail theorem.

This route is useful only if its verified bounds reach the tail entry with $E_x\le0.1$ and $E_v+|\rho^x|\le0.001$ throughout the required source-history intervals. The latter converts error relative to the feasible projected velocity back to error relative to the stored Hermite derivative used by the tail certificate. The endpoint also requires $E_v(T_0)+|\mathbf w(T_0)-\mathbf U|\le0.001$. A floating residual sample or agreement of the two numerical evolutions does not establish those bounds. The independent review below checks the smooth-bracket argument. Its sampled scalar comparison exhausted the velocity budget by time 2.87; the [geometry-preserving successor](overnight-d-finite-geometry-enclosure.md) retains signed receiver matrices and delayed source-time errors to address that loss. Neither sampled comparison is a rigorous finite evolution enclosure.


## Source-kick and root-domain requirements

The independent review supplies a noncircular bracket test. For the approximate causal gap $\overline F(s)=|\mathbf x_i(t)-\mathbf x_j(s)|-(t-s)$ on a proposed bracket $[a,b]$, certify $\overline F(a)+2E_x<0$, $\overline F(b)-2E_x>0$, and $\overline F'\ge\gamma>0$. Geometric interval bounds must then verify common positive range and factor floors throughout the proposed error region. Feasibility of $\mathbf w$ does not imply that the approximate position path is capped, so a complete approximate root census is needed before calling its selected root sum the complete ordinary approximate sum. An alternative selected-root comparison must explicitly account for any omitted discrepancy in its residual.

If the approximate source velocity has jump magnitude $J_j$ at zero and is $M$-Lipschitz on each side, a valid modulus is

$$
|\mathbf V_j(S)-\mathbf w_j(\bar S)|\le E_v+M\Delta_s+J_j\mathbf 1_{\{|\bar S|\le\Delta_s\}}.
$$

The extra contribution to the row-error bound is $J_j\mathbf 1/(r^2\delta^2)$; it also belongs in the transmitter-floor bootstrap. Add its verified receiver sum as $R_{\mathrm{kick}}$ to the positive velocity-envelope equation. The indicator must be bounded over each whole reception interval. A sampled source time cannot exclude a kick straddle.

An error inequality does not itself prove existence across a source-velocity jump. A separate sufficient route is a verified finite set of transversal crossings with positive lower source-clock rate, fixed one-sided kernel values inherited from the preparation, and concatenated one-sided solutions. Positive transmitter factors alone do not guarantee transversality because the receiver factor can vanish at the ceiling. A frozen or grazing source clock at the kick needs an additional existence argument; no differential-inclusion selector or new event rule is authorized here. At the prescribed initial kick, initialize the exact post-kick trace or bound the difference between exact and approximate jumps, rather than applying only the positive-time approximate-jump rule.

The [independent review](overnight-d-finite-history-independent-review-2026-10-06.md) gives an explicit source-kick counterexample to a homogeneous smooth-bracket Lipschitz estimate and the zero-energy comparison counterexample. These delimit the finite-enclosure route, not the selected preparation's fate.
