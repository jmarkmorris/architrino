# Research findings

## Scope, evidence class, and exclusions

This packet integrates the completed external calculation reviews of the canonical Master Equation for a mirror-symmetric collinear close approach. The Kolmogorov, Cartan, Lorentz, and Thurston responses supplied complete derivations that agree on the regular one-partner-root balance stated below. The Emmy response followed the requested structure but contains a line-of-action sign inconsistency, so this packet retains from it only conclusions independently corroborated by the four complete derivations. The Tao, Einstein, and Henri retries were incomplete; none of their speculative asymptotics is used. A missing or incomplete response is neutral absence, not negative evidence.

Claim class: **external research guidance**. Agreement among the completed responses identifies proof targets but is not acceptance authority, and no external calculation substitutes for a separately authored verification against the canonical equation and root-admission owner.

Plainly: Four complete calculations agree on a narrow regular-chart result. That agreement tells the project what to prove next; it does not itself close the proof.

## Canonical regular law and declared chart

At normalized wake speed $c_f=1$, a simple causal root with delayed range $R$ has canonical per-root acceleration magnitude

$$
A_{\mathrm{root}}
=
\frac{K}{R^2\lvert D_t\rvert},
\qquad
D_t
=
1-\hat{\mathbf r}\cdot\mathbf V_t(T_t),
$$

where $K>0$ collects the fixed coupling and polarity magnitude for the attractive branch, $T_r$ is reception time, $T_t<T_r$ is the selected emission time, $\hat{\mathbf r}$ points from the transmitter's delayed position to the receiver, and $D_t$ is the transmitter-side causal-root Jacobian. The explicit velocity dependence is the arrival-density bunching factor $1/\lvert D_t\rvert$. There is no separate velocity-weakening numerator. Receiver motion enters root playback and future geometry, not the instantaneous per-root acceleration weight.

Plainly: Motion can bunch successive arriving causal surfaces together. The canonical law strengthens the received acceleration through that bunching; it does not multiply the result by a second factor that weakens it.

Restrict now to the monotone mirror, one-partner-root, strict-subfield chart. Write the labeled positions as

$$
\mathbf X_-(T)=-q(T)\mathbf e,
\qquad
\mathbf X_+(T)=q(T)\mathbf e,
\qquad
u(T)=-\dot q(T),
\qquad
0<u(T)<1.
$$

For the root connecting reception at $T_r$ to emission at $T_t$, define

$$
R=T_r-T_t,
\qquad
u_r=u(T_r),
\qquad
u_t=u(T_t),
$$

$$
\bar u
=
\frac{1}{T_r-T_t}\int_{T_t}^{T_r}u(\tau)\,\mathrm d\tau,
\qquad
g_s=1-u_t,
\qquad
\bar g=1-\bar u.
$$

This chart assumes persistent labels, one admitted partner root, positive delayed range, $D_t\ne0$, complete retained history over the root interval, and no uncounted partner or self root. It does not cover a fold, a root birth, same-event coincidence, loss of retained history, or any other root-topology change.

Plainly: The formulas below describe only the regular approach while one specific delayed root exists and stays simple. They do not describe what happens at or beyond the first boundary of that chart.

## Exact delayed-range identity

For the left receiver and right transmitter, the causal constraint gives

$$
R=q(T_r)+q(T_t).
$$

Monotonicity and the definition of $\bar u$ give

$$
q(T_t)
=
q(T_r)+\int_{T_t}^{T_r}u(\tau)\,\mathrm d\tau
=
q(T_r)+\bar u R.
$$

Therefore

$$
R=2q(T_r)+\bar uR,
\qquad
\boxed{R=\frac{2q(T_r)}{\bar g}}.
$$

Claim class: **derived identity on the declared chart**. This follows directly from the causal-root equation and the definitions above. It is not a short-delay approximation and is not asserted outside the stated one-partner-root strict-subfield branch.

Plainly: The delayed range is larger than the present half-separation because the transmitter was farther away when it emitted the arriving causal surface. The average speed over the delay fixes that enlargement exactly.

## Exact regular-row magnitude

On this line of action,

$$
\hat{\mathbf r}\cdot\mathbf V_t(T_t)=u_t,
\qquad
\lvert D_t\rvert=1-u_t=g_s.
$$

Substituting the exact range identity into the canonical per-root kernel gives

$$
\boxed{
A_{\mathrm{root}}
=
\frac{K}{R^2g_s}
=
\frac{K\bar g^2}{4q(T_r)^2g_s}
}.
$$

Claim class: **derived regular-row identity on the declared chart**. It balances delayed range against transmitter-side arrival bunching without adding a receiver playback factor or an unprovided velocity numerator.

Plainly: A finite acceleration at every positive separation does not guarantee a finite accumulated velocity change. The question is how quickly this quantity grows and for how long it acts as the chart boundary is approached.

## Conditional fixed-subfield asymptotics

Suppose, only as a conditional test, that the one-root chart persists to a finite time $T_\ast$ with

$$
u(T)\longrightarrow u_\ast\in(0,1),
$$

and that $K$ remains nonzero. Then $g_s$ and $\bar g$ approach positive finite limits, while

$$
q(T)\sim u_\ast(T_\ast-T).
$$

Consequently the acceleration-measure density has the scaling

$$
A_{\mathrm{root}}(T)
=
\Theta\!\left((T_\ast-T)^{-2}\right).
$$

Its one-sign accumulated integral and total variation therefore diverge as $\Theta((T_\ast-T)^{-1})$. Pointwise finiteness on every positive-range row is not an integrability result.

Claim class: **externally corroborated conditional derivation**. Its assumptions include continued one-root topology, a nonvanishing kernel, a finite fixed subfield-speed limit, and no earlier history or regularity boundary. The calculation does not prove that an actual stationary-history encounter reaches this asymptotic sector.

