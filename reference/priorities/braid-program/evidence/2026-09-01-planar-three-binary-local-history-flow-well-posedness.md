# Planar Three-Binary T04 Local History-Flow Well-Posedness

## Disposition

**Status:** Derived local theorem accepted at its stated history-space scope.

**Closure goal:** Determine whether every complete retained history in a nonzero neighborhood of exact T04 selects one locally unique Master Equation future while the same complete simple-root chart remains active.

**Claim grade:** The theorem and its method-of-steps proof are **derived** from the canonical sharp simple-root Master Equation. The numerical margins below are **independently measured** by a high-precision circular-root instrument that does not import the JavaScript prescribed-path evaluator or the EOM solver. The packet establishes local existence, uniqueness, and continuous dependence for a declared retained-history function space. It does not establish a numerical perturbation radius, a one-cycle return, retention, or stability.

Plainly: a sufficiently close complete past now has one and only one short future on the unchanged ordinary-root chart. This says the nearby initial-history problem is mathematically well defined; it does not say nearby futures stay close for a whole turn.

## Exact T04 margins

Use normalized wake-speed units $c_f=1$. Let $ar{mathbf X}_i:[-H,0]\to\mathbb R^3$, $i=1,\ldots,6$, be the exact T04 circular retained history with

$$
H=1.1866509259048213597786822809197254921825571223936242037859209975941094859055343.
$$

The frozen source has $eta_f=2.974307176117293568\ldots$, radius $R=0.5617317000712902207\ldots$, angular velocity $\Omega=5.2948893141330990222\ldots$, alternating polarity, and the accepted $6\times6$ ordinary-root count matrix

$$
\begin{pmatrix}
1&3&3&3&1&1\\
1&1&3&3&3&1\\
1&1&1&3&3&3\\
3&1&1&1&3&3\\
3&3&1&1&1&3\\
3&3&3&1&1&1
\end{pmatrix},
$$

whose entries total $72$ directed positive-delay roots after excluding the coincident self root.

The independent 90-decimal calculation gives

$$
\Delta_{\min}=0.14790337898963239459\ldots,
\qquad
\Delta_{\max}=1.08630037709304617155\ldots,
$$

$$
r_{\min}=0.14790337898963239459\ldots,
\qquad
d_{\min}=\min |D_t|=0.11680602873629687474\ldots,
$$

and $H-\Delta_{\max}=0.10035054881177518822\ldots$. Here $\Delta$ is a positive causal delay, $r$ is receiver-to-emission-site separation, and

$$
D_t=1-\hat{\mathbf r}\mathbin{\cdot}\mathbf V_t(T_t)
$$

is the transmitter-side simple-root factor. The conservative open margins used below are

$$
\Delta_{\min}>0.1479,
\qquad
\Delta_{\max}<1.0864,
\qquad
r_{\min}>0.1479,
\qquad
d_{\min}>0.1168,
\qquad
H-\Delta_{\max}>0.1003.
$$

The exact equal-time minimum member separation is $0.56173170007129022074\ldots$, every member speed is $2.9743071761172935680\ldots$, and every exact centripetal acceleration magnitude is $15.748627283772851100\ldots$. These strict values allow the future tube to retain equal-time separation above $0.50$, speed between $2.5$ and $3.5$, and acceleration magnitude below $20$.

Plainly: at release, every admitted hit is separated from zero delay, coordinate collision, a root fold, and the old-history boundary by a positive amount. Because there are finitely many roots and the omitted parts of the compact root-search domain contain no zeros, all five margins survive in some open neighborhood of the exact history.

## Retained-history space

Let $\mathcal H=W^{2,\infty}([-H,0];(\mathbb R^3)^6)$ with the maximum over the six labeled members of the usual position, rate, and almost-everywhere acceleration norms. The labels, polarity word, coupling, and coincident-self-root exclusion are fixed. A history $\boldsymbol\eta\in\mathcal H$ supplies both initial position and initial rate at $T=0$ through its trace.

This choice includes the exact smooth circle and the accepted piecewise-cubic handoff: a globally $C^1$ piecewise cubic with finitely many segments has an essentially bounded second derivative. The theorem does not admit arbitrary continuous histories, position-only tubes, independently varied endpoint states, or histories with an unbounded velocity modulus.

Plainly: the neighborhood controls positions, rates, and how quickly rates can change along the stored past. That last control is what lets a moved causal root sample the transmitter rate without an uncontrolled jump.

## Local theorem

**Theorem.** There is an $\varepsilon_*>0$ such that every complete labeled history $\boldsymbol\eta\in\mathcal H$ satisfying

$$
\|\boldsymbol\eta-\bar{\mathbf X}\|_{W^{2,\infty}}<\varepsilon_*
$$

has one unique regular Master Equation continuation on $0\leq T\leq h_0$, where

