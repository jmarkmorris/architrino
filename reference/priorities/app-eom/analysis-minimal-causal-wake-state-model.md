# Minimal Causal Wake-State Model

## Status

- Purpose: replace the future-reception part of the current two-time action with an initial-value wake state
- Scope: one scalar wake variable, its conjugate time state, a finite causal width, and an optional spatial core
- Standing: priority candidate and no-go analysis; not canon and not an EOM solver specification
- Result: the model closes causality and supplies explicit conserved accounts, but one scalar wake variable cannot simultaneously give the required polarity rule and a positive wake energy

## Finding in plain language

The smallest local replacement for the action's future dependence stores the wake itself as part of the present state. Two scalar functions are sufficient for an initial-value problem: the wake amplitude now and its time derivative now. Their evolution carries past emissions forward at speed $c_f$, so acceleration at time $T$ uses the wake state already present at $T$ rather than asking where a receiver will be later.

This construction reproduces both pieces of the spatial derivative of the existing scalar kernel. The inverse-square piece is the proposed source-density acceleration. The second piece comes from moving the causal surface when the receiver position varies; this is the contribution called recoil in the action analyses.

The construction also exposes a decisive failure. With positive wake energy, a single scalar wake makes like polarities attract. Reversing the scalar sign makes like polarities repel, as required, but makes the wake energy unbounded below. The one-scalar model is therefore the smallest formal causal replacement, not a promotable physical completion.

Claim classification: **derived candidate equations and derived one-scalar sign obstruction**. Treating the scalar wake as substrate ontology or as the promoted Master Equation would be a new theory decision not supported here.

## 1. Present wake state

Let

$$
\phi(\mathbf x,T)
$$

be a scalar representation of the causal-wake record on the Euclidean-void leaf at absolute time $T$. Define its time state

$$
\chi(\mathbf x,T)
=
\partial_T\phi(\mathbf x,T).
$$

The pair

$$
\boxed{
\Psi_T=(\phi(\cdot,T),\chi(\cdot,T))
}
$$

is minimal for a second-order propagation equation: specifying $\phi$ alone does not determine whether a wake profile is moving outward or inward, while $(\phi,\chi)$ does.

For a smooth normalized spatial profile $b_{\epsilon_c}$, define the polarity source density

$$
\rho_q^{(\epsilon_c)}(\mathbf x,T)
=
\sum_j q_j
b_{\epsilon_c}(\mathbf x-\mathbf X_j(T)).
$$

The candidate first-order wake update is

$$
\boxed{
\partial_T\phi=\chi,
\qquad
\partial_T\chi
=
c_f^2\nabla^2\phi
+
\frac{g c_f^2}{\lambda}
\rho_q^{(\epsilon_c)}
}.
$$

Initial data $(\phi,\chi)$ on one absolute-time leaf determine the later wake state. No future particle position is an input.

This equation is a candidate native transport law selected by Euclidean translation and rotation symmetry, linear superposition, a single propagation speed $c_f$, and the request for the smallest local scalar state. Those requirements do not prove that nature uses this state.

## 2. Local action and particle update

The smallest local action producing the wake update is

$$
\begin{aligned}
S_{\mathrm{cand}}
=
\int dT\bigg[
&\sum_i\frac{\mu_{\mathrm{arch}}}{2}
\|\mathbf V_i\|^2\\
&+
\frac{\lambda}{2}
\int_{\mathbb R^3}
\left(
\frac{\chi^2}{c_f^2}
-
\|\nabla\phi\|^2
\right)d^3x\\
&+
g\int_{\mathbb R^3}
\rho_q^{(\epsilon_c)}\phi\,d^3x
\bigg].
\end{aligned}
$$

Here $\mu_{\mathrm{arch}}$ is the universal quadratic-response conversion already used by the action scaffold. It is not an intrinsic architrino mass.

Variation gives the wake equation above and the particle acceleration

$$
\boxed{
\mu_{\mathrm{arch}}\mathbf A_i(T)
=
gq_i
\nabla\bar\phi_{\epsilon_c}(\mathbf X_i(T),T)
},
$$

where $\bar\phi_{\epsilon_c}$ denotes convolution with the same spatial profile used for emission. The update is causal because $\phi$ and $\chi$ are present state variables.

Claim classification: **derived from the displayed candidate action**. A variation that requires a future particle event would falsify the initial-value claim.

## 3. Retarded solution and the origin of recoil

Choose initial data with no undeclared incoming wake content. The causal solution can be written schematically as

$$
\phi(\mathbf x,T)
=
\frac{g c_f}{4\pi\lambda}
\sum_jq_j
\int_{-\infty}^{T}
\frac{
\delta_\eta\!\left(
r_j(\mathbf x,S)-c_f(T-S)
\right)
}{R_{\epsilon_c}(r_j)}
\,dS,
$$

with

