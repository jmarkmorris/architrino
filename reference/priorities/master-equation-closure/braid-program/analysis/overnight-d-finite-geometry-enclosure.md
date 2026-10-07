# Geometry-preserving finite-history error comparison

## Question, scope, and current status

The selected eight-member release needs a bound on its finite evolution before the independently checked tail neighborhood can imply complete separation. The [first finite-history comparison](overnight-d-finite-history-error.md) takes absolute values before summing receiver contributions, assigns current errors to all delayed sources, and discards geometric cancellation. Its sampled scalar screen exhausted the velocity allowance near time 2.87. This successor retains signed receiver matrices, the actual source-time error bounds, and the dissipative part of the ceiling reaction. It is an error comparison about a time-dependent approximate path, with its residual retained; it is not a stability spectrum about an unproved equilibrium.

The mathematical statements below are derived conditional comparisons, checked by [independent reconstruction](overnight-d-finite-geometry-independent-review-2026-10-07.md). Their application requires bounds over a complete proposed error region. The [independent interval kick inventory](overnight-d-kick-crossing-independent-review-2026-10-07.md) supplies conditional front geometry, initialization, and jump bounds. The accompanying [floating instrument](overnight-d-finite-geometry-screen.py) tests whether the remaining comparison appears useful; it does not perform the full validation. The exact selected equation, original history, kick, and ceiling response are unchanged, with $K=c_f=c_a=1$, original partner weights and zero self acceleration. No candidate is promoted to actual escape by this work.

## Translating one receiver while holding a reference source path fixed

Fix a reception time $t$ and a channel from source $j$ to receiver $i$. Let $\mathbf x_j(s)$ be the reference position history and $\mathbf w_j(s)$ its feasible reference velocity, as defined in the first finite-history note. The reference position derivative $\mathbf v_j=\dot{\mathbf x}_j$ can differ from $\mathbf w_j$. On each smooth source branch, define $s=s(\mathbf p)$ by

$$
|\mathbf x_i(t)+\mathbf p-\mathbf x_j(s)|=t-s=\tau>0.
$$

The vector $\mathbf p$ translates the receiver for this auxiliary root evaluation. Also allow an independent addition $\mathbf z$ to the reference source velocity in the acceleration denominator. Set

$$
\mathbf n=\frac{\mathbf x_i(t)+\mathbf p-\mathbf x_j(s)}\tau,
\quad \mathbf W=\mathbf w_j(s)+\mathbf z,
\quad \gamma=1-\mathbf n\cdot\mathbf v_j(s),
\quad D=1-\mathbf n\cdot\mathbf W,
\quad f(\mathbf p,\mathbf z)=\frac{\sigma_{ij}\mathbf n}{\tau^2D}.
$$

These are comparison variables, not a modified dynamical law. Require a unique root on the selected branch and positive $\gamma,D,\tau$ throughout the translation and velocity-addition region. Differentiating the implicit causal equation gives

$$
\frac{\partial s}{\partial\mathbf p}=-\frac{\mathbf n^\top}\gamma,
\qquad
\frac{\partial\tau}{\partial\mathbf p}=\frac{\mathbf n^\top}\gamma,
\qquad
N:=\frac{\partial\mathbf n}{\partial\mathbf p}
=\frac{(I-\mathbf n\mathbf n^\top)(I+\mathbf v_j\mathbf n^\top/\gamma)}\tau.
$$

Write $\dot{\mathbf w}_j$ for the source-time derivative of the feasible reference velocity. Direct differentiation of the row yields the two matrices

$$
B:=\frac{\partial f}{\partial\mathbf p}
=\sigma_{ij}\left[
\frac{(I+\mathbf n\mathbf W^\top/D)N}{\tau^2D}
-\frac{2\mathbf n\mathbf n^\top}{\tau^3D\gamma}
-\frac{(\mathbf n\cdot\dot{\mathbf w}_j)\mathbf n\mathbf n^\top}{\tau^2D^2\gamma}
\right],
\qquad
C:=\frac{\partial f}{\partial\mathbf z}
=\frac{\sigma_{ij}\mathbf n\mathbf n^\top}{\tau^2D^2}.
$$

