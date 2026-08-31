# Radial Attraction

Setup:
- A test architrino with polarity $q'$ falls radially toward a fixed center with polarity $q$.
- Attraction requires unlike polarities, so $\sigma_{qq'}=-1$.
- The fixed transmitter has a unique causal emission time. Its transmitter-side factor is $D_t=c_f$, so receiver radial velocity does not multiply the arriving acceleration.

Objectives:
- Receiver-side baseline equations for $r(T)$ and $V_r(T)$.
- Energy balance and integral expressions suitable for comparison.

Delay equation and exact reduction:
- With field speed normalized to $c_f=1$ and a fixed transmitter location $X_c$, the causal root satisfies $|X(T_r)-X_c|=T_r-T_t$ with $T_t<T_r$.
- The per-hit law yields a line-of-action acceleration whose magnitude depends on the current separation $r(T)=|X(T)-X_c|$ and the transmitter-side acceleration weight:
  $$
  \frac{d^2X}{dT^2} \;=\; \kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(T)^2}W^{\mathrm{acc}}(T)\,\mathrm{sgn}\!\big(X(T)-X_c\big)
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-bb516dea67c24324)
  With $\sigma_{qq'}=-1$, writing $K=\kappa\,|q q'|>0$ and $r=\lvert X-X_c\rvert$, the radial ODE is
  $$
  \frac{d^2r}{dT^2} \;=\; -\,\frac{K}{r(T)^2}W^{\mathrm{acc}}(T),
  \qquad
  W^{\mathrm{acc}}(T)=1
  $$

  [View →](../../../../../../equation-mapping.html#corpus-equation-3ca850ee2b457e94)
  in field-speed units.

Solvability status:
- The fixed-transmitter case reduces exactly to the inverse-square radial equation. Its mathematical closed forms are therefore valid comparison cases for the trajectory once initial conditions are declared.
- This does not establish a conserved Master-Equation energy account; it establishes only the reduced acceleration equation for this fixed-transmitter geometry.

Notes:
- For a fixed transmitter, $D_t=1$ and $W^{\mathrm{acc}}=1$ in field-speed units. The receiver-side factor $D_r=1-dr/dT$ controls signed root playback, and radial velocity controls instantaneous power.

Use:
- An analytic fixed-transmitter check that must remain invariant when receiver velocity is varied at fixed reception position and retained transmitter history.

Plain language: At the same position and against the same fixed transmitter history, two receivers with different velocities get the same arriving acceleration. Their later paths and the rate at which they replay emission history differ.