$$
r_j(\mathbf x,S)
=
\|\mathbf x-\mathbf X_j(S)\|,
\qquad
R_{\epsilon_c}(r)
=
\sqrt{r^2+\epsilon_c^2}.
$$

The exact spatial derivative contains two terms:

$$
\nabla_{\mathbf x}
\left(
\frac{\delta_\eta(g)}{R_{\epsilon_c}}
\right)
=
\hat{\mathbf r}
\left[
\frac{\delta_\eta'(g)}{R_{\epsilon_c}}
-
\frac{r\,\delta_\eta(g)}{R_{\epsilon_c}^3}
\right].
$$

Therefore the causal wake acceleration contains

$$
\boxed{
\mathbf A_i
=
\mathbf A_{\mathrm{scale},i}
+
\mathbf A_{\mathrm{recoil},i}
},
$$

where the scale part is proportional to

$$
\hat{\mathbf r}
\frac{r\,\delta_\eta(g)}{R_{\epsilon_c}^3}
$$

and the recoil part is proportional to

$$
-\hat{\mathbf r}
\frac{\delta_\eta'(g)}{R_{\epsilon_c}}.
$$

Plain language: the scale part is the change in the inverse-distance amplitude when the receiver moves spatially. Recoil is the additional change caused because moving the receiver also moves the causal-surface argument $g$. It is a derivative of the hit condition, not receiver playback multiplied onto the base acceleration.

Unlike the direct two-time action, both terms above use a wake state propagated from earlier data. The future-reception variation has been replaced by wake degrees of freedom that exist now.

## 4. Conserved accounts

On a domain whose boundary flux vanishes or is recorded explicitly, time translation, spatial translation, and rotation of the local action give the following totals.

Energy:

$$
\boxed{
E_{\mathrm{tot}}
=
\sum_i
\frac{\mu_{\mathrm{arch}}}{2}
\|\mathbf V_i\|^2
+
\frac{\lambda}{2}
\int
\left(
\frac{\chi^2}{c_f^2}
+
\|\nabla\phi\|^2
\right)d^3x
-
g\int\rho_q^{(\epsilon_c)}\phi\,d^3x
}.
$$

Momentum:

$$
\boxed{
\mathbf P_{\mathrm{tot}}
=
\sum_i\mu_{\mathrm{arch}}\mathbf V_i
-
\frac{\lambda}{c_f^2}
\int\chi\nabla\phi\,d^3x
}.
$$

Angular momentum:

$$
\boxed{
\mathbf J_{\mathrm{tot}}
=
\sum_i
\mathbf X_i\times
\mu_{\mathrm{arch}}\mathbf V_i
-
\frac{\lambda}{c_f^2}
\int
\mathbf x\times(\chi\nabla\phi)
\,d^3x
}.
$$

These are not accounts defined after a trajectory to cancel its residual. They are fixed before evolution by one local action. Direct differentiation with the candidate equations leaves only declared boundary flux.

Claim classification: **derived for the candidate local action and its quadratic response scaffold**. A non-boundary residual in any of the three derivatives would falsify the conservation claim.

## 5. One-scalar polarity and energy obstruction

Consider a stationary positive source. The static wake equation gives

$$
-\nabla^2\phi
=
\frac{g}{\lambda}\rho_q.
$$

Its exterior solution has

$$
\phi_j(r)
=
\frac{gq_j}{4\pi\lambda r}.
$$

The receiver acceleration is therefore

$$
\boxed{
\mathbf A_{i\leftarrow j}
=
-\frac{g^2}{4\pi\mu_{\mathrm{arch}}\lambda}
q_iq_j
\frac{\hat{\mathbf r}}{r^2}
}.
$$

The required polarity rule has like polarities accelerate apart, so its coefficient of $q_iq_j\hat{\mathbf r}$ must be positive. With positive $\mu_{\mathrm{arch}}$ and real $g$, that requires

$$
\lambda<0.
$$

But the free wake energy is

$$
E_{\mathrm{wake,free}}
=
\frac{\lambda}{2}
\int
\left(
\frac{\chi^2}{c_f^2}
+
\|\nabla\phi\|^2
\right)d^3x.
$$

For $\lambda<0$, arbitrarily large wake amplitudes drive this energy to negative infinity. If $\lambda>0$, wake energy is positive but the polarity rule reverses.

Thus:

$$
\boxed{
\text{one real scalar wake}
\quad\Longrightarrow\quad
\text{required polarity or positive wake energy, but not both}
}.
$$

This is the smallest-model no-go theorem. Avoiding it requires additional constrained or vector-like wake structure, a nonquadratic stable state with a derived polarity coupling, or a different causal conservation principle. Importing an observer-level electromagnetic field action would not count as a native derivation.

### 5.1 Positive-energy multi-scalar extension also fails

Adding ordinary scalar wake variables does not remove the sign obstruction. Let $\boldsymbol\phi$ be any finite real scalar collection with positive-definite free-state matrix $\mathbf L$ and real polarity-coupling vector $\mathbf g$:

$$
E_{\mathrm{wake,free}}
=
\frac12
\int
\left[
\frac{1}{c_f^2}
(\partial_T\boldsymbol\phi)^\mathsf T
\mathbf L
(\partial_T\boldsymbol\phi)
+
(\nabla\boldsymbol\phi)^\mathsf T
\mathbf L
(\nabla\boldsymbol\phi)
\right]d^3x.
$$

The static pair coefficient obtained after solving the linear scalar state is proportional to

$$
-q_iq_j
\mathbf g^\mathsf T
\mathbf L^{-1}
\mathbf g.
$$

Positive definiteness gives

$$
\mathbf g^\mathsf T
\mathbf L^{-1}
\mathbf g>0
$$

for every nonzero coupling. The like-polarity coefficient is therefore still attractive.

More generally, let the coupling vector depend on the polarity label. Two objects with the same polarity use the same real vector $\mathbf g(q)$, so their coefficient is

$$
-\mathbf g(q)^\mathsf T
\mathbf L^{-1}
\mathbf g(q)<0.
$$

Thus no finite collection of linearly coupled, positive-energy real scalar wake variables can produce like-polarity repulsion.

Claim classification: **derived multi-scalar no-go theorem**. A positive-definite scalar-state matrix and real coupling whose same-polarity static coefficient is positive would falsify it.

The next admissible theory target must therefore contain at least one ingredient outside this class: a constrained non-scalar state, a stable nonlinear state whose linear static reduction is not a positive-definite scalar exchange, a non-factorized causal interaction record, or an independently derived conservation construction that does not mediate the polarity rule through scalar wake exchange.

## 6. Coincident same-source asymptotic

On the smooth same-source crossing chart

$$
u(T_0)=c_f,
\qquad
\dot u(T_0)=\alpha>0,
\qquad
t=T-T_0>0,
$$

the newborn root has

$$
\tau_*(t)=2t+O(t^2),
\qquad
r_*(t)=2c_ft+O(t^2),
\qquad
D_t=\alpha t+O(t^2).
$$

The sharp scale contribution behaves as

$$
\mathbf A_{\mathrm{scale,new}}(t)
=
O(t^{-3})\hat{\mathbf e},
$$

while the sharp causal-surface derivative behaves as

$$
\boxed{
\mathbf A_{\mathrm{recoil,new}}(t)
=
O(t^{-4})\hat{\mathbf e}
}.
$$

The leading incoming sharp terms have the same forward direction on the no-reversal chart. The scalar wake state therefore does not create a sharp cancellation.

For fixed positive $\eta$ and $\epsilon_c$, both finite-width integrals are bounded on a compact local history cell. Their regulator-removal limits do not commute. In particular, the leading recoil impulse assigned only to the newborn triangular cell $\tau\ge t$ is proportional to

$$
\mathcal D_\varphi(\rho)
=
-\int_0^\infty\int_z^\infty
\frac{
\varphi'\!\left(y(z-y/2)\right)
}{\sqrt{y^2+\rho^2}}
\,dy\,dz,
$$

where

$$
\rho
=
\frac{\epsilon_c}{c_f}
\sqrt{\frac{\alpha}{\eta}}.
$$

Swapping the integration order gives

$$
\mathcal D_\varphi(\rho)
=
-\int_0^\infty
\frac{
\varphi(y^2/2)-\varphi(-y^2/2)
}{y\sqrt{y^2+\rho^2}}
\,dy.
$$

For an even profile such as the Gaussian,

$$
\boxed{
\mathcal D_\varphi(\rho)=0
}.
$$

This cancellation concerns only the leading finite-width recoil impulse on that diagnostic partition. It does not cancel the positive scale impulse, and it does not include the complementary endpoint layer $0<\tau<t$. The unpartitioned endpoint layer retains explicit dependence on the local time window and the two regulators. Consequently there is no regulator-independent complete-transition limit established by this model.

Claim classification: **derived sharp asymptotic and derived even-profile cancellation on the stated finite-width partition**. A complete finite-width cancellation remains unproved and is constrained by the positive scale divergence already derived independently.

## 7. Promotion disposition

The candidate accomplishes four things:

1. it replaces future-reception dependence with a present initial-value state;
2. it derives scale and recoil from one causal spatial derivative;
3. it supplies non-circular energy, momentum, and angular-momentum totals;
4. it makes the coincident sharp failure explicit.

It fails two promotion requirements:

1. one scalar wake cannot satisfy both the polarity rule and positive wake energy;
2. the coincident same-source transition still lacks a finite regulator-independent limit.

Promotion classification: **priority-only candidate; causal-state existence passes formally, physical promotion fails on polarity/energy stability and coincident birth**.