The three terms in $B$ account for direction, inverse-square range, and source-velocity change caused by movement of the emission time; its first term also includes the directional part of the transmitter-factor change. The distinction between $\gamma$, which uses the position derivative, and $D$, which uses the velocity entering the row, is essential.

Let $S$ be the exact source time and define errors $\mathbf e_i^x=\mathbf X_i-\mathbf x_i$, $\mathbf e_i^v=\mathbf V_i-\mathbf w_i$. Choose the fixed vectors

$$
\mathbf p=\mathbf e_i^x(t)-\mathbf e_j^x(S),
\qquad \mathbf z=\mathbf e_j^v(S).
$$

At this endpoint, $s(\mathbf p)=S$ by the exact causal equation and the assumed uniqueness, and $f(\mathbf p,\mathbf z)$ is the exact row. Integrating along $(\theta\mathbf p,\theta\mathbf z)$ gives the exact identity

$$
\mathbf A_{i\leftarrow j}-\mathbf a_{i\leftarrow j}
=\overline B_{ij}\,[\mathbf e_i^x(t)-\mathbf e_j^x(S)]
+\overline C_{ij}\,\mathbf e_j^v(S),
\quad
\overline B_{ij}=\int_0^1B(\theta\mathbf p,\theta\mathbf z)\,d\theta,
\quad
\overline C_{ij}=\int_0^1C(\theta\mathbf p,\theta\mathbf z)\,d\theta.
$$

No derivative of the unknown exact source acceleration is required: the root translation uses only the fixed reference source path. However, both roots and the connecting translations must stay on a smooth admitted branch. A translation crossing the time-zero velocity jump contributes an additional finite jump and cannot be covered by this smooth identity alone. At continuous reference segment boundaries, the derivative formula holds piecewise almost everywhere and integrates normally.

## Weighted member errors and the ceiling reaction

Choose a positive continuously differentiable scale $\alpha(t)$, defined at every accessible past source time as well as at reception times, with bounded reciprocal on the compact source intervals being used. Define

$$
Y_i(t)=\left(\alpha(t)^2|\mathbf e_i^x(t)|^2+|\mathbf e_i^v(t)|^2\right)^{1/2}.
$$

Thus $|\mathbf e_i^x|\le Y_i/\alpha$ and $|\mathbf e_i^v|\le Y_i$. Position and velocity errors need not be assigned unrelated worst cases. Let $\lambda_i\ge0$ and the residuals $\boldsymbol\rho_i^x,\boldsymbol\rho_i^v$ be those of the first note. Normal-cone feasibility gives $-\mathbf e_i^v\cdot\boldsymbol\xi_i\le0$. The elementary identity

$$
\lambda_i\mathbf e_i^v\cdot\mathbf w_i
=\frac{\lambda_i}{2}\left(|\mathbf V_i|^2-|\mathbf w_i|^2-|\mathbf e_i^v|^2\right)
\le -\frac{\lambda_i}{2}|\mathbf e_i^v|^2+Q_i,
\qquad Q_i=\frac{\lambda_i}{2}(1-|\mathbf w_i|^2)
$$

retains a dissipative term that the first comparison discarded. It remains valid inside the ball, where the nonnegative $Q_i$ pays for subtracting a radial reaction from the diagnostic residual. If $|\mathbf w_i|=1$, then $Q_i=0$ exactly; a floating norm rounded to one is insufficient to establish this equality.

Put $B_i=\sum_{j\ne i}\overline B_{ij}$ before taking any norm. Define

