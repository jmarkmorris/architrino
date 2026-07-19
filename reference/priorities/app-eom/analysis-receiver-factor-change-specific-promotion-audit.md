# Receiver-Factor Change-Specific Promotion Audit

## Status

- Purpose: decide whether the unresolved same-source and conservation failures block the proposed removal of the receiver multiplier
- Scope: compare the current receiver-weighted law with the proposed source-density law on the same retained-history domain
- Standing: priority analysis; not canon, accepted evidence, or an EOM solver authorization
- Result: the factor correction is ready for scoped promotion, while the globally complete Master Equation remains unclosed

## Finding in plain language

The previous promotion audit asked the proposed correction to solve two problems that the current equation does not solve either.

The current receiver-weighted law already has a nonintegrable coincident same-source birth. Removing the receiver multiplier makes that local divergence one power stronger, but it does not turn a previously accepted sharp transition into a failed one: the current binding already routes simultaneous same-source coincidence and transmitter-side degeneracy out of the accepted sharp chart.

The current causal equation also does not have derived conserved energy, momentum, and angular momentum accounts on retained particle history. The two-time action has formal symmetry accounts, but its complete variation depends on future receptions and is not the causal equation advanced by the EOM solver.

These remain fundamental Master Equation debts. They are not evidence for retaining a receiver multiplier that fails its own derivation and first-order discriminator. The honest promotion is therefore narrower:

- promote $c_f/|D_t|$ as the base factor on the certified source-density domain;
- retain $D_r/D_t$ only for root transport;
- continue to fail closed at coincident same-source birth and other undeclared singular strata;
- make no claim that the correction closes global continuation or conservation.

Claim classification: **derived comparison plus inferred promotion-scope conclusion**. The mathematics establishes which failures occur under each law. The conclusion that pre-existing out-of-domain failures should not block a scoped correction is a promotion-policy judgment, stated explicitly rather than presented as a theorem.

## 1. The two laws being compared

Suppress the common polarity, charge, coupling, and direction factors. On a positive-delay simple root, the current receiver-weighted magnitude is

$$
A_{\mathrm{old}}
=
\frac{K}{r^2}
\left|\frac{D_r}{D_t}\right|,
$$

whereas the proposed source-density magnitude is

$$
A_{\mathrm{new}}
=
\frac{K}{r^2}
\frac{c_f}{|D_t|}.
$$

Both laws use the same causal root, emission position, separation, polarity, and transmitter-side degeneracy. They differ only in whether the receiver's wake-crossing rate multiplies acceleration.

On every declared simple-root chart with $r>0$ and $D_t\ne0$, the source-density expression follows from the finite-width transmitter-time integral with uniform emission measure. The identity

$$
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}
$$

still governs root tracking, but it is not a second acceleration factor.

## 2. Coincident same-source birth already fails under the current law

Use the smooth same-source field-speed crossing chart

$$
u(T_0)=c_f,
\qquad
\dot u(T_0)=\alpha>0,
\qquad
t=T_r-T_0>0.
$$

The newborn root satisfies

$$
T_t=T_0-t+O(t^2),
\qquad
r_*(t)=2c_ft+O(t^2).
$$

The transmitter and receiver factors are

$$
D_t
=
c_f-u(T_t)
=
\alpha t+O(t^2),
$$

and

$$
D_r
=
c_f-u(T_r)
=
-\alpha t+O(t^2).
$$

Therefore

$$
\left|\frac{D_r}{D_t}\right|
=
1+O(t),
$$

and the current law has

$$
\boxed{
\mathbf A_{\mathrm{old}}(t)
=
\hat{\mathbf e}
\frac{K_i}{4c_f^2}
t^{-2}
+O(t^{-1})
}.
$$

Its velocity impulse diverges:

$$
\int_0^L\|\mathbf A_{\mathrm{old}}(t)\|\,dT_r
=\infty.
$$

For comparison, the proposed source-density law has

$$
\boxed{
\mathbf A_{\mathrm{new}}(t)
=
\hat{\mathbf e}
\frac{K_i}{4\alpha c_f}
t^{-3}
+O(t^{-2})
}.
$$

Removing the receiver multiplier therefore strengthens the sharp divergence from $t^{-2}$ to $t^{-3}$. It does not create the first failure of sharp continuation. Neither law supplies a finite transition through the coincident birth.

Claim classification: **derived on the stated smooth crossing chart**. A finite old-law impulse on this chart would falsify the baseline comparison.

### 2.1 Exact quadratic-path control

The leading comparison has an exact analytic control. Set $T_0=0$ and choose the one-dimensional prescribed history

$$
\mathbf X(T)
=
\hat{\mathbf e}
\left(
c_fT+\frac12\alpha T^2
\right),
\qquad
\alpha>0.
$$

At reception time $T_r=t>0$, the noncoincident same-source root is exactly

$$
T_t=-t,
$$

because

$$
\mathbf X(t)-\mathbf X(-t)
=
2c_ft\hat{\mathbf e}
$$

and

$$
c_f(t-(-t))=2c_ft.
$$

The remaining quantities are also exact:

$$
r=2c_ft,
\qquad
D_t=\alpha t,
\qquad
D_r=-\alpha t.
$$

Therefore

$$
\mathbf A_{\mathrm{old}}(t)
=
\hat{\mathbf e}
\frac{K_i}{4c_f^2t^2},
$$

and

$$
\mathbf A_{\mathrm{new}}(t)
=
\hat{\mathbf e}
\frac{K_i}{4\alpha c_ft^3}.
$$