$$
h_0=0.05.
$$

On this interval the continuation has exactly the same $72$ ordered root owners and per-channel root counts as T04, every root is simple, every emission time remains in the supplied past, and the solution depends locally Lipschitz-continuously on the supplied history in the position-rate norm. The exact T04 circle is the continuation selected by its exact retained history.

Plainly: $0.05$ is shorter than the preserved minimum causal delay. During this first step, every arriving wake was emitted before release, so the unknown future never has to serve as its own transmitter history.

## Proof

### 1. The complete root chart persists

For receiver $i$, transmitter $j$, reception time $T$, emission time $s<T$, receiver site $\mathbf x$, and retained transmitter history $\boldsymbol\eta_j$, define

$$
g_{ij}(T,s,\mathbf x;\boldsymbol\eta_j)
=
\|\mathbf x-\boldsymbol\eta_j(s)\|-(T-s).
$$

At every exact T04 positive-delay root, $\partial_s g_{ij}=D_t$ has magnitude greater than $0.1168$. Choose disjoint compact emission-time neighborhoods around the $72$ exact roots. For positive delays at least $0.10$, the compact complement contains no root and therefore has a strictly positive minimum of $|g_{ij}|$. Uniform continuity of $g_{ij}$ and $\partial_sg_{ij}$ in $T$, $\mathbf x$, and the $W^{1,\infty}$ history data supplies an open tube in which this complement remains root-free and the implicit-function theorem continues each exact root uniquely with the same owner and emission-time order.

Because the exact delays exceed $0.1479$, shrink the tube so every continued delay exceeds $0.10$. Because exact separations exceed $0.1479$ and $|D_t|$ exceeds $0.1168$, shrink it again so every continued separation exceeds $0.10$ and every continued $|D_t|$ exceeds $0.08$. The same compactness argument preserves maximum delay below the retained-history depth. The intersection of finitely many open conditions is open and contains exact T04, so it contains a ball of some radius $\varepsilon_*>0$.

Plainly: this is not a sampled-root assumption. Small changes cannot create an extra root on the root-free complement, and each existing root has one unique continuation because its slope never reaches zero.

The excluded coincident self root at delay zero needs a separate argument because $g_{ii}=0$ there. Restrict the future tube to member speeds at least $2.5$ and velocity time-Lipschitz constant at most $20$. For $0<\Delta\leq0.10$,

$$
\|\mathbf x_i(T)-\mathbf x_i(T-\Delta)\|
\geq
2.5\Delta-10\Delta^2
>
\Delta.
$$

Thus no positive-delay self root can enter between the excluded coincident root and the continued ordinary chart. The exact acceleration magnitude is below $15.75$; continuity of the complete finite acceleration sum lets the tube be chosen with acceleration magnitude below $20$, and the integrated operator then preserves the stated velocity time modulus.

For a cross-transmitter event with $0<\Delta\leq T\leq0.05$, equal-time member separation above $0.50$ and transmitter speed below $3.5$ give

$$
\|\mathbf x_i(T)-\mathbf x_j(T-\Delta)\|
\geq
0.50-3.5\Delta
\geq
0.325
>
\Delta.
$$

Hence no cross-transmitter root can use an emission time after release during the first step. Cross-transmitter roots with larger delay and all nontrivial self roots lie in the supplied past and are covered by the compact chart argument.

Plainly: the zero-delay self contact cannot spawn a hidden root inside the first step, and another member cannot cross a wake emitted after release quickly enough to create a new hit. Every admitted first-step hit therefore comes from the stored past.

### 2. The acceleration map is locally Lipschitz

For a continued root $s_{ij\ell}(T,\mathbf x;\boldsymbol\eta)$, the canonical per-hit acceleration contribution is

$$
\mathbf a_{ij\ell}
=
\kappa\sigma_{ij}|q_iq_j|
\frac{\hat{\mathbf r}_{ij\ell}}
{r_{ij\ell}^2|D_{t,ij\ell}|}.
$$

The continued-root map is locally Lipschitz because $|D_t|\geq0.08$. The direction and inverse-square factors are locally Lipschitz because $r\geq0.10$. Moving the root time changes the sampled transmitter rate by at most the common $W^{2,\infty}$ rate modulus. Hence every row is locally Lipschitz in $(T,\mathbf x,\boldsymbol\eta)$, uniformly on a sufficiently small closed tube. The finite sum over the fixed complete $72$-root census is locally Lipschitz as well.

The receiver rate does not multiply the instantaneous acceleration. It controls later receiver geometry and root playback, so it enters the first-order state through $\dot{\mathbf x}=\mathbf v$, not through an imported force or momentum law.

Plainly: positive separation controls the inverse-square term, the root-slope margin controls the emission time and acceleration weight, and the stored rate modulus controls what happens when that emission time moves.

