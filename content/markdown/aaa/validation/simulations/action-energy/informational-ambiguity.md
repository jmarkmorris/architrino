# Informational ambiguity

From the perspective of the receiving architrino, the information carried by an intersecting causal wake surface is limited. The receiver-local dynamical record contains two direct facts:

1. The net strength of the potential at the point of intersection.
2. The signed acceleration vector $\mathbf A$ at the receiver event.

The vector fixes the direction of the net acceleration. What it does not fix is the transmitter ray and polarity assignment that produced that vector. An attractive source on one ray and a repulsive source on the opposite ray can produce the same $\mathbf A$. Only after quotienting those source hypotheses does one obtain an unoriented inference axis; that axis is not the raw received datum.

## Degeneracies and Inference Limits

- Many-to-one mapping:
  - Different combinations of transmitter identity, polarity magnitudes, distances, and emission timing/geometry can yield the same receiver-local magnitude and line-of-action record.

- Sign ambiguity across a line:
  - An attractive pull toward an opposite-polarity source on one ray is indistinguishable, at one receiver event, from a repulsive push by a same-polarity source on the opposite ray. If the receiver polarity flips, the physical source-polarity labels flip too; the invariant ambiguity is the exchange of side with attraction/repulsion.

- Consequence for reconstruction:
  - Instantaneous local data at the receiver are insufficient to invert for sources; this remains true even for an $\mathbb{U}_{\text{now}}$ universe-state perspective who knows the universal clock $T$ and the Euclidean rest frame. The $\mathbb{U}_{\text{now}}$ universe-state perspective can eliminate coordinate uncertainty (perfect synchronization and alignment) but not the physical ambiguities below.
  - Irreducible ambiguities at an instant:
    - Sign/side ambiguity: an attractive lift on one ray and a repulsive lift on the opposite ray can produce the same receiver-local acceleration record. With receiver polarity held fixed, this can be written as a side/polarity flip of the source; with receiver polarity flipped, the source-polarity labels interchange as well.
    - Superposition along an axis: multiple sources aligned on either ray of the inference axis can sum to the same receiver-local acceleration vector at one instant, while their transmitter count, side distribution, and polarities remain hidden.
    - Self-hit confound: a self-interaction and an external source can yield identical instantaneous data if they lie on the same line with compensating magnitudes.
    - Super-field-speed self-history ambiguity: when same-transmitter delayed roots exist, the receiver-local event still reports an acceleration contribution, not the full past trajectory that produced it. The self-hit label must come from the retained causal-root ledger, not from the instantaneous vector alone.
    - Continuum of surrogate locations: for any instantaneous hit there exists a continuum of stationary surrogate source positions on the two rays of the inference axis, with polarity chosen consistently and with a correspondingly adjusted emission time $T_t$, that reproduces the same instantaneous vector; hence instantaneous inversion is severely underdetermined.

  - Surrogate-location recast: For one resolved line-of-action component at receiver event $R=(T,\mathbf X_{o'}(T))$, the receiver-local datum can be written as
    $$
    D_R=(A_R,[\hat{\mathbf{u}}]),
    \qquad
    [\hat{\mathbf{u}}]=\{\hat{\mathbf{u}},-\hat{\mathbf{u}}\},
    $$
    where $A_R\ge0$ is the net magnitude assigned to that component and $[\hat{\mathbf{u}}]$ is the unoriented axis through the receiver. A single surrogate lift chooses a side coordinate $\lambda\ne0$, a stationary surrogate position, and a source polarity:
    $$
    \mathbf X_{\mathrm{sur}}=\mathbf X_{o'}(T)-\lambda\hat{\mathbf{u}},
    \qquad
    \sigma_{\mathrm{sur}}=\operatorname{sign}(q_{\mathrm{sur}}q_{o'}),
    \qquad
    \hat{\mathbf{r}}_{\lambda}=\operatorname{sgn}(\lambda)\hat{\mathbf{u}}.
    $$
    The surrogate contribution is
    $$
    \mathbf A_{\mathrm{sur}}=A_R\sigma_{\mathrm{sur}}\hat{\mathbf{r}}_{\lambda}.
    $$
    It is unchanged under
    $$
    (\lambda,\sigma_{\mathrm{sur}})
    \sim
    (-\lambda,-\sigma_{\mathrm{sur}}),
    $$
    or, with receiver polarity fixed, by moving the surrogate to the opposite ray and flipping the surrogate source polarity. This recast is an inference device, not a claim that the original source inventory contained a single architrino.

  - What helps (over time or with more views):
    - Track the time series of the line of action $\hat{\mathbf{r}}(T)$ and separation proxy $r(T)$ inferred from timing and geometry; curvature and rotation of $\hat{\mathbf{r}}$ constrain source trajectories.
    - Use multiple receivers (an array) to triangulate the unoriented inference axes obtained after the side/polarity quotient; intersecting rays at the same $T$ narrow candidate locations while preserving the two-sided ambiguity.
    - Actively vary the receiver path to sample different directions and ranges, turning the inverse problem into a controlled experiment.
    - Impose priors: polarity inventories, speed bounds, and assembly templates reduce degeneracy space.
    - Use surrogate-location recasts: for instantaneous hits, place a stationary surrogate source on either ray of the inference axis, choose the corresponding polarity, and adjust the emission time; this simplifies hypothesis testing without altering per-wavefront amplitude.
    - Use solver-side quotient diagnostics: collapse exact branch contributions into receiver-local line bins, compare the bin to a one-surrogate representative, and treat the result as lossy compression. The quotient may help inverse-problem tests, noisy-background compression, and residual diagnosis, but it cannot replace retained causal-root ledgers because it discards transmitter count, side, polarity, emission time, transmitter velocity, and Jacobian data.
  - Absolute-observer note: Access to absolute time and a common Euclidean frame enables global correlation of events across receivers, but unique inversion at an instant would require hidden information (the full emission ledger $\{(T_t,\mathbf X_j(T_t),q_j,\mathbf V_j(T_t))\}_j$). Practical reconstruction is therefore necessarily temporal, statistical, and multi-view.

Plain language: a hit reports magnitude and line of action, not transmitter identity or distance. Many different source histories can fit the same momentary push. A null action at an instant conveys no information about sources; superposition can cancel perfectly even in a non-empty universe.
