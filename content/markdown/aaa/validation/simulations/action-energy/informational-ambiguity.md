# Informational ambiguity

An [architrino](../../../foundations/architrino.md) is a pointlike polarity carrier with no primitive mass. Its emitted causal wake is an expanding record of its earlier position. The [Master Equation](../../../dynamics/master-equation.md#the-master-equation-canonical-form) assigns each arriving hit a signed acceleration vector and sums all admitted hits at the receiver event. The net vector alone does not identify the transmitters or recover the individual contributions. Resolving one hit requires additional causal-root data: the emission event whose wake reaches the receiver.

This chapter examines the information retained by that acceleration record. It does not assume that an individual architrino is a measuring apparatus. A [Physical Observer](../../../spacetime/observer-framework.md#physical-observers), an assembly that forms and preserves records, needs a declared readout map to access such data. The magnitude and direction of a nonzero net vector are properties of one datum, not independent measurements of a scalar potential. A potential diagnostic requires its own definition and readout map.

The vector fixes the direction of acceleration, but not the transmitter side and polarity that produced it. An opposite-polarity transmitter on one ray and a same-polarity transmitter on the opposite ray can give the same vector. Identifying these alternative transmitter hypotheses preserves the signed acceleration. Replacing that vector by its magnitude and an unoriented axis discards additional information: opposite acceleration vectors then have the same representation.

## Degeneracies and Inference Limits

The following ambiguities concern a restricted instantaneous acceleration record, without a known transmitter inventory or complete path history. They are derived consequences of the signed vector sum and the single-hit construction below.

- **Side and polarity.** For stationary transmitter hypotheses at equal separation and fixed receiver polarity, exchanging the transmitter side and its polarity preserves the acceleration. Comparing receivers of opposite polarities interchanges the corresponding transmitter labels; this compares hypotheses and does not posit a mechanism for changing an architrino's polarity.
- **Superposition.** Different transmitter identities, counts, polarities, separations, and emission geometries can give the same net vector. Each primitive polarity has the fixed magnitude $\epsilon$; arbitrary individual polarity magnitudes are not available fitting parameters. Contributions need not all lie on the net acceleration axis.
- **Zero acceleration.** Equal opposite vectors cancel, so zero net acceleration does not distinguish no arriving hits from a nonempty cancelling inventory. It still constrains the candidate histories by excluding those predicting a nonzero net vector. It supplies no preferred direction.
- **Self-hit ambiguity.** A retained self-hit and a contribution from another transmitter can have the same instantaneous vector. The self-hit label requires identity and emission provenance in the causal-root ledger. A nontrivial simple self-hit requires super-field-speed motion somewhere in the intervening history; that condition is not sufficient, and the receiver's current speed alone does not decide whether a self-hit arrives.

Knowledge of [absolute time](../../../foundations/absolute-time.md) and a common [Euclidean frame](../../../foundations/euclidean-void.md) supplies coordinates, not the missing emission history. The $\mathbb{U}_{\text{now}}$ universe-state perspective defined in [Observer Framework](../../../spacetime/observer-framework.md) already includes the required path-history and causal-root provenance. The inverse problem concerns a restricted projection of that complete state.

## Surrogate-Location Recast

A stationary surrogate transmitter is a hypothetical single architrino chosen to reproduce one nonzero acceleration vector at one event. It is an inference device evaluated on prescribed history, not an assertion that the original inventory contained one stationary architrino or that the surrogate history solves the coupled dynamics.

Let $R=(T_r,\mathbf X_r(T_r))$ be the event of receiver $r$ at reception time $T_r$, and let $\mathbf A_R\ne\mathbf 0$ be the vector to match. It can be a net acceleration or a component already resolved by additional data. Define its magnitude $A_R$, direction $\hat{\mathbf u}$, signed datum $D_R$, and reduced magnitude-axis record $Q_R$ by

$$
D_R=\mathbf A_R=A_R\hat{\mathbf u},
\qquad
A_R=\|\mathbf A_R\|>0,
\qquad
Q_R=(A_R,[\hat{\mathbf u}]),
\qquad
[\hat{\mathbf u}]=\{\hat{\mathbf u},-\hat{\mathbf u}\}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-20664d22782d3770)

The brackets identify opposite directions and thus describe an unoriented axis. The reduced record $Q_R$ alone cannot select between $\mathbf A_R$ and $-\mathbf A_R$; the construction retains $D_R$ to match the signed vector.

Choose a signed separation $\lambda\ne0$ along $\hat{\mathbf u}$. With receiver polarity $q_r$ fixed and surrogate polarity $q_{\mathrm{sur}}\in\{-\epsilon,+\epsilon\}$, define

$$
\mathbf X_{\mathrm{sur}}=\mathbf X_r(T_r)-\lambda\hat{\mathbf u},
\qquad
\sigma_{\mathrm{sur}}=\operatorname{sgn}(q_{\mathrm{sur}}q_r),
\qquad
\hat{\mathbf r}_{\lambda}=\operatorname{sgn}(\lambda)\hat{\mathbf u}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-383675d093e32642)

