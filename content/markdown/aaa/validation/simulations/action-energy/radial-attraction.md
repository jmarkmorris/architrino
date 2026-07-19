# Radial Attraction

Setup:
- A test architrino with polarity $q'$ falls radially toward a fixed center with polarity $q$.
- The interaction is delayed; the causal emission time exists uniquely for a fixed source, but the receiver-side factor makes the acceleration depend on receiver radial velocity as well as current separation.

Objectives:
- Receiver-side baseline equations for $r(T)$ and $V_r(T)$.
- Energy balance and integral expressions suitable for comparison.

Delay differential equation and exact reduction:
- With field speed normalized to $v=1$ and a fixed source location $X_c$, the causal root satisfies $|X(T)-X_c|=T-T_t$ with $T_t<T$.
- The per-hit law yields a line-of-action acceleration whose magnitude depends on the current separation $r(T)=|X(T)-X_c|$ and the transmitter-side acceleration weight:
  $$
  \frac{d^2X}{dT^2} \;=\; -\,\kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(T)^2}W^{\mathrm{acc}}(T)\,\mathrm{sgn}\!\big(X(T)-X_c\big)
  $$
  Writing $K=\kappa\,|q q'|>0$ and $r=\lvert X-X_c\rvert$, the radial ODE is
  $$
  \frac{d^2r}{dT^2} \;=\; -\,\frac{K}{r(T)^2}W^{\mathrm{acc}}(T),
  \qquad
  W^{\mathrm{acc}}(T)=\left|1-\frac{dr}{dT}\right|
  $$
  on the outward radial sign convention and field-speed units.

Solvability status:
- The classical inverse-square fall formulas are not a canonical receiver-side baseline for a moving receiver. They apply only to the frozen instant where $W^{\mathrm{acc}}=1$ and do not describe the subsequent receiver-side evolution.
- No closed-form solution is presently asserted for the velocity-dependent receiver-side radial fall.

Notes:
- For a fixed source, $D_t=1$ in field-speed units. The nontrivial receiver-side factor is $D_r=1-\frac{dr}{dT}$ on the outward radial sign convention.

Use:
- A simple ground-truth receiver-side root geometry against which delayed-law simulations can check receiver-side modulation.

Plain language: A fixed center still gives an easy causal root, but a moving receiver crosses the wake differently as it falls. The hit strength changes with that crossing speed, so the familiar closed-form inverse-square fall is not the receiver-side benchmark.
