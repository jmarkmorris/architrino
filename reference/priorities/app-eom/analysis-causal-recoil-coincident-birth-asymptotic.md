# Causal-Recoil Asymptotic at Coincident Same-Source Birth

## Status

- Purpose: test whether the existing scalar-action recoil contribution can cancel the source-density coincident-birth divergence
- Scope: incoming receiver-side recoil on the local smooth accelerating same-source chart
- Standing: priority analysis; not a complete causal recoil theorem
- Result: the incoming recoil has the same sign and a stronger sharp divergence; the time-transposed companion is advanced on this chart

## Finding in plain language

The current recoil calculation does not repair the coincident same-source birth by simple addition. Just after a smooth crossing above field speed, the incoming recoil from the newborn self root points forward, like the scale acceleration, and grows approximately as $(T-T_0)^{-4}$. The scale acceleration grows as $(T-T_0)^{-3}$.

The time-transposed part of the two-time action belongs on the pre-crossing emission event whose wake will be received later. That is an advanced contribution from the viewpoint of a past-history evolution law. A causal recoil theorem must therefore do more than reuse the existing time-symmetric Euler term: it must derive a past-history state that reproduces the conservation transfer without requiring the future self-reception.

Claim classification: **derived local sharp asymptotic for the incoming recoil; inferred obstruction for a future causal completion**.

## 1. Recoil coefficient

On an interior positive-source-normal simple root, the sharp receiver-side recoil coefficient derived from the residual action kernel is

$$
\mathbf C_C^{(0)}
=
\frac{1}{c_fJ}
\frac{\partial}{\partial T_t}
\left(
\frac{\hat{\mathbf r}}{rJ}
\right),
\qquad
J=\frac{D_t}{c_f}.
$$

This identity is the pre-expansion formula used by [Accounting-Term First Variation on the Uniform-Drift Chart](analysis-accounting-term-drift-chart.md). It remains valid before specializing the transmitter history to uniform drift, provided the root is simple and the displayed derivatives exist.

## 2. Newborn self-root geometry

Use the same local chart as the coincident-birth analysis:

$$
t=T_r-T_0>0,
\qquad
\tau=T_r-T_t,
\qquad
u(T_0)=c_f,
\qquad
\dot u(T_0)=\alpha>0.
$$

At the newborn root,

$$
\tau_*(t)=2t+O(t^2),
$$

$$
r_*(t)=2c_ft+O(t^2),
$$

and

$$
J_*(t)=\frac{\alpha t}{c_f}+O(t^2).
$$

On the leading one-dimensional no-reversal chart,

$$
\frac{\partial r}{\partial T_t}
=
-c_f+\alpha t+O(t^2),
$$

$$
\frac{\partial J}{\partial T_t}
=
-\frac{\alpha}{c_f}+O(t),
$$

and the direction derivative contributes only at lower order to the along-track component.

## 3. Incoming recoil asymptotic

Substitution gives

$$
\begin{aligned}
\frac{\partial}{\partial T_t}
\left(\frac{1}{rJ}\right)
&=
-\frac{r_{T_t}J+rJ_{T_t}}{r^2J^2}\\
&=
\frac{3}{4\alpha t^3}
+O(t^{-2}).
\end{aligned}
$$

Since

$$
c_fJ=\alpha t+O(t^2),
$$

the recoil coefficient is

$$
\boxed{
\mathbf C_C^{(0)}(t)
=
\hat{\mathbf e}
\frac{3}{4\alpha^2}
t^{-4}
+O(t^{-3})
}.
$$

For the same-source polarity product, the coupling multiplier is positive. The incoming recoil therefore has the forward along-track sign.

The scale coefficient is

$$
\boxed{
\mathbf C_{\mathrm{scale}}^{(0)}(t)
=
\hat{\mathbf e}
\frac{1}{4\alpha c_f}
t^{-3}
+O(t^{-2})
}.
$$

Their magnitude ratio is

$$
\frac{\|\mathbf C_C^{(0)}\|}
{\|\mathbf C_{\mathrm{scale}}^{(0)}\|}
=
\frac{3c_f}{\alpha t}
+O(1).
$$

Thus the incoming recoil dominates rather than cancels the scale divergence as $t\to0^+$.

Falsifier: direct differentiation of $\hat{\mathbf r}/(rJ)$ on the stated local history that changes the $t^{-4}$ order or its leading along-track sign.

## 4. Location of the time-transposed contribution

For a present emission at time $T_0+t$ after the crossing, the local future separation from that emission is

$$
r_{\mathrm{future}}(\Delta)
=
c_f\Delta
+
\alpha t\Delta
+
\frac12\alpha\Delta^2
+
\text{higher-order terms}.
$$

For $t>0$ and sufficiently small $\Delta>0$, this is strictly larger than $c_f\Delta$. The future self does not receive that present wake on the local accelerating chart. The nontrivial newborn reception at $T_0+t$ instead comes from the pre-crossing emission at $T_0-t+O(t^2)$.

Consequently, the time-transposed action contribution associated with that pair is assigned to the earlier emission event. From the viewpoint of evolution at the earlier time, it depends on the later reception. It is therefore advanced unless an additional retained wake state carries the transfer causally.

Claim classification: **derived local root ordering**. A positive-delay future root from the post-crossing emission under the same monotone accelerating expansion would falsify it.

## 5. Consequences for the causal recoil theorem

The existing recoil term cannot be appended to the causal base acceleration and claimed to solve either conservation or coincident birth. A successful causal reconstruction must demonstrate at least one of the following:

1. a past-history wake state moves the transposed transfer to the correct causal side and changes the complete local singular balance;
2. a finite physical width and core make the combined scale-plus-recoil transition finite with independently constrained values;
3. a different invariant action or near-diagonal rule removes the $t^{-4}$ and $t^{-3}$ terms together.

The complete finite-width action contribution cannot be converted into a retained-particle-history acceleration: [Causal-Recoil No-Go for the Current Two-Time Action](analysis-two-time-action-causal-recoil-no-go.md) proves that two continuations with the same past can give different time-transposed contributions. A finite-width incoming-recoil integral can still be evaluated as a diagnostic, but it cannot by itself complete the causal action law.

The [Minimal Causal Wake-State Model](analysis-minimal-causal-wake-state-model.md) supplies one additional finite-width correction to the sharp interpretation. On the diagnostic newborn partition $\tau\ge t$, the leading constraint-derivative impulse is proportional to

$$
-\int_0^\infty
\frac{
\varphi(y^2/2)-\varphi(-y^2/2)
}{y\sqrt{y^2+\rho^2}}
\,dy.
$$

It vanishes for an even profile such as the Gaussian. Thus the forward $t^{-4}$ sharp term cannot be integrated first and then treated as the uniform finite-width impulse through the unresolved birth layer. The sharp and integrated finite-width limits do not commute. This cancellation is restricted to the newborn partition; it neither cancels the positive scale contribution nor controls the complementary coincident-endpoint layer.

Claim classification: **derived partition-local finite-width correction**. A nonzero value of the displayed integral for an even profile would falsify it.

## 6. Disposition

The straightforward pointwise sharp recoil-cancellation hope fails on the incoming chart. The finite-width newborn partition has a leading even-profile cancellation, but the complete endpoint layer remains unresolved and the one-scalar causal state fails the polarity/positive-energy test. Recoil must therefore be derived from an acceptable causal wake state rather than imported from the time-symmetric action equation or inferred from one order of limits.

Promotion classification: **priority-only; retained-particle-history recoil is closed negatively, while causal wake-state and coincident-birth closure remain blocked**.