This separately known exact path checks every coefficient in the local comparison. It is a prescribed-history analytic control, not evidence for the self-consistent continuation after the singular event.

Claim classification: **derived exact control**. Direct substitution into the causal-root equation and the two acceleration factors is the independent reference.

## 3. Why the stronger divergence does not disappear from the audit

The stronger source-density singularity matters. It must remain visible in the solver route, regulator study, and any later attempt at a complete physical law. It cannot be dismissed as harmless.

It does not, however, compare an accepted old transition with a failed new transition. The current binding already fails closed when the transmitter-side floor and the near-origin kernel fail together, when a transition observable depends on regulator removal, or when no certified singular chart exists. Coincident same-source birth has all three properties.

The scoped correction must preserve that boundary. It may not publish a continued state through the event merely because fixed positive numerical widths make one step finite. A run that encounters the event must either use a separately accepted future same-source law or halt without publishing the transition.

This gives an operator-checkable falsifier: if the current accepted EOM path contains a certified, regulator-independent receiver-weighted continuation through this exact birth, then the event is not merely baseline debt and this promotion conclusion must be reopened. No such accepted continuation is identified in the current binding or evidence inventory.

## 4. Conservation is also baseline debt

The causal retained-history update used by the current EOM solver advances particle paths from past receptions. It does not derive a unique kinetic scalar, momentum map, or wake account.

The current two-time action does supply formal symmetry accounts for its own two-sided equation. Its variation at an emission event includes receptions later than that event. Two evolutions with the same retained past and different futures therefore have different action variations. Those accounts do not belong to the causal retained-history law advanced by the solver.

Consequently, replacing $|D_r/D_t|$ by $c_f/|D_t|$ does not remove a conservation theorem already possessed by the causal canonical equation. Both the old and proposed causal laws lack the same Architrino-native, non-circular conservation construction.

Claim classification: **derived from the retained-history underdetermination and same-past/different-future no-go theorem**. A conserved account already derived for the current causal receiver-weighted update, rather than for the two-sided action, would falsify the baseline classification.

## 5. Change-specific promotion rule

For this audit, an unresolved defect blocks the factor change when at least one of the following is true:

1. the defect is absent under the current causal law and introduced by the correction;
2. the correction destroys an accepted continuation or accepted conservation result;
3. the correction invalidates evidence used by a current promoted claim;
4. the correction has no declared fail-closed route where its derivation does not apply.

A defect remains a global Master Equation closure obligation, but not a blocker to this scoped correction, when it occurs under both laws, has no accepted continuation under either law, and remains outside the promoted domain.

This rule does not lower the standard for a globally complete law. It prevents unrelated or inherited debt from being used to preserve a factor that has failed the evidence directly testing that factor.

## 6. Scoped promotion domain

The correction is ready only with the following explicit boundary:

### Promoted behavior

- positive-delay simple roots with $r>0$ and $D_t\ne0$;
- the source-density finite-width equation from which the simple-root factor is obtained;
- ordinary transmitter-side folds with nonzero separation and $D_r\ne0$, advanced by their finite integrated acceleration;
- receiver turning points with $D_r=0$ and $D_t\ne0$, where the causal root remains present and the source-density acceleration does not vanish;
- $D_r/D_t$ retained as signed root transport, never silently discarded from tracking.

### Behavior that remains fail-closed

- coincident same-source birth;
- simultaneous transmitter-side and receiver-side degeneracy outside the ordinary-fold theorem;
- higher singular strata without a certified finite-width transition;
- root accumulation and insufficient retained history;
- any transition whose published observable depends on an undeclared regulator choice.

### Claims not made by the promotion

- no globally complete same-source law;
- no derived energy, momentum, or angular-momentum closure;
- no complete moving-transmitter and moving-receiver observer-level recovery;
- no authorization to reinterpret a numerical core or causal width as a physical Architrino scale.

## 7. Change-specific gate audit

| Gate | Result for receiver-factor correction | Grade | Consequence |
| --- | --- | --- | --- |
| Uniform-emission simple-root reduction | Pass | Derived and independently reconstructed | Use $c_f/|D_t|$ |
| Receiver multiplier | Pass for removal at first order | Derived native comparison plus independent recovery target | Do not restore $|D_r|/c_f$ |
| Receiver turning point | Pass mathematically under the source-density finite-width equation | Derived | Preserve the root and finite source-density acceleration when $D_r=0$, $D_t\ne0$ |
| Ordinary transmitter-side fold | Pass | Derived finite accumulated acceleration | Advance by integrated acceleration |
| Coincident same-source birth | Fails under both laws; stronger under the proposal | Derived asymptotic plus exact quadratic-path control | Preserve fail-closed routing; do not claim global completion |
| Causal conserved accounts | Absent for both retained-history laws | Derived baseline obstruction | Preserve the global closure gate; do not use it to retain the receiver multiplier |
| Implementation impact | Classified, but semantic migration not authorized here | Measured repository inventory | Use the existing migration inventory after explicit authorization |

## 8. Verdict

The receiver-factor correction is **ready for scoped promotion** as the base acceleration on the declared source-density domain. The globally complete Master Equation is **not ready**.

This verdict authorizes neither canon edits nor EOM solver semantic changes by itself. It supplies the physics disposition needed for a separate, explicitly authorized migration: change the factor, retain the root-transport identity, preserve singular-event fail-closed behavior, and state the unclosed global obligations without pretending that the old factor solved them.

Promotion classification: **promote the receiver-factor correction within its declared domain; defer global same-source continuation, conservation closure, and complete observer-level recovery**.
