# Octahedral Fold-Aware Cross-Binary I1.f1 Critical-Exhaustion Integration

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition](octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.md) and [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md). The predecessor zero-isolation packet proves that the `I1.f1` bracket

$$
B_1=[a_1,b_1]
=
[0.124678831905,\;0.145456970556]
$$

contains exactly one zero of $f_\times$ under the certified positive speed-ratio enclosure

$$
3.02156\le\nu\le3.02157.
$$

The new integration theorem is the primitive-critical consequence of that closure. On the regular `I1` cell,

$$
A_\times'(\theta)=f_\times(\theta).
$$

Therefore a zero of $f_\times$ is exactly a regular primitive-critical point of $A_\times$. Let $u_1$ denote the unique zero in $B_1$. Then the `I1` contribution to critical exhaustion reduces to two outside-bracket sign exclusions:

$$
f_\times(\theta)>0
\quad\text{on}\quad
[0,a_1],
$$

and

$$
f_\times(\theta)<0
\quad\text{on}\quad
[b_1,\theta_{3-}].
$$

If those two complement rows are certified, then

$$
\boxed{
\operatorname{Crit}(A_\times;I_1)=\{u_1\}.
}
$$

This is a genuine reduction in the proof stack: the `I1.f1` bracket zero is no longer a live zero-isolation bottleneck. The live `I1` burden has moved to the two complement sign-enclosure rows.

## Location Data

The theorem-grade location interval remains the certified bracket

$$
u_1\in[0.124678831905,\;0.145456970556].
$$

The sampled speed-envelope scan gives a sharper diagnostic location interval

$$
0.129617801662
\le
u_{1,\mathrm{samp}}
\le
0.129631781031,
$$

with sampled derivative-at-root envelope

$$
-0.0903237258617
\le
f_\times'(u_{1,\mathrm{samp}})
\le
-0.0902959668558.
$$

The sampled interval is useful for quadrature targeting and regression checks, but it is not promoted to a theorem-grade interval location over the whole speed enclosure. The theorem-grade object is still the certified bracket plus the unique-zero proof.

## Complement Rows

The integration packet emits exactly two remaining `I1` complement rows:

| Row | Interval | Needed sign | Role |
| --- | ---: | ---: | --- |
| `I1.left-complement.forcing-positive` | $[0,a_1]$ | $+$ | excludes a hidden primitive-critical point before the certified bracket |
| `I1.right-complement.forcing-negative` | $[b_1,\theta_{3-}]$ | $-$ | excludes a hidden primitive-critical point after the certified bracket and before the fold endpoint |

These rows are now sharper than the older `I1.derivative-negative.full-cell` burden. Full-cell derivative negativity remains a possible proof route, but it is no longer logically required for the `I1.f1` zero itself. The critical-exhaustion route can instead certify the signs on the two complements directly.

The sampled successor [octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan](octahedral-fold-aware-cross-binary-i1-complement-sign-exclusion-scan.md) partially advances these rows. It samples $f_\times>0$ on $[0,a_1]$, samples $f_\times<0$ on the compact right complement $[b_1,\theta_{3-}-0.003^2]$, and imports the $\theta_{3-}^{-}$ square-coordinate fold-collar sign transport for the singular endpoint.

The interval successor [octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure](octahedral-fold-aware-cross-binary-i1-compact-complement-directed-rounded-interval-enclosure.md) now closes the interval-safe ordinary-$\theta$ part: it proves directed-rounded $f_\times>0$ on $[0,a_1]$ and directed-rounded $f_\times<0$ on $[b_1,\theta_{3-}-0.115^2]$. The remaining theorem-grade burden is the explicit $\theta_{3-}^{-}$ fold-collar interval radius.

## Claim Boundary

Closed here:

- the `I1.f1` unique bracket zero is integrated into the primitive-critical map;
- the `I1.f1` zero-isolation target is removed as an open bottleneck;
- the remaining `I1` regular critical-exhaustion burden is reduced to two complement sign exclusions.

Still open:

- full right-complement sign transport through the $\theta_{3-}^{-}$ collar;
- an explicit interval fold-collar radius for $\theta_{3-}^{-}$;
- global `I1` interval sign topology;
- the remaining `I2`, `I3`, fold-collar, and bridge rows;
- interval quadrature for $C_\times$, $m_Q$, and $M_Q$;
- retained branch status.

No speed band, speed window, speed minimum, or speed maximum is imposed. The packet uses only the certified positive speed-ratio enclosure.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.mjs). It imports and validates the full `I1.f1` zero-isolation composition and the sampled root-location speed-envelope scan, then emits the theorem summary:

$$
\texttt{I1.f1.critical-exhaustion-integration}.
$$

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.test.js) validates predecessor consumption, no-fixed-speed-window discipline, complement-row emission, downstream overclaim rejection, and CLI validation.

## Result

The result status is

$$
\texttt{source-atlas-aware-i1-f1-critical-exhaustion-integration-certified}.
$$

The sampled and fold-aware successor status is

$$
\texttt{sampled-source-atlas-aware-i1-complement-sign-exclusion-scan-certified}.
$$

The compact interval successor status is

$$
\texttt{source-atlas-aware-i1-compact-complement-directed-rounded-interval-enclosures-certified}.
$$

The speed-dependent moving-fold successor status is

$$
\texttt{sampled-speed-dependent-theta3minus-fold-normal-form-certified}.
$$

The directed-rounded fold-limit successor status is

$$
\texttt{directed-rounded-theta3minus-fold-limit-interval-certified}.
$$

The next theorem-grade successor row is

$$
\texttt{theta\_3minus.left-fold-collar-directed-rounded-normal-form-remainder-required}.
$$

This successor is not another broad gate. It is the precise mathematical place where the proof now stands: the sampled speed-dependent square-coordinate normal form already has $G<0$ and $D<0$ in the chart $\theta=\theta_{3-}(\nu)-y^2$, and the interval packet has certified the negative limit $L(\nu)$. The remaining task is the directed-rounded remainder proof that upgrades those sampled signs to the whole collar. Then the `I1` regular-cell contribution to critical exhaustion can be composed.