$$
M_i(t)=\begin{pmatrix}
(\alpha'/\alpha)I&\alpha I\\
B_i/\alpha&-(\lambda_i/2)I
\end{pmatrix},
\qquad
\mu_i(t)=\lambda_{\max}\!\left(\frac{M_i+M_i^\top}{2}\right),
\qquad
R_i=\left(\alpha^2|\boldsymbol\rho_i^x|^2+|\boldsymbol\rho_i^v|^2\right)^{1/2}.
$$

Here the largest eigenvalue is merely a bound on instantaneous growth of the error energy. It is not a stability verdict. The receiver matrices keep their polarity signs until after summation. The delayed source block is

$$
H_{ij}(t,S)=\left[-\frac{\overline B_{ij}}{\alpha(S)}\quad\overline C_{ij}\right].
$$

At positive $Y_i$, the exact energy inequality is

$$
D^+Y_i\le\mu_iY_i+\sum_{j\ne i}\|H_{ij}(t,S_{ij})\|_2Y_j(S_{ij})+R_i+Q_i/Y_i+J_i(t).
$$

The additional $J_i$ bounds source-kick branch discrepancies when present. It must be derived over the entire mismatch region, not assigned from a point sample. To construct an upper barrier $E_i>0$, take validated upper bounds for $\mu_i,R_i,Q_i$ and each delayed term over the admitted root brackets and error region. Replace each delayed product by its supremum over that bracket, using the saved past envelope $E_j(s)$. A first-contact proof then divides by $Y_i=E_i$, so the $Q_i/E_i$ term is legitimate at contact. Initial histories and all approximate velocity jumps must be covered. Errors at negative source times can be zero only when the exact prescribed past and the mathematical reference past coincide, including the representation of their parameters.

This comparison does not require $E_i$ to be nondecreasing. It instead retains the actual past bounds, including their possibly larger earlier values. Positive delayed ranges allow the usual interval-by-interval comparison. Root completeness, range/factor margins, local existence, and kick crossing treatment remain separate bootstrap hypotheses; small envelope values cannot be used to assume their own validity.

Two checks explain the gain. For an undelayed oscillator $B_i=-\omega^2I$, with $\alpha=\omega$ and $\lambda_i=0$, the symmetric part of $M_i$ is zero: pure rotation in the weighted error coordinates causes no artificial exponential growth. Taking $|B_i|$ first destroys this cancellation. For nearly free late motion a decreasing $\alpha$ can prevent a fixed position scale from imposing an unnecessary constant exponential bound. Changing scale is analysis only and does not alter a trajectory.

## A continuous reference and certified initialization

The mathematical rigid past evaluated from literal trigonometric parameters need not equal the stored binary64 first position exactly. A position discontinuity would invalidate the smooth reference construction. Let $\mathbf X_j^{\mathrm{rigid}}$ denote the exact prescribed past and $\mathbf X_j^{\mathrm{stored}}(0)$ the first retained position. Define

$$
\mathbf d_j=\mathbf X_j^{\mathrm{stored}}(0)-\mathbf X_j^{\mathrm{rigid}}(0),
\qquad
\mathbf x_j(s)=\mathbf X_j^{\mathrm{rigid}}(s)+\mathbf d_j\quad(s\le0),
$$

and retain the positive Hermite position unchanged. The two position traces now agree exactly. Negative velocities are unchanged, so the exact negative position error is the constant $-\mathbf d_j$ and the negative velocity error is zero. The right velocity error is the exact prescribed kicked velocity minus the stored initial velocity. This changes only the comparison reference; the physical preparation and its kick are untouched.

The independent interval inventory gives $|\mathbf d_j|<4\times10^{-12}$ and right-velocity representation error below $4\times10^{-13}$ for every member. With $\alpha=0.2$ on the prescribed past and at zero, the triangle inequality gives

$$
Y_j(s)<8\times10^{-13}\quad(s<0),
\qquad Y_j(0)<1.2\times10^{-12}.
$$

Therefore $E_j=2\times10^{-12}$ is a certified common initial and prescribed-past allowance. It establishes initialization only. Residuals involving negative sources must be evaluated on the shifted reference. The earlier floating screen used the unshifted past and a nominal $10^{-14}$ initial allowance; it cannot inherit this certificate retroactively. An exact-rational squared-norm check of all eight stored initial velocities also confirms that they lie strictly inside the unit ball, so their feasible projection does not change the right trace.

## Source-kick crossings and their contribution to the error comparison

The independent checker treats two distinct fronts. For the exact history, the source-zero front is centered at the analytic birth position $\mathbf X_j^{\mathrm{rigid}}(0)$. For the joined comparison history, it is centered at $\mathbf X_j^{\mathrm{stored}}(0)$. They differ by the certified shift; treating the centers as exactly equal would silently discard an initialization error.

Conditional on the proposed exact-history errors $\epsilon_x=0.1$, $\epsilon_v=0.001$ relative to the positive Hermite history, all 56 exact source-kick fronts have a unique transverse crossing. The interval inventory covers every prefix segment, not just sampled event times. Its global exact receiver-factor floor is $0.6113348677974948$ and both one-sided source-factor floors exceed $0.6199$. Thus a frozen or grazing source-zero clock is excluded within this tube. Continuation through these fronts uses the original fixed one-sided law, conditional on the remaining ordinary-root and finite-error bootstrap; overlapping event brackets do not certify a fixed ordering of different channels.

For the translation identity, at each fixed $t$ the source-zero front obeys

$$
|\mathbf x_i(t)+\theta\mathbf p-\mathbf X_j^{\mathrm{stored}}(0)|=t.
$$

For nonzero $\mathbf p$, its square is a quadratic in $\theta$, so there are at most two isolated crossings. Even endpoint source times on the same side can have two intervening crossings. Piecewise integration of the smooth derivative must therefore include every signed jump. At a front, $\tau=t$ and the shared direction gives

$$
\Delta f=\frac{\sigma_{ij}\mathbf n}{t^2}
\frac{\mathbf n\cdot[\mathbf w_j(0+)-\mathbf w_j(0-)]}{D^+D^-}.
$$

The added velocity $\theta\mathbf z$ cancels from the numerator. If $J_j$ bounds the reference velocity jump and $D^\pm\ge\delta^\pm>0$, the sum of the two possible jump norms is at most $2J_j/(t^2\delta^+\delta^-)$. Tangencies without a change of branch contribute no jump. A zero translation has no isolated translation crossings; isolated exact-front reception instants use the fixed one-sided convention and do not affect the integrated energy inequality.

The checker separately admits the larger comparison region $|\mathbf p|\le0.2$, $|\mathbf z|\le0.001$. Its global reference-front derivative floor is $\bar\kappa=0.6395380328398503$, and left/right factor floors exceed $0.5990$. These are comparison-front bounds, not an assertion that an arbitrary time-dependent translation has the exact receiver's clock derivative. If $|\mathbf p(t)|\le P\le0.2$ throughout a channel's certified front bracket, jumps are supported where $|t-|\mathbf x_i(t)-\mathbf X_j^{\mathrm{stored}}(0)||\le P$. This support has duration at most $2P/\bar\kappa$. With the channel's minimum bracket time $t_{\min}>0$,

$$
\int J_{ij}^{\mathrm{hom}}(t)\,dt
\le\frac{4J_jP}{\bar\kappa\,t_{\min}^2\delta^+\delta^-}.
$$

Here $J_{ij}^{\mathrm{hom}}$ is the nonnegative jump remainder in the translation identity. The reference derivative, factor floors, and jump sizes must be used channel by channel. At $P=0.2$, the interval receiver sums have maximum $7.69821865678055\times10^{-6}$. This is integrated forcing before subsequent amplification, not a final velocity-error bound. Smaller validated bounds for $|\mathbf e_i^x(t)|+|\mathbf e_j^x(S)|$ can be substituted for $P$ using the stored adaptive coefficients.

A safe pointwise implementation uses the certified two-jump coefficient on the whole enclosing bracket. Exploiting the smaller integrated bound requires a valid integral or event/slab comparison that covers every possible injection time. Injecting the total at the bracket's beginning and then allowing it to decay under a negative receiver growth bound can underestimate a later kick contribution. The full off-front homotopy roots and matrices remain to be certified; front admission does not establish them.

## Floating experiment and its limits

The instrument first passed the exact static-source tensors $B=\operatorname{diag}(-1/4,1/8,1/8)$ and $C=\operatorname{diag}(1/4,0,0)$ at range two; derivatives of an independently specified constant-velocity causal quadratic; and zero weighted logarithmic growth for the oscillator. The quadratic finite-difference discrepancies were $6.70\times10^{-12}$ for $B$ and $2.24\times10^{-11}$ for $C$. These are checks of implemented local derivatives, not interval bounds.

A sixteen-step pilot through time two took 0.0863 seconds by the instrument's monotonic clock. The bounded target used the retained seed-1 h4800 prefix, $\alpha=0.2$, 1,024 proposed steps through time 100, and an early stop at $\max E_i>0.01$. Its first sampled violation of the velocity allowance was at $t=45.99609375$, with $\max E_i=0.0010238837370674667$; the previous scalar sampled comparison first exceeded that allowance at $t=2.8675299569945354$. The new screen stopped at $t=55.17578125$, with $\max E_i=0.010006640947365497$, after 6.2154 seconds. It computes nominal matrices rather than error-region bounds, freezes midpoint coefficients per step, and omits $Q_i/E_i$ and kick mismatch. Therefore even this more favorable calculation fails before the earliest source cutoff needed by the tail certificate, approximately time 67. It is evidence that this particular norm comparison still needs improvement, not a lower bound on the exact error or proof that enclosure is impossible.

The exact command is:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight-d-finite-geometry-screen.py target --end 100 --steps 1024 --output b1-s1-finite-geometry-screen
```

The local JSON output is `.local-data/master-equation-closure/overnight-d/b1-s1-finite-geometry-screen.json`. It is local provenance, not a fresh-CI fixture. Initial $10^{-14}$ allowances in that screen are diagnostic values, not a validated representation-error bound. The separately completed source-kick certificate does not supply the remaining error-region matrix, defect, and envelope integrations required for actual finite-history admission.

A refinement to 2,048 proposed steps, saved as `b1-s1-finite-geometry-screen-refined.json`, first crossed the velocity threshold at $t=47.16796875$, with $\max E_i=0.0010001913094922592$, and stopped at $t=56.4453125$ after 14.2784 seconds. The change in threshold time shows the sampled screen's dependence on its grid. Both experiments remain below the earliest required tail source time when their allowances fail; neither is a converged or validated error bound. After the target runs, an additional analytic circular-source chain-rule control passed without changing target arithmetic: a receiver translation maintaining fixed direction has $\mathbf p'(s)=\mathbf v_j-\mathbf n$, giving a directly differentiable row that checks the source-acceleration term in $B$.

## Falsifiers and remaining work

The derivative claim is overturned by a smooth admitted source and translation direction violating the displayed implicit derivative or row chain rule. The energy claim is overturned by a feasible exact/reference pair violating the reaction identity or by a first-contact crossing despite all validated barrier hypotheses. Neither claim assumes a numerical reference solves the equation. An omitted source branch, failed homotopy margin, missing initial representation allowance, or unbounded kick mismatch invalidates the application.

The practical obstruction is now narrower: the sampled comparison with absolute norms of delayed source blocks still exhausts the allowance, even after receiver cancellation and past-error separation are restored. A comparison preserving coupled signed delayed variations, or a reference with independently bounded smaller defects, is the recommended next development. This is an inference from the specified diagnostic, not a proof that every version of the weighted comparison fails. Merely increasing the endpoint or promoting the nominal matrix screen would not address that obstruction. Tail admission also requires $E_i/\alpha\le0.1$ and $E_i+|\rho_i^x|\le0.001$ on every required old-source interval, with the separate endpoint-center condition from the first finite-history note.

The independent review reconstructed the root calculus and weighted energy proof without using the sampled target as evidence. Its accepted initialization and kick corrections have been incorporated above. The separate kick review preserves the exact arithmetic contract, controls, 56-channel inventories, input identities, process receipts, and falsifiers. A validated finite-history solution and actual escape remain unresolved.