### 3. One method-of-steps interval is unique

For $0\leq T\leq0.05$, the preceding near-zero exclusions and preserved ordinary-root delay floor $\Delta>0.10$ give

$$
s_{ij\ell}=T-\Delta_{ij\ell}<0.
$$

Thus all transmitters in the acceleration sum lie in the supplied retained history. For each receiver the unknown state satisfies the ordinary first-order system

$$
\dot{\mathbf x}_i=\mathbf v_i,
\qquad
\dot{\mathbf v}_i=\mathbf F_i(T,\mathbf x_i;\boldsymbol\eta),
$$

where $\mathbf F_i$ is continuous in $T$ and locally Lipschitz in $\mathbf x_i$. Picard--Lindelöf, equivalently a Banach contraction of the twice-integrated acceleration operator on a sufficiently small closed tube, gives one and only one solution on a nonzero interval. Uniform bounds on the closed tube allow that interval to be chosen as $[0,0.05]$ after $\varepsilon_*$ and the tube radius are reduced if necessary. Standard parameter dependence for the same contraction gives local Lipschitz dependence on $\boldsymbol\eta$.

The accepted exact circular-solution theorem shows that the exact T04 circle satisfies this initial-history problem. Uniqueness therefore identifies it as the only continuation of its exact retained past on the declared interval.

Plainly: the first short future is an ordinary initial-value problem driven by the stored past. The exact circle is not merely one candidate continuation; uniqueness rules out a second regular continuation from the same exact history inside the certified chart.

### 4. Continuation and exit conditions

After the first interval, append the unique solution to the retained history and repeat the same argument. The regular continuation extends while a common positive step exists and none of these first-exit conditions occurs:

1. two members collide at equal time or a receiver-to-emission-site separation reaches zero;
2. an admitted root reaches $D_t=0$ or otherwise leaves the simple-root chart;
3. a root is born, dies, changes owner or ordinal, or reaches the excluded coincident self boundary;
4. a required emission time reaches an uncovered retained-history boundary;
5. the velocity time modulus or the finite acceleration bound needed for the local Lipschitz estimate becomes unbounded; or
6. the solution leaves the declared position-rate tube.

These are continuation boundaries, not candidate fates. Reaching one makes this theorem inapplicable beyond that point; it does not by itself establish physical loss, retention failure, instability, or a valid caustic transition.

Plainly: the theorem keeps extending the unique future until the ordinary chart or its finite bounds actually fail. It does not reinterpret an instrumentation stop or a chart exit as physics.

## What this closes

- **Derived:** a nonzero $W^{2,\infty}$ retained-history neighborhood of exact T04 has a locally unique regular future.
- **Derived:** $h_0=0.05$ is an admissible common first-step target after choosing the neighborhood small enough to preserve delay greater than $0.10$.
- **Derived:** the same ordered $72$-root census persists throughout that first step.
- **Measured:** an independently implemented 90-decimal circular-root calculation reproduces the $72$ roots and the stated strict T04 margins.
- **Not established:** an explicit numerical value of $\varepsilon_*$, EOM-solver conformance, one-cycle reproduction, perturbation return, retention, stability, binding, particle identity, score, or scientific acceptance.

The local theorem satisfies the queue's well-posedness object because it gives a nonzero retained-history neighborhood, one common positive continuation interval, the active root chart, local Lipschitz dependence, and exact first-exit conditions. A numerical perturbation campaign must still compute a usable enclosed sub-ball and independently show that its serialized histories lie inside it.

Plainly: the mathematical ambiguity is closed at local scale, but the engineering and stability questions remain. A future numerical run cannot use “some open neighborhood exists” as its tolerance; it must certify the particular histories it actually supplies.

## Reproduction

Run the independent margin instrument with the shared project environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/equation-mapping/certify_planar_three_binary_local_history_margins.py
```

The instrument partitions each exact circular chord equation into analytic absolute-sine lobes, splits each lobe at its analytic peak, and bisects every sign-changing monotone segment at 90 decimal digits. It binds the frozen T04 source file by SHA-256 and fails unless all $72$ roots, the complete matrix, and the conservative open margins pass.

Two consecutive executions produced byte-identical standard output at SHA-256 `3096cf72a2cc4ed9ac1f50f1b83a7e422b16c4c769d847e8e92727eccbe98bfa`.

## Falsifiers

The theorem is overturned by two distinct regular continuations from the same admitted history on $[0,0.05]$ while all stated chart and function-space hypotheses hold; a missing or additional root inside the claimed tube; a root-slope, separation, delay, or history-boundary violation inside that tube; or a failure of the finite complete acceleration sum to be locally Lipschitz under the stated $W^{2,\infty}$ controls. A history outside the neighborhood or a first-exit event limits the theorem's scope rather than falsifying it.
