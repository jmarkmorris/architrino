# Causal set and delay geometry

The receiver $o'$ at reception time $T_r$ interacts with transmitter $o$ through the possibly multi-valued set of causal emission times
$$
\mathcal{C}_o(T_r)
=
\big\{\,T_t<T_r\mid \|\mathbf X_{o'}(T_r)-\mathbf X_o(T_t)\|=T_r-T_t\,\big\}
$$
For $\|\mathbf V_o(T_t)\|<1$ locally, $\mathcal{C}_o(T_r)$ is generically a singleton; for $\|\mathbf V_o\|>1$, it may contain multiple solutions, including self-hits when $o'=o$.

Clarification: "Multi-valued" means that, for a fixed reception time $T_r$, there can be more than one emission time $T_t$ that satisfies the causal-distance condition; i.e., $\mathcal{C}_o(T_r)$ may contain multiple causal roots when $\|\mathbf V_o\|>1$ or when same-transmitter roots exist for $o'=o$. This multiplicity can occur only if the transmitter has exceeded field speed at least once; if $\|\mathbf V_o\|<1$ everywhere, $F(T_t;T_r)$ is strictly increasing in $T_t$ and the causal root is unique.

Terminology note: the `causal set` in this simulation note is the causal interaction set $\mathcal{C}_o(T_r)$: a set of delayed emission times that reach a receiver at reception time $T_r$. It is not Causal Set Theory, the external quantum-gravity program that treats discrete spacetime events and partial order as fundamental. That outside program remains useful as a comparison for causal ordering and continuum emergence, but the substrate object here is a path-history root set inside absolute timespace.

## Geometry of Delay and Roots

- Root condition as an expanding causal isochron intersection:
  - Define $F(T_t; T_r) \equiv \|\mathbf X_{o'}(T_r) - \mathbf X_o(T_t)\| - (T_r - T_t)$ (with $v=1$ units). Causal roots satisfy $F(T_t; T_r)=0$ with $T_t < T_r$ and $H(T_r-T_t)$.
- Geometrically: the transmitter point $\mathbf X_o(T_t)$ must lie on the causal wake surface (isochron) of radius $\Delta = T_r - T_t$ centered at the receiver's reception position $\mathbf X_{o'}(T_r)$.

- Local uniqueness (sub-field-speed, transverse crossing):
  - If the transmitter speed is locally sub-field-speed ($\|\mathbf V_o(T_t)\|<1$) and the derivative $\partial_{T_t}F(T_t;T_r) = -\hat{\mathbf{r}}\!\cdot\!\mathbf V_o(T_t) + 1$ is nonzero at the root, then the implicit function theorem guarantees a unique, smooth root branch near $T_r$.
  - Intuition: the expanding causal isochron intersects the moving transmitter path transversely.

- Multiple roots (require super-field-speed):
  - When $\|\mathbf V_o\|> 1$ at some emission times, the transmitter can outpace its recent wake surfaces, allowing several distinct historical points to satisfy the same distance-time constraint (multi-hit regime). If $\|\mathbf V_o\|<1$ everywhere, $F(T_t;T_r)$ is strictly increasing in $T_t$, so at most one causal root exists.

- Conventions at singular cases:
  - We adopt $H(0)=0$ so the instantaneous emission at $T_t=T_r$ does not produce an immediate self-kick.
  - No $r=0$ causal roots beyond $\Delta=0$: because $r = v(T_r - T_t)$, $r=0$ implies $\Delta=0$; the $\Delta=0$ case is excluded by $H(0)=0$. Under mollification, the symmetric limit as $r\to 0$ yields zero net push.

Plain language: a receiver is accelerated only by earlier transmitter events whose causal isochrons pass through it at reception time $T_r$. Usually there is one such event; if the transmitter is very fast or its path loops around, there can be several.

Non-technical visualization — outrunning your own wake (speedboat analogy):
- Picture a speedboat continuously laying down circular wake ridges that spread outward across the water at a fixed wave speed $c_w$ (analogy variable: wake ridge expansion speed). If the boat stays slower than $c_w$, it remains inside its newest ridge and will never meet it again, no self-hits. Once the boat exceeds $c_w$, it moves ahead of its freshest ridge. Later, if it curves or slows, it can run into older ridges it created earlier. Each crossing delivers a brief shove normal to the ridge (straight outward from the ridge’s center), mirroring the model’s line-of-action push. The ridge “drop rate” never changes, but the received shove is stronger or weaker depending both on how the boat’s earlier motion bunches or dilates the ridge spacing and on how the receiver path cuts through the ridge sequence, mirroring the model’s receiver-weighted acceleration factor. This is an analogy: real Kelvin wakes are dispersive; we idealize to circular ridges expanding at one speed to match the model’s fixed-speed causal isochrons.

Four self-hits in one maneuver (storyboard):
1) Sprint phase (exceed the field speed): The boat accelerates to a speed strictly greater than $c_w$ and holds it for several ticks. During this super-speed run it lays down several concentric ridges that it immediately outruns.
2) Set up spacing: Maintain the super-speed for long enough to create at least four successive ridges with noticeable gaps (their radii grow at $c_w\cdot \Delta t$ while the boat advances faster than $c_w$).
3) Curving return: Bank into a broad, smooth turn (a teardrop/U-turn or a gentle outward spiral) that arcs back toward the track laid moments earlier.
4) Crossings: As the boat’s curved path cuts across the expanding circles, it re-enters first the outermost of those recent ridges, then the next three in sequence. With a steady arc and timing, four distinct ridge crossings occur in quick succession—four self-hits. The shove at each crossing points straight away from the center of that ring (the boat’s earlier position).
5) Tuning intuition: to make four hits likely, use a fast straight run $(\lvert v\rvert>c_w)$ to lay multiple rings, then a wide-radius turn whose chord length is comparable to the ring spacing. Tighter loops and longer super-speed runs increase the chance of multiple crossings; without exceeding $c_w$, this multi-hit pattern cannot occur.