Here $\sigma_{\mathrm{sur}}$ is positive for like polarities and negative for unlike polarities; $\hat{\mathbf r}_{\lambda}$ points from emission to reception. Both architrinos have polarity magnitude $\epsilon$. For stationary transmission, the transmitter-side factor is $D_t=c_f$ and the acceleration weight is $W^{\mathrm{acc}}=c_f/|D_t|=1$, where $c_f>0$ is wake speed. The canonical coupling $\kappa>0$ therefore fixes the contribution and its matching radius $r_\ast$:

$$
\mathbf A_{\mathrm{sur}}
=\frac{\kappa\epsilon^2}{\lambda^2}\sigma_{\mathrm{sur}}\hat{\mathbf r}_{\lambda},
\qquad
|\lambda|=r_\ast=\sqrt{\frac{\kappa\epsilon^2}{A_R}},
\qquad
T_{t,\mathrm{sur}}=T_r-\frac{r_\ast}{c_f}
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-6329e70c98e750c0)

The magnitude equation fixes distance, and the causal-time equation fixes the surrogate emission time $T_{t,\mathrm{sur}}$. Matching direction additionally requires $\sigma_{\mathrm{sur}}\operatorname{sgn}(\lambda)=1$. There are exactly two stationary position/polarity choices under these assumptions: $\lambda=r_\ast$ with like polarity, and $\lambda=-r_\ast$ with unlike polarity. Their contributions agree under the exchange

$$
(\lambda,\sigma_{\mathrm{sur}})
\sim
(-\lambda,-\sigma_{\mathrm{sur}})
$$

[View →](../../../../../../equation-mapping.html#corpus-equation-04196174cb6f1e33)

Changing emission time alone cannot compensate for an arbitrary stationary distance. For a resolved moving-transmitter hit, let $r$ be its delayed separation and $\mathbf V_t(T_t)$ its emission velocity. Its magnitude is $A_R=\kappa\epsilon^2W^{\mathrm{acc}}/r^2$, with $D_t=c_f-\hat{\mathbf r}\cdot\mathbf V_t(T_t)$ and $\hat{\mathbf r}$ pointing from its emission position to the receiver. Its stationary representative lies at $r_\ast=r/\sqrt{W^{\mathrm{acc}}}$. These statements use the positive-separation simple-root law with $D_t\ne0$; singular-root events require their own treatment.

For a concrete check, use normalized wake-speed units $c_f=1$ and choose the remaining units so $\kappa\epsilon^2=1$. A stationary transmitter at distance one gives magnitude one; distance two gives magnitude $1/4$. Choosing emission times $T_r-1$ and $T_r-2$ makes both causal but does not equalize their amplitudes.

Claim grade: derived for this single-event recast under the stated fixed-magnitude law. A different finite stationary radius giving the same nonzero magnitude with the same parameters and one admitted hit would refute it. Zero acceleration has neither a defined axis nor a finite single-stationary-transmitter representative; it requires an empty or cancelling contribution record in this comparison. Matching one event does not preserve the original history or predict future acceleration.

## Additional Records and Reconstruction

The following methods are conditional inference tools. Their value depends on the admitted histories, accessible records, and experimental or simulation controls; they are not a general uniqueness theorem.

- **Time series.** Track the signed net vector, or a resolved component when available. Interpreting its direction as a transmitter line requires component association; a distance proxy needs independent timing or a declared geometric model.
- **Receiver arrays.** Fit the delayed geometry at each receiver. Simultaneous receptions from a moving transmitter generally sample different emission positions, so their axes need not intersect. Direct line intersection requires a stationary-transmitter assumption or association with the same emission event, possibly at different reception times. Additional records can remove the side ambiguity.
- **Path variation and priors.** Prescribed receiver paths can test inverse problems in simulations. A physical experiment requires a model of how an apparatus changes and records its constituent trajectories. Declared polarity inventories, speed bounds, and assembly templates restrict hypotheses; their conclusions inherit those assumptions.
- **Surrogate diagnostics.** The constrained stationary recast compares instantaneous vectors. A line bin, a declared grouping of collinear contributions, can retain its signed sum; replacing it by magnitude and axis loses its orientation as well. Zero bins must retain their zero status without an invented surrogate direction. Such summaries discard transmitter count, side, polarity, emission time, emission velocity, and root-Jacobian data, so they cannot replace the causal-root ledger for evolution.

Information here means distinguishability of candidate histories by a specified acceleration record. No probability distribution, entropy measure, compression rate, or error bound has been established. Quantitative information-theoretic or observer-level recovery claims require a declared history family, record map, precision or coding rule, and probability model where applicable. A reduced record is sufficient for a proposed observable only if histories assigned the same reduced record give the same observable within its stated accuracy. Two such histories with different predictions would refute that sufficiency claim.
