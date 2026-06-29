# Radial Attraction

Setup:
- A test architrino with polarity $q'$ falls radially toward a fixed center with polarity $q$.
- The interaction is delayed; the causal emission time exists uniquely for a fixed source, but the receiver-normal factor makes the acceleration depend on receiver radial velocity as well as current separation.

Objectives:
- Receiver-normal baseline equations for $r(t)$ and $v_r(t)$.
- Energy balance and integral expressions suitable for comparison.

Delay differential equation and exact reduction:
- With field speed normalized to $v=1$ and a fixed source location $x_c$, the causal root satisfies $|x(t)-x_c|=t-t_0$ with $t_0<t$.
- The per-hit law yields a line-of-action acceleration whose magnitude depends on the current separation $r(t)=|x(t)-x_c|$ and the receiver-normal branch strength:
  $$
  \ddot{x}(t) \;=\; -\,\kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(t)^2}W^{\mathrm{rec}}(t)\,\mathrm{sgn}\!\big(x(t)-x_c\big)
  $$
  Writing $K=\kappa\,|q q'|>0$ and $r=\lvert x-x_c\rvert$, the radial ODE is
  $$
  \ddot{r}(t) \;=\; -\,\frac{K}{r(t)^2}W^{\mathrm{rec}}(t),
  \qquad
  W^{\mathrm{rec}}(t)=\left|1-\dot r(t)\right|
  $$
  on the outward radial sign convention and field-speed units.

Solvability status:
- The classical inverse-square fall formulas are not a canonical receiver-normal baseline for a moving receiver. They apply only to the frozen instant where $W^{\mathrm{rec}}=1$ and do not describe the subsequent receiver-normal evolution.
- No closed-form solution is presently asserted for the velocity-dependent receiver-normal radial fall.

Notes:
- For a fixed source, $D_s=1$ in field-speed units. The nontrivial receiver-normal factor is $D_t=1-\dot r(t)$ on the outward radial sign convention.

Use:
- A simple ground-truth receiver-normal root geometry against which delayed-law simulations can check receiver-normal modulation.

Plain language: A fixed center still gives an easy causal root, but a moving receiver crosses the wake differently as it falls. The hit strength changes with that crossing speed, so the familiar closed-form inverse-square fall is not the receiver-normal benchmark.
