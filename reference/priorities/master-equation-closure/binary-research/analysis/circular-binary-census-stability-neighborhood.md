# Circular-Binary Census-Stability Neighborhood

**Packet identifier:** `fsc_circular_binary_census_stability_neighborhood/v1` **Priority object:** FSC-013 **Status:** completed local geometry theorem **Claim grade:** derived for the declared normalized retained-history tube **Base chart:** [FSC-010 Circular-Binary All-Root Certificate](circular-binary-all-root-certificate.md)

This packet gives an explicit $W^{2,\infty}$ neighborhood of the equal-speed circular chart on which each ordered partner channel retains exactly one ordinary root, both self channels remain empty, and positive range, delay, $D_t$, and $D_r$ floors hold uniformly. It is a root-census theorem only. It does not prove a solution of the coupled delayed-history equation, continuation, capture, retention, or stability.

## Normalized base chart

Set $c_f=c_a=1$ and retain $K=\kappa|q_1q_2|>0$. Let $D$ be the unique root of

$$
D=\cos D,
$$

and define

$$
R_\ast
=
\frac{K}{4D(1+\sin D)},
\qquad
|\omega_\ast|=\frac1{R_\ast},
\qquad
\Delta_\ast=2R_\ast D.
$$

The two base histories are

$$
\mathbf X_1^\ast(T)=R_\ast\mathbf e_r(T),
\qquad
\mathbf X_2^\ast(T)=-R_\ast\mathbf e_r(T),
$$

with their corresponding velocities and accelerations. Fix any compact reception interval $I=[T_0,T_1]$. The comparison tube must cover

$$
I^-=[T_0-3R_\ast D,T_1],
$$

while the candidate histories remain all-past and ceiling-admissible outside that tube. The extra lookback covers the explicit partner-root bracket below; root monotonicity excludes any earlier partner root without requiring the candidate to remain close to the circle in the remote past.

Plainly: the proof needs a little more than one partner delay of nearby history. Earlier history can be arbitrary within the speed ceiling because a negative gap at the back of the bracket prevents any older root.

## Dimensionless history norm

For two candidate paths $\mathbf X_i\in W^{2,\infty}_{\mathrm{loc}}$ with velocities $\mathbf V_i$ and almost-everywhere accelerations $\mathbf A_i$, define

$$
\|\mathfrak h-\mathfrak c\|_{\ast,I^-}
=
\max_{i\in\{1,2\}}
\max\left\{
\frac{\|\mathbf X_i-\mathbf X_i^\ast\|_{L^\infty(I^-)}}{R_\ast},
\|\mathbf V_i-\mathbf V_i^\ast\|_{L^\infty(I^-)},
R_\ast\|\mathbf A_i-\mathbf A_i^\ast\|_{L^\infty(I^-)}
\right\}.
$$

The candidate tube is the intersection of this norm ball with the ceiling-admissible class

$$
\|\mathbf V_i(T)\|\le1
$$

for all retained times. This restriction matters: a generic open norm ball centered on a boundary-speed history also contains inadmissible super-ceiling paths.

Plainly: positions, velocities, and accelerations are compared in units set by the exact radius. The neighborhood includes only histories that already obey the proposed speed domain.

## Explicit constants

Put

$$
c_\circ=\cos\!\left(\frac{3D}{2}\right),
$$

$$
q_-=2\cos\!\left(\frac D2\right)-D,
\qquad
q_+=3D-2\cos\!\left(\frac{3D}{2}\right),
$$

and

$$
d_\circ=1+\sin\!\left(\frac D2\right).
$$

All four constants are positive. Define

$$
\boxed{
\rho_0
=
\min\left\{
\frac{q_-}{4},
\frac{q_+}{4},
\frac{c_\circ}{2},
\frac{d_\circ}{2(1+4/c_\circ)},
\frac12
\right\}.
}
$$

Direct evaluation from the exact Dottie root gives the diagnostic values

| Quantity | Normalized value |
| --- | ---: |
| $D$ | $0.7390851332151607$ |
| $c_\circ$ | $0.44589026512609264$ |
| $q_-$ | $1.1259001928478412$ |
| $q_+$ | $1.3254748693932965$ |
| $d_\circ$ | $1.3611889164861233$ |
| $\rho_0$ | $0.06825864457559688$ |

The symbolic definition of $\rho_0$, not these rounded values, controls the theorem.

Plainly: every entry in the radius is a safety margin for one failure mode: losing the front or back root sign, approaching zero range, losing a root-factor floor, or flattening into a straight self-characteristic segment.

## Theorem

Let $0<\rho\le\rho_0$, and let an all-past two-label candidate history satisfy

$$
\|\mathfrak h-\mathfrak c\|_{\ast,I^-}\le\rho
$$

and the ceiling-admissibility condition. Then, for every reception time $T\in I$:

1. each ordered partner channel has exactly one positive-delay ordinary root;
2. its delay lies in

   $$
   R_\ast D
   \le
   \tau_{i\leftarrow j}(T)
   \le
   3R_\ast D;
   $$

3. its received range obeys

   $$
   r_{i\leftarrow j}(T)
   \ge
   R_\ast c_\circ;
   $$

4. both root factors obey

   $$
   D_{t,i\leftarrow j}(T),
   D_{r,i\leftarrow j}(T)
   \ge
   \frac{d_\circ}{2};
   $$

5. the partner-root displacement from the base delay satisfies

   $$
   |\tau_{i\leftarrow j}(T)-\Delta_\ast|
   \le
   \frac{2\rho R_\ast}{d_\circ/2};
   $$

6. neither same-transmitter channel has a positive-delay root; and
7. the equal-time partner separation stays at least $2R_\ast(1-\rho)>0$.

