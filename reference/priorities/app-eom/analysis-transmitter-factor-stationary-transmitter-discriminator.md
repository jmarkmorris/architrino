# Static-Transmitter Receiver-Motion Discriminator

## Status

- Purpose: supply one independent discriminator between the transmitter-side and receiver-weighted acceleration factors
- Native input: one stationary transmitter, one moving receiver, one positive-delay simple root
- Independent anchor: the observer-level stationary-transmitter electrodynamics comparison already derived in [Stationary-Transmitter First-Order Receiver Analysis](archive/receiver-weighted-law/analysis-static-source-receiver-row.md)
- Standing: priority analysis and downstream recovery test; not an architrino-level premise
- Verdict: transmitter-side passes and receiver-weighted acceleration fails at first order in receiver radial velocity

## Finding in plain language

Hold the transmitter history, causal root, reception position, separation, polarity, and spatial kernel fixed. Change only the receiver's radial velocity at that same position.

The proposed transmitter-side acceleration does not change. The receiver-weighted acceleration changes linearly. The independent stationary-transmitter electrodynamics benchmark has no such first-order receiver-velocity term. This test therefore selects removal of the receiver multiplier at first order.

Claim classification: **derived native comparison plus observer-level recovery target**. This result does not prove the complete architrino-to-electrodynamics recovery.

## 1. Native test geometry

Let the transmitter remain at the origin and let the receiver event be

$$
\mathbf X_r(T_r)=R\hat{\mathbf e},
\qquad
\mathbf V_r(T_r)=\mathbf W,
\qquad
0<R<c_fh.
$$

There is one causal root,

$$
T_t=T_r-\frac{R}{c_f},
$$

with

$$
D_t=c_f,
\qquad
D_r=c_f-\hat{\mathbf e}\cdot\mathbf W.
$$

Define the normalized static acceleration

$$
\mathbf A_0(R)
=
\kappa\,\sigma_{tr}|q_tq_r|
\frac{\hat{\mathbf e}}{R^2}.
$$

## 2. Competing predictions

The proposed transmitter-side equation gives

$$
\boxed{
\mathbf A_{\mathrm{source}}(T_r)
=
\mathbf A_0(R)
}.
$$

The receiver-weighted equation gives, on the positive-$D_r$ chart,

$$
\boxed{
\mathbf A_{\mathrm{receiver}}(T_r)
=
\left(
1-
\frac{\hat{\mathbf e}\cdot\mathbf W}{c_f}
\right)
\mathbf A_0(R)
}.
$$

For two receiver states passing through the same position with radial velocities $\pm w\hat{\mathbf e}$ and the same transverse velocity,

$$
\mathbf A_{\mathrm{source}}(+w)
-
\mathbf A_{\mathrm{source}}(-w)
=
\mathbf0,
$$

whereas

$$
\mathbf A_{\mathrm{receiver}}(+w)
-
\mathbf A_{\mathrm{receiver}}(-w)
=
-2\frac{w}{c_f}\mathbf A_0(R).
$$

This is a clean discriminator because no source motion, root change, separation change, or regulator change accompanies the velocity reversal.

## 3. Independent recovery anchor

At observer level, the rest-frame interaction of a static electric source has a static radial electric contribution and no magnetic contribution. Receiver-velocity corrections to coordinate acceleration from relativistic inertia begin at second order in speed. Consequently the independently established recovery target has no term linear in receiver radial velocity.

The transmitter-side equation matches that first-order absence. The receiver-weighted equation predicts the forbidden term

$$
-\frac{\hat{\mathbf e}\cdot\mathbf W}{c_f}\mathbf A_0(R).
$$

This observer-level result is used only as a recovery constraint. It is not inserted into the native derivation of the transmitter-side factor.

Falsifier: an independently derived stationary-transmitter observer comparison containing the same universal first-order radial-velocity term while retaining the established static electric, Doppler, clock, and ruler limits.

## 4. Scope

This test decides the receiver-factor question at first order. It does not establish:

- the full second-order moving-transmitter and moving-receiver recovery;
- magnetic-like behavior of assemblies or the Noether sea;
- the causal recoil contribution required by the scalar action;
- coincident same-transmitter transition closure;
- conservation on general retained histories.

The action-derived scale-plus-recoil equation independently restores the moving-transmitter present-position result at first order, as shown in [Accounting-Term First Variation on the Uniform-Drift Chart](analysis-accounting-term-drift-chart.md). Its second-order and causal-recoil obligations remain open.

## 5. Disposition

The requirement for at least one independent discriminator is satisfied at first order by the static-transmitter receiver-motion test. It rejects the receiver multiplier and supports the transmitter-side base factor without importing the observer equation into the native derivation.

Promotion classification: **promote now within the priority proposal as an independent recovery discriminator; defer complete recovery**.