Plainly: If the speed stayed safely below field speed all the way to zero present separation, the acceleration would grow too quickly to have a finite accumulated effect. The actual evolution may leave that assumed regime first, so the next task is to find the first boundary rather than extrapolate through it.

## Proposed reduced range-evolution identity

On the same line of action the receiver-side playback factor is

$$
D_r=1+u_r,
\qquad
\frac{\mathrm dT_t}{\mathrm dT_r}
=
\frac{D_r}{D_t}
=
\frac{1+u_r}{1-u_t}.
$$

Hence

$$
\frac{\mathrm dR}{\mathrm dT_r}
=
1-\frac{\mathrm dT_t}{\mathrm dT_r}
=
-\frac{u_r+u_t}{1-u_t}.
$$

Combining this with the attractive regular-row relation

$$
\frac{\mathrm du}{\mathrm dT_r}
=
\frac{K}{R^2(1-u_t)}
$$

formally yields

$$
\boxed{
\frac{\mathrm du}{\mathrm dR}
=
-\frac{K}{R^2(u_r+u_t)}
}.
$$

Claim class: **external proposed identity requiring independent verification**. The cancellation is algebraically consistent with the declared sign convention, but it must be checked by an independently authored instrument or proof against the canonical root orientation, polarity convention, acceleration component, and root-playback law. The same derivation must not serve as both subject and oracle.

If verified, the identity proposes that a positive-$K$ one-root strict-subfield branch cannot continue regularly to $R=0$: the growth forced by the $R^{-2}$ term would require that the branch encounter an earlier boundary. That is an inference to test, not a certified boundary classification.

Plainly: The proposed differential equation says the speed must grow as the delayed range shrinks. Before relying on that conclusion, a separate calculation must confirm every sign and every root factor, then determine which assumption fails first.

## Unresolved critical regime

The regime

$$
u(T)\longrightarrow1^{-}
$$

remains unresolved. Both $g_s$ and $\bar g$ can shrink, so the exact balance

$$
A_{\mathrm{root}}
=
\frac{K\bar g^2}{4q^2g_s}
$$

cannot be classified from $q$ alone. A short-delay reduction is not self-consistent unless the root interval is independently proved to shrink: the causal root may migrate into older history while the present separation shrinks. A complete calculation must also classify partner-root folds, partner-root births, self-root births, and the retained-history boundary before assigning any limiting measure.

Claim class: **unresolved question**. No asymptotic claim from the incomplete Tao, Einstein, or Henri retries is promoted, and the sign-inconsistent Emmy line-of-action calculation supplies no independent support.

Plainly: Near field speed, the arriving causal surface may have been emitted much earlier than a local approximation assumes. The full root ledger, not a present-time shortcut, must decide what happens first.

The completed reviews do not select passage, rebound, a boundary value, an outgoing retained history, a physical interpretation, a conserved account, stability, MEC-005 closure, or MEC-007 closure.

# Proposed changes

## Priority-only proof program

Retain the result as priority-only research guidance and add one MEC-007 proof target with three obligations:

1. Independently verify

   $$
   R=\frac{2q}{\bar g},
   \qquad
   \frac{\mathrm du}{\mathrm dR}
   =
   -\frac{K}{R^2(u_r+u_t)}
   $$

   on the canonical monotone mirror, one-partner-root, strict-subfield branch at $c_f=1$. The verification must state label orientation, polarity sign, admitted-root set, $D_t$, $D_r$, and the acceleration component being differentiated.

   Plainly: Recheck the two equations from the canonical law with an independent proof or instrument, including all signs.

2. Starting from the stationary retained history, use the verified identities, a complete partner-and-self causal-root census, and the retained-history margin to certify the first boundary reached by the actual encounter. The predeclared alternatives are a field-speed or transversality event, a root-topology or self-root event, the retained-history boundary, or another explicitly identified regularity failure.

   Plainly: Do not assume which obstruction occurs first. Follow the complete delayed-root record until one precisely defined condition fails.

3. Preserve the earlier pre-boundary measure test in the unresolved $u\to1^{-}$ regime: on shrinking certified positive-range sections, record the signed integral and total variation of relative acceleration under refinement together with minimum delayed range, minimum $\lvert D_t\rvert$, complete root census, and retained-history margin.

   Plainly: Even if each computed acceleration remains finite, test whether its accumulated effect has a finite, unique limit.

The proof target is falsified as a route to a regular limiting history if an identity fails independent verification, an uncounted root appears, the first boundary cannot be certified, retained history is exhausted, or the signed integral or total variation diverges or depends on the section sequence or admissible history family. Such a result is still useful negative evidence, but its disposition is `Not advanced`.

No part of this program authorizes a continuation, deletes a root, inserts a receiver playback factor into the acceleration weight, introduces finite width, fits an impulse, substitutes a scalar surrogate, or advances MEC-005 or MEC-007.

# Items to disposition into the priorities directory

| Item | Live owner | Disposition | Exact next action | Claim boundary |
| --- | --- | --- | --- | --- |
| Strict-subfield arrival-bunching balance and first-boundary certification | `MEC-007` mirror close-approach causal-root boundary | `priority-only`; status unchanged | Independently verify the two boxed range-evolution identities, then use them with the complete root census and retained-history margin to certify the first boundary reached; preserve the refined signed-integral and total-variation test in the unresolved $u\to1^{-}$ regime | No continuation, boundary value, outgoing history, physical claim, conserved account, stability, MEC-005 closure, or MEC-007 closure |

Plainly: MEC-007 now owns this mirror boundary calculation. The row narrows the next proof without claiming its answer, while MEC-006 retains only the receiver-gradient program.