The root branch is therefore uniformly simple and its received-history clock is locally increasing throughout $I$.

### Proof: partner-root existence and uniqueness

For a fixed reception time, use lookback $\tau=T-S>0$ and define the partner causal gap

$$
h_{i\leftarrow j}(T,\tau)
=
\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|-\tau.
$$

On the base circle and on the bracket

$$
\tau_-=R_\ast D,
\qquad
\tau_+=3R_\ast D,
$$

the cosine stays positive and

$$
h^\ast(\tau_-)=R_\ast q_->0,
\qquad
h^\ast(\tau_+)=-R_\ast q_+<0.
$$

The two endpoint positions in a causal gap move by at most $\rho R_\ast$ each, so

$$
|h-h^\ast|\le2\rho R_\ast.
$$

The first two clauses in $\rho_0$ preserve the two signs with at least half their base margins. Continuity gives a root inside the bracket.

For any ceiling-admissible transmitter, $h(T,\tau)$ is nonincreasing in $\tau$ by the reverse triangle inequality. Its zero set is therefore connected. The positive root-factor floor proved next rules out a zero interval, so the bracket contains the unique partner root. Monotonicity and the endpoint signs also exclude roots outside the bracket.

Plainly: the causal gap is positive before the known delay and negative after it. Nearby paths preserve those signs, while the speed ceiling prevents the gap from turning back and producing another separated root.

### Proof: range and root-factor floors

Across the base bracket, the partner range is at least

$$
2R_\ast c_\circ.
$$

The third clause in $\rho_0$ therefore gives the candidate range floor $R_\ast c_\circ$. For nonzero vectors $\mathbf a,\mathbf b$,

$$
\left\|
\frac{\mathbf a}{\|\mathbf a\|}
-
\frac{\mathbf b}{\|\mathbf b\|}
\right\|
\le
\frac{2\|\mathbf a-\mathbf b\|}
{\min(\|\mathbf a\|,\|\mathbf b\|)}.
$$

Thus the received-direction perturbation throughout the bracket is bounded by

$$
\|\hat{\mathbf r}-\hat{\mathbf r}^{\ast}\|
\le
\frac{4\rho}{c_\circ}.
$$

On the base bracket,

$$
D_t^\ast=D_r^\ast=1+\sin\!\left(\frac{\tau}{2R_\ast}\right)
\ge d_\circ.
$$

Using the velocity error bound and $\|\mathbf V_i^\ast\|=1$ gives

$$
|D_t-D_t^\ast|,
|D_r-D_r^\ast|
\le
\rho\left(1+\frac4{c_\circ}\right).
$$

The fourth clause in $\rho_0$ proves both $d_\circ/2$ floors. Since $\partial_\tau h=-D_t$, the same floor and $|h(T,\Delta_\ast)|\le2\rho R_\ast$ give the stated root-displacement bound by the mean-value theorem.

Plainly: the nearby received chord stays away from zero length, so its direction cannot swing too far. Combining that direction bound with the velocity bound keeps both emission-side and reception-side root slopes safely positive.

### Proof: structural self-root exclusion

For one ceiling-admissible path and any $S<T$,

$$
\|\mathbf X_i(T)-\mathbf X_i(S)\|
\le
T-S.
$$

Equality requires the velocity to equal one fixed unit vector almost everywhere on $[S,T]$. It therefore requires zero acceleration almost everywhere on that interval. The base circle has

$$
\|\mathbf A_i^\ast\|=\frac1{R_\ast}.
$$

The scaled acceleration term in the neighborhood and $\rho\le1/2$ give

$$
\|\mathbf A_i(T)\|
\ge
\frac{1-\rho}{R_\ast}
>0
$$

almost everywhere on the comparison tube. Every positive-delay interval ending at a reception time in $I$ contains a nondegenerate final subinterval in that tube, so equality is impossible. The self causal gap is strictly negative for every positive delay, and both self channels are empty.

This stronger exclusion deliberately removes the straight ceiling-speed characteristic interval from the neighborhood. Outside the acceleration tube, ceiling geometry still permits that separately classified nonordinary self family; it never becomes an ordinary isolated self root.

Plainly: a self wake can match a path only when that path runs perfectly straight at wake speed for the whole interval. Every history in this neighborhood keeps definite curvature, so that equality cannot occur.

### Proof: collision floor and clock direction

At equal time the base labels are separated by $2R_\ast$. The two position perturbations reduce that distance by at most $2\rho R_\ast$, proving the collision floor. Finally, the implicit root derivative is

$$
\frac{dS}{dT}=\frac{D_r}{D_t}>0,
$$

so each partner clock advances on one regular branch throughout the declared interval.

## Exact reach and falsifiers

This theorem is falsified by any candidate inside the declared norm tube that has a missing or additional partner root, a positive-delay self root, a range, delay, $D_t$, or $D_r$ value outside the displayed floors, or an equal-time collision. The numerical value of $\rho_0$ is sufficient, not optimal; a larger valid neighborhood would strengthen the result without falsifying it.

The theorem supplies the geometric FSC-013 prerequisite for FSC-011. FSC-011 still needs the history-to-ledger Lipschitz estimate and coupled contraction in a declared solution space. A stable root census is not a solution theorem and is not a perturbation-stability verdict.

Plainly: the wake bookkeeping is now guaranteed not to change inside one explicit tube around the circle. The next step is to prove that the ledger varies tamely enough with those histories to construct a unique short-time evolution.

Closure goal: combine this fixed-census tube with a separately proved history-to-ledger Lipschitz bound and the normal-cone response contraction, stopping exactly at the first range, root-factor, curvature, or tube-boundary failure.
