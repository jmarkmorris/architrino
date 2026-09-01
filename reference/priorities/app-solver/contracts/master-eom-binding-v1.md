# Master EOM Binding v1

## Status

- Binding id: `master_eom_binding/v1`
- Stage: `implemented-and-validated`
- Sharp simple-root law: `transmitter-side-bound`
- Finite-width causal-surface law: `transmitter-side-bound`
- Signed root playback: `preserved`
- Ordinary transmitter-side folds: `finite-width-route-preserved`
- Coincident same-transmitter root birth: `fail-closed`
- Higher or undeclared singular strata: `fail-closed`
- Canonical document: [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md)
- Source snapshot SHA-256: `ccff8f702e9c2b3919a20186f05e804d11c7b829575850cae1b7844c3c963513`

The two `fail-closed` labels above are retained binding values. In current human-facing terminology, verification is incomplete for both unresolved singular-event classes and their disposition is not advanced.

## Scope

This binding defines the current acceleration multiplier, causal-root equation, retained-history obligation, signed root grading, root-completeness proof, and signed root-playback derivative.

The corrected physical statement is:

> A causal surface arriving now was emitted from the transmitter's retained past. Its instantaneous acceleration strength is set by transmitter-side surface density. Receiver velocity changes how the root is replayed and how later reception geometry evolves; it does not change the strength of the surface that has already arrived.

## Causal Root and Playback

For receiver $i$ at reception time $T_r$ and transmitter $j$ at emission time $T_t<T_r$, define

$$
\mathbf r_{ij}(T_r,T_t)=\mathbf X_i(T_r)-\mathbf X_j(T_t),
\qquad
g_{ij}(T_r,T_t)=\|\mathbf r_{ij}\|-c_f(T_r-T_t).
$$

At positive separation, let

$$
\hat{\mathbf r}_{ij}=\frac{\mathbf r_{ij}}{\|\mathbf r_{ij}\|},
$$

$$
D_{t,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_j(T_t),
\qquad
D_{r,ij}=c_f-\hat{\mathbf r}_{ij}\cdot\mathbf V_i(T_r).
$$

The simple-root playback derivative remains

$$
\boxed{
\frac{dT_t}{dT_r}=\frac{D_{r,ij}}{D_{t,ij}}
}.
$$

This signed ratio is root-transport data only. In particular, $D_r=0$ is a stationary point of the tracked emission time, not a silent acceleration branch.

## Sharp Transmitter-Side Acceleration

On a certified simple root with

$$
|D_{t,ij}|\ge\nu_t>0,
\qquad
r_{ij}\ge r_{\min}>0,
$$

the dimensionless acceleration weight is

$$
\boxed{
W_{ij}^{\mathrm{acc}}(T_r,T_t)=\frac{c_f}{|D_{t,ij}(T_r,T_t)|}
}.
$$

The per-root acceleration is

$$
\boxed{
\mathbf A_{ij}(T_r;T_t)
=
\kappa\,\sigma_{ij}|q_iq_j|
\frac{c_f}{r_{ij}^2|D_{t,ij}|}
\hat{\mathbf r}_{ij}
}.
$$

The total acceleration is the linear sum over every certified causal root in the retained history. Same-transmitter roots use the same equation; only the coincident endpoint is excluded, and its branch birth is not automatically accepted.

## Finite-Width Transmitter-Side Acceleration

With

$$
\delta_\eta(u)
=
\frac{1}{\sqrt{2\pi}\eta}
\exp\!\left(-\frac{u^2}{2\eta^2}\right),
\qquad
\mathbf K_{\epsilon_c}(\mathbf r)
=
\frac{\mathbf r}{(r^2+\epsilon_c^2)^{3/2}},
$$

the regulated law is

$$
\boxed{
\mathbf A_i^{(\eta,\epsilon_c)}(T_r)
=
\kappa\sum_j\sigma_{ij}|q_iq_j|
\int_{T_r-h}^{T_r}
c_f\,\mathbf K_{\epsilon_c}(\mathbf r_{ij}(T_r,T_t))
\delta_\eta(g_{ij}(T_r,T_t))\,dT_t
}.
$$

On a compact common domain of isolated complete roots, positive separation, and a positive transmitter-side floor, the sharp limit is

$$
\int c_f\,\mathbf K_0(\mathbf r_{ij})\delta(g_{ij})\,dT_t
=
\sum_{T_t\in\mathcal C_{ij}(T_r)}
\frac{c_f}{|D_{t,ij}|}
\frac{\hat{\mathbf r}_{ij}}{r_{ij}^2}.
$$

No receiver velocity appears in the finite-width integrand.

## Singular-Event Contract

The transmitter-side correction does not weaken any singular-event gate.

| Event | Required solver result |
| --- | --- |
| Ordinary interior transmitter-side fold with positive separation | Route through the existing certified finite-width regulator ladder and accept only a finite, regulator-stable impulse and position moment. |
| Receiver-side playback turn $D_r=0$, $D_t\ne0$ | Keep the root active, record signed playback through zero, and evaluate the ordinary transmitter-side acceleration. |
| Coincident same-transmitter root birth | Return `coincident_same_transmitter_birth_uncertified`; do not publish the candidate path segment. |
| Simultaneous transmitter-side-factor and core-kernel failure | Do not advance. |
| Cusp, higher stratum, persistent $D_t=0$, or regulator-dependent transition | Verification incomplete under the existing uncertified-event route. |
| Retained-history boundary contact | Return insufficient history; do not relabel it as a fold. |

The coincident same-transmitter rule is required by the exact quadratic control $\mathbf X(T)=\hat{\mathbf e}(c_fT+\alpha T^2/2)$. Its nontrivial self root satisfies $T_t=-T_r$, $r=2c_fT_r$, and $D_t=\alpha T_r$. The v1 acceleration therefore scales as $T_r^{-3}$, so its impulse diverges at birth. This is a derived falsifier of automatic endpoint continuation, not a numerical artifact.

## Machine Contract

The v1 sharp acceleration record carries:

- `transmitter_factor`: $D_t$;
- `receiver_factor`: $D_r$;
- `root_playback`: $D_r/D_t$;
- `acceleration_weight`: $c_f/|D_t|$.

The finite-width record sets root-local optional fields to null and consumes the constant $c_f$ multiplier in the integral. Pair acceleration certificates and reconstruction certificates use schema version `v1`.

## Independent Controls

Promotion requires all of the following:

1. Static transmitter: $D_t=c_f$, hence $W^{\mathrm{acc}}=1$ and the ordinary signed inverse-square result.
2. Receiver playback turn: $D_r=0$ with a static transmitter gives the same nonzero acceleration as a stationary receiver at the same event.
3. Receiver with $D_r<0$: acceleration is not clamped and remains independent of receiver velocity at fixed geometry.
4. Sharp/finite-width common-domain convergence using independently authored reference-kernel mathematics.
5. Exact coincident-birth asymptotic above, which must remain not advanced.

C++/Python parity checks implementations. It does not by itself prove the law; the stationary-transmitter and quadratic-history controls supply the independent analytic references.

## Non-Claims

This binding does not establish a finite accepted coincident same-transmitter transition, global same-transmitter continuation, or closed energy, momentum, and angular momentum. Those remain promotion gates for the wider wake-state and action program. They do not block the scoped receiver-factor correction because the v1 solver does not advance at the unresolved transition.
